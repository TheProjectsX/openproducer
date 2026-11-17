# Discussion 99 — Image/Video Prompt Medium Separation

**Date:** 2026-11-17

## Creator finding

Some image prompts contain video-style movement directions, and some video prompts read like still-image generation requests. This can make the image depict the wrong moment or leave the video without a clear continuation.

## Live rule

An image creative body defines one frozen visible state: subject, pose, framing, setting, lighting, and details visible in that instant. A running pose, rain streaks, or motion blur may be visible in a still. It must not tell the model to pan, animate an event across seconds, show a `then` sequence, or generate sound.

A video creative body starts from its selected image or references and describes what changes during the clip: one cue-relevant action, environmental motion, and an optional motivated camera vector, plus applicable audio. A deliberately still video states the intended hold. It must not request a still image or turnaround sheet. Compare each pair so the video begins from the image's depicted state instead of contradicting or replaying it.

## Implementation

Revised the current director's-cut and scaffolding specifications and the produce skill/workflow. Added `check_prompt_medium.js` in the produce skill as an advisory production-file scan. It flags obvious camera movement, timed sequences, and audio in image bodies; still-output requests and possible missing temporal direction in video bodies. It does not infer scene intent or judge renders, so the agent reviews every finding and paired prompt. Added fixture tests for valid first-moment poses and both crossover directions.
