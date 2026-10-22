# Discussion Log 05: Google Flow Prompt Translation Mechanics

**Date:** October 22, 2026  
**Topic:** How the Agent Translates Human Ideas into Google Flow's Exact Mental Model  
**Participants:** Creator & AI Assistant

---

## 1. How Google Flow Actually "Sees" and Interprets Inputs

Google Flow is not a standard text LLM like ChatGPT; it is a **multimodal diffusion & transformer orchestration system** running Veo 3.1 and Imagen 4.

Flow understands video generation through two synchronized channels:
1. **The Visual Channel ("Ingredients"):** Up to 3 reference images (Character, Prop, Style) that lock visual geometry in latent space before text is parsed.
2. **The Prompt Channel (Veo 3.1 Text Latents):** An asymmetric diffusion cross-attention window where **word order directly dictates physical rendering priority**.

---

## 2. The Algorithmic Token Attention Hierarchy in Veo 3.1

When Google Flow reads a prompt, it does **not** treat all words equally:

```
[ TOKENS 1 – 30 ]  ──► HIGHEST ATTENTION WEIGHT (Anchors 3D Geometry & Viewport)
                       • Shot Framing (Medium Close-Up, Wide Shot)
                       • Primary Subject Anchor (Character identity, face, wardrobe)

[ TOKENS 31 – 80 ] ──► SECONDARY ATTENTION WEIGHT (Directs Physical Motion)
                       • Single Biomechanical Action (what the subject is physically doing)
                       • Motivated Lighting Vectors (key light, practical sources)

[ TOKENS 81 – 130 ]──► ATMOSPHERIC & OPTICAL WEIGHT (Renders Texture & Camera)
                       • Visual Style Anchor (35mm film, anamorphic, cel anime, 3D CGI)
                       • Single Camera Movement (slow push-in, lateral track)

[ TRAILING BLOCK ] ──► DEDICATED AUDIO STREAM (Dual-Stream Synthesis)
                       • `Audio:` prefix triggering native audiovisual waveform generator
                       • Foley + Ambience + Negative Music Suppression (`no background music`)

[ CONSTRAINTS ]    ──► API BOUNDARY ENFORCEMENT
                       • Aspect ratio, Resolution, Frame rate, Duration (16:9, 1080p, 24fps, Xs)
```

---

## 3. The 6 Rules of Translation (From Human Speech to Flow Architecture)

| What the Creator Says | The Translation Rule for Flow | Why Flow Needs This |
|---|---|---|
| *"A detective looking at his watch in a rainy street."* | **Rule 1: Front-Load the Viewport & Anchor.**<br>`Medium close-up shot of Detective Kaelen, a 35-year-old tired investigator in a wet distressed trench coat...` | If setting comes first, Flow spends its spatial tokens drawing buildings and renders the detective as a blurry afterthought. |
| *"He walks to the car, looks around, opens the door, and sits down."* | **Rule 2: The One Action Rule.**<br>Strip to **one** continuous action per 4–8s clip: `reaches out his gloved hand and pulls open the rain-streaked car door.` | Compounding actions cause Flow to average movements together, causing limbs to warp or phase through objects. |
| *"Make the camera zoom in while turning and following him."* | **Rule 3: Single Camera Verb.**<br>Choose **one** motivated move: `Slow camera push-in.` | Competing camera verbs (zoom + pan + tilt) cause 3D perspective tearing and horizon distortion. |
| *"He shouts: STOP!"* | **Rule 4: Dialogue Formatting & Sentence Case.**<br>`He shouts, desperate and breathless: "Stop."` | 1. Mandatory colon prevents burned-in subtitles.<br>2. Sentence case prevents Veo from spelling words letter-by-letter ("S-T-O-P"). |
| *"Dark and moody with cool neon lights."* | **Rule 5: Motivated Practicals & Style Anchor.**<br>`Illuminated by practical cyan and magenta neon signs reflecting on wet asphalt, shot on 35mm film stock, organic fine grain.` | Tells Flow's light transport engine exactly where light bounces from (practicals) rather than flat ambient light. |
| *"Add city sounds."* | **Rule 6: Dedicated Audio Layering.**<br>`Audio: distant vehicle sirens, rain drumming on metal, no background music.` | Explicitly silencing music prevents Flow from defaulting to unwanted generic cinematic orchestral scores. |

---

## 4. End-to-End Translation Walkthrough

### What the Human Creator Says:
> *"I want a scene where our female astronaut, Maya, is sitting alone in the spaceship mess hall drinking coffee, looking out at the stars, feeling lonely. Make it look like a real cinema movie, calm and quiet."*

### How the Agent Structures It for Google Flow:

```text
Medium shot of Maya, a 32-year-old astronaut with short dark hair and tired brown eyes, wearing a dark navy utility flight suit with white mission patches, holding a brushed steel thermal mug with both hands. She sits beside an elliptical observation window in the dimly lit spaceship mess hall, gazing pensively out at distant glittering starfields. Soft warm tungsten downlight on the table, cold blue starlight illuminating the side of her cheek. Shot on 35mm film stock, organic fine grain, shallow depth of field. Static eye-level camera on locked tripod. Audio: low pressurized life-support hum, faint metal mug clink on table, soft breath exhale, zero background music. 16:9, 1080p, 24fps, 8s.
```

### Why this succeeds in Flow:
1. **Front-Loaded:** Viewport (`Medium shot`) and Subject (`Maya, 32-year-old...`) in first 25 words.
2. **Motivated Lighting:** Dual light sources defined (warm table downlight vs. cold blue starlight).
3. **One Action:** Holding mug and gazing out window.
4. **Clean Camera:** Locked tripod (zero jitter).
5. **Acoustic Design:** Life support hum + foley clink + music suppression.
6. **Word Economy:** Exactly 124 words (in the optimal 100–150 word sweet spot).
