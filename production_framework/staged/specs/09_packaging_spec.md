# Specification 09: Delivery Packaging Engine (`opp-package`), Pure Text Deliverables & Channel Templates

## 1. Core Architectural Philosophy: Packaging as Distribution Delivery

In OpenProducer, **Packaging constitutes Phase Final (Post-Production Delivery)**. 

A cinematic video with world-class generation (Veo 3.1, Imagen 4) and seamless audio editing fails if its distribution packaging is generic, poorly formatted, or visually disconnected from the project. 

### The OpenProducer Superpower: Context-Aware Delivery
Generic LLMs generate titles and thumbnails in a vacuum without knowing what the video looks like or how long shots last. OpenProducer's Packaging Engine has full access to the project brain:
1. **Visual Style Anchors:** Thumbnails inherit the exact lighting, color palette, and lens primes from `visual/technical_anchor.md`.
2. **Biometric Subject Binding:** Thumbnail prompts explicitly bind character turnaround sheets (`[IMAGE 1]`) and subject assets from `subjects/`.
3. **Timeline-Derived Chapters:** Descriptions automatically compute mathematically exact timestamps directly from clip durations in `production/timeline.md` or `shots/`.
4. **Climax & Stakes Extraction:** Titles and thumbnail poses pull directly from the story climax and highest-stakes dramatic moments.

