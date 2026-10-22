# Discussion 20: Preserving Depth — Subject vs. Character Specialization

**Date:** 2026-10-22  
**Status:** ✅ FINALIZED (Architectural Decoupling)  
**Topic:** Preserving Deep Character Research while Expanding to Universal Subjects (Parent `subjects/` vs. Deep Child `characters/`)  
**Domain:** `subjects/` & `characters/`  

---

## 1. The Creator's Guiding Principle

> *"It is not bad to keep the visual and character specs we already had, now is it? No it is not. Updating them might be bad itself. As when character involved, we need more clarity.*  
> *So, what I'm suggesting is, keep all the character specs we did so far in another spec file, and rename the current to subject spec. We can connect the subject spec with character spec. Loosing the updates we did is not good.*  
> *These are not final tool we are building, no need to think about 'Too much info'. The final product needs as much research result as possible."*

---

## 2. The Architectural Problem Identified

When generalizing `characters/` into `subjects/`, attempting to cram human actors, anime characters, cosplay deconstruction, luxury watches, sneakers, vehicles, and robots into a single document risks:
1. **Compressing Vital Character Research:** Omitting deep nuances like facial bone contours, eyelid folds, hair styling, cosplay tailoring, and lip-sync dialogue rules.
2. **Diluting Product Guidance:** Making product creators parse human anatomy rules, or character creators parse knurled bezel rules.

---

## 3. The Two-Tier Specification Solution

We establish a clean, two-tier specification hierarchy that preserves **100% of our research depth**:

```
┌────────────────────────────────────────────────────────────────────────┐
│                   production_framework/specs/                          │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
         ┌──────────────────────────┴──────────────────────────┐
         ▼                                                     ▼
 ┌───────────────────────────────┐             ┌───────────────────────────────┐
 │      02_subject_spec.md       │ ──────────► │     02_character_spec.md      │
 │    (Master Universal Spec)    │  Delegates  │    (Deep Character Bible)     │
 │ • Universal Subject Primitive │  Characters │ • Human & Stylized Biometrics │
 │ • Commercial Hero Products    │             │ • Cosplay Deconstruction      │
 │ • Vehicles & Artifacts        │             │ • 2-Step Genesis (Maya Lin)   │
 │ • 4-Panel Turntable on #E5E5E5│             │ • Anti-Action-Figure Guards   │
 │ • Tactile ASMR Foley Profiles │             │ • Spoken Dialogue Syntax      │
 └───────────────────────────────┘             └───────────────────────────────┘
```

1. **`02_subject_spec.md` (The Parent Master Specification):**
   - Defines the universal `subjects/<subject_id>/` primitive across all 5 project archetypes.
   - Authoritative for **Hero Products, Vehicles, Electronics, and Artifacts**.
   - Standardizes the **4-Panel Product Turntable Protocol on `#E5E5E5`** (Front Elevation, 90° Profile with crown asymmetry lock, 45° Isometric View, Macro Detail).
   - If the project requires a Human or Stylized Character, `02_subject_spec.md` explicitly delegates to `02_character_spec.md`.

2. **`02_character_spec.md` (The Deep Specialized Character Bible):**
   - Preserved in its complete, unabridged, high-density form.
   - Contains all research on facial bone contours, hair strand behavior, cosplay deconstruction, live-action vs. 2D anime adaptation, the Action Figure Trap fix, and spoken dialogue syntax.

---

## 4. Visual Spec Integrity Alignment

Similarly, [`01_visual_spec.md`](file:///e:/Coding_Practice/AI%20Projects/ai-video-production-skill/production_framework/specs/01_visual_spec.md) preserves all 6 original cinema and animation paradigms (35mm film, Arri Alexa, anime, 3D CGI, stop motion, Kodachrome 1970s), while cleanly housing the two new paradigms (Commercial Tabletop and Social UGC). Zero research data is discarded.
