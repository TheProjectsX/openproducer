---
description: Save, load, or update global creator templates as human-readable Markdown files (auto-saves settings to brain on load; saves settings without plot on save)
---

# /opp-template (or /openproducer-template)

Execute the OpenProducer Template workflow to save, load, or update reusable configurations:

1. **Activate Skill:** Invoke the `openproducer-template` skill.
2. **Execute via Host CLI (Terminal Tool):**
   Run the OpenProducer CLI command in the terminal to bypass file sandbox restrictions and sync with the global vault:
   - **`list`**:
     ```bash
     npx openproducer template list
     ```
   - **`load [name]` / `use [name]`**:
     ```bash
     npx openproducer template use [name]
     ```
     - Auto-populates `./openproducer/config.json`, `./openproducer/state.json`, and `./openproducer/visual/technical_anchor.txt`.
     - Keeps mode in `explore` for plot intake, skipping any pre-filled template questions.
   - **`save [name]`**:
     ```bash
     npx openproducer template save [name]
     ```
     - Extracts project configuration, visual DNA, and pacing into `~/.openproducer/templates/[name].md` and `./openproducer/templates/[name].md`.
     - Strictly excludes the plot or script.
   - **`update [name] [instructions]`**:
     ```bash
     npx openproducer template update [name] "[instructions]"
     ```
     - Updates existing template from project brain changes and creator instructions without plot.
3. **Output Structured Status Card:**
   - Display the standardized `### 🎬 OpenProducer Status: TEMPLATE` card.
