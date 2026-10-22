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
             │       + Ingredients #1 & #2 (Reference Turnarounds)     │
             └─────────────────────────────────────────────────────────┘
```

1. **Visual DNA (`visual/`):** The locked optical and aesthetic foundation (e.g., 35mm bleach bypass film grain, high-gloss advertising tabletop, 2D hand-drawn cel anime). Injected into every prompt to prevent Style Drift.
2. **Subject Consistency (`subjects/`):** Rigid identity and physical geometry locking. Whether the subject is an actor (Maya Lin) or a product (Chrono-X luxury watch), it uses the **2-Step Turntable Protocol on `#E5E5E5`** to produce a 4-view reference sheet (Ingredient #1) and a locked 25–40 word verbatim anchor.
3. **Environmental Staging (`environments/`):** Defines spatial depth and motivated lighting. Supports Narrative Worlds (3-plane depth for parallax), Commercial Studio Sets (infinity cycloramas, submerged plinths), and Biomes.
4. **Kinematics & Optics:** Dedicated perspective descriptors enforcing the **Single Camera Verb Rule** and strictly banning physical equipment nouns (`tripod`, `dolly`, `crane`).
5. **Acoustic Soundscapes:** Native dual-stream audio synthesis specifying tactile ASMR foley, diegetic room tone, or delivery-tagged speech, concluding with `, no background music`.

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
| **1. Narrative Cinema & Anime** | Human / Stylized Character (`subjects/<char_id>/`) | Cinematic World (`environments/<loc_id>/`) | Storytelling coverage (push-in, over-the-shoulder, tracking) | Dialogue delivery + diegetic foley + room tone | 3-Act Beat Sheet (`structure/beat_sheet.json`) |
| **2. Commercial & Product Spotlight** | Hero Product / Artifact (`subjects/<prod_id>/`) | Studio Cyclorama, Reflective Plinth, Water Pool | 360° orbital spin, macro slow-motion (120fps) | Tactile ASMR foley (clicks, pours, swooshes, bass drop) | Hook $\rightarrow$ Showcase $\rightarrow$ Call to Action |
| **3. Social Media & UGC / Hooks** | Creator or Focal Object | Real-world aesthetic locations, vertical 9:16 | Fast whip-pans, dynamic handheld, scroll-stopping hooks | High-energy ambient buzz, tactile ASMR, voiceover | 3-second hook sequence + rapid cuts |
| **4. Documentary & Nature** | Wildlife, Real Subject, Architecture | Natural biomes, aerial landscapes | Slow telephoto tracking, majestic drone reveals | Raw natural soundscapes (wind, wildlife, water) | Observational timeline beats |
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
│       ├── description.md            # Spatial geometry (3-plane depth OR studio stage setup)
│       ├── lighting_rig.md           # Motivated light sources, temperature, practical fixtures
│       ├── reference_prompt.txt      # Prompt for environment reference concept board
│       ├── acoustic_profile.md       # Room tone, reverb, natural environmental soundscape
│       └── references/
│           └── concept_board.png     # Approved environment reference (Ingredient #2 in Flow)
│
├── structure/                        # Department: Sequencing & Pacing (Scale-Adaptive)
│   ├── sequence_manifest.json        # Shot sequencing (Commercial 3-part or Cinema Beat Sheet)
│   └── dialogue_bible.json           # Spoken lines with delivery tags (Omitted if non-speaking)
│
├── shots/                            # Department: Executable Generation Units
│   ├── shot_list.json                # Master sequence of all shots (durations, cuts)
│   └── <shot_id>/                    # Isolated shot package (e.g. SH_01/)
│       ├── shot_config.json          # Decoupled API config (aspect_ratio, duration, resolution)
│       ├── compiled_prompt.txt       # Production-ready 100–150 word Veo 3.1 prompt
│       ├── keyframes/                # First frame / last frame continuity assets
│       └── lint_report.json          # Automated L-01 to L-06 quality verification report
│
└── pipeline/                         # Department: Tooling & Automation
    ├── compile_shot.py               # Deterministic JSON -> Front-loaded prompt compiler
    ├── lint_shot.py                  # Automated 6-point pre-flight quality validator
    ├── chain_continuity.py           # Validates keyframe chaining across sequential shots
    └── export_flow_manifest.py       # Generates scene assembly manifest for Google Flow
```

---

## 6. The 4 Operational Modes (OpenSpec Paradigm)

To guarantee complete session independence across devices and conversations, the agent moves through 4 explicit modes:

```
┌──────────────────┐       ┌──────────────────┐       ┌──────────────────┐       ┌──────────────────┐
│      MODE 1      │       │      MODE 2      │       │      MODE 3      │       │      MODE 4      │
│     EXPLORE      │ ────► │     PROPOSE      │ ────► │       SYNC       │ ────► │      APPLY       │
│                  │       │                  │       │     (ALIGN)      │       │                  │
│ • Lock Intent    │       │ • Beat Breakdown │       │ • Creator Review │       │ • Final Prompts  │
│ • Set Visual DNA │       │ • Shot Timing    │       │ • Lock Anchors   │       │ • 6-Point Lint   │
│ • Subject Traits │       │ • Rig Setups     │       │ • Tweak Motions  │       │ • Flow Assets    │
└──────────────────┘       └──────────────────┘       └──────────────────┘       └──────────────────┘
```

1. **Mode 1 (`explore`):** Aligns on concept. Writes `project_intent.md`, `blueprint.md`, and initial domain files in `visual/`, `subjects/`, and `environments/`.
2. **Mode 2 (`propose`):** Generates structured proposals: 2-step turnaround prompts, spatial setups, and shot breakdown.
3. **Mode 3 (`sync`):** Creator reviews, provides feedback, and locks Master Anchors and approved reference images (Ingredients).
4. **Mode 4 (`apply`):** Compiles front-loaded prompts, executes pre-flight linting, and packages assets for Google Flow.

---

## 7. Automated Pre-Flight Linting Rules (`lint_shot.py`)

Before any prompt is submitted to Google Flow, the pipeline validates it against 6 hard rules:
- **`L-01` (Word Economy):** Total prompt length must be strictly between 100 and 150 words.
- **`L-02` (Attention Front-Loading):** Primary subject anchor and camera framing must appear within the first 30 tokens.
- **`L-03` (No Equipment Nouns):** Zero physical camera hardware nouns (`tripod`, `dolly`, `crane`, `rig`). Only kinematic and perspective adjectives allowed.
- **`L-04` (Decoupled Configuration):** Zero technical video parameters (`16:9`, `1080p`, `24fps`, `8s`) inside prompt text.
- **`L-05` (Invariant Subject Verification):** Verbatim anchor string from `subjects/<id>/verbatim_anchor.txt` must appear character-for-character without deviation.
- **`L-06` (Audio Purity):** Audio block must begin with `Audio:` and conclude with `, no background music`.
