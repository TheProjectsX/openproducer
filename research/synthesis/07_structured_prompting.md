# 07. Structured Prompting & Meta-Frameworks

## 1. Why Structured Prompting Matters for AI Agents

When humans prompt video models, they often write ad-hoc paragraphs that produce non-deterministic results. For an autonomous AI agent (or Antigravity skill), prompts must be generated programmatically from structured schemas.

Structured prompting ensures:
1. **Zero Hallucination:** Eliminates conflicting cinematographic directions.
2. **Schema Validation:** Enables pre-flight linting before burning GPU credits.
3. **Reproducibility:** Guarantees character, lighting, and camera consistency across all shots in a multi-scene sequence.

---

## 2. The Veo-JSON Architecture

The **Veo-JSON Framework** provides a standardized schema for representing cinematic shots as structured JSON objects:

### 2.1 The Master Shot Schema
```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "VeoShotDefinition",
  "type": "object",
  "required": [
    "shot_id",
    "duration_seconds",
    "framing",
    "subject",
    "action",
    "environment",
    "camera_movement",
    "lighting",
    "optics",
    "audio"
  ],
  "properties": {
    "shot_id": { "type": "string", "pattern": "^SH_[0-9]{2}$" },
    "duration_seconds": { "type": "integer", "enum": [4, 6, 8] },
    "framing": { "type": "string" },
    "subject": {
      "type": "object",
      "required": ["anchor_name", "description"],
      "properties": {
        "anchor_name": { "type": "string" },
        "description": { "type": "string" }
      }
    },
    "action": {
      "type": "object",
      "required": ["primary_biomechanic"],
      "properties": {
        "primary_biomechanic": { "type": "string" },
        "dialogue": {
          "type": ["object", "null"],
          "properties": {
            "speaker": { "type": "string" },
            "attribution_verb": { "type": "string" },
            "delivery_modifier": { "type": "string" },
            "spoken_line": { "type": "string" }
          }
        }
      }
    },
    "environment": { "type": "string" },
    "camera_movement": { "type": "string" },
    "lighting": { "type": "string" },
    "optics": {
      "type": "object",
      "properties": {
        "lens": { "type": "string" },
        "film_stock": { "type": "string" }
      }
    },
    "audio": {
      "type": "object",
      "required": ["ambience", "foley", "music_suppression"],
      "properties": {
        "ambience": { "type": "string" },
        "foley": { "type": "string" },
        "music_suppression": { "type": "boolean", "default": true }
      }
    }
  }
}
```

---

## 3. The Compilation Algorithm (JSON $\rightarrow$ Front-Loaded Prompt)

An agent uses the following deterministic algorithmic pipeline to compile a `VeoShotDefinition` JSON object into a production-ready Veo 3.1 prompt string:

```
[ INPUT: VeoShotDefinition JSON ]
               │
               ▼
   [ 1. FRONT-LOAD FRAMING & SUBJECT ]
   "{framing} of {subject.description}"
               │
               ▼
   [ 2. APPEND BIOMECHANICAL ACTION ]
   ", {action.primary_biomechanic}"
               │
               ▼
   [ 3. APPEND ENVIRONMENT & LIGHTING ]
   ", set in {environment}. {lighting}."
               │
               ▼
   [ 4. APPEND OPTICS & CAMERA MOVE ]
   " {camera_movement}. {optics.lens}, {optics.film_stock}."
               │
               ▼
   [ 5. FORMAT DIALOGUE (IF APPLICABLE) ]
   " {speaker} {attribution_verb}, {delivery_modifier}: \"{spoken_line}\"."
               │
               ▼
   [ 6. COMPILE AUDIO BLOCK ]
   " Audio: {audio.ambience}, {audio.foley}" + (", no background music." if music_suppression else ".")
               │
               ▼
   [ 7. APPEND CONSTRAINTS ]
   " 16:9, 1080p, 24fps, {duration_seconds}s."
               │
               ▼
[ OUTPUT: Compliant Veo 3.1 Prompt String ]
```

### Python Implementation of Compiler
```python
def compile_veo_prompt(shot: dict) -> str:
    # 1. Framing and Subject
    parts = [f"{shot['framing']} of {shot['subject']['description']}"]
    
    # 2. Action
    parts.append(f", {shot['action']['primary_biomechanic']}")
    
    # 3. Environment & Lighting
    parts.append(f", set in {shot['environment']}. {shot['lighting']}.")
    
    # 4. Camera & Optics
    cam_str = f" {shot['camera_movement']}."
    if "optics" in shot:
        opt = shot["optics"]
        cam_str += f" {opt.get('lens', '')}, {opt.get('film_stock', '')}."
    parts.append(cam_str)
    
    # 5. Dialogue
    dlg = shot["action"].get("dialogue")
    if dlg and dlg.get("spoken_line"):
        spk = dlg.get("speaker", "The character")
        verb = dlg.get("attribution_verb", "says")
        mod = dlg.get("delivery_modifier", "measuredly")
        line = dlg.get("spoken_line", "")
        # Enforce sentence case on spoken dialogue
        line = line[0].upper() + line[1:] if line else ""
        parts.append(f" {spk} {verb}, {mod}: \"{line}\".")
        
    # 6. Audio
    aud = shot["audio"]
    music_clause = ", no background music." if aud.get("music_suppression", True) else "."
    parts.append(f" Audio: {aud.get('ambience', '')}, {aud.get('foley', '')}{music_clause}")
    
    # 7. Constraints
    parts.append(f" 16:9, 1080p, 24fps, {shot['duration_seconds']}s.")
    
    compiled = "".join(parts).strip()
    return " ".join(compiled.split())  # Normalize whitespace
```

---

## 4. Pre-Flight Quality Linter (Agent Verification Checklist)

Before submitting any compiled prompt to the API or rendering tool, the orchestrating agent must run this automated 6-point lint check:

| Check # | Lint Rule | Verification Test | Auto-Fix Protocol |
|---|---|---|---|
| **L-01** | **Front-Loading Verification** | Does the prompt open with shot type or subject within the first 15 words? | Prepend framing and subject; move setting/context downstream. |
| **L-02** | **Word Economy Boundary** | Is the total word count between 80 and 160 words? | If < 80, expand lighting/foley; if > 160, prune redundant adverbs. |
| **L-03** | **One Action Rule** | Are there compound conjunctions ("and then", "after that", "subsequently") in the action clause? | Split into multiple sequential shots. |
| **L-04** | **Single Camera Verb** | Are there multiple conflicting camera verbs (e.g. "dolly and zoom and pan")? | Restrict to the single dominant motivated camera movement. |
| **L-05** | **Dialogue Syntax & Casing** | Are there quotes? Is there a preceding colon? Are there ANY all-caps words in dialogue? | Enforce `says, [modifier]: "[Text]"`; convert ALL CAPS to sentence case. |
| **L-06** | **Audio Suppression** | Does the `Audio:` block explicitly specify `no background music`? | Append `, no background music.` to audio block. |
