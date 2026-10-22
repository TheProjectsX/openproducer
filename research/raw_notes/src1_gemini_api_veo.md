# Source 1: Gemini API Veo Docs
# URL: https://ai.google.dev/gemini-api/docs/veo
# Type: Official API Documentation

## SUMMARY
Official Google documentation for generating videos with Veo 3.1 via the Gemini API. Covers API structure, parameters, code examples for text-to-video and image-to-video.

## KEY DATA

### Models Available
- `veo-3.1-generate-001` — Full quality, standard generation
- `veo-3.1-fast-generate-001` — Faster, lower quality for iteration
- Earlier models: veo-3.0-generate-preview, veo-3.0-fast-generate-preview (check deprecation)

### API Structure
- SDK: `google-genai` Python SDK
- Method: `client.models.generate_videos()`
- Config object: `types.GenerateVideosConfig`
- Async operation — poll with `client.operations.get(operation)`

### Parameters (GenerateVideosConfig)
- `model`: string — model identifier
- `prompt`: string — text description of desired video
- `aspect_ratio`: "16:9" | "9:16"
- `resolution`: "720p" | "1080p" | "4k" (model-dependent)
- `duration_seconds`: 4 | 6 | 8
- `negative_prompt`: string — what NOT to include
- `person_generation`: "allow_all" (T2V) | "allow_adult" (I2V)
- `enhance_prompt`: boolean — auto-optimize prompt
- `output_gcs_uri`: string — GCS bucket path for output

### Text-to-Video (T2V) Code Pattern
```python
from google import genai
from google.genai import types

client = genai.Client()
operation = client.models.generate_videos(
    model="veo-3.1-generate-001",
    prompt="...",
    config=types.GenerateVideosConfig(
        aspect_ratio="16:9",
        resolution="1080p",
        duration_seconds=8,
        negative_prompt="blurry, low quality",
        person_generation="allow_all"
    ),
)
# poll until done
while not operation.done:
    time.sleep(15)
    operation = client.operations.get(operation)
video = operation.response.generated_videos[0]
client.files.download(file=video.video)
video.video.save("output.mp4")
```

### Image-to-Video (I2V) Code Pattern
```python
input_image = types.Image.from_file(location="first_frame.png")
operation = client.models.generate_videos(
    model="veo-3.1-generate-001",
    source=types.GenerateVideosSource(
        prompt="Camera slowly pushes forward...",
        image=input_image,
    ),
    config=types.GenerateVideosConfig(
        aspect_ratio="16:9",
        resolution="1080p",
        duration_seconds=8,
        person_generation="allow_adult"
    ),
)
```

### Key Notes
- Videos include SynthID digital watermark
- Native audio generation (dialogue, SFX, ambient)
- 24fps cinematic output
- Reference images: up to 3 for consistency
