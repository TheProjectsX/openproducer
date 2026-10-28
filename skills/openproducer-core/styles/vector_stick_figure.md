# Style Plugin: Universal Vector Stick Figure
**ID:** `vector_stick_figure`  
**Target Medium:** Minimalist 2D Vector Animation & Narrative Storytelling  
**Parent Specification:** [`../specs/01_visual_spec.md`](../specs/01_visual_spec.md)  
**Research Reference:** [`../../discussions/_raw/45_multi_variation_synthesis_pluggable_styles_and_universal_stick_dna.md`](../../discussions/_raw/45_multi_variation_synthesis_pluggable_styles_and_universal_stick_dna.md) & [`../../discussions/_raw/50_medium_vs_dialect_inheritance_model_for_styles.md`](../../discussions/_raw/50_medium_vs_dialect_inheritance_model_for_styles.md)

---

## 1. Master Style Anchor String (Verbatim Token Block — Ground-Level Default)
> `Minimalist 2D vector line-art animation. Limbs and torso are pure unbroken solid black vector strokes terminating in smooth rounded line-cap ends; strictly zero individual fingers, zero human hands, zero toes, zero knuckles, and zero fleshy details. The circular head is filled with solid opaque white (#FFFFFF) and contoured with a clean uniform black outline (#0F172A), completely devoid of facial features. Crisp graphic novel vector style, sharp outlines, uniform stroke weight throughout, flat 2D graphic art.`

---

## 2. Dialect Variations Registry (Layer 2 Aesthetic Dialects)

When the creator requests a specific visual sub-genre, educational format, or action tone, the compiler injects the corresponding dialect descriptor into Tokens 81–130:

### A. `minimalist_noir` (High-Contrast Psychological Dread / The 3:14 AM Doppelgänger)
* **Dialect Descriptor:** `High-contrast minimalist 2D vector noir animation, warm cream paper canvas (#F8F6F0), stark solid pitch-black vector silhouette (#0A0B0E), single motivated dramatic light cone casting deep graphic drop shadows, bleak psychological suspense aesthetic, crisp sharp line-art.`
* **Kinematics:** Creeping slow optical push-in, subtle hesitation micro-gestures, stationary locked-off composition.
* **Dialect Negatives:** `colorful backgrounds, neon colors, gradient shading, 3D shadows, cartoon comedy.`

### B. `kurzgesagt_infographic` (Vibrant Educational Science Infographic)
* **Dialect Descriptor:** `Vibrant vector infographic animation, rich jewel-toned flat gradient backgrounds with deep navy and radiant teal, bold clean rounded vector strokes, colorful stylized educational graphic art, crisp geometric shapes, sleek modern science illustration.`
* **Kinematics:** Snappy pose-to-pose transitions, smooth graphic zoom, energetic pop-in reveals, fluid vector sliding.
* **Dialect Negatives:** `gritty grain, horror shadows, textured paper, pencil outlines, realistic shading.`

### C. `action_smear_xiao_xiao` (Kinetic Martial Arts & Combat Smear)
* **Dialect Descriptor:** `High-octane 2D vector martial arts stick animation, Xiao Xiao combat aesthetic, dynamic smeared motion trails, exaggerated kinetic speed lines, stark minimalist high-contrast void background, intense kinetic impact frames, snappy keyframing.`
* **Kinematics:** Rapid whip-pan camera tracking, explosive acceleration, impact freeze-frames, kinetic recoil physics.
* **Dialect Negatives:** `slow lethargic motion, pastel colors, soft gradients, photorealism, blurry rendering.`

### D. `anatomical_stick_with_hands` (Technical Manual / Schematic Articulation)
* **Dialect Descriptor:** `Technical manual blueprint stick figure aesthetic, articulated elbows and knees, proportioned slender torso silhouette, clean 2D vector line-hands with distinct line-drawn fingers, schematic technical illustration, architectural precision.`
* **Kinematics:** Precise mechanical gestures, blueprint drafting zoom, architectural tracking glides.
* **Dialect Negative Override:** When active, the compiler **removes `individual fingers`** from the base negative prompt and enforces:
  `NEGATIVE OVERRIDE: fleshy human skin, photorealistic fingernails, realistic knuckles, organic dermal textures, 3D render.`

---

## 3. Anatomical & Vector Materiality Rules
* **Limbs & Torso:** Pure, continuous uniform black vector strokes (`#0F172A`).
* **Hand / Feet Termination:** Strictly `stroke-linecap: round`. Limbs simply end in smooth rounded tips. Zero branching digits, zero knobby knuckles, zero realistic human skin clusters (unless using `anatomical_stick_with_hands`).
* **Head Standard:** Perfect geometric circle filled with solid opaque white (`#FFFFFF`) and contoured with a clean black vector outline matching limb stroke thickness. Zero eyes, nose, or mouth by default.
* **Props in Hand:** When holding an object (smartphone, mug), the rounded limb tip merely touches or rests against the prop. Zero fingers wrapping around objects.
* **Period & Professional Silhouettes:** Characters convey profession, historical period, or personality through clean silhouette outerwear outlines (e.g. trenchcoat hem, Soviet Ushanka hat with ear-flaps, wire-rim spectacles).

---

## 4. Canvas & Lighting Architecture
* **Canvas Flexibility:**
  - *Narrative Suspense / Horror:* Warm cream paper canvas (`#F8F6F0`) revealed under motivated directional light cones falling off into pitch-black shadow (`#0A0B0E`).
  - *Explainer / Infographic:* Soft off-white cream canvas (`#F8F6F0`), neutral studio gray (`#E5E5E5`), or jewel-toned solid vector void with minimal architectural line grounding (avoiding pure `#FFFFFF` background fields to prevent Veo 3.1 scanline tearing).
* **Architectural Lines:** Minimalist single-line floors, tabletops, and door frames matching the stroke weight of the characters.

---

## 5. Kinematic Grammar
* **Motion Style:** Clean 2D pose-to-pose keyframing, unhurried micro-gestures (e.g. single arm raise, slow head tilt, steady walk cycle).
* **Camera Kinematics:** Pure optical vectors (subtle linear push-in, static eye-level framing, horizontal tracking pan). Strictly zero physical hardware rig nouns (`tripod`, `dolly track`, `crane`).

---

## 6. Native Audio Foley Soundboard (Google Veo 3.1)
All Veo vector prompts must utilize clean, frequency-isolated soundboard audio structured in the 4-part semicolon format:
* **Tactile Surface Foley:** `Audio: SFX: Whiteboard dry-erase marker squeak, paper page turn, subtle digital click; Ambience: Subtle room tone; Dialogue: None; Music: None.`
* **Atmospheric Suspense Bed:** `Audio: SFX: Creaking wooden floorboard, sharp metallic clock click; Ambience: Low eerie room silence; Dialogue: None; Music: Low ominous bass drone.`
* **Music Suppression Rule:** Always enforce `, Music: None.` over dialogue to protect vocal clarity.

---

## 7. Mandatory Style Negative Prompt Clause
> `NEGATIVE PROMPT: photorealistic, 3D render, CGI, fleshy human hands, individual fingers, realistic toes, knuckles, skin pores, facial features, realistic eyes, airbrush, gradient shading, realistic anatomy, doll, action figure, tripod, camera rig.`
