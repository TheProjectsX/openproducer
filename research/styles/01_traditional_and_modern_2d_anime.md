# Research Deep-Dive: 2D Anime & Manga Animation
**Topic:** AI Video & Image Generation Prompts, Studio Dialects, Failure Modes, and Audio Foley for 2D Anime  
**Target Engines:** Google Veo 3.1, Google Flow, Imagen 4, Midjourney (--niji 6/7), OpenAI Sora, Stable Diffusion SDXL  
**Status:** Raw Research & Comprehensive Reference File (Archived for Final Style Evaluations)

---

## 1. Executive Summary & Core Mechanics

Generating authentic 2D anime in AI diffusion models represents one of the steepest challenges in AI video production. Unlike live-action photorealism (where diffusion models naturally excel), anime relies on **stepped frame rates, flat color fills, hand-painted background art, and discrete line art contours**.

### The Universal Two-Tier Production Pipeline
1. **Tier 1 & 2 (Keyframe Genesis):** Use a specialized anime model (Midjourney `--niji 6` / `--niji 7` or tuned SDXL anime checkpoints) to generate locked starting plates. Text-to-Video (T2V) alone frequently hallucinates character anatomy; **Image-to-Video (I2V)** is the mandatory industry standard for anime.
2. **Tier 3 (Image-to-Video Motion):** Animate the keyframe plate inside Google Veo 3.1 or Sora using **motion-only kinematic instructions** paired with native Foley sound design.

---

## 2. Studio Aesthetic Dialects & Keyword Dictionaries

Each major anime studio has a distinct mathematical and optical visual signature. Below are the verified keyword triggers and prompting mechanics for the 6 primary anime studio schools:

### A. Studio Ghibli (Hayao Miyazaki / Kazuo Oga)
* **Visual Philosophy:** Nostalgic pastoral naturalism, hand-painted scenic backgrounds, gentle wind physics, whimsical organic movement, zero digital harshness.
* **Master Prompt Keywords:** `Studio Ghibli style, hand-painted gouache background, soft watercolor wash, delicate graphite pencil outlines, pastoral anime realism, lush rolling green meadows, warm nostalgic golden-hour sunlight, whimsical atmosphere, Kazuo Oga background art, organic wind-swept textures`.
* **Motion Directives (Veo):** Gentle breeze rippling through tall grass and hair, slow drifting puffy cumulus clouds, unhurried natural character movements, smooth slow camera panning.
* **Negative Prompt Anchors:** `digital CGI, sharp neon colors, harsh black shadows, 3D render, glossy skin, geometric outlines`.

### B. Makoto Shinkai / CoMix Wave Films (*Your Name, Weathering With You, Suzume*)
* **Visual Philosophy:** Hyper-detailed environmental skies, dramatic twilight/golden-hour volumetric light, glowing skyscraper reflections, chromatic lens flares, emotional modern realism.
* **Master Prompt Keywords:** `Makoto Shinkai aesthetic, hyper-detailed background art, dramatic volumetric golden-hour lighting, deep purple and orange twilight sky, glowing window reflections, glistening raindrops on glass, cinematic lens flare, photorealistic anime city, emotional atmosphere, high-fidelity CoMix Wave aesthetic`.
* **Motion Directives (Veo):** Slow cinematic camera tracking across urban vistas, twilight clouds shifting slowly with glowing sunset gradients, rain ripples on puddles with neon reflections.
* **Negative Prompt Anchors:** `flat colors, muted skies, retro grain, chunky lines, low detail background`.

### C. Studio Trigger / Hiroyuki Imaishi (*Cyberpunk Edgerunners, Kill la Kill, Promare*)
* **Visual Philosophy:** High-octane kinetic chaos, thick dynamic line art, exaggerated super-deformed perspective (Kanada perspective), hyper-vibrant neon palettes, pop-art graphic elements.
* **Master Prompt Keywords:** `Studio Trigger style, Cyberpunk Edgerunners aesthetic, thick bold dynamic ink outlines, hyper-vibrant saturated neon color palette, explosive energy trails, sharp geometric shadow planes, pop-art graphic framing, high-contrast cel shading, kinetic momentum, extreme perspective distortion`.
* **Motion Directives (Veo):** Rapid tracking camera, dynamic whip pans, explosive high-speed movement, neon laser trails flashing violently across the frame, high-impact motion smears.
* **Negative Prompt Anchors:** `pastel colors, soft watercolor, slow realistic movement, muted tones, realistic lighting`.

