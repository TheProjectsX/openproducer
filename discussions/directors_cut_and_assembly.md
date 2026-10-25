# Discussion Log: Director's Cut, Temporal Slicing & Multi-Engine Assembly

**Status:** 🟡 UNDER DEVELOPMENT (Active Phase 6 Working Document)  
**Target Specification:** [`../production_framework/specs/05_directors_cut_assembly_spec.md`](../production_framework/specs/05_directors_cut_assembly_spec.md)  
**Raw Archive Reference:** [`_raw/33_directors_cut_temporal_slicing_and_multi_engine_pipelines.md`](./_raw/33_directors_cut_temporal_slicing_and_multi_engine_pipelines.md)

---

## 1. Domain Scope & Mission

The **`directors_cut/` & `assembly/`** domain elevates the framework from isolated single-shot prompt generation into an end-to-end **Director's Production Desk**. It bridges the human creator's script, screenplay, or concept into paced, sliced, and continuity-locked clip sequences across multiple AI generation engines.

### Foundational Principles:
1. **Dynamic Engine Routing:** Support diverse generation pipelines:
   - *Pathway A:* Pure Google Flow / Veo 3.1 (5s–10s clips, native dual-stream audio).
   - *Pathway B:* Monolithic Long-Take Generators (Seedance, Sora, Minimax) using unified scene prompts.
   - *Pathway C:* Image Slideshows (Imagen 4 / Midjourney stills + ElevenLabs voiceover + Ken Burns pan & zoom).
   - *Pathway D:* Hybrid Multi-Tool Production (Veo b-roll + ElevenLabs dialogue + Suno music).
2. **Temporal Slicing & Action Budgeting:**
   - Word count to clip duration mathematical pacing (~2.2 words per second of speech).
   - Strict action budgeting (exactly 1 major biomechanical or kinematic action per clip to prevent diffusion hallucinations).
   - Avoiding "stretched" clips (dead air) vs. "cramped" clips (overloaded action).
3. **The Continuity Chaining Bridge:**
   - Terminal frame (`last_frame`) passing from Clip $N$ to Clip $N+1$.
   - Spatial coordinate matching and velocity continuation across cuts.
4. **The Director's Scratchbook & Origin Tracker:**
   - Comprehensive ledger tracking "what comes from where" (visual origin, audio origin, ingredient dependencies).

---

## 2. Progress & Architectural Decisions (Active)

### Step 0: The Creator Intake Interactivity Rule
- **The Rule:** The exact same plot can be an 18-second fast reel or a 2-minute moody slow-burn. If pacing, duration, or clip budget are not explicitly stated, the Agent **must pause and directly ask the creator** before slicing or generating prompts.
- **The 4 Tempo Archetypes:**
  1. *Hyper / Viral (3–4s clips):* 4–8 words/clip, rapid cuts, punchy hook-driven payoffs.
  2. *Dynamic Commercial (5s clips):* 8–11 words/clip, motivated cuts, balanced storytelling.
  3. *Dramatic Cinema (8s clips):* 14–18 words/clip, breath-paced cuts, emotional tension.
  4. *Atmospheric Slow-Burn (10s clips):* 18–22 words/clip, lingering camera, meditative immersion.

### Pillar 1: Mathematical Word-to-Time Pacing
- **Speech Rate Standard:** Conversational speech averages 130–150 words per minute ($\approx 2.2$ words per second).
- **Buffer Rule:** Every dialogue clip requires **0.8s to 1.2s of breathing buffer** (silence before speech starts and after it concludes) to avoid clipping at boundaries or causing auctioneer mouth movements.

### Pillar 2: Action Budgeting & The Single-Motion Law
- **Diffusion Collapse Prevention:** Video diffusion models choke when multiple sequential actions are requested in one clip.
- **Law:** Each clip is strictly budgeted for:
  - **ONE** primary biomechanical motion.
  - **ONE** continuous camera kinematic vector (or static lock).
