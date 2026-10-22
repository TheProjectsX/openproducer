# Discussion Log: Character Domain & Reference Turnarounds

**Status:** ✅ FINALIZED (Character Domain Discussion Record)  
**Authoritative Final Specification:** [`../production_framework/specs/02_character_spec.md`](../production_framework/specs/02_character_spec.md)

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
- **Kakashi Hatake:** Padded olive-green tactical flak vest with chest utility pockets, dark-navy breathable fabric face mask covering lower face from nose bridge down to neck, tilted Leaf Village metallic forehead plate, natural silver-grey textured hair, fingerless gloves, calf bandages.
- **Darling in the Franxx (Mecha Plugsuit):** Form-fitting dark-charcoal neoprene bodysuit, lightweight articulated chest and shoulder plates, orange technical seam piping, mechanical collar.

### C. Known Open Challenges & Backlog Items
1. **Subtle Facial Drift & Resemblance Retention (HIGH PRIORITY BACKLOG):** Models (Gemini/Imagen/Veo) still substitute generic AI faces or subtly distort unique human landmarks when adapting user photos into stylized characters.
   - *Status:* Explicitly logged to return to this for deep prompt optimization and benchmark testing. See [`_raw/25_backlog_face_sync_fidelity_with_reference_image.md`](./_raw/25_backlog_face_sync_fidelity_with_reference_image.md).
2. **Body Structure / Scale Mismatch:** Models sometimes default to idealized superhero proportions rather than strictly preserving real torso/limb scale.
   - *Explorations:* 2-step pure face transfer prior to wardrobe styling; explicit biometric taxonomy; Flow Ingredient #1 conditioning weighting.

---

## 3. Scenario 2: New Original Character Creation (The 2-Step Architecture)

When a creator has no reference photo and wants to invent a character from pure text, asking an AI for a 4-view model sheet in a single generation causes **split token attention** and **facial geometry drift across panels**.

To solve this, we use the **2-Step Character Architecture**:

```text
Step 1: Character Genesis (The "Hero" Portrait) ──▶ Approved Single Base Image
                                                               │
Step 2: Profile Conversion (4-View Turntable on #E5E5E5) ◄─────┘
                                                               │
                                                               ▼
                                                  Ingredient #1 in Google Flow
```

### Step 1: Character Genesis (The "Hero" Shot)
Directs 100% of latent diffusion attention into creating **one coherent living human persona** in the project's visual world:
- **Locked Order Formula:** Name $\rightarrow$ Age $\rightarrow$ Bone/Face Structure $\rightarrow$ Eyes $\rightarrow$ Hair $\rightarrow$ Distinctive Markers $\rightarrow$ Wardrobe Layering $\rightarrow$ Stature $\rightarrow$ Master Style Anchor.
- **Physical Materiality:** Explicitly specifies fabric weaves, seam weights, and garment tailoring (e.g. *"matte olive-green canvas flak vest"* rather than *"tactical suit"*).

### Step 2: Turnaround Profile Conversion (4 Views on `#E5E5E5`)
Feeds the approved single image from Step 1 as a reference anchor into an Image-to-Image / turnaround prompt:
- **Background Cleansing:** Strips environmental rubble/lighting into a solid, seamless `#E5E5E5` light-gray studio background with flat diffuse lighting.
- **The "Turntable" Constraint:** Forces the model to rotate the exact 3D form (*"the exact same subject rotated in place on an invisible turntable"*).
- **The 4 Standardized Panels:** Front View, 90° Side Profile View, Back View, Close-up Headshot.
- **Anti-Toy Guards:** Strictly forbids action figures, plastic toys, ball joints, and 3D miniatures.

---

## 4. End-to-End Simulation: Maya Lin (War Aftermath Medic)

Tested against our 35mm film style baseline from `visual/technical_anchor.md`:

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
```text
A professional 4-view character turnaround reference sheet of the exact same female character from the reference image, preserving her identical facial structure, hazel eyes, cheek scar, tied brunette hair, and combat medic wardrobe.

Layout: Studio reference model sheet arranged horizontally across a solid seamless neutral light-gray background (#E5E5E5) with flat uniform diffuse lighting:
1. Panel 1: Full-body Front View standing naturally in relaxed posture.
2. Panel 2: Left side profile showing the diagonal scar across the left cheekbone (the right side of the face remains completely unscarred).
3. Panel 3: Full-body Back View showing rear tactical vest webbing, spine seams, and back of tied hair.
4. Panel 4: Detailed Close-up Headshot portrait showing authentic facial likeness, skin texture, and cheek scar.

Preserve identical anatomical proportions, clothing tailoring, and color values across all four views as if rotated on a turntable. 
Style: Shot on 35mm film stock, organic fine grain, muted earth tones, bleach bypass desaturated grading, solemn cinematic realism.
CRITICAL NEGATIVE CONSTRAINTS: Not an action figure, not a plastic toy, not a doll, no plastic ball joints, not a 3D miniature, no mannequin poses. Authentic living human being wearing tailored movie wardrobe.
```

