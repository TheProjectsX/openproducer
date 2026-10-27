# 02. Prompt Anatomy & Structural Architecture

## 1. The Core Prompt Formulas

Prompt engineering for Google Veo 3 / 3.1 and Google Flow diverges sharply from static image prompting. Because the model simultaneously computes 3D spatial geometry, temporal kinematics, optical physics, and audio waveforms, prompts must be organized with rigid architectural hierarchy.

### 1.1 The Official Google 5-Part Formula
Established by Google DeepMind and Google Cloud Enterprise documentation:

$$\mathbf{[Cinematography]} + \mathbf{[Subject]} + \mathbf{[Action]} + \mathbf{[Context]} + \mathbf{[Style\ \&\ Ambiance]}$$

*Usage:* Best for production shot lists, commercial cinematic renders, and direct API calls where optical framing must govern the latent canvas from frame 0.

### 1.2 The Community 8-Component Architecture
Refined through extensive community production testing (Snubroot Guide v4.0 / Veo-JSON):

$$\mathbf{Subject} \rightarrow \mathbf{Context} \rightarrow \mathbf{Action} \rightarrow \mathbf{Style} \rightarrow \mathbf{Camera} \rightarrow \mathbf{Composition} \rightarrow \mathbf{Ambiance} \rightarrow \mathbf{Audio}$$

*Usage:* Optimal for complex multi-clip narratives requiring exhaustive asset specification and sound design.

### 1.3 The Production Standard Blueprint (Front-Loaded Hybrid)
Synthesizing both frameworks for deterministic agent code generation:

$$\mathbf{[Shot\ Framing]} + \mathbf{[Subject\ \&\ Biomechanics]} + \mathbf{[Environment\ \&\ Lighting]} + \mathbf{[Primary\ Camera\ Verb]} + \mathbf{[Dialogue]} + \mathbf{[Audio:\ SFX\ \&\ Ambience]}$$

---

## 2. The Front-Loading Rule (Token Attention Weighting)

### Algorithmic Attention Decay
Empirical testing across Veo 3 and Veo 3.1 confirms an asymmetric token attention distribution:
- **Tokens 1–30 (Highest Priority):** Directly anchor the spatial composition, bounding geometry, and subject identity.
- **Tokens 31–80 (Secondary Priority):** Define physical action, motivated lighting vectors, and environmental interaction.
- **Tokens 81–150 (Atmospheric & Polish):** Modulate color grading, optical aberrations, subtle particles, and audio design.
- **Tokens 150+ (Degradation Zone):** Subject to attention dilution; can trigger conflicting latent vectors or model hallucination.

### The Word Order Failure Mode
- **Fatal Error (Burying the Anchor):**  
  *"On a dark rainy night in a futuristic dystopian city with tall skyscrapers and flying vehicles and neon signs everywhere, a medium close-up of a female hacker typing on a cybernetic terminal."*  
  $\rightarrow$ *Result:* Model expends initial attention generating cityscapes and flying cars; the hacker appears distorted or as an afterthought in the background.
- **Correct Front-Loaded Execution:**  
  *"Medium close-up of a female hacker with shaved temples and cybernetic optical implants typing intensely on a transparent holographic terminal. Rain streaks down the dark window behind her, illuminated by flashing cyan and magenta neon signs. Slow camera push-in. Audio: rapid mechanical key clatter, low synthesized server hum."*

---

## 3. Deep Dive: The 6 Functional Layers

### Layer 1: Framing & Shot Type (The Viewport)
Establishes the optical relationship between subject and world:
- `Extreme Close-Up (ECU)`: Focuses on minute physical detail (eyes, fingers, lock mechanism).
- `Close-Up (CU)`: Chest/neck up; emphasizes emotional weight and dialogue.
- `Medium Close-Up (MCU)`: Standard dialogue and performance framing.
- `Medium Shot (MS)`: Waist up; captures character interaction with hand props.
- `Wide Shot (WS)`: Full body subject in scale with local setting.
- `Extreme Wide Shot (EWS)`: Epic scope; subject occupies less than 10% of frame.
- `Low-Angle` / `High-Angle`: Modulates perceived subject authority and vulnerability.

