# Discussion 76: Plain-Text Production Prompts & Bracket-Tagged Audio Script (.txt)

## Context & Motivation
Previously, prompt files (`image_prompt.txt`, `video_prompt.txt`, `base_image_prompt.txt`, `master_images_prompt.txt`, `master_videos_prompt.txt`) were created as `.txt` files using bracket headers (`[CONFIGURATION SETTINGS]`, `[KEYFRAME IMAGE PROMPT]`, `[VIDEO PROMPT]`, `[NEGATIVE PROMPT]`). However, the audio script was still being generated as a Markdown file (`audio_script.md`), using Markdown `#` titles, tables, bold styling, and code backtick fences.

The creator established:
1. **Universal Plain-Text Prompt & Script Standard:** All production script and prompt files in `production/` must be plain-text `.txt` (`audio_script.txt`, `base_image_prompt.txt`, `clips/clip_xxx/image_prompt.txt`, `clips/clip_xxx/video_prompt.txt`, `master_images_prompt.txt`, `master_videos_prompt.txt`).
2. **Custom Bracketed Meta Tags (`[...]`):** Instead of Markdown titles (`#`, `##`, `###`), tables (`|---|`), bold tokens (`**`), or backticks, `audio_script.txt` uses custom bracketed meta tags (`[...]`) matching the syntax of image and video prompts.

---

## Architectural & Formatting Standards

### 1. Plain-Text Meta Tag Hierarchy for `audio_script.txt`
`production/audio_script.txt` is organized into clean, unadorned sections bounded by bracketed tags:
- `[AUDIO CONFIGURATION]`: Platform link, delivery mode, duration, transcription tools.
- `[VOICE CAST & PRESETS]`: Roles, UI speaker positions, voice presets, vocal personas.
- `[SYSTEM INSTRUCTIONS]`: Clean instructions to copy directly into Google AI Studio Speech Playground style/instructions field.
- `[AUDIO SCRIPT]`: The master script.
  - In single-narrator projects: continuous text with paragraph cadences and context-driven `<short pause>` / `<whisper>...</whisper>` tags.
  - In multi-speaker alternating-turn projects: turns marked with `[Turn 01 - Narrator (Fenrir) / Speaker 1]`, `[Turn 02 - Radio Entity (Orus) / Speaker 2]`, etc.
- `[DOWNSTREAM WORKFLOW]`: Step-by-step instructions for generating audio in Google AI Studio, transcribing to `production/audio.srt`, and triggering `/opp-produce`.

### 2. Syntax Separation: Bracket Tags vs. Spoken Dialogue Tags
- **Structural Tags (`[...]`):** Enclose administrative headings, voice settings, and turn indicators. These are strictly outside spoken narration lines.
- **Vocal Performance Tags (`<...>`):** Within spoken dialogue, Gemini TTS interprets angle brackets for vocal control (`<short pause>`, `<whisper>...</whisper>`). Square brackets `[...]` are never placed inside spoken narration sentences, as Gemini TTS would read them aloud as literal words.

---

## Workspace & Ecosystem Synchronizations
1. **Authoritative Specifications:**
   - [`production_framework/specs/07_scaffolding_and_workspace_spec.md`](../../production_framework/specs/07_scaffolding_and_workspace_spec.md): Section 4.2 updated to `audio_script.txt` with Single-Speaker and Multi-Speaker bracket templates.
   - Core spec and template spec updated in lockstep.
2. **Simulations Migrated:**
   - [`production_framework/simulations/the_lighthouse_v2/production/audio_script.txt`](../../production_framework/simulations/the_lighthouse_v2/production/audio_script.txt): Converted from `.md` to `.txt` with `[AUDIO CONFIGURATION]`, `[VOICE CAST & PRESETS]`, `[SYSTEM INSTRUCTIONS]`, `[AUDIO SCRIPT]` turns, and `[DOWNSTREAM WORKFLOW]`.
   - [`production_framework/simulations/the_lighthouse/audio_script.txt`](../../production_framework/simulations/the_lighthouse/audio_script.txt): Converted from `.md` to `.txt`.
3. **Skills & Workflows:**
   - Updated `openproducer-explore`, `openproducer-propose`, `openproducer-produce`, `openproducer-guide`, and `openproducer-sync` SKILL and workflow definitions.
4. **Code & Bundling:**
   - Updated `src/core/constants.ts` descriptions. Rebuilt TypeScript project and re-bundled templates via `cmd /c npm run build`.
   - **CLI Remote Source Masking:** Concealed upstream repository identities and URLs across the CLI (`src/cli.ts`, `src/commands/init.ts`, `src/core/fetcher.ts`). Replaced GitHub-specific log lines and cache paths with generic registry identifiers (`Connecting to remote registry...`, `Synchronized live with upstream registry`, `Template Source: Live Upstream Registry (Synchronized)`). Obfuscated the default remote endpoint to prevent upstream leakage in console logs and command outputs.

