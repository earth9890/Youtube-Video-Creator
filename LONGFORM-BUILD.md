# Long-form build brief (Black Hole Life long-form episodes)

You build the visuals for one 8–10 min Black Hole Life episode. The script is final and already voiced
(`script.md`, `script.json` = one entry per clip, `assets/voice.wav`, `assets/clipt.json` = clip start/end times).
Never edit script.md/script.json/assets/voice.wav, never run voice.py. Do NOT render 4K or final (the orchestrator runs
finish.sh), do NOT upload, do NOT git add/commit/push. Use `trash`, never `rm`.

## Read first (lean: keep your context for the scenes)
Invoke the Skill tool `whiteboard-video-studio`, then read only: `references/asset-library.md` (how to find and place
assets), `references/engine-api.md` (scene/timing API), `references/style-guide.md` §1–§4 (still-look tokens), the ★
clickbait section at the top of `references/thumbnail-designer.md`, and `references/youtube-package.md`. For helper style,
read the first ~80 lines of `episodes/38-full-brain/scenes.js` and its `package.md`. **Do not read** `library/*.js`,
`scripts/engine2.js`, `scripts/kit.js`, gallery or example scenes, or any other episode's whole `scenes.js` (each is
100+ KB): use `lib.py find/show` for anything you need. Scaffold hyperframes.json, meta.json, package.json by copying
from `episodes/38-full-brain` and editing ids/names.

## Visual rules
- Still look (`// look: still` + `// @library auto`) with **0.6 s crossfades, no hard cuts** (owner rejected flicker). Scenes 4–8 s; keep motion alive inside a scene
  (props pop in on the spoken word with `W(clip, word)`, camera drift, count-ups) so a 9-min video has ~70–110 scenes.
- One image per clause: whatever the narrator names appears when it is said. Numbers on screen exactly as sources.md.
- Dave is the recurring stick-figure everyman (same look as earlier episodes). Real people: no likenesses; a labelled
  generic figure is fine. No gore, nothing scary for its own sake.
- QA rule: no glow or fill over faces (use ring outlines). Keep character colours consistent.
- One recurring diagram/object that evolves across sections (see the script's beat sheet).
- `scene_lint` must pass; `python3 S/scripts/build.py .` then `npx hyperframes check` 0 errors. Snapshot contact sheets,
  READ them yourself, fix what looks wrong (overlaps, text off-screen, empty frames, unreadable labels).
- **Empty shot starts (2026-10-29, eps 46/47/49):** a shot whose background/subject pops in on a later W() cue opens on bare paper. Every shot shows its background + main subject from its first frame; only labels/cards pop on words. QA: snapshot every shot at start +0.35 s (scene_gaps.py can't see this; it only checks coverage). Render blank_scan flags the long ones.
- Heavy Chrome builds/snapshots: wrap in `lockf -t 3000 ~/videos/black-hole-life/.heavy.lock <cmd>`.

## Package (`package.md`, same format as 27-not-behind)
- Title: the pick from `title.md` (you may improve it; ≤ 55 chars).
- Description: 2–3 sentence hook summary, **chapters** (from the `# chapter:` comments in script.md mapped to the first
  clip of each section via clipt.json; first chapter 0:00; ≥ 3 chapters, each ≥ 10 s), Sources list from sources.md, one
  closing line. **Never mention AI, TTS, VoiceStudio, or any voice/AI tool anywhere.**
- Tags (≤ 450 chars), and a pinned-comment draft (a question viewers can answer).
- Thumbnails: two variants (A = pick, B = test partner) per thumbnail-designer.md (1–3 words, one big idea, our style),
  `thumbnails/thumb-a.js`, `thumb-b.js` → `a.png`, `b.png`; run thumb_check and read the `*_grid.jpg`.

## Environment
Python tools that need packages: `~/.local/bin/uv run --offline --with numpy --with pillow --with soundfile python <script>`
(add `--with` for whatever import fails). Do not install models. Transcription (if needed):
`curl -s -X POST http://127.0.0.1:3900/v1/audio/transcriptions -F file=@<wav> -F model=whisper-1`.

When done, create an empty file `READY` in the episode folder. Final reply: scene count, check/lint results, the contact
sheets you reviewed, thumbnail pick, title pick, and anything the owner should look at.

## Asset library lookup (added 2026-10-22)
Optional shortcut (draw your own whenever it fits the scene better): the library has 2,300+ assets (charts, anatomy, nature, food, cosmos, creatures, psychology metaphors, full world backgrounds, people duos/dancing/kiss, vehicles with drivers, activities and jobs,
props, rooms, the ep38/ep40 cast and sets): `python3 ~/.claude/skills/whiteboard-video-studio/scripts/lib.py find <words>` then `show <name>`.
Never read `library/*.js`. Put `// @library auto` as the 2nd line of scenes.js, call `L.put(S, name, x, y, {s, t: W(c,w)})`, and run
`lib.py check scenes.js` before building. Something reusable you had to draw yourself goes into `library/episode-kit.js`-style files
via `L.reg` (contract: `library/AGENTS.md`), not into one episode.
