// ===================== library/worlds.js — full-frame "What If…?" world backgrounds (space, sea, land, cities, inside things) =====================
// Every world is a 1920x1080 background (origin top-left). The lower-middle (x 560-1360, y 560-1000) is left calm for characters.
// Time variants (-sunset / -night) are real re-lightings, not overlays: the palette is mixed toward the light while the scene draws.
(function () {
const L = window.L, f1 = L.f1;
const P = L.poly, R = L.rrect, C = L.circ, S = L.smooth;

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

const blob = (cx, cy, rx, ry, lobes = 7, jit = 0.12, ph = 0, per = 4) => {
  const n = lobes * per, pts = [];
  for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2, k = 1 + jit * Math.cos(lobes * a + ph); pts.push([cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k]); }
  pts.push(pts[0]); return S(pts);
};
const ridge = (seed, y0, amp, step = 140, ph = 0.0045) => {
  const r = L.rng(seed), pts = [];
  for (let x = -60; x <= 2100; x += step) pts.push([x, y0 - amp * (0.5 + 0.5 * Math.sin(x * ph + seed)) - r() * amp * 0.5]);
  return S(pts) + " L2100 1100 L-60 1100 Z";
};
const cloudD = (x, y, s = 1) => S([[-110, 0], [-125, -28], [-85, -52], [-50, -88], [0, -72], [42, -100], [92, -68], [125, -32], [108, 0], [-110, 0]].map(([a, b]) => [x + a * s, y + b * s]));
const dots = (seed, n, x0, y0, w, h, rmin, rmax) => { const r = L.rng(seed); let d = ""; for (let i = 0; i < n; i++) d += C(x0 + r() * w, y0 + r() * h, rmin + r() * (rmax - rmin)); return d; };
const rgn = (seed, n, x0, y0, w, h) => { const r = L.rng(seed); return Array.from({ length: n }, () => [x0 + r() * w, y0 + r() * h, r()]); };
const tr = (inner, x, y, s = 1, rot = 0) => L.g(inner, `translate(${f1(x)} ${f1(y)})${rot ? ` rotate(${rot})` : ""} scale(${s})`);

const Q = (o = {}) => {
  const time = tm(o), K = TM[time], night = time === "night", sunset = time === "sunset";
  const q = { time, night, sunset, day: time === "day", K, o };
  q.raw = (fn) => { const cur = L.T; L.T = cur.__base || cur; try { return fn(); } finally { L.T = cur; } };
  q.sh = (d, name, p = {}) => {
    const o2 = Object.assign({ w: "scene" }, p, { tone: p.lit ? p.tone || 0 : night ? 2 : p.tone || 0 });
    return p.lit ? q.raw(() => L.shape(d, name, o2)) : L.shape(d, name, o2);
  };
  q.hi = (d, name, op = 0.5) => L.flat(d, L.c(name, 1), night ? op * 0.35 : op);
  q.dk = (d, name, op = 0.3) => L.flat(d, L.c(name, 2), op);
  q.hz = (d, depth = 1) => q.raw(() => L.flat(d, L.c(K.haze[0], K.haze[1]), K.hz * depth));
  q.line = (d, c = "ink", op = 0.5, w = "detail") => L.stroke(d, { c, w, op });
  q.glow = (cx, cy, r, c = "yellow", op = 0.5, tone = 1, ry = r) => q.raw(() => { const id = gid("gl"), col = L.c(c, tone); return `<defs><radialGradient id="${id}"><stop offset="0" stop-color="${col}" stop-opacity="${op}"/><stop offset="1" stop-color="${col}" stop-opacity="0"/></radialGradient></defs>` + L.tag("ellipse", { cx, cy, rx: r, ry, fill: `url(#${id})` }); });
  // many glows sharing one gradient: list of [cx, cy, r, ry?, op?]
  q.glows = (list, c = "yellow", tone = 1, op = 0.5) => q.raw(() => { const id = gid("gs"), col = L.c(c, tone); return `<defs><radialGradient id="${id}"><stop offset="0" stop-color="${col}" stop-opacity="${op}"/><stop offset="1" stop-color="${col}" stop-opacity="0"/></radialGradient></defs>` + list.map(([cx, cy, r, ry, p]) => L.tag("ellipse", { cx: f1(cx), cy: f1(cy), rx: f1(r), ry: f1(ry || r), fill: `url(#${id})`, opacity: p })).join(""); });
  q.clip = (d, inner) => { const id = gid("cp"); return `<clipPath id="${id}"><path d="${d}"/></clipPath><g clip-path="url(#${id})">${inner}</g>`; };
  q.vgrad = (x, y, w, h, stops, op) => q.raw(() => { const id = gid("vg"); return `<defs><linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="0" y1="${f1(y)}" x2="0" y2="${f1(y + h)}">${stops.map(([o2, c, t]) => `<stop offset="${o2}" stop-color="${L.c(c, t || 0)}"/>`).join("")}</linearGradient></defs>` + L.tag("rect", { x, y, width: w, height: h, fill: `url(#${id})`, opacity: op }); });
  q.hgrad = (x, y, w, h, stops, op) => q.raw(() => { const id = gid("hg"); return `<defs><linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="${f1(x)}" y1="0" x2="${f1(x + w)}" y2="0">${stops.map(([o2, c, t, a]) => `<stop offset="${o2}" stop-color="${L.c(c, t || 0)}"${a !== undefined ? ` stop-opacity="${a}"` : ""}/>`).join("")}</linearGradient></defs>` + L.tag("rect", { x, y, width: w, height: h, fill: `url(#${id})`, opacity: op }); });
  q.ground = (y, name, p = {}) => q.sh(P([[-20, y], [1940, y], [1940, 1100], [-20, 1100]], true), name, Object.assign({ dir: "v" }, p));
  q.ridge = (seed, y0, amp, name, depth = 0.5, p = {}) => { const d = ridge(seed, y0, amp, p.step, p.ph); return q.sh(d, name, p) + q.hz(d, depth); };
  q.tufts = (seed, n, x0, y0, w, h, c = "grass") => { const r = L.rng(seed); let d = ""; for (let i = 0; i < n; i++) { const x = x0 + r() * w, y = y0 + r() * h; d += `M${f1(x)} ${f1(y)} l-6 -12 M${f1(x)} ${f1(y)} l1 -15 M${f1(x)} ${f1(y)} l7 -11`; } return L.stroke(d, { c: L.c(c, 2), w: "detail", op: 0.7 }); };
  q.stars = (seed, n, x0, y0, w, h) => q.raw(() => L.flat(dots(seed, n, x0, y0, w, h, 1.3, 3.4), "white", 0.9) + rgn(seed + 9, 7, x0, y0, w, h).map(([x, y, k]) => L.flat(L.star(x, y, 9 + k * 7, 2.5, 4), "white", 0.95)).join(""));
  q.cloud = (x, y, s = 1) => q.raw(() => { const d = cloudD(x, y, s); return night ? L.shape(d, "night", { w: "detail", tone: 1, op: 0.75 }) : L.shape(d, sunset ? "pink" : "white", { w: "detail", tone: sunset ? 1 : 0 }); });
  q.sun = (x, y, r = 62) => (sunset ? q.glow(x, y, r * 7, "orange", 0.6, 0) + q.glow(x, y, r * 3.2, "yellow", 0.7, 0) : q.glow(x, y, r * 4, "yellow", 0.4, 1)) + q.raw(() => L.shape(C(x, y, r), sunset ? "orange" : "yellow", { w: "scene", tone: sunset ? 1 : 0 }));
  q.moon = (x, y, r = 58) => q.glow(x, y, r * 5, "glass", 0.45, 2) + q.raw(() => L.shape(C(x, y, r), "cream", { w: "scene" }) + L.flat(C(x - r * 0.3, y - r * 0.2, r * 0.2) + C(x + r * 0.35, y + r * 0.25, r * 0.28) + C(x + r * 0.1, y - r * 0.5, r * 0.13), "yellow", 0.3));
  q.sky = (hy = 680, p = {}) => {
    const st = night ? [["0", "navy", 2], [0.55, "night", 2], [1, "night", 0]] : sunset ? [[0, "purple", 0], [0.42, "pink", 0], [0.78, "orange", 1], [1, "yellow", 1]] : [[0, "sky", 2], [0.6, "sky", 0], [1, "sky", 1]];
    const sx = p.sx !== undefined ? p.sx : sunset ? 440 : 1480, sy = p.sy !== undefined ? p.sy : sunset ? hy - 70 : 170;
    const cl = p.clouds === false ? [] : p.clouds || [[260, 170, 1], [770, 110, 0.75], [1100, 270, 0.9], [1760, 320, 0.8]];
    let o2 = q.vgrad(0, 0, 1920, hy + 90, st) + q.raw(() => L.tag("rect", { x: 0, y: hy + 89, width: 1920, height: 1000, fill: L.c(st[2][1], st[2][2]) }));
    if (night && !p.nostars) o2 += q.stars(p.seed || 5, 70, 0, 0, 1920, hy * 0.8);
    if (!p.nosun) o2 += night ? q.moon(sx, sy, p.r || 58) : q.sun(sx, sy, p.r || (sunset ? 96 : 62));
    return o2 + (night ? cl.slice(0, 2) : cl).map(([x, y, s]) => q.cloud(x, y, s)).join("");
  };
  q.win = (x, y, w, h, lit = true) => {
    const d = R(x, y, w, h, Math.min(w, h) * 0.22), cx = x + w / 2, cy = y + h / 2;
    const mun = L.stroke(`M${f1(cx)} ${f1(y)} V${f1(y + h)} M${f1(x)} ${f1(cy)} H${f1(x + w)}`, { c: "wood", w: "hair", op: 0.7 });
    if (night) return q.sh(d, lit ? "yellow" : "navy", { w: "detail", tone: 1, flat: true, lit: true }) + mun;
    return q.sh(d, "glass", { w: "detail" }) + (sunset ? L.flat(d, "orange", 0.4) : L.flat(P([[x + w * 0.1, y + h * 0.9], [x + w * 0.1, y + h * 0.45], [x + w * 0.55, y + h * 0.1], [x + w * 0.8, y + h * 0.1]], true), "white", 0.55)) + mun;
  };
  q.wins = (x, y, cols, rows, w, h, gx, gy, seed, lp = 0.55) => {
    const r = L.rng(seed); let lit = "", dark = "";
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) { const d = L.rect(x + i * (w + gx), y + j * (h + gy), w, h); if (night && r() < lp) lit += d; else dark += d; }
    if (night) return (dark ? L.shape(dark, "navy", { w: "hair", tone: 1, flat: true }) : "") + (lit ? q.raw(() => L.shape(lit, "yellow", { w: "hair", tone: 1, flat: true })) : "");
    return L.shape(dark, "glass", { w: "hair", flat: true }) + (sunset ? L.flat(dark, "orange", 0.35) : L.flat(dark, "white", 0.25));
  };
  q.blob = blob;
  // soft round planet/moon lit top-left: body, optional bands (clip), shade on the lower right
  q.ball = (cx, cy, r, name, p = {}) => {
    const body = C(cx, cy, r);
    let o2 = L.shape(body, name, Object.assign({ w: "scene" }, p));
    if (p.bands) o2 += q.clip(body, p.bands);
    return o2 + q.clip(body, q.glow(cx + r * 0.55, cy + r * 0.5, r * 1.15, "navy", p.shade === undefined ? 0.55 : p.shade * 2, 2));
  };
  q.craters = (seed, n, x0, y0, w, h, rmin, rmax, name = "gray") => {
    const r = L.rng(seed); let o2 = "";
    for (let i = 0; i < n; i++) { const x = x0 + r() * w, y = y0 + r() * h, k = rmin + r() * (rmax - rmin); o2 += q.sh(C(x, y, k, k * 0.3), name, { w: "detail", tone: 2, flat: true }) + L.flat(`M${f1(x - k * 0.8)} ${f1(y + k * 0.05)} A${f1(k * 0.85)} ${f1(k * 0.22)} 0 0 0 ${f1(x + k * 0.8)} ${f1(y + k * 0.05)}`, "white", night ? 0.1 : 0.35); }
    return o2;
  };
  q.rocks = (seed, n, x0, x1, y0, y1, smin, smax, name = "stone") => {
    const r = L.rng(seed); let o2 = "";
    const list = Array.from({ length: n }, () => [x0 + r() * (x1 - x0), y0 + r() * (y1 - y0), smin + r() * (smax - smin), r()]).sort((a, b) => a[1] - b[1]);
    list.forEach(([x, y, k, j]) => { o2 += q.shd(x, y, k * 2.2) + q.sh(q.blob(x, y - k * 0.55, k, k * 0.62, 5, 0.1, j * 6), name, { w: "detail", flat: true, tone: j < 0.5 ? 0 : 1 }) + q.hi(q.blob(x - k * 0.3, y - k * 0.8, k * 0.4, k * 0.2, 3, 0.1, 0), name, 0.55); });
    return o2;
  };
  q.shd = (cx, gy, w) => !L.T.shadow ? "" : L.tag("ellipse", { cx, cy: gy + 2, rx: w * 0.5, ry: w * 0.06, fill: L.c("ink"), opacity: night ? 0.18 : 0.22 });
  return q;
};

// ---------- registration ----------
const NAMES = new Set();
const reg = (name, label, group, fn, tags = [], demo = {}) => {
  NAMES.add(name);
  L.reg("worlds", name, withTime((o) => fn(Q(o), o)), { box: [0, 0, 1920, 1080], group, label, tags: ["background", "world", "scene", ...tags], call: `L.put(S, "${name}", 0, 0, { s: 1, t })`, demo });
};
// a time-of-day trio / pair from one drawing
const regT = (name, label, group, fn, tags, times = ["day", "sunset", "night"], extra = {}) => times.forEach((tt) => reg(`${name}-${tt}`, `${label} · ${tt}`, group, fn, tags.concat(tt), Object.assign({ time: tt }, extra)));
const SP = "Space and planets", SEA = "Sea", UG = "Underground", LAND = "Land", CITY = "Cities and old worlds", IN = "Inside things", PL = "Places";

// ===================== SPACE AND PLANETS =====================
const spaceSky = (q, seed = 3, top = ["navy", 2], bot = ["navy", 0]) => q.vgrad(0, 0, 1920, 1080, [[0, top[0], top[1]], [1, bot[0], bot[1]]]) + q.stars(seed, 110, 0, 0, 1920, 760);
const bandStripes = (q, cx, cy, r, list) => list.map(([dy, h, c, t, op]) => L.flat(P([[cx - r, cy + dy], [cx + r, cy + dy], [cx + r, cy + dy + h], [cx - r, cy + dy + h]], true), L.c(c, t), op || 1)).join("");

const mars = (q, o) => {
  const blue = o.mood === "sunset";
  const sy = 640, sx = blue ? 700 : 1500, sky = blue ? [[0, "navy", 0], [0.5, "night", 0], [0.82, "sky", 2], [1, "sky", 0]] : [[0, "dusk", 2], [0.5, "dusk", 0], [1, "dusk", 1]];
  let r = q.vgrad(0, 0, 1920, 760, sky);
  if (blue) r += q.stars(4, 40, 0, 0, 1920, 380);
  r += q.glow(sx, blue ? sy - 40 : 190, blue ? 520 : 200, blue ? "sky" : "yellow", blue ? 0.8 : 0.45, blue ? 1 : 1) + q.raw(() => L.shape(C(sx, blue ? sy - 40 : 190, blue ? 40 : 34), blue ? "white" : "cream", { w: "detail" }));
  r += q.raw(() => L.shape(q.blob(1180, 230, 46, 34, 4, 0.14, 1), "stone", { w: "detail" }) + L.shape(q.blob(420, 330, 24, 18, 4, 0.14, 2), "stone", { w: "detail" }));
  r += q.ridge(21, 700, 120, "lava", 0.7, { tone: 2, step: 200, ph: 0.003 }) + q.ridge(8, 760, 70, "lava", 0.4, { tone: 2, step: 160 });
  // big shield volcano far off
  r += q.sh(P([[40, 770], [420, 640], [560, 628], [980, 770]], true), "lava", { tone: 2, w: "detail" }) + q.hz(P([[40, 770], [420, 640], [560, 628], [980, 770]], true), 0.6);
  r += q.ground(790, "lava", { tone: 2 }) + L.flat(P([[-20, 790], [1940, 790], [1940, 1100], [-20, 1100]], true), "dusk", blue ? 0.15 : 0.3);
  r += q.craters(11, 9, 100, 830, 1700, 200, 40, 110, "lava");
  r += q.rocks(5, 7, 40, 520, 860, 1030, 24, 60, "lava") + q.rocks(9, 7, 1400, 1900, 860, 1030, 24, 60, "lava");
  r += q.tufts(2, 0, 0, 0, 1, 1);
  // dust devil
  r += L.flat(S([[1560, 790], [1590, 740], [1570, 690], [1600, 640], [1590, 640], [1556, 690], [1572, 740], [1540, 790], [1560, 790]]), "dusk", 0.7);
  return r;
};
reg("world-mars-day", "Mars surface", SP, mars, ["mars", "red planet", "alien", "rust", "planet surface"], { mood: "day" });
reg("world-mars-sunset", "Mars surface · blue sunset", SP, mars, ["mars", "red planet", "blue sunset", "dusk"], { mood: "sunset" });

reg("world-moon-earthrise", "Moon surface with Earth in the sky", SP, (q) => {
  let r = spaceSky(q, 6, ["ink", 0], ["navy", 2]);
  // earth
  const ex = 1440, ey = 250, er = 170, body = C(ex, ey, er);
  r += q.glow(ex, ey, er * 1.7, "sky", 0.5, 0) + L.shape(body, "water", { w: "scene" });
  r += q.clip(body, L.flat(S([[ex - 150, ey - 60], [ex - 90, ey - 130], [ex - 20, ey - 90], [ex - 30, ey - 20], [ex - 80, ey + 40], [ex - 120, ey + 20], [ex - 150, ey - 60]]), "green", 1) + L.flat(S([[ex + 40, ey + 20], [ex + 110, ey - 20], [ex + 150, ey + 60], [ex + 90, ey + 130], [ex + 40, ey + 90], [ex + 40, ey + 20]]), "green", 1) + L.flat(S([[ex - 120, ey - 110], [ex - 30, ey - 150], [ex + 60, ey - 120], [ex + 20, ey - 100], [ex - 70, ey - 90], [ex - 120, ey - 110]]), "white", 0.85) + L.flat(S([[ex - 70, ey + 70], [ex + 20, ey + 50], [ex + 100, ey + 90], [ex + 20, ey + 110], [ex - 70, ey + 70]]), "white", 0.7) + L.flat(C(ex + 70, ey + 60, er * 1.05), "navy", 0.32));
  // lunar ground: curved horizon
  const hz = `M-100 820 Q960 690 2020 820 V1100 H-100 Z`;
  r += q.sh(hz, "stone", { dir: "v", tone: 0 }) + q.hi(`M-100 826 Q960 696 2020 826 L2020 850 Q960 720 -100 850Z`, "white", 0.35);
  r += q.craters(3, 11, 60, 780, 1800, 280, 36, 120, "stone") + q.rocks(14, 6, 60, 520, 880, 1040, 22, 54) + q.rocks(15, 6, 1400, 1880, 880, 1040, 22, 54);
  return r;
}, ["moon", "lunar", "earth", "apollo", "space", "crater"]);

reg("world-jupiter-moon", "Jupiter seen from an icy moon", SP, (q) => {
  let r = spaceSky(q, 12, ["ink", 0], ["navy", 2]);
  const jx = 1000, jy = 90, jr = 640;
  r += q.glow(jx, jy, jr * 1.25, "orange", 0.35, 1) + q.ball(jx, jy, jr, "cream", { bands: bandStripes(q, jx, jy, jr, [[-300, 90, "orange", 1, 0.8], [-170, 60, "brown", 1, 0.45], [-70, 110, "orange", 0, 0.9], [60, 50, "brown", 1, 0.5], [130, 120, "earth", 1, 0.9], [260, 60, "orange", 2, 0.6]]) + L.flat(C(jx + 300, jy + 330, 96, 48), "red", 0.85) + L.flat(C(jx + 300, jy + 330, 52, 24), "orange", 0.8) });
  r += q.ball(260, 330, 38, "cream", { shade: 0.25 }) + q.ball(1640, 250, 22, "gold", { shade: 0.3 });
  r += q.sh(`M-100 800 Q500 740 1000 780 Q1500 820 2020 760 V1100 H-100Z`, "glass", { dir: "v", tone: 0 }) + q.hi(`M-100 806 Q500 746 1000 786 Q1500 826 2020 766 L2020 790 Q1500 850 1000 810 Q500 770 -100 830Z`, "white", 0.6);
  r += q.line(`M60 900 L200 960 L180 1020 M1500 900 L1650 940 L1760 1030 M300 880 L420 900 L560 960 M1250 960 L1400 1000 L1460 1060`, "glass", 0.8, "scene");
  r += q.rocks(33, 6, 80, 480, 880, 1040, 24, 58, "glass") + q.rocks(34, 6, 1440, 1880, 880, 1040, 24, 58, "glass");
  return r;
}, ["jupiter", "gas giant", "europa", "moon", "ice", "planet"]);

reg("world-saturn-rings", "Saturn and its rings from a moon", SP, (q) => {
  let r = spaceSky(q, 17, ["ink", 0], ["purple", 2]);
  const cx = 1330, cy = 300, rad = 190, ell = (rx, ry) => C(cx, cy, rx, ry);
  const ring = (clipTop) => q.clip(clipTop ? `M0 0 H1920 V${cy} H0Z` : `M0 ${cy} H1920 V1080 H0Z`, tr(L.stroke(ell(380, 78), { c: "sand", w: 62 }) + L.stroke(ell(380, 78), { c: "gold", w: 22, op: 0.7 }) + L.stroke(ell(318, 62), { c: "earth", w: 8, op: 0.8 }), 0, 0, 1, 0).replace(/^<g/, "<g"));
  const tilt = (x) => L.g(x, `rotate(-16 ${cx} ${cy})`);
  r += q.glow(cx, cy, 560, "gold", 0.28, 1) + tilt(ring(true)) + q.ball(cx, cy, rad, "sand", { bands: bandStripes(q, cx, cy, rad, [[-120, 40, "gold", 0, 0.5], [-40, 50, "earth", 1, 0.5], [60, 36, "gold", 1, 0.6], [120, 40, "earth", 0, 0.4]]) }) + tilt(ring(false));
  r += q.sh(`M-100 830 Q400 760 960 800 Q1500 840 2020 770 V1100 H-100Z`, "purple", { dir: "v", tone: 1 }) + q.hi(`M-100 836 Q400 766 960 806 L960 830 Q400 790 -100 860Z`, "white", 0.3);
  r += q.craters(41, 9, 60, 850, 1800, 200, 40, 110, "purple") + q.rocks(43, 6, 60, 500, 880, 1040, 24, 54, "purple") + q.rocks(44, 6, 1440, 1880, 880, 1040, 24, 54, "purple");
  return r;
}, ["saturn", "rings", "planet", "moon", "titan", "space"]);

reg("world-tv-studio", "TV studio with lights and cameras", PL, (q) => {
  let r = q.vgrad(0, 0, 1920, 1080, [[0, "navy", 2], [1, "navy", 1]]);
  // backdrop
  r += q.sh(R(300, 150, 1320, 450, 30), "blue", { w: "scene", tone: 2 }) + q.hgrad(310, 160, 1300, 430, [[0, "blue", 1, 0.9], [0.5, "purple", 1, 0.5], [1, "teal", 1, 0.9]], 0.0);
  r += q.clip(R(300, 150, 1320, 450, 30), q.hgrad(300, 150, 1320, 450, [[0, "blue", 0, 1], [0.5, "purple", 0, 1], [1, "teal", 0, 1]]) + L.flat(P([[300, 600], [700, 150], [800, 150], [400, 620]], true), "white", 0.12) + L.flat(P([[1000, 620], [1400, 150], [1500, 150], [1100, 620]], true), "white", 0.1) + q.glows([[960, 300, 520, 200]], "white", 0, 0.4));
  r += L.stroke(R(300, 150, 1320, 450, 30), { c: "ink", w: "scene" }) + L.stroke(R(330, 180, 1260, 390, 18), { c: "white", w: 5, op: 0.5 });
  // ON AIR sign
  r += q.sh(R(790, 60, 340, 100, 20), "ink", { w: "scene", tone: 1 }) + q.raw(() => L.shape(R(806, 74, 308, 72, 14), "red", { w: "detail", tone: 0, flat: true })) + L.text("ON AIR", 960, 124, { size: 54, c: "white" }) + q.glow(960, 110, 260, "red", 0.4, 0, 100);
  // light rig
  r += q.sh(L.rect(-20, 0, 1960, 28), "gray", { w: "detail", flat: true, tone: 2 });
  [100, 330, 1480, 1710].forEach((x) => r += q.sh(L.rect(x, 28, 10, 50), "gray", { w: "hair", flat: true }) + q.sh(S([[x - 40, 78], [x - 24, 130], [x + 34, 130], [x + 50, 78], [x - 40, 78]]), "gray", { w: "detail", tone: 0 }) + q.raw(() => L.shape(R(x - 20, 124, 44, 14, 6), "yellow", { w: "hair", flat: true, tone: 1 })) + L.flat(P([[x - 20, 138], [x + 24, 138], [x + 160, 680], [x - 160, 680]], true), "white", 0.06));
  // floor with reflection
  r += q.sh(P([[-20, 660], [1940, 660], [1940, 1100], [-20, 1100]], true), "navy", { w: "scene", tone: 0, dir: "v" }) + L.flat(P([[-20, 660], [1940, 660], [1940, 1100], [-20, 1100]], true), "blue", 0.25);
  r += q.glows([[960, 700, 900, 50]], "sky", 1, 0.4) + q.line(`M0 780 H1920`, "sky", 0.15, "detail");
  // desk
  r += q.shd(960, 700, 560) + q.sh(R(700, 584, 520, 116, 18), "wood", { w: "scene", tone: 0 }) + q.sh(R(680, 560, 560, 38, 14), "white", { w: "detail", tone: 0 }) + q.line(`M740 640 H1180`, "ink", 0.3, "detail");
  // cameras
  const cam = (x, y, s, flip) => L.g(q.shd(0, 0, 220) + L.stroke(`M0 -150 L-80 0 M0 -150 L80 0 M0 -150 V0`, { c: "gray", w: 12 }) + q.sh(R(-70, -300, 140, 100, 14), "gray", { w: "detail", tone: 1 }) + q.sh(R(-100, -280, 60, 60, 10), "ink", { w: "detail", flat: true, tone: 1 }) + q.sh(R(-170, -270, 80, 40, 8), "ink", { w: "detail", flat: true, tone: 1 }) + q.raw(() => L.shape(C(-170, -250, 14), "sky", { w: "hair", flat: true, tone: 1 })) + q.raw(() => L.shape(C(40, -280, 7), "red", { w: "hair", flat: true })), `translate(${x} ${y}) scale(${flip ? -s : s} ${s})`);
  r += cam(300, 1040, 1.4, false) + cam(1620, 1040, 1.4, true);
  r += q.sh(R(60, 220, 150, 100, 10), "ink", { w: "detail", tone: 1 }) + q.raw(() => L.shape(R(70, 230, 130, 80, 6), "teal", { w: "hair", flat: true, tone: 0 })) + q.sh(R(1710, 220, 150, 100, 10), "ink", { w: "detail", tone: 1 }) + q.raw(() => L.shape(R(1720, 230, 130, 80, 6), "yellow", { w: "hair", flat: true, tone: 0 }));
  return r;
}, ["tv", "studio", "news", "broadcast", "television", "cameras", "talk show", "on air"]);

