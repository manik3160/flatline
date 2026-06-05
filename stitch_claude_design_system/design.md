# FLATLINE — GAME DESIGN BIBLE
### Visual Identity, Character Art, UI Design & Asset Production Guide
**Document version 1.0 — Prepared for Google AI Studio asset generation + implementation**

---

> **Designer's note:** This document defines every visual decision for Flatline. Before touching any design tool or generating any asset, read this fully. Every choice here serves the game's core emotional arc — **tension → explosion → relief → repeat.**

---

## SECTION 1 — DESIGN PHILOSOPHY

### The Big Idea: "Emergency Ward Meets Bollywood"

Flatline lives in two visual worlds simultaneously, and the CONTRAST between them is the aesthetic:

**World 1 — The Clinical Dark:**
An ICU monitor. Black. Cold. Precise. The UI, backgrounds, and structure live here — dark, medical, slightly ominous. EKG lines. Monospace numbers. Flat clinical surfaces. This world makes the player feel the stakes.

**World 2 — The Cartoon Chaos:**
Vivid, loud, expressive Indian cartoon characters ripped straight from a modernised Tinkle Comics page. Bold outlines, exaggerated proportions, wild expressions. These characters are ALIVE inside this cold clinical world — and their energy is completely at odds with the seriousness around them.

**The contrast IS the design.**
Dark clinical shell + cartoon Indian characters = something nobody has seen before in a mobile party game. When a verdict drops and GOLD CONFETTI explodes across a black screen, it feels earned. When ANTIM SANSKAR hits with a purple glitch wash, it feels dramatic. The dark background makes every color explosion 10x more impactful.

### One sentence design vision:
> *A 3AM Indian hostel room energy — dark, loud, everyone's losing their mind, and somehow it's the best night of the year.*

### Three design principles
1. **CONTRAST IS KING** — Dark everywhere, color only at maximum impact moments
2. **EVERYTHING HAS PERSONALITY** — No generic icons. No stock UI. Every element feels designed specifically for Flatline.
3. **DESI BUT NOT KITSCH** — Indian cultural elements used with taste, not as costumes. The humor is in the writing and characters, not in slapping a rangoli border on everything.

---

## SECTION 2 — BRAND IDENTITY

### Logo Design

**Primary Logo:** The word FLATLINE in Bebas Neue Bold
- The horizontal crossbar of the letter **A** is replaced with an EKG spike — the line rises to a sharp peak then flatlines again
- A thin red line runs beneath the entire word, straight (flatlined), except under the **A** where it spikes up
- The dot on the **I** is a small red blinking indicator light
- Color: Pure white wordmark on black, or solid red on black for impact versions

**Logo Sizes:**
- App icon (512×512): Just the EKG spike as a symbol on black bg, red line
- Wordmark: Full FLATLINE text with EKG treatment
- Compact (favicon/32px): Single EKG spike line, red on black

**Logo DON'Ts:**
- Never use on a light background
- Never use any color other than white/red on dark
- Never add drop shadows, gradients, or glow effects to the wordmark itself (the starkness is the point)
- Never distort proportions

### Tagline
**Primary:** *"Survive the chaos. Or don't."*
**Secondary:** *"AI ka game. Dil ka darr."*
Use primary for English contexts, secondary for Instagram/WhatsApp thumbnails targeting desi audience.

---

## SECTION 3 — COLOR SYSTEM (COMPLETE)

### Base palette
| Token | Hex | Usage |
|-------|-----|-------|
| `void` | `#080808` | Main app background — the ICU monitor black |
| `surface` | `#111111` | Cards, panels, elevated surfaces |
| `elevated` | `#1A1A1A` | Modals, tooltips, topmost layers |
| `border-default` | `#242424` | All default borders |
| `border-glow` | `#FF2D2D33` | Red-tinted borders for active/focused states |

### Accent colors — used SPARINGLY
| Token | Hex | Usage |
|-------|-----|-------|
| `red-flatline` | `#FF2D2D` | THE primary accent. Timer bar, logo, active states, danger. |
| `red-dim` | `#FF2D2D1A` | Red tint backgrounds — lobby warnings, error states |
| `white-primary` | `#F5F5F5` | All primary text |
| `grey-secondary` | `#888888` | Secondary text, labels, metadata |
| `grey-muted` | `#444444` | Placeholder text, disabled states |

### Verdict colors — ONLY appear during verdict reveals
These colors should feel like an explosion when they appear because the rest of the game is so dark.

| Verdict | Primary | Glow | Background Wash | Feel |
|---------|---------|------|-----------------|------|
| **JUGAAD** | `#FFD700` Gold | `#FFD70066` | `#FFD70008` | Triumphant, warm, earned |
| **BACH GAYA** | `#22C55E` Green | `#22C55E44` | `#22C55E08` | Relieved, soft, underwhelmed |
| **BARBAD** | `#F97316` Orange | `#F9731644` | `#F9731608` | Failure, heat, embarrassment |
| **ANTIM SANSKAR** | `#A855F7` Purple | `#A855F799` | `#A855F715` | Chaos, drama, theatrical death |

### Color usage rules
- **On any game screen:** maximum 2 colors visible at once (dark base + one accent)
- **During verdict reveals ONLY:** full verdict color allowed across entire screen
- **Never:** use red and gold together (Christmas effect — wrong vibe)
- **Never:** use multiple verdict colors on the same screen simultaneously
- The timer bar is the ONLY red element on the Answering screen — it commands full attention

---

## SECTION 4 — TYPOGRAPHY

### Font stack
```
Display:  Bebas Neue — All-caps, dramatic numbers, verdicts, FLATLINE logo
Serif:    DM Serif Display (Regular + Italic) — Scenario text, story moments
Mono:     Geist Mono — Room codes, timers, EKG data elements
Body:     Plus Jakarta Sans (400, 500, 600, 700) — All UI, labels, names
```

