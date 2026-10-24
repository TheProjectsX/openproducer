# Specification: `directors_cut/` & `assembly/` Domain (Temporal Slicing & Multi-Engine Assembly)

**Status:** 🟡 UNDER DEVELOPMENT (Active Iteration & Empirical Validation)  
**Domain:** `directors_cut/` / `assembly/`  
**Target Engines:** Google Flow (Veo 3.1, Imagen 4, Gemini Omni Flash), Seedance/Sora, ElevenLabs

---

## 1. Domain Scope & Philosophy

The `directors_cut/` & `assembly/` domain elevates the production framework from single-shot prompt generation into an end-to-end **Director's Production Desk**. It bridges human creative narrative (scripts, screenplays, rough concepts) into mathematically paced, continuity-chained, and multi-engine-routed video clip sequences.

### Core Architectural Axioms:
1. **Intake-First Alignment:** Never assume runtime or pacing. Always establish the creator's target duration, tempo profile, and clip budget upfront.
2. **Mathematical Word Economy:** Speech pacing adheres to natural human conversational velocity (~2.2 words per second) with guaranteed silence buffers to prevent AI lip-sync warping.
3. **The Single-Motion Law:** Each sliced clip is budgeted for exactly one primary biomechanical action and one continuous optical camera vector to prevent diffusion latent collapse.
4. **Verbatim Subject DNA Invariance:** Characters and hero subjects must inject their exact immutable description string across all clips where they appear to prevent anatomical mutations.
5. **Flow Baseline with Dynamic Modality Switching:** Default to native Google Flow, but provide non-destructive switches for still images, monolithic long-takes, external dialogue (ElevenLabs), and custom music.

---

## 2. Step 0: The Creator Intake Interactivity Rule

The identical plot can manifest as an 18-second fast reel or a 2-minute slow-burn cinematic. If pacing parameters are not explicitly stated, the Agent **MUST straight up ask the creator first-hand** before generating prompts or slicing clips.

### 2.1 The 4 Tempo Profiles

| Tempo Profile | Baseline Clip Duration | Pacing Density | Spoken Words / Clip | Narrative Function |
|---|---|---|---|---|
| **1. Hyper / Viral** | `3s – 4s` | Rapid cuts, instant hooks | 4 – 8 words | High-energy social reels, TikTok, punchy product hooks |
| **2. Dynamic Commercial** | `5s` | Engaging momentum, motivated cuts | 8 – 11 words | Commercial campaigns, brand films, music visualizers |
| **3. Dramatic Cinema** | `6s – 8s` | Deliberate tension, emotional weight | 12 – 16 words | Short films, narrative dramas, psychological thrillers |
| **4. Atmospheric Slow-Burn** | `10s` | Meditative, lingering takes | 16 – 20 words | World-building, arthouse cinema, environmental doc |

---

## 3. Pillar 1: Mathematical Word-to-Time Pacing Calculation

### 3.1 Speech Velocity Standard
Human conversational speech naturally flows at **130 to 150 words per minute**:
$$\text{Speech Velocity} \approx 2.17 \text{ to } 2.50 \text{ words per second} \quad (\text{Production Baseline: } 2.2 \text{ words/sec})$$

### 3.2 Spoken Word Limits by Duration

| Clip Duration | Absolute Max Words | Recommended Sweet Spot | Max Spoken Duration | Guaranteed Buffer |
|---|---|---|---|---|
| **3 Seconds** | 6 words | 3 – 5 words | 1.8s – 2.2s | $\ge 0.8\text{s}$ |
| **4 Seconds** | 8 words | 5 – 7 words | 2.2s – 3.0s | $\ge 1.0\text{s}$ |
| **5 Seconds** | 11 words | 7 – 9 words | 3.2s – 4.0s | $\ge 1.0\text{s}$ |
| **8 Seconds** | 18 words | 12 – 15 words | 5.0s – 6.5s | $\ge 1.5\text{s}$ |
| **10 Seconds** | 22 words | 16 – 20 words | 7.0s – 8.5s | $\ge 1.5\text{s}$ |

### 3.3 The Punctuation Breathing Buffer Rule
Every clip containing spoken dialogue **must preserve at least 0.8s to 1.5s of total silence buffer** (split between pre-roll silence before the first word and post-roll silence after the last word). Characters must never speak on Frame 1 or conclude speech on the terminal frame.

---

## 4. Pillar 2: Action Budgeting & The Single-Motion Law

Generative video diffusion models (Veo 3.1, Sora, Kling, Runway) degrade into spatial morphing, extra limbs, and teleportation if prompted with multiple sequential actions in a single clip (*"He walks in, picks up the phone, and speaks into it"*).

### 4.1 The Single-Motion Law
**Every clip is budgeted for strictly:**
1. **ONE Primary Biomechanical Action:** (e.g. *raising receiver to ear*, OR *sliding open case file*, OR *sprinting down hallway*).
2. **ONE Continuous Optical Kinematic:** (e.g. *slow tracking push-in*, OR *locked-off MCU*, OR *descending crane*).

