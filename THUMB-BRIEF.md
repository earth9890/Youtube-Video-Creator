# Clickbait thumbnail batch brief (2026-10-20)

The owner wants a new clickbait thumbnail on every Black Hole Life video, in the style of episode 28's "NO WIFI?" tile
(`episodes/28-ancient-fun/thumbnails/thumb-c.js` → `c.png`, the reference build) and Zenn's "2 SLEEPS?".

## Do this for each episode you are given
1. Invoke the Skill tool `whiteboard-video-studio`; read `references/thumbnail-designer.md` — especially the **★ clickbait
   scene mode** section at the top, then §1 (the six laws). Look at `episodes/28-ancient-fun/thumbnails/c.png` and its
   `thumb-c.js`, and at Zenn's tile `~/videos/research/channels/thumbs/Zenn0009_01_st_Ah6Ykbh4.jpg`.
2. Read the episode's `script.md` (or `script.json`), `package.md` and current `thumbnails/a.png` to find the hook: the
   single most surprising thing the video really shows or says.
3. Write `thumbnails/thumb-c.js` in the episode folder (copy any helpers you need from that episode's own `scenes.js` /
   `thumb-a.js`, or from 28's `thumb-c.js`). Full warm scene + huge extreme-emotion figure in front + action + ≤ 2 small
   figures + the one wrongness + 1–3 words (yellow, black halo, top centre). Dave for our stories, period people for history.
4. Render: `cd <episode> && lockf -t 3000 ~/videos/black-hole-life/.heavy.lock python3 ~/.claude/skills/whiteboard-video-studio/scripts/build.py . --thumb thumbnails/thumb-c.js thumbnails/c.png`
5. **Read `c.png` yourself.** Fix anything wrong (invisible ink on dark backgrounds, cut-off text, figures off-frame, an
   invalid pose — valid poses: stand sad point pointL armsUp shrug think hips wave cross head reach reachL hold push — a
   script error silently stops everything drawn after it). Iterate until it is a strong, readable, click-worthy tile.
   It must stay under 2 MB (PNG 1280×720 is produced by build.py).

## Hard rules
- **Clickbait, never lies:** the hook must come from the video. No sexual/romantic content involving relatives or minors,
  no nudity, gore, real-person likenesses (name cards/generic figures only), fake YouTube UI, or claims the video doesn't make.
- Don't touch scenes.js, renders, the voice, package.md (except you may append one line "thumbnail C: <text>"), or git.
  Don't upload anything — the orchestrator swaps thumbnails on YouTube.
- Keep `thumbnails/a.png` and `b.png` as they are.
- Use your own scratchpad subfolder (other agents share the scratchpad). Use `trash`, never `rm`.

## Final reply
One line per episode: `folder | c.png path | thumbnail text | the hook in 6 words`, plus anything that failed.
