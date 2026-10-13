# Delivery study: real narrators vs Pocket TTS (jean)

> Status 2026-10-13: the trim bug described below is **fixed** in `scripts/voice.py` (10 ms frame-energy trim), and the proposed markup was implemented as the `script.md` format (see `../script-writer.md` §7.3, which simplified the per-type JSON proposed in Part C).

I measured nine narrator videos and tested Pocket TTS (voice jean), and found a problem in `voice.py` that comes before any of the delivery rules.

**The problem:** almost every TTS clip starts with a click at sample 3. `voice.py` trims silence one sample at a time at −42 dBFS, so the click survives the trim. As a result, 113 of the 160 test clips (all 3 seeds of every variant) kept a near-silent lead-in (about −68 dB) of 0.4–0.6 s (median 0.57). So every line gap in `voice.py` output is really your `pause` value plus about 0.5 s, and `clipt.json` start times sit about 0.5 s before the speech. The pros' normal gap is 0.1–0.3 s, so this alone makes our voiceover sound slow and documentary-like. The fix is to trim on 10 ms frame energy (frames above peak − 30 dB) instead of single samples. I did not edit the skill.

## Part A: what the narrators actually do

**Method:** whisper small.en with DTW word timings, a YIN pitch tracker I wrote, and an energy-based pause detector that adapts to background music. I checked the pause detector against TTS audio with known gaps (0.15–1.2 s); it read them within ±0.16 s. Pitch values are semitones (st) relative to each narrator's own median; speech rate is relative to their own fact lines.

Classes: F = fact, S = setup, P = punch (whole sentence), p = short punch (7 words or fewer), A = tag (the self-aware line after a punch), Q = question, T = section start, V = character voice, R = serious-channel dramatic line.

**Funny narrators (SamONella ×2, CasuallyExplained ×2, Half as Interesting ×2), medians:**

| class | n | gap before (s) | gap after (s) | rate | pitch | last 3 words | range vs own | vs previous line |
|---|---|---|---|---|---|---|---|---|
| F | 97 | 0.21 | 0.22 | 0% | −0.2 | −3.3 | 0 | – |
| S | 36 | 0.19 | 0.17 | −3% | +0.3 | −3.7 | 0 | −7% rate, +0.4 st |
| P | 99 | 0.21 | 0.24 | 0% | −0.2 | −3.5 | −0.1 | −0.4 st |
| **p** | 7 | **0.56** | 0.18 | **+26%** | −0.7 | +0.1 | **−2.3** | **−2.1 st, +29% rate** |
| A | 14 | 0.14 | 0.14 | +1% | −0.8 | −3.3 | −0.4 | – |
| Q | 8 | 0.18 | 0.15 | −10% | −0.6 | −2.2 | −1.2 | −2.0 st |
| T | 25 | 0.21 | 0.19 | +2% | −0.4 | −1.8 | +0.7 | **+12% rate** |
| V | 31 | 0.16 | 0.13 | −14% | +0.6 | **+2.0** | −1.8 | – |

**Serious narrators (Kurzgesagt, Zenn ×2):** fact lines have 0.14 s gaps. R lines (n=70) are 9% slower (Kurzgesagt −16%) at the same pitch. Section starts have 0.12 s gaps, so no long silence there either.

**Pace and openings:**
- **Pace:** funny narrators run 197–239 wpm (6.6–7.8 syllables/s); serious ones 161–192 wpm.
- **Cold opens:** the first word comes at 0.2–0.9 s (SamONella is the exception, with an 8.6 s music skit). The hook is about 5% slower than the body. There is no long pause after the hook (0.07–0.5 s).

**Pitch range:** within a sentence, humans move 5–8 st; even deadpan CasuallyExplained moves 5.3 st on the same measure. Jean moves 1.5–3.5 st (median 2.2). From one sentence to the next, humans vary ±1.2 to ±3 st; jean varies about ±0.5.

