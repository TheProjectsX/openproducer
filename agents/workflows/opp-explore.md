---
description: Enter explore mode (Read-Only) - brainstorm plot, clarify settings in session memory without writing files
---

# /opp-explore (or /openproducer-explore)

Execute the OpenProducer Explore workflow (100% Read-Only Session Planning Mode):

1. **Activate Skill:** Invoke the `openproducer-explore` skill.
2. **Strict Read-Only Rule (Zero Disk Writes):**
   - **DO NOT** write or modify any files in `./openproducer/` or in the project root during `explore`.
   - Keep all plot details, answers, and configurations strictly in **session memory** (like an informal planning session with a producer—if the session is closed before `/opp-propose`, the discussion is gone).
   - **DO NOT** generate any images on your own unless the creator explicitly asks you to generate an image.
3. **Check Pre-Loaded Template Settings (Read-Only):**
   - Read `./openproducer/config.json` to see if `/opp-template` already set any parameters (`visual_style`, `aspect_ratio`, `archetype`, `audio_pathway`, `audio_delivery_mode`). Never re-ask settings that are already populated.
4. **Step-by-Step Conversational Flow (Use Interactive `ask_question` Tool):**
   - **Interactive UI First:** Whenever asking structured intake questions (Steps A and B below), **MUST use the agent's interactive question tool (`ask_question` / `AskUserQuestion`)** if available in the environment so the creator can click options directly instead of typing text (fall back to plain text only if no question tool exists).
   - **Step A0 (Ensure Plot is Given or Established First):**
     - If the creator already provided a plot upfront, proceed directly to Step A.
     - If the creator has no plot yet (brainstorming from 0), brainstorm plot ideas with them **first** until a plot is chosen and established. **Do NOT ask the technical settings questions before a plot is given or established.**
   - **Step A (Foundational Intake Questions via `ask_question` — Only After Plot is Given/Established):** Once the plot is given or established, call `ask_question` to ask only the missing settings:
     1. **Orientation / Aspect Ratio:** `16:9 (Widescreen)`, `9:16 (Vertical Reels/Shorts)`, or `1:1 (Square)`.
     2. **Format / Archetype & Visual Style:** Suggest 2–3 matching styles from `agents/skills/openproducer-core/styles/` (put `(Recommended)` on the best match; the UI automatically adds an `Other` option for custom).
     3. **Audio Settings:** `Separate Audio (External Voiceover / Narration / Song)` vs. `Embedded Audio (Native Veo speech)`.
   - **Step B (The Separate Audio Follow-Up via `ask_question`):** Once Step A is answered, if **Separate Audio** was chosen, call `ask_question` to ask:
     - `(Recommended) Give Audio Script First (generate audio_script.md first, wait for timestamps/transcripts, then create clips)` vs. `Generate Everything Together (create audio_script.md and all clips at once)`.
   - **Step C (Story Structuring & Clarification Loop):** After the questions are answered, summarize what is locked in session memory and ask if the creator has any more clarifications or wants to structure/refine the story together.
5. **Mandatory Read-Only Footer Notice (Every Message):**
   - At the end of **every** message in `explore`, notify the creator that **this is a read-only conversation in session memory until proposed (if the session is lost, this discussion is gone)**, and prompt them to run **`/opp-propose`** (or `/openproducer-propose`) to save and draft the plan into the project brain.
