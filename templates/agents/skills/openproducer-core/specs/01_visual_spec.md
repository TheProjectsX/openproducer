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

## 3. The 3-Value Exposure & Kelvin Continuity Anchor (`[MATCH-ON-TONE]`)
Across multi-clip sequences, diffusion engines (Imagen 4 / Veo 3.1) shift exposure brightness and color temperature when cutting between macro inserts and wide room plates. To eliminate jarring screen strobing and exposure jumps, every project defines this immutable 3-value anchor:
- **Exposure Key (IRE):** [e.g., Low-Key 15% IRE | Standard Balanced 45% IRE | High-Key 70% IRE]
- **Dominant Color Temperature (Kelvin):** [e.g., 3200K Warm Tungsten | 5600K Clean Daylight | 6500K Cool OLED Cyan]
- **Black Point & Dynamic Floor:** [e.g., Crushed Pitch Black `#0A0B0E` | Lifted Matte Film Shadow `#181920`]
- **Master Tone Invariant String:**
  > `Exposure key: [e.g., low-key 15% IRE], dominant color temperature: [e.g., 3200K warm incandescent], black point floor: [e.g., #0A0B0E], zero exposure strobing across cuts.`
```

### 3.3 `visual/technical_anchor.md` (Authoritative Flow Anchor)

```markdown
# Technical Prompt Anchor (Flow Engine)

## Master Style Anchor String
> "[EXACT_LOCKED_STYLE_CLAUSE_TO_BE_INJECTED_INTO_ALL_PROMPTS]"

