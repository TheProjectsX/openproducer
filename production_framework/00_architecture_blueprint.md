# AI Video Generation Production Architecture Blueprint

**Status:** Authoritative Architectural Standard  
**Target Engines:** Google Flow (Veo 3.1, Imagen 4, Gemini Omni Flash)  
**Core Paradigms:** Multipurpose Video Production, AI-Centric Operating System, Mode-Based Execution (`explore`, `propose`, `sync`, `apply`)

---

## 1. Vision & Core Philosophy

Traditional generative video tools rely on ephemeral, monolithic chat prompts. In multi-shot video generation, this creates five catastrophic failure modes:
1. **Identity & Geometry Drift:** Human faces warp, wardrobes mutate, or product logos, buttons, and silhouettes distort between cuts.
2. **Style & Lighting Drift:** Color saturation, film grain, lighting angles, and render styles shift randomly across shots.
3. **Attention Dilution:** Prompts exceeding 150 words overwhelm the diffusion attention mechanism, causing ignored instructions and visual artifacts.
4. **Camera Equipment Hallucination:** Prompting physical gear (e.g. *"on locked tripod"*, *"dolly track"*) prompts Gemini/Veo to literally render physical camera equipment inside the scene.
5. **Session Disconnection:** Creative decisions made during chat are lost when context windows truncate or when switching devices.

### The AI-Centric, File-System-Driven Solution
In our framework:
- **The Creator interacts through natural conversation.** They do not need to navigate complex directories.
- **The AI Agent is the production operating system.**
- **The File System is the AI's deterministic external memory and modular prompt assembly line.**

Every creative asset—style DNA, invariant subject geometry, 3-plane environment depth, camera kinematics, and acoustic soundscapes—is isolated in predictable files. When compiling a shot, the AI surgically pulls these modular blocks into a pure, front-loaded 100–150 word Veo 3.1 prompt.

---

## 2. The 5 Universal Generative Primitives

Google Flow can generate any video: 15-second sneaker commercials, 9:16 vertical TikTok hooks, high-end anime shorts, nature documentaries, or music visualizers. Despite wildly different aesthetics, **all video archetypes decompose into the exact same 5 generative primitives**:

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                             THE 5 GENERATIVE PRIMITIVES                          │
└────────┬───────────────────┬───────────────────┬───────────────────┬─────────────┘
         │                   │                   │                   │
         ▼                   ▼                   ▼                   ▼
 ┌───────────────┐   ┌───────────────┐   ┌───────────────┐   ┌───────────────┐
 │  VISUAL DNA   │   │    SUBJECT    │   │  ENVIRONMENT  │   │  KINEMATICS   │
 │   (visual/)   │   │  (subjects/)  │   │(environments/)│   │   (& OPTICS)  │
 │ Master Style  │   │  Characters   │   │ Narrative Set │   │ Single Camera │
 │ Color Science │   │ Products/Cars │   │ Studio Plinth │   │   Motivated   │
 │ Sensor Profile│   │   Creatures   │   │ Natural Biome │   │  Kinematics   │
 └───────┬───────┘   └───────┬───────┘   └───────┬───────┘   └───────┬───────┘
         │                   │                   │                   │
         └─────────────┐     │     ┌─────────────┘                   │
                       ▼     ▼     ▼                                 │
             ┌─────────────────────────────────┐                     │
             │           ACOUSTICS             │                     │
             │       Foley, Room Tone,         │                     │
             │        Speech Delivery          │                     │
             └────────────────┬────────────────┘                     │
                              │                                      │
                              ▼                                      ▼
             ┌─────────────────────────────────────────────────────────┐
             │                PROMPT ASSEMBLY COMPILER                 │
             │        Tokens 1–30: Viewport & Primary Subject          │
             │        Tokens 31–80: Action/Physics & Motivated Light   │
             │        Tokens 81–130: Master Style & Camera Verb        │
             │        Trailing: Dedicated Audio Soundscape Block       │
             └────────────────────────┬────────────────────────────────┘
                                      │
                                      ▼
             ┌─────────────────────────────────────────────────────────┐
             │               COMPILED VEO 3.1 SHOT UNIT                │
             │       + Decoupled API Config (16:9/9:16, 1080p, 8s)     │
             │       + Pre-Composited Tier 2 Keyframe (from Ingr. 1–3) │
             └─────────────────────────────────────────────────────────┘
