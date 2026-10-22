# Source 5: Veo-3-Meta-Framework (snubroot GitHub)
# URL: https://raw.githubusercontent.com/snubroot/Veo-3-Meta-Framework/refs/heads/main/README.md
# Type: Community Meta-Framework
# Version: 3.0 — Updated for Veo 3.1 / Flow (January 2026)

## SUMMARY
Professional guide to creating Meta Prompts for Veo 3.1 / Flow. A meta prompt is an AI system that GENERATES professional Veo prompts automatically. Includes the full cognitive architecture, technical specs, character framework, and advanced techniques like timestamp prompting, reference images, clip extension.

## KEY DATA

### What Are Meta Prompts
- AI systems that generate professional Veo 3.1 video prompts automatically
- User Input → Meta Prompt Analysis → Character Development → Scene Architecture → Technical Specification → Professional Prompt → Video
- Automates the prompt crafting process using proven methodologies

### Veo 3.1 Technical Specifications (Verified January 2026)
| Parameter | Options | Notes |
|-----------|---------|-------|
| Duration | 4, 6, or 8 seconds | 4-6s for complex action; 8s for atmospheric |
| Resolution | 720p or 1080p | 720p for iterations; 1080p for final |
| Aspect Ratio | 16:9 or 9:16 | 16:9 desktop/YouTube; 9:16 Shorts/Reels |
| Frame Rate | 24fps | Standard cinematic |
| Audio | Native generation | Dialogue, SFX, ambient with video |
| Reference Images | Up to 3 | For character/object/style consistency |

### Advanced Creative Controls
- Image-to-Video: Animate source image with prompt adherence and audio
- Ingredients to Video: Reference images for consistent aesthetics across shots
- First and Last Frame: Generate transitions between start/end images
- Add/Remove Object: Introduce or remove objects (uses Veo 2, no audio)
- Clip Extension: Extend previously generated clips for longer sequences
- Digital Watermarking: All videos marked with SynthID

### Known Limitations (CRITICAL)
- Complex multi-action scenes may fragment → use ONE major action per shot
- Character identity can drift across shots without consistent reference images
- Exact lip-sync NOT guaranteed → plan for VO alignment in post
- Native audio may need replacement for brand work or precise dialogue
- Hand and finger details may require attention in complex scenes

### The 5-Part Prompt Formula (Google Official)
```
[Cinematography] + [Subject] + [Action] + [Context] + [Style & Ambiance]
```

### Character Development Framework
Template for consistency:
```
[NAME/ROLE], a [AGE] [ETHNICITY] [GENDER] with [HAIR_DETAILS], [EYE_COLOR] eyes, [FACIAL_FEATURES], [BUILD], wearing [CLOTHING], with [POSTURE/MANNERISMS], [EMOTIONAL_STATE]
```
Essential elements: Age, gender, hair (color/style/length/texture), eyes, facial features, build, clothing (style/color/fit/material), posture and mannerisms

### v3.0 Changes (Migration Notes)
- DEPRECATED: "(thats where the camera is)" camera positioning syntax → use standard cinematography terms
- 8-second max duration remains, 4s and 6s now available
- Dialogue: quotation marks with "says:" format (e.g., `The character says: "dialogue"`)
- Negative prompts: describe what you don't want (avoid "no" or "don't" language)
- Timestamp Prompting: multi-shot sequencing within single generations
- Reference Image System: up to 3 reference images
- First/Last Frame Control: new transition capabilities
- Clip Extension: build longer sequences

### IMPORTANT NOTE ON DEPRECATION
The Meta Framework v3.0 says "(thats where the camera is)" is DEPRECATED.
BUT the Prompting Guide v4.0 (source 6) still recommends it.
CONFLICT: v3.0 is newer (Jan 2026) and explicitly says BREAKING change.
RESOLUTION: Follow v3.0 — use standard cinematography terms instead.
