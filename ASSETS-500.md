# +500 assets batch (2026-10-22): shared brief for 8 library agents

The owner wants 500 more good assets for the Black Hole Life videos ("What If…?" science, psychology, body, space, history, food,
money, everyday life). Library: `~/.claude/skills/whiteboard-video-studio/library/` (1,695 assets now).

1. Read `library/AGENTS.md` fully (the contract: file shape, tokens only, origins, time variants, quality bar, checks), then
   `library/BRIEF.md`, `core.js`, `people.js`, `stylelab.js`. Skim one existing file close to your theme for style (e.g.
   `science.js`, `story.js`, `modern.js`); don't read more than you need.
2. Write ONLY your own new file (named in your task). Every asset name starts with your prefix (unique across the library:
   check with `python3 ../scripts/lib.py find <word>` before naming; don't duplicate an asset that already exists, make the
   missing ones). Use your category name in `L.reg`, 5–9 `group`s, good `tags` (words a video maker would search), a `call`
   line and a `demo`.
3. **At least 65 assets**, each one genuinely useful in a video scene and good at thumbnail size: friendly rounded forms, lit
   from the top-left, volume via the gradient tokens, contact shadows under standing things. Variety over near-duplicates
   (colour/time variants count only when they're real variants, max ~10 % of your total). Big readable shapes; text inside an
   asset only when it's the point (labels, signs), through `L.text`.
4. Honesty and safety: original designs; no brands, logos, real people or copyrighted characters; nothing gory, sexual or
   scary for its own sake; nothing that flashes.
5. Checks (required, from AGENTS.md): the node check prints no ERR lines (also under `L.look("C")` and `L.look("E")`); then
   `lockf -t 900 ~/videos/black-hole-life/.gallery.lock sh -c 'node build-catalog.js && nice -n 10 "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --hide-scrollbars --virtual-time-budget=6000 --window-size=1600,6000 --screenshot=<your scratch>/<file>.png "file://$PWD/index.html?only=<category>"'`
   (the lock keeps 8 agents from running Chrome / the catalog at once). READ the screenshots (crop to tiles with Pillow:
   `~/.local/bin/uv run --offline --with pillow python …`), fix every ugly, broken, clipped or unreadable tile, repeat.
6. `trash` never `rm`; no git; don't edit any other file (engine, episodes, other library files, catalog by hand).
Final reply (short): file, asset count by group, screenshots read, anything weak you couldn't fix.
