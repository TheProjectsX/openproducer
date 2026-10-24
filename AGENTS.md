# AGENTS.md — Video Generation Skill & Production Framework

## 1. Project Identity & Core Mission

- **Target System:** Google Flow (orchestrating Veo 3.1, Imagen 4, and Gemini Omni Flash).
- **Core Mission:** To build a structured, file-system-driven video generation research and prompt engineering framework (and eventually an agent skill) that produces **ultra-high-quality prompts and reference assets** that faithfully reflect the human creator's vision.
- **Guiding Philosophy:** **Lean & Creator-Centric.** Do not over-complicate the production system with bureaucratic abstractions. Every folder, file, and field exists strictly for one purpose: **to directly enrich the prompt fed into Google Flow and ensure visual/audio consistency.**

---

## 2. Multi-Session Continuity & Context Loading Protocol

This workspace is accessed across different devices, workstations, and conversation sessions. Every agent entering this repository **MUST** follow this protocol to conserve context tokens while maintaining total information control:

1. **Read This File First:** `AGENTS.md` is the living ground truth of project status, design decisions, and active roadmap.
2. **Context Loading Economy (Never Read Everything):**
   - **Research Directory:** Strictly follow [`research/structure.md`](./research/structure.md). **DO NOT** load `research/raw_contents/` or `research/raw_notes/` (~65k tokens). Only read targeted files in [`research/synthesis/`](./research/synthesis/) on demand.
   - **Discussions Directory:** Read active consolidated summaries in [`discussions/`](./discussions/) (`architecture.md`, `visual_and_style.md`, `characters.md`).
   - **`discussions/_raw/` (Cold Archive):** **DO NOT** load `discussions/_raw/` by default. It contains all 27 original raw conversational logs, reserved strictly as an audit trail if information seems missing or when deep troubleshooting is needed.
3. **Always Record Progress in Files:**
   - Any consensus, decision, requirement, or architectural change reached during a chat **MUST be documented in files** before concluding the turn or session.
   - **Mandatory Raw Discussion Logging (Feature Updates Only):** Only create a corresponding raw discussion file in `discussions/_raw/` when a **new feature, architectural concept, major specification change, or design decision** is discussed and established. Do NOT create raw files for routine prompt tweaks, minor back-and-forth edits, or casual conversational iterations. This keeps the archive high-signal and uncluttered.
   - If work was done in session X (e.g. PC 1) and pushed, session Y (e.g. PC 2) must be able to read the files and immediately resume with identical context and reasoning.
4. **Never Run Non-Read-Only Git Commands:**
   - Per user rule: Never `git add`, `git commit`, or push unless explicitly requested.

---

## 3. Current Project State & Roadmap

| Phase | Description | Status | Authoritative Output / Specs | Discussion & Logs |
|---|---|---|---|---|
| **Phase 1–4** | Comprehensive Research, Synthesis & Validation | ✅ **COMPLETE** | [`research/synthesis/`](./research/synthesis/) | [`research/structure.md`](./research/structure.md), [`research/validation.md`](./research/validation.md) |
| **Phase 5: Core Domain Primitives** | Visuals, Subjects, Sceneries, Cinematography & Audio | ✅ **FINALIZED** | [`01_visual`](./production_framework/specs/01_visual_spec.md), [`02_subject`](./production_framework/specs/02_subject_spec.md), [`03_scenery`](./production_framework/specs/03_scenery_spec.md), [`04_cinematography_audio`](./production_framework/specs/04_cinematography_audio_spec.md) | [`discussions/`](./discussions/) |
| **Phase 6: Director's Cut & Assembly** | Script Slicing, Temporal Pacing (4s/6s/8s/10s), Multi-Character Clean Singles, Spatial Handoffs, Dynamic J/L Audio Bridges, Pluggable Styles | ✅ **FINALIZED** | [`05_directors_cut_assembly`](./production_framework/specs/05_directors_cut_assembly_spec.md), [`styles/`](./production_framework/styles/) | [`discussions/directors_cut_and_assembly.md`](./discussions/directors_cut_and_assembly.md) |

| **Phase 7: Project Scaffolding** | Lean Folder Scaffold & Universal Template | ⏳ Pending | `production_template/` | TBD |
| **Phase 8: Automation Skill & Linters** | Python Compilers, Linters (L-01 to L-11), Flow Timeline Manifest Export | ⏳ Pending | Tooling & Skill code | TBD |

---

## 4. Documentation Architecture: Specifications vs. Discussions vs. Archives

To prevent token bloat while retaining 100% information control:
1. **`production_framework/specs/` (Authoritative Production Deliverables):**
   - Clean, standardized specification files produced upon concluding each domain discussion (e.g. `01_visual_spec.md`). Contains the final file contracts, templates, and rules ready for implementation.
2. **`discussions/` (Active Consolidated Summaries):**
   - High-density active working records capturing why decisions were made, failure modes tested, and empirical AI model glitches discovered (`architecture.md`, `visual_and_style.md`, `characters.md`).
3. **`discussions/_raw/` (Cold Historical Archive):**
   - Contains all 27 original, sequential discussion files. Kept on disk for audit trail and deep debugging. Agents do NOT load this folder during routine turns.
4. **`research/` (Knowledge Base & Cold Scrapes):**
   - Organized per [`research/structure.md`](./research/structure.md). `synthesis/` is active on demand; `raw_contents/` and `raw_notes/` remain archived.
5. **`AGENTS.md` (Cross-Session Ground Truth):**
   - Living map connecting discussions, specs, and next tasks across PC workstations.

---

## 5. Decision & Discussion Log

### 2026-10-22 — Alignment on Simplicity & Session Handoff
- **Context:** User clarified that the framework must not be over-complicated. The sole goal is high-quality Flow prompts reflecting creator vision.
- **Action Taken:** Created `AGENTS.md` as the unified cross-session memory file. Established session handoff logging protocol.

### 2026-10-22 — Mode-Based Skill Architecture (OpenSpec Paradigm)
- **Consensus Reached:** The skill will be organized into standalone operational modes: `explore`, `propose`, `sync`, `apply`.
- **Session Independence:** Each mode writes its state and artifacts directly into files. Finishing `explore` in Session 1 allows Session 2 on another PC to immediately pick up `propose` without chat history loss.
- **Reference Document:** [`discussions/architecture.md`](./discussions/architecture.md).

### 2026-10-22 — Theme & Style Baseline (The Root Visual DNA)
- **Consensus Reached:** Before characters, sceneries, or shots are designed, the project must establish a single **Theme / Visual Style Baseline** (Ultra-realistic, 3D CGI, 2D Anime, Vintage Film, etc.).
- **Synchronization Principle:** This baseline produces a locked Master Style Anchor String that is deterministically injected into every prompt (character sheets, scenery boards, video clips) to guarantee visual cohesion across the entire project.
- **Reference Document:** [`discussions/visual_and_style.md`](./discussions/visual_and_style.md).

