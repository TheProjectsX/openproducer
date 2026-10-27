# Specification: `directors_cut/` & `assembly/` Domain (Temporal Slicing & Multi-Engine Assembly)

**Status:** ✅ FINALIZED & EMPIRICALLY VALIDATED (Discussion 46)  
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

### 2.1 Google Flow Native Duration Standard
Google Flow (Veo 3.1) natively and strictly supports custom generation durations of **4s, 6s, 8s, and 10s**. Arbitrary intermediate durations (3s, 5s, 7s) are strictly prohibited in Flow Native compilation.

| Flow Native Duration | Pathway A Word Limit (Native Veo Audio) | Pathway B Word Limit (External TTS / SRT) | Max Spoken Time | Pacing Density & Narrative Function |
|---|---|---|---|---|
| **4 Seconds** | 3 – 5 words (max 6) | 5 – 7 words (max 8) | 2.0s – 2.5s | Rapid hooks, macro cutaways, kinetic text plates, punchy viral payoffs |
| **6 Seconds** | 7 – 9 words (max 10) | 9 – 11 words (max 12) | 3.5s – 4.5s | Motivated actions, standard dialogue sentences, balanced commercial beats |
| **8 Seconds** | 11 – 13 words (max 14) | 13 – 16 words (max 18) | 5.0s – 6.0s | Dramatic tension, multi-sentence dialogue, deliberate camera kinematics |
| **10 Seconds** | 15 – 18 words (max 19) | 17 – 20 words (max 22) | 6.5s – 7.5s | Arthouse slow-burn, philosophical monologues, lingering environmental immersion |

### 2.2 Creator Pacing Style Intake (Dynamic Sync vs. Slow-Burn Monologue)
If pacing density is not pre-defined by the creator, the Agent **MUST present the pacing choice**:
1. **Dynamic Sync (4s – 6s Cuts):** Rapid scene transitions, tight audio synchronization, and frequent cutaway inserts (Macro inserts, Graphic/Text plates). Ideal for short-form reels, horror hooks, and viral retention.
2. **Slow-Burn Monologue (8s – 10s Takes):** Atmospheric, unhurried takes featuring continuous optical camera movements (slow creeping push-in) with zero rush. Ideal for philosophical essays, soliloquies, character introspection, and cinematic world-building.

### 2.3 Dialogue-First Timing Loop vs. Dual Generation Intake Rule
When producing content with external voiceover or dialogue (Gemini TTS, ElevenLabs), generating video prompts and audio scripts simultaneously based on theoretical pacing (~2.2 words/sec) frequently causes desynchronization due to dynamic emotional pauses and vocal inflections.
- **The Golden Intake Question:** If the creator has not specified the generation pathway, the Agent **MUST explicitly ask**:
  1. **Dialogue-First (Default & Recommended):** The Agent generates the dialogue/narrator script first. The creator generates the voice track (in Gemini TTS or ElevenLabs) and inputs actual timestamps/durations. The Agent then slices the video clips with 100% mathematical precision to fit the real recorded audio.
     *The Hard Pause Rule:* When Dialogue-First is selected, the Agent **MUST STOP** after delivering the script and Tier 1 master reference plate. Slicing clips or generating video prompts before the creator supplies recorded audio durations/timestamps is strictly prohibited.
  2. **Both Together (Optional Fast Mode):** The Agent outputs both dialogue scripts and video clip prompts simultaneously using theoretical speech velocity (~2.2 words/sec).

### 2.4 The Creator Alignment & Confirmation Gate (The "Extra Instructions" Check)
The Agent must NEVER prematurely rush into file creation or prompt compilation immediately upon receiving intake answers.
- **The Protocol:** After the creator selects their foundational choices (Pacing Profile, Generation Pathway, Pluggable Style), the Agent **MUST present a concise alignment summary** and explicitly prompt:
  > *"Here is our confirmed production setup: [Summary]. Before we begin, do you have any specific creative notes, character details, tonal constraints, or extra instructions you want to add? Reply with your notes or confirm to start the process."*
- **The Confirmation Gate:** The Agent is **strictly prohibited** from generating files, writing scripts, or compiling prompts until the creator provides their extra instructions and gives explicit confirmation to proceed.

### 2.5 Dynamic Narrative Tempo & Hybrid Pacing (No Rigid Durations)
Narrative duration and speech velocity cannot be treated as a static default. Different stories and beats demand radically different tempos:
1. **Slow-Burn / Spooky Dread (1.8 – 2.2 WPS):** Atmospheric psychological horror, eerie soliloquies, deliberate pauses to give the viewer the full emotional weight.
2. **High-Velocity / Hyped Pacing (2.6 – 3.0 WPS):** High-energy explainers, intense action, frantic escapes, viral retention.
3. **The Hybrid Pacing Arc:** Stories that transition dynamically across beats (e.g. starting slow and atmospheric, accelerating into breathless panic during the climax, and dropping back into silence for the chill payoff).
- **Rule:** Durations adapt dynamically per clip beat based on emotional intensity rather than a flat mathematical constant.

### 2.6 Perspective & The Creator Agency Protocol (The Non-Imposition Law)
1. **2nd-Person Immersive Staging (`"Suppose you woke up at 2 AM..."`):** Powerful psychological technique for pulling the viewer directly into the protagonist's shoes.
2. **The Non-Imposition Law (Respecting Authored Intent):**
   - **Scenario A (Creator supplies a Rough Plot / Premise / Concept):** The AI Agent is actively empowered to propose the immersive 2nd-person perspective, draft dialogue, and structure the narrative arc.
   - **Scenario B (Creator supplies an Authored Script / Walkthrough / Draft):** If the creator has already provided a script or detailed walkthrough, **the AI MUST NOT impose or rewrite their narrative voice**. The creator has already put deliberate thought into their words. The AI's role is strictly limited to measuring clip durations, suggesting pacing adjustments, and slicing into visual clips, never rewriting their creative expression.

