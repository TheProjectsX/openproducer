# 05. Multi-Clip Storyboarding & Narrative Chaining

## 1. Multi-Clip Narrative Architecture

Generative video models do not generate full multi-minute movies in a single pass. Professional AI filmmaking operates identically to traditional film production: stories are broken down into **individual cinematic shots (4, 6, or 8 seconds)**, generated independently, and assembled sequentially.

```
                           [ LOGLINE / PREMISE ]
                                     │
                                     ▼
                    [ 3-ACT NARRATIVE BEAT SHEET ]
                      ├── Act I: Hook / Establishing
                      ├── Act II: Conflict / Development
                      └── Act III: Climax / Resolution
                                     │
                                     ▼
                      [ STORYBOARD VISUAL PANELS ]
                     (Keyframes via Imagen 4 / Keys)
                                     │
                                     ▼
                     [ CINEMATIC SHOT LIST SPEC ]
                   (Technical parameters & optics)
                                     │
                                     ▼
                    [ COMPILED VEO 3.1 PROMPTS ]
                   (Front-loaded execution blocks)
                                     │
                                     ▼
                      [ GOOGLE FLOW SCENE BUILDER ]
                     (Timeline assembly & transitions)
```

---

## 2. Duration Allocation & Pacing Rules

| Desired Film Length | Recommended Shot Count | Clip Duration Strategy | Narrative Rhythm |
|---|---|---|---|
| **15 Seconds** (Teaser / Social) | 2 to 3 Shots | Shot 1 (6s) + Shot 2 (5s) + Shot 3 (4s) | Rapid hook $\rightarrow$ intense peak $\rightarrow$ title punch |
| **30 Seconds** (Commercial / Trailer) | 4 to 6 Shots | Mix of 4s, 6s, and 8s clips | Establishing (8s) $\rightarrow$ Action beats (4-6s) $\rightarrow$ Dialogue (6s) $\rightarrow$ Outro (6s) |
| **60 Seconds** (Short Film) | 8 to 12 Shots | Full dynamic range (4s to 8s) | Full cinematic dramatic arc with varied shot sizes and coverage |

### Temporal Allocation per Shot Type
- **8-Second Clips:** Establishing shots, slow atmospheric landscape reveals, complex dialogue delivery, slow dramatic push-ins.
- **6-Second Clips:** Standard character interaction, medium shots, two-shots, moderate camera tracking.
- **4-Second Clips:** High-speed kinetic action, impact moments, rapid sports moves, urgent crash-zooms.

---

## 3. The 4-Stage Pre-Production Pipeline

When an agent is tasked with creating a video project from user ideas, it must execute four discrete pre-production stages before invoking video rendering:

### Stage 1: Narrative Beat Sheet Breakdown
Convert the user's premise into distinct dramatic beats:
- *Beat 1 (The Hook):* Immediate visual intrigue, world grounding.
- *Beat 2 (The Inciting Incident):* A disruption or discovery.
- *Beat 3 (The Reaction / Escalation):* Character confronts the disruption.
- *Beat 4 (The Climax / Resolution):* Peak emotional or kinetic moment.

### Stage 2: Storyboard Panel Specification
Define the static visual composition for each beat:
- **Spatial Geometry:** Foreground elements (framing devices like doorways or foliage), midground (subject placement), background (depth elements).
- **Keyframe Generation:** Generate approved keyframes using Imagen 4 on 16:9 canvas to establish lighting and palette.

### Stage 3: Cinematic Shot List Specification
Assign explicit cinematography variables to every shot:
- Shot ID (`SH_01`, `SH_02`, etc.)
- Shot Type & Optical Framing
- Lens Choice (focal length)
- Camera Movement (single verb)
- Lighting Rig & Motivated Sources
- Subject Action (single physical biomechanical movement)
- Audio & Dialogue Specifications

### Stage 4: Compiled Veo Generation Prompts
Translate every shot from the technical specification into a production-ready, front-loaded Veo 3.1 prompt.

---

## 4. Shot Chaining & Transition Techniques

```
TRANSITION PARADIGMS
├── 1. HARD CUT (Standard Montage)
│   └── Change camera angle (e.g., Wide -> Medium Close-Up)
│       Requirement: Use Ingredients system to lock character identity.
├── 2. CONTINUOUS ACTION (Frame Extraction Chaining)
│   └── Action continues across cut without spatial interruption.
│       Protocol: Extract last frame of Shot A -> Pass as `first_frame` of Shot B.
├── 3. MATCH CUT (Visual / Geometry Rhyme)
│   └── End composition of Shot A shares exact shape/contour with start of Shot B.
│       Protocol: Use Start/End frame interpolation to morph geometry seamlessly.
└── 4. WHIP PAN / MOTION BLUR CUT
    └── Shot A ends with rapid camera pan; Shot B begins with matched directional pan.
```

### Protocol: Continuous Action Chaining (Last Frame $\rightarrow$ First Frame)
When a scene requires uninterrupted temporal action longer than 8 seconds (e.g., a character walking continuously through a corridor):
1. **Render Shot 1 (00:00 – 00:08):** Prompt: *"Arthur walks down the corridor away from the camera. Steadicam follow behind him..."*
2. **Terminal Frame Extraction:** Extract exact frame at $t=07.96$s.
3. **Render Shot 2 (00:08 – 00:16):** Set `image=terminal_frame_shot_1`. Prompt: *"Steadicam continues following Arthur as he reaches the heavy metal door at the corridor end and reaches his hand to the handle..."*
4. **Assembly:** Drop both clips into Google Flow Scene Builder timeline; snap with zero transition overlap for seamless playback.

---

## 5. Agent-Consumable Shot List Schema (JSON Architecture)

To maintain deterministic structure across automated agent workflows, shot lists should be formatted using the following standardized schema:

```json
{
  "project_title": "Project Title",
  "total_duration_seconds": 24,
  "aspect_ratio": "16:9",
  "resolution": "1080p",
  "master_character_bible": {
    "arthur": "Arthur, a 42-year-old weathered maritime captain with salt-and-pepper beard, wearing a navy-blue wool peacoat and cream cable-knit turtleneck."
  },
  "shots": [
    {
      "shot_id": "SH_01",
      "duration_seconds": 8,
      "framing": "Wide Establishing Shot",
      "lens": "24mm anamorphic",
      "camera_movement": "Slow lateral truck from right to left",
      "lighting": "Golden hour rim light, misty dawn atmosphere",
      "subject": "arthur",
      "action": "Arthur stands on the wet wooden pier, looking out over the misty ocean harbor.",
      "dialogue": null,
      "audio": {
        "ambience": "Ocean water lapping wooden pillars, distant mournful foghorn",
        "foley": "Creaking wet wood planks",
        "negative": "no background music"
      },
      "compiled_veo_prompt": "Wide establishing shot of Arthur, a 42-year-old weathered maritime captain with salt-and-pepper beard, wearing a navy-blue wool peacoat and cream cable-knit turtleneck, standing on a wet wooden pier looking out over the misty ocean harbor. Golden hour rim lighting, morning sea mist. Slow lateral truck from right to left. Audio: ocean water lapping wooden pillars, distant mournful foghorn, creaking wet wood, no background music. 16:9, 1080p, 24fps, 8s."
    }
  ]
}
```
