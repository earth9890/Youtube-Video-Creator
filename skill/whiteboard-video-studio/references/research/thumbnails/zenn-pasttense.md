# Thumbnail study: Zenn (Zenn0009) + Past Tense (PastTense01)

Data: all 66 current thumbnails were viewed: 38 from Zenn and 28 from Past Tense. That is the 48 sheet tiles (labelled in `data/thumb-labels-zenn-pasttense.json`) plus the 23 uploads that appear on no sheet, viewed as contact sheets. Perf = views ÷ median of the 7 uploads either side. Sheet tile numbers are written `Z#n` and `P#n`.

## Read this first: how noisy the perf numbers are

- **Past Tense** (median 5.5K views per upload) runs **viral-or-nothing**. Six uploads got 112K–1.2M views, two got 21–26K, and the other 20 sit at 1.9K–17K. A x218 score just means 1.2M views against a 5.5K neighbourhood. **Only the six videos above 100K (x21–x218) are real signal.** Everything between x0.4 and x1.4 is ±3K views, which is noise. The PT "bottom 6" (#13–18, 1.9K–5K views) are barely below the median. Treat them as "didn't catch" rather than as proven flops.
- **Zenn** (median 31K) had a viral run around uploads 27–37: Calhoun 5M, 2 SLEEPS 8M, Baby 1.8M, Rotten Meat 894K, Aliens 829K, Titanic 728K, 0:00 583K. That run inflates the neighbour medians, so three of the bottom six score x0.10–0.23 even though they got 52K–150K views: Z#13 Pratfall, Z#14 Dumber, Z#15 Spotlight. That is 2–7× the channel's recent baseline (**21.5K**, the median of uploads 7–26). The comparison still holds *within* that run, because those three were picked up by the same algorithm push as their neighbours and got 5–150× fewer views. But "x0.1" there does not mean the thumbnail is dead on arrival.
- Both channels A/B-test thumbnails, so what you see is the surviving version. Many recent tiles look AI-painted, with texture and soft shading. Learn the **structure** from them, not the rendering.

## Corrections to doctrine §0 (archetypes A–E)

| §0 claim | What the perf data says |
|---|---|
| D "90% RIGHT / 10% LEFT" is a hit (35K) | **x0.58, Zenn bottom-6** (Z#17). Across both channels, D tiles score x0.58, x1.41 (P#9) and ~1.2× baseline (P#19). **D is average at best.** |
| B hits include "0:00" 584K | **x0.75.** It rode the viral run. B's real record is Calhoun x42.2, Slotow x17.5, Bliss x2.0, Marshmallow x0.88, 0:00 x0.75: **3/5 ≥ x2, 2/5 below par.** B has the **highest ceiling and is a coin flip.** |
| A hits include "RAISE IT?" 726K, "DEAD IN SECONDS" 43K | x1.25 and x1.0, both par. A's real role is to raise the **floor**. All 12 scored Zenn A tiles land at **≥ x0.74** (median ≈ x1.4), and 5/12 reach ≥ x1.9. No A tile is in the bottom six. |
| C (big face + oddity + arrow) is one of five equal options | **C is Past Tense's whole hit engine.** 4 of the 6 PT videos above 100K are C (P#2 x183, P#4 x53, P#5 x47, P#6 x21). Only 1 of those 4 uses an arrow, so **the arrow is optional**. |
| Text is "never the title" | **True for Zenn, false for Past Tense.** Zenn's text repeats the title on 1/12 top tiles and 3/6 bottom tiles. Past Tense's does on **8/12 top** tiles and 1/6 bottom tiles (Rarest Human, RAREST HUMAN TRAITS, THE RAREST DISEASES). The rule is: **a label is harmless when the picture holds the oddity, and fatal when the picture is literal** (see Rule 3). |
| Text outline 12–16 % of the letter size | Measured on Z#3 and P#2 at 1280 px: about 8–9 px of black outline per side on caps about 130 px tall. That is **≈ 6.5 % of cap height per side (≈ 13 % for both sides together)**, or ≈ 0.37× the width of the yellow stroke. If `haloW` means the total, 0.13–0.14 is right. If it means per side, halve it. |
| Busy panoramas flop | Confirmed, with a number. Z#19 "ALL YEAR?" belongs to the Ancient Humans series that produced 8M, 894K and 446K. It has the channel's **highest clutter (edges 0.42, channel median 0.19)** and got 16K, ≈ 0.75× the recent baseline. P#11 (8 elements) is the busiest PT tile and only reaches x1.2. |
| (new) | **A named-phenomenon title + a non-literal picture** is Zenn's biggest outlier pattern. See Rule 1. |
| (new) | **One calm body oddity beats gore.** See Rule 5. |

## Channel style fingerprint

### Zenn
- **Palette.** Pure **yellow #FEFE05** (text, eye, spotlight). **Black #000000** (B fields). A light sky or room in **#74C8ED / #BBCFEB**, **grass #6ABB5C**, **cave brown #6C5D4C / #2C2720**, **night navy #202C36 / #014892**, and **one red accent #C70707–#F00404** (scribble, dot, arrow). Mid-grey **#464646** appears on the Slotow tile. Channel medians: lum 0.574, sat 0.311, colourfulness 30.7.
- **Background.** Three modes:
  1. A flat black or grey field with nothing else (B).
  2. A painted full-bleed scene: cave, savanna, crib room, anechoic tunnel.
  3. The **old** white page with a grey floor line (Z#13, Z#15, Z#17). This is the flop mode.
- **Character.** A white round stick head with a thick black outline, a single-line body, and big round eyes with small pupils pushed to one side. The mouth is a short wavy line, and the expression is **uneasy, deadpan, or cringing with a sweat drop**. The figure never grins. When it is a "character" rather than "you", it gets messy brown hair and a fur tunic (cavemen), an afro (Z#5) or a Viking helmet. The head is 35–60 % of frame height in full-figure shots and up to 85 % in head-only crops (Z#5).
- **Text.** Rounded, chunky, all-caps sans in yellow #FEFE05 with an even black outline (≈ 6.5 % of cap height per side) and no shadow. **0–3 words; median 2.** It fills a **top band 80–100 % wide**, with caps about 19 % of frame height (`text_h` median 0.24 including outline). When the head fills the left, the text sits top-right (Z#5 "NO JOB"). Text is present on 79 % of thumbnails, and 3 of the top 4 thumbnails have **no text at all**.
- **Grid.** The text band covers the top 22 %. The figure is on the left third or centred, and the object is in the right half (Z#3, #6, #23, "RAISE IT?"). B tiles put one symbol dead centre at ≤ 45 % of the width.
- **Evolution.** The oldest uploads (ranks 30–38) are white-page title cards ("THE X EFFECT", "IS THIS YOU?"), mixed with stark black symbols. The viral run (27–37) brought coloured scenes with a yellow question. The recent uploads (1–26) keep the same A formula with more painterly scenes. They also try a realistic haggard face (Z#4 Minnesota x7.4), more busy panoramas (Z#19) and a text-only card (Z#21 "THE EVIL PLACEBO", 14K ≈ 0.65× baseline).

### Past Tense
- **Palette.** **Golden yellow #F5D50F** text (warmer than Zenn's, never #FEFE05). Warm flat backgrounds: **orange #FCA55D**, **mint #B2D3BE**, **sky #D9E6F4**, **sand #F3BE67**, **cave taupe #6A5849**, **slate #566785**. Skin is cream to peach (#F7BC90). The only accent is the yellow arrow (#F8D60C), and red is rare. Channel medians: lum 0.548, sat 0.371, colourfulness 27.1.
- **Background.** Always a painted scene with soft depth: village huts, a cave mouth framing savanna, a hospital, a blurred world map. It is never black or white. The older uploads are 4:3 letterboxed with black bars (P#1, P#14).
- **Character.** Not stick figures. Round-faced cartoon people with real hair, beards, skin texture and leopard-print tunics. In the hits the **face is centred, cropped at the chest, 70–85 % of frame height, and looking straight at the viewer** with a calm, sad or deadpan expression. The oddity is *on the body*: two eye colours, albino skin, a tumour, cracked skin.
- **Text.** **Mixed-case comic-hand font** (Comic-Sans-like) in #F5D50F with a black outline of ≈ 5 % of cap height per side and a faint darker inner edge. It appears on 100 % of thumbnails, at **2–5 words (median 3)**, in a **top band** on 19 of 21 sheet tiles, with caps about 13–17 % of frame height (`text_h` median 0.19). The text is often the topic label rather than a question.
- **Grid.** Text across the top 20 %, the face in the centre column (x 30–70 %), and the scene peeking out on both sides.
- **Evolution.** First came letterboxed scenes and hand-lettered black-on-cream cards (P#18, the Appendix tile P#10). Then the big-face-plus-golden-text formula, which produced every hit. The latest uploads are animal-only (P#19–21) and more detailed.

## Top vs bottom

Counts are from the 24 top tiles and 12 bottom tiles, with the extra unsheeted uploads where noted.

| Feature | Zenn top 12 | Zenn bottom 6 | PT top 12 | PT bottom 6 |
|---|---|---|---|---|
| Obvious in one look (glance 2) | **11/12** | **1/6** | **11/12** | **1/6** |
| Plain white page | 2/12 (#4, #10) | **5/6** | 0 | 0 |
| Text repeats the title | 1/12 | 3/6 | 8/12 | 1/6 |
| Text is a bare topic label ("THE X EFFECT") | 0/12 | 2/6 | 5/12 | 0/6 |
| Photo or photoreal | 1/12 (#11) | 1/6 (#18) | 0 | 0 |
| Face ≥ 70 % of height looking at the viewer | 0 | 0 | **6/12** | 2/6 (both gore or skeleton) |
| Skeleton / "Death" imagery | 0 | 0 | 1/12 (#11, x1.2) | **3/6** (#16, #17, #18) |
| Median elements | 3 | 3 | 3 | **5** |

Pixel metrics, top quartile vs bottom quartile (`metrics.tsv`, scored uploads only):
- **Zenn (n = 8 each):** lum **0.46 vs 0.75**, white share **0.15 vs 0.62**, text area **0.07 vs 0.19**, sat 0.22 vs 0.13. The flop is a bright white page with large text on it.
- **Past Tense (n = 6 each):** colourfulness **31.4 vs 24.0**, sat **0.36 vs 0.26**, lum 0.69 vs 0.55 (*brighter* wins). Edges are the same (0.24 vs 0.25).

Darkness itself is not the lever. What both channels have in common is **saturated colour fields and no blank white page**.

What the outliers share and the flops lack:
1. **One thing is wrong, and you see it in 0.3 s.** That is 22 of 24 top tiles against 2 of 12 bottom tiles. The flops either show the title literally (a man slipping on a banana for "Pratfall", a man in a spotlight for "Spotlight", a dog for "Why are dogs tame") or have no single focus (five Vikings in a row, a skeleton with a mushroom cloud and "Death" tape, a gore patchwork).
2. **A human is at the centre of the strangeness**, either staring at it (Zenn) or wearing it (PT). On Zenn, the no-human, non-symbol tiles are the orange blob x0.10, the dog x0.52, the photo eyes x0.71, the old photo x0.8 and the giraffe on wheels x0.9: 0/5 above par. The only no-human tile above par is the photoreal coin (x1.48). PT's crow, P#3 x73, is the exception. There the *object* is the wrongness (a wild bird over a heap of junk food).
3. **The mood is unease, not horror.** Zenn's faces are uneasy, deadpan or scared in 7 of the 8 top tiles that have a figure. PT's hits are calm or sad faces carrying one oddity. Gore and screaming crowds (P#16, "BLOOD MOON" x0.74) and skeletons (P#17, P#18) all sit at or below x0.74.

## Curiosity mechanics (top tiles)

| Tile | Question it plants | Pairs with the title | Wrongness trigger |
|---|---|---|---|
| Z#1 yellow eye on black | Who is watching? | "The Calhoun Effect" names nothing, so it's a double mystery | Forbidden, unknown |
| Z#2 hand + red scribble | What is that tangle? Why reach for it? | "The Slotow Effect" | Thing in the wrong place |
| Z#3 "2 SLEEPS?" | They slept twice? | "…Do at Night?" | Weird number |
| Z#4 tape-measured bowl | Why measure a bowl like a waist? | "The Minnesota Effect" | Thing in the wrong place |
| Z#5 "NO JOB" | They never worked? | "…Do All Day?" | A forbidden ease (envy) |
| Z#6 "ROTTEN MEAT?" | They ate *that*? | "…Actually Eat?" | Forbidden object |
| Z#7 "WHO ARE YOU?" + pacifier | Talking to his baby self? | "Why You Can't Remember Being a Baby" | Identity loss |
| Z#8 red dot on curve | What's at the peak? | "The Bliss Point" | Abstract mystery |
| Z#9 "NO CRYING?" + empty cribs | Babies who stop crying? | "What If Nobody Held You…" | Danger, quiet dread |
| Z#10 human in the animal line-up | Is the human the odd one? | Repeats the title, still x1.9 | Odd one out |
| Z#12 saw over a strapped patient | How did it feel? | "…Before Anesthesia?" | Danger about to happen |
| P#2 two-coloured eyes | What's different about her? | Label "Rarest Human" | Body oddity |
| P#3 crow over junk food | Would a crow like fries? | "Does Human Food Taste Good to Animals?" | Thing in the wrong place |
| P#4 tumour + arrow | Is he dying? | "Did Ancient Humans get Cancer?" | Body oddity + danger |
| P#5 albino child | What's with his skin and eyes? | Label | Body oddity |
| P#8 giant spider vs caveman | How big was it? | "Arachnophobia" label | Impossible scale |

The pattern: **on Zenn the title asks and the thumbnail shows a surprising answer** ("2 SLEEPS?", "ROTTEN MEAT?"). For "Effect" titles both are opaque, and the mystery stacks. **On PT the thumbnail shows a person you can't stop looking at**, and the text just names the category.

## Space / science topics: how they draw "huge", "dark", "infinite", "inside"

Neither channel does astronomy, but they solve the same drawing problems:
- **Dark / unknown.** A black #000 field with **one** saturated mark at ≤ 45 % of the width: Z#1 (the yellow eye), Z#8 (a white curve and a red dot). "0:00" on black is the same idea but too literal (x0.75). Z#21's maroon text card failed.
- **Huge.** A giant thing **cropped by the frame edge** beside a small human:
  - P#8: the spider fills the left 60 % and the caveman is ~40 % of height (x3.8).
  - "RAISE IT?": a rusting Titanic across the right 60 % and a figure on the left (x1.25).
  - P#19: an ant vs an elephant split by a lightning bolt (~1.2× baseline).
  The cropping does the work: nothing huge is ever shown whole.
- **Infinite / beyond.** "What does dying feel like" (x0.97) puts a head in front of a **cracked-open nebula** (a halo of orange and violet). Z#20 "GO CRAZY?" (28K ≈ 1.3× baseline) uses a **perspective tunnel of blue spikes converging to a black square** behind the figure. The tunnel reads at 160 px. The nebula is busier.
- **Inside something.** The body is shown as **one x-ray window** cut into a plain figure with the organ in saturated orange-pink (P#10, x1.2). For "inside a place", the figure stands *in* the tunnel (Z#20), not outside it.
- **Body oddities.** A single anomaly on a calm face, at the centre of the frame (P#2, #4, #5, #6).

## Rules

1. **Named-phenomenon titles ("The ___ Effect", "The Bliss Point") get a non-literal symbol and no title words.** Zenn: Calhoun x42.2, Slotow x17.5, Minnesota x7.4 and Bliss x2.0 all have no title words (4 of the 5 such tiles ≥ x2). The fifth, Marshmallow (x0.88), drew the literal namesake. The tiles that spelled out the name are Pratfall x0.10, Spotlight x0.23 and Nocebo ≈ 0.65× baseline (0 of 3 at par).
   *Build it:* a black or #464646 field with one white or yellow shape and at most one red mark.
2. **Use A (figure + strange object + 1–3-word question) as the default: it raises the floor.** All 12 scored Zenn A tiles are ≥ x0.74, with median ≈ x1.4 and 5/12 ≥ x1.9. Zenn's three biggest scene hits are A (Z#3 x12.2, Z#4 x7.4, Z#6 x3.0).
3. **The text adds a new question or a shocking fragment. If you must label, the picture has to hold the oddity.** On Zenn, title-repeat text appears on 1/12 top tiles and 3/6 bottom tiles. On PT, labels sit on 5/12 top tiles. The three label tiles above x20 (#2, #5, #6) all carry a body-oddity face. The two without one score x3.8 (giant spider) and x1.2 (busy Chernobyl).
4. **For body or "rare human" topics, use C: one face, centred, 70–85 % of frame height, eyes on the viewer, calm expression, ONE oddity.** This covers 4 of the 6 PT videos above 100K (x21–x183). The arrow is optional (1 of 4).
5. **One oddity, never a patchwork of gore.** PT's single calm oddity scored 4/4 hits (x21–x183). The multi-oddity or gore faces scored 0/2: Worse than Death x0.53 and Ancient Zombie x0.92. Skeletons and the word "Death" score 0/5 above x1.2.
6. **No blank white page.** Zenn: white backgrounds are 5/6 of the bottom tiles and 2/12 of the top tiles. Top-quartile white share is 0.15 against 0.62 in the bottom quartile.
   *Build it:* two or three flat saturated fields: sky #74C8ED, grass #6ABB5C, cave #6C5D4C, navy #202C36, orange #FCA55D, mint #B2D3BE.
7. **Three elements maximum, and one focal point.** Top tiles have a median of 3 elements. PT's bottom tiles have a median of 5. Z#19 (edges 0.42, 9 elements) underperformed inside a series that hit 8M.
8. **The figure is uneasy, deadpan or cringing, and never grins.** That is 7 of the 8 Zenn top tiles with a figure. The only smug face is Z#5, where envy is the hook.
9. **On PT the face looks at the viewer. On Zenn the eyes go to the object, or sideways in fear.** PT's hits look at the viewer in 5/6. Zenn's top tiles split 4 object or viewer (#4, #6, #7, #10) against 4 sideways (#3, #5, #9, #12). So eye contact matters for C, while for A the object carries the tile.
10. **Draw "huge" by cropping.** The giant thing bleeds off one edge and fills ≥ 55 % of the width. The figure stands at the other edge at 35–45 % of height (P#8 x3.8, "RAISE IT?" x1.25).
11. **Text sits in a top band, 1–3 words, caps ≥ 18 % of frame height**, in yellow #FEFE05 (Zenn) or #F5D50F (PT) with a black outline ≈ 6.5 % of cap height per side. That covers 19/21 PT tiles and 5/9 texted Zenn top tiles. The rest sit top-right or at the bottom when the figure needs the top. Keep the text out of the bottom-right 300×90 (the duration badge).
12. **No photos or photoreal textures.** Those tiles score 0/3 ≥ x1.9 on Zenn: photo eyes x0.71, old photo x0.80, gold coin x1.48. Our engine never uses them anyway; this is evidence that we lose nothing.
13. **Make two variants per video: A (or C for body topics) plus B.** A gives the floor and B gives the lottery ticket (3/5 of B tiles ≥ x2, 2/5 below par). D and E are optional third tests (D's best is x1.4; E's best is x1.9).

## Recipes (1920×1080)

### R1: "the symbol in the dark" (B), derived from Z#8 (Bliss Point x2.0) and Z#1
Topic example: *The Spaghettification Effect* or *What's at the Bottom of a Black Hole?*
- Background: black **#000000**, full canvas. No text.
- Symbol: a **white #F8F8F8 grid of 7 horizontal lines** (stroke 10 px, x 260–1660, y 380–700) that dips into a funnel at centre (960, 760). The lines bend downward, steeper towards the middle, so it reads as a bent sheet.
- Accent: one **red #F00404 dot**, Ø 70 px, sitting on the lip of the funnel at (1180, 520). A **red arrow** (stroke 16 px, hand-drawn, head 60 px) comes down from (1180, 300) and stops 30 px above the dot.
- Nothing else: elements = 3. The symbol spans ≤ 75 % of the width, with ≥ 60 px clear margin all round.
- Title: put the opaque name in the title. The image never names it.

### R2: "figure + strange object + question" (A), derived from Z#3 (x12.2) and Z#6 (x3.0)
Topic example: *What Happens If You Fall Into a Black Hole?*
- Background: three flat fields. Night sky **#1F2A55** from y 0 to 760, a far-galaxy dot field (12 white dots Ø 6–10 px, scattered, upper-left only), and a floor of rock **#6B5844** from y 760 to 1080.
- Strange object: a **black #000000 disc Ø 620 px centred at (1460, 470)** with an **orange #F2A03D ring** (ellipse 900×200, stroke 34 px, tilted −12°) crossing it. The ring's front half is drawn over the disc. The disc bleeds off the right edge by ~30 px.
- Character: a stick figure at (520, 640), with a head Ø 260 px (≈ 45 % of height counting the body). Its **legs stretch 3× normal length in two thin wavy lines towards the disc**, ending at (1150, 560). Face: **worried**. Pupils pushed right, towards the disc, one flat raised brow line, a short wavy mouth, and a sweat drop at the upper-left of the head.
- Text: **"SPAGHETTI?"** in yellow **#FEFE05**, rounded marker caps 230 px tall, black outline 15 px per side, centred at (960, 150) and ≤ 1500 px wide.
- Keep x ≥ 1620, y ≥ 990 empty (the duration badge). Elements: text, figure, disc + ring = 3.

### R3: "one face, one oddity" (C), derived from P#4 (x53) and P#2 (x183)
Topic example: *Why Your Eye Has a Blind Spot* or *What Space Does to Your Eyes*
- Background: flat **orange #FCA55D**, with a low horizon of sand **#E89F5B** from y 820 to 1080 and two small flat-green bushes at x 160 and 1760.
- Character: a big white round head **Ø 640 px centred at (960, 620)**, about 60 % of height, cropped at the shoulders by the bottom edge. Black outline 14 px. Gaze **straight at the viewer**. Calm and slightly sad: brows level, mouth a short flat line.
- One oddity: the **left pupil (viewer's right) is a tiny black hole**, a black disc Ø 70 px with a 10 px **orange #F2A03D ring**. The other pupil is normal (Ø 40 px black). Nothing else is wrong.
- Arrow: a **yellow #F8D60C block arrow** with a 10 px black outline, 260×110 px, at (1330, 520), pointing left at the odd eye.
- Text: **"WRONG EYE?"** in the PT treatment, golden **#F5D50F** mixed-case hand-marker at 170 px with an 11 px black outline per side, centred at (960, 120) across ≤ 80 % of the width. You may use a plain label instead ("Blind Spot"), because the face carries the oddity (Rule 3).
- Elements: text, face, arrow = 3. Check at 320×180 that the odd eye still reads. If it doesn't, enlarge the ring before anything else.

## Don'ts (what the flops do)

- **Spelling the title as a label on a white page** with a literal illustration of it: Z#13 Pratfall x0.10, Z#15 Spotlight x0.23.
- **A creature or animal with no human and no wrongness**: Z#14 orange blob x0.10, Z#16 dog face x0.52.
- **Photos and photoreal close-ups**: Z#18 eye strips x0.71, the old portrait x0.8.
- **Split screens of two numbers** that the title already states: Z#17 90%/10% x0.58.
- **Busy panoramas with no single focal point**: Z#19 ALL YEAR (edges 0.42), P#14 Vikings x0.36, P#11 Chernobyl x1.2.
- **Gore, a mix of several oddities, or skeletons and "Death" words**: P#16 x0.53, P#17 x0.57, P#18 x0.64, "BLOOD MOON" x0.74.
- **A figure with its back turned** so the face is hidden: P#13 Everest x0.36.
- **A good A with a boring answer**: P#15 "SPOILED FOOD?" with cheese (x0.42). The format was right, but everyone already knows cheese is aged. The object has to be surprising *to the viewer*, not just to a caveman.
- **Text-only cards**: Z#21 "THE EVIL PLACEBO", ≈ 0.65× baseline.
