---
description: Save or load global creator templates as human-readable Markdown files (auto-saves settings to brain on load; saves settings without plot on save)
---

# /opp-template (or /openproducer-template)

Execute the OpenProducer Template workflow to save or load reusable configurations:

1. **Activate Skill:** Invoke the `openproducer-template` skill.
2. **Execute Sub-Operation:**
   - **`load [name]` / `use [name]`**:
     - Load the template from `~/.openproducer/templates/<name>.md` or `agents/skills/openproducer-core/templates/starter_presets/<name>.md`.
     - **Auto-Save to Brain Immediately:** Parse YAML frontmatter and Visual DNA, writing settings directly into `./openproducer/` (`config.json`, `visual/technical_anchor.txt`, `state.json`) **without** running `propose` or `produce`.
     - **Reset Mode to `explore` with Smart Question Skipping:** The project stays in `explore` mode for the plot, and `explore` will **skip asking** any configuration already defined in the template (e.g., if `visual_style` is already Stick Figure, do not ask for style; if `aspect_ratio` is set, do not ask for orientation—only ask configurations that are missing from the template).
   - **`save [name]`**:
     - Save the current project's settings, configurations, visual style DNA, character/subject structure, environment setup, and audio/pacing settings as a clean human-readable Markdown file to `~/.openproducer/templates/<name>.md` **strictly WITHOUT the plot or story**.
   - **`list`**:
     - Display all saved templates and starter presets (`.md`).
3. **Output Structured Status Card:**
   - Display the standardized `### 🎬 OpenProducer Status: TEMPLATE` card.
