---
description: Generate high-converting delivery packaging (titles, descriptions, thumbnails) into production/packaging/
---

# /opp-package (or /openproducer-package)

Execute the OpenProducer Packaging workflow (Distribution & Delivery Suite):

1. **Activate Skill:** Invoke the `openproducer-package` skill.
2. **Scan for Active Package Template:**
   - Check `./openproducer/config.json` for `package_template_id` or look in `~/.openproducer/templates/package/` and `./openproducer/templates/package/`.
   - If active, apply channel branding, title syntax, thumbnail color accents, and description boilerplate.
   - If none, apply universal high-CTR cinema defaults.
3. **Parse Conversational Intent:**
   - Full packaging kit (bare `/opp-package`): Generates all 3 assets.
   - Targeted asset request (e.g. `/opp-package Create titles...` or `/opp-package Generate thumbnail...`): Generates only the requested asset while keeping existing files intact.
4. **Generate Delivery Assets in `production/packaging/`:**
   - `production/packaging/titles.txt`: Multi-variant title options with character counts, mobile safe checks (<65 chars), and hashtags.
   - `production/packaging/descriptions.txt`: Structured description styles with above-the-fold hook, auto-calculated timeline chapters (`0:00`), lore transmission, credits, and links.
   - `production/packaging/thumbnails/thumb_XX_prompt.txt`: Raw image prompts following the 3-part anatomy (`[METADATA HEADER]` -> `[IMAGE PROMPT]` -> `[NEGATIVE PROMPT]`) with embedded AI typography and safe-zone protection.
5. **Run Pre-Flight Linters LINT-PKG-01 through 05:**
   - Confirm mobile title bounds, safe-zone clearance (no bottom-right corner clutter), non-redundancy between thumbnail and title, and timestamp duration accuracy.
6. **Output Delivery Summary:**
   - Confirm files created and surface the primary recommended title and thumbnail prompt for immediate use.

