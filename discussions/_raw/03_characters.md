# Discussion Log: Character Domain & Reference Turnarounds

**Status:** Consolidated Character Domain Discussion Record  
**Target Output Specification:** `production_framework/specs/02_character_spec.md` (In Progress)

---

## 1. Character Architecture: The Identity Anchor

In AI video generation, independent clip generation causes **Identity Drift** (facial features, age, wardrobe details, and body shape alter uncontrollably between cuts).

To solve this, Google Flow uses the **"Ingredients to Video"** system:
- A character reference image is uploaded as **Ingredient #1**.
- The prompt text injects a locked **Master Verbatim Anchor** string.

---

## 2. Scenario 1: User Supplies Their Own Photo (Image-to-Character)

When a creator provides their own photo and wants to wear a custom outfit or cosplay:
1. **Multi-View Coverage on a Single Canvas:** The output must contain four angles on a single image:
   - Panel 1: Full-body Front View in natural relaxed standing posture.
   - Panel 2: Full-body Side Profile View (90 degrees).
   - Panel 3: Full-body Back View showing rear suit tailoring and hair.
   - Panel 4: Detailed Close-up Headshot portrait capturing facial likeness.
2. **Solid Neutral Studio Background (#E5E5E5):** Essential to prevent environmental pixels (trees, rooms) from bleeding into target video clips.

### A. The "Action Figure Trap" (Discovery & Solution)
- **The Glitch:** Testing an image-to-character prompt resulted in an **action figure/plastic toy collectible with a real human head slapped onto it**.
- **The Cause:** Words like "model sheet", "mecha suit", and "ballistic panels" triggered 3D miniature action figure training data, while only constraining the face.
- **The Solution:**
  1. *Full-Body Biological Inheritance:* Explicitly anchor the real person's natural body build, shoulder-to-hip proportions, and natural posture from the reference photo.
  2. *Wearable Movie Wardrobe:* Describe costumes as flexible, tailored movie-set garments (flexible neoprene, articulated lightweight composite plates conforming to real body curves) rather than rigid toy armor.
  3. *Strict Negative Directives:* Explicitly ban action figures, plastic ball joints, dolls, and 3D miniatures.

### B. Anime / Pop-Culture Deconstruction Engine
AI image generators fail on generic names like "Darling in the Franxx suit" or "Kakashi outfit". The agent automatically deconstructs them into physical garment descriptors:
- **Kakashi Hatake:** Padded olive-green tactical flak vest with chest utility pouches, dark-navy breathable fabric face mask covering lower face from nose bridge down to neck, tilted Leaf Village metallic forehead plate, natural silver-grey textured hair, fingerless gloves, calf bandages.
- **Darling in the Franxx (Mecha Plugsuit):** Form-fitting dark-charcoal neoprene bodysuit, lightweight articulated chest and shoulder plates, orange technical seam piping, mechanical collar.

### C. Known Open Challenges Logged
1. **Subtle Facial Drift:** Models can slightly alter facial geometry when mapping onto iconic character outfits.
2. **Body Structure / Scale Mismatch:** Models sometimes default to idealized superhero or standardized proportions rather than strictly preserving the real human's height and torso build.
- *Future Workarounds to Explore:* 2-step single portrait anchor $\rightarrow$ full turnaround; explicit biometric measurements.

---

## 3. Scenario 2: New Original Character Creation (Pure Text)

When a creator has no reference photo and wants to invent a character from pure text:

### The 4-Category Character Creation Template:
```text
A professional multi-view character design reference sheet of an original character, [NAME].

[1. BIOLOGICAL & ANATOMICAL ANCHORS]
Demographics: [Exact age, gender, perceived ethnicity].
Face & Bone Structure: [Distinctive jawline, cheekbones, nose shape, eye shape, eye color].
Distinctive Physical Markers: [Scars, freckles, beauty marks, tattoos, facial hair].
Hair: [Exact length, texture, parting, color, and styling].
Build & Stature: [Height, body build - e.g., slender athletic 5'10 frame, broad shoulders].

[2. SIGNATURE WARDROBE (SPECIFIC MATERIALS & PALETTE)]
Wearing: [Exact layered garments with fabric textures, color values, seams, buckles, and footwear - avoiding generic labels].

[3. 4-VIEW STUDIO LAYOUT]
Clean studio layout showing four distinct angles on a solid, seamless neutral light-gray background (#E5E5E5) with uniform soft lighting:
- Panel 1: Full-body Front View in natural relaxed standing posture.
- Panel 2: Full-body Side Profile View (90 degrees).
- Panel 3: Full-body Back View showing rear hair, clothing seams, and silhouette.
- Panel 4: Close-up Headshot portrait showing facial features, eye details, and expressions.

[4. STYLE SYNCHRONIZATION (FROM visual/technical_anchor.md)]
[Master Style Anchor - e.g., Shot on 35mm film stock, organic fine grain, authentic human photography OR Traditional 2D hand-drawn cel anime].
Strictly identical character identity, proportions, and outfit across all panels. High-resolution reference sheet.
```
