# 🎬 OpenProducer

> **Autonomous, Creator-Centric AI Video Generation Framework & Scaffolding Engine**  
> Orchestrating **Google Flow**, **Veo 3.1**, **Imagen 4**, and **Gemini Flash / Omni**.

[![npm version](https://img.shields.io/npm/v/openproducer.svg?style=flat-square)](https://www.npmjs.com/package/openproducer)
[![GitHub Repository](https://img.shields.io/badge/GitHub-TheProjectsX%2Fopenproducer-black?logo=github&style=flat-square)](https://github.com/TheProjectsX/openproducer)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=flat-square)](https://www.typescriptlang.org/)

---

## ⚡ Quick Start

Initialize a new production workspace in seconds:

```bash
# In the current directory
npx openproducer init

# Or in a new folder
npx openproducer init my-short-film
```

Open the project folder in your AI editor (**Google Antigravity**, **Cursor**, **Claude Code**, or **VS Code**). In chat, invoke your first skill:

> `/openproducer-explore` *(or type: "I have an idea for a video")*

OpenProducer immediately conducts the intake, crafts your story, and generates production-ready prompts!

---

## 🎬 Example Walkthrough: A Real Production Run

Inspired by Spec-Driven Development (SDD) frameworks like OpenSpec, OpenProducer orchestrates human intent through structured markdown files and autonomous agent skills:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          THE OPENPRODUCER LIFECYCLE                         │
├─────────────────────────────────────────────────────────────────────────────┤
│ 1. INIT       npx openproducer init my-film                                 │
│ 2. EXPLORE    /openproducer-explore "A sci-fi horror in an underwater lab"   │
│ 3. PROPOSE    /openproducer-propose                                         │
│ 4. PRODUCE    /openproducer-produce                                         │
│ 5. RENDER     /openproducer-guide                                           │
│ 6. DOCTOR     /openproducer-doctor "Clip 3 has a dropped wall glitch"       │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1. Initialize Workspace
```bash
npx openproducer init the-submerged-cathedral --style live_action_cinema --aspect-ratio 16:9
```
This scaffolds:
- `openproducer/` — **The Brain:** Machine state, configuration, and linter audit ledger.
- `production/` — **The Shoot Floor:** Clean plain-text prompts, audio scripts, and scene rules.

### 2. Creative Intake (`/openproducer-explore`)
Tell your AI assistant:
> `/openproducer-explore A horror thriller where deep-sea diver Maya Lin discovers an ancient gothic cathedral at the bottom of the Mariana Trench.`

The AI enters a **100% read-only exploration mode** in session memory, brainstorming story beats and clarifying settings via interactive UI questions:
- *Aspect Ratio:* `16:9 (Widescreen)`
- *Visual Style:* `Live-Action Cinema (35mm Anamorphic)`
- *Audio Pathway:* `Separate Audio (Google AI Studio Speech Playground)`

### 3. Save to Brain (`/openproducer-propose`)
When you are satisfied with the brainstormed direction, trigger:
> `/openproducer-propose`

The AI compiles and locks the blueprint into `./openproducer/` (`config.json`, `blueprint.md`, `visual/technical_anchor.txt`), guaranteeing **zero context loss across agent sessions**.

### 4. Physical Prompt Generation (`/openproducer-produce`)
Trigger prompt compilation:
> `/openproducer-produce`

OpenProducer generates the full production kit on disk in `./production/`:
- `production/base_image_prompt.txt` — Master visual style DNA anchor.
- `production/audio_script.txt` — Google AI Studio multi-speaker script with 40 official breathing/cadence tags.
- `production/visuals/environments/cathedral/` — Empty stage plate prompt + **`ground_rules.md`** (locking room topology, Z-index depth, and negative bans).
- `production/clips/clip_01/` to `clip_08/` — Shot-by-shot prompts featuring:
  - **Dual Conditioning:** First Frame starting seed + persistent reference ingredients (`[IMAGE 1]` Maya Lin turnaround sheet + `[IMAGE 2]` cathedral plate).
  - **Kinematic Action Handover:** Terminal posture of Clip N seamlessly continuing into Frame 1 of Clip N+1.
  - **BGM Handover Directives:** Eliminating volume drop-offs across cuts via `[CONTINUATION - SUSTAIN]`.

### 5. Surgical Retake Doctor (`/openproducer-doctor`)
If a generated video clip has an AI diffusion defect in Google Flow:
> `/openproducer-doctor clip_03 randomly dropped a partition wall from the ceiling`

The AI immediately:
1. Diagnoses `🩺 G-17: Dropped Wall & Architectural Topology Mutation`.
2. Surgically patches `production/clips/clip_03/video_prompt.txt` with unbroken room topology constraints and negative partition bans.
3. Re-audits pre-flight linters and syncs manifests.

---

## 🚀 Core Features & Breakthroughs

- **Dual-Conditioned Video Generation (First Frame + Ingredients):**
  - Solves mid-clip facial morphing and wardrobe drift during walk-ins, tilt-up reveals, and 180° head turns.
  - Video prompts bind both the starting keyframe (`First Frame`) AND persistent reference ingredients (`[IMAGE 1]` Subject Turnaround, `[IMAGE 2]` Empty Stage Plate).
- **Mandatory Scene Ground Rules (`ground_rules.md`):**
  - Reference images provide visual texture, but `ground_rules.md` establishes non-negotiable architectural invariants:
    - *Room Topology:* Prevents AI from hallucinating partition walls dropping from the ceiling or random pillars.
    - *Z-Index Depth Layering:* Forces subjects to stay seated strictly *behind* desks/counters, fully occluded by foreground furniture.
    - *Negative Hallucination Bans:* Bans unauthorized ceiling fans, curtains, or modern screens.
- **Dynamic BGM Continuity & Handover State Machine:**
  - Solves the jarring volume cliff where Clip N ends on an 85% crescendo and Clip N+1 resets to a quiet intro.
  - Automatically matches dynamic states: $\mathbf{Dynamic\ State(Clip\ N+1)_{Entry} = Dynamic\ State(Clip\ N)_{Exit}}$ with explicit directives (`[CONTINUATION - SUSTAIN]`, `[CONTINUATION - DECAY]`).
- **Uncapped Descriptive Prompt Depth:**
  - Abolished the restrictive 100–150 word cap (`L-01`). Prompts are unconstrained to thoroughly specify scene geometry, subject clothing, and camera kinematics, while spoken dialogue pacing (`L-14`) remains mathematically locked to speech velocity (~2.0–2.2 words/sec).
- **Brain vs. Shoot Floor Separation:**
  - `openproducer/` (Brain): Internal machine state, configs, and audit ledgers.
  - `production/` (Shoot Floor): 100% clean plain-text `.txt` prompts ready to copy-paste into Google Flow.
- **19 Pre-Flight Linters (L-01 to L-19):**
  - Enforces zero camera hardware nouns (`L-03`), asymmetric token decay (`L-02`), multi-character clean singles (`L-13`), and Trust & Safety false-positive sanitization (`L-19`).
- **8 Pluggable Visual Style Paradigms:**
  - Live-Action Cinema (35mm Anamorphic)
  - Traditional 2D Cel Anime
  - Stylized 3D CGI Animation
  - Commercial Tabletop Advertising
  - Social UGC & Mobile Video
  - Minimalist Vector / Stick Figure
  - Vintage & Retro Film Archival
  - Tactile Stop-Motion Claymation

---

## 🧠 The 7 Core Operational Modes

In your AI assistant chat, call these modes directly using slash commands:

| Command | Operational Role | Disk Action | Output Deliverable |
|---|---|---|---|
| `/openproducer-explore` | **Creative Intake & Brainstorming** | Read-Only | Clarifies plot, style, audio mode in session memory |
| `/openproducer-propose` | **Brain Synthesis & State Archival** | Writes to Brain | `openproducer/config.json`, `blueprint.md`, anchors |
| `/openproducer-produce` | **Physical Prompt Generation** | Writes to Production | Plain-text prompts, `ground_rules.md`, audio scripts |
| `/openproducer-guide` | **Rendering Co-Pilot** | Read-Only | 4-Gate step-by-step rendering assistant for Google Flow |
| `/openproducer-sync` | **State & Linter Quality Auditor** | Bidirectional Sync | Synchronizes brain & shoot floor, updates manifest |
| `/openproducer-doctor` | **Surgical Emergency Room** | Surgically Patches | Cures runtime glitches (`G-01` through `G-20`) |
| `/openproducer-template` | **Global Franchise Preset Vault** | Global Preset Sync | Manages episodic presets in `~/.openproducer/templates/` |

---

## 💻 CLI Reference

### `init [directory]`

Scaffolds a new OpenProducer production project.

```bash
# Instant setup with defaults
npx openproducer init my-video

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
| `-s, --style <style>` | Visual style | `live_action_cinema`, `social_ugc_video`, `commercial_tabletop`, etc. |
| `--audio <pathway>` | Audio pathway | `pathway_a_native_veo`, `pathway_b_external_audio` |
| `--delivery <mode>` | Delivery mode | `separate_script_first`, `separate_all_at_once`, `embedded` |
| `--template <id>` | Load series preset | Stored in `~/.openproducer/templates/<id>.md` |
| `--offline` | Skip remote fetch | Uses bundled offline templates |
| `-y, --yes` | Default mode | Instant clean setup from fetch (default: true) |

---

### `update [directory]` (alias: `upgrade`)

Updates an initialized or actively in-progress production project to the latest OpenProducer framework standards without overwriting creator work.

```bash
# Update current project
npx openproducer update

# Force refresh of framework files
npx openproducer update --force
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
npx openproducer template save scifi-series

# Apply template to current workspace
npx openproducer template use scifi-series

# Read template details
npx openproducer template read scifi-series
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
  tier: 'modular_studio',
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

## 📄 License

MIT © [Modasser](https://github.com/modasser)