```

1. **Visual DNA (`visual/`):** The locked optical and aesthetic foundation (e.g., 35mm bleach bypass film grain, high-gloss advertising tabletop, 2D hand-drawn cel anime). Injected into every prompt to prevent Style Drift.
2. **Subject Consistency (`subjects/`):** Rigid identity and physical geometry locking. Whether the subject is an actor (Maya Lin) or a product (Chrono-X luxury watch), it uses the **2-Step Turntable Protocol on `#E5E5E5`** to produce a 4-view reference sheet (Ingredient #1) and a locked 25–40 word verbatim anchor.
3. **Environmental Staging (`environments/`):** Defines spatial depth and motivated lighting. Supports Narrative Worlds (3-plane depth for parallax), Commercial Studio Sets (infinity cycloramas, submerged plinths), and Biomes.
4. **Kinematics & Optics:** Dedicated perspective descriptors enforcing the **Single Camera Verb Rule** and strictly banning physical equipment nouns (`tripod`, `dolly`, `crane`).
5. **Acoustic Soundscapes:** Native dual-stream audio synthesis formatted in the 4-field semicolon syntax (`Audio: SFX: ...; Ambience: ...; Dialogue: ...; Music: ...`) per Linter `L-17`.

---

## 3. Top-Level Governance: Intent & Living Blueprint

To make the system truly autonomous, transparent, and resilient across multi-session handoffs, the root directory houses two governance documents:

### 3.1 Top-Level Project Intent Manifest (`project_intent.md`)
The permanent north star locking project archetype, target platform, technical parameters, and architectural guardrails:
```markdown
# Project Intent Manifest

- **Project Title:** [Title]
- **Project Archetype:** [Commercial | Cinema | Social UGC | Documentary | Visualizer]
- **Target Platform:** [e.g., Instagram Reels, TikTok, YouTube 16:9, Cinema Festival]
- **Technical Format:** [Aspect Ratio e.g. 9:16 | Resolution e.g. 1080p | Total Duration e.g. 15s]
- **Primary Objective:** [1-2 sentences capturing core goal]

## Architectural Scope & Guardrails
- **Subjects Included:** [e.g., 1 Hero Product (`subjects/chrono_watch/`)]
- **Subjects Excluded:** [e.g., NO human actors, NO character bibles]
- **Environments Included:** [e.g., 1 Commercial Studio Stage (`environments/dark_water_plinth/`)]
- **Audio Scope:** [e.g., Pure tactile ASMR (clicks, water splashes, ticking)]
- **Dialogue Policy:** [STRICTLY NONE | Sentence-case speech with delivery modifiers]
- **Structure Policy:** [Commercial Hook-Showcase-CTA | 3-Act Beat Sheet | Looping Visualizer]
```

### 3.2 The Living Collaboration Blueprint (`blueprint.md`)
An active, chronological scratchpad documenting the step-by-step dialogue between creator and AI. Before ideas are formally serialized into structured folders, they live here:
```markdown
### Step [N]: [Milestone Title]
- **Creator Input:** [Raw transcription of what the creator envisioned]
- **Agent Interpretation:** [How the Agent mapped this request onto framework primitives]
- **Actions Taken:** [Concrete files created, updated, or compiled]
- **Next Step:** [Immediate pending task awaiting creator feedback or execution]
```

---

## 4. The 5 Major Video Archetypes

The framework automatically configures its depth based on the selected Project Archetype:

| Archetype | Primary Subject | Environment / Set | Kinematics Focus | Audio Need | Structural Pacing |
|---|---|---|---|---|---|
| **1. Narrative Cinema & Anime** | Human / Stylized Character (`subjects/<char_id>/`) | Cinematic World (`environments/<loc_id>/`) | Storytelling coverage (push-in, clean singles with 15° eyelines, tracking) | Dialogue delivery + diegetic foley + room tone | 3-Act Beat Sheet (`structure/beat_sheet.json`) |
| **2. Commercial & Product Spotlight** | Hero Product / Artifact (`subjects/<prod_id>/`) | Studio Cyclorama, Reflective Plinth, Water Pool | 360° orbital spin, macro slow-motion (120fps) | Tactile ASMR foley (clicks, pours, swooshes, bass drop) | Hook $\rightarrow$ Showcase $\rightarrow$ Call to Action |
| **3. Social Media & UGC / Hooks** | Creator or Focal Object | Real-world aesthetic locations, vertical 9:16 | Fast whip-pans, dynamic handheld, scroll-stopping hooks | High-energy ambient buzz, tactile ASMR, voiceover | 3-second hook sequence + rapid cuts |
| **4. Documentary & Nature** | Wildlife, Real Subject, Architecture | Natural biomes, aerial landscapes | Slow telephoto tracking, majestic high-altitude bird's-eye sweeping reveals | Raw natural soundscapes (wind, wildlife, water) | Observational timeline beats |
| **5. Music Video & Abstract** | Abstract geometry, performers, surreal objects | Liquid voids, neon dreamscapes, Brutalist spaces | Continuous flow, stepped motion, rhythmic zooms | Beat-synchronized motion, stylized silence | Rhythmic track timeline |