### 2026-10-22 — The `visual/` Domain & "Regular Person" Translation Bridge
- **Consensus Reached:** Name this foundational domain `visual/` containing simple markdown files (`style_summary.md`, `technical_anchor.md`, `palette_and_mood.md`).
- **Creator UX Principle:** Never force creators to know technical cinematography jargon (e.g. "Kodak 5219", "chiaroscuro", "anamorphic 2x"). The creator describes what they envision in normal human words; the agent confirms in simple terms, then automatically writes the exact, robust, machine-level Flow prompt anchors under the hood.
- **Reference Document:** [`discussions/visual_and_style.md`](./discussions/visual_and_style.md).

### 2026-10-22 — Google Flow Prompt Translation Mechanics
- **Consensus Reached:** Flow orchestrates Veo 3.1, which operates on an asymmetric token attention decay curve:
  1. Tokens 1–30: Viewport framing & primary subject anchor (highest weight).
  2. Tokens 31–80: Single biomechanical action & motivated lighting vectors.
  3. Tokens 81–130: Visual style anchor & single camera verb.
  4. Trailing block: Audio soundscape (`Audio: foley, ambience, no background music`).
- **Word Economy:** Strictly bounded between 100–150 words.
- **Reference Document:** [`discussions/visual_and_style.md`](./discussions/visual_and_style.md).

### 2026-10-22 — Discovery: The "Camera Equipment Hallucination Trap"
- **Critical Empirical Finding:** Writing equipment nouns like `"on locked tripod"` or `"camera on tripod"` causes Gemini / Veo to literally render a physical camera/tripod in the shot pointed at the actor!
- **Strict Rule Enforced:** NEVER use physical equipment nouns (`tripod`, `dolly track`, `crane rig`). ALWAYS use perspective & kinematic adjectives (`Locked-off eye-level framing, completely static shot with zero camera movement`, `Slow push-in toward subject`).
- **Reference Document:** [`discussions/visual_and_style.md`](./discussions/visual_and_style.md).

### 2026-10-22 — Decoupling: Configuration Settings vs. Prompt Text
- **Consensus Reached:** Google Flow, Veo 3.1, and Gemini Omni control technical parameters (`aspect_ratio`, `resolution`, `duration_seconds`, `reference_images`, `last_frame`) strictly via the **configuration object / UI dropdowns**, NOT via prompt text tokens.
- **Prompt Purity Rule:** Never append `"16:9, 1080p, 24fps, 8s"` inside the text prompt. This wastes token attention and can cause artifacting. The prompt is kept 100% pure creative cinematography; technical specs are tracked in the shot's configuration block.
- **Reference Document:** [`discussions/visual_and_style.md`](./discussions/visual_and_style.md).

### 2026-10-22 — Simulation: Post-War Aftermath ("Traumatic Aftermath")
- **Simulation Tested:** Input vibe *"Aftermath of a war fight... semi dramatic effect... post war traumatic effect"* successfully converted through the translation bridge:
  1. Human-facing explanation in plain English.
  2. Generated `visual/style_summary.md`, `palette_and_mood.md`, and `technical_anchor.md`.
  3. Synthesized locked Master Style Anchor string (`Shot on 35mm film stock, organic fine grain, bleach bypass desaturated color grading...`).
  4. Demonstrated end-to-end 136-word compiled Flow prompt with pure cinema kinematics and zero equipment nouns.
- **Reference Document:** [`discussions/visual_and_style.md`](./discussions/visual_and_style.md).

### 2026-10-22 — Decision: Photo-First Validation Protocol
- **Consensus Reached:** Video generation consumes heavy compute credits and has high latency. From now on, all prompt testing, visual style experiments, character looks, and lighting checks will be validated using **Still Photo Generation (Imagen 4 / Nano Banana / Image tools)**.
- **Production Alignment:** In Google Flow, still photos serve a dual purpose: they cost pennies to test AND become the exact reference images ("Ingredients") uploaded to lock character faces and style before rendering video.
- **Reference Document:** [`discussions/visual_and_style.md`](./discussions/visual_and_style.md).

### 2026-10-22 — Finalized Specification: `visual/` Domain
- **Milestone Reached:** Successfully concluded all discussions on visual style, prompt mechanics, and translation bridges.
- **Final Output Document:** Generated authoritative specification [`production_framework/specs/01_visual_spec.md`](./production_framework/specs/01_visual_spec.md) covering file contracts, templates, and the 6 master style paradigms.

### 2026-10-22 — Character Turnaround Architecture (User Photo + Custom Wardrobe)
- **Consensus Reached:** When a creator provides their own photo, the system generates a 4-view character turnaround model sheet on a single image (Front, Side, Back, Face close-up) on a solid neutral light-gray background (`#E5E5E5`).
- **Strict Facial Lock:** The prompt treats facial geometry, jawline, eye shape, and nose contours as unchangeable hard constraints.
- **Anime / Cosplay Deconstruction:** Pop-culture references (e.g. "Darling in the Franxx mecha suit", "Kakashi outfit", "Zero Two") are automatically expanded into physical garment descriptors (materials, piping, armor plates, collars) to prevent AI hallucination.
- **Reference Document:** [`discussions/characters.md`](./discussions/characters.md).

### 2026-10-22 — Discovery & Fix: The "Action Figure" Trap (Natural Human Fit & Style Harmony)
- **Empirical Finding:** Merely locking the face while asking for a mecha/anime suit causes diffusion models to render a plastic toy/action figure with a human head slapped on it.
- **The Fix:**
  1. **Full-Body Biological Inheritance:** Explicitly anchor the real person's natural body build, shoulder-to-hip proportions, and posture from the photo.
  2. **Wearable Movie Wardrobe:** Describe outfits as tailored, flexible cinematic movie costumes (flexible neoprene, articulated lightweight composite plates conforming to real torso curves, organic fabric drape) rather than rigid toy parts.
  3. **Strict Toy Banning:** Explicitly ban action figures, plastic ball joints, dolls, and 3D miniatures.
  4. **Style Harmonization:** If target is Anime, translate both face and body into unified 2D hand-drawn cel art. If target is Live Action, render a living human actor in tailored movie costume.
- **Reference Document:** [`discussions/characters.md`](./discussions/characters.md).

### 2026-10-22 — Known Open Challenge: Person-to-Character Face & Body Drift
- **Issue Logged:** In Image-to-Image photo-to-character conversion, models still exhibit:
  1. *Subtle Facial Drift:* Face geometry/features slightly alter or stylize away from true likeness.
  2. *Body Structure / Size Inconsistency:* Torso proportions and musculoskeletal scale do not always 1:1 match the real person.
- **Status:** Logged for deep-dive refinement later (potential solutions: 2-step single portrait anchor -> full turnaround, or explicit biometric descriptors).
- **Reference Document:** [`discussions/characters.md`](./discussions/characters.md).

### 2026-10-22 — Two-Step Character Genesis & Turnaround Architecture
- **Consensus Reached:** Solved the 1-step diffusion failure (split token attention causing facial drift across panels from pure text) by instituting a mandatory 2-step architecture:
  1. *Step 1 (Genesis Hero Shot):* Direct 100% of latent diffusion attention into creating a single, definitive living human persona with locked traits and physical wardrobe materiality.
  2. *Step 2 (Profile Conversion Sheet):* Convert the approved single image into a 4-view model sheet (Front, Side, Back, Face close-up) rotated on an invisible turntable on a solid `#E5E5E5` studio background.
