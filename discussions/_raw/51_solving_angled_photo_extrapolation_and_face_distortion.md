# Discussion 51: Solving Angled Photo Extrapolation, Facial Distortion & The Bobblehead Glitch

**Date:** 2026-10-26  
**Status:** ✅ RESOLVED & STAGED IN `dump.md`  
**Topic:** Real-world Empirical Failure Modes in Image-to-Character Conversion: Angled/Posed Photos, Expression Distortions (Winks/Smiles), and Head-to-Body Anatomical Proportions  
**Parent Specifications:** [`production_framework/specs/02_character_spec.md`](../../production_framework/specs/02_character_spec.md), [`production_framework/specs/02_subject_spec.md`](../../production_framework/specs/02_subject_spec.md)  
**Staging Reference:** [`dump.md`](../../dump.md)

---

## 1. Empirical Problem & Creator Experience

During real-world character creation testing from personal reference photos, the creator uncovered three catastrophic diffusion failure modes:

1. **The Angled / Posed Neck Perspective Collapse:**
   > *"In one of the images I used, which was not from frontside, like you know, posed neck sided kinda shit. So the AI took the face, reimagined it for itself somehow, kept the skin tone and such. But now that it is fixing from one a bit angled face to a front face, it broke."*
   - When converting a 3/4 angled, neck-turned, or tilted selfie into a frontal character or turnaround sheet, the diffusion model dropped unique biometric likeness, keeping only skin tone and hair color, and substituted a generic, symmetrical AI face.

2. **The Expression Distortion Trap (Winking / Smiling Caricature):**
   > *"And I was trying for a bit of changed face emotion. Like winking, smiling and such. But those things became a bit hard to be clean copy-pasta. Instead, the face became distorted."*
   - Prompting emotion changes (winking, smiling) caused severe facial warping, turning the person into a goofy caricature or grotesque grimace.

3. **The "Bobblehead" & Caricature Glitch (Head-to-Body Proportion Scale):**
   > *"Does the image to image need face description? Which we are trying to avoid. Sometimes the face becomes too big for the body. Sometimes goofy kinda thing. Again, it is about the character creation - from image to image."*
   - Models frequently render an oversized head on a shrunken, tiny body with distorted neck proportions.

---

## 2. Root Cause Analysis

| Glitch | Physical / Generative Mechanism | AI Failure Mode |
|---|---|---|
| **Angled Pose Collapse** | Diffusion model attempted 3 simultaneous math operations: (1) un-rotate 3D skull, (2) straighten a twisted neck/shoulders, (3) extrapolate full body and clothes. | Model collapses to highest-probability prior: generic symmetrical AI face sharing skin/hair tone. |
| **Expression Warping** | Tokens like `"smiling"` or `"winking"` activate massive training clusters of extreme stock photo smiles, cartoon expressions, and caricatures. | Diffusion latent attention prioritizes the extreme smile tokens over subtle biometric landmark conditioning. |
| **Bobblehead Proportions** | Mobile selfies are shot with wide lenses (24–28mm) at close proximity, producing optical barrel distortion (enlarged forehead/nose) without body context. | When body is requested, diffusion treats face scale literally, squeezing a miniature torso beneath a giant head. |

---

## 3. The Creator Zero-Burden Principle

* **Core Axiom:** The creator must **NEVER** be required to manually type anatomical biometric jargon (*"almond-shaped eyes, 120-degree jawline, straight nasal dorsum"*). Doing so defeats the purpose of an AI production assistant.
* **The Agentic Division of Labor:**
  1. The **Creator** simply uploads their photo and describes what they want in plain human words (*"Standing naturally in a black crewneck, friendly smile, natural pose"*).
  2. The **Multimodal AI Agent** inspects the image pixels directly, detects head tilt/pose angles, extracts key biometric landmarks, and programmatically injects technical boundary constraints under the hood.

---

## 4. Architectural Solutions

### 4.1 The 2-Step Angle Normalizer Protocol
For angled, neck-turned, or tilted reference photos:
* **Rule:** Never attempt perspective de-rotation, full-body extrapolation, wardrobe restyling, and expression changes simultaneously.
* **Step 1A (Neutral Head Pose Normalization Plate):**
  - Generates a single eye-level, straight-on frontal portrait on solid `#E5E5E5`.
  - Goal: Straighten head angle and lock 1:1 facial likeness with zero costume changes and a neutral expression.
  - *Prompt Syntax:* `Frontal eye-level passport-style portrait of the exact same person from the reference image, neutralizing head tilt and neck angle into a straight forward-facing posture, maintaining 100% identical facial bone structure, jawline contours, nose bridge, eyes, and skin micro-textures from the reference photo. Neutral relaxed expression, closed mouth. Seamless solid neutral light-gray background (#E5E5E5), flat shadowless diffuse lighting. Pure biometric alignment plate, zero wardrobe changes, not an altered face, not a generic AI face.`
* **Step 1B (Full Character Activation):**
  - Conditioned on the verified Step 1A frontal plate to generate turnaround sheets, custom wardrobe, and full-body kinematics.

### 4.2 The Head-to-Body 1:7.5 Anatomical Scale Ratio Lock (Anti-Bobblehead)
* Explicitly injects adult human anatomical scale into full-body prompts:
  > `Realistic adult human anatomical proportions, strictly natural 1:7.5 head-to-body scale ratio, natural shoulder width proportional to torso height, realistic musculoskeletal weight distribution.`
* **Mandatory Negative Directives:**
  > `NEGATIVE PROMPT: oversized head, giant face, bobblehead effect, caricature proportions, dwarfism, shrunken torso, shortened limbs, chibi anatomy, cartoon proportions, deformed neck.`

### 4.3 The Expression Decoupling Engine (Clean Smiles & Winks)
* Decouples immutable bone geometry from transient facial muscle flexion:
  > `Maintain 100% of the exact facial bone structure, jawline contours, cheekbone width, and nose bridge from the reference image without alteration. Dynamic facial expression: while strictly preserving authentic biological facial landmarks, the facial musculature naturally articulates into a relaxed, friendly subtle smile with naturally lifted cheeks and softly parted lips; the left eye is playfully winking while the right eye maintains its authentic shape and iris color from the photo. Real living human face, subtle natural micro-expression, not an exaggerated caricature, no frozen grimace, no facial distortion.`

---

## 5. Next Actions & Staging Status
* Staged in [`dump.md`](../../dump.md) under Domain 1.
* Awaiting final integration into [`02_character_spec.md`](../../production_framework/specs/02_character_spec.md) and [`02_subject_spec.md`](../../production_framework/specs/02_subject_spec.md) during next formal specification migration pass.
