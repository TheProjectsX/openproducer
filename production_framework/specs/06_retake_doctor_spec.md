# Specification: `retake_doctor/` (Interactive Glitch Diagnostic & Repair Engine)

**Status:** 🔒 LOCKED & EMPIRICALLY VALIDATED (Discussions 58, 60, 62, 63, 64)  
**Domain:** `retake_doctor/`  
**Target Engines:** Google Flow (Veo 3.1, Imagen 4, Gemini Omni Flash)

---

## 1. Scope & Philosophy

Video diffusion models (Veo 3.1, Kling, Runway) are stochastic generative systems. Even when prompts comply 100% with Linters `L-01` through `L-19`, adverse random latent seeds can trigger model-specific rendering glitches.

The **Retake Doctor** is an autonomous diagnostic engine that eliminates trial-and-error credit burning. It maps observable creator complaints to underlying diffusion mechanics, applying deterministic, surgical prompt patches in seconds.

### Core Architectural Axioms:
1. **Zero Blame on Creator:** The creator describes what looks wrong in plain, colloquial human language (*"his face melted"*, *"the mouth moves during voiceover"*, *"a monster nose appeared in the dark"*).
2. **Deterministic Root-Cause Mapping:** Every visual defect maps to a known generative failure mode in latent attention or physics simulation.
3. **Atomic Single-Variable Patches:** Never rewrite the entire prompt to fix a glitch. Apply surgical token additions/swaps to preserve approved cinematic staging and narrative intent.

---

## 2. The 16 Master Glitch Diagnostic Matrices

### Diagnostic Code G-01: Mid-Clip Facial Morphing & Identity Drift
* **Creator Complaint:** *"The actor's face looks like someone else halfway through the clip,"* or *"The character morphs into a different person."*
* **Root Cause:** Standalone Text-to-Video (T2V) latent diffusion attention decaying over temporal steps, or excessive camera rotation ($> 30^\circ$) causing the model to hallucinate new facial geometry.
* **Surgical Patch:**
  1. Switch clip from Text-to-Video to **Tier 3 Image-to-Video (I2V)** using an approved Tier 2 still keyframe (`keyframe_XX.png`).
  2. Inject **Lean Reference Anchoring (`L-06`)** opening: `"Starting directly from the initial image, the exact same person from [IMAGE 1]..."`
  3. Clamp camera trajectory to linear push/pull or pan $\le 30^\circ$.

---

### Diagnostic Code G-02: Muppet Mouth / Exaggerated Jaw Distortions
* **Creator Complaint:** *"The actor's jaw drops open unnaturally wide,"* or *"The mouth looks like a rubber puppet flapping open."*
* **Root Cause:** Veo's audio viseme synthesizer over-amplifies consonant volume peaks into extreme mandibular displacement when unconstrained.
* **Surgical Patch (`L-15`):**
  1. Prefix spoken quotes with restraint modifiers: `says, with minimal jaw displacement: "..."`
  2. Inject mandatory biomechanical restraint tokens into positive prompt: `"relaxed facial muscles, natural subtle lip articulation, minimal jaw movement, calm restrained speech."`
  3. Verify dialogue text uses strict sentence case (zero ALL CAPS words).

---

### Diagnostic Code G-03: Accidental Lip-Sync on Listener / Narrator
* **Creator Complaint:** *"The character is moving their lips even though someone is talking on the radio / the narrator is speaking."*
* **Root Cause:** Cross-attention mechanism binds quoted dialogue tokens directly to any visible human face in frame.
* **Surgical Patch (`L-16`):**
  1. Inject the Closed-Lip Listener clause: `"[Character] listens in complete silence with firmly closed lips, tight jaw, and zero mouth movement."`
  2. Attribute dialogue explicitly away from the face: `"An off-screen telephone receiver emits: '...' "`
  3. Update `Audio:` block: `Dialogue: Off-screen telephone voice only; on-screen character is completely silent.`

---

### Diagnostic Code G-04: Moonwalking & Ground-Contact Slippage
* **Creator Complaint:** *"The character is walking in place,"* or *"Their shoes are sliding across the ground like ice."*
* **Root Cause:** Diffusion models lack rigid collision friction physics; simulating simultaneous leg-swinging, shoe deflection, and ground traction causes feet to slip.
* **Surgical Patch:**
  1. Re-frame from full-body Wide Shot (WS) to **waist-up Medium Shot (MS)** or **tracking Medium Close-Up (MCU)**, hiding shoe-to-floor contact.
  2. Replace walking propulsion verbs with camera-driven motion: `"Smooth lateral tracking camera glides alongside the character as they traverse the corridor."`