### D. ufotable (*Demon Slayer: Kimetsu no Yaiba, Fate/stay night Heaven's Feel*)
* **Visual Philosophy:** Cutting-edge digital compositing, hyper-polished 2D characters integrated with 3D CGI camera orbits, glowing elemental VFX (water breathing, flame arcs, lightning embers), deep rich contrast blacks.
* **Master Prompt Keywords:** `ufotable anime style, Demon Slayer aesthetic, state-of-the-art digital compositing, luminous blue particle effects, glowing elemental magic trails, deep rich contrast shadows, ultra-polished clean cel shading, cinematic VFX integration, bioluminescent lighting, crisp dark outlines`.
* **Motion Directives (Veo):** 360-degree orbital camera sweep around character, slow-motion particle bursts swirling around katana blade, sudden dynamic burst of forward momentum with light embers.
* **Negative Prompt Anchors:** `flat 90s lighting, dull colors, hand-painted watercolor, messy sketch lines, grainy film scan`.

### E. Kyoto Animation / KyoAni (*Violet Evergarden, Sound! Euphonium, Hyouka*)
* **Visual Philosophy:** Hyper-delicate character rendering, luminous multi-layered eye iris reflections, intricate fluid hair physics, soft pastel grading, emotional slice-of-life photorealism.
* **Master Prompt Keywords:** `Kyoto Animation style, KyoAni aesthetic, soft cinematic lighting, luminous detailed eyes with layered specular highlights, intricate individual hair strand physics, soft pastel color grading, photorealistic background art, emotional atmosphere, glistening skin highlights, clean refined line art`.
* **Motion Directives (Veo):** Subtle eye blink and slow downward gaze, gentle strands of hair swaying softly in a window draft, tears glistening in corners of eyes, slow creeping camera push-in.
* **Negative Prompt Anchors:** `harsh angular lines, violent motion, neon saturation, thick ink outlines, rough hatching`.

### F. 1980s / 1990s Classic Retro Cel (*Akira, Cowboy Bebop, Evangelion, Ghost in the Shell*)
* **Visual Philosophy:** Physical hand-painted acetate cels, airbrushed shadows, analog 35mm film scan dust, CRT phosphor glow, heavy linework, rich primary color roll-off.
* **Master Prompt Keywords:** `Vintage 1990s anime screencap, retro cel-shaded animation, hand-painted on physical acetate cel, airbrushed soft shadows, authentic 35mm film grain, analog VHS aesthetic, CRT scanlines, rich primary red and cobalt blue hues, classic retro anime linework`.
* **Motion Directives (Veo):** Subtle analog gate weave, steady cinematic camera tracking down dimly lit cyberpunk alleys, soft smoke drifting across neon streetlamps.
* **Negative Prompt Anchors:** `modern digital clean CGI, 4K digital gloss, vector art, smooth 3D gradients, oversaturated modern anime bloom`.

---

## 3. Empirical AI Anime Failure Modes & Verified Fixes

Diffusion models (especially video diffusion models) fail in highly specific ways when generating anime. Below is the comprehensive troubleshooting matrix:

