# Discussion 82: Dynamic Story Engine (Write/Rewrite), Intent Routing & Decoupled Story/Video Templates

## 1. Context & User Directives
- **Strategic Decision:** Integrate Story Writing and Script Doctoring directly into OpenProducer v2 via dedicated operational modes (`opp-write` and `opp-rewrite`), avoiding a disconnected standalone `openwriter` project while preserving OpenProducer's lean focus.
- **Dynamic Sequence Requirement:**
  1. **Writer-First:** `opp-write` -> Checks Story Template -> Generates story -> Feeds `opp-explore` / `opp-propose`.
  2. **Rewriter-First:** `opp-rewrite` -> Checks Story Template -> Rewrites raw input/article -> Feeds `opp-explore` / `opp-propose`.
  3. **Explore-First with Intent Detection:** Creator runs `opp-explore` saying they don't have a script -> System proactively recommends `/opp-write` or `/opp-rewrite`.
  4. **Traditional Fast-Path:** Creator arrives with finished script/plot -> standard `opp-explore` -> `opp-propose` -> `opp-produce`.
- **Producer-Facing Deliverables (`production/story/`):**
  - Storing scripts only in `./openproducer/` brain is insufficient; the human producer must see, read, and edit the story deliverables directly.
  - Deliverables are created in `production/story/` (`script.txt`, `beats.md`, and optional `raw_source.txt`).
- **Decoupled Story & Video Templates (Zero-Collision Architecture):**
  - Story templates and Video templates must NOT be crammed into a single file or share a single flat namespace.
  - A creator may have a `stickfigure` video template and a `stickfigure` story template. They must live in separate sub-vaults (`templates/story/` and `templates/video/`).
  - Loading targets are strictly decoupled: Story templates configure narrative rules and beat sheets in `production/story/`; Video templates configure cinematography and visual anchors.
  - Mix-and-Match Freedom: A creator can pair any Story Template (e.g. `comedy_sketch`) with any Video Template (e.g. `stop_motion_claymation` or `vector_stick_figure`).

---

## 2. Producer-Facing Deliverables vs. Project Brain Architecture

OpenProducer enforces a clean separation between **internal brain memory** and **creator-facing deliverables**:

```
<project_root>/
├── openproducer/                         <── INTERNAL AGENT BRAIN (Plumbing & State)
│   ├── config.json                       (Locked configurations: video + story template IDs)
│   ├── state.json                        (Active stage, flags, session tracking)
│   ├── blueprint.md                      (Consolidated master production blueprint)
│   ├── visual/
│   │   └── technical_anchor.txt          (Resolved visual style anchor tokens)
│   └── story/
│       └── story_metadata.json           (Story stats: WPM, duration, turn mappings)
│
└── production/                           <── PRODUCER-FACING DELIVERABLES (Human Workspace)
    ├── story/                            <── [NEW] DEDICATED PRE-PRODUCTION STORY SUITE
    │   ├── script.txt                    (Spoken screenplay, dialogue, voiceover draft)
    │   ├── beats.md                      (Beat sheet, scene hooks, narrative arcs)
    │   └── raw_source.txt                (Verbatim input dump when opp-rewrite is used)
    ├── audio_script.txt                  (TTS turn-formatted script with timestamps from produce)
    ├── base_image_prompt.txt             (Cinematography hero prompt)
    ├── motion_graphics.md                (Typography, fonts, captions styling)
    └── clips/                            (Compiled Veo 3.1 video prompts)
```

### Why `production/story/` Is the Superior Convention:
1. **Immediate Producer Visibility:** When `opp-write` or `opp-rewrite` executes, the producer immediately opens `production/story/script.txt` in their IDE/text editor to review lines, tweak dialogue, or reorder beats.
2. **Non-Destructive Rewriting:** If `opp-rewrite` is given a 2,000-word article, the original text is saved in `production/story/raw_source.txt` while the adapted video script is written to `production/story/script.txt`, allowing side-by-side verification.
3. **Automated Downstream Compilation:** When the creator proceeds to `opp-produce`, the system reads `production/story/script.txt`, applies TTS speech pauses/expressions, and produces the finalized `production/audio_script.txt`.

