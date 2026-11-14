# Discussion 86: Root Consistency Architecture — Uncapped Prompt Tokens, Scene Ground Rules, Visual Kinematic Handovers & Dynamic BGM Continuity

**Date:** 2026-11-14  
**Context:** Empirical production analysis from live simulations and video generations across 4s–10s clip pipelines. Resolving multi-clip drift, generative hallucinations, room topology mutations (e.g. dropped ceiling walls), Z-index depth clipping (character in front vs. behind objects), camera perspective flips (front vs. back view), and background music volume drops.  
**Status:** 📋 PROPOSAL / EXPANDED WITH CREATOR INSIGHTS (Awaiting User Approval Before Implementation)

---

## 1. Executive Summary & Problem Diagnosis

In multi-clip narrative and commercial video productions, a video is constructed from sequential cuts budgeted between **4 seconds (minimum) and 10 seconds (maximum)**. 

Empirical testing across live model runs has proven that without deterministic root rules, diffusion models trigger severe continuity collapse:

1. **The "Token Limit Card" Bottleneck (Artificial Word Throttling):**
   - *Failure:* Strict 100–150 word caps (`L-01`) force the omission of vital geometry, scale, and wardrobe details. Diffusion models fill this vacuum by hallucinating random details anew on every cut. Reference images alone cannot overcome this because they lack explicit geometric and relational instructions.

2. **The "Dropped Wall" & Topology Mutation Glitch:**
   - *Failure:* In sequential shots inside the same room, the model randomly invents new architectural elements—such as a partition wall dropping from the ceiling, sudden dividing pillars, or altered ceiling heights—destroying the spatial reality of the scene.

3. **The Z-Index Depth Inversion (In Front vs. Behind Objects):**
   - *Failure:* Characters seated *behind* a desk or standing *behind* a counter suddenly pop *in front* of the object or float over it between cuts because depth layering was not explicitly enforced.

4. **The Viewpoint / Facing Inversion Glitch (Front vs. Back View):**
   - *Failure:* When a sequence dictates looking at the *back* of a character (e.g. over-the-shoulder, walking away, or looking toward a door), the model's innate front-portrait bias kicks in, flipping the character around to face the camera.

5. **Kinematic / Action Reset Across Clips:**
   - *Failure:* Even without a literal image start-frame, cutting from Clip A to Clip B fails if Clip B resets to an idle posture instead of inheriting the exact terminal biomechanical pose, velocity, and limb position from Clip A.

6. **The Isolated BGM Dynamic Cliff:**
   - *Failure:* Clip $N$ builds to an intense high-volume crescendo, but Clip $N+1$ generates with a quiet baseline intro, causing an jarring volume drop that breaks the auditory edit.

---

## 2. Pillar 1: Abolishing the Descriptive Token Ceiling ("Removing the Card")

### 2.1 The Law of Descriptive Completeness
1. **Uncap Visual & Environmental Description:** Shot prompts (`video_prompt.txt`, `master_videos_prompt.txt`) are no longer capped at 150 words. Prompts must be as comprehensive and descriptive as necessary to eliminate all ambiguity regarding subject build, clothing, room layout, object scale, and depth occlusion.
2. **Text as the Primary Geometric Anchor:** Reference images provide stylistic and facial grounding; **the text prompt provides the explicit physical, relational, and geometric rules**. The text prompt acts as the definitive blueprint guiding diffusion motion synthesis.
3. **Decoupling Visual Description from Dialogue Pacing:**
   - **Descriptive Prompt Body:** Uncapped / Thorough.
   - **Spoken Dialogue (`L-14`):** Remains strictly governed by human speech velocity (~2.0–2.2 words per second based on clip duration buckets: 4s = max 6 words; 6s = max 10 words; 8s = max 14 words; 10s = max 19 words). Dialogue word count limits exist strictly to prevent lip-sync truncation before the cut, not to throttle visual description.

---

## 3. Pillar 2: Environment & Scene Ground Rules Architecture

### 3.1 Pre-Flight Common Scene Ground Rules
Before writing individual clip prompts for any sequence or episode, the framework must author the **Common Scene Ground Rules (`ground_rules.md`)** for all shared locations.

```text
environments/
└── <location_id>/
    ├── summary.md
    ├── ground_rules.md             ◄── [MANDATORY] Scene Invariants, Topology, Z-Index & Bans
    ├── spatial_layers.md
    ├── lighting_rig.md
    ├── acoustics.md
    ├── master_anchor.txt           ◄── [EXPANDED] Rich continuous grounding anchor
    ├── reference_prompt.txt
    └── references/
        └── empty_stage.png
```

