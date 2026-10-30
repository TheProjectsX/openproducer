---
description: Produce creator deliverables on disk from the brain (auto-runs propose first if still in explore)
---

# /opp-produce (or /openproducer-produce)

Execute the OpenProducer Produce workflow to generate all creator deliverables on disk:

1. **Activate Skill:** Invoke the `openproducer-produce` skill.
2. **Auto-Propose Guard (If Still in `explore`):**
   - Read `./openproducer/state.json`.
   - **IF `stages.propose_complete == false`:** Automatically run the `openproducer-propose` workflow FIRST to save the story, raw plot archive, settings, and plan into `./openproducer/` before executing `produce`.
3. **Execute File Factory Based on Audio Settings (`./openproducer/config.json`):**
   - **Strict Rule:** Never generate any images on your own unless explicitly asked by the creator.
   - **Plain-Text Prompt Format (Zero Markdown Bloat):** All prompt files (`.txt`) must follow the clean plain-text bracket format from `the_314am_doppelganger` (`[TIER ...]`, `Conditioned On:`, `[IMAGE PROMPT]` / `[VIDEO PROMPT]`, `[NEGATIVE PROMPT]`) with zero markdown `#` headings or emojis.
   - **Case A — Separate Audio + Script First (`audio_delivery_mode == "separate_script_first"`):**
     - **Pass 1 (Before Timestamps):** Create `base_image_prompt.txt`, `audio_script.md` (continuous script with Google AI Studio System Instructions and **sparse, context-driven** `<short pause>` / `<whisper>...</whisper>` tags — max 1–3 `<short pause>` tags per ~100 words at climactic twists only, **NEVER after every sentence**, never writing standalone `.` lines, and **NEVER divided by clip sizes**), `scratchbook.md`, and (if `modular_studio`) `subjects/<id>/[hero_prompt.txt, profile_prompt.txt]` and `visuals/environments/<id>/prompt.txt` with `Conditioned On:` connection lines. Set `"produce_complete": true` and `"clips_generated": false`. Ask creator for audio timestamps/transcripts (or offer `/opp-guide`).
     - **Pass 2 (After Creator Gives Timestamps):** Create `clips/clip_xxx/[image_prompt.txt, video_prompt.txt]` (matched to timestamps with `Conditioned On:` / `Input Seed:` connection lines), `master_images_prompt.txt`, and `master_videos_prompt.txt`. Set `"clips_generated": true`.
   - **Case B — Embedded Audio OR Separate Audio + All Together (`embedded` or `separate_all_at_once`):**
     - Create all creator files at once:
       - `base_image_prompt.txt`
       - `audio_script.md` (if `separate_all_at_once`: continuous script with Google AI Studio System Instructions and `<short pause>`, `<whisper>...</whisper>` tags — never divided by clips)
       - If `modular_studio`: `subjects/<id>/[hero_prompt.txt, profile_prompt.txt]` and `visuals/environments/<id>/prompt.txt`
       - `clips/clip_xxx/[image_prompt.txt, video_prompt.txt]` (plain-text with `Conditioned On:` / `Input Seed:` lines)
       - `master_images_prompt.txt` & `master_videos_prompt.txt` (creator self-serve references only)
       - `scratchbook.md` & `motion_graphics.md` (if applicable)
     - Set `"produce_complete": true` and `"clips_generated": true`.
4. **Audit Against Linters (L-01 to L-19):**
   - Verify 75–150 words per prompt, zero equipment nouns, soft punctuation, and safety checks; record in `./openproducer/manifest.json`.
5. **Output Structured Status Card:**
   - Display the standardized `### 🎬 OpenProducer Status: PRODUCE` card offering `/opp-guide`.
