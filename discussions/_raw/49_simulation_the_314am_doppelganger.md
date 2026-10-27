# Discussion 49: Phase 06 Simulation — The 3:14 AM Doppelgänger

**Date:** 2026-10-25  
**Topic:** Dialogue-First Simulation with High-Retention Script & Expressive Fear Posture  
**Project Artifact:** [`production_framework/simulations/the_314am_doppelganger/`](../../production_framework/simulations/the_314am_doppelganger/)  
**Specification Reference:** [`production_framework/specs/05_directors_cut_assembly_spec.md`](../../production_framework/specs/05_directors_cut_assembly_spec.md)  
**Style Reference:** [`production_framework/styles/vector_stick_figure.md`](../../production_framework/styles/vector_stick_figure.md)

---

## 1. Step 0 Intake & Confirmation Gate Execution

The production went through the full Step 0 Intake and Section 2.4 Confirmation Gate:
1. **Intake Confirmed:**
   - **Pacing Profile:** Dynamic Sync (4s–6s cuts, high retention, rapid twists).
   - **Workflow Pipeline:** Dialogue-First Timing Loop (Script first $\rightarrow$ Hard Pause $\rightarrow$ Precision Slicing).
   - **Pluggable Style:** Minimalist 2D Vector Graphic Noir.
2. **Creator Extra Instructions Integrated:**
   - *Audio:* "Make the audio engaging. Don't use too much pauses as the viewers may lose interest." $\rightarrow$ Enforced Anti-Dead-Air Law, purged all artificial `<long pause>` tags, relied on natural punctuation flow (~140 wpm / ~2.3 wps).
   - *Character Emotion:* "For our figure, we need to show some emotions like, scared or tensed kinda things too!" $\rightarrow$ Incorporated fear postures: hunched upward shoulders, rigid trembling arm tension holding the phone, chin pulled into collarbone in shock, stark upward smartphone light cone.

---

## 2. Stage 1 Deliverables (Directorial Handoff)

1. **`narrator_script.md`:** 3 production chunks formatted for Google AI Studio (Gemini 3.8 Flash TTS) with zero dead-air tags:
   - Chunk 1: The 3:14 AM Alert & The Empty Hallway (101 words)
   - Chunk 2: The Two-Minute-Old Recording (96 words)
   - Chunk 3: The Live Feed & Wet Footsteps (70 words)
2. **`base_image_prompt.txt`:** Tier 1 Master Reference Plate prompt defining the bedroom, fear-hunched stick figure, smartphone light spotlight, and closed hallway door.
3. **Directorial Hard Pause:** Execution was frozen awaiting creator's recorded audio file durations.

---

## 3. Stage 2 Execution & Full Assembly (SRT Integration)

1. **SRT Ingestion:** Creator provided 40-cue master SRT (`audio.srt`) with exact duration of 135.08s (02:15.08).
2. **Assembly Ledger (`scratchbook.md`):** Sliced the story into **22 Flow-native clips** (all adhering to `[4s, 6s, 8s, 10s]`), totaling 136s runtime (135.08s audio + 0.92s tail dissolve buffer).
3. **Individual Clips (`clips/clip_01/` to `clip_22/`):** Generated dual-tier prompts for all 22 cuts:
   - Tier 2 Starting Keyframe Plate (`image_prompt.txt`) conditioned on Tier 1 master DNA.
   - Tier 3 Image-to-Video Motion & Audio Prompt (`video_prompt.txt`) adhering to 100–150 word economy.
4. **Master Deliverables:**
   - `master_flow_agent_prompt.txt`: Unified copy-paste manifest for Google Flow Agent Mode.
   - `origin_manifest.md`: Lineage matrix mapping all 22 clips, cues, and engine origins.
5. **100% Pre-Flight Linters Pass (L-07 through L-15):**
   - L-07: Single-Motion Law verified on all 22 cuts.
   - L-08: Speech velocity within bounds with $\ge 0.8\text{s}$ buffers.
   - L-09: Verbatim Subject DNA anchored in tokens 10–35.
   - L-10: Mode 1 continuity match and Mode 2 spatial handoffs preserved.
   - L-11: 0 camera equipment nouns (`tripod`, `dolly`, `crane`, `rig`).
   - L-12: Closed-Lip Listener Rule enforced on protagonist.
   - L-13: Pre-Materialized Prop Law enforced (phone present Frame 1 to Frame End).
   - L-14: Gemini TTS clean formatting (no inline trailing tags).
   - L-15: 180° screen direction and eyeline consistency maintained between bed and door.

---

## 4. Current Status: Creator Simulation Execution In Progress

The prompt pipeline and 22-clip assembly are staged on disk. The creator is currently generating and evaluating the simulation clips. **Phase 06 validation remains open** and will only be signed off once the creator completes creation, reviews the output, and confirms any refinements.

