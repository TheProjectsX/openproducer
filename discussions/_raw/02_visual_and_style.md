# Discussion Log: Visual & Style Domain (The Visual DNA)

**Status:** Consolidated Visual Domain Discussion Record  
**Final Specification:** [`../production_framework/specs/01_visual_spec.md`](../production_framework/specs/01_visual_spec.md)

---

## 1. Why Theme & Style is the Root Foundation

Before defining characters or shots, a production must establish its **Visual DNA**. Without a locked style baseline, projects suffer from **Style Drift** (characters look photorealistic, sceneries look painterly, and video clips look like 3D video games).

---

## 2. The `visual/` Domain & "Regular Person" Translation Bridge

Most creators are not camera technicians. Asking everyday creators for focal lengths, film stocks, or lighting ratios causes friction.

### The Dual-Layer Translation Bridge:
- **Creator speaks naturally:** *"I want a bleak, rainy post-war scene with broken buildings and smoke, dramatic and traumatic."*
- **Agent confirms in plain English:** *"Got it! We'll style this as a gritty, desaturated 35mm film look—cold overcast daylight cutting through smoke, muted colors, and solemn realism."*
- **Agent writes under the hood to `visual/`:**
  - `visual/style_summary.md` (for the human to review).
  - `visual/palette_and_mood.md` (color values and contrast profiles).
  - `visual/technical_anchor.md` (the locked Master Style Anchor injected into Flow).

---

## 3. Key Technical Discoveries & Rules

### A. The Token Attention Hierarchy in Veo 3.1
Veo 3.1 parses prompts with an asymmetric attention curve:
- **Tokens 1–30 (Highest Weight):** Viewport Framing & Primary Subject Anchor.
- **Tokens 31–80 (Kinematic Weight):** Single Biomechanical Action & Motivated Lighting.
- **Tokens 81–130 (Style & Camera):** Master Style Anchor & Single Camera Verb.
- **Trailing Block:** Dedicated `Audio:` soundscape (`foley, ambience, no background music`).
- **Word Economy:** Strictly 100–150 words.

### B. The "Camera Equipment Hallucination Trap" (Real-World Finding)
- **The Glitch:** Testing the phrase *"Static camera on locked tripod"* caused Gemini/Veo to literally render a physical camera on a tripod inside the scene pointed at the actor!
- **The Rule:** **Strictly ban physical equipment nouns** (`tripod`, `dolly track`, `crane rig`). Use **pure perspective and kinematic descriptors** (`Locked-off eye-level framing, completely static shot with zero camera movement`, `Slow push-in toward subject`).

### C. Decoupling: Configuration Settings vs. Prompt Text
- **The Discovery:** Google Flow, Veo 3.1, and the Gemini API control `aspect_ratio`, `resolution`, `duration_seconds`, and reference images strictly through the **`config` object or UI dropdowns**, NOT via prompt text tokens.
- **The Rule:** Never write `"16:9, 1080p, 24fps, 8s"` inside the prompt string. It wastes token attention and risks visual glitches. Prompts remain 100% pure creative direction.

### D. Photo-First Validation Protocol
- Direct video generation costs heavy credits and takes 30–90 seconds per try.
- All initial prompt testing, lighting checks, and style alignment are validated using **Still Photo Generation (Imagen 4 / Nano Banana)**. Still photos are fast, cheap, and become the exact **"Ingredients"** uploaded into Flow.

---

## 4. End-to-End Simulation: Post-War Aftermath

- **Input Vibe:** *"Aftermath of a war fight in a place. Buildings broken, soldiers injured, crows flying, smoke, rubbles. Give this a semi dramatic effect."*
- **Synthesized Master Style Anchor:**
  > `"Shot on 35mm film stock, organic fine grain, bleach bypass desaturated color grading, muted earth and rubble tones, soft overcast daylight diffused through heavy grey smoke, shallow depth of field, solemn cinematic realism."`
- **Resulting Pure Creative Prompt (136 words):**
  > `Wide establishing tracking shot of a shattered urban street littered with collapsed concrete buildings, twisted rebar, and smoking rubble piles. In the midground, a dazed, exhausted soldier with torn camouflage uniform and ash-smudged face sits motionless against a scorched brick wall, staring into the distance. Black crows circle slowly overhead against a bleak, overcast sky as thick plumes of grey smoke drift through the hollowed-out window frames. Shot on 35mm film stock, organic fine grain, bleach bypass desaturated color grading, muted earth and rubble tones, soft overcast daylight diffused through heavy grey smoke, shallow depth of field, solemn cinematic realism. Slow, solemn lateral tracking glide from left to right. Audio: distant smoldering embers crackle, mournful crow caws echoing in the cold air, low hollow wind through broken ruins, faint labored breathing, no background music.`
