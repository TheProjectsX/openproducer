# Discussion 74: Markdown Creator Series Templates (.md)

## Context & Motivation
Previously, OpenProducer saved and loaded reusable creator series templates as JSON files (`<name>.json`). While JSON is parseable by code, it posed several creator friction points:
1. **Low Human Readability & High Fragility:** Editing a prompt, quote, or style description in JSON risks syntax breakages (missing commas, unescaped quotes, trailing commas).
2. **Poor Copy-Paste Experience:** Extracting style anchors or negative prompts required cleaning up JSON escaping.
3. **Suboptimal LLM Ingestion:** LLMs digest structured Markdown headers and key-value bullet points more reliably and with lower token overhead.

## Decisions Reached

### 1. Hybrid Format: YAML Frontmatter + Structured Markdown
Templates are now strictly saved and loaded as `.md` files utilizing:
- **YAML Frontmatter:** For deterministic configuration parameters (`template_id`, `name`, `archetype`, `tier`, `aspect_ratio`, `resolution`, `audio_pathway`, `audio_delivery_mode`).
- **Structured Markdown Sections:** For rich creative DNA:
  - `## 🎨 Visual DNA` (`Style ID`, `Master Style Anchor`, `Negative Prompt`)
  - `## 👥 Subject DNA` (`Name`, `Biometrics`, `Wardrobe`, `Expression Profile`)
  - `## 🌆 Environment DNA` (`Setting Name`, `Spatial Description`, `Lighting Rig`, `Acoustics`)
  - `## ⏱️ Pacing & Voice Profile` (`Default Clip Duration`, `Speech Pacing`, `Vocal Attack`, `Voice Preset`)
  - `## 🔤 Motion Graphics & Typography` (`Font Family`, `Primary Color`, `Accent Color`, `Style`)

### 2. File Locations & Migrations
- Templates location: `~/.openproducer/templates/<name>.md`
- Starter Presets converted from `.json` to `.md`:
  - `agents/skills/openproducer-core/templates/starter_presets/stickman-explainer.md`
  - `agents/skills/openproducer-core/templates/starter_presets/cinema-short-film.md`
  - `agents/skills/openproducer-core/templates/starter_presets/social-ugc-reel.md`

### 3. Skill & Workflow Upgrades
Updated `openproducer-template/SKILL.md`, `opp-template.md`, and `production_template/AGENTS.md` to reflect the Markdown specification and loading logic.

