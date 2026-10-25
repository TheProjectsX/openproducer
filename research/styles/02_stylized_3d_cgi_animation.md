# Research Deep-Dive: Stylized 3D CGI Animation
**Topic:** AI Video & Image Generation Prompts, 3D Rendering Dialects, Uncanny Valley Solutions, Tactile Materials, and Native Foley  
**Target Engines:** Google Veo 3.1, Google Flow, Imagen 4, Midjourney (v6/v6.1), OpenAI Sora, Stable Diffusion SDXL  
**Status:** Raw Research & Comprehensive Reference File (Archived for Final Style Evaluations)

---

## 1. Executive Summary & Core Mechanics

Generating stylized 3D CGI video in diffusion models requires a fundamentally different prompt strategy than either live-action cinema or 2D cel anime. While 2D anime suffers from line boiling and 35mm cinema requires organic film grain, **stylized 3D CGI must balance tactile, raytraced physical materiality against cartoon geometric stylization**.

### The Primary Failure: The Uncanny Valley Trap
When diffusion models encounter prompts like `"3D character"` or `"animated person"`, their training on mixed datasets often causes them to graft **hyperrealistic biological skin, microscopic pores, and fleshy blood vessels onto exaggerated cartoon bone structures**. The result is a disturbing, wax-museum zombie look.

### The Core Solution: Material Grounding + Geometric Anchoring
To achieve pristine 3D animation (Pixar, Spider-Verse, DreamWorks), prompts must strictly decouple from realism and explicitly command:
1. **Geometric Simplification:** `Chunky rounded forms, exaggerated character proportions, large expressive eyes, softened bevelled edges`.
2. **Tactile Materiality:** `Subsurface scattering (SSS) on skin, soft clay-like or vinyl finish, tactile fabric micro-textures (felt, wool knit, brushed metal)`.
3. **Raytraced Optical Physics:** `Warm three-point studio lighting, volumetric soft keylight, soft contact ambient occlusion, shallow depth of field`.

---

## 2. The 5 Primary 3D CGI Aesthetic Dialects & Keyword Toolkits

Below are the verified keyword triggers, optical properties, and rendering mechanics for the 5 major 3D animation schools:

### A. Disney / Pixar Feature Film Style (The Warm Tactile Standard)
* **Visual Philosophy:** Friendly, appealing, rounded anatomy; lifelike physical materials (wool, corduroy, polished wood) rendered with gentle, warm lighting; deep emotional expressiveness.
* **Master Prompt Keywords:** `Disney Pixar style 3D animation, soft rounded character geometry, large expressive eyes, friendly silhouette, subsurface scattering on skin, peach-fuzz skin translucency, tactile micro-textures on clothing, hand-painted texture maps, warm three-point volumetric lighting, RenderMan global illumination, cozy cinematic lighting, shallow depth of field, creamy circular bokeh`.
* **Motion Directives (Veo):** Slow deliberate head tilt, expressive eye blink and gaze shift, soft breathing chest cycle, gentle linear camera push-in.
* **Negative Prompt Anchors:** `photorealistic human skin, microscopic biological pores, uncanny valley, harsh angular lines, dirty textures, plastic doll, 2D flat drawing, sharp geometric edges`.

### B. Sony Spider-Verse / Puss in Boots (Hybrid 2D/3D Comic Art)
* **Visual Philosophy:** 3D digital character rigs textured with hand-drawn comic book techniques; visible ink hatching, halftone dots, chromatic edge aberration, and stepped framerates.
* **Master Prompt Keywords:** `Spider-Verse style 3D animation, hybrid 2D and 3D CGI, bold dynamic black graphic ink outlines, visible Ben-Day halftone printing dot textures, comic book cross-hatching, chromatic aberration on high-contrast edges, vibrant neon color splashes, stylized graffiti accents, graphic novel lighting, high-contrast rim highlights, dynamic graphic framing`.
* **Motion Directives (Veo):** Stepped 12fps animation timing on twos, high-velocity dynamic action leap, sudden kinetic freeze-frame pose, fast-paced camera tracking sweep with comic motion blur streaks.
* **Negative Prompt Anchors:** `smooth 60fps soap-opera CGI, photorealistic lighting, soft pastel watercolor, untextured 3D models, smooth plastic gloss`.

