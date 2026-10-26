# Specification: `cinematography_audio/` Domain (Optics, Kinematics & Soundscapes)

**Status:** ✅ FINALIZED  
**Domain:** `cinematography_audio/`  
**Target Engines:** Google Flow (Veo 3.1, Imagen 4, Gemini Omni Flash)

---

## 1. Domain Scope & Philosophy

The `cinematography_audio/` domain governs the behavior of the virtual camera in 3D spacetime and orchestrates the embedded dual-stream audio synthesis (spoken dialogue, tactile foley, spatial ambience, and background soundtrack). It translates static world assets into dynamic, executable video prompts.

### Core Architectural Axioms:
1. **Kinematic Purity:** Describe optical physics, trajectory vectors, and camera angles—never physical camera equipment.
2. **Biomechanical Restraint:** Spoken dialogue must enforce anatomical limits to prevent the diffusion "Muppet Mouth" glitch.
3. **Multi-Track Acoustic Mixing:** All sound design is treated as a 4-tier virtual soundboard, balancing vocal clarity, tactile foley, spatial acoustics, and soundtrack levels within the prompt text.

---

## 2. Shot Framing Scales & Lens Optics Matrix

### 2.1 Standard Framing Scales

| Framing Acronym | Full Name | Semantic Framing Boundary | Narrative Function |
|---|---|---|---|
| **ECU** | Extreme Close-Up | Isolated detail (eyes, watch dial, ignition button) | Hyper-intimate intensity, macro texture, suspense |
| **CU** | Close-Up | Full face or hero product filling frame | Emotional connection, facial micro-expressions |
| **MCU** | Medium Close-Up | Chest up to head (standard dialogue frame) | Primary dialogue delivery, interpersonal tension |
| **MS** | Medium Shot | Waist up to head | Action delivery, physical tool/prop interaction |
| **WS** | Wide Shot | Full human figure from head to toe with immediate space | Subject-environment relationship, physical staging |
| **EWS** | Extreme Wide Shot | Landscape dominates; human/vehicle is small | Vast scale, isolation, epic world establishment |
| **OTS** | Over-the-Shoulder | Foreground shoulder/head framing secondary subject | Conversational geography, spatial confrontation |

### 2.2 Prime Lens Focal Length Directory

| Lens Category | Focal Length | Optical Characteristics | Best Use Cases |
|---|---|---|---|
| **Ultra-Wide Cine** | `14mm – 24mm` | Dynamic perspective distortion, exaggerated depth, expanded horizon | High-speed automotive chases, colossal architecture, epic landscapes |
| **Street Prime** | `35mm` | Natural human peripheral vision, subtle environmental context | Cinematic documentary, gritty urban action, music videos |
| **Standard Prime** | `50mm` | Zero optical distortion, true 1:1 human eye geometry | Classical cinema dialogue, neutral realism, drama |
| **Portrait Prime** | `85mm` | Compressed background perspective, creamy subject-isolating bokeh | High-stakes dialogue, character close-ups, emotional beats |
| **Macro Prime** | `100mm` | Extreme 1:1 magnification, razor-thin focal plane, edge-to-edge sharpness | Commercial tabletop luxury, mechanical timepieces, liquid physics |

---

## 3. Kinematic Trajectory Engine & Rules

### 3.1 The "Single Camera Verb" Principle
Video diffusion models (Veo 3.1, Kling, Runway) degrade into spatial warping if prompted with multiple sequential camera actions (*"starts wide, cuts to close up, then pans left"*). Prompts must define **one fluid, unbroken kinematic trajectory** across the clip duration.

### 3.2 The Equipment Noun Hallucination Trap
Diffusion engines treat physical hardware words as visible geometry. Including equipment nouns causes the model to render literal cranes, tripods, or camera bodies inside the scene pointed at the subject.

#### Forbidden Noun Dictionary & Kinematic Replacements:

| ❌ STRICTLY FORBIDDEN (Hardware Noun) | ✅ REQUIRED FLOW DIRECTIVE (Kinematic Adjective/Verb) |
|---|---|
| `on a tripod` / `locked on tripod` | `Locked-off eye-level framing, completely static shot with zero camera movement` |
| `dolly track` / `camera on dolly` | `Smooth linear push-in toward the subject` or `smooth lateral tracking shot` |
| `crane rig` / `jib arm` | `Fluid vertical crane-up sweeping diagonally above the subject` |
| `drone shot` / `aerial drone` | `High-altitude bird's-eye perspective tracking downward` |
| `gimbal` / `steadicam` | `Smooth floating eye-level tracking camera maintaining perfect stability` |
| `camera rig` / `shaky cam` | `Visceral handheld camera cadence with subtle organic drift` |

---

## 4. Advanced Optical Recipes

### Recipe 1: Continuous 360° Wrap-Around Orbit with Speed Ramping
- **Use Case:** High-impact commercial product showcases, vehicle reveals, heroic character introductions.
- **Formula:**
  ```text
  Shot on a [Focal Length] lens at [f-stop] with shallow depth of field. The camera perspective initiates in a [Framing Scale] centered on [Subject Front], then smoothly accelerates into a continuous 360-degree orbital wrap-around trajectory sweeping dynamically around the subject in an unbroken arc. As it whips past the side profile, rotational motion blur sweeps the background while maintaining tack-sharp focal lock on [Key Detail]. Upon completing the rotation, the camera executes a dramatic optical speed-ramp deceleration, punching into an extreme macro angle and snapping into an absolute, vibration-free lock on [Hero Feature].
  ```

### Recipe 2: Ground-Skim Pursuit to Dynamic Whip
- **Use Case:** High-speed motorsport, combat pursuit, athletic sprints.
- **Formula:**
  ```text
  Shot on a 24mm anamorphic prime lens at f/2.8 with dramatic shallow depth of field. The sequence initiates in an extreme low-angle tracking shot positioned mere inches above the ground, tracking parallel at high velocity alongside [Subject Component], with [Environmental Particles: water spray/sparks/smoke] violently exploding into frame. The camera executes a fluid, dynamic crane-up and lateral rotational whip across [Subject Body], stabilizing into a low-angle leading perspective tracking backward at matched speed as [Lighting Flares] reflect off the surface.
  ```

### Recipe 3: The Hitchcock Dolly Zoom (Vertigo Effect / Zolly)
- **Use Case:** Psychological terror, cosmic dread, earth-shattering narrative revelations.
- **Formula:**
  ```text
  Shot on a 35mm anamorphic prime lens at f/2.0 with shallow depth of field. The sequence initiates in a medium close-up framing locked onto [Subject Face/Object], keeping [Subject] locked at the exact same size and viewport framing throughout. The camera executes a dramatic optical dolly zoom vertigo effect: the perspective physically tracks backward smoothly while rapidly zooming in with telephoto optical compression, causing the background [Vault/Environment] to violently stretch, warp, and expand backward into terrifying, boundless perspective scale.
  ```

### Recipe 4: The Optical Rack Focus (Z-Axis Focal Pull)
- **Use Case:** Dramatic handoff of narrative attention, betrayal reveals, clue discovery.
- **Formula:**
  ```text
  An optical rack focus shot on an 85mm cine prime lens at f/1.8 with extreme shallow depth of field. The camera remains completely static. The sequence initiates with a tack-sharp focal lock on the immediate foreground: [Foreground Subject A], while [Background Subject B] is heavily blurred into creamy circular bokeh. Midway through the shot, without moving the camera, the focal plane smoothly and continuously pulls deeper into the frame, causing [Foreground Subject A] to defocus into soft blur as [Background Subject B] snaps into razor-sharp optical clarity.
  ```

---

## 5. Spoken Dialogue & Natural Lip-Sync Architecture

### 5.1 The "Muppet Mouth" Glitch & Biomechanical Root Cause
Diffusion models over-index on speech presence tokens, exaggerating jaw movement into wide, unnatural gaping (dropping the chin 3x too low and stretching mouth corners). Authentic human conversation uses tight mandibular control (5–8mm jaw travel) and resting bilabial closures.

