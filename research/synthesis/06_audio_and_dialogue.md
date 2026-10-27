# 06. Audio, Speech & Dialogue Syntax Architecture

## 1. Dual-Stream Audiovisual Generation Engine

Google Veo 3 / 3.1 and Gemini Omni utilize a **simultaneous dual-stream architecture**. Video frames and audio waveforms are synthesized concurrently within an integrated multimodal latent space:

```
                           [ PROMPT TEXT INPUT ]
                                     │
                   ┌─────────────────┴─────────────────┐
                   │                                   │
                   ▼                                   ▼
        [ VIDEO LATENT STREAM ]             [ AUDIO LATENT STREAM ]
        • Spatial 3D geometry               • Acoustic frequency spectra
        • Temporal motion kinematics        • Spatial sound localization
        • Lip & facial musculature          • Room impulse response / reverb
                   │                                   │
                   └─────────────────┬─────────────────┘
                                     │
                                     ▼
                   [ SINGLE-PASS SYNCHRONIZED OUTPUT ]
                    (Zero secondary AV latency drift)
```

Because audio is generated natively alongside pixels, prompt engineers can direct sound design, environmental acoustics, and character lip-sync directly within natural language prompt text.

---

## 2. Speech & Dialogue Prompting Syntax

Veo 3.1 parses dialogue strings using deterministic semantic triggers. Deviating from these syntax rules causes silent failures (static lips, mumbled audio, or burned-in subtitles).

### 2.1 The Dialogue Syntax Formula

$$\mathbf{Attribution\ Verb} + \mathbf{Biomechanical\ Restraint} + \mathbf{Delivery\ Modifier} + \mathbf{:\ "Exact\ Spoken\ Words\ in\ Quotes"}$$

```text
The character speaks with relaxed jaw and subtle lip articulation, saying calmly and measuredly: "We have reached the end of the line."
```

### 2.2 Critical Dialogue Rules

| Rule | Requirement | Failure Mode if Violated |
|---|---|---|
| **Quotation Marks** | Spoken text must always be enclosed in double quotes (`""`). | Words are interpreted as ambient visual concepts rather than spoken speech; character remains silent. |
| **Speech Attribution Verbs** | Use direct communicative verbs (`says`, `asks`, `whispers`, `shouts`, `mutters`, `replies`). | Model fails to bind vocal track to facial armature. |
| **Preceding Colon (`:`)** | Place a colon directly before the opening quotation mark (`says: "..."`). | Prevents the model from generating hardcoded text subtitles or caption banners across the bottom of the video. |
| **Delivery Modifiers** | Place emotional and acoustic adverbs before the quote (`whispers, trembling with fear: "..."`). | Directs character micro-expressions, brow tension, mouth kinematics, and vocal breathiness. |
| **Speech Velocity Limits** | Strict word count ceilings: `4s = 3–5 words`, `6s = 7–9 words`, `8s = 11–13 words`, `10s = 15–18 words`. | Exceeding limits forces rapid speech, lip-sync desynchronization, or truncated mid-syllable clipping. |
| **Biomechanical Restraints** | Always mandate `relaxed jaw, subtle lip articulation, controlled mouth kinematics`. | Eliminates the "Muppet mouth" failure mode where diffusion models flap jaws open cartoonishly. |
| **Sentence Case Mandatory** | **NEVER USE ALL CAPS IN SPOKEN DIALOGUE.** | **Severe Glitch:** Veo spells capitalized words letter-by-letter. Writing `"STOP"` will cause the character to pronounce *"S-T-O-P"*. Use sentence case: `"Stop"`. |

---

## 3. Multi-Speaker Dialogue: The Shot / Reverse-Shot Protocol

### The Multi-Speaker Failure Mode
Attempting to generate a two-person back-and-forth conversation within a single 8-second clip (e.g., *"John asks 'Where are you going?' and Sarah replies 'Nowhere'"*) has a **failure rate exceeding 60%**:
- Voices overlap or cross-talk.
- Both characters' mouths move simultaneously.
- The model switches voices to the wrong character.

