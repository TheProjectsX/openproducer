#!/usr/bin/env node

import { Command } from 'commander';
import { doctorCommand } from './commands/doctor';
import { initCommand } from './commands/init';
import { statusCommand } from './commands/status';
import { templateCommand } from './commands/template';
import { updateCommand } from './commands/update';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require('../package.json');

const program = new Command();

program
  .name('openproducer')
  .description('OpenProducer CLI — The Autonomous AI Video Production Framework & Scaffolding Engine')
  .version(pkg.version, '-v, --version', 'Output the current version of OpenProducer');

// Command: init [directory]
program
  .command('init [directory]')
  .description('Initialize a new OpenProducer production project')
  .option('-n, --name <name>', 'Project name')
  .option('-t, --tier <tier>', 'Operating tier (lean_base_reference | modular_studio)')
  .option('-a, --archetype <archetype>', 'Project archetype (social_ugc | explainer | cinema | commercial | animation_2d | music_video)')
  .option('-r, --aspect-ratio <ratio>', 'Aspect ratio (9:16 | 16:9 | 1:1 | 21:9)')
  .option('-s, --style <style>', 'Master visual style paradigm')
  .option('--audio <pathway>', 'Audio pathway (pathway_a_native_veo | pathway_b_external_audio)')
  .option('--delivery <mode>', 'Audio delivery mode (separate_script_first | separate_all_at_once | embedded)')
  .option('--template <id>', 'Load a saved series franchise template')
  .option('--offline', 'Force offline mode: skip remote sync and use local bundled templates')
  .option('--token <token>', 'Access token for private template registry authentication')
  .option('-y, --yes', 'Automatic mode: initialize with clean default templates (default: true)', true)
  .option('--no-yes', 'Disable automatic defaults and prompt for setup')
  .option('-i, --interactive', 'Interactively configure project parameters during initialization')
  .option('-f, --force', 'Force initialization even if directory is not empty')
  .action(async (directory, options) => {
    await initCommand(directory, options);
  });

// Command: update / upgrade
program
  .command('update [directory]')
  .alias('upgrade')
  .description('Update skills, workflows, specifications, and schema in an initialized project')
  .option('--offline', 'Force offline mode: skip remote sync and use local bundled templates')
  .option('--token <token>', 'Access token for private template registry authentication')
  .option('-f, --force', 'Force refresh of all framework files')
  .action(async (directory, options) => {
    await updateCommand(directory, options);
  });

// Command: doctor / lint
program
  .command('doctor')
  .alias('lint')
  .description('Audit project against pre-flight linters L-01 through L-19 and update manifest')
  .action(async () => {
    await doctorCommand();
  });

// Command: status
program
  .command('status')
  .description('Display active OpenProducer project state, locks, and next recommended action')
  .action(async () => {
    await statusCommand();
  });

// Command: template [action] [templateId] [instruction...]
program
  .command('template [action] [templateId] [instruction...]')
  .description('Manage global series franchise presets (list, save <id>, use <id>, update <id>, edit <id>)')
  .option('-p, --paths', 'Display physical file paths for listed templates')
  .option('-v, --verbose', 'Verbose mode: display template file paths and details')
  .option('-g, --group <group>', 'Template group / sub-vault (video | story | audio | style | etc.)')
  .option('-t, --type <type>', 'Template vault type alias (video | story | etc.)')
  .action(async (action, templateId, instruction, commandObj) => {
    let opts = commandObj?.opts ? commandObj.opts() : commandObj;
    let instr = instruction;
    if (typeof instruction === 'object' && !Array.isArray(instruction) && instruction !== null) {
      opts = instruction.opts ? instruction.opts() : instruction;
      instr = undefined;
    }
    const fullInstruction = Array.isArray(instr) ? instr.join(' ') : instr;
    await templateCommand(action || 'list', templateId, fullInstruction, opts);
  });

// Default handler if no command provided
if (process.argv.length <= 2) {
  // If in an existing project, show status, otherwise guide to init
  const fs = require('node:fs');
  const path = require('node:path');
  const configExists = fs.existsSync(path.join(process.cwd(), 'openproducer', 'config.json'));

  if (configExists) {
    statusCommand().catch((err) => {
      console.error(err);
      process.exit(1);
    });
  } else {
    initCommand('.', {}).catch((err) => {
      console.error(err);
      process.exit(1);
    });
  }
} else {
  program.parseAsync(process.argv).catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

