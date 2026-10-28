# Discussion 67: Music-to-Animated-Video Architecture & Version 2 Template Extraction

**Date:** 2026-10-28  
**Topic:** Song Transcript / Lyrics to Animated Video (Stick Figure / Stylized Character) + V2 Design Extraction Roadmap + Strict Frozen Skill Constraint  
**Status:** ✅ Logged & Documented for V2 Roadmap (Skill Codebase Frozen)

---

## 1. Context & User Intent

The creator identified a powerful new production pathway: **Song-to-Video / Lyric Animation**.
* **Use Case:** Creators who write original songs or generate AI music (e.g., Suno, Udio) want to take the timed lyrics/transcript and generate an animated music video (such as stylized stick figures or 2D animated characters) rather than a realistic speaking/lip-synced human video.
* **Key Distinctions:**
  1. *No Realistic Lip-Sync Needed:* The character does not need to mouth the words. The character is acting, moving, reacting, or journeying through an emotional/metaphorical narrative while the music plays.
  2. *Styles of Choice:* Minimalist/vector stick figures (e.g. *Alan Becker*, *Kurzgesagt*, noir stick figure), stylized 2D anime, chibi, or surreal line-art.
  3. *Musical Slicing:* Clips are sliced by musical phrases, verses, hooks, and choruses (4s/6s/8s/10s) rather than speech pauses.
  4. *Audio Layering:* Prompt audio is suppressed or limited to pure foley (`Audio: SFX: [Footsteps, whooshes]; Ambience: [Atmospheric bed]; Dialogue: None; Music: None.`) so that the master song file can be cleanly laid over the clips in the NLE timeline without audio clashes.

---

## 2. Web Research & Industry Findings

Online research into top-tier AI music video and lyric animation pipelines revealed:
1. **The Multi-Layered Composite Pattern:**
   * **Background Environment Plate:** High-aesthetic anime, watercolor, or stylized backgrounds (e.g., generated with Midjourney / Imagen 4).
   * **Foreground Character Motion:** Stylized stick figure or 2D animation clips generated with video models (Google Veo, Runway Gen-3, Kling, or motion models like Viggle/Komiko).
   * **Kinetic Typography:** Dynamic lyrics generated via auto-caption / kinetic text engines (StoryShort, CapCut, After Effects MOGRTs) synced to the vocal stems.
2. **Beat & Structure Mapping:**
   * Verses & Build-ups: 6s to 8s sustained camera tracking / atmospheric pans.
   * Chorus / Beat Drops: High-velocity 4s kinetic bursts, dramatic perspective shifts, and match-cuts.
3. **Metaphorical vs. Literal Staging:**
   * Songs use abstract poetry. The prompting bridge translates metaphors (e.g., *"drowning in silence"*) into tangible kinetic visual staging (e.g., *a white stick figure sinking slowly through a midnight-blue ink gradient with bubbles*).

---

## 3. Version 2 Roadmap Note: High-Quality Example Template Extraction

**Mandatory V2 Item:**
In **Version 2**, the framework will introduce an **Example-to-Template Extraction Engine**:
* Instead of building templates purely from scratch, OpenProducer will ingest high-performing, high-production-value video examples (scripts, visual styles, cinematography rhythms, and clip progressions from top-performing creators).
* The engine will reverse-engineer their underlying DNA—extracting visual anchors, camera kinematics, narrative pacing, and sound design recipes into clean, reusable global series templates (`~/.openproducer/templates/<template-id>.json`).

---

## 4. Operational Guardrail: Frozen Skill Policy

* **Strict Constraint:** Per creator mandate, **the compiled skill (`skills/openproducer*` and workflows)** must NOT be touched or modified until explicitly requested.
* All exploration, prompt experiments, and architectural notes are kept strictly in documentation and specifications without editing the compiled skill files.