reg("world-space-colony", "Inside a space colony cylinder", SP, (q) => {
  const VX = 960, T = 330, B = 560, X0 = 670, X1 = 1250; // far opening: x 670..1250, y 330..560
  const lerp = (a, b, t) => a + (b - a) * t;
  let r = q.vgrad(0, 0, 1920, 1080, [[0, "sky", 1], [1, "white", 0]]);
  // far end cap: hazy sky, tiny town, lake
  r += q.sh(L.rect(X0, T, X1 - X0, B - T), "sky", { w: "detail", flat: true, tone: 1 }) + q.glow(VX, 450, 300, "white", 0.7, 0, 110);
  r += q.clip(L.rect(X0, T, X1 - X0, B - T), [[700, 36, 70], [742, 30, 104], [776, 44, 78], [830, 34, 126], [872, 40, 96], [920, 30, 138], [958, 46, 88], [1012, 34, 118], [1052, 40, 80], [1100, 30, 100], [1140, 44, 70], [1190, 34, 90]].map(([x, w, h]) => q.sh(L.rect(x, B - 16 - h, w, h), "wall", { w: "hair", flat: true, tone: 1 }) + q.hz(L.rect(x, B - 16 - h, w, h), 0.5)).join("") + q.sh(L.rect(X0, B - 24, X1 - X0, 40), "grass", { w: "hair", flat: true, tone: 1 }) + q.sh(C(VX, B - 10, 120, 8), "water", { w: "hair", flat: true }));
  // strips along the length: 'near(v)' on the screen edge, 'far(v)' on the far opening
  const field = (nA, fA, v1, v2, c, tn) => q.sh(P([nA(v1), fA(v1), fA(v2), nA(v2)], true), c, { w: "hair", flat: true, tone: tn });
  const FL = [["grass", 0], ["grass", 1], ["green", 1], ["grass", 0], ["sand", 0], ["grass", 1], ["green", 0], ["grass", 1]];
  // ceiling land (upside down) with a long window strip down the middle
  const cn = (v) => [lerp(-20, 1940, v), -20], cf = (v) => [lerp(X0, X1, v), T];
  r += q.sh(P([[-20, -20], [1940, -20], [X1, T], [X0, T]], true), "green", { w: "scene", tone: 1, dir: "v" });
  for (let i = 0; i < 8; i++) if (i !== 3 && i !== 4) r += field(cn, cf, i / 8, (i + 1) / 8, FL[i][0], FL[i][1]);
  r += q.raw(() => L.shape(P([cn(0.4), cf(0.4), cf(0.6), cn(0.6)], true), "yellow", { w: "detail", flat: true, tone: 1 })) + q.glow(960, 70, 700, "yellow", 0.4, 1, 120);
  // side lands curving up the walls
  const ln = (v) => [-20, lerp(-20, 1100, v)], lf = (v) => [X0, lerp(T, B, v)], rn = (v) => [1940, lerp(-20, 1100, v)], rf = (v) => [X1, lerp(T, B, v)];
  r += q.sh(P([[-20, -20], [X0, T], [X0, B], [-20, 1100]], true), "green", { w: "scene", tone: 0, dir: "h" }) + q.sh(P([[1940, -20], [X1, T], [X1, B], [1940, 1100]], true), "green", { w: "scene", tone: 0, dir: "h" });
  for (let i = 0; i < 8; i++) r += field(ln, lf, i / 8, (i + 1) / 8, FL[(i + 3) % 8][0], FL[(i + 3) % 8][1]) + field(rn, rf, i / 8, (i + 1) / 8, FL[(i + 5) % 8][0], FL[(i + 5) % 8][1]);
  r += q.hz(P([[-20, -20], [X0, T], [X0, B], [-20, 1100]], true), 0.12) + q.hz(P([[1940, -20], [X1, T], [X1, B], [1940, 1100]], true), 0.12);
  // floor land with a winding river down the middle
  const fn = (v) => [lerp(-20, 1940, v), 1100], ff = (v) => [lerp(X0, X1, v), B];
  r += q.sh(P([[-20, 1100], [1940, 1100], [X1, B], [X0, B]], true), "grass", { w: "scene", tone: 0, dir: "v" });
  for (let i = 0; i < 8; i++) if (i % 2) r += field(fn, ff, i / 8, (i + 1) / 8, "grass", 1);
  r += q.sh(S([[500, 1100], [640, 940], [860, 830], [960, 700], [960, 640], [950, 580], [972, 580], [986, 640], [1010, 700], [960, 830], [800, 960], [780, 1100]]) + " Z", "water", { w: "detail", tone: 0 }) + L.flat(S([[560, 1090], [680, 960], [880, 850], [970, 720]]), "white", 0.4);
  // little homes and trees along the floor edges
  [[0.15, 1], [0.38, 1], [0.6, 1], [0.8, 1], [0.12, -1], [0.34, -1], [0.58, -1], [0.78, -1]].forEach(([t, d]) => { const y = lerp(1000, 590, t), x = d < 0 ? lerp(300, 680, t) : lerp(1620, 1240, t), k = 1.15 - t * 0.9; r += q.shd(x, y, 70 * k) + q.sh(L.rect(x - 28 * k, y - 46 * k, 56 * k, 46 * k), "wall", { w: "detail", flat: true }) + q.sh(P([[x - 38 * k, y - 46 * k], [x, y - 84 * k], [x + 38 * k, y - 46 * k]], true), "red", { w: "detail", flat: true }); });
  r += pine(q, 150, 980, 1.6) + pine(q, 330, 1030, 1.1) + pine(q, 1770, 980, 1.7) + pine(q, 1610, 1030, 1.2) + q.tufts(3, 20, 0, 900, 1900, 190, "grass");
  return r;
}, ["space colony", "o'neill cylinder", "habitat", "future", "sci-fi", "space city", "rotating", "mars colony"]);

reg("world-library-hall", "Grand library hall", PL, (q) => {
  let r = q.vgrad(0, 0, 1920, 1080, [[0, "wood", 2], [1, "brown", 1]]);
  const cols = ["red", "blue", "green", "yellow", "purple", "orange", "teal", "pink"];
  const shelves = (x0, x1, y0, rows, rh) => { let o = q.sh(L.rect(x0, y0, x1 - x0, rows * rh + 20), "wood", { w: "detail", tone: 1 }); const rr = L.rng(Math.round(x0 + y0)); for (let j = 0; j < rows; j++) { const by = y0 + 10 + (j + 1) * rh; let x = x0 + 12; const col = {}; while (x < x1 - 24) { const w = 14 + rr() * 16, h = rh * (0.6 + rr() * 0.34), c = cols[Math.floor(rr() * cols.length)]; (col[c] = col[c] || []).push(L.rect(x, by - h - 6, w, h)); x += w + 2; } Object.entries(col).forEach(([c, ds]) => o += L.shape(ds.join(""), c, { w: "hair", flat: true, tone: 1 })); o += L.flat(L.rect(x0, by - 6, x1 - x0, 6), "wood", 1); } return o; };
  r += shelves(0, 560, 60, 8, 90) + shelves(1360, 1920, 60, 8, 90) + shelves(560, 760, 380, 4, 90) + shelves(1160, 1360, 380, 4, 90);
  // arched window
  r += q.sh("M780 600 V300 A180 170 0 0 1 1140 300 V600 Z", "glass", { w: "scene", flat: true }) + q.clip("M780 600 V300 A180 170 0 0 1 1140 300 V600 Z", q.vgrad(780, 130, 360, 470, [[0, "sky", 0], [1, "yellow", 1]])) + L.stroke(`M960 130 V600 M780 330 H1140 M840 190 L1090 600`, { c: "wood", w: 8, op: 0.9 });
  r += q.glow(960, 360, 500, "yellow", 0.3, 1) + L.flat(P([[780, 600], [1140, 600], [1400, 1000], [520, 1000]], true), "yellow", 0.12);
  // chandelier
  r += L.stroke(`M960 0 V60`, { c: "ink", w: 4 }) + q.sh(S([[880, 90], [920, 60], [1000, 60], [1040, 90], [1000, 120], [920, 120], [880, 90]]), "gold", { w: "detail", tone: 0 }) + q.glows([[960, 110, 180]], "yellow", 1, 0.7) + q.raw(() => L.shape(C(900, 130, 12) + C(960, 140, 12) + C(1020, 130, 12), "yellow", { w: "hair", flat: true, tone: 1 }));
  // floor and rug
  r += q.sh(P([[-20, 780], [1940, 780], [1940, 1100], [-20, 1100]], true), "floor", { w: "scene", tone: 1, dir: "v" }) + q.line(`M0 880 H1920 M0 980 H1920 M400 780 L100 1100 M900 780 L800 1100 M1400 780 L1560 1100`, "ink", 0.25, "detail");
  r += q.sh(S([[500, 900], [1420, 900], [1560, 1060], [360, 1060], [500, 900]]), "red", { w: "detail", tone: 1 }) + L.stroke(S([[560, 920], [1360, 920], [1470, 1040], [450, 1040], [560, 920]]), { c: "gold", w: "detail", op: 0.8 });
  // ladders
  r += L.stroke(`M80 120 L60 800 M180 120 L170 800`, { c: "wood", w: 14 }) + q.line((() => { let t = ""; for (let i = 0; i < 9; i++) t += `M${74 - i * 2} ${180 + i * 70} H${176 - i}`; return t; })(), "wood", 1, "scene");
  r += q.sh(R(1660, 760, 160, 160, 10), "wood", { w: "detail", tone: 0 }) + q.sh(R(1690, 700, 100, 66, 8), "red", { w: "detail", flat: true, tone: 0 }) + q.sh(R(1700, 650, 80, 56, 8), "blue", { w: "detail", flat: true, tone: 0 });
  return r;
}, ["library", "books", "reading", "knowledge", "school", "hall", "study", "shelves"]);

reg("world-train-station", "Train station platform", PL, (q) => {
  let r = q.vgrad(0, 0, 1920, 1080, [[0, "sky", 1], [1, "white", 0]]);
  // canopy roof with beams
  r += q.sh(P([[-20, -20], [1940, -20], [1940, 160], [-20, 160]], true), "gray", { w: "scene", tone: 1, dir: "v" });
  for (let i = 0; i < 8; i++) r += q.sh(P([[i * 260 - 30, 160], [i * 260 + 30, 160], [i * 260 + 10, 340], [i * 260 - 10, 340]], true), "navy", { w: "hair", flat: true, tone: 1 });
  r += L.flat(L.rect(-20, 160, 1960, 28), "ink", 0.3) + q.glows([[960, 60, 900, 60]], "yellow", 1, 0.3);
  // clock
  r += L.stroke(`M960 160 V250`, { c: "ink", w: 6 }) + q.sh(C(960, 310, 70), "white", { w: "scene", tone: 0 }) + L.stroke(`M960 310 V260 M960 310 L996 330`, { c: "ink", w: 8 }) + L.flat(C(960, 310, 6), "ink", 1) + L.stroke((() => { let t = ""; for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; t += `M${f1(960 + Math.cos(a) * 58)} ${f1(310 + Math.sin(a) * 58)} L${f1(960 + Math.cos(a) * 64)} ${f1(310 + Math.sin(a) * 64)}`; } return t; })(), { c: "ink", w: 4 });
  // far buildings / city beyond
  [[100, 130, 220], [260, 160, 300], [450, 110, 200], [1380, 140, 260], [1540, 120, 190], [1680, 180, 320]].forEach(([x, w, h], i) => { const d = L.rect(x, 640 - h, w, h); r += q.sh(d, i % 2 ? "stone" : "wall", { w: "hair", flat: true, tone: 1 }) + q.hz(d, 0.55); });
  // train on the far track
  const car = (x, c) => q.sh(R(x, 500, 380, 160, 40), c, { w: "detail", tone: 0 }) + q.raw(() => L.shape(R(x + 30, 530, 70, 60, 12) + R(x + 125, 530, 70, 60, 12) + R(x + 220, 530, 70, 60, 12), "glass", { w: "hair", flat: true, tone: 0 })) + L.flat(L.rect(x, 620, 380, 14), "white", 0.5) + q.sh(C(x + 70, 664, 22) + C(x + 310, 664, 22), "ink", { w: "hair", flat: true, tone: 1 });
  r += car(60, "blue") + car(460, "blue") + car(1300, "blue") + car(1700, "blue") + q.sh(R(840, 500, 240, 160, 50), "red", { w: "detail", tone: 0 }) + q.raw(() => L.shape(R(870, 530, 80, 60, 14), "glass", { w: "hair", flat: true, tone: 0 })) + q.glow(1060, 600, 80, "yellow", 0.6, 1);
  // tracks
  r += q.sh(P([[-20, 660], [1940, 660], [1940, 780], [-20, 780]], true), "stone", { w: "detail", tone: 1 }) + L.stroke(`M0 700 H1920 M0 750 H1920`, { c: "gray", w: 10 });
  let sl = ""; for (let x = 0; x < 1920; x += 60) sl += L.rect(x, 690, 26, 70); r += L.flat(sl, "brown", 0.5);
  // platform
  r += q.sh(P([[-20, 780], [1940, 780], [1940, 1100], [-20, 1100]], true), "gray", { w: "scene", tone: 0, dir: "v" }) + L.flat(L.rect(-20, 780, 1960, 18), "yellow", 0.9) + q.line(`M0 870 H1920 M0 980 H1920 M240 798 V1100 M720 798 V1100 M1200 798 V1100 M1680 798 V1100`, "ink", 0.2, "detail");
  const bench = (x, y) => q.shd(x, y, 260) + q.sh(R(x - 110, y - 70, 220, 22, 8), "wood", { w: "detail", flat: true }) + q.sh(R(x - 110, y - 30, 220, 18, 8), "wood", { w: "detail", flat: true, tone: 1 }) + q.sh(L.rect(x - 90, y - 12, 12, 24) + L.rect(x + 78, y - 12, 12, 24), "ink", { w: "hair", flat: true, tone: 1 });
  r += bench(220, 940) + bench(1700, 940);
  [[100, 780], [1840, 780]].forEach(([x, y]) => r += q.sh(R(x - 6, y - 280, 12, 280), "ink", { w: "hair", flat: true, tone: 1 }) + q.sh(R(x - 34, y - 330, 68, 60, 14), "white", { w: "detail", tone: 0 }) + q.glow(x, y - 300, 120, "yellow", 0.4, 1));
  return r;
}, ["train", "station", "platform", "railway", "travel", "commute", "tracks", "transport"]);

// ===================== MORE WORLDS =====================
reg("world-asteroid-field", "Asteroid field", SP, (q) => {
  let r = spaceSky(q, 55, ["ink", 0], ["purple", 2]);
  r += q.glow(1500, 200, 700, "orange", 0.22, 1, 360) + q.glows([[400, 700, 520, 240]], "pink", 1, 0.18);
  const ast = (x, y, s, rot, c = "stone") => L.g(q.sh(blob(0, 0, 90, 66, 6, 0.2, x), c, { w: "detail", tone: 0, flat: true }) + q.dk(blob(34, 22, 60, 40, 5, 0.2), c, 0.45) + L.flat(C(-26, -12, 16, 11) + C(30, -16, 11, 8) + C(0, 26, 13, 9), "ink", 0.28) + q.hi(blob(-34, -30, 30, 12, 3, 0.1), c, 0.6), `translate(${x} ${y}) rotate(${rot}) scale(${s})`);
  [[260, 220, 1.7, 20], [620, 120, 0.8, -30], [1000, 300, 0.6, 50], [1380, 140, 1.1, 10], [1700, 380, 1.9, 200], [140, 640, 1.1, 70], [1820, 760, 1.2, 130], [420, 460, 0.5, 0], [1240, 520, 0.45, 40], [1560, 640, 0.6, 20], [320, 880, 0.9, 150]].forEach(([x, y, s, rt], i) => r += ast(x, y, s, rt, i % 3 ? "stone" : "earth"));
  r += q.glows(rgn(4, 14, 0, 0, 1920, 1080).map(([x, y, k]) => [x, y, 4 + k * 6]), "white", 0, 0.9);
  return r;
}, ["asteroids", "space rocks", "belt", "meteor", "space", "rocks", "debris", "extinction"]);

reg("world-sun-surface", "Close to the Sun (calm glow)", SP, (q) => {
  let r = q.vgrad(0, 0, 1920, 1080, [[0, "orange", 0], [0.5, "yellow", 0], [1, "orange", 1]]);
  r += q.glows([[960, 500, 1200, 700]], "white", 0, 0.8) + q.glows([[400, 300, 500, 300], [1500, 700, 600, 300]], "yellow", 1, 0.5);
  const d = (x, y, rx, ry, op) => L.flat(C(x, y, rx, ry), "red", op);
  // soft granulation cells
  const rr = L.rng(12); let cells = ""; for (let i = 0; i < 46; i++) cells += C(rr() * 1920, rr() * 1080, 70 + rr() * 110, 40 + rr() * 60);
  r += L.flat(cells, "orange", 0.22) + L.stroke(cells, { c: "orange", w: "hair", op: 0.28 });
  // prominence arcs
  r += L.stroke(`M120 1000 Q240 540 620 700`, { c: "red", w: 36, op: 0.45 }) + L.stroke(`M1300 980 Q1660 420 1840 820`, { c: "red", w: 42, op: 0.45 }) + L.stroke(`M120 1000 Q240 540 620 700`, { c: "yellow", w: 12, op: 0.8 }) + L.stroke(`M1300 980 Q1660 420 1840 820`, { c: "yellow", w: 14, op: 0.8 });
  r += q.glows(rgn(8, 20, 0, 0, 1920, 1080).map(([x, y, k]) => [x, y, 10 + k * 20]), "white", 0, 0.8);
  r += q.glow(960, 1100, 900, "red", 0.4, 0, 200);
  return r;
}, ["sun", "star", "hot", "solar", "surface", "fire", "plasma", "close to the sun"]);

reg("world-time-tunnel", "Time tunnel of swirling colours", SP, (q) => {
  const cx = 960, cy = 470;
  let r = q.vgrad(0, 0, 1920, 1080, [[0, "navy", 2], [1, "purple", 2]]);
  const cols = ["purple", "blue", "teal", "pink", "purple", "blue", "teal", "pink", "orange"];
  for (let i = 0; i < 9; i++) { const k = 1 - i / 9.5; r += L.g(L.stroke(C(0, 0, 1180 * k, 640 * k), { c: cols[i], w: 70 * k + 8, op: 0.75 }) + L.stroke(C(0, 0, 1180 * k - 40 * k, 640 * k - 22 * k), { c: "white", w: 4, op: 0.35 }), `translate(${cx} ${cy + 20 * i}) rotate(${i * 7})`); }
  r += q.glow(cx, cy, 380, "white", 0.8, 0, 240) + q.glow(cx, cy, 160, "cream", 0.95, 0, 100);
  // clocks and sparkles drifting
  const ck = (x, y, s) => L.g(q.sh(C(0, 0, 50), "cream", { w: "detail", tone: 0 }) + L.stroke(`M0 0 V-32 M0 0 L22 14`, { c: "ink", w: 6 }) + L.flat(C(0, 0, 4), "ink", 1), `translate(${x} ${y}) scale(${s})`);
  r += ck(300, 300, 1.2) + ck(1560, 260, 1.6) + ck(220, 700, 0.9) + ck(1700, 700, 1) + ck(700, 150, 0.6) + ck(1250, 130, 0.7);
  r += q.glows(rgn(3, 40, 0, 0, 1920, 1000).map(([x, y, k]) => [x, y, 5 + k * 8]), "white", 0, 0.9);
  r += q.sh(S([[-60, 960], [500, 930], [1000, 960], [1500, 930], [2000, 960], [2000, 1100], [-60, 1100], [-60, 960]]), "purple", { w: "scene", tone: 1, dir: "v" });
  return r;
}, ["time travel", "tunnel", "portal", "time", "wormhole", "clocks", "swirl", "back to the future"]);

const mammothSil = (q, x, y, k) => L.g(q.sh(S([[-62, -4], [-56, -46], [-10, -66], [38, -56], [62, -26], [56, 2], [-56, 2]]), "brown", { w: "hair", flat: true, tone: 1 }) + q.sh(C(66, -34, 30), "brown", { w: "hair", flat: true, tone: 1 }) +
  q.sh(L.limb([[84, -28], [100, -4], [94, 22]], 16, 7), "brown", { w: "hair", flat: true, tone: 1 }) + L.stroke("M78 -8 Q104 4 108 -22", { c: "cream", w: 5 }) + [-46, -20, 18, 44].map((lx) => q.sh(L.rect(lx - 9, -6, 18, 34), "brown", { w: "hair", flat: true, tone: 2 })).join("") + L.flat(C(76, -40, 3.5), "white"), `translate(${x} ${y}) scale(${k})`);
reg("world-ice-age", "Ice age steppe with mammoth-hair tundra", LAND, (q) => {
  const hy = 600;
  let r = q.vgrad(0, 0, 1920, 1080, [[0, "sky", 0], [0.45, "sky", 1], [0.75, "white", 0], [1, "snow", 0]]);
  r += q.glow(1400, 190, 420, "white", 0.8, 0) + q.raw(() => L.shape(C(1400, 190, 54), "cream", { w: "scene" })) + q.cloud(300, 190, 1) + q.cloud(1000, 120, 0.7);
  r += q.ridge(23, hy - 40, 190, "glass", 0.2, { w: "scene", step: 200, tone: 1 }) + q.ridge(24, hy + 90, 90, "snow", 0.1, { step: 180, tone: 2 });
  [[300, 650, 150], [1560, 640, 180], [900, 620, 130]].forEach(([x, y, s]) => r += q.sh(P([[x - s, y + 40], [x - s * 0.2, y - s * 1.2], [x + s * 0.1, y - s * 0.9], [x + s, y + 40]], true), "glass", { w: "scene", tone: 0 }) + q.dk(P([[x + s * 0.1, y - s * 0.9], [x - s * 0.2, y - s * 1.2], [x - s * 0.1, y + 40], [x + s, y + 40]], true), "water", 0.45) + q.hi(P([[x - s * 0.8, y + 20], [x - s * 0.2, y - s * 1.1], [x - s * 0.15, y + 20]], true), "white", 0.8));
  r += mammothSil(q, 300, 748, 0.9) + mammothSil(q, 420, 760, 0.7) + mammothSil(q, 1560, 756, 0.85);
  r += q.ground(790, "snow", { dir: "v", tone: 2, w: "detail" });
  r += q.glows([[400, 860, 420, 60], [1500, 900, 460, 70], [960, 1000, 800, 60]], "sky", 2, 0.5) + q.glows([[200, 900, 260, 40], [1100, 880, 300, 34], [1700, 960, 300, 40]], "white", 0, 0.95);
  r += [[140, 1000, 220, 40], [1720, 1010, 240, 36] ].map(([x, y, rx, ry]) => q.sh(C(x, y, rx, ry), "earth", { w: "hair", flat: true, tone: 1 })).join("");
  r += L.stroke(`M0 880 q80 -20 160 0 M500 940 q100 -20 200 0 M1100 900 q80 -18 160 0 M1500 980 q100 -20 200 0`, { c: "water", w: "detail", op: 0.8 });
  r += pine(q, 120, 960, 1.3, true) + pine(q, 1800, 940, 1.5, true) + q.tufts(2, 26, 0, 820, 1900, 240, "earth") + q.tufts(8, 12, 0, 880, 1900, 160, "earth");
  r += q.rocks(5, 5, 80, 400, 970, 1050, 24, 48, "stone") + q.rocks(6, 5, 1500, 1860, 990, 1050, 24, 48, "stone");
  r += L.flat(dots(7, 90, 0, 0, 1920, 1080, 2.5, 5), "white", 0.95);
  return r;
}, ["ice age", "glacial", "frozen", "tundra", "mammoth", "snow", "prehistoric", "glacier"]);

reg("world-atlantis-ruins", "Sunken ancient ruins", SEA, (q) => {
  let r = q.vgrad(0, 0, 1920, 1080, [[0, "water", 0], [0.5, "teal", 2], [1, "navy", 0]]) + rays(q, [250, 800, 1400], 0.12);
  r += L.flat(S([[-60, 40], [300, 20], [700, 44], [1200, 22], [1600, 46], [2000, 24], [2000, -20], [-60, -20], [-60, 40]]), "white", 0.45);
  r += seaFloor(q, 860, "sand") + L.flat(P([[-20, 860], [1940, 860], [1940, 1100], [-20, 1100]], true), "teal", 0.15);
  const col = (x, y, h, broken) => { let o = q.sh(R(x - 34, y - h, 68, h, 8), "stone", { w: "detail", tone: 0 }) + q.dk(L.rect(x + 8, y - h, 26, h), "stone", 0.35) + q.sh(R(x - 46, y - 24, 92, 24, 6), "stone", { w: "detail", flat: true, tone: 1 }); if (!broken) o += q.sh(R(x - 46, y - h - 22, 92, 26, 6), "stone", { w: "detail", flat: true, tone: 0 }); else o += q.sh(P([[x - 34, y - h], [x - 10, y - h - 24], [x + 6, y - h - 6], [x + 34, y - h - 30], [x + 34, y - h]], true), "stone", { w: "detail", flat: true, tone: 0 }); return o + L.stroke(`M${x - 20} ${y - h * 0.8} v${h * 0.6}`, { c: "ink", w: "hair", op: 0.2 }) + q.hi(L.rect(x - 28, y - h, 10, h), "stone", 0.5); };
  r += col(200, 900, 360, false) + col(340, 940, 220, true) + col(1560, 900, 400, false) + col(1700, 930, 260, true) + col(1830, 960, 160, true);
  r += q.sh(R(120, 520, 330, 40, 8), "stone", { w: "detail", tone: 0 }) + q.sh(P([[180, 520], [290, 440], [400, 520]], true), "stone", { w: "detail", tone: 1 });
  r += q.sh(S([[700, 880], [760, 800], [900, 760], [1000, 800], [1060, 880]]), "stone", { w: "detail", tone: 1, flat: true }) + q.sh(R(780, 810, 240, 60, 6), "stone", { w: "detail", tone: 0, flat: true }).replace(/<path/, "<path");
  r += q.sh(S([[640, 900], [820, 880], [1100, 890], [1280, 910], [640, 910]]), "sand", { w: "detail", tone: 1 }) + q.rocks(61, 5, 440, 620, 970, 1050, 22, 40) + q.rocks(62, 5, 1300, 1480, 980, 1050, 22, 40);
  r += q.glows([[960, 760, 280, 120]], "yellow", 1, 0.2) + fish(q, 1000, 380, 0.9, "yellow") + fish(q, 1100, 440, 0.7, "yellow") + fish(q, 600, 320, 0.8, "orange", true) + bubbles(31, 8, 100, 200, 1700, 600);
  return r;
}, ["atlantis", "ruins", "sunken city", "ancient", "underwater", "columns", "temple", "myth"]);