- **Simulation Tested:** Successfully verified with original character Maya Lin (35mm war aftermath medic).
- **Reference Document:** [`discussions/characters.md`](./discussions/characters.md) and [`discussions/_raw/12_two_step_character_genesis_and_turnaround.md`](./discussions/_raw/12_two_step_character_genesis_and_turnaround.md).

### 2026-10-22 — Character Generalizability Across Styles & Edge Case Mitigation
- **Consensus Reached:** The 2-step character turnaround architecture is medium-agnostic and universally valid across Live-Action, 2D Cel Anime, Stylized 3D CGI, Mecha/Armor, and Non-Human Creatures.
- **Edge Case Guards Established:**
  1. *Asymmetry Glitch:* Explicitly bind scars/eyepatches to specific perspective panels (e.g. Panel 2 Left Profile) to prevent bilateral mirroring.
  2. *Detachable Props:* Strictly enforce empty hands and holstered gear in turnaround sheets; weapons belong in secondary prop sheets.
- **Reference Document:** [`discussions/characters.md`](./discussions/characters.md) and [`discussions/_raw/13_character_turnaround_generalizability_and_edge_cases.md`](./discussions/_raw/13_character_turnaround_generalizability_and_edge_cases.md).

### 2026-10-22 — Finalized Specification: `characters/` Domain
- **Milestone Reached:** Successfully concluded all discussions on character creation, reference turnaround sheets, and in-prompt audio direction.
- **Scoping Consensus:** Multi-character scene staging deferred to Cinematography & Shots (Phase 5.4); character domain focuses strictly on individual identity assets and vocal profiles.
- **Final Output Document:** Generated authoritative specification [`production_framework/specs/02_character_spec.md`](./production_framework/specs/02_character_spec.md) covering file contracts, templates, the 2-step genesis workflow, and the 5-medium adaptation matrix.

### 2026-10-22 — Open Investigation (Scratchpad): Broadening Framework Beyond Cinema (Archetypes)
- **Insight Logged:** Flow generates all video types (commercials, products, TikTok/reels, documentaries, music visualizers), not just movies.
- **Hypothesis:** Generative primitives (`visual/`, `subjects/`, `environments/`, `kinematics/`, `audio/`) remain 100% shared, but scaffolding should support Project Archetypes (Cinema vs. Commercial vs. Social B-Roll vs. Documentary) so non-movie creators don't face script/actor bloat.
- **Reference Document:** [`discussions/_raw/15_project_archetypes_and_scope_expansion.md`](./discussions/_raw/15_project_archetypes_and_scope_expansion.md).

### 2026-10-22 — Top-Level Intent Manifest & Living Collaboration Blueprint (Discussion 16)
- **Consensus Reached:**
  1. *AI-Friendly Operating System:* Creators do not browse nested subfolders; the AI Agent is the operating system, and the file system is the AI's deterministic memory and prompt assembly line.
  2. *Top-Level Project Intent (`project_intent.md`):* Sits at project root locking Archetype (Cinema, Commercial, Social, Doc, Music), format, and scope guardrails to prevent model hallucination.
  3. *Living Collaboration Blueprint (`blueprint.md`):* Active, living scratchpad at project root recording chronological steps: Creator Input $\rightarrow$ Agent Interpretation $\rightarrow$ Actions Taken $\rightarrow$ Next Step. Provides total creator transparency and prevents context loss across agent sessions.
  4. *Unified Root Project Layout:* `<project_root>/` contains `project_intent.md`, `blueprint.md`, `visual/`, `subjects/`, `environments/`, and `shots/`.
### 2026-10-22 — Expanding Visual Paradigms to Commercial & Social UGC (Discussion 17)
- **Consensus Reached:** Expanded `01_visual_spec.md` to 8 Master Style Paradigms by adding:
  1. *Paradigm 7 (Commercial Tabletop Advertising):* Macro 100mm lens, razor-sharp edge definition, softbox diffusion, metallic rim highlights, high-contrast glossy grading.
  2. *Paradigm 8 (Social UGC & Mobile Video):* 4K mobile sensor aesthetic, natural ambient daylight, punchy vibrant saturation, banning artificial film halation and anamorphic flares.
- **Spec Validation:** Successfully tested end-to-end commercial watch simulation (Chrono-X) against all 6 pre-flight linters (105 words, 100% pass) and verified via Photo-First image generation.
- **Reference Document:** [`discussions/_raw/17_expanding_visual_paradigms_commercial_and_social.md`](./discussions/_raw/17_expanding_visual_paradigms_commercial_and_social.md) and [`production_framework/specs/01_visual_spec.md`](./production_framework/specs/01_visual_spec.md).

### 2026-10-22 — Testing Visual Spec & Interstellar Optical Side-Profile (Discussion 18)
- **Consensus Reached:** Tested `01_visual_spec.md` with high-stakes fighter pilot helmet nuclear reflection concept. Successfully proved the Dual-Layer Translation Bridge by translating creator's plain-English *Interstellar* black-hole reference into an anamorphic 3/4 side-profile optical reflection prompt (114 words, 100% linter pass).
- **Reference Document:** [`discussions/_raw/18_testing_visual_spec_pilot_nuclear_reflection.md`](./discussions/_raw/18_testing_visual_spec_pilot_nuclear_reflection.md).

### 2026-10-22 — Generalizing Characters to Universal Subjects (Discussion 19)
- **Consensus Reached:** Expanded `02_character_spec.md` into the universal **`subjects/`** specification. Proved that commercial hero products (watches, sneakers, vehicles) suffer from identical drift as human faces and require the exact same 2-Step Turntable Protocol on `#E5E5E5` (Front, 90° profile with crown asymmetry lock, 45° isometric, macro texture).
- **Reference Documents:** [`discussions/_raw/19_generalizing_characters_to_universal_subjects.md`](./discussions/_raw/19_generalizing_characters_to_universal_subjects.md) and [`production_framework/specs/02_character_spec.md`](./production_framework/specs/02_character_spec.md).

### 2026-10-22 — Two-Tier Specification Architecture: Preserving Full Research Depth (Discussion 20)
- **Consensus Reached:** To prevent loss or compression of rich research tokens, we decoupled into two interconnected specifications:
  1. *Master Universal Subject Spec ([`02_subject_spec.md`](./production_framework/specs/02_subject_spec.md)):* Governs the `subjects/<subject_id>/` primitive across archetypes, defining Commercial Hero Products, Vehicles, Artifacts, and the 4-panel product turntable on `#E5E5E5`.
  2. *Deep Character Bible ([`02_character_spec.md`](./production_framework/specs/02_character_spec.md)):* 100% restored and preserved in its full depth (Maya Lin 2-step genesis, facial bone structure, hair, cosplay deconstruction engine, action figure trap fixes, and spoken dialogue syntax).