---

## 3. Decoupled Template Architecture (`templates/video/` vs `templates/story/`)

### The Problem Solved:
If Video and Story settings are forced into one template file:
1. You cannot reuse a story formula (e.g., *Sarcastic Rant*) across different visual mediums (*Stick Figure*, *Claymation*, *2D Anime*).
2. Template IDs collide (e.g. you cannot have a `stickfigure` video style and a `stickfigure` comedic voice without naming hacks).
3. Files become bloated and violate the Single Responsibility Principle.

### The Decoupled Two-Vault Design:

Templates live in distinct sub-vaults in both global (`~/.openproducer/templates/`) and local scopes (`./openproducer/templates/`):

```
~/.openproducer/templates/
├── video/                                <── VIDEO & CINEMATOGRAPHY TEMPLATES
│   ├── stickfigure.md                    (Visual anchor, 16:9, clean black/white vectors)
│   ├── vintage_film.md                   (Kodachrome 35mm, warm grain, desaturated)
│   └── cinema_35mm.md                    (Anamorphic, 2.39:1, natural cinematic lighting)
│
└── story/                                <── STORY & NARRATIVE TEMPLATES
    ├── stickfigure.md                    (Snarky, fast-paced comedic rant, 155 WPM)
    ├── true_crime_cold_open.md           (Solemn investigation, tense pauses, 125 WPM)
    └── explainer_3act.md                 (Problem, escalation, solution hook arc)
```

### Story Template Specification Schema (`templates/story/<id>.md`):
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
- **0s – 5s (The Hook):** Jarring, unhinged opinion or absurd premise. Zero introductory fluff.
- **5s – 35s (The Escalation):** Three rapid escalating micro-frustrations. Build tempo.
- **35s – 45s (The Climax):** Total breakdown of logic or existential crisis.
- **45s – 60s (Outro & Punchline):** Abrupt, dry parting remark.

## 🗣️ Dialogue & Vocal Rules
- **Sentence Cadence:** Short, punchy, staccato sentences (maximum 12 words per sentence).
- **TTS Expression Tags:** Inject `<sigh>`, `<pant>`, `<gasp>`, `<laughter>` at emotional peaks.
- **Banned Cliches:** "Hey guys welcome back", "In this video", "Without further ado".
```

---

## 4. Decoupled Loading Targets (Zero Cramping)

When a template is loaded, it writes strictly to its dedicated target domain:

| Template Type | CLI / Skill Command | Loaded Into Brain (`openproducer/`) | Loaded Into Workspace (`production/`) |
| :--- | :--- | :--- | :--- |
| **Video Template** | `opp template video use <id>` | `openproducer/config.json` (`visual_style`, `aspect_ratio`), `openproducer/visual/technical_anchor.txt` | `production/motion_graphics.md` |
| **Story Template** | `opp template story use <id>` | `openproducer/config.json` (`story_template_id`), `openproducer/story/story_metadata.json` | `production/story/beats.md` (initial template structure) |

### Mix-and-Match Superpower:
A creator can run:
```bash
npx opp template story use stickfigure     # Loads snappy comedic rant story formula
npx opp template video use claymation       # Loads stop-motion claymation visual style
```
*Result:* A stop-motion clay animation video with the fast-paced comedic dialogue of a stick figure sketch. Complete creative flexibility with zero configuration pollution.

### Template Discovery & Path Transparency (`opp template list`):
When listing templates via `opp template list`, OpenProducer resolves and displays the exact physical file path of each template on disk:
```text
🎬 Video & Cinematography Templates:
  • cinema-short-film
    ↳ /home/user/openproducer/src/templates/agents/skills/openproducer-core/templates/starter_presets/cinema-short-film.md
  • stickman-explainer
    ↳ ~/.openproducer/templates/stickman-explainer.md

📖 Story & Narrative Templates:
  • story-stickfigure-rant
    ↳ /home/user/openproducer/src/templates/agents/skills/openproducer-core/templates/starter_presets/story-stickfigure-rant.md
