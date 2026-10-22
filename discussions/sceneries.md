# Discussion Log: Sceneries & Environments Domain

**Status:** 🟡 IN PROGRESS (Drafting Phase 5.3 Specification)  
**Target Specification:** [`../production_framework/specs/03_scenery_spec.md`](../production_framework/specs/03_scenery_spec.md)  

---

## 1. Domain Architecture: The Environmental Anchor

In AI video generation, inconsistent or flat environments destroy immersion. If an environment is described vaguely or without depth planes, generative models (Veo 3.1, Imagen 4) produce:
1. **Flat Backdrop Syndrome:** The scene looks like a painted 2D billboard; when the camera moves, the world warps or shears instead of showing authentic 3D parallax.
2. **Muddy Light Default:** Without motivated physical light sources, models default to sterile ambient computer-game lighting.
3. **Subject Bleed into Reference Assets:** Uploading an environment reference image containing people causes unwanted characters to spawn into unrelated video shots.

To solve this, the **`environments/`** domain standardizes how locations and commercial sets are defined and fed into Google Flow as **Ingredient #2 (Environment Anchor)**.

---

## 2. Core Engineering Principles

### A. The 3-Plane Spatial Parallax Standard
Every environment prompt must establish three distinct spatial planes:
- **Foreground (Near Plane):** Elements near the lens (dangling cables, foliage, window frames, or stationary foreground subjects) that slide across the frame during camera moves.
- **Midground (Action Plane):** The focal stage where primary character action, fleeing crowds, or product placement occurs.
- **Background (Horizon / Infinity Plane):** Distant architectural skylines, mountains, or celestial phenomena that exhibit realistic slow motion during parallax tracking.

### B. Motivated Light Transport & Atmospheric Scattering
- **No "Free" Light:** Every beam of light must originate from an identifiable physical source (e.g. low-angle sunset, fiery meteoric entry, flickering practical neon, overhead studio softbox).
- **Atmospheric Medium:** Air in cinema is never a vacuum. Prompts specify particulates (sea spray, dust motes, haze, smoke, or rain streaks) giving light rays physical medium to scatter through.

### C. Google Flow Ingredient #2: The "Empty Stage" Reference Protocol
- For multi-shot scene continuity, reference images stored in `environments/<id>/references/` must be **Empty Stage Plates** (showing architecture, lighting, and textures with zero foreground characters or actors). This guarantees zero character bleed into downstream shots.

---

## 3. Directory Contract: `environments/<location_id>/`

```text
environments/
└── <location_id>/                   # e.g., apocalyptic_beach/ or tabletop_studio/
    ├── summary.md                   # Human-readable world description, lore, geographical notes
    ├── spatial_layers.md            # Explicit Foreground, Midground, and Background specifications
    ├── lighting_rig.md              # Key, fill, rim, practicals, and atmospheric medium
    ├── acoustics.md                 # Diegetic room tone, weather foley, ambient soundscape
    ├── master_anchor.txt            # LOCKED 25–40 word environmental anchor string
    └── references/
        └── empty_stage.png          # Approved empty background plate (Google Flow Ingredient #2)
```

---

## 4. Empirical Simulations & Verified Prompts

### Simulation 1: Apocalyptic Beach & Fractured Moon
- **Concept:** Sweeping coastal beach flanked by modern glass towers during a cosmic catastrophe; panicked crowds flee while a lone man in shorts stands serene in the foreground.
- **Compiled Prompt:**
  ```text
  Wide-angle sideline perspective along a sweeping coastal beach with modern glass buildings flanking the shore. In the foreground, a lone man in beach shorts and a casual open shirt stands completely motionless on the sand, gazing calmly out to sea. In the frantic midground, panicked crowds flee in blurred motion across the wet sand, while towering coastal skyscraper windows reflect the fiery sky. In the colossal background, an immense fragmented moon looms dangerously close overhead, shedding burning fiery meteoric debris through the upper atmosphere as a massive oceanic tidal surge rises across the horizon. Warm golden-amber catastrophic illumination casts long shadows, filled with sea spray mist and falling embers. Slow push-in toward the apocalyptic skyline. Audio: distant deafening oceanic roar, atmospheric sonic rumbles, muffled panicked shouts, rushing wind, no background music.
  ```
- **Audit:** 131 words, 0 equipment nouns, 100% prompt purity, 3 clear spatial planes, synchronized audio block.
- **Reference:** [`_raw/26_apocalyptic_beach_scenery_simulation.md`](./_raw/26_apocalyptic_beach_scenery_simulation.md).

