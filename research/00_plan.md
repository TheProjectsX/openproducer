# Research Plan: Google Flow / Veo Video Generation Prompt Engineering

## Objective
Deep-dive into how Google Flow (Veo/Omni) video generation prompting works — structures, techniques, tips, tricks, limitations, and workarounds — to later build a skill that can produce storyboards, character designs, clip scripts, and video generation prompts.

---

## Phases

### Phase 1: Source Ingestion
Read and extract raw notes from 8 provided URLs:
1. https://ai.google.dev/gemini-api/docs/veo
2. https://leonardo.ai/news/mastering-prompts-for-veo-3
3. https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/video-gen-prompt-guide
4. https://deepmind.google/models/veo/prompt-guide/
5. https://raw.githubusercontent.com/snubroot/Veo-3-Meta-Framework/refs/heads/main/README.md
6. https://raw.githubusercontent.com/snubroot/Veo-3-Prompting-Guide/refs/heads/main/README.md
7. https://raw.githubusercontent.com/snubroot/Veo-JSON/refs/heads/main/README.md
8. https://cloud.google.com/blog/products/ai-machine-learning/ultimate-prompting-guide-for-veo-3-1

Output: Raw notes per source in `research/raw_notes/`

### Phase 2: Supplementary Online Research
Fill gaps found after Phase 1 with web searches.
Output: Additional raw notes in `research/raw_notes/`

### Phase 3: Synthesis
Combine all raw notes into structured, agent-consumable knowledge files.
Output: 10 synthesis files in `research/synthesis/`

### Phase 4: Validation
Cross-check, flag conflicts, note uncertainties.
Output: Updated synthesis files + validation notes in `research/validation.md`

---

## Output Structure
```
research/
├── 00_plan.md                  # This file
├── 00_progress.md              # Step-by-step progress log
├── 00_tasks.md                 # Task checklist
├── raw_notes/                  # Phase 1 & 2 — raw extractions & analysis per source
│   ├── src1_gemini_api_veo.md
│   ├── src2_leonardo_prompts.md
│   ├── src3_gcloud_prompt_guide.md
│   ├── src4_deepmind_prompt_guide.md
│   ├── src5_meta_framework.md
│   ├── src6_prompting_guide.md
│   ├── src7_veo_json.md
│   ├── src8_gcloud_blog_veo31.md
│   └── sup_*.md                # Supplementary research notes
├── raw_contents/               # Cleaned text/markdown archival copies from original resources
│   ├── src1_gemini_api_veo.md  # Cleaned full API doc (83KB)
│   ├── src2_leonardo_prompts.md
│   ├── src3_gcloud_prompt_guide.md
│   ├── src4_deepmind_prompt_guide.md
│   ├── src5_meta_framework.md
│   ├── src6_prompting_guide.md
│   ├── src7_veo_json.md
│   ├── src8_gcloud_blog_veo31.md
│   └── sup_*.md                # Supplementary cleaned contents
├── synthesis/                  # Phase 3 — final structured files
│   ├── 01_api_and_models.md
│   ├── 02_prompt_anatomy.md
│   ├── 03_prompt_techniques.md
│   ├── 04_character_and_consistency.md
│   ├── 05_multi_clip_and_storyboard.md
│   ├── 06_audio_and_dialogue.md
│   ├── 07_structured_prompting.md
│   ├── 08_limitations_and_workarounds.md
│   ├── 09_prompt_examples.md
│   └── 10_glossary_and_reference.md
└── validation.md               # Phase 4 — cross-check results
```

## Constraints
- Focus: Prompt engineering for Google Flow video generation
- Recency: Prioritize Veo 3 / 3.1, note but deprioritize outdated info
- Format: Agent-consumable, structured for reuse by any model
- Scope: Everything needed to build a skill for storyboards, character designs, clip scripts, video prompts
