# 03. Prompting Techniques & Cinematographic Control

## 1. Temporal Sequencing: Sequential Beat Prose

Veo 3.1 supports internal temporal choreography within a single generation clip (4–10 seconds) using natural sequential beat prose rather than rigid clock timestamps (which risk on-screen digit burn-in or temporal stutter):

### Beat Sequencing Rules
- Use natural temporal transition conjunctions: "Initially...", "Next...", "Then...", "As...", "Finally...".
- Divide a single clip into **maximum 2 to 3 beats**.
- Ensure action transitions flow logically without requiring discontinuous jump cuts.

### Sequential Prompt Example
```text
Medium shot of a tired watchmaker at his wooden workbench. Initially, he peers through his brass jeweler's loupe, holding a tiny gear steady with tweezers. He then gently sets the gear into the pocket watch mechanism and slowly looks up toward the frame with a faint, satisfied smile. Locked-off eye-level static framing with zero camera movement. Warm tungsten desk lamp lighting, shallow depth of field. Audio: SFX: precise metallic ticking, faint exhale of breath; Ambience: soft quiet room tone; Dialogue: None; Music: None.
```

---

## 2. Optical Lens & Sensor Modeling

Veo 3.1’s spatial transformer understands optical lens characteristics. Specifying exact focal lengths and sensor formats dictates field of view, perspective compression, and depth of field:

### 2.1 Focal Length Matrix

| Focal Length | Field of View | Perspective Distortion / Effect | Cinematic Application |
|---|---|---|---|
| **14mm – 18mm** | Ultra-Wide | Dramatic barrel distortion, exaggerated distance, massive background scale | Action POVs, claustrophobic interiors, skateboarding/sports |
| **24mm – 28mm** | Wide Angle | Expansive environment, minimal distortion, crisp spatial depth | Establishing shots, architectural interiors, environmental portraits |
| **35mm** | Moderate Wide | The classic Hollywood storytelling lens; natural human eye approximation | Two-shots, walking tracking shots, indie film aesthetics |
| **50mm** | Normal / Standard | Zero perspective distortion; true-to-life spatial proportions | Dialogue coverage, neutral documentary, natural character focus |
| **85mm – 105mm** | Short Telephoto | Compressed background, dramatic bokeh, isolated subject | Close-up portraits, romantic cinema, emotional introspection |
| **135mm – 200mm** | Telephoto | Extreme background flattening; subjects appear physically compressed against background | High-tension surveillance, sniper POVs, sports isolation |
| **Probe / Macro Lens** | Microscopic | Extreme magnification with massive depth-of-field drop-off | Insect eyes, watch gears, liquid droplets, food cinematography |

### 2.2 Anamorphic vs. Spherical Emulation
- **Anamorphic Cinema Specification:**  
  *Keywords:* `Shot on Panavision C-Series anamorphic lenses, 2x squeeze, horizontal cyan streak flares, oval bokeh, subtle optical vignetting, barrel distortion at edges.`
- **Spherical High-End Digital:**  
  *Keywords:* `Shot on Arri Alexa 65, pristine optical clarity, circular creamy bokeh, sharp edge-to-edge resolution, neutral chromatic correction.`

---

## 3. Motivated Lighting Rigs & Light Transport

In AI diffusion, failing to specify lighting causes the model to default to flat, ambient, sterile illumination. Directing light sources establishes mood and physical credibility:

```
                      [ Rim / Hair Light ] (Separation)
                              │
                              ▼
                     [ SUBJECT / ACTOR ]
                           ▲      ▲
                          /        \
                         /          \
                        /            \
       [ Key Light ] ──┘              └── [ Fill Light / Bounce ]
  (Primary Motivated Source)                (Soft Contrast Control)
```

### High-Yield Lighting Schemes
1. **Chiaroscuro / Low-Key Dramatic:**  
   High contrast ratio (8:1), deep shadows, single dominant hard key light.  
   *Prompt text:* *"Dramatic low-key chiaroscuro lighting, single hard tungsten key light from 45 degrees left, deep rich shadows on the right cheek, dark moody film noir aesthetic."*
