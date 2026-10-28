---
description: Enter explore mode - brainstorm plot, select archetype, and lock visual style
---

# /opp-explore

Execute the OpenProducer Explore workflow to conduct creative intake and lock foundational parameters:

1. **Activate Skill:** Invoke the `openproducer-explore` skill.
2. **Conduct Creative Intake:**
   - Gather core story/hook, archetype (Social UGC, Cinema, Commercial, Animation, Music Video / Lyric Visualizer), aspect ratio (`9:16` vs `16:9`), and audio pathway.
   - For Music Videos: ingest song audio/SRT, establish musical stanza beat-slicing (verses 6s–8s, drops 4s), and enforce Observer Staging with `Music: None;` audio suppression.
   - Reference `skills/openproducer-core/styles/` to match creator's vibe to a master style paradigm.
3. **Classify Project Tier:**
   - Assign `lean_base_reference` (1 subject/setting) or `modular_studio` (multi-character/scene).
4. **Update Workspace State:**
   - Write settings to `openproducer/config.json`.
   - Append intent to `openproducer/blueprint.md`.
   - Set `"current_stage": "explore_complete"` in `openproducer/state.json`.
5. **Output Structured Status Card:**
   - Display the standardized `### 🎬 OpenProducer Status: EXPLORE` card directing user to `/opp-propose`.