### 2.7 Dynamic Hook Governing Rules (Banning Static Templates)
1. **No Mad-Libs Templates:** Banish rigid, copy-paste formulas (e.g. fill-in-the-blank `"Have you ever felt like [X]?"`).
2. **The Three Dynamic Hook Rules:**
   - *Immediate In Medias Res (Zero Warm-up):* Plunge directly into a sensory event, physical action, or high-stakes choice within the first 3 seconds. Zero introductory filler (`"In this video..."`).
   - *Disruption of Everyday Equilibrium:* Break an ordinary expectation immediately (`"You lock your front door every night. But tonight, the lock turns from the other side."`).
   - *Contextual Organic Generation:* Hook phrasing must be generated organically from the creator's exact plot stakes and genre rather than a generic template.


---

## 3. Pillar 1: Mathematical Word-to-Time Pacing Calculation

### 3.1 Dual-Track Speech Velocity Standard
Speech velocity depends directly on the generation pathway:
- **Pathway A (Native In-Video Audio — Veo 3.1):** Slow, deliberate cadence with pre/post-roll silence buffers:
  $$\text{Native Velocity} \approx 1.20 \text{ to } 1.50 \text{ words per second} \quad (\text{Production Baseline: } 1.3 \text{ words/sec})$$
- **Pathway B (External Narration — ElevenLabs / Gemini TTS):** Conversational human speech:
  $$\text{External Velocity} \approx 2.17 \text{ to } 2.50 \text{ words per second} \quad (\text{Production Baseline: } 2.2 \text{ words/sec})$$

### 3.2 Spoken Word Limits by Flow Duration

#### Pathway A: Native In-Video Audio (Veo 3.1)
| Clip Duration | Absolute Max Words | Recommended Sweet Spot | Max Spoken Duration | Guaranteed Buffer |
|---|---|---|---|---|
| **4 Seconds** | 6 words | 3 – 5 words | 2.0s – 2.5s | $\ge 1.5\text{s}$ |
| **6 Seconds** | 10 words | 7 – 9 words | 3.5s – 4.5s | $\ge 1.5\text{s}$ |
| **8 Seconds** | 14 words | 11 – 13 words | 5.0s – 6.0s | $\ge 2.0\text{s}$ |
| **10 Seconds** | 19 words | 15 – 18 words | 6.5s – 7.5s | $\ge 2.5\text{s}$ |

#### Pathway B: External Narration (ElevenLabs / Gemini TTS)
| Clip Duration | Absolute Max Words | Recommended Sweet Spot | Max Spoken Duration | Guaranteed Buffer |
|---|---|---|---|---|
| **4 Seconds** | 8 words | 5 – 7 words | 2.2s – 3.0s | $\ge 1.0\text{s}$ |
| **6 Seconds** | 12 words | 9 – 11 words | 4.0s – 4.8s | $\ge 1.2\text{s}$ |
| **8 Seconds** | 18 words | 13 – 16 words | 5.5s – 6.5s | $\ge 1.5\text{s}$ |
| **10 Seconds** | 22 words | 17 – 20 words | 7.5s – 8.5s | $\ge 1.5\text{s}$ |

### 3.3 The Punctuation Breathing Buffer Rule
Every clip containing spoken dialogue **must preserve at least 1.0s to 1.5s of total silence buffer** (split between pre-roll silence before the first word and post-roll silence after the last word). Characters must never speak on Frame 1 or conclude speech on the terminal frame. Enforced via Linter **L-14** (Dual-Track Speech Word Budget & Silence Buffer).

---


## 4. Pillar 2: Action Budgeting & The Single-Motion Law

Generative video diffusion models (Veo 3.1, Sora, Kling, Runway) degrade into spatial morphing, extra limbs, and teleportation if prompted with multiple sequential actions in a single clip (*"He walks in, picks up the phone, and speaks into it"*).

### 4.1 The Single-Motion Law
**Every clip is budgeted for strictly:**
1. **ONE Primary Biomechanical Action:** (e.g. *raising receiver to ear*, OR *sliding open case file*, OR *sprinting down hallway*).
2. **ONE Continuous Optical Kinematic:** (e.g. *slow tracking push-in*, OR *locked-off MCU*, OR *descending overhead perspective*).

If a story beat contains $K$ sequential actions, it **MUST be sliced into at least $K$ separate clips**.

### 4.2 The Micro-Beat De-Cramming Law
Video diffusion engines degrade into frantic temporal blurring and warped artifacts when multiple environmental or narrative events are packed into a single clip (e.g. *walking through a door + entering a hall + turning head + reading a wall clock*).
$$\mathbf{1 \text{ Clip}} = \mathbf{1 \text{ Camera Trajectory}} + \mathbf{1 \text{ Spatial Plane}} + \mathbf{1 \text{ Micro-Action}}$$
- Every clip must be stripped down to a single calm, unhurried, focused micro-event.
- Secondary narrative beats (such as an analog wall clock, environmental detail, or prop) **must be isolated into dedicated macro cutaway inserts** rather than compounded into the main subject action.

### 4.3 The Mandatory Context Shift Rule
Regardless of whether the creator selected a dynamic sync or slow-burn monologue pacing style:
> **"Whenever the narrative script undergoes a contextual shift, the visual context MUST change."**

