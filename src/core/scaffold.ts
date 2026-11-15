import * as path from 'node:path';
import * as fsp from 'node:fs/promises';
import {
  DEFAULT_FLOW_ORCHESTRATION,
  LINTER_REGISTRY,
  VISUAL_STYLES
} from './constants';
import {
  InitOptions,
  OpenProducerConfig,
  OpenProducerManifest,
  OpenProducerState
} from './types';
import {
  copyRecursive,
  ensureDir,
  exists,
  readFile,
  writeFile,
  writeJson
} from '../utils/fs';
import { resolveTemplateSources, TemplateSourceResult } from './fetcher';
import {
  TemplateManager,
  formatMarkdownTemplate
} from './templates';

export interface ScaffoldResult {
  projectDir: string;
  projectName: string;
  tier: string;
  archetype: string;
  aspectRatio: string;
  visualStyle: string;
  audioPathway: string;
  audioDeliveryMode: string;
  filesCreated: string[];
  templateSource: TemplateSourceResult;
}

export async function scaffoldProject(options: InitOptions): Promise<ScaffoldResult> {
  const targetDir = path.resolve(process.cwd(), options.directory || '.');
  const projectName = options.name || path.basename(targetDir) || 'my_video_project';
  
  // When --yes=true (default) and not explicitly passed, leave setup blank from fetched template
  let tier = options.tier || '';
  let archetype = options.archetype || '';
  let aspectRatio = options.aspectRatio || '';
  let visualStyle = options.style || '';
  let audioPathway = options.audio || '';
  let audioDeliveryMode = options.delivery || '';
  let customMasterAnchor = '';

  await ensureDir(targetDir);

  // Only live video/package presets may initialize a production workspace.
  let loadedVideoPreset: any = null;
  let loadedGenericPreset: any = null;

  if (options.template) {
    const tm = new TemplateManager(targetDir);
    const videoPreset = await tm.getTemplate(options.template);
    const genericPreset = !videoPreset ? await tm.getGenericTemplate(options.template) : null;

    if (videoPreset) {
      loadedVideoPreset = videoPreset;
      tier = tier || (videoPreset.tier as any) || '';
      archetype = archetype || videoPreset.archetype || '';
      aspectRatio = aspectRatio || videoPreset.aspect_ratio || '';
      visualStyle = visualStyle || videoPreset.visual_dna?.style_id || '';
      audioPathway = audioPathway || videoPreset.audio_pathway || '';
      audioDeliveryMode = audioDeliveryMode || videoPreset.audio_delivery_mode || '';
      if (videoPreset.visual_dna?.master_style_anchor) {
        customMasterAnchor = videoPreset.visual_dna.master_style_anchor;
      }
    }

    if (genericPreset?.group === 'story' || (!videoPreset && options.template.startsWith('story-'))) {
      throw new Error('Story templates are archived and cannot initialize a live video project.');
    }
    if (genericPreset) {
      loadedGenericPreset = genericPreset;
    }
  }

  // Validate directory emptiness unless force is specified
  if (!options.force) {
    const entries = await fsp.readdir(targetDir);
    const nonIgnored = entries.filter((e) => !['.git', '.DS_Store', 'Thumbs.db'].includes(e));
    if (nonIgnored.length > 0 && (await exists(path.join(targetDir, 'openproducer')))) {
      throw new Error(
        `Target directory "${targetDir}" already contains an OpenProducer workspace. Use --force to re-initialize.`
      );
    }
  }

  // Resolve template sources (remote live upstream registry or local fallback)
  const templateSource = await resolveTemplateSources({
    offline: options.offline,
    token: options.token
  });

  const filesCreated: string[] = [];

  // 1. Create openproducer/ directory
  const openproducerDir = path.join(targetDir, 'openproducer');
  await ensureDir(openproducerDir);
  await ensureDir(path.join(openproducerDir, 'visual'));

  // 2. Generate openproducer/config.json (using template defaults, blank if not set)
  const config: OpenProducerConfig = {
    $comment: 'OpenProducer Brain Configuration. Saved during /opp-propose, /opp-sync, or /opp-template.',
    project_name: projectName,
    archetype,
    tier: (tier as any) || '',
    visual_style: visualStyle,
    aspect_ratio: aspectRatio,
    resolution: '1080p',
    target_duration_seconds: 0,
    flow_orchestration: DEFAULT_FLOW_ORCHESTRATION,
    audio_pathway: audioPathway,
    audio_delivery_mode: audioDeliveryMode,
    language: 'en-US',
    linter_profile: 'strict',
  };
  await writeJson(path.join(openproducerDir, 'config.json'), config);
  filesCreated.push('openproducer/config.json');

  // 3. Generate openproducer/state.json
  const state: OpenProducerState = {
    $comment: "OpenProducer State Tracker. Starts in 'init' mode by default.",
    project_name: projectName,
    tier,
    current_stage: 'init',
    stages: {
      propose_complete: false,
      produce_complete: false,
      clips_generated: false,
      base_image_locked: false,
      audio_script_locked: false,
      clips_rendered: false,
      assembly_complete: false
    },
    interactive_guidance: {
      enabled: false,
      active_step: 'not_started'
    },
    template_loaded: options.template || '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  await writeJson(path.join(openproducerDir, 'state.json'), state);
  filesCreated.push('openproducer/state.json');

  // 4. Generate openproducer/manifest.json
  const manifest: OpenProducerManifest = {
    $comment: 'Prompt-side audit ledger. Unimplemented and creator-review checks remain PENDING.',
    project_name: projectName,
    linter_suite_version: '2.0.0',
    audit_timestamp: new Date().toISOString(),
    certification_status: 'PENDING',
    linters: Object.fromEntries(LINTER_REGISTRY.map((rule) => [rule.id, { status: 'PENDING', details: 'Not audited yet.' }]))
  };
  await writeJson(path.join(openproducerDir, 'manifest.json'), manifest);
  filesCreated.push('openproducer/manifest.json');

  // 5. Generate openproducer/blueprint.md (clean defaults from fetch)
  const blueprintContent = `# OpenProducer Brain Blueprint

<!-- 
This file is the internal brain memory of OpenProducer (./openproducer/blueprint.md).
It is ONLY written/updated during /opp-propose, /opp-sync, or /opp-produce (never during read-only /opp-explore).
It archives the complete project context so any brand-new session can resume with 0 prior chat history.
-->

## 1. Project Intent & Configuration
* **Project Name:** ${projectName}
* **Operating Tier:** ${tier || '<lean_base_reference | modular_studio>'}
* **Archetype:** ${archetype}
* **Visual Style Paradigm:** ${visualStyle}
* **Aspect Ratio / Orientation:** ${aspectRatio}
* **Audio Pathway:** ${audioPathway || '<embedded | separate_audio>'}
* **Audio Delivery Mode:** ${audioDeliveryMode || '<embedded | separate_script_first | separate_all_at_once>'}

---

## 2. Raw Plot / Brainstormed Plot Points Archive (Historical Record Only)
<!-- 
ARCHIVE ONLY (Not used directly for prompt generation, preserved strictly as a historical record for future reference):
- If the creator provided a raw plot, record the verbatim raw plot here.
- If the creator brainstormed from 0, record the key plot points proposed during brainstorming here.
-->

---

## 3. Structured Story, Subjects & Environments Plan
<!-- Complete structured story arc, character/subject descriptions, and environment/setting descriptions -->

---

## 4. Drafted Script & Scene-by-Scene Pacing Plan
<!-- Complete drafted narration/dialogue script, shot-by-shot breakdown, camera kinematics, and planned 4s/6s/8s durations -->

---

## 5. Chronological Session & Sync Log

| Timestamp | Mode (\`propose\` / \`sync\` / \`produce\`) | Summary of Updates | Next Step |
|---|---|---|---|
| Initial | \`init\` | Workspace initialized in blank init mode | Run \`/opp-explore\` or \`/opp-template\` |
`;
  await writeFile(path.join(openproducerDir, 'blueprint.md'), blueprintContent);
  filesCreated.push('openproducer/blueprint.md');

  // 6. Write master technical anchor text ONLY if style explicitly configured or loaded from template
  if (customMasterAnchor) {
    await writeFile(path.join(openproducerDir, 'visual', 'technical_anchor.txt'), customMasterAnchor + '\n');
    filesCreated.push('openproducer/visual/technical_anchor.txt');
  } else if (visualStyle) {
    const matchedStyle = VISUAL_STYLES.find((s) => s.value === visualStyle);
    if (matchedStyle) {
      await writeFile(path.join(openproducerDir, 'visual', 'technical_anchor.txt'), matchedStyle.masterAnchor + '\n');
      filesCreated.push('openproducer/visual/technical_anchor.txt');
    }
  }

  // 6b. Mirror loaded template(s) into project openproducer/templates/ working directory
  if (options.template) {
    const localTplDir = path.join(openproducerDir, 'templates');
    await ensureDir(localTplDir);

    if (loadedVideoPreset) {
      const videoContent = loadedVideoPreset.raw_content || formatMarkdownTemplate(loadedVideoPreset);
      const localVideoPath = path.join(localTplDir, `${options.template}.md`);
      await writeFile(localVideoPath, videoContent);
      filesCreated.push(`openproducer/templates/${options.template}.md`);

      const localVideoSubDir = path.join(localTplDir, 'video');
      await ensureDir(localVideoSubDir);
      await writeFile(path.join(localVideoSubDir, `${options.template}.md`), videoContent);
      filesCreated.push(`openproducer/templates/video/${options.template}.md`);
    }


    if (loadedGenericPreset && loadedGenericPreset.raw_content) {
      const targetGroup = (loadedGenericPreset.group || 'generic').toLowerCase();
      const localGroupDir = path.join(localTplDir, targetGroup);
      await ensureDir(localGroupDir);
      const localGenericPath = path.join(localGroupDir, `${options.template}.md`);
      await writeFile(localGenericPath, loadedGenericPreset.raw_content);
      filesCreated.push(`openproducer/templates/${targetGroup}/${options.template}.md`);
    }
  }

  // 7. Copy AGENTS.md & STRUCTURE.md from resolved template source
  const templateAgentsMd = path.join(templateSource.productionTemplateDir, 'AGENTS.md');
  const templateStructureMd = path.join(templateSource.productionTemplateDir, 'STRUCTURE.md');
  if (await exists(templateAgentsMd)) {
    const content = await readFile(templateAgentsMd);
    await writeFile(path.join(targetDir, 'AGENTS.md'), content);
    filesCreated.push('AGENTS.md');
  }
  if (await exists(templateStructureMd)) {
    const content = await readFile(templateStructureMd);
    await writeFile(path.join(targetDir, 'STRUCTURE.md'), content);
    filesCreated.push('STRUCTURE.md');
  }

  // 8. Copy .agents/ (skills & workflows) from resolved template source
  if (await exists(templateSource.agentsDir)) {
    const agentsDest = path.join(targetDir, '.agents');
    await copyRecursive(templateSource.agentsDir, agentsDest);
    filesCreated.push('.agents/ (skills & workflows)');
  }

  // 9. Create .gitignore if none exists
  const gitignorePath = path.join(targetDir, '.gitignore');
  if (!(await exists(gitignorePath))) {
    const gitignoreContent = `# OpenProducer Project Git Ignore
node_modules/
*.tmp
*.log
.DS_Store
Thumbs.db
`;
    await writeFile(gitignorePath, gitignoreContent);
    filesCreated.push('.gitignore');
  }

  return {
    projectDir: targetDir,
    projectName,
    tier,
    archetype,
    aspectRatio,
    visualStyle,
    audioPathway,
    audioDeliveryMode,
    filesCreated,
    templateSource
  };
}
