# Discussion 84: Sandbox Boundary, Self-Contained Knowledge Map & Workspace Sync Utility

## 1. Context & User Directives

During empirical simulation testing of a newly scaffolded project (`example_openproducer_project`), a critical sandbox leak was observed:
1. When an agent entered a fresh workspace and executed template operations (without running `/opp-explore` first), it attempted to traverse outside the project directory (`../`) searching for specification files.
2. Root Cause Analysis:
   - Within scaffolded projects, agent assets live in `.agents/skills/openproducer-core/` (dot-prefixed per agent skills standards).
   - Several instructions in `AGENTS.md` and `SKILL.md` files referenced `agents/skills/openproducer-core/...` without the leading dot.
   - Finding no `agents/` directory at the project root, the agent assumed the specs lived in a parent repository and attempted directory traversal.
3. User Mandates:
   - **Strict Sandbox Boundary Law:** Restrict the agent in `AGENTS.md` to NEVER access anything outside the project working folder, with exactly one exception: `~/.openproducer/` (the global user brain/vault). The agent must never probe parent folders (`../`) or proactively ask the producer for external directory access.
   - **Self-Contained Knowledge Base & Path Directory:** Explicitly document in `AGENTS.md` where every spec, style guide, starter preset, skill, and workflow lives within `.agents/` so the agent knows its local environment immediately upon workspace entry.
   - **Workspace Synchronization Utility (`sync-example.js`):** Create a standalone, gitignored script supporting hard transfer (wipe & full resync) and soft transfer (`--soft`, updating `.agents/` skills and documentation while preserving active project files in `openproducer/` and `production/`).
   - **Next Production Capability:** Lock **Thumbnail Design** as the next formal milestone.

---

## 2. Strict Workspace Sandbox Boundary & Zero External Traversal (Law 6)

Codified Law 6 in Section 1 of `production_template/AGENTS.md` (and mirrored in `STRUCTURE.md`):

1. **Local Project Boundary:** The agent must operate strictly within the current workspace directory (`<project_root>/`).
2. **Single Permitted External Directory (`~/.openproducer/`):** The **ONLY** directory outside the project that the agent is permitted to read or write is the creator's global user vault: `~/.openproducer/` (and its subdirectories, e.g. `~/.openproducer/templates/`, `~/.openproducer/cache/`).
3. **Zero Parent Directory Probing:** The agent is **STRICTLY FORBIDDEN** from navigating into parent directories (`../`), system folders, or sibling workspaces.
4. **Zero Volunteered External Access:** The agent must **NEVER proactively ask, prompt, or request permission** from the producer to inspect or access external directories. All specifications, styles, presets, linters, and rules are **100% self-contained inside this workspace** under `.agents/skills/openproducer-core/`.
5. **Explicit Producer-Initiated Exemption Only:** The ONLY time an agent is allowed to access an outside file is if the human producer **themselves explicitly provides a specific file path** (e.g. *"Import my screenplay from C:/Users/.../draft.txt"*). The agent must NEVER volunteer, suggest, or seek external folder access on its own.

---

## 3. Self-Contained Knowledge Base & Directory Map (Section 2 of `AGENTS.md`)

Added a prominent, structured directory map right after Section 1 so agents have zero ambiguity about asset locations:

| Component | In-Project Local Path | Contents & Purpose |
|---|---|---|
| **Authoritative Specs** | `.agents/skills/openproducer-core/specs/` | Full domain specifications: `01_visual_spec.md`, `02_character_spec.md`, `02_subject_spec.md`, `03_scenery_spec.md`, `04_cinematography_audio_spec.md`, `05_directors_cut_assembly_spec.md`, `06_retake_doctor_spec.md`, `07_scaffolding_and_workspace_spec.md`, `08_story_spec.md`, `safety_registry.md`. |
| **Pluggable Visual Styles** | `.agents/skills/openproducer-core/styles/` | The 8 medium guides (`live_action_cinema`, `traditional_2d_anime`, `vector_stick_figure`, `stylized_3d_cgi`, `stop_motion_claymation`, `commercial_tabletop`, `social_ugc_video`, `vintage_retro_film`). |
| **Bundled Starter Presets** | `.agents/skills/openproducer-core/templates/starter_presets/` | Pre-packaged starter presets (`video/` and `story/`). |
| **Project Local Templates** | `./openproducer/templates/<group>/` | Local series franchise presets (`video/`, `story/`, `audio/`, etc.). |
| **Global Workstation Vault** | `~/.openproducer/templates/<group>/` | Global machine vault accessible via `npx openproducer template ...`. |
| **Agent Skills & Workflows** | `.agents/skills/` & `.agents/workflows/` | All 9 operational skills and slash commands. |

All internal spec path references across `agents/skills/*/SKILL.md` were normalized to `.agents/skills/openproducer-core/...`.

---

## 4. Workspace Synchronization Utility (`sync-example.js`)

Created [`sync-example.js`](../../sync-example.js) (and wrapper [`scripts/sync-example.js`](../../scripts/sync-example.js)), added to `.gitignore`:
- **Default Hard Transfer (`node sync-example.js`):** Completely cleans/wipes `example_openproducer_project/`, copies `production_template/*` to project root, and copies `agents/*` to `.agents/`.
- **Soft Transfer (`node sync-example.js --soft` / `-s`):** Preserves all active project files created or modified by OpenProducer (`openproducer/`, `production/`, scripts, story files, clips), and only refreshes untouched assets:
  - `agents/*` $\rightarrow$ `example_openproducer_project/.agents/` (`skills` and `workflows`).
  - Framework documentation (`AGENTS.md` and `STRUCTURE.md`).

---

## 5. Next Horizon: High-CTR Thumbnail Design

Agreed to initiate Thumbnail Design as the next core feature of OpenProducer:
- **Core Prompting Mechanics:** Conditioned on `[IMAGE 1]` (Primary Subject Turnaround) + `visual/technical_anchor.txt` for 100% character and art style consistency.
- **The 40% Clean Negative Space Law:** Rule of thirds subject framing leaving 40% clean high-contrast negative space for title typography.
- **Format Coverage:** 16:9 (YouTube long-form) and 9:16 (Shorts/TikTok/Reels vertical cover frame).
- **The 3 CTR Archetypes:** (A) The Emotional Reaction / Face-First, (B) The Confrontation / Dilemma (VS Split), and (C) The Mystery Object / Reveal (Curiosity Gap).
- **Deliverables:** `production/packaging/thumbnail_prompt.txt`, `production/packaging/cover_prompt.txt`, and text overlay guidance.

