---
template_id: stickfigure-shorts
name: StickFigure Noir Shorts
archetype: animation
tier: modular_studio
aspect_ratio: 9:16
resolution: 1080p
audio_pathway: pathway_b_external_audio
audio_delivery_mode: separate_script_first
---

# 🎬 Template: StickFigure Noir Shorts
> Reusable 9:16 vector-noir trailer preset. Episode plot, script, locations, and reveal remain creator-specific.

## 🎨 Visual DNA
- **Style ID:** `vector_stick_figure`
- **Master Style Anchor:** Fast-moving minimalist 2D vector noir composed for a tall frame. Slender figures use uniform, unbroken dark strokes with rounded ends and stable proportions. The protagonist has a blank opaque white circular head with a thin dark outline. Preserve flat shapes, sparse architecture, legible silhouettes, and dramatic light.
- **Negative Prompt:** photorealism, 3D volume, fleshy anatomy, realistic hands, individual fingers, textured garments, illegible silhouettes, text, watermark.

## 👥 Subject DNA
- **Name:** Faceless protagonist
- **Biometrics:** Slender stick figure with a consistent head-to-body ratio, uniform dark strokes, rounded limb ends, and a solid white circular head. The protagonist has no eyes, nose, mouth, ears, fingers, or realistic joints. If an approved franchise-character image exists, use it as the identity reference; otherwise create and approve one before dependent shots.
- **Wardrobe:** The protagonist has no clothing. Supporting figures may use one consistent flat role marker, such as a cap silhouette, glasses outline, or bag shape. Recurring supporting figures have their own approved reference; avoid textured uniforms and detailed garments.
- **Expression Profile:** Show the protagonist's emotion through posture, head angle, distance, and restrained gestures while its face stays blank. Supporting characters may have minimal 2D line eyes or mouths when the story needs an expression; never transfer those features to the protagonist.

## 🌆 Environment DNA
- **Setting Name:** Episode-defined vertical noir locations
- **Spatial Description:** Use the height of the frame for overhead lines, corridor depth, light cones, or foreground reflections where the location supports them. Give each location a simple repeatable layout and plausible character-to-door/room scale. Show doors or barriers as opaque when the script calls for solid fixtures; use glass only when intended. Begin each location/time scene with a new approved scene-root image, then create each later same-scene clip image from the previous approved clip image, with stable subject/environment references where supported. Reset after drift.
- **Lighting Rig:** Lock one palette per scene: charcoal `#1E222A` with amber `#F59E0B` light for nocturnal exteriors, muted slate `#334155` for institutional spaces, or cream `#F1F5F9` for clinical memories. Keep dark strokes legible against their background. A time or palette change starts a new scene image root rather than appearing randomly between adjacent clips.
- **Acoustics:** The approved narration and any continuous music are separate tracks assembled by the creator. For external-audio clips, prompt `Dialogue: None` and only relevant location Foley or ambience. Do not rely on separately generated clip music or room tone to form an unbroken soundtrack.

## ⏱️ Pacing & Voice Profile
- **Default Clip Duration:** 4s
- **Speech Pacing:** 1.9 words/second
- **Vocal Attack:** Start with an immediate visual hook and motion; place speech at its actual cue in the approved rendered audio rather than forcing voice onto the first frame.
- **Voice Preset:** `Fenrir`

## 🔤 Motion Graphics & Typography
- **Font Family:** `Montserrat ExtraBold`
- **Primary Color:** `#FFFFFF`
- **Accent Color:** `#F59E0B`
- **Style:** Add brief high-impact captions in the final edit, timed to the approved audio and placed inside the destination platform's safe area. Keep Flow video prompts free of burned-in text.

## Producer Notes (read from this file; not parsed into CLI settings)
- Request the creator's approved master-audio duration and time-coded transcript before final clip planning. A 4s generation default is a preference for short beats, not a fixed edit grid. Choose 4s, 6s, 8s, or 10s source footage as supported by the selected Flow model/mode, and trim to meaningful audio events; edited durations may be uneven.
- Keep the exact cue, required visible event, subject/room scale, and reveal boundary in the scratchbook. The clip image shows the first visible moment; the video prompt describes the change during that cue. Never reveal a future event early to create extra movement.
- For a continuing location/time scene, approve each clip image before using it as the next image's local reference in Flow. At a new location/time state or after identity, layout, or palette drift, restart from the approved base, subject, and environment images. Do not require downloading a video or extracting its last frame.
- Start the first clip with motion tied to the opening audio cue already in progress in its first frames. Its image prompt sets a clear direction of travel and its video prompt begins the change immediately, with no idle lead-in. Maintain a brisk Shorts cadence through motivated camera travel, passing scenery, light changes, subject actions, or quick meaningful cuts. Keep the figure's limbs controlled and readable; create speed primarily through framing and the environment. Use a brief hold only for a deliberate suspense beat after the opening, then resume movement. Do not add unrelated motion or reveal a future event before its audio cue.
- A recurring supporting character gets its own reference. An incidental character can inherit the vector style without being conditioned on the protagonist's identity image. A four-view profile sheet may use 16:9 for panel spacing while the finished clips remain 9:16.
- Confirm the chosen narrator voice in the active TTS interface. If the creator has an approved custom Enzo voice, record that exact choice for the episode; choose any secondary voice deliberately. Check Flow model, input mode, resolution, and duration in the UI before generation. The creator mixes continuous ambience/music and verifies final cut continuity manually.
