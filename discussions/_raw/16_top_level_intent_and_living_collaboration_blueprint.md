# Discussion 16: Top-Level Project Intent & The Living Collaboration Blueprint

**Date:** 2026-10-22  
**Status:** ✅ FINALIZED (Architectural Standard)  
**Topic:** AI-Centric File Systems, Top-Level Project Intent Manifest (`project_intent.md`), and The Living Raw Scratchpad (`blueprint.md`)  
**Domain:** `architecture/` & Core Skill Operating System  

---

## 1. The Core Philosophy: The AI-Centric File System

> *"The creator will not read through the folders, normally. The AI will. So we need to follow the AI friendly approach."*

In traditional software, directory trees are built for human navigation. In this framework, **the human interacts almost exclusively through natural conversation, and the AI agent is the operating system**. 

The file system serves two vital, non-human functions:
1. **The AI's Deterministic External Memory & Cache:** Storing invariant prompt tokens, style anchors, and physical traits outside of volatile chat context windows.
2. **The Prompt Assembly Line:** Allowing the AI prompt compiler to surgically grab and concatenate modular blocks (`Subject` + `Action` + `Environment Lighting` + `Kinematics` + `Style` + `Audio`) into a final 100–150 word Veo 3.1 prompt without hallucinating.

---

## 2. Component 1: Top-Level Project Intent Manifest (`project_intent.md`)

When a creator arrives, they state their assignment in everyday language:
> *"I need to make a 15-second commercial video about a new luxury watch called Chrono-X. It needs to feel dark, moody, and waterproof."*

The Agent must never forget this high-level assignment, regardless of session wipes or switching PC workstations. If the project is a commercial, the Agent must not hallucinate narrative movie requirements (like 3-act scripts or dialogue bibles).

To guarantee this, the Agent initializes **`project_intent.md`** at the project root as the **permanent north star**.

### Standard Contract: `project_intent.md`
```markdown
# Project Intent Manifest

- **Project Title:** [PROJECT_NAME]
- **Project Archetype:** [Commercial & Product | Narrative Cinema | Social UGC / B-Roll | Documentary & Nature | Music Video / Abstract]
- **Target Platform:** [e.g., Instagram Reels / TikTok Ads | YouTube 16:9 | Cinematic Festival]
- **Technical Format:** [Aspect Ratio e.g. 9:16 | Resolution e.g. 1080p | Total Duration e.g. 15s (3 cuts x 5s)]
- **Primary Objective:** [1-2 sentences capturing core commercial / narrative goal]

## Architectural Scope & Guardrails
- **Subjects Included:** [e.g., 1 Hero Product (`subjects/chrono_watch/`)]
- **Subjects Excluded:** [e.g., NO human actors, NO character turnarounds]
- **Environments Included:** [e.g., 1 Commercial Studio Stage (`environments/dark_water_plinth/`)]
- **Audio Scope:** [e.g., Pure tactile ASMR foley (clicks, water splashes, ticking)]
- **Dialogue Policy:** [STRICTLY NONE | Permitted with delivery modifiers]
- **Structure Policy:** [Commercial Hook-Showcase-CTA | 3-Act Beat Sheet | Single-Shot Loop]
```

---

## 3. Component 2: The Living Collaboration Blueprint (`blueprint.md`)

Before information is serialized into permanent, structured domain folders (`subjects/`, `environments/`, `shots/`), it exists in a state of fluid dialogue. 

The framework establishes **`blueprint.md`** at the project root as an active, chronological, living collaboration scratchpad.

### The Problem It Solves:
1. **Creator Verification:** The creator can at any moment open this single file and verify: *"Did the AI actually understand what I said? What is it working on right now?"*
2. **Context Loss Protection:** If an agent session is terminated or restarted, the new agent reads `blueprint.md` and immediately resumes the exact train of thought and progress.
3. **Unserialized Staging Ground:** Allows raw ideas, revisions, and feedback to be logged step-by-step before formalizing them into strict spec files.

