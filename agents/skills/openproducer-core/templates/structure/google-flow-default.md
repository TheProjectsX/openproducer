---
template_id: google-flow-default
name: Google Flow Default (3-Block Image & Video Chain)
group: structure
target_engine: google-flow
clip_image_mode: required
reference_style: image_pointers
allow_negative_block: false
prompt_blocks:
  - "[CONFIGURATION SETTINGS]"
  - "[INPUT SEEDS & INGREDIENTS]"
  - "[IMAGE PROMPT]"
  - "[VIDEO PROMPT]"
master_compilation: separate_masters
---

# 🏗️ Structure: Google Flow Default
> Standard OpenProducer 3-block Flow structure with per-clip starting images, `[IMAGE N]` ingredient pointers, and scene image chaining.

## 📁 Production File Layout
- `production/base_image_prompt.txt`
- `production/audio_script.txt` (when using separate audio)
- `production/subjects/<subject_id>/[hero_prompt.txt, profile_prompt.txt]` (if `modular_studio`)
- `production/visuals/environments/<environment_id>/[prompt.txt, ground_rules.md]` (if `modular_studio`)
- `production/clips/clip_xxx/[image_prompt.txt, video_prompt.txt]`
- `production/master_images_prompt.txt` & `production/master_videos_prompt.txt`
- `production/scratchbook.md`

## 🔗 Reference & Pointer Rules
- Map each supplied asset to `[IMAGE 1]`, `[IMAGE 2]`, etc. inside `[INPUT SEEDS & INGREDIENTS]`.
- In `video_prompt.txt`, declare `Start Source: [IMAGE N]` or `Start Source: none` and direct every supplied pointer in the opening lines of `[VIDEO PROMPT]`.
- Chain `clip_xxx/image_prompt.txt` within the same scene via `Conditioned On:` pointing to the previous approved clip image.

## 🧱 Prompt Block Format
- Plain-text files end immediately after `[IMAGE PROMPT]` or `[VIDEO PROMPT]` with no `[NEGATIVE PROMPT]` block.
- Essential exclusions are phrased concisely in natural language inside the creative body.

## 🔄 Reconstruction Mapping (From Other Structures)
- If converting from a `clip_image_mode: none` structure, derive `clip_xxx/image_prompt.txt` from the first visible moment in `production/scratchbook.md` and the opening framing of `video_prompt.txt`.
- Restore `[INPUT SEEDS & INGREDIENTS]`, `[IMAGE N]` pointers, `Start Source:`, and scene-chain `Conditioned On:` lines.
