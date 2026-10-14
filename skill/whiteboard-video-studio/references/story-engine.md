# Story engine: turn facts into a story before writing a single joke

> Built 2026-10-13 after the owner's verdict on episode 13 v1: *"the video does not have a story, goal or motive. It's like reading a 5-year-old boy's essay."*
> Evidence: **53 top videos broken into story beats** (Zenn, Past Tense, Sam O'Nella, Casually Explained, Half as Interesting, OverSimplified, Kurzgesagt, Sciencephile). The per-video skeletons, timestamps and JSON are in `research/story-skeletons/`.
> **Order of work:** story card → beat chain → facts as answers → jokes on top (`script-writer.md`) → delivery marks. `script_lint.py` FAILs a script with no story card or with an AND-chain.

## 0. The diagnosis, in numbers

| | Hits | The rest |
|---|---|---|
| Beats linked by BUT / THEREFORE / SO (not AND) | Zenn's 8M + 5M videos: **87–88 %**. HAI + OverSimplified: **89 %** of 166 beats. Sam O'Nella's top 4: **75 %** | Zenn/Past Tense under 200K: **56 %**. Kurzgesagt's two weakest: 50 %. Sam O'Nella / Casually Explained lists: **33 %** |
| BUT share (reversals) | **34 %** (Zenn/Past Tense ≥ 1M) | **13 %** (bottom 4) |
| Turns (reversals and twists) per video | **4.0** | **1.25** |
| When the title question is answered | **82–92 %** of runtime, every video over 1M | Answered at 2 %, 13 % and 48 % → average 163K views |
| A character with a goal in the first 15 s | HAI's top 3 (a sued traveller, Amy buying a Rolex, an airline); Kurzgesagt's top 3 (a virologist curing her own cancer, AIs breaking out, a country dying) | HAI's bottom 3 open on a train, a fly-over tour and a pharmacy shelf |

**Our episode 13 v1 was the "Rarest Traits" skeleton:** 83 % AND, no protagonist, no stakes, no ending, 261K views. The same list with a running counter and a reveal ("Rarest Human") got **1.18M**.

**One-line law: every fact must be the answer to a question the story just raised. If a beat can't start with BUT or THEREFORE, cut it or move it.**

---

## 1. The story card (fill in BEFORE any research rabbit-hole; it goes at the top of `script.md`)

```
# engine: mystery | mission | what-if | discovery | survival | versus | rise-and-fall
# want: <who> wants <concrete thing>            (a person, "you", the test dummy, a cell, a star — never "we'll learn about")
# obstacle: <what is in the way>                (physics, a wrong belief, a rival, time, the body itself)
# stakes: <what is lost if it goes wrong>       (concrete, felt: your sleep, Dave's 10 kg, the Earth)
# question: <the ONE open question, said by ~0:08, answered at ~85 %>
# change: <what is different at the end>       (the want granted in a twisted form, a belief flipped, the opening image changed)
# beat: AND  <the cold open, the only AND allowed>
# beat: BUT  ...
# beat: THEREFORE ...
# ...
```
Rules:
- **Protagonist + want in the first 15 s.** With no human hero, give the cell, the planet or the star a goal and an enemy, or use "you" with a *job and a danger* (Kurzgesagt: "you hold a flashlight on the surface"). A named test dummy (Dave) takes the deaths so that "you" survives to the ending.
- **"It's impossible" comes before "how it works".** All 6 HAI videos make the premise look doomed, illegal or impossible within 6–40 s. That BUT *is* the central question.
- **Hold the answer until ~85 %.** Give partial answers ("but that's only half"), never the full one.
- **Pair every BUT with a THEREFORE.** All-BUT reads as a list of obstacles (HAI's bottom 3: 41 BUT vs 23 THEREFORE; top 3: 34 vs 30).
- **About 4 turns.** One early myth-break (0:10–0:30) and one **late reversal at ~75 %** ("everyone believed X — BUT"). 7 of 18 Zenn/Past Tense videos have the late one, including both mega-hits.
- **Protect the fake defeat:** it looks lost, then turns. Every Kurzgesagt top-3 video has one: the tumour doubles, but it's the immune army arriving.
- **The last-hope rung** (Sam O'Nella, Casually Explained): at 65–80 %, the viewer's own "surely…?" ("surely the sword fights are fun?") gets crushed.
- **Endings pay off the hook.** 7/11 comedy and 11/18 Zenn/Past Tense endings call back the opening. The best grant the want *in a twisted form*: Guiteau gets his fame via the gallows; a chef's top prize comes from a tyre company.
- **Jokes sit ON story beats**, usually on the turn or the reaction, never as a free-floating digression. A digression lasts 10–20 s and ends with "anyway, back to…". The two Zenn mega-hits have only 0.35–0.7 jokes/min: story first, then jokes.

---

## 2. One-minute shape (≈ 6–8 beats, ~150–190 words)

The beats that survive compression in all 4 groups are **the BUT and THEREFORE beats. Every AND beat is cut first.**

| # | Beat | Time | Link |
|---|---|---|---|
| 1 | **Cold image + protagonist + want** ("Dave lost ten kilos. He's thrilled.") | 0–6 s | AND (the only one) |
| 2 | **The BUT that makes it strange or impossible → the central question, said out loud** ("BUT ten kilos of *stuff* can't just vanish. So where did it go?") | 6–12 s | BUT |
| 3 | **THEREFORE first attempt / obvious answer**, which fails (the experts' guess; suspect #1) | 12–22 s | THEREFORE |
| 4 | **BUT "that's only half" / the fake defeat / the wrong suspect exposed**, with one concrete number | 22–32 s | BUT |
| 5 | **THEREFORE the real answer, held back, then revealed** with named evidence (year + person + method) | 32–45 s | THEREFORE |
| 6 | **Last hope crushed / late twist** ("so just breathe faster? — No.") | 45–52 s | BUT |
| 7 | **Change + callback:** the want granted in a twisted form; the opening image comes back changed | 52–62 s | SO |

---

## 3. The skeleton library (pick one; pour the topic in)

Each has a source hit. Full per-video versions with timestamps are in `research/story-skeletons/*.md`.

| Engine | Use when | Skeleton | From |
|---|---|---|---|
| **Mystery / whodunit** | Something vanishes, appears, or nobody can explain it | [Victim] lost / found [X]. BUT [X] can't just [vanish]. SO where did it go? Suspect 1 (the obvious one) → BUT ruled out by [fact]. Suspect 2 → BUT [number]. THEREFORE [named person] followed the evidence → the culprit is the least expected → BUT the twist: [it's still in you / it was you]. Callback. | Zenn *Night* (8M), HAI drug names, Sciencephile *Gray Holes* |
| **Mission / heist** | A goal looks impossible or illegal | [Character] wants [goal]. BUT it's [impossible / illegal / doomed] (the central question). THEREFORE attempt 1 → BUT [wall + real case]. THEREFORE smarter attempt → BUT "the last step is the hardest". Twist: the obvious route is the wrong one. Verdict + sting. | HAI *Rolex*, *Iran airline*, *skiplagging* |
| **What-if escalation** | "What if X happened / you did X" | You [do X]. Second 0: [first effect]. THEREFORE [worse]. BUT [the thing you'd expect to save you] fails. THEREFORE [worse still]. Fake defeat → a kernel of hope → the answer → widen to "you". | Kurzgesagt *Korea*, Sciencephile *every second* |
| **Real-person discovery** | A scientist or someone ordinary found something | [Person] noticed [odd thing] *in their own life*. Everyone said [wrong belief]. THEREFORE they [method]. BUT [setback / ridicule]. THEREFORE [experiment] → [number]. BUT "here's what everyone missed": [late reversal]. What it means for you. | Zenn *Calhoun* (5M), Kurzgesagt *Cancer* (21M) |
| **Dream vs reality** | Something glamorous is secretly awful (or the reverse) | You want to be [X]. Bad news. Rung 1: an everyday misery → THEREFORE rung 2 (caused by rung 1) → THEREFORE rung 3 → last hope: "surely [the fun part] is good?" → crushed → callback to the dream. | Sam O'Nella *Pirate* (19.9M) |
| **Body as battlefield** | Biology with no human hero | [Cell / organ] wants [survive / win]. Enemy: [X]. THEREFORE its weapon → BUT the enemy adapts → an ally turns into a problem → THEREFORE a switch → a result with a number → you. | Kurzgesagt *Cancer*, *Immune system* |
| **Rise and fall (biography)** | A person with one extreme trait | Trait → rejected BECAUSE of the trait → the trait becomes an asset → the asset backfires → a twisted ending (the want granted cruelly). | Sam O'Nella *Tarrare* (20.6M), *Guiteau* |
| **Myth-bust list** | Only when the material really is a list | Each item = "you think X, BUT Y" (a reversal *inside* every item). Add a **counter** or a combination act, and end on the opening object. | Sam O'Nella *Misconceptions* (23.7M), Past Tense *Rarest Human* (1.18M) |
| **Versus / conflict** | Two sides with wants (nations, theories, cells) | A wants X; B wants Y; they say it out loud (dialogue). Clash → escalation ladder (tax → boycott → repeal → tax again → troops) → reversal → sting that opens the next question. | OverSimplified (all) |
| **Tier list / descent** | Ranking threats, places, layers | Rank by ONE metric; each entry = scary premise → BUT one limiting fact. The top spot is the twist (the least exotic one, or "it's us"). | Sciencephile *Cosmic threats*, *Iceberg* |

---

## 4. Process (do it in this order; never start from the facts)

1. **Find the odd fact that holds a want.** Ask: who wants something here? What goes missing? What looks impossible? What does everyone believe that is wrong?
2. **Pick the engine** (§3) and **fill the story card** (§1). If you can't fill `want`, `obstacle` and `stakes` in one line each, the topic isn't a story yet: change the angle, not the jokes.
3. **Write the beat chain** with links. Target ≥ 75 % BUT/THEREFORE/SO, ≥ 1/3 BUT, the central question answered at ~85 %, ≥ 3 turns (1-min) or ~4 per 8 minutes, and one fake defeat or last hope.
4. **Only now mine the facts**, as answers to the questions the beats raise. Facts that answer nothing get cut, however cool they are. (Episode 13 v1 opened with "sixty percent water" and the sugar cube: cool facts, but they answer no question the story asked.)
5. **Draft** with `script-writer.md` (narrator voice, fact sandwich, joke recipes). Put each joke on a beat: the reaction to a BUT, the punch of a reveal, the twisted ending.
6. **Lint, then the read-aloud test:** after every line, would a viewer ask "and then what?" or "wait, why?" If the honest answer is "so what?", the line is an AND. Fix it or cut it.

---

## 5. Worked example: episode 13, "You Are Not Fat"

| | v1 (rejected: "a 5-year-old's essay") | v2 (mystery) |
|---|---|---|
| Engine | none (a fact list) | mystery / whodunit |
| Want | none | Dave lost 10 kg and wants to know where it went |
| Question | none spoken | "Where did ten kilos of Dave go?" (≈ 0:08, answered ≈ 0:45) |
| Links | 9 of 11 AND | 1 AND (the open), then BUT/THEREFORE |
| Turns | 0 | experts wrong (heat) → suspects ruled out → breath reveal → the fat cells are still there |
| Ending | restates the facts | twisted payoff: you are not fat, you are a slow exhale; the cells are still waiting |

See `examples/` and `episodes/13-not-fat/script.md` for the full v2 text.
