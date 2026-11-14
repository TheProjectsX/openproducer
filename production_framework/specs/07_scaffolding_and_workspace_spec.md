# Specification 07: Dynamic Workspace Scaffolding & Creator File Architecture

## 1. Architectural Philosophy: Brain vs. Creator Deliverables

In OpenProducer, **we do not copy static template folders containing dummy placeholder text**, and **OpenProducer NEVER generates any image on its own** (not even as an example to show the creator) unless the creator explicitly asks it to generate an image.

The workspace is strictly divided into two zones:
1. **`./openproducer/` (The Brain):** Internal producer state, configuration, style anchors, linter manifest, and full story/session memory (`blueprint.md`). Created/updated during `propose`, `sync`, and `template`.
2. **`./production/` (Creator Deliverables):** All clean, plain-text `.txt` prompt files (with zero markdown bloat) plus `.md` script/timeline files generated during `produce`. Kept strictly inside `production/` so the workspace root stays clean.

---

## 2. Project Tier Classification Logic

The Agent evaluates project complexity and selects one of two operating tiers:

```mermaid
graph TD
    A["Creator Pitch / Plot / Reference"] --> B{"Complexity Classification"}
    
    B -->|"1 Subject & 1 Environment<br/>(Social UGC, Solo Explainer, 2D Stick Figure, Product Ad)"| C["TIER 1: LEAN VERSION<br/>(production/base_image_prompt.txt + production/clips/)"]
    
    B -->|">=2 Recurring Characters OR<br/>Multiple Distinct Locations OR<br/>Episodic Narrative Short"| D["TIER 2: MODULAR STUDIO VERSION<br/>(production/base_image_prompt.txt + production/subjects/ + production/visuals/environments/ + production/clips/)"]
```

### Classification Rules:
| Project Trait | Assigned Tier | Creator Scaffolding Behavior (inside `production/`) |
|---|---|---|
| Single host/creator in one studio/room | **Lean Version** | `base_image_prompt.txt` locks base style, face, and studio together. No `subjects/` or `visuals/environments/` folders needed. |
| 2D animation / Stick Figure explainer (single setting) | **Lean Version** | `base_image_prompt.txt` locks art style + character + canvas. Flat `clips/` directory. |
| Tabletop commercial product (watch, shoe) | **Lean Version** | `base_image_prompt.txt` locks lighting + product hero. Flat `clips/` directory. |
| Short film / animation with 2+ characters or multiple locations | **Modular Studio Version** | `base_image_prompt.txt` locks master visual style first; generates creator-facing `subjects/<id>/` and `visuals/environments/<id>/` `.txt` prompts inside `production/`. |

---

## 3. Directory Layout Contracts

### 3.1 Tier 1: Lean Version Workspace
*Optimized for single-subject or single-setting productions.*

```text
<project_root>/
├── openproducer/                  # 🧠 THE BRAIN (Internal Agent Context)
│   ├── config.json                # Project configuration, audio pathway & delivery settings
│   ├── state.json                 # Interactive stage tracker (explore | proposed | produced | guiding)
│   ├── blueprint.md               # Complete archived story, plot, plans & session memory
│   ├── manifest.json              # Pre-flight audit ledger for Linters L-01 to L-19
│   └── visual/
│       └── technical_anchor.txt   # The master 30-word visual style anchor string
│
└── production/                    # 🎬 CREATOR PRODUCTION DELIVERABLES
    ├── base_image_prompt.txt          # 🎨 CREATOR FILE: Master Base Style & Subject/Setting lock prompt
    ├── audio_script.txt               # 🎙️ CREATOR FILE: (If Separate Audio) Plain-text bracket-tagged script to generate/record voice/audio
    │
    ├── clips/                         # 🎬 CREATOR FOLDER: Shot-by-shot plain-text prompts
    │   ├── clip_01/
    │   │   ├── image_prompt.txt       # Tier 2: Starting frame prompt (Conditioned On: base_image_prompt.txt)
    │   │   └── video_prompt.txt       # Tier 3: Video prompt (Input Seed: production/clips/clip_01/image_prompt.txt)
    │   ├── clip_02/
    │   │   ├── image_prompt.txt
    │   │   └── video_prompt.txt
    │   └── clip_xxx/
    │
    ├── master_images_prompt.txt       # 📋 CREATOR REFERENCE ONLY: All image prompts compiled (ignored by /opp-guide)
    ├── master_videos_prompt.txt       # 📋 CREATOR REFERENCE ONLY: All video prompts compiled (ignored by /opp-guide)
    ├── scratchbook.md                 # 📝 CREATOR FILE: Timeline pacing table (4s/6s/8s), timestamps & retake log
    └── motion_graphics.md             # 🔤 CREATOR FILE: (If applicable) On-screen captions & typography cue sheet
```

