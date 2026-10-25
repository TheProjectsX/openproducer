# Style Plugin: Vintage & Retro Film / Archival Mediums
**ID:** `vintage_retro_film`  
**Target Medium:** Vintage Chemical Film Stocks, Archival Celluloid & Analog Magnetic Tape  
**Parent Specification:** [`../specs/01_visual_spec.md`](../specs/01_visual_spec.md)  
**Research Reference:** [`../../research/styles/04_vintage_and_retro_film_archival.md`](../../research/styles/04_vintage_and_retro_film_archival.md)

---

## 1. Master Style Anchor String (Verbatim Token Block — Ground-Level Default)
> `Shot on 35mm archival chemical film stock, authentic organic silver halide grain, natural warm analog color science, subtle mechanical gate weave, soft optical halation around warm incandescent highlights, natural edge vignetting, rich velvety black shadows, nostalgic archival film print aesthetic.`

---

## 2. Dialect Variations Registry (Layer 2 Aesthetic Dialects)

When the creator requests a specific historical era, chemical emulsion, or analog recording medium, the compiler injects the corresponding descriptor into Tokens 81–130:

### A. `kodachrome_64` (1960s–1970s Saturated Archival Transparency Film)
* **Dialect Descriptor:** `Shot on 35mm Kodachrome 64 slide film, authentic 1970s color science, saturated primary reds and warm amber yellows, rich contrast with deep velvety blacks, subtle warm optical halation around incandescent highlights, fine organic silver halide grain, natural skin tones with golden-hour warmth.`
* **Kinematics:** Steady eye-level tracking glide, slow push-in, naturalistic human motion without digital stabilization, organic film stock temporal grain cadence.
* **Dialect Negatives:** `modern digital video, cool blue tint, washed out sepia, oversaturated digital neon, crisp 4K sensor clarity, flat digital lighting.`

### B. `super_8mm_home_movie` (1960s–1970s Imperfect Mechanical Celluloid)
* **Dialect Descriptor:** `Super 8mm home movie footage, authentic mechanical gate weave with subtle vertical frame jitter, heavy organic celluloid grain, soft-focus corner vignetting, occasional warm orange light leaks along frame borders, nostalgic family archive, slightly unsteady handheld camera wobble, 18fps film cadence.`
* **Kinematics:** Natural organic handheld camera wobble without digital gimbal stabilization, slight mechanical shutter judder, subjects moving at lively 18fps cadence.
* **Dialect Negatives:** `smooth digital steadicam, gimbal stabilization, 60fps, sharp 4K edges, modern digital noise, clean video.`

### C. `vhs_camcorder_tape` (1980s–1990s Analog Magnetic Videotape)
* **Dialect Descriptor:** `1980s VHS home video recording, authentic magnetic tape tracking distortion lines across bottom edge, analog RGB color bleeding, low-light interlaced video noise, subtle CRT television phosphor glow, green glowing digital on-screen timestamp in bottom corner [OCT 24 1987], nostalgic 4:3 CRT format, genuine analog videotape texture.`
* **Kinematics:** Optical zoom-in and zoom-out lens stepping, naturalistic shoulder-mounted handheld movement, magnetic tape ghosting trails behind rapid action.
* **Dialect Negatives:** `celluloid film grain, film scratches, sepia, black and white, modern 16:9 widescreen, 4K resolution, cinematic color grade.`

### D. `technicolor_3strip` (1950s Golden Age Hollywood Melodrama)
* **Dialect Descriptor:** `1950s Technicolor 3-strip dye transfer cinematography, hyper-saturated vivid primary colors, striking cyan and ruby red hues, theatrical high-key Hollywood studio lighting, flawless porcelain makeup, deep rich black shadows, classic Hollywood melodrama aesthetic, pristine archival film print.`
* **Kinematics:** Slow deliberate crane-like camera glide, majestic panning, stately theatrical character blocking.
* **Dialect Negatives:** `desaturated gritty bleach bypass, handheld camera shake, digital video, modern muted grading, contemporary clothing.`