### 3.2 The File Contract: `ground_rules.md`
Every `ground_rules.md` is divided into five authoritative sections:

```markdown
# Scene Ground Rules: [Location Name]

## 1. Architectural Topology & Boundary Invariants
- **Room Topology:** [e.g., Single unified rectangular room (5m x 6m); flat continuous 3m ceiling with zero elevation changes; strictly ZERO dividing walls, ZERO ceiling-dropped partitions, ZERO structural columns].
- **Doorway Locations & States:** [e.g., Single solid dark walnut door located exclusively on the right (east) wall; MUST ALWAYS remain ajar by 30 degrees into the dark hallway].
- **Window Orientations & Coverings:** [e.g., Two tall rectangular windows on the north wall only; completely uncovered with zero curtains or blinds].

## 2. Negative Constraints & Forbidden Elements (Strict Hallucination Bans)
- **Strictly Banned Fixtures:** [e.g., NEVER render a ceiling fan, NEVER render overhead fluorescent tube lighting, NO dropped partition walls, NO curtains].
- **Banned Anachronisms / Objects:** [e.g., NO modern electronics or screens; NO extra doors or windows].

## 3. Fixed Object Anchors & Z-Index Depth Layering
- **Fixed Furniture Placements:** [e.g., Rectangular heavy oak desk (1.8m wide, 0.8m deep) is permanently anchored center-frame against the north wall].
- **Z-Index Layer Hierarchy (Camera-to-Depth):**
  - *Layer 1 (Foreground / Near Camera):* Front edge of the oak desk with green brass banker's lamp on the left.
  - *Layer 2 (Midground / Subject Zone):* Character seated **strictly behind** the desk.
  - *Layer 3 (Background / Deep):* North wall with framed maritime maps.
- **Occlusion Rules:** [e.g., The actor's lower torso, legs, and lap are permanently occluded behind the solid wood front panel of the desk; actor is NEVER rendered standing in front of or sitting on the desk].

## 4. Subject Blocking & Interaction Invariants
- **Primary Subject Anchor:** [e.g., David sits centered behind the desk facing south toward camera/door].
- **Visitor / Secondary Placement:** [e.g., Visitor stands strictly screen-left near the bookshelf, maintaining 2 meters distance from the desk].

## 5. Invariant Lighting Vectors
- **Key Light Origin:** [e.g., Diffused cool daylight strictly enters from the north window at 45 degrees, casting consistent shadows from right to left].
- **Practical Light:** [e.g., Warm 2700K incandescent glow exclusively from the green desk lamp].
```

---

## 4. Pillar 3: Visual & Kinematic Handover Architecture (4s–10s Clips)

### 4.1 Terminal-to-Initial Action Handovers (Minimizing Cut Jolt)
While exact pixel-matched frame chaining requires start/last-frame feeds, **prompt-level kinematic continuity** bridges consecutive clips to eliminate jarring jumps:

$$\mathbf{Initial\ State(Clip\ B)_{t=0s} \approx Terminal\ State(Clip\ A)_{t=end}}$$

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    KINEMATIC ACTION HANDOVER ARCHITECTURE                   │
├─────────────────────────────────────────────────────────────────────────────┤
│ CLIP A (e.g. 6s Duration):                                                  │
│ • Primary Motion: Character stands up from the desk and walks toward door.   │
│ • Terminal State (at 00:06): Character halts at the east doorway, right      │
│   hand extended forward grasping the brass doorknob, body angled 3/4 right. │
├─────────────────────────────────────────────────────────────────────────────┤
│                                CUT BOUNDARY                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│ CLIP B (e.g. 4s Duration):                                                  │
│ • Initial State (at 00:00): MUST INHERIT TERMINAL POSE.                      │
│ • Prompt Directive: "Continuing immediately from the preceding motion:      │
│   Starting with the character standing at the open doorway, right hand       │
│   already gripping the brass doorknob, body facing 3/4 right toward hallway; │
│   the character pushes the door fully open and steps across the threshold..."│
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Camera Viewpoint & Perspective Lock (Anti-Portrait Bias)
To prevent the AI from flipping a character's back into a front-facing portrait:
1. **Explicit Perspective Declaration:** Every shot must explicitly declare the viewpoint relative to the character:
   - `Camera Perspective: Rear three-quarter view (viewed strictly from behind; character's back and shoulders face the camera; character faces forward toward the door).`
