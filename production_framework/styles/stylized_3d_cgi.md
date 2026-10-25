# Style Plugin: Stylized 3D CGI Animation
**ID:** `stylized_3d_cgi`  
**Target Medium:** Stylized 3D Digital Animation & Tactile CGI Character Production  
**Parent Specification:** [`../specs/01_visual_spec.md`](../specs/01_visual_spec.md)  
**Research Reference:** [`../../research/styles/02_stylized_3d_cgi_animation.md`](../../research/styles/02_stylized_3d_cgi_animation.md)

---

## 1. Master Style Anchor String (Verbatim Token Block — Ground-Level Default)
> `Stylized 3D digital character animation, soft rounded geometric forms, warm subsurface scattering on skin, tactile micro-textures on clothing and surfaces, warm three-point volumetric studio lighting, RenderMan global illumination, soft contact ambient occlusion shadows, creamy circular bokeh, cinematic 3D CGI render aesthetic.`

---

## 2. Dialect Variations Registry (Layer 2 Aesthetic Dialects)

When the creator requests a specific 3D animation studio, aesthetic dialect, or collectible medium, the compiler injects the corresponding descriptor into Tokens 81–130:

### A. `pixar_feature` (Disney / Pixar Feature Film Aesthetic)
* **Dialect Descriptor:** `Disney Pixar style 3D animation, soft rounded character geometry, large expressive eyes, friendly silhouette, subsurface scattering on skin, peach-fuzz skin translucency, tactile micro-textures on clothing (wool knit, corduroy), hand-painted texture maps, warm cozy volumetric lighting, RenderMan global illumination.`
* **Kinematics:** Slow deliberate head tilt, expressive eye blink and coordinated gaze shift, soft breathing cycle, gentle linear camera push-in.
* **Dialect Negatives:** `photorealistic human skin, microscopic biological pores, uncanny valley, harsh angular lines, dirty textures, plastic doll, 2D flat drawing, sharp geometric edges.`

### B. `spider_verse_comic_hybrid` (Sony Spider-Verse / Comic Hybrid)
* **Dialect Descriptor:** `Spider-Verse style 3D animation, hybrid 2D and 3D CGI, bold dynamic black graphic ink outlines, visible Ben-Day halftone printing dot textures, comic book cross-hatching, chromatic aberration on high-contrast edges, vibrant neon color splashes, graphic novel lighting, high-contrast rim highlights.`
* **Kinematics:** Stepped 12fps animation timing on twos, high-velocity dynamic action leap, sudden kinetic freeze-frame pose, fast-paced camera tracking sweep with comic motion blur streaks.
* **Dialect Negatives:** `smooth 60fps soap-opera CGI, photorealistic lighting, soft pastel watercolor, untextured 3D models, smooth plastic gloss.`

### C. `dreamworks_comedic_cgi` (Exaggerated Comedic Character 3D)
* **Dialect Descriptor:** `DreamWorks style 3D digital animation, exaggerated comedic facial expression, dynamic squash and stretch geometry, bold colorful character design, high-saturation primary colors, vibrant whimsical lighting, sharp polished digital rendering, snappy physical comedy staging.`
* **Kinematics:** Rapid double-take head snap, exaggerated jaw drop, rubbery bouncy body recoil, sudden whip pan camera tracking.
* **Dialect Negatives:** `dull desaturated colors, gritty horror lighting, photorealistic pores, dark shadows, melancholy mood.`

### D. `pop_mart_vinyl_art_toy` (Designer Vinyl Toy / Blind-Box Collectible)
* **Dialect Descriptor:** `Pop Mart designer toy aesthetic, chibi art toy 3D render, chunky stylized proportions, smooth matte vinyl and glossy PVC plastic textures, translucent colored resin with internal subsurface scattering, ultra-clean studio stage, overhead softbox diffusion, crisp metallic rim highlights, miniature macro 100mm lens.`
* **Kinematics:** Slow smooth 360-degree turntable orbital rotation, subtle studio light shift reflecting across vinyl head contour, stationary miniature posing.
* **Dialect Negatives:** `rough textures, fingerprints, dust, scratches, realistic human anatomy, 2D flat drawing, gritty urban grunge.`

