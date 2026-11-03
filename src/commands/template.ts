import pc from 'picocolors';
import { ConfigManager } from '../core/config';
import { TemplateManager } from '../core/templates';
import { SeriesTemplate } from '../core/types';
import { logger } from '../utils/logger';

export async function templateCommand(action = 'list', templateId?: string): Promise<void> {
  logger.banner();

  const tm = new TemplateManager();

  if (action === 'list') {
    const list = await tm.listTemplates();
    logger.info(`Global series templates located in: ${pc.dim(tm.directory)}`);
    if (list.length === 0) {
      console.log('  No custom series templates found.');
      console.log('  Save your current project look with: "openproducer template save <template-name>"');
    } else {
      console.log(pc.bold('Available Series Templates:'));
      for (const t of list) {
        console.log(`  • ${pc.cyan(t)}`);
      }
    }
    console.log('');
    return;
  }

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
    const template: SeriesTemplate = {
      template_id: templateId,
      name: `${config.project_name} Series Preset`,
      archetype: config.archetype,
      aspect_ratio: config.aspect_ratio,
      audio_pathway: config.audio_pathway,
      visual_dna: {
        master_style_anchor: `Derived from ${config.visual_style}`,
        negative_prompt: 'blurry, distorted, watermarks, text'
      }
    };
    await tm.saveTemplate(template);
    logger.success(`Series template saved globally as: "${templateId}"`);
    console.log(`You can now use it in new projects with: "openproducer init --template ${templateId}"`);
    console.log('');
    return;
  }

  if (action === 'use') {
    if (!templateId) {
      logger.error('Please specify a template name to use: "openproducer template use <template-name>"');
      process.exit(1);
    }
    const template = await tm.getTemplate(templateId);
    if (!template) {
      logger.error(`Template "${templateId}" not found in ${tm.directory}`);
      process.exit(1);
    }
    const configMgr = new ConfigManager();
    if (!(await configMgr.isInitialized())) {
      logger.error('No OpenProducer project found. Run "openproducer init --template ' + templateId + '" instead.');
      process.exit(1);
    }
    const config = await configMgr.readConfig();
    config.archetype = template.archetype;
    config.aspect_ratio = template.aspect_ratio;
    config.audio_pathway = template.audio_pathway;
    await configMgr.writeConfig(config);

    const state = await configMgr.readState();
    state.template_loaded = templateId;
    await configMgr.writeState(state);

    logger.success(`Applied series template "${templateId}" to current workspace.`);
    console.log('');
    return;
  }

  logger.error(`Unknown template action "${action}". Available: list, save, use.`);
}

