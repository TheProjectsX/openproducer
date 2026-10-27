# Discussion 59: OpenProducer Naming & Autonomous Hybrid Pacing Architecture

**Date:** October 27, 2026  
**Context:** Finalizing architectural naming consensus and establishing the Autonomous Hybrid Pacing & Keyframe Reuse rules for script slicing.  
**Target Platform:** Google Flow (Veo 3.1, Imagen 4, Gemini Omni Flash)

---

## 1. Official Framework & Tooling Identity: OpenProducer (`openproducer`)

- **Name Consensus:** The agent skill and future CLI automation suite are officially branded as **`OpenProducer`** (CLI executable / package namespace: `openproducer`, e.g. `npx openproducer`).
- **Deprecated Working Names:** `video-skill`, `@theprojectsx/video-skill`.

---

## 2. Autonomous Hybrid Pacing & Keyframe Reuse Architecture

### A. The Creator UX Law (Zero Jargon Burden)
- Creators should never be forced to micromanage cinematography techniques (J/L cuts, A-B-A keyframe anchors, 30° contrast rules, single-hop extensions).
- **The Rule:** The Agent **must autonomously determine and apply** optimal pacing, transitions, and keyframe reuse during script breakdown and slicing, **unless the creator explicitly specifies otherwise**.

---

### B. The 3 Autonomous Directorial Decisions

#### 1. The A – B – A Returning Keyframe Anchor (Zero-Drift Continuity)
- **Problem:** Reusing the same starting keyframe image back-to-back causes a "snap-back / rewind" glitch because the subject's pose snaps back to Frame 0.
- **Autonomous Solution:** When a character returns to a previously established location/pose after a cutaway or reaction insert:
  - `Shot 1 (Actor at desk):` Conditioned on `keyframe_A.png`.
  - `Shot 2 (Macro Insert / Reaction):` Conditioned on `keyframe_B.png` (clock, hand, prop, or listening partner).
  - `Shot 3 (Actor at desk again):` **Autonomously reuse `keyframe_A.png`!**
- **Benefit:** Shot 2 acts as a cognitive palate cleanser; reusing `keyframe_A.png` for Shot 3 guarantees 1,000% environment, wardrobe, and lighting fidelity with zero generation drift.

---

#### 2. Hybrid Pacing (Preventing Cognitive Eye Fatigue)
- **Problem:** Multi-clip sequences constructed entirely of unique 4s/6s cuts cause viewer cognitive fatigue ("too much movement for the eyes"). Conversely, forcing long continuous takes causes diffusion temporal entropy.
- **Autonomous Solution:** The agent autonomously balances the timeline into two speeds:
  - **70% Kinetic Beats:** 4s/6s independent parallel takes (angle cuts $\ge 30^\circ$, action, inserts).
  - **30% Sustained Anchors:** 16s–24s resting moments for emotional dialogue, tension buildup, or atmospheric dread:
    - *Method 1 (Single-Hop Extension):* One 8s take followed by a single 8s extension (only 1 extension hop).
    - *Method 2 (Soft Atmospheric Dissolve):* Pairing two slow-creep 8s takes with identical vectors and 0.75s–1.0s cross-dissolve.

---

#### 3. Match-on-Tone & Audio Continuity Bridges
- Every cut is accompanied by a **0.5s–1.0s J-Cut or L-Cut audio overlap** on ambient stems and strict `[MATCH-ON-TONE]` luminance anchoring to guarantee transitions feel completely natural.