### 5.2 The 4-Step Biomechanical Restraint Protocol

```
┌────────────────────────────────────────────────────────┐
│  STEP 1: Locked-off MCU Framing                        │
│  (Zero camera movement prevents facial geometry drift) │
└──────────────────────────┬─────────────────────────────┘
                           │
┌──────────────────────────▼─────────────────────────────┐
│  STEP 2: Biomechanical Restraint Keywords             │
│  ("relaxed jaw, minimal jaw displacement, subtle lip   │
│   articulation, restrained mouth movement")            │
└──────────────────────────┬─────────────────────────────┘
                           │
┌──────────────────────────▼─────────────────────────────┐
│  STEP 3: Controlled Attribution Syntax                 │
│  ("speaks in a calm, measured undertone: \"...\"")     │
└──────────────────────────┬─────────────────────────────┘
                           │
┌──────────────────────────▼─────────────────────────────┐
│  STEP 4: Punctuation Cadence Hack                      │
│  (Periods "." force resting mouth closures; commas "," │
│   force micro-breaths. Max 1-2 short sentences.)       │
└────────────────────────────────────────────────────────┘
```

### 5.3 Standard Production Dialogue Template
```text
A locked-off eye-level medium close-up of [Subject description]. Shot on an 85mm portrait prime lens at f/2.0 with shallow depth of field. The camera remains completely stationary, maintaining sharp focus on their face. The jaw is completely relaxed. With subtle, restrained lip articulation and minimal jaw displacement, they speak in a [tone: calm, measured / cold, hushed / tense] undertone: "[Sentence one.] [Sentence two.]" The mouth opens subtly without wide stretching, closing naturally into a resting position between pauses, accompanied by subtle eye micro-expressions. Audio: [Tactile Foley], [Ambient Room Tone], [Character close-mic vocal delivery], [Background Music Directive].
```

---

---

## 6. The 3-Track Structured Audio Syntax & Virtual Soundboard Mix

Video prompts synthesize sound natively in Google Flow (Veo 3.1). Trailing audio blocks must not be written as loose, run-on sentences. They must adhere to the standardized, semicolon-delimited **3-Track Virtual Soundboard Hierarchy**:

$$\mathbf{Audio:\ SFX:\ [Foley];\ Ambience:\ [Room\ Tone];\ Dialogue:\ [Spoken\ Attribution\ |\ None];\ Music:\ [Score\ Directive].}$$

```
┌────────────────────────────────────────────────────────────────────────┐
│                   3-TRACK AUDIO PROMPT ARCHITECTURE                    │
├────────────────────┬───────────────────────────────────────────────────┤
│ 1. SFX (Foley)     │ High-frequency tactile impacts & physical contact │
│                    │ (metal clicks, cloth rustle, keyboard clatter)    │
├────────────────────┼───────────────────────────────────────────────────┤
│ 2. Ambience (Bed)  │ Low-frequency & broadband spatial acoustic space  │
│                    │ (60Hz server hum, quiet room tone, rain on glass) │
├────────────────────┼───────────────────────────────────────────────────┤
│ 3. Dialogue (Voice)│ Mid-frequency vocal band (300Hz–3.5kHz) with      │
│                    │ locked Acoustic Anchor Key & biomechanical limits │
├────────────────────┼───────────────────────────────────────────────────┤
│ 4. Music (Score)   │ Mode A (Dialogue-Protected) | Mode B (Upfront)    │
│                    │ Mode C (Diegetic: no background music)            │
└────────────────────┴───────────────────────────────────────────────────┘
```

### 6.1 Standard Production Prompt Trailing Audio Example
```text
Audio: SFX: tactile mechanical keyboard keystrokes, soft ceramic mug set down on desk; Ambience: low steady hum of workstation cooling fans, quiet studio room tone; Dialogue: the presenter speaks in his consistent, calm, resonant low-pitched baritone voice: "Stop prompting blindly. Start directing with engineering precision." with relaxed jaw and resting mouth closure; Music: no background music, zero score.
```

