# 01. API & Models Architecture

## 1. Model Ecosystem Overview

Google's AI video generation stack is bifurcated into two primary model families operating under a unified orchestration layer:

```
                      ┌──────────────────────────────────────────────┐
                      │                 Google Flow                  │
                      │  (Creative Studio / Filmmaking Orchestrator) │
                      └──────┬────────────────────┬───────────┬──────┘
                             │                    │           │
           ┌─────────────────▼─────────┐   ┌──────▼──────┐   ┌▼────────────────────┐
           │     Gemini Omni Flash     │   │  Imagen 4   │   │    Veo 3 / 3.1      │
           │  (Director / Screenplay / │   │ (Art Dept / │   │ (Cinematographer /  │
           │   Conversational Editor)  │   │ Ingredients)│   │  High-Fidelity Gen) │
           └───────────────────────────┘   └─────────────┘   └─────────────────────┘
```

### 1.1 Veo Model Lineage (High-Fidelity Cinematic Generation)
- **`veo-3.1-generate-001` (Full / Pro):**
  - **Purpose:** Production-grade cinematic video synthesis with native, sample-aligned audio.
  - **Strengths:** Complex physical simulation, 24fps filmic temporal consistency, precise optical lens modeling, photorealistic light transport, lip-synced dialogue.
  - **Trade-off:** Higher latency and credit compute cost. Used for final production shots.
- **`veo-3.1-fast-generate-001` (Fast / Lite):**
  - **Purpose:** Rapid prototyping, composition verification, and camera motion drafting.
  - **Strengths:** Fast generation turnaround, lower compute expenditure.
  - **Trade-off:** Reduced micro-texture detail, potential subtle temporal jitter on high-frequency movement.
- **Historical / Preview Endpoints:**
  - `veo-3.1-generate-preview`, `veo-3.1-fast-generate-preview`, `veo-3.1-lite-generate-preview`.
  - **Deprecation Warning:** API preview endpoints scheduled for decommission on October 22, 2026. Production systems must target standard GA endpoints or Gemini Omni Flash integration.

### 1.2 Gemini Omni / Omni Flash (Multimodal Video Intelligence)
- **Model Role:** Multimodal native audiovisual reasoning and conversational editing engine.
- **Input Modalities:** Text, still images, audio waveforms, video clips (Any-Input-to-Video).
- **Core Specializations:**
  - Conversational video editing via natural language (relighting, object swapping, environment changes).
  - Fast turnaround generation for workplace tools (Google Vids, Google Flow Agent).
  - Native talking-head AI avatar generation with aligned audio.

### 1.3 Imagen 3 / 4 (Asset & Ingredient Generation)
- **Model Role:** High-resolution still image synthesis.
- **Filmmaking Function:** Generates the static reference keys ("Ingredients")—character reference sheets, wardrobe bibles, key props, and environment lighting boards—prior to video generation.

---

## 2. Technical Specifications & Operating Parameters

| Parameter | Supported Values | Optimal Setting / Recommendation |
|---|---|---|
| **Duration** | 4, 6, 8 seconds | • 4s: High-complexity action, rapid dynamic moves.<br>• 6s: Balanced character interaction.<br>• 8s: Atmospheric, dialogue delivery, slow camera moves. |
| **Resolution** | 720p (1280x720), 1080p (1920x1080) | 720p for fast iteration; 1080p for final render. |
| **Aspect Ratio** | 16:9 (Horizontal), 9:16 (Vertical) | 16:9 for cinematic/desktop; 9:16 for social/mobile. |
| **Frame Rate** | 24 fps (fixed cinematic standard) | Enforces cinematic cadence; avoid requesting 60fps in prompt. |
| **Audio Synthesis** | Native dual-stream (Audio + Video) | Directed via prompt text (`Audio:` block) or config flag. |
| **Reference Assets** | 0 to 3 images ("Ingredients") | 1 character + 1 prop + 1 style/lighting reference. |
| **Keyframe Endpoints**| `first_frame`, `last_frame` | Enforces exact start and end compositions for interpolation. |

---

## 3. Video Generation Modes

