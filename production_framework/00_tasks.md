# Production Framework Tasks

## Milestone 1: Architectural Definition & Schemas
- [x] Create Architecture Blueprint: `00_architecture_blueprint.md`
- [ ] Create Master Project Schema (`project.schema.json`)
- [ ] Create Script & Dialogue Schemas (`beat_sheet.schema.json`, `dialogue_bible.schema.json`)
- [ ] Create Character Bible & Anchor Schema (`character.schema.json`)
- [ ] Create Scenery & Lighting Schema (`scenery.schema.json`)
- [ ] Create Cinematography & Lens Presets (`cinematography_standards.json`)
- [ ] Create Audio & Soundscape Schema (`audio.schema.json`)
- [ ] Create Veo Shot Specification Schema (`shot_spec.schema.json`)

## Milestone 2: Reusable Project Template Directory (`production_template/`)
- [ ] Build empty scaffold with standard READMEs, templates, and placeholder files for all 8 departments:
  - `01_scripts/`
  - `02_characters/`
  - `03_sceneries/`
  - `04_cinematography/`
  - `05_soundtrack_and_audio/`
  - `06_storyboards/`
  - `07_shots/`
  - `08_pipeline/`

## Milestone 3: Python Automation Pipeline
- [ ] Implement `compile_shot.py` (Assembles shot prompt from character anchor, location lighting, camera kinematics, dialogue, audio)
- [ ] Implement `lint_shot.py` (Pre-flight validator enforcing rules L-01 to L-06)
- [ ] Implement `chain_continuity.py` (Checks terminal frame -> first frame linkages)

## Milestone 4: End-to-End Reference Production Project
- [ ] Build a complete working sample production project using the framework (e.g. 3-shot cinematic sequence)
- [ ] Validate compilation and linting output across all shots
