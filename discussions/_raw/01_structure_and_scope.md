# Discussion Log 01: Production Structure & Framework Scope

**Date:** October 22, 2026  
**Topic:** Aligning on lean, creator-focused structure for Google Flow prompt generation  
**Participants:** Creator & AI Assistant

---

## 1. Core Understanding & Philosophy

- **Goal:** Generate prompts and reference assets that accurately translate the creator's vision into Google Flow (Veo 3.1, Imagen 4, Gemini Omni Flash).
- **Anti-Pattern to Avoid:** Over-engineering. Do not create deep, bureaucratic layers of nested metadata or schemas that distract from the creative vision.
- **The Core Problem with Chat-Only Prompting:**
  - One-off prompts forget character appearances across clips (identity drift).
  - Background lighting, mood, and spatial scales change randomly between shots.
  - Spoken dialogue loses consistency or triggers glitchy subtitles and spelled-out words.
  - Camera movements conflict or blur the visual kinematics.
- **The Solution:** A lean, intuitive folder structure where each folder houses a specific creative domain (Characters, Sceneries, Scripts, Audio, Shots). When it's time to generate prompts, the system pulls the relevant elements directly into the final Flow prompt.

---

## 2. What Does a Video Need? (Domain Analysis)

To make a cohesive video, a creator needs to define:
1. **Characters:** Who is in the video? What do they look like? What are they wearing? What are their key visual markers? (Plus reference images for Flow's "Ingredients to Video" feature).
2. **Sceneries / World:** Where does it happen? What is the environment, time of day, atmosphere, and lighting?
3. **Scripts & Dialogue:** What happens? What is the narrative arc? What does each character say, and how do they say it (calmly, shouting, whispering)?
4. **Cinematography & Camera:** How is each moment framed? (Close-up, wide, tracking shot)? What is the single camera motion?
5. **Soundscape & Audio:** What do we hear? (Footsteps, ambient rain, mechanical humming, clear diegetic speech, no generic music).
6. **Shots / Clips:** The assembled, final front-loaded prompts (4s, 6s, 8s) ready to paste into Flow or pass to the API.

---

## 3. Open Discussion Points with Creator

- Which specific folder names feel most natural and straightforward?
  - E.g.: `characters/`, `sceneries/`, `scripts/`, `soundtrack/`, `clips/`? Or something even simpler?
- How should a creator interact with each folder?
  - Simple markdown files (`.md`) vs minimal JSON?
  - Markdown files are typically much more comfortable and human-readable for writing descriptions, notes, and creative ideas.
- How should images (character turnaround references, scenery concept art) be organized within these folders?
