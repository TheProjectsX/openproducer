# PDF Cross-Check & Prompting Mechanism Analysis
**Source Material Analysis:** `STICKMAN_PRO.pdf` & `STICKMAN_SOURCE_MATERIAL.pdf`  
**Target:** AI Video Production Framework (`production_framework/specs/`)  
**Scope:** Prompting mechanisms for Video, Images, Dialogue, Scripts, and Plots (Excluding AI model agent steering/state machines).

---

## 1. Executive Summary & Context

A rigorous comparative analysis was conducted between our current production specifications (`01_visual`, `02_subject`/`character`, `03_scenery`, `04_cinematography_audio`, `05_directors_cut_assembly`) and the methodology detailed in `STICKMAN_PRO.pdf` and `STICKMAN_SOURCE_MATERIAL.pdf`.

While our framework excels at **high-end live-action cinematography, cinematic lighting physics, lens choices, and multi-shot dramatic staging**, the two PDFs provide battle-tested, highly effective prompting mechanisms developed specifically for **high-engagement YouTube content, educational essays, vector/hybrid animation, and audience-retention storytelling**.

This cross-check details the valuable prompting mechanisms, narrative structures, and visual constraints present in the PDFs that our framework currently lacks.

---

## 2. Video Prompting Mechanisms

### 2.1 The "Causal Palette" Prompting Constraint (Anti-Hallucination Guardrail)
* **What the PDF has:**
  In `STICKMAN_SOURCE_MATERIAL.pdf` (pages 40–47), video prompts introduce a formal **`CAUSAL PALETTE:`** block immediately before the shot timeline, defining the exact geometric representation of every prop allowed in the scene:
  ```text
  CAUSAL PALETTE:
  - bed: horizontal rectangle on two short legs, small curved-line pillow, horizontal rectangle blanket
  - digital alarm clock: small rectangle with simple line-art numerals inside, no LED glow
  - couch: long horizontal rectangle with three cushion bumps on top, two short vertical legs
  - energy drink can: tall rectangle with small triangle pull-tab on top, single line-art "M" letterform
  ```
  This is coupled with a strict negative prompt rule:
  ```text
  NEGATIVE PROMPT: ... no objects not listed in CAUSAL PALETTE.
  ```
* **What we currently have:**
  Our scenery and subject specs describe environments and props richly, but do not provide an explicit **closed-set inventory list** inside the prompt.
* **Why it is useful:**
  Generative video diffusion models (Veo 3.1, Sora, Seedance) frequently hallucinate random background clutter (extra lamps, wires, mugs, posters). The `CAUSAL PALETTE` explicitly tells the model *what can exist* and bans anything outside that list, providing unprecedented scene cleanliness and prop consistency.

---

### 2.2 Timestamped Multi-Beat Video Prompts (Long-Form 14s Clips)
* **What the PDF has:**
  For video engines capable of 10–15s generations (Seedance 2.0, Sora), the PDF prompts a single monolithic 14-second generation structured into discrete, timestamped sub-beats with hard cuts:
  ```text
  [00:00-00:05] CEILING DRONE — RESTLESS IN BED
  Top-down view... Subject lies on bed... At 0:01 turns onto side; at 0:03 turns onto other side.
  Camera: locked top-down ceiling shot, very slight drift downward (~5%).
  SFX: low ambient room tone, soft rustling.

  [00:05-00:09] COUCH BY WINDOW — NIGHT
  Hard cut to living room, 3/4 angle medium-wide shot...
  Camera: locked medium-wide shot, very slight slow push-in (~8%).

  [00:09-00:14] SPLIT-SCREEN — 5 AM SELF vs 11 PM SELF
  Hard cut to split-screen composition. Vertical line divides frame down middle...
  Camera: locked, no movement.
  ```
* **What we currently have:**
  Our `05_directors_cut_assembly_spec.md` strictly enforces the **Single-Motion Law** (`1 Clip = 1 Micro-action`, typically 3s–8s in Veo 3.1) to avoid diffusion collapse.
* **Why it is useful:**
  While our Single-Motion Law is essential for Veo 3.1, engines like Seedance 2.0 and Sora handle internal hard cuts and multi-beat scene shifts within a single prompt when formatted with explicit timestamp blocks (`[00:00-00:0X]`). Having this prompting syntax enables our framework to support long-form animation engines efficiently.

---

