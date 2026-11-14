# Discussion 88: Universal Prompt Architecture — Unified Configuration Settings & Input Seeds Across All Modalities

**Date:** 2026-11-14  
**Context:** OpenProducer Generation Pipeline & Prompt Standard Optimization  
**Participants:** Creator & OpenProducer Agent  

---

## 1. Context & Motivation

During video prompt inspection, the creator highlighted the elegant, readable structure developed for Tier 3 video motion prompts:

```text
[CONFIGURATION SETTINGS]
Duration: 4s
Aspect Ratio: 9:16
Resolution: 1080p
Transition / Chop: VIOLENT REACTION JOLT

[INPUT SEEDS & INGREDIENTS]
1. First Frame (Start Seed): production/clips/clip_08/image_prompt.txt
2. Persistent Subject DNA:   [IMAGE 1] -> production/subjects/guard/profile_prompt.txt
3. Persistent Scene DNA:     [IMAGE 2] -> production/visuals/environments/facility_corridor/prompt.txt
```

The creator raised a fundamental architectural insight:
> *"Why not use same format for image_prompt also? Yes! Let's use that format for all image and video prompts where applicable. It's cleaner and consistent."*

Historically, `image_prompt.txt` maintained an earlier single-line tag layout (`[IMAGE CONFIGURATION]` with inline `Reference Images: [...]`), whereas `video_prompt.txt` had evolved a decoupled, multi-ingredient block during Phase 6 dual-conditioning. Extending this schema across all image and video prompts eliminates legacy fragmentation and creates 100% structural uniformity across the entire OpenProducer ecosystem.

---

## 2. The Universal 4-Block Prompt Schema

From this point forward, **all generation prompt files** (`.txt`) across both image and video modalities adhere to the exact same 4-block architecture:

```text
[CONFIGURATION SETTINGS]
<Canvas parameters, duration, resolution, aspect ratio, safe zones, and camera transitions>

[INPUT SEEDS & INGREDIENTS]
<Numbered, slot-mapped visual dependencies [IMAGE 1], [IMAGE 2], [IMAGE 3], or Start Frame seeds with explicit file paths>

[IMAGE PROMPT] / [VIDEO PROMPT]
<Pure creative cinematographic or photographic prompt text front-loaded per L-02, zero equipment nouns, zero config tokens>

[NEGATIVE PROMPT]
<Model-specific negative tokens, banned visual artifacts, hardware exclusions, and anti-text guards>
```

---

## 3. Modality Anatomy Breakdown

### 3.1 Tier 1 Master Base Prompt (`base_image_prompt.txt`)
```text
[TIER 1: MASTER BASE REFERENCE PROMPT — <PROJECT NAME>]
[CONFIGURATION SETTINGS]
Target Engine: Google Flow / Imagen 4
Aspect Ratio: 16:9
Resolution: 1080p

[INPUT SEEDS & INGREDIENTS]
1. Creator Face / Photo: None (or input_assets/creator_photo.jpg if anchoring real human likeness)

[IMAGE PROMPT]
<Cinematic framing, subject/scene anchor, lighting vectors, and master visual style anchor string.>

[NEGATIVE PROMPT]
photorealistic/cartoon exclusions, blurry, altered style, distorted proportions, cluttered background, harsh flash, watermarks, text, subtitles.
```

### 3.2 Tier 1A Subject Hero & 1B Profile Sheets (`subjects/<id>/`)
```text
[TIER 1A: SUBJECT HERO PROMPT — <SUBJECT NAME>]
[CONFIGURATION SETTINGS]
Target Tool: Google Flow / Imagen 4
Aspect Ratio: 16:9
Resolution: 1080p

[INPUT SEEDS & INGREDIENTS]
1. Master Visual DNA: [IMAGE 1] -> production/base_image_prompt.txt

[IMAGE PROMPT]
<Step 1 Genesis Hero Shot prompt locking facial landmarks, wardrobe materiality, and style anchor.>

[NEGATIVE PROMPT]
action figure, plastic doll, ball joints, blurry, text, watermarks.
```

```text
[TIER 1B: SUBJECT 4-VIEW PROFILE PROMPT — <SUBJECT NAME>]
[CONFIGURATION SETTINGS]
Target Tool: Google Flow / Imagen 4
Aspect Ratio: 16:9
Resolution: 1080p

[INPUT SEEDS & INGREDIENTS]
1. Subject Hero Anchor: [IMAGE 1] -> production/subjects/<subject_id>/hero_prompt.txt (or hero.png)

[IMAGE PROMPT]
<Step 2 4-panel character model sheet (Front, Left Profile, Back, Close-up Face) on solid neutral light-gray studio background (#E5E5E5).>

[NEGATIVE PROMPT]
changing clothes, facial drift, props in hands, environment background, text, watermarks.
```

### 3.3 Tier 1C Environment Stage Plate (`visuals/environments/<id>/prompt.txt`)
```text
[TIER 1C: ENVIRONMENT STAGE PROMPT — <ENVIRONMENT NAME>]
[CONFIGURATION SETTINGS]
Target Tool: Google Flow / Imagen 4
Aspect Ratio: 16:9
Resolution: 1080p

[INPUT SEEDS & INGREDIENTS]
1. Master Visual DNA: [IMAGE 1] -> production/base_image_prompt.txt

[IMAGE PROMPT]
<Empty 3-plane stage environment with motivated lighting vectors and zero characters/people present.>

[NEGATIVE PROMPT]
people, characters, crowds, silhouettes, camera equipment, tripod, text, watermarks.
```

