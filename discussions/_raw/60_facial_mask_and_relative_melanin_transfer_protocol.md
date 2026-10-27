# Discussion 60: Empirical Validation — Universal Relative Melanin Parity & Facial Mask Decoupling

**Date:** October 27, 2026  
**Context:** Field test validation by creator demonstrating that Multi-Reference Image-to-Image translation successfully preserved identity when using Universal Relative Melanin Parity and Hair vs. Facial Mask Decoupling.  
**Target Platform:** Google Flow (Veo 3.1, Imagen 4, Gemini Omni Flash)

---

## 1. Empirical Findings & User Feedback

During live image-to-image testing using a real human photo (`[IMAGE 1]`) and an anime reference pose/wardrobe image (`[IMAGE 2]`):
1. **Initial Diffusion Failure Modes:**
   - *Complexion/Race Shift:* The AI did not retain the reference model's authentic skin tone—darkening the face or shifting ethnicity due to unshaded anime shading and diversity priors.
   - *Hair Contamination:* Attempting to copy the person from `[IMAGE 1]` caused the model to overwrite the anime character's iconic hair with the real person's haircut.
2. **Empirical Validation:**
   - The creator applied our two refined prompt structures and reported: *"These last 2 worked great, specially the last one for image to image where there is a pose already from another source. The face usage was also nice."*

---

## 2. Codified Architectural Rules

### A. Universal Relative Melanin Parity Law
- **Never Hardcode Static Tones:** Never hardcode "fair", "white", or "tan". Prompts must use **Relative Parity Tokens** binding 1:1 to `[IMAGE 1]`:
  > `"Lock 100% biometric identity from [IMAGE 1]. Mirror the exact same skin tone, natural melanin level, undertones, and biological ethnicity of the person in [IMAGE 1]. All visible skin (face, neck, ears, hands, arms) must be an identical 1:1 match to [IMAGE 1]—neither lightened, darkened, nor altered in ethnicity."`
- **Mandatory Negative Anchor:** `mismatched skin tone from [IMAGE 1], altered skin tone, shifted complexion, lightened skin, darkened skin, race drift, ethnicity change, mismatched neck and face color, different race from [IMAGE 1]`.

### B. Facial Mask vs. Hair Volume Decoupling Protocol
When grafting identity onto an existing pose or character from `[IMAGE 2]`:
1. **Hairstyle Inheritance (Strictly from `[IMAGE 2]`):**
   > `"The character MUST retain the EXACT hairstyle, haircut, bangs, and hair color from the character in [IMAGE 2]. Translate the anime hair into realistic, individual fine organic hair strands with natural specular sheen and physical volume. Strictly DO NOT use the hairstyle or hair color from [IMAGE 1]."`
2. **Facial Mask Graft (Strictly from `[IMAGE 1]`):**
   > `"Graft ONLY the facial mask from [IMAGE 1] onto the character's face: cheekbones, eye shape, nose bridge, lips, jawline contours, and relative skin tone/melanin level."`
3. **Negative Prompt Shield:** `hair from [IMAGE 1], haircut from [IMAGE 1], wrong hair color, altered hairstyle, mismatched hair from [IMAGE 2]`.

---

## 3. Specifications Updated
1. [`production_framework/specs/02_character_spec.md`](../../production_framework/specs/02_character_spec.md): Added Rules 9 & 10 to Scenario 1.
2. [`production_framework/specs/06_retake_doctor_spec.md`](../../production_framework/specs/06_retake_doctor_spec.md): Added Diagnostic Code `G-13: Complexion / Ethnicity Drift & Mismatched Body Tone`.
