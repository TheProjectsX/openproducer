# Discussion 75 — OpenProducer TypeScript CLI & NPM Package Publishing Architecture

## 1. Context & Objective
Following the empirical certification of the OpenProducer skill suite, the production template, and the dedicated `production/` workspace architecture, we implemented the official **OpenProducer CLI & Scaffolding Engine** (`npx openproducer init`).

The goal was to build a clean, typed TypeScript codebase in `src/` that compiles to `dist/`, bundles all templates and skills, and can be published directly to the npm registry (`openproducer`) without hassle.

---

## 2. Architectural Highlights

### 1. TypeScript Codebase (`src/`)
- **`src/cli.ts`:** Executable binary entry point (`#!/usr/bin/env node`) powered by Commander. Supports:
  - `openproducer init [directory]` (with flags `--tier`, `--archetype`, `--aspect-ratio`, `--style`, `--audio`, `--delivery`, `--yes`, `--force`)
  - `openproducer status`
  - `openproducer doctor` (alias `openproducer lint`)
  - `openproducer template [list|save|use]`
- **`src/core/scaffold.ts`:** Scaffolds the pristine OpenProducer project layout:
  - `./openproducer/` (Brain: `config.json`, `state.json`, `manifest.json`, `blueprint.md`, `visual/technical_anchor.txt`)
  - `AGENTS.md` & `STRUCTURE.md`
  - `.agents/skills/` (all 7 OpenProducer skills + `openproducer-core`)
  - `.agents/workflows/` (all 7 `/opp-*` workflows)
  - `.gitignore`
- **`src/core/linters.ts`:** Evaluates prompts against pre-flight Linters L-01 to L-19 (word economy, equipment nouns, pure creative prompts, trailing audio blocks, safety checks).
- **`src/core/templates.ts`:** Manages global series franchise presets stored in `~/.openproducer/templates/`.
- **`src/core/config.ts`:** Manages project configuration and state persistence.
- **`src/index.ts`:** Full programmatic library API export.

### 2. Zero-Hassle NPM Publishing Configuration
- **`package.json`:**
  - Standard fields: `name: "openproducer"`, `version: "1.0.0"`, `license: "MIT"`, `bin: { "openproducer": "./dist/cli.js", "opp": "./dist/cli.js" }`.
  - Whitelist `"files": ["dist", "templates", "README.md", "LICENSE"]`.
  - Automated build on publish: `"prepare": "npm run build"`, `"prepublishOnly": "npm run build"`.
- **Bundled Templates (`templates/`):**
  - Includes `templates/production_template/` and `templates/agents/` so that `npx openproducer init` works fully offline and standalone on any user machine.
- **Verified with `npm pack --dry-run`:** Clean 147.1 kB tarball, 101 files, zero extraneous research or dev files included.



### 3. Dynamic GitHub Upstream Sync (`src/core/fetcher.ts`)
- **The Creator Problem:** Updating prompts, skills, and specifications in the repository shouldn't require bumping package versions and republishing to npm every single time.
- **The Solution:** OpenProducer uses a 3-tier hybrid fetch engine:
  1. *Tier 1 (Live Git Sparse Clone):* Clones `production_template` and `agents` directly from `github:TheProjectsX/openproducer#main` in < 2 seconds, supporting both public and authenticated private repositories seamlessly.
  2. *Tier 2 (HTTP Fetch):* Fallback to direct GitHub API tarball fetch.
  3. *Tier 3 (Local Bundled Fallback):* If offline or GitHub is unreachable, falls back seamlessly to local bundled templates in `templates/`.
- **Result:** You simply `git push origin main`. The very next time any user runs `npx openproducer init`, they instantly get your latest skills, workflows, and prompts without needing any npm package update!
