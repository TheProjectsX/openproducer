# Specification: `environments/` Domain (Universal Environment & Scenery Specification)

**Status:** ✅ FINALIZED  
**Domain:** `environments/` (Universal Parent Domain for Narrative Worlds, Commercial Studio Sets, and Biomes)  
**Target Engines:** Google Flow (Veo 3.1, Imagen 4, Gemini Omni Flash), Runway Gen-3/4.5, Kling AI  

---

## 1. Domain Purpose & Philosophy

The `environments/` domain defines, stages, and locks the spatial geometry, motivated lighting, atmospheric medium, and diegetic acoustic profile of every location across a production. It eliminates **Flat Backdrop Syndrome**, **Atmospheric / Lighting Drift**, and **Background Canvas Warping** across sequential video cuts.

### The Core Environmental Principles:
1. **The 3-Plane Spatial Parallax Law:** Every environment must be explicitly layered into **Foreground**, **Midground**, and **Background**. When the camera moves in AI video, this forces the diffusion latent space to compute authentic multi-speed 3D parallax instead of 2D card warping.
2. **Motivated Lighting & Atmospheric Medium:** Light never exists in an empty vacuum. All illumination must originate from an identifiable physical vector (e.g. low-angle sunset, stage spotlights, overhead commercial softboxes) scattering through a tangible atmospheric medium (mist, dust motes, sea spray, or haze).
3. **The "Empty Stage" Reference Protocol (Google Flow Ingredient #2 / `[IMAGE 2]`):** For multi-shot continuity, reference plates stored in `environments/<id>/references/empty_stage.png` must strictly depict the **Empty Stage** (architecture, materials, and lighting with zero human characters or hero products). During **Tier 2 Keyframe Compositing**, `[IMAGE 2]` (Empty Stage) is combined with `[IMAGE 1]` (Primary Subject) and `[IMAGE 3]` (Secondary Subject/Prop) to generate a single pre-composited starting frame for Tier 3 Veo 3.1 video generation—eliminating subject and `#E5E5E5` background bleed across shots.
4. **Architectural Decoupling (Image Mode vs. Video Mode):**
   - **Still Image Prompts (Imagen 4 / FLUX / Midjourney):** Uncapped descriptive depth focusing on classical concept art depth (Repoussoir foreground, atmospheric perspective, staffage scale, and optical lens specs). Strictly bans camera motion verbs and audio blocks.
   - **Video Shot Prompts (Google Flow / Veo 3.1):** Continuous causal flow (100–150 words standard T2V, or 75–150 words Tier 3 I2V), single camera trajectory, and dedicated trailing 4-field `Audio:` soundscapes (`Audio: SFX: ...; Ambience: ...; Dialogue: ...; Music: ...`) per Linter `L-17`.

---

## 2. Directory Structure & File Contracts: `environments/<location_id>/`

Every distinct location or studio set is isolated in its own folder:

```text
environments/
└── <location_id>/                   # e.g., apocalyptic_beach/ or tabletop_studio/ or spotlight_arena/
    ├── summary.md                   # Human-readable world description, geography, or architectural notes
    ├── spatial_layers.md            # Prescriptive Foreground, Midground, and Background specifications
    ├── lighting_rig.md              # Key, fill, rim, practicals, softboxes, and atmospheric medium
    ├── acoustics.md                 # Diegetic room tone, reverberation profile, ambient soundscape
    ├── master_anchor.txt            # LOCKED 25–40 word environmental anchor string for prompt injection
    ├── reference_prompt.txt         # Generative prompt used to create the empty stage reference plate
    └── references/
        └── empty_stage.png          # Approved empty stage background plate (Google Flow Ingredient #2)
```

---

## 3. Template Specifications

### 3.1 `environments/<location_id>/summary.md` (Human Review Document)

```markdown
# Environment: [LOCATION_NAME]

## 1. Concept & Vibe
[1-2 paragraphs describing the location in conversational English: emotional tone, geographical or studio context, and world lore].

## 2. Environmental Archetype
- **Category:** [Narrative Cinematic World | Commercial Studio Stage | Abstract / Social Arena]
- **Time of Day & Weather:** [e.g., Late-afternoon catastrophic golden hour | Controlled dark studio void | Overcast diffused twilight]
- **Key Architectural Elements:** [e.g., Coastal beach bordered by glass skyscrapers | Circular obsidian plinth on seamless cyclorama | Wooden cabin interior]
- **Floor & Surface Textures:** [e.g., Wet reflective sand, damp mossy cobblestone, polished concrete]
```

### 3.2 `environments/<location_id>/spatial_layers.md` (The 3-Plane Parallax Standard)

```markdown
# Spatial Layers Specification

## 1. Foreground (Near Plane — Fast Motion)
- **Elements:** [e.g., Wet sand reflecting burning sky, discarded beach towels, weeping tree foliage, dark rocky bluff]
- **Depth Function:** Provides repoussoir framing; slides quickly across frame edges during camera tracking to accentuate depth.

## 2. Midground (Action Plane — Focal Subject Stage)
- **Elements:** [e.g., Shoreline surf, stampeding beachgoers, coastal roadway, product pedestal, central spotlight]
- **Depth Function:** The primary focal area where subjects, actors, or products operate.

## 3. Background (Infinity Plane — Slow Parallax)
- **Elements:** [e.g., Distant ocean horizon with swelling gravitational tidal wall, fragmented falling moon, distant skyline]
- **Depth Function:** Establishes scale, celestial phenomena, and stable horizon geometry.
```

### 3.3 `environments/<location_id>/lighting_rig.md` (Motivated Light Transport)

```markdown
# Lighting Rig Specification

## 1. Key Light Source
- **Physical Source:** [e.g., Blazing descending moon debris and low sunset | Dual overhead rectangular softboxes | Stark theatrical spotlight]
- **Color Temperature & Hue:** [e.g., 2800K warm incandescent amber | 5600K clean daylight white]
- **Angle & Direction:** [e.g., Low-angle back-rim lighting from seaward horizon | 45-degree top-down key]

## 2. Secondary & Fill Light
- **Fill / Bounce:** [e.g., Diffused golden ionization bounce off wet sand | Soft ambient cyclorama fill]
- **Practicals / Specular Reflections:** [e.g., Modern skyscraper glass facades mirroring celestial fire | Crisp linear softbox reflections on watch bezel]

## 3. Atmospheric Medium (Scattering)
- **Suspended Particulates:** [e.g., Dense sea spray mist, floating dust motes, drifting smoke, rain streaks]
```

### 3.4 `environments/<location_id>/acoustics.md` (Diegetic Soundscape)

```markdown
# Acoustic Profile Specification

## 1. Ambient Bed & Room Tone
- **Baseline Atmosphere:** [e.g., Deep bass oceanic rumble, howling coastal wind, dead studio acoustics with faint electrical hum]

## 2. Diegetic Foley Elements
- **Natural / Mechanical Sounds:** [e.g., Distant thunder, surging tidal crash, electrical switch clicks, water lapping]

## 3. Reverb Profile
- **Acoustic Space:** [e.g., Massive open outdoor coastline (infinite decay) | Dampened studio room (zero echo)]
```

### 3.5 `environments/<location_id>/master_anchor.txt` (Locked Injection String)

A locked, concise 25–40 word string deterministically injected into video shot prompts to lock the environment across cuts:

```text
[Vast coastal city beach bordered by reflective glass skyscrapers under a catastrophic amber sky, wet reflective sand shoreline meeting a swelling ocean horizon, filled with sea spray mist and dramatic golden-hour illumination]
```

---

## 4. Cross-Archetype Scenery Guidelines

### A. Narrative Cinema & Anime Worlds
- Prioritize **Atmospheric Perspective** and **Staffage Scale**: Tiny human silhouettes against massive environments communicate epic scale.
- Layer atmospheric particles (fog, smoke, dust) to provide a tangible medium for light scattering.

### B. Commercial Tabletop & Studio Stages
- **Name Studio Light Fixtures:** Always specify `"overhead rectangular softboxes"` or `"diffused strip softbox"`—this forces diffusion models to render clean, linear reflections across glass, metallic bezels, and liquid surfaces instead of chaotic glares.
- Use architectural staging terminology: `"seamless curved cyclorama studio wall"`, `"polished obsidian stone plinth"`, `"submerged water pedestal"`.

### C. Social Media UGC & 2D Conceptual Arenas
- Exploit **Minimalist High-Contrast Canvases**: Use textured cream sketchbook paper backgrounds, dramatic overhead spotlights, or void arenas where lighting functions as a storytelling metaphor.

---

## 5. Pre-Flight Environment Linting Checklist (Master Registry Mapping)

Before generating environment plates or compiling video prompts, the environment package must satisfy the authoritative Master Linters:
- **L-08 (Empty Stage & 3-Plane Environment):** The reference prompt and image in `references/empty_stage.png` contain zero human actors, faces, or hero products; prompt explicitly defines motivated foreground, midground, and background planes.
- **L-03 (Equipment Noun Ban):** Zero camera hardware nouns (`tripod`, `dolly track`, `drone`); only perspective and kinematic adjectives allowed in positive prompts.
- **L-04 (Config Decoupling):** Zero technical configuration specs (`16:9`, `1080p`) inside creative prompt text.
- **L-17 (Structured 4-Field Audio Syntax):** Environment acoustic profiles follow semicolon-delimited syntax (`Audio: SFX: None; Ambience: [Room Tone]; Dialogue: None; Music: None`).

