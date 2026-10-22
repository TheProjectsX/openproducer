# Discussion 13: Character Turnaround Generalizability & Edge Case Guards

**Date:** 2026-10-22  
**Topic:** Style Invariance, Universal Applicability across Mediums, and Edge Case Mitigation  
**Domain:** `characters/`

---

## 1. Research Question: Does the 2-Step Architecture Generalize to All Image Types?

Following the successful test of the Maya Lin prompt, we analyzed whether this 2-step methodology is universal across all visual mediums, genres, and character types.

### Verdict: **Yes, Fully Generalizable.**
The underlying mechanics (Identity Anchor in Step 1 $\rightarrow$ Background Stripping & Turntable Rotation in Step 2) operate on latent representations that are completely medium-agnostic.

---

## 2. Adaptation Matrix Across 5 Visual Mediums

| Visual Medium / Paradigm | Step 1 (Genesis Adaptation) | Step 2 (Profile Adaptation) | Mandatory Guardrails |
|---|---|---|---|
| **1. Ultra-Realistic Live-Action Film** | 85mm portrait lens, natural skin micro-pores, authentic subsurface scattering, organic textile drape. | Solid `#E5E5E5` cyclorama, flat studio lighting, real human actor in movie wardrobe. | Ban action figures, dolls, plastic ball joints, 3D miniatures. |
| **2. Traditional 2D Cel Anime / Manga** | Hand-drawn cel animation, bold uniform ink lines, flat unshaded color fills, locked 24fps aesthetic. | Classic production model sheet (*settei* / 設定資料), white studio paper, multi-angle line art. | Ban 3D rendering, plastic surfaces, and volumetric CGI lighting (prevents doubled jittery lines). |
| **3. Stylized 3D CGI (Pixar / Unreal)** | Stylized proportions, tactile vinyl/felt micro-textures, smooth subsurface scattering, expressive stylized planes. | Digital T-pose / A-pose 3D asset model sheet, neutral gray background. | Keep facial planes stylized to avoid uncanny valley realism. |
| **4. Fantasy Armor & Mecha Pilot Suits** | Deconstruct into physical plates: lightweight articulated polycarbonate armor, silicone seals, matte finish. | Multi-angle view revealing rear thrusters, waist articulations, and weapon holsters. | Never say just "mecha suit"; always describe tailored flexible undersuit with articulated composite plates. |
| **5. Non-Human Creatures / Aliens / Robots** | Replace human biometrics with creature anatomy (chassis plating, servo joints, reptilian scales, tail length). | Turnaround showing dorsal, lateral, and ventral silhouettes on neutral gray. | Must explicitly constrain tail length, limb counts, and ocular placement across all 4 panels. |

---

## 3. Two Critical Edge Cases & Their Solutions

Empirical testing identified two specific failure modes that occur in multi-view turnaround sheets if left unconstrained:

### Edge Case 1: The Asymmetry / Mirroring Glitch (Left vs. Right)
- **Failure Mode:** If a character has an asymmetrical feature (e.g., a scar on the left cheek, an eyepatch, or a mechanical right arm), diffusion models frequently "mirror" the feature across views, placing it on both sides or flipping sides in the side profile.
- **The Solution:** In Prompt 2, explicitly bind asymmetric features to specific perspective panels:
  > *"Panel 2: Left side profile showing the diagonal scar across the left cheekbone (the right side of the face remains completely unscarred and clear)."*

### Edge Case 2: The Detachable / Floating Prop Hallucination
- **Failure Mode:** When a character is holding a handheld weapon (sword, rifle) or loose prop in Step 1, the prop frequently changes size, vanishes, or floats beside them across panels in Step 2.
- **The Solution:** In character turnaround sheets, **strictly enforce empty hands and holstered gear**:
  > *"Hands in relaxed open standing posture, empty hands, sidearms and knives securely holstered at hip utility belt."* Complex handheld weapons belong in a dedicated prop reference sheet, not in the primary character identity sheet.
