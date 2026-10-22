# Specification: `visual/` Domain (Visual Style & DNA)

**Status:** ✅ FINALIZED  
**Domain:** `visual/`  
**Target Engines:** Google Flow (Veo 3.1, Imagen 4, Gemini Omni Flash)

---

## 1. Domain Purpose & Philosophy

The `visual/` domain defines the foundational **Visual DNA** for the entire project. It guarantees visual cohesion across all character turnarounds, environment concept boards, and video clips, eliminating **Style Drift**.

### The Dual-Layer Architecture:
1. **Human Layer (Creator View):** Plain-English description of the artistic vibe, mood, and atmosphere (no technical camera/lighting jargon).
2. **Machine Layer (Flow Engine View):** The locked **Master Style Anchor String** and technical directives deterministically injected into all downstream prompts.

---

## 2. Directory Structure & File Contracts

When a project is created, the `visual/` folder contains exactly three markdown files:

```text
visual/
├── style_summary.md        # Human-facing description of the look and mood
├── palette_and_mood.md     # Color values, contrast profile, and lighting behaviour
└── technical_anchor.md     # Locked Master Style Anchor string for Flow prompts
```

---

## 3. Template Specifications

### 3.1 `visual/style_summary.md` (Human Review Document)

```markdown
# Visual Style: [PROJECT_STYLE_TITLE]

## The Vibe
[1-2 paragraphs describing the overall feeling, cinematic genre, and visual reference in everyday conversational English].

## Key Visual Characteristics
- **Visual Medium:** [e.g., 35mm Gritty Live-Action Film | Traditional 2D Cel Anime | Stylized 3D CGI | 1970s Vintage Film]
- **Atmosphere:** [e.g., Rain-drenched night streets, drifting smoke, golden hour haze]
- **Lighting Mood:** [e.g., Dark moody shadows with neon practicals | Warm soft daylight | Dramatic chiaroscuro]
- **Texture & Feel:** [e.g., Organic film grain, sharp dust motes, tactile cloth | Smooth flat unshaded fills]
```

### 3.2 `visual/palette_and_mood.md` (Color & Contrast Specification)

```markdown
# Palette & Mood Specification

## 1. Color Palette
- **Primary Dominant Hues:** [e.g., Desaturated olive green, charcoal slate, cold steel blue]
- **Accent / Practical Hues:** [e.g., Vivid neon cyan, warm tungsten amber]
- **Saturation Profile:** [e.g., Heavily desaturated bleach bypass (30% saturation) | Vibrant saturated primary hues]

## 2. Contrast & Shadow Profile
- **Contrast Ratio:** [e.g., High-contrast dramatic low-key | Soft low-contrast overcast]
- **Shadow Roll-off:** [e.g., Preserved shadow detail with subtle silver grain | Deep velvety crushed blacks]
```

### 3.3 `visual/technical_anchor.md` (Authoritative Flow Anchor)

```markdown
# Technical Prompt Anchor (Flow Engine)

## Master Style Anchor String
> "[EXACT_LOCKED_STYLE_CLAUSE_TO_BE_INJECTED_INTO_ALL_PROMPTS]"

## Engine Directives & Safety Rules
1. **Forbidden Buzzwords:** Never include "photorealistic, 8k, hyper-detailed, masterpiece" (dilutes token attention).
2. **Viewport Directives (No Equipment Nouns):** Never write "tripod", "camera on tripod", "dolly track", or "crane rig". Always use perspective descriptors ("locked-off eye-level framing, completely static shot", "slow push-in", "lateral tracking glide") to prevent the model from rendering physical camera hardware inside the scene.
3. **Decoupling Rule:** Do NOT append technical specs ("16:9, 1080p, 24fps, 8s") into prompt text. These belong strictly in the Flow/API configuration block.
4. **Audio Rule:** Dedicated `Audio:` block with mandatory `, no background music` suppression clause.
```

---

## 4. The 6 Master Style Paradigms & Standard Anchors

| Paradigm | Master Style Anchor String | Crucial Failure Mode Guard |
|---|---|---|
| **1. Ultra-Realistic 35mm Film** | `Shot on 35mm film stock, organic fine grain, bleach bypass desaturated color grading, muted earth tones, soft diffused lighting, shallow depth of field, solemn cinematic realism.` | Avoid digital buzzwords; use optical/film terms. |
| **2. Ultra-Realistic Digital Cinema** | `Shot on Arri Alexa 65, pristine optical clarity, circular creamy bokeh, sharp edge-to-edge resolution, neutral color roll-off, naturalistic motivated lighting.` | Specify sensor & lighting to avoid plastic AI skin. |
| **3. Traditional 2D Cel Anime** | `Traditional 2D hand-drawn cel animation, flat unshaded color fills, bold uniform clean ink outlines, locked 24fps anime aesthetic, zero 3D rendering, zero volumetric shading.` | Must forbid 3D rendering to prevent doubled jittery lines. |
| **4. Stylized 3D CGI** | `Stylized 3D digital animation, soft tactile vinyl and cloth micro-textures, warm subsurface scattering on skin, expressive lighting, miniature cinematic depth of field.` | Keeps characters stylized without uncanny valley realism. |
| **5. Stop-Motion / Claymation** | `Handcrafted stop-motion clay animation, tactile plasticine clay textures with faint visible fingerprint impressions, physical miniature sets, stepped frame motion.` | Fingerprint and armature keywords force authentic miniature physics. |
| **6. Vintage Kodachrome 1970s** | `Authentic Kodachrome 64 color film aesthetic, saturated primary reds and yellows, warm retro contrast, subtle edge halation, distinct 1970s film tone.` | Binds color chemistry to historical film emulsion. |

---

## 5. How Downstream Domains Consume `visual/`

```
┌───────────────────────────────────────┐
│       visual/technical_anchor.md      │
│     (Locked Master Style Anchor)      │
└───────────────────┬───────────────────┘
                    │
         ┌──────────┼──────────┐
         ▼          ▼          ▼
 ┌──────────────┐ ┌──────────┐ ┌──────────────┐
 │  CHARACTERS  │ │SCENERIES │ │ VIDEO SHOTS  │
 │ Turnarounds  │ │ Concepts │ │ Veo Prompts  │
 └──────────────┘ └──────────┘ └──────────────┘
```
1. **Characters (`characters/`):** Character Turnaround sheet prompts append the Master Style Anchor on a neutral light-gray (`#E5E5E5`) studio background.
2. **Sceneries (`sceneries/`):** Environment concept prompts append the Master Style Anchor to lock atmospheric lighting.
3. **Video Shots (`shots/` / `clips/`):** Injected directly into the Layer 3 position (Tokens 76–120) of each compiled Veo prompt.
