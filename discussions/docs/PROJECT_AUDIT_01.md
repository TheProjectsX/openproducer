# Project Audit & Compile-Readiness Report

**Date:** October 26, 2026  
**Scope:** Full repository audit across [`AGENTS.md`](../../AGENTS.md), [`production_framework/`](../../production_framework/), [`discussions/`](../../discussions/), and active [`research/`](../../research/) (`structure.md`, `validation.md`, `synthesis/`, `styles/`), excluding cold archives (`research/raw_contents/`, `research/raw_notes/`, `discussions/_raw/`).  
**Purpose:** Pre-compilation quality gate before transitioning from Research & Specification (Phases 1–6) into Project Scaffolding & Automation/Skill Compilation (Phases 7–8).

---

## 1. Executive Scorecard

| Dimension | Score | Rating | Summary Assessment |
|---|---|---|---|
| **1. Empirical Research & Domain Depth** | **9.6 / 10** | 🟢 Exceptional | Hard-won, field-tested diffusion insights (Equipment Noun Trap, Anti-Muppet Lip Restraint, Pre-Materialized Props, Closed-Lip Listener, Dual-Track Speech Velocity, 3-Tier Image-First Pipeline). |
| **2. Pluggable Style Architecture** | **8.5 / 10** | 🟢 Strong | The 3-Tier `Medium -> Dialect -> Scene Mood` model in `production_framework/styles/` is clean and extensible, but 2 of the 8 plugin files have structural gaps and linter-violating tokens. |
| **3. Cross-Spec Consistency** | **5.8 / 10** | 🔴 Needs Fix | Severe Linter ID collisions (`L-01` to `L-11` mean different things in different files), 3 competing folder contracts for shots/clips, and self-contradictory rules in `02_character_spec.md` and `05_directors_cut_assembly_spec.md`. |
| **4. Research-to-Spec Synchronization** | **6.0 / 10** | 🟡 Outdated | `research/synthesis/` (marked "Tier 1 Active Knowledge") still contains early Phase 3 anti-patterns (`tripod`, `Steadicam`, OTS dialogue shots, `[00:00-00:03]` timestamps for 8s Veo clips, and `"16:9, 1080p, 24fps, 8s"` inside prompt text). |
| **5. Repository Hygiene & Leanness** | **6.5 / 10** | 🟡 Cluttered | Leftover proposal files at root (`MIGRATION_PROPOSAL.md`, `PDFCrossCheck.md`), 5 legacy/ad-hoc simulation folders mixed into `production_framework/`, and bureaucratic JSON schemas queued in `00_tasks.md` that contradict the lean markdown workflow proven in Phase 6. |
| **6. Creator UX & Workflow Validation** | **9.5 / 10** | 🟢 Proven | Field-validated reduction of production time from 3–4 hours to **10–15 minutes** using the Dialogue-First (`audio.srt`) loop, Confirmation Gate, and Dual Master Prompts (`master_images_prompt.txt` + `master_videos_prompt.txt`). |
| **OVERALL COMPILE READINESS** | **7.6 / 10** | 🟡 **Ready After Spec Harmonization** | The research and empirical laws are world-class, but **if we write code against the current files as-is, the compiler and linters will fight each other.** A quick cleanup pass will bring this to **9.8/10**. |

---

## 2. Research Result Summary: What Works Brilliantly (Keep 100%)

Before noting what is broken, it is important to recognize the **high-signal breakthroughs** established across Phases 1–6 that form the core IP of this framework:

1. **Asymmetric Token Attention Curve (`01_visual_spec.md`):**
   - *Tokens 1–30:* Viewport framing & primary subject anchor.
   - *Tokens 31–80:* Single biomechanical action & motivated 3-plane lighting.
   - *Tokens 81–130:* Master Style Anchor / Dialect & single camera kinematic verb.
   - *Trailing Block:* Dedicated `Audio:` soundscape.
2. **The Camera Equipment Hallucination Trap (`04_cinematography_audio_spec.md`):**
   - Strictly banning physical gear nouns (`tripod`, `dolly`, `crane`, `gimbal`, `steadicam`, `drone`, `slider`, `rig`) and replacing them with pure optical/kinematic vectors.
3. **Configuration vs. Prompt Text Decoupling (`01_visual_spec.md`):**
   - Keeping `16:9`, `9:16`, `1080p`, `24fps`, and `8s` strictly in the configuration header/API payload and out of the creative prompt string.
