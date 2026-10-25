# Discussion 47: Gemini TTS Trailing Tag Glitch, Anti-Dead-Air Law & Stick Personality DNA

**Date:** 2026-10-25  
**Topic:** Critical Speech Synthesis Glitches, Viewer Retention Pacing & Character Silhouette DNA  
**Specification References:** [`production_framework/specs/05_directors_cut_assembly_spec.md`](../../production_framework/specs/05_directors_cut_assembly_spec.md), [`production_framework/styles/vector_stick_figure.md`](../../production_framework/styles/vector_stick_figure.md)

---

## 1. Executive Summary: The 4 Core Directorial Learnings

During empirical testing and iteration across Phase 06 production workflows, four critical discoveries were established and permanently integrated into the framework:

---

### Learning 1: The Dialogue-First Hard Pause Rule
* **The Glitch:** When the creator selects the **Dialogue/Audio-First Timing Loop**, compiling video clips or writing video prompts based on theoretical speech velocity (~2.0–2.2 words/sec) breaks the workflow contract. It reverts the process to "Both Together", generating clips that inevitably desynchronize when real human speech or TTS timing deviates from the math.
* **The Directorial Mandate:** In Dialogue-First mode, the Agent **MUST HARD PAUSE** after delivering Stage 1 (the TTS-formatted narrator script and Tier 1 master reference plate). Slicing video clips, creating clip directories, or writing video prompts is **strictly prohibited** until the creator returns with the actual recorded audio durations or beat timestamps.

---

### Learning 2: The Google AI Studio Gemini 3.8 Flash TTS "Trailing Tag Tokenizer Glitch"
* **The Glitch:** Appending point-in-time performance or pause tags directly to the tail of a sentence line (e.g. `calling the owner's name. <long pause>`) causes the model's tokenizer to group the tag with the sentence text, resulting in the TTS model literally reading aloud: *"calling the owner's name. Long pause."*
* **The Technical Fix (Isolated Line-Break Rule):**
  1. Sentences must terminate cleanly with standard punctuation followed by an immediate newline (`.\n`).
  2. Any pause or non-verbal tag (`<short pause>`, `<whisper>`) must occupy its own standalone line.
  3. Codified into Pre-Flight Linter **L-14**.

---

### Learning 3: The "Anti-Dead-Air Law" (Retention Pacing vs. Bloated Pauses)
* **The Failure Mode:** Over-tagging scripts with artificial `<long pause>` tags (1.5s–2.0s) between every sentence destroys narrative momentum, creating bloated dead air that causes viewers to drop off and scroll away in short-form/viral feeds.
* **The Retention Fix:**
  1. Standard conversational punctuation (commas, periods, paragraph line-breaks) already provides natural, organic ~0.3s–0.5s breathing buffers in modern neural TTS without tags.
  2. Scripts for **Dynamic Sync** pacing must flow with natural narrative momentum (~135–145 words per minute / ~2.2–2.4 words per second), purging artificial `<long pause>` tags entirely.
  3. Pause tags are strictly reserved for solitary, high-impact climactic moments (e.g. a single `<short pause>` immediately preceding a horrifying final whisper).

---

### Learning 4: Stick Figure Personality & Period Silhouette DNA
* **The Principle:** Even within the strict constraints of the **Fingerless Vector Standard** (`stroke-linecap: round`, zero fingers, blank circular white head `#FFFFFF`), stick figures do not need to be generic featureless stickmen.
* **Silhouette Accessories & Wardrobe:**
  1. *Headwear & Accessories:* Distinctive historical/professional silhouettes (e.g. Soviet Ushanka trapper hat with ear-flaps, oversized bakelite radio headphones, thin wire-rim round spectacles) resting cleanly on the circular head contour.
  2. *Outerwear Contours:* Minimalist black vector outerwear contours (e.g. heavy wool coat with upturned shearling collar and button line, trenchcoat flaps, utility belts) draped over the spine line to convey cold-weather bulk or professional uniform.
  3. *Posture & Props:* Disciplined, studious posture, holding props (pencil, flashlight) with rounded limb tips resting against or grasping the object firmly from Frame 1 to Frame End.