### Type scale
| Role | Font | Size | Weight | Usage |
|------|------|------|--------|-------|
| Game Title | Bebas Neue | 96px / 6rem | 400 | FLATLINE on home screen |
| Verdict Label | Bebas Neue | 72px / 4.5rem | 400 | JUGAAD / BARBAD etc. |
| Timer Number | Geist Mono | 64px / 4rem | 600 | Countdown display |
| Scenario Text | DM Serif Display | 28px / 1.75rem | 400 | The scenario copy |
| Score Number | Bebas Neue | 48px / 3rem | 400 | Player scores |
| Player Name | Plus Jakarta Sans | 18px / 1.125rem | 600 | In-game player chips |
| UI Labels | Plus Jakarta Sans | 14px / 0.875rem | 500 | Buttons, tags |
| AI Narration | DM Serif Display Italic | 20px / 1.25rem | 400 Italic | Verdict narration text |
| Body/Meta | Plus Jakarta Sans | 14px / 0.875rem | 400 | Secondary info |
| Room Code | Geist Mono | 52px / 3.25rem | 600 | Room code display, 8px letter-spacing |

### Typography rules
- Bebas Neue is ONLY for numbers, verdicts, and the logo. Never for body text.
- DM Serif Display Italic for all AI-generated text — creates clear visual separation between "game text" and "AI voice"
- Never center-align body copy (only scenario text and verdicts are centered)
- Line height: 1.2 for display, 1.5 for body, 1.1 for mono
- Letter spacing: +0.05em for Bebas Neue, +0.08em for Geist Mono room codes

---

## SECTION 5 — CHARACTER DESIGN BIBLE

### Art Style Overview
**Style name: "Tinkle Remastered"**
Inspired by classic Indian comics (Tinkle, Chacha Chaudhary) but modernised with Supercell-level polish. Key characteristics:

- **Bold black outlines** (3-5px at display size, weight varies with character emotion)
- **Exaggerated proportions:** Big expressive head (40% of body height), compact body, oversized props
- **Flat color base** with simple 2-step cel shading (base color + one shadow tone + one highlight)
- **Expressive eyes** are the most important feature — must convey personality instantly
- **Motion indicators:** speed lines, sweat drops, exclamation marks, emotion bubbles (manga-influenced)
- **No gradients on character fills** — only on backgrounds and special effect elements
- **Each character has a signature prop** that's always visible and immediately identifiable