### 2.3 Intra-Chapter Beat Rhythm Formula
* **What the PDF has:**
  A proven, repeatable rhythmic distribution for each ~14s video chapter:
  * **DAILY ACTION beat (`~3–5s`):** Character in relatable, mundane everyday action (scrolling phone, drinking coffee, sitting at desk).
  * **HERO beat (`~2–3s`):** Character facing camera in confident standing pose, addressing viewer directly.
  * **METAPHOR beat (`~2–4s`):** Conceptual visual representation (split-screen before/after, time-lapse, environmental shift).
  * **REACTION beat (`~1–2s`):** Fast close-up on subject's face showing an emotional state change (surprise, realization, fatigue).
* **What we currently have:**
  We categorize shots by cinematographic framing (Wide, Medium, Close-Up, Macro, Over-the-Shoulder), but lack a **narrative beat rhythm formula** for pacing content creation.
* **Why it is useful:**
  Alternating mundane actions with quick reaction close-ups and visual metaphors maintains high viewer retention and prevents visual monotony.

---

### 2.4 Inter-Chapter Match-Cut Handoff Mechanics
* **What the PDF has:**
  A strict continuity protocol requiring the **last 0.5–1.0s of Chapter N** to visually match the **first 0.5–1.0s of Chapter N+1** using 4 specific matching vectors:
  1. **Match-cut on character pose:** Ending and beginning on the exact same physical posture, with a new action starting.
  2. **Match-cut on prop:** Ending and beginning centered on the same object from a different perspective or temporal state.
  3. **Match-cut on shape:** Ending and beginning with identical compositional silhouette/geometry at different scales.
  4. **Match-cut on environment tone:** Same background color value resolving across chapters.
  * Explicitly bans: whip-blur and zoom-into-darkness handoffs.
  * Declares transition instruction: `→ HANDOFF: [pattern name]. Match frame: [precise description]. Cross-dissolve 0.5s in editor.`
* **What we currently have:**
  Our framework defines Mode 1 (Continuous Extension via `last_frame`) and Mode 2 (Motivated Cuts), but does not have a formal **Match-Cut Taxonomy** designed for editor-side cross-dissolves and thematic cuts.
* **Why it is useful:**
  It provides an editing-aware prompt bridge for editors assembling multi-chapter videos in post-production.

---

### 2.5 Frame-by-Frame In-Clip Morphing Prompting
* **What the PDF has:**
  Explicit prompt instructions directing the diffusion engine to morph specific features mid-clip at an exact second mark:
  ```text
  "Subject's dot eyes transition to spirals (frame by frame morph at 0:11). Mouth line slack. Bedside clock visible in soft background reads '11:55 PM'. Subject keeps scrolling. Frame holds with spiral eyes still in place."
  ```
* **What we currently have:**
  We forbid mid-clip morphing in live action (to prevent warping/melting artifacts).
* **Why it is useful:**
  In animated, stylized, or vector mediums, prompting explicit frame-by-frame morphing with timestamp markers enables expressive cartoon dynamics (e.g. eyes turning into spirals, lightbulb appearing, expression shifts).

---

## 3. Image Prompting Mechanisms (Thumbnails, Model Sheets & Branding)

### 3.1 The 4 Proven Thumbnail Prompting Archetypes (CTR Engines)
* **What the PDF has:**
  The PDF codifies four distinct, high-CTR thumbnail prompting formulas:
  1. **Mode A — Hero Pose + Bold Text Overlay (Aspirational):**
     * Layout: Locked character full body on right (50–65% frame); left 35–40% reserved for bold uppercase text.
     * Accent: One accent word highlighted in red/bright color; optional hand-drawn arrow pointing to key word.
  2. **Mode B — Reaction Expression Close-Up (Relatable Hook):**
     * Layout: Tight crop from chest up, exaggerated eye/mouth state ("you've been there" hook).
     * Text: 2–4 short punchy words in negative space.
  3. **Mode C — Split-Screen Problem vs. Solution (Transformation):**
     * Layout: Vertical divider line. Left = "BAD" state (slumped posture, red tint, tired eyes); Right = "GOOD" state (confident hero pose, blue/green tint).
     * Text: "BEFORE / AFTER" or "OLD YOU / NEW YOU" at top; bold title at bottom.
  4. **Mode D — In-Scene Metaphor (Conceptual / Framework):**
     * Layout: Character physically interacting with a tangible metaphor (breaking a chain, pushing a boulder up a hill, holding a giant alarm clock).
     * Text: Bold title partially occluded by the prop for optical depth.
* **What we currently have:**
  Our framework has **zero dedicated specifications for thumbnail generation**. We focus on character reference sheets and starting plates.
* **Why it is useful:**
  Thumbnails are 50% of video success on YouTube, TikTok, and social platforms. Having standardized prompt templates for the 4 core thumbnail modes directly broadens the skill's utility for creators.