```

---

## 5. Dynamic Operational Sequence & Intent Routing

```
                          ┌──────────────────────────┐
                          │    Creator Starts        │
                          └─────────────┬────────────┘
                                        │
           ┌────────────────────────────┼────────────────────────────┐
           ▼                            ▼                            ▼
   [Path 1: opp-write]          [Path 2: opp-rewrite]        [Path 3: opp-explore]
   "Write me a story..."        "Rewrite this draft..."      "Let's make a video..."
           │                            │                            │
  Story template active?       Story template active?       Has script/plot?
    ├─ YES: Apply Story DNA      ├─ YES: Apply Story DNA       ├─ YES: Standard intake
    └─ NO:  Interactive pitch   └─ NO:  Tone/pace consult      └─ NO:  Recommends
           │                            │                              /opp-write or
           └────────────────────────────┤                              /opp-rewrite
                                        │                                    │
                                        ▼                                    │
                        ┌───────────────────────────────┐                    │
                        │    production/story/          │◄───────────────────┘
                        │  (script.txt & beats.md)      │
                        │   Human-Readable Deliverable  │
                        └───────────────┬───────────────┘
                                        │
                                        ▼
                        ┌───────────────────────────────┐
                        │      opp-propose / produce    │
                        │ (Auto-reads production/story/)│
                        └───────────────────────────────┘
```

1. **Path 1 (`opp-write`):** Generates `production/story/script.txt` and `production/story/beats.md`. If a Story Template is loaded, it formats the script according to the template's Hook & Pacing Structure.
2. **Path 2 (`opp-rewrite`):** Takes a raw article/draft, saves `production/story/raw_source.txt`, and produces `production/story/script.txt` trimmed and formatted for spoken audio.
3. **Path 3 (`opp-explore`):** If creator lacks a script, it directs them to `/opp-write` or `/opp-rewrite`. If `production/story/script.txt` already exists, `opp-explore` automatically reads it and uses it as the production script.
4. **Path 4 (`opp-produce`):** Takes `production/story/script.txt`, formats TTS turns for Google AI Studio into `production/audio_script.txt`, and generates video clip prompts in `production/clips/`.

---

---

## 7. Universal Story File Schema: Handling All 4 Storytelling Paradigms

A critical design challenge: **How do we handle pure narration (like *The Lighthouse*), dialogue-heavy screenplays (like *The 3:14 AM Doppelgänger*), hybrid narration/dialogue, and silent visual stories without creating chaotic file sprawl?**

### The Solution: File Stability with Dynamic Content Schemas
Downstream automation (`opp-propose`, `opp-produce`) requires **100% predictable file locations**. Therefore, the file names never change regardless of story type:
- `production/story/beats.md` — The narrative architecture, tension curves, and scene breakdown.
- `production/story/script.txt` — The performance script (or action/foley cues for silent).

Inside `script.txt`, the format is declared explicitly in a clean bracketed header:

```text
[STORY FORMAT: pure_narration | dialogue_heavy | hybrid | silent_visual]
```

### The 4 Canonical Archetype Schemas:

#### Archetype 1: Pure Narration (`pure_narration`)
Used for video essays, documentaries, creepy pasta/true crime narration (*The Lighthouse*), product brand films (*Chrono-X*), and TikTok voiceovers:
```text
[STORY FORMAT]
Type: pure_narration
Narrator: Charon (Deep, atmospheric, solemn)
Pacing: 125 WPM

[SCRIPT]
The light had been burning for eighty-seven nights without interruption.

<breath>
In the Atlantic swell, nothing changes except the cold.

When the relief tender finally broke the fog, the landing rope was already swinging loose against the rocks.
```

#### Archetype 2: Dialogue-Heavy Screenplay (`dialogue_heavy`)
Used for comedy sketches (e.g. Stick Figure arguments), dramatic short films (*The 3:14 AM Doppelgänger*), and multi-character scenes:
```text
[STORY FORMAT]
Type: dialogue_heavy
Cast:
- Speaker 1: Officer Miller (Voice: Puck, breathless, panicked)
- Speaker 2: Dispatcher Davis (Voice: Fenrir, cold, monotone)

