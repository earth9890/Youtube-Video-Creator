// ===================== library/sky.js — skies, sun, moon, clouds, stars, weather, ground strips =====================
// Skies are full backdrops (box 0,0,1920,1080, origin top-left, horizon ≈ y 800) other files reuse via L.inline("sky-night").
// Sun / moon / clouds / stars / weather float around their centre. Ground strips: origin = horizon line, x 0…1920, y -40…360;
// each strip exists as -day / -sunset / -night (also: L.put(S, "ground-grass-day", 0, 760, { time: "night" })).
// Everything draws through the tokens (palette names, L.shape / L.lw / L.outline); night = dark palette tones + moonlight, never a grey overlay.
(function () {
const L = window.L, f1 = L.f1;
const C = (n, t = 0) => L.c(n, t), M = L.mix, TAU = Math.PI * 2;
const q = (...a) => a.map((v) => Math.round(v)).join(" ");
let N = 0;

// ---------- time-of-day tint: day = palette as is, sunset = warmed, night = dark tones pulled toward moonlit blue ----------
const tint = (t, c, k = 0.5) => (t === "night" ? M(M(c, C("navy", 2), k), C("night", 1), 0.3) : t === "sunset" ? M(M(c, C("orange", 1), 0.15), C("purple", 0), 0.07) : c);
const stopsMk = (st) => st.map(([o, c, a]) => `<stop offset="${o}" stop-color="${c}"${a !== undefined ? ` stop-opacity="${a}"` : ""}/>`).join("");
const sample = (st, u) => { for (let i = 0; i < st.length - 1; i++) if (u <= st[i + 1][0]) return M(st[i][1], st[i + 1][1], (u - st[i][0]) / (st[i + 1][0] - st[i][0] || 1)); return st[st.length - 1][1]; };
const hard = (st) => { const a = st[0][1], b = st[st.length - 1][1]; return [[0, a], [0.58, a], [0.58, b], [1, b]]; };
const bands = (st, n = 8) => Array.from({ length: n }, (_, i) => { const c = sample(st, (i + 0.5) / n); return [[i / n, c], [(i + 1) / n, c]]; }).flat();

// ctx: one per asset call; collects <defs> (gradients are written inline so assets can be nested with L.inline)
function ctx(time, dark) {
  const t = time === "night" || time === "sunset" ? time : "day", defs = [];
  const X = {
    t, defs,
    col: (n, tone = 0) => tint(t, C(n, tone), dark),
    lite: (n) => (t === "night" ? M(tint(t, C(n, 1), dark), C("glass", 0), 0.3) : tint(t, C(n, 1), dark)), // lit side (moonlit at night)
    // linear gradient. o: abs (userSpace x1..y2) | default top→bottom; mat: honour flat/cel shading; sky: band it in flat/cel looks
    lin(stops, o = {}) {
      let st = stops;
      if (o.mat) { if (L.T.shade === "flat") return stops[Math.floor(stops.length / 2)][1]; if (L.T.shade === "cel") st = hard(stops); }
      if (o.sky && L.T.shade !== "grad") st = bands(stops);
      const id = "sk" + ++N, a = o.abs ? `gradientUnits="userSpaceOnUse" x1="${f1(o.x1)}" y1="${f1(o.y1)}" x2="${f1(o.x2)}" y2="${f1(o.y2)}"` : `x1="0" y1="0" x2="${o.x2 || 0}" y2="${o.y2 === undefined ? 1 : o.y2}"`;
      defs.push(`<linearGradient id="${id}" ${a}>${stopsMk(st)}</linearGradient>`);
      return `url(#${id})`;
    },
    rad(stops) { const id = "sk" + ++N; defs.push(`<radialGradient id="${id}">${stopsMk(stops)}</radialGradient>`); return `url(#${id})`; },
    // lit solid like L.paint but time-tinted
    paint(n, o = {}) {
      const P = [0, 1, 2].map((i) => X.col(n, i)), tone = o.tone || 0, mode = o.flat ? "flat" : L.T.shade;
      if (mode === "flat") return P[tone];
      const id = "sk" + ++N, [x2, y2] = o.dir === "v" ? [0, 1] : o.dir === "h" ? [1, 0] : [1, 1];
      const st = mode === "cel" ? [[0, P[tone === 2 ? 0 : 1]], [0.58, P[tone === 2 ? 0 : 1]], [0.58, P[2]], [1, P[2]]] : [[0, P[1]], [0.55, P[tone]], [1, P[2]]];
      defs.push(`<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}">${stopsMk(st)}</linearGradient>`);
      return `url(#${id})`;
    },
    shape: (d, n, o = {}) => L.tag("path", { d, fill: X.paint(n, o), stroke: o.c || L.outline(n), "stroke-width": L.lw(o.w || "scene", o.s || 1), "stroke-linecap": L.T.cap, "stroke-linejoin": L.T.join, opacity: o.op }),
    flat: (d, c, op) => L.tag("path", { d, fill: c, opacity: op }),
    wrap: (inner) => (defs.length ? `<defs>${defs.join("")}</defs>` : "") + inner,
  };
  return X;
}
const strokeP = (d, c, w, op, extra = {}) => L.tag("path", Object.assign({ d, fill: "none", stroke: c, "stroke-width": w, "stroke-linecap": "round", "stroke-linejoin": "round", opacity: op }, extra));
const dotsP = (pts, r, c, op) => strokeP(pts.map((p) => `M${f1(p[0])} ${f1(p[1])}h.1`).join(""), c, r * 2, op);
const arcS = (cx, cy, r, a0, a1, ry = r) => L.smooth(L.arcPts(cx, cy, r, a0, a1, 4, ry));
const sparkle = (cx, cy, r) => { const k = r * 0.14; return `M${f1(cx)} ${f1(cy - r)}Q${f1(cx + k)} ${f1(cy - k)} ${f1(cx + r)} ${f1(cy)}Q${f1(cx + k)} ${f1(cy + k)} ${f1(cx)} ${f1(cy + r)}Q${f1(cx - k)} ${f1(cy + k)} ${f1(cx - r)} ${f1(cy)}Q${f1(cx - k)} ${f1(cy - k)} ${f1(cx)} ${f1(cy - r)}Z`; };
const blobPath = (R, cx, cy, rx, ry, n = 8, j = 0.18) => { const pts = Array.from({ length: n }, (_, i) => { const a = (i / n) * TAU, f = 1 + (R() - 0.5) * 2 * j; return [cx + Math.cos(a) * rx * f, cy + Math.sin(a) * ry * f]; }); return L.smooth([...pts, pts[0]]).replace(/-?\d+\.\d+/g, (m) => Math.round(m)); };
const reg = (name, group, label, fn, meta = {}) => L.reg("sky", name, fn, Object.assign({ group, label }, meta));

// =====================================================================================================================
// 1. SKIES (full backdrops)
// =====================================================================================================================
const W = 1920, H = 1080;
const glowEl = (X, g) => L.tag("ellipse", { cx: g.x, cy: g.y, rx: g.rx, ry: g.ry, fill: X.rad([[0, g.c, g.op], [1, g.c, 0]]) });
function starsIn(R, n, area, X, kinds, gold) { // area [x0,y0,x1,y1]; returns dots (3 sizes) + sparkles
  const pts = [[], [], []], sp = [], [x0, y0, x1, y1] = area;
  for (let i = 0; i < n; i++) { const p = [x0 + R() * (x1 - x0), y0 + R() * (y1 - y0)], k = R(); (k < 0.62 ? pts[0] : k < 0.9 ? pts[1] : pts[2]).push(p); }
  for (let i = 0; i < (kinds || 0); i++) sp.push([x0 + R() * (x1 - x0), y0 + R() * (y1 - y0), 8 + R() * 10]);
  return dotsP(pts[0], gold ? 2.4 : 1.6, gold ? C("gold", 0) : C("cream", 1), 0.8) + dotsP(pts[1], gold ? 3.6 : 2.6, gold ? C("yellow", 0) : C("white", 0), 0.9) + dotsP(pts[2], gold ? 5.5 : 4, C("yellow", 1), 0.95) + sp.map((s) => X.flat(sparkle(s[0], s[1], s[2]), gold ? C("yellow", 0) : C("cream", 1), 0.95)).join("");
}
const bank = (R, X, y0, amp, bottom, c, op) => { const pts = []; for (let x = -80; x <= W + 120; x += 190) pts.push([x, y0 + (R() - 0.5) * amp]); return X.flat(`${L.smooth(pts)}L${W + 120} ${bottom}L-80 ${bottom}Z`, c, op); };
const SKY = {
  day: (X) => ({ stops: [[0, M(C("sky", 2), C("blue", 0), 0.15)], [0.45, C("sky", 0)], [0.78, C("sky", 1)], [1, M(C("sky", 1), C("white", 0), 0.6)]], glows: [{ x: 300, y: 140, rx: 780, ry: 540, c: C("white", 0), op: 0.4 }, { x: 960, y: 850, rx: 1200, ry: 200, c: C("white", 0), op: 0.6 }] }),
  noon: (X) => ({ stops: [[0, M(C("sky", 2), C("blue", 0), 0.45)], [0.5, C("sky", 2)], [0.82, C("sky", 0)], [1, C("sky", 1)]], glows: [{ x: 960, y: 850, rx: 1100, ry: 150, c: C("white", 0), op: 0.45 }] }),
  dawn: (X) => ({ stops: [[0, M(C("purple", 2), C("night", 0), 0.5)], [0.3, C("purple", 0)], [0.55, M(C("purple", 1), C("pink", 0), 0.5)], [0.78, C("pink", 1)], [1, C("dusk", 1)]], glows: [{ x: 520, y: 830, rx: 1000, ry: 260, c: C("yellow", 1), op: 0.65 }, { x: 520, y: 850, rx: 420, ry: 130, c: C("white", 0), op: 0.5 }] }),
  sunrise: (X) => ({ stops: [[0, M(C("sky", 2), C("purple", 0), 0.35)], [0.35, M(C("sky", 0), C("pink", 0), 0.45)], [0.6, C("pink", 1)], [0.8, C("orange", 1)], [1, C("yellow", 1)]], glows: [{ x: 400, y: 820, rx: 1000, ry: 340, c: C("orange", 0), op: 0.55 }, { x: 400, y: 830, rx: 420, ry: 170, c: C("yellow", 1), op: 0.85 }] }),
  sunset: (X) => ({ stops: [[0, M(C("purple", 2), C("navy", 0), 0.35)], [0.32, C("purple", 0)], [0.58, M(C("pink", 0), C("red", 0), 0.35)], [0.8, C("orange", 0)], [1, C("yellow", 1)]], glows: [{ x: 1500, y: 820, rx: 1100, ry: 380, c: C("red", 1), op: 0.5 }, { x: 1500, y: 830, rx: 460, ry: 180, c: C("yellow", 1), op: 0.9 }] }),
  dusk: (X, R) => ({ stops: [[0, M(C("navy", 0), C("night", 2), 0.5)], [0.35, C("night", 2)], [0.6, M(C("purple", 2), C("night", 1), 0.3)], [0.8, M(C("purple", 0), C("pink", 0), 0.45)], [1, C("dusk", 2)]], glows: [{ x: 960, y: 830, rx: 1200, ry: 260, c: C("orange", 1), op: 0.4 }], extra: starsIn(R, 22, [0, 0, W, 360], X, 2) }),
  night: (X) => ({ stops: [[0, M(C("navy", 2), C("night", 2), 0.4)], [0.5, C("night", 2)], [0.85, C("night", 0)], [1, M(C("night", 0), C("night", 1), 0.5)]], glows: [{ x: 300, y: 140, rx: 700, ry: 500, c: C("night", 1), op: 0.35 }, { x: 960, y: 850, rx: 1200, ry: 200, c: C("night", 1), op: 0.45 }] }),
  "starry-night": (X, R) => {
    const s = SKY.night(X), band = [], dust = [];
    for (let i = 0; i < 110; i++) { const x = R() * W, y = 470 - x * 0.28 + (R() + R() + R() - 1.5) * 150; dust.push([x, y]); }
    band.push(L.tag("ellipse", { cx: 960, cy: 330, rx: 1300, ry: 150, fill: X.rad([[0, M(C("purple", 1), C("glass", 0), 0.5), 0.32], [1, C("purple", 1), 0]]), transform: "rotate(-16 960 330)" }));
    s.extra = band.join("") + dotsP(dust, 1.4, C("cream", 1), 0.55) + starsIn(R, 190, [0, 0, W, 740], X, 22); return s;
  },
  overcast: (X, R) => ({ stops: [[0, M(C("gray", 0), C("navy", 0), 0.2)], [0.55, C("gray", 1)], [1, M(C("gray", 1), C("white", 0), 0.55)]], glows: [{ x: 300, y: 130, rx: 800, ry: 400, c: C("white", 0), op: 0.3 }],
    extra: bank(R, X, 260, 80, H, C("gray", 2), 0.16) + bank(R, X, 420, 90, H, C("white", 0), 0.22) + bank(R, X, 560, 100, H, C("gray", 2), 0.14) + bank(R, X, 700, 70, H, C("white", 0), 0.28) }),
  storm: (X, R) => {
    let ex = ""; for (let r = 0; r < 3; r++) for (let x = -60 + r * 70; x < W + 120; x += 230) ex += L.tag("circle", { cx: x + R() * 60, cy: 40 + r * 110 + R() * 70, r: 120 + R() * 90, fill: M(C("gray", 2), C("navy", 2), 0.7 - r * 0.2) });
    return { stops: [[0, M(C("gray", 2), C("navy", 2), 0.6)], [0.5, M(C("gray", 2), C("navy", 1), 0.35)], [0.82, M(C("gray", 0), C("navy", 1), 0.45)], [1, M(C("gray", 1), C("yellow", 0), 0.12)]], glows: [{ x: 960, y: 860, rx: 1300, ry: 170, c: M(C("yellow", 0), C("gray", 1), 0.5), op: 0.4 }], extra: ex + bank(R, X, 520, 90, H, C("navy", 2), 0.22) };
  },
  foggy: (X, R) => { let ex = ""; for (let i = 0; i < 7; i++) ex += L.tag("ellipse", { cx: R() * W, cy: 320 + i * 100, rx: 700 + R() * 500, ry: 50 + R() * 40, fill: C("white", 0), opacity: 0.4 }); return { stops: [[0, M(C("gray", 1), C("white", 0), 0.25)], [1, C("snow", 0)]], glows: [{ x: 480, y: 300, rx: 700, ry: 400, c: C("white", 0), op: 0.5 }], extra: ex }; },
};
[["day", "Day", ["sky", "blue", "light"]], ["dawn", "Dawn", ["pink", "morning"]], ["sunrise", "Sunrise", ["orange", "morning"]], ["noon", "Noon", ["bright", "midday"]], ["sunset", "Sunset", ["orange", "evening"]], ["dusk", "Dusk", ["twilight", "purple", "evening"]],
  ["night", "Night", ["dark", "moonlight"]], ["starry-night", "Starry night", ["stars", "dark", "milky way"]], ["overcast", "Overcast", ["grey", "cloudy"]], ["storm", "Storm", ["dark", "thunder"]], ["foggy", "Foggy", ["fog", "mist", "grey"]]].forEach(([k, label, tags]) =>
  reg("sky-" + k, "Skies", label + " sky", (o) => {
    const X = ctx("day"), s = SKY[k](X, L.rng(31 + k.length)), id = "sky";
    const out = [L.tag("rect", { x: 0, y: 0, width: W, height: H, fill: X.lin(s.stops, { sky: true }) })];
    s.glows.forEach((g) => out.push(glowEl(X, g)));
    if (s.extra) out.push(s.extra);
    return X.wrap(out.join(""));
  }, { box: [0, 0, W, H], wide: true, tags: ["sky", "backdrop", ...tags], call: `L.put(S, "sky-${k}", 0, 0, { t })  // or L.inline("sky-${k}")` }));

// =====================================================================================================================
// 2. SUN (6 styles)
// =====================================================================================================================
const rays = (X, n, r1, r2, wd, name, a0 = 0, from = 0, to = n, tone = 0) => Array.from({ length: to - from }, (_, j) => { const i = from + j, a = a0 + (i / n) * TAU, w = wd / r1; return X.shape(L.poly([[Math.cos(a - w) * r1, Math.sin(a - w) * r1], [Math.cos(a) * r2, Math.sin(a) * r2], [Math.cos(a + w) * r1, Math.sin(a + w) * r1]], true), name, { w: "detail", tone }); }).join("");
const SUNBOX = [-260, -260, 520, 520];
reg("sun-simple", "Sun", "Sun · simple disc", () => { const X = ctx("day"); return X.wrap(X.shape(L.circ(0, 0, 110), "yellow", { w: "prop" }) + strokeP(L.arc(0, 0, 84, 200, 262), C("white", 0), 9, 0.85)); },
  { box: SUNBOX, tags: ["sun", "day", "yellow"], call: 'L.put(S, "sun-simple", x, y, { s, t })' });
reg("sun-rays", "Sun", "Sun · rays", () => { const X = ctx("day"); return X.wrap(rays(X, 12, 128, 215, 20, "orange") + X.shape(L.circ(0, 0, 112), "yellow", { w: "prop" })); },
  { box: SUNBOX, tags: ["sun", "day", "rays"], call: 'L.put(S, "sun-rays", x, y, { s, t })' });
reg("sun-glow", "Sun", "Sun · soft glow disc", () => { const X = ctx("day"); return X.wrap(L.tag("circle", { r: 260, fill: X.rad([[0, C("white", 0), 0.9], [0.3, C("yellow", 1), 0.65], [0.62, C("yellow", 0), 0.22], [1, C("yellow", 0), 0]]) }) + L.tag("circle", { r: 100, fill: X.rad([[0, C("white", 0)], [0.7, C("yellow", 1)], [1, C("yellow", 0)]]) })); },
  { box: SUNBOX, tags: ["sun", "glow", "soft", "no outline"], call: 'L.put(S, "sun-glow", x, y, { s, t })' });
reg("sun-face", "Sun", "Sun · friendly face", () => {
  const X = ctx("day");
  const face = L.tag("ellipse", { cx: -38, cy: -12, rx: 11, ry: 15, fill: C("ink") }) + L.tag("ellipse", { cx: 38, cy: -12, rx: 11, ry: 15, fill: C("ink") }) + L.tag("circle", { cx: -34, cy: -17, r: 4.5, fill: C("white", 0) }) + L.tag("circle", { cx: 42, cy: -17, r: 4.5, fill: C("white", 0) }) +
    L.tag("ellipse", { cx: -66, cy: 24, rx: 17, ry: 10, fill: C("pink", 0), opacity: 0.6 }) + L.tag("ellipse", { cx: 66, cy: 24, rx: 17, ry: 10, fill: C("pink", 0), opacity: 0.6 }) + L.stroke(L.arc(0, 14, 44, 28, 152), { w: "prop" }) +
    L.stroke(L.arc(-38, -44, 22, 215, 325), { w: "detail" }) + L.stroke(L.arc(38, -44, 22, 215, 325), { w: "detail" });
  return X.wrap(rays(X, 14, 134, 205, 18, "orange", 0.1) + X.shape(L.circ(0, 0, 124), "yellow", { w: "prop" }) + face);
}, { box: SUNBOX, tags: ["sun", "face", "cartoon", "happy", "character"], call: 'L.put(S, "sun-face", x, y, { s, t })' });
reg("sun-setting", "Sun", "Sun · setting half-sun (origin = horizon)", () => {
  const X = ctx("sunset"), R = 120;
  const refl = [[150, 22], [110, 44], [70, 66]].map(([w, y]) => X.flat(L.rrect(-w, y, w * 2, 10, 5), C("orange", 0), 0.55)).join("");
  return X.wrap(L.tag("ellipse", { cx: 0, cy: 0, rx: 320, ry: 160, fill: X.rad([[0, C("yellow", 1), 0.8], [0.5, C("orange", 1), 0.3], [1, C("orange", 0), 0]]) }) + rays(X, 18, R + 18, R + 76, 14, "orange", Math.PI, 0, 9) +
    X.shape(`M${-R} 0A${R} ${R} 0 0 1 ${R} 0Z`, "orange", { w: "prop" }) + L.stroke(L.line([-250, 0], [250, 0]), { w: "prop" }) + refl);
}, { box: [-280, -230, 560, 330], tags: ["sun", "sunset", "evening", "horizon"], call: 'L.put(S, "sun-setting", x, horizonY, { s, t })  // centre of the flat edge on the horizon' });
reg("sun-eclipse", "Sun", "Sun · eclipse", () => {
  const X = ctx("day"), R = L.rng(5), lines = [];
  for (let i = 0; i < 28; i++) { const a = (i / 28) * TAU + 0.05, r1 = 110, r2 = 150 + R() * 70; lines.push(`M${f1(Math.cos(a) * r1)} ${f1(Math.sin(a) * r1)}L${f1(Math.cos(a) * r2)} ${f1(Math.sin(a) * r2)}`); }
  return X.wrap(L.tag("circle", { r: 250, fill: X.rad([[0, C("white", 0), 0.9], [0.35, C("yellow", 1), 0.5], [1, C("yellow", 0), 0]]) }) + strokeP(lines.join(""), C("cream", 1), 5, 0.6) + X.shape(L.circ(0, 0, 104), "yellow", { w: "prop", tone: 1 }) +
    X.shape(L.circ(26, 20, 102), "navy", { w: "prop", tone: 2 }) + L.tag("path", { d: sparkle(-70, -62, 34), fill: C("white", 0) }) + L.tag("circle", { cx: -70, cy: -62, r: 22, fill: X.rad([[0, C("white", 0), 0.9], [1, C("white", 0), 0]]) }));
}, { box: SUNBOX, tags: ["sun", "eclipse", "moon", "space"], call: 'L.put(S, "sun-eclipse", x, y, { s, t })' });

// =====================================================================================================================
// 3. MOON (8 phases, craters drawn correctly: lit part = limb half-circle + terminator half-ellipse)
// =====================================================================================================================
const CRAT = [[-0.35, -0.3, 0.14], [0.25, -0.45, 0.1], [0.45, 0.1, 0.17], [-0.1, 0.35, 0.12], [-0.52, 0.22, 0.09], [0.1, -0.12, 0.07], [0.2, 0.62, 0.08], [-0.25, 0, 0.06], [0.62, -0.3, 0.07], [-0.05, -0.64, 0.06], [0.7, 0.4, 0.05], [-0.7, -0.05, 0.05]];
const MARIA = [[-0.18, -0.16, 0.3, 0.24], [0.32, 0.3, 0.22, 0.18], [-0.45, 0.4, 0.15, 0.12]];
function moonDraw(kind, sg, R, glow) { // kind new|crescent|quarter|gibbous|full; sg +1 = lit on the right (waxing)
  const X = ctx("day"), S = sg > 0 ? 1 : 0, id = "mc" + ++N;
  let lit = "";
  if (kind === "full") lit = L.circ(0, 0, R);
  else if (kind === "quarter") lit = `M0 ${-R}A${R} ${R} 0 0 ${S} 0 ${R}Z`;
  else if (kind !== "new") lit = `M0 ${-R}A${R} ${R} 0 0 ${S} 0 ${R}A${f1(R * 0.58)} ${R} 0 0 ${kind === "crescent" ? 1 - S : S} 0 ${-R}Z`;
  const crat = (g, op) => `<g opacity="${op}">${MARIA.map(([x, y, rx, ry]) => L.tag("ellipse", { cx: x * R, cy: y * R, rx: rx * R, ry: ry * R, fill: C("cream", 2), opacity: 0.55 })).join("")}${CRAT.map(([x, y, r]) => L.tag("circle", { cx: x * R, cy: y * R, r: r * R, fill: C("cream", 2), stroke: M(C("cream", 2), C("ink", 0), 0.18), "stroke-width": 2 }) + strokeP(L.arc(x * R, y * R, r * R * 0.7, 190, 260), C("white", 0), 3, 0.7)).join("")}</g>`;
  const litFill = X.lin([[0, C("cream", 1)], [0.5, C("cream", 0)], [1, C("cream", 2)]], { abs: true, x1: -R, y1: -R, x2: R, y2: R, mat: true });
  const out = [];
  if (glow) out.push(L.tag("circle", { r: R * 2.1, fill: X.rad([[0, C("cream", 1), 0.55], [0.4, C("cream", 0), 0.2], [1, C("cream", 0), 0]]) }), L.tag("circle", { r: R * 1.35, fill: "none", stroke: C("cream", 1), "stroke-width": 5, opacity: 0.18 }), L.tag("circle", { r: R * 1.65, fill: "none", stroke: C("cream", 1), "stroke-width": 4, opacity: 0.1 }));
  out.push(L.tag("circle", { r: R, fill: M(C("night", 2), C("navy", 1), 0.5) }), crat(0, kind === "new" ? 0.3 : 0.14));
  if (lit) { X.defs.push(`<clipPath id="${id}"><path d="${lit}"/></clipPath>`); out.push(L.tag("path", { d: lit, fill: litFill }), `<g clip-path="url(#${id})">${crat(0, 1)}</g>`); }
  out.push(L.tag("circle", { r: R, fill: "none", stroke: L.outline("cream"), "stroke-width": L.lw("prop"), "stroke-linejoin": L.T.join }));
  return X.wrap(out.join(""));
}
[["new", "New moon", "new", 1], ["waxing-crescent", "Waxing crescent", "crescent", 1], ["first-quarter", "First quarter", "quarter", 1], ["waxing-gibbous", "Waxing gibbous", "gibbous", 1], ["full", "Full moon", "full", 1],
  ["waning-gibbous", "Waning gibbous", "gibbous", -1], ["last-quarter", "Last quarter", "quarter", -1], ["waning-crescent", "Waning crescent", "crescent", -1]].forEach(([k, label, kind, sg]) =>
  reg("moon-" + k, "Moon", label, () => moonDraw(kind, sg, 110), { box: [-150, -150, 300, 300], tags: ["moon", "phase", "night", k.replace("-", " ")], call: `L.put(S, "moon-${k}", x, y, { s, t })` }));
reg("moon-big-glow", "Moon", "Big full moon with glow", () => moonDraw("full", 1, 170, true), { box: [-360, -360, 720, 720], tags: ["moon", "full", "glow", "night", "big"], call: 'L.put(S, "moon-big-glow", x, y, { s, t })' });
reg("moon-crescent-icon", "Moon", "Crescent moon (icon)", () => {
  const X = ctx("day"), r1 = 110, r2 = 96, d = 52, a = (r1 * r1 - r2 * r2 + d * d) / (2 * d), h = Math.sqrt(r1 * r1 - a * a), beta = Math.acos((r2 * r2 + d * d - r1 * r1) / (2 * r2 * d));
  const dd = `M${f1(a)} ${f1(-h)}A${r1} ${r1} 0 1 0 ${f1(a)} ${f1(h)}A${r2} ${r2} 0 ${beta * 2 > Math.PI ? 1 : 0} 1 ${f1(a)} ${f1(-h)}Z`;
  return X.wrap(L.g(X.shape(dd, "cream", { w: "prop" }) + L.tag("circle", { cx: -62, cy: 26, r: 11, fill: C("cream", 2), opacity: 0.8 }) + L.tag("circle", { cx: -78, cy: -18, r: 7, fill: C("cream", 2), opacity: 0.8 }), "rotate(-18)"));
}, { box: [-150, -150, 300, 300], tags: ["moon", "crescent", "night", "icon"], call: 'L.put(S, "moon-crescent-icon", x, y, { s, t })' });

// =====================================================================================================================
// 4. CLOUDS
// =====================================================================================================================
const cc = (x, y, r) => ({ k: "c", x, y, r }), rc = (x, y, w, h) => ({ k: "r", x, y, w, h });
function blobs(X, sh, stops, o = {}) { // union of circles/rects: outline layer (2× width) under a fill layer = one clean outer outline, one gradient
  // hull through the circle centres plugs the little holes between puffs and the flat base (otherwise their outline shows as dark specks)
  const cs = sh.filter((s) => s.k === "c").sort((a, b) => a.x - b.x), base = sh.find((s) => s.k === "r");
  const hull = cs.length > 2 ? { k: "p", d: L.poly([...cs.map((c) => [c.x, c.y]), [cs[cs.length - 1].x, (base ? base.y : cs[0].y) + 6], [cs[0].x, (base ? base.y : cs[0].y) + 6]], true) } : null;
  sh = hull ? [...sh, hull] : sh;
  const els = (a) => sh.map((s) => (s.k === "p" ? `<path d="${s.d}" ${a}/>` : s.k === "c" ? `<circle cx="${f1(s.x)}" cy="${f1(s.y)}" r="${f1(s.r)}" ${a}/>` : `<rect x="${f1(s.x)}" y="${f1(s.y)}" width="${f1(s.w)}" height="${f1(s.h)}" rx="${f1(s.h / 2)}" ${a}/>`)).join("");
  let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
  sh.forEach((s) => { if (s.k === "p") return; const a = s.k === "c" ? [s.x - s.r, s.y - s.r, s.x + s.r, s.y + s.r] : [s.x, s.y, s.x + s.w, s.y + s.h]; x0 = Math.min(x0, a[0]); y0 = Math.min(y0, a[1]); x1 = Math.max(x1, a[2]); y1 = Math.max(y1, a[3]); });
  const ink = L.outline(o.ink || "snow"), lw = L.lw("prop", o.s || 1);
  const line = L.T.ink === "none" ? "" : els(`fill="${ink}" stroke="${ink}" stroke-width="${f1(lw * 2)}" stroke-linejoin="round"`);
  const fill = X.lin(stops, { abs: true, x1: x0, y1: y0, x2: x0 + (x1 - x0) * 0.35, y2: y1, mat: true });
  return `<g>${line}${els(`fill="${fill}"`)}</g>`;
}
const PUFFY = [cc(-112, 12, 58), cc(-46, -28, 74), cc(36, -54, 86), cc(118, -8, 64), cc(172, 24, 42), cc(-170, 32, 38), rc(-205, 8, 395, 66)];
const LONG = [cc(-215, 6, 40), cc(-130, -24, 56), cc(-35, -40, 68), cc(70, -18, 52), cc(160, -30, 46), cc(240, 4, 36), rc(-250, -2, 520, 58)];
const hiliteArcs = (X, sh, night) => sh.filter((s) => s.k === "c" && s.r > 55).slice(0, 3).map((s) => strokeP(L.arc(s.x, s.y, s.r * 0.78, 198, 262), night ? M(C("glass", 0), C("water", 1), 0.3) : C("white", 0), 6, night ? 0.6 : 0.9)).join("");
const cloudStops = (X, kind) => kind === "storm" ? [[0, X.col("gray", 0)], [0.55, M(X.col("gray", 2), X.col("navy", 1), 0.3)], [1, M(X.col("gray", 2), X.col("navy", 2), 0.6)]]
  : kind === "rain" ? [[0, X.col("gray", 1)], [0.55, X.col("gray", 0)], [1, X.col("gray", 2)]]
  : kind === "sunset" ? [[0, M(C("yellow", 1), C("pink", 1), 0.4)], [0.5, C("pink", 0)], [1, M(C("purple", 0), C("pink", 0), 0.3)]]
  : [[0, X.col("snow", 1)], [0.55, X.col("snow", 0)], [1, X.col("snow", 2)]];
const cloudInk = (kind) => (kind === "storm" || kind === "rain" ? "gray" : "snow");
function cloud(X, sh, kind) { return blobs(X, sh, cloudStops(X, kind), { ink: cloudInk(kind) }) + hiliteArcs(X, sh, X.t === "night"); }
const drops = (pts, len, dx, c, w, op) => strokeP(pts.map(([x, y]) => `M${f1(x)} ${f1(y)}l${dx} ${len}`).join(""), c, w, op);
const CB = [-260, -165, 520, 285];
reg("cloud-puffy", "Clouds", "Cloud · puffy", () => { const X = ctx("day"); return X.wrap(cloud(X, PUFFY, "day")); }, { box: CB, tags: ["cloud", "day", "puffy"], call: 'L.put(S, "cloud-puffy", x, y, { s, t })' });
reg("cloud-puffy-night", "Clouds", "Cloud · puffy (night, moonlit)", () => { const X = ctx("night"); return X.wrap(cloud(X, PUFFY, "day")); }, { box: CB, tags: ["cloud", "night", "moonlit"], call: 'L.put(S, "cloud-puffy-night", x, y, { s, t })' });
reg("cloud-long", "Clouds", "Cloud · long", () => { const X = ctx("day"); return X.wrap(cloud(X, LONG, "day")); }, { box: [-300, -120, 600, 220], tags: ["cloud", "day", "long", "flat"], call: 'L.put(S, "cloud-long", x, y, { s, t })' });
reg("cloud-long-night", "Clouds", "Cloud · long (night, moonlit)", () => { const X = ctx("night"); return X.wrap(cloud(X, LONG, "day")); }, { box: [-300, -120, 600, 220], tags: ["cloud", "night", "long"], call: 'L.put(S, "cloud-long-night", x, y, { s, t })' });
reg("cloud-trio", "Clouds", "Clouds · small trio", () => {
  const X = ctx("day"), one = (k, x, y) => L.g(cloud(X, PUFFY, "day"), `translate(${x} ${y}) scale(${k})`);
  return X.wrap(one(0.42, -170, 40) + one(0.62, 20, -50) + one(0.34, 190, 50));
}, { box: [-300, -150, 600, 300], tags: ["cloud", "day", "small", "group"], call: 'L.put(S, "cloud-trio", x, y, { s, t })' });
reg("cloud-storm", "Clouds", "Cloud · storm (dark)", () => { const X = ctx("day"); return X.wrap(cloud(X, [cc(-120, 18, 66), cc(-50, -34, 84), cc(40, -72, 100), cc(130, -20, 76), cc(190, 26, 48), cc(-185, 38, 42), rc(-235, 8, 450, 76)], "storm")); },
  { box: [-280, -190, 560, 330], tags: ["cloud", "storm", "dark", "thunder"], call: 'L.put(S, "cloud-storm", x, y, { s, t })' });
reg("cloud-rain", "Clouds", "Cloud · rain cloud", () => {
  const X = ctx("day"), R = L.rng(9), d1 = [], d2 = [];
  for (let i = 0; i < 9; i++) (i % 2 ? d1 : d2).push([-135 + i * 34 + R() * 8, 100 + (i % 3) * 24 + R() * 10]);
  return X.wrap(cloud(X, PUFFY, "rain") + drops(d1, 38, -10, C("water", 0), 7, 0.95) + drops(d2, 30, -10, C("water", 1), 7, 0.95));
}, { box: [-260, -165, 520, 425], tags: ["cloud", "rain", "weather"], call: 'L.put(S, "cloud-rain", x, y, { s, t })' });
reg("cloud-sunset-lit", "Clouds", "Cloud · sunset-lit", () => { const X = ctx("sunset"); return X.wrap(cloud(X, LONG, "sunset")); }, { box: [-300, -120, 600, 220], tags: ["cloud", "sunset", "evening", "pink"], call: 'L.put(S, "cloud-sunset-lit", x, y, { s, t })' });
reg("cloud-wisp", "Clouds", "Cloud · wispy streaks", () => {
  const X = ctx("day"), w = (y, k) => X.shape(`M${-250 * k} ${y}Q${-110 * k} ${y - 38} 0 ${y - 8}T${250 * k} ${y - 24}Q${110 * k} ${y + 8} 0 ${y + 16}T${-250 * k} ${y}Z`, "snow", { w: "detail", tone: 1 });
  return X.wrap(w(-30, 1) + w(30, 0.75) + w(88, 0.5));
}, { box: [-280, -100, 560, 240], tags: ["cloud", "wispy", "cirrus", "high"], call: 'L.put(S, "cloud-wisp", x, y, { s, t })' });
reg("cloud-bank", "Clouds", "Cloud bank (layered)", () => {
  const X = ctx("day"), a = (sh, k, x, y) => L.g(cloud(X, sh, "day"), `translate(${x} ${y}) scale(${k})`);
  return X.wrap(a(LONG, 1.25, -250, 70) + a(LONG, 1.4, 260, 90) + a(PUFFY, 1.15, -60, 20) + a(PUFFY, 0.8, 330, -30));
}, { box: [-660, -240, 1320, 420], tags: ["cloud", "bank", "layered", "big"], wide: true, call: 'L.put(S, "cloud-bank", x, y, { s, t })' });

// =====================================================================================================================
// 5. STARS
// =====================================================================================================================
reg("star-single", "Stars", "Star · single", () => { const X = ctx("day"); return X.wrap(X.shape(L.star(0, 0, 100, 44), "yellow", { w: "prop" }) + strokeP(L.line([-30, -8], [-18, -32]), C("white", 0), 8, 0.85)); },
  { box: [-140, -140, 280, 280], tags: ["star", "yellow", "night"], call: 'L.put(S, "star-single", x, y, { s, t })' });
reg("star-twinkle", "Stars", "Star · twinkle sparkle", () => {
  const X = ctx("day");
  return X.wrap(L.tag("circle", { r: 150, fill: X.rad([[0, C("white", 0), 0.95], [0.35, C("yellow", 1), 0.5], [1, C("yellow", 1), 0]]) }) + X.shape(sparkle(0, 0, 118), "cream", { w: "detail", tone: 1 }) + X.shape(sparkle(92, -74, 40), "cream", { w: "detail", tone: 1 }) + X.shape(sparkle(-100, 62, 30), "cream", { w: "detail", tone: 1 }));
}, { box: [-170, -170, 340, 340], tags: ["star", "sparkle", "twinkle", "glint"], call: 'L.put(S, "star-twinkle", x, y, { s, t })' });
reg("star-field", "Stars", "Starfield patch", () => { const X = ctx("day"), R = L.rng(77); return X.wrap(starsIn(R, 70, [-300, -190, 300, 190], X, 7, true)); },
  { box: [-330, -210, 660, 420], tags: ["star", "stars", "field", "night", "patch"], call: 'L.put(S, "star-field", x, y, { s, t })' });
reg("star-shooting", "Stars", "Shooting star", () => {
  const X = ctx("day");
  const tail = `M-70 55L${f1(250)} -150L${f1(238)} -118Z`;
  return X.wrap(L.tag("path", { d: "M-84 66L230 -168L214 -132Z", fill: X.lin([[0, C("yellow", 1), 0.95], [1, C("yellow", 1), 0]], { abs: true, x1: -84, y1: 66, x2: 230, y2: -168 }) }) + strokeP("M-60 92L110 -34M-30 96L90 8", C("cream", 1), 5, 0.6) + X.shape(L.star(-84, 66, 50, 22), "yellow", { w: "prop" }));
}, { box: [-170, -190, 440, 330], tags: ["star", "shooting", "wish", "night"], call: 'L.put(S, "star-shooting", x, y, { s, t })' });
const constel = (pts, links, dash) => { const X = ctx("day"); return X.wrap(links.map(([a, b]) => L.stroke(L.line(pts[a], pts[b]), { c: "yellow", w: "detail", dash })).join("") + pts.map((p, i) => L.tag("circle", { cx: p[0], cy: p[1], r: 16, fill: X.rad([[0, C("yellow", 1), 0.5], [1, C("yellow", 1), 0]]) }) + X.shape(L.star(p[0], p[1], 13 + (i % 3) * 3, 6, 5), "yellow", { w: "detail" })).join("")); };
reg("constellation-dipper", "Stars", "Constellation · dipper", () => constel([[-250, -20], [-170, -62], [-80, -48], [20, -10], [28, 56], [150, 70], [160, -14]], [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 3]], "10 10"),
  { box: [-300, -130, 600, 260], tags: ["constellation", "stars", "night", "dipper"], call: 'L.put(S, "constellation-dipper", x, y, { s, t })' });
reg("constellation-zigzag", "Stars", "Constellation · zigzag", () => constel([[-230, 30], [-120, -50], [-10, 20], [105, -60], [220, 10]], [[0, 1], [1, 2], [2, 3], [3, 4]], "10 10"),
  { box: [-300, -130, 600, 260], tags: ["constellation", "stars", "night", "w"], call: 'L.put(S, "constellation-zigzag", x, y, { s, t })' });

// =====================================================================================================================
// 6. WEATHER
// =====================================================================================================================
const RB = ["red", "orange", "yellow", "green", "blue", "purple"];
function rainbow(withClouds) {
  const X = ctx("day"), bw = 28, R0 = 380, mid = R0 - 3 * bw, lw = L.lw("prop"), out = [];
  const arc = (r) => `M${-r} 0A${r} ${r} 0 0 1 ${r} 0`;
  if (L.T.ink !== "none") out.push(strokeP(arc(mid), L.outline("ink"), bw * 6 + lw * 2, 1, { "stroke-linecap": "butt" }));
  RB.forEach((n, i) => out.push(strokeP(arc(R0 - bw / 2 - i * bw), C(n, 0), bw + 0.6, 1, { "stroke-linecap": "butt" })));
  if (withClouds) [-mid, mid].forEach((x) => out.push(L.g(cloud(X, PUFFY, "day"), `translate(${x} 18) scale(0.5)`)));
  return X.wrap(out.join(""));
}
reg("rainbow", "Weather", "Rainbow (origin = centre of the base)", () => rainbow(false), { box: [-440, -420, 880, 480], tags: ["rainbow", "weather", "colour"], call: 'L.put(S, "rainbow", x, baseY, { s, t })' });
reg("rainbow-clouds", "Weather", "Rainbow with cloud ends", () => rainbow(true), { box: [-440, -420, 880, 520], tags: ["rainbow", "weather", "cloud"], call: 'L.put(S, "rainbow-clouds", x, baseY, { s, t })' });
const rainField = (n, len, seed, wd) => { const R = L.rng(seed), a = [], b = []; for (let i = 0; i < n; i++) (i % 3 ? a : b).push([-290 + R() * 580, -230 + R() * 420 - len]); return drops(a, len, -len * 0.3, C("water", 0), wd, 0.95) + drops(b, len * 0.8, -len * 0.24, C("water", 1), wd, 0.95); };
reg("weather-rain", "Weather", "Rain · light", () => rainField(26, 46, 3, 6), { box: [-300, -250, 600, 500], tags: ["rain", "weather", "drops", "wet"], call: 'L.put(S, "weather-rain", x, y, { s, t })' });
reg("weather-rain-heavy", "Weather", "Rain · heavy", () => rainField(64, 62, 8, 7), { box: [-300, -250, 600, 500], tags: ["rain", "weather", "heavy", "storm"], call: 'L.put(S, "weather-rain-heavy", x, y, { s, t })' });
reg("weather-raindrop", "Weather", "Raindrop", () => { const X = ctx("day"); return X.wrap(X.shape("M0 -110C20 -66 70 -22 70 28C70 68 38 98 0 98C-38 98 -70 68 -70 28C-70 -22 -20 -66 0 -110Z", "water", { w: "prop" }) + strokeP("M-38 24Q-40 56 -14 72", C("white", 0), 9, 0.85)); },
  { box: [-120, -130, 240, 250], tags: ["rain", "drop", "water", "weather"], call: 'L.put(S, "weather-raindrop", x, y, { s, t })' });
const flakeD = (r) => Array.from({ length: 6 }, (_, k) => { const a = (k / 6) * TAU, ca = Math.cos(a), sa = Math.sin(a), bx = ca * r * 0.55, by = sa * r * 0.55, br = r * 0.3, b1 = a + 1.05, b2 = a - 1.05;
  return `M0 0L${f1(ca * r)} ${f1(sa * r)}M${f1(bx)} ${f1(by)}L${f1(bx + Math.cos(b1) * br)} ${f1(by + Math.sin(b1) * br)}M${f1(bx)} ${f1(by)}L${f1(bx + Math.cos(b2) * br)} ${f1(by + Math.sin(b2) * br)}`; }).join("");
const flake = (x, y, r) => L.g(strokeP(flakeD(r), C("water", 0), Math.max(5, r * 0.2)) + strokeP(flakeD(r), C("white", 0), Math.max(2.5, r * 0.09)), `translate(${f1(x)} ${f1(y)})`);
reg("weather-snowflake", "Weather", "Snowflake (crystal)", () => flake(0, 0, 100), { box: [-130, -130, 260, 260], tags: ["snow", "flake", "winter", "crystal"], call: 'L.put(S, "weather-snowflake", x, y, { s, t })' });
reg("weather-snow", "Weather", "Snow falling", () => {
  const R = L.rng(12), out = []; for (let i = 0; i < 46; i++) { const r = 5 + R() * 9; out.push(L.tag("circle", { cx: f1(-290 + R() * 580), cy: f1(-230 + R() * 460), r: f1(r), fill: C("snow", 1), stroke: C("water", 1), "stroke-width": 2.5 })); }
  for (let i = 0; i < 6; i++) out.push(flake(-250 + R() * 500, -200 + R() * 400, 20 + R() * 10));
  return out.join("");
}, { box: [-300, -250, 600, 500], tags: ["snow", "weather", "winter", "flakes"], call: 'L.put(S, "weather-snow", x, y, { s, t })' });
reg("weather-hail", "Weather", "Hail", () => {
  const X = ctx("day"), R = L.rng(21), out = [];
  for (let i = 0; i < 18; i++) { const x = -270 + R() * 540, y = -200 + R() * 400, r = 9 + R() * 8; out.push(strokeP(`M${f1(x + r * 0.4)} ${f1(y - r - 26)}l${f1(r * 0.5)} 20`, C("gray", 1), 4, 0.6) + X.shape(L.circ(x, y, r), "glass", { w: "detail" }) + strokeP(L.arc(x, y, r * 0.55, 200, 260), C("white", 0), 3.5, 0.9)); }
  return X.wrap(out.join(""));
}, { box: [-300, -250, 600, 500], tags: ["hail", "ice", "weather", "storm"], call: 'L.put(S, "weather-hail", x, y, { s, t })' });
reg("weather-fog-band", "Weather", "Fog band", () => {
  const R = L.rng(4), out = [];
  [[-26, 840, 50], [28, 700, 46], [74, 900, 40], [-76, 560, 36]].forEach(([y, w, h], i) => out.push(L.tag("path", { d: blobPath(R, 0, y, w / 2, h, 10, 0.1), fill: i % 2 ? C("gray", 1) : C("white", 0), opacity: i % 2 ? 0.35 : 0.65 })));
  return out.join("");
}, { box: [-480, -130, 960, 260], tags: ["fog", "mist", "weather", "band"], call: 'L.put(S, "weather-fog-band", x, y, { s, t })' });
const spiral = (x, y, r0) => Array.from({ length: 14 }, (_, i) => { const a = (Math.PI / 2 - (i / 13) * 5.2), r = r0 * (1 - 0.55 * (i / 13)); return [x + Math.cos(a) * r, y - r0 + Math.sin(a) * r]; });
reg("weather-wind", "Weather", "Wind lines", () => {
  const line = (x0, y, len, c, wd) => { const pts = [[x0, y], [x0 + len * 0.3, y - 10], [x0 + len * 0.62, y + 8], [x0 + len * 0.82, y - 2], ...spiral(x0 + len, y, 30).slice(0)]; return strokeP(L.smooth(pts), c, wd); };
  return line(-270, -50, 400, C("gray", 0), 9) + line(-210, 30, 340, C("gray", 1), 8) + line(-250, 100, 300, C("gray", 0), 8);
}, { box: [-300, -140, 600, 300], tags: ["wind", "breeze", "weather", "air"], call: 'L.put(S, "weather-wind", x, y, { s, t })' });
reg("weather-lightning", "Weather", "Lightning bolt (static, no flash)", () => {
  const X = ctx("day");
  return X.wrap(L.tag("ellipse", { cx: 0, cy: 0, rx: 150, ry: 200, fill: X.rad([[0, C("yellow", 1), 0.35], [1, C("yellow", 1), 0]]) }) + X.shape(L.poly([[0, -160], [64, -160], [22, -48], [80, -48], [-48, 168], [-8, 28], [-68, 28]], true), "yellow", { w: "prop" }) + strokeP("M20 -138L-18 -52", C("white", 0), 8, 0.8));
}, { box: [-170, -210, 340, 420], tags: ["lightning", "bolt", "storm", "thunder", "weather"], call: 'L.put(S, "weather-lightning", x, y, { s, t })' });
reg("weather-cloud-sun", "Weather", "Partly cloudy (sun + cloud)", () => {
  const X = ctx("day");
  return X.wrap(L.g(L.inline("sun-rays"), "translate(-70 -60) scale(0.72)") + L.g(cloud(X, PUFFY, "day"), "translate(40 40) scale(0.85)"));
}, { box: [-300, -240, 600, 440], tags: ["weather", "sun", "cloud", "partly cloudy", "icon"], call: 'L.put(S, "weather-cloud-sun", x, y, { s, t })' });

// =====================================================================================================================
// 7. GROUND STRIPS (origin = horizon line; each in -day / -sunset / -night)
// =====================================================================================================================
const GW = 1920, GH = 360;
const gbase = (X, name) => `<rect x="0" y="0" width="${GW}" height="${GH + 4}" fill="${X.lin([[0, X.col(name, 1)], [0.45, X.col(name, 0)], [1, M(X.col(name, 0), X.col(name, 2), 0.75)]], { abs: true, x1: 0, y1: 0, x2: 0, y2: GH, mat: true })}"/>`;
const rim = (X, lava) => { const c = lava ? C("lava", 1) : X.t === "night" ? M(C("glass", 0), C("night", 1), 0.35) : X.t === "sunset" ? C("orange", 1) : C("white", 0), op = lava ? 0.5 : X.t === "day" ? 0.18 : 0.4;
  return `<rect x="0" y="-40" width="${GW}" height="130" fill="${X.lin([[0, c, 0], [0.31, c, op], [1, c, 0]], { abs: true, x1: 0, y1: -40, x2: 0, y2: 90 })}"/>`; };
const blade = (x, y, h, lean, w) => `M${q(x - w, y)}Q${q(x - w / 3 + lean / 3, y - h * 0.6, x + lean, y - h)}Q${q(x + w / 3 + lean / 3, y - h * 0.5, x + w, y)}Z`;
const tuftRows = (R, rows, base, step, hmul, dark, lite) => { for (let i = 0; i < rows; i++) { const y = 6 + GH * Math.pow(i / (rows - 1), 1.35), k = 0.35 + (0.65 * y) / GH, n = base + Math.round(i * step); for (let j = 0; j < n; j++) { const x = R() * GW, h = (14 + R() * 14) * k * hmul, w = 3.4 * k + 1; dark.push(blade(x, y, h, -h * 0.35, w) + blade(x, y, h * 1.12, h * 0.05, w)); lite.push(blade(x + k * 2, y, h * 0.85, h * 0.4, w * 0.8)); } } };
const hedge = (R, X, name, n) => { const d = []; for (let i = 0; i < n; i++) { const x = (i / n) * GW + R() * 30, h = 20 + R() * 22; d.push(blade(x, 6, h, -h * 0.3, 7) + blade(x + 8, 6, h * 0.8, h * 0.3, 7)); } return X.flat(d.join(""), X.col(name, 0)); };
const mow = (X, name) => [0, 2, 4, 6].map((i) => { const y0 = GH * Math.pow(i / 7, 1.5), y1 = GH * Math.pow((i + 1) / 7, 1.5); return `<rect x="0" y="${q(y0)}" width="${GW}" height="${q(y1 - y0)}" fill="${X.lite(name)}" opacity=".26"/>`; }).join("");
const patches = (R, X, name, n, tone) => Array.from({ length: n }, () => { const rx = 120 + R() * 200; return L.tag("ellipse", { cx: q(R() * GW), cy: q(20 + R() * 320), rx: q(rx), ry: q(rx * 0.1), fill: X.col(name, tone), opacity: 0.22 }); }).join("");
const cp = (x, y, r) => `M${f1(x - r)} ${f1(y)}a${f1(r)} ${f1(r)} 0 1 0 ${f1(2 * r)} 0a${f1(r)} ${f1(r)} 0 1 0 ${f1(-2 * r)} 0Z`;
function grassStrip(o, flowers) {
  const X = ctx(o.time), R = L.rng(flowers ? 21 : 7), out = [gbase(X, "grass"), mow(X, "grass"), patches(R, X, "grass", 9, 2)], dark = [], lite = [];
  out.push(hedge(R, X, "grass", 34));
  tuftRows(R, 13, flowers ? 2 : 3, flowers ? 0.45 : 0.75, 1, dark, lite);
  out.push(X.flat(dark.join(""), X.col("grass", 2)), X.flat(lite.join(""), X.lite("grass"), 0.9));
  if (flowers) {
    const PET = [["pink", 1], ["white", 0], ["yellow", 0], ["red", 1], ["purple", 1], ["orange", 1]], D = {}, stems = [], add = (key, w, c, x, y) => { (D[key] = D[key] || { w, c, d: "" }).d += `M${q(x, y)}h.1`; };
    for (let i = 0; i < 9; i++) { const y = 30 + GH * 0.92 * Math.pow(i / 8, 1.3), k = 0.45 + (0.75 * y) / GH, n = 4 + Math.round(i * 1.6);
      for (let j = 0; j < n; j++) { const x = R() * GW, sh = (18 + R() * 18) * k, pr = Math.round((3.6 * k + 1) * 2) / 2, ci = Math.floor(R() * 6), hx = x + (R() - 0.5) * 8 * k, hy = y - sh, c = X.lite(PET[ci][0]);
        stems.push(`M${q(x, y)}L${q(hx, hy)}`); for (let a = 0; a < 5; a++) { const an = (a / 5) * TAU - Math.PI / 2; add("p" + ci + "_" + pr, pr * 2, c, hx + Math.cos(an) * pr * 1.15, hy + Math.sin(an) * pr * 1.15); } add("c" + pr, pr * 1.4, X.col("orange", 0), hx, hy); } }
    out.push(strokeP(stems.join(""), X.col("grass", 2), 2.6, 1), ...Object.values(D).map((v) => strokeP(v.d, v.c, v.w, 1)));
  }
  out.push(rim(X)); return X.wrap(out.join(""));
}
function dunes(R, X, name, list) { // list: [y, amp, tone] far → near
  return list.map(([y, amp]) => { const pts = []; for (let x = -100; x <= GW + 120; x += 260) pts.push([x, y - R() * amp]); const d = `${L.smooth(pts)}L${GW + 120} ${GH + 4}L-100 ${GH + 4}Z`;
    return L.tag("path", { d, fill: X.lin([[0, X.lite(name)], [0.35, X.col(name, 0)], [1, M(X.col(name, 0), X.col(name, 2), 0.6)]], { abs: true, x1: 0, y1: y - amp, x2: 0, y2: GH, mat: true }) }) + strokeP(d.split("L")[0], X.lite(name), 5, 0.6); }).join("");
}
function sandStrip(o) {
  const X = ctx(o.time), R = L.rng(5), out = [gbase(X, "sand"), dunes(R, X, "sand", [[40, 26], [130, 40], [235, 48]])], rip = [];
  for (let i = 0; i < 80; i++) { const y = 150 + R() * 200, k = 0.5 + y / GH, x = R() * GW; rip.push(`M${q(x, y)}q${q(12 * k, -6 * k, 26 * k, 0)}q${q(14 * k, 6 * k, 28 * k, 0)}`); }
  out.push(strokeP(rip.join(""), X.col("sand", 2), 3, 0.6));
  const sp = []; for (let i = 0; i < 90; i++) sp.push([R() * GW, 20 + R() * 340]); out.push(dotsP(sp, 1.6, X.lite("sand"), 0.85));
  for (let i = 0; i < 6; i++) out.push(X.shape(blobPath(R, 120 + R() * 1700, 270 + R() * 70, 14 + R() * 10, 9 + R() * 5, 7, 0.2), "stone", { w: "detail" }));
  [[360, 300], [1280, 322]].forEach(([x, y]) => out.push(X.shape(L.star(x, y, 20, 8, 5, -90 + R() * 40), "orange", { w: "detail" })));
  out.push(rim(X)); return X.wrap(out.join(""));
}
function snowStrip(o) {
  const X = ctx(o.time, 0.3), R = L.rng(9), out = [gbase(X, "snow"), dunes(R, X, "snow", [[34, 22], [120, 34], [226, 44], [300, 36]])];
  const fp = []; for (let i = 0; i < 9; i++) { const x = 300 + i * 90, y = 300 + (i % 2) * 14; fp.push(L.circ(x, y, 9, 5)); } out.push(X.flat(fp.join(""), X.col("snow", 2), 0.7));
  const sp = []; for (let i = 0; i < 70; i++) sp.push([R() * GW, 40 + R() * 320]); out.push(dotsP(sp, 2, X.t === "night" ? C("glass", 0) : C("water", 1), 0.7));
  const tf = []; for (let i = 0; i < 26; i++) { const x = R() * GW, y = 6 + R() * 300, k = 0.4 + y / GH * 0.9; tf.push(blade(x, y, 22 * k, -8 * k, 3 * k + 1) + blade(x, y, 28 * k, 3 * k, 3 * k + 1) + blade(x, y, 18 * k, 10 * k, 3 * k + 1)); }
  out.push(X.flat(tf.join(""), X.col("earth", 0), 0.9)); out.push(rim(X)); return X.wrap(out.join(""));
}
function pathStrip(o) {
  const X = ctx(o.time), R = L.rng(13), out = [gbase(X, "earth")];
  const lane = []; for (let x = -120; x <= GW + 140; x += 240) lane.push([x, 96 + (R() - 0.5) * 40]); for (let x = GW + 140; x >= -120; x -= 240) lane.push([x, 308 + (R() - 0.5) * 36]); lane.push(lane[0]);
  out.push(X.flat(L.smooth(lane), X.lite("earth"), 0.55));
  for (const y of [170, 236]) { const rp = []; for (let x = -100; x <= GW + 120; x += 220) rp.push([x, y + (R() - 0.5) * 12]); out.push(strokeP(L.smooth(rp), X.col("earth", 2), 11, 0.55)); }
  const pb = []; for (let i = 0; i < 70; i++) pb.push([R() * GW, 10 + R() * 345]); out.push(dotsP(pb, 3, X.col("earth", 2), 0.8), dotsP(pb.slice(0, 40).map((p) => [p[0] - 1, p[1] - 2]), 1.8, X.lite("earth"), 0.9));
  for (let i = 0; i < 9; i++) out.push(X.shape(blobPath(R, R() * GW, 60 + R() * 280, 12 + R() * 12, 8 + R() * 6, 7, 0.2), "stone", { w: "detail" }));
  const ck = []; for (let i = 0; i < 12; i++) { const x = R() * GW, y = 50 + R() * 290; ck.push(`M${q(x, y)}l${q(14, 6, 26, -4, 40, 8)}`); } out.push(strokeP(ck.join(""), X.col("earth", 2), 3, 0.5));
  const dark = [], lite = []; tuftRows(R, 5, 5, 3, 0.9, dark, lite); out.push(X.flat(dark.join(""), X.col("grass", 2)), X.flat(lite.join(""), X.lite("grass"), 0.9));
  out.push(hedge(R, X, "grass", 24)); out.push(rim(X)); return X.wrap(out.join(""));
}
function roadStrip(o) {
  const X = ctx(o.time), R = L.rng(17), asph = (t) => M(X.col("gray", t), C("ink", 0), 0.35), out = [];
  out.push(gbase(X, "grass"));
  out.push(`<rect x="0" y="38" width="${GW}" height="274" fill="${X.lin([[0, asph(0)], [1, asph(2)]], { abs: true, x1: 0, y1: 38, x2: 0, y2: 312, mat: true })}"/>`);
  out.push(`<rect x="0" y="28" width="${GW}" height="12" fill="${X.col("stone", 1)}"/><rect x="0" y="312" width="${GW}" height="16" fill="${X.col("stone", 2)}"/><rect x="0" y="328" width="${GW}" height="36" fill="${X.col("stone", 0)}"/><rect x="0" y="328" width="${GW}" height="5" fill="${X.lite("stone")}"/>`);
  const dark = [], lite = []; tuftRows(R, 3, 3, 1, 0.8, dark, lite); out.push(hedge(R, X, "grass", 30));
  const sp = []; for (let i = 0; i < 130; i++) sp.push([R() * GW, 44 + R() * 262]); out.push(dotsP(sp, 1.8, X.lite("gray"), 0.4), dotsP(sp.slice(0, 70).map((p) => [p[0] + 3, p[1] + 3]), 1.8, C("ink", 0), 0.25));
  out.push(strokeP(`M-20 112Q480 100 960 114T1960 108M-20 244Q520 252 980 240T1960 248`, C("ink", 0), 22, 0.1));
  const line = X.t === "night" ? M(C("white", 0), C("night", 1), 0.35) : X.t === "sunset" ? M(C("white", 0), C("orange", 1), 0.25) : C("white", 0);
  out.push(strokeP("M0 64H1920M0 288H1920", line, 6, 1, { "stroke-linecap": "butt" }), strokeP("M20 176H1960", X.t === "night" ? M(C("yellow", 0), C("night", 1), 0.3) : C("yellow", 0), 10, 1, { "stroke-linecap": "butt", "stroke-dasharray": "100 80" }));
  const sl = []; for (let x = 0; x < GW; x += 150) sl.push(`M${x} 333V364`); out.push(strokeP(sl.join(""), X.col("stone", 2), 3, 0.8, { "stroke-linecap": "butt" }));
  out.push(rim(X)); return X.wrap(out.join(""));
}
function pavementStrip(o) {
  const X = ctx(o.time), R = L.rng(19), out = [gbase(X, "stone")], ys = Array.from({ length: 10 }, (_, i) => GH * Math.pow(i / 9, 1.4)), hz = [], vt = [];
  for (let r = 0; r < 9; r++) { const y0 = ys[r], y1 = ys[r + 1], sw = 110 + 150 * (y0 / GH), off = r % 2 ? sw / 2 : 0; hz.push(`M0 ${q(y1)}H${GW}`);
    for (let x = -off; x < GW; x += sw) { vt.push(`M${q(x, y0)}V${q(y1)}`); const t = R(); if (t < 0.22) out.push(`<rect x="${q(x)}" y="${q(y0)}" width="${q(sw)}" height="${q(y1 - y0)}" fill="${X.lite("stone")}" opacity=".35"/>`); else if (t < 0.4) out.push(`<rect x="${q(x)}" y="${q(y0)}" width="${q(sw)}" height="${q(y1 - y0)}" fill="${X.col("stone", 2)}" opacity=".18"/>`); } }
  out.push(strokeP(hz.join("") + vt.join(""), X.col("stone", 2), 3.4, 0.9, { "stroke-linecap": "butt" }));
  const ck = []; for (let i = 0; i < 10; i++) { const x = R() * GW, y = 60 + R() * 280; ck.push(`M${q(x, y)}l${q(10, 8, 22, 2, 30, 16)}`); } out.push(strokeP(ck.join(""), X.col("stone", 2), 2.6, 0.7));
  const sp = []; for (let i = 0; i < 100; i++) sp.push([R() * GW, 8 + R() * 346]); out.push(dotsP(sp, 1.6, X.col("stone", 2), 0.5), dotsP(sp.slice(0, 50).map((p) => [p[0] - 1, p[1] - 2]), 1.4, X.lite("stone"), 0.9));
  out.push(`<rect x="0" y="336" width="${GW}" height="28" fill="${X.col("stone", 2)}"/><rect x="0" y="336" width="${GW}" height="6" fill="${X.lite("stone")}"/>`);
  out.push(rim(X)); return X.wrap(out.join(""));
}
function waterStrip(o) {
  const X = ctx(o.time), R = L.rng(23), out = [gbase(X, "water")], crest = [], trough = [], glint = [];
  for (let i = 0; i < 15; i++) { const y = 10 + GH * 0.96 * Math.pow(i / 14, 1.5), k = 0.3 + (0.9 * y) / GH, w = 36 * k + 16, a = 5 * k + 2;
    for (let x = R() * w; x < GW; x += w * (1.7 + R() * 1.1)) { crest.push(`M${q(x, y)}q${q(w / 4, -a, w / 2, 0)}`); trough.push(`M${q(x + w * 0.1, y + 5 * k + 3)}q${q(w / 4, -a * 0.7, w / 2, 0)}`); } }
  out.push(strokeP(trough.join(""), X.col("water", 2), 4, 0.45), strokeP(crest.join(""), X.t === "night" ? M(C("glass", 0), C("night", 1), 0.4) : C("white", 0), 4, 0.75));
  const gx = X.t === "night" ? 520 : X.t === "sunset" ? 1440 : 420, gc = X.t === "sunset" ? C("yellow", 1) : X.t === "night" ? M(C("glass", 0), C("cream", 1), 0.4) : C("white", 0);
  for (let i = 0; i < 12; i++) { const y = 8 + GH * 0.95 * Math.pow(i / 11, 1.4), k = 0.3 + (0.9 * y) / GH, sp = (X.t === "night" ? 50 : 130) * k + 20; for (let j = 0; j < 4; j++) { const x = gx + (R() - 0.5) * 2 * sp, len = (10 + R() * 40) * k + 8; glint.push(`M${q(x - len / 2, y + R() * 5)}h${q(len)}`); } }
  out.push(strokeP(glint.join(""), gc, 4, 0.9)); out.push(rim(X)); return X.wrap(out.join(""));
}
function lavaStrip(o) {
  const X = ctx(o.time), R = L.rng(29), out = [`<rect x="0" y="0" width="${GW}" height="${GH + 4}" fill="${X.lin([[0, M(C("lava", 1), C("yellow", 0), 0.45)], [0.5, C("lava", 0)], [1, C("lava", 2)]], { abs: true, x1: 0, y1: 0, x2: 0, y2: GH, mat: true })}"/>`];
  const bub = []; for (let i = 0; i < 40; i++) bub.push([R() * GW, 8 + R() * 350]); out.push(dotsP(bub, 7, C("yellow", 0), 0.8), dotsP(bub.map((p) => [p[0] - 2, p[1] - 2]), 3, C("yellow", 1), 0.9));
  const fillP = X.lin([[0, M(X.col("brown", 1), C("lava", 2), 0.3)], [1, X.col("brown", 2)]], { abs: true, x1: 0, y1: 0, x2: 0, y2: GH, mat: true });
  const hl = [];
  for (let i = 0; i < 7; i++) { const y = 24 + GH * 0.92 * Math.pow(i / 6, 1.3), k = 0.4 + (0.9 * y) / GH, n = 17 - i * 2.2 | 0, w = (GW / n) * 0.86;
    for (let j = 0; j < n; j++) { const cx = ((j + 0.5 + (R() - 0.5) * 0.4) / n) * GW, cy = y + (R() - 0.5) * 10 * k, rx = (w / 2) * (0.7 + R() * 0.3), ry = rx * 0.34 * (0.8 + R() * 0.4);
      out.push(L.tag("path", { d: blobPath(R, cx, cy, rx, ry, 7, 0.2), fill: fillP, stroke: L.outline("brown"), "stroke-width": L.lw("scene", 1), "stroke-linejoin": L.T.join }));
      hl.push(arcS(cx, cy, rx * 0.7, 200, 255, ry * 0.7)); } }
  out.push(strokeP(hl.join(""), M(X.col("stone", 1), C("lava", 1), 0.2), 3, 0.5)); out.push(rim(X, true)); return X.wrap(out.join(""));
}
function rockyStrip(o) {
  const X = ctx(o.time), R = L.rng(37), out = [gbase(X, "stone")], gr = [];
  for (let i = 0; i < 120; i++) gr.push([R() * GW, 6 + R() * 350]); out.push(dotsP(gr, 2.4, X.col("stone", 2), 0.6), dotsP(gr.slice(0, 60).map((p) => [p[0] - 1, p[1] - 2]), 1.6, X.lite("stone"), 0.9));
  const ck = []; for (let i = 0; i < 12; i++) { const x = R() * GW, y = 40 + R() * 300; ck.push(`M${q(x, y)}l${q(14, 10, 22, 0, 40, 14)}`); } out.push(strokeP(ck.join(""), X.col("stone", 2), 3, 0.6));
  const rows = [[6, 10, 30, 60], [90, 7, 26, 50], [190, 5, 34, 70], [300, 4, 40, 80]], stoneFill = X.paint("stone"), hi = X.t === "night" ? C("glass", 0) : C("white", 0);
  rows.forEach(([y, n, rmin, rmax], ri) => { for (let j = 0; j < n; j++) { const cx = ((j + R()) / n) * GW, rx = rmin + R() * (rmax - rmin), ry = Math.min(rx * (0.6 + R() * 0.2), y + 36), cy = y + (ri ? 12 * R() : 0);
    out.push(L.tag("ellipse", { cx: q(cx + rx * 0.35), cy: q(cy + ry * 0.55), rx: q(rx * 1.05), ry: q(ry * 0.3), fill: X.col("stone", 2), opacity: 0.4 }));
    out.push(L.tag("path", { d: blobPath(R, cx, cy, rx, ry, 7, 0.12), fill: stoneFill, stroke: L.outline("stone"), "stroke-width": L.lw("scene"), "stroke-linejoin": L.T.join }), strokeP(arcS(cx, cy, rx * 0.66, 200, 258, ry * 0.66), hi, 5, X.t === "night" ? 0.45 : 0.55), strokeP(`M${q(cx + rx * 0.1, cy + ry * 0.1)}l${q(rx * 0.2, ry * 0.3, -rx * 0.05, ry * 0.5)}`, X.col("stone", 2), 3, 0.6)); } });
  out.push(rim(X)); return X.wrap(out.join(""));
}
const GROUND = [["grass", "Grass", (o) => grassStrip(o, false)], ["meadow", "Meadow with flowers", (o) => grassStrip(o, true)], ["sand", "Sand", sandStrip], ["snow", "Snow", snowStrip], ["path", "Dirt path", pathStrip], ["road", "Road with lines", roadStrip],
  ["pavement", "Pavement", pavementStrip], ["water", "Water / sea", waterStrip], ["lava", "Lava", lavaStrip], ["rocky", "Rocky ground", rockyStrip]];
GROUND.forEach(([k, label, fn]) => ["day", "sunset", "night"].forEach((t) =>
  reg(`ground-${k}-${t}`, "Ground", `${label} · ${t}`, (o) => fn(o), { box: [0, -40, GW, 400], wide: true, defaults: { time: t }, demo: { time: t }, tags: ["ground", "floor", k, t, "strip", label.toLowerCase()],
    call: `L.put(S, "ground-${k}-${t}", 0, horizonY, { t })  // origin = horizon line; time: "day"|"sunset"|"night"` })));
})();
