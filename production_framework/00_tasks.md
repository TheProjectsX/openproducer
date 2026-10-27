# Production Framework Tasks

## Milestone 1: Architectural Definition & Schemas
- [x] Create Architecture Blueprint: `00_architecture_blueprint.md` (AI-Centric Multipurpose Architecture)
- [x] Create Visual Style Specification: `specs/01_visual_spec.md` (8 Master Style Paradigms)
- [x] Create Master Subject Specification: `specs/02_subject_spec.md` (Hero Products, Vehicles & Artifacts)
- [x] Create Deep Character Specification: `specs/02_character_spec.md` (Human & Anime Character Bible)
- [x] Create Universal Environment Specification: `specs/03_scenery_spec.md` (World Locations & Commercial Studio Stages)
- [x] Create Cinematography & Audio Specification: `specs/04_cinematography_audio_spec.md`
- [ ] Create Core JSON Schemas:
  - `project_intent.schema.json`
  - `visual.schema.json`
  - `subject.schema.json`
  - `environment.schema.json`
  - `shot.schema.json`
  - `template_manifest.schema.json`

## Phase 6: Director's Cut, Temporal Slicing & Multi-Engine Assembly
- [x] Establish Director's Scratchbook & Narrative Slicing Architecture (`discussions/directors_cut_and_assembly.md`)
- [x] Formalize Temporal Chunking (4s/6s/8s/10s) & Action Budgeting (Word-to-time pacing calculation)
- [x] Formalize Continuity Chaining Bridge (`last_frame` terminal frame handoffs, spatial entry/exit states & 180° rule)
- [x] Define Multi-Engine Modality Matrix (Flow Chunks vs. Slideshows + ElevenLabs / Gemini TTS vs. Hybrid)
- [x] Formulate Asset & Audio Origin Tracker ("What comes from where" matrix)
- [x] Complete End-to-End Multi-Clip Slicing & Continuity Simulation (*The 3:14 AM Doppelgänger* — verified & validated by creator testing)
- [x] Authoritative Specification Validation: Finalize `specs/05_directors_cut_assembly_spec.md` sign-off upon completing style registry integration and phase cleanup


## Milestone 2: Universal Project Template Directory (`production_template/`)
- [ ] Build clean, modular scaffold with standard READMEs, templates, and placeholder files for the universal layout:
  - `project_intent.md` (Locked north star manifest)
  - `blueprint.md` (Living collaboration scratchpad)
  - `visual/` (Visual DNA & Master Style Anchor)
  - `subjects/` (Characters & Hero Products with 2-step turntable sheets on #E5E5E5)
  - `environments/` (Worlds & Commercial Studio Stages: `summary.md`, `spatial_layers.md`, `lighting_rig.md`, `acoustics.md`, `master_anchor.txt`)
  - `structure/` (Scale-adaptive pacing: Commercial Hook-CTA or Cinema Beat Sheet)
  - `shots/` (Director's Cut ledger, Tier 1–3 prompts, and `clips/clip_XX/` units with decoupled configs)
  - `pipeline/` (Automated Node.js compilers and L-01 to L-18 linters)
- [ ] Implement OpenSpec-Style Template Storage (`templates/` directory contract & unique identifier specs)

## Milestone 3: Node.js CLI Automation Pipeline (`@theprojectsx/video-skill`)
- [ ] Implement `compile` command (Assembles front-loaded 100–150w T2V / 75–150w I2V Veo 3.1 prompts)
- [ ] Implement `lint` command (Automated pre-flight validator enforcing Master Linters L-01 to L-18)
- [ ] Implement `template` command (`template save <name>`, `template load <name>`, `template list`)
- [ ] Implement `chain` command (Checks terminal frame `last_frame` -> first frame linkages and 30° contrast)
- [ ] Implement `export` command (Generates Google Flow Scene Builder timeline manifest)

## Milestone 4: End-to-End Reference Production Projects
- [ ] Build a complete Cinema reference sequence (e.g. 3-shot war aftermath / pilot sequence)
- [ ] Build a complete Commercial reference sequence (e.g. 3-shot Chrono-X dive watch commercial)
- [ ] Validate compilation and linting output across all reference shots
