# Thumbnail redo brief (2026-10-22): the owner says the new thumbnails are not clickable at all

The two reference sheets:
- ours now: `/private/tmp/claude-501/-Users-harish/9fb8dd73-44e1-4e3f-bde9-02342694c060/scratchpad/thumbs/current.jpg`
- Zenn (what works): `/private/tmp/claude-501/-Users-harish/9fb8dd73-44e1-4e3f-bde9-02342694c060/scratchpad/thumbs/zenn.jpg`
  (originals in `~/videos/research/channels/thumbs/Zenn0009_*.jpg`). READ both before designing.

## Why ours fail
1. Same template every time: Dave's head bottom-left, the same round-eyed "o" mouth staring at the camera. Monotonous.
2. Many small props, no single striking image. Zenn uses ONE big, almost visceral object (rotten meat with worms, a
   rusting wreck) or an extreme minimal symbol (one eye on black, "0:00").
3. Muted beige rooms. Zenn uses strong flat colour: black, deep blue, cream, sky.
4. Weak words ("MOVE IN?"). Zenn's words are short, concrete and odd ("2 SLEEPS?", "ROTTEN MEAT?", "RAISE IT?").

## Make exactly two new options for your episode
- **C — the consequence, at its extreme.** The what-if result shown as one big image filling ≥ 50 % of the frame,
  with Dave INTERACTING with it (eating, buried in, stretched by, trapped inside, frozen in…). Dave's expression is
  specific (panic, side-eye doubt, smug, frozen, queasy, not the default "o"), and his head is big but not always in
  the bottom-left. One strong saturated background colour; ≤ 2 secondary elements; no clutter.
- **D — the minimal symbol.** One iconic object on a solid black / deep colour / cream field, huge and centred
  (Zenn's eye / 0:00 style), optionally with a tiny Dave for scale. Text optional.
- Words: 1–3 words, huge (letters ≥ 22 % of the frame height), yellow `L.c("yellow")`-like or white with a thick black
  halo (`halo, haloW 0.09–0.1`), a concrete number or claim, not a copy of the title. Skip text when the image says it.
- Honesty: only what the video really shows. No brands/logos/real people, no gore (cartoon "gross" is fine, e.g.
  stink lines), nothing sexual, nothing that flashes, no fake YouTube UI. Body/food/drink topics: don't make the danger
  look fun to copy.

## How to build
- Work in `~/videos/black-hole-life/episodes/<EP>/thumbnails/`: write `thumb-c2.js` → `c2.png` and `thumb-d.js` →
  `d.png` (never overwrite a.png, b.png, c.png). Look at the existing `thumb-a.js` / `helpers.js` there and reuse helpers.
- Build: `cd <EP> && python3 ~/.claude/skills/whiteboard-video-studio/scripts/build.py . --thumb thumbnails/thumb-c2.js thumbnails/c2.png`
  (no lock needed for a thumbnail). The library is available too: `python3 ~/.claude/skills/whiteboard-video-studio/scripts/lib.py find <words>`
  and `// @library auto` + `L.put(S, name, x, y, o)` if build.py's --thumb mode handles it (test with a tiny file first);
  otherwise draw with the engine helpers as thumb-a.js does. Never read library/*.js or engine2.js.
- READ every PNG you make; also view it at feed size (e.g. 320 px wide next to `current.jpg`). Iterate until it would
  clearly beat the current one in a feed. Valid engine poses: stand sad point pointL armsUp shrug think hips wave cross
  head reach reachL hold push (an invalid pose silently stops drawing).
- Final reply: two lines, `c2.png: <what it shows> | words` and `d.png: …`, plus which one you'd pick and why (one line).
