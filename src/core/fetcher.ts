import * as childProcess from 'node:child_process';
import * as os from 'node:os';
import * as path from 'node:path';
import * as fsp from 'node:fs/promises';
import { promisify } from 'node:util';
import { exists } from '../utils/fs';
import { logger } from '../utils/logger';

const execFile = promisify(childProcess.execFile);

/**
 * The single, authoritative source of truth for OpenProducer upstream assets.
 */
export const GITHUB_SOURCE_REPO = 'TheProjectsX/openproducer';
export const GITHUB_SOURCE_BRANCH = 'main';

export interface RemoteFetchOptions {
  offline?: boolean;
  token?: string;
}

export interface TemplateSourceResult {
  sourceType: 'remote-git' | 'remote-http' | 'local-bundled';
  sourceLocation: string;
  productionTemplateDir: string;
  agentsDir: string;
}

/**
 * Searches local filesystem for pre-bundled package templates.
 */
export function resolveLocalBundledTemplatesDir(): string | null {
  let curr = __dirname;
  for (let i = 0; i < 5; i++) {
    const candidate = path.join(curr, 'templates');
    const marker = path.join(candidate, 'production_template', 'AGENTS.md');
    try {
      const fs = require('node:fs');
      if (fs.existsSync(marker)) {
        return candidate;
      }
    } catch {
      // continue search
    }
    const parent = path.dirname(curr);
    if (parent === curr) break;
    curr = parent;
  }
  return null;
}

/**
 * Attempts to shallow clone only the required template folders using git sparse-checkout.
 */
async function tryGitSparseClone(
  repo: string,
  branch: string,
  cacheDir: string
): Promise<TemplateSourceResult | null> {
  try {
    if (await exists(cacheDir)) {
      await fsp.rm(cacheDir, { recursive: true, force: true });
    }
    await fsp.mkdir(cacheDir, { recursive: true });

    const gitUrl = `https://github.com/${repo}.git`;

    // 1. Clone with blob filter and sparse mode
    await execFile('git', [
      'clone',
      '--depth',
      '1',
      '--branch',
      branch,
      '--filter=blob:none',
      '--sparse',
      gitUrl,
      cacheDir
    ]);

    // 2. Set sparse checkout for production_template and agents
    await execFile('git', ['sparse-checkout', 'set', 'production_template', 'agents'], {
      cwd: cacheDir
    });

    const prodDir = path.join(cacheDir, 'production_template');
    const agentsDir = path.join(cacheDir, 'agents');

    if ((await exists(prodDir)) && (await exists(agentsDir))) {
      return {
        sourceType: 'remote-git',
        sourceLocation: `github:${repo}#${branch}`,
        productionTemplateDir: prodDir,
        agentsDir
      };
    }
  } catch {
    // Git sparse clone failed
  }
  return null;
}

/**
 * Attempts to fetch repository tarball directly via HTTP fetch (useful in environments without git).
 */
async function tryHttpTarballFetch(
  repo: string,
  branch: string,
  _cacheDir: string,
  token?: string
): Promise<TemplateSourceResult | null> {
  try {
    const tarballUrl = `https://api.github.com/repos/${repo}/tarball/${branch}`;
    const headers: Record<string, string> = {
      'User-Agent': 'OpenProducer-CLI'
    };
    if (token) {
      headers['Authorization'] = `token ${token}`;
    }

    const response = await fetch(tarballUrl, { headers, redirect: 'follow' });
    if (!response.ok) {
      return null;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Master resolution function:
 * 1. Pulls live upstream from the official repository (TheProjectsX/ai-video-production-skill#main).
 * 2. If remote fails or offline is specified, falls back to local bundled templates.
 */
export async function resolveTemplateSources(options: RemoteFetchOptions = {}): Promise<TemplateSourceResult> {
  const repo = GITHUB_SOURCE_REPO;
  const branch = GITHUB_SOURCE_BRANCH;
  const token = options.token || process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  const isOffline = options.offline || process.env.OPENPRODUCER_OFFLINE === '1' || process.env.OPENPRODUCER_OFFLINE === 'true';

  const cacheDir = path.join(os.tmpdir(), 'openproducer-remote', `${repo.replace('/', '_')}-${branch}`);

  // 1. Try remote fetch from the single source of truth if not forced offline
  if (!isOffline) {
    logger.info(`Fetching latest skills & templates from GitHub (${repo}#${branch})...`);

    // Tier 1: Git sparse clone
    const gitResult = await tryGitSparseClone(repo, branch, cacheDir);
    if (gitResult) {
      logger.success(`Synchronized live with GitHub (${repo}#${branch})`);
      return gitResult;
    }

    // Tier 2: HTTP fetch fallback
    const httpResult = await tryHttpTarballFetch(repo, branch, cacheDir, token);
    if (httpResult) {
      logger.success(`Synchronized live via GitHub API (${repo}#${branch})`);
      return httpResult;
    }

    logger.warn(`Could not reach GitHub (${repo}#${branch}). Falling back to local bundled templates.`);
  } else {
    logger.info('Offline mode enabled: Using bundled local templates.');
  }

  // 2. Fallback to local bundled templates
  const localDir = resolveLocalBundledTemplatesDir();
  if (localDir) {
    const prodDir = path.join(localDir, 'production_template');
    const agentsDir = path.join(localDir, 'agents');
    if ((await exists(prodDir)) && (await exists(agentsDir))) {
      return {
        sourceType: 'local-bundled',
        sourceLocation: localDir,
        productionTemplateDir: prodDir,
        agentsDir
      };
    }
  }

  throw new Error(
    `Unable to locate OpenProducer templates either from GitHub (${repo}#${branch}) or locally in the npm package.`
  );
}
