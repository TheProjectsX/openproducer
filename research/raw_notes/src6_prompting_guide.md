# Source 6: Veo-3-Prompting-Guide (snubroot GitHub)
# URL: https://raw.githubusercontent.com/snubroot/Veo-3-Prompting-Guide/refs/heads/main/README.md
# Type: Community Master Prompting Guide (Version 4.0)
# NOTE: This is the MOST comprehensive single source. Very detailed.

## SUMMARY
"The Ultimate Professional Resource for AI Video Generation" — exhaustive guide covering every aspect of Veo 3 prompting: audio, cinematography, character consistency, selfie videos, movement control, negative prompts, professional templates. Over 1100 lines of detailed techniques.

## KEY DATA

### Platform Access
| Platform | Access Level | Features |
|----------|-------------|---------|
| Vertex AI | Enterprise | Full API, batch processing |
| Google Vids | Consumer | Simplified interface, templates |
| Gemini App | General | Basic generation, mobile |

### Generation Modes
- Fast Generate: veo-3.0-fast-generate-preview — rapid prototyping
- Standard Generate: veo-3.0-generate-preview — max quality

### 8-Component Professional Prompt Formula
```
Subject + Context + Action + Style + Camera + Composition + Ambiance + Audio
```

| Component | Purpose | Example |
|-----------|---------|---------|
| Subject | Main focus & character details | "A confident 35-year-old CEO with short auburn hair" |
| Context | Scene setting & environment | "in a modern glass-walled boardroom at sunset" |
| Action | What's happening | "presents quarterly results with animated gestures" |
| Style | Visual aesthetic & genre | "cinematic corporate style with warm color grading" |
| Camera | Shot type & movement | "smooth dolly-in from medium to close-up" |
| Composition | Framing & structure | "rule of thirds, subject left-positioned, bokeh background" |
| Ambiance | Lighting, mood, atmosphere | "golden hour light through windows, professional warmth" |
| Audio | Sound design & dialogue | "she says: 'Our Q3 results exceeded all expectations'" |

### Quality Hierarchy
- MASTER = All 8 components + advanced techniques
- PROFESSIONAL = 6-8 components with detailed descriptions
- INTERMEDIATE = 4-6 components with basic details
- BASIC = 1-3 components (POOR results)

### Subject Mastery
- Include 15+ specific physical attributes
- Age, ethnicity, build, facial features
- Clothing, accessories, distinctive marks
- Personality indicators through posture/expression

### Audio & Dialogue Integration

#### Dialogue Syntax
- WORKS: `The detective looks at camera and says: "Something's not right here."`
- KEY: The colon (:) before dialogue prevents subtitle generation
- Without colon → triggers subtitles

#### Subtitle Prevention (3 Methods)
1. Colon Format: `Character says: "dialogue"` (colon prevents subtitles)
2. Explicit Negation: `"(no subtitles)" or "no subtitles, no text overlays"`
3. Multiple Negatives: `"No subtitles. No subtitles! No on-screen text whatsoever."`

#### Dialogue Length Rules
- PERFECT: 1-2 short sentences fitting 8-second clip
- TOO LONG: paragraphs requiring 15+ seconds → rushed speech
- TOO SHORT: single words like "Hello" → silence/gibberish
- NEVER use CAPS LOCK in dialogue — Veo spells out letter by letter

#### Multi-Character Dialogue
- Specify WHO speaks WHEN
- Use visual identifiers: "The woman in the red dress asks..." / "The man in the blue shirt replies..."

#### AI-Generated Dialogue
- Let Veo create natural dialogue with prompts like:
  - "A standup comic tells a joke"
  - "Two people discuss a movie they just watched"

#### Audio Hallucination Fixes
- PROBLEM: Unwanted "live studio audience" laughter
- SOLUTION: Always specify expected background audio
- BAD: "Character tells a joke" → may add laughter
- GOOD: "Character tells a joke. Audio: quiet office ambiance, no audience sounds"

#### Phonetic Pronunciation
- PROBLEM: AI mispronounces names/complex words
- SOLUTION: Use phonetic spelling (e.g., "foh-fur" instead of "Fofur")

### Audio Categories
- Environmental: "Distant traffic, footsteps, city ambiance"
- Natural: "Wind through trees, bird songs, rustling leaves"
- Professional: "Keyboard typing, air conditioning, phone conversations"
- Music: "Uplifting orchestral music building to crescendo"
- SFX: "Sizzling oil, knife chopping, water boiling"

### "This Then That" Technique
- Emotional: "starts confused → becomes confident → ends with satisfied smile"
- Action: "hesitates at door → takes deep breath → pushes open with resolve"
- Camera: "begins wide → transitions to medium at 3s → ends with close-up"

