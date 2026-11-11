# Discussion 83: Flexible Template Groups, Discussion-First Genesis & The `init` Workspace Stage

## 1. Context & User Directives

Following the implementation of OpenProducer v2 Pre-Production skills (`opp-write` and `opp-rewrite`), we conducted an architectural audit and addressed key creator usability and scalability requirements:

1. **Safety Recheck & Tag Purity:**
   - Audited `openproducer-write` and `openproducer-rewrite` against Google AI Studio TTS specifications.
   - Eradicated dangerous parenthetical stage directions (e.g. `(whispering into radio)`) which Gemini TTS hallucinates as literal spoken dialogue, enforcing isolated XML expression tags (e.g. `<whispers>`).
   - Synchronized `08_story_spec.md` across core skill specs, workspace templates, and distribution bundles.

2. **The 4th Template Action (`edit` / `refine`):**
   - The CLI previously provided `list`, `use` (load), `save` (create), and `update`.
   - `update` was coupled to workspace changes, which is unintuitive when a creator wants to refine a template's internal parameters for future projects without altering active workspace assets.
   - Needed an interactive, conversational editing workshop where the producer and agent discuss and iterate on template adjustments across multiple turns, saving only upon explicit producer consent.

3. **Open-Ended Template Groups (Beyond Just Video & Story):**
   - Previously hardcoded around `video/` and `story/` sub-vaults.
   - Future workflows will introduce additional specialized template groups: `audio/` (voice timbre, background foley envelopes), `style/` (color grading palettes, lens packages), `motion/` (kinetic typography, camera kinematics), `lore/` (world-building bibles).
   - The architecture must be dynamically extensible to any arbitrary `<group>/<id>.md` without requiring core schema modifications.

4. **Context-Aware Template Operations (Discussion-First Genesis):**
   - In a brand new blank project, creators must be able to create, update, or refine templates without needing prior project assets (`visual/`, `shots/`, `script.txt`).
   - If the project is brand new (`init`), template commands operate conversationally via interactive discussion.
   - If the project is already explored/produced, template commands leverage existing workspace state and diffs.

5. **Project State Machine Architecture (`init` as Default Stage):**
   - Blank workspaces previously initialized directly in `"explore"` stage, creating ambiguity about whether cinematic exploration had already been performed.
   - Replaced default stage with `"init"`. State transitions to `"explore"` strictly when `/opp-explore` is executed.
   - Clarified that `write` and `rewrite` are **stateless pre-production skills**: they write deliverables to `production/story/` and record session logs, but do NOT possess an independent lifecycle stage in `state.json`.

---

## 2. The 4th Template Action: `edit` / `refine` (Interactive Template Workshop)

### Motivation & User Experience
Creators frequently want to adjust a template's instructions (e.g., "shorten the sentence pacing", "switch to 9:16 vertical cinematography", "add an audio soundscape guideline") without:
1. Having to manually edit markdown files in hidden directories (`~/.openproducer/templates/`).
2. Polluting or corrupting their currently active project video scripts and cinematography assets.
3. Overwriting files before seeing and confirming the proposed diff.

### The Collaborative Workshop Protocol
Running `npx openproducer template edit <id>` (or shorthand `refine <id>`):
1. **Inspection & Mirroring:** Loads the template into conversational session memory and creates an isolated working copy in `./openproducer/templates/<group>/<id>.md` (preventing global vault corruption during drafting).
2. **Interactive Discussion Loop:** The agent engages in a multi-turn conversation with the producer:
   - Evaluates requested adjustments (tone, style anchors, camera verbs, audio cues).
   - Proposes structured diffs and explains downstream implications.
   - Incorporates iterative producer feedback across successive chat turns.
3. **Producer-Controlled Commit:** The active workspace files (`production/`, `openproducer/visual/`, etc.) remain 100% untouched. Only when the producer explicitly gives final approval ("looks good, commit it" or "save changes"), the agent commits the updated template:
   ```bash
   npx openproducer template edit <id> save
   ```
4. **Vault Auto-Promotion:** The approved template is promoted to the global workstation vault (`~/.openproducer/templates/<group>/<id>.md`), ensuring future projects immediately inherit the refinements.

---

## 3. Dynamically Extensible Template Groups (`<group>/<id>.md`)

Instead of hardcoding a binary split between `video` and `story`, OpenProducer now treats template groups as dynamic sub-vault namespaces:

```
~/.openproducer/templates/           (Global Workstation Vault)
├── video/                           (Cinematography, visual anchors, aspect ratios)
│   ├── stickman-explainer.md
│   └── cinematic-epic.md
├── story/                           (Screenplay schemas, narrative arcs, TTS pacing)
│   ├── story-stickfigure-rant.md
│   └── story-true-crime-mystery.md
├── audio/                           (Voice profiles, soundscape layers, EQ presets)
│   └── synthwave-foley.md
├── style/                           (Color grading LUTs, film stocks, lens metadata)
│   └── 35mm-bleach-bypass.md
└── motion/                          (Kinetic typography, motion graphics rules)
    └── fast-paced-captions.md
```

### CLI Dynamic Discovery & Management
- **Dynamic Scanning:** Automatically discovers all subdirectories inside `~/.openproducer/templates/` and local `./openproducer/templates/`. Any new folder instantly becomes a recognized group.
- **Group Option:** All template commands accept `-g, --group <group>` (e.g. `npx opp template list -g audio` or `npx opp template use synthwave-foley -g audio`).
- **Dynamic Grouped Listing:**
  ```text
  === Global & Project Templates ===

  🎬 VIDEO
    - stickman-explainer [global]
    - cinematic-epic [global]

  📖 STORY
    - story-stickfigure-rant [global]
    - story-true-crime-mystery [global]

  🎙️ AUDIO
    - synthwave-foley [global]

  📁 CUSTOM_GROUP
    - custom-preset [global]
  ```