A prompt cannot attempt to retain a stale visual context when the story has crossed a narrative boundary. An immediate visual cut is required upon:
1. **Spatial Boundary Shift:** Transitioning from room interior to hallway, or wide room to close prop.
2. **Action / Causality Shock:** Shifting from listening to sudden knocks or movement.
3. **Dialogue / Revelation Shock:** A chilling phrase or supernatural whisper interrupting dialogue.
4. **Speaker / Entity Shift:** Switching from the on-screen subject to an external or phone voice.

### 4.4 The 4-Beat Visual Rhythm & The Anti-Stagnation Law
The overriding visual law is **The Anti-Stagnation Law (View Refresh Principle)**: *Never linger too long in a single visual angle or static viewpoint.* To solve "talking head fatigue" and eliminate lip-sync drag, sequential cuts cycle through the standardized **4-Beat Visual Rhythm**:

```
┌────────────────────────────────────────────────────────────────────────┐
│                      THE 4-BEAT VISUAL RHYTHM LOOP                     │
├──────────────────────┬─────────────┬───────────────────────────────────┤
│ BEAT 1: GROUNDED     │ 3 – 5s      │ Physical activity in environment; │
│         ACTION       │             │ zero direct-to-camera address     │
├──────────────────────┼─────────────┼───────────────────────────────────┤
│ BEAT 2: DIRECT FOCAL │ 2 – 3s      │ Face MCU / core punchline only;   │
│                      │             │ tight lip-sync isolated here      │
├──────────────────────┼─────────────┼───────────────────────────────────┤
│ BEAT 3: CUTAWAY /    │ 2 – 4s      │ Macro prop, screen UI, or metaphor│
│         MACRO INSERT │             │ speech continues off-screen       │
├──────────────────────┼─────────────┼───────────────────────────────────┤
│ BEAT 4: REACTION /   │ 1 – 2s      │ Silent breath, micro-expression,  │
│         ATMOSPHERE   │             │ head turn; audio decay buffer     │
└──────────────────────┴─────────────┴───────────────────────────────────┘
```
- **Beat 1: Grounded Action (3–5s):** The subject is engaged in physical activity within the environment (walking, adjusting a device, opening a door). Zero direct address.
- **Beat 2: Direct Focal (2–3s):** The camera cuts straight to the subject's face/MCU for the **single core thesis statement or punchline**. This is the *only* clip where tight lip-sync is required.
- **Beat 3: Cutaway / Metaphor / Macro Insert (2–4s):** The visual cuts away to a relevant physical object, environmental reaction, or UI screen while the voiceover/speech continues in the soundscape. Lip-sync burden drops to zero.
- **Beat 4: Reaction Beat (1–2s):** A silent breath, micro-expression, subtle head turn, or visual punchline before the next rhythm cycles.
*(Flow Native Duration Mapping: Because Google Flow only generates clips of `{4s, 6s, 8s, 10s}`, these beat lengths represent editorial timeline lengths. In Flow Native mode, Beats 1–4 are generated as 4s or 6s blocks and micro-trimmed in the timeline, or staged as internal camera transitions within an 8s/10s continuous take).*

### 4.5 Lean Causal Palette (Prop Bounding Guardrail)
To prevent video diffusion models from hallucinating random background clutter, extra props, or mutating items between cuts, shots with complex physical props include an explicit **closed-set prop inventory**:
```text
Permitted Props: [alarm clock, ceramic coffee mug, smartphone]
Negative Prompt Clause: ... strictly zero objects or props not listed in Permitted Props, no random background clutter.
```
*Rule:* The syntax is kept lightweight and creator-friendly, avoiding heavy programmatic schema overhead while providing a hard boundary for diffusion latents.

### 4.6 The 4 Match-Cut Timeline Handoffs (NLE Snapping Standards)
To prevent AI video sequences from feeling like disjointed slideshows, cuts between clips specify standardized match-cut tags for seamless straight cuts or 0.5s dissolves in CapCut, Premiere, or DaVinci:
1. `[MATCH-ON-POSE]`: Clip $N$ ends with the subject reaching, turning, or leaning; Clip $N+1$ initiates in an identical bodily posture from a complementary angle (e.g. 45° profile to frontal).
2. `[MATCH-ON-PROP]`: The camera centers on a shared physical anchor (e.g. smartphone, coffee mug, keycard). The cut pivots around that physical anchor while changing the background.
3. `[MATCH-ON-SHAPE]`: Graphic / geometric continuity (e.g. a round alarm clock in Clip $N$ cuts directly to a round full moon or security camera lens in Clip $N+1$).
4. `[MATCH-ON-TONE]`: Exposure and color temperature lock governed by the 3-Value Exposure Key (IRE), Dominant Kelvin, and Black Point Anchor from `visual/palette_and_mood.md` so transitions never flash, strobe, or jump in brightness across cuts.

### 4.7 The 30° Cinematic Contrast & Anti-Jump-Cut Law
Cutting consecutively between two slightly different Medium Shots of the same subject produces a severe, jittery **AI Jump-Cut** because diffusion models cannot lock exact millimeter chair placement and shoulder angles across separately generated plates.
- **The 30° Law:** Any straight cut on the same character **MUST shift camera perspective by at least 30 degrees** and/or change focal distance (e.g. Frontal Medium Shot $\rightarrow$ 45° Side Close-Up $\rightarrow$ Screen Macro Insert).
- **Continuous Alignment Alternative:** If identical framing is required across consecutive clips, the pipeline **MUST use `last_frame` chaining** (feeding the terminal frame of Clip $N$ as the starting seed of Clip $N+1$) rather than generating independent image plates. Enforced via Linter **L-12**.


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

