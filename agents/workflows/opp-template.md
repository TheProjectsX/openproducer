---
description: Save, load, update, or interactively edit/refine global creator templates as human-readable Markdown files
---

# /opp-template (or /openproducer-template)

Execute the OpenProducer Template workflow to save, load, update, or interactively refine reusable configurations:

1. **Activate Skill:** Invoke the `openproducer-template` skill.
2. **Execute via Host CLI (Terminal Tool):**
   Run the OpenProducer CLI command in the terminal to bypass file sandbox restrictions and sync with the global vault:
   - **`list`**:
     ```bash
     npx openproducer template list               # List templates grouped by vault
     npx openproducer template list -p            # Show resolved physical file paths on disk
     npx openproducer template list --group story # Filter by specific template group
     ```
   - **`load [name]` / `use [name]`**:
     ```bash
     npx openproducer template use [name] [--group <group>]
     ```
     - Auto-detects template group (video, story, or custom).
     - Auto-populates `./openproducer/config.json`, `./openproducer/state.json`, and `./openproducer/visual/technical_anchor.txt` (or scaffolds `production/story/beats.md`).
     - Keeps mode in `init` (or `explore`) for plot intake, skipping any pre-filled template questions.
   - **`save [name]` / `create [name]`**:
     ```bash
     npx openproducer template save [name] [--group <group>]
     ```
     - In blank `init` workspace: starts an interactive interview to create a new template from scratch without requiring previous project data.
     - In active workspace: extracts project configuration, visual DNA, and pacing into `~/.openproducer/templates/<group>/[name].md` (strictly excluding the plot or script).
   - **`update [name] [instructions]`**:
     ```bash
     npx openproducer template update [name] "[instructions]" [--group <group>]
     ```
     - In blank `init` workspace: updates template parameters purely via conversation without workspace state.
     - In active workspace: updates existing template from current project changes and creator instructions.
   - **`edit [name]` / `refine [name]` (Interactive Conversational Workshop Loop)**:
     ```bash
     npx openproducer template edit [name]        # Load & display template schema for discussion
     npx openproducer template edit [name] save   # Promote approved edits to global vault
     ```
     - Enters an interactive discussion with the producer to modify the template for future videos/stories without touching current workspace `config.json`, `blueprint.md`, or video clips.
     - Loads template schema, discusses changes (adding/removing rules, adjusting pacing, tweaking anchors) in session memory, and writes to `./openproducer/templates/<group>/[name].md` + promotes via `npx openproducer template edit [name] save` only when the producer explicitly approves.
3. **Output Structured Status Card:**
   - Display the standardized `### 🎬 OpenProducer Status: TEMPLATE` card.
