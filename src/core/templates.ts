import * as os from 'node:os';
import * as path from 'node:path';
import * as fsp from 'node:fs/promises';
import { SeriesTemplate } from './types';
import { ensureDir, exists, findProjectRoot, readFile, readJson, writeFile } from '../utils/fs';

/**
 * Parses human-readable Markdown series template (.md) into a SeriesTemplate object.
 */
export function parseMarkdownTemplate(content: string, templateId: string): SeriesTemplate {
  // Extract frontmatter between --- and ---
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  const frontmatterStr = match ? match[1] : '';
  const body = match ? match[2] : content;

  const fm: Record<string, string> = {};
  for (const line of frontmatterStr.split('\n')) {
    const parts = line.split(':');
    if (parts.length >= 2) {
      const key = parts[0].trim();
      const val = parts.slice(1).join(':').trim().replace(/^['"](.*)['"]$/, '$1');
      if (key) fm[key] = val;
    }
  }

  // Extract sections
  const getSection = (headingRegex: RegExp): string => {
    const sectionMatch = body.match(headingRegex);
    return sectionMatch ? sectionMatch[1].trim() : '';
  };

  const visualSection = getSection(/##\s+🎨\s*Visual DNA([\s\S]*?)(?=##|$)/i);
  const subjectSection = getSection(/##\s+👥\s*Subject DNA([\s\S]*?)(?=##|$)/i);
  const environmentSection = getSection(/##\s+🌆\s*Environment DNA([\s\S]*?)(?=##|$)/i);
  const pacingSection = getSection(/##\s+⏱️\s*Pacing & Voice Profile([\s\S]*?)(?=##|$)/i);
  const motionSection = getSection(/##\s+🔤\s*Motion Graphics & Typography([\s\S]*?)(?=##|$)/i);

  const getBulletValue = (sectionText: string, keyName: string): string => {
    const reg = new RegExp(`-\\s*\\*\\*${keyName}:?\\*\\*\\s*(.*)`, 'i');
    const m = sectionText.match(reg);
    return m ? m[1].trim().replace(/^`([^`]+)`$/, '$1') : '';
  };

  return {
    template_id: fm.template_id || templateId,
    name: fm.name || templateId,
    archetype: fm.archetype || '',
    tier: fm.tier || 'lean_base_reference',
    aspect_ratio: fm.aspect_ratio || '16:9',
    resolution: fm.resolution || '1080p',
    audio_pathway: fm.audio_pathway || 'separate_audio',
    audio_delivery_mode: fm.audio_delivery_mode || 'separate_script_first',
    visual_dna: {
      style_id: getBulletValue(visualSection, 'Style ID'),
      master_style_anchor: getBulletValue(visualSection, 'Master Style Anchor'),
      negative_prompt: getBulletValue(visualSection, 'Negative Prompt')
    },
    subject_dna: {
      name: getBulletValue(subjectSection, 'Name'),
      biometrics: getBulletValue(subjectSection, 'Biometrics'),
      wardrobe: getBulletValue(subjectSection, 'Wardrobe'),
      expression_profile: getBulletValue(subjectSection, 'Expression Profile')
    },
    environment_dna: {
      setting: getBulletValue(environmentSection, 'Setting Name'),
      spatial_description: getBulletValue(environmentSection, 'Spatial Description'),
      lighting_rig: getBulletValue(environmentSection, 'Lighting Rig'),
      acoustics: getBulletValue(environmentSection, 'Acoustics')
    },
    pacing_profile: {
      default_clip_duration: parseInt(getBulletValue(pacingSection, 'Default Clip Duration'), 10) || 6,
      speech_pacing: parseFloat(getBulletValue(pacingSection, 'Speech Pacing')) || 2.2,
      vocal_attack: getBulletValue(pacingSection, 'Vocal Attack'),
      voice_preset: getBulletValue(pacingSection, 'Voice Preset')
    },
    motion_graphics: {
      font_family: getBulletValue(motionSection, 'Font Family'),
      primary_color: getBulletValue(motionSection, 'Primary Color'),
      accent_color: getBulletValue(motionSection, 'Accent Color'),
      style: getBulletValue(motionSection, 'Style')
    },
    raw_content: content
  };
}

/**
 * Formats a SeriesTemplate into human-readable Markdown with YAML frontmatter.
 */
export function formatMarkdownTemplate(template: SeriesTemplate): string {
  const styleId = template.visual_dna?.style_id ? `\`${template.visual_dna.style_id}\`` : '';
  return `---
template_id: ${template.template_id}
name: ${template.name}
archetype: ${template.archetype || ''}
tier: ${template.tier || 'lean_base_reference'}
aspect_ratio: ${template.aspect_ratio || '16:9'}
resolution: ${template.resolution || '1080p'}
audio_pathway: ${template.audio_pathway || 'separate_audio'}
audio_delivery_mode: ${template.audio_delivery_mode || 'separate_script_first'}
---

# 🎬 Template: ${template.name}
> Reusable series franchise preset. Strictly excludes episode plot & script.

## 🎨 Visual DNA
- **Style ID:** ${styleId}
- **Master Style Anchor:** ${template.visual_dna?.master_style_anchor || ''}
- **Negative Prompt:** ${template.visual_dna?.negative_prompt || 'blurry, distorted, watermarks, text'}

## 👥 Subject DNA
- **Name:** ${template.subject_dna?.name || 'Main Subject'}
- **Biometrics:** ${template.subject_dna?.biometrics || 'Natural human proportions'}
- **Wardrobe:** ${template.subject_dna?.wardrobe || 'Tailored cinematic wardrobe'}
- **Expression Profile:** ${template.subject_dna?.expression_profile || 'Expressive, restrained lip articulation'}

## 🌆 Environment DNA
- **Setting Name:** ${template.environment_dna?.setting || 'Primary Stage'}
- **Spatial Description:** ${template.environment_dna?.spatial_description || 'Staged foreground, midground, background depth planes'}
- **Lighting Rig:** ${template.environment_dna?.lighting_rig || 'Key light with soft ambient fill'}
- **Acoustics:** ${template.environment_dna?.acoustics || 'Clean studio acoustic profile'}

## ⏱️ Pacing & Voice Profile
- **Default Clip Duration:** ${template.pacing_profile?.default_clip_duration || 6}s
- **Speech Pacing:** ${template.pacing_profile?.speech_pacing || 2.2} words/second
- **Vocal Attack:** ${template.pacing_profile?.vocal_attack || 'Immediate vocal attack on Frame 1'}
- **Voice Preset:** ${template.pacing_profile?.voice_preset || 'Fenrir'}

## 🔤 Motion Graphics & Typography
- **Font Family:** ${template.motion_graphics?.font_family || 'Montserrat'}
- **Primary Color:** ${template.motion_graphics?.primary_color || '#FFFFFF'}
- **Accent Color:** ${template.motion_graphics?.accent_color || '#FF3366'}
- **Style:** ${template.motion_graphics?.style || 'Clean dynamic pop-on-word'}
`;
}

function getStarterPresetsDirs(): string[] {
  return [
    path.join(__dirname, '..', '..', 'templates', 'agents', 'skills', 'openproducer-core', 'templates', 'starter_presets'),
    path.join(__dirname, '..', '..', 'agents', 'skills', 'openproducer-core', 'templates', 'starter_presets')
  ];
}

export class TemplateManager {
  private globalDir: string;
  private projectRoot: string | null;

  constructor(targetDir = process.cwd()) {
    this.globalDir = path.join(os.homedir(), '.openproducer', 'templates');
    this.projectRoot = findProjectRoot(targetDir);
  }

  get directory(): string {
    return this.globalDir;
  }

  async ensureDirectory(): Promise<void> {
    await ensureDir(this.globalDir);
  }

  /**
   * Scans project scope (current project and sibling projects in parent dir)
   * and automatically promotes any project-saved templates into the global workstation vault.
   */
  async syncProjectTemplatesToGlobal(): Promise<string[]> {
    await this.ensureDirectory();
    const synced: string[] = [];
    const searchDirs: string[] = [];

    // 1. Current project openproducer/templates
    if (this.projectRoot) {
      searchDirs.push(path.join(this.projectRoot, 'openproducer', 'templates'));

      // 2. Sibling projects in same parent folder (e.g. ../*/openproducer/templates)
      try {
        const parentDir = path.dirname(this.projectRoot);
        const siblings = await fsp.readdir(parentDir, { withFileTypes: true });
        for (const sib of siblings) {
          if (sib.isDirectory() && sib.name !== path.basename(this.projectRoot)) {
            const sibTemplateDir = path.join(parentDir, sib.name, 'openproducer', 'templates');
            searchDirs.push(sibTemplateDir);
          }
        }
      } catch {
        // ignore parent traversal issues
      }
    }

    for (const dir of searchDirs) {
      if (await exists(dir)) {
        try {
          const files = await fsp.readdir(dir);
          for (const file of files) {
            if (file.endsWith('.md') || file.endsWith('.json')) {
              const srcFile = path.join(dir, file);
              const destFile = path.join(this.globalDir, file);

              let shouldCopy = false;
              if (!(await exists(destFile))) {
                shouldCopy = true;
              } else {
                const srcStat = await fsp.stat(srcFile);
                const destStat = await fsp.stat(destFile);
                if (srcStat.mtimeMs > destStat.mtimeMs) {
                  shouldCopy = true;
                }
              }

              if (shouldCopy) {
                const content = await readFile(srcFile);
                await writeFile(destFile, content);
                synced.push(file.replace(/\.(md|json)$/, ''));
              }
            }
          }
        } catch {
          // ignore
        }
      }
    }

    return synced;
  }

  async listTemplates(): Promise<string[]> {
    await this.ensureDirectory();
    await this.syncProjectTemplatesToGlobal();

    const templateNames = new Set<string>();

    try {
      const entries = await fsp.readdir(this.globalDir);
      for (const file of entries) {
        if (file.endsWith('.md')) {
          templateNames.add(file.replace(/\.md$/, ''));
        } else if (file.endsWith('.json')) {
          templateNames.add(file.replace(/\.json$/, ''));
        }
      }
    } catch {
      // directory reading error handled gracefully
    }

    // Also check starter presets in package (both bundled templates and source agents)
    for (const presetDir of getStarterPresetsDirs()) {
      try {
        if (await exists(presetDir)) {
          const presets = await fsp.readdir(presetDir);
          for (const file of presets) {
            if (file.endsWith('.md')) {
              templateNames.add(file.replace(/\.md$/, ''));
            }
          }
        }
      } catch {
        // ignore
      }
    }

    return Array.from(templateNames);
  }

  async getTemplate(templateId: string): Promise<SeriesTemplate | null> {
    await this.syncProjectTemplatesToGlobal();

    // 1. Check ~/.openproducer/templates/<id>.md
    const mdPath = path.join(this.globalDir, `${templateId}.md`);
    if (await exists(mdPath)) {
      const content = await readFile(mdPath);
      return parseMarkdownTemplate(content, templateId);
    }

    // 2. Check ~/.openproducer/templates/<id>.json
    const jsonPath = path.join(this.globalDir, `${templateId}.json`);
    if (await exists(jsonPath)) {
      return readJson<SeriesTemplate>(jsonPath);
    }

    // 3. Check current project local openproducer/templates/<id>.md
    if (this.projectRoot) {
      const localMd = path.join(this.projectRoot, 'openproducer', 'templates', `${templateId}.md`);
      if (await exists(localMd)) {
        const content = await readFile(localMd);
        return parseMarkdownTemplate(content, templateId);
      }
    }

    // 4. Check starter presets in package (both bundled templates and source agents)
    for (const presetDir of getStarterPresetsDirs()) {
      const candidatePreset = path.join(presetDir, `${templateId}.md`);
      if (await exists(candidatePreset)) {
        const content = await readFile(candidatePreset);
        return parseMarkdownTemplate(content, templateId);
      }
    }

    return null;
  }

  async saveTemplate(template: SeriesTemplate): Promise<void> {
    await this.ensureDirectory();
    const mdContent = formatMarkdownTemplate(template);

    // Save globally
    const globalMd = path.join(this.globalDir, `${template.template_id}.md`);
    await writeFile(globalMd, mdContent);

    // Also save in project scope if inside a project
    if (this.projectRoot) {
      const localMd = path.join(this.projectRoot, 'openproducer', 'templates', `${template.template_id}.md`);
      await writeFile(localMd, mdContent);
    }
  }

  async updateTemplate(templateId: string, updates: Partial<SeriesTemplate>): Promise<SeriesTemplate> {
    const existing = await this.getTemplate(templateId);
    if (!existing) {
      throw new Error(`Template "${templateId}" not found in ${this.globalDir}`);
    }

    const merged: SeriesTemplate = {
      ...existing,
      ...updates,
      template_id: templateId,
      name: updates.name || existing.name,
      visual_dna: {
        ...existing.visual_dna,
        ...(updates.visual_dna || {})
      },
      subject_dna: {
        ...(existing.subject_dna || {}),
        ...(updates.subject_dna || {})
      },
      environment_dna: {
        ...(existing.environment_dna || {}),
        ...(updates.environment_dna || {})
      },
      pacing_profile: {
        ...(existing.pacing_profile || {}),
        ...(updates.pacing_profile || {})
      },
      motion_graphics: {
        ...(existing.motion_graphics || {}),
        ...(updates.motion_graphics || {})
      }
    };

    await this.saveTemplate(merged);
    return merged;
  }
}
