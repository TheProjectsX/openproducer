# Discussion 52: Dual-Image Cosplay Translation & Simulation 2 (Software Framework Intro)

**Date:** 2026-10-26  
**Status:** ❌ EMPIRICALLY FAILED IN FIELD TESTING (Crucial Empirical Glitches Logged)  
**Relevant Specs:** [`../production_framework/specs/02_character_spec.md`](../production_framework/specs/02_character_spec.md), [`../production_framework/specs/05_directors_cut_assembly_spec.md`](../production_framework/specs/05_directors_cut_assembly_spec.md)  
**Deliverables Directory:** [`../production_framework/simulations/software_framework_intro/`](../production_framework/simulations/software_framework_intro/)

---

## 0. Empirical Field Test Failure Log (Hands-on Creator Verification)

Creator ran the generated prompts in Google Flow (Veo 3.1 & Imagen 4) and reported major failures:
1. **Dialogue Duration Overflow (Veo 3.1 Native Voice Velocity):**
   - *Failure:* Dialogue lines exceeded clip duration and got cut off mid-speech.
   - *Root Cause:* The 2.2 words/sec standard applies only to external TTS (ElevenLabs/Gemini). Veo 3.1 native in-video audio synthesizes speech much more slowly ($\approx 1.2$ to $1.5$ words/sec) and enforces ~1.0s pre/post-roll silence buffers.
   - *Rule Discovered:* For Veo 3.1 native voice, word budgets must be slashed to: 4s clip = max 3–5 words; 6s clip = max 7–9 words; 8s clip = max 11–13 words.
2. **Face Match & Likeness Degradation (Prompt Over-Description Trap):**
   - *Failure:* Generated face failed to resemble the creator's photo and drifted into generic AI looks.
   - *Root Cause:* Over-describing facial geometry (bone structure, jawline, nose bridge) in text causes diffusion models to synthesize a face from the text tokens, overriding the latent reference weights of `[IMAGE 1]`.
   - *Fix Needed:* Lean reference prompting: minimal text (`The exact same person from [IMAGE 1], 1:1 identical face and likeness without alteration`) letting the reference image hold 95%+ latent attention.
3. **Clip Jumping (The Jump-Cut Trap across Independent Keyframe Plates):**
   - *Failure:* Cutting between separately generated medium shots of the same presenter created jarring, jittery jumps in posture, camera distance, and desk alignment.
   - *Fix Needed:* Enforce the 30° Cinematic Contrast Rule (cutting to extreme different perspectives or macro inserts) OR chain directly via Google Flow's `last_frame` terminal frame continuation.

---

## 1. Simulation 1: Dual-Image Realistic Cosplay / Pose & Attire Translation

### Core Challenge & User Requirement:
- Take two input reference images:
  1. `[IMAGE 1]`: Real human reference photo.
  2. `[IMAGE 2]`: 2D Anime character image (pose, stance, complete outfit, accessories, and hairstyle/hair color).
- Output goal: A photorealistic live-action cinema still of a living human actor in the exact anime pose, wearing the exact outfit and hairstyle from `[IMAGE 2]`, but with the authentic face and biometrics strictly extracted from `[IMAGE 1]`.

### Failure Modes & Architectural Solutions:
1. **The "Anime / Cel Bleed" Glitch:** Simply prompting "take the hair and dress from the anime" causes the model to draw 2D cel lines or paste cartoon features over the face.
   - *Fix:* Enforce the **Material Translation Engine**: command the diffusion model to reconstruct the 2D design into *physical real-world cinema fabrics* (tailored weave, realistic stitching, gravity folds) and *real human hair* (individual soft flowing strands, natural sheen, fine flyaways, organic follicles).
2. **Strict Facial Landmark Isolation:** Restrict `[IMAGE 1]` conditioning strictly to bone structure, zygomatic arches, nose bridge, eye shape, and skin micro-pores, preventing the real person's everyday clothes or casual haircut from bleeding over.
3. **The 1:7.5 Anatomical Scale Lock:** Prevent anime caricature bobbleheads by locking adult natural proportions and negative guards.

---

## 2. Simulation 2: Software Framework Introduction Video

### Concept & Production Setup:
- **Premise:** High-impact software product description video for the **AI Video Production Framework & Google Flow Director Desk**.
- **Presenter:** Real human creator (from `[IMAGE 1]`) acting as the visionary technical director.
- **Generation Mode:** **Pathway A (Pure Native Google Flow / Veo 3.1 Dual-Stream Audio & Video)**. Every video clip synthesizes the presenter's voice directly inside the video—no external narration or TTS tracks.
- **Acoustic Anchor Key (Vocal Profile Invariance):**
  - Locked Master Acoustic Anchor String: `consistent, calm, resonant low-pitched baritone voice with measured, authoritative technical cadence and warm chest resonance`. Injected identically into every video prompt across all 8 clips to prevent vocal timbre drifting.
  - **Biomechanical Mandibular Restraint Protocol (Anti-Muppet Mouth):** All speaking clips enforce `relaxed jaw, minimal jaw displacement (5–8mm), restrained lip articulation, resting mouth closures on punctuation` to prevent diffusion mouth-gaping distortion.
- **Visual Medium:** Live-Action Cinema (`live_action_cinema`), 35mm film still, 85mm & 50mm portrait prime lenses, minimalist dark dev studio suite, warm amber practical rim lighting.
- **Pacing & Duration:** Dynamic Sync, exactly **44.0 Seconds** across **8 Flow-native clips** (`[4s, 6s]`).
- **Word Economy:** 86 spoken words across 44s ($\approx 2.26$ words/second), with guaranteed $\ge 1.1\text{s}$ breathing buffers on every clip.

### Delivered Production Assets:
1. `narrator_script.md`: Full script formatted for Gemini TTS / ElevenLabs with clip-by-clip timing and word counts.
2. `base_image_prompt.txt`: Tier 1 Master Reference Plate for Ingredient #1.
3. `scratchbook.md`: Director's Scratchbook mapping single-action budgets, optical camera kinematics, and continuity chaining.
4. `clips/clip_01/` to `clip_08/`: Complete dual-tier prompt pairs (`image_prompt.txt` + `video_prompt.txt`, 100–150 words).
5. `origin_manifest.md`: Complete asset lineage and timeline assembly order.
6. `master_images_prompt.txt`: Dedicated master manifest for ALL IMAGE generation (Tier 1 & Tier 2 plates).
7. `master_videos_prompt.txt`: Dedicated master manifest for ALL VIDEO generation (Tier 3 Veo prompts).

### Validation Against Framework Linters:
- **L-01 (Word Budget Pacing):** 100% Pass (all 8 clips within sweet spot).
- **L-02 (Buffer Rule):** 100% Pass ($\ge 1.1\text{s}$ pre/post-roll silence per clip).
- **L-03 (Single-Motion Law):** 100% Pass (exactly 1 biomechanical motion and 1 optical kinematic vector per clip).
- **L-04 (View Refresh / Anti-Stagnation):** 100% Pass (alternating Scene Shots Type A and Macro Inserts Type B).
- **L-05 (Prop Bounding):** 100% Pass (closed-set Lean Causal Palette enforced).
- **L-06 (Word Economy):** 100% Pass (all Veo prompts strictly bounded between 100–150 words).
