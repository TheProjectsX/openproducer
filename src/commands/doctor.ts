import pc from 'picocolors';
import { ConfigManager } from '../core/config';
import { LinterSuite } from '../core/linters';
import { logger } from '../utils/logger';

export async function doctorCommand(): Promise<void> {
  logger.banner();

  const configMgr = new ConfigManager();
  if (!(await configMgr.isInitialized())) {
    logger.error('No OpenProducer project found in this directory or its parents.');
    logger.info('Run "npx openproducer init" to create one.');
    process.exit(1);
  }

  const config = await configMgr.readConfig();
  logger.info(`Running Retake Doctor & Linter Audit on: ${pc.bold(config.project_name)}`);

  const suite = new LinterSuite(configMgr.root);
  const result = await suite.runAll();

  console.log('');
  console.log(pc.bold(pc.cyan('=== PRE-FLIGHT LINTER AUDIT (L-01 to L-19) ===')));
  console.log(pc.dim('────────────────────────────────────────────────────────────'));

  for (const r of result.results) {
    let statusIcon = pc.green('✔ PASS');
    if (r.status === 'WARN') statusIcon = pc.yellow('▲ WARN');
    if (r.status === 'FAIL') statusIcon = pc.red('✖ FAIL');
    if (r.status === 'PENDING') statusIcon = pc.dim('○ PEND');

    const idFormatted = pc.bold(r.id.padEnd(5, ' '));
    console.log(`${idFormatted} [${statusIcon}] ${r.name}`);
    if (r.details) {
      console.log(`      ${pc.dim(r.details)}`);
    }
  }

  console.log(pc.dim('────────────────────────────────────────────────────────────'));
  console.log(
    `Summary: ${pc.green(`${result.passedCount} Passed`)}, ` +
    `${pc.yellow(`${result.warningCount} Warnings`)}, ` +
    `${pc.red(`${result.failureCount} Failures`)}`
  );
  console.log('');

  // Update manifest.json
  try {
    const manifest = await configMgr.readManifest();
    manifest.audit_timestamp = new Date().toISOString();
    manifest.certification_status = result.certified
      ? result.warningCount > 0
        ? 'WARNINGS'
        : 'CERTIFIED'
      : 'FAILED';
    manifest.linters = suite.manifestSummary(result.results);
    await configMgr.writeManifest(manifest);
    logger.success('openproducer/manifest.json updated with latest audit results.');
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    logger.warn(`Could not update manifest.json: ${message}`);
  }
}

