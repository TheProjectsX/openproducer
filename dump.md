# Staging Dump: Active Production Framework Enhancements
**Status:** 🟡 UNPROCESSED STAGING DUMP (To be migrated into formal specifications)  
**Last Updated:** 2026-10-26  

---

## Domain 1: Subject & Likeness Domain (Image-to-Character Enhancements)

### 1.1 The "Angled Pose" Perspective Normalizer (2-Step Head Pose Normalization)
* **Problem:** When creators provide candid selfies or portraits that are angled (3/4 view, chin tilted, neck turned), prompting directly for a front-facing character or 4-view turnaround sheet forces the diffusion model to simultaneously:
  1. Hallucinate missing 3D facial bone structure for the obscured side.
  2. Straighten a twisted neck and un-tilt shoulders.
  3. Extrapolate new clothing and full-body proportions.
  *Failure Mode:* The model drops the creator's unique biometric identity, keeps only skin tone/hair color, and substitutes a generic, symmetrical AI face.
* **The Solution (The 2-Step Normalization Protocol):**
  * **Step 1A (Neutral Head Pose Normalization Plate):**
    * Output a single eye-level, straight-on frontal portrait on solid `#E5E5E5`.
    * Prompt explicitly isolates de-rotation without wardrobe or expression changes:
      > `Frontal eye-level passport-style portrait of the exact same person from the reference image, neutralizing head tilt and neck angle into a straight forward-facing posture, maintaining 100% identical facial bone structure, jawline contours, nose bridge, eyes, and skin micro-textures from the reference photo. Neutral relaxed expression, closed mouth. Seamless solid neutral light-gray background (#E5E5E5), flat shadowless diffuse lighting. Pure biometric alignment plate, zero wardrobe changes, not an altered face, not a generic AI face.`
  * **Step 1B (Full Character Activation & Downward Extrapolation):**
    * Once the frontal likeness plate is generated and confirmed, feed Step 1A as the reference anchor for full-body turnaround generation, wardrobe changes, and dynamic expressions.

---

### 1.2 The "Bobblehead" & Caricature Glitch Fix (Head-to-Body Ratio Lock)
* **Problem:** Selfies taken with wide mobile lenses close to the face suffer from perspective barrel distortion (enlarged forehead/nose). When prompted for full-body generation, diffusion models interpret the face scale literally, resulting in an oversized head on a tiny torso ("bobblehead" / goofy caricature effect).
* **The Solution (Explicit Anatomical Ratio Constraint):**
  * Enforce standard realistic human head-to-body scale in prompt tokens:
    > `Realistic adult human anatomical proportions, strictly natural 1:7.5 head-to-body scale ratio, natural shoulder width proportional to torso height, realistic musculoskeletal weight distribution.`
  * **Mandatory Anti-Bobblehead Negative Directives:**
    > `NEGATIVE PROMPT: oversized head, giant face, bobblehead effect, caricature proportions, dwarfism, shrunken torso, shortened limbs, chibi anatomy, cartoon proportions, deformed neck.`

---

### 1.3 The Expression Decoupling Engine (Clean Winks & Smiles)
* **Problem:** Prompting words like `"smiling"` or `"winking"` triggers extreme training weights from stock photos and caricatures, distorting authentic jaw, cheek, and eye anatomy.
* **The Solution (Decoupling Bone Structure from Transient Muscle Flexion):**
  * Anchor immutable bone geometry first, then articulate muscles second:
    > `Maintain 100% of the exact facial bone structure, jawline contours, cheekbone width, and nose bridge from the reference image without alteration. Dynamic facial expression: while strictly preserving authentic biological facial landmarks, the facial musculature naturally articulates into a relaxed, friendly subtle smile with naturally lifted cheeks and softly parted lips; the left eye is playfully winking while the right eye maintains its authentic shape and iris color from the photo. Real living human face, subtle natural micro-expression, not an exaggerated caricature, no frozen grimace, no facial distortion.`

---

### 1.4 The Creator Zero-Burden Rule
* The creator is **NEVER** asked to write biometric facial descriptions or anatomical jargon.
* The multimodal AI Agent inspects the uploaded reference photo, detects pose angles and facial landmarks, and injects the technical normalization and scale tokens under the hood automatically.

---

## Domain 2: Script, Narrative & Dynamic Hook Architecture

