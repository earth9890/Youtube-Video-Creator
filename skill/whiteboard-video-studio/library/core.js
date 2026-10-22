// ===================== library/core.js — style tokens + asset registry (see library/BRIEF.md) =====================
// Every library asset is a pure function that returns SVG markup drawn through the current LOOK (style tokens), so
// switching the whole library to another look is one call: L.look("D"). Same markup in the gallery and in videos:
// L.svg(name, o) -> "<g>…</g>" string (gallery), L.put(S, name, x, y, o) -> injects it into an engine scene.
// Coordinates: every asset draws around its own origin (figures: feet centre at 0,0; props: see meta.box).
(function () {
const L = (window.L = window.L || {});

// ---------- palettes: [base, light (lit side), dark (shade side)] ----------
L.BASE = {
  ink: ["#1d1b1f", "#3a363d", "#000000"], paper: ["#fbf7ef", "#ffffff", "#ece4d4"], white: ["#ffffff", "#ffffff", "#e9e4dc"],
  sky: ["#a9dcf5", "#d6f0fc", "#7cc3ea"], night: ["#2f4a86", "#48649f", "#1c2f5c"], dusk: ["#f6c9a8", "#fbe3cf", "#e3a27c"],
  grass: ["#7cc576", "#a3db8e", "#4f9a48"], earth: ["#d9a86c", "#ecc896", "#b07a43"], sand: ["#ecd49e", "#f6e7c4", "#cfb173"],
  wall: ["#f3e2c4", "#fbf0dc", "#e0c79f"], floor: ["#c8976a", "#dbb58e", "#9c6f48"], wood: ["#b08968", "#cfa888", "#7f5f45"],
  blue: ["#2f6fd6", "#6d9ee8", "#1f4fa3"], navy: ["#1f2a44", "#3a4a6e", "#121a2e"], purple: ["#8e5bb5", "#b48ad6", "#67408a"],
  green: ["#3f9e4a", "#6fc078", "#2c7536"], red: ["#e5383b", "#f2787a", "#b02225"], orange: ["#ff8c1a", "#ffb466", "#d06a00"],
  yellow: ["#ffcf33", "#ffe38a", "#e0a800"], pink: ["#f28ca0", "#f7b6c3", "#d0607a"], gray: ["#9aa0a6", "#c4c8cc", "#6f757b"],
  brown: ["#5a3825", "#7a5236", "#3d2418"], gold: ["#f2b84b", "#f8d58f", "#c98e1c"], glass: ["#dff3ff", "#ffffff", "#b9def5"],
  stone: ["#a7a39c", "#c9c5bd", "#7d7973"], snow: ["#f4f8fb", "#ffffff", "#d3e0ea"], water: ["#4aa3df", "#86c6ef", "#2b78b5"],
  lava: ["#ff5a1f", "#ffa05a", "#b8320b"], teal: ["#2bb3a3", "#6fd6c9", "#1d8075"], cream: ["#fff1cf", "#fffaf0", "#f0d9a6"],
  // skin tones (s1 lightest … s6 deepest); heads use "white" in the classic v3 look
  s1: ["#fde3d2", "#fff1e8", "#efc6ad"], s2: ["#f6cfae", "#fde2c9", "#e2ad86"], s3: ["#e3ad84", "#efc6a3", "#c58b60"],
  s4: ["#c98d5f", "#dcaa80", "#a46c42"], s5: ["#9b623b", "#b67d55", "#774527"], s6: ["#6b3f24", "#87573a", "#4b2915"],
};
const hx = (c) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16));
L.mix = (a, b, k) => { const A = hx(a), B = hx(b); return "#" + A.map((v, i) => Math.round(v + (B[i] - v) * k).toString(16).padStart(2, "0")).join(""); };
const mapPal = (f) => Object.fromEntries(Object.entries(L.BASE).map(([k, v]) => [k, k === "ink" || k === "white" || /^s\d$/.test(k) ? v : v.map(f)]));
L.PALETTES = {
  v3: L.BASE,
  pastel: mapPal((c) => L.mix(c, "#ffffff", 0.32)),
  primary: mapPal((c) => { const [r, g, b] = hx(c), m = (r + g + b) / 3; return "#" + [r, g, b].map((v) => Math.max(0, Math.min(255, Math.round(m + (v - m) * 1.45)))).map((v) => v.toString(16).padStart(2, "0")).join(""); }),
  storybook: mapPal((c) => L.mix(c, "#f0b878", 0.18)),
  documentary: mapPal((c) => L.mix(c, "#8a8f94", 0.3)),
};
L.PALETTES.contrast = Object.fromEntries(Object.entries(L.BASE).map(([k, v]) => [k, [v[0], L.mix(v[1], "#ffffff", 0.25), L.mix(v[2], "#000000", 0.35)]]));

