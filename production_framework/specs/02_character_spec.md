# Specification: `characters/` Domain (Character Turnaround & Identity Anchors)

**Status:** ✅ FINALIZED (Specialized Character Domain Specification)  
**Parent Universal Specification:** [`02_subject_spec.md`](./02_subject_spec.md)  
**Domain:** `characters/` (Specialized Human & Stylized Character Domain under `subjects/`)  
**Target Engines:** Google Flow (Veo 3.1, Imagen 4, Gemini Omni Flash)

> **Architectural Relationship:** This document is the deep, authoritative specification for **Human, Anime, Stylized, and Creature Characters**. For the overarching parent primitive governing commercial hero products, vehicles, and inanimate artifacts, consult the master [`02_subject_spec.md`](./02_subject_spec.md).

---

## 1. Domain Purpose & Philosophy

The `characters/` domain defines and locks every character's visual, anatomical, sartorial, and acoustic identity across a film production. It completely eliminates **Identity Drift** (faces warping, clothing changing, or voices shifting between video cuts).

### The Dual-Asset Anchor Architecture:
1. **Visual Anchor Key (Ingredient #1):** A standardized, 4-view model sheet generated on a seamless neutral light-gray studio background (`#E5E5E5`) uploaded into Google Flow as **Ingredient #1**.
2. **Text Anchor Key (Verbatim Anchor String):** A locked 25–40 word Master Anchor string deterministically injected into Tokens 1–30 of every downstream Veo video prompt.
3. **Acoustic Anchor Key (Vocal Profile):** Standardized voice timbre and delivery tags driving Veo 3.1's native dual-stream audio synthesizer.

---

## 2. Directory Structure & File Contract

Every character in a project is isolated in their own folder under `characters/` (or `subjects/<character_id>/`):

```text
characters/
└── <character_id>/                  # e.g., maya_lin/ or elena_vance/
    ├── profile.md                   # Human-readable demographics, biometrics, wardrobe, and vocal profile
    ├── verbatim_anchor.txt          # LOCKED 25–40 word Master Anchor String for video prompts
    ├── hero_prompt.txt              # Step 1 prompt used to generate the canonical hero portrait
    ├── turnaround_prompt.txt        # Step 2 prompt used to generate the 4-view model sheet
    ├── rules.md                     # Negative guards, invariant traits, asymmetry locks
    └── references/
        ├── hero_portrait.png        # Approved Step 1 base image (canonical identity)
        └── turnaround_sheet.png     # Approved Step 2 model sheet (Ingredient #1 in Google Flow)
```

---

## 3. Standard File Templates

### 3.1 `characters/<character_id>/profile.md` (Human Review & Trait Bible)

```markdown
# Character Profile: [CHARACTER_NAME]

## 1. Identity & Demographics
- **Character ID:** [character_id]
- **Role / Archetype:** [e.g., Combat Field Medic | Lead Detective | High-Tech Pilot]
- **Age & Gender:** [e.g., 28-year-old female]
- **Perceived Ethnicity / Heritage:** [e.g., East Asian descent | Mediterranean]

## 2. Anatomical Biometrics & Distinctive Features
- **Bone Structure:** [e.g., Sharp angular jawline, high cheekbones, straight nose bridge]
- **Eyes:** [e.g., Weary, intense hazel eyes with faint dark circles]
- **Hair:** [e.g., Dark brunette wavy hair loosely tied back in a low knot, loose strands framing face]
- **Distinctive Invariant Markers:** [e.g., Diagonal pale scar across left cheekbone, faint soot smudge on temple]
- **Build & Stature:** [e.g., Lean athletic 5'7 frame, broad natural shoulders]

## 3. Signature Wardrobe (Physical Materiality)
- **Primary Garment:** [e.g., Weathered matte olive-green canvas tactical flak vest with dull subdued medical cross patch]
- **Base Layer:** [e.g., Faded charcoal-grey breathable long-sleeve undershirt with reinforced collar]
- **Lower Body:** [e.g., Olive-drab ripstop cargo trousers tucked into rugged scuffed combat boots]
- **Accessories:** [e.g., Weathered fingerless gloves, webbed utility belt with holstered first-aid pouch]

## 4. Vocal Profile (Audio Synthesis)
- **Timbre & Pitch:** [e.g., Raspy low-pitched alto, weathered tone]
- **Delivery Cadence:** [e.g., Calm, quiet, clipped military cadence under pressure]
```

### 3.2 `characters/<character_id>/verbatim_anchor.txt` (Authoritative Flow String)

> **Rule:** Must be strictly bounded between 25–40 words. Contains zero buzzwords. Injected verbatim into Tokens 1–30 of video prompts.

```text
[CHARACTER_NAME], a [AGE]-year-old [BUILD] [GENDER] with [EYE_COLOR] eyes, [DISTINCTIVE_MARKER], [HAIRSTYLE_AND_COLOR], wearing [PRIMARY_GARMENT_MATERIAL] over [BASE_LAYER].
```
*Example:*
> `Maya Lin, a 28-year-old lean athletic female combat medic with weary hazel eyes, a faint diagonal scar on her left cheekbone, messy tied-back dark wavy hair, wearing a distressed olive-green canvas tactical flak vest over a faded charcoal undershirt.`

### 3.3 `characters/<character_id>/rules.md` (Invariant & Safety Directives)

```markdown
# Character Rules & Invariant Constraints: [CHARACTER_NAME]

## 1. Absolute Invariants (Never Mutate)
- Eye color must remain [COLOR] across all lighting conditions.
- Cheek scar is located strictly on the **LEFT cheekbone** (the right side remains completely unscarred).
- Hair length remains shoulder-length tied in a low knot; must never appear loose or short.

## 2. Anti-Artifact Directives
- **Anti-Toy Banning:** Real living human being in tailored movie wardrobe. Not an action figure, not a plastic toy, not a doll, no plastic ball joints, not a 3D miniature, no mannequin poses.
- **Detachable Props:** Hands must remain empty in model sheets. Sidearms and gear must remain securely holstered at hip.

## 3. Style Synchronization
- Inherits master style directly from `visual/technical_anchor.md`.
```

---

## 4. The Two Production Genesis Workflows

### 4.0 Creator Intent Rule: Single Hero Shot vs. 4-Panel Profile Sheet
- **Default Delivery (The Hero Shot):** Unless the creator explicitly uses terms like `"character profile"`, `"profile"`, `"turnaround"`, or `"model sheet"`, the Agent **MUST default to generating a single cinematic Hero Shot (`hero_prompt.txt`)** featuring an expressive, iconic character pose placed inside a motivated, atmospheric environment.
- **Conditional Delivery (The 4-Panel Model Sheet):** The 4-view model turnaround sheet on `#E5E5E5` (`turnaround_prompt.txt`) is reserved strictly for when:
  1. The creator explicitly asks for a `"profile"`, `"character profile"`, or `"model sheet"`.
  2. OR the creator approves the hero shot, and the workflow enters Mode 3 (`sync`) to lock the reference asset (Ingredient #1) for Google Flow.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        WORKFLOW DECISION POINT                         │
└───────────────────┬────────────────────────────────┬───────────────────┘
                    │                                │
     [ CREATOR SUPPLIES OWN PHOTO ]         [ ORIGINAL CHARACTER FROM TEXT ]
                    │                                │
                    ▼                                ▼
       [ SCENARIO 1: IMAGE-TO-CHAR ]        [ SCENARIO 2: 2-STEP GENESIS ]
       1. Lock Facial Biometrics            Step 1: Hero Concept Portrait
       2. Inherit Real Body Build                    │ (Approved Hero Shot)
       3. Cosplay Deconstruction Engine              ▼
                    │                       Step 2: Profile Model Sheet
                    │                                │
                    └────────────────┬───────────────┘
                                     │
                                     ▼
                     [ 4-VIEW MODEL SHEET ON #E5E5E5 ]
                     • Panel 1: Front Full-Body
                     • Panel 2: Side Profile (90°)
                     • Panel 3: Back Full-Body
                     • Panel 4: Close-up Headshot
                                     │
                                     ▼
                     [ INGREDIENT #1 IN GOOGLE FLOW ]
```

### Scenario 1: Creator Supplies Their Own Photo (Image-to-Character)
When a creator uploads their photo and requests custom wardrobe/cosplay:
1. **Biological Landmark Invariance (Anti-Drift):** Treat facial bone structure, zygomatic arches (cheekbones), nose bridge contours, jawline angle, and eye socket geometry as locked immutable constraints. Explicitly forbid the model from substituting a generic idealized or cartoon face.
2. **Expression Decoupling Engine:** Decouple permanent bone geometry from transient emotions. The prompt explicitly commands: *"Retain 100% of the woman's authentic facial bone structure and facial landmarks from the reference photo, but dynamically animate her expression into [smile / wink / smirk / focus]."*
3. **Full-Body Biological Inheritance & Downward Extrapolation:** Anchor the real person's natural height, musculoskeletal build, shoulder-to-hip proportions, and natural posture. When only a face-only headshot is provided, biometrics (height, slim/athletic build, skin tone, age) are anchored via explicit text descriptors while the visible upper collar/garment is seamlessly extrapolated downward into matching tailored lower pieces (skirt/trousers, belt, footwear) with identical textile weave.
4. **Cosplay Deconstruction Engine:** Automatically expand pop-culture and anime terms into physical garment descriptors (materials, piping, armor plates, collars) to prevent AI hallucination.
5. **Style Harmonization:** If target is Anime, translate both face and body into unified 2D hand-drawn cel art. If target is Live Action, render a real living actor in tailored movie costume.

### Scenario 2: Original Character Creation from Pure Text (2-Step Architecture)
When creating an original character without a source photo, generating a 4-view sheet in 1 step causes **split token attention** and **facial drift across panels**. The mandatory 2-step pipeline solves this:

#### Step 1: Character Genesis (`hero_prompt.txt`)
Directs 100% of latent diffusion attention into creating **one coherent living persona**:
- **Locked Order:** Name $\rightarrow$ Age $\rightarrow$ Bone Structure $\rightarrow$ Eyes $\rightarrow$ Hair $\rightarrow$ Distinctive Markers $\rightarrow$ Wardrobe Layering $\rightarrow$ Stature $\rightarrow$ Master Style Anchor.
- **Physical Materiality:** Specifies fabric weaves, seam weights, and garment tailoring.
- **Environment:** Placed naturally in the film's world with motivated lighting.

#### Step 2: Turnaround Profile Conversion (`turnaround_prompt.txt`)
Takes the approved Step 1 image as the reference anchor:
- **Canvas Cleansing:** Strips environmental rubble and forces a solid, seamless `#E5E5E5` light-gray background with flat, shadowless diffuse lighting.
- **Turntable Directive:** Forces the model to rotate the exact 3D form (*"the exact same subject rotated in place on an invisible turntable"*).
- **Standardized 4 Panels:** Panel 1 (Front), Panel 2 (Side 90°), Panel 3 (Back), Panel 4 (Facial Close-up).

---

## 5. Universal Medium Adaptability Matrix

| Visual Medium / Paradigm | Step 1 (Genesis Hero Adaptation) | Step 2 (Profile Model Sheet Adaptation) | Mandatory Guardrails |
|---|---|---|---|
| **1. Ultra-Realistic Live-Action** | 85mm portrait prime lens, natural skin micro-pores, authentic subsurface scattering, organic textile drape. | Solid `#E5E5E5` cyclorama, flat diffuse studio lighting, real human actor in movie wardrobe. | Ban action figures, dolls, plastic ball joints, 3D miniatures. |
| **2. Traditional 2D Cel Anime** | Hand-drawn cel animation, bold uniform ink lines, flat unshaded color fills, locked 24fps aesthetic. | Classic production model sheet (*settei* / 設定資料), white studio paper, multi-angle line art. | Ban 3D rendering, plastic surfaces, and volumetric CGI lighting (prevents doubled jittery lines). |
| **3. Stylized 3D CGI** | Stylized proportions, tactile vinyl/felt micro-textures, warm subsurface scattering on skin, expressive stylized planes. | Digital T-pose / A-pose 3D asset model sheet, neutral gray background. | Keep facial planes stylized to avoid uncanny valley realism. |
| **4. Fantasy Armor & Mecha Suits** | Deconstruct into physical plates: lightweight articulated polycarbonate armor, silicone seals, matte finish. | Multi-angle view revealing rear thrusters, waist articulations, and weapon holsters. | Never say just "mecha suit"; always describe tailored flexible undersuit with articulated composite plates. |
| **5. Non-Human Creatures / Robots** | Replace human biometrics with creature anatomy (chassis plating, servo joints, reptilian scales, tail length). | Turnaround showing dorsal, lateral, and ventral silhouettes on neutral gray. | Must explicitly constrain tail length, limb counts, and ocular placement across all 4 panels. |

---

## 6. Engine Directives & Failure Mode Guards

1. **The "Action Figure Trap" Guard:**
   - *Cause:* Diffusion models associate words like "model sheet", "mecha suit", and "standing pose" with collectible toys.
   - *Directives:* Explicitly enforce: `Real living human being wearing tailored cinematic movie wardrobe. Not an action figure, not a plastic toy, not a doll, no plastic ball joints, not a 3D miniature, no mannequin poses.`
2. **The Asymmetry / Mirroring Glitch Guard:**
   - *Cause:* Diffusion models mirror scars, eyepatches, or mechanical arms to both sides or flip them across profile views.
   - *Directives:* Explicitly bind asymmetric traits to the specific panel in `turnaround_prompt.txt`:
     `Panel 2: Left side profile showing the diagonal scar across the left cheekbone (the right side of the face remains completely unscarred and clear).`
3. **The Detachable Prop Hallucination Guard:**
   - *Cause:* Loose handheld weapons warp, float, or vanish across panels.
   - *Directives:* Strictly enforce empty hands in model sheets:
     `Hands in relaxed open standing posture, empty hands, sidearms and knives securely holstered at hip utility belt.`
4. **Dialogue Syntax Formula (Veo 3.1 Dual-Stream Audio):**
   - Spoken speech is directed via natural language tokens without UI dropdown dependencies:
     $$\mathbf{[Character\ Name]\ says,\ [delivery\ modifier]:\ [Spoken\ words\ in\ sentence\ case,\ max\ 15\text{--}20\ words].}$$
   - *Rule:* Never use ALL CAPS in spoken dialogue (causes Veo to spell letter-by-letter). Always use a preceding colon.

---

## 7. Downstream Consumption by Google Flow & Veo 3.1

```
┌─────────────────────────────────────────────────────────────┐
│             characters/<id>/references/                     │
│                turnaround_sheet.png                         │
└──────────────────────────────┬──────────────────────────────┘
                               │ Uploaded as
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                 GOOGLE FLOW INGREDIENT #1                   │
│                    (Character Anchor)                       │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               │ Synchronized with
                               ▼
┌─────────────────────────────────────────────────────────────┐
│            characters/<id>/verbatim_anchor.txt              │
│  "Maya Lin, a 28-year-old lean athletic female combat       │
│   medic with weary hazel eyes, faint diagonal scar..."      │
└──────────────────────────────┬──────────────────────────────┘
                               │ Injected into Tokens 1–30 of
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                 VEO 3.1 SHOT PROMPT COMPILER                │
│  [Tokens 1–30: Framing & Verbatim Anchor]                   │
│  [Tokens 31–80: Biomechanical Action & Motivated Lighting]  │
│  [Tokens 81–130: Master Style Anchor & Camera Kinematics]   │
│  [Trailing Block: Spoken Dialogue & Foley Audio]            │
└─────────────────────────────────────────────────────────────┘
```
