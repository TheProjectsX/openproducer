# Research Deep-Dive: Social UGC & Mobile Video
**Topic:** AI Video & Image Generation Prompts, Smartphone Sensor Optics, Vertical 9:16 Formatting, Creator Dialects, and Mobile Foley  
**Target Engines:** Google Veo 3.1, Google Flow, Imagen 4, Midjourney (v6/v6.1), OpenAI Sora, Stable Diffusion SDXL  
**Status:** Raw Research & Comprehensive Reference File (Archived for Final Style Evaluations)

---

## 1. Executive Summary & Core Mechanics

User-Generated Content (UGC) and mobile-first vertical video (TikTok, Instagram Reels, YouTube Shorts) represent an inverted paradigm in AI video prompt engineering. While cinematic prompts strive for anamorphic flares, 35mm film grain, and dramatic chiaroscuro, **high-converting social UGC requires aggressively purging the "Hollywood studio look" in favor of authentic smartphone realism**.

### The Primary Failure: "The Studio Contamination Trap"
When video diffusion models encounter product or talking-head prompts, their training biases them toward **overly polished Hollywood studio lighting, anamorphic lens flares, heavy film grading, and stiff commercial models**. On TikTok and Reels, users instantly swipe away from content that looks like a traditional television commercial.

### The Core Solution: Smartphone Sensor Physics & Imperfection Prompting
To force AI models into generating convincing social UGC, prompts must explicitly demand **mobile sensor optics, casual domestic environments, and authentic creator equipment**:
1. **Sensor & Hardware Anchoring:** `Vertical 9:16 smartphone video, shot on modern iPhone 15 Pro front-facing camera, 4K mobile sensor clarity, f/1.8 digital depth of field, sharp edge-to-edge sensor definition`.
2. **Lighting Physics Anchoring:** `Natural ambient daylight streaming from a side window, circular ring-light reflections in pupils, domestic bedroom/kitchen lighting, zero studio softboxes`.
3. **Kinematic Handheld Realism:** `Casual arm's-length selfie framing, subtle organic handheld micro-wobble, natural breathing camera movement, zero mechanical gimbal stabilization`.

---

## 2. The 4 Primary Social UGC Aesthetic Dialects

Below are the verified keyword triggers, staging environments, and optical characteristics for the 4 primary social media formats:

### A. Direct-to-Camera Talking Head / Influencer Review
* **Visual Philosophy:** Relatable creator speaking intimately to the audience; casual domestic setting (bedroom, car, bathroom), direct eye contact with the phone camera lens, ring light in eyes, wireless lavalier mic.
* **Master Prompt Keywords:** `Vertical 9:16 smartphone UGC video, shot on modern front-facing smartphone camera, relatable young creator talking directly into the phone lens with energetic casual expression, wearing a small black wireless clip-on lavalier mic on shirt collar, distinct circular ring light reflection visible in pupils, cozy domestic bedroom background with soft window daylight, slight handheld breathing micro-wobble, authentic unpolished creator aesthetic`.
* **Motion Directives (Veo):** Natural facial expressions, spontaneous friendly smile, subtle conversational head tilts, slight handheld arm drift.
* **Negative Prompt Anchors:** `Hollywood cinematic lighting, 35mm film grain, anamorphic flares, movie set, studio softbox, dramatic shadows, professional actress, glamorous heavy makeup`.

### B. POV Hands-on Product Demo & ASMR Unboxing
* **Visual Philosophy:** First-person or 45-degree angle looking down at a tabletop, kitchen island, or desk; hands demonstrating a product; tactile physical packaging interaction.
* **Master Prompt Keywords:** `Vertical 9:16 smartphone video shot from first-person creator perspective (POV), casual hands unboxing a minimalist product package on a clean wooden desk, captured via handheld smartphone camera with natural breathing micro-jitter, bright natural side-window daylight, circular ring light reflection gleaming on product surface, authentic unpolished social media product showcase, shallow smartphone depth of field`.
* **Motion Directives (Veo):** Hands carefully peeling tape, opening cardboard lid, lifting product toward lens, slight natural camera readjustment.
* **Negative Prompt Anchors:** `commercial television studio plinth, dark luxury void, 3D render, glossy advertising render, professional robotic camera motion`.

