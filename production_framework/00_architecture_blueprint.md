# AI Video Generation Production Architecture Blueprint

## 1. Vision & Core Philosophy

Traditional generative video prompting relies on ephemeral, monolithic chat prompts. This approach inevitably fails in multi-shot narrative production due to:
- **Identity Drift:** Characters change facial structure, hair, and clothing between cuts.
- **Lighting & Spatial Inconsistency:** Environments randomly alter lighting directions, color palettes, and scale.
- **Attention Dilution:** Overly long prompts exceed the diffusion model's high-weight token window (Tokens 1–30), causing neglected instructions and hallucinated artifacts.
- **Unstructured Asset Management:** Concept art, reference sheets, audio cues, and dialogue lines remain disconnected and un-trackable.

### The File-System-Driven Production Standard
Rather than generating video directly from ephemeral chat dialog, we architect a **modular, folder-structured production pipeline**. Each creative and technical department in filmmaking—Screenplay, Characters, Sceneries, Cinematography, Soundscape, Storyboards, and Shots—operates as a dedicated directory with explicit data contracts, schemas, reference assets, and automated validation gates.

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           PROJECT MASTER MANIFEST                               │
│                                (project.json)                                   │
└────────┬───────────────────┬───────────────────┬───────────────────┬────────────┘
         │                   │                   │                   │
         ▼                   ▼                   ▼                   ▼
 ┌───────────────┐   ┌───────────────┐   ┌───────────────┐   ┌───────────────┐
 │  01_SCRIPTS   │   │ 02_CHARACTERS │   │  03_SCENERIES │   │04_CINEMATOG.  │
 │ Beat Sheet &  │   │ Identity Lock │   │ World & Light │   │ Optics, Lens  │
 │ Dialogue Lines│   │ Turnarounds   │   │ Geography     │   │ & Camera Move │
 └───────┬───────┘   └───────┬───────┘   └───────┬───────┘   └───────┬───────┘
         │                   │                   │                   │
         └─────────────┐     │     ┌─────────────┘                   │
                       ▼     ▼     ▼                                 │
             ┌─────────────────────────────────┐                     │
             │       05_SOUNDTRACK_AND_AUDIO   │                     │
             │ Foley, Ambience, Speech Syntax  │                     │
             └────────────────┬────────────────┘                     │
                              │                                      │
                              ▼                                      │
             ┌─────────────────────────────────┐                     │
             │         06_STORYBOARDS          │◄────────────────────┘
             │ Visual Panels & Pacing Layout   │
             └────────────────┬────────────────┘
                              │
                              ▼
             ┌─────────────────────────────────┐
             │            07_SHOTS             │
             │ Veo-JSON Specs, Compiled Prompts│
             │ Linter Reports, Keyframe Links  │
             └────────────────┬────────────────┘
                              │
                              ▼
             ┌─────────────────────────────────┐
             │           08_PIPELINE           │
             │ Automated Compilers & Linters   │
             │ Timeline Manifest for Flow      │
             └─────────────────────────────────┘
```

---

## 2. Directory Hierarchy & Department Responsibilities

```text
<project_root>/
├── project.json                      # Master Project Configuration & Specs
│
├── 01_scripts/                       # Department: Screenplay & Narrative
│   ├── 00_logline_and_premise.md     # Narrative hook, genre, themes, pacing profile
│   ├── beat_sheet.json               # 3-Act structural breakdown & duration budgets
│   ├── scenes/                       # Scene-by-scene screenplay breakdowns
│   │   ├── scene_01.md
│   │   └── scene_02.md
│   └── dialogue_bible.json           # Indexed dialogue lines with delivery modifiers
│
├── 02_characters/                    # Department: Casting & Identity Locking
│   ├── character_bible.json          # Master cast registry
│   └── <character_id>/               # Isolated character directory (e.g. arthur/)
│       ├── profile.md                # Demographics, anatomy, wardrobe textures, voice
│       ├── verbatim_anchor.txt       # LOCKED Master Anchor String (strictly reused)
│       ├── turnaround_prompt.txt     # Imagen prompt for 3-angle neutral cyclorama sheet
│       ├── references/               # Neutral turnaround sheets & prop references
│       └── rules.md                  # Character-specific failure guards & constraints
│
├── 03_sceneries/                     # Department: Production Design & World-Building
│   ├── location_bible.json           # Master location registry
│   └── <location_id>/                # Isolated environment directory (e.g. harbor_pier/)
│       ├── description.md            # Spatial geometry (Foreground, Midground, Background)
│       ├── lighting_setup.md         # Motivated light sources, temperature, practical fixtures
│       ├── reference_prompt.txt      # Prompt for environment reference concept board
│       ├── references/               # Concept keyframes & lighting references
│       └── acoustic_profile.md       # Room tone, reverb, natural environmental soundscape
│
├── 04_cinematography/                # Department: Camera & Optical Standards
│   ├── lens_profiles.json            # Focal lengths (14mm to 200mm, anamorphic vs spherical)
│   ├── camera_movements.json         # Taxonomy of allowed single camera verbs
│   ├── lighting_presets.json         # Motivated rigs (chiaroscuro, volumetric, soft wrap)
│   └── film_stocks.json              # Kodak Vision3, Kodachrome, bleach bypass, color palettes
│
├── 05_soundtrack_and_audio/          # Department: Acoustic Soundscape Engineering
│   ├── audio_manifest.json           # Sound design hierarchy per scene
│   ├── foley_library.json            # Physical contact sounds (footfalls, cloth rustle, latches)
│   ├── ambience_library.json         # Environmental background soundscapes
│   ├── dialogue_syntax_rules.md      # Speech syntax: verbs, preceding colons, sentence case
│   └── safety_vocabulary_map.json    # Safe acoustic equivalents to avoid false positives
│
├── 06_storyboards/                   # Department: Visual Pacing & Composition
│   ├── storyboard_manifest.json      # Chronological sequence of visual panels
│   └── panels/                       # Storyboard panel definitions & concept art
│       ├── panel_01.json
│       ├── panel_01.png
│       ├── panel_02.json
│       └── panel_02.png
│
├── 07_shots/                         # Department: Shot Units & Prompt Compilation
│   ├── shot_list.json                # Master sequence of all shots (durations, cuts)
│   └── <shot_id>/                    # Isolated shot package (e.g. SH_01/)
│       ├── shot_spec.json            # Veo-JSON definition linking character, location, optics
│       ├── keyframes/                # Frame extraction assets (first_frame / last_frame)
│       ├── compiled_prompt.txt       # Production-ready front-loaded Veo 3.1 prompt
│       └── lint_report.json          # Automated L-01 to L-06 quality verification report
│
└── 08_pipeline/                      # Department: Tooling & Automation
    ├── compile_shot.py               # Deterministic JSON -> Prompt compiler
    ├── lint_shot.py                  # Automated 6-point pre-flight quality validator
    ├── chain_continuity.py           # Validates keyframe chaining across sequential shots
    └── export_flow_manifest.py       # Generates scene assembly manifest for Google Flow