---

## 5. Unified Project Directory Contract

```text
<project_root>/
├── project_intent.md                 # LOCKED: Top-level Archetype, Platform, & Scope Guardrails
├── blueprint.md                      # LIVING: Chronological raw collaboration scratchpad
│
├── visual/                           # Department: Visual Style DNA
│   ├── style_summary.md              # Human-facing description of the look and mood
│   ├── palette_and_mood.md           # Color values, contrast profile, lighting behaviour
│   └── technical_anchor.md           # LOCKED Master Style Anchor for Veo injection
│
├── subjects/                         # Department: Identity & Geometry Locking
│   └── <subject_id>/                 # e.g., maya_lin/ or chrono_watch/
│       ├── profile.md                # Biometrics/Materials, anatomy/dimensions, acoustics
│       ├── verbatim_anchor.txt       # LOCKED 25–40 word Master Anchor String
│       ├── hero_prompt.txt           # Step 1 prompt (Canonical Hero Portrait / Product Shot)
│       ├── turnaround_prompt.txt     # Step 2 prompt (4-view model sheet on #E5E5E5)
│       ├── rules.md                  # Invariant constraints & anti-warping guards
│       └── references/
│           ├── hero_portrait.png     # Approved Step 1 base image
│           └── turnaround_sheet.png  # Approved Step 2 model sheet (Ingredient #1 in Flow)
│
├── environments/                     # Department: World Locations OR Commercial Studio Stages
│   └── <environment_id>/             # e.g., ruined_street/ or dark_water_plinth/
│       ├── summary.md                # Human-readable world description, geography, or studio notes
│       ├── spatial_layers.md         # Prescriptive Foreground, Midground, and Background planes
│       ├── lighting_rig.md           # Motivated light sources, temperature, practical fixtures
│       ├── acoustics.md              # Diegetic room tone, reverberation profile, ambient soundscape
│       ├── master_anchor.txt         # LOCKED 25–40 word environmental anchor string
│       ├── reference_prompt.txt      # Prompt for empty stage reference plate
│       └── references/
│           └── empty_stage.png       # Approved empty stage reference (Ingredient #2 in Flow)
│
├── structure/                        # Department: Sequencing & Pacing (Scale-Adaptive)
│   ├── sequence_manifest.json        # Shot sequencing (Commercial 3-part or Cinema Beat Sheet)
│   └── dialogue_bible.json           # Spoken lines with delivery tags (Omitted if non-speaking)
│
├── shots/                            # Department: Director's Cut & Executable Clip Units
│   ├── base_image_prompt.txt         # [Tier 1] Master Style & Subject DNA Reference Anchor Plate
│   ├── scratchbook.md                # Director's Pacing Ledger (Beats, Words, Actions, Timing)
│   ├── master_images_prompt.txt      # Master manifest for ALL IMAGE generation (Tier 1 & Tier 2 plates)
│   ├── master_videos_prompt.txt      # Master manifest for ALL VIDEO generation (Tier 3 Veo prompts)
│   ├── narrator_script.md            # (Conditional) TTS script with word-to-time pacing
│   ├── dialogue_scripts.md           # (Conditional) Character cue sheet manifest
│   ├── origin_manifest.md            # Ledger mapping assets to engine origins & L-01..L-18 audit
│   ├── lint_report.json              # Automated L-01 to L-18 pre-flight verification report
│   └── clips/                        # Isolated clip packages (e.g. clip_01/, clip_02/)
│       └── <clip_id>/
│           ├── image_prompt.txt      # [Tier 2] Starting Keyframe Plate (Conditioned on Tier 1)
│           └── video_prompt.txt      # [Tier 3] Image-to-Video Motion & Audio Prompt (75–150w)
│
└── pipeline/                         # Department: Node.js CLI Tooling (`npx @theprojectsx/video-skill`)
    ├── compile.js                    # Deterministic JSON/Markdown -> Front-loaded prompt compiler
    ├── lint.js                       # Automated 18-point (L-01 to L-18) pre-flight quality validator
    ├── chain.js                      # Validates keyframe & last_frame continuity chaining across clips
    └── export.js                     # Generates Google Flow Scene Builder & NLE timeline manifests
```

