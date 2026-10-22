# Research Knowledge Base: Structure & Agent Context Loading Guide

**Guiding Principle:** *"Keeping everything is not a problem, reading everything is. Keeping everything gives us more info control."*

This directory contains the complete theoretical, empirical, and reverse-engineered knowledge base for **Google Flow, Veo 3.1, Imagen 4, and Gemini Omni Flash**.

---

## 1. Directory Map & Classification Tiers

| Folder / File | Size / Tokens | Classification Tier | Purpose & Description | Agent Loading Rule |
|---|---|---|---|---|
| **`synthesis/`** | 10 files (~18k tokens) | **Tier 1: Active Knowledge** | Authoritative, curated, verified operational synthesis files (API, prompt anatomy, consistency, audio, etc.). | **LOAD ON DEMAND.** Read only the specific synthesis topic needed for the current task. |
| **`validation.md`** | 1 file (~2.2k tokens) | **Tier 1: Certification** | Final certification report verifying all 10 synthesis files against empirical findings. | Read once to understand verified system capabilities. |
| **`00_plan.md` / `00_progress.md` / `00_tasks.md`** | 3 files (~5k tokens) | **Tier 2: Research History** | Historical research phase milestone logs and tracking sheets. | Read only when reviewing research phase timeline. |
| **`raw_contents/`** | 12 files (~54k tokens) | **Tier 3: Cold Archive** | Unmodified raw text dumps scraped from Google Cloud docs, DeepMind prompt guides, blogs, and community forums. | ⛔ **DO NOT LOAD IN INITIAL SESSIONS.** Consult only if a specific source citation is contested. |
| **`raw_notes/`** | 12 files (~11k tokens) | **Tier 3: Cold Archive** | Source-by-source preliminary analytical notes taken during Phase 2. | ⛔ **DO NOT LOAD IN INITIAL SESSIONS.** Fully superseded by `synthesis/`. |

---

## 2. Agent Loading Protocol (Token & Context Economy)

To keep context windows lean and avoid token waste:

1. **Initial Session Boot:**
   - ⛔ **NEVER** scan or read `research/raw_contents/` or `research/raw_notes/`.
   - Start at the root by reading [`AGENTS.md`](../AGENTS.md).
   - If researching a specific video generation mechanism, read **only the relevant file** inside [`research/synthesis/`](./synthesis/).

2. **Synthesis Directory Quick-Index (`research/synthesis/`):**
   - [`01_api_and_models.md`](./synthesis/01_api_and_models.md) — API payloads, parameters, duration bounds, resolution limits.
   - [`02_prompt_anatomy.md`](./synthesis/02_prompt_anatomy.md) — Viewport framing, token attention curve, kinematics, lighting, and audio syntax.
   - [`03_prompt_techniques.md`](./synthesis/03_prompt_techniques.md) — Front-loading, sensory grounding, lighting vectors, negative prompting.
   - [`04_character_and_consistency.md`](./synthesis/04_character_and_consistency.md) — Verbatim facial anchors, multi-view turnarounds, costume continuity.
   - [`05_multi_clip_and_storyboard.md`](./synthesis/05_multi_clip_and_storyboard.md) — Scene beat sheets, multi-shot coverage, spatial-temporal continuity.
   - [`06_audio_and_dialogue.md`](./synthesis/06_audio_and_dialogue.md) — Foley soundscapes, dialogue punctuation, delivery tags, music suppression.
   - [`07_structured_prompting.md`](./synthesis/07_structured_prompting.md) — JSON schemas, compiler contracts, shot-specification dataclasses.
   - [`08_limitations_and_workarounds.md`](./synthesis/08_limitations_and_workarounds.md) — Physics glitches, limb blending, text in video, drift workarounds.
   - [`09_prompt_examples.md`](./synthesis/09_prompt_examples.md) — Production-grade benchmark prompt library across genres.
   - [`10_glossary_and_reference.md`](./synthesis/10_glossary_and_reference.md) — Unified cinematography terms and operational lookup dictionary.

---

## 3. Why Cold Archives Are Preserved

`raw_contents/` and `raw_notes/` are deliberately kept in the repository for **Info Control**:
- They allow us to re-verify claims or check raw Google Cloud documentation updates without having to re-scrape the internet.
- They serve as the legal and technical audit trail for the entire research phase.
- Because agents only read files targeted to their task, preserving cold archives on disk carries zero context penalty.
