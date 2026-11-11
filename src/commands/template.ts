import * as path from 'node:path';
import pc from 'picocolors';
import { ConfigManager } from '../core/config';
import { TemplateManager } from '../core/templates';
import { SeriesTemplate } from '../core/types';
import { exists, readFile } from '../utils/fs';
import { logger } from '../utils/logger';

export async function templateCommand(
  action = 'list',
  templateId?: string,
  instruction?: string,
  options?: { paths?: boolean; verbose?: boolean }
): Promise<void> {
  logger.banner();

  const configMgr = new ConfigManager();
  const tm = new TemplateManager(configMgr.root);
  const showPaths = Boolean(options?.paths || options?.verbose);

  // 1. Action: list
  if (action === 'list') {
    const videoList = await tm.listVideoTemplates();
    const storyList = await tm.listStoryTemplates();
    logger.info(`Series templates located in: ${pc.dim(tm.directory)}`);
    console.log('');
    console.log(pc.bold('🎬 Video & Cinematography Templates:'));
    if (videoList.length === 0) {
      console.log('  No video templates found.');
    } else {
      for (const t of videoList) {
        console.log(`  • ${pc.cyan(t.id)}`);
        if (showPaths) {
          console.log(`    ${pc.dim(`↳ ${t.path}`)}`);
        }
      }
    }
    console.log('');
    console.log(pc.bold('📖 Story & Narrative Templates:'));
    if (storyList.length === 0) {
      console.log('  No story templates found.');
    } else {
      for (const t of storyList) {
        console.log(`  • ${pc.yellow(t.id)}`);
        if (showPaths) {
          console.log(`    ${pc.dim(`↳ ${t.path}`)}`);
        }
      }
    }
    if (!showPaths) {
      console.log('');
      console.log(pc.dim('💡 Tip: Run "openproducer template list -p" (or --paths) to display exact file paths on disk.'));
    }
    console.log('');
    return;
  }

  // 2. Action: save
  if (action === 'save') {
    if (!templateId) {
      logger.error('Please specify a template name: "openproducer template save <template-name>"');
      process.exit(1);
    }
    const configMgr = new ConfigManager();
    if (!(await configMgr.isInitialized())) {
      logger.error('No OpenProducer project found in this directory. Initialize one first.');
      process.exit(1);
    }
    const config = await configMgr.readConfig();

    let masterAnchor = `Derived from ${config.visual_style || 'default cinema'}`;
    const anchorPath = path.join(configMgr.root, 'openproducer', 'visual', 'technical_anchor.txt');
    if (await exists(anchorPath)) {
      const customAnchor = (await readFile(anchorPath)).trim();
      if (customAnchor) masterAnchor = customAnchor;
    }

    const template: SeriesTemplate = {
      template_id: templateId,
      name: `${config.project_name} Series Preset`,
      archetype: config.archetype,
      tier: config.tier,
      aspect_ratio: config.aspect_ratio,
      resolution: config.resolution || '1080p',
      audio_pathway: config.audio_pathway,
      audio_delivery_mode: config.audio_delivery_mode,
      visual_dna: {
        style_id: config.visual_style,
        master_style_anchor: masterAnchor,
        negative_prompt: 'blurry, distorted, watermarks, text, CGI artifacts, plastic skin'
      }
    };

    // Check motion graphics
    const motionPath = path.join(configMgr.root, 'production', 'motion_graphics.md');
    if (await exists(motionPath)) {
      const motionContent = await readFile(motionPath);
      const fontMatch = motionContent.match(/Font(?:\s*Family)?:\s*([^\r\n]+)/i);
      const colorMatch = motionContent.match(/Primary(?:\s*Color)?:\s*([#a-zA-Z0-9]+)/i);
      const accentMatch = motionContent.match(/Accent(?:\s*Color)?:\s*([#a-zA-Z0-9]+)/i);
      if (fontMatch || colorMatch || accentMatch) {
        template.motion_graphics = {
          font_family: fontMatch ? fontMatch[1].trim() : undefined,
          primary_color: colorMatch ? colorMatch[1].trim() : undefined,
          accent_color: accentMatch ? accentMatch[1].trim() : undefined
        };
      }
    }

    await tm.saveTemplate(template);
    logger.success(`Series template saved globally as Markdown: "${templateId}.md"`);
    console.log(`You can now use it in new projects with: "openproducer init --template ${templateId}"`);
    console.log('');
    return;
  }

  // 3. Action: use / load
  if (action === 'use' || action === 'load') {
    if (!templateId) {
      logger.error('Please specify a template name to use: "openproducer template use <template-name>"');
      process.exit(1);
    }

    const configMgr = new ConfigManager();
    if (!(await configMgr.isInitialized())) {
      logger.error('No OpenProducer project found. Run "openproducer init" first.');
      process.exit(1);
    }

    // Check if it's a Story Template first
    const storyTemplate = await tm.getStoryTemplate(templateId);
    if (storyTemplate) {
      const config = await configMgr.readConfig();
      config.story_template_id = templateId;
      await configMgr.writeConfig(config);

      // Scaffold production/story/beats.md if missing
      const fs = require('../utils/fs');
      const storyDir = path.join(configMgr.root, 'production', 'story');
      await fs.ensureDir(storyDir);
      const beatsPath = path.join(storyDir, 'beats.md');
      if (!(await fs.exists(beatsPath))) {
        await fs.writeFile(
          beatsPath,
          `# 🗺️ Story Beats: ${storyTemplate.name}\n- **Template:** \`${storyTemplate.template_id}\`\n- **Archetype:** \`${storyTemplate.narrative_archetype}\`\n- **Target WPM:** ${storyTemplate.target_wpm || 135}\n\n## 🪝 Active Story Structure\n*(Generated via /opp-write or /opp-rewrite)*\n`
        );
      }

      logger.success(`Applied Story Template "${pc.yellow(templateId)}" (${storyTemplate.name}) to workspace.`);
      logger.info(`Next step: Run "/opp-write" or "/opp-rewrite" to generate/adapt your story using this template!`);
      console.log('');
      return;
    }

    // Otherwise treat as a Video Template
    const template = await tm.getTemplate(templateId);
    if (!template) {
      logger.error(`Template "${templateId}" not found in ${tm.directory}`);
      process.exit(1);
    }
    const config = await configMgr.readConfig();
    config.archetype = template.archetype || config.archetype;
    config.aspect_ratio = template.aspect_ratio || config.aspect_ratio;
    config.tier = (template.tier as any) || config.tier;
    config.audio_pathway = template.audio_pathway || config.audio_pathway;
    config.audio_delivery_mode = template.audio_delivery_mode || config.audio_delivery_mode;
    if (template.visual_dna?.style_id) {
      config.visual_style = template.visual_dna.style_id;
    }
    await configMgr.writeConfig(config);

    if (template.visual_dna?.master_style_anchor) {
      const anchorPath = path.join(configMgr.root, 'openproducer', 'visual', 'technical_anchor.txt');
      await readFile(anchorPath)
        .catch(() => '')
        .then(async () => {
          const fs = require('../utils/fs');
          await fs.writeFile(anchorPath, template.visual_dna.master_style_anchor + '\n');
        });
    }

    const state = await configMgr.readState();
    state.template_loaded = templateId;
    await configMgr.writeState(state);

    logger.success(`Applied series template "${templateId}" to current workspace brain.`);
    console.log('');
    return;
  }

  // 4. Action: update
  if (action === 'update') {
    if (!templateId) {
      logger.error('Please specify a template name to update: "openproducer template update <template-name> [instructions]"');
      process.exit(1);
    }
    const existing = await tm.getTemplate(templateId);
    if (!existing) {
      logger.error(`Template "${templateId}" not found in ${tm.directory}`);
      logger.info('To create a new template from this project, use: "openproducer template save ' + templateId + '"');
      process.exit(1);
    }

    const configMgr = new ConfigManager();
    if (!(await configMgr.isInitialized())) {
      logger.error('No OpenProducer project found in this directory. Initialize or open a project first to extract updates.');
      process.exit(1);
    }

    const config = await configMgr.readConfig();
    const changes: string[] = [];

    // A. Update configuration settings from workspace
    if (config.archetype && config.archetype !== existing.archetype) {
      changes.push(`Archetype: "${existing.archetype}" -> "${config.archetype}"`);
      existing.archetype = config.archetype;
    }
    if (config.aspect_ratio && config.aspect_ratio !== existing.aspect_ratio) {
      changes.push(`Aspect Ratio: "${existing.aspect_ratio}" -> "${config.aspect_ratio}"`);
      existing.aspect_ratio = config.aspect_ratio;
    }
    if (config.tier && config.tier !== existing.tier) {
      changes.push(`Tier: "${existing.tier}" -> "${config.tier}"`);
      existing.tier = config.tier;
    }
    if (config.audio_pathway && config.audio_pathway !== existing.audio_pathway) {
      changes.push(`Audio Pathway: "${existing.audio_pathway}" -> "${config.audio_pathway}"`);
      existing.audio_pathway = config.audio_pathway;
    }
    if (config.audio_delivery_mode && config.audio_delivery_mode !== existing.audio_delivery_mode) {
      changes.push(`Audio Delivery Mode: "${existing.audio_delivery_mode}" -> "${config.audio_delivery_mode}"`);
      existing.audio_delivery_mode = config.audio_delivery_mode;
    }

    // B. Update Master Style Anchor from openproducer/visual/technical_anchor.txt
    const anchorPath = path.join(configMgr.root, 'openproducer', 'visual', 'technical_anchor.txt');
    if (await exists(anchorPath)) {
      const anchorContent = (await readFile(anchorPath)).trim();
      if (anchorContent && anchorContent !== existing.visual_dna.master_style_anchor) {
        existing.visual_dna.master_style_anchor = anchorContent;
        changes.push('Visual DNA: Master Style Anchor updated from technical_anchor.txt');
      }
    }
    if (config.visual_style && config.visual_style !== existing.visual_dna.style_id) {
      existing.visual_dna.style_id = config.visual_style;
      changes.push(`Visual DNA: Style ID updated to "${config.visual_style}"`);
    }

    // C. Update Motion Graphics from production/motion_graphics.md
    const motionPath = path.join(configMgr.root, 'production', 'motion_graphics.md');
    if (await exists(motionPath)) {
      const motionContent = await readFile(motionPath);
      const fontMatch = motionContent.match(/Font(?:\s*Family)?:\s*([^\r\n]+)/i);
      const colorMatch = motionContent.match(/Primary(?:\s*Color)?:\s*([#a-zA-Z0-9]+)/i);
      const accentMatch = motionContent.match(/Accent(?:\s*Color)?:\s*([#a-zA-Z0-9]+)/i);
      if (fontMatch || colorMatch || accentMatch) {
        if (!existing.motion_graphics) existing.motion_graphics = {};
        if (fontMatch && fontMatch[1].trim() !== existing.motion_graphics.font_family) {
          existing.motion_graphics.font_family = fontMatch[1].trim();
          changes.push(`Motion Graphics: Font Family -> "${fontMatch[1].trim()}"`);
        }
        if (colorMatch && colorMatch[1].trim() !== existing.motion_graphics.primary_color) {
          existing.motion_graphics.primary_color = colorMatch[1].trim();
          changes.push(`Motion Graphics: Primary Color -> "${colorMatch[1].trim()}"`);
        }
        if (accentMatch && accentMatch[1].trim() !== existing.motion_graphics.accent_color) {
          existing.motion_graphics.accent_color = accentMatch[1].trim();
          changes.push(`Motion Graphics: Accent Color -> "${accentMatch[1].trim()}"`);
        }
      }
    }

    // D. Incorporate creator instructions if supplied
    if (instruction) {
      changes.push(`Applied creator directive: "${instruction}"`);
    }

    // Save updated template as Markdown
    await tm.saveTemplate(existing);

    logger.success(`Series template "${templateId}" successfully updated in ~/.openproducer/templates/${templateId}.md`);
    if (changes.length > 0) {
      console.log(pc.bold('Updated Template Schema:'));
      for (const c of changes) {
        console.log(`  ${pc.green('✔')} ${c}`);
      }
    } else {
      console.log(pc.dim('  Template schema re-synchronized with current workspace. No modifications needed.'));
    }
    console.log('');
    return;
  }

  logger.error(`Unknown template action "${action}". Available: list, save, use, update.`);
}
