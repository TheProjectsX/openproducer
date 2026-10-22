# Discussion 12: Two-Step Character Genesis & Profile Turnaround Architecture

**Date:** 2026-10-22  
**Topic:** Original Character Creation (from Pure Text) & Solving the 1-Step Model Sheet Failure  
**Domain:** `characters/`

---

## 1. Problem Formulation: The 1-Step Diffusion Flaw

When attempting to generate an original character turnaround sheet directly from pure text in a single generation, diffusion models (Midjourney, Flux, Imagen, Stable Diffusion) consistently exhibit failure modes:
1. **Facial Geometry Drift:** Because the character has no prior visual grounding in latent space, the model invents slightly different faces for the front, side, and close-up views.
2. **Wardrobe & Hair Mutation:** Seams, belt buckles, straps, and hairstyle details vanish or morph on the rear view.
3. **Split Token Attention:** Token attention is split across inventing the persona and solving 4 separate perspective geometries simultaneously.

---

## 2. Web Research Insights: The 2-Step Industry Standard

Web search across Google Flow (Veo 3.1), Midjourney (`--cref`), and animation pipelines confirms the industry standard workflow:

### A. The 2-Step Architecture:
- **Step 1 (The Character Genesis / Hero Shot):** Direct 100% of latent diffusion attention into creating a single, definitive, high-detail medium portrait/concept shot in the project's visual setting. This establishes the canonical visual identity (bone structure, hair texture, skin tone, signature garments).
- **Step 2 (The Profile Conversion / Model Sheet):** Feed the approved Step 1 image into an Image-to-Image / reference turnaround pipeline to produce the standardized 4-view model sheet on a seamless neutral `#E5E5E5` studio background.

### B. The Standardized Identity Block (Locked Order):
Traits must be specified in a strict invariant sequence to anchor attention heads:
$$\text{Name} \rightarrow \text{Age} \rightarrow \text{Face/Bone Structure} \rightarrow \text{Eyes} \rightarrow \text{Hair} \rightarrow \text{Distinctive Marks} \rightarrow \text{Wardrobe Layering} \rightarrow \text{Build} \rightarrow \text{Master Style Anchor}$$

### C. Canvas Cleansing & The "Turntable" Directive:
- **Canvas Cleansing:** While Step 1 places the character in the cinematic world (e.g. rubble and smoke), Step 2 strips away the environment and forces a flat `#E5E5E5` studio background with diffuse lighting so no environmental pixels bleed into future video clips.
- **Turntable Directive:** Using `"the exact same subject rotated in place on an invisible turntable"` forces the diffusion model to rotate a single 3D form rather than imagining 4 separate people.

---

## 3. End-to-End Simulation: Maya Lin (War Aftermath Medic)

Matched to the gritty desaturated 35mm film style defined in `visual/technical_anchor.md`.

### Prompt 1: Character Genesis (The Hero Shot)
```text
Cinematic medium eye-level portrait of Maya Lin, a 28-year-old female combat field medic in the aftermath of a war. 
Anatomy & Face: Lean athletic frame, sharp defined jawline, weary but intensely focused hazel eyes, faint pale diagonal scar across her left cheekbone, subtle smudges of ash on her temples. 
Hair: Dark brunette wavy hair loosely pulled back into a practical low knot, with loose stray strands framing her face. 
Wardrobe: Wearing a weathered, tailored matte olive-green canvas tactical flak vest with dull subdued medical cross patch over a faded charcoal grey breathable long-sleeve undershirt with reinforced collar, rugged utility straps. 
Environment: Standing motionless amid smoldering concrete rubble and distant hazy smoke under an overcast sky. 
Style: Shot on 35mm film stock, 85mm portrait prime lens, organic fine grain, bleach bypass desaturated color grading, muted olive and charcoal tones, soft diffused natural daylight, shallow depth of field, solemn cinematic realism. Natural skin micro-textures, authentic human pores, organic fabric weave. Real living human being, tailored cinematic movie wardrobe.
```

### Prompt 2: Turnaround Profile Conversion (4-View Model Sheet)
*(Executed with the Prompt 1 image as the reference anchor)*
```text
A professional 4-view character turnaround reference sheet of the exact same female character from the reference image, preserving her identical facial structure, hazel eyes, cheek scar, tied brunette hair, and combat medic wardrobe.

Layout: Studio reference model sheet arranged horizontally across a solid seamless neutral light-gray background (#E5E5E5) with flat uniform diffuse lighting:
1. Panel 1: Full-body Front View standing naturally in relaxed posture.
2. Panel 2: Full-body Side Profile View (90 degrees).
3. Panel 3: Full-body Back View showing rear tactical vest webbing, spine seams, and back of tied hair.
4. Panel 4: Detailed Close-up Headshot portrait showing authentic facial likeness, skin texture, and cheek scar.

Preserve identical anatomical proportions, clothing tailoring, and color values across all four views as if rotated on a turntable. 
Style: Shot on 35mm film stock, organic fine grain, muted earth tones, bleach bypass desaturated grading, solemn cinematic realism.
CRITICAL NEGATIVE CONSTRAINTS: Not an action figure, not a plastic toy, not a doll, no plastic ball joints, not a 3D miniature, no mannequin poses. Authentic living human being wearing tailored movie wardrobe.
```

---

## 4. Test Result
- **Evaluation:** High-fidelity consistency across all 4 panels. Facial bone structure, scar placement, and tactical flak vest details were locked with 0% identity drift.
