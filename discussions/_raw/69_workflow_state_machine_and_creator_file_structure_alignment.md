# Discussion 69 — OpenProducer State Machine Overhaul & Creator File Structure Alignment

**Date:** 2026-10-30  
**Status:** ✅ Finalized & Implemented  

---

## 1. Root Cause Analysis of Previous Workflow Breakdown

Following the session audit in Discussion 68, we traced the exact file-to-file execution chain across `agents/workflows/`, `agents/skills/`, `07_scaffolding_and_workspace_spec.md`, and `production_template/AGENTS.md` and identified why the system was not following the creator's intended workflow:
1. **`explore` was writing files prematurely:** Instead of acting as a 100% read-only planning room in session memory, `explore` and `AGENTS.md` were writing `config.json`, `scratchbook.md`, and `base_image_prompt` during intake.
2. **`propose` was polluting the creator root:** `propose` was creating `scratchbook.md` at the project root instead of saving strictly inside the internal brain (`./openproducer/`).
3. **`sync` was wired only for post-production linting:** `sync` lacked the `propose_complete` pre-condition gate and could not sync `./openproducer/` prior to `produce`.
4. **`produce` lacked the auto-propose guard and Separate Audio Script-First fork:** `produce` did not auto-run `propose` when invoked directly from `explore`, and lacked the 2-pass `separate_script_first` flow.
5. **Modular Studio hid `subjects/` and `environments/` inside `openproducer/`:** In multi-character and multi-location productions, the creator must generate the character references and environment plates as base images in Google Flow—meaning `subjects/` and `visuals/environments/` belong in the Creator File Structure at project root, not hidden inside the brain.

---

## 2. Locked Creator File Structure (Clean `.txt` Prompts, `.md` Docs & Explicit Connection Notes)

1. **Zero Unauthorized Image Generation:** OpenProducer NEVER generates any image on its own (not even as an example) unless explicitly asked by the creator.
2. **Clean Plain-Text `.txt` Prompts & `.md` Documentation Files:**
   - All prompt files use clean plain-text `.txt` modeled on `the_314am_doppelganger/clips/clip_01/image_prompt.txt` (`[TIER ...]`, `Conditioned On:`, `[IMAGE PROMPT]`, `[NEGATIVE PROMPT]` with zero markdown `#` headers or emojis):
     - `base_image_prompt.txt`: Present in **both** Lean and Modular Studio versions to lock the foundational visual style before any other asset is generated.
     - `subjects/<subject_id_or_name>/[hero_prompt.txt, profile_prompt.txt]`: Creator-root character base prompts (Modular Studio).
     - `visuals/environments/<environment_id_or_name>/prompt.txt`: Creator-root environment base prompts (Modular Studio).
     - `clips/clip_xxx/[image_prompt.txt, video_prompt.txt]`: Shot-by-shot keyframe and video prompts.
     - `master_images_prompt.txt` & `master_videos_prompt.txt`: Strictly for creator self-serve reference; **never used by `/opp-guide`**.
   - Narrative/documentation files remain `.md`:
     - `audio_script.md`: Dedicated continuous voiceover/narration/dialogue script (never divided into clip segments) formatted for Google AI Studio TTS with System Instructions and the **90/10 Context-Driven Anti-Dead-Air Law** (90%+ sentences flow continuously without tags; `<short pause>` used max 1–3 times per ~100 words only before major twists/climaxes; zero standalone `.` lines; zero square brackets `[...]`).
     - `scratchbook.md` & `motion_graphics.md`.
3. **Explicit `Conditioned On:` Header:** Every `.txt` prompt file explicitly documents in its plain-text header which generated image(s) (`[IMAGE 1]`, `[IMAGE 2]`, `base_image`, `hero_prompt`, `profile_prompt`, `environment`, or `LAST_FRAME`) it depends on and feeds into.

---

## 3. Locked 6-Mode Operational State Machine

1. **`explore` (`/opp-explore` or `/openproducer-explore`):**
   - Default starting mode. **100% Read-Only in session memory** (writes zero files to `./openproducer/` or project root; if session is lost, discussion is gone).
   - Checks `./openproducer/config.json` first and skips any questions already set by `/opp-template`.
   - Ensures plot is given or established first (Turn 0) before asking settings questions via the interactive `ask_question` tool (Orientation, Format/Style, Audio Settings $\rightarrow$ if Separate Audio, asks Script First vs. Everything Together $\rightarrow$ explores/structures story in session memory).
   - Appends a mandatory read-only notice at the end of every message reminding the creator to run `/opp-propose` to save into `./openproducer/`.
2. **`propose` (`/opp-propose` or `/openproducer-propose`):**
   - Saves all settings, structured story, character/environment plans, drafted script, shot pacing breakdown, AND the **Raw Plot / Brainstormed Plot Points Archive** (in Section 2 of `blueprint.md` as a historical record) strictly into `./openproducer/`.
   - Creates **zero creator files** at project root. Enables 0-context session handoff.
3. **`sync` (`/opp-sync` or `/openproducer-sync`):**
   - Runs **IF AND ONLY IF** `propose_complete == true` (otherwise prompts user to run `/opp-propose` first).
   - Pre-Produce (`produce_complete == false`): syncs `./openproducer/` only.
   - Post-Produce (`produce_complete == true`): syncs both `./openproducer/` and all generated creator files on disk.
4. **`produce` (`/opp-produce` or `/openproducer-produce`):**
   - If still in `explore` (`propose_complete == false`), automatically runs `propose` first, then executes `produce` to generate the creator files from `./openproducer/`.
5. **`guide` (`/opp-guide` or `/openproducer-guide`):**
   - Step-by-step co-pilot providing direct URLs ([Google AI Studio Speech Playground](https://aistudio.google.com/generate-speech), [TurboScribe](https://turboscribe.ai/), [AudioToSRT](https://audiotosrt.com/), [Google Flow](https://flow.google.com)) and adapting to Separate Audio (Script-First vs. All-Together) or Embedded Audio. Always loops on `base_image_prompt.txt` until creator satisfaction, guides through Modular Assets (if applicable), and asks via `ask_question` whether the creator wants **Only Instructions** or **Step-by-Step Support** (offering either **All Clip Images First then Videos One-by-One** or **Per-Clip Image $\rightarrow$ Video One-by-One**), with anytime on-demand transcript syncing. Never uses `master_*_prompt.txt`.
6. **`template` (`/opp-template` or `/openproducer-template`):**
   - On load: auto-saves settings into `./openproducer/` without running `propose` or `produce`; skips pre-set questions in `explore`.
   - On save: saves settings and configurations without the plot.

---

## 4. Session Lock & Next Session Priority Task

- **Session State:** 🔒 **LOCKED** (2026-10-30).
- **Next Session Priority Agenda:** **Clips Duration Not Meeting Audio Duration.** Investigate and solve the temporal mismatch where generated video clip durations (`clips/clip_xxx/video_prompt.txt` quantized 4s/6s/8s durations) fail to cover or match the actual total duration and segment timestamps of the generated audio (`audio_script.md` / SRT transcript).


