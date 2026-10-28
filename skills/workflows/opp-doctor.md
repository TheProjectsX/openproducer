---
description: Diagnose runtime AI video glitches (G-01 to G-16) and apply surgical prompt patches
---

# /opp-doctor

Execute the OpenProducer Retake Doctor workflow to triage and repair runtime AI video glitches:

1. **Activate Skill:** Invoke the `openproducer-doctor` skill.
2. **Match Symptom Against Diagnostic Codes (G-01 to G-16):**
   - Reference `skills/openproducer-core/specs/06_retake_doctor_spec.md`.
   - G-15: Word looping / stuttering $\rightarrow$ soft punctuation (`...`).
   - G-16: Dead-air delay $\rightarrow$ Immediate Vocal Attack.
   - G-16: Kinetic text spoiler $\rightarrow$ Decouple to `motion_graphics.md`.
   - G-14: Trust & Safety block $\rightarrow$ 2-Option Gate.
   - G-01: Face drift $\rightarrow$ Strengthen bone structure biometrics.
   - G-09: Equipment visible $\rightarrow$ Purge hardware nouns.
3. **Apply Surgical Patch:**
   - Overwrite affected `clips/clip_XX/video_prompt.txt`.
   - Re-sync `master_videos_prompt.txt`.
   - Log diagnosis and patch in `openproducer/blueprint.md` and `scratchbook.md`.
4. **Output Structured Status Card:**
   - Display the standardized `### 🎬 OpenProducer Status: DOCTOR` card reporting diagnosis and patched prompt file.
