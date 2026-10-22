# Discussion 15 (Scratchpad): Questioning Movie-Only Bias & Broadening Beyond Cinema

**Date:** 2026-10-22  
**Status:** 🟡 Open Investigation / Scratchpad for Future Review  
**Topic:** Are we limiting the framework to movie-style videos? Adapting to Commercials, Social Media, Products, and Documentaries.

---

## 1. The Core Realization & User Question

> *"What are we targeting? Movie style video generation or something else? Cause, Flow can create any kind of video. Any. Aren't we limiting our skill tool for movie type scenery video?"*

### The Risk Identified
Throughout Phase 5.1 and 5.2, our vocabulary and test cases leaned heavily toward **narrative cinema** (e.g., *film stocks, scripts, actors, dialogue lines, 35mm war aftermath, combat medic*). 

While narrative cinema is the most demanding technical test case (facial drift across cuts, dialogue sync, multi-shot continuity), hardcoding the production framework strictly around "Movies" creates excessive friction for creators who want to use Google Flow for:
- A **15-second Nike sneaker commercial** (no human actors, no dialogue, no narrative script).
- An **Apple-style minimalist product reveal** (pure white infinity cove, high-speed orbital camera, macro textures).
- A **vertical 9:16 social media reel / aesthetic food video** (sizzling steak, latte art, ASMR foley).
- A **nature documentary** (telephoto wildlife, natural soundscapes).
- A **music video / abstract visualizer** (surreal physics, kinetic transitions).

---

## 2. The 5 Major Video Archetypes in Google Flow

| Video Archetype | Primary Subject | Environment / Set | Key Kinematics | Primary Audio Need |
|---|---|---|---|---|
| **1. Narrative Cinema & Anime** | Human / Stylized Character (`characters/`) | Cinematic world / set (`sceneries/`) | Storytelling coverage (push-in, pan, over-the-shoulder) | Spoken dialogue, diegetic foley, room tone |
| **2. Commercial & Product Spotlight** | Physical Product / Artifact (`products/` or `subjects/`) | Studio cyclorama, reflective pedestal, clean stage | Dynamic 360° orbital spin, extreme macro slow-motion | ASMR tactile foley (clicks, pours, swooshes), no speech |
| **3. Social Media & UGC / B-Roll** | Lifestyle creator or focal object | Real-world aesthetic locations, vertical 9:16 | Fast whip-pans, handheld tracking, visual hooks | Rhythmic music markers, ambient lifestyle buzz |
| **4. Documentary & Nature** | Wildlife, historical subject, architecture | Natural biomes, aerial landscapes | Telephoto tracking, slow majestic drone flyovers | Raw natural foley (wind, wildlife calls, water) |
| **5. Music Video & Abstract** | Abstract geometry, performers, surreal objects | Dreamscapes, neon infinite voids, liquid spaces | Stepped motion, rhythmic zooms, seamless warp cuts | Beat-synchronized motion, stylized silence |

---

## 3. Key Finding: The Underlying Primitives are 100% Shared

Even though the *end products* look completely different, Google Flow (Veo 3.1) relies on the **exact same 5 generative primitives**:

1. **Visual DNA (`visual/`):**
   - Movie = 35mm organic film grain, bleach bypass.
   - Commercial = High-gloss studio lighting, pristine optical clarity, vibrant brand palette.
2. **Subject Consistency (`characters/` $\rightarrow$ `subjects/`):**
   - Movie = Maya Lin 4-view turnaround sheet on `#E5E5E5` so face doesn't morph.
   - Commercial = Nike Sneaker 4-view turntable sheet on `#E5E5E5` so laces/logos don't morph.
   *(The 2-step Genesis $\rightarrow$ Turntable Profile architecture works identically for products!)*
3. **Environment / Stage (`sceneries/`):**
   - Movie = Post-war ruined city street.
   - Commercial = Dark reflective wet marble pedestal with neon rim lighting.
4. **Kinematics (`cinematography/`):**
   - Movie = Slow eye-level push-in.
   - Commercial = 360° high-speed orbital rotation around focal point.
5. **Audio (`audio/`):**
   - Movie = Spoken lines, war aftermath foley.
   - Commercial = Crisp tactile ASMR sound effects, bass drop.

---

## 4. Proposed Solution: The "Project Archetype Selector"

Instead of forcing a one-size-fits-all movie folder structure, future project initialization can offer a **Lean Project Archetype**:

```text
               ┌──────────────────────────────────────────────┐
               │         SELECT PROJECT ARCHETYPE             │
               └──────────────────────┬───────────────────────┘
                                      │
         ┌────────────────┬───────────┴────┬─────────────────┐
         ▼                ▼                ▼                 ▼
   [ 1. CINEMA ]   [ 2. COMMERCIAL ] [ 3. SOCIAL/B-ROLL ] [ 4. DOC/NATURE ]
   • characters/   • products/       • hooks/             • biomes/
   • scripts/      • studio_sets/    • vertical_shots/    • wildlife/
   • dialogue/     • asmr_foley/     • b_roll/            • ambient_audio/
```

### Benefits:
- Keeps the system lightweight and non-bureaucratic (a commercial creator gets zero script or character bloat).
- Maximizes Google Flow's full multi-industry potential.

---

## 5. Next Steps for Later Deep-Dive
- When returning to this topic, decide whether to keep the generic department names (`visual/`, `subjects/`, `environments/`, `shots/`) or support archetype-specific folder scaffolds.
- Ensure that the upcoming `sceneries/` domain accounts for both narrative locations (streets, rooms) AND commercial/studio environments (pedestals, infinity coves, abstract voids).
