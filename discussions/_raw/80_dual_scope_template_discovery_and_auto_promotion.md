# Discussion 80: Dual-Scope Template Discovery & Auto-Promotion

## Context & Root Cause Analysis
A creator saved a series template named `stickfigure` inside a project (`you_are_the_unusual`). However, when opening or initializing another project (`test`), the template was not found.

### Root Cause
1. **Agent Sandbox Boundary:** AI coding assistants (in Antigravity, Cursor, VS Code, and Claude Code) operate within project workspace boundaries under strict isolation rules (`DO NOT try to access content outside the working folder`). When the AI Agent executed `/opp-template save stickfigure`, it was unable to write directly to `~/.openproducer/templates/` (`C:\Users\<user>\.openproducer\templates\`), and instead saved the template within the project root:
   `./openproducer/templates/stickfigure.md`.
2. **Single-Vault CLI Blindspot:** The CLI's `TemplateManager` was previously hardcoded to only inspect `~/.openproducer/templates/`, completely ignoring project-level vaults (`./openproducer/templates/`) and sibling projects.

---

## Architectural Solution

### 1. Multi-Scope Template Discovery
`TemplateManager` in [`src/core/templates.ts`](../../src/core/templates.ts) now automatically searches across a 4-tier hierarchy:
1. **Global Workstation Vault:** `~/.openproducer/templates/<id>.md` (shared across all projects).
2. **Current Project Scope:** `<current_project>/openproducer/templates/<id>.md`.
3. **Sibling Project Vaults:** `<parent_dir>/*/openproducer/templates/<id>.md`.
4. **Bundled Starter Presets:** Core skill preset directory.

### 2. Automatic Global Promotion
Whenever `TemplateManager` executes (`list`, `getTemplate`, `save`, `update`, `use`, or `init`), it scans the active project and its sibling projects for any locally saved templates and **automatically promotes (syncs) them into the global workstation vault (`~/.openproducer/templates/`)**.

### 3. Dual-Vault Persistence
When `openproducer template save <name>` or `/opp-template save <name>` runs:
- The template is written to the global workstation vault (`~/.openproducer/templates/<name>.md`).
- It is also written to the project vault (`./openproducer/templates/<name>.md`).
This guarantees total portability: other projects can discover it immediately via the global vault, while the originating project retains a local copy within its own version control boundary.