### C. DreamWorks / Illumination (Exaggerated Comedic Character CGI)
* **Visual Philosophy:** Dynamic slapstick appeal, highly expressive facial deformation (squash and stretch), punchy primary color saturation, snappy kinetic momentum.
* **Master Prompt Keywords:** `DreamWorks style 3D digital animation, exaggerated comedic facial expression, dynamic squash and stretch geometry, bold colorful character design, high-saturation primary colors, vibrant whimsical lighting, sharp polished digital rendering, snappy physical comedy staging`.
* **Motion Directives (Veo):** Rapid double-take head snap, exaggerated jaw drop, rubbery bouncy body recoil, sudden whip pan camera tracking.
* **Negative Prompt Anchors:** `dull desaturated colors, gritty horror lighting, photorealistic pores, dark shadows, melancholy mood`.

### D. Designer Art Toy / Pop Mart / Vinyl Blind-Box Collectible
* **Visual Philosophy:** Miniature collectible figures made of tactile PVC, translucent resin, or matte vinyl; studio tabletop macro staging, softbox highlights, pristine commercial showcase.
* **Master Prompt Keywords:** `Pop Mart designer toy aesthetic, chibi art toy 3D render, chunky stylized proportions, smooth matte vinyl and glossy PVC plastic textures, translucent colored resin with internal subsurface scattering, ultra-clean studio stage, overhead softbox diffusion, crisp metallic rim highlights, miniature macro 100mm lens, shallow depth of field`.
* **Motion Directives (Veo):** Slow smooth 360-degree turntable orbital rotation, subtle studio light shift reflecting across vinyl head contour, stationary miniature posing.
* **Negative Prompt Anchors:** `rough textures, fingerprints, dust, scratches, realistic human anatomy, 2D flat drawing, gritty urban grunge`.

### E. Retro 1990s Low-Poly / PS1 / N64 Nostalgia
* **Visual Philosophy:** Nostalgic early-3D video game graphics; visible polygonal faceted surfaces, crunchy pixelated textures, affine texture warping, unlit vertex shading.
* **Master Prompt Keywords:** `Retro 1990s PS1 low-poly 3D graphics, visible polygonal mesh faces, faceted geometric surfaces, crunchy 320x240 render resolution, pixelated low-resolution texture maps, unlit vertex shading, affine texture warping with zero perspective correction, retro CRT monitor scanlines, vintage nostalgic 3D game aesthetic`.
* **Motion Directives (Veo):** Stiff rigid joint rotation, stepped walk cycle with zero fluid interpolation, fixed low-angle third-person tracking camera.
* **Negative Prompt Anchors:** `modern 4K raytracing, smooth high-poly curves, subsurface scattering, ambient occlusion, realistic lighting`.

---

## 3. Empirical 3D CGI Failure Modes & Verified Fixes

Diffusion models face specific mathematical and anatomical glitches when generating 3D CGI video. Below is the comprehensive troubleshooting matrix:

| Failure Mode / Glitch | Why It Happens | Prompt & Workflow Solution | Negative Prompt Guard |
|---|---|---|---|
| **1. The Uncanny Valley Flesh Glitch** | Model applies real human biological textures (pores, veins, wrinkles) to cartoon geometry. | Enforce stylized material shaders: `subsurface scattering (SSS), warm peach-fuzz skin translucency, stylized vinyl skin texture, clay-like smooth finish`. | `photorealistic skin, biological skin pores, realistic wrinkles, uncanny valley, real human photo` |
| **2. The Plastic Mannequin Glaze (Dead Eye / Wax Syndrome)** | Character looks like an unlit rigid hollow doll without internal light or eye life. | Specify internal illumination and eye optics: `luminous expressive eyes, corneal specular highlight, warm internal subsurface scattering, motivated soft rim lighting`. | `dead eyes, vacant stare, rigid plastic doll, hollow mannequin, wax figure` |
| **3. Mesh Warping / Bone Collapse (Rubber-Hose Glitch)** | During movement, limbs twist like spaghetti or joints collapse inward because the model lacks an underlying inverse-kinematics rig. | Constrain biomechanical motion: `grounded weight transfer, unhurried micro-gestures, rigid joint articulation, slow deliberate arm motion`. Enforce the Single-Motion Law. | `rubber limbs, melting arms, spaghetti joints, collapsing anatomy, multi-arms, mutated hands` |
| **4. Eye Divergence (Cross-Eyed / Lazy Eye Hallucination)** | Symmetrical facial rendering drifts, causing pupils to point in different directions during video play. | Explicitly lock optical focus: `focused forward eyeline, symmetrical iris alignment, sharp pupil tracking, coordinated gaze`. | `cross-eyed, divergent pupils, wandering gaze, asymmetrical eyes, distorted iris` |
| **5. Floating Characters / Lost Grounding** | Character appears to hover inches above the floor because the model misses ground contact shadows. | Anchor the contact point: `heavy contact ambient occlusion shadow, crisp ground contact, motivated floor plane shadow, firmly planted feet`. | `floating character, missing shadows, hovering feet, disconnected floor` |
| **6. The Camera Hardware Trap** | Prompts mentioning equipment nouns like `"on tripod"` or `"camera rig"` cause the AI to physically generate a camera/tripod in the animated room. | Use pure optical camera descriptors: `locked-off macro framing, slow creeping push-in, smooth orbital glide`. Purge all hardware rig nouns. | `tripod, camera rig, dolly track, crane arm, camera equipment` |

