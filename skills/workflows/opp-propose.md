---
description: Propose video production draft - scene breakdown, 4s/6s/8s pacing in blueprint
---

# /opp-propose

Execute the OpenProducer Propose workflow to formulate an internal production proposal:

1. **Activate Skill:** Invoke the `openproducer-propose` skill.
2. **Consult Core Specifications:**
   - Reference `skills/openproducer-core/specs/05_directors_cut_assembly_spec.md` for temporal quantum pacing (4s/6s/8s @ 2.2 wps).
   - Reference `skills/openproducer-core/styles/` for visual DNA.
3. **Synthesize Proposal in Brain:**
   - Draft the Tier 1 Base Prompt concept.
   - Slice script into atomic shots with soft punctuation (`...`) and immediate vocal attack.
   - Formulate single-verb camera kinematics and acoustic transitions.
4. **Present Breakdown to Creator:**
   - Output structured shot breakdown table in chat for creator approval.
5. **Update State:**
   - Append proposal to `openproducer/blueprint.md`.
   - Set `"current_stage": "proposal_ready"` in `openproducer/state.json`.
6. **Output Structured Status Card:**
   - Display the standardized `### 🎬 OpenProducer Status: PROPOSE` card directing user to `/opp-produce`.
