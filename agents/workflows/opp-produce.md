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
     - **Pass 1 (Before Timestamps):** Create `base_image_prompt.txt`, `audio_script.md` (structured for Google AI Studio: if secondary voice exists, group preceding narration into alternating turns `[Narrator] (Speaker 1)` -> `[Voice B] (Speaker 2)` -> `[Narrator] (Speaker 1)` to generate 1 unified audio file for TurboScribe; if pure solo narration, format into balanced ~120-word segments to prevent TTS tag hallucination; never divided by video clips), `scratchbook.md`, and (if `modular_studio`) `subjects/<id>/[hero_prompt.txt, profile_prompt.txt]` and `visuals/environments/<id>/prompt.txt` with `Conditioned On:` connection lines. Set `"produce_complete": true` and `"clips_generated": false`. Ask creator for audio timestamps/transcripts (or offer `/opp-guide`).
     - **Pass 2 (After Creator Gives Timestamps):**
        - **Context-Driven Cinematography (NOT 1:1 Transcript Slices):** Design clips based on **plot context, visual storytelling, and cinematic coverage** (establishing shots, medium shots, close-ups, macro cutaways, character reactions). Do NOT mechanically map 1 script line to 1 clip!
        - **Contiguous Audio Timeline Tiling:** Sliced clips must tile the audio timeline contiguously from $00:00$ to $T_{\text{end}}$ ($\sum \text{Clip Durations} == \text{Total Master Audio Duration}$ within $\pm 1\text{s}$). Every clip starts exactly when the previous clip ends with zero gaps.
        - **Flow Native Durations:** Each clip uses a valid Flow duration (`4s`, `6s`, `8s`, or `10s`) matching its timeline interval ($|\text{Clip Duration} - (\text{End} - \text{Start})| \le 1.0\text{s}$).
        - **Scenery-Voice Context Matching:** Visual prompts depict scenery and actions matching what the voice describes at that exact timestamp window.
        - **Dialogue Cleansing in Separate Audio:** Set `Dialogue: None;` in all `video_prompt.txt` files to prevent Veo from generating speech over the master track.
        - Create `clips/clip_xxx/[image_prompt.txt, video_prompt.txt]` (with `Conditioned On:` / `Input Seed:` lines), `master_images_prompt.txt`, and `master_videos_prompt.txt`. Set `"clips_generated": true`.
   - **Case B — Embedded Audio OR Separate Audio + All Together (`embedded` or `separate_all_at_once`):**
     - Create all creator files at once:
       - `base_image_prompt.txt`
       - `audio_script.md` (if `separate_all_at_once`: formatted in default Multi-Speaker Segmented structure with 100–160 words sweet spot per segment and isolated secondary character lines; never divided by video clips)
       - If `modular_studio`: `subjects/<id>/[hero_prompt.txt, profile_prompt.txt]` and `visuals/environments/<id>/prompt.txt`
       - `clips/clip_xxx/[image_prompt.txt, video_prompt.txt]` (plain-text with `Conditioned On:` / `Input Seed:` lines)
       - `master_images_prompt.txt` & `master_videos_prompt.txt` (creator self-serve references only)
       - `scratchbook.md` & `motion_graphics.md` (if applicable)
     - Set `"produce_complete": true` and `"clips_generated": true`.
4. **Audit Against Linters (L-01 to L-19):**
   - Verify 75–150 words per prompt, zero equipment nouns, soft punctuation, and safety checks; record in `./openproducer/manifest.json`.
5. **Output Structured Status Card:**
   - Display the standardized `### 🎬 OpenProducer Status: PRODUCE` card offering `/opp-guide`.
