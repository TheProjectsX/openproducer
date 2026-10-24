# Style Plugin: Live-Action Cinema
**ID:** `live_action_cinema`  
**Target Medium:** Photorealistic Live-Action Film (35mm Anamorphic Cinema)  
**Parent Specification:** [`../specs/01_visual_spec.md`](../specs/01_visual_spec.md)  

---

## 1. Master Style Anchor String (Verbatim Token Block)
> `Shot on 35mm film stock, organic fine grain, natural dynamic range, Panavision C-Series anamorphic prime lens, subtle optical halation around warm incandescent highlights, natural skin texture with visible biological pores, shallow depth of field, creamy circular bokeh, cinematic color grading, rich authentic shadows.`

---

## 2. Anatomical & Materiality Rules
* **Skin/Surface:** Authentic biological skin textures, fine pores, subtle natural micro-creases, visible peach fuzz under rim light. Strictly zero plastic skin smoothing or airbrushed beauty filters.
* **Eyes & Face:** Natural human eye saccades, authentic corneal reflections, relaxed facial muscles, biological eyelid geometry.
* **Wardrobe Materiality:** Natural textile drape, visible woven threads, subtle surface wear, organic creasing conforming to human movement.

---

## 3. World & Lighting Physics
* **Canvas / Depth:** Full 3-dimensional optical perspective with foreground, midground, and background separation.
* **Lighting Model:** Motivated cinematic 3-point lighting (soft keylight, subtle fill, motivated incandescent rim light) with natural falloff into rich shadows.
* **Atmosphere:** Natural ambient air, subtle haze or volumetric dust motes when motivated by shafts of light.

---

## 4. Kinematic Grammar
* **Motion Style:** Grounded human biomechanics, organic weight transfer, natural inertia.
* **Camera Kinematics:** Pure optical kinematics (slow creeping push-in, subtle eye-level track, stationary locked-off MCU). Strictly zero physical hardware rig nouns (`tripod`, `dolly track`, `crane`).

---

## 5. Mandatory Style Negative Prompt Clause
> `NEGATIVE PROMPT: 3D render, CGI, cartoon, anime, plastic skin, airbrushed, oversaturated, video game graphics, doll, action figure, artificial halation blur, extra limbs, deformed anatomy.`
