# Discussion 90: The Law of Ingredient Uniqueness & Tier-Adaptive Slot Binding

**Date:** 2026-11-14  
**Context:** Ingredient Binding Audit, Multi-Agent Clarity & Anti-Hallucination Guardrails  
**Participants:** Creator & OpenProducer Agent  

---

## 1. Context & The Creator's Critical Discovery

During a line-by-line inspection of the newly generated packaging thumbnails in `the_lighthouse_v2/production/packaging/thumbnails/thumb_01_prompt.txt`, the creator identified a severe architectural flaw:

```text
[INPUT SEEDS & INGREDIENTS]
1. Persistent Subject DNA: [IMAGE 1] -> production/base_image_prompt.txt (Minimalist 2D Vector Stick Figure Keeper)
2. Master Visual DNA:      [IMAGE 2] -> production/base_image_prompt.txt (Warm cream canvas, dramatic noir lighting, high-contrast kerosene lantern cone)
```

The creator rightly called out this behavior:
> *"As you can see in thumb_01_prompt.txt and the others, Input seeds include 2 images, and both are the base image. Either you added base twice by mistake or forgot to add the correct 2nd image. Now. If you, the session who is creating the package, have all knowledge, work like this, then how will the other agents work? You may say, img 1 is for style and img 2 for lighting and stuff. But. THEY ARE BOTH THE SAME IMAGE!!! A Creator might get confused with this."*

---

## 2. Root Cause Analysis

OpenProducer provides two foundational operating tiers:
1. **Tier 1 (Lean Architecture):**
   - Designed for single-subject, single-setting productions (e.g. Solo UGC, Stick Figure Noir, Product Spotlight).
   - Contains **ONLY ONE** master visual file: `production/base_image_prompt.txt`. There are NO `production/subjects/` or `production/visuals/environments/` directories.
2. **Tier 2 (Modular Studio Architecture):**
   - Designed for episodic productions with multiple recurring characters or multiple distinct locations.
   - Contains distinct asset trees: `production/subjects/<id>/profile_prompt.txt` (`[IMAGE 1]`) and `production/visuals/environments/<id>/prompt.txt` (`[IMAGE 2]`).

### The Glitch: Blind Template Conflation
`the_lighthouse_v2` is an authoritative **Tier 1 Lean project**. During prompt generation, the agent blindly applied the Modular Studio 2-image template (`[IMAGE 1] Subject` + `[IMAGE 2] Scene`) to a Lean project where only `base_image_prompt.txt` exists. To satisfy both slots, the agent mapped the exact same file to both `[IMAGE 1]` and `[IMAGE 2]`.

### Why This Is Lethal to Creator UX & Downstream Agents:
1. **Creator Confusion in Google Flow:** Google Flow features separate drag-and-drop reference image upload slots (`[IMAGE 1]`, `[IMAGE 2]`). Asking a creator to upload `base_image.png` into Slot 1 and then upload the identical file into Slot 2 makes the workflow look broken and nonsensical.
2. **Agent Drift:** When subsequent agents or sub-agents read this prompt file, they hallucinate that the project has two distinct reference assets, leading to broken generation instructions and pipeline corruption.
3. **Diffusion Attention Waste:** Multi-modal image and video models perform cross-attention on reference tokens. Feeding the exact same image twice into two distinct conditioning tokens wastes attention budget and risks latent artifacts.

---

## 3. The Law of Ingredient Uniqueness & Tier-Adaptive Slot Binding

To permanently prevent this failure across all current and future agents, the framework institutes **The Law of Ingredient Uniqueness**:

### Rule 1: Zero Duplicate Slot Bindings
A file path may **NEVER** appear more than once within `[INPUT SEEDS & INGREDIENTS]`. Binding the identical image file to multiple slots (`[IMAGE 1]` and `[IMAGE 2]`) is strictly classified as a compiler error and agent hallucination.

### Rule 2: Tier-Adaptive Slot Count
The number of reference image slots must strictly reflect the project tier:
- **In Tier 1 (Lean Projects):**
  Exactly **ONE** reference image slot is permitted:
  ```text
  [INPUT SEEDS & INGREDIENTS]
  1. Master Visual & Subject DNA: [IMAGE 1] -> production/base_image_prompt.txt
  ```
  *(For video clips: `1. First Frame (Start Seed): ...` + `2. Master Visual DNA: [IMAGE 1] -> production/base_image_prompt.txt`). Zero `[IMAGE 2]`.*
- **In Tier 2 (Modular Studio Projects):**
  Distinct subject and environment assets exist and must map to separate files:
  ```text
  [INPUT SEEDS & INGREDIENTS]
  1. Persistent Subject DNA: [IMAGE 1] -> production/subjects/<subject_id>/profile_prompt.txt (or turnaround_sheet.png)
  2. Persistent Scene DNA:   [IMAGE 2] -> production/visuals/environments/<env_id>/prompt.txt (or empty_stage.png)
  3. (Optional Hero Prop):   [IMAGE 3] -> production/subjects/<prop_id>/hero_prompt.txt
  ```

---

## 4. Codification in Master Linters

- **PKG-07 (Ingredient Uniqueness & Zero Duplication):**
  Every thumbnail prompt must verify that no two `[IMAGE N]` slots share the same file path, and Lean projects must not contain `[IMAGE 2]`.
- **L-06 Reinforcement:**
  Dual conditioning in video prompts strictly enforces unique file paths for each slot binding.

---

## 5. Applied Remediation Deliverables

1. **Simulation Assets Fixed:**
   - `production_framework/simulations/the_lighthouse_v2/production/packaging/thumbnails/thumb_01_prompt.txt`
   - `production_framework/simulations/the_lighthouse_v2/production/packaging/thumbnails/thumb_02_prompt.txt`
   - `production_framework/simulations/the_lighthouse_v2/production/packaging/thumbnails/thumb_03_prompt.txt`
   - `production_framework/simulations/the_lighthouse_v2/production/clips/clip_001/image_prompt.txt`
   - `production_framework/simulations/the_lighthouse_v2/production/clips/clip_001/video_prompt.txt`
2. **Core Specifications Updated:**
   - [`production_framework/specs/07_scaffolding_and_workspace_spec.md`](../specs/07_scaffolding_and_workspace_spec.md)
   - [`production_framework/specs/09_packaging_spec.md`](../specs/09_packaging_spec.md)
   - [`agents/skills/openproducer-package/SKILL.md`](../../agents/skills/openproducer-package/SKILL.md)
