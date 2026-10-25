# Style Plugin: Live-Action Cinema
**ID:** `live_action_cinema`  
**Target Medium:** Photorealistic Live-Action Film (35mm Anamorphic Cinema)  
**Parent Specification:** [`../specs/01_visual_spec.md`](../specs/01_visual_spec.md)  

---

## 1. Master Style Anchor String (Verbatim Token Block — Ground-Level Default)
> `Shot on 35mm film stock, organic fine grain, natural dynamic range, Panavision C-Series anamorphic prime lens, subtle optical halation around warm incandescent highlights, natural skin texture with visible biological pores, shallow depth of field, creamy circular bokeh, cinematic color grading, rich authentic shadows.`

---

## 2. Dialect Variations Registry (Layer 2 Aesthetic Dialects)

When the creator requests a specific directorial style, color timing, or cinematic school, the compiler injects the corresponding descriptor into Tokens 81–130:

### A. `fincher_bleach_bypass` (Clinical Desaturated Bleach Bypass)
* **Dialect Descriptor:** `Shot on 35mm film stock, bleach bypass processing, desaturated cold slate and olive green color grading, hard silver retention, clinical composition, deep velvety crushed shadows, razor-sharp optical focus.`
* **Kinematics:** Precise motorized tracking glides, stationary locked-off composition, slow ominous push-in.
* **Dialect Negatives:** `warm golden glow, vibrant saturation, pastel tones, handheld camera wobble.`

### B. `wes_anderson_pastel_planar` (Symmetrical Storybook Pastel Cinema)
* **Dialect Descriptor:** `Symmetrical center framing, flat perpendicular camera angle, warm nostalgic pastel color palette with mustard yellow and pale turquoise, soft vintage 35mm lens clarity, storybook cinema aesthetic.`
* **Kinematics:** Flat lateral tracking glide, sudden 90-degree whip-pan snap, rigid theatrical actor staging.
* **Dialect Negatives:** `dark gloomy shadows, diagonal Dutch tilts, handheld shaky cam, gritty desaturation.`

### C. `nolan_70mm_imax` (Monumental Large-Format Cinema)
* **Dialect Descriptor:** `Shot on 70mm IMAX film, Panavision spherical glass, monumental scale, hyper-naturalistic dynamic range, neutral color timing, authentic atmospheric haze, pristine photographic clarity.`
* **Kinematics:** Majestic forward helicopter/drone glide emulation, expansive slow tilt, towering low-angle hero framing.
* **Dialect Negatives:** `heavy film scratches, extreme vintage vignette, artificial digital bloom, distorted fish-eye.`

---

## 3. Anatomical & Materiality Rules
* **Skin/Surface:** Authentic biological skin textures, fine pores, subtle natural micro-creases, visible peach fuzz under rim light. Strictly zero plastic skin smoothing or airbrushed beauty filters.
* **Eyes & Face:** Natural human eye saccades, authentic corneal reflections, relaxed facial muscles, biological eyelid geometry.
* **Wardrobe Materiality:** Natural textile drape, visible woven threads, subtle surface wear, organic creasing conforming to human movement.

---

## 4. World & Lighting Physics
* **Canvas / Depth:** Full 3-dimensional optical perspective with foreground, midground, and background separation.
* **Lighting Model:** Motivated cinematic 3-point lighting (soft keylight, subtle fill, motivated incandescent rim light) with natural falloff into rich shadows.
* **Atmosphere:** Natural ambient air, subtle haze or volumetric dust motes when motivated by shafts of light.

---

## 5. Kinematic Grammar
* **Motion Style:** Grounded human biomechanics, organic weight transfer, natural inertia.
* **Camera Kinematics:** Pure optical kinematics (slow creeping push-in, subtle eye-level track, stationary locked-off MCU). Strictly zero physical hardware rig nouns (`tripod`, `dolly track`, `crane`).

---

## 6. Native Cinematic Audio Foley Soundboard (Google Veo 3.1)
* **Biological & Movement Foley:** `Organic fabric rustle, tactile leather sole footsteps on pavement, subtle human breath intake`.
* **Atmospheric Room Tone:** `Natural room tone, distant low city rumble, subtle air ventilation hum, quiet exterior wind breeze`.
* **Music Suppression Rule:** Always enforce `, no background music` or `, clean foley only` to prevent unwanted soundtrack synthesis over dialogue/actions.

---

## 7. Mandatory Style Negative Prompt Clause
> `NEGATIVE PROMPT: 3D render, CGI, cartoon, anime, plastic skin, airbrushed, oversaturated, video game graphics, doll, action figure, artificial halation blur, extra limbs, deformed anatomy, tripod, camera rig.`
