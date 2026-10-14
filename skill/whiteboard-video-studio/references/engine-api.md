# Engine v2 API (`scripts/engine2.js`) — for writing `scenes.js`

Canvas **1920×1080**. Ground line **`GY = 860`**. Captions occupy **y > 980** → keep all content **y < 940**. Every time argument is **absolute seconds**. `build.py` injects `THEME` and `TIMING`, then the engine, then your `scenes.js`, then captions. First line of `scenes.js` may be `// theme: dark` (chalkboard: dark grey board, chalk-white ink) — otherwise white paper.

## Looks (first lines of `scenes.js`)
| Marker | Look |
|---|---|
| *(none)* | v2 white paper, Patrick Hand, Caveat captions, crossfade + push camera |
| `// theme: dark` | v2 chalkboard |
| `// look: v3` | colour scenery, white-filled heads, ~9 px lines, Mali SemiBold, outlined white captions, blink/breathe, pop-in text, 0.3 s crossfade |
| `// look: still` | **illustrated stills (default for new videos)**: crisp vector, no draw-on, elements fade in on their word (progressive build), 0.6 s crossfade, slow camera. Loads `kit.js` (`DS.*` tokens and helpers: `DS.room`, `DS.outdoor`, `DS.figure`, `DS.shape`, `DS.card`, `DS.shadow`, `DS.frame`, `DS.rug`, `DS.plant`, `DS.vignette`). Rules: `style-guide.md`; lint: `scene_lint.py` |
| `// look: story` | v3 drawing for long-form explainers: **hard cuts** (no fade), camera `none` by default, **no captions**, text pops in 0.22 s. Cut on the breath: `sceneWindows(CUES, 0.08)`, one window per phrase (median ~2.5 s, max 6 s). Draw durations ≤ 0.3 s so the picture reads at once |

v3 / story extras:
```js
S.bg(kind, o)          // scenery, inserted behind everything. kinds: day night dusk desert room roomNight flat paper
                       //   story palette (flat field + floor band at hy≈830): white kraft chalk blueprint black navy space danger
                       //   o: { hy, sky, ground, floor:false, moon:false, clouds, tufts, window }
S.label(str, x, y, o)  // 1–3 CAPS words, pops in; o: { t, size=84, c=INK (RED for numbers), to:[x,y] arrow, bend, halo }
S.divider(x=960, t)    // split-screen black bar
S.zoom(x, y, k, t, dur) / S.pan(dx, dy, t, dur)   // camera on the content layer (seek-safe)
S.fig(cx, gy, { hair: short|side|curly|messy|spiky|bun|tick|none, hairC, outfit: tee|tunic|apron|hoodie, outfitC, breathe:false })
F.setPose(name, t)     // v3: arms swing smoothly (0.3 s)
S.text(str, x, y, { halo: "#111", haloW: 0.10, write: true })   // halo = outline (thumbnail yellow text; haloW = total stroke / size, 0.09–0.10 matches Zenn/Past Tense); write = old left→right wipe
S.crowd(..., { dress: [figOptions, ...] })
```
Figures stand with their feet on `gy` — on a band background pass the floor y (`S.bg(...).hy`).

## Colours
`INK PAPER RED GREEN ORANGE YEL BLUE GRAY LEAF SKY PINK CREAM GLOW` (theme-aware). Use at most **one accent colour per scene** plus ink.

## Timing helpers
```js
TOTAL                 // video length (s)
CLIP(c)               // [start, end] of sentence c (1-based) from script.json
W(c, i) / WE(c, i)    // start / end of word i (0-based) of sentence c
sceneWindows(cues, lead = 0.4)   // cues = [[c,i], ...] → [[start,end], ...]; first window starts at 0
```
Pattern (one scene per sentence or group of sentences):
```js
const CUES = [[1,0],[3,0],[5,0],[9,0],[12,0],[15,0],[17,0]];
const WIN = sceneWindows(CUES);
{ const [a, b] = WIN[0]; const S = scene(a, b); /* hero draws during the 2.6 s lead-in */ }
{ const [a, b] = WIN[1]; const S = scene(a, b); ... }
```
Rules: a scene's drawing must **finish ≥ 0.4 s before `b`**. Draw a prop **on its word**: `S.phone(…, W(4, 2), 0.9)`. Space the strokes so something new appears every 1–3 s; no dead holds > 2 s except a deliberate silent beat before the final line.

