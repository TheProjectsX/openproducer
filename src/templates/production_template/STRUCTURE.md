# OpenProducer Dynamic Workspace Schema

This document serves as the declarative file system contract for OpenProducer.
- **Zero Unauthorized Image Generation:** OpenProducer NEVER generates any image on its own (not even as an example) unless explicitly asked by the creator.
- **Plain-Text Prompts (Zero Markdown Bloat):** All prompt files use clean `.txt` format with bracket headers (`[TIER ...]`, `Conditioned On:`, `[IMAGE PROMPT]`, `[VIDEO PROMPT]`, `[NEGATIVE PROMPT]`) modeled on `the_314am_doppelganger`.
- **Clean Root & Dedicated Production Folder:** All creator-facing assets (prompts, scripts, clips, audio, and manifests) live strictly inside the `production/` folder. The workspace root stays clean with only `openproducer/` (Brain) and `production/` (Deliverables).
- **Strict Sandbox Boundary & Self-Contained Knowledge:** All specifications, visual styles, starter presets, and agent logic live inside `.agents/` (`.agents/skills/openproducer-core/`). The agent operates strictly inside this project workspace; the only permitted external directory is the global user brain (`~/.openproducer/`). Probing parent directories (`../`) or volunteering external access is strictly prohibited.

---

## 1. Operating Tiers

### Tier 1: Lean Version (Single Subject / Setting)
* **Use Cases:** Social UGC (TikTok/Reels), Solo Host Explainers, 2D Stick-Figure animation, Single-Product commercial ads.
* **Core Characteristic:** 1 Subject + 1 Setting. Uses `base_image_prompt.txt` to lock visual style, subject, and setting simultaneously.

```text
<project_root>/
├── openproducer/                      # 🧠 Internal Producer Brain
│   ├── config.json                    # Project settings (aspect_ratio, archetype, audio_pathway, audio_delivery_mode)
│   ├── state.json                     # Interactive stage tracker (explore | proposed | produced | guiding)
│   ├── blueprint.md                   # Complete archived story, plot, plans & session memory
│   ├── manifest.json                  # Pre-flight linter audit ledger (L-01 to L-19)
│   └── visual/
│       └── technical_anchor.txt       # Injected master style anchor string
│
└── production/                        # 🎬 Creator Production Deliverables
    ├── base_image_prompt.txt          # 🎨 Master Base Style & Subject/Setting lock prompt
    ├── audio_script.txt                # 🎙️ (If Separate Audio) Clean script to generate/record voice/audio
    ├── clips/                         # 🎬 Clip directories (clip_01, clip_02...)
    │   └── clip_xxx/
    │       ├── image_prompt.txt       # Tier 2: Start-frame prompt (Conditioned On: base_image_prompt.txt)
    │       └── video_prompt.txt       # Tier 3: Veo 3.1 video prompt (Input Seed: production/clips/clip_xxx/image_prompt.txt)
    ├── master_images_prompt.txt       # 📋 Creator reference compilation only (ignored by /opp-guide)
    ├── master_videos_prompt.txt       # 📋 Creator reference compilation only (ignored by /opp-guide)
    ├── scratchbook.md                 # 📝 Timeline pacing math, duration map & Retake Doctor log
    └── motion_graphics.md             # 🔤 (If applicable) On-screen captions & typography specs
```

---

### Tier 2: Modular Studio Version (Multi-Character & Multi-Environment Productions)
* **Use Cases:** Narrative cinema, short films, multi-character animations, multi-location stories.
* **Core Characteristic:** Anchored by `base_image_prompt.txt` to lock the master visual style first. Character prompts (`subjects/`) and environment stage prompts (`visuals/environments/`) are created inside `production/` in clean `.txt` format with `Conditioned On:` / `Feeds Into:` connection headers.

```text
<project_root>/
├── openproducer/                      # 🧠 Internal Producer Brain
│   ├── config.json                    # Tier: "modular_studio", Aspect: "16:9", etc.
│   ├── state.json                     # Interactive stage tracker
│   ├── blueprint.md                   # Complete archived story, character arcs & session memory
│   ├── manifest.json                  # Linter audit ledger (L-01 to L-19)
│   └── visual/
│       └── technical_anchor.txt       # Master style anchor string
│
└── production/                        # 🎬 Creator Production Deliverables
    ├── base_image_prompt.txt          # 🎨 Master Base Style lock prompt (anchors all subjects & environments)
    ├── audio_script.txt                # 🎙️ (If Separate Audio) Clean script to generate/record voice/audio
    ├── subjects/                      # 👥 Character & Subject Base Prompts
    │   └── <subject_id_or_name>/
    │       ├── hero_prompt.txt        # Step 1 Hero Shot (Conditioned On: base_image_prompt.txt)
    │       └── profile_prompt.txt     # Step 2 4-View Sheet (Conditioned On: hero_prompt.txt)
    ├── visuals/                       # 🌆 Environment Base Prompts
    │   └── environments/
    │       └── <environment_id_or_name>/
    │           └── prompt.txt         # Empty 3-plane stage prompt (Conditioned On: base_image_prompt.txt)
    ├── clips/                         # 🎬 Shot-by-shot prompts
    │   └── clip_xxx/
    │       ├── image_prompt.txt       # Keyframe prompt (Conditioned On: subject + environment images)
    │       └── video_prompt.txt       # Video prompt (Input Seed: production/clips/clip_xxx/image_prompt.txt or LAST_FRAME)
    ├── master_images_prompt.txt       # 📋 Creator reference compilation only (ignored by /opp-guide)
    ├── master_videos_prompt.txt       # 📋 Creator reference compilation only (ignored by /opp-guide)
    ├── scratchbook.md                 # 📝 Timeline pacing math, eyeline vectors & Retake Doctor log
    └── motion_graphics.md             # 🔤 (If applicable) On-screen captions & typography specs
```