### 5.5 The 3-Tier Image-First Pipeline & "Pre-Composited Tier 2" Protocol
Direct Text-to-Video generation across multi-clip sequences triggers severe style drift, character mutancy, line-weight inconsistency, and hallucinated scene geometry. Furthermore, feeding multiple separate `#E5E5E5` turnaround sheets and empty room plates directly into Veo 3.1 video generation splits temporal attention—causing `#E5E5E5` gray background bleed, wardrobe swapping between characters, and prop warping.

To guarantee 100% visual coherence and zero multi-ingredient identity bleed, production enforces a strict **division of labor between Tier 2 (Still Image Compositing) and Tier 3 (Pure Video Motion)**:

```
┌────────────────────────────────────────────────────────────────────────────┐
│ TIER 1: ATOMIC REFERENCE INGREDIENTS (subjects/ & environments/)           │
│  • [IMAGE 1] (Ingredient #1): Primary Subject Turnaround (#E5E5E5)         │
│  • [IMAGE 2] (Ingredient #2): Empty Stage Environment Plate                │
│  • [IMAGE 3] (Ingredient #3): Secondary Subject Turnaround OR Hero Prop    │
└─────────────────────────────────────┬──────────────────────────────────────┘
                                      │  (Bind up to 3 Ingredients here)
                                      ▼
┌────────────────────────────────────────────────────────────────────────────┐
│ TIER 2: PRE-COMPOSITED KEYFRAME PLATE (clips/clip_XX/image_prompt.txt)     │
│  • Engine: Imagen 4 / Nano Banana (Still Image Mode)                       │
│  • Role: Stitches Subject(s) + Prop + 3-Plane Environment lighting into    │
│    ONE unified, photorealistic Frame 1 image (`keyframe_XX.png`).          │
│  • Multi-Index Lean Anchoring (L-06):                                      │
│    "The exact same person from [IMAGE 1] positioned screen-left, holding   │
│     the exact object from [IMAGE 3], set inside the exact environment      │
│     from [IMAGE 2]..."                                                     │
└─────────────────────────────────────┬──────────────────────────────────────┘
                                      │  (Pass ONLY `keyframe_XX.png` as Seed)
                                      ▼
┌────────────────────────────────────────────────────────────────────────────┐
│ TIER 3: PURE MOTION & AUDIO GENERATION (clips/clip_XX/video_prompt.txt)    │
│  • Engine: Google Flow / Veo 3.1 (Frames-to-Video / First-Frame Seed)      │
│  • Input Seed: ONLY the approved Tier 2 `keyframe_XX.png` (or LAST_FRAME)  │
│  • Role: 0% wasted on compositing turnaround sheets; 100% of Veo's latent  │
│    capacity drives smooth biomechanics, camera kinematics, and lip-sync!   │
└────────────────────────────────────────────────────────────────────────────┘
```

#### The Universal 3-Ingredient Slot Allocation Matrix (Tier 2 Binding):
| Scene Complexity | `[IMAGE 1]` (Slot 1) | `[IMAGE 2]` (Slot 2) | `[IMAGE 3]` (Slot 3) | Overflow / Text Fallback Strategy |
|---|---|---|---|---|
| **1 Subject + 1 Environment** | Primary Subject Sheet | Empty Stage Plate | *(Optional)* Hero Prop or Style Ref | Zero overflow; all assets bound visually. |
| **1 Subject + 1 Prop + 1 Environment** | Primary Subject Sheet | Empty Stage Plate | Hero Prop Turnaround | Zero overflow; use `[IMAGE 1]`, `[IMAGE 2]`, `[IMAGE 3]` in Tier 2 prompt. |
| **2 Characters + 1 Environment (Clean Single `L-13`)** | Active Speaker/Listener Sheet | Empty Stage Plate | *(Optional)* Scene Prop | Clean Singles isolate 1 character per clip, freeing Slot 3. |
| **2 Characters + 1 Prop + 1 Environment (Wide Two-Shot)** | Character A Sheet | Empty Stage Plate | Character B Sheet | Bind Characters A & B + Environment to Slots 1–3; inject Hero Prop via its locked `verbatim_anchor.txt` string. |

### 5.6 Spatial Continuity & The "Entry / Exit State" Handoff Architecture
Video diffusion models treat each clip as an isolated pass and will randomly flip character orientation across cuts without explicit boundaries. Every multi-clip sequence must define explicit spatial handoffs:

1. **Clip $N$ Spatial Exit State:** Declare the terminating vector and gaze:
   > *"Camera concludes its push-in on a locked medium close-up, the subject staring fixedly toward the screen-right edge."*
2. **Clip $N+1$ Spatial Entry State:** Declare the inherited perspective:
   > *"Starting directly from an angle looking screen-left, framing the closed apartment doorway that the subject was gazing toward..."*
3. **The 180-Degree Screen Direction Rule:**
   - If Character A is framed screen-left looking Screen-Right, the object or partner they interact with **MUST be framed screen-right looking Screen-Left**.
   - Tracked in metadata: `Screen Direction: Left-to-Right` vs. `Right-to-Left (Complementary)`.
4. **Eyeline Elevation Matching:** If a subject looks down toward a table or phone, the subsequent macro cut must be explicitly prompted from a high-angle / top-down elevation to match the spatial geometry.

### 5.7 Multi-Character Staging (The "Clean Single" Standard)
In video diffusion, Over-The-Shoulder (OTS) shots suffer from the **"Melting Shoulder" Glitch** (foreground shoulders warping into background bodies) and **Identity Bleed** (features blending between characters). Two-character dialogue is governed by three rules:

```
[ESTABLISHING PHASE] Wide Two-Shot Establishing Plate (Type A Scene Shot)
• Shows Character A and Character B together in the physical room.
• Distance prevents tight facial artifacts.
       │
       ▼
[DIALOGUE PHASE: SHOT-REVERSE-SHOT VIA CLEAN SINGLES]
┌──────────────────────────────────────┬──────────────────────────────────────┐
│ SHOT A: CHARACTER A (SPEAKER)        │ SHOT B: CHARACTER B (LISTENER)       │
├──────────────────────────────────────┼──────────────────────────────────────┤
│ • Clean Medium Close-Up of A only    │ • Clean Medium Close-Up of B only    │
│ • Framed screen-left                 │ • Framed screen-right                │
│ • Eyeline: looking ~15° off-camera   │ • Eyeline: looking ~15° off-camera   │
│   toward screen-right                │   toward screen-left                 │
│ • Zero foreground shoulder / limbs   │ • Zero foreground shoulder / limbs   │
│ • Active natural lip articulation &  │ • Mandatory Closed-Lip Listener Rule:│
│   spoken dialogue tokens             │   firmly closed lips, zero mouth     │
│                                      │   movement, reacts with eyes/jaw     │
└──────────────────────────────────────┴──────────────────────────────────────┘
```
1. **Clean Singles Only:** Ban dirty OTS shots. Isolate each actor in a clean MCU with complementary 15° eyelines so 100% of diffusion tokens focus on a single character's DNA.
2. **Speaker vs. Listener Decoupling:** Active dialogue is budgeted only to the speaker. The listener clip strictly enforces the Closed-Lip Listener Rule.
3. **9:16 Vertical Staging Adaptation (Z-Axis Depth Two-Shots & Vertical Clean Singles):**
   - **The Horizontal Two-Shot Glitch:** In 9:16 vertical viewports, side-by-side two-shots force characters to shrink into tiny distant figures or cause bodies to be severed by frame edges.
   - **Z-Axis Depth Two-Shot:** When two characters must appear in the same frame, arrange them along the Z-axis (depth) rather than horizontal X-axis:
     - *Foreground Anchor:* Character A positioned lower-left ($Y \in [45\%, 75\%]$, $X \in [5\%, 40\%]$) in waist-up or chest-up profile.
     - *Midground Subject:* Character B positioned upper-center/right ($Y \in [20\%, 55\%]$, $X \in [45\%, 80\%]$) looking down/toward Character A.
   - **Vertical Clean Singles:** Dialogue cuts between characters must center the single character vertically within the Central 60% Action Safe Zone ($Y \in [15\%, 75\%]$), maintaining complementary 15° eyelines (Screen-Left eyeline for A, Screen-Right eyeline for B).

### 5.8 Multi-Character Physical Interaction & Action/Combat De-Collision Protocol
When two actors or creatures physically engage in the same frame (martial arts, handshakes, dance, sword clashes), video diffusion models frequently trigger the **"Limb Fusion Glitch"**—melding arms together, swapping clothing textures, or hallucinating mutated intermediate anatomy. Physical interaction is governed by three mandatory safeguards:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│             THE 3-CLIP KULESHOV ACTION SLICING FORMULA (COMBAT / IMPACT)    │
├──────────────────────────────────────┬──────────────────────────────────────┤
│ CLIP 1: WIND-UP & LAUNCH (4s)        │ • Medium or Wide Shot                │
│                                      │ • Character A initiates strike toward│
│                                      │   screen-right with clear trajectory │
│                                      │ • Clear negative space between actors│
├──────────────────────────────────────┼──────────────────────────────────────┤
│ CLIP 2: IMPACT MACRO INSERT (4s)     │ • Extreme Close-Up (ECU)             │
│                                      │ • Isolated impact point (blade clash │
│                                      │   sparks, fist landing, foot skid)   │
│                                      │ • Eliminates multi-limb confusion by │
│                                      │   excluding full bodies from frame   │
├──────────────────────────────────────┼──────────────────────────────────────┤
│ CLIP 3: RECOIL & FOLLOW-THROUGH (4s) │ • Medium / Full Shot                 │
│                                      │ • Character B reels back / collapses │
│                                      │ • Character A in follow-through pose │
│                                      │ • Re-establishes physical separation │
└──────────────────────────────────────┴──────────────────────────────────────┘
```

1. **The Multi-Limb Fusion Ban:** Continuous, complex multi-second physical grappling in a single unbroken take is strictly prohibited. Physical engagements must be sliced into discrete cinematic beats using the 3-Clip Kuleshov Formula above.
2. **High-Contrast Silhouette Separation:**
   - Any two characters sharing an interaction frame **MUST exhibit polar-opposite luminance, color, or silhouette values** (e.g. Character A in white combat tunic with sleek profile on screen-left vs. Character B in matte-black armored trench coat with broad silhouette on screen-right).
   - Never prompt two interacting characters in identical dark suits or identical uniforms; the diffusion model cannot differentiate their limbs during motion.
3. **Pre-Composited Tier 2 Action Keyframe:**
   - When a shared two-shot action frame is required, it must first be generated and approved as a Tier 2 still image plate (`image_prompt.txt`) using `[IMAGE 1]` (Character A), `[IMAGE 2]` (Environment), and `[IMAGE 3]` (Character B) to lock clean bodily separation before feeding into Veo as a single starting frame.

---



## 6. Pillar 4: Default Flow Baseline & Dynamic Modality Switches

The production framework operates on a **Flow Native Baseline** by default, but allows the creator to activate modular switches at any time before, during, or after generation.

```
                     CREATOR REQUEST
                            │
                            ▼
           [DEFAULT BASELINE: GOOGLE FLOW NATIVE]
           • Sliced Veo Video Clips (4s/6s/8s/10s)
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
2. **`assembly_mode: monolithic` (Long-Form Single-Take Engines):** For 10–15s engines (Seedance 2.0, Sora, Minimax), fuses individual sliced beats into a single continuous long-take prompt structured with chronological timestamps and transitional kinematics:
   ```text
   [00:00-00:04] Grounded Action & Establishing: [Subject DNA] in [Environment], [Action 1], [Camera vector 1].
   [00:04-00:08] Direct Focus & Core Beat: [Subject] transitions seamlessly to [Action 2], camera smoothly pulls in to MCU.
   [00:08-00:12] Continuous Reaction & Resolution: [Subject] settles into [Action 3], camera stabilizes into static wide framing.
   Audio: SFX: [...]; Ambience: [...]; Dialogue: [...]; Music: [...].
   ```