---

### Diagnostic Code G-05: Prop Popping / Materialization Mutancy
* **Creator Complaint:** *"The gun/coffee cup appears out of thin air halfway through,"* or *"Their fingers melt into the object."*
* **Root Cause:** Video diffusion models cannot simulate occlusion extraction (reaching into a pocket or holster to draw an object).
* **Surgical Patch (`L-07`):**
  1. Enforce the **Pre-Materialized Prop Law**: `"Already holding [Prop] firmly in [hand] from Frame 1 to Frame End. Rigid prop geometry, stable hand anatomy, zero popping objects, no drawing motion."`
  2. If the narrative requires drawing the prop, slice into two atomic shots: Shot A (hand drops toward holster) $\rightarrow$ Shot B (tight cutaway with weapon already fully unholstered and aimed).

---

### Diagnostic Code G-06: Truncated Dialogue / Audio Cutoff
* **Creator Complaint:** *"Veo cut off the last word of the sentence,"* or *"The character stopped talking before finishing the line."*
* **Root Cause:** Exceeding native Veo speech velocity limits for the selected clip duration bucket.
* **Surgical Patch (`L-14`):**
  1. Enforce the **Veo Speech Word Budget**:
     - `4s` $\le 5\text{ words}$ | `6s` $\le 9\text{ words}$ | `8s` $\le 13\text{ words}$ | `10s` $\le 18\text{ words}$
  2. If the line exceeds the budget, bump the clip duration to the next bucket (`4s` $\rightarrow$ `6s` or `6s` $\rightarrow$ `8s`), or apply phonetic contraction to the dialogue text.

---

### Diagnostic Code G-07: Multi-Limb Fusion & Combat Merging
* **Creator Complaint:** *"The two characters fused into a multi-armed monster when they touched,"* or *"Their clothing colors swapped during the fight."*
* **Root Cause:** Two human subjects in close proximity with similar luminance/wardrobe trigger spatial latent attention cross-bleeding.
* **Surgical Patch (Section 5.8):**
  1. Apply **High-Contrast Silhouette Separation**: Assign polar-opposite luminance/color values to wardrobes (Character A in white/light profile on screen-left vs. Character B in black/dark silhouette on screen-right).
  2. Slice the action into the **3-Clip Kuleshov Formula**:
     - Clip 1 (Wind-up & launch, 4s) $\rightarrow$ Clip 2 (Macro impact insert: blade clash / fist contact, 4s) $\rightarrow$ Clip 3 (Recoil & recovery, 4s).
  3. Strictly ban multi-second continuous grappling in a single clip.

---

### Diagnostic Code G-08: Inter-Clip Exposure Strobing & Kelvin Flicker
* **Creator Complaint:** *"When cutting from the phone close-up back to the room, the whole screen flashed bright / turned blue."*
* **Root Cause:** Diffusion models independently auto-expose and white-balance each image plate without an absolute photometric reference.
* **Surgical Patch (Section 4.6 & `palette_and_mood.md`):**
  1. Inject the **3-Value Tone & Kelvin Anchor**:
     `"Exposure key: [e.g., low-key 15% IRE], dominant color temperature: [e.g., 3200K warm tungsten], black point floor: #0A0B0E, zero exposure strobing across cuts."`
  2. Add `[MATCH-ON-TONE]` tag to transition metadata.

---

### Diagnostic Code G-09: Hardware Camera Equipment Hallucination
* **Creator Complaint:** *"There is a literal camera on a tripod visible inside my video!"*
* **Root Cause:** Including physical hardware words (`tripod`, `dolly`, `crane`, `gimbal`) in prompt text forces the model to render physical equipment geometry inside the scene.
* **Surgical Patch (`L-03`):**
  1. Purge all hardware equipment nouns from positive prompt text.
  2. Replace with kinematic vectors:
     - `on a tripod` $\rightarrow$ `Locked-off eye-level framing, completely static shot with zero camera movement`
     - `crane shot` $\rightarrow$ `Fluid vertical elevation sweep rising diagonally above the subject`

---

### Diagnostic Code G-10: Multi-Instance Furniture Hallucination
* **Creator Complaint:** *"The actor is sitting on an imaginary second sofa, while the cat is on an empty couch!"*
* **Root Cause:** Multi-subject prompts (human + pet/prop) in living spaces cause diffusion models to instantiate separate furniture items for each subject.
* **Surgical Patch (Discussion 57):**
  1. Inject the **Single-Instance Furniture Law**: `"EXACTLY ONE [FURNITURE] IN THE ROOM."`
  2. Bind all subjects directly to specific spatial coordinates of the single furniture piece: `"The lone figure is seated on the center cushion. Directly behind its head, the [pet/object] is perched on the top backrest of the EXACT SAME [furniture]."`
  3. Add negative prompt tokens: `multiple [furniture], two couches, secondary chair, sitting elsewhere`.