[SCRIPT]
[Miller] (Speaker 1)
(whispering into radio)
Dispatch, repeat last transmission. Did you say... my car?

<short pause>

[Davis] (Speaker 2)
Unit Four, step out of the vehicle and raise your hands.

[Miller] (Speaker 1)
<gasp>
I am in the vehicle! Who is outside?!
```

#### Archetype 3: Hybrid Narrative (`hybrid`)
Used for storybook adaptations, cinematic shorts, and audiobooks where an omniscient or first-person narrator sets the stage while characters speak aloud:
```text
[STORY FORMAT]
Type: hybrid
Cast:
- Speaker 1: Narrator (Voice: Charon)
- Speaker 2: Maya (Voice: Kore)

[SCRIPT]
[Narrator] (Speaker 1)
The hallway smelled of ozone and damp plaster. Maya reached for the breaker switch.

[Maya] (Speaker 2)
<sighs>
If the generator's flooded, we're done.

[Narrator] (Speaker 1)
Behind her, the shadows stretched toward the doorway.
```

#### Archetype 4: Silent / Pure Visual (`silent_visual`)
Used for cinematic montages, teasers, ASMR, and atmospheric B-roll with zero spoken words (music & foley only):
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

### Downstream Pipeline Impact:
1. `opp-propose`: Inspects `[STORY FORMAT]` and configures `audio_pathway` (`separate_audio` vs `embedded`) and delivery modes automatically.
2. `opp-produce`:
   - For `pure_narration`, `dialogue_heavy`, or `hybrid`: Generates `production/audio_script.txt` formatted for Google AI Studio Speech Playground.
   - For `silent_visual`: Bypasses external speech generation entirely and compiles pure foley audio prompts directly into `production/clips/` video generation files.

---

## 8. The Human Clean Reading Export (`production/story/clean.txt`)

### The Creator Experience Dilemma:
While technical syntax (`[STORY FORMAT]`, `<short pause>`, `<breath>`, `[Turn 01 - ...]`, `(whispering into radio)`) is critical for AI speech engines and video clip matching, it makes the story disjointed and painful for a human to read smoothly.

A creator or executive producer wants to open a file and read the story seamlessly like a book, short story, or clean script.

### The Solution: One-Way Clean Export (`clean.txt`)
`opp-write` and `opp-rewrite` automatically generate a twin file: **`production/story/clean.txt`**.

```
production/story/
├── clean.txt         <── 📖 HUMAN-ONLY CLEAN EXPORT (Agent write-only, stripped of all tags)
├── script.txt        <── 📜 MACHINE SOURCE OF TRUTH (Contains TTS tags & structural headers)
├── beats.md          <── 🗺️ NARRATIVE STRUCTURE (Hooks, beats, escalation)
└── raw_source.txt    <── 📥 VERBATIM SOURCE (Optional, created on opp-rewrite)
```

### The Rules of `clean.txt`:
1. **Agent Write-Only (Excluded from Automated Parsing):**
   - OpenProducer writes `clean.txt` whenever `opp-write` or `opp-rewrite` runs.
   - Downstream agent skills (`opp-explore`, `opp-propose`, `opp-produce`) **DO NOT READ** from `clean.txt`. They always read `production/story/script.txt` to preserve TTS tags and voice configurations.
   - **Exception:** Only if the human producer explicitly commands: *"I edited clean.txt, use that as my new story"*, will the agent read `clean.txt` and reconcile it back into `script.txt`.
2. **Mandatory Header Notice:**
   The top of `clean.txt` always includes this single-line indicator:
   ```text
   [CLEAN STORY EXPORT — For human reading only. OpenProducer uses production/story/script.txt]
   ```
3. **Completely Stripped of Machine Syntax:**
   - All TTS tags (`<breath>`, `<short pause>`, `<sigh>`, `<gasp>`, etc.) are removed.
   - All speaker turn metadata (`[Speaker 1]`, `(monotone)`, `[Turn 01]`) is simplified to clean dialogue attribution (`Miller: ...` or pure prose).
   - In pure narration, it reads like an immersive book chapter.
   - In silent visual, it reads like an evocative cinematic story summary.