### 3.4 Tier 2 Clip Starting Keyframe Plate (`clips/clip_XX/image_prompt.txt`)
```text
[TIER 2: CLIP KEYFRAME STARTING PLATE — CLIP <XX>]
[CONFIGURATION SETTINGS]
Target Tool: Google Flow / Imagen 4
Aspect Ratio: [16:9 | 9:16]
Resolution: 1080p
Audio Timestamp: [00:00:00 - 00:00:06 (6s)]
Narration / Dialogue Cue: ["Exact transcript or spoken dialogue line for this moment..."]

[INPUT SEEDS & INGREDIENTS]
1. Persistent Subject DNA: [IMAGE 1] -> production/subjects/<subject_id>/profile_prompt.txt (or turnaround_sheet.png)
2. Persistent Scene DNA:   [IMAGE 2] -> production/visuals/environments/<env_id>/prompt.txt (or empty_stage.png)
3. (Optional Hero Prop):   [IMAGE 3] -> production/subjects/<prop_id>/hero_prompt.txt

[IMAGE PROMPT]
Pre-composited starting keyframe plate for video generation. Medium eye-level framing of the subject from [IMAGE 1] staged inside the environment from [IMAGE 2]...

[NEGATIVE PROMPT]
studio gray background bleed, split screen, multiple panels, camera equipment, blurry lines, text, subtitles, watermarks.
```

### 3.5 Tier 3 Video Motion & Audio Prompt (`clips/clip_XX/video_prompt.txt`)
```text
[TIER 3: VEO 3.1 CINEMATOGRAPHY PROMPT — CLIP <XX>]
[CONFIGURATION SETTINGS]
Target Engine: Google Flow / Veo 3.1
Duration: [4s | 6s | 8s | 10s]
Aspect Ratio: [16:9 | 9:16]
Resolution: 1080p
Transition / Chop: [MOTIVATED CUT | CONTINUOUS ACTION EXTENSION | VIOLENT JOLT | ESTABLISHING MACRO]
Audio Timestamp: [00:00:00 - 00:00:06]
Narration / Dialogue Cue: ["Exact transcript or spoken dialogue line for this moment..."]

[INPUT SEEDS & INGREDIENTS]
1. First Frame (Start Seed): production/clips/clip_<XX>/image_prompt.txt (or LAST_FRAME of Clip N-1)
2. Persistent Subject DNA:   [IMAGE 1] -> production/subjects/<subject_id>/profile_prompt.txt
3. Persistent Scene DNA:     [IMAGE 2] -> production/visuals/environments/<env_id>/prompt.txt
4. (Optional Hero Prop):     [IMAGE 3] -> production/subjects/<prop_id>/hero_prompt.txt

[VIDEO PROMPT]
Starting directly from the initial image, [Viewport framing & primary subject]. [Biomechanical action & 3-plane lighting]. [Master Style Anchor & single continuous camera verb]. Conditioned on [IMAGE 1] for persistent subject identity and [IMAGE 2] for scene topology. Audio: SFX: [Foley]; Ambience: [Room tone]; Dialogue: [Spoken attribution | None]; Music: [Directive | None].

[NEGATIVE PROMPT]
camera tripod, dolly track, morphing, jitter, subtitles, burned-in text...
```

### 3.6 On-Demand High-CTR Packaging & Thumbnails (`thumbnails/thumb_XX_prompt.txt`)
```text
[THUMBNAIL 01: HIGH-CTR KEYFRAME PROMPT — <CONCEPT NAME>]
[CONFIGURATION SETTINGS]
Target Tool: Google Flow / Imagen 4 / Flux 1.1 Pro / Midjourney
Aspect Ratio: 16:9 (or 9:16 for Shorts/Reels Cover)
Resolution: 1080p
Composition: Left-Third Subject Framing, 40% Clean Negative Space Right
Safe Zone: Bottom-right corner kept completely clear of text/focal points (YouTube duration badge)
AI Typography: "<PUNCHY TEXT>" (<Font Style>, <Color Contrast>, <Drop Shadow / Placement>)

[INPUT SEEDS & INGREDIENTS]
1. Persistent Subject DNA: [IMAGE 1] -> production/subjects/<subject_id>/profile_prompt.txt
2. Master Visual DNA:      [IMAGE 2] -> production/base_image_prompt.txt (or visual/technical_anchor.md)

[IMAGE PROMPT]
<Cinematic medium close-up of Subject from [IMAGE 1] displaying intense emotional micro-expression. Left-third framing. Right third clean negative space featuring bold stylized typography...>

[NEGATIVE PROMPT]
blurry text, misspelled typography, illegible letters, deformed text, messy font, cluttered background, action figure, doll, deformed hands, extra fingers, cartoon, 3D CGI plastic, waxy skin, camera rig, tripod, centered composition blocking negative space, bottom-right corner clutter.
```

---

## 4. Key Architectural & Producer UX Benefits

1. **Direct Google Flow / Imagen Drag-and-Drop Mapping:**
   In Google Flow and Imagen 4, the user interface provides numbered image input slots (`[IMAGE 1]`, `[IMAGE 2]`, `[IMAGE 3]`). The `[INPUT SEEDS & INGREDIENTS]` block acts as a literal assembly checklist: creators immediately know which image file attaches to which slot without reading long paragraphs of instructions.
2. **Deterministic Pre-Flight Linter Parsing (L-06):**
   Automated linters can cleanly parse `[CONFIGURATION SETTINGS]` and `[INPUT SEEDS & INGREDIENTS]` using unified regex rules across all `.txt` prompt files, ensuring zero broken file references or missing upstream ingredients.
3. **Total Cognitive Uniformity:**
   Creators and AI agents navigate one singular format whether working on a character turnaround, an empty room plate, a keyframe plate, a video clip, or a thumbnail.