2. **Volumetric Atmospheric (God Rays):**  
   Directional beam passing through atmospheric particles.  
   *Prompt text:* *"Golden hour sunlight streaming through broken warehouse windows in thick volumetric god rays, illuminating swirling dust motes in the air."*
3. **Motivated Practicals:**  
   Light emitted from visible, tangible objects inside the scene.  
   *Prompt text:* *"Illuminated solely by the green phosphor glow of an antique CRT monitor and a flickering desk candle, casting warm orange bounce onto the subject's knuckles."*
4. **Soft Wrap (Beauty / Commercial):**  
   Broad diffused key with soft wrap-around fill.  
   *Prompt text:* *"Soft wrapped beauty lighting, large diffused octabox key, gentle shadow roll-off, clean modern commercial grade."*

---

## 4. Camera Dynamics & Kinematics

### 4.1 Single Camera Verb Taxonomy

```
CAMERA MOTIONS
├── STATIONARY
│   ├── Locked-Off Static Framing  -> Zero camera movement; subject moves inside frame
│   └── Stationary Pan / Tilt      -> Pivot horizontally or vertically on fixed axis
├── DYNAMIC OPTICAL GLIDE
│   ├── Slow Camera Push-In        -> Moves physically toward subject (intensifying drama)
│   ├── Slow Camera Pull-Out       -> Moves physically away (revealing context/isolation)
│   ├── Lateral Tracking Glide     -> Glides laterally parallel to movement
│   ├── Vertical Elevation Sweep   -> Vertical optical boom sweep up or down
│   └── Smooth Tracking Follow     -> Smooth stabilized operator glide behind or ahead
└── ORGANIC / FREE
    ├── Handheld Follow            -> Natural micro-jitters, kinetic urgency, documentary
    └── Low-Altitude Aerial Glide  -> Fluid high-speed aerial flight through space
```

### 4.2 Speed Modifiers
Veo responds accurately to speed qualifiers:
- `Slow, measured push-in` (deliberate tension, 8 seconds)
- `Rapid snap-zoom / crash zoom` (shock, comic book impact)
- `Gentle floating drift` (dreamlike, ethereal)

---

## 5. Film Stocks & Color Grading Profiles

Directing color palette and film grain texture transforms digital sterility into cinematic master quality:

- **Kodak Vision3 5219 (35mm):** *"Shot on 35mm Kodak Vision3 5219 film stock, fine organic silver halide grain, rich natural skin tones, deep blacks with preserved shadow detail."*
- **Kodachrome 64 (Vintage 1970s):** *"Authentic Kodachrome 64 aesthetic, saturated primary reds and yellows, warm retro contrast, distinctive 1970s color palette."*
- **Bleach Bypass (Gritty Thriller):** *"Bleach bypass color grading, desaturated skin tones, crushed high-contrast shadows, cold silvery metallic sheen, David Fincher aesthetic."*
- **Technicolor Three-Strip (1940s Classic):** *"1940s Technicolor three-strip process, ultra-vibrant crimson and emerald saturation, glowing studio lighting, Golden Age Hollywood look."*

---

## 6. Deprecated vs. Modern Prompt Syntax (Veo 3.1 Migration)

| Deprecated Syntax (v1.0 – v2.0) | Modern Veo 3.1 Syntax | Rationale |
|---|---|---|
| `(thats where the camera is)` | `Medium close-up, eye-level camera` | Natural language spatial encoder replaced awkward parenthetical hints. |
| Negative prompts with "no" / "don't" (e.g. `no blur, don't show car`) | Describe desired positive state: `sharp focus, empty street` | Diffusion models often fixate on the noun following "no", causing hallucination. |
| Vague buzzwords (`photorealistic, 8k, hyper-detail, masterpiece`) | Technical specs (`35mm anamorphic, motivated key light, shallow DoF`) | Buzzwords pollute token attention; optical terms trigger high-fidelity latent representations. |
| ALL CAPS dialogue (`says: "STOP RUNNING"`) | Sentence case (`says: "Stop running"`) | Veo 3.1 spells capitalized words letter-by-letter as acronyms (S-T-O-P). |
| Compounding camera moves (`pan left while zooming out and dollying`) | Single camera verb (`Slow camera push-in toward subject`) | Conflicting optical instructions cause spatial warping and perspective shearing. |