- **Reference Documents:** [`discussions/_raw/20_preserving_depth_subject_vs_character_specialization.md`](./discussions/_raw/20_preserving_depth_subject_vs_character_specialization.md), [`production_framework/specs/02_subject_spec.md`](./production_framework/specs/02_subject_spec.md), and [`production_framework/specs/02_character_spec.md`](./production_framework/specs/02_character_spec.md).

### 2026-10-22 — Creator UX Intent Rule: Single Hero Shot vs. Profile Turnaround Sheet (Discussion 22)
- **Consensus Reached:** Codified the rule into `02_character_spec.md` (Section 4.0) and `02_subject_spec.md` (Section 6.0):
  1. *Default Delivery (Hero Shot):* Unless the creator explicitly uses terms like `"profile"`, `"character profile"`, or `"model sheet"`, the Agent **MUST default to generating a single cinematic Hero Shot (`hero_prompt.txt`)** in an expressive pose with a motivated environment.
  2. *Conditional Delivery (4-Panel Sheet):* The technical 4-view turnaround sheet on `#E5E5E5` (`turnaround_prompt.txt`) is only generated when explicitly requested by name or during Flow sync mode to produce Ingredient #1.
- **Reference Document:** [`discussions/_raw/22_creator_intent_hero_image_vs_profile_sheet.md`](./discussions/_raw/22_creator_intent_hero_image_vs_profile_sheet.md), [`production_framework/specs/02_character_spec.md`](./production_framework/specs/02_character_spec.md), and [`production_framework/specs/02_subject_spec.md`](./production_framework/specs/02_subject_spec.md).

### 2026-10-22 — Facial Landmark Invariance & Expression Decoupling Engine (Discussion 23)
- **Consensus Reached:** Solved the Image-to-Character facial drift issue where models substitute generic AI faces or freeze expressions. Enforced:
  1. *Biological Landmark Invariance:* Mandatory anchoring of zygomatic arches (cheekbones), nose bridge contours, jawline angle, and eyelid folds in the first 20 tokens.
  2. *Expression Decoupling Engine:* Explicitly separating immutable bone anatomy from mutable expressions (`Retain 100% of the woman's authentic facial bone structure and facial landmarks from the reference photo, but dynamically animate her expression into...`).
- **Reference Document:** [`discussions/_raw/23_facial_landmark_locking_and_dynamic_expression.md`](./discussions/_raw/23_facial_landmark_locking_and_dynamic_expression.md) and [`production_framework/specs/02_character_spec.md`](./production_framework/specs/02_character_spec.md).

### 2026-10-22 — Headshot-to-Full-Body Extrapolation Engine (Discussion 24)
- **Consensus Reached:** Codified the 4-operation pipeline for face-only reference photos when generating full-body turnaround model sheets:
  1. *Facial Anchor:* Lock invariant facial bone structure (cheekbones, jaw, nose, eyes) from reference photo.
  2. *Biometric Body:* Generate realistic musculoskeletal proportions from text description (18–20yo slim female, fair skin).
  3. *Downward Wardrobe Extrapolation:* Continue the upper collar/textile downwards into matching tailored pleated skirt/trousers, belt, and boots.
  4. *Explicit Profile Sheet Routing:* When creator explicitly asks for "character profile" or "3/4 panels", route to 4-view turnaround on `#E5E5E5` (`turnaround_prompt.txt`).
- **Reference Document:** [`discussions/_raw/24_headshot_to_full_body_turnaround_extrapolation.md`](./discussions/_raw/24_headshot_to_full_body_turnaround_extrapolation.md) and [`production_framework/specs/02_character_spec.md`](./production_framework/specs/02_character_spec.md).

### 2026-10-22 — Backlog Item: Deep Face Syncing & Likeness Retention (Discussion 25)
- **Problem Logged:** When a creator provides a reference photo, current multimodal models (Gemini/Imagen/Veo) still exhibit subtle facial drift, idealized AI face substitution, or likeness dilution caused by competing costume/aesthetic tokens.
- **Decision Reached:** Formally recorded as a high-priority return item. Planned investigations include:
  1. *Isolated 2-Step Face Transfer:* Locking bare biometric landmarks on a neutral 85mm portrait before styling.
  2. *Granular Anatomical Biometrics:* Formalizing eyelid creases, epicanthic folds, nasal dorsum, and mandibular angles.
  3. *Flow Ingredient Conditioning:* Testing Ingredient #1 image conditioning weight against text tokens.
- **Reference Document:** [`discussions/_raw/25_backlog_face_sync_fidelity_with_reference_image.md`](./discussions/_raw/25_backlog_face_sync_fidelity_with_reference_image.md) and [`discussions/characters.md`](./discussions/characters.md).

### 2026-10-23 — Apocalyptic Beach Scenery Simulation & Translation Bridge (Discussion 26)
- **Consensus Reached:** Successfully validated the Dual-Layer Translation Bridge for complex environment direction without creator technical jargon:
  1. *3-Plane Spatial Parallax:* Layered into Foreground (serene man in shorts), Midground (fleeing beachgoers & reflective glass towers), and Background (fragmenting moon & rising oceanic surge).
  2. *Equipment Trap Banning:* Purged "drone shot", "someone is capturing", and "camera", replacing with optical geometry (`Wide-angle sideline perspective along a sweeping coastal beach...`).
  3. *Motivated Catastrophic Light:* Golden-amber incandescent sky glow casting long shadows and reflecting off skyscraper glass facades.
  4. *Diegetic Audio Formulation:* Synchronized oceanic roar, sonic rumbles, muffled shouts, and wind, terminating with `, no background music`.
- **Reference Document:** [`discussions/_raw/26_apocalyptic_beach_scenery_simulation.md`](./discussions/_raw/26_apocalyptic_beach_scenery_simulation.md) and [`discussions/sceneries.md`](./discussions/sceneries.md).

### 2026-10-23 — Scenery Refinement: Corner Vantage & Horizon Curvature (Discussion 27)
- **Consensus Reached:** Refined scenery perspective based on creator feedback:
  1. *Corner Elevated Vantage:* Replaced sideline beach view with an elevated corner viewpoint capturing the wide curvature of the entire coastline meeting the sea horizon.
  2. *Character Pose:* Placed in lower foreground seen from behind with hands casually in pockets.
  3. *Kinetic Vector:* Panicked crowds fleeing inland toward city boardwalk exits away from the rising water.
  4. *Oceanic Impact:* Moon fragments impacting open water far offshore before mainland landfall.
  5. *Validation:* Verified via photo-first generation (`apocalyptic_beach_corner_view`).
- **Reference Document:** [`discussions/_raw/27_scenery_refinement_wide_corner_perspective.md`](./discussions/_raw/27_scenery_refinement_wide_corner_perspective.md) and [`discussions/sceneries.md`](./discussions/sceneries.md).

