# Architectural Proposal: Multi-Variation Prompting Engine & Pluggable Style Registry
**Document ID:** `PROPOSAL-2026-MULTI-VAR-01`  
**Status:** 🟡 PROPOSED / READY FOR REVIEW  
**Scope:** Core Prompt Engineering, Multi-Engine Settings, Narrative Architectures, and Pluggable Style Modules (`styles/` Plugin Registry)  
**Target:** AI Video Production Framework (`production_framework/specs/`)

---

## 1. Executive Summary & Strategic Direction

Our current production framework (`production_framework/specs/`) was originally architected with a heavy emphasis on **cinematic live-action realism** (35mm film stock, anamorphic lenses, chiaroscuro lighting, subtle acting). However, real-world generative video production demands a **universal, multi-variation video producer** capable of seamlessly pivoting between diverse visual mediums:
1. **Photorealistic Live-Action Cinema** (Dramatic movies, gritty thrillers, documentaries).
2. **Commercial & High-End 3D CGI** (Apple-style product showcases, Pixar/Unreal Engine aesthetics).
3. **2D Anime & Hand-Drawn Cel** (Shonen action, Ghibli atmosphere, modern webtoon).
4. **Minimalist & Vector Storytelling** (Stick-figure hybrid, Kurzgesagt-style motion graphics, educational explainer essays).
5. **High-Paced Social / Ad Variations** (Punchy hooks, split-screen comparisons, dynamic retention pacing).

By synthesizing empirical prompt architectures from recent field experiments (including the `STICKMAN` long-form engines) with our foundational research (`research/synthesis/`), this proposal introduces four transformative architectural upgrades:
- **Upgrade 1:** Pluggable Style Plugin Registry (`styles/*.md` modular presets).
- **Upgrade 2:** Closed-Set Scene Scoping via `CAUSAL PALETTE` (Hard Anti-Hallucination Guardrail).
- **Upgrade 3:** Multi-Engine Temporal Pacing & Multi-Beat Prompting (Veo 3.1 vs. Seedance/Sora).
- **Upgrade 4:** Universal Script & Narrative Hook Architecture (4 Hook Archetypes & The Motivational Landing).
- **Upgrade 5:** 3-Track Decoupled Audio & Silence-Protected Diffusion Pipeline.

---

## 2. Upgrade 1: Pluggable Style Registry Architecture (`styles/` Plugins)

### 2.1 The Problem
Currently, visual styles are hardcoded into monolithic specifications (`01_visual_spec.md`). When switching from Live-Action to Anime or Stick-Figure, the agent must manually rewrite lighting physics, negative prompts, anatomical descriptors, and kinematic rules. If the user wants a new aesthetic (e.g. Claymation, Synthwave 80s, Vector Minimalist), there is no modular mechanism to plug it in.

### 2.2 Proposed Solution: Modular Style Plugins
Decouple visual style into self-contained, composable markdown definition files inside a new directory: `production_framework/styles/`.

```
production_framework/
└── styles/
    ├── style_manifest.json          ◄── Registry index mapping styles to supported features
    ├── live_action_cinema.md        ◄── 35mm, anamorphic lenses, biological skin textures
    ├── anime_cel_2d.md              ◄── Hand-drawn cel, bold outlines, flat color shading
    ├── cgi_stylized_3d.md           ◄── Subsurface scattering, ray-traced bounce, Unreal Engine 5
    ├── vector_stick_minimal.md      ◄── Pure white #FFFFFF canvas, 3px line-art, causal props
    ├── commercial_tabletop.md       ◄── Macro 100mm, rim highlights, high-gloss product grading
    └── stop_motion_clay.md          ◄── Fingerprint textures, stepped 12fps kinematics, armature
```

### 2.3 Universal Contract for a Style Plugin (`styles/<style_id>.md`)
Every style plugin must export 6 deterministic configuration and prompt blocks:

```markdown
# Style Plugin: [Style Name]
ID: [style_id]
Target Medium: [Live-Action | 2D Anime | 3D CGI | Vector/Minimalist | Stop-Motion]

## 1. Master Style Anchor String (Injected Verbatim into Prompts)
[50–70 words capturing the immutable visual DNA: line weight, lighting model, color palette, render engine]

## 2. Anatomical & Materiality Rules
- Skin/Surface: [e.g. Biological pores vs. flat cel fill with 1 shadow tone vs. plastic sheen]
- Eyes & Face: [e.g. Realistic micro-saccades vs. discrete 2D geometric state vocabulary]
- Outlines: [e.g. Zero outlines vs. bold 3px uniform stroke]

## 3. World & Environment Constraint
- Canvas/Background: [e.g. Deep volumetric 3D space vs. flat pure white #FFFFFF void]
- Lighting Model: [e.g. Motivated 3-point cinematic vs. ambient shadowless flat light]

## 4. Kinematic Grammar
- Motion Style: [e.g. Natural human biomechanics vs. stepped 12fps squash-and-stretch]
- Camera Constraints: [e.g. Optical dolly/crane vs. 2D linear virtual pan/zoom]

## 5. Causal Palette Rules
- Permitted Prop Geometry: [How objects must be described in this style]
- Trademark Abstraction: [How real-world items are abstracted to prevent copyright drift]

## 6. Mandatory Style Negative Clause
[Exact negative prompt tokens required to prevent drift away from this medium]
```

### 2.4 Example: `vector_stick_minimal.md` vs. `anime_cel_2d.md`

```carousel
```markdown
<!-- slide: vector_stick_minimal.md -->
### Plugin: Minimalist Vector / Stick-Figure Hybrid
- **Master Anchor:** "Stylized cartoon vector illustration animation. Minimalist stick-figure face (clean white oval head, two solid black vertical dot eyes, single-line mouth, no nose, no eyebrows) on a fully illustrated cell-shaded body. Bold consistent black outlines (~3px) throughout. One shadow tone per material, crisp highlights. Plain pure white #FFFFFF background throughout. Zero gradients, zero ambient occlusion."
- **Expression Vocabulary:** 
  - Friendly: Two oval dots, slight upturn curve
  - Shock: Two wide open black "o" rings, open "o" mouth
  - Overstimulated: Concentric line spirals replacing dot eyes
- **Negative Prompt:** "photorealistic, 3D render, realistic skin texture, pupils, eyebrows, nose, gradient shading, ambient occlusion, background scenery, floor lines, ground shadows."
```
<!-- slide: anime_cel_2d.md -->
### Plugin: Japanese Cel Animation (Modern Shonen/Ghibli)
- **Master Anchor:** "Authentic 2D hand-drawn Japanese anime aesthetic. Clean ink line-art with tapering stroke dynamics. Traditional cel shading with hard-edged split toning, warm keylight highlights, and subtle hand-painted watercolor background washes. Rich cinematic color grading, vibrant natural palette. 24fps motion cadence with dynamic pose-to-pose keyframing."
- **Facial Features:** Stylized almond eyes with expressive iris geometry and light catchers, clean nose crease, expressive anime mouth shapes.
- **Negative Prompt:** "3D CGI, live-action photography, plastic action figure, realistic skin pores, photoreal rendering, western comic halftones, messy linework."
```
````

---

## 3. Upgrade 2: Closed-Set Scene Scoping via `CAUSAL PALETTE`

### 3.1 The Problem
In multi-clip narrative generation, video diffusion models (Veo 3.1, Seedance, Sora) frequently hallucinate random objects in the scene. A character waking up in bed suddenly has random wall paintings, stray lamps, or morphing clutter that ruins continuity across shots.

### 3.2 Proposed Prompting Mechanism: The `CAUSAL PALETTE` Block
Borrowing the proven mechanism from the `STICKMAN` engine, every scenery and shot specification will support an explicit **`CAUSAL PALETTE:`** block.

1. **In Scenery & Shot Specs:**
   ```yaml
   causal_palette:
     - prop: "alarm_clock"
       primitive: "small rectangular digital alarm clock displaying '5:00 AM' in crisp line numerals"
     - prop: "coffee_mug"
       primitive: "cylindrical matte ceramic mug, solid dark navy, resting on desk surface"
   ```
2. **In the Compiled Video Prompt:**
   The prompt compiler deterministically renders:
   ```text
   CAUSAL PALETTE:
   - digital alarm clock: small rectangular digital alarm clock displaying '5:00 AM', no LED glow
   - coffee mug: cylindrical matte ceramic mug, solid dark navy
   
   [Timeline / Action text...]
   
   NEGATIVE PROMPT: ... no objects or props not explicitly listed in CAUSAL PALETTE, zero background clutter.
   ```
3. **Automated Linter Rule (L-15: Causal Scope Linter):**
   Flags any prompt where a prop is mentioned in the action block but omitted from the `CAUSAL PALETTE`, or where background nouns are unbounded.

---

## 4. Upgrade 3: Dual-Mode Temporal Engine Architecture (Veo vs. Sora/Seedance)

