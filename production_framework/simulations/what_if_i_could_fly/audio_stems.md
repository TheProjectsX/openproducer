# Audio Engineering & Stem Layout: What If I Could Fly?

**Production ID:** `what_if_i_could_fly`  
**Audio Architecture:** Pathway B (External Master Song Track + Veo Foley/Ambience Beds)  
**Total Song Duration:** 02:51.00  

---

## 1. NLE Timeline Multi-Track Layout

```
[Timeline 00:00.00 ────────────────────────────────────────────── 02:51.00]
Track A1: Master Song Audio Track (Original Vocal & Music Stems) [0 dB Master]
Track A2: In-Video Micro-Foley Beds (Veo Native SFX Stems)      [-12 dB Ducked]
Track A3: Environmental Ambience Beds (Wind, Waves, Rain, City)  [-16 dB Ducked]
Track A4: Empty / Reserved for Sound FX Transitions
```

---

## 2. Audio Directives & Music Suppression in Prompts
* Because the actual music and sung lyrics come from your master track on **Track A1**, every single in-video prompt explicitly suppresses AI background music generation using:
  `Music: None;`
* This guarantees that Google Flow / Veo 3.1 does **not** generate competing AI instruments or artificial speech, giving you crystal-clear, clean footage that locks directly onto your song track without phase cancellation.
* The prompts only generate natural physical diegetic foley:
  - Park pedestrian murmurs and footsteps (Clips 01–03)
  - Night room tone and gentle breeze through the window (Clips 04–06)
  - Open field wind and running footsteps (Clips 07–08)
  - Ocean waves and coastal gusts (Clips 09–10)
  - Kite flutter and line tension hum (Clip 18)
  - Gentle butterfly wing flutter (Clip 19)
  - Distant jet engine roar and rain droplets on asphalt (Clips 21–22)
  - Paper creasing and paper airplane glide (Clips 24–26)