**The 10 rules:**
1. **Keep normal gaps short:** 0.1–0.3 s between lines (CasuallyExplained, the slowest, uses 0.4). Gaps of 0.6 s or more are the rarest 10%, which is why they land when used.
2. **Put the long beat after the joke, not before it.** Of the funny narrators' longest 10% of gaps, 13 of 36 come right after a punchline (the most common spot); only 7 come before one. Examples: "…exactly one time. [0.92 s] Run out of money."; "No Dinky needed. [0.68 s] But within…". Use 0.35–0.45 s after a normal punch and 0.7–1.0 s after a section's biggest joke.
3. **No beat between a setup and a full-sentence punch:** the gap is 0.17 s, the same as between two facts. The punch just flows on.
4. **One-liner punches (7 words or fewer) get a 0.5–0.9 s beat before them.** They are said 26% faster, about 2 st lower than the line before, and flatter (−2.3 st range). Examples: "Nope, frozen pizza and Jack Daniels." "Alright, cool."
5. **Punchlines are deadpan:** same speed, same pitch and same final fall as facts. Don't act out the joke.
6. **Every statement ends about 3.5 st lower on its last three words.** Questions fall less (−2.2 st), and character voices rise (+2 st).
7. **Setups are slightly slower and higher** (−7%, +0.4 st). Rhetorical questions are 10% slower and about 2 st lower (n=8, weak evidence).
8. **Section changes are marked by speed, not silence:** about 12% faster (SamONella and CasuallyExplained about +22%) with a slightly wider range. The gap stays normal (0.21 s); use a visual transition instead of dead air.
9. **Fake dialogue / character voices:** a different pitch and a rising end, about 14% slower, in quickly (0.16 s). Between dialogue lines, leave 1–2 s reaction beats.
10. **Open with no silent lead-in:** first word within 0.5 s, hook about 5% slower, then straight into the body. Tags after a punch come in fast (0.14 s) and lower.

## Part B: what the TTS can do (3 seeds per variant)