---

## 4. Context-Aware Template Behaviors: `init` vs. Active Workspace

Template operations dynamically adapt based on project lifecycle stage:

| CLI Action | Brand New Project (`current_stage: "init"`) | Active Project (`explore`, `proposed`, `produced`, etc.) |
|---|---|---|
| `save` / `create` | **Discussion-First Genesis:** Interactively gathers intent from producer and drafts template from scratch with zero required workspace assets. | **Workspace Snapshot:** Ingests current project configs (`visual/`, `motion_graphics.md`, `beats.md`) and snapshots them into a reusable template preset. |
| `update` | **Conversational Tuning:** Updates template parameters directly via chat instructions without needing project diffs. | **Diff Synchronization:** Intelligently captures edits made to the active workspace assets and applies them to the linked template. |
| `use` / `load` | **Baseline Configuration:** Sets template IDs in `config.json` and populates starting scaffold ready for explore or write. | **Non-Destructive Merge:** Loads template rules while prompting producer before overwriting customized assets. |
| `edit` / `refine` | **Isolated Workshop:** Launches conversational refinement loop; commits to vault only on producer approval. Workspace assets untouched. | **Isolated Workshop:** Same isolated behavior. Actively shields current production assets from being modified during template discussions. |

---

## 5. Project State Machine: The `init` Mode & Stateless Pre-Production

### The Problem with Defaulting to `explore`
When a new project was scaffolded via `openproducer init`, setting `"current_stage": "explore"` caused subtle logical confusion:
- It implied that the exploratory phase was already active or that the creator had initiated the visual discovery process.
- It created ambiguity for creators starting with narrative writing (`/opp-write`), template authoring (`/opp-template`), or importing an existing script.

### The Unified Stage Transition Model
1. **`init` (Blank Initialized Canvas):**
   - The default stage for freshly scaffolded repositories.
   - Creator is free to explore, load templates, or draft stories.
   - Status CLI clearly reports: `INIT (Blank Initialized Workspace — Ready for Explore, Template, or Story)`.
2. **`explore` (Visual & Cinematographic Discovery):**
   - Triggered exclusively when `/opp-explore` is invoked.
   - Ingests story (from `production/story/script.txt` if available) and locks cinematography baseline.
3. **`proposed`:** Generated clips and shot lists awaiting producer approval (`/opp-propose`).
4. **`produced`:** Finalized prompts, audio scripts, and clips ready for generation (`/opp-produce`).
5. **`guiding`:** Real-time generation guidance and asset management (`/opp-guide`).
6. **`completed`:** Post-production safety audits and QA signoff (`/opp-doctor`).

```
                    ┌──────────────┐
                    │     init     │ ◄── Project Scaffolded
                    └──────┬───────┘
                           │
             ┌─────────────┼─────────────┐
             ▼             ▼             ▼
       /opp-template   /opp-write   /opp-explore
       (Configures     (Generates        │
        Templates)      Scripts)         │
             │             │             │
             └─────────────┴─────────────┤
                                         ▼
                                   ┌───────────┐
                                   │  explore  │
                                   └─────┬─────┘
                                         ▼
                                   ┌───────────┐
                                   │ proposed  │
                                   └─────┬─────┘
                                         ▼
                                   ┌───────────┐
                                   │ produced  │
                                   └─────┬─────┘
                                         ▼
                                   ┌───────────┐
                                   │  guiding  │
                                   └─────┬─────┘
                                         ▼
                                   ┌───────────┐
                                   │ completed │
                                   └───────────┘
```

### Stateless Pre-Production (`opp-write` & `opp-rewrite`)
- `write` and `rewrite` do **NOT** modify `current_stage` in `state.json`.
- They produce tangible files in `production/story/` (`script.txt`, `beats.md`, `clean.txt`) and record execution in `blueprint.md` session history.
- This decoupling allows creators complete flexibility: a creator can write a script, rewrite it three times, refine an audio template, and remain in `init` until they are ready to launch `/opp-explore` or `/opp-propose`.

---

## 6. Verification & Implementation Deliverables

All specifications, CLI tools, skills, and templates were verified and synchronized:
1. **Core Type System (`src/core/types.ts`):** Added `'init'` to `OpenProducerState['current_stage']`, `group: string` to `TemplateInfo`, and `GenericTemplate` interface.
2. **Scaffolding (`src/core/scaffold.ts`):** `state.json` initializes with `"current_stage": "init"`; `blueprint.md` logs mode `init` with next steps for explore, template, or story.
3. **Template Engine (`src/core/templates.ts`):** Dynamic group directory discovery across `~/.openproducer/templates/<group>/` and `./openproducer/templates/<group>/`, `listAllTemplates()`, `listGroupTemplates()`, `getGenericTemplate()`, `saveGenericTemplate()`.
4. **CLI Template Command (`src/commands/template.ts`, `src/cli.ts`):** Added `-g, --group <group>` option, context-aware discussion-first genesis in `init`, and isolated `edit` / `refine` workshop loop.
5. **Agent Skills & Workflows:** Updated `openproducer-explore`, `openproducer-produce`, `openproducer-sync`, `openproducer-template`, and `opp-template.md` to reflect `init` stage transitions and dynamic group support.
6. **Workspace Template (`production_template/AGENTS.md`):** Updated the 9-mode state diagram starting in `init`.
7. **Asset Bundling & Cache Synchronization:** Executed `npm run build` and updated `~/.openproducer/cache/upstream/`. Zero TypeScript compilation errors.

