# Audio Stem Architecture: The Breath at 2:00 AM

**Production ID:** `the_breath_at_2am`  
**Standard:** 4-Track Timeline Mixing Architecture ([`04_cinematography_audio_spec.md`](../../specs/04_cinematography_audio_spec.md))  
**Master Duration:** 01:12.00 (72.0s)  
**Total Dialogue Duration:** 67.98s  

---

## 1. Timeline Track Allocation

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ [A1] NARRATION STEM (Gemini 3.8 Flash TTS / SRT Track - Master Gain 0.0 dB)            │
│ 00:00.42 ════════════════════════════════════════════════════════ 01:07.98 [END]       │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ [A2] DIEGETIC FOLEY SFX (In-Video Veo Audio / Semicolon 4-Part Syntax - -4.0 dB)        │
│ CRT Hum ─── Clock Click ─── Cat Claw Tension ─── Frost Crackle ─── Overhead Breath     │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ [A3] SPATIAL AMBIENCE BED (Continuous 2:00 AM Apartment Silence - -12.0 dB)            │
│ 00:00.00 ════════════════════════════════════════════════════════════════ 01:12.00     │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ [A4] HORROR SCORE / CLIFFHANGER BED (Ducked to -∞ dB in Clips 01–11)                    │
│ [Dead Silence] ─── Clip 12: Low Drone (-14dB) ─── Clip 13: Explosive Crescendo (0dB)   │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Track Routing & Cue Timing Table

| Timeline Range | Track A1 (Narration Cue) | Track A2 (Diegetic Foley) | Track A3 (Room Ambience) | Track A4 (Horror Music Bed) |
|---|---|---|---|---|
| **00:00 – 00:06** | Cue 1–2: *"You are sitting in the dark of your living room at 2 a.m.,"* | Faint 60Hz cathode television buzz | Dead quiet apartment room tone | **Mute (-∞ dB)** |
| **00:06 – 00:12** | Cue 3–4: *"the only illumination coming from the muted blue glow of your television screen."* | CRT static surface crackle | Oppressive late-night room silence | **Mute (-∞ dB)** |
| **00:12 – 00:18** | Cue 5–6: *"You live alone. The apartment is dead quiet."* | Faint electronic capacitor click ("02:00") | Cavernous dead apartment silence | **Mute (-∞ dB)** |
| **00:18 – 00:24** | Cue 7–8: *"Your cat, perched on the back of the sofa, suddenly sits bolt upright."* | Microscopic sofa fabric tension beneath cat claws | Low eerie room silence | **Mute (-∞ dB)** |
| **00:24 – 00:28** | Cue 9: *"Its pupils dilate into black saucers."* | Subtle biological feline eyelid blink | Suffocating silent room tone | **Mute (-∞ dB)** |
| **00:28 – 00:32** | Cue 10–11: *"It isn't looking at you, the window or the hallway."* | Soft wooden floorboard settling creak | Deep domestic stillness | **Mute (-∞ dB)** |
| **00:32 – 00:38** | Cue 12: *"Its head is tilted up, tracking something invisible"* | Faint dry throat swallow | Ominous low night room tone | **Mute (-∞ dB)** |
| **00:38 – 00:42** | Cue 13: *"that is drifting slowly across the ceiling, directly"* | Subtle acoustic draught across upper void | Low unsettling stillness | **Mute (-∞ dB)** |
| **00:42 – 00:48** | Cue 14: *"toward you, step by step, left then right."* | Microscopic ceiling joist stress groan overhead | Heavy dead silence | **Mute (-∞ dB)** |
| **00:48 – 00:54** | Cue 15–16: *"You can't see anything in the shadows above, but as the cat's gaze stops directly overhead,"* | Absolute acoustic drop into dead silence | Chilling vacuum stillness | **Mute (-∞ dB)** |
| **00:54 – 00:58** | Cue 17: *"the air around you turns ice cold."* | Subtle brittle crackle of rapid frost crystallization | Freezing atmospheric draught | **Mute (-∞ dB)** |
| **00:58 – 01:04** | Cue 18: *"Then, two inches above your crown, you hear"* | Faint microscopic air displacement | Suffocating near-vacuum tone | **Fade in (-14 dB):** Low ominous bowed cello drone & sub-bass pulse |
| **01:04 – 01:12** | Cue 19–20: *"the quiet, deliberate sound of someone drawing a sharp, shallow breath."* | **01:08.20:** Quiet, deliberate, razor-sharp human inhalation drawn directly overhead | Absolute vacuum drop | **Surge (0.0 dB):** Explosive crescendo of screeching dissonant horror strings, bowed waterphone, and accelerating sub-bass pulse peaking at 01:12.00, cutting dead to black |
