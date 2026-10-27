# Discussion Log: Framework Scope & Mode-Based Architecture

**Status:** Consolidated Architecture Record  
**Topic:** Aligning on Lean Production Structure & OpenSpec-Inspired Modes (`explore`, `propose`, `sync`, `apply`)

---

## 1. Core Philosophy: Lean & Creator-Centric

- **Sole Target:** To generate ultra-high-quality, cinema-grade prompts and reference assets that accurately translate the creator's vision into Google Flow (orchestrating Veo 3.1, Imagen 4, and Gemini Omni Flash).
- **Anti-Pattern to Avoid:** Over-engineering. Do not create bureaucratic abstractions that distract from prompt quality.
- **The Core Problem with Chat-Only Prompting:**
  - One-off prompts cause **identity drift** (characters change faces between shots).
  - Background lighting, mood, and spatial scales change randomly between cuts (**style drift**).
  - Spoken dialogue produces burned-in subtitles or robotic letter-by-letter spelling.
  - Camera movements conflict or warp the 3D space.
- **The Solution:** A modular folder structure (`project_intent.md`, `blueprint.md`, `visual/`, `subjects/`, `environments/`, `structure/`, `shots/`) where each domain houses its assets and rules. When it's time to generate prompts, the system pulls the relevant elements directly into the final Flow prompt.

---

## 2. Mode-Based Skill Architecture (OpenSpec Paradigm)

To guarantee 100% session independence across different PCs and chats, the workflow is organized into five discrete operational modes:

```
┌──────────────────┐       ┌──────────────────┐       ┌──────────────────┐       ┌──────────────────┐
│      MODE 1      │       │      MODE 2      │       │      MODE 3      │       │      MODE 4      │
│     EXPLORE      │ ────► │     PROPOSE      │ ────► │       SYNC       │ ────► │      APPLY       │
│  (Brainstorming) │       │(Production Plan) │       │ (Lock & Validate)│       │ (Compile & Lint) │
└─────────▲────────┘       └──────────────────┘       └──────────────────┘       └────────┬─────────┘
          │                                                                               │
          │                        ┌──────────────────┐                                   │
          │                        │      MODE 5      │                                   │
          └────────────────────────┤     TEMPLATE     │◄──────────────────────────────────┘
            Hydrates new project   │  (Save / Load)   │  Exports approved production
            from saved template    └──────────────────┘  as reusable OpenSpec asset
```

1. **Mode 1 (`explore`):** Unpacks the creator's vision through collaborative brainstorming. Writes `project_intent.md`, `blueprint.md`, and initial domain notes.
2. **Mode 2 (`propose`):** Converts the concept into a complete cinematic production plan (3-act beat sheet, shot list, dialogue lines, proposed verbatim anchors).
3. **Mode 3 (`sync`):** Creator reviews, provides feedback, and locks character Master Verbatim Anchors and reference turnaround sheets.
4. **Mode 4 (`apply`):** Compiles production-ready front-loaded Veo prompts, runs pre-flight quality linting, and outputs clean prompt files.
5. **Mode 5 (`template`):** OpenSpec-style template management allowing creators to package approved production setups into reusable named templates (`template save <name>`) and instantly hydrate new projects (`template load <name>` or `explore --template <name>`). Uses unique kebab-case identifiers (e.g. `stickfigure-longform`, `tabletop-commercial-15s`).

---

## 3. Session Portability Contract

Every mode reads existing files as input and writes tangible artifacts to the folder system as output. If a creator finishes `explore` on PC 1, they can sit down at PC 2, open a new chat, say *"Let's move to propose"*, and the agent immediately resumes without chat history loss.

---

## 4. Top-Level Project Intent & The Living Collaboration Blueprint

To prevent model hallucination and ensure total transparency between Creator and AI Agent:

1. **Top-Level Project Intent Manifest (`project_intent.md`):**
   - Locked directly at the project root.
   - Sits as the Agent's permanent north star, declaring Project Archetype (Commercial, Cinema, Social, Doc, Music), format (aspect ratio, duration, cuts), and strict scope guardrails (e.g. "Commercial ad: NO dialogue, NO human character bibles, focus on rigid product geometry and tactile ASMR foley").

2. **The Living Collaboration Blueprint (`blueprint.md`):**
   - Active, living scratchpad at the project root recording every step of the dialogue:
     - **Creator Input:** Raw verbatim instructions/vision.
     - **Agent Interpretation:** Architectural mapping to framework primitives and model constraints.
     - **Actions Taken:** Concrete files written or compiled.
     - **Next Step:** Immediate pending action.
   - Allows the creator to verify the AI's understanding at any moment, and provides a continuous reasoning audit trail across agent sessions.

---

## 5. Unified AI-Centric Root Project Layout

```text
<project_root>/
├── project_intent.md       # LOCKED: Top-level Archetype, Goals, Platform, and Scope Guardrails
├── blueprint.md            # LIVING: Step-by-step raw collaboration log between Creator & Agent
├── visual/                 # Visual DNA & Master Style Anchor
├── subjects/               # Characters OR Products (2-step turntable locked assets on #E5E5E5)
├── environments/           # Narrative Worlds OR Commercial Studio Stages (3-plane depth & lighting)
└── shots/                  # Compiled 100-150 word Veo prompts + pre-flight lint reports
```

*(Reference Raw Logs: [`_raw/01_architecture_and_modes.md`](./_raw/01_architecture_and_modes.md), [`_raw/15_project_archetypes_and_scope_expansion.md`](./_raw/15_project_archetypes_and_scope_expansion.md), and [`_raw/16_top_level_intent_and_living_collaboration_blueprint.md`](./_raw/16_top_level_intent_and_living_collaboration_blueprint.md))*