### Micro-Expression Control
- "Eyes narrow slightly, furrow between brows, pauses before speaking"
- "Steps forward, raises chin, eyes focused, inviting conflict"
- Eliminates "Model Face": "Eyes squint thoughtfully, head tilts, slight smile forms"

### Camera Movement Library (COMPREHENSIVE)

| Type | Keywords | When to Use |
|------|----------|-------------|
| Static | `static shot`, `fixed camera`, `locked-off` | Establishing, dialogue, detail |
| Pan | `pan left/right`, `slow pan`, `whip pan` | Revealing landscape, suspense |
| Tilt | `tilt up/down`, `vertical tilt` | Building height, drama |
| Tracking | `tracking shot`, `follow shot`, `lateral tracking` | Following characters, action |
| Dolly | `dolly in/out`, `slow dolly`, `push in`, `pull back` | Tension, emotional connection |
| Zoom | `zoom in/out`, `crash zoom`, `dramatic zoom` | Emphasis, intensity |
| Crane | `crane shot`, `jib shot`, `camera rises/descends` | Epic reveals, scale |
| Handheld | `handheld camera`, `shaky`, `documentary style` | Realism, tension |
| Specialty | `orbit shot`, `arc shot`, `360-degree`, `fly through` | Showcases, immersion |

### Camera Positioning (v4.0 still recommends — CONFLICTING with v3.0 deprecation)
- `"(thats where the camera is)"` — v4.0 says use it, v3.0 says deprecated
- RESOLUTION: Use standard cinematography terms as primary approach

### Shot Composition
- EWS: Extreme Wide Shot — isolation, scale
- WS: Wide Shot — full scene context
- MWS: Medium Wide Shot — character + environment
- MS: Medium Shot — waist up, authority
- MCU: Medium Close-Up — concentration, skill
- CU: Close-Up — emotion, breakthrough
- ECU: Extreme Close-Up — crucial moments

### Framing Techniques
- Rule of Thirds
- Leading Lines
- Depth of Field Control (shallow/deep)
- Rack Focus

### Lens Effects
- `shallow depth of field`, `deep focus`, `rack focus`, `soft focus`
- `macro lens`, `wide-angle lens`, `lens flare`
- Telephoto compression, fish-eye distortion

### Color Palette Control
- `monochromatic`, `vibrant colors`, `pastel tones`, `desaturated`
- `sepia tone`, `cool blue palette`, `warm orange tones`

### Lighting Setups
- Three-Point Lighting (key + fill + rim)
- Rembrandt Lighting (triangle of light on shadow side)
- Butterfly Lighting (key directly above and in front)
- Golden Hour, Blue Hour, Chiaroscuro, Neon
- Window Light, Candlelight, Firelight

### Selfie Video Formula (PROVEN)
```
"A selfie video of [CHARACTER]..."
+ "holds the camera at arm's length"
+ "His/her [body part] arm is clearly visible in the frame"
+ "occasionally looking into the camera before [ACTION]"
+ "The image is slightly grainy, looks very film-like"
```
Critical elements: Start with "A selfie video of...", make arm visible, natural eye movement, film-like quality, specific end gestures

### Movement Quality Keywords
- `natural movement`, `energetic movement`, `slow and deliberate movement`
- `graceful movement`, `confident movement`, `fluid movement`

### Negative Prompting
- Comprehensive: "no text overlays, no watermarks, no cartoon effects, no unrealistic proportions, no blurry faces, no distorted hands"
- Quality: "no low resolution artifacts, no compression noise, no camera shake, no poor audio quality"

### Professional Templates
1. Corporate Executive Template
2. Product Showcase Template
3. Educational Expert Template
4. Social Media Vertical Template (9:16)
5. POV Vlog Template
6. ASMR Video Template (Macro Focus)
7. Street Interview Template (Viral Optimized)
8. Corporate Presentation Template

### Character Consistency Framework
- Use SAME detailed description across all scenes
- Change only: action and dialogue between scenes
- Keep identical: character appearance, clothing, setting style, props, lighting approach
- Use signature accessories as anchors (watch, notebook, jacket)
- Behavioral consistency: habits, gestures, mannerisms

### Multi-Scene Rules (from Veo-JSON source 7)
- MANDATORY: maintain EXACT verbatim descriptions across all scenes
- Only action and dialogue change
- Use separate numbered blocks (Scene 1, Scene 2, etc.)
- NEVER combine in one block

### Physics Simulation
- Fluid dynamics: water flow, rain, surface tension
- Material physics: fabric, rigid body, particle systems
- Gravity and motion: falling, pendulum, momentum
- Use specific physics terminology for best results
