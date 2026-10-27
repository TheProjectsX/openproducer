# Discussion 61: Creative Specification Finalization — Phonetic Lip-Sync Normalization & Opt-In Packaging Suite

**Date:** October 27, 2026  
**Context:** Implementing the final two Category A Creative Upgrades (Upgrades 6 & 9) to bring the foundational specifications to 100% completion before moving to production templates, scaffolding, and CLI tooling.  
**Target Platform:** Google Flow (Veo 3.1, Imagen 4, Gemini Omni Flash)

---

## 1. Upgrades Implemented

### Upgrade 6: Phonetic Dialogue Normalization Law (Linter `L-15` Enhancement)
- **Problem:** Native Veo 3.1 speech synthesis maps text tokens directly into facial visemes. Written numbers, digits, symbols, and technical acronyms (`"3:14 AM"`, `"1994"`, `"24fps"`, `"$500"`, `"AI"`, `"API"`) cause the viseme generator to stutter, drop syllables, or articulate awkward letter-by-letter mouth flapping.
- **Specification Changes:**
  1. Added **Section 5.4** to [`production_framework/specs/04_cinematography_audio_spec.md`](../../production_framework/specs/04_cinematography_audio_spec.md):
     - Codified mandatory phonetic word expansion for all spoken quotes in Pathway A (`"3:14 AM"` $\rightarrow$ `"three fourteen in the morning"`, `"$500"` $\rightarrow$ `"five hundred dollars"`, `"24fps"` $\rightarrow$ `"twenty-four frames per second"`).
     - Protected visual prop purity: numbers on physical displays (alarm clocks, screens, signs) maintain exact digits in visual tokens (`"03:14 AM"`).
  2. Updated **Linter `L-15`** in [`production_framework/specs/05_directors_cut_assembly_spec.md`](../../production_framework/specs/05_directors_cut_assembly_spec.md):
     - Explicitly checks for unexpanded numeric digits (`\d+`) inside quoted spoken dialogue, flagging them as pre-flight violations.
  3. Updated `L-15` definition in [`discussions/docs/god_tier_skill_plan.md`](../docs/god_tier_skill_plan.md).

---

### Upgrade 9: On-Demand Packaging Suite (`packaging_prompts.md`)
- **Strict Demand Law (No Demand, No Prompt):** The packaging suite is **STRICTLY ON-DEMAND**. The agent and prompt compiler **MUST NEVER** generate thumbnail, cover, or loop prompts by default during routine video assembly. If the creator does not explicitly ask for a thumbnail or promotional asset, **zero packaging files are created**.
- **When Explicitly Requested by Creator:**
  1. Added **Section 7.2** to [`production_framework/specs/05_directors_cut_assembly_spec.md`](../../production_framework/specs/05_directors_cut_assembly_spec.md):
     - **High-CTR Cover Frame & Thumbnail Generator (16:9 & 9:16):** Conditioned on `[IMAGE 1]` + Master Style Anchor. Codified the **Rule-of-Thirds & 40% Clean Negative Space Law** (subject positioned on outer vertical third, leaving 40% clean high-contrast negative space for title typography/stickers).
     - **Seamless Infinite Loop Bridge (`packaging/loop_bridge.txt`):** Formulates terminal camera vector and subject posture of `clip_final` to seamlessly snap back into Frame 1 of `clip_01` (via `[MATCH-ON-POSE]` or camera reset) to maximize short-form algorithmic loop retention.

---

## 2. Milestone Reached: 100% Creative Foundation Complete
With Upgrades 2, 5, 6, 7, 8, 9 and the Universal Melanin Parity & Facial Mask Decoupling codified, **all foundational, cinematographic, prompt-engineering, and directorial specifications are 100% complete, harmonized, and verified**.
