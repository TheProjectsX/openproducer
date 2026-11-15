# Discussion 95 — Local example workspace builder

**Date:** 2026-11-15

## Creator request and decision

Create a local example workspace from the editable repository sources without invoking NPX. The destination is the existing `.gitignore` entry `example_openproducer_project/`. It receives the contents of `production_template/` at its root and `agents/` as `.agents/` (including current skills, workflows, and bundled core resources). The first version also copied `production_framework/`; the creator removed that requirement below.

## Modes

`node scripts/build-example.js` is the default hard reset. It verifies the fixed destination is a direct child of the repository and is not a link, deletes that example directory, and rebuilds it from current source files. This removes all work previously stored in the example.

`node scripts/build-example.js --soft` copies only source files whose content differs. It preserves the example's `openproducer/` project state, `production/` deliverables, and files present only in the example. New source files are added, changed source-managed files are overwritten, and target-only files are not deleted. If the example does not yet exist, soft mode creates it with the template state.

The script does not read `src/templates/`, run NPX, build the published package, or change `src/`. It uses Node's built-in filesystem APIs.

## Creator correction (2026-11-15)

Do **not** copy root `production_framework/` into the example. The example is a self-contained production workspace: scaffold root files plus `.agents/` with skills, workflows, core specs, styles, and templates. The builder now omits `production_framework/`. A hard rebuild removes the copy created by the first version. Soft mode still preserves target-only files, so an old `production_framework/` remains until the creator runs the default hard reset or removes it directly.

After this correction, a hard rebuild copied 51 files. A soft run copied zero unchanged files. The example root contains only `.agents/`, `openproducer/`, `AGENTS.md`, and `STRUCTURE.md`; bundled core specs and workflows are present inside `.agents/`.

## Verification

Ran hard mode to create 479 files. Modified one copied workflow and added a local-only file; soft mode recopied exactly that workflow and retained the local-only file. Ran hard mode again; it rebuilt 479 files and removed the local-only file. Confirmed the expected scaffold, skill, workflow, framework, and config files exist and `git check-ignore` matches `.gitignore` for the example directory.
