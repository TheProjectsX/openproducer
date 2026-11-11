# Specification 08: Story Engine (Write/Rewrite), Narrative Templates & Universal Story Schemas

## 1. Core Architectural Philosophy: The Writer's Room as Pre-Production

In OpenProducer v2, **Story Writing and Script Doctoring constitute Phase 0 (Pre-Production)**. 

Every video generation pipeline suffers from the same failure mode: **"Garbage Story In → High-Definition Garbage Out."** Video generators (Veo 3.1, Imagen 4) can produce stunning visuals, but if the underlying script lacks tension, pacing, or emotional cadence, the resulting video fails.

The Story Engine operates on three immutable principles:
1. **Plug-and-Play Simplicity:** Creators supply a rough premise or text dump, or load a Story Template. The engine instantly structures, writes, or rewrites the narrative without requiring complex theoretical inputs.
2. **Strict Dual-Deliverable Model:**
   - **`production/story/script.txt` (Machine Source of Truth):** Contains format headers, speaker turn markers, and Google AI Studio TTS vocal expression tags.
   - **`production/story/clean.txt` (Human Reading Export):** A pristine, book-style reading version completely stripped of tags, headers, and brackets. The agent writes this file but never reads from it (preventing metadata loss) unless explicitly requested.
3. **Decoupled Story & Video Templates:** Story/narrative formulas and Video/cinematography presets live in distinct sub-vaults (`templates/story/` vs `templates/video/`), preventing namespace collisions, file bloat, and rigid coupling.

---

## 2. Directory Layout & File Contracts (`production/story/`)

All story generation assets reside in `production/story/`:

```
production/
└── story/                                <── PRE-PRODUCTION SUITE
    ├── beats.md                          (🗺️ Narrative Architecture: hooks, arcs, pacing)
    ├── script.txt                        (📜 Machine Source of Truth: TTS tags & turn tags)
    ├── clean.txt                         (📖 Human-Only Clean Export: stripped of all machine syntax)
    └── raw_source.txt                    (📥 Verbatim source text dump, only created on opp-rewrite)
```

### 2.1 File Contract Specifications:

| File | Primary Consumer | Agent Permission | Purpose |
|---|---|---|---|
| `beats.md` | Human & Agent | Read / Write | Structural outline: Hook, Inciting Incident, Escalations, Climax, Outro, and target duration breakdown. |
| `script.txt` | AI Pipeline & TTS | Read / Write | Complete performance script with `[STORY FORMAT]` header, alternating speaker tags, and official expression tags. Single Source of Truth for `opp-propose` and `opp-produce`. |
| `clean.txt` | Human Producer | **Write-Only** (Agent) | Pure prose/dialogue export formatted like a novel or clean play script. Agent ignores this file unless explicitly told: *"I updated clean.txt, use that"*. |
| `raw_source.txt` | Human Audit Trail | Write-Once (Agent) | Preserves original unedited article, notes, or brain-dump when `/opp-rewrite` is executed. |

---

## 3. The 4 Canonical Story Archetype Schemas

To prevent file sprawl, file names remain invariant across all projects. The storytelling format is declared explicitly in the top header of `production/story/script.txt`.

### 3.1 Archetype 1: Pure Narration (`pure_narration`)
*Used for video essays, documentaries, true crime / creepy pasta narratives, product brand films, and TikTok voiceovers.*

#### `production/story/script.txt`:
```text
[STORY FORMAT]
Type: pure_narration
Narrator: Charon (Deep, atmospheric, solemn)
Target Pacing: 125 WPM

[SCRIPT]
The light had been burning for eighty-seven nights without interruption.

<breath>
In the Atlantic swell, nothing changes except the cold.

When the relief tender finally broke the fog, the landing rope was already swinging loose against the rocks. The keeper’s log lay open to a blank page.
```

#### `production/story/clean.txt`:
```text
[CLEAN STORY EXPORT — For human reading only. OpenProducer uses production/story/script.txt]

The light had been burning for eighty-seven nights without interruption.

In the Atlantic swell, nothing changes except the cold.

When the relief tender finally broke the fog, the landing rope was already swinging loose against the rocks. The keeper’s log lay open to a blank page.
```

---

### 3.2 Archetype 2: Dialogue-Heavy Screenplay (`dialogue_heavy`)
*Used for comedy sketches, dramatic short films, anime banter, and multi-character scenes. Maps directly to Google AI Studio's Alternating-Turn standard.*

