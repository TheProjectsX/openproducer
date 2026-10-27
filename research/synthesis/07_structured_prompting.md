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
    "duration_seconds": { "type": "integer", "enum": [4, 6, 8, 10] },
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
   " Audio: SFX: {audio.foley}; Ambience: {audio.ambience}; Dialogue: None; Music: None."
               │
               ▼
[ OUTPUT: Compliant Veo 3.1 Prompt String (Pure Creative Cinematography) ]
(Note: Resolution, Aspect Ratio, and Duration are passed to API GenerateVideosConfig, NEVER appended to prompt text)
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
    style_str = f" {shot['optics']['style_anchor']}" if "optics" in shot and "style_anchor" in shot["optics"] else ""
    cam_str = f"{style_str} {shot['camera_movement']}."
    if "optics" in shot and ("lens" in shot["optics"] or "film_stock" in shot["optics"]):
        opt = shot["optics"]
        cam_str += f" {opt.get('lens', '')}, {opt.get('film_stock', '')}."
    parts.append(cam_str)
    
    # 5. Dialogue (Biomechanical Lip Restraints L-15)
    dlg = shot["action"].get("dialogue")
    if dlg and dlg.get("spoken_line"):
        spk = dlg.get("speaker", "The character")
        verb = dlg.get("attribution_verb", "says")
        mod = dlg.get("delivery_modifier", "in a calm, measured undertone")
        line = dlg.get("spoken_line", "")
        # Enforce sentence case on spoken dialogue
        line = line[0].upper() + line[1:] if line else ""
        parts.append(f" With a relaxed jaw, minimal jaw displacement, and subtle lip articulation, {spk} {verb}, {mod}: \"{line}\"")
        
    # 6. Audio (Canonical 4-Field Semicolon Syntax L-17)
    aud = shot["audio"]
    music_str = "None" if aud.get("music_suppression", True) else aud.get("music", "None")
    dlg_str = f'{dlg.get("speaker", "Character")} {dlg.get("attribution_verb", "says")}, {dlg.get("delivery_modifier", "measuredly")}: "{dlg.get("spoken_line")}"' if (dlg and dlg.get("spoken_line")) else "None"
    parts.append(f" Audio: SFX: {aud.get('foley', 'None')}; Ambience: {aud.get('ambience', 'None')}; Dialogue: {dlg_str}; Music: {music_str}.")
    
    # NOTE: Technical constraints (aspect_ratio, resolution, duration_seconds) are passed
    # strictly in GenerateVideosConfig, NOT appended to prompt text (Decoupling Principle).
    compiled = "".join(parts).strip()
    return " ".join(compiled.split())  # Normalize whitespace
```

---

## 4. Pre-Flight Quality Linter (Master Registry L-01 to L-18)

Before submitting any compiled prompt to the API or rendering tool, the orchestrating agent validates prompts against the Master Unified Linter Registry (`L-01` to `L-18`) detailed in [`production_framework/specs/05_directors_cut_assembly_spec.md`](../../production_framework/specs/05_directors_cut_assembly_spec.md#8-master-pre-flight-linters-authoritative-registry-l-01-to-l-18). Key single-shot baseline checks include:

| Check # | Lint Rule | Verification Test | Auto-Fix Protocol |
|---|---|---|---|
| **L-01** | **Word Economy** | Is the standalone T2V body strictly 100–150 words (or Tier 3 I2V body strictly 75–150 words)? | If below floor, expand 3-plane lighting/foley; if > 150, prune redundant adverbs. |
| **L-02** | **Attention Front-Loading** | Do viewport framing and primary subject anchor appear within Tokens 1–30? | Prepend framing and subject; move setting/context downstream. |
| **L-03** | **Equipment Noun Ban** | Are there zero physical camera hardware nouns (`tripod`, `dolly`, `crane`, `rig`, `gimbal`) in the positive prompt? | Replace hardware nouns with pure optical/kinematic trajectory verbs. |
| **L-04** | **Config Decoupling** | Are there zero technical config specs (`16:9`, `9:16`, `1080p`, `4K`, `24fps`) in positive prompt text? | Strip config specs to the configuration header (`on twos`, `12fps` cadence whitelisted). |
| **L-10** | **Single-Motion & Clock Ban** | Is the clip restricted to 1 primary biomechanical action, 1 camera vector, and zero `[00:00]` clock brackets? | Slice compound actions into sequential clips; replace clock brackets with causal flow. |
| **L-15** | **Anti-Muppet Dialogue Restraint** | Does spoken dialogue use a preceding colon (`says, [modifier]: "..."`), sentence case, and $\ge 2$ jaw restraint tokens? | Inject `relaxed jaw, minimal jaw displacement, subtle lip articulation`; convert ALL CAPS to sentence case. |
| **L-17** | **Structured 4-Field Audio** | Does the trailing audio block follow `Audio: SFX: ...; Ambience: ...; Dialogue: ...; Music: ...`? | Reformat into semicolon-delimited 4-field syntax with `Music: None` over dialogue. |
