# Discussion 22: Creator UX Rule — Hero Image vs. Profile Turnaround Sheet

**Date:** 2026-10-22  
**Status:** ✅ FINALIZED (UX & Workflow Rule)  
**Topic:** Defaulting to Single Cinematic Hero Images vs. 4-Panel Technical Turnaround Sheets  
**Domain:** `architecture/` & `subjects/`  

---

## 1. The Creator's Core Feedback

> *"If creator does not explicitly use 'Character profile' or 'Profile' type terms, we will not create 4 panel image, we will create a hero image's type single image with backgrounds and stuff.*  
> *Dumb Creator: Why did you gave 4 panel profile image? I need a good image with good background and a good post such as Zero Two"*

---

## 2. The UX Pitfall Identified

In traditional AI technical pipelines, engineers jump straight to the technical asset (the 4-view turnaround sheet on `#E5E5E5`) because that is what Google Flow needs as **Ingredient #1**.

However, to a creator, being handed a dry, 4-angle studio orthographic sheet feels uninspiring, clinical, and jarring. The creator first wants to see **their vision come to life in a cinematic hero shot**:
- An expressive, iconic character pose.
- A rich, atmospheric environmental background.
- Cinematic lighting, mood, and depth.

---

## 3. The Golden Rule of Subject Genesis

1. **Default Output = The Single Cinematic "Hero" Image (Step 1):**
   - Whenever a creator asks to create, adapt, or visualize a character or product (e.g. *"make her look like Zero Two"*, *"show me the Chrono-X watch"*), the Agent **always defaults to Step 1 (`hero_prompt.txt`)**: a single, dramatic, beautifully composed hero shot in a motivated environment with an expressive pose.
2. **Conditional Output = The 4-Panel Technical Turnaround Sheet (Step 2):**
   - The Agent only invokes Step 2 (`turnaround_prompt.txt`) when:
     - The creator explicitly uses technical terms like *"model sheet"*, *"turnaround"*, *"character profile sheet"*, *"reference sheet"*, or *"consistency angles"*.
     - OR the creator approves the hero shot (*"Love it, let's lock it for video!"*), at which point the Agent smoothly transitions: *"Awesome! Now let's generate the 4-angle turnaround sheet on #E5E5E5 so we can feed it into Google Flow."*