reg("world-mountain-lake", "Mountain lake", LAND, (q) => {
  const hy = 560;
  let r = q.sky(hy, { clouds: [[300, 170, 1], [1500, 130, 0.8]], sx: 1560 });
  const mt = (x, y, w, h, c, hzv) => { const d = P([[x - w, y], [x - w * 0.25, y - h * 0.7], [x, y - h], [x + w * 0.3, y - h * 0.6], [x + w * 0.5, y - h * 0.7], [x + w, y]], true); return q.sh(d, "stone", { w: "detail", tone: c }) + q.sh(P([[x - w * 0.3, y - h * 0.72], [x, y - h], [x + w * 0.3, y - h * 0.6], [x + w * 0.12, y - h * 0.68], [x, y - h * 0.58], [x - w * 0.14, y - h * 0.66]], true), "snow", { w: "hair", flat: true }) + q.dk(P([[x, y - h], [x + w * 0.3, y - h * 0.6], [x + w * 0.5, y - h * 0.7], [x + w, y], [x + w * 0.2, y]], true), "stone", 0.35) + q.hz(d, hzv); };
  r += mt(400, 640, 460, 380, 1, 0.5) + mt(1250, 650, 560, 460, 1, 0.45) + mt(1760, 650, 380, 300, 0, 0.3) + mt(120, 660, 330, 280, 0, 0.3);
  r += q.ridge(31, 660, 70, "green", 0.2, { w: "detail", step: 180, tone: 2 });
  r += q.sh(P([[-20, 660], [1940, 660], [1940, 1100], [-20, 1100]], true), "water", { w: "detail", dir: "v", tone: 0 });
  r += L.flat(P([[-20, 660], [1940, 660], [1940, 760], [-20, 760]], true), "green", 0.25) + L.flat(P([[1260, 660], [1620, 660], [1700, 900], [1100, 900]], true), "white", 0.12) + L.flat(P([[330, 660], [560, 660], [640, 900], [240, 900]], true), "stone", 0.12);
  let wv = ""; const rr = L.rng(5); for (let i = 0; i < 18; i++) { const x = rr() * 1800, y = 690 + rr() * 220, w = 50 + rr() * 110; wv += `M${f1(x)} ${f1(y)} h${f1(w)}`; }
  r += q.line(wv, "white", 0.55, "detail");
  r += q.sh(S([[-60, 880], [200, 850], [500, 900], [420, 1100], [-60, 1100], [-60, 880]]), "grass", { w: "scene", tone: 0 }) + q.sh(S([[2000, 880], [1700, 850], [1400, 910], [1480, 1100], [2000, 1100], [2000, 880]]), "grass", { w: "scene", tone: 0 });
  r += q.sh(P([[-20, 1030], [1940, 1030], [1940, 1100], [-20, 1100]], true), "grass", { w: "detail", tone: 1 });
  r += pine(q, 120, 1000, 1.9) + pine(q, 310, 1020, 1.2) + pine(q, 1800, 1010, 2.0) + pine(q, 1620, 1030, 1.2) + q.rocks(41, 5, 700, 1200, 980, 1050, 20, 38) + q.tufts(2, 14, 0, 960, 1900, 100, "grass");
  r += q.sh(R(960, 770, 120, 14, 6), "wood", { w: "detail", flat: true }) + q.sh(P([[940, 770], [1000, 748], [1060, 770]], true), "red", { w: "detail", flat: true }) ;
  return r;
}, ["lake", "mountain", "alps", "nature", "reflection", "hiking", "calm", "wilderness"]);

const earthBall = (q, cx, cy, r) => q.glow(cx, cy, r * 1.12, "sky", 0.55, 0) + q.ball(cx, cy, r, "water", { bands: "" })
  + q.clip(C(cx, cy, r), L.flat(S([[cx - r * 0.7, cy - r * 0.55], [cx - r * 0.3, cy - r * 0.75], [cx + r * 0.05, cy - r * 0.6], [cx - r * 0.1, cy - r * 0.35], [cx - r * 0.5, cy - r * 0.2], [cx - r * 0.7, cy - r * 0.55]]), "green", 1) + L.flat(S([[cx + r * 0.2, cy - r * 0.2], [cx + r * 0.6, cy - r * 0.4], [cx + r * 0.75, cy], [cx + r * 0.45, cy + r * 0.2], [cx + r * 0.2, cy - r * 0.2]]), "green", 1) + L.flat(S([[cx - r * 0.6, cy - r * 0.8], [cx, cy - r * 0.9], [cx + r * 0.5, cy - r * 0.7], [cx, cy - r * 0.62], [cx - r * 0.6, cy - r * 0.8]]), "white", 0.8));

reg("world-spaceship-bridge", "Inside a spaceship: bridge and big window", SP, (q) => {
  let r = q.vgrad(0, 0, 1920, 1080, [[0, "navy", 1], [1, "navy", 2]]);
  const wx = 390, wy = 70, ww = 1140, wh = 440, win = R(wx, wy, ww, wh, 70);
  r += q.sh(R(wx - 36, wy - 36, ww + 72, wh + 72, 100), "gray", { tone: 0 });
  r += q.clip(win, L.tag("rect", { x: wx, y: wy, width: ww, height: wh, fill: L.c("ink") }) + q.vgrad(wx, wy, ww, wh, [[0, "ink", 0], [1, "purple", 2]]) + q.stars(8, 60, wx, wy, ww, wh) + q.glow(520, 200, 190, "yellow", 0.6, 1) + earthBall(q, 1250, 470, 280).replace(/<g/g, "<g"));
  r += L.shape(win, "glass", { w: "scene", flat: true, op: 0.0 }) + L.flat(P([[wx + 60, wy + wh - 30], [wx + 220, wy + 20], [wx + 300, wy + 20], [wx + 140, wy + wh - 30]], true), "white", 0.12);
  r += q.sh(L.rect(wx + ww / 2 - 22, wy - 30, 44, wh + 60), "gray", { tone: 1, w: "detail" });
  // ceiling light strips and wall panels
  r += q.sh(P([[0, 0], [330, 70], [330, 760], [0, 1080]], true), "navy", { tone: 1, dir: "h" }) + q.sh(P([[1920, 0], [1590, 70], [1590, 760], [1920, 1080]], true), "navy", { tone: 1, dir: "h" });
  r += q.raw(() => L.shape(R(50, 30, 220, 18, 9), "sky", { w: "detail", flat: true, tone: 1 }) + L.shape(R(1650, 30, 220, 18, 9), "sky", { w: "detail", flat: true, tone: 1 }));
  r += q.line(`M60 200 L300 250 M60 400 L300 430 M60 600 L300 610 M1860 200 L1620 250 M1860 400 L1620 430 M1860 600 L1620 610`, "ink", 0.5, "scene");
  // floor
  r += q.sh(P([[0, 800], [330, 760], [1590, 760], [1920, 800], [1920, 1100], [0, 1100]], true), "gray", { tone: 2, dir: "v" });
  r += q.line(`M960 760 L960 1100 M700 760 L440 1100 M1220 760 L1480 1100`, "ink", 0.18, "detail");
  const con = (x, flip) => {
    let c = q.sh(R(x, 720, 380, 190, 36), "gray", { tone: 0 }) + q.sh(R(x + 20, 640, 340, 100, 22), "navy", { tone: 2 });
    c += q.raw(() => L.shape(R(x + 36, 656, 308, 68, 12), "teal", { w: "detail", tone: 1, flat: true }) + L.stroke(`M${x + 54} 700 l40 -26 l36 18 l50 -30 l40 20 l60 -22 l50 8`, { c: "white", w: 6, op: 0.85 }));
    for (let i = 0; i < 6; i++) c += q.raw(() => L.shape(C(x + 60 + i * 52, 800, 13), ["red", "yellow", "green", "sky", "orange", "pink"][i], { w: "detail", tone: 1 }));
    return c + q.shd(x + 190, 910, 380);
  };
  r += con(40) + con(1500);
  r += q.glow(960, 760, 700, "sky", 0.18, 1, 160);
  return r;
}, ["spaceship", "bridge", "cockpit", "interior", "window", "sci-fi", "starship"]);

reg("world-station-window", "Space station: porthole onto Earth", SP, (q) => {
  let r = q.vgrad(0, 0, 1920, 1080, [[0, "gray", 1], [1, "gray", 2]]);
  for (let i = 0; i < 7; i++) r += q.line(`M${i * 330} 0 V800`, "ink", 0.35, "scene");
  for (let j = 0; j < 4; j++) r += q.line(`M0 ${j * 230} H1920`, "ink", 0.3, "scene");
  const rv = (() => { let d = ""; for (let i = 0; i < 7; i++) for (let j = 0; j < 4; j++) d += C(i * 330 + 18, j * 230 + 18, 6) + C(i * 330 + 312, j * 230 + 18, 6); return d; })();
  r += L.flat(rv, "ink", 0.35);
  const cx = 960, cy = 290, ro = 290, ri = 236;
  r += q.shd(cx, 880, 520);
  r += q.sh(C(cx, cy, ro), "gray", { tone: 0, w: "scene" }) + q.sh(C(cx, cy, ri + 24), "gray", { tone: 2 });
  r += q.clip(C(cx, cy, ri), L.tag("rect", { x: 0, y: 0, width: 1920, height: 900, fill: L.c("ink") }) + q.stars(21, 70, cx - ri, cy - ri, ri * 2, ri * 2) + earthBall(q, 1060, 900, 640) + q.glow(790, 160, 100, "yellow", 0.7, 1) + L.flat(P([[cx - ri + 50, cy + 190], [cx - 30, cy - ri], [cx + 20, cy - ri], [cx - ri + 100, cy + 210]], true), "white", 0.1));
  r += L.stroke(C(cx, cy, ri), { c: "ink", w: "scene" });
  r += q.raw(() => { let b = ""; for (let i = 0; i < 12; i++) { const a = (i / 12) * Math.PI * 2; b += C(cx + Math.cos(a) * (ri + 38), cy + Math.sin(a) * (ri + 38), 8); } return L.shape(b, "gold", { w: "detail", tone: 1 }); });
  r += q.sh(P([[0, 810], [1920, 810], [1920, 1100], [0, 1100]], true), "gray", { tone: 2, dir: "v" });
  r += q.line(`M0 880 H1920 M960 810 V1100`, "ink", 0.3, "detail");
  r += q.sh(R(-20, 560, 300, 22, 11), "yellow", { w: "detail", tone: 0 }) + q.sh(L.rect(30, 580, 14, 230), "yellow", { w: "detail" }) + q.sh(R(1640, 560, 300, 22, 11), "yellow", { w: "detail" }) + q.sh(L.rect(1876, 580, 14, 230), "yellow", { w: "detail" });
  return r;
}, ["space station", "iss", "porthole", "window", "earth", "orbit", "interior"]);

reg("world-deep-space-galaxy", "Deep space with a spiral galaxy", SP, (q) => {
  let r = spaceSky(q, 25, ["ink", 0], ["purple", 2]);
  const cx = 1280, cy = 300, arms = (c, tone, op, lo, hi, n) => { const list = []; for (let a = 0; a < 2; a++) for (let i = 0; i <= n; i++) { const t = i / n, ang = a * Math.PI + t * 2.7 * Math.PI, rad = 30 + t * 470; list.push([cx + Math.cos(ang) * rad, cy + Math.sin(ang) * rad * 0.4, lo + (1 - t) * hi]); } return q.glows(list, c, tone, op); };
  r += L.g(q.glow(cx, cy, 480, "purple", 0.55, 0, 200) + arms("pink", 0, 0.5, 26, 40, 34) + arms("sky", 1, 0.45, 18, 26, 30) + q.glow(cx, cy, 120, "gold", 0.95, 1, 55) + q.glow(cx, cy, 52, "white", 1, 0, 26), `rotate(-22 ${cx} ${cy})`);
  r += q.glow(300, 700, 380, "pink", 0.28, 0, 160) + q.glow(520, 820, 300, "teal", 0.2, 0, 120) + q.glow(1640, 760, 340, "purple", 0.4, 1, 150);
  r += L.g(q.glow(300, 160, 90, "glass", 0.5, 0, 28) + q.glow(300, 160, 22, "white", 0.9, 0, 9), "rotate(25 300 160)");
  r += L.g(q.glow(1700, 880, 70, "gold", 0.45, 0, 22), "rotate(-35 1700 880)");
  return r;
}, ["galaxy", "milky way", "universe", "stars", "space", "cosmos", "nebula"]);

reg("world-black-hole-glow", "Inside a black hole's glow (calm)", SP, (q) => {
  let r = q.vgrad(0, 0, 1920, 1080, [[0, "ink", 0], [0.45, "purple", 2], [1, "navy", 2]]) + q.stars(30, 50, 0, 0, 1920, 1080);
  const cx = 960, cy = 400;
  r += q.glow(cx, cy, 1000, "orange", 0.3, 0, 560) + q.glow(cx, cy, 700, "pink", 0.35, 1, 320);
  r += L.g(L.flat(C(cx, cy, 820, 130), "orange", 0.35) + L.flat(C(cx, cy, 640, 92), "gold", 0.55) + L.flat(C(cx, cy, 470, 56), "yellow", 0.7) + L.flat(C(cx, cy, 330, 30), "cream", 0.8), `rotate(-6 ${cx} ${cy})`);
  r += L.stroke(C(cx, cy, 230, 210), { c: "gold", w: 28, op: 0.55 }) + L.stroke(C(cx, cy, 214, 194), { c: "cream", w: 8, op: 0.9 });
  r += L.shape(C(cx, cy, 196, 180), "ink", { w: "detail", flat: true, c: L.c("ink") });
  r += L.g(L.flat(C(cx, cy + 40, 520, 44), "yellow", 0.65) + L.flat(C(cx, cy + 40, 330, 22), "cream", 0.85), `rotate(-6 ${cx} ${cy})`);
  r += q.glow(960, 1080, 900, "purple", 0.4, 1, 240);
  return r;
}, ["black hole", "singularity", "glow", "accretion", "event horizon", "space", "calm"]);

reg("world-alien-planet", "Alien planet with two moons", SP, (q) => {
  let r = q.vgrad(0, 0, 1920, 800, [[0, "purple", 2], [0.55, "teal", 2], [1, "pink", 1]]) + q.stars(35, 40, 0, 0, 1920, 380);
  r += q.glow(430, 240, 360, "pink", 0.5, 1) + q.ball(430, 240, 128, "pink", { bands: bandStripes(q, 430, 240, 128, [[-70, 30, "purple", 1, 0.45], [-10, 36, "white", 0, 0.4], [50, 26, "purple", 0, 0.4]]) }) + q.ball(1500, 180, 54, "teal", { shade: 0.3 });
  r += q.ridge(51, 700, 150, "purple", 0.6, { tone: 1, step: 170 }) + q.ridge(52, 770, 80, "purple", 0.3, { tone: 2, step: 150 });
  r += q.ground(800, "purple", { tone: 1 });
  const bulb = (x, y, h, k) => { let b = q.shd(x, y, 80 * k) + L.shape(L.limb([[x, y], [x + 14 * k, y - h * 0.5], [x - 10 * k, y - h]], 20 * k, 12 * k), "teal", { w: "detail", tone: 2, flat: true }); return b + q.glow(x - 10 * k, y - h, 90 * k, "teal", 0.55, 1) + q.raw(() => L.shape(C(x - 10 * k, y - h, 40 * k), "teal", { w: "detail", tone: 1 }) + L.flat(C(x - 22 * k, y - h - 12 * k, 12 * k), "white", 0.8)); };
  r += bulb(120, 900, 330, 1.2) + bulb(300, 1010, 220, 1) + bulb(1560, 880, 380, 1.3) + bulb(1790, 1000, 250, 1.1) + bulb(1400, 1020, 160, 0.8);
  const spike = (x, y, h, w) => q.sh(P([[x - w, y], [x - w * 0.3, y - h], [x + w * 0.2, y - h * 0.8], [x + w, y]], true), "pink", { w: "detail", tone: 0 });
  r += spike(480, 880, 170, 34) + spike(520, 890, 110, 26) + spike(1280, 890, 140, 30) + spike(1330, 880, 200, 38);
  r += q.glows(rgn(36, 14, 100, 420, 1700, 360).map(([x, y, k]) => [x, y, 10 + k * 14]), "teal", 1, 0.8);
  return r;
}, ["alien", "planet", "exoplanet", "sci-fi", "moons", "glow plants", "weird"]);

reg("world-nebula-void", "Colourful nebula in deep space", SP, (q) => {
  let r = q.vgrad(0, 0, 1920, 1080, [[0, "ink", 0], [1, "navy", 2]]);
  r += q.glows([[400, 300, 520, 300], [1500, 250, 560, 280], [900, 700, 640, 260], [200, 800, 420, 220], [1700, 800, 460, 240]], "purple", 1, 0.55);
  r += q.glows([[300, 260, 320, 180], [1380, 330, 380, 190], [1000, 820, 400, 160], [1750, 700, 300, 160]], "pink", 1, 0.5);
  r += q.glows([[620, 200, 300, 140], [1100, 130, 360, 120], [380, 780, 260, 120], [1500, 620, 300, 150]], "teal", 1, 0.4);
  r += q.glows([[760, 340, 160, 90], [1560, 380, 200, 90], [260, 400, 160, 80]], "orange", 0, 0.35);
  r += q.stars(40, 150, 0, 0, 1920, 1080);
  const pillar = (x, w, h, flipx) => { const d = S([[x - w, 1100], [x - w * 0.8, 1100 - h * 0.5], [x - w * 0.5, 1100 - h * 0.85], [x, 1100 - h], [x + w * 0.5, 1100 - h * 0.8], [x + w * 0.9, 1100 - h * 0.4], [x + w, 1100], [x - w, 1100]]); return L.flat(d, "ink", 0.85) + L.stroke(d, { c: "orange", w: 7, op: 0.35 }) + q.glow(x, 1100 - h, w * 1.2, "orange", 0.3, 0); };
  r += pillar(180, 120, 520) + pillar(380, 80, 320) + pillar(1700, 130, 560) + pillar(1560, 90, 300);
  return r;
}, ["nebula", "colourful", "space", "cosmic", "clouds", "gas", "pillars"]);

// ===================== SEA =====================
const fish = (q, x, y, s, c, flip) => L.g(q.sh(S([[-30, 0], [-10, -14], [22, -8], [34, 0], [22, 8], [-10, 14], [-30, 0]]), c, { w: "detail", flat: true }) + q.sh(P([[28, 0], [54, -17], [48, 0], [54, 17]], true), c, { w: "detail", flat: true, tone: 2 }) + L.flat(C(-16, -3, 3.2), "ink", 1) + L.flat(S([[-6, -11], [8, -6], [10, 6], [-6, 11]]), "white", 0.3), `translate(${x} ${y}) scale(${flip ? -s : s} ${s})`);
const rays = (q, xs, op = 0.12) => xs.map((x) => L.flat(P([[x, 0], [x + 70, 0], [x + 260, 940], [x - 150, 940]], true), "white", q.night ? op * 0.4 : op)).join("");
const bubbles = (seed, n, x0, y0, w, h) => { const r = L.rng(seed); let d = ""; for (let i = 0; i < n; i++) d += C(x0 + r() * w, y0 + r() * h, 5 + r() * 12); return L.stroke(d, { c: "white", w: "hair", op: 0.75 }); };
const coral = (q, kind, x, y, s, c) => {
  let o = "";
  if (kind === "tube") [[-40, 150], [-10, 220], [24, 170], [52, 110]].forEach(([dx, h], i) => { o += q.sh(R(x + dx * s - 15 * s, y - h * s, 30 * s, h * s + 10, 15 * s), c, { w: "detail", tone: i % 2 }) + L.flat(C(x + dx * s, y - h * s + 14 * s, 8 * s, 4 * s), "ink", 0.35); });
  else if (kind === "fan") { const d = S([[x - 90 * s, y], [x - 110 * s, y - 120 * s], [x - 50 * s, y - 210 * s], [x + 20 * s, y - 230 * s], [x + 90 * s, y - 170 * s], [x + 100 * s, y - 80 * s], [x + 70 * s, y]]); o += q.sh(d, c, { w: "detail" }) + q.line([-60, -30, 0, 40, 60].map((a) => `M${f1(x + a * s * 0.3)} ${f1(y)} L${f1(x + a * s)} ${f1(y - 190 * s)}`).join(""), "ink", 0.35); }
  else if (kind === "brain") o += q.sh(q.blob(x, y - 60 * s, 110 * s, 70 * s, 9, 0.06), c, { w: "detail" }) + q.line(`M${x - 70 * s} ${y - 70 * s} q30 -25 60 0 t60 0 M${x - 60 * s} ${y - 40 * s} q30 -25 60 0 t60 0 M${x - 50 * s} ${y - 95 * s} q25 -18 50 0 t50 0`, "ink", 0.35);
  else { // branching
    const br = (px, py, a, len, dep) => { if (dep === 0) return ""; const qx = px + Math.cos(a) * len, qy = py + Math.sin(a) * len; return q.sh(L.limb([[px, py], [qx, qy]], 22 * s * dep / 3 + 8, 12), c, { w: "hair", flat: true, tone: dep % 2 }) + br(qx, qy, a - 0.55, len * 0.72, dep - 1) + br(qx, qy, a + 0.5, len * 0.72, dep - 1); };
    o += br(x, y, -Math.PI / 2, 80 * s, 3);
  }
  return o;
};
const seaFloor = (q, y, c = "sand") => q.sh(S([[-60, y + 30], [300, y], [700, y + 30], [1200, y + 10], [1600, y - 20], [2000, y + 20], [2000, 1100], [-60, 1100], [-60, y + 30]]), c, { dir: "v" });
const reefScene = (q) => {
  let r = q.vgrad(0, 0, 1920, 1080, q.night ? [[0, "night", 0], [0.5, "navy", 0], [1, "navy", 2]] : [[0, "water", 1], [0.5, "water", 0], [1, "water", 2]]);
  r += rays(q, [160, 560, 980, 1380, 1700]);
  r += L.flat(S([[-60, 40], [300, 20], [700, 44], [1200, 22], [1600, 46], [2000, 24], [2000, -20], [-60, -20], [-60, 40]]), "white", q.night ? 0.2 : 0.55);
  // far reef blobs
  [[160, 700, 200], [700, 740, 130], [1300, 720, 150], [1760, 700, 210]].forEach(([x, y, w], i) => { const d = q.blob(x, y, w, w * 0.55, 6, 0.12, i); r += q.sh(d, "teal", { w: "detail", flat: true, tone: 1 }) + q.hz(d, 0.8); });
  r += seaFloor(q, 830) + (q.night ? L.flat(P([[-20, 800], [1940, 800], [1940, 1100], [-20, 1100]], true), "navy", 0.45) : "");
  r += coral(q, "tube", 130, 900, 1.2, "pink") + coral(q, "fan", 330, 940, 1, "orange") + coral(q, "brain", 470, 990, 0.8, "yellow") + coral(q, "branch", 230, 1030, 1.1, "red");
  r += coral(q, "branch", 1520, 930, 1.3, "orange") + coral(q, "tube", 1720, 960, 1.1, "purple") + coral(q, "brain", 1610, 1030, 0.9, "pink") + coral(q, "fan", 1840, 1040, 0.9, "red");
  r += fish(q, 360, 480, 1.1, "orange") + fish(q, 450, 440, 0.8, "orange") + fish(q, 300, 400, 0.9, "yellow", true) + fish(q, 1500, 380, 1.3, "blue") + fish(q, 1620, 450, 0.9, "yellow") + fish(q, 1760, 330, 0.7, "pink", true) + fish(q, 760, 250, 0.6, "gold");
  r += bubbles(7, 9, 80, 200, 1700, 500);
  if (q.night) [[940, 300, 1], [1100, 430, 0.7], [700, 380, 0.6]].forEach(([x, y, k]) => { r += q.glow(x, y, 120 * k, "pink", 0.5, 1) + q.raw(() => L.shape(S([[x - 50 * k, y + 10 * k], [x - 40 * k, y - 40 * k], [x, y - 60 * k], [x + 40 * k, y - 40 * k], [x + 50 * k, y + 10 * k], [x, y]]), "pink", { w: "detail", flat: true, tone: 1 }) + L.stroke(`M${x - 28 * k} ${y + 6 * k} q-10 40 6 70 M${x} ${y + 6 * k} q10 40 -6 80 M${x + 28 * k} ${y + 6 * k} q-8 40 8 66`, { c: "pink", w: "hair" })); });
  if (q.night) r += q.glows([[320, 620, 40], [1500, 560, 50], [900, 300, 30], [200, 400, 30], [1700, 700, 36]], "sky", 1, 0.9) + q.glows(rgn(5, 30, 0, 100, 1920, 700).map(([x, y, k]) => [x, y, 5 + k * 6]), "yellow", 1, 0.9);
  return r;
};
regT("world-reef", "Coral reef", SEA, reefScene, ["reef", "coral", "underwater", "ocean", "fish", "sea"], ["day", "night"]);

reg("world-ocean-trench", "Deep ocean trench", SEA, (q) => {
  let r = q.vgrad(0, 0, 1920, 1080, [[0, "water", 2], [0.35, "navy", 0], [1, "ink", 0]]);
  r += L.flat(P([[820, 0], [1100, 0], [1300, 800], [640, 800]], true), "sky", 0.07);
  const wall = (side) => { const k = side ? -1 : 1, x0 = side ? 1920 : 0, pts = [[x0, 0], [x0 + k * 380, 0], [x0 + k * 330, 250], [x0 + k * 440, 480], [x0 + k * 380, 700], [x0 + k * 520, 900], [x0 + k * 500, 1100], [x0, 1100]]; const d = S(pts) + " Z"; return q.sh(d, "stone", { tone: 2, dir: "h", w: "scene" }) + L.flat(d, "navy", 0.45) + q.line(`M${x0 + k * 60} 100 q${k * 120} 80 ${k * 60} 220 M${x0 + k * 100} 420 q${k * 140} 100 ${k * 60} 250 M${x0 + k * 40} 700 q${k * 160} 60 ${k * 100} 300`, "ink", 0.5, "scene"); };
  r += wall(0) + wall(1);
  r += q.sh(S([[-60, 1040], [300, 1030], [700, 990], [1200, 1010], [1620, 1030], [2000, 1040], [2000, 1100], [-60, 1100], [-60, 1040]]), "stone", { tone: 2, dir: "v", w: "detail" });
  // black smoker + tube worms
  r += q.sh(P([[1380, 1040], [1410, 900], [1450, 880], [1490, 900], [1520, 1040]], true), "stone", { tone: 2, w: "detail" }) + q.glows([[1450, 800, 120, 200]], "gray", 0, 0.6) + q.glows([[1440, 720, 90, 130], [1470, 620, 80, 100]], "gray", 2, 0.5);
  r += q.glow(1450, 890, 160, "orange", 0.5, 1);
  [1320, 1340, 1360].forEach((x, i) => { r += q.sh(R(x, 960 - i * 12, 12, 70 + i * 12, 6), "white", { w: "hair", flat: true }) + q.raw(() => L.shape(C(x + 6, 958 - i * 12, 8), "red", { w: "hair", flat: true })); });
  // anglerfish far + glowing life
  r += q.glow(520, 360, 140, "yellow", 0.55, 1) + q.raw(() => L.shape(C(520, 360, 12), "yellow", { w: "detail", flat: true, tone: 1 })) + q.sh(S([[560, 410], [620, 360], [700, 380], [720, 430], [670, 470], [590, 460], [560, 410]]), "navy", { w: "detail", flat: true, tone: 1 }) + L.stroke(`M610 366 Q570 330 524 358`, { c: "ink", w: "hair" }) + L.flat(C(660, 408, 5), "yellow", 0.9);
  r += q.glows(rgn(3, 26, 420, 120, 1080, 760).map(([x, y, k]) => [x, y, 6 + k * 7]), "sky", 1, 0.9) + q.glows(rgn(4, 12, 420, 200, 1080, 600).map(([x, y, k]) => [x, y, 10 + k * 12]), "teal", 1, 0.8);
  r += bubbles(9, 5, 700, 250, 500, 500);
  return r;
}, ["trench", "deep sea", "abyss", "mariana", "dark ocean", "pressure", "underwater", "bioluminescent"]);