### The Professional Workaround: Shot / Reverse-Shot Coverage
To depict conversations with 100% fidelity, break dialogue scenes into classic cinematic shot coverage across individual clips:

```
[ CHARACTER A SPEAKS ]                       [ CHARACTER B REPLIES ]
     Clip 01 (6s)                                 Clip 02 (6s)
• Clean Single MCU of Character A            • Clean Single MCU of Character B
• Character A delivers Line 1 (7-9 words)    • Character B delivers Line 2 (7-9 words)
• Partner completely outside viewport        • Partner completely outside viewport
```

#### Clip 01: Character A Speaks
```text
Medium close-up clean single of Marcus sitting in a dark leather diner booth. Marcus leans forward slightly, speaking with relaxed jaw and subtle lip articulation, saying with quiet urgency: "They know we have the drive." Soft tungsten overhead pendant lighting, shallow depth of field with creamy bokeh. Locked-off static framing. Audio: SFX: faint coffee cup clinking; Ambience: low diner background chatter; Dialogue: Marcus says with quiet urgency: "They know we have the drive."; Music: None.
```

#### Clip 02: Character B Replies
```text
Medium close-up clean single of Sarah across the diner table. Sarah holds a ceramic coffee mug, her expression hardening, speaking with relaxed jaw and subtle lip movement as she replies firmly: "Then we leave tonight." Warm amber diner sidelight, shallow depth of field. Locked-off static framing. Audio: SFX: ceramic mug contact with saucer; Ambience: distant diner kitchen hum; Dialogue: Sarah replies firmly: "Then we leave tonight."; Music: None.
```

---

## 4. Directing the Soundscape (`Audio:` Block Architecture)

Always place soundscape directions at the conclusion of the prompt under a dedicated `Audio:` prefix.

### 4.1 Acoustic Layering Hierarchy
1. **Dialogue Layer:** Handled via quoted text in the main body.
2. **Foley Layer:** Physical, tangible contact sounds tied directly to on-screen actions:
   - *Examples:* `crisp footsteps crunching on gravel`, `leather coat rustle`, `heavy iron door latch clicking shut`.
3. **Environmental Ambience Layer:** The acoustic resonance of the physical space:
   - *Examples:* `subtle fluorescent fixture buzz`, `room tone with wet reverberation`, `distant rumbling thunderstorm`.
4. **Negative Audio Constraints:** Explicitly ban undesirable elements:
   - *Rule:* Video models tend to default to dramatic, sweeping symphonic scores unless told otherwise. Always specify: `zero background music` or `no music, diegetic sound only`.

### 4.2 Comprehensive Audio Prompt Example
```text
[Visual and Action Prompt Body] ... Audio: SFX: puddle splash under running boots, ragged breath exhalations; Ambience: heavy rain drumming rhythmically on corrugated metal roofing, distant low thunder rumble; Dialogue: None; Music: None.
```

---

## 5. Audio Troubleshooting Matrix

| Issue | Root Cause | Fix / Workaround |
|---|---|---|
| **Muted Video / No Sound** | Missing quotation marks, missing attribution verb, or missing `Audio:` block. | Add explicit `says: "..."` and append dedicated `Audio: [SFX description]`. |
| **Burned-in Subtitles** | Missing colon before quote or writing "subtitles: dialogue". | Use standard format: `says: "dialogue"` with preceding colon. |
| **Character Spells Words Out** | Words written in CAPS LOCK (e.g. `"HELP ME"`). | Convert to standard sentence case: `"Help me"`. |
| **Robotic Vocal Cadence** | Monotone phrasing without delivery modifiers. | Add emotional/tonal qualifiers: `says, breathless and trembling: "..."`. |
| **Audio-Safety API False Positive** | Sensitive trigger words like "police sirens", "screaming", "gunshot". | Rephrase with softer diegetic equivalents: `distant emergency vehicle lights`, `sharp metallic strike`, `raised authoritative voice`. |
| **Unwanted Orchestral Music** | Model defaults to cinematic score. | Append `no background music, clean diegetic audio only` in the `Audio:` block. |
