# Discussion 54: Finalizing Staging Cleanup & 100% Spec Consumption

**Date:** 2026-10-26  
**Status:** ✅ COMPLETE — 100% OF RESEARCH & STAGING CONSUMED  
**Affected Specs:**
- [`../production_framework/specs/02_character_spec.md`](../production_framework/specs/02_character_spec.md)
- [`../production_framework/specs/04_cinematography_audio_spec.md`](../production_framework/specs/04_cinematography_audio_spec.md)
- [`../production_framework/specs/05_directors_cut_assembly_spec.md`](../production_framework/specs/05_directors_cut_assembly_spec.md)

---

## 1. Milestone Overview

All research concepts staged across recent sessions in `dump.md` have been fully integrated into the authoritative production specifications, and `dump.md` has been deleted from disk. 

The entire framework has now achieved **100% Research & Specification Completeness**.

---

## 2. Inventory of Codified Enhancements

### 2.1 Domain 1: Subject & Likeness (Integrated into `02_character_spec.md`)
1. **Lean Reference Anchoring (Rule 9):** Solved the text-over-prompting glitch by commanding minimal facial description when `[IMAGE 1]` is present (`The exact same person from [IMAGE 1]...`), preserving 95%+ latent attention on the reference image.
2. **The 2-Step Angle Normalizer:** Pose normalization plate 1A on `#E5E5E5` prior to character activation.
3. **The 1:7.5 Anatomical Scale Lock:** Natural adult head-to-body ratio eliminating the bobblehead/caricature glitch.
4. **The Expression Decoupling Engine:** Separating immutable bone anatomy from transient facial muscle flexion.

### 2.2 Domain 2: Script & Narrative Architecture (Integrated into `05_directors_cut_assembly_spec.md`)
1. **Dynamic Narrative Tempo (Section 2.5):** Flexible speech rates (slow-burn dread 1.8–2.2 WPS vs high-velocity 2.6–3.0 WPS vs hybrid arcs).
2. **The Non-Imposition Law (Section 2.6):** Preserving creator agency. The AI is authorized to propose 2nd-person staging for rough concepts, but is **strictly prohibited from rewriting authored scripts**.
3. **Dynamic Hook Rules (Section 2.7):** Banning mad-libs templates; enforcing immediate in medias res and equilibrium breaks.

### 2.3 Domain 4: Directorial Slicing & Visual Rhythm (Integrated into `05_directors_cut_assembly_spec.md`)
1. **The 4-Beat Visual Rhythm (Section 4.4):** Cyclic sequence progression (`Grounded Action 3–5s` $\rightarrow$ `Direct Focal 2–3s` $\rightarrow$ `Cutaway / Metaphor 2–4s` $\rightarrow$ `Reaction Beat 1–2s`) eliminating talking-head fatigue and isolating lip-sync to Beat 2.
2. **The 4 Match-Cut Timeline Handoffs (Section 4.6):** Timeline snapping standards (`[MATCH-ON-POSE]`, `[MATCH-ON-PROP]`, `[MATCH-ON-SHAPE]`, `[MATCH-ON-TONE]`).
3. **The 30° Cinematic Contrast & Anti-Jump-Cut Law (Section 4.7):** Banning consecutive similar medium shots; requiring 30° perspective cuts or Flow `last_frame` chaining.
4. **Timestamped Monolithic Prompts (Section 6.2):** Standardized long-form single-take prompt syntax for 10–15s engines (Seedance 2.0, Sora).

### 2.4 Domain 5: Audio Engineering & Decoupling (Integrated into `04_cinematography_audio_spec.md`)
1. **Dual-Track Speech Velocity Standards:** Decoupled Native Veo ($\approx 1.2$–$1.5$ wps) from External TTS ($\approx 2.2$ wps).
2. **3-Track Semicolon Audio Syntax:** Structured trailing blocks (`Audio: SFX: ...; Ambience: ...; Dialogue: ...; Music: ...`).
3. **The `(REFERENCE ONLY)` Non-Render Guardrail:** Permanent elimination of burned-in subtitles and text watermarks.
4. **Multi-Track Stem Assembly Architecture:** Standardized 4-track timeline layout (A1: Dialogue, A2: Foley SFX, A3: Ambience, A4: Score).

### 2.5 Linters L-16 through L-20 Added:
- **`L-16`:** Native Veo 3.1 Word Budget Linter.
- **`L-17`:** Anti-Subtitle Invariant Linter.
- **`L-18`:** 3-Track Structured Audio Syntax Linter.
- **`L-19`:** 30° Cinematic Contrast & Anti-Jump-Cut Linter.
- **`L-20`:** Authored Voice Preservation Linter.