If a story beat contains $K$ sequential actions, it **MUST be sliced into at least $K$ separate clips**.

### 4.2 The Micro-Beat De-Cramming Law
Video diffusion engines degrade into frantic temporal blurring and warped artifacts when multiple environmental or narrative events are packed into a single clip (e.g. *walking through a door + entering a hall + turning head + reading a wall clock*).
$$\mathbf{1 \text{ Clip}} = \mathbf{1 \text{ Camera Trajectory}} + \mathbf{1 \text{ Spatial Plane}} + \mathbf{1 \text{ Micro-Action}}$$
- Every clip must be stripped down to a single calm, unhurried, focused micro-event.
- Secondary narrative beats (such as an analog wall clock, environmental detail, or prop) **must be isolated into dedicated macro cutaway inserts** rather than compounded into the main subject action.

---

## 5. Pillar 3: Multi-Clip Continuity Chaining & Subject DNA Invariance

### 5.1 The Master Subject DNA Injection Protocol
Never use bare pronouns (*"he"*, *"she"*, *"the figure"*) across cuts. Video diffusion models treat each clip's text prompt as an independent semantic pass.

- **The Rule:** In every clip prompt featuring a subject, the prompt compiler **MUST deterministically inject the verbatim Subject Anchor String** from `subjects/<id>/` into early tokens (tokens 10–35).
- **Mandatory Attributes:** Immutable musculoskeletal build, facial bone structure, wardrobe materiality, hair/grooming, and explicit anti-mutation guardrails.

### 5.2 The Two Clip Transition Pathways

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       CLIP N TO CLIP N+1 TRANSITIONS                        │
├──────────────────────────────────────┬──────────────────────────────────────┤
│ MODE 1: CONTINUOUS SHOT EXTENSION    │ MODE 2: MOTIVATED CUT / ANGLE CHANGE │
├──────────────────────────────────────┼──────────────────────────────────────┤
│ • Same continuous camera trajectory. │ • Perspective cut (Wide to MCU/Macro)│
│ • Uses `last_frame` of Clip N as the │ • CANNOT use `last_frame` (new angle)│
│   input first-frame seed of Clip N+1.│ • Governed by:                       │
│ • Velocity matching: Camera speed and│   1. Verbatim Subject DNA Injection  │
│   trajectory continue without jolt.  │   2. Shared `#E5E5E5` Ingredient Pin │
│ • Prompt Syntax:                     │   3. 180° Screen Direction Lock      │
│   "Continuing directly from the      │   4. Identical Motivated Light Vector│
│   initial frame, the [Subject DNA]   │                                      │
│   continues the trajectory by..."    │                                      │
└──────────────────────────────────────┴──────────────────────────────────────┘
```

### 5.3 The "Closed-Lip Listener" Rule (Preventing Accidental Lip-Sync)
In video diffusion engines (Veo 3.1), placing quoted dialogue `"...words..."` in a prompt where a human face is in frame triggers cross-attention lip-sync on that actor's face, even if the text states the voice comes from an earpiece, telephone, or radio.
- **Rule:** When dialogue is spoken by an off-screen entity, phone receiver, or radio while a character is on screen:
  1. The prompt **MUST explicitly declare the actor's mouth closed**: `"Detective Cross listens in stunned silence with firmly closed lips, tight jaw, and zero mouth movement."`
  2. The dialogue must be explicitly attributed away from the character: `"An off-screen telephone receiver speaker emits: '...' "`
  3. The `Audio:` block must mandate: `Audio: filtered off-screen telephone audio, zero vocal speech from on-screen actor.`

### 5.4 The "Pre-Materialized Prop" Law (Preventing Morphing & Popping)
Video diffusion models lack rigid-body physics. Prompting an actor to *pull a gun from a holster*, *reach into a pocket for a lighter*, or *pick up an object* causes severe occlusion confusion, resulting in objects popping into existence or melting into skin.
- **Rule:** 
  1. Props must never materialize or be drawn mid-clip. Any object held by a character must be declared **already firmly grasped from Frame 1 to Frame End**: `"Detective Cross is already holding the revolver firmly in his right hand from the very first frame to the last. Rigid prop geometry, stable hand anatomy, zero popping objects, no drawing motion."`
  2. Drawing transitions must be sliced into cutaways: Shot A (hand drops to holster) $\rightarrow$ Shot B (tight cutaway, weapon is *already drawn*).
  3. Characters walking or transitioning through doors must have their hands clearly resting in pockets or visibly empty throughout the clip.

---

## 6. Pillar 4: Default Flow Baseline & Dynamic Modality Switches

The production framework operates on a **Flow Native Baseline** by default, but allows the creator to activate modular switches at any time before, during, or after generation.

```
                     CREATOR REQUEST
                            │
                            ▼
           [DEFAULT BASELINE: GOOGLE FLOW NATIVE]
           • Sliced Veo Video Clips (5s/8s/10s)
           • Native In-Clip Spoken Dialogue
           • Native In-Clip Foley SFX
           • Native In-Clip Background Music Score
                            │
       ┌────────────────────┼────────────────────┬────────────────────┐
       ▼                    ▼                    ▼                    ▼