| Failure Mode / Glitch | Why It Happens | Prompt & Workflow Solution | Negative Prompt Guard |
|---|---|---|---|
| **1. Line Boiling (Jittery / Crawling Outlines)** | Video diffusion models generate each frame probabilistically rather than tracing continuous vector strokes. Outlines vibrate and crawl like boiling water. | Inject stability anchors: `clean vector line art, solid cel-shading, static line art, crisp ink lines, 24fps stepped animation`. Use low camera velocity. | `sketchy lines, pencil jitter, shaky lines, morphing outlines, frame flicker, boiling line art, jittering lines` |
| **2. The "3D Plastic Action Figure" Trap** | Diffusion models trained on mixed datasets blend 3D CGI and video game models into 2D prompts, creating creepy glossy 3D plastic figurines. | Strictly specify 2D cel mechanics: `traditional 2D hand-drawn cel animation, flat unshaded color planes, bold uniform clean ink outlines, zero 3D rendering`. | `3D render, CGI, photorealistic, hyperrealistic, glossy skin, soft gradients, airbrushed, digital painting, plastic toy, figurine` |
| **3. Model / Facial Identity Drift** | As the video clip plays from Frame 1 to Frame 120, character faces morph, hair changes length, and eye shapes melt into a different person. | **Front-load immutable traits:** First 25 tokens MUST lock bone structure, hair geometry, exact eye color, and costume details. Never use Text-to-Video alone; always use Image-to-Video starting from a Tier 2 keyframe plate. | `face morphing, mutating character, changing hair, shifting clothing details` |
| **4. Multi-Limb & Weapon Multiplying** | Fast action prompts (e.g. *"character does a backflip and swings two swords frantically"*) cause AI to render 4 arms and 3 blades simultaneously. | **The Single-Motion Law:** Break action down into 1 biomechanical motion per clip (e.g., *Clip 1: draws katana $\rightarrow$ Clip 2: forward lunge $\rightarrow$ Clip 3: impact frame*). | `extra limbs, multi-arms, mutated hands, multiple swords, duplicated weapons` |
| **5. Color Bleed / AI Smear** | Colors spill across line art boundaries (e.g., hair color dripping onto skin or background sky bleeding into shirt). | Explicitly declare hard shadow boundaries: `hard-edged cel shading, distinct shadow boundaries, flat color fills, clean separation between line art and color`. | `color bleed, smudged colors, blurry edges, watercolor bleeding, paint smear` |
| **6. The Camera Hardware Trap** | Writing camera equipment nouns like `"on tripod"` or `"camera on dolly"` causes Veo to physically render a camera/tripod in the shot pointed at the anime character. | Strictly use pure perspective descriptors: `locked-off eye-level framing, static shot, slow creeping push-in, lateral tracking glide`. Purge all equipment nouns. | `tripod, camera rig, dolly tracks, camera equipment` |

---

## 4. Anime Camera Kinematics & Animation Timing Grammar

To make AI anime look like genuine Japanese animation rather than Western 3D CGI, the camera and motion must follow traditional anime cinematography:

### A. Framerate & Stepped Timing Grammar
* Traditional anime is animated **"on twos" (12 unique drawings per second at 24fps playback)** for dialogue and walking, and **"on ones" (24 unique drawings per second)** for high-budget Sakuga action sequences.
* To prevent AI video models from making anime look like unnaturally smooth soap-opera 60fps CGI, include:
  * `Classic 24fps stepped animation timing, traditional cel cadence, crisp keyframes`.

### B. High-Converting Anime Camera Terms
1. **Dynamic Low-Angle Hero Shot (`Aori`):** Looking up from the ground, emphasizing character dominance and towering scale.
2. **High-Angle Dramatic Shot (`Fukan`):** Looking down from above, emphasizing vulnerability or complex spatial layouts.
3. **Dutch Angle / Canted Framing:** Tilted horizon line (15°–30°) conveying psychological tension, combat readiness, or madness.
4. **Sakuga Tracking Arc:** Rapid semi-circular camera glide maintaining lock on character while background sweeps by with dynamic motion blur.
5. **Impact Frame Flash:** Abrupt 1-to-2 frame monochromatic high-contrast visual flash (often pure black/white or inverted negative) exactly at the moment of weapon collision.

---

## 5. Anime Audio Foley & Sound Design Architecture (Native Veo 3.1)

Google Veo 3.1 features dual-stream video and audio generation. For anime productions, audio prompt engineering must pair specific Japanese anime sound design signatures with the visual actions:

### A. Key Anime Foley Descriptors
* **Katana / Weapon Foley:** `Sharp metallic ringing impact sound effect (katana clash), layered with heavy bass sub-boom, high-pitch steel resonance ("shing"), sparks scattering`.
* **Energy / Magic Flare:** `Resonant high-pitched electrical hum and burst, surging plasma crackle, deep sub-bass charging pulse`.
* **Anime Vocal Foley:** `Sharp breathless anime gasp, tense choked intake of air caught in throat, aggressive warrior grunt, quiet solemn whisper`.
* **Footsteps & Environment:** `Tactile wooden geta clatter on stone, rhythmic footsteps on tatami mats, heavy combat boot slide across gravel with scattering debris`.

### B. Mandatory Native Audio Prompt Syntax (Google Veo)
In Google Veo prompts, sequential sound cueing prevents audio-visual misalignment:
```text
Audio: Sharp intake of breath (anime gasp), followed immediately by a resonant high-pitched electrical hum and burst (energy flare), culminating in a sharp metallic ringing impact sound effect (sword clash) layered with heavy bass sub-boom, no background music.
```
* **Music Suppression Rule:** Always append `, no background music` or `, clean foley only` to prevent Veo from generating generic background synthesizer tracks over your dialogue and sound effects.

---

