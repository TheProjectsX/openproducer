# Discussion 25: Future Backlog — Deep Face Syncing & Likeness Fidelity with Reference Photos

**Date:** 2026-10-22  
**Status:** 📌 ACTIVE BACKLOG ITEM (Creator Priority Note for Future Work)  
**Topic:** Improving 1:1 Facial Likeness Retention & Eliminating AI Face Substitution in Image-to-Character Flows  
**Domain:** `characters/` & Google Flow Reference Conditioning  

---

## 1. Context & User Directive

During live simulation testing with the Dumb Creator persona, the user identified a critical limitation in current AI image generation when transforming a real user photo into a character:

> *"I dunno if the image I'm providing is not good enough, or the Gemini is not being able to take the facial features correctly! Can you update so the facial feature is more taken? And fyi, the facial feature will be used, the expression can change."*  
> *"Note for our future self that we need to go back to face syncing with the image"*

### The Core Problem:
When a creator supplies a photo of a real person (themselves, an actor, or a model) and requests a character adaptation or custom wardrobe:
1. **Generic AI Face Substitution:** Diffusion and multimodal models frequently substitute an idealized, generic AI face (or a standard "cosplay beauty" template) instead of locking onto the specific, unique human facial geometry in the photo.
2. **Likeness Dilution from Competing Tokens:** Prompts containing strong aesthetic or costume descriptors (e.g., "Zero Two", "mecha suit", "anime uniform") tend to trigger strong latent visual priors that overpower the reference image tokens.
3. **Subtle Feature Distortion:** The nose bridge, jawline width, eye shape, and philtrum often drift, leaving the creator feeling: *"That doesn't really look like the person in my photo."*

---

## 2. Root Cause Analysis & Hypotheses

| Factor | Mechanism | Observed AI Behavior |
|---|---|---|
| **Token Attention Hierarchy** | Wardrobe, hair color, and style keywords occur early or carry high latent weight. | The model prioritizes rendering "pink hair" and "uniform" over matching micro-facial bone contours. |
| **Multimodal Conditioning Strength** | Depending on the backend (Imagen 4, Gemini Omni, Midjourney v6), image reference weights are fixed or opaque. | The model treats the image as a loose "vibe inspiration" rather than a hard biometric stencil. |
| **Expression-Geometry Coupling** | Changing the expression (e.g., asking for a cheerful smile or a wink) alters the underlying facial structure. | Smiling pulls cheek fat and narrows eye shapes, causing the model to abandon the neutral reference landmarks. |

---

## 3. Dedicated Solutions & Approaches to Investigate (Return Plan)

When returning to deep-dive into this challenge, the team/agent must test and evaluate the following mechanisms:

### Approach A: The Biometric Feature Decomposition Engine
Instead of high-level phrases like *"resembling the woman in the photo"*, construct a standardized anatomical biometric descriptor set:
- Explicit eye shape taxonomy: Almond, hooded, monolid, deep-set, round with exact epicanthic fold specification.
- Explicit nose architecture: Straight dorsum, button tip, Roman bridge, alar base width.
- Explicit jaw & chin contours: Square mandibular angle, rounded soft chin, pointed heart chin, defined zygomatic width.
- Explicit lip geometry: Cupid's bow definition, upper-to-lower lip volume ratio.

### Approach B: Two-Step Pure Face Transfer (Decoupled Wardrobe)
- **Step 1 (Face Transfer Only):** Isolate the face transfer completely. Feed the user photo and generate a clean, unstyled, neutral 85mm portrait whose **sole goal** is 1:1 facial likeness verification without custom costumes or stylized hair.
- **Step 2 (Wardrobe & Hair Integration):** Once the likeness is 100% confirmed by the creator, apply the costume and hair styling using the approved Step 1 image as the locked anchor.

### Approach C: Reference Weighting in Google Flow / Veo 3.1
- In Google Flow, verify the exact interaction between **Ingredient #1 (Image Anchor)** and prompt text tokens.
- Determine whether injecting negative tokens against AI facial homogenization (`generic AI face, idealized face, altered facial geometry, plastic surgery look`) measurably improves fidelity.

---

## 4. Backlog Action Items (When Returning to this Topic)

1. [ ] **Empirical Benchmark Test:** Run side-by-side prompt variations using the user's specific test photo across Gemini/Imagen to identify which exact prompt phrases maximize resemblance.
2. [ ] **Expression Invariance Formula:** Develop prompt syntaxes that allow full emotional range (smiling, winking, shouting) while locking 100% of underlying bone geometry.
3. [ ] **Update `02_character_spec.md`:** Incorporate the finalized high-fidelity face-locking formulas into Section 4.0 (Scenario 1).
4. [ ] **Agent Tooling / Automation:** Integrate an automated facial biometric extractor helper into the final production skill.