### 4.1 The Engine Disconnect
- **Google Veo 3.1 (Current Focus):** Excels at hyper-realistic physical lighting and subtle actor micro-expressions, but collapses when given multiple sequential actions. Requires **Single-Motion Law** (`1 Clip = 1 Micro-action`, 3s–8s).
- **Long-Take Engines (Seedance 2.0, Sora, Minimax):** Capable of generating continuous 10–15s shots featuring internal scene shifts, multiple beats, and hard cuts within a single prompt.

### 4.2 Proposed Dual-Mode Prompt Generation
Upgrade `05_directors_cut_assembly_spec.md` with an explicit engine target switch:

```
                          CREATOR PROJECT BRIEF
                                    │
                                    ▼
                     [TEMPORAL ENGINE SELECTOR]
                                    │
        ┌───────────────────────────┴───────────────────────────┐
        ▼                                                       ▼
[MODE A: VEO 3.1 ATOMIC SLICES]               [MODE B: LONG-FORM MONOLITHIC CHAPTERS]
• Target: Google Flow / Veo 3.1               • Target: Seedance 2.0 / Sora / Minimax
• Duration: 3s, 5s, 8s                        • Duration: 10s – 15s per chapter
• Rule: Strictly 1 Biomechanical Action       • Rule: 4–6 Timestamped Sub-Beats
• Format: Tier 2 Keyframe -> Tier 3 Motion    • Format: [00:00-00:05] Beat 1
• Continuity: Last-Frame Seed Chaining                  [00:05-00:09] Beat 2
                                                        [00:09-00:14] Beat 3
                                              • Continuity: 4 Match-Cut Handoff Vectors
```

### 4.3 Mode B Sub-Beat Prompting Template (For 10s–15s Generations)
```text
[CHAPTER METADATA]
Chapter ID: CH_01 | Target Duration: 14s | Engine: Seedance 2.0 / Sora

[SUBJECT & STYLE LOCKS]
SUBJECT LOCK: [Verbatim Master Subject DNA]
STYLE ANCHOR: [Verbatim Master Style Anchor from Active Plugin]
ENVIRONMENT LOCK: [Verbatim Background & Lighting Rule]

CAUSAL PALETTE:
[Explicit Prop Inventory]

[TIMELINE SUB-BEATS]
[00:00–00:04] DAILY_ACTION — Subject sits at desk, typing on keyboard. Camera: locked eye-level MCU. SFX: light keyboard clicks.
[00:04–00:07] REACTION — Extreme close-up on subject's face showing sudden realization. Camera: locked ECU. SFX: soft intake of breath.
[00:07–00:11] METAPHOR — Hard cut to split-screen comparison: Left half shows chaotic desktop, Right half shows organized workspace. Camera: static.
[00:11–00:14] HERO — Wide shot, subject stands up confidently, hands on hips. Camera: slow 5% push-in.

NEGATIVE PROMPT:
[Style Negative Clause] + [No objects outside CAUSAL PALETTE] + [No on-screen captions or UI text]

→ HANDOFF TO CH_02: Match-cut on character pose (hero standing stance). Cross-dissolve 0.5s in editor.
```

---

## 5. Upgrade 4: Universal Script & Narrative Hook Architecture

### 5.1 The Scripting Gap
Our framework currently has technical speech limits (2.2 words/sec) and breathing buffers, but lacks **narrative hook formulas** and **structural payoff patterns** for non-theatrical videos (e.g. explainer videos, commercials, video essays, product launches).

