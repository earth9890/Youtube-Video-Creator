# Edit playbook — "user says X → do Y"

Always: edit → `npx hyperframes check` → snapshot affected scenes (end −0.45 s and mid) → render new `-vN` → report diff. Keep prior versions.

| User says | Likely cause | Do |
|---|---|---|
| "too fast" (visuals) | scene windows < 2.5 s or retime factor < 0.5 | slow voice (`--speed` −0.05) and/or lengthen sentence pauses; add comma pauses; merge/trim scene content. Never stretch drawings past scene end. |
| "too slow" | scenes > 4 s with idle holds | shorten pauses, raise speed +0.05, cut decorative strokes |
| "broken / stops abruptly / not in flow" | audio chopped mid-sentence, long silences, visuals not finished at cut | regenerate voice per sentence (`voice.py`), pauses only after sentences, check all scenes complete at end −0.45 s |
| "repeats last word after full stop" | cut inside a word tail | same: per-sentence clips |
| "voice starts too early / no gap" | lead = 0 | `--lead 2.6`; scene 1 starts at t=0 |
| "voice sounds different / deeper" | | change `--voice` (Kokoro: am_michael, am_onyx, bm_george…) or pitch factor `0.95` in `voice.py` DEEP chain (lower = deeper), bass `g=` |
| "visual X is wrong / not correct" | prop anatomy | redraw that block only; compare to real object; snapshot at completion |
| "change script / add emotion" | generic or abstract lines | pick the viewer state in `craft-playbook.md` §C (state → script move → visual move) + §D rewrite recipe; edit `script.json`, rerun voice + words, update scene anchors (see below); add scenes with `scene(a,b,{abs:true})` |
| "remove/add scene" | | delete/insert block; update anchors and scene boundary list |
| "captions off / bigger" | | `.cap` CSS / drop `captions.js` |
| "hook is weak / people drop off" | generic opening, no stake | rewrite sentence 1 as a concrete claim + number (§A examples), add re-engagement beat at 25%/65%, test 2 hooks |
| "more emotional" | abstract lines, no specific failure, no stillness | add one specific failed moment, validate→normalise→tiny step→identity order, silent beat before final line, close-up face, music swell (§C,§E,§F) |
| "thumbnail not clicking" | low contrast / too much text / same look as competitors | dark bg + one accent, ≤ 4 words, check at 160 px + grayscale, 3 variants in Test & Compare (§G) |
| "4K" | | `--resolution 4k` (authoring stays 1920×1080) |

## Retiming scenes to a new voice (anchors)
Design each scene block in any time units (the example uses a 76 s design timeline). Build two arrays:
- `OLDA` design times, `NEWA` final times, strictly increasing pairs.
- Scene boundaries: design start/end of each scene ↔ `firstWord(clip, idx).start − 0.4` (from `words.json`).
- Inner anchors for cue words inside long scenes (e.g. "Fail." clip start ↔ design time of the fall).
- A scene inserted between two old scenes (e.g. a new calendar scene): give the old neighbours distinct design times (`40.2` and `40.25`) mapped to different final times, and author the new scene in absolute time with `{abs:true}`.
`const m = (t) => piecewise(OLDA, NEWA, t)`; `TL`/`IDTL` (engine) apply it to every tween so scene code stays untouched. Assert monotonic anchors in the build script.

## Verification checklist
- [ ] `check` 0 errors · [ ] snapshots at each scene end −0.45 s: drawings complete, no overlap · [ ] first word ≥ 2.5 s · [ ] total = last clip end + tail · [ ] audio duration = video duration · [ ] 4K probe 3840×2160 · [ ] report honestly what was NOT checked (listening).
