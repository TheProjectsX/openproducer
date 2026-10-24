# Raw Discussion 34: Narrative Pacing Intake, Script Breakdown & Temporal Action Budgeting

**Date:** 2026-10-24  
**Domain:** `directors_cut/` / `assembly/`  
**Status:** 💡 Active Architectural Consensus  
**Target Specification:** `production_framework/specs/05_directors_cut_assembly_spec.md`  

---

## 1. Step 0: The Creator Intake Interactivity Rule

### 1.1 The Golden Rule of Intake
The exact same story plot (e.g., *a detective finding a glowing briefcase in a rainy alley*) can be an 18-second hyper-paced social reel or a 2-minute moody slow-burn cinematic. 

**Rule Enforced:** The Agent **MUST straight up ask the creator first-hand** to clarify their desired target length, pacing, and clip budget if these are not already stated in their prompt. The agent must never blindly assume a 15s vs. 60s format.

### 1.2 The 3 Mandatory Intake Questions
When a creator brings a raw idea or script without pacing metadata, the agent pauses and asks:
1. **Target Duration / Clip Budget:** *"Are you aiming for a snappy 15–30s short/ad, a 45–60s narrative, or a longer 1–2 minute cinematic? (Or do you have a specific clip budget like 4–5 clips for today's credits)?"*
2. **Pacing & Energy (Tempo Profile):**
   - **Hyper / Viral (3–4s clips):** Rapid cuts, punchy, high-momentum, immediate visual payoff.
   - **Dynamic Commercial (5s clips):** Engaging rhythm, balanced storytelling, punchy transitions.
   - **Dramatic Cinema (8s clips):** Deliberate pacing, emotional weight, character breathing pauses.
   - **Atmospheric Slow-Burn (10s clips):** Lingering camera, meditative immersion, expansive world-building.
3. **Dialogue / Audio Profile:** Is this dialogue-driven (characters speaking on screen), voiceover-narrated, or pure visual cinema with foley & score?

---

## 2. Pillar 1: Mathematical Word-to-Time Pacing Calculation

### 2.1 The Conversational Speech Speed Standard
Human conversational speech naturally flows at **130 to 150 words per minute**, which translates to:
$$\text{Speech Velocity} \approx 2.17 \text{ to } 2.50 \text{ words per second} \quad (\text{Baseline: } 2.2 \text{ words/sec})$$

### 2.2 The Spoken Word Economy per Clip Duration
Overloading spoken words inside a short video clip causes AI lip-sync models to frantically accelerate mouth movements ("auctioneer syndrome") or cut off sentences mid-word.

| Clip Duration | Max Spoken Words | Safe Sweet Spot | Recommended Punctuation / Cadence |
|---|---|---|---|
| **3 Seconds** | 6 words | 3 – 5 words | 1 short phrase. Bilabial rest at end. |
| **4 Seconds** | 8 words | 5 – 7 words | 1 sentence. Clean terminal closure. |
| **5 Seconds** | 11 words | 7 – 9 words | 1–2 short sentences. Comma/breath pause. |
| **8 Seconds** | 18 words | 12 – 15 words | 2 sentences. Dramatic pause in middle. |
| **10 Seconds** | 22 words | 16 – 20 words | Complete dialogue exchange or thought arc. |

> [!CRITICAL]
> **Punctuation Breathing Buffer:** In any clip with dialogue, at least **0.8 to 1.2 seconds of buffer time** (silence before speech starts, and silence after speech concludes) must be reserved so the character does not start talking on Frame 1 or get cut off on the terminal frame.

---

## 3. Pillar 2: Action Budgeting & The "Single-Motion Law"

### 3.1 The Diffusion Multi-Action Collapse Trap
Generative video diffusion models (Veo 3.1, Sora, Kling, Runway) lack procedural logic. If a prompt demands multiple sequential discrete actions:
> ❌ *"Detective enters the door, looks at the desk, walks across the room, picks up the phone, and speaks into it."*

The model attempts to blend all latent vectors simultaneously, resulting in:
- Teleporting across the room.
- Hands morphing into phones.
- Multiple duplicate characters.

### 3.2 The Single-Motion Law
**Every sliced clip is budgeted for exactly ONE primary motion vector:**
1. **ONE Primary Biomechanical Action:** (e.g. *crouching down to unlatch the case*, OR *raising the binoculars to eyes*, OR *speaking while subtly turning head*).
2. **ONE Continuous Optical Kinematic:** (e.g. *slow tracking push-in*, OR *locked-off MCU*, OR *continuous 90-degree lateral arc*).

If a narrative beat contains 3 sequential actions, it **MUST be sliced into 3 separate clips**.

---

## 4. The Director's Scratchbook Data Contract (`scratchbook.md`)

Before generating individual shot files or prompts, the engine compiles the creator's vision into a unified **Director's Scratchbook**.

```markdown
# Director's Scratchbook: [Project Title]
**Target Duration:** [e.g. 24 Seconds]  
**Pacing Profile:** [Dynamic Commercial (5s baseline)]  
**Clip Budget:** 5 Clips  
**Audio Archetype:** [Dialogue + Ambient Foley + Low Score]

| Clip ID | Target Duration | Story Beat & Dramatic Goal | Spoken Dialogue / VO (Word Count) | Single Budgeted Action | Camera Kinematics | Chaining Dependency |
|---|---|---|---|---|---|---|
| `clip_01` | 5s | Establish desolate alley & arrival | None (Foley/Score only) | Detective steps into puddle, halts | Low-angle tracking forward to lock | None (Establishing) |
| `clip_02` | 5s | Discover glowing briefcase | "There it is." (3 words) | Spotting case, crouching down | Slow descending crane/push | Terminal cut from `clip_01` |
| `clip_03` | 5s | Unlatching the case | None (Heavy mechanical latches) | Hands flick chrome latches | Macro 100mm tight locked-off | Match cut on hands |
| `clip_04` | 5s | The reveal & reaction | "My god... it's real." (4 words) | Lid opens, blinding gold glow | MCU eye-level locked-off | Direct lighting match |
| `clip_05` | 4s | Payoff & closing | None (Music crescendo) | Light engulfs frame into white | Rapid push into radiance | Terminal velocity match |
```
