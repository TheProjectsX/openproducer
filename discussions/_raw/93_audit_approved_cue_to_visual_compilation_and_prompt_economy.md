# Discussion 93 — Approved audit fixes and cue-to-visual compilation

**Date:** 2026-11-15

## Creator decisions

- Keep 4s/6s/8s/10s as OpenProducer's clip generation choices. Edited on-screen lengths may vary to match actual audio events.
- Keep prompt-file paths in `Conditioned On:` and `Input Seed:` as cues to select images already produced in the same Flow project. Mandatory image export is not part of the workflow.
- OpenProducer creates prompts and guidance. The creator renders audio/images/videos and edits the final timeline manually.
- Archive `production/story/` write/rewrite; remove active creation, detection, and ingestion paths.
- Fix false `opp doctor` certification, prompt-section parsing, template validation/promotion, inconsistent rules, packaging review, and crowded prompts.
- Make script-to-clip visual relevance the priority: exact cue timing, required visible event, subject/room proportion, reveal order, variable edited length, and bidirectional coverage review.

## Implemented contract

The live director's-cut specification now requires a short cue-to-visual ledger before clip prompts. A row records actual audio interval and wording, visible event or intentional withhold, subject/location, framing scale, reveal boundary, Flow generation length, edited use and trim, and manual audio use. Image prompts depict the first visible moment; video prompts describe only the timed change. A fixed four-beat rhythm is optional. Approved Flow reference images carry stable details; shot prompts use only relevant constraints.

The CLI now distinguishes automated checks from creator reviews. Pending checks cannot certify a project. Template promotion targets a single group and ID; story templates cannot activate live video files. Historical Lighthouse v2 timing claims are flagged for review.

## Limits

No Google Flow render or final edit was performed in this implementation turn. Prompt and build tests verify file/CLI behavior; creator review remains necessary for rendered scene quality and sync.
