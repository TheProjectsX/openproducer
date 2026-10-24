# Discussion 43: Google Flow Durations, Pacing Profiles & The Mandatory Context Shift Rule

**Date:** 2026-10-24  
**Context:** Director's Cut & Assembly Engine (Phase 6 Architecture Expansion).  
**Participants:** Creator & Antigravity AI Video Production Framework  

---

## 1. Executive Summary & New Architectural Decisions

During analysis of visual sceneries, pacing fatigue, and text/dialogue integration, three critical rules were established:

1. **Google Flow Native Duration Standard:**  
   Google Flow strictly supports custom generation lengths of **4s, 6s, 8s, and 10s**. All framework linters, scratchbooks, and clip generators must lock to these discrete durations. Arbitrary durations (e.g. 3s, 5s, 7s) are officially purged from Flow native compilation.
2. **Creator Pacing Choice (Dynamic Sync vs. Slow-Burn Monologue):**  
   Creators choose between:
   - *Dynamic Sync (4s–6s cuts):* High-retention, rapid cuts, tight audio sync, and frequent cutaway inserts.
   - *Slow-Burn Monologue (8s–10s takes):* Unhurried, atmospheric takes with slow, continuous optical kinematics (slow creeping push-in) to preserve emotional weight in philosophical or monologue-heavy scenes.
3. **The Mandatory Context Shift Rule:**  
   Regardless of whether the creator selected a slow-burn or dynamic style, **whenever the narrative script undergoes a contextual shift (e.g. location change, action shift, incoming shock, perspective flip), the visual context MUST cut to a new shot.** An AI video cannot linger on a stale visual context when the story has moved forward.
4. **The 3 Visual Beat Archetypes:**  
   To prevent static sceneries and allow text/spoken words to pop:
   - **Type A: Scene Shot (4s–10s):** Primary subject action and spatial cinematography.
   - **Type B: Macro Insert (4s):** Tight focus on tactile props, locks, clocks, or environmental details.
   - **Type C: Graphic / Text Plate (4s):** Stylized kinetic typography or 2D graphic art highlighting chilling dialogue or pivotal phrases.

---

## 2. Google Flow Native Durations & Word Economy

Google Flow (Veo 3.1) supports four discrete duration tiers. Slicing calculations are locked to these values:

| Flow Duration | Recommended Word Limit | Max Spoken Duration | Pacing Function |
|---|---|---|---|
| **4 Seconds** | 6 – 8 words | 2.5s – 3.0s | Rapid cuts, macro inserts, kinetic text plates, viral punchlines |
| **6 Seconds** | 10 – 12 words | 4.0s – 4.5s | Standard narrative dialogue, motivated reactions, moderate actions |
| **8 Seconds** | 14 – 16 words | 5.5s – 6.5s | Dramatic dialogue, multi-sentence beats, steady continuous motion |
| **10 Seconds** | 18 – 20 words | 7.5s – 8.5s | Monologues, slow-burn atmospheric establishing shots, lingering cinema |

*Rule:* All dialogue clips must retain at least **0.8s to 1.5s of total silence buffer** (pre-roll and post-roll) to guarantee clean bilabial resting closures.

---

## 3. Pacing Profile Intake: Dynamic Sync vs. Slow-Burn Monologue

During creator intake, if the pacing style is ambiguous, the Agent must present the choice:

```
                          PACING STYLE INTAKE
                                   │
                  ┌────────────────┴────────────────┐
                  ▼                                 ▼
       [STYLE 1: DYNAMIC SYNC]           [STYLE 2: SLOW-BURN MONOLOGUE]
       • Fast-paced 4s–6s clips          • Atmospheric 8s–10s takes
       • Rapid cuts & dopamine resets    • Lingering optical camera kinematics
       • Frequent Type B/C inserts       • Deep emotional focus, zero rush
       • Ideal for: Shorts, Reels,       • Ideal for: Soliloquies, essays,
         horror hooks, commercial hype     reflective arthouse, deep cinema
```

---

## 4. The Mandatory Context Shift Rule

Even in Style 2 (Slow-Burn Monologue), a single shot cannot span two conflicting narrative states.

### 4.1 What Constitutes a Context Shift?
A Context Shift occurs when the script crosses any of these narrative thresholds:
1. **Spatial / Spatial Boundary Shift:** Moving from inside a room to outside, or focusing from the whole room to the door lock.
2. **Action / Causality Shift:** Shifting from listening to a phone $\rightarrow$ hearing sudden knocks $\rightarrow$ peering through a peephole.
3. **Dialogue / Revelation Shift:** A calm conversation is shattered by an alarming revelation or supernatural whisper.
4. **Speaker / Perspective Shift:** Dialogue switches to an external entity, phone caller, or distinct character.

### 4.2 The Rule
> **"If the narrative context changes, the visual context MUST change."**  
> Under no circumstances may a video prompt attempt to hold an old scene context across a narrative boundary. The director engine must immediately trigger a cut, transitioning to a new Type A scene angle, a Type B macro insert, or a Type C kinetic text plate.

---

## 5. The 3 Visual Beat Archetypes & The Anti-Stagnation Law

The core governing aesthetic principle is **The Anti-Stagnation Law**: *Avoid sticking too long in a single visual angle or static viewpoint.* Depending on narrative weight, pacing rhythm, and spoken line length, the 3 visual beat archetypes are dynamically timed:

### 5.1 Type A: Scene Shot (4s, 6s, 8s, 10s)
- **Focus:** Primary subject in their motivated environment.
- **Kinematics:** Single optical vector (e.g. slow push-in, subtle eye-level track).
- **Prompt Example:** Medium close-up of subject listening to phone in dark room.

### 5.2 Type B: Macro Insert (4s, 6s, or 8s)
- **Focus:** Isolated physical prop or environmental reaction.
- **Narrative Function:** Highlights physical tension (e.g. wall clock at 2:17 AM, door deadbolt vibrating, smartphone display glowing).
- **Duration Flexibility:** 4s for rapid tactile shocks; 6s–8s when holding suspense or capturing sustained physical motion (e.g. slow turning door latch).
- **Benefit:** Decouples complex multi-beat actions into crisp, unhurried micro-shots.

### 5.3 Type C: Graphic / Text Plate (4s, 6s, or 8s)
- **Focus:** Stylized kinetic typography or bold 2D graphic art.
- **Narrative Function:** Highlights chilling spoken phrases or pivotal dialogue directly on screen.
- **Duration Flexibility:** 4s for short punchy 4–6 word hooks; 6s–8s for longer multi-sentence revelations with breathing room.
- **Diffusion Advantage:** Generated as an isolated graphic shot against the locked canvas texture, guaranteeing razor-sharp letterforms without corrupting character latents.
