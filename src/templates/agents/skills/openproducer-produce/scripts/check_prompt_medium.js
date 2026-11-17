#!/usr/bin/env node
'use strict';

const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(process.argv[2] || process.cwd());
const production = path.join(root, 'production');

function promptFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) return promptFiles(file);
    if (!entry.isFile() || !/prompt\.txt$/i.test(entry.name) || /^master_/i.test(entry.name)) return [];
    return [file];
  });
}

function creativeBlock(content) {
  const matches = [...content.matchAll(/^\[(IMAGE|VIDEO) PROMPT\]\s*$/gmi)];
  if (matches.length !== 1) return null;
  const match = matches[0];
  const following = content.slice(match.index + match[0].length);
  const end = following.search(/^\[[A-Z][^\]]*\]\s*$/m);
  return { type: match[1].toLowerCase(), body: (end < 0 ? following : following.slice(0, end)).trim() };
}

const imageMotion = [
  [/\b(?:camera|view|framing)\s+(?:slowly\s+|gently\s+)?(?:pans?|tilts?|tracks?|zooms?|orbits?|pushes?\s+in|pulls?\s+back)\b/i, 'camera movement belongs in the video prompt'],
  [/\b(?:over the next\s+\d+\s+seconds?|throughout the clip|by the end of the clip|from (?:the )?first frame to (?:the )?last)\b/i, 'clip-time progression belongs in the video prompt'],
  [/\b(?:then|gradually|as the shot progresses)\b/i, 'sequential change belongs in the video prompt; describe the single visible pose instead'],
  [/\b(?:Audio|SFX|Ambience|Dialogue):/i, 'generated sound belongs in the video prompt'],
];
const videoStill = [
  [/\b(?:create|generate|render|produce)\s+(?:a|an)\s+(?:single\s+)?(?:still\s+image|still\s+frame|photo|photograph|illustration|poster)\b/i, 'still-image output instruction belongs in an image prompt'],
  [/\b(?:four|4)[ -]?(?:panel|view)\s+(?:turnaround|model)\s+sheet\b/i, 'model-sheet generation belongs in an image prompt'],
];
const temporalDirection = /\b(?:sprints?|runs?|walks?|turns?|raises?|lowers?|opens?|closes?|falls?|moves?|drifts?|ripples?|flickers?|sways?|pans?|tilts?|tracks?|pushes?|pulls?|zooms?|orbits?|shivers?|catches?|relaxes?|straightens?|pauses?|stares?|gazes?|breathes?|fades?|splashes?|scatters?|flees?|adjust\w*|plant\w*|jerk\w*|stumbl\w*|hitt?\w*|tak\w*|lean\w*|distort\w*|rattl\w*|split\w*|spider\w*|step\w*|freez\w*|skitter\w*|vibrat\w*|stiffen\w*|curl\w*|surg\w*|trembl\w*|darken\w*|isolat\w*|barrel\w*|flar\w*|rush\w*|fill\w*|jitter\w*|begin\w*|slowly|gradually|subtly|push-in|pull-back)\b/i;
const intentionalHold = /\b(?:static shot|locked-off|motionless|still throughout|(?:remains?|stays?)\s+(?:still|in (?:pure )?(?:absolute )?(?:pitch )?blackness)|holds? (?:the )?(?:pose|position|frame|stance)\b|holds? still|stands? frozen)\b/i;

const findings = [];
for (const file of promptFiles(production)) {
  const prompt = creativeBlock(fs.readFileSync(file, 'utf8'));
  if (!prompt) continue;
  const rules = prompt.type === 'image' ? imageMotion : videoStill;
  for (const [pattern, message] of rules) {
    if (pattern.test(prompt.body)) findings.push(`${path.relative(root, file)}: ${message}`);
  }
  const visualBody = prompt.body.split(/\bAudio:/i)[0];
  if (prompt.type === 'video' && !temporalDirection.test(visualBody) && !intentionalHold.test(visualBody)) {
    findings.push(`${path.relative(root, file)}: review temporal direction; describe what changes during the clip or an intentional hold`);
  }
}

if (findings.length) {
  for (const finding of findings) console.log(`REVIEW ${finding}`);
  console.log(`Medium review: ${findings.length} finding(s). Inspect context before changing prompts.`);
  process.exitCode = 1;
} else {
  console.log('Medium review: no obvious image/video prompt crossover found. Review meaning and renders manually.');
}
