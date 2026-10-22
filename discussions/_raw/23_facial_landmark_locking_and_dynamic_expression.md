# Discussion 23: Facial Landmark Invariance & Expression Decoupling

**Date:** 2026-10-22  
**Status:** ✅ FINALIZED (Character Domain Discovery & Prompt Fix)  
**Topic:** Solving Facial Feature Loss in Image-to-Character Conversion and Decoupling Invariant Bone Structure from Dynamic Expressions  
**Domain:** `characters/` & Biometric Locking Engine  

---

## 1. The Core Empirical Problem

When creators provide a reference photograph and prompt diffusion/multimodal models (Gemini, Imagen, Midjourney, Veo) to adapt the person into a cosplay or character (e.g. Zero Two), models frequently exhibit **Facial Identity Dissolution**:
- The model prioritizes the pop-culture character name ("Zero Two") or anime tags over the user's reference photo.
- The model replaces the real human's unique facial features (jawline, nose bridge, cheekbones, eye contours) with a generic, idealized AI face.
- Conversely, if prompted too rigidly ("preserve face exactly"), the model freezes the person in their reference photo's original flat expression, refusing to smile, wink, or emote.

---

## 2. The Architectural Solution: Expression Decoupling Engine

The human face must be engineered as two distinct prompt layers:

$$\text{Total Facial State} = \mathbf{Invariant\ Biological\ Landmarks} + \mathbf{Dynamic\ Transient\ Expression}$$

1. **Invariant Biological Landmarks (Immutable):**
   - Bone structure, zygomatic arches (cheekbones), jawline contour.
   - Nose bridge angle, nasal tip shape, and nostril width.
   - Interpupillary distance, eye socket depth, and eyelid fold contours.
   - Lip shape, philtrum proportions, and natural skin undertone.
2. **Dynamic Transient Expression (Mutable):**
   - Eye contraction (winking, squinting, widening).
   - Zygomaticus major muscle flexion (cheerful open smile, subtle smirk, parted lips).
   - Brow elevation (inquisitive arch, furrowed brow).

---

## 3. High-Weight Prompt Syntax Formula

To force the model's latent attention to extract the reference face while altering the expression:

```text
A cinematic medium portrait of the exact same real woman from the reference photograph, maintaining 100% of her authentic facial bone structure, distinctive nose bridge, cheekbones, jawline, and natural facial geometry. Do not alter or substitute her unique facial likeness. 

Dynamic Facial Expression: While strictly preserving her biological facial features, her expression is animated into a cheerful, radiant, warm open smile with parted lips, her left eye playfully winking at the camera while her right turquoise-cyan feline eye is wide, lively, and sparkling with mischief.
```

---

## 4. Pose Grounding & Biomechanical Dynamics

For animated, lively character poses (e.g. cheerful heroine pose):
- Describe physical biomechanics rather than vague adjectives:
  `"She leans playfully forward toward the camera with both hands firmly planted on her hips, shoulders angled in dynamic perspective, head tilted playfully to the side, long pastel-pink hair swaying dynamically with the motion."`
- Real-world movie wardrobe drape: ensuring the tailored military coat dress flexes naturally across the folded hips and curved torso without turning into rigid plastic.