## Engine Directives & Safety Rules
1. **Forbidden Buzzwords:** Never include "photorealistic, 8k, hyper-detailed, masterpiece" (dilutes token attention).
2. **Viewport Directives (No Equipment Nouns):** Never write "tripod", "camera on tripod", "dolly track", or "crane rig". Always use perspective descriptors ("locked-off eye-level framing, completely static shot", "slow push-in", "lateral tracking glide") to prevent the model from rendering physical camera hardware inside the scene (Linter `L-03`).
3. **Decoupling Rule:** Do NOT append technical specs ("16:9, 1080p, 24fps, 8s") into prompt text. These belong strictly in the Flow/API configuration block (Linter `L-04`). Creative stepped cadence (e.g. "on twos", "stepped frame motion") is whitelisted.
4. **Structured Audio Rule:** Dedicated `Audio:` block strictly follows the semicolon-delimited 4-field syntax (`Audio: SFX: ...; Ambience: ...; Dialogue: ...; Music: ...`) per Linter `L-17`.
```

---

## 4. The 8 Universal Base Mediums & Pluggable Styles Architecture

The visual domain operates on the **3-Tier Pluggable Style Engine** defined in [`production_framework/styles/`](../styles/README.md):
$$\text{Base Medium (Styles Folder)} \longrightarrow \text{Dialect Variation} \longrightarrow \text{Project Overrides (visual/)}$$

The 8 authoritative Base Mediums and their Default Master Style Anchors:

| Medium Plugin | Default Master Style Anchor String | Crucial Failure Mode Guard |
|---|---|---|
| **1. Live-Action Cinema** ([`live_action_cinema.md`](../styles/live_action_cinema.md)) | `Shot on 35mm film stock, organic fine grain, natural dynamic range, Panavision C-Series anamorphic prime lens, subtle optical halation around warm incandescent highlights, natural skin texture with visible biological pores, shallow depth of field, creamy circular bokeh, cinematic color grading, rich authentic shadows.` | Avoid digital buzzwords; use optical/film terms. Never use hardware nouns (`tripod`, `drone`). |
| **2. Traditional 2D Cel Anime** ([`traditional_2d_anime.md`](../styles/traditional_2d_anime.md)) | `Traditional 2D hand-drawn cel animation, crisp clean uniform dark ink outlines, classic 2-tone cel shading with distinct shadow boundaries, flat vibrant color fills, hand-painted scenic anime background art, stepped animation timing on twos, flat 2D graphic anime aesthetic.` | Must forbid 3D rendering to prevent doubled jittery lines. |
| **3. Stylized 3D CGI** ([`stylized_3d_cgi.md`](../styles/stylized_3d_cgi.md)) | `Stylized 3D digital character animation, soft rounded geometric forms, warm subsurface scattering on skin, tactile micro-textures on clothing and surfaces, warm three-point volumetric studio lighting, RenderMan global illumination, soft contact ambient occlusion shadows, creamy circular bokeh, cinematic 3D CGI render aesthetic.` | Keeps characters stylized without uncanny valley realism. |
| **4. Stop-Motion / Claymation** ([`stop_motion_claymation.md`](../styles/stop_motion_claymation.md)) | `Handcrafted stop-motion claymation, sculpted plasticine clay characters with visible tactile surface thumbprint impressions, matte non-glossy finish, miniature tabletop diorama set, macro 100mm lens, shallow depth of field, warm overhead practical studio spotlights, 12fps stop-motion stepped animation timing on twos, tangible physical puppet craft aesthetic.` | Fingerprint and armature keywords force authentic miniature physics. |
| **5. Vintage & Retro Film** ([`vintage_retro_film.md`](../styles/vintage_retro_film.md)) | `Shot on 35mm archival chemical film stock, authentic organic silver halide grain, natural warm analog color science, subtle mechanical gate weave, soft optical halation around warm incandescent highlights, natural edge vignetting, rich velvety black shadows, nostalgic archival film print aesthetic.` | Binds color chemistry to historical film emulsion without sepia mud. |
| **6. Commercial Tabletop Advertising** ([`commercial_tabletop.md`](../styles/commercial_tabletop.md)) | `Shot on 100mm macro lens, f/2.8, razor-sharp edge definition, studio softbox diffusion lighting with pristine metallic rim reflections, micro-detail surface textures, ultra-clean studio stage, dynamic high-contrast commercial color grading, zero dust, commercial product showcase aesthetic.` | Specify softbox diffusion and crisp rim highlights to avoid murky shadows. |
| **7. Social UGC & Mobile Video** ([`social_ugc_video.md`](../styles/social_ugc_video.md)) | `Modern smartphone mobile sensor video aesthetic, natural ambient daylight, casual handheld arm-length framing with subtle organic breathing micro-wobble, sharp edge-to-edge sensor definition, vibrant punchy daylight saturation, zero film grain, authentic unpolished social media creator aesthetic.` | Ban film grain, halation, and anamorphic artifacts to preserve genuine mobile video look. Config specs (`9:16`, `4K`) kept out of prompt text. |
| **8. Vector Stick Figure** ([`vector_stick_figure.md`](../styles/vector_stick_figure.md)) | `Minimalist 2D vector line-art animation. Limbs and torso are pure unbroken solid black vector strokes terminating in smooth rounded line-cap ends; strictly zero individual fingers, zero human hands, zero toes, zero knuckles, and zero fleshy details. The circular head is filled with solid opaque white (#FFFFFF) and contoured with a clean uniform black outline (#0F172A), completely devoid of facial features. Crisp graphic novel vector style, sharp outlines, uniform stroke weight throughout, flat 2D graphic art.` | Strict fingerless limb bounding prevents horrific AI multi-finger mutancy. |

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
 │   SUBJECTS   │ │ENVIRONM. │ │ VIDEO SHOTS  │
 │ Turnarounds  │ │  Stages  │ │ Veo Prompts  │
 └──────────────┘ └──────────┘ └──────────────┘
```
1. **Subjects (`subjects/`):** Model turnaround sheet prompts append the Master Style Anchor on a neutral light-gray (`#E5E5E5`) studio background (for characters and product hero assets).
2. **Environments (`environments/`):** Environment concept boards, world locations, and commercial studio plinths append the Master Style Anchor to lock atmospheric lighting and reflections.
3. **Video Shots (`shots/`):** Injected directly into the Layer 3 position (Tokens 81–130) of each compiled Veo prompt.
