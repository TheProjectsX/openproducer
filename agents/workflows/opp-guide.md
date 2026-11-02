---
description: Step-by-step interactive guide adapting to your audio mode, base image style lock loop, modular assets, clip images, and clip videos inside ./production/
---

# /opp-guide (or /openproducer-guide)

Execute the OpenProducer Guide workflow to lead the creator step-by-step through producing the project:

1. **Activate Skill:** Invoke the `openproducer-guide` skill.
2. **Strict Rules & Direct Tool Links:**
   - **Always Provide Direct Clickable Tool URLs:** So the creator never has to search for tools, always include the direct URLs for the current step:
     * **Voice / TTS Generation:** [Google AI Studio Speech Playground](https://aistudio.google.com/generate-speech)
     * **Transcript / SRT Timestamp Generators:** [TurboScribe](https://turboscribe.ai/dashboard) or [AudioToSRT](https://audiotosrt.com/)
     * **Base Image, Clip Images & Video Generation:** [Google Flow](https://labs.google/fx/tools/flow)
   - **Use Interactive `ask_question` Tool:** Whenever asking the creator to confirm satisfaction (e.g., Base Image loop, Modular asset approval, or moving to the next clip vs. tweaking/diagnosing a glitch), use the interactive `ask_question` tool if available so the creator can respond with one click.
   - **Never use `master_images_prompt.txt` or `master_videos_prompt.txt`** during `/opp-guide` (those are strictly for creator self-serve reference). Always guide using the individual `.txt` prompt files inside `production/` (`production/base_image_prompt.txt`, `production/subjects/`, `production/visuals/environments/`, `production/clips/clip_xxx/`).
   - **Never generate any images on your own** unless the creator explicitly asks you to generate an image.
3. **Follow the Audio-Aware Guided Sequence (`./openproducer/config.json`):**
   - **Step A — Audio & Transcripts (If Separate Audio):**
     - **If `separate_script_first`:** Direct the creator to `production/audio_script.md` with links to [Google AI Studio Speech Playground](https://aistudio.google.com/generate-speech) (pre-aligned to the 2-speaker alternating turn layout for 1-click master generation, or balanced Single-Speaker mode) and [TurboScribe](https://turboscribe.ai/dashboard) / [AudioToSRT](https://audiotosrt.com/) to convert the single output file into an unbroken SRT transcript. Once they share the transcript/timestamps, generate `production/clips/clip_xxx/[image_prompt.txt, video_prompt.txt]` using context-driven cinematography to contiguously tile the audio timeline (matching scenery to voice context with zero gaps, and `Dialogue: None;` in video prompts).
     - **If `separate_all_at_once`:** Guide them to create the audio from `production/audio_script.md` first without asking for a transcript (if they later ask to sync clips with a transcript at any point, sync `clips/` immediately).
   - **Step B — Base Image Style Lock Loop (`production/base_image_prompt.txt`):**
     - Present `production/base_image_prompt.txt` with the link to [Google Flow](https://labs.google/fx/tools/flow) $\rightarrow$ loop and refine until satisfied (saving changes to disk).
     - *(If `modular_studio`: also guide through `production/subjects/<id>/` and `production/visuals/environments/<id>/` connected to the Base Image).*
   - **Step C — Clip Creation Mode Choice (Ask via `ask_question`):**
     - Ask the creator whether they want **Step-by-Step Support** (creating the clips one by one together) OR **Only Instructions** (a complete self-serve guide).
     - **If "Only Instructions" Selected:** Provide clear instructions: open [Google Flow](https://labs.google/fx/tools/flow) $\rightarrow$ create Base Image (if not done) $\rightarrow$ attach Base Image (and any Subject/Environment images) as reference ingredients (`[IMAGE 1]`, `[IMAGE 2]`) to generate the Clip Images (`production/clips/clip_xxx/image_prompt.txt`) $\rightarrow$ attach each generated Clip Image as the starting frame with its Clip Video prompt (`production/clips/clip_xxx/video_prompt.txt`) to generate the videos.
     - **If "Step-by-Step Support" Selected:** Use `ask_question` to let the creator choose between:
       1. **All Clip Images First, Then Videos One-by-One:** Walk through generating all clip images (`clip_01` $\rightarrow$ `clip_XX` `image_prompt.txt`) first, and then generate the clip videos (`clip_01` $\rightarrow$ `clip_XX` `video_prompt.txt`) one by one.
       2. **Per-Clip Image then Video One-by-One:** For each clip one by one, generate `clip_XX/image_prompt.txt` first and immediately generate `clip_XX/video_prompt.txt`, then move to the next clip.
4. **Output Structured Status Card:**
   - Display the standardized `### 🎬 OpenProducer Status: GUIDE` card after each guided step.