| Lever | Measured effect | Usable? |
|---|---|---|
| Clip gap (`pause` in `voice.py`) | Exact once the trim is fixed; today adds 0.4–0.6 s | **Yes**, after the fix |
| "." vs "!", "..." at the end, ALL CAPS, quotes | No difference beyond seed noise (±0.05 s, ±0.3 st) | No |
| "?" | End rises 0.9–1.5 st in 2 of 3 seeds (statement: −1.2) | Weak yes, for questions |
| Mid-line "...", "—", ":", or ". " | Pause of 0–0.96 s depending on seed (seed 1 gives about 0) | No, unreliable |
| Commas | 0.1 s or less | No |
| Parentheses "(probably)" | About 0.1 s pause; whole line about 0.7 st lower | Weak |
| Two sentences in one call | 0.33–0.59 s gap whatever the punctuation | No; use one clip per sentence |
| "Nope." on its own | 0.17–0.27 s, clean; "!" or "..." change nothing | Yes |
| Splitting a line into clips | First fragment ends falling (−0.8 to −1.2 st); a trailing "—" gives identical audio | **Yes**, for mid-line beats |
| Seed | Deterministic (bit-identical every time); ±0.1 s, ±0.5 st between seeds | **Yes**: generate several seeds, pick per line |
| Temperature 0.5 / 0.7 | Pitch range unchanged (about 2.1 st); whisper errors in 3/18 and 4/18 clips (none at the default 0.3) | No |
| `atempo` 0.85–1.15 | Duration exactly 1/t; pitch unchanged; overall spectral balance (average-spectrum centroid) within ±1.3% | **Yes** at 0.9–1.1; 0.85/1.15 may sound phasey (can't verify by ear) |
| Pitch ±1 st (`asetrate`) | Exactly ±0.98 st; length unchanged; timbre shifts 4–6% | **Yes** |
| Pitch ±2 st | Exact, but timbre shifts 7–13% (heard as another speaker) | Risky; characters only |
| Pitch ±3 st | Timbre shifts 9–19% | Characters only |

Jean at speed 1.0 runs about 7.1–8.0 syllables/s, which already matches the funny narrators. Use about 0.9 for a serious tone. The one thing no lever fixes is jean's flat contour within a line. Per-line pitch offsets of about ±1 st can only partly fake the line-to-line variation humans have.

## Part C: proposed `script.json` markup

```json
{"mode":"funny","lead":0.4,"lines":[
 {"t":"Your house has walls, a roof, and Wi-Fi that only works in one corner.","type":"hook"},
 {"t":"What it might not have / is an exit.","type":"punch","big":true},
 {"t":"So would we feel it?","type":"question"},
 {"t":"Nope.","type":"short_punch"},
 {"t":"Rolex, the watch joke. Sorry.","type":"tag","pitch":-1},
 {"t":"Hey, don't eat those!","type":"char","pitch":3,"seed":4}
]}
```

How a compiler would turn this into audio:
- **Gap between lines:** the larger of the previous line's `after` and this line's `before`. Any field can be overridden per line.
- **`/` and `//`:** split the line into clips with a 0.3 s or 0.7 s gap. Use at most one per 20 s; only 18% of the pros' punch sentences have an internal beat of 0.25 s or more.
- **Values below:** these are the silence you hear, assuming the trim fix.

| type | before (s) | after (s) | speed | pitch (st) |
|---|---|---|---|---|
| hook | lead 0.3–0.5 | 0.2 | 0.95 | 0 |
| fact | – | 0.2 | 1.0 | 0 |
| setup | – | 0.15 | 0.95 | +0.5 |
| punch | – | 0.4 (`big`: 0.8) | 1.0 | 0 |
| short_punch | 0.7 | 0.5 | 1.1 | −1 |
| tag | 0.12 | 0.4 | 0.95 | −1 |
| question | – | 0.3 | 0.92 | 0 (keep "?") |
| section | 0.35 + visual | 0.2 | 1.08 | +0.5 |
| char | 0.15 | 1.0 between dialogue lines | 0.9 | ±2–3 |
| reveal (serious) | – | 0.4 | 0.88 | 0 |
| ending | 0.6 | – | 0.95 | 0 |

Two more settings: in serious mode, use speed 0.9 overall and 0.12 s gaps. Replace `voice.py`'s 2.6 s `--lead` with 0.3–0.5 s, since the animation can start under the first line.

**Caveats:**
- Some classes are small: short punches n=7, questions n=8, Half as Interesting tags n=3.
- Whisper often merges setup and punch into one sentence, so I measured punch pitch on the last three words.
- Pitch tracking caught 40–70% of speech frames, and Kurzgesagt and Half as Interesting have music under the voice.

## Files I made
Everything is in `/Users/harish/videos/research/writing/`:

- **`audio/`:**
  - 7 downloaded videos as 16 kHz mono `*.wav` (about 98 MB), plus symlinks `zenn_night.wav` and `zenn_calhoun.wav`
  - `*.json` (plain word timings) and `*.dtw.json` (DTW timings, the ones used)
  - `*.dtw.sent.tsv` (per-sentence measurements) and `*.sent.tsv` (older run)
  - `prosody.py` (pitch tracker and pause detector; `python prosody.py test` self-check)
  - `labels.json` (my sentence classes), `classify_stats.py`, `delivery_table.txt` (full tables)
- **`ttstest/`:**
  - `run.py`, `results.tsv`, `post.tsv`, `determinism.txt`
  - `run2.py` / `run2.txt` (clip splits, best seed, timbre)
  - `run3.py` / `run3.txt` (temperature vs. accuracy)
  - `vadcheck.*` (pause-detector check), `wav/` (all generated clips)

I also installed a newer yt-dlp in a temporary scratch folder, because the installed version returned 403 errors.