### C. Lifestyle & Travel Aesthetic B-Roll (Reels / TikTok Montage)
* **Visual Philosophy:** Vibrant, sun-drenched lifestyle footage shot on rear smartphone camera; energetic pacing, natural ambient sunlight, coffee shops, urban sidewalks, golden hour.
* **Master Prompt Keywords:** `Vertical 9:16 high-fidelity mobile video aesthetic, shot on iPhone 15 Pro rear camera, vibrant punchy natural color saturation, golden-hour ambient sunlight, lifestyle creator B-roll, smooth casual handheld forward walking glide, bustling outdoor coffee shop patio background, crisp mobile sensor dynamic range, modern social media travel reel aesthetic`.
* **Motion Directives (Veo):** Slow walking forward motion, casual pan following subject movement, natural camera momentum with organic footstep bobbing.
* **Negative Prompt Anchors:** `film grain, film halation, vintage sepia, desaturated cinema grade, heavy motion blur, dark moody shadows`.

### D. Street Interview / Vox Pop
* **Visual Philosophy:** Casual on-the-street interview; handheld microphone, busy urban pedestrian backdrop, spontaneous framing, natural daylight.
* **Master Prompt Keywords:** `Vertical 9:16 street interview UGC video, handheld smartphone camera framing, young interviewer holding a black handheld wireless microphone toward an everyday person on a sunny city sidewalk, pedestrians walking in soft-focus background, bright natural outdoor daylight, candid spontaneous reactions, authentic street-interview social video aesthetic`.
* **Motion Directives (Veo):** Quick conversational camera tilt between interviewer and respondent, natural street crowd movement in background.
* **Negative Prompt Anchors:** `scripted movie scene, studio lighting, dramatic chiaroscuro, cinematic anamorphic bokeh, staged film set`.

---

## 3. Empirical Social UGC Failure Modes & Verified Fixes

Diffusion models face specific traps when generating mobile video because their default training favors cinematic widescreen movies. Below is the comprehensive troubleshooting matrix:

| Failure Mode / Glitch | Why It Happens | Prompt & Workflow Solution | Negative Prompt Guard |
|---|---|---|---|
| **1. The "Hollywood Studio" Contamination** | The model adds cinematic color grading (teal & orange), anamorphic flares, and dramatic shadows, destroying the UGC look. | Explicitly enforce mobile camera sensor optics: `Shot on iPhone 15 Pro, 4K mobile sensor clarity, natural smartphone color science, vibrant punchy daylight saturation, zero film grain`. | `cinematic lighting, anamorphic flares, 35mm film stock, Hollywood movie, dramatic shadows, color grading` |
| **2. Uncanny Glazed Creator Face** | The model generates a plastic AI face with a frozen, dead-eyed smile or airbrushed beauty filter glaze. | Specify natural biological flaws and expressions: `natural skin texture with subtle micro-blemishes, relatable expressive smile, relaxed facial muscles, spontaneous eye contact with phone lens`. | `airbrushed skin, plastic face, porcelain doll, frozen smile, uncanny valley, CGI face, heavy makeup` |
| **3. Oversmoothed Gimbal Motion (Lost Handheld Feel)** | AI generates a perfectly stabilized steadicam glide, making the video feel like a commercial rather than a handheld phone. | Inject natural physical human tremors: `casual handheld smartphone camera, subtle organic breathing micro-wobble, arm-length selfie jitter, zero digital gimbal stabilization`. | `smooth gimbal, robotic slider, steadicam, locked tripod, perfectly static framing` |
| **4. Product Shape & Logo Warping** | When prompting a brand or product in Text-to-Video, the model hallucinates nonsensical gibberish text and morphing shapes. | **The Image-to-Video Solution:** Never generate hero products from pure text. Generate a clean product still or composite plate first, then animate only the creator's hands and camera in Veo. | `distorted logo, mutated product, warping bottle, illegible text, melting packaging` |
| **5. Artificial Film Grain / Halation Bleed** | The model adds 35mm film grain or orange halation borders because it associates "video" with cinema. | Ban optical film artifacts: `clean digital 4K sensor, zero film grain, zero optical halation, clean digital video`. | `film grain, halation, light leaks, film dust, gate weave, vintage scratches` |
| **6. The Camera Hardware Trap** | Writing `"shot on smartphone on tripod"` causes Veo to physically render a full-sized tripod standing in the bedroom! | Use perspective descriptors: `casual arm's-length vertical selfie framing, front-facing smartphone angle`. Avoid naming tripods or rigs as physical nouns. | `tripod, camera rig, phone stand, selfie stick in shot, camera equipment` |

