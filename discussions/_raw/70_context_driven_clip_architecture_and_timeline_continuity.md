# Discussion 70 — Context-Driven Clip Generation, Timeline Continuity, and Lighthouse Simulation Audit

**Date:** 2026-10-31  
**Status:** ✅ Finalized & Implemented  
**Focus:** Audit of `the_lighthouse` simulation, correcting the agent's clip generation mental model, establishing the Context-Driven Clip Architecture, and enforcing timeline continuity across skills.

---

## 1. Executive Summary & Simulation Context

During the recent testing session, a full 5-minute horror simulation titled **The Lone Lighthouse Keeper** (`the_lighthouse`) was generated under `production_framework/simulations/the_lighthouse/`.

While the visual style prompts (`base_image_prompt.txt`, `master_images_prompt.txt`, `master_videos_prompt.txt`) demonstrated strong adherence to the `vector_stick_figure` noir style, a deep audit revealed critical disconnects:
1. **Missing Repository Linkage:** The simulation directory existed on disk but was not registered or referenced in `AGENTS.md`, `discussions/`, or any project index.
2. **Severe Temporal Deficit (58.37s Missing Video):**
   - Master voiceover duration (`audio_script.md` / `scratchbook.md`): **05:18 (318.37 seconds)**.
   - Sliced video duration across 28 clips: $18 \times 10\text{s} + 10 \times 8\text{s} = \mathbf{260\text{ seconds}}$ (**04:20**).
   - **Shortfall:** The video ends at 04:20, leaving **58.37 seconds of spoken audio playing over black/dead screen** at the end.
   - **Per-Clip Desync:** Multiple clips were stamped with `Duration: 10s` while their assigned audio cues spanned 14s, 17s, 18s, and 21s (e.g. `clip_023` assigned `03:42 - 04:00` [18s] into a 10s clip; `clip_028` assigned `04:57 - 05:18` [21s] into a 10s clip).
   - **Dialogue Contamination in Separate Audio:** In `clip_028/video_prompt.txt`, a dialogue quote was included in the `Audio:` block despite the project using an external Google AI Studio master voice track.
   - **False Linter Verification:** `scratchbook.md` erroneously reported all clips as passed, failing to catch that Linter L-14 was severely violated.

---

## 2. Root Cause Analysis: The Agent's Flawed Mental Model

### The Flawed Assumption (Transcript as a Mechanical Clip Chopper)
The agent mistook the transcript / SRT lines as a 1:1 recipe for generating clips:
* It assumed: *1 script paragraph / sentence cue = 1 video clip*.
* When an audio narration cue took 18 seconds or 21 seconds to speak in the recording, the agent hit Veo's 10-second native ceiling.
* Instead of directing visual cinema, it simply slapped `Duration: 10s` on the clip while leaving the audio timestamp span as 18s or 21s, creating temporal black holes on the timeline.

### The True Creator Architecture: Context-Driven Cinematography with Audio Timeline Tiling
In professional video production, **a transcript does NOT dictate the video shots**.

1. **Clips Are Born from Narrative Context & Cinematography (Not Transcript Slicing):**
   - Clips are visual storytelling units planned from the **plot context, visual mood, and cinematic coverage** (establishing shots, medium shots, character actions, dramatic tension, reaction shots, macro cutaway inserts, environmental details).
   - A director decides what the audience needs to *see* to experience the story. For example, during a 20-second dramatic monologue, the director might plan 3 distinct cinematic shots:
     - Shot A (8s): Slow push-in toward the protagonist's trembling posture.
     - Shot B (6s): Macro cutaway of the lantern flame flickering erratically in the draft.
     - Shot C (6s): Low-angle tracking shot of the stone door threshold.
   - Conversely, a short 3-second line can be paired with an atmospheric 6-second or 8-second wide establishing shot that lets the emotional weight linger.

2. **The True Role of the Transcript & Master Audio:**
   The transcript and recorded audio serve strictly as:
   - **The Timeline Ruler (Duration Matching):** The audio file defines a continuous temporal line ($00:00 \to T_{\text{end}}$). The video clips must **tile this timeline contiguously without gaps** ($\sum \text{Clip Durations} == \text{Total Master Audio Duration}$ within $\pm 1\text{s}$). Clip $N+1$ begins exactly at the second where Clip $N$ ends.
   - **The Scenery Synchronization Anchor:** The transcript timestamps tell the director **what is happening narratively at that exact moment**, ensuring that the visual scenery, props, and character actions depicted in each clip faithfully match what the voice is describing or evoking at that specific time window.

---

## 3. Authoritative Production Rules Codified in Skills

To ensure every agent follows this architecture, the following rules are formally codified into `agents/skills/openproducer-produce/SKILL.md` and `agents/workflows/opp-produce.md`:

### Rule 1: The Context-Driven Cinematography Law
* **Clips are NEVER a mechanical 1:1 split of transcript sentences.**
* OpenProducer plans clips based on the narrative context, visual beats, and cinematic coverage of the plot.
* The director chooses camera angles, cutaways, establishing shots, and reaction frames to tell the story visually.

### Rule 2: Contiguous Audio Timeline Tiling ($\sum \text{Clips} == \text{Audio}$)
* When `separate_audio` is used and timestamps/transcripts are provided:
  1. The sequence of clips must **contiguously tile the audio timeline from $00:00$ to the end of the master track**.
  2. Every clip's start timestamp must match the previous clip's end timestamp with zero gaps and zero overlap.
  3. Every individual clip duration must be a valid Flow native duration: **4s, 6s, 8s, or 10s**.
  4. The sum of all clip durations must equal the total audio duration (within $\pm 1.0\text{s}$ tolerance across the entire project).

### Rule 3: Scenery-Voice Timestamp Matching
* Each clip's visual prompt (`image_prompt.txt` starting frame + `video_prompt.txt` action/camera vector) must reflect the narrative and environmental context of what the voice is expressing during that specific timestamp window.

### Rule 4: Dialogue Cleansing in Separate Audio
* When `audio_delivery_mode` is `separate_audio` (`separate_script_first` or `separate_all_at_once`), all `video_prompt.txt` files must strictly set `Dialogue: None;` (or omit dialogue lines entirely).
* This guarantees that Google Flow / Veo 3.1 does not generate competing spoken dialogue, synthetic lip movements, or audio clutter over the master external voice track.

### Rule 5: Strict Mathematical Pre-Flight Audit (Linter L-14)
* Before setting `"stages.clips_generated": true` or declaring `produce` complete:
  - Verify that each clip's duration matches its assigned timeline span:
    $$|\text{Clip Duration} - (\text{End Timestamp} - \text{Start Timestamp})| \le 1.0\text{s}$$
  - Verify that the total video runtime matches the master audio track.
  - Never record a passing status in `scratchbook.md` or `manifest.json` if a duration mismatch exists.

---

## 4. Registering `the_lighthouse` Simulation

With these principles codified, `the_lighthouse` is now fully audited and registered:
- **Location:** `production_framework/simulations/the_lighthouse/`
- **Archetype / Style:** Horror Monologue / `vector_stick_figure` (Minimalist 2D Vector Graphic Noir)
- **Audio Master:** Google AI Studio `Fenrir` (05:18 / 318.37s)
- **Documented Glitches & Lessons Learned:** Serves as the authoritative benchmark proving why clips must be generated from plot context rather than mechanical transcript slicing, and why audio timeline continuity must be mathematically locked.

