# Script & delivery research (2026-10-13)

Why this exists: the owner rejected our scripts as "really bad… storytelling is really so weak… sarcasm, jokes… completely bad". We studied the top videos of 8 channels to learn how funny explainers are written and delivered. The rules distilled from this live in `../script-writer.md`. This folder is the evidence behind them: read it when a rule is unclear, or when you need more examples than the playbook gives.

## Corpus: 54 transcripts, about 8 h of narration

| Channel | Videos | What we learned from it | Report |
|---|---|---|---|
| Zenn (@Zenn0009) | 10 + 4 whisper refs | Structure, hooks, calm dry narrator, jokes built from facts; 1.1 jokes/min (top videos fewest) | `zenn.md` |
| Past Tense (@PastTense01) | 8 | Second-person cold opens, "It's not X. It's Y.", rising counters, bookend callbacks | `past-tense.md` |
| Sam O'Nella Academy + Casually Explained | 6 + 5 | **Comedy benchmark**, 5.9–6.5 jokes/min: skits, fake definitions, broken lists, timing | `comedy-samonella-casuallyexplained.md` |
| Half as Interesting + OverSimplified | 6 + 6 | Staying funny while explaining facts; characters and fake dialogue carry exposition; runners | `hai-oversimplified.md` |
| Kurzgesagt + Sciencephile the AI | 6 + 6 | **Space/science benchmark**: awe, scale, "you" placed inside the physics, test-dummy victims | `space-kurzgesagt-sciencephile.md` |
| Delivery (9 narrator audios + 160 TTS test clips) | — | Pauses, speed and pitch per line type; what Pocket TTS jean can and can't control | `delivery-and-tts.md` |

- **Corpus lists** (IDs, views, titles): `data/corpus-*.txt`; words, minutes, wpm and pauses per minute in `data/corpus-stats.json`.
- **Cross-channel synthesis** in short notes: `synthesis-notes.md`.
- **Rubric** each analyst followed (reuse it for a new channel): `rubric.md`.
- **Raw measurements:**
  - `data/delivery_table.txt`: per-class gaps, rate and pitch.
  - `data/run2.txt`, `data/run3.txt`, `data/results.tsv`, `data/post.tsv`, `data/determinism.txt`: TTS lever tests.
  - `data/delivery-labels.json`: hand sentence-class labels.

Raw transcripts and audio are **not** stored here (copyrighted). They live locally at `~/videos/research/writing/{subs,txt,audio}`, and `scripts/research/fetch_corpus.sh` rebuilds them.

## Headline numbers

| | Zenn | Past Tense | Sam O'Nella | Casually Expl. | HAI | OverSimplified | Kurzgesagt | Sciencephile |
|---|---|---|---|---|---|---|---|---|
| wpm | 186–208 | 172–180 | 188–224 | 190–228 | 197–225 | 185–222 | 155–167 | 160–184 |
| joke beats/min | ~1.1 (0.35–2) | ~0.8 | ~5.9 | ~6.5 | ~2.9 | ~3 (1:1 → 1:8) | ~0.7 | ~3 |
| long pauses/min | 0.4–2.9 | 0.6–2.6 | 0.9–5.5 | 1.4–6.9 | 0.2–4 | 2.5–6.5 | 5.3–9.7 | 4.6–8 |
| relatable-life gags (Mondays, Wi-Fi…) | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |

## The 10 findings that changed how we write
1. **Every joke is the fact said in a funnier shape.** Generic relatable gags appeared 0 times in 8 hours. That was our #1 failure.
2. **The narrator is a character:** older brother, instruction manual, petty host, evil AI, calm guide. Ours is the calm, slightly-too-honest tour guide.
3. **A test dummy** (a named stick figure) suffers the physics so the viewer can watch it happen.
4. **The punch is the shortest sentence in its paragraph and comes last.** Sections end on a punch, never on a bare fact.
5. **Fact sandwich:** question first, Earth anchor, named evidence ("In 2010, // physicist…"), number turned into a household unit, a 3–5 word verdict ("Not X. Y."), then the joke.
6. **Hooks:** a concrete image or question first, the title claim by about 0:08–0:30. Never open with a date or a definition.
7. **Endings:** a callback to the opening image, changed. Quiet or dry. No new joke.
8. **Delivery:** normal gaps between lines are tiny (0.1–0.3 s). The long beat goes *after* the joke. One-word punches get a beat before them and are said lower and faster. Lists and asides get no pauses. Section changes speed up rather than pause.
9. **The TTS reads gaps, clip splits, speed and ±1 st pitch reliably,** and ignores punctuation ("!", "...", "—", CAPS). Mark timing with `/` and `//`, not punctuation.
10. **A trim bug** in our voice.py added about 0.5 s to every gap. That was why our voiceovers sounded slow and documentary-like. Fixed.

## Redo or extend the research
```sh
S=~/.claude/skills/whiteboard-video-studio/scripts/research
sh $S/fetch_corpus.sh ~/videos/research/writing 6 NewChannelHandle      # top-6 by views -> txt/*.timed.txt
# analyse: spawn one agent per channel group with references/research/rubric.md as the brief
# delivery: yt-dlp -x audio -> 16 kHz wav -> whisper-cli -ojf -> ~/.venvs/pocket/bin/python $S/prosody.py X.wav X.json
#           label sentence classes (data/delivery-labels.json format) -> classify_stats.py
# TTS levers: ~/.venvs/pocket/bin/python $S/tts_levers_test.py   (punctuation / speed / pitch / seed effects)
```
`vtt2txt.py` writes ` / ` for 0.3–0.6 s gaps, ` // ` for 0.6 s+, and a newline for 2.5 s+ (estimated from YouTube auto-caption word times; good for relative patterns, ±0.15 s).
