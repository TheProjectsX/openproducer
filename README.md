# 🎬 OpenProducer

> **Autonomous, Creator-Centric AI Video Generation Framework & Scaffolding Engine**  
> Orchestrating **Google Flow**, **Veo 3.1**, **Imagen 4**, and **Gemini 1.5 Pro**.

[![npm version](https://img.shields.io/npm/v/openproducer.svg?style=flat-square)](https://www.npmjs.com/package/openproducer)
[![GitHub Repository](https://img.shields.io/badge/GitHub-TheProjectsX%2Fopenproducer-black?logo=github&style=flat-square)](https://github.com/TheProjectsX/openproducer)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=flat-square)](https://www.typescriptlang.org/)

---

## ⚡ Quick Start

Initialize a new AI video production project in seconds:

```bash
# In the current directory
npx openproducer init

# Or in a new folder
npx openproducer init my-short-film
```

Open the initialized folder in your AI editor (**Google Antigravity**, **Cursor**, **VS Code**, or **Claude Code**). Tell your AI:

> *"I have an idea for a video"* or run `/opp:explore`

OpenProducer immediately conducts the intake, crafts your story, and generates production-ready prompts!

---

## 🚀 Features

- **Live Cloud Registry Sync & 3-Tier Auto-Fallback Caching:**
  - `npx openproducer init` and `npx openproducer update` dynamically fetch the freshest agent skills (`.agents/skills/`), workflows (`.agents/workflows/`), and templates directly from the upstream cloud registry.
  - **Workstation Cache on Every Fetch:** Every successful online fetch automatically updates the persistent workstation cache (`~/.openproducer/cache/upstream/`).
  - **Tiered Auto-Fallback:**
    1. **Live Upstream:** Fetches latest templates & skills online.
    2. **Persistent Workstation Cache:** If offline or connection fails, automatically falls back to the last-fetched workstation cache.
    3. **Bundled Local Package:** If no persistent cache exists, seamlessly falls back to pre-packaged bundled templates.
- **Brain vs. Shoot Floor Separation:**
  - `openproducer/` (Internal Producer Brain): Maintains project configurations, state machines, linter audit ledgers, and `blueprint.md` for 100% context-lossless session handoffs.
  - `production/` (Shoot Floor): Houses creator-facing clean plain-text `.txt` prompts (`base_image_prompt.txt`, `clips/clip_01/`), audio scripts, timeline tables, and motion graphics.
- **7 Discrete Operational Modes:**
  - `explore` (`/opp:explore`): 100% read-only creative intake and discovery.
  - `propose` (`/opp:propose`): Brain proposal synthesis before touching creator workspace.
  - `produce` (`/opp:produce`): Physical file generation on disk.
  - `guide` (`/opp:guide`): 4-Gate interactive rendering co-pilot.
  - `sync` (`/opp:sync`): Pre-flight linter quality auditor.
  - `doctor` (`/opp:doctor`): Surgical emergency room for Veo runtime AI video glitches.
  - `template` (`/opp:template`): Global episodic series preset vault (`~/.openproducer/templates/`).
- **19 Pre-Flight Linters (L-01 to L-19):**
  - Word count economy (75–150 words per clip).
  - Absolute ban on physical camera equipment nouns (`tripod`, `dolly track`, `crane rig`).
  - Asymmetric token decay prioritization (framing & primary subject in first 30 tokens).
  - Motivated lighting vectors and 3-plane depth staging.
  - Automated Trust & Safety false-positive scanner.
- **8 Pluggable Visual Style Paradigms:**
  - Social UGC & Mobile Video
  - Minimalist Vector / Stick Figure
  - Photorealistic Live-Action Cinema (35mm Anamorphic)
  - Commercial Tabletop Advertising
  - Traditional 2D Japanese Cel Anime
  - Stylized 3D CGI Animation
  - Vintage & Retro Film Archival
  - Tactile Stop-Motion Claymation

---

## 💻 CLI Usage

### `init [directory]`

Scaffolds a new OpenProducer production project.

```bash
# Instant setup with pristine defaults from GitHub (Default: --yes=true)
npx openproducer init my-video

# Optional interactive prompt setup
npx openproducer init my-video -i

# Specify parameters directly
npx openproducer init my-doc \
  --tier modular_studio \
  --archetype cinema \
  --aspect-ratio 16:9 \
  --style live_action_cinema \
  --audio pathway_a_native_veo
```

#### CLI Options

| Flag | Description | Options |
|---|---|---|
| `-n, --name <name>` | Project name | Any string (default: folder name) |
| `-i, --interactive` | Interactive prompt | Interactively choose tier, style, aspect ratio |
| `-t, --tier <tier>` | Operating tier | `lean_base_reference`, `modular_studio` |
| `-a, --archetype <archetype>` | Project archetype | `social_ugc`, `explainer`, `cinema`, `commercial`, `animation_2d`, `music_video` |
| `-r, --aspect-ratio <ratio>` | Viewport framing | `9:16`, `16:9`, `1:1`, `21:9` |
| `-s, --style <style>` | Visual style | `social_ugc_video`, `vector_stick_figure`, `live_action_cinema`, `commercial_tabletop`, etc. |
| `--audio <pathway>` | Audio pathway | `pathway_a_native_veo`, `pathway_b_external_audio` |
| `--delivery <mode>` | Delivery mode | `separate_script_first`, `separate_all_at_once`, `embedded` |
| `--template <id>` | Load series preset | Stored in `~/.openproducer/templates/<id>.json` |
| `--offline` | Skip remote fetch | Uses bundled offline templates |
| `-y, --yes` | Default mode | Instant clean setup from fetch (default: true) |
| `-f, --force` | Overwrite | Overwrites existing files if directory is not empty |

### `update [directory]` (alias: `upgrade`)

Updates an initialized or actively in-progress production project to the latest OpenProducer framework standards without overwriting or destroying creator work.

```bash
# Update current project
npx openproducer update

# Or update a specific project directory
npx openproducer update ./my-video

# Force refresh of all framework files
npx openproducer update --force
```

#### What `update` Does:
- **Refreshes AI Skills & Workflows:** Pulls the latest `.agents/skills` and `.agents/workflows` from the upstream registry so your AI assistant has access to the newest prompts, linters, and operational modes.
- **Synchronizes Specifications:** Updates root `STRUCTURE.md` and `AGENTS.md` to the current standards.
- **Non-Destructive Schema Migration:** Safely updates `openproducer/config.json`, `openproducer/state.json`, and adds any missing linter rules to `manifest.json`.
- **In-Progress Asset Migration:** Seamlessly upgrades existing projects:
  - Migrates legacy `audio_script.md` to bracket-tagged `audio_script.txt`.
  - Relocates any legacy root creator files into the dedicated `production/` shoot floor.
- **100% Protected Creative Assets:** Never overwrites `openproducer/blueprint.md`, brainstormed plots, generated video clip prompts, or creator media.

---

### `status`

Displays current project metadata, active locks, and the next recommended producer action.

```bash
npx openproducer status
# or alias
opp status
```

---

### `doctor` (alias: `lint`)

Executes all 19 Master Linters against project prompts and records results into `openproducer/manifest.json`.

```bash
npx openproducer doctor
```

---

### `template`

Manages episodic franchise presets stored globally across your workstation.

```bash
# List all saved templates
npx openproducer template list

# Save current project look as a reusable preset
npx openproducer template save stickman-series

# Apply template to current workspace
npx openproducer template use stickman-series

# Update existing template schema based on current workspace changes
npx openproducer template update stickman-series "Update the design schema based on our current changes"
```

---

## 📦 Programmatic TypeScript API

You can also import and use OpenProducer programmatically in your Node.js or TypeScript applications:

```typescript
import { scaffoldProject, LinterSuite, ConfigManager } from 'openproducer';

// 1. Programmatic scaffolding
const result = await scaffoldProject({
  directory: './my-commercial',
  name: 'chrono_watch_commercial',
  tier: 'lean_base_reference',
  archetype: 'commercial',
  aspectRatio: '16:9',
  style: 'commercial_tabletop',
  audio: 'pathway_a_native_veo'
});

console.log(`Created project with ${result.filesCreated.length} files.`);

// 2. Programmatic linters
const suite = new LinterSuite('./my-commercial');
const audit = await suite.runAll();
console.log(`Audit certification: ${audit.certified ? 'PASSED' : 'FAILED'}`);
```

---

## 🛠️ Publishing to NPM

To publish this package to the npm registry:

```bash
# 1. Ensure dependencies and build are clean
npm install
npm run build

# 2. Run dry-run to verify bundled files
npm pack --dry-run

# 3. Publish to npm registry
npm publish --access public
```

---

## 📄 License

MIT © [Modasser](https://github.com/modasser)