### 2026-10-23 — Architectural Decoupling: Image Mode vs. Video Mode Prompts
- **Consensus Reached:** The compiler must strictly distinguish between still image generation and video clip generation based on creator intent:
  1. *Still Image Prompts (Imagen 4 / Midjourney / Reference Plates):* When a creator asks for an "image", "photo", "still", or "mood board", the prompt compiler outputs pure visual and optical direction (framing, subject, lighting, textures, 35mm aesthetics). It **strictly excludes** camera kinematics (`Slow push-in`, `tracking shot`) and the trailing `Audio:` soundscape block.
  2. *Video Shot Prompts (Google Flow / Veo 3.1):* When creating video shots, camera kinematics and the synchronized `Audio:` soundscape block are included.
- **Raw File Retention Policy Clarified:** New `discussions/_raw/` files are reserved strictly for major feature updates and architectural decisions, avoiding clutter for routine prompt tweaks.
### 2026-10-23 — Continuous Causal Flow vs. Timestamp Prompting (Veo / Runway / Kling)
- **Consensus Reached:** Explicitly banned timestamp-based prompting (`0-2s: ... \n 2-4s: ...`).
  1. *No Internal Clock:* Video diffusion models treat timestamps as literal text tokens, often causing temporal blending glitches or text watermark hallucinations.
  2. *Causal Narrative Flow:* Video prompts must be structured as a single continuous prose paragraph with transitional adverbs (*"Starting from..."* $\rightarrow$ *"the perspective executes..."* $\rightarrow$ *"quickly snapping into locked focus..."*).
  3. *Single-Shot Rule:* 5–8s clips must contain a single coherent motion arc; multi-shot storytelling relies on terminal-frame / first-frame chaining.
- **Reference Document:** [`discussions/sceneries.md`](./discussions/sceneries.md).

### 2026-10-23 — Production-Grade Stick Figure Explainer & Unified Gemini Prompting (Discussion 28)
- **Consensus Reached:** Creator directed lifting word-count limits and single-paragraph constraints to craft a complete, single copy-paste prompt for Gemini that unifies visuals, camera movements, character choreography, dialogue, and audio soundscapes.
  1. *Production Explainer Standard:* Elevated 2D stick figure animation into prestige educational/psychological explainers (The Spotlight Effect).
  2. *Integrated Dialogue Track:* Spoken lines with vocal delivery modifiers and timestamp sync embedded directly alongside visual/foley cues.
  3. *Validation:* Verified via 9:16 Photo-First keyframe generation (`spotlight_effect_explainer`) and compiled into a single copy-paste prompt for Gemini.
### 2026-10-23 — High-Speed Commercial Cinematography & Orbital Wrap-Around (Discussion 29)
- **Consensus Reached:** Solved the commercial multi-angle showcase dilemma (Front $\rightarrow$ Side $\rightarrow$ Back $\rightarrow$ Macro) without triggering jump-cut warping or equipment hallucinations.
  1. *Continuous Orbital Arc:* Formulated the motion as a single continuous 360-degree wrap-around trajectory with speed ramping rather than discrete jump cuts.
  2. *Robotic CineBot Emulation:* Stripped mechanical rig nouns to prevent AI hardware hallucinations, prompting pure optical velocity and rotational deceleration.
  3. *Validation:* Verified via 100mm macro Photo-First generation (`commercial_chrono_cinematography`) and established `discussions/cinematography_audio.md`.
### 2026-10-23 — Spoken Dialogue Architecture & Natural Lip-Sync Restraint (Discussion 31)
- **Consensus Reached:** Solved the AI video "Muppet Mouth / Rubber Jaw" distortion by locking a 4-step biomechanical constraint protocol:
  1. *Viewport Lock:* Mandated locked-off Medium Close-Up (MCU) for spoken dialogue to prevent motion vectors from tearing facial latents.
  2. *Biomechanical Keywords:* Required explicit mouth kinematics: `minimal jaw displacement`, `subtle lip articulation`, `relaxed jaw`, and `restrained conversational mouth movement`.
  3. *Punctuation Cadence Hack:* Enforced periods to trigger bilabial resting closures and commas for micro-breaths, limiting lines to 1–2 short sentences.
### 2026-10-23 — Multi-Track Audio Mixing & Dialogue Balance (Discussion 32)
- **Consensus Reached:** Codified the 4-tier Virtual Soundboard mix for simultaneous dual-stream audio synthesis:
  1. *Acoustic Layering:* Tier 1 (Close-mic dialogue) $\rightarrow$ Tier 2 (Tactile Foley SFX) $\rightarrow$ Tier 3 (Ambient room tone) $\rightarrow$ Tier 4 (Background music score).
  2. *Music Mix Placement:* Solved music drowning out speech by requiring explicit `low-in-the-mix` declarations with named instruments and tempo (e.g. `slow-tempo cello pad and sparse Rhodes piano chords, zero drums`).
  3. *Validation:* Verified via Photo-First 85mm dialogue render (`diner_dialogue_cinematography`) and recorded in `discussions/cinematography_audio.md`.
### 2026-10-23 — Upfront Music Scores & The Audio Transition Beat-Drop (Discussion 33)
- **Consensus Reached:** Tested Mode C (Upfront Score) featuring an acoustic transition (muffled low-pass rain $\rightarrow$ full-frequency explosive synthwave beat-drop) synchronized with camera kinematics and character action.
  1. *Score Orchestration:* Driving 128 BPM electronic synthwave with 808 kick, metallic snare, analog bassline, and sub-bass drop.
  2. *Validation:* Verified via 35mm Photo-First generation (`cyberpunk_audio_beatdrop`) and recorded in `discussions/cinematography_audio.md`.
### 2026-10-23 — Optical Rack Focus (Focal Plane Shift / Focus Pull) (Discussion 34)
- **Consensus Reached:** Solved the diffusion failure mode where models split screens or freeze focus when asked for a "rack focus".
  1. *Optical Z-Axis Formula:* Mandated a 3-state formula: Start State (sharp foreground A, creamy circular bokeh background B) $\rightarrow$ Continuous Focal Plane Translation (camera stationary, focal plane pulls deeper) $\rightarrow$ End State (foreground A smoothly defocuses as background B snaps into razor-sharp optical clarity).
  2. *Validation:* Verified via 85mm Photo-First generation (`rack_focus_simulation_1792767270214.jpg`) and recorded in `discussions/_raw/32_rack_focus_and_unified_grand_simulation.md`.
### 2026-10-23 — Finalized Specification: `cinematography_audio/` Domain & Master Unified Simulation (Discussion 35)
- **Milestone Reached:** Successfully synthesized all research findings of Phase 5.4 into a single, master unified prompt:
  1. *Cinematics & Optics:* 85mm anamorphic prime at f/2.0, locked-off eye-level MCU framing with zero equipment nouns.
  2. *Anti-Muppet Lip Restraint:* Mandated `relaxed jaw, minimal jaw displacement, subtle lip articulation` and controlled attribution.
  3. *Punctuation Cadence Hack:* Two short sentences split by a period to force natural bilabial mouth closures.
  4. *Complete 4-Tier Virtual Soundboard Mix:* Tier 1 (Close-mic dialogue) + Tier 2 (Radio dial click & canvas rustle) + Tier 3 (Subterranean rain & generator hum) + Tier 4 (Low-in-the-mix cello drone & sub-bass pad).
  5. *Validation:* Verified via Photo-First generation (`grand_cinematography_audio_simulation_1792767365212.jpg`).
  6. *Authoritative Deliverable:* Produced and finalized [`production_framework/specs/04_cinematography_audio_spec.md`](./production_framework/specs/04_cinematography_audio_spec.md).
