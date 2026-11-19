# Specification 10: Structure Templates & Production Reconstruction (`/opp-reconstruct`)

> **Status:** Active (Phase 1 Spec & Skill Contract)
> **Default Behavior:** Google Flow remains the default production format whenever `structure_template_id` is unset, `null`, or `"google-flow-default"`.

---

## 1. Purpose

OpenProducer's default `production/` file factory targets **Google Flow** (3-block plain-text prompts with `[CONFIGURATION SETTINGS]`, `[INPUT SEEDS & INGREDIENTS]` using `[IMAGE N]` pointers, `Start Source: [IMAGE N]`, and per-clip `image_prompt.txt` + `video_prompt.txt`).

A **`structure`** template lets a creator define a different structural contract for `production/` prompt files—for example:
- **No per-clip images** (`clip_image_mode: none` — generating `video_prompt.txt` only).
- **Name-based references instead of `[IMAGE 1]`** (`reference_style: name_tags` or `natural_name`, e.g., `@MayaLin` or `Maya Lin`).
- **Separate `[NEGATIVE PROMPT]` blocks** (`allow_negative_block: true`) for engines that expose a dedicated negative prompt field.
- **Custom block headers & master compilation** tailored to tools such as Kling, Runway, Sora, Seedance, Hailuo, or ComfyUI.

---

## 2. The `structure` Template Sub-Vault (`templates/structure/<id>.md`)

### 2.1 Storage & Discovery Hierarchy
1. **Global Vault:** `~/.openproducer/templates/structure/<id>.md`
2. **Local Project Mirror:** `./openproducer/templates/structure/<id>.md`
3. **Bundled Presets:** `.agents/skills/openproducer-core/templates/structure/<id>.md`

### 2.2 Structure Template Markdown Contract
```markdown
---
template_id: <slug>
name: <Structure Name>
group: structure
target_engine: <google-flow | kling | runway | sora | seedance | custom>
clip_image_mode: <required | optional | none>
reference_style: <image_pointers | name_tags | natural_name>
allow_negative_block: <true | false>
inject_settings_in_prompt: <true | false>
prompt_blocks:
  - "[CONFIGURATION SETTINGS]"
  - "[VIDEO PROMPT]"
master_compilation: <separate_masters | single_master | none>
---

# 🏗️ Structure: <Structure Name>
> <One-sentence summary of target tool and structural rules>

## 📁 Production File Layout
- Exact files created or omitted in `./production/` (e.g., omit `clips/clip_xxx/image_prompt.txt`).

## 🔗 Reference & Pointer Rules
- How subjects, environments, and scene continuity are referenced in prompts (e.g., `@SubjectName` or natural names instead of `[IMAGE N]`).

## 🧱 Prompt Block Format
- Exact plain-text headers, ordering, and paste boundaries for each prompt file type.

## 📜 Provider-Specific Prompt & Constraint Rules
- Provider-specific rules that **must** be followed 1:1 during `produce`, `reconstruct`, `sync`, and `doctor` (e.g., whether settings like aspect ratio/duration are injected into the prompt text from `./openproducer/config.json`, mandatory character-count statements, anti-morphing constraints, explicit movement speed/pacing rules, or provider-specific phrasing).

## 🔄 Reconstruction Mapping (From Google Flow Default)
- Deterministic rules for `/opp-reconstruct` when converting an existing `production/` directory into this structure.
```

### 2.3 Frontmatter Flag Semantics
| Field | Values | Effect on Pipeline & Linters |
|---|---|---|
| `clip_image_mode` | `required` (default), `optional`, `none` | Controls whether `production/clips/clip_xxx/image_prompt.txt` is generated or omitted. |
| `reference_style` | `image_pointers` (default), `name_tags`, `natural_name` | Controls whether `[INPUT SEEDS & INGREDIENTS]` + `[IMAGE N]` + `Start Source:` are used, or replaced with name-based references. |
| `allow_negative_block` | `false` (default), `true` | Controls whether a `[NEGATIVE PROMPT]` block is permitted in prompt files. |
| `inject_settings_in_prompt` | `false` (default), `true` | Controls whether technical settings (e.g. aspect ratio, duration) from `./openproducer/config.json` must be written into the prompt text itself rather than kept external. |
| `master_compilation` | `separate_masters` (default), `single_master`, `none` | Controls generation of `master_images_prompt.txt` / `master_videos_prompt.txt`. |

---

## 3. Config & Scratchbook Integration

- **`./openproducer/config.json`:** Stores optional `"structure_template_id": "<id>"`. When omitted or `"google-flow-default"`, standard Google Flow rules apply.
- **`./production/scratchbook.md`:** Records `Structure ID: structure/<id>` (or `Structure ID: google-flow-default`) near the top alongside `Template ID:` so `/opp-restore` and `/opp-reconstruct` know the active structure.
- **Lossless Source of Truth:** `production/scratchbook.md` always preserves the cue-to-visual ledger, edited intervals, trim/hold notes, and scene lineage regardless of which structure is active, enabling safe reconstruction between structures.

---

## 4. `/opp-reconstruct` (`openproducer-reconstruct`) Contract

1. **Purpose:** Convert an existing `./production/` directory into the structure defined by a target `structure` template (or back to `google-flow-default`) without losing story beats, audio cues, or timeline pacing.
2. **Preconditions:**
   - Requires `./openproducer/config.json` and `./production/` (if `./production/` does not exist yet, activate the structure template via `structure_template_id` and delegate to `/opp-produce`).
3. **Transformations:**
   - **If `clip_image_mode: none`:** Fold essential first-frame composition details from `clip_xxx/image_prompt.txt` into `clip_xxx/video_prompt.txt` and remove `clip_xxx/image_prompt.txt`.
   - **If `reference_style: name_tags` or `natural_name`:** Resolve `[IMAGE N] -> path` mappings from `[INPUT SEEDS & INGREDIENTS]` to subject/environment names, rewrite in-body pointers (`[IMAGE 1]` → `@SubjectName` or name), and remove `[INPUT SEEDS & INGREDIENTS]` and `Start Source:`.
   - **If `allow_negative_block: true` / `false`:** Format or fold negative exclusions according to the target structure.
   - **Re-sync Masters & State:** Rebuild `master_*_prompt.txt` per `master_compilation`, update `Structure ID:` in `production/scratchbook.md`, set `structure_template_id` in `./openproducer/config.json`, and mirror the structure template to `./openproducer/templates/structure/<id>.md`.
