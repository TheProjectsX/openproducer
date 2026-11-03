# Discussion 79: Series Template Update Command & Schema Synchronization

## Context & Motivation
Previously, the Template Manager (`openproducer template` and `/opp-template`) supported three operational verbs:
1. `list`: View all global templates (`~/.openproducer/templates/`) and bundled starter presets.
2. `save <name>`: Save the current project's reusable configuration, Visual DNA, Subject traits, Environment setups, Pacing, and Typography as a clean `.md` file strictly without the episode plot.
3. `use <name>` / `load <name>`: Load a template's frontmatter and Visual DNA into the project brain (`./openproducer/`) without running `propose` or `produce`, enabling smart question skipping during `/opp-explore`.

As creators evolve their series across multiple episodes, design schemas change (e.g. refining master style anchors, shifting aspect ratios, modifying motion graphics typography, or updating color palettes). Creators needed a dedicated, first-class command to update an existing template:
`/opp-template update <template-name> [instructions]` (or `openproducer template update <id> [instruction]`).

---

## Technical Architecture & Behavior

### 1. Dual-Format Parsing & Formatting (`src/core/templates.ts`)
Upgraded `TemplateManager`:
- **Markdown-First (`.md`):** Parses YAML frontmatter and structured markdown sections (`Visual DNA`, `Subject DNA`, `Environment DNA`, `Pacing & Voice Profile`, `Motion Graphics & Typography`).
- **Legacy Fallback (`.json`):** Seamlessly reads legacy JSON templates while saving all updates as clean, human-readable Markdown.
- **`updateTemplate(templateId, updates)`:** Merges configuration and section modifications cleanly into the existing template and serializes back to disk.

### 2. Workspace & Directive Synchronization (`src/commands/template.ts`)
When `template update <templateId> [instruction]` is invoked:
1. **Verifies Project & Template Existence:** Ensures both target template (`~/.openproducer/templates/<templateId>.md`) and current workspace (`./openproducer/`) exist.
2. **Synchronizes Configuration:** Merges archetype, aspect ratio, operating tier, audio pathway, delivery mode, and visual style ID from `openproducer/config.json`.
3. **Synchronizes Style Anchor:** If `openproducer/visual/technical_anchor.txt` has changed, updates `## 🎨 Visual DNA: Master Style Anchor`.
4. **Synchronizes Motion Graphics:** If `production/motion_graphics.md` contains updated fonts or hex colors, updates `## 🔤 Motion Graphics & Typography`.
5. **Incorporates Creator Directive:** If the creator provides an instruction (e.g. `Update the design schema based on our current changes`), parses and records the directive.
6. **Preserves Strict Plot Exclusion Law:** Strictly guarantees that episode plots, story scripts, or scene dialogue are never injected into the template.

### 3. Agent Skill & Workflow Integration
- Updated [`openproducer-template`](../../agents/skills/openproducer-template/SKILL.md) and [`opp-template.md`](../../agents/workflows/opp-template.md) to support `/opp-template update <templateId> [instructions]`.
- Updated status card output with `Operation: UPDATE` and element-by-element diff report.

