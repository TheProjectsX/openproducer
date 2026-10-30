# Pluggable Style Registry (Universal Base Mediums & Dialects)

This directory serves as the authoritative, pluggable visual style engine for the Video Generation Framework. It implements the **3-Tier "Medium vs. Dialect" Inheritance Model** ([Discussion 50](../../discussions/_raw/50_medium_vs_dialect_inheritance_model_for_styles.md)), preventing file bloat and combinatoric confusion while enabling infinite aesthetic variations.

---

## 1. The 3-Tier Style Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│  LAYER 1: THE ROOT MEDIUM (The Physical Universe & Canvas)              │
│  - Sets immutable physics, render mechanics, and negative guards.      │
│  - Ground-Level Default Anchor String injected into Tokens 81–130.     │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ inherits physical laws & negatives
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│  LAYER 2: THE AESTHETIC DIALECT (The School / Studio / Sub-Style)       │
│  - Optional 20–30 token descriptor overriding line weight, era, lens.  │
│  - Modulates Tokens 81–130 without breaking base physics.              │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ modulates scene atmosphere
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│  LAYER 3: LIGHTING & PALETTE MODULATION (The Scene Mood)                │
│  - Scene-specific color timing, contrast vectors, and motivated light. │
│  - Governed by visual/palette_and_mood.md and shot action prompts.     │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Universal Base Medium Registry (8 Master Paradigms)

| Plugin File | Medium ID | Ground-Level Default Philosophy | Embedded Dialect Registry |
|---|---|---|---|
| [`live_action_cinema.md`](./live_action_cinema.md) | `live_action_cinema` | 35mm Anamorphic Film, natural skin pores, organic fine grain, circular bokeh | `fincher_bleach_bypass`, `wes_anderson_pastel_planar`, `nolan_70mm_imax` |
| [`commercial_tabletop.md`](./commercial_tabletop.md) | `commercial_tabletop` | 100mm Macro f/2.8, studio octabank softbox, razor-sharp edge bevels, zero dust | `luxury_macro_watch`, `techwear_hardware`, `nordic_minimalist_cosmetic` |
| [`vector_stick_figure.md`](./vector_stick_figure.md) | `vector_stick_figure` | Minimalist 2D vector graphic art, unbroken black limbs, rounded line-caps, white circular head | `minimalist_noir`, `kurzgesagt_infographic`, `action_smear_xiao_xiao`, `anatomical_stick_with_hands` |
| [`traditional_2d_anime.md`](./traditional_2d_anime.md) | `traditional_2d_anime` | Hand-drawn cel animation, 2-tone cel shading, stepped animation timing on twos | `ghibli_pastoral`, `shinkai_urban_twilight`, `trigger_neon_sakuga`, `ufotable_digital_compositing`, `kyoani_delicate_drama`, `90s_retro_cel`, `chibi_deformed` |
| [`stylized_3d_cgi.md`](./stylized_3d_cgi.md) | `stylized_3d_cgi` | Stylized digital 3D geometry, tactile micro-textures, peach-fuzz SSS translucency | `pixar_feature`, `spider_verse_comic_hybrid`, `dreamworks_comedic_cgi`, `pop_mart_vinyl_art_toy`, `retro_ps1_lowpoly` |
| [`stop_motion_claymation.md`](./stop_motion_claymation.md) | `stop_motion_claymation` | Miniature tabletop diorama, sculpted plasticine with visible thumbprints, 12fps stepped cadence | `aardman_plasticine_comedy`, `laika_dark_fantasy`, `wes_anderson_felted_puppet`, `tactile_papercraft_cutout` |
| [`vintage_retro_film.md`](./vintage_retro_film.md) | `vintage_retro_film` | 35mm chemical emulsion, gate weave, organic silver halide grain, natural halation | `kodachrome_64`, `super_8mm_home_movie`, `vhs_camcorder_tape`, `technicolor_3strip`, `silent_orthochromatic_1920s` |
| [`social_ugc_video.md`](./social_ugc_video.md) | `social_ugc_video` | Handheld mobile CMOS sensor aesthetic, casual handheld breathing micro-wobble, natural daylight | `direct_talking_head`, `pov_unboxing_asmr`, `lifestyle_travel_reel`, `street_vox_pop` |

---

## 3. Compiler Resolution & Injection Rules

When compiling a Google Flow Veo 3.1 video prompt (100–150 words):

1. **Step 1 (Select Medium):** Read `project_intent.md` $\rightarrow$ load Root Medium plugin (e.g. `traditional_2d_anime.md`).
2. **Step 2 (Determine Dialect):**
   * If creator provided **zero dialect customization**: Inject the verbatim **Section 1 Master Style Anchor String** into Tokens 81–130.
   * If creator specified a **dialect** (e.g. *"Studio Ghibli style"*): Substitute/augment Tokens 81–130 with the matched **Dialect Descriptor** from Section 2.
3. **Step 3 (Bind Negative Prompt):** Append the Base Medium's mandatory negative prompt clause (`Section 7`) combined with any dialect-specific negative tokens to the configuration object.
4. **Step 4 (Attach Native Foley Soundboard):** Generate trailing `Audio: SFX: [primary foley]; Ambience: [ambient room tone]; Dialogue: [spoken line or None]; Music: None.` using the 4-field semicolon syntax (`L-17`) and vocabulary from `Section 6`.
