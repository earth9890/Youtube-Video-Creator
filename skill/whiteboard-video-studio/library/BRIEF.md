# Asset library brief (owner request 2026-10-22, scheduled 06:00)

Owner: "improve our characters, animations, everything ... for faster video generation ... a dataset / assets, like a
videographer would have ... really really big ... from grass to sky, everything ... see all of it in a single index.html
with names ... take care of light, dark, night, moon, sun, day." Also: "first give me like 10 different kinds of
stickmans ... I choose one for our main ... then a bunch of stick girls ... variations: biceps, really skinny ...".

## What to build
A reusable, code-drawn asset library in **this folder** (`~/.claude/skills/whiteboard-video-studio/library/`), drawn with
the same SVG engine as our videos (`scripts/engine2.js` v3 branch + `scripts/kit.js`; read `references/engine-api.md`
and `references/style-guide.md` first). Vector code, not bitmaps, so every asset can be dropped into a `scenes.js`
or a thumbnail directly and animated. Optional PNG contact sheets for preview only.

**`library/index.html`** — one gallery page the owner opens by double-clicking (works from `file://`: no fetch, no
server; scripts loaded with relative `<script src>`, catalog embedded as JS). Every asset drawn live in a tile with its
**name**, category, tags and the exact one-line call to use it. Category sidebar, search box, size slider, and a
**light / dark / night** background toggle. A counter of total assets at the top.

## 0. Style lab FIRST: the owner picks the look (added 2026-10-22)
Owner: "current one is good but it seems not that much good, and better there is a difference ... I want to choose
something that's correct to use in our future videos ... the strokes, the width of the outlines, whatever".
So before the big library, build a **Style lab** section at the top of the gallery (and `library/style-lab.html` as a
standalone page) where the *same* test scene (Dave + a girl + a prop + sky/ground, day and night) is drawn under many
look settings, side by side, each tile named ("Line 04", "Head 02", …) so the owner can choose by name:
- **Outline width:** 5–6 steps (hairline → bold) at 1080p, for characters and for props/scenery separately.
- **Outline colour:** black, dark ink/navy, darker-shade-of-fill, none (flat shapes only).
- **Line ends and joints:** round vs square caps, round vs sharp corners, corner radius on props/buildings (0 → large).
- **Limb thickness and taper:** thin stick, medium, thick, tapered (rubber-hose).
- **Head:** size ratio to body (small → chibi), shape (circle, oval, bean), filled white vs coloured vs outline-only.
- **Shading:** flat, cel (one hard shadow), soft gradient; with and without drop shadow / ground shadow.
- **Palettes:** current v3 plus 4–5 alternatives (pastel, bold primary, warm storybook, muted documentary, high-contrast).
- **Fonts:** Mali SemiBold (current) plus 5–6 hand-lettered/rounded alternatives, at caption and title size.
- **Combined looks:** 8–10 complete "look presets" (A … J) that mix the above into coherent styles, current v3 = Look A.
Make all of these **style tokens** (one theme object: stroke widths, colours, caps, radius, head ratio, shading,
palette, font), and draw the whole library through those tokens, so the owner's pick becomes the default with one
change and every asset follows it. Build the library on the current tokens; switching later must be one edit.
Show the style lab to the owner first in the push notification ("pick Look X + Man NN + Girl NN").

## Contents (aim for 600+ named items, counting variants)
1. **Pick-the-main sheet (first section of the gallery):** 10 clearly different stickman styles (current Dave v3 =
   style 01 reference; e.g. classic line, chunky round, tall lanky, bean body, block body, rubber-hose limbs, dot-eye
   minimal, thick comic outline, chibi big-head) and 10 stick-girl styles (bun, ponytail, bob, long, curly, braids,
   pixie, hijab, afro puffs, pigtails…). Each shown in the same 5 poses (stand, wave, point, think, shocked), labelled
   "Man 01 … Man 10", "Girl 01 … Girl 10". The owner will pick one of each as the main cast.
2. **Body variants** (as parameters that work on any style): muscular/biceps, skinny, chubby, tall, short, kid, teen,
   elderly, baby; a range of skin tones.
3. **Outfits and hair/accessories:** t-shirt, hoodie, suit, lab coat, doctor, nurse, astronaut, chef, builder, farmer,
   athlete, pyjamas, caveman, king/queen, pirate, knight, wizard, student, office worker; glasses, hats, backpack,
   headphones, watch, bag.
