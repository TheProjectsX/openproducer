# 04. Character & Cross-Scene Consistency Architecture

## 1. The Consistency Problem in AI Filmmaking

In generative video diffusion models, independent generations sample random latent seeds. Consequently, generating multi-clip scenes via basic text-to-video (T2V) prompts causes severe **Identity Drift**:
- Facial features, bone structure, and eye color shift between cuts.
- Hair length, styling, and color subtly morph.
- Wardrobe details (jacket collars, buttons, fabric weave) alter uncontrollably.
- Age and perceived ethnicity fluctuate across varying camera angles.

To produce professional narrative video where the same protagonist traverses multiple scenes, an agent must enforce a strict **Multi-Asset Binding Protocol**.

---

## 2. The Google Flow "Ingredients to Video" Architecture

Google Flow and Veo 3.1 solve identity drift through the **"Ingredients" reference system**, which accepts up to **three visual anchor keys**:

```
                       ┌─────────────────────────────────────────┐
                       │        PRE-PRODUCTION ASSET BINDING     │
                       └────────────────────┬────────────────────┘
                                            │
               ┌────────────────────────────┼────────────────────────────┐
               │                            │                            │
               ▼                            ▼                            ▼
      [ INGREDIENT 01 ]            [ INGREDIENT 02 ]            [ INGREDIENT 03 ]
      Character Anchor             Wardrobe / Prop Key          Style / Lighting Bible
      • Neutral Studio Lighting    • Key handheld artifact      • Color palette reference
      • Solid Grey Background      • Weapon / Vehicle / Watch   • Grain & lens profile
      • 3-Angle Turnaround         • Material & texture lock    • Atmospheric tone
               │                            │                            │
               └────────────────────────────┼────────────────────────────┘
                                            │
                                            ▼
                       ┌─────────────────────────────────────────┐
                       │      VEO 3.1 GENERATION PIPELINE        │
                       │  (Latent Identity Locked via Keys)     │
                       └────────────────────┬────────────────────┘
                                            │
                      ┌─────────────────────┴─────────────────────┐
                      ▼                                           ▼
                 [ SHOT 01 ]                                 [ SHOT 02 ]
         Character in Rainy Street                   Character in Sunny Diner
        (Identity & Wardrobe Locked)                (Identity & Wardrobe Locked)
```

### 2.1 The Reference Sheet Standard (Imagen 4 Generation)
Before generating any video clips, generate high-resolution static reference sheets using Imagen 4:
- **Background Rule:** Generate against a **solid neutral light-grey or off-white seamless cyclorama studio background**.  
  *Why:* If the character reference image contains an environmental background (e.g., trees or city buildings), Veo’s spatial encoder will bleed those background elements into target video shots, causing visual artifacts.
- **Lighting Rule:** Use flat, neutral, high-CRI soft studio lighting to illuminate all facial planes evenly without harsh directional shadows.
- **Framing:** Generate a 3-way character turnaround: Frontal View, Three-Quarter View, and Profile View.

---

## 3. The Verbatim Prompt Anchor Protocol

While visual ingredients lock the latent geometry, prompt text must reinforce the identity without introducing descriptive noise.

### Rule 1: The Verbatim Character Identifier
Establish a complete, granular Master Character Description during pre-production. Once locked, **this description string must be inserted verbatim into every single clip prompt featuring that character**. Never summarize, rephrase, or abbreviate.

```
[ MASTER CHARACTER ANCHOR ]
"Arthur, a 42-year-old weathered maritime captain with rough salt-and-pepper beard, 
deep crow's feet around steel-blue eyes, wearing a heavy navy-blue wool peacoat 
with anchor-stamped black horn buttons, a cream cable-knit turtleneck sweater, 
and a dark charcoal knitted sailor beanie."
```

