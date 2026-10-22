// ===================== library/infographic.js — data & explainer graphics (category "info") =====================
// Charts, counters, timelines, comparisons, diagrams, maps, pictograms and meters for narrated science videos.
// Reusable through options (values, labels, n, pct, text …). Labels switch off with o.labels === false.
// Colours/widths come from the L tokens only. Names are prefixed "info-".
(function () {
const L = window.L, f1 = L.f1;

// ---------- helpers ----------
const D2R = Math.PI / 180, P = (r, a, cx = 0, cy = 0) => [cx + r * Math.cos(a * D2R), cy + r * Math.sin(a * D2R)];
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const num = (v) => String(Math.round(v * 100) / 100);
const COLS = ["blue", "orange", "green", "red", "purple", "teal"];
const col = (o, i) => (o.colors || COLS)[i % (o.colors || COLS).length];
const T = (s, x, cy, z = {}) => L.text(s, x, cy + (z.size || 64) * 0.34, z);      // text centred vertically on cy
const lab = (o, s, x, cy, z) => (o.labels === false ? "" : T(s, x, cy, z));
const onCol = (s, x, cy, size, z = {}) => T(s, x, cy, Object.assign({ size, c: "white", halo: "ink", haloW: 0.12 }, z));
const fs = (s, maxW, size) => Math.min(size, maxW / (Math.max(String(s).length, 1) * 0.56));
const blk = (x, y, w, h, c, r = 14, z = {}) => L.shape(L.rrect(x, y, w, h, r), c, z);
const axis = (x0, x1, y) => L.stroke(L.line([x0, y], [x1, y]), { w: "prop" });
const grid = (x0, x1, ys) => ys.map((y) => L.stroke(L.line([x0, y], [x1, y]), { c: "gray", w: "detail", op: 0.35, dash: "10 10" })).join("");
const dotp = (x, y, r, c = "white", z = {}) => L.shape(L.circ(x, y, r), c, Object.assign({ w: "detail" }, z));
const arrow = (pts, c = "ink", w = "prop", hs = 22) => {
  const a = pts[pts.length - 2], b = pts[pts.length - 1], ang = Math.atan2(b[1] - a[1], b[0] - a[0]);
  const h = (d) => [b[0] - hs * Math.cos(ang + d), b[1] - hs * Math.sin(ang + d)];
  return L.stroke(pts.length > 2 ? L.smooth(pts) : L.poly(pts), { c, w }) + L.stroke(L.poly([h(0.5), b, h(-0.5)]), { c, w });
};
const blockArrow = (x0, x1, cy, h, hh, c) => L.shape(L.poly([[x0, cy - h / 2], [x1 - hh, cy - h / 2], [x1 - hh, cy - hh], [x1, cy], [x1 - hh, cy + hh], [x1 - hh, cy + h / 2], [x0, cy + h / 2]], true), c);
let nid = 0;
const clipD = (d, inner) => { const id = "inf" + ++nid; return `<clipPath id="${id}"><path d="${d}"/></clipPath><g clip-path="url(#${id})">${inner}</g>`; };
const clipR = (x, y, w, h, inner) => clipD(L.rect(x, y, w, h), inner);
const pt = (v) => `${f1(v[0])} ${f1(v[1])}`;
// ring sector (r0 = 0 gives a pie slice), angles in degrees, clockwise on screen
const sector = (cx, cy, r0, r1, a0, a1) => {
  a1 = Math.min(a1, a0 + 359.7);
  const A = P(r1, a0, cx, cy), B = P(r1, a1, cx, cy), C = P(r0, a1, cx, cy), E = P(r0, a0, cx, cy), big = a1 - a0 > 180 ? 1 : 0;
  return `M${pt(A)} A${r1} ${r1} 0 ${big} 1 ${pt(B)} L${pt(C)}` + (r0 > 0 ? ` A${r0} ${r0} 0 ${big} 0 ${pt(E)} Z` : " Z");
};
const wrap2 = (s, n) => { s = String(s); if (s.length <= n || !s.includes(" ")) return [s]; const m = s.length / 2; let best = -1; for (let i = 0; i < s.length; i++) if (s[i] === " " && (best < 0 || Math.abs(i - m) < Math.abs(best - m))) best = i; return [s.slice(0, best), s.slice(best + 1)]; };
// one or two centred lines that fit maxW
const ml = (s, x, cy, size, maxW, z = {}) => {
  const ln = wrap2(s, Math.floor(maxW / (size * 0.56))), sz = Math.min(size, ...ln.map((l) => fs(l, maxW, size)));
  return ln.length === 1 ? T(ln[0], x, cy, Object.assign({ size: sz }, z)) : ln.map((l, i) => T(l, x, cy + (i - 0.5) * sz * 1.05, Object.assign({ size: sz }, z))).join("");
};
const legend = (names, o, cx, y, size = 30) => {
  const w = names.map((n) => 44 + n.length * size * 0.58 + 26), tot = w.reduce((a, b) => a + b, 0); let x = cx - tot / 2 + 4, s = "";
  names.forEach((n, i) => { s += blk(x, y - 13, 26, 26, col(o, i), 7, { w: "detail" }) + T(n, x + 38, y, { size, anchor: "start" }); x += w[i]; });
  return s;
};
const pin = (x, y, c, sz = 70, text) => {
  const r = sz * 0.5, cy = y - sz * 1.15;
  return L.shape(`M${f1(x)} ${f1(y)} L${f1(x - r * 0.85)} ${f1(cy + r * 0.55)} A${f1(r)} ${f1(r)} 0 1 1 ${f1(x + r * 0.85)} ${f1(cy + r * 0.55)} Z`, c, { w: "detail" }) +
    (text ? L.shape(L.circ(x, cy, r * 0.62), "white", { w: "detail", flat: true }) + T(text, x, cy, { size: r * 0.9 }) : L.shape(L.circ(x, cy, r * 0.38), "white", { w: "detail", flat: true }));
};
const person = (x, y, h, c, flat) => {
  const w = h * 0.52;
  return L.shape(L.rrect(x - w / 2, y - h * 0.6, w, h * 0.6, w * 0.42), c, { w: "detail", flat }) + L.shape(L.circ(x, y - h * 0.8, h * 0.2), c, { w: "detail", flat });
};
const R = (group, name, label, fn, m) => L.reg("info", "info-" + name, fn, { group, label, box: m.box, demo: m.demo, wide: m.wide,
  tags: ["infographic", "data", ...(m.tags || [])], call: `L.put(S, "info-${name}", x, y, { s, t${m.opts ? ", " + m.opts : ""} })` });
const ABC = "ABCDEFGH";

// ===================== Bars & histograms =====================
R("Bars & histograms", "bars-vertical", "Bars · vertical (2–6)", (o) => {
  const d = (o.values || [3, 5, 8, 6]).slice(0, 6), n = d.length, lb = o.labels || d.map((_, i) => ABC[i]), g = clamp(o.grow === undefined ? 1 : o.grow), mx = Math.max(...d, o.max || 0);
  const bw = Math.min(90, 520 / n - 28), gap = 28, w = n * bw + (n - 1) * gap, base = 150, H = 270, z = n > 4 ? 28 : 34;
  let s = axis(-w / 2 - 30, w / 2 + 30, base);
  d.forEach((v, i) => { const x = -w / 2 + i * (bw + gap), h = Math.max((v / mx) * H * g, 0.5);
    s += blk(x, base - h, bw, h, col(o, i), 12) + (o.labels === false ? "" : T(lb[i] || "", x + bw / 2, base + 38, { size: z })) + (g > 0.6 && o.showValues !== false ? T(num(v) + (o.unit || ""), x + bw / 2, base - h - 26, { size: z }) : ""); });
  return s; },
  { box: [-330, -170, 660, 400], demo: { values: [3, 5, 8, 6], labels: ["Mon", "Tue", "Wed", "Thu"] }, opts: "values: [2–6 numbers], labels, grow: 0..1, unit, colors", tags: ["bar chart", "graph", "columns", "grow"] });

R("Bars & histograms", "bars-horizontal", "Bars · horizontal (2–6)", (o) => {
  const d = (o.values || [80, 55, 35, 20]).slice(0, 6), n = d.length, lb = o.labels || d.map((_, i) => ABC[i]), g = clamp(o.grow === undefined ? 1 : o.grow), mx = Math.max(...d, o.max || 0);
  const rh = 70, gap = 18, tot = n * rh + (n - 1) * gap, W = 400, x0 = -40;
  let s = L.stroke(L.line([x0, -tot / 2 - 14], [x0, tot / 2 + 14]), { w: "prop" });
  d.forEach((v, i) => { const y = -tot / 2 + i * (rh + gap), w = Math.max((v / mx) * W * g, 1);
    s += blk(x0, y, w, rh, col(o, i), 14) + lab(o, lb[i] || "", x0 - 18, y + rh / 2, { size: fs(lb[i], 250, 36), anchor: "end" }) + (g > 0.6 && o.showValues !== false ? T(num(v) + (o.unit || ""), x0 + w + 16, y + rh / 2, { size: 36, anchor: "start" }) : ""); });
  return s; },
  { box: [-340, -280, 860, 560], demo: { values: [80, 55, 35, 20], labels: ["Cats", "Dogs", "Fish", "Birds"], unit: "%" }, opts: "values, labels, grow, unit, colors", tags: ["bar chart", "graph", "rows", "ranking"] });

R("Bars & histograms", "bars-grouped", "Bars · grouped (two series)", (o) => {
  const d = (o.values || [[3, 5], [6, 4], [8, 9]]).slice(0, 5), n = d.length, lb = o.labels || d.map((_, i) => ABC[i]), nm = o.names || ["Before", "After"], g = clamp(o.grow === undefined ? 1 : o.grow);
  const mx = Math.max(...d.flat()), bw = Math.min(60, Math.floor(560 / n / 2.4)), gw = 2 * bw + 6, gap = 44, tot = n * gw + (n - 1) * gap, base = 150, H = 250;
  let s = axis(-tot / 2 - 30, tot / 2 + 30, base) + (o.labels === false ? "" : legend(nm, o, 0, -195, 30));
  d.forEach((p, i) => { const x0 = -tot / 2 + i * (gw + gap);
    p.forEach((v, k) => { const h = Math.max((v / mx) * H * g, 0.5), x = x0 + k * (bw + 6);
      s += blk(x, base - h, bw, h, col(o, k), 10) + (g > 0.6 ? T(num(v), x + bw / 2, base - h - 22, { size: 28 }) : ""); });
    s += lab(o, lb[i] || "", x0 + gw / 2, base + 36, { size: 32 }); });
  return s; },
  { box: [-340, -220, 680, 470], demo: { values: [[3, 5], [6, 4], [8, 9]], labels: ["Mon", "Tue", "Wed"], names: ["Before", "After"] }, opts: "values: [[a, b], ..], labels, names, grow", tags: ["bar chart", "compare", "two series", "graph"] });

R("Bars & histograms", "bars-stacked", "Bars · stacked columns", (o) => {
  const d = (o.values || [[3, 2, 1], [4, 3, 2], [5, 4, 3]]).slice(0, 5), n = d.length, lb = o.labels || d.map((_, i) => ABC[i]), nm = o.names || ["Water", "Land", "Ice"];
  const tots = d.map((p) => p.reduce((a, b) => a + b, 0)), mx = Math.max(...tots), bw = Math.min(110, 520 / n - 30), gap = 30, w = n * bw + (n - 1) * gap, base = 150, H = 270, g = clamp(o.grow === undefined ? 1 : o.grow);
  let s = axis(-w / 2 - 30, w / 2 + 30, base) + (o.labels === false ? "" : legend(nm, o, 0, -215, 30));
  d.forEach((p, i) => { const x = -w / 2 + i * (bw + gap); let y = base;
    p.forEach((v, k) => { const h = Math.max((v / mx) * H * g, 0.5); y -= h; s += blk(x, y, bw, h, col(o, k), 6) + (h > 36 ? onCol(num(v), x + bw / 2, y + h / 2, 30) : ""); });
    s += lab(o, lb[i] || "", x + bw / 2, base + 36, { size: 32 }); });
  return s; },
  { box: [-340, -240, 680, 500], demo: { values: [[3, 2, 1], [4, 3, 2], [5, 4, 3]], labels: ["2010", "2020", "2030"], names: ["Water", "Land", "Ice"] }, opts: "values: [[a, b, c], ..], labels, names, grow", tags: ["bar chart", "stacked", "parts", "graph"] });

R("Bars & histograms", "bars-steps", "Bars · rising / falling steps", (o) => {
  const down = o.dir === "down", d = (o.values || (down ? [10, 8, 6, 4, 2] : [2, 4, 6, 8, 10])).slice(0, 7), n = d.length, mx = Math.max(...d), bw = 80, gap = 12, w = n * bw + (n - 1) * gap, base = 150, H = 270, c = o.c || (down ? "red" : "green");
  let s = axis(-w / 2 - 20, w / 2 + 20, base);
  const tops = d.map((v, i) => [-w / 2 + i * (bw + gap) + bw / 2, base - (v / mx) * H]);
  d.forEach((v, i) => { const h = (v / mx) * H; s += blk(-w / 2 + i * (bw + gap), base - h, bw, h, c, 10, { tone: i % 2 ? 0 : 1 }); });
  const a = tops[0], b = tops[n - 1];
  s += arrow([[a[0] - 20, a[1] - 60], [b[0] + 20, b[1] - 70]], "ink", "prop", 26);
  return s + (o.text ? T(o.text, 0, -200, { size: 52 }) : ""); },
  { box: [-340, -250, 680, 440], demo: { text: "Growing!" }, opts: "values, dir: 'up' | 'down', c, text", tags: ["growth", "trend", "increase", "decrease", "staircase"] });

R("Bars & histograms", "bars-versus", "Bars · two big bars with ×N", (o) => {
  const d = (o.values || [20, 80]).slice(0, 2), lb = o.labels || ["Small", "Big"], mx = Math.max(...d), mn = Math.min(...d), bw = 150, base = 150, H = 300, r = mx / Math.max(mn, 0.0001), rt = "×" + (r < 10 ? Math.round(r * 10) / 10 : Math.round(r));
  let s = axis(-260, 260, base);
  d.forEach((v, i) => { const x = i ? 50 : -200, h = (v / mx) * H; s += blk(x, base - h, bw, h, col(o, i), 14) + onCol(num(v) + (o.unit || ""), x + bw / 2, base - h + 44, 46) + lab(o, lb[i], x + bw / 2, base + 40, { size: 38 }); });
  return s + (o.times === false ? "" : L.shape(L.star(-25, -180, 70, 52, 12), "gold") + T(rt, -25, -180, { size: 52, weight: 700 })); },
  { box: [-290, -270, 580, 520], demo: { values: [20, 80], labels: ["Then", "Now"] }, opts: "values: [a, b], labels, unit, times: false", tags: ["compare", "versus", "times bigger", "ratio"] });

R("Bars & histograms", "histogram", "Histogram", (o) => {
  const d = o.values || [2, 5, 9, 14, 10, 6, 3], n = d.length, mx = Math.max(...d), W = 600, bw = W / n, base = 150, H = 290, hi = o.hi === undefined ? d.indexOf(mx) : o.hi;
  let s = "";
  d.forEach((v, i) => { const h = (v / mx) * H; s += blk(-W / 2 + i * bw, base - h, bw, h, i === hi ? "orange" : o.c || "blue", 4); });
  s += axis(-W / 2 - 20, W / 2 + 20, base);
  return s + lab(o, o.xlabel || "", 0, base + 46, { size: 34 }); },
  { box: [-340, -170, 680, 400], demo: { values: [2, 5, 9, 14, 10, 6, 3], xlabel: "Height" }, opts: "values: [bins], hi: index, c, xlabel", tags: ["distribution", "frequency", "statistics", "bins"] });

R("Bars & histograms", "scatter", "Scatter plot + trend line", (o) => {
  const n = o.n || 26, r = L.rng(o.seed || 5), W = 600, H = 300, x0 = -W / 2, y0 = 150, noise = o.noise === undefined ? 0.16 : o.noise, dir = o.dir === "down" ? -1 : 1;
  let s = L.stroke(L.poly([[x0 - 20, y0 - H - 20], [x0 - 20, y0 + 10], [W / 2 + 20, y0 + 10]]), { w: "prop" });
  const A = [x0, dir > 0 ? y0 - 0.12 * H : y0 - 0.88 * H], B = [W / 2, dir > 0 ? y0 - 0.88 * H : y0 - 0.12 * H];
  s += L.stroke(L.line(A, B), { c: "orange", w: 8, dash: "22 14" });
  for (let i = 0; i < n; i++) { const t = (i + 0.5) / n, x = x0 + 14 + t * (W - 28), y = A[1] + (B[1] - A[1]) * t + (r() - 0.5) * 2 * noise * H; s += dotp(x, clamp(y, y0 - H, y0 - 8), 11, "blue", { flat: true }); }
  return s + lab(o, o.xlabel || "", 0, y0 + 50, { size: 34 }) + (o.ylabel && o.labels !== false ? L.g(T(o.ylabel, 0, 0, { size: 34 }), `translate(${x0 - 38} ${y0 - H / 2}) rotate(-90)`) : ""); },
  { box: [-370, -180, 740, 420], demo: { xlabel: "Hours of sleep", ylabel: "Mood" }, opts: "n, noise: 0..1, dir: 'up' | 'down', xlabel, ylabel, seed", tags: ["correlation", "statistics", "dots", "trend", "graph"] });

// ===================== Lines & curves =====================
const lineFrame = (x0, W, y0, H, rows = 3) => L.stroke(L.poly([[x0 - 20, y0 - H - 20], [x0 - 20, y0 + 10], [x0 + W + 20, y0 + 10]]), { w: "prop" }) + grid(x0, x0 + W, Array.from({ length: rows }, (_, i) => y0 - ((i + 1) * H) / rows));
const growClip = (o, x0, W, y0, H, inner) => { const g = clamp(o.grow === undefined ? 1 : o.grow); return g >= 1 ? inner : clipR(x0 - 40, y0 - H - 60, (W + 80) * g, H + 140, inner); };

R("Lines & curves", "line-chart", "Line chart", (o) => {
  const d = o.values || [2, 3, 2.6, 5, 4.4, 7, 9], mx = Math.max(...d, o.max || 0), W = 540, H = 270, x0 = -W / 2, y0 = 140, lb = o.labels;
  const pts = d.map((v, i) => [x0 + (i / (d.length - 1)) * W, y0 - (v / mx) * H]);
  let s = lineFrame(x0, W, y0, H) + growClip(o, x0, W, y0, H, L.stroke(L.smooth(pts), { c: o.c || "blue", w: 11 }) + pts.map(([x, y], i) => dotp(x, y, 13, i === pts.length - 1 ? "orange" : "white")).join(""));
  if (lb && o.labels !== false) pts.forEach((p, i) => { s += T(lb[i] || "", p[0], y0 + 46, { size: 28 }); });
  return s + (o.text ? T(o.text, 0, y0 - H - 30, { size: 44 }) : ""); },
  { box: [-340, -200, 680, 440], demo: { values: [2, 3, 2.6, 5, 4.4, 7, 9], labels: ["M", "T", "W", "T", "F", "S", "S"] }, opts: "values, labels, grow: 0..1, c, text", tags: ["graph", "trend", "data", "time series"] });

R("Lines & curves", "area-chart", "Area chart", (o) => {
  const d = o.values || [3, 4, 3.5, 6, 5, 8, 7.5, 10], mx = Math.max(...d), W = 540, H = 270, x0 = -W / 2, y0 = 140;
  const pts = d.map((v, i) => [x0 + (i / (d.length - 1)) * W, y0 - (v / mx) * H]), c = o.c || "teal";
  return lineFrame(x0, W, y0, H) + growClip(o, x0, W, y0, H, L.flat(L.smooth(pts) + ` L${f1(x0 + W)} ${y0} L${f1(x0)} ${y0} Z`, c, 0.45) + L.stroke(L.smooth(pts), { c, w: 10 })) + (o.text ? T(o.text, 0, y0 - H - 30, { size: 44 }) : ""); },
  { box: [-340, -200, 680, 440], demo: { text: "Total over time" }, opts: "values, grow: 0..1, c, text", tags: ["graph", "area", "filled", "volume", "data"] });

R("Lines & curves", "line-two", "Line chart · two lines", (o) => {
  const d = o.values || [[2, 3, 4, 4.5, 6, 7], [2, 2.4, 2.2, 3, 3.1, 3.2]], nm = o.names || ["Us", "Them"], mx = Math.max(...d.flat()), W = 540, H = 260, x0 = -W / 2, y0 = 150;
  let s = lineFrame(x0, W, y0, H) + (o.labels === false ? "" : legend(nm, o, 0, y0 - H - 44, 30));
  d.forEach((ser, k) => { const pts = ser.map((v, i) => [x0 + (i / (ser.length - 1)) * W, y0 - (v / mx) * H]);
    s += growClip(o, x0, W, y0, H, L.stroke(L.smooth(pts), { c: col(o, k), w: 10 }) + dotp(pts[pts.length - 1][0], pts[pts.length - 1][1], 14, col(o, k))); });
  return s; },
  { box: [-340, -230, 680, 480], demo: { names: ["Us", "Them"] }, opts: "values: [[..], [..]], names, grow, colors", tags: ["graph", "compare", "two lines", "race"] });

R("Lines & curves", "line-decline", "Line chart · falling", (o) => {
  const d = o.values || [9, 8.6, 8, 6.2, 4.6, 3.2, 1.8], mx = Math.max(...d), W = 540, H = 270, x0 = -W / 2, y0 = 140;
  const pts = d.map((v, i) => [x0 + (i / (d.length - 1)) * W, y0 - (v / mx) * H]), e = pts[pts.length - 1];
  return lineFrame(x0, W, y0, H) + L.flat(L.smooth(pts) + ` L${f1(x0 + W)} ${y0} L${f1(x0)} ${y0} Z`, "red", 0.15) + growClip(o, x0, W, y0, H, L.stroke(L.smooth(pts), { c: "red", w: 11 }) + dotp(e[0], e[1], 14, "red")) +
    (o.text === false ? "" : L.shape(L.rrect(110, -170, 190, 84, 24), "red") + onCol(o.text || "−80%", 205, -128, 54)); },
  { box: [-340, -200, 680, 440], demo: { text: "−80%" }, opts: "values, text, grow", tags: ["decline", "drop", "crash", "decrease", "graph"] });

R("Lines & curves", "curve-exponential", "Exponential vs linear curve", (o) => {
  const W = 540, H = 290, x0 = -W / 2, y0 = 150, k = o.k || 4.2, e = [], l = [];
  for (let i = 0; i <= 24; i++) { const t = i / 24; e.push([x0 + t * W, y0 - ((Math.exp(k * t) - 1) / (Math.exp(k) - 1)) * H]); }
  l.push([x0, y0], [x0 + W, y0 - H * 0.42]);
  return L.stroke(L.poly([[x0 - 20, y0 - H - 30], [x0 - 20, y0 + 10], [x0 + W + 40, y0 + 10]]), { w: "prop" }) + L.stroke(L.poly(l), { c: "gray", w: 8, dash: "20 14" }) +
    growClip(o, x0, W, y0, H, L.stroke(L.smooth(e), { c: "red", w: 12 }) + dotp(e[24][0], e[24][1], 14, "orange")) +
    lab(o, o.names ? o.names[0] : "Exponential", x0 + W * 0.58, y0 - H * 0.75, { size: 36, c: "red", anchor: "end" }) + lab(o, o.names ? o.names[1] : "Linear", x0 + W * 0.3, y0 - H * 0.126 - 44, { size: 32, c: "gray" }) + lab(o, o.xlabel || "Time", x0 + W / 2, y0 + 52, { size: 32 }); },
  { box: [-340, -200, 680, 420], demo: {}, opts: "k: steepness, names: [fast, slow], xlabel, grow", tags: ["exponential", "growth", "curve", "doubling", "compound", "graph"] });

R("Lines & curves", "bell-curve", "Bell curve · normal distribution", (o) => {
  const W = 620, H = 270, y0 = 140, at = o.at === undefined ? 1.2 : o.at, ptsA = [];
  const X = (u) => (u / 3) * (W / 2), Y = (u) => y0 - Math.exp((-u * u) / 2) * H;
  for (let i = 0; i <= 40; i++) { const u = -3 + (i * 6) / 40; ptsA.push([X(u), Y(u)]); }
  const area = L.smooth(ptsA) + ` L${X(3)} ${y0} L${X(-3)} ${y0} Z`;
  return L.flat(area, o.c || "blue", 0.25) + clipR(X(at), y0 - H - 20, W, H + 40, L.flat(area, "orange", 0.7)) + L.stroke(L.smooth(ptsA), { c: o.c || "blue", w: 10 }) + axis(-W / 2 - 20, W / 2 + 20, y0) +
    L.stroke(L.line([X(at), y0], [X(at), Y(at) - 40]), { c: "red", w: "prop", dash: "12 10" }) + lab(o, o.text || "You", X(at) + 14, Y(at) - 50, { size: 40, c: "red", anchor: "start" }) + lab(o, o.avg || "Average", 0, y0 + 40, { size: 32, c: "gray" }); },
  { box: [-350, -200, 700, 400], demo: { text: "You", at: 1.2 }, opts: "at: -3..3, text, avg, c", tags: ["statistics", "normal", "distribution", "average", "percentile", "graph"] });

// ===================== Pies, rings & shares =====================
R("Pies, rings & shares", "pie", "Pie chart with legend", (o) => {
  const d = o.values || [40, 25, 20, 15], lb = o.labels || d.map((_, i) => ABC[i]), tot = d.reduce((a, b) => a + b, 0), r = 150, cx = o.labels === false ? 0 : -140, pull = o.pull === undefined ? 0 : o.pull; let a0 = -90, s = "";
  d.forEach((v, i) => { const a1 = a0 + (v / tot) * 360, am = ((a0 + a1) / 2) * D2R, ex = i === pull ? 16 : 0;
    s += L.g(L.shape(sector(cx, 0, 0, r, a0, a1), col(o, i)) + (v / tot > 0.07 ? onCol(Math.round((v / tot) * 100) + "%", cx + Math.cos(am) * r * 0.62, Math.sin(am) * r * 0.62, 36) : ""), `translate(${f1(Math.cos(am) * ex)} ${f1(Math.sin(am) * ex)})`); a0 = a1; });
  if (o.labels !== false) d.forEach((v, i) => { const y = (i - (d.length - 1) / 2) * 62; s += blk(60, y - 17, 34, 34, col(o, i), 8, { w: "detail" }) + T(lb[i] || "", 112, y, { size: fs(lb[i], 220, 38), anchor: "start" }); });
  return s; },
  { box: [-310, -190, 720, 380], demo: { values: [40, 25, 20, 15], labels: ["Water", "Rock", "Gas", "Ice"] }, opts: "values, labels, pull: slice index, colors", tags: ["pie chart", "percent", "share", "parts", "graph"] });

R("Pies, rings & shares", "donut", "Donut chart · centre text", (o) => {
  const d = o.values || [45, 30, 25], tot = d.reduce((a, b) => a + b, 0); let a0 = -90, s = "";
  d.forEach((v, i) => { const a1 = a0 + (v / tot) * 360; s += L.shape(sector(0, 0, 82, 160, a0, a1 - (d.length > 1 ? 0.01 : 0)), col(o, i)); a0 = a1; });
  const lines = wrap2(o.text || "Total", 7);
  return s + (o.big ? T(o.big, 0, lines.length > 1 ? -22 : -6, { size: 56, weight: 700 }) + lab(o, lines.join(" "), 0, 38, { size: fs(lines.join(" "), 130, 32), c: "gray" }) : lab(o, o.text || "", 0, 0, { size: 44 })); },
  { box: [-200, -190, 400, 380], demo: { values: [45, 30, 25], big: "100", text: "people" }, opts: "values, big, text, colors", tags: ["donut", "ring", "percent", "share", "graph"] });

R("Pies, rings & shares", "ring-pct", "Percentage ring", (o) => {
  const p = clamp((o.pct === undefined ? 72 : o.pct) / 100, 0, 0.9995), c = o.c || "green";
  return L.shape(sector(0, 0, 100, 160, -90, 269.6), "gray", { tone: 1, flat: true }) + (p > 0.002 ? L.shape(sector(0, 0, 100, 160, -90, -90 + p * 360), c) : "") +
    T(Math.round(p * 100) + "%", 0, o.text ? -14 : 0, { size: 74, weight: 700 }) + (o.text ? lab(o, o.text, 0, 44, { size: fs(o.text, 150, 34), c: "gray" }) : ""); },
  { box: [-190, -190, 380, 380], demo: { pct: 72, text: "done" }, opts: "pct: 0..100, text, c", tags: ["percent", "ring", "progress", "circle", "stat"] });

R("Pies, rings & shares", "ring-triple", "Three rings · activity style", (o) => {
  const p = o.pcts || [85, 62, 40], lb = o.labels || ["Move", "Eat", "Sleep"], cs = o.colors || ["red", "green", "blue"], rs = [[118, 160], [76, 114], [34, 72]]; let s = "";
  p.slice(0, 3).forEach((v, i) => { const q = clamp(v / 100, 0, 0.9995); s += L.shape(sector(-110, 0, rs[i][0], rs[i][1], -90, 269.6), "gray", { tone: 1, flat: true }) + L.shape(sector(-110, 0, rs[i][0], rs[i][1], -90, -90 + q * 360), cs[i]); });
  if (o.labels !== false) p.slice(0, 3).forEach((v, i) => { const y = (i - 1) * 84; s += blk(90, y - 18, 36, 36, cs[i], 9, { w: "detail" }) + T(lb[i] || "", 142, y - 14, { size: 34, anchor: "start" }) + T(v + "%", 142, y + 22, { size: 30, anchor: "start", c: "gray" }); });
  return s; },
  { box: [-300, -190, 680, 380], demo: { pcts: [85, 62, 40], labels: ["Move", "Eat", "Sleep"] }, opts: "pcts: [a, b, c], labels, colors", tags: ["rings", "percent", "goals", "progress", "fitness"] });

R("Pies, rings & shares", "pie-fraction", "Pie · one slice pulled out", (o) => {
  const p = clamp((o.pct === undefined ? 25 : o.pct) / 100, 0.02, 0.98), r = 150, a1 = -90 + p * 360, am = ((-90 + a1) / 2) * D2R, c = o.c || "orange";
  return L.shape(sector(0, 0, 0, r, a1, 270), "gray", { tone: 1 }) + L.g(L.shape(sector(0, 0, 0, r, -90, a1), c), `translate(${f1(Math.cos(am) * 30)} ${f1(Math.sin(am) * 30)})`) +
    T(o.text || Math.round(p * 100) + "%", Math.cos(am) * (r * 0.55 + 30), Math.sin(am) * (r * 0.55 + 30), { size: fs(o.text || "00%", 150, 64), c: "white", halo: "ink", haloW: 0.12, weight: 700 }); },
  { box: [-210, -200, 420, 400], demo: { pct: 25, text: "1/4" }, opts: "pct: 0..100, text, c", tags: ["fraction", "slice", "share", "percent", "portion"] });

R("Pies, rings & shares", "half-donut", "Half donut · parliament style", (o) => {
  const d = o.values || [50, 30, 20], lb = o.labels || ["A", "B", "C"], tot = d.reduce((a, b) => a + b, 0); let a0 = 180, s = "";
  d.forEach((v, i) => { const a1 = a0 + (v / tot) * 180; s += L.shape(sector(0, 60, 100, 200, a0, a1 - 0.01), col(o, i)); a0 = a1; });
  s += T(o.big || String(tot), 0, 20, { size: 84, weight: 700 }) + lab(o, o.text || "", 0, 76, { size: 34, c: "gray" });
  if (o.labels !== false) s += legend(lb, o, 0, 130, 30);
  return s; },
  { box: [-230, -170, 460, 340], demo: { values: [50, 30, 20], labels: ["Yes", "No", "Maybe"], big: "100", text: "votes" }, opts: "values, labels, big, text", tags: ["half donut", "semi circle", "vote", "share", "graph"] });

R("Pies, rings & shares", "bubbles", "Bubble chart · size = amount", (o) => {
  const d = (o.values || [100, 55, 25, 10]).slice(0, 6), lb = o.labels || d.map((_, i) => ABC[i]), mx = Math.max(...d), R0 = 150, rs = d.map((v) => Math.max(R0 * Math.sqrt(v / mx), 22)), tot = rs.reduce((a, b) => a + 2 * b, 0) + (d.length - 1) * 10; let x = -tot / 2, s = "";
  d.forEach((v, i) => { const r = rs[i]; s += L.shape(L.circ(x + r, 0, r), col(o, i)) + (r > 38 ? onCol(num(v), x + r, 0, Math.min(46, r * 0.5)) : "") + lab(o, lb[i] || "", x + r, r + 34, { size: 30 }); x += 2 * r + 10; });
  return s; },
  { box: [-420, -190, 840, 400], demo: { values: [100, 55, 25, 10], labels: ["Sun", "Giants", "Rocks", "Moon"] }, opts: "values (2–6), labels, colors", tags: ["bubbles", "size", "compare", "area", "proportion"] });

R("Pies, rings & shares", "radar", "Radar chart · 5 skills", (o) => {
  const v = o.values || [0.8, 0.6, 0.9, 0.5, 0.7], lb = o.labels || ["Speed", "Power", "Brain", "Luck", "Charm"], n = v.length, R0 = 150, ang = (i) => -90 + (i * 360) / n; let s = "";
  [1, 0.66, 0.33].forEach((k) => { s += L.stroke(L.poly(v.map((_, i) => P(R0 * k, ang(i))), true), { c: "gray", w: "detail", op: 0.55 }); });
  v.forEach((_, i) => { s += L.stroke(L.line([0, 0], P(R0, ang(i))), { c: "gray", w: "detail", op: 0.55 }); });
  const pts = v.map((q, i) => P(R0 * clamp(q), ang(i)));
  s += L.flat(L.poly(pts, true), o.c || "blue", 0.4) + L.stroke(L.poly(pts, true), { c: o.c || "blue", w: 8 }) + pts.map(([x, y]) => dotp(x, y, 11, "white")).join("");
  v.forEach((_, i) => { const p = P(R0 + 46, ang(i)); s += lab(o, lb[i] || "", p[0], p[1], { size: 32 }); });
  return s; },
  { box: [-300, -240, 600, 490], demo: { values: [0.8, 0.6, 0.9, 0.5, 0.7], labels: ["Speed", "Power", "Brain", "Luck", "Charm"] }, opts: "values: [0..1 × 3–8], labels, c", tags: ["radar", "spider", "skills", "stats", "profile"] });

R("Pies, rings & shares", "heatmap", "Heat map grid", (o) => {
  const rows = o.rows || 6, cols = o.cols || 8, r = L.rng(o.seed || 3), cell = 62, lo = L.c("sky", 1), hi = L.c("red", 0), mid = L.c("yellow", 0); let s = "";
  for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
    const v = o.values ? o.values[y][x] : clamp((x / (cols - 1)) * 0.55 + (1 - y / (rows - 1)) * 0.3 + (r() - 0.5) * 0.3), c = v < 0.5 ? L.mix(lo, mid, v * 2) : L.mix(mid, hi, (v - 0.5) * 2);
    s += L.shape(L.rrect(-cols * cell / 2 + x * cell + 3, -rows * cell / 2 + y * cell + 3, cell - 6, cell - 6, 12), c, { w: "detail", flat: true }); }
  return s; },
  { box: [-340, -250, 680, 500], demo: {}, opts: "rows, cols, values: [[0..1]], seed", tags: ["heatmap", "grid", "hot cold", "intensity", "data"] });

// ===================== Numbers & counters =====================
R("Numbers & counters", "big-number", "Big number with highlight", (o) => {
  const v = String(o.value === undefined ? "1,000,000" : o.value), size = Math.min(230, 800 / (v.length * 0.6)), w = v.length * size * 0.58, by = -40 + size * 0.34;
  return L.stroke(L.line([-w / 2, by - size * 0.16], [w / 2, by - size * 0.16]), { c: o.c || "yellow", w: size * 0.34, op: 0.75 }) + T(v, 0, -40, { size, weight: 700 }) +
    (o.unit ? T(o.unit, 0, by + size * 0.3, { size: 66 }) : "") + (o.caption ? T(o.caption, 0, 150, { size: 46, c: "gray" }) : ""); },
  { box: [-430, -200, 860, 400], demo: { value: "1,000,000", unit: "stars", caption: "in just one picture" }, opts: "value, unit, caption, c", tags: ["number", "stat", "counter", "huge", "million"] });

R("Numbers & counters", "counter-digits", "Odometer digits", (o) => {
  const v = String(o.value === undefined ? "48,213" : o.value), bw = 84, h = 124; let w = 0; [...v].forEach((c) => (w += /\d/.test(c) ? bw + 10 : 26)); let x = -w / 2, s = "";
  [...v].forEach((c) => { if (/\d/.test(c)) { s += blk(x, -h / 2, bw, h, "navy", 14) + L.flat(L.rect(x + 4, -2, bw - 8, 4), "white", 0.14) + T(c, x + bw / 2, 0, { size: 92, c: "white", weight: 700 }); x += bw + 10; } else { s += T(c, x + 10, 36, { size: 80, weight: 700 }); x += 26; } });
  return s + (o.caption ? T(o.caption, 0, 112, { size: 42, c: "gray" }) : ""); },
  { box: [-430, -90, 860, 250], demo: { value: "48,213", caption: "days" }, opts: "value, caption", tags: ["counter", "odometer", "digits", "number", "score"] });

R("Numbers & counters", "tally", "Tally marks", (o) => {
  const n = clamp(o.n === undefined ? 13 : o.n, 0, 40), per = 4; let s = "";
  for (let g = 0; g * 5 < n; g++) { const k = Math.min(5, n - g * 5), gx = -300 + (g % per) * 170, gy = -80 + Math.floor(g / per) * 150;
    for (let i = 0; i < Math.min(k, 4); i++) s += L.stroke(L.line([gx + i * 28, gy], [gx + i * 28, gy + 104]), { w: 10 });
    if (k === 5) s += L.stroke(L.line([gx - 16, gy + 86], [gx + 100, gy + 18]), { c: "red", w: 10 }); }
  return s + (o.text ? T(o.text, 0, 180, { size: 48 }) : ""); },
  { box: [-350, -110, 700, 330], demo: { n: 13, text: "13 so far" }, opts: "n: 0..40, text", tags: ["tally", "count", "marks", "five bar gate", "score"] });

R("Numbers & counters", "number-line", "Number line", (o) => {
  const a = o.from === undefined ? 0 : o.from, b = o.to === undefined ? 10 : o.to, st = o.step || 1, W = 700, x0 = -W / 2, X = (v) => x0 + ((v - a) / (b - a)) * W, at = o.at === undefined ? 7 : o.at; let s = arrow([[x0 - 30, 0], [W / 2 + 40, 0]], "ink", "prop", 26);
  const cnt = Math.round((b - a) / st), skip = Math.ceil(cnt / 11);
  for (let i = 0; i <= cnt; i++) { const v = a + i * st; s += L.stroke(L.line([X(v), -14], [X(v), 14]), { w: "prop" }); if (i % skip === 0) s += T(num(v), X(v), 48, { size: 34 }); }
  (o.marks || []).forEach(([v, l], i) => { s += dotp(X(v), 0, 15, col(o, i + 2)) + lab(o, l, X(v), 104, { size: 32, c: col(o, i + 2) }); });
  return s + (o.pointer === false ? "" : L.shape(L.poly([[X(at), -8], [X(at) - 26, -62], [X(at) + 26, -62]], true), "orange") + T(o.text || num(at), X(at), -108, { size: 54, weight: 700 })); },
  { box: [-410, -160, 820, 300], demo: { from: 0, to: 10, at: 7 }, opts: "from, to, step, at, text, marks: [[v, label], ..]", tags: ["number line", "scale", "axis", "maths", "position"] });

R("Numbers & counters", "powers-of-ten", "Powers of ten ladder", (o) => {
  const n = o.n || 6, W = 700, x0 = -W / 2, at = o.at, lb = o.labels || [], p10 = (e, x, y, sz) => T("10", x - sz * 0.18, y, { size: sz, weight: 700 }) + T(e, x + sz * 0.42, y - sz * 0.38, { size: sz * 0.62, weight: 700 });
  let s = arrow([[x0 - 30, 0], [W / 2 + 40, 0]], "ink", "prop", 26);
  for (let i = 0; i <= n; i++) { const x = x0 + (i / n) * W; s += dotp(x, 0, 17, i === at ? "orange" : "white") + p10(i, x, -56, 44) + (i === at ? "" : lab(o, lb[i] || "", x, 62, { size: 28, c: "gray" })); }
  if (at !== undefined) { const x = x0 + (at / n) * W; s += arrow([[x, 138], [x, 40]], "red", "prop", 22) + (o.text ? T(o.text, x, 168, { size: 40, c: "red" }) : ""); }
  return s; },
  { box: [-410, -130, 820, 330], demo: { n: 6, labels: ["one", "", "", "thousand", "", "", "million"], at: 3, text: "you are here" }, opts: "n, labels: [..], at: exponent, text", tags: ["powers of ten", "scale", "orders of magnitude", "exponent", "big numbers"] });

R("Numbers & counters", "percent-grid", "Percent grid · 100 squares", (o) => {
  const p = clamp(Math.round(o.pct === undefined ? 37 : o.pct), 0, 100), cell = 42; let s = "";
  for (let i = 0; i < 100; i++) { const x = i % 10, y = 9 - Math.floor(i / 10); s += L.shape(L.rrect(-210 + x * cell + 3, -230 + y * cell + 3, cell - 6, cell - 6, 8), i < p ? o.c || "orange" : "gray", { w: "detail", flat: true, tone: i < p ? 0 : 1 }); }
  return s + T(p + "%" + (o.text ? " " + o.text : ""), 0, 232, { size: 56, weight: 700 }); },
  { box: [-240, -250, 480, 540], demo: { pct: 37, text: "of people" }, opts: "pct: 0..100, text, c", tags: ["percent", "grid", "100", "share", "out of 100"] });

R("Numbers & counters", "fraction-bar", "Fraction bar · k of n", (o) => {
  const n = clamp(o.n || 8, 2, 16), k = clamp(o.k === undefined ? 3 : o.k, 0, n), W = 680, w = W / n; let s = "";
  for (let i = 0; i < n; i++) s += blk(-W / 2 + i * w, -50, w, 100, i < k ? o.c || "green" : "paper", 4, { w: "prop", flat: i >= k });
  return s + T(k + " / " + n, 0, 130, { size: 80, weight: 700 }); },
  { box: [-380, -80, 760, 280], demo: { n: 8, k: 3 }, opts: "n: parts, k: filled, c", tags: ["fraction", "parts", "bar", "maths", "out of"] });

R("Numbers & counters", "times-badge", "×N starburst badge", (o) => {
  const t = String(o.text || "×1000");
  return L.shape(L.star(0, 0, 150, 116, 16, -90), o.c || "gold") + T(t, 0, 0, { size: fs(t, 190, 104), weight: 700 }) + (o.caption ? T(o.caption, 0, 190, { size: 42, c: "gray" }) : ""); },
  { box: [-180, -170, 360, 400], demo: { text: "×1000", caption: "bigger" }, opts: "text, caption, c", tags: ["times", "multiplier", "burst", "badge", "bigger", "x"] });

R("Numbers & counters", "change-arrow", "Change arrow · +25% / −25%", (o) => {
  const up = o.dir !== "down", c = up ? "green" : "red", t = o.text || (up ? "+25%" : "−25%"), m = up ? 1 : -1;
  return L.shape(L.poly([[-40, 110], [-40, 0], [-90, 0], [0, -120], [90, 0], [40, 0], [40, 110]].map(([x, y]) => [x, y * m]), true), c) + T(t, 130, 0, { size: fs(t, 380, 120), weight: 700, anchor: "start", c }); },
  { box: [-130, -150, 620, 300], demo: { dir: "up", text: "+25%" }, opts: "dir: 'up' | 'down', text", tags: ["increase", "decrease", "percent change", "up", "down", "arrow"] });

R("Numbers & counters", "equation", "Equation boxes", (o) => {
  const tk = o.tokens || ["2", "+", "3", "=", "5"], OP = /^[+\-−×÷=x*/<>?]$/; const ws = tk.map((t) => (OP.test(t) ? 70 : Math.max(120, String(t).length * 52 + 40))), tot = ws.reduce((a, b) => a + b, 0) + (tk.length - 1) * 16; let x = -tot / 2, s = "", k = 0;
  tk.forEach((t, i) => { if (OP.test(t)) s += T(t, x + ws[i] / 2, 0, { size: 96, weight: 700 }); else { s += blk(x, -60, ws[i], 120, col(o, k++), 22) + onCol(t, x + ws[i] / 2, 0, fs(t, ws[i] - 20, 76), { weight: 700 }); } x += ws[i] + 16; });
  return s; },
  { box: [-440, -100, 880, 200], demo: { tokens: ["2", "+", "3", "=", "5"] }, opts: "tokens: ['2', '+', '3', '=', '5']", tags: ["equation", "maths", "sum", "formula", "plus"] });

R("Numbers & counters", "dot-array", "Dot array · n dots", (o) => {
  const n = clamp(o.n === undefined ? 50 : o.n, 1, 100), k = o.k || 0, cols = o.cols || 10, sp = 42; let s = ""; const rows = Math.ceil(n / cols);
  for (let i = 0; i < n; i++) s += dotp(-((cols - 1) * sp) / 2 + (i % cols) * sp, -((rows - 1) * sp) / 2 + Math.floor(i / cols) * sp - 20, 15, i < k ? "orange" : o.c || "blue", { flat: true });
  return s + (o.text ? T(o.text, 0, (rows * sp) / 2 + 20, { size: 50 }) : ""); },
  { box: [-250, -250, 500, 500], demo: { n: 50, k: 12, text: "50 dots" }, opts: "n: 1..100, k: highlighted, cols, text, c", tags: ["dots", "count", "quantity", "many", "array"] });

// ===================== Time & timelines =====================
R("Time & timelines", "timeline-eras", "Timeline · coloured eras + markers", (o) => {
  const er = o.eras || [["Ice Age", 3.4], ["Farms", 2.6], ["Cities", 2.2], ["Machines", 2.2]], mk = o.marks || [[0.08, "Fire"], [0.5, "Wheel"], [0.93, "Rocket"]], W = 820, x0 = -W / 2, tot = er.reduce((a, b) => a + b[1], 0), bh = 92;
  let x = x0, seg = "";
  er.forEach(([l, w], i) => { const sw = (w / tot) * W; seg += L.flat(L.rect(x, -bh / 2, sw, bh), col(o, i)) + (i ? L.stroke(L.line([x, -bh / 2], [x, bh / 2]), { w: "detail" }) : "") + (o.labels === false ? "" : ml(l, x + sw / 2, 0, 34, sw - 14, { c: "white", halo: "ink", haloW: 0.12 })); x += sw; });
  let s = clipD(L.rrect(x0, -bh / 2, W, bh, 26), seg) + L.stroke(L.rrect(x0, -bh / 2, W, bh, 26), { w: "prop" });
  mk.forEach(([p, l]) => { const mx = x0 + p * W; s += L.stroke(L.line([mx, -bh / 2], [mx, -130]), { w: "detail" }) + dotp(mx, -138, 12, "gold") + lab(o, l, mx, -176, { size: 34 }); });
  return s; },
  { box: [-440, -210, 880, 330], demo: {}, opts: "eras: [[label, weight], ..], marks: [[0..1, label], ..]", tags: ["timeline", "eras", "history", "ages", "periods"] });

R("Time & timelines", "timeline-vertical", "Timeline · vertical list", (o) => {
  const it = (o.items || [["1969", "First steps"], ["1977", "Probes leave"], ["1990", "Space telescope"], ["2012", "Rover lands"]]).slice(0, 5), n = it.length, sp = Math.min(110, 460 / n), y0 = -((n - 1) * sp) / 2;
  let s = L.stroke(L.line([0, y0 - 40], [0, y0 + (n - 1) * sp + 40]), { w: "prop" });
  it.forEach(([w, t], i) => { const y = y0 + i * sp; s += L.shape(L.circ(0, y, 22), col(o, i)) + T(w, -44, y, { size: 46, anchor: "end", weight: 700 }) + T(t, 44, y, { size: fs(t, 260, 40), anchor: "start", c: "gray" }); });
  return s; },
  { box: [-340, -270, 680, 540], demo: {}, opts: "items: [[when, what], ..] (2–5)", tags: ["timeline", "history", "dates", "vertical", "events"] });

R("Time & timelines", "timeline-progress", "Timeline · milestones with progress", (o) => {
  const n = clamp(o.n || 5, 2, 7), k = clamp(o.done === undefined ? 3 : o.done, 0, n), lb = o.labels || [], W = 760, x0 = -W / 2, X = (i) => x0 + (i / (n - 1)) * W;
  let s = L.stroke(L.line([x0, 0], [x0 + W, 0]), { c: "gray", w: 16 }) + (k > 1 ? L.stroke(L.line([x0, 0], [X(k - 1), 0]), { c: "green", w: 16 }) : "");
  for (let i = 0; i < n; i++) s += L.shape(L.circ(X(i), 0, 34), i < k ? "green" : "white") + (i < k ? L.stroke(`M${X(i) - 14} 0 L${X(i) - 4} 12 L${X(i) + 15} -12`, { c: "white", w: 11 }) : T(String(i + 1), X(i), 0, { size: 36 })) + lab(o, lb[i] || "", X(i), 80, { size: fs(lb[i], 130, 30) });
  return s; },
  { box: [-430, -90, 860, 230], demo: { n: 5, done: 3, labels: ["Plan", "Build", "Test", "Launch", "Orbit"] }, opts: "n, done, labels", tags: ["progress", "milestones", "steps", "timeline", "stages"] });

R("Time & timelines", "timeline-now", "Long timeline · 'you are here'", (o) => {
  const W = 820, x0 = -W / 2, p = clamp(o.pos === undefined ? 0.96 : o.pos), mx = x0 + p * W, c = o.c || "purple", right = p > 0.7;
  let s = clipD(L.rrect(x0, -30, W, 60, 22), L.flat(L.rect(x0, -30, p * W, 60), c) + L.flat(L.rect(mx, -30, W, 60), "red")) + L.stroke(L.rrect(x0, -30, W, 60, 22), { w: "prop" });
  s += arrow([[mx, -140], [mx, -42]], "red", "prop", 24) + T(o.text || "You are here", mx + (right ? 20 : 0), -168, { size: 44, c: "red", anchor: right ? "end" : "middle", weight: 700 });
  return s + lab(o, o.start || "Big Bang", x0, 76, { size: 38, anchor: "start" }) + lab(o, o.end || "Today", x0 + W, 76, { size: 38, anchor: "end" }); },
  { box: [-440, -210, 880, 330], demo: { start: "Big Bang", end: "Today", text: "All of human history" }, opts: "pos: 0..1, text, start, end, c", tags: ["timeline", "deep time", "history", "scale", "you are here", "age of universe"] });

R("Time & timelines", "calendar-month", "Calendar month", (o) => {
  const days = o.days || 30, st = o.start === undefined ? 3 : o.start, mark = o.marked || [], cr = o.crossed || 0, rows = Math.ceil((st + days) / 7), cw = 70, rh = 62, hh = 84, W = cw * 7 + 40, H = hh + 54 + rows * rh + 24, y0 = -H / 2;
  let s = blk(-W / 2, y0, W, H, "paper", 26) + clipD(L.rrect(-W / 2, y0, W, H, 26), L.flat(L.rect(-W / 2, y0, W, hh), "red")) + L.stroke(L.line([-W / 2, y0 + hh], [W / 2, y0 + hh]), { w: "detail" }) + T(o.month || "MARCH", 0, y0 + hh / 2, { size: 52, c: "white", halo: "ink", haloW: 0.12, weight: 700 });
  "MTWTFSS".split("").forEach((d, i) => { s += T(d, -W / 2 + 20 + i * cw + cw / 2, y0 + hh + 28, { size: 28, c: "gray", weight: 700 }); });
  for (let d = 1; d <= days; d++) { const k = st + d - 1, x = -W / 2 + 20 + (k % 7) * cw + cw / 2, y = y0 + hh + 54 + Math.floor(k / 7) * rh + rh / 2;
    if (mark.includes(d)) s += L.shape(L.circ(x, y, 27), "orange", { w: "detail" });
    s += T(String(d), x, y, { size: 32, c: d <= cr ? "gray" : "ink" }); if (d <= cr) s += L.stroke(L.poly([[x - 20, y - 20], [x + 20, y + 20]]), { c: "red", w: 6 }) + L.stroke(L.poly([[x + 20, y - 20], [x - 20, y + 20]]), { c: "red", w: 6 }); }
  return s; },
  { box: [-290, -310, 580, 620], demo: { month: "MARCH", days: 31, start: 4, marked: [14], crossed: 9 }, opts: "month, days, start: 0..6 (Mon = 0), marked: [days], crossed: n", tags: ["calendar", "date", "days", "month", "schedule"] });

R("Time & timelines", "day-counter", "Day counter flip card", (o) => {
  const v = String(o.n === undefined ? 47 : o.n), sz = Math.min(190, 260 / (v.length * 0.6));
  return blk(-150, -140, 300, 300, "navy", 30) + L.flat(L.rect(-146, 8, 292, 4), "white", 0.18) + [-80, 80].map((x) => L.shape(L.circ(x, -140, 13), "paper", { w: "detail", flat: true })).join("") +
    T(o.label || "DAY", 0, -92, { size: 46, c: "gold", spacing: 6, weight: 700 }) + T(v, 0, 52, { size: sz, c: "white", weight: 700 }); },
  { box: [-190, -180, 380, 380], demo: { n: 47, label: "DAY" }, opts: "n, label", tags: ["day", "counter", "calendar", "flip", "days passed", "countdown"] });

R("Time & timelines", "days-crossed", "Days crossed off", (o) => {
  const N = clamp(o.n || 30, 5, 60), k = clamp(o.k === undefined ? 12 : o.k, 0, N), cols = o.cols || 10, cell = 56, rows = Math.ceil(N / cols); let s = "";
  for (let i = 0; i < N; i++) { const x = -((cols - 1) * cell) / 2 + (i % cols) * cell, y = -((rows - 1) * cell) / 2 + Math.floor(i / cols) * cell - 20;
    s += L.shape(L.rrect(x - 23, y - 23, 46, 46, 8), i < k ? "gray" : "paper", { w: "detail", flat: true, tone: i < k ? 1 : 0 }) + (i < k ? L.stroke(L.poly([[x - 15, y - 15], [x + 15, y + 15]]), { c: "red", w: 6 }) + L.stroke(L.poly([[x + 15, y - 15], [x - 15, y + 15]]), { c: "red", w: 6 }) : ""); }
  return s + T(k + " / " + N + (o.text ? " " + o.text : " days"), 0, (rows * cell) / 2 + 24, { size: 56, weight: 700 }); },
  { box: [-340, -190, 680, 400], demo: { n: 30, k: 12 }, opts: "n: days, k: crossed, cols, text", tags: ["days", "countdown", "crossed off", "streak", "calendar"] });

R("Time & timelines", "clock-span", "Clock · shaded time span", (o) => {
  const f = o.from || [9, 0], t = o.to || [5, 0], ha = (h, m) => ((h % 12) + m / 60) * 30 - 90, a0 = ha(...f); let a1 = ha(...t); while (a1 <= a0) a1 += 360;
  let s = L.shape(L.circ(0, 0, 170), "white") + L.flat(sector(0, 0, 0, 148, a0, a1), o.c || "orange", 0.55);
  for (let i = 0; i < 12; i++) { const p = P(110, i * 30 - 60); s += L.stroke(L.line(P(130, i * 30), P(146, i * 30)), { w: "detail" }) + T(String(i + 1), p[0], p[1], { size: 30 }); }
  return s + L.stroke(L.line([0, 0], P(84, ha(...t))), { w: 11 }) + L.stroke(L.line([0, 0], P(120, t[1] * 6 - 90)), { w: 7 }) + L.shape(L.circ(0, 0, 14), "ink", { w: "detail" }) + (o.text ? T(o.text, 0, 226, { size: 48 }) : ""); },
  { box: [-200, -200, 400, 450], demo: { from: [9, 0], to: [5, 0], text: "8 hours" }, opts: "from: [h, m], to: [h, m], text, c", tags: ["clock", "time span", "duration", "hours", "work day", "sleep"] });

R("Time & timelines", "clock-digital", "Digital clock readout", (o) => {
  const t = o.text || "07:30";
  return blk(-230, -100, 460, 200, "navy", 30) + L.flat(L.rrect(-216, -88, 432, 70, 22), "white", 0.08) + T(t, o.ampm ? -28 : 0, 0, { size: 124, c: o.c || "gold", weight: 700 }) + (o.ampm ? T(o.ampm, 168, 34, { size: 46, c: "white", weight: 700 }) : ""); },
  { box: [-250, -120, 500, 240], demo: { text: "07:30", ampm: "AM" }, opts: "text, ampm, c", tags: ["clock", "digital", "time", "alarm", "hours"] });

R("Time & timelines", "timer-ring", "Countdown timer ring", (o) => {
  const p = clamp(o.pct === undefined ? 0.65 : o.pct, 0.005, 0.9995), c = p < 0.25 ? "red" : o.c || "green";
  return L.shape(L.rrect(-22, -216, 44, 34, 8), "gray") + L.shape(L.circ(0, 0, 176), "white") + L.shape(sector(0, 0, 112, 158, -90, 269.6), "gray", { tone: 1, flat: true }) + L.shape(sector(0, 0, 112, 158, -90, -90 + p * 360), c) +
    T(o.text || "0:42", 0, o.caption ? -12 : 0, { size: 68, weight: 700 }) + (o.caption ? T(o.caption, 0, 44, { size: 32, c: "gray" }) : ""); },
  { box: [-200, -230, 400, 440], demo: { pct: 0.65, text: "0:42", caption: "left" }, opts: "pct: 0..1 remaining, text, caption, c", tags: ["timer", "countdown", "stopwatch", "seconds", "time left"] });

R("Time & timelines", "hourglass", "Hourglass · sand fraction", (o) => {
  const fr = clamp(o.frac === undefined ? 0.55 : o.frac), G = "M-72 -140 C-72 -60 -10 -34 -10 0 C-10 34 -72 60 -72 140 L72 140 C72 60 10 34 10 0 C10 -34 72 -60 72 -140 Z";
  return L.shape(G, "glass") + clipD(G, L.flat(L.rect(-80, -140 + (1 - fr) * 140, 160, 140 * fr), "gold") + L.flat(L.rect(-80, 140 - (1 - fr) * 125, 160, (1 - fr) * 125 + 2), "gold") + (fr > 0.02 && fr < 0.98 ? L.stroke(L.line([0, -2], [0, 140 - (1 - fr) * 125]), { c: "gold", w: 5, op: 0.9 }) : "")) +
    L.stroke(G, { w: "prop" }) + blk(-96, -172, 192, 32, "wood", 12) + blk(-96, 140, 192, 32, "wood", 12); },
  { box: [-130, -200, 260, 400], demo: { frac: 0.55 }, opts: "frac: 0..1 sand left in the top bulb", tags: ["hourglass", "time", "running out", "sand", "deadline"] });

R("Time & timelines", "day-wheel", "24-hour day wheel", (o) => {
  const sg = o.segments || [["Sleep", 8, "navy"], ["Work", 8, "blue"], ["Free", 6, "green"], ["Eat", 2, "orange"]], tot = sg.reduce((a, b) => a + b[1], 0); let a0 = -90, s = "";
  sg.forEach(([l, h, c]) => { const a1 = a0 + (h / tot) * 360, am = ((a0 + a1) / 2) * D2R; s += L.shape(sector(-130, 0, 70, 150, a0, a1 - 0.01), c) + (h / tot > 0.06 ? onCol(h + "h", -130 + Math.cos(am) * 110, Math.sin(am) * 110, 30) : ""); a0 = a1; });
  [["0", -90], ["6", 0], ["12", 90], ["18", 180]].forEach(([l, a]) => { const p = P(180, a, -130, 0); s += T(l, p[0], p[1], { size: 28, c: "gray" }); });
  s += T(o.text || "24h", -130, 0, { size: 50, weight: 700 });
  if (o.labels !== false) sg.forEach(([l, h, c], i) => { const y = (i - (sg.length - 1) / 2) * 62; s += blk(100, y - 17, 34, 34, c, 8, { w: "detail" }) + T(l, 152, y, { size: 36, anchor: "start" }); });
  return s; },
  { box: [-340, -210, 660, 420], demo: { text: "24h" }, opts: "segments: [[label, hours, colour], ..], text", tags: ["day", "24 hours", "schedule", "time", "sleep", "wheel", "routine"] });

// ===================== Comparisons & ranking =====================
R("Comparisons & ranking", "balance", "Balance scale · weighs A vs B", (o) => {
  const tilt = clamp(o.tilt === undefined ? 0.6 : o.tilt, -1, 1), th = -tilt * 14 * D2R, L1 = [-210 * Math.cos(th), -210 * Math.sin(th) - 110], R1 = [210 * Math.cos(th), 210 * Math.sin(th) - 110], nm = [o.left || "Elephant", o.right || "Mouse"], cs = o.colors || ["blue", "orange"];
  let s = L.shape(L.poly([[-90, 190], [90, 190], [50, 150], [-50, 150]], true), "wood") + blk(-16, -110, 32, 266, "wood", 10);
  s += L.shape(L.rrect(-230, -128, 460, 36, 18), "gold").replace("<path", `<path transform="rotate(${f1(-tilt * 14)} 0 -110)"`);
  [L1, R1].forEach(([x, y], i) => { const py = y + 120, bw = Math.max(120, nm[i].length * 24 + 40);
    s += L.stroke(L.poly([[x, y], [x - 80, py - 8]]), { w: "detail" }) + L.stroke(L.poly([[x, y], [x + 80, py - 8]]), { w: "detail" }) + L.shape(`M${f1(x - 100)} ${f1(py - 8)} L${f1(x + 100)} ${f1(py - 8)} A100 44 0 0 1 ${f1(x - 100)} ${f1(py - 8)} Z`, "gold") +
      blk(x - bw / 2, py - 76, bw, 62, cs[i], 16) + onCol(nm[i], x, py - 45, fs(nm[i], bw - 20, 36)); });
  return s + L.shape(L.circ(0, -110, 24), "gold"); },
  { box: [-360, -250, 720, 470], demo: { left: "Elephant", right: "Mouse", tilt: 0.7 }, opts: "left, right, tilt: -1..1 (+ = left heavier), colors", tags: ["balance", "scale", "weigh", "compare", "heavier", "equal"] });

R("Comparisons & ranking", "size-ladder", "Size ladder · circles by amount", (o) => {
  const d = (o.values || [1, 10, 100, 1000]).slice(0, 5), lb = o.labels || ["Pea", "Ball", "Barrel", "Truck"], mx = Math.max(...d), ds = d.map((v) => 36 + Math.sqrt(v / mx) * 210), sq = o.shape === "square", tot = ds.reduce((a, b) => a + b, 0) + (d.length - 1) * 26; let x = -tot / 2, s = "";
  d.forEach((v, i) => { const r = ds[i] / 2; s += sq ? blk(x, 130 - ds[i], ds[i], ds[i], col(o, i), 14) : L.shape(L.circ(x + r, 130 - r, r), col(o, i)); s += lab(o, lb[i] || "", x + r, 176, { size: fs(lb[i], Math.max(ds[i] + 24, 120), 32) }) + (o.showValues === false ? "" : T(num(v), x + r, 130 - r, { size: Math.min(40, r * 0.7), c: "white", halo: "ink", haloW: 0.12 })); x += ds[i] + 26; });
  return s + axis(-tot / 2 - 20, tot / 2 + 20, 132); },
  { box: [-440, -150, 880, 370], demo: { values: [1, 10, 100, 1000], labels: ["Pea", "Ball", "Barrel", "Truck"] }, opts: "values (area ∝ value), labels, shape: 'square', showValues", tags: ["size", "ladder", "scale", "compare", "bigger", "proportion"] });

R("Comparisons & ranking", "times-bigger", "'X times bigger' side by side", (o) => {
  const t = o.times || 100, D = 260, d = Math.max(D / Math.sqrt(t), 12), c = [o.small || "Small", o.big || "Big"], tx = o.text || "×" + t;
  return L.shape(L.circ(-300, D / 2 - d / 2, d / 2), "orange") + L.shape(L.circ(240, 0, D / 2), "blue") +
    blockArrow(-210, -10, 0, 54, 44, "gold").replace("<path", '<path opacity="0.95"') + T(tx, -110, -78, { size: fs(tx, 190, 64), weight: 700 }) + lab(o, c[0], -300, D / 2 + 40, { size: 36 }) + lab(o, c[1], 240, D / 2 + 40, { size: 36 }); },
  { box: [-440, -170, 880, 380], demo: { times: 100, small: "Earth", big: "Sun" }, opts: "times (area ratio), small, big, text", tags: ["times bigger", "compare", "size", "ratio", "scale", "multiplier"] });

R("Comparisons & ranking", "vs-card", "Versus cards · A vs B", (o) => {
  const A = o.left || "Cats", B = o.right || "Dogs", a = o.lsub, b = o.rsub;
  const card = (x, rot, c, t, sub) => L.g(blk(-150, -140, 300, 280, c, 30) + ml(t, 0, sub ? -40 : 0, 70, 260, { c: "white", halo: "ink", haloW: 0.1, weight: 700 }) + (sub ? ml(sub, 0, 70, 44, 260, { c: "white", halo: "ink", haloW: 0.1 }) : ""), `translate(${x} 0) rotate(${rot})`);
  return card(-170, -3, o.colors ? o.colors[0] : "blue", A, a) + card(170, 3, o.colors ? o.colors[1] : "red", B, b) + L.shape(L.circ(0, 0, 58), "gold") + T("VS", 0, 0, { size: 56, weight: 700 }); },
  { box: [-380, -180, 760, 360], demo: { left: "Cats", right: "Dogs", lsub: "quiet", rsub: "loud" }, opts: "left, right, lsub, rsub, colors", tags: ["versus", "vs", "compare", "choice", "battle", "cards"] });

R("Comparisons & ranking", "spectrum", "Spectrum bar with marker", (o) => {
  const W = 720, x0 = -W / 2, cs = o.colors || ["blue", "teal", "green", "yellow", "orange", "red"], at = clamp(o.at === undefined ? 0.72 : o.at), mx = x0 + at * W; let seg = "";
  cs.forEach((c, i) => { seg += L.flat(L.rect(x0 + (i * W) / cs.length, -30, W / cs.length + 1, 60), c); });
  return clipD(L.rrect(x0, -30, W, 60, 30), seg) + L.stroke(L.rrect(x0, -30, W, 60, 30), { w: "prop" }) + L.shape(L.poly([[mx, -38], [mx - 24, -88], [mx + 24, -88]], true), "ink") + (o.text ? T(o.text, mx, -122, { size: 44, weight: 700 }) : "") +
    lab(o, o.low || "Low", x0, 74, { size: 38, anchor: "start" }) + lab(o, o.high || "High", x0 + W, 74, { size: 38, anchor: "end" }); },
  { box: [-420, -170, 840, 300], demo: { at: 0.72, text: "You", low: "Cold", high: "Hot" }, opts: "at: 0..1, text, low, high, colors", tags: ["spectrum", "scale", "range", "gradient", "low high", "slider"] });

R("Comparisons & ranking", "ratio-bar", "Ratio bar · a : b", (o) => {
  const a = o.a === undefined ? 3 : o.a, b = o.b === undefined ? 1 : o.b, W = 700, wa = (a / (a + b)) * W, x0 = -W / 2, l = o.labels || ["", ""];
  return clipD(L.rrect(x0, -50, W, 100, 30), L.flat(L.rect(x0, -50, wa, 100), o.colors ? o.colors[0] : "blue") + L.flat(L.rect(x0 + wa, -50, W, 100), o.colors ? o.colors[1] : "orange")) + L.stroke(L.rrect(x0, -50, W, 100, 30), { w: "prop" }) + L.stroke(L.line([x0 + wa, -50], [x0 + wa, 50]), { w: "detail" }) +
    onCol(l[0] || num(a), x0 + wa / 2, 0, 52) + onCol(l[1] || num(b), x0 + wa + (W - wa) / 2, 0, 52) + T(num(a) + " : " + num(b), 0, -110, { size: 76, weight: 700 }); },
  { box: [-420, -170, 840, 300], demo: { a: 3, b: 1 }, opts: "a, b, labels: [l, r], colors", tags: ["ratio", "proportion", "split", "parts", "three to one"] });

R("Comparisons & ranking", "before-after-cards", "Before → After cards", (o) => {
  const B = o.before || "50", A = o.after || "200", ch = o.change === undefined ? "×4" : o.change;
  const card = (x, c, v, l) => blk(x - 130, -110, 260, 220, c, 28) + ml(v, x, -14, 92, 220, { weight: 700, c: c === "gray" ? "ink" : "white", halo: c === "gray" ? undefined : "ink", haloW: 0.1 }) + lab(o, l, x, 64, { size: 36, c: c === "gray" ? "ink" : "white", halo: c === "gray" ? undefined : "ink", haloW: 0.1 });
  return card(-260, "gray", B, o.bl || "BEFORE") + card(260, "green", A, o.al || "AFTER") + blockArrow(-110, 110, 0, 60, 48, "gold") + (ch ? T(ch, 0, -64, { size: 50, weight: 700, c: "red" }) : ""); },
  { box: [-420, -150, 840, 300], demo: { before: "50", after: "200", change: "×4" }, opts: "before, after, change, bl, al", tags: ["before after", "change", "growth", "compare", "result"] });

R("Comparisons & ranking", "podium", "Ranking podium · 1st 2nd 3rd", (o) => {
  const nm = o.names || ["Gold", "Silver", "Bronze"], v = o.values, cfg = [[0, 215, "gold", 0], [-190, 150, "gray", 1], [190, 105, "orange", 2]]; let s = L.shadow(0, 160, 560);
  cfg.forEach(([x, h, c, i]) => { s += blk(x - 90, 160 - h, 180, h, c, 12, { tone: i === 2 ? 2 : 0 }) + onCol(String(i + 1), x, 160 - h / 2, 84, { weight: 700 }) + T(nm[i] || "", x, 160 - h - 94, { size: fs(nm[i], 200, 42), weight: 700 }) + (v && v[i] !== undefined ? T(String(v[i]), x, 160 - h - 44, { size: 36, c: "gray" }) : "");
    if (i === 0) s += L.shape(L.star(x, 160 - h - 160, 38, 17), "yellow"); });
  return s; },
  { box: [-330, -260, 660, 450], demo: { names: ["Mia", "Leo", "Zed"], values: [98, 91, 84] }, opts: "names: [1st, 2nd, 3rd], values", tags: ["podium", "winners", "ranking", "top three", "medal", "first place"] });

R("Comparisons & ranking", "ranking-bars", "Leaderboard · medals + bars", (o) => {
  const d = (o.values || [95, 80, 62, 40]).slice(0, 5), n = d.length, lb = o.labels || ["Alpha", "Beta", "Gamma", "Delta", "Epsilon"], mx = Math.max(...d), rh = 70, gap = 20, tot = n * rh + (n - 1) * gap, MC = ["gold", "gray", "orange"]; let s = "";
  d.forEach((v, i) => { const y = -tot / 2 + i * (rh + gap), w = (v / mx) * 360;
    s += L.shape(L.circ(-310, y + rh / 2, 31), MC[i] || "blue") + T(String(i + 1), -310, y + rh / 2, { size: 38, c: i < 3 ? "ink" : "white", weight: 700 }) + lab(o, lb[i] || "", -258, y + rh / 2, { size: fs(lb[i], 190, 36), anchor: "start" }) + blk(-40, y, w, rh, col(o, i < 3 ? 1 : 0), 14, { tone: i === 0 ? 0 : 0 }) + T(num(v) + (o.unit || ""), -40 + w + 16, y + rh / 2, { size: 34, anchor: "start" }); });
  return s; },
  { box: [-350, -270, 800, 540], demo: { values: [95, 80, 62, 40], labels: ["Alpha", "Beta", "Gamma", "Delta"] }, opts: "values (sorted high→low), labels, unit, colors", tags: ["ranking", "leaderboard", "top", "list", "medals", "score"] });

// ===================== Diagrams & flows =====================
R("Diagrams & flows", "venn-2", "Venn diagram · two sets", (o) => {
  const A = o.left || "Hot", B = o.right || "Fast", M = o.both || "Both", r = 150, cA = o.colors ? o.colors[0] : "blue", cB = o.colors ? o.colors[1] : "orange";
  return L.flat(L.circ(-90, 0, r), cA, 0.5) + L.flat(L.circ(90, 0, r), cB, 0.5) + clipD(L.circ(-90, 0, r), L.flat(L.circ(90, 0, r), "green", 0.6)) + L.stroke(L.circ(-90, 0, r), { w: "prop" }) + L.stroke(L.circ(90, 0, r), { w: "prop" }) +
    lab(o, A, -170, 0, { size: fs(A, 130, 46), weight: 700 }) + lab(o, B, 170, 0, { size: fs(B, 130, 46), weight: 700 }) + lab(o, M, 0, 0, { size: fs(M, 100, 36), weight: 700 }); },
  { box: [-290, -180, 580, 360], demo: { left: "Hot", right: "Fast", both: "Both" }, opts: "left, right, both, colors", tags: ["venn", "overlap", "sets", "common", "intersection", "diagram"] });

R("Diagrams & flows", "venn-3", "Venn diagram · three sets", (o) => {
  const nm = o.names || ["Mind", "Body", "Soul"], r = 125, C = [[-78, -56], [78, -56], [0, 78]], cs = [col(o, 0), col(o, 1), col(o, 2)];
  return C.map(([x, y], i) => L.flat(L.circ(x, y, r), cs[i], 0.5)).join("") + C.map(([x, y]) => L.stroke(L.circ(x, y, r), { w: "prop" })).join("") +
    lab(o, nm[0], -120, -96, { size: fs(nm[0], 110, 40), weight: 700 }) + lab(o, nm[1], 120, -96, { size: fs(nm[1], 110, 40), weight: 700 }) + lab(o, nm[2], 0, 122, { size: fs(nm[2], 120, 40), weight: 700 }) + (o.both ? lab(o, o.both, 0, -8, { size: 32, weight: 700 }) : ""); },
  { box: [-270, -220, 540, 450], demo: { names: ["Mind", "Body", "Soul"], both: "You" }, opts: "names: [a, b, c], both, colors", tags: ["venn", "overlap", "three sets", "diagram", "common"] });

R("Diagrams & flows", "flow-steps", "Flowchart · steps with arrows", (o) => {
  const it = (o.items || ["Idea", "Test it", "Fail", "Learn"]).slice(0, 5), n = it.length, bw = Math.min(190, (860 - (n - 1) * 70) / n), gap = 70, tot = n * bw + (n - 1) * gap; let s = "";
  it.forEach((t, i) => { const x = -tot / 2 + i * (bw + gap); s += blk(x, -64, bw, 128, col(o, i), 22) + ml(t, x + bw / 2, 0, 40, bw - 24, { c: "white", halo: "ink", haloW: 0.12 }) + L.shape(L.circ(x + 6, -64, 24), "white", { w: "detail", flat: true }) + T(String(i + 1), x + 6, -64, { size: 28, weight: 700 });
    if (i < n - 1) s += arrow([[x + bw + 10, 0], [x + bw + gap - 10, 0]], "ink", "prop", 20); });
  return s; },
  { box: [-460, -110, 920, 220], demo: { items: ["Idea", "Test it", "Fail", "Learn"] }, opts: "items: [2–5 labels], colors", tags: ["flowchart", "steps", "process", "how it works", "sequence", "arrows"] });

R("Diagrams & flows", "cause-effect", "Cause → effect", (o) => {
  const c = o.cause || "Less sleep", e = o.effect || "Bad mood";
  return blk(-420, -80, 260, 160, o.colors ? o.colors[0] : "blue", 26) + ml(c, -290, 0, 52, 220, { c: "white", halo: "ink", haloW: 0.12 }) + lab(o, "CAUSE", -290, -112, { size: 30, c: "gray", spacing: 4 }) +
    blockArrow(-130, 110, 0, 54, 46, "gold") + L.shape(L.star(270, 0, 150, 116, 14, -90), o.colors ? o.colors[1] : "red") + ml(e, 270, 0, 54, 190, { c: "white", halo: "ink", haloW: 0.12, weight: 700 }) + lab(o, "EFFECT", 270, -186, { size: 30, c: "gray", spacing: 4 }); },
  { box: [-440, -215, 880, 415], demo: { cause: "Less sleep", effect: "Bad mood" }, opts: "cause, effect, colors", tags: ["cause", "effect", "because", "result", "consequence", "arrow"] });

R("Diagrams & flows", "cycle", "Cycle diagram · loop of steps", (o) => {
  const it = (o.items || ["Evaporate", "Cloud", "Rain", "River"]).slice(0, 6), n = it.length, rx = 270, ry = 150; let s = "";
  const pos = (i) => P(1, -90 + (i * 360) / n), E = (a) => [rx * Math.cos(a * D2R), ry * Math.sin(a * D2R)];
  for (let i = 0; i < n; i++) { const a0 = -90 + (i * 360) / n + 22, a1 = -90 + ((i + 1) * 360) / n - 22; s += arrow(L.arcPts(0, 0, rx, a0, a1, 10, ry), "ink", "prop", 20); }
  for (let i = 0; i < n; i++) { const [x, y] = E(-90 + (i * 360) / n), w = Math.max(130, it[i].length * 22 + 40); s += blk(x - w / 2, y - 34, w, 68, col(o, i), 22) + onCol(it[i], x, y, fs(it[i], w - 20, 34)); }
  return s + (o.text ? T(o.text, 0, 0, { size: 48, c: "gray", weight: 700 }) : ""); },
  { box: [-460, -230, 920, 460], demo: { items: ["Evaporate", "Cloud", "Rain", "River"], text: "WATER" }, opts: "items: [3–6 labels], text, colors", tags: ["cycle", "loop", "circular", "process", "repeat", "water cycle"] });

R("Diagrams & flows", "decision", "Decision · question → yes / no", (o) => {
  const q = o.question || "Is it true?", y = o.yes || "Share it", n = o.no || "Check again";
  return arrow([[-120, 10], [-250, 80]], "ink", "prop", 20) + arrow([[120, 10], [250, 80]], "ink", "prop", 20) + L.shape(L.poly([[0, -140], [180, -30], [0, 80], [-180, -30]], true), "yellow") + ml(q, 0, -30, 46, 190, { weight: 700 }) +
    blk(-390, 90, 280, 100, "red", 22) + ml(n, -250, 140, 42, 240, { c: "white", halo: "ink", haloW: 0.12 }) + blk(110, 90, 280, 100, "green", 22) + ml(y, 250, 140, 42, 240, { c: "white", halo: "ink", haloW: 0.12 }) +
    T("NO", -218, 18, { size: 34, c: "red", weight: 700 }) + T("YES", 218, 18, { size: 34, c: "green", weight: 700 }); },
  { box: [-420, -170, 840, 380], demo: { question: "Is it true?", yes: "Share it", no: "Check again" }, opts: "question, yes, no", tags: ["decision", "choice", "yes no", "flowchart", "question", "branch"] });

R("Diagrams & flows", "steps-list", "Numbered steps list", (o) => {
  const it = (o.items || ["Look up", "Pick a star", "Count to ten", "Make a wish"]).slice(0, 6), n = it.length, sp = Math.min(104, 440 / n), y0 = -((n - 1) * sp) / 2; let s = L.stroke(L.line([-250, y0], [-250, y0 + (n - 1) * sp]), { c: "gray", w: 8 });
  it.forEach((t, i) => { const y = y0 + i * sp; s += L.shape(L.circ(-250, y, 36), col(o, i)) + onCol(String(i + 1), -250, y, 44, { weight: 700 }) + T(t, -190, y, { size: fs(t, 400, 52), anchor: "start" }); });
  return s; },
  { box: [-310, -260, 680, 520], demo: {}, opts: "items: [2–6 steps], colors", tags: ["steps", "list", "how to", "instructions", "numbered", "recipe"] });

R("Diagrams & flows", "pyramid", "Pyramid · levels", (o) => {
  const it = (o.items || ["Growth", "Esteem", "Love", "Safety", "Basics"]).slice(0, 6), n = it.length, H = 360, h = H / n, hw = (y) => ((y + H / 2) / H) * 300; let s = "";
  it.forEach((t, i) => { const y0 = -H / 2 + i * h + 3, y1 = y0 + h - 6, a = hw(y0), b = hw(y1); s += L.shape(L.poly([[-a, y0], [a, y0], [b, y1], [-b, y1]], true), col(o, i)) + (i > 0 ? onCol(t, 0, (y0 + y1) / 2, fs(t, hw((y0 + y1) / 2) * 1.7, 36)) : ""); });
  if (o.labels !== false) s += L.g("", ""); // top label drawn beside the peak
  return s + T(it[0], 150, -H / 2 + h / 2, { size: 36, anchor: "start" }) + L.stroke(L.line([34, -H / 2 + h / 2], [136, -H / 2 + h / 2]), { w: "detail" }); },
  { box: [-340, -210, 680, 420], demo: {}, opts: "items: [top … bottom], colors", tags: ["pyramid", "levels", "hierarchy", "layers", "needs", "tiers"] });

R("Diagrams & flows", "funnel", "Funnel · stages shrink", (o) => {
  const it = (o.items || [["Seen", 1000], ["Clicked", 600], ["Watched", 200], ["Joined", 40]]).slice(0, 5), n = it.length, mx = it[0][1], h = 88, gap = 8, tot = n * h + (n - 1) * gap, wd = (v) => 230 + (v / mx) * 330; let s = "";
  it.forEach(([l, v], i) => { const y = -tot / 2 + i * (h + gap), a = wd(v) / 2, b = (i < n - 1 ? wd(it[i + 1][1]) : wd(v) * 0.75) / 2; s += L.shape(L.poly([[-a, y], [a, y], [b, y + h], [-b, y + h]], true), col(o, i)) + onCol(l + "  " + v, 0, y + h / 2, fs(l + "  " + v, b * 1.9, 36)); });
  return s; },
  { box: [-320, -240, 640, 480], demo: {}, opts: "items: [[label, value], ..] (high→low), colors", tags: ["funnel", "stages", "conversion", "drop off", "filter", "narrowing"] });

// ===================== Maps =====================
// simplified continents, [lon, lat]; the map is equirectangular, 2.2 px per degree, origin = lon 0 / lat 0
const LANDS = {
  namerica: [[-168, 66], [-156, 71], [-125, 70], [-95, 72], [-80, 73], [-62, 66], [-55, 52], [-66, 44], [-76, 35], [-81, 25], [-88, 30], [-97, 26], [-97, 19], [-88, 16], [-83, 9], [-78, 8], [-90, 14], [-105, 20], [-112, 29], [-118, 34], [-124, 40], [-124, 48], [-135, 58], [-150, 60], [-165, 60]],
  greenland: [[-55, 60], [-44, 60], [-20, 70], [-20, 82], [-45, 83], [-65, 80], [-60, 70]],
  samerica: [[-80, 10], [-62, 11], [-50, 0], [-35, -6], [-40, -22], [-48, -28], [-58, -38], [-66, -46], [-70, -54], [-74, -50], [-72, -30], [-70, -18], [-80, -6]],
  eurasia: [[-10, 36], [-9, 43], [-4, 48], [2, 51], [8, 55], [10, 60], [20, 69], [30, 71], [60, 70], [100, 78], [140, 72], [170, 68], [180, 65], [165, 60], [158, 52], [140, 52], [135, 43], [122, 40], [122, 30], [110, 20], [106, 10], [100, 2], [98, 16], [90, 22], [80, 12], [73, 18], [66, 25], [56, 26], [50, 30], [44, 14], [35, 28], [34, 32], [28, 37], [22, 38], [16, 40], [12, 44], [3, 43]],
  africa: [[-17, 21], [-10, 35], [10, 37], [32, 31], [35, 22], [43, 12], [51, 12], [40, -3], [40, -16], [33, -26], [20, -35], [14, -25], [12, -6], [9, 4], [-8, 4], [-17, 14]],
  australia: [[114, -22], [122, -18], [136, -12], [142, -11], [146, -19], [153, -27], [150, -37], [140, -38], [130, -32], [115, -34]],
  uk: [[-6, 50], [1, 51], [0, 54], [-3, 58], [-6, 56]],
  japan: [[130, 32], [135, 34], [141, 38], [142, 44], [140, 40], [136, 36]],
  indonesia: [[96, 5], [104, -3], [106, -7], [100, -2]],
};
const MX = (lon) => lon * 2.2, MY = (lat) => -lat * 2.2;
const closed = (pts) => L.smooth([...pts, pts[0]].map(([a, b]) => [MX(a), MY(b)]));
const mapBase = (o) => {
  let s = "", hi = o.hi || [];
  if (o.grid !== false) { for (let lo = -150; lo <= 150; lo += 30) s += L.stroke(L.line([MX(lo), -190], [MX(lo), 190]), { c: "white", w: "detail", op: 0.5 }); for (let la = -60; la <= 60; la += 30) s += L.stroke(L.line([-396, MY(la)], [396, MY(la)]), { c: "white", w: "detail", op: 0.5 }); }
  Object.keys(LANDS).forEach((k) => { s += L.shape(closed(LANDS[k]), hi.includes(k) ? o.hiColor || "orange" : o.land || "grass", { w: "detail" }); });
  return s;
};
const mapCard = (o, inner) => clipD(L.rrect(-420, -205, 840, 410, 34), L.flat(L.rect(-420, -205, 840, 410), o.ocean || "sky") + inner) + L.stroke(L.rrect(-420, -205, 840, 410, 34), { w: "prop" });
const mapBox = [-440, -225, 880, 450];

R("Maps", "world-map", "World map · continents (highlight any)", (o) => mapCard(o, mapBase(o)),
  { box: mapBox, demo: { hi: ["africa"] }, opts: "hi: ['africa','samerica',…], land, hiColor, ocean, grid: false", tags: ["map", "world", "continents", "earth", "geography", "highlight"], wide: true });

R("Maps", "map-pins", "World map · numbered pins", (o) => {
  const pins = o.pins || [[-74, 40, "NYC"], [2, 48, "Paris"], [139, 36, "Tokyo"]];
  return mapCard(o, mapBase(o)) + pins.map(([lo, la, l], i) => pin(MX(lo), MY(la), col(o, i + 3), 66, String(i + 1))).join("") + (o.labels === false ? "" : pins.map(([lo, la, l]) => (l ? T(l, MX(lo), MY(la) + 30, { size: 30, halo: "paper", haloW: 0.22 }) : "")).join("")); },
  { box: mapBox, demo: {}, opts: "pins: [[lon, lat, name], ..], hi, land, labels", tags: ["map", "pins", "locations", "places", "cities", "markers"], wide: true });

R("Maps", "map-route", "World map · route line", (o) => {
  const A = o.from || [-74, 40], B = o.to || [139, 36], a = [MX(A[0]), MY(A[1])], b = [MX(B[0]), MY(B[1])], c = [(a[0] + b[0]) / 2, Math.min(a[1], b[1]) - (o.bulge === undefined ? 130 : o.bulge)], pts = [];
  for (let i = 0; i <= 30; i++) { const t = i / 30; pts.push([(1 - t) * (1 - t) * a[0] + 2 * (1 - t) * t * c[0] + t * t * b[0], (1 - t) * (1 - t) * a[1] + 2 * (1 - t) * t * c[1] + t * t * b[1]]); }
  const g = clamp(o.grow === undefined ? 1 : o.grow), k = Math.max(1, Math.round(g * 30));
  return mapCard(o, mapBase(o)) + L.stroke(L.poly(pts.slice(0, k + 1)), { c: "red", w: 9, dash: "22 14" }) + dotp(a[0], a[1], 14, "white") + (g >= 1 ? pin(b[0], b[1], "red", 70) : "") + (o.text ? T(o.text, c[0] / 1 * 0.5 + (a[0] + b[0]) / 4, (a[1] + b[1]) / 4 + c[1] / 2 - 26, { size: 40, halo: "paper", haloW: 0.2, weight: 700 }) : ""); },
  { box: mapBox, demo: { text: "12,000 km" }, opts: "from: [lon, lat], to: [lon, lat], text, bulge, grow: 0..1", tags: ["map", "route", "journey", "travel", "distance", "path", "flight"], wide: true });

R("Maps", "map-zoom", "World map · zoom circle", (o) => {
  const T0 = o.at || [-58, -12], t = [MX(T0[0]), MY(T0[1])], C = [210, 5], ri = 175, rt = 34, z = o.zoom || 3.2, dx = C[0] - t[0], dy = C[1] - t[1], m = Math.hypot(dx, dy), nx = -dy / m, ny = dx / m;
  const lens = clipD(L.circ(C[0], C[1], ri), L.flat(L.rect(C[0] - ri, C[1] - ri, 2 * ri, 2 * ri), o.ocean || "sky") + L.g(mapBase(Object.assign({}, o, { grid: false })), `translate(${f1(C[0])} ${f1(C[1])}) scale(${z}) translate(${f1(-t[0])} ${f1(-t[1])})`));
  return mapCard(o, mapBase(o)) + L.stroke(L.poly([[t[0] + nx * rt, t[1] + ny * rt], [C[0] + nx * ri, C[1] + ny * ri]]), { c: "red", w: "prop" }) + L.stroke(L.poly([[t[0] - nx * rt, t[1] - ny * rt], [C[0] - nx * ri, C[1] - ny * ri]]), { c: "red", w: "prop" }) +
    L.stroke(L.circ(t[0], t[1], rt), { c: "red", w: 8 }) + lens + L.stroke(L.circ(C[0], C[1], ri), { c: "red", w: 10 }) + L.shape(L.circ(C[0], C[1], 8), "red", { w: "detail", flat: true }); },
  { box: mapBox, demo: { at: [-58, -12] }, opts: "at: [lon, lat], zoom, hi, land, ocean", tags: ["map", "zoom", "magnify", "focus", "close up", "lens", "region"], wide: true });

R("Maps", "map-pin", "Map pin · big marker with label", (o) => {
  return L.shadow(0, 40, 130) + L.flat(L.circ(0, 40, 54, 14), "red", 0.25) + pin(0, 40, o.c || "red", 150) + (o.text ? T(o.text, 0, 96, { size: 44, weight: 700 }) : ""); },
  { box: [-210, -230, 420, 380], demo: { text: "We are here" }, opts: "text, c", tags: ["pin", "location", "marker", "you are here", "place", "map"] });

// ===================== Pictograms & meters =====================
R("Pictograms & meters", "people-x10", "People icons · k of 10", (o) => {
  const n = o.n || 10, k = clamp(o.k === undefined ? 7 : o.k, 0, n), sp = Math.min(76, 760 / n); let s = "";
  for (let i = 0; i < n; i++) s += person(-((n - 1) * sp) / 2 + i * sp, 60, 130, i < k ? o.c || "orange" : "gray");
  return s + T(o.text || k + " out of " + n, 0, 128, { size: 62, weight: 700 }); },
  { box: [-420, -100, 840, 290], demo: { k: 7, text: "7 out of 10 people" }, opts: "n, k: highlighted, text, c", tags: ["people", "pictogram", "out of ten", "crowd", "percent", "survey"] });

R("Pictograms & meters", "people-grid", "People grid · 10×10 (×100)", (o) => {
  const k = clamp(Math.round(o.k === undefined ? 23 : o.k), 0, 100); let s = "";
  for (let i = 0; i < 100; i++) s += person(-225 + (i % 10) * 50, -150 + Math.floor(i / 10) * 50, 46, i < k ? o.c || "red" : "gray", true);
  return s + T(o.text || k + " in 100", 0, 345, { size: 58, weight: 700 }); },
  { box: [-270, -230, 540, 620], demo: { k: 23, text: "23 in 100" }, opts: "k: 0..100 highlighted, text, c", tags: ["people", "pictogram", "per hundred", "crowd", "population", "percent"] });

R("Pictograms & meters", "people-one-in", "People row · 1 in N", (o) => {
  const n = clamp(o.n || 10, 2, 20), rows = n > 10 ? 2 : 1, per = Math.ceil(n / rows), sp = Math.min(76, 760 / per); let s = "";
  for (let i = 0; i < n; i++) s += person(-((per - 1) * sp) / 2 + (i % per) * sp, 30 + Math.floor(i / per) * 130 - (rows - 1) * 55, 120, i === (o.at || 0) ? "red" : "gray");
  return s + T(o.text || "1 in " + n, 0, 150 + (rows - 1) * 70, { size: 70, weight: 700 }); },
  { box: [-420, -110, 840, 380], demo: { n: 10 }, opts: "n: 2..20, at: index, text", tags: ["one in", "people", "odds", "rare", "chance", "pictogram"] });

R("Pictograms & meters", "pictogram-rows", "Pictogram rows · one icon = a unit", (o) => {
  const d = (o.values || [["Mon", 3], ["Tue", 5], ["Wed", 2]]).slice(0, 4), unit = o.unit || "= 10 people", rh = 96; let s = "";
  d.forEach(([l, n], i) => { const y = (i - (d.length - 1) / 2) * rh; s += lab(o, l, -260, y, { size: 42, anchor: "end" }); for (let k = 0; k < Math.min(n, 10); k++) s += person(-220 + k * 62, y + 40, 82, col(o, i)); });
  return s + (o.labels === false ? "" : T(unit, 0, d.length * 50 + 42, { size: 36, c: "gray" })); },
  { box: [-350, -230, 780, 460], demo: { values: [["Mon", 3], ["Tue", 5], ["Wed", 2]], unit: "each icon = 10 people" }, opts: "values: [[label, count ≤ 10], ..], unit, colors", tags: ["pictogram", "icons", "chart", "count", "people", "unit"] });

R("Pictograms & meters", "thermometer", "Thermometer", (o) => {
  const v = clamp(o.value === undefined ? 0.7 : o.value), top = 130 - v * 300, c = v > 0.7 ? "red" : v > 0.35 ? "orange" : "blue";
  let s = blk(-34, -190, 68, 320, "white", 34) + L.shape(L.circ(0, 160, 62), "white") + L.shape(L.rrect(-34, -190, 68, 330, 34), "white", { w: "detail", flat: true }).replace(/stroke-width="[^"]*"/, 'stroke-width="0"') + L.shape(L.circ(0, 160, 44), c) + L.shape(L.rrect(-17, top, 34, 160 - top, 17), c, { w: "detail" }) + L.shape(L.circ(0, 160, 44), c, { w: "detail" }).replace(/stroke-width="[^"]*"/, 'stroke-width="0"');
  for (let i = 0; i <= 5; i++) s += L.stroke(L.line([48, 130 - i * 60], [i % 5 ? 72 : 90, 130 - i * 60]), { w: "detail" });
  return s + (o.top && o.labels !== false ? T(o.top, 104, -170, { size: 36, anchor: "start", c: "red" }) : "") + (o.bottom && o.labels !== false ? T(o.bottom, 104, 130, { size: 36, anchor: "start", c: "blue" }) : "") + (o.text ? T(o.text, -56, top, { size: 52, weight: 700, anchor: "end" }) : ""); },
  { box: [-260, -230, 520, 460], demo: { value: 0.7, top: "HOT", bottom: "COLD", text: "38°" }, opts: "value: 0..1, text, top, bottom", tags: ["thermometer", "temperature", "heat", "fever", "hot", "cold", "meter"] });

R("Pictograms & meters", "battery", "Battery level", (o) => {
  const p = clamp((o.pct === undefined ? 65 : o.pct) / 100), c = p > 0.5 ? "green" : p > 0.2 ? "yellow" : "red";
  return blk(-170, -80, 320, 160, "white", 26) + L.shape(L.rrect(150, -34, 30, 68, 10), "ink", { w: "detail", flat: true }) + (p > 0.02 ? blk(-156, -66, Math.max(288 * p, 30), 132, c, 16, { w: "detail" }) : "") + T(Math.round(p * 100) + "%", -10, 0, { size: 72, weight: 700 }); },
  { box: [-210, -110, 420, 220], demo: { pct: 65 }, opts: "pct: 0..100", tags: ["battery", "energy", "charge", "power", "level", "percent"] });

R("Pictograms & meters", "progress-steps", "Segmented progress · step k of n", (o) => {
  const n = clamp(o.n || 5, 2, 10), k = clamp(o.k === undefined ? 3 : o.k, 0, n), W = 700, sw = (W - (n - 1) * 12) / n; let s = "";
  for (let i = 0; i < n; i++) s += blk(-W / 2 + i * (sw + 12), -34, sw, 68, i < k ? o.c || "green" : "paper", 20, { flat: i >= k });
  return s + T(o.text || "Step " + k + " of " + n, 0, 90, { size: 48 }); },
  { box: [-400, -70, 800, 220], demo: { n: 5, k: 3 }, opts: "n, k, text, c", tags: ["progress", "steps", "stage", "loading", "segments", "level"] });

R("Pictograms & meters", "signal-bars", "Signal strength bars", (o) => {
  const lv = clamp(o.level === undefined ? 3 : o.level, 0, 4); let s = "";
  for (let i = 0; i < 4; i++) { const h = 50 + i * 50; s += blk(-110 + i * 60, 110 - h, 44, h, i < lv ? o.c || "green" : "gray", 10, { tone: i < lv ? 0 : 1, flat: i >= lv }); }
  return s; },
  { box: [-140, -130, 280, 260], demo: { level: 3 }, opts: "level: 0..4, c", tags: ["signal", "strength", "bars", "wifi", "reception", "level"] });

R("Pictograms & meters", "vu-meter", "Level meter · stacked segments", (o) => {
  const v = clamp(o.value === undefined ? 0.7 : o.value), n = 10, on = Math.round(v * n); let s = "";
  for (let i = 0; i < n; i++) { const y = 150 - (i + 1) * 36, c = i >= 8 ? "red" : i >= 6 ? "yellow" : "green"; s += blk(-70, y, 140, 30, i < on ? c : "gray", 8, { flat: i >= on, tone: i < on ? 0 : 1 }); }
  return s + (o.text ? T(o.text, 0, 190, { size: 40 }) : ""); },
  { box: [-110, -230, 220, 470], demo: { value: 0.7, text: "Loud" }, opts: "value: 0..1, text", tags: ["level", "meter", "volume", "loudness", "amount", "stack"] });
})();