2. **Negative Perspective Bans:** If a shot requires viewing the subject from behind, the negative prompt must explicitly include:
   - `Negative Prompt: frontal portrait, facing camera, turned around to face viewer, reversed eyeline.`

---

## 5. Pillar 4: Dynamic Audio / BGM Continuity Across Cuts

### 5.1 The Cross-Clip BGM Dynamic State Machine
Every clip sequence must maintain an explicit **BGM Dynamic Handover Curve**:

$$\mathbf{Dynamic\ State(Clip\ N+1)_{Entry} = Dynamic\ State(Clip\ N)_{Exit}}$$

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     BGM CONTINUITY HANDOVER ARCHITECTURE                    │
├─────────────────────────────────────────────────────────────────────────────┤
│ CLIP N:                                                                     │
│ • Entry Dynamic: Mid-Volume (50%), 110 BPM, subtle pulsing bass             │
│ • Progression: Dramatic escalation as tension peaks                         │
│ • Exit Dynamic: PEAK HIGH VOLUME (85%), intense orchestral crescendo        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                CUT TRANSITION                               │
├─────────────────────────────────────────────────────────────────────────────┤
│ CLIP N+1:                                                                   │
│ • Entry Dynamic: MATCHES EXIT (85% Volume, High Energy Climax)              │
│ • Prompt Directive: "Music: enters immediately at full climactic volume     │
│   (85% intensity, continuing the aggressive brass and driving tempo from    │
│   preceding cut), sustaining peak tension before resolving..."              │
│ • Exit Dynamic: Sustained High or Motivated Resolution Decrescendo          │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Standardized BGM Handover Directives
1. **`[CONTINUATION - SUSTAIN]` (Matched Handover):**
   - `Music: enters immediately at high volume (matching the crescendo peak of preceding shot), sustaining continuous heavy sub-bass and distorted strings without drop in volume or tempo.`
2. **`[CONTINUATION - DECAY / DECRESCENDO]` (Motivated Resolution):**
   - `Music: enters at peak intensity matching preceding shot, immediately cascading into a gradual 2-second decrescendo down to a hushed atmospheric drone.`
3. **`[CONTINUATION - ACCELERATION]` (Building Arc):**
   - `Music: seamlessly continues the medium-tempo ostinato from preceding shot, accelerating rhythmic percussion toward a mid-shot impact.`
4. **`[MOTIVATED HARD CUT / NEEDLE DROP]` (Intentional Silence or Hit):**
   - `Music: sudden instantaneous music cut on frame one; absolute zero score, yielding completely to room tone and dialogue echo.`

---

## 6. Proposed Specification & Linter Updates (For Next Steps)

When approval is granted to implement these changes:

1. **Linter `L-01` (Word Economy) Overhaul:**
   - Abolish the 150-word cap on descriptive scene/video prompts.
   - Retain `L-14` (Speech Velocity) for dialogue timing over duration buckets.
   - Transform `L-01` from a word ceiling into a **Descriptive Completeness Linter** (ensuring subject DNA, room topology, Z-index depth, and kinematics are fully specified).
2. **`03_scenery_spec.md` Update:**
   - Add `ground_rules.md` file contract, template, and injection protocol.
   - Add explicit sections for Room Topology Invariance and Z-Index Depth Layering.
3. **`04_cinematography_audio_spec.md` & `05_directors_cut_assembly_spec.md` Update:**
   - Add Kinematic Action Handover protocols (Terminal-to-Initial Pose Continuation).
   - Add Perspective / Viewpoint Lock (Front vs. Back vs. Profile).
   - Add Dynamic BGM Continuity & Cross-Clip Volume Handover.
   - Update `L-17` (Audio Syntax) to require dynamic entry/exit handover tags.
4. **Agent Skill Directives (`openproducer-produce`, `openproducer-sync`):**
   - Ensure the compiler injects `ground_rules.md` positive invariants into shot descriptions and negative constraints into the negative prompt field.
   - Audit BGM and Kinematic handover states across adjacent clips (`clip_01` $\rightarrow$ `clip_02` $\rightarrow$ `clip_03`).

---

## 7. Verification & Next Steps

This expanded document captures all creator feedback:
- **Package (`src/...`) remains strictly untouched.**
- **No production specs have been modified yet.**
- **Awaiting creator review and explicit approval.**