reg("world-kelp-forest", "Kelp forest", SEA, (q) => {
  let r = q.vgrad(0, 0, 1920, 1080, [[0, "teal", 1], [0.5, "water", 0], [1, "green", 2]]);
  r += rays(q, [100, 480, 900, 1300, 1650], 0.14);
  const strand = (x, y, h, ph, c, w, far) => { const pts = []; for (let i = 0; i <= 5; i++) pts.push([x + Math.sin(i * 1.4 + ph) * 38 * (i / 5), y - (h * i) / 5]); const d = L.limb(pts, w, w * 0.45); return q.sh(d, c, { w: "detail", flat: true, tone: far ? 0 : 1 }) + (far ? q.hz(d, 0.6) : q.hi(L.limb(pts.map(([a, b]) => [a - w * 0.18, b]), w * 0.25, w * 0.1), c, 0.5)); };
  for (let i = 0; i < 9; i++) r += strand(80 + i * 220 + (i % 3) * 20, 880, 520 + (i % 4) * 90, i, "green", 26, true);
  r += seaFloor(q, 850, "sand") + L.flat(P([[-20, 850], [1940, 850], [1940, 1100], [-20, 1100]], true), "green", 0.12);
  [[60, 1000, 780, 56], [190, 1040, 640, 48], [330, 1010, 700, 40], [1560, 1010, 720, 44], [1700, 1040, 800, 52], [1850, 1000, 620, 44]].forEach(([x, y, h, w], i) => r += strand(x, y, h, i * 2, "green", w));
  r += fish(q, 420, 500, 0.9, "orange") + fish(q, 520, 560, 0.7, "orange") + fish(q, 1480, 420, 1.1, "yellow", true) + fish(q, 1380, 500, 0.8, "yellow", true) + fish(q, 1290, 330, 0.6, "orange", true);
  r += q.rocks(77, 5, 400, 540, 960, 1040, 26, 48, "stone") + q.rocks(78, 5, 1330, 1480, 970, 1040, 26, 48, "stone");
  r += bubbles(11, 8, 100, 200, 1700, 600);
  return r;
}, ["kelp", "seaweed", "underwater", "forest", "ocean", "green"]);

const oceanTop = (q) => {
  const hy = 620, sunset = q.sunset;
  let r = q.sky(hy, { sx: sunset ? 1000 : 1400, sy: sunset ? hy - 40 : 170, clouds: [[320, 190, 1], [900, 130, 0.7], [1620, 300, 0.9]] });
  r += q.raw(() => L.tag("rect", { x: 0, y: hy, width: 1920, height: 8, fill: L.c("white"), opacity: 0.0 }));
  r += (sunset ? q.vgrad(-20, hy, 1960, 480, [[0, "orange", 1], [0.3, "pink", 0], [1, "purple", 1]]) + L.stroke(`M-20 ${hy} H1940`, { c: "ink", w: "scene", op: 0.5 }) : q.sh(P([[-20, hy], [1940, hy], [1940, 1100], [-20, 1100]], true), "water", { dir: "v", tone: 0 }) + q.hz(`M-20 ${hy} H1940 V${hy + 40} H-20Z`, 0.7));
  const sx = sunset ? 1000 : 1400;
  const dashes = (() => { let d = ""; for (let i = 0; i < 9; i++) { const y = hy + 24 + i * 38, w = 40 + i * 28; d += `M${sx - w} ${y} h${w * 2}`; } return d; })();
  r += L.stroke(dashes, { c: sunset ? "yellow" : "white", w: 8, op: sunset ? 0.7 : 0.55 });
  let wv = ""; const rr = L.rng(3); for (let i = 0; i < 26; i++) { const x = rr() * 1900, y = hy + 20 + rr() * 440, w = 30 + (y - hy) * 0.18; wv += `M${f1(x)} ${f1(y)} q${f1(w / 2)} ${f1(-w / 4)} ${f1(w)} 0`; }
  r += q.line(wv, "white", 0.55, "detail");
  // distant sailboat and island
  r += q.sh(S([[1500, hy + 2], [1600, hy - 26], [1720, hy - 20], [1790, hy + 2]]), "green", { w: "detail", flat: true, tone: 2 }) + q.hz(S([[1500, hy + 2], [1600, hy - 26], [1720, hy - 20], [1790, hy + 2]]), 0.7);
  r += q.sh(P([[330, hy + 36], [470, hy + 36], [450, hy + 54], [350, hy + 54]], true), "wood", { w: "detail", flat: true }) + q.sh(P([[395, hy + 34], [395, hy - 70], [450, hy + 34]], true), "white", { w: "detail", flat: true }) + L.stroke(`M395 ${hy + 36} V${hy - 76}`, { c: "wood", w: "hair" });
  return r;
};
regT("world-open-ocean", "Open ocean", SEA, oceanTop, ["ocean", "sea", "water", "horizon", "sailing", "calm"], ["day", "sunset"]);

reg("world-shipwreck", "Sunken ship and treasure", SEA, (q) => {
  let r = q.vgrad(0, 0, 1920, 1080, [[0, "water", 1], [0.5, "water", 0], [1, "navy", 0]]) + rays(q, [300, 800, 1400], 0.12);
  r += L.flat(S([[-60, 40], [300, 20], [700, 44], [1200, 22], [1600, 46], [2000, 24], [2000, -20], [-60, -20], [-60, 40]]), "white", 0.5);
  r += seaFloor(q, 850, "sand");
  const hull = P([[40, 0], [80, -200], [150, -300], [520, -330], [620, -250], [660, -90], [600, 0]], true);
  let ship = q.sh(S([[40, 0], [80, -200], [150, -300], [520, -330], [620, -250], [660, -90], [600, 0], [40, 0]]), "wood", { dir: "v" });
  ship += q.line(`M70 -80 H640 M92 -150 H650 M118 -220 H640 M150 -280 H620`, "ink", 0.45, "scene");
  [[180, -170], [300, -190], [430, -200]].forEach(([x, y]) => ship += q.sh(C(x, y, 34), "navy", { w: "detail", tone: 1, flat: true }) + L.stroke(C(x, y, 34), { c: "gold", w: 8 }) + L.flat(C(x - 10, y - 10, 9), "white", 0.5));
  ship += q.sh(L.rect(360, -700, 28, 380), "wood", { w: "detail", tone: 2 }) + q.sh(P([[388, -690], [520, -640], [520, -520], [472, -480], [388, -520]], true), "paper", { w: "detail", flat: true, tone: 2 }) + q.line(`M400 -560 l40 20 M420 -640 l20 40`, "ink", 0.4, "detail") + q.sh(P([[360, -420], [300, -440], [330, -390]], true), "paper", { w: "detail", flat: true, tone: 2 });
  ship += q.sh(L.rect(120, -340, 400, 30), "wood", { w: "detail", tone: 2 });
  r += q.shd(300, 860, 700) + L.g(ship, "translate(60 870) rotate(-9)");
  r += q.rocks(81, 6, 400, 560, 940, 1040, 20, 38) + q.rocks(82, 8, 1380, 1860, 900, 1040, 20, 44);
  // chest + coins
  const cx = 1560, cy = 960;
  r += q.shd(cx, cy, 240) + q.sh(R(cx - 100, cy - 80, 200, 80, 14), "wood", { w: "prop" }) + q.sh(S([[cx - 100, cy - 80], [cx - 90, cy - 130], [cx, cy - 150], [cx + 90, cy - 130], [cx + 100, cy - 80]]), "wood", { w: "prop", tone: 1 }) + q.sh(L.rect(cx - 12, cy - 100, 24, 40), "gold", { w: "detail" }) + L.stroke(`M${cx - 70} ${cy - 135} V${cy} M${cx + 70} ${cy - 135} V${cy}`, { c: "gold", w: 10 });
  r += q.raw(() => L.shape(C(cx - 130, cy - 8, 16) + C(cx - 160, cy - 4, 14) + C(cx + 140, cy - 6, 15), "gold", { w: "detail", flat: true, tone: 1 })) + q.glow(cx, cy - 60, 190, "yellow", 0.35, 1);
  r += fish(q, 1100, 360, 0.9, "pink") + fish(q, 1180, 420, 0.7, "pink") + fish(q, 700, 300, 0.8, "yellow", true) + bubbles(13, 7, 100, 200, 1700, 600);
  return r;
}, ["shipwreck", "sunken ship", "pirate", "treasure", "ocean floor", "underwater", "titanic"]);

reg("world-iceberg-sea", "Iceberg above and below the water", SEA, (q) => {
  const hy = 480;
  let r = q.vgrad(0, 0, 1920, hy + 40, [[0, "sky", 2], [1, "sky", 1]]) + q.cloud(300, 170, 0.9) + q.cloud(1500, 120, 0.7) + q.glow(1550, 150, 300, "yellow", 0.35, 1) + q.raw(() => L.shape(C(1550, 150, 52), "yellow", { w: "scene" }));
  r += q.vgrad(0, hy, 1920, 620, [[0, "water", 1], [0.4, "water", 0], [1, "navy", 0]]) + rays(q, [1000, 1400], 0.08);
  const under = S([[130, hy], [60, hy + 120], [100, hy + 300], [260, hy + 470], [480, hy + 540], [700, hy + 450], [820, hy + 280], [790, hy + 120], [720, hy], [130, hy]]);
  r += q.sh(under, "glass", { tone: 2, dir: "v", w: "scene" }) + L.flat(under, "water", 0.45) + q.line(`M220 ${hy + 160} L330 ${hy + 330} M600 ${hy + 120} L520 ${hy + 300} L560 ${hy + 440}`, "white", 0.6, "scene");
  const above = P([[130, hy], [190, hy - 140], [270, hy - 180], [340, hy - 330], [420, hy - 200], [520, hy - 250], [640, hy - 120], [720, hy]], true);
  r += q.sh(above, "snow", { dir: "diag" }) + L.flat(P([[420, hy - 200], [520, hy - 250], [640, hy - 120], [720, hy], [560, hy]], true), "glass", 0.55) + q.line(`M340 ${hy - 330} L360 ${hy - 120} M270 ${hy - 180} L300 ${hy - 40}`, "glass", 0.7, "scene");
  r += L.stroke(`M-20 ${hy} H1940`, { c: "ink", w: "scene", op: 0.6 }) + L.flat(P([[-20, hy], [1940, hy], [1940, hy + 16], [-20, hy + 16]], true), "white", 0.3);
  r += q.sh(P([[1500, hy], [1560, hy - 60], [1650, hy - 80], [1720, hy]], true), "snow", { w: "detail" }) + q.sh(S([[1480, hy], [1470, hy + 90], [1600, hy + 150], [1740, hy + 80], [1730, hy], [1480, hy]]), "glass", { w: "detail", tone: 1 });
  r += fish(q, 1180, 800, 0.8, "orange") + fish(q, 1260, 850, 0.6, "orange") + bubbles(14, 6, 900, 600, 900, 400);
  return r;
}, ["iceberg", "ice", "melting", "arctic", "ocean", "climate", "titanic", "cross section"]);

// ===================== UNDERGROUND =====================
const stalac = (q, seed, n, x0, x1, y0, hmin, hmax, c = "stone", tone = 2) => {
  const r = L.rng(seed); let o = "";
  for (let i = 0; i < n; i++) { const x = x0 + (i + r() * 0.6) * ((x1 - x0) / n), w = 28 + r() * 40, h = hmin + r() * (hmax - hmin); o += q.sh(P([[x - w, y0 - 40], [x - w * 0.15, y0 + h], [x + w * 0.15, y0 + h], [x + w, y0 - 40]], true), c, { w: "detail", flat: true, tone }); }
  return o;
};
const crystal = (q, x, y, h, w, c, lean = 0) => {
  const d = P([[x - w, y], [x - w * 0.8 + lean * 0.2, y - h * 0.7], [x + lean, y - h], [x + w * 0.8 + lean * 0.2, y - h * 0.7], [x + w, y]], true);
  return q.raw(() => L.shape(d, c, { w: "detail", tone: 0 }) + L.flat(P([[x - w * 0.7, y], [x - w * 0.55 + lean * 0.2, y - h * 0.65], [x + lean, y - h * 0.92], [x - w * 0.1, y - h * 0.4], [x - w * 0.2, y]], true), "white", 0.4) + L.stroke(`M${f1(x + lean)} ${f1(y - h)} L${f1(x + w * 0.1)} ${f1(y)}`, { c: "ink", w: "hair", op: 0.4 }));
};
const caveShell = (q, wall, inner) => {
  const l = S([[-60, -20], [420, -20], [380, 160], [470, 360], [330, 560], [420, 760], [300, 960], [-60, 1100]]) + " L-60 -20 Z";
  const rr = S([[1980, -20], [1500, -20], [1540, 160], [1450, 360], [1590, 560], [1500, 760], [1620, 960], [1980, 1100]]) + " L1980 -20 Z";
  const ceil = S([[-60, -20], [300, 120], [700, 60], [1100, 150], [1500, 70], [1980, -20]]) + " L1980 -40 L-60 -40 Z";
  return q.sh(l, wall, { tone: 2, dir: "h" }) + q.sh(rr, wall, { tone: 2, dir: "h" }) + q.sh(ceil, wall, { tone: 2, dir: "v" });
};

reg("world-crystal-cave", "Cave full of glowing crystals", UG, (q) => {
  let r = q.vgrad(0, 0, 1920, 1080, [[0, "navy", 2], [1, "purple", 2]]);
  r += q.glows([[960, 520, 700, 420]], "purple", 1, 0.35);
  r += q.sh(S([[-60, 880], [400, 850], [900, 890], [1500, 850], [2000, 880], [2000, 1100], [-60, 1100], [-60, 880]]), "purple", { tone: 1, dir: "v" });
  r += caveShell(q, "purple");
  r += stalac(q, 4, 9, 300, 1620, 110, 60, 200, "purple", 1);
  const cl = [["pink", 250, 760, 330, 56, -20], ["teal", 150, 830, 220, 44, 10], ["sky", 360, 860, 170, 36, -10], ["pink", 80, 560, 200, 38, 30], ["teal", 1680, 740, 340, 58, 20], ["sky", 1800, 830, 230, 46, -10], ["pink", 1560, 870, 180, 36, 10], ["teal", 1850, 520, 200, 38, -30]];
  cl.forEach(([c, x, y, h, w, l], i) => r += q.glow(x, y - h * 0.5, h * 0.9, c, 0.5, 1));
  cl.forEach(([c, x, y, h, w, l]) => { r += crystal(q, x, y, h, w, c, l) + crystal(q, x + w * 1.6, y + 20, h * 0.55, w * 0.7, c, l * 0.5) + crystal(q, x - w * 1.3, y + 24, h * 0.45, w * 0.6, c, -l * 0.5); });
  r += q.glows(rgn(8, 18, 400, 200, 1100, 600).map(([x, y, k]) => [x, y, 6 + k * 8]), "white", 0, 0.8);
  r += q.glow(960, 120, 400, "pink", 0.25, 1, 120);
  return r;
}, ["cave", "crystals", "gems", "glowing", "underground", "mine", "fantasy"]);

reg("world-glowworm-cave", "Glowworm cave over still water", UG, (q) => {
  let r = q.vgrad(0, 0, 1920, 1080, [[0, "night", 2], [0.5, "navy", 1], [1, "teal", 2]]);
  const ceil = S([[-60, 300], [300, 380], [700, 270], [1100, 400], [1500, 290], [1980, 360]]) + " L1980 -40 L-60 -40 Z";
  r += q.sh(ceil, "night", { tone: 1, dir: "v" }) + q.glows([[960, 330, 1100, 260, 1]], "teal", 1, 0.34);
  r += stalac(q, 12, 12, 100, 1840, 300, 40, 210, "night", 1);
  const rr = L.rng(21), gl = [];
  for (let i = 0; i < 150; i++) gl.push([rr() * 1920, 150 + rr() * 330 * (0.5 + rr() * 0.5), 8 + rr() * 14]);
  // silk threads hanging from the ceiling, each with a bright worm at the end
  let th = ""; for (let i = 0; i < 46; i++) { const x = rr() * 1920, y0 = 300 + Math.sin(x / 300) * 40, len = 50 + rr() * 150; th += `M${f1(x)} ${f1(y0)} V${f1(y0 + len)}`; gl.push([x, y0 + len, 14 + rr() * 10]); }
  r += q.line(th, "teal", 0.55, "hair");
  r += q.glows(gl, "teal", 1, 1) + q.glows(gl.map(([x, y]) => [x, y, 4.5]), "white", 0, 1);
  const water = P([[-20, 640], [1940, 640], [1940, 1100], [-20, 1100]], true);
  r += q.sh(water, "teal", { dir: "v", tone: 2, w: "detail" }) + L.flat(water, "navy", 0.35) + q.glows(gl.slice(0, 90).map(([x, y]) => [x, 1010 - y * 0.8 + 100, 12 + (y % 8), 5]), "teal", 1, 0.7);
  r += q.line(`M80 700 h200 M600 730 h300 M1240 700 h260 M1620 760 h200 M300 860 h360 M1100 900 h400 M780 800 h180 M1400 840 h240`, "teal", 0.8, "detail");
  const rock = (d) => q.sh(d, "night", { tone: 0, w: "detail" }) + q.hi(d, "teal", 0.18);
  r += rock(S([[-60, 760], [160, 700], [330, 780], [500, 900], [-60, 900], [-60, 760]])) + rock(S([[2000, 740], [1780, 700], [1620, 800], [1500, 930], [2000, 930], [2000, 740]]));
  r += rock(S([[-60, 960], [200, 980], [400, 1040], [-60, 1100]])) + rock(S([[2000, 960], [1740, 990], [1560, 1050], [2000, 1100]]));
  return r;
}, ["glowworm", "cave", "underground", "water", "glow", "dark", "new zealand", "magical"]);

reg("world-mine-tunnel", "Mine tunnel with rails and lanterns", UG, (q) => {
  const vx = 960, vy = 480;
  let r = q.vgrad(0, 0, 1920, 1080, [[0, "brown", 2], [1, "brown", 1]]);
  r += q.glow(vx, vy, 360, "yellow", 0.7, 1) + L.shape(S([[vx - 130, vy + 90], [vx - 130, vy - 60], [vx, vy - 120], [vx + 130, vy - 60], [vx + 130, vy + 90], [vx - 130, vy + 90]]), "yellow", { w: "detail", flat: true, tone: 1 }) ;
  r += q.glow(vx, vy, 260, "cream", 0.6, 0);
  // receding wooden frames (far to near)
  [[0.2, 0], [0.34, 0], [0.55, 0], [0.9, 0]].forEach(([k], i) => {
    const hw = 130 + 800 * k, top = vy - 60 - 560 * k, bot = vy + 90 + 760 * k;
    r += L.stroke(`M${vx - hw} ${bot} V${top + 80} Q${vx - hw} ${top} ${vx - hw + 90} ${top} H${vx + hw - 90} Q${vx + hw} ${top} ${vx + hw} ${top + 80} V${bot}`, { c: "wood", w: 14 + 46 * k, op: 1 });
    r += L.stroke(`M${vx - hw} ${bot} V${top + 80} Q${vx - hw} ${top} ${vx - hw + 90} ${top} H${vx + hw - 90} Q${vx + hw} ${top} ${vx + hw} ${top + 80} V${bot}`, { c: "ink", w: "scene", op: 0.0 });
  });
  const floor = P([[vx - 150, vy + 92], [vx + 150, vy + 92], [1920, 1100], [0, 1100]], true);
  r += q.sh(floor, "earth", { tone: 2, dir: "v", w: "detail" }) + L.flat(floor, "ink", 0.25);
  r += q.sh(P([[0, 0], [vx - 220, vy - 130], [vx - 130, vy + 90], [0, 1100]], true), "brown", { tone: 2, dir: "h", w: "detail" }) + q.sh(P([[1920, 0], [vx + 220, vy - 130], [vx + 130, vy + 90], [1920, 1100]], true), "brown", { tone: 2, dir: "h", w: "detail" });
  r += L.flat(P([[0, 0], [1920, 0], [vx + 220, vy - 130], [vx - 220, vy - 130]], true), "ink", 0.3);
  // rails + sleepers
  let sl = ""; for (let i = 0; i < 9; i++) { const t = Math.pow(i / 9, 2), y = vy + 100 + 600 * t, hw = 70 + 520 * t, hh = 6 + 22 * t; sl += L.rect(vx - hw - 20, y, hw * 2 + 40, hh); }
  r += L.shape(sl, "wood", { w: "hair", flat: true, tone: 0 }) + L.stroke(`M${vx - 40} ${vy + 96} L330 1100 M${vx + 40} ${vy + 96} L1590 1100`, { c: "gray", w: 14 }) + L.stroke(`M${vx - 40} ${vy + 96} L330 1100 M${vx + 40} ${vy + 96} L1590 1100`, { c: "white", w: 4, op: 0.5 });
  // lanterns on the walls
  [[330, 360, 1], [1590, 360, 1], [610, 450, 0.55], [1310, 450, 0.55]].forEach(([x, y, k]) => { r += q.glow(x, y, 220 * k, "yellow", 0.6, 1) + q.raw(() => L.stroke(`M${x} ${y - 70 * k} V${y - 30 * k}`, { c: "ink", w: 5 }) + L.shape(R(x - 24 * k, y - 30 * k, 48 * k, 60 * k, 12 * k), "yellow", { w: "detail", flat: true, tone: 1 })); });
  r += q.glow(960, 1000, 800, "orange", 0.15, 1, 140);
  return r;
}, ["mine", "tunnel", "rails", "underground", "miners", "lantern", "dig", "coal"]);

reg("world-ice-cave", "Blue ice cave with light from above", UG, (q) => {
  let r = q.vgrad(0, 0, 1920, 1080, [[0, "water", 2], [1, "navy", 0]]);
  r += caveShell(q, "glass");
  r += L.flat(P([[0, 0], [1920, 0], [1920, 1080], [0, 1080]], true), "water", 0.25);
  r += q.glow(1320, 90, 560, "white", 0.7, 0) + q.sh(S([[1180, -20], [1250, 100], [1400, 100], [1470, -20]]), "white", { w: "detail", flat: true });
  r += L.flat(P([[1220, 90], [1420, 90], [1100, 1000], [560, 1000]], true), "white", 0.14);
  r += stalac(q, 17, 10, 300, 1620, 100, 60, 190, "glass", 0);
  r += q.sh(S([[-60, 880], [500, 840], [1000, 880], [1500, 830], [2000, 870], [2000, 1100], [-60, 1100], [-60, 880]]), "snow", { dir: "v", w: "detail" });
  r += q.line(`M120 300 L260 460 M1700 240 L1580 420 M200 640 L340 760 M1620 640 L1500 760`, "white", 0.7, "scene");
  const shard = (x, y, h, w) => q.sh(P([[x - w, y], [x - w * 0.3, y - h], [x + w * 0.4, y - h * 0.7], [x + w, y]], true), "glass", { w: "detail", tone: 0 });
  r += shard(260, 900, 190, 50) + shard(330, 930, 120, 36) + shard(1600, 890, 210, 54) + shard(1700, 930, 120, 36) + q.rocks(61, 4, 120, 220, 980, 1040, 20, 36, "snow") + q.rocks(62, 4, 1740, 1860, 980, 1040, 20, 36, "snow");
  r += q.glows(rgn(9, 14, 300, 100, 1300, 700).map(([x, y, k]) => [x, y, 5 + k * 6]), "white", 0, 0.9);
  return r;
}, ["ice cave", "glacier", "frozen", "blue", "cave", "arctic", "underground"]);

// ===================== LAND =====================
const fadeV = (q, d, c, tone, y0, y1, op0, op1) => q.raw(() => { const id = gid("fv"), col = L.c(c, tone); return `<defs><linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="0" y1="${y0}" x2="0" y2="${y1}"><stop offset="0" stop-color="${col}" stop-opacity="${op0}"/><stop offset="1" stop-color="${col}" stop-opacity="${op1}"/></linearGradient></defs>` + L.tag("path", { d, fill: `url(#${id})` }); });
const palm = (q, x, y, s = 1, lean = 30) => {
  const b = [x + lean * s, y - 270 * s];
  let o = q.shd(x, y, 150 * s) + q.sh(L.limb([[x, y], [x + lean * 0.3 * s, y - 130 * s], [x + lean * 0.8 * s, y - 210 * s], b], 34 * s, 20 * s), "wood", { w: "detail", flat: true });
  [-175, -145, -112, -75, -40, -10, 25, 190].forEach((a, i) => {
    const r = a * Math.PI / 180, len = (140 + (i % 3) * 20) * s, dx = Math.cos(r), dy = Math.sin(r), px = -dy, py = dx, w = 20 * s;
    const mid = [b[0] + dx * len * 0.5, b[1] + dy * len * 0.5 - 16 * s], tip = [b[0] + dx * len, b[1] + dy * len + 44 * s];
    o += q.sh(S([b, [mid[0] + px * w, mid[1] + py * w], tip, [mid[0] - px * w, mid[1] - py * w], b]), "green", { tone: i % 2, w: "detail", flat: true });
  });
  return o + q.sh(C(b[0] - 8 * s, b[1] + 6 * s, 12 * s) + C(b[0] + 12 * s, b[1] + 8 * s, 12 * s), "brown", { w: "hair", flat: true });
};
const acacia = (q, x, y, s = 1) => q.shd(x, y, 160 * s) + q.sh(L.limb([[x, y], [x + 8 * s, y - 120 * s], [x - 10 * s, y - 200 * s]], 26 * s, 14 * s), "wood", { w: "detail", flat: true }) + q.sh(L.limb([[x - 6 * s, y - 170 * s], [x + 70 * s, y - 230 * s]], 14 * s, 8 * s) + L.limb([[x - 6 * s, y - 170 * s], [x - 90 * s, y - 220 * s]], 14 * s, 8 * s), "wood", { w: "hair", flat: true })
  + q.sh(S([[x - 190 * s, y - 232 * s], [x - 130 * s, y - 276 * s], [x - 30 * s, y - 296 * s], [x + 90 * s, y - 280 * s], [x + 190 * s, y - 240 * s], [x + 120 * s, y - 214 * s], [x - 20 * s, y - 226 * s], [x - 190 * s, y - 232 * s]]), "green", { w: "detail", flat: true, tone: 2 }) + q.hi(S([[x - 150 * s, y - 250 * s], [x - 40 * s, y - 286 * s], [x + 70 * s, y - 270 * s], [x - 30 * s, y - 262 * s]]), "green", 0.5);
const pine = (q, x, y, s = 1, snow = false) => {
  let o = q.shd(x, y, 120 * s) + q.sh(L.rect(x - 12 * s, y - 50 * s, 24 * s, 50 * s), "wood", { w: "hair", flat: true });
  [[170, 110, 40], [130, 100, 115], [90, 90, 185], [56, 80, 250]].forEach(([w, h, dy], i) => {
    const yy = y - dy * s, d = P([[x - w * s / 2, yy], [x, yy - h * s], [x + w * s / 2, yy]], true);
    o += q.sh(d, "green", { w: "detail", flat: true, tone: i % 2 ? 1 : 2 });
    if (snow) o += q.sh(P([[x - w * s * 0.28, yy - h * s * 0.45], [x, yy - h * s], [x + w * s * 0.28, yy - h * s * 0.45], [x + w * s * 0.1, yy - h * s * 0.38], [x - w * s * 0.05, yy - h * s * 0.5], [x - w * s * 0.18, yy - h * s * 0.36]], true), "snow", { w: "hair", flat: true });
  });
  return o;
};
const bush = (q, x, y, w, c = "green") => q.shd(x, y, w * 1.2) + q.sh(q.blob(x, y - w * 0.28, w * 0.55, w * 0.32, 5, 0.12, x), c, { w: "detail", flat: true }) + q.hi(q.blob(x - w * 0.15, y - w * 0.4, w * 0.2, w * 0.1, 3, 0.1), c, 0.55);
const hillsLand = (q, y0, specs) => specs.map(([seed, dy, amp, c, depth, p]) => q.ridge(seed, y0 + dy, amp, c, depth, p || {})).join("");