### Character poses needed (per character)
For each of the 4 characters, produce these 5 poses:
1. **Default idle** — standing, personality visible, used in character select
2. **Confident** — for JUGAAD verdict
3. **Relieved** — for BACH GAYA verdict (barely survived, phew)
4. **Embarrassed/failing** — for BARBAD verdict
5. **Dramatically dead** — for ANTIM SANSKAR (eyes X'd, comedic death, soul leaving body)

---

### CHARACTER 01 — THE TOPPER 🎓

**Full name:** Topper Bhai (internally)
**Age feel:** 19, first year engineering student
**Archetype:** The overachiever who runs on anxiety and chai

**Physical description:**
- Slim build, medium height, slightly hunched from carrying a massive backpack
- Round wire-frame glasses (thick lenses, always slightly fogged from stress)
- Hair: neatly combed with a strict side part — but there's one stubborn strand sticking up
- Wearing: crisp white shirt with college logo badge, dark blue trousers, white canvas shoes
- Accessories: Backpack SO heavy it's bending them forward, 3-4 pens clipped to chest pocket
- Floating around them: open textbooks, loose notes with equations, pencil case
- Signature prop: A stack of textbooks they're perpetually balancing (always about to fall)
- Expression default: Eyes wide with determination but a sweat drop on forehead

**Color palette:**
- Skin: Warm medium brown `#C68642`
- Shirt: Bright white `#F8F8F8` with navy badge `#1E3A8A`
- Trousers: Navy blue `#1E3A8A`
- Backpack: Forest green `#15803D`
- Glasses: Silver wire `#9CA3AF`
- Accent: Gold badge `#FFD700`
- Sweat drops: `#60A5FA` blue (classic)

**Pose-specific expressions:**
- Default: Worried-hopeful, sweat drop
- Confident (JUGAAD): Glasses gleaming, finger raised "I calculated this!", books neatly stacked
- Relieved (BACH GAYA): Collapsed slightly, hand over heart, glasses askew
- Embarrassed (BARBAD): Books flying everywhere, glasses cracked, sitting on floor
- Dead (ANTIM SANSKAR): All books piled on top of them, legs sticking out, grade sheet showing 0%

---

**GOOGLE AI STUDIO PROMPT — TOPPER (DEFAULT POSE):**
```
Cartoon character illustration, Indian comic book style, Tinkle comics inspired, modern Supercell game art quality. A 19-year-old Indian male student character nicknamed "The Topper". Exaggerated cartoon proportions with big expressive head and compact body. Round wire-frame glasses with thick lenses, neat side-parted black hair with one stubborn strand sticking up, crisp white college shirt with navy badge, navy blue trousers, white canvas shoes. Carrying an enormous green backpack that's bending him forward with its weight. 3-4 pens clipped to shirt pocket. Several open textbooks and loose exam notes floating around him with math equations. Holding a teetering stack of books in both arms about to fall. Expression: wide eyes full of anxious determination, single blue sweat drop on forehead, nervous smile. Bold black outlines 4px, flat color fills with simple cel shading (2 shadow tones), no gradients on character, white highlight on glasses and eyes. Warm medium brown skin tone. Background: transparent. Full body shot, facing slightly right, dynamic pose. Style: NOT anime, NOT Disney, Indian comic book + Clash Royale hybrid. Vibrant colors.
```

---

### CHARACTER 02 — THE JUGAADU 🔧

**Full name:** Jugaadu (no other name needed — everyone just calls them that)
**Age feel:** 21, second year dropout energy (but in a cool way)
**Archetype:** The friend who solves everything with duct tape, confidence, and audacity

**Physical description:**
- Medium build, effortlessly cool slouch, slight swagger in the stance
- Messy curly hair that hasn't seen a comb in days but somehow looks intentional
- Wearing: Flannel shirt (left partially unbuttoned, sleeves rolled up to elbows), cargo trousers with 8+ pockets (ALL bulging with random items — tape, wire, small tools, a chai packet)
- Accessories: Worn-down sneakers, a duct tape roll around one wrist like a bracelet, a utility belt
- Pockets visibly contain: Small wrench, electrical tape, spare phone charger, safety pins, a "chai powder" packet
- Signature prop: A worn-down wrench that glows faintly at the tip (it solves everything)
- Above head: A cartoon lightbulb — always on, bright yellow, slightly sparking
- Expression default: One eyebrow raised, knowing smirk, "I've already solved this" energy

**Color palette:**
- Skin: Warm brown `#A0522D`
- Flannel shirt: Orange-red plaid `#DC2626` with `#F97316`
- Cargo trousers: Khaki `#92400E`
- Shoes: Worn grey `#6B7280`
- Wrench: Metallic silver-warm `#9CA3AF` with glowing tip `#FCD34D`
- Duct tape: Silver `#D1D5DB`
- Lightbulb: Bright yellow `#FDE047` with spark lines `#FBBF24`

**Pose-specific expressions:**
- Default: One eyebrow raised, wrench casually over shoulder, knowing grin
- Confident (JUGAAD): Both thumbs up, lightbulb EXTRA bright, sparking, running
- Relieved (BACH GAYA): Shrugging with half-grin, "Easy," even if it wasn't
- Embarrassed (BARBAD): Wrench tied in a knot somehow, confused for the first time ever
- Dead (ANTIM SANSKAR): Wrench snapped in half, lightbulb shattered, lying flat, X eyes

---

**GOOGLE AI STUDIO PROMPT — JUGAADU (DEFAULT POSE):**
```
Cartoon character illustration, Indian comic book style inspired by Tinkle comics modernised to Clash Royale quality. A 21-year-old Indian male character "The Jugaadu" — the ultimate problem-solver friend. Exaggerated cartoon proportions, big expressive head. Messy curly black hair (intentionally messy), warm brown skin tone. Wearing a red-orange flannel shirt with sleeves rolled up, khaki cargo trousers with 8+ visible pockets all bulging with items (wrench, duct tape, wires, chai packet, safety pins). A silver duct tape roll worn around the left wrist like a bracelet. Holding a glowing-tipped silver wrench casually over one shoulder. A bright yellow cartoon lightbulb floating above head with sparking electricity lines. One eyebrow raised sharply, knowing confident smirk, leaning stance. Bold black outlines 4px, flat cel-shaded color fills, highlight dots on eyes. Transparent background. Full body, dynamic swagger pose facing viewer at slight angle. Style: vibrant, expressive, NOT anime or Disney. Indian comic meets Supercell game art.
```

---

### CHARACTER 03 — SHARMA JI KA BETA 📚

**Full name:** Sharma Ji Ka Beta (the legend, the myth, the impossible standard)
**Age feel:** 20, but somehow has a PhD, a startup, and 3 marriage proposals already
**Archetype:** The impossibly perfect person that everyone is compared to unfavorably

**Physical description:**
- Perfect proportions — the only character who isn't exaggerated in a chaotic way. Their exaggeration is their impossible perfection.
- Perfectly oiled and combed hair with a razor-sharp side part (not one hair out of place — literally impossible, slightly supernatural)
- Sparkling white teeth visible even in closed-smile situations (teeth have a star twinkle on them)
- Wearing: Immaculate school uniform AND a formal kurta layered over it somehow (he manages both)
- Accessories: Multiple trophies (Gold, Silver, Bronze — holding 2, one balanced on head), a fresh certificate, a book he authored titled "How to Be Perfect" (thin, gold-embossed)
- A faint golden halo visible above his head (subtle, like a light source from above)
- Signature prop: Trophy he never puts down, even when doing other things
- Expression default: Serene, benevolent, slightly smug smile — the smile of someone who KNEW this would happen

**Color palette:**
- Skin: Slightly lighter warm tone `#D4965A` (the fairness that relatives compliment)
- Uniform: Pristine white `#FAFAFA` with gold piping
- Kurta: Soft cream `#FEF3C7` layered over it
- Hair: Perfect black `#1C1C1C` with blue-black sheen
- Trophies: Gleaming gold `#FFD700` with shine highlights
- Halo: Pale gold `#FEF08A` with soft white glow
- Teeth twinkle: White `#FFFFFF` with a star `#FBBF24`

**Pose-specific expressions:**
- Default: Arms full of trophies, serene smile, halo glowing
- Confident (reference pose): Sighing with contentment, trophy newly added to collection
- Relieved: Never needs this expression — they never almost fail
- Embarrassed: Actually does not have this pose — they are immune. Instead use "pitying others" pose
- Ghost/Antim Sanskar reference: His SILHOUETTE appears judging from the background, arms crossed, disappointed

**Special use:** Sharma Ji Ka Beta also appears in the post-verdict SHARMA JI REVEAL screen as a full character card. He is also referenced in the ANTIM SANSKAR verdict design in the background.

---

**GOOGLE AI STUDIO PROMPT — SHARMA JI KA BETA (DEFAULT POSE):**
```
Cartoon character illustration, Indian comic book style, modernised Tinkle comics meets Clash Royale. A 20-year-old impossibly perfect Indian male student "Sharma Ji Ka Beta" — the legendary overachiever everyone is compared to. Perfect cartoon proportions (not chaotically exaggerated, but pristinely exaggerated). Perfectly oiled jet-black hair with razor-sharp side part, not one strand out of place. Warm medium-light brown skin. Sparkling white teeth visible in serene knowing smile with a small gold star twinkle on teeth. Wearing a perfectly starched white school uniform with gold piping AND a cream-colored kurta layered over it simultaneously. Holding two gold gleaming trophies in his arms with a third balanced on his head effortlessly. A thin gold book "How to Be Perfect" tucked under elbow. A faint glowing golden halo above his head. Expression: serene, benevolent, slightly smug contentment — the look of someone who always knew they'd win. Bold black outlines, flat cel shading, gold highlights. Transparent background. Full body, standing tall, facing viewer. Style: vibrant Indian comic meets Supercell. NOT anime.
```

---

### CHARACTER 04 — THE IT UNCLE 💻

**Full name:** IT Uncle (always The IT Uncle, never just "uncle")
**Age feel:** 37, has worked at "the company" for 11 years
**Archetype:** The desi corporate dad — slightly confused by everything but deeply confident regardless

**Physical description:**
- Dad bod with genuine confidence about it — slight belly that the formal shirt tucks over, but proudly
- Thinning hair combed firmly to one side with visible comb marks and generous hair oil (blue-black sheen)
- A neatly trimmed small moustache
- Wearing: Light blue formal shirt (slightly too formal for any situation), tucked tightly into slightly-high-waisted dark grey trousers, black formal shoes polished to a mirror
- Accessories: Company ID card dangling from a lanyard (old photo on it, looks nothing like him now), 4 pens in shirt pocket (3 expired, he doesn't know), worn laptop bag over shoulder, Jio phone in hand
- Always holding a chipped coffee mug that says "WORLD'S BEST EMPLOYEE" — always full
- Signature prop: The mug. It never leaves. It is his power source.
- Expression default: Slightly confused frown that transforms instantly into knowing nod — "Haan haan, I know"

**Color palette:**
- Skin: Warm medium brown `#B5651D`
- Shirt: Corporate light blue `#BFDBFE`
- Trousers: Dark grey `#374151`
- Shoes: Polished black `#111827`
- Mug: Cream with red text `#FEF3C7`, coffee inside `#78350F`
- ID card: White lanyard, old photo, company colours
- Hair: Black `#1C1C1C` with blue-black oil sheen

**Pose-specific expressions:**
- Default: Mug in hand, half-nod-half-confused, one eyebrow slightly higher
- Confident (JUGAAD): Mug raised like a toast, knowing nod, "I knew this would happen"
- Relieved (BACH GAYA): Spilled small drop of coffee, still holding mug, relieved laugh
- Embarrassed (BARBAD): Laptop fell open showing 47 Chrome tabs, mug empty, horrified
- Dead (ANTIM SANSKAR): Full office chaos around him, laptop exploded, mug shattered, sitting in pile of keyboards, X eyes, ID card says "FIRED"

---

**GOOGLE AI STUDIO PROMPT — IT UNCLE (DEFAULT POSE):**
```
Cartoon character illustration, Indian comic book style, Tinkle comics modernised to Supercell game quality. A 37-year-old Indian male corporate IT worker "The IT Uncle". Exaggerated cartoon proportions with dad energy. Slight belly proudly tucked under a neatly buttoned light blue formal shirt. Thinning black hair firmly combed to one side with comb-mark lines visible and blue-black oil sheen. Small neat moustache. Dark grey formal trousers hitched slightly high, polished black formal shoes. 4 pens in shirt pocket (different colors). Company ID card on lanyard around neck (old blurry photo). Heavy worn laptop bag on one shoulder. Jio phone in one hand. In other hand: a chipped cream mug reading "WORLD'S BEST EMPLOYEE" in red letters, coffee inside. Expression: slightly confused frown transforming into confident knowing nod — both happening simultaneously. Bold black outlines, flat cel shading, highlight spots on eyes and mug. Transparent background. Full body facing viewer at slight angle. Style: expressive Indian comic meets Supercell, NOT anime or Disney. Warm vibrant colors.
```

---

## SECTION 6 — ILLUSTRATION STYLE GUIDE

### Scene Illustrations (backgrounds, overlays)

**Style: "Indian Graphic Novel"**
Slightly different from character style — these are backgrounds and environment art, so:
- Less cartoon-exaggerated, more illustrative
- Still dark-toned (fits the clinical dark base)
- Use halftone dot patterns in shadow areas (Indian comic book texture)
- Panel-style composition for special screens (verdict reveal could use a comic-panel layout)

**Needed illustrations:**

**1. Home Screen Background:**
Description: A dark hospital corridor rendered in a graphic novel style. The walls have faintly visible EKG graph paper patterns. At the end of the corridor, a bright red light glows. Several monitors on the walls show flatlines. Very desaturated — almost black and white with only the red accent glowing. The 4 characters are visible as small silhouettes in the corridor walking toward the player.

**GOOGLE AI STUDIO PROMPT:**
```
Dark moody graphic novel illustration of a hospital ICU corridor at night. Graphic novel / Indian comic book ink style with heavy shadows and dramatic lighting. The corridor stretches into the distance with a vanishing point. Walls have faint EKG graph paper grid patterns barely visible. Medical monitors on walls all showing flatlines glowing red. A single bright red emergency light at the end of the corridor is the primary light source casting long dramatic shadows. Very dark color palette: near-black walls #080808, deep charcoal shadows, only red accent #FF2D2D for the light source and monitor glow. Four small cartoon character silhouettes visible in the mid-ground walking toward viewer — different heights and shapes suggesting distinct personalities. Halftone dot texture in shadow areas. Panel-style composition with strong horizontal framing. No text. 16:9 aspect ratio suitable for web game background. Dramatic, slightly ominous but still playful.
```

**2. Plot Twist Overlay Graphic:**
A cartoon explosion/burst graphic that appears when the twist hits — styled like a 60s comic book panel explosion. The word "TWIST" in heavily stylized font, starburst background in red/orange, comic action lines radiating outward. Should feel like an alarm.

**3. Sharma Ji Ka Beta Reveal Card Background:**
Gold/cream soft gradient with subtle geometric rangoli-pattern border (very clean, not overdone). Sharma Ji appears in front. His halo creates the primary glow.

**4. Antim Sanskar Full Screen Flash:**
A purple glitch/static effect that washes over the screen before the verdict card appears. Think VHS static but purple. Scan lines. Brief and dramatic.

---

## SECTION 7 — VERDICT CARD DESIGN (THE SHAREABLE MOMENT)

These cards are generated server-side (Satori) and shared to WhatsApp/Instagram. They must look stunning as standalone images.

### Card dimensions
- **Story format:** 1080 × 1920px (9:16) — Instagram Stories, WhatsApp Status
- **Square format:** 1080 × 1080px (1:1) — WhatsApp forwards, Twitter

### JUGAAD Card Design
```
Background: Deep black #080808
Accent layer: Radial gold gradient from center, very subtle (#FFD70015 at edges → #FFD70005 at very edge)
Border: 3px solid gold #FFD700 with subtle outer glow
Corner decorations: Small geometric diamond shapes in gold at each corner
                    (NOT rangoli, just clean geometric — 4-point star diamonds)

Top section:
  - Character illustration (confident JUGAAD pose), sized at ~35% of card height
  - Character stands slightly OFF-center left, creating visual interest

Center:
  - Verdict label: "JUGAAD" in Bebas Neue, 120px, color #FFD700
  - Thin horizontal gold line beneath it
  - AI narration text in DM Serif Display Italic, 28px, white, centered, max 2 lines

Bottom section:
  - Player name in Plus Jakarta Sans Bold 32px, white
  - Small character icon + "The [Character]" label
  - "FLATLINE" wordmark bottom-right, small, red
  - Round number "ROUND 3/5" bottom-left, grey

Confetti elements (subtle): 12-15 small geometric confetti pieces scattered in top half
  Colors: Gold, white, soft red — small diamonds and plus signs, NOT circular dots
```

### BACH GAYA Card Design
```
Background: #080808
Accent: Subtle green radial (#22C55E12)
Border: 2px solid #22C55E with lower glow than JUGAAD (underwhelmed energy)

Design note: This card is INTENTIONALLY less impressive than JUGAAD.
             Smaller text, more breathing room, simpler. The design should feel "meh."

Verdict: "BACH GAYA" in Bebas Neue 100px (smaller than JUGAAD), green #22C55E
Character: Relieved pose, centered
Narration: Same placement, lighter green tint on text
Sweat drop icon: One large cartoon sweat drop in upper right corner, blue
No confetti — just a single small tick mark in green
```

### BARBAD Card Design
```
Background: #080808 with subtle cracked texture overlay (very faint, hairline cracks)
Accent: Orange radial (#F9731620)
Border: 2px dashed orange #F97316 (dashed = broken, unstable)
                          
Corner decorations: Small "X" marks in orange at corners
Character: Embarrassed/failing pose
Verdict: "BARBAD" in Bebas Neue 120px, orange #F97316
         Slight distress texture on the letters (cracked effect applied to text fill)
         
Background elements: 3-4 small cartoon debris pieces (broken phone, spilled chai, 
                      torn paper) scattered around character — orange tinted
Narration text: Slightly smaller, grey-white #D1D5DB
```

### ANTIM SANSKAR Card Design (the showpiece)
```
Background: #080808 with scan-line overlay (horizontal lines, 1px, 8% opacity)
            Purple particle scatter in top half (#A855F730 micro-dots)
Accent: Deep purple radial from bottom, intense (#A855F740)
Border: 3px solid #A855F7 with heavy outer glow (box-shadow: 0 0 30px #A855F777)

Top element: Sharma Ji Ka Beta silhouette in background, 60% opacity, arms crossed,
             slightly transparent (ghostly, judging)

Character: Dramatically dead pose, centered

Verdict text: "ANTIM SANSKAR" split across two lines if needed
              Bebas Neue 100px, purple #A855F7
              Subtle drip/horror texture on letters (like ink drip from bottom of each letter)

Roast text box: A torn-paper styled container in dark purple
                DM Serif Display Italic 22px, light purple #E9D5FF
                The roast text appears here — 3 sentences

Bottom:
  - "SHARMA JI WOULD HAVE..." label in gold, tiny, above narration box
  - FLATLINE wordmark, right-aligned, red
  - Small gravestone emoji illustration in bottom-left corner

Overall feel: Should look like a horror movie poster crossed with a roast battle certificate
```

---

## SECTION 8 — SCREEN-BY-SCREEN VISUAL DESIGN

### Screen 1 — HOME / LANDING
```
Layout: Full viewport, dark background
Background: The hospital corridor illustration (Section 6), very dark,
            EKG line animation runs horizontally across the middle (thin, red, drawing itself)

Top third:
  - FLATLINE logo centered, white, 96px Bebas Neue with EKG treatment on 'A'
  - Below: tagline "Survive the chaos. Or don't." in DM Serif Display Italic, 20px, #888888
  - The EKG line pulses once on load (draws across full width in 1.2s)

Middle:
  - Two card panels side by side (mobile: stacked):
    CREATE ROOM card | JOIN ROOM card
  - Cards: #111111 bg, 1px border #242424, 12px radius, 24px padding
  - Each card has a subtle inner glow on its top edge (1px highlight line, #FFFFFF08)
  - Input fields: dark fills, red bottom-border on focus (not full border box)
  
Bottom:
  - Character selection: 4 CharacterCard components in 2×2 grid
  - CharacterCards show character illustration (bust shot), name, ability hint
  - Selected state: gold border + very subtle gold inner glow

Animation on load:
  1. EKG line draws across screen (0ms start)
  2. FLATLINE text fades up (600ms delay)
  3. Tagline fades up (900ms delay)
  4. Cards slide up (1200ms delay, staggered 150ms apart)
  5. Character cards fade in (1600ms delay)
```

### Screen 2 — LOBBY
```
Top: Room code display — 5 characters in Geist Mono, 52px, letter-spacing 8px
     Framed in a dashed red border (#FF2D2D with 2px dashed)
     Below code: "Share this with friends" in grey, copy button (clipboard icon, red)

Middle: Player list — vertical stack of PlayerChip components
  Each chip: character bust illustration (small, 40×40px), player name, 
             character label, HOST badge if applicable
  Chips animate in one by one (150ms stagger, slide from left)
  Connected players have a small green dot pulse (3s CSS animation)

Bottom (HOST view):
  - Category selector: 8 category buttons in a wrapped row, 
    pill-style but with square radius (6px), inactive: dark, active: red
  - Rounds selector: segmented control "3 / 5 / 7"
  - START GAME button: full-width, red background, Bebas Neue 24px, uppercase
  - Minimum 2 players check: if only 1 player, button is disabled + tooltip "Need at least 2 players"

Bottom (GUEST view):
  - "Waiting for host to start..." text
  - EKG line animation beneath text (thin, slow, pulse pattern)
```

### Screen 3 — COUNTDOWN
```
Full-screen dark. Nothing else.
Center: Number (3, 2, 1, then "SURVIVE!")

Animation per number:
  - Number appears at 200% scale, bright red
  - Scales down to 100% in 400ms (ease-out spring)
  - Screen flashes briefly red (#FF2D2D22) on each number
  - Numbers: Bebas Neue, MASSIVE — fill ~70% of viewport height
  
"SURVIVE!" text:
  - White, same size
  - A brief heartbeat SFX plays
  - Screen flash white then immediately transitions
```

### Screen 4 — SCENARIO REVEAL (5 second read)
```
Top: "ROUND 2 OF 5" | [Category label]
     Small, grey text, Plus Jakarta Sans, 12px
     Thin red progress line beneath (shows 5s countdown passively)

Center: Scenario text in DM Serif Display, 28px, white, centered
        Maximum 3 lines. If longer, reduce to 24px.
        Text fades in word by word (typewriter style but faster — 20ms per word)
        
        Below scenario: subtle horizontal divider (#242424)
        Then plot twist teaser text: "A twist is coming..." in grey italic 14px
        (disappears when actual twist fires)

Bottom: "Answering starts in 4..." countdown in Geist Mono, grey
```

### Screen 5 — ANSWERING
```
Top bar: Timer bar (full width, 6px height, red → orange → flash)
         Timer number: right-aligned, Geist Mono 48px, white → orange → red as time drops
         Left of timer: "X / Y answered" counter (grey, updates live)

Scenario text: 18px DM Serif Display, above the input, condensed

PLOT TWIST BANNER (fires at 30s mark):
  Full-width overlay banner, slides down from top
  Purple background #A855F7, bold white text: "🔄 PLOT TWIST:"
  Twist text below in white
  Banner shakes briefly (CSS shake animation) on entry
  After 3s: banner stays but shrinks to compact "reminder" bar at top
  Input re-enables briefly for 20s to let players edit

Main input area:
  Large textarea: dark fill, minimal border (only bottom red line on focus)
  Placeholder: "Type your survival plan..." 
  Font: Plus Jakarta Sans 16px (mobile-comfortable)
  Character counter: bottom right of textarea, grey
  
  After typing starts: textarea border animates to subtle red glow (you're in the game)

Bottom row:
  Left: "📞 Call Mummy" button — grey, small pill button, disabled after use
  Right: "SUBMIT →" button — red, 6px radius, Bebas Neue 20px
         After submit: turns grey, shows "✓ LOCKED IN" — cannot un-submit

Player submission counter animation: each time a new player submits, the 
  counter briefly pulses ("3/6 answered" → counter blinks green briefly)
```

### Screen 6 — JUDGING
```
Full-screen dark. Maximum drama.

Center: EkgLine component — full screen width, draws the EKG pattern
        Line is red, thin (2px), drawing animation loops
        
Below line: "AI is deciding your fate..."
            DM Serif Display Italic 22px, white, fades in 500ms after screen loads

Rotating desi loading messages (swap every 1.5s, fade transition):
  - "Consulting Sharma Ji Ka Beta..."
  - "Checking if your jugaad actually works..."
  - "Your mom was just informed..."
  - "Calculating survival probability..."
  - "AI peeking at your kundali..."
  - "Calling CBSE helpline..."
  - "Cross-referencing with Sharma Ji's answer..."
  - "Assessing your questionable choices..."

Font: Plus Jakarta Sans 14px, #888888

Bottom: All player name chips in a row (small), each with a pulsing grey dot
        One by one they turn red as AI completes judging (cosmetic only)
```

### Screen 7 — VERDICT REVEAL
```
Reveal players one at a time, 1.8s gap between each reveal.

Per-reveal animation sequence (1800ms total):
  0ms:    Full-screen color flash (verdict color, 80% opacity, 200ms duration)
  200ms:  Flash fades
  200ms:  Verdict card enters from BOTTOM of screen, slides up 
          with spring physics (overshoot slightly, settle)
  700ms:  Card settled. Verdict label text "types on" (Bebas Neue letter by letter)
  1000ms: Narration text fades in (DM Serif Italic)
  1200ms: Character illustration pops in with bounce (scale 0 → 1.1 → 1.0)
  1800ms: Brief pause, then next player

ANTIM SANSKAR special sequence:
  0ms:    Glitch effect washes screen (purple scan lines, static)
  400ms:  Glitch clears
  400ms:  Card falls from TOP of screen (not slides from bottom)
  900ms:  "ANTIM SANSKAR" types on letter by letter (slower — 80ms per letter)
  1400ms: Roast text appears line by line (dramatic pause between each)
  2000ms: Sharma Ji Ka Beta ghost silhouette fades in behind card (arms crossed)
  
After all reveals:
  "SHARMA JI KA BETA WOULD HAVE..." card appears
  Full card with Sharma Ji illustration + his "perfect answer" in DM Serif Italic
  Host sees "NEXT ROUND →" button. Guests see "Waiting for host..."
```

---

## SECTION 9 — ANIMATION BIBLE

**Core principle: Animations are EARNED, not decorative.**
Only 5 key animation moments in the entire game. Everything else is functional and fast.

### Animation 1: EKG Draw (reused in multiple contexts)
- What: An SVG path draws the EKG waveform across the screen
- Pattern: flat line → slight rise → SHARP SPIKE UP → sharp drop → secondary bounce → flat line → repeat
- Duration: 2.4s per cycle
- Color: `--red-flatline` primary
- Speed: Normal = 2.4s. Judging screen = 1.8s (slightly faster = more tense)
- Easing: `stroke-dashoffset` animation, linear

### Animation 2: Verdict Reveal Entry
- Character: Spring physics — cubic-bezier(0.34, 1.56, 0.64, 1) — the slight overshoot
- Card: slide-up 60px → final position, 400ms
- Color flash: instant on, 200ms fade-off
- Verdict text: character-by-character, 60ms gap
- DO NOT rush this animation. The pause after is important. Let players react.

### Animation 3: Plot Twist Entry
- Shake animation: 3 quick left-right shakes (CSS keyframe), 300ms total
- Slide down from top: 250ms ease-out
- Sound: alarm bell (implement as audio cue for dev)

### Animation 4: Timer Urgency
- At 20s remaining: timer bar color transitions to orange (500ms transition)
- At 10s remaining: timer number starts slow scale pulse (1.0 → 1.05 → 1.0, 800ms loop)
- At 5s remaining: bar flashes red (alternates #FF2D2D and #7F1515 at 400ms interval)
- At 0s: full-screen red flash (200ms), then immediate transition to SUBMITTED phase

### Animation 5: Score Update
- When new score adds: number rolls up (slot machine style — digits spin)
- Duration: 600ms per digit change
- Color: White → Gold briefly → settles to white
- The rolling number animation is the most satisfying moment on the scoreboard

---

## SECTION 10 — SOUND DESIGN BRIEF

*(For developer — implement using Howler.js or Tone.js)*

| Sound | Trigger | Character | Duration |
|-------|---------|-----------|----------|
| `heartbeat.mp3` | Loops during ANSWERING phase | Slow thump, ambient, 60bpm | Loop |
| `flatline.mp3` | On JUDGING phase start | The iconic EEE----- sound | 2s |
| `heartbeat-fast.mp3` | Under 10 seconds remaining | Same thump, 120bpm | Loop |
| `verdict-jugaad.mp3` | JUGAAD reveal | Upbeat 2-second desi music sting, triumphant | 2s |
| `verdict-bach.mp3` | BACH GAYA reveal | Short relieved exhale + soft bell | 1.5s |
| `verdict-barbad.mp3` | BARBAD reveal | Brief dramatic orchestral hit, low | 1.5s |
| `verdict-antim.mp3` | ANTIM SANSKAR reveal | Horror sting + "maa-ooo" dramatic swell | 3s |
| `twist-alarm.mp3` | Plot twist fires | Alarm bell + analog phone ring hybrid | 1s |
| `submit.mp3` | Player submits answer | Soft click + heartbeat | 0.3s |
| `mummy-dial.mp3` | Call Mummy activated | Phone dial tone (3 rings) → "Haan beta?" | 3s |

**Sound rules:**
- All sounds fade in/out (never abrupt cut)
- Heartbeat ambient maxes at 30% volume — background only
- Verdict sounds play at 80% volume — they need to land
- Add a mute toggle (🔇) accessible at all times

---

## SECTION 11 — COMPLETE ASSET PRODUCTION LIST

### Characters (20 illustrations total)
- [ ] Topper — 5 poses (default, confident, relieved, embarrassed, dead)
- [ ] Jugaadu — 5 poses (default, confident, relieved, embarrassed, dead)
- [ ] Sharma Ji Ka Beta — 4 poses (default, pitying others, ghost silhouette, silhouette arms-crossed)
- [ ] IT Uncle — 5 poses (default, confident, relieved, embarrassed, dead)

**Format:** PNG with transparent background, 800×800px minimum

### Illustrations (6 total)
- [ ] Home screen corridor background (1920×1080 + 430×932 mobile crop)
- [ ] Plot twist explosion burst graphic (800×600, transparent bg)
- [ ] Sharma Ji reveal card background (1080×600)
- [ ] ANTIM SANSKAR purple glitch overlay (1080×1920, semi-transparent)
- [ ] Halftone texture overlay (512×512 tileable)
- [ ] Small gravestone illustration (100×120, transparent)

### Logo & Icons
- [ ] FLATLINE wordmark — EKG treatment on A (SVG)
- [ ] App icon — EKG spike symbol (512×512 PNG, 192×192 PNG)
- [ ] Favicon (32×32 ICO)
- [ ] EKG line as SVG path (the drawing animation)

### UI Elements
- [ ] Character select card frames (4 variants matching each character's palette)
- [ ] Verdict badge graphics (4 tiers — SVG preferred for scalability)
- [ ] JUGAAD corner diamond decorations (SVG)
- [ ] BARBAD crack texture overlay (PNG, tileable)
- [ ] ANTIM SANSKAR scan-line overlay (CSS preferred — horizontal-lines gradient)
- [ ] Sweat drop illustration (small, reusable in UI)
- [ ] Lightbulb illustration (for Jugaadu ability indicator)

---

## SECTION 12 — GOOGLE AI STUDIO BATCH PROMPTS

Copy-paste these exact prompts into Google AI Studio (Gemini) for generating all assets.

### All 4 Characters — Quick Reference Prompts

**Topper — All 5 poses in one prompt:**
```
Generate 5 versions of the same cartoon character on a transparent background. Character: 19-year-old Indian male student "The Topper". Exaggerated cartoon proportions, big head, compact body. Round wire-frame glasses, neat side-parted black hair with one cowlick, white college shirt with navy badge, navy trousers, heavy green backpack. Warm brown skin #C68642. Bold 4px black outlines, flat cel shading. Tinkle comics meets Clash Royale style. NOT anime. The 5 poses: 1) Default idle: wide anxious eyes, blue sweat drop, balancing teetering books 2) Confident: glasses glinting, finger raised, books neatly stacked, triumphant 3) Relieved: hand over heart, glasses askew, wiping forehead 4) Embarrassed: books flying everywhere, sitting on floor, confused 5) Dramatically dead: books piled on top, legs sticking out, X eyes, grade showing 0. Show all 5 side by side, each full body, white background for isolation.
```

**Jugaadu — All 5 poses:**
```
Generate 5 versions of cartoon character on transparent background. Character: 21-year-old Indian male "The Jugaadu". Exaggerated big head, curly messy black hair, warm brown skin #A0522D, orange-red flannel shirt sleeves rolled up, khaki cargo pants with bulging pockets, silver duct tape bracelet on wrist, glowing wrench, lightbulb above head. Bold 4px outlines, flat cel shading, Tinkle comics x Clash Royale. NOT anime. 5 poses: 1) Default: one eyebrow raised, knowing smirk, wrench over shoulder, lightbulb sparking 2) Confident JUGAAD: both thumbs up, lightbulb BRIGHT, running pose 3) Relieved: shrugging, half-grin, wrench twirling 4) Embarrassed: wrench tied in knot, genuinely confused first time ever 5) Dead: wrench snapped, lightbulb shattered, X eyes, flat on ground. Side by side, white background.
```

**Sharma Ji Ka Beta — All 4 poses:**
```
Generate 4 versions of cartoon character. Character: 20-year-old impossibly perfect Indian male "Sharma Ji Ka Beta". Perfect proportions (not chaotically exaggerated — pristinely exaggerated). Perfectly oiled jet-black hair, razor-sharp part. Medium-light warm brown skin. Sparkling white teeth with gold twinkle star. White school uniform with gold piping AND cream kurta simultaneously. Holding 2 gold trophies, third on head. Gold halo above head. 4 poses: 1) Default: serene smug smile, arms full of trophies, halo glowing, benevolent gaze 2) Pitying others: head tilted, soft sad smile, one hand extended offering help he wasn't asked for 3) Ghost silhouette: same character but outlined in gold only, partially transparent, arms crossed, used as background element for shame 4) Silhouette arms-crossed: dark purple silhouette only, judging. Bold outlines, flat cel shading, NOT anime. White background.
```

**IT Uncle — All 5 poses:**
```
Generate 5 versions of cartoon character. Character: 37-year-old Indian male corporate IT worker "The IT Uncle". Dad bod with confidence. Thinning oiled black hair combed sideways with comb marks. Small neat moustache. Light blue formal shirt tucked high into dark grey trousers. 4 pens in shirt pocket. Company ID card on lanyard. Worn laptop bag. Always holding chipped cream mug "WORLD'S BEST EMPLOYEE" in red letters. Warm brown skin #B5651D. 5 poses: 1) Default: half-confused half-knowing expression, mug in hand, slight nod 2) Confident: mug raised like toast, knowing nod, "I knew it" energy 3) Relieved: small coffee spill on shirt, horrified but still holding mug 4) Embarrassed: laptop open showing 47 browser tabs, mug empty, face of pure horror 5) Dead: complete office chaos around him, laptop exploded, mug shattered, ID says FIRED, X eyes, sitting in keyboard pile. Bold outlines, flat cel shading, NOT anime. White background.
```

### Hospital Corridor Background:
*(Prompt from Section 6 — copy from there)*

### Verdict Card Elements:
```
Generate a set of small decorative graphic elements for a dark game UI on transparent backgrounds: 1) A set of 8 small geometric 4-point star diamond shapes in gold #FFD700 for JUGAAD confetti scattered positions 2) A set of 5 small orange "X" marks in a hand-drawn style for BARBAD verdict corners 3) A single large cartoon blue sweat drop, expressive, bold outline 4) A small cartoon gravestone (simple, rounded top, no text) in dark grey with purple glow 5) A cartoon lightbulb with sparklines in yellow, bold outline, flat colors. All on transparent backgrounds. Flat illustration style, bold outlines.
```

---

## SECTION 13 — DO'S AND DON'TS

### DO
- ✅ Keep the background near-black on every game screen
- ✅ Use verdict colors ONLY during verdict reveals — they must feel like an explosion
- ✅ Give every UI element a personality — no generic placeholder icons
- ✅ Keep character illustrations large enough to read expression on a phone screen
- ✅ Test every screen on an actual Android phone (your primary user's device)
- ✅ The DM Serif Display Italic voice for AI text must be visually distinct from UI text
- ✅ Add loading states to every AI call — never a blank screen
- ✅ The EKG line is the heartbeat of the game — it must always feel alive

### DON'T
- ❌ Don't use more than 2 colors simultaneously on any non-verdict screen
- ❌ Don't animate everything — animation is reserved for 5 key moments (Section 9)
- ❌ Don't put red on red (red text on red background anywhere)
- ❌ Don't use rangoli patterns as decorative borders — it reads as costume, not culture
- ❌ Don't make the font size smaller than 16px in the textarea on mobile — keyboard experience must be good
- ❌ Don't use stock Indian icons (taj mahal, elephant etc.) — the Indianness comes from the writing and characters, not tourist imagery
- ❌ Don't let the Sharma Ji Ka Beta character look mean — he's insufferable but loveable
- ❌ Don't forget dark mode is the ONLY mode — there is no light mode

---

*This document covers every visual decision for Flatline v1. When in doubt, ask: "Does this feel like it belongs in an ICU monitor that a cartoon just walked into?" If yes — ship it.*