---

### 3.2 Mobile-First Legibility Constraints in Image Prompts
* **What the PDF has:**
  Image prompts include explicit constraints for thumbnail readability:
  * Strict mobile benchmark: **Must remain legible at 200×112 px display resolution**.
  * Rule: Max 2–5 words for main hook; exactly one bright accent color (red, yellow, neon green, sky blue); pushed contrast and saturation ("thumbnails louder than animation chapters").
* **What we currently have:**
  Cinematic aesthetic grading, natural dynamic range, filmic halation.
* **Why it is useful:**
  Cinematic compositions often become unreadable mud when shrunk down to mobile YouTube feeds. These prompt constraints guarantee click-through legibility.

---

### 3.3 Channel Branding & Safe Zone Image Prompts
* **What the PDF has:**
  * **Logo Prompt:** 1:1 circular crop specification, head-and-neck only, centered composition, pure flat background, zero body/shoulders to prevent circular crop clipping.
  * **Banner Prompt (2560×1440):** Character positioned strictly on the right third; left two-thirds reserved as clean negative space; **Safe Zone Compliance** restricting all critical visuals to the central horizontal strip (**1546×423 px**) to prevent mobile header cutoff.
* **What we currently have:**
  We do not support channel branding or banner generation.
* **Why it is useful:**
  Allows a creator to bootstrap an entire channel's visual identity (logo, banner, avatar) alongside the video assets using the locked character DNA.

---

### 3.4 Discrete Geometric Expression Vocabulary
* **What the PDF has:**
  A strict dictionary mapping emotional states to exact 2D geometric vector primitives:
  * *Default (friendly):* Two oval dots, slight upturn curved line.
  * *Surprised:* Two wide "o" shapes (solid black), small open "o" mouth.
  * *Thinking:* One squiggle line, one oval dot, small flat curve or slight scrunch.
  * *Happy:* Two upturned arcs (`^_^`), wider curved smile.
  * *Sad / Down:* Two small dots, flat horizontal line or slight downturn.
  * *Tired / Defeated:* Two horizontal lines (closed eyes) with short curved lines beneath (red-eye indicator), slight downturn.
  * *Overstimulated:* Simple line-art spirals replacing dot eyes.
* **What we currently have:**
  Our character spec describes facial bone structure, zygomatic arches, micro-expressions, and natural skin folds for photoreal actors.
* **Why it is useful:**
  For stylized, animated, or minimalist art styles, photoreal facial descriptions cause horrifying Frankenstein-like facial distortions. Having an explicit, discrete geometric vocabulary keeps stylized faces locked.

---

## 4. Script, Plot & Dialogue Prompting Mechanisms

### 4.1 The 4 Signature Cold Open Patterns (First 25–45 Words)
* **What the PDF has:**
  Codifies four psychological hook formulas for the opening 2–4 sentences:
  * **Pattern A — Personal Empathy:** `"Have you ever felt like [pain point]? I used to feel the same way. Like I was [vivid relatable struggle]."`
  * **Pattern B — Direct Challenge:** `"Raise your hand if you've ever [relatable failure/habit]. Yeah, same."`
  * **Pattern C — Counterintuitive Claim:** `"What if I told you [common belief/advice] is actually wrong? Stick with me here."`
  * **Pattern D — Direct Observation:** `"[Common problem] is really easy to start. Almost impossible to interrupt once it's running."`
* **What we currently have:**
  Our Director's Cut framework addresses pacing and word count budgets, but does not provide **proven script hook architectures** for narrative openings.
* **Why it is useful:**
  YouTube and short-form video retention drops by 40–60% in the first 5 seconds. Providing these four tested cold-open templates ensures scripts hook audiences instantly.

---

### 4.2 The "Anti-Guru" Relatability Credibility Move
* **What the PDF has:**
  A core psychological script rule:
  * The narrator is a **supportive friend / older sibling who has been through it**, never a guru or lecturer.
  * Never preach, never moralize, never pretend you have it all figured out.
  * **"Admit you struggled too. That admission IS the credibility move."**
  * Dry humor allowed; zero sarcasm directed at the viewer.
* **What we currently have:**
  We focus on dramatic dialogue, subtext, and character motivation, but lack specific tone guidelines for educational, commercial, or video essay narration.
* **Why it is useful:**
  Modern audiences reject preachy, lecturing AI scripts. Enforcing this anti-guru tone ensures generated scripts sound genuinely human and trustworthy.

---

