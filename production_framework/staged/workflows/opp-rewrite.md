---
description: Doctor, adapt, or rewrite an existing story, article, or draft into production/story/
---

# /opp-rewrite (or /openproducer-rewrite)

Execute the OpenProducer Rewrite workflow (Script Doctor & Content Adaptation):

1. **Activate Skill:** Invoke the `openproducer-rewrite` skill.
2. **Ingest & Preserve Raw Input:**
   - Save the unedited creator input or pasted article into `production/story/raw_source.txt`.
3. **Scan for Active Story Template & Adaptation Directives:**
   - Check `./openproducer/config.json` for `story_template_id` or look in `~/.openproducer/templates/story/`.
   - Apply the template's Narrative Formula or creator's tone/duration instructions.
4. **Generate Pre-Production Suite in `production/story/`:**
   - `production/story/beats.md`: Restructured beat sheet, hook, escalation, climax, and WPM timing.
   - `production/story/script.txt`: Performance script with `[STORY FORMAT]` header, Google AI Studio TTS tags (`<breath>`, `<sigh>`, `<gasp>`), and speaker turns.
   - `production/story/clean.txt`: Pristine book-style human reading export stripped of all tags and bracket markers.
5. **Run Pre-Flight Linters S-1 through S-7:**
   - Confirm tag purity, isolated-line syntax, and concordance between `script.txt` and `clean.txt`.
6. **Output Rewrite Status Card:**
   - Present generated word count, estimated duration, and recommend opening `production/story/clean.txt` for human review, followed by `/opp-explore` or `/opp-propose`.

