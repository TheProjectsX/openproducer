import * as path from 'node:path';
import * as fsp from 'node:fs/promises';
import { DoctorResult, LinterEntry, LinterStatus } from './types';
import { BANNED_EQUIPMENT_NOUNS, BANNED_TECHNICAL_TOKENS, LINTER_REGISTRY } from './constants';
import { TemplateManager } from './templates';
import { exists, readFile, readJson } from '../utils/fs';

type Prompt = { path: string; content: string; type: 'base' | 'image' | 'video' };
type Check = { status: LinterStatus; details: string };
type StructureFlags = {
  id: string;
  referenceStyle: string;
  allowNegativeBlock: boolean;
  injectSettingsInPrompt: boolean;
};

// Read the creative block separately from configuration and any legacy negative block.
function block(content: string, name: 'IMAGE PROMPT' | 'VIDEO PROMPT' | 'NEGATIVE PROMPT'): string {
  const match = content.match(new RegExp(`\\[${name}\\]\\s*([\\s\\S]*?)(?=\\n\\[[A-Z][^\\]]*\\]|$)`, 'i'));
  return match?.[1]?.trim() || '';
}

function creative(prompt: Prompt): string {
  return block(prompt.content, prompt.type === 'video' ? 'VIDEO PROMPT' : 'IMAGE PROMPT');
}

function label(prompt: Prompt): string {
  return path.relative(process.cwd(), prompt.path) || prompt.path;
}

function tokenPattern(token: string): RegExp {
  const escaped = token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`(^|[^\\p{L}\\p{N}])${escaped}($|[^\\p{L}\\p{N}])`, 'iu');
}

export class LinterSuite {
  constructor(private projectRoot: string) {}

  async runAll(): Promise<DoctorResult> {
    const prompts = await this.collectPromptFiles();
    const structure = await this.loadStructureFlags();
    const results: DoctorResult['results'] = [];
    for (const rule of LINTER_REGISTRY) {
      const check = this.evaluateRule(rule.id, prompts, structure);
      results.push({ id: rule.id, name: rule.name, ...check });
    }
    const passedCount = results.filter((r) => r.status === 'PASS').length;
    const warningCount = results.filter((r) => r.status === 'WARN').length;
    const failureCount = results.filter((r) => r.status === 'FAIL').length;
    const pendingCount = results.filter((r) => r.status === 'PENDING').length;
    return { certified: failureCount === 0 && warningCount === 0 && pendingCount === 0,
      passedCount, warningCount, failureCount, pendingCount, results };
  }

  private async loadStructureFlags(): Promise<StructureFlags> {
    const defaults: StructureFlags = {
      id: 'google-flow-default',
      referenceStyle: 'image_pointers',
      allowNegativeBlock: false,
      injectSettingsInPrompt: false
    };
    const configPath = path.join(this.projectRoot, 'openproducer', 'config.json');
    if (!(await exists(configPath))) return defaults;
    try {
      const config = await readJson<{ structure_template_id?: string }>(configPath);
      const structureId = config?.structure_template_id;
      if (!structureId || structureId === 'google-flow-default') return defaults;
      const tpl = await new TemplateManager(this.projectRoot).getGenericTemplate(structureId, 'structure');
      if (!tpl?.metadata) return { ...defaults, id: structureId };
      return {
        id: structureId,
        referenceStyle: tpl.metadata.reference_style || 'image_pointers',
        allowNegativeBlock: tpl.metadata.allow_negative_block === 'true',
        injectSettingsInPrompt: tpl.metadata.inject_settings_in_prompt === 'true'
      };
    } catch {
      return defaults;
    }
  }

