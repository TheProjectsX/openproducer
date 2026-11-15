import * as path from 'node:path';
import * as fsp from 'node:fs/promises';
import { DoctorResult, LinterEntry, LinterStatus } from './types';
import { BANNED_EQUIPMENT_NOUNS, BANNED_TECHNICAL_TOKENS, LINTER_REGISTRY } from './constants';
import { exists, readFile } from '../utils/fs';

type Prompt = { path: string; content: string; type: 'base' | 'image' | 'video' };
type Check = { status: LinterStatus; details: string };

// Configuration and negative lists are creator instructions, not creative prompt text.
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
    const results: DoctorResult['results'] = [];
    for (const rule of LINTER_REGISTRY) {
      const check = this.evaluateRule(rule.id, prompts);
      results.push({ id: rule.id, name: rule.name, ...check });
    }
    const passedCount = results.filter((r) => r.status === 'PASS').length;
    const warningCount = results.filter((r) => r.status === 'WARN').length;
    const failureCount = results.filter((r) => r.status === 'FAIL').length;
    const pendingCount = results.filter((r) => r.status === 'PENDING').length;
    return { certified: failureCount === 0 && warningCount === 0 && pendingCount === 0,
      passedCount, warningCount, failureCount, pendingCount, results };
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

  private evaluateRule(id: string, prompts: Prompt[]): Check {
    const videos = prompts.filter((p) => p.type === 'video');
    if (prompts.length === 0) return { status: 'PENDING', details: 'No production prompts exist.' };
    const failures: string[] = [];
    switch (id) {
      case 'L03':
      case 'L04': {
        const tokens = id === 'L03' ? BANNED_EQUIPMENT_NOUNS : BANNED_TECHNICAL_TOKENS;
        for (const prompt of prompts) {
          const body = creative(prompt);
          if (!body) { failures.push(`${label(prompt)}: missing creative prompt block`); continue; }
          for (const token of tokens) if (tokenPattern(token).test(body)) failures.push(`${label(prompt)}: ${token}`);
        }
        return failures.length ? { status: 'FAIL', details: failures.join('; ') } :
          { status: 'PASS', details: 'Creative blocks checked; configuration and negative blocks excluded.' };
      }
      case 'L05':
        if (!videos.length) return { status: 'PENDING', details: 'No clip video prompts yet.' };
        for (const prompt of videos) {
          const negative = block(prompt.content, 'NEGATIVE PROMPT');
          if (!/subtitles|closed captions|burned-in text/i.test(negative)) failures.push(label(prompt));
        }
        return failures.length ? { status: 'WARN', details: `Anti-subtitle negative missing: ${failures.join(', ')}` } :
          { status: 'PASS', details: 'Clip negative blocks include an anti-subtitle cue.' };
      case 'L06':
        if (!videos.length) return { status: 'PENDING', details: 'No clip video prompts yet.' };
        for (const prompt of videos) {
          if (!/Input Seed|First Frame|LAST_FRAME/i.test(prompt.content)) failures.push(label(prompt));
        }
        return failures.length ? { status: 'WARN', details: `Reference cue missing: ${failures.join(', ')}` } :
          { status: 'PASS', details: 'Prompt-file reference cues found; creator must select corresponding Flow images.' };
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
        for (const prompt of videos) {
          if (!/Input Seed|Starting directly|Continuing directly/i.test(prompt.content)) failures.push(label(prompt));
        }
        return failures.length ? { status: 'WARN', details: `Starting-frame instruction missing: ${failures.join(', ')}` } :
          { status: 'PASS', details: 'Starting-frame instructions present.' };
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
