# 08. Limitations, Failure Modes & Workaround Catalog

## 1. Physical & Architectural Limitations

Despite state-of-the-art capabilities in Veo 3.1 and Google Flow, generative video models operate within strict algorithmic boundaries. The following catalog details every documented failure mode, underlying root cause, and production-tested workaround.

---

## 2. Technical Failure Modes & Workaround Matrix

### 2.1 The "Pure White Background" Diagonal Line Glitch
- **Manifestation:** When prompting for a pure white background (e.g., product isolation, commercial studio stock, or minimalist character turnaround), the generated video exhibits moving diagonal black/grey stripes, codec tearing, and flickering scanlines across the white space.
- **Root Cause:** Extreme high-frequency luminance clipping in the diffusion latent space. The model struggles with untextured $(255, 255, 255)$ luminance fields.
- **Workaround:**
  - *Never prompt:* "on a pure white background", "white void", "isolated on white".
  - *Prompt instead:* *"on a seamless light cream gradient studio background"*, *"neutral soft off-white cyclorama"*, or *"light grey minimalist studio cove with soft ambient falloff"*.

### 2.2 2D Animation & Stylized Line Art Degradation (Veo 3.1)
- **Manifestation:** Veo 3.1 excels at photorealism but frequently introduces doubled ink lines, jittering edge artifacts, and unintentional 3D volumetric shading into traditional 2D cartoon or anime styles.
- **Root Cause:** 3.1’s latent space is heavily weighted toward physical light transport (subsurface scattering, raytracing, micro-textures).
- **Workaround:**
  - Enforce explicit flat-shading constraints: *"Traditional 2D hand-drawn cel animation, flat unshaded color fills, bold clean uniform ink outlines, 24fps locked anime aesthetic, zero 3D rendering, zero volumetric lighting."*
  - Alternatively, route stylized animation tasks to baseline Veo 3 or specialized animation pipelines.

### 2.3 Audio-Safety Filter False Positives (API Preview / Enterprise)
- **Manifestation:** The API suddenly aborts generation, returning: *"We encountered an issue with the audio for your prompt"*, even on completely harmless historical, dramatic, or corporate prompts.
- **Root Cause:** Overly sensitive acoustic heuristic filters flagging common dramatic vocabulary (e.g., "crowd panicking", "police sirens", "gunshot echo", "shouting commands").
- **Workaround:**
  - Rephrase sensory cues into observational, indirect visual descriptions:
    - *Replace:* "loud police sirens" $\rightarrow$ *With:* "distant emergency vehicle flashers reflecting on wet asphalt".
    - *Replace:* "officer shouting commands" $\rightarrow$ *With:* "officer speaks with firm, authoritative vocal delivery".
    - *Replace:* "explosion sound" $\rightarrow$ *With:* "heavy low-frequency sub-bass thud".

### 2.4 The CAPS LOCK Spelling Trap
- **Manifestation:** A character prompted to shout a capitalized word pronounces it letter-by-letter as an acronym (e.g., writing `"STOP"` results in the character saying *"S-T-O-P"*).
- **Root Cause:** Text-to-speech phonetic tokenizer assumes capitalized tokens are acronyms (like NASA or FBI).
- **Workaround:**
  - Enforce strict sentence-case formatting on all spoken strings: `"Stop"`, `"Look out"`.
  - Express volume and intensity via the delivery modifier: `He shouts, terrified and furious: "Stop."`

### 2.5 Multi-Speaker Conversational Desynchronization
- **Manifestation:** When two characters speak in the same 8-second clip, voices cross-talk, mouths move while the other speaks, or speech switches to the wrong persona. Success rate is $\sim 40\%$.
- **Root Cause:** The dual-stream audio-video cross-attention matrix cannot cleanly arbitrate alternating facial armatures in a single continuous latent window.
- **Workaround:**
  - Deploy Hollywood **Shot / Reverse-Shot coverage**. Generate Character A's line as Shot 1; cut to Character B's response as Shot 2; assemble in Scene Builder.

### 2.6 Background Contamination from Reference Images ("Ingredients Bleed")
- **Manifestation:** When uploading a character reference image that was shot outdoors (e.g., in a park), trees and grass unintentionally bleed into a newly prompted indoor spaceship scene.
- **Root Cause:** The spatial vision encoder extracts background context along with facial features.
- **Workaround:**
  - All character reference sheets must be generated on a **neutral, solid grey or off-white background** prior to being registered as an Ingredient.

### 2.7 Spatial Geometry Warping on Open-Ended Extensions
- **Manifestation:** Extending a clip forward in time causes architectural walls, clothing, or character anatomy to slowly distort, stretch, or phase through solid objects.
- **Root Cause:** Autoregressive temporal accumulation of latent drift without spatial boundary constraints.
- **Workaround:**
  - Restrict open extensions to a maximum of one sequential pass ($8\text{s} + 6\text{s} = 14\text{s}$ max).
  - For longer sequences, use **Start Frame + End Frame Interpolation** to lock both boundaries.

### 2.8 Compounding Camera Motion Distortion
- **Manifestation:** Combining multiple camera verbs (e.g., *"pan left while zooming out during a fast dolly forward"*) causes horizon tilting, perspective tearing, and motion sickness artifacts.
- **Root Cause:** Spatial transformer receives mutually incompatible optical vectors.
- **Workaround:**
  - Enforce the **Single Camera Verb Rule**: pick exactly one motivated camera movement per shot (`Slow push-in`, `Static locked-off`, `Lateral tracking`).

### 2.9 Errant Visible Watermark Stamp
- **Manifestation:** An unexpected visible "veo" watermark appears stamped in the bottom-right corner of the video.
- **Root Cause:** Server-side state desynchronization or billing tier edge cases.
- **Workaround:**
  - Re-render with identical prompt; or apply an automated 1.5% post-processing crop or matte in the editing workflow.

### 2.10 The "Camera Equipment Hallucination Trap" (In-Scene Tripods & Rigs)
- **Manifestation:** Instead of filming from a stationary or moving perspective, the model renders a physical camera body on a tripod, dolly track, or boom arm inside the scene filming the subject like a behind-the-scenes movie set.
- **Root Cause:** Equipment nouns (`tripod`, `camera on tripod`, `dolly rig`) possess strong object latents in diffusion training data. The text cross-attention parser treats them as in-scene physical props rather than directorial framing instructions.
- **Workaround:**
  - **Never use physical equipment nouns:** Ban `tripod`, `camera on tripod`, `dolly track`, `jib rig`, `drone`.
  - **Use pure perspective and motion descriptors:**
    - For stationary shots: *"Locked-off eye-level framing, completely static shot with zero camera movement."* or *"Static medium shot, motionless frame."*
    - For moving shots: *"Slow push-in toward [subject]"*, *"Smooth lateral tracking shot gliding alongside [subject]"*, *"Elevated descending overhead view"*.