### 4.3 Narrative Rhythm & Conversational Micro-Pivots
* **What the PDF has:**
  Specific sentence-level writing mechanics:
  * Relentless second-person frame (`"you"`, `"your"`).
  * Chained punchy sentences (5–12 words) interspersed with occasional longer explanatory sentences (15–25 words).
  * **Signature pivot phrases:**
    * `"Here's the thing."`
    * `"And that's the part nobody tells you."`
    * `"So what do you do instead?"`
    * `"Here's where it gets weird."`
  * **Impact fragments:** `"It's that simple."` / `"No, really."` / `"And then it clicks."`
  * Everyday observational metaphors rather than academic or gym-bro tropes.
  * Structural rule: Lists of three when presenting examples or steps.
* **What we currently have:**
  Mathematical speech velocity limits (2.2 words/sec) and breathing silence buffers (0.8s–1.5s), but no micro-syntactical phrasing guidelines.
* **Why it is useful:**
  AI-generated scripts typically suffer from monotone sentence lengths and academic stiffness. These micro-pivots introduce organic conversational rhythm.

---

### 4.4 The "Motivational Landing" Ending Formula (Identity-Flip Close)
* **What the PDF has:**
  A mandatory structural formula for concluding scripts cleanly without cheesy cliffhangers or aggressive subscribe begs:
  1. **Three short imperatives:** Restate the 3 core actionable takeaways, exactly one short sentence each.
  2. **Identity-flip declarative:** A final punchline that reframes the viewer's action into an identity shift.
  * *Example 1:* `"Cut the noise. Pick the one thing. Do it before lunch. You didn't waste the day. You actually owned it."`
  * *Example 2:* `"Stop scrolling. Start moving. Repeat tomorrow. That's not motivation — that's momentum."`
  * *Psychological principle:* **The viewer leaves feeling capable, not curious.**
* **What we currently have:**
  We currently have no formalized closing script pattern.
* **Why it is useful:**
  Leaves the viewer with maximum emotional payoff and high satisfaction, driving organic shares and channel authority.

---

### 4.5 Empirical Speech Velocity for Educational/Content Narration (2.6 WPS)
* **What the PDF has:**
  Extracts speech velocity from real-world viral channels:
  $$\text{Self-Help / Educational Speech Velocity} \approx 2.4 \text{ to } 2.8 \text{ words/sec} \quad (\text{Default: } 2.6 \text{ words/sec})$$
  Provides a calibrated duration-to-word count table:
  * `30s` $\rightarrow$ `~78 words`
  * `60s` $\rightarrow$ `~156 words`
  * `90s` $\rightarrow$ `~234 words`
  * `2 min` $\rightarrow$ `~312 words`
  * `5 min` $\rightarrow$ `~780 words`
  * `10 min` $\rightarrow$ `~1,560 words`
* **What we currently have:**
  Our `05_directors_cut_assembly_spec.md` sets the baseline at **2.2 words/sec** (geared toward cinematic dramatic dialogue with breathing pauses).
* **Why it is useful:**
  Educational YouTube essays, social media reels, and explainer content naturally move faster than dramatic cinema (2.6 wps vs 2.2 wps). Having this calibrated mode prevents explainer scripts from feeling sluggish.

---

### 4.6 Strict Script Negative Bans
* **What the PDF has:**
  A defined negative ban list for prose generation:
  * Never open with: `"In this video..."` or `"Today we're going to talk about..."`.
  * Never use sensationalist clickbait: `"INSANE"`, `"you won't believe"`, `"shocking truth"`.
  * Never use pseudo-guru jargon: `"manifest"`, `"vibration"`, `"alpha"`, `"high-value"`.
  * Never include sponsor copy, subscribe begs, or channel outro sign-offs inside the core prose.
* **What we currently have:**
  Pre-flight linters for equipment nouns (`tripod`, `dolly`), action budgeting, and actor closed lips, but no script-specific prose linters.
* **Why it is useful:**
  Prevents generative LLMs from reverting to stereotyped, cringe-inducing YouTube tropes.

---

## 5. Sound Design & Audio Prompting Mechanisms

### 5.1 Silent Video Diffusion Baseline (Voice-Drift Elimination)
* **What the PDF has:**
  Enforces that video diffusion prompts generate **strictly silent visuals**. Voiceover is completely decoupled and laid down in post (e.g. ElevenLabs or Gemini TTS) over the stitched video clips.
  * Warning noted in PDF: Generative video engines that attempt native voice generation suffer from severe **voice-drift failure modes**, where vocal timbre, accent, and pitch mutate between independent clip generations.