### 5.2 Adding the 4 Signature Hook Archetypes
Codify a formal hook engine into our scripting pipeline for the crucial first 20–30 seconds:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       THE 4 UNIVERSAL HOOK ARCHETYPES                       │
├──────────────────────┬──────────────────────────────────────────────────────┤
│ 1. PERSONAL EMPATHY  │ "Have you ever felt like [pain point]? I used to feel│
│                      │  the exact same way..." (Instant relatable rapport)  │
├──────────────────────┼──────────────────────────────────────────────────────┤
│ 2. DIRECT CHALLENGE  │ "Raise your hand if you've ever [relatable trap]...  │
│                      │  Yeah, same." (Disarms ego, commands attention)      │
├──────────────────────┼──────────────────────────────────────────────────────┤
│ 3. COUNTERINTUITIVE  │ "What if I told you [accepted wisdom] is actually    │
│    REVERSAL          │  completely wrong? Stick with me here." (Curiosity)  │
├──────────────────────┼──────────────────────────────────────────────────────┤
│ 4. DIRECT OBSERVATION│ "[Problem X] is ridiculously easy to start. But      │
│                      │  almost impossible to stop." (Observational truth)   │
└──────────────────────┴──────────────────────────────────────────────────────┘
```

### 5.3 The "Motivational Landing" Ending Formula
Replace weak generic outros (*"Don't forget to like and subscribe"*) with the mathematically proven **Identity-Flip Resolution**:
1. **Three Short Imperatives:** 3 concise actionable verbs (e.g. *"Focus the lens. Strip the noise. Build the prototype."*).
2. **Identity-Flip Declarative:** A concluding thesis sentence reframing physical action into a permanent identity shift (*"You didn't just save time. You took back control."*).
- **Guiding Axiom:** *The audience leaves feeling capable, not curious.*

### 5.4 Dual Speech Velocity Profiles
Expand our word-budgeting calculation beyond cinema:
* **Profile A (Dramatic Cinema & Emotional Commercials):** `2.0 – 2.2 words/sec` (Emphasizes dramatic weight, sighs, natural micro-pauses).
* **Profile B (Explainer, Essay, Dynamic Social & Tech):** `2.5 – 2.8 words/sec` (Emphasizes momentum, clarity, conversational drive).

---

## 6. Upgrade 5: 3-Track Decoupled Sound Architecture

### 6.1 Enhancing the Audio Specification
Currently, our prompts use a single composite line:  
`Audio: footsteps on wet gravel, distant sirens, no music.`

To achieve professional-grade post-production assembly and avoid confusing the AI diffusion engine's acoustic synthesis, we upgrade the prompt standard to **3 explicit audio sub-tracks**:

```text
SFX: [Single-shot discrete mechanical/physical actions: shoe squeak, lighter flick, glass clink]
AMBIENT: [Continuous spatial acoustic space: fluorescent light hum, rain against window, hollow room tone]
MUSIC_REF: [Post-score reference: genre, instrumentation, tempo, e.g. "Warm lo-fi piano, 78 BPM, contemplative"]
```

### 6.2 The Post-TTS Silence Protection Rule
When the project uses external speech engines (ElevenLabs, Gemini 3.8 Flash TTS):
- The video prompt's audio block **must explicitly purge voice directives**:  
  `Audio: diegetic foley and continuous room tone only. ZERO spoken dialogue, completely silent vocals.`
- This prevents the video diffusion model from trying to generate muffled or hallucinated speech that clashes with the external voice track in editing.

---

## 7. Step-by-Step Implementation Roadmap

```mermaid
flowchart TD
    subgraph Phase 1: Style Plugin Registry
        A[Create styles/ Directory] --> B[Implement styles/live_action_cinema.md]
        A --> C[Implement styles/anime_cel_2d.md]
        A --> D[Implement styles/cgi_stylized_3d.md]
        A --> E[Implement styles/vector_stick_minimal.md]
        A --> F[Implement styles/commercial_tabletop.md]
    end

    subgraph Phase 2: Spec Enhancements
        G[01_visual_spec.md: Link to styles/ Registry]
        H[03_scenery_spec.md: Add CAUSAL PALETTE Block]
        I[05_directors_cut_spec.md: Add Mode A/B Engine Switch]
        J[05_directors_cut_spec.md: Add Hook & Ending Formulas]
    end

    subgraph Phase 3: Linters & Skill Tooling
        K[L-15: Causal Palette Scope Linter]
        L[L-16: Style Plugin Validator Linter]
        M[Python Prompt Compiler: Multi-Style Injection]
    end

    Phase 1 --> Phase 2
    Phase 2 --> Phase 3
```

---

## 8. Summary of Proposed New Specifications & Files

| Proposed File Path | Purpose |
|---|---|
| `production_framework/styles/` | New home for pluggable visual style definitions. |
| `production_framework/styles/live_action_cinema.md` | Extracted & polished live-action cinematic master style. |
| `production_framework/styles/anime_cel_2d.md` | Japanese hand-drawn cel animation style plugin. |
| `production_framework/styles/cgi_stylized_3d.md` | Stylized 3D CGI / Unreal Engine style plugin. |
| `production_framework/styles/vector_stick_minimal.md` | Minimalist line-art & stick-figure explainer style plugin. |
| `production_framework/styles/commercial_tabletop.md` | High-gloss macro commercial advertising style plugin. |
| `production_framework/specs/06_script_and_narrative_spec.md` | Dedicated narrative spec for Hooks, Pacing, and Endings. |

---
*End of Proposal. Awaiting review and approval to proceed with Phase 1 scaffolding.*
