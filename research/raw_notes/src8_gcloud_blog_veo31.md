# Source 8: Google Cloud Blog — Ultimate Prompting Guide for Veo 3.1
# URL: https://cloud.google.com/blog/products/ai-machine-learning/ultimate-prompting-guide-for-veo-3-1
# Type: Official Google Cloud Blog (supplemented with web search data)

## SUMMARY
Google Cloud's official blog post covering the ultimate prompting guide for Veo 3.1. Reinforces the core prompt formula and provides practical best practices. HTML-heavy, key data extracted via web search.

## KEY DATA

### Core Prompt Formula (Confirmed)
```
[Cinematography & Camera Motion] + [Subject & Appearance] + [Action] + [Environment/Context] + [Lighting & Atmosphere] + [Audio Cues] + [Style]
```

### Prompt Philosophy
- Treat prompting as temporal narrative direction
- Veo 3.1 prioritizes: subjects, action verbs, camera language
- Generic buzzwords ("cinematic", "stunning") are DEPRIORITIZED
- Structured formatting is essential
- Ideal length: 100-200 words

### Camera Movement Best Practices
- PRECISE mechanical terms → stable professional output
- VAGUE terms → erratic physics

#### Dolly & Tracking (depth, following motion)
- Keywords: `Slow dolly-in`, `push-in camera`, `tracking shot right`, `steadicam following closely`
- Example: "Medium close-up, slow push-in camera tracking a weary detective walking down a neon-lit Tokyo alleyway"

#### Crane & Aerial (scale, grand reveals)
- Keywords: `Crane shot starting low and ascending`, `drone aerial view`, `jib arm up`
- Example: "Crane shot starting low on a lone hiker and ascending high above, revealing a colossal, mist-filled canyon"

#### Pans & Tilts (environmental context)
- Keywords: `Slow horizontal pan`, `gentle vertical tilt-up`
- Example: "Slow horizontal pan across a sun-drenched architectural workshop"

#### Static/Locked-off (internal action focus)
- Keywords: `Locked-off tripod shot`, `static frame`

### Lighting Best Practices
- Without explicit descriptors → flat, neutral ambient (DEFAULT behavior)
- ALWAYS specify lighting

#### Naturalistic
- Golden Hour: "Warm golden hour lighting, long dramatic shadows, soft sun flare hitting lens"
- Overcast: "Soft, overcast daylight, diffused shadows, even exposure"
- Rembrandt: "Rembrandt lighting with high contrast, deep shadows sculpting face"

#### Stylized/Genre
- Neon Noir: "Cyberpunk neon noir lighting, vibrant magenta and cyan glow reflecting off wet pavement, heavy atmospheric haze"
- Retro/Harsh: "Harsh fluorescent overhead office lighting, flickering neon green computer monitor glow"
- Cinematic Rim: "Strong rim lighting separating subject from dark background"

### Native Audio (Veo 3.1 Capability)
- Generates audio natively: dialogue, ambient noise, SFX
- DO NOT leave sound to chance
- Write EXPLICIT audio sentence at end of prompt
- Example: "The sound of heavy rain pattering on canvas tent, distant rolling thunder, low tense ambient drone"

### Reference Images
- Up to 3 reference images via Vertex AI / Google Flow
- Anchor character look and style across clips
- "Ingredients to video" approach

### Frame Control
- Define start and end frames
- Mandate precise transitional states

### Full Prompt Example (Official)
```
Crane shot starting low on a weathered sea captain and ascending high above, a seasoned man with a thick grey beard and blue knitted hat standing at a ship's railing, gesturing toward stormy ocean waves. Warm golden hour lighting with dramatic shadows breaking through heavy storm clouds. Audio features the loud crashing of ocean waves, howling gale-force wind, and the captain shouting, 'Hold fast the mainsail!' Cinematic 35mm film aesthetic, shallow depth of field, 1080p.
```
