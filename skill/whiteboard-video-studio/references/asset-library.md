# Asset library (`library/`)

2,300+ ready-made, code-drawn assets (live count: `lib.py cats`) (people, faces, poses, clothes, skies, places, rooms, props, vehicles, animals, body
diagrams, text, effects) plus a style lab of 10 complete Looks. Gallery: open `library/index.html` (double-click; names,
search, size slider, light/dark/night, Look switcher). `library/BRIEF.md` = what the owner asked for; `library/AGENTS.md`
= the contract for adding assets.

## How to find and use an asset (do this; NEVER read or paste library/*.js)
The library source is ~700 KB; reading it wastes your context. The lookup CLI answers in a few lines:
```sh
LIB="python3 ~/.claude/skills/whiteboard-video-studio/scripts/lib.py"
$LIB find <words>      # ranked hits: name | cat/group | tags | exact call   (--cat C, -n 10, --json)
$LIB show <name>       # call, options + allowed values (poses, faces, outfits, colours…), origin, KB, file, deps
$LIB cats · $LIB groups <cat> · $LIB names <prefix>     # browse; library/INDEX.md = 6 KB overview
$LIB check scenes.js   # every L.put/L.svg/L.inline name + person options; did-you-mean; exit 1 on a miss
```
1. `find` → pick a name → `show` it if you need options → paste the call into scenes.js.
2. First lines of scenes.js: `// look: still` then `// @library auto` (build.py pastes only the files your names need,
   plus their deps, and prints the KB saved; `// @library auto,sky` forces an extra file when a name is computed at runtime).
3. `lib.py check scenes.js` (also part of `scene_lint.py`) before building. The catalog rebuilds itself when library files change.

**Example 1, a girl doctor waving.** `$LIB find girl doctor -n 3` →
`outfit-doctor | people/Outfits | person,clothes | L.put(S, "person", x, gy, { style: "man01", outfit: "doctor", outfitC: "teal", t })`.
`$LIB show person` lists styles, bodies, poses, faces, outfits, hair, accessories. Use
`L.put(S, "person", 700, 900, { style: "girl01", outfit: "doctor", pose: "wave", face: "happy", t: W(2, 0) })`.

**Example 2, a park at night.** `$LIB find park night -n 3` →
`scene-park-night | scenery/Places | … | L.put(S, "scene-park-night", 0, 0)` (backgrounds: origin top-left, put at 0, 0),
plus `lamp-post-night` and `sky-night` for a custom build. Day and sunset variants: `$LIB names scene-park`.

**Example 3, a red car driving past.** `$LIB find red car -n 3` → `veh-car | objects/Vehicles | … | L.put(S, "veh-car", x, gy, { color, flip, s, t })`;
`$LIB show veh-car` says origin = bottom centre on the ground, `color` = any colour name (list printed). Use
`const car = L.put(S, "veh-car", 300, 905, { color: "red", t: W(3, 1) })`, then move the returned `<g>` with the engine as usual.
A typo such as `L.put(S, "car-red", …)` makes `check` print `unknown asset "car-red" -> did you mean: veh-car, …` and exit 1.

## Rule for build agents
**The library is for speed, not a constraint.** Use an asset when it fits the beat; draw new frames, props, characters and
scenes whenever that makes a better picture, and never bend a scene to fit an existing asset. If you draw something reusable that the library lacks, add it to the
right `library/<category>.js` with `L.reg` (contract in `AGENTS.md`) instead of keeping it inside one episode.

## In a video (`scenes.js`)
```js
// look: still
// @library auto                 ← build.py pastes core + people + stylelab + only the files these names need (use this)
// @library                      ← or every category file (~700 KB);  // @library props-home,sky = only those
L.look("A");                     // the owner's chosen Look (style tokens); omit for Look A
{ const S = scene(a, b);
  L.put(S, "scene-park-day", 0, 0);                                   // backgrounds: origin top-left, 1920×1080
  L.put(S, "man01", 760, 900, { pose: "wave", face: "happy", s: 1.2, t: W(3, 0) });   // people: origin = feet centre
  L.put(S, "person", 1100, 900, { style: "girl01", outfit: "labcoat", acc: ["glasses"], face: "thinking", flip: true });
  L.put(S, "prop-coffee-mug", 1400, 760, { s: 1.4, t: W(4, 2) });    // props: origin = centre; t = fade in on that word
}
```
`L.put(S, name, x, y, { s, t, flip, rot, parent, look, ...assetOptions })` returns the `<g>`; it fades in over 0.35 s at
`t` (or is there from the scene start). People scale their own line weights by √s (like engine figures); everything else
scales by transform. Mix with engine/DS calls freely (`S.text`, `DS.card`, `S.move(g, …)`).

## People
`L.person({ style, body, skin, hair, hairC, outfit, outfitC, armC, acc: [...], face, look, mouth, pose, legs, sit, s })`
- `style`: cast `man01…man10`, `girl01…girl10` (design: head, limbs, torso). Owner picks the main pair in the gallery.
- `body`: regular muscular skinny chubby tall short kid teen elderly baby · `skin`: s1…s6 (with Look head fill "skin")
- `face`: 40 expressions (`L.FACES`) · `mouth`: talking shapes a e o m f l · `pose`: 47 (`L.POSES`, legs via `L.POSE_LEGS`)
- cycles: `cycle-walk`, `cycle-run`, `cycle-wave`, `cycle-talk`, `cycle-idle`, `cycle-jump`, `cycle-nod`, `cycle-shake` with `{ frame }`
- anchors without drawing: `L.anchors(opts)` → `{ hd, R, sh, hip, hands: [L, R], … }` (place props in hands)

## Looks (style tokens)
`L.look("A"…"K")` (K = pure stick: token `stick: true` turns every person into man02/girl02 stick figures + thin lines; the Black Hole Life default, injected by build.py for projects under ~/videos/black-hole-life) or `L.look({ line: { char: 9 }, ink: "shade", palette: "storybook", font: "Fredoka" })`. Tokens: outline
widths, outline colour (ink/navy/shade/none), caps and corner radius, limb style, head ratio/shape/fill, shading
(grad/flat/cel), ground shadow, palette, font. Every asset reads them, so one call restyles the whole library.
Fonts other than Mali, Patrick Hand and Caveat are Google Fonts: copy the chosen font's TTF into `brand/` and the
`@font-face` in `build.py` before using it in a video.

## Names
`lib.py find / names / groups / cats` (above), `library/INDEX.md` (categories, groups, prefixes), or the gallery. Generated
files (`node library/build-catalog.js`, run automatically by lib.py): `catalog.json` (one line per asset), `INDEX.md`,
`manifest.js` (the gallery loads every library file from it, so a new `library/<file>.js` shows up without editing index.html).
Categories: cast, people (bodies, skin, outfits, hair, accessories), motion (faces, poses, cycles, camera), sky (skies,
sun, moon phases, clouds, stars, weather, ground × day/sunset/night), scenery (nature, street, buildings × night, 20+
places × day/sunset/night), interiors (20 rooms × light/dark, 41 furniture), props (home, food, tech, tools, toys),
objects (science, space, money, medical, sports, vehicles, signs), animals, body, text, effects.