* **What we currently have:**
  Our default baseline in `05_directors_cut_assembly_spec.md` is Google Flow Native (with in-clip dialogue), while ElevenLabs and Gemini TTS are treated as modular switches.
* **Why it is useful:**
  Reinforces that for multi-clip serialized projects where vocal identity must remain 100% stable, external TTS laid down in post is significantly more robust than relying on in-video diffusion audio.

---

### 5.2 3-Track Decoupled Audio Prompting Syntax
* **What the PDF has:**
  Video prompts split sound design into three distinct lines with explicit guidance:
  * `SFX:` Single-shot discrete event cues tied to physical actions (*keyboard tap, phone vibrate, door creak, soft sigh*).
  * `Ambient:` Continuous acoustic wash (*light room tone, soft outdoor breeze, or "near-silence"*).
  * `Music:` Post-score reference with tempo/genre guidelines (*warm lo-fi / acoustic indie / soft electronic, ~70–95 BPM*).
* **What we currently have:**
  We use a single `Audio:` block (e.g. `Audio: diegetic foley of footsteps, low ambient hum, no background music`).
* **Why it is useful:**
  Separating SFX, Ambient, and Music into dedicated fields gives video and audio engines clearer isolation between discrete contact sounds and continuous room tone, while providing a clear blueprint for sound editors in post.

---

### 5.3 Reference-Only Script Header in Video Prompts
* **What the PDF has:**
  When passing narration context into a video generation prompt, it wraps the script lines in an explicit guardrail:
  ```text
  Script lines covered (REFERENCE ONLY — DO NOT include in Seedance submission):
  "[exact script text this chapter visualizes]"
  ```
  And in the negative prompt:
  ```text
  NEGATIVE PROMPT: ... text on screen, captions, UI elements, dialogue text, on-screen text, subtitles.
  ```
* **What we currently have:**
  In our external dialogue switches, we strip dialogue quotes from the prompt entirely.
* **Why it is useful:**
  If a creator or agent wants the video model to understand what the narration is talking about (so visuals match narrative context) without rendering captions or triggering lip-sync, the `(REFERENCE ONLY)` wrapper paired with an on-screen text ban achieves both goals cleanly.

---

## 6. Synthesis: High-Value Additions for Our Production Framework

| Domain | Mechanism from PDFs | Where to Integrate in Our Framework | Value Add |
|---|---|---|---|
| **Video Prompts** | `CAUSAL PALETTE:` Prop Bounding | `03_scenery_spec.md` & `05_directors_cut_assembly_spec.md` | Eliminates hallucinated props and messy background clutter. |
| **Video Prompts** | Timestamped Multi-Beat Sub-Prompts | `05_directors_cut_assembly_spec.md` | Enables long-take animation (Seedance 2.0 / Sora) without collapsing into single actions. |
| **Video Prompts** | 4-Beat Intra-Chapter Rhythm | `05_directors_cut_assembly_spec.md` | Algorithmic rhythm (`Daily` $\rightarrow$ `Hero` $\rightarrow$ `Metaphor` $\rightarrow$ `Reaction`) for high-retention pacing. |
| **Video Prompts** | 4 Match-Cut Continuity Handoffs | `05_directors_cut_assembly_spec.md` (Pillar 3) | Formalizes post-production cut points (Pose, Prop, Shape, Tone). |
| **Image Prompts** | 4 Thumbnail Modes (A/B/C/D) | New `thumbnails/` domain or sub-spec | Solves the missing high-CTR thumbnail generation requirement. |
| **Image Prompts** | Mobile Safe Zone & 200×112 px Test | New `branding/` or `thumbnails/` domain | Ensures visual legibility on mobile feeds. |
| **Image Prompts** | Geometric Expression Vocabulary | `02_character_spec.md` (Stylized/Animation section) | Prevents face warping in 2D, vector, and hybrid character models. |
| **Scripting / Plot** | 4 Signature Cold Open Patterns | `05_directors_cut_assembly_spec.md` (Scripting section) | Standardizes high-retention 5-second video hooks. |
| **Scripting / Plot** | Motivational Landing (Identity Flip) | `05_directors_cut_assembly_spec.md` (Scripting section) | Guarantees emotionally powerful, non-preachy conclusions. |
| **Scripting / Plot** | Calibrated 2.6 WPS (Explainer/Essay) | `05_directors_cut_assembly_spec.md` (Pacing Table) | Adds an optimized pacing profile for educational/essay content alongside 2.2 WPS cinema. |
| **Audio** | 3-Track Audio Prompt Separation | `04_cinematography_audio_spec.md` | Clearly separates discrete SFX, continuous room tone, and post-score BPM. |