#### `production/story/script.txt`:
```text
[STORY FORMAT]
Type: dialogue_heavy
Cast:
- Speaker 1: Officer Miller (Voice: Puck, breathless, terrified)
- Speaker 2: Dispatcher Davis (Voice: Fenrir, cold, monotone)

[SCRIPT]
[Miller] (Speaker 1)
<whispers>
Dispatch, repeat last transmission. Did you say... my car?

<short pause>

[Davis] (Speaker 2)
Unit Four, step out of the vehicle and raise your hands immediately.

[Miller] (Speaker 1)
<gasp>
I am in the vehicle! Who is standing outside?!
```

#### `production/story/clean.txt`:
```text
[CLEAN STORY EXPORT — For human reading only. OpenProducer uses production/story/script.txt]

Miller: Dispatch, repeat last transmission. Did you say... my car?

Davis: Unit Four, step out of the vehicle and raise your hands immediately.

Miller: I am in the vehicle! Who is standing outside?!
```

---

### 3.3 Archetype 3: Hybrid Narrative (`hybrid`)
*Used for storybook animations, audio dramas, and cinematic shorts where an omniscient or first-person narrator sets the scene while characters speak out loud.*

#### `production/story/script.txt`:
```text
[STORY FORMAT]
Type: hybrid
Cast:
- Speaker 1: Narrator (Voice: Charon, solemn storytelling)
- Speaker 2: Maya (Voice: Kore, stressed field medic)

[SCRIPT]
[Narrator] (Speaker 1)
The emergency generator sputtered and died, plunging the triage bay into total darkness. Maya reached for the breaker switch.

[Maya] (Speaker 2)
<sighs>
If the water reached the lower deck, we're completely trapped.

[Narrator] (Speaker 1)
Behind her, three sharp knocks echoed against the bulkhead door.
```

#### `production/story/clean.txt`:
```text
[CLEAN STORY EXPORT — For human reading only. OpenProducer uses production/story/script.txt]

The emergency generator sputtered and died, plunging the triage bay into total darkness. Maya reached for the breaker switch.

Maya: If the water reached the lower deck, we're completely trapped.

Behind her, three sharp knocks echoed against the bulkhead door.
```

---

### 3.4 Archetype 4: Silent / Pure Visual (`silent_visual`)
*Used for product commercials, fashion visualizers, ASMR montages, and atmospheric teasers with zero spoken words (sound design & Foley only).*

#### `production/story/script.txt`:
```text
[STORY FORMAT]
Type: silent_visual
Audio Pathway: Foley & Ambient Soundscape (No Spoken Dialogue)

[SCRIPT]
[Beat 01 - Opening]
Visual: Macro extreme close-up of obsidian watch bezel rotating under softbox light.
Foley: Precision micro-mechanical click, tactile, heavy brass resonance. No music.

[Beat 02 - Escalation]
Visual: Rain drops striking dark sapphire crystal, water beading dynamically.
Foley: Sharp rhythmic pitter-patter of individual rain impacts. Low distant thunder.

[Beat 03 - Climax]
Visual: Subject's wrist snaps into focus against midnight neon city blur.
Foley: Crisp leather strap creak, sudden muted room tone.
```

#### `production/story/clean.txt`:
```text
[CLEAN STORY EXPORT — For human reading only. OpenProducer uses production/story/script.txt]

A macro shot catches the obsidian bezel of a luxury timepiece rotating under soft studio light.

Rain begins to pelt the dark sapphire crystal, water beading and sliding across the dial as distant thunder rolls.

With a sudden motion, the wearer's wrist snaps into focus against the neon glow of a midnight metropolis, perfectly still.
```

---

## 4. The Tag Purity & Spoken Audio Laws

### 4.1 The 40 Official Google AI Studio Expression Tags
Only official tags from the codified Google AI Studio Speech catalog are permitted in `script.txt`:
* **Pauses:** `<short pause>`, `<long pause>`
* **Breathing & Respiratory:** `<breath>`, `<heavy breath>`, `<exhales>`, `<pant>`, `<sigh>`, `<sighs>`, `<yawn>`, `<cough>`, `<sneeze>`, `<throat-clearing>`
* **Laughter & Amusement:** `<chuckle>`, `<chuckles>`, `<giggle>`, `<laugh>`, `<laughter>`, `<snicker>`, `<snort>`, `<cackle>`
* **Distress & Pain:** `<gasp>`, `<groan>`, `<grunt>`, `<whimper>`, `<cry>`, `<sob>`, `<moan>`, `<argh>`
* **Vocalizations & Projections:** `<whisper>`, `<whispering>`, `<whispers>`, `<cheer>`, `<shout>`, `<scream>`, `<shriek>`, `<pff>`, `<phew>`, `<tsk>`
* **Animalistic / Tension:** `<growl>`, `<grr>`, `<hiss>`

