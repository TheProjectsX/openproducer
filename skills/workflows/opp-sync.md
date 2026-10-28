---
description: Run 19 linters (L-01 to L-19) and synchronize master video prompt
---

# /opp-sync

Execute the OpenProducer Sync workflow to audit prompts and compile the master manifest:

1. **Activate Skill:** Invoke the `openproducer-sync` skill.
2. **Audit All Clips Against Linters L-01 to L-19:**
   - Word count (75–150 words).
   - Equipment noun bans (`tripod`, `dolly`).
   - Token decay curve (tokens 1–30 framing).
   - Soft punctuation acoustic bridges (`...`).
   - Trust & Safety scanner (`skills/openproducer-core/specs/safety_registry.md`).
3. **Recompile `master_videos_prompt.txt`:**
   - Synchronize all individual clip prompt files into the master clipboard manifest.
4. **Update State:**
   - Write audit results to `openproducer/manifest.json`.
5. **Output Structured Status Card:**
   - Display the standardized `### 🎬 OpenProducer Status: SYNC` card confirming linter certification.
