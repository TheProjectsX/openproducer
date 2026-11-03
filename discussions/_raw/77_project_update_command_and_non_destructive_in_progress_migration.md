# Discussion 77: Project Update Command & In-Progress Migration Engine

## Context & Motivation
Once a creator runs `openproducer init` (or `opp init`), the project enters active production (`explore` -> `propose` -> `produce` -> `guide`). As the OpenProducer framework continues to evolve with new linters, updated specs, bug fixes in agent skills, or format improvements (such as moving from `audio_script.md` to bracket-tagged `audio_script.txt`), existing projects need a simple, reliable command to upgrade:
`npx openproducer update [directory]` (alias: `openproducer upgrade`).

Crucially, this update process must operate on **already initiated projects and projects where active creation has started** without destroying or overwriting any creator assets.

---

## Technical Design & Safety Guarantees

### 1. Zero Overwrite of Creator Work
The `update` command strictly preserves:
- **`openproducer/blueprint.md`**: Complete creative story, character descriptions, and plot points are 100% untouched.
- **`openproducer/config.json`**: All creator project parameters (`project_name`, `tier`, `archetype`, `visual_style`, `aspect_ratio`, `audio_pathway`) are preserved; only missing default schema keys are backfilled.
- **`openproducer/state.json`**: Active stages, locks, and progress booleans are preserved.
- **`production/clips/`**: All generated shot prompts, keyframes, and videos are untouched.
- **`production/base_image_prompt.txt`, `production/subjects/`, `production/visuals/environments/`, `scratchbook.md`**: All creator files are preserved.

### 2. Upstream Refresh
- Synchronizes `.agents/skills/` and `.agents/workflows/` directly from the live upstream cloud registry (with local bundled fallback).
- Updates root `STRUCTURE.md` and `AGENTS.md` framework guidelines.

### 3. Automated In-Progress Asset Migrations
When run in older or mid-production projects, `update` automatically executes safe migrations:
1. **Audio Script Migration:** Converts legacy `audio_script.md` into plain-text `production/audio_script.txt` using bracketed meta tags (`[AUDIO CONFIGURATION]`, `[VOICE CAST & PRESETS]`, `[SYSTEM INSTRUCTIONS]`, `[AUDIO SCRIPT]`, `[DOWNSTREAM WORKFLOW]`) and removes the deprecated Markdown file.
2. **Dedicated Shoot Floor Relocation:** If any creator files (`base_image_prompt.txt`, `clips/`, `master_images_prompt.txt`, `master_videos_prompt.txt`, `scratchbook.md`, `audio.srt`) were placed at the project root prior to the dedicated folder specification, they are safely moved into `production/`.
3. **Manifest Synchronization:** Adds any newly introduced linters (e.g. L01–L19) to `openproducer/manifest.json` as `PENDING` without resetting previously audited linters.

### 4. Registry Abstraction
All terminal logging and status messages display vendor-neutral registry indicators (`Connecting to remote registry...`, `Live Upstream Registry (Synchronized)`), completely hiding upstream repository details from the CLI.

