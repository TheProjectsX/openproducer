# Source 3: Google Cloud — Video Generation Prompt Guide
# URL: https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/video-gen-prompt-guide
# Type: Official Google Cloud Documentation (Gemini Enterprise Agent Platform)

## SUMMARY
Official Google Cloud enterprise prompt guide for video generation. Covers prompt techniques for improving video generation results on the Gemini Enterprise Agent Platform.

## KEY DATA (from web search supplementation)

### Core Prompt Formula
[Cinematography & Camera Motion] + [Subject & Appearance] + [Action] + [Environment/Context] + [Lighting & Atmosphere] + [Audio Cues] + [Style]

### Prompt Approach
- Veo 3.1 reads prompts as sequence of weighted signals
- PRIORITIZES: subjects, action verbs, camera language
- DEPRIORITIZES: generic buzzwords ("cinematic", "stunning")
- Ideal prompt length: 100-200 words
- Think in temporal narrative direction, not static image descriptions

### Camera Movement Guidance
- Use precise mechanical film terms, not vague descriptions
- Vague terms = erratic physics; precise terms = stable professional output
- Dolly/Tracking: "Slow dolly-in", "push-in camera", "tracking shot right", "steadicam following closely"
- Crane/Aerial: "Crane shot starting low and ascending", "drone aerial view", "jib arm up"
- Pan/Tilt: "Slow horizontal pan", "gentle vertical tilt-up"
- Static: "Locked-off tripod shot", "static frame"

### Lighting Guidance
- Without explicit lighting descriptors → flat, neutral ambient lighting (DEFAULT)
- MUST specify lighting for quality results
- Golden Hour: "Warm golden hour lighting, long dramatic shadows, soft sun flare"
- Overcast: "Soft, overcast daylight, diffused shadows, even exposure"
- Rembrandt: "Rembrandt lighting with high contrast, deep shadows sculpting face"
- Neon Noir: "Cyberpunk neon noir lighting, vibrant magenta and cyan glow"
- Cinematic Rim: "Strong rim lighting separating subject from dark background"

### Audio Integration
- MUST write explicit audio sentence at end of prompt
- Don't leave sound to chance
- Example: "The sound of heavy rain pattering on canvas tent, accompanied by distant rolling thunder and a low tense ambient drone"

### Reference Images
- Up to 3 reference images via Vertex AI / Google Flow
- Anchor character look and style across clips
- For multi-clip consistency

### Frame Control
- Define start and end frames for precise transitional states
