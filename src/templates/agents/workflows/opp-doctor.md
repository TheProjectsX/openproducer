---
description: Diagnose creator-observed AI video glitches (G-01 to G-20) and apply focused prompt patches inside ./production/
---

# /opp-doctor (or /openproducer-doctor)

Execute the OpenProducer Retake Doctor workflow to triage and repair runtime AI video glitches:

1. **Activate Skill:** Invoke the `openproducer-doctor` skill.
2. **Match Symptom Against Diagnostic Codes (G-01 to G-20):**
   - Reference `agents/skills/openproducer-core/specs/06_retake_doctor_spec.md`.
   - If the symptom or target clip needs clarification, or when presenting the G-14 Trust & Safety 2-Option Gate, **use the interactive `ask_question` tool** if available so the creator can select options with a click.
   - G-15: Word looping / stuttering $\rightarrow$ soft punctuation (`...`).
   - G-16: Kinetic text or dead-air transition $\rightarrow$ revise prompt/cut cue as observed.
   - G-17–G-20: Topology, depth, viewpoint, and BGM continuity; for unrelated visuals or wrong character scale, compare the exact timed cue and repair the first image and motion prompt.
   - G-14: Trust & Safety block $\rightarrow$ 2-Option Gate.
   - G-01: Face drift $\rightarrow$ Strengthen bone structure biometrics.
   - G-09: Equipment visible $\rightarrow$ Purge hardware nouns.
3. **Apply Surgical Patch:**
   - Overwrite affected prompt file inside `production/` (`production/clips/clip_XX/video_prompt.txt`, `production/clips/clip_XX/image_prompt.txt`, `production/base_image_prompt.txt`, `production/subjects/`, or `production/visuals/environments/`).
   - Re-sync `production/master_videos_prompt.txt` and `production/master_images_prompt.txt`.
   - Log diagnosis and patch in `./openproducer/blueprint.md` and `production/scratchbook.md`.
4. **Output Structured Status Card:**
   - Display the standardized `### 🎬 OpenProducer Status: DOCTOR` card reporting diagnosis and patched prompt file.
