# Animated-shorts study → Black Hole Life + engine "S" gap report (2026-11-04)

Source: the private `~/videos/.ref/claude-animated-shorts/` skill (Remotion + three.js vertical shorts, 20-short measured
style bible + 7 measurement reports). We took the **method and the numbers**, never their story, characters, frames or
music. Reference frames stay private study; nothing from `.ref` is copied into the skill or any video.

Our stack: HyperFrames (HTML/SVG + GSAP), `// look: still` + Look K stick figures, 16:9, 8-min long-form, 0.6 s crossfades
(owner rule: no rapid hard cuts), TTS voice from VoiceStudio. "Cost" = engineering cost for us / risk to in-flight episodes.

Legend: **ADOPTED** = implemented in S this pass (opt-in, defaults unchanged). **LATER** = worth doing, not done. **NO** = does not fit.

| Area | They do (measured) | We do now | Verdict / cost |
|---|---|---|---|
| **Script / beat formula** | Paradox hook as fact in sentence 1; setting 1-2 lines; 3-6 escalation beats with in-character lines; 1 mystery beat; pivot "You see," into the mechanism via an everyday analogy; ironic payoff, ends on the last word. 3.7 words/s, gaps < 1 s total. | Story engine + script-writer (BUT/THEREFORE chains, Joke Law), mission format (BATCH-76-95) for What-If. Already covers hook / escalation / payoff; 2.8 words/s after the 0.9× slow-down. | **NO change.** Ours is richer and owner-approved. One portable idea noted in `script-writer.md`-style terms: a single "You see," pivot + one everyday analogy per mechanism. Cost 0. |
| **Voice timing to words** | Everything keyed to a hand-fixed words.json; the picture is locked before sound. | Same idea: `W(c, i)` letters-proportional inside each clip. | Same. Kept. |
| **Reaction 0-3 f before the word** | Expression/action swaps land 0-3 f before the word onset. | Fades start **on** the word: a 0.35 s fade is half-in ~5 f **after** it (late). | **ADOPTED** `// motion: v2` → `LEAD = 0.15 s`: every `W()` / `WE()` / `CLIP()` cue fires 4-5 f early, so fades are half-in ~1 f before the word; captions stay on the audio. Cost: tiny. |
| **Camera: hold creep** | No still frames: holds push in 0.14-0.35 %/f; 65 % of frames move; no hand-held float. | Linear push 1 → 1.03 over the scene ≈ 0.01 %/f (reads as frozen). | **ADOPTED (scaled down for flat 2D):** v2 push 1 → 1.06 (pull 1.07 → 1), starting under the crossfade-in. 0.3 %/f would crop a flat 16:9 picture too much; 1.06 is 3-5x today. |
| **Camera: glides** | Symmetric ease-in-out, ~23 f, peak 14-16 px/f (p75 25 @720 ≈ 37 @1080). Big jumps are cuts, not snaps. | `S.zoom` power2.inOut with any duration (a 0.4 s zoom could whip). | **ADOPTED** v2 speed guard: `S.zoom` stretches its duration so the smootherstep peak stays ≤ 37 px/f. |
| **Camera: punch-in / kicks / roll** | Punch words: 0.6 %/f push for ~35 f. Impacts: 6-8 f kicks flipping sign every frame, ~3 px@720, roll ±0.25°. 4-8° rolls over ≥ 18 f on drama. | `S.tilt` exists; no punch, no kick. | **ADOPTED** `S.punch(x, y, t, k=0.07)` (eased +7 % over 1.1 s, starts 3 f before the word) and `S.kick(t, amp=5)` (7-frame decaying sign-flip shake of the stage). Both emit sound events. |
| **Shot merges / crossfades** | Hard cuts on big jumps; 6-8 f dissolves on place changes; continuous moves as transitions. | 0.6 s (18 f) crossfades every shot (owner rule). | **NO change** (owner's flicker rule wins). Their `bridge_merge.py` is a sandbox-merge tool for multi-agent look passes; our per-episode build agents don't need it. |
| **Foreground framing / DOF** | DOF on ~1/3 of screen time (close-ups 10-16 px), wides sharp; foreground props in ~1/3 of shots. | Flat, everything sharp; DS depth planes exist. | **ADOPTED (helper only)** `S.blur(el, px)` SVG gaussian blur for a background element on close-ups. Costs render time, so close-ups only. **LATER:** a foreground-prop rule in style-guide (10-25 % of an edge, blurred 4-8 px). |
| **Characters & outlines** | Variable-width plum ink (1 + 0.45 cos θ, thick on the shadow/ground side), bean heads, 3.5 head-heights, 14-face library, two-tone card shading. | Look K = pure stick figures with thin lines (owner choice 2026-10-22); 40+ library faces; DS.volHex shading on props. | **NO for figures** (would undo Look K). **LATER for props/scenery:** a weighted-line option in kit.js (second ink stroke offset +1.5 px down-right behind fills). Cost medium (touches every library asset), risk to the approved look → owner decision. |
| **Blinks** | Every 0.5-2.3 s, 4 frames half / shut / shut / half, plus one on each expression swap. | Engine figures blink every 2.6-4 s (open/shut); **library faces (all BHL people since Look K) never blink.** | **ADOPTED** v2: `L.put` schedules 4-frame blinks on every library face (eyes tagged `data-eye` in `people.js`), own PRNG so scene seeds never move. `{ blink: false }` opts out. |
| **Walk cycles** | Bob 3-7 %, lean 1-7°, 9-12 f steps, planted feet. | Library `cyc-walk-*` poses + group shifts (mostly translate). | **LATER** (needs a walk asset with per-frame poses). Medium cost. |
| **World / depth / lighting / grade** | Painted 3D world, sky gradient, fog = horizon, two-tone shadows, grade per light preset. | Flat vector scenery with DS light/depth tokens; consistent look. | **NO** (3D-specific). The 2D equivalents (atmospheric far planes, one light direction) already live in style-guide.md. |
| **Audio: SFX** | Event table mirrored from the picture timeline; every physical event gets a synthesized sound; cue sheet. | **No SFX at all** (long-form is voice-only). | **ADOPTED** `sound.py`: the engine records an event table (`window.__EVENTS`: pop / slide entrances, kicks, punches, `S.sfx(t, name)`), plus optional `sfx.tsv`; 9 synthesized sounds (pop swish whoosh thud ding tick boing rumble zap), panned by x, deduped, `assets/cues.md`. |
| **Audio: score + ducking** | Original synthesized score, ducked −3 dB under speech keyed from words.json (not the audio), sections 9.5-12 LU under the voice. | Music needs the removed MusicGen venv; `mix.py` ducks from voice RMS. | **ADOPTED** synth bed in `sound.py` (soft FM keys + Karplus-Strong bass/arp + brushes, 8-bar sections, small reverb, original), 14 LU under the voice, −4 dB duck keyed from words.json, drop-out before the final line; `--music BED.wav` for a licensed bed, `--music none` for SFX only. |
| **Audio: loudness / stems** | −15 LUFS (YouTube −14 for us), own BS.1770 meter, 4x-oversampled look-ahead limiter ≤ −1 dBTP, stems at mix gain. | `loudnorm` −15 LUFS on voice only. | **ADOPTED** in `sound.py`: own BS.1770-4 meter (matches ffmpeg ebur128 to 0.1 LU), −14 LUFS, 4x-oversampled limiter (−1.2 dBTP), `assets/stems/{voice,music,sfx}.wav`. |
| **QA: per-frame** | `short_qa.py`: every frame — black / white / frozen / pop detection minus planned flashes and crossfades, per-shot colour stats, loudness, 2 s contact sheets. | `blank_scan.py` at 2 fps (bare-paper frames only) + snapshots. | **ADOPTED** `frame_qa.py` (streams every frame, so 8-min episodes fit in memory): black, blank paper, unplanned white, frozen holds, pops (planned crossfades / kicks / pops read from the built page), caption band masked, loudness + silences, per-scene stats, 30 s contact sheets. `QA=1 finish.sh …` runs it. |
| **QA: side-by-side + verifier** | `sbs_sheet.py` ours-vs-reference rows → a fresh verifier scores each area out of 10 with frame-numbered fixes. | Snapshot contact sheets read by the builder. | **ADOPTED** `sbs_sheet.py` (labelled rows, accepts `video.mp4@12.5`). The verifier pass is a process rule (in SKILL.md): one fresh reviewer reads 1-3 sheets, ≤ 200-word verdict. |
| **Look-match loop** | Measure first (numbers, not adjectives), one owner per file, merge, verify, repeat. | Ad hoc. | **Process note** only; used for this report. |

## Top 5 by value for Black Hole Life (what this pass shipped)
1. **Sound pass** (`sound.py`): the channel goes from voice-only to voice + original bed + event SFX at −14 LUFS with stems. Biggest perceived jump for zero visual risk.
2. **Every-frame QA** (`frame_qa.py`): catches the dropped-picture frames blank_scan misses between its 0.5 s samples, plus pops and frozen holds.
3. **Reaction lead** (`LEAD` 0.15 s): pictures now land on the word instead of ~5 f after it.
4. **Blinks on library faces**: Look K figures were dead-eyed in holds.
5. **Hold creep + punch + kick**: holds stop reading as frozen; punch words and impacts get the reference grammar.

## Trial result (2026-11-04)
Ep49 clips 1-9 (41.8 s), same scenes, 1080p: `trials/renders/upg49-before-1080.mp4` (current defaults, voice only) vs
`trials/renders/upg49-after-1080.mp4` (`// motion: v2` + 6 punch/kick/sfx lines + `finish.sh … sound`). Sheet: `trials/renders/sbs-before-after.jpg`.
| | before | after |
|---|---|---|
| Loudness (frame_qa) | **−12.5 LUFS → FAIL** (the old `none` loudnorm on a mono voice lands 1.5 LU hot as stereo AAC) | −14.0 LUFS, −1.1 dBTP → PASS |
| Sound | voice only | voice + original bed (14 LU under, ducked on words) + 23 event SFX; speech margin median 18 LU |
| Still frames (diff < 0.05) | 5 % | 1 % (holds creep) |
| Word sync | 21.2 s "shouting": sound arcs not yet on screen | arcs already in (0.15 s lead), with a kick on the word |
| Punch words | none | "SECRETS" / "biggest" push in ~5-7 % |
| Blinks | Look K faces never blink | 4-frame blinks every 0.5-2.3 s |
Both renders: no black, white, frozen or pop frames. **frame_qa found a real content bug that both cuts share (and the 8-min ep49 too):**
5.3-5.9 s is a near-empty peach frame (shot 1:15 shows only Dave until "secrets"). blank_scan reported it at 1 sample.
