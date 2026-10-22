# Discussion 24: Headshot-to-Full-Body Turnaround Extrapolation Engine

**Date:** 2026-10-22  
**Status:** ✅ FINALIZED (Character Domain Discovery & Prompt Spec)  
**Topic:** Generating 4-Panel Turnaround Sheets from Face-Only Reference Photos with Wardrobe Downward Extrapolation  
**Domain:** `characters/` & Reference Sheet Architecture  

---

## 1. Creator Scenario & Problem

> *"Mate, this time we will create her character profile. Maybe 3/4 panels of it. The ref image only has the face. The body structure is: Thin, Slim, white skin, around 18/20 years old female. Take the available dress style in the photo and add additional dresses to be full body"*

### The Real-World AI Challenge:
Most creators do not have full-body 360-degree photography of their actor or themselves. They typically provide:
- A single selfie or cropped portrait showing **only the face and upper collar**.
- Textual descriptors for the missing body build (*"thin, slim, fair skin, 18-20 years old"*).
- An expectation that the AI will seamlessly extrapolate the visible shirt/jacket downwards into matching full-body clothing (pants/skirt, shoes, belt) without stylistic mismatch.

---

## 2. The Headshot-to-Full-Body Extrapolation Architecture

To achieve this without facial distortion or wardrobe clashing, the prompt enforces four distinct structural operations:

```
┌────────────────────────────────────────────────────────────────────────┐
│             HEADSHOT-TO-FULL-BODY EXTRAPOLATION ENGINE                 │
├───────────────────────────────────┬────────────────────────────────────┤
│ 1. FACIAL ANCHOR (FROM PHOTO)     │ Locks cheekbones, jaw, nose, eyes  │
│ 2. BIOMETRIC BODY (FROM TEXT)     │ 18-20yo, slim, thin, fair skin     │
│ 3. WARDROBE DOWNWARD EXTENSION    │ Extrapolates visible collar/shirt  │
│                                   │ into matching full-body tailoring  │
│ 4. 4-PANEL TURNTABLE (#E5E5E5)    │ Front, 90° Side, Back, Headshot    │
└───────────────────────────────────┴────────────────────────────────────┘
```

1. **Facial Likeness Lock (Tokens 1–30):**
   - Strictly preserves the facial landmarks, jawline, nose bridge, eye shape, and hair from the provided face photo.
2. **Biological Body Construction (Tokens 31–60):**
   - Explicitly defines musculoskeletal proportions: slender, slim athletic frame of an 18-to-20-year-old female with fair skin, natural shoulder width, and realistic limb proportions (banning exaggerated proportions or toy parts).
3. **Wardrobe Downward Extrapolation (Tokens 61–100):**
   - Analyzes the upper garment in the photo (e.g. fabric texture, color, collar style, buttons) and seamlessly continues it into a matching full-body outfit: tailored trousers or skirt in identical textile weave, matching belt/waist closure, and complementary footwear.
4. **Studio Turnaround Constraint on `#E5E5E5`:**
   - Standard 4-panel horizontal layout on solid `#E5E5E5` light-gray background with flat uniform studio lighting.
   - Panel 1: Full-body Front View (hands empty at sides).
   - Panel 2: Full-body 90-degree Side Profile View.
   - Panel 3: Full-body Back View.
   - Panel 4: Detailed Close-up Headshot portrait.

---

## 3. Compiled Spec-Compliant Turnaround Prompt

```text
A professional 4-panel horizontal character turnaround model sheet on a seamless solid light-gray cyclorama background (#E5E5E5). Panel 1: Full-body front view. Panel 2: Full-body ninety-degree side profile view. Panel 3: Full-body rear back view. Panel 4: Detailed close-up headshot portrait. The subject is an 18-to-20-year-old female with a slim, slender athletic build and fair skin, maintaining 100% identical facial bone structure, jawline contours, nose bridge, and eye shape from the reference portrait photo. Her wardrobe seamlessly continues downward from the reference photo's upper uniform into a matching tailored pleated uniform skirt, clean leather waist belt, and tailored knee-high boots in identical textile weave and palette. Natural relaxed standing posture, empty hands resting at sides. Even shadowless diffuse studio illumination. Real living human being in tailored wardrobe, not a plastic toy, not an action figure, no ball joints.
```

---

## 4. Pre-Flight Linter Audit

| Linter Rule | Measurement | Status | Notes |
|---|---|---|---|
| **1. Word Economy** | 137 words | ✅ PASS | Falls precisely within the 100–150 word optimal attention band. |
| **2. Equipment Hallucination** | 0 equipment nouns | ✅ PASS | Zero physical camera nouns used. |
| **3. Prompt Purity** | 0 technical tokens | ✅ PASS | No resolution, aspect ratio, or frame rates in prompt text. |
| **4. Canvas Standard** | Solid `#E5E5E5` | ✅ PASS | Studio neutral cyclorama ensures zero background clutter bleed. |
| **5. Biometric Lock & Downward Extrapolation** | Tokens 41–105 | ✅ PASS | Locks facial bone landmarks, sets 18–20yo slim frame, and extrapolates skirt/belt/boots from upper collar. |
| **6. Anti-Toy / Action Figure Guard** | Explicit ban | ✅ PASS | Banned plastic toys, action figures, and ball joints. |

---

## 5. Architectural Consensus

1. When a creator uploads a headshot-only photo, the system never halts or forces them to take 360° photos.
2. The agent automatically executes the **Downward Extrapolation Engine**, anchoring the face biometrically, generating the body build from textual parameters, and tailoring matching lower garments based on upper collar/textile cues.
3. Because the creator explicitly said *"character profile... 3/4 panels of it"*, the system correctly routes to the 4-panel `#E5E5E5` Turnaround Model Sheet (`turnaround_prompt.txt`) rather than a single cinematic Hero Shot.
