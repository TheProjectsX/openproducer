---
description: Save or load global creator series franchise presets
---

# /opp-template

Execute the OpenProducer Template workflow to manage global franchise presets:

1. **Activate Skill:** Invoke the `openproducer-template` skill.
2. **Execute Requested Sub-Operation:**
   - **`save [name]`**: Extract current project's visual style anchor, character biometrics, studio setting, and pacing profile. Validate against `skills/openproducer-core/templates/schema.json` and save to `~/.openproducer/templates/<template_id>.json`.
   - **`use [name]`**: Load template from `~/.openproducer/templates/` or `skills/openproducer-core/templates/starter_presets/`. Initialize project workspace, ask strictly for new episode script/plot, and skip explore intake directly into `propose` / `produce`.
   - **`list`**: Display all saved user templates and pre-baked starter presets.
3. **Output Structured Status Card:**
   - Display the standardized `### 🎬 OpenProducer Status: TEMPLATE` card confirming template operation.
