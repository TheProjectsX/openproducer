# Discussion 94 — Scene image chain without video-frame extraction

**Date:** 2026-11-15

## Creator decision

The creator excludes a required workflow of downloading each video, extracting its terminal frame, and uploading that frame for the next clip. They approved chaining **clip images** within a continuous scene instead. Images already generated in the same Flow project are selected directly; prompt-file paths identify those images and are not upload files.

## Live design

The first clip image for a location/time scene is generated from the approved base style and relevant character/environment images. Each later clip image in that scene uses the preceding **approved clip image** as the local visual reference. Stable character and environment references remain available as identity and topology anchors where the selected image workflow permits them. The next prompt depicts the exact first visible moment of its own timed audio cue, changing the necessary pose, framing, expression, action, or viewpoint rather than copying the earlier composition.

A new location/time scene starts a new root image from its stable anchors. If an image drifts in face, wardrobe, room layout, scale, lighting, or reveal order, reject it and restart from the scene root or stable anchors; do not carry the error forward. The existing scratchbook cue ledger records `scene root` or `previous approved clip image` and any reset reason. This adds no new asset folder or export requirement.

Each video still uses its own approved clip image as its starting image. The preceding clip **image** is usually that clip's planned first moment, not the final frame of its rendered motion. The image chain improves design continuity but does not guarantee a seamless motion handoff; the creator checks and trims the actual rendered cut.

## Package boundary

This is a newly approved base-project workflow change. Update the authoritative production specs, active repository skills/workflows, scaffold source guidance, and consolidated discussion now. The `src/` package and bundled `src/templates/` mirrors remain frozen until the creator explicitly requests package promotion after the specification is finalized.

## Verification boundary

Check that each same-scene image prompt points to the preceding approved clip image, each scene reset names stable anchors, and each video prompt points to its own clip image. No Flow image or video was rendered in this discussion.

The authoritative `05` and `07` specs match their `agents/skills/openproducer-core/specs/` mirrors byte for byte, and `git diff --check` passed for the edited base-project files. The skill-creator quick validator could not run because the available Python environment lacks `yaml`; the edited skills retain their existing frontmatter. No `src/` build or package sync was performed.
