# Discussion 73: Dedicated `production/` Folder Workspace Architecture

## Context & Creator Intent
In previous iterations, creator deliverables (`base_image_prompt.txt`, `audio_script.md`, `clips/`, `master_images_prompt.txt`, `master_videos_prompt.txt`, `scratchbook.md`, etc.) were placed directly at the workspace root alongside `openproducer/`. While functional, this cluttered the project root as projects grew in size.

The creator established that all production assets (prompts, scripts, clips, audio, and manifests) must now reside inside a dedicated top-level directory named strictly **`production/`**.

---

## Architectural Changes

### 1. Workspace Zone Separation
The workspace root is now completely clean with only two foundational directories:
- **`./openproducer/` (Internal Producer Brain):** Holds `config.json`, `state.json`, `blueprint.md`, `manifest.json`, and `visual/technical_anchor.txt`.
- **`./production/` (Creator Production Deliverables):** Holds all generation assets:
  - `production/base_image_prompt.txt`
  - `production/audio_script.md`
  - `production/clips/clip_xxx/[image_prompt.txt, video_prompt.txt]`
  - `production/subjects/` (if Modular Studio)
  - `production/visuals/environments/` (if Modular Studio)
  - `production/master_images_prompt.txt`
  - `production/master_videos_prompt.txt`
  - `production/scratchbook.md`
  - `production/motion_graphics.md` (if applicable)

### 2. Synchronization Across Workflows & Specifications
Updated:
- `production_template/STRUCTURE.md`
- `production_template/AGENTS.md`
- `agents/skills/openproducer-core/specs/07_scaffolding_and_workspace_spec.md`
- `production_framework/specs/07_scaffolding_and_workspace_spec.md`
- `agents/skills/openproducer-produce/SKILL.md` & `agents/workflows/opp-produce.md`
- `agents/skills/openproducer-sync/SKILL.md` & `agents/workflows/opp-sync.md`
- `agents/skills/openproducer-guide/SKILL.md` & `agents/workflows/opp-guide.md`
- `agents/skills/openproducer-doctor/SKILL.md` & `agents/workflows/opp-doctor.md`

### 3. Simulation Benchmark (`the_lighthouse_v2`)
Migrated `production_framework/simulations/the_lighthouse_v2/` so that all 37 clips, `audio.srt`, `audio_script.md`, `base_image_prompt.txt`, `master_images_prompt.txt`, `master_videos_prompt.txt`, and `scratchbook.md` are housed inside `production_framework/simulations/the_lighthouse_v2/production/`. Verified that the workspace root consists only of `openproducer/` and `production/`.

