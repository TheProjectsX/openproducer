---
description: Generate an original story and screenplay from premise or Story Template into production/story/
---

# /opp-write (or /openproducer-write)

Execute the OpenProducer Write workflow (Pre-Production Screenwriter & Story Genesis):

1. **Activate Skill:** Invoke the `openproducer-write` skill.
2. **Scan for Active Story Template:**
   - Check `./openproducer/config.json` for `story_template_id` or look in `~/.openproducer/templates/story/`.
   - If active, apply its Narrative Formula, Hook & Pacing Structure, and Voice Persona.
   - If none, check the creator's prompt or pitch options (premise, tone, duration).
3. **Generate Pre-Production Suite in `production/story/`:**
   - `production/story/beats.md`: Structural beat sheet, hook, escalation, climax, and WPM timing.
   - `production/story/script.txt`: Performance script with `[STORY FORMAT]` header, Google AI Studio TTS tags (`<breath>`, `<sigh>`, `<gasp>`), and speaker turns.
   - `production/story/clean.txt`: Pristine book-style human reading export stripped of all tags and bracket markers.
4. **Run Pre-Flight Linters S-1 through S-7:**
   - Confirm tag purity, isolated-line syntax, and concordance between `script.txt` and `clean.txt`.
5. **Output Write Status Card:**
   - Present generated word count, estimated duration, and recommend opening `production/story/clean.txt` for human review, followed by `/opp-explore` or `/opp-propose`.

