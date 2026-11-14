# Discussion 87: Persistent Reference Ingredients in Video Generation (Dual Conditioning Architecture)

**Date:** 2026-11-14  
**Context:** Solving mid-clip facial morphing, wardrobe drift, and environment mutation during dynamic camera moves, character walk-ins, tilt-up reveals, and head turns.  
**Status:** ✅ FINALIZED & CODIFIED IN SPECS & TEMPLATES

---

## 1. Problem Diagnosis: The "Start-Image-Only" Blindspot

Previously, the framework operated on a strict 3-tier sequence:
- **Tier 1:** Base Turnaround Ingredients (`[IMAGE 1]` Subject, `[IMAGE 2]` Empty Stage).
- **Tier 2:** Keyframe starting frame (`image_prompt.txt`), combining Subject + Stage.
- **Tier 3:** Video generation (`video_prompt.txt`), passing **only** the single starting keyframe as the input seed.

### The Empirical Failure in Real Production
Relying solely on a single starting image fails disastrously in three very common cinematic shot types:

1. **The "Walk-In" / Subject Entry Shot:**
   - *Frame 1 ($t=0\text{s}$):* Camera frames an empty hallway or open doorway.
   - *Action ($t=2\text{s}$):* Character walks into the frame.
   - *The Glitch:* The starting frame contains only the room. The video diffusion model has **zero visual reference** for the character's face, hair, or clothes. It invents an arbitrary stranger.

2. **The Macro-to-Subject Reveal / Tilt-Up Shot:**
   - *Frame 1 ($t=0\text{s}$):* Extreme macro close-up of a prop or hands on a desk.
   - *Action ($t=3\text{s}$):* Camera pulls back or tilts up to reveal the seated character and surrounding room.
   - *The Glitch:* The starting keyframe had no face or room context. The revealed character looks completely disconnected from the established subject DNA.

3. **The Rear-to-Front Head Turn:**
   - *Frame 1 ($t=0\text{s}$):* Camera frames the back of the character looking out a window.
   - *Action ($t=4\text{s}$):* Character turns 180 degrees to face the camera.
   - *The Glitch:* The starting image only showed the back of their head/shoulders. When they turn, the model hallucinates an untrained facial structure.

---

## 2. The Solution: Dual-Conditioned Video Generation

Modern video diffusion models (Google Flow / Veo 3.1) decouple the **Start Frame (`First Frame`)** from **Reference Ingredients (`[IMAGE 1]`, `[IMAGE 2]`, `[IMAGE 3]`)**.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    DUAL-CONDITIONED VIDEO GENERATION                        │
├─────────────────────────────────────────────────────────────────────────────┤
│ 1. FIRST FRAME (START SEED):                                                │
│    • Target: clips/clip_XX/image_prompt.txt (or LAST_FRAME of Clip N-1)     │
│    • Function: Locks the exact pixel geometry, framing, and pose at t = 0.  │
├─────────────────────────────────────────────────────────────────────────────┤
│ 2. PERSISTENT INGREDIENTS (IDENTITY & SCENE DNA):                           │
│    • [IMAGE 1] (Subject Sheet): subjects/<id>/profile_prompt.txt           │
│      - Locks facial biometrics, hair texture, and wardrobe across motion.   │
│      - Protects face during walk-ins, tilt reveals, and 180° turns!         │
│    • [IMAGE 2] (Empty Stage): visuals/environments/<id>/prompt.txt          │
│      - Locks room architecture, ceiling height, materials, and lighting     │
│        when the camera pans or sweeps across the room.                      │
│    • [IMAGE 3] (Optional Hero Prop): subjects/<prop_id>/hero_prompt.txt     │
│      - Locks specific props held or revealed during the shot.               │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Direct Ingredient-Conditioned Mode (Zero-Image Video Generation)

In addition to Dual Conditioning, this architecture officially unlocks **Direct Ingredient-Conditioned Video Generation**:
- For high-tempo cutaways, atmospheric B-roll, or rapid action clips where creating a separate still keyframe first is unnecessary:
- The creator attaches `[IMAGE 1]` (Subject) + `[IMAGE 2]` (Environment) directly into Google Flow's video generator without generating a still image first!
- Veo synthesizes the video directly from the text prompt while keeping 100% fidelity to the character and room ingredients.

---

## 4. Updates to Specifications & Linter Registry

1. **Linter `L-06` (Subject DNA & Multi-Conditioned Video Ingredients):**
   - Transformed from a restrictive single-seed rule into a **Dual Conditioning Standard**: Video prompts officially support and encourage binding First Frame + Persistent Ingredients (`[IMAGE 1]`, `[IMAGE 2]`).
2. **`05_directors_cut_assembly_spec.md` & `07_scaffolding_and_workspace_spec.md`:**
   - Standardized `[INPUT SEEDS & INGREDIENTS]` block across all `clips/clip_XX/video_prompt.txt` files.
3. **`openproducer-produce/SKILL.md`:**
   - Updated compiler directives to populate both starting frames and persistent reference ingredients.
