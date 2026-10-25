# Style Plugin: Stop-Motion & Tactile Claymation
**ID:** `stop_motion_claymation`  
**Target Medium:** Physical Handcrafted Stop-Motion, Plasticine Claymation & Miniature Puppet Animation  
**Parent Specification:** [`../specs/01_visual_spec.md`](../specs/01_visual_spec.md)  
**Research Reference:** [`../../research/styles/03_stop_motion_and_claymation.md`](../../research/styles/03_stop_motion_and_claymation.md)

---

## 1. Master Style Anchor String (Verbatim Token Block — Ground-Level Default)
> `Handcrafted stop-motion claymation, sculpted plasticine clay characters with visible tactile surface thumbprint impressions, matte non-glossy finish, miniature tabletop diorama set, macro 100mm lens, shallow depth of field, warm overhead practical studio spotlights, 12fps stop-motion stepped animation timing on twos, tangible physical puppet craft aesthetic.`

---

## 2. Dialect Variations Registry (Layer 2 Aesthetic Dialects)

When the creator requests a specific stop-motion studio, material medium, or artisanal school, the compiler injects the corresponding descriptor into Tokens 81–130:

### A. `aardman_plasticine_comedy` (British Plasticine Comedy Aesthetic)
* **Dialect Descriptor:** `Aardman animations style, handcrafted claymation, plasticine clay character, prominent visible thumbprint impressions on clay surface, matte non-shiny finish, large expressive googly eyes with black dot pupils, wide comical smile, slightly asymmetrical hand-sculpted features, miniature diorama workshop set made of painted cardboard, macro 100mm lens.`
* **Kinematics:** Choppy 12fps puppet movements, sudden frantic double-take head turn, slight frame-to-frame clay crease shifts, subtle camera push-in.
* **Dialect Negatives:** `smooth digital 3D CGI, glossy plastic render, photorealistic human skin, smooth 60fps motion, flat 2D cartoon, airbrushed textures.`

### B. `laika_dark_fantasy` (Laika Studios Artisanal Dark Fantasy)
* **Dialect Descriptor:** `Laika Studios stop-motion style, artisanal handcrafted puppet animation, miniature ball-and-socket metal armature skeleton, delicate silicone skin with subtle replacement-face seam lines, intricately wired wool and tweed miniature clothing, dark gothic whimsical atmosphere, moody volumetric directional studio lighting, physical miniature diorama stage, macro lens depth of field.`
* **Kinematics:** Slow deliberate head tilt with mechanical puppet precision, subtle eerie eye dart, fabric micro-sway in miniature draft, slow creeping tracking shot.
* **Dialect Negatives:** `cheap clay, smooth Pixar render, flat lighting, digital vector art, hyper-smooth video interpolation.`

### C. `wes_anderson_felted_puppet` (Handcrafted Needle-Felt Storybook Cinema)
* **Dialect Descriptor:** `Wes Anderson stop-motion aesthetic, Fantastic Mr. Fox style, handcrafted needle-felted wool animal character, visible fuzzy fiber textures and flyaway fuzz, tiny tailored corduroy and tweed clothing with visible miniature stitches, warm autumnal color palette with mustard yellow and burnt orange, strict mathematical symmetrical center framing, miniature diorama set made of moss and twigs, soft studio side-lighting, macro photography.`
* **Kinematics:** Staccato head turns, rigid puppet posturing, tiny fast paw gestures, flat perpendicular horizontal tracking glide across miniature set.
* **Dialect Negatives:** `smooth plastic, digital CGI fur, dynamic diagonal camera angles, neon colors, digital gloss.`

### D. `tactile_papercraft_cutout` (Collage & Surrealist Cutout Animation)
* **Dialect Descriptor:** `Handcrafted stop-motion paper cutout animation, layered textured cardboard puppets, visible torn paper fiber edges, collage art style, Jan Švankmajer surrealist stop-motion aesthetic, physical papercraft miniature stage, harsh directional shadow play, tactile vintage paper textures, stepped 12fps stop-motion frame stutter.`
* **Kinematics:** Flat planar limb displacement, hinged 2D paper movement, jerky sudden rotations, static eye-level macro lock.
* **Dialect Negatives:** `smooth digital curves, vector lines, 3D volumetric shading, fluid motion.`

---

## 3. Anatomical & Materiality Rules (Scale & Physical Imperfection)
* **Miniature Optical Physics:** Enforce macro 100mm lens physics, shallow depth of field, and tilt-shift focus falloff. The scene must physically render as a tabletop miniature diorama; strictly prevent human-sized architectural scale hallucinations.
* **Tactile Surface Flaws:** Mandatory presence of physical craft markers (visible human thumbprints in clay, needle-felt flyaway fuzz, visible fabric seam stitches, or paper edge tears). Banned airbrushed smooth plastic.
* **Anti-Liquefaction Armature Rigging:** Constrain character limbs to rigid internal ball-and-socket metal armatures to eliminate melting clay liquefaction and rubber-putty deformation glitches.

---

## 4. Physical Studio Physics & Frame Cadence
* **The 12fps Stepped Rule (Animating on Twos):** Movement must execute at 12 unique poses per second with subtle physical frame jitter. Strictly purge digital motion smoothing and 60fps interpolation.
* **Practical Studio Lighting:** Motivated tungsten studio spotlights with soft shadows, subtle organic lighting flicker between frames, and tangible contact shadows anchoring puppets to diorama sets.

---

## 5. Kinematic Grammar
* **Miniature Camera Moves:** Pure optical trajectories emulating tabletop camera rigs:
  * `Miniature Planar Tracking Glide`: Smooth horizontal glide parallel to the tabletop set.
  * `Tabletop Macro Creeping Push-In`: Slow forward advance toward puppet face.
  * `Locked-Off Diorama MCU`: Static macro framing highlighting handcrafted props.
* **Hardware Nouns Ban:** Strictly purge camera hardware nouns (`tripod`, `dolly track`, `crane`).

---

## 6. Tactile Stop-Motion Audio Foley Soundboard (Google Veo 3.1)
All Veo stop-motion prompts must pair miniature visuals with tactile, micro-mechanical Foley:
* **Clay & Plasticine Foley:** `Subtle tactile plasticine squish, soft clay crease squelch, tiny suction pop, miniature rubbery thud`.
* **Armature & Mechanical Foley:** `Tiny metallic ball-and-socket joint click, subtle wire ratchet creak, delicate mechanical puppet articulation click`.
* **Miniature Set Foley:** `Tiny cardboard box rustle, soft miniature wooden floorboard creak, twig snap, cotton wool whoosh, tea kettle whistle`.
* **Puppet Movement Foley:** `Soft muffled fabric rustle of tiny tweed vest, miniature footsteps padding on felt moss, soft curious gasp`.
* **Music Suppression Rule:** Always enforce `, no background music` or `, clean foley only` to allow micro-Foley to shine.

---

## 7. Mandatory Style Negative Prompt Clause
> `NEGATIVE PROMPT: smooth digital 3D CGI, fluid motion, 60fps, digital interpolation, glossy plastic render, photorealistic human skin, airbrushed textures, melting clay, full-scale human room, camera shake, tripod, camera rig.`
