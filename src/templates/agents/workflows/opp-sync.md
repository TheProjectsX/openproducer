---
description: Sync new changes into the project brain (pre-produce) or across both the brain and creator files inside ./production/ (post-produce)
---

# /opp-sync (or /openproducer-sync)

Execute the OpenProducer Sync workflow to synchronize new changes made during conversation or manual edits:

1. **Activate Skill:** Invoke the `openproducer-sync` skill.
2. **Pre-Condition Gate (Check `propose_complete`):**
   - Read `./openproducer/state.json`.
   - **IF `stages.propose_complete == false` (or `./openproducer/state.json` has not been proposed yet):**
     - **STOP immediately.** Do not sync anything. Prompt the creator: *"This project hasn't gone through the propose phase yet. Please run **`/opp-propose`** first to initialize the project brain!"*
3. **Dual-Mode Execution (Only when `propose_complete == true`):**
   - **Case A — Pre-Produce Sync (`stages.produce_complete == false`):**
     - Sync all new conversational changes, plot adjustments, script tweaks, or configuration changes strictly into `./openproducer/` (`config.json`, `blueprint.md`, `visual/technical_anchor.txt`, `state.json`) and `production/story/` (if pre-production story files exist; if creator explicitly updated `clean.txt`, sync `clean.txt` -> `script.txt`). Do not create video deliverable files in `./production/` yet.
   - **Case B — Post-Produce Sync (`stages.produce_complete == true`):**
     - Sync all new changes into **both** the brain files (`./openproducer/`) **AND** the generated creator files inside `./production/` on disk (`production/story/` if present, `production/base_image_prompt.txt`, `production/audio_script.txt`, `production/subjects/`, `production/visuals/environments/`, `production/clips/clip_xxx/`, `production/scratchbook.md`, `production/master_images_prompt.txt`, `production/master_videos_prompt.txt`).
     - Audit all updated prompts against Linters L-01 to L-19 and update `./openproducer/manifest.json`.
4. **Output Structured Status Card:**
   - Display the standardized `### 🎬 OpenProducer Status: SYNC` card reporting whether Brain-Only or Brain + Creator Files in `./production/` were synchronized.
