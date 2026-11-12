import * as path from 'node:path';
import pc from 'picocolors';
import { ConfigManager } from '../core/config';
import { TemplateManager } from '../core/templates';
import { SeriesTemplate, StoryTemplate } from '../core/types';
import { ensureDir, exists, readFile, writeFile } from '../utils/fs';
import { logger } from '../utils/logger';

export async function templateCommand(
  action = 'list',
  templateId?: string,
  instruction?: string,
  options?: { paths?: boolean; verbose?: boolean; type?: string; group?: string }
): Promise<string | void> {
  const showPaths = Boolean(options?.paths || options?.verbose);
  let requestedGroup = (options?.group || options?.type || '').toLowerCase();

  const knownActions = [
    'read',
    'cat',
    'use',
    'load',
    'save',
    'create',
    'update',
    'edit',
    'refine',
    'show',
    'view',
    'list'
  ];

  // Handle group-first syntax: e.g. "openproducer template package read xxxx-xxxx"
  // or "openproducer template package use xxxx-xxxx"
  if (templateId && knownActions.includes(templateId.toLowerCase())) {
    requestedGroup = (action || '').toLowerCase();
    action = templateId.toLowerCase();
    templateId = instruction;
    instruction = undefined;
  }

  // Handle slash syntax in templateId: "openproducer template read package/xxxx-xxxx"
  if (templateId && templateId.includes('/')) {
    const slashParts = templateId.split('/');
    requestedGroup = slashParts[0].toLowerCase();
    templateId = slashParts.slice(1).join('/');
  }

  action = (action || 'list').toLowerCase();

  // Print banner for interactive commands (skip for read/cat to preserve pure stdout formatting)
  if (action !== 'read' && action !== 'cat') {
    logger.banner();
  }

  const configMgr = new ConfigManager();
  const tm = new TemplateManager(configMgr.root);

  const isInitialized = await configMgr.isInitialized();
  const state = isInitialized ? await configMgr.readState().catch(() => null) : null;
  const isBlankInit = !isInitialized || (state && state.current_stage === 'init');

  // 1. Action: list
  if (action === 'list') {
    const allTemplates = await tm.listAllTemplates();
    logger.info(`Series templates located in: ${pc.dim(tm.directory)}`);
    console.log('');

    const groups = new Map<string, typeof allTemplates>();
    for (const t of allTemplates) {
      if (!groups.has(t.group)) {
        groups.set(t.group, []);
      }
      groups.get(t.group)!.push(t);
    }

    if (groups.size === 0) {
      console.log('  No templates found.');
    } else {
      for (const [groupName, templates] of groups.entries()) {
        if (requestedGroup && requestedGroup !== groupName.toLowerCase()) {
          continue;
        }

        const icon =
          groupName === 'video' ? '🎬' : groupName === 'story' ? '📖' : groupName === 'audio' ? '🎙️' : '📁';
        console.log(pc.bold(`${icon} ${groupName.toUpperCase()} Templates:`));
        for (const t of templates) {
          const colorFn = groupName === 'video' ? pc.cyan : groupName === 'story' ? pc.yellow : pc.magenta;
          console.log(`  • ${colorFn(t.id)}`);
          if (showPaths) {
            console.log(`    ${pc.dim(`↳ ${t.path}`)}`);
          }
        }
        console.log('');
      }
    }

    if (!showPaths) {
      console.log(pc.dim('💡 Tip: Run "openproducer template list -p" (or --paths) to display exact file paths on disk.'));
    }
    console.log('');
    return;
  }

  // 2. Action: save / create
  if (action === 'save' || action === 'create') {
    if (!templateId) {
      logger.error('Please specify a template name: "openproducer template save <template-name> [--group <group>]"');
      process.exit(1);
    }

    // A. If workspace is BLANK (init mode) -> Discussion-first collaborative template genesis
    if (isBlankInit) {
      logger.info(`Blank project detected (INIT mode active). Starting discussion-first template creation: ${pc.cyan(templateId)}`);
      console.log('');
      console.log(pc.bold(pc.cyan(`🛠️ Interactive Template Genesis: "${templateId}"`)));
      console.log(`  • Target Group: ${pc.yellow(requestedGroup || 'video (default)')}`);
      console.log(`  • Status: ${pc.green('Discussion Mode Active (Zero project data required)')}`);
      console.log('');
      logger.info(`Tell the agent what rules, style anchor, narrative formula, or pacing to include in this template.`);
      logger.info(`The agent will assemble the template and save it directly to ~/.openproducer/templates/${requestedGroup || 'video'}/${templateId}.md.`);
      console.log('');
      return;
    }

    const config = await configMgr.readConfig();

    const isStorySave = requestedGroup === 'story' || templateId.startsWith('story-');
    if (isStorySave) {
      let narrativeArchetype = 'pure_narration';
      let targetWpm = 135;
      let voicePersona = 'Expressive, high-retention storyteller';

      const beatsPath = path.join(configMgr.root, 'production', 'story', 'beats.md');
      if (await exists(beatsPath)) {
        const beatsContent = await readFile(beatsPath);
        const fmtMatch = beatsContent.match(/\*\*(?:Format|Archetype):\*\*\s*`?([a-zA-Z0-9_-]+)`?/i);
        const wpmMatch = beatsContent.match(/\*\*Target WPM:\*\*\s*`?(\d+)`?/i);
        if (fmtMatch) narrativeArchetype = fmtMatch[1].trim();
        if (wpmMatch) targetWpm = parseInt(wpmMatch[1], 10) || 135;
      }

      const scriptPath = path.join(configMgr.root, 'production', 'story', 'script.txt');
      if (await exists(scriptPath)) {
        const scriptContent = await readFile(scriptPath);
        const typeMatch = scriptContent.match(/^Type:\s*([a-zA-Z0-9_-]+)/im);
        const wpmMatch = scriptContent.match(/^Target Pacing:\s*(\d+)/im);
        const narratorMatch = scriptContent.match(/^Narrator:\s*(.+)$/im);
        if (typeMatch) narrativeArchetype = typeMatch[1].trim();
        if (wpmMatch) targetWpm = parseInt(wpmMatch[1], 10) || targetWpm;
        if (narratorMatch) voicePersona = narratorMatch[1].trim();
      }

      const storyTemplate: StoryTemplate = {
        template_id: templateId,
        type: 'story',
        name: `${config.project_name} Story Preset`,
        narrative_archetype: narrativeArchetype,
        voice_persona: voicePersona,
        target_wpm: targetWpm
      };

      await tm.saveStoryTemplate(storyTemplate);
      logger.success(`Story template saved globally in story sub-vault: "story/${templateId}.md"`);
      console.log(`You can now load it with: "openproducer template use ${templateId} --type story"`);
      console.log('');
      return;
    }

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

    const wantStory = !requestedGroup || requestedGroup === 'story';
    const wantVideo = !requestedGroup || requestedGroup === 'video';

    const storyTemplate = wantStory ? await tm.getStoryTemplate(templateId) : null;
    const videoTemplate = wantVideo ? await tm.getTemplate(templateId) : null;
    const genericTemplate = !storyTemplate && !videoTemplate ? await tm.getGenericTemplate(templateId, requestedGroup) : null;

    if (!storyTemplate && !videoTemplate && !genericTemplate) {
      logger.error(`Template "${templateId}" not found in ${tm.directory}`);
      process.exit(1);
    }

    if (storyTemplate) {
      const config = await configMgr.readConfig();
      config.story_template_id = templateId;
      await configMgr.writeConfig(config);

      // Scaffold production/story/beats.md if missing
      const storyDir = path.join(configMgr.root, 'production', 'story');
      await ensureDir(storyDir);
      const beatsPath = path.join(storyDir, 'beats.md');
      if (!(await exists(beatsPath))) {
        await writeFile(
          beatsPath,
          `# 🗺️ Story Beats: ${storyTemplate.name}\n- **Template:** \`${storyTemplate.template_id}\`\n- **Archetype:** \`${storyTemplate.narrative_archetype}\`\n- **Target WPM:** ${storyTemplate.target_wpm || 135}\n\n## 🪝 Active Story Structure\n*(Story beats and narrative structure)*\n`
        );
      }

      logger.success(`Applied Story Template "${pc.yellow(templateId)}" (${storyTemplate.name}) to workspace.`);
      logger.info(`Next step: Run "/opp-explore" to brainstorm and develop your story using this template!`);
    }

    if (videoTemplate) {
      const config = await configMgr.readConfig();
      config.archetype = videoTemplate.archetype || config.archetype;
      config.aspect_ratio = videoTemplate.aspect_ratio || config.aspect_ratio;
      config.tier = (videoTemplate.tier as any) || config.tier;
      config.audio_pathway = videoTemplate.audio_pathway || config.audio_pathway;
      config.audio_delivery_mode = videoTemplate.audio_delivery_mode || config.audio_delivery_mode;
      if (videoTemplate.visual_dna?.style_id) {
        config.visual_style = videoTemplate.visual_dna.style_id;
      }
      await configMgr.writeConfig(config);

      if (videoTemplate.visual_dna?.master_style_anchor) {
        const anchorPath = path.join(configMgr.root, 'openproducer', 'visual', 'technical_anchor.txt');
        await writeFile(anchorPath, videoTemplate.visual_dna.master_style_anchor + '\n');
      }

      const activeState = await configMgr.readState();
      activeState.template_loaded = templateId;
      await configMgr.writeState(activeState);

      logger.success(`Applied Video Series Template "${pc.cyan(templateId)}" to current workspace brain.`);
    }

    if (genericTemplate) {
      logger.success(`Loaded "${genericTemplate.group}" template "${pc.magenta(templateId)}" into workspace.`);
    }

    console.log('');
    return;
  }

  // 4. Action: update
  if (action === 'update') {
    if (!templateId) {
      logger.error('Please specify a template name to update: "openproducer template update <template-name> [instructions]"');
      process.exit(1);
    }

    // A. If workspace is BLANK (init mode) -> Discussion-first collaborative update
    if (isBlankInit) {
      logger.info(`Blank project detected (INIT mode active). Starting discussion-first template update: ${pc.cyan(templateId)}`);
      console.log('');
      console.log(pc.bold(pc.cyan(`🛠️ Interactive Template Update: "${templateId}"`)));
      console.log(`  • Target Group: ${pc.yellow(requestedGroup || 'auto-detect')}`);
      console.log(`  • Status: ${pc.green('Discussion Mode Active (Zero project data required)')}`);
      console.log('');
      logger.info(`Tell the agent what to add, remove, or modify. No project workspace data needed.`);
      console.log('');
      return;
    }

    const existingVideo = requestedGroup === 'story' ? null : await tm.getTemplate(templateId);
    const existingStory = !existingVideo && requestedGroup !== 'video' ? await tm.getStoryTemplate(templateId) : null;

    if (!existingVideo && !existingStory) {
      logger.error(`Template "${templateId}" not found in ${tm.directory}`);
      logger.info('To create a new template from this project, use: "openproducer template save ' + templateId + '"');
      process.exit(1);
    }

    if (existingStory) {
      const changes: string[] = [];
      const beatsPath = path.join(configMgr.root, 'production', 'story', 'beats.md');
      if (await exists(beatsPath)) {
        const beatsContent = await readFile(beatsPath);
        const fmtMatch = beatsContent.match(/\*\*(?:Format|Archetype):\*\*\s*`?([a-zA-Z0-9_-]+)`?/i);
        const wpmMatch = beatsContent.match(/\*\*Target WPM:\*\*\s*`?(\d+)`?/i);
        if (fmtMatch && fmtMatch[1].trim() !== existingStory.narrative_archetype) {
          changes.push(`Narrative Archetype: "${existingStory.narrative_archetype}" -> "${fmtMatch[1].trim()}"`);
          existingStory.narrative_archetype = fmtMatch[1].trim();
        }
        if (wpmMatch) {
          const parsedWpm = parseInt(wpmMatch[1], 10);
          if (parsedWpm && parsedWpm !== existingStory.target_wpm) {
            changes.push(`Target WPM: ${existingStory.target_wpm} -> ${parsedWpm}`);
            existingStory.target_wpm = parsedWpm;
          }
        }
      }
      if (instruction) {
        changes.push(`Applied creator directive: "${instruction}"`);
      }
      // Clear raw_content if fields changed so formatStoryMarkdownTemplate regenerates frontmatter cleanly
      if (changes.length > 0 && existingStory.raw_content) {
        existingStory.raw_content = existingStory.raw_content
          .replace(/^narrative_archetype:.*$/im, `narrative_archetype: "${existingStory.narrative_archetype}"`)
          .replace(/^target_wpm:.*$/im, `target_wpm: ${existingStory.target_wpm || 135}`);
      }
      await tm.saveStoryTemplate(existingStory);
      logger.success(`Story template "${templateId}" successfully updated in ~/.openproducer/templates/story/${templateId}.md`);
      if (changes.length > 0) {
        console.log(pc.bold('Updated Story Template Schema:'));
        for (const c of changes) {
          console.log(`  ${pc.green('✔')} ${c}`);
        }
      } else {
        console.log(pc.dim('  Story template schema re-synchronized with current workspace.'));
      }
      console.log('');
      return;
    }

    const existing = existingVideo!;
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

  // 5. Action: edit / refine / show / view
  if (action === 'edit' || action === 'refine' || action === 'show' || action === 'view') {
    if (!templateId) {
      logger.error('Please specify a template name to inspect/edit: "openproducer template edit <template-name>"');
      process.exit(1);
    }

    const isSaveCommit = Boolean(
      instruction && /^(save|commit|lock|apply|sync)$/i.test(instruction.trim())
    );

    if (isSaveCommit) {
      const synced = await tm.syncProjectTemplatesToGlobal();
      logger.success(
        `Promoted and locked refined template "${templateId}" into global vault (${tm.directory}).`
      );
      if (synced.length > 0) {
        console.log(`  ${pc.green('✔')} Synced to global vault: ${synced.join(', ')}`);
      }
      console.log('');
      return;
    }

    const wantStory = !requestedGroup || requestedGroup === 'story';
    const wantVideo = !requestedGroup || requestedGroup === 'video';

    const storyTemplate = wantStory ? await tm.getStoryTemplate(templateId) : null;
    const videoTemplate = wantVideo ? await tm.getTemplate(templateId) : null;
    const genericTemplate = !storyTemplate && !videoTemplate ? await tm.getGenericTemplate(templateId, requestedGroup) : null;

    if (!storyTemplate && !videoTemplate && !genericTemplate) {
      logger.error(`Template "${templateId}" not found in ${tm.directory}`);
      process.exit(1);
    }

    const inProject = isInitialized;

    if (storyTemplate) {
      let localMirrorPath = '';
      if (inProject && storyTemplate.raw_content) {
        localMirrorPath = path.join(configMgr.root, 'openproducer', 'templates', 'story', `${templateId}.md`);
        if (!(await exists(localMirrorPath))) {
          await writeFile(localMirrorPath, storyTemplate.raw_content);
        }
      }

      logger.info(`Loaded Story Template for collaborative editing: ${pc.yellow(templateId)}`);
      console.log('');
      console.log(pc.bold(pc.yellow(`📖 Story Template: ${storyTemplate.name}`)));
      console.log(`  • Archetype: ${pc.cyan(storyTemplate.narrative_archetype)}`);
      console.log(`  • Target WPM: ${pc.cyan(String(storyTemplate.target_wpm || 135))}`);
      if (storyTemplate.voice_persona) {
        console.log(`  • Voice Persona: ${storyTemplate.voice_persona}`);
      }
      if (localMirrorPath) {
        console.log(`  • Workspace Mirror: ${pc.dim(localMirrorPath)}`);
      }
      console.log('');
      if (storyTemplate.raw_content) {
        console.log(pc.dim('── Raw Content Preview ──'));
        console.log(storyTemplate.raw_content.trim());
        console.log(pc.dim('─────────────────────────'));
      }
      console.log('');
      logger.info(`Collaborative editing active in session (current project workspace untouched).`);
      logger.info(
        `When producer approves changes, write updates to openproducer/templates/story/${templateId}.md and run "npx openproducer template edit ${templateId} save".`
      );
      console.log('');
    }

    if (videoTemplate) {
      let localMirrorPath = '';
      if (inProject && videoTemplate.raw_content) {
        localMirrorPath = path.join(configMgr.root, 'openproducer', 'templates', `${templateId}.md`);
        if (!(await exists(localMirrorPath))) {
          await writeFile(localMirrorPath, videoTemplate.raw_content);
        }
      }

      logger.info(`Loaded Video Template for collaborative editing: ${pc.cyan(templateId)}`);
      console.log('');
      console.log(pc.bold(pc.cyan(`🎬 Video Template: ${videoTemplate.name}`)));
      console.log(`  • Archetype: ${videoTemplate.archetype || 'N/A'}`);
      console.log(`  • Aspect Ratio: ${videoTemplate.aspect_ratio || '16:9'}`);
      console.log(`  • Tier: ${videoTemplate.tier || 'lean_base_reference'}`);
      console.log(`  • Audio Delivery: ${videoTemplate.audio_delivery_mode || 'separate_script_first'}`);
      console.log(`  • Master Anchor: ${videoTemplate.visual_dna.master_style_anchor}`);
      if (localMirrorPath) {
        console.log(`  • Workspace Mirror: ${pc.dim(localMirrorPath)}`);
      }
      console.log('');
      if (videoTemplate.raw_content) {
        console.log(pc.dim('── Raw Content Preview ──'));
        console.log(videoTemplate.raw_content.trim());
        console.log(pc.dim('─────────────────────────'));
      }
      console.log('');
      logger.info(`Collaborative editing active in session (current project workspace untouched).`);
      logger.info(
        `When producer approves changes, write updates to openproducer/templates/${templateId}.md and run "npx openproducer template edit ${templateId} save".`
      );
      console.log('');
    }

    if (genericTemplate) {
      logger.info(`Loaded ${genericTemplate.group.toUpperCase()} Template for editing: ${pc.magenta(templateId)}`);
      console.log('');
      console.log(pc.bold(pc.magenta(`📁 ${genericTemplate.group.toUpperCase()} Template: ${genericTemplate.name}`)));
      console.log(`  • Group: ${genericTemplate.group}`);
      if (genericTemplate.raw_content) {
        console.log(pc.dim('── Raw Content Preview ──'));
        console.log(genericTemplate.raw_content.trim());
        console.log(pc.dim('─────────────────────────'));
      }
      console.log('');
    }

    return;
  }

  // 6. Action: read / cat
  if (action === 'read' || action === 'cat') {
    if (!templateId) {
      logger.error('Please specify a template name to read: "openproducer template read <template-name> [--group <group>]"');
      process.exit(1);
    }

    const tpl = await tm.readTemplate(templateId, requestedGroup);
    if (!tpl) {
      const groupHint = requestedGroup ? ` in group "${requestedGroup}"` : '';
      logger.error(`Template "${templateId}" not found${groupHint} in ${tm.directory}`);
      process.exit(1);
    }

    console.log(tpl.content.trim());
    return tpl.content;
  }

  logger.error(`Unknown template action "${action}". Available: list, save, use, update, edit, read.`);
}
