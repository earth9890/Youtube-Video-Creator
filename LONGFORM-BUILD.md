# Long-form build brief (episodes 28–37)

You build the visuals for one 8–10 min Black Hole Life episode. The script is final and already voiced
(`script.md`, `script.json` = one entry per clip, `assets/voice.wav`, `assets/clipt.json` = clip start/end times).
Never edit script.md/script.json/assets/voice.wav, never run voice.py. Do NOT render 4K or final (the orchestrator runs
finish.sh), do NOT upload, do NOT git add/commit/push. Use `trash`, never `rm`.

## Read first
Invoke the Skill tool `whiteboard-video-studio`. Read engine-api, craft-playbook §C/§E/§G, style-guide (the still look:
kit.js, scene_lint), the gallery scenes.js, `references/story-explainer.md` §1 and §3+ (long-form visuals and
packaging), `references/thumbnail-designer.md`, `references/youtube-package.md`. Study finished episodes for look and
quality: `episodes/24-not-too-old`, `episodes/27-not-behind` (scenes.js, thumbnails/*.js, package.md) and the 8-min example
`examples/toothache-story/`. Scaffold hyperframes.json, meta.json, package.json by copying from 27-not-behind and editing
ids/names.

## Visual rules
- v3 look with **0.6 s crossfades, no hard cuts** (owner rejected flicker). Scenes 4–8 s; keep motion alive inside a scene
  (props pop in on the spoken word with `W(clip, word)`, camera drift, count-ups) so a 9-min video has ~70–110 scenes.
- One image per clause: whatever the narrator names appears when it is said. Numbers on screen exactly as sources.md.
- Dave is the recurring stick-figure everyman (same look as earlier episodes). Real people: no likenesses; a labelled
  generic figure is fine. No gore, nothing scary for its own sake.
- QA rule: no glow or fill over faces (use ring outlines). Keep character colours consistent.
- One recurring diagram/object that evolves across sections (see the script's beat sheet).
- `scene_lint` must pass; `python3 S/scripts/build.py .` then `npx hyperframes check` 0 errors. Snapshot contact sheets,
  READ them yourself, fix what looks wrong (overlaps, text off-screen, empty frames, unreadable labels).
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
