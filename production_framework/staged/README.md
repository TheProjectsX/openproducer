# 📦 Staged Archive: OpenProducer Experimental & Modular Engines

This staged directory contains pre-production narrative generation, delivery packaging, and channel template modules:

### 1. Pre-Production Story Engine (Archived for v2)
- **`skills/openproducer-write/`**: Pre-production screenwriter suite generating original screenplays and beats into `production/story/`.
- **`skills/openproducer-rewrite/`**: Script doctor and content adaptation engine converting articles, drafts, and notes into screenplay format.
- **`workflows/opp-write.md`**: Slash command workflow for `/opp-write`.
- **`workflows/opp-rewrite.md`**: Slash command workflow for `/opp-rewrite`.
- **`specs/08_story_spec.md`**: Specification 08 for the Story Engine, narrative schemas, and TTS expression tag rules.

### 2. Post-Production Delivery Packaging Suite (`opp-package` for v1.2.x)
- **`skills/openproducer-package/`**: Distribution and packaging skill generating titles, descriptions, and thumbnail prompts with embedded AI typography into `production/packaging/`.
- **`workflows/opp-package.md`**: Slash command workflow for `/opp-package`.
- **`specs/09_packaging_spec.md`**: Specification 09 for the Delivery Packaging Engine, pure `.txt` formats, multi-platform laws, and quality linters.
- **`templates/package/`**: Starter channel packaging templates (`youtube_dark_scifi.md`, `viral_shorts.md`).

> [!NOTE]
> Per the **Strict Package Freezing Directive**, all experimental features and newly scoped modules are staged here in the base project and completely decoupled from `src/` until finalized.

