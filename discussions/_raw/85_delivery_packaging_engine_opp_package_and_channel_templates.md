# Discussion 85: Delivery Packaging Engine (`opp-package`), Modular Delivery Kits & Channel Templates

**Date:** 2026-11-12  
**Context:** Scoping Phase 10 / v1.2.x Delivery Packaging Suite. Archiving dynamic `write`/`rewrite` pre-production for now, and elevating the delivery packaging engine (`opp-package`) into a first-class, template-driven workflow.

---

## 1. Vision & Core Philosophy

In real-world video creation, production does not conclude when the final clip renders—it concludes when the asset is **packaged for distribution**.

A high-production-value video fails if its packaging (Thumbnail, Title, Description, Metadata) is generic, poorly formatted, or visually disconnected from the film itself.

### The OpenProducer Superpower: Context-Aware Packaging
Generic LLMs (like standard ChatGPT prompts) generate packaging in a vacuum without knowing the visual aesthetics, subject models, or scene kinematics.
Because OpenProducer maintains the entire project state:
1. **Visual Style Anchors:** Thumbnails inherit the exact lighting, color grading, and lens characteristics (`visual/technical_anchor.md`).
2. **Subject Consistency:** Thumbnail prompts explicitly bind subject reference turnarounds (`[IMAGE 1]`, `[IMAGE 2]`).
3. **Timeline-Derived Chapters:** Descriptions can automatically compute mathematically accurate video chapter timestamps directly from clip durations (`shots/` or `timeline.md`).
4. **Narrative Climax Extraction:** Titles and thumbnail poses pull directly from the highest-stakes emotional moments of the script/story.

---

## 2. Universal Multi-Platform Packaging Laws (The Research Ground Truth)

Based on empirical data from YouTube Creator Insider, Netflix Key Art (Universal Base Asset) guidelines, TikTok/Reels retention data, and modern algorithmic indexing:

### 2.1 The Laws of High-CTR Thumbnails & Covers
1. **The Law of Pre-Attentive Facial Priority:** The human brain processes faces and eyes in under 100 milliseconds. An expressive face showing high-stakes micro-expressions (dread, awe, fierce focus) outperforms passive portraits by over 40%.
2. **The Rule of Three (Cognitive Focal Points):** A thumbnail must contain a maximum of 3 elements:
   - *Focal Point 1:* The expressive primary subject (`[IMAGE 1]`).
   - *Focal Point 2:* The environmental context/atmosphere (shallow depth of field background).
   - *Focal Point 3:* The punchy in-prompt AI typography (2–4 words max).
3. **The 40% Clean Negative Space Law:** The subject is framed on the left or right third, leaving 40% clean, uncluttered, high-contrast negative space dedicated to the typography.
4. **The Mobile Squint Test (75%+ Mobile Feed Law):** The thumbnail must be instantly decipherable at 120px scale. Requires punchy subject-to-background contrast (e.g. electric cyan rim light vs dark charcoal void, or warm amber vs cool teal).
5. **Strict UI Safe-Zone Protection:**
   - *16:9 Landscape (YouTube):* The **bottom-right corner** is strictly forbidden (blocked by the platform duration timestamp badge).
   - *9:16 Vertical (Shorts/TikTok/Reels):* The **bottom 25%** is strictly forbidden (blocked by creator handle, caption, and audio info); the right 15% margin is blocked by engagement buttons. Focal points and typography must be vertically center-weighted and pushed slightly left.
6. **Direct In-Prompt AI Typography Syntax:** Baked directly into the prompt with font weight, color contrast, drop shadow, and coordinates so modern image generators (Flux, Ideogram, Imagen) render the finished asset without external editing.

---

### 2.2 The Laws of High-CTR Titles
1. **The Law of Thumbnail-Title Symbiosis (Non-Redundancy):** Never repeat the thumbnail text in the title. The thumbnail shows the *emotional hook/moment*; the title provides the *stakes, context, or consequence*. Together they form a two-part curiosity loop.
2. **The Front-Loading & Mobile Truncation Rule:**
   - Total character limit: 100 characters.
   - *Active Safe Zone:* The first **50–65 characters** (mobile feeds truncate beyond this).
   - The primary hook or search keyword must appear within the first 35 characters.
3. **Platform Metadata Hygiene:** Never lead with episode numbers or channel names (e.g., `Episode 1 | The Deep` is banned; use `The Signal We Never Wanted | The Deep Ep. 1`).
4. **The 4 Core Title Archetypes:**
   - *Curiosity Loop:* Withholds vital information to spark an open cognitive loop.
   - *High-Stakes Conflict:* Emphasizes immediate urgency, danger, or irreversible choice.
   - *The Counter-Intuitive Paradox:* Challenges an assumption or reveals an unexpected truth.
   - *Cinematic Search Hybrid:* Balances atmospheric mood with high-intent search terms.

---

