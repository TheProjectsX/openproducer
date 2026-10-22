# Supplementary Research: Community Tricks, Audio Syntax & Failure Modes

## 1. Community-Tested Prompt Engineering Rules

### Rule 1: Front-Load Anchors (Word Order Weighting)
- **Mechanism:** Veo 3 / 3.1 weights initial tokens significantly more heavily than trailing descriptions.
- **Rule:** Never bury the subject or framing at the end of a long narrative paragraph.
- **Formula:**
  `[SHOT TYPE / FRAMING] + [SUBJECT & ACTION] + [ENVIRONMENT / CONTEXT] + [LIGHTING & ATMOSPHERE] + [CAMERA MOVEMENT] + [AUDIO CUES]`
- **Example:**
  `Medium shot, cyberpunk hacker typing frantically, neon reflections on face, blade runner aesthetic, slow push in, Audio: mechanical keyboard clicks, distant sirens.`

### Rule 2: The One Action Rule (Temporal Simplicity)
- **Failure Mode:** Combining compound sequential actions in a single 4–8s prompt (e.g., *"A man stands up, walks across the room, opens the refrigerator, and drinks milk"*) causes physical morphing, temporal averaging, and visual chaos.
- **Rule:** Restrict each prompt to **one primary physical action or state transition**.
- **Execution:** Replace vague emotive adverbs with specific anatomical/biomechanical descriptions:
  - *Bad:* "walking sadly"
  - *Good:* "shuffling forward with hunched shoulders, head cast downward"

### Rule 3: Single Camera Verb Rule (Spatial Consistency)
- **Failure Mode:** Stacking conflicting optical motions (e.g., *"pan right while zooming out during a fast dolly"*) confuses the 3D spatial field, causing perspective distortion and warping.
- **Rule:** Use **one clear, industry-standard camera verb per shot**:
  - `Slow push-in` / `Dolly in` (intimacy, escalating tension)
  - `Static frame` (objective framing, dialogue clarity)
  - `Medium tracking shot` / `Handheld follow` (documentary immediacy)
  - `Slow orbital arc` (epic subject focus)

### Rule 4: Technical Cinematographic Anchors
- Vague buzzwords like "cinematic", "photorealistic", "ultra 8k" dilute token attention without specifying tangible visual parameters.
- High-yield cinematographic anchors:
  - **Focal Lengths & Lenses:** `24mm wide angle` (environmental scale), `50mm prime` (natural human perspective), `85mm anamorphic with oval bokeh` (portrait isolation), `macro probe lens` (extreme close-up texture).
  - **Lighting Rigs:** `Motivated practical lighting`, `soft diffused wrap light`, `hard rim lighting with deep shadows`, `high-contrast chiaroscuro`, `golden hour volumetric haze`.
  - **Film Stock / Color Grading:** `Shot on 35mm Kodak Vision3 5219`, `bleach bypass color grade`, `Technicolor 3-strip aesthetic`.

---

## 2. Audio & Dialogue Syntax Architecture

### Syntax Blueprint
$$\text{[Shot/Framing]} + \text{[Subject & Context]} + \text{[Action]} + \text{[Attribution Verb, Delivery Modifier: "Spoken Dialogue"]} + \text{[Audio: SFX / Ambience / Negative Specs]}$$

### Critical Dialogue Rules
1. **Quotation Marks (`""`) Mandatory:** Exact speech text must always be wrapped in quotes.
2. **Speech Attribution Verbs:** Precede quotes with direct verbs (`says:`, `asks:`, `whispers:`, `shouts:`, `mumbles:`). A colon (`:`) before quotes prevents subtitle hallucination.
3. **Emotional Delivery Modifiers:** Place delivery tone directly before the quote to force synchronized facial kinematics:
   - `She says, calmly and measuredly: "I am ready."`
   - `He asks, trembling with anxiety: "Did you hear that?"`
4. **Length Constraint:** Dialogue must be limited to 1–2 short sentences (3–6 seconds speaking time) to prevent lip-sync drift within an 8-second window.
5. **No CAPS LOCK in Spoken Quotes:** Veo spells capitalized words out letter by letter (e.g., `"NASA"` is pronounced "N-A-S-A"; `"STOP"` is pronounced "S-T-O-P"). Write as standard sentence case: `"Stop"`.

### Dedicated `Audio:` Block Structure
- Bundle background layers at the prompt's conclusion under an explicit `Audio:` prefix.
- Enforce negative audio constraints inside this block to prevent AI-generated generic orchestral swells:
  - `Audio: steady rain on asphalt, distant thunder, soft streetlamp hum, clear dialogue with no background music.`

### Multi-Speaker Dialogue Strategy
- Single-speaker lip-sync success rate is ~80%.
- Two-speaker simultaneous or alternating dialogue success rate drops to ~40% (risk of merged voices, out-of-sync mouths).
- **Professional Workaround:** Break multi-speaker conversations into classic Hollywood **Shot / Reverse-Shot** coverage:
  - Clip 1: Over-the-shoulder medium close-up of Character A speaking line 1.
  - Clip 2: Over-the-shoulder medium close-up of Character B responding with line 2.
  - Assemble in Scene Builder timeline.

---

## 3. Known Artifacts, Bugs & Workarounds

| Issue / Failure Mode | Manifestation | Root Cause | Workaround |
|---|---|---|---|
| **Pure White Background Glitch** | Moving diagonal black/grey lines and codec compression stripes across white space | High-frequency luminance clipping in diffusion latent space | Prompt for *"soft off-white"*, *"light cream gradient"*, or *"neutral light grey seamless cyc studio"* instead of pure white. |
| **2D Animation Flicker (Veo 3.1)** | Halos, doubled line-art, jittering linework | 3.1 is over-indexed on photorealistic physical light transport | Use Veo 3 (base) or add explicit animation constraints: *"cel shaded, flat 2D color fills, clean bold ink outlines, locked 24fps 2D anime style"*. |
| **Audio-Safety False Positives** | API returns *"We encountered an issue with the audio for your prompt"* on benign narrative scenes | Sensitive heuristic filters flagging words like "shouts", "crowd panics", "siren" | Soften audio descriptors: replace "police siren" with "ambient emergency vehicle lights"; replace "shouts" with "firmly states". |
| **Constraint Suffixes** | Accidental aspect ratio or quality degradation | Default parameter fallbacks in web UIs | Explicitly append technical tokens at prompt tail: `16:9, 1080p, 24fps, 8s`. |
| **Visual Morphing on Extensions** | Doors, clothing, or anatomy warping during clip extensions | Lack of boundary constraints | Use Start Frame + End Frame interpolation rather than open-ended video extension. |
| **Watermark Bleed** | Erratic "veo" watermark appearing in bottom-right corner | Server cache / tier state desync | Re-render clip or apply subtle crop (1-2%) in post-processing. |