---

### 3.2 Tier 2: Modular Studio Version Workspace
*Activated for multi-character or multi-environment productions. Because the creator must generate the character references and environment plates as base images in Google Flow / Imagen, `subjects/` and `visuals/environments/` live directly inside `production/`.*

```text
<project_root>/
├── openproducer/                  # 🧠 THE BRAIN (Internal Agent Context)
│   ├── config.json                # Tier: "modular_studio", Aspect: "16:9", etc.
│   ├── state.json                 # State tracker
│   ├── blueprint.md               # Complete archived story, character arcs & session memory
│   ├── manifest.json              # Pre-flight audit ledger (L-01 to L-19)
│   └── visual/
│       └── technical_anchor.txt   # Master style anchor string
│
└── production/                    # 🎬 CREATOR PRODUCTION DELIVERABLES
    ├── base_image_prompt.txt          # 🎨 CREATOR FILE: Master Base Style lock prompt (anchors all subjects & environments)
    ├── audio_script.txt               # 🎙️ CREATOR FILE: (If Separate Audio) Plain-text bracket-tagged script to generate/record voice/audio
    │
    ├── subjects/                      # 👥 CREATOR FOLDER: Character & Subject Base Prompts
    │   ├── <subject_id_or_name>/
    │   │   ├── hero_prompt.txt        # Step 1: Single Hero Shot prompt (Conditioned On: base_image_prompt.txt)
    │   │   └── profile_prompt.txt     # Step 2: 4-View Turnaround prompt (Conditioned On: hero_prompt.txt)
    │   └── <subject_2_name>/
    │       ├── hero_prompt.txt
    │       └── profile_prompt.txt
    │
    ├── visuals/                       # 🌆 CREATOR FOLDER: Environment Base Prompts
    │   └── environments/
    │       └── <environment_id_or_name>/
    │           ├── prompt.txt         # Empty 3-plane stage plate prompt (Conditioned On: base_image_prompt.txt)
    │           └── ground_rules.md    # MANDATORY: Scene topology, Z-index depth, and negative hallucination bans
    │       └── <environment_2_name>/
    │           ├── prompt.txt
    │           └── ground_rules.md
    │
    ├── clips/                         # 🎬 CREATOR FOLDER: Shot-by-shot plain-text prompts
    │   ├── clip_01/
    │   │   ├── image_prompt.txt       # Keyframe prompt (Conditioned On: subject + environment images)
    │   │   └── video_prompt.txt       # Video prompt (Input Seed: production/clips/clip_01/image_prompt.txt)
    │   ├── clip_02/
    │   │   ├── image_prompt.txt
    │   │   └── video_prompt.txt
    │   └── clip_xxx/
    │
    ├── master_images_prompt.txt       # 📋 CREATOR REFERENCE ONLY: All base, subject, environment & clip image prompts compiled (ignored by /opp-guide)
    ├── master_videos_prompt.txt       # 📋 CREATOR REFERENCE ONLY: All clip video prompts compiled (ignored by /opp-guide)
    ├── scratchbook.md                 # 📝 CREATOR FILE: Timeline pacing math, eyeline vectors & retake log
    └── motion_graphics.md             # 🔤 CREATOR FILE: (If applicable) Title cards, lower thirds & subtitle cue sheet
```

