# Discussion 19: Generalizing Characters to Universal Subjects (Characters & Products)

**Date:** 2026-10-22  
**Status:** ✅ FINALIZED (Subject Domain Generalization)  
**Topic:** Expanding the Character Domain into Universal `subjects/` (Human Actors & Commercial Hero Products)  
**Domain:** `subjects/` (formerly `characters/`)  

---

## 1. The Core Realization: Products Suffer from the Same Drift as Actors

In video generation, when models transition between cuts:
- **Actors drift:** Faces mutate, eye colors change, clothing piping alters.
- **Products drift identically:** Watch crowns switch from 3 o'clock to 9 o'clock, brand logos melt into illegible runes, sneaker sole treads warp, and vehicle headlights change shape.

Therefore, **a Hero Product is functionally identical to a Human Character in Google Flow**:
It requires:
1. An invariant **Master Verbatim Anchor String** (Tokens 1–30 of video prompts).
2. A clean, multi-angle **4-View Turntable Reference Sheet on `#E5E5E5`** uploaded as **Ingredient #1** in Google Flow.
3. A set of rigid **Invariant Rules** (zero logo deformation, unchangeable button/crown layout).

---

## 2. Directory Contract: `subjects/<subject_id>/`

Whether the subject is an actor (`maya_lin`) or a product (`chrono_watch`):

```text
subjects/
└── <subject_id>/                  # e.g., maya_lin/ or chrono_watch/
    ├── profile.md                 # Character Biometrics OR Product Dimensions & Materiality
    ├── verbatim_anchor.txt        # LOCKED 25–40 word Master Anchor String for video prompts
    ├── hero_prompt.txt            # Step 1 prompt (Canonical Hero Portrait / Product Showcase)
    ├── turnaround_prompt.txt      # Step 2 prompt (4-view turntable sheet on #E5E5E5)
    ├── rules.md                   # Invariant constraints, asymmetry locks, anti-morphing guards
    └── references/
        ├── hero_portrait.png      # Approved Step 1 base image
        └── turnaround_sheet.png   # Approved Step 2 model sheet (Ingredient #1 in Flow)
```

---

## 3. The 4-Panel Turntable Sheet for Products on `#E5E5E5`

While human turnaround sheets show Front, Side, Back, and Headshot, a **Product Turntable Sheet** standardizes on:

1. **Panel 1: Direct Front Face View** (Pure orthogonal elevation showing primary face, dial, or front branding).
2. **Panel 2: 90° Side Profile View** (Showing thickness, buttons, crowns, charging ports, or side sole profile).
3. **Panel 3: 45° Dynamic Isometric View** (Revealing 3D volume, top bevels, knurled textures, and lugs).
4. **Panel 4: Extreme Macro Detail View** (Showing fine material grain, knurling, micro-stitching, or mechanical engravings).

All rendered horizontally on a solid `#E5E5E5` neutral light-gray cyclorama with shadowless, flat diffuse studio lighting.

---

## 4. Product Invariant & Anti-Warping Rules

1. **Crown & Port Asymmetry Lock:** Models love mirroring dials and buttons. The spec explicitly binds hardware:
   `"Crown and rotating pushers are located strictly on the RIGHT side at the 3 o'clock position (the left side of the case remains completely smooth)."`
2. **Anti-Melt Directives:** Explicitly forbids warped typography, melting brand logos, rubbery plastic deformations, or fantasy alterations.
3. **Tactile Acoustic Profile:** Products substitute speech delivery with **Tactile ASMR Sound Design** (metallic clicks, water resistance hiss, precision ticking, crisp snaps).
