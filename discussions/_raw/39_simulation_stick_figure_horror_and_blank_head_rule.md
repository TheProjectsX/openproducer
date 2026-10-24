# Raw Discussion 39: Simulation — Stick Figure Psychological Horror & The Blank-Head Constraint

**Date:** 2026-10-24  
**Domain:** `directors_cut/` / `assembly/`  
**Status:** 💡 Empirical Validation & Simulation  
**Target Specification:** `production_framework/specs/05_directors_cut_assembly_spec.md`  

---

## 1. Simulation Setup

- **Project Title:** *The Uncanny Reflection* (2D Stick Figure Psychological Horror)
- **Target Runtime:** ~60 Seconds (10 Micro-Clips $\times$ 5s–7s)
- **Visual Style Paradigm:** Stylized 2D Minimalist Animation (Stark pitch-black void, uniform pencil-thin white/black vector lines, dramatic spotlight cones, *Limbo* aesthetic).
- **Hard Architectural Laws Applied:**
  1. *Closed-Lip / Blank-Head Constraint:* Stick figures have simple blank circular heads with zero eyes, nose, or mouth. The final whisper (*"You were never the one coming home."*) is routed to an off-screen supernatural audio source to strictly ban facial mouth morphing.
  2. *Pre-Materialized & Prop-Free:* Handled purely with minimalist linear vector strokes; doors are clean vertical line boundaries, eliminating object popping.
  3. *Micro-Beat De-Cramming:* Sliced into 10 unhurried micro-moments (e.g. stranger pointing arm is an isolated 6-second gesture).

---

## 2. Invariant Master Anchors

### 2.1 Protagonist Stick Figure DNA
> `Minimalist 2D hand-drawn uniform-line-weight stick figure with a simple blank circular head and zero facial features, slender linear limbs, clean minimalist silhouette, no clothing, no muscular build, no 3D shading, no gradients, pure white/black monochrome aesthetic.`

### 2.2 Stranger Stick Figure DNA
> `Slightly taller elongated 2D stick figure with extended pencil-thin arms, elongated torso, blank circular head, motionless rigid posture, zero facial features, crisp 2D vector silhouette.`

---

## 3. Production Manifest Summary

- **Master Agent Prompt:** [`production_framework/stick_figure_horror/master_flow_agent_prompt.txt`](../production_framework/stick_figure_horror/master_flow_agent_prompt.txt)
- **Pacing Ledger:** [`production_framework/stick_figure_horror/scratchbook.md`](../production_framework/stick_figure_horror/scratchbook.md)
- **Individual Clips:** [`production_framework/stick_figure_horror/individual_clips/clip_01.txt`](../production_framework/stick_figure_horror/individual_clips/clip_01.txt) through `clip_10.txt`
- **Origin Tracker:** [`production_framework/stick_figure_horror/origin_manifest.md`](../production_framework/stick_figure_horror/origin_manifest.md)
- **Photo-First Validation:** Keyframe generated and validated (`stick_horror_keyframe`).
