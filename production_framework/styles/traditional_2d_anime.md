# Style Plugin: Traditional 2D Cel & Modern Anime Animation
**ID:** `traditional_2d_anime`  
**Target Medium:** Traditional 2D Hand-Drawn Cel & Modern Japanese Anime Animation  
**Parent Specification:** [`../specs/01_visual_spec.md`](../specs/01_visual_spec.md)  
**Research Reference:** [`../../research/styles/01_traditional_and_modern_2d_anime.md`](../../research/styles/01_traditional_and_modern_2d_anime.md)

---

## 1. Master Style Anchor String (Verbatim Token Block — Ground-Level Default)
> `Traditional 2D hand-drawn cel animation, crisp clean uniform dark ink outlines, classic 2-tone cel shading with distinct shadow boundaries, flat vibrant color fills, hand-painted scenic anime background art, classic 24fps stepped animation cadence on twos, flat 2D graphic anime aesthetic.`

---

## 2. Dialect Variations Registry (Layer 2 Aesthetic Dialects)

When the creator requests a specific anime studio, era, or artistic school, the compiler injects the corresponding dialect descriptor into Tokens 81–130:

### A. `ghibli_pastoral` (Studio Ghibli / Kazuo Oga Aesthetic)
* **Dialect Descriptor:** `Studio Ghibli style, hand-painted gouache background, soft watercolor wash, delicate graphite pencil outlines, pastoral anime realism, warm nostalgic golden-hour sunlight, Kazuo Oga background art, organic wind-swept textures.`
* **Kinematics:** Gentle breeze rippling through foliage and hair, slow drifting clouds, unhurried natural character movement, smooth horizontal tracking.
* **Dialect Negatives:** `digital CGI, sharp neon colors, harsh black shadows, 3D render, glossy skin, geometric outlines.`

### B. `shinkai_urban_twilight` (Makoto Shinkai / CoMix Wave Aesthetic)
* **Dialect Descriptor:** `Makoto Shinkai aesthetic, hyper-detailed background art, dramatic volumetric golden-hour lighting, deep purple and orange twilight sky, glowing window reflections, glistening raindrops on glass, cinematic lens flare, high-fidelity CoMix Wave aesthetic.`
* **Kinematics:** Slow cinematic camera tracking across urban vistas, twilight clouds shifting slowly with glowing sunset gradients, rain ripples on wet pavement.
* **Dialect Negatives:** `flat colors, muted skies, retro grain, chunky lines, low detail background.`

### C. `trigger_neon_sakuga` (Studio Trigger / Cyberpunk Edgerunners Aesthetic)
* **Dialect Descriptor:** `Studio Trigger style, Cyberpunk Edgerunners aesthetic, thick bold dynamic ink outlines, hyper-vibrant saturated neon color palette, explosive energy trails, sharp geometric shadow planes, pop-art graphic framing, high-contrast cel shading.`
* **Kinematics:** Dynamic low-angle camera, rapid tracking, explosive high-speed movement, high-impact motion smears, extreme perspective distortion.
* **Dialect Negatives:** `pastel colors, soft watercolor, slow realistic movement, muted tones, realistic lighting.`

### D. `ufotable_digital_compositing` (ufotable / Demon Slayer Aesthetic)
* **Dialect Descriptor:** `ufotable anime style, Demon Slayer aesthetic, state-of-the-art digital compositing, luminous blue particle effects, glowing elemental magic trails, deep rich contrast shadows, ultra-polished clean cel shading, cinematic VFX integration.`
* **Kinematics:** 360-degree orbital camera sweep around character, slow-motion particle bursts swirling around weapon, sudden dynamic burst of forward momentum with light embers.
* **Dialect Negatives:** `flat 90s lighting, dull colors, hand-painted watercolor, messy sketch lines, grainy film scan.`

### E. `kyoani_delicate_drama` (Kyoto Animation / KyoAni Aesthetic)
* **Dialect Descriptor:** `Kyoto Animation style, KyoAni aesthetic, soft cinematic lighting, luminous detailed eyes with layered specular highlights, intricate individual hair strand physics, soft pastel color grading, clean refined line art.`
* **Kinematics:** Subtle eye blinks, slow downward gaze, gentle strands of hair swaying softly in a window draft, slow creeping camera push-in.
* **Dialect Negatives:** `harsh angular lines, violent motion, neon saturation, thick ink outlines, rough hatching.`