### Core Delivery Principles:
1. **Strict On-Demand Execution:** Never force packaging prompts on the creator during routine shot generation; packaging is synthesized on demand via `/opp-package` or when explicitly requested.
2. **Pure Plain Text (`.txt`) Format:** To ensure any creator or producer can immediately open, read, and copy deliverables without needing a markdown viewer or knowing markdown syntax, all packaging assets are output as clean `.txt` files with readable ASCII dividers (`====`, `----`).
3. **Direct In-Prompt AI Typography:** Modern image generators (Flux, Ideogram, Imagen 3/4) render text natively. The engine specifies the typography, placement, styling, and contrast directly in the prompt—eliminating manual Photoshop/Canva compositing.
4. **The Flexible "Rule of 3" (A/B/C Multi-Variant Default):** Generates 3 distinct variations of each asset by default (aligning with YouTube Studio's native "Test & Compare" A/B/C testing), while scaling dynamically to any number on producer demand.

---

## 2. Directory Layout & File Contracts (`production/packaging/`)

All delivery packaging assets reside within `production/packaging/`:

```
production/
└── packaging/
    ├── titles.txt                  # Title variations with character counts, tags & hashtags
    ├── descriptions.txt            # Description styles (Lore, Punchy, Full YouTube Chapters)
    └── thumbnails/
        ├── thumb_01_prompt.txt     # Raw prompt 1: Character Close-up / Emotion + In-Prompt Text
        ├── thumb_02_prompt.txt     # Raw prompt 2: Environmental Scale / Mystery + In-Prompt Text
        └── thumb_03_prompt.txt     # Raw prompt 3: Climax Confrontation / Action + In-Prompt Text
```

### 2.1 File Contract Specifications:

| File | Primary Consumer | Content Structure | Purpose |
|---|---|---|---|
| `titles.txt` | Human Producer & Platform | ASCII blocks with Title, Char Count, Safe-Zone Check (<65 chars), and Hashtags | 3+ distinct psychological angles for A/B/C testing in one viewable file. |
| `descriptions.txt` | Human Producer & Platform | ASCII blocks with Hook, Auto-Calculated Chapters (`0:00`), In-Universe Lore, Credits, and Links | 3 distinct description styles (Story-heavy, Punchy CTR, Full YouTube Chapters). |
| `thumbnails/thumb_XX_prompt.txt` | AI Image Generators (Flux, Ideogram, Imagen, Midjourney) | Standard 3-part anatomy: `[METADATA HEADER]` + `[IMAGE PROMPT]` + `[NEGATIVE PROMPT]` | 1-click copy-paste ready image prompt with embedded AI typography and safe-zone protection. |

---

## 3. Standardized Thumbnail Prompt Anatomy

Every thumbnail prompt generated into `thumbnails/thumb_XX_prompt.txt` strictly mirrors the universal 4-block prompt contract established in `base_image_prompt.txt` and `clip_XXX/image_prompt.txt`:

```text
[CONFIGURATION SETTINGS]
Aspect Ratio: 16:9 (or 9:16 for Shorts/Reels Cover)
Resolution: 1080p
Composition: Left-Third Subject Framing, 40% Clean Negative Space Right
Safe Zone: Bottom-right corner kept completely clear of text/focal points (YouTube duration badge)
AI Typography: "<PUNCHY TEXT>" (<Font Style>, <Color Contrast>, <Drop Shadow / Placement>)

[INPUT SEEDS & INGREDIENTS]
1. Persistent Subject DNA: [IMAGE 1] -> production/subjects/<subject_id>/profile_prompt.txt (or turnaround_sheet.png)
2. Master Visual DNA:      [IMAGE 2] -> production/base_image_prompt.txt (or visual/technical_anchor.md)

[IMAGE PROMPT]
<Cinematic medium close-up of Subject from [IMAGE 1] displaying intense emotional micro-expression (dread, awe, fierce focus). Left-third framing. The clean dark negative space on the right third features bold, stylized typography reading "<PUNCHY TEXT>" rendered directly in high contrast with subtle dark drop shadow. Cinematic lens prime, shallow depth of field, motivated rim lighting matching visual anchor, organic grain, high visual punch for mobile feeds.>

[NEGATIVE PROMPT]
blurry text, misspelled typography, illegible letters, deformed text, messy font, cluttered background, action figure, doll, deformed hands, extra fingers, cartoon, 3D CGI plastic, waxy skin, camera rig, tripod, centered composition blocking negative space, bottom-right corner clutter.
```

---

## 4. Universal Platform Packaging Laws

Synthesized across YouTube Creator Insider, Netflix Key Art (Universal Base Asset) standards, TikTok/Reels retention data, and semantic search indexing:

### 4.1 Thumbnail & Cover Laws
1. **The Pre-Attentive Facial Priority Trigger:** The human brain processes faces and eyes in under 100 milliseconds. An expressive face displaying high-stakes micro-expressions (**dread, intense awe, fierce focus, or terror**) outperforms neutral resting faces by over 40% in CTR.
2. **The Rule of Three (Cognitive Focal Points):** A thumbnail must contain a maximum of 3 elements:
   - *Focal Point 1:* The expressive primary subject (`[IMAGE 1]`).
   - *Focal Point 2:* The environmental context/atmosphere (shallow depth of field background).
   - *Focal Point 3:* The punchy in-prompt AI typography (2–4 words max).
   Any additional element creates visual noise and causes users to scroll past.
3. **The 40% Clean Negative Space Law:** The subject is framed on the left or right third, leaving 40% clean, uncluttered, high-contrast negative space dedicated to the typography.
4. **The Mobile Squint Test (75%+ Mobile Feed Law):** The thumbnail must be instantly decipherable at 120px scale. Requires punchy subject-to-background contrast (e.g. electric cyan rim light vs dark charcoal void, or warm amber vs cool teal).
5. **Strict UI Safe-Zone Shielding:**
   - *16:9 Landscape (YouTube):* The **bottom-right corner is strictly forbidden** (blocked by the black platform duration timestamp badge).
   - *9:16 Vertical (Shorts/TikTok/Reels):* The **bottom 25%** is strictly forbidden (blocked by creator handle, caption, and audio info); the **right 15% margin** is covered by like/share icons. Focal points and typography must be vertically center-weighted and pushed slightly left.
6. **Direct In-Prompt AI Typography Syntax:** Baked directly into the prompt with font weight, color contrast, drop shadow, and coordinates so modern image generators render the finished asset without external editing.

### 4.2 Title Laws (`titles.txt`)
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

### 4.3 Description Laws (`descriptions.txt`)
1. **The Above-the-Fold Law (The First 150 Characters):** The top 2–3 lines before "Show More" are prime real estate. Never waste them on links or social handles; deliver the narrative hook or video promise with primary keywords.
2. **Dynamic Key Moments & Chapters:** Timestamps must start at `0:00` and feature descriptive, keyword-rich chapter titles derived directly from timeline clip durations (indexed directly by Google Search).
3. **In-Universe Lore Snippet:** For narrative projects, include an in-universe log, transmission, or director's debrief that expands the world.
4. **The 3-Tier Targeted Hashtag Formula:** 3 to 5 hashtags max:
   - Tier 1: Broad genre (`#SciFi`).
   - Tier 2: Specific sub-niche (`#DeepSeaHorror`).
   - Tier 3: Production engine/campaign (`#Veo3 #AIAnimation`).
5. **Below-the-Fold Architecture:** Clean ASCII dividers (`====`, `----`) separating story lore, timestamps, credits/AI tool disclosures, and community links.

---

## 5. Conversational Intent Routing (`/opp-package`)

The `/opp-package` (alias `/openproducer-package`) agent skill processes natural conversational requests and routes to single or full deliverables:

### 5.1 Full Suite Execution
```text
/opp-package
# OR
/opp-package Package this project for YouTube delivery
```
*Action:* Synthesizes all 3 deliverables into `production/packaging/` (`titles.txt`, `descriptions.txt`, `thumbnails/thumb_01_prompt.txt`, `02`, `03`).

### 5.2 Targeted Single Deliverable Invocations
```text
# Title focused with angle:
/opp-package Create me 5 titles that spark deep curiosity

# Thumbnail focused with specific in-prompt text:
/opp-package Generate thumbnail prompts for this. Use "LOOK DOWN" as thumb text

# Description focused with specific hashtags:
/opp-package Write description for the story. Add hashtags: #scifi #horror #veo3
```

---

## 6. Unified Packaging Template System (`templates/package/<id>.md`)

Channel branding formulas are packaged into single, reusable markdown presets under `templates/package/`:

```markdown
---
template_id: youtube-dark-scifi
name: Dark Sci-Fi Channel Packaging
group: package
archetype: narrative_short
default_hashtags: ["#SciFi", "#AIAnimation", "#Veo3"]
default_tags: ["sci-fi horror", "space mystery", "cinematic ai"]
title_config:
  max_length: 65
  bracket_tag: "[4K Short Film]"
  case_style: title_case
thumbnail_config:
  aspect_ratios: ["16:9", "9:16"]
  subject_placement: left_third
  negative_space_percent: 40
  color_accent: "cyan rim lighting and deep void background"
  logo_position: "top_left (120px margin)"
  overlay_font: "Montserrat ExtraBold, uppercase"
description_config:
  include_timestamps: true
  include_lore: true
---

# Channel Packaging Rules

## 1. Title Rules
- Spark intrigue without cheap clickbait. Format: `{Curiosity Hook} | {Series Title}`.
- Max 65 characters so it doesn't truncate on mobile.

## 2. Thumbnail Rules
- 40% clean negative space on the right for 2–4 word text overlays.
- Channel logo strictly top-left; keep bottom-right 100% clean for platform timestamps.

## 3. Description Rules
- Top 2 lines: high-tension hook before the "Show more" fold.
- Timestamps: auto-calculated from timeline clips.
- Transmission / Lore: 1 in-universe lore paragraph after the plot summary.
- Standard channel links and disclaimers.
```

---

## 7. Packaging Pre-Flight Quality Linters

The packaging engine runs 5 automated checks before finalizing deliverables:

| Linter ID | Name | Constraint & Severity |
|---|---|---|
| **LINT-PKG-01** | `TitleMobileLengthLinter` | **WARNING** if primary hook in `titles.txt` exceeds 65 characters (mobile truncation hazard). |
| **LINT-PKG-02** | `ThumbnailSafeZoneLinter` | **ERROR** if `thumbnails/` prompt places text or primary focal points in the bottom-right corner (YouTube duration pill collision). |
| **LINT-PKG-03** | `NonRedundancyLinter` | **WARNING** if the text in `thumbnails/` exactly repeats words from the corresponding title in `titles.txt`. |
| **LINT-PKG-04** | `InPromptTypographyLinter` | **ERROR** if in-prompt text overlay exceeds 4 words or lacks explicit font styling, color contrast, and negative-space coordinates. |
| **LINT-PKG-05** | `TimestampZeroOriginLinter` | **ERROR** if `descriptions.txt` does not begin chapters at `0:00` or if chapter timestamps do not mathematically match timeline clip durations. |

