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
   - **`discussions/_raw/` (Cold Archive):** **DO NOT** load `discussions/_raw/` by default. It contains all 57+ original raw conversational logs, reserved strictly as an audit trail if information seems missing or when deep troubleshooting is needed.
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
| **Phase 5: Core Domain Primitives** | Visuals, Subjects, Sceneries, Cinematography, Audio & Retake Doctor | ✅ **FINALIZED** | [`01_visual`](./production_framework/specs/01_visual_spec.md), [`02_subject`](./production_framework/specs/02_subject_spec.md), [`03_scenery`](./production_framework/specs/03_scenery_spec.md), [`04_cinematography_audio`](./production_framework/specs/04_cinematography_audio_spec.md), [`06_retake_doctor`](./production_framework/specs/06_retake_doctor_spec.md) | [`discussions/`](./discussions/) |
| **Phase 6: Director's Cut & Assembly** | Script Slicing, Temporal Pacing (4s/6s/8s/10s), Multi-Character Clean Singles, Spatial Handoffs, Dynamic J/L Audio Bridges, Pluggable Styles | ✅ **FINALIZED & VALIDATED** | [`05_directors_cut_assembly`](./production_framework/specs/05_directors_cut_assembly_spec.md), [`styles/`](./production_framework/styles/) | [`discussions/directors_cut_and_assembly.md`](./discussions/directors_cut_and_assembly.md), [Discussion 49](./discussions/_raw/49_simulation_the_314am_doppelganger.md) |

| **Phase 7: Project Scaffolding** | Lean Folder Scaffold & Universal Template | ⏳ Pending | `production_template/` | TBD |
| **Phase 8: Automation Skill & Linters** | Node.js / npx Tooling Suite (`OpenProducer` / `openproducer`), Master Linters (L-01 to L-18), Flow Timeline Manifest Export | ⏳ Pending | Tooling & Skill code | TBD |

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

## 6. Phase 6 Deliverables: Director's Cut & Assembly Engine (✅ FINALIZED & VALIDATED)

**Status:** ✅ **COMPLETED & VALIDATED** (All core domain primitives, assembly specifications, pluggable style plugins, and empirical simulations fully codified, harmonized, and locked).

### Remediations Executed:
1. **Re-Sliced into 11 Unhurried Micro-Clips:**
   - Multi-event cramming eliminated: 1 camera trajectory, 1 spatial focus, 1 micro-action per clip.
   - 2:17 AM wall clock separated into a dedicated macro insert shot ([`clip_02.txt`](./production_framework/simulations/directors_cut/individual_clips/clip_02.txt)).
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
  5. *Deliverables:* Created [`production_framework/simulations/stick_figure_horror/`](./production_framework/simulations/stick_figure_horror/) with `master_flow_agent_prompt.txt`, `individual_clips/`, `scratchbook.md`, and `origin_manifest.md`.
### 2026-10-24 — Image-First Video Production Pipeline & Motivational Rat Race (Discussion 40)
- **Consensus Reached:** Solved raw Text-to-Video noise hallucinations by formalizing the 2-step Image-First Video Production Pipeline:
  1. *Step 1 (Still Keyframe Prompt):* Generates pure optical starting frame plate (`image_prompt.txt`) via Imagen 4 / Midjourney / VideoFX, locking composition, lighting, and stick figure silhouettes with 100% precision.
  2. *Step 2 (Image-to-Video Motion Prompt):* Feeds the generated still as the initial starting frame (`video_prompt.txt`), animating pure camera kinematics, unhurried micro-actions, and audio.
  3. *Motivational Contrast Tested:* 2-clip *9-5 Rat Race* sequence contrasting mundane mechanical visuals (endless commute + cubicle typing) with an uplifting, warm, deep motivational voiceover and swelling grand piano / Rhodes chords.
  4. *Deliverables:* Created [`production_framework/simulations/rat_race_stick_figure/`](./production_framework/simulations/rat_race_stick_figure/) with `clip_01/` (`image_prompt.txt` + `video_prompt.txt`), `clip_02/`, `master_flow_agent_prompt.txt`, `scratchbook.md`, and `origin_manifest.md`.
- **Reference Document:** [`discussions/_raw/40_image_first_video_production_workflow.md`](./discussions/_raw/40_image_first_video_production_workflow.md).

### 2026-10-24 — Stick Figure Fingerless Vector Standard & Gemini 3.8 Flash TTS Syntax (Discussion 41)
- **Consensus Reached:** Solved two critical empirical roadblocks during end-to-end production of *The Phone Call at 2:47 AM*:
  1. *Hand & Feet Flesh Mutancy Glitch:* Diffusion models graft realistic 6-fingered fleshy clusters or knobby joints onto stick figures when prompts mention hands/feet. Enforced the **Strict Fingerless Vector Standard**: pure unbroken 2D line strokes ending in smooth rounded line-caps (`stroke-linecap: round`), with mandatory negative constraints (`strictly zero individual fingers, zero human hands, zero toes, zero knuckles`).
  2. *Light-Reveal Cream Canvas:* Replaced flat black voids and corporate whiteboards with a warm cream/off-white paper canvas (`#F8F6F0`) revealed dynamically under motivated light cones, falling off into deep pitch-black shadows (`#0A0B0E`). Head standard locked: solid white fill (`#FFFFFF`) with matching black contour (`#0F172A`).
  3. *Google AI Studio Gemini 3.8 Flash TTS Bracket Reading Bug:* Discovered that square brackets `[...]` are NOT stripped or parsed as tags by Gemini TTS, but read aloud verbatim. Codified the **Angle Bracket `< >` Syntax Standard**: `<short pause>`, `<long pause>`, `<whisper>` ... `</whisper>`, `<gasp>`, `<sigh>`, routing narrator tone into System Instructions. Added pre-flight linter **L-14**.
  4. *60-Second Viral Retention Pacing:* Compressed the bloated 3m45s timeline into a high-retention 62-second cut (138 words at ~2.2 words/sec, zero dead air) mapped to 10 high-impact micro-clips (`clip_01` to `clip_10`).
  5. *Deliverables:* Created [`production_framework/simulations/the_phone_call_at_247am/`](./production_framework/simulations/the_phone_call_at_247am/) with `base_image_prompt.txt`, `narrator_script.md`, `scratchbook.md`, `keyframe_preview.svg`, `clips/clip_01/` to `clip_10/`, and `master_flow_agent_prompt.txt`.
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
- **Consensus Reached & Staged:** Established three core directorial systems, documented in raw discussion and staged in `dump.md` pending spec implementation:
  1. *Spatial Continuity Handoffs:* Explicitly defining Clip $N$ Spatial Exit State and Clip $N+1$ Spatial Entry State, enforcing the 180° Screen Direction rule.
  2. *Multi-Character "Clean Single" Standard:* Banned dirty Over-the-Shoulder (OTS) shots to eliminate melting shoulders and identity bleeding; using clean Medium Close-Ups with complementary 15° eyelines and wide two-shot establishing plates.
  3. *Dynamic Context-Driven Audio Transitions:* J-Cuts (audio anticipatory pre-roll on incoming disruption) and L-Cuts (whispers/revelations decaying into the subsequent cut).
  4. *Staging Scratchpad Created:* Staged into `dump.md` (to be consumed into `05_directors_cut_assembly_spec.md` and deleted afterwards).
