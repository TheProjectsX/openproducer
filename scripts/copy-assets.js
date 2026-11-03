const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const srcTemplatesDir = path.join(rootDir, 'src', 'templates');
const distTemplatesDir = path.join(rootDir, 'dist', 'templates');
const prodTemplateSrc = path.join(rootDir, 'production_template');
const agentsSrc = path.join(rootDir, 'agents');

console.log('[OpenProducer] Packaging templates into src/templates and dist/templates...');

for (const destDir of [srcTemplatesDir, distTemplatesDir]) {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  // 1. Copy production_template -> destDir/production_template
  const prodTemplateDest = path.join(destDir, 'production_template');
  if (fs.existsSync(prodTemplateSrc)) {
    fs.cpSync(prodTemplateSrc, prodTemplateDest, { recursive: true });
    console.log(`✓ Synced production_template -> ${path.relative(rootDir, prodTemplateDest)}`);
  }

  // 2. Copy agents -> destDir/agents
  const agentsDest = path.join(destDir, 'agents');
  if (fs.existsSync(agentsSrc)) {
    fs.cpSync(agentsSrc, agentsDest, { recursive: true });
    console.log(`✓ Synced agents -> ${path.relative(rootDir, agentsDest)}`);
  }
}

// 3. Set executable permission on dist/cli.js if it exists
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
