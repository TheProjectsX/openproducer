# OpenProducer — Production Workspace

## Creator & Agent Instructions
Welcome to this OpenProducer project workspace.

### For the AI Agent:
1. **Engine Memory:** All internal state, configuration, and audit logs live in [`openproducer/`](./openproducer/). Read `openproducer/config.json` and `openproducer/state.json` first.
2. **Dynamic Generation:** Do NOT assume fixed clips or characters. Interview the creator (or read their initial pitch/script/photo) and dynamically synthesize the creator-facing assets (`base_image_prompt.txt`, `references/`, `clips/`, `master_videos_prompt.txt`, `scratchbook.md`).
3. **Producer Boundary:** You are the Director & Producer, not the image rendering engine. Formulate prompts and guide the creator.
4. **2-Phase Workflow:**
   - **Phase 1:** Synthesize the complete production draft in one pass on disk.
   - **Phase 2:** Offer the creator the Step-by-Step Guided Run (Gate 1: Base Image $\rightarrow$ Gate 2: Audio $\rightarrow$ Gate 3: Clip Render $\rightarrow$ Gate 4: Retake Doctor).