---

## 4. Exact Plain-Text Prompt File Contracts (Modeled on `the_314am_doppelganger`)

### 4.1 Clean Plain-Text Format (Zero Markdown Bloat in Prompt Files)
All prompt files (`.txt`) must use clean, simple plain-text bracket headers (`[TIER ...]`, `[IMAGE PROMPT]`, `[VIDEO PROMPT]`, `[NEGATIVE PROMPT]`) with `Conditioned On:` or `Input Seed / Dependencies:` noted directly in the top header block—never cluttered with markdown `#` headings, emojis, or bullet lists.

#### 1. `base_image_prompt.txt`
```text
[TIER 1: MASTER BASE REFERENCE PROMPT — <PROJECT NAME>]
Target Engine: Google Flow / Imagen 4 (Master Ingredient #1)
Conditioned On: None (or creator_photo.jpg if using a real human reference)
Aspect Ratio: 16:9
Resolution: 1080p

[MASTER IMAGE PROMPT]
<Cinematic framing, subject/scene anchor, lighting vectors, and master visual style anchor string. 100% pure creative description, zero equipment nouns.>

[NEGATIVE PROMPT]
<photorealistic/cartoon exclusions, blurry, altered style, distorted proportions, cluttered background, harsh flash, watermarks, text, subtitles.>
```

#### 2. `subjects/<subject_id_or_name>/hero_prompt.txt` & `profile_prompt.txt` (Modular Studio)
```text
[TIER 1A: SUBJECT HERO PROMPT — <SUBJECT NAME>]
Target Tool: Google Flow / Imagen 4
Conditioned On: base_image_prompt.txt (Attach as [IMAGE 1] for Master Style Lock)
Feeds Into: subjects/<subject_id_or_name>/profile_prompt.txt
Aspect Ratio: 16:9
Resolution: 1080p

[IMAGE PROMPT]
<Step 1 Genesis Hero Shot prompt locking facial landmarks, wardrobe materiality, and style anchor.>

[NEGATIVE PROMPT]
<action figure, plastic doll, ball joints, blurry, text, watermarks.>
```

```text
[TIER 1B: SUBJECT 4-VIEW PROFILE PROMPT — <SUBJECT NAME>]
Target Tool: Google Flow / Imagen 4
Conditioned On: subjects/<subject_id_or_name>/hero_prompt.txt (Attach generated Hero Image as [IMAGE 1])
Feeds Into: clips/clip_xxx/image_prompt.txt (Attach as Subject Ingredient)
Aspect Ratio: 16:9
Resolution: 1080p

[IMAGE PROMPT]
<Step 2 4-panel character model sheet (Front, Left Profile, Back, Close-up Face) on solid neutral light-gray studio background (#E5E5E5).>

[NEGATIVE PROMPT]
<changing clothes, facial drift, props in hands, environment background, text, watermarks.>
```

#### 3. `visuals/environments/<environment_id_or_name>/prompt.txt` (Modular Studio)
```text
[TIER 1C: ENVIRONMENT STAGE PROMPT — <ENVIRONMENT NAME>]
Target Tool: Google Flow / Imagen 4
Conditioned On: base_image_prompt.txt (Attach as [IMAGE 1] for Master Style Lock)
Feeds Into: clips/clip_xxx/image_prompt.txt (Attach as Environment Ingredient)
Aspect Ratio: 16:9
Resolution: 1080p

[IMAGE PROMPT]
<Empty 3-plane stage environment (Foreground, Midground stage zone, Background) with motivated lighting vectors and zero characters/people present.>

[NEGATIVE PROMPT]
<people, characters, crowds, silhouettes, camera equipment, tripod, text, watermarks.>
```