---

## 6. The 5 Operational Modes (OpenSpec Paradigm)

To guarantee complete session independence and rapid production recycling across devices and conversations, the agent moves through 5 explicit modes:

```
┌──────────────────┐       ┌──────────────────┐       ┌──────────────────┐       ┌──────────────────┐
│      MODE 1      │       │      MODE 2      │       │      MODE 3      │       │      MODE 4      │
│     EXPLORE      │ ────► │     PROPOSE      │ ────► │       SYNC       │ ────► │      APPLY       │
│  (Brainstorming) │       │(Production Plan) │       │ (Lock & Validate)│       │ (Compile & Lint) │
└─────────▲────────┘       └──────────────────┘       └──────────────────┘       └────────┬─────────┘
          │                                                                               │
          │                        ┌──────────────────┐                                   │
          │                        │      MODE 5      │                                   │
          └────────────────────────┤     TEMPLATE     │◄──────────────────────────────────┘
            Hydrates new project   │  (Save / Load)   │  Exports approved production
            from saved template    └──────────────────┘  as reusable OpenSpec asset
```

1. **Mode 1 (`explore`):** Aligns on concept. Writes `project_intent.md`, `blueprint.md`, and initial domain files in `visual/`, `subjects/`, and `environments/`.
2. **Mode 2 (`propose`):** Generates structured proposals: 2-step turnaround prompts, spatial setups, and shot breakdown.
3. **Mode 3 (`sync`):** Creator reviews, provides feedback, and locks Master Anchors and approved reference images (Ingredients).
4. **Mode 4 (`apply`):** Compiles front-loaded prompts, executes pre-flight linting, and packages assets for Google Flow.
5. **Mode 5 (`template`):** OpenSpec-style template management.
   - **`template save <template_id>`:** Packages approved visual styles, environmental rigs, and camera blueprints into a reusable local package (`templates/<template_id>/`).
   - **`template list`:** Enumerates all saved templates on the user's PC.
   - **`template load <template_id>` (or `explore --template <template_id>`):** Instantly hydrates a fresh workspace with locked intent, visual DNA, and scaffolding, skipping repetitive greenfield discovery.
   - **Unique Identifiers:** Standardized kebab-case format (e.g. `stickfigure-longform`, `tabletop-commercial-15s`, `midnight-automotive-drift`).

---

## 7. Master Pre-Flight Linters (Authoritative Registry L-01 to L-18)

Before any prompt is submitted to Google Flow, the pipeline validates it against the authoritative 18-rule registry defined in [`specs/05_directors_cut_assembly_spec.md`](specs/05_directors_cut_assembly_spec.md#8-master-pre-flight-linters-authoritative-registry-l-01-to-l-18):
- **Universal Prompt Purity:** `L-01` (Word Economy: 100–150w T2V, 75–150w Tier 3 I2V), `L-02` (Attention Front-Loading: Tokens 1–30), `L-03` (Equipment Noun Ban in positive prompt), `L-04` (Decoupled Configuration; stepped cadence whitelisted), `L-05` (Anti-Subtitle & Non-Render Guardrail).
- **Subject, Prop & Environment Integrity:** `L-06` (Subject DNA Verbatim vs. Lean Reference Anchor), `L-07` (Pre-Materialized Prop Guard), `L-08` (Empty Stage & 3-Plane Environment).
- **Temporal Slicing & Kinematics:** `L-09` (Flow Native Duration Lock: `{4s, 6s, 8s, 10s}`), `L-10` (Single-Motion De-Cramming & Clock Bracket Ban), `L-11` (Continuity Chaining Syntax), `L-12` (30° Contrast & Anti-Jump-Cut), `L-13` (180° Screen Direction & Clean Singles; OTS Ban).
- **Audio, Dialogue & Scripting:** `L-14` (Dual-Track Speech Word Budget & $\ge 1.0\text{s}$ Buffer), `L-15` (Anti-Muppet Biomechanical Restraints & Sentence Case), `L-16` (Closed-Lip Listener Rule), `L-17` (Structured 4-Field Audio Syntax), `L-18` (Gemini TTS Tag Formatting & Non-Imposition Law).

