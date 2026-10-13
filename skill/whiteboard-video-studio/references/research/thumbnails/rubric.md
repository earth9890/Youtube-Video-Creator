# Thumbnail analyst brief (one agent per channel group)

Goal: find out **why some thumbnails of a channel get 3–30× the views of their neighbours and others flop**, and turn that into rules we can build with our engine: flat-colour whiteboard scenes, stick figures with big white round heads, hand-marker text (Mali), arrows, simple props. No photos, no AI images.

## Inputs (in `~/videos/research/thumbs/`)
- `sheets/<ch>_top.jpg`: the 12 biggest outliers. `sheets/<ch>_bottom.jpg`: the 6 worst. `sheets/<ch>_latest.jpg`: the 6 newest, which show the current style. Each tile is labelled `#n  views  xPerf`.
- `sheets/<ch>.tsv` maps `#n` to id, title and OCR text.
- **Perf** = views ÷ median views of the 7 uploads either side. x1 = normal, x5 = a hit, x0.3 = a flop. "new" = too new to score.
- Full-size images are in `img/<id>.jpg` (1280×720). Open any thumbnail you need to see closely.
- `metrics.tsv` holds pixel stats for every upload: lum, contrast, sat, colorful, edges (clutter), black/white share, words, text_area, text_h. `metrics-summary.txt` has the channel medians and the top-vs-bottom deltas.
- Caveat: these are the **current** thumbnails. Big channels A/B-test and swap thumbnails, so what you see is the winner of the test, not necessarily the one shown at upload.

## Do
1. Look at every tile on all three sheets of both channels. Zoom into full-size images whenever a detail matters, such as text treatment, outline thickness or facial expression.
2. Label every thumbnail into `data/thumb-labels-<group>.json`: a JSON list, one object per tile, using exactly this schema.
```json
{"ch": "kurzgesagt", "n": 1, "id": "…", "group": "top|bottom|latest", "perf": "x4.2",
 "archetype": "A|B|C|D|E|F|other:<short name>",
 "bg": "flat|scene|black|white|gradient|photo", "palette": ["#hex", "#hex", "#hex"],
 "elements": 3,
 "character": {"present": true, "count": 1, "height_pct": 55, "emotion": "worried", "gaze": "viewer|object|away|none"},
 "text": {"words": 2, "content": "ALL YEAR?", "color": "#FEFE06", "outline": true, "position": "top|left|right|center|bottom|none", "height_pct": 22, "kind": "question|fragment|number|label|none"},
 "arrow": false, "focal": "rusted Titanic, right half",
 "question": "the question a viewer asks in 0.3 s",
 "title_relation": "complement|repeat|none",
 "glance": 2}
```
   - **Archetypes:** A = figure + strange object + question text. B = one symbol on black, no text. C = big face with one oddity + arrow. D = split contrast. E = odd one out in a line-up. F = scale comparison (tiny vs huge). Add `other:<name>` for anything new.
   - `elements` = distinct things the eye must parse.
   - `glance` is your judgement at 160 px wide: 0 unclear, 1 readable, 2 obvious in one look.
3. Write `thumbnails/<group>.md` with these sections:
   - **Channel style fingerprint**, per channel: palette with hexes, background, character design, text treatment (font feel, colour, outline, size, position), composition grid, how the style evolved (old vs latest).
   - **Top vs bottom:** what the outliers share that the flops lack. Use concrete tile numbers and give counts ("9/12 top have X; 1/6 bottom").
   - **Curiosity mechanics:** what question each top thumbnail plants, how it pairs with the title (thumbnail ≠ title), and which "wrongness" triggers are used (impossible scale, a thing in the wrong place, danger about to happen, a weird number, a forbidden object).
   - **Space/science topics specifically** (our niche: black holes, the universe, the body, history oddities): how these channels draw "huge", "dark", "infinite", "inside something".
   - **Rules:** 8–15 rules, each with evidence (tile numbers or counts), and each buildable by us with flat shapes and stick figures.
   - **Recipes:** 3 build specs a designer could follow without seeing the originals (canvas 1920×1080, positions, sizes, hex colours, text, the character's pose and expression), each derived from a specific top tile.
   - **Don'ts:** what the flops do.
4. Be concrete. Write "yellow #FEFE06 text, black outline ≈ 14 % of letter height, top band 80 % wide", not "bold text". Quote numbers from `metrics.tsv` when they support a point.
5. Do not copy any thumbnail. We are learning patterns, not cloning images.
