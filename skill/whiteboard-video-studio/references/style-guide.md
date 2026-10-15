# Style guide: illustrated stills (`// look: still`)

> Owner direction (2026-10-13): top channels show one rich, high-quality picture per moment, not a drawing animation. So every scene is a **finished illustration** that builds progressively (scene → the same scene with one change → the next scene), with a slow camera and a soft crossfade.
> Hand-built in our engine; no AI images. The **story and the voice carry the video; the picture shows the idea.**
> Everything below lives as tokens in `scripts/kit.js` (`DS.*`). `scripts/scene_lint.py` fails any raw colour, width, radius or text size, so scenes cannot drift off-system.

## 1. Motion (what changed from v3)

| | v3 (old) | still (new) |
|---|---|---|
| Lines | hand-wobble, drawn on | crisp vector, present from the first frame |
| New element | stroke draws on | fades in over 0.35 s (power1.out) on its spoken word |
| Labels | pop with overshoot | rise to 1.0 from 0.92 scale over 0.35 s, no bounce |
| Scene change | 0.3 s crossfade | **0.6 s crossfade**, never a hard cut (the owner's "flicker" rule) |
| Camera | push 1→1.04 | push 1→1.03, pull 1.05→1, zoom 1→1.08 (slow drift = life) |

**Progressive scene:** a beat's picture should usually be the *same scene with one change* (someone turns, a card appears, an arrow lands, a light switches on) rather than a new location. New locations only at story turns. That's 3–6 s per picture, and 1–3 progressive changes inside one picture.

## 2. Colour

- **Palette:** `DS.P` has 25 named colours, each with three tones `[base, light, dark]`. Use `DS.c(name, tone, layer)`; never hex in `scenes.js` (lint FAIL).
- **Light:** one key light from the **top-left**. Solid objects use `DS.vol(name)`, a diagonal light → base → dark gradient, which is what gives them volume. Flat fills only for far objects or deliberate graphics (`flat: true`).
- **Atmospheric perspective:** colours move toward the scene's sky-light by depth:
  - far: 45 %
  - mid: 18 %
  - near: 0 %

  Outlines fade too (`DS.line(layer)`). This alone reads as distance.
- **Accent:** at most **one** saturated accent per picture: red `DS.c("red")` for the point, gold for reward. Everything else is the scene's family: warm room (wall, floor, wood) or outdoor (sky, grass, sand).
- **Contrast:**
  - Text must reach **≥ 4.5 : 1** against what's behind it (`DS.contrast(a, b)` computes it). Labels live on `DS.card` (ink on white ≈ 16 : 1), so they always pass.
  - `npx hyperframes check` re-checks every text in the browser (WCAG).
  - The focal figure's outline must reach ≥ 3 : 1 against its background.

## 3. Lines, borders, corners

| Token | px | Use |
|---|---|---|
| `DS.w.near` | 7 | Figures, props and outlines in the near plane |
| `DS.w.mid` | 5 | The mid plane |
| `DS.w.far` | 3 | The far plane, for distant people and hills with outlines |
| `DS.w.detail` | 3 | Card borders, frame mouldings, small details |
| `DS.w.hair` | 2 | Floorboards, texture lines, inner frames |

Figures scale their stroke by √(scale) automatically (`DS.figure`).

**Corners:** `DS.r.xs` 6 (picture frames, window trims), `sm` 12 (devices, props), `md` 20 (label cards), `lg` 32 (big panels). There are no sharp corners on man-made props, and no rounding on architecture (walls, floors).

## 4. Spacing, sizes, type

- **Grid:** 8 px (`DS.sp(n)`). Card padding is 24 × 12.
- **Safe area:** x 96–1824, y 64–940. **Captions own y > 980.**
- **Type scale:** `DS.type`, with no other sizes allowed:

  | Token | px | Use |
  |---|---|---|
  | `caption` | 40 | Small card notes |
  | `small` | 52 | |
  | `body` | 64 | Normal labels |
  | `title` | 84 | |
  | `display` | 110 | One word, rare |

- **Labels:** at most 3 per picture, 1–4 words each, always in `DS.card` and never floating text on a busy background. Put them top-centre (y 120–260) or beside the thing they name; never over a face.
- **Heights:** the ground line follows the set:
  - room floor: `R.hy` plus 40 for the back row and 960 for the front row;
  - outdoor: `O.hy` for the far plane and 900–960 for the near plane.

  People keep real proportions:
  - adults: s 1.45 × 0.8 in the mid plane;
  - children: s 0.68 in the near plane;
  - Dave: s 0.9 in the near plane.

  A head is about 1/6 of body height.

## 5. Depth (the illusion of space)

Use at least 3 of these 6 cues in every picture:
1. **Overlap:** the near plane covers the mid plane, and the mid plane covers the far plane.
2. **Size:** `DS.depth` scales are far 0.55, mid 0.8, near 1.0.
3. **Height in frame:** farther objects stand higher, closer to the horizon.
4. **Atmospheric haze:** lighter, less saturated and lower-contrast with distance (automatic via `layer`).
5. **Perspective:** `DS.room` uses one-point perspective with converging floorboards to the back-wall centre; `DS.outdoor` has a path converging to the horizon.
6. **Grounding:** a contact shadow under everything that stands (`DS.shadow`, automatic in `DS.figure`). Without it things float. Rugs (`DS.rug`) tie groups to the floor.

Plus a **foreground plane** where it fits: a large, dark, edge-cropped object (`DS.plant`, a camera on a tripod) at the frame edge. Plus a **vignette** (`DS.vignette`, 12 %) on top to pull the eye to the centre.

## 6. Composition

- **One focal point** per picture, at the centre or on a third, with the contrast highest there. The accent colour and any arrow point to it.
- **Leave air:** keep at least 15 % of the frame quiet (wall, sky). Wall detail (`DS.frame`) goes high and between heads, never behind a face.
- **Progressive change happens at the focal point:** the eye is already there.

## 7. Process and checks (every still scene)

1. **Block it:** set (`DS.room` or `DS.outdoor`), the three planes, the focal point, and what changes progressively on which word.
2. **Build it only with DS tokens:** `DS.figure`, `DS.shape`, `DS.card`, `DS.shadow`, `DS.frame`, `DS.rug`, `DS.plant`, `DS.vignette`.
3. **Run the checks:**
   ```sh
   python3 scripts/scene_lint.py scenes.js   # tokens, safe area, type scale, depth background, grounded figures, ≤ 3 labels
   python3 scripts/build.py . && npx hyperframes check   # WCAG contrast + text overlap in the browser
   npx hyperframes snapshot --at <scene ends>            # READ the contact sheet
   ```
4. **Eye-check every frame:**
   - [ ] One focal point, obvious at thumbnail size
   - [ ] ≥ 3 depth cues, plus grounding shadows
   - [ ] No label over a face; nothing behind a head that fights it
   - [ ] No glow, spotlight or translucent fill over a face. It changes the skin tone: a light fill makes dark skin read lighter, which is the wrong message. Highlight a person with a ring outline instead.
   - [ ] One accent colour
   - [ ] Text ≥ 4.5 : 1 (check passed)
   - [ ] Nothing in the caption band (y > 980) except the floor and foreground
   - [ ] The progressive change lands on its word and at the focal point

Reference build: `episodes/15-not-short-still/scenes.js` (3 scenes: room with family photo, outdoor line-up, room with camera foreground).