const dunes = (q) => {
  const hy = 600;
  let r = q.sky(hy, { clouds: [[420, 190, 0.8], [1300, 140, 0.6]], sx: q.sunset ? 1300 : 1500 });
  r += hillsLand(q, hy, [[3, 20, 60, "sand", 0.3, { w: "scene", step: 220 }], [8, 90, 80, "sand", 0.15, { step: 200, ph: 0.003 }]]);
  const dune = (pts, pk) => { const d = S(pts) + " L2100 1100 L-100 1100 Z", rt = pts.slice(pk), band = P(rt.concat(rt.slice().reverse().map(([x, y]) => [x - 150, y + 80])), true); return q.sh(d, "sand", { dir: "diag", tone: 0 }) + L.flat(band, "earth", 0.42); };
  r += dune([[-100, 800], [160, 690], [420, 700], [760, 790], [1100, 850]], 1) + dune([[760, 860], [1100, 840], [1480, 700], [1700, 690], [2100, 790]], 3);
  r += q.dk(P([[-20, 880], [1940, 880], [1940, 1100], [-20, 1100]], true), "sand", 0.0) + L.flat(P([[-20, 870], [1940, 870], [1940, 1100], [-20, 1100]], true), "sand", 1) + L.flat(P([[-20, 870], [1940, 870], [1940, 1100], [-20, 1100]], true), "yellow", 0.12);
  let rip = ""; const rr = L.rng(4); for (let i = 0; i < 34; i++) { const x = rr() * 1900, y = 890 + rr() * 180, w = 60 + rr() * 120; rip += `M${f1(x)} ${f1(y)} q${f1(w / 2)} -14 ${f1(w)} 0`; }
  r += L.stroke(rip, { c: "earth", w: "hair", op: 0.6 });
  r += q.sh(R(236, 780, 30, 100, 15), "green", { w: "detail", flat: true }) + q.sh(R(206, 806, 20, 50, 10), "green", { w: "detail", flat: true }) + q.sh(R(266, 800, 20, 40, 10), "green", { w: "detail", flat: true });
  return r;
};
regT("world-dunes", "Desert dunes", LAND, dunes, ["desert", "dunes", "sand", "sahara", "hot", "dry"], ["day", "sunset", "night"]);

reg("world-oasis", "Desert oasis with palms", LAND, (q) => {
  const hy = 600;
  let r = q.sky(hy, { clouds: [[300, 180, 0.7], [1500, 120, 0.6]] });
  r += hillsLand(q, hy, [[7, 40, 70, "sand", 0.6, { step: 210 }]]);
  r += q.ground(780, "sand", { dir: "v" });
  r += q.sh(S([[640, 810], [800, 780], [1180, 780], [1300, 815], [1160, 850], [780, 850], [640, 810]]), "water", { w: "scene", dir: "v" }) + L.flat(S([[740, 800], [900, 790], [1000, 800]]), "white", 0.6) + q.line(`M760 826 h100 M1000 820 h120`, "white", 0.6, "detail");
  r += q.sh(q.blob(660, 800, 40, 16, 6), "green", { w: "detail", flat: true }) + q.sh(q.blob(1290, 806, 40, 16, 6), "green", { w: "detail", flat: true });
  r += palm(q, 1560, 900, 1.15, -40) + palm(q, 1760, 960, 0.95, 30) + palm(q, 240, 930, 1.2, 40) + palm(q, 430, 980, 0.8, -30);
  r += bush(q, 120, 1010, 150) + bush(q, 1860, 1020, 140) + bush(q, 1430, 990, 100);
  return r;
}, ["oasis", "desert", "palm", "water", "sand", "camel", "sahara"]);

const savanna = (q) => {
  const hy = 620;
  let r = q.sky(hy, { sx: q.sunset ? 1300 : 1500, r: q.sunset ? 120 : 70, clouds: [[400, 160, 0.9], [1000, 100, 0.6], [1700, 220, 0.7]] });
  r += hillsLand(q, hy, [[12, 10, 50, "grass", 0.7, { w: "scene", step: 240 }], [14, 70, 40, "sand", 0.4, { step: 220 }]]);
  r += q.ground(780, "sand", { dir: "v" }) + L.flat(P([[-20, 780], [1940, 780], [1940, 1100], [-20, 1100]], true), "yellow", 0.18);
  r += acacia(q, 1450, 800, 0.5) + acacia(q, 1580, 810, 0.4) + acacia(q, 300, 800, 0.45);
  r += q.tufts(3, 44, 0, 800, 1900, 260, "yellow");
  // baobab
  const bx = 190, by = 960;
  r += q.shd(bx, by, 300) + q.sh(S([[bx - 70, by], [bx - 60, by - 120], [bx - 40, by - 270], [bx - 20, by - 320], [bx + 20, by - 320], [bx + 40, by - 270], [bx + 60, by - 120], [bx + 70, by]]), "wood", { w: "detail", tone: 0, dir: "h" }) + q.sh(L.limb([[bx - 10, by - 300], [bx - 90, by - 380], [bx - 170, by - 400]], 22, 10) + L.limb([[bx + 10, by - 300], [bx + 90, by - 390], [bx + 160, by - 400]], 22, 10) + L.limb([[bx, by - 310], [bx, by - 420]], 20, 10), "wood", { w: "hair", flat: true }) + q.sh(q.blob(bx - 170, by - 420, 60, 36, 5) + q.blob(bx + 160, by - 420, 60, 36, 5) + q.blob(bx, by - 450, 70, 40, 5), "green", { w: "detail", flat: true });
  r += acacia(q, 1740, 980, 1.0);
  r += bush(q, 440, 1000, 110, "grass") + bush(q, 1360, 1010, 90, "grass");
  return r;
};
regT("world-savanna", "African savanna", LAND, savanna, ["savanna", "africa", "safari", "acacia", "grassland", "baobab"], ["day", "sunset"]);

reg("world-arctic-aurora", "Arctic ice under the aurora", LAND, (q) => {
  let r = q.vgrad(0, 0, 1920, 1080, [[0, "ink", 0], [0.5, "navy", 2], [1, "night", 2]]) + q.stars(51, 130, 0, 0, 1920, 700);
  const rib = (pts, c, tone, op) => { const top = S(pts), bot = S(pts.slice().reverse().map(([x, y]) => [x + 30, y + 300 + Math.sin(x * 0.01) * 40])); return fadeV(q, top + " L" + bot.slice(1).replace(/^M/, "L") + " Z", c, tone, 40, 560, op, 0); };
  const pts = (y, a, ph) => Array.from({ length: 9 }, (_, i) => [-60 + i * 250, y + Math.sin(i * 0.9 + ph) * a]);
  r += rib(pts(150, 70, 0), "teal", 1, 0.95) + rib(pts(210, 60, 2), "green", 1, 0.8) + rib(pts(120, 80, 4), "purple", 1, 0.7) + rib(pts(260, 50, 1), "sky", 1, 0.4);
  r += q.moon(300, 200, 44);
  r += q.ridge(61, 700, 120, "snow", 0.0, { tone: 2, step: 180 }) + L.flat(ridge(61, 700, 120, 180), "navy", 0.5);
  r += q.sh(P([[-20, 800], [1940, 800], [1940, 1100], [-20, 1100]], true), "snow", { dir: "v", tone: 2, w: "detail" }) + L.flat(P([[-20, 800], [1940, 800], [1940, 1100], [-20, 1100]], true), "navy", 0.3) + L.flat(P([[-20, 800], [1940, 800], [1940, 1100], [-20, 1100]], true), "teal", 0.22);
  const ice = (x, y, h, w) => q.sh(P([[x - w, y], [x - w * 0.4, y - h], [x + w * 0.1, y - h * 0.7], [x + w * 0.5, y - h * 0.95], [x + w, y]], true), "glass", { w: "detail", tone: 0 }) + q.hi(P([[x - w * 0.8, y], [x - w * 0.4, y - h * 0.9], [x - w * 0.2, y]], true), "white", 0.6);
  r += ice(220, 930, 200, 90) + ice(340, 960, 120, 60) + ice(1660, 920, 230, 100) + ice(1800, 970, 130, 60);
  r += q.glows(rgn(5, 40, 0, 810, 1920, 270).map(([x, y, k]) => [x, y, 6 + k * 6, 2]), "teal", 1, 0.6) + q.glow(960, 900, 800, "teal", 0.14, 1, 120);
  return r;
}, ["arctic", "aurora", "northern lights", "ice", "snow", "night", "polar", "norway"]);

const smoke = (q, x, y, n, dx, tone = 1) => { let o = ""; for (let i = 0; i < n; i++) { const k = 1 + i * 0.35; o += q.raw(() => L.shape(q.blob(x + dx * i * 55, y - i * 70, 46 * k, 36 * k, 6, 0.14, i), "gray", { w: "detail", flat: true, tone, op: 0.85 })); } return o; };
const volcano = (q) => {
  const hy = 580, night = q.night;
  let r = q.sky(hy, { sx: 1560, sy: 170, clouds: [[300, 200, 0.9], [1500, 250, 0.7]] });
  if (night) r += q.glow(740, 270, 700, "red", 0.38, 0, 420);
  r += q.sh(P([[-20, hy], [1940, hy], [1940, 1100], [-20, 1100]], true), "water", { dir: "v", w: "detail" }) + q.hz(`M-20 ${hy} H1940 V${hy + 40} H-20Z`, 0.7);
  const cone = S([[240, 720], [470, 530], [630, 340], [690, 258], [790, 258], [850, 340], [1010, 530], [1240, 720]]) + " L1240 740 L240 740 Z";
  r += q.sh(cone, "earth", { tone: 2, w: "scene" }) + q.dk(P([[790, 258], [850, 340], [1010, 530], [1240, 720], [880, 720], [840, 420]], true), "earth", 0.55);
  r += q.sh(S([[240, 720], [400, 640], [520, 610], [640, 560], [740, 590], [880, 560], [1010, 590], [1120, 650], [1240, 720]]) + " L1240 740 L240 740 Z", "green", { tone: 1, w: "detail" });
  r += q.sh(P([[690, 258], [790, 258], [770, 290], [710, 290]], true), "brown", { w: "detail", flat: true, tone: 2 });
  r += q.glow(740, 262, night ? 260 : 150, "orange", night ? 0.8 : 0.55, 0) + q.raw(() => L.shape(S([[700, 262], [740, 252], [782, 262], [740, 274], [700, 262]]), "lava", { w: "hair", flat: true, tone: 1 }));
  r += q.raw(() => L.stroke(`M730 276 Q700 360 740 430 Q700 500 690 560 M770 280 Q800 350 780 420 Q820 480 830 540`, { c: "lava", w: night ? 14 : 8 }) + L.stroke(`M730 276 Q700 360 740 430 Q700 500 690 560`, { c: "yellow", w: night ? 5 : 3, op: 0.8 }));
  r += smoke(q, 770, 220, 5, 1, night ? 2 : 1);
  if (night) r += q.glows(rgn(3, 9, 640, 80, 260, 160).map(([x, y, k]) => [x, y, 8 + k * 6]), "orange", 0, 0.95);
  // beach
  r += q.sh(S([[-60, 850], [400, 820], [960, 850], [1500, 820], [2000, 850], [2000, 1100], [-60, 1100], [-60, 850]]), "sand", { dir: "v", w: "scene" }) + L.flat(S([[-60, 850], [400, 820], [960, 850], [1500, 820], [2000, 850], [2000, 862], [1500, 834], [960, 864], [400, 834], [-60, 864]]), "white", 0.5);
  r += palm(q, 180, 930, 1.1, 40) + palm(q, 360, 990, 0.85, -30) + palm(q, 1640, 940, 1.15, -40) + palm(q, 1820, 1000, 0.9, 30);
  r += q.rocks(5, 4, 1000, 1200, 960, 1030, 18, 30);
  return r;
};
regT("world-volcano-island", "Volcano island", LAND, volcano, ["volcano", "island", "lava", "eruption", "tropical", "sea"], ["day", "night"]);

reg("world-jungle-river", "Jungle with a river behind", LAND, (q) => {
  let r = q.vgrad(0, 0, 1920, 1080, [[0, "teal", 1], [0.45, "green", 1], [1, "green", 2]]);
  r += q.glow(1000, 150, 500, "yellow", 0.4, 1, 260) + rays(q, [300, 800, 1300], 0.1);
  for (let i = 0; i < 12; i++) { const x = 40 + i * 170, d = q.blob(x, 560 + (i % 3) * 30, 130, 120, 7, 0.12, i); r += q.sh(d, "green", { w: "detail", flat: true, tone: 1 }) + q.hz(d, 0.55); }
  r += q.hz(L.rect(0, 440, 1920, 260), 0.25);
  r += q.sh(P([[-20, 700], [1940, 700], [1940, 790], [-20, 790]], true), "water", { w: "detail", tone: 1, dir: "v" }) + L.flat(P([[-20, 700], [1940, 700], [1940, 720], [-20, 720]], true), "green", 0.5) + q.line(`M200 750 h160 M700 735 h220 M1200 760 h200 M1600 740 h160`, "white", 0.6, "detail");
  r += q.sh(P([[-20, 780], [1940, 780], [1940, 1100], [-20, 1100]], true), "green", { w: "detail", tone: 2, dir: "v" }) + L.flat(P([[-20, 780], [1940, 780], [1940, 1100], [-20, 1100]], true), "earth", 0.25);
  const trunk = (x, w, flip) => { const k = flip ? -1 : 1; return q.sh(S([[x - w, 1100], [x - w * 0.5, 800], [x - w * 0.6, 400], [x - w * 0.4, -20], [x + w * 0.4, -20], [x + w * 0.5, 400], [x + w * 0.6, 800], [x + w, 1100]]), "wood", { tone: 2, dir: "h" }) + q.dk(P([[x + w * 0.1, -20], [x + w * 0.4, -20], [x + w * 0.5, 400], [x + w * 0.6, 800], [x + w, 1100], [x + w * 0.3, 1100]], true), "wood", 0.4) + q.line(`M${x - w * 0.2} 100 v300 M${x + w * 0.1} 500 v260 M${x - w * 0.3} 800 v200`, "ink", 0.35, "scene"); };
  r += trunk(110, 120) + trunk(1810, 130);
  const vine = (x, h, ph) => q.line(`M${x} -10 q${30 * ph} ${h * 0.4} ${-10 * ph} ${h * 0.7} t${20 * ph} ${h * 0.3}`, "green", 0.9, "scene");
  r += [260, 340, 1560, 1650, 1480].map((x, i) => vine(x, 340 + (i % 3) * 120, i % 2 ? 1 : -1)).join("");
  const leaf = (x, y, rot, s, tone) => L.g(q.sh(S([[0, 0], [40, -50], [120, -70], [240, -30], [200, 30], [100, 50], [0, 0]]), "green", { w: "detail", flat: true, tone }) + L.stroke(`M0 0 L210 -10`, { c: "green", w: "hair", op: 0.6 }), `translate(${x} ${y}) rotate(${rot}) scale(${s})`);
  r += leaf(0, 140, 10, 1.3, 1) + leaf(0, 260, 40, 1, 0) + leaf(1920, 120, 170, 1.3, 1) + leaf(1920, 250, 140, 1, 0) + leaf(-10, 990, -30, 1.5, 0) + leaf(1930, 1000, 210, 1.5, 1) + leaf(40, 1080, -60, 1.1, 1) + leaf(1900, 1090, 235, 1.1, 0);
  r += q.glows(rgn(4, 16, 300, 200, 1300, 500).map(([x, y, k]) => [x, y, 7 + k * 6]), "yellow", 1, 0.8);
  return r;
}, ["jungle", "rainforest", "river", "amazon", "trees", "vines", "tropical"]);

const fern = (q, x, y, s = 1) => {
  let o = "";
  [-165, -125, -90, -55, -15].forEach((a, i) => {
    const r = a * Math.PI / 180, len = (150 + (i % 3) * 35) * s, ex = x + Math.cos(r) * len, ey = y + Math.sin(r) * len * 0.9 + 40 * s, mx = x + Math.cos(r) * len * 0.5, my = y + Math.sin(r) * len * 0.75 - 22 * s;
    o += L.stroke(`M${x} ${y} Q${f1(mx)} ${f1(my)} ${f1(ex)} ${f1(ey)}`, { c: "green", w: 7 * s + 2 });
    let t = ""; for (let k = 1; k < 7; k++) { const u = k / 9, px = (1 - u) * (1 - u) * x + 2 * u * (1 - u) * mx + u * u * ex, py = (1 - u) * (1 - u) * y + 2 * u * (1 - u) * my + u * u * ey, w = 24 * s * (1 - u * 0.6); t += `M${f1(px)} ${f1(py)} l${f1(-w * 0.5)} ${f1(-w * 0.7)} M${f1(px)} ${f1(py)} l${f1(w * 0.6)} ${f1(-w * 0.6)}`; }
    o += L.stroke(t, { c: "green", w: 5 * s + 1 });
  });
  return o;
};
const brachio = (q, x, y, s, c = "green") => {
  let o = "";
  o += q.sh(L.limb([[x + 90 * s, y - 120 * s], [x + 200 * s, y - 100 * s], [x + 300 * s, y - 70 * s]], 60 * s, 8 * s), c, { w: "detail", flat: true, tone: 2 });
  [[-60, 0], [-20, 6], [50, 0], [90, 6]].forEach(([dx, dy], i) => o += q.sh(R(x + dx * s - 22 * s, y - 120 * s, 44 * s, (120 + dy) * s, 18 * s), c, { w: "detail", flat: true, tone: i % 2 ? 2 : 1 }));
  o += q.sh(q.blob(x, y - 150 * s, 130 * s, 80 * s, 5, 0.04), c, { w: "detail", flat: true, tone: 0 });
  o += q.sh(L.limb([[x - 80 * s, y - 170 * s], [x - 150 * s, y - 280 * s], [x - 170 * s, y - 400 * s], [x - 215 * s, y - 440 * s]], 46 * s, 22 * s), c, { w: "detail", flat: true, tone: 0 });
  o += q.sh(q.blob(x - 232 * s, y - 446 * s, 28 * s, 20 * s, 3, 0.03), c, { w: "detail", flat: true, tone: 0 }) + L.flat(C(x - 240 * s, y - 452 * s, 4 * s), "ink", 1);
  return o;
};
reg("world-prehistoric", "Prehistoric world with dinosaurs", LAND, (q) => {
  const hy = 640;
  let r = q.sky(hy, { sx: 1450, sy: 190, clouds: [[360, 180, 0.9], [1000, 120, 0.6]] }) + L.flat(P([[0, 0], [1920, 0], [1920, 1080], [0, 1080]], true), "yellow", 0.1);
  // far volcano with smoke
  const vc = S([[1000, 700], [1230, 520], [1330, 400], [1380, 380], [1430, 400], [1520, 520], [1760, 700]]) + " L1760 720 L1000 720 Z";
  r += q.sh(vc, "earth", { tone: 2, w: "detail", flat: true }) + q.hz(vc, 0.75) + smoke(q, 1400, 360, 4, 0.7, 0) + q.glow(1380, 392, 80, "orange", 0.6, 0);
  r += hillsLand(q, hy, [[9, 20, 60, "green", 0.65, { w: "scene", step: 220 }]]);
  r += q.ground(760, "grass", { dir: "v", tone: 1 });
  // distant dinosaurs (hazy)
  r += brachio(q, 560, 770, 0.5, "green") + q.hz(P([[300, 700], [760, 700], [760, 770], [300, 770]], true), 0.0) + brachio(q, 820, 790, 0.35, "teal");
  // pterosaurs
  const pt = (x, y, s) => q.sh(S([[x - 70 * s, y - 10 * s], [x - 30 * s, y - 30 * s], [x, y], [x + 30 * s, y - 30 * s], [x + 70 * s, y - 10 * s], [x + 20 * s, y + 10 * s], [x + 50 * s, y + 24 * s], [x, y + 14 * s], [x - 20 * s, y + 10 * s], [x - 70 * s, y - 10 * s]]), "brown", { w: "detail", flat: true, tone: 0 });
  r += pt(520, 230, 1) + pt(760, 300, 0.7) + pt(1700, 260, 0.9);
  r += q.tufts(7, 24, 0, 780, 1900, 300, "green");
  r += fern(q, 140, 1010, 1.4) + fern(q, 1740, 1010, 1.4) + fern(q, 1560, 1060, 0.9);
  const horse = (x, y, h) => { let o = q.sh(R(x - 11, y - h, 22, h, 8), "green", { w: "detail", flat: true, tone: 1 }); for (let i = 1; i < 6; i++) o += L.stroke(`M${x - 22} ${y - h * i / 6} l22 -12 l22 12`, { c: "green", w: 7 }); return o; };
  r += horse(60, 900, 420) + horse(1840, 880, 520) + horse(250, 920, 280);
  return r;
}, ["prehistoric", "dinosaurs", "jurassic", "volcano", "ferns", "ancient earth", "mesozoic"]);

const cloudSea = (q) => {
  let r = q.sky(560, { sx: q.sunset ? 960 : 1500, sy: q.sunset ? 540 : 160, r: q.sunset ? 110 : 62, clouds: [[300, 160, 0.9], [1100, 110, 0.6]] });
  const peak = (x, y, w, h) => q.sh(P([[x - w, y + 40], [x - w * 0.3, y - h * 0.5], [x, y - h], [x + w * 0.35, y - h * 0.55], [x + w, y + 40]], true), "stone", { w: "detail", tone: 1 }) + q.sh(P([[x - w * 0.45, y - h * 0.6], [x, y - h], [x + w * 0.4, y - h * 0.62], [x + w * 0.15, y - h * 0.5], [x, y - h * 0.58], [x - w * 0.2, y - h * 0.48]], true), "snow", { w: "hair", flat: true });
  r += peak(300, 700, 220, 260) + peak(1620, 690, 260, 320) + q.hz(P([[0, 700], [1920, 700], [1920, 760], [0, 760]], true), 0.0);
  [[780, 0.8], [850, 0.5], [920, 0.3], [990, 0.0]].forEach(([y, hz], i) => {
    let d = `M-100 ${y}`; for (let x = -100; x < 2050; x += 150) d += ` A82 ${64 + (i % 2) * 14} 0 0 1 ${x + 150} ${y + (i % 2 ? 14 : -10)}`;
    d += " L2050 1200 L-100 1200 Z";
    r += q.sh(d, "white", { w: "detail", dir: "v", tone: i % 2 }) + L.flat(d, q.sunset ? "pink" : "sky", 0.14 + hz * 0.25);
  });
  r += q.sh(S([[-60, 960], [500, 930], [1400, 940], [2000, 920], [2000, 1100], [-60, 1100], [-60, 960]]), "stone", { tone: 1, dir: "v" }) + q.rocks(11, 4, 100, 400, 1000, 1050, 24, 50) + q.rocks(12, 4, 1500, 1850, 1000, 1050, 24, 50);
  return r;
};
regT("world-cloud-sea", "Sea of clouds from a mountain ledge", LAND, cloudSea, ["clouds", "above the clouds", "mountain", "summit", "sky", "plane window", "altitude"], ["day", "sunset"]);

reg("world-canyon", "Red rock canyon", LAND, (q) => {
  const hy = 560;
  let r = q.sky(hy, { clouds: [[420, 170, 0.8], [1300, 120, 0.6]] });
  const mesa = (x, w, top, base, c, tone, depth) => { const d = P([[x, base], [x + 10, top + 90], [x + 40, top + 80], [x + 48, top], [x + w - 48, top], [x + w - 40, top + 80], [x + w - 10, top + 90], [x + w, base]], true); let o = q.sh(d, c, { w: "detail", tone, dir: "h" }) + q.dk(P([[x + w * 0.62, top], [x + w - 48, top], [x + w, base], [x + w * 0.7, base]], true), c, 0.35); let s = ""; for (let y = top + 120; y < base - 20; y += 52) s += `M${x + 24} ${y} H${x + w - 24}`; o += q.line(s, "ink", 0.25, "detail"); return o + q.hz(d, depth); };
  r += mesa(560, 520, 420, 760, "orange", 2, 0.65) + mesa(1180, 380, 470, 760, "earth", 2, 0.6);
  r += mesa(-60, 560, 300, 940, "orange", 2, 0.25) + mesa(1500, 560, 260, 940, "lava", 2, 0.2);
  r += q.sh(P([[-20, 780], [1940, 780], [1940, 1100], [-20, 1100]], true), "orange", { tone: 1, dir: "v", w: "detail" }) + L.flat(P([[-20, 780], [1940, 780], [1940, 1100], [-20, 1100]], true), "earth", 0.45);
  r += q.sh(S([[560, 790], [800, 770], [1120, 780], [1380, 800], [1120, 820], [760, 820], [560, 790]]), "water", { w: "detail", tone: 0 });
  r += q.rocks(21, 6, 40, 520, 880, 1040, 22, 56, "earth") + q.rocks(22, 7, 1400, 1900, 870, 1040, 22, 60, "earth");
  r += q.sh(R(1030, 940, 26, 90, 13), "green", { w: "detail", flat: true }) + q.tufts(3, 14, 0, 900, 1900, 180, "green");
  return r;
}, ["canyon", "grand canyon", "red rock", "desert", "mesa", "western", "erosion", "layers"]);

reg("world-wheat-field", "Golden wheat field", LAND, (q) => {
  const hy = 560;
  let r = q.sky(hy, { clouds: [[300, 180, 1], [1000, 120, 0.7], [1650, 230, 0.9]] });
  r += hillsLand(q, hy, [[5, 30, 50, "green", 0.55, { w: "scene", step: 240 }]]);
  r += q.sh(P([[-20, 580], [1940, 580], [1940, 1100], [-20, 1100]], true), "gold", { dir: "v", tone: 0, w: "detail" });
  let rows = ""; for (let i = -9; i <= 9; i++) rows += `M${960 + i * 18} 590 L${960 + i * 270} 1100`;
  r += L.stroke(rows, { c: "gold", w: 10, op: 0.55 }) + L.stroke(rows, { c: "earth", w: "hair", op: 0.4 });
  // barn far
  r += q.sh(L.rect(1400, 530, 120, 70), "red", { w: "detail", flat: true }) + q.sh(P([[1390, 532], [1460, 484], [1530, 532]], true), "brown", { w: "detail", flat: true }) + q.sh(L.rect(1442, 560, 36, 40), "white", { w: "hair", flat: true });
  r += acacia(q, 320, 610, 0.28).replace(/<g/g, "<g");
  r += q.tufts(2, 0, 0, 0, 1, 1);
  const stalk = (x, y, h, lean) => L.stroke(`M${x} ${y} Q${x + lean * 0.3} ${y - h * 0.6} ${x + lean} ${y - h}`, { c: "gold", w: 7, tone: 2 }) + q.sh(S([[x + lean, y - h - 60], [x + lean + 14, y - h - 30], [x + lean + 8, y - h + 6], [x + lean - 8, y - h + 6], [x + lean - 14, y - h - 30], [x + lean, y - h - 60]]), "gold", { w: "hair", flat: true, tone: 1 });
  [[50, 1100, 520, 30], [140, 1100, 420, -20], [230, 1100, 360, 25], [1700, 1100, 500, -30], [1800, 1100, 450, 24], [1880, 1100, 380, -18], [330, 1100, 260, -10], [1600, 1100, 320, 16]].forEach(([x, y, h, l]) => r += stalk(x, y, h, l));
  return r;
}, ["wheat", "field", "farm", "harvest", "crops", "golden", "countryside", "bread"]);

