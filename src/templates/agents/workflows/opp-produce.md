---
description: Produce creator deliverables on disk inside ./production/ from the brain (auto-runs propose first if still in explore)
---

# /opp-produce (or /openproducer-produce)

Execute the OpenProducer Produce workflow to generate all creator deliverables on disk inside `./production/`:

1. **Activate Skill:** Invoke the `openproducer-produce` skill.
2. **Auto-Propose Guard (If Still in `init` or `explore`):**
   - Read `./openproducer/state.json`.
   - **IF `stages.propose_complete == false`:** Automatically run the `openproducer-propose` workflow FIRST to save the story, raw plot archive, settings, and plan into `./openproducer/` before executing `produce`.
3. **Execute File Factory Based on Audio Settings (`./openproducer/config.json`) into `./production/`:**
   - **Strict Rule:** Never generate any images on your own unless explicitly asked by the creator.
   - **Clean Plain-Text Prompt Format (Zero Markdown Bloat):** All prompt files (`.txt`) must follow the clean plain-text bracket format from `the_314am_doppelganger` (`[TIER ...]`, `Conditioned On:`, `[IMAGE PROMPT]` / `[VIDEO PROMPT]`, `[NEGATIVE PROMPT]`) with zero markdown `#` headings or emojis.
   - **Dedicated `./production/` Folder:** All creator deliverables live strictly inside `./production/`. The workspace root stays clean with only `openproducer/` and `production/`.
   - **Case A — Separate Audio + Script First (`audio_delivery_mode == "separate_script_first"`):**
     - **Pass 1 (Before Timestamps):** Create `production/base_image_prompt.txt`, `production/audio_script.txt` with setup notes separated from paste-only speech, `production/scratchbook.md`, and (if `modular_studio`) subject/environment prompt cues. Set `"produce_complete": true`, `"clips_generated": false`; request the creator's approved audio duration and time-coded transcript before final clip timing. Use only TTS speaker/tag behavior verified in the chosen model/UI.
     - **Pass 2 (After Creator Gives Timestamps):**
        - **Context-Driven Cinematography (NOT 1:1 Transcript Slices):** Design clips based on **plot context, visual storytelling, and cinematic coverage** (establishing shots, medium shots, close-ups, macro cutaways, character reactions). Do NOT mechanically map 1 script line to 1 clip!
        - **Cue-to-Visual Ledger First:** In `scratchbook.md`, map every actual timed audio event to a required visible fact, subject/location, framing scale, reveal boundary, generation length, edited length, trim/hold, and manual audio use. Review every audio cue against the visuals and every major visual action against the script. No unrelated rhythmic inserts.
        - **Variable Edited Lengths:** Adjacent edited visual intervals meet without gaps. Their durations may be uneven. Generate each source clip for a supported project choice (`4s`, `6s`, `8s`, or `10s`) long enough for its planned edited use, and state the trim. Do not infer sync from a ±1s total alone.
        - **First-Moment Accuracy:** Image prompt shows the exact first visible moment of the audio window; video prompt shows only the change during that window. Keep subject-to-room proportion plausible and do not reveal future events early.
        - **Scene Image Chain:** First clip image in a location/time scene starts from approved base, subject, and environment images. Each next clip image in that scene cues the previous **approved clip image** already in Flow, with stable subject/environment anchors when supported. Restart from those anchors at a scene change or after drift. Record image lineage in the existing scratchbook row. Never require download, last-frame extraction, or re-upload.
        - **Dialogue Cleansing in Separate Audio:** Set `Dialogue: None;` in all `video_prompt.txt` files to prevent Veo from generating speech over the master track.
        - Create `production/clips/clip_xxx/[image_prompt.txt, video_prompt.txt]` (with `Conditioned On:` / `Input Seed:` lines), `production/master_images_prompt.txt`, and `production/master_videos_prompt.txt`. Set `"clips_generated": true`.
   - **Case B — Embedded Audio OR Separate Audio + All Together (`embedded` or `separate_all_at_once`):**
     - Create all creator files in `./production/` at once:
       - `production/base_image_prompt.txt`
       - `production/audio_script.txt` (if `separate_all_at_once`: separate setup notes from paste-only speech and use tested TTS format; clip timing stays provisional until the creator shares actual audio times. If `embedded`, skip `audio_script.txt` and embed Foley/dialogue directly into `video_prompt.txt`)
       - If `modular_studio`: `production/subjects/<id>/[hero_prompt.txt, profile_prompt.txt]` and `production/visuals/environments/<id>/prompt.txt`
       - `production/clips/clip_xxx/[image_prompt.txt, video_prompt.txt]` (plain-text with `Conditioned On:` / `Input Seed:` lines)
       - `production/master_images_prompt.txt` & `production/master_videos_prompt.txt` (creator self-serve references only)
       - `production/scratchbook.md` & `production/motion_graphics.md` (if applicable)
     - Set `"produce_complete": true` and `"clips_generated": true`.
4. **Audit Against Linters (L-01 to L-19):**
   - Verify only implemented checks and record pending human review honestly in `./openproducer/manifest.json`. No prompt word floor/ceiling. Prompt readiness never means clips were rendered or assembled.
5. **Output Structured Status Card:**
   - Display the standardized `### 🎬 OpenProducer Status: PRODUCE` card including the direct tool resources block (`Google AI Studio`, `TurboScribe` / `AudioToSRT`, `Google Flow`) and offering `/opp-guide`.
