import * as path from 'node:path';
import { OpenProducerConfig, OpenProducerManifest, OpenProducerState } from './types';
import { exists, findProjectRoot, readJson, writeJson } from '../utils/fs';

export class ConfigManager {
  private projectRoot: string;

  constructor(targetDir = process.cwd()) {
    const root = findProjectRoot(targetDir);
    this.projectRoot = root || path.resolve(targetDir);
  }

  get root(): string {
    return this.projectRoot;
  }

  get configPath(): string {
    return path.join(this.projectRoot, 'openproducer', 'config.json');
  }

  get statePath(): string {
    return path.join(this.projectRoot, 'openproducer', 'state.json');
  }

  get manifestPath(): string {
    return path.join(this.projectRoot, 'openproducer', 'manifest.json');
  }

  get blueprintPath(): string {
    return path.join(this.projectRoot, 'openproducer', 'blueprint.md');
  }

  async isInitialized(): Promise<boolean> {
    return exists(this.configPath);
  }

  async readConfig(): Promise<OpenProducerConfig> {
    return readJson<OpenProducerConfig>(this.configPath);
  }

  async writeConfig(config: OpenProducerConfig): Promise<void> {
    await writeJson(this.configPath, config);
  }

  async readState(): Promise<OpenProducerState> {
    return readJson<OpenProducerState>(this.statePath);
  }

  async writeState(state: OpenProducerState): Promise<void> {
    await writeJson(this.statePath, state);
  }

  async readManifest(): Promise<OpenProducerManifest> {
    return readJson<OpenProducerManifest>(this.manifestPath);
  }

  async writeManifest(manifest: OpenProducerManifest): Promise<void> {
    await writeJson(this.manifestPath, manifest);
  }
}