#### 4. `visuals/environments/<environment_id_or_name>/ground_rules.md` (Modular Studio)
```markdown
# Scene Ground Rules: <ENVIRONMENT NAME>

## 1. Architectural Topology & Boundary Invariants
- Room Topology: Single unified rectangular volume; flat continuous ceiling with zero elevation drops; strictly ZERO ceiling-dropped partition walls, ZERO dividing screens, ZERO structural columns.
- Doorways & Windows: Door located exclusively on east wall, always open 30 degrees; two tall windows on north wall only, completely uncurtained.

## 2. Negative Constraints & Forbidden Hallucinations
- Strict Bans: NEVER render a ceiling fan, NEVER render overhead fluorescent fixtures, NO dropped partition walls, NO curtains, NO modern screens.

## 3. Fixed Object Anchors & Z-Index Depth Layering
- Fixed Furniture: Heavy oak desk (1.8m x 0.8m) permanently anchored center-frame against the north wall.
- Depth Layering:
  - Layer 1 (Foreground): Desk front edge and green brass banker's lamp.
  - Layer 2 (Midground): Character seated strictly behind the desk; lower body and lap fully occluded by solid desk panel. Actor is never in front of or atop desk.
  - Layer 3 (Background): North wall and window frame.

## 4. Subject Blocking & Interaction
- Subject Position: Primary subject sits centered behind the desk facing south toward camera/doorway.

## 5. Invariant Lighting Vectors
- Key Light: Diffused cool daylight entering from north window at 45 degrees; consistent shadows from right to left.
```

#### 5. `clips/clip_XX/image_prompt.txt`
```text
[TIER 2: CLIP KEYFRAME STARTING PLATE — CLIP <XX>]
Target Tool: Google Flow / Imagen 4
Conditioned On: <base_image_prompt.txt (Tier 1 Master DNA) OR [IMAGE 1]: subjects/<name>/profile_prompt.txt + [IMAGE 2]: visuals/environments/<name>/prompt.txt>
Aspect Ratio: 16:9
Resolution: 1080p

[IMAGE PROMPT]
<Starting frame composition staging the subject inside the environment with exact camera framing, posture, expression, and lighting.>

[NEGATIVE PROMPT]
<studio gray background bleed, split screen, multiple panels, camera equipment, blurry lines, text, subtitles, watermarks.>
```

#### 6. `clips/clip_XX/video_prompt.txt`
```text
[CONFIGURATION SETTINGS]
Duration: <4s | 6s | 8s | 10s>
Aspect Ratio: 16:9
Resolution: 1080p
Transition / Chop: <e.g. ESTABLISHING MACRO | CONTINUOUS ACTION EXTENSION | MOTIVATED CUT>

[INPUT SEEDS & INGREDIENTS]
1. First Frame (Start Seed): production/clips/clip_<XX>/image_prompt.txt (or LAST_FRAME of production/clips/clip_<XX-1>/video_prompt.txt)
2. Persistent Subject DNA:   [IMAGE 1] -> production/subjects/<subject_id>/profile_prompt.txt (Locks face & clothes across reveals/turns)
3. Persistent Scene DNA:     [IMAGE 2] -> production/visuals/environments/<env_id>/prompt.txt (Locks room topology & lighting)
4. (Optional Hero Prop):     [IMAGE 3] -> production/subjects/<prop_id>/hero_prompt.txt

[VIDEO PROMPT]
Starting directly from the initial image, <Comprehensive descriptive prompt (uncapped depth): Viewport framing, subject DNA, physical room topology, Z-index depth layering (subject positioned strictly behind furniture/props with lower body occluded), motivated lighting vectors, single continuous camera verb, and kinematic action continuation from preceding clip terminal state. Conditioned on [IMAGE 1] for subject facial identity and [IMAGE 2] for scene topology. Trailing block: 4-part semicolon Audio: SFX: ...; Ambience: ...; Dialogue: ...; Music: [BGM Continuity: CONTINUATION - SUSTAIN / DECAY / ACCELERATION matching preceding cut volume]....>

[NEGATIVE PROMPT]
<camera equipment, tripod, dolly track, blurry, morphing face, distorted hands, extra fingers, text, subtitles, watermark, ceiling fan, dropped partition walls, structural columns, room dividers, frontal portrait (when rear/profile specified), speech looping, unnatural pauses.>
```

