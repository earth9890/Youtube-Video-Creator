> **2026-10-13 owner verdicts:** (1) episode 11 built in this hard-cut style was rejected ("transitions… feel flicker"): use the v3 look with crossfades for visuals; (2) the script tone here was replaced by `script-writer.md` (fun first, jokes built from facts). The measurements below are still valid evidence for structure, length, titles and thumbnails.

# Story-explainer format (8–9 min long-form, Zenn / Past Tense style)

Measured on 2026-10-11 from 4 reference videos (Zenn "What Did Ancient Humans Do at Night" 8.05M views,
Zenn "The Calhoun Effect" 5.0M, "What If WE Are The Aliens" 829K, "How Did Humans Invent Cooking" 28 min)
plus the full catalogues of @Zenn0009 (38 videos, 195K subs) and @PastTense01 (28 videos, 25.8K subs).
Raw data: `~/videos/research/ref/<video>/` (transcripts, cut lists, contact sheets) and `~/videos/research/channels/`.

Use this format when the user asks for a history / science / "why do humans…" explainer, or any video longer than ~3 min.
The short motivational format (SKILL.md §1–7, `craft-playbook.md`) stays as is.

## 1. The numbers to hit

| Measure | Reference (all 4 agree) | Our target |
|---|---|---|
| Length | 8:00–9:10 (Zenn 26 of 38 videos); < 6 min underperforms | 8–9 min |
| Words | 1,600–2,000 | ~1,600 |
| Speech rate | 174–192 wpm, flat all video | 175–185 wpm (TTS speed 1.0) |
| Sentence length | median 8–11 words; 20–33 % are ≤ 5 words | same |
| Pauses | median 0.12–0.28 s, max 0.3–0.8 s; no long beats even at act breaks | 0.15–0.35 s; 0.6 s max, only before the final line |
| Shot length | median 2.4–2.7 s (Zenn), 4.1 s (Cooking); p90 ≈ 4–6 s; max 6–7 s | median 2.5–3 s, hard max 6 s |
| Cuts / min | 20–26 (Zenn), 13–17 (Cooking), steady to the end | ~20 |
| Images per sentence | 1.2–1.3 (≈ one per 8–12 words) | 1 per clause |
| List items | 0.6–0.8 s each, one image per item | same |
| Music / SFX | **none** — voice only, gaps at −60 dB | voice only by default; optional faint bed −30 dB (A/B test) |
| Loudness | −18.5 to −20.4 LUFS, LRA ≈ 2 LU (heavily levelled) | −14 to −16 LUFS, LRA ≤ 3 |
| Voice | male, median F0 118–134 Hz, even documentary delivery, likely TTS | same register |

## 2. Script skeleton

**Hook (0:00–0:40, ~120 words)** — one of two openers:
- *Viewer's present moment, flipped by history*: "Tonight, when the sun goes down, you're going to flip a switch…" → "But for 99.9 % of human history, that switch didn't exist." (Night 8M; Past Tense's 1.27M "3 Meals" copies it: "You woke up this morning and ate breakfast…")
- *Paradox with numbers, third person*: "Eight mice were placed inside a perfect world… Five years later, every single one of them was dead." (Calhoun 5M, zero "you")
- *Norm ×3 then us*: fish gills, bird bones, bear fur → "And then there's us." → three defects → "Something's off." (Aliens)

Then, in order:
1. Flip within 7–15 s ("But…", "But here's the thing", "But that's not quite right").
2. A precise number in the first 20 s (99.9 %, 300,000 years, 1968, 8.7 million species).
3. One sensory line ("You couldn't even see your own hand").
4. **Say the title question aloud by 0:25–0:45.**
5. Promise a bigger payoff, ideally a 3-item roadmap ("changes everything we know about sleep, storytelling, and being human").
6. "Let's start with ___." First named evidence (place / scientist / year) by 0:45. No intro, no logo, no "welcome back".

**Body (3–5 escalating sections, 1–2.5 min each)**
- Each section opens with a named study or site and the formula **year → person → institution → finding → "what it means"**.
- Each section ends on a "but" or a darker turn.
- A micro open-loop every 30–60 s, closed within ~20 s ("something nobody expected", "here's the part nobody talks about", "But here's what we lost").
- A bigger re-hook every 2–3 min ("there's another layer… the strangest part of all").
- One planted number paid off minutes later ("it would never come close to that number" → 2,200 peak, 3.7 min later).
- One recurring diagram that evolves across acts (Night: the segmented-sleep bar appears ~12 times, crossed out, ???-ed, relabelled).
- Restate the thesis every 3–4 min in new words.

**Twist at 70–85 %** — "But that reading was not what Calhoun actually said." / "So that settles it, right? Well, not quite."

