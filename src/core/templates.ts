import * as os from 'node:os';
import * as path from 'node:path';
import * as fsp from 'node:fs/promises';
import { GenericTemplate, SeriesTemplate, StoryTemplate, TemplateInfo } from './types';
import { ensureDir, exists, findProjectRoot, readFile, writeFile } from '../utils/fs';

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

  if (!match) throw new Error(`Template "${templateId}" must start with Markdown frontmatter.`);
  const required = ['template_id', 'name', 'archetype', 'tier', 'aspect_ratio', 'audio_pathway', 'audio_delivery_mode'];
  for (const key of required) if (!fm[key]) throw new Error(`Template "${templateId}" is missing ${key}.`);
  if (fm.template_id !== templateId) throw new Error(`Template ID mismatch: expected "${templateId}", found "${fm.template_id}".`);
  const allowed: Record<string, string[]> = {
    tier: ['lean_base_reference', 'modular_studio'],
    aspect_ratio: ['16:9', '9:16'],
    audio_pathway: ['separate_audio', 'pathway_a_native_veo', 'pathway_b_external_audio'],
    audio_delivery_mode: ['embedded', 'separate_script_first', 'separate_all_at_once'],
    archetype: ['social_ugc', 'animation', 'cinematic', 'cinema', 'commercial', 'documentary', 'explainer', 'music_video']
  };
  for (const [key, values] of Object.entries(allowed)) {
    if (!values.includes(fm[key])) throw new Error(`Template "${templateId}" has unsupported ${key}: ${fm[key]}`);
  }
  const externalAudio = ['separate_audio', 'pathway_b_external_audio'].includes(fm.audio_pathway);
  if (externalAudio && fm.audio_delivery_mode === 'embedded') {
    throw new Error(`Template "${templateId}" mixes external audio with embedded delivery.`);
  }
  if (!externalAudio && fm.audio_delivery_mode !== 'embedded') {
    throw new Error(`Template "${templateId}" requires embedded delivery for native Veo audio.`);
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

  const styleAnchor = getBulletValue(visualSection, 'Master Style Anchor');
  const clipDuration = Number.parseInt(getBulletValue(pacingSection, 'Default Clip Duration'), 10);
  const speechPacing = Number.parseFloat(getBulletValue(pacingSection, 'Speech Pacing'));
  if (!styleAnchor) throw new Error(`Template "${templateId}" is missing Master Style Anchor.`);
  if (![4, 6, 8, 10].includes(clipDuration)) throw new Error(`Template "${templateId}" needs a 4s, 6s, 8s, or 10s Default Clip Duration.`);
  if (!Number.isFinite(speechPacing) || speechPacing <= 0) throw new Error(`Template "${templateId}" needs a positive Speech Pacing.`);

  return {
    template_id: fm.template_id || templateId,
    name: fm.name || templateId,
    archetype: fm.archetype || '',
    tier: fm.tier || 'lean_base_reference',
    aspect_ratio: fm.aspect_ratio || '16:9',
    resolution: fm.resolution || '1080p',
    audio_pathway: fm.audio_pathway === 'separate_audio' ? 'pathway_b_external_audio' : fm.audio_pathway,
    audio_delivery_mode: fm.audio_delivery_mode || 'separate_script_first',
    visual_dna: {
      style_id: getBulletValue(visualSection, 'Style ID'),
      master_style_anchor: styleAnchor,
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
      default_clip_duration: clipDuration,
      speech_pacing: speechPacing,
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
audio_pathway: ${template.audio_pathway || 'pathway_b_external_audio'}
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

function getStructurePresetsDirs(): string[] {
  return [
    path.join(__dirname, '..', 'templates', 'agents', 'skills', 'openproducer-core', 'templates', 'structure'),
    path.join(__dirname, '..', '..', 'src', 'templates', 'agents', 'skills', 'openproducer-core', 'templates', 'structure'),
    path.join(__dirname, '..', '..', 'dist', 'templates', 'agents', 'skills', 'openproducer-core', 'templates', 'structure'),
    path.join(__dirname, '..', '..', 'templates', 'agents', 'skills', 'openproducer-core', 'templates', 'structure'),
    path.join(__dirname, '..', '..', 'agents', 'skills', 'openproducer-core', 'templates', 'structure')
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
      await syncDirPair(path.join(dir, 'package'), path.join(this.globalDir, 'package'));
      await syncDirPair(path.join(dir, 'structure'), path.join(this.globalDir, 'structure'));
    }

    return synced;
  }

  async promoteProjectTemplate(templateId: string, group = 'video'): Promise<string> {
    if (!this.projectRoot) throw new Error('Open a project before promoting a template.');
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(templateId)) throw new Error('Invalid template ID.');
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(group)) throw new Error('Invalid template group.');
    if (group === 'story') throw new Error('Story templates are archived in the live workflow.');
    const local = group === 'video'
      ? [path.join(this.projectRoot, 'openproducer', 'templates', 'video', `${templateId}.md`),
         path.join(this.projectRoot, 'openproducer', 'templates', `${templateId}.md`)]
      : [path.join(this.projectRoot, 'openproducer', 'templates', group, `${templateId}.md`)];
    const source = (await Promise.all(local.map(async (candidate) => await exists(candidate) ? candidate : null)))
      .find((candidate): candidate is string => candidate !== null);
    if (!source) throw new Error(`Local ${group} template "${templateId}" not found.`);
    const content = await readFile(source);
    if (group === 'video') parseMarkdownTemplate(content, templateId);
    await this.ensureDirectory();
    const destination = path.join(this.globalDir, group, `${templateId}.md`);
    await ensureDir(path.dirname(destination));
    await writeFile(destination, content);
    return destination;
  }

  async listTemplates(): Promise<string[]> {
    const all = await this.listAllTemplates();
    return Array.from(new Set(all.map((t) => t.id)));
  }

  async getTemplate(templateId: string): Promise<SeriesTemplate | null> {

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
      throw new Error(`Legacy JSON template "${templateId}" is not validated. Convert it to a Markdown video template before use.`);
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
    if (!template.template_id || !template.name || !template.archetype || !template.tier ||
        !template.aspect_ratio || !template.audio_pathway || !template.audio_delivery_mode ||
        !template.visual_dna?.master_style_anchor || !template.pacing_profile?.default_clip_duration ||
        !template.pacing_profile?.speech_pacing) {
      throw new Error('Video template is missing required identity, format, audio, visual, or pacing fields.');
    }
    await this.ensureDirectory();
    const mdContent = formatMarkdownTemplate(template);
    parseMarkdownTemplate(mdContent, template.template_id);

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
    const map = new Map<string, TemplateInfo>();
    const bundledKeys = new Set<string>();

    const scanDir = async (baseDir: string, defaultGroup?: string, isBundled = false) => {
      if (!(await exists(baseDir))) return;
      try {
        const entries = await fsp.readdir(baseDir, { withFileTypes: true });
        for (const entry of entries) {
          if (entry.isDirectory()) {
            // sub-vault group (e.g. story, video, audio, style, motion)
            await scanDir(path.join(baseDir, entry.name), entry.name, isBundled);
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
            if (isBundled) {
              bundledKeys.add(key);
              map.set(key, { id, path: fullPath, group, isCustom: false });
            } else {
              const isCustom = !bundledKeys.has(key);
              const existing = map.get(key);
              map.set(key, {
                id,
                path: fullPath,
                group,
                isCustom: existing !== undefined ? existing.isCustom : isCustom
              });
            }
          }
        }
      } catch {
        // ignore read error
      }
    };

    // 1. Starter presets
    for (const presetDir of getStarterPresetsDirs()) {
      await scanDir(presetDir, undefined, true);
    }

    // 1b. Bundled package templates
    for (const packageDir of getPackagePresetsDirs()) {
      await scanDir(packageDir, 'package', true);
    }

    // 1c. Bundled structure templates
    for (const structureDir of getStructurePresetsDirs()) {
      await scanDir(structureDir, 'structure', true);
    }

    // 2. Global directory
    await scanDir(this.globalDir, undefined, false);

    // 3. Project scope
    if (this.projectRoot) {
      await scanDir(path.join(this.projectRoot, 'openproducer', 'templates'), undefined, false);
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

  async deleteTemplate(templateId: string, group?: string): Promise<string[]> {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/i.test(templateId)) {
      throw new Error('Invalid template ID.');
    }
    if (group && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/i.test(group)) {
      throw new Error('Invalid template group.');
    }

    const deleted: string[] = [];
    const targetGroups = group ? [group.toLowerCase()] : ['video', 'structure', 'package'];
    const roots = [this.globalDir];
    if (this.projectRoot) {
      roots.push(path.join(this.projectRoot, 'openproducer', 'templates'));
    }

    const candidates: string[] = [];
    for (const rootDir of roots) {
      if (!group) {
        candidates.push(path.join(rootDir, `${templateId}.md`), path.join(rootDir, `${templateId}.json`));
      }
      for (const grp of targetGroups) {
        candidates.push(path.join(rootDir, grp, `${templateId}.md`), path.join(rootDir, grp, `${templateId}.json`));
      }
    }

    for (const filePath of candidates) {
      if (await exists(filePath)) {
        await fsp.unlink(filePath);
        deleted.push(filePath);
      }
    }

    return deleted;
  }

  async getStoryTemplate(templateId: string): Promise<StoryTemplate | null> {

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