### 2026-10-24 — Phase 6: Creator Intake Interactivity & Temporal Action Budgeting (Discussion 34)
- **Consensus Reached:** Codified the Golden Intake Rule: never assume runtime or pacing.
  1. *Intake Interview:* If pacing is ambiguous, Agent directly asks for target length, tempo archetype (Hyper 3–4s, Dynamic 5s, Dramatic 8s, Atmospheric 10s), and clip budget.
  2. *Mathematical Speech Velocity:* Natural conversational pacing (~2.2 words/sec) with mandatory 0.8s–1.2s silence buffers before and after speech.
  3. *The Single-Motion Law:* Exactly ONE primary biomechanical action and ONE continuous camera trajectory per clip to eliminate diffusion collapse.
  4. *Director's Scratchbook Schema (`scratchbook.md`):* Unified pre-production ledger mapping beats, words, actions, and chaining.
- **Reference Document:** [`discussions/_raw/34_narrative_pacing_intake_and_temporal_slicing.md`](./discussions/_raw/34_narrative_pacing_intake_and_temporal_slicing.md).

### 2026-10-24 — Master Subject DNA Invariance & Multi-Clip Continuity Chaining (Discussion 35)
- **Consensus Reached:** Solved multi-clip subject mutation (e.g. skinny stick figure turning muscular, or character wardrobe shifting):
  1. *Verbatim DNA Injection:* Every clip prompt featuring a subject must inject the exact immutable Subject Anchor String into tokens 10–35. Banned loose pronouns (*"he"*, *"the figure"*).
  2. *Mode 1 (Continuous Shot Extension):* Uses `last_frame` seed + velocity matching + *"Continuing directly from the initial frame..."* syntax.
  3. *Mode 2 (Motivated Cut / Angle Change):* Preserves shared `#E5E5E5` ingredient pin, 180° screen direction, and identical motivated lighting vectors.
- **Reference Document:** [`discussions/_raw/35_subject_dna_invariance_and_continuity_chaining.md`](./discussions/_raw/35_subject_dna_invariance_and_continuity_chaining.md).

### 2026-10-24 — Default Google Flow Baseline & Dynamic Modality Switches (Discussion 36)
- **Consensus Reached:** Default to standard Google Flow Native (sliced Veo video + native audio), with non-destructive mid-production switches:
  1. *Visual Override (`images`):* Strips kinematics & audio for still photography plates (Imagen 4 / Midjourney).
  2. *Assembly Override (`monolithic`):* Fuses separate beats into a single continuous long-take prompt (Seedance / Sora).
  3. *Dialogue Override (`elevenlabs`):* Strips dialogue audio from Veo prompt (prevents double-speech) and outputs clean `dialogue_scripts.md` manifest with timing buffers.
  4. *Music Override (`external`):* Purges score synthesis from `Audio:` (`zero background music, no score`), leaving pure diegetic foley and room tone.
- **Reference Document:** [`discussions/_raw/36_default_flow_and_dynamic_modality_switches.md`](./discussions/_raw/36_default_flow_and_dynamic_modality_switches.md).

### 2026-10-24 — Empirical Simulation & Finalized Specification (Discussion 37 & Deliverables)
- **Milestone Reached:** Successfully tested the full Director's Cut engine on *The 2:17 AM Dispatch* (10-clip 80s psychological noir mystery):
  1. *Dual Delivery Output:* Formatted into both single copy-paste `master_flow_agent_prompt.txt` (for Google Flow Agent Mode) AND individual clip files (`clip_01.txt` ... `clip_10.txt`) for manual timeline users.
  2. *Photo-First Validation:* Verified visual style, subject DNA, and lighting vector via 35mm neo-noir keyframe generation (`detective_dispatch_keyframe`).
  3. *Dynamic Switch Verified:* Tested ElevenLabs dialogue manifest generation (`dialogue_scripts.md`) and external music muting.
  4. *Authoritative Deliverable:* Produced and finalized [`production_framework/specs/05_directors_cut_assembly_spec.md`](./production_framework/specs/05_directors_cut_assembly_spec.md).

### 2026-10-24 — Empirical Diffusion Glitches: Prop Popping, Mouth Sync & Micro-Beats (Discussion 38)
- **Problem Discovered in Real Generations:** Testing *The 2:17 AM Dispatch* in Google Flow revealed:
  1. *Accidental Lip-Sync:* Quoted dialogue while actor's face is on screen causes the model to animate the actor's lips, even if dialogue is an incoming phone whisper.
  2. *Prop Popping / Hand Morphing:* Mid-clip actions like drawing a revolver or casual flashlight carrying cause severe occlusion confusion and shape warping.
  3. *Temporal Multi-Event Cramming:* Packing 4–5 beats (door + corridor + head turn + clock) into 8 seconds creates frantic temporal warping and motion artifacts.
- **Architectural Laws Established to Fix:**
  1. *Closed-Lip Listener Rule:* Mandatory `"lips remain firmly closed, zero mouth movement"` on listening characters, attributing voice to off-screen speaker.
  2. *Pre-Materialized Prop Law:* Props must be declared `"already firmly grasped from Frame 1 to Frame End"`. Drawing weapons is strictly a cutaway edit, never a continuous diffusion animation.
  3. *Micro-Beat De-Cramming Law:* $1 \text{ Clip} = 1 \text{ Camera Trajectory} + 1 \text{ Spatial Plane} + 1 \text{ Micro-Action}$. Secondary storytelling beats (e.g. wall clock) must be isolated macro insert shots.
- **Reference Document:** [`discussions/_raw/38_empirical_glitches_prop_popping_mouth_sync_and_micro_beat_decramming.md`](./discussions/_raw/38_empirical_glitches_prop_popping_mouth_sync_and_micro_beat_decramming.md) and [`discussions/directors_cut_and_assembly.md`](./discussions/directors_cut_and_assembly.md).

---

## 6. Current Agenda (Phase 6: Director's Cut & Assembly Engine — UNDER DEVELOPMENT)

**Status:** 🟡 **UNDER DEVELOPMENT** (Active empirical testing, prompt de-cramming & physical glitch remediation).

### Remediations Executed:
1. **Re-Sliced into 11 Unhurried Micro-Clips:**
   - Multi-event cramming eliminated: 1 camera trajectory, 1 spatial focus, 1 micro-action per clip.
   - 2:17 AM wall clock separated into a dedicated macro insert shot ([`clip_02.txt`](./production_framework/directors_cut/individual_clips/clip_02.txt)).
