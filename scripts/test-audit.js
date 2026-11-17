const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
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
    const valid = `[CONFIGURATION SETTINGS]\nDuration: 10s\nAspect Ratio: 16:9\n[INPUT SEEDS & INGREDIENTS]\nVideo Input Mode: Frames to Video\nStart Source: [IMAGE 1]\n[IMAGE 1] START: production/clips/clip_001/image_prompt.txt\n[VIDEO PROMPT]\nStart from [IMAGE 1], preserving the approved opening composition. A keeper raises an already-held lantern inside the stone stairwell. Audio: SFX: footstep; Ambience: wind; Dialogue: None; Music: None.\n`;
    fs.writeFileSync(video, valid);
    result = await new LinterSuite(fixture).runAll();
    assert.equal(result.results.find((r) => r.id === 'L03').status, 'PASS');
    assert.equal(result.results.find((r) => r.id === 'L04').status, 'PASS');
    assert.equal(result.results.find((r) => r.id === 'L09').status, 'PASS');
    assert.equal(result.results.find((r) => r.id === 'L06').status, 'PASS');
    assert.equal(result.results.find((r) => r.id === 'L05').status, 'PENDING');
    assert.equal(result.certified, false); // Creator reviews are not automatic passes.

    fs.writeFileSync(video, `${valid}[NEGATIVE PROMPT]\nface, eyes, mouth\n`);
    result = await new LinterSuite(fixture).runAll();
    assert.equal(result.results.find((r) => r.id === 'L05').status, 'FAIL');
    fs.writeFileSync(video, `${valid}NEGATIVE PROMPT: face, eyes, mouth\n`);
    result = await new LinterSuite(fixture).runAll();
    assert.equal(result.results.find((r) => r.id === 'L05').status, 'FAIL');
    fs.writeFileSync(video, valid);

    fs.writeFileSync(video, valid.replace('Start from [IMAGE 1], preserving the approved opening composition. ', ''));
    result = await new LinterSuite(fixture).runAll();
    assert.equal(result.results.find((r) => r.id === 'L06').status, 'WARN');
    assert.equal(result.results.find((r) => r.id === 'L11').status, 'WARN');
    fs.writeFileSync(video, valid.replace('[VIDEO PROMPT]', '[IMAGE 2] SUBJECT REFERENCE: production/subjects/keeper/profile_prompt.txt\n[VIDEO PROMPT]'));
    result = await new LinterSuite(fixture).runAll();
    assert.equal(result.results.find((r) => r.id === 'L06').status, 'WARN');
    const twoImage = valid.replace('[VIDEO PROMPT]', '[IMAGE 2] SUBJECT REFERENCE: production/subjects/keeper/profile_prompt.txt\n[VIDEO PROMPT]')
      .replace('A keeper raises', 'Use [IMAGE 2] only for the keeper\'s identity. A keeper raises');
    fs.writeFileSync(video, twoImage);
    result = await new LinterSuite(fixture).runAll();
    assert.equal(result.results.find((r) => r.id === 'L06').status, 'PASS');
    const imageOneReference = valid
      .replace('Start Source: [IMAGE 1]\n[IMAGE 1] START: production/clips/clip_001/image_prompt.txt', 'Start Source: [IMAGE 2]\n[IMAGE 1] SUBJECT REFERENCE: production/subjects/keeper/profile_prompt.txt\n[IMAGE 2] START: production/clips/clip_001/image_prompt.txt')
      .replace('Start from [IMAGE 1], preserving the approved opening composition.', 'Use [IMAGE 1] for the keeper\'s identity. Start from [IMAGE 2], preserving the approved opening composition.');
    fs.writeFileSync(video, imageOneReference);
    result = await new LinterSuite(fixture).runAll();
    assert.equal(result.results.find((r) => r.id === 'L06').status, 'PASS');
    assert.equal(result.results.find((r) => r.id === 'L11').status, 'PASS');
    const referencesOnly = valid
      .replace('Video Input Mode: Frames to Video\nStart Source: [IMAGE 1]\n[IMAGE 1] START: production/clips/clip_001/image_prompt.txt', 'Video Input Mode: Ingredients to Video\nStart Source: none\n[IMAGE 1] SUBJECT REFERENCE: production/subjects/keeper/profile_prompt.txt')
      .replace('Start from [IMAGE 1], preserving the approved opening composition.', 'Use [IMAGE 1] for the keeper\'s identity.');
    fs.writeFileSync(video, referencesOnly);
    result = await new LinterSuite(fixture).runAll();
    assert.equal(result.results.find((r) => r.id === 'L06').status, 'PASS');
    assert.equal(result.results.find((r) => r.id === 'L11').status, 'PASS');
    fs.writeFileSync(video, valid);

    fs.writeFileSync(video, valid.replace('raises an already-held lantern', 'raises a tripod'));
    result = await new LinterSuite(fixture).runAll();
    assert.equal(result.results.find((r) => r.id === 'L03').status, 'FAIL');

    fs.writeFileSync(video, valid.replace('Duration: 10s', 'Duration: 7s'));
    result = await new LinterSuite(fixture).runAll();
    assert.equal(result.results.find((r) => r.id === 'L09').status, 'FAIL');

    fs.writeFileSync(video, valid.replace('raises an already-held lantern', 'raises an already-held lantern for 10s'));
    result = await new LinterSuite(fixture).runAll();
    assert.equal(result.results.find((r) => r.id === 'L04').status, 'FAIL');

    const mediumChecker = path.join(__dirname, '..', 'agents', 'skills', 'openproducer-produce', 'scripts', 'check_prompt_medium.js');
    const image = path.join(clipDir, 'image_prompt.txt');
    const checkMedium = () => spawnSync(process.execPath, [mediumChecker, fixture], { encoding: 'utf8' });
    fs.writeFileSync(image, '[IMAGE PROMPT]\nThe keeper stands mid-stride in the stone stairwell, lantern already in his hand.\n');
    fs.writeFileSync(video, valid);
    assert.equal(checkMedium().status, 0);
    fs.writeFileSync(image, '[IMAGE PROMPT]\nThe keeper stands in the stone stairwell. The camera pans left, then he runs. Audio: SFX: footsteps.\n');
    let mediumResult = checkMedium();
    assert.equal(mediumResult.status, 1);
    assert.match(mediumResult.stdout, /camera movement belongs in the video prompt/);
    assert.match(mediumResult.stdout, /generated sound belongs in the video prompt/);
    fs.writeFileSync(image, '[IMAGE PROMPT]\nThe keeper stands mid-stride in the stone stairwell.\n');
    fs.writeFileSync(video, valid.replace('A keeper raises an already-held lantern', 'Generate a still image of the keeper'));
    mediumResult = checkMedium();
    assert.equal(mediumResult.status, 1);
    assert.match(mediumResult.stdout, /still-image output instruction belongs in an image prompt/);
    fs.writeFileSync(video, valid.replace('A keeper raises an already-held lantern', 'The keeper is in the stone stairwell'));
    mediumResult = checkMedium();
    assert.equal(mediumResult.status, 1);
    assert.match(mediumResult.stdout, /review temporal direction/);
    fs.writeFileSync(video, valid.replace('A keeper raises an already-held lantern', 'The keeper holds a lantern in the stone stairwell'));
    assert.match(checkMedium().stdout, /review temporal direction/);
    fs.writeFileSync(video, valid.replace('A keeper raises an already-held lantern', 'The keeper holds his pose motionless throughout the clip'));
    assert.equal(checkMedium().status, 0);
    fs.writeFileSync(video, valid);

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