4. **Faces:** 25+ expressions (happy, laughing, sad, crying, angry, shocked, scared, confused, sleepy, sick, bored,
   smug, nervous sweat, determined, dizzy, in love (hearts, non-sexual), thinking…), blink, 6 talking mouth shapes.
5. **Poses and motion:** the existing poses (stand sad point pointL armsUp shrug think hips wave cross head reach reachL
   hold push) plus 25+ new (run, jump, sit, lie down, fall, dance, lift, carry, pull, throw, facepalm, cheer, kneel,
   climb, swim, sleep…), and frame sets (sprite-sheet style) for walk, run, wave, talk, idle bob.
6. **Sky and light:** day, dawn, sunrise, sunset, dusk, night, starry night, overcast, storm; sun (several styles),
   moon (all phases), clouds (6+), stars, rainbow, rain, snow, fog. Lightning must not flash (static bolt only).
7. **Ground and scenery:** grass, sand, snow, dirt, road, water, lava; hills, mountains, trees (8+), forest, city
   skyline, houses, school, hospital, office, shop, farm, beach, desert, jungle, cave, underwater, space, Moon surface,
   planets, black hole, Earth from space. **Every outdoor scene in day / sunset / night variants.**
8. **Interiors:** bedroom, kitchen, living room, classroom, lab, office, bathroom, hospital room, gym — light and dark.
9. **Props (150+):** food and drink, kitchen, furniture, tech (phone, laptop, TV), tools, science (beaker, microscope,
   DNA, atom), space (rocket, satellite, telescope), money (coins, notes, gold bars, piggy bank), medical (pill bottle,
   stethoscope), sports, music, school, toys, vehicles (car, bus, bike, plane, ship, train, taxi), signs.
10. **Animals (30+):** dog, cat, bird, fish, ant, bee, spider, cow, horse, elephant, lion, monkey, shark, whale, owl,
    penguin, beetle, turtle, frog, snake…
11. **Body diagrams (friendly, never gory):** brain, heart, lungs, stomach, kidneys, bones, muscles, eye, neuron, cell.
12. **Text and graphics:** title cards, chapter cards, labels/tags, speech and thought bubbles, caption styles, number
    counters, arrows, circles/highlights, stamps ("?!", "WOW", "NOPE"), charts (bar, pie, line, gauge/dial, timeline),
    thumbnail text presets (yellow #FEFE06 with black halo, white on dark), lower thirds.
13. **Effects (no flashing, no strobing — photosensitivity):** sparkle, dust puff, steam, smoke, motion lines, sweat
    drops, zzz, hearts, question marks, speed lines; camera moves and the 0.6 s crossfade as named presets.

## Rules
- **Additive only:** never change existing engine/kit function signatures or defaults; existing episodes must build
  exactly as before. New code lives in `library/*.js` (one file per category) plus `library/catalog.js`.
- Match the v3 look (Mali SemiBold, outline weights and palette from style-guide.md); light and dark themes.
- Original designs only: no copyrighted characters, brands, logos or real-people likenesses. No gore, nothing sexual.
- Heavy Chrome work (snapshots, PNG sheets) under `lockf -t 3000 ~/videos/black-hole-life/.heavy.lock`; the overnight
  video batch (NIGHT-STATE.md) has priority — never stop or delay its renders.
- `trash`, never `rm`. No git commit (owner approval needed).
- Check quality by snapshotting the gallery (or per-category sheets) and READING the images; fix broken or ugly tiles.

## Wiring it in (so videos get faster)
- `references/asset-library.md`: how to use the library (include line, calls, parameters, categories) and a rule that
  build agents use library assets before drawing new ones, and add any new reusable asset they draw back to it.
- One line in `SKILL.md` pointing to it. Once the owner picks the main man/girl, make those the defaults.

## How to run it (orchestrator)
Design the shared API and file layout yourself first (character constructor with style/body/outfit/face/pose params,
scene/background constructor with time-of-day, prop registry, catalog format, gallery shell). Then fan out sonnet
agents, one category group each, in separate files. Integrate, snapshot, review, fix. When done, PushNotification the
owner: open `~/.claude/skills/whiteboard-video-studio/library/index.html`, and pick Man NN + Girl NN.