**Landing (last 60–90 s)** — why it matters today → callback to the opening image (the light switch, tonight's dinner, the toxicology report) → one-line moral, then stop. ("The mice didn't have a choice. We still do.") No subscribe ask in Zenn; Cooking puts a like ask right after the thesis at 1:04, never at the end.

**Language** — short declaratives, fragments ("Light." "Everything." "Not yet."), anaphora ("They ate. They slept."), tricolon, antithesis ("Inside that circle… Outside that circle, you die"), "Not X. Not Y. Z.", coined labels repeated (behavioral sink, the beautiful ones). "You" heavy in the hook, then fades to "they / your ancestors"; save "we" for the last line. 3–9 sentences per video start with "But". One proper noun or number per section; ~1 number every 12–20 s.

**Accuracy** — every fact checkable; name the source. The references contain errors (dolphins do use tools; an invented "above 95 %"; a "June 2026" study). Do not copy that — run the facts past a web search before voicing.

## 3. Visual grammar

**What they actually are:** 100 % static stills (likely AI-generated in one locked doodle style), **hard cuts only**, no Ken Burns, no pop-ins, no draw-on, no crossfades. 96–99 % of frames are pixel-identical to the previous one. Text is baked into the image. Attention comes from *picture density and cut rhythm*, not motion.

**Our version:** same grammar in SVG, plus a small motion edge they don't have — a ≤ 0.25 s pop for the label/number, an occasional blink or slow push on emotional beats. Never let motion delay the information: the full picture must read within 0.3 s of the cut.

**Frame template**
- Background white `#FEFEFE` (≈ 35–75 % of shots) **or** a world colour + a flat **ground band on the bottom 25–35 %**.
- 1–3 subjects, centred, lots of empty space. Thick near-black outline (#0C0703–#2E312D), flat fills, no gradients.
- Background colour carries meaning:

| Meaning | Colours |
|---|---|
| Neutral / fact | white #FEFEFE, light grey floor #9A9A9A |
| Nature / outdoors | sky #A9CBE5 or #6BB3DD, grass #70B55E / #2DA94D |
| Night / ancient evenings | navy #2E4C73 / #273360 over brown ground #996D40 / #6E4120 |
| Darkness / dread | black #091118 with yellow eyes #FAEA03 |
| Space / existential | navy #31487A |
| Science / blueprint | #0B4585 |
| Theory / hypothesis | chalkboard #225034 |
| History / archaeology | kraft #ECDCBB / #C4A472, sand #C3A873 |
| Danger / hell / Mars | #F08B2C, #E43824 |
| Accents | red #F20F11 / #C0142B (numbers, X, arrows), fire #FA7C25, gold #E3AE42, yellow #FAEA03 |

**Characters** — white circle head, ring eyes with dot pupils, **eyebrows carry the emotion**, one-line mouth, thin limbs. Roles by one accessory: glasses + lab coat = scientist, pith helmet + khaki vest = explorer, caveman tunic (leopard print for Past Tense), top hat, crown. Recurring protagonist keeps the identity kit and gets a new prop each beat. Groups by colour variant (white mice = "the beautiful ones").

**Text on screen** (37–60 % of shots)
- 1–3 words, **ALL CAPS hand-lettered**, top-centre, often with a period ("16 YEARS.").
- Only numbers, names, key terms, or the punch fragment of the sentence. Black by default; **red for numbers, escalation, negation**, usually with a curved arrow to the object.
- Every spoken year / number appears on screen (a yellow date pop-up with black stroke in Cooking).
- ~6–12 full-frame word cards per video at act turns ("NOT AN EXAGGERATION", "INSOMNIA"), held 0.8–2 s.

**Symbol kit** — red X (≈ 17 per video), red arrows (20+), big "?" (≈ 10), green ✓, clocks, red circle highlight, "A = B" equation, before/after split screen with a black divider (≈ 35 in Cooking), pin maps, single-curve graph with a red callout, day/flip counter, icon rows (1 in 20), fading row countdown (10 → 0), gauge, battery, scale, dominoes, pie, thermometer, timeline with dated markers.

**Metaphor library** — illustrate the literal noun first; for abstract words keep a fixed metaphor: carousel, spider web, crumbling arch, scale, keyhole, fork in the road, dominoes, Pac-Man (digestion), lottery wheel, puzzle, "HUMAN v1.0 / UPDATE FAILED", angry sun with a knife. Jokes live in the picture, not the words.

**Build-ups** — same layout ± one element per phrase (a row of ticks, then "NOT ENOUGH" struck through). Cut to a variant still instead of animating (walker → eyes around him → leopard).

## 4. Edit sync

- Cut **on the breath**: a new shot starts 0.05–0.12 s *before* the phrase onset (median of all 4 videos), inside the micro-pause.
- 41 % of cuts at a sentence start, ~34 % one function word in ("In ‖ 1973"), ~24 % on a clause or list item.
- The picture shows the noun or number of the clause *about to be spoken*; it may lead the word by up to 3 s, never lag it.
- Split any clause longer than ~6 s into two shots.
- Needs real word timestamps (from the TTS or forced alignment), not letter-proportional estimates.

## 5. Titles

4–8 words (median 6, ~33 characters), Title Case, at most one ALL-CAPS word ("What If WE Are The Aliens?"). Formulas that won, with views:
- "What Did Ancient Humans [Do at Night / Actually Eat / Do All Day]?" — 8.05M, 893K, 445K
- "The [Name] Effect" (unexplained) — Calhoun 5.0M, Slotow 338K; median of 8 such ≈ 3× channel median
- "Why You [can't remember being a baby]" — 1.89M
- "Why Humans [Eat 3 Meals a Day]" — 1.27M
- "The Rarest Human Possible" — 1.18M ("Rarest" works only for humans: animals 3.4K)
- "What If [WE / you] …?" — 829K
- "Why Hasn't Anyone [Raised the Titanic]?" — 726K
- "What Happens After We Die?" — 584K
- "Did Ancient Humans get Cancer?" — 318K

Winners: a universal experience or primal curiosity (dark, sleep, food, death, memory). Losers: pets/animals without a human, vague drama ("Speedrun Extinction", "Real Life Superhumans"). "Actually" signals myth-busting.

## 6. Thumbnails

- One stick figure (big white round head, thick outline, big round eyes looking sideways) reacting with **mild unease or scepticism — never grinning** — to **one strange object that is the topic**.
- 0–3 words, ALL CAPS, **yellow #FEFE06 (Zenn) / #F5D70F (Past Tense) with a thick black outline**, across the top. The text **never repeats the title**; it adds a second hook: "2 SLEEPS?", "ROTTEN MEAT?", "WHO ARE YOU?", "RAISE IT?".
- Flat 2–3 colour background, or **pure black with one symbol and no text** for mystery topics (Calhoun's yellow eye 5.0M, "0:00" 584K).
- Red only as an arrow or accent on the strange thing.
- Flops drop the house style: photos, text-only, a cute animal with no human, busy multi-figure scenes.

## 7. Description & cadence

Zenn: 2–3 line cold open restating the hook in "you" → "In this video, we explore…" → 3–6 named beats → a comment question → 15–24 long-tail tags including named experts and places. No chapters.
Past Tense: opening question → explore paragraph → like/subscribe line → APA "Sources:" list; chapters on most videos (no measurable effect).
Cadence: one video every 4–6 days. No Shorts on either channel.

## 8. Checklist before render

- [ ] Title question spoken by 0:45; first named evidence by 0:45
- [ ] Re-hook every ≤ 60 s; twist at 70–85 %; callback ending with a one-line moral
- [ ] Every fact sourced and checked
- [ ] Median shot ≤ 3 s, none > 6 s, cuts on phrase onsets
- [ ] Every number / year / name on screen; ≥ 40 % of shots carry a 1–3 word caps label
- [ ] Background colour matches meaning; one accent per shot
- [ ] Voice 175–185 wpm, gaps ≤ 0.35 s, −14 to −16 LUFS
- [ ] Thumbnail: figure + one strange object + 1–3 yellow words that are not the title

## 9. Build recipe (first done on `episodes/11-toothache`, 207 shots, 8:02)

- **Script**: write `script.md` (one spoken line per line, `#` notes, `[S]` sarcasm marks, `{0.6}` pause overrides) → convert to `script.json` (pause 0.2 default, 0.15 for ≤ 3-word lines). Facts in `sources.md` first.
- **Voice**: `~/.venvs/pocket/bin/python scripts/voice.py script.json assets --lead 1 --tail 1.5 --speed 0.92` (jean ≈ 182 wpm). Check with whisper + difflib against the script; re-run only changed lines (hash cache).
- **Scenes** live in `parts/`: `00-base.js` (`// look: story`, `shot()` registry, palette, people + episode props), `10-…40-*.js` (one `shot(clip, word, (S) => {...})` per phrase), `99-run.js` (sort shots, cut at `W(c,w) − 0.08`, warn > 6.5 s). `assemble.sh` = `cat parts/*.js > scenes.js && build.py .` One shot per sentence; split sentences > 5 s and lists at the word that names the next picture.
- **Every shot**: `S.bg(meaning colour)` → subject → `S.label` (1–3 caps words, red for numbers) → figures `instant` (references are fully static). Label at y≈140–170 ⇒ keep floor figures at `s ≤ 1.6` (head top = gy − 359·s) or move the label to the side.
- **Review**: `python3 scripts/shot_times.py [from to]` prints start / length / review time per shot → `npx hyperframes snapshot --at <times>` (the contact sheets come out sorted as strings, not by time — read them all).
- **Thumbnails**: `cat parts/00-base.js thumb-src.js > thumbnails/thumb-a.js` then `build.py . --thumb …`. If headless Chrome hangs (> 60 s), kill that one process and re-run.
- **Finish**: `scripts/finish.sh EP none OUT.mp4` (voice only, −15 LUFS, build, check, 4K render).
