# Thumbnail designer: how to make a thumbnail people click (from 1,260 real thumbnails)

**Read this before every thumbnail.** It replaces `thumbnail-doctrine.md` §0 for explainers. The motivational-video sections of that file still apply to motivational videos.

**Evidence:**
- We fetched **every upload's current thumbnail** from 8 channels: Zenn, Past Tense, Sam O'Nella, Casually Explained, Half as Interesting, OverSimplified, Kurzgesagt and Sciencephile. That is 1,260 thumbnails.
- Each was scored by **perf** = views ÷ median views of the 7 uploads on each side. x1 is normal, x3 a hit, x0.3 a flop.
- Every thumbnail was measured (OCR text, colours, clutter), and 192 were labelled by hand (12 top, 6 bottom and 6 latest per channel).
- Full reports, recipes and data live in `research/thumbnails/` (see the end of this file).

Tools:
- `scripts/thumb_check.py`: lint plus a feed grid.
- `scripts/research/fetch_thumbs.sh`: redo the study or add a channel.

---

## 0. What the data says, in one table

All 8 channels, 96 top vs 48 bottom tiles (`research/thumbnails/data/label-stats.txt`):

| Feature | in hits | in flops | Lift | Read it as |
|---|---|---|---|---|
| **Obvious at 160 px in one look** (glance = 2) | **72 %** | **12 %** | **5.8×** | The single strongest predictor. Every channel agrees. |
| No character at all | 33 % | 6 % | 5.3× | Mostly space/HAI tiles, where the *object* is the hero. Not "never draw people". |
| **Small character** (< 40 % of frame height) | **3 %** | **15 %** | **0.2×** | A person, if drawn, must be **big**. Tiny people lose. |
| 1–3 words | 68 % | 40 % | 1.7× | |
| 4–5 words | 12 % | 29 % | 0.4× | The dead zone: too long to glance, too short to be props. |
| Text unrelated to the title | 5 % | 15 % | 0.4× | Text must repeat the hook or add stakes. |
| Gradient background | 0 % | 10 % | 0× | Bright gradient bursts appear **only in flops**. |
| Character looking at the object | 14 % | 31 % | 0.4× | It works only when the object is big and is the joke. Default: eyes on the viewer or sideways in unease. |
| Named archetype (A–F below) | 42 % | 10 % | 4× | Hits follow a known shape; flops are "a nice picture". |