3. **`dialogue_engine` Modality Switching:**
   - **`native_flow` (Default):** Embedded in-clip dialogue with anti-muppet lip restraints (`subtle lip articulation, relaxed jaw`) and Closed-Lip Listener rule if off-screen/phone audio.
   - **`elevenlabs`:** Strips spoken dialogue quotes from video prompts (prevents double-speech audio); generates `dialogue_scripts.md` cue sheet with pre-roll/post-roll silence buffers and voice profiles.
   - **`gemini_tts`:** Strips speech quotes from video prompts (pure foley and score); generates `narrator_script.md` using official **Angle Bracket `< >` syntax** (`<short pause>`, `<long pause>`, `<whisper>...</whisper>`, `<sigh>`) with System Instructions for narrator persona. Strictly bans square brackets `[...]` to avoid TTS reading tags aloud. *Line-Break Formatting Rule:* Pause tags must NEVER be appended to the end of a sentence line (`name. <long pause>`), as the tokenizer will speak the tag words; sentences must terminate with a period and newline (`.\n`), with pause tags placed on their own isolated lines (`<long pause>\n`).
4. **`music_engine: external`:** Purges score prompts from the `Audio:` block (`zero background music, no score`), leaving pure diegetic foley and spatial room tone.

### 6.5 Dynamic Context-Driven Audio Transitions (J-Cuts, L-Cuts & Sound Bridges)
Audio must rarely cut synchronously on the exact video frame boundary (straight cuts feel robotic and unnatural). Transitions use **0.5s to 2.0s split-edit overlaps** to mimic human perceptual flow:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                 DYNAMIC CONTEXT-DRIVEN SPLIT-EDIT OVERLAPS                  │
├──────────────────────────────────────┬──────────────────────────────────────┤
│ J-CUT (INCOMING DISRUPTION)          │ L-CUT (ECHOING REVELATION)           │
├──────────────────────────────────────┼──────────────────────────────────────┤
│ • Next audio leads visual cut.       │ • Outgoing audio lingers across cut. │
│ • Trigger: Sudden shock (knocking,   │ • Trigger: Chilling whisper, phone   │
│   alarm, phone ringing, explosion).  │   voice, emotional dialogue line.    │
│ • Mechanics: Sound starts 1.0s–1.5s  │ • Mechanics: Audio from Clip N bleeds│
│   BEFORE video cuts to the source.   │   into Clip N+1, decaying naturally. │
└──────────────────────────────────────┴──────────────────────────────────────┘
```

#### Dual-Execution Mechanics:
1. **In Native Flow Prompts (In-Clip Veo Audio):**
   - *J-Cut Prompt Syntax (Clip $N$):* `"Audio: in the final 1.5 seconds, three sudden loud concussive door knocks impact sharply from the right channel."` (Video cuts to door in Clip $N+1$ while sound is already reverberating).
   - *L-Cut Prompt Syntax (Clip $N+1$):* `"Audio: the eerie hollow telephone whisper from the previous moment echoes and decays over ambient room tone, zero on-screen speech."`
2. **In External Speech & Narration (Gemini 3.8 Flash TTS / ElevenLabs):**
   - *J-Cut Narration Pre-Lap:* In `narrator_script.md` or timeline cue sheets, the narrator's next sentence or sound cue begins **0.5s to 1.5s before the visual edit**, pulling viewer attention forward into the next scene.
   - *L-Cut Narration Post-Hang:* The narrator's final words or whisper tails linger for 0.5s–1.0s over the incoming visual B-roll or macro insert before room tone takes over.

---


## 7. Pillar 5: Output Delivery Architecture

Every assembled production outputs a unified file directory supporting both **Google Flow Agent Mode** (one-paste master), **Image-First Workflows**, and **Manual Timeline Mode** (individual clip cards):

```
shots/ (or production_framework/<project_id>/)
├── base_image_prompt.txt            ◄── [Tier 1] Master Style & Subject DNA Reference Anchor Plate
├── scratchbook.md                   ◄── Director's Pacing Ledger (Beats, Words, Actions, Timing)
├── master_images_prompt.txt         ◄── Master manifest for ALL IMAGE generation (Tier 1 & Tier 2 plates)
├── master_videos_prompt.txt         ◄── Master manifest for ALL VIDEO generation (Tier 3 Veo prompts)
├── narrator_script.md               ◄── (Conditional) TTS script with word-to-time pacing
├── dialogue_scripts.md              ◄── (Conditional) Character cue sheet manifest
├── origin_manifest.md               ◄── Ledger mapping assets to engine origins
└── clips/                           ◄── Dedicated folder with isolated files for MANUAL MODE
    ├── clip_01/
    │   ├── image_prompt.txt         ◄── [Tier 2] Starting Keyframe Plate (Conditioned on Tier 1)
    │   └── video_prompt.txt         ◄── [Tier 3] Image-to-Video Motion & Audio Prompt
    ├── clip_02/
    │   ├── image_prompt.txt
    │   └── video_prompt.txt
    └── clip_XX/