### 2.3 The Laws of High-Retention Descriptions
1. **The Above-the-Fold Law (The First 150 Characters):** The top 2–3 lines before "Show More" are prime real estate. Never waste them on links or social handles; deliver the narrative hook or video promise with primary keywords.
2. **Dynamic Key Moments & Chapters:** Timestamps must start at `0:00` and feature descriptive, keyword-rich chapter titles derived directly from timeline clip durations (indexed directly by Google Search).
3. **In-Universe Lore Snippet:** For narrative projects, include an in-universe log, transmission, or director's debrief that expands the world.
4. **The 3-Tier Targeted Hashtag Formula:** 3 to 5 hashtags max:
   - Tier 1: Broad genre (`#SciFi`).
   - Tier 2: Specific sub-niche (`#DeepSeaHorror`).
   - Tier 3: Production engine/campaign (`#Veo3 #AIAnimation`).
5. **Below-the-Fold Architecture:** Clean ASCII dividers (`====`, `----`) separating story lore, timestamps, credits/AI tool disclosures, and community links.

---

## 3. Directory Layout: Pure Plain Text (`.txt`) in `production/packaging/`

All packaging assets are housed within `production/packaging/` inside the project. To ensure **any creator can open and read files immediately without needing a markdown viewer or knowing markdown syntax**, all output files use `.txt` with clean ASCII visual dividers:

```
<project_root>/
└── production/
    └── packaging/
        ├── titles.txt                  # Title variations with character counts, tags & hashtags
        ├── descriptions.txt            # Description variations with chapters, lore & credits
        └── thumbnails/
            ├── thumb_01_prompt.txt     # Raw image prompt with embedded AI typography (Angle 1)
            ├── thumb_02_prompt.txt     # Raw image prompt with embedded AI typography (Angle 2)
            └── thumb_03_prompt.txt     # Raw image prompt with embedded AI typography (Angle 3)
```

### 3.1 Component 1: Thumbnails with Direct In-Prompt AI Typography (`thumbnails/`)
- **Strict Structural Consistency (Top Meta + Image Prompt + Negative Prompt):** Every thumbnail prompt follows the exact same 3-part anatomy used throughout OpenProducer (`base_image_prompt.txt` and `clip_XXX/image_prompt.txt`):

```text
[THUMBNAIL 01: HIGH-CTR KEYFRAME PROMPT — DREAD & VISOR REFLECTION]
Target Tool: Google Flow / Imagen 4 / Flux 1.1 Pro / Midjourney
Conditioned On: [IMAGE 1] (Maya Lin Turnaround) + visual/technical_anchor.md
Aspect Ratio: 16:9
Composition: Left-Third Subject Framing, 40% Clean Negative Space Right
Safe Zone: Bottom-right corner kept completely clear of text/focal points (YouTube UI duration pill)
AI Typography: "LOOK DOWN" (Heavy Distressed Sans-Serif, High-Contrast Solid White, Subtle Dark Drop Shadow)

[IMAGE PROMPT]
Cinematic live-action film still of Maya Lin inside a pressurized diving helmet, eyes wide in sheer dread, condensation clinging to the curved glass visor, illuminated by an intense motivated cyan rim light. Left-third composition with tight subject framing. The clean dark void on the right third features bold, weathered white typography reading "LOOK DOWN" rendered directly in high contrast with a subtle dark drop shadow. Cinematic 35mm film grain, 85mm portrait prime lens, shallow depth of field, high visual punch for mobile feeds.

[NEGATIVE PROMPT]
blurry text, misspelled typography, illegible letters, deformed text, messy font, cluttered background, action figure, doll, deformed hands, extra fingers, cartoon, 3D CGI plastic, waxy skin, camera rig, tripod, centered composition blocking negative space, bottom-right corner clutter.
```

- **Direct AI Rendering (Zero Manual Photoshop):** Modern image models (Ideogram 2.0, Flux 1.1 Pro, Imagen 3/4) excel at rendering stylized typography directly. The prompt specifies the exact text, typography style, color contrast, and safe negative-space placement so the image model renders the complete, finished thumbnail with text already baked in.
- **Dual Aspect Ratios:** Prompt structure handles 16:9 (Landscape) and 9:16 (Vertical Shorts/Reels cover).
- **The 40% Clean Negative Space Law:** Reserves the left or right third for the rendered typography.
- **The Mobile Squint Test:** High-contrast silhouettes and readable letterforms even on small mobile screens.
- **Safe Zone Protection:** Keeps text and vital subject features out of the bottom-right corner to avoid collision with YouTube duration timestamps.

### 3.2 Component 2: High-CTR Titles (`titles.txt`)
- **All variations in one file:** Clear ASCII blocks (`====`, `----`) displaying each title option, its character count, mobile truncation status (<65 chars), and associated hashtags.

### 3.3 Component 3: Structured Descriptions (`descriptions.txt`)
- **Multiple description styles:**
  - *Style A (Narrative & Lore):* Above-the-fold hook, auto-calculated timeline chapters/timestamps, in-universe lore/transmission, credits, and links.
  - *Style B (High-Engagement Punchy):* Fast hook, timestamps, clear Call to Action.
  - *Style C (SEO & Discoverability):* Comprehensive keyword block, timestamps, detailed gear/model specs.