// ---------- style tokens (the LOOK). Every asset reads these; never hard-code widths/colours in assets ----------
L.DEFAULT = {
  name: "A", label: "Look A · current v3",
  line: { char: 7, prop: 5, scene: 3, detail: 3, hair: 2 }, // outline px at scale 1 (figures scale by √s)
  ink: "ink",            // outline colour: ink | navy | shade (darker tone of the fill) | none
  cap: "round", join: "round",
  radius: 1,             // multiplier on prop/building corner radii (0 = sharp)
  limb: { k: 1, style: "stick" }, // stick | tube (thick, round ends) | taper (thick → thin) | hose (rubber-hose curves)
  head: { ratio: 1, shape: "circle", fill: "white" }, // shape: circle | oval | bean ; fill: white | skin | none
  shade: "grad",         // grad (soft, lit top-left) | flat | cel (one hard shadow)
  shadow: true,          // contact shadow under things that stand
  palette: "v3",
  font: "Mali",          // see L.FONTS
};
L.FONTS = { Mali: "'Mali', 'Mali SemiBold'", Fredoka: "'Fredoka'", Baloo: "'Baloo 2'", ComicNeue: "'Comic Neue'", Gaegu: "'Gaegu'",
  PatrickHand: "'PatrickHand', 'Patrick Hand'", Chewy: "'Chewy'", Nunito: "'Nunito'" };
const deep = (a, b) => { const o = Object.assign({}, a); for (const k in b) o[k] = b[k] && typeof b[k] === "object" && !Array.isArray(b[k]) ? Object.assign({}, a[k], b[k]) : b[k]; return o; };
L.LOOKS = {}; // filled by stylelab.js (A … J); A = L.DEFAULT
L.T = L.DEFAULT;
L.with = (over) => deep(L.DEFAULT, over || {});
L.look = (nameOrTokens) => (L.T = typeof nameOrTokens === "string" ? L.LOOKS[nameOrTokens] || L.DEFAULT : deep(L.DEFAULT, nameOrTokens));
L.useLook = (tok, fn) => { const prev = L.T; L.T = tok; try { return fn(); } finally { L.T = prev; } }; // render one thing under another look

// ---------- colour + paint ----------
L.pal = () => L.PALETTES[L.T.palette] || L.BASE;
L.c = (name, tone = 0) => { const p = L.pal()[name]; return p ? p[tone] : name; }; // unknown name = raw colour (internal use only)
let CTX = null; // render context: collects <defs> (gradients) for one L.svg call
const uid = () => "lg" + (L._n = (L._n || 0) + 1);
// fill for a solid object: soft gradient / flat / cel by token. dir: diag | v | h
L.paint = (name, o = {}) => {
  const tone = o.tone || 0, mode = o.flat ? "flat" : L.T.shade;
  if (mode === "flat" || !CTX) return L.c(name, tone);
  const P = L.pal()[name]; if (!P) return name;
  const [x2, y2] = o.dir === "v" ? [0, 1] : o.dir === "h" ? [1, 0] : [1, 1], id = uid();
  const stops = mode === "cel" ? [[0, P[tone === 2 ? 0 : 1]], [0.58, P[tone === 2 ? 0 : 1]], [0.58, P[2]], [1, P[2]]] : [[0, P[1]], [0.55, P[tone]], [1, P[2]]];
  CTX.defs.push(`<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}">${stops.map(([of, c]) => `<stop offset="${of}" stop-color="${c}"/>`).join("")}</linearGradient>`);
  return `url(#${id})`;
};
L.outline = (fillName) => { const m = L.T.ink; if (m === "none") return "none"; if (m === "navy") return "#22304f"; if (m === "shade" && fillName && L.pal()[fillName]) return L.mix(L.pal()[fillName][2], "#000000", 0.45); return L.c("ink"); };
L.lw = (kind = "prop", s = 1) => (L.T.ink === "none" && kind !== "limb" ? 0 : (L.T.line[kind] || L.T.line.prop) * Math.sqrt(Math.max(s, 0.3)));

