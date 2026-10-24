# Style Plugin: Universal Vector Stick Figure
**ID:** `vector_stick_figure`  
**Target Medium:** Minimalist 2D Vector Animation & Narrative Storytelling  
**Parent Specification:** [`../specs/01_visual_spec.md`](../specs/01_visual_spec.md)  

---

## 1. Master Style Anchor String (Verbatim Token Block)
> `Minimalist 2D vector line-art animation. Limbs and torso are pure unbroken solid black vector strokes terminating in smooth rounded line-cap ends; strictly zero individual fingers, zero human hands, zero toes, zero knuckles, and zero fleshy details. The circular head is filled with solid opaque white (#FFFFFF) and contoured with a clean uniform black outline (#0F172A), completely devoid of facial features. Crisp graphic novel vector style, sharp outlines, uniform stroke weight throughout, flat 2D graphic art.`

---

## 2. Anatomical & Vector Materiality Rules
* **Limbs & Torso:** Pure, continuous uniform black vector strokes (`#0F172A`).
* **Hand / Feet Termination:** Strictly `stroke-linecap: round`. Limbs simply end in smooth rounded tips. Zero branching digits, zero knobby knuckles, zero realistic human skin clusters.
* **Head Standard:** Perfect geometric circle filled with solid opaque white (`#FFFFFF`) and contoured with a clean black vector outline matching limb stroke thickness. Zero eyes, nose, or mouth by default.
* **Props in Hand:** When holding an object (smartphone, mug), the rounded limb tip merely touches or rests against the prop. Zero fingers wrapping around objects.

---

## 3. Canvas & Environment Adaptability
* **Canvas Flexibility:**
  - *Narrative Horror / Suspense:* Warm cream paper canvas (`#F8F6F0`) revealed under motivated directional light cones falling off into pitch-black shadow (`#0A0B0E`).
  - *Explainer / Motivational:* Clean pure white (`#FFFFFF`) or off-white canvas with minimal architectural line grounding.
* **Architectural Lines:** Minimalist single-line floors, tabletops, and door frames matching the stroke weight of the characters.

---

## 4. Kinematic Grammar
* **Motion Style:** Clean 2D pose-to-pose keyframing, unhurried micro-gestures (e.g. single arm raise, slow head tilt, steady walk cycle).
* **Camera Kinematics:** Pure optical vectors (subtle linear push-in, static eye-level framing, horizontal tracking pan).

---

## 5. Mandatory Style Negative Prompt Clause
> `NEGATIVE PROMPT: photorealistic, 3D render, CGI, fleshy human hands, individual fingers, realistic toes, knuckles, skin pores, facial features, realistic eyes, airbrush, gradient shading, realistic anatomy, doll, action figure.`
