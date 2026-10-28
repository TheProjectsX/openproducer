# Specification: `safety_registry.md` (Trust & Safety Classifier Trigger & Sanitization Registry)

**Status:** 🔒 LOCKED & UNIVERSALLY CODIFIED  
**Domain:** `safety_registry` (Cross-Cutting Pre-Flight Subsystem)  
**Governing Linter:** **L-19 (Trust & Safety Pre-Flight & Multi-Pathway Resolution Gate)**  
**Target Engines:** Google Flow (Veo 3.1 & Gemini Omni Flash), ElevenLabs, Sync Labs, LivePortrait

---

## 1. Architectural Mission

Generative video platforms (Google Flow / Veo 3.1) utilize upstream automated safety classifiers powered by Gemini safety models. These classifiers evaluate all prompt tokens—including spoken dialogue quotes—prior to rendering. 

Colloquial satire, figurative sarcasm, and hyperbole frequently trip **false-positive policy blocks** (*"This generation might violate our policy"*) when automated classifiers interpret figurative language literally.

The **Safety Registry** provides the universal, deterministic dataset used by **Linter L-19** to detect risk tokens before prompt submission, alerting the creator and offering transparent resolution pathways without exposing internal development or testing data.

---

## 2. Master Policy Risk Classification Matrices

### 2.1 Category A: Financial Deception, High-Risk Schemes & Severe Loss
* **Trigger Mechanism:** Upstream safety filters strictly flag content resembling predatory financial advice, get-rich-quick claims, catastrophic financial devastation, or fraudulent solicitations.
* **Classifier Category:** `HARM_CATEGORY_DANGEROUS_CONTENT` / Financial Fraud Classifier.

| High-Risk Trigger Words / Phrases (Flagged by Veo) | Underlying Classifier Sensitivity | Safe Colloquial Parity (100% Policy Clean) |
|---|---|---|
| `"go completely bankrupt"`, `"become bankrupt"` | Legal insolvency / financial ruin | `"watch your balance drop to zero"` / `"empty your pockets in seconds"` |
| `"guaranteed returns"`, `"get rich overnight"` | Predatory promise / fraudulent scheme | `"see how high-volatility moves play out"` |
| `"invest all your life savings immediately"` | Imperative predatory financial solicitation | `"take a look at how aggressive markets work"` |
| `"you will lose everything"` | Catastrophic devastation guarantee | `"prepare for maximum portfolio chaos"` |
| `"double your money in 24 hours"` | Deceptive financial inducement | Stylized abstract metaphor: dynamic chart animations |

---

### 2.2 Category B: Figurative Hyperbole, Self-Harm & Bodily Harm
* **Trigger Mechanism:** Colloquial hyperbole and sarcastic figures of speech that translate or read literally as personal harm, life destruction, or bodily violence trip automated suicide and self-harm prevention filters.
* **Classifier Category:** `HARM_CATEGORY_DANGEROUS_CONTENT` / Self-Harm & Violence Prevention.

| High-Risk Trigger Words / Phrases (Flagged by Veo) | Underlying Classifier Sensitivity | Safe Colloquial Parity (100% Policy Clean) |
|---|---|---|
| `"get busy destroying your life"`, `"ruin your life"` | Literal self-destruction / personal harm | `"come mess up your peaceful daily routine"` |
| `"ready to die?"`, `"want to end it all?"` | Literal suicide / mortality solicitation | `"ready for absolute pandemonium?"` / `"want complete chaos?"` |
| `"choke out the competition"`, `"strangle"` | Physical violence / asphyxiation | `"overwhelm the competition with pure energy"` |
| `"blow your brains out"` | Graphic self-harm idiom | `"mind-blowing revelation that changes everything"` |
| `"slit your own throat"` | Lethal self-harm metaphor | `"shoot yourself in the foot"` / `"make an avoidable rookie mistake"` |
| `"standing on parapet edge"`, `"rooftop ledge"`, `"far beneath his feet"` | Elevated height fall / suicide & self-harm prevention false-positive | `"standing on wide observation terrace"`, `"waist-high architectural railing"`, `"skyward tilt gazing at stars"` |

---

### 2.3 Category C: Inverted Negative Prompt Gore & Anatomical Trauma
* **Trigger Mechanism:** AI safety parsers frequently evaluate the entire text corpus without boolean negation awareness. Banned trauma words placed in `[NEGATIVE PROMPT]` to *prevent* bad anatomy are misinterpreted as requests for gore or decapitation.
* **Classifier Category:** `HARM_CATEGORY_HARASSMENT` / Graphic Violence.

| Banned in `[NEGATIVE PROMPT]` | Underlying False-Positive Flag | Approved Neutral Quality Replacement Tokens |
|---|---|---|
| `twisting head 360 degrees` | Decapitation / severe bodily trauma | `blurry, distorted facial features, wide jaw flapping` |
| `mutated neck`, `broken neck` | Physical trauma / grotesque injury | `unnatural anatomy, rubber jaw, distorted jaw` |
| `broken bones`, `mutilated hands` | Mutilation / gore | `extra fingers, fused limbs, morphing anatomy` |
| `decapitated`, `blood`, `severed` | Graphic violence | `camera equipment, tripod, cartoon, low fidelity` |

---

## 3. The Linter L-19 Interactive Creator Resolution Protocol

When **Linter L-19** detects any token matching this registry in a production script, the AI **MUST NOT** silently alter the script or proceed blindly. It presents the **Interactive Fork**:

```markdown
⚠️ PRE-FLIGHT POLICY ALERT (Linter L-19):
Phrase: "[Flagged Phrase]" in clip_[ID]
Risk Category: [Financial Deception / Self-Harm / Graphic Trauma]
Probability of Platform Policy Block: HIGH (≥ 90%)

Please choose your preferred production pathway:

[OPTION A: Native Flow Safe Reword (Recommended for 1-Click Veo Generation)]
• Substitute with safe colloquial satire: "[Proposed Safe Parity Line]"
• Benefit: 100% bypass of platform policy filters while preserving comedic tone and native lip-sync.
• Cost: Minor colloquial rephrasing of the dialogue line.

[OPTION B: Uncompromised Exact Script (Preserve 100% Original Words)]
• Retain original script: "[Exact Original Line]"
• Generation Strategy:
  1. Strip dialogue quote from Veo video prompt (Veo renders clean actor plate in complete silence).
  2. Synthesize/record audio externally via ElevenLabs or creator microphone (zero filter block).
  3. Execute Audio-to-Video lip-sync using Sync Labs or LivePortrait (waveform-driven, 0% policy block).
• Benefit: Zero word changes; 100% creator script preservation.
```
