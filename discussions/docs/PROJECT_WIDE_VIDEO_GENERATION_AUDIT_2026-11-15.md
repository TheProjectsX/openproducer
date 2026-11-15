# OpenProducer project-wide video generation audit

**Date:** 15 November 2026. **Revised after creator review:** 15 November 2026.  
**Scope:** Repository specifications, active and staged skills/workflows, template/schema contracts, scaffolded project instructions, CLI implementation, style registry, and representative simulation assets. This is a source and workflow audit; no Google Flow video was rendered. The approved follow-up implementation is recorded below.

## Executive finding

The central production risk is the **script/audio-to-visual translation**: clip prompts can be technically well formed yet depict the wrong event, wrong scale, or an unrelated insert at the wrong moment. The CLI also reports unchecked rules as passes. A green `opp doctor` result is therefore **not evidence that visual prompts match the audio stream**.

## Creator decisions that govern this revision

1. **Keep 4/6/8/10 as OpenProducer's generation choices.** This is a deliberate creative/editing convention, including when using Omni 1.2. The separate question is whether the selected Flow model and input mode supports a chosen duration. No recommendation here changes the four choices.
2. **Keep prompt-file paths in `Conditioned On:` and `Input Seed:`.** They are creator-facing instructions identifying which image to select in the same Flow project; they are not literal upload paths. Exporting image files is optional and belongs to a later workflow.
3. **OpenProducer creates prompts and guidance.** The creator generates images, audio, and video and edits the final timeline manually. Proposed checks below must be prompt-side checks or human review instructions, not a promise of automatic media processing.
4. **`production/story/` is archived and inactive.** Remove its active references/usages when implementing changes. Do not make the staged write/rewrite experiment a dependency of the live pipeline.
5. **Clip lengths can vary.** A clip's selected generation duration is one of 4/6/8/10; its *edited time on the audio timeline* may be shorter or otherwise uneven after the creator trims it. Audio/event alignment takes priority over a repetitive clip pattern.

## Severity and findings

`P0` means a false certification or an invalid generation path is likely. `P1` means a common workflow can fail or drift. `P2` means quality or maintenance risk.

### Decision D-01 — Preserve the 4/6/8/10 clip choices; check Flow compatibility separately