### 2.1 Dynamic Narrative Tempo & Hybrid Pacing (No Rigid Durations)
* **Core Philosophy:** Target duration and speech velocity cannot be a static default. Different stories and beats require radically different tempos:
  * *Slow-Burn / Spooky Dread (1.8 – 2.2 WPS):* Atmospheric psychological horror, eerie soliloquies, deliberate pauses to give the viewer the full scare.
  * *High-Velocity / Hyped Pacing (2.6 – 3.0 WPS):* High-energy explainers, intense action, frantic escapes, viral retention.
  * *Hybrid Pacing Arc:* Stories that transition dynamically across beats (e.g. starting slow and atmospheric, accelerating into breathless panic during the climax, and dropping back into silence for the chill payoff).
* **Word-to-Time Adaptation:** Durations adapt dynamically per clip beat based on emotional intensity rather than a flat mathematical constant.

---

### 2.2 Perspective & The Creator Agency Protocol (2nd Person vs. Authored Scripts)
* **2nd-Person Immersive Staging (`"Suppose you woke up at 2 AM..."`):** Powerful psychological technique for pulling the viewer directly into the protagonist's shoes.
* **The Non-Imposition Law (Respecting Authored Intent):**
  * **Scenario A (Creator supplies a Rough Plot / Premise / Concept):** The AI Agent is actively empowered to propose the immersive 2nd-person perspective, draft dialogue, and structure the narrative arc.
  * **Scenario B (Creator supplies an Authored Script / Walkthrough / Draft):** If the creator has already provided a script or detailed walkthrough, **the AI MUST NOT impose or rewrite their narrative voice**. The creator has already put deliberate thought into their words. The AI's role is strictly limited to measuring clip durations, suggesting pacing adjustments, and slicing into visual clips, never rewriting their creative expression.

---

### 2.3 Dynamic Hook Governing Rules (Ban Static Templates)
* **No Mad-Libs Templates:** Banish rigid, copy-paste formulas (e.g. fill-in-the-blank `"Have you ever felt like [X]?"`).
* **Dynamic Hook Rules:**
  1. *Immediate In Medias Res (Zero Warm-up):* Plunge directly into a sensory event, physical action, or high-stakes choice within the first 3 seconds. Zero introductory filler (`"In this video..."`).
  2. *Disruption of Everyday Equilibrium:* Break an ordinary expectation immediately (`"You lock your front door every night. But tonight, the lock turns from the other side."`).
  3. *Contextual Organic Generation:* Hook phrasing must be generated organically from the creator's exact plot stakes and genre rather than a generic template.

---

## Domain 3: Packaging & Growth (Thumbnails & Branding)
* **Status:** 🗑️ TRASHED / DISCARDED BY CREATOR CONSENSUS
* **Decision:** Excluded from production framework core scope to prevent marketing bloat. The AI agent already has native multimodal capabilities to describe thumbnails on demand if asked by the creator; dedicated framework specifications are not required.

---

## Domain 4: Directorial Slicing & Visual Rhythm (Staged for Next Session)
* **Status:** ⏳ PENDING RESUMPTION IN NEXT SESSION
* **Core Concepts to Finalize:**
  1. *The 4-Beat Visual Rhythm:* Alternating sequence functions (`Grounded Action 3–5s` $\rightarrow$ `Direct Focal 2–3s` $\rightarrow$ `Cutaway / Metaphor 2–4s` $\rightarrow$ `Reaction Beat 1–2s`) to prevent visual stagnation and focus lip-sync strictly on the direct focal cut.
  2. *The 4 Match-Cut Handoffs:* Standardizing timeline editing tags (Match on Pose, Match on Prop, Match on Shape, Match on Tone) for smooth straight cuts and 0.5s dissolves in CapCut/Premiere.
  3. *Long-Form Timestamped Multi-Beat Prompts:* Finalizing `assembly_mode: monolithic` syntax for 10–15s engines (Seedance 2.0, Sora).

---

## Domain 5: Audio Engineering & Decoupling (Staged for Next Session)
* **Status:** ⏳ PENDING RESUMPTION IN NEXT SESSION
* **Core Concepts to Finalize:**
  1. *3-Track Audio Prompt Separation:* Explicitly isolating prompt soundscapes into `SFX:` (discrete physical contacts), `Ambient:` (continuous room tone/atmosphere), and `Music:` (target BPM, genre, and mood direction for post-production editing).
  2. *Reference-Only Script Headers:* Formalizing the `(REFERENCE ONLY)` wrapper to provide narrative context to visual models without triggering burned-in subtitles.


