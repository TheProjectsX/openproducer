# Discussion 14: Character Audio Mechanics, Multi-Character Scoping & Domain Completion

**Date:** 2026-10-22  
**Topic:** Character Audio in Google Flow, Prompt-Driven Voice Descriptions, and Finalizing the Character Domain  
**Domain:** `characters/`

---

## 1. Multi-Character Scene Scope Separation

- **Decision Reached:** Multi-character spatial staging (screen-left vs. screen-right), two-shot blocking, and conversational turn-taking belong strictly in **Cinematography & Shots (Phase 5.4)**, not in `characters/`.
- **Domain Purity Rule:** The `characters/` domain is strictly responsible for individual character asset creation, visual turnaround model sheets, invariant biometrics, and signature voice profiles.

---

## 2. Character Audio Mechanics in Google Flow & Veo 3.1

### A. Dual-Stream Multimodal Architecture
- Unlike legacy pipelines that generate silent video and rely on external TTS tools, Google Veo 3.1 synthesizes video frames and audio waveforms simultaneously in an integrated multimodal latent space.
- While Google Flow provides a UI Character Audio picker, it is constrained to selecting only one audio-bound character at a time.

### B. Prompt-Driven Voice Descriptions (Fully Supported by Veo)
- Empirical testing and Google documentation confirm that Veo's audio decoder directly obeys natural language voice descriptions inside prompt text.
- Prompt engineers can modulate vocal pitch, timbre, breathiness, and emotional delivery directly via text tokens without relying on UI dropdowns.

### C. The 2-Line Vocal Profile Specification
To keep character definitions lean, every character folder records a 2-line vocal profile inside `profile.md`:
```markdown
## Vocal Profile
- **Timbre & Pitch:** [e.g., Raspy low-pitched alto, weathered tone | Warm resonant baritone]
- **Default Delivery:** [e.g., Calm, quiet, clipped military cadence under pressure]
```

### D. Downstream Dialogue Syntax Formula
When the character speaks in video shots:
$$\mathbf{[Character\ Name]\ says,\ [delivery\ modifier]:\ [Spoken\ line\ in\ sentence\ case,\ max\ 15\text{--}20\ words].}$$
*Example:* `Maya speaks in a calm, low raspy whisper: Keep your head down, help is on the way.`

---

## 3. Milestone Completion: Character Domain
All requirements for `characters/` are now satisfied:
1. User Photo $\rightarrow$ Custom Wardrobe Turnaround.
2. Original Character Genesis $\rightarrow$ 4-View Turntable Model Sheet on `#E5E5E5`.
3. Anti-Action-Figure Guards & Anime/Cosplay Deconstruction.
4. Universal 5-Medium Style Generalizability.
5. In-prompt Audio & Vocal Profiles.
6. Ready for authoritative specification: `production_framework/specs/02_character_spec.md`.