### 4.2 Formatting Rules:
1. **Isolated-Line Syntax:** When injecting `<short pause>`, `<breath>`, `<sigh>`, etc., place the tag on its own clean line between sentences.
2. **90% Natural Punctuation Rule:** Never spam tags. 90%+ of pacing must rely on commas (`,`), periods (`.`), and em-dashes (`—`).
3. **Zero Square Brackets in Spoken Narration:** Never use square brackets (`[...]`) inside spoken sentences. Gemini TTS pronounces brackets aloud as literal words. Square brackets are strictly reserved for structural headers (`[STORY FORMAT]`, `[Miller] (Speaker 1)`).
4. **Clean File Zero-Tag Rule:** `clean.txt` must have 100% of tags stripped.

---

## 5. Decoupled Template Architecture (`templates/story/`)

### 5.1 Sub-Vault Physical Separation
Templates are split into separate physical directories to prevent ID collisions:
* Global Story Templates: `~/.openproducer/templates/story/`
* Project Story Templates: `./openproducer/templates/story/`
* Global Video Templates: `~/.openproducer/templates/video/`
* Project Video Templates: `./openproducer/templates/video/`

### 5.2 Story Template Schema (`templates/story/<id>.md`):
```markdown
---
template_id: stickfigure
type: story
name: "Stick Figure Comedic Rant"
narrative_archetype: "fast_paced_rant_comedy"
voice_persona: "Snarky, cynical commentator speaking at high velocity"
target_wpm: 155
---

# 📖 Story Template: Stick Figure Comedic Rant
> Reusable narrative formula. Strictly excludes video cinematography and episode plot.

## 🪝 Hook & Pacing Structure
- **0s – 5s (The Hook):** Jarring, unhinged opinion or absurd premise. Zero fluff.
- **5s – 35s (The Escalation):** Three rapid escalating micro-frustrations. Build tempo.
- **35s – 45s (The Climax):** Total breakdown of logic or existential crisis.
- **45s – 60s (Outro & Punchline):** Abrupt, dry parting remark.

## 🗣️ Dialogue & Vocal Rules
- **Sentence Cadence:** Short, punchy sentences (maximum 12 words per sentence).
- **TTS Expression Tags:** Inject `<sigh>`, `<pant>`, `<gasp>`, `<laughter>` at emotional peaks.
- **Banned Cliches:** "Hey guys welcome back", "In this video", "Without further ado".
```

---

## 6. Pre-Flight Linters (Story Integrity Checks)

Before concluding execution, `/opp-write` and `/opp-rewrite` run these 7 pre-flight linters:

| Linter ID | Name | Pass Condition | Failure Action |
|---|---|---|---|
| **LINT-S1** | File Contract Presence | `beats.md`, `script.txt`, and `clean.txt` exist in `production/story/`. | Halt and generate missing files. |
| **LINT-S2** | Format Header Validity | `script.txt` starts with `[STORY FORMAT]` containing valid `Type: pure_narration \| dialogue_heavy \| hybrid \| silent_visual`. | Insert missing header block. |
| **LINT-S3** | Clean Export Purity | Below the top `[CLEAN STORY EXPORT ...]` header banner, `clean.txt` contains zero `<...>` tags and zero structural brackets (`[Speaker]`, `[Turn]`, `[SCRIPT]`). | Strip tags and re-export. |
| **LINT-S4** | Tag Catalog Verification | All tags in `script.txt` exist in the 40-tag Google AI Studio catalog. | Replace or remove invalid tags. |
| **LINT-S5** | Isolated Line Syntax | Pause/expression tags sit on their own dedicated line (`.\n<tag>\n`). | Re-format tag line breaks. |
| **LINT-S6** | Spoken Text Concordance | Spoken sentences in `clean.txt` match `script.txt` word-for-word. | Synchronize spoken lines. |
| **LINT-S7** | Pacing & Duration Ratio | Estimated spoken duration (`word_count / (WPM / 60)`) matches target duration ±15%. | Trim or expand dialogue beats. |

---

## 7. Downstream Skill Integration Contracts

### 7.1 `opp-explore` (Intent-Driven Routing)
* If creator says: *"I don't have a script yet"*, `opp-explore` proactively suggests `/opp-write` or `/opp-rewrite`.
* If `production/story/script.txt` exists on disk, `opp-explore` automatically detects it and adopts it as the active production script.

### 7.2 `opp-propose` (Brain Archive)
* Ingests `production/story/script.txt` directly into Section 4 of `openproducer/blueprint.md`.
* Automatically sets `audio_pathway` (`separate_audio` vs `embedded`) based on `[STORY FORMAT]`.

### 7.3 `opp-produce` (Compiler)
* For spoken archetypes: Directly converts `production/story/script.txt` into `production/audio_script.txt` ready for Google AI Studio Speech Playground.
* For `silent_visual`: Bypasses external TTS audio and embeds Foley sound design into `production/clips/clip_*/video_prompt.txt`.