```

---

## 2. Department Responsibilities & Data Contracts

### 2.1 Department 01: Scripts (`01_scripts/`)
- **Responsibility:** Establishes dramatic structure and temporal pacing.
- **Key Artifacts:**
  - `beat_sheet.json`: Allocates shot durations (4s, 6s, 8s) to specific dramatic moments to prevent pacing stagnation.
  - `dialogue_bible.json`: Centralizes all spoken text, tagging each line with:
    - `speaker`: Character identifier.
    - `attribution_verb`: Direct speech trigger (`says`, `whispers`, `shouts`).
    - `delivery_modifier`: Emotional/physical quality (`with quiet urgency`, `breathless`).
    - `spoken_line`: Strictly sentence-case text (never ALL CAPS).

### 2.2 Department 02: Characters (`02_characters/`)
- **Responsibility:** Absolute identity, wardrobe, and anatomical locking.
- **Key Protocols:**
  - **Verbatim Anchor String:** A locked 25–40 word anatomical and wardrobe description. The compiler pulls this text into every shot involving this character without altering a single syllable.
  - **Neutral Reference Sheet Standard:** Turnaround sheets generated on neutral off-white/light-grey cycloramas to prevent background contamination during I2V / Ingredients generation.

### 2.3 Department 03: Sceneries (`03_sceneries/`)
- **Responsibility:** Defining 3D spatial depth, environmental atmosphere, and motivated light.
- **Key Protocols:**
  - **Depth Plane Allocation:** Explicitly defines foreground occluders, midground action plane, and background horizons.
  - **Motivated Lighting Map:** Identifies visible practicals (lamps, neon, fires) and their physical bounce characteristics.

### 2.4 Department 04: Cinematography (`04_cinematography/`)
- **Responsibility:** Optical physics and kinematic constraints.
- **Key Protocols:**
  - **Single Camera Verb Rule:** Enforces exactly one primary motivated camera motion per shot.
  - **Focal Length Assignment:** Governs field-of-view and background compression (e.g. 24mm anamorphic for landscapes; 85mm prime for emotional close-ups).

### 2.5 Department 05: Soundtrack & Audio (`05_soundtrack_and_audio/`)
- **Responsibility:** Native dual-stream acoustic soundscape design.
- **Key Protocols:**
  - **Acoustic Layering:** Foley + Ambience + Dialogue.
  - **Music Suppression:** Always enforces `, no background music` in the trailing audio block.
  - **Acoustic Safety Translation:** Maps trigger words like "screaming" or "police siren" to safe sensory equivalents.

### 2.6 Department 06: Storyboards (`06_storyboards/`)
- **Responsibility:** Visual pre-visualization and transition planning.
- **Key Protocols:**
  - Tracks transition types: Hard Cut, Continuous Action Chaining, Match Cut, Whip Pan.
  - Generates 16:9 still keyframe compositions via Imagen.

### 2.7 Department 07: Shots (`07_shots/`)
- **Responsibility:** Executable generation units.
- **Key Protocols:**
  - Each shot folder (`SH_01/`, `SH_02/`) contains the complete programmatic specification (`shot_spec.json`) and compiled prompt (`compiled_prompt.txt`).
  - Pre-flight lint report (`lint_report.json`) must pass all 6 checks (`L-01` through `L-06`) before submission.

### 2.8 Department 08: Pipeline (`08_pipeline/`)
- **Responsibility:** Automated orchestration and data integration.
- **Key Tools:**
  - `compile_shot.py`: Merges data from `characters/`, `sceneries/`, `cinematography/`, and `audio/` into the front-loaded prompt string.
  - `lint_shot.py`: Runs automated quality assertions.
  - `export_flow_manifest.py`: Packages assembled shots into Google Flow Scene Builder timeline format.

---

## 3. Next Implementation Milestones

1. **Phase 5.1:** Finalize Folder Schemas & Template Definitions (`project.json`, `shot_spec.json`, `character_bible.json`).
2. **Phase 5.2:** Build Reusable Template Directory (`production_template/`).
3. **Phase 5.3:** Implement Core Automation Scripts (`compile_shot.py`, `lint_shot.py`).
4. **Phase 5.4:** Create End-to-End Reference Production Project (e.g., a complete 3-shot sequence demonstrating the entire file-system workflow).
