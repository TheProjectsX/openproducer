# Discussion 78: Persistent Workstation Caching & Three-Tier Auto-Fallback

## Context & Motivation
Previously, the CLI resolved templates either directly from the live upstream registry (when connected) or immediately fell back to the package-bundled templates (`local-bundled`). If a creator had previously synchronized skills and templates, but subsequently went offline or experienced network interruptions, they would revert to the static package bundles rather than retaining their most recently fetched updates.

The creator established:
1. **Persistent Workstation Cache on Online Fetch:** Every online fetch must save the latest synchronized templates and skills into a persistent workstation-level cache directory (`~/.openproducer/cache/upstream/`).
2. **Three-Tier Auto-Fallback Hierarchy:**
   - **Tier 1 (Live Registry):** Always attempts to fetch the newest live updates online.
   - **Tier 2 (Last Fetched Cache):** If the network is unreachable, offline mode is requested, or the registry fails, automatically fall back to the persistent workstation cache.
   - **Tier 3 (Bundled Local Package):** If no persistent cache exists on the machine (e.g. initial offline setup), fall back to bundled package templates.

---

## Technical Architecture

### 1. Workstation Cache Layout
- Cache root: `~/.openproducer/cache/`
- Upstream assets: `~/.openproducer/cache/upstream/`
  - `production_template/`
  - `agents/`
- Cache metadata: `~/.openproducer/cache/metadata.json`
  - Records `{ "cached_at": "<ISO-timestamp>" }` for auditing and timestamp display.

### 2. Resolution Pipeline (`src/core/fetcher.ts`)
```text
resolveTemplateSources()
  ├── [Online Attempt] -> tryGitSparseClone() / tryHttpTarballFetch()
  │     └── If OK -> saveToPersistentCache() -> return 'remote-git'
  │
  ├── [1st Fallback] -> resolvePersistentCache() (~/.openproducer/cache/upstream/)
  │     └── If OK -> return 'cached-upstream' (with cachedAt timestamp)
  │
  ├── [2nd Fallback] -> resolveLocalBundledTemplatesDir()
  │     └── If OK -> return 'local-bundled'
  │
  └── [Error] -> Throw if all tiers fail
```

### 3. Summary Reporting
- `openproducer init` and `openproducer update` dynamically identify the active source in their summary cards:
  - `Live Upstream Registry (Synchronized)`
  - `Persistent Workstation Cache (MM/DD/YYYY)`
  - `Bundled Local Package`

