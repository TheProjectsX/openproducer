# Raw Discussion 36: Default Google Flow Baseline & Dynamic Modality Switches

**Date:** 2026-10-24  
**Domain:** `directors_cut/` / `assembly/`  
**Status:** 💡 Active Architectural Consensus  
**Target Specification:** `production_framework/specs/05_directors_cut_assembly_spec.md`  

---

## 1. Architectural Principle: Flow Native by Default, Dynamically Modular on Demand

Rather than forcing the creator to configure complex multi-tool pipelines upfront, the framework establishes a clean, intuitive rule:

> **Default Baseline:** The system ALWAYS defaults to standard **Google Flow Native** (sliced Veo video clips, native in-clip dialogue, foley, and ambient score).

If at any point (before, during, or after generation) the creator requests a specific tool or workflow override, the engine activates **Dynamic Modality Switches** that surgically reshape the output stream without breaking narrative continuity.

```
                     CREATOR REQUEST
                            │
                            ▼
           [DEFAULT BASELINE: GOOGLE FLOW NATIVE]
           • Sliced Veo Video Clips (5s/8s/10s)
           • Native In-Clip Spoken Dialogue
           • Native In-Clip Foley SFX
           • Native In-Clip Background Music Score
                            │
       ┌────────────────────┼────────────────────┬────────────────────┐
       ▼                    ▼                    ▼                    ▼
[SWITCH: IMAGES]     [SWITCH: LONG-FORM]  [SWITCH: ELEVENLABS] [SWITCH: CUSTOM MUSIC]
"Use images instead  "Give me a single    "Use ElevenLabs for  "I'll use my own music,
 of videos"           long-take prompt"    dialogue"            remove score"
─────────────────    ──────────────────   ──────────────────   ──────────────────────
• Strips kinematics  • Merges clip beats  • Strips spoken lines• Strips score from
• Outputs Imagen 4/    into unified         from Veo prompt      Veo `Audio:` block
  Midjourney still     continuous           to prevent double-  • Leaves pure diegetic
  prompts              choreography         speech artifacting   foley & room ambience
                     • Smooth transitional• Generates isolated
                       adverbs              `voiceover_script.md`
```

---

## 2. The 4 Dynamic Modality Switches & Their Output Stream Impacts

### Switch 1: Visual Modality $\rightarrow$ Still Image Keyframes (`visual_mode: images`)
- **Creator Trigger:** *"I want to use images instead of videos"* or *"Give me stills for a slideshow"*.
- **Stream Transformation:**
  1. Purges all temporal camera kinematics (`push-in`, `lateral track`, `pan`, `whip cut`).
  2. Strips the trailing `Audio:` soundscape block.
  3. Formats prompts into high-detail optical still plates (photography lens, depth of field, composition, lighting) optimized for Imagen 4 or Midjourney.
  4. Retains Master Subject DNA and Scenery anchors.

### Switch 2: Assembly Modality $\rightarrow$ Monolithic Long-Take Prompt (`assembly_mode: monolithic`)
- **Creator Trigger:** *"I want to use a long form generator so give me a single prompt"* (e.g. Seedance, Sora, Minimax).
- **Stream Transformation:**
  1. Eliminates clip boundaries and cut markers (`clip_01`, `clip_02`).
  2. Fuses the narrative beats into a single continuous paragraph using causal transitional adverbs (*"The camera begins by... before slowly tracking over to reveal... as the subject seamlessly transitions into..."*).
  3. Preserves the Single-Motion Law across time by sequencing actions along a single continuous timeline arc.

### Switch 3: Audio Modality $\rightarrow$ External Dialogue / ElevenLabs (`dialogue_engine: elevenlabs`)
- **Creator Trigger:** *"I want to use ElevenLabs for dialogues, so give me the scripts"*.
- **Stream Transformation:**
  1. **Veo Prompt Cleansing:** Strips spoken dialogue quotes from the Veo video prompt to eliminate double-voice acoustic collisions and distorted AI speech. Modifies character action to natural lip movements without audio collision (*"speaking with subtle natural lip articulation, no native voice output"*).
  2. **Isolated Dialogue Script Manifest (`dialogue_scripts.md`):** Compiles an export-ready script formatted for ElevenLabs with:
     - Clip / Take ID
     - Character Name & Voice Profile ID (e.g. `MayaLin_GravelMedic`)
     - Spoken Dialogue text with punctuation cadence
     - Delivery Emotion Modifier (e.g. `[Whispered, strained, breathy]`)
     - Clip Duration & Speech Buffer Timing (e.g. `0.8s pre-roll, 3.2s speech, 1.0s post-roll`).

### Switch 4: Music Modality $\rightarrow$ External / Custom Score (`music_engine: external`)
- **Creator Trigger:** *"I will add my own background music, remove the score"* or *"Mute the music"*.
- **Stream Transformation:**
  1. Modifies the prompt's trailing `Audio:` block to enforce **pure diegetic realism**:
     > `Audio: tactile foley, heavy rain on asphalt, metallic click, ambient subterranean hum, zero background music, no score.`
  2. Prevents the AI video model from synthesizing random orchestral or synth scores over the creator's intended external music track.

---

## 3. Composability: Merging Switches Seamlessly

Because these switches operate on independent production streams (Visual, Assembly, Dialogue, Music), the creator can combine any subset:

- **Flow Video + External Music:** Sliced Veo clips with native dialogue and foley, but music stripped from `Audio:`.
- **Hybrid Studio Production:** Sliced Veo video (visual action only) + ElevenLabs dialogue script manifest + External music cue.
- **Documentary Slideshow:** Still image prompts + ElevenLabs voiceover manifest + Ken Burns duration timings.
