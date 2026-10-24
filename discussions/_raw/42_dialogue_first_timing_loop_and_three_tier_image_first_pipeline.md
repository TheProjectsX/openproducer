# Discussion 42: Dialogue-First Timing Loop & 3-Tier Image-First Pipeline

**Date:** 2026-10-24  
**Context:** Director's Cut & Assembly Engine (Phase 6 Architecture Expansion).  
**Participants:** Creator & Antigravity AI Video Production Framework  

---

## 1. Executive Summary & Production Pain Points

During real-world empirical production across *The 2:17 AM Dispatch*, *The 9-5 Rat Race*, and *The Phone Call at 2:47 AM*, two fundamental flaws of simultaneous prompt generation were uncovered and addressed:

1. **The Audio-Visual Desynchronization Trap (Theoretical Slicing vs. Real Speech Cadence):**  
   Generating video clip prompts and external dialogue audio simultaneously based on theoretical pacing (~2.2 words/second) leads to timeline desynchronization. Emotional delivery, dramatic pauses (`<whisper>`, `<long pause>`), and non-verbal pacing vary dynamically in synthesized speech (Gemini 3.8 Flash TTS, ElevenLabs). Slicing video before knowing actual audio duration results in either dead air or clipped visual beats.
2. **Visual Inconsistency in Direct Text-to-Video Generation:**  
   Generating multi-clip sequences directly from text prompts causes character drift, line-weight mutancy, shifting color grading, and unpredictable prop layouts across cuts.

To resolve these, two foundational architectural standards were established and added to the Director's Cut engine:
- **Standard A: Dialogue-First Temporal Slicing (Audio Timing Feedback Loop)**
- **Standard B: The 3-Tier Image-First Production Pipeline**

---

## 2. Standard A: Dialogue-First Temporal Slicing (Audio Timing Loop)

### 2.1 The Two Workflow Pathways

```
                          [CREATOR INTAKE]
                                 │
             AI asks: "Do you want Dialogue-First (Recommended) 
                       or Both Prompts Together?"
                                 │
                ┌────────────────┴────────────────┐
                ▼                                 ▼
      [DEFAULT: DIALOGUE FIRST]         [OPTIONAL: BOTH TOGETHER]
      1. AI generates Dialogue/Narrator  1. AI outputs both dialogue and
         Script with dynamic delivery       video prompts simultaneously
         tags (<whisper>, <pause>).         using theoretical ~2.2 wps.
      2. Creator generates audio in     2. Useful for quick concepting
         Gemini TTS / ElevenLabs.          or silent/music-only projects.
      3. Creator inputs real timing /
         audio clip durations.
      4. AI slices video clips to
         match REAL audio timing!
```

### 2.2 Creator Interactivity Requirement
If the creator does not explicitly specify a generation pathway, the Agent **MUST explicitly ask** whether they want:
1. **Dialogue-First (Recommended):** Generate the audio/narrator script first, allow the creator to produce the voice track and provide actual timestamps/durations, then slice video prompts with frame-accurate timing.
2. **Both Together:** Generate dialogue and video prompts simultaneously based on estimated pacing (~2.2 words/sec).

---

## 3. Standard B: The 3-Tier Image-First Visual Production Pipeline

To guarantee 100% visual consistency and eliminate hallucinated mutations across multi-clip sequences, video production adopts a 3-tier hierarchical structure:

```
[TIER 1: MASTER BASE REFERENCE] ─── base_image_prompt.txt (Ingredient #1)
• Generated FIRST to establish master visual DNA:
  - Master style paradigm, color palette, lighting vectors, canvas texture
  - Subject/character biometrics (e.g. fingerless vector lines, white-filled head)
  - Architectural grounding and negative prompt constraints
       │
       ▼
[TIER 2: CLIP KEYFRAME STARTING PLATES] ─── clips/clip_XX/image_prompt.txt
• Generated for each clip, visually conditioned on Tier 1.
• Locks exact camera perspective, composition, prop layout, and subject poses for that specific beat.
       │
       ▼
[TIER 3: IMAGE-TO-VIDEO MOTION PROMPTS] ─── clips/clip_XX/video_prompt.txt
• Fed into Veo 3.1 with the Tier 2 image as the input starting frame seed.
• Prompt opens with: "Starting directly from the initial image..."
• Budgeted strictly for 1 unhurried micro-motion and 1 camera vector (Single-Motion Law).
• Audio block focuses on diegetic foley and atmospheric score (zero dialogue tokens when external audio is used).
```

---

## 4. The Three Dialogue Modalities & TTS Syntax Standards

The framework formally recognizes three distinct dialogue production modalities:

| Modality | Target Engine | Script File Contract | In-Prompt Video Cleansing | Syntax Standard |
|---|---|---|---|---|
| **Mode 1: Native In-Clip Flow** | Google Flow (Veo 3.1) | Embedded in clip prompt | Quotes included in prompt | Biomechanical anti-muppet restraints; Closed-Lip Listener rule if off-screen |
| **Mode 2: Multi-Speaker Character Dubbing** | ElevenLabs | `dialogue_scripts.md` (Cue Sheet) | Dialogue quotes stripped from video prompt | Pre-roll / post-roll silence buffers; delivery modifiers |
| **Mode 3: Continuous Narrator Voiceover** | Google AI Studio (Gemini 3.8 Flash TTS) | `narrator_script.md` | Video prompt is pure foley/score (zero speech tokens) | Strict Angle Bracket syntax (`<short pause>`, `<whisper>`); zero square brackets (`[...]`) in transcript |

### 4.1 Gemini 3.8 Flash TTS Bracket Reading Bug Fix
- **The Bug:** Gemini 3.8 Flash TTS reads square brackets `[...]` aloud as literal words (e.g. `[1.5s pause]` becomes *"One point five second pause"*).
- **The Rule:** All inline performance cues must use Angle Brackets (`<short pause>`, `<long pause>`, `<whisper>...</whisper>`, `<gasp>`, `<sigh>`).
- **Narrator Persona:** Directed strictly via the AI Studio System Instructions side-panel, never embedded into the transcript text.
