---
name: whiteboard-video-studio
description: End-to-end workflow for hand-drawn whiteboard / stick-figure motivational and explainer YouTube videos (the "Black Hole Life" style) — script writing, scene breakdown, deep male voiceover, HyperFrames build, edit-revision loop, 4K render, then title, description, tags, chapters, thumbnails and channel art (logo, banner). Use whenever the user wants a stick-figure / doodle / whiteboard video, a faceless motivational video, or the YouTube package (title, thumbnail, description, banner, logo) for one.
---

# Whiteboard Video Studio

Pipeline: **Brief → Script → Scene board → Voice → Build → Review/Edit loop → Render → YouTube package.**
Builds on `/hyperframes` (read `hyperframes-core` before writing composition HTML). Work in `~/videos/<slug>/`.
Worked example: `examples/never-give-up/` (full composition + script). Engine: `scripts/engine.js`.
**Craft rules (hooks, story, viewer psychology, copy, staging, sound, colour, titles) live in `references/craft-playbook.md` — apply the matching section at every step below; evidence tags [R]/[D]/[H] show how strong each rule is.**

## Hard rules (learned the painful way — every one was a user complaint)

1. **Never cut one long TTS take at word boundaries.** It leaves a word tail after the cut → "repeats last word after full stop". Generate **one clip per sentence** and join with silence (`scripts/voice.py`).
2. **Voice never starts at 0.** Leave a 2.5–3 s animation-only lead-in (hero draws) before the first word.
3. **Voice flows.** No silences inside a sentence. Pauses only after sentences (0.7–1.4 s) and short beats (0.5–0.7 s). Slow ≈ speed 0.78 (≈100 wpm); 1.0 is "too fast".
4. **Visual pace = medium.** ~2.5–3.5 s per scene; every scene's drawing must be **finished before its scene ends** (verify by snapshotting at scene end −0.45 s). Too fast and too slow were both rejected.
5. **Draw things correctly.** Props must look like what they are (heart-shaped clover leaves, horseshoe with nail holes, trophy with handles, couch with armrests). Check every snapshot for anatomy / overlap (hero walking through desks, label over mountain, etc.).
6. **Whisper timestamps are quantised (~1 s) — do not use them for cues.** Use `scripts/words.py` (letters-proportional inside each known clip).
7. Content must pass `craft-playbook.md` §I (hook concreteness, psychology order validate→normalise→tiny step→identity, no toxic positivity, re-engagement beats) before the first render.
8. Don't ask permission for each step; produce a full cut, then iterate on feedback. Keep replies short.
9. Never stage/commit to git without approval; delete with `trash`.

## 1. Brief (infer, ask at most one question)
Topic/message, audience, length (default 45–75 s Shorts-length explainer; up to 3 min), voice (default deep male Kokoro `am_michael`), channel brand (see `brand/`). Style defaults: white paper `#fdfcf8`, black marker `#161616`, accents red `#e0312b` / green `#3f9e4a` / orange `#ff7a18` / yellow `#ffd23f`, handwritten captions (Caveat), marker wobble filter.

## 2. Script (see `references/script-guide.md` + `craft-playbook.md` §A hook, §B structure, §C psychology, §D copy)
First sentence = concrete claim/stake/number (not a generic question). Pick the viewer's state (comparison / self-doubt / can't start / setback / identity) and use the matching row of the §C table. Add a re-engagement line at ~25% and ~65%, one *specific* failed moment, one tiny action at the end.
Hook question → pattern interrupt → "you don't need X, Y, Z" → the one thing you need → emotional middle (show up even when nobody watches) → fail/get-up → reframe ("not one big moment, the quiet days") → call to action. Write as `script.json`: `[["sentence", pauseAfterSeconds], ...]`, one sentence/clause per entry, 5–14 words each.

## 3. Scene board (apply `craft-playbook.md` §E staging)
Choose camera-height/scale per emotion (small + empty = vulnerable, large + low = power, high + top-third = triumph, 2–4° tilt at the fall, push-in on key lines, stillness before the final line). Face only at emotional beats. For each clause list: **words → visual → action → props**. One idea per scene, ≤ 2 characters, ≤ 5 props. Reuse the visual vocabulary in `references/script-guide.md` (staircase = persistence, calendar ticks = daily habit, umbrella+rain = showing up anyway, clock = waiting, desk+plant = building, wall+fall = failure, mountain+flag = payoff, brain/trophy/clover = smarts/status/luck). Show the board to the user only if they ask; otherwise build.

