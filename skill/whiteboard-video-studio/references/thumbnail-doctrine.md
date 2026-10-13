# Thumbnail doctrine — "that's literally me" in 0.3 seconds

> **Story / history explainers (long-form): use §0 first.** The rest of this file is for short motivational videos.

## 0. Story-explainer thumbnails (measured on Zenn + Past Tense, Oct 2026)

Seen: every thumbnail of both channels' top 20 and bottom 5 (`~/videos/research/channels/contact_*.jpg`).
They are **colourful, flat, saturated scenes** — not dark boards. Five archetypes cover every hit:

| # | Archetype | Hits (views) | Recipe |
|---|---|---|---|
| A | **Figure + one strange object + yellow question** | "2 SLEEPS?" 8.05M, "ROTTEN MEAT?" 893K, "RAISE IT?" 726K, "DEAD IN SECONDS" 43K, "NO CRYING?" 38K | full-colour scene (cave brown, ocean blue, savanna sand); uneasy stick figure 40–60 % of frame height on the left; the strange object (rotten meat with worms, rusted Titanic, sabre-tooth) fills the right; 1–3 word question across the top |
| B | **One symbol on pure black, no text** | yellow eye 5.02M, "0:00" 584K, red-scribble hand 338K, bell curve + red dot 66K | black #000; one shape in yellow #FEFE06, white, or red; centred; nothing else. For mystery titles ("The ___ Effect", death, the unknown) |
| C | **Big face with one oddity + arrow** (Past Tense) | albino girl with two eye colours 1.18M, tumour + yellow arrow "Dead man walking" 318K, white hair 260K | face fills 40–60 % centre; one visible body oddity; a yellow or red arrow to it |
| D | **Split contrast** | "90% RIGHT / 10% LEFT" 35K, caveman vs modern "WHAT WENT WRONG?" | black divider; same figure, two states; huge numbers or labels |
| E | **Odd one out in a line-up** | "ARE WE ALIENS?" 829K: lion, elephant, gorilla, giraffe … stick human, red arrow on the human | row of 4–5 subjects, the odd one at the end, red arrow down on it |

**Text** — 0–3 words, ALL CAPS, **yellow #FEFE06 with a thick black outline** (stroke ≈ 12–16 % of the letter size), chunky rounded hand-marker letters (our Mali with `halo`), a band across the top spanning 80–100 % of the width, or top-right when the figure fills the left. **Never the title** — a second hook: a question about the strange thing ("2 SLEEPS?", "ROTTEN MEAT?", "RAISE IT?"), or a shocking fragment ("DEAD IN SECONDS", "NO JOB", "IT'S ALL FAKE").
**Character** — big white round head, thick outline, big round eyes glancing sideways or up, one flat brow line: **uneasy, sceptical, deadpan or sweating — never grinning**. Caveman hair / leopard tunic for ancient topics.
**Colour** — two or three flat fields + the yellow text + at most one red arrow. Saturated: sky #4A9FE0, grass #8BC34A, savanna #F2B24C, cave #6B5844, ocean #1F5FA8, cream #F6EED8, black #000.
**Flops (both channels)** — photos, text-only cards, a cute animal with no human, busy multi-figure panoramas with no focal point, phrases that ask nothing ("Worse than Death"), grim gore.

**Recipe (archetype A, engine v3)**
```js
// look: v3
const S = scene(0, 1, { cam: "none" });
S.bg("dusk", { sky: "#3b4f8f", ground: "#6b5844", hy: 760 });           // cave / night palette
const F = S.fig(430, 600, { s: 2.0, hair: "messy", outfit: "tunic", outfitC: "#d9a441" }).draw(0, 0.4);
F.face(0.4, "worried", 1);                                             // looking right, at the object
/* the strange object, big, right half: e.g. S.fire(...) or a custom path */
S.text("2 SLEEPS?", 960, 190, { size: 220, c: "#FEFE06", halo: "#111111", haloW: 0.14 });
S.arrow(...);                                                          // optional, red, onto the object
```
Build: `build.py . --thumb thumb-a.js thumbnails/a.png` → READ `a.png` and `a_glance.png` (320×180).
Make **two** variants per video for Test & Compare: usually **A** (figure + object) and **B** (black + one symbol) or **E/D**.

**Scoring (fix anything < 2)**
| | 0 | 1 | 2 |
|---|---|---|---|
| Strange object | none / generic | present, small | big, instantly "wait, what?" |
| Words | title repeated or > 3 words | 3 words, statement | 1–3 words that raise a new question |
| Colour | dark/grey or busy | colourful but busy | 2–3 flat saturated fields + yellow text, one red accent |
| Character | missing | present, smiling | uneasy/sceptical, eyes on the object |
| Glance | unclear at 320 px | readable | the question is obvious in one look |

A thumbnail is judged at **120–210 px wide, in a grid of 8–12 rivals, for ~0.3 s**. It wins when the viewer feels *seen in their problem* before they can read anything. Evidence tags: [D] industry data/vendor study · [H] expert practice (Paddy Galloway, MrBeast team, YouTube) · [R] research.

## The one rule
**Freeze the pain moment.** Show the viewer's character *inside* the exact real-life second they're living (2 AM, phone glow on the face, tears; head down on the laptop at 11:58; lying flat among papers). The thumbnail is the PROBLEM, the title is the PROMISE, the video is the RELIEF. Never show the solution. [H/D]