```



### 7.1 Canonical Clip File Contracts (`clips/clip_XX/`)
Each individual clip folder contains two decoupled files conforming to the 3-Tier Image-First Architecture:

#### Tier 2 Pre-Composited Starting Keyframe Plate: `clips/clip_XX/image_prompt.txt`
```text
[IMAGE CONFIGURATION]
Aspect Ratio: [16:9 | 9:16]
Resolution: [1080p]
Reference Images: [IMAGE 1: Primary Subject Sheet | IMAGE 2: Empty Stage Plate | IMAGE 3: Secondary Subject or Hero Prop Sheet]

[IMAGE PROMPT]
[Multi-Index Lean Reference Anchoring: "The exact same person from [IMAGE 1]..., set inside the exact environment from [IMAGE 2]..." + pure cinematographic description of 3-plane lighting, motivated shadows, subject pose, and pre-materialized props at Frame 1...]

[NEGATIVE PROMPT]
[Banned visual artifacts, text, subtitles, watermark, blurry...]
```

#### Tier 3 Video Motion & Audio Prompt: `clips/clip_XX/video_prompt.txt`
```text
[CONFIGURATION SETTINGS]
Duration: [4s | 6s | 8s | 10s]
Aspect Ratio: [16:9 | 9:16]
Resolution: [1080p]
Input Seed / Dependency: [SINGLE SEED ONLY: Approved Tier 2 Pre-Composited Keyframe Plate | LAST_FRAME of Clip N]

[VIDEO PROMPT]
Starting directly from the initial image, [Viewport framing & primary subject]. [Biomechanical action & 3-plane lighting]. [Master Style Anchor & single continuous camera verb]. Audio: SFX: [Foley]; Ambience: [Room tone]; Dialogue: [Spoken attribution | None]; Music: [Directive | None].

