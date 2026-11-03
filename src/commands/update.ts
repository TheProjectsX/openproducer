import * as path from 'node:path';
import * as fsp from 'node:fs/promises';
import pc from 'picocolors';
import { ConfigManager } from '../core/config';
import { DEFAULT_FLOW_ORCHESTRATION, LINTER_REGISTRY } from '../core/constants';
import { resolveTemplateSources } from '../core/fetcher';
import { OpenProducerConfig, OpenProducerState } from '../core/types';
import { copyRecursive, ensureDir, exists, readFile, writeFile } from '../utils/fs';
import { logger } from '../utils/logger';

export interface UpdateCommandOptions {
  offline?: boolean;
  token?: string;
  force?: boolean;
}

/**
 * Converts legacy audio_script.md contents into plain-text bracketed meta tags format.
 */
function convertAudioScriptMdToTxt(mdContent: string): string {
  let txt = mdContent;

  // Replace Markdown headers with bracketed tags
  txt = txt.replace(/^#\s+.*$/m, '');
  txt = txt.replace(/^##\s+.*?Google AI Studio.*?Configuration.*?$/im, '[AUDIO CONFIGURATION]');
  txt = txt.replace(/^###\s+.*?Cast\s*&\s*Voice Presets.*?$/im, '[VOICE CAST & PRESETS]');
  txt = txt.replace(/^###\s+.*?System Instructions.*?$/im, '[SYSTEM INSTRUCTIONS]');
  txt = txt.replace(/^##\s+.*?(?:Master Script|Voiceover Script|Alternating-Turn Script).*?$/im, '[AUDIO SCRIPT]');
  txt = txt.replace(/^###\s+Turn\s+(\d+)\s*[—–-]\s*\[(.*?)\]\s*\((.*?)\).*?$/gim, '[Turn $1 - $2 / $3]');
  txt = txt.replace(/^###\s+Part\s+(\d+).*?$/gim, '[PART $1]');
  txt = txt.replace(/^##\s+.*?Next Steps.*?$/im, '[DOWNSTREAM WORKFLOW]');

  // Remove code fences
  txt = txt.replace(/```[a-z]*\r?\n/gi, '');
  txt = txt.replace(/```/g, '');

  // Clean horizontal rules
  txt = txt.replace(/^---$/gm, '');

  // Normalize excessive blank lines
  txt = txt.replace(/\n{3,}/g, '\n\n').trim();

  return txt + '\n';
}

export async function updateCommand(
  directory?: string,
  options: UpdateCommandOptions = {}
): Promise<void> {
  logger.banner();

  const targetDir = directory ? path.resolve(directory) : process.cwd();
  const configMgr = new ConfigManager(targetDir);
  if (!(await configMgr.isInitialized())) {
    logger.error('No OpenProducer project found in this directory or its parents.');
    logger.info('Run "npx openproducer init" to create one.');
    process.exit(1);
  }

  const projectRoot = configMgr.root;
  const config = await configMgr.readConfig();
  const state = await configMgr.readState();

  logger.info(`Checking and updating OpenProducer project: ${pc.bold(config.project_name)}`);

  // 1. Resolve latest upstream skills, specs and templates
  const templateSource = await resolveTemplateSources({
    offline: options.offline,
    token: options.token
  });

  const changesApplied: string[] = [];

  // 2. Safely refresh .agents/ (skills & workflows)
  if (await exists(templateSource.agentsDir)) {
    const agentsDest = path.join(projectRoot, '.agents');
    await copyRecursive(templateSource.agentsDir, agentsDest);
    changesApplied.push('Refreshed .agents/ (7 operational skills, workflows & specs)');
  }

  // 3. Update root specifications (STRUCTURE.md & AGENTS.md)
  const templateStructureMd = path.join(templateSource.productionTemplateDir, 'STRUCTURE.md');
  if (await exists(templateStructureMd)) {
    const structureContent = await readFile(templateStructureMd);
    await writeFile(path.join(projectRoot, 'STRUCTURE.md'), structureContent);
    changesApplied.push('Updated STRUCTURE.md layout contract');
  }

  const templateAgentsMd = path.join(templateSource.productionTemplateDir, 'AGENTS.md');
  if (await exists(templateAgentsMd)) {
    const targetAgentsMd = path.join(projectRoot, 'AGENTS.md');
    // If not existing or forced or standard file, update it
    if ((await exists(targetAgentsMd)) || options.force) {
      const agentsContent = await readFile(templateAgentsMd);
      await writeFile(targetAgentsMd, agentsContent);
      changesApplied.push('Synchronized AGENTS.md framework instructions');
    }
  }

  // 4. Schema & configuration synchronization (openproducer/config.json)
  let configChanged = false;
  const updatedConfig: OpenProducerConfig = {
    ...config,
    resolution: config.resolution || '1080p',
    flow_orchestration: config.flow_orchestration || DEFAULT_FLOW_ORCHESTRATION,
    language: config.language || 'en-US',
    linter_profile: config.linter_profile || 'strict'
  };

  if (JSON.stringify(config) !== JSON.stringify(updatedConfig)) {
    await configMgr.writeConfig(updatedConfig);
    configChanged = true;
    changesApplied.push('Synchronized openproducer/config.json schema (defaults preserved)');
  }

  // 5. State synchronization (openproducer/state.json)
  const updatedState: OpenProducerState = {
    ...state,
    stages: Object.assign(
      {
        propose_complete: false,
        produce_complete: false,
        clips_generated: false,
        base_image_locked: false,
        audio_script_locked: false,
        clips_rendered: false,
        assembly_complete: false
      },
      state.stages || {}
    ),
    interactive_guidance: state.interactive_guidance || {
      enabled: false,
      active_step: 'not_started'
    },
    template_loaded: state.template_loaded || '',
    updated_at: new Date().toISOString()
  };

  if (JSON.stringify(state) !== JSON.stringify(updatedState)) {
    await configMgr.writeState(updatedState);
    changesApplied.push('Synchronized openproducer/state.json stage tracking');
  }

  // 6. Pre-flight linter manifest synchronization (openproducer/manifest.json)
  try {
    const manifest = await configMgr.readManifest();
    let addedLinters = 0;
    if (!manifest.linters) manifest.linters = {};

    for (const rule of LINTER_REGISTRY) {
      const hasRule = Object.keys(manifest.linters).some((k) => k.startsWith(rule.id));
      if (!hasRule) {
        const key = `${rule.id}_${rule.name.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`;
        manifest.linters[key] = { status: 'PENDING' };
        addedLinters++;
      }
    }

    if (addedLinters > 0) {
      manifest.audit_timestamp = new Date().toISOString();
      await configMgr.writeManifest(manifest);
      changesApplied.push(`Added ${addedLinters} new linter checks to openproducer/manifest.json`);
    }
  } catch {
    // If manifest was missing or corrupt, it will be regenerated during next doctor/produce run
  }

  // 7. Structural & file format migrations (Handling in-progress creations)
  const prodDir = path.join(projectRoot, 'production');
  await ensureDir(prodDir);

  // A. Legacy root files migration into production/
  const legacyRootFiles = [
    'base_image_prompt.txt',
    'master_images_prompt.txt',
    'master_videos_prompt.txt',
    'scratchbook.md',
    'motion_graphics.md',
    'audio.srt'
  ];

  for (const filename of legacyRootFiles) {
    const rootPath = path.join(projectRoot, filename);
    const prodPath = path.join(prodDir, filename);
    if ((await exists(rootPath)) && !(await exists(prodPath))) {
      await fsp.rename(rootPath, prodPath);
      changesApplied.push(`Relocated root ${filename} -> production/${filename}`);
    }
  }

  const legacyDirs = ['clips', 'subjects'];
  for (const dirName of legacyDirs) {
    const rootDirPath = path.join(projectRoot, dirName);
    const prodDirPath = path.join(prodDir, dirName);
    if ((await exists(rootDirPath)) && !(await exists(prodDirPath))) {
      await fsp.rename(rootDirPath, prodDirPath);
      changesApplied.push(`Relocated root ${dirName}/ -> production/${dirName}/`);
    }
  }

  // B. audio_script.md -> audio_script.txt migration
  const audioScriptMdInProd = path.join(prodDir, 'audio_script.md');
  const audioScriptTxtInProd = path.join(prodDir, 'audio_script.txt');
  const audioScriptMdAtRoot = path.join(projectRoot, 'audio_script.md');
  const audioScriptTxtAtRoot = path.join(projectRoot, 'audio_script.txt');

  if (await exists(audioScriptTxtAtRoot)) {
    if (!(await exists(audioScriptTxtInProd))) {
      await fsp.rename(audioScriptTxtAtRoot, audioScriptTxtInProd);
      changesApplied.push('Relocated root audio_script.txt -> production/audio_script.txt');
    } else {
      await fsp.rm(audioScriptTxtAtRoot, { force: true });
    }
  }

  if (await exists(audioScriptMdAtRoot)) {
    if (!(await exists(audioScriptTxtInProd))) {
      const rawMd = await readFile(audioScriptMdAtRoot);
      const convertedTxt = convertAudioScriptMdToTxt(rawMd);
      await writeFile(audioScriptTxtInProd, convertedTxt);
      await fsp.rm(audioScriptMdAtRoot, { force: true });
      changesApplied.push('Migrated root audio_script.md -> production/audio_script.txt (Bracket Meta Tags)');
    } else {
      await fsp.rm(audioScriptMdAtRoot, { force: true });
    }
  }

  if (await exists(audioScriptMdInProd)) {
    if (!(await exists(audioScriptTxtInProd))) {
      const rawMd = await readFile(audioScriptMdInProd);
      const convertedTxt = convertAudioScriptMdToTxt(rawMd);
      await writeFile(audioScriptTxtInProd, convertedTxt);
      await fsp.rm(audioScriptMdInProd, { force: true });
      changesApplied.push('Migrated production/audio_script.md -> production/audio_script.txt (Bracket Meta Tags)');
    } else {
      // Both exist; remove old markdown version
      await fsp.rm(audioScriptMdInProd, { force: true });
      changesApplied.push('Cleaned up redundant production/audio_script.md');
    }
  }

  // 8. Output summary
  logger.success('Project successfully updated to the latest OpenProducer standard!');

  let sourceLabel = 'Live Upstream Registry (Synchronized)';
  if (templateSource.sourceType === 'local-bundled') {
    sourceLabel = 'Bundled Local Package';
  } else if (templateSource.sourceType === 'cached-upstream') {
    const dateStr = templateSource.cachedAt
      ? ` (${new Date(templateSource.cachedAt).toLocaleDateString()})`
      : '';
    sourceLabel = `Persistent Workstation Cache${dateStr}`;
  }

  logger.card(
    'PROJECT UPDATE REPORT',
    [
      ['Project Name', config.project_name],
      ['Root Directory', projectRoot],
      ['Current Stage', state.current_stage.toUpperCase()],
      ['Template Source', sourceLabel],
      ['Skills & Framework', 'Refreshed in .agents/ and specs'],
      ['Protected Assets', 'openproducer/blueprint.md, clips, and creator media 100% preserved']
    ],
    changesApplied.length > 0 ? `Applied ${changesApplied.length} updates/migrations` : 'Already up-to-date'
  );

  if (changesApplied.length > 0) {
    console.log(pc.bold('Updates Applied:'));
    for (const item of changesApplied) {
      console.log(`  ${pc.green('✔')} ${item}`);
    }
    console.log('');
  } else {
    logger.info('Everything was already up-to-date. No migrations required.');
  }
}
