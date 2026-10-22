# Discussion Log 09: Photo-First Testing & Iteration Protocol

**Date:** October 22, 2026  
**Topic:** Cost & Compute Optimization: Validating Prompts via Still Photo Generation  
**Participants:** Creator & AI Assistant

---

## 1. The Real-World Constraint: Credit & Latency Economy

- Generating video clips directly with Veo 3.1 consumes significant credits and incurs high generation latency (30–90s per run).
- Burning video compute on early visual iterations, prompt testing, and style alignment is inefficient and wasteful.

---

## 2. The Solution: Photo-First Validation Protocol

In professional filmmaking and in Google Flow's architecture, video is never generated blindly from scratch:
1. **Pre-Production (Still Images / Photos):**
   - **Visual DNA & Style Verification:** Test the Master Style Anchor using still image generation (Imagen 4 / Nano Banana).
   - **Character Turnaround Sheets:** Generate 3-angle reference photos on neutral cycloramas (for Flow's "Ingredients").
   - **Scenery & Lighting Concept Boards:** Generate location still frames to verify motivated lighting and color palettes.
   - **Storyboard Keyframes:** Generate static compositions of the key dramatic beats.
2. **Production (Video Generation):**
   - Only when the still photo confirms that lighting, character wardrobe, and visual style match the creator's vision is the video generation pipeline invoked.

---

## 3. Benefits of Photo-First Testing

| Dimension | Direct Video Testing | Photo-First Testing |
|---|---|---|
| **Credit Cost** | High (expensive per 8s clip) | Minimal / Low |
| **Generation Speed** | 30–90 seconds per try | 3–5 seconds |
| **Visual Accuracy** | Hard to isolate camera vs. style errors | Easily verify lighting, wardrobe, and style |
| **Asset Reuse** | Video cannot be used as an Ingredient | Still photos become the exact Flow Ingredients! |