### E. `silent_orthochromatic_1920s` (Early Silent Orthochromatic Film)
* **Dialect Descriptor:** `1920s early silent film aesthetic, orthochromatic black-and-white silver nitrate film stock, hand-cranked camera with 16fps variable frame rate, prominent projector gate flicker, vertical celluloid scratches and dust motes, deep black circular vignette, dramatic German Expressionist chiaroscuro lighting.`
* **Kinematics:** Staccato, slightly hurried 16fps hand-cranked character movement, jerky physical pantomime acting, static locked-off framing.
* **Dialect Negatives:** `color, smooth 24fps cinema, modern digital clean blacks, sound dialogue, modern lighting.`

---

## 3. Materiality & Chemical Physics (Anti-Sepia Slime)
* **Emulsion-Driven Science (Ban the "Sepia Slime"):** True historical footage requires chemical emulsion descriptors (`Kodachrome 64`, `16mm silver halide`, `Technicolor 3-strip`). Strictly ban generic buzzwords (`vintage`, `retro`) that trigger muddy sepia overlays.
* **Strict Medium Purity:** Never mix physical celluloid (film grain, gate weave, light leaks) with electronic magnetic tape (scanlines, tracking noise, interlacing). Pick one medium per production.
* **Closed-Set Period Bounding (Anti-Anachronism Law):** Mandatory enforcement of period-accurate props:
  * `Permitted Props: [wood-paneled wall, rotary telephone, corduroy trousers, CRT television]`.
  * Negative constraint: `Strictly zero smartphones, modern laptops, LED headlights, contemporary synthetics.`

---

## 4. Optical Physics & Temporal Cadence
* **Historical Framerate Cadence:**
  * 16fps hand-cranked timing for Silent Film.
  * 18fps mechanical judder for Super 8mm Home Movies.
  * 24fps optical cadence for Standard 35mm Cinema.
  * 29.97i interlaced field cadence for VHS magnetic video.
* **Localized Highlight Halation:** Optical halation must remain strictly localized around warm incandescent bulbs, streetlamps, or chrome highlights; ban milky overall screen fog.

---

## 5. Kinematic Grammar
* **Mechanical Camera Behaviors:** Organic handheld camera wobble without digital gimbal smoothing, mechanical vertical gate weave (1–2 pixel frame bouncing), and stepped optical lens zoom.
* **Hardware Nouns Ban:** Strictly purge camera hardware nouns (`tripod`, `dolly track`, `crane`).

---

## 6. Lo-Fi Archival Foley Soundboard (Google Veo 3.1)
All Veo historical video prompts must reflect band-limited, period-grounded acoustics:
* **Projector & Celluloid Soundscape:** `Rhythmic 16mm film projector mechanical whir, gentle film gate clatter, low optical soundtrack hiss, faint crackle and dust pop`.
* **Magnetic Tape / VHS Soundscape:** `Analog magnetic tape hiss, muffled low-frequency audio hum, subtle warble on pitch (wow and flutter), muffled handheld condenser mic audio`.
* **Period Machine & Vehicle Foley:** `Rumbling carbureted V8 engine, mechanical typewriter carriage return bell, rotary telephone mechanical bell chime, tactile Bakelite switch click`.
* **Band-Limited Acoustics:** `Band-limited AM radio frequency response (300Hz–3kHz), muffled bass, rolled-off treble, lo-fi archival audio`.
* **Music Suppression Rule:** Always enforce `, no background music` or `, clean foley only` to prevent modern digital music synthesis.

---

## 7. Mandatory Style Negative Prompt Clause
> `NEGATIVE PROMPT: modern digital video, crisp 4K sensor clarity, cool blue tint, sepia slime filter, washed out milky blacks, smartphone, modern electronics, contemporary clothing, smooth gimbal, steadicam, tripod, camera rig.`