// ---------- SVG builders (strings) ----------
const f1 = (v) => Math.round(v * 10) / 10;
L.f1 = f1;
const attrs = (a) => Object.entries(a).filter(([, v]) => v !== undefined && v !== null && v !== false).map(([k, v]) => `${k}="${typeof v === "number" ? f1(v) : v}"`).join(" ");
L.tag = (name, a, inner = "") => `<${name} ${attrs(a)}${inner ? `>${inner}</${name}>` : "/>"}`;
// a solid filled+outlined shape. o: { tone, w: line kind (prop|char|scene|detail|hair), s (scale for width), flat, dir, op, c (outline override) }
const PALE = ["white", "paper", "snow", "cream", "glass"]; // no-outline looks still give pale shapes a soft edge, or they vanish on light backgrounds
L.shape = (d, name, o = {}) => L.tag("path", { d, fill: L.paint(name, o), stroke: o.c || (L.T.ink === "none" && PALE.includes(name) ? L.c(name, 2) : L.outline(name)), "stroke-width": L.T.ink === "none" && PALE.includes(name) && !o.c ? L.T.line.hair * 1.5 : L.lw(o.w || "prop", o.s || 1), "stroke-linecap": L.T.cap, "stroke-linejoin": L.T.join, opacity: o.op });
// a line only. o: { c (colour name or raw), w (kind) | px, s, op, dash }
L.stroke = (d, o = {}) => L.tag("path", { d, fill: "none", stroke: L.c(o.c || "ink"), "stroke-width": typeof o.w === "number" ? o.w : (L.T.line[o.w || "prop"] || 5) * Math.sqrt(Math.max(o.s || 1, 0.3)), "stroke-linecap": L.T.cap, "stroke-linejoin": L.T.join, opacity: o.op, "stroke-dasharray": o.dash });
L.flat = (d, c, op) => L.tag("path", { d, fill: L.c(c), opacity: op }); // no outline (highlights, shadows, sky)
L.text = (str, x, y, o = {}) => L.tag("text", { x, y, "font-family": L.FONTS[o.font || L.T.font] || L.FONTS.Mali, "font-size": o.size || 64, "font-weight": o.weight || 600, "text-anchor": o.anchor || "middle", fill: L.c(o.c || "ink"),
  stroke: o.halo ? L.c(o.halo) : undefined, "stroke-width": o.halo ? (o.size || 64) * (o.haloW || 0.1) : undefined, "paint-order": o.halo ? "stroke fill" : undefined, "stroke-linejoin": "round", "letter-spacing": o.spacing }, String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;"));
L.g = (inner, tr, op) => `<g${tr ? ` transform="${tr}"` : ""}${op !== undefined ? ` opacity="${op}"` : ""}>${inner}</g>`;
L.shadow = (cx, gy, w) => (L.T.shadow ? L.tag("ellipse", { cx, cy: gy + 2, rx: w / 2, ry: w * 0.07, fill: L.c("ink"), opacity: 0.22 }) : "");

// ---------- path helpers (same maths as the engine, no jitter) ----------
L.circ = (cx, cy, r, ry = r) => `M${f1(cx - r)} ${f1(cy)} A${f1(r)} ${f1(ry)} 0 1 0 ${f1(cx + r)} ${f1(cy)} A${f1(r)} ${f1(ry)} 0 1 0 ${f1(cx - r)} ${f1(cy)} Z`;
L.rect = (x, y, w, h) => `M${f1(x)} ${f1(y)} h${f1(w)} v${f1(h)} h${f1(-w)} Z`;
L.rrect = (x, y, w, h, r) => { r = Math.min(r * L.T.radius, w / 2, h / 2); if (r <= 0.5) return L.rect(x, y, w, h); return `M${f1(x + r)} ${f1(y)} H${f1(x + w - r)} A${f1(r)} ${f1(r)} 0 0 1 ${f1(x + w)} ${f1(y + r)} V${f1(y + h - r)} A${f1(r)} ${f1(r)} 0 0 1 ${f1(x + w - r)} ${f1(y + h)} H${f1(x + r)} A${f1(r)} ${f1(r)} 0 0 1 ${f1(x)} ${f1(y + h - r)} V${f1(y + r)} A${f1(r)} ${f1(r)} 0 0 1 ${f1(x + r)} ${f1(y)} Z`; };
L.poly = (pts, close) => "M" + pts.map((p) => `${f1(p[0])} ${f1(p[1])}`).join(" L") + (close ? " Z" : "");
L.line = (a, b) => `M${f1(a[0])} ${f1(a[1])} L${f1(b[0])} ${f1(b[1])}`;
// Catmull-Rom → cubic Bézier through the points (closed if first == last)
L.smooth = (pts) => {
  if (pts.length < 3) return L.poly(pts);
  const closed = pts[0][0] === pts[pts.length - 1][0] && pts[0][1] === pts[pts.length - 1][1];
  const P = (i) => pts[closed ? (i + pts.length - 1) % (pts.length - 1) : Math.max(0, Math.min(pts.length - 1, i))];
  let d = `M${f1(pts[0][0])} ${f1(pts[0][1])}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = P(i - 1), p1 = pts[i], p2 = pts[i + 1], p3 = P(i + 2);
    d += ` C${f1(p1[0] + (p2[0] - p0[0]) / 6)} ${f1(p1[1] + (p2[1] - p0[1]) / 6)} ${f1(p2[0] - (p3[0] - p1[0]) / 6)} ${f1(p2[1] - (p3[1] - p1[1]) / 6)} ${f1(p2[0])} ${f1(p2[1])}`;
  }
  return d + (closed ? " Z" : "");
};
L.arcPts = (cx, cy, r, a0, a1, n = 12, ry = r) => Array.from({ length: n + 1 }, (_, i) => { const a = ((a0 + ((a1 - a0) * i) / n) * Math.PI) / 180; return [cx + Math.cos(a) * r, cy + Math.sin(a) * ry]; });
L.arc = (cx, cy, r, a0, a1, ry = r) => L.smooth(L.arcPts(cx, cy, r, a0, a1, 12, ry));
L.star = (cx, cy, r1, r2, n = 5, a0 = -90) => L.poly(Array.from({ length: n * 2 }, (_, i) => { const a = ((a0 + (i * 180) / n) * Math.PI) / 180, r = i % 2 ? r2 : r1; return [cx + Math.cos(a) * r, cy + Math.sin(a) * r]; }), true);
// thick limb outline around a polyline, width w0 → w1 (taper / tube). Returns a closed path to fill.
L.limb = (pts, w0, w1 = w0) => {
  const n = pts.length, L1 = [], R1 = [];
  for (let i = 0; i < n; i++) {
    const a = pts[Math.max(0, i - 1)], b = pts[Math.min(n - 1, i + 1)], dx = b[0] - a[0], dy = b[1] - a[1], m = Math.hypot(dx, dy) || 1, w = (w0 + ((w1 - w0) * i) / (n - 1)) / 2;
    L1.push([pts[i][0] - (dy / m) * w, pts[i][1] + (dx / m) * w]); R1.push([pts[i][0] + (dy / m) * w, pts[i][1] - (dx / m) * w]);
  }
  const end = pts[n - 1], st = pts[0], we = w1 / 2, ws = w0 / 2;
  return L.smooth([...L1, [end[0] + (end[0] - pts[n - 2][0]) / (Math.hypot(end[0] - pts[n - 2][0], end[1] - pts[n - 2][1]) || 1) * we, end[1] + (end[1] - pts[n - 2][1]) / (Math.hypot(end[0] - pts[n - 2][0], end[1] - pts[n - 2][1]) || 1) * we], ...R1.reverse(), [st[0] - (pts[1][0] - st[0]) / (Math.hypot(pts[1][0] - st[0], pts[1][1] - st[1]) || 1) * ws, st[1] - (pts[1][1] - st[1]) / (Math.hypot(pts[1][0] - st[0], pts[1][1] - st[1]) || 1) * ws], L1[0]]);
};
// deterministic pseudo-random (seeded) so assets look the same every render
L.rng = (seed = 1) => () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;

// ---------- registry ----------
// L.reg(category, name, fn, meta): fn(o) -> markup string drawn around the origin.
// meta: { box: [x0, y0, w, h] (gallery viewBox), tags: [...], call: "usage line", group: "sub-heading", params: "…" }
L.ITEMS = [];
L.CATS = [];
L.reg = (cat, name, fn, meta = {}) => {
  if (!L.CATS.includes(cat)) L.CATS.push(cat);
  L.ITEMS = L.ITEMS.filter((i) => i.name !== name);
  L.ITEMS.push(Object.assign({ cat, name, fn, box: [-160, -160, 320, 320], tags: [], call: `L.put(S, "${name}", x, y, { s: 1, t })` }, meta));
};
L.get = (name) => L.ITEMS.find((i) => i.name === name);
// render one asset (or a raw fn) to an SVG <g> string, with its gradients
L.svg = (nameOrFn, o = {}) => {
  const it = typeof nameOrFn === "function" ? { fn: nameOrFn } : L.get(nameOrFn);
  if (!it) return `<!-- missing ${nameOrFn} -->`;
  const outer = CTX, ctx = (CTX = outer || { defs: [] });
  let body;
  try { body = it.fn(Object.assign({}, it.defaults || {}, o)); } catch (e) { body = `<!-- ${it.name}: ${e.message} -->`; console.error(it.name, e); }
  CTX = outer;
  return outer ? body : `<g>${ctx.defs.length ? `<defs>${ctx.defs.join("")}</defs>` : ""}${body}</g>`;
};
L.inline = (name, o) => L.svg(name, o); // for composing assets inside other assets (shares the caller's defs)

// ---------- engine adapter (videos): place a library asset in a scene ----------
// L.put(S, name, x, y, { s, t, flip, rot, parent, look, ...assetOptions }) -> <g>. Fades in on its word (t), like DS elements.
L.put = (S, name, x, y, o = {}) => {
  const g = S.grp(o.parent), it = L.get(name) || {};
  const ao = Object.assign({}, o); if (!it.selfScale) delete ao.s; // selfScale assets (people) use o.s for √s line weights; others scale by transform
  const mk = () => L.svg(name, ao);
  g.innerHTML = o.look ? L.useLook(typeof o.look === "string" ? L.LOOKS[o.look] : L.with(o.look), mk) : mk();
  const k = it.selfScale ? 1 : o.s || 1;
  g.setAttribute("transform", `translate(${f1(x)} ${f1(y)})${o.rot ? ` rotate(${o.rot})` : ""} scale(${(o.flip ? -1 : 1) * k} ${k})`);
  if (o.t !== undefined && o.t > S.start + 0.05) S.fadeIn(g, o.t, 0.35);
  return g;
};
})();
