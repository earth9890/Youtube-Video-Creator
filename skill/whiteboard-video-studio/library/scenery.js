// ===================== library/scenery.js — trees, street props, buildings and full places (day / sunset / night) =====================
// Pieces stand on the ground (origin = bottom centre). Scenes are 1920x1080 (origin top-left), ground line ~ y 860,
// the middle-bottom third is left calm for characters. Every piece takes o.time = "day" | "sunset" | "night".
// Light is built per time of day (sky, sun/moon, lit windows, lamp glow, long shadows), not a grey overlay.
(function () {
const L = window.L, f1 = L.f1;
const P = L.poly, R = L.rrect, C = L.circ, S = L.smooth;

// per time of day: the palette is mixed toward a light colour (warm at sunset, deep blue at night) while the asset draws,
// so every solid and gradient follows the light with no overlay paths; haze = colour distant layers fade into.
// Light sources (sun, moon, stars, lit windows, flames, glows) are drawn through q.raw() = unmixed palette.
const TM = {
  day: { haze: ["sky", 1], hz: 0.5 },
  sunset: { haze: ["pink", 1], hz: 0.55, mix: ["orange", 0, 0.22] },
  night: { haze: ["night", 0], hz: 0.55, mix: ["blue", 2, 0.5] },
};
const tm = (o) => (TM[o && o.time] ? o.time : "day");
const timeLook = (time) => {
  if (time === "day" || L.T.__time === time) return L.T;
  const base = L.T, key = base.palette + "~" + time, [n, t, k] = TM[time].mix;
  if (!L.PALETTES[key]) { const tc = L.BASE[n][t], src = L.PALETTES[base.palette] || L.BASE; L.PALETTES[key] = Object.fromEntries(Object.entries(src).map(([c, v]) => [c, c === "ink" ? v : v.map((h) => L.mix(h, tc, k))])); }
  return Object.assign({}, base, { palette: key, __time: time, __base: base });
};
const withTime = (fn) => (o = {}) => { const tok = timeLook(tm(o)); return tok === L.T ? fn(o) : L.useLook(tok, () => fn(o)); };
let GID = 0;
const gid = (p) => p + ++GID;

// scalloped blob (canopies, bushes, rocks): lobes bumps of relative size jit
const blob = (cx, cy, rx, ry, lobes = 7, jit = 0.12, ph = 0, per = 4) => {
  const n = lobes * per, pts = [];
  for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2, k = 1 + jit * Math.cos(lobes * a + ph); pts.push([cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k]); }
  pts.push(pts[0]); return S(pts);
};
// rolling ridge line closed down to the bottom of the frame
const ridge = (seed, y0, amp, step = 140) => {
  const r = L.rng(seed), pts = [];
  for (let x = -60; x <= 1980; x += step) pts.push([x, y0 - amp * (0.5 + 0.5 * Math.sin(x * 0.0045 + seed)) - r() * amp * 0.5]);
  return S(pts) + " L1980 1100 L-60 1100 Z";
};
const cloudD = (x, y, s = 1) => S([[-110, 0], [-125, -28], [-85, -52], [-50, -88], [0, -72], [42, -100], [92, -68], [125, -32], [108, 0], [-110, 0]].map(([a, b]) => [x + a * s, y + b * s]));
// scattered dots (stars, petals, dust) as one path
const dots = (seed, n, x0, y0, w, h, rmin, rmax) => { const r = L.rng(seed); let d = ""; for (let i = 0; i < n; i++) d += C(x0 + r() * w, y0 + r() * h, rmin + r() * (rmax - rmin)); return d; };
const rgn = (seed, n, x0, y0, w, h) => { const r = L.rng(seed); return Array.from({ length: n }, () => [x0 + r() * w, y0 + r() * h, r()]); };

// ---------- per-render context: every drawing helper knows the time of day ----------
const Q = (o = {}) => {
  const time = tm(o), K = TM[time], night = time === "night", sunset = time === "sunset", far = !!o.far;
  const q = { time, night, sunset, day: time === "day", K, far };
  q.raw = (fn) => { const cur = L.T; L.T = cur.__base || cur; try { return fn(); } finally { L.T = cur; } };
  q.blob = (cx, cy, rx, ry, lobes, jit, ph) => blob(cx, cy, rx, ry, lobes, jit, ph, far ? 2.5 : 4);
  // solid shape in the light of this time of day. p.lit = a light source (windows, flames). far = small piece in a scene: flat colour, no detail
  q.sh = (d, name, p = {}) => {
    const o2 = Object.assign({ w: "prop" }, p, { tone: p.lit ? p.tone || 0 : night ? 2 : p.tone || 0 });
    if (far) o2.flat = true;
    return p.lit ? q.raw(() => L.shape(d, name, o2)) : L.shape(d, name, o2);
  };
  q.hi = (d, name, op = 0.5) => (far ? "" : L.flat(d, L.c(name, 1), night ? op * 0.35 : op));
  q.dk = (d, name, op = 0.3) => (far ? "" : L.flat(d, L.c(name, 2), op));
  q.hz = (d, depth = 1) => q.raw(() => L.flat(d, L.c(K.haze[0], K.haze[1]), K.hz * depth));
  q.line = (d, c = "ink", op = 0.5, w = "detail") => (far && w === "detail" ? "" : L.stroke(d, { c, w, op }));
  q.shd = (cx, gy, w) => !L.T.shadow ? "" : night ? L.tag("ellipse", { cx, cy: gy + 2, rx: w * 0.5, ry: w * 0.06, fill: L.c("ink"), opacity: 0.18 })
    : sunset ? L.tag("ellipse", { cx: cx + w * 0.22, cy: gy + 2, rx: w * 0.5 + 40, ry: w * 0.045 + 4, fill: L.c("ink"), opacity: 0.2 }) : L.shadow(cx, gy, w);
  q.glow = (cx, cy, r, c = "yellow", op = 0.5, tone = 1, ry = r) => q.raw(() => { const id = gid("gl"), col = L.c(c, tone); return `<defs><radialGradient id="${id}"><stop offset="0" stop-color="${col}" stop-opacity="${op}"/><stop offset="1" stop-color="${col}" stop-opacity="0"/></radialGradient></defs>${L.tag("ellipse", { cx, cy, rx: r, ry, fill: `url(#${id})` })}`; });
  q.clip = (d, inner) => { const id = gid("cp"); return `<clipPath id="${id}"><path d="${d}"/></clipPath><g clip-path="url(#${id})">${inner}</g>`; };
  // vertical gradient rect; stops [[offset, colourName, tone]]
  q.vgrad = (x, y, w, h, stops, op) => { const id = gid("vg"); return `<defs><linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="0" y1="${f1(y)}" x2="0" y2="${f1(y + h)}">${stops.map(([o2, c, t]) => `<stop offset="${o2}" stop-color="${L.c(c, t || 0)}"/>`).join("")}</linearGradient></defs>${L.tag("rect", { x, y, width: w, height: h, fill: `url(#${id})`, opacity: op })}`; };
  q.hgrad = (x, y, w, h, c, op0, op1) => { const id = gid("hg"), col = L.c(c); return `<defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${col}" stop-opacity="${op0}"/><stop offset="1" stop-color="${col}" stop-opacity="${op1}"/></linearGradient></defs>${L.tag("rect", { x, y, width: w, height: h, fill: `url(#${id})` })}`; };
  q.at = (name, x, y, s = 1, p = {}) => L.g(L.inline(name, Object.assign({ time, far: s < 0.75 }, p)), `translate(${f1(x)} ${f1(y)}) scale(${(p.flip ? -1 : 1) * s} ${s})`);
  q.ground = (y, name, p = {}) => q.sh(P([[-20, y], [1940, y], [1940, 1100], [-20, 1100]], true), name, Object.assign({ w: "scene", dir: "v" }, p));
  q.ridge = (seed, y0, amp, name, depth = 0.5, p = {}) => { const d = ridge(seed, y0, amp, p.step); return q.sh(d, name, Object.assign({ w: "scene" }, p)) + q.hz(d, depth); };
  q.tufts = (seed, n, x0, y0, w, h, c = "grass") => { const r = L.rng(seed); let d = ""; for (let i = 0; i < n; i++) { const x = x0 + r() * w, y = y0 + r() * h; d += `M${f1(x)} ${f1(y)} l-6 -12 M${f1(x)} ${f1(y)} l1 -15 M${f1(x)} ${f1(y)} l7 -11`; } return L.stroke(d, { c: L.c(c, 2), w: "detail", op: night ? 0.7 : 0.45 }); };
  q.stars = (seed, n, x0, y0, w, h) => q.raw(() => L.flat(dots(seed, n, x0, y0, w, h, 1.3, 3.4), "white", 0.9) + rgn(seed + 9, 7, x0, y0, w, h).map(([x, y, k]) => L.flat(L.star(x, y, 9 + k * 7, 2.5, 4), "white", 0.95)).join(""));
  q.cloud = (x, y, s = 1) => q.raw(() => { const d = cloudD(x, y, s); return night ? L.shape(d, "night", { w: "detail", tone: 1, op: 0.75 }) : L.shape(d, sunset ? "pink" : "white", { w: "detail", tone: sunset ? 1 : 0 }) + (sunset ? L.flat(cloudD(x, y + 12 * s, s * 0.94), "orange", 0.22) : ""); });
  q.sun = (x, y, r = 62) => (sunset ? q.glow(x, y, r * 7, "orange", 0.6, 0) + q.glow(x, y, r * 3.2, "yellow", 0.7, 0) : q.glow(x, y, r * 4, "yellow", 0.4, 1)) + q.raw(() => L.shape(C(x, y, r), sunset ? "orange" : "yellow", { w: "scene", tone: sunset ? 1 : 0 }));
  q.moon = (x, y, r = 58) => q.glow(x, y, r * 5, "glass", 0.45, 2) + q.raw(() => L.shape(C(x, y, r), "cream", { w: "scene" })
    + L.flat(C(x - r * 0.3, y - r * 0.2, r * 0.2) + C(x + r * 0.35, y + r * 0.25, r * 0.28) + C(x + r * 0.1, y - r * 0.5, r * 0.13), "yellow", 0.3));
  // sky: gradient to the horizon hy, celestial body, clouds. p: { sx, sy, clouds: [[x,y,s]...] | false, r, nostars }
  q.sky = (hy = 680, p = {}) => {
    const st = night ? [[0, "navy", 2], [0.55, "night", 2], [1, "night", 0]] : sunset ? [[0, "purple", 0], [0.42, "pink", 0], [0.78, "orange", 1], [1, "yellow", 1]] : [[0, "sky", 2], [0.6, "sky", 0], [1, "sky", 1]];
    const sx = p.sx !== undefined ? p.sx : sunset ? 440 : 1480, sy = p.sy !== undefined ? p.sy : sunset ? hy - 70 : 170;
    const cl = p.clouds === false ? [] : p.clouds || [[260, 170, 1], [770, 110, 0.75], [1100, 270, 0.9], [1760, 320, 0.8]];
    let o2 = q.raw(() => q.vgrad(0, 0, 1920, hy + 90, st) + L.tag("rect", { x: 0, y: hy + 89, width: 1920, height: 1000, fill: L.c(st[2][1], st[2][2]) }));
    if (night && !p.nostars) o2 += q.stars(p.seed || 5, 70, 0, 0, 1920, hy * 0.8);
    o2 += night ? q.moon(sx, sy, p.r || 58) : q.sun(sx, sy, p.r || (sunset ? 96 : 62));
    return o2 + (night ? cl.slice(0, 2) : cl).map(([x, y, s]) => q.cloud(x, y, s)).join("");
  };
  // window: lit at night, reflecting the sun at sunset, glass by day
  q.win = (x, y, w, h, lit = true) => {
    const d = R(x, y, w, h, Math.min(w, h) * 0.22), cx = x + w / 2, cy = y + h / 2, mun = far ? "" : L.stroke(`M${f1(cx)} ${f1(y)} V${f1(y + h)} M${f1(x)} ${f1(cy)} H${f1(x + w)}`, { c: "wood", w: "hair", op: 0.7 });
    if (night) return q.sh(d, lit ? "yellow" : "navy", { w: "detail", tone: 1, flat: true, lit: true }) + mun;
    return q.sh(d, "glass", { w: "detail" }) + (far ? "" : sunset ? L.flat(d, "orange", 0.4) : L.flat(P([[x + w * 0.1, y + h * 0.9], [x + w * 0.1, y + h * 0.45], [x + w * 0.55, y + h * 0.1], [x + w * 0.8, y + h * 0.1]], true), "white", 0.55)) + mun;
  };
  // grid of small windows as one path per state (big buildings): night = random lit / dark, sunset = sun-flushed glass
  q.wins = (x, y, cols, rows, w, h, gx, gy, seed, lp = 0.55) => {
    const r = L.rng(seed); let lit = "", dark = "";
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) { const d = L.rect(x + i * (w + gx), y + j * (h + gy), w, h); if (night && r() < lp) lit += d; else dark += d; }
    if (night) return (dark ? L.shape(dark, "navy", { w: "hair", tone: 1, flat: true }) : "") + (lit ? q.raw(() => L.shape(lit, "yellow", { w: "hair", tone: 1, flat: true })) : "");
    return L.shape(dark, "glass", { w: "hair", flat: true }) + (sunset ? L.flat(dark, "orange", 0.35) : L.flat(dark, "white", 0.25));
  };
  q.wglow = (x, y, w, h) => (night && !far ? q.glow(x + w / 2, y + h / 2, w * 1.1, "yellow", 0.35, 1, h * 1.1) : "");
  return q;
};

// ---------- registration helpers ----------
// reg: one tile. night(): also registers "<name>-night" (same drawing forced to night)
const reg = (name, label, group, box, fn, tags = [], extra = {}) =>
  L.reg("scenery", name, withTime(fn), Object.assign({ box, group, label, tags: ["scenery", ...tags], call: `L.put(S, "${name}", x, gy, { s: 1, time: "day", t })`, demo: { time: "day" } }, extra));
const reg2 = (name, label, group, box, fn, tags, extra) => {
  const w = withTime(fn);
  reg(name, label, group, box, fn, tags, extra);
  reg(name + "-night", label + " · night", group, box, (o) => w(Object.assign({}, o, { time: "night" })), tags, Object.assign({}, extra, { demo: { time: "night" }, call: `L.put(S, "${name}-night", x, gy, { s: 1, t })` }));
};
const BX = [-250, -470, 500, 490];

// ---------- trees ----------
const leafMarks = (q, pts, c) => q.line(pts.map(([x, y]) => `M${x} ${y} q8 -10 18 -2`).join(""), L.c(c, 2), 0.6);
const TREES = {
  round: (q) => q.shd(0, 0, 240) + q.sh(P([[-20, 0], [-13, -100], [-17, -165], [17, -165], [13, -100], [20, 0]], true), "wood") + q.dk(P([[7, 0], [7, -100], [5, -165], [17, -165], [13, -100], [20, 0]], true), "wood", 0.3)
    + q.sh(q.blob(0, -255, 135, 118, 7, 0.1), "green") + q.hi(q.blob(-48, -300, 62, 40, 3, 0.1, 0.5), "green", 0.6) + leafMarks(q, [[-80, -230], [30, -200], [60, -270], [-20, -330], [-90, -280]], "green"),
  pine: (q, snow) => {
    let o = q.shd(0, 0, 200) + q.sh(L.rect(-14, -60, 28, 60), "wood");
    [[190, 120, -50], [150, 105, -130], [112, 92, -205], [74, 80, -275]].forEach(([w, h, y], i) => {
      const d = P([[-w / 2, y], [-w / 6, y + 14], [w / 6, y + 14], [w / 2, y], [0, y - h]], true);
      o += q.sh(d, "green", { tone: i % 2 }) + q.hi(P([[0, y - h + 12], [-w * 0.42, y - 8], [-w * 0.1, y - 6]], true), "green", 0.45);
      if (snow) { const f = 0.5, ky = y - h * (1 - f); o += q.sh(P([[0, y - h], [-w / 2 * f, ky], [-w * 0.15, ky + 12], [0, ky - 4], [w * 0.15, ky + 12], [w / 2 * f, ky]], true), "snow", { w: "detail" }); }
    });
    return o;
  },
  palm: (q) => {
    const b = [34, -272]; let o = q.shd(10, 0, 200) + q.sh(L.limb([[8, 0], [12, -90], [28, -190], [34, -272]], 40, 22), "wood");
    for (let i = 0; i < 6; i++) o += q.line(`M${10 + i * 5 + (i * 3)} ${-30 - i * 38} h${i % 2 ? -22 : 22}`, L.c("wood", 2), 0.6);
    [-172, -142, -112, -80, -48, -16, 12, 188].forEach((a, i) => {
      const r = a * Math.PI / 180, len = 150 + (i % 3) * 18, dx = Math.cos(r), dy = Math.sin(r), px = -dy, py = dx, w = 24;
      const mid = [b[0] + dx * len * 0.5, b[1] + dy * len * 0.5 - 18], tip = [b[0] + dx * len, b[1] + dy * len + 46];
      o += q.sh(S([b, [mid[0] + px * w, mid[1] + py * w], tip, [mid[0] - px * w, mid[1] - py * w], b]), "green", { tone: i % 2, w: "detail" });
      o += q.line(L.line(b, [tip[0] * 0.96 + b[0] * 0.04, tip[1] - 6]), L.c("green", 2), 0.6);
    });
    return o + q.sh(C(26, -262, 13), "brown", { w: "detail" }) + q.sh(C(46, -258, 13), "brown", { w: "detail" });
  },
  oak: (q) => q.shd(0, 0, 300) + q.sh(P([[-38, 0], [-22, -80], [-26, -170], [26, -170], [22, -80], [38, 0]], true), "wood") + q.dk(P([[10, 0], [8, -80], [8, -170], [26, -170], [22, -80], [38, 0]], true), "wood", 0.3)
    + q.sh(L.limb([[-14, -130], [-80, -190], [-110, -235]], 24, 10), "wood") + q.sh(L.limb([[14, -130], [80, -190], [115, -230]], 24, 10), "wood")
    + q.sh(q.blob(0, -270, 190, 112, 9, 0.11), "green", { tone: 1 }) + q.hi(q.blob(-70, -310, 80, 38, 4, 0.1, 0.5), "green", 0.6) + leafMarks(q, [[-120, -260], [10, -230], [100, -280], [-30, -330], [60, -340]], "green"),
  birch: (q) => q.shd(0, 0, 200) + q.sh(P([[-14, 0], [-11, -120], [-12, -200], [12, -200], [11, -120], [14, 0]], true), "white") + q.line("M-6 -30 h11 M2 -80 h9 M-7 -120 h12 M3 -165 h8", "ink", 0.9, "prop")
    + q.sh(q.blob(-60, -210, 48, 58, 4, 0.1), "grass") + q.sh(q.blob(62, -222, 50, 58, 4, 0.1, 1), "grass") + q.sh(q.blob(0, -290, 82, 125, 6, 0.1), "grass", { tone: 1 }) + q.hi(q.blob(-26, -335, 30, 50, 3, 0.1), "grass", 0.7),
  cactus: (q) => q.shd(0, 0, 170) + q.sh(L.limb([[-18, -110], [-72, -110], [-72, -200]], 34, 34), "green") + q.sh(L.limb([[18, -150], [70, -150], [70, -232]], 34, 34), "green")
    + q.sh(R(-30, -290, 60, 290, 30), "green") + q.hi(R(-20, -270, 12, 220, 6), "green", 0.6) + q.line("M0 -280 V-12 M-34 -105 h-32 M70 -226 v-70", L.c("green", 2), 0.5)
    + L.flat(dots(3, 18, -22, -270, 44, 250, 1.5, 2.4), "cream", 0.8) + q.sh(S([[-12, -300], [0, -330], [12, -300], [0, -290], [-12, -300]]), "pink", { w: "detail" }),
  dead: (q) => q.shd(0, 0, 180) + q.sh(L.limb([[0, 0], [-4, -120], [8, -250]], 44, 14), "brown")
    + q.sh(L.limb([[2, -110], [-70, -180], [-112, -250]], 20, 6), "brown") + q.sh(L.limb([[2, -170], [60, -220], [96, -300]], 18, 6), "brown") + q.sh(L.limb([[8, -250], [-22, -320], [-18, -380]], 14, 4), "brown")
    + q.sh(L.limb([[-66, -178], [-60, -230], [-76, -272]], 10, 3), "brown") + q.sh(L.limb([[56, -218], [92, -232], [120, -262]], 9, 3), "brown")
    + q.sh(S([[-8, -96], [-2, -80], [-14, -66], [-8, -96]]), "navy", { w: "hair" }),
  blossom: (q) => q.shd(0, 0, 250) + q.sh(P([[-20, 0], [-13, -100], [-17, -165], [17, -165], [13, -100], [20, 0]], true), "brown") + q.sh(L.limb([[0, -130], [-70, -200]], 18, 9), "brown") + q.sh(L.limb([[0, -140], [74, -205]], 18, 9), "brown")
    + q.sh(q.blob(0, -255, 145, 118, 8, 0.1), "pink") + q.hi(q.blob(-52, -300, 66, 40, 3, 0.1, 0.5), "white", 0.8) + L.flat(dots(11, 16, -90, -280, 180, 90, 4, 7), "white", q.night ? 0.3 : 0.7)
    + L.flat(dots(4, 14, -150, -40, 300, 40, 4, 6), "pink", 0.85),
  autumn: (q) => q.shd(0, 0, 240) + q.sh(P([[-20, 0], [-13, -100], [-17, -165], [17, -165], [13, -100], [20, 0]], true), "wood") + q.sh(q.blob(0, -255, 135, 118, 7, 0.1), "orange")
    + L.flat(q.blob(-50, -235, 50, 40, 4, 0.1), "red", 0.55) + L.flat(q.blob(52, -285, 48, 36, 4, 0.1), "yellow", 0.7) + q.hi(q.blob(-48, -300, 60, 38, 3, 0.1, 0.5), "orange", 0.6)
    + L.flat(dots(8, 10, -150, -40, 300, 36, 5, 8), "orange", 0.9) + L.flat(dots(9, 6, -130, -30, 260, 24, 4, 7), "red", 0.9),
};
const treeReg = (key, label, tags, extra) => reg("tree-" + key, label, "Nature", BX, (o) => { const q = Q(o); return TREES[key](q, o.snow); }, ["tree", ...tags], extra);
treeReg("round", "Tree · round", ["green", "park"]); treeReg("pine", "Tree · pine", ["conifer", "forest"]); treeReg("palm", "Tree · palm", ["beach", "tropical"]);
treeReg("oak", "Tree · oak", ["wide", "park"]); treeReg("birch", "Tree · birch", ["white", "forest"]); treeReg("cactus", "Cactus", ["desert", "plant"]);
treeReg("dead", "Tree · dead", ["bare", "spooky", "desert"]); treeReg("blossom", "Tree · blossom", ["pink", "spring"]); treeReg("autumn", "Tree · autumn", ["orange", "fall"]);
reg("tree-pine-snow", "Tree · snowy pine", "Nature", BX, (o) => TREES.pine(Q(o), true), ["tree", "snow", "winter", "conifer"]);

// ---------- bushes, flowers, rocks, hills, mountains ----------
const SB = [-180, -200, 360, 220];
reg("bush-round", "Bush · round", "Nature", SB, (o) => { const q = Q(o); return q.shd(0, 0, 200) + q.sh(q.blob(0, -52, 92, 54, 5, 0.14), "green") + q.hi(q.blob(-30, -78, 36, 18, 3, 0.1), "green", 0.6) + leafMarks(q, [[-50, -40], [20, -30], [40, -70]], "green"); }, ["bush", "green"]);
reg("bush-berry", "Bush · berries", "Nature", SB, (o) => { const q = Q(o); return q.shd(0, 0, 200) + q.sh(q.blob(0, -52, 92, 54, 5, 0.14, 1), "green", { tone: 1 }) + q.hi(q.blob(-30, -78, 36, 18, 3, 0.1), "green", 0.6)
  + rgn(2, 9, -66, -84, 132, 56).map(([x, y]) => q.sh(C(x, y, 7), "red", { w: "hair" })).join(""); }, ["bush", "berries"]);
reg("hedge", "Hedge", "Nature", SB, (o) => { const q = Q(o); return q.shd(0, 0, 340) + q.sh(R(-160, -100, 320, 100, 26), "green") + q.sh(q.blob(0, -96, 150, 12, 7, 0.4), "green", { tone: 1, w: "detail" }) + q.hi(R(-140, -88, 280, 14, 7), "green", 0.5)
  + q.line("M-100 -60 h30 M20 -48 h40 M-30 -30 h24 M90 -64 h30", L.c("green", 2), 0.5); }, ["hedge", "garden"]);
const flower = (q, x, h, c, k) => q.line(`M${x} 0 q${k * 6} ${-h / 2} 0 ${-h}`, "green", 1, "prop")
  + [0, 1, 2, 3, 4, 5].map((i) => q.sh(C(x + Math.cos(i * 1.047) * 13, -h + Math.sin(i * 1.047) * 13, 10), c, { w: "hair", flat: true })).join("") + q.sh(C(x, -h, 9), "yellow", { w: "hair" });
reg("flowers-daisy", "Flowers · daisies", "Nature", [-170, -190, 340, 210], (o) => { const q = Q(o); return q.shd(0, 0, 260) + q.sh(R(-125, -10, 250, 22, 11), "grass", { w: "detail" }) + [[-90, 100, "white"], [-45, 140, "pink"], [0, 110, "white"], [50, 150, "white"], [95, 95, "pink"]].map(([x, h, c], i) => flower(q, x, h, c, i % 2 ? 1 : -1)).join(""); }, ["flowers", "garden"]);
const tulip = (q, x, h, c) => q.line(`M${x} 0 V${-h}`, "green", 1, "prop")
  + q.sh(S([[x - 18, -h], [x - 18, -h - 28], [x - 8, -h - 20], [x, -h - 34], [x + 8, -h - 20], [x + 18, -h - 28], [x + 18, -h], [x, -h + 12], [x - 18, -h]]), c, { w: "detail" });
reg("flowers-tulips", "Flowers · tulips", "Nature", [-170, -190, 340, 210], (o) => { const q = Q(o); return q.shd(0, 0, 260) + q.sh(R(-125, -10, 250, 22, 11), "grass", { w: "detail" }) + [[-90, 90, "red"], [-45, 120, "yellow"], [0, 100, "pink"], [48, 130, "red"], [95, 85, "orange"]].map(([x, h, c]) => tulip(q, x, h, c)).join(""); }, ["flowers", "garden", "spring"]);
const rock = (q, cx, cy, w, h, seed, name = "stone") => { const r = L.rng(seed), pts = [[cx - w / 2, cy], [cx - w * 0.5, cy - h * 0.45], [cx - w * 0.25, cy - h * (0.9 + r() * 0.1)], [cx + w * 0.15, cy - h], [cx + w * 0.45, cy - h * 0.6], [cx + w / 2, cy]];
  const d = S([...pts, pts[0]]); return q.sh(d, name) + q.hi(P([[cx - w * 0.4, cy - h * 0.5], [cx - w * 0.2, cy - h * 0.85], [cx + w * 0.05, cy - h * 0.85], [cx - w * 0.15, cy - h * 0.5]], true), name, 0.6) + q.line(`M${f1(cx + w * 0.1)} ${f1(cy - h * 0.4)} l${f1(w * 0.12)} ${f1(h * 0.25)} M${f1(cx - w * 0.2)} ${f1(cy - h * 0.25)} l${f1(w * 0.1)} ${f1(h * 0.15)}`, "ink", 0.35); };
reg("rock-boulder", "Rock · boulder", "Nature", SB, (o) => { const q = Q(o); return q.shd(0, 0, 220) + rock(q, 0, 0, 200, 140, 3); }, ["rock", "stone"]);
reg("rock-pile", "Rocks · pile", "Nature", SB, (o) => { const q = Q(o); return q.shd(0, 0, 300) + rock(q, 60, 0, 120, 80, 5) + rock(q, -60, 0, 170, 120, 7) + rock(q, 10, 0, 90, 60, 11, "gray"); }, ["rock", "stone"]);
reg("hill", "Hill · grassy", "Nature", [-400, -300, 800, 320], (o) => { const q = Q(o); const d = S([[-380, 0], [-300, -80], [-160, -190], [0, -230], [170, -170], [320, -80], [380, 0], [-380, 0]]);
  return q.sh(d, "grass", { w: "scene", dir: "v" }) + q.hi(S([[-250, -90], [-150, -170], [-30, -200], [-120, -140], [-250, -90]]), "grass", 0.5) + q.tufts(4, 12, -250, -150, 500, 130, "grass"); }, ["hill", "ground", "grass"]);
// mountain: triangle with a lit left face, shaded right face, optional snow cap
const mtn = (q, cx, base, w, h, name, snow, depth = 0) => {
  const L1 = [cx - w / 2, base], A = [cx + w * 0.04, base - h], R1 = [cx + w / 2, base], d = P([L1, [cx - w * 0.22, base - h * 0.55], A, [cx + w * 0.2, base - h * 0.5], R1], true);
  let o = q.sh(d, name, { w: "scene" }) + q.dk(P([A, [cx + w * 0.2, base - h * 0.5], R1, [cx + w * 0.08, base - h * 0.02], [cx + w * 0.03, base - h * 0.45]], true), name, 0.35) + q.hi(P([L1, [cx - w * 0.22, base - h * 0.55], A, [cx - w * 0.1, base - h * 0.5], [cx - w * 0.2, base - h * 0.05]], true), name, 0.4);
  if (snow) { const lm = [cx - w * 0.22, base - h * 0.55], rm = [cx + w * 0.2, base - h * 0.5], pl = (a, b, k) => [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k], pa = pl(A, lm, 0.72), pb = pl(A, rm, 0.66), sy = (pa[1] + pb[1]) / 2;
    o += q.sh(P([A, pa, [pa[0] + w * 0.07, sy + 22], [cx - w * 0.04, sy + 2], [cx + w * 0.02, sy + 26], [cx + w * 0.1, sy + 4], [pb[0] - w * 0.03, sy + 14], pb], true), "snow", { w: "detail" }); }
  return o + (depth ? q.hz(d, depth) : "");
};
const MB = [-300, -440, 600, 460];
reg("mountain-snow", "Mountain · snow cap", "Nature", MB, (o) => { const q = Q(o); return mtn(q, 0, 0, 560, 420, "stone", true); }, ["mountain", "snow", "peak"]);
reg("mountain-rocky", "Mountain · rocky", "Nature", MB, (o) => { const q = Q(o); return mtn(q, 0, 0, 560, 380, "earth", false); }, ["mountain", "rock"]);
reg("mountain-range", "Mountains · range", "Nature", [-480, -440, 960, 460], (o) => { const q = Q(o); return mtn(q, -190, 0, 480, 340, "blue", true) + mtn(q, 200, 0, 520, 300, "purple", true) + mtn(q, 20, 0, 600, 420, "stone", true); }, ["mountain", "range", "snow"]);

// ---------- street / camp furniture ----------
const SBX = [-200, -460, 400, 480];
reg("fence", "Fence · picket", "Street", [-230, -150, 460, 170], (o) => { const q = Q(o); let s = q.shd(0, 0, 440) + q.sh(L.rect(-215, -95, 430, 14), "white", { w: "detail" }) + q.sh(L.rect(-215, -45, 430, 14), "white", { w: "detail" });
  for (let i = 0; i < 8; i++) s += q.sh(P([[-210 + i * 55, 0], [-210 + i * 55, -110], [-196 + i * 55, -128], [-182 + i * 55, -110], [-182 + i * 55, 0]], true), "white", { w: "detail" }); return s; }, ["fence", "garden", "street"]);
reg("signpost", "Signpost", "Street", SBX, (o) => { const q = Q(o); return q.shd(0, 0, 100) + q.sh(R(-9, -330, 18, 330, 6), "wood") + q.sh(P([[-120, -300], [60, -300], [100, -274], [60, -248], [-120, -248]], true), "wood", { tone: 1 }) + q.sh(P([[120, -226], [-50, -226], [-90, -200], [-50, -174], [120, -174]], true), "wood", { tone: 1 })
  + q.line("M-96 -274 h120 M-66 -200 h140", "ink", 0.5) + q.sh(C(0, -340, 10), "gold", { w: "detail" }); }, ["sign", "direction", "street", "camp"]);
reg("bench", "Bench", "Street", [-180, -200, 360, 220], (o) => { const q = Q(o); return q.shd(0, 0, 330) + q.sh(R(-140, -110, 18, 110, 5), "gray", { w: "detail" }) + q.sh(R(122, -110, 18, 110, 5), "gray", { w: "detail" })
  + q.sh(R(-150, -150, 300, 20, 6), "wood", { tone: 1 }) + q.sh(R(-150, -120, 300, 20, 6), "wood", { tone: 1 }) + q.sh(R(-155, -80, 310, 22, 6), "wood") + q.sh(R(-158, -52, 316, 20, 6), "wood", { tone: 1 }); }, ["bench", "park", "street", "seat"]);
const lamp = (q) => {
  const lit = q.night || q.sunset, hy = -300;
  return q.shd(0, 0, 100) + (lit ? q.glow(0, hy + 16, q.night ? 170 : 110, "yellow", q.night ? 0.55 : 0.3) + (q.night ? L.flat(P([[-26, hy + 30], [26, hy + 30], [120, 0], [-120, 0]], true), "yellow", 0.1) : "") : "")
    + q.sh(R(-16, -26, 32, 26, 6), "navy", { w: "detail" }) + q.sh(L.rect(-7, -290, 14, 270), "navy") + q.sh(S([[-7, -290], [-7, -330], [30, -340], [34, -330]]), "navy", { w: "detail" })
    + q.sh(P([[-24, hy], [24, hy], [18, hy + 36], [-18, hy + 36]], true), lit ? "yellow" : "glass", { w: "detail", lit: lit, tone: 1 }) + q.sh(P([[-30, hy], [0, hy - 26], [30, hy]], true), "navy", { w: "detail" });
};
reg2("lamp-post", "Lamp post", "Street", SBX, (o) => lamp(Q(o)), ["lamp", "light", "street", "park"]);
reg("well", "Well", "Street", SBX, (o) => { const q = Q(o); return q.shd(0, 0, 240) + q.sh(R(-100, -130, 200, 130, 14), "stone") + q.line("M-100 -95 h200 M-100 -60 h200 M-50 -130 v35 M30 -95 v35 M-30 -60 v60 M60 -60 v60", "ink", 0.45)
  + q.sh(R(-112, -146, 224, 26, 10), "stone", { tone: 1 }) + q.sh(R(-104, -290, 14, 150, 4), "wood") + q.sh(R(90, -290, 14, 150, 4), "wood") + q.sh(P([[-140, -285], [0, -355], [140, -285]], true), "red") + q.line("M0 -285 V-190", "wood", 1, "prop") + q.sh(R(-18, -200, 36, 34, 6), "wood", { w: "detail" }); }, ["well", "village", "farm"]);
reg2("tent", "Tent", "Nature", SBX, (o) => { const q = Q(o), lit = q.night; return q.shd(0, 0, 340) + (lit ? q.glow(0, -70, 130, "yellow", 0.4) : "") + q.sh(P([[-170, 0], [0, -230], [170, 0]], true), "orange") + q.hi(P([[-150, -10], [-10, -205], [-10, -20]], true), "orange", 0.5) + q.dk(P([[0, -230], [170, 0], [60, 0]], true), "orange", 0.3)
  + q.sh(P([[-50, 0], [0, -130], [50, 0]], true), lit ? "yellow" : "navy", { w: "detail", lit, tone: lit ? 0 : 1 }) + q.line("M0 -230 V-130 M-170 0 l-40 8 M170 0 l40 8", "ink", 0.8, "prop") + q.sh(P([[-3, -240], [40, -258], [40, -238]], true), "red", { w: "hair" }); }, ["tent", "camp", "outdoor"]);
reg2("campfire", "Campfire", "Nature", [-160, -240, 320, 260], (o) => { const q = Q(o);
  const flame = (s, c, t) => q.sh(S([[-34 * s, 0], [-38 * s, -50 * s], [-10 * s, -100 * s], [-4 * s, -150 * s], [18 * s, -92 * s], [40 * s, -58 * s], [36 * s, 0], [-34 * s, 0]]), c, { w: "detail", lit: true, tone: t });
  return q.shd(0, 0, 260) + (q.night ? q.glow(0, -60, 240, "orange", 0.5, 0) : q.sunset ? q.glow(0, -60, 160, "orange", 0.3, 0) : "") + [-1, 1].map((k) => q.sh(L.limb([[k * 90, -10], [-k * 40, -48]], 26, 26), "wood", { w: "detail" })).join("")
    + flame(1.2, "orange", 0) + flame(0.85, "yellow", 0) + flame(0.5, "cream", 0) + [-110, -70, 70, 110].map((x, i) => q.sh(C(x, -8 + (i % 2) * 4, 20, 14), "stone", { w: "detail" })).join(""); }, ["fire", "camp", "light"]);
reg("mailbox", "Mailbox", "Street", SBX, (o) => { const q = Q(o); return q.shd(0, 0, 100) + q.sh(R(-8, -170, 16, 170, 4), "wood") + q.sh(S([[-46, -170], [-46, -230], [-10, -262], [30, -250], [46, -220], [46, -170], [-46, -170]]), "blue") + q.sh(P([[40, -222], [40, -270], [58, -270], [58, -222]], true), "red", { w: "hair" }) + q.sh(R(-30, -196, 40, 8, 3), "navy", { w: "hair" }); }, ["mailbox", "street", "post"]);
reg2("traffic-light", "Traffic light", "Street", SBX, (o) => { const q = Q(o); return q.shd(0, 0, 100) + q.sh(R(-8, -300, 16, 300, 5), "gray") + q.sh(R(-34, -420, 68, 130, 16), "navy")
  + [["red", 0], ["yellow", 1], ["green", 2]].map(([c, i]) => (i === 0 ? q.glow(0, -390, 50, c, 0.5, 0) + q.sh(C(0, -390, 15), c, { w: "hair", lit: true }) : q.sh(C(0, -390 + i * 40, 15), "navy", { w: "hair", tone: 1, lit: true }))).join(""); }, ["traffic", "street", "road"]);

// ---------- buildings ----------
const BB = [-300, -600, 600, 620];
const door = (q, x, w, h, c = "wood") => q.sh(R(x - w / 2, -h, w, h, w * 0.22), c, { w: "detail" }) + q.sh(C(x + w * 0.25, -h * 0.45, 4), "gold", { w: "hair", lit: true });
const flag = (q, x, y, c = "red") => q.line(`M${x} ${y} v-70`, "ink", 1, "prop") + q.sh(P([[x, y - 70], [x + 42, y - 58], [x, y - 44]], true), c, { w: "hair" });
const crenel = (q, x0, x1, y, name, n) => { let d = ""; const s = (x1 - x0) / (n * 2 - 1); for (let i = 0; i < n; i++) d += L.rect(x0 + i * 2 * s, y - 20, s, 20); return q.sh(d, name, { w: "detail" }); };
const BLD = {
  "house-a": (q) => q.shd(0, 0, 400) + q.sh(R(62, -350, 38, 110, 4), "red", { tone: 2, w: "detail" }) + q.sh(R(-150, -200, 300, 200, 8), "wall") + q.dk(R(60, -200, 90, 200, 6), "wall", 0.18)
    + q.sh(P([[-195, -190], [0, -330], [195, -190]], true), "red") + q.dk(P([[0, -330], [195, -190], [0, -190]], true), "red", 0.25) + q.line("M-150 -215 L-70 -272 M-90 -205 L-30 -250 M60 -250 L150 -205 M30 -290 L120 -222", "ink", 0.35)
    + q.wglow(-125, -165, 64, 64) + q.wglow(61, -165, 64, 64) + q.win(-25, -285, 50, 50, true) + q.win(-125, -165, 64, 64, true) + q.win(61, -165, 64, 64, true) + q.sh(R(-132, -108, 78, 14, 4), "wood", { w: "hair" }) + q.sh(R(54, -108, 78, 14, 4), "wood", { w: "hair" })
    + q.wglow(-30, -125, 60, 125) + door(q, 0, 56, 125) + q.sh(R(-44, -10, 88, 10, 3), "stone", { w: "hair" }),
  "house-b": (q) => q.shd(0, 0, 420) + q.sh(R(-170, -130, 340, 130, 6), "paper") + q.sh(R(-110, -258, 260, 130, 6), "wood", { tone: 1 }) + q.sh(R(-126, -272, 292, 16, 4), "gray", { w: "detail" }) + q.sh(R(-186, -142, 372, 14, 4), "gray", { w: "detail" })
    + q.line("M-110 -226 h260 M-110 -196 h260 M-110 -166 h260", "wood", 0.5) + q.wglow(-88, -236, 150, 76) + q.win(-88, -236, 150, 76, true) + q.win(88, -236, 40, 76, false) + q.sh(R(-150, -110, 112, 110, 6), "gray", { w: "detail", tone: 1 }) + q.line("M-150 -82 h112 M-150 -54 h112 M-150 -26 h112", "ink", 0.35)
    + q.wglow(40, -112, 40, 112) + q.sh(R(40, -112, 40, 112, 6), "navy", { w: "detail" }) + q.wglow(104, -100, 56, 56) + q.win(104, -100, 56, 56, true) + q.sh(q.blob(150, -22, 30, 22, 3, 0.2), "green", { w: "detail" }),
  "house-c": (q) => q.shd(0, 0, 360) + q.sh(R(-110, -250, 40, 90, 4), "stone", { w: "detail" }) + q.sh(R(-130, -130, 260, 130, 8), "stone", { tone: 1 }) + q.line("M-130 -90 h260 M-130 -45 h260 M-60 -130 v40 M30 -90 v45 M-20 -45 v45", "ink", 0.3)
    + q.sh(S([[-175, -112], [-110, -200], [0, -245], [110, -200], [175, -112], [140, -126], [90, -112], [40, -126], [-10, -112], [-60, -126], [-110, -112], [-140, -126], [-175, -112]]), "gold") + q.dk(S([[0, -245], [110, -200], [175, -112], [100, -118], [0, -245]]), "gold", 0.25)
    + q.line("M-130 -140 L-100 -190 M-70 -140 L-50 -215 M-10 -140 L0 -230 M50 -140 L50 -222 M110 -140 L100 -185", "ink", 0.3)
    + q.wglow(-24, -90, 48, 90) + q.sh(S([[-24, 0], [-24, -66], [-12, -88], [12, -88], [24, -66], [24, 0], [-24, 0]]), "wood", { w: "detail", tone: 1 }) + q.wglow(60, -100, 44, 46) + q.sh(R(52, -100, 46, 50, 22), q.night ? "yellow" : "glass", { w: "detail", lit: q.night, tone: 1 }) + q.sh(R(40, -100, 12, 50, 3), "green", { w: "hair" }) + q.sh(R(98, -100, 12, 50, 3), "green", { w: "hair" })
    + q.sh(q.blob(-80, -18, 34, 20, 3, 0.2), "pink", { w: "detail" }),
  apartment: (q) => q.shd(0, 0, 320) + q.sh(R(-130, -440, 260, 440, 6), "dusk") + q.dk(R(80, -440, 50, 440, 6), "dusk", 0.2) + q.sh(R(-142, -462, 284, 24, 5), "gray", { w: "detail" }) + q.sh(R(40, -500, 60, 40, 4), "stone", { w: "detail" })
    + q.wins(-96, -412, 3, 6, 50, 46, 22, 20, 21) + [0, 1, 2, 3, 4, 5].map((j) => q.sh(R(-104, -362 + j * 66, 66, 6, 2), "gray", { w: "hair" })).join("")
    + q.wglow(-32, -80, 64, 80) + door(q, 0, 64, 80, "navy") + q.sh(P([[-50, -86], [50, -86], [60, -72], [-60, -72]], true), "red", { w: "detail" }),
  skyscraper: (q) => q.shd(0, 0, 220) + q.sh(R(-72, -640, 144, 640, 8), "blue", { tone: 1, w: "prop" }) + q.dk(R(36, -640, 36, 640, 8), "blue", 0.35) + q.sh(R(-52, -690, 104, 54, 6), "blue", { tone: 1 }) + q.sh(R(-26, -724, 52, 40, 5), "blue") + q.line("M0 -724 V-800", "ink", 1, "prop") + q.glow(0, -800, 22, "red", 0.7, 0) + q.sh(C(0, -802, 7), "red", { w: "hair", lit: true })
    + q.wins(-60, -625, 5, 20, 16, 18, 10, 12, 33, 0.5) + q.hi(R(-60, -630, 14, 620, 5), "blue", 0.35) + q.sh(R(-30, -50, 60, 50, 5), "glass", { w: "detail", lit: q.night, tone: q.night ? 1 : 0 }),
  school: (q) => q.shd(0, 0, 640) + q.sh(R(-290, -150, 150, 150, 4), "yellow") + q.sh(R(140, -150, 150, 150, 4), "yellow") + q.sh(R(-150, -210, 300, 210, 4), "yellow") + q.dk(R(140, -150, 150, 150, 4), "yellow", 0.2)
    + q.sh(R(-300, -166, 170, 18, 3), "red", { w: "detail" }) + q.sh(R(130, -166, 170, 18, 3), "red", { w: "detail" }) + q.sh(R(-160, -226, 320, 18, 3), "red", { w: "detail" })
    + q.sh(R(-40, -330, 80, 120, 4), "yellow", { tone: 1 }) + q.sh(P([[-54, -330], [0, -398], [54, -330]], true), "red") + q.sh(C(0, -276, 26), "white", { w: "detail", tone: 0 }) + q.line("M0 -276 V-296 M0 -276 L14 -268", "ink", 1, "prop") + flag(q, 0, -398)
    + q.wins(-270, -118, 3, 1, 36, 50, 14, 10, 3, 0.7) + q.wins(170, -118, 3, 1, 36, 50, 14, 10, 4, 0.7) + q.wins(-132, -190, 4, 1, 40, 46, 22, 0, 5, 0.7) + q.wins(-132, -122, 1, 1, 40, 56, 0, 0, 7, 0.8) + q.wins(92, -122, 1, 1, 40, 56, 0, 0, 8, 0.8)
    + q.wglow(-38, -110, 76, 110) + q.sh(R(-38, -110, 76, 110, 6), "wood", { w: "detail" }) + q.line("M0 -110 V0", "ink", 0.8) + q.sh(R(-50, -10, 100, 10, 2), "stone", { w: "hair" }),
  hospital: (q) => q.shd(0, 0, 640) + q.sh(R(-300, -190, 132, 190, 4), "paper", { tone: 1 }) + q.sh(R(168, -190, 132, 190, 4), "paper", { tone: 1 }) + q.sh(R(-170, -300, 340, 300, 4), "white") + q.dk(R(168, -190, 132, 190, 4), "white", 0.12)
    + q.sh(R(-170, -140, 340, 14, 2), "teal", { w: "detail" }) + q.sh(R(-56, -382, 112, 82, 10), "teal") + L.shape(P([[-10, -370], [10, -370], [10, -352], [28, -352], [28, -332], [10, -332], [10, -314], [-10, -314], [-10, -332], [-28, -332], [-28, -352], [-10, -352]], true), "white", { w: "detail", flat: true })
    + q.wins(-150, -276, 6, 3, 36, 28, 14, 22, 41, 0.6) + q.wins(-284, -166, 2, 3, 38, 28, 18, 18, 42, 0.6) + q.wins(184, -166, 2, 3, 38, 28, 18, 18, 43, 0.6)
    + q.sh(R(-80, -120, 160, 16, 4), "teal", { w: "detail" }) + q.sh(R(-76, -104, 8, 104, 2), "gray", { w: "hair" }) + q.sh(R(68, -104, 8, 104, 2), "gray", { w: "hair" }) + q.wglow(-60, -100, 120, 100) + q.sh(R(-60, -100, 120, 100, 4), q.night ? "yellow" : "glass", { w: "detail", lit: q.night, tone: 1 }) + q.line("M0 -100 V0", "ink", 0.6),
  office: (q) => q.shd(0, 0, 360) + q.sh(R(-60, -565, 56, 30, 4), "gray", { w: "detail" }) + q.sh(R(26, -560, 44, 25, 4), "gray", { w: "detail" }) + q.sh(R(-150, -540, 300, 540, 5), "teal", { tone: 1 }) + q.dk(R(90, -540, 60, 540, 5), "teal", 0.3)
    + q.wins(-136, -510, 6, 10, 36, 28, 8, 20, 61, 0.5) + q.sh(R(-160, -552, 320, 18, 4), "gray", { w: "detail" }) + q.hi(R(-140, -520, 12, 500, 5), "teal", 0.4) + q.wglow(-70, -80, 140, 80) + q.sh(R(-70, -80, 140, 80, 6), q.night ? "yellow" : "glass", { w: "detail", lit: q.night, tone: 1 }) + q.line("M0 -80 V0", "ink", 0.6) + q.sh(R(-80, -92, 160, 12, 3), "navy", { w: "detail" }),
  shop: (q) => shopFront(q, "SHOP", "red", "orange"),
  cafe: (q) => shopFront(q, "CAFE", "teal", "brown", true),
  barn: (q) => q.shd(0, 0, 470) + q.sh(R(150, -300, 74, 300, 6), "gray", { tone: 1 }) + q.sh(S([[150, -300], [160, -340], [187, -358], [214, -340], [224, -300]]), "gray", { w: "detail" }) + q.line("M150 -240 h74 M150 -180 h74 M150 -120 h74", "ink", 0.35)
    + q.sh(P([[-170, 0], [-170, -140], [-115, -225], [0, -275], [115, -225], [170, -140], [170, 0]], true), "red") + q.dk(P([[0, -275], [115, -225], [170, -140], [170, 0], [60, 0], [60, -200]], true), "red", 0.22) + q.line("M-115 -225 L-170 -140 M115 -225 L170 -140", "white", 0.9, "prop")
    + q.sh(R(-62, -150, 124, 150, 4), "red", { tone: 1, w: "detail" }) + q.line("M-62 -150 L62 0 M62 -150 L-62 0", "white", 0.95, "prop") + q.line("M-62 -150 H62 V0 H-62 Z", "white", 0.95, "prop") + q.wglow(-24, -212, 48, 40) + q.sh(R(-24, -212, 48, 40, 4), q.night ? "yellow" : "navy", { w: "detail", lit: q.night, tone: 1 }),
  windmill: (q, o) => { const a = o.blade === undefined ? 25 : o.blade; let b = ""; for (let k = 0; k < 4; k++) b += L.g(q.sh(R(-4, -190, 8, 190, 2), "wood", { w: "hair" }) + q.sh(R(4, -184, 40, 112, 2), "white", { w: "detail" }) + q.line("M4 -150 h40 M4 -114 h40", "ink", 0.3), `rotate(${a + 90 * k})`);
    return q.shd(0, 0, 220) + q.sh(P([[-70, 0], [-46, -240], [46, -240], [70, 0]], true), "cream") + q.dk(P([[10, 0], [20, -240], [46, -240], [70, 0]], true), "cream", 0.22) + q.line("M-62 -80 h124 M-54 -160 h108", "ink", 0.3)
      + q.sh(S([[-52, -240], [-34, -290], [0, -312], [34, -290], [52, -240], [-52, -240]]), "red") + L.g(b, "translate(0 -262)") + q.sh(C(0, -262, 14), "gray", { w: "detail" }) + q.wglow(-18, -88, 36, 88) + q.sh(S([[-18, 0], [-18, -64], [0, -88], [18, -64], [18, 0], [-18, 0]]), "wood", { w: "detail" }) + q.win(-14, -190, 28, 34, true); },
  castle: (q) => q.shd(0, 0, 560) + q.sh(R(-220, -140, 440, 140, 4), "stone", { tone: 1 }) + crenel(q, -220, 220, -140, "stone", 9) + q.line("M-220 -100 h440 M-180 -60 h360 M-100 -140 v40 M60 -100 v40 M-40 -60 v60", "ink", 0.3)
    + [-1, 1].map((k) => q.sh(R(k * 235 - 40, -260, 80, 260, 4), "stone") + crenel(q, k * 235 - 46, k * 235 + 46, -260, "stone", 4) + q.wglow(k * 235 - 6, -180, 12, 36) + q.sh(R(k * 235 - 6, -180, 12, 36, 6), q.night ? "yellow" : "navy", { w: "hair", lit: q.night, tone: 1 })).join("")
    + q.sh(R(-100, -330, 200, 330, 4), "stone", { tone: 0 }) + q.dk(R(40, -330, 60, 330, 4), "stone", 0.25) + crenel(q, -108, 108, -330, "stone", 6) + q.sh(R(-44, -440, 88, 120, 4), "stone") + q.sh(P([[-58, -440], [0, -520], [58, -440]], true), "blue") + flag(q, 0, -520)
    + q.wglow(-8, -400, 16, 40) + q.sh(R(-8, -400, 16, 40, 8), q.night ? "yellow" : "navy", { w: "hair", lit: q.night, tone: 1 }) + q.wglow(-8, -290, 16, 40) + q.sh(R(-8, -290, 16, 40, 8), q.night ? "yellow" : "navy", { w: "hair", lit: q.night, tone: 1 })
    + q.sh(S([[-34, 0], [-34, -80], [-18, -108], [0, -116], [18, -108], [34, -80], [34, 0], [-34, 0]]), "wood", { w: "detail" }) + q.line("M0 -116 V0 M-34 -50 h68", "ink", 0.7) + [-1, 1].map((k) => q.sh(P([[k * 235 - 54, -260], [k * 235, -330], [k * 235 + 54, -260]], true), "blue") + flag(q, k * 235, -330, "yellow")).join(""),
  monument: (q) => q.shd(0, 0, 440) + q.sh(R(-210, -30, 420, 30, 3), "sand") + q.sh(R(-186, -60, 372, 30, 3), "sand", { tone: 1 }) + q.sh(R(-162, -90, 324, 30, 3), "sand")
    + [0, 1, 2, 3, 4, 5].map((i) => { const x = -125 + i * 50; return q.sh(R(x - 12, -250, 24, 160, 3), "cream", { w: "detail" }) + q.sh(R(x - 17, -262, 34, 12, 3), "sand", { w: "detail" }) + q.dk(R(x + 3, -250, 9, 160, 2), "cream", 0.3); }).join("")
    + q.sh(R(-176, -290, 352, 30, 3), "sand", { tone: 1 }) + q.sh(P([[-196, -290], [0, -390], [196, -290]], true), "sand") + q.dk(P([[0, -390], [196, -290], [0, -290]], true), "sand", 0.2) + q.sh(C(0, -318, 22), "gold", { w: "detail" }) + q.sh(P([[-20, -392], [0, -420], [20, -392]], true), "gold", { w: "detail" }),
  lighthouse: (q) => { let t = ""; for (let i = 0; i < 6; i++) { const y0 = -i * 63, y1 = -(i + 1) * 63, w0 = 58 - i * 3.4, w1 = 58 - (i + 1) * 3.4; t += q.sh(P([[-w0, y0], [-w1, y1], [w1, y1], [w0, y0]], true), i % 2 ? "white" : "red", { w: "detail" }); }
    const beam = q.night ? L.flat(P([[0, -436], [-300, -520], [-300, -352]], true), "yellow", 0.22) + L.flat(P([[0, -436], [300, -520], [300, -352]], true), "yellow", 0.22) + q.glow(0, -436, 120, "yellow", 0.6) : q.sunset ? q.glow(0, -436, 70, "yellow", 0.35) : "";
    return q.shd(0, 0, 260) + beam + t + q.sh(R(-68, -392, 136, 16, 4), "gray", { w: "detail" }) + q.line("M-64 -392 v-26 M64 -392 v-26 M-64 -418 h128", "ink", 1, "prop") + q.sh(R(-34, -470, 68, 78, 6), q.night || q.sunset ? "yellow" : "glass", { w: "detail", lit: q.night || q.sunset, tone: 1 }) + q.line("M0 -470 V-392", "ink", 0.6) + q.sh(S([[-46, -468], [0, -520], [46, -468], [-46, -468]]), "red") + q.sh(C(0, -526, 7), "gold", { w: "hair" })
      + door(q, 0, 28, 52) + rock(q, -80, 2, 120, 60, 5) + rock(q, 85, 2, 100, 50, 9); },
  igloo: (q) => { const dome = "M-150 0 A150 135 0 0 1 150 0 Z"; return q.shd(0, 0, 360) + q.sh(dome, "snow") + q.clip(dome, q.line("M-150 -45 Q0 -20 150 -45 M-135 -90 Q0 -62 135 -90 M-100 -125 Q0 -102 100 -125 M-50 -45 v-45 M50 -45 v-45 M-100 -90 v-35 M0 -90 v-35 M100 -90 v-35 M-25 -125 v-10 M25 -125 v-10", "gray", 0.7)) + q.dk(S([[30, -128], [110, -90], [150, 0], [40, 0]]), "snow", 0.25)
    + q.sh(S([[40, 0], [40, -50], [60, -76], [150, -76], [190, -50], [190, 0], [40, 0]]), "snow", { tone: 0 }) + q.wglow(100, -52, 70, 52) + q.sh(S([[78, 0], [78, -34], [100, -50], [128, -34], [128, 0], [78, 0]]), q.night ? "yellow" : "navy", { w: "detail", lit: q.night, tone: 1 }); },
  hut: (q) => q.shd(0, 0, 340) + q.sh(R(-100, -110, 200, 110, 10), "earth") + q.dk(R(40, -110, 60, 110, 8), "earth", 0.25) + q.line("M-100 -70 h200 M-60 -110 v40 M0 -70 v70 M50 -110 v40", "ink", 0.3)
    + q.sh(S([[-140, -98], [-80, -180], [0, -245], [80, -180], [140, -98], [100, -112], [50, -98], [0, -112], [-50, -98], [-100, -112], [-140, -98]]), "gold", { tone: 1 }) + q.dk(S([[0, -245], [80, -180], [140, -98], [70, -110], [0, -245]]), "gold", 0.25) + q.line("M-90 -125 L-60 -178 M-40 -118 L-20 -210 M20 -118 L20 -215 M70 -122 L60 -176", "ink", 0.3)
    + q.wglow(-24, -88, 48, 88) + q.sh(S([[-24, 0], [-24, -62], [-12, -88], [12, -88], [24, -62], [24, 0], [-24, 0]]), "wood", { w: "detail", tone: 1 }) + q.wglow(52, -88, 34, 34) + q.sh(C(70, -70, 17), q.night ? "yellow" : "navy", { w: "detail", lit: q.night, tone: 1 }),
};
// shop / café front: awning, window, sign. cafe adds outdoor tables
function shopFront(q, word, awn, signC, cafe) {
  let aw = ""; for (let i = 0; i < 8; i++) { const x0 = -176 + i * 44, x1 = x0 + 44; aw += q.sh(`M${x0} -168 H${x1} L${x1 + 4} -128 Q${(x0 + x1) / 2 + 2} -110 ${x0 + 4 - 4} -128 Z`, i % 2 ? "white" : awn, { w: "detail" }); }
  let o = q.shd(0, 0, 420) + q.sh(R(-170, -230, 340, 230, 6), cafe ? "cream" : "wall") + q.dk(R(110, -230, 60, 230, 6), cafe ? "cream" : "wall", 0.2) + q.sh(R(-120, -290, 240, 62, 8), signC) + q.sh(R(-180, -240, 360, 14, 3), "gray", { w: "detail" }) + q.raw(() => L.text(word, 0, -246, { size: 40, c: "white", halo: "ink", haloW: 0.1 }))
    + q.wglow(-148, -124, 150, 94) + q.sh(R(-148, -124, 150, 94, 8), q.night ? "yellow" : "glass", { w: "detail", lit: q.night, tone: 1 }) + (q.night ? "" : q.hi(P([[-136, -50], [-136, -90], [-92, -118], [-70, -118]], true), "white", 0.6)) + q.wglow(40, -124, 70, 124) + q.sh(R(40, -124, 70, 124, 6), q.night ? "yellow" : "glass", { w: "detail", lit: q.night, tone: 1 }) + q.line("M75 -124 V0", "ink", 0.7) + aw;
  return o;
}
BLD.cafe = (q) => { const base = shopFront(q, "CAFE", "teal", "brown", true); let t = ""; [[-140, 1], [180, -1]].forEach(([x, k]) => { t += q.sh(R(x - 3, -56, 6, 56, 2), "wood", { w: "hair" }) + q.sh(P([[x - 30, -58], [x + 30, -58], [x + 26, -66], [x - 26, -66]], true), "red", { w: "detail" }) + q.sh(R(x + k * 36 - 10, -36, 20, 6, 2), "wood", { w: "hair" }) + q.sh(R(x + k * 36 - 8, -30, 4, 30, 1), "wood", { w: "hair" }); }); return base + t; };
const bldNames = { "house-a": ["House · gable", ["house", "home"]], "house-b": ["House · modern", ["house", "home", "modern"]], "house-c": ["House · cottage", ["house", "home", "cottage"]], apartment: ["Apartment block", ["apartment", "city", "flats"]], skyscraper: ["Skyscraper", ["tower", "city", "tall"]], school: ["School", ["school", "education"]],
  hospital: ["Hospital", ["hospital", "medical", "health"]], office: ["Office building", ["office", "work", "business"]], shop: ["Shop", ["shop", "store", "market"]], cafe: ["Café", ["cafe", "coffee", "restaurant"]], barn: ["Farm barn", ["farm", "barn", "silo"]], windmill: ["Windmill", ["windmill", "farm", "wind"]],
  castle: ["Castle", ["castle", "medieval", "king"]], monument: ["Monument · temple", ["temple", "ancient", "monument"]], lighthouse: ["Lighthouse", ["lighthouse", "sea", "coast"]], igloo: ["Igloo", ["igloo", "snow", "arctic"]], hut: ["Hut · thatched", ["hut", "village", "tribal"]] };
Object.keys(BLD).forEach((k) => {
  const tall = k === "skyscraper" ? [-170, -840, 340, 860] : k === "lighthouse" ? [-300, -560, 600, 580] : k === "castle" ? [-320, -540, 640, 560] : k === "school" || k === "hospital" ? [-330, -420, 660, 440] : k === "office" ? [-190, -600, 380, 620] : k === "apartment" ? [-190, -520, 380, 540] : k === "igloo" ? [-220, -220, 440, 240] : k === "hut" ? [-190, -290, 380, 310] : [-250, -420, 500, 440];
  reg2("bld-" + k, bldNames[k][0], "Buildings", tall, (o) => BLD[k](Q(o), o), ["building", ...bldNames[k][1]]);
});

// ---------- scenes (1920 x 1080; ground line ~ y 860; keep x 640-1280 / y > 700 calm for characters) ----------
const TIMES = ["day", "sunset", "night"];
const scene = (key, label, tags, build, times = TIMES) => times.forEach((t) => L.reg("scenery", `scene-${key}-${t}`, (o) => withTime((o2) => build(Q(o2)))(Object.assign({}, o, { time: t })), {
  box: [0, 0, 1920, 1080], group: "Places", label: `${label} · ${t}`, tags: ["scenery", "scene", "background", ...tags, t], call: `L.put(S, "scene-${key}-${t}", 0, 0)`, demo: {}, wide: true }));
const place = (q, list) => list.map(([n, x, y, s, p]) => q.at(n, x, y, s || 1, p)).join("");
// haze band: transparent at the top, haze colour at the bottom (fades far layers into distance)
const fog = (q, y0, y1, op = 0.6) => { const id = gid("fg"), col = L.c(q.K.haze[0], q.K.haze[1]); return `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${col}" stop-opacity="0"/><stop offset="1" stop-color="${col}" stop-opacity="${op}"/></linearGradient></defs>${L.tag("rect", { x: 0, y: y0, width: 1920, height: y1 - y0, fill: `url(#${id})` })}`; };
// soft shafts of sun / moon light from the top left
const rays = (q, n = 5, x0 = 150, step = 330, len = 760) => {
  const c = q.night ? ["glass", 0.09] : q.sunset ? ["orange", 0.16] : ["yellow", 0.16]; let o = "";
  for (let i = 0; i < n; i++) { const x = x0 + i * step + (i % 2) * 40; o += L.flat(P([[x, 0], [x + 60 + (i % 3) * 20, 0], [x + 380, len], [x + 250, len]], true), c[0], c[1]); } return o;
};
const fireflies = (q, seed, n, x0, y0, w, h) => !q.night ? "" : rgn(seed, n, x0, y0, w, h).map(([x, y, k]) => q.glow(x, y, 16 + k * 10, "yellow", 0.8, 1) + L.flat(C(x, y, 3), "yellow", 1)).join("");
const waveLine = (y, amp, seed, x0 = -60, x1 = 1980, step = 110) => { const r = L.rng(seed), pts = []; for (let x = x0; x <= x1; x += step) pts.push([x, y + (r() - 0.5) * amp * 2]); return S(pts); };
// procedural city skyline layer. names = fill colours. win: draw window grids
const skyline = (q, seed, base, h0, h1, depth, names, win, wmin = 70, wmax = 150) => {
  const r = L.rng(seed); let x = -30, all = "", o = "";
  while (x < 1950) {
    const w = wmin + r() * (wmax - wmin), h = h0 + r() * (h1 - h0), nm = names[Math.floor(r() * names.length)], cols = Math.max(1, Math.floor((w - 14) / 24)), rows = Math.max(1, Math.floor((h - 40) / 36)), d = P([[x, base], [x, base - h], [x + w, base - h], [x + w, base]], true);
    o += q.sh(d, nm, { w: "detail", tone: 1 }) + (win ? q.wins(x + (w - cols * 24 + 12) / 2, base - h + 18, cols, rows, 12, 18, 12, 18, Math.floor(r() * 1e5), 0.5) : "") + (r() < 0.45 ? q.line(`M${f1(x + w / 2)} ${f1(base - h)} v-34`, "ink", 0.9, "detail") : "");
    all += d; x += w + r() * 10;
  }
  return o + q.hz(all, depth);
};
const pave = (q, y0, name = "stone", tone = 1) => q.sh(P([[-20, y0], [1940, y0], [1940, 1100], [-20, 1100]], true), name, { w: "scene", dir: "v", tone });
const strip = (q, y0, y1, name, tone = 1) => q.sh(P([[-20, y0], [1940, y0], [1940, y1], [-20, y1]], true), name, { w: "scene", tone });
const dashes = (y, c = "white", op = 0.85) => L.flat(Array.from({ length: 9 }, (_, i) => L.rect(40 + i * 220, y, 120, 14)).join(""), c, op);
// the calm middle: nothing tall between x 640 and 1280 near the ground

scene("park", "Park", ["park", "trees", "grass", "bench"], (q) => q.sky(640) + q.ridge(3, 660, 80, "green", 0.75, { tone: 1 }) + q.ridge(8, 705, 45, "grass", 0.4) + q.ground(722, "grass") + q.tufts(2, 70, 0, 745, 1920, 330)
  + q.sh(P([[900, 724], [1020, 724], [1580, 1090], [340, 1090]], true), "sand", { w: "scene" }) + q.line("M900 724 L340 1090 M1020 724 L1580 1090", "ink", 0.25, "scene")
  + place(q, [["tree-round", 110, 738, 0.4], ["tree-round", 300, 735, 0.34], ["tree-blossom", 520, 740, 0.4], ["tree-round", 1440, 738, 0.38], ["tree-round", 1640, 735, 0.42], ["tree-round", 1830, 740, 0.4],
    ["fence", 660, 748, 0.8], ["fence", 1260, 748, 0.8, { flip: 1 }], ["tree-blossom", 250, 840, 0.85], ["tree-oak", 1660, 830, 0.8], ["lamp-post", 560, 810, 0.9], ["lamp-post", 1370, 810, 0.9], ["bush-round", 410, 835, 0.7], ["bench", 1500, 880, 0.75],
    ["bush-round", 1810, 880, 0.7], ["flowers-daisy", 210, 1010, 1.1], ["flowers-tulips", 1720, 1030, 1.1], ["tree-round", 40, 1075, 1.25], ["tree-oak", 1890, 1085, 1.2], ["bush-berry", 520, 1030, 0.9]]) + fireflies(q, 4, 14, 100, 700, 1700, 330));

scene("city-street", "City street", ["city", "street", "road", "sidewalk"], (q) => q.sky(620) + skyline(q, 11, 700, 150, 330, 0.65, ["blue", "gray", "purple"], q.night) + skyline(q, 12, 750, 100, 250, 0.4, ["gray", "teal", "dusk"], q.night)
  + place(q, [["bld-apartment", 150, 800, 0.95], ["bld-shop", 470, 800, 0.9], ["bld-cafe", 1450, 800, 0.9], ["bld-office", 1735, 800, 0.78], ["bld-skyscraper", 1130, 760, 0.5]])
  + strip(q, 800, 905, "stone", 1) + q.line("M-20 905 H1940", "ink", 0.7, "scene") + strip(q, 905, 1100, "gray", 2) + dashes(1000) + L.flat(L.rect(-20, 905, 1960, 10), "white", 0.5)
  + place(q, [["lamp-post", 600, 880, 1], ["lamp-post", 1330, 880, 1], ["traffic-light", 1240, 900, 0.9], ["mailbox", 300, 890, 0.75], ["bench", 1600, 900, 0.7], ["tree-round", 800, 800, 0.3, { flip: 1 }]]));

scene("city-skyline", "City skyline", ["city", "skyline", "downtown", "river"], (q) => q.sky(560) + skyline(q, 21, 700, 200, 420, 0.7, ["blue", "gray", "purple"], q.night, 60, 120) + skyline(q, 22, 740, 140, 330, 0.45, ["teal", "blue", "gray"], q.night, 70, 140)
  + place(q, [["bld-skyscraper", 200, 780, 0.8], ["bld-office", 500, 780, 0.8], ["bld-skyscraper", 1730, 780, 0.85], ["bld-apartment", 1500, 780, 0.8], ["bld-skyscraper", 1230, 770, 0.55]])
  + strip(q, 740, 830, "water", 0) + L.flat(Array.from({ length: 14 }, (_, i) => L.rect(60 + i * 140, 760 + (i % 3) * 22, 80, 4)).join(""), q.night ? "yellow" : "white", q.night ? 0.5 : 0.45) + q.sh(P([[-20, 830], [1940, 830], [1940, 1100], [-20, 1100]], true), "stone", { w: "scene", dir: "v", tone: 1 })
  + q.sh(P([[-20, 826], [1940, 826], [1940, 842], [-20, 842]], true), "gray", { w: "detail" }) + q.line(Array.from({ length: 24 }, (_, i) => `M${40 + i * 80} 826 v-30`).join("") + "M-20 796 H1940", "ink", 0.8, "detail")
  + place(q, [["lamp-post", 420, 900, 1], ["lamp-post", 1500, 900, 1], ["bench", 1700, 960, 0.9], ["tree-round", 160, 960, 0.6]]));

scene("suburb", "Suburb street", ["suburb", "houses", "lawn", "street"], (q) => q.sky(640) + q.ridge(5, 650, 70, "green", 0.7, { tone: 1 }) + place(q, [["tree-round", 700, 740, 0.4], ["tree-oak", 1250, 742, 0.4], ["tree-pine", 960, 742, 0.35]])
  + q.ground(740, "grass") + q.tufts(6, 50, 0, 760, 1920, 100) + place(q, [["bld-house-a", 230, 800, 1.35], ["bld-house-c", 800, 772, 0.8], ["bld-house-b", 1400, 800, 1.3], ["bld-house-a", 1790, 790, 1.15, { flip: 1 }], ["tree-round", 520, 830, 0.8], ["tree-blossom", 1100, 800, 0.6], ["fence", 150, 845, 0.9], ["fence", 1800, 845, 0.9], ["bush-round", 950, 790, 0.5], ["bush-berry", 1230, 810, 0.55]])
  + strip(q, 862, 915, "stone", 1) + q.line("M-20 862 H1940", "ink", 0.7, "scene") + strip(q, 915, 1100, "gray", 2) + dashes(1010, "yellow", 0.8) + place(q, [["mailbox", 400, 868, 0.7], ["lamp-post", 1180, 870, 0.85], ["flowers-daisy", 120, 1010, 0.9], ["bush-round", 1830, 1010, 0.9]]));

scene("school-yard", "School yard", ["school", "playground", "education"], (q) => q.sky(620) + q.ridge(7, 640, 60, "green", 0.7, { tone: 1 }) + q.ground(720, "grass") + q.tufts(8, 50, 0, 740, 1920, 120)
  + place(q, [["bld-school", 960, 760, 1.45]]) + q.sh(P([[250, 782], [1670, 782], [1900, 1090], [20, 1090]], true), "gray", { w: "scene", tone: 1 })
  + q.line("M300 1040 H1620 M960 800 V1040 M520 800 L420 1040 M1400 800 L1500 1040", "white", 0.7, "scene")
  + place(q, [["fence", 110, 745, 0.8], ["fence", 360, 745, 0.8], ["fence", 1570, 745, 0.8], ["fence", 1810, 745, 0.8], ["tree-round", 90, 800, 0.9], ["tree-oak", 1830, 800, 0.85], ["bush-round", 560, 800, 0.6], ["bush-round", 1380, 800, 0.6], ["bench", 320, 880, 0.7], ["flowers-tulips", 1650, 1000, 0.9], ["tree-round", 70, 1075, 1.1]])
  + q.line("M1290 770 V560", "ink", 1, "prop") + q.sh(P([[1290, 566], [1360, 582], [1290, 604]], true), "red", { w: "hair" }) + q.line("M1700 900 V690", "gray", 1, "prop") + q.sh(R(1668, 640, 62, 46, 4), "white", { w: "detail" }) + q.line("M1678 690 q22 24 42 0", "orange", 1, "prop") + fireflies(q, 8, 8, 100, 650, 1700, 300));

scene("hospital-front", "Hospital front", ["hospital", "medical", "entrance"], (q) => q.sky(620) + q.ridge(4, 640, 60, "green", 0.7, { tone: 1 }) + q.ground(720, "grass") + q.tufts(3, 50, 0, 740, 1920, 120)
  + place(q, [["bld-hospital", 960, 750, 1.45]]) + q.sh(P([[800, 752], [1120, 752], [1560, 1090], [360, 1090]], true), "stone", { w: "scene", tone: 1 }) + q.line("M800 752 L360 1090 M1120 752 L1560 1090", "ink", 0.3, "scene")
  + place(q, [["tree-round", 140, 800, 0.95], ["tree-oak", 1790, 800, 0.9], ["hedge", 480, 790, 0.9], ["hedge", 1440, 790, 0.9], ["lamp-post", 640, 830, 0.9], ["lamp-post", 1290, 830, 0.9], ["bench", 330, 900, 0.75], ["bench", 1620, 900, 0.75, { flip: 1 }], ["flowers-daisy", 150, 1020, 1.0], ["flowers-tulips", 1780, 1030, 1.0], ["bush-round", 860, 760, 0.45], ["bush-round", 1060, 760, 0.45]]));

scene("office-district", "Office district", ["office", "business", "downtown", "plaza"], (q) => q.sky(580) + skyline(q, 31, 700, 240, 470, 0.7, ["blue", "gray", "teal"], q.night, 70, 130) + skyline(q, 32, 750, 180, 380, 0.45, ["gray", "teal", "blue"], q.night, 80, 150)
  + place(q, [["bld-office", 170, 800, 0.95], ["bld-skyscraper", 480, 790, 0.95], ["bld-skyscraper", 1450, 790, 1.0], ["bld-office", 1750, 800, 0.9], ["bld-apartment", 1190, 770, 0.55]])
  + q.sh(P([[-20, 800], [1940, 800], [1940, 1100], [-20, 1100]], true), "stone", { w: "scene", dir: "v", tone: 1 }) + q.line("M-20 900 H1940 M-20 990 H1940 M300 800 L100 1090 M700 800 L580 1090 M1220 800 L1340 1090 M1620 800 L1820 1090", "ink", 0.18, "detail")
  + place(q, [["lamp-post", 640, 880, 0.95], ["lamp-post", 1290, 880, 0.95], ["bush-round", 330, 880, 0.7], ["bush-round", 1560, 880, 0.7], ["tree-round", 220, 900, 0.5], ["tree-round", 1700, 900, 0.5], ["bench", 1460, 1010, 0.8], ["bush-round", 130, 1030, 0.9]]));

scene("shopping-street", "Shopping street", ["shops", "street", "market", "town"], (q) => {
  const bunt = (x0, x1, y) => { let o = L.stroke(`M${x0} ${y} Q${(x0 + x1) / 2} ${y + 60} ${x1} ${y}`, { c: "ink", w: "detail", op: 0.7 }); for (let i = 1; i < 8; i++) { const t = i / 8, x = x0 + (x1 - x0) * t, yy = y + 60 * 2 * t * (1 - t); o += q.night ? q.glow(x, yy + 8, 22, "yellow", 0.8, 1) + L.flat(C(x, yy + 8, 6), "yellow", 1) : q.sh(P([[x - 14, yy], [x + 14, yy], [x, yy + 28]], true), ["red", "yellow", "blue", "green"][i % 4], { w: "hair" }); } return o; };
  return q.sky(620) + skyline(q, 41, 720, 120, 260, 0.6, ["gray", "dusk", "teal"], q.night) + place(q, [["bld-apartment", 960, 780, 0.6], ["bld-shop", 170, 800, 1.05], ["bld-cafe", 560, 800, 0.95], ["bld-shop", 1380, 800, 1.0], ["bld-cafe", 1740, 800, 0.95]])
    + strip(q, 800, 920, "stone", 1) + q.line("M-20 920 H1940", "ink", 0.7, "scene") + strip(q, 920, 1100, "gray", 2) + dashes(1010) + bunt(640, 1290, 560) + bunt(1290, 1600, 600)
    + place(q, [["lamp-post", 380, 890, 1], ["lamp-post", 1540, 890, 1], ["tree-round", 880, 820, 0.38], ["tree-round", 1060, 820, 0.38], ["bench", 1220, 905, 0.65], ["mailbox", 760, 900, 0.7]]);
});

// ---------- scene helpers (nature) ----------
const scene1 = (key, label, tags, build) => L.reg("scenery", `scene-${key}`, (o) => withTime((o2) => build(Q(o2)))(Object.assign({}, o, { time: "day" })), {
  box: [0, 0, 1920, 1080], group: "Places", label, tags: ["scenery", "scene", "background", ...tags], call: `L.put(S, "scene-${key}", 0, 0)`, demo: {}, wide: true });
const hay = (q, x, y, s = 1) => L.g(q.shd(0, 0, 150) + q.sh(R(-62, -80, 124, 80, 40), "gold", { tone: 1 }) + q.line("M-40 -70 V-10 M-12 -78 V-2 M18 -78 V-2 M44 -68 V-10", "ink", 0.35) + q.hi(R(-48, -72, 40, 16, 8), "gold", 0.6), `translate(${x} ${y}) scale(${s})`);
const bigLeaf = (q, x, y, len, ang, name = "green", tone = 0) => {
  const r = ang * Math.PI / 180, dx = Math.cos(r), dy = Math.sin(r), px = -dy, py = dx, w = len * 0.2, tip = [x + dx * len, y + dy * len];
  const m1 = [x + dx * len * 0.35 + px * w, y + dy * len * 0.35 + py * w], m2 = [x + dx * len * 0.7 + px * w * 0.7, y + dy * len * 0.7 + py * w * 0.7], n1 = [x + dx * len * 0.35 - px * w, y + dy * len * 0.35 - py * w], n2 = [x + dx * len * 0.7 - px * w * 0.7, y + dy * len * 0.7 - py * w * 0.7];
  return q.sh(S([[x, y], m1, m2, tip, n2, n1, [x, y]]), name, { tone, w: "detail" }) + q.line(L.line([x, y], tip), L.c(name, 2), 0.6);
};
const mushroom = (q, x, y, s = 1) => L.g(q.shd(0, 0, 70) + q.sh(R(-9, -36, 18, 36, 7), "cream", { w: "detail" }) + q.sh(S([[-34, -34], [-28, -62], [0, -76], [28, -62], [34, -34], [-34, -34]]), "red", { w: "detail" }) + L.flat(C(-12, -56, 5) + C(10, -62, 4.4) + C(18, -46, 3.6), "white", 0.95), `translate(${x} ${y}) scale(${s})`);
const snowman = (q, x, y, s = 1) => L.g(q.shd(0, 0, 130) + q.line("M-30 -118 L-76 -146 M30 -118 L76 -150", "wood", 1, "prop") + q.sh(C(0, -46, 46), "snow") + q.sh(C(0, -118, 35), "snow") + q.sh(C(0, -172, 27), "snow")
  + q.sh(S([[-18, -193], [-14, -226], [14, -226], [18, -193], [-18, -193]]), "navy", { w: "detail" }) + q.sh(R(-26, -196, 52, 8, 3), "navy", { w: "detail" }) + q.sh(P([[-24, -146], [24, -146], [22, -134], [-22, -134]], true), "red", { w: "detail" }) + q.sh(P([[0, -172], [30, -168], [0, -164]], true), "orange", { w: "hair" })
  + L.flat(C(-9, -180, 3) + C(9, -180, 3) + C(0, -118, 4) + C(0, -100, 4) + C(0, -82, 4), "ink", 0.9), `translate(${x} ${y}) scale(${s})`);
const mesa = (q, cx, base, w, h, depth) => { const d = P([[cx - w / 2, base], [cx - w / 2 + 24, base - h * 0.72], [cx - w / 2 + 50, base - h], [cx + w / 2 - 50, base - h], [cx + w / 2 - 22, base - h * 0.74], [cx + w / 2, base]], true);
  return q.sh(d, "orange", { w: "scene", tone: 1 }) + q.dk(P([[cx + w * 0.15, base - h], [cx + w / 2 - 50, base - h], [cx + w / 2 - 22, base - h * 0.74], [cx + w / 2, base], [cx + w * 0.1, base]], true), "orange", 0.35) + L.flat(L.rect(cx - w / 2, base - h * 0.55, w, h * 0.1) + L.rect(cx - w / 2, base - h * 0.28, w, h * 0.1), "red", 0.22) + q.hz(d, depth); };
const sandRipples = (q, seed, n, x0, y0, w, h) => { const r = L.rng(seed); let d = ""; for (let i = 0; i < n; i++) { const x = x0 + r() * w, y = y0 + r() * h, l = 40 + r() * 60; d += `M${f1(x)} ${f1(y)} q${f1(l / 2)} -9 ${f1(l)} 0`; } return L.stroke(d, { c: L.c("sand", 2), w: "detail", op: 0.55 }); };
const reflection = (q, cx, y0) => q.raw(() => L.flat(Array.from({ length: 8 }, (_, i) => L.rect(cx - 20 - i * 12, y0 + i * 20, 40 + i * 24, 6)).join(""), q.night ? "glass" : q.sunset ? "yellow" : "white", q.night ? 0.55 : 0.6));

scene("farm", "Farm", ["farm", "barn", "field", "countryside"], (q) => {
  let rows = ""; for (let i = 0; i < 10; i++) rows += `M${1090 + i * 80} 738 L${1380 + i * 190} 1092 `;
  return q.sky(620) + q.ridge(13, 645, 90, "green", 0.7, { tone: 1 }) + q.ridge(17, 695, 55, "grass", 0.45) + q.ground(732, "grass") + q.tufts(14, 50, 0, 750, 1000, 330)
    + q.sh(P([[1090, 736], [1920, 736], [1920, 1092], [1380, 1092]], true), "earth", { w: "scene", tone: 1 }) + L.stroke(rows, { c: "green", w: "prop", op: 0.85 })
    + q.sh(P([[890, 736], [1010, 736], [1240, 1092], [620, 1092]], true), "earth", { w: "scene" }) + q.line("M890 736 L620 1092 M1010 736 L1240 1092", "ink", 0.25, "scene")
    + place(q, [["bld-barn", 330, 800, 1.05], ["tree-oak", 640, 772, 0.7], ["bld-windmill", 1400, 748, 0.8], ["tree-round", 1790, 742, 0.45], ["tree-round", 1960, 742, 0.45], ["fence", 140, 880, 0.9], ["fence", 450, 880, 0.9], ["bush-round", 1040, 760, 0.35], ["flowers-daisy", 150, 1040, 1.0], ["flowers-tulips", 640, 1050, 0.8]])
    + hay(q, 520, 905, 1) + hay(q, 600, 925, 0.85);
});

scene("beach", "Beach", ["beach", "sea", "sand", "palm", "coast"], (q) => {
  const sx = q.sunset ? 440 : 1480, shore = waveLine(742, 7, 3), foam = waveLine(734, 7, 3);
  return q.sky(560) + q.sh(P([[-20, 560], [1940, 560], [1940, 760], [-20, 760]], true), "water", { w: "scene", dir: "v", tone: 0 }) + q.line("M-20 560 H1940", "white", 0.6, "scene") + q.line(Array.from({ length: 16 }, (_, i) => `M${60 + i * 120} ${600 + (i * 37) % 130} h60`).join(""), "white", 0.5, "detail")
    + reflection(q, sx, 570) + place(q, [["bld-lighthouse", 1240, 655, 0.36]])
    + q.sh(`${shore} L1980 1100 L-60 1100 Z`, "sand", { w: "scene", dir: "v" }) + q.sh(`${foam} L1980 758 L-60 758 Z`, "white", { w: "detail" })
    + sandRipples(q, 5, 30, 0, 790, 1920, 280) + place(q, [["tree-palm", 170, 890, 1.15], ["tree-palm", 1760, 910, 1.2, { flip: 1 }], ["tree-palm", 1520, 800, 0.55], ["rock-pile", 1400, 840, 0.6], ["bush-round", 380, 790, 0.5]])
    + L.g(q.line("M0 0 V-250", "ink", 1, "prop") + q.sh(S([[-130, -240], [-90, -310], [0, -340], [90, -310], [130, -240], [96, -254], [64, -240], [32, -254], [0, -240], [-32, -254], [-64, -240], [-96, -254], [-130, -240]]), "red") + q.sh(P([[0, -340], [-34, -246], [-30, -244], [0, -250]], true), "white", { w: "hair" }) + q.sh(P([[0, -340], [66, -266], [90, -246], [32, -254]], true), "white", { w: "hair" }) + q.shd(0, 0, 80), "translate(560 880)")
    + L.shape(L.star(300, 1000, 28, 12, 5), "orange", { w: "detail" }) + L.shape(L.star(1640, 1010, 22, 10, 5), "pink", { w: "detail" }) + L.shape(C(900, 1040, 12, 9), "cream", { w: "hair" }) + L.shape(C(1260, 1020, 10, 7), "pink", { w: "hair" });
});

scene("desert", "Desert", ["desert", "dunes", "cactus", "sand"], (q) => q.sky(580, { r: q.sunset ? 110 : 74 }) + mesa(q, 300, 700, 380, 170, 0.55) + mesa(q, 1450, 700, 520, 230, 0.5) + mesa(q, 1800, 700, 300, 140, 0.6)
  + q.ridge(21, 735, 70, "sand", 0.4, { tone: 1 }) + q.ridge(24, 770, 45, "sand", 0.2) + q.ground(800, "sand") + sandRipples(q, 9, 60, 0, 820, 1920, 260)
  + place(q, [["tree-cactus", 250, 870, 0.95], ["tree-cactus", 1690, 890, 1.1], ["tree-cactus", 1500, 800, 0.5], ["tree-dead", 1370, 812, 0.7], ["rock-pile", 540, 830, 0.6], ["tree-cactus", 780, 770, 0.3], ["rock-boulder", 1790, 1020, 1.1], ["tree-cactus", 90, 1070, 1.4]]));

scene("jungle", "Jungle", ["jungle", "tropical", "vines", "rainforest"], (q) => {
  const r = L.rng(5); let top = "", vines = "", lv = "";
  for (let x = -60; x < 2000; x += 300) top += q.sh(q.blob(x, 30, 230, 120, 6, 0.16, x), "green", { w: "scene", tone: x % 600 ? 0 : 1 });
  for (let i = 0; i < 9; i++) { const x = 140 + i * 205 + r() * 60, h = 160 + r() * 220; vines += L.stroke(`M${f1(x)} 120 q${f1(24 - r() * 40)} ${f1(h / 2)} ${f1(r() * 20 - 10)} ${f1(h)}`, { c: "green", w: "prop" }) + q.sh(C(x, 120 + h, 11, 17), "green", { w: "hair", tone: 1 }); }
  [[110, 1100, 40], [1810, 1100, -40]].forEach(([x, y, k]) => { lv += q.sh(L.limb([[x, y], [x + k * 0.4, 720], [x - k * 0.5, 400], [x + k * 0.2, 60]], 120, 76), "brown") + L.stroke(`M${x - 56} 940 q70 -50 112 -120 M${x - 50} 600 q60 -30 100 -90`, { c: "green", w: "prop" }); });
  const wall = (y, rx, ry, tone, depth, seed) => { let o = ""; for (let x = -120, i = 0; x < 2040; x += rx * 0.9, i++) { const d = q.blob(x, y + (i % 2) * 36, rx, ry, 6, 0.14, seed + i); o += q.sh(d, "green", { tone, w: "scene", c: L.c("green", 2) }) + q.hz(d, depth); } return o; };
  return q.sky(480, { clouds: false, sy: 120 }) + wall(520, 250, 210, 2, 0.35, 1) + place(q, [["tree-palm", 260, 690, 0.55], ["tree-palm", 560, 680, 0.5, { flip: 1 }], ["tree-palm", 1340, 680, 0.5], ["tree-palm", 1660, 692, 0.58, { flip: 1 }]]) + wall(690, 230, 150, 1, 0.12, 20)
    + q.ground(770, "green", { tone: 1 }) + q.tufts(15, 60, 0, 790, 1920, 290, "green") + q.sh(P([[890, 772], [1030, 772], [1290, 1092], [610, 1092]], true), "earth", { w: "scene", tone: 1 }) + q.line("M890 772 L610 1092 M1030 772 L1290 1092", "ink", 0.25, "scene")
    + place(q, [["bush-round", 400, 840, 0.8], ["bush-berry", 1500, 850, 0.8], ["bush-round", 760, 790, 0.4], ["bush-round", 1180, 790, 0.4]]) + lv + top + vines + rays(q, 4, 300, 380, 820) + fog(q, 700, 900, 0.3)
    + bigLeaf(q, 90, 1090, 420, -75, "green", 0) + bigLeaf(q, 70, 1090, 380, -45, "green", 1) + bigLeaf(q, 1830, 1090, 420, -105, "green", 0) + bigLeaf(q, 1850, 1090, 380, -135, "green", 1)
    + [[330, 880], [1560, 870], [1700, 950]].map(([x, y]) => Array.from({ length: 5 }, (_, i) => q.sh(C(x + Math.cos(i * 1.257) * 17, y + Math.sin(i * 1.257) * 17, 13), "pink", { w: "hair", flat: true })).join("") + q.sh(C(x, y, 8), "yellow", { w: "hair" })).join("") + fireflies(q, 3, 22, 100, 300, 1700, 600);
});

scene("forest", "Forest", ["forest", "woods", "trees", "pine"], (q) => {
  const far = Array.from({ length: 16 }, (_, i) => ["tree-pine", 40 + i * 122, 690, 0.42 + (i % 3) * 0.04]), mid = [["tree-pine", 90, 770, 0.8], ["tree-birch", 300, 775, 0.75], ["tree-pine", 520, 770, 0.7], ["tree-pine", 1400, 770, 0.72], ["tree-birch", 1620, 775, 0.78], ["tree-pine", 1830, 772, 0.8], ["tree-pine", 210, 785, 0.95], ["tree-oak", 440, 770, 0.55], ["tree-pine", 700, 760, 0.55], ["tree-birch", 820, 762, 0.5], ["tree-pine", 1110, 760, 0.55], ["tree-oak", 1240, 765, 0.5], ["tree-pine", 1500, 780, 0.9]];
  return q.sky(520, { clouds: [[300, 150, 0.9], [1000, 230, 0.7]] }) + q.ridge(33, 640, 60, "green", 0.7, { tone: 1 }) + place(q, far) + fog(q, 560, 700, 0.55) + q.ground(775, "green", { tone: 1 }) + place(q, mid) + fog(q, 640, 800, 0.28)
    + q.tufts(34, 60, 0, 800, 1920, 280, "green") + q.sh(P([[890, 778], [1030, 778], [1480, 1092], [440, 1092]], true), "earth", { w: "scene" }) + q.line("M890 778 L440 1092 M1030 778 L1480 1092", "ink", 0.25, "scene")
    + place(q, [["bush-round", 330, 910, 0.8], ["bush-berry", 1420, 890, 0.75], ["tree-pine", 70, 1085, 1.5], ["tree-birch", 1860, 1090, 1.4], ["rock-boulder", 1560, 1000, 0.6]]) + mushroom(q, 420, 1010, 1) + mushroom(q, 470, 1030, 0.7) + mushroom(q, 1600, 960, 0.9) + rays(q, 5, 120, 330, 860) + fireflies(q, 6, 20, 100, 500, 1700, 500);
});

scene("snowy-mountains", "Snowy mountains", ["snow", "mountains", "winter", "ice", "arctic"], (q) => {
  const aur = q.night ? q.raw(() => [["teal", 0.32, 190], ["green", 0.26, 250], ["pink", 0.18, 150]].map(([c, op, y]) => L.flat(S([[-40, y + 60], [300, y - 40], [700, y + 30], [1100, y - 60], [1500, y + 10], [1960, y - 50], [1960, y + 170], [1500, y + 140], [1100, y + 120], [700, y + 190], [300, y + 100], [-40, y + 190], [-40, y + 60]]), c, op)).join("")) : "";
  return q.sky(560) + aur + mtn(q, 1500, 720, 820, 380, "blue", true, 0.6) + mtn(q, 330, 720, 760, 430, "stone", true, 0.4) + mtn(q, 940, 720, 900, 540, "stone", true, 0.3) + fog(q, 600, 730, 0.4)
    + q.ridge(41, 770, 28, "snow", 0.2, { w: "scene" }) + q.ground(800, "snow")
    + place(q, [["tree-pine-snow", 140, 890, 1.2], ["tree-pine-snow", 340, 810, 0.7], ["tree-pine-snow", 1700, 870, 1.1], ["tree-pine-snow", 1880, 800, 0.8], ["tree-pine-snow", 560, 790, 0.4], ["tree-pine-snow", 1330, 790, 0.4], ["bld-igloo", 1530, 830, 0.8], ["rock-boulder", 880, 790, 0.3]]) + snowman(q, 430, 930, 0.95)
    + L.flat(dots(7, 40, 0, 820, 1920, 260, 2, 4), "white", 0.7);
});

scene("campsite", "Campsite", ["camp", "tent", "campfire", "lake", "mountains"], (q) => {
  const far = [...Array.from({ length: 5 }, (_, i) => ["tree-pine", 50 + i * 120, 710, 0.4 + (i % 2) * 0.05]), ...Array.from({ length: 5 }, (_, i) => ["tree-pine", 1370 + i * 120, 710, 0.4 + (i % 2) * 0.05])];
  const fx = 1390, fy = 915;
  return q.sky(560) + mtn(q, 420, 650, 700, 340, "blue", true, 0.6) + mtn(q, 1020, 650, 780, 410, "purple", true, 0.55) + mtn(q, 1620, 650, 700, 310, "blue", true, 0.6) + fog(q, 580, 660, 0.4)
    + q.sh(P([[-20, 650], [1940, 650], [1940, 745], [-20, 745]], true), "water", { w: "scene", dir: "v" }) + q.line(Array.from({ length: 14 }, (_, i) => `M${40 + i * 140} ${670 + (i * 31) % 60} h70`).join(""), "white", 0.5, "detail") + reflection(q, q.sunset ? 440 : 1480, 664)
    + place(q, far) + q.ground(745, "grass") + q.tufts(51, 50, 0, 770, 1920, 300) + place(q, [["tree-pine", 160, 820, 0.85], ["tree-pine", 350, 800, 0.75], ["tree-pine", 1680, 830, 0.85], ["tree-pine", 1860, 800, 0.8], ["tent", 440, 870, 1.05], ["tree-pine", 50, 1085, 1.5], ["tree-pine", 1890, 1085, 1.4]])
    + (q.night ? q.glow(fx, fy + 20, 420, "orange", 0.4, 0, 150) : q.sunset ? q.glow(fx, fy + 20, 260, "orange", 0.22, 0, 90) : "")
    + [[fx - 170, fy + 18], [fx + 170, fy + 26]].map(([x, y]) => q.sh(L.limb([[x - 70, y], [x + 70, y]], 36, 36), "wood") + q.sh(C(x + 70, y, 15, 18), "earth", { w: "hair", tone: 1 })).join("") + place(q, [["campfire", fx, fy, 1]]) + fireflies(q, 9, 10, 100, 600, 1700, 300);
});

// ---------- scenes: interiors of the world and space ----------
const crystals = (q, x, y, s, seed) => {
  const r = L.rng(seed), cols = ["teal", "purple", "pink", "teal"], g = q.night ? 0.6 : q.sunset ? 0.3 : 0.25; let o = q.glow(x, y - 70 * s, 190 * s, "teal", g, 0, 130 * s);
  for (let i = 0; i < 5; i++) { const bx = x + (i - 2) * 34 * s, h = (90 + r() * 100) * s, w = (22 + r() * 12) * s, lean = (r() - 0.5) * 30 * s; o += q.sh(P([[bx - w, y], [bx - w + lean * 0.3, y - h * 0.8], [bx + lean, y - h], [bx + w + lean * 0.3, y - h * 0.8], [bx + w, y]], true), cols[i % 4], { w: "detail", lit: true, tone: 0 }) + L.flat(P([[bx - w * 0.6, y - 6], [bx - w * 0.5, y - h * 0.75], [bx + lean * 0.8 - 2, y - h * 0.94], [bx - 2, y - h * 0.5]], true), "white", 0.4); }
  return o;
};
const spikes = (q, seed, n, x0, x1, y, dir, h0, h1, name) => { const r = L.rng(seed); let o = ""; for (let i = 0; i < n; i++) { const x = x0 + ((x1 - x0) * (i + r() * 0.6)) / n, w = 24 + r() * 26, h = h0 + r() * (h1 - h0); o += q.sh(P([[x - w, y], [x + w, y], [x + (r() - 0.5) * 14, y + dir * h]], true), name, { w: "detail", tone: i % 2 }); } return o; };
scene("cave", "Cave interior", ["cave", "cavern", "rocks", "crystals", "inside"], (q) => {
  const E = C(960, 470, 320, 240), sk = q.night ? [[0, "navy", 2], [1, "night", 2]] : q.sunset ? [[0, "purple", 0], [0.6, "orange", 1], [1, "yellow", 1]] : [[0, "sky", 2], [1, "sky", 1]];
  const lc = q.night ? "glass" : q.sunset ? "orange" : "yellow", dark = q.night ? 0.62 : q.sunset ? 0.55 : 0.5;
  const blk = (pts) => S([...pts, pts[0]]);
  return q.sh(L.rect(0, 0, 1920, 840), "stone", { tone: 1, w: "scene", dir: "v" }) + q.ground(830, "stone", { tone: 1 })
    + q.sh(blk([[-20, -20], [400, -20], [330, 190], [410, 420], [300, 640], [340, 830], [-20, 880]]), "stone", { tone: 2, w: "scene" }) + q.sh(blk([[1940, -20], [1520, -20], [1590, 190], [1510, 420], [1620, 640], [1580, 830], [1940, 880]]), "stone", { tone: 2, w: "scene" })
    + q.sh(L.rect(-20, -20, 1960, 100), "stone", { tone: 2, w: "scene" }) + spikes(q, 3, 22, 0, 1920, 80, 1, 70, 190, "stone") + spikes(q, 8, 7, 80, 460, 880, -1, 60, 170, "stone") + spikes(q, 9, 7, 1450, 1850, 880, -1, 60, 170, "stone")
    + L.flat(L.rect(0, 0, 1920, 1080), "ink", dark) + q.glow(960, 470, 640, lc, q.night ? 0.2 : 0.4, 1, 480)
    + q.clip(E, q.raw(() => q.vgrad(0, 150, 1920, 700, sk) + (q.night ? q.stars(2, 30, 640, 230, 640, 300) : "")) + q.sh(ridge(61, 540, 50), "green", { w: "scene", tone: 1 }) + q.sh(ridge(62, 580, 30), "grass", { w: "scene" })) + L.stroke(E, { c: "ink", w: "scene", op: 0.9 })
    + q.raw(() => L.flat(P([[830, 700], [1090, 700], [1500, 1010], [420, 1010]], true), lc, q.night ? 0.14 : 0.3) + L.flat(C(960, 930, 480, 70), lc, q.night ? 0.1 : 0.22))
    + crystals(q, 250, 900, 1.1, 4) + crystals(q, 1690, 920, 1.2, 7) + crystals(q, 560, 835, 0.5, 2) + q.hgrad(0, 0, 420, 1080, "navy", 0.5, 0) + q.hgrad(1500, 0, 420, 1080, "navy", 0, 0.5)
    + place(q, [["rock-boulder", 1380, 860, 0.5], ["rock-pile", 540, 880, 0.55]]);
});

scene("underwater", "Underwater", ["underwater", "ocean", "sea", "fish", "coral"], (q) => {
  const bg = q.night ? [[0, "night", 0], [0.5, "navy", 2], [1, "navy", 2]] : q.sunset ? [[0, "orange", 1], [0.3, "pink", 0], [1, "purple", 2]] : [[0, "water", 1], [0.5, "water", 0], [1, "water", 2]];
  const weed = (x, y, h, seed, c = "green") => { const r = L.rng(seed), pts = Array.from({ length: 7 }, (_, i) => [x + Math.sin(i * 1.1 + seed) * 28 * (i / 6), y - (h * i) / 6]); return q.sh(L.limb(pts, 26, 8), c, { w: "detail", tone: seed % 2 }); };
  const coral = (x, y, s, c, seed) => { let o = ""; [[-50, -150], [0, -210], [50, -150], [-20, -110], [28, -100]].forEach(([dx, dy], i) => { o += q.sh(L.limb([[x + dx * 0.2 * s, y], [x + dx * s, y + dy * s * 0.6], [x + dx * s * 1.1, y + dy * s]], 30 * s, 16 * s), c, { w: "detail", tone: i % 2 }) + q.sh(C(x + dx * s * 1.1, y + dy * s, 17 * s), c, { w: "hair", tone: 1 }); }); return o; };
  const fish = (x, y, s, c, flip = 1) => L.g(q.sh(P([[100, 0], [150, -34], [150, 34]], true), c, { w: "detail", tone: 1 }) + q.sh(S([[0, 0], [30, -34], [80, -30], [108, 0], [80, 30], [30, 34], [0, 0]]), c, { w: "detail" }) + q.sh(P([[30, -34], [50, -52], [70, -32]], true), c, { w: "hair", tone: 1 }) + L.flat(C(24, -6, 6), "white", 1) + L.flat(C(23, -6, 3), "ink", 1) + L.stroke("M58 -26 Q66 0 58 26", { c: "white", w: "detail", op: 0.7 }), `translate(${x} ${y}) scale(${-flip * s} ${s})`);
  const jelly = (x, y, s, c) => L.g(q.glow(0, -30, 130, c, q.night ? 0.55 : 0.2, 0) + q.sh(S([[-60, 0], [-52, -50], [0, -78], [52, -50], [60, 0], [30, -10], [0, 0], [-30, -10], [-60, 0]]), c, { w: "detail", lit: true, tone: 1 }) + L.stroke("M-34 0 q-14 40 0 80 M-10 0 q10 50 -4 96 M16 0 q-12 40 2 84 M38 0 q12 34 0 70", { c, w: "detail", op: 0.8 }), `translate(${x} ${y}) scale(${s})`);
  const rr = q.raw(() => Array.from({ length: 6 }, (_, i) => L.flat(P([[140 + i * 330, 60], [210 + i * 330 + (i % 2) * 30, 60], [330 + i * 330, 900], [140 + i * 330 + 40, 900]], true), q.night ? "glass" : q.sunset ? "orange" : "white", q.night ? 0.05 : 0.11)).join(""));
  return q.vgrad(0, 0, 1920, 1080, bg) + rr + q.raw(() => L.flat(`${waveLine(70, 12, 4)} L1980 0 L-60 0 Z`, q.night ? "glass" : "white", q.night ? 0.22 : 0.5)) + q.ridge(52, 800, 120, "water", 0.6, { tone: 2, w: "scene" }).replace(/^/, "")
    + q.ridge(51, 880, 40, "sand", 0.3, { w: "scene" }) + q.ground(905, "sand") + sandRipples(q, 12, 40, 0, 930, 1920, 150) + weed(110, 930, 330, 1) + weed(170, 940, 260, 2) + weed(1790, 930, 360, 3) + weed(1730, 940, 280, 4) + weed(300, 910, 180, 5, "teal") + weed(1590, 910, 200, 6, "teal")
    + coral(1860, 1000, 1.3, "pink", 1) + coral(80, 1010, 1.25, "orange", 2) + coral(450, 930, 0.7, "purple", 3) + coral(1450, 940, 0.75, "orange", 4) + place(q, [["rock-pile", 1250, 960, 0.7], ["rock-boulder", 700, 940, 0.6]])
    + fish(560, 360, 0.8, "orange") + fish(1180, 270, 0.7, "yellow", -1) + fish(1320, 450, 0.55, "blue", -1) + fish(380, 520, 0.6, "pink") + jelly(1560, 300, 1, "pink") + jelly(300, 220, 0.7, "purple")
    + q.raw(() => L.stroke(Array.from({ length: 14 }, (_, i) => C(120 + ((i * 137) % 1700), 500 + ((i * 211) % 400), 5 + (i % 4) * 4)).join(""), { c: "white", w: "hair", op: 0.7 }));
});

// ---------- space ----------
const planet = (q, x, y, r, name, bands, ring) => {
  const rc = C(x, y, r), rot = (inner) => L.g(inner, `rotate(-18 ${x} ${y})`);
  const back = ring ? rot(L.stroke(C(x, y, r * 1.95, r * 0.5), { c: "gold", w: r * 0.2, op: 0.9 })) : "", front = ring ? rot(L.stroke(L.arc(x, y, r * 1.95, 0, 180, r * 0.5), { c: "gold", w: r * 0.2 })) : "";
  return back + q.sh(rc, name, { w: "scene" }) + q.clip(rc, bands.map(([dy, h, op]) => L.flat(L.rect(x - r, y + dy * r, r * 2, h * r), "ink", op)).join("") + L.flat(C(x - r * 0.35, y - r * 0.4, r * 0.55), "white", 0.18) + L.flat(`${rc} ${C(x - r * 0.3, y - r * 0.3, r * 1.05)}`.replace(/^/, "").slice(0, 0) + C(x + r * 0.4, y + r * 0.45, r * 0.9), "navy", 0.3)) + front;
};
const earth = (q, cx, cy, r, mode, lands) => q.raw(() => {
  const rc = C(cx, cy, r), night = mode === "night", ocean = night ? ["navy", 1] : ["water", 0];
  const land = lands.map(([fx, fy, rx, ry, sd], i) => q.blob(cx + fx * r, cy + fy * r, rx * r, ry * r, 5, 0.22, sd)).join(" ");
  const clouds = lands.map(([fx, fy, rx, ry, sd], i) => `${C(cx + (fx + 0.12) * r, cy + (fy + 0.2) * r, rx * r * 0.7, ry * r * 0.18)}`).join(" ");
  const lights = night ? lands.map(([fx, fy, rx, ry, sd]) => dots(sd, 40, cx + (fx - rx * 0.7) * r, cy + (fy - ry * 0.6) * r, rx * 1.4 * r, ry * 1.2 * r, 1.5, 2.5 + r * 0.0015)).join("") : "";
  let o = q.raw(() => Array.from({ length: 3 }, (_, i) => L.tag("circle", { cx, cy, r: r + 4 + i * 9, fill: "none", stroke: L.c("sky", 0), "stroke-width": 9, opacity: (night ? 0.25 : 0.4) - i * 0.12 })).join(""))
    + L.shape(rc, ocean[0], { w: "scene", tone: ocean[1], flat: true }) + q.clip(rc, L.flat(land, night ? "navy" : "green", night ? 0.9 : 1) + (night ? "" : L.flat(land, "sand", 0.3)) + L.flat(clouds, "white", night ? 0.15 : 0.75) + q.raw(() => L.flat(lights, "yellow", 0.95)));
  if (mode === "terminator") o += q.clip(rc, q.hgrad(cx - r * 0.35, cy - r, r * 0.75, r * 2, "navy", 0, 0.93) + L.flat(L.rect(cx + r * 0.4, cy - r, r, r * 2), "navy", 0.93) + q.glow(cx - r * 0.2, cy - r * 0.2, r * 1.2, "white", 0.18, 0));
  else if (!night) o += q.clip(rc, L.flat(C(cx + r * 0.42, cy + r * 0.38, r), "navy", 0.28) + q.glow(cx - r * 0.35, cy - r * 0.4, r * 0.7, "white", 0.3, 0));
  return o;
});
const spaceBg = (q, seed) => q.raw(() => q.vgrad(0, 0, 1920, 1080, [[0, "ink", 2], [0.5, "navy", 2], [1, "ink", 2]])) + q.stars(seed, 170, 0, 0, 1920, 1080);
scene1("space", "Space · planets and stars", ["space", "planets", "stars", "galaxy", "nebula"], (q) => spaceBg(q, 7) + L.flat(q.blob(520, 260, 480, 170, 5, 0.25, 1), "purple", 0.22) + L.flat(q.blob(1500, 560, 520, 150, 5, 0.25, 3), "pink", 0.13) + L.flat(q.blob(900, 160, 400, 110, 4, 0.25, 5), "teal", 0.13)
  + planet(q, 1360, 330, 150, "orange", [[-0.55, 0.2, 0.12], [-0.1, 0.25, 0.1], [0.4, 0.2, 0.12]], true) + planet(q, 360, 600, 95, "red", [[-0.4, 0.15, 0.15], [0.1, 0.2, 0.12]]) + planet(q, 820, 190, 48, "blue", [[-0.2, 0.2, 0.12]]) + planet(q, 1740, 800, 62, "gray", [[0.0, 0.18, 0.15]])
  );
scene1("moon-surface", "Moon surface · Earth in the sky", ["moon", "lunar", "earth", "space", "craters"], (q) => {
  const crater = (x, y, w) => q.sh(C(x, y, w, w * 0.26), "stone", { tone: 2, w: "detail" }) + L.flat(L.arc(x, y, w, 195, 345, w * 0.26), "white", 0.5);
  return spaceBg(q, 3) + earth(q, 1340, 300, 170, "day", [[-0.3, -0.3, 0.3, 0.2, 3], [0.35, 0.25, 0.32, 0.22, 5], [-0.1, 0.5, 0.2, 0.12, 9]])
    + q.sh(S([[-20, 830], [260, 810], [620, 826], [1000, 806], [1400, 822], [1940, 800], [1940, 1100], [-20, 1100], [-20, 830]]), "stone", { w: "scene", dir: "v", tone: 1 }) + crater(300, 860, 150) + crater(1620, 880, 190) + crater(900, 835, 70) + crater(1150, 1010, 130) + crater(120, 1020, 120)
    + place(q, [["rock-boulder", 520, 915, 0.5], ["rock-pile", 1480, 975, 0.55], ["rock-boulder", 90, 960, 0.4]]) + L.flat(dots(4, 30, 0, 850, 1920, 220, 2, 5), "stone", 0.35);
});
const earthLands = [[-0.5, -0.93, 0.2, 0.06, 2], [-0.1, -0.88, 0.3, 0.09, 4], [0.38, -0.92, 0.22, 0.06, 6], [0.62, -0.8, 0.1, 0.05, 8]];
scene("earth-space", "Earth from space", ["earth", "planet", "space", "orbit", "globe"], (q) => spaceBg(q, 11) + (q.night ? "" : q.glow(1560, 700, 300, "yellow", 0.7, 1, 110) + q.glow(1560, 700, 120, "white", 0.8, 0, 45)) + earth(q, 960, 1950, 1270, q.night ? "night" : q.sunset ? "terminator" : "day", earthLands.map(([a, b, c, d, e]) => [a, b, c, d, e]))
  + L.flat(q.blob(1100, 240, 520, 100, 5, 0.25, 7), "purple", 0.14) + q.raw(() => L.flat(L.rect(0, 1060, 1920, 20), "ink", 0)));
scene1("black-hole", "Black hole", ["black hole", "space", "accretion", "gravity", "galaxy"], (q) => {
  const cx = 960, cy = 400, r = 150, ann = (rxo, ryo, rxi, ryi, c, op) => L.tag("path", { d: `${C(cx, cy, rxo, ryo)} ${C(cx, cy, rxi, ryi)}`, fill: L.c(c, 1), "fill-rule": "evenodd", opacity: op });
  const disc = [[3.3, 1, 2.45, "red", 0.5], [2.45, 1, 1.85, "orange", 0.78], [1.85, 1, 1.4, "yellow", 0.92], [1.4, 1, 1.12, "white", 0.95]].map(([a, , b, c, op]) => ann(r * a, r * a * 0.17, r * b, r * b * 0.17, c, op)).join("");
  const rot = (s) => L.g(s, `rotate(-11 ${cx} ${cy})`);
  return spaceBg(q, 5) + L.flat(q.blob(560, 300, 460, 150, 5, 0.25, 2), "purple", 0.2) + L.flat(q.blob(1450, 520, 480, 130, 5, 0.25, 6), "red", 0.12)
    + q.glow(cx, cy, 700, "orange", 0.32, 0, 300) + q.glow(cx, cy, 360, "yellow", 0.4, 1, 180) + rot(disc)
    + L.tag("circle", { cx, cy, r: r * 1.22, fill: "none", stroke: L.c("orange", 1), "stroke-width": 18, opacity: 0.28 }) + L.tag("circle", { cx, cy, r: r * 1.12, fill: "none", stroke: L.c("white"), "stroke-width": 7, opacity: 0.95 })
    + L.tag("path", { d: L.arc(cx, cy, r * 1.9, 188, 352, r * 1.05), fill: "none", stroke: L.c("yellow", 1), "stroke-width": 16, opacity: 0.8, "stroke-linecap": "round" })
    + L.shape(C(cx, cy, r), "ink", { w: "scene", flat: true, tone: 2 }) + q.clip(`M0 ${cy} H1920 V1080 H0 Z`, rot(disc.replace(/opacity="/g, 'opacity="')))
    + L.tag("path", { d: L.arc(cx, cy, r * 1.45, 12, 168, r * 0.5), fill: "none", stroke: L.c("white"), "stroke-width": 5, opacity: 0.5, "stroke-linecap": "round" });
});

})();
