# Discussion 30: The Template Workflow & OpenSpec Spec Architecture

**Date:** 2026-10-23  
**Status:** ✅ FINALIZED  
**Topic:** Integrating `template` Mode into Framework Workflow: Reusable Project Archetypes, Local PC Persistence, and OpenSpec-Style Unique Identifiers  
**Domain:** Architecture & Tooling Pipeline  

---

## 1. Creator Directives & The Problem Statement

> *"Can you please save in workflow or whatever we have to add 'template' flow along side explore, propose, sync, etc? The template will create a template of a certain type of video, either be just the video style or with the topic style, but will save a template in, idk, user's pc. And another command will load that template. We will use names as unique identifier, like openspec's spec 'stickfigure-longform' for example"*

### The Architectural Problem:
Currently, the operational lifecycle mandates:
`explore` $\rightarrow$ `propose` $\rightarrow$ `sync` $\rightarrow$ `apply`

While this greenfield path is essential for brand-new creative explorations, creators who produce recurring video formats (e.g. YouTube explainer stick figures, commercial product spotlights, hyper-car drifts) waste time repeating the `explore` phase from scratch each session.

---

## 2. The `template` Mode Architecture

We introduce **`template`** as a first-class operational mode alongside `explore`, `propose`, `sync`, and `apply`.

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                         OPERATIONAL MODES LIFECYCLE                              │
├───────────────────┬───────────────────┬───────────────────┬──────────────────────┤
│      MODE 1       │      MODE 2       │      MODE 3       │        MODE 4        │
│     EXPLORE       │     PROPOSE       │       SYNC        │        APPLY         │
│  (Brainstorming)  │ (Production Plan) │ (Lock & Validate) │ (Compile & Lint Shot)│
└─────────▲─────────┴───────────────────┴───────────────────┴──────────────────────┘
          │                                                            │
          │                   ┌──────────────────┐                     │
          │                   │     MODE 5       │                     │
          └───────────────────┤     TEMPLATE     │◄────────────────────┘
          Hydrates new project│  (Save / Load)   │Exports approved production
          from saved spec     └──────────────────┘as reusable blueprint
```

---

## 3. Storage & Unique Identifier Standard (OpenSpec Model)

### A. Unique Kebab-Case Identifiers
Templates are identified by a unique, human-readable kebab-case string mimicking OpenSpec specs:
- `stickfigure-longform`: 2D ink-on-paper, educational narrator, psychological explainer pacing.
- `stickfigure-shorts`: 9:16 vertical, rapid 10s comedic hook, snappy cartoon deformation.
- `tabletop-commercial-15s`: 100mm macro, obsidian water plinth, rectangular softboxes, 360° orbital wrap.
- `midnight-automotive-drift`: 24mm anamorphic, wet tarmac ground-skim, visceral twin-turbo foley.
- `scifi-dolly-zoom`: 35mm anamorphic, EVA helmet reflections, Hitchcock Zolly scale expansion.

### B. On-Disk Persistence Location
Templates are saved locally on the user's PC:
- **Project/Workspace Scope:** `<workspace_root>/templates/<template_id>/`
- **Global User Scope:** `~/.gemini/antigravity-ide/templates/video/<template_id>/`

---

## 4. Template File Package Layout

A saved template folder contains the entire reusable architectural DNA without project-specific temporary scratchpads:

```text
templates/<template_id>/             # e.g., templates/stickfigure-longform/
├── template_manifest.json           # Metadata: ID, version, archetype, aspect ratio, duration
├── project_intent.template.md       # Pre-configured scope guardrails and intent
├── visual/                          # Locked style DNA (style_summary, palette, technical_anchor)
├── environments/                    # Reusable staging (spatial_layers, lighting_rig, acoustics)
├── cinematography/                  # Approved lens mappings, shutter angles, kinematic rules
└── structure/                       # Baseline pacing manifest (3-act cinema or commercial hook-CTA)
```

---

## 5. The CLI / Agent Command Workflow

1. **`template save <template_id>`**
   - Packages the current project's approved visual style, environmental staging, and cinematography into `templates/<template_id>/`.
   - Strips ephemeral scene-specific shot renders while preserving all architectural anchor strings.
2. **`template list`**
   - Scans the template directory and displays all available templates with summary descriptions, recommended aspect ratios, and archetypes.
3. **`template load <template_id>`** (or `explore --template <template_id>`)
   - Instantly hydrates a fresh workspace directory with the complete template scaffold.
   - Bypasses initial exploratory questions, allowing the creator to immediately jump into `propose` or `sync`!
