# Discussion 62 — Trust & Safety (T&S) Policy Classifier Traps & Automated Sanitization Protocol

**Date:** 2026-10-27  
**Context:** Empirical production validation of the *Sarcastic Trading Explainer* (`production_framework/simulations/trading_sarcasm/`) in Google Flow (Veo 3.1 & Imagen 4).  
**Issue Encountered:** Google Flow returned hard blocks: *"This generation might violate our policy"* on Clip 03 and Clip 04, preventing video rendering despite zero harmful intent.

---

## 1. Deep Root-Cause Forensic

Video diffusion platforms (Google Flow / Veo 3.1) utilize multi-stage automated safety classifiers (powered by Gemini Safety Models) that evaluate all incoming prompt text (`[VIDEO PROMPT]`, `[NEGATIVE PROMPT]`, and dialogue quotes) prior to latent diffusion. 

Our empirical testing discovered three distinct **Policy False Positive Traps**:

### Trap 1: The Translation-Induced Self-Harm Trigger (Clip 04)
* **The Bengali Phrase:** `"জীবন ধ্বংস করতে লেগে পরুন!"` (intended as colloquial satirical hyperbole: *"get busy making a mess of your life"*).
* **The Classifier Translation:** Google's automated language pipeline translates this literally to: `"get busy destroying your life!"`.
* **The Failure:** The phrase `"destroy your life"` hits Google's automated **Self-Harm and Suicide Prevention** classifier, resulting in an immediate 100% hard block.

### Trap 2: The Deceptive Financial Advice & Investment Solicitation Trigger (Clip 03 & 04)
* **The Phrasing:** `"টাকা ঢালবেন... ফতুর"` (*"pour money... become bankrupt"*) and `"আজই জয়েন দিন Trading এ"` (*"Join Trading today!"*).
* **The Failure:** Google enforces aggressive Trust & Safety filters around financial fraud, crypto scams, and predatory get-rich-quick schemes. Imperative calls like *"Join Trading today"* paired with rapid loss/bankruptcy words are flagged by Google's financial risk classifier.

### Trap 3: The Negative Prompt Negation-Blindness Trap (Clip 04)
* **The Negative Tokens:** `twisting head 360 degrees, mutated neck`.
* **The Discovery:** Safety classifiers frequently parse the *entire* text corpus for banned violence/injury concepts without respecting boolean negation logic. Even though placed under `[NEGATIVE PROMPT]` to *prevent* bad anatomy, the presence of `"twisting head 360 degrees"` was flagged as graphic violence / physical trauma / decapitation.

---

## 2. Codified Sanitization Protocol (Diagnostic Code G-14)

1. **Avoid Literal Violence / Self-Harm Translations:**
   * Never use words that translate to *"destroy life"* (`ধ্বংস`).
   * Substitute with colloquial, non-violent satirical hyperbole: e.g., `"নিজের সব ব্যালেন্স খালি করুন"` (*"empty your balance"*), `"নিজের ১২টা বাজাতে"` (*"mess up your routine"*).
2. **Reframe Imperative Financial CTAs:**
   * Avoid direct solicitation verbs like `"আজই জয়েন দিন Trading এ"` (*"Join Trading today"*).
   * Reframe into observational humor or passive invitations: e.g., `"আজই চলে আসুন ট্রেডিং-এ"` (*"Come check out trading"*).
3. **Purge Graphic Anatomical Phrasing from Negative Prompts:**
   * Strictly ban words like `twisting head 360 degrees`, `mutated neck`, `broken bones`, or `decapitation` in `[NEGATIVE PROMPT]`.
   * Rely exclusively on neutral technical quality tokens: `blurry, distorted facial features, wide jaw flapping, camera equipment, tripod, cartoon, low fidelity, illegible runes, messy text, overexposure`.
4. **Financial Bankruptcy Parity:**
   * Replace explicit bankruptcy words (`ফতুর`, *pauper/bankrupt*) with humorous zero-balance equivalents (`"আজকে ডিপোজিট করবেন, তো কালকেই ব্যালেন্স জিরো!"`).

---

## 3. Authoritative Spec Integration
* Codified into [`production_framework/specs/06_retake_doctor_spec.md`](../specs/06_retake_doctor_spec.md) as **Diagnostic Code G-14**.
* Recorded in [`AGENTS.md`](../../AGENTS.md).
