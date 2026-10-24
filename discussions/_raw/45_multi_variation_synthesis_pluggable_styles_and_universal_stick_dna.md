# Discussion 45: Multi-Variation Synthesis, Pluggable Styles & Universal Stick DNA

**Date:** 2026-10-24  
**Context:** Director's Cut & Multi-Variation Architecture (Synthesis of External Video/YouTube Prompting Research).  
**Participants:** Creator & Antigravity AI Video Production Framework  

---

## 1. Executive Summary & Synthesis of External Prompt Research

A thorough cross-check of external YouTube/animation video prompting research (`MIGRATION_PROPOSAL.md` and `PDFCrossCheck.md`) was conducted against our existing cinematic framework. Six core proposals were evaluated, refined, and filtered based on our core principle: **Lean, Creator-Centric, and Strictly Focused on Google Flow**.

### Core Strategic Decisions Reached:
1. **Pluggable Style Registry Architecture (`styles/`):**  
   Approved for scaffolding. However, rather than creating unneeded sub-variations or "style on top of style" (e.g. *horror stick figure* vs. *comedy stick figure*), the framework will enforce **Universal Base Mediums**. Mood, tone, and genre are controlled via lighting, camera vectors, and narrative context, not by splintering styles.
2. **Universal Stick Figure DNA (`vector_stick_figure.md`):**  
   Establishes a single universal baseline: unbroken 2D line vectors, rounded line-caps (`stroke-linecap: round`), solid white circular head (`#FFFFFF`) with uniform black contour (`#0F172A`), zero individual digits/fingers/toes. This single DNA serves horror, comedy, motivational essays, and educational explainers alike.
3. **Lean Causal Palette (Prop Bounding):**  
   Adopt the structural idea of closed-set prop bounding (defining permitted scene props and banning unlisted clutter in the negative prompt) without heavy, rigid PDF boilerplate.
4. **Single-Engine Focus:**  
   Reject multi-engine dilution (Sora/Seedance monolithic chapters) for now. The framework remains 100% sharply dedicated to **Google Flow (Veo 3.1, Imagen 4, Gemini Omni Flash)**.
5. **Thumbnails & Branding Excluded:**  
   Thumbnails and channel branding are explicitly **out of scope**. Our mission is video generation. The AI can provide optional keyframe suggestions upon request, but will not burden the core production desk with graphic design specs.
6. **Audio Architecture Retained:**  
   Reject rigid 3-track metadata tags (`SFX:`, `AMBIENT:`, `MUSIC_REF:`) in video prompts. Veo 3.1 synthesizes audio most effectively from our proven 4-tier cohesive soundboard paragraph.
7. **Narrative Scripting & Hook Research:**  
   Kept as an active research item for exploration before final codification.
8. **Staged in `Dump.md`:**  
   All approved items are staged in `Dump.md` to allow further research before finalizing Phase 6 directories and specifications.

---

## 2. Universal Mediums vs. "Style on Style" Traps

### 2.1 The Splintering Failure Mode
Creating hyper-specific styles like `stick_figure_horror`, `stick_figure_comedy`, or `stick_figure_corporate` creates combinatorial bloat and maintenance overhead. 

### 2.2 The Solution: Universal Medium Primitives
The `styles/` registry will contain clean, universal medium definitions:
- `styles/live_action_cinema.md`: Universal photorealism (35mm, optical depth, natural skin).
- `styles/commercial_tabletop.md`: Universal product macro (100mm, rim reflections, pristine surfaces).
- `styles/vector_stick_figure.md`: Universal minimalist line-art (fingerless vector lines, white-fill/black-contour head, canvas versatility).

Genre adaptations are strictly driven by:
- **Lighting & Palette:** Soft daylight vs. high-contrast chiaroscuro light cone.
- **Camera Kinematics:** Playful whip vs. slow creeping dread push-in.
- **Narrative & Foley:** Laugh track / upbeat Rhodes vs. creaking doors / phone whispers.

---

## 3. Staging and Roadmap Protocol
All conclusions and pending additions are preserved in [`Dump.md`](./Dump.md). Once remaining Phase 6 research topics are explored, these staged architectures will be consumed into the authoritative specifications, and `Dump.md` will be deleted.
