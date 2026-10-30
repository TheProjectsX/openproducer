# Discussion 68 — Session Audit: AGENTS.md Autonomy, Script Delivery Architecture, and Creator Intent Alignment

**Date:** 2026-10-29  
**Status:** ⏸️ Paused for Creator Review & Mental Reset  
**Context:** Live testing of `production_template/AGENTS.md`, `example_openproducer_project`, and mode execution across agent IDE harnesses without slash command pre-loading.

---

## 1. Executive Summary & Core Conflict

During live testing of OpenProducer across different agent IDE environments (where slash commands/skills may not always auto-load), multiple friction points and misalignments between current instructions and creator expectations emerged:

1. **Intake Bypassing:** When skills failed to auto-load, agents reading the legacy 12-line `AGENTS.md` jumped straight to proposing shots or drafting internal concepts without conducting the intake interview.
2. **The "Demanding Timestamps Before Script" Anti-Pattern:** When separate audio was selected, the agent stalled by asking the creator to supply audio timestamps/durations before any script had been written for them to record.
3. **Chat Dumping vs. File Delivery:** The agent initially dumped full scripts and shot breakdown tables into the chat window instead of writing them to structured files on disk.
4. **The `scratchbook.md` Mismatch:** When instructed to save the script to files, the agent placed the spoken script into `scratchbook.md`. The creator expressed clear frustration:
   > *"What the heck is our instructions doing? Now it is giving me the script in the FRICKING SCRATCHBOOK!!!!! It is not working as I expected mate. Don't just go and change anything. Write this session down, I need to clear my head first"*

This document freezes state, captures all actions taken, analyzes the root architectural disconnects, and outlines clear discussion points for when the creator returns.

---

## 2. Chronological Record of Events in This Session

### Event 1: File Structure Realignment
- The creator reorganized the repository, moving `skills/` and `workflows/` into `agents/` (`agents/skills/` and `agents/workflows/`).
- Added `example_openproducer_project` to `.gitignore`.
- Internal links across `agents/workflows/*.md` and `agents/skills/*/SKILL.md` (which were pointing to old `skills/openproducer-core/...`) were updated to `agents/skills/openproducer-core/...`.

### Event 2: Diagnosis of the Early Drafting Glitch
- In the original `production_template/AGENTS.md`, line 11 read:
  *"Phase 1: Synthesize the complete production draft in one pass on disk."*
- Without explicit state machine guardrails, whenever an IDE harness failed to load the `explore` skill, the agent read that single line and immediately drafted shots/proposals instead of asking foundational intake questions.
- **Fix Attempted:** Added the Golden Hard-Stop Rule: forbidding proposal drafting if `current_stage == "intake"`.

### Event 3: The Example Creator Conversation Breakdown
The creator shared their intended interaction model:
```text
C: Hey, I have a plot story. Help me work on it.
A: Sure... Give the plot and we will work on it together.
C: Here is the plot: ...
A: Let me ask you a few questions first.
   - Style? (Suggests options + custom)
   - Video orientation? (16:9, 9:16, 1:1)
   - Flow? (Separate audio vs embedded)
C: Stickman, 16:9, separate
A: Do you wanna get the output together or take the script first and then wait for the generated timestamp OR generate all at once?
C: Give audio script first
A: Ok. Do you want to start the production or draft it for now and work more?
...
--> Creates the script first and waits for the timestamp. OR. Creates all together -- based on the choice.
--> Suggests to guide.
--> Guides if asked to.
```