### Simulation 2: Refined Corner Vantage & Horizon Curvature
- **Concept:** Elevated corner perspective capturing full horizon curve; lone man seen from behind with hands in pockets; crowds fleeing inland away from ocean; moon breaking into open sea without touching mainland yet.
- **Compiled Prompt:**
  ```text
  An ultra-wide panoramic perspective from the far elevated corner of a vast coastal beach, capturing the immense curvature of the horizon. In the lower corner foreground, seen from behind, a lone relaxed man stands motionless with his hands casual in his shorts' pockets, gazing out at the sea. In the sprawling midground, terrified crowds of beachgoers run frantically inland toward city boardwalk exits away from the water, while distant coastal building glass catches deep amber glints. Far out across the distant oceanic horizon, a colossal fractured moon disintegrates in the sky, raining incandescent fiery debris directly into the churning, swelling sea before physical impact. Late-afternoon golden-orange atmospheric haze fills the wide vista, illuminated by atmospheric ionization and ocean steam. Slow steady push-in. Audio: deep bass oceanic rumble, distant crashing surf, faint muffled panic, whipping sea wind, no background music.
  ```
- **Audit:** 139 words, 0 equipment nouns, 100% prompt purity, back silhouette pose, verified via Photo-First generation.
- **Reference:** [`_raw/27_scenery_refinement_wide_corner_perspective.md`](./_raw/27_scenery_refinement_wide_corner_perspective.md).

### Simulation 3: The Concept Art Matte Painting Breakthrough
- **Concept:** Shifting from literal object listing to master concept art principles (Roger Deakins / Sparth): value compression, monochromatic burnt amber/obsidian palette, repoussoir foreground framing, and staffage desolation.
- **Compiled Still Image Prompt:**
  ```text
  Cinematic concept art matte painting of an apocalyptic coastal event at twilight, in the visual style of Roger Deakins and Sparth. Ultra-wide panoramic perspective from a dark, shadowed rocky bluff in the foreground corner, framing the vast sweep of an ominous, desolate shoreline. High atmospheric perspective with value compression and volumetric smoke. In the dark foreground silhouette, a solitary man stands motionless with hands in his pockets, gazing out at the cosmic catastrophe. Across the vast, nearly-deserted beach, a few distant small blurred human silhouettes flee in terror toward crumbling concrete seawalls. On the distant horizon, a monstrous, fragmented moon dominates the celestial sky, shattered into jagged glowing molten tectonic plates, raining incandescent fireballs directly into an obsidian ocean that swells into towering, steam-plumed tidal waves. Atmospheric haze in monochromatic tones of burnt amber, dark soot black, and glowing embers, with zero bright tropical colors. 35mm anamorphic film still, epic scale contrast, sublime cinematic dread.
  ```
- **Audit:** 162 words, 0 camera motion verbs (Pure Image Mode), 0 audio blocks, monochromatic color unification, certified masterwork render (`apocalyptic_beach_concept_art`).

### Simulation 4: The Definitive True Vision (Normalcy Interrupted by Cataclysm)
- **Concept & Discovery:** The true power of environmental storytelling comes from the **contrast between ordinary human life and extraordinary cataclysm**:
  - A real public beach with beach towels, umbrellas, and people enjoying an afternoon suddenly disrupted.
  - Terrified beachgoers running inland toward roads and buildings on the left to save themselves.
  - The descending moon hurtling toward Earth with burning fragmentation tails (none having struck the ground yet).
  - Modern coastal buildings with glass facades catching brilliant specular reflections of the lunar fire.
  - The ocean swelling into a gravitational tidal wall on the horizon.
  - In the midst of the stampede, the lone serene man down by the water's edge in shorts, shirt, and sun hat, seen from behind with hands in his pockets, gazing upward at the moon.
- **Compiled Uncapped Still Image Prompt:**
  ```text
  A wide-angle 35mm photograph taken from the corner vantage of a populated city beach on a summer afternoon, as an abrupt cosmic disaster unfolds. In the upper sky, an enormous, terrifyingly detailed moon is hurtling toward Earth at tremendous velocity, shedding fragmented boulders into the upper atmosphere that burn with incandescent golden-fire ionization trails, streaking across the sky without yet impacting the ground. On the far ocean horizon, the gravitational pull causes the sea to swell violently into a massive, rising tidal wall surging toward the coast. On the left side of the frame, modern coastal buildings with reflective glass windows mirror the blazing golden-fiery sky and falling lunar fireballs. On the beach, what was once a normal relaxing afternoon has turned into sheer panic: crowds of beachgoers in swimsuits are frantically running away from the surging water toward the inland promenade and roads, dropping towels, beach bags, and umbrellas in chaotic flight. In stark, emotional contrast, down near the water's edge on the wet sand, a lone man is seen from behind—wearing casual shorts, an unbuttoned shirt, and a sun hat, standing completely still with his hands tucked into his pockets, calmly and serenely staring up at the descending moon. Warm golden-fiery afternoon illumination, dramatic long shadows, photorealistic environmental physics.
  ```
- **Audit:** Complete physical realism, zero camera motion verbs, zero audio blocks, 100% adherence to creator vision, verified masterwork render (`apocalyptic_beach_true_vision`).



