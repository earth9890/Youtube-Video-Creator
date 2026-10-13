# Script guide — emotional whiteboard scripts
> Evidence-backed rules for every line (hooks, psychology table, copy, staging) are in `craft-playbook.md`; this file is the format + visual vocabulary.
> **Writing any script: read `script-writer.md` first (the law: joke rules, shapes, hooks, delivery markup, lint).** Long-form story explainers: §0 below + `story-explainer.md`. The 45–75 s motivational format follows after §0.

## 0. Long-form story scripts (8–9 min)

### 0.1 Pick a topic that is out of the box — the idea engine
Weak topics are the #1 reason a video dies (Zenn's 8M and 15K videos have the same style, length and voice). Never take the first idea. **Generate 30, score, keep 3, then pick 1.**

**Six idea generators** (each produced a ≥ 1M hit):
1. **Ancient × mundane** — a routine everyone did today, asked about the deep past: "What did ancient humans do at night / when they were sick / when it rained / with their dead / for fun?" (8.05M, 893K, 445K)
2. **The named experiment nobody has heard of** — a real study with a shocking result, titled only by its name: "The Calhoun Effect" (5.0M). Source: psychology/ecology/medicine history — mouse utopias, isolation experiments, prison studies, famine studies.
3. **The blank spot in everyone's life** — something every viewer experienced but can't explain: baby memory (1.89M), hearing your own voice, why time speeds up with age, why you can't tickle yourself.
4. **The obvious thing nobody did** — "Why hasn't anyone raised the Titanic?" (726K). Ask "why don't we just…?" about a famous problem.
5. **What if (about us)** — a counterfactual where *we* are the subject: "What if WE are the aliens?" (829K), "What if nobody held you as a baby?"
6. **The rarest / most extreme human** — "The Rarest Human Possible" (1.18M). Only about humans — the animal version got 3.4K.

**Out-of-the-box moves** — apply 2–3 to every candidate before scoring:
- *Flip the frame*: tell it from the mouse's side, the ancestor's side, the future historian's side.
- *Collide two worlds*: ancient + modern routine (meals, sleep, light), body + history (cancer in fossils), psychology + one famous event.
- *Zoom to one person*: one named person or animal whose story carries the whole idea (Calhoun, one Wonderwerk family, one 1800s sleeper).
- *Find the paradox*: perfect world → extinction; more light → less sleep; more food → hungrier. If there is no paradox, keep looking.
- *Make it about tonight*: end the hook in the viewer's evening ("Tonight, when you…").
- *Steal the structure, never the topic*: don't remake a Zenn title; find the topic they *haven't* done that fits the same generator.

