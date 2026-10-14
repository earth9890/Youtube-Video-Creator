# Story-skeleton analyst brief (one agent per channel group)

**Why:** the owner said our finished video "does not have a story, goal or motive. It's like reading a 5-year-old boy's essay." Our scripts were *fact → joke → fact → joke* lists linked by "and also". The goal is to learn **how top videos turn facts into a story**, as reusable skeletons we can pour any topic into. We copy **structure, never words**.

## Inputs
- Transcripts: `~/videos/research/writing/txt/<channel>_<id>.clean.txt` (plain) and `.timed.txt` (with `[mm:ss]` stamps and pause marks ` / ` ` // `).
- Titles and views: `~/.claude/skills/whiteboard-video-studio/references/research/data/corpus-*.txt`.
- Our earlier per-channel writing reports (jokes, hooks, delivery): `~/.claude/skills/whiteboard-video-studio/references/research/<group>.md`. Don't repeat them; this pass is only about **story**.

## For EVERY video in your group, extract its skeleton
Write one block per video into `story-skeletons/<group>.md`:

```
### <channel> — <title> (<views>, <minutes> min)
- Story engine: mystery | mission/quest | what-if escalation | real-person discovery | survival/countdown | rise-and-fall | versus/conflict | other:<name>
- Protagonist: who carries the story (you / a named person / a test dummy / humanity / an object) and **what they want**
- Central question (the open loop): the exact question planted in the first ~30 s, and when (timestamp) it is finally answered
- Stakes: what is lost if the answer goes the wrong way
- Obstacle / antagonist: what is in the way (nature, physics, a wrong belief, a rival, time)
- Beat chain: 6–14 beats, each one line, each one starting with BUT / THEREFORE / SO / AND (be honest: mark AND where the video just adds). Include timestamps.
- Open loops: list every smaller question planted mid-video and where it pays off (timestamps). Note the typical gap between new loops.
- Turns: the reversal(s) and twist(s), with timestamps (e.g. "everyone believed X — but").
- Ending: how the central question is resolved, plus the last image or line (callback? new question? sting?)
- Where facts sit: how facts are fed to the viewer as answers to questions the story raised (give 2 concrete examples, paraphrased)
- Where jokes sit: on top of which beats (story beat vs digression)
- Transplant template: the skeleton as fill-in-the-blanks, topic-free (e.g. "[Character] wants [goal]. BUT [obstacle]. THEREFORE [attempt 1]…")
```

## Then, across your group
- **Engine counts:** which story engines your channels use most, and which ones the highest-view videos use.
- **But/therefore ratio:** the share of beats that are BUT/THEREFORE vs AND, top videos vs the rest.
- **Loop cadence:** the median seconds between new open questions, and how long the central question stays open (as % of runtime).
- **How a 1-minute version would compress the skeleton:** which beats survive.
- **5 rules** a writer could apply tomorrow, each with evidence.

Also write `story-skeletons/data/<group>.json`: a list of `{channel, id, title, views, minutes, engine, protagonist, want, central_question, answered_at_pct, beats:[{t, link:"BUT|THEREFORE|SO|AND", text}], loops:[{opened, closed, q}], turns:[...], ending}`.

Paraphrase only. Never paste transcript sentences longer than ~10 words: the transcripts are copyrighted.
