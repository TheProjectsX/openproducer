# Dialogue Voiceover Script Manifest (ElevenLabs Ready)
**Project Title:** The 2:17 AM Dispatch  
**Modality Switch Activated:** `dialogue_engine: elevenlabs` + `music_engine: external`

---

## 1. Dialogue Line Cue Sheet

| Cue ID | Associated Clip | Character / Voice Profile | Spoken Dialogue Line | Emotional Delivery Modifier | Speech Duration | Timing Buffer (Pre/Post Roll) |
|---|---|---|---|---|---|---|
| `VO_01` | `clip_03` | `EeriePhoneWhisper` | *"Don't trust the detective who's coming to find you."* | [Raspy, strained, close-mic dry whisper, hollow telephone EQ filter] | ~3.8s | 1.0s pre-roll, 3.2s post-roll |
| `VO_02` | `clip_04` | `DetectiveCross_Gravel` | *"What the hell is this?"* | [Low gravelly murmur, breathy confusion, guarded] | ~2.0s | 1.2s pre-roll, 4.8s post-roll |
| `VO_03` | `clip_07` | `DetectiveCross_Echo` | *"You have ten seconds before you remember."* | [Monotone, cold, chillingly deliberate, slight telephone earpiece crackle] | ~3.0s | 1.0s pre-roll, 4.0s post-roll |
| `VO_04` | `clip_10` | `PoliceRadio_Officer` | *"Station's clear... nobody's here."* | [Muffled AM radio transceiver squawk, distant, routine, tinny bandpass] | ~2.2s | 1.5s pre-roll, 4.3s post-roll |

---

## 2. In-Prompt Cleansing Transformation
When `dialogue_engine: elevenlabs` is active, the corresponding prompts in `individual_clips/` have spoken dialogue quotes stripped from Veo's prompt and converted to:
> *"Detective David Cross's mouth moves with restrained natural lip articulation and minimal jaw displacement, relaxed facial muscles, zero native audio speech."*

And when `music_engine: external` is active, all `Audio:` blocks enforce:
> `Audio: tactile foley, footsteps, rain on glass, zero background music, no score.`