---

## 4. Mobile Kinematic Grammar & Pacing Standards

Social mobile video operates under completely different kinematic rules than traditional horizontal cinema:

### A. The 9:16 Vertical Field of View
* Vertical framing restricts horizontal background information and heavily prioritizes **vertical body language, facial micro-expressions, and foreground hand interactions**.
* Always declare `Aspect Ratio: 9:16` in configuration headers and front-load `Vertical 9:16 smartphone video` in prompt tokens.

### B. High-Converting Mobile Camera Actions
1. **The Casual Arm's-Length Selfie Push:** Subtle, natural drift inward as the creator emphasizes an exciting point.
2. **The "Check This Out" Downward Tilt:** Tilting phone down from the creator's face to reveal a product on a desk, then tilting back up.
3. **The Quick Digital Zoom Snap:** An abrupt 1.2x digital punch-in on a facial expression to punctuate a comedic or surprising remark.

---

## 5. Mobile Audio Design & Foley Architecture (Native Veo 3.1)

Mobile video audio must sound like it was recorded on a **smartphone internal microphone or a wireless clip-on lavalier mic**, not an orchestral Hollywood soundstage:

### A. Authentic Mobile Soundscapes
* **Voice & Acoustic Signature:** `Dry, clear direct-to-mic vocal audio recorded on wireless clip-on lavalier mic, natural domestic room acoustics, subtle domestic room tone`.
* **ASMR & Unboxing Foley:** `Crisp tactile cardboard unboxing sounds, satisfying tape peel snap, plastic bottle cap click, fingernails tapping on acrylic jar`.
* **Ambient Social Noise:** `Faint pleasant coffee shop chatter in background, gentle suburban morning birds outside window, soft street traffic hum`.
* **Strict Music Exclusion:** Background music on TikTok is added in the app post-production; baked-in AI music destroys ad performance. Always enforce `, zero background music`.

### B. Production Audio Syntax in Veo 3.1
```text
Audio: Clear direct voice acoustics from wireless lavalier mic saying 'Wait, you guys need to see this', followed by crisp tactile unboxing cardboard crinkles and bottle cap click, subtle natural room acoustics, no background music.
```

---

## 6. Curated Benchmark Social UGC Prompts (Image-to-Video Ready)

### Benchmark 1: TikTok Influencer Direct-to-Camera Skincare Review
* **Tier 2 Keyframe Plate (Midjourney / Imagen 4):**
  > `Vertical 9:16 smartphone UGC photo. A relatable 24-year-old woman with messy casual ponytail and natural glowing skin sits in a bright, sunlit bedroom with an unmade bed in the soft-focus background. She holds a minimalist white cosmetic dropper bottle near her cheek, smiling warmly directly into the front-facing iPhone camera lens. A small black wireless lavalier mic is clipped to her grey oversized hoodie collar. A soft circular ring light reflection is clearly visible in her dark pupils. Natural morning daylight from a side window, authentic unpolished creator aesthetic. Aspect ratio 9:16.`
