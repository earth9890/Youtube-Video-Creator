# Comedy group: SamONellaAcademy + casuallyexplained

Labels: `data/thumb-labels-comedy.json` (48 tiles: 24 per channel, top/bottom/latest).
Pixel stats: `~/videos/research/thumbs/metrics.tsv` (Sam n=64 scored, CE n=101 scored).

**Read this first: the two channels teach different lessons.**
- **Sam O'Nella** barely varies. The best of 64 scored uploads is x1.9 and only 6 reach x1.5. His format is a **floor-raiser**: one fixed template that never flops when it is used. All 4 uploads without text have a median of x0.69; the 60 with text have a median of x1.08.
- **Casually Explained** swings from x0.3 to x5.1, with 7 uploads at x2 or more and 10 at x0.5 or less. It is the channel that shows **what makes a crude drawing pop**.

---

## 1. Channel style fingerprints

### Sam O'Nella Academy (the "host + title + line-up" card)
- **Palette:** almost monochrome. White `#FDFDFD` covers 44–79 % of each top tile and black ink `#332D29`–`#36302C` covers 10–24 %. The one warm accent is Sam's hair, brown `#A47251`/`#AC7F52`. Topic props add a single accent of their own: cyan `#22AFCF` (#4), green `#538B36` (#9) or rust `#9A5D59` (#8). Channel medians: sat 0.064 (the lowest of all 8 channels), white 0.653, lum 0.76, colorful 8.5.
- **Background:** pure white in 23 of 24 tiles. There is no scene, no ground line and no shadow.
- **Character:** "Sam" sits in the **left third** in 20 of 24 tiles. He has a white face with two dot eyes and a flat dash smile, a messy brown hair helmet, and a thick black stick body (stroke ≈ 18 px at 1280 wide) that the frame cuts off at the thighs. His head is ≈ 28 % of frame height and the visible figure is ≈ 50–60 %. He always looks at the viewer with the same deadpan smile, and his expression never changes. The joke is never on his face.
- **Text:** bold transitional serif (Times/Bodoni feel) in **solid black `#000000` with no outline**, ALL CAPS in 10 of 12 top tiles (#4 and #5 use regular-weight mixed case). It sits as a 2-line block in the **top-right**, from x ≈ 30 % to 97 % and y ≈ 5 % to 45 %. Letter height is 15–28 % of the frame (text_h median 0.18) and text_area median is 0.217. The median word count is 2: a topic label, not a sentence.
- **Composition grid:** three fixed zones. (1) Sam in the left 25 %, full height. (2) The title in the top-right 70 %. (3) A **line-up of 3–6 topic subjects** along the bottom 45 %, heads at ≈ 15–20 % height and cropped by the bottom edge. Topic people are drawn as Sam-style stick figures with crude, grotesque caricature faces. 9 of 12 top tiles have a line-up of 3 or more.
- **Evolution:** the template has not moved in years (the latest #22 and #23 match the 2016-era tiles). The latest tiles get busier: #19 has 13 elements, a crowd of caricature heads. Self-promo tiles break the template (#20 a book in a starburst with a red arrow, #21 a real photo with Sam's drawn head pasted on) and score lower on raw views (605K and 2.2M against a ~10M norm).

### Casually Explained (the "big-eyed reaction" cartoon)
- **Palette:** a white or pastel ground (`#FEFEFE`, ice blue `#C9F9FE`/`#B2CCFD`, lilac `#FAEFFF`/`#D7E3FA`). Skin is cream `#F5DDB4`, ink is `#342E26`, and **one loud accent** goes on the joke object: hot pink `#F05AF0` (#1), flag red `#FF0030` (#8), French blue `#2D52E8` plus red `#E8202A` (#6). Channel medians: sat 0.23, white 0.305, lum 0.69.
- **Background:** white in 7 of 12 top tiles and flat pastel in 3 more. The 2 remaining top tiles use a real-photo collage or a gold photo (#2, #11).
- **Character:** a huge round cream head with a ≈ 6 px black outline. The eyes are oversized (each ≈ 25 % of head width) with large black pupils. Hair is a black scribble blob for the boy and long brown `#A0784A` strands for the girl. The body is a thin 3–4 px stick, much thinner than the head outline, so the face dominates. Heads are **big**: the visible figure is ≥ 75 % of frame height in 9 of 12 top tiles, and #7 and #8 crop the head at 50 %+ of the frame. **Emotion lives in the eyes and mouth:** a wavy mouth for worry (#7), a squinting slab-eye for suspicion (#8), a smug curve (#2, #9). The character usually looks at the **object of the joke** (gaze = object in 5 of 12 top tiles: #1 #7 #8 #11 #12), not at the viewer.
- **Text:** optional. 8 of 12 top tiles and 3 of 6 bottom tiles carry text. When present it is a casual rounded font (Comic Sans feel, close to our Mali), **coloured, no outline**, ≈ 16 % height when it is the hook (#1 pink `#F05AF0`) and ≈ 6–10 % when it labels a joke (#5, #10, #12). Channel text_area median is only 0.037: text is a caption, never a banner.
- **Composition:** one or two characters at ≥ 75 % height plus **one** joke object. There is no fixed grid. Two characters face each other across the centre (#1, #7, #12), or a big foreground head looks at a small background gag (#8).
- **Evolution:** 2015–18 tiles are white and simple. The latest 6 lean on **photo collage and saturated colour blocks** (#22 a pure photo collage, #24 an oil-barrel photo, #19 a three-panel colour card, #20 a red-glow gradient). Every scored latest tile sits at x0.8–1.2, and views fell from 8–22M to 1–2.6M. The drift away from white-and-drawn coincides with the decline.

---

## 2. Top vs bottom

### Casually Explained (the real signal: 12 top at x1.8–5.1 vs 6 bottom at x0.3–0.4)
| Feature | Top 12 | Bottom 6 |
|---|---|---|
| White or pastel background | **11/12** (all except #11) | **1/6** (#13) |
| A visible gag that reads without the title (incongruity in the picture) | **10/12** (#2 #3 #4 #5 #7 #8 #9 #10 #11 #12) | **1/6** (#14, weak) |
| Two characters in social tension (want vs refuse, real vs fake) | 5/12 (#1 #3 #7 #8 #12) | 0/6. #16 and #17 have groups but **no tension** (picnic, brunch) |
| Glance = 2 (obvious at 160 px) | 7/12 | 0/6 |
| Text present | 8/12 | 3/6 (not the differentiator) |

- Quartile metrics (25 vs 25 uploads): **white share 0.471 top vs 0.073 bottom**, lum 0.77 vs 0.53, **sat 0.16 vs 0.38**, colorful 20.4 vs 29.3. Text presence is identical: 52 % in both quartiles.
- Channel-wide (n=101): uploads with white ≥ 0.40 have a median of **x1.11, 14 hits ≥ x1.5 and 2 flops**. Uploads with white < 0.15 have a median of **x0.83, 5 hits and 7 flops**. Uploads with black ≥ 0.25 have a median of x0.82 and **0 hits** out of 11.
- The flops are full-bleed saturated or dark frames: Van Gogh paint (#14), a black starfield inside a fake app window (#15), neon-green `#72E819` grass (#16), all-orange `#F9DAAF`/`#E1A958` (#17), a dark stock photo (#18). Each one is a **pleasant or atmospheric picture with no joke in it**.
- Confound: Shorts and series parts (Short #1/#2, Evolution I–VI) have a median of x0.55 across 8 uploads with 0 hits, so part of the bottom is format, not the thumbnail.

### Sam O'Nella (a weak signal: x1.3–1.9 vs x0.1–0.7)
| Feature | Top 12 | Bottom 6 |
|---|---|---|
| Title text present | 12/12 | 4/6 (#13 and #15 have none) |
| A grotesque or odd one out in the line-up (blob creature, giant face, dictator among animals, huge hat, deformed dog) | **6/12** (#1 #2 #6 #8 #10 #12) | **0/6** (#17 is five identical cavemen) |
| A prop on or touching Sam's head | 5/12 (#6 crate, #8 bent gun barrel, #9 beret + rifle, #10 eagle, #12 blade) | 2/6 (#14 shades, #16 parrot) |
| Elements (mean) | 5.6 | 3.7 |

- The frame emptiness metric agrees: uploads with white ≥ 0.70 have a median of x0.89, and uploads with white < 0.60 have a median of x1.07. The emptiest tile (#13, white 0.978, one tiny Sam) is the channel's worst at **x0.1**.
- Bottom topics are personal or weekday-series filler: an announcement, a how-to, a childhood story, fire diamonds. The thumbnail cannot rescue a no-hook topic, but a blank frame guarantees the floor (#13 x0.1, #15 x0.6).

---

## 3. Curiosity mechanics: how the joke is planted in the thumbnail

The core finding: **both channels put a joke in the picture that the title does not explain.** There are four planting methods:

1. **Literalise the idiom in the title** (CE #7 "Friend Zone": a real pink zone bubble he is walled out of. CE #8 "Red Flags": she stands on the tip of an iceberg waving two actual red flags). The title names the metaphor and the picture draws it literally. There is no text, and the gag is the question. This method produced 2 of the 12 CE tops (x2.0 and x1.9), and both are glance 2.
2. **Contradiction between picture and label** (CE #10: two identical steak plates labelled "Actual Garbage" and "Literal Art". CE #5: "1 ND = 1 Dorm", a made-up unit. CE #12: "What's up" struck out in red, with "Suh" written above). The text is a **complement**: it says something the picture visibly disagrees with. Sam #7 does the same in words: the "HE KILLED GARFIELD" pun against the title "The Presidential Assassination Nobody Talks About".
3. **Odd one out or grotesque member** (Sam #2: a naked blob creature standing among pilgrims. Sam #6: a giant bulbous face in a row of normal heads. Sam #10: a moustached dictator in an animal line-up. Sam #12: a man under a hat twice his size). The viewer asks "why is THAT there?" Present in 6 of 12 Sam tops and 0 of 6 Sam bottoms.
4. **Mismatched body or scale** (CE #4: a stick head on a photo bodybuilder torso. CE #5: a photo head on a stick body. Sam #4: the thorium rod as a smiling friend the same height as Sam). Something is wrong with the proportions of one character.

**Pairing with the title:** CE top tiles are complement or no text in 9 of 12 and repeat the title only in 3 (#1, #4, #6). Sam repeats his title in 9 of 12. His title text is a label, and the joke lives in the line-up. In both channels the **picture never illustrates the title straight**: it shows a consequence, a contradiction or a literal reading.

**Wrongness triggers seen:**
- a thing in the wrong place: dictator among animals, sneakers in a holy-grail treasure chest (CE #11), burgers at the top of the food pyramid (CE #9)
- impossible scale: giant hat, giant face, bodybuilder torso
- a forbidden or absurd label: "1 ND = 1 Dorm"
- social danger about to happen: the friend-zone wall, red flags, "Is She Into You?" with a "?" heart

There are **no** danger, explosion or arrow triggers. Arrows appear in 1 of 48 tiles (Sam #20, a self-promo tile).

**The joke is never on the narrator's face.** Sam keeps the same deadpan smile in every tile he is in, and the CE boy shows the *reaction* (worried, suspicious), never the punchline. The deadpan observer next to an absurd object is the comedy engine.

---

## 4. Space and science topics specifically
These channels rarely do space, but what they did is telling:
- **Space drawn as a black photo starfield flops.** CE #15 (Evolution IV, black 0.329, starfield plus app UI) scored x0.3. CE uploads with black share ≥ 0.25 have a median of x0.82 with 0 hits out of 11. For a comedy-first channel, "dark" must be an **object on white**, not a dark frame.
- **Make the science thing a character.** Sam #4 (x1.6) turns a thorium rod into a cyan `#22AFCF` pill with a smile, standing next to Sam like a buddy. This is our cheapest move: a black hole or a neutron star with two dot eyes and a dash mouth.
- **Cosmic object as a head prop.** Sam #22 puts Saturn behind Pliny's head like a halo (x1.1). Sam's head-prop gag (5 of 12 tops) is the natural place for a planet, a comet or a tiny black hole.
- **Huge:** let the giant thing get **cropped by the frame edge** (Sam #6 face, #12 hat), or use depth: a foreground head at 50 % height against a tiny far figure (CE #8). Never use a ruler or a diagram.
- **Inside something:** a tinted translucent bubble with a white highlight (CE #7: lilac `#FAEFFF` dome, highlight stroke), or a tiny figure in a jar (CE #23). Both read at 160 px.
- **Infinite or statistical:** CE #21 uses a bell curve as the floor characters stand on. A smooth blue `#75BEE4` hill on white works as "a distribution" or "a horizon".

---

## 5. Rules
1. **White ground, always.** CE's top quartile has a white share of 0.47 against 0.07 for the bottom quartile; 11 of 12 CE tops are white or pastel; Sam is white in 23 of 24. Use `#FFFFFF`, or one pastel at most (`#C9F9FE` / `#FAEFFF`) when a sky or zone is needed. Never use full-bleed dark or a saturated fill.
2. **Plant one visible gag that works with the sound off and the title hidden.** It is present in 10 of 12 CE tops and 1 of 6 bottoms. Test: cover the title. Does the picture still make someone ask "wait, why…?"
3. **Draw the title's metaphor literally.** Friend zone becomes a bubble and red flags become flags (CE #7 and #8, both glance 2, no text needed). For us, "point of no return" becomes a painted line and a sign; "spaghettification" becomes a noodle-stretched stick figure.
4. **Deadpan narrator plus an absurd object.** Our big white round head keeps a neutral dot-eye, dash-mouth face (Sam, every tile he is in) or shows the reaction (CE #7 worried, #8 squint). The punchline belongs to the object, never to the narrator's face.
5. **The odd one out in a line-up.** A row of 3–5 similar things along the bottom 45 %, one of them wrong in size, shape or category (Sam: 6 of 12 tops vs 0 of 6 bottoms).
6. **Text is a complement or nothing.** CE: 9 of 12 tops are complement or no text. If you write words, make them contradict or reframe the picture ("1 ND = 1 Dorm", "HE KILLED GARFIELD"). Never caption what is drawn.
7. **Two words, big, black, no outline**, when using Sam's label mode: 1–3 words in the top-right block, letter height 15–25 % of the frame, solid `#000000` on white (text_h median 0.18, text_area 0.22). There is no need for yellow or an outline when the ground is white.
8. **One loud accent colour, on the joke object only.** CE: pink `#F05AF0` on the "?" heart, red `#FF0030` on the flags. Sam: cyan `#22AFCF` on the thorium rod. Everything else is ink plus skin or white (Sam sat 0.064; CE top quartile sat 0.16 vs 0.38 bottom).
9. **Big heads.** The visible figure is ≥ 75 % of frame height in 9 of 12 CE tops, and the head is often cropped by the frame. Eyes at least 25 % of head width, so the expression reads at 160 px.
10. **Never leave the frame empty.** Sam #13 (white 0.98, one tiny figure) scored x0.1. Sam uploads with white ≥ 0.70 have a median of x0.89 vs x1.07 when fuller. Aim for 3–7 elements (top means: Sam 5.6, CE 5.3; Sam bottoms 3.7).
11. **Give the character a gaze target.** In CE tops, 5 of 12 characters look at the joke object, so the viewer's eye follows to the gag. Sam looks at the viewer and the line-up does the work.
12. **Social tension beats a pleasant scene.** Two characters wanting different things (CE #1, #3, #7, #8, #12: 5 of 12 tops) vs nice-but-nothing-happens group scenes (CE #16 and #17, both x0.4).
13. **A head prop is a free gag slot.** An object sitting on or crashing into the narrator's head appears in 5 of 12 Sam tops: a crate, an eagle, a blade crossing out the title word (#12). Use a tiny planet, a comet or a black hole sitting on the head.

---

## 6. Recipes (canvas 1920×1080, white `#FFFFFF`, ink `#1A1A1A`, Mali)

### Recipe 1: "The question heart" (from CE #1, x5.1, the group's biggest outlier)
Topic example: *What happens if you fall in love with a black hole?* Use for any "would X like you / is X dangerous" topic.
- **Ground:** `#FFFFFF`.
- **Text:** top band, centred, y 40–200 px. "Is It Into You?" in Mali Bold 170 px, colour `#F05AF0`, no outline, ≈ 75 % of canvas width.
- **Left character:** our stick figure with a big white round head (diameter 380 px, centre at (520, 560)), ink stroke 10 px. Eyes are two large ovals (90 px) with 55 px black pupils looking right; the mouth is a hopeful upward arc. The body is a 6 px stick, cropped at the bottom edge, arms loosely out.
- **Right "character":** a black disc `#111111` (diameter 420 px, centre at (1400, 580)) with a thin orange `#FF9A2E` accretion ring (stroke 18 px, ellipse 620×140 px, tilted −12°). Give it the same two big white eyes and a small smug arc mouth, looking left.
- **Centre:** a lilac `#E8A8E8` heart, 220 px wide at (960, 520), outlined 6 px in ink, with a black "?" 120 px inside.
- **Elements:** 4. **Glance:** 2. The title can stay neutral ("Black Holes, Casually Explained").

### Recipe 2: "The literal idiom" (from CE #8 "Red Flags", x1.9, no text)
Topic example: *spaghettification* ("stretched thin" taken literally).
- **Ground:** sky `#C9F9FE` above y = 430, and the lower area `#FFFFFF` with faint ink grid lines (2 px `#D0D0D0`, every 120 px) bending toward a point at (1450, 470), showing gravity.
- **Foreground (left):** the narrator's head cropped by the left and bottom edges. Circle diameter 760 px, centred at (300, 520), white `#FFFFFF` with a 12 px ink outline. Eyes are flat suspicious slabs: two 150×55 px black bars, with white 30 % at the top of each. The mouth is a straight 160 px dash and a hand-stick touches the chin. Gaze is toward the right.
- **Background gag (right):** a black hole disc (diameter 220 px, centre at (1450, 470)) with an orange `#FF9A2E` ring. A tiny stick figure (head 70 px) is stretched into a 520 px-long noodle wiggle that pours into the disc, still smiling and waving one arm.
- **Accent:** only the orange ring. **Text:** none. **Elements:** 3. **Question:** "why is he a noodle?" Pair it with a title that names the idea, not the image ("What Happens at the Edge of a Black Hole").

### Recipe 3: "Host + odd one out line-up" (from Sam #12 "Timothy Dexter" and #6 "Tararre", x1.3–1.5)
Topic example: *The Strangest Planets.*
- **Ground:** `#FFFFFF`.
- **Host:** the narrator in the left 25 %. Head 300 px diameter centred at (230, 400), dot eyes, flat dash smile, looking at the viewer. Thick 18 px stick body running off the bottom edge. **Head prop:** a small grey cratered moon (110 px) resting on top of the head, slightly tilted.
- **Title:** top-right block from x 560 to 1860 and y 50 to 450. Two lines, "WORST" / "PLANETS", in Mali Bold ALL CAPS at 190 px letter height, `#000000`, no outline.
- **Line-up:** along the bottom from x 520 to 1920 and y 600 to 1080. Draw 4 planets as round faces (diameter 260 px each, cropped by the bottom edge): Earth `#3B82F6` and `#22C55E`, Mars `#E4572E`, Neptune `#4F7DF0`, each with a bored dash mouth. **The odd one:** the 3rd slot is a planet **twice as big** (520 px) in lava orange `#FF6A1A` with ink cracks, a melting grin and one tiny umbrella. Crop it at the top-right of the line-up so it overlaps the title's last letter.
- **Elements:** 7. **Question:** "why is that one melting?" The title stays plain ("The Weirdest Planets Ever Found").

---

## 7. Don'ts (what the flops do)
- **Empty white with a tiny figure** (Sam #13, x0.1) or a **no-text personal-story scene** (Sam #15, x0.6). White only works when it is full.
- **Full-bleed colour or dark grounds:** neon grass (CE #16, `#72E819`), orange room (CE #17), Van Gogh texture (CE #14), black starfield (CE #15), dark stock photo (CE #18). All score x0.3–0.4.
- **A pleasant scene with nobody wanting anything:** a picnic or a brunch table (CE #16, #17).
- **A diagram instead of a joke:** the caffeine molecule (CE #13, x0.3) and the fire diamonds (Sam #18, x0.7). A chart only works when characters sit on it with an attitude (CE #21).
- **Text that repeats a generic title:** "To Make a Long Story Short…" (CE #16) and "What do artists do every day?" on a dark photo (CE #18).
- **A line-up with no odd one:** five identical cavemen (Sam #17, x0.7).
- **Over-stuffed crowds:** Sam #16/#24 has 9 elements (x0.6) and Sam #19 has 13. Above ~7 elements the odd one out stops reading at 160 px.
- **Photo collages of real people** (CE #22 and #24, the latest drift) replace the drawn gag. We cannot build them anyway, and the channel's numbers fell with them.
