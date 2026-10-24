# Raw Discussion 38: Empirical Diffusion Glitches — Prop Popping, Accidental Lip-Sync & Micro-Beat De-Cramming

**Date:** 2026-10-24  
**Domain:** `directors_cut/` / `assembly/`  
**Status:** ⚠️ Active High-Priority Refinement (Re-opening Phase 6)  
**Target Specification:** `production_framework/specs/05_directors_cut_assembly_spec.md`  

---

## 1. Empirical Ground Truth: The Reality of Real-World Flow Generations

Real-world execution of the compiled multi-clip prompts inside Google Flow (Veo 3.1) revealed three critical diffusion failure modes that broke video generation:
1. **Accidental Lip-Sync on Off-Screen / Phone Speech:** When the phone rang and an earpiece voice spoke, the detective's mouth unnervingly moved as if he was speaking.
2. **Prop Popping & Morphing in Hands:** Objects (flashlights, weapons) materialized out of nowhere or morphed into skin when prompted during dynamic body movements.
3. **Temporal Multi-Event Cramming (Severe Rushing):** Cramming 4–5 storytelling beats into an 8-second clip caused severe motion blurring, warping, and temporal collapse.

Phase 6 remains **IN PROGRESS** to systematically eliminate these vulnerabilities at the prompt compilation level.

---

## 2. Root Cause Analysis & Architectural Laws

### 2.1 Law 1: The "Closed-Lip Listener" Rule (Solving Accidental Lip-Sync)
- **The Glitch:** In Veo 3 / 3.1, quoted dialogue text `"...words..."` combined with an on-screen human face automatically activates cross-attention lip-syncing on that face, even if the text states the voice comes from an earpiece or off-screen.
- **The Enforcement:**
  1. *Explicit Closed-Mouth Constraint:* When a character listens to an external speaker (phone, radio, off-screen voice), the prompt **MUST explicitly lock the actor's lips**:
     > `"Detective Cross listens in stunned silence with firmly closed lips, tight jaw, zero mouth movement, showing silent dread."`
  2. *Quotation Decoupling & Explicit Attribution:* Clearly attribute the audio source away from the actor:
     > `"An off-screen telephone receiver speaker emits: '...' "`
  3. *Audio Block Separation:* Enforce in the trailing audio:
     > `Audio: filtered off-screen telephone audio, zero speech from on-screen actor.`

### 2.2 Law 2: The "Pre-Materialized Prop" Law (Solving Prop Popping & Morphing)
- **The Glitch:** Diffusion models lack 3D rigid-body simulation. Prompts asking a character to *pull* an object from a holster, *draw* a weapon, or casually *holding* an unlit object while walking through doors result in severe occlusion confusion—causing objects to suddenly pop into existence or melt into hands.
- **The Enforcement:**
  1. *Frame-Persistent States:* Props must never materialize mid-clip. They must be declared **already firmly grasped from Frame 1 to Frame End**:
     > `"His right hand is already firmly grasping the steel flashlight from the first frame to the last. Rigid prop geometry, stable hand anatomy, zero morphing, no popping objects."`
  2. *The Cutaway Principle for Action Transitions:* Drawing a weapon or picking up an object must never be a continuous diffusion animation. It must be sliced into an edit:
     - *Shot A:* Hand drops down to holster.
     - *Shot B (Cut to tight MCU):* Weapon is **already drawn and aimed**.
  3. *Empty Hands by Default:* When walking or entering scenes, characters' hands must be either clearly empty, resting in pockets, or holding a persistent prop throughout the entire take.

### 2.3 Law 3: The "Micro-Beat De-Cramming" Law (Solving Over-Pacing & Video Breakdown)
- **The Glitch:** Slicing a scene into 8 seconds is meaningless if the prompt still demands: *enter through door + walk down corridor + turn head + look at clock reading 2:17 AM*. Veo cannot compress 20 feet of camera travel and 4 sequential narrative beats into 8 seconds without temporal chaos.
- **The Enforcement:**
  $$\mathbf{1 \text{ Clip}} = \mathbf{1 \text{ Camera Trajectory}} + \mathbf{1 \text{ Spatial Plane}} + \mathbf{1 \text{ Micro-Action}}$$
  - Every clip must be stripped down to a single calm, deliberate, unhurried micro-moment.
  - Secondary narrative beats (like an analog clock on a wall) **must either be an isolated macro cutaway insert** or eliminated from the action clip entirely.