- Any story beat with $K$ sequential actions must be sliced into at least $K$ clips.

### Pillar 3: The Director's Scratchbook Schema (`scratchbook.md`)
The living production ledger compiled before generating shot prompt files:
- `Clip ID`
- `Target Duration` (3s/5s/8s/10s)
- `Story Beat & Dramatic Goal`
- `Spoken Dialogue / VO` (word count verified)
- `Single Budgeted Action`
- `Camera Kinematics`
- `Chaining Dependency` (`last_frame` from predecessor, match cut, or establishing)

### Pillar 3: The Master Subject DNA Injection Protocol & Continuity Chaining
- **The Mutation Glitch:** Never use loose pronouns (*"he"*, *"the figure"*) in subsequent clips; diffusion models will mutate silhouettes (e.g. skinny stick figure turning muscular, or character wardrobe shifting).
- **Verbatim DNA Injection:** Every clip prompt featuring a subject must deterministically inject the **exact verbatim Subject Anchor String** from `subjects/<id>/` into early tokens (tokens 10–35), explicitly locking musculoskeletal build, line-weight, wardrobe, and anti-mutation guardrails.
- **The Two Transition Modes:**
  1. *Mode 1: Continuous Shot Extension:* Uses `last_frame` of Clip $N$ as the start frame seed of Clip $N+1$, with explicit velocity matching and continuity prompt syntax (*"Continuing directly from the initial frame..."*).
  2. *Mode 2: Motivated Cut / Angle Change:* Governed by Verbatim DNA Injection + Shared `#E5E5E5` Ingredient Pin + 180° Screen Direction rule + Motivated Light Vector continuity.

### Pillar 4: Default Google Flow Baseline & Dynamic Modality Switches
- **Default Baseline:** The system ALWAYS defaults to standard **Google Flow Native** (sliced Veo video clips, native in-clip spoken dialogue, foley SFX, and ambient score). No complex setup required upfront.
- **Dynamic Modality Switches (Mid-production or post-generation overrides):**
  1. *Visual Override (`images`):* *"Use images instead of videos"* $\rightarrow$ Strips camera kinematics and audio, formats into still photo plates (Imagen 4 / Midjourney) for slideshows or storyboards.
  2. *Assembly Override (`monolithic`):* *"Give me a single prompt for long-form"* $\rightarrow$ Fuses separate clip beats into a single continuous long-take choreography prompt (Seedance / Sora).
  3. *Dialogue Override (`elevenlabs`):* *"Use ElevenLabs for dialogue, give me the scripts"* $\rightarrow$ Strips spoken dialogue audio from the Veo prompt (prevents double-speech clashes) and outputs an isolated, delivery-formatted `dialogue_scripts.md` manifest with timing buffers.
  4. *Music Override (`external`):* *"I will add my own background music"* $\rightarrow$ Strips score synthesis from the `Audio:` block (`zero background music, no score`), leaving pure diegetic foley and room tone.
- **Full Composability:** Any switch can be triggered alone or combined (e.g. Sliced Veo video + ElevenLabs dialogue scripts + External music).

### Pillar 5: The Origin Tracker & Output Manifest (`origin_manifest.md`)
- The assembly ledger mapping each asset to its source engine (Veo 3.1, Imagen 4, ElevenLabs, external audio) and conditioning dependency (`#E5E5E5` turnaround sheet, `last_frame` seed, or voice profile).

---

## 4. Empirical Diffusion Glitches & Architectural Hard Fixes (Discussion 38)

Testing real-world Flow generations of *The 2:17 AM Dispatch* revealed 3 fatal diffusion bugs:
1. **Accidental Lip-Sync Glitch:** Quoting dialogue while an actor is on screen in MCU forces the actor's lips to move even if the audio is an incoming telephone whisper.
   - *Fix: The Closed-Lip Listener Rule:* Explicitly declare `"lips remain firmly closed, zero mouth movement"` on listening characters, and attribute speech to `"off-screen telephone receiver speaker"`.
