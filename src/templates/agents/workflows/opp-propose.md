---
description: Save story plot, raw plot archive, settings, and production plan into the project brain (./openproducer) without creating creator files
---

# /opp-propose (or /openproducer-propose)

Execute the OpenProducer Propose workflow to archive the entire discussion, plot, and production plan into the project brain (`./openproducer/`):

1. **Activate Skill:** Invoke the `openproducer-propose` skill.
2. **Consult Core Specifications:**
   - Reference `agents/skills/openproducer-core/specs/05_directors_cut_assembly_spec.md` for temporal quantum pacing (4s/6s/8s @ 2.2 wps).
   - Reference `agents/skills/openproducer-core/specs/08_story_spec.md` for Pre-Production story schemas (`pure_narration`, `dialogue_heavy`, `hybrid`, `silent_visual`).
   - Reference `agents/skills/openproducer-core/styles/` for the selected Master Style Anchor string.
3. **Write Exclusively to the Project Brain (`./openproducer/`) — Zero Creator Files:**
   - **DO NOT** create any video deliverable files (`base_image_prompt.txt`, `audio_script.txt`, `scratchbook.md`, `clips/`, `subjects/`, `visuals/environments/`) during `propose`.
   - Write/update `./openproducer/config.json`: save `project_name`, `archetype`, `tier` (`lean_base_reference` or `modular_studio`), `visual_style`, `aspect_ratio`, `audio_pathway`, and `audio_delivery_mode` (`embedded`, `separate_script_first`, or `separate_all_at_once`).
   - Write/update `./openproducer/visual/technical_anchor.txt`: save the locked Master Style Anchor string.
   - Write/update `./openproducer/blueprint.md`:
     1. **Section 1:** Project Intent & Configuration.
     2. **Section 2 (Raw Plot / Brainstormed Plot Points Archive):** If `production/story/raw_source.txt` exists (from `/opp-rewrite`), note it here. Save the verbatim raw plot the creator originally gave (if they gave one), OR if they brainstormed from 0, record the plot points they proposed. Mark this section as a historical archive for future reference (not used normally).
     3. **Section 3:** Complete structured story, subjects/characters plan, and environments plan. If `production/story/beats.md` exists, incorporate its narrative arc.
     4. **Section 4:** Complete drafted script and scene-by-scene 4s/6s/8s shot plan so a brand-new session starting with 0 context can pick up seamlessly without losing a single detail. If `production/story/script.txt` exists on disk (from `/opp-write` or `/opp-rewrite`), automatically ingest it into Section 4, respecting its declared `[STORY FORMAT]` and aligning `audio_pathway` accordingly.
   - Write/update `./openproducer/state.json`: set `"current_stage": "proposed"` and `"stages.propose_complete": true`.
4. **Output Structured Status Card:**
   - Display the standardized `### 🎬 OpenProducer Status: PROPOSE` card informing the creator that the brain is saved and they can continue discussing (and `/opp-sync`) or run `/opp-produce`.
