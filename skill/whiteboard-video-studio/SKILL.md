---
name: whiteboard-video-studio
description: End-to-end workflow for hand-drawn whiteboard / stick-figure motivational and funny explainer YouTube videos (the "Black Hole Life" style: space, science, history "what if" topics) — comedy-first script writing (research-backed playbook, joke rules, script lint, delivery markup for pauses/speed/pitch), scene breakdown, deep male voiceover, HyperFrames build, edit-revision loop, 4K render, then title, description, tags, chapters, thumbnails and channel art (logo, banner), and uploading to YouTube Studio via Claude in Chrome (unlisted / public / premiere). Use whenever the user wants a stick-figure / doodle / whiteboard video, a faceless motivational video, or the YouTube package (title, thumbnail, description, banner, logo) for one.
---

# Whiteboard Video Studio

Pipeline: **Brief → Script (owner OK) → Voice-only mp3 (owner OK) → Scene board → Build → Review/Edit loop → Render → YouTube package.**
Builds on `/hyperframes` (read `hyperframes-core` before writing composition HTML). Work in `~/videos/<slug>/`.
**Approval gates (owner rule):** new formats and topics start as a **~1-min trial**. Get the owner's OK on the script **text**, then on a **voice-only mp3**, then build the visuals. Long videos come only after a short one is approved.

**Kids' songs and nursery rhymes (Tiny Tune Town) use the `tiny-tune-town` skill**, which reuses this skill's still-look engine.
**Tech news / dev explainers (Stack Doodle) use the `stack-doodle` skill**, same engine (+ `// captions: off`, `L.put … { pop | slide }` entrances, the Mono code font, the `dev` asset group).

