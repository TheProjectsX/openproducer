const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { LinterSuite } = require('../dist/core/linters');
const { parseMarkdownTemplate, TemplateManager } = require('../dist/core/templates');

async function main() {
  const fixture = fs.mkdtempSync(path.join(os.tmpdir(), 'openproducer-audit-'));
  try {
    let result = await new LinterSuite(fixture).runAll();
    assert.equal(result.certified, false);
    assert.equal(result.pendingCount, 19);

    const clipDir = path.join(fixture, 'production', 'clips', 'clip_001');
    fs.mkdirSync(clipDir, { recursive: true });
    const video = path.join(clipDir, 'video_prompt.txt');
    const valid = `[CONFIGURATION SETTINGS]\nDuration: 10s\nAspect Ratio: 16:9\nInput Seed: clip_001/image_prompt.txt\n[VIDEO PROMPT]\nA keeper raises an already-held lantern inside the stone stairwell. Audio: SFX: footstep; Ambience: wind; Dialogue: None; Music: None.\n[NEGATIVE PROMPT]\nsubtitles, tripod, 1080p\n`;
    fs.writeFileSync(video, valid);
    result = await new LinterSuite(fixture).runAll();
    assert.equal(result.results.find((r) => r.id === 'L03').status, 'PASS');
    assert.equal(result.results.find((r) => r.id === 'L04').status, 'PASS');
    assert.equal(result.results.find((r) => r.id === 'L09').status, 'PASS');
    assert.equal(result.certified, false); // Creator reviews are not automatic passes.

    fs.writeFileSync(video, valid.replace('raises an already-held lantern', 'raises a tripod'));
    result = await new LinterSuite(fixture).runAll();
    assert.equal(result.results.find((r) => r.id === 'L03').status, 'FAIL');

    fs.writeFileSync(video, valid.replace('Duration: 10s', 'Duration: 7s'));
    result = await new LinterSuite(fixture).runAll();
    assert.equal(result.results.find((r) => r.id === 'L09').status, 'FAIL');

    fs.writeFileSync(video, valid.replace('raises an already-held lantern', 'raises an already-held lantern for 10s'));
    result = await new LinterSuite(fixture).runAll();
    assert.equal(result.results.find((r) => r.id === 'L04').status, 'FAIL');

    const presets = path.join(__dirname, '..', 'agents', 'skills', 'openproducer-core', 'templates', 'starter_presets');
    for (const name of ['cinema-short-film', 'social-ugc-reel', 'stickman-explainer']) {
      const parsed = parseMarkdownTemplate(fs.readFileSync(path.join(presets, `${name}.md`), 'utf8'), name);
      assert.equal(parsed.audio_pathway, 'pathway_b_external_audio');
      assert.ok([4, 6, 8, 10].includes(parsed.pacing_profile.default_clip_duration));
    }
    assert.throws(() => parseMarkdownTemplate('no frontmatter', 'broken'));
    const sample = fs.readFileSync(path.join(presets, 'cinema-short-film.md'), 'utf8');
    assert.throws(() => parseMarkdownTemplate(sample.replace('audio_pathway: pathway_b_external_audio', 'audio_pathway: unknown_mode'), 'cinema-short-film'));
    assert.throws(() => parseMarkdownTemplate(sample.replace('audio_delivery_mode: separate_script_first', 'audio_delivery_mode: embedded'), 'cinema-short-film'));
    const localTemplates = path.join(fixture, 'openproducer', 'templates', 'video');
    fs.mkdirSync(localTemplates, { recursive: true });
    const first = fs.readFileSync(path.join(presets, 'cinema-short-film.md'), 'utf8');
    fs.writeFileSync(path.join(localTemplates, 'cinema-short-film.md'), first);
    fs.writeFileSync(path.join(localTemplates, 'unrelated.md'), first.replaceAll('cinema-short-film', 'unrelated'));
    const manager = new TemplateManager(fixture);
    manager.projectRoot = fixture;
    manager.globalDir = path.join(fixture, 'global');
    await manager.promoteProjectTemplate('cinema-short-film', 'video');
    assert.ok(fs.existsSync(path.join(fixture, 'global', 'video', 'cinema-short-film.md')));
    assert.equal(fs.existsSync(path.join(fixture, 'global', 'video', 'unrelated.md')), false);
    console.log('Audit and bundled video-template checks passed.');
  } finally {
    const resolved = path.resolve(fixture);
    if (resolved.startsWith(path.resolve(os.tmpdir()) + path.sep) && path.basename(resolved).startsWith('openproducer-audit-')) {
      fs.rmSync(resolved, { recursive: true, force: true });
    }
  }
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
