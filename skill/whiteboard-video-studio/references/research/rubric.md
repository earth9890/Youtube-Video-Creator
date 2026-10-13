# Script-writing research brief

## Why
We make ~1–8 min stick-figure explainer videos (channel "Black Hole Life": space, science, history, psychology "what if" topics). Voice is a TTS (Kyutai Pocket TTS, voice "jean"). The owner says our scripts are "really bad": weak storytelling, jokes and sarcasm not funny, too much "research/documentary" tone. They want **fun, funny content** that still explains one idea well — and they want to know "when to stop, when to start, low pitch, high pitch" (delivery/pacing).

Our current (rejected-as-weak) script, for reference:
```
Your house has walls, a roof, and Wi-Fi that only works in one corner.
What it might not have... is an exit.
Because some scientists think our whole universe is sitting inside a black hole.
Which honestly explains a lot. Mondays. Traffic. Your electricity bill.
Quick recap: a black hole eats everything. Stars. Planets. Light. Your weekend plans.
Once you're in, you can't get out. Like the family WhatsApp group.
And some physicists say: fall in deep enough, and boom, a brand new universe on the other side.
Like a cosmic Kinder Joy. Surprise! It's us.
So would we feel it? Nope. A black hole this big wouldn't even squish you. You'd still have to go to work.
Even the galaxies look suspicious. Way too many of them spin the same way. Like the universe was born on a merry-go-round.
Other scientists say: relax, it's probably nothing. Science is mostly maybe, in a lab coat.
But if it's true, every black hole up there could have a whole universe inside.
With its own people, in their own houses, with their own bad Wi-Fi.
Looking up, wondering if they live in a black hole.
Spoiler: they do. Wave hi. They're probably stuck in traffic too.
```
(Likely problems: jokes are generic "relatable list" gags bolted onto facts, no character, no escalation, no story, no stakes, no real curiosity gap.)

## Corpus
`~/videos/research/writing/txt/` — one file per video:
- `<channel>_<id>.timed.txt` — auto-captions with delivery marks: ` / ` = 0.3–0.6 s pause, ` // ` = 0.6 s+ pause, newline = 2.5 s+ gap. No punctuation (ASR). `[ __ ]` = bleeped word.
- `<channel>_<id>.clean.txt` — punctuated manual captions (only some videos).
- `_stats.json` — words, minutes, wpm, long pauses per minute.
- Titles/view counts: `~/videos/research/writing/ids_other.txt`, `~/videos/research/channels/*_table.json`.

## Report rubric (return as your final message, markdown, 1800–3000 words)
Quotes from transcripts: short only (≤15 words each), used as evidence. Templates must be in your own words.
1. **Hook (first ~30 s)** — line-by-line function of the opening in 3+ videos (e.g. "absurd claim → viewer address → promise"). Generalised hook templates.
2. **Joke engine taxonomy** — every joke type you find (e.g. anticlimax/undercut, deadpan understatement, hyperbole, modern-anachronism, callback, rule-of-three with twist, character voice / fake dialogue, narrator self-aware aside, absurd specificity, misdirection, roasting the viewer/subject, escalation run, literal interpretation…). For each: count across your corpus, 1–2 short examples, and a reusable fill-in template `[setup] → [turn] → [punch]`.
3. **Density & placement** — jokes per minute (count carefully in 2 videos), ratio of info lines to joke lines, where jokes sit (end of paragraph? after a fact? mid-sentence?), longest stretch with no joke.
4. **Story structure** — beat map (with % of runtime) for 2 videos: hook, promise, sections, re-hooks, escalation, twist, ending/callback. Transition phrases they use between sections. How a fact is delivered (fact sandwich? question first?).
5. **Sentence rhythm** — typical sentence lengths, short punchy fragments, rhetorical questions, "you" usage, lists, repetition.
6. **Delivery from the pause marks** — where the long pauses (` // `) fall relative to punchlines and section changes. Give 8–10 concrete examples: text before pause | text after. Is the pause before the punch, after it, or both? Do they speed up for asides? Use `_stats.json` wpm.
7. **Signature moves & phrases** — the 10 things that make this channel sound like itself.
8. **Steal / avoid** — top 10 rules we should adopt for a funny 1-min and 8-min script, and 5 things to avoid.
9. **Demo rewrite** — rewrite our black-hole script above (≈150–190 words, ≈60 s) in this channel's style. Mark delivery: `/` short beat, `//` long beat, `(fast)` aside, `(slow)` emphasis.
