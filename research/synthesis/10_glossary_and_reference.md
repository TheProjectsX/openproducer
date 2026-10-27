# 10. Technical Glossary & Quick-Reference Guide

## 1. Comprehensive Terminology Glossary

### A
- **Anamorphic Lens:** Optical lens design that compresses a wide field of view onto a standard sensor, yielding distinctive horizontal flare streaks, oval bokeh, and shallow depth of field.
- **Attention Decay:** In video diffusion models, the phenomenon where tokens located further down a prompt string receive diminished latent weighting relative to opening tokens.
- **Audio Block:** The dedicated trailing section of a prompt prefixed with `Audio:` that directs environmental ambience, foley sound effects, and acoustic suppression.

### B
- **Biomechanics:** Describing physical movement through anatomical kinetics (e.g., "heel striking concrete", "shoulders hunched") rather than abstract emotional adverbs ("walking sadly").

### C
- **Chiaroscuro:** A lighting technique characterized by strong, dramatic contrasts between light and dark, creating bold volume and psychological depth.
- **Clip Extension:** The computational process of synthesizing temporal frames forward from an existing clip's terminal frame to create sequences longer than 8 seconds.
- **Cyclorama (Cyc):** A curved, seamless studio wall used as a neutral background to eliminate sharp corners and shadows.

### D
- **Diegetic Audio:** Sound originating from within the narrative world of the video (dialogue, footsteps, rain, engine rumble) as opposed to non-diegetic background score.
- **Dual-Stream Synthesis:** Concurrently generating visual pixel latents and acoustic audio waveforms in a single unified generation pass.

### F
- **First Frame (`first_frame`):** An image parameter passed to the generator that forces Frame 0 of the output video to match the provided image pixel-for-pixel.
- **Front-Loading Rule:** The prompt engineering doctrine requiring framing and primary subjects to appear in the opening 15–20 words to maximize model attention weight.

### I
- **Identity Drift:** The tendency of generative models to alter a character's facial bone structure, wardrobe, or hair across independent generation passes.
- **"Ingredients to Video":** Google Flow’s system allowing creators to upload up to three reference images (Character, Prop, Style) to anchor latent features across multi-clip scenes.
- **Interpolation (Start & End Keyframing):** Synthesizing motion bounded strictly by a defined opening frame and a defined closing frame.

### L
- **Last Frame (`last_frame`):** The terminal frame of a video clip, often extracted and fed as the `first_frame` of the subsequent clip to achieve temporal action chaining.
- **Locked-Off Static Framing:** Completely stationary camera perspective with zero optical movement (`locked-off eye-level static framing, zero camera movement`), ideal for dialogue scenes and lip-sync stability without invoking banned equipment nouns like `"tripod"`.

### M
- **Match Cut:** A cinematic transition where the visual composition or geometry at the end of Shot A matches the geometry at the start of Shot B.
- **Motivated Lighting:** Lighting that appears to originate from a logical, physical source within the narrative world (e.g., a window, desk lamp, or campfire).

### O
- **One Action Rule:** Restricting each 4–10 second generation prompt to a single continuous physical action to prevent temporal averaging and visual warping.

### P
- **Practicals:** Visible in-frame light fixtures (neon signs, floor lamps, candles, monitor screens).

### S
- **Scene Builder:** The AI-native non-linear timeline workspace inside Google Flow used to sequence, trim, transition, and assemble generated clips into a completed film.
- **Shot / Reverse-Shot (Clean Singles):** The cinematic editing technique of alternating isolated, clean single-subject medium close-ups with complementary 15° off-axis eyelines between two conversing characters (strictly avoiding dirty Over-The-Shoulder / OTS framing, which causes shoulder melting and identity bleed).
- **Single Camera Verb Rule:** Restricting each prompt to exactly one motivated camera movement (e.g., "slow push-in") to prevent conflicting 3D spatial vectors.

### T
- **Temporal Clip Slicing (Replacing Timestamp Prompting):** Slicing multi-beat actions into discrete 4s, 6s, 8s, or 10s atomic clips rather than writing inline `[00:00-00:03]` timestamp brackets inside a single prompt (which Veo 3.1 either ignores or burns into the video as literal text watermarks).

### V
- **Veo-JSON:** The standardized JSON schema for representing cinematic shot parameters programmatically in agent pipelines.
- **Volumetric Lighting (God Rays):** Visible beams of light cutting through atmospheric particles (dust, fog, haze).

---

## 2. Quick-Reference Rules for AI Agents

