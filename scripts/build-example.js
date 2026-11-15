#!/usr/bin/env node

// Build a local OpenProducer workspace from the editable repository sources.
// Usage: node scripts/build-example.js [--soft]

const fs = require('node:fs');
const path = require('node:path');

const repoRoot = fs.realpathSync(path.resolve(__dirname, '..'));
const exampleName = 'example_openproducer_project'; // Already listed in .gitignore.
const targetRoot = path.join(repoRoot, exampleName);
const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  console.log('Usage: node scripts/build-example.js [--soft]');
  console.log('Default: hard reset the example directory, then copy current sources.');
  console.log('--soft: copy changed source files; preserve project work and target-only files.');
  process.exit(0);
}
if (args.length > 1 || (args.length === 1 && args[0] !== '--soft')) {
  console.error('Unknown option. Use --help for usage.');
  process.exit(1);
}

const soft = args[0] === '--soft';
const existed = fs.existsSync(targetRoot);
const relativeTarget = path.relative(repoRoot, targetRoot);
if (relativeTarget !== exampleName || path.dirname(targetRoot) !== repoRoot) {
  throw new Error('Refusing to write outside the intended example directory.');
}
if (existed) {
  const targetStat = fs.lstatSync(targetRoot);
  if (targetStat.isSymbolicLink() || !targetStat.isDirectory()) {
    throw new Error('Refusing to use a linked or non-directory example target.');
  }
}

let copied = 0;
let unchanged = 0;

function copyChanged(source, destination) {
  const sourceStat = fs.lstatSync(source);
  if (sourceStat.isSymbolicLink()) {
    throw new Error(`Refusing to copy linked source: ${source}`);
  }
  if (fs.existsSync(destination)) {
    const destinationStat = fs.lstatSync(destination);
    if (destinationStat.isSymbolicLink()) {
      throw new Error(`Refusing to overwrite linked destination: ${destination}`);
    }
    if (sourceStat.isDirectory() !== destinationStat.isDirectory()) {
      throw new Error(`Source/destination type mismatch: ${destination}`);
    }
  }
  if (sourceStat.isDirectory()) {
    fs.mkdirSync(destination, { recursive: true });
    for (const entry of fs.readdirSync(source)) {
      copyChanged(path.join(source, entry), path.join(destination, entry));
    }
    return;
  }
  if (!sourceStat.isFile()) {
    throw new Error(`Unsupported source type: ${source}`);
  }
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  if (fs.existsSync(destination) && fs.readFileSync(source).equals(fs.readFileSync(destination))) {
    unchanged++;
    return;
  }
  fs.copyFileSync(source, destination);
  copied++;
}

if (!soft && existed) {
  // The resolved target is the one fixed, direct child above; never accept a caller path.
  fs.rmSync(targetRoot, { recursive: true, force: false });
}
fs.mkdirSync(targetRoot, { recursive: true });

const scaffold = path.join(repoRoot, 'production_template');
for (const entry of fs.readdirSync(scaffold)) {
  if (soft && existed && entry === 'openproducer') continue;
  copyChanged(path.join(scaffold, entry), path.join(targetRoot, entry));
}
copyChanged(path.join(repoRoot, 'agents'), path.join(targetRoot, '.agents'));

console.log(`${soft ? 'Soft update' : 'Hard reset'} complete: ${targetRoot}`);
console.log(`${copied} files copied, ${unchanged} already current.`);
if (soft && existed) {
  console.log('Preserved openproducer/, production/, and target-only files.');
}