- **Reference Document:** [`discussions/_raw/44_spatial_continuity_handoffs_multi_character_staging_and_dynamic_audio_bridges.md`](./discussions/_raw/44_spatial_continuity_handoffs_multi_character_staging_and_dynamic_audio_bridges.md) and `dump.md`.

### 2026-10-24 — Multi-Variation Synthesis, Pluggable Styles & Universal Stick DNA (Discussion 45)
- **Consensus Reached & Staged:** Cross-checked external YouTube/animation video prompting research (`MIGRATION_PROPOSAL.md` & `PDFCrossCheck.md`) and codified core architectural boundaries into `dump.md`:
  1. *Pluggable Style Registry Scaffolding:* Approved for creation (`production_framework/styles/`). Strictly avoids "style on top of style" combinatorics by defining Universal Base Mediums (Live-Action, Commercial Tabletop, Universal Stick Figure) with genre/mood driven by lighting and kinematics.
  2. *Universal Stick Figure DNA:* Unified standard (`vector_stick_figure.md`) featuring unbroken lines, rounded line-caps, solid white circular head (`#FFFFFF`) with black contour (`#0F172A`), serving horror, comedy, and explainer formats alike.
  3. *Lean Causal Palette:* Adopted closed-set prop bounding (defining permitted props to eliminate AI clutter) with lightweight syntax.
  4. *Core Scope Retained:* Strictly focused on Google Flow (Veo 3.1); parked multi-engine chapters; excluded thumbnails/branding from video generation scope; retained Veo's 4-tier unified soundboard paragraph over rigid 3-track metadata tags.
  5. *Dynamic Narrative Scripting Principles:* Adapts dynamically to project archetype (no forcing hooks on cinema); uses Directorial Hook Instructions ("Zero Preamble", open cognitive loop) over rigid templates; flexible speech baselines (`2.0–2.2 wps` drama vs. `2.5–2.7 wps` explainer) with post-audio script compression loop.
  6. *All Staged in Dump.md:* Pending remaining research before creating final Phase 6 directories and consuming into specs.
- **Reference Document:** [`discussions/_raw/45_multi_variation_synthesis_pluggable_styles_and_universal_stick_dna.md`](./discussions/_raw/45_multi_variation_synthesis_pluggable_styles_and_universal_stick_dna.md) and `dump.md`.

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

### 2026-10-25 — Directorial Learnings: TTS Trailing Tag Bug, Anti-Dead-Air Law & Stick Silhouette (Discussion 47)
- **Empirical Directorial Learnings Codified:** Following testing of the 1994 Dispatch and Station 42 narratives, the stories were scrapped per creator direction while four permanent architectural rules were cemented:
  1. *The Dialogue-First Hard Pause Rule:* Slicing video prompts without real recorded audio duration breaks the Dialogue-First contract. The Agent must hard-pause at Stage 1 (`narrator_script.md` + Tier 1 base plate) until creator inputs recorded durations.
  2. *Trailing Tag Tokenizer Glitch (Gemini 3.8 Flash TTS):* Appending pause tags directly to sentence tails (`name. <long pause>`) forces the model to read the tag aloud. Mandated isolated line-break formatting (`.\n<long pause>\n`). Codified into Linter **L-14**.
  3. *The Anti-Dead-Air Law:* Over-tagging scripts with artificial `<long pause>` tags creates retention-destroying dead air. Modern neural TTS punctuation (commas, periods, line-breaks) provides organic ~0.3s–0.5s breathing. Dynamic Sync pacing requires relentless momentum (~135–145 wpm / ~2.2–2.4 wps), reserving pause tags strictly for high-impact climax moments.
  4. *Stick Figure Personality & Silhouette DNA:* Fingerless stick figures can express rich historical/occupational identities (Soviet Ushanka hats, wire-rim spectacles, heavy wool coat collars, utility belts) without violating the Fingerless Vector Standard (`stroke-linecap: round`). Added Section 2.1 to [`production_framework/styles/vector_stick_figure.md`](./production_framework/styles/vector_stick_figure.md).
- **Reference Documents:** [`discussions/_raw/47_gemini_tts_trailing_tag_bug_and_anti_dead_air_law.md`](./discussions/_raw/47_gemini_tts_trailing_tag_bug_and_anti_dead_air_law.md) and [`production_framework/specs/05_directors_cut_assembly_spec.md`](./production_framework/specs/05_directors_cut_assembly_spec.md).

### 2026-10-25 — The Creator Alignment & Confirmation Gate (Discussion 48)
- **Protocol Rule Enforced (Section 2.4):** After collecting the answers to the 3 core intake questions (Pacing, Pathway, Style), the Agent must NEVER immediately start churning out files or compiling prompts.
  1. *Alignment Summary:* Present a concise summary of the confirmed choices.
  2. *The "Extra Instructions" Check:* Explicitly ask the creator if they want to add any custom creative constraints, character lore, visual preferences, or extra instructions before execution.
  3. *The Confirmation Gate:* Freeze execution until the creator has had the floor to provide extra notes and explicitly confirmed to proceed.
- **Reference Document:** [`discussions/_raw/48_creator_intake_confirmation_gate.md`](./discussions/_raw/48_creator_intake_confirmation_gate.md) and [`production_framework/specs/05_directors_cut_assembly_spec.md`](./production_framework/specs/05_directors_cut_assembly_spec.md).

### 2026-10-25 — Phase 06 Simulation: The 3:14 AM Doppelgänger (Discussion 49)
- **Active Simulation in Creation & Validation:** Executing end-to-end production on *The 3:14 AM Doppelgänger* through Step 0 Intake & Section 2.4 Confirmation Gate:
  1. *Creator Custom Instructions Baked In:* Enforced Anti-Dead-Air Law (purged artificial `<long pause>` tags for seamless ~140 wpm / ~2.3 wps momentum) and encoded expressive fear/tension biomechanics (hunched frozen shoulders, trembling arm rigidity, stark upward smartphone light cone).
  2. *Stage 1 Deliverables:* Created [`production_framework/simulations/the_314am_doppelganger/`](./production_framework/simulations/the_314am_doppelganger/) with Tier 1 `base_image_prompt.txt` and high-retention 3-chunk `narrator_script.md`.
  3. *Stage 2 Assembly Prompts Staged (SRT Integration):* Ingested 40-cue master `audio.srt` (135.08s runtime). Sliced narrative into **22 Flow-native clips** (`[4s, 6s, 8s, 10s]`, totaling 136s runtime with 0.92s breathing dissolve buffer).
  4. *Individual Dual-Tier Clips:* Generated `clips/clip_01/` to `clip_22/` with Tier 2 keyframe plates (`image_prompt.txt`) and Tier 3 motion/audio prompts (`video_prompt.txt`, 100–150 words).
  5. *Master Deliverables & Linters:* Generated `master_flow_agent_prompt.txt` (Flow Agent Mode manifest) and `origin_manifest.md` (asset lineage tracker). Verified 100% pre-flight compliance across linters L-07 through L-15.
  6. *Validation Status:* **Simulation testing completed & confirmed successful.** The creator tested the generated assets and prompts in Flow, confirming high visual continuity, clean temporal pacing, and effective horror atmosphere. Moving to pluggable style registry integration and final Phase 06 spec cleanup.
