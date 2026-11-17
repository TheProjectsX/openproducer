# Discussion 98 — Flow Negative Prompt Paste Boundary

**Date:** 2026-11-17

## Creator observation

The creator copied the entire video prompt file from the creative text through `[NEGATIVE PROMPT]` into Google Flow's single prompt box. In a stick-figure rain scene, the prompt repeatedly named facial parts in both the creative body and a long negative list. The generated video showed more facial detail than intended. This is an observed result, not proof that the negative list alone caused the result.

## Decision

Flow-bound prompt files end with the `[IMAGE PROMPT]` or `[VIDEO PROMPT]` creative body. They contain no standalone `[NEGATIVE PROMPT]` block. Copy only the creative body into Flow's text field; choose supplied images and technical settings in the appropriate Flow controls. If an older file contains a negative block, stop copying before that header and revise the creative body as needed. A separate API or another tool may support a genuine negative prompt parameter; its output contract may differ.

Describe the intended result first. A short, specific natural-language exclusion may follow when an absence is essential. For example, describe a featureless stick-figure head as a smooth solid white circle with no facial markings; describe a reference-only image with `use [IMAGE 2] for appearance only; do not cut to it`. Avoid enumerating facial anatomy and forbidden artifacts in the text being pasted. Check the resulting image or video; prompt wording alone cannot guarantee the absence of an artifact.

**Creator clarification:** The absence of a separate negative prompt field does not prohibit all negation. Google Cloud's Veo guide itself demonstrates an exclusion stated in natural scene language. The failure mode here is the standalone blacklist and excessive repetition, not every use of `no` or `do not`.

## Implementation

Updated live specs, produce/guide/sync/doctor guidance, scaffolding, packaged templates, and package workflow language. L-05 now detects a legacy `[NEGATIVE PROMPT]` block in Flow video files and otherwise leaves visual text review pending until the render is inspected. Historical style exclusion lists remain internal diagnostic notes.
