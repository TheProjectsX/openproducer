# Style Plugin: Commercial Tabletop & Product Advertising
**ID:** `commercial_tabletop`  
**Target Medium:** Commercial Advertising / High-End Studio Tabletop  
**Parent Specification:** [`../specs/01_visual_spec.md`](../specs/01_visual_spec.md)  

---

## 1. Master Style Anchor String (Verbatim Token Block — Ground-Level Default)
> `Shot on 100mm macro lens, f/2.8, razor-sharp edge definition, studio softbox diffusion lighting with pristine metallic rim reflections, micro-detail surface textures, ultra-clean studio stage, dynamic high-contrast commercial color grading, zero dust, commercial product showcase aesthetic.`

---

## 2. Dialect Variations Registry (Layer 2 Aesthetic Dialects)

When the creator requests a specific commercial advertising style, the compiler injects the corresponding descriptor into Tokens 81–130:

### A. `luxury_macro_watch` (High-End Horology / Jewelry Showcase)
* **Dialect Descriptor:** `Shot on 100mm macro lens, f/2.8, razor-sharp edge definition, brushed surgical 316L steel bevels, anti-reflective sapphire crystal reflections, studio octabank softbox diffusion, pristine linear metallic rim highlights, dark matte stage, luxury timepiece commercial aesthetic.`
* **Kinematics:** Continuous 360-degree orbital rotation, ultra-precise motorized trajectory, slow creeping push-in on watch dial face.
* **Dialect Negatives:** `fingerprints, dust, smudges, scratched metal, motion blur, cheap plastic.`

### B. `techwear_hardware` (Cyberpunk / Modern Consumer Tech Advertising)
* **Dialect Descriptor:** `Modern consumer tech commercial aesthetic, anodized aluminum chassis, matte dark titanium finishes, subtle neon cyan edge illumination, ultra-clean geometric staging, razor-sharp optical definition, high-contrast dynamic studio lighting.`
* **Kinematics:** High-speed linear tracking with smooth deceleration, snappy 45-degree angle snap, floating product rotation.
* **Dialect Negatives:** `organic dirt, scratches, vintage film grain, warm incandescent lighting.`

### C. `nordic_minimalist_cosmetic` (Scandinavian Organic Beauty / Tabletop)
* **Dialect Descriptor:** `Minimalist Scandinavian cosmetic commercial aesthetic, frosted glass bottles, smooth ceramic pedestals, warm natural side-window daylight, soft pastel travertine stone textures, clean negative space, organic luxury.`
* **Kinematics:** Gentle horizontal tracking glide, slow soft focal pull from foreground prop to hero cosmetic bottle.
* **Dialect Negatives:** `dark industrial shadows, neon lights, high-contrast harsh strobes, dirty surfaces.`

---

## 3. Materiality & Product Rules
* **Surfaces:** Pristine brushed steel, ceramic gloss, anodized aluminum, woven nylon, high-grade crystal glass with sharp anti-reflective coatings.
* **Tolerances:** Razor-sharp microscopic edge bevels, authentic metallic micro-grooves, pristine polished reflections.
* **Negative Space:** Clean, uncluttered composition designed to spotlight hero product geometry.

---

## 4. Studio Lighting Model
* **Lighting:** Commercial multi-head studio strobe setup with overhead octabank diffusion, dual edge softboxes creating continuous linear rim highlights along product contours.
* **Background:** Deep matte studio stage, neutral gradient sweep (`#1A1A1E` or `#F4F4F6`), or motivated tabletop environment.

---

## 5. Kinematic Grammar
* **Motion Style:** Precision mechanical rotation, smooth continuous 360-degree orbital arcs, controlled high-speed linear tracking with smooth deceleration.
* **Camera Kinematics:** Pure optical trajectory emulation (ultra-precise motorized trajectory, locked macro focal shifts). Banned all mechanical rig nouns.

---

## 6. Native Commercial Audio Foley Soundboard (Google Veo 3.1)
All Veo commercial prompts must enforce the canonical 4-part semicolon audio syntax:
* **Audio Anchor Template:** `Audio: SFX: [clean tactile effects]; Ambience: [studio room tone]; Dialogue: [spoken line or None]; Music: None.`
* **Studio Foley Bank:** `Audio: SFX: crisp satisfying metallic bezel click, smooth magnetic latch snap, soft tactile weighted knob turn, pristine ceramic clink; Ambience: dead quiet studio acoustic room tone, subtle electronic charge hum; Dialogue: None; Music: None.`
* **Music Suppression Rule:** Always enforce `; Music: None.` (commercial ad music is added during final post-production mix).

---

## 7. Mandatory Style Negative Prompt Clause
> `NEGATIVE PROMPT: dust, fingerprints, smudges, scratched surfaces, film grain, motion blur, distorted logo, deformed typography, cartoon, low resolution, cheap plastic, flat lighting, tripod, camera rig.`