- **Reference Documents:** [`discussions/_raw/49_simulation_the_314am_doppelganger.md`](./discussions/_raw/49_simulation_the_314am_doppelganger.md) and [`production_framework/specs/05_directors_cut_assembly_spec.md`](./production_framework/specs/05_directors_cut_assembly_spec.md).

### 2026-10-25 — The "Medium vs. Dialect" Inheritance Model for Styles (Discussion 50)
- **Architectural Theory Formulated & Preserved:** Established the theoretical framework for handling infinite sub-styles and aesthetic variations without file bloat or prompt degradation:
  1. *The 3-Tier Layering:* Layer 1 Root Medium (physics & negative bounds) $\rightarrow$ Layer 2 Aesthetic Dialect (20–30 token descriptor overriding line weight, proportions, and rendering school) $\rightarrow$ Layer 3 Lighting & Palette Modulation (scene-specific atmosphere).
  2. *Dialects Mapped Across Mediums:* Catalogued concrete dialect tokens for 2D Anime (Ghibli pastoral, Ufotable modern sakuga, 90s retro cel, Chibi deformed), Vector Stick Figure (Minimalist noir, Kurzgesagt infographic, Xiao Xiao action smear, Anatomical with hands), Live-Action Cinema (Fincher bleach bypass, Wes Anderson symmetrical pastel, Nolan 70mm IMAX), and 3D CGI (Pixar feature animation, Spider-Verse comic hybrid, Retro PS1 low-poly).
  3. *Implementation Status:* Formally recorded and saved for future implementation. Zero sub-files or code changes added at present per creator direction.
- **Reference Documents:** [`discussions/_raw/50_medium_vs_dialect_inheritance_model_for_styles.md`](./discussions/_raw/50_medium_vs_dialect_inheritance_model_for_styles.md) and [`discussions/visual_and_style.md`](./discussions/visual_and_style.md).

### 2026-10-25 — Style Medium Research: 2D Anime Deep-Dive
- **Research Stream Initiated:** Created [`research/styles/`](./research/styles/) to systematically research and log prompt engineering tips, tricks, studio dialects, failure modes, and native Foley for the 5 remaining unaddressed style mediums.
- **Part 1 (2D Anime & Manga Animation):** Fully scraped, synthesized, and archived into [`research/styles/01_traditional_and_modern_2d_anime.md`](./research/styles/01_traditional_and_modern_2d_anime.md):
  1. *Studio Dialects Catalogued:* Detailed prompt keywords and kinematics for Studio Ghibli, Makoto Shinkai / CoMix Wave, Studio Trigger, ufotable, Kyoto Animation (KyoAni), and 1980s/1990s Classic Retro Cel.
  2. *Empirical Failure Modes Solved:* Documented specific token and negative prompts for Line Boiling (jittery crawling outlines), the 3D Plastic Figurine Trap, Character Model Drift, Multi-Limb Glitches, and Color Bleed / AI Smear.
  3. *Native Anime Soundboard:* Documented sequential Veo action-audio cues for katana clashes, anime gasps, energy flares, and mandatory music suppression (`no background music`).
- **Part 2 (Stylized 3D CGI Animation):** Fully scraped, synthesized, and archived into [`research/styles/02_stylized_3d_cgi_animation.md`](./research/styles/02_stylized_3d_cgi_animation.md):
  1. *3D Dialects Catalogued:* Disney / Pixar Feature Film, Sony Spider-Verse / Puss in Boots Comic Hybrid, DreamWorks / Illumination Exaggerated Comedic CGI, Designer Art Toy / Pop Mart Vinyl Collectible, and Retro 1990s Low-Poly PS1.
  2. *Empirical Failure Modes Solved:* Solved the Uncanny Valley Flesh Glitch (subsurface scattering on stylized geometry), Plastic Mannequin Glaze (internal translucency + soft rim light), Rubber-Hose Mesh Warping (single-motion rigid armature bounds), and Eye Divergence (locked optical gaze coordinates).
  3. *Tactile Soundboard:* Catalogued material-driven Veo sound design (squishy gelatinous boop-squelch, mechanical brass clicks, fabric rustle, ceramic clinks) with strict music suppression.
- **Part 3 (Stop-Motion & Claymation Animation):** Fully scraped, synthesized, and archived into [`research/styles/03_stop_motion_and_claymation.md`](./research/styles/03_stop_motion_and_claymation.md):
  1. *Stop-Motion Dialects Catalogued:* Aardman Animations Plasticine Comedy (Wallace & Gromit), Laika Studios Gothic Artisan Fantasy (Coraline), Wes Anderson Handcrafted Needle-Felt (Fantastic Mr. Fox), and Tactile Papercraft / Cutout (Jan Švankmajer).
  2. *Empirical Failure Modes Solved:* Defeated the Digital CGI Smoothing Glitch (12fps stepped timing on twos), Melting Clay Liquefaction (rigid internal armature skeleton), Scale Inversion (miniature diorama + macro lens depth of field), and Surface De-Texturing (visible thumbprints in plasticine).
  3. *Miniature Soundboard:* Catalogued micro-mechanical Veo sound design (miniature armature joint clicks, clay squelches, tiny tweed fabric rustle, cardboard floorboard creaks) with strict music suppression.
- **Part 4 (Vintage & Retro Film / Archival):** Fully scraped, synthesized, and archived into [`research/styles/04_vintage_and_retro_film_archival.md`](./research/styles/04_vintage_and_retro_film_archival.md):
  1. *Historical Dialects Catalogued:* 1960s/1970s Kodachrome 64 Slide Film, Super 8mm / 16mm Bolex Home Movies, 1980s/1990s VHS Camcorder Analog Magnetic Tape, 1950s Technicolor 3-Strip Dye Transfer, and 1920s Early Silent Orthochromatic Film.
  2. *Empirical Failure Modes Solved:* Purged the "Sepia Slime" Trap (naming chemical emulsions over generic buzzwords), eliminated Modern Object / Wardrobe Leakage (closed-set prop bounds), separated Celluloid Grain from Magnetic Tape Glitches, and corrected Artificial Halation Glaze.
  3. *Lo-Fi Soundboard:* Catalogued period-accurate Veo audio (projector gate clatter, magnetic tape hiss, carbureted V8 rumbles, band-limited AM frequency response) with strict music suppression.