## Scene
```js
const S = scene(start, end, { cam: "push" | "pull" | "zoom" | "none", focus: "960 540" })
S.len, S.at(f) /*start+f*len*/, S.d(f) /*f*len*/
S.draw(pathD, t, dur, { c, w, fill, fo, parent, ease, op })   // stroke-on reveal; fill fades in near the end
S.fill(pathD, t, dur, color, opacity, parent)                 // no outline, fade in
S.seq([[d, weight, opts], ...], t, dur, parent)               // strokes one after another inside [t, t+dur]
S.text(str, x, y, { size: 64, t, dur, anchor: "middle"|"start"|"end", font: "ph"|"caveat", c, parent, weight, spacing, bold })  // bold = heavy stroke (default in thumbnails)
                                                             // handwritten, revealed left→right. "ph" = Patrick Hand (caps read best), "caveat" = script
S.fadeIn(el, t, dur) S.fadeOut(el, t, dur) S.show(el, t) S.hide(el, t)
S.move(el, t, dur, { x, y, rotation, scale, svgOrigin: "x y" }, ease)   // GSAP tween on any element/group
S.pop(el, t, cx, cy, dur)          // scale-in with overshoot
S.tilt(deg, t, dur)                // Dutch-angle the whole scene (±2–4° for a fall / shock); tilt back with 0
S.grp(parent)                      // empty <g>
```
Path helpers (return `d` strings): `poly(pts, jitter)`, `line(a, b, bow)`, `smooth(pts)`, `circ(cx, cy, r, ry)`, `rect(x, y, w, h)`, `rrect(x, y, w, h, r)`, `arc(cx, cy, r, a0deg, a1deg, ry)`, `arcPts(...)`, `rays(cx, cy, r1, r2, n, a0rad, span)`, `heartPath(cx, cy, s)`, `arrowHead(x, y, ang, len)`.

## Stick figure
```js
const F = S.fig(cx, groundY, { s: 1, pose: "stand", sit: false, c: INK, face: "smile", faceT, armL, armR, legL, legR, w })
```
Height ≈ 300·s (head top at `groundY − 300·s`). Poses: `stand sad point pointL armsUp shrug think hips wave cross head reach reachL hold push`.
```js
F.draw(t, dur)            // stroke-on head→body→arms→legs (dur 0.8–1.4 reads right)
F.instant(t)              // appear fully drawn
F.face(t, kind, dx)       // smile happy sad flat wow worried sleep determined tired cry angry ; dx shifts gaze (+ right)
F.setPose(t, name)        // swap arms instantly (a gesture beat)
F.walk(t, dur, { x, y })  // translate the figure's group with a leg cycle (x,y are deltas)
F.lie(t, dur, deg=88) F.rise(t, dur) F.slump(t, dur, deg) F.grow(t, dur, k)
F.hand("R"|"L", poseName?) → [x, y]  F.top() → [x, y]   // anchor props to hands / head
F.g (outer group, translate this) F.gi (inner group, rotates) F.hd F.sh F.hip F.r
```
Scale guide (cinematography): **1.3–1.45 = power / close**, **1.0 = neutral**, **0.6–0.75 = small / vulnerable / crowd**. Seated figure: `sit: true`, `groundY = seat top` (couch `seatY`, chair `seatY`, bed top ≈ floor−110).

