# Overnight batch: episodes 19, 22, 23, 24, 26 ("You Are Not ___" series), 2026-10-15

The owner is asleep and has pre-approved everything for this batch: script, voice and visuals. **Do not stop to ask for approval at any gate.** You are the only quality gate, so judge your work as harshly as the owner would. The owner rejected fact-list scripts as "a 5-year-old's essay" and dislikes flicker.

One agent per episode, each in a fresh context. Your episode folder is already scaffolded: `hyperframes.json`, `meta.json`, `package.json`, and empty `assets/`, `thumbnails/`, `renders/`.

Paths:
- Skill: `~/.claude/skills/whiteboard-video-studio` (S below).
- Episodes: `~/videos/black-hole-life/episodes`.

## Read first (in this order)
1. `S/SKILL.md`
2. `S/references/story-engine.md`
3. `S/references/script-writer.md`
4. `S/references/style-guide.md`, plus the still-look and `DS.*` parts of `S/references/engine-api.md` and `S/scripts/kit.js`
5. `S/references/thumbnail-designer.md`
6. **The reference episode to match in quality and format:** `episodes/16-not-dumb/`. Read `script.md`, `sources.md`, `scenes.js`, `thumbnails/thumb-a.js`, `thumbnails/thumb-b.js` and `package.md`.

## Format
- 60–80 s, about 180–240 spoken words.
- Mystery or other story engine, with Dave as the test dummy, the same as ep16.
- Series promise: relieve the insecurity with true science and **one safe, concrete action** at the end.
- No shaming, no miracle fixes, no medical claims beyond what the sources say.
- Don't use the "1968 study, professor judged taller / 1 cm taller in the morning" angle (owner disliked it).

## Originality (YouTube reused-content and copyright rules)
You may look at other channels for topic and structure ideas: DayOne Films (`@dayonefilmsofficial`), Zenn, Past Tense, Kurzgesagt and others. Our study notes are in `S/references/research/`.

**Never copy or closely paraphrase anyone's transcript.** Write an original story: your own plot for Dave, built from facts you verified, with a source in `sources.md` for every fact. Verify every number and name on the web (WebSearch/WebFetch). If a famous "fact" turns out to be a myth, that is a gift: use it as the fake-out.

## Pipeline (all of it, no gates)
1. **Script.** Write `script.md` with the story card, beats and delivery markup.
   - `python3 S/scripts/script_lint.py script.md` must PASS.
   - Self-score ≥ 40/48.
   - Before going on, ask yourself whether it has a want, a BUT, a fake defeat and a twisted payoff of the hook. If not, rewrite it.
2. **Voice** (heavy, so wrap it in the lock; see below).
   ```
   lockf -t 540 ~/videos/black-hole-life/.heavy.lock ~/.venvs/pocket/bin/python S/scripts/voice.py script.md assets --lead 0.4 --tail 1.5 --speed 1.0
   ```
   - Write numbers as words.
   - Check names: TTS mangles some at the start of a clip (e.g. "Messi" → "I see"), so use full names.
   - Verify with whisper (SKILL.md §4). If the lock times out, just retry.
3. **Scenes.** Write `scenes.js` in `// look: still`: 12–16 progressive illustrated stills built only from DS tokens, with every change landing on its spoken word.
   - `python3 S/scripts/scene_lint.py scenes.js` must PASS.
   - Then run these under the lock: `python3 S/scripts/build.py .` and `npx hyperframes check` (0 errors).
   - Snapshot at each scene end −0.8 s (not mid-crossfade) and READ every contact sheet. Fix floating props, labels over faces, overflow, unreadable text and wrong-looking props, then re-snapshot.
4. **Thumbnails.** Make `thumbnails/thumb-a.js` → `a.png` (the floor-raiser) and `thumb-b.js` → `b.png` (the lottery ticket).
   - Build: `python3 S/scripts/build.py . --thumb thumbnails/thumb-a.js thumbnails/a.png`.
   - Check: `thumb_check.py`, then READ the `*_grid.jpg`. If it doesn't read at feed size, redo it.
5. **Package.** Write `package.md` in exactly ep16's format:
   - `## Title options` with one line marked `← **pick**`, and which thumbnail pairs with it;
   - `## Description`, which must include chapters, sources, and must contain no `<` or `>`;
   - `## Tags` (8–12, comma-separated, ≤ 450 chars);
   - `## Pinned comment`.
6. **Hand-off.**
   - **Do NOT render, do NOT upload, do NOT touch git.** The orchestrator renders 4K from a queue and uploads.
   - When everything passes, write `READY`, a one-line file: `title | thumb a or b | duration s`.
   - That file is the signal for the render queue, so write it last.

## Heavy-command lock (16 GB Mac, 5 agents at once)
Prefix every Chrome, TTS or whisper command with `lockf -t 540 ~/videos/black-hole-life/.heavy.lock`:
- `voice.py`
- `whisper-cli`
- `build.py` (both with and without `--thumb`)
- `npx hyperframes check`
- `npx hyperframes snapshot`
- `thumb_check.py`

`lockf` exits 75 on timeout; wait and retry. Don't run them in the background, and don't run anything heavy outside the lock. Plain file edits and the lints are fine without it.

## Rules
- Use `trash`, never `rm`.
- Stay inside your own episode folder.
- Don't edit the shared skill scripts. If one has a real bug, work around it locally and report it.
- Don't create new shared helpers.

## Final report (your last message, ≤ 12 lines)
- Title
- Story question, and the answer
- Duration
- Lint results
- Weakest scene
- Anything you couldn't fix

## Changes for this batch (2026-10-15)
- **Never mention AI, TTS, Pocket TTS or any voice tool** in the title, description, tags or pinned comment (owner rule). Leave out the old "Voice:" line.
- Episodes 13–18, 20, 21 and 25 already cover fat, ugly, short, dumb, lazy, boring, failure, alone and unlucky. Your topic must not repeat their facts or studies; check their `sources.md` first.
- `lockf` waits: use `lockf -t 3000`. Run any command that may wait on the lock in the background (Bash `run_in_background`) and wait with Monitor. Foreground Bash dies at 10 minutes. Never end your turn while waiting: you'd go idle and stall.
- Write READY last, exactly as before. The orchestrator renders and uploads.