---

### 4.2 `audio_script.txt` Structure Contract (Plain-Text Bracketed Meta Tags & Google AI Studio Standard)

1. **NEVER Divide `audio_script.txt` by Clips (`clip_01`, `clip_02`, etc.):**
   * The audio script is generated for continuous voice synthesis in **[Google AI Studio Speech Playground](https://aistudio.google.com/generate-speech)**.
   * Write it as **one continuous master script** (or if the script is very long, e.g., >120 words, divide it into 2–3 large macro parts like `[PART 1]`, `[PART 2]`, or alternating speaker turns like `[Turn 01 - Narrator (Speaker 1)]`—**NEVER slice it into 4s/6s/8s clip segments**).
2. **The Context-Driven Emotion & Anti-Dead-Air Law (Discussion 47 & 49 — NO TAG SPAMMING):**
   * **Why Tag Spamming Kills Retention:** Putting `<short pause>` after every sentence or paragraph creates robotic dead air that destroys narrative momentum and causes viewers to scroll away immediately.
   * **90% Natural Punctuation Flow:** Standard commas (`,`), periods (`.`), em-dashes (`—`), and paragraph breaks already produce natural 0.3s–0.5s breathing cadences in Google AI Studio TTS. **90%+ of sentences must have ZERO tags.**
   * **Google AI Studio TTS Expression Catalog (40 Official Tags):**
     Google AI Studio Speech Playground officially supports 40 inline emotional vocalizations, breathing actions, and cadence markers in `<tag>` format. Proactively incorporate these expressions wherever contextually motivated by the narrative, dialogue, or dramatic mood:
     - **Cadence & Pauses:** `<short pause>`, `<long pause>`
     - **Breathing & Respiratory:** `<breath>`, `<heavy breath>`, `<exhales>`, `<pant>`, `<sigh>`, `<sighs>`, `<yawn>`, `<cough>`, `<sneeze>`, `<throat-clearing>`
     - **Laughter & Amusement:** `<chuckle>`, `<chuckles>`, `<giggle>`, `<laugh>`, `<laughter>`, `<snicker>`, `<snort>`, `<cackle>`
     - **Fear, Pain, Distress & Grief:** `<gasp>`, `<groan>`, `<grunt>`, `<whimper>`, `<cry>`, `<sob>`, `<moan>`, `<argh>`
     - **Vocalizations, Whispers & Projections:** `<whisper>`, `<whispering>`, `<whispers>`, `<cheer>`, `<shout>`, `<scream>`, `<shriek>`, `<pff>`, `<phew>`, `<tsk>`
     - **Hostile, Tension & Animalistic:** `<growl>`, `<grr>`, `<hiss>`
   * **Context-Driven Application Rules:**
     - **Use Where Fitting & Motivated:** Inject expressions at high-impact narrative beats: terror/horror (`<gasp>`, `<heavy breath>`, `<whimper>`, `<shriek>`), tension/unease (`<breath>`, `<throat-clearing>`, `<short pause>`), combat/effort (`<grunt>`, `<groan>`, `<argh>`, `<pant>`), comedy/satire (`<chuckle>`, `<snicker>`, `<snort>`, `<pff>`, `<tsk>`), sorrow/grief (`<sigh>`, `<sob>`, `<cry>`), and relief (`<phew>`, `<exhales>`).
     - **80–90% Punctuation / 10–20% Expression Ratio:** Maintain natural momentum. Do not over-tag every single line. Standard punctuation (periods, commas, em-dashes) drives natural flow, while expressions provide emotional punch.
     - **Clean Line Separation:** Standalone vocalizations (e.g., `<heavy breath>`, `<short pause>`, `<sigh>`) are best placed on their own isolated lines (`.
<heavy breath>
`) to prevent token collision or pronunciation glitches.
     - **Strict Angle Brackets (`< >`):** Always write expressions in angle brackets (`<sigh>`, `<chuckle>`). NEVER use square brackets (`[...]`) in spoken narration text, as Gemini TTS will read the bracketed words aloud literally.
   * **Clean Formatting & Meta Tag Rules:**
     - Structure the file using plain-text custom meta tags (`[AUDIO CONFIGURATION]`, `[VOICE CAST & PRESETS]`, `[SYSTEM INSTRUCTIONS]`, `[AUDIO SCRIPT]`, `[DOWNSTREAM WORKFLOW]`).
     - When you do use `<short pause>`, place `<short pause>` on its own clean line (never write a standalone dot `.` on a line, and never attach `<short pause>` to the end of a sentence line).
     - **Zero Square Brackets (`[...]`) Inside Spoken Narration:** Never use square brackets inside the spoken narration text itself (Gemini TTS reads `[pause]` aloud as literal words). Square brackets are reserved exclusively for structural section tags (`[AUDIO SCRIPT]`, `[Turn 01 - ...]`).

#### Standard Plain-Text Template for Single-Speaker `audio_script.txt`:
```text
[AUDIO CONFIGURATION]
Platform: Google AI Studio Speech Playground (https://aistudio.google.com/generate-speech)
Delivery Mode: separate_script_first (Continuous Voice Track)
Recommended Voice: Charon (or Puck / Fenrir / Kore / Aoede)
Pacing & Tone: Intimate, relentless forward momentum (~2.2-2.3 words/sec, zero dead air)
Workflow Pipeline: Google AI Studio Speech -> TurboScribe (https://turboscribe.ai/) or AudioToSRT (https://audiotosrt.com/) -> production/audio.srt

[SYSTEM INSTRUCTIONS]
You are a chilling, intimate narrator telling a psychological horror story. Speak with tense, forward-moving cadence.
Anti-Dead-Air Rule: Maintain relentless forward narrative momentum. Do not leave awkward dead silences between sentences; let natural commas and periods carry the suspense smoothly.
Tag Syntax Rules:
- Strictly execute inline angle-bracket performance tags: <short pause>, <whisper>...</whisper>.
- When encountering <whisper>...</whisper>, drop your volume into a dry, breathless whisper.
- Observe <short pause> as a genuine, tense silent beat.
- Never speak tag names, punctuation, or bracketed labels aloud under any circumstance.

[AUDIO SCRIPT]
You are sitting in the dark of your living room at 2:00 AM, the only illumination coming from the muted blue glow of your television screen.

You live alone. The apartment is dead quiet.

Your cat, perched on the back of the sofa, suddenly sits bolt upright. Its pupils dilate into black saucers. It isn’t looking at you, the window, or the hallway.

Its head is tilted up, tracking something invisible that is drifting slowly across the ceiling directly toward you.

Step by step. Left, then right.

You can’t see anything in the shadows above, but as the cat’s gaze stops directly overhead,
<short pause>
the air around you turns ice cold.
<short pause>
Then, two inches above your crown, you feel the hair on your scalp stir...
<whisper>as something... exhales.</whisper>

[DOWNSTREAM WORKFLOW]
1. Open Google AI Studio Speech Playground (https://aistudio.google.com/generate-speech).
2. Paste [SYSTEM INSTRUCTIONS] into System Instructions / Style Instructions.
3. Paste [AUDIO SCRIPT] text into the prompt.
4. Generate the audio file (.mp3 / .wav).
5. Generate the timestamped transcript / SRT using TurboScribe or AudioToSRT and save as production/audio.srt.
6. Run /opp-produce to slice and match video clips to your exact audio timestamps.
```

#### Standard Plain-Text Template for Multi-Speaker Alternating-Turn `audio_script.txt` (The Lighthouse v2 Standard):
```text
[AUDIO CONFIGURATION]
Platform: Google AI Studio Speech Playground (https://aistudio.google.com/generate-speech)
Delivery Mode: separate_script_first (Alternating-Turn Multi-Speaker Standard)
Workflow Pipeline: Google AI Studio Speech -> TurboScribe (https://turboscribe.ai/) or AudioToSRT (https://audiotosrt.com/) -> production/audio.srt

[VOICE CAST & PRESETS]
Speaker 1 (Narrator): Fenrir (or Orus) | Position: Speaker 1 | Style: Weathered, isolated baritone with gravel; tense, deliberate pacing.
Speaker 2 (The Entity / Doppelgänger): Orus (or Kore / Puck) | Position: Speaker 2 | Style: Unnaturally calm, deadpan, chilling whisper; devoid of human panic.

[SYSTEM INSTRUCTIONS]
[Speaker 1 / Narrator / Fenrir]:
You are a weathered, isolated Atlantic lighthouse keeper recounting a harrowing supernatural encounter. Speak in a grounded, tense cadence with gravel in your voice. Maintain natural human speech flow without artificial pauses.

[Speaker 2 / The Entity / Orus]:
You are an unearthly presence speaking through radios, mist, and reflections. Speak with unnatural, eerie calm, hushed whispers, and chilling stillness. Devoid of human urgency.

[Anti-Dead-Air & Syntax Rules]:
- Strictly execute inline performance tags: <short pause>, <whisper>...</whisper>.
- Maintain continuous speech momentum. 90%+ sentences flow naturally without pause tags.
- Never speak tag names, punctuation, or bracketed labels aloud.

[AUDIO SCRIPT]
[Turn 01 - Narrator (Fenrir) / Speaker 1]
You have been alone on this barren rock in the Atlantic Ocean for an entire month. No visitors. No escape from the endless crash of the surf. You are the sole lighthouse keeper, bound to a single duty: keep the beam burning so passing ships survive the dark.

Until tonight.

A violent gale hammers the stone tower. You finish trimming the lamp wick and start down the spiral iron staircase.
...
<short pause>

[Turn 02 - Radio Entity (Orus) / Speaker 2]
<whisper>Extinguish the light. It sees you.</whisper>

[Turn 03 - Narrator (Fenrir) / Speaker 1]
You turn slowly toward the seaward window. Out among the cresting waves stands a dark silhouette, perfectly motionless on the churning water.

[DOWNSTREAM WORKFLOW]
1. Open Google AI Studio Speech Playground (https://aistudio.google.com/generate-speech).
2. Paste [SYSTEM INSTRUCTIONS] into Style Instructions.
3. Configure Voice Presets for Speaker 1 and Speaker 2.
4. Copy-paste alternating turns into the conversation fields.
5. Download unified audio file and transcribe into production/audio.srt via TurboScribe or AudioToSRT.
```

---

### 4.3 Role of `scratchbook.md` and `master_*_prompt.txt`

1. **`scratchbook.md` (Internal Engineering & Timeline Ledger):**
   * Contains the timeline pacing math (4s/6s/8s word budgets, timestamp mappings, eyeline continuity vectors, and Retake Doctor diagnostic history).
2. **`master_images_prompt.txt` & `master_videos_prompt.txt` (Creator Self-Serve Reference Only):**
   * Compiled one-file plain-text manifests of all image prompts and all video prompts (preserving their `Conditioned On:` / `Input Seed:` connection lines).
   * **Strictly for creator self-serve convenience.** During `/opp-guide`, OpenProducer **does NOT use** these two master files; `/opp-guide` walks through `production/base_image_prompt.txt`, `production/subjects/`, `production/visuals/environments/`, and `production/clips/clip_xxx/` individually.