* **Tier 3 Video Motion Prompt (Google Veo 3.1 / 6s):**
  > `Starting directly from the initial image, vertical 9:16 smartphone front-facing camera with subtle natural handheld breathing micro-wobble. Permitted Props: [cosmetic dropper bottle, wireless lavalier mic, hoodie]. The creator talks energetically directly to the camera lens, nodding with a genuine, spontaneous smile as she holds up the dropper bottle to emphasize her point. Her eyes stay locked on the lens with natural micro-blinks. Crisp 4K mobile sensor clarity, natural daylight. Audio: crisp direct-to-mic vocal audio from lavalier mic saying 'This completely saved my skin routine,' accompanied by soft bottle glass tap, natural bedroom room tone, zero background music.`

### Benchmark 2: POV Unboxing & Product Hands-on (Tech Gadget)
* **Tier 2 Keyframe Plate (Midjourney / Imagen 4):**
  > `Vertical 9:16 smartphone video first frame, first-person perspective (POV). A creator's hands hold an open sleek matte-black wireless earbud charging case on a cluttered modern wooden desk with a laptop keyboard and coffee mug in the background. Bright natural side-window daylight casting soft natural shadows across the desk. The earbud case has a glowing tiny green LED indicator. Shot on modern smartphone rear camera, f/1.8 digital depth of field, sharp focus on the earbuds. Authentic social media tech unboxing. Aspect ratio 9:16.`
* **Tier 3 Video Motion Prompt (Google Veo 3.1 / 6s):**
  > `Starting directly from the initial image, vertical 9:16 first-person handheld smartphone camera with slight natural human hand movement. Permitted Props: [earbud case, earbuds, wooden desk, coffee mug]. The creator's right hand reaches down, picks up one sleek matte-black earbud from the case, and lifts it toward the camera lens to showcase its clean metallic charging contacts. High-fidelity mobile video aesthetic, natural ambient daylight. Audio: satisfying magnetic click as earbud lifts from case, subtle organic finger friction on matte plastic, quiet indoor apartment room tone, zero spoken dialogue, no background music.`

### Benchmark 3: Aesthetic Travel & Coffee Lifestyle Reel
* **Tier 2 Keyframe Plate (Midjourney / Imagen 4):**
  > `Vertical 9:16 aesthetic social media lifestyle reel. A sun-drenched outdoor cafe table on a cobblestone European street. A glass of iced latte with visible condensation and layered espresso sits beside an open notebook and pair of tortoiseshell sunglasses. Golden-hour ambient sunlight casting long warm shadows across the cafe tabletop. Shot on iPhone 15 Pro rear camera, vibrant punchy colors, clean f/1.8 optical blur on the bustling background pedestrian street. Modern Instagram reel aesthetic. Aspect ratio 9:16.`
* **Tier 3 Video Motion Prompt (Google Veo 3.1 / 8s):**
  > `Starting directly from the initial image, vertical 9:16 smooth forward handheld walking glide camera drifting slowly past the cafe table. Permitted Props: [iced latte glass, notebook, sunglasses, cafe table]. Golden-hour sunlight glints off the melting ice cubes in the iced latte as a gentle summer breeze flutters the corner of the open notebook page. Pedestrians stroll in soft focus in the background. Vibrant natural mobile sensor dynamic range, zero film grain. Audio: delicate clinking of ice cubes in glass, faint distant street chatter and espresso machine hiss, gentle summer wind, clean mobile audio atmosphere, zero background music.`

---

## 7. Next Steps for Final System Evaluation

This research document is permanently archived in `research/styles/05_social_ugc_and_mobile_video.md`. During future style specifications or dialect implementations:
1. Use Section 2 to populate the **Dialect Variations Registry** under `social_mobile_ugc.md`.
2. Apply Section 3 negative prompts directly to pre-flight linter **L-11** to eliminate the Hollywood studio contamination trap.
3. Use Section 5 audio phrasing to build authentic mobile lavalier and ASMR soundboards in Google Veo.
