# Discussion 96 — Recovering a Project from Production Files

**Date:** 2026-11-16  
**Status:** Skill and metadata contract implemented in the base project and bundled package assets.

## Creator scenario

The creator used a video template for a project, saved or sent the `production/` folder, and later deleted the project. They want a new skill to rebuild enough OpenProducer brain state from that folder to continue and revise the same video.

## Established requirement

Recovery must restore the original **template context** as well as infer project-specific context from production deliverables. Merely reconstructing a generic `openproducer/` brain loses the template's style, pacing, audio, and other reusable instructions. The existing template skill is for reusable presets; the proposed recovery skill would resume a particular production.

The creator rejected storing a template copy inside `production/`. Instead, `production/scratchbook.md` should record the template name/ID as small metadata so recovery can locate and load the template separately.

## Current implementation facts

- `openproducer/state.json` records `template_loaded`, but that file is absent when only `production/` survives.
- `openproducer template use <id>` writes template settings to `config.json`, writes the style anchor, and mirrors the template under `openproducer/templates/`. Applying it after recovery could overwrite values established by the production files.
- Production prompts and the scratchbook can reveal many project choices, but older scratchbooks may not identify the template. A recorded ID alone does not preserve a historical template revision.

## Candidate design for discussion

- At production time, add a concise `Template ID: video/<slug>` line near the top of `production/scratchbook.md` (or `Template ID: none`). The implemented Markdown form is a bullet with bold label and code-formatted ID.
- On recovery, read the ID from the scratchbook and search the existing template vault for that template. If the template is unavailable, ask the creator for its location or proceed only with clearly marked partial context.
- Do not archive template contents in `production/`. If the template has changed since production, the ID alone cannot prove which revision was used; report the uncertainty rather than claiming exact historical continuity.
- Treat the recovered template as the baseline and the project's surviving production choices as subsequent overrides. Compare before applying either to a reconstructed brain.
- Support older `production/` folders without recovery metadata through evidence-based reconstruction and targeted creator questions.

## 2026-11-16 implementation

- Created `agents/skills/openproducer-recover/SKILL.md` and `agents/workflows/opp-recover.md`.
- Added the `Template ID` scratchbook field to active produce guidance, the workspace spec, and project scaffolding guidance.
- Recovery treats the template as a baseline and surviving production files as the project record. It reports missing/changed templates and does not silently overwrite production files or assert render completion.
- The implementation began in the base project. On 2026-11-16 the creator authorized promotion; the live `agents/` and `production_template/` assets were synchronized into `src/templates/` and `dist/templates/`. No dedicated CLI recovery command was added.

## Remaining limits

1. Old production folders without a `Template ID` line require template identification from other evidence or the creator.
2. A template ID cannot reconstruct a previous revision after the vault copy changes.
3. No end-to-end recovery from an actual creator folder has been run yet.
