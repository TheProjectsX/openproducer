# Discussion 66 — OpenProducer 7-Mode Architecture & Global Creator Series Templates

## 1. Context & Architectural Milestone
Following the finalization of Phase 7 (Dynamic Workspace Scaffolding), we identified that cramming all production specifications, 19 linters, 8 visual styles, and 16 Retake Doctor codes into a single monolithic `SKILL.md` would blow context token limits, degrade model attention, and create operational confusion.

To solve this, we established:
1. The **7-Mode Operational Architecture** with dedicated on-demand mode modules.
2. The **Global Creator Series Template System** (`template` mode) to allow recurring video creators (YouTubers, TikTokers, episodic series producers) to save and instantly reuse character biometrics, studio lighting, visual style anchors, and voice profiles across projects without repetitive re-interrogation.
3. The **Dual-Trigger Control Surface** supporting both explicit slash commands (`/openproducer:<mode>` / `/opp:<mode>`) for power users and autonomous conversational intent routing for casual creators.

---

## 2. The 7 Operational Modes

OpenProducer decomposes the video production lifecycle into 7 discrete, single-responsibility operational modes:

| Mode | Slash Command | Intent & Trigger | Key Responsibilities | Primary Files Touched |
|---|---|---|---|---|
| **`explore`** | `/opp:explore` | *"I have an idea for a video"* | Creative intake, discovery, archetype classification (Social UGC vs. Cinema vs. Commercial vs. Animation), aspect ratio (`9:16` vs. `16:9`), audio pathway. | `openproducer/config.json`, `openproducer/blueprint.md` |
| **`propose`** | `/opp:propose` | *"Draft my video project"* | Synthesizes an **internal draft in the brain** without cluttering the creator's workspace. Proposes clip durations, pacing (4s/6s/8s), look concept, and script breakdown for creator review. | `openproducer/blueprint.md`, `openproducer/draft.md` |
| **`produce`** | `/opp:produce` | *"Generate the files"* | **The File Factory.** Once the proposal is approved, physically generates all deliverables on disk: `base_image_prompt.txt`, `references/`, `clips/clip_XX/`, `scratchbook.md`, `master_videos_prompt.txt`, `motion_graphics.md`. | Creator workspace root (`clips/`, `master_videos_prompt.txt`) |
| **`guide`** | `/opp:guide` | *"Walk me through the steps"* | **The Co-Pilot.** Leads creators through the 4 interactive quality gates: Gate 1 (Base Image Lock & Re-roll Loop), Gate 2 (Audio & Script Review), Gate 3 (Clip-by-Clip Flow Render), Gate 4 (Retake Check). | `openproducer/state.json` (`active_gate: 1..4`) |
| **`sync`** | `/opp:sync` | *"Check linters and compile"* | **The Quality Auditor.** Runs all 19 Master Linters (L-01 to L-19), verifies token decay, checks T&S safety, and recompiles `master_videos_prompt.txt` after any manual script or prompt edits. | `openproducer/manifest.json`, `master_videos_prompt.txt` |
| **`doctor`** | `/opp:doctor` | *"Clip 01 stuttered / repeated words"* | **The Emergency Room.** Diagnoses runtime AI video glitches against the 16 Retake Doctor Diagnostic Codes (G-01 to G-16) and writes surgical prompt patches directly into the affected clip. | `clips/clip_XX/video_prompt.txt`, `master_videos_prompt.txt` |
| **`template`** | `/opp:template` | *"Save this look for future videos"* | **The Series Franchise Vault.** Manages global creator presets. Saves current project DNA globally or initializes a new project from an existing saved template. | `~/.openproducer/templates/<template-name>.json` |

---

## 3. The Global Creator Series Template System (`template`)

### The Creator Dilemma
In recurring video production (e.g. YouTube channels, educational series, daily TikTok commentary), creators do not want to re-explain their character face, clothing, studio room, lighting contrast, and voice tone from scratch every time they start an episode.

### The Architectural Solution
1. **Global Storage:**
   Templates are stored in the user's global system directory (e.g., `~/.openproducer/templates/<template-id>.json`), making them accessible across all project folders on the machine.
2. **Template Schema:**
   ```json
   {
     "template_id": "stickman-youtube",
     "name": "Stickman Explainer Series",
     "archetype": "animation_2d",
     "aspect_ratio": "9:16",
     "audio_pathway": "pathway_a_native_veo",
     "visual_dna": {
       "master_style_anchor": "Minimalist hand-drawn black ink stick figure on clean white textured sketchbook parchment...",
       "negative_prompt": "3D render, realistic human, blurry, colored shading, gradient background..."
     },
     "subject_dna": {
       "name": "Stickman Bob",
       "biometrics": "Clean circular head, bold 4px black ink limbs, oversized expressive dotted eyes..."
     },
     "environment_dna": {
       "setting": "Infinite white sketchbook paper, subtle warm studio top lighting..."
     },
     "pacing_profile": {
       "default_clip_duration": 6,
       "words_per_second": 2.2,
       "onset": "immediate_vocal_attack"
     }
   }
   ```
3. **Usage Flow:**
   * **Save:** In an active project with a dialed-in character and aesthetic:
     `opp template save stickman-youtube`
   * **Use (New Project):** In any new empty directory:
     `opp template use stickman-youtube --plot "Explaining quantum computing in simple terms"`
     $\rightarrow$ The Agent skips 90% of the interview, inherits the locked visual/character DNA, and jumps straight into `propose` / `produce`!

---

## 4. The Dual-Trigger Interaction Model

The system accommodates both power users and casual creators:
1. **Explicit Slash Commands:**
   * Shorthand `/opp:<mode>` or `/openproducer:<mode>` (e.g. `/opp:produce`, `/opp:guide`, `/opp:sync`, `/opp:doctor clip_01 stutter`).
2. **Conversational Intent Routing:**
   * Natural phrases automatically transition the state machine without requiring command syntax:
     * *"Let's generate the files"* $\rightarrow$ triggers `produce`.
     * *"Can you walk me through this step-by-step?"* $\rightarrow$ triggers `guide`.
     * *"Check my prompts"* $\rightarrow$ triggers `sync`.
     * *"Clip 1 has dead air"* $\rightarrow$ triggers `doctor`.

---

## 5. Next Steps
* Update `AGENTS.md` Decision Log.
* Implement Phase 8: Package the OpenProducer skill (`SKILL.md`, `modes/`, `references/`) and tooling suite.