- **Dynamic Chapters / Timestamps:** Automatically generated from the timeline (e.g. `0:00 The Descent`, `0:08 The Flickering Beacon`, `0:14 Encounter`).
- **Narrative Lore / Post-Story:** Optional extended lore snippet, director's note, or poetic framing that enriches narrative channels.
- **Credit Roll & Technical Specs:** Transparent disclosure of tools (e.g. Google Flow, Veo 3.1, Imagen, Suno), music credits, and cast/crew.
- **Call-to-Action (CTA) & Social Links:** Channel links, discord, newsletter, or playlist hooks.
- **Search Engine Keyword Bank:** Relevant semantic tags for search discoverability.

---

## 4. The `/opp-package` Agent Skill & Conversational Intent Routing

Instead of rigid static scripts, `/opp-package` (alias `/openproducer-package`) is a dedicated agent skill that directly responds to natural conversational instructions:

### 4.1 Single / Targeted Deliverable Invocations
The producer can trigger specific assets with custom instructions:
- **Title Focused:**
  `"/opp-package Create me good title which sparks curiosity"`
  -> Analyzes project climax, extracts key narrative mystery, generates curiosity-gap titles complying with mobile length limits (<65 chars).
- **Thumbnail Focused:**
  `"/opp-package Generate thumbnail for this. Use 'LOOK DOWN' as thumb text"`
  -> Generates 16:9 and 9:16 image prompts applying the 40% Negative Space Law, mobile squint test, subject reference image binding, and outputs `overlay_guide.md` specifying `"LOOK DOWN"` typography and coordinates.
- **Description Focused:**
  `"/opp-package Write description for the story. Add hashtags: #scifi #horror"`
  -> Generates `descriptions.md` with above-the-fold hook, dynamically calculates timeline timestamps/chapters from clip lengths, writes the post-story lore snippet, and appends the requested hashtags and boilerplate.

### 4.2 Full Kit Generation
- **Complete Suite:**
  `"/opp-package Package this project for delivery"` (or bare `"/opp-package"`)
  -> Generates all 3 deliverables into `<project_root>/production/packaging/` simultaneously.

---

## 5. The Unified `package` Template Sub-Vault (`templates/package/<id>.md`)

Leveraging OpenProducer's flexible sub-vault architecture (`video/`, `story/`, `audio/`, and now `package/`), packaging rules are **not fragmented** into separate templates for title, thumbnail, and description.

A channel, studio, or series maintains its entire packaging identity in **one unified template file**:

```bash
# Read the complete raw contents of any template across all groups
npx openproducer template read youtube_dark_scifi
# Or with explicit group syntax
npx openproducer template package read youtube_dark_scifi

# Apply a packaging preset from global or local vault
npx openproducer template package use youtube-dark-scifi
# Save current project packaging rules as a reusable preset
npx openproducer template package save my-channel-style
```

### 4.1 Schema of a Unified Packaging Template (`templates/package/<id>.md`)

```markdown
---
template_id: youtube-dark-scifi
name: YouTube Dark Sci-Fi Channel Packaging
group: package
archetype: narrative_short
default_hashtags: ["#SciFiShort", "#AIAnimation", "#Veo3"]
default_tags: ["sci-fi horror", "space mystery", "cinematic ai", "short film"]
title_config:
  max_length: 65
  bracket_tag: "[4K Short Film]"
  case_style: title_case
  preferred_archetypes: ["curiosity", "high_stakes"]
thumbnail_config:
  aspect_ratios: ["16:9", "9:16"]
  subject_placement: left_third
  negative_space_percent: 40
  color_accent: "cyan rim lighting and deep void background"
  logo_position: "top_left (120px margin, avoid bottom-right duration pill)"
  overlay_font: "Montserrat ExtraBold, uppercase, white with subtle dark drop shadow"
description_config:
  include_timestamps: true
  include_lore: true
  credit_roll: true
---

# Channel Packaging Rules

## 1. Title Rules
- Titles must spark intrigue without resorting to cheap clickbait.
- Format: `{Curiosity Hook} | {Series Title} Ep. {Episode}`
- Keep total length under 65 characters to avoid mobile truncation.

## 2. Thumbnail Rules
- Background must maintain high contrast against the foreground subject.
- Always preserve 40% clean negative space on the right side for text overlays.
- Text overlays must be 2–4 words max.
- Logo watermark belongs strictly in the top-left corner. Bottom-right must remain 100% clean for platform timestamps.

## 3. Description Layout
1. **The Hook:** 2 punchy lines summarizing the central dilemma.
2. **Timestamps:** Automatically generated from the timeline clips.
3. **Transmission / Lore:** 1 paragraph of in-universe lore or post-story debrief.
4. **Production Credits:** Veo 3.1, Imagen, Suno, OpenProducer pipeline.
5. **Channel Links & Socials:**
   - Discord: https://discord.gg/example
   - Patreon: https://patreon.com/example
```

---

## 6. Next Steps
1. Draft authoritative specification: `production_framework/specs/09_packaging_spec.md` (or staged under `production_framework/staged/specs/`).
2. Define skill definition for `openproducer-package` (`SKILL.md`).
3. Build example package templates (e.g. YouTube Cinema Short, TikTok/Reels Viral, Lore/Documentary Channel) under `templates/package/`.