2. **Prop Popping & Hand Morphing Glitch:** Asking an actor to draw a gun or carry casual props mid-action triggers severe occlusion confusion.
   - *Fix: Pre-Materialized Prop Law:* Objects must be declared `"already firmly grasped from Frame 1 to Frame End"` with stability tokens, and drawing transitions must be sliced into cutaways rather than animated in one shot.
3. **Temporal Multi-Event Cramming:** Slicing into 8s is meaningless if 4–5 sequential beats (door + walk + turn + clock) are packed into one prompt.
   - *Fix: Micro-Beat De-Cramming Law:* $1 \text{ Clip} = 1 \text{ Camera Trajectory} + 1 \text{ Spatial Plane} + 1 \text{ Micro-Action}$. Secondary storytelling beats (e.g. wall clock) must be isolated macro insert shots.

---

## 5. Active Roadmap: Phase 6 Completion Agenda

1. [x] **Step 0 & Pillar 1:** Creator Intake Interactivity & Word-to-Time Pacing Math.
2. [x] **Pillar 2:** Action Budgeting & Single-Motion Law.
3. [x] **Pillar 3 & Continuity:** Master Subject DNA Injection & Continuity Chaining Bridge.
4. [x] **Pillar 4 & 5:** Default Flow Baseline, Dynamic Modality Switches & Origin Tracker.
5. [x] **Step 4: Empirical Simulation:** Run initial end-to-end test.
6. [x] **Step 6: Prompt De-Cramming & Glitch Remediation:** Re-sliced into 11 unhurried micro-clips enforcing Closed-Lip Listener, Pre-Materialized Props, and Micro-Beat De-Cramming across all prompt files (`master_flow_agent_prompt.txt` V2, `individual_clips/`, `scratchbook.md`).
7. [x] **Step 7: Specification & Manifest Update:** Updated [`production_framework/specs/05_directors_cut_assembly_spec.md`](../production_framework/specs/05_directors_cut_assembly_spec.md) with Sections 4.2, 5.3, 5.4, and pre-flight linters L-12 and L-13.
8. [x] **Step 8: Cross-Medium Validation (Stick Figure Horror):** Proved the generalizability of all 3 laws on *The Uncanny Reflection* (10-clip 2D minimalist horror sequence & Photo-First keyframe generation). Fully documented in [`_raw/39_simulation_stick_figure_horror_and_blank_head_rule.md`](./_raw/39_simulation_stick_figure_horror_and_blank_head_rule.md).
9. [x] **Step 9: Image-First Video Production Pipeline (The 9-5 Rat Race):** Formalized the 2-step workflow (generating still image keyframe prompt first, then generating Image-to-Video motion prompt from that seed) with audio-visual motivational contrast. Fully documented in [`_raw/40_image_first_video_production_workflow.md`](./_raw/40_image_first_video_production_workflow.md).
10. [x] **Step 10: Stick Figure Vector DNA & Gemini TTS Syntax (Discussion 41):** Codified the Fingerless Vector Standard (`stroke-linecap: round`), Light-Reveal Cream Canvas (`#F8F6F0`), and Google AI Studio Gemini 3.8 Flash TTS Angle Bracket `< >` syntax standard to prevent bracket reading bugs.
11. [x] **Step 11: Dialogue-First Timing Loop & 3-Tier Image-First Pipeline (Discussion 42):**
    - *Dialogue-First Workflow:* Default to generating dialogue/narrator script first $\rightarrow$ creator gets actual audio duration/timestamps $\rightarrow$ video clips are sliced with exact temporal precision. AI asks if creator prefers both together.
    - *3-Tier Image-First Pipeline:* `base_image_prompt.txt` (Tier 1 master style/DNA) $\rightarrow$ `clips/clip_XX/image_prompt.txt` (Tier 2 clip keyframe starting plate) $\rightarrow$ `clips/clip_XX/video_prompt.txt` (Tier 3 Image-to-Video motion prompt).
