---
name: openproducer-restore
description: Rebuild an OpenProducer project brain from a saved production folder so the creator can continue or revise that same video. Reads the template ID and structure ID in scratchbook.md and loads the matching templates when available.
---

# OpenProducer Restore

Use this skill when the creator has a saved `production/` folder but its `openproducer/` brain is missing or incomplete. Recover the specific project, including its template context, then make the creator's requested changes through the normal production workflow. This is distinct from creating a reusable template or starting a new project.

## Input and template

Accept a project root containing `production/`, or a standalone `production/` folder. Do not require a previous chat or original brain. Read `production/scratchbook.md` first for `Template ID` and `Structure ID` metadata lines, then inspect only the relevant production files. The standard form is:

```markdown
* **Template ID:** `video/<id>`
* **Structure ID:** `structure/<id>`
```

Use `none` when no video template was used, and omit or use `google-flow-default` when no custom structure was active. Older scratchbooks may lack these fields.

Resolve a recorded video template or structure template from the current workstation's template vault or bundled starter presets. The template command's read/list operations may help; `template use` mutates configuration and must not be run over reconstructed project values. Read the template as a baseline for visual DNA, pacing, audio, and other preset instructions; if a `structure` template is recorded, **follow that structure's layout and rules 1:1** when interpreting `production/` (e.g., do not treat missing `clip_xxx/image_prompt.txt` as incomplete if `clip_image_mode: none`), and restore `structure_template_id` in `openproducer/config.json`. `production/` is evidence of the choices made for this video and takes precedence where it differs from the template. Do not store a template copy inside `production/`.

If the ID is missing, ambiguous, or points to an unavailable template, search only available project and template metadata for a reliable match. Ask the creator for the ID or template file if needed. Continue recoverable project context with the template marked unresolved; never claim exact template continuity from style similarity. A template ID does not prove which historical revision was used if the vault copy has changed.

## Reconstruct the brain

1. Inventory `base_image_prompt.txt`, `audio_script.txt` and any actual transcript, `scratchbook.md`, subject/environment prompts, individual `clips/`, and packaging files as present. Use `master_*_prompt.txt` as cross-checks, not as a substitute for individual clip files. Follow `openproducer-core/specs/07_scaffolding_and_workspace_spec.md` for the current file contract.
2. Rebuild `openproducer/config.json`, `openproducer/visual/technical_anchor.txt`, and `openproducer/blueprint.md` from the template and surviving production evidence. Preserve actual story, shot order, audio cues, reference dependencies, and known revision/retake notes. In the blueprint, identify inferred or missing facts; do not invent verbatim creator input for its historical raw-plot section.
3. Rebuild `openproducer/state.json` using the existing schema. Set `template_loaded` only when the ID is verified. Set `propose_complete` only when the reconstructed blueprint has enough project intent and plan to support continuation. Set `produce_complete` and `clips_generated` according to the files actually present; a script-first partial production may be awaiting timestamps. Do not mark images locked, audio locked, clips rendered, or assembly complete without direct evidence or creator confirmation. Rebuild or update `manifest.json` with only checks actually performed; leave creator render review pending.
4. Compare the reconstructed brain against the production files and present a concise recovery summary: template found or missing, project intent, audio/clip stage, uncertain facts, and the next workable action. If a material ambiguity would change the requested edit, ask the creator before applying that edit. Otherwise proceed with the requested change using `/openproducer-sync`, `/openproducer-produce`, or `/openproducer-guide` as appropriate.

## File safety

Treat the supplied production folder as the source record. Do not regenerate or replace its prompts, scratchbook, or media merely to perform recovery. If the target project already has brain files, compare and preserve them; do not silently overwrite a potentially newer brain. Write the reconstructed brain into the target project root, keeping `openproducer/` and `production/` as siblings. Do not generate images, audio, or video unless the creator explicitly requests it.

When reporting recovery, distinguish **recorded**, **inferred**, and **unresolved** facts. Do not equate prompt readiness with rendered or assembled output.
