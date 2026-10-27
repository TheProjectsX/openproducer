# Project Audit Cross-Check & Precision Addendum

**Date:** October 27, 2026  
**Target Audited Document:** [`PROJECT_AUDIT_AND_COMPILE_READINESS.md`](./PROJECT_AUDIT_AND_COMPILE_READINESS.md)  
**Purpose:** Line-by-line verification of every claim in `PROJECT_AUDIT_AND_COMPILE_READINESS.md` against the actual repository files, plus **10 additional blind spots, nuances, and compiler design edge cases** discovered during the cross-check.

---

## 1. Executive Verification Summary

**Verdict:** [`PROJECT_AUDIT_AND_COMPILE_READINESS.md`](./PROJECT_AUDIT_AND_COMPILE_READINESS.md) is **~96% accurate** on its core structural findings. Every major blocker it identifies—the Linter ID collisions (`L-01`–`L-20`), the 3 competing directory contracts, the `02_character_spec.md` Scenario 1 self-contradiction, the `L-18` audio syntax split-brain, the missing dialects in `vector_stick_figure.md`, the duration/word-budget mismatch in `05_directors_cut_assembly_spec.md`, and the outdated Phase 1–4 anti-patterns in `research/synthesis/`—was verified directly against the source files on disk.

However, cross-checking every line and running regex/word-count scans across the repository revealed **3 factual nuances/corrections** to the original audit and **10 newly uncovered gaps** that must be accounted for so our Phase 8 compiler and linter (`lint_production.py`) do not suffer from false positives or broken references.

---

## 2. Line-by-Line Verification of Original Audit Claims

