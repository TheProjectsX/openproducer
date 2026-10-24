# Discussion 41: Stick Figure Fingerless Vector DNA & Gemini 3.8 Flash TTS Syntax

**Date:** 2026-10-24  
**Context:** Production of viral stick figure horror short *"The Phone Call at 2:47 AM"*.  
**Participants:** Creator & Antigravity AI Video Production Framework  

---

## 1. Executive Summary & New Architectural Findings

During the transition into final production execution for viral stick figure horror storytelling, four critical empirical discoveries were made, analyzed, and codified into the framework:

1. **The "Hand & Feet Flesh Mutancy Glitch" in Diffusion Models & The Strict Fingerless Vector Standard:**  
   When diffusion models (Imagen 4, Midjourney, Veo 3.1) are prompted with stick figures and mention "hands", "fingers", or "feet", they attempt to graft biological human anatomy onto 2D vector stick lines, creating deformed 6-finger fleshy clusters, knobby arthritic joints, or mutated toes.
2. **The "Light-Reveal Chiaroscuro" Canvas:**  
   Moving away from generic stark black voids or flat whiteboards to a **warm cream / off-white paper canvas (`#F8F6F0`)** dynamically revealed by directional light cones (smartphone screens, streetlamps), falling off into deep atmospheric pitch shadow (`#0A0B0E`) in unlit corners.
3. **The "White-Filled Head + Black Contour" Standard:**  
   Stick figures possess pencil-thin black vector line limbs matching hands and feet, with circular heads **filled with solid opaque white (`#FFFFFF`)** and outlined with a **clean black vector contour (`#0F172A`)**, with zero facial features.
4. **Google AI Studio Gemini 3.8 Flash TTS Syntax & The "Bracket Reading Bug":**  
   Gemini 3.8 Flash TTS treats square brackets `[...]` as verbatim transcript text, reading editorial notes like `[1.5s silence]`, `[beat]`, or `[whispering]` out loud. Official inline performance tags require **Angle Brackets (`< >`)** (e.g. `<short pause>`, `<whisper>`, `<long pause>`, `<sigh>`).

---

## 2. Empirical Analysis: The Hand/Feet Flesh Mutancy Glitch

### 2.1 The Failure Mode
Generative diffusion models possess massive latent training data on human limbs, hands, and feet. When a prompt requests a stick figure:
* If the prompt mentions *"reaching forward with slender hand"* or *"typing fingers"*, the model's high-attention tokens for human anatomy trigger.
* **The Result:** The model renders a 2D black stick arm that abruptly ends in a realistic, wrinkled, 5-to-6 fingered fleshy human hand, or swollen distorted knots.
* Feet suffer the same fate, sprouting realistic human toes or lumpy sneaker shapes on single-line legs.

### 2.2 The Viral Animation Standard & The Framework Fix
In authentic viral stick figure animations (*Alan Becker*, *Casually Explained*, *GradeAUnderA*, and trending horror shorts):
* **Individual fingers and toes do not exist.**
* Limbs are pure, single, continuous black vector strokes that **simply terminate in a smooth rounded line cap (`stroke-linecap: round`)**.
* When holding an object (like a smartphone), the limb merely touches the prop or terminates in a simple, solid round circle with zero digits.
* **Mandatory Prompt Guardrail (Codified into Framework):**
  > `Pure unbroken 2D vector line limbs terminating in smooth rounded line-cap ends. Strictly zero individual fingers, zero human hands, zero toes, zero knuckles, and zero fleshy anatomical details. Uniform stroke thickness from shoulder to tip.`

---

## 3. The Light-Reveal Cream Canvas Aesthetic

### 3.1 The Problem with Extreme Monochromes
* Pure `#000000` black void can feel flat and visually empty on mobile feeds.
* Pure `#FFFFFF` whiteboard feels corporate, educational, or like a business presentation.

