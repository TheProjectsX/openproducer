# Discussion 81: Native CLI Template Execution (Zero-Script Workspace Architecture)

## 1. Context & User Directives
- **Initial Idea:** Considered generating helper `.js` files inside `.agents/scripts/` to give agents a host script.
- **Creator Directive & Better Architecture:** Why clutter the creator's workspace with script files inside `.agents/` when `npx openproducer template [action]` already exists in the official CLI?
- **Decision:** Remove all script clutter from `.agents/`. Unify everything under the single official command:
  ```bash
  npx openproducer template <list | save | use | update>
  ```
  (or shorthand `npx opp template <action>`).

## 2. Why `npx openproducer template` Is Superior
1. **Pristine Workspace:** Keeps `.agents/` strictly containing agent definitions (`skills/` and `workflows/`) with zero clutter or maintenance baggage.
2. **Sandbox-Safe:** In all AI editors (Antigravity, Cursor, Claude Code, Windsurf, VS Code), running terminal commands launches a host process. `npx openproducer template` accesses `~/.openproducer/templates/` with full OS permissions, completely bypassing file-tool sandbox constraints.
3. **Dual-Scope Auto-Promotion Built-In:** The TypeScript CLI automatically discovers templates in `~/.openproducer/templates/`, local project `./openproducer/templates/`, and starter presets, synchronizing them smoothly.
4. **Instant Execution When Installed:** When `openproducer` is installed or linked globally, `npx openproducer template` runs in milliseconds without network latency.

## 3. Workflow & Skill Updates
- Updated `agents/skills/openproducer-template/SKILL.md` and `agents/workflows/opp-template.md` to direct agents to run:
  - `npx openproducer template list`
  - `npx openproducer template use <name>`
  - `npx openproducer template save <name>`
  - `npx openproducer template update <name> [instructions]`
- Verified across projects (`test`, `you_are_the_unusual`).
- Bundle packaged into `openproducer-1.1.0.tgz` (109 files, 167.5 kB).