4. **The 3-Tier Image-First Pipeline & Dual Master Prompts (`05_directors_cut_assembly_spec.md`):**
   - Separating `base_image_prompt.txt` (Tier 1 Ingredient #1) $\rightarrow$ `clips/clip_XX/image_prompt.txt` (Tier 2 Keyframe Plate) $\rightarrow$ `clips/clip_XX/video_prompt.txt` (Tier 3 I2V Motion Prompt), bundled into `master_images_prompt.txt` and `master_videos_prompt.txt`.
5. **Empirical Glitch Remediations (`05_directors_cut_assembly_spec.md`):**
   - **Single-Motion & Micro-Beat De-Cramming Law:** $1\text{ Clip} = 1\text{ Camera Trajectory} + 1\text{ Spatial Plane} + 1\text{ Micro-Action}$.
   - **Pre-Materialized Prop Law:** Props must be grasped from Frame 1 to Frame End; drawing a weapon requires a cutaway edit.
   - **Closed-Lip Listener Rule:** Explicit `firmly closed lips, tight jaw, zero mouth movement` when off-screen/phone dialogue plays over an on-screen character.
   - **Anti-Muppet Biomechanical Restraint:** `relaxed jaw, minimal jaw displacement, subtle lip articulation` + sentence-case + colon before quotes + period cadence hack.
   - **Multi-Character Clean Singles & 30° Contrast Law:** Banning dirty OTS shots (which melt shoulders and bleed identities) in favor of Wide Two-Shot Establishers + Clean Singles with complementary 15° eyelines, and enforcing $\ge 30^\circ$ angle shifts (or `last_frame` chaining) to prevent AI jump-cuts.
6. **Dual-Track Speech Velocity & Dialogue-First SRT Loop (`04_cinematography_audio_spec.md` & `05_directors_cut_assembly_spec.md`):**
   - Decoupling **Pathway A (Native Veo 3.1: ~1.2–1.5 WPS)** from **Pathway B (External TTS: ~2.2 WPS)**, enforcing the Stage 1 Hard Pause until real audio/SRT timestamps are provided, and isolating Gemini 3.8 Flash TTS `< >` tags on standalone lines (`.\n<long pause>\n`) to prevent tag reading.

---

## 3. What Is Wrong / Contradictory (Critical Bugs Blocking Compilation)

If we move into the Phase 8 compile step (`compile_shot.py`, `lint_shot.py`) without resolving the following 7 contradictions, our automated tools will have conflicting rules.

### 3.1 The Linter ID Collision & Duplication Crisis
Across the repository, **4 different files define `L-XX` linter rules with overlapping and contradictory IDs**, plus a separate `E-01`–`E-05` set in `03_scenery_spec.md`:

| Linter ID | [`research/synthesis/07_structured_prompting.md`](../../research/synthesis/07_structured_prompting.md) | [`00_architecture_blueprint.md`](../../production_framework/00_architecture_blueprint.md) | [`04_cinematography_audio_spec.md`](../../production_framework/specs/04_cinematography_audio_spec.md) | [`05_directors_cut_assembly_spec.md`](../../production_framework/specs/05_directors_cut_assembly_spec.md) | Conflict Diagnosis |
|---|---|---|---|---|---|
| **`L-01`** | Front-Loading (first 15 words) | Word Economy (100–150 words) | — | Referenced on line 105 as *"External TTS breathing buffer"*! | **3-Way Collision:** Means 3 completely different things in 3 files. |
| **`L-02`** | Word Economy (80–160 words) | Attention Front-Loading (first 30 tokens) | — | — | **Swapped IDs** between Synthesis 07 and Blueprint, with different word limits (80–160 vs 100–150). |
| **`L-03`** | One Action Rule | No Equipment Nouns | — | — | **Collision:** Blueprint's `L-03` is duplicated by `L-07` (Spec 04), `L-11` (Spec 05), and `E-04` (Spec 03). |
| **`L-04`** | Single Camera Verb | Decoupled Config (`16:9`, `1080p`, etc.) | — | — | **Collision** between Synthesis 07 and Blueprint. |
| **`L-05`** | Dialogue Syntax & Casing | Invariant Subject Verification | — | — | **Collision:** Blueprint's `L-05` is duplicated by `L-09` in Spec 05. |
| **`L-06`** | Audio Suppression (`no background music`) | Audio Purity (`Audio:` ... `, no background music`) | — | — | Superseded by `L-18` (3-Track Semicolon Audio Syntax), or conflicts when Mode B Upfront Music is used. |
| **`L-07`** | — | — | **Equipment Noun Prohibition** | **Action Budget Linter** | **Direct Spec-to-Spec Collision** between Spec 04 and Spec 05! |
| **`L-08`** | — | — | **Dialogue Biomechanical Restraint** | **Speech Velocity Linter** | **Direct Spec-to-Spec Collision** between Spec 04 and Spec 05! |
| **`L-09`** | — | — | **Dialogue & Audio Clutter Conflict** | **Subject DNA Invariance** | **Direct Spec-to-Spec Collision** between Spec 04 and Spec 05! |
| **`L-10`–`L-15`** | — | — | — | Continuity (`L-10`), Equipment (`L-11`), Closed-Lip (`L-12`), Pre-Materialized Prop (`L-13`), Gemini TTS (`L-14`), Screen Direction (`L-15`) | `L-11` duplicates `L-03` (Blueprint) and `L-07` (Spec 04). |
| **`L-16`–`L-18`** | — | — | Native Veo Words (`L-16`), Anti-Subtitle (`L-17`), 3-Track Audio (`L-18`) | Native Veo Words (`L-16`), Anti-Subtitle (`L-17`), 3-Track Audio (`L-18`) | Duplicated across both Spec 04 and Spec 05. |
| **`L-19`–`L-20`** | — | — | — | 30° Contrast (`L-19`), Authored Voice (`L-20`) | Only in Spec 05 (where line 402 still says *"must pass these 5 assembly-level linters"* despite listing 14!). |

---

### 3.2 Three Incompatible Directory & File Contracts
There is no single agreed-upon directory structure for a project's shots/clips or environments:

1. **Shots vs. Clips Contract Mismatch:**
   - **Contract A ([`00_architecture_blueprint.md`](../../production_framework/00_architecture_blueprint.md#L161-L178) & [`00_tasks.md`](../../production_framework/00_tasks.md#L35-L37)):**
     Uses `structure/sequence_manifest.json`, `structure/dialogue_bible.json`, `shots/shot_list.json`, and `shots/<shot_id>/shot_config.json`, `compiled_prompt.txt`, `keyframes/`, `lint_report.json`.
   - **Contract B ([`05_directors_cut_assembly_spec.md` Section 7](../../production_framework/specs/05_directors_cut_assembly_spec.md#L361-L378) — Proven in Phase 6):**
     Uses `base_image_prompt.txt`, `scratchbook.md`, `master_images_prompt.txt`, `master_videos_prompt.txt`, `narrator_script.md`, `dialogue_scripts.md`, `origin_manifest.md`, and `clips/clip_XX/image_prompt.txt` + `video_prompt.txt`.
   - **Contract C ([`05_directors_cut_assembly_spec.md` Section 7.1](../../production_framework/specs/05_directors_cut_assembly_spec.md#L382-L395) — Legacy):**
     Immediately below Section 7, Section 7.1 still specifies the deprecated `individual_clips/clip_XX.txt` single-file format!
2. **`environments/` File Contract Mismatch:**
   - [`00_architecture_blueprint.md` (lines 152–159)](../../production_framework/00_architecture_blueprint.md#L152-L159) defines: `description.md`, `lighting_rig.md`, `reference_prompt.txt`, `acoustic_profile.md`, and `references/concept_board.png` (missing `master_anchor.txt` and `spatial_layers.md`).
   - [`03_scenery_spec.md` (lines 28–38)](../../production_framework/specs/03_scenery_spec.md#L28-L38) defines: `summary.md`, `spatial_layers.md`, `lighting_rig.md`, `acoustics.md`, `master_anchor.txt`, `reference_prompt.txt`, and `references/empty_stage.png`.
   - [`discussions/sceneries.md` (lines 38–48)](../../discussions/sceneries.md#L38-L48) omits `reference_prompt.txt`.
3. **`characters/` vs. `subjects/` Path Ambiguity:**
   - [`02_character_spec.md`](../../production_framework/specs/02_character_spec.md#L25-L38) uses `characters/<character_id>/` in its diagrams and templates while noting `(or subjects/<character_id>/)`, whereas [`00_architecture_blueprint.md`](../../production_framework/00_architecture_blueprint.md#L141-L150) and [`02_subject_spec.md`](../../production_framework/specs/02_subject_spec.md#L48-L63) mandate `subjects/<subject_id>/`. A Python compiler needs one canonical path.

---

### 3.3 Internal Self-Contradiction in `02_character_spec.md` (Biometric Detail vs. Lean Reference Anchoring)
In [`02_character_spec.md` Section 4, Scenario 1](../../production_framework/specs/02_character_spec.md#L138-L150) (Creator Supplies Their Own Photo):
- **Rules 1, 2, and 3 (lines 140–142)** instruct the agent to extract facial landmarks and inject explicit anatomical descriptions (`zygomatic arches (cheekbones), nose bridge contours, jawline angle, and eye socket geometry`).
- **Rule 9 (line 150, added in Discussion 54)** directly contradicts Rules 1–3 right above it:
  > *"When an image reference is supplied as `[IMAGE 1]`, writing lengthy paragraphs in text describing facial bone structures, cheekbone contours, or nose bridges backfires by splitting token attention—the text tokens compete with and override the reference image's latent representation, synthesizing a generic AI face. The prompt MUST use lean referential anchoring (`The exact same person from [IMAGE 1], retaining 100% identical authentic facial features, likeness, and natural skin from the reference photo without modification`)."*
- **Impact:** Furthermore, in multi-clip video generation (`05_directors_cut_assembly_spec.md` Section 5.1 & `L-09`), the spec requires injecting a 25–40 word Verbatim Subject Anchor into every clip, even when `video_prompt.txt` starts from a Tier 2 keyframe image seed (`Starting directly from the initial image...`). As proven in Discussion 52 (Simulation 2 failure), over-describing facial bone structure when an image seed is already attached causes facial drift. The specs must clearly separate **Text-Only Genesis (full 25–40 word biometric anchor)** from **Image-Conditioned Prompts (Lean Reference Anchor + wardrobe/silhouette anchor)**.

---

### 3.4 Audio Syntax Split-Brain (`L-06` vs. `L-18`)
- [`04_cinematography_audio_spec.md` (Section 6 & `L-18`)](../../production_framework/specs/04_cinematography_audio_spec.md#L139-L166) and [`05_directors_cut_assembly_spec.md` (`L-18`)](../../production_framework/specs/05_directors_cut_assembly_spec.md#L417) strictly forbid unstructured run-on `Audio:` blocks and require the **Semicolon-Delimited 4-Part Syntax**:
  `Audio: SFX: [Foley]; Ambience: [Room Tone]; Dialogue: [Spoken Attribution | None]; Music: [Score Directive].`
- **However:**
  1. Notice it is named `"3-Track Structured Audio Syntax"` while actually containing **4 semicolon-delimited fields** (`SFX:`, `Ambience:`, `Dialogue:`, `Music:`).
  2. [`04_cinematography_audio_spec.md` Section 5.3 (line 132)](../../production_framework/specs/04_cinematography_audio_spec.md#L132) right above Section 6 still uses the old unstructured format in its "Standard Production Dialogue Template": `Audio: [Tactile Foley], [Ambient Room Tone], [Character close-mic vocal delivery], [Background Music Directive].`
  3. [`01_visual_spec.md`](../../production_framework/specs/01_visual_spec.md#L76), [`03_scenery_spec.md`](../../production_framework/specs/03_scenery_spec.md#L142), [`00_architecture_blueprint.md`](../../production_framework/00_architecture_blueprint.md#L220), [`styles/README.md`](../../production_framework/styles/README.md#L57), and **all 22 clips of `the_314am_doppelganger` and all 8 clips of `software_framework_intro`** use the old unstructured `Audio: ..., zero dialogue.` format—meaning **every single existing simulation in the repo would fail Linter `L-18` today!**

---

### 3.5 Style Plugins (`production_framework/styles/`) Contain Structural Bugs & Linter Violations
Auditing the 8 files in [`production_framework/styles/`](../../production_framework/styles/) against [`styles/README.md`](../../production_framework/styles/README.md) and the pre-flight linters revealed:

1. **[`vector_stick_figure.md`](../../production_framework/styles/vector_stick_figure.md) is incomplete (Only 5 sections instead of 7):**
   - [`styles/README.md` (line 39)](../../production_framework/styles/README.md#L39) states that `vector_stick_figure.md` embeds 4 dialects: `minimalist_noir`, `kurzgesagt_infographic`, `action_smear_xiao_xiao`, and `anatomical_stick_with_hands`. **None of these 4 dialects exist in `vector_stick_figure.md`!** (They were left in `discussions/_raw/50_medium_vs_dialect_inheritance_model_for_styles.md` and never copied into the plugin file).
   - It is also completely missing **Section 6: Native Audio Foley Soundboard**.
2. **[`social_ugc_video.md`](../../production_framework/styles/social_ugc_video.md) has section numbering drift (6 sections instead of 7) and violates `L-04`:**
   - Its Audio Foley section is Section 5 and its Negative Prompt is Section 6, breaking [`styles/README.md` (lines 56–57)](../../production_framework/styles/README.md#L56-L57) which points the compiler to `Section 6` for Audio and `Section 7` for Negative Prompts.
   - Its Master Style Anchor String ([line 10](../../production_framework/styles/social_ugc_video.md#L10)) and all 4 dialects inject `"Vertical 9:16 smartphone video, shot on modern smartphone 4K mobile sensor"`. Injecting `9:16` and `4K` into the text prompt directly violates **Linter `L-04` (Decoupled Configuration)**.
3. **Other Style Plugins Inject Forbidden Tokens (`L-03`/`L-04`/`L-14`/`L-17`):**
   - [`live_action_cinema.md` (line 29, `nolan_70mm_imax`)](../../production_framework/styles/live_action_cinema.md#L29): Uses `"Majestic forward helicopter/drone glide emulation"` — contains the banned hardware noun `drone` (**violates `L-03`/`L-07`/`L-11`**).
   - [`vintage_retro_film.md` (line 29, `vhs_camcorder_tape`)](../../production_framework/styles/vintage_retro_film.md#L29): Injects `"green glowing digital on-screen timestamp in bottom corner [OCT 24 1987], nostalgic 4:3 CRT format"` — contains `[OCT 24 1987]` (square brackets **violate `L-14`**, on-screen text **violates `L-17`**) and `4:3` (**violates `L-04`**).
   - [`stylized_3d_cgi.md` (line 39, `retro_ps1_lowpoly`)](../../production_framework/styles/stylized_3d_cgi.md#L39): Injects `"crunchy 320x240 render resolution"` (**violates `L-04`**).
   - [`traditional_2d_anime.md` (line 10)](../../production_framework/styles/traditional_2d_anime.md#L10): Injects `"24fps"` (**violates `L-04`** if `24fps` is regex-blocked; should be phrased `"stepped animation cadence on twos"`).

---

### 3.6 Duration & Word-Budget Contradictions Inside `05_directors_cut_assembly_spec.md`
Within [`05_directors_cut_assembly_spec.md`](../../production_framework/specs/05_directors_cut_assembly_spec.md) itself:
1. **Section 2.1 vs. Section 3.2 Word Limit Contradiction:**
   - [Section 2.1 ("Google Flow Native Duration Standard", lines 29–35)](../../production_framework/specs/05_directors_cut_assembly_spec.md#L29-L35) lists Recommended Word Limits as: **4s = 6–8w, 6s = 10–12w, 8s = 14–16w, 10s = 18–20w**.
   - [Section 3.2 ("Pathway A: Native In-Video Audio", lines 88–94)](../../production_framework/specs/05_directors_cut_assembly_spec.md#L88-L94) states that Native Flow In-Video Audio actually speaks at 1.2–1.5 WPS and limits words to: **4s = 3–5w (max 6), 6s = 7–9w (max 10), 8s = 11–13w (max 14), 10s = 15–18w (max 19)**.
   - Section 2.1's table is leftover from before the Discussion 52 Veo speech velocity discovery and will cause native Veo dialogue clipping if used!
2. **Section 4.4 ("The 4-Beat Visual Rhythm Loop") Violates Flow Native Durations:**
   - [Section 4.4 (lines 140–160)](../../production_framework/specs/05_directors_cut_assembly_spec.md#L140-L160) specifies clip durations of `Beat 1: 3–5s`, `Beat 2: 2–3s`, `Beat 3: 2–4s`, `Beat 4: 1–2s`.
   - Yet [Section 2.1 (line 27)](../../production_framework/specs/05_directors_cut_assembly_spec.md#L27) strictly bans `1s, 2s, 3s, 5s` because Google Flow only supports `[4s, 6s, 8s, 10s]`. Section 4.4 needs to clarify that in Flow Native mode, these beats map to `4s` and `6s` generation blocks (and are micro-trimmed to `1–3s` in the NLE timeline if desired, or used as sub-beats in `monolithic` mode).
3. **Section 6 Diagram Still Lists `5s`:**
   - [Line 302](../../production_framework/specs/05_directors_cut_assembly_spec.md#L302) reads `Sliced Veo Video Clips (5s/8s/10s)` instead of `(4s/6s/8s/10s)`.

---

### 3.7 The Over-The-Shoulder (OTS) Ban Was Not Propagated
- [`05_directors_cut_assembly_spec.md` Section 5.7 (lines 263–287)](../../production_framework/specs/05_directors_cut_assembly_spec.md#L263-L287) bans Over-The-Shoulder (OTS) shots (`"Ban dirty OTS shots"`) due to the "Melting Shoulder" and identity-bleed glitches, mandating Clean Singles with 15° eyelines.
- Yet [`04_cinematography_audio_spec.md` Section 2.1 (line 32)](../../production_framework/specs/04_cinematography_audio_spec.md#L32) still lists `OTS | Over-the-Shoulder | Foreground shoulder/head framing secondary subject | Conversational geography` without any warning, and [`00_architecture_blueprint.md` (line 121)](../../production_framework/00_architecture_blueprint.md#L121) still lists `over-the-shoulder` as a core narrative cinema kinematic!

---

## 4. What Needs to Be Updated (Outdated Files & Missing Links)

### 4.1 `research/synthesis/` (Tier 1 Active Knowledge) Contains Phase 1–4 Anti-Patterns
Because [`research/structure.md`](../../research/structure.md) instructs agents to load [`research/synthesis/`](../../research/synthesis/) on demand as "Tier 1: Active Knowledge", any outdated rule in `research/synthesis/` will poison agent reasoning during compilation:

1. **[`research/synthesis/07_structured_prompting.md`](../../research/synthesis/07_structured_prompting.md):**
   - **Lines 122 & 164:** The reference Python compiler `compile_veo_prompt()` explicitly appends `" 16:9, 1080p, 24fps, {shot['duration_seconds']}s."` to the prompt string (violating the Decoupling Rule).
   - **Line 38:** Schema restricts `"duration_seconds"` to `[4, 6, 8]` (missing `10`).
   - **Lines 159–161:** Compiler outputs old unstructured `Audio:` string.
   - **Lines 178–183:** Defines an outdated `L-01`–`L-06` table that conflicts with the specs.
2. **[`research/synthesis/03_prompt_techniques.md`](../../research/synthesis/03_prompt_techniques.md):**
   - **Lines 3–20:** Recommends `[00:00-00:03]` timestamp prompting inside 8-second Veo 3.1 clips (which was later explicitly banned in Phase 5.3 because Veo lacks an internal clock and renders timestamps as text watermarks or blends actions).
   - **Lines 18, 88, 94, 95, 98:** Recommends `locked tripod`, `Crane / Jib Arc`, `Steadicam Follow`, and `FPV Drone` (all banned equipment nouns).
3. **[`research/synthesis/04_character_and_consistency.md`](../../research/synthesis/04_character_and_consistency.md):**
   - **Line 30 & 53:** Specifies a "3-Angle Turnaround (Frontal, Three-Quarter, Profile)" instead of the locked **4-Panel Turnaround on `#E5E5E5`** (Front, 90° Side, Back, Close-up Headshot).
   - **Line 88:** Uses `locked tripod` in `SH_02`.
4. **[`research/synthesis/05_multi_clip_and_storyboard.md`](../../research/synthesis/05_multi_clip_and_storyboard.md):**
   - **Line 39:** Recommends `Shot 2 (5s)` (non-Flow duration).
   - **Lines 100 & 102:** Prompts `"Steadicam follow behind him"`.
   - **Line 136:** Appends `"16:9, 1080p, 24fps, 8s."` inside `"compiled_veo_prompt"`.
5. **[`research/synthesis/06_audio_and_dialogue.md`](../../research/synthesis/06_audio_and_dialogue.md):**
   - **Lines 63–81:** Recommends Over-the-Shoulder (`Over-the-shoulder medium close-up shot looking past Sarah's shoulder...`) for two-speaker dialogue instead of Clean Singles, lacks Anti-Muppet biomechanical mouth restraint keywords, and appends `"16:9, 1080p, 24fps, 6s."`.
6. **[`research/synthesis/09_prompt_examples.md`](../../research/synthesis/09_prompt_examples.md):**
   - **All 9 benchmark prompts** end with `Aspect ratio: 16:9, Resolution: 1080p, Frame rate: 24fps, Duration: Xs.` (violating `L-04`).
   - **Prompts 2 & 7 (Shot 01)** use `locked on tripod` (violating `L-03`/`L-07`/`L-11`).
   - **Prompts 1, 2, 6, & 7 (Shot 03)** contain spoken dialogue without any biomechanical jaw/lip restraint keywords.
7. **[`research/synthesis/01_api_and_models.md`](../../research/synthesis/01_api_and_models.md) & [`research/validation.md`](../../research/validation.md):**
   - List supported durations as `4, 6, 8 seconds` (missing `10s`).

### 4.2 [`01_visual_spec.md`](../../production_framework/specs/01_visual_spec.md) Is Disconnected from [`production_framework/styles/`](../../production_framework/styles/)
- `01_visual_spec.md` Section 4 lists "The 8 Master Style Paradigms", where Paradigm 1 is `Ultra-Realistic 35mm Film` and Paradigm 2 is `Ultra-Realistic Digital Cinema` (Arri Alexa 65), and **`vector_stick_figure` is completely missing**.
- Meanwhile, `production_framework/styles/README.md` defines the 8 Universal Base Mediums by merging Live-Action Cinema (`live_action_cinema.md`) and adding `vector_stick_figure.md`.
- `01_visual_spec.md` does not link to `production_framework/styles/` or mention the 3-Tier Medium vs. Dialect inheritance model!

### 4.3 Outdated Status Headers & Minor Typos
- **[`AGENTS.md` (Line 324)](../../AGENTS.md#L324):** Section 6 header still reads `## 6. Current Agenda (Phase 6: Director's Cut & Assembly Engine — UNDER DEVELOPMENT)` with old remediation notes from Discussion 38, even though Phase 6 is marked `✅ FINALIZED & VALIDATED` in the roadmap table (Line 33) and Line 470.
- **[`discussions/sceneries.md` (Line 3)](../../discussions/sceneries.md#L3):** Status still says `🟡 IN PROGRESS (Drafting Phase 5.3 Specification)`.
- **[`discussions/cinematography_audio.md` (Line 3)](../../discussions/cinematography_audio.md#L3):** Status still says `🟡 IN PROGRESS (Phase 5.4 Active Working Document)` and Line 18 says `Pillar 2: Native Audio & Spoken Dialogue (Pending)`.
- **[`discussions/directors_cut_and_assembly.md` (Line 3)](../../discussions/directors_cut_and_assembly.md#L3):** Status still says `🟡 UNDER DEVELOPMENT (Active Phase 6 Working Document)` and lines 36–37 still list `3–4s` and `5s` tempo archetypes.
- **[`discussions/visual_and_style.md` (Line 68)](../../discussions/visual_and_style.md#L68):** Says *"no sub-style files or modifications created at present"*, which was superseded when `production_framework/styles/` was populated in Discussion 50+.
- **[`02_character_spec.md` (Lines 196 & 199)](../../production_framework/specs/02_character_spec.md#L196-L199):** Section 6 has two items numbered `4.` ("4. The Detachable Prop Hallucination Guard" and "4. Dialogue Syntax Formula").

---

## 5. What Is Useless / Redundant (Bloat to Archive or Purge)

Per `AGENTS.md` Section 1 (*"Guiding Philosophy: Lean & Creator-Centric. Do not over-complicate the production system with bureaucratic abstractions"*), the following files and concepts are redundant or actively harmful:

### 5.1 Root-Level Staging Relics: `MIGRATION_PROPOSAL.md` & `PDFCrossCheck.md`
- **Location:** `MIGRATION_PROPOSAL.md` and `PDFCrossCheck.md` at the repository root (since archived/removed during Phase 1 cleanup).
- **Why They Are Redundant/Harmful:**
  - These were intermediate analysis documents created before Discussion 45 & 54.
  - Their accepted ideas (Pluggable Styles, Lean Causal Palette, 4-Beat Rhythm, Match-Cut Handoffs, 3-Track Audio) have **already been integrated into the specs**.
  - Worse, they contain **rejected proposals** that violate current specs—such as the 4 rigid Mad-Libs Hook Archetypes (`"Have you ever felt like [pain point]?"`, explicitly banned by `05_directors_cut_assembly_spec.md` Section 2.7!), channel banners/thumbnails (excluded from scope in Discussion 45), `style_manifest.json`, and `06_script_and_narrative_spec.md`.
- **Action:** Move both to `discussions/_raw/` (or delete them) so root stays clean (`AGENTS.md` only).

### 5.2 Scattered Legacy Simulation Folders Inside `production_framework/`
Currently, `production_framework/` is polluted with **5 top-level test project folders** alongside `specs/` and `styles/`, plus 1 inside `simulations/`:

| Folder Path | Status & Format | Recommendation |
|---|---|---|
| [`production_framework/simulations/directors_cut/`](../../production_framework/simulations/directors_cut/) | Old V2 simulation (*The 2:17 AM Dispatch*). Uses deprecated `individual_clips/clip_XX.txt`, single `master_flow_agent_prompt.txt`, and `5s`/`7s` durations. | **Archive or Delete.** Superseded by 3-Tier Image-First pipeline and Flow `[4s, 6s, 8s, 10s]` durations. |
| [`production_framework/simulations/stick_figure_horror/`](../../production_framework/simulations/stick_figure_horror/) | Old simulation (*The Uncanny Reflection*). Uses deprecated `individual_clips/clip_XX.txt` and `5s`/`7s` durations. | **Archive or Delete.** Superseded by *The 3:14 AM Doppelgänger*. |
| [`production_framework/simulations/rat_race_stick_figure/`](../../production_framework/simulations/rat_race_stick_figure/) | Early 2-clip test (*9-5 Rat Race*). Uses old `clip_01/` at root (instead of `clips/clip_01/`) and single `master_flow_agent_prompt.txt`. | **Archive or Delete.** |
| [`production_framework/simulations/the_phone_call_at_247am/`](../../production_framework/simulations/the_phone_call_at_247am/) | Mid-evolution test. Has duplicate `base_image_prompt.txt` and `image_prompt.txt` at root, plus deprecated `master_flow_agent_prompt.txt`. | **Move to `simulations/` (or Archive).** |
| [`production_framework/simulations/the_314am_doppelganger/`](../../production_framework/simulations/the_314am_doppelganger/) | ✅ **Gold-Standard Validated Production** (22 clips, `audio.srt`, `master_images_prompt.txt`, `master_videos_prompt.txt`). Currently sitting directly in `production_framework/`. | **Move to `production_framework/simulations/the_314am_doppelganger/`** (and update its `Audio:` lines to pass `L-18`). |
| [`production_framework/simulations/software_framework_intro/`](../../production_framework/simulations/software_framework_intro/) | ❌ **Marked Failed** in Discussion 52 (native Veo word budget overflow + face over-description + jump-cuts). | **Keep in `simulations/` as a negative test case** OR update its word counts & lean face anchors to validate the fix. |

### 5.3 Bureaucratic JSON Middlemen in `00_tasks.md` & `00_architecture_blueprint.md`
- Look at [`00_tasks.md` Milestone 1](../../production_framework/00_tasks.md#L10-L16) and [`00_architecture_blueprint.md` Section 5](../../production_framework/00_architecture_blueprint.md#L161-L172):
  - They propose 6 JSON schemas (`project_intent.schema.json`, `visual.schema.json`, `subject.schema.json`, `environment.schema.json`, `shot.schema.json`, `template_manifest.schema.json`) plus `structure/sequence_manifest.json`, `structure/dialogue_bible.json`, `shots/shot_list.json`, and `shots/<shot_id>/shot_config.json`.
- **Why This Is Useless Bureaucracy:**
  - Throughout Phase 5 and Phase 6, every specification (`01` through `05`) was built around **clean Markdown and `.txt` files** (`project_intent.md`, `blueprint.md`, `scratchbook.md`, `narrator_script.md`, `origin_manifest.md`, `base_image_prompt.txt`, `clips/clip_XX/image_prompt.txt`, `clips/clip_XX/video_prompt.txt`, `master_images_prompt.txt`, `master_videos_prompt.txt`).
  - Forcing the AI agent to write and maintain parallel `.json` files alongside `.md` and `.txt` files doubles token consumption and violates the "Lean & Creator-Centric" rule!
  - **What we actually need:** Lightweight Python parsers/compilers/linters that validate and assemble the **Markdown + `.txt` + `.srt` files directly**, without redundant JSON middlemen!

---

## 6. What Can Be Improved (Recommendations for the Compile Step)

### 6.1 Unify the Project Directory Contract (`production_template/`)
Merge the best of Phase 5 (domain folders for reusable visual/subject/environment assets) and Phase 6 (the battle-tested 3-Tier Image-First `clips/` and dual master prompt outputs) into **one unified, lean directory contract**:

```text
<project_root>/
├── project_intent.md                 # LOCKED: Archetype, Platform, Style ID, Pathway, Scope Guardrails
├── blueprint.md                      # LIVING: Step-by-step Creator <-> Agent alignment log
│
├── visual/                           # Domain 1: Visual DNA (Links to styles/<medium_id>.md + overrides)
│   ├── style_summary.md
│   ├── palette_and_mood.md
│   └── technical_anchor.md
│
├── subjects/                         # Domain 2: Universal Subjects (Characters, Products, Vehicles)
│   └── <subject_id>/
│       ├── profile.md
│       ├── verbatim_anchor.txt       # 25-40w Anchor (Text-to-Image/Video) OR Lean Reference Anchor ([IMAGE 1])
│       ├── hero_prompt.txt
│       ├── turnaround_prompt.txt
│       ├── rules.md
│       └── references/               # hero_portrait.png, turnaround_sheet.png (Ingredient #1)
│
├── environments/                     # Domain 3: World Locations & Studio Stages
│   └── <location_id>/
│       ├── summary.md
│       ├── spatial_layers.md         # 3-Plane Parallax (Foreground, Midground, Background)
│       ├── lighting_rig.md
│       ├── acoustics.md
│       ├── master_anchor.txt
│       ├── reference_prompt.txt
│       └── references/               # empty_stage.png (Ingredient #2)
│
└── production/                       # Domain 4 & 5: Director's Cut, Slicing & Compiled Deliverables
    ├── scratchbook.md                # Director's Pacing Ledger (Beats, Words, Durations, Chaining, 30° rule)
    ├── narrator_script.md            # (Pathway B) Gemini TTS (< > tags on standalone lines) / Voice Script
    ├── dialogue_scripts.md           # (Optional) Character dubbing cue sheet
    ├── audio.srt                     # (Pathway B) Recorded audio timestamps driving exact clip slicing
    ├── audio_stems.md                # (Optional) 4-Track NLE stem assembly manifest (A1-A4)
    ├── origin_manifest.md            # Asset lineage & linter verification ledger
    ├── base_image_prompt.txt         # [Tier 1] Master Style & Subject Reference Plate prompt
    ├── master_images_prompt.txt      # Consolidated copy-paste manifest for ALL Image prompts (Tier 1 + Tier 2)
    ├── master_videos_prompt.txt      # Consolidated copy-paste manifest for ALL Video prompts (Tier 3 Veo)
    └── clips/                        # Isolated per-clip packages for manual/timeline mode
        └── clip_01/
            ├── image_prompt.txt      # [Tier 2] Starting Keyframe Plate prompt
            └── video_prompt.txt      # [Tier 3] Config Header + 100-150w Veo Motion & 3-Track Audio prompt
```
*(Note: For simple single-narrator stick-figure or fast commercial productions where multi-subject/environment folders aren't needed, `visual/`, `subjects/`, and `environments/` can remain optional or lightweight, keeping the workflow friction-free.)*

### 6.2 Consolidate All Linters into One Numbered Master Table (`L-01` to `L-18`)
Eliminate all duplicate and colliding linter codes across `00_architecture_blueprint.md`, `03_scenery_spec.md`, `04_cinematography_audio_spec.md`, `05_directors_cut_assembly_spec.md`, and `07_structured_prompting.md`. Establish **one authoritative 18-rule Linter Registry** categorized by target scope:

- **Scope A — Universal Prompt Purity (Image & Video Prompts):**
  - `L-01` **Video Word Economy:** Video prompt body strictly 100–150 words (Image prompts uncapped/exempt).
  - `L-02` **Attention Front-Loading:** Viewport framing and primary subject appear within Tokens 1–30.
  - `L-03` **Equipment Noun Ban:** Zero hardware nouns (`tripod`, `dolly`, `crane`, `jib`, `rig`, `drone`, `gimbal`, `steadicam`, `slider`, `camera body`).
  - `L-04` **Config Decoupling:** Zero technical specs (`16:9`, `9:16`, `4:3`, `1080p`, `720p`, `4K`, `24fps`, `60fps`, `8s`) inside creative prompt prose.
  - `L-05` **Anti-Subtitle & Non-Render Guardrail:** Any narrative context header uses `(REFERENCE ONLY — DO NOT RENDER...)` and negative prompt includes anti-subtitle tokens (`subtitles, closed captions, burned-in text, lower thirds, watermark`).
- **Scope B — Subject, Prop & Environment Integrity:**
  - `L-06` **Subject DNA vs. Lean Reference Anchor:** Text-conditioned clips inject verbatim `verbatim_anchor.txt` (zero bare pronouns); `[IMAGE 1]`-conditioned prompts use Lean Reference Anchoring (zero competing bone-structure paragraphs) + `1:7.5` anatomical ratio lock.
  - `L-07` **Pre-Materialized Prop & Closed-Set Bounding:** Held props declared grasped from Frame 1 to Frame End (no mid-clip drawing); complex prop scenes declare `Permitted Props: [...]`.
  - `L-08` **Empty Stage & 3-Plane Environment:** Environment reference plates (`Ingredient #2`) contain zero people/hero products; scene prompts establish Foreground, Midground, and Background planes with motivated light.
- **Scope C — Temporal Slicing, Kinematics & Continuity (Video Prompts):**
  - `L-09` **Flow Native Duration Lock:** Clip durations in Flow Native mode must be strictly in `{4s, 6s, 8s, 10s}`.
  - `L-10` **Single-Motion & Micro-Beat De-Cramming:** Strictly 1 primary biomechanical action, 1 spatial plane, and 1 continuous camera trajectory per clip (no timestamps `[00:00-00:03]` in atomic Veo clips).
  - `L-11` **Continuity Chaining Syntax:** Mode 1 extensions declare `last_frame` seed and begin with `"Continuing directly from the initial frame..."`; Tier 3 I2V prompts begin with `"Starting directly from the initial image..."`.
  - `L-12` **30° Cinematic Contrast & Anti-Jump-Cut:** Consecutive cuts of the same subject must shift angle by $\ge 30^\circ$, change shot scale, or chain via `last_frame`.
  - `L-13` **180° Screen Direction & Clean Singles:** Conversational cuts preserve complementary screen direction/eyelines and use Clean Singles (zero dirty OTS shots).
- **Scope D — Audio, Dialogue & TTS Scripting:**
  - `L-14` **Dual-Track Speech Word Budget:** Native Flow (`Pathway A`) $\le \{5, 9, 13, 18\}$ words for $\{4\text{s}, 6\text{s}, 8\text{s}, 10\text{s}\}$; External TTS (`Pathway B`) $\le \{8, 12, 18, 22\}$ words, with $\ge 1.0\text{s}$ silence buffer.
  - `L-15` **Anti-Muppet Biomechanical Restraint & Sentence Case:** On-screen spoken dialogue uses preceding colon (`says, [modifier]: "..."`), strict sentence case (no ALL CAPS words), and $\ge 2$ jaw/lip restraint tokens (`relaxed jaw`, `minimal jaw displacement`, `subtle lip articulation`).
  - `L-16` **Closed-Lip Listener Rule:** Off-screen/phone/narrator speech while a face is visible mandates `firmly closed lips, zero mouth movement` on the visible subject.
  - `L-17` **Structured Audio Syntax & Music Protection:** Trailing `Audio:` block follows semicolon-delimited `Audio: SFX: ...; Ambience: ...; Dialogue: ...; Music: ...` (or clean diegetic terminator) and bans heavy drums over dialogue.
  - `L-18` **Gemini TTS Script Formatting & Authored Voice Preservation:** `narrator_script.md` uses `< >` tags on standalone lines (`.\n<long pause>\n`), zero `[...]` brackets, zero consecutive `<long pause>` dead air, and never rewrites a creator-supplied script into 2nd person (`Non-Imposition Law`).

### 6.3 High-Impact Python Tooling to Build in Phase 8
Instead of building bureaucratic JSON-to-JSON converters, our Python toolkit in `pipeline/` should directly accelerate the creator's 10–15 minute production loop:
1. **`srt_slicer.py` (SRT $\rightarrow$ Scratchbook & Clip Budgeter):**
   - Reads `audio.srt` (or `narrator_script.md`), computes exact cue durations and word velocities, and automatically proposes a mathematical `scratchbook.md` slicing timeline into `[4s, 6s, 8s, 10s]` Flow-native blocks aligned to sentence boundaries.
2. **`compile_production.py` (Individual Clips $\leftrightarrow$ Master Prompts Compiler):**
   - Compiles `base_image_prompt.txt` and `clips/clip_XX/image_prompt.txt` into `master_images_prompt.txt`, and `clips/clip_XX/video_prompt.txt` into `master_videos_prompt.txt` (or splits edited master files back into individual clip folders) so the creator never has to manually sync 22 clip folders with the master copy-paste manifests.
3. **`lint_production.py` (Automated 18-Point Pre-Flight Linter):**
   - Scans `narrator_script.md`, `master_images_prompt.txt`, `master_videos_prompt.txt`, and `clips/clip_XX/*.txt` against the unified `L-01`–`L-18` rules and outputs a clean pass/fail terminal report and `origin_manifest.md` status.
4. **`manage_template.py` (OpenSpec Template Hydration):**
   - Implements `template list`, `template save <id>`, and `template load <id>` to scaffold new projects in 1 second.

---

## 7. Actionable Next-Step Checklist (Before Writing Compiler Code)

If you agree with this audit, here is the exact sequence we should execute to transition cleanly into the compile step:

- [ ] **Step 1 (Archive & Clean Clutter):** Move root `MIGRATION_PROPOSAL.md` and `PDFCrossCheck.md` into `discussions/_raw/`, and move/consolidate top-level test folders (`directors_cut/`, `stick_figure_horror/`, `rat_race_stick_figure/`, `the_phone_call_at_247am/`, `the_314am_doppelganger/`) into `production_framework/simulations/`.
- [ ] **Step 2 (Harmonize Specifications `01`–`05` & `00_architecture_blueprint.md`):**
  - Fix the Linter ID collisions into the single unified `L-01`–`L-18` registry.
  - Reconcile the project directory contract across `00_architecture_blueprint.md`, `00_tasks.md`, `02_character_spec.md`, `03_scenery_spec.md`, and `05_directors_cut_assembly_spec.md`.
  - Fix `02_character_spec.md` Scenario 1 (remove contradiction between Rules 1–3 and Rule 9).
  - Fix `05_directors_cut_assembly_spec.md` Section 2.1 table (Pathway A vs B word limits), Section 4.4 (4-Beat durations vs Flow `[4s, 6s, 8s, 10s]`), Section 6 (`5s` typo), and Section 7.1 (deprecated `individual_clips/`).
  - Link `01_visual_spec.md` to `production_framework/styles/` and add `vector_stick_figure` to its table.
- [ ] **Step 3 (Fix Style Plugins in `production_framework/styles/`):**
  - Add the missing 4 dialects (`minimalist_noir`, `kurzgesagt_infographic`, `action_smear_xiao_xiao`, `anatomical_stick_with_hands`) and Section 6 Audio Foley Soundboard to `vector_stick_figure.md`.
  - Fix section numbering in `social_ugc_video.md` and purge linter-violating tokens (`9:16`, `4K`, `4:3`, `320x240`, `24fps`, `[OCT 24 1987]`, `drone`) from all style plugins, updating their Section 6 audio examples to the `L-18` semicolon syntax.
- [ ] **Step 4 (Sanitize `research/synthesis/` Active Knowledge):**
  - Strip `"16:9, 1080p, 24fps, 8s"`, `tripod`, `Steadicam`, `OTS`, and 8s `[00:00-00:03]` timestamps from `03`, `04`, `05`, `06`, `07`, `09`, and `10` so Tier 1 active research aligns 100% with Phase 5–6 laws.
- [ ] **Step 5 (Build Phase 7 Scaffolding & Phase 8 Compiler/Linters):**
  - Create `production_template/` and build the Python compilation, SRT slicing, and linting suite (`pipeline/`).
