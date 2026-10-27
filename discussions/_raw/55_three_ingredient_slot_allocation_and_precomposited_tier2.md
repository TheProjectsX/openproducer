# Discussion 55: The 3-Ingredient Slot Allocation & "Pre-Composited Tier 2" Protocol

**Date:** October 27, 2026  
**Topic:** Solving Google Flow's 3-Ingredient Slot Limit and Multi-Sheet Identity Bleed via Tier 2 Keyframe Pre-Compositing  
**Target Specifications:** [`05_directors_cut_assembly_spec.md`](../../production_framework/specs/05_directors_cut_assembly_spec.md), [`02_character_spec.md`](../../production_framework/specs/02_character_spec.md), [`02_subject_spec.md`](../../production_framework/specs/02_subject_spec.md), [`03_scenery_spec.md`](../../production_framework/specs/03_scenery_spec.md)

---

## 1. Problem Statement: Why Direct Multi-Ingredient Video Conditioning Breaks

In Google Flow (orchestrating Veo 3.1 and Imagen 4), the "Ingredients to Video" interface accepts up to **3 reference images**:
- **Ingredient #1 (`[IMAGE 1]`):** Primary Subject Turnaround (`#E5E5E5`)
- **Ingredient #2 (`[IMAGE 2]`):** Empty Stage Environment Plate
- **Ingredient #3 (`[IMAGE 3]`):** Secondary Subject Turnaround or Hero Prop

When all 3 raw reference sheets are passed directly into **Veo 3.1 Video Generation** simultaneously, two failure modes emerge:
1. **The 3-Slot Ceiling:** A wide two-shot scene containing **Character A + Character B + 1 Hero Prop + 1 Environment** requires 4 assets, overflowing the 3-slot limit.
2. **Latent Identity & Background Bleed in Video:** Forcing Veo 3.1 to simultaneously parse multiple 4-panel `#E5E5E5` turnaround sheets, composite them into an empty 3-plane room, and synthesize 8 seconds of biomechanical motion and lip-sync splits temporal attention. Characters swap clothing colors, `#E5E5E5` neutral gray bleeds into room lighting, and props warp.

---

## 2. Architectural Solution: The "Pre-Composited Tier 2" Division of Labor

We decouple **Multi-Ingredient Spatial Compositing (Tier 2)** from **Temporal Motion & Audio Synthesis (Tier 3)**:

1. **Tier 2 (Still Keyframe Compositing — `clips/clip_XX/image_prompt.txt`):**
   - Executed in Imagen 4 / Nano Banana (Image Mode), which excels at spatial composition and costs pennies to re-roll.
   - Binds up to 3 atomic Ingredients (`[IMAGE 1]`, `[IMAGE 2]`, `[IMAGE 3]`) using **Multi-Index Lean Reference Anchoring (`L-06`)**:
     `The exact same person from [IMAGE 1] positioned screen-left, holding the exact object from [IMAGE 3], set inside the exact environment from [IMAGE 2]...`
   - Outputs **one finished, pre-composited starting keyframe image (`keyframe_XX.png`)** where character likeness, prop geometry, and 3-plane room lighting are already baked into Frame 0.

2. **Tier 3 (Pure Video Motion & Audio — `clips/clip_XX/video_prompt.txt`):**
   - Executed in Google Flow / Veo 3.1 (Frames-to-Video).
   - Receives **ONLY the single approved Tier 2 pre-composited keyframe (or `LAST_FRAME` of Clip $N-1$)** as its `first_frame` seed—never raw `#E5E5E5` turnaround sheets.
   - Dedicates 100% of Veo 3.1's latent capacity to smooth biomechanical motion, camera kinematics, and synchronized audio.

---

## 3. The Universal 3-Ingredient Slot Allocation Matrix

| Scene Complexity | `[IMAGE 1]` (Slot 1) | `[IMAGE 2]` (Slot 2) | `[IMAGE 3]` (Slot 3) | Overflow / Text Fallback Strategy |
|---|---|---|---|---|
| **1 Subject + 1 Environment** | Primary Subject Sheet | Empty Stage Plate | *(Optional)* Hero Prop or Style Ref | Zero overflow; all assets bound visually. |
| **1 Subject + 1 Prop + 1 Environment** | Primary Subject Sheet | Empty Stage Plate | Hero Prop Turnaround | Zero overflow; use `[IMAGE 1]`, `[IMAGE 2]`, `[IMAGE 3]` in Tier 2 prompt. |
| **2 Characters + 1 Environment (Clean Single `L-13`)** | Active Speaker/Listener Sheet | Empty Stage Plate | *(Optional)* Scene Prop | Clean Singles isolate 1 character per clip, freeing Slot 3. |
| **2 Characters + 1 Prop + 1 Environment (Wide Two-Shot)** | Character A Sheet | Empty Stage Plate | Character B Sheet | Bind Characters A & B + Environment to Slots 1–3; inject Hero Prop via its locked `verbatim_anchor.txt` string. |