### E. `retro_ps1_lowpoly` (Nostalgic 1990s Low-Poly Video Game CGI)
* **Dialect Descriptor:** `Retro 1990s PS1 low-poly 3D graphics, visible polygonal mesh faces, faceted geometric surfaces, crunchy 320x240 render resolution, pixelated low-resolution texture maps, unlit vertex shading, affine texture warping with zero perspective correction, retro CRT monitor scanlines, vintage nostalgic 3D game aesthetic.`
* **Kinematics:** Stiff rigid joint rotation, stepped walk cycle with zero fluid interpolation, fixed low-angle third-person tracking camera.
* **Dialect Negatives:** `modern 4K raytracing, smooth high-poly curves, subsurface scattering, ambient occlusion, realistic lighting.`

---

## 3. Anatomical & Materiality Rules (Uncanny Valley Solutions)
* **Geometric Simplification:** Chunky, appealing stylized forms with softened bevelled contours. Characters must remain fundamentally stylized; never mix realistic human bone landmarks with cartoon geometry.
* **Anti-Wax Subsurface Scattering:** Skin must exhibit soft internal light transmission (subsurface scattering) and velvety peach-fuzz finish, eliminating both waxy plastic doll sheen and gross biological skin pores.
* **Optical Gaze & Pupil Symmetrical Lock:** Mandatory anchoring of symmetrical iris alignment and coordinated forward eyeline to eliminate cross-eyed or wandering pupil hallucinations across video frames.
* **Anti-Rubber Hose Mesh Integrity:** Enforce rigid joint articulation and grounded weight transfer. Single-Motion Law strictly applied to eliminate spaghetti limb collapse and multi-arm mutations.

---

## 4. World & Lighting Physics
* **Contact Ambient Occlusion Shadows:** Heavy, grounded ambient occlusion shadows under feet, furniture, and contact points. Characters must firmly connect to floor planes to eliminate floating character glitches.
* **Raytraced Volumetric Lighting:** Warm three-point studio lighting (soft key, gentle fill, crisp motivated rim light) with natural atmospheric falloff.
* **Depth of Field:** Controlled shallow optical depth of field with creamy circular bokeh, heightening miniature tactile scale.

---

## 5. Kinematic Grammar
* **Classical Character Animation Physics:** Movement must demonstrate anticipation (weight shifting before stepping), secondary action (hair, ears, and fabric responding naturally to movement inertia), and grounded weight.
* **Pure Optical Trajectories:** Slow creeping push-in, smooth 360-degree orbital arc, or miniature macro tracking. Strictly zero camera hardware nouns (`tripod`, `dolly track`, `crane`).

---

## 6. Tactile Audio Foley Soundboard (Google Veo 3.1)
All Veo 3D animated prompts must pair physical materiality with satisfying, hyper-tactile sound design:
* **Soft / Rubber / Gelatinous Materials:** `Squishy gelatinous boop-squelch, soft rubbery squeak, satisfying plop, bouncy elastic thud`.
* **Mechanical & Toy Foley:** `Crisp mechanical brass gear click, satisfying micro-switch snap, smooth ratchet turn, tiny clockwork ticking`.
* **Fabrics & Surfaces:** `Soft wool knit fabric rustle, tactile footsteps on polished wooden parquet, smooth ceramic clink`.
* **Character Vocal Foley:** `Soft surprised gasp, curious high-pitch robot electronic chirp, warm gentle chuckle, cute sigh`.
* **Music Suppression Rule:** Always enforce `, no background music` or `, clean foley only` to prevent Veo from drowning delicate tactile Foley under an unwanted symphonic score.

---

## 7. Mandatory Style Negative Prompt Clause
> `NEGATIVE PROMPT: photorealistic human skin, microscopic biological pores, realistic veins, uncanny valley, real human photo, flat 2D drawing, rigid wax figure, vacant dead eyes, cross-eyed, rubber limbs, spaghetti joints, melting anatomy, floating character, camera shake, tripod, camera rig.`