---

### Diagnostic Code G-11: Unseen Entity Transparency & Light Bleed
* **Creator Complaint:** *"The ceiling turned into transparent glass and a monster appeared pacing above it,"* or *"The room lit up when it was supposed to stay dark."*
* **Root Cause:** Describing unseen presence or footsteps in positive visual tokens forces diffusion engines to visually materialize the invisible entity and add light to illuminate it.
* **Surgical Patch (Discussion 57):**
  1. Enforce the **Invisible Entity Prompting Law**: Never visually describe unseen creatures, ghosts, or entities in positive visual tokens.
  2. Lock background surfaces as opaque solids: `"The entire upper half of the frame is dominated by an oppressive, vast pitch-black ceiling void (#0A0B0E) hanging in heavy suspense."`
  3. Convey supernatural presence strictly through character micro-reactions (micro-shudder, dilated eyes, tense posture).
  4. Delegate the unseen entity 100% exclusively to the `Audio:` channel: `Audio: SFX: Unseen heavy footsteps pacing slowly across wooden floorboards overhead; Ambience: Dead silent midnight room tone; Dialogue: None; Music: None.`

---

### Diagnostic Code G-12: Shadow Pareidolia & Facial Latent Contamination
* **Creator Complaint:** *"The shadow above the stick figure's head looks like a giant nose / monster face!"*
* **Root Cause:** Organic, curving shadow boundaries positioned near circular heads cause diffusion attention to interpret negative space as biological features (pareidolia).
* **Surgical Patch (Discussion 57):**
  1. Replace organic dipping shadow contours with **geometric planar boundaries**: `"Uniform geometric horizontal shadow boundary descending uniformly across the upper third of the frame."`
  2. Inject explicit anti-pareidolia tokens into `[NEGATIVE PROMPT]`: `pareidolia, facial features in shadows, nose shape, eyes in dark, monster face, humanoid geometry, organic contours in darkness`.

---

### Diagnostic Code G-13: Complexion / Ethnicity Drift & Mismatched Body Tone
* **Creator Complaint:** *"The character's skin is way darker than my reference photo / changed race,"* or *"The model's real haircut replaced the cool anime hair!"*
* **Root Cause:** Multi-image reference ambiguity (the AI misinterprets dark anime cell-shading as dark skin melanin, applies diversity priors, or copies the reference photo's haircut over the anime character's hair).
* **Surgical Patch (Discussion 60):**
  1. **Universal Relative Melanin Parity:** Never hardcode color names; bind directly to `[IMAGE 1]`:
     `"Lock 100% biometric identity from [IMAGE 1]. Mirror the exact same skin tone, natural melanin level, undertones, and biological ethnicity of the person in [IMAGE 1]. All visible skin (face, neck, ears, hands, arms) must be an identical 1:1 match to [IMAGE 1]—neither lightened, darkened, nor altered in ethnicity."`
  2. **Hair vs. Facial Mask Decoupling:**
     - Inherit 100% of hairstyle, haircut, bangs, and hair color strictly from `[IMAGE 2]`.
     - Graft ONLY the facial features (bone structure, eyes, nose, jaw) and skin tone from `[IMAGE 1]`.
  3. **Mandatory Negative Tokens:** `mismatched skin tone from [IMAGE 1], altered skin tone, shifted complexion, lightened skin, darkened skin, race drift, ethnicity change, hair from [IMAGE 1], haircut from [IMAGE 1], wrong hair color`.

---

### Diagnostic Code G-14: Automated Trust & Safety (T&S) Policy False Positives
* **Creator Complaint:** *"Google Flow says: 'This generation might violate our policy' and blocks the clip from rendering!"*
* **Root Cause:** Upstream automated text classifiers (Gemini Safety Filter / Google Trust & Safety) evaluate the entire prompt (`[VIDEO PROMPT]`, `[NEGATIVE PROMPT]`, and dialogue quotes) via translation to English. Non-English idioms and technical negative tokens frequently trigger 3 distinct policy false positives:
  1. *Self-Harm & Personal Violence Classifiers:* Bengali/foreign phrases like `"জীবন ধ্বংস করতে"` translate literally to `"destroy your life"`, triggering automated self-harm prevention blocks.
  2. *Financial Fraud & High-Risk Solicitation Classifiers:* Imperative promotional calls like `"আজই জয়েন দিন Trading এ"` (*"Join Trading today!"*) or explicit bankruptcy betting (*"টাকা ঢালবেন... ফতুর"*) trigger investment scam and predatory financial advice blocks.
  3. *Negative Prompt Gore/Decapitation Inversion:* AI safety classifiers often lack negation awareness; including tokens like `"twisting head 360 degrees"` or `"mutated neck"` in `[NEGATIVE PROMPT]` causes the safety parser to flag the clip for graphic violence or physical trauma!
