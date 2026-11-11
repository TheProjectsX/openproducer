import * as path from 'node:path';
import pc from 'picocolors';
import { ConfigManager } from '../core/config';
import { exists } from '../utils/fs';
import { logger } from '../utils/logger';

export async function statusCommand(): Promise<void> {
  logger.banner();

  const configMgr = new ConfigManager();
  if (!(await configMgr.isInitialized())) {
    logger.error('No OpenProducer project found in this directory or its parents.');
    logger.info('Run "npx openproducer init" to create one.');
    process.exit(1);
  }

  const config = await configMgr.readConfig();
  const state = await configMgr.readState();

  const hasStoryScript = await exists(path.join(configMgr.root, 'production', 'story', 'script.txt'));
  const hasStoryClean = await exists(path.join(configMgr.root, 'production', 'story', 'clean.txt'));
  const storyStatus = hasStoryScript
    ? pc.green(`READY (${hasStoryClean ? 'script.txt + clean.txt' : 'script.txt'})`)
    : pc.dim('Not created (Optional: /opp-write or /opp-rewrite)');

  const stageLabels: Record<string, string> = {
    init: 'INIT (Blank Initialized Workspace — Ready for Explore, Template, or Story)',
    explore: 'EXPLORE (Creative Intake & Discovery — Read-Only)',
    proposed: 'PROPOSED (Internal Draft in Brain — Pending Approval)',
    produced: 'PRODUCED (Physical Deliverables Created in production/)',
    guiding: 'GUIDING (Interactive 4-Gate Production Co-Pilot)',
    completed: 'COMPLETED (All Clips Rendered & Assembled)'
  };

  const stageDisplay = stageLabels[state.current_stage] || state.current_stage.toUpperCase();

  const locks = [
    `Base Image: ${state.stages.base_image_locked ? pc.green('LOCKED') : pc.yellow('UNLOCKED')}`,
    `Audio/Script: ${state.stages.audio_script_locked ? pc.green('LOCKED') : pc.yellow('UNLOCKED')}`,
    `Clips Generated: ${state.stages.clips_generated ? pc.green('YES') : pc.dim('NO')}`,
    `Clips Rendered: ${state.stages.clips_rendered ? pc.green('YES') : pc.dim('NO')}`
  ].join(' | ');

  logger.card(
    `PROJECT STATUS: ${config.project_name.toUpperCase()}`,
    [
      ['Root Directory', configMgr.root],
      ['Current Stage', stageDisplay],
      ['Pre-Prod Story', storyStatus],
      ...(config.story_template_id ? [['Story Template', config.story_template_id] as [string, string]] : []),
      ['Operating Tier', config.tier],
      ['Archetype', config.archetype],
      ['Framing / Aspect', config.aspect_ratio],
      ['Visual Style', config.visual_style],
      ['Audio Pathway', config.audio_pathway],
      ['Stage Locks', locks]
    ],
    state.current_stage === 'init'
      ? hasStoryScript
        ? 'Next: Run /opp-explore to configure video settings or /opp-propose to lock into brain'
        : 'Next: Run /opp-explore, /opp-template, or /opp-write to start your project'
      : state.current_stage === 'explore'
      ? hasStoryScript
        ? 'Next: Run /opp-explore or /opp-propose to ingest story into brain'
        : 'Next: Run /opp-write, /opp-rewrite, or /opp-propose'
      : state.current_stage === 'proposed'
      ? 'Next: Run /opp-produce to generate physical production files'
      : 'Next: Run /opp-guide for interactive 4-gate co-pilot'
  );
}

