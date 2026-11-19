---
template_id: name-ref-video-only
name: Name-Referenced Video Only (No Clip Images, No [IMAGE N])
group: structure
target_engine: custom
clip_image_mode: none
reference_style: name_tags
allow_negative_block: false
prompt_blocks:
  - "[CONFIGURATION SETTINGS]"
  - "[REFERENCES]"
  - "[VIDEO PROMPT]"
master_compilation: separate_masters
---

# 🏗️ Structure: Name-Referenced Video Only
> Generates video prompts directly per clip without per-clip `image_prompt.txt` files, referencing subjects and environments by `@Name` instead of `[IMAGE N]` pointers.

## 📁 Production File Layout
- **Keep:** `production/base_image_prompt.txt`, `production/audio_script.txt` (if separate audio), `production/subjects/`, `production/visuals/environments/`, `production/scratchbook.md`.
- **Omit:** `production/clips/clip_xxx/image_prompt.txt` (do NOT create per-clip image prompt files).
- **Clips:** `production/clips/clip_xxx/video_prompt.txt` only.
- **Masters:** `production/master_videos_prompt.txt` (and `master_images_prompt.txt` only if `subjects/` or `environments/` image prompts exist).

## 🔗 Reference & Pointer Rules
- Do NOT use `[IMAGE 1]`, `[IMAGE 2]`, `[INPUT SEEDS & INGREDIENTS]`, or `Start Source:`.
- Reference subjects and environments directly by `@<AssetName>` (e.g., `@MayaLin`, `@DarkCorridor`) in `[REFERENCES]` and inside `[VIDEO PROMPT]`.
- Describe visual continuity in text rather than `Conditioned On:` clip-image chains.

## 🧱 Prompt Block Format
```text
[CONFIGURATION SETTINGS]
Duration: <4s | 6s | 8s | 10s>
Aspect Ratio: <16:9 | 9:16>

[REFERENCES]
Subjects: @<SubjectName>
Environment: @<EnvironmentName>

[VIDEO PROMPT]
<Single self-contained opening framing + motion + camera verb + lighting + style anchor + Audio:>
```

## 🔄 Reconstruction Mapping (From Google Flow Default)
1. For each `production/clips/clip_xxx/`:
   - Read `image_prompt.txt` (if present) and extract the opening framing, pose, and subject-to-room scale.
   - Read `video_prompt.txt`, resolve every `[IMAGE N] -> path` in `[INPUT SEEDS & INGREDIENTS]` to its `@SubjectName` or `@EnvironmentName` (or remove clip-image self-references once merged).
   - Merge the opening framing into `[VIDEO PROMPT]` so the video prompt is self-contained without needing a clip `image_prompt.txt`.
   - Replace `[INPUT SEEDS & INGREDIENTS]` and `Start Source:` with `[REFERENCES]`.
   - Delete `production/clips/clip_xxx/image_prompt.txt`.
2. Rebuild `production/master_videos_prompt.txt` from the updated `video_prompt.txt` files.
3. Keep `production/scratchbook.md` intact and record `Structure ID: structure/name-ref-video-only` at the top.