2. **Closed-Lip Listener Rule Enforced:**
   - In Clips 04 and 08, Cross's lips are explicitly locked closed (`"firmly closed lips, tight jaw, zero mouth movement, does not speak"`) and dialogue attributed to off-screen earpiece speaker, ending accidental lip-syncing.
3. **Pre-Materialized Prop Law Enforced:**
   - Revolver in Clip 10 is declared pre-grasped from Frame 1; flashlight carrying eliminated in Clip 01 in favor of hands in pockets.
### 2026-10-24 — Cross-Medium Validation: Stick Figure Psychological Horror (Discussion 39)
- **Consensus Reached:** Tested all 3 laws on stylized 2D animation (*The Uncanny Reflection* — 10 micro-clips $\times$ 5s–7s):
  1. *Closed-Lip / Blank-Head Rule:* Stick figures feature blank circular heads with zero mouth/facial features; supernatural whisper is strictly off-screen audio, preventing facial deformation.
  2. *Pre-Materialized & Prop-Free:* Handled purely with minimalist linear vector strokes; doors are clean vertical line boundaries, eliminating object popping.
  3. *Micro-Beat De-Cramming:* Sliced into 10 unhurried micro-moments (e.g. stranger pointing arm is an isolated 6-second gesture).
  4. *Photo-First Validation:* Generated keyframe (`stick_horror_keyframe`).
  5. *Deliverables:* Created [`production_framework/stick_figure_horror/`](./production_framework/stick_figure_horror/) with `master_flow_agent_prompt.txt`, `individual_clips/`, `scratchbook.md`, and `origin_manifest.md`.
### 2026-10-24 — Image-First Video Production Pipeline & Motivational Rat Race (Discussion 40)
- **Consensus Reached:** Solved raw Text-to-Video noise hallucinations by formalizing the 2-step Image-First Video Production Pipeline:
  1. *Step 1 (Still Keyframe Prompt):* Generates pure optical starting frame plate (`image_prompt.txt`) via Imagen 4 / Midjourney / VideoFX, locking composition, lighting, and stick figure silhouettes with 100% precision.
  2. *Step 2 (Image-to-Video Motion Prompt):* Feeds the generated still as the initial starting frame (`video_prompt.txt`), animating pure camera kinematics, unhurried micro-actions, and audio.
  3. *Motivational Contrast Tested:* 2-clip *9-5 Rat Race* sequence contrasting mundane mechanical visuals (endless commute + cubicle typing) with an uplifting, warm, deep motivational voiceover and swelling grand piano / Rhodes chords.
  4. *Deliverables:* Created [`production_framework/rat_race_stick_figure/`](./production_framework/rat_race_stick_figure/) with `clip_01/` (`image_prompt.txt` + `video_prompt.txt`), `clip_02/`, `master_flow_agent_prompt.txt`, `scratchbook.md`, and `origin_manifest.md`.
- **Reference Document:** [`discussions/_raw/40_image_first_video_production_workflow.md`](./discussions/_raw/40_image_first_video_production_workflow.md).

### 2026-10-24 — Stick Figure Fingerless Vector Standard & Gemini 3.8 Flash TTS Syntax (Discussion 41)
- **Consensus Reached:** Solved two critical empirical roadblocks during end-to-end production of *The Phone Call at 2:47 AM*:
  1. *Hand & Feet Flesh Mutancy Glitch:* Diffusion models graft realistic 6-fingered fleshy clusters or knobby joints onto stick figures when prompts mention hands/feet. Enforced the **Strict Fingerless Vector Standard**: pure unbroken 2D line strokes ending in smooth rounded line-caps (`stroke-linecap: round`), with mandatory negative constraints (`strictly zero individual fingers, zero human hands, zero toes, zero knuckles`).
  2. *Light-Reveal Cream Canvas:* Replaced flat black voids and corporate whiteboards with a warm cream/off-white paper canvas (`#F8F6F0`) revealed dynamically under motivated light cones, falling off into deep pitch-black shadows (`#0A0B0E`). Head standard locked: solid white fill (`#FFFFFF`) with matching black contour (`#0F172A`).
  3. *Google AI Studio Gemini 3.8 Flash TTS Bracket Reading Bug:* Discovered that square brackets `[...]` are NOT stripped or parsed as tags by Gemini TTS, but read aloud verbatim. Codified the **Angle Bracket `< >` Syntax Standard**: `<short pause>`, `<long pause>`, `<whisper>` ... `</whisper>`, `<gasp>`, `<sigh>`, routing narrator tone into System Instructions. Added pre-flight linter **L-14**.
  4. *60-Second Viral Retention Pacing:* Compressed the bloated 3m45s timeline into a high-retention 62-second cut (138 words at ~2.2 words/sec, zero dead air) mapped to 10 high-impact micro-clips (`clip_01` to `clip_10`).
  5. *Deliverables:* Created [`production_framework/the_phone_call_at_247am/`](./production_framework/the_phone_call_at_247am/) with `base_image_prompt.txt`, `narrator_script.md`, `scratchbook.md`, `keyframe_preview.svg`, `clips/clip_01/` to `clip_10/`, and `master_flow_agent_prompt.txt`.
- **Reference Document:** [`discussions/_raw/41_stick_figure_fingerless_vector_dna_and_gemini_tts_syntax.md`](./discussions/_raw/41_stick_figure_fingerless_vector_dna_and_gemini_tts_syntax.md).

### 2026-10-24 — Dialogue-First Timing Loop & 3-Tier Image-First Pipeline (Discussion 42)
- **Consensus Reached:** Solved speech-to-video desynchronization and visual drift during Director's Cut assembly:
  1. *Dialogue-First Timing Feedback Loop:* Default to generating dialogue/narrator script first $\rightarrow$ creator generates audio in Gemini TTS / ElevenLabs and inputs actual timestamps/durations $\rightarrow$ video clips are sliced with exact temporal precision to fit real audio. The Agent explicitly asks the creator if they prefer Dialogue-First or Both Together.
  2. *The 3-Tier Image-First Pipeline:* Mandated `base_image_prompt.txt` (Tier 1 master style/DNA) $\rightarrow$ `clips/clip_XX/image_prompt.txt` (Tier 2 clip keyframe starting plate) $\rightarrow$ `clips/clip_XX/video_prompt.txt` (Tier 3 Image-to-Video motion prompt) to eliminate visual and character drift across multi-clip sequences.
  3. *Three Dialogue Modalities Formalized:* Native Flow In-Clip Dialogue, ElevenLabs Character Dubbing (`dialogue_scripts.md`), and Gemini 3.8 Flash TTS Narrator (`narrator_script.md` with Angle Bracket `< >` syntax).
  4. *Updated Specs:* Fully integrated into [`production_framework/specs/05_directors_cut_assembly_spec.md`](./production_framework/specs/05_directors_cut_assembly_spec.md).
- **Reference Document:** [`discussions/_raw/42_dialogue_first_timing_loop_and_three_tier_image_first_pipeline.md`](./discussions/_raw/42_dialogue_first_timing_loop_and_three_tier_image_first_pipeline.md).

