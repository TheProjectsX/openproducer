const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const templatesDir = path.join(rootDir, 'templates');
const prodTemplateSrc = path.join(rootDir, 'production_template');
const agentsSrc = path.join(rootDir, 'agents');

console.log('[OpenProducer] Packaging templates...');

// 1. Ensure templates directory exists
if (!fs.existsSync(templatesDir)) {
  fs.mkdirSync(templatesDir, { recursive: true });
}

// 2. Copy production_template -> templates/production_template
const prodTemplateDest = path.join(templatesDir, 'production_template');
if (fs.existsSync(prodTemplateSrc)) {
  fs.cpSync(prodTemplateSrc, prodTemplateDest, { recursive: true });
  console.log('✓ Synced production_template -> templates/production_template');
}

// 3. Copy agents -> templates/agents
const agentsDest = path.join(templatesDir, 'agents');
if (fs.existsSync(agentsSrc)) {
  fs.cpSync(agentsSrc, agentsDest, { recursive: true });
  console.log('✓ Synced agents -> templates/agents');
}

// 4. Set executable permission on dist/cli.js if it exists
const cliDist = path.join(rootDir, 'dist', 'cli.js');
if (fs.existsSync(cliDist)) {
  try {
    fs.chmodSync(cliDist, 0o755);
    console.log('✓ Set executable permissions on dist/cli.js (0o755)');
  } catch (err) {
    // Windows chmod may be a no-op, which is normal
  }
}

console.log('[OpenProducer] Template bundling complete.');

