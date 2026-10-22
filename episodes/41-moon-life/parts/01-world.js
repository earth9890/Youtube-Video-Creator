// ---------- sky, stars, moon, earth, sun (from episode 31) ----------
let CPN = 0;
const clipG = (S, d, parent) => { const id = "cg" + ++CPN, cp = el("clipPath", { id }, dsDefs()); el("path", { d }, cp); const g = S.grp(parent); g.setAttribute("clip-path", `url(#${id})`); return g; };
const hgrad = (a, b) => { const id = "hg" + ++CPN, g = el("linearGradient", { id, x1: 0, y1: 0, x2: 1, y2: 0 }, dsDefs()); el("stop", { offset: 0, "stop-color": a }, g); el("stop", { offset: 1, "stop-color": b }, g); return `url(#${id})`; };
const dashed = (p, a = 0.03, b = 0.022) => (p.setAttribute("stroke-dasharray", `${a} ${b}`), p);
const stars = (S, n, x0, y0, x1, y1, o = {}) => { // one path for the whole field (keeps the DOM small); stars never twinkle
  const g = S.grp(o.parent), t = o.t ?? S.start; let d = "";
  for (let i = 0; i < n; i++) {
    const x = x0 + rnd() * (x1 - x0), y = y0 + rnd() * (y1 - y0), r = 1.4 + rnd() * rnd() * (o.big ?? 4); rnd();
    d += r > 3.6 ? `M${x} ${y - r * 2.2} L${x + r * 0.5} ${y - r * 0.5} L${x + r * 2.2} ${y} L${x + r * 0.5} ${y + r * 0.5} L${x} ${y + r * 2.2} L${x - r * 0.5} ${y + r * 0.5} L${x - r * 2.2} ${y} L${x - r * 0.5} ${y - r * 0.5} Z ` : circ(x, y, r) + " ";
  }
  S.fill(d, t, 0, DS.P.white[0], 0.8, g);
  return g;
};
// the Milky Way: a soft band of glow and dense stars from (x0,y0) to (x1,y1)
const milky = (S, x0, y0, x1, y1, o = {}) => {
  const g = S.grp(o.parent), t = o.t ?? S.start, L = Math.hypot(x1 - x0, y1 - y0), nx = -(y1 - y0) / L, ny = (x1 - x0) / L;
  for (let i = 0; i <= 10; i++) { const f = i / 10; S.fill(circ(x0 + (x1 - x0) * f, y0 + (y1 - y0) * f, 230, 230), t, 0, DS.glow(DS.P.glass[1], o.k ?? 0.2), 1, g); }
  let dd = ""; for (let i = 0; i < (o.n ?? 160); i++) { const f = rnd(), d = (rnd() + rnd() + rnd() - 1.5) * 170, r = 1.2 + rnd() * 1.6; rnd(); dd += circ(x0 + (x1 - x0) * f + nx * d, y0 + (y1 - y0) * f + ny * d, r) + " "; }
  S.fill(dd, t, 0, DS.P.white[0], 0.6, g);
  return g;
};
const MARIA = [[-0.28, -0.32, 0.26, 0.22], [0.12, -0.28, 0.16, 0.15], [0.24, 0.02, 0.2, 0.17], [0.6, -0.12, 0.1, 0.12], [-0.5, 0.08, 0.2, 0.34], [-0.2, 0.38, 0.15, 0.1]];
const moon = (S, cx, cy, r, o = {}) => {
  const t = o.t, g = S.grp(o.parent);
  if (o.glow !== false) S.fill(circ(cx, cy, r * 2.6), t ?? S.start, 0, DS.glow(DS.P.yellow[1], o.glowK ?? 0.4), 1, g);
  DS.shape(S, circ(cx, cy, r), "paper", { t, parent: g, w: r > 70 ? "mid" : "detail", c: DS.c("gray") });
  MARIA.forEach(([a, b, rx, ry]) => S.fill(circ(cx + a * r, cy + b * r, rx * r, ry * r), t ?? S.start, 0, DS.c("gray", 1), 0.5, g));
  [[0.22, 0.58, 0.07], [-0.5, -0.5, 0.06], [0.55, 0.3, 0.05], [-0.15, 0.6, 0.05]].forEach(([a, b, k]) => S.draw(circ(cx + a * r, cy + b * r, k * r), t ?? S.start, 0, { c: DS.c("gray", 1), w: DS.w.hair, parent: g }));
  return g;
};
const ghost = (S, cx, cy, r, t) => dashed(S.draw(circ(cx, cy, r), t ?? S.start, 0, { c: DS.P.white[0], w: DS.w.mid, op: 0.75 }));
// lit part of a moon phase: f 0 new .. 1 full; left = waning (lit on the left)
const litPath = (cx, cy, r, f, left = false) => {
  const rx = Math.abs(1 - 2 * f) * r, gib = f > 0.5, so = left ? 0 : 1, st = left ? (gib ? 0 : 1) : (gib ? 1 : 0);
  return `M${cx} ${cy - r} A${r} ${r} 0 0 ${so} ${cx} ${cy + r} A${Math.max(0.1, rx).toFixed(1)} ${r} 0 0 ${st} ${cx} ${cy - r} Z`;
};
const phase = (S, cx, cy, r, f, left, t) => {
  const g = S.grp();
  DS.shape(S, circ(cx, cy, r), "navy", { t, tone: 1, flat: true, w: "detail", c: DS.c("night", 1), parent: g });
  if (f > 0.02) DS.shape(S, litPath(cx, cy, r, f, left), "paper", { t, w: "hair", c: DS.c("gray"), parent: g });
  else dashed(S.draw(circ(cx, cy, r + 10), t ?? S.start, 0, { c: DS.P.white[0], w: DS.w.detail, parent: g, op: 0.8 }));
  return g;
};
const LAND = [
  [[-0.08, -0.62], [0.16, -0.66], [0.3, -0.48], [0.18, -0.3], [0.34, -0.06], [0.24, 0.36], [0.08, 0.56], [-0.02, 0.32], [-0.1, 0.06], [-0.26, -0.06], [-0.24, -0.34]],
  [[-0.78, -0.42], [-0.52, -0.56], [-0.42, -0.34], [-0.56, -0.08], [-0.48, 0.2], [-0.6, 0.48], [-0.72, 0.24], [-0.84, -0.06]],
  [[0.5, -0.62], [0.74, -0.44], [0.8, -0.16], [0.62, -0.1], [0.48, -0.3]],
  [[0.5, 0.3], [0.68, 0.24], [0.72, 0.42], [0.56, 0.5]],
];
// Earth: ocean with volume, land, clouds, ice caps, a soft atmosphere. o.tilt (deg) rotates land + axis; o.night shades the far side (o.nightA = angle the shadow faces, deg); o.young = molten young Earth
const earth = (S, cx, cy, r, o = {}) => {
  const t = o.t, g = S.grp(o.parent), T = t ?? S.start;
  if (o.atmo !== false) S.fill(circ(cx, cy, r * 1.3), T, 0, DS.glow(o.young ? DS.P.orange[1] : DS.P.sky[0], 0.4), 1, g);
  DS.shape(S, circ(cx, cy, r), o.young ? "red" : "blue", { t, parent: g, w: r > 120 ? "mid" : "detail", tone: o.young ? 2 : 0 });
  const lg = clipG(S, circ(cx, cy, r - 2), g);
  if (o.young) [[-0.4, -0.3, 0.34, 0.2], [0.3, -0.1, 0.3, 0.22], [-0.1, 0.4, 0.4, 0.18], [0.5, 0.5, 0.2, 0.14]].forEach(([a, b, rx, ry]) => DS.shape(S, circ(cx + a * r, cy + b * r, rx * r, ry * r), "orange", { t, parent: lg, w: "hair", c: DS.c("yellow", 1) }));
  else {
    LAND.forEach((P) => DS.shape(S, smooth([...P, P[0]].map(([a, b]) => [cx + a * r, cy + b * r])) + " Z", "grass", { t, parent: lg, w: r > 120 ? "detail" : "hair" }));
    [[0, -0.98, 0.5, 0.16], [0, 1, 0.42, 0.12]].forEach(([a, b, rx, ry]) => S.fill(circ(cx + a * r, cy + b * r, rx * r, ry * r), T, 0, DS.P.white[0], 0.95, lg));
    [[-0.3, -0.18, 0.34], [0.36, 0.2, 0.3], [-0.1, 0.62, 0.36], [0.2, -0.56, 0.24]].forEach(([a, b, w]) => S.draw(smooth([[cx + (a - w / 2) * r, cy + b * r], [cx + a * r, cy + (b - 0.05) * r], [cx + (a + w / 2) * r, cy + (b + 0.01) * r]]), T, 0, { c: DS.P.white[0], w: r > 120 ? DS.w.near : DS.w.mid, op: 0.85, parent: lg }));
  }
  if (o.tilt !== undefined) lg.setAttribute("transform", `rotate(${o.tilt} ${cx} ${cy})`);
  if (o.night) { const a = o.nightA ?? 0, sg = S.grp(lg); S.fill(`M${cx} ${cy - r * 1.2} A${r * 1.2} ${r * 1.2} 0 0 1 ${cx} ${cy + r * 1.2} Z`, T, 0, DS.P.ink[0], 0.5, sg); sg.setAttribute("transform", `rotate(${a - (o.tilt || 0)} ${cx} ${cy})`); }
  if (o.axis) { const ag = S.grp(g); dashed(S.draw(line([cx, cy - r * 1.45], [cx, cy + r * 1.45], 0), o.axisT ?? T, 0, { c: DS.P.white[0], w: DS.w.mid, parent: ag }), 0.05, 0.03); S.fill(circ(cx, cy - r * 1.45, 8), o.axisT ?? T, 0, DS.c("red"), 1, ag); ag.setAttribute("transform", `rotate(${o.tilt || 0} ${cx} ${cy})`); g.axis = ag; }
  S.draw(circ(cx, cy, r), T, 0, { c: DS.line(), w: r > 120 ? DS.w.mid : DS.w.detail, parent: g });
  return g;
};
const sun = (S, cx, cy, r, o = {}) => {
  const g = S.grp(o.parent), t = o.t;
  S.fill(circ(cx, cy, r * 1.9), t ?? S.start, 0, DS.glow(DS.P.yellow[1], 0.7), 1, g);
  DS.shape(S, circ(cx, cy, r), "yellow", { t, parent: g, c: DS.c("orange", 2), w: r > 120 ? "mid" : "detail" });
  return g;
};
// curved spin arrow round (cx, cy); turns over the scene when o.go is a time
const ridge = (y, amp, ph, x0 = -200, x1 = 2120) => smooth(Array.from({ length: 9 }, (_, i) => [x0 + (i * (x1 - x0)) / 8, y - amp * (0.5 + 0.5 * Math.sin(i * 1.3 + ph))])) + ` L${x1} 1280 L${x0} 1280 Z`;
// night landscape: sky gradient, stars (and o.moon / o.milky) behind two hill planes and a ground plane
const land = (S, o = {}) => {
  DS.setHaze("night");
  const P = o.pal || NIGHTP(), hy = o.hy || 700, g = S.grp(o.parent), sh = (d, fill) => S.fill(d, S.start, 0, fill, 1, g);
  sh(rect(-200, -200, 2320, 1480), DS.vgrad(P.sky[0], P.sky[1]));
  const sky = S.grp(g);
  if (o.stars !== false) stars(S, o.stars || 80, -100, -100, 2020, hy - 30, { parent: sky });
  if (o.milky) milky(S, ...o.milky, { parent: sky, t: o.milkyT });
  if (o.moon) moon(S, o.moon[0], o.moon[1], o.moon[2], { parent: sky, t: o.moonT });
  sh(ridge(hy - 60, 80, o.ph ?? 0.7), P.far);
  sh(ridge(hy - 10, 50, (o.ph ?? 0.7) + 1.5), P.mid);
  sh(ridge(hy + 30, 16, 4.1), DS.vgrad(P.ground[0], P.ground[1]));
  return { g, sky, hy };
};
const space = (S, o = {}) => {
  DS.setHaze("night");
  const g = S.grp(); S.fill(rect(-200, -200, 2320, 1480), S.start, 0, DS.vgrad(DS.P.navy[2], DS.P.ink[2]), 1, g);
  if (o.milky) milky(S, ...o.milky, { parent: g, k: 0.12, n: 120 });
  stars(S, o.n ?? 120, -100, -100, 2020, 1180, { parent: g });
  return g;
};
// acacia silhouette (savanna)
const house = (S, x, gy, k, o = {}) => {
  const L = o.layer || "mid";
  DS.shadow(S, x, gy, 340 * k);
  DS.shape(S, rect(x + 70 * k, gy - 330 * k, 40 * k, 90 * k), "brown", { layer: L, w: "detail" });
  DS.shape(S, rect(x - 150 * k, gy - 210 * k, 300 * k, 210 * k), "wall", { layer: L, tone: 2 });
  DS.shape(S, `M${x - 180 * k} ${gy - 200 * k} L${x} ${gy - 330 * k} L${x + 180 * k} ${gy - 200 * k} Z`, "red", { layer: L, tone: 2 });
  DS.shape(S, rrect(x - 30 * k, gy - 120 * k, 60 * k, 120 * k, DS.r.xs), "wood", { layer: L, w: "detail" });
  [-95, 95].forEach((dx) => DS.shape(S, rect(x + dx * k - 32 * k, gy - 160 * k, 64 * k, 60 * k), o.lit ? "yellow" : "navy", { layer: L, flat: true, tone: o.lit ? 1 : 2, w: "detail" }));
};

