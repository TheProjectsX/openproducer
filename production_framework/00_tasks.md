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
- [ ] Complete End-to-End Multi-Clip Slicing & Continuity Simulation (*The 3:14 AM Doppelgänger* — active simulation currently being created & evaluated by creator)
- [ ] Authoritative Specification Validation: Finalize `specs/05_directors_cut_assembly_spec.md` sign-off upon completing simulation


## Milestone 2: Universal Project Template Directory (`production_template/`)
- [ ] Build clean, modular scaffold with standard READMEs, templates, and placeholder files for the universal layout:
  - `project_intent.md` (Locked north star manifest)
  - `blueprint.md` (Living collaboration scratchpad)
  - `visual/` (Visual DNA & Master Style Anchor)
  - `subjects/` (Characters & Hero Products with 2-step turntable sheets on #E5E5E5)
  - `environments/` (Worlds & Commercial Studio Stages)
  - `structure/` (Scale-adaptive pacing: Commercial Hook-CTA or Cinema Beat Sheet)
  - `shots/` (Shot units with decoupled API configs)
  - `pipeline/` (Automated compilers and linters)
- [ ] Implement OpenSpec-Style Template Storage (`templates/` directory contract & unique identifier specs)

## Milestone 3: Python Automation Pipeline
- [ ] Implement `compile_shot.py` (Assembles front-loaded 100–150 word Veo 3.1 prompt)
- [ ] Implement `lint_shot.py` (Automated pre-flight validator enforcing rules L-01 to L-06)
- [ ] Implement `manage_template.py` (`template save <name>`, `template load <name>`, `template list`)
- [ ] Implement `chain_continuity.py` (Checks terminal frame -> first frame linkages)
- [ ] Implement `export_flow_manifest.py` (Generates Google Flow Scene Builder timeline manifest)

## Milestone 4: End-to-End Reference Production Projects
- [ ] Build a complete Cinema reference sequence (e.g. 3-shot war aftermath / pilot sequence)
- [ ] Build a complete Commercial reference sequence (e.g. 3-shot Chrono-X dive watch commercial)
- [ ] Validate compilation and linting output across all reference shots
