import * as os from 'node:os';
import * as path from 'node:path';
import * as fsp from 'node:fs/promises';
import { GenericTemplate, SeriesTemplate, StoryTemplate, TemplateInfo } from './types';
import { ensureDir, exists, findProjectRoot, readFile, readJson, writeFile } from '../utils/fs';

/**
 * Parses human-readable Markdown story template (.md) into a StoryTemplate object.
 */
export function parseStoryMarkdownTemplate(content: string, templateId: string): StoryTemplate {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  const frontmatterStr = match ? match[1] : '';

  const fm: Record<string, string> = {};
  for (const line of frontmatterStr.split('\n')) {
    const parts = line.split(':');
    if (parts.length >= 2) {
      const key = parts[0].trim();
      const val = parts.slice(1).join(':').trim().replace(/^['"](.*)['"]$/, '$1');
      if (key) fm[key] = val;
    }
  }

  return {
    template_id: fm.template_id || templateId,
    type: 'story',
    name: fm.name || templateId,
    narrative_archetype: fm.narrative_archetype || 'pure_narration',
    voice_persona: fm.voice_persona || '',
    target_wpm: parseInt(fm.target_wpm, 10) || 135,
    raw_content: content
  };
}

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

/**
 * Formats a StoryTemplate into human-readable Markdown with YAML frontmatter.
 */
export function formatStoryMarkdownTemplate(template: StoryTemplate): string {
  if (template.raw_content && template.raw_content.trim().startsWith('---')) {
    return template.raw_content.endsWith('\n') ? template.raw_content : template.raw_content + '\n';
  }
  return `---
template_id: ${template.template_id}
type: story
name: "${template.name}"
narrative_archetype: "${template.narrative_archetype || 'pure_narration'}"
voice_persona: "${template.voice_persona || 'Expressive, high-retention storyteller'}"
target_wpm: ${template.target_wpm || 135}
---

# 📖 Story Template: ${template.name}
> Reusable narrative formula. Strictly excludes video cinematography and episode plot.

## 🪝 Hook & Pacing Structure
- **0s – 5s (The Hook):** Open immediately with a provocative question, bold claim, or jarring sensory event. Zero throat-clearing.
- **5s – 35s (The Escalation):** Build narrative tension across escalating stakes or reveals.
- **35s – 50s (The Climax):** Peak confrontation, breakthrough realization, or emotional turning point.
- **50s – 60s (Outro & Punchline):** Crisp, memorable parting thought or cliffhanger.

## 🗣️ Dialogue & Vocal Rules
- **Sentence Cadence:** Rhythmic, spoken-first sentences tailored for natural vocal delivery.
- **TTS Expression Tags:** Inject \`<breath>\`, \`<short pause>\`, \`<sigh>\`, \`<gasp>\` on isolated lines at emotional shifts.
- **Banned Cliches:** "Hey guys welcome back", "In this video", "Without further ado".
`;
}

async function isStoryFile(filePath: string, fileName: string): Promise<boolean> {
  if (fileName.startsWith('story-')) return true;
  try {
    const content = await readFile(filePath);
    const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (fmMatch && /^\s*type:\s*['"]?story['"]?\s*$/im.test(fmMatch[1])) {
      return true;
    }
  } catch {
    // ignore read error
  }
  return false;
}

function getStarterPresetsDirs(): string[] {
  return [
    path.join(__dirname, '..', 'templates', 'agents', 'skills', 'openproducer-core', 'templates', 'starter_presets'),
    path.join(__dirname, '..', '..', 'src', 'templates', 'agents', 'skills', 'openproducer-core', 'templates', 'starter_presets'),
    path.join(__dirname, '..', '..', 'dist', 'templates', 'agents', 'skills', 'openproducer-core', 'templates', 'starter_presets'),
    path.join(__dirname, '..', '..', 'templates', 'agents', 'skills', 'openproducer-core', 'templates', 'starter_presets'),
    path.join(__dirname, '..', '..', 'agents', 'skills', 'openproducer-core', 'templates', 'starter_presets')
  ];
}

function getPackagePresetsDirs(): string[] {
  return [
    path.join(__dirname, '..', 'templates', 'agents', 'skills', 'openproducer-core', 'templates', 'package'),
    path.join(__dirname, '..', '..', 'src', 'templates', 'agents', 'skills', 'openproducer-core', 'templates', 'package'),
    path.join(__dirname, '..', '..', 'dist', 'templates', 'agents', 'skills', 'openproducer-core', 'templates', 'package'),
    path.join(__dirname, '..', '..', 'templates', 'agents', 'skills', 'openproducer-core', 'templates', 'package'),
    path.join(__dirname, '..', '..', 'agents', 'skills', 'openproducer-core', 'templates', 'package')
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
   * and automatically promotes any project-saved templates (including story/ and video/ sub-vaults)
   * into the global workstation vault.
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

    const syncDirPair = async (srcDir: string, destDir: string) => {
      if (!(await exists(srcDir))) return;
      try {
        const files = await fsp.readdir(srcDir);
        for (const file of files) {
          if (file.endsWith('.md') || file.endsWith('.json')) {
            const srcFile = path.join(srcDir, file);
            const destFile = path.join(destDir, file);

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
    };

    for (const dir of searchDirs) {
      await syncDirPair(dir, this.globalDir);
      await syncDirPair(path.join(dir, 'story'), path.join(this.globalDir, 'story'));
      await syncDirPair(path.join(dir, 'video'), path.join(this.globalDir, 'video'));
    }

    return synced;
  }

  async listTemplates(): Promise<string[]> {
    const all = await this.listAllTemplates();
    return Array.from(new Set(all.map((t) => t.id)));
  }

  async getTemplate(templateId: string): Promise<SeriesTemplate | null> {
    await this.syncProjectTemplatesToGlobal();

    // 1. Check ~/.openproducer/templates/video/<id>.md
    const globalVideoMd = path.join(this.globalDir, 'video', `${templateId}.md`);
    if (await exists(globalVideoMd)) {
      const content = await readFile(globalVideoMd);
      return parseMarkdownTemplate(content, templateId);
    }

    // 2. Check ~/.openproducer/templates/<id>.md (only if NOT a story template)
    const mdPath = path.join(this.globalDir, `${templateId}.md`);
    if (await exists(mdPath)) {
      if (!(await isStoryFile(mdPath, `${templateId}.md`))) {
        const content = await readFile(mdPath);
        return parseMarkdownTemplate(content, templateId);
      }
    }

    // 3. Check ~/.openproducer/templates/<id>.json
    const jsonPath = path.join(this.globalDir, `${templateId}.json`);
    if (await exists(jsonPath)) {
      return readJson<SeriesTemplate>(jsonPath);
    }

    // 4. Check current project local openproducer/templates/video/<id>.md and openproducer/templates/<id>.md
    if (this.projectRoot) {
      const localVideoMd = path.join(this.projectRoot, 'openproducer', 'templates', 'video', `${templateId}.md`);
      if (await exists(localVideoMd)) {
        const content = await readFile(localVideoMd);
        return parseMarkdownTemplate(content, templateId);
      }

      const localMd = path.join(this.projectRoot, 'openproducer', 'templates', `${templateId}.md`);
      if (await exists(localMd)) {
        if (!(await isStoryFile(localMd, `${templateId}.md`))) {
          const content = await readFile(localMd);
          return parseMarkdownTemplate(content, templateId);
        }
      }
    }

    // 5. Check starter presets in package (only if NOT a story template)
    for (const presetDir of getStarterPresetsDirs()) {
      const candidatePreset = path.join(presetDir, `${templateId}.md`);
      if (await exists(candidatePreset)) {
        if (!(await isStoryFile(candidatePreset, `${templateId}.md`))) {
          const content = await readFile(candidatePreset);
          return parseMarkdownTemplate(content, templateId);
        }
      }
    }

    return null;
  }

  async saveTemplate(template: SeriesTemplate): Promise<void> {
    await this.ensureDirectory();
    const mdContent = formatMarkdownTemplate(template);

    // Save globally (in video/ sub-vault if already there, otherwise root templates/ for backwards compatibility)
    const globalVideoMd = path.join(this.globalDir, 'video', `${template.template_id}.md`);
    const globalRootMd = path.join(this.globalDir, `${template.template_id}.md`);
    if (await exists(globalVideoMd)) {
      await writeFile(globalVideoMd, mdContent);
    } else {
      await writeFile(globalRootMd, mdContent);
    }

    // Also save in project scope if inside a project
    if (this.projectRoot) {
      const localVideoMd = path.join(this.projectRoot, 'openproducer', 'templates', 'video', `${template.template_id}.md`);
      const localRootMd = path.join(this.projectRoot, 'openproducer', 'templates', `${template.template_id}.md`);
      if (await exists(localVideoMd)) {
        await writeFile(localVideoMd, mdContent);
      } else {
        await writeFile(localRootMd, mdContent);
      }
    }
  }

  async saveStoryTemplate(template: StoryTemplate): Promise<void> {
    await this.ensureDirectory();
    const mdContent = formatStoryMarkdownTemplate(template);

    // Save globally in ~/.openproducer/templates/story/<id>.md
    const globalStoryMd = path.join(this.globalDir, 'story', `${template.template_id}.md`);
    await writeFile(globalStoryMd, mdContent);

    // Also save in project scope openproducer/templates/story/<id>.md if inside a project
    if (this.projectRoot) {
      const localStoryMd = path.join(this.projectRoot, 'openproducer', 'templates', 'story', `${template.template_id}.md`);
      await writeFile(localStoryMd, mdContent);
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

  async listGroupTemplates(groupName: string): Promise<TemplateInfo[]> {
    const all = await this.listAllTemplates();
    return all.filter((t) => t.group.toLowerCase() === groupName.toLowerCase());
  }

  async listAllTemplates(): Promise<TemplateInfo[]> {
    await this.ensureDirectory();
    await this.syncProjectTemplatesToGlobal();
    const map = new Map<string, TemplateInfo>();

    const scanDir = async (baseDir: string, defaultGroup?: string) => {
      if (!(await exists(baseDir))) return;
      try {
        const entries = await fsp.readdir(baseDir, { withFileTypes: true });
        for (const entry of entries) {
          if (entry.isDirectory()) {
            // sub-vault group (e.g. story, video, audio, style, motion)
            await scanDir(path.join(baseDir, entry.name), entry.name);
          } else if (entry.isFile() && (entry.name.endsWith('.md') || entry.name.endsWith('.json'))) {
            const ext = path.extname(entry.name);
            const id = path.basename(entry.name, ext);
            const fullPath = path.join(baseDir, entry.name);

            let group = defaultGroup;
            if (!group) {
              if (await isStoryFile(fullPath, entry.name)) {
                group = 'story';
              } else {
                group = 'video';
              }
            }

            const key = `${group}:${id}`;
            map.set(key, { id, path: fullPath, group });
          }
        }
      } catch {
        // ignore read error
      }
    };

    // 1. Starter presets
    for (const presetDir of getStarterPresetsDirs()) {
      await scanDir(presetDir);
    }

    // 1b. Bundled package templates
    for (const packageDir of getPackagePresetsDirs()) {
      await scanDir(packageDir, 'package');
    }

    // 2. Global directory
    await scanDir(this.globalDir);

    // 3. Project scope
    if (this.projectRoot) {
      await scanDir(path.join(this.projectRoot, 'openproducer', 'templates'));
    }

    return Array.from(map.values());
  }

  async listStoryTemplates(): Promise<TemplateInfo[]> {
    return this.listGroupTemplates('story');
  }

  async listVideoTemplates(): Promise<TemplateInfo[]> {
    return this.listGroupTemplates('video');
  }

  async listPackageTemplates(): Promise<TemplateInfo[]> {
    return this.listGroupTemplates('package');
  }

  async getGenericTemplate(templateId: string, group?: string): Promise<GenericTemplate | null> {
    await this.syncProjectTemplatesToGlobal();
    const all = await this.listAllTemplates();

    let candidate = all.find(
      (t) => t.id.toLowerCase() === templateId.toLowerCase() && (!group || t.group.toLowerCase() === group.toLowerCase())
    );

    if (!candidate && !group) {
      candidate = all.find((t) => t.id.toLowerCase() === templateId.toLowerCase());
    }

    if (!candidate) return null;

    try {
      const content = await readFile(candidate.path);
      const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
      const frontmatterStr = match ? match[1] : '';

      const fm: Record<string, string> = {};
      for (const line of frontmatterStr.split('\n')) {
        const parts = line.split(':');
        if (parts.length >= 2) {
          const key = parts[0].trim();
          const val = parts.slice(1).join(':').trim().replace(/^['"](.*)['"]$/, '$1');
          if (key) fm[key] = val;
        }
      }

      return {
        template_id: fm.template_id || candidate.id,
        group: candidate.group,
        type: fm.type,
        name: fm.name || candidate.id,
        raw_content: content,
        metadata: fm
      };
    } catch {
      return null;
    }
  }

  async readTemplate(
    templateId: string,
    group?: string
  ): Promise<{ id: string; group: string; path: string; content: string } | null> {
    await this.syncProjectTemplatesToGlobal();
    const all = await this.listAllTemplates();

    let candidate = all.find(
      (t) =>
        t.id.toLowerCase() === templateId.toLowerCase() &&
        (!group || t.group.toLowerCase() === group.toLowerCase())
    );

    if (!candidate && !group) {
      candidate = all.find((t) => t.id.toLowerCase() === templateId.toLowerCase());
    }

    if (!candidate) return null;

    try {
      const content = await readFile(candidate.path);
      return {
        id: candidate.id,
        group: candidate.group,
        path: candidate.path,
        content
      };
    } catch {
      return null;
    }
  }

  async saveGenericTemplate(group: string, templateId: string, markdownContent: string): Promise<void> {
    await this.ensureDirectory();
    const targetGroup = group.toLowerCase().trim() || 'video';

    // Global save: ~/.openproducer/templates/<group>/<id>.md
    const globalGroupDir = path.join(this.globalDir, targetGroup);
    await ensureDir(globalGroupDir);
    await writeFile(path.join(globalGroupDir, `${templateId}.md`), markdownContent);

    // Project save if inside project: openproducer/templates/<group>/<id>.md
    if (this.projectRoot) {
      const localGroupDir = path.join(this.projectRoot, 'openproducer', 'templates', targetGroup);
      await ensureDir(localGroupDir);
      await writeFile(path.join(localGroupDir, `${templateId}.md`), markdownContent);
    }
  }

  async getStoryTemplate(templateId: string): Promise<StoryTemplate | null> {
    await this.syncProjectTemplatesToGlobal();

    // 1. Check global story dir ~/.openproducer/templates/story/<id>.md
    const globalStoryMd = path.join(this.globalDir, 'story', `${templateId}.md`);
    if (await exists(globalStoryMd)) {
      const content = await readFile(globalStoryMd);
      return parseStoryMarkdownTemplate(content, templateId);
    }

    // 2. Check global dir ~/.openproducer/templates/<id>.md
    const globalMd = path.join(this.globalDir, `${templateId}.md`);
    if (await exists(globalMd)) {
      if (await isStoryFile(globalMd, `${templateId}.md`)) {
        const content = await readFile(globalMd);
        return parseStoryMarkdownTemplate(content, templateId);
      }
    }

    // 3. Check local project openproducer/templates/story/<id>.md and openproducer/templates/<id>.md
    if (this.projectRoot) {
      const localStoryMd = path.join(this.projectRoot, 'openproducer', 'templates', 'story', `${templateId}.md`);
      if (await exists(localStoryMd)) {
        const content = await readFile(localStoryMd);
        return parseStoryMarkdownTemplate(content, templateId);
      }

      const localMd = path.join(this.projectRoot, 'openproducer', 'templates', `${templateId}.md`);
      if (await exists(localMd)) {
        if (await isStoryFile(localMd, `${templateId}.md`)) {
          const content = await readFile(localMd);
          return parseStoryMarkdownTemplate(content, templateId);
        }
      }
    }

    // 4. Check starter presets
    for (const presetDir of getStarterPresetsDirs()) {
      const candidate = path.join(presetDir, `${templateId}.md`);
      if (await exists(candidate)) {
        if (await isStoryFile(candidate, `${templateId}.md`)) {
          const content = await readFile(candidate);
          return parseStoryMarkdownTemplate(content, templateId);
        }
      }
    }

    return null;
  }
}