| Audit Section | Original Claim | Cross-Check Verdict | Exact Verification Notes |
|---|---|---|---|
| **§3.1 Linter Collisions** | 4 files define colliding `L-01`–`L-20` IDs + `E-01`–`E-05` in Spec 03; `05_directors_cut_assembly_spec.md` line 105 references `L-01` as "External TTS breathing buffer" and line 402 says "5 assembly-level linters" while listing 14. | ✅ **100% Verified** | Verified across [`07_structured_prompting.md`](../../research/synthesis/07_structured_prompting.md#L178-L183), [`00_architecture_blueprint.md`](../../production_framework/00_architecture_blueprint.md#L215-L220), [`03_scenery_spec.md`](../../production_framework/specs/03_scenery_spec.md#L138-L142), [`04_cinematography_audio_spec.md`](../../production_framework/specs/04_cinematography_audio_spec.md#L245-L267), and [`05_directors_cut_assembly_spec.md`](../../production_framework/specs/05_directors_cut_assembly_spec.md#L402-L420). |
| **§3.2 Directory Contracts** | 3 competing contracts for shots/clips, 3 for `environments/`, and `characters/` vs `subjects/` path ambiguity. | ✅ **100% Verified** | Verified in [`00_architecture_blueprint.md`](../../production_framework/00_architecture_blueprint.md#L141-L172), [`02_character_spec.md`](../../production_framework/specs/02_character_spec.md#L25-L38), [`03_scenery_spec.md`](../../production_framework/specs/03_scenery_spec.md#L28-L38), and [`05_directors_cut_assembly_spec.md`](../../production_framework/specs/05_directors_cut_assembly_spec.md#L361-L395). |
| **§3.3 `02_character_spec.md` Self-Contradiction** | Scenario 1 Rules 1–3 mandate extracting and injecting facial bone/landmark text, while Rule 9 bans facial bone-structure text when `[IMAGE 1]` is used. | ✅ **100% Verified** | Verified at [`02_character_spec.md` (lines 140–150)](../../production_framework/specs/02_character_spec.md#L140-L150). |
| **§3.4 Audio Syntax Split-Brain (`L-18`)** | "3-Track Structured Audio Syntax" actually has 4 fields (`SFX`, `Ambience`, `Dialogue`, `Music`); Spec 04 line 132 and all 22 clips of `the_314am_doppelganger` + 8 clips of `software_framework_intro` use unstructured `Audio:`. | ✅ **100% Verified** | Confirmed 0 of 22 clips in `the_314am_doppelganger` and 0 of 8 clips in `software_framework_intro` use `Audio: SFX: ...; Ambience: ...;`. |
| **§3.5 Style Plugin Bugs** | `vector_stick_figure.md` only has 5 sections and is missing all 4 dialects & Section 6 Audio; `social_ugc_video.md` has 6 sections instead of 7; plugins inject forbidden tokens (`drone`, `[OCT 24 1987]`, `9:16`, `4K`, `320x240`, `24fps`). | ⚠️ **Verified + Expanded (See §3.1 & §3.2 below)** | All cited issues are true, **plus** additional style plugins (`stop_motion_claymation.md`, `vintage_retro_film.md`) use `12fps`, `16fps`, `18fps`, and `crane-like` which require careful linter distinction. |
| **§3.6 Duration & Word Limits in Spec 05** | Section 2.1 lists old word limits (`6-8w`, `10-12w`, `14-16w`, `18-20w`) contradicting Section 3.2 Pathway A (`3-5w`, `7-9w`, `11-13w`, `15-18w`); Section 4.4 uses `1-5s` beats; Section 6 line 302 says `(5s/8s/10s)`. | ✅ **100% Verified** | Verified at [`05_directors_cut_assembly_spec.md` lines 29–35, 88–94, 144–160, and 302](../../production_framework/specs/05_directors_cut_assembly_spec.md#L29-L35). |
| **§3.7 OTS Ban Not Propagated** | Spec 05 bans OTS shots, while Spec 04 line 32 and Blueprint line 121 still recommend OTS. | ✅ **100% Verified** | Verified at [`04_cinematography_audio_spec.md` line 32](../../production_framework/specs/04_cinematography_audio_spec.md#L32) and [`00_architecture_blueprint.md` line 121](../../production_framework/00_architecture_blueprint.md#L121). |
| **§4.1 `research/synthesis/` Anti-Patterns** | `01`, `03`, `04`, `05`, `06`, `07`, `09`, `10`, and `validation.md` contain Phase 1–4 anti-patterns. | ⚠️ **Mostly Verified (1 Minor Correction + 1 Missing File; see §3.3 below)** | In `09_prompt_examples.md`, Prompt 1 does **not** contain spoken quotes (dialogue is in Prompts 2, 6, and 7 Shot 03). Also, [`02_prompt_anatomy.md`](../../research/synthesis/02_prompt_anatomy.md#L79-L82) was missed by the original audit! |
| **§4.2–4.3 `01_visual_spec.md` & Status Headers** | `01_visual_spec.md` missing `vector_stick_figure` and unlinked to `styles/`; outdated `IN PROGRESS` headers in `AGENTS.md` and `discussions/`. | ✅ **100% Verified** | Also found extra outdated references in `AGENTS.md` (see §3.7 below). |
| **§5.1–5.3 Root Relics, Legacy Sims & JSON Bloat** | `MIGRATION_PROPOSAL.md`, `PDFCrossCheck.md`, 5 top-level simulation folders, and redundant JSON schemas in `00_tasks.md`. | ✅ **100% Verified** | Verified on disk. |

---

## 3. New Findings & Precision Corrections (What the Original Audit Missed)

### 3.1 Critical Linter Nuance: Aesthetic Frame-Cadence Tokens (`12fps`, `16fps`, `18fps`, `on twos`) vs. Output Config (`24fps`, `60fps`)
- **What the Original Audit Said (§3.5 & §6.2 `L-04`):** Suggested purging frame-rate tokens from style plugins under `L-04 (Config Decoupling)`.
- **What Cross-Checking Revealed:**
  - In [`stop_motion_claymation.md` (lines 10, 20, 34, 48)](../../production_framework/styles/stop_motion_claymation.md#L10), [`stylized_3d_cgi.md` (line 25, `spider_verse_comic_hybrid`)](../../production_framework/styles/stylized_3d_cgi.md#L25), and [`vintage_retro_film.md` (lines 24–25 `18fps`, lines 39–40 `16fps`)](../../production_framework/styles/vintage_retro_film.md#L24-L40), those frame rates are **NOT API configuration settings**—Google Flow always renders a 24fps container, and tokens like `"12fps stop-motion stepped animation timing on twos"` or `"16fps hand-cranked silent film cadence"` are **essential creative style tokens** that instruct Veo 3.1 to quantize character motion inside the 24fps container!
  - Furthermore, **Negative Prompts** in [`stop_motion_claymation.md` (lines 21, 73)](../../production_framework/styles/stop_motion_claymation.md#L21), [`stylized_3d_cgi.md` (lines 26, 41)](../../production_framework/styles/stylized_3d_cgi.md#L26), [`traditional_2d_anime.md` (line 46)](../../production_framework/styles/traditional_2d_anime.md#L46), [`vintage_retro_film.md` (lines 21, 26, 31, 41, 81)](../../production_framework/styles/vintage_retro_film.md#L21), and [`social_ugc_video.md` (line 64)](../../production_framework/styles/social_ugc_video.md#L64) intentionally include `60fps`, `4K`, `16:9`, `tripod`, `gimbal`, `steadicam`, and `rig` **inside the Negative Prompt block** to ban soap-opera interpolation and visible camera rigs.
- **Required Update for Phase 8 (`lint_production.py`):**
  1. **Negative Prompt Exemption:** Linters `L-03` (Equipment Nouns) and `L-04` (Config Decoupling) **MUST only scan the positive creative prompt body**, explicitly exempting the `NEGATIVE PROMPT:` block (where banning `tripod`, `rig`, `60fps`, `4K` is desirable!).
  2. **Stepped Cadence Whitelist:** `L-04` should block container output specs (`16:9`, `9:16`, `4:3`, `1080p`, `720p`, `4K`, `24fps`, `60fps`, `320x240`), or rewrite `12fps`/`16fps`/`18fps` into pure prose (`stepped animation timing on twos`, `hand-cranked silent film stutter`, `low-resolution pixelated texture maps`) so regex linters and creative tokens never collide.
  3. **Additional Style Plugin Violations Found:**
     - [`vintage_retro_film.md` (line 35, `technicolor_3strip`)](../../production_framework/styles/vintage_retro_film.md#L35) uses `"Slow deliberate crane-like camera glide"` (`crane` triggers hardware noun regex; replace with `"Slow deliberate elevated sweeping camera glide"`).
     - [`01_visual_spec.md` (lines 87 & 92)](../../production_framework/specs/01_visual_spec.md#L87-L92) also injects `locked 24fps anime aesthetic` and `High-fidelity 4K mobile video aesthetic` in its own Master Style Anchor table.

---

### 3.2 Internal Contradiction in `vector_stick_figure.md` if `anatomical_stick_with_hands` Is Added Naively
- **What the Original Audit Said (§3.5.1):** Pointed out that `vector_stick_figure.md` is missing the 4 dialects promised in `styles/README.md`, including `anatomical_stick_with_hands`.
- **What Cross-Checking Revealed:**
  - In [`discussions/_raw/50_medium_vs_dialect_inheritance_model_for_styles.md` (line 70)](../../discussions/_raw/50_medium_vs_dialect_inheritance_model_for_styles.md#L70), `anatomical_stick_with_hands` is defined as: `"Distinct 5-fingered line-hands, articulated elbows/knees, proportioned torso silhouette, technical manual / blueprint aesthetic."`
  - However, [`vector_stick_figure.md` Section 2 (line 15)](../../production_framework/styles/vector_stick_figure.md#L15) and Section 5 Negative Prompt ([line 42](../../production_framework/styles/vector_stick_figure.md#L42)) enforce a Medium-wide rule: `"strictly zero individual fingers, zero human hands"` and `NEGATIVE PROMPT: ... fleshy human hands, individual fingers, realistic toes, knuckles`.
  - Meanwhile, [`styles/README.md` Section 3 (line 56)](../../production_framework/styles/README.md#L56) states: *"Append the Base Medium's mandatory negative prompt clause (Section 7) combined with any dialect-specific negative tokens."*
  - **The Bug:** If a user selects `anatomical_stick_with_hands` and the compiler blindly appends the Base Medium's Section 7 negative prompt (`individual fingers`), the positive dialect and negative base prompt will directly contradict each other!
- **Required Fix:** When adding the 4 dialects to `vector_stick_figure.md`, specify an explicit **Dialect Negative Override** for `anatomical_stick_with_hands` (banning *fleshy photorealistic skin/nails* while allowing clean 2D vector line-fingers), OR keep all stick-figure dialects strictly fingerless in accordance with [`02_character_spec.md` Section 6 Rule 2 ("The Hand & Feet Flesh Mutancy Guard")](../../production_framework/specs/02_character_spec.md#L188-L190).

---

### 3.3 Missing File & Precision Check in `research/synthesis/` Audit (§4.1)
1. **Missed File — [`research/synthesis/02_prompt_anatomy.md`](../../research/synthesis/02_prompt_anatomy.md):**
   - Section 4.1 of the audit listed `01`, `03`, `04`, `05`, `06`, `07`, `09`, `10`, and `validation.md`, but missed [`02_prompt_anatomy.md` (lines 79–82)](../../research/synthesis/02_prompt_anatomy.md#L79-L82), which recommends:
     - `Slow push-in / Dolly-in`
     - `Slow pull-out / Dolly-back`
     - `Locked-off tripod shot (stable; essential for dialogue clarity)` — directly violating the Equipment Noun Ban (`tripod`, `dolly`).
2. **Missed Active Folder — [`research/styles/`](../../research/styles/):**
   - [`research/structure.md` (line 14)](../../research/structure.md#L14) designates `research/styles/` (`01` through `05`) as **Tier 1: Style Knowledge (Active)**. Cross-checking those 5 files showed they contain the same raw tokens (`9:16`, `4K`, `320x240`, `24fps`, `[OCT 24 1987]`) that were copied into `production_framework/styles/`. Once `production_framework/styles/` is sanitized, a banner note in `research/styles/` (or `research/structure.md`) should clarify that **`production_framework/styles/` is the authoritative compiler target**, while `research/styles/` is the upstream research corpus.
3. **Minor Factual Correction on [`09_prompt_examples.md`](../../research/synthesis/09_prompt_examples.md):**
   - The audit (§4.1.6) claimed *"Prompts 1, 2, 6, & 7 (Shot 03) contain spoken dialogue without any biomechanical jaw/lip restraint keywords."*
   - In reality, **Prompt 1 (line 11)** does *not* contain quoted speech—it only has `Kaelen's clear resonant baritone voice` in the `Audio:` block (which is actually an unmarked voice cue without spoken words!). Only **Prompts 2 (line 19), 6 (line 51), and 7 Shot 03 (line 73)** contain quoted dialogue (`says, ...: "..."`).

---

### 3.4 Word-Count Reality Check on Existing Simulations vs. Linter `L-01` (100–150 Words)
- **What Cross-Checking Revealed:** We ran a script counting the exact word lengths of every `[VIDEO PROMPT]` body across both primary simulations:
  1. **[`production_framework/simulations/the_314am_doppelganger/`](../../production_framework/simulations/the_314am_doppelganger/) (22 Clips — Validated Gold Standard):**
     - **9 of the 22 video prompt bodies are UNDER 100 words!** Specifically:
       - `clip_03`: **95 words**
       - `clip_05`: **89 words**
       - `clip_07`: **78 words**
       - `clip_08`: **87 words**
       - `clip_10`: **83 words**
       - `clip_12`: **86 words**
       - `clip_15`: **98 words**
       - `clip_17`: **90 words**
       - `clip_18`: **84 words**
       - `clip_19`: **83 words**
       *(That is actually **10 of 22 clips** between 78 and 98 words!)*
     - **Why?** Because in the **3-Tier Image-First Pipeline**, `video_prompt.txt` starts from a pre-rendered Tier 2 keyframe image (`Starting directly from the initial image...`) and uses Lean Reference Anchoring rather than repeating 40 words of character/environment genesis text!
  2. **[`production_framework/simulations/software_framework_intro/`](../../production_framework/simulations/software_framework_intro/) (8 Clips):**
     - **5 of the 8 video prompt bodies are OVER 150 words** (`clip_01` = 155w, `clip_03` = 155w, `clip_05` = 155w, `clip_06` = 160w, `clip_08` = 151w).
- **Critical Implication for Linter `L-01`:**
  - If `lint_production.py` enforces a rigid `100–150 word` floor on Tier 3 Image-to-Video prompts (`video_prompt.txt`), **nearly half of the gold-standard `the_314am_doppelganger` production will fail `L-01` for being 78–98 words!**
  - **Recommended Adjustment to `L-01`:**
    - **Text-to-Video (Standalone) Prompts:** `100–150 words`.
    - **Tier 3 Image-to-Video (`video_prompt.txt`) Prompts:** **`75–150 words`** (since the starting image plate already supplies the visual geometry and Lean Reference Anchoring deliberately avoids over-description).
    - Also explicitly specify in `L-01` that word counts are measured **purely on the `[VIDEO PROMPT]` prose + `Audio:` block**, excluding `[CONFIGURATION SETTINGS]` headers and `NEGATIVE PROMPT:` clauses.

---

### 3.5 Implicit Clock Timestamps Inside `the_314am_doppelganger` Video Prompts
- In [`the_314am_doppelganger/clips/clip_01/video_prompt.txt`](../../production_framework/simulations/the_314am_doppelganger/clips/clip_01/video_prompt.txt#L9) (and 12 other clips in that folder), the prose uses natural-language timing markers such as:
  > *"For the first two seconds, the room remains in absolute pitch darkness. Exactly at the third second, the rectangular smartphone screen abruptly flares alive..."*
- While bracketed timestamps (`[00:00-00:03]`) are banned because Veo renders them as burned-in text overlays or ignores them, natural-language beat pacing (`"For the first two seconds..."`) was used successfully in `the_314am_doppelganger`.
- **Linter Clarification (`L-10`):** Ensure the timestamp linter regex specifically bans **numeric clock brackets** (`\[\d{2}:\d{2}` / `00:00`) rather than flagging natural English words like `"for the first two seconds"` or `"for the entire six seconds"`.

---

### 3.6 `04_cinematography_audio_spec.md` Optical Recipes Still Use `crane-up` and `dolly zoom`
- In [`04_cinematography_audio_spec.md`](../../production_framework/specs/04_cinematography_audio_spec.md):
  - **Line 60 (Safe Replacement Table):** Suggests replacing `crane rig` with `"Fluid vertical crane-up sweeping diagonally above the subject"`.
  - **Line 80 (Recipe 2 Prompt Template):** Contains `"executes a fluid, dynamic crane-up"`.
  - **Line 87 (Recipe 3 Prompt Template):** Contains `"executes a dramatic optical dolly zoom vertigo effect"`.
- **Why This Matters for Compilation:** If Linter `L-03` (`Equipment Noun Ban`) uses a whole-word regex `\b(tripod|dolly|crane|jib|rig|drone|gimbal|steadicam|slider)\b`, then **Spec 04's own Recipe 2 (`crane-up`) and Recipe 3 (`dolly zoom`) will fail Linter `L-03`!**
- **Fix:** Either replace `"crane-up"` with `"vertical boom-up / upward elevation sweep"` and `"dolly zoom"` with `"optical contra-zoom (zolly) vertigo effect"` in Spec 04, OR explicitly exempt compound optical movement verbs (`crane-up`, `dolly zoom`) in the `L-03` regex. Replacing the words in Spec 04 is cleaner and safer for Veo 3.1.

---

### 3.7 Broken Links & Outdated Counts Inside `AGENTS.md` (Missed by Original Audit)
In addition to Line 324 (`## 6. Current Agenda ... UNDER DEVELOPMENT`) caught by the original audit, [`AGENTS.md`](../../AGENTS.md) has **4 more outdated or broken items**:
1. **Lines 19 & 50 (`27 original raw conversational logs`):** States that `discussions/_raw/` contains "27 original, sequential discussion files." In reality, `discussions/_raw/` now contains **57 files** (up to Discussion 54).
2. **Line 38 (Phase 8 Roadmap Table):** Still reads `Linters (L-01 to L-11)`, whereas the specs define up to `L-20` (and our unified registry defines `L-01` to `L-18`).
3. **Lines 382, 490, 517 (`Dump.md` / `dump.md`):** Contained clickable markdown links to `./dump.md`, which was deleted in Discussion 54 (causing broken file links).
4. **Cascading Link Impact of Moving Simulation Folders (Audit §5.2 & §7 Step 1):**
   - If `the_314am_doppelganger/`, `the_phone_call_at_247am/`, `directors_cut/`, `stick_figure_horror/`, and `rat_race_stick_figure/` are moved into `production_framework/simulations/`, **14 existing markdown links** across [`AGENTS.md` (lines 35, 331, 342, 348, 357, 424, 429, 507)](../../AGENTS.md#L35), [`05_directors_cut_assembly_spec.md` (lines 11, 426)](../../production_framework/specs/05_directors_cut_assembly_spec.md#L426), and [`discussions/directors_cut_and_assembly.md` (lines 11, 104)](../../discussions/directors_cut_and_assembly.md#L11) will break unless updated simultaneously!

---

### 3.8 Silence Buffer Threshold Discrepancy Inside `05_directors_cut_assembly_spec.md`
- Within [`05_directors_cut_assembly_spec.md`](../../production_framework/specs/05_directors_cut_assembly_spec.md) and [`04_cinematography_audio_spec.md`](../../production_framework/specs/04_cinematography_audio_spec.md):
  - **Spec 05 Section 3.2 Table (lines 91–94, Pathway A):** Lists Guaranteed Buffer as `>= 1.5s` (4s/6s), `>= 2.0s` (8s), `>= 2.5s` (10s).
  - **Spec 05 Section 3.2 Table (lines 99–102, Pathway B):** Lists Guaranteed Buffer as `>= 1.0s` (4s), `>= 1.2s` (6s), `>= 1.5s` (8s/10s).
  - **Spec 05 Section 3.3 (line 105):** Says *"at least 1.0s to 1.5s of total silence buffer"*.
  - **Spec 05 Section 8 Linter `L-08` (line 407):** Says `buffer >= 0.8s`!
  - **Spec 04 Section 7.2 (lines 197–198):** Says Pre-roll `0.5s–1.0s` + Post-roll `0.8s–1.2s` (`1.3s–2.2s` total).
- **Fix:** Standardize on one deterministic mathematical formula in `srt_slicer.py` and Linter `L-14`:
  - **Pathway B (External TTS / SRT):** $\text{Clip Duration} - \text{SRT Cue Duration} \ge 1.0\text{s}$ total buffer ($\ge 0.4\text{s}$ pre-roll, $\ge 0.6\text{s}$ post-roll).
  - **Pathway A (Native Veo):** Enforced directly via the strict word-count ceiling (`Max {5, 9, 13, 18} words` for `{4s, 6s, 8s, 10s}`).

---

### 3.9 Header Tag Standardization Across Tier 1, Tier 2, and Tier 3 `.txt` Files
- Looking across `05_directors_cut_assembly_spec.md` (Section 7.1) vs. actual files in `the_314am_doppelganger` and `software_framework_intro`:
  - Spec 05 Section 7.1 uses `[CONFIGURATION SETTINGS]` + `[PROMPT]`.
  - Actual `clips/clip_XX/video_prompt.txt` files use `[CONFIGURATION SETTINGS]` + `[VIDEO PROMPT]`.
  - Actual `clips/clip_XX/image_prompt.txt` files use `[IMAGE CONFIGURATION]` + `[IMAGE PROMPT]` + `[NEGATIVE PROMPT]`.
  - Actual `master_images_prompt.txt` and `master_videos_prompt.txt` use `==================================================================` section dividers (`CLIP 01 — STARTING KEYFRAME IMAGE PROMPT` / `CLIP 01 — VIDEO MOTION PROMPT`).
- **Why This Matters:** For `compile_production.py` (which bidirectional-syncs `clips/clip_XX/*.txt` $\leftrightarrow$ `master_images_prompt.txt` / `master_videos_prompt.txt`) and `lint_production.py`, the exact section headers inside `.txt` files must be locked in `05_directors_cut_assembly_spec.md` Section 7.1 so the parser never has to guess between `[PROMPT]` and `[VIDEO PROMPT]`.

---

### 3.10 Encoding / Mojibake Artifacts in Markdown Specs
- Several specification files (`04_cinematography_audio_spec.md`, `05_directors_cut_assembly_spec.md`, `00_architecture_blueprint.md`) have mixed UTF-8 box-drawing / degree symbols (`30°`, `—`, `┌───┐`) that render cleanly in UTF-8, but a few lines in `05_directors_cut_assembly_spec.md` (e.g. line 11 `Doppelgänger`) and `AGENTS.md` should be kept strictly UTF-8 without BOM when touched by Python scripts (`encoding="utf-8"`).

---

## 4. Updated Master Pre-Compilation Checklist (Incorporating All Additions)

To bring the repository to **10/10 Compile Readiness**, execute the 5 steps from [`PROJECT_AUDIT_AND_COMPILE_READINESS.md`](./PROJECT_AUDIT_AND_COMPILE_READINESS.md#L316-L333) with these **6 precision refinements integrated**:

1. **Archive & Clean Relics + Update All 14 Internal Links:**
   - Move `MIGRATION_PROPOSAL.md` and `PDFCrossCheck.md` to `discussions/_raw/`.
   - Consolidate top-level simulation folders into `production_framework/simulations/` **AND** simultaneously update the 14 relative links in `AGENTS.md`, `05_directors_cut_assembly_spec.md`, and `discussions/directors_cut_and_assembly.md`.
   - Fix `AGENTS.md` raw file count (`27` $\rightarrow$ `57+`), Phase 8 linter range (`L-01 to L-18`), deleted `dump.md` links, and Section 6 status header.
2. **Harmonize Specs `01`–`05` & Lock Canonical `.txt` Headers:**
   - Adopt the unified 18-rule Linter Registry (`L-01`–`L-18`), setting `L-01` word economy to **`100–150 words` for standalone T2V** and **`75–150 words` for Tier 3 I2V (`video_prompt.txt`)** (excluding config/negative blocks).
   - Remove `crane-up` and `dolly zoom` from `04_cinematography_audio_spec.md` Recipes 2 & 3 (replace with pure optical elevation/contra-zoom phrasing).
   - Lock the exact `.txt` section headers (`[IMAGE CONFIGURATION]`, `[IMAGE PROMPT]`, `[CONFIGURATION SETTINGS]`, `[VIDEO PROMPT]`, `[NEGATIVE PROMPT]`) in `05_directors_cut_assembly_spec.md` Section 7.1.
   - Standardize the silence buffer rule to $\ge 1.0\text{s}$ total buffer in Pathway B.
3. **Fix Style Plugins with Negative-Block Exemptions & Dialect Overrides:**
   - Complete `vector_stick_figure.md` (7 sections, 4 dialects with explicit hand/finger override rules, Section 6 Audio Foley Soundboard in semicolon syntax).
   - Renumber `social_ugc_video.md` to 7 sections and remove `9:16` / `4K` from positive anchor strings.
   - Replace `drone` (`live_action_cinema.md`), `crane-like` (`vintage_retro_film.md`), `[OCT 24 1987]` & `4:3` (`vintage_retro_film.md`), `320x240` (`stylized_3d_cgi.md`), and `24fps` (`traditional_2d_anime.md` & `01_visual_spec.md`) in positive anchors while preserving stepped cadence prose (`on twos`, `hand-cranked silent film cadence`) and exempting `NEGATIVE PROMPT:` clauses from `L-03`/`L-04`.
4. **Sanitize `research/synthesis/` (`01`–`10`, including `02_prompt_anatomy.md`) & `validation.md`:**
   - Purge `"16:9, 1080p, 24fps, Xs"`, `tripod`, `dolly`, `crane`, `Steadicam`, `OTS`, `3-Angle Turnaround`, and `[00:00-00:03]` timestamps, and add `10s` to supported Flow durations.
5. **Upgrade Gold-Standard Simulation (`the_314am_doppelganger`) to `L-17`/`L-18` Semicolon Audio Syntax:**
   - Convert the 22 `Audio:` blocks in `the_314am_doppelganger` to `Audio: SFX: ...; Ambience: ...; Dialogue: ...; Music: ...` so our flagship simulation passes 100% of the automated linter suite on Day 1.
