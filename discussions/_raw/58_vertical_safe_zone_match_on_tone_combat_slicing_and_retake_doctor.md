# Discussion 58: God-Tier Creative Specifications (Vertical Safe-Zone, Match-On-Tone, Combat Slicing & Retake Doctor)

**Date:** October 27, 2026  
**Context:** Implementing Category A Upgrades (Upgrades 2, 7, 8, and 5) from `discussions/docs/POST_CLEANUP_AUDIT_02.md` to bring the creative and cinematography specifications to a 100/100 score before tooling implementation.  
**Target Platform:** Google Flow (Veo 3.1, Imagen 4, Gemini Omni Flash)

---

## 1. Upgrades Implemented

### Upgrade 2: 9:16 Vertical Viewport & Safe-Zone Composition Engine
- **Problem:** Over 70% of modern short-form video is 9:16 (TikTok, Shorts, Reels). Standard 16:9 side-by-side staging forces subjects to shrink to specks or be cropped. Crucially, platform UI elements occlude the top 15% (search/headers), bottom 25% (captions, username, CTA buttons), and right 15% (engagement column). Rapid horizontal pans cause optical smear and background tearing.
- **Specification Changes:**
  1. Added **Section 2.3** to [`production_framework/specs/04_cinematography_audio_spec.md`](../../production_framework/specs/04_cinematography_audio_spec.md):
     - Codified the **Central 60% Action Safe-Zone Law** ($Y \in [15\%, 75\%]$, $X \in [5\%, 85\%]$).
     - Defined vertical framing standards (ECU, MCU, MS, Full Figure).
  2. Added **Section 3.3** to [`production_framework/specs/04_cinematography_audio_spec.md`](../../production_framework/specs/04_cinematography_audio_spec.md):
     - Banned rapid horizontal whip-pans in 9:16.
     - Codified vertical-native kinematics (vertical pedestal elevation sweeps, Z-axis linear push/pull, deliberate upward tilt glides).
  3. Added Rule 3 to **Section 5.7** in [`production_framework/specs/05_directors_cut_assembly_spec.md`](../../production_framework/specs/05_directors_cut_assembly_spec.md):
     - Codified **Z-Axis Depth Two-Shots** (Foreground Anchor lower-left, Midground Subject upper-right) and **Vertical Clean Singles** with complementary 15° eyelines.

### Upgrade 7: Dynamic Color & Exposure Continuity Lock (`[MATCH-ON-TONE]`)
- **Problem:** Diffusion models independently auto-expose and white-balance each shot. Cuts between macro inserts and wide room plates often strobe or flash with jarring Kelvin shifts.
- **Specification Changes:**
  1. Upgraded **Section 3.2** of [`production_framework/specs/01_visual_spec.md`](../../production_framework/specs/01_visual_spec.md):
     - Added **Section 3: The 3-Value Exposure & Kelvin Continuity Anchor**: Exposure Key (IRE), Dominant Color Temperature (Kelvin), and Black Point Floor (Hex).
  2. Updated **Section 4.6** of [`production_framework/specs/05_directors_cut_assembly_spec.md`](../../production_framework/specs/05_directors_cut_assembly_spec.md):
     - Explicitly bound `[MATCH-ON-TONE]` to the 3-value anchor in `palette_and_mood.md`.

### Upgrade 8: Multi-Character "Two-Shot Choreography" & Action/Combat De-Collision Protocol
- **Problem:** Veo 3.1 and diffusion models melt down when two subjects make physical contact or grapple in a single generative shot (limbs fuse, bodies merge, wardrobes swap).
- **Specification Changes:**
  1. Added **Section 5.8** to [`production_framework/specs/05_directors_cut_assembly_spec.md`](../../production_framework/specs/05_directors_cut_assembly_spec.md):
     - Banned continuous multi-second physical grappling in a single clip.
     - Enforced **High-Contrast Silhouette Separation** (polar-opposite luminance and silhouette profiles).
     - Codified the **3-Clip Kuleshov Action Slicing Formula**: Clip 1 (Wind-up & launch, 4s) $\rightarrow$ Clip 2 (Macro impact insert, 4s) $\rightarrow$ Clip 3 (Recoil & follow-through, 4s).
     - Mandated the Pre-Composited Tier 2 Action Keyframe for shared action plates.

### Upgrade 5: The "Retake Doctor" (`06_retake_doctor_spec.md`)
- **Problem:** Creators encountering adverse diffusion seeds burn compute credits guessing prompt tweaks.
- **Specification Changes:**
  1. Created standalone authoritative specification [`production_framework/specs/06_retake_doctor_spec.md`](../../production_framework/specs/06_retake_doctor_spec.md):
     - Codified **12 Master Glitch Diagnostic Codes (`G-01` to `G-12`)**:
       - `G-01`: Face Morphing Mid-Clip
       - `G-02`: Muppet Mouth / Jaw Distortion
       - `G-03`: Accidental Lip-Sync on Listener/Narrator
       - `G-04`: Moonwalking & Ground Slippage
       - `G-05`: Prop Popping / Materialization
       - `G-06`: Truncated Last Dialogue Word
       - `G-07`: Multi-Limb Combat Fusion
       - `G-08`: Inter-Clip Exposure Strobing
       - `G-09`: Hardware Equipment in Frame
       - `G-10`: Multiple Sofas / Furnishings (from Discussion 57)
       - `G-11`: Unseen Entity Visible / Lit (from Discussion 57)
       - `G-12`: Shadow Pareidolia / Face in Darkness (from Discussion 57)
     - Established the 3-Step `/doctor` interactive protocol: Intake $\rightarrow$ Surgical Patch Proposal $\rightarrow$ Atomic Manifest Sync.

---

## 2. Verification & Spec Integrity
All pre-existing sections, tables, headers, and rules across `01_visual_spec.md`, `04_cinematography_audio_spec.md`, and `05_directors_cut_assembly_spec.md` remain 100% intact with zero regressions.