### Current long-form pipeline (Black Hole Life, 2026-10-22) — the fast path
1. Script `script.md` (+ `sources.md`, `title.md`), `script_lint.py --long` PASS. Cast voices: `# cast: dave=22393bee,brain=7f7a5b5c,…` header + `(@dave)` on quoted lines.
2. Voice: `~/videos/black-hole-life/voice-ep.sh EP` (VoiceStudio Storyteller, 12 steps, clip_check) → `slow-ep.sh EP 0.9`.
3. Visuals: `scenes.js` = `// look: still` + `// @library auto` (Black Hole Life builds get **Look K = pure stick figures** automatically: every person in every asset, Dave included, is drawn as the Man 02 / Girl 02 stick figure with thin lines; owner default 2026-10-22; a scene's own `L.look(...)` overrides); **find assets with `scripts/lib.py find <words>` / `show <name>`, place with `L.put(S, name, x, y, { s, t: W(c, w) })`**; the library is a shortcut, not a rule: draw new frames, props and scenes whenever they fit the beat better (reusable ones go into `library/` with `L.reg`). `lib.py check scenes.js`, `scene_lint.py`, `build.py`, snapshots read.
4. Render: `RES=1080 lockf … scripts/finish.sh EP none renders/EP-1080p.mp4` (screenshot capture; ends with `blank_scan.py` — re-render if it flags frames).
5. Package + upload: `prep-upload.py EP` → Studio (`…/videos/upload?d=ud`), pinned comment. Details: `references/youtube-upload.md`.

**Context budget (agents):** never read `library/*.js`, `scripts/engine2.js`, `scripts/kit.js` or another episode's whole `scenes.js` (100+ KB each). Use `lib.py` (a few lines per lookup), `references/engine-api.md`, and at most the first ~80 lines of one recent `scenes.js` for helper style.

### Reference map (read what the step needs)
| Need | File |
|---|---|
| **Story first, every script** (story card, BUT/THEREFORE beat chain, 1-min story shape, 10-engine skeleton library from 53 top videos) | `references/story-engine.md` |
| **Writing any script** (the law: Joke Law, narrator + test dummy, shapes, hook and joke recipes, fact sandwich, delivery markup, score card) | `references/script-writer.md` |
| Evidence behind the story engine: per-video skeletons with timestamps, transplant templates | `references/research/story-skeletons/` |
| Evidence behind it: 54-transcript study of 8 channels, delivery and TTS measurements, tools to redo it | `references/research/README.md` |
| Topic ideas: idea engine, 6 generators, scoring | `references/script-guide.md` §0.1 |
| Long-form beat sheet, story format measurements (Zenn / Past Tense) | `references/story-explainer.md`, `script-guide.md` §0.2 |
| Hooks, psychology, staging, sound, colour (motivational shorts) | `references/craft-playbook.md` |
| Engine API (v2 paper, v3 colour look, story look, props, camera) | `references/engine-api.md` |
| **Illustrated stills (default look from 2026-10-13):** design system (palette with light/dark tones, stroke/radius/type/spacing tokens, depth planes, light, composition), progressive scenes, QA checklist; `scripts/kit.js` + `scripts/scene_lint.py` | `references/style-guide.md` |
| **Asset library (optional shortcut; draw new whenever it fits better):** 2,400+ code-drawn assets (cast, dev/tech UI (code, terminal, browser, servers, AI), faces, poses, clothes, infographics, anatomy, nature, food, cosmos, creatures, mind, world backgrounds, skies, places, rooms, props, vehicles, animals, text, effects) + 10 Looks. **Never read library/*.js:** `python3 ~/.claude/skills/whiteboard-video-studio/scripts/lib.py find <words>` → `show <name>` → paste the call (`L.put(S, name, x, y, o)`); `// @library auto` in scenes.js; `lib.py check scenes.js`; gallery `library/index.html` | `references/asset-library.md` |
| "User says X → do Y" edits | `references/edit-playbook.md` |
| **Every thumbnail, every channel: the pro pass** (psychology, 3 concepts × 2 critique rounds, `thumb_hires.py` 2× pixel-perfect render) | `references/thumbnail-pro.md` |
| **Making any explainer thumbnail** (6 laws, background by topic, archetypes with real perf, engine build specs, `thumb_check.py` + feed-grid test, score card) | `references/thumbnail-designer.md` |
| Evidence behind it: 1,260-thumbnail study of the same 8 channels, 192 hand labels, recipes, tools to redo it | `references/research/thumbnails/` |
| Motivational-short thumbnails, title, description, upload | `references/thumbnail-doctrine.md`, `youtube-package.md`, `youtube-upload.md` |
| Worked examples: approved 1-min funny explainer + 2 rejected drafts (`blackhole-home/`); 8-min story mode with a 60-prop library (`toothache-story/`); motivational short (`never-give-up/`) | `examples/` |
Engines: `scripts/engine2.js` (current; `// look: v3` default), `scripts/engine.js` (v1).
**Craft rules (hooks, story, viewer psychology, copy, staging, sound, colour, titles) live in `references/craft-playbook.md` — apply the matching section at every step below; evidence tags [R]/[D]/[H] show how strong each rule is.**
**Long-form story / history / "why do humans…" explainers (> 3 min) follow `references/story-explainer.md` for structure, research and packaging.** Visuals stay on the **v3 look with crossfades**: the owner rejected story mode's ~2.3 s hard cuts as "flicker" (episode 11). Use `// look: story` only if the owner asks for hard cuts.

## Hard rules (learned the painful way — every one was a user complaint)

1. **Never cut one long TTS take at word boundaries.** It leaves a word tail after the cut → "repeats last word after full stop". Generate **one clip per sentence** and join with silence (`scripts/voice.py`).
2. **Explainers (funny / space / story):** first word within ~0.4 s (`--lead 0.4`); the animation draws under it. Gaps 0.2 s between clips, 0.7 s long beats after punches (script.md markup, `script-writer.md` §7). jean at speed 1.0. *Slow motivational shorts only (2026-10-04 rules):* 2.5–3 s animation lead-in, 0.7–1.4 s pauses after sentences, speed 0.78–0.85.
3. **Voice flows.** No silences inside a sentence except deliberate `/` beats. Mark timing with `/` `//`; punctuation ("!", "...", "—", CAPS) does nothing in Pocket TTS.
4. **Visual pace = medium, never flicker.** ~2.5–4 s per scene with 0.3 s crossfades (v3), merging any window under 2 s; every scene's drawing must be **finished before its scene ends** (verify by snapshotting at scene end −0.45 s). Too fast and too slow were both rejected.
5. **Draw things correctly.** Props must look like what they are (heart-shaped clover leaves, horseshoe with nail holes, trophy with handles, couch with armrests). Check every snapshot for anatomy / overlap (hero walking through desks, label over mountain, etc.).
6. **Whisper timestamps are quantised (~1 s) — do not use them for cues.** Use `scripts/words.py` (letters-proportional inside each known clip).
7. **Scripts pass `scripts/script_lint.py` and the Joke Law** (every joke is built from the fact; no Mondays / Wi-Fi / WhatsApp / pop-culture similes; no "Boom!"; no documentary stacks of dates and names). Motivational content must also pass `craft-playbook.md` §I (hook concreteness, psychology order validate→normalise→tiny step→identity, no toxic positivity, re-engagement beats) before the first render.
8. Don't ask permission for each step; produce a full cut, then iterate on feedback. Keep replies short.
9. Never stage/commit to git without approval; delete with `trash`.

## 1. Brief (infer, ask at most one question)
Topic/message, audience, length (default 45–75 s Shorts-length explainer; up to 3 min), voice (default deep male Kokoro `am_michael`), channel brand (see `brand/`). Style defaults: white paper `#fdfcf8`, black marker `#161616`, accents red `#e0312b` / green `#3f9e4a` / orange `#ff7a18` / yellow `#ffd23f`, handwritten captions (Caveat), marker wobble filter.

## 2. Script
**Every script starts with `references/story-engine.md`, then follows `references/script-writer.md`.** Steps:
0. **Story card + beat chain** (engine, want, obstacle, stakes, question, change, `# beat: BUT/THEREFORE …` lines at the top of `script.md`). No story card = lint FAIL. Owner rejected a fact list as "a 5-year-old's essay" (ep 13 v1).
1. Premise and fact mine (10–15 sourced facts, 2–3 joke candidates *from each fact*) — facts are answers to the beats' questions.
2. Narrator move + test dummy + runner phrase.
3. Beat sheet (1-min: hook → reframe → mechanism → evidence → doubt → callback).
4. Draft `script.md` with marks (`/` `//` `(fast)` `(slow)` `"quotes"` `(low)` `[J]`).
5. Punch-up pass, then cut pass (Joke Law).
6. `python3 scripts/script_lint.py script.md` must PASS (`--long` for 8-min scripts).
7. Self-score ≥ 32/40.
8. **Show the owner the text.**
Reference: `examples/blackhole-home/script.md` (approved).

*Motivational shorts (older format, `script-guide.md` + `craft-playbook.md` §A–D):* first sentence = concrete claim/stake/number (not a generic question). Pick the viewer's state (comparison / self-doubt / can't start / setback / identity) and use the matching row of the §C table. Add a re-engagement line at ~25% and ~65%, one *specific* failed moment, one tiny action at the end.
Hook question → pattern interrupt → "you don't need X, Y, Z" → the one thing you need → emotional middle (show up even when nobody watches) → fail/get-up → reframe ("not one big moment, the quiet days") → call to action. Write as `script.json`: `[["sentence", pauseAfterSeconds], ...]`, one sentence/clause per entry, 5–14 words each.

## 3. Scene board (apply `craft-playbook.md` §E staging)
Choose camera-height/scale per emotion (small + empty = vulnerable, large + low = power, high + top-third = triumph, 2–4° tilt at the fall, push-in on key lines, stillness before the final line). Face only at emotional beats. For each clause list: **words → visual → action → props**. One idea per scene, ≤ 2 characters, ≤ 5 props. Reuse the visual vocabulary in `references/script-guide.md` (staircase = persistence, calendar ticks = daily habit, umbrella+rain = showing up anyway, clock = waiting, desk+plant = building, wall+fall = failure, mountain+flag = payoff, brain/trophy/clover = smarts/status/luck). Show the board to the user only if they ask; otherwise build.

## 4. Voice (see `script-writer.md` §7 + `craft-playbook.md` §F)
**Since 2026-10-19 the owner uses the VoiceStudio app** (local; must be open; API http://127.0.0.1:3900; also an MCP server `voicestudio`). The Pocket/Kokoro venvs and the whisper models were removed; don't reinstall them unless the owner asks.
```bash
~/.local/bin/uv run --offline --with numpy --with soundfile python scripts/voice.py script.md assets --engine voicestudio --lead 0.4 --tail 1.5   # voice 902498e2 = "The Storyteller" (owner's pick)
curl -s -X POST http://127.0.0.1:3900/v1/audio/transcriptions -F file=@assets/voice.wav -F model=whisper-1   # words check (replaces whisper-cli)
ffmpeg -i assets/voice.wav -af loudnorm=I=-15:TP=-1.5 -b:a 192k voice.mp3   # send the owner audio-only first
```
`script.md` → voice.py writes `script.json` with **one entry per clip** (`[text, gap, speed, semitones]`). Scene cues `W(clip, word)` count those clips. Verify every voice with whisper (`whisper-cli -m ~/.cache/hyperframes/whisper/models/ggml-small.en.bin -f 16k.wav -nt`): the transcript must match the script, and the median gap (`silencedetect=n=-45dB:d=0.12`) should be about 0.24 s.
Default voice = **VoiceStudio "The Storyteller" `902498e2`** (~195 wpm → slow the finished voice 0.9× with `slow-ep.sh`; 2.8 spoken words/s after that, so 1,350–1,400 words ≈ 8 min). Character lines: `--cast name=profileId` (or a `# cast:` header line, read by `voice-ep.sh`) and `(@name)` on the line; fewer, longer clips (12–30 words) voice faster. Never credit or name the voice tool in YouTube text (owner rule). Old engines: Pocket `jean`, `--engine kokoro`. **Write numbers as words in script.json** ("ninety-nine point nine percent") — TTS drops decimals/symbols. Writes `assets/voice.wav` + `assets/clipt.json`; clips are cached by a hash of the text, so an edited sentence is the only one redone. Run episodes sequentially.

## 5. Build (engine v2 — `references/engine-api.md`)
Project = `script.json` + `assets/clipt.json` + `scenes.js` (first line `// theme: dark` for the chalkboard look).
```bash
python3 scripts/build.py EP_DIR                 # words.json (letters-proportional word cues) + index.html
npx hyperframes check                           # 0 errors; container_overflow warnings from walk-offs are fine
rm -rf snapshots && npx hyperframes snapshot --at <each scene end − 0.45, mid-points>   # READ contact-sheet-*.jpg
python3 scripts/build.py EP_DIR --thumb thumb-a.js thumbnails/a.png   # static-frame thumbnail, 1280×720
```
**Current default: `// look: still` + `// @library auto`, assets from the library via `lib.py` (see the fast path above).** Older v3 defaults: `// look: v3`, `S.bg()` scenery (`space`, `night`, `room`, `dusk`, `white`, `danger`, `blueprint`…), labels at the top (y 120–260, never in the caption band), figures on black backgrounds `c: "#ffffff"`. Space and comedy helpers to copy: `examples/blackhole-home/rejected-v2-relatable-gags/scenes.js`; history props: `examples/toothache-story/parts/00-base.js`.
`scenes.js` uses `sceneWindows(CUES)` + `W(clip, word)` so every stroke lands on its spoken word; ~50 props (`S.phone`, `S.calendar`, `S.spotlight`, …), the stick-figure rig (`S.fig` with poses/faces/walk/lie/rise/grow), handwritten `S.text`. Verify a new prop in `gallery/scenes.js` before using it in an episode.
**Scale = emotion** (§E): 0.65–0.8 vulnerable, 1.0 neutral, 1.3–1.45 power. One accent colour per scene. Content y < 940.

### Parallel production (several videos)
Orchestrator: research facts → write all scripts → voice sequentially (`voice-ep.sh`, one VoiceStudio job at a time) → launch **one build agent per episode** (model sonnet) with the brief `~/videos/black-hole-life/LONGFORM-BUILD.md` (lean read list + `lib.py` asset lookup), the hard rules, and the script's beat sheet. Builds can start before the voice is done (scenes use clip numbers; build/snapshot only after the voice is final). Agents build/check/snapshot/iterate, make 2 thumbnails and `package.md`, never render. Orchestrator then runs `scripts/finish.sh EP music/bed-*.wav` per episode (mix → build → check → 4K render), sequentially.

### Music
Long-form explainers are voice-only (`finish.sh EP none`). Music beds (`scripts/music_gen.py`, `mix.py`) need the MusicGen venv, which was removed on 2026-10-19; reinstall only if the owner asks.

## 6. Review loop (per episode)
`npx hyperframes snapshot --at <times>` → read `snapshots/contact-sheet-*.jpg`. Take frames at **each scene's end −0.45 s** (completed state) and mid-scene. Fix, re-snapshot. Then render a 4K cut and tell the user what changed. Edit requests → `references/edit-playbook.md` (table of "user says X → do Y").

## 7. Render
```bash
scripts/finish.sh EP_DIR none|BED.wav [OUT.mp4]   # mix (voice-only at -15 LUFS with "none") -> build -> check -> 4K render
HF_CAPTURE_PARALLEL_STREAM=true npx hyperframes render --quality delivery --experimental-fast-capture=false --resolution 4k --output <slug>-4k-vN.mp4   # fast capture dropped whole frames under load (2026-10-22)
python3 scripts/blank_scan.py <file>   # exit 1 = blank (bare-paper) frames: re-render before uploading
ffprobe -v error -show_entries stream=codec_name,width,height,duration -of csv=p=0 <file>
```
Authored 1920×1080 + `--resolution 4k` supersamples to 3840×2160. Keep old versions (`-v2`, `-v3`) — the user compares them. If socket's `npx` wrapper eats a flag ("Unknown flag"), check the real flag name in `hyperframes-cli/references/preview-render.md`.

## 8. YouTube package (see `references/youtube-package.md` + `craft-playbook.md` §G colour/thumbnail, §H title/description)
**Explainer thumbnails follow `references/thumbnail-designer.md` (owner default since 2026-10-20: the ★ clickbait scene mode at its top):** the script's hook made visible as ONE wrongness, background by topic (space = ≥ 40 % near-black), 1–3 words of stakes, big character or none, ≤ 3 elements; two variants (floor-raiser + lottery ticket); then `~/.venvs/pocket/bin/python scripts/thumb_check.py thumbnails/a.png thumbnails/b.png --space` and READ each `*_grid.jpg` (yours among 11 real hits at feed size) — lint passing is not enough.
Motivational-short thumbnails follow `references/thumbnail-doctrine.md` — the character INSIDE the pain moment, 2–3 words at 260–340 px bold, dark board, one accent, one stakes prop, glance test (`*_glance.png`); two variants per video for YouTube Test & Compare; title ≤ 60 chars that differs from the thumbnail text; first two description lines = hook + promise.
Title (5 options, ≤ 60 chars, one pick), description (hook, summary, chapters from clip times, CTA, hashtags), tags, pinned comment, **thumbnails** (3 variants: dark staircase/"quit", white calendar/"show up", brand black-hole) via `brand/thumbs.py`, **channel art** via `brand/gen.py` (5 logos 800², 4 banners 2560×1440 — keep all text inside the 507–2053 × 508–931 safe box; decor only outside it). No stick figure on logos. Output under `~/videos/<channel>/` and show a contact sheet.

## 9. Upload to YouTube (only when asked — see `references/youtube-upload.md`)
Claude in Chrome on YouTube Studio: manifest from each `package.md` → upload with title, description, tags, paired thumbnail, not-for-kids, the visibility the user named (default Unlisted; Public/Premiere only on explicit request). Check channel verification first (unverified = ~5 custom thumbnails/day). Files > 10 MB need the local-server method, which requires the user's explicit OK. Verify every row in the Content list and report links + gaps.

## Deliverable summary (end of every build)
File path + resolution + duration; what changed vs last version; what was checked vs not (be honest: "frames checked, audio not listened to"); one pointed question about the weakest scene.
