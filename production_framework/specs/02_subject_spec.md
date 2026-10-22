# Specification: `subjects/` Domain (Universal Subject & Hero Asset Specification)

**Status:** ✅ FINALIZED (Master Universal Subject Specification)  
**Domain:** `subjects/` (Universal Parent Domain for Characters, Hero Products, Vehicles, Artifacts)  
**Target Engines:** Google Flow (Veo 3.1, Imagen 4, Gemini Omni Flash)  
**Specialized Child Specification:** [`02_character_spec.md`](./02_character_spec.md) (Authoritative Human & Anime Character Bible)

---

## 1. Domain Purpose & Philosophy

The `subjects/` domain defines and locks the visual, geometric, material, and acoustic identity of every hero subject across a production—eliminating **Identity & Geometry Drift** across sequential video cuts.

### The Universal Subject Principle:
Whether a video features a human actor, an animated protagonist, a luxury dive watch, a running shoe, a sports car, or a fantasy creature, **Google Flow (Veo 3.1) treats them using the exact same underlying generative mechanics**:

1. **Visual Anchor Key (Ingredient #1):** A clean, multi-angle 4-view model sheet generated on a seamless neutral light-gray background (`#E5E5E5`), uploaded into Google Flow as **Ingredient #1**.
2. **Text Anchor Key (Verbatim Anchor String):** A locked 25–40 word Master Anchor string deterministically injected into Tokens 1–30 of every downstream Veo video prompt.
3. **Acoustic Anchor Key:** Standardized voice delivery tags (for speaking characters) OR tactile ASMR foley signatures (for physical products).

---

## 2. The Subject Specialization Split

To ensure maximum clarity without diluting domain-specific research:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        SUBJECT TYPE DECISION                           │
└───────────────────┬────────────────────────────────┬───────────────────┘
                    │                                │
    [ HUMAN, ANIME & STYLIZED CHARACTERS ]    [ HERO PRODUCTS, VEHICLES & ARTIFACTS ]
                    │                                │
                    ▼                                ▼
       Consult Specialized Child Spec:         Governed Directly By This Spec:
        02_character_spec.md                    02_subject_spec.md
        • Facial biometrics & bone structure    • Rigid manufacturing tolerances
        • Cosplay deconstruction engine         • Asymmetry crown/port locking
        • 2-step genesis (Maya Lin)             • 4-panel product turntable on #E5E5E5
        • Anti-action-figure guards             • Tactile ASMR acoustic signatures
        • Spoken dialogue syntax rules          • Anti-melt & logo invariance rules
```

> **For Characters:** If the subject is a human, anime persona, or living creature, immediately refer to [`02_character_spec.md`](./02_character_spec.md) for full anatomical, cosplay, facial likeness, and dialogue delivery rules.

---

## 3. Directory Structure: `subjects/<subject_id>/`

Every subject in a project is isolated in its own folder:

```text
subjects/
└── <subject_id>/                  # e.g., chrono_watch/ or nike_air/ or maya_lin/
    ├── profile.md                 # Product Specs & Materiality (OR Character Demographics)
    ├── verbatim_anchor.txt        # LOCKED 25–40 word Master Anchor String for video prompts
    ├── hero_prompt.txt            # Step 1 prompt (Canonical Hero Portrait / Product Showcase)
    ├── turnaround_prompt.txt      # Step 2 prompt (4-view turntable sheet on #E5E5E5)
    ├── rules.md                   # Invariant constraints, asymmetry locks, anti-morphing guards
    └── references/
        ├── hero_portrait.png      # Approved Step 1 base image (canonical identity)
        └── turnaround_sheet.png   # Approved Step 2 model sheet (Ingredient #1 in Google Flow)
```

---

## 4. Product & Hero Asset Templates

### 4.1 Product Profile (`subjects/<product_id>/profile.md`)

```markdown
# Product Profile: [PRODUCT_NAME]

## 1. Product Identity & Category
- **Subject ID:** [product_id]
- **Type:** Product / Hero Asset
- **Category:** [e.g., Luxury Timepiece | Running Footwear | Consumer Tech | Vehicle]
- **Brand / Design Language:** [e.g., Minimalist matte titanium, Bauhaus utilitarian, aerodynamic]

## 2. Rigid Geometry & Dimensions
- **Form Factor:** [e.g., 42mm circular case, 12mm thickness, angular chamfered lugs]
- **Asymmetric Elements:** [e.g., Knurled screw-down crown strictly on the 3 o'clock position (right side)]
- **Primary Materials:** [e.g., Grade-5 brushed black titanium case, domed sapphire crystal, textured silicone strap]
- **Color Finishes:** [e.g., Matte charcoal-black casing, sunburst emerald-green dial, glowing white-green C3 lume]

## 3. Brand & Typography Invariants
- **Primary Branding:** [e.g., "Chrono-X" printed in clean sans-serif typography below 12 o'clock]
- **Indices & Markings:** [e.g., Applied baton indices, rotating dive bezel with crisp numerals 15, 30, 45]

## 4. Acoustic Profile (Tactile ASMR Sound Design)
- **Primary Foley Signature:** [e.g., High-precision 4Hz mechanical escapement ticking, crisp metallic bezel clicks]
- **Material Contact Sound:** [e.g., Dense ceramic tap, pressurized water seal hiss, silicone strap flex]
```

### 4.2 Product Verbatim Anchor (`subjects/<product_id>/verbatim_anchor.txt`)

> **Rule:** Strictly bounded between 25–40 words. Contains zero buzzwords. Injected verbatim into Tokens 1–30 of video prompts.

*Example:*
> `Chrono-X, a luxury black titanium dive watch with a knurled rotating bezel, dark emerald-green dial, glowing luminescent hands, and a textured black silicone strap with titanium pin buckle.`

### 4.3 Product Rules & Constraints (`subjects/<product_id>/rules.md`)

```markdown
# Product Rules & Invariant Constraints: [PRODUCT_NAME]

## 1. Absolute Invariants (Never Mutate)
- Dial color / Casing finish must remain [COLOR] under all lighting conditions.
- Asymmetry lock: Crown and rotating pushers are located strictly on the RIGHT side at the 3 o'clock position (left side of case remains completely smooth).
- Branding typography and bezel index positions must preserve exact orientation.

## 2. Anti-Melt & Rigidity Directives
- Rigid industrial manufacturing tolerances.
- Zero logo distortion, zero warped geometry, no melting buttons, no plastic rubbery artifacts.
```

---

## 5. The 4-Panel Turntable Sheet for Products on `#E5E5E5`

When generating the Step 2 model sheet (`turnaround_prompt.txt`) for commercial hero products, the layout standardizes on:

```
┌────────────────────────────────────────────────────────────────────────┐
│             PRODUCT 4-VIEW TURNTABLE ON SEAMLESS #E5E5E5               │
├──────────────┬──────────────────┬───────────────────┬──────────────────┤
│   PANEL 1    │     PANEL 2      │      PANEL 3      │     PANEL 4      │
│  Front Face  │ 90° Side Profile │ 45° Dynamic Angle │  Extreme Macro   │
│  Elevation   │ (Asymmetry Lock) │ (Isometric Volume)│ Texture & Detail │
└──────────────┴──────────────────┴───────────────────┴──────────────────┘
```

1. **Panel 1 (Front Elevation):** Direct face/dial view showing primary branding, shape, and frontal symmetry.
2. **Panel 2 (90° Side Profile):** Shows case thickness, buttons, crowns, strap buckles, or sole profiles—locking the right-side crown asymmetry.
3. **Panel 3 (45° Dynamic Isometric Angle):** Reveals 3D physical volume, top chamfers, surface curvature, and perspective depth.
4. **Panel 4 (Extreme Macro Texture):** Closes in on fine surface materiality (knurled metal teeth, stitching weave, embossed logo typography).

*Lighting & Background Standard:* Solid seamless `#E5E5E5` light-gray studio background with flat, shadowless diffuse lighting.

---

## 6. Product Genesis Workflows

### 6.0 Creator Intent Rule: Single Hero Showcase vs. 4-Panel Turntable Sheet
- **Default Delivery (The Hero Showcase):** Unless the creator explicitly uses terms like `"profile"`, `"model sheet"`, `"turntable"`, or `"technical angles"`, the Agent **MUST default to generating a single cinematic Hero Product Showcase (`hero_prompt.txt`)** in a rich, motivated commercial staging environment.
- **Conditional Delivery (The 4-Panel Turntable Sheet):** The 4-view turntable sheet on `#E5E5E5` (`turnaround_prompt.txt`) is generated only when:
  1. The creator explicitly requests a `"profile"`, `"turntable sheet"`, or `"model sheet"`.
  2. OR the creator approves the hero showcase, and the workflow enters Mode 3 (`sync`) to lock the reference asset (Ingredient #1) for Google Flow.

1. **Scenario 1: Creator Supplies Photos / CAD Renderings:**
   - Lock rigid casing dimensions and color values.
   - Deconstruct marketing jargon into physical material weaves and finishes.
   - Compile into 4-view model sheet on `#E5E5E5`.
2. **Scenario 2: New Product Genesis from Text (2-Step Genesis):**
   - **Step 1 (Hero Showcase):** Direct 100% of latent diffusion attention into generating a single, canonical, hero product image in commercial advertising lighting.
   - **Step 2 (Turntable Profile):** Feed the approved Step 1 image into the 4-panel turntable prompt on `#E5E5E5`.

---

## 7. Downstream Consumption by Google Flow & Veo 3.1

```
┌─────────────────────────────────────────────────────────────┐
│             subjects/<id>/references/                       │
│                turnaround_sheet.png                         │
└──────────────────────────────┬──────────────────────────────┘
                               │ Uploaded as
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                 GOOGLE FLOW INGREDIENT #1                   │
│                    (Subject Anchor)                         │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               │ Synchronized with
                               ▼
┌─────────────────────────────────────────────────────────────┐
│             subjects/<id>/verbatim_anchor.txt               │
│  [25–40 Word Locked Verbatim Anchor String]                 │
└──────────────────────────────┬──────────────────────────────┘
                               │ Injected into Tokens 1–30 of
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                 VEO 3.1 SHOT PROMPT COMPILER                │
│  [Tokens 1–30: Framing & Verbatim Subject Anchor]           │
│  [Tokens 31–80: Physical Dynamics & Motivated Lighting]     │
│  [Tokens 81–130: Master Style Anchor & Camera Kinematics]   │
│  [Trailing Block: Spoken Dialogue OR Tactile ASMR Audio]    │
└─────────────────────────────────────────────────────────────┘
```
