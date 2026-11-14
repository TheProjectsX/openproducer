---
template_id: youtube_dark_scifi
name: Dark Sci-Fi & Cosmic Horror Channel Packaging
group: package
archetype: narrative_short
default_hashtags: ["#SciFiShort", "#AIAnimation", "#Veo3", "#CosmicHorror"]
default_tags: ["sci-fi horror", "space mystery", "cinematic ai", "deep space thriller", "short film", "veo 3"]
title_config:
  max_length: 65
  bracket_tag: "[4K Short Film]"
  case_style: title_case
  preferred_archetypes: ["curiosity", "high_stakes"]
thumbnail_config:
  aspect_ratios: ["16:9", "9:16"]
  subject_placement: left_third
  negative_space_percent: 40
  color_accent: "electric cyan rim lighting, dark charcoal void, subtle blue atmospheric volumetric haze"
  logo_position: "top_left (120px margin, keep bottom-right 100% clean for duration pill)"
  overlay_font: "Montserrat ExtraBold, uppercase, solid crisp white with heavy dark drop shadow"
description_config:
  include_timestamps: true
  include_lore: true
  credit_roll: true
---

# Dark Sci-Fi Channel Packaging Rules

## 1. Title Rules
- Titles must spark intrigue or primal dread without relying on cheap clickbait.
- Format: `{Curiosity or High-Stakes Hook} | {Series Title}`
- Keep total character length under 65 characters to ensure zero mobile truncation.
- Never repeat the exact words rendered in the thumbnail image.

## 2. Thumbnail Rules
- Subject must be framed strictly on the left third, capturing intense psychological dread or awe.
- Preserve 40% clean, dark negative space on the right third for typography.
- In-prompt text must be 2 to 4 words maximum, rendered in crisp high-contrast white.
- Channel logo strictly in the top-left corner. Bottom-right corner must remain completely clean to prevent collision with YouTube's duration timestamp badge.

## 3. Description Layout
1. **The Hook:** 2 punchy lines summarizing the central dilemma before the "Show More" fold.
2. **Timestamps:** Automatically generated from the timeline clips starting at `0:00`.
3. **Transmission / Lore:** 1 paragraph of in-universe transmission, log entry, or worldbuilding context.
4. **Production Credits:** Veo 3.1, Imagen 4, Suno, OpenProducer pipeline.
5. **Channel Links & Socials:**
   - Discord: https://discord.gg/example
   - Subscribe: https://youtube.com/@example