### 6.2 Music Operating Modes

#### Mode A: Dialogue-Protected Score (Subtle Bed)
- **Constraint:** Must not compete with human speech frequencies (300Hz–3kHz).
- **Mandatory Directive:** Must specify `low-in-the-mix`, slow tempo, specific acoustic instruments (cello pad, sparse piano), and explicitly ban drums: `zero drums or percussion, leaving voice frequencies clean and intelligible`.

#### Mode B: Upfront High-Energy Score (Soundtrack-Driven)
- **Constraint:** Music is the primary emotional driver; visuals synchronize to tempo.
- **Mandatory Directive:** Must specify exact BPM, rhythm, instrumentation, and dynamic transitions (e.g., `driving 128 BPM electronic synthwave track featuring a punchy 808 kick, pulsing bassline, and deep sub-bass drop`).

#### Mode C: Pure Diegetic Cinema (No Music / Multi-Stem Clean Master)
- **Constraint:** Absolute acoustic realism; zero score (essential for post-production stem mixing in NLEs).
- **Mandatory Directive:** End audio section with the strict terminator: `no background music, zero score`.

---

## 7. Dual-Track Speech Velocity & Temporal Budgeting

Generative audio engines operate on radically different speech velocities. Treating native video audio and external neural TTS with the same word rate causes severe dialogue cutoff and duration overflow.

### 7.1 Velocity Standards by Audio Pathway

| Audio Synthesis Pathway | Speech Velocity | Recommended Word Sweet Spot | Absolute Max Words | Guaranteed Silence Buffer |
|---|---|---|---|---|
| **Pathway A: Native In-Video Audio (Veo 3.1)** | **$\approx 1.2$ to $1.5$ Words/Sec**<br>*(Deliberate, unhurried cadence)* | • **4s Clip:** 3 – 5 words<br>• **6s Clip:** 7 – 9 words<br>• **8s Clip:** 11 – 13 words<br>• **10s Clip:** 15 – 18 words | • 4s: 6 words<br>• 6s: 10 words<br>• 8s: 14 words<br>• 10s: 19 words | **$\ge 1.0\text{s}$ Pre-roll**<br>**$\ge 1.0\text{s}$ Post-roll** |
| **Pathway B: External Narration (ElevenLabs / Gemini TTS)** | **$\approx 2.17$ to $2.50$ Words/Sec**<br>*(Conversational human pacing)* | • **4s Clip:** 5 – 7 words<br>• **6s Clip:** 9 – 11 words<br>• **8s Clip:** 13 – 16 words<br>• **10s Clip:** 17 – 20 words | • 4s: 8 words<br>• 6s: 12 words<br>• 8s: 18 words<br>• 10s: 22 words | **$\ge 0.5\text{s}$ Pre-roll**<br>**$\ge 0.5\text{s}$ Post-roll** |

### 7.2 The Pre/Post-Roll Silence Buffer Rule
Every dialogue clip—regardless of pathway—**must preserve dedicated silence buffers**:
1. **Pre-Roll Silence:** Zero speech on Frame 1. Character takes a micro-breath before speaking (~0.5s–1.0s).
2. **Post-Roll Silence:** Speech concludes at least 0.8s–1.2s prior to the terminal cut. Characters must never speak across the cut boundary.

---

## 8. The `(REFERENCE ONLY)` Non-Render Guardrail (Anti-Subtitle Glitch)

### 8.1 The Burned-In Text Failure Mode
When scene backstory, character motivations, or dialogue scripts are injected into visual prompts without containment, diffusion models frequently hallucinate and burn **literal yellow/white subtitles, lower-third banners, captions, or watermark text** directly into the video pixels.

### 8.2 The Non-Render Wrapper Standard
All directorial context and script notes embedded in prompt text must be encapsulated inside the **Reference-Only Header**:

```text
[SCENE BEAT CONTEXT (REFERENCE ONLY — DO NOT RENDER SUBTITLES OR WORDS ON SCREEN)]:
Subject realizes the security feed timestamp is from two minutes in the past.
```