---

## 4. 3D CGI Kinematic Grammar & Animation Physics

Unlike live action, 3D animated movement follows specific principles established in classical character animation:

### A. The 12 Principles in AI Prompting
To prevent robotic or floaty movement, prompt for classical animation physics:
* **Anticipation & Weight:** `Character shifts weight backward before stepping forward, grounded inertia, heavy tactile footing`.
* **Secondary Action:** `Soft bounce of hair and clothing responding naturally to body movement, natural fabric drape`.
* **Squash and Stretch (For Comedic Styles):** `Subtle squash and stretch on landing impact, bouncy rubbery elasticity`.

### B. High-Performing 3D Animated Camera Moves
1. **Slow Creeping Push-In:** Slowly zooms in on character's expressive face to heighten emotional resonance.
2. **Smooth 360-Degree Orbital Arc:** Continuously circles a character or object, showcasing 3D dimensional depth and rim lighting.
3. **Miniature Macro Tracking:** Low-to-the-ground camera with a shallow depth of field, making characters feel like living tactile toys.

---

## 5. Tactile Sound Design & Foley Architecture (Native Veo 3.1)

3D animation sound design is defined by **hyper-tactile, exaggerated, and satisfying physical Foley**. In Google Veo 3.1, audio prompts must mirror the material properties described in the video prompt:

### A. Material-Driven Audio Descriptors
* **Soft / Rubber / Gelatinous Materials:** `Squishy gelatinous boop-squelch, soft rubbery squeak, satisfying plop, bouncy elastic thud`.
* **Mechanical / Toy / Clocks:** `Crisp mechanical brass gear click, satisfying micro-switch snap, smooth ratchet turn, tiny clockwork ticking`.
* **Fabrics & Surfaces:** `Soft wool knit fabric rustle, tactile footsteps on polished wooden parquet, smooth ceramic clink`.
* **Expressive Vocal Foley:** `Soft surprised gasp, curious high-pitch robot electronic chirp, warm gentle chuckle, cute sigh`.

### B. Production Audio Syntax in Veo 3.1
```text
Audio: Soft curious robotic chirp, followed immediately by a squishy gelatinous boop-squelch as finger depresses glowing button, layered with a heavy satisfying brass click and warm electronic chime, clean room ambience, no background music.
```
* **Music Suppression Rule:** Always enforce `, no background music` or `, clean foley only` to prevent Veo from drowning delicate tactile Foley under an unwanted symphonic score.

---

## 6. Curated Benchmark 3D CGI Prompts (Image-to-Video Ready)

### Benchmark 1: Pixar Feature Story (The Cozy Clockmaker)
* **Tier 2 Keyframe Plate (Midjourney / Imagen 4):**
  > `Disney Pixar style 3D digital animation. An elderly, gentle clockmaker with oversized round spectacles, warm grandfatherly features, and a friendly round nose sits at a cluttered wooden workbench. Warm subsurface scattering on stylized skin, tactile micro-textures on his knitted brown wool sweater. He carefully holds a tiny glowing brass gear with tweezers. Warm three-point volumetric lighting streaming through a dusty window, RenderMan global illumination, shallow depth of field, cozy cinematic atmosphere. Aspect ratio 16:9.`