## Non-negotiables (every thumbnail, no exceptions)
1. **2–3 words.** 0–3 words lift CTR ~15 %; beyond 5 words nothing is read at thumbnail scale. [D] Written as the viewer's own thought in first person or a stark fact: `"I'LL START TOMORROW"`, `"2:00 AM. AGAIN."`, `"EVERYONE'S AHEAD."` Never a label, never a topic name.
2. **Huge, heavy letters.** On the 1920 canvas: primary word size **240–300 px** (a 300-px word of 8 letters is ~1,400 px wide — centre it at x ≈ 700–900 or it leaves the frame) (≥ 80 pt at 1280 ⇒ ≥ 120 px at 1920 is the *minimum*; we go 2–3× over it), secondary line 150–200 px. Text occupies ~40–50 % of the frame. Thumbnail text is bold by default (engine adds a stroke); lines are 1.55× thicker. [D]
3. **ONE emotion word in the accent colour** (RED for danger/pain, GREEN for a number that promises hope, ORANGE for warmth). Everything else ink. [H]
4. **Dark charcoal board (`// theme: dark`) by default.** Dark backgrounds averaged +30 % CTR vs light; high contrast is the strongest single variable (+38 %). Use the light board only as the A/B contrast variant. [D]
5. **One big expressive character.** Faces lift CTR ~38 % even as cartoons; the emotion must be readable at 160 px: use scale **1.6–2.2**, faces `tired cry worried angry wow sad`, body language (`slump`, `lie`, `pose:"head"`, `sit` hunched). Direct gaze (dx 0) = eye contact. [D/H]
6. **≤ 3 elements:** text block + character + one story prop (phone glow, low battery, clock, crossed thing). Nothing decorative. 2–3 elements max is what reads at 150 px. [D]
7. **Story prop carries stakes or tension**: a red battery at 1 %, 11:58 on a clock, a chain from wrist to phone, an "about to happen" beat (hand reaching for the phone). "What happens next?" is the click. [H]
8. **Text in the top third or left half; character bottom/right; 60 px safe margin; nothing in the bottom-right 300×90 (duration badge).** [D]
9. **Title ≠ thumbnail words.** They complete each other: thumbnail = the felt problem (`"I'LL START TOMORROW"`), title = the promise (`"Why You Procrastinate (It's Not Laziness)"`). [H]
10. **Glance test before shipping:** build.py writes `*_glance.png` at 320×180. Open it. If the emotion, the words and the prop aren't all obvious in one look, redo. Also check that nothing important is lost on a grey background.

## Anatomy of a reference winner (the channel the user pointed at)
`ALWAYS TIRED` — dark board; two words, each ≈ 35 % of the frame height; character hunched at a laptop with half-closed eyes; one prop: a battery at 10 % in red. Nothing else. Reads at 100 px.
`I'LL DO IT LATER` — the viewer's own sentence in quotes; sad character slumped at a desk; no prop needed.
`WHY CAN'T I START?` — character lying flat on the floor among papers; the body language IS the message.

## Recipe (thumb-a.js / thumb-b.js)
```js
// theme: dark
const S = scene(0, 1, { cam: "none" });
S.text("I'LL START", 700, 300, { size: 230 });   // keep the text block's centre ≥ 0.3 × its width from the edge
S.text("TOMORROW", 700, 560, { size: 270, c: RED });
const D = S.desk(1080, 960, 760, 0, 0.3);
const F = S.fig(1230, 960 - 125, { s: 1.6, sit: true, pose: "head" }).draw(0, 0.4);  // hunched at the desk
F.face(0.4, "tired", 0);
S.laptop(1520, D.top, 1.1, 0, 0.3);
S.clock(1700, 240, 110, 0, 0.3, { h: 11, m: 58 });
```
Then: `python3 .../build.py . --thumb thumb-a.js thumbnails/a.png` → READ `thumbnails/a.png` **and** `thumbnails/a_glance.png`.

## Scoring (fix anything < 2)
| | 0 | 1 | 2 |
|---|---|---|---|
| Pain moment | topic illustration | character present | character *inside* the moment, emotion readable at 160 px |
| Words | > 3 or a label | 3 words, generic | 2–3 words, first-person thought or stark fact |
| Size/contrast | text < 25 % frame, thin | big but light bg | ≥ 40 % frame, bold, dark board, one accent |
| Stakes prop | none / decorative | present | prop that implies "what happens next" |
| Title fit | repeats title | unrelated | problem ↔ promise pair |

## Sources
MrBeast/face/contrast principles https://touhfa.art/blog/designtips/mrbeast-thumbnail-article · text size/words/contrast lift data https://1of10.com/blog/youtube-thumbnail-design/ https://touhfa.art/blog/thumbnails/high-ctr-thumbnails-guide/ · glance test, title+thumbnail as one (Paddy Galloway) https://x.com/PaddyG96/status/1811083499044044951 · story thumbnails/tension https://www.marketingexamined.com/blog/paddy-galloway-youtube-guide · pain-moment/before-state https://blog.bananathumbnail.com/youtube-thumbnail-best-practices/ https://medium.com/@tasjarin.ahmed/why-90-of-thumbnails-fail-and-the-3-psychological-triggers-that-dont-3946c39ddc54 · dark-background CTR data https://ctrpilot.com/blog/youtube-thumbnail-colour-study