* **Surgical Patch & The 2-Option Decision Gate (`L-19`):**
  When a T&S trigger matching [`safety_registry.md`](safety_registry.md) is detected, the AI presents the interactive choice:
  1. **Option A: Native Flow Safe Reword (1-Click Veo Generation):**
     - Replace literal regulatory keywords (*"bankrupt"*, *"destroy life"*) with safe colloquial hyperbole (*"ব্যালেন্স জিরো"*, *"১২টা বাজাতে"*, *"নিজের সব ব্যালেন্স খালি করুন"*).
     - Reframe imperative solicitations (*"Join Trading today"*) into observational humor (*"তাহলে চলে আসুন ট্রেডিং-এ"*).
     - Sanitize negative prompt: purge gore/trauma words, retaining neutral quality tokens.
  2. **Option B: Uncompromised Exact Script (Decoupled Audio & External Lip-Sync):**
     - Retain 100% of the raw, edgy authored script.
     - Strip the dialogue quote completely from the Veo video prompt (Veo renders a clean, silent actor plate with confident lip motion).
     - Generate audio externally via ElevenLabs or real creator voiceover (0% block).
     - Execute audio-to-video lip-sync via **Sync Labs** or **LivePortrait** (waveform-driven, 0% text safety block).

---

### Diagnostic Code G-15: Inter-Sentence Boundary Stutter & Multi-Sentence Phonetic Looping
* **Creator Complaint:** *"The character repeated words in the middle of speaking (specifically repeating the first word of the next sentence after finishing the first sentence)."*
* **Root Cause:** Punctuation-induced prosody pause. When a dialogue quote inside a single clip contains multiple sentences separated by terminal punctuation (`?`, `.`, `!`, `।`), Veo drops acoustic prosody at the boundary. When re-initiating vocal articulation for the second sentence, the cross-attention audio head frequently re-samples or stutters the onset token/word twice. Continuous single-sentence lines (with commas) do not suffer from this glitch.
* **Surgical Patch:**
  1. **The Single-Sentence Dialogue Law:** Every atomic video clip must contain strictly **ONE contiguous spoken sentence or flowing clause**. Never embed multiple disjointed sentences separated by hard terminators in a single clip.
  2. **Punctuation-Only Continuity Bridges (Script Invariance Law):** Never alter or rewrite the creator's authored words. Preserve 100% of the exact vocabulary by simply replacing hard terminal punctuation (`।`, `?`, `!`, `.`) with soft acoustic suspension markers—specifically **ellipsis dots (`...`)** or **commas (`,`)**:
     - *Script Invariant Example (Clip 01):* `"চান? তাহলে..."` $\rightarrow$ `"চান... তাহলে চলে আসুন ট্রেডিং-এ!"`
     - *Script Invariant Example (Clip 04):* `"তো দেরি কেনো। আজই..."` $\rightarrow$ `"তো দেরি কেনো... আজই চলে আসুন ট্রেডিং-এ, আর নিজের সব ব্যালেন্স খালি করুন!"`
     - *Why Ellipsis (`...`) Works:* In neural speech synthesizers, `...` is parsed as an in-sentence natural breath/suspension pause rather than a hard sentence-termination `<eos>` token, preventing the onset stutter without changing a single spoken word.
  3. **Kuleshov Slicing (Alternative):** If the two sentences represent distinct emotional beats (e.g., Question hook $\rightarrow$ CTA punchline), slice them across two separate 4-second clips.
  4. **Mandatory Negative Audio Tokens:** `repeated words, stuttering, looping speech, repeating phrases, double speech, audio echo, onset stutter`.

---

### Diagnostic Code G-16: Kinetic Typography Desynchronization & Dead-Air Transition Destruction
* **Creator Complaint:** *"The kinetic text pops up before the voice speaks (spoiling the punchline),"* or *"There is an awkward silence before talking starts, and cutting it in an editor destroys my in-clip transition!"*
* **Root Cause:** Two coupled phenomena:
  1. *Prompt Token Priority vs. Audio Latency:* Text placed at the start of `[VIDEO PROMPT]` is synthesized at Frame 1, while Veo's audio synthesis exhibits a 1.0s–1.5s speech onset delay.
  2. *The Social UGC Catch-22:* Trimming the initial dead air in an NLE truncates the head of the video clip, ruining incoming camera transitions, whip-pans, or match cuts.
