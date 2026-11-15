---
template_id: blindspot-narrative
name: Blindspot Narrative
archetype: animation
tier: modular_studio
aspect_ratio: 16:9
resolution: 1080p
audio_pathway: pathway_b_external_audio
audio_delivery_mode: separate_script_first
---

# 🎬 Template: Blindspot Narrative
> Reusable faceless vector-noir series preset. Episode plot, script, and twist remain creator-specific.

## 🎨 Visual DNA
- **Style ID:** `vector_stick_figure`
- **Master Style Anchor:** Minimalist 2D vector noir with slender, unbroken dark strokes ending in smooth rounded tips. Each faceless figure has a solid white circular head with a thin dark outline. Preserve head-to-body proportion, stroke weight, flat graphic shapes, sparse architecture, and clear subject-to-background contrast across shots.
- **Negative Prompt:** photorealism, 3D volume, facial features, individual fingers, fleshy anatomy, textured clothing, illegible silhouettes, text, watermark.

## 👥 Subject DNA
- **Name:** Faceless protagonist
- **Biometrics:** Slender stick figure built from uniform, unbroken strokes; opaque white circular head; no eyes, nose, mouth, fingers, or realistic joints. Maintain the approved head-to-body ratio in every scene.
- **Wardrobe:** The protagonist has no clothing. A supporting character may have one simple flat role marker, such as a hat silhouette, glasses outline, or bag shape; keep it consistent and avoid textured garments.
- **Expression Profile:** Convey emotion through posture, head angle, distance, and measured gestures. Avoid sudden anatomy changes or a facial expression on the blank head.

## 🌆 Environment DNA
- **Setting Name:** Episode-defined locations and time states
- **Spatial Description:** Each location has a simple, repeatable layout of foreground, action space, and background. Keep doors, paths, props, and the protagonist's scale consistent within a scene. Start a new scene-root image when the location or time changes; create each later same-scene clip image from the previous approved clip image, with stable character and environment references where supported. Reject drift before chaining it forward.
- **Lighting Rig:** Use a scene-specific palette: softened charcoal `#1E222A` with amber light and wet reflections for nocturnal exteriors; muted slate `#334155` for institutional spaces; clean cream `#F1F5F9` for clinical memories. Keep the figure legible against the background. A palette change marks a scene or time transition, not random variation between adjacent shots.
- **Acoustics:** Voiceover is a separate master track. Describe only location-appropriate Foley and ambience for the creator's edit; do not prompt duplicate speech in external-audio video clips.

## ⏱️ Pacing & Voice Profile
- **Default Clip Duration:** 6s
- **Speech Pacing:** 2.2 words/second
- **Vocal Attack:** Follow the approved rendered audio and its timed cues; do not force speech on the first frame of every clip.
- **Voice Preset:** `Fenrir`

## 🔤 Motion Graphics & Typography
- **Font Family:** `JetBrains Mono`
- **Primary Color:** `#FFFFFF`
- **Accent Color:** `#FF3366`
- **Style:** Add clean, sparse captions in the final edit only when useful and timed to the approved audio. Do not ask Flow to render subtitles inside clip video.

## Producer Notes (read from this file; not parsed into CLI settings)
- Choose edited shot boundaries from the approved audio cue and reveal, then choose a supported 4s, 6s, 8s, or 10s generation length with enough usable footage. The edited use may be uneven; a 6s default is a starting preference, not a forced cut interval.
- Let urgency come from an action, a motivated viewpoint change, passing scenery, or a meaningful cut. Keep character movement controlled. A static hold is valid when it supports tension or a spoken beat; do not add fast movement solely to fill the clip.
- For a twist, withhold the decisive image until its approved audio cue. A silent visual tail is optional only when the creator includes it in the final timeline. `Dialogue: None` prevents prompted speech but does not mute an external master track; the creator handles that in the edit.
- Express supernatural threats through shadows, displaced shapes, scale, or silhouette changes that preserve the faceless stick-figure grammar. Avoid realistic claws, teeth, skin, or body deformation unless the creator explicitly changes the visual style.
- Confirm the selected Flow model, input mode, output resolution, and generation length in its UI. Confirm the chosen TTS voice in the active speech interface and use the actual approved audio timestamps for clip planning.