### Rule 2: The Variable Isolation Principle
In multi-clip sequences, keep the Master Character Anchor 100% identical. Modulate **only** the cinematic variables:
- **Variable 1:** Camera Framing & Movement (`Medium Shot, slow push-in` $\rightarrow$ `Low-angle wide shot, static`)
- **Variable 2:** Action & Biomechanics (`grips the wooden helm firmly` $\rightarrow$ `steps out onto the wet deck`)
- **Variable 3:** Setting & Environment (`dimly lit wheelhouse` $\rightarrow$ `windswept stormy ocean deck`)
- **Variable 4:** Lighting & Atmosphere (`amber lantern glow` $\rightarrow$ `cold blue lightning flashes`)

---

## 4. Multi-Shot Consistency Matrix

To execute a 4-shot sequence with complete character and prop locking:

| Shot ID | Framing | Verbatim Character Anchor | Action Variable | Setting & Lighting Variable | Audio Block |
|---|---|---|---|---|---|
| **SH_01** | `Wide Shot, slow lateral track` | `[Arthur Anchor String]` | Walks slowly along the wooden harbor pier with hands deep in coat pockets. | Misty dawn harbor, cold desaturated blue hour light, damp wooden planks. | `Audio: gentle harbor water lapping, distant foghorn, creaking wood.` |
| **SH_02** | `Medium Close-Up, locked tripod` | `[Arthur Anchor String]` | Pauses, exhales visible vapor, and looks up toward the horizon. | Same harbor pier, soft morning mist, golden dawn light cresting horizon. | `Audio: soft ocean breeze, measured breath exhale, faint seabirds.` |
| **SH_03** | `Extreme Close-Up, slow push-in` | `[Arthur Anchor String]` | Eyes narrow with quiet resolve; a faint smile forms on his weathered face. | Close focus on eyes, warm golden rim light on cheek and beard. | `Audio: quiet wind rustle, heart-rate pulse hum, zero music.` |
| **SH_04** | `Medium Shot, handheld follow` | `[Arthur Anchor String]` | Unzips heavy coat, reaches inside, and speaks: *"The tide is turning."* | Walking onto fishing vessel deck, bright morning sunlight. | `Audio: footsteps on metal deck, ship engine idling, Arthur's deep resonant voice.` |

---

## 5. Technical Input Modes: Ingredients vs. First Frame vs. End Frame

It is critical for an orchestrating agent to select the correct image input parameter depending on the cinematic requirement:

| Input Parameter | API Parameter | Function & Behavior | Best Use Case |
|---|---|---|---|
| **Ingredients (Reference Key)** | `image=ref_image` (with open T2V prompt) | Guides character likeness and aesthetic style without forcing the exact opening pose or framing. | Cutting to a new camera angle or new scene with the same character. |
| **Start Frame (First Frame Anchor)** | `image=first_frame` (strict I2V mode) | Enforces that Frame 0 of the generated video is pixel-for-pixel identical to the provided image. | Seamless shot continuity, continuing motion directly from a previous shot's last frame. |
| **Start + End Frame (Interpolation)** | `image=start_img, last_frame=end_img` | Forces model to synthesize motion that strictly originates at Image A and terminates exactly at Image B. | Controlled object transformations, match cuts, precise complex camera moves between two exact compositions. |

---

## 6. Multi-Character Scene Rules

When two or more distinct characters occupy the same frame:
1. **Assign Explicit Names and Spatial Placement:**  
   Always declare character position relative to screen space:  
   *`"Two-shot of Elena (left, dark trench coat) and Marcus (right, grey suit) standing across a marble kitchen island..."`*
2. **Distinct Physical Contrasts:**  
   Ensure interacting characters possess starkly different silhouettes, hair colors, and wardrobe palettes. Avoid two characters wearing similar dark coats in the same frame, which triggers latent feature blending.
3. **Dialogue Segregation:**  
   To prevent vocal and lip-sync confusion, use single-speaker shot coverage (see [06_audio_and_dialogue.md](./06_audio_and_dialogue.md)).