[SWITCH: IMAGES]     [SWITCH: LONG-FORM]  [SWITCH: ELEVENLABS] [SWITCH: CUSTOM MUSIC]
"Use images instead  "Give me a single    "Use ElevenLabs for  "I'll use my own music,
 of videos"           long-take prompt"    dialogue"            remove score"
```

### Switch Transformation Rules:
1. **`visual_mode: images`:** Strips temporal kinematics and audio blocks; outputs high-detail photography prompts for Imagen 4 or Midjourney.
2. **`assembly_mode: monolithic`:** Fuses individual clip beats into a single continuous long-take paragraph with smooth transitional adverbs for Seedance, Sora, or Minimax.
3. **`dialogue_engine: elevenlabs`:** Strips spoken dialogue quotes from the Veo prompt (prevents double-speech clashes); generates an isolated, cue-timed `dialogue_scripts.md` manifest with voice IDs and delivery emotion modifiers.
4. **`music_engine: external`:** Purges score prompts from the `Audio:` block (`zero background music, no score`), leaving pure diegetic foley and spatial room tone.

---

## 7. Pillar 5: Output Delivery Architecture

Every assembled production outputs a unified file directory supporting both **Google Flow Agent Mode** (one-paste master) and **Manual Timeline Mode** (individual clip cards):

```
shots/ (or directors_cut/)
├── scratchbook.md                   ◄── Director's Pacing Ledger (Beats, Words, Actions)
├── master_flow_agent_prompt.txt     ◄── Single copy-paste file for Google Flow AGENT MODE
├── individual_clips/                ◄── Dedicated folder with isolated files for MANUAL MODE
│   ├── clip_01.txt
│   ├── clip_02.txt
│   └── clip_XX.txt
├── dialogue_scripts.md              ◄── (Conditional) ElevenLabs voice manifest if activated
└── origin_manifest.md               ◄── Ledger mapping assets to engine origins
```


### 7.1 Individual Clip File Contract (`individual_clips/clip_XX.txt`)
Each individual clip file is structured with decoupled configuration metadata at the top, followed by the pure prompt block for friction-free copy-pasting:

```text
[CONFIGURATION SETTINGS]
Duration: [e.g. 6s]
Aspect Ratio: [e.g. 16:9 or 9:16]
Resolution: [e.g. 1080p]
Transition / Chop: [ESTABLISHING | MOTIVATED ANGLE | CONTINUOUS EXTENSION | MACRO INSERT]
Input Seed / Dependencies: [e.g. None | LAST_FRAME of Clip N | Turnaround Sheet ID]

[PROMPT]
[Pure cinematographic prompt text adhering to all domain specifications...]
```

---


## 8. Director's Cut Pre-Flight Linters

Every assembled production must pass these 5 assembly-level linters before delivery:

| Linter ID | Name | Inspection Rule | Failure Condition |
|---|---|---|---|
| **L-07** | **Action Budget Linter** | Max 1 primary biomechanical action and 1 continuous camera vector per clip. | $\ge 2$ sequential verbs in single clip prompt. |
| **L-08** | **Speech Velocity Linter** | Total spoken words $\le \text{Max Words}$ for clip duration; buffer $\ge 0.8\text{s}$. | Spoken word count exceeds duration ceiling. |
| **L-09** | **Subject DNA Invariance** | Tokens 10–35 contain verbatim Subject Anchor String. | Subject called by bare pronoun (*"he"*, *"the figure"*). |
| **L-10** | **Continuity Chaining Match** | Mode 1 clips must declare `(SEED: LAST_FRAME)` and begin with *"Continuing directly from the initial frame"*. | Mode 1 clip missing velocity match or seed syntax. |
| **L-11** | **Equipment Noun Purge** | Strict zero-tolerance for physical camera hardware nouns (`tripod`, `dolly track`, `crane arm`). | Any equipment noun present in prompt text. |
| **L-12** | **Closed-Lip Listener Linter** | If dialogue is from off-screen/phone/radio, prompt must explicitly declare on-screen actor's lips firmly closed with zero mouth movement. | Quoted off-screen dialogue present without explicit closed-lip constraint on visible actor. |
| **L-13** | **Pre-Materialized Prop Linter** | Handheld props must be declared already grasped from Frame 1 to Frame End; zero mid-clip draws. | Prompt includes verbs like *"draws gun"*, *"pulls out lighter"*, or dynamic prop materialization. |
| **L-14** | **Gemini TTS Angle Bracket Linter** | For external Google AI Studio (Gemini 3.8 Flash TTS) scripts: inline cues must strictly use Angle Brackets (`<short pause>`, `<whisper>`); zero square brackets (`[...]`) permitted in transcript. | Any square bracket cue (`[...]`) or editorial header present in the verbatim TTS transcript text. |

