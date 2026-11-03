---
description: Save, load, or update global creator templates as human-readable Markdown files (auto-saves settings to brain on load; saves settings without plot on save)
---

# /opp-template (or /openproducer-template)

Execute the OpenProducer Template workflow to save, load, or update reusable configurations:

1. **Activate Skill:** Invoke the `openproducer-template` skill.
2. **Execute Sub-Operation:**
   - **`load [name]` / `use [name]`**:
     - Locate template across the search hierarchy: Global vault (`~/.openproducer/templates/<name>.md`), local project vault (`./openproducer/templates/<name>.md`), sibling projects (`../<sibling>/openproducer/templates/<name>.md`), or starter presets (`agents/skills/openproducer-core/templates/starter_presets/`).
     - **Auto-Save to Brain Immediately:** Parse YAML frontmatter and Visual DNA, writing settings directly into `./openproducer/` (`config.json`, `visual/technical_anchor.txt`, `state.json`) **without** running `propose` or `produce`.
     - **Reset Mode to `explore` with Smart Question Skipping:** The project stays in `explore` mode for the plot, and `explore` will **skip asking** any configuration already defined in the template (e.g., if `visual_style` is already Stick Figure, do not ask for style; if `aspect_ratio` is set, do not ask for orientation—only ask configurations that are missing from the template).
   - **`save [name]`**:
     - Save current project configurations, visual style DNA, generic character/subject structure, environment setup, and audio/pacing settings as a clean human-readable Markdown file to `./openproducer/templates/<name>.md` and sync globally to `~/.openproducer/templates/<name>.md` (via `npx openproducer template save <name>`).
     - **Strictly WITHOUT the plot or story**.
   - **`update [name] [instructions]`**:
     - Update an existing template in `~/.openproducer/templates/<name>.md` and `./openproducer/templates/<name>.md` based on changes in current workspace brain (`openproducer/config.json`, `visual/technical_anchor.txt`, `production/motion_graphics.md`) and any specific creator directives (e.g. `/opp-template update abc-template Update the design schema based on our current changes`).
     - Strictly excludes the episode plot, story, or specific dialogue from the updated template.
   - **`list`**:
     - Display all saved templates and starter presets (`.md`) across global and local vaults.
3. **Output Structured Status Card:**
   - Display the standardized `### 🎬 OpenProducer Status: TEMPLATE` card.
