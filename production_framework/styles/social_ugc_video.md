# Style Plugin: Social UGC & Mobile Video
**ID:** `social_ugc_video`  
**Target Medium:** User-Generated Content (UGC), Mobile-First Vertical Video (TikTok, Reels, Shorts)  
**Parent Specification:** [`../specs/01_visual_spec.md`](../specs/01_visual_spec.md)  
**Research Reference:** [`../../research/styles/05_social_ugc_and_mobile_video.md`](../../research/styles/05_social_ugc_and_mobile_video.md)

---

## 1. Master Style Anchor String (Verbatim Token Block — Ground-Level Default)
> `Vertical 9:16 smartphone video, shot on modern smartphone 4K mobile sensor, natural ambient daylight, casual handheld arm-length framing with subtle organic breathing micro-wobble, sharp edge-to-edge sensor definition, vibrant punchy daylight saturation, zero film grain, authentic unpolished social media creator aesthetic.`

---

## 2. Dialect Variations Registry (Layer 2 Aesthetic Dialects)

When the creator requests a specific social media format, unboxing flow, or UGC content style, the compiler injects the corresponding descriptor into Tokens 81–130:

### A. `direct_talking_head` (Influencer Review / Direct-to-Camera)
* **Dialect Descriptor:** `Vertical 9:16 smartphone UGC video, shot on modern front-facing camera, relatable creator talking directly into the phone lens with energetic casual expression, wearing a small black wireless clip-on lavalier mic on shirt collar, distinct circular ring light reflection visible in pupils, cozy domestic background with soft window daylight, slight handheld breathing micro-wobble.`
* **Kinematics:** Natural facial expressions, spontaneous friendly smile, subtle conversational head tilts, slight handheld arm drift.
* **Dialect Negatives:** `Hollywood cinematic lighting, 35mm film grain, anamorphic flares, movie set, studio softbox, dramatic shadows, glamorous heavy makeup.`

### B. `pov_unboxing_asmr` (First-Person Product Hands-on & Unboxing)
* **Dialect Descriptor:** `Vertical 9:16 smartphone video shot from first-person creator perspective (POV), casual hands unboxing a minimalist product package on a clean wooden desk, captured via handheld smartphone camera with natural breathing micro-jitter, bright natural side-window daylight, circular ring light reflection on product surface, shallow smartphone depth of field.`
* **Kinematics:** Hands carefully peeling tape, lifting product toward lens, slight natural camera readjustment.
* **Dialect Negatives:** `commercial television studio plinth, dark luxury void, 3D render, glossy advertising render, professional robotic camera motion.`

### C. `lifestyle_travel_reel` (Aesthetic Vertical B-Roll & Montage)
* **Dialect Descriptor:** `Vertical 9:16 high-fidelity mobile video aesthetic, shot on modern rear smartphone camera, vibrant punchy natural color saturation, golden-hour ambient sunlight, lifestyle creator B-roll, smooth casual handheld forward walking glide, outdoor cafe patio background, crisp mobile sensor dynamic range.`
* **Kinematics:** Slow forward walking glide, casual panning following subject movement, natural camera momentum with organic footstep bobbing.
* **Dialect Negatives:** `film grain, film halation, vintage sepia, desaturated cinema grade, heavy motion blur, dark moody shadows.`

### D. `street_vox_pop` (Candid Street Interview / Social Vox Pop)
* **Dialect Descriptor:** `Vertical 9:16 street interview UGC video, handheld smartphone camera framing, interviewer holding a black handheld wireless microphone toward an everyday person on a sunny city sidewalk, pedestrians walking in soft-focus background, bright natural outdoor daylight, candid spontaneous reactions.`
* **Kinematics:** Quick conversational camera tilt between interviewer and respondent, natural pedestrian crowd movement in background.
* **Dialect Negatives:** `scripted movie scene, studio lighting, dramatic chiaroscuro, cinematic anamorphic bokeh, staged film set.`

---

## 3. Sensor Materiality & Anti-Studio Rules
* **Purge the Hollywood Studio Look:** Social UGC must look authentic and unpolished. Strictly ban anamorphic lens flares, 35mm chemical grain, moody chiaroscuro lighting, and television commercial plinths.
* **Natural Biological Micro-Flaws:** Characters must display natural human skin textures with realistic micro-blemishes, casual relaxed facial muscles, and relatable friendly smiles. Banned waxy AI beauty-filter smoothing and porcelain doll glazes.
* **Mobile Sensor Physics:** Crisp 4K mobile sensor sharpness, f/1.8 digital depth of field, and vibrant, daylight-balanced natural color science.

---

## 4. Vertical Framing & Kinematic Grammar
* **Vertical 9:16 Field of View:** Mandatory `Aspect Ratio: 9:16` configuration. Prompt tokens must prioritize vertical torso posture, expressive facial micro-movements, and foreground hand interactions.
* **Natural Handheld Micro-Wobble:** Emulate organic human arm holding a smartphone (subtle breathing micro-jitter, arm-length drift). Strictly purge robotic gimbal stabilization and perfectly locked tripod framing.
* **Hardware Nouns Ban:** Never use equipment nouns (`tripod`, `phone stand`, `selfie stick`, `gimbal rig`).

---

## 5. Mobile Audio Foley & Lavalier Acoustics (Google Veo 3.1)
All Veo mobile video prompts must reflect direct, unpolished mobile audio recording:
* **Direct Vocal Acoustics:** `Dry, clear direct-to-mic vocal audio recorded on wireless clip-on lavalier mic, natural domestic room acoustics, subtle domestic room tone`.
* **Tactile ASMR Foley:** `Crisp tactile cardboard unboxing sounds, satisfying tape peel snap, plastic bottle cap click, fingernails tapping on acrylic jar`.
* **Ambient Social Noise:** `Faint pleasant coffee shop chatter in background, gentle suburban morning birds outside window, soft street traffic hum`.
* **Music Suppression Rule:** Always enforce `, no background music` or `, clean foley only` (music on TikTok/Reels is added during post-production; baked-in AI music destroys hook retention).

---

## 6. Mandatory Style Negative Prompt Clause
> `NEGATIVE PROMPT: cinematic lighting, Hollywood movie, anamorphic flares, 35mm film grain, heavy film halation, vintage sepia, studio softbox, dramatic chiaroscuro shadows, plastic airbrushed skin, porcelain doll, frozen smile, smooth gimbal, steadicam, tripod, camera rig.`
