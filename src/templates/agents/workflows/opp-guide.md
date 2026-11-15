---
description: Step-by-step interactive guide adapting to your audio mode, base image style lock loop, modular assets, clip images, and clip videos inside ./production/
---

# /opp-guide (or /openproducer-guide)

Execute the OpenProducer Guide workflow to lead the creator step-by-step through producing the project:

1. **Activate Skill:** Invoke the `openproducer-guide` skill.
2. **Strict Rules & Direct Tool Links:**
   - **Always Provide Direct Clickable Tool URLs:** So the creator never has to search for tools, always include the direct URLs for the current step:
     * **Voice / TTS Generation:** [Google AI Studio Speech Playground](https://aistudio.google.com/generate-speech)
     * **Transcript / SRT Timestamp Generators:** [TurboScribe](https://turboscribe.ai/) or [AudioToSRT](https://audiotosrt.com/)
     * **Base Image, Clip Images & Video Generation:** [Google Flow](https://flow.google.com)
   - **Use Interactive `ask_question` Tool:** Whenever asking the creator to confirm satisfaction (e.g., Base Image loop, Modular asset approval, or moving to the next clip vs. tweaking/diagnosing a glitch), use the interactive `ask_question` tool if available so the creator can respond with one click.
   - **Never use `master_images_prompt.txt` or `master_videos_prompt.txt`** during `/opp-guide` (those are strictly for creator self-serve reference). Always guide using the individual `.txt` prompt files inside `production/` (`production/base_image_prompt.txt`, `production/subjects/`, `production/visuals/environments/`, `production/clips/clip_xxx/`).
   - **Never generate any images on your own** unless the creator explicitly asks you to generate an image.
3. **Follow the Audio-Aware Guided Sequence (`./openproducer/config.json`):**
   - **Step A — Audio & Transcripts (If Separate Audio):**
     - **If `separate_script_first`:** Direct the creator to `production/audio_script.txt` with links to [Google AI Studio Speech Playground](https://aistudio.google.com/generate-speech) (pre-aligned to the 2-speaker alternating turn layout for 1-click master generation, or balanced Single-Speaker mode) and [TurboScribe](https://turboscribe.ai/) / [AudioToSRT](https://audiotosrt.com/) to convert the single output file into an unbroken SRT transcript. Once they share the transcript/timestamps, generate `production/clips/clip_xxx/[image_prompt.txt, video_prompt.txt]` using context-driven cinematography to contiguously tile the audio timeline (matching scenery to voice context with zero gaps, and `Dialogue: None;` in video prompts).
     - **If `separate_all_at_once`:** Guide them to create the audio from `production/audio_script.txt` first without asking for a transcript (if they later ask to sync clips with a transcript at any point, sync `clips/` immediately).
   - **Step B — Base Image Style Lock Loop (`production/base_image_prompt.txt`):**
     - Present `production/base_image_prompt.txt` with the link to [Google Flow](https://flow.google.com) $\rightarrow$ loop and refine until satisfied (saving changes to disk).
     - *(If `modular_studio`: also guide through `production/subjects/<id>/` and `production/visuals/environments/<id>/` connected to the Base Image).*
   - **Step C — Clip Creation Mode Choice (Ask via `ask_question`):**
     - Ask the creator whether they want **Step-by-Step Support** (creating the clips one by one together) OR **Only Instructions** (a complete self-serve guide).
     - **If "Only Instructions" Selected:** Explain the scene image chain: create the first clip image from approved base/subject/environment images, then create each later image in that scene from the prior **approved clip image** already in Flow, with stable anchors where supported. Reset at a new location/time scene or after drift. Select each approved clip image as its own video's start image. Prompt-file paths identify Flow project images; they are not upload files. No video download or last-frame extraction is required.
     - **If "Step-by-Step Support" Selected:** Use `ask_question` to let the creator choose between:
       1. **All Clip Images First, Then Videos One-by-One:** Approve clip images sequentially so each same-scene image can cue the prior approved image; reset at scene changes or drift. Then generate videos from their respective approved images.
       2. **Per-Clip Image then Video One-by-One:** Generate and approve the clip image, generate its video, and use that approved **image** to create the next same-scene image. Do not assume it equals the video's last frame.
4. **Output Structured Status Card:**
   - Display the standardized `### 🎬 OpenProducer Status: GUIDE` card after each guided step.
