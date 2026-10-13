# Space group: Kurzgesagt + Sciencephile the AI

Sources: the 48 sheet tiles (24 per channel; Kurzgesagt #6 and #22 are the same video), plus every black-hole and space title in both full catalogs (`lists/*.txt`, 20 black-hole thumbnails opened at full size). Labels are in `data/thumb-labels-space.json`. Perf = views ÷ median of the 7 uploads on either side.

**Headline numbers**
- Space titles beat everything else on both channels. The median perf of space titles is **x1.15** on both channels (Kurzgesagt n=71, Sciencephile n=60). Non-space titles sit at **x0.91 / x0.90**.
- Black-hole titles do best of all: **x1.48** on Kurzgesagt (n=12) and **x1.60** on Sciencephile (n=8).
- **0 of 12** bottom tiles are about space. **8 of 12** bottom tiles are channel-meta posts: a trailer, a book, a journal, "the sauce", a 2016 story, a Patreon post, a 1M-subscriber special, and "the moment kurzgesagt changed".
- **Every bottom tile (12/12) shows a character.** Only **8/24** top tiles do, and none of those is a human presenter or mascot.

---

## 1. Channel style fingerprint

### Kurzgesagt (251 uploads)
- **Pixel medians:** lum 0.315, sat **0.753** (highest of the 8 channels), colorful 43.6 (highest), edges **0.156** (cleanest), black share 0.249, words 2, text on 92 %.
- **Palette:**
  - Background: near-black indigo **#03012B / #0D012C / #121236**.
  - Mid tones: violet **#3A2EBD**, plum **#5C024F**.
  - Hot accents: magenta **#F93684 / #BF1BBE**, red **#D93A45**, amber **#F4BC22**, cyan **#30B0E9**.
  - Text: white **#FFFFFF**.
- **Background:** a dark "scene" with specks of stars and soft radial glows behind the subject. Flat vector shapes with neon rims, no photos.
- **Characters:** round blob creatures with huge circular eyes (white sclera, a coloured iris and a white specular dot), the dark duck/bird mascot, and faces put on objects (the virus mask #1, the black hole #7, the skull #3). There is **no human figure** in any of the 12 top tiles.
- **Text:**
  - A geometric heavy sans in white with **no outline**, at most a faint dark shadow.
  - All caps, one line, centred in a **top band** (text_top ≈ 0.03, so it starts about 30 px from the top). The line fills 85–95 % of the width.
  - Letter height is **16–17 % of the frame**: the median text_h of the top tiles is 0.167, about 175 px at 1080.
  - Only one tile breaks this: #10 STRING THEORY is a 2-line centred block at 22 %.
- **Grid:** text band on top, one subject centred in the lower 75 %, black or near-black around it.
- **Evolution:**
  - 2013–16: letterboxed 4:3 with plain flat shapes (#4 FERMI PARADOX; THE BIG BANG x2.14).
  - 2017–23: the classic neon symbol under a white topic noun (#7, #9, #11).
  - 2024–25 (latest): painterly and textured (#19, #20). The label became an emotional fragment ("LOST FOREVER", "WE LOST CONTROL", "IT'S IMPOSSIBLE*"), and red arrows appear more often (3/6 latest vs 2/12 top).
  - Title relation flipped from "repeat the noun" (8/12 top) to "add the stakes" (6/6 latest).

### Sciencephile the AI (154 uploads)
- **Pixel medians:** lum 0.293, sat 0.425, colorful 25.9, edges 0.167, black share 0.275, words 3, text on 86 %.
- **Palette:**
  - Photographic space: black **#000000–#121212**, nebula violet **#5B5A9A / #9C96D0**, ocean blue **#1E6B9A / #37A8D6**.
  - Accents: caption yellow **#F5C518 / #FFE600**, alarm red **#E01E1E**, neon green **#39E639**.
- **Background:** photo or AI-art composites (NASA-style renders, city skylines, icebergs). Of the 24 sheet tiles, 10 are photo, 8 black, 5 scene and 1 white. The minimal ones are #2 (white) and #7/#9 (pure black).
- **Characters:** a blue circuit-brain mascot with "0 0" eyes, plus stock photos (Bad Luck Brian #4, Terminator #12/#17, a grey alien #10).
- **Text:**
  - Condensed bold sans (Bebas/Oswald feel), white with a black outline or drop shadow, usually with one accent word in yellow or red ("LIFE **HERE?**", "SPEED HAS A **PRICE**").
  - Two caption-strip tiles (#1, #6) put a 6-word question on a navy or white bar across the lower middle.
  - Letter height is 10–20 %.
- **Formats that won:**
  - "What if we replace the Sun/Moon" triptych: #1 x12.4, #6 x4.2.
  - Iceberg: #5, #8, #11, x3.2–4.3.
  - Tier list: #10, #12, x3.0–3.3.
  - Lone object on a plain field: #2 x9.5, #7 x3.7, #9 x3.4.
- **Evolution:** the latest tiles are AI art with red curved arrows (3/6 latest vs 0/12 top) and a 2–4 word white fragment with one coloured word. Views have fallen to 154–468 K, against 1–7 M for the top tiles.

---

## 2. Top vs bottom

| | Kurzgesagt top 12 | Kurzgesagt bottom 6 | Sciencephile top 12 | Sciencephile bottom 6 |
|---|---|---|---|---|
| Subject is space or the body | **12/12** (space 8, body 4) | 0/6 | **11/12** (space/physics 9, existential 2) | 0/6 |
| Channel meta (book, trailer, milestone) | 0 | 4/6 (#13, #14, #15, #17) | 0 | 4/6 (#13, #16, #17, #18) |
| Character present | 4/12, all faces on objects or creatures | **6/6** | 4/12 | **6/6** |
| Mascot visible | 0/12 | **5/6** (bird #13–#17) | 0/12 unmodified (#9 is the brain mutated to 3 eyes) | **4/6** (#13, #14, #16, #17) |
| ≤ 3 elements | 10/12 | 4/6 | 5/12 (formats carry the rest) | 5/6 |
| Text of 1–3 words | 10/12 | 2/6 | 5/12 | 2/6 |
| Readable at 160 px in one look (glance 2) | **11/12** | **0/6** | 5/12 | **0/6** |
| Dark frame (lum < 0.40) | 11/12 (only #2 is light) | 4/6 (#13, #15 are bright lime/cyan) | 9/12 | 6/6 |

**What the tops share and the flops lack**
1. **A topic, not the channel.** Every flop in both channels is about the channel itself (#13 journal, #15 book, Sciencephile #13 trailer, #18 1M special) or is vague (#16 THE CHOSEN ONE, #18 IS THE EU BAD?).
2. **The subject is the hero, not a presenter.** Every flop has a character on screen, mostly the mascot. In the tops, the "character" is the thing itself given a face: virus-mask eyes (#1), grinning bacteria (#2), a black hole that eats planets (#7), a 3-eyed AI brain (Sciencephile #9).
3. **One-look legibility.** Kurzgesagt tops are 11/12 glance-2; all 12 flops in both channels are glance ≤ 1. Flops #13 and #15 also have the most words: 6 and 17.
4. **Pixel stats barely move inside Kurzgesagt.** The top-quartile vs bottom-quartile deltas are tiny: sat +0.006, lum −0.000, edges −0.011. Kurzgesagt never changes style, so its wins come from **subject and hook**. Sciencephile is different: its top quartile has **+13.8 pts more black**, **2 fewer words**, smaller text (−0.046 text_h) and less clutter (−0.030 edges).

---

## 3. Curiosity mechanics (top tiles)

| Tile | Perf | Question planted in 0.3 s | Text vs title | Wrongness trigger |
|---|---|---|---|---|
| Sciencephile #1 | x12.4 | "A black hole over my city?" | repeat (caption = title) | thing in the wrong place, impossible scale |
| Sciencephile #2 | x9.5 | "What is that shape?" | repeat | an unknown object on blank white |
| Kurzgesagt #1 | x7.4 | "What's coming for me?" | repeat | danger about to happen (eyes over a virus swarm) |
| Kurzgesagt #2 | x6.5 | "What are those things doing to my cut?" | repeat | danger, monsters on a body part |
| Sciencephile #3 | x6.1 | "All of physics in 6 minutes?" | repeat | a weird number |
| Sciencephile #4 | x4.4 | "The odds of what?" | complement | a weird number (0.00000000000009 %) |
| Kurzgesagt #3 | x4.2 | "How does the universe die?" | complement (no text) | a death symbol over the cosmos |
| Kurzgesagt #5 | x3.2 | "That speck is our Sun?!" | complement | impossible scale (arrow to a dot) |
| Kurzgesagt #6 | x3.0 | "They injected a virus on purpose?" | complement | forbidden object |
| Kurzgesagt #7 | x2.9 | "Is it eating everything?" | complement | danger (the black hole has a mouth) |
| Sciencephile #7 | x3.7 | "Where am I?" | complement (no text; the title says "INSIDE") | inside-out view, black fills 55 % |
| Sciencephile #9 | x3.4 | "Why does it have three eyes?" | complement | wrong count on a familiar face |
| Kurzgesagt #8 | x2.6 | "Why is Earth the only one alive?" | repeat | odd one out |
| Kurzgesagt #12 | x2.4 | "What happens to the ocean?" | repeat | thing in the wrong place (a nuke under the sea) |
| Sciencephile #5, #8, #11 | x3.2–4.3 | "What's at the bottom?" | repeat | hidden-depth format |
| Sciencephile #10, #12 | x3.0–3.3 | "What's in S tier?" (a "?" sits in S) | repeat | a ranked secret |

**Title relation:** 17/24 tops **repeat** the topic noun ("BLACK HOLES", "STRING THEORY"). In this niche the noun itself is the hook, so the label works as a brand and the picture carries the question. The newer complement style (latest 12/12) has not proven itself yet: the scored latest tiles are Kurzgesagt x3.0 (shared with the top sheet), x1.4, x0.4 and Sciencephile x2.1, x1.0, x0.7. Rule of thumb: if the title is a noun, the label can be that noun; if the title is a "what if" sentence, the thumbnail adds the stakes in 2–3 words.

---

## 4. Space and science topics specifically

### Every black-hole thumbnail in both catalogs (20), grouped by how the black hole is drawn

| How it's drawn | Tiles (perf) | Median |
|---|---|---|
| **Icon:** black disc + neon ring, centred, label above | Kurzgesagt BLACK HOLES e-P5IFTqB98 **x2.52**, BLACK HOLE BOMB ulCdoCfw-bY **x2.00**, MINI BLACK HOLE 8nHBGFKLHZQ x1.46 (plain black ball with a white highlight on flat violet), NUKE IT! cFslUSyfZPc x1.44 (rocket + red arrow), GRAVASTARS BmUZ2wp1lM8 x1.14; Sciencephile White Holes EbiU-D_JyVU x1.86 (colour-inverted: white disc in a purple disc) | **x1.66** (n=6) |
| **Too big for the frame:** curved limb or edge cropped by the frame, tiny reference | Sciencephile INSIDE ie76KXKm9Y4 **x3.66**, Sciencephile edge + speck planet _c7v5-pxxxE x1.75, Kurzgesagt BLACK HOLE → SOLAR SYSTEM 0FH9cgRhQ-k x1.88, Kurzgesagt BLACK HOLE STAR → LARGEST STAR aeWyp2vXxqA x1.50, Sciencephile TON-618 ol9GgJtNc3k x1.46 (text inside the black disc), Sciencephile BIGGER THAN ULTRAMASSIVE 3PSCN_ghHiU x1.04, Sciencephile LIFE HERE? 9t2W1tsTi8c x0.66 | **x1.50** (n=7) |
| **Black hole with a face** | Kurzgesagt BLACK HOLES II yWO-cvGETRQ **x2.91** (eyes + mouth slurping planets), Sciencephile Naked Singularities oSwg2Ct7xvM x1.23 (blushing), Kurzgesagt GALAXY KILLER V4Z8EdiJxgk x1.15 (quasar as a toothed eye) | x1.23 (n=3) |
| **Text twist** | Sciencephile ~~Black holes~~ ~~White holes~~ Gray holes? nyoVUHzZQ0k **x2.79** | (n=1) |
| **Tunnel** | Kurzgesagt WORMHOLES 9P6rdqiybaw x1.79 (two neon rings joined by a ribbed tube on a synthwave grid) | (n=1) |
| **Small human/target circled + arrow** | Kurzgesagt BLACK HOLES (astronaut in a red circle, arrow to the disc) QqsLTNkzvaY **x0.95**; Sciencephile LIFE HERE? x0.66 | **x0.81** (n=2) |
| **Cluttered** | Kurzgesagt THE CREATOR 71eUes30gwc x0.92 (dozens of ringed universes) | (n=1) |

**Findings**
- The black hole **as the subject**, drawn big, dark and simple (icon or crop), scores x1.5–1.7. One extra oddity lifts it to x2.5–3.7: being inside it (x3.66), giving it a face that eats (x2.91), crossing out its name (x2.79), or calling it a bomb (x2.00).
- The two tiles that **shrink the story to a little person or planet with a circle/arrow and a question** are the only black-hole flops (x0.95, x0.66). The viewer's eye goes to the tiny target, which is unreadable at 160 px.
- Black-hole tiles are dark: median black share 0.40 (Kurzgesagt) and 0.49 (Sciencephile), against 0.25/0.28 for each channel overall. Across all space titles, frames that are **≥ 40 % black** score x1.21 (n=33, Kurzgesagt) and x1.32 (n=24, Sciencephile). Frames under 20 % black score x1.00 and x1.12.
- Kurzgesagt's ring recipe (sampled from e-P5IFTqB98): background **#03012B**, disc **#000000**, inner rim **#EAE3BC**, ring **#F4BC22 → #D93A45**, outer glow **#5C024F**, plus a thin horizontal lens flare that shows only either side of the disc.

### How they draw...
- **"Huge":** the object never fits. A curved limb fills 40–60 % of the frame and a **tiny dot plus a white block arrow plus a 1–2 word label** gives scale. Examples: Kurzgesagt #5 OUR SUN x3.2, 0FH9 SOLAR SYSTEM x1.88, aeWyp LARGEST STAR x1.50, #21 EARTH (8.3 M, new); Sciencephile "Basically You're very smol" ENegk45GYEQ x2.89 (the font shrinks word by word), Sciencephile TON-618 x1.46 (the text sits inside the black).
- **"Dark":** pure #000 occupying half the frame with one glowing edge. Sciencephile #7 (x3.66, 53 % black, zero text) and Sciencephile Singularity #9 (71 % black) are the two darkest top tiles.
- **"Infinite / empty":** Kurzgesagt SUPERVOIDS yDAAlojz8NU x1.77 is a grey cosmic web with one tiny glowing ship and a "Hello...?" speech label. Kurzgesagt BEYOND THE EDGE isdLel273rQ x1.33 uses converging speed streaks. Sciencephile dsWfGzxjs0w x2.58 uses a 42-digit number. Sciencephile TBoVXZnAuIk x2.36 is a blue "?" inside a jagged ring on black.
- **"Inside something":**
  - Sciencephile #7 shows the inside as an *edge you are standing at*: a curved wall of streaked starlight on the left 45 % and black on the right.
  - Kurzgesagt draws "inside the body" as a cutaway with something forbidden going in (#6, the syringe into a tumour, x3.0) or as eyes peering out of a mask (#1).
  - Kurzgesagt QUANTUM FOAM x1.08 drops a tiny figure into a neon world with a red arrow pointing at it. That one only performed average.
- **"Old and simple, still works":** Kurzgesagt THE BIG BANG wNDGgL73ihY **x2.14**: flat violet triangle mountains, four white radio dishes and one white dot in a black sky, with a white label. It is the closest existing hit to our whiteboard engine.

---

## 5. Rules (each one buildable with flat shapes and stick figures)

1. **Pick space or body topics and keep the thumbnail on the topic.** Space titles x1.15 vs non-space x0.90; black holes x1.48 / x1.60. Bottom tiles: 0/12 on topic, 8/12 channel meta.
2. **Make at least 40 % of the frame black (#000000–#05031A) for cosmic topics.** Space tiles at ≥ 40 % black: x1.21 / x1.32, vs x1.00 / x1.12 under 20 %. Sciencephile top quartile has +13.8 pts black.
3. **One subject, centred, at most 3 elements** (subject, scale cue, text). Kurzgesagt top 10/12 have ≤ 3 elements. Sciencephile's two 1-element tiles score x3.66 and x3.40.
4. **Text: 1–3 words, white #FFFFFF, all caps, top band, cap height 16–17 % of the frame (≈ 175 px), 85–95 % wide, no outline on dark.** Kurzgesagt top tiles: median 2 words, median text_h 0.167, 11/12 white. In Mali, use weight 700 at ~1.1× size, because the hand strokes are thinner than Kurzgesagt's sans.
5. **No presenter and no mascot.** 12/12 flops show a character; 9/12 show the mascot. A stick figure is allowed only as a **scale reference or a victim inside the scene**, never posing for the viewer.
6. **If you want a face, put it on the cosmic object.** Black hole with eyes and mouth x2.91, 3-eyed brain x3.40, virus-mask eyes x7.4. Use big round white eyes with a black pupil and a white specular dot; an open pink mouth (#F0457A) reads "hungry".
7. **Draw "huge" by cropping.** The object is bigger than the frame; its curved edge crosses 40–60 % of it. Add one tiny dot (≤ 20 px), a white block arrow (≈ 28 px shaft) and a 1–2 word white label (#5 x3.2, 0FH9 x1.88, aeWyp x1.50).
8. **Use exactly one wrongness:** a cosmic thing in an everyday place (a black hole over a city: x12.4, x4.2), a danger where it can't be (a nuke under the sea: x2.4), a forbidden act (an injected virus: x3.0), or a wrong count (3 eyes: x3.4).
9. **Draw the black hole as a disc plus a stack of neon rings plus a horizontal flare**, not as a photo-real swirl. Icon versions median x1.66; Kurzgesagt e-P5IFTqB98 x2.52.
10. **An arrow labels scale; it does not point at a question.** Arrow + scale label: x3.2, x1.88, x1.50. Arrow or circle + tiny target + "?": x0.95, x0.66, x0.4 (Kurzgesagt #24 THIS IS A MEMORY).
11. **Saturation is not a lever; contrast against black is.** Kurzgesagt top-minus-bottom sat is +0.006 even though the channel sits at 0.75. Use one or two hot accents (#F4BC22, #D93A45, #F93684, #30B0E9) on near-black, not a fully saturated frame.
12. **Pass the 160 px test.** Kurzgesagt top 11/12 glance-2; 0/12 flops pass. If the subject or text is not obvious at 160 px wide, cut elements.
13. **No text is allowed only when the image is itself the question.** Sciencephile space tiles with 0 words: x1.53 (n=11). Kurzgesagt's 0-word space tiles: x0.84 (n=6), although #3 (skull) hit x4.2. Use it for "inside", "void" or "what is that?"; otherwise add a 2-word label.
14. **Light background only for a single object on pure white** (Sciencephile #2 x9.5, Kurzgesagt #2 x6.5). Bright gradient bursts (lime #A8DD27, cyan #08DCFC) appear only on flops (#13, #15).

---

## 6. Recipes (canvas 1920×1080, our engine: flat shapes, stick figure with big white round head, Mali text)

On black backgrounds, draw stick-figure limbs in **#FFFFFF, 7 px stroke**. The head is a **#FFFFFF fill with a 5 px #111111 outline**, and the eyes are two #111111 dots. Black limbs disappear on black.

### Recipe 0: "What if we live inside a black hole?" (our next video)
*Derived from Kurzgesagt e-P5IFTqB98 (ring icon, x2.52) + Kurzgesagt #5 / 0FH9 (scale arrow, x3.2 / x1.88) + Sciencephile #7 (inside = black dominates, x3.66).*
- **Background:** flat **#05031A**. About 80 star specks of 3–6 px **#FFFFFF** at 40–80 % opacity, kept out of the disc.
- **Lens flare (behind the disc):** an ellipse 1700×40 centred at (1000, 660) in **#F4BC22**, with a 1700×12 core of **#FFF4D6**.
- **Black hole:** disc centre (1000, 660), radius 340, fill **#000000**. Ring strokes going outward:
  - r 340–352 **#FFF4D6**
  - r 352–374 **#F4BC22**
  - r 374–398 **#D93A45**
  - r 398–450 **#5C024F** at 70 % opacity

  The top of the glow lands at y≈210, just under the text. Black share ≈ 45 %.
- **Inside the black:** a small planet, circle centre (1000, 760), r 62, **#2F80ED**, with two flat land blobs in **#27AE60**.
  - Standing on top: one stick figure 120 px tall (head Ø 46), arms raised in a relaxed wave and a small calm smile. The figure is **unaware**, and that is the wrongness.
  - Gaze: up toward the ring, not at the viewer.
- **Scale cue:** a white block arrow, shaft 28 px, from (470, 760) to (905, 760). Label **"US"** in Mali Bold, 90 px, #FFFFFF, left of the arrow at x≈330.
- **Text:** **"NO WAY OUT"**, Mali Bold, all caps, #FFFFFF, cap height 170 px (16 %), centred, spanning ≈ 78 % of the width in the band y 30–200. No outline; optional 8 px #05031A shadow.
  - It complements the title instead of repeating it: the title asks "what if we live inside"; the text adds the stakes.
  - A/B alternatives: "WE NEVER LEFT", "ALREADY INSIDE".
- **Elements:** 4 (ring, planet with figure, arrow with label, text).
- **160 px check:** you should read a black circle, a blue dot inside it, and NO WAY OUT. If the planet is lost, raise its r to 80 and drop the arrow.

### Recipe 1: scale crop ("bigger than everything")
*From Kurzgesagt #5 LARGEST STAR x3.2 (same layout in 0FH9cgRhQ-k x1.88).*
- **Background:** **#0D012C** below and **#000000** in the crop.
- **Top 50 %:** a huge circle centre (960, −2600), r 3100, so its bottom edge sits at y≈500. Fill **#000000** with rim bands of 30 px **#30B0E9** then 12 px **#FFFFFF** along the arc. Under the arc, a 60 px wavy band of **#7A3CFF** blobs (flat "surface").
- **Lower centre:** a white block arrow (shaft 30 px) from (560, 800) to (850, 800). A dot r 9 **#F4BC22** at (900, 800) with a 90×30 **#FFFFFF** 2 px orbit ellipse. Label "SOLAR SYSTEM" in Mali Bold 80 px white, two lines, left edge at x 980.
- **Text top:** the topic noun (e.g. "BLACK HOLE") in white, 170 px, band y 30–200.
- **No character.** Optional: a 40 px stick figure on the dot only if the video is about people. Never circle it.

### Recipe 2: the black hole with a face
*From Kurzgesagt #7 BLACK HOLES II x2.91.*
- **Background:** **#0D012C** with a vertical magenta glow band (**#AE4892**, 40 % opacity, 300 px wide) at x 600.
- **Black hole:** a disc at centre (560, 560), r 260, **#000000**, with a 14 px **#3A2EBD** rim.
  - Eyes: two white circles Ø 120 at (420, 400) and (700, 430), each with a 70 px **#4EE1C1** iris, a 40 px black pupil and a 14 px white highlight. Pupils look right-down at the planets.
  - Mouth: an open rounded rectangle 150×190 in **#F0457A** with two white teeth.
- **Planet stream:** from the mouth, 7 flat circles grow along an arc to the lower right, sizes 24→220 px, colours **#F4BC22, #2F80ED, #E8505B, #6FCF97, #F93684**. On the second-largest planet, a 70 px stick figure runs toward the edge with arms flung back, mouth an "O", looking over its shoulder at the black hole.
- **Text:** 2–3 words, white, top band 170 px (e.g. "IT'S HUNGRY" or the topic noun).

### Recipe 3: inside view, no text
*From Sciencephile #7 INSIDE a black hole x3.66.*
- **Background:** **#000000** everywhere.
- **Horizon wall:** concentric arcs of a circle centred at (−1150, 540) in four bands of 70 px between r 1500 and 1780: **#1D1830, #363167, #5E5B9B, #9B95D0** from outer to inner. Over them, about 60 white dashes (4×36 px, 30–70 % opacity) follow the arc direction like streaked stars. The wall occupies the left ≈ 42 %; the right 58 % is pure black.
- **Figure:** one stick figure 100 px tall floating at (1380, 600), body tilted 20°, one hand reaching toward the wall. The face is turned three-quarters to the viewer with wide round eyes (dots Ø 10) and a small "o" mouth (lost, not scared).
- **Text:** none. The title carries the words; the image asks "where am I?". Use it as the A/B partner to Recipe 0.

---

## 7. Don'ts (what the flops do)
- **Don't make the thumbnail about the channel** (book, journal, trailer, milestone, Patreon): Kurzgesagt #13, #15, #17 and Sciencephile #13, #16, #17, #18 all score x0.1–0.3.
- **Don't feature a mascot or presenter.** Mascots appear in 9/12 flops and 0/24 tops.
- **Don't write a sentence.** 6–17 words on Kurzgesagt #13 and #15, 5–7 words on Sciencephile #14 and #15.
- **Don't use a bright full-frame gradient burst** (lime #A8DD27, cyan #08DCFC: Kurzgesagt #13, #15).
- **Don't circle a tiny person and point an arrow at a question** (Kurzgesagt QqsLTNkzvaY x0.95, Sciencephile LIFE HERE? x0.66).
- **Don't fill the frame with dozens of same-size objects** (THE CREATOR x0.92, Kurzgesagt #24 neuron field x0.4, edges 0.42 = the highest clutter on the sheet).
- **Don't use vague labels** that name neither the topic nor the stakes ("THE SAUCE", "THE CHOSEN ONE", "A 2016 STORY").
- **Don't stack 5+ coloured outlined text styles** (Sciencephile #14 EDITING THE CODE OF LIFE, #15 TINY GIANTS).