### Layer 2: Subject Specification (The Anchor)
Avoid generic archetypes ("a warrior", "a scientist"). Provide concrete attributes:
- **Demographics & Anatomy:** Age, ethnicity, facial bone structure, skin texture, hair styling, expression.
- **Costume & Materiality:** Exact garments, weave/fabric type (worsted wool, distressed leather, ripstop nylon), color values, weathering/distress (frayed cuffs, salt stains, grease marks).

### Layer 3: Action & Biomechanical Dynamics (The Kinematics)
- **The One Action Rule:** Bounded within 4–10 seconds, prompt **one single primary movement**. Compound narratives (*"he stands up, walks to the window, turns around, and talks"*) collapse into visual averaging or warping.
- **Biomechanical Precision:** Replace subjective adverbs with physical mechanics:
  - *Do not write:* "walks angrily"
  - *Write:* "strides aggressively forward, chest squared, fists clenched at sides, heels slamming hard into the concrete"

### Layer 4: Environment & Lighting Architecture (The World)
- **Spatial Depth:** Define foreground, midground, and background elements to give the 3D diffusion engine clear planes.
- **Motivated Lighting Rigs:** State light source, direction, temperature, and shadow falloff:
  - *Hard Key Light:* Sharp shadows, high contrast (chiaroscuro).
  - *Soft Wrap Lighting:* Diffused beauty or natural overcast light.
  - *Rim / Backlighting:* Creates separation between subject and dark background.
  - *Practicals:* Visible in-scene lights (table lamps, neon signage, candles).

### Layer 5: Camera Movement (The Optics)
- **The Single Camera Verb Rule:** Never combine competing movements (e.g., *"zoom in while dollying back and panning left"*). Lock onto one clean, motivated cinematic movement:
  - `Slow camera push-in / forward optical glide` (intensifies drama/tension)
  - `Slow camera pull-out / backward optical glide` (reveals context/isolation)
  - `Lateral tracking glide` (travels alongside motion)
  - `Locked-off static framing` (stable; essential for dialogue clarity)
  - `Handheld follow` (documentary realism, subtle jitter)
  - `Slow orbital arc` (rotates around focal point)

### Layer 6: Audio & Dialogue Directives (The Acoustic Soundscape)
- **Dedicated Prefix:** Group all audio commands under a trailing `Audio:` descriptor.
- **Acoustic Hierarchy:**
  1. *Foley:* Immediate physical interactions (footfalls, fabric rustle, glass clinking).
  2. *Ambience:* Environmental acoustic space (room tone, distant traffic, wind howling).
  3. *Negative Audio:* Explicitly silence unwanted tracks (`no background music`).

---

## 4. Prompt Word Economy & The Sweet Spot

```
[ Under-Prompting ]              [ THE SWEET SPOT ]                 [ Over-Prompting ]
  < 40 Words                       100 - 150 Words                     > 200 Words
• Flat lighting                 • Precise spatial layout            • Token attention dilution
• Stock footage aesthetic       • Deterministic physics             • Hallucinations & morphing
• Random physics & camera       • Balanced optical motion           • Competing instructions
• Unpredictable styling         • Synchronized audio cues           • Ignored trailing tokens
```

---

## 5. The Decoupling Principle: Configuration vs. Prompt Text

A common anti-pattern in unofficial prompt guides is appending `"Aspect ratio: 16:9, Resolution: 1080p, Frame rate: 24fps, Duration: 8s"` inside the prompt string. 

In official Google systems (Google Flow, Gemini API, and Vertex AI), **diffusion models do not parse resolution, aspect ratio, or duration from text tokens**:
- **Configuration Channel (`config` / UI Dropdowns):** Governs physical pixel matrix allocation (`16:9` / `9:16`), spatial resolution (`720p` / `1080p` / `4k`), temporal clip bounds (`4s` / `6s` / `8s` / `10s`), reference image inputs (`reference_images`), and keyframe endpoints (`first_frame`, `last_frame`).
- **Prompt Text Channel:** Must remain **100% pure cinematic direction** (Framing + Subject + Action + Setting + Style + Camera Kinematics + Audio). 

Appending technical specs inside the text string dilutes the token attention budget, wastes words, and risks the model attempting to render on-screen text or artificial letterboxing.