### 3.2 The Dynamic Chiaroscuro Solution
* **Base Canvas:** Warm cream / off-white paper texture (`#F8F6F0` / `#F4F1EA`).
* **Motivated Light Vectors:** In night/horror scenes, the room is enveloped in deep pitch shadow (`#0A0B0E`). Light sources (such as a smartphone screen displaying an incoming call) act as dramatic spotlights, projecting a clean volumetric light cone that reveals the warm cream canvas and black architectural lines.
* **Subject Head Geometry:** The circular head is filled with solid white (`#FFFFFF`) and contoured with a clean black vector outline (`#0F172A`), providing sharp contrast and visibility whether inside the light cone or against the dark shadow.

---

## 4. Google AI Studio Gemini 3.8 Flash TTS Mechanics

### 4.1 The Square Bracket Reading Bug
In Google AI Studio and the Gemini 3.8 TTS API:
* Square brackets `[...]` are **NOT parsed as SSML or metadata**.
* If a creator pastes:
  ```text
  It was 2:47 AM. [1.5s pause]
  Rakib froze. [tense whisper]
  ```
  The Gemini model will literally say aloud: *"It was 2:47 AM. One point five second pause. Rakib froze. Tense whisper."*
* Section headers like `[INTRO — 0:00 to 0:38]` or `[SCENE 1]` will also be read aloud verbatim.

### 4.2 The Official Angle Bracket Syntax (`< >`)
Gemini 3.8 Flash TTS officially recognizes angle brackets for point-in-time performance and non-speech vocalizations:
* `<short pause>`: Inserts a clean ~0.5s–1.0s dramatic pause without speaking.
* `<long pause>`: Inserts a ~1.5s–2.0s heavy atmospheric pause.
* `<whisper>` ... `</whisper>`: Drops voice into a cracked, low whisper.
* `<sigh>`, `<breath>`, `<gasp>`, `<cough>`: Generates natural organic non-verbal sounds.
* **Punctuation Pacing:** Standard ellipses `...` and em-dashes `—` naturally generate organic dramatic pauses without any tag overhead.

### 4.3 Clean Studio Operational Protocol
1. **Verbatim Text Only:** Paste only clean narrative words and `<...>` tags into the AI Studio prompt box.
2. **System Instructions:** Direct the narrator's persona and overall tone via the AI Studio system instructions side-panel:
   > *"You are a chilling, calm supernatural horror narrator. Speak with a measured, suspenseful cadence, deep atmospheric gravity, and creeping dread. Execute all inline tags dynamically. Never read technical tags or punctuation aloud."*

---

## 5. Architectural Pipeline Standard: Base Image $\rightarrow$ Starting Frame $\rightarrow$ I2V

To eliminate character drift, limb warping, and inconsistent line weights across cuts, the production desk codified a three-tier pipeline:

```
[TIER 1: MASTER BASE REFERENCE]
base_image_prompt.txt (Ingredient #1)
• Locks universal fingerless vector DNA, white-filled head, cream canvas
               │
               ▼
[TIER 2: CLIP STARTING FRAMES]
clips/clip_XX/image_prompt.txt
• Generated by conditioning on Tier 1
• Establishes exact scene geometry, perspective, and lighting for that beat
               │
               ▼
[TIER 3: IMAGE-TO-VIDEO GENERATION]
clips/clip_XX/video_prompt.txt
• Starts with: "Starting directly from the initial image..."
• Budgeted for strictly 1 micro-motion and 1 camera vector (Single-Motion Law)
• Pure background score & foley audio bed (zero dialogue tokens)
```

---

## 6. Slicing Compression: The 60-Second Viral Retention Rule

* **The Problem:** A 3-minute 45-second timeline with multi-second dead-air pauses causes massive viewer drop-off on short-form platforms (Shorts, Reels, TikTok).
* **The Rule:** Viral narrative horror plots must be compressed to **60–75 seconds** (~130–140 words at ~2.2 words/sec) with continuous forward momentum and zero dead air.
* **Implementation:** The 26-clip sequence was condensed into **10 high-impact micro-clips** (6s–12s each), preserving 100% of the narrative beats while maximizing algorithmic retention.