- **Part 5 (Social UGC & Mobile Video):** Fully scraped, synthesized, and archived into [`research/styles/05_social_ugc_and_mobile_video.md`](./research/styles/05_social_ugc_and_mobile_video.md):
  1. *Social Formats Catalogued:* Direct-to-Camera Influencer Review / Talking Head, POV Hands-on Product Demo & ASMR Unboxing, Lifestyle / Travel Aesthetic B-Roll, and Street Interview / Vox Pop.
  2. *Empirical Failure Modes Solved:* Eliminated Hollywood Studio Contamination (banning anamorphic flares and 35mm grain), cured the Uncanny Glazed Creator Face (natural biological micro-blemishes and relaxed smiles), restored Handheld Micro-Wobble (banning smooth gimbals), and enforced 9:16 Vertical Framing.
  3. *Mobile Soundboard:* Catalogued dry wireless clip-on lavalier mic acoustics, tactile unboxing packaging ASMR, and natural domestic room tone with strict music suppression.

### 2026-10-25 — Open Topic: Ground-Level Default Design Specifics
- **Logged for Deep-Dive:** Preserved creator note to systematically define and document ground-level out-of-the-box defaults for character geometry, baseline wardrobe, and starting prompt templates across each medium prior to customization. Proceeding with medium-by-medium construction starting with 2D Anime.

### 2026-10-25 — Completion of Pluggable Style Registry & Phase 6 Final Sign-off
- **Milestone Reached:** Successfully synthesized all style research into [`production_framework/styles/`](./production_framework/styles/) and sealed Phase 6:
  1. *Complete 8-Medium Style Registry:* Constructed `traditional_2d_anime.md`, `stylized_3d_cgi.md`, `stop_motion_claymation.md`, `vintage_retro_film.md`, and `social_ugc_video.md`, joining `live_action_cinema.md`, `commercial_tabletop.md`, and `vector_stick_figure.md`.
  2. *3-Tier Medium vs. Dialect Architecture Fully Enforced:* Every medium features a Ground-Level Default Master Anchor, an Embedded Dialect Variations Registry, tactile/material rules, and native Veo Foley soundboards with music suppression.
  3. *Central Style Registry Manifest:* Created `production_framework/styles/README.md` defining compiler token resolution rules (Tokens 81–130) and negative prompt inheritance.
  4. *Phase 6 Specification Finalized & Locked:* Updated [`05_directors_cut_assembly_spec.md`](./production_framework/specs/05_directors_cut_assembly_spec.md) with Section 9 formally signing off on *The 3:14 AM Doppelgänger* simulation validation and style engine linkage.
  5. *Phase 6 Status:* Officially marked **FINALIZED & VALIDATED** in `00_tasks.md` and `AGENTS.md`. Ready to advance to Milestone 1 Schemas / Phase 7 Scaffolding.

### 2026-10-26 — Creator Field Validation: 10–15 Min Production vs. 3–4 Hour Manual Baseline
- **Empirical Confirmation:** Creator conducted hands-on field testing of both end-to-end productions (*The 3:14 AM Doppelgänger* and *The Phone Call at 2:47 AM*).
- **Time Reduction:** End-to-end assembly workflow (downloading clips, importing into editing software, micro-trimming on timeline, and exporting) clocked in at **10–15 minutes total**, compared to the 3–4 hour traditional manual workflow for a 60-second video.
- **Output Quality:** Validated as upload-worthy out-of-the-box with effortless timeline snapping, fully proving the Dialogue-First timing loop, pre/post-roll silence buffers, and 3-Tier Image-First clipping pipeline.

### 2026-10-26 — Solving Angled Photo Extrapolation, Facial Distortion & The Bobblehead Glitch (Discussion 51)
- **Consensus Reached:** Solved real-world image-to-character glitches:
  1. *The 2-Step Angle Normalizer:* For angled/neck-turned selfies, never ask for de-rotation, wardrobe change, and full-body generation at once. Generate a neutral frontal alignment plate on `#E5E5E5` first, then activate the character.
  2. *Head-to-Body 1:7.5 Ratio Lock:* Enforced explicit biological adult scale and negative prompts to kill the bobblehead/caricature glitch.
  3. *Expression Decoupling Engine:* Decouple invariant bone structure from transient facial muscles to allow natural winks/smiles without warping.
  4. *Creator Zero-Burden Rule:* The multimodal agent inspects photos and injects technical tokens under the hood; the creator never types biometric jargon.
- **Reference Documents:** [`discussions/_raw/51_solving_angled_photo_extrapolation_and_face_distortion.md`](./discussions/_raw/51_solving_angled_photo_extrapolation_and_face_distortion.md) and `dump.md`.

### 2026-10-26 — Script, Narrative & Dynamic Hook Architecture
- **Consensus Reached:**
  1. *Dynamic Narrative Tempo:* Banned rigid static durations. Pacing adapts to emotional beats: slow-burn dread (1.8–2.2 WPS), high-velocity action (2.6–3.0 WPS), or hybrid arcs.
  2. *The Non-Imposition Law (Creator Agency):* 2nd-person perspective (`"Suppose you woke up at 2 AM..."`) can be proposed when the creator provides a rough plot/concept. If the creator provides an authored script or walkthrough, the AI **must never impose or rewrite their words**.
  3. *Dynamic Hook Principles:* Banned mad-libs templates in favor of dynamic rules (immediate in medias res, broken equilibrium, organic contextual phrasing).
- **Reference Document:** `dump.md`.

### 2026-10-26 — Dual-Image Cosplay Translation & Simulation 2 (Discussion 52)
- **Simulation 1 Validated (Dual-Reference Cosplay / Pose & Attire Translation):**
  1. *Material Translation Engine:* Prompted translation of 2D anime pose, hairstyle, and wardrobe from `[IMAGE 2]` into real-world physical movie fabrics (textile weave, gravity drape, stitched seams) and soft human hair follicles with fine flyaways.
  2. *Facial Landmark Isolation:* Strictly isolated `[IMAGE 1]` to facial bone structure, zygomatic arches, nose bridge, eyes, and skin pores, preventing clothing or hair bleed from the real person.
  3. *Anatomical Scale Lock:* Enforced 1:7.5 adult anatomical scale to eliminate cartoon bobblehead distortion.