12. [x] **Step 12: Flow Native Durations, Pacing Profiles & Context Shift Rule (Discussion 43):**
    - *Flow Native Custom Lengths Locked:* `[4s, 6s, 8s, 10s]` strictly enforced; arbitrary lengths purged.
    - *Creator Pacing Profiles:* Creator selects between Dynamic Sync (4s–6s cuts, high retention, frequent inserts) and Slow-Burn Monologue (8s–10s takes, atmospheric continuous kinematics).
    - *The Anti-Stagnation Law & Visual Beat Archetypes:* Avoid sticking too long in a single visual viewpoint. Type A (Scene Shot, 4s–10s), Type B (Macro Insert, 4s/6s/8s), and Type C (Graphic / Text Plate, 4s/6s/8s) dynamically timed based on plot context and narrative weight.
13. [x] **Step 13: Final Phase 6 Synthesis & Spec Consolidation (Discussions 44 & 45):**
    - *Lean Causal Palette:* Added Section 4.5 closed-set prop bounding to eliminate AI clutter.
    - *Spatial Continuity Handoffs:* Added Section 5.6 defining Clip $N$ Spatial Exit State, Clip $N+1$ Spatial Entry State, 180° Screen Direction rule, and eyeline elevation matching.
    - *Multi-Character Staging:* Added Section 5.7 banning dirty OTS; using Wide Establishing Plates + Clean Singles with complementary 15° eyelines and speaker/listener decoupling.
    - *Dynamic Context-Driven Audio Transitions:* Added Section 6.5 J-Cuts (sound anticipates cut) and L-Cuts (sound lingers across cut) for Native Flow audio and external narration/dialogue stems.
    - *Linter L-15:* Added Screen Direction & Eyeline Consistency Linter.
    - *Pluggable Style Registry Scaffolding:* Created `production_framework/styles/` with Universal Base Mediums (`live_action_cinema.md`, `commercial_tabletop.md`, `vector_stick_figure.md`).
    - *Consumed & Deleted Dump.md:* Cleaned up temporary staging file.
14. [x] **Step 14: End-to-End Simulation & Empirical Validation (Discussion 46):**
    - Executed complete directorial simulation of *Station 42 (Dyatlov Pass, 1959)*.
    - Verified Slow-Burn Atmospheric Cinema pacing across 14 Flow-native clips (6s, 8s, 10s; 108s total runtime).
    - Validated Dialogue-First Timing Loop with Gemini 3.8 Flash TTS `< >` syntax (`narrator_script.md`).
    - Validated 3-Tier Image-First Pipeline (`base_image_prompt.txt`, `clips/clip_01/` to `clip_14/` image and video prompts).
    - Verified 100% pre-flight compliance across Linters L-07 through L-15.
    - Empirically validated Tier 1 reference plate via Photo-First image generation (`station_42_base.jpg`).
15. [ ] **Step 15: Dialogue-First Simulation with Real SRT (The 3:14 AM Doppelgänger — Discussion 49):**
    - Executing end-to-end production on *The 3:14 AM Doppelgänger* through Step 0 Intake & Section 2.4 Confirmation Gate.
    - Ingested 40-cue master `audio.srt` (135.08s runtime).
    - Sliced narrative into **22 Flow-native clips** (`[4s, 6s, 8s, 10s]`, totaling 136s runtime with 0.92s breathing dissolve buffer).
    - Generated all 22 dual-tier prompt pairs (`clips/clip_01/` to `clip_22/`), `master_flow_agent_prompt.txt`, and `origin_manifest.md`.
    - Enforced Anti-Dead-Air Law (~140 wpm momentum) and expressive fear/tension biomechanics (hunched shoulders, rigid trembling limbs).
    - Pre-flight linters L-07 through L-15 passed.
    - **Current Status:** Simulation is actively being generated and evaluated by the creator. Validation of Phase 06 remains open until creator completes generation and approves the findings.











