---
description: Reconstruct an existing ./production/ deliverable set to match a target structure template (e.g. without clip images or using name references instead of [IMAGE 1])
---

# /opp-reconstruct (or /openproducer-reconstruct)

Execute the OpenProducer Reconstruct workflow to recreate `./production/` prompt files using a `structure` template:

1. **Activate Skill:** Invoke the `openproducer-reconstruct` skill.
2. **Resolve Structure Template:**
   - Look up `<structure_id>` in `./openproducer/templates/structure/`, `~/.openproducer/templates/structure/`, or `.agents/skills/openproducer-core/templates/structure/`.
   - If not specified, list available `structure` templates and ask the creator to choose one.
3. **Reconstruct `./production/`:**
   - Preserve `openproducer/` brain state, `production/audio_script.txt`, and `production/scratchbook.md` cue-to-visual timing/lineage.
   - Transform `production/clips/`, `production/subjects/`, `production/visuals/environments/`, and `production/master_*_prompt.txt` according to the structure template's layout, reference syntax (`[IMAGE N]` vs `@Name` / natural names), clip image mode (`required` / `none`), and block headers.
   - Never generate images on your own.
4. **Update Config & Mirror:**
   - Set `"structure_template_id": "<structure_id>"` in `./openproducer/config.json` and mirror the template to `./openproducer/templates/structure/<structure_id>.md`.
   - Record `Structure ID: structure/<structure_id>` in `production/scratchbook.md`.
5. **Output Structured Status Card:**
   - Display the standardized `### 🏗️ OpenProducer Status: RECONSTRUCT` card.