- **Simulation 2 Field Tested & Marked Failed (Empirical Glitches Discovered):**
  1. *Status:* ❌ Marked Failed per creator field testing in Google Flow. Parked for future overhaul.
  2. *Empirical Discovery 1 (Veo 3.1 Native Speech Velocity Glitch):* The 2.2 words/sec pacing is invalid for Veo 3.1 native in-video audio. Veo speaks at $\approx 1.2$–$1.5$ words/sec with mandatory ~1.0s pre/post buffers. Word counts of 15 words in 6s or 8 words in 4s caused dialogue cutoff and duration overflow. Real native budgets must be slashed to: 4s = 3–5 words, 6s = 7–9 words, 8s = 11–13 words.
  3. *Empirical Discovery 2 (Face Match Degradation / Prompt Over-Description):* Long paragraphs detailing facial bone structures cause diffusion models to synthesize faces from text tokens, overriding the reference image `[IMAGE 1]` latents. Requires Lean Reference Anchoring (`The exact same person from [IMAGE 1]...`).
  4. *Empirical Discovery 3 (Visual Jitter / Jump-Cut Trap):* Synthesizing independent image plates for consecutive medium shots of the same character causes jarring posture/angle jumps. Requires strict 30° Cinematic Contrast cuts or Flow `last_frame` chaining.
  5. *Deliverables Preserved:* Preserved under [`production_framework/simulations/software_framework_intro/`](./production_framework/simulations/software_framework_intro/) with decoupled `master_images_prompt.txt` and `master_videos_prompt.txt`.