### 8.3 Mandatory Anti-Subtitle Negative Invariant
Every video prompt must include the mandatory negative clause:
```text
NEGATIVE PROMPT: subtitles, closed captions, burned-in text, lower thirds, speech bubbles, watermark, floating words, typography, status overlay, text artifacts.
```

---

## 9. Multi-Track Stem Assembly Architecture (`audio_stems.md`)

When videos are exported from Flow for professional assembly in timeline editing software (CapCut, Premiere Pro, DaVinci Resolve), the project exports a standardized **Audio Stem Manifest** (`audio_stems.md`):

```markdown
# Audio Stem Assembly Manifest
**Project:** [project_id]  
**Master Frame Rate:** 24 fps | **Audio Sample Rate:** 48 kHz / 24-bit WAV

## Timeline Track Hierarchy:
- **Track A1 (Dialogue Master):** Primary voice track (Native Veo extracted audio OR external TTS stems). Normalized to -14 LUFS (Online) / -23 LUFS (Broadcast).
- **Track A2 (Foley SFX):** Discrete contact sound effects aligned to visual contact keyframes (footsteps, mechanical switches, paper rustle).
- **Track A3 (Spatial Ambience):** Continuous, unbroken room tone / atmospheric bed bridging cuts and preventing dead-air dropouts.
- **Track A4 (Score / Music Bed):** Background score with automatic sidechain compression ducking (-14dB attenuation during Track A1 vocal activity).
```

---

## 10. Pre-Flight Linters (Cinematography & Audio)

Before compiling prompts into Google Flow, the automated validator enforces these validation gates:

### Rule L-07: Equipment Noun Prohibition
- **Check:** Prompt MUST NOT contain any of: `tripod`, `dolly`, `crane`, `jib`, `rig`, `drone`, `gimbal`, `steadicam`, `slider`, `camera body`.
- **Error Message:** `L-07 VIOLATION: Hardware noun detected. Replace with kinematic trajectory directive.`

### Rule L-08: Dialogue Biomechanical Restraint Enforcement
- **Check:** Any prompt containing spoken dialogue (`"..."`) MUST include at least two biomechanical restraint tokens (`minimal jaw displacement`, `subtle lip articulation`, `relaxed jaw`, `subtle mouth movement`, `resting mouth closure`).
- **Error Message:** `L-08 VIOLATION: Dialogue detected without biomechanical mouth restraint tokens. Risk of Muppet Mouth distortion.`

### Rule L-09: Dialogue & Audio Clutter Conflict
- **Check:** If spoken dialogue is present, music directives MUST NOT contain energetic rhythm words (`heavy drums`, `fast tempo`, `upbeat beat`, `drum beat`) without the `low-in-the-mix` modifier.
- **Error Message:** `L-09 VIOLATION: Aggressive music detected during dialogue. Protect vocal clarity with Mode A (Dialogue-Protected) or Mode C.`

### Rule L-16: Native Veo 3.1 Word Budget Linter
- **Check:** If generation pathway is Pathway A (Native Flow Audio), word counts must not exceed native thresholds (Max 5w for 4s, Max 9w for 6s, Max 13w for 8s, Max 18w for 10s).
- **Error Message:** `L-16 VIOLATION: Spoken word count exceeds native Veo 3.1 speech velocity (~1.2-1.5 wps). Risk of mid-sentence dialogue clipping.`

### Rule L-17: Anti-Subtitle Invariant Linter
- **Check:** Any prompt containing narrative context or script lines MUST include the negative subtitle clause (`subtitles, closed captions, burned-in text, lower thirds, watermark`).
- **Error Message:** `L-17 VIOLATION: Missing anti-subtitle negative clause. Risk of burned-in caption hallucinations.`

### Rule L-18: 3-Track Structured Audio Syntax Linter
- **Check:** The trailing audio block MUST adhere to structured semicolon-delimited syntax (`Audio: SFX: ...; Ambience: ...; Dialogue: ...; Music: ...`).
- **Error Message:** `L-18 VIOLATION: Audio block is unstructured. Enforce 3-track structured audio syntax.`

