# Long-form batch brief (episodes 28–37, 2026-10-20)

The owner asked for 10 Zenn-style long videos (8–10 min each) on Black Hole Life: similar *kinds* of titles and topics
to the Zenn channel, but **our own research, our own story (Dave + narrator), our own visuals**. Owner: "best scripts".

## Hard rules
- **Never copy Zenn's (or anyone's) transcript, wording, sequence of facts or jokes.** Study their structure only
  (hook timing, section rhythm, open loops, twist placement). Reference data: `~/videos/research/ref/{night,calhoun,aliens,cooking}/`
  (transcripts + cut lists) and `~/videos/research/channels/` (catalogue stats). YouTube's reused-content policy can demonetise
  the channel for re-voiced scripts, and it is their copyright.
- Every fact verified against a primary or strong secondary source (web search / fetch). `sources.md` in the ep24 table
  format: script line → claim → exact quote/number → source URL, plus "Checked and NOT used". Contested findings: say so in
  the script ("probably", "one study found") and explain in sources.md.
- Kind, curious, funny-from-facts. No gore, no medical advice, nothing mean about real people.
- Do not render, upload, or git add/commit/push. Use `trash`, never `rm`.

## Script format (read the skill first)
Invoke the Skill tool `whiteboard-video-studio`. Read `references/story-explainer.md` (the long-form format: numbers to hit,
skeleton, language), `references/script-writer.md` (markup §7, jokes, self-score §9), `references/story-engine.md`, and
`examples/toothache-story/` (our 8-min example). Our tone = `script-writer.md` (fun first, jokes built from facts);
structure = `story-explainer.md`. Dave is the recurring test dummy (a stick figure everyman); the narrator is calm,
curious, slightly-too-honest. Give the episode a runner object or diagram that evolves across sections.

- **Length: 1,350–1,450 spoken words** (the narrator voice, VoiceStudio "The Storyteller", runs ~150–160 wpm → 8.5–9.5 min).
- Hook in the first 40 s per story-explainer §2; say the title question aloud by ~0:30; 4–6 escalating sections; a twist
  at 70–85 %; landing that calls back to the opening image; last line short.
- Mark sections with comment lines `# chapter: <short chapter title>` immediately before the first line of each section
  (used later for YouTube chapters).
- **Voice-safe markup (VoiceStudio garbles very short clips):** every line becomes clips split only at `/` and `//`.
  - One line = one sentence or a few short sentences, **6–30 words per clip**. Fragments ("Light. Everything. Not yet.")
    go together on one line WITHOUT slashes, so they are one clip.
  - Use `/` or `//` only between chunks of ≥ 4 words each. Never a clip of 1–3 words.
  - Numbers as words ("two thousand eight", "forty-five percent"). No symbols, no abbreviations (write "doctor", "versus").
  - "Quoted" text = a character voice; keep quotes ≥ 4 words.
- Run `python3 scripts/script_lint.py script.md --long` from the skill folder; fix fails (warnings OK if justified).
- Put the self-score (§9) and the beat sheet as `#` comments at the top, like episode 24/27.

## Output
`~/videos/black-hole-life/episodes/<NN>-<slug>/script.md` and `sources.md`. Then also write `title.md` with 5 title
options (pick first; Zenn-style: short question or "The X Effect", ≤ 55 chars, no clickbait lies) and 2 thumbnail ideas
(1–3 words + one image) per `references/thumbnail-designer.md`.

Final reply: folder, chosen title, word count, estimated minutes, lint result, self-score, chapter list, 3–5 key sources,
and any fact you were unsure about.