### Standard Step Entry Format in `blueprint.md`:
```markdown
### Step [N]: [Step Title / Milestone]
- **Creator Input:** [Raw transcription of what the creator envisioned or requested]
- **Agent Interpretation:** [How the Agent mapped this request onto framework primitives, models, and constraints]
- **Actions Taken:** [Concrete files created, updated, or compiled]
- **Next Step:** [Immediate pending task awaiting creator confirmation or execution]
```

### Complete Simulation of `blueprint.md` in Practice:
```markdown
# Living Project Blueprint & Collaboration Log

**Project:** Chrono-X Commercial  
**Archetype:** Commercial & Product Spotlight  
**Current Phase:** Mode 1 (Explore) -> Mode 2 (Propose)  

---

### Step 1: Project Initiation & Archetype Selection
- **Creator Input:** "I need to make a 15-second commercial video about a new luxury dive watch called Chrono-X. It needs to feel dark, moody, and waterproof."
- **Agent Interpretation:**
  - Archetype identified: Commercial & Product Spotlight.
  - Guardrails locked: Zero dialogue, no character bibles, focus on rigid product geometry and tactile foley.
- **Actions Taken:**
  - Initialized `project_intent.md` with Commercial Archetype guardrails.
  - Set Master Visual DNA in `visual/`: High-contrast digital cinema, reflective dark surfaces, cyan rim lighting.
- **Next Step:** Define physical watch traits and generate 4-view reference turnaround.

---

### Step 2: Defining the Hero Asset (Watch)
- **Creator Input:** "The watch has a matte black titanium case, a knurled rotating bezel, dark emerald green dial, and glowing green lume hands. Make sure the water splashes look real."
- **Agent Interpretation:**
  - Subject is `subjects/chrono_watch/`.
  - Invariant traits to lock: Matte black titanium texture, knurled bezel edge, emerald dial with glowing green lume.
  - Risk to prevent: Veo morphing the dial layout or flipping the crown across cuts.
- **Actions Taken:**
  - Logged raw traits to `subjects/chrono_watch/spec.md`.
  - Formulated 2-step turntable prompt for 4-angle reference sheet on #E5E5E5 (Front dial, 90° crown side, 45° angled bezel, macro dial close-up).
- **Next Step:** Align on the commercial studio set environment.

---

### Step 3: Staging the Studio Environment
- **Creator Input:** "Don't put it in a room. I want it sitting on a black block in water with a dark misty background."
- **Agent Interpretation:**
  - Environment is a Commercial Studio Stage (`environments/dark_water_plinth/`).
  - Spatial setup: Matte black submerged pedestal, 2 inches of dark rippling water, subtle misty backdrop.
  - Lighting rig: Top-down rectangular softbox diffuser with sharp cyan rim light cutting across the metal edges.
- **Actions Taken:**
  - Initialized environment configuration in `environments/dark_water_plinth/`.
- **Next Step:** Break down the 3 commercial shots (Hook, Showcase, Macro).
```

---

## 4. Standard Unified Root Project Directory Contract

With `project_intent.md` and `blueprint.md` established, the standard root of any project generated by the framework is clean, modular, and optimized for both human clarity and AI execution:

```text
<project_root>/
├── project_intent.md       # LOCKED: Top-level Archetype, Goals, Platform, and Scope Guardrails
├── blueprint.md            # LIVING: Step-by-step raw collaboration log between Creator & Agent
├── visual/                 # Visual DNA & Master Style Anchor
├── subjects/               # Characters OR Products (2-step turntable locked assets on #E5E5E5)
├── environments/           # Narrative Worlds OR Commercial Studio Stages (3-plane depth & lighting)
└── shots/                  # Compiled 100-150 word Veo prompts + pre-flight lint reports
```

---

## 5. Architectural Consensus

1. **AI-First Design:** The directory structure is optimized for AI query speed, token efficiency, and deterministic prompt compilation.
2. **Top-Level North Star:** `project_intent.md` prevents cross-archetype hallucination (keeps commercials commercial and cinema cinematic).
3. **Complete Process Transparency:** `blueprint.md` gives creators total real-time insight into the AI's internal reasoning and progress.