reg("world-swamp", "Misty swamp", LAND, (q) => {
  let r = q.vgrad(0, 0, 1920, 1080, [[0, "green", 1], [0.5, "teal", 1], [1, "green", 2]]);
  r += q.glow(960, 330, 800, "white", 0.4, 0, 260);
  const cy = (x, w, h, sc, a) => { let o = q.sh(S([[x - w * 1.3, 800], [x - w * 0.5, 700], [x - w * 0.4, 400], [x - w * 0.3, -20], [x + w * 0.3, -20], [x + w * 0.4, 400], [x + w * 0.5, 700], [x + w * 1.3, 800]]), "wood", { w: "detail", tone: 2, flat: true }); let m = ""; for (let i = 0; i < 6; i++) { const mx = x - w * 0.8 + i * (w * 0.32); m += `M${mx} ${200 + (i % 3) * 30} q${6 * (i % 2 ? 1 : -1)} 120 0 ${240 + (i % 4) * 60}`; } return o + L.stroke(m, { c: "green", w: 9, op: 0.85 }) + L.stroke(m, { c: "teal", w: 4, op: 0.7 }); };
  r += q.hz(L.rect(0, 0, 1920, 900), 0.0);
  [[640, 40], [1260, 40], [900, 30]].forEach(([x, w]) => { const d = S([[x - w * 1.3, 700], [x - w * 0.4, 600], [x - w * 0.3, 160], [x + w * 0.3, 160], [x + w * 0.4, 600], [x + w * 1.3, 700]]); r += q.sh(d, "green", { w: "detail", flat: true, tone: 2 }) + q.hz(d, 0.45); });
  r += L.flat(P([[0, 560], [1920, 560], [1920, 780], [0, 780]], true), "white", 0.28);
  r += q.sh(P([[-20, 740], [1940, 740], [1940, 1100], [-20, 1100]], true), "teal", { w: "detail", tone: 2, dir: "v" }) + L.flat(P([[-20, 740], [1940, 740], [1940, 1100], [-20, 1100]], true), "green", 0.35);
  r += L.stroke(`M120 800 h200 M700 780 h300 M1300 810 h260 M1650 790 h180 M400 900 h340 M1100 930 h400`, { c: "green", w: "hair", op: 0.8 }) + q.glows([[960, 760, 900, 40]], "white", 0, 0.28);
  const pad = (x, y, s) => q.sh(C(x, y, 34 * s, 11 * s), "green", { w: "hair", flat: true, tone: 0 }) + L.flat(C(x - 6 * s, y - 2 * s, 12 * s, 3 * s), "white", 0.35);
  [[240, 860, 1.2], [320, 900, 1], [150, 930, 1.3], [1620, 850, 1.2], [1730, 900, 1.4], [1500, 920, 0.9], [1830, 970, 1.1]].forEach(([x, y, s]) => r += pad(x, y, s));
  r += cy(150, 90, 0, 0, 0) + cy(1790, 100, 0, 0, 0);
  r += q.sh(S([[-60, 1000], [300, 960], [520, 1010], [400, 1100], [-60, 1100], [-60, 1000]]), "brown", { w: "detail", tone: 1 }) + q.sh(S([[2000, 1000], [1700, 970], [1480, 1020], [1560, 1100], [2000, 1100], [2000, 1000]]), "brown", { w: "detail", tone: 1 });
  r += q.glows(rgn(5, 12, 200, 600, 1500, 300).map(([x, y, k]) => [x, y, 6 + k * 4]), "yellow", 1, 0.8);
  return r;
}, ["swamp", "bog", "marsh", "bayou", "mist", "cypress", "wetland", "fog"]);

reg("world-snow-forest", "Snowy pine forest", LAND, (q) => {
  let r = q.vgrad(0, 0, 1920, 1080, [[0, "sky", 1], [0.6, "white", 0], [1, "snow", 0]]);
  r += q.glow(1400, 200, 400, "yellow", 0.3, 1) + q.cloud(300, 170, 0.9) + q.cloud(1100, 110, 0.6);
  for (let i = 0; i < 11; i++) { const x = 80 + i * 175 + (i % 3) * 30; r += pine(q, x, 700 + (i % 3) * 20, 0.9 + (i % 2) * 0.2, true); }
  r += L.flat(P([[0, 380], [1920, 380], [1920, 780], [0, 780]], true), "white", 0.45);
  r += q.sh(P([[-20, 760], [1940, 760], [1940, 1100], [-20, 1100]], true), "snow", { dir: "v", tone: 0, w: "detail" });
  // cabin far
  r += q.sh(L.rect(880, 690, 110, 70), "wood", { w: "detail", flat: true }) + q.sh(P([[866, 694], [935, 640], [1004, 694]], true), "snow", { w: "detail", flat: true }) + q.raw(() => L.shape(L.rect(920, 712, 28, 28), "yellow", { w: "hair", flat: true, tone: 1 })) + smoke(q, 970, 650, 3, 0.5, 0).replace(/blob/g, "blob");
  r += pine(q, 140, 1000, 2.6, true) + pine(q, 420, 1040, 1.5, true) + pine(q, 1780, 1010, 2.8, true) + pine(q, 1520, 1050, 1.6, true);
  r += q.sh(q.blob(1050, 1040, 90, 26, 5), "snow", { w: "detail", tone: 1, flat: true }) + q.sh(q.blob(780, 1020, 60, 18, 5), "snow", { w: "detail", tone: 1, flat: true });
  r += L.flat(dots(5, 110, 0, 0, 1920, 1080, 2.5, 5.5), "white", 0.95);
  return r;
}, ["snow", "winter", "forest", "pine", "cold", "christmas", "cabin", "snowfall"]);

reg("world-bamboo-forest", "Bamboo forest", LAND, (q) => {
  let r = q.vgrad(0, 0, 1920, 1080, [[0, "green", 1], [0.6, "green", 0], [1, "green", 2]]);
  r += q.glow(960, 220, 700, "yellow", 0.4, 1, 360);
  const stalk = (x, w, far) => { let o = q.sh(R(x - w / 2, -20, w, 1120, w / 2), "green", { w: "detail", flat: true, tone: far ? 0 : 1 }); let n = ""; for (let y = 100 + (x % 90); y < 1100; y += 170) n += `M${x - w / 2} ${y} h${w}`; return o + L.stroke(n, { c: "green", w: far ? 4 : 8, tone: 2 }) + (far ? q.hz(R(x - w / 2, -20, w, 1120, w / 2), 0.7) : q.hi(L.rect(x - w * 0.3, -20, w * 0.18, 1120), "green", 0.55)); };
  for (let i = 0; i < 16; i++) r += stalk(40 + i * 125 + (i % 3) * 22, 26, true);
  r += rays(q, [250, 700, 1250, 1600], 0.12);
  r += q.sh(P([[-20, 800], [1940, 800], [1940, 1100], [-20, 1100]], true), "earth", { tone: 0, dir: "v", w: "detail" }) + L.flat(P([[-20, 800], [1940, 800], [1940, 1100], [-20, 1100]], true), "green", 0.3);
  [60, 160, 270, 1640, 1740, 1850].forEach((x, i) => r += stalk(x, 52 + (i % 3) * 8, false));
  const lf = (x, y, rot, s) => L.g(q.sh(S([[0, 0], [60, -14], [150, 0], [60, 14], [0, 0]]), "green", { w: "hair", flat: true, tone: 1 }), `translate(${x} ${y}) rotate(${rot}) scale(${s})`);
  [[100, 300, -30], [140, 460, 20], [1800, 340, 200], [1760, 540, 160], [230, 700, -10], [1700, 700, 190], [1580, 250, 215], [320, 220, -35]].forEach(([x, y, rt], i) => r += lf(x, y, rt, 1.1) + lf(x, y + 14, rt + 24, 0.9) + lf(x, y - 12, rt - 22, 0.8));
  r += q.tufts(3, 20, 0, 880, 1900, 200, "green");
  return r;
}, ["bamboo", "forest", "asia", "zen", "panda", "green", "japan", "china"]);

reg("world-waterfall-valley", "Green valley with a waterfall", LAND, (q) => {
  const hy = 520;
  let r = q.sky(hy, { clouds: [[300, 150, 0.8], [1500, 190, 0.7]], sx: 560, sy: 160 });
  r += hillsLand(q, hy, [[4, 40, 80, "green", 0.55, { w: "scene", step: 220 }]]);
  // cliff + waterfall
  const cliff = S([[1060, 760], [1070, 440], [1130, 300], [1500, 280], [1620, 420], [1660, 760]]) + " Z";
  r += q.sh(cliff, "stone", { tone: 1, dir: "h", w: "scene" }) + q.dk(P([[1500, 280], [1620, 420], [1660, 760], [1500, 760]], true), "stone", 0.4);
  r += q.sh(P([[1240, 300], [1330, 300], [1344, 780], [1226, 780]], true), "white", { w: "detail", flat: true }) + L.flat(P([[1262, 300], [1286, 300], [1292, 780], [1256, 780]], true), "glass", 0.6) + q.line(`M1270 340 V740 M1306 360 V770`, "glass", 0.8, "detail");
  r += q.glow(1285, 790, 260, "white", 0.7, 0, 90) + L.flat(P([[1200, 800], [1370, 800], [1370, 840], [1200, 840]], true), "white", 0.0);
  r += q.sh(S([[900, 800], [1100, 780], [1480, 790], [1700, 810], [1450, 860], [1100, 860], [900, 800]]), "teal", { w: "detail", tone: 0 }) + L.flat(S([[1180, 800], [1285, 794], [1390, 802], [1285, 830]]), "white", 0.7);
  r += q.sh(P([[-20, 800], [1940, 800], [1940, 1100], [-20, 1100]], true), "grass", { w: "detail", tone: 1, dir: "v" });
  r += tr(L.stroke(L.arc(0, 0, 220, 190, 350), { c: "red", w: 10, op: 0.35 }) + L.stroke(L.arc(0, 0, 200, 190, 350), { c: "yellow", w: 10, op: 0.35 }) + L.stroke(L.arc(0, 0, 180, 190, 350), { c: "sky", w: 10, op: 0.35 }), 1285, 830, 1.2);
  r += q.sh(S([[-60, 380], [200, 400], [330, 520], [420, 700], [440, 900], [-60, 1000], [-60, 380]]), "stone", { tone: 1, dir: "h", w: "scene" }) + q.sh(S([[-60, 380], [200, 400], [330, 520], [300, 560], [140, 480], [-60, 470]]), "green", { w: "detail", tone: 1, flat: true });
  r += pine(q, 1760, 1000, 1.8) + pine(q, 1880, 1040, 1.3) + pine(q, 1560, 1030, 1.0);
  r += bush(q, 500, 980, 140, "green") + bush(q, 200, 1040, 170, "green") + bush(q, 1380, 1040, 110, "green");
  r += q.tufts(6, 20, 0, 880, 1900, 200, "grass");
  return r;
}, ["waterfall", "valley", "river", "nature", "green", "cliff", "rainbow", "mist"]);

// ===================== CITIES AND OLD WORLDS =====================
const cottage = (q, x, y, w, h, wall = "wall", roof = "brown", seed = 1) => {
  let o = q.shd(x + w / 2, y, w * 1.1) + q.sh(L.rect(x, y - h, w, h), wall, { w: "detail" });
  o += q.line(`M${x} ${y - h * 0.55} H${x + w} M${x + w * 0.33} ${y - h} V${y - h * 0.55} M${x + w * 0.66} ${y - h} V${y - h * 0.55}`, "wood", 0.8, "detail");
  o += q.sh(P([[x - w * 0.12, y - h], [x + w / 2, y - h - w * 0.5], [x + w * 1.12, y - h]], true), roof, { w: "detail" }) + q.hi(P([[x - w * 0.05, y - h], [x + w / 2, y - h - w * 0.45], [x + w * 0.5, y - h]], true), roof, 0.35);
  o += q.sh(R(x + w * 0.38, y - h * 0.42, w * 0.24, h * 0.42, 6), "wood", { w: "hair", tone: 1 });
  o += q.win(x + w * 0.1, y - h * 0.5, w * 0.2, h * 0.22) + q.win(x + w * 0.7, y - h * 0.5, w * 0.2, h * 0.22);
  if (q.night) o += q.glow(x + w * 0.2, y - h * 0.4, w * 0.35, "yellow", 0.35, 1);
  return o;
};
const medieval = (q) => {
  const hy = 600;
  let r = q.sky(hy, { sx: q.sunset ? 1300 : 1500, clouds: [[420, 170, 0.9], [1100, 110, 0.6]] });
  r += hillsLand(q, hy, [[15, 20, 60, "grass", 0.6, { w: "scene", step: 230 }]]);
  // church far
  r += q.sh(L.rect(880, 480, 80, 180), "stone", { w: "detail" }) + q.sh(P([[870, 482], [920, 380], [970, 482]], true), "brown", { w: "detail" }) + q.win(908, 520, 24, 40);
  r += cottage(q, 700, 650, 110, 90, "wall", "brown") + cottage(q, 1010, 650, 100, 80, "cream", "red");
  r += q.ground(780, "grass", { dir: "v", tone: 0 });
  r += q.sh(S([[-60, 1100], [500, 900], [900, 800], [1000, 800], [1500, 900], [2000, 1100]]), "earth", { w: "detail", tone: 1, dir: "v" }).replace(/<path/, "<path");
  r += cottage(q, 90, 900, 230, 170, "wall", "brown") + cottage(q, 400, 860, 150, 120, "cream", "red") + cottage(q, 1470, 880, 190, 150, "cream", "brown") + cottage(q, 1730, 900, 210, 160, "wall", "red");
  // well + fence
  const wx = 1300, wy = 850;
  r += q.shd(wx, wy, 120) + q.sh(R(wx - 40, wy - 50, 80, 50, 8), "stone", { w: "detail" }) + q.sh(L.rect(wx - 44, wy - 100, 8, 56) + L.rect(wx + 36, wy - 100, 8, 56), "wood", { w: "hair", flat: true }) + q.sh(P([[wx - 56, wy - 100], [wx, wy - 134], [wx + 56, wy - 100]], true), "brown", { w: "detail" });
  r += q.tufts(2, 18, 0, 900, 1900, 180, "grass");
  r += pine(q, 640, 800, 0.7) + pine(q, 1200, 790, 0.6);
  if (q.night) r += q.glow(960, 850, 700, "yellow", 0.08, 1, 120);
  return r;
};
regT("world-medieval-village", "Medieval village", CITY, medieval, ["medieval", "village", "middle ages", "cottages", "europe", "history"], ["day", "night"]);

reg("world-ancient-city", "Ancient stone city", CITY, (q) => {
  const hy = 640;
  let r = q.sky(hy, { clouds: [[320, 150, 0.8], [1500, 190, 0.6]], sx: 1600 });
  const blockB = (q, x, y, w, h, c, tone, far) => { let o = q.sh(L.rect(x, y - h, w, h), c, { w: "detail", tone, flat: far }); o += q.dk(L.rect(x + w * 0.7, y - h, w * 0.3, h), c, 0.3); if (!far) o += q.sh(S([[x + w * 0.3, y], [x + w * 0.3, y - h * 0.3], [x + w * 0.5, y - h * 0.4], [x + w * 0.7, y - h * 0.3], [x + w * 0.7, y]]), "brown", { w: "hair", tone: 2, flat: true }) + q.line(`M${x} ${y - h * 0.8} H${x + w}`, "ink", 0.35); return o; };
  // far skyline
  [[40, 760, 120, 200], [180, 760, 150, 260], [350, 760, 100, 170], [1330, 760, 130, 230], [1480, 760, 110, 190], [1620, 760, 160, 280], [1800, 760, 140, 200]].forEach(([x, y, w, h], i) => { r += blockB(q, x, y, w, h, i % 2 ? "sand" : "wall", 1, true) + q.hz(L.rect(x, y - h, w, h), 0.5); });
  // ziggurat on the right, dome on the left
  [[1180, 760, 360, 70], [1230, 690, 260, 70], [1280, 620, 160, 70]].forEach(([x, y, w, h], i) => r += q.sh(L.rect(x, y - h, w, h), "sand", { w: "detail", tone: i % 2 }) + q.line(`M${x + 10} ${y - h * 0.5} H${x + w - 10}`, "ink", 0.3));
  r += q.sh(R(1340, 460, 40, 90, 6), "stone", { w: "detail" });
  r += q.sh(S([[500, 700], [510, 590], [560, 540], [620, 590], [630, 700]]), "gold", { w: "detail", tone: 0 }) + q.sh(L.rect(480, 700, 170, 60), "sand", { w: "detail" });
  r += q.ground(780, "sand", { dir: "v", tone: 0 });
  r += q.sh(S([[-60, 1100], [600, 920], [900, 800], [1020, 800], [1360, 920], [2000, 1100]]), "wall", { w: "detail", dir: "v" });
  // flanking buildings with arches and columns
  r += blockB(q, 20, 960, 360, 360, "sand", 0, false) + blockB(q, 1560, 970, 380, 330, "wall", 0, false);
  r += q.sh(L.rect(60, 620, 280, 30), "stone", { w: "detail", tone: 1 });
  const col = (x, y, h) => q.sh(R(x - 16, y - h, 32, h, 6), "white", { w: "detail", flat: true, tone: 1 }) + q.sh(R(x - 24, y - h - 12, 48, 16, 5), "white", { w: "detail", flat: true, tone: 0 });
  [60, 140, 220, 300].forEach((x) => r += col(x, 960, 270)); [1600, 1690, 1780, 1870].forEach((x) => r += col(x, 970, 240));
  r += palm(q, 470, 960, 0.8, 20) + palm(q, 1470, 990, 0.7, -20);
  return r;
}, ["ancient", "city", "stone", "babylon", "mesopotamia", "civilization", "history", "temple"]);

const futuristic = (q) => {
  const night = q.night, hy = 660;
  let r = q.sky(hy, { clouds: [[500, 190, 0.7], [1500, 140, 0.6]], sx: 1560, sy: 160 });
  const tower = (q, x, y, w, h, c, seed, far) => {
    const d = S([[x, y], [x + w * 0.04, y - h * 0.7], [x + w * 0.2, y - h * 0.95], [x + w * 0.5, y - h], [x + w * 0.8, y - h * 0.95], [x + w * 0.96, y - h * 0.7], [x + w, y], [x, y]]);
    let o = q.sh(d, c, { w: "detail", dir: "h", tone: 0, flat: far }) + q.dk(P([[x + w * 0.6, y - h], [x + w * 0.96, y - h * 0.7], [x + w, y], [x + w * 0.62, y]], true), c, 0.3);
    o += q.wins(x + w * 0.14, y - h * 0.86, 4, Math.floor(h / 70), w * 0.14, 26, w * 0.05, 44, seed, 0.6);
    if (!far) o += q.sh(L.rect(x + w * 0.46, y - h - 90, 8, 90), "gray", { w: "hair", flat: true }) + q.raw(() => L.shape(C(x + w * 0.5, y - h - 94, 10), night ? "pink" : "red", { w: "hair", flat: true }));
    return o + (far ? q.hz(d, 0.55) : "");
  };
  [[60, 780, 130, 420, "glass", 1], [200, 780, 110, 330, "sky", 2], [420, 780, 100, 290, "glass", 3], [1380, 780, 120, 360, "sky", 4], [1530, 780, 140, 440, "glass", 5], [1700, 780, 120, 300, "sky", 6]].forEach(([x, y, w, h, c, s]) => r += tower(q, x, y, w, h, c, s, true));
  // floating discs / bridge
  r += q.sh(C(760, 420, 80, 18), "teal", { w: "detail", flat: true, tone: 0 }) + q.sh(C(1150, 360, 60, 14), "teal", { w: "detail", flat: true, tone: 1 }) + q.glows([[760, 440, 90, 20], [1150, 378, 70, 16]], "sky", 1, night ? 0.9 : 0.4);
  r += q.sh(P([[460, 560], [1300, 560], [1300, 580], [460, 580]], true), "gray", { w: "detail", flat: true, tone: 1 }) + L.stroke(`M460 560 H1300`, { c: "glass", w: 6, op: 0.8 });
  // ground plaza
  r += q.sh(P([[-20, 780], [1940, 780], [1940, 1100], [-20, 1100]], true), "gray", { w: "scene", tone: 1, dir: "v" }) + L.flat(P([[-20, 780], [1940, 780], [1940, 800], [-20, 800]], true), night ? "sky" : "white", night ? 0.5 : 0.5);
  r += tower(q, -60, 1000, 260, 800, "glass", 7, false) + tower(q, 1740, 1000, 260, 760, "sky", 8, false);
  r += q.raw(() => L.stroke(`M0 900 H1920 M0 1000 H1920`, { c: night ? "sky" : "white", w: 4, op: night ? 0.6 : 0.4 }));
  // flying cars
  const car = (x, y, s, c) => q.sh(S([[x - 40 * s, y], [x - 24 * s, y - 14 * s], [x + 20 * s, y - 14 * s], [x + 40 * s, y], [x + 22 * s, y + 8 * s], [x - 30 * s, y + 8 * s], [x - 40 * s, y]]), c, { w: "detail", flat: true }) + q.glow(x, y + 12 * s, 36 * s, "sky", night ? 0.8 : 0.5, 1);
  r += car(900, 300, 1, "orange") + car(1250, 250, 0.8, "pink") + car(500, 330, 0.7, "yellow");
  if (night) r += q.glows(rgn(3, 24, 0, 800, 1920, 280).map(([x, y, k]) => [x, y, 10 + k * 18, 3]), "sky", 1, 0.8);
  return r;
};
regT("world-futuristic-city", "Futuristic city", CITY, futuristic, ["future", "city", "sci-fi", "skyscrapers", "flying cars", "2100", "tomorrow"], ["day", "night"]);

reg("world-flooded-city", "Flooded city (calm)", CITY, (q) => {
  const hy = 700;
  let r = q.vgrad(0, 0, 1920, hy + 40, [[0, "sky", 2], [1, "white", 0]]) + q.cloud(340, 200, 1) + q.cloud(1200, 140, 0.7) + q.cloud(1650, 300, 0.8);
  const bld = (x, w, h, c, seed, far) => { const d = L.rect(x, hy + 30 - h, w, h); return q.sh(d, c, { w: "detail", flat: far, tone: far ? 1 : 0 }) + q.dk(L.rect(x + w * 0.7, hy + 30 - h, w * 0.3, h), c, 0.3) + q.wins(x + w * 0.12, hy + 50 - h, 4, Math.floor((h - 60) / 56), w * 0.14, 28, w * 0.06, 28, seed, 0) + (far ? q.hz(d, 0.5) : ""); };
  [[40, 130, 360, "wall", 1], [200, 110, 270, "cream", 2], [440, 100, 220, "stone", 3], [1350, 120, 300, "stone", 4], [1500, 130, 380, "wall", 5], [1670, 120, 250, "cream", 6]].forEach(([x, w, h, c, s]) => r += bld(x, w, h, c, s, true));
  r += bld(120, 200, 520, "sky", 7, false).replace(/<g/, "<g") + bld(1580, 230, 600, "wall", 8, false);
  r += q.sh(P([[-20, hy + 30], [1940, hy + 30], [1940, 1100], [-20, 1100]], true), "water", { w: "detail", dir: "v", tone: 0 }) + L.flat(P([[-20, hy + 30], [1940, hy + 30], [1940, hy + 70], [-20, hy + 70]], true), "white", 0.3);
  r += L.flat(L.rect(120, hy + 50, 200, 300), "sky", 0.25) + L.flat(L.rect(1580, hy + 50, 230, 300), "wall", 0.25);
  let wv = ""; const rr = L.rng(9); for (let i = 0; i < 28; i++) { const x = rr() * 1800, y = hy + 70 + rr() * 300, w = 60 + rr() * 140; wv += `M${f1(x)} ${f1(y)} h${f1(w)}`; }
  r += q.line(wv, "white", 0.5, "detail");
  // street sign and a floating plank
  r += q.sh(R(930, hy - 20, 14, 70, 4), "gray", { w: "hair", flat: true }) + q.sh(R(890, hy - 50, 96, 36, 6), "green", { w: "detail", flat: true }) + q.sh(R(700, hy + 60, 140, 14, 6), "wood", { w: "detail", flat: true });
  r += q.sh(S([[-60, 930], [300, 900], [500, 940], [450, 1100], [-60, 1100], [-60, 930]]), "stone", { w: "detail", tone: 1 }) + q.sh(S([[2000, 930], [1650, 900], [1480, 950], [1530, 1100], [2000, 1100], [2000, 930]]), "stone", { w: "detail", tone: 1 });
  return r;
}, ["flood", "flooded", "sea level", "climate", "city", "water", "rising", "drowned", "calm"]);

reg("world-empty-city", "City after everyone vanished (calm)", CITY, (q) => {
  const vx = 960, vy = 560;
  let r = q.sky(vy, { clouds: [[420, 150, 1], [1300, 120, 0.8], [1700, 240, 0.7]], sx: 1500 });
  const side = (left) => { const k = left ? -1 : 1, x0 = left ? 0 : 1920; let o = ""; [[300, 0.9, "wall"], [560, 0.6, "cream"], [740, 0.4, "stone"], [850, 0.28, "wall"]].forEach(([dx, s, c], i) => { const xa = x0 + k * (vx - 0 > 0 ? 0 : 0); const bx = left ? (vx - 130 - dx * 1.3) : (vx + 130 + dx * 1.3) - 200 * s, w = 200 * s * 1.6, h = 700 * s + 120; const d = L.rect(left ? vx - 160 - dx * 1.2 : vx + 160 + dx * 1.2 - w, vy + 120 - h * (0.55 + s * 0.5), w, h * (0.55 + s * 0.5) + 400); o += q.sh(d, c, { w: "detail", tone: i % 2, flat: s < 0.5 }) + q.wins(left ? vx - 140 - dx * 1.2 : vx + 180 + dx * 1.2 - w, vy + 150 - h * (0.55 + s * 0.5), 3, Math.max(3, Math.floor(h * s / 60)), w * 0.2, 30 * s + 8, w * 0.08, 30 * s + 14, i + (left ? 1 : 7), 0) + (s < 0.5 ? q.hz(d, 0.6) : ""); }); return o; };
  r += side(true) + side(false);
  r += q.sh(P([[vx - 90, vy + 120], [vx + 90, vy + 120], [1920, 1100], [0, 1100]], true), "gray", { w: "detail", tone: 1, dir: "v" });
  r += L.stroke(`M${vx} ${vy + 122} L${vx} 1100`, { c: "yellow", w: 8, op: 0.0 }) + L.stroke(`M${vx} ${vy + 130} L${vx - 4} ${vy + 180} M${vx} ${vy + 220} L${vx - 12} ${vy + 320} M${vx} ${vy + 380} L${vx - 30} ${vy + 560}`, { c: "white", w: 12, op: 0.8 });
  // abandoned cars, plants growing through cracks, litter
  const cr = (x, y, s, c) => q.shd(x, y, 220 * s) + q.sh(R(x - 100 * s, y - 50 * s, 200 * s, 50 * s, 18 * s), c, { w: "detail" }) + q.sh(S([[x - 60 * s, y - 50 * s], [x - 40 * s, y - 86 * s], [x + 40 * s, y - 86 * s], [x + 66 * s, y - 50 * s]]), "glass", { w: "detail", flat: true }) + q.sh(C(x - 60 * s, y - 4 * s, 20 * s) + C(x + 60 * s, y - 4 * s, 20 * s), "ink", { w: "hair", flat: true });
  r += cr(280, 880, 1.2, "red") + cr(1620, 900, 1.3, "blue") + cr(1380, 760, 0.55, "yellow");
  r += bush(q, 80, 1030, 130) + bush(q, 1850, 1040, 120) + bush(q, 460, 930, 80, "grass") + q.tufts(4, 24, 100, 960, 1700, 130, "grass");
  r += L.stroke(`M0 770 q80 -40 150 -10 M1920 770 q-80 -40 -150 -10`, { c: "green", w: 12, op: 0.9 });
  // traffic light, signal off
  r += q.sh(R(1130, 520, 12, 250, 4), "gray", { w: "hair", flat: true }) + q.sh(R(1112, 480, 48, 100, 10), "ink", { w: "detail", flat: true, tone: 1 }) + L.flat(C(1136, 506, 10) + C(1136, 530, 10) + C(1136, 554, 10), "gray", 0.8);
  return r;
}, ["empty", "deserted", "abandoned", "nobody", "vanished", "post human", "quiet", "calm", "city", "street"]);