### 3.1 Text-to-Video (T2V)
- **Definition:** Synthesizes complete video and audio from textual narrative instructions alone.
- **Primary Mechanism:** Latent space diffusion guided by text embeddings.
- **Usage:** Establishing shots, landscape reveals, initial scenes where no prior assets exist.

### 3.2 Image-to-Video (I2V / Ingredients-to-Video)
- **Definition:** Accepts a seed image (or up to 3 ingredient images) as the spatial/visual foundation.
- **Mechanism:** Locks the visual latent features of the character/environment and generates motion vectors derived from prompt instructions.
- **Usage:** Character continuity across multi-scene narratives, animating approved concept art.

### 3.3 Start & End Frame Interpolation (S/E Keyframing)
- **Definition:** The model is bounded by both an initial frame ($t=0$) and a terminal frame ($t=T$).
- **Mechanism:** Solves temporal kinematics and optical flow to bridge between two predefined compositions.
- **Usage:** Morphological transformations, match cuts, highly specific camera trajectories between two points.

### 3.4 Video Extension (Temporal Chaining)
- **Definition:** Extends an existing 4–8 second video clip forward in time.
- **Mechanism:** Extracts terminal frame ($t=T$) and motion momentum vectors to synthesize the subsequent temporal block ($t=T$ to $t=T+\Delta t$).
- **Usage:** Building continuous scenes exceeding 8 seconds.

---

## 4. API Invocation Patterns (Google GenAI SDK)

### 4.1 Client Initialization & Text-to-Video Pattern
```python
import time
from google import genai
from google.genai import types

client = genai.Client()

operation = client.models.generate_videos(
    model="veo-3.1-generate-001",
    prompt=(
        "Medium shot of a cyberpunk detective in a wet leather coat stepping into "
        "a neon-lit alley. Slow push in. Audio: distant sirens, rain on puddle."
    ),
    config=types.GenerateVideosConfig(
        aspect_ratio="16:9",
        duration_seconds=8,
        number_of_videos=1,
        resolution="1080p",
    ),
)

# Async Polling Pattern
while not operation.done:
    time.sleep(10)
    operation = client.operations.get(operation)

video = operation.response.generated_videos[0]
client.files.download(file=video.video, path="scene_01.mp4")
```

### 4.2 Image-to-Video (I2V) with Reference Asset
```python
# Upload reference image first
ref_image = client.files.upload(path="character_reference.png")

operation = client.models.generate_videos(
    model="veo-3.1-generate-001",
    prompt=(
        "The character turns his head toward the camera, speaking calmly: "
        "'The city never sleeps.' Audio: quiet room tone, low vocal delivery."
    ),
    image=ref_image,
    config=types.GenerateVideosConfig(
        aspect_ratio="16:9",
        duration_seconds=6,
        resolution="1080p",
    ),
)
```

### 4.3 Start & End Frame Interpolation Pattern
```python
start_img = client.files.upload(path="shot_start.png")
end_img = client.files.upload(path="shot_end.png")

operation = client.models.generate_videos(
    model="veo-3.1-generate-001",
    prompt="Camera tracks forward as the closed safe door slowly swings open revealing golden light.",
    image=start_img,
    last_frame=end_img,
    config=types.GenerateVideosConfig(
        aspect_ratio="16:9",
        duration_seconds=6,
        resolution="1080p",
    ),
)
```

---

## 5. Division of Labor: Veo vs. Gemini Omni vs. Google Flow

| Task / Responsibility | Primary Engine | Supporting Engine | Protocol / Hand-off |
|---|---|---|---|
| **Script Breakdown & Shot Listing** | Gemini Omni Flash | Human Director | Omni parses premise into structured JSON shot list. |
| **Character & Style Reference Sheets** | Imagen 4 | Gemini Omni | Imagen generates neutral 3-view reference assets. |
| **High-Fidelity Cinematic Clip Rendering** | Veo 3.1 | Google Flow | Veo renders 4–8s clips utilizing Imagen reference keys. |
| **Timeline Assembly & Shot Chaining** | Scene Builder (Flow) | Veo (Clip Extension) | Flow sequences clips; extracts last frames for chained shots. |
| **Conversational Tweaks & In-Painting** | Gemini Omni Flash | Veo 3.1 | Omni modifies rendered footage (lighting shifts, object removal). |
