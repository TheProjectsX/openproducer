# Narrator Script: The Breath at 2:00 AM

**Production:** `the_breath_at_2am`  
**Medium:** Vector Stick Figure (`minimalist_noir`)  
**Pacing Profile:** Dynamic Sync (4s–6s cuts, ~2.2 words/sec external speech velocity)  
**Total Word Count:** 108 words  
**Estimated Spoken Runtime:** ~52–58 seconds (including strategic pauses and silence buffers)  
**Protocol Stage:** Stage 1 (Dialogue-First Timing Loop)

---

## 1. Gemini 3.8 Flash TTS Configuration & System Prompt

To generate this voiceover in **Google AI Studio (Gemini 3.8 Flash TTS)**:
- **Model:** Gemini 3.8 Flash
- **Voice Preset:** `Charon` (Deep, atmospheric dread) or `Puck` (Intimate, eerie hush)
- **Paste the following into "System Instructions":**

```text
You are a chilling, intimate narrator telling a terrifying psychological horror story in the second person. Your voice is hushed, grounded, and low in pitch, speaking directly into the listener's ear at 2:00 AM. Maintain an unhurried, eerie, conversational cadence. Do not use melodramatic or cartoonish spooky voices. Use natural micro-breaths at commas and periods. When encountering <whisper> tags, drop your volume into a dry, breathless whisper. Observe all pause tags as genuine, dead-silent beats.
```

---

## 2. Gemini 3.8 Flash TTS Master Script (Angle Bracket `< >` Syntax)

> **Linter L-14 Compliance Notice:** Pause tags are placed on dedicated isolated line-breaks (`.\n<short pause>\n`) to prevent the Gemini tokenizer bug where trailing tags attached directly to punctuation are read aloud.

```text
You are sitting in the dark of your living room at 2:00 AM, the only illumination coming from the muted blue glow of your television screen.

You live alone. The apartment is dead quiet.

Your cat, perched on the back of the sofa, suddenly sits bolt upright. Its pupils dilate into black saucers. It isn’t looking at you, the window, or the hallway.

Its head is tilted up, tracking something invisible that is drifting slowly across the ceiling directly toward you.

Step by step. Left, then right.

You can’t see anything in the shadows above, but as the cat’s gaze stops directly overhead,
<short pause>
the air around you turns ice cold.
<short pause>
Then, two inches above your crown,
<whisper>you hear the quiet, deliberate sound of someone drawing a sharp, shallow breath.</whisper>
```

---

## 3. Clean Text Master Script (ElevenLabs / Alternative TTS)

If using **ElevenLabs** or standard neural TTS engines (e.g., *Adam*, *George*, or *Marcus* with Stability ~0.55, Similarity ~0.85):

```text
You are sitting in the dark of your living room at 2:00 AM, the only illumination coming from the muted blue glow of your television screen.

You live alone. The apartment is dead quiet.

Your cat, perched on the back of the sofa, suddenly sits bolt upright. Its pupils dilate into black saucers. It isn't looking at you, the window, or the hallway.

Its head is tilted up, tracking something invisible that is drifting slowly across the ceiling directly toward you.

Step by step. Left, then right.

You can't see anything in the shadows above, but as the cat's gaze stops directly overhead... the air around you turns ice cold.

Then, two inches above your crown... you hear the quiet, deliberate sound of someone drawing a sharp, shallow breath.
```

---

## 4. Stage 1 Directorial Beat Breakdown & Word Budgets

| Beat ID | Story Beat & Action Focus | Spoken Line Segment | Word Count | Est. Spoken Time (~2.2 wps) | Target Flow Native Duration |
|---|---|---|:---:|:---:|:---:|
| **Beat 01** | Living room wide; blue TV light cone | *"You are sitting in the dark of your living room at 2:00 AM, the only illumination coming from the muted blue glow of your television screen."* | 25 words | ~11.0s | 2 Clips (6s + 6s) |
| **Beat 02** | Macro clock / quiet room atmosphere | *"You live alone. The apartment is dead quiet."* | 9 words | ~4.0s | 1 Clip (6s) |
| **Beat 03** | Cat reacts bolt upright; macro eye dilation | *"Your cat, perched on the back of the sofa, suddenly sits bolt upright. Its pupils dilate into black saucers."* | 20 words | ~9.0s | 2 Clips (6s + 6s) |
| **Beat 04** | Spatial exclusion (window / hallway) | *"It isn’t looking at you, the window, or the hallway."* | 10 words | ~4.5s | 1 Clip (6s) |
| **Beat 05** | Cat's head tracking ceiling entity | *"Its head is tilted up, tracking something invisible that is drifting slowly across the ceiling directly toward you."* | 18 words | ~8.0s | 2 Clips (6s + 4s) |
| **Beat 06** | Kinetic cadence (step by step) | *"Step by step. Left, then right."* | 7 words | ~3.0s | 1 Clip (4s) |
| **Beat 07** | Shadows above; cat gaze stops overhead | *"You can’t see anything in the shadows above, but as the cat’s gaze stops directly overhead,"* | 16 words | ~7.0s | 2 Clips (4s + 6s) |
| **Beat 08** | Ice cold chill; freeze reaction | *"the air around you turns ice cold."* | 7 words | ~3.0s | 1 Clip (4s) |
| **Beat 09** | Crown close-up; the shallow breath climax | *"Then, two inches above your crown, you hear the quiet, deliberate sound of someone drawing a sharp, shallow breath."* | 20 words | ~9.0s | 2 Clips (6s + 6s) |
| **Total** | **End-to-End Narrative** | **Full 108-word script** | **108 words** | **~49–55s** | **~13 Clips (~64s total)** |

---

## 5. Next Step: The Dialogue-First Hard Pause

Per Section 2.3 of the **Director's Cut Assembly Specification**, video prompt compilation is paused here until you record the audio track:
1. Generate the audio using Gemini 3.8 Flash TTS (or ElevenLabs).
2. Note the total audio file duration (or export an `.srt` subtitle file).
3. Provide the timestamps or paste the SRT cues here.
4. The Director's Engine will then compile the exact Tier 2 keyframe plates and Tier 3 Veo motion prompts matching your audio down to the exact sub-second.