## 4. Voice (see `craft-playbook.md` §F)
```bash
python3 -m venv ~/.venvs/tts && ~/.venvs/tts/bin/pip install kokoro-onnx soundfile numpy        # once
~/.venvs/tts/bin/python scripts/voice.py script.json assets --speed 0.8 --lead 2.6 --tail 3.5   # one clip per sentence, deep male, silence lead-in
```
Writes `assets/voice.wav` + `assets/clipt.json`. **Run episodes sequentially** — parallel Kokoro runs crash (`recursive_mutex lock failed`); the script caches finished clips so a re-run only redoes the missing ones.

## 5. Build (engine v2 — `references/engine-api.md`)
Project = `script.json` + `assets/clipt.json` + `scenes.js` (first line `// theme: dark` for the chalkboard look).
```bash
python3 scripts/build.py EP_DIR                 # words.json (letters-proportional word cues) + index.html
npx hyperframes check                           # 0 errors; container_overflow warnings from walk-offs are fine
rm -rf snapshots && npx hyperframes snapshot --at <each scene end − 0.45, mid-points>   # READ contact-sheet-*.jpg
python3 scripts/build.py EP_DIR --thumb thumb-a.js thumbnails/a.png   # static-frame thumbnail, 1280×720
```
`scenes.js` uses `sceneWindows(CUES)` + `W(clip, word)` so every stroke lands on its spoken word; ~50 props (`S.phone`, `S.calendar`, `S.spotlight`, …), the stick-figure rig (`S.fig` with poses/faces/walk/lie/rise/grow), handwritten `S.text`. Verify a new prop in `gallery/scenes.js` before using it in an episode.
**Scale = emotion** (§E): 0.65–0.8 vulnerable, 1.0 neutral, 1.3–1.45 power. One accent colour per scene. Content y < 940.

### Parallel production (several videos)
Orchestrator: research facts → write all `script.json` → run `voice.py` sequentially → launch **one general-purpose agent per episode** with: the read list (engine-api, craft-playbook §C/§E/§G, gallery/scenes.js), the pipeline, the hard rules, and a **scene board** (clip ranges → visual + accent). Agents build/check/snapshot/iterate, make 2 thumbnails and `package.md`, never render. Orchestrator then runs `scripts/finish.sh EP music/bed-*.wav` per episode (mix → build → check → 4K render), sequentially.

### Music
```bash
~/.venvs/musicgen/bin/python scripts/music_gen.py "warm hopeful solo piano, slow, gentle, no drums" music/bed-hope.wav --seconds 30   # MusicGen, local
~/.venvs/musicgen/bin/python scripts/mix.py EP_DIR music/bed-hope.wav      # loop + duck −9 dB under speech, bed −17 dB, dropout before the last line
```
`build.py` prefers `assets/mix.wav` when present. Beds: `bed-hope` (warm), `bed-tense` (minor), `bed-rise` (building).

## 6. Review loop (per episode)
`npx hyperframes snapshot --at <times>` → read `snapshots/contact-sheet-*.jpg`. Take frames at **each scene's end −0.45 s** (completed state) and mid-scene. Fix, re-snapshot. Then render a 4K cut and tell the user what changed. Edit requests → `references/edit-playbook.md` (table of "user says X → do Y").

## 7. Render
```bash
npx hyperframes render --quality delivery --resolution 4k --output <slug>-4k-vN.mp4   # ~3–4 min for 70 s
ffprobe -v error -show_entries stream=codec_name,width,height,duration -of csv=p=0 <file>
```
Authored 1920×1080 + `--resolution 4k` supersamples to 3840×2160. Keep old versions (`-v2`, `-v3`) — the user compares them. If socket's `npx` wrapper eats a flag ("Unknown flag"), check the real flag name in `hyperframes-cli/references/preview-render.md`.

## 8. YouTube package (see `references/youtube-package.md` + `craft-playbook.md` §G colour/thumbnail, §H title/description)
Thumbnails follow `references/thumbnail-doctrine.md` — the character INSIDE the pain moment, 2–3 words at 260–340 px bold, dark board, one accent, one stakes prop, glance test (`*_glance.png`); two variants per video for YouTube Test & Compare; title ≤ 60 chars that differs from the thumbnail text; first two description lines = hook + promise.
Title (5 options, ≤ 60 chars, one pick), description (hook, summary, chapters from clip times, CTA, hashtags), tags, pinned comment, **thumbnails** (3 variants: dark staircase/"quit", white calendar/"show up", brand black-hole) via `brand/thumbs.py`, **channel art** via `brand/gen.py` (5 logos 800², 4 banners 2560×1440 — keep all text inside the 507–2053 × 508–931 safe box; decor only outside it). No stick figure on logos. Output under `~/videos/<channel>/` and show a contact sheet.

## Deliverable summary (end of every build)
File path + resolution + duration; what changed vs last version; what was checked vs not (be honest: "frames checked, audio not listened to"); one pointed question about the weakest scene.
