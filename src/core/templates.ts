import * as os from 'node:os';
import * as path from 'node:path';
import * as fsp from 'node:fs/promises';
import { SeriesTemplate } from './types';
import { ensureDir, exists, readJson, writeJson } from '../utils/fs';

export class TemplateManager {
  private globalDir: string;

  constructor() {
    this.globalDir = path.join(os.homedir(), '.openproducer', 'templates');
  }

  get directory(): string {
    return this.globalDir;
  }

  async ensureDirectory(): Promise<void> {
    await ensureDir(this.globalDir);
  }

  async listTemplates(): Promise<string[]> {
    await this.ensureDirectory();
    try {
      const entries = await fsp.readdir(this.globalDir);
      return entries
        .filter((file) => file.endsWith('.json'))
        .map((file) => file.replace(/\.json$/, ''));
    } catch {
      return [];
    }
  }

  async getTemplate(templateId: string): Promise<SeriesTemplate | null> {
    const templatePath = path.join(this.globalDir, `${templateId}.json`);
    if (!(await exists(templatePath))) {
      return null;
    }
    return readJson<SeriesTemplate>(templatePath);
  }

  async saveTemplate(template: SeriesTemplate): Promise<void> {
    await this.ensureDirectory();
    const templatePath = path.join(this.globalDir, `${template.template_id}.json`);
    await writeJson(templatePath, template);
  }
}

