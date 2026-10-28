# OpenProducer Dynamic Workspace Schema

This document serves as the declarative file system contract for OpenProducer. When initializing a project, the AI Agent dynamically generates the files below tailored to the creator's vision.

---

## 1. Operating Tiers

### Tier 1: Lean Base-Reference (Default for 80% of Productions)
* **Use Cases:** Social UGC (TikTok/Reels), Solo Host Explainers, 2D Stick-Figure animation, Single-Product commercial ads.
* **Core Characteristic:** 1 Subject + 1 Setting. Uses a single `base_image_prompt.txt` to lock face, room, lighting, and style simultaneously. No `subjects/` or `environments/` subdirectories.

```text
<project_root>/
├── openproducer/                  # Internal Producer Engine
│   ├── config.json                # Project settings (aspect_ratio, archetype, audio_pathway)
│   ├── state.json                 # Interactive stage tracker (current_stage, active_gate)
│   ├── blueprint.md               # Chronological collaboration notes
│   ├── manifest.json              # Pre-flight linter audit ledger (L-01 to L-19)
│   └── visual/
│       └── technical_anchor.txt   # Injected master style anchor string
│
├── base_image_prompt.txt          # Tier 1 Base Reference Image Prompt (with [IMAGE 1] conditioning)
├── references/                    # Image directory (creator_photo.jpg, base_image.jpg)
├── clips/                         # Clip directories (clip_01, clip_02...)
│   └── clip_XX/
│       ├── image_prompt.txt       # Tier 2: Start-frame image prompt
│       └── video_prompt.txt       # Tier 3: Veo 3.1 video kinematics, dialogue & audio
├── master_videos_prompt.txt       # 1-click clipboard compilation for Google Flow
├── scratchbook.md                 # Script timeline budget table & retake log
└── motion_graphics.md             # Subtitle cues & on-screen typography specs
```

---

### Tier 2: Modular Studio (Multi-Character & Multi-Scene Productions)
* **Use Cases:** Narrative cinema, short films, multi-actor dialogue, multi-location stories.
* **Core Characteristic:** Birthed from a **Genesis Master Style Plate** (`references/genesis_style.jpg`). Cast dossiers and stage plates reside in `openproducer/` so the project root stays clean.

```text
<project_root>/
├── openproducer/
│   ├── config.json                # Tier: "modular_studio", Aspect: "16:9", Cinema
│   ├── state.json                 # Scene completion tracker
│   ├── blueprint.md               # Screenplay director notes
│   ├── manifest.json              # Linter audit ledger
│   ├── visual/                    # Visual style anchor & genesis prompt
│   ├── subjects/<subject_id>/     # Profile, hero prompt, 4-view turnaround sheet
│   └── environments/<env_id>/     # Summary, lighting rig, empty stage plate
│
├── references/                    # genesis_style.jpg
├── clips/                         # Grouped by scene: clips/scene_01/clip_01/
├── master_videos_prompt.txt       # Scene-grouped Flow compilation with ingredient bindings
├── scratchbook.md                 # Multi-character script slicing, eyeline vectors, audio bridges
└── motion_graphics.md             # Title cards, lower thirds, subtitle cue sheet
```

---

## 2. The 2-Phase Interactive Workflow

1. **Phase 1: One-Pass Synthesis:**
   * Agent generates all tailored files on disk immediately upon creative intake.
   * Agent asks creator: *"Your package is ready! Would you like the Step-by-Step Guided Run?"*
2. **Phase 2: Step-by-Step Guided Run:**
   * **Gate 1 (Base Image Lock):** Test `base_image_prompt.txt` in Flow. Loop on revisions until approved.
   * **Gate 2 (Audio & Script Review):** Verify pacing, L-19 safety, and audio bridges.
   * **Gate 3 (Clip-by-Clip Render):** Walk through clip prompts with exact Flow ingredient bindings.
   * **Gate 4 (Retake Doctor):** Post-generation triage for speech repeats, dead air, or text spoilers.