  private async collectPromptFiles(): Promise<Prompt[]> {
    const files: Prompt[] = [];
    const base = path.join(this.projectRoot, 'production', 'base_image_prompt.txt');
    if (await exists(base)) files.push({ path: base, content: await readFile(base), type: 'base' });
    const clips = path.join(this.projectRoot, 'production', 'clips');
    if (!(await exists(clips))) return files;
    for (const entry of await fsp.readdir(clips, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      for (const [file, type] of [['video_prompt.txt', 'video'], ['image_prompt.txt', 'image']] as const) {
        const filePath = path.join(clips, entry.name, file);
        if (await exists(filePath)) files.push({ path: filePath, content: await readFile(filePath), type });
      }
    }
    return files;
  }

  private evaluateRule(id: string, prompts: Prompt[], structure: StructureFlags): Check {
    const videos = prompts.filter((p) => p.type === 'video');
    if (prompts.length === 0) return { status: 'PENDING', details: 'No production prompts exist.' };
    const failures: string[] = [];
    switch (id) {
      case 'L03':
      case 'L04': {
        if (id === 'L04' && structure.injectSettingsInPrompt) {
          return { status: 'PASS', details: `Active structure "${structure.id}" requires settings inside prompt text.` };
        }
        const tokens = id === 'L03' ? BANNED_EQUIPMENT_NOUNS : BANNED_TECHNICAL_TOKENS;
        for (const prompt of prompts) {
          const body = creative(prompt) || (structure.id !== 'google-flow-default' ? prompt.content : '');
          if (!body) { failures.push(`${label(prompt)}: missing creative prompt block`); continue; }
          for (const token of tokens) if (tokenPattern(token).test(body)) failures.push(`${label(prompt)}: ${token}`);
        }
        return failures.length ? { status: 'FAIL', details: failures.join('; ') } :
          { status: 'PASS', details: 'Creative blocks checked; configuration and legacy negative blocks excluded.' };
      }
      case 'L05':
        if (!videos.length) return { status: 'PENDING', details: 'No clip video prompts yet.' };
        if (structure.allowNegativeBlock) {
          return { status: 'PASS', details: `Active structure "${structure.id}" permits [NEGATIVE PROMPT] blocks.` };
        }
        for (const prompt of videos) {
          const negative = block(prompt.content, 'NEGATIVE PROMPT');
          if (negative || /^\s*(?:\[NEGATIVE PROMPT\]|NEGATIVE PROMPT:)/im.test(prompt.content)) failures.push(label(prompt));
        }
        return failures.length ? { status: 'FAIL', details: `Standalone negative block in Flow video prompt: ${failures.join(', ')}` } :
          { status: 'PENDING', details: 'Flow prompt has no standalone negative block; unwanted text and subtitles require rendered review.' };
      case 'L06':
        if (!videos.length) return { status: 'PENDING', details: 'No clip video prompts yet.' };
        if (structure.referenceStyle !== 'image_pointers') {
          return { status: 'PASS', details: `Active structure "${structure.id}" uses "${structure.referenceStyle}" instead of [IMAGE N] pointers.` };
        }
        for (const prompt of videos) {
          const inputs = prompt.content.match(/\[INPUT SEEDS & INGREDIENTS\]\s*([\s\S]*?)(?=\n\[VIDEO PROMPT\]|$)/i)?.[1] || '';
          const body = creative(prompt);
          const roles = [...inputs.matchAll(/^\[IMAGE (\d+)\]\s+([^:\n]+):\s*(.+)$/gmi)];
          const startSource = inputs.match(/^Start Source:\s*(?:\[IMAGE (\d+)\]|none)\s*$/im);
          const startId = startSource?.[1];
          const roleIds = roles.map((match) => match[1]);
          const uniqueIds = new Set(roleIds);
          const bodyNamesEveryImage = roles.every((match) => new RegExp(`\\[IMAGE ${match[1]}\\]`, 'i').test(body));
          const startRole = !startId || roles.some((match) => match[1] === startId && /\bSTART\b/i.test(match[2]));
          const startDirected = !startId || new RegExp(`\\b(?:start|begin|open)\\b[^.\\n]{0,100}\\[IMAGE ${startId}\\]`, 'i').test(body);
          if (!roles.length || !startSource || uniqueIds.size !== roleIds.length || !bodyNamesEveryImage || !startRole || !startDirected) failures.push(label(prompt));
        }
        return failures.length ? { status: 'WARN', details: `Image pointers, contextual roles, or optional start source missing or inconsistent: ${failures.join(', ')}` } :
          { status: 'PASS', details: 'Video prompts direct the use of every attached image; any start source is explicitly named. Creator must select the corresponding Flow images and review renders.' };
      case 'L09':
        if (!videos.length) return { status: 'PENDING', details: 'No clip video prompts yet.' };
        for (const prompt of videos) {
          const duration = prompt.content.match(/^Duration:\s*(\d+)s\b/im);
          if (!duration || ![4, 6, 8, 10].includes(Number(duration[1]))) failures.push(label(prompt));
        }
        return failures.length ? { status: 'FAIL', details: `Missing or unsupported generation duration: ${failures.join(', ')}` } :
          { status: 'PASS', details: 'Generation durations use project choices; Flow model/mode compatibility needs creator check.' };
      case 'L11':
        if (!videos.length) return { status: 'PENDING', details: 'No clip video prompts yet.' };
        if (structure.referenceStyle !== 'image_pointers') {
          return { status: 'PASS', details: `Active structure "${structure.id}" uses "${structure.referenceStyle}" instead of Start Source: [IMAGE N].` };
        }
        for (const prompt of videos) {
          const inputs = prompt.content.match(/\[INPUT SEEDS & INGREDIENTS\]\s*([\s\S]*?)(?=\n\[VIDEO PROMPT\]|$)/i)?.[1] || '';
          const startSource = inputs.match(/^Start Source:\s*(?:\[IMAGE (\d+)\]|none)\s*$/im);
          const startId = startSource?.[1];
          const body = creative(prompt);
          if (!startSource || (startId && !new RegExp(`\\b(?:start|begin|open)\\b[^.\\n]{0,100}\\[IMAGE ${startId}\\]`, 'i').test(body))) failures.push(label(prompt));
        }
        return failures.length ? { status: 'WARN', details: `Start-source declaration or selected-frame direction missing: ${failures.join(', ')}` } :
          { status: 'PASS', details: 'Start source is declared, with a matching frame direction when one is used.' };
      case 'L17':
        if (!videos.length) return { status: 'PENDING', details: 'No clip video prompts yet.' };
        for (const prompt of videos) {
          const body = creative(prompt);
          if (!/Audio:\s*SFX:.*;\s*Ambience:.*;\s*Dialogue:.*;\s*Music:/is.test(body)) failures.push(label(prompt));
        }
        return failures.length ? { status: 'WARN', details: `Structured audio fields missing: ${failures.join(', ')}` } :
          { status: 'PASS', details: 'Prompt audio fields present; final continuity is a manual edit review.' };
      case 'L19': {
        const review = prompts.filter((p) => /jump off|hanging off roof|unprotected ledge/i.test(creative(p)));
        return { status: 'PENDING', details: review.length
          ? `Context review needed for: ${review.map(label).join(', ')}`
          : 'Safety context requires human review; keyword absence is not certification.' };
      }
      default:
        return { status: 'PENDING', details: 'Requires cue-to-visual or creator review; not automatically certified.' };
    }
  }

  manifestSummary(results: DoctorResult['results']): Record<string, LinterEntry> {
    return Object.fromEntries(results.map((r) => [r.id, { status: r.status, details: r.details }]));
  }
}