```
================================================================================
                    VEO 3.1 & FLOW AGENT PRODUCTION RULES
================================================================================

1. FORMULA (PURE CINEMATIC PROMPT):
   [Shot Type] + [Subject with Verbatim Anchor] + [Action] + [Context & Lighting] 
   + [Single Camera Verb] + [Dialogue in Quotes] 
   + Audio: SFX: [Primary Foley]; Ambience: [Ambient Room Tone]; Dialogue: [Spoken Line or None]; Music: [Directive or None].
   (DO NOT append technical resolution/aspect/duration tokens into the prompt string).

2. LENGTH:
   100 - 150 Words for standalone T2V (75 - 150 Words for Image-to-Video).

3. CONFIGURATION CHANNEL (API Config / Flow UI Dropdowns, NOT in prompt):
   • Aspect Ratios: 16:9 or 9:16
   • Resolutions: 720p (draft), 1080p (master), 4k (select models)
   • Durations: 4s, 6s, 8s, or 10s
   • Reference Images: Up to 3 Ingredients (Ingredient #1: Subject Turnaround, Ingredient #2: Empty Stage Environment, Ingredient #3: Secondary Subject / Prop)
   • Keyframe Endpoints: first_frame, last_frame (interpolation)

4. DIALOGUE & LIP-RESTRAINT RULES:
   • Format: speaking with natural subtle lip articulation and relaxed jaw, says, [modifier]: "[Spoken text in sentence case]"
   • Colon before quote is MANDATORY (prevents subtitle burn-in).
   • NEVER use CAPS LOCK in spoken quotes (words will be spelled out letter-by-letter).
   • Keep non-speaking listeners explicitly silent: "firmly closed lips, zero mouth movement".

5. MULTI-SPEAKER CONVERSATIONS:
   • NEVER generate two talking characters in one clip (failure rate > 60%).
   • ALWAYS use Clean Single Shot / Reverse-Shot coverage across separate clips (never OTS).

6. FORBIDDEN PATTERNS:
   • DO NOT use "(thats where the camera is)" -> DEPRECATED.
   • DO NOT use "[00:00-00:03]" timestamps inside atomic clip prompts.
   • DO NOT chain compound camera moves (e.g. "pan and zoom and dolly").
   • DO NOT prompt for "pure white background" (triggers diagonal black lines).
   • DO NOT use negative "no/don't" visual prompts in positive prose (describe positive desired state).
   • DO NOT use camera equipment nouns ("tripod", "camera on tripod", "dolly track", "crane rig"); use perspective descriptors ("locked-off eye-level framing, completely static shot", "slow push-in") to prevent the model from rendering physical camera props in the room.

7. STRUCTURED AUDIO & SUPPRESSION:
   • ALWAYS structure the trailing Audio block with semicolon-separated layers and append "; no background music, no cinematic score." to avoid unwanted musical swells.
================================================================================
```

---

## 3. Synthesis Master Index & File Map

| Document | Primary File Contents |
|---|---|
| [01_api_and_models.md](./01_api_and_models.md) | Model specs, Veo 3.1, Gemini Omni Flash, Imagen 4, GenAI SDK code patterns. |
| [02_prompt_anatomy.md](./02_prompt_anatomy.md) | 5-part and 8-component formulas, front-loading rule, 6 functional prompt layers. |
| [03_prompt_techniques.md](./03_prompt_techniques.md) | Timestamp prompting, optical lens focal lengths, lighting rigs, film stocks, deprecations. |
| [04_character_and_consistency.md](./04_character_and_consistency.md) | Ingredients to Video, 3-reference asset binding, verbatim prompt anchor protocols. |
| [05_multi_clip_and_storyboard.md](./05_multi_clip_and_storyboard.md) | Narrative beat sheets, storyboard panels, shot lists, clip chaining, Veo-JSON schema. |
| [06_audio_and_dialogue.md](./06_audio_and_dialogue.md) | Dual-stream synthesis, speech syntax, colon subtitle prevention, shot/reverse-shot. |
| [07_structured_prompting.md](./07_structured_prompting.md) | Veo-JSON schema, compiler algorithms (JSON to prompt), pre-flight 6-point linter. |
| [08_limitations_and_workarounds.md](./08_limitations_and_workarounds.md) | Catalog of 10 known failure modes, white background glitch, audio false positives, fixes. |
| [09_prompt_examples.md](./09_prompt_examples.md) | Multi-genre production prompts: Sci-Fi, Period, Action, Commercial, Nature, Suspense, 3-shot sequence. |
| [10_glossary_and_reference.md](./10_glossary_and_reference.md) | This master glossary, quick-reference rules, and synthesis file map. |