* **Surgical Patch:**
  1. **Archetype-Specific Vocal Onset:** For Social UGC / Commercials, replace cinema pre-roll buffers with **Immediate Vocal Attack**:
     `"Beginning immediately on frame 1 without pause or initial silence, his voice urgently delivers: '...' "`
  2. **Active Non-Verbal Anchor for Transition Buffers:** If an incoming camera move requires a 0.5s–1.0s buffer before speech, motivate it with active physical kinetics (typing on keyboard, spinning chair, slamming desk) with loud motivating SFX rather than empty staring dead air.
  3. **Temporal Binding for In-Video Kinetic Text:** If rendering text inside Veo, bind appearance directly to dialogue delivery:
     `"At second [X], exactly synchronized with the spoken line, bold glowing kinetic typography bursts onto the upper screen displaying: '[Text]'."`
  4. **The Clean Master Plate Alternative:** For high-volume short-form UGC, generate clean video plates without in-video text, and apply word-by-word dynamic typography in post via [`motion_graphics.md`](../simulations/trading_sarcasm/motion_graphics.md) or NLE auto-captions.

---

## 3. The 3-Step "Doctor Mode" Interactive Protocol

When the creator runs or invokes `/doctor` (or reports a bad clip generation), the agent executes this deterministic 3-step sequence:

```
┌────────────────────────────────────────────────────────┐
│ STEP 1: INTAKE & COMPLAINT CLASSIFICATION              │
│ • Identify target clip ID (e.g. clip_09).              │
│ • Map creator observation to Diagnostic Code G-01..G-16│
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│ STEP 2: SURGICAL TOKEN PATCH PROPOSAL                  │
│ • Display isolated diff of positive/negative prompt.   │
│ • Explain the underlying diffusion failure mechanics.  │
│ • Request creator confirmation before file overwrite.  │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│ STEP 3: ATOMIC OVERWRITE & MANIFEST SYNCHRONIZATION    │
│ • Update clips/clip_XX/video_prompt.txt (or image_).   │
│ • Automatically sync master_videos_prompt.txt.         │
│ • Report ready-to-render status.                       │
└──────────────────────────┘
```

---

## 4. Pre-Flight Diagnostic Summary Table

| Code | Symptom | Primary Prompt Fix | Linter / Spec Rule |
|---|---|---|---|
| **G-01** | Face Morphing Mid-Clip | Switch to Tier 2 I2V Seed + Lean Reference Anchor | `L-06`, `L-11` |
| **G-02** | Muppet Mouth / Wide Jaw | Inject mandibular restraint tokens (`subtle lip articulation`) | `L-15` |
| **G-03** | Accidental Lip-Sync | Closed-Lip Listener clause (`firmly closed lips, tight jaw`) | `L-16` |
| **G-04** | Moonwalking / Shoe Slippage | Re-frame to waist-up Medium Shot + lateral camera glide | Section 2.1 |
| **G-05** | Prop Popping Out of Nowhere | Declare prop pre-grasped from Frame 1 to Frame End | `L-07` |
| **G-06** | Truncated Last Dialogue Word | Trim word count to Veo budget or bump clip duration bucket | `L-14` |
| **G-07** | Multi-Limb Combat Fusion | 3-Clip Kuleshov formula + high-contrast silhouette separation | Section 5.8 |
| **G-08** | Inter-Clip Exposure Strobing | Inject 3-Value `[MATCH-ON-TONE]` Exposure & Kelvin Anchor | Section 3.2 |
| **G-09** | Hardware Equipment in Frame | Purge hardware nouns; replace with pure kinematic vectors | `L-03` |
| **G-10** | Multiple Sofas / Furnishings | `EXACTLY ONE [FURNITURE]` + bind subjects to components | Discussion 57 |
| **G-11** | Unseen Entity Visible / Lit | Purge visual entity tokens; delegate 100% to `Audio:` | Discussion 57 |
| **G-12** | Shadow Pareidolia / Face in Dark| Flatten shadow to geometric line + negative face tokens | Discussion 57 |
| **G-13** | Complexion Drift / Hair Mismatch | Relative Melanin Parity + Hair vs. Facial Mask Decoupling | `02_character_spec` §4.0 |
| **G-14** | Policy Violation False Positive | Reframe CTAs, purge gore negatives & harm phrases | `06_retake_doctor_spec` §2.0 |

