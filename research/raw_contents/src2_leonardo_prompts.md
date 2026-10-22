# Source 2: Leonardo.ai — Mastering Prompts for Veo 3 / 3.1
**URL:** https://leonardo.ai/news/mastering-prompts-for-veo-3
**Platform Scope:** Google Veo 3 / Veo 3.1 & Veo 3.1 Fast integration on Leonardo.ai

---

# Mastering Prompts for Veo 3: The Director’s Guide to Video Generation

## 1. Introduction: Think Like a Film Director
Generating cinematic video with state-of-the-art models like Google Veo 3 / 3.1 requires a fundamental shift in user behavior. Unlike text search or basic static image diffusion, video generation models simulate physics, optics, temporal coherence, and cinematic motion over time. 

To achieve predictable, studio-grade results, you must step into the role of a film director, cinematographic DP (Director of Photography), and sound designer. Every prompt should read like a detailed camera call sheet and director's shot note, front-loading critical tokens and establishing spatial and narrative clarity.

---

## 2. Prompting Essentials & The Sweet Spot

### Prompt Length & Word Economy
- **The Sweet Spot:** 3 to 6 sentences, or approximately **100 to 150 words**.
- **Under-prompting (The "Vague One-Liner"):** Writing short prompts like *"a man walking in a city"* leaves massive ambiguity in the model's latent space, resulting in default, stock-footage looks, unpredictable physics, and flat lighting.
- **Over-prompting (The "Essay Trap"):** Writing excessive narrative backstories or compound paragraphs causes token dilution, hallucinations, and competing instructions.

### The Front-Loading Rule
Veo 3 and 3.1 place significantly higher algorithmic weight on the opening tokens of a prompt. If your primary subject, camera framing, or lighting condition is buried at the end of a long sentence, the model may drift or fail to anchor the visual composition. Always place framing and the primary subject first.

---

## 3. Core Anatomy of a Cinematic Prompt

A high-performing Veo prompt is broken into four interdependent layers:

### 1. Subject (The "Who" or "What")
- Specify age, ethnicity, bone structure, expression, grooming, and detailed wardrobe (fabric texture, silhouette, distressing).
- *Weak:* "a detective"
- *Strong:* "A weary 45-year-old detective with stubble and tired eyes, wearing a soaked dark wool trench coat with an upturned collar"

### 2. Context & Environment (The "Where" & "When")
- Define architectural environment, background depth, atmospheric conditions, and time of day.
- Detail atmospheric particles (rain, volumetric dust, fog, smoke) to create three-dimensional depth for lighting to interact with.
- *Weak:* "in a dark street"
- *Strong:* "Standing under a flickering neon diner sign on a rain-slicked asphalt alley in downtown Chicago at 2 AM, steam venting from manholes"

### 3. Action (The "How" & Temporal Motion)
- **The One Action Rule:** Restrict each 4–8 second generation block to **one single, continuous physical movement or state change**. Attempting compound actions (e.g., *"she enters, sits down, drinks coffee, and reads a book"*) causes temporal averaging, phantom limbs, and visual warping.
- Use explicit biomechanical descriptions rather than abstract adverbs:
  - *Weak:* "walking sadly"
  - *Strong:* "shuffling forward slowly with hunched shoulders, hands jammed into coat pockets, head cast downward"

### 4. Style, Mood & Lighting (The "Aesthetic")
- Specify optical characteristics, lens choices, film stocks, and motivated lighting sources.
- Examples: *"Shot on 35mm anamorphic lens, shallow depth of field, warm practical tungsten lighting, high-contrast chiaroscuro, cinematic film noir tone."*

---

## 4. Camera Control & Cinematographic Vocabulary

Veo 3 understands optical camera motion with exceptional fidelity when prompted with precise cinematography terms. Never chain conflicting camera moves together (e.g., *"pan left while zooming out and dollying forward"*). Lock onto **one primary camera movement** per clip.

### Shot Types & Framing
- **Extreme Close-Up (ECU):** Isolates subtle facial micro-expressions, eyes, or tactile object details.
- **Medium Close-Up (MCU):** Chest-up framing, ideal for dialogue scenes and character focus.
- **Medium Shot (MS):** Waist-up framing, balancing character action with nearby environment.
- **Wide Shot (WS) / Establishing Shot:** Full-body character or expansive environment framing to establish spatial geography.
- **Low-Angle:** Virtual camera positioned below subject looking up, conveying power, menace, or monumental scale.
- **Dutch Angle:** Canted horizon, inducing psychological disorientation or tension.

### Camera Movements & Dynamics
- **Slow Push-In / Dolly-In:** Virtual camera moves smoothly inward toward the subject, elevating emotional intimacy, suspense, or realization.
- **Pull-Out / Dolly-Back:** Virtual camera retreats backward, revealing broader context or character isolation.
- **Lateral Tracking / Trucking Shot:** Camera moves parallel to a moving subject at matched velocity.
- **Subtle Handheld Follow:** Introduces subtle micro-jitter and organic drift, conveying documentary realism or urgent kinetic energy.
- **Locked-Off Tripod (Static Frame):** Completely stable framing; essential for scenes emphasizing subtle internal subject motion or precise dialogue lip sync.

---

## 5. Advanced Professional Workflows

### 1. Image-to-Video (I2V)
- **Concept:** Rather than generating motion from a blank slate, upload a high-quality static keyframe (created in Leonardo.ai or Imagen) as the visual seed.
- **Advantage:** Locks character likeness, costume details, lighting palette, and environment composition with 100% precision.
- **Prompting Strategy for I2V:** Your text prompt does not need to re-describe the static appearance in full; instead, it focuses on **how that specific frame begins to move**:
  - *Prompt:* *"The character blinks slowly, exhales a breath of visible vapor into the cold air, and turns his gaze directly toward the lens as camera gently pushes in."*

### 2. Start & End Frame Interpolation (S/E Workflow)
- **Concept:** Upload both a **Start Frame** (Frame 0) and an **End Frame** (terminal frame).
- **Execution:** Veo interpolates the temporal trajectory between the two anchor frames, synthesizing natural physics, motion blur, and spatial continuity to connect the endpoints smoothly.
- **Primary Use Cases:**
  - Product reveals (closed box $\rightarrow$ open presentation).
  - Controlled character state changes (looking down at map $\rightarrow$ looking up in shock).
  - Complex cinematic match cuts between scenes.

---

## 6. Synced Audio Generation & Soundscape Directing

With Veo 3 / 3.1's native dual-stream audio synthesis, prompt engineering extends to acoustic design:
- Add an explicit **`Audio:`** block at the prompt's conclusion.
- Specify ambient room tone, foley sounds, and musical silence:
  - *Example:* `Audio: steady patter of rain on a glass windowpane, low distant city hum, measured footsteps on hardwood, zero background music.`
- For dialogue, wrap spoken words in quotes preceded by speech verbs (`says: "..."`).

---

## 7. Iteration Strategy: Fast vs. High-Fidelity
- **Veo 3.1 Fast / Lite:** Use for rapid prompt drafting, composition verification, and camera motion testing. Allows rapid feedback loops without burning generation credits.
- **Veo 3.1 (Full):** Switch to full model once prompt structure, camera angles, and action timing are locked, rendering final 1080p, 24fps production masters with synchronized audio.
