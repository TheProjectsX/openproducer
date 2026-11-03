import pc from 'picocolors';

export const logger = {
  info(msg: string) {
    console.log(pc.cyan('ℹ ') + msg);
  },
  success(msg: string) {
    console.log(pc.green('✔ ') + pc.bold(msg));
  },
  warn(msg: string) {
    console.log(pc.yellow('⚠ ') + pc.yellow(msg));
  },
  error(msg: string) {
    console.error(pc.red('✖ ') + pc.bold(pc.red(msg)));
  },
  step(num: number, total: number, msg: string) {
    console.log(pc.dim(`[${num}/${total}] `) + pc.cyan(msg));
  },
  banner() {
    console.log('');
    console.log(pc.cyan(pc.bold('🎬 OpenProducer')) + pc.dim(' — Autonomous AI Video Production Framework'));
    console.log(pc.dim('   Orchestrating Google Flow, Veo 3.1 & Imagen 4'));
    console.log('');
  },
  card(title: string, entries: Array<[string, string]>, footer?: string) {
    const border = pc.dim('────────────────────────────────────────────────────────────');
    console.log('');
    console.log(border);
    console.log(pc.bold(pc.cyan(`  ${title}`)));
    console.log(border);
    for (const [key, val] of entries) {
      const paddedKey = (key + ':').padEnd(24, ' ');
      console.log(`  ${pc.dim(paddedKey)} ${pc.white(val)}`);
    }
    if (footer) {
      console.log(border);
      console.log(`  ${pc.green(footer)}`);
    }
    console.log(border);
    console.log('');
  }
};