reg("world-rooftop-night", "Rooftop at night over the city", CITY, (q) => {
  q.night; const nq = Q({ time: "night" });
  let r = nq.vgrad(0, 0, 1920, 1080, [[0, "ink", 0], [0.55, "navy", 2], [1, "purple", 2]]) + nq.stars(71, 110, 0, 0, 1920, 520) + nq.moon(1560, 190, 62);
  const sky = (x, w, h, c, seed, far) => { const d = L.rect(x, 760 - h, w, h + 400); return nq.sh(d, c, { w: "detail", flat: far, tone: 1 }) + nq.wins(x + w * 0.1, 780 - h, Math.floor(w / 36), Math.floor(h / 48), 18, 26, 18, 22, seed, 0.45) + (far ? nq.hz(d, 0.5) : ""); };
  [[20, 150, 360, "navy", 1], [190, 120, 250, "stone", 2], [330, 170, 320, "navy", 3], [520, 120, 200, "stone", 4], [660, 130, 280, "navy", 5], [1180, 150, 220, "navy", 6], [1340, 120, 340, "stone", 7], [1480, 180, 260, "navy", 8], [1680, 130, 380, "stone", 9], [1820, 110, 220, "navy", 10]].forEach(([x, w, h, c, s]) => r += sky(x, w, h, c, s, true));
  r += nq.glows([[960, 760, 1000, 120]], "orange", 1, 0.3) + nq.glows([[500, 740, 300, 80], [1400, 740, 300, 80]], "pink", 1, 0.25);
  // roof surface + parapet
  r += nq.sh(P([[-20, 790], [1940, 790], [1940, 1100], [-20, 1100]], true), "gray", { w: "scene", tone: 2, dir: "v" }) + nq.sh(L.rect(-20, 770, 1960, 40), "stone", { w: "detail", tone: 1 }) + L.flat(L.rect(-20, 770, 1960, 8), "white", 0.18);
  r += nq.line(`M0 900 H1920 M0 1000 H1920 M300 810 V1100 M1620 810 V1100`, "ink", 0.3, "detail");
  // water tank, antenna, vent
  r += nq.shd(1620, 800, 300) + nq.sh(L.rect(1540, 600, 14, 200) + L.rect(1700, 600, 14, 200), "wood", { w: "hair", flat: true, tone: 2 }) + nq.sh(R(1510, 440, 230, 180, 28), "wood", { w: "detail", tone: 1 }) + nq.sh(P([[1500, 450], [1625, 390], [1750, 450]], true), "stone", { w: "detail", tone: 0 }) + nq.line(`M1510 500 H1740 M1510 560 H1740`, "ink", 0.4, "detail");
  r += nq.sh(L.rect(266, 480, 8, 310), "gray", { w: "hair", flat: true }) + nq.line(`M226 560 H314 M236 610 H304 M246 660 H294`, "gray", 0.9, "scene") + nq.glow(270, 478, 40, "red", 0.9, 0) + nq.raw(() => L.shape(C(270, 478, 9), "red", { w: "hair", flat: true }));
  r += nq.shd(150, 800, 160) + nq.sh(R(80, 700, 140, 100, 12), "gray", { w: "detail", tone: 1 }) + nq.sh(C(150, 700, 54, 20), "gray", { w: "detail", tone: 0 });
  r += nq.glow(960, 850, 800, "pink", 0.1, 1, 120);
  return r;
}, ["rooftop", "night", "city lights", "skyline", "stars", "balcony", "terrace", "moon"]);

reg("world-harbour-town", "Colourful harbour town", CITY, (q) => {
  const hy = 560;
  let r = q.sky(hy, { clouds: [[420, 170, 0.9], [1300, 120, 0.7]], sx: 1560 });
  r += q.sh(P([[-20, hy], [1940, hy], [1940, 1100], [-20, 1100]], true), "water", { w: "detail", dir: "v" }) + q.hz(`M-20 ${hy} H1940 V${hy + 30} H-20Z`, 0.6);
  r += q.sh(L.rect(780, 330, 60, 240), "white", { w: "detail", flat: true }) + q.sh(L.rect(780, 400, 60, 40) + L.rect(780, 490, 60, 30), "red", { w: "hair", flat: true }) + q.sh(R(770, 300, 80, 36, 8), "gray", { w: "detail", flat: true }) + q.sh(P([[766, 300], [810, 252], [854, 300]], true), "red", { w: "detail", flat: true }) + q.glow(810, 318, 80, "yellow", 0.4, 1);
  r += q.sh(S([[600, hy + 2], [760, hy - 30], [900, hy - 20], [1000, hy + 2]]), "green", { w: "detail", flat: true, tone: 1 }) + q.hz(S([[600, hy + 2], [760, hy - 30], [900, hy - 20], [1000, hy + 2]]), 0.5);
  const boat = (x, y, s, c) => q.shd(x, y + 10, 200 * s) + q.sh(P([[x - 90 * s, y - 40 * s], [x + 90 * s, y - 40 * s], [x + 60 * s, y + 10 * s], [x - 60 * s, y + 10 * s]], true), c, { w: "detail", flat: true }) + q.sh(L.rect(x - 4 * s, y - 190 * s, 8 * s, 150 * s), "wood", { w: "hair", flat: true }) + q.sh(P([[x + 6 * s, y - 186 * s], [x + 76 * s, y - 60 * s], [x + 6 * s, y - 60 * s]], true), "paper", { w: "detail", flat: true });
  r += boat(1150, 700, 0.9, "red") + boat(1450, 650, 0.7, "blue") + boat(330, 640, 0.6, "yellow");
  r += q.sh(P([[-20, 800], [1940, 800], [1940, 1100], [-20, 1100]], true), "stone", { w: "scene", tone: 0, dir: "v" }) + q.line(`M0 880 H1920 M0 980 H1920 M200 800 V880 M500 880 V980 M900 800 V880 M1300 880 V980 M1700 800 V880`, "ink", 0.3, "detail");
  const shop = (x, w, h, wall, roof) => cottage(q, x, 830, w, h, wall, roof);
  r += shop(10, 180, 250, "yellow", "red").replace(/<g/, "<g") + shop(210, 150, 210, "pink", "brown") + shop(1500, 170, 230, "sky", "red") + shop(1690, 200, 280, "orange", "brown");
  [[110, 880], [1620, 870]].forEach(([x, y]) => r += q.sh(L.rect(x - 4, y - 100, 8, 100), "wood", { w: "hair", flat: true }));
  r += q.sh(R(540, 790, 20, 90, 6), "wood", { w: "detail", flat: true, tone: 1 }) + q.sh(R(1320, 790, 20, 90, 6), "wood", { w: "detail", flat: true, tone: 1 }) + q.sh(C(550, 900, 34, 14), "wood", { w: "detail", flat: true, tone: 2 });
  return r;
}, ["harbour", "port", "town", "boats", "coast", "fishing village", "lighthouse", "seaside"]);

reg("world-castle-hill", "Castle on a hill", CITY, (q) => {
  const hy = 640;
  let r = q.sky(hy, { clouds: [[300, 170, 0.9], [1500, 140, 0.7]], sx: 1560 });
  r += hillsLand(q, hy, [[13, 20, 70, "green", 0.55, { w: "scene", step: 230 }]]);
  const hill = S([[300, 800], [560, 560], [800, 440], [960, 420], [1200, 450], [1420, 580], [1700, 800]]) + " L1700 820 L300 820 Z";
  r += q.sh(hill, "grass", { w: "scene", tone: 0, dir: "diag" }) + q.dk(P([[960, 420], [1200, 450], [1420, 580], [1700, 800], [1100, 800]], true), "grass", 0.4);
  const tow = (x, y, w, h, roofc) => q.sh(L.rect(x, y - h, w, h), "stone", { w: "detail", flat: false }) + q.dk(L.rect(x + w * 0.7, y - h, w * 0.3, h), "stone", 0.3) + q.sh(P([[x - w * 0.15, y - h], [x + w / 2, y - h - w * 1.1], [x + w * 1.15, y - h]], true), roofc, { w: "detail" }) + q.sh(R(x + w * 0.35, y - h * 0.6, w * 0.3, h * 0.22, w * 0.15), "ink", { w: "hair", flat: true, tone: 1 });
  r += q.sh(L.rect(780, 330, 360, 90), "stone", { w: "detail" }) + q.line(`M780 380 H1140`, "ink", 0.3) + tow(q, 740, 440, 80, 250, "red") + tow(q, 1100, 440, 80, 260, "red") + tow(q, 900, 360, 120, 190, "blue");
  let cren = ""; for (let i = 0; i < 9; i++) cren += L.rect(790 + i * 40, 312, 24, 22);
  r += q.sh(cren, "stone", { w: "hair", flat: true }) + q.sh(S([[930, 440], [930, 400], [960, 380], [990, 400], [990, 440]]), "wood", { w: "detail", flat: true, tone: 2 });
  r += q.sh(L.rect(960, 220, 6, 70), "wood", { w: "hair", flat: true }) + q.sh(P([[966, 220], [1030, 238], [966, 256]], true), "red", { w: "hair", flat: true });
  r += q.ground(800, "grass", { dir: "v", tone: 0, w: "detail" });
  r += q.sh(S([[-60, 1100], [500, 960], [900, 840], [1020, 840], [1400, 960], [2000, 1100]]), "earth", { w: "detail", tone: 1, dir: "v" });
  r += pine(q, 140, 960, 1.5) + pine(q, 330, 990, 1.1) + pine(q, 1780, 970, 1.6) + pine(q, 1600, 1000, 1.0);
  r += bush(q, 520, 940, 100) + bush(q, 1380, 950, 100);
  return r;
}, ["castle", "hill", "knight", "king", "medieval", "fantasy", "fortress", "kingdom"]);

reg("world-pyramids-valley", "Pyramids and desert valley", CITY, (q) => {
  const hy = 600;
  let r = q.sky(hy, { clouds: [[420, 180, 0.7], [1500, 150, 0.6]], sx: 1600 });
  const pyr = (q, x, y, w, h, far) => { const d = P([[x - w / 2, y], [x, y - h], [x + w / 2, y]], true); return q.sh(d, "sand", { w: "detail", flat: far, tone: 0 }) + L.flat(P([[x, y - h], [x + w / 2, y], [x + w * 0.1, y]], true), "earth", 0.45) + q.line(`M${x - w * 0.3} ${y - h * 0.4} H${x + w * 0.3}`, "ink", 0.2) + (far ? q.hz(d, 0.35) : ""); };
  r += hillsLand(q, hy, [[3, 70, 40, "sand", 0.3, { w: "scene", step: 240 }]]);
  r += pyr(q, 560, 760, 420, 300, true) + pyr(q, 1220, 780, 640, 440, false) + pyr(q, 1640, 780, 300, 200, true);
  r += q.ground(780, "sand", { dir: "v", tone: 0, w: "detail" });
  r += q.sh(S([[-60, 1100], [600, 900], [900, 820], [1020, 820], [1400, 900], [2000, 1100]]), "earth", { w: "detail", tone: 1, dir: "v" }) + L.flat(S([[-60, 1100], [600, 900], [900, 820], [1020, 820], [1400, 900], [2000, 1100]]), "sand", 0.4);
  // sphinx-like block statue (generic lion figure) left
  r += q.shd(250, 900, 400) + q.sh(S([[60, 900], [70, 820], [150, 800], [220, 800], [260, 740], [310, 730], [340, 790], [330, 900]]), "sand", { w: "detail", tone: 0 }) + q.sh(C(290, 760, 32), "sand", { w: "detail", tone: 1, flat: true }) + q.sh(P([[250, 770], [290, 700], [330, 770]], true), "blue", { w: "detail", flat: true, tone: 0 });
  r += palm(q, 1640, 940, 1.0, -30) + palm(q, 1800, 990, 0.8, 20) + bush(q, 1520, 990, 90, "grass");
  r += q.rocks(8, 5, 420, 540, 940, 1030, 18, 36, "sand");
  let rip = ""; const rr = L.rng(4); for (let i = 0; i < 22; i++) { const x = rr() * 1900, y = 880 + rr() * 200, w = 60 + rr() * 120; rip += `M${f1(x)} ${f1(y)} q${f1(w / 2)} -14 ${f1(w)} 0`; }
  r += L.stroke(rip, { c: "earth", w: "hair", op: 0.55 });
  return r;
}, ["pyramids", "egypt", "giza", "pharaoh", "desert", "ancient", "history", "sphinx"]);

reg("world-greek-island", "White island town above the sea", CITY, (q) => {
  const hy = 520;
  let r = q.sky(hy, { clouds: [[420, 150, 0.9], [1400, 190, 0.7]], sx: 1560 });
  r += q.sh(P([[-20, hy], [1940, hy], [1940, 1100], [-20, 1100]], true), "water", { w: "detail", dir: "v" }) + q.hz(`M-20 ${hy} H1940 V${hy + 30} H-20Z`, 0.6);
  r += L.stroke(`M200 620 h120 M900 600 h180 M1400 640 h140 M600 700 h160`, { c: "white", w: "hair", op: 0.6 });
  r += q.sh(S([[-60, 1100], [-60, 700], [150, 640], [400, 700], [560, 820], [700, 900], [900, 1000], [1000, 1100]]), "sand", { w: "scene", tone: 1, dir: "h" });
  r += q.sh(S([[2000, 1100], [2000, 640], [1760, 620], [1520, 700], [1380, 820], [1240, 920], [1100, 1010], [1000, 1100]]), "sand", { w: "scene", tone: 1, dir: "h" });
  const house = (x, y, w, h) => q.shd(x + w / 2, y, w) + q.sh(L.rect(x, y - h, w, h), "white", { w: "detail", flat: true }) + q.dk(L.rect(x + w * 0.72, y - h, w * 0.28, h), "white", 0.5) + q.sh(R(x + w * 0.2, y - h * 0.62, w * 0.2, h * 0.3, w * 0.1), "blue", { w: "hair", flat: true }) + q.sh(R(x + w * 0.6, y - h * 0.62, w * 0.14, h * 0.3, w * 0.07), "blue", { w: "hair", flat: true });
  const dome = (x, y, w, h) => house(x, y, w, h) + q.sh(S([[x - 4, y - h], [x + w * 0.1, y - h - w * 0.4], [x + w / 2, y - h - w * 0.55], [x + w * 0.9, y - h - w * 0.4], [x + w + 4, y - h]]), "blue", { w: "detail", flat: false, tone: 0 }) + q.sh(L.rect(x + w / 2 - 3, y - h - w * 0.55 - 26, 6, 26), "white", { w: "hair", flat: true });
  r += house(40, 800, 120, 100) + dome(180, 820, 130, 130) + house(330, 860, 110, 100) + house(60, 940, 140, 120) + dome(230, 990, 150, 120) + house(420, 960, 120, 100);
  r += house(1700, 780, 130, 120) + dome(1520, 840, 130, 120) + house(1380, 900, 120, 100) + dome(1770, 960, 150, 130) + house(1590, 990, 130, 110);
  r += q.sh(R(480, 760, 90, 12, 6), "wood", { w: "hair", flat: true }) + q.sh(P([[-20, 1010], [1940, 1010], [1940, 1100], [-20, 1100]], true), "sand", { w: "detail", tone: 0 }).replace(/<path/, "<path");
  r += q.sh(L.rect(380, 640, 24, 40), "white", { w: "hair", flat: true }) + q.sh(R(1640, 1030, 18, 60, 6), "green", { w: "detail", flat: true }) + bush(q, 680, 1050, 90, "grass") + bush(q, 1230, 1060, 100, "grass");
  return r;
}, ["greece", "greek", "island", "santorini", "white houses", "sea", "mediterranean", "ancient greece"]);

// ===================== INSIDE THINGS =====================
const rbc = (q, x, y, s, rot = 0) => L.g(q.sh(C(0, 0, 54, 36), "red", { w: "detail", tone: 0 }) + L.flat(C(0, 0, 24, 14), "red", 0.0) + q.dk(C(0, 0, 26, 15), "red", 0.55) + q.hi(S([[-40, -10], [-20, -24], [10, -26], [-10, -16], [-34, -2]]), "red", 0.6), `translate(${f1(x)} ${f1(y)}) rotate(${rot}) scale(${s})`);
reg("world-blood-vessel", "Inside a blood vessel", IN, (q) => {
  const vx = 960, vy = 450;
  let r = q.vgrad(0, 0, 1920, 1080, [[0, "red", 2], [1, "pink", 2]]);
  for (let i = 0; i < 8; i++) { const k = 1 - i / 8.5, rx = 1100 * k + 70, ry = 640 * k + 40; r += q.sh(C(vx, vy + 70 * (1 - k), rx, ry), "red", { w: "detail", tone: i % 2 ? 0 : 1, flat: true }); }
  r += q.glow(vx, vy, 360, "orange", 0.55, 1, 260) + q.sh(C(vx, vy, 120, 90), "red", { w: "hair", flat: true, tone: 2 });
  // wall folds
  r += q.line(`M0 220 Q300 300 560 360 M1920 220 Q1620 300 1360 360 M0 800 Q300 700 600 600 M1920 800 Q1620 700 1320 600`, "red", 0.7, "scene");
  // floor of the vessel
  r += q.sh(S([[-60, 860], [500, 830], [960, 850], [1500, 830], [2000, 860], [2000, 1100], [-60, 1100], [-60, 860]]), "pink", { w: "scene", tone: 0, dir: "v" }) + q.line(`M80 920 q120 -20 260 0 M700 960 q200 -24 400 0 M1450 930 q160 -20 300 0`, "red", 0.4, "detail");
  [[300, 300, 1.1, 20], [520, 560, 0.9, -30], [1480, 260, 1.2, 40], [1640, 540, 1, -15], [1180, 330, 0.55, 10], [760, 300, 0.5, -20], [1860, 740, 1.1, 60], [90, 600, 1.3, 25], [260, 780, 0.9, 0]].forEach(([x, y, s, rt]) => r += rbc(q, x, y, s, rt));
  // white blood cell
  r += q.sh(q.blob(1400, 700, 110, 104, 9, 0.05), "white", { w: "detail", tone: 0 }) + q.sh(S([[1360, 680], [1400, 650], [1440, 680], [1450, 720], [1400, 750], [1360, 720], [1360, 680]]), "purple", { w: "detail", tone: 0, flat: true }) + L.flat(C(1370, 670, 20), "white", 0.5);
  r += q.glows(rgn(4, 12, 200, 100, 1500, 700).map(([x, y, k]) => [x, y, 8 + k * 6]), "pink", 0, 0.7);
  return r;
}, ["blood", "vessel", "artery", "vein", "red blood cells", "inside the body", "human body", "circulation"]);

reg("world-microscopic", "Microscopic world of cells and germs", IN, (q) => {
  let r = q.vgrad(0, 0, 1920, 1080, [[0, "purple", 1], [0.5, "teal", 1], [1, "sky", 0]]);
  r += q.glows([[400, 300, 500, 300], [1500, 250, 520, 280], [900, 800, 700, 260]], "white", 0, 0.3);
  const cell = (x, y, r0, c, nuc) => q.glow(x, y, r0 * 1.5, c, 0.3, 1) + q.sh(q.blob(x, y, r0, r0 * 0.92, 8, 0.05, x), c, { w: "detail", tone: 1, op: 0.85 }) + q.sh(C(x + r0 * 0.1, y, r0 * 0.38), nuc, { w: "detail", tone: 0, flat: true }) + L.flat(C(x - r0 * 0.4, y - r0 * 0.45, r0 * 0.14), "white", 0.8) + L.flat(C(x + r0 * 0.5, y + r0 * 0.3, r0 * 0.08) + C(x - r0 * 0.5, y + r0 * 0.35, r0 * 0.1), "white", 0.5);
  r += cell(300, 300, 150, "green", "purple") + cell(1560, 240, 170, "pink", "blue") + cell(1760, 620, 110, "yellow", "orange") + cell(180, 700, 100, "teal", "navy") + cell(720, 170, 80, "orange", "red") + cell(1180, 140, 60, "sky", "purple");
  const rod = (x, y, rot, c) => L.g(q.sh(R(-46, -17, 92, 34, 17), c, { w: "detail", tone: 0, flat: true }) + L.stroke(`M-46 0 q-20 -20 -40 0 M46 0 q20 20 40 0`, { c, w: "detail" }) + L.flat(C(-18, -4, 4) + C(18, 4, 4), "white", 0.6), `translate(${x} ${y}) rotate(${rot})`);
  r += rod(560, 420, 30, "red") + rod(1330, 330, -20, "orange") + rod(1620, 880, 50, "pink") + rod(260, 900, -30, "yellow");
  const virus = (x, y, s, c) => { let sp = ""; for (let i = 0; i < 12; i++) { const a = (i / 12) * Math.PI * 2; sp += `M${f1(Math.cos(a) * 34 * s)} ${f1(Math.sin(a) * 34 * s)} L${f1(Math.cos(a) * 52 * s)} ${f1(Math.sin(a) * 52 * s)}`; } return L.g(L.stroke(sp, { c, w: 7 * s + 2 }) + q.sh(C(0, 0, 34 * s), c, { w: "detail", tone: 0 }) + L.flat(C(-10 * s, -10 * s, 9 * s), "white", 0.6), `translate(${x} ${y})`) + q.raw(() => L.shape(C(x + 52 * s * 0.0, y, 0.01), "white", { w: "hair", flat: true })); };
  r += virus(900, 280, 1.2, "green") + virus(420, 540, 0.8, "purple") + virus(1480, 520, 1, "red") + virus(1090, 960, 0.9, "navy");
  r += q.sh(S([[-60, 960], [500, 930], [1000, 960], [1500, 930], [2000, 960], [2000, 1100], [-60, 1100], [-60, 960]]), "pink", { w: "scene", tone: 1, dir: "v" }) + q.glows(rgn(8, 16, 100, 960, 1700, 100).map(([x, y, k]) => [x, y, 10 + k * 14]), "white", 0, 0.6);
  r += bubbles(15, 14, 100, 100, 1700, 800);
  return r;
}, ["microscope", "cells", "germs", "bacteria", "virus", "tiny", "microbes", "biology"]);

reg("world-circuit-city", "Inside a computer: circuit city", IN, (q) => {
  let r = q.vgrad(0, 0, 1920, 1080, [[0, "navy", 2], [1, "green", 2]]);
  // traces
  let tr1 = ""; const rr = L.rng(6); for (let i = 0; i < 30; i++) { const x = rr() * 1920, y = rr() * 700; tr1 += `M${f1(x)} ${f1(y)} h${f1(80 + rr() * 140)} l40 40 v${f1(60 + rr() * 100)}`; }
  r += L.stroke(tr1, { c: "teal", w: 6, op: 0.45 }) + q.glows(rgn(2, 30, 0, 0, 1920, 760).map(([x, y]) => [x, y, 9]), "teal", 1, 0.8);
  const chip = (q, x, y, w, h, c, seed) => { let pins = ""; for (let i = 0; i < Math.floor(w / 26); i++) pins += L.rect(x + 12 + i * 26, y, 12, 14); return q.sh(L.rect(x, y - h, w, h), c, { w: "detail", tone: 1 }) + q.dk(L.rect(x + w * 0.75, y - h, w * 0.25, h), c, 0.35) + q.sh(pins, "gold", { w: "hair", flat: true }) + q.raw(() => L.shape(C(x + 22, y - h + 24, 8), "yellow", { w: "hair", flat: true, tone: 1 })) + q.line(`M${x + w * 0.2} ${y - h * 0.6} H${x + w * 0.7} M${x + w * 0.2} ${y - h * 0.4} H${x + w * 0.55}`, "white", 0.5, "detail"); };
  [[30, 150, 380, "navy"], [190, 200, 270, "purple"], [440, 120, 200, "navy"], [600, 140, 140, "teal"], [1220, 130, 250, "purple"], [1390, 180, 400, "navy"], [1600, 150, 280, "teal"], [1770, 150, 330, "purple"]].forEach(([x, w, h, c], i) => r += chip(q, x, 800, w, h, c, i).replace(/^/, ""));
  r += q.sh(L.rect(-20, 800, 1960, 300), "green", { w: "scene", tone: 2, dir: "v" });
  let tr2 = `M0 880 H700 l60 60 H1180 l60 -60 H1920 M0 960 H400 l50 50 H1480 l50 -50 H1920 M300 800 v80 M960 800 v60 M1500 800 v100`; 
  r += L.stroke(tr2, { c: "gold", w: 10, op: 0.8 }) + L.stroke(tr2, { c: "yellow", w: 3, op: 0.8 });
  r += q.raw(() => L.shape(C(700, 880, 12) + C(1240, 880, 12) + C(400, 960, 12) + C(1530, 960, 12), "gold", { w: "hair", flat: true, tone: 1 }));
  r += q.glows([[300, 880, 40], [1500, 900, 40], [960, 860, 36]], "green", 1, 0.9);
  // capacitor + led
  const cap = (q, x, y, h, c) => q.sh(R(x - 32, y - h, 64, h, 12), c, { w: "detail", tone: 0 }) + q.sh(C(x, y - h, 32, 12), c, { w: "detail", tone: 1, flat: true }) + L.flat(L.rect(x + 8, y - h + 8, 12, h - 16), "white", 0.7);
  r += cap(q, 520, 1040, 180, "blue") + cap(q, 600, 1060, 130, "red") + cap(q, 1340, 1050, 200, "blue") + cap(q, 1420, 1070, 150, "orange");
  r += q.glow(120, 1000, 140, "red", 0.6, 0) + q.raw(() => L.shape(C(120, 1000, 22), "red", { w: "detail", tone: 1 })) + q.glow(1800, 1000, 140, "green", 0.6, 1) + q.raw(() => L.shape(C(1800, 1000, 22), "green", { w: "detail", tone: 1 }));
  return r;
}, ["computer", "circuit", "chip", "cpu", "motherboard", "tech", "digital", "inside a computer"]);

