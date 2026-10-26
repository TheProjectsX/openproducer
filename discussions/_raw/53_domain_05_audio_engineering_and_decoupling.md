# Discussion 53: Domain 05 — Audio Engineering & Decoupling

**Date:** 2026-10-26  
**Status:** ✅ FINALIZED & CODIFIED INTO SPECIFICATIONS  
**Target Specifications:** [`../production_framework/specs/04_cinematography_audio_spec.md`](../production_framework/specs/04_cinematography_audio_spec.md), [`../production_framework/specs/05_directors_cut_assembly_spec.md`](../production_framework/specs/05_directors_cut_assembly_spec.md)  
**Staged Location Consumed:** [`../dump.md`](../dump.md)

---

## 1. Domain Scope & Context

Following empirical testing of Veo 3.1 dual-stream audio in Simulation 2, the framework unbundled audio from generic prose into a dedicated, rigorous engineering domain. The goal is to completely eliminate:
1. Dialogue duration overflow and mid-sentence clipping.
2. Muddy, un-mixable multi-instrument audio beds.
3. Burned-in subtitle and text watermark hallucinations.
4. Jittery acoustic dropouts across cuts in video editing software.

---

## 2. Codified Architectural Primitives

### 2.1 Dual-Track Speech Velocity Standard
- **The Finding:** External neural TTS (ElevenLabs, Gemini 3.8 Flash TTS) flows at natural human conversational speed ($\approx 2.17$ to $2.50$ words/sec, baseline $2.2$ wps). However, Veo 3.1 native in-video audio synthesizes speech much more slowly and deliberately ($\approx 1.20$ to $1.50$ words/sec, baseline $1.3$ wps), requiring pre/post-roll silence buffers of $\ge 1.0\text{s}$.
- **Slicing Standards Codified:**
  - *Native Veo 3.1:* 4s = 3–5 words (max 6w); 6s = 7–9 words (max 10w); 8s = 11–13 words (max 14w); 10s = 15–18 words (max 19w).
  - *External TTS:* 4s = 5–7 words (max 8w); 6s = 9–11 words (max 12w); 8s = 13–16 words (max 18w); 10s = 17–20 words (max 22w).
- **Linter L-16 Enforced:** Automated pre-flight validation flagging any native Veo prompt exceeding native word limits.

### 2.2 Semicolon-Delimited 3-Track Audio Prompt Standard
Standardized the trailing audio prompt block (Tokens 131–150) into an unambiguous, frequency-separated virtual soundboard:
$$\mathbf{Audio:\ SFX:\ [Foley];\ Ambience:\ [Room\ Tone];\ Dialogue:\ [Spoken\ Attribution\ |\ None];\ Music:\ [Score\ Directive].}$$
- `SFX:` High-frequency tactile contact transients.
- `Ambience:` Spatial room tone and low-frequency beds.
- `Dialogue:` Mid-frequency vocal band (300Hz–3.5kHz) with locked Acoustic Anchor Key.
- `Music:` Explicit suppression (`no background music, zero score`) or Mode A subtle bed (`low-in-the-mix, no drums`).
- **Linter L-18 Enforced:** Requires 3-track structured delimiters.

### 2.3 The `(REFERENCE ONLY)` Non-Render Guardrail
- **Failure Mode Solved:** Video diffusion models interpreting script dialogue or scene emotion notes as commands to render physical text overlays or subtitles onto video pixels.
- **The Rule:** All contextual guidance in prompts must be enclosed in:
  `[SCENE CONTEXT (REFERENCE ONLY — DO NOT RENDER SUBTITLES OR WORDS ON SCREEN)]: ...`
- **Mandatory Negative Invariant:** Every prompt includes: `subtitles, closed captions, burned-in text, lower thirds, speech bubbles, watermark, floating words, typography`.
- **Linter L-17 Enforced:** Flags missing non-render headers or negative text tokens.

### 2.4 Multi-Track Stem Assembly Architecture (`audio_stems.md`)
Standardized 4-track timeline structure for NLE software (CapCut, Premiere Pro, DaVinci):
- `Track A1 (Dialogue Master):` Normalized to -14 LUFS (Online) / -23 LUFS (Broadcast).
- `Track A2 (Foley SFX):` Aligned to contact visual keyframes.
- `Track A3 (Spatial Ambience):` Continuous unbroken acoustic bed bridging cuts.
- `Track A4 (Score Bed):` Ducked by -14dB during vocal presence on Track A1.
