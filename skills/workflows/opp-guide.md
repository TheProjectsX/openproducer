---
description: Walk through the 4 interactive production gates step-by-step
---

# /opp-guide

Execute the OpenProducer Guide workflow to lead the creator through the 4 sequential quality gates:

1. **Activate Skill:** Invoke the `openproducer-guide` skill.
2. **Execute Gate 1 (Base Image Lock):**
   - Present `base_image_prompt.txt` with Google Flow / Imagen instructions.
   - Loop on creator revisions (hair, lighting, wardrobe, room) until approved.
   - Save to `references/base_image.jpg`.
3. **Execute Gate 2 (Audio & Script Review):**
   - Verify speech pacing, L-19 safety, and dialogue lines in `scratchbook.md`.
4. **Execute Gate 3 (Clip-by-Clip Render):**
   - Sequentially deliver each clip prompt with exact Flow settings and `[IMAGE 1]` bindings.
5. **Execute Gate 4 (Retake Check):**
   - Verify rendered clips; trigger `/opp-doctor` if glitches occur, or finalize assembly.
6. **Output Structured Status Card:**
   - Display the standardized `### 🎬 OpenProducer Status: GUIDE` card reporting active gate progress and next action.