Across the whole catalog:
- **Stakes words** (ILLEGAL, NUKE, SECRET, DEATH, FRAUD, MISTAKE, WRONG, BANNED, DIDN'T) gave HAI a **20 % vs 3.7 % hit rate** (61 vs 515 uploads), **5.3×**.
- Question marks and digits did *not* help on HAI (4 % vs 5.5 %).
- **Space topics** beat everything else on both space channels: x1.15 vs x0.90. **Black-hole titles: x1.48 (Kurzgesagt) and x1.60 (Sciencephile).** Our niche is the right one.
- **Channel-meta posts** (book, trailer, milestone, recap, "do not click") make up 8 of the 12 bottom tiles on the space channels, plus HAI's two worst. They are never worth a thumbnail.
- **Pixel stats barely separate hits from flops inside a channel** (saturation, brightness and contrast deltas are about 0.01). The *idea* and its *legibility* win, not the colour grade. Do not tune pixels; tune the one wrong thing.

---

## 1. The six laws

1. **One wrongness, visible in 0.3 s.** Every hit shows exactly one thing that shouldn't be: 22 of 24 Zenn/Past Tense tops, 10 of 12 Casually Explained tops, and 8 of 12 HAI tops (stakes word). The working kinds:
   - **a thing in the wrong place:** a black hole over a city (x12.4), a nuke on a highway (x5.4), a dictator in an animal line-up;
   - **impossible scale:** a crop with a tiny dot labelled "OUR SUN" (x3.2), a giant spider beside a caveman (x3.8);
   - **danger about to happen:** monsters on a cut (x6.5), a saw over a patient;
   - **a forbidden object or act:** "ROTTEN MEAT?" (x3.0), an injected virus (x3.0), "ILLEGAL";
   - **a wrong count or a body oddity:** a 3-eyed brain (x3.4), two eye colours (x183), "2 SLEEPS?" (x12.2);
   - **an odd one out:** a human in an animal line-up, one orange seat among 30 blue (x4.7);
   - **a literal idiom:** an actual "friend zone" bubble, actual red flags (x1.9–2.0).

   The thumbnail's wrongness should be **the video's hook or best joke made visible.** Under the Joke Law (`script-writer.md` §0), the hook is built from the fact, so the thumbnail is too.
2. **Pass the glance test or nothing else matters.** Hits are glance-2 72 % of the time and flops 12 %. Test with `thumb_check.py`'s grid (§6), not at full size.
3. **The subject is the hero. A person appears only as the victim, the reactor or the wearer of the oddity, and always big:** head ≥ 25 % and visible figure ≥ 40 % of frame height. Small characters: 3 % of hits vs 15 % of flops. A presenter or mascot posing for the viewer: **0 of 24 space tops and 9 of 12 space flops.**
4. **1–3 words that raise a question or add stakes, or no words when the image *is* the question.**
   - Never 4–5 words. Never a sentence. Never a blank label on a literal picture: "THE PRATFALL EFFECT" over a man slipping scored x0.10.
   - A plain topic label is fine **only when the picture holds the oddity** (Past Tense "Rarest Human" x183, Kurzgesagt "BLACK HOLES" x2.5).
   - Prefer a stakes fragment ("NO WAY OUT", "NEVER LEFT", "LOST FOREVER") or a question about the strange thing ("ROTTEN MEAT?", "2 SLEEPS?").
5. **At most 3 elements, one focal point, clutter (edges) ≤ 0.25.**
   - The median top tile has 3 elements; bottom tiles have 5.
   - Zenn's busiest tile (edges 0.42) got 0.75× baseline *inside a series that hit 8M*.
   - Kurzgesagt's tops are its cleanest (0.156).
   - Over 7 elements, even an odd-one-out stops reading.
6. **Never about the channel; never recycled art.**
   - Recap = part-1 art + "RECAP" scored x0.1.
   - Book, trailer and milestone posts scored x0.1–0.3.
   - A part 2 gets a *new* wrongness.

---

## 2. Background: pick by topic

The channels seem to disagree here, but each one is right for its own topic.

| Topic | Background | Evidence |
|---|---|---|
| **Cosmic** (black holes, the universe, stars, "inside something") | **Near-black #000000–#05031A on ≥ 40 % of the frame**, with one or two hot accents: amber #F4BC22, red #D93A45, magenta #F93684, cyan #30B0E9 | Space tiles that are ≥ 40 % black score x1.21 (Kurzgesagt) and x1.32 (Sciencephile), against x1.00 and x1.12 under 20 %. Black-hole tiles are 40–49 % black. Sciencephile's top quartile has +13.8 pts more black. |
| **Earth, body, history oddities** | **2–3 flat saturated fields**, e.g. sky #74C8ED, grass #6ABB5C, cave #6C5D4C, navy #202C36, orange #FCA55D, mint #B2D3BE | Zenn and Past Tense: saturated fields win. Zenn's top-quartile white share is 0.15 against 0.62 for its flops. |
| **Comedy variant** (the white-page gag) | White #FFFFFF or one pastel (#C9F9FE, #FAEFFF), **filled** by big heads and a gag (3–7 elements) | Casually Explained: 11/12 tops are white or pastel against 1/6 flops. **But** an empty white page with a label is Zenn's flop mode, and Sam O'Nella's emptiest tile scored x0.1. White works only when it is full. |
| **Never** | Gradient bursts (lime #A8DD27, cyan #08DCFC), photo starfields in comedy, Van Gogh-style texture | 0 tops / 5 flops. Casually Explained's dark starfield scored x0.3. |

---

## 3. Archetypes: which to use, and their real record

Always make **two variants** (A/B for YouTube's Test & Compare): one **floor-raiser** and one **lottery ticket**.

| # | Archetype | Record (perf) | Use for |
|---|---|---|---|
| **A** | **Figure + strange object + 1–3 word question.** Big uneasy figure on the left, the object filling the right half, yellow text in a top band | **The floor-raiser.** All 12 scored Zenn A tiles land at ≥ x0.74 (median ≈ x1.4); 5/12 reach ≥ x1.9 (x12.2, x7.4, x3.0). | Default variant 1 for Earth, history and body topics |
| **B** | **One symbol on black, no text** (≤ 45 % of the width, at most one red mark) | **The lottery ticket.** 3/5 reach ≥ x2 (x42, x17.5, x2.0); 2/5 come in below par. | Named phenomena ("The ___ Effect"), mysteries, death, "inside". Never put the name in the image; for those titles, title words in the image went 0/3. |
| **C** | **One big face with one oddity**: face 60–85 % of height, centred, eyes on the viewer, calm or sad, *one* anomaly; the arrow is optional | **Past Tense's whole engine:** 4 of its 6 videos above 100K (x21–x183). Single calm oddity: 4/4 hits. Gore or several oddities: 0/2. | Body topics: eyes, skin, brain, "what X does to you" |
| **F** | **Scale crop**: the giant thing bleeds off the frame (its curved edge covers 40–60 %), with a tiny dot, a white block arrow and a 1–2 word label | x3.2, x1.88, x1.50; the giant spider x3.8 | "Bigger than", "largest", "how far" |
| **G** | **Face on the object**: the cosmic thing gets big round eyes (and a mouth) | Black hole eating planets x2.91; 3-eyed brain x3.4; virus-mask eyes x7.4 | Comedy-first space: the object *is* the character. Sam O'Nella's smiling thorium rod scored x1.6. |
| **H** | **Literal idiom**: draw the title's metaphor literally, no text | x2.0, x1.9 (Casually Explained) | "Point of no return" as a painted line with a sign; "spaghettification" as a noodle person |
| **E** | **Odd one out in a line-up**: 3–5 similar things, one wrong | 6/12 Sam O'Nella tops vs 0/6 flops; HAI's orange seat x4.7 | "Weirdest planets", "the one that shouldn't exist" |
| **I** | **Rival bookends**: two big heads cropped by the left and right edges, **unequal emotions** (one smug or calm vs one angry or nervous), a stakes object between them, an identity prop on each | OverSimplified: unequal emotions 7/12 tops vs 1/6 flops; all-angry 1/12 vs 3/6; recognisable face 11/12 vs 1/6 | "X vs Y", races, wars, theories fighting |
| **D** | **Split contrast** (two numbers or states) | **Average at best:** x0.58, x1.4, ~x1.2 | Third variant only |

**Black-hole thumbnails, all 20 in both space catalogs:**
- **Icon** (black disc + neon rings, centred, label above): median x1.66.
- **Crop** ("too big for the frame"): x1.50.
- **Plus one oddity:** being inside it x3.66, a face that eats x2.91, its name crossed out x2.79, called a bomb x2.00.
- **Tiny person circled + arrow + "?"**: x0.95 and x0.66. **These are the only black-hole flops.**

---

## 4. Building it with our engine (`// look: v3`, canvas 1920×1080)

**Text** (`S.text(str, x, y, {size, c, halo, haloW})`):
- **Size:** `size` ≈ 1.1 × the OCR line height you want. size 190 gives a measured line height of 0.16 of the frame. Hits run 0.16–0.24, so use **size 190–260**.
- **Position:** a top band (y 120–230), 80–95 % of the width. Or top-right when a big head fills the left. **Nothing in the bottom-right 300×90** (the duration badge).
- **Colour by background:**
  - On scenery: yellow **#FEFE06** with a black outline. Measured Zenn and Past Tense outlines are ≈ 6.5 % of cap height per side, so use **`haloW: 0.09–0.10`**. (`haloW` is the total stroke as a fraction of `size`; the old 0.14–0.16 gave about twice the reference outline.)
  - On near-black: white #FFFFFF, **no outline** (Kurzgesagt: 11/12 white, none outlined).
  - On white: black #000000, no outline (Sam O'Nella).
- **Accent:** one word in red #E01E1E or amber #F4BC22 at most.

**Characters:**
- `S.fig(cx, gy, {s})` has head radius **50·s** and head centre at **gy − 309·s**.
- **Big-head crop** (A/C): use **s ≈ 4–4.5** with gy below the frame. For example, `s: 4.3, gy: 1890` puts the head centre at y≈560 with diameter ≈ 430 (40 % of the height). The body falls off the bottom.
- A full figure at s ≈ 1.9 has a head of only 10 % of the height. That is a **small character** (0.2× lift); avoid it unless the figure is deliberately a scale dot.
- On black backgrounds pass `c: "#ffffff"` (white limbs), or the body vanishes.
- **Expression:** uneasy, deadpan, side-eye or cringing with a sweat drop: `worried`, `flat`, `wow`. **Never grinning** (7/8 Zenn top figures are uneasy).
- **Narrator rule:** the narrator's face never carries the punchline. The object does.
- **Gaze:** at the viewer for C (Past Tense hits 5/6), sideways in unease for A.
- **Identity:** one identity prop readable at 160 px: Dave's mug of tea, a helmet, a moustache. Blank heads with no identity flop (OverSimplified's "Football War" x0.5).

**Space kit** (helpers in `examples/blackhole-home/`):
- **Black hole = front-on icon:**
  - A black disc with concentric rings, inner to outer: #FFF4D6 → #F4BC22 → #D93A45 → #5C024F at 70 %.
  - A thin horizontal flare (1700×40, amber with a cream core) that shows on each side.
  - **Not a tilted ellipse ring.** At feed size a tilted orange ring reads as **Saturn**; this is our own episode 12 lesson, §7.
- **Huge:** crop it. The object never fits in the frame.
- **Inside:** stand at the wall, with a curved, streaked edge on the left ~42 % and pure black on the right (Sciencephile x3.66). Or draw a cutaway with something forbidden going in.
- **Scale arrow:** a white block arrow plus a 1–2 word label. It **labels scale; it never points at a question.**
- **Stars:** 40–80 white specks, 3–6 px, at 40–80 % opacity, kept off the subject.

**Build:** `python3 scripts/build.py EP --thumb thumb-a.js thumbnails/a.png` writes `a.png` and `a_glance.png` (320×180).

---

## 5. Title + thumbnail = one hook

- If the title is a **noun** ("Black Holes"), the text may repeat it, and the picture carries the wrongness.
- If the title is a **"what if" or "why" sentence**, the thumbnail adds **stakes** in 2–3 words and never restates the question.
  - Title "What If We Live Inside a Black Hole?" → thumbnail "NO WAY OUT" or "WE NEVER LEFT".
  - Title "What Did Ancient Humans Eat?" → thumbnail "ROTTEN MEAT?".
- If the title names an **opaque phenomenon**, use archetype B with no words. The mystery stacks: Calhoun x42.
- **Text that relates to neither** the title nor the picture: 5 % of hits vs 15 % of flops.

---

## 6. Process (do every step)

1. **Find the wrongness.** Take the script's hook or best joke beat and write it as one sentence: "a calm stick figure living inside a black hole and not noticing".
2. **Pick 2 archetypes** (§3): a floor-raiser (A/C/F/G) + a lottery ticket (B/H). Pick the background by topic (§2).
3. **Write the text:** 1–3 words, a stakes word or a question about the strange thing, never the title sentence. Write 3 options and choose one.
4. **Build both** with the engine (§4). Start from the closest recipe in `research/thumbnails/*.md` §Recipes.
5. **Lint:**
   ```sh
   ~/.venvs/pocket/bin/python scripts/thumb_check.py thumbnails/a.png thumbnails/b.png [--space | --white]
   ```
   It checks:
   - words (OCR) and text height;
   - clutter;
   - near-black share (with `--space`);
   - blank-white-page;
   - the duration-badge zone.

   Exits 1 on FAIL.
6. **READ `*_grid.jpg`.** It shows your thumbnail at feed size among 11 real hits from the study. Ask:
   - Is mine the one the eye lands on?
   - Can I say the wrongness in 3 words from this view?
   - Does any shape read as something else (Saturn, a donut, a planet)?

   Also READ `*_glance.png`. **The grid is the real test. `thumb_check` passing does not mean the thumbnail works** (see §7).
7. **Score each variant** (fix anything below 2; ship at ≥ 10/12):

| | 0 | 1 | 2 |
|---|---|---|---|
| Wrongness | none: a nice picture | present but small or generic | one big "wait, what?" thing |
| Glance (grid) | unclear | readable when looked for | obvious in one look; it pops among the hits |
| Words | 4+ or repeats a sentence title | a 1–3 word label | 1–3 words adding stakes or a new question (or none, for B) |
| Character | small figure / mascot / grinning | big but neutral | big and uneasy, or none because the object is the hero |
| Simplicity | ≥ 5 elements or edges > 0.30 | 4 elements | ≤ 3 elements, edges ≤ 0.25 |
| Fit | background wrong for the topic (§2), or it is about the channel | right background, weak title pairing | right background + title and thumbnail form one hook (§5) |

---

## 7. Our own lesson: the episode 12 thumbnail (2026-10-13)

`examples/blackhole-home/thumbnails/a.png` ("WE LIVE HERE?": a worried figure on the left, a house inside a black hole) **passes `thumb_check`**: 3 words, text height 0.16, edges 0.127, 71 % black. In the feed grid it **fails**:
1. The tilted orange ring reads as **Saturn**, not a black hole.
2. The figure is a full body at s 1.9, so its head is about 10 % of the height. Next to "ROTTEN MEAT?"'s face at about 45 %, it disappears.
3. The house inside is a second, small focal point.

Fixes:
- Front-on ring icon.
- Big-head crop or no figure at all.
- One wrongness: we are inside it.

The v2 thumbnails built from this playbook, `c.png` "NO WAY OUT" (space icon) and `d.png` "WE'RE INSIDE?" (big-head Dave), both read at once in the grid: `examples/blackhole-home/thumbnails/`.

---

## Research files (`research/thumbnails/`)

| File | What's in it |
|---|---|
| `zenn-pasttense.md` | Archetype A/B/C perf, §0 corrections, Effect-title rule, outline measurements, 3 recipes (black-hole funnel B, "SPAGHETTI?" A, black-hole-pupil C) |
| `comedy.md` | Sam O'Nella / Casually Explained: white-page gags, 4 ways to plant the joke, odd-one-out line-up, 3 recipes (question heart, literal idiom, host + odd planet) |
| `hai-oversimplified.md` | Stakes words (5.3×), the caption box, rival bookends with unequal emotions, 3 recipes ("there's a black hole in here", secret inside the head, space-race bookends) |
| `space.md` | Every black-hole thumbnail with perf, how to draw huge, dark, infinite and inside, 4 recipes incl. **Recipe 0 for "What if we live inside a black hole?"** |
| `rubric.md` | The analyst brief (reuse it for new channels) |
| `data/thumb-labels-*.json` | 192 hand labels; `data/label-stats.txt` = the cross-channel lift table (`scripts/research/thumb_labels_stats.py`) |
| `data/metrics-summary.txt` | Per-channel pixel and text medians and top-vs-bottom deltas (`scripts/research/thumb_metrics.py`) |

**Redo or extend:**
```sh
sh scripts/research/fetch_thumbs.sh ~/videos/research/thumbs NewChannel ...   # lists, thumbnails, OCR, metrics, sheets
```
Then spawn one agent per channel group with `research/thumbnails/rubric.md`, and run `thumb_labels_stats.py research/thumbnails/data`.

**Caveats:**
- These are the *current* thumbnails, and big channels A/B-swap them, so we see the survivors.
- Perf is noisy on small channels: Past Tense is viral-or-nothing, and Zenn had a viral run that inflates its neighbours' baselines.
- OverSimplified's variance is driven by topic and part number more than by the art.