**Evidence:** [director's cut spec](../../production_framework/specs/05_directors_cut_assembly_spec.md) §2.1 and L-09, [produce skill](../../agents/skills/openproducer-produce/SKILL.md), [default config](../../production_template/openproducer/config.json), and [types](../../src/core/types.ts) assume Veo 3.1 accepts 4/6/8/10 seconds, 1080p, and often a first frame plus persistent image ingredients. Google's current [Flow feature matrix](https://support.google.com/flow/answer/16352836) says Veo 3.1 Lite/Fast/Quality text and frames are 4/6/8 seconds; Lite/Fast ingredients are **8 seconds only**; Quality has no ingredients. The same page says Omni Flash 1.2 has 3–10 seconds without a subscription or 3–15 seconds with one. Its resolution and feature availability depend on model and plan. Google also says Veo Fast/Quality and Omni 1.1 are scheduled for retirement on 5 December 2026. The [Flow creation guide](https://support.google.com/flow/answer/16353334) shows Frames and Ingredients as distinct UI modes; the spec's combined input recipe cannot be presumed available for every model.

**Revised assessment:** The four duration choices are **accepted project policy**, not a defect. The remaining compatibility risk is labeling a 10-second shot as Veo 3.1 or assigning an unsupported input mode to a chosen model. A model change can alter visual conditioning or generation length. This is a guidance/metadata issue, not a reason to change the 4/6/8/10 planning convention.

**Clean fix steps:** (1) Preserve the four project duration options. (2) Add a concise model/mode compatibility note to each prompt's configuration block: selected model, Frames versus Ingredients, and duration. (3) If the chosen combination is unsupported, switch to a compatible Flow model/mode or adjust the shot plan within the four options. (4) Have the creator verify the active Flow model and duration before generation. This is a later specification update, not a blocker on this audit.

### P0-02 — `opp doctor` certifies rules it never checks

**Evidence:** [linter registry](../../src/core/constants.ts) advertises L01–L19, but [linter implementation](../../src/core/linters.ts) implements only L01, L02, L03, L06, and L19. Every other rule falls through to `PASS`. When no prompt files exist, all rules are `PENDING` but `certified` is true because only failures are counted. [doctor command](../../src/commands/doctor.ts) then writes `CERTIFIED` if there are no failures or warnings. The [director's cut spec](../../production_framework/specs/05_directors_cut_assembly_spec.md) defines a *different* L-01–L-19 registry from the CLI registry, and the [manifest template](../../production_template/openproducer/manifest.json) records yet another set of names.

**Effect:** Projects with bad timing, no ingredient images, wrong speaker budget, or missing continuity checks can receive a certified manifest.

**Clean fix steps:** (1) Pick one authoritative L-01–L-19 ID/name table. (2) Change the CLI default case from `PASS` to `PENDING` immediately. (3) Make any required `PENDING` or `FAIL` block `CERTIFIED`; distinguish prompt certification from manual render review. (4) Implement each automatable rule against its intended file section. (5) Mark judgment-heavy rules such as scene relevance as `MANUAL_REVIEW`, with a review prompt instead of a fake pass. (6) Add a few targeted fixtures for empty projects, invalid timing, a valid negative prompt, and malformed prompt sections. **This needs a later explicit package-source update because `src/` is frozen.**

### P0-03 — The implemented checks misread the prompt file structure

**Evidence:** [L01](../../src/core/linters.ts) counts *the whole file*, including configuration, dependency lines, and negative prompt, rather than the `[VIDEO PROMPT]` body. L02 searches negative prompts for banned camera words although the [spec](../../production_framework/specs/05_directors_cut_assembly_spec.md) explicitly exempts negatives. L03 searches the whole file for technical tokens and warns when a `[VIDEO PROMPT]` or `[IMAGE PROMPT]` header exists; the mandated `[CONFIGURATION SETTINGS]` block itself contains `16:9` and `1080p`. L19 scans negative prompts and metadata, while its three hardcoded phrases are far narrower than the [safety registry](../../production_framework/specs/safety_registry.md).

**Effect:** Valid files can get warnings or failures while truly bad creative prompt bodies pass. Unsafe or blocked wording may be missed.

**Clean fix steps:** (1) Parse `[CONFIGURATION SETTINGS]`, `[INPUT SEEDS & INGREDIENTS]`, `[IMAGE/VIDEO PROMPT]`, and `[NEGATIVE PROMPT]` separately. (2) Count words and inspect camera/equipment/technical terms in creative prompt bodies only. (3) Exempt expected technical values in configuration and permitted bans in negatives. (4) Return file, section, line, and matched phrase. (5) Evaluate safety phrases in context; never treat a short keyword list as complete coverage. **This needs a later explicit package-source update because `src/` is frozen.**

### Decision D-04 — Keep prompt-file references as Flow project image cues

**Evidence:** [scaffolding spec](../../production_framework/specs/07_scaffolding_and_workspace_spec.md) §4.1 binds `[IMAGE 1]` to `base_image_prompt.txt`, `profile_prompt.txt`, and environment `prompt.txt`; it binds a video first frame to `image_prompt.txt` or `video_prompt.txt`. The [guide skill](../../agents/skills/openproducer-guide/SKILL.md) does tell a human to render and save images, but the required paths in the production contract remain prompt files. [Google's Flow guide](https://support.google.com/flow/answer/16353334) requires actual uploaded images or frames for ingredients and start/end frames.

**Revised assessment:** The prompt paths intentionally point the creator to the prompt that produced an image already available in the Flow project. Requiring exported files or asset IDs would add work and contradict the intended workflow. The only usability risk is an agent treating the `.txt` path as a literal image file.

**Clean fix steps:** (1) Keep existing `Conditioned On:` and `Input Seed:` paths. (2) Add one sentence to the guide: “Select the image generated from this prompt in the current Flow project; the `.txt` file itself is not an upload.” (3) For a first/last frame, say which prior rendered clip or image in Flow to select. (4) Ask the creator to confirm the chosen image visually before each dependent generation. No mandatory export or new asset inventory is needed.

### P0-05 — Clip totals conceal mismatched individual audio intervals

**Evidence:** [produce skill](../../agents/skills/openproducer-produce/SKILL.md) asks native clip durations to tile audio from zero to end with zero gaps, but permits total duration error of ±1 second and each clip/interval difference of ±1 second. The [director's cut spec](../../production_framework/specs/05_directors_cut_assembly_spec.md) §4.4 allows editorial micro-trims, while L-14 requires a one-second silence buffer per cue. `production/timeline.md` is read by the [package skill](../../agents/skills/openproducer-package/SKILL.md) but is not a required produce output. No canonical record holds generated length, in/out trim, final cut position, source SRT interval, audio offset, frame rate, or overlap.

**Additional direct evidence:** In [The Lighthouse v2 scratchbook](../../production_framework/simulations/the_lighthouse_v2/production/scratchbook.md), 37 clip durations sum to 330 seconds, but **15 of 37** rows have an audio timestamp span that differs from the row's clip duration. Examples: `clip_002` is marked 6s for `00:06–00:11` (5s); `clip_004` is marked 10s for `00:21–00:32` (11s); `clip_028` is marked 10s for `03:56–04:07` (11s). The ±1-second total tolerance hides these local mismatches.

**Effect:** The creator cannot tell where to trim, extend coverage, or place a cut. A one-second local error can expose the next event too early or leave an unrelated image under the current line. Speech crossing a visual cut is also at odds with a universal per-clip silence buffer.

**Clean fix steps:** (1) In `scratchbook.md`, distinguish **Flow generation duration** from **planned edited on-screen duration** and audio start/end. (2) Let on-screen durations vary to meet meaningful audio event boundaries; choose a 4/6/8/10 generated clip long enough to cover each edited interval. (3) Name the exact trim or hold needed for each shot, especially when the two durations differ. (4) Verify each interval starts where the preceding one ends and every spoken/event cue has relevant visual coverage; do not accept only a close grand total. (5) Use the creator's final manual edit times for packaging chapters. The one-second speech buffer applies only to native clip dialogue where it is useful, not continuous external narration.

### P1-06 — Separate audio mode has no reliable master-audio contract

**Evidence:** The [scaffolding spec](../../production_framework/specs/07_scaffolding_and_workspace_spec.md) §4.2 mentions `production/audio.srt`; [produce](../../agents/skills/openproducer-produce/SKILL.md) asks the user for timestamps; [guide](../../agents/skills/openproducer-guide/SKILL.md) sometimes works from shared transcript/timestamps. None requires the actual master audio file, measured sample duration, sample rate, SRT validation, or alignment of transcript words to the rendered audio. The two-speaker strategy assumes one exported file but has no speaker/channel verification.

**Effect:** SRT drift, missing nonverbal pauses, transcriber errors, or re-generated audio can invalidate all clip boundaries while the prompt files appear consistent.

**Clarification and clean fix steps:** The skill does not need the audio file itself. It needs **the creator's actual playback duration and time-coded transcript** from the specific approved audio render. (1) Before clip prompting, request the audio duration and SRT/VTT or a table with key phrase start/end times; if only a rough transcript is supplied, label clip times provisional. (2) Check cue order, first/last time, obvious gaps, and speaker labels against the approved script. (3) Ask the creator to spot-check a few cue times against playback, especially after pauses or speaker switches. (4) If audio is re-recorded, mark all prior clip times stale and remap; no hash, sample-rate extraction, or automated audio processing is required. (5) Record the approved audio version/date in `scratchbook.md` so another session knows which timeline is current.

### P1-07 — TTS instructions mix UI-specific experiments with a current API contract

**Evidence:** [story spec](../../production_framework/specs/08_story_spec.md) §4 and [produce skill](../../agents/skills/openproducer-produce/SKILL.md) call a fixed list of “40 official” tags and require all angle-bracket vocal tags on isolated lines. Current [Gemini TTS documentation](https://ai.google.dev/gemini-api/docs/speech-generation) describes exact transcript text, `speech_metadata` for speaker/style, and **inline** angle-bracket tags for point-in-time vocal events. It provides examples, not a universal guaranteed 40-tag list. Older [legacy documentation](https://ai.google.dev/gemini-api/docs/generate-content/speech-generation) uses square-bracket tags. The project also puts cast tables and production instructions in `audio_script.txt`, which is risky if pasted wholesale into a verbatim text field.

**Effect:** Tag names or placement may be spoken literally, metadata may enter the voice track, and a change of TTS model may silently alter performance.

**Clarification:** The project's isolated-line angle tags may be a useful **tested AI Studio practice** for its chosen UI/model. The problem is declaring that practice universally “official” and allowing instructions/cast metadata into paste-ready spoken text. Current Google documentation also has model-specific syntax, so the audit does not prescribe one universal inline/isolated rule.

**Clean fix steps:** (1) Identify the exact AI Studio TTS model and input surface used by this workflow. (2) Keep a human-readable setup section separate from a clearly delimited **paste-only spoken transcript**. (3) Document only tags personally verified in that model/UI; call the rest experimental. (4) Test one short sample with the intended speaker turns and pause tags, then use whichever placement that model renders correctly. (5) Use the resulting audio timestamps as truth for clip planning. This is a prompt-documentation fix, not a requirement to adopt an API payload.

### P1-08 — Archived `production/story/` references leak into active guidance

**Evidence:** The staged [story spec](../../production_framework/specs/08_story_spec.md) says `production/story/script.txt` is source of truth for propose/produce. The active [propose skill](../../agents/skills/openproducer-propose/SKILL.md) writes a separate drafted script into `openproducer/blueprint.md`, and [produce](../../agents/skills/openproducer-produce/SKILL.md) reads the blueprint to create `production/audio_script.txt`. The [sync skill](../../agents/skills/openproducer-sync/SKILL.md) does not mention `production/story/script.txt` or `clean.txt`. Staged write/rewrite explicitly avoid touching existing video files. Thus a rewrite can leave a previous blueprint/audio/clips active.

**Revised assessment:** The write/rewrite feature is archived and not live. The report's previous proposal to connect `production/story/` to production was wrong. Its remaining mentions in active architecture/specs, CLI story-template paths, and historical status text can make an agent treat archived files as live inputs, creating competing scripts.

**Clean fix steps:** (1) Declare the live script source as the approved Section 4 of `openproducer/blueprint.md`, then `production/audio_script.txt` in separate-audio mode. (2) Remove `production/story/` detection, creation, and ingestion from active specs, active skills/workflows, scaffolded instructions, and CLI paths when the package is next unfrozen. (3) Keep archival files under `production_framework/staged/` for historical reference, clearly marked inactive; they must not be included in live skill routing. (4) Ensure `opp-explore`, `opp-propose`, `opp-produce`, and `opp-sync` all use the live source only. (5) On an approved script edit, update blueprint and audio script and mark affected clip cues stale. This is removal of an experimental dependency, not promotion of the story feature.

### P1-09 — Prompt readiness and creator render approval are conflated

**Evidence:** [state template](../../production_template/openproducer/state.json) contains `clips_rendered` and `assembly_complete`, but the [produce](../../agents/skills/openproducer-produce/SKILL.md), [doctor](../../agents/skills/openproducer-doctor/SKILL.md), and [package](../../agents/skills/openproducer-package/SKILL.md) workflows are prompt and file oriented. [Retake Doctor spec](../../production_framework/specs/06_retake_doctor_spec.md) catalogues glitches but does not define objective verification of exported duration, black frames, frame continuity, speech intelligibility, audio peaks, or A/V sync after assembly.

**Clarification:** OpenProducer cannot inspect media unless the creator supplies it and asks for inspection. The missing gate is **a clear human handoff and status distinction**, not an automatic video/audio processor.

**Clean fix steps:** (1) Rename prompt-side success as `PROMPTS_READY`, never “rendered” or “assembly complete.” (2) In `/opp-guide`, ask the creator after each Flow render whether the character scale, subject identity, room layout, action, and timing are correct; capture a short pass/retake note. (3) Before final packaging chapters, ask for the creator's actual final edit duration/cut times. (4) Mark `clips_rendered` and `assembly_complete` only from creator confirmation, not from generated prompt files. Optional media inspection can be offered if files are supplied, but is not part of core skill operation.

### P1-10 — Prompted audio continuity is overstated

**Evidence:** [director's cut spec](../../production_framework/specs/05_directors_cut_assembly_spec.md) §§6.5–6.6 uses J/L cuts and numeric BGM “85%” handovers in separate Veo prompts, while [produce](../../agents/skills/openproducer-produce/SKILL.md) sets `Dialogue: None` in external audio mode. Per-clip AI audio is independently generated; prompt text alone cannot guarantee phase, melody, ambience, or volume continuity across clips. There is no explicit routing of generated SFX, ambience, score, voice, and external master into a final mix.

**Effect:** Abrupt music changes, doubled dialogue, mismatched room tone, and clipped effects can survive despite correct prompt wording.

**Clean fix steps within prompt-only scope:** (1) Keep `Dialogue: None` for external master speech and avoid prompting separate clip music when the creator intends one continuous music track. (2) Add a short `Audio use in edit:` note per clip (`mute generated audio`, `keep selected Foley`, or `native full audio`) in the scratchbook. (3) Describe J/L cuts as **manual edit cues with intended offsets**, not something independent video prompts can guarantee. (4) Ask the creator to listen across each cut and adjust their manual mix. The skill does not create stems, edit audio, or claim measured volume continuity.

### P1-11 — Template contracts accept incompatible values and bypass validation

**Evidence:** [template schema](../../agents/skills/openproducer-core/templates/schema.json) allows `pathway_b_external_audio_lipsync`, `words_per_second`, and `vocal_onset`; the [CLI parser](../../src/core/templates.ts) and [starter preset](../../agents/skills/openproducer-core/templates/starter_presets/cinema-short-film.md) use `separate_audio`, `speech_pacing`, and `vocal_attack`; [types](../../src/core/types.ts) use `pathway_b_external_audio`. The schema's `cinematic` archetype differs from the type's `cinema`. The parser provides silent defaults and does not validate the schema; the [config manager](../../src/core/config.ts) reads JSON without runtime validation.

**Effect:** A template can look valid, parse to defaults or incompatible mode strings, and choose the wrong audio workflow or clip pacing.

**Clean fix steps:** (1) Choose one vocabulary for `audio_pathway`, `audio_delivery_mode`, `archetype`, and pacing fields; document aliases for existing templates. (2) Align schema, bundled presets, parser, config, and workflow branches to that vocabulary. (3) On load/save/init, reject or explicitly migrate unknown values rather than silently defaulting. (4) Round-trip every starter preset and test one malformed value. (5) Keep archived story-template support out of live video routing. **CLI changes wait for an explicit `src/` unfreeze.**

### P1-12 — Global template edit can promote unrelated changes

**Evidence:** [template command](../../src/commands/template.ts) handles `template edit <id> save` by calling `syncProjectTemplatesToGlobal()` without limiting the sync to that ID. The [template workflow](../../agents/workflows/opp-template.md) presents this as approval of a single template.

**Effect:** Old or unfinished local templates can become active globally and later change video style, pacing, or audio settings unexpectedly.

**Clean fix steps:** (1) Change `edit <id> save` to resolve exactly one group and ID. (2) Preview only that template's proposed changes. (3) Validate it against the canonical schema. (4) Save only that file; leave unrelated local templates untouched. (5) Test with two modified local templates and confirm only the requested one is promoted. **CLI changes wait for an explicit `src/` unfreeze.**

### P2-13 — Specs and generated instructions retain contradictory rules

**Evidence:** [root AGENTS.md](../../AGENTS.md) and [visual spec](../../production_framework/specs/01_visual_spec.md) still contain a 100–150 word prompt claim, while [director's cut spec](../../production_framework/specs/05_directors_cut_assembly_spec.md) L-01 abolishes the ceiling and [produce workflow](../../agents/workflows/opp-produce.md) restores 75–150. The [scaffolded AGENTS.md](../../production_template/AGENTS.md) §5 still requires 75–150. The [retake spec](../../production_framework/specs/06_retake_doctor_spec.md) defines G-17–G-20, but [doctor skill](../../agents/skills/openproducer-doctor/SKILL.md) says G-01–G-16 and reuses G-16 for two different symptoms. Packaged files in `agents/` and `src/templates/agents/` are byte-identical, so these conflicts ship to new projects.

**Effect:** Agents can follow different “authoritative” instructions depending on which file they load. Doctor may miss topology, depth, viewpoint, or BGM defects.

**Clean fix steps:** (1) Make the current director's-cut/assembly spec the rule source for live clip planning and state that `production/story/` is archived. (2) Remove fixed 75–150 and 100–150 prompt limits from active instructions; replace the L-01 minimum word floor with a compact completeness check. (3) Make one G-01–G-20 diagnostic list and fix the duplicated G-16 label. (4) Reconcile active skill/workflow, scaffold instructions, README, and manifest names. (5) Preserve old discussion text as history but label superseded rules clearly. (6) Update bundled mirrors when the package is next unfrozen.

### P2-14 — Packaging validation and timeline source are incomplete

**Evidence:** [package skill](../../agents/skills/openproducer-package/SKILL.md) defines PKG-01 through PKG-07 but its execution step runs only PKG-01 through PKG-06. [packaging spec](../../production_framework/specs/09_packaging_spec.md) names a different packaging linter set. Both derive chapters from `production/timeline.md` or prompt clip durations, yet produce does not require `timeline.md` or final rendered trims. Prompt-file `INPUT SEEDS` are intentional creator-facing image cues and are **not** a finding.

**Effect:** Duplicate reference *cues* and incorrect public chapter timestamps can pass packaging review.

**Clean fix steps:** (1) Reconcile the PKG rule IDs and execute all seven, including ingredient uniqueness in both lean and modular tiers. (2) Keep prompt-file cue paths as they are. (3) Generate provisional chapters only from a clearly labeled planned edit; replace them with the creator's confirmed final cut times before publication. (4) Ask the creator to visually check rendered thumbnail spelling and safe zones; the skill can only validate the prompt in advance.

### P0-15 — Excessive absolute prompt rules crowd out the scene

**Evidence:** [visual spec](../../production_framework/specs/01_visual_spec.md) and [director's cut spec](../../production_framework/specs/05_directors_cut_assembly_spec.md) describe deterministic style injection, token windows, fixed physical laws, and prompt-level prevention of specific glitches. The same spec's L-01 requires at least 50 words with no ceiling, while the [scaffolding spec](../../production_framework/specs/07_scaffolding_and_workspace_spec.md) repeats full topology, Z-index, wardrobe, facial, style, camera, and long negative constraints into clip contracts. Representative [Lighthouse v2 clip prompts](../../production_framework/simulations/the_lighthouse_v2/production/clips/clip_009/video_prompt.txt) repeat broad negative lists. The [safety registry](../../production_framework/specs/safety_registry.md) contains platform-block heuristics; the CLI covers three phrases. These may be useful tested practices, but their cumulative mandatory wording competes with the actual current scene and can introduce unwanted objects or actions. The creator reports wrong outputs from this prompt crowding; the audit did not independently render those outputs.

**Effect:** The model can give attention to repeated bans, anatomy, furniture, and historical context instead of the exact action and audio moment. Long negative lists may surface the banned objects; conflicting instructions can yield odd scale, extra people, or a wrong scene.

**Clean fix steps:** (1) Replace word-count L-01 with **required meaning slots**: who/what is visible, where, what changes now, framing scale, light/style only if needed, and audio mode. (2) Put stable project/room/character facts in the approved reference images and compact internal notes; include only the two or three invariants relevant to this shot in its creative body. (3) Keep one primary action and one camera behavior only when appropriate; do not force a camera move or extra cutaway. (4) Use short, shot-specific negatives only for demonstrated failure modes. (5) Delete duplicated configuration, exposition, and unused safety vocabulary from text pasted into Flow. (6) Review a small representative set of prompts side by side with their audio cues before adopting a new rule. (7) Label empirical token-position and safety claims as heuristics rather than guaranteed model behavior.

### P0-16 — Script-to-clip translation lacks a visual relevance and scale gate

**Evidence:** [produce skill](../../agents/skills/openproducer-produce/SKILL.md) says clips should match voice context but supplies no required per-cue visual mapping or acceptance test. The [director's cut spec](../../production_framework/specs/05_directors_cut_assembly_spec.md) §§4.1–4.4 combines a one-action law, mandatory context shifts, and a repeating four-beat visual rhythm. This can generate an insert because the rhythm calls for one, even when the audio calls for a specific action or subject. The [Lighthouse v2 scratchbook](../../production_framework/simulations/the_lighthouse_v2/production/scratchbook.md) lists narration snippets and camera moves but not the exact visual event, subject size, spatial anchor, or reveal time for each cue. For example, `clip_009`'s narration says “Then comes a sound that makes your blood run cold,” while its [video prompt](../../production_framework/simulations/the_lighthouse_v2/production/clips/clip_009/video_prompt.txt) specifies breathing and stove whistle; the connection to that narrated sound is ambiguous. The creator reports generated scenes with character-to-room scale errors, unrelated clips, and false visual events. Those render defects are creator observations, not independently inspected here.

**Effect:** A prompt may satisfy style and duration rules while showing the wrong person, wrong room proportion, an invented event, or a reveal before/after its audio cue. Repetitive shot templates worsen drift over a long sequence.

**Clean fix steps — script/audio to visual compilation:**

1. **Lock the approved script and audio clock.** For separate audio, use the creator's time-coded final audio. For embedded audio, time the approved spoken/action beats explicitly. Identify each claim, event, reveal, speaker turn, and intentional silence.
2. **Build a compact cue-to-visual ledger before writing prompts.** For every continuous audio window, record exact time range, exact words/sound, the one visual fact that must be on screen, subject ID, location ID, causal action, and whether the visual is literal, reaction, or intentionally withheld. A metaphor/cutaway is permitted only when it expresses that cue and does not hide a required event.
3. **Protect reveal order.** Mark what the audience may see at the start and end of the window. A later clue, prop, person, or event must not appear in the starting image for an earlier line. If audio announces a knock at 01:16, the visual before 01:16 may establish the door but must not show the knock as already occurring.
4. **Set shot scale from story function.** Give each shot a framing category plus approximate subject occupancy (for example, wide setting view: small but legible subject; medium action: torso/room context; close reaction: face dominates). Use rough bands only as a check, not a rigid mathematical law. Preserve relative person-to-door/desk/room proportions from the chosen Flow reference image. State camera distance or subject size in one plain sentence; avoid conflicting “wide room” and “face close-up” instructions.
5. **Choose edit windows from audio events, then generation lengths.** Cut at meaningful changes in action, location, speaker, or reveal. Edited shot lengths may be uneven. Choose a 4/6/8/10 generated clip with enough usable footage; write any trim/hold in the ledger. Never force a four-beat loop, fixed clip count, or one transcript line per clip.
6. **Compile a lean image prompt and a lean motion prompt.** The image prompt shows the exact *first visible moment* of this window and the approved subject/room scale. The video prompt describes only the change that happens within this window. Reuse Flow project images through the existing prompt-file cues; do not re-describe every stable detail.
7. **Run a two-direction coverage review.** Audio-to-visual: every spoken/event cue has a matching, correctly timed visual or a documented intentional reaction/withhold. Visual-to-audio: every major visible object/action has a cause in the approved story and no future spoiler. Review first/last frame state, subject identity, room scale, screen direction, and prop continuity between adjacent clips.
8. **Mark uncertainty honestly.** If exact audio timing or Flow render is not yet available, label clip prompts `PROVISIONAL`. After a creator render, ask whether the scene, scale, action, and cue timing match; retake only the failing clip and update its dependent handoff notes.

**Small required ledger row, not a new bureaucracy:** `00:41.0–00:47.3 | cue: “You raise your lantern...” | visual: keeper raises already-held lantern inside stairwell | subject: keeper | location: stairwell | medium shot, body about half frame height | no roof/hatch reveal yet | generate 8s, edit to 6.3s`. The bounds are illustrative, not prescribed shot lengths.

## Feature coverage and disposition

| Area reviewed | Main result |
|---|---|
| Research and visual/style | Reference-first intent is sound; cumulative absolute prompt rules need pruning and heuristics need labels. |
| Subject, character, scenery | Keep Flow project image cues; add a lean subject-scale/room-layout check in each relevant shot. |
| Script/audio to clips | Highest creative risk: require cue-to-visual mapping, reveal timing, meaningful variable edit lengths, and two-direction coverage review. |
| Cinematography, clip assembly | Keep 4/6/8/10 generation options; distinguish them from uneven edited screen durations and check local timestamp spans. |
| Dialogue, TTS, music | Use the creator's approved rendered audio timestamps; separate paste-ready speech from setup notes and manual mix cues. |
| Archived story experiment | Keep staged archive inert; remove live `production/story/` routing and references during implementation. |
| Retake doctor and safety | Detailed symptom catalog; CLI checks only a small subset and skill diagnostic IDs lag spec. |
| Packaging | Keep prompt-file input cues; derive final chapters from creator-confirmed edit times and run all declared checks. |
| CLI, templates, scaffold | Typecheck passes, but runtime validation and audit certification are unreliable. |

## Clean implementation sequence

| Order | Change | Primary files | Done when |
|---|---|---|---|
| 1 | Write the cue-to-visual and variable edit-length contract | `production_framework/specs/05_directors_cut_assembly_spec.md`, `07_scaffolding_and_workspace_spec.md`, active `openproducer-produce` and `openproducer-guide` skills/workflows | A shot ledger names the exact audio cue, visible event, subject/location, scale, reveal boundary, generation length, and edited length; no generic insert is required by rhythm alone. |
| 2 | Simplify prompt requirements | `01_visual_spec.md`, `04_cinematography_audio_spec.md`, `05_directors_cut_assembly_spec.md`, styles, active produce skill | Prompt bodies prioritize present scene/action, avoid copied rule walls, and a short representative cue set maps correctly in both directions. |
| 3 | Correct prompt-side audit and status semantics | Active specs/skills/manifest guidance first; `src/core/linters.ts`, `constants.ts`, and `commands/doctor.ts` only when package is explicitly unfrozen | No unimplemented rule reports PASS; no PENDING project reports CERTIFIED; valid negatives/configuration do not produce false violations. |
| 4 | Coordinate separate audio and manual edit handoff | Active produce/guide/package skills, `scratchbook.md` contract | The skill requests real audio duration and time-coded cues, notes planned trims, invalidates stale times after re-recording, and asks for final edit times before chapters. |
| 5 | Clarify model/TTS and reference instructions | Produce/guide, scaffolding spec, template documentation | Four duration choices remain; prompts identify compatible model/mode, paste-only TTS text, and the Flow project image represented by each prompt-file cue. |
| 6 | Remove live experimental story routing and align templates | Active docs/skills and `production_template/`; CLI/template schema when `src/` is unfrozen | No live mode creates, detects, or ingests `production/story/`; bundled presets parse without silent incompatible defaults; single-template save affects only that template. |
| 7 | Reconcile packaging, diagnostics, and public claims | Package/doctor skills, specs, README, scaffolded AGENTS, packaged mirrors at promotion | PKG-01–07 all run, G-code names agree, chapters match creator-confirmed edit, and no prompt readiness claim implies a rendered video was checked. |

**Package boundary:** The creator explicitly approved implementing this audit on 15 November 2026, including the necessary `src/` changes. That approval is recorded in `AGENTS.md`; no package publication or Git write was requested.

## Approved fixes implemented — 15 November 2026

| Finding | Implementation | Current check |
|---|---|---|
| D-01, D-04 | Kept 4/6/8/10 generation choices and prompt-file image cues. Active guidance now distinguishes the generated clip, the Flow image selected by the creator, and the edited on-screen interval. | Project durations and cue-path tests pass; creator must check the selected Flow model/mode. |
| P0-02, P0-03 | Aligned the CLI L01–L19 registry and manifest. Section-aware checks inspect creative bodies without treating config or negative blocks as violations. Unimplemented/semantic checks remain `PENDING`; `CERTIFIED` requires no pending, warning, or failure. | Empty-project, positive, and negative fixtures pass. The CLI does not claim to validate rendered media. |
| P0-05, P0-16 | The director's-cut spec and produce/guide instructions now require an audio-cue-to-visual ledger, reveal boundaries, subject/room scale, meaningful variable edited lengths, source trims, and two-direction coverage review. Repetitive four-beat coverage is optional. | Prompt-side contract implemented; creator render results are still needed to assess actual Flow compliance. |
| P1-06, P1-07, P1-09, P1-10 | Separate audio uses the approved render's duration and time-coded transcript; re-recording invalidates cue times. TTS setup is separate from paste-ready text, with model-specific cue testing. Prompt readiness and manual render/edit approval are distinct; per-clip generated audio use is an edit instruction. | Skills/specs reconciled; no automatic audio or video processing is claimed. |
| P1-08 | Removed live `production/story/` routing from scaffold, CLI, active modes, and active specs. The experimental story spec remains under `production_framework/staged/`. | Active-tree search found no live `production/story/` reference. |
| P1-11, P1-12 | Video templates validate required fields, enums, pacing, and audio pairing; starter presets parse. `template edit <id> save` promotes only the requested template, with no read-time global auto-promotion. | Bundled preset round-trip and two-local-template promotion fixture pass. |
| P2-13, P2-14, P0-15 | Removed live prompt word floors and false universal TTS-tag claims; aligned G01–G20 guidance. Packaging checks PKG-01–07 and uses creator-confirmed final edit times for publication chapters. Prompt guidance now prioritizes the present cue, one causal action, and only relevant continuity constraints. | Active guidance and packaged mirrors rebuilt; creator must confirm render and final edit times. |

**Validation:** `npm run test:audit` (includes build and bundled-template tests) and `npm run typecheck` both pass. The Lighthouse v2 scratchbook is labeled historical because 15 of its 37 rows have local duration/timestamp mismatches; it is not a current proof of synchronized output. No Flow generation, speech synthesis, or final timeline assembly was run as part of these fixes.

## Verification performed and limits

- Read the repository map, active and staged skill/workflow contracts, core specs, template schema and starter presets, scaffold instructions, CLI source, and representative simulation prompt files. Did not load the cold raw research or discussion archives.
- Confirmed `agents/` and `src/templates/agents/` files match byte for byte in the current checkout.
- `npm run typecheck` completed successfully. This checks TypeScript types, **not** generation behavior or prompt correctness.
- Compared platform claims against Google's current [Flow model support](https://support.google.com/flow/answer/16352836), [Flow creation guidance](https://support.google.com/flow/answer/16353334), [Gemini TTS guidance](https://ai.google.dev/gemini-api/docs/speech-generation), and [legacy TTS guidance](https://ai.google.dev/gemini-api/docs/generate-content/speech-generation). Availability can vary by region, plan, and active model; the exact Flow UI choice must be checked at generation time.
- Counted all 37 Lighthouse v2 scratchbook rows: 15 local duration/timestamp-span mismatches despite a near-equal aggregate duration. This is a file-level finding, not a claim that a final edit was rendered incorrectly.
- No real Google Flow generation, audio render, or NLE assembly was run in this audit. Character-to-room ratio and false visual outputs were reported by the creator and are addressed as prompt-design risks, not independently inspected renders.