### F. `90s_retro_cel` (Vintage 1980s / 1990s Classic Acetate Cel)
* **Dialect Descriptor:** `Vintage 1990s anime screencap, retro cel-shaded animation, hand-painted on physical acetate cel, airbrushed soft shadows, authentic 35mm film grain, analog VHS aesthetic, CRT scanlines, rich primary red and cobalt blue hues, classic retro anime linework.`
* **Kinematics:** Subtle analog gate weave, steady cinematic camera tracking down dimly lit alleys, soft smoke drifting across neon streetlamps.
* **Dialect Negatives:** `modern digital clean CGI, 4K digital gloss, vector art, smooth 3D gradients, oversaturated modern anime bloom.`

### G. `chibi_deformed` (Super-Deformed Comedic Anime)
* **Dialect Descriptor:** `Chibi 2D anime style, 2-head-tall miniature character proportions, giant circular expressive eyes with white star highlights, simplified rounded hands, pastel-tinted flat colors, comedic staging.`
* **Kinematics:** Exaggerated comedic bounces, sudden rapid head-shakes, sweat-drop popping effects, snappy cartoon keyframing.
* **Dialect Negatives:** `realistic human proportions, tall anatomy, gritty shadows, photorealistic rendering.`

---

## 3. Anatomical & Line Art Rules (Ground-Level Default)
* **Proportions:** Standard Japanese animation proportions (6 to 7 heads tall by default).
* **Linework Integrity:** Crisp, uniform dark ink outlines with consistent stroke thickness. Mandatory anti-boiling constraint to prevent crawling outlines across video frames.
* **Eyes & Face:** Distinct 2D geometric eye contours with stylized pupil highlights. Closed lips during non-dialogue beats to prevent AI mouth morphing.
* **Anti-Plastic Figurine Law:** Strict ban on 3D subsurface scattering, glossy vinyl skin, or action figure joints. Characters must render as flat, drawn cel art.

---

## 4. Canvas, Shading & Stepped Cadence
* **Shading Model:** Classic 2-tone cel shading (a flat unshaded local base color plus one distinct, hard-edged shadow tone). Zero smooth 3D airbrushed gradients on characters.
* **Animation Cadence:** Classic 24fps stepped animation timing "on twos" (12 unique drawings per second). Banned unnaturally smooth 60fps soap-opera CGI interpolation.
* **Background Integration:** Hand-painted scenic backgrounds with clear optical depth separation between foreground characters and scenery.

---

## 5. Kinematic & Animation Grammar
* **Anime Camera Conventions:**
  * `Aori`: Dynamic low-angle hero framing looking upward.
  * `Fukan`: High-angle dramatic perspective looking down.
  * `Sakuga Tracking Arc`: Smooth semi-circular camera glide maintaining lock on character while background sweeps with motion blur.
* **Single-Motion Law:** Exactly one primary action per clip (e.g. draws katana, or leaps forward, or raises arm) to eliminate multi-limb and multiplied weapon glitches.
* **Hardware Nouns Ban:** Pure cinematic trajectory descriptions only (`slow creeping push-in`, `dynamic tracking arc`). Strictly zero camera equipment nouns (`tripod`, `dolly`, `crane`).

---

## 6. Native Anime Audio Foley Soundboard (Google Veo 3.1)
All Veo anime prompts must pair visual actions with authentic Japanese anime sound design signatures:
* **Weapon / Katana Foley:** `Sharp metallic ringing impact sound effect (katana clash), layered with high-pitch steel resonance ("shing") and heavy bass sub-boom`.
* **Energy / Magic Flare:** `Resonant high-pitched electrical hum and burst, surging plasma crackle, deep sub-bass charging pulse`.
* **Anime Vocal Foley:** `Sharp breathless anime gasp, tense choked intake of air caught in throat, aggressive warrior grunt, quiet solemn whisper`.
* **Footsteps & Surface Foley:** `Tactile wooden geta clatter on stone, rhythmic footsteps on tatami mats, heavy combat boot slide across gravel with scattering debris`.
* **Music Suppression Rule:** Always end audio cues with `, no background music` or `, clean foley only` to suppress automated generic synthesizer music.

---

## 7. Mandatory Style Negative Prompt Clause
> `NEGATIVE PROMPT: 3D render, CGI, photorealistic, hyperrealistic, plastic skin, glossy vinyl, airbrushed gradients, realistic skin pores, realistic human eyes, realistic anatomy, doll, action figure, line boiling, jittery outlines, shaky lines, morphing line art, sketchy pencil, camera shake, tripod, camera rig.`