## 6. Curated Benchmark Anime Prompts (Image-to-Video Ready)

### Benchmark 1: Cyberpunk Neon Action (Studio Trigger Style)
* **Tier 2 Keyframe Plate (Midjourney / Imagen 4):**
  > `Studio Trigger style, Cyberpunk Edgerunners aesthetic. A rebellious female netrunner with dual-tone neon cyan and magenta bob hair, wearing an oversized high-collar techwear jacket. She crouches dynamically on a rain-slicked skyscraper ledge overlooking a sprawling neon mega-city. Bold thick dynamic ink line art, hyper-vibrant saturated color palette, high-contrast cel shading, sharp geometric shadows, pop-art graphic elements. Aspect ratio 16:9.`
* **Tier 3 Video Motion Prompt (Google Veo 3.1 / 6s):**
  > `Starting directly from the initial image, dynamic low-angle camera slowly pushes in toward the crouching netrunner. Permitted Props: [techwear jacket, skyscraper ledge]. Her neon cyan hair strands whip dynamically in a violent high-altitude gust of wind, while neon billboard reflections flicker rapidly across her glossy dark visor. Her shoulders remain tense and locked in combat stance, lips firmly closed with zero mouth movement. Studio Trigger anime aesthetic, sharp bold cel line art. Audio: howling high-altitude wind gust, distant electric sirens echoing across the city canyon, faint cybernetic optical hum, sudden electrical neon buzz, zero dialogue, no background music.`

### Benchmark 2: Nostalgic Pastoral Fantasy (Studio Ghibli Style)
* **Tier 2 Keyframe Plate (Midjourney / Imagen 4):**
  > `Studio Ghibli style, traditional hand-painted anime illustration. A young traveler wearing a weathered canvas cloak stands beside an ancient moss-covered stone shrine in a lush sunlit meadow. Warm pastoral watercolor background, soft gouache foliage textures, delicate graphite pencil outlines, Kazuo Oga scenic aesthetic, nostalgic golden-hour sunlight filtering through oak trees. Aspect ratio 16:9.`
* **Tier 3 Video Motion Prompt (Google Veo 3.1 / 8s):**
  > `Starting directly from the initial image, smooth eye-level tracking camera glides slowly from left to right across the meadow. Permitted Props: [canvas cloak, stone shrine]. Soft golden afternoon light filters through the trees as the traveler's cloak and hair sway gently in a warm summer breeze. In the background, dandelion seeds drift lazily through the air across the ancient stone shrine. Traditional hand-painted 2D cel animation, soft pastel color grading. Audio: gentle rustling of grass and leaves in summer wind, faint chirping of distant forest birds, soft organic fabric flutter, tranquil natural silence, zero dialogue, no background music.`

### Benchmark 3: Modern High-Speed Supernatural Katana Duel (ufotable Style)
* **Tier 2 Keyframe Plate (Midjourney / Imagen 4):**
  > `ufotable style anime master visual. A young demon hunter in a dark embroidered haori holds a glowing steel katana horizontally at eye level in a dark bamboo forest at night. State-of-the-art digital compositing, luminous electric blue water-breathing dragon particles swirling around the blade, deep rich contrast shadows, ultra-polished clean cel shading, bioluminescent particle embers illuminating the character's focused eyes. Aspect ratio 16:9.`
* **Tier 3 Video Motion Prompt (Google Veo 3.1 / 6s):**
  > `Starting directly from the initial image, fast dynamic 180-degree orbital camera sweeps smoothly around the swordsman. Permitted Props: [katana blade, embroidered haori]. The swirling water dragon particles erupt with intense bioluminescent glow, shedding bright blue embers into the dark bamboo trees. The swordsman takes a single sharp, low-stepping lunge forward as the camera punches in. Pristine ufotable digital cel compositing. Audio: sharp, sudden breath intake (anime gasp), followed immediately by a surging electrical water-flow roar, culminating in a resonant high-pitch steel blade vibration ("shing") with heavy sub-bass boom, zero spoken dialogue, no background music.`

---

## 7. Next Steps for Final System Evaluation

This research document is permanently archived in `research/styles/01_traditional_and_modern_2d_anime.md`. During future style specifications or dialect implementations:
1. Use Section 2 to populate the **Dialect Variations Registry** under `traditional_2d_anime.md`.
2. Apply Section 3 negative prompts directly to pre-flight linter **L-11** and style negative clauses.
3. Use Section 5 audio phrasing to populate the native Veo anime soundboards.
