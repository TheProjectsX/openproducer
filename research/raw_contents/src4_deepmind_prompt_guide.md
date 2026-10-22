# Source 4: Google DeepMind — Veo Prompt Guide
**URL:** https://deepmind.google/models/veo/prompt-guide/
**Platform Scope:** Google DeepMind official prompting framework for Veo generative video models

---

# Google DeepMind: Official Guide to Prompting Veo

## Overview & Philosophy
Veo is Google DeepMind's state-of-the-art video generation model capable of generating high-definition (1080p), temporally coherent video clips across diverse styles and cinematic conditions. DeepMind’s design philosophy for Veo prompt engineering centers on the **Film Director Mindset**: treating prompt text not as raw metadata or disconnected tag clouds, but as a structured screenplay shot description.

By providing clear, structured instructions that delineate camera, subject, action, context, and aesthetic atmosphere, creators can precisely guide Veo’s spatial and temporal latent representations.

---

## The Official 5-Part Prompt Formula

Google DeepMind recommends structuring every video prompt around five core foundational elements:

$$\mathbf{[Cinematography]} + \mathbf{[Subject]} + \mathbf{[Action]} + \mathbf{[Context]} + \mathbf{[Style\ \&\ Ambiance]}$$

### 1. Cinematography (Camera Framing & Movement)
Define the physical perspective through which the audience observes the world:
- **Framing & Shot Types:**
  - *Extreme Close-up (ECU):* Magnifies minute textures, eyes, or hands.
  - *Close-up (CU):* Emphasizes emotional state and facial expression.
  - *Medium Shot (MS):* Waist-up framing establishing subject posture and gesture.
  - *Wide Shot (WS) / Long Shot:* Integrates subject within the broader environment.
  - *Extreme Wide Shot (EWS):* Dominates with landscape or architecture; subject is minute or absent.
  - *Aerial / Drone Shot:* High-altitude overview tracking or sweeping across terrain.
- **Camera Movement Dynamics:**
  - *Static / Locked-off:* Camera remains completely stationary; motion occurs strictly within the frame.
  - *Pan (Left / Right):* Camera pivots horizontally from a fixed position.
  - *Tilt (Up / Down):* Camera pivots vertically from a fixed position.
  - *Dolly / Tracking:* Camera physically glides forward, backward, or laterally along rails/gimbal.
  - *Crane / Jib:* Vertical elevation sweep ascending or descending over a scene.
  - *Handheld:* Natural, subtle organic motion with realistic micro-shakes.

### 2. Subject
The primary focal entity within the frame:
- **Character Attributes:** Age, gender, ethnicity, distinct physical features (scars, beard, freckles, eye color), hair style/texture.
- **Wardrobe & Styling:** Specific clothing items, textures, fits, colors, accessories, and weathering (e.g., *"faded denim jacket with brass buttons", "tattered linen tunic"*).
- **Physical Demeanor & Expression:** Emotional state reflected in brow, mouth, stance, and tension (e.g., *"steely determination", "wide-eyed astonishment", "quiet melancholy"*).

### 3. Action (Temporal Mechanics)
What happens across the duration of the clip:
- Keep the action bounded and focused. Veo performs best when simulating a continuous, uninterrupted physical sequence rather than disjointed mini-stories.
- Describe physical biomechanics rather than conceptual labels:
  - Specify speed, direction, physical interaction with objects, and weight.
  - Examples: *"reaches out a trembling hand to touch the glowing crystal", "accelerates into a sprint, kicking up dry dust", "slowly turns her head over her left shoulder"*.

### 4. Context & Environment
The physical world surrounding the subject:
- **Setting Geography:** Interior vs. exterior, architectural period, geographic topography.
- **Environmental Detail:** Weather conditions (heavy snowfall, drizzle, harsh midday sun, gusting wind), atmospheric elements (mist, smoke, dust particles, embers).
- **Time of Day:** Dawn, golden hour, high noon, blue hour, twilight, midnight darkness.

### 5. Style & Ambiance
The photographic and artistic rendering paradigm:
- **Lighting Architecture:**
  - *Quality:* Soft diffused, hard directional, dappled, harsh.
  - *Source:* Practical neon signs, golden hour rim lighting, bioluminescent glow, candlelight, overcast sky.
  - *Contrast:* High-contrast chiaroscuro, low-key dramatic lighting, high-key commercial clarity.
- **Optics & Rendering:**
  - Photorealistic 35mm film, anamorphic widescreen with subtle chromatic aberration and horizontal flares, vintage 16mm grainy home movie, clean IMAX digital sensor.
  - Stylized aesthetics: 3D stop-motion clay animation, stylized anime/manga cel shading, impressionistic oil paint in motion.

---

## Official Prompt Examples & Deconstructions

### Example 1: Cinematic Portraiture (Character Focus)
> **Prompt:**  
> *"Close-up shot of an elderly silversmith with deep laugh lines and silver spectacles, meticulously engraving an intricate floral pattern onto a silver locket. Warm, focused task lighting illuminates his weathered hands while the surrounding workshop remains in soft, shadowed amber tones. The camera slowly pushes in on his focused expression as tiny silver shavings curl away from his chisel. 35mm cinematic film grain, shallow depth of field, intimate and reverent atmosphere."*

**Deconstruction:**
- *Cinematography:* Close-up shot, slow push-in, shallow depth of field.
- *Subject:* Elderly silversmith, deep laugh lines, silver spectacles, weathered hands.
- *Action:* Meticulously engraving an intricate floral pattern, tiny silver shavings curling away.
- *Context:* Traditional workshop, background in soft shadowed amber tones.
- *Style & Ambiance:* Warm focused task lighting, 35mm cinematic film grain, intimate and reverent atmosphere.

---

### Example 2: Dynamic Action & Environment
> **Prompt:**  
> *"Low-angle dynamic tracking shot following a red rally car drifting violently around a sharp gravel hairpin bend in a dense pine forest at sunset. Golden sunlight cuts through the tree canopy in dramatic god rays, catching the thick rooster tail of gravel and dust kicked up by the spinning rear tires. The camera matches the car's drift velocity at wheel level before pulling back slightly. Hyper-realistic motion blur, sharp lens flares, visceral adrenaline-fueled tone."*

**Deconstruction:**
- *Cinematography:* Low-angle dynamic tracking shot, wheel-level matching velocity, pulling back slightly.
- *Subject:* Red rally car, spinning rear tires.
- *Action:* Drifting violently around a sharp gravel hairpin bend, kicking up rooster tail of dust.
- *Context:* Dense pine forest, gravel road, sunset, tree canopy.
- *Style & Ambiance:* Dramatic god rays, golden sunlight, hyper-realistic motion blur, sharp lens flares, adrenaline-fueled tone.

---

## Best Practices & DeepMind Guidelines
1. **Be Descriptive, Not Redundant:** Avoid piling on subjective empty words ("photorealistic, hyperrealistic, 8k, amazing"). Instead, describe concrete visual characteristics that imply quality (lens specs, lighting physics, particle interaction).
2. **Synchronize Camera with Subject Motion:** Design camera movement to complement what the subject is doing (e.g., tracking a runner, holding static on a contemplative character).
3. **Use Natural Language Flow:** While structured logically, write in complete, grammatical English sentences. Veo’s text encoder parses relationships between clauses and prepositions effectively.
4. **Leverage Multimodal Inputs:** Use Imagen or still photographs as visual anchors for character and scene consistency across multiple generations.