- **Architectural Enhancement: Dual Decoupled Master Prompts Standard:**
  1. *The Separation:* Consolidated prompt manifests are now strictly decoupled into two dedicated files:
     - `master_images_prompt.txt`: Contains ONLY image generation prompts (Tier 1 Ingredient #1 + Tier 2 keyframe plates for all clips).
     - `master_videos_prompt.txt`: Contains ONLY video generation prompts (Tier 3 Veo prompts with durations, configs, and audio blocks).
  2. *Refactored Across Codebase:* Implemented in [`production_framework/simulations/software_framework_intro/`](./production_framework/simulations/software_framework_intro/), upgraded [`production_framework/simulations/the_314am_doppelganger/`](./production_framework/simulations/the_314am_doppelganger/), and locked into [`05_directors_cut_assembly_spec.md`](./production_framework/specs/05_directors_cut_assembly_spec.md).
- **Reference Documents:** [`discussions/_raw/52_simulation_software_framework_intro_and_dual_image_translation.md`](./discussions/_raw/52_simulation_software_framework_intro_and_dual_image_translation.md) and [`production_framework/specs/05_directors_cut_assembly_spec.md`](./production_framework/specs/05_directors_cut_assembly_spec.md).

### 2026-10-26 — Domain 05: Audio Engineering & Decoupling Codification (Discussion 53)
- **Milestone Reached:** Fully researched, synthesized, and codified Domain 05 into authoritative specifications ([`04_cinematography_audio_spec.md`](./production_framework/specs/04_cinematography_audio_spec.md) and [`05_directors_cut_assembly_spec.md`](./production_framework/specs/05_directors_cut_assembly_spec.md)):
  1. *Dual-Track Speech Velocity Standard:* Formalized decoupling between Pathway A (Native Veo 3.1: $\approx 1.2$–$1.5$ wps; 4s=3–5w, 6s=7–9w, 8s=11–13w) and Pathway B (External TTS: $\approx 2.2$ wps; 4s=6–8w, 6s=10–12w, 8s=14–16w), with mandatory $\ge 1.0\text{s}$ pre/post-roll silence buffers to eliminate dialogue clipping.
  2. *Semicolon-Delimited 3-Track Audio Prompt Standard:* Structured Veo trailing audio blocks into frequency-separated channels: `Audio: SFX: [Foley]; Ambience: [Room Tone]; Dialogue: [Spoken words | None]; Music: [Directive].`
  3. *The `(REFERENCE ONLY)` Non-Render Guardrail:* Encapsulated narrative context and backstory into non-render headers combined with mandatory negative subtitle tokens to eliminate burned-in text and watermark hallucinations.
  4. *Multi-Track Stem Assembly Architecture (`audio_stems.md`):* Standardized 4-track timeline layout (A1: Dialogue, A2: Foley SFX, A3: Spatial Ambience Bed, A4: Score Bed ducked by -14dB).
  5. *Linters Enforced:* Added L-16 (Native Veo Word Budget), L-17 (Anti-Subtitle Invariant), and L-18 (3-Track Semicolon Syntax).
  6. *Dump Staging Consumed:* Domain 5 in `dump.md` marked as fully consumed and finalized.
### 2026-10-26 — Finalizing Staging Cleanup & 100% Spec Consumption (Discussion 54)
- **Milestone Reached:** Fully finalized, verified, and consumed 100% of staged concepts from `dump.md` into the authoritative specifications, and cleanly purged `dump.md` from disk:
  1. *Domain 1 (Subject Likeness) in [`02_character_spec.md`](./production_framework/specs/02_character_spec.md):* Codified Lean Reference Anchoring (Rule 9) banning text over-description to keep 95%+ latent attention on `[IMAGE 1]`; 2-Step Angle Normalizer; 1:7.5 scale ratio; Expression Decoupling Engine.
  2. *Domain 2 (Script & Dynamic Hooks) in [`05_directors_cut_assembly_spec.md`](./production_framework/specs/05_directors_cut_assembly_spec.md):* Codified Dynamic Narrative Tempo (Section 2.5); The Non-Imposition Law (Section 2.6) strictly protecting creator's authored script; Dynamic Hook Rules (Section 2.7) banning mad-libs formulas.
  3. *Domain 4 (Directorial Slicing & Visual Rhythm) in [`05_directors_cut_assembly_spec.md`](./production_framework/specs/05_directors_cut_assembly_spec.md):* Codified the 4-Beat Visual Rhythm (Section 4.4); 4 Match-Cut Timeline Handoffs (Section 4.6); 30° Cinematic Contrast & Anti-Jump-Cut Law (Section 4.7); Timestamped Monolithic Prompt Syntax for long-take engines (Section 6.2).
  4. *Domain 5 (Audio Engineering) in [`04_cinematography_audio_spec.md`](./production_framework/specs/04_cinematography_audio_spec.md):* Codified Dual-Track Velocity Standards, 3-Track Semicolon Audio Syntax, `(REFERENCE ONLY)` non-render headers, and multi-track stems.
  5. *Linters Enforced:* Added Linters L-16 through L-20.
  6. *Scratchpad Purged:* `dump.md` permanently deleted.
- **Reference Documents:** [`discussions/_raw/54_finalizing_staging_cleanup_and_all_domains_consumption.md`](./discussions/_raw/54_finalizing_staging_cleanup_and_all_domains_consumption.md), [`production_framework/specs/02_character_spec.md`](./production_framework/specs/02_character_spec.md), [`production_framework/specs/04_cinematography_audio_spec.md`](./production_framework/specs/04_cinematography_audio_spec.md), and [`production_framework/specs/05_directors_cut_assembly_spec.md`](./production_framework/specs/05_directors_cut_assembly_spec.md).

### 2026-10-27 — Strategic Sequencing, Root Hygiene & Node.js Tooling Pivot
- **Root Documentation Relocation:** Created `discussions/docs/` and cleanly moved all root-level audit and proposal documents (`PROJECT_AUDIT_AND_COMPILE_READINESS.md`, `PROJECT_AUDIT_CROSS_CHECK_AND_ADDENDUM.md`, `MIGRATION_PROPOSAL.md`, `PDFCrossCheck.md`) into `discussions/docs/`, preserving `AGENTS.md` as the sole markdown file at repository root.
- **Strategic Prioritization (Foundational Fixes First):** User confirmed to prioritize resolving all foundational spec contradictions, style plugin completions, and synthesis sanitizations before proceeding with project folder scaffolding and automated linting.
- **Tooling Architecture Pivot (Node.js / `npx`):** Decided on Node.js / `npx` CLI (`@theprojectsx/video-skill`) for zero-dependency universal execution across dev environments (`npx video-skill lint`, `npx video-skill compile`, `npx video-skill slice`).
- **Master Plan Document Created:** Formulated and committed authoritative step-by-step roadmap at [`discussions/docs/god_tier_skill_plan.md`](./discussions/docs/god_tier_skill_plan.md).

### 2026-10-27 — Full Execution: Foundation Harmonization, Synthesis Sanitization & Simulation Consolidation (Phases 1–5)
- **Foundational Execution Completed:** Successfully executed all non-tooling/non-scaffolding phases of the master plan:
  1. *Phase 1 (Specification Harmonization & Unified Linter Registry):*
     - Established Master Unified Linter Registry (`L-01` to `L-18`) across `00_architecture_blueprint.md`, `03_scenery_spec.md`, `04_cinematography_audio_spec.md`, and `05_directors_cut_assembly_spec.md`.
     - Harmonized `02_character_spec.md` Scenario 1: cleanly delineated Workflow 1A (Text-Only Genesis: full anatomical descriptors) vs. Workflow 1B (Image-Conditioned Genesis: Rule 9 Lean Reference Anchoring).
     - Standardized `05_directors_cut_assembly_spec.md`: synchronized speech velocity limits to `{4s: 3-5w, 6s: 7-9w, 8s: 11-13w, 10s: 15-18w}`, locked canonical `.txt` headers (`[IMAGE CONFIGURATION]`, `[IMAGE PROMPT]`, `[CONFIGURATION SETTINGS]`, `[VIDEO PROMPT]`, `[NEGATIVE PROMPT]`), and clarified editorial 4-beat rhythm.
     - Purged Over-The-Shoulder (OTS) framing and camera equipment verbs from `04_cinematography_audio_spec.md` recipes (`upward elevation sweep`, `optical contra-zoom (zolly)`).
     - Connected `01_visual_spec.md` to `styles/` and added `vector_stick_figure` to Section 4.
  2. *Phase 2 (Pluggable Style Registry Hardening):*
     - Completed `vector_stick_figure.md` with 7 standard sections, 4 verified dialects, Dialect Negative Override for `anatomical_stick_with_hands`, and canonical semicolon audio soundboard.
     - Restructured `social_ugc_video.md`, `live_action_cinema.md`, `vintage_retro_film.md`, `stylized_3d_cgi.md`, `traditional_2d_anime.md`, `commercial_tabletop.md`, and `stop_motion_claymation.md`. Purged all config tokens (`9:16`, `4K`, `320x240`, `24fps`), replaced hardware nouns with pure kinematics, and upgraded all Section 6 soundboards to semicolon 4-part syntax.
  3. *Phase 3 (Active Knowledge Base Sanitization):*
     - Cleaned `research/synthesis/` files (`01`, `02`, `03`, `04`, `05`, `06`, `07`, `09`) and `validation.md`: purged tripod/dolly nouns, clock bracket timestamps, OTS framing, and inline configuration appending in compiler code. Added 10s duration support.
     - Created `research/styles/README.md` with authority banner directing agents to `production_framework/styles/`.
  4. *Phase 4 (Flagship Simulation Audio Upgrade):*
     - Upgraded all 22 clip video prompts and `master_videos_prompt.txt` in *The 3:14 AM Doppelgänger* to canonical 4-part semicolon syntax (`Audio: SFX: ...; Ambience: ...; Dialogue: None; Music: None.`).
  5. *Phase 5 (Workspace & Link Hygiene):*
     - Moved all 5 loose simulation directories (`directors_cut`, `rat_race_stick_figure`, `stick_figure_horror`, `the_314am_doppelganger`, `the_phone_call_at_247am`) into `production_framework/simulations/`.
     - Atomically updated all internal links across `AGENTS.md`, `05_directors_cut_assembly_spec.md`, `discussions/directors_cut_and_assembly.md`, and Discussion 49.
     - Purged dead `dump.md` links and updated Section 6 status header to `COMPLETED & VALIDATED`.
- **Reference Documents:** [`discussions/docs/god_tier_skill_plan.md`](./discussions/docs/god_tier_skill_plan.md) and [`discussions/docs/PROJECT_AUDIT_CROSS_CHECK_AND_ADDENDUM.md`](./discussions/docs/PROJECT_AUDIT_CROSS_CHECK_AND_ADDENDUM.md).

### 2026-10-27 — Independent Audit #02, Cross-File Synchronization & Pre-Composited Tier 2 Protocol (Discussion 55)
- **Cross-File Linting & Structure Synchronization:** Resolved all non-functional cross-file mismatches across `00_architecture_blueprint.md`, `00_tasks.md`, `01_visual_spec.md`, `02_character_spec.md`, `03_scenery_spec.md`, `05_directors_cut_assembly_spec.md`, `production_framework/styles/*.md`, `discussions/*.md`, and `research/`.
- **3-Ingredient Slot Allocation & Pre-Composited Tier 2 Protocol (`L-06` Upgrade):**
  1. *Multi-Ingredient Indexing in Tier 2 (`[IMAGE 1]`, `[IMAGE 2]`, `[IMAGE 3]`):* Codified the Universal 3-Ingredient Slot Allocation Matrix in `05_directors_cut_assembly_spec.md` (Section 5.5) and `02_character_spec.md` (`L-06`), binding `[IMAGE 1]` (Primary Subject), `[IMAGE 2]` (Empty Stage Environment), and `[IMAGE 3]` (Secondary Subject or Hero Prop) during Tier 2 still keyframe generation, with a deterministic text fallback (`verbatim_anchor.txt`) for 4+ asset wide establishing shots.
  2. *Single-Seed Tier 3 Handoff:* Enforced that Tier 3 Veo 3.1 video prompts receive **only the single pre-composited Tier 2 keyframe (or `LAST_FRAME`)** as their starting frame seed—never raw `#E5E5E5` turnaround sheets—eliminating studio background bleed and multi-character identity merging during video synthesis.
- **Reference Documents:** [`discussions/_raw/55_three_ingredient_slot_allocation_and_precomposited_tier2.md`](./discussions/_raw/55_three_ingredient_slot_allocation_and_precomposited_tier2.md) and [`discussions/docs/POST_CLEANUP_AUDIT_02.md`](./discussions/docs/POST_CLEANUP_AUDIT_02.md).

### 2026-10-27 — Empirical Simulation: The Breath at 2:00 AM (Discussion 56)
- **Dialogue-First End-to-End Simulation Executed:** Successfully completed full pre-production and directorial slicing for *The Breath at 2:00 AM* under the Vector Stick Figure (`minimalist_noir`) style:
  1. *SRT Audio Synchronization:* Ingested creator's 20-cue recorded SRT track (67.98s runtime). Sliced narrative into 13 Flow-native clips (`4s`, `6s`, and an `8s` climax take, totaling 74s raw footage / 68s timeline cut).
  2. *Intense Horror Cliffhanger Score Bed:* Implemented custom creator sound direction across 4-part semicolon audio blocks: Clips 01–11 dead score silence, Clip 12 low dissonant bowed cello drone & sub-bass swell, and Clip 13 explosive crescendo of screeching dissonant horror strings, bowed waterphone, and accelerating sub-bass pulse surging to maximum tension right before cutting dead to black.
  3. *Pre-Composited Tier 2 Protocol & Decoupled Manifests:* Validated 3-ingredient slot indexing (`[IMAGE 1]`, `[IMAGE 2]`, `[IMAGE 3]`) in Tier 2 image prompts, single-seed Tier 3 keyframe handoffs, and delivered decoupled `master_images_prompt.txt`, `master_videos_prompt.txt`, `scratchbook.md`, `origin_manifest.md`, `audio_stems.md`, and individual `clips/clip_01/` to `clip_13/`.
  4. *Linters Enforced:* 100% pre-flight compliance across Linters L-01 through L-18.
- **Reference Deliverables:** [`production_framework/simulations/the_breath_at_2am/`](./production_framework/simulations/the_breath_at_2am/).

### 2026-10-27 — Empirical Glitch Calibration: Multi-Subject Coupling, Pareidolia & Invisible Entity Laws (Discussion 57)
- **Real-World Test Feedback Calibrated:** Following generation testing of *The Breath at 2:00 AM* prompts in Google Flow (Veo 3.1), identified and surgically resolved 5 fundamental diffusion failure modes:
  1. *Floorboard Drift (Clip 02):* Low-angle tracking past floorboards caused camera tilt downward away from ceiling tension; reoriented to upward low-angle push locking the oppressive overhead void in the top half.
  2. *Single-Instance Furniture Law (Clips 04 & 07):* Multi-subject staging (seated human + perched cat) caused diffusion models to hallucinate two separate sofas; codified `EXACTLY ONE SOFA IN THE ROOM` constraint, explicitly binding the cat directly to the top backrest of the same couch behind the human's head.
  3. *Unseen Entity & Transparency Hallucination (Clip 09):* Describing "unseen footsteps pacing across ceiling" caused Veo to render an actual cat pacing across a transparent ceiling and illuminate the room; purged all creature/movement tokens from overhead space, locked ceiling as an opaque solid black void (`#0A0B0E`), and restricted motion strictly to the cat's head turning on the sofa.
  4. *Shadow Pareidolia Glitch (Clip 12):* Descending organic shadow boundary dipping 2 inches above the round head caused latent attention to interpret the dark silhouette as a human/monster nose; flattened shadow boundary into a uniform geometric horizontal block with strict negative face/nose tokens.
  5. *Invisible Entity Prompting Law (Clip 13):* Mentioning "breathing presence" and "sharp intake of breath" in the visual prompt forced diffusion models to render a giant monster face/nose exhaling onto the head; established that unseen entities must never be described in visual tokens—the shadow void is kept 100% empty, the reaction is conveyed via subject micro-shudder, and the breath is delegated 100% exclusively to the `Audio:` channel.
- **Manifests Updated:** All individual clip files (`clip_02`, `clip_04`, `clip_07`, `clip_09`, `clip_12`, `clip_13`) and master manifests (`master_images_prompt.txt`, `master_videos_prompt.txt`) fully calibrated and synchronized.
- **Reference Documents:** [`discussions/_raw/57_empirical_glitches_spatial_coupling_pareidolia_and_invisible_entity.md`](./discussions/_raw/57_empirical_glitches_spatial_coupling_pareidolia_and_invisible_entity.md) and [`production_framework/simulations/the_breath_at_2am/`](./production_framework/simulations/the_breath_at_2am/).

### 2026-10-27 — God-Tier Creative Specifications: Vertical Safe-Zone, Match-On-Tone, Combat Slicing & Retake Doctor (Discussion 58)
- **Category A Creative Upgrades Completed:** Successfully implemented Upgrades 2, 7, 8, and 5 from `POST_CLEANUP_AUDIT_02.md`:
  1. *Upgrade 2 (9:16 Vertical Safe-Zone & Kinematics):* Added Section 2.3 & 3.3 to `04_cinematography_audio_spec.md` codifying the Central 60% Action Safe Zone ($Y \in [15\%, 75\%]$, $X \in [5\%, 85\%]$) protecting against mobile UI occlusion, vertical framing scale standards, and banning rapid horizontal whip-pans. Added Section 5.7.3 to `05_directors_cut_assembly_spec.md` codifying Z-Axis Depth Two-Shots and Vertical Clean Singles.
  2. *Upgrade 7 (Tone & Exposure Anchor `[MATCH-ON-TONE]`):* Upgraded Section 3.2 of `01_visual_spec.md` with the 3-Value Exposure (IRE), Dominant Kelvin, and Black Point Anchor; bound `[MATCH-ON-TONE]` in Section 4.6 of `05_directors_cut_assembly_spec.md` to prevent inter-clip exposure strobing.
  3. *Upgrade 8 (Two-Character Combat & Kuleshov Slicing):* Added Section 5.8 to `05_directors_cut_assembly_spec.md` banning continuous multi-second grappling in single clips, enforcing High-Contrast Silhouette Separation, and mandating the 3-Clip Kuleshov Action Slicing formula (Wind-up $\rightarrow$ Macro Impact $\rightarrow$ Recoil).
  4. *Upgrade 5 (The Retake Doctor):* Created authoritative specification [`production_framework/specs/06_retake_doctor_spec.md`](./production_framework/specs/06_retake_doctor_spec.md) codifying 12 Master Glitch Diagnostic Codes (`G-01` to `G-12`) and the 3-Step `/doctor` interactive protocol for rapid, zero-trial-and-error credit recovery.
- **Reference Documents:** [`production_framework/specs/06_retake_doctor_spec.md`](./production_framework/specs/06_retake_doctor_spec.md) and [`discussions/_raw/58_vertical_safe_zone_match_on_tone_combat_slicing_and_retake_doctor.md`](./discussions/_raw/58_vertical_safe_zone_match_on_tone_combat_slicing_and_retake_doctor.md).

### 2026-10-27 — OpenProducer Naming & Autonomous Hybrid Pacing Architecture (Discussion 59)
- **Identity & Package Naming:** Formally locked the project skill and CLI name to **`OpenProducer`** (`openproducer`, e.g. `npx openproducer`), completely deprecating `video-skill`.
- **Autonomous Directorial Decisions (Zero Creator Jargon):** Codified the principle that the AI agent must autonomously determine and apply directorial pacing and keyframe reuse without creator micromanagement:
  1. *A-B-A Returning Keyframe Anchor:* Reusing the same starting keyframe plate (`keyframe_A.png`) across an insert/reaction shot (`keyframe_B.png`), locking 100% environment/wardrobe consistency without snap-back jump-cuts.
  2. *Hybrid Pacing Engine:* Balancing 70% kinetic 4s/6s beats with 30% sustained 16s–24s resting anchors (via selective single-hop extension or matched slow creeps with 0.75s–1.0s soft atmospheric cross-dissolves) to permanently eliminate cognitive eye fatigue.
  3. *Audio/Luminance Bridges:* Pre-applying 0.5s–1.0s J/L-cut sound overlaps and `[MATCH-ON-TONE]` anchors to all cuts.
- **Reference Documents:** [`discussions/_raw/59_openproducer_naming_and_autonomous_hybrid_pacing.md`](./discussions/_raw/59_openproducer_naming_and_autonomous_hybrid_pacing.md).

### 2026-10-27 — Empirical Validation: Universal Melanin Parity & Facial Mask Decoupling (Discussion 60)
- **Real-World Test Feedback Validated:** Following live creator Image-to-Image translation testing combining real human models (`[IMAGE 1]`) with stylized anime pose plates (`[IMAGE 2]`), successfully verified and codified two critical biological transfer laws:
  1. *Universal Relative Melanin & Complexion Parity (Rule 9 in `02_character_spec.md`):* Never hardcode static skin colors (e.g. "fair" or "tan"). Always bind directly to `[IMAGE 1]` using relative parity across all visible skin (`face, neck, ears, hands, arms`) to eliminate diversity-prior race shifts and anime shadow-to-melanin darkening glitches.
  2. *Facial Mask Only & Hair Decoupling (Rule 10 in `02_character_spec.md`):* When grafting a real person onto an existing character/pose plate, explicitly decouple hair from the face. Retain 100% of the hairstyle, bangs, and hair color from `[IMAGE 2]` in fine photorealistic hair strands, while grafting strictly the facial mask (bone structure, eyes, nose, jaw) and skin tone from `[IMAGE 1]`.
  3. *Retake Doctor Updated:* Codified Diagnostic Code `G-13: Complexion / Ethnicity Drift & Mismatched Body Tone` in `06_retake_doctor_spec.md`.
- **Reference Documents:** [`production_framework/specs/02_character_spec.md`](./production_framework/specs/02_character_spec.md), [`production_framework/specs/06_retake_doctor_spec.md`](./production_framework/specs/06_retake_doctor_spec.md), and [`discussions/_raw/60_facial_mask_and_relative_melanin_transfer_protocol.md`](./discussions/_raw/60_facial_mask_and_relative_melanin_transfer_protocol.md).

### 2026-10-27 — Creative Foundation Finalized: Phonetic Normalization & Opt-In Packaging Suite (Discussion 61)
- **100% Creative Specs Complete:** Successfully implemented the final two Category A items from `POST_CLEANUP_AUDIT_02.md`, completing every foundational creative specification:
  1. *Upgrade 6 (Phonetic Dialogue Normalization Law & Linter L-15):* Added Section 5.4 to `04_cinematography_audio_spec.md` and upgraded `L-15` in `05_directors_cut_assembly_spec.md` and `god_tier_skill_plan.md`. Mandated that all numbers, times, currencies, and acronyms in Pathway A spoken quotes be written phonetically as spoken English words (`"three fourteen"`, `"twenty-four frames"`), while physical visual props maintain exact digits (`"03:14 AM"`).
  2. *Upgrade 9 (On-Demand Packaging Suite):* Added Section 7.2 to `05_directors_cut_assembly_spec.md` enforcing the **Core Demand Law (No Demand, No Prompt)**: thumbnail, cover, and loop bridge prompts are strictly on-demand and never created during routine assembly unless explicitly requested by the creator. When requested, formulates High-CTR Cover/Thumbnails (Rule-of-Thirds with 40% clean negative space) and Seamless Infinite Loop Bridges (`loop_bridge.txt`).
- **Reference Documents:** [`production_framework/specs/04_cinematography_audio_spec.md`](./production_framework/specs/04_cinematography_audio_spec.md), [`production_framework/specs/05_directors_cut_assembly_spec.md`](./production_framework/specs/05_directors_cut_assembly_spec.md), and [`discussions/_raw/61_phonetic_normalization_and_packaging_suite.md`](./discussions/_raw/61_phonetic_normalization_and_packaging_suite.md).

### 2026-10-27 — Empirical Validation: Trust & Safety Policy Classifiers & G-14 Protocol (Discussion 62)
- **Real-World Policy Blocks Resolved:** Following live generation testing of *Sarcastic Trading Explainer* prompts in Google Flow (Veo 3.1 & Imagen 4), identified and codified three core Trust & Safety (T&S) false positive mechanisms:
  1. *Translation-Induced Self-Harm Trigger:* Foreign idioms translating to literal harm phrases (e.g. `"জীবন ধ্বংস করতে"` translating to `"destroy your life"`) trigger Google's automated self-harm prevention classifiers; resolved by substituting non-violent satirical hyperbole (`"নিজের সব ব্যালেন্স খালি করুন"`).
  2. *Financial Risk & Investment Solicitation Trigger:* Imperative calls to action (e.g. `"আজই জয়েন দিন Trading এ"` / *"Join Trading today"*) paired with bankruptcy words trigger investment scam classifiers; resolved by reframing CTAs into observational humor and zero-balance colloquialisms.
  3. *Negative Prompt Negation-Blindness:* Safety classifiers frequently ignore negative prompt scoping; tokens like `"twisting head 360 degrees"` or `"mutated neck"` in `[NEGATIVE PROMPT]` trigger graphic violence/decapitation blocks; resolved by restricting negative prompts strictly to neutral technical quality tokens.
- **Specification Updated:** Codified **Diagnostic Code G-14 (Trust & Safety False Positives)** in [`06_retake_doctor_spec.md`](./production_framework/specs/06_retake_doctor_spec.md).
- **Reference Deliverables:** [`discussions/_raw/62_trust_and_safety_policy_classifier_traps_and_sanitization.md`](./discussions/_raw/62_trust_and_safety_policy_classifier_traps_and_sanitization.md), [`production_framework/specs/06_retake_doctor_spec.md`](./production_framework/specs/06_retake_doctor_spec.md), and [`production_framework/simulations/trading_sarcasm/`](./production_framework/simulations/trading_sarcasm/).











