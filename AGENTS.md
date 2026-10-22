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
   - **`discussions/_raw/` (Cold Archive):** **DO NOT** load `discussions/_raw/` by default. It contains all 25 original raw conversational logs, reserved strictly as an audit trail if information seems missing or when deep troubleshooting is needed.
3. **Always Record Progress in Files:**
   - Any consensus, decision, requirement, or architectural change reached during a chat **MUST be documented in files** before concluding the turn or session.
   - **Mandatory Raw Discussion Logging:** For every new feature, architectural concept, design decision, or user alignment discussed in chat, the agent **MUST create a corresponding raw discussion file in `discussions/_raw/`** (sequentially numbered, e.g. `16_<topic>.md`) following the established structure before summarizing or concluding. This guarantees that an unedited, complete record of the dialogue and rationale is permanently preserved on disk for auditing and future agents.
   - If work was done in session X (e.g. PC 1) and pushed, session Y (e.g. PC 2) must be able to read the files and immediately resume with identical context and reasoning.
4. **Never Run Non-Read-Only Git Commands:**
   - Per user rule: Never `git add`, `git commit`, or push unless explicitly requested.

---

## 3. Current Project State & Roadmap

| Phase | Description | Status | Authoritative Output / Specs | Discussion & Logs |
|---|---|---|---|---|
| **Phase 1–4** | Comprehensive Research, Synthesis & Validation | ✅ **COMPLETE** | [`research/synthesis/`](./research/synthesis/) | [`research/structure.md`](./research/structure.md), [`research/validation.md`](./research/validation.md) |
| **Phase 5.1: Visual DNA** | Root Visual Style, 8 Master Paradigms (Film, Anime, Commercial, Social) | ✅ **FINALIZED** | [`production_framework/specs/01_visual_spec.md`](./production_framework/specs/01_visual_spec.md) | [`discussions/visual_and_style.md`](./discussions/visual_and_style.md) |
| **Phase 5.2: Subjects** | Turnaround Anchors, Characters & Hero Products, 2-Step Genesis | ✅ **FINALIZED** | [`02_subject_spec.md`](./production_framework/specs/02_subject_spec.md) & [`02_character_spec.md`](./production_framework/specs/02_character_spec.md) | [`discussions/characters.md`](./discussions/characters.md) |
| **Phase 5.3: Environments** | Worlds, Commercial Studio Stages, Spatial Depth, Motivated Light | 🟡 **IN PROGRESS** | `production_framework/specs/03_scenery_spec.md` (Drafting) | `discussions/sceneries.md` |
| **Phase 5.4: Cinematography & Audio** | Kinematics, Lenses, Soundscapes, Dialogue Delivery | ⏳ Pending | `production_framework/specs/04_cinematography_audio_spec.md` | `discussions/cinematography_audio.md` |
| **Phase 6** | Lean Folder Scaffold & Project Template | ⏳ Pending | `production_template/` | TBD |
| **Phase 7** | Automated Prompt Generation & Linting Skill | ⏳ Pending | Tooling & Skill code | TBD |

---

## 4. Documentation Architecture: Specifications vs. Discussions vs. Archives

To prevent token bloat while retaining 100% information control:
1. **`production_framework/specs/` (Authoritative Production Deliverables):**
   - Clean, standardized specification files produced upon concluding each domain discussion (e.g. `01_visual_spec.md`). Contains the final file contracts, templates, and rules ready for implementation.
2. **`discussions/` (Active Consolidated Summaries):**
   - High-density active working records capturing why decisions were made, failure modes tested, and empirical AI model glitches discovered (`architecture.md`, `visual_and_style.md`, `characters.md`).
3. **`discussions/_raw/` (Cold Historical Archive):**
   - Contains all 25 original, sequential discussion files. Kept on disk for audit trail and deep debugging. Agents do NOT load this folder during routine turns.
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

---

## 6. Next Session Handoff & Agenda (Phase 5.3: Sceneries & Environments)

**Status at Session Pause:** Phase 5.1 (`visual/`) and Phase 5.2 (`characters/`) are 100% complete with authoritative specifications in [`production_framework/specs/`](./production_framework/specs/).

### High-Priority Backlog (Future Return Items):
- ⚠️ **Face Syncing Fidelity with Reference Photo:** Return to solve 1:1 facial likeness retention and generic AI face substitution in image-to-character workflows. (Refer to [`discussions/_raw/25_backlog_face_sync_fidelity_with_reference_image.md`](./discussions/_raw/25_backlog_face_sync_fidelity_with_reference_image.md) and [`discussions/characters.md`](./discussions/characters.md)).

### Immediate Agenda for Next Agent:
1. **Activate Phase 5.3:** Open discussion on the **`sceneries/`** domain (environmental world-building).
2. **Key Architectural Questions to Tackle:**
   - **Cross-Archetype Sceneries:** How `sceneries/` must accommodate both narrative environments (streets, battlefields) AND commercial/studio sets (pedestals, infinity coves, reflective water surfaces) per Discussion 15.
   - **Directory Contract:** Define `sceneries/<location_id>/` (e.g. `environment_summary.md`, `spatial_layers.md`, `lighting_rig.md`, `acoustics.md`, `references/`).
   - **3-Plane Spatial Depth:** How prompts must separate Foreground, Midground, and Background to give Veo 3.1 accurate 3D parallax during camera kinematics.
   - **Motivated Lighting Rigs:** Connecting scene lighting (e.g. cold overcast daylight through smoke, flickering neon practicals) directly to the Master Style Anchor in `01_visual_spec.md`.
   - **Reference Mood Boards (Google Flow Ingredients):** Defining the reference image requirements for environments (preventing character or unwanted asset bleed).
   - **Diegetic Environmental Acoustics:** Standardizing the ambient audio layer (reverberation, room tone, weather foley) for the `Audio:` block.
   - **Authoritative Deliverable:** Produce [`production_framework/specs/03_scenery_spec.md`](./production_framework/specs/03_scenery_spec.md).

### Quick Agent Ground Rules:
- ⛔ **DO NOT** read `research/raw_*` (saves ~65k tokens; consult [`research/structure.md`](./research/structure.md)).
- ⛔ **DO NOT** read `discussions/_raw/` by default (cold archive for deep troubleshooting only).
- ✅ Start by reviewing the active summaries in [`discussions/`](./discussions/) and the latest finalized spec [`production_framework/specs/02_character_spec.md`](./production_framework/specs/02_character_spec.md).




