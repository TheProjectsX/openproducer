---
description: Produce deliverables - synthesize all clip prompts, master manifests on disk
---

# /opp-produce

Execute the OpenProducer Produce workflow to physically generate all production deliverables on disk:

1. **Activate Skill:** Invoke the `openproducer-produce` skill.
2. **Execute File Factory on Disk:**
   - Synthesize `base_image_prompt.txt` (Tier 1 Base Reference).
   - Ensure `references/` directory exists.
   - Synthesize `clips/clip_01/` to `clip_XX/` (`video_prompt.txt` and `image_prompt.txt`).
   - Synthesize `scratchbook.md` (timeline budget table & pacing verifier).
   - Synthesize `master_videos_prompt.txt` (1-click clipboard for Google Flow).
   - Synthesize `motion_graphics.md` (if on-screen text overlays are present).
3. **Audit Against Linters (L-01 to L-19):**
   - Ensure 75–150 words per prompt, zero equipment nouns, soft punctuation, and safety checks.
4. **Update Workspace State:**
   - Update `openproducer/manifest.json` and set `"synthesis_complete": true` in `openproducer/state.json`.
5. **Output Structured Status Card:**
   - Display the standardized `### 🎬 OpenProducer Status: PRODUCE` card directing user to `/opp-guide` or self-serve rendering.
