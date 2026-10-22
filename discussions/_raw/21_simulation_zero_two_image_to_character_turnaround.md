# Discussion 21: Simulation — Zero Two (Image-to-Character Turnaround via Subject Spec)

**Date:** 2026-10-22  
**Status:** ✅ FINALIZED (Skill Simulation)  
**Topic:** End-to-End Simulation of Image-to-Character Turnaround (Zero Two Uniform) using `02_subject_spec.md` delegating to `02_character_spec.md`  
**Domain:** `subjects/` & `characters/`  

---

## 1. Creator Input (Human Layer)

> *"Hey, I have a picture of a girl. I want her to look like Zero Two from Darling in the Franxx. Let's start with her daily wearing uniform, then we will go to mecha suit. So I need a prompt to take the girl from the image and make her like Zero Two, with the hair color and everything, only the face will match and the reference girl's body structure. Not anime version, realistic original version"*

---

## 2. Specification Execution Pipeline

### A. Routing via `02_subject_spec.md`
- The system inspects the subject type: **Living Human Character**.
- Per Section 2 of `02_subject_spec.md`, the pipeline delegates to [`02_character_spec.md`](./02_character_spec.md) (Scenario 1: Image-to-Character).

### B. Execution via `02_character_spec.md` (Scenario 1)
1. **Facial Likeness Constraint:** Preserves the reference photo's facial geometry, jawline, nose bridge, and lip shape as locked invariant constraints.
2. **Biological Build Inheritance:** Retains the reference girl's natural height, shoulder-to-hip proportions, and natural posture.
3. **Cosplay Deconstruction Engine (Zero Two Uniform):**
   - *Signature Features:* Long pastel-pink straight hair cascading past waist with blunt bangs, two small curved glossy red oni horns emerging from forehead hairline, thin white mechanical headband/limiter, vibrant turquoise/cyan eyes with signature reddish-pink winged eyeliner accents.
   - *Signature Garments:* Deep crimson-red tailored military tunic dress with crisp white piping along chest and lapels, high stand-up Mandarin collar, double-breasted gold-rimmed buttons, black leather waist belt with rectangular silver buckle, dark charcoal opaque thigh-high stockings, polished white knee-high boots with red sole trim.
   - *Materiality:* Real woven wool-cotton blend textile, functional stitching, natural fabric drape (avoiding shiny plastic cosplay fabric).
4. **Style Harmonization:** Realistic Live-Action (85mm portrait prime lens, natural skin micro-pores, authentic subsurface scattering, real human actor in tailored movie wardrobe).
5. **Anti-Action-Figure Guards:** Strictly bans plastic toys, dolls, action figures, ball joints, and 3D miniatures.
6. **Canvas Standard:** 4 panels arranged horizontally on a seamless solid `#E5E5E5` neutral light-gray background with flat, uniform, shadowless diffuse studio lighting.

---

## 3. The Compiled 4-View Turnaround Prompt

```text
A professional 4-view character turnaround reference sheet of a real living female actor, strictly preserving the exact facial structure, bone contours, and natural body proportions from the reference image, adapted into a realistic live-action cinematic portrayal of Zero Two in her military uniform.

Subject Traits: The woman has long, silky straight pastel-pink hair falling past her waist with blunt-cut bangs, two small curved glossy red oni horns sprouting naturally from her upper forehead hairline, a slender white mechanical headband limiter, and striking turquoise-cyan feline eyes with subtle reddish-pink winged eyeliner accents. Real human skin with authentic micro-pores, natural texture, and soft subsurface scattering.

Wardrobe: Wearing a tailored, structured crimson-red military uniform coat dress made of matte wool-blend fabric with crisp white seam piping, high stand-up collar, double-breasted brass buttons, a black leather waist belt with silver buckle, dark charcoal opaque thigh-high stockings, and polished white calf-high boots with red sole accents. Tailored cinematic movie costume with authentic fabric weave and natural wrinkles.

Layout: Studio reference model sheet arranged horizontally across a solid seamless neutral light-gray background (#E5E5E5) with flat uniform diffuse lighting:
1. Panel 1: Full-body Front View standing naturally in a relaxed posture, empty hands resting at sides.
2. Panel 2: Full-body 90-degree Side Profile View showing side silhouette, chest tailoring, horn curvature, and hair falling down back.
3. Panel 3: Full-body Back View showing rear coat seams, waist belt closure, and hair cascading past the waist.
4. Panel 4: Detailed Close-up Headshot portrait capturing authentic facial likeness from the reference image, skin pores, turquoise eyes with red wing accents, and red horns with headband.

Style: Ultra-realistic cinematic movie still, 85mm prime lens, clean studio cyclorama, pristine focal sharpness, zero digital buzzwords.
CRITICAL NEGATIVE CONSTRAINTS: Not an anime drawing, not an action figure, not a plastic toy, not a doll, no plastic ball joints, not a 3D miniature, no mannequin poses. Real living human being wearing tailored movie wardrobe.
```
