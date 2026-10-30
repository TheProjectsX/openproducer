---
description: Sync new changes into the project brain (pre-produce) or across both the brain and creator files (post-produce)
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
     - Sync all new conversational changes, plot adjustments, script tweaks, or configuration changes strictly into `./openproducer/` (`config.json`, `blueprint.md`, `visual/technical_anchor.txt`, `state.json`). Do not create creator files yet.
   - **Case B — Post-Produce Sync (`stages.produce_complete == true`):**
     - Sync all new changes into **both** the brain files (`./openproducer/`) **AND** the generated creator files on disk (`base_image_prompt.txt`, `audio_script.md`, `subjects/`, `visuals/environments/`, `clips/clip_xxx/`, `scratchbook.md`, `master_images_prompt.txt`, `master_videos_prompt.txt`).
     - Audit all updated prompts against Linters L-01 to L-19 and update `./openproducer/manifest.json`.
4. **Output Structured Status Card:**
   - Display the standardized `### 🎬 OpenProducer Status: SYNC` card reporting whether Brain-Only or Brain + Creator Files were synchronized.
