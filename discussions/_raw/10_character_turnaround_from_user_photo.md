# Discussion Log 10: Character Turnaround Sheet from User Photo (I2I & Cosplay Adaptation)

**Date:** October 22, 2026  
**Topic:** Turnaround Prompt Architecture for User-Supplied Photos with Custom Outfits  
**Participants:** Creator & AI Assistant

---

## 1. The Core Objective: Image-to-Character Reference Sheet

When a creator supplies their own photo, they want to become a character in the video while ensuring:
1. **Zero Facial Drift:** Their real face, bone structure, and likeness are 100% preserved.
2. **Wardrobe & Styling Transformation:** Their clothing is completely replaced (e.g. *"Darling in the Franxx mecha suit"*, *"Kakashi from Naruto"*, *"Zero Two suit"*).
3. **Multi-View Coverage on a Single Image:** The output must contain multiple angles on a single canvas (Front, Side, Back, Face Close-up) so Google Flow has full 360-degree spatial data.
4. **Solid Neutral Background:** Solid seamless light-gray or off-white background (#E5E5E5) to prevent background pixels from contaminating video shots.
5. **Style Synchronization:** Matches the project's **`visual/`** baseline (either Photorealistic Cinema or 2D Anime).

---

## 2. The 5-Block Universal Turnaround Prompt Template

This modular structure is engineered for multimodal image generators (Gemini 3.1 Flash Image / Nano Banana 2, Midjourney, Flux.1, Imagen 4):

```text
================================================================================
          MASTER IMAGE-TO-TURNAROUND PROMPT TEMPLATE
================================================================================

[BLOCK 1: ACTION & LAYOUT MANDATE]
Create a professional character turnaround model sheet based on the attached reference image. The layout features an organized multi-view grid against a solid, seamless neutral light-gray studio background (#E5E5E5) with uniform, soft studio lighting.

[BLOCK 2: STRICT FACIAL IDENTITY LOCK (HARD CONSTRAINT)]
STRICT FACIAL IDENTITY LOCK: Treat the facial structure in the attached reference image as an unchangeable hard constraint. Replicate the exact facial geometry, jawline, cheekbones, eye shape, eye color, nose bridge, nostril contours, and lip thickness from the reference photo. Do not alter or idealize the person's facial likeness.

[BLOCK 3: WARDROBE & OUTFIT ADAPTATION]
OUTFIT & WARDROBE: Replace original clothing entirely. The character is dressed in:
{DETAILED_OUTFIT_DESCRIPTION}

[BLOCK 4: MULTI-VIEW GRID SPECIFICATIONS (ALL PANELS FEATURE THE SAME PERSON)]
- Panel 1: Full-body Front View standing in a neutral A-pose, arms slightly away from sides.
- Panel 2: Full-body Side Profile View standing upright in matching neutral pose.
- Panel 3: Full-body Back View showing complete rear outfit construction, seams, and back of hair.
- Panel 4: Detailed Close-up Headshot portrait capturing facial likeness, micro-textures, and collar construction.

[BLOCK 5: STYLE SYNCHRONIZATION (FROM visual/technical_anchor.md)]
{MASTER_STYLE_ANCHOR}
Identical proportions, color palette, and textures across all panels. High-resolution concept art turnaround sheet, sharp focus, clean edge separation from background.
================================================================================
```

---

## 3. Pop-Culture / Anime Outfit Deconstruction Engine

AI image models often misinterpret generic names like "Darling in the Franxx suit" or "Kakashi outfit". The agent must automatically expand pop-culture references into **concrete physical garment descriptors**:

### Example A: "Darling in the Franxx Male Mecha Plugsuit (Squad 13)"
- **Deconstructed Description:**
  > *"A futuristic high-tech mecha pilot plugsuit. Form-fitting matte dark-charcoal and light-grey synthetic ballistic panels, reinforced ergonomic knee and elbow joints, vivid orange accent piping along the torso seams, a rigid mechanical stand-up collar with metallic interface nodes, and streamlined grey tactical boots."*

### Example B: "Zero Two Pilot Suit (Darling in the Franxx)"
- **Deconstructed Description:**
  > *"A striking futuristic pilot bodysuit in vibrant crimson red and white. Glossy red form-fitting material with white shoulder and torso chevron panels, high white collar with gold crest accents, sleek crimson boots, accompanied by a slim white metallic headband with two small pointed red oni horns projecting upward through the hair."*

### Example C: "Kakashi Hatake (Naruto Ninja Uniform)"
- **Deconstructed Description:**
  > *"A dark navy-blue long-sleeve tactical shinobi shirt and matching utility pants, worn beneath a dull olive-green flak vest with multiple ammo pouches, high protective ribbed neck collar, and red spiral crest on the back. A fitted dark-navy fabric face mask covers the lower face from nose to neck. Forehead protector with metallic leaf emblem plate tied securely. Hands wrapped in dark fingerless combat gloves."*

---

## 4. End-to-End Walkthrough: User Photo + Custom Outfit

### User Scenario:
- **User provides:** Their selfie/photo.
- **User request:** *"Make me wear a high-tech mecha suit from Darling in the Franxx, realistic movie style."*

### Compiled Turnaround Prompt (Ready to paste or send to image model):

```text
Create a professional character turnaround model sheet based on the attached reference image. The layout features an organized multi-view grid against a solid, seamless neutral light-gray studio background (#E5E5E5) with uniform, soft studio lighting.

STRICT FACIAL IDENTITY LOCK: Treat the facial structure in the attached reference image as an unchangeable hard constraint. Replicate the exact facial geometry, jawline, cheekbones, eye shape, eye color, nose bridge, nostril contours, and lip thickness from the reference photo. Do not alter or idealize the person's facial likeness. Maintain the original hair color and general hairline while styling it to fit the costume.

OUTFIT & WARDROBE: Replace original clothing entirely. The character is dressed in a futuristic high-tech mecha pilot plugsuit inspired by Darling in the Franxx, featuring form-fitting matte dark-charcoal and light-grey synthetic ballistic panels, reinforced ergonomic shoulder and knee plating, vibrant orange accent piping along the torso seams, a rigid mechanical stand-up collar with metallic interface nodes, and streamlined tactical boots.

MULTI-VIEW GRID SPECIFICATIONS (ALL PANELS FEATURE THE SAME PERSON):
- Panel 1: Full-body Front View standing in a neutral A-pose, arms slightly away from sides.
- Panel 2: Full-body Side Profile View standing upright in matching neutral pose.
- Panel 3: Full-body Back View showing complete rear suit construction, spine interface seams, and back of hair.
- Panel 4: Detailed Close-up Headshot portrait capturing facial likeness, neck collar details, and skin micro-textures.

STYLE: Shot on 35mm film stock, organic fine grain, clean high-CRI cinematic studio lighting, shallow depth of field, solemn photorealistic realism. Identical proportions, color palette, and textures across all panels. High-resolution concept art turnaround sheet, sharp focus, clean edge separation from background.
```

---

## 5. Why This Guarantees Success in Google Flow

1. **360-Degree Coverage:** Flow has visual keys for front, side, back, and face in a single file.
2. **Neutral Background (#E5E5E5):** Zero environmental bleed into future video clips.
3. **Face Identity Anchored:** Multimodal model locks onto the user's uploaded facial geometry.
4. **Concrete Outfit Descriptors:** Eliminates AI hallucination by spelling out fabrics, piping, seams, and plating.
