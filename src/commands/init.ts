import * as path from 'node:path';
import prompts from 'prompts';
import {
  ASPECT_RATIOS,
  AUDIO_DELIVERY_MODES,
  AUDIO_PATHWAYS,
  OPERATING_TIERS,
  PROJECT_ARCHETYPES,
  VISUAL_STYLES
} from '../core/constants';
import { scaffoldProject } from '../core/scaffold';
import { InitOptions } from '../core/types';
import { logger } from '../utils/logger';

export async function initCommand(directory?: string, cmdOptions: Partial<InitOptions> = {}): Promise<void> {
  logger.banner();

  const targetDir = path.resolve(process.cwd(), directory || cmdOptions.directory || '.');
  const defaultProjectName = path.basename(targetDir) || 'my_video_project';

  // Default yes to true unless explicitly overridden
  const isYes = cmdOptions.yes !== undefined ? Boolean(cmdOptions.yes) : true;
  const isInteractive = Boolean(cmdOptions.interactive) || (!isYes && Boolean(process.stdout.isTTY));

  let configOptions: InitOptions = {
    directory: targetDir,
    name: cmdOptions.name || defaultProjectName,
    tier: cmdOptions.tier,
    archetype: cmdOptions.archetype,
    aspectRatio: cmdOptions.aspectRatio,
    style: cmdOptions.style,
    audio: cmdOptions.audio,
    delivery: cmdOptions.delivery,
    template: cmdOptions.template,
    yes: isYes,
    interactive: isInteractive,
    force: cmdOptions.force || false,
    offline: cmdOptions.offline || false,
    token: cmdOptions.token
  };

  // Only run interactive questions if explicitly requested via -i / --interactive or --no-yes
  if (isInteractive) {
    logger.info(`Interactive setup mode enabled for: ${targetDir}`);
    console.log('');

    const answers = await prompts(
      [
        {
          type: 'text',
          name: 'name',
          message: 'Project name:',
          initial: defaultProjectName
        },
        {
          type: 'select',
          name: 'tier',
          message: 'Operating tier:',
          choices: OPERATING_TIERS.map((t) => ({
            title: t.title,
            description: t.description,
            value: t.value
          })),
          initial: 0
        },
        {
          type: 'select',
          name: 'archetype',
          message: 'Project archetype:',
          choices: PROJECT_ARCHETYPES.map((a) => ({
            title: a.title,
            description: a.description,
            value: a.value
          })),
          initial: 0
        },
        {
          type: 'select',
          name: 'aspectRatio',
          message: 'Aspect ratio / Framing:',
          choices: ASPECT_RATIOS.map((r) => ({
            title: r.title,
            description: r.description,
            value: r.value
          })),
          initial: 0
        },
        {
          type: 'select',
          name: 'style',
          message: 'Master visual style paradigm:',
          choices: VISUAL_STYLES.map((s) => ({
            title: s.title,
            description: s.masterAnchor.slice(0, 70) + '...',
            value: s.value
          })),
          initial: 0
        },
        {
          type: 'select',
          name: 'audio',
          message: 'Audio pathway:',
          choices: AUDIO_PATHWAYS.map((p) => ({
            title: p.title,
            description: p.description,
            value: p.value
          })),
          initial: 0
        },
        {
          type: (prev) => (prev === 'pathway_b_external_audio' ? 'select' : null),
          name: 'delivery',
          message: 'Audio delivery mode:',
          choices: AUDIO_DELIVERY_MODES.map((d) => ({
            title: d.title,
            description: d.description,
            value: d.value
          })),
          initial: 0
        }
      ],
      {
        onCancel: () => {
          logger.warn('Initialization aborted by creator.');
          process.exit(0);
        }
      }
    );

    configOptions = {
      ...configOptions,
      name: answers.name || defaultProjectName,
      tier: answers.tier || configOptions.tier,
      archetype: answers.archetype || configOptions.archetype,
      aspectRatio: answers.aspectRatio || configOptions.aspectRatio,
      style: answers.style || configOptions.style,
      audio: answers.audio || configOptions.audio,
      delivery: answers.delivery || configOptions.delivery
    };
  }

  try {
    const result = await scaffoldProject(configOptions);

    logger.success(`OpenProducer project successfully initialized!`);

    const sourceLabel =
      result.templateSource.sourceType === 'local-bundled'
        ? 'Bundled Local Package'
        : `Live GitHub Upstream (${result.templateSource.sourceLocation})`;

    const formatField = (val: string) => val || '(Pending /opp:explore intake)';

    logger.card(
      `PRODUCER BLUEPRINT INITIALIZED`,
      [
        ['Project Name', result.projectName],
        ['Root Directory', result.projectDir],
        ['Operating Tier', formatField(result.tier)],
        ['Archetype', formatField(result.archetype)],
        ['Aspect Ratio', formatField(result.aspectRatio)],
        ['Visual Style', formatField(result.visualStyle)],
        ['Audio Pathway', formatField(result.audioPathway)],
        ['Template Source', sourceLabel],
        ['AI Skills Loaded', '.agents/skills (7 Modes + Core Specs)']
      ],
      'Status: READ-ONLY EXPLORE MODE ACTIVE'
    );

    console.log('Next Steps:');
    if (path.resolve(targetDir) !== process.cwd()) {
      console.log(`  1. cd ${path.relative(process.cwd(), targetDir) || '.'}`);
    }
    console.log(`  2. Open in your AI IDE (Antigravity, Cursor, VS Code, Claude Code).`);
    console.log(`  3. Tell your AI Assistant: "I have an idea for a video" or run /opp:explore.`);
    console.log(`  4. OpenProducer will conduct intake, lock settings, and generate production prompts!`);
    console.log('');
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    logger.error(`Initialization failed: ${message}`);
    process.exit(1);
  }
}