reg("world-dream-islands", "Dream world of floating islands", IN, (q) => {
  let r = q.vgrad(0, 0, 1920, 1080, [[0, "purple", 0], [0.45, "pink", 0], [1, "sky", 1]]);
  r += q.glow(1500, 220, 420, "white", 0.5, 0) + q.raw(() => L.shape(C(1500, 220, 100), "cream", { w: "scene" })) + L.flat(C(1470, 190, 100), "white", 0.0);
  r += q.stars(81, 40, 0, 0, 1920, 400) + q.cloud(300, 220, 0.9) + q.cloud(900, 150, 0.7) + q.cloud(1700, 520, 0.8) + q.cloud(160, 700, 0.8);
  const isle = (x, y, w, h, c, tree) => { let o = q.sh(S([[x - w, y], [x - w * 0.7, y + h * 0.5], [x - w * 0.2, y + h], [x, y + h * 1.3], [x + w * 0.25, y + h * 0.9], [x + w * 0.7, y + h * 0.5], [x + w, y], [x - w, y]]), "earth", { w: "detail", tone: 1 }); o += q.sh(S([[x - w, y], [x - w * 0.5, y - h * 0.18], [x + w * 0.5, y - h * 0.18], [x + w, y], [x, y + h * 0.12], [x - w, y]]), c, { w: "detail", tone: 0 }); if (tree) o += q.sh(L.rect(x + w * 0.2 - 6, y - h * 0.18 - 56, 12, 60), "wood", { w: "hair", flat: true }) + q.sh(C(x + w * 0.2, y - h * 0.18 - 80, 42), "pink", { w: "detail", flat: true, tone: 0 }); return o + L.stroke(`M${x - w * 0.3} ${y + h * 0.5} v${h * 0.9} M${x + w * 0.1} ${y + h * 0.8} v${h * 0.8}`, { c: "white", w: 5, op: 0.5 }); };
  r += isle(380, 380, 190, 100, "grass", true) + isle(1560, 460, 150, 80, "teal", false) + isle(960, 280, 120, 70, "green", true) + isle(1760, 190, 90, 50, "grass", false) + isle(120, 560, 100, 60, "teal", true);
  r += q.sh(L.rect(1520, 360, 70, 50), "wall", { w: "detail", flat: true }) + q.sh(P([[1508, 362], [1555, 320], [1602, 362]], true), "red", { w: "detail", flat: true });
  // big ground island at the bottom
  r += q.sh(S([[-60, 870], [400, 830], [960, 850], [1500, 830], [2000, 870], [2000, 1100], [-60, 1100], [-60, 870]]), "grass", { w: "scene", tone: 0, dir: "v" }) + q.hi(S([[-60, 876], [400, 836], [960, 856], [1500, 836], [2000, 876], [2000, 896], [1500, 856], [960, 876], [400, 856], [-60, 896]]), "grass", 0.6);
  r += q.tufts(2, 20, 0, 900, 1900, 170, "grass");
  r += q.sh(R(70, 780, 12, 100, 6), "wood", { w: "hair", flat: true }) + q.sh(C(76, 750, 70), "pink", { w: "detail", flat: true, tone: 1 }) + q.sh(R(1830, 770, 12, 110, 6), "wood", { w: "hair", flat: true }) + q.sh(C(1836, 740, 76), "purple", { w: "detail", flat: true, tone: 1 });
  r += q.glows(rgn(5, 16, 100, 100, 1700, 700).map(([x, y, k]) => [x, y, 8 + k * 6]), "white", 0, 0.9);
  return r;
}, ["dream", "floating islands", "fantasy", "imagination", "sky", "magic", "surreal", "cloud"]);

reg("world-giant-scale", "Ant's-eye view: giant grass and a giant sneaker", IN, (q) => {
  let r = q.vgrad(0, 0, 1920, 1080, [[0, "sky", 1], [1, "white", 0]]) + q.cloud(300, 230, 1.8) + q.cloud(1100, 150, 1.2) + q.glow(900, 100, 500, "yellow", 0.3, 1);
  // far grass haze
  for (let i = 0; i < 20; i++) { const x = i * 100, d = P([[x, 800], [x + 30, 500 + (i % 4) * 40], [x + 60, 800]], true); r += q.sh(d, "grass", { w: "hair", flat: true, tone: 1 }) + q.hz(d, 0.5); }
  // giant sneaker (side view) on the right
  const sx = 1330, sy = 840, r0 = r; r = "";
  r += q.shd(sx + 460, sy, 1000);
  r += q.sh(S([[sx, sy - 40], [sx + 20, sy - 330], [sx + 130, sy - 440], [sx + 270, sy - 410], [sx + 370, sy - 300], [sx + 560, sy - 220], [sx + 800, sy - 170], [sx + 880, sy - 80], [sx + 870, sy - 20], [sx, sy - 20]]), "red", { w: "scene", tone: 0 }) + q.dk(S([[sx + 560, sy - 220], [sx + 800, sy - 170], [sx + 880, sy - 80], [sx + 870, sy - 20], [sx + 400, sy - 20]]), "red", 0.25);
  r += q.sh(S([[sx + 560, sy - 220], [sx + 800, sy - 170], [sx + 860, sy - 110], [sx + 700, sy - 120], [sx + 600, sy - 170]]), "white", { w: "detail", tone: 0, flat: true });
  r += q.sh(R(sx - 20, sy - 70, 930, 80, 36), "white", { w: "scene", tone: 0 }) + q.line((() => { let t = ""; for (let i = 0; i < 18; i++) t += `M${sx + 20 + i * 50} ${sy - 4} v-50`; return t; })(), "ink", 0.35, "detail") + L.flat(L.rect(sx - 10, sy - 30, 910, 10), "red", 0.6);
  r += q.sh(S([[sx + 110, sy - 410], [sx + 200, sy - 560], [sx + 340, sy - 540], [sx + 300, sy - 360]]), "red", { w: "detail", tone: 1 }) + q.sh(S([[sx + 160, sy - 300], [sx + 330, sy - 380], [sx + 350, sy - 320], [sx + 200, sy - 250]]), "white", { w: "detail", flat: true });
  let lace = ""; for (let i = 0; i < 4; i++) lace += `M${sx + 340 + i * 56} ${sy - 330 + i * 24} l60 -40 M${sx + 400 + i * 56} ${sy - 330 + i * 24} l-60 -40`;
  r += L.stroke(lace, { c: "white", w: 12 }) + L.stroke(lace, { c: "ink", w: 3, op: 0.3 });
  r += q.sh(C(sx + 130, sy - 190, 24), "ink", { w: "hair", flat: true, tone: 1 });
  r = r0 + L.g(r, `translate(${sx - 60} ${sy}) scale(0.52) translate(${-sx} ${-sy})`);
  // ground soil and pebbles
  r += q.sh(P([[-20, 840], [1940, 840], [1940, 1100], [-20, 1100]], true), "earth", { w: "scene", tone: 1, dir: "v" });
  r += q.rocks(5, 9, 40, 1900, 930, 1050, 26, 70, "stone");
  // giant grass blades both sides
  const blade = (x, y, h, lean, w, tone) => { const d = L.limb([[x, y], [x + lean * 0.2, y - h * 0.5], [x + lean, y - h]], w, 4); return q.sh(d, "green", { w: "detail", tone, flat: true }) + L.stroke(`M${x} ${y} Q${x + lean * 0.2} ${y - h * 0.5} ${x + lean} ${y - h}`, { c: "green", w: 3, tone: 2, op: 0.7 }); };
  [[40, 1100, 1000, 120, 120, 1], [160, 1100, 880, -60, 100, 0], [300, 1100, 760, 160, 90, 2], [-20, 1100, 1100, 200, 140, 0], [1840, 1100, 980, -140, 120, 1], [1800, 1100, 840, 60, 100, 0], [1920, 1100, 1100, -200, 140, 2]].forEach((a) => r += blade(...a));
  // a dandelion + ladybird-ish beetle small far
  r += q.sh(C(260, 960, 18), "yellow", { w: "hair", flat: true }) ;
  r += L.g(q.sh(S([[-60, 0], [-50, -50], [0, -70], [50, -50], [60, 0], [0, 10]]), "red", { w: "detail", tone: 0 }) + L.stroke(`M0 -70 V10`, { c: "ink", w: "detail" }) + L.flat(C(-26, -26, 9) + C(26, -30, 9) + C(-20, -6, 7) + C(24, -8, 7), "ink", 1) + q.sh(C(-62, -14, 18), "ink", { w: "hair", flat: true, tone: 1 }), "translate(560 1000) scale(0.9)");
  return r;
}, ["giant", "tiny", "ant", "grass", "sneaker", "shoe", "scale", "shrunk", "bug view", "honey i shrunk"]);

reg("world-neuron-forest", "Inside the brain: forest of neurons", IN, (q) => {
  let r = q.vgrad(0, 0, 1920, 1080, [[0, "navy", 2], [0.6, "purple", 2], [1, "navy", 2]]);
  r += q.glows([[400, 300, 500, 300], [1500, 400, 560, 320], [960, 800, 700, 220]], "pink", 1, 0.3);
  const neuron = (x, y, s, c, far) => {
    let br = ""; const rr = L.rng(Math.round(x + y)); for (let i = 0; i < 7; i++) { const a = (i / 7) * Math.PI * 2 + rr(), len = (180 + rr() * 140) * s; const mx = x + Math.cos(a) * len * 0.5 + rr() * 30, my = y + Math.sin(a) * len * 0.5 + rr() * 30, ex = x + Math.cos(a) * len, ey = y + Math.sin(a) * len; br += `M${f1(x)} ${f1(y)} Q${f1(mx)} ${f1(my)} ${f1(ex)} ${f1(ey)} M${f1(mx)} ${f1(my)} l${f1(Math.cos(a + 0.8) * 60 * s)} ${f1(Math.sin(a + 0.8) * 60 * s)}`; }
    return q.glow(x, y, 180 * s, c, far ? 0.25 : 0.4, 1) + L.stroke(br, { c, w: far ? 6 * s : 12 * s, op: far ? 0.55 : 1 }) + q.raw(() => L.shape(C(x, y, 52 * s), c, { w: "detail", tone: 1, flat: far })) + L.flat(C(x - 14 * s, y - 14 * s, 14 * s), "white", 0.7) + q.glows(rgn(Math.round(x), 4, x - 150 * s, y - 150 * s, 300 * s, 300 * s).map(([a, b]) => [a, b, 12 * s]), "white", 0, 0.9);
  };
  r += neuron(300, 260, 0.8, "pink", true) + neuron(1100, 180, 0.8, "sky", true) + neuron(1700, 300, 1.2, "pink", false) + neuron(180, 600, 1.1, "sky", false) + neuron(1540, 780, 0.9, "teal", false) + neuron(520, 820, 0.8, "pink", true);
  r += q.glows(rgn(9, 40, 0, 0, 1920, 1000).map(([x, y, k]) => [x, y, 4 + k * 6]), "yellow", 1, 0.9);
  r += q.sh(S([[-60, 940], [500, 910], [1000, 940], [1500, 910], [2000, 940], [2000, 1100], [-60, 1100], [-60, 940]]), "purple", { w: "scene", tone: 1, dir: "v" });
  return r;
}, ["brain", "neurons", "thoughts", "synapse", "mind", "inside the head", "memory", "psychology"]);

// ===================== PLACES =====================
reg("world-stadium", "Stadium with a crowd", PL, (q) => {
  let r = q.sky(520, { clouds: [[420, 130, 0.8], [1500, 100, 0.6]], sx: 1560, sy: 140 });
  r += q.sh(P([[-20, 380], [1940, 380], [1940, 700], [-20, 700]], true), "gray", { w: "scene", tone: 0, dir: "v" });
  [[430, "red", 0], [480, "blue", 1], [530, "yellow", 2], [580, "pink", 0], [630, "green", 1]].forEach(([y, c, i]) => r += L.stroke(`M0 ${y} H1920`, { c, w: 46, op: 0.9 }) + L.stroke(`M${i * 4} ${y} H1920`, { c: "white", w: 14, dash: "6 22", op: 0.85 }) + L.stroke(`M${i * 9 + 8} ${y - 8} H1920`, { c: "orange", w: 12, dash: "5 27", op: 0.8 }));
  r += L.flat(P([[-20, 380], [1940, 380], [1940, 410], [-20, 410]], true), "white", 0.4);
  r += q.sh(P([[-20, 680], [1940, 680], [1940, 720], [-20, 720]], true), "stone", { w: "detail", tone: 1 }) + q.line(`M0 700 H1920`, "white", 0.5, "detail");
  // scoreboard
  r += q.sh(R(780, 200, 360, 160, 16), "navy", { w: "scene", tone: 0 }) + q.raw(() => L.shape(R(800, 220, 320, 80, 10), "teal", { w: "detail", flat: true, tone: 1 })) + L.flat(R(820, 320, 90, 22, 8) + R(1010, 320, 90, 22, 8), "yellow", 0.8);
  r += q.sh(L.rect(944, 360, 32, 30), "gray", { w: "hair", flat: true });
  // pitch
  r += q.sh(P([[-20, 720], [1940, 720], [1940, 1100], [-20, 1100]], true), "grass", { w: "detail", tone: 0, dir: "v" });
  for (let i = 0; i < 8; i++) r += L.flat(P([[-20 + i * 250, 720], [-20 + i * 250 + 125, 720], [-300 + i * 480 + 240, 1100], [-300 + i * 480, 1100]], true), "green", i % 2 ? 0.0 : 0.25);
  r += L.stroke(`M-20 780 H1940`, { c: "white", w: 8, op: 0.9 }) + L.stroke(C(960, 780, 150, 36), { c: "white", w: 6, op: 0.8 }) + L.stroke(`M900 780 H1020`, { c: "white", w: 6, op: 0.0 });
  // goal far
  r += L.stroke(`M780 730 V690 H1140 V730 M820 690 V730 M1100 690 V730`, { c: "white", w: 8 }) + q.line(`M790 696 H1130 M790 710 H1130 M790 724 H1130`, "white", 0.5, "detail");
  // floodlights
  [[110], [1810]].forEach(([x]) => r += q.sh(L.rect(x - 8, 130, 16, 260), "gray", { w: "hair", flat: true }) + q.sh(R(x - 56, 80, 112, 60, 10), "gray", { w: "detail", tone: 1 }) + q.raw(() => L.shape(L.rect(x - 44, 90, 24, 18) + L.rect(x - 12, 90, 24, 18) + L.rect(x + 20, 90, 24, 18), "yellow", { w: "hair", flat: true, tone: 1 })) + q.glow(x, 110, 120, "yellow", 0.4, 1));
  r += q.sh(R(60, 880, 180, 40, 10), "wood", { w: "detail", flat: true }) + q.sh(R(1680, 880, 180, 40, 10), "wood", { w: "detail", flat: true });
  return r;
}, ["stadium", "football", "soccer", "sports", "crowd", "pitch", "arena", "match"]);

reg("world-classroom-future", "Classroom of the future", PL, (q) => {
  let r = q.vgrad(0, 0, 1920, 1080, [[0, "white", 0], [1, "sky", 1]]);
  r += q.sh(L.rect(-20, -20, 1960, 760), "white", { w: "scene", tone: 2, dir: "v" }) + L.flat(L.rect(-20, -20, 1960, 760), "sky", 0.18);
  // curved window wall with a city + sky
  const win = (x) => { const d = R(x, 90, 280, 520, 140); return q.sh(d, "glass", { w: "scene", flat: true }) + q.clip(d, q.vgrad(x, 90, 280, 520, [[0, "sky", 0], [1, "sky", 1]]) + q.sh(L.rect(x + 20, 400, 50, 220), "teal", { w: "hair", flat: true, tone: 1 }) + q.sh(L.rect(x + 90, 330, 60, 290), "sky", { w: "hair", flat: true, tone: 2 }) + q.sh(L.rect(x + 170, 440, 70, 180), "teal", { w: "hair", flat: true, tone: 2 })) + L.stroke(d, { c: "gray", w: 12 }); };
  r += win(50) + win(1590);
  // holo board
  r += q.sh(R(520, 110, 880, 430, 40), "navy", { w: "scene", tone: 1 }) + q.raw(() => L.shape(R(548, 138, 824, 374, 26), "teal", { w: "detail", tone: 2, flat: true })) + q.glow(960, 330, 560, "teal", 0.4, 1, 260);
  r += q.raw(() => L.stroke(`M600 440 l90 -80 l90 40 l110 -120 l110 70 l100 -150 l90 60`, { c: "white", w: 9 }) + L.stroke(C(1230, 290, 70), { c: "yellow", w: 9 }) + L.stroke(`M1230 220 V360 M1160 290 H1300`, { c: "yellow", w: 4, op: 0.8 }) + L.flat(R(600, 170, 220, 26, 10) + R(600, 214, 150, 18, 8), "white", 0.8));
  // ceiling strip lights
  r += q.raw(() => L.shape(R(240, 30, 520, 22, 11) + R(1160, 30, 520, 22, 11), "white", { w: "detail", flat: true }));
  // floor
  r += q.sh(P([[-20, 740], [1940, 740], [1940, 1100], [-20, 1100]], true), "white", { w: "scene", tone: 2, dir: "v" }) + L.flat(P([[-20, 740], [1940, 740], [1940, 1100], [-20, 1100]], true), "sky", 0.3);
  r += q.line(`M960 740 V1100 M700 740 L420 1100 M1220 740 L1500 1100 M200 740 L-300 1100 M1720 740 L2220 1100`, "sky", 0.7, "detail");
  r += q.glows([[960, 900, 800, 90]], "teal", 1, 0.25);
  // floating hex desks + robot helper
  const desk = (x, y, s) => q.shd(x, y + 90 * s, 140 * s) + q.sh(L.poly(Array.from({ length: 6 }, (_, i) => [x + Math.cos(i * Math.PI / 3) * 90 * s, y + Math.sin(i * Math.PI / 3) * 36 * s]), true), "teal", { w: "detail", tone: 0 }) + q.glow(x, y + 36 * s, 100 * s, "teal", 0.5, 1, 22 * s) + q.sh(R(x - 30 * s, y - 40 * s, 60 * s, 40 * s, 8 * s), "navy", { w: "hair", flat: true, tone: 1 }) + q.raw(() => L.flat(R(x - 24 * s, y - 34 * s, 48 * s, 28 * s, 5 * s), "teal", 0.9));
  r += desk(220, 860, 1.2) + desk(420, 960, 1) + desk(1700, 860, 1.2) + desk(1500, 960, 1);
  const rb = 1560, rby = 650;
  r += q.sh(R(rb - 40, rby - 70, 80, 70, 24), "white", { w: "detail", tone: 0 }) + q.sh(C(rb - 18, rby - 36, 11) + C(rb + 18, rby - 36, 11), "blue", { w: "hair", flat: true, tone: 0 }) + L.stroke(`M${rb} ${rby - 70} v-24`, { c: "ink", w: "detail" }) + q.sh(C(rb, rby - 100, 8), "red", { w: "hair", flat: true }) + q.glow(rb, rby + 20, 70, "teal", 0.5, 1, 14);
  return r;
}, ["classroom", "future", "school", "holographic", "sci-fi", "technology", "learning", "robot"]);

reg("world-laboratory", "Bright science laboratory", PL, (q) => {
  let r = q.sh(L.rect(-20, -20, 1960, 800), "wall", { w: "scene", tone: 0, dir: "v" }) + L.flat(L.rect(-20, 560, 1960, 220), "white", 0.5);
  r += q.sh(L.rect(-20, 700, 1960, 120), "white", { w: "scene", tone: 0 }) + L.flat(L.rect(-20, 700, 1960, 120), "sky", 0.3);
  let tiles = ""; for (let x = 0; x < 1920; x += 120) tiles += `M${x} 700 V820`; r += q.line(tiles + "M0 760 H1920", "ink", 0.2, "detail");
  r += q.sh(P([[-20, 820], [1940, 820], [1940, 1100], [-20, 1100]], true), "floor", { w: "scene", tone: 0, dir: "v" }) + q.line(`M0 900 H1920 M0 1000 H1920 M300 820 L100 1100 M700 820 L600 1100 M1220 820 L1320 1100 M1620 820 L1820 1100`, "ink", 0.2, "detail");
  // window with sunlight
  r += q.sh(R(780, 100, 360, 300, 20), "glass", { w: "scene", flat: true }) + q.clip(R(780, 100, 360, 300, 20), q.vgrad(780, 100, 360, 300, [[0, "sky", 0], [1, "sky", 1]]) + q.sh(C(1010, 190, 40), "yellow", { w: "hair", flat: true })) + L.stroke(`M960 100 V400 M780 250 H1140`, { c: "wood", w: 10 }) + L.stroke(R(780, 100, 360, 300, 20), { c: "wood", w: 14 });
  r += L.flat(P([[780, 400], [1140, 400], [1300, 1000], [600, 1000]], true), "white", 0.12);
  // glassware: Erlenmeyer, beaker, round flask, test tube, reagent bottle (liquid clipped inside the glass, glints on top)
  const GL = { erlen: ["M-13 -80 L-13 -44 Q-13 -34 -22 -22 L-40 -4 Q-46 4 -36 4 L36 4 Q46 4 40 -4 L22 -22 Q13 -34 13 -44 L13 -80 Z", -80, [-17, -88, 34, 9], "M-32 -2 L-14 -24 M-8 -70 V-46"], beaker: ["M-32 -70 L-32 -2 Q-32 4 -26 4 L26 4 Q32 4 32 -2 L32 -70 Z", -70, [-36, -76, 72, 9], "M-22 -60 V-12"],
    round: ["M-11 -104 L-11 -76 A38 38 0 1 0 11 -76 L11 -104 Z", -104, [-15, -112, 30, 9], "M-28 -30 Q-26 -50 -14 -62"], tube: ["M-10 -64 L-10 -8 A10 10 0 0 0 10 -8 L10 -64 Z", -64, [-13, -70, 26, 8], "M-5 -56 V-14"] };
  const glass = (kind, x, y, k, c, lvl = 0.4, bub = true) => { const [d, top, rim, hl] = GL[kind], ly = 4 + (top - 4) * lvl;
    return L.g(q.sh(d, "glass", { w: "detail", flat: true }) + q.clip(d, L.flat(L.rect(-60, ly, 120, 140), c, 0.92) + L.flat(L.rect(-60, ly + 14, 120, 130), "ink", 0.12) + L.flat(C(0, ly, kind === "tube" ? 9 : 26, 4), "white", 0.5) +
      (bub ? [[-8, ly + 14, 3], [6, ly + 26, 2.4], [0, ly + 8, 2]].map(([bx, by, br]) => L.flat(C(bx, by, br), "white", 0.85)).join("") : "")) + L.stroke(d, { c: "ink", w: "detail" }) +
      q.sh(L.rect(rim[0], rim[1], rim[2], rim[3]), "glass", { w: "detail", flat: true, tone: 1 }) + L.stroke(hl, { c: "white", w: 5, op: 0.8 }), `translate(${x} ${y}) scale(${k})`); };
  const bottle = (x, y, k, c) => L.g(q.sh(R(-9, -78, 18, 26, 4), "glass", { w: "detail", flat: true }) + q.sh(R(-22, -56, 44, 56, 10), c, { w: "detail", tone: 1 }) + q.sh(R(-16, -38, 32, 22, 3), "paper", { w: "hair", flat: true }) + L.stroke("M-10 -30 H10 M-10 -24 H4", { c: "ink", w: "hair", op: 0.6 }) + q.sh(R(-11, -90, 22, 14, 4), "brown", { w: "detail", flat: true, tone: 1 }) + L.stroke("M-16 -46 V-14", { c: "white", w: 4, op: 0.7 }), `translate(${x} ${y}) scale(${k})`);
  const rack = (x, y, cols) => q.sh(R(x, y - 10, 30 + cols.length * 32, 12, 4), "wood", { w: "detail", flat: true }) + cols.map((c, i) => glass("tube", x + 30 + i * 32, y - 6, 0.9, c, 0.5 - (i % 2) * 0.12)).join("") + q.sh(R(x, y - 40, 8, 40, 3), "wood", { w: "detail", flat: true, tone: 1 }) + q.sh(R(x + 22 + cols.length * 32, y - 40, 8, 40, 3), "wood", { w: "detail", flat: true, tone: 1 });
  const shelf = (x, kinds) => { let o = q.sh(L.rect(x, 250, 360, 16), "wood", { w: "detail", flat: true }) + q.sh(L.rect(x, 430, 360, 16), "wood", { w: "detail", flat: true });
    [["red", 30], ["blue", 100], ["green", 170], ["yellow", 240], ["purple", 310]].forEach(([c, dx], i) => { o += glass(kinds[i], x + dx, 250, 0.85, c, 0.35) + bottle(x + dx, 430, 0.95, ["orange", "teal", "pink", "blue", "green"][(i + (x > 1000 ? 2 : 0)) % 5]); }); return o; };
  r += shelf(100, ["erlen", "beaker", "round", "erlen", "tube"]) + shelf(1460, ["round", "erlen", "beaker", "tube", "erlen"]);
  // poster + periodic-like grid
  r += q.sh(R(450, 150, 200, 260, 10), "paper", { w: "detail", flat: true }) + L.stroke((() => { let t = ""; for (let i = 0; i < 5; i++) t += `M470 ${190 + i * 38} H630`; for (let i = 0; i < 6; i++) t += `M${470 + i * 32} 180 V380`; return t; })(), { c: "ink", w: "hair", op: 0.5 }) + q.raw(() => L.flat(R(470, 190, 32, 38) + R(534, 266, 32, 38) + R(598, 342, 32, 38), "orange", 0.8));
  r += q.sh(R(1270, 150, 160, 220, 10), "paper", { w: "detail", flat: true }) + q.line(`M1290 330 q30 -80 60 0 t60 -40 M1290 190 h110 M1290 220 h80`, "ink", 0.6, "detail");
  // bench with equipment
  r += q.sh(R(60, 760, 560, 60, 8), "gray", { w: "detail", tone: 0 }) + q.sh(L.rect(80, 820, 520, 280), "wood", { w: "detail", tone: 1 }) + q.line(`M340 820 V1100 M80 940 H600`, "ink", 0.4, "detail");
  r += q.sh(R(1300, 760, 560, 60, 8), "gray", { w: "detail", tone: 0 }) + q.sh(L.rect(1320, 820, 520, 280), "wood", { w: "detail", tone: 1 }) + q.line(`M1580 820 V1100 M1320 940 H1840`, "ink", 0.4, "detail");
  // microscope + test tubes on the left bench, big glassware on the right bench
  const mx = 190, my = 760;
  r += q.sh(R(mx - 60, my - 16, 130, 18, 6), "gray", { w: "detail", flat: true }) + q.sh(L.limb([[mx + 38, my - 14], [mx + 62, my - 64], [mx + 34, my - 116]], 28, 20), "gray", { w: "detail", flat: true, tone: 1 }) +
    q.sh(R(mx - 54, my - 60, 70, 9, 3), "gray", { w: "detail", flat: true }) + q.sh(L.limb([[mx - 8, my - 140], [mx - 34, my - 74]], 28, 24), "navy", { w: "detail", flat: true, tone: 0 }) + q.sh(L.limb([[mx - 6, my - 150], [mx + 2, my - 176]], 14, 12), "gray", { w: "detail", flat: true, tone: 1 }) +
    q.sh(R(mx - 42, my - 74, 14, 16, 3), "gray", { w: "detail", flat: true }) + q.sh(C(mx + 50, my - 70, 10), "gold", { w: "detail", flat: true }) + q.sh(C(mx - 18, my - 30, 11, 6), "yellow", { w: "hair", flat: true, tone: 1 });
  r += rack(400, 760, ["red", "blue", "green", "yellow"]);
  r += glass("erlen", 1420, 760, 1.35, "green", 0.4) + glass("beaker", 1545, 760, 1.4, "blue", 0.55) + glass("round", 1665, 760, 1.2, "red", 0.4) + rack(1710, 760, ["purple", "orange", "teal"]);
  r += L.stroke("M1665 640 q-14 -16 0 -32 q14 -16 0 -32", { c: "white", w: "detail", op: 0.7 });
  return r;
}, ["laboratory", "science", "lab", "experiment", "chemistry", "research", "scientist"]);
})();