**Score each candidate 0–2 on six tests (keep ≥ 9 / 12):**
| Test | 2 = |
|---|---|
| Universal | every viewer has lived it or wondered it (dark, sleep, food, death, memory, fear, love) |
| Paradox / surprise | the true answer contradicts what people assume |
| Named evidence | ≥ 3 real studies / sites / people with years, checkable online |
| Thumbnail object | one strange object you can draw that makes people say "wait, what?" |
| Title in ≤ 7 words | fits one of the 6 generators without explaining itself |
| Our angle | ties to the human mind / how to live (Black Hole Life's identity) in the last 60 s |

### 0.2 Beat sheet (≈ 1,600 words, ≈ 9 min at the jean voice's ~180 wpm)
| Beat | Time | Words | Must contain |
|---|---|---|---|
| Cold open | 0:00–0:15 | ~45 | the viewer's present moment *or* a paradox with numbers; flip with "But…" |
| Stakes | 0:15–0:30 | ~45 | one precise number, one sensory line |
| Question + promise | 0:30–0:45 | ~45 | the title question spoken; 3-item payoff roadmap; "Let's start with ___." |
| Section 1 | 0:45–2:30 | ~300 | named evidence (year → person → place → finding → meaning); ends on "but" |
| Section 2 | 2:30–4:15 | ~300 | escalation; plant one number that pays off later |
| Section 3 | 4:15–6:00 | ~300 | the darkest / strangest turn; re-hook "there's another layer…" |
| Twist | 6:00–7:15 | ~220 | "But that's not what actually happened / what he actually said" |
| Why it matters to you | 7:15–8:30 | ~220 | modern life parallel; one small concrete thing the viewer notices tonight |
| Callback | last 15 s | ~40 | return to the opening image; one-line moral; stop |

Micro loop every 30–60 s ("but there was one thing nobody expected"), closed within ~20 s. Keep a **loop ledger** in the scene board: every open loop with its open time and close time; none left open at the end except the moral.

### 0.3 Line rules
- Median sentence 8–11 words; one in four ≤ 5 words ("Light." "Not yet." "Everything changed.").
- Start 5–9 sentences with "But". Use "you" in the hook, "they / your ancestors" in the body, "we" only in the last line.
- One number every 15–20 s — **written as words** in script.json (TTS reads "99.9%" as "99%").
- Every named fact gets a source line in `sources.md` beside the script; verify each one with a web search before the voice is generated. No invented percentages, no "a recent study" without a name.
- Kill filler: "basically", "actually" (except in the title), "in this video", "welcome back", "make sure to subscribe".
- Read the hook aloud: if the title question isn't spoken by 0:45, cut.

### 0.35 Tone — SUPERSEDED by `script-writer.md` (2026-10-13). Old notes kept for history; follow script-writer.md.
The references are almost joke-free (≈ 1 joke per 5 min). Our edge: **a deadpan, sarcastic narrator** — facts stay 100 % true, the commentary is the joke. Target **one laugh beat every 30–45 s** (≈ 12–15 per video), never two in a row, none in the final 20 s (the moral lands straight).
Techniques (each a single short line right after a fact):
- **Deadpan understatement** after something horrific: "They drilled into living teeth. With a rock. Relaxing."
- **Modern comparison**: "Ancient dentistry had no reviews, no receptionist, and no anaesthetic. Honestly, two out of three isn't bad."
- **Fake reassurance**: "Don't worry. It gets worse."
- **Mock-respect for bad ideas**: "For three thousand years, the leading theory was a tiny worm. Respect the commitment."
- **The rule of three, last item absurd**: "Honey, salt, and — for some reason — mouse."
- **Talk to the viewer's present**: "Tonight, when you complain about your dentist, remember: yours has a degree."
- **The visual joke**: the line is straight, the picture is sarcastic (a 5-star review card for a cave dentist, a "PAIN" meter breaking).
Rules: sarcasm targets ideas, tools, and the situation — **never a real group, culture, illness, or the viewer's suffering**; punch up, not down. Keep every joke ≤ 8 words. If a joke needs a fact to be bent, cut the joke.

### 0.4 script.json for story mode
Pauses are tiny: 0.15–0.3 after sentences, 0.1 between list fragments, 0.6 only before the final line. Lead 1.0 s, tail 1.5 s (`--lead 1 --tail 1.5`).

## Structure (45–75 s, ~85–120 words)
| Beat | Purpose | Example (Never Give Up) |
|---|---|---|
| Hook | concrete claim/stake/number (a bare question is weak — see craft-playbook §A) | "Nobody quits in one day. They quit in small ways." |
| Tease | promise a secret | "Here's something most people will never tell you." |
| Remove excuses | 2–3 "you don't need…" | smartest in the room / connections, luck, a perfect plan |
| The one thing | single clear requirement | "You just need to keep showing up, when everyone else gives up." |
| Emotional middle | repetition + vulnerability | "Show up again. Every single day. Even when nobody is watching." |
| Contrast | what others do | scrolling, comparing, waiting for the perfect moment → "you should be building yours" |
| Fail & rise | normalise failure | "Learn something daily. Make mistakes. Fail. Then get back up, and start again." |
| Reframe | slogan line | "Success isn't built in one big moment. It's built in the quiet days you refused to quit." |
| CTA | action + brand line | "So never give up. Start doing something about it." |

Rules: second person, present tense; short sentences (5–14 words); rule of three; repeat key phrase ("show up") 3×; one emotional line that names the pain ("even when it hurts / nobody is watching"); end on an imperative. No filler ("basically", "actually"). Read aloud at ~100 wpm — if a sentence needs a breath, split it.

## script.json
```json
[["You want to succeed in life?", 0.8], ["Here's something most people will never tell you.", 1.0], ...]
```
pause = silence after the clip. Use 0.5–0.7 between fragments ("Learn something daily." / "Make mistakes." / "Fail."), 0.8–1.0 after sentences, 1.4 where the previous scene needs time to finish drawing. Last pause 0.

## Visual vocabulary (clause → scene)
| Meaning | Visual |
|---|---|
| address viewer | hero draws, turns (face appears), points at camera |
| question / idea | big ?, scratch head, yellow bulb |
| most people / crowd leaves | 4 figures, 3 walk off, speech bubble with "…" |
| smarts | brain (pink, folds) shoved aside by hero |
| status / school | classroom board, podium winner, hero walks past |
| luck / connections / plan | handshake, 4-leaf clover (heart leaves), horseshoe (nail holes), roadmap → all crossed out / crumpled |
| persistence | staircase; hero climbs, others sit and vanish; motion lines at feet |
| daily habit | calendar, green ticks one per day |
| showing up anyway | rain cloud + umbrella |
| distraction / comparison | couch + phone, trophy vs empty pedestal (sad face) |
| waiting | big alarm clock, hands spin, foot tap |
| building | desk, laptop, books, notebook, growing plant |
| failure | open book, wall of bricks, trip → flat on ground, red × dizzy marks |
| payoff | mountain progressively drawn, hero climbs along the pen, sun, flag, bold underline |
| closing line | big handwritten "Never give up." (`#big`) |

Scene length target 2.5–3.5 s; a scene with ≥ 3 props needs ≥ 3 s. Merge consecutive clauses into one scene when they share a visual (e.g. stairs across "keep showing up … gives up").
