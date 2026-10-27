# Discussion 57: Empirical Video Glitches — Spatial Furniture Coupling, Void Pareidolia, and the Invisible Entity Trap

**Date:** 2026-10-27  
**Context:** Real-world simulation and test generation of *The Breath at 2:00 AM* in Google Flow (Veo 3.1 Image-to-Video). The user tested the generated prompts and reported distinct visual bugs across Clips 02, 04, 07, 09, 12, and 13.  
**Status:** Solved, Codified, and Calibrated across all manifests.

---

## 1. Empirical Failure Modes & Root Causes

### Glitch 1: Floorboard Drift (Clip 02)
* **Reported Failure:** *"The camera started focusing on the floor instead of ceil."*
* **Root Cause:** The camera kinematic directive wrote *"tracks smoothly past the linear floorboard vectors toward the base of the sofa"*. While intended as a low-angle tracking shot, diffusion attention latched onto the floorboards, tilting downward and destroying the suspense of the towering ceiling void overhead.
* **The Fix:** Explicit upward low-angle framing locking the stick figure in the lower third and keeping the oppressive, vast pitch-black ceiling void looming in the upper half throughout the push-in. Added negative prompt: `camera tilting down, looking at floor, floorboards close-up, downward angle`.

### Glitch 2: Multi-Subject Furniture Decoupling Trap (Clips 04 & 07)
* **Reported Failure:** *"The position of the human was wrong. He was sitting in another imaginary sofa, when the sofa where the cat is, is empty."* (Occurred in both Clip 04 and Clip 07).
* **Root Cause:** When multiple subjects (human + cat) are described interacting with furniture (human seated, cat perched on backrest) without an explicit single-instance constraint, diffusion models decouple them—rendering two separate sofas, one with the cat and a secondary imaginary couch with the human.
* **The Fix: The Single-Instance Furniture Law:**
  Both Tier 2 keyframe plates and Tier 3 video prompts must declare:
  `EXACTLY ONE SOFA IN THE ROOM. SINGLE SOFA ONLY. The black cat is perched directly on the backrest of the EXACT SAME sofa that the stick figure is sitting on, directly behind the stick figure's head. Zero extra sofas, zero secondary chairs.`
  Added negative prompt: `multiple sofas, two couches, separate sofa, empty sofa, secondary chair, sitting elsewhere`.

### Glitch 3: The "Unseen Entity" Transparent-Ceiling Hallucination (Clip 09)
* **Reported Failure:** *"the Scene just broke. the figure got a tensed face, which is ok i think, but the room brighted up like light is there and in the ciel there is like a cat or something walking above the ceil, like the ceil was transparent and a cat was walking above it."*
* **Root Cause:**
  1. The prompt wrote *"tracking unseen footsteps pacing across the ceiling directly overhead"*. Diffusion models cannot comprehend the negative modifier "unseen"—the model parsed "footsteps" + "cat" and literally rendered a cat pacing across a glass/transparent ceiling!
  2. To display the pacing creature on the ceiling, the model automatically illuminated the dark room and ceiling, destroying the pitch-black noir atmosphere.
  3. The stick figure sprouted facial features ("tensed face"), violating the featureless blank head rule.
* **The Fix:**
  1. Completely purge words like "footsteps", "pacing", "walking", or anything overhead from visual prompt tokens.
  2. The ceiling must be declared an opaque, solid, impenetrable pitch-black void (`#0A0B0E`) with zero light and zero transparency.
  3. Motion is confined 100% to the cat's head turning left to right on the sofa backrest tracking empty black air.
  4. Added negative prompt: `walking creature, animal on ceiling, cat on ceiling, transparent ceiling, glass ceiling, skylight, footsteps, bright room, illuminated ceiling, daylight, facial expressions, eyebrows, mouth, eyes on stick figure`.

### Glitch 4: Macro Shadow Pareidolia / "Shadow as Nose" (Clip 12)
* **Reported Failure:** *"Clip 12: The vid generator made the shadow a nose, which is weird."*
* **Root Cause:** In extreme close-up, the descending dark shadow boundary hovering 2 inches above the spherical white head was interpreted by latent attention as a human facial silhouette (specifically a nose profile pointing down at the head).
* **The Fix:**
  1. Flatten the shadow boundary into a uniform, flat, geometric horizontal block of pure solid black (`#0A0B0E`) rather than an organic, dipping silhouette.
  2. Add strict negative prompts: `nose, human nose, monster nose, face profile, silhouette of face, facial features, nostrils, lips, chin, pareidolia, face emerging from darkness`.

### Glitch 5: The "Invisible Monster Exhalation" Trap (Clip 13)
* **Reported Failure:** *"Clip 13: It's like a very very big monster whoes nose is the size of the man, is exhaling in his head, which is weird too."*
* **Root Cause:** The prompt included tokens like *"delicate vector ripple contours indicating an invisible breathing presence suspended in mid-air"* and *"deliberate, razor-sharp intake of breath displaces the cold air"*. Diffusion models saw "breathing presence" + "intake of breath" + macro head, and manifested a literal giant monster face and nose the size of a man exhaling onto the scalp!
* **The Fix: The Invisible Entity Prompting Law:**
  1. NEVER describe the entity, creature, or biological respiration in visual prompt text if it is meant to remain unseen.
  2. The visual prompt must describe ONLY the subject's physical reaction (e.g. a microscopic shudder or head dropping 2mm in dread) against an empty, featureless black void.
  3. The breath must live **100% exclusively in the `Audio:` channel** (`Audio: SFX: Quiet, deliberate, razor-sharp human inhalation drawn directly overhead at 04.5s;...`).
  4. Added negative prompt: `giant monster, monster, beast, creature, giant nose, monster nose, nostrils, face in shadow, exhaling face, realistic face, demon, alien, pareidolia, mouth, teeth in darkness, organic shapes`.

---

## 2. Updated Deliverables

All fixes were propagated and verified across:
- `clips/clip_02/image_prompt.txt` & `video_prompt.txt`
- `clips/clip_04/image_prompt.txt` & `video_prompt.txt`
- `clips/clip_07/image_prompt.txt` & `video_prompt.txt`
- `clips/clip_09/image_prompt.txt` & `video_prompt.txt`
- `clips/clip_12/image_prompt.txt` & `video_prompt.txt`
- `clips/clip_13/image_prompt.txt` & `video_prompt.txt`
- `master_images_prompt.txt`
- `master_videos_prompt.txt`
