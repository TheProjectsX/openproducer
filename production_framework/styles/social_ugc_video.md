# Style Plugin: Social UGC & Mobile Video
**ID:** `social_ugc_video`  
**Target Medium:** User-Generated Content (UGC), Mobile-First Vertical Video (TikTok, Reels, Shorts)  
**Parent Specification:** [`../specs/01_visual_spec.md`](../specs/01_visual_spec.md)  
**Research Reference:** [`../../research/styles/05_social_ugc_and_mobile_video.md`](../../research/styles/05_social_ugc_and_mobile_video.md)

---

## 1. Master Style Anchor String (Verbatim Token Block — Ground-Level Default)
> `Modern smartphone mobile sensor video aesthetic, natural ambient daylight, casual handheld arm-length framing with subtle organic breathing micro-wobble, sharp edge-to-edge sensor definition, vibrant punchy daylight saturation, zero film grain, authentic unpolished social media creator aesthetic.`

---

## 2. Dialect Variations Registry (Layer 2 Aesthetic Dialects)

When the creator requests a specific social media format, unboxing flow, or UGC content style, the compiler injects the corresponding descriptor into Tokens 81–130:

### A. `direct_talking_head` (Influencer Review / Direct-to-Camera)
* **Dialect Descriptor:** `Vertical smartphone UGC video, shot on modern front-facing mobile sensor, relatable creator talking directly into the lens with energetic casual expression, wearing a small black wireless clip-on lavalier mic on shirt collar, distinct circular ring light reflection visible in pupils, cozy domestic background with soft window daylight, slight handheld breathing micro-wobble.`
* **Kinematics:** Natural facial expressions, spontaneous friendly smile, subtle conversational head tilts, slight handheld arm drift.
* **Dialect Negatives:** `Hollywood cinematic lighting, 35mm film grain, anamorphic flares, movie set, studio softbox, dramatic shadows, glamorous heavy makeup.`

### B. `pov_unboxing_asmr` (First-Person Product Hands-on & Unboxing)
* **Dialect Descriptor:** `Vertical smartphone video shot from first-person creator perspective (POV), casual hands unboxing a minimalist product package on a clean wooden desk, captured via handheld mobile sensor with natural breathing micro-jitter, bright natural side-window daylight, circular ring light reflection on product surface, shallow mobile depth of field.`
* **Kinematics:** Hands carefully peeling tape, lifting product toward lens, slight natural camera readjustment.
* **Dialect Negatives:** `commercial television studio plinth, dark luxury void, 3D render, glossy advertising render, professional robotic camera motion.`

### C. `lifestyle_travel_reel` (Aesthetic Vertical B-Roll & Montage)
* **Dialect Descriptor:** `Vertical high-fidelity mobile video aesthetic, shot on modern rear smartphone sensor, vibrant punchy natural color saturation, golden-hour ambient sunlight, lifestyle creator B-roll, smooth casual handheld forward walking glide, outdoor cafe patio background, crisp mobile sensor dynamic range.`
* **Kinematics:** Slow forward walking glide, casual panning following subject movement, natural camera momentum with organic footstep bobbing.
* **Dialect Negatives:** `film grain, film halation, vintage sepia, desaturated cinema grade, heavy motion blur, dark moody shadows.`

### D. `street_vox_pop` (Candid Street Interview / Social Vox Pop)
* **Dialect Descriptor:** `Vertical street interview UGC video, casual handheld mobile sensor framing, interviewer holding a black handheld wireless microphone toward an everyday person on a sunny city sidewalk, pedestrians walking in soft-focus background, bright natural outdoor daylight, candid spontaneous reactions.`
* **Kinematics:** Quick conversational camera tilt between interviewer and respondent, natural pedestrian crowd movement in background.
* **Dialect Negatives:** `scripted movie scene, studio lighting, dramatic chiaroscuro, cinematic anamorphic bokeh, staged film set.`

---

## 3. Sensor Materiality & Anti-Studio Rules
* **Purge the Hollywood Studio Look:** Social UGC must look authentic and unpolished. Strictly ban anamorphic lens flares, 35mm chemical grain, moody chiaroscuro lighting, and television commercial plinths.
* **Natural Biological Micro-Flaws:** Characters must display natural human skin textures with realistic micro-blemishes, casual relaxed facial muscles, and relatable friendly smiles. Banned waxy AI beauty-filter smoothing and porcelain doll glazes.
* **Mobile Sensor Physics:** Crisp mobile sensor sharpness, f/1.8 digital depth of field, and vibrant, daylight-balanced natural color science. (Note: output specs like `9:16` and `4K` belong in the configuration block, not prompt text).

---

## 4. World & Lighting Physics
* **Natural Daylight Balance:** Clean ambient daylight through domestic windows or bright outdoor sunny conditions.
* **Authentic Ring-Light Reflection:** Subtle circular reflections in character pupils or on product packaging when indoors, conveying realistic creator lighting.
* **Real-World Environments:** Real kitchens, desks, streets, and coffee shops rather than sterile studio sets.

---

## 5. Vertical Framing & Kinematic Grammar
* **Vertical 9:16 Staging:** Configured via `Aspect Ratio: 9:16`. Prompt tokens prioritize vertical torso posture, expressive facial micro-movements, and foreground hand interactions.
* **Natural Handheld Micro-Wobble:** Emulate organic human arm holding a smartphone (subtle breathing micro-jitter, arm-length drift). Strictly purge robotic gimbal stabilization and perfectly locked tripod framing.
* **Hardware Nouns Ban:** Never use equipment nouns (`tripod`, `phone stand`, `selfie stick`, `gimbal rig`).

---

## 6. Mobile Audio Foley & Lavalier Acoustics (Google Veo 3.1)
All Veo mobile video prompts must reflect direct, unpolished mobile audio recording structured in the 4-part semicolon format:
* **Direct Vocal Acoustics:** `Audio: SFX: Subtle wireless lavalier rustle; Ambience: Natural domestic room tone; Dialogue: [Spoken words in sentence case]; Music: None.`
* **Tactile ASMR Foley:** `Audio: SFX: Crisp tactile cardboard unboxing sounds, tape peel snap, plastic bottle cap click; Ambience: Quiet room tone; Dialogue: None; Music: None.`
* **Ambient Social Noise:** `Audio: SFX: Footsteps on pavement; Ambience: Distant cafe chatter, soft street traffic hum; Dialogue: None; Music: None.`
* **Music Suppression Rule:** Always enforce `Music: None.` over dialogue to protect vocal clarity.

---

## 7. Mandatory Style Negative Prompt Clause
> `NEGATIVE PROMPT: cinematic lighting, Hollywood movie, anamorphic flares, 35mm film grain, heavy film halation, vintage sepia, studio softbox, dramatic chiaroscuro shadows, plastic airbrushed skin, porcelain doll, frozen smile, smooth gimbal, steadicam, tripod, camera rig.`
