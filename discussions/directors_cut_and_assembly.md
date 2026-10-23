# Discussion Log: Director's Cut, Temporal Slicing & Multi-Engine Assembly

**Status:** 🟡 ACTIVE WORKING DOCUMENT (Phase 6 Entry Point)  
**Target Specification:** [`../production_framework/specs/05_directors_cut_assembly_spec.md`](../production_framework/specs/05_directors_cut_assembly_spec.md)  
**Raw Archive Reference:** [`_raw/33_directors_cut_temporal_slicing_and_multi_engine_pipelines.md`](./_raw/33_directors_cut_temporal_slicing_and_multi_engine_pipelines.md)

---

## 1. Domain Scope & Mission

The **`directors_cut/` & `assembly/`** domain elevates the framework from isolated single-shot prompt generation into an end-to-end **Director's Production Desk**. It bridges the human creator's script, screenplay, or concept into paced, sliced, and continuity-locked clip sequences across multiple AI generation engines.

### Foundational Principles:
1. **Dynamic Engine Routing:** Support diverse generation pipelines:
   - *Pathway A:* Pure Google Flow / Veo 3.1 (5s–10s clips, native dual-stream audio).
   - *Pathway B:* Monolithic Long-Take Generators (Seedance, Sora, Minimax) using unified scene prompts.
   - *Pathway C:* Image Slideshows (Imagen 4 / Midjourney stills + ElevenLabs voiceover + Ken Burns pan & zoom).
   - *Pathway D:* Hybrid Multi-Tool Production (Veo b-roll + ElevenLabs dialogue + Suno music).
2. **Temporal Slicing & Action Budgeting:**
   - Word count to clip duration mathematical pacing (~2.2 words per second of speech).
   - Strict action budgeting (exactly 1 major biomechanical or kinematic action per clip to prevent diffusion hallucinations).
   - Avoiding "stretched" clips (dead air) vs. "cramped" clips (overloaded action).
3. **The Continuity Chaining Bridge:**
   - Terminal frame (`last_frame`) passing from Clip $N$ to Clip $N+1$.
   - Spatial coordinate matching and velocity continuation across cuts.
4. **The Director's Scratchbook & Origin Tracker:**
   - Comprehensive ledger tracking "what comes from where" (visual origin, audio origin, ingredient dependencies).

---

## 2. Active Roadmap for Phase 6 Resumption

When resuming work in Phase 6:
1. **Step 1: Planning Alignment:** Define the Director's Scratchbook format (`scratchbook.md` or `script_breakdown.md`) and word-to-time pacing calculation.
2. **Step 2: Slicing & Splicing Mechanics:** Formalize the chunking algorithm (5s/8s/10s) and action budgeting rules.
3. **Step 3: Multi-Engine Pipeline Contracts:** Define output formats for Flow vs. Seedance vs. Image Slideshows + ElevenLabs.
4. **Step 4: Empirical Simulation:** Run an end-to-end test slicing a 30-to-60 second multi-clip sequence with continuity chaining.
5. **Step 5: Authoritative Specification:** Generate `specs/05_directors_cut_assembly_spec.md`.