### Event 4: The Delivery Conflict (Chat vs. Scratchbook)
- First, the system dumped the script and shot tables in the chat text.
- The creator corrected this: all creative deliverables must be written directly to structured files, not dumped into chat; and files that don't depend on audio (like `base_image_prompt.txt` and the written script) should be written immediately.
- The agent redirected the script output into `scratchbook.md` (based on Spec 07's description of `scratchbook.md` as "Script pacing table & retake log").
- **The Breakdown:** Placing the creator's spoken script into `scratchbook.md` was deeply counter-intuitive and violated creator expectations.

---

## 3. Deep Root Cause Analysis

### Disconnect 1: Overloading `scratchbook.md`
In early specifications (`05_directors_cut_assembly_spec.md` and `07_scaffolding_and_workspace_spec.md`), `scratchbook.md` was defined as an internal timeline calculation ledger holding quantum pacing tables (4s/6s/8s @ 2.2 wps) and retake triage logs.
* **The Problem:** A creator looking for their spoken screenplay / voiceover script does not expect it to be stuffed into an engineering ledger called a "scratchbook".
* **The Natural Expectation:** A script is a premier creative deliverable. If the user asks for the script first, they expect a dedicated, clean, human-readable file (e.g. `script.md`, `screenplay.md`, or `audio/script.txt`) that they can immediately read, hand to a voice actor, or paste into ElevenLabs.

### Disconnect 2: The Two Tracks of Video Production (Native Veo vs. Separate Audio)
The framework originally assumed Google Flow Veo 3.1 was generating both video and voice together (Native Veo). In that world, the script is embedded directly inside the `clips/clip_XX/video_prompt.txt` files.
* When using **Separate Audio** (ElevenLabs, voice actor, song track), the production bifurcates:
  1. **Track A (Audio Genesis):** Needs the written script first $\rightarrow$ recorded to an audio file $\rightarrow$ yields exact clip durations.
  2. **Track B (Visual Genesis):** Needs `base_image_prompt.txt` (to lock subject face & environment) $\rightarrow$ yields `references/base_image.jpg`.
  3. **Track C (Assembly):** Merges Track A timestamps + Track B visuals into final `clips/clip_XX/video_prompt.txt`.

### Disconnect 3: Agent Verbosity & Over-Instruction
Agents get confused when directives try to dictate too many hypothetical branching dialogues in a single prompt. If an agent is told "do not dump in chat", but also told "present the proposal in chat", and also told "write to scratchbook", it gets conflicted and produces disjointed, frustrating behavior.

---

## 4. Proposed Clean Solution for Next Session (To Review With Clear Head)

When you return, here is a clean, simple proposal to discuss:

### Proposal A: Introduce a Dedicated `script.md` at Project Root
Instead of burying the dialogue inside `scratchbook.md`:
```text
<project_root>/
├── script.md                  # THE CLEAN SPOKEN SCRIPT (Scene by scene, dialogue lines, voice direction)
├── base_image_prompt.txt      # Master Base Reference image prompt (Subject + Setting)
├── references/                # creator_photo.jpg, base_image.jpg
├── clips/                     # clip_01/, clip_02/ (created once audio timing is known)
├── master_videos_prompt.txt   # Google Flow 1-click clipboard
├── scratchbook.md             # Pacing math, word count checks, and Retake Doctor triage
└── motion_graphics.md         # Captions & subtitle cues
```
* If creator says *"Give audio script first"*:
  1. Write `script.md` (clean, beautifully formatted screenplay/voiceover script).
  2. Write `base_image_prompt.txt`.
  3. Chat output is just: *"I've written your script to `script.md` and created `base_image_prompt.txt`. Take `script.md` to record your voiceover, and drop your clip durations when ready!"*

### Proposal B: Clarify the Role of `scratchbook.md`
`scratchbook.md` is strictly an internal director's scratchpad for pacing math (words per second) and retake diagnosis codes (G-01 to G-16). It should never be where the primary screenplay lives.

### Proposal C: Pure Lean Chat Interface
The chat interface should never display walls of text. It asks 2–3 questions, confirms actions in 1–2 sentences, and provides the Status Card with clickable markdown file links.

---

## 5. Frozen State & Next Steps

* **No instruction files or skills have been modified.** Everything is frozen as requested.
* Take your time to rest and clear your head.
* When you are ready to resume, we will review this document, decide on the clean file contract (e.g. `script.md`), and align the directives once and for all.

