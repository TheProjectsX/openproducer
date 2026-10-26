# Asset Origin & Lineage Manifest: Software Framework Intro
**Project Archetype:** Software Product / Technical Director Video  
**Pipeline:** Hybrid Multi-Engine / Flow Native Fast Mode  
**Total Runtime:** 44.0s (8 Clips)

---

## Asset Origin Matrix

| Element | Asset / Clip ID | Origin Engine | Asset Source / Upstream Dependency | Output Format |
|---|---|---|---|---|
| **Identity / Face** | Presenter Biometrics | User Reference | Creator Photo (`[IMAGE 1]`) | Locked 1:1 Invariant Facial Structure |
| **Master Reference** | `base_image_prompt.txt` | Imagen 4 / Flow | `[IMAGE 1]` + Studio Environment Staging | 1080p 16:9 Keyframe (Ingredient #1) |
| **Spoken Audio** | Voice Track (86 words) | Gemini TTS / ElevenLabs | `narrator_script.md` | 24-bit 48kHz WAV Master |
| **Clip 01 Keyframe** | `clips/clip_01/image_prompt.txt` | Imagen 4 | `base_image_prompt.txt` | 1080p PNG |
| **Clip 01 Video** | `clips/clip_01/video_prompt.txt` | Veo 3.1 | `clip_01/image_prompt.txt` + Spoken Dialogue | 6s 1080p 24fps MP4 |
| **Clip 02 Keyframe** | `clips/clip_02/image_prompt.txt` | Imagen 4 | Macro Timeline Screen Concept | 1080p PNG |
| **Clip 02 Video** | `clips/clip_02/video_prompt.txt` | Veo 3.1 | `clip_02/image_prompt.txt` + Presenter VO | 4s 1080p 24fps MP4 |
| **Clip 03 Keyframe** | `clips/clip_03/image_prompt.txt` | Imagen 4 | `base_image_prompt.txt` + Lean Forward Pose | 1080p PNG |
| **Clip 03 Video** | `clips/clip_03/video_prompt.txt` | Veo 3.1 | `clip_03/image_prompt.txt` + Spoken Dialogue | 6s 1080p 24fps MP4 |
| **Clip 04 Keyframe** | `clips/clip_04/image_prompt.txt` | Imagen 4 | Macro IDE Terminal Concept | 1080p PNG |
| **Clip 04 Video** | `clips/clip_04/video_prompt.txt` | Veo 3.1 | `clip_04/image_prompt.txt` + Presenter VO | 4s 1080p 24fps MP4 |
| **Clip 05 Keyframe** | `clips/clip_05/image_prompt.txt` | Imagen 4 | `base_image_prompt.txt` + 3/4 Gesture | 1080p PNG |
| **Clip 05 Video** | `clips/clip_05/video_prompt.txt` | Veo 3.1 | `clip_05/image_prompt.txt` + Spoken Dialogue | 6s 1080p 24fps MP4 |
| **Clip 06 Keyframe** | `clips/clip_06/image_prompt.txt` | Imagen 4 | Macro Video Editor Assembly Concept | 1080p PNG |
| **Clip 06 Video** | `clips/clip_06/video_prompt.txt` | Veo 3.1 | `clip_06/image_prompt.txt` + Presenter VO | 6s 1080p 24fps MP4 |
| **Clip 07 Keyframe** | `clips/clip_07/image_prompt.txt` | Imagen 4 | `base_image_prompt.txt` + Tight MCU | 1080p PNG |
| **Clip 07 Video** | `clips/clip_07/video_prompt.txt` | Veo 3.1 | `clip_07/image_prompt.txt` + Spoken Dialogue | 6s 1080p 24fps MP4 |
| **Clip 08 Keyframe** | `clips/clip_08/image_prompt.txt` | Imagen 4 | `base_image_prompt.txt` + Final Outro Pose | 1080p PNG |
| **Clip 08 Video** | `clips/clip_08/video_prompt.txt` | Veo 3.1 | `clip_08/image_prompt.txt` + Spoken Dialogue | 6s 1080p 24fps MP4 |

---

## Timeline Assembly Order
```text
[Clip 01: 6.0s] ──(Straight Cut)──> [Clip 02: 4.0s] ──(Straight Cut)──> [Clip 03: 6.0s] ──(Straight Cut)──> [Clip 04: 4.0s]
       │
       └──(Straight Cut)──> [Clip 05: 6.0s] ──(Straight Cut)──> [Clip 06: 6.0s] ──(Straight Cut)──> [Clip 07: 6.0s] ──(0.5s Dissolve)──> [Clip 08: 6.0s]
```
- **Total Assembly Runtime:** 44.0 Seconds
- **Native Flow Alignment:** 100% compliant with 4s and 6s generation buckets.
