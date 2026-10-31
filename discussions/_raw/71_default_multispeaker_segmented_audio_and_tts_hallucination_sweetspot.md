# Discussion 71 — Google AI Studio 2-Speaker Alternating Alignment, Unified TurboScribe Transcripts, and the TTS Anti-Hallucination Sweet Spot

**Date:** 2026-10-31  
**Status:** ✅ Finalized & Implemented  
**Focus:** Resolving Google AI Studio's 2-speaker alternating-turn UI constraint, ensuring 1-click generation of a single unified master audio file for continuous TurboScribe/AudioToSRT transcripts, and codifying balanced ~120-word segments for solo narrations.

---

## 1. The Core Conflict: Google AI Studio UI Constraints vs. Continuous Transcript Needs

When testing Google AI Studio Speech Playground (`https://aistudio.google.com/generate-speech`) in multi-speaker mode, two empirical constraints emerged:
1. **Strict Alternating Turn Enforcement:** The multi-speaker UI strictly forces turns to alternate: `Speaker 1` -> `Speaker 2` -> `Speaker 1` -> `Speaker 2`. It does not allow consecutive turns by Speaker 1.
2. **2-Speaker Ceiling:** The UI supports exactly 2 voices (`Speaker 1` and `Speaker 2`).

### Why the "Separate Stems" Idea Fails in Practice:
If secondary character lines are generated as isolated audio files (separate stems) while the narrator is recorded separately:
- The creator ends up with multiple disjointed audio clips.
- **The Fatal Flaw:** You cannot drop multiple disconnected audio files into **TurboScribe** or **AudioToSRT** to get a single, continuous SRT transcript with timestamps from `00:00` to the end! The creator would be forced to manually stitch the audio files together in an external editor first just to get timestamps.

---

## 2. The v1 Solution: The Two-Pathway Architecture

To give the creator a frictionless experience where **Google AI Studio exports ONE single audio file** that directly feeds into TurboScribe for an unbroken SRT transcript:

### Pathway A: When a Secondary Voice Exists (Google AI Studio 2-Speaker Alternating Format)
OpenProducer groups all narration leading up to each character line into a single `[Narrator]` turn (Speaker 1), followed by the character line in `[Voice B]` (Speaker 2), followed by the next narration block in `[Narrator]` (Speaker 1):

```text
Turn 01 — [Narrator - Fenrir] (Speaker 1)
(All narrative paragraphs leading up to the radio call grouped together)
...Static hisses through the receiver. Then a calm voice answers:

Turn 02 — [Voice B - Orus] (Speaker 2)
<short pause>
<whisper>Extinguish the light. It sees you.</whisper>

Turn 03 — [Narrator - Fenrir] (Speaker 1)
(All subsequent narrative paragraphs grouped together until the next dialogue line)
...And in the dark void, you hear it:

Turn 04 — [Voice B - Orus] (Speaker 2)
<whisper>It's your turn to keep the light burning.</whisper>

Turn 05 — [Narrator - Fenrir] (Speaker 1)
(Final resolution narration)
```

**Why This Works 100%:**
1. **Fits Google AI Studio's Alternating UI Perfectly:** Turn 1 is Speaker 1, Turn 2 is Speaker 2, Turn 3 is Speaker 1. Zero UI friction, no locked speaker errors.
2. **One Unified Audio Output:** Google AI Studio generates **one single `.wav`/`.mp3` file** containing the complete voiced story.
3. **Clean Instant TurboScribe Transcript:** The creator drops that single audio file into TurboScribe / AudioToSRT and gets a **100% clean, continuous SRT transcript with unified timestamps from 00:00 to the end**.

---

### Pathway B: When NO Secondary Voice Exists (Balanced Single-Speaker Segments)
If there is no secondary voice in the plot, multi-speaker mode is unnecessary. The creator generates the voice in **Single-Speaker Mode**.

Here, OpenProducer formats the script into **Balanced ~120-word segments** (100–160 words, max 180 words):
```text
Segment 01 — [Narrator - Fenrir] (~120 words)
...
Segment 02 — [Narrator - Fenrir] (~135 words)
...
Segment 03 — [Narrator - Fenrir] (~120 words)
```

**Why This Works:**
- Breaking long narration at natural scene/atmospheric shifts prevents Gemini TTS attention decay, unnatural rushing, and the severe glitch of speaking markup tags aloud (*"less than short pause greater than"*).

---

## 3. Skills & Workflows Updated

The following authoritative files have been synchronized with this architecture:
- [`agents/skills/openproducer-produce/SKILL.md`](./agents/skills/openproducer-produce/SKILL.md) & [`agents/workflows/opp-produce.md`](./agents/workflows/opp-produce.md)
- [`agents/skills/openproducer-propose/SKILL.md`](./agents/skills/openproducer-propose/SKILL.md)
- [`agents/skills/openproducer-guide/SKILL.md`](./agents/skills/openproducer-guide/SKILL.md) & [`agents/workflows/opp-guide.md`](./agents/workflows/opp-guide.md)
- [`production_template/AGENTS.md`](./production_template/AGENTS.md)
- [`AGENTS.md`](./AGENTS.md)