* **Tier 3 Video Motion Prompt (Google Veo 3.1 / 6s):**
  > `Starting directly from the initial image, eye-level slow creeping push-in camera advancing smoothly toward the workbench. Permitted Props: [brass gear, tweezers, wooden workbench, spectacles]. The clockmaker slowly lowers his hands, placing the tiny brass gear into a clockwork mechanism on the table. His large expressive eyes blink once with gentle focus, warm grandfatherly smile forming on his lips. Pixar 3D animation style, soft rounded forms, subsurface scattering. Audio: delicate metallic tick-tick-ticking of antique clocks, soft organic wool sweater rustle, crisp satisfying micro-brass click as gear meshes into place, quiet cozy room tone, zero dialogue, no background music.`

### Benchmark 2: Spider-Verse Hybrid Comic Action (The Neon Rooftop Leap)
* **Tier 2 Keyframe Plate (Midjourney / Imagen 4):**
  > `Spider-Verse style hybrid 2D and 3D animation. A stylized teenage hero wearing an oversized hooded streetwear jacket and high-top sneakers crouches dynamically on the edge of a rain-slicked rooftop. Bold black graphic ink outlines, visible Ben-Day halftone dot printing patterns across the brickwork, chromatic aberration color fringing on high-contrast edges. Vibrant neon magenta and teal comic book lighting, dramatic low-angle Dutch tilt framing, high-contrast graphic novel aesthetic. Aspect ratio 16:9.`
* **Tier 3 Video Motion Prompt (Google Veo 3.1 / 6s):**
  > `Starting directly from the initial image, dynamic low-angle camera tracks upward with explosive momentum. Permitted Props: [streetwear jacket, rooftop ledge]. The hero launches forward into the air in a sudden kinetic leap, body twisting dynamically against the glowing neon skyline. Rain droplets freeze momentarily in mid-air with visible comic book motion lines. Hybrid 2D/3D Spider-Verse animation, stepped 12fps animation timing on twos, chromatic aberration. Audio: sudden sharp sneaker rubber squeak on wet brick, explosive whoosh of displaced air, distant electric bass rumble, rain pattering on concrete, zero dialogue, no background music.`

### Benchmark 3: Pop Mart Designer Vinyl Toy (The Turntable Showcase)
* **Tier 2 Keyframe Plate (Midjourney / Imagen 4):**
  > `Pop Mart designer art toy 3D render. A chubby, adorable astronaut character with an oversized glossy helmet visor and chunky matte white space suit, holding a tiny glowing translucent yellow star. Chibi proportions, smooth matte vinyl and glossy PVC plastic textures, translucent resin star with internal subsurface scattering. Ultra-clean minimalist studio stage background in soft pastel teal, dual softbox rim lighting creating sharp specular reflections along helmet contours. Miniature macro 100mm lens, razor-sharp focus. Aspect ratio 16:9.`
* **Tier 3 Video Motion Prompt (Google Veo 3.1 / 6s):**
  > `Starting directly from the initial image, locked-off camera with smooth 180-degree turntable orbital rotation. Permitted Props: [astronaut toy, glowing star, studio pedestal]. The designer vinyl toy rotates smoothly on its circular display base, allowing the overhead studio softbox light to glide along the glossy curves of the helmet visor. The tiny translucent star glows with steady warm yellow bioluminescence. Pop Mart collector toy aesthetic, pristine vinyl materials, zero surface flaws. Audio: silent studio acoustic environment, subtle high-frequency electronic shimmer hum from glowing star, faint motorized turntable mechanical whir, zero dialogue, no background music.`

---

## 7. Next Steps for Final System Evaluation

This research document is permanently archived in `research/styles/02_stylized_3d_cgi_animation.md`. During future style specifications or dialect implementations:
1. Use Section 2 to populate the **Dialect Variations Registry** under `stylized_3d_cgi.md`.
2. Apply Section 3 negative prompts directly to pre-flight linter **L-11** to eliminate uncanny valley and plastic-doll bugs.
3. Use Section 5 audio phrasing to build tactile Veo soundboards for 3D animation.
