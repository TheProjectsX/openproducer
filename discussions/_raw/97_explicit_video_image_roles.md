# Discussion 97 — Explicit Image Roles in Every Video Prompt

**Date:** 2026-11-17  
**Status:** Creator requirement implemented in the live prompt contract.

## Creator observation

Still-image generation combines references acceptably, but video generation can confuse the intended starting image with identity, environment, and style references. The creator requires every video prompt to say explicitly which image starts the clip and what each other image supplies.

## Contract

- **Creator correction on 2026-11-17:** Image numbering is local to each `video_prompt.txt`, but no number has a fixed role. `[IMAGE 1]` may be a reference. Every supplied pointer gets a contextual job, such as protagonist anatomy, environment/style, prop, or start source. Do not copy slot roles from the clip's image-generation prompt.
- State the role mapping in `[INPUT SEEDS & INGREDIENTS]` and repeat it as direct instructions at the start of `[VIDEO PROMPT]`. A path in a header alone does not direct the video generator.
- Declare `Start Source: [IMAGE N]` only when a supplied image is intended as the start, or `Start Source: none` if all supplied images are references. In Flow Frames to Video, select the named start image in the dedicated Start Frame control. In Ingredients to Video, an opening composition requested in text still requires render review; text cannot guarantee an exact first frame. Include only references the chosen mode permits. A `.txt` path cues the already generated Flow image, not a text upload.
- Do not attach a redundant image merely to fill a reference slot.

Google's Flow help distinguishes Frames and Ingredients modes and instructs users to describe how ingredients should be used. The exact input choices remain model/mode dependent: https://support.google.com/flow/answer/16353334

## Files changed

- Live director's-cut and workspace specs, mirrored core specs, produce/guide skills and workflows, scaffold guidance.
- CLI linter `L-06` now warns when the video body does not direct the start image and all mapped reference images. `L-11` recognizes the new start phrasing. Audit fixture tests the new behavior.
- Existing historical simulation prompts were inspected as evidence of the gap; they were not used to certify model output.

## Verification and correction

The creator corrected the initial implementation: it wrongly fixed `[IMAGE 1]` as the start. The revised contract uses `Start Source: [IMAGE N]` or `none`, with every image pointer assigned by context. The CLI L-06/L-11 checks and audit fixtures cover an image-1 reference with image-2 start and a references-only video. No Flow render was performed.