[NEGATIVE PROMPT]
[Banned motion glitches, morphing, tripod, camera rig, subtitles...]
```

### 7.2 The On-Demand Packaging Suite (Strict Non-Imposition: Only on Explicit Request)
**The Core Demand Law (No Demand, No Prompt):** The Packaging Suite is **STRICTLY ON-DEMAND**. The agent and prompt compiler **MUST NEVER** generate thumbnail, cover frame, or loop bridge prompts by default during routine video assembly. If the creator does not explicitly ask for a thumbnail or promotional asset (e.g. asking *"create a thumbnail prompt"*, *"give me a vertical cover frame"*, or passing `--with-thumbnail`), **zero packaging files are created**.

When explicitly requested by the creator:
1. **High-CTR Cover Frame & Thumbnail Generator (16:9 & 9:16):**
   - Conditioned directly on `[IMAGE 1]` (Primary Subject Turnaround) and `visual/technical_anchor.md`.
   - **The Rule-of-Thirds & 40% Negative Space Law:** The subject is framed strictly on the left or right vertical third, leaving 40% of the frame as clean, high-contrast negative space reserved for YouTube thumbnail typography, title overlays, or platform sticker graphics.
   - **Emotionally Motivated Keyframe:** Requires high-stakes expressive engagement (intense dread, astonishment, awe, dramatic focus) rather than a passive neutral pose.
   - Output File: `packaging/thumbnail_prompt.txt` (16:9) and/or `packaging/cover_prompt.txt` (9:16).
2. **The Seamless Infinite Loop Bridge (`packaging/loop_bridge.txt`):**
   - Designed for short-form viral algorithms (TikTok, YouTube Shorts, Instagram Reels) where infinite loop replay multiplies retention scores.
   - Formulates the terminal camera vector and subject posture of the final clip (`clip_final/video_prompt.txt`) to physically and optically snap into Frame 1 of `clip_01/image_prompt.txt` via `[MATCH-ON-POSE]` or a continuous 360°/elevation reset.

---

## 8. Master Pre-Flight Linters (Authoritative Registry L-01 to L-18)

Every assembled production must pass these 18 authoritative pre-flight linters before delivery:

| Linter ID | Name | Inspection Rule | Failure Condition |
|---|---|---|---|
| **L-01** | **Word Economy** | Standalone T2V body strictly 100–150 words; Tier 3 I2V body (`video_prompt.txt`) strictly 75–150 words (excluding config and negative prompt blocks). | Word count below floor or exceeding 150 words. |
| **L-02** | **Attention Front-Loading** | Viewport framing and primary subject anchor appear within Tokens 1–30. | Framing/subject delayed past Token 30. |
| **L-03** | **Equipment Noun Ban** | Zero physical camera hardware nouns (`tripod`, `dolly`, `crane`, `jib`, `rig`, `drone`, `gimbal`, `steadicam`, `slider`, `camera body`) in positive prompt. (Negative prompt clauses exempt). | Any hardware noun in positive creative prompt. |
| **L-04** | **Config Decoupling** | Zero technical specs (`16:9`, `9:16`, `4:3`, `1080p`, `720p`, `4K`, `24fps`, `60fps`, `320x240`) in creative prompt text. (Creative cadence `on twos`, `12fps` whitelisted; negative prompts exempt). | Technical config token in creative prompt. |
| **L-05** | **Anti-Subtitle & Non-Render** | Narrative context uses `(REFERENCE ONLY — DO NOT RENDER...)` and negative prompt includes anti-subtitle tokens (`subtitles, closed captions, burned-in text, lower thirds, watermark`). | Context un-isolated or missing anti-subtitle negative clause. |
| **L-06** | **Subject DNA & Pre-Composited Tier 2** | Text-conditioned clips inject verbatim `verbatim_anchor.txt`; Tier 2 image prompts bind up to 3 Ingredients (`[IMAGE 1]`, `[IMAGE 2]`, `[IMAGE 3]`) via Lean Reference Anchoring banning competing bone-structure text; Tier 3 video prompts take ONLY the single pre-composited Tier 2 keyframe (or `LAST_FRAME`) as seed. | Bare pronoun in T2V, over-describing facial bones when `[IMAGE N]` attached, or feeding raw turnaround sheets directly into Tier 3 video. |
| **L-07** | **Pre-Materialized Prop Guard** | Held props declared grasped from Frame 1 to Frame End; zero mid-clip drawing without cutaway; complex scenes declare `Permitted Props: [...]`. | Prompt verbs like *"draws weapon"* or un-materialized prop appear mid-clip. |
| **L-08** | **Empty Stage & 3-Plane Environment** | Environment reference plates contain zero people/hero products; scene prompts establish Foreground, Midground, Background. | People in environment plates, or flat single-plane staging. |
| **L-09** | **Flow Native Duration Lock** | Clip duration strictly in `{4s, 6s, 8s, 10s}` in Flow Native mode. | Non-Flow duration (`1s, 2s, 3s, 5s, 7s`). |
| **L-10** | **Single-Motion & Clock Bracket Ban** | Max 1 primary biomechanical action and 1 continuous camera vector per clip. Numeric clock brackets (`\[\d{2}:\d{2}`) strictly banned; natural temporal phrases permitted. | Multiple sequential actions or clock timestamp in atomic clip. |
| **L-11** | **Continuity Chaining Syntax** | Mode 1 clips declare `(SEED: LAST_FRAME)` and begin with *"Continuing directly from the initial frame"*; Tier 3 I2V begins with *"Starting directly from the initial image"*. | Missing continuity seed syntax or starting declaration. |
| **L-12** | **30° Cinematic Contrast** | Consecutive cuts of same subject must shift angle by $\ge 30^\circ$, change focal length, or chain via `last_frame`. | Consecutive similar cuts without 30° shift (AI jump-cut trap). |
| **L-13** | **180° Screen Direction & Clean Singles** | Conversational cuts preserve complementary 15° eyelines and use Clean Singles (**dirty OTS shots strictly banned**). | Dirty OTS shot or eyeline reversal across 180° axis. |
| **L-14** | **Dual-Track Speech Word Budget** | Native Flow (`Pathway A`) $\le \{5, 9, 13, 18\}$ words for $\{4\text{s}, 6\text{s}, 8\text{s}, 10\text{s}\}$; External TTS (`Pathway B`) $\le \{8, 12, 18, 22\}$ words; $\text{Clip Duration} - \text{SRT Cue Duration} \ge 1.0\text{s}$ silence buffer. | Spoken words exceed duration ceiling or lack 1.0s buffer. |
| **L-15** | **Anti-Muppet & Phonetic Normalization** | Spoken dialogue uses preceding colon (`says, [modifier]: "..."`), strict sentence case, $\ge 2$ restraint tokens (`relaxed jaw, minimal jaw displacement, subtle lip articulation`), and all numbers/symbols/acronyms in Pathway A written phonetically as spoken English words (`"three fourteen"`, `"twenty-four frames"`). | Dialogue without restraint tokens, ALL CAPS words, or containing unexpanded numeric digits (`\d+`) in spoken quotes. |
| **L-16** | **Closed-Lip Listener Rule** | Off-screen/phone/narrator speech over visible actor mandates `firmly closed lips, tight jaw, zero mouth movement`. | Visible actor lacking closed-lip restraint during external speech. |
| **L-17** | **Structured 4-Field Audio Syntax** | Trailing audio block follows `Audio: SFX: ...; Ambience: ...; Dialogue: ...; Music: ...` with music suppression over dialogue. | Audio block is unstructured or contains aggressive score over dialogue. |
| **L-18** | **Gemini TTS Script & Non-Imposition** | `narrator_script.md` isolates `< >` tags on standalone lines (`.\n<long pause>\n`), zero square brackets, zero consecutive `<long pause>` dead air, and never rewrites creator's authored script into 2nd person. | Square brackets, inline pause tags, or overwriting creator's authored voice. |

---

## 9. Empirical Validation Sign-Off & Style Registry Linkage

* **Authoritative Style Engine:** Fully integrated with the 8-Medium [Pluggable Style Registry](../styles/) (`production_framework/styles/`) implementing the 3-Tier Medium vs. Dialect architecture.
* **Empirical Simulation Validation:** Formally validated and signed off through the end-to-end production of *The 3:14 AM Doppelgänger* ([`production_framework/simulations/the_314am_doppelganger/`](../simulations/the_314am_doppelganger/)), proving:
  1. Exact mathematical SRT dialogue slicing across 22 Flow-native clips.
  2. The Dialogue-First Hard Pause Rule and Anti-Dead-Air pacing (~140 wpm).
  3. Pre-materialized closed-set prop bounding (L-07) and Master Linters L-01 through L-18.
  4. Dynamic J-Cut & L-Cut native Veo audio transitions.
* **Specification Sign-off:** ✅ **COMPLETE & LOCKED FOR PRODUCTION SCALABILITY**.


