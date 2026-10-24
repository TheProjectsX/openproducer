# Raw Discussion 35: Master Subject DNA Invariance & Multi-Clip Continuity Chaining

**Date:** 2026-10-24  
**Domain:** `directors_cut/` / `assembly/`  
**Status:** 💡 Active Architectural Consensus  
**Target Specification:** `production_framework/specs/05_directors_cut_assembly_spec.md`  

---

## 1. The Subject Mutation Failure Mode

In multi-clip video generation, an enormous failure mode occurs when subsequent clips use shortened or casual pronouns (e.g. *"The stick figure raises its arms"* or *"The medic turns around"*).

Because video diffusion models (Veo, Sora, Kling, Runway) treat each clip's text prompt as an independent semantic conditioning pass:
- **Clip A** generates a pencil-thin, minimalist 2D black stick figure.
- **Clip B** generates a thick-lined, muscular cartoon figure or a 3D claymation doll.
- In live-action, Clip A's female medic with a braided brown ponytail morphs into a blonde woman in a different jacket in Clip B.

---

## 2. The Master Subject DNA Injection Protocol

To guarantee that Clip A and Clip B share 100% identical anatomy, silhouette, wardrobe, and materiality, the production framework enforces the **Master Subject DNA Injection Protocol**:

```
[subjects/<id>/subject_anchor.txt] 
                 │
                 ▼ (Deterministic Injection)
┌────────────────────────────────────────────────────────┐
│ Clip 01 Prompt: Tokens 10–35 ──► [VERBATIM SUBJECT DNA] │
│ Clip 02 Prompt: Tokens 10–35 ──► [VERBATIM SUBJECT DNA] │
│ Clip 03 Prompt: Tokens 10–35 ──► [VERBATIM SUBJECT DNA] │
│ Clip 04 Prompt: Tokens 10–35 ──► [VERBATIM SUBJECT DNA] │
└────────────────────────────────────────────────────────┘
```

### 2.1 The Rules of Verbatim DNA Injection
1. **Verbatim Text Match:** Every clip prompt featuring Subject X **MUST inject the exact canonical descriptor block** defined in `subjects/<id>/` into the early token window (tokens 10–35). Never summarize, shorten, or use generic pronouns (*"he"*, *"she"*, *"the figure"*).
2. **Explicit Silhouette & Musculoskeletal Scale:** The DNA string must hardcode physical build, line-weight/thickness, and skin/material texture.
   - *Example (Stylized 2D Stick Figure):*
     > `"Minimalist 2D hand-drawn pitch-black solid stick figure with a simple blank circular head, zero facial features, perfectly slender pencil-thin uniform-weight linear limbs, no torso thickness..."`
   - *Example (Photorealistic Character Maya Lin):*
     > `"Maya Lin, a 28-year-old East Asian combat medic, sharp zygomatic bone structure, braided dark brown hair tied in a tight low bun, wearing a tailored olive-drab ripstop field jacket with subdued red cross shoulder patch and canvas chest webbing..."`
3. **Anti-Mutation Guardrails:** Every DNA string includes explicit exclusion constraints (e.g. for stick figure: `no muscular build, no 3D rendering, no shading, no realistic human anatomy, no clothing`).
4. **Dual-Conditioning in Google Flow:** The prompt's verbatim text anchor works in tandem with the visual reference ingredient (the `#E5E5E5` model turnaround sheet), pinning both semantic latent space and pixel latent space.

---

## 3. The Two Transition Pathways Between Clips

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       CLIP N TO CLIP N+1 TRANSITIONS                        │
├──────────────────────────────────────┬──────────────────────────────────────┤
│ MODE 1: CONTINUOUS SHOT EXTENSION    │ MODE 2: MOTIVATED CUT / ANGLE CHANGE │
├──────────────────────────────────────┼──────────────────────────────────────┤
│ • Same continuous camera angle / arc.│ • Perspective cut (Wide to MCU/Macro)│
│ • Uses `last_frame` of Clip N as the │ • CANNOT use `last_frame` (new angle)│
│   input first-frame seed of Clip N+1.│ • Governed by:                       │
│ • Velocity matching: Camera speed and│   1. Verbatim Subject DNA Injection  │
│   trajectory continue without jolt.  │   2. Shared `#E5E5E5` Ingredient Pin │
│ • Prompt Syntax:                     │   3. 180° Screen Direction Lock      │
│   "Continuing directly from the      │   4. Identical Motivated Light Vector│
│   initial frame, the [Subject DNA]   │                                      │
│   continues the trajectory by..."    │                                      │
└──────────────────────────────────────┴──────────────────────────────────────┘
```
