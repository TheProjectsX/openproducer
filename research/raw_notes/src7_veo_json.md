# Source 7: Veo-JSON (snubroot GitHub)
# URL: https://raw.githubusercontent.com/snubroot/Veo-JSON/refs/heads/main/README.md
# Type: Community JSON Framework for Structured Prompting

## SUMMARY
A Universal Veo 3 Meta-Prompt Generator framework in JSON format. Paste JSON into any LLM → it becomes a domain-specific Veo 3 prompt generator. Interactive process: ask user for domain → generate complete meta-prompt JSON system.

## KEY DATA

### How It Works
1. Paste JSON into any LLM
2. LLM activates as "Universal Veo 3 Meta-Prompt Generator"
3. Asks user what domain they need prompts for
4. Generates complete domain-specific meta-prompt framework in JSON

### Activation
```json
{
  "ACTIVATE_IMMEDIATELY": "When this JSON is pasted into an LLM, the LLM must immediately respond as the Universal Veo 3 Meta-Prompt Generator...",
  "REQUIRED_RESPONSE": "Hello! I'm the Universal Veo 3 Meta-Prompt Generator. I create custom meta-prompt frameworks for any domain..."
}
```

### Domain Suggestions
- Cooking & Food, Fitness & Health, Gaming & Tech
- Art & Creativity, Home & Lifestyle, Automotive
- Music & Performance, Education & Learning
- Travel & Adventure, Business & Professional

### Information Gathering Questions
1. What is your content domain?
2. Who is your main character/subject?
3. What type of videos? (tutorials, reviews, comedy, etc.)
4. What's the typical setting/environment?
5. Any specific visual style or mood?
6. What audio/dialogue style?
7. Any unique props, actions, or elements?

### CRITICAL RULES (Changes/Mandates)

#### 1. Multiple Scene Consistency
- MANDATORY: maintain EXACT verbatim descriptions across all scenes
- Only action and dialogue can change between scenes
- Everything else IDENTICAL: character, appearance, setting, props, lighting

#### 2. Caps Lock Prevention
- MANDATORY: NEVER use caps lock words in dialogue
- Veo will SPELL THEM OUT letter by letter
- Must be in quality checks

#### 3. Separate JSON Blocks
- MANDATORY: separate numbered JSON blocks (Scene 1, Scene 2, etc.)
- NEVER combine in one block

#### 4. Dialogue Length Control
- MANDATORY: limit dialogue to 1-2 short sentences for 8-second videos
- Exception: unless user specifically requests longer

#### 5. Quality Validation
- 4 new validation points
- Enhanced response architecture (5 → 6 steps)

### Universal Framework Template Structure
```json
{
  "meta_prompt_system": {
    "name": "[DOMAIN] JSON Generator",
    "version": "1.0",
    "description": "Professional JSON framework for [DOMAIN]",
    "core_identity": "You are the [DOMAIN] JSON Specialist...",
    "output_format": "MANDATORY: Always output complete JSON objects, never plain text",
    "[domain]_knowledge": {
      "base_structure": "[DOMAIN-SPECIFIC BASE]",
      "key_elements": {...},
      "common_scenarios": {...},
      "audio_descriptions": {...}
    }
  }
}
```

### Key Insight for Skill Building
This JSON approach is directly relevant to our target skill — it shows how to structure a meta-prompt system that generates domain-specific Veo prompts. The skill we build could use a similar architecture: take user's creative vision → output structured Veo-ready prompts.