---

## 5. Universal Style Generalizability Matrix

| Visual Medium / Paradigm | Step 1 (Genesis Adaptation) | Step 2 (Profile Adaptation) | Crucial Failure Mode Guard |
|---|---|---|---|
| **1. Ultra-Realistic Live-Action** | 85mm portrait lens, skin pores, natural subsurface scattering, organic textile drape. | Solid `#E5E5E5` cyclorama, flat studio lighting, real human actor in movie wardrobe. | Ban action figures, dolls, plastic ball joints, 3D miniatures. |
| **2. Traditional 2D Cel Anime** | Hand-drawn cel animation, bold uniform ink lines, flat unshaded color fills, locked 24fps aesthetic. | Classic production model sheet (*settei* / 設定資料), white studio paper, multi-angle line art. | Ban 3D rendering, plastic surfaces, and volumetric CGI lighting (prevents doubled jittery lines). |
| **3. Stylized 3D CGI** | Stylized proportions, tactile vinyl/felt micro-textures, smooth subsurface scattering, expressive stylized planes. | Digital T-pose / A-pose 3D asset model sheet, neutral gray background. | Keep facial planes stylized to avoid uncanny valley realism. |
| **4. Fantasy Armor & Mecha Suits** | Deconstruct into physical plates: lightweight articulated polycarbonate armor, silicone seals, matte finish. | Multi-angle view revealing rear thrusters, waist articulations, and weapon holsters. | Never say just "mecha suit"; always describe tailored flexible undersuit with articulated composite plates. |
| **5. Non-Human Creatures / Robots** | Replace human biometrics with creature anatomy (chassis plating, servo joints, reptilian scales, tail length). | Turnaround showing dorsal, lateral, and ventral silhouettes on neutral gray. | Must explicitly constrain tail length, limb counts, and ocular placement across all 4 panels. |

---

## 6. Two Critical Edge Cases & Their Solutions

1. **The Asymmetry / Mirroring Glitch (Left vs. Right):**
   - *Problem:* Models mirror facial scars, eyepatches, or mechanical arms to both sides or flip them across side views.
   - *Fix:* Explicitly bind the feature to the specific panel: `"Panel 2: Left side profile showing the diagonal scar across the left cheekbone (right side of face remains completely unscarred)."`
2. **The Detachable Prop Hallucination:**
   - *Problem:* Handheld weapons (rifles, swords) warp, float, or vanish across panels.
   - *Fix:* In character identity sheets, **strictly enforce empty hands and holstered gear** (`"Hands in relaxed open standing posture, empty hands, sidearms securely holstered at hip utility belt"`).

---

## 7. Directory Contract: `characters/<character_id>/`

```text
characters/
└── <character_id>/                  # e.g., maya_lin/
    ├── profile.md                   # Human-readable demographics, personality, costume details
    ├── verbatim_anchor.txt          # LOCKED 25–40 word Master Anchor String for video prompts
    ├── hero_prompt.txt              # Step 1 prompt used to generate the canonical hero portrait
    ├── turnaround_prompt.txt        # Step 2 prompt used to generate the 4-view model sheet
    ├── rules.md                     # Negative guards, invariant traits, asymmetry rules
    └── references/
        ├── hero_portrait.png        # Approved Step 1 base image
        └── turnaround_sheet.png     # Approved Step 2 model sheet (Ingredient #1 in Flow)
```

---

*Note: For the unedited step-by-step logs and raw prompts, see [`_raw/10_character_turnaround_from_user_photo.md`](./_raw/10_character_turnaround_from_user_photo.md), [`_raw/11_solving_the_action_figure_trap.md`](./_raw/11_solving_the_action_figure_trap.md), [`_raw/12_two_step_character_genesis_and_turnaround.md`](./_raw/12_two_step_character_genesis_and_turnaround.md), and [`_raw/13_character_turnaround_generalizability_and_edge_cases.md`](./_raw/13_character_turnaround_generalizability_and_edge_cases.md).*