### 2026-10-24 — Flow Native Durations, Pacing Profiles & Context Shift Rule (Discussion 43)
- **Consensus Reached:** Solved scenery stagnation, duration mismatches, and multi-context blending in Director's Cut assembly:
  1. *Google Flow Native Durations Locked:* Slicing calculations and linters strictly enforce Flow custom lengths: `[4s, 6s, 8s, 10s]`. All arbitrary intermediate lengths (3s, 5s, 7s) purged.
  2. *Creator Pacing Profiles:* Added creator intake choice between Dynamic Sync (4s–6s cuts, tight sync, frequent inserts) and Slow-Burn Monologue (8s–10s takes, atmospheric continuous camera kinematics).
  3. *The Mandatory Context Shift Rule:* No matter which pacing style is selected, whenever the narrative script undergoes a contextual shift (location, action shock, revelation, speaker shift), the visual context MUST cut to a new shot. An AI video cannot linger on stale visuals across narrative shifts.
  4. *The Anti-Stagnation Law & Visual Beat Archetypes:* Avoid sticking too long in a single visual viewpoint. Type A (Scene Shot, 4s–10s), Type B (Macro Insert, 4s/6s/8s), and Type C (Graphic / Text Plate, 4s/6s/8s) dynamically timed to narrative weight and line length.
  5. *Updated Specs:* Fully integrated into [`production_framework/specs/05_directors_cut_assembly_spec.md`](./production_framework/specs/05_directors_cut_assembly_spec.md).
- **Reference Document:** [`discussions/_raw/43_flow_native_lengths_pacing_modes_and_context_shift_rule.md`](./discussions/_raw/43_flow_native_lengths_pacing_modes_and_context_shift_rule.md).

### 2026-10-24 — Spatial Continuity, Multi-Character Clean Singles & Dynamic Audio Bridges (Discussion 44)
- **Consensus Reached & Staged:** Established three core directorial systems, documented in raw discussion and staged in [`Dump.md`](./Dump.md) pending spec implementation:
  1. *Spatial Continuity Handoffs:* Explicitly defining Clip $N$ Spatial Exit State and Clip $N+1$ Spatial Entry State, enforcing the 180° Screen Direction rule.
  2. *Multi-Character "Clean Single" Standard:* Banned dirty Over-the-Shoulder (OTS) shots to eliminate melting shoulders and identity bleeding; using clean Medium Close-Ups with complementary 15° eyelines and wide two-shot establishing plates.
  3. *Dynamic Context-Driven Audio Transitions:* J-Cuts (audio anticipatory pre-roll on incoming disruption) and L-Cuts (whispers/revelations decaying into the subsequent cut).
  4. *Staging Scratchpad Created:* Staged into [`Dump.md`](./Dump.md) (to be consumed into `05_directors_cut_assembly_spec.md` and deleted afterwards).
- **Reference Document:** [`discussions/_raw/44_spatial_continuity_handoffs_multi_character_staging_and_dynamic_audio_bridges.md`](./discussions/_raw/44_spatial_continuity_handoffs_multi_character_staging_and_dynamic_audio_bridges.md) and [`Dump.md`](./Dump.md).

### 2026-10-24 — Multi-Variation Synthesis, Pluggable Styles & Universal Stick DNA (Discussion 45)
- **Consensus Reached & Staged:** Cross-checked external YouTube/animation video prompting research (`MIGRATION_PROPOSAL.md` & `PDFCrossCheck.md`) and codified core architectural boundaries into [`Dump.md`](./Dump.md):
  1. *Pluggable Style Registry Scaffolding:* Approved for creation (`production_framework/styles/`). Strictly avoids "style on top of style" combinatorics by defining Universal Base Mediums (Live-Action, Commercial Tabletop, Universal Stick Figure) with genre/mood driven by lighting and kinematics.
  2. *Universal Stick Figure DNA:* Unified standard (`vector_stick_figure.md`) featuring unbroken lines, rounded line-caps, solid white circular head (`#FFFFFF`) with black contour (`#0F172A`), serving horror, comedy, and explainer formats alike.
  3. *Lean Causal Palette:* Adopted closed-set prop bounding (defining permitted props to eliminate AI clutter) with lightweight syntax.
  4. *Core Scope Retained:* Strictly focused on Google Flow (Veo 3.1); parked multi-engine chapters; excluded thumbnails/branding from video generation scope; retained Veo's 4-tier unified soundboard paragraph over rigid 3-track metadata tags.
  5. *Dynamic Narrative Scripting Principles:* Adapts dynamically to project archetype (no forcing hooks on cinema); uses Directorial Hook Instructions ("Zero Preamble", open cognitive loop) over rigid templates; flexible speech baselines (`2.0–2.2 wps` drama vs. `2.5–2.7 wps` explainer) with post-audio script compression loop.
  6. *All Staged in Dump.md:* Pending remaining research before creating final Phase 6 directories and consuming into specs.
- **Reference Document:** [`discussions/_raw/45_multi_variation_synthesis_pluggable_styles_and_universal_stick_dna.md`](./discussions/_raw/45_multi_variation_synthesis_pluggable_styles_and_universal_stick_dna.md) and [`Dump.md`](./Dump.md).

### 2026-10-24 — Consumption of Dump.md & Finalization of Phase 6 Spec (Director's Cut)
- **Milestone Reached:** Successfully cross-checked with industry video continuity research, consumed all staged research from `Dump.md` into authoritative specifications, and deleted `Dump.md`:
  1. *Lean Causal Palette:* Integrated Section 4.5 closed-set prop bounding into [`05_directors_cut_assembly_spec.md`](./production_framework/specs/05_directors_cut_assembly_spec.md).
  2. *Spatial Continuity Handoffs:* Integrated Section 5.6 defining Clip $N$ Spatial Exit State, Clip $N+1$ Spatial Entry State, 180° Screen Direction rule, and eyeline elevation matching.
  3. *Multi-Character Clean Singles:* Integrated Section 5.7 banning dirty OTS shots; using Wide Establishing Plates + Clean Singles with complementary 15° eyelines and speaker/listener decoupling.
  4. *Dynamic Context-Driven Audio Transitions:* Integrated Section 6.5 J-Cuts (sound anticipates cut) and L-Cuts (sound lingers across cut) for Native Flow audio and external narration/dialogue stems.
  5. *Linter L-15:* Added Screen Direction & Eyeline Consistency Linter.
  6. *Pluggable Style Registry Scaffolding:* Created [`production_framework/styles/`](./production_framework/styles/) with Universal Base Mediums ([`live_action_cinema.md`](./production_framework/styles/live_action_cinema.md), [`commercial_tabletop.md`](./production_framework/styles/commercial_tabletop.md), [`vector_stick_figure.md`](./production_framework/styles/vector_stick_figure.md)).
  7. *Temporary Scratchpad Consumed:* Deleted `Dump.md` cleanly.
- **Reference Document:** [`discussions/directors_cut_and_assembly.md`](./discussions/directors_cut_and_assembly.md) and [`production_framework/specs/05_directors_cut_assembly_spec.md`](./production_framework/specs/05_directors_cut_assembly_spec.md).


