## Props — `S.name(..., t, dur, o)` ; all return `{ g, ... }`
| Prop | Signature (after S.) | Anchor / notes |
|---|---|---|
| phone | `phone(x, y, s, t, dur, { screen: play|chat|feed|heart|blank, glow })` | centre; 74×136·s |
| laptop | `laptop(x, y, s, t, dur, { lines })` | centre of keyboard edge; screen rises 150·s |
| bed | `bed(x, y, w, t, dur, { blanket })` | x left, y floor; top of mattress ≈ y−110 |
| clock | `clock(cx, cy, r, t, dur, { h, m, bells })` → `.spin(t, dur, turns)` | analog; bells = alarm clock |
| digital | `digital(x, y, "2:00 AM", s, t, dur)` | centre; red digits |
| calendar | `calendar(x, y, cols, rows, cw, ch, t, dur, { title })` → `.cells[[cx,cy]...]` | x,y top-left; header 70 |
| tick / cross | `tick(x, y, s, t, dur, { c })` `cross(x, y, s, t, dur, { c })` | centre |
| strike | `strike(x1, y1, x2, y2, t, dur, { c })` | big red X over a box |
| cloud / rain | `cloud(cx, cy, s, t, dur, { storm })` `rain(cx, cy, w, n, t, dur)` | storm adds lightning |
| sun / moon / stars | `sun(cx, cy, r, …)` `moon(cx, cy, r, …)` `stars(n, x0, y0, x1, y1, t, dur)` | |
| heart / brain / bulb | `heart(cx, cy, s, …, { fill })` `brain(cx, cy, s, …)` `bulb(cx, cy, s, …)` | centre |
| door | `door(x, y, w, h, t, dur, { open, sign })` | x,y top-left of frame |
| ruler | `ruler(x, yb, h, t, dur, { labels: [[frac, "170"], …] })` | height chart; x left, yb floor |
| spotlight | `spotlight(cx, yTop, yBot, halfWidth, t, dur)` → `.shrink(t, dur, k)` | lamp at top, light pool on floor |
| eye | `eye(cx, cy, s, t, dur, { dx })` | |
| notebook / pencil / book | `notebook(x, y, w, h, …)` `pencil(x, y, len, angDeg, …)` (tip at x,y) `book(cx, cy, s, …)` (open book) | |
| chain | `chain(x1, y1, x2, y2, n, t, dur, { broken, c })` | |
| wave | `wave(x, y, w, h, t, dur)` → `.peak` | one hump from (x,y) to (x+w,y) |
| cycle | `cycle(cx, cy, r, ["Stress","Scroll","Guilt"], t, dur, { c, labelOut, size })` → `.spin()` | arrows loop |
| arrow | `arrow(x1, y1, x2, y2, t, dur, { bend, c, w, head })` | |
| thought / speech | `thought(cx, cy, rx, ry, tailX, tailY, …)` `speech(…)` | bubbles; put `S.text` inside |
| stairs | `stairs(x, y, n, run, rise, t, dur)` → `.tops[[cx,cy]...]` | from (x,y) up-right |
| mountain | `mountain(pts, t, dur, { fill })` | polyline |
| desk / chair / couch | `desk(x, y, w, …)` → `.top` ; `chair(x, y, …)` → `.seatY` (faces right, back at x−90) ; `couch(x, y, w, …)` → `.seatY` | x left, y floor |
| dumbbell / shirt / magnifier / padlock / hourglass / coffee | `dumbbell(cx, cy, s, …)` `shirt(cx, cy, s, …, { print, fill })` `magnifier(cx, cy, r, …)` `padlock(cx, cy, s, …)` `hourglass(cx, cy, s, …)` `coffee(cx, cy, s, …)` (cy = base) | |
| timer | `timer(cx, cy, r, t, dur, { label: "2:00", fillAt, fillDur, c })` | fills green over fillDur |
| pie | `pie(cx, cy, r, frac, t, dur, { cBig, cSmall })` | frac of circle in cBig |
| battery | `battery(x, y, w, level0to1, t, dur, { c })` | x,y top-left |
| trophy / pedestal | `trophy(cx, yBase, s, …)` `pedestal(x, y, w, h, …, { label })` | |
| plant | `plant(x, y, s, …)` | pot base centre |
| underline / ring / burst | `underline(x1, x2, y, …)` `ring(cx, cy, rx, ry, …, { c })` `burst(cx, cy, r1, r2, n, …, { c, a0, span })` | |
| crowd | `crowd(n, x0, gy, gap, s, t, dur, { hi: [i], hiC, face, hiFace, pose })` → `[F…]` | row of figures |
| hamsterWheel | `hamsterWheel(cx, cy, r, t, dur)` → `.spin(t, dur, turns)` | put a small fig inside |
| flame / drop / bolt / zzz | `flame(cx, cyBase, s, …)` `drop(cx, cy, s, t)` `bolt(cx, cy, s, t)` `zzz(x, y, t, dur)` | |
| seats | `seats(x0, y, n, gap, …)` | theatre row |
| hat | `hat(cx, cy, s, …, { kind: "grad"|"bicorne" })` | |
| tag | `tag(cx, cy, "PROFESSOR", t, dur, { size, fill, tc })` | label box |
| checklist | `checklist(x, y, ["…","…"], t, dur, { gap, size })` → `.boxes[[cx,cy]...]` | tick boxes later with `S.tick(cx, cy, 0.6, t)` |

Thumbnail mode (`build.py --thumb`): `THUMB=true` → every stroke ×1.55 and all text bold; follow `thumbnail-designer.md` (explainers) or `thumbnail-doctrine.md` (motivational).
Thumbnail figures: v3 head radius = 50·s, head centre = gy − 309·s. **Big-head crop:** `S.fig(430, 1890, { s: 4.3, c: "#ffffff" })` → head Ø ≈ 430 (40 % of height), body off the bottom. A white-limbed figure (`c: "#fff"` on black) keeps an ink face automatically; override with `faceC`.

## Worked scene
```js
{ // sentence 7: "One more video. One more scroll. I'll do it later."
  const [a, b] = WIN[6];
  const S = scene(a, b, { cam: "push" });
  const C = S.couch(560, GY, 460, a, 0.9);
  const F = S.fig(790, C.seatY, { s: 0.95, sit: true, pose: "hold" }).draw(a + 0.5, 0.9);
  F.face(a + 1.4, "flat", 6);
  const [hx, hy] = F.hand("R");
  S.phone(hx + 10, hy - 20, 0.9, W(7, 0), 0.7, { screen: "play", glow: true });
  S.text("I'll do it later", 1400, 420, { size: 92, font: "caveat", c: RED, t: W(7, 6), dur: 1.0 });
  S.clock(1450, 720, 110, W(7, 6) + 0.3, 0.8, { h: 11, m: 50 }).spin(W(7, 8), 1.2, 2);
}
```

## Review loop (per project)
```bash
python3 ~/.claude/skills/whiteboard-video-studio/scripts/build.py .
npx hyperframes check                       # 0 errors required (container_overflow warnings from walk-offs are OK)
npx hyperframes snapshot --at <sceneEnd-0.45,...>   # then READ snapshots/contact-sheet-*.jpg and fix
```
Checklist per frame: drawing complete, nothing overlapping (text over figures, props over captions), scale matches emotion, one accent colour, key object largest. Do not render — the orchestrator renders.
