# Library agents: shared contract (read fully before writing code)

Read `BRIEF.md` (what the owner wants), then `core.js`, `people.js`, `stylelab.js` and `index.html` in this folder. You
write ONE file (named in your task) that registers assets with `L.reg`. Do not edit any other file; if you need a hook
in core/people, say so in your final reply instead.

## File shape
```js
// ===================== library/<file>.js — <what> =====================
(function () {
const L = window.L, f1 = L.f1;
// ... helpers local to this file ...
L.reg("<category>", "<unique-name>", (o) => markup, { box: [x0, y0, w, h], group: "<sub-heading>", label: "Nice Name",
  tags: ["…"], call: 'L.put(S, "<name>", x, y, { s, t, time })', demo: { …options shown in the gallery… }, wide: false });
})();
```
- Names are kebab-case and unique across the library; prefix with your area when ambiguous (`prop-mug`, `sky-dusk`).
- `fn(o)` returns an SVG markup STRING drawn around the origin (0,0). `box` is the gallery viewBox around it.
  Standing things (people, trees, houses, furniture, vehicles, animals): origin = bottom centre on the ground.
  Floating things (props in hand, icons, effects): origin = centre. Backgrounds/scenes: box [0, 0, 1920, 1080], origin top-left.
- **Draw only through the tokens:** `L.shape(d, colourName, { w: "prop"|"char"|"scene"|"detail"|"hair", tone, flat, dir, s })`,
  `L.stroke(d, { c, w, s })`, `L.flat(d, colourName, opacity)` (no outline: sky, shading, glints), `L.text(str, x, y, { size, c, halo })`,
  `L.shadow(cx, gy, w)`, `L.c(name, tone)`, `L.paint(name)`, path helpers `L.circ L.rect L.rrect L.poly L.line L.smooth L.arc
  L.arcPts L.star L.limb`, `L.g(inner, transform)`, `L.rng(seed)` (deterministic randomness: never Math.random), `L.inline(name, o)`
  to reuse another asset. Colour names: keys of `L.BASE` (core.js). **Never hard-code hex colours, widths or fonts** in an asset:
  then every asset follows the owner's chosen Look (outline width/colour, corner radius, shading, palette, font) automatically.
  Rounded corners go through `L.rrect` (it applies the radius token).
- Time-of-day variants: take `o.time` = "day" | "sunset" | "night" (and "light"/"dark" for interiors), and register one
  gallery tile per variant (e.g. `scene-beach-day`, `scene-beach-sunset`, `scene-beach-night`, each `demo: { time }`), or one
  asset with `group` and three registrations. Night = darker palette tones + lit windows/moon, never just a grey overlay.
- Quality bar: our videos' "still" look: lit from the top-left, volume via the gradient tokens, a contact shadow under
  standing things, friendly rounded forms, readable at thumbnail size. Original designs only: no brands, logos, copyrighted
  characters or real-people likenesses; nothing gory or sexual; nothing that flashes.
- Reasonable markup size (a prop ≈ 1–6 KB; a full scene ≤ 40 KB). Errors inside fn are caught and logged; check the console.

## Check your work (required)
Preview only your category, with headless Chrome (cheap; no lock needed, but run one at a time with `nice`):
```sh
cd ~/.claude/skills/whiteboard-video-studio/library
nice -n 10 "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --hide-scrollbars \
  --virtual-time-budget=6000 --window-size=1600,4000 --screenshot=$SCRATCH/<file>.png "file://$PWD/index.html?only=<category>"
```
(`$SCRATCH` = your own scratchpad subfolder; crop tall screenshots with Pillow via
`~/.local/bin/uv run --offline --with pillow python …`.) READ the images, fix ugly/broken/unreadable tiles, repeat until every
tile is good. Also run `node -e "global.window={};['core','people','stylelab','<file>'].forEach(f=>require('./'+f+'.js'));const L=window.L;L.ITEMS.forEach(i=>{const s=L.svg(i.name,i.demo||{});if(s.includes('<!--'))console.log('ERR',i.name,s.slice(0,200))});console.log(L.ITEMS.length)"`
and make it print no ERR lines. Also check under another Look: add `&look=D` is not supported, so test with
`L.look("E")` (no outlines) and `L.look("C")` (bold) in the node check that nothing throws.

## Rules
- `trash`, never `rm`. No git. No downloads, no installs. Don't touch episodes or the engine.
- Final reply: file, number of assets registered (by group), the screenshots you read, anything you couldn't do.
