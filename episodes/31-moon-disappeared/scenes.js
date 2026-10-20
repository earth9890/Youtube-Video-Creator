// look: still
// What If the Moon Disappeared? (~8:15). What-if escalation: Dave, keeper of Earth's night-light, flips the Moon's switch to GONE for one night off, then reads its job list one line at a time.
// Runner: the Moon's JOB LIST taped beside the night-light switch (ON / GONE): 1 night-light, reef calendar (added in pencil), 2 tides, 3 brakes, 4 steering ?, and a small-print bottom line.
// Real scientists are name cards only. Where the script hedges, the screen says so (MAYBE / NOBODY KNOWS EXACTLY / MAY / PROBABLY / STILL ARGUED ABOUT / MOST LIKELY).

// ---------- people ----------
// a figure on a depth plane; shadow and body share one group so they fade together
const who = (S, x, gy, layer = "near", o = {}) => {
  const s = (o.s || 1.1) * DS.depth[layer].s, g = o.parent || S.grp();
  DS.shadow(S, x, o.gs ?? gy, 150 * s, { t: o.t, parent: g });
  const F = S.fig(x, gy, Object.assign({ hair: "short", outfit: "tee" }, o, { s, parent: g, w: DS.w[DS.depth[layer].w] * 1.3 * Math.sqrt(s) })).draw(o.t ?? S.start, 0.4);
  F.face(o.t ?? S.start, o.mood || "flat", o.look || 0);
  F.all = g;
  return F;
};
const dave = (S, x, gy, layer = "near", o = {}) => who(S, x, gy, layer, Object.assign({ s: 1.1, hair: "side", hairC: DS.c("brown"), outfitC: DS.c("blue") }, o));
// Dave's sleep mask, pushed up on his forehead
const mask = (S, F, t) => { const R = F.r, [x, y] = F.hd; DS.shape(S, rrect(x - 1.04 * R, y - 0.92 * R, 2.08 * R, 0.26 * R, DS.r.xs), "navy", { t, w: "detail", parent: F.g }); [-1, 1].forEach((sd) => DS.shape(S, circ(x + sd * 0.38 * R, y - 0.86 * R, 0.3 * R, 0.17 * R), "navy", { t, tone: 1, w: "detail", parent: F.g })); };
// Dave asleep on his back under the blanket, head on the pillow (bed() gives the mattress top)
const sleeper = (S, x1, top, o = {}) => {
  const s = 1.0, hx = x1 - 140, fx = hx - 309 * s, fy = top - 46, g = S.grp();
  const F = S.fig(fx, fy, { s, hair: "side", hairC: DS.c("brown"), outfit: "tee", outfitC: DS.c("blue"), parent: g, w: DS.w.near * 1.3 }).draw(S.start, 0.4);
  F.lie(S.start - 0.7, 0.01, 90); F.face(S.start, "sleep", 0);
  DS.shape(S, smooth([[fx - 60, top + 4], [fx - 50, fy - 38], [fx + 60, fy - 56], [hx - 130, fy - 56], [hx - 52, fy - 42], [hx - 36, fy + 4], [hx - 40, top + 4]]) + " Z", o.blanket || "purple", { parent: g });
  S.draw(smooth([[fx + 40, fy - 30], [fx + 130, fy - 12], [fx + 230, fy - 32]]), S.start, 0, { c: DS.c(o.blanket || "purple", 2), w: DS.w.detail, parent: g });
  return F;
};
const txt = (S, s, x, y, o = {}) => S.text(s, x, y, Object.assign({ size: DS.type.caption, c: DS.c("ink") }, o));
// speech or thought bubble with centred lines of text, all in one group
const say = (S, cx, cy, rx, ry, tx, ty, strs, t, o = {}) => {
  const g = S.grp(); (o.think ? S.thought : S.speech)(cx, cy, rx, ry, tx, ty, t, 0.3, { parent: g });
  const size = o.size || DS.type.small, n = strs.length;
  strs.forEach((s, i) => S.text(s, cx, cy + size * 0.36 + (i - (n - 1) / 2) * size * 1.2, { size, t, c: DS.c("ink"), parent: g }));
  return g;
};
const tick = (S, x, y, k, t, name = "green") => S.tick(x, y, k, t, 0, { c: DS.c(name), w: DS.w.near });
const xMark = (S, x, y, k, t) => S.cross(x, y, k, t, 0, { c: DS.c("red"), w: DS.w.near });
const ring = (S, x, y, w, h, t, name = "red") => S.draw(rrect(x, y, w, h, DS.r.md), t, 0, { c: DS.c(name), w: DS.w.near });
const panel = (S, cx, cy, w, h, t, name = "white", parent) => { DS.drop(S, rrect(cx - w / 2 + 8, cy - h / 2 + 12, w, h, DS.r.md), { t, parent }); return DS.shape(S, rrect(cx - w / 2, cy - h / 2, w, h, DS.r.md), name, { t, flat: true, w: "detail", parent }); };
const grow = (g, t, x, y, sx = false, dur = 0.7, k0 = 0.02) => { const tf = (k) => `translate(${x} ${y}) scale(${sx ? k : 1} ${sx ? 1 : k}) translate(${-x} ${-y})`; tl.fromTo(g, { attr: { transform: tf(k0) } }, { attr: { transform: tf(1) }, duration: dur, ease: "power2.out" }, t); };
let WP = 0;
const wipe = (node, x, y, w, h, t, dur = 1.0) => { const id = "wp" + ++WP, cp = el("clipPath", { id }, dsDefs()), r = el("rect", { x, y, width: 0, height: h }, cp); node.setAttribute("clip-path", `url(#${id})`); tl.fromTo(r, { attr: { width: 0 } }, { attr: { width: w }, duration: dur, ease: "power1.inOut" }, t); };
let CPN = 0;
const clipG = (S, d, parent) => { const id = "cg" + ++CPN, cp = el("clipPath", { id }, dsDefs()); el("path", { d }, cp); const g = S.grp(parent); g.setAttribute("clip-path", `url(#${id})`); return g; };
const spin = (g, x, y, t, dur, deg) => tl.to(g, { rotation: deg, svgOrigin: `${x} ${y}`, duration: dur, ease: "none" }, t);
// numbers that swap on the spoken word: nums = [[t, "1"], [t, "2"], ...]
const swap = (S, nums, x, y, o = {}) => nums.forEach(([tn, str], i) => { const te = S.text(str, x, y, Object.assign({ size: DS.type.display, t: tn, c: DS.c("ink") }, o)); if (nums[i + 1]) S.hide(te, nums[i + 1][0]); });
const hgrad = (a, b) => { const id = "hg" + ++CPN, g = el("linearGradient", { id, x1: 0, y1: 0, x2: 1, y2: 0 }, dsDefs()); el("stop", { offset: 0, "stop-color": a }, g); el("stop", { offset: 1, "stop-color": b }, g); return `url(#${id})`; };
const dashed = (p, a = 0.03, b = 0.022) => (p.setAttribute("stroke-dasharray", `${a} ${b}`), p);

// ---------- sky, stars, moon, earth, sun ----------
const stars = (S, n, x0, y0, x1, y1, o = {}) => {
  const g = S.grp(o.parent), t = o.t ?? S.start;
  for (let i = 0; i < n; i++) {
    const x = x0 + rnd() * (x1 - x0), y = y0 + rnd() * (y1 - y0), r = 1.4 + rnd() * rnd() * (o.big ?? 4), op = 0.45 + rnd() * 0.5;
    const p = S.fill(r > 3.6 ? `M${x} ${y - r * 2.2} L${x + r * 0.5} ${y - r * 0.5} L${x + r * 2.2} ${y} L${x + r * 0.5} ${y + r * 0.5} L${x} ${y + r * 2.2} L${x - r * 0.5} ${y + r * 0.5} L${x - r * 2.2} ${y} L${x - r * 0.5} ${y - r * 0.5} Z` : circ(x, y, r), t, 0, DS.P.white[0], op, g);
    if (i % 4 === 0) tl.to(p, { opacity: op * 0.25, duration: 0.8 + rnd(), yoyo: true, repeat: Math.max(1, Math.ceil(S.len / 1.3)), ease: "sine.inOut" }, S.start + rnd() * 1.5);
  }
  return g;
};
// the Milky Way: a soft band of glow and dense stars from (x0,y0) to (x1,y1)
const milky = (S, x0, y0, x1, y1, o = {}) => {
  const g = S.grp(o.parent), t = o.t ?? S.start, L = Math.hypot(x1 - x0, y1 - y0), nx = -(y1 - y0) / L, ny = (x1 - x0) / L;
  for (let i = 0; i <= 10; i++) { const f = i / 10; S.fill(circ(x0 + (x1 - x0) * f, y0 + (y1 - y0) * f, 230, 230), t, 0, DS.glow(DS.P.glass[1], o.k ?? 0.2), 1, g); }
  for (let i = 0; i < (o.n ?? 160); i++) { const f = rnd(), d = (rnd() + rnd() + rnd() - 1.5) * 170; S.fill(circ(x0 + (x1 - x0) * f + nx * d, y0 + (y1 - y0) * f + ny * d, 1.2 + rnd() * 1.6), t, 0, DS.P.white[0], 0.35 + rnd() * 0.5, g); }
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
const spinArrow = (S, cx, cy, r, o = {}) => {
  const g = S.grp(o.parent), t = o.t ?? S.start, c = DS.c(o.c || "yellow"), a0 = o.a0 ?? 200, a1 = o.a1 ?? 330, ccw = o.ccw !== false;
  const P = arcPts(cx, cy, r, a0, a1, 18, r * (o.squash ?? 1)), [ex, ey] = ccw ? P[0] : P[P.length - 1], [px, py] = ccw ? P[1] : P[P.length - 2];
  S.draw(smooth(P), t, 0, { c, w: DS.w.near, parent: g });
  S.draw(arrowHead(ex, ey, Math.atan2(ey - py, ex - px), 30), t, 0, { c, w: DS.w.near, parent: g });
  if (o.go !== undefined) spin(g, cx, cy, o.go, o.dur || S.end - o.go, (ccw ? -1 : 1) * (o.deg ?? 120));
  return g;
};
const NIGHTP = () => ({ sky: [DS.P.night[2], DS.P.night[0]], far: DS.mix(DS.P.navy[1], DS.P.night[1], 0.35), mid: DS.P.navy[0], ground: [DS.P.navy[0], DS.P.navy[2]] });
const MOONLESS = () => ({ sky: [DS.P.ink[2], DS.P.navy[2]], far: DS.mix(DS.P.navy[2], DS.P.navy[1], 0.45), mid: DS.mix(DS.P.navy[2], DS.P.ink[2], 0.3), ground: [DS.P.navy[2], DS.P.ink[2]] });
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
const acacia = (S, x, gy, k, c) => {
  S.fill(`M${x - 14 * k} ${gy} L${x - 8 * k} ${gy - 170 * k} L${x - 80 * k} ${gy - 260 * k} L${x - 70 * k} ${gy - 270 * k} L${x} ${gy - 200 * k} L${x + 90 * k} ${gy - 280 * k} L${x + 98 * k} ${gy - 268 * k} L${x + 12 * k} ${gy - 170 * k} L${x + 16 * k} ${gy} Z`, S.start, 0, c, 1);
  [[-110, -290, 150, 34], [60, -300, 170, 38], [-10, -320, 130, 30], [150, -282, 90, 24], [-190, -272, 80, 22]].forEach(([dx, dy, rx, ry]) => S.fill(circ(x + dx * k, gy + dy * k, rx * k, ry * k), S.start, 0, c, 1));
};
// Dave's cottage; o.lit = window glow
const house = (S, x, gy, k, o = {}) => {
  const L = o.layer || "mid";
  DS.shadow(S, x, gy, 340 * k);
  DS.shape(S, rect(x + 70 * k, gy - 330 * k, 40 * k, 90 * k), "brown", { layer: L, w: "detail" });
  DS.shape(S, rect(x - 150 * k, gy - 210 * k, 300 * k, 210 * k), "wall", { layer: L, tone: 2 });
  DS.shape(S, `M${x - 180 * k} ${gy - 200 * k} L${x} ${gy - 330 * k} L${x + 180 * k} ${gy - 200 * k} Z`, "red", { layer: L, tone: 2 });
  DS.shape(S, rrect(x - 30 * k, gy - 120 * k, 60 * k, 120 * k, DS.r.xs), "wood", { layer: L, w: "detail" });
  [-95, 95].forEach((dx) => DS.shape(S, rect(x + dx * k - 32 * k, gy - 160 * k, 64 * k, 60 * k), o.lit ? "yellow" : "navy", { layer: L, flat: true, tone: o.lit ? 1 : 2, w: "detail" }));
};

// ---------- the bedroom: window (with or without the Moon), the switch, the job list, the bed ----------
const BEDR = { back: [420, 110, 1500, 740], wall: "night", floor: "wood", window: false };
const WINB = [470, 190, 340, 300];
const bed = (S, x0, x1, gy) => {
  DS.shadow(S, (x0 + x1) / 2, gy, x1 - x0 + 60);
  const top = gy - 170;
  DS.shape(S, rrect(x1 - 56, gy - 420, 64, 420, DS.r.sm), "wood");
  DS.shape(S, rect(x0 + 10, gy - 120, x1 - x0 - 40, 70), "wood", { tone: 2 });
  [x0 + 30, x1 - 80].forEach((lx) => DS.shape(S, rect(lx, gy - 54, 26, 54), "wood", { w: "mid" }));
  DS.shape(S, rrect(x0 + 6, top, x1 - x0 - 56, 74, DS.r.md), "white");
  DS.shape(S, rrect(x1 - 230, top - 74, 170, 84, DS.r.lg), "white");
  DS.shape(S, rrect(x0 - 14, gy - 250, 46, 250, DS.r.sm), "wood");
  return top;
};
// small switch plate + job list on the bedroom wall (o.state on|gone)
const wallKit = (S, o = {}) => {
  const cx = 1040, cy = 525;
  DS.drop(S, rrect(cx - 34 + 4, cy - 52 + 6, 68, 104, DS.r.xs));
  DS.shape(S, rrect(cx - 34, cy - 52, 68, 104, DS.r.xs), "paper", { layer: "mid", w: "detail" });
  DS.shape(S, rrect(cx - 10, cy - 22, 20, 44, DS.r.xs), "gray", { layer: "mid", tone: 2, w: "hair" });
  const up = DS.shape(S, rrect(cx - 8, cy - 34, 16, 32, DS.r.xs), "white", { layer: "mid", w: "hair" }), dn = DS.shape(S, rrect(cx - 8, cy + 2, 16, 32, DS.r.xs), "white", { layer: "mid", w: "hair" });
  const on = o.state !== "gone";
  (on ? dn : up).setAttribute("opacity", 0);
  if (o.flip !== undefined) { S.hide(on ? up : dn, o.flip); S.show(on ? dn : up, o.flip); }
  DS.shape(S, rect(cx - 50, cy - 92, 100, 22), "ink", { layer: "mid", flat: true, w: "hair" });
  const lx = 1110, ly = 415, lw = 150, lh = 200;
  DS.drop(S, rect(lx + 5, ly + 7, lw, lh)); DS.shape(S, rect(lx, ly, lw, lh), "white", { layer: "mid", flat: true, w: "detail" });
  [[lx + 22, ly - 2, -8], [lx + lw - 22, ly - 2, 8]].forEach(([x, y, a]) => { const tg = S.grp(); S.fill(rect(x - 26, y - 9, 52, 18), S.start, 0, DS.c("glass", 1), 0.85, tg); tg.setAttribute("transform", `rotate(${a} ${x} ${y})`); });
  S.fill(rect(lx + 20, ly + 22, lw - 40, 14), S.start, 0, DS.c("ink", 1, "mid"), 1);
  [62, 92, 122, 152, 182].forEach((dy, i) => S.fill(rect(lx + 22, ly + dy, (i % 2 ? 80 : 104), 9), S.start, 0, DS.c("gray", 1, "mid"), 1));
  return { sx: cx, sy: cy, lx, ly, lw, lh };
};
// o.moon: true | false | {in: t} | {out: t};  o.light = moonlight patch on the floor
const bedroom = (S, o = {}) => {
  const R = DS.room(S, BEDR), [wx, wy, ww, wh] = WINB;
  [-1, 1].forEach((sd) => DS.shape(S, `M${sd < 0 ? wx - 70 : wx + ww + 70} ${wy - 40} L${sd < 0 ? wx - 10 : wx + ww + 10} ${wy - 40} Q${sd < 0 ? wx + 30 : wx + ww - 30} ${wy + wh * 0.6} ${sd < 0 ? wx - 20 : wx + ww + 20} ${wy + wh + 80} L${sd < 0 ? wx - 90 : wx + ww + 90} ${wy + wh + 80} Z`, "purple", { layer: "mid", tone: 2 }));
  DS.shape(S, rrect(wx - 16, wy - 16, ww + 32, wh + 32, DS.r.xs), "white", { layer: "mid", w: "mid" });
  const W = clipG(S, rect(wx, wy, ww, wh));
  S.fill(rect(wx, wy, ww, wh), S.start, 0, DS.vgrad(DS.P.navy[2], DS.P.night[0]), 1, W);
  stars(S, 16, wx, wy, wx + ww, wy + wh, { parent: W, big: 2.5 });
  const m = o.moon === undefined ? true : o.moon;
  let mg = null;
  if (m) { mg = moon(S, wx + ww * 0.66, wy + wh * 0.38, 62, { parent: W, glowK: 0.55, t: m.in }); if (m.out !== undefined) S.fadeOut(mg, m.out, 0.8); }
  S.fill(ridge(wy + wh - 40, 30, 1.2, wx - 20, wx + ww + 20), S.start, 0, DS.mix(DS.P.navy[2], DS.P.ink[2], 0.3), 1, W);
  S.draw(`M${wx + ww / 2} ${wy} V${wy + wh} M${wx} ${wy + wh / 2} H${wx + ww}`, S.start, 0, { c: DS.c("white", 0, "mid"), w: DS.w.mid });
  DS.shape(S, rrect(wx - 34, wy + wh + 10, ww + 68, 24, DS.r.xs), "white", { layer: "mid", w: "detail" });
  if (m && o.light !== false) { const lp = S.fill(`M${wx + 20} ${R.hy + 10} L${wx + ww - 20} ${R.hy + 10} L${wx + ww + 300} 1080 L${wx - 160} 1080 Z`, m.in ?? S.start, 0, DS.c("glass", 1), 0.14); if (m.out !== undefined) S.fadeOut(lp, m.out, 0.8); }
  DS.frame(S, 1200, 190, 150, 120, "sky");
  const K = wallKit(S, o);
  return Object.assign(R, { K, mg });
};

// ---------- the switch + the job list, close up (the runner) ----------
const JOBS = [["1. NIGHT-LIGHT", 340], ["2. TIDES", 510], ["3. BRAKES", 600], ["4. STEERING ?", 690]];
const LX = 830, REEFY = 422, PSY = 852, wEst = (s, k) => s.length * k * 0.6;
// o: state on|gone, flip (t), read (0-4 lines readable), lineT (newest line turns readable), reef (true | t written), ring ("label"|0-3|"reef"|"ps"), ringT, ps (t revealed), light (moonlight wash)
const wallCU = (S, o = {}) => {
  DS.setHaze("night");
  S.fill(rect(-200, -200, 2320, 1480), S.start, 0, DS.vgrad(DS.c("night", 0), DS.c("night", 2)), 1);
  for (let x = -40; x < 2000; x += 120) S.fill(rect(x, -200, 44, 1480), S.start, 0, DS.c("night", 1), 0.18);
  if (o.light) S.fill(`M-200 -200 L700 -200 L1500 1280 L-200 1280 Z`, o.lightT ?? S.start, 0, DS.c("glass", 1), 0.08);
  // label-maker strip + plate + toggle
  const cx = 470, cy = 560;
  DS.drop(S, rrect(300 + 6, 250 + 8, 340, 64, DS.r.xs)); DS.shape(S, rrect(300, 250, 340, 64, DS.r.xs), "ink", { w: "detail", flat: true });
  S.text("NIGHT-LIGHT", 470, 296, { size: DS.type.caption, c: DS.P.white[0] });
  DS.drop(S, rrect(cx - 132 + 8, cy - 209 + 12, 264, 418, DS.r.md)); DS.shape(S, rrect(cx - 132, cy - 209, 264, 418, DS.r.md), "paper");
  S.text("ON", cx, 412, { size: DS.type.small, c: DS.c("ink") }); S.text("GONE", cx, 748, { size: DS.type.small, c: DS.c("ink") });
  DS.shape(S, rrect(cx - 42, cy - 78, 84, 156, DS.r.sm), "gray", { tone: 2, w: "detail" });
  const lever = (up, t) => { const g = S.grp(); DS.shape(S, rrect(cx - 30, up ? cy - 128 : cy, 60, 128, DS.r.sm), "white", { parent: g }); DS.shape(S, rrect(cx - 30, up ? cy - 128 : cy + 104, 60, 24, DS.r.sm), "gray", { tone: 1, w: "detail", parent: g }); return g; };
  const on = o.state !== "gone", U = lever(true), D = lever(false), lamp = S.fill(circ(cx + 88, 397, 11), S.start, 0, DS.c("gold"), 1);
  (on ? D : U).setAttribute("opacity", 0); if (!on) lamp.setAttribute("opacity", 0);
  if (o.flip !== undefined) { S.hide(on ? U : D, o.flip); S.show(on ? D : U, o.flip); on ? S.hide(lamp, o.flip) : S.show(lamp, o.flip); S.draw(rays(cx, on ? cy + 80 : cy - 80, 90, 130, 5, on ? 0.6 : -2.5, 2), o.flip, 0, { c: DS.P.white[0], w: DS.w.mid }); }
  // the list
  DS.drop(S, rect(780 + 10, 110 + 14, 960, 800)); DS.shape(S, rect(780, 110, 960, 800), "white", { flat: true, w: "detail" });
  [[830, 112, -7], [1690, 112, 7]].forEach(([x, y, a]) => { const tg = S.grp(); S.fill(rect(x - 70, y - 22, 140, 44), S.start, 0, DS.c("glass", 1), 0.85, tg); tg.setAttribute("transform", `rotate(${a} ${x} ${y})`); });
  S.text("THE MOON'S JOBS", 1260, 222, { size: DS.type.title, c: DS.c("ink") });
  S.draw(line([830, 256], [1690, 256], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.detail });
  const read = o.read ?? 0, R = {};
  JOBS.forEach(([s, y], i) => {
    const w = wEst(s, DS.type.body);
    R[i] = [LX, y, w];
    if (i < read) {
      const late = i === read - 1 && o.lineT !== undefined;
      S.text(s, LX, y, { size: DS.type.body, anchor: "start", c: DS.c("ink"), t: late ? o.lineT : S.start });
      if (late) S.fadeOut(S.fill(rrect(LX, y - 46, w, 44, DS.r.xs), S.start, 0, DS.c("gray", 1), 0.8), o.lineT, 0.25);
    } else S.fill(rrect(LX, y - 46, w, 44, DS.r.xs), S.start, 0, DS.c("gray", 1), 0.8);
  });
  if (o.reef !== undefined) {
    const t = o.reef === true ? S.start : o.reef;
    S.text("reef calendar", LX + 80, REEFY, { size: DS.type.body, font: "caveat", anchor: "start", c: DS.c("gray", 2), t, write: t > S.start + 0.05, dur: 1.0 });
    S.text("+", LX + 30, REEFY, { size: DS.type.body, font: "caveat", c: DS.c("gray", 2), t });
    R.reef = [LX + 10, REEFY, 420];
  }
  if (o.ps !== undefined) { S.text("P.S. I MADE YOUR NIGHT.", LX, PSY, { size: DS.type.caption, anchor: "start", c: DS.c("ink", 1), t: o.ps }); }
  if (o.ps === undefined || o.ps > S.start + 0.05) { const bg = S.grp(); for (let i = 0; i < 9; i++) S.fill(rrect(LX + i * 58, PSY - 26, 46, 22, DS.r.xs), S.start, 0, DS.c("gray", 1), 0.6, bg); if (o.ps !== undefined) S.fadeOut(bg, o.ps, 0.25); }
  R.ps = [LX, PSY + 18, 560, 70];
  R.label = [470, 296, 340, 64];
  if (o.ring !== undefined) {
    const t = o.ringT ?? S.start;
    if (o.ring === "label") ring(S, 284, 238, 372, 88, t);
    else if (o.ring === "ps") ring(S, LX - 24, PSY - 48, 640, 70, t);
    else { const [x, y, w] = R[o.ring]; ring(S, x - 24, y - 68, w + 48, 94, t); }
  }
  return R;
};
// a magnifying glass (o.lens = fill opacity)
const lens = (S, x, y, r, t, ang = 40) => { const g = S.grp(), a = (ang * Math.PI) / 180; S.fill(circ(x, y, r), t ?? S.start, 0, DS.c("glass", 1), 0.35, g); S.draw(circ(x, y, r), t ?? S.start, 0, { c: DS.c("ink"), w: DS.w.near, parent: g }); DS.shape(S, `M${x + Math.cos(a) * r} ${y + Math.sin(a) * r} L${x + Math.cos(a) * r * 2} ${y + Math.sin(a) * r * 2}`, "wood", { t, parent: g, w: "near" }); S.draw(line([x + Math.cos(a) * (r + 4), y + Math.sin(a) * (r + 4)], [x + Math.cos(a) * r * 2.1, y + Math.sin(a) * r * 2.1], 0), t ?? S.start, 0, { c: DS.c("wood", 2), w: DS.w.near * 3, parent: g }); return g; };

// ---------- section 2 props: savanna, beetle, sky pattern, planetarium, beach, turtles, reef ----------
const savanna = (S, o = {}) => { const O = land(S, Object.assign({ hy: 760, ph: 2.2 }, o)); acacia(S, o.tree ?? 300, O.hy + 20, 1.3, DS.mix(DS.P.navy[2], DS.P.ink[2], 0.4)); return O; };
// dung beetle doing its handstand against the ball (rolls toward +x). Returns { g, ball }. o.eye = "up" | "worried"; o.glasses
const beetle = (S, x, gy, k, o = {}) => {
  const g = S.grp(o.parent), t = o.t, R = 62 * k, bx = x + 70 * k, by = gy - R, ink = DS.c("ink");
  DS.shadow(S, x + 20 * k, gy, 230 * k, { t, parent: g });
  const ball = S.grp(g);
  DS.shape(S, circ(bx, by, R), "earth", { t, tone: 2, parent: ball, w: "mid" });
  [[-0.4, -0.3, 0.3], [0.2, 0.25, 0.35], [0.35, -0.35, 0.2], [-0.3, 0.4, 0.2]].forEach(([a, b, w]) => S.draw(line([bx + (a - w / 2) * R, by + b * R], [bx + (a + w / 2) * R, by + (b + 0.08) * R], 0), t ?? S.start, 0, { c: DS.c("brown"), w: DS.w.detail, parent: ball }));
  const legs = [[[x - 30 * k, gy - 46 * k], [x - 74 * k, gy - 24 * k], [x - 96 * k, gy]], [[x - 10 * k, gy - 40 * k], [x - 30 * k, gy - 14 * k], [x - 44 * k, gy]], [[x + 20 * k, gy - 58 * k], [x + 30 * k, gy - 26 * k], [x + 18 * k, gy]],
    [[x + 26 * k, gy - 86 * k], [x + 6 * k, gy - 126 * k], [bx - R * 0.86, by - R * 0.52]], [[x + 34 * k, gy - 70 * k], [x + 44 * k, gy - 96 * k], [bx - R * 0.98, by + R * 0.1]]];
  legs.forEach((P) => S.draw(poly(P, 0), t ?? S.start, 0, { c: ink, w: DS.w.mid, parent: g }));
  const body = `M${x - 52 * k} ${gy - 30 * k} Q${x - 40 * k} ${gy - 96 * k} ${x + 30 * k} ${gy - 112 * k} Q${x + 64 * k} ${gy - 100 * k} ${x + 52 * k} ${gy - 62 * k} Q${x + 20 * k} ${gy - 26 * k} ${x - 52 * k} ${gy - 30 * k} Z`;
  DS.shape(S, body, "brown", { t, parent: g, w: "mid" });
  S.draw(`M${x - 34 * k} ${gy - 52 * k} Q${x} ${gy - 92 * k} ${x + 36 * k} ${gy - 98 * k}`, t ?? S.start, 0, { c: DS.c("brown", 1), w: DS.w.detail, parent: g });
  S.draw(`M${x - 30 * k} ${gy - 70 * k} Q${x - 10 * k} ${gy - 94 * k} ${x + 20 * k} ${gy - 102 * k}`, t ?? S.start, 0, { c: DS.P.white[0], w: DS.w.detail, op: 0.45, parent: g });
  const hx = x - 66 * k, hy = gy - 26 * k;
  DS.shape(S, `M${hx - 30 * k} ${hy + 18 * k} Q${hx - 36 * k} ${hy - 20 * k} ${hx + 4 * k} ${hy - 22 * k} Q${hx + 26 * k} ${hy - 4 * k} ${hx + 14 * k} ${hy + 18 * k} Z`, "brown", { t, tone: 2, parent: g, w: "detail" });
  [-26, -16, -6].forEach((dx) => S.draw(line([hx + dx * k, hy + 18 * k], [hx + (dx - 4) * k, hy + 26 * k], 0), t ?? S.start, 0, { c: ink, w: DS.w.detail, parent: g }));
  const ex = hx - 4 * k, ey = hy - 4 * k, look = o.eye === "up" ? [2, -4] : [-3, 1];
  S.draw(circ(ex, ey, 9 * k), t ?? S.start, 0, { c: ink, w: DS.w.hair, fill: DS.P.white[0], parent: g });
  S.fill(circ(ex + look[0] * k, ey + look[1] * k, 4.5 * k), t ?? S.start, 0, ink, 1, g);
  if (o.eye === "worried") S.draw(line([ex - 10 * k, ey - 16 * k], [ex + 8 * k, ey - 12 * k], 0), t ?? S.start, 0, { c: ink, w: DS.w.detail, parent: g });
  if (o.glasses !== undefined) { const gg = S.grp(g); S.draw(circ(ex, ey, 13 * k), o.glasses, 0, { c: ink, w: DS.w.detail, parent: gg }); S.draw(circ(ex + 26 * k, ey + 2 * k, 11 * k), o.glasses, 0, { c: ink, w: DS.w.detail, parent: gg }); S.draw(line([ex + 13 * k, ey], [ex + 15 * k, ey + 1 * k], 0), o.glasses, 0, { c: ink, w: DS.w.detail, parent: gg }); }
  return { g, ball, bx, by, R };
};
// roll the beetle + ball by dx between t and t+dur (ball turns)
const roll = (S, B, t, dur, dx) => { tl.fromTo(B.g, { x: 0 }, { x: dx, duration: dur, ease: "power1.inOut" }, t); tl.fromTo(B.ball, { attr: { transform: `rotate(0 ${B.bx} ${B.by})` } }, { attr: { transform: `rotate(${(dx / (2 * Math.PI * B.R)) * 360} ${B.bx} ${B.by})` }, duration: dur, ease: "power1.inOut" }, t); };
const dungPile = (S, x, gy, k) => { DS.shadow(S, x, gy, 300 * k); DS.shape(S, `M${x - 150 * k} ${gy} Q${x - 120 * k} ${gy - 90 * k} ${x - 30 * k} ${gy - 100 * k} Q${x + 30 * k} ${gy - 140 * k} ${x + 90 * k} ${gy - 80 * k} Q${x + 150 * k} ${gy - 50 * k} ${x + 150 * k} ${gy} Z`, "earth", { tone: 2 }); [[-60, -60], [20, -90], [80, -50]].forEach(([a, b]) => S.draw(line([x + a * k, gy + b * k], [x + (a + 30) * k, gy + (b + 6) * k], 0), S.start, 0, { c: DS.c("brown"), w: DS.w.detail })); };
// the faint polarisation pattern: rings of short dashes centred on the light
const polar = (S, mx, my, t, o = {}) => { const g = S.grp(); (o.rings || [150, 240, 340, 450, 570, 700]).forEach((r, i) => { const n = Math.round(r / 26), rg = S.grp(g); for (let j = 0; j < n; j++) { const a = (j / n) * Math.PI * 2 + i * 0.3, x = mx + r * Math.cos(a), y = my + r * Math.sin(a), dx = -Math.sin(a) * (o.len || 16), dy = Math.cos(a) * (o.len || 16); S.draw(`M${x - dx} ${y - dy} L${x + dx} ${y + dy}`, t, 0, { c: o.c || DS.c("sky", 1), w: o.w || DS.w.detail, op: o.op ?? 0.75, parent: rg }); } if (t > S.start + 0.05) tl.fromTo(rg, { opacity: 0 }, { opacity: 1, duration: 0.4 }, t + i * 0.15); }); return g; };
// planetarium: dark dome full of projected stars, a round arena, the star projector
const planetarium = (S, o = {}) => {
  DS.setHaze("night");
  S.fill(rect(-200, -200, 2320, 1480), S.start, 0, DS.P.ink[2], 1);
  const D = clipG(S, circ(960, 900, 1150, 860));
  S.fill(circ(960, 900, 1150, 860), S.start, 0, DS.vgrad(DS.P.navy[2], DS.c("night", 2)), 1, D);
  stars(S, 150, -100, 40, 2020, 760, { parent: D, big: 3 });
  if (o.milky !== undefined) milky(S, 120, 640, 1820, 150, { parent: D, t: o.milky === true ? S.start : o.milky, k: 0.3, n: 260 });
  S.draw(circ(960, 900, 1150, 860), S.start, 0, { c: DS.c("night", 1), w: DS.w.mid });
  DS.shape(S, circ(960, 900, 820, 120), "wood", { tone: 2, layer: "mid" });
  DS.shape(S, circ(960, 880, 760, 96), "sand", { layer: "mid" });
  const px = 1560, py = 820; DS.shape(S, rect(px - 14, py - 120, 28, 120), "gray", { tone: 2, w: "detail", layer: "mid" });
  [-1, 1].forEach((sd) => DS.shape(S, circ(px + sd * 56, py - 150, 40), "gray", { layer: "mid", w: "detail" })); DS.shape(S, rect(px - 30, py - 158, 60, 16), "gray", { layer: "mid", tone: 2, w: "hair" });
};
// beach at night, looking out to sea. o.pal NIGHTP | MOONLESS, o.moon = [x, y, r], o.glow = bright horizon
const beach = (S, o = {}) => {
  DS.setHaze("night");
  const P = o.pal || NIGHTP(), hz = o.hz ?? 430, sh = o.shore ?? 640, g = S.grp();
  S.fill(rect(-200, -200, 2320, 1480), S.start, 0, DS.vgrad(P.sky[0], P.sky[1]), 1, g);
  stars(S, 70, -100, -100, 2020, hz - 20, { parent: g });
  if (o.moon) moon(S, ...o.moon, { parent: g });
  S.fill(rect(-200, hz, 2320, sh - hz), S.start, 0, DS.vgrad(o.pal === MOONLESS ? DS.P.navy[2] : DS.c("night", 1), DS.P.navy[2]), 1, g);
  if (o.glow !== false) S.fill(circ(o.moon ? o.moon[0] : 960, hz, 900, 120), S.start, 0, DS.glow(DS.P.glass[1], o.pal === MOONLESS ? 0.12 : 0.5), 1, g);
  if (o.moon) S.fill(`M${o.moon[0] - 40} ${hz + 6} L${o.moon[0] + 40} ${hz + 6} L${o.moon[0] + 160} ${sh} L${o.moon[0] - 160} ${sh} Z`, S.start, 0, DS.c("glass", 1), 0.18, g);
  for (let i = 0; i < 6; i++) { const y = hz + 22 + i * ((sh - hz - 30) / 6); S.draw(`M${-100 + (i % 2) * 140} ${y} q 60 -10 120 0 t 120 0 t 120 0`, S.start, 0, { c: DS.c("glass", 1), w: DS.w.hair, op: 0.25, parent: g }); }
  const sand = o.pal === MOONLESS ? [DS.mix(DS.P.sand[2], DS.P.navy[2], 0.75), DS.mix(DS.P.sand[2], DS.P.ink[2], 0.85)] : [DS.mix(DS.P.sand[0], DS.P.night[0], 0.55), DS.mix(DS.P.sand[2], DS.P.navy[2], 0.7)];
  S.fill(`M-200 ${sh} Q 480 ${sh - 18} 960 ${sh} T 2120 ${sh} L2120 1280 L-200 1280 Z`, S.start, 0, DS.vgrad(sand[0], sand[1]), 1, g);
  S.draw(`M-200 ${sh} Q 480 ${sh - 18} 960 ${sh} T 2120 ${sh}`, S.start, 0, { c: DS.P.white[0], w: DS.w.mid, op: 0.7, parent: g });
  return { g, hz, sh };
};
// a leatherback hatchling seen from above, heading ang degrees (0 = up the frame)
const turtle = (S, x, y, k, ang, o = {}) => {
  const g = S.grp(o.parent), t = o.t, c = DS.c("ink", 1), edge = DS.c("gray", 1);
  [[-1, -14, 1], [1, -14, 1]].forEach(([sd, dy]) => DS.shape(S, `M${x + sd * 14 * k} ${y + dy * k} Q${x + sd * 50 * k} ${y - 4 * k} ${x + sd * 58 * k} ${y + 30 * k} Q${x + sd * 34 * k} ${y + 8 * k} ${x + sd * 14 * k} ${y + 4 * k} Z`, "ink", { t, tone: 1, parent: g, w: "hair", c: edge }));
  [-1, 1].forEach((sd) => DS.shape(S, circ(x + sd * 16 * k, y + 30 * k, 9 * k, 6 * k), "ink", { t, tone: 1, parent: g, w: "hair", c: edge }));
  DS.shape(S, `M${x} ${y - 28 * k} Q${x + 26 * k} ${y - 20 * k} ${x + 22 * k} ${y + 14 * k} Q${x + 12 * k} ${y + 40 * k} ${x} ${y + 46 * k} Q${x - 12 * k} ${y + 40 * k} ${x - 22 * k} ${y + 14 * k} Q${x - 26 * k} ${y - 20 * k} ${x} ${y - 28 * k} Z`, "ink", { t, tone: 1, parent: g, w: "detail", c: edge });
  [-10, 0, 10].forEach((dx) => S.draw(line([x + dx * k, y - 20 * k], [x + dx * 0.6 * k, y + 36 * k], 0), t ?? S.start, 0, { c: edge, w: DS.w.hair, parent: g }));
  DS.shape(S, circ(x, y - 38 * k, 11 * k), "ink", { t, tone: 1, parent: g, w: "hair", c: edge });
  g.setAttribute("transform", `rotate(${ang} ${x} ${y})`);
  return g;
};
// wrap first: GSAP x/y on an element would replace its own rotate() transform attribute
const wrapG = (g) => { const o = el("g", {}, g.parentNode); o.appendChild(g); return o; };
const crawl = (g, t, dur, dx, dy) => tl.fromTo(wrapG(g), { x: 0, y: 0 }, { x: dx, y: dy, duration: dur, ease: "none" }, t);
const nest = (S, x, y) => { DS.shape(S, circ(x, y, 140, 46), "sand", { tone: 2, flat: true, w: "detail", c: DS.c("brown", 1) }); S.fill(circ(x, y - 4, 90, 26), S.start, 0, DS.P.ink[0], 0.35); };
// underwater reef at night: water, moonlight shafts, sand; o.moon = shimmer of the Moon at the surface
const reef = (S, o = {}) => {
  DS.setHaze("night");
  const g = S.grp(), sy = o.surface ?? -20;
  S.fill(rect(-200, -200, 2320, 1480), S.start, 0, DS.vgrad(DS.c("night", 0), DS.P.navy[2]), 1, g);
  if (o.moon !== false) { S.fill(circ(o.mx ?? 1300, sy + 30, 260, 60), S.start, 0, DS.glow(DS.P.glass[1], 0.6), 1, g); [[-260, 60], [-60, 90], [140, 70]].forEach(([dx, w]) => S.fill(`M${(o.mx ?? 1300) + dx} ${sy} L${(o.mx ?? 1300) + dx + w} ${sy} L${(o.mx ?? 1300) + dx + w - 380} 1000 L${(o.mx ?? 1300) + dx - 420} 1000 Z`, S.start, 0, DS.c("glass", 1), 0.07, g)); }
  for (let i = 0; i < 14; i++) S.draw(circ(150 + rnd() * 1620, 120 + rnd() * 600, 5 + rnd() * 7), S.start, 0, { c: DS.c("glass", 1), w: DS.w.hair, op: 0.4, parent: g });
  S.fill(ridge(o.floor ?? 860, 40, 0.4), S.start, 0, DS.vgrad(DS.c("sand", 0, "far"), DS.mix(DS.P.sand[2], DS.P.navy[2], 0.6)), 1, g);
  return g;
};
// corals: branch | brain | fan; name = palette colour
const coral = (S, x, gy, k, kind, name, o = {}) => {
  const g = S.grp(o.parent), t = o.t, L = o.layer || "near";
  DS.shadow(S, x, gy, 240 * k, { t, parent: g, op: 0.3 });
  if (kind === "brain") { DS.shape(S, `M${x - 120 * k} ${gy} Q${x - 120 * k} ${gy - 150 * k} ${x} ${gy - 150 * k} Q${x + 120 * k} ${gy - 150 * k} ${x + 120 * k} ${gy} Z`, name, { t, parent: g, layer: L }); for (let i = 0; i < 4; i++) S.draw(`M${x - (90 - i * 10) * k} ${gy - (20 + i * 30) * k} q ${30 * k} ${-24 * k} ${60 * k} 0 t ${60 * k} 0 t ${50 * k} 0`, t ?? S.start, 0, { c: DS.c(name, 2, L), w: DS.w.detail, parent: g }); }
  else if (kind === "fan") { DS.shape(S, `M${x} ${gy} L${x - 130 * k} ${gy - 230 * k} Q${x} ${gy - 320 * k} ${x + 130 * k} ${gy - 230 * k} Z`, name, { t, parent: g, layer: L, tone: 1 }); [-90, -45, 0, 45, 90].forEach((dx) => S.draw(line([x, gy], [x + dx * k, gy - 270 * k], 0), t ?? S.start, 0, { c: DS.c(name, 2, L), w: DS.w.detail, parent: g })); for (let i = 1; i < 4; i++) S.draw(arc(x, gy, 80 * i * k, 225, 315), t ?? S.start, 0, { c: DS.c(name, 2, L), w: DS.w.hair, parent: g }); }
  else { const B = [[[0, 0], [0, -110], [-50, -190], [-70, -250]], [[0, -110], [50, -180], [60, -260]], [[-25, -150], [10, -230], [0, -290]], [[30, -150], [100, -200], [120, -240]], [[-35, -170], [-110, -210], [-130, -250]]];
    const P = (pts) => smooth(pts.map(([a, b]) => [x + a * k, gy + b * k]));
    B.forEach((b) => S.draw(P(b), t ?? S.start, 0, { c: DS.c(name, 2, L), w: DS.w.near * 5.6 * k, parent: g }));
    B.forEach((b) => S.draw(P(b), t ?? S.start, 0, { c: DS.c(name, 0, L), w: DS.w.near * 4.4 * k, parent: g }));
    B.forEach((b) => S.draw(P(b), t ?? S.start, 0, { c: DS.c(name, 1, L), w: DS.w.near * 1.2 * k, op: 0.6, parent: g })); }
  return g;
};
// egg-and-sperm bundles rising from (x, y) from t on
const spawn = (S, x, y, n, t, o = {}) => { const g = S.grp(); for (let i = 0; i < n; i++) { const b = S.grp(g), bx = x + (rnd() - 0.5) * (o.spread ?? 160), r = 6 + rnd() * 6; S.fill(circ(bx, y - rnd() * 40, r), t + i * 0.04, 0, DS.c(["pink", "orange", "white"][i % 3], 1), 0.95, b); tl.fromTo(b, { y: 0, x: 0 }, { y: -(o.rise ?? 360) - rnd() * 200, x: (rnd() - 0.5) * 120, duration: Math.max(1, S.end - t + 0.6), ease: "power1.out" }, t + i * 0.04); } return g; };
// a small calendar page: cols x rows cells. Returns cell centres
const cal = (S, x, y, cols, rows, cw, ch, o = {}) => {
  const t = o.t, g = S.grp(o.parent), W0 = cols * cw, H0 = rows * ch + 64, cells = [];
  DS.drop(S, rrect(x + 8, y + 10, W0, H0, DS.r.sm), { t, parent: g });
  DS.shape(S, rrect(x, y, W0, H0, DS.r.sm), "white", { t, flat: true, w: "detail", parent: g });
  DS.shape(S, rrect(x, y, W0, 64, DS.r.sm), "red", { t, flat: true, tone: 2, w: "detail", parent: g });
  if (o.title) S.text(o.title, x + W0 / 2, y + 46, { size: DS.type.caption, t, c: DS.P.white[0], parent: g });
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { const cx = x + c * cw + cw / 2, cy = y + 64 + r * ch + ch / 2; cells.push([cx, cy]); if (c) S.draw(line([x + c * cw, y + 64], [x + c * cw, y + H0], 0), t ?? S.start, 0, { c: DS.c("gray", 1), w: DS.w.hair, parent: g }); }
  for (let r = 1; r < rows; r++) S.draw(line([x, y + 64 + r * ch], [x + W0, y + 64 + r * ch], 0), t ?? S.start, 0, { c: DS.c("gray", 1), w: DS.w.hair, parent: g });
  return { g, cells };
};
// pencil, tip at (x, y), pointing down-left by ang degrees
const pencil = (S, x, y, k, ang, t) => { const g = S.grp(); DS.shape(S, `M${x} ${y} L${x + 18 * k} ${y - 40 * k} L${x + 40 * k} ${y - 30 * k} Z`, "sand", { t, parent: g, w: "detail" }); S.fill(`M${x} ${y} L${x + 7 * k} ${y - 15 * k} L${x + 15 * k} ${y - 11 * k} Z`, t ?? S.start, 0, DS.c("ink"), 1, g); DS.shape(S, `M${x + 18 * k} ${y - 40 * k} L${x + 150 * k} ${y - 330 * k} L${x + 172 * k} ${y - 320 * k} L${x + 40 * k} ${y - 30 * k} Z`, "yellow", { t, parent: g, w: "detail" }); DS.shape(S, `M${x + 150 * k} ${y - 330 * k} L${x + 162 * k} ${y - 356 * k} L${x + 184 * k} ${y - 346 * k} L${x + 172 * k} ${y - 320 * k} Z`, "pink", { t, parent: g, w: "detail" }); g.setAttribute("transform", `rotate(${ang} ${x} ${y})`); return g; };
const zzz = (S, x, y, t) => [["z", DS.type.caption], ["z", DS.type.small], ["Z", DS.type.body]].forEach(([z, size], i) => S.text(z, x + i * 34, y - i * 44, { size, t: t + i * 0.4, c: DS.P.white[0] }));
// above the waterline: night coast with a town (o.lights = time the town lights up, or true); below: the reef
const coastReef = (S, o = {}) => {
  DS.setHaze("night");
  const wl = 380, g = S.grp();
  S.fill(rect(-200, -200, 2320, wl + 200), S.start, 0, DS.vgrad(DS.P.navy[2], DS.c("night", 0)), 1, g);
  stars(S, 40, -100, -100, 2020, wl - 60, { parent: g });
  S.fill(`M900 ${wl} Q1060 ${wl - 70} 1240 ${wl - 80} L2120 ${wl - 90} L2120 ${wl} Z`, S.start, 0, DS.mix(DS.P.navy[2], DS.P.ink[2], 0.3), 1, g);
  const LT = o.lights === true ? S.start : o.lights, lit = S.grp(g);
  [[1120, 70, 90], [1210, 60, 140], [1290, 80, 110], [1390, 70, 170], [1480, 90, 120], [1590, 60, 150], [1670, 80, 100], [1770, 90, 130]].forEach(([x, w, h], i) => {
    S.fill(rect(x, wl - 80 - h, w, h + 10), S.start, 0, DS.mix(DS.P.navy[2], DS.P.ink[2], 0.5), 1, g);
    for (let r = 0; r < Math.floor(h / 34); r++) for (let c = 0; c < Math.floor(w / 26); c++) if ((r * 3 + c + i) % 3) S.fill(rect(x + 8 + c * 26, wl - 70 - h + r * 34, 12, 16), S.start, 0, DS.c("yellow", 1), 1, lit);
  });
  [1000, 1180, 1360, 1540, 1720].forEach((x) => S.fill(circ(x, wl - 96, 60, 40), S.start, 0, DS.glow(DS.P.yellow[1], 0.6), 1, lit));
  for (let i = 0; i < 16; i++) S.fill(rect(1100 + i * 48, wl + 10 + (i % 4) * 22, 26, 6), S.start, 0, DS.c("yellow", 1), 0.6, lit);
  S.fill(`M1000 ${wl} L1820 ${wl} L1900 900 L760 900 Z`, S.start, 0, DS.c("yellow", 1), 0.06, lit);
  if (o.lights === undefined) lit.setAttribute("opacity", 0); else if (LT > S.start + 0.05) tl.fromTo(lit, { opacity: 0 }, { opacity: 1, duration: 0.6 }, LT);
  S.fill(rect(-200, wl, 2320, 1100), S.start, 0, DS.vgrad(DS.c("night", 1), DS.P.navy[2]), 1, g);
  g.appendChild(lit);
  S.draw(`M-200 ${wl} q 60 -8 120 0 t 120 0 t 120 0 t 120 0 t 120 0 t 120 0 t 120 0 t 120 0 t 120 0 t 120 0 t 120 0 t 120 0 t 120 0 t 120 0 t 120 0 t 120 0 t 120 0 t 120 0 t 120 0 t 120 0`, S.start, 0, { c: DS.c("glass", 1), w: DS.w.mid, op: 0.6, parent: g });
  S.fill(ridge(900, 40, 0.4), S.start, 0, DS.vgrad(DS.c("sand", 0, "far"), DS.mix(DS.P.sand[2], DS.P.navy[2], 0.6)), 1, g);
  return { g, wl };
};

// ---------- timing: one picture per beat, landing just after its first word (the 0.6 s crossfade covers the breath) ----------
const CUES = [[1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [7, 0], [8, 0], [9, 0], [11, 0], [12, 0],
  [13, 0], [14, 0], [15, 0], [16, 0], [17, 0], [19, 0], [20, 0], [21, 0], [22, 0], [23, 0], [24, 0], [26, 0], [27, 0], [28, 0], [29, 0], [30, 0], [31, 10], [32, 0], [33, 0], [34, 0], [35, 0], [37, 0], [39, 0], [40, 0], [41, 0],
  [42, 0], [44, 0], [45, 0], [46, 0], [48, 0], [49, 0], [51, 0], [52, 0], [53, 0], [55, 0], [56, 0], [56, 14], [57, 0], [59, 0],
  [60, 0], [61, 0], [63, 0], [64, 0], [66, 0], [68, 0], [69, 0], [70, 0], [71, 0], [72, 0], [73, 0], [75, 0],
  [77, 0], [78, 0], [79, 0], [81, 0], [82, 0], [83, 0], [85, 0], [86, 0], [87, 0], [89, 0], [90, 0], [91, 10], [94, 0], [96, 0], [98, 0],
  [99, 0], [100, 0], [101, 0], [102, 0], [103, 0], [104, 0], [105, 0], [106, 0], [107, 0], [108, 0], [110, 0], [111, 0], [113, 0], [115, 0], [116, 0], [117, 0], [118, 0]];
const WINS = sceneWindows(CUES, -0.25);
const sc = (c, w, o) => { const k = CUES.findIndex(([a, b]) => a === c && b === w); if (k < 0) throw new Error("no cue " + c + ":" + w); return scene(WINS[k][0], WINS[k][1], o); };

// ===================== 1. One night off =====================
// This is Dave. Dave has one job, every night: keep the night-light on.
{ const S = sc(1, 0, { cam: "push", focus: "900 560" }); bedroom(S);
  const F = dave(S, 760, 960, "near", { pose: "point", mood: "smile", look: 6 });
  bed(S, 1240, 1840, 960);
  DS.card(S, "DAVE", 470, 640, { size: DS.type.body, t: W(1, 2) });
  DS.card(S, "ONE JOB: THE NIGHT-LIGHT", 960, 120, { size: DS.type.body, t: W(1, 6) });
  DS.vignette(S, 0.18); }

// The night-light is the Moon. It's been on for four and a half billion years.
{ const S = sc(2, 0, { cam: "pull" }); const O = land(S, { hy: 760, moon: [1240, 330, 150] });
  house(S, 560, 830, 1.0);
  DS.card(S, "THE NIGHT-LIGHT", 1240, 110, { size: DS.type.body, t: W(2, 1) });
  DS.card(S, "ON FOR 4.5 BILLION YEARS", 1240, 600, { size: DS.type.small, t: W(2, 9) });
  DS.vignette(S, 0.16); }

// Well, most nights. It takes a few nights off each month. Dave has noticed.
{ const S = sc(3, 0, { cam: "push", focus: "1000 420" }); land(S, { hy: 820, stars: 60 });
  const F = [1, 0.75, 0.5, 0.25, 0, 0.25, 0.5, 0.75, 1], X = (i) => 200 + i * 190;
  F.forEach((f, i) => phase(S, X(i), 400, 70, f, i < 4, i ? W(3, 3) + i * 0.08 : S.start));
  S.draw(rrect(X(4) - 110, 290, 220, 220, DS.r.lg), W(3, 6), 0, { c: DS.c("red"), w: DS.w.near });
  DS.card(S, "A FEW NIGHTS OFF", X(4), 600, { size: DS.type.small, t: W(3, 6) });
  const D = dave(S, 1560, 960, "near", { pose: "cross", mood: "flat", look: -8 });
  D.face(W(3, 12), "determined", -8);
  DS.card(S, "DAVE HAS NOTICED", 1560, 520, { size: DS.type.small, t: W(3, 12) });
  DS.vignette(S, 0.16); }

// Tonight, Dave wants one night off too. Twelve hours of proper dark.
{ const S = sc(4, 0, { cam: "push", focus: "860 600" }); bedroom(S);
  const F = dave(S, 760, 960, "near", { pose: "armsUp", mood: "happy", look: 0 }); mask(S, F, W(4, 3));
  bed(S, 1240, 1840, 960);
  DS.card(S, "ONE NIGHT OFF", 400, 660, { size: DS.type.body, t: W(4, 3) });
  DS.card(S, "12 HOURS OF PROPER DARK", 960, 120, { size: DS.type.body, t: W(4, 7), tc: "red" });
  DS.vignette(S, 0.18); }

// The switch has two settings, on and gone. / And Dave, being Dave, picks gone.
{ const S = sc(5, 0, { cam: "zoom", focus: "470 560" }); wallCU(S, { state: "on", flip: W(6, 5), light: true });
  DS.card(S, "TWO SETTINGS", 470, 860, { size: DS.type.small, t: W(5, 2) });
  ring(S, 380, 690, 180, 80, W(6, 5));
  DS.vignette(S, 0.18); }

// So what if the Moon disappeared? Not dimmed, not behind a cloud. Gone, gravity and all.
{ const S = sc(7, 0, { cam: "push", focus: "1000 560" }); space(S);
  earth(S, 620, 600, 230, { night: true, nightA: 0 });
  const M = S.grp(), mg = moon(S, 1380, 520, 90, { parent: M });
  [150, 210, 270].forEach((r) => dashed(S.draw(circ(1380, 520, r), S.start, 0, { c: DS.c("sky", 1), w: DS.w.detail, op: 0.5, parent: M }), 0.012, 0.02));
  tl.to(mg, { opacity: 0.3, duration: 0.3 }, W(7, 6)); tl.to(mg, { opacity: 1, duration: 0.3 }, W(7, 8));
  xMark(S, 1530, 380, 0.6, W(7, 7));
  const cl = S.grp(); S.cloud(1380, 540, 1.0, S.start, 0, { fill: DS.c("gray", 1), parent: cl }); tl.fromTo(cl, { x: 420, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5 }, W(7, 8)); xMark(S, 1600, 470, 0.6, W(7, 11));
  S.fadeOut(M, W(7, 12), 0.5); S.fadeOut(cl, W(7, 12), 0.5); ghost(S, 1380, 520, 90, W(7, 12) + 0.3);
  DS.card(S, "WHAT IF THE MOON DISAPPEARED?", 960, 120, { size: DS.type.body, t: W(7, 1) });
  DS.card(S, "GONE, GRAVITY AND ALL", 1380, 760, { size: DS.type.small, t: W(7, 12), tc: "red" });
  DS.vignette(S, 0.2); }

// Would anything on Earth change, apart from the dark?
{ const S = sc(8, 0, { cam: "zoom", focus: "800 560" }); space(S);
  earth(S, 800, 560, 330, { night: true, nightA: 0 });
  ghost(S, 1560, 300, 70);
  S.text("?", 1430, 640, { size: DS.type.display, t: W(8, 1), c: DS.c("yellow", 1) });
  DS.card(S, "WOULD ANYTHING CHANGE?", 960, 120, { size: DS.type.body, t: W(8, 1) });
  DS.card(S, "APART FROM THE DARK?", 1430, 820, { size: DS.type.small, t: W(8, 5), tc: "red" });
  DS.vignette(S, 0.2); }

// "It's a lamp. How much can one lamp do?" // Taped beside the switch is the Moon's job list. Dave has never read it.
{ const S = sc(9, 0, { cam: "none" }); const R = bedroom(S, { moon: false });
  const F = dave(S, 900, 800, "mid", { pose: "cross", mood: "smile", look: -6 });
  bed(S, 1240, 1840, 960);
  say(S, 560, 330, 240, 120, 850, 470, ["IT'S A LAMP.", "HOW MUCH CAN", "ONE LAMP DO?"], S.start);
  S.zoom(1130, 500, 1.9, W(10, 0), 1.2);
  ring(S, R.K.lx - 16, R.K.ly - 16, R.K.lw + 32, R.K.lh + 32, W(10, 3));
  DS.card(S, "THE MOON'S JOB LIST", 1180, 340, { size: DS.type.caption, t: W(10, 5) });
  DS.card(S, "NEVER READ IT", 1180, 690, { size: DS.type.caption, t: W(10, 10), tc: "red" });
  DS.vignette(S, 0.18); }

// Tonight he reads it one line at a time, as each job stops getting done:
{ const S = sc(11, 0, { cam: "zoom", focus: "1260 480" }); wallCU(S, { state: "gone" });
  DS.card(S, "ONE LINE AT A TIME", 470, 870, { size: DS.type.small, t: W(11, 4) });
  DS.vignette(S, 0.18); }

// the night, the tides, the length of your day, and maybe the seasons.
{ const S = sc(12, 0, { cam: "push" }); space(S);
  const P = [[330, W(12, 1), "THE NIGHT"], [750, W(12, 3), "THE TIDES"], [1170, W(12, 5), "YOUR DAY"], [1590, W(12, 12), "SEASONS"]];
  P.forEach(([x, t, s], i) => {
    panel(S, x, 520, 340, 420, t);
    if (i === 0) { S.fill(circ(x, 470, 110), t, 0, DS.c("navy", 0), 1); moon(S, x + 20, 450, 52, { t, glow: false }); }
    if (i === 1) { DS.shape(S, `M${x - 130} 470 Q${x - 65} 380 ${x} 470 T${x + 130} 470 L${x + 130} 560 L${x - 130} 560 Z`, "blue", { t }); }
    if (i === 2) { DS.shape(S, circ(x, 470, 100), "white", { t }); S.draw(rays(x, 470, 80, 94, 12, -Math.PI / 2), t, 0, { c: DS.c("ink"), w: DS.w.detail }); S.draw(`M${x} 470 L${x} 400 M${x} 470 L${x + 50} 470`, t, 0, { c: DS.c("ink"), w: DS.w.near }); }
    if (i === 3) { DS.shape(S, `M${x - 10} 560 L${x - 10} 470 L${x + 10} 470 L${x + 10} 560 Z`, "wood", { t, w: "detail" }); DS.shape(S, `M${x} 330 A100 100 0 0 0 ${x} 530 Z`, "grass", { t }); DS.shape(S, `M${x} 330 A100 100 0 0 1 ${x} 530 Z`, "white", { t }); }
    S.text(s, x, 680, { size: DS.type.small, t, c: DS.c("ink") });
  });
  S.text("MAYBE", 1590, 280, { size: DS.type.small, t: W(12, 10), c: DS.c("red", 1) });
  DS.vignette(S, 0.2); }

// ===================== 2. Job one: the night-light =====================
// Line one is the job printed on the label: night-light.
{ const S = sc(13, 0, { cam: "zoom", focus: "800 340" }); wallCU(S, { state: "gone", read: 1, lineT: W(13, 9), ring: 0, ringT: W(13, 9) });
  ring(S, 284, 238, 372, 88, W(13, 8));
  S.arrow(660, 300, 812, 318, W(13, 9), 0, { c: DS.c("red"), w: DS.w.near, bend: -0.2 });
  DS.vignette(S, 0.18); }

// A full moon lights the ground roughly a hundred times brighter than a clear, moonless sky.
{ const S = sc(14, 0, { cam: "push" });
  const L = clipG(S, rect(-200, -200, 1160, 1480)), R = clipG(S, rect(960, -200, 1160, 1480));
  land(S, { parent: L, hy: 720, moon: [440, 260, 110] }); land(S, { parent: R, hy: 720, pal: MOONLESS(), ph: 0.7 });
  const tree = (P, x, c) => { const g = S.grp(P); S.fill(rect(x - 12, 600, 24, 200), S.start, 0, c, 1, g); [[0, 560, 110, 90], [-60, 610, 70, 60], [60, 600, 80, 64]].forEach(([dx, y, rx, ry]) => S.fill(circ(x + dx, y, rx, ry), S.start, 0, c, 1, g)); };
  tree(L, 700, DS.c("green", 2, "mid")); tree(R, 1660, DS.mix(DS.P.navy[2], DS.P.ink[2], 0.5));
  S.fill(`M260 1080 L460 760 L500 760 L760 1080 Z`, S.start, 0, DS.c("sand", 1, "mid"), 0.55, L);
  S.fill(`M1220 1080 L1420 760 L1460 760 L1720 1080 Z`, S.start, 0, DS.c("sand", 2, "far"), 0.12, R);
  S.divider(960, S.start);
  S.text("FULL MOON", 480, 110, { size: DS.type.small, c: DS.P.white[0] });
  S.text("CLEAR, MOONLESS SKY", 1440, 110, { size: DS.type.small, c: DS.P.white[0] });
  DS.card(S, "ROUGHLY 100× BRIGHTER", 480, 880, { size: DS.type.body, t: W(14, 8) });
  DS.vignette(S, 0.16); }

// Without the Moon, every night is a new-moon night. Every single one, forever.
{ const S = sc(15, 0, { cam: "pull" }); land(S, { hy: 800, pal: MOONLESS(), milky: [-100, 700, 2000, 80], stars: 110 });
  ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].forEach((d, i) => { const x = 330 + i * 210, t = i ? W(15, 3) + i * 0.32 : S.start;
    panel(S, x, 420, 170, 210, t); phase(S, x, 400, 52, 0, false, t); S.text(d, x, 500, { size: DS.type.caption, t, c: DS.c("ink") }); });
  DS.card(S, "EVERY NIGHT: A NEW MOON", 960, 140, { size: DS.type.body, t: W(15, 3) });
  DS.card(S, "FOREVER", 960, 680, { size: DS.type.title, t: W(15, 12), tc: "red" });
  DS.vignette(S, 0.16); }

// Dave sleeps beautifully. A dung beetle in Africa does not.
{ const S = sc(16, 0, { cam: "push", focus: "1300 700" }); bedroom(S, { moon: false });
  const top = bed(S, 1180, 1840, 960); sleeper(S, 1840, top);
  zzz(S, 1640, 640, W(16, 1));
  DS.card(S, "SLEEPS BEAUTIFULLY", 1460, 470, { size: DS.type.small, t: W(16, 1), tc: "green" });
  const I = S.grp(), t = W(16, 3), ix = 140, iy = 560, iw = 760, ih = 360;
  DS.drop(S, rrect(ix + 10, iy + 14, iw, ih, DS.r.lg), { t, parent: I });
  const C = clipG(S, rrect(ix, iy, iw, ih, DS.r.lg), I);
  S.fill(rect(ix, iy, iw, ih), S.start, 0, DS.vgrad(DS.P.ink[2], DS.P.navy[2]), 1, C);
  stars(S, 30, ix, iy, ix + iw, iy + ih - 120, { parent: C });
  S.fill(ridge(iy + ih - 90, 20, 1.0, ix - 40, ix + iw + 40), S.start, 0, DS.mix(DS.P.navy[2], DS.P.ink[2], 0.3), 1, C);
  beetle(S, ix + 360, iy + ih - 40, 0.95, { parent: C, eye: "worried" });
  S.draw(rrect(ix, iy, iw, ih, DS.r.lg), S.start, 0, { c: DS.P.white[0], w: DS.w.near, parent: I });
  if (t > S.start) tl.fromTo(I, { opacity: 0 }, { opacity: 1, duration: 0.35 }, t);
  DS.card(S, "A DUNG BEETLE IN AFRICA", ix + iw / 2, iy - 50, { size: DS.type.small, t });
  DS.vignette(S, 0.18); }

// It has just made a ball of dung, / and it has to roll it away in a straight line before the neighbours steal it.
{ const S = sc(17, 0, { cam: "push", focus: "960 760" }); savanna(S, { moon: [1560, 220, 80] });
  dungPile(S, 360, 930, 1.0);
  const B = beetle(S, 620, 910, 1.1, { t: W(17, 5) });
  dashed(S.draw(line([700, 918], [1820, 918], 0), W(18, 9), 0, { c: DS.P.white[0], w: DS.w.mid, op: 0.8 }), 0.02, 0.015);
  roll(S, B, W(18, 4), S.end - W(18, 4) - 0.2, 560);
  [[250, 830, 0.55], [430, 815, 0.5]].forEach(([x, y, k]) => beetle(S, x, y, k, { t: W(18, 13) }));
  DS.card(S, "A BALL OF DUNG", 1000, 560, { size: DS.type.small, t: W(17, 5) });
  DS.card(S, "A STRAIGHT LINE", 1420, 800, { size: DS.type.small, t: W(18, 9) });
  DS.card(S, "THE NEIGHBOURS", 360, 640, { size: DS.type.small, t: W(18, 13), tc: "red" });
  DS.vignette(S, 0.16); }

// In two thousand three, Marie Dacke's team at Lund University found one species that steers by moonlight.
{ const S = sc(19, 0, { cam: "zoom", focus: "960 640" }); savanna(S, { moon: [640, 300, 100], tree: 1650 });
  dashed(S.draw(line([690, 400], [930, 800], 0), W(19, 14), 0, { c: DS.c("yellow", 1), w: DS.w.mid }), 0.03, 0.02);
  beetle(S, 960, 900, 1.3, { eye: "up" });
  DS.card(S, "2003 · MARIE DACKE'S TEAM", 960, 110, { size: DS.type.body, t: W(19, 1) });
  DS.card(S, "LUND UNIVERSITY", 1380, 230, { size: DS.type.small, t: W(19, 8) });
  DS.card(S, "STEERS BY MOONLIGHT", 1360, 640, { size: DS.type.small, t: W(19, 14), tc: "red" });
  DS.vignette(S, 0.16); }

// Not by the Moon itself, but by the faint pattern of polarised light it spreads across the sky.
{ const S = sc(20, 0, { cam: "pull", focus: "960 420" }); land(S, { hy: 860, stars: 50 });
  moon(S, 960, 400, 70);
  polar(S, 960, 400, W(20, 8), { len: 20 });
  beetle(S, 900, 900, 0.9, { eye: "up" });
  DS.card(S, "NOT THE MOON ITSELF", 960, 120, { size: DS.type.body, t: W(20, 0) });
  DS.card(S, "A FAINT PATTERN OF POLARISED LIGHT", 960, 690, { size: DS.type.small, t: W(20, 9) });
  DS.vignette(S, 0.16); }

// That pattern is a million times dimmer than the Sun's. The beetle reads it anyway.
{ const S = sc(21, 0, { cam: "push" });
  const L = clipG(S, rect(-200, -200, 1160, 1480)), R = clipG(S, rect(960, -200, 1160, 1480));
  S.fill(rect(-200, -200, 1160, 1480), S.start, 0, DS.vgrad(DS.P.sky[2], DS.P.sky[1]), 1, L);
  sun(S, 480, 380, 70, { parent: L }); polar(S, 480, 380, S.start, { c: DS.c("blue", 2), w: DS.w.near, op: 0.9, rings: [150, 240, 340, 450] }).setAttribute("opacity", 1);
  land(S, { parent: R, hy: 900, stars: 40 }); moon(S, 1440, 380, 60, { parent: R }); polar(S, 1440, 380, S.start, { op: 0.35, rings: [150, 240, 340, 450] });
  S.divider(960, S.start);
  S.text("THE SUN'S PATTERN", 480, 180, { size: DS.type.small, c: DS.c("ink") });
  S.text("THE MOON'S PATTERN", 1440, 180, { size: DS.type.small, c: DS.P.white[0] });
  DS.card(S, "A MILLION TIMES DIMMER", 960, 560, { size: DS.type.body, t: W(21, 3), tc: "red" });
  beetle(S, 1400, 920, 1.1, { eye: "up", glasses: W(21, 12), t: W(21, 11) });
  DS.card(S, "READS IT ANYWAY", 1440, 690, { size: DS.type.small, t: W(21, 12) });
  DS.vignette(S, 0.16); }

// So no Moon means no straight line, and no dinner?
{ const S = sc(22, 0, { cam: "push", focus: "960 760" }); savanna(S, { pal: MOONLESS() });
  ghost(S, 1500, 240, 80);
  dungPile(S, 300, 930, 1.0);
  dashed(S.draw(smooth([[420, 920], [600, 900], [700, 960], [620, 1010], [560, 940], [760, 880], [940, 940], [880, 1000], [820, 940], [1000, 910]]), W(22, 4), 0, { c: DS.P.white[0], w: DS.w.mid, op: 0.8 }), 0.012, 0.01);
  beetle(S, 1080, 900, 1.1, { eye: "worried" });
  DS.card(S, "NO STRAIGHT LINE?", 1100, 600, { size: DS.type.small, t: W(22, 4) });
  DS.card(S, "NO DINNER?", 1500, 760, { size: DS.type.body, t: W(22, 8), tc: "red" });
  DS.vignette(S, 0.18); }

// In twenty thirteen, the same team put beetles in a planetarium with no Moon at all.
{ const S = sc(23, 0, { cam: "pull" }); planetarium(S);
  beetle(S, 820, 880, 1.0, { eye: "up" });
  DS.card(S, "2013 · THE SAME TEAM", 960, 120, { size: DS.type.body, t: W(23, 1) });
  DS.card(S, "A PLANETARIUM WITH NO MOON", 960, 520, { size: DS.type.small, t: W(23, 9) });
  DS.vignette(S, 0.18); }

// They still rolled straight. They were steering by the Milky Way. // The dung beetle has a backup galaxy.
{ const S = sc(24, 0, { cam: "push", focus: "960 500" }); planetarium(S, { milky: W(24, 9) });
  const B = beetle(S, 560, 880, 1.0, { eye: "up" });
  dashed(S.draw(line([640, 888], [1440, 888], 0), W(24, 2), 0, { c: DS.c("brown", 2), w: DS.w.mid }), 0.02, 0.015);
  roll(S, B, W(24, 1), 3.2, 640);
  DS.card(S, "STILL ROLLED STRAIGHT", 960, 120, { size: DS.type.body, t: W(24, 1) });
  DS.card(S, "THE MILKY WAY", 1360, 330, { size: DS.type.small, t: W(24, 9) });
  DS.card(S, "A BACKUP GALAXY", 660, 600, { size: DS.type.body, t: W(25, 4), tc: "green" });
  DS.vignette(S, 0.18); }

// Baby leatherback turtles hatch at night and crawl toward the brighter horizon, the one over the sea.
{ const S = sc(26, 0, { cam: "push", focus: "960 560" }); beach(S, { moon: [1300, 230, 70] });
  nest(S, 760, 930);
  [[700, 900, -20], [790, 880, 10], [860, 910, 30], [650, 940, -35], [900, 950, 18]].forEach(([x, y, a], i) => crawl(turtle(S, x, y, 0.9, a, { t: W(26, 3) + i * 0.1 }), W(26, 7), S.end - W(26, 7), 240 + i * 40, -170 - i * 12));
  S.arrow(1200, 760, 1290, 470, W(26, 10), 0, { c: DS.c("yellow", 1), w: DS.w.near, bend: 0.15 });
  DS.card(S, "BABY LEATHERBACKS", 420, 880, { size: DS.type.small, t: W(26, 1) });
  DS.card(S, "THE BRIGHTER HORIZON", 1500, 340, { size: DS.type.small, t: W(26, 10) });
  DS.vignette(S, 0.16); }

// In twenty twenty-two, Samantha Trail and Michael Salmon found that on dark new-moon nights, they stop and circle more.
{ const S = sc(27, 0, { cam: "zoom", focus: "960 780" }); beach(S, { pal: MOONLESS() });
  [[520, 840, 0], [980, 800, 1], [1400, 860, 2]].forEach(([x, y, i]) => {
    dashed(S.draw(circ(x, y + 10, 80, 46), S.start, 0, { c: DS.P.white[0], w: DS.w.detail, op: 0.6 }), 0.02, 0.015);
    const G = S.grp(); turtle(S, x + 80, y + 10, 0.85, 0, { parent: G }); spin(G, x, y + 10, W(27, 15), S.end - W(27, 15), -200 - i * 40);
  });
  DS.card(S, "2022 · SAMANTHA TRAIL & MICHAEL SALMON", 960, 110, { size: DS.type.small, t: W(27, 3) });
  DS.card(S, "DARK NEW-MOON NIGHTS", 960, 300, { size: DS.type.small, t: W(27, 11) });
  DS.card(S, "THEY STOP AND CIRCLE MORE", 960, 640, { size: DS.type.small, t: W(27, 15), tc: "red" });
  DS.vignette(S, 0.18); }

// Then they reach the sea anyway, just with a few extra laps.
{ const S = sc(28, 0, { cam: "push", focus: "960 600" }); const B = beach(S, { pal: MOONLESS() });
  [[420, 0], [880, 1], [1340, 2]].forEach(([x, i]) => {
    dashed(S.draw(smooth([[x - 40, 1000], [x + 30, 900], [x - 50, 840], [x - 100, 900], [x, 940], [x + 60, 820], [x + 20, 740], [x + 40, 680]]), S.start, 0, { c: DS.P.white[0], w: DS.w.detail, op: 0.6 }), 0.015, 0.012);
    crawl(turtle(S, x + 40, 690, 0.85, 8), S.start, S.len, 6, -40); });
  S.draw(`M-200 ${B.sh - 6} q 80 -14 160 0 t 160 0 t 160 0 t 160 0 t 160 0 t 160 0 t 160 0 t 160 0 t 160 0 t 160 0 t 160 0 t 160 0 t 160 0 t 160 0 t 160 0`, S.start, 0, { c: DS.P.white[0], w: DS.w.near, op: 0.85 });
  DS.card(S, "THEY REACH THE SEA ANYWAY", 960, 160, { size: DS.type.body, t: W(28, 2), tc: "green" });
  DS.card(S, "JUST A FEW EXTRA LAPS", 1300, 840, { size: DS.type.small, t: W(28, 9) });
  DS.vignette(S, 0.18); }

// So far, Dave is right. It really is just a lamp.
{ const S = sc(29, 0, { cam: "push", focus: "800 620" }); bedroom(S, { moon: false });
  dave(S, 760, 960, "near", { pose: "cross", mood: "smile", look: 6 });
  bed(S, 1240, 1840, 960);
  DS.card(S, "SO FAR, DAVE IS RIGHT", 960, 120, { size: DS.type.body, t: W(29, 0) });
  DS.card(S, "JUST A LAMP", 420, 650, { size: DS.type.body, t: W(29, 8), tc: "green" });
  DS.vignette(S, 0.18); }

// Then there are the corals, and corals keep a calendar. / Once a year, a few nights after a full moon,
{ const S = sc(30, 0, { cam: "push", focus: "1200 460" }); reef(S, { mx: 400 });
  coral(S, 320, 900, 1.0, "branch", "pink"); coral(S, 640, 920, 0.9, "brain", "orange"); coral(S, 860, 900, 0.8, "fan", "purple");
  const C = cal(S, 1010, 180, 7, 2, 110, 140, { t: W(30, 9), title: "THE CORALS' CALENDAR" });
  const F = [1, 0.85, 0.7, 0.55, 0.4, 0.25, 0.1, 0, 0.12, 0.25, 0.4, 0.55, 0.7, 0.85];
  C.cells.forEach(([x, y], i) => phase(S, x, y, 36, F[i], i < 7, W(30, 9)));
  S.draw(circ(C.cells[0][0], C.cells[0][1], 52), W(31, 3), 0, { c: DS.c("gold", 1), w: DS.w.near });
  S.draw(circ(C.cells[4][0], C.cells[4][1], 52), W(31, 6), 0, { c: DS.c("red"), w: DS.w.near });
  S.arrow(C.cells[0][0] + 30, C.cells[0][1] - 60, C.cells[4][0] - 20, C.cells[4][1] - 62, W(31, 6), 0, { c: DS.c("red"), w: DS.w.mid, bend: -0.25 });
  DS.card(S, "CORALS KEEP A CALENDAR", 960, 100, { size: DS.type.body, t: W(30, 6) });
  DS.card(S, "ONCE A YEAR, A FEW NIGHTS AFTER FULL MOON", 1290, 600, { size: DS.type.caption, t: W(31, 0) });
  DS.vignette(S, 0.18); }

// whole reefs release their eggs and sperm on the same night.
{ const S = sc(31, 10, { cam: "pull", focus: "960 600" }); reef(S, { mx: 900 });
  [[200, 900, 0.9, "branch", "pink"], [470, 920, 0.8, "brain", "orange"], [700, 900, 0.9, "fan", "purple"], [980, 910, 1.0, "branch", "gold"], [1260, 920, 0.9, "brain", "pink"], [1500, 900, 0.85, "branch", "orange"], [1740, 920, 0.8, "fan", "red"]].forEach(([x, y, k, kind, n], i) => {
    coral(S, x, y, k, kind, n); spawn(S, x, y - 160 * k, 16, W(31, 12) + i * 0.06); });
  DS.card(S, "WHOLE REEFS, THE SAME NIGHT", 960, 120, { size: DS.type.body, t: W(31, 18) });
  DS.vignette(S, 0.18); }

// In twenty twenty-one, Che-Hung Lin's team in Taiwan shaded corals from the moonlight.
const shade = (S, x, gy, w, h, t) => { const g = S.grp(); [x - w / 2, x + w / 2].forEach((px) => DS.shape(S, rect(px - 8, gy - h, 16, h), "gray", { t, tone: 2, w: "detail", parent: g })); DS.shape(S, rrect(x - w / 2 - 30, gy - h - 24, w + 60, 40, DS.r.xs), "ink", { t, tone: 1, w: "detail", parent: g }); for (let i = 0; i < 9; i++) S.draw(line([x - w / 2 - 20 + i * ((w + 40) / 8), gy - h - 20], [x - w / 2 - 20 + i * ((w + 40) / 8), gy - h + 12], 0), t ?? S.start, 0, { c: DS.c("gray", 1), w: DS.w.hair, parent: g }); S.fill(`M${x - w / 2 - 30} ${gy - h + 16} L${x + w / 2 + 30} ${gy - h + 16} L${x + w / 2 + 60} ${gy} L${x - w / 2 - 60} ${gy} Z`, t ?? S.start, 0, DS.P.ink[0], 0.3, g); return g; };
{ const S = sc(32, 0, { cam: "push", focus: "960 640" }); reef(S, { mx: 1500 });
  coral(S, 560, 900, 0.9, "brain", "orange"); coral(S, 1000, 910, 0.9, "brain", "pink"); coral(S, 1420, 900, 0.9, "brain", "gold");
  shade(S, 1000, 910, 300, 300, W(32, 8));
  DS.card(S, "2021 · CHE-HUNG LIN'S TEAM", 960, 110, { size: DS.type.body, t: W(32, 1) });
  DS.card(S, "TAIWAN", 420, 300, { size: DS.type.small, t: W(32, 7) });
  DS.card(S, "SHADED FROM THE MOONLIGHT", 1000, 480, { size: DS.type.small, t: W(32, 9) });
  DS.vignette(S, 0.18); }

// Every time, they spawned five days after the shade went on, whatever the Moon was doing.
{ const S = sc(33, 0, { cam: "zoom", focus: "1000 600" }); reef(S, { mx: 1500 });
  coral(S, 1000, 910, 1.0, "brain", "pink"); shade(S, 1000, 910, 320, 320);
  panel(S, 470, 420, 460, 300, S.start);
  S.text("DAYS IN THE SHADE", 470, 330, { size: DS.type.caption, c: DS.c("ink") });
  swap(S, [[S.start, "1"], [S.start + 0.5, "2"], [S.start + 1.0, "3"], [S.start + 1.5, "4"], [W(33, 4), "5"]], 470, 500, { c: DS.c("red", 2) });
  spawn(S, 1000, 760, 22, W(33, 5), { spread: 220, rise: 260 });
  DS.card(S, "5 DAYS AFTER THE SHADE", 1000, 120, { size: DS.type.body, t: W(33, 4), tc: "red" });
  DS.card(S, "WHATEVER THE MOON WAS DOING", 1300, 300, { size: DS.type.small, t: W(33, 11) });
  DS.vignette(S, 0.18); }

// The trigger isn't the full moon. It's the dark gap after sunset, before a late moon rises.
{ const S = sc(34, 0, { cam: "push", focus: "960 560" }); DS.setHaze("night");
  S.fill(rect(-200, -200, 2320, 1480), S.start, 0, hgrad(DS.c("dusk", 2), DS.P.navy[2]), 1);
  stars(S, 50, 900, -100, 2020, 600);
  const sk = clipG(S, rect(-200, -200, 2320, 840));
  sun(S, 260, 640, 90, { parent: sk });
  const M = S.grp(sk); moon(S, 1640, 700, 70, { parent: M }); tl.fromTo(M, { y: 120 }, { y: -40, duration: 1.4, ease: "power1.out" }, W(34, 11));
  S.fill(rect(-200, 640, 2320, 700), S.start, 0, DS.vgrad(DS.c("night", 2), DS.P.navy[2]), 1);
  [[260, "SUNSET", S.start], [1640, "MOONRISE", W(34, 14)]].forEach(([x, s, t]) => { S.draw(line([x, 300], [x, 380], 0), t, 0, { c: DS.P.white[0], w: DS.w.mid }); S.text(s, x, 450, { size: DS.type.caption, t, c: DS.P.white[0] }); });
  S.draw(line([260, 340], [1640, 340], 0), W(34, 8), 0, { c: DS.c("yellow", 1), w: DS.w.near });
  DS.card(S, "THE TRIGGER: NOT THE FULL MOON", 960, 110, { size: DS.type.small, t: W(34, 1) });
  DS.card(S, "THE DARK GAP", 950, 250, { size: DS.type.body, t: W(34, 8), tc: "red" });
  DS.vignette(S, 0.16); }

// Their starting signal is the Moon running late. // With no Moon at all, the Moon is late every single night.
const clock = (S, cx, cy, r, h, m, o = {}) => { const g = S.grp(o.parent), t = o.t, ha = ((h % 12) + m / 60) * 30 - 90, ma = m * 6 - 90, rd = (a) => (a * Math.PI) / 180;
  DS.shape(S, circ(cx, cy, r), "white", { t, parent: g }); S.draw(rays(cx, cy, r * 0.8, r * 0.92, 12, -Math.PI / 2), t ?? S.start, 0, { c: DS.c("ink"), w: DS.w.detail, parent: g });
  const mh = S.grp(g), hh = S.grp(g);
  S.draw(line([cx, cy], [cx + Math.cos(rd(ma)) * r * 0.72, cy + Math.sin(rd(ma)) * r * 0.72], 0), t ?? S.start, 0, { c: DS.c("ink"), w: DS.w.mid, parent: mh });
  S.draw(line([cx, cy], [cx + Math.cos(rd(ha)) * r * 0.46, cy + Math.sin(rd(ha)) * r * 0.46], 0), t ?? S.start, 0, { c: DS.c("ink"), w: DS.w.near, parent: hh });
  S.fill(circ(cx, cy, r * 0.06), t ?? S.start, 0, DS.c("ink"), 1, g);
  if (o.spin !== undefined) { spin(mh, cx, cy, o.spin, o.dur || 2, 360 * (o.turns || 3)); spin(hh, cx, cy, o.spin, o.dur || 2, 30 * (o.turns || 3)); }
  return g; };
{ const S = sc(35, 0, { cam: "push", focus: "1200 600" }); land(S, { hy: 760, stars: 70 });
  const M = S.grp(); moon(S, 1440, 700, 80, { parent: M }); tl.fromTo(M, { y: 60 }, { y: 0, duration: 2, ease: "power1.out" }, S.start);
  S.fill(ridge(800, 30, 2.4), S.start, 0, DS.P.navy[1], 1);
  S.fadeOut(M, W(36, 1), 0.6); ghost(S, 1440, 640, 80, W(36, 2));
  clock(S, 480, 520, 150, 9, 40, { spin: W(36, 6), dur: 2.4, turns: 4 });
  DS.card(S, "THE STARTING SIGNAL", 960, 110, { size: DS.type.body, t: W(35, 1) });
  DS.card(S, "THE MOON RUNNING LATE", 1440, 470, { size: DS.type.small, t: W(35, 5) });
  DS.card(S, "LATE EVERY SINGLE NIGHT", 480, 790, { size: DS.type.small, t: W(36, 8), tc: "red" });
  DS.vignette(S, 0.16); }

// Nobody knows exactly what the reefs would do. / But on reefs lit by our own coastal lights,
{ const S = sc(37, 0, { cam: "pull", focus: "1100 500" }); coastReef(S, { lights: W(38, 6) });
  coral(S, 400, 900, 0.8, "branch", "pink"); coral(S, 700, 920, 0.7, "brain", "orange"); coral(S, 1300, 910, 0.8, "fan", "purple"); coral(S, 1600, 920, 0.7, "brain", "gold");
  [[420, 640], [720, 700], [1320, 600], [1620, 700]].forEach(([x, y], i) => S.text("?", x, y, { size: DS.type.title, t: W(37, 1) + i * 0.1, c: DS.P.white[0] }));
  DS.card(S, "NOBODY KNOWS EXACTLY", 520, 200, { size: DS.type.body, t: W(37, 0) });
  DS.card(S, "OUR OWN COASTAL LIGHTS", 1450, 120, { size: DS.type.small, t: W(38, 6) });
  DS.vignette(S, 0.18); }

// Thomas Davies' team found corals already spawning one to three days early.
{ const S = sc(39, 0, { cam: "push", focus: "960 600" }); coastReef(S, { lights: true });
  coral(S, 1300, 910, 0.9, "brain", "pink"); coral(S, 1600, 920, 0.8, "branch", "orange"); spawn(S, 1300, 780, 14, W(39, 6), { rise: 160 }); spawn(S, 1600, 700, 14, W(39, 6) + 0.2, { rise: 120 });
  const C = cal(S, 160, 470, 7, 1, 110, 130, { t: W(39, 3), title: "SPAWNING NIGHTS" });
  C.cells.forEach(([x, y], i) => S.text(String(i + 1), x, y + 18, { size: DS.type.small, t: W(39, 3), c: DS.c("ink") }));
  [1, 2, 3].forEach((i) => S.draw(circ(C.cells[i][0], C.cells[i][1], 44), W(39, 7) + i * 0.15, 0, { c: DS.c("red"), w: DS.w.near }));
  S.draw(circ(C.cells[4][0], C.cells[4][1], 44), W(39, 3), 0, { c: DS.c("green"), w: DS.w.near });
  S.text("USUAL", C.cells[4][0], 720, { size: DS.type.caption, t: W(39, 3), c: DS.P.white[0] });
  DS.card(S, "THOMAS DAVIES' TEAM", 520, 120, { size: DS.type.body, t: W(39, 0) });
  DS.card(S, "1–3 DAYS EARLY", 520, 830, { size: DS.type.body, t: W(39, 7), tc: "red" });
  DS.vignette(S, 0.18); }

// Spawn out of step, and fewer eggs may get fertilised.
{ const S = sc(40, 0, { cam: "push", focus: "960 600" }); reef(S, { mx: 960 });
  coral(S, 420, 900, 1.0, "brain", "pink"); coral(S, 1500, 900, 1.0, "brain", "orange");
  spawn(S, 420, 760, 18, S.start + 0.2, { rise: 300 }); spawn(S, 1500, 760, 18, W(40, 5), { rise: 160 });
  S.text("NIGHT 1", 420, 930, { size: DS.type.caption, c: DS.P.white[0] }); S.text("NIGHT 3", 1500, 930, { size: DS.type.caption, c: DS.P.white[0] });
  DS.card(S, "OUT OF STEP", 960, 120, { size: DS.type.body, t: W(40, 1) });
  DS.card(S, "FEWER EGGS MAY GET FERTILISED", 960, 600, { size: DS.type.small, t: W(40, 5), tc: "red" });
  DS.vignette(S, 0.18); }

// Dave adds a line to the job list, in pencil: reef calendar.
{ const S = sc(41, 0, { cam: "zoom", focus: "1100 420" }); wallCU(S, { state: "gone", read: 1, reef: W(41, 10), ring: "reef", ringT: W(41, 11) });
  const P = pencil(S, 1310, 430, 1.0, 110, W(41, 1)); tl.fromTo(wrapG(P), { x: -440 }, { x: 0, duration: 1.0, ease: "power1.inOut" }, W(41, 10));
  DS.card(S, "IN PENCIL", 470, 870, { size: DS.type.small, t: W(41, 8) });
  DS.vignette(S, 0.18); }

// ===================== 3. Job two: the tides =====================
// morning beach, looking out to sea; returns the y of the usual tide line
const dawnBeach = (S, o = {}) => {
  DS.setHaze("dusk");
  const hz = 400, g = S.grp();
  S.fill(rect(-200, -200, 2320, hz + 200), S.start, 0, DS.vgrad(DS.c("sky", 0), DS.c("dusk", 1)), 1, g);
  sun(S, o.sx ?? 1500, hz + 10, 70, { parent: clipG(S, rect(-200, -200, 2320, hz + 200), g) });
  S.fill(rect(-200, hz, 2320, 400), S.start, 0, DS.vgrad(DS.c("blue", 0, "far"), DS.c("blue", 1)), 1, g);
  for (let i = 0; i < 5; i++) S.draw(`M${-100 + (i % 2) * 150} ${hz + 30 + i * 36} q 70 -10 140 0 t 140 0 t 140 0 t 140 0 t 140 0 t 140 0 t 140 0 t 140 0 t 140 0 t 140 0 t 140 0 t 140 0 t 140 0 t 140 0 t 140 0`, S.start, 0, { c: DS.P.white[0], w: DS.w.hair, op: 0.4, parent: g });
  S.fill(`M-200 560 Q 480 548 960 560 T 2120 560 L2120 1280 L-200 1280 Z`, S.start, 0, DS.vgrad(DS.c("sand", 1), DS.c("sand", 0)), 1, g);
  S.fill(`M-200 560 Q 480 548 960 560 T 2120 560 L2120 640 L-200 640 Z`, S.start, 0, DS.c("sand", 2), 0.5, g);
  return { g, hz };
};
const wash = (y) => `M-200 540 L2120 540 L2120 ${y} Q1840 ${y + 26} 1560 ${y} Q1280 ${y - 22} 1000 ${y} Q720 ${y + 24} 440 ${y} Q160 ${y - 20} -200 ${y} Z`;
// About six hours later, the tide comes back, / and stops well short of the usual line on the sand.
{ const S = sc(42, 0, { cam: "push", focus: "960 640" }); dawnBeach(S);
  const ul = 860;
  S.draw(`M-200 ${ul} Q 200 ${ul - 16} 600 ${ul} T 1400 ${ul} T 2200 ${ul}`, S.start, 0, { c: DS.c("brown", 1), w: DS.w.near });
  [[200, ul - 6], [520, ul + 2], [900, ul - 4], [1300, ul + 4], [1700, ul - 2]].forEach(([x, y]) => S.draw(smooth([[x - 30, y], [x - 10, y - 14], [x + 10, y + 4], [x + 30, y - 10]]), S.start, 0, { c: DS.c("green", 2), w: DS.w.mid }));
  const wv = S.draw(wash(600), S.start, 0, { c: DS.P.white[0], w: DS.w.mid, fill: DS.c("blue", 1) });
  tl.fromTo(wv, { attr: { d: wash(600) } }, { attr: { d: wash(720) }, duration: 2.4, ease: "power1.out" }, W(42, 4));
  const D = dave(S, 1520, 980, "near", { pose: "hold", mood: "flat", look: -8 });
  const [hx, hy] = D.hand("R"); DS.shape(S, rrect(hx - 22, hy - 50, 44, 50, DS.r.xs), "red", { w: "detail" }); S.draw(arc(hx + 26, hy - 26, 14, -80, 80), S.start, 0, { c: DS.c("ink"), w: DS.w.mid });
  D.face(W(43, 2), "worried", -8);
  DS.card(S, "ABOUT 6 HOURS LATER", 960, 110, { size: DS.type.body, t: W(42, 0) });
  DS.card(S, "THE USUAL LINE", 560, 790, { size: DS.type.small, t: W(43, 6) });
  DS.card(S, "STOPS WELL SHORT", 700, 330, { size: DS.type.small, t: W(43, 2), tc: "red" });
  DS.vignette(S, 0.12); }

// Next line on the list: tides. A tide is a difference in pull.
{ const S = sc(44, 0, { cam: "zoom", focus: "900 480" }); wallCU(S, { state: "gone", read: 2, reef: true, lineT: W(44, 5), ring: 1, ringT: W(44, 5) });
  DS.card(S, "A DIFFERENCE IN PULL", 470, 870, { size: DS.type.small, t: W(44, 9) });
  DS.vignette(S, 0.18); }

// The Moon tugs the near side of Earth a little harder than the far side, and the oceans stretch.
{ const S = sc(45, 0, { cam: "push", focus: "960 560" }); space(S);
  const bg = S.grp(); S.draw(circ(760, 560, 290, 236), S.start, 0, { c: DS.c("sky", 1), w: DS.w.mid, fill: DS.c("sky", 0), op: 0.75, parent: bg }); grow(bg, W(45, 16), 760, 560, true, 1.2, 0.8);
  earth(S, 760, 560, 220);
  moon(S, 1640, 560, 80);
  S.arrow(1000, 560, 1290, 560, W(45, 3), 0, { c: DS.c("yellow", 1), w: DS.w.near * 1.6 });
  S.arrow(470, 470, 590, 470, W(45, 12), 0, { c: DS.c("yellow", 1), w: DS.w.near });
  DS.card(S, "NEAR SIDE: PULLED HARDER", 1270, 380, { size: DS.type.small, t: W(45, 3) });
  DS.card(S, "FAR SIDE: A LITTLE LESS", 470, 860, { size: DS.type.small, t: W(45, 12) });
  DS.card(S, "THE OCEANS STRETCH", 760, 120, { size: DS.type.body, t: W(45, 17), tc: "red" });
  DS.vignette(S, 0.2); }

// The Sun does it too. It's twenty-seven million times heavier than the Moon, / and it still only comes second.
const podium = (S, x, top, w, n, t) => { DS.shadow(S, x, 930, w + 40, { t }); DS.shape(S, rect(x - w / 2, top, w, 930 - top), n === 1 ? "gold" : "gray", { t, dir: "h" }); };
{ const S = sc(46, 0, { cam: "pull" }); space(S);
  podium(S, 1180, 660, 260, 1); podium(S, 560, 790, 640, 2);
  sun(S, 560, 560, 220); moon(S, 1180, 590, 64, { glow: false });
  S.text("1", 1180, 830, { size: DS.type.display, t: W(47, 4), c: DS.c("ink") }); S.text("2", 560, 900, { size: DS.type.title, t: W(47, 4), c: DS.c("ink") });
  DS.card(S, "27 MILLION × HEAVIER", 560, 180, { size: DS.type.body, t: W(46, 6) });
  DS.card(S, "STILL ONLY 2ND", 1180, 330, { size: DS.type.body, t: W(47, 2), tc: "red" });
  DS.card(S, "THE TIDE CONTEST", 1560, 120, { size: DS.type.small, t: S.start });
  DS.vignette(S, 0.2); }

// It's about three hundred and ninety times further away, and over that distance the difference mostly fades.
{ const S = sc(48, 0, { cam: "push", focus: "700 560" }); space(S);
  sun(S, 2200, 560, 520);
  earth(S, 280, 560, 100); moon(S, 560, 560, 28, { glowK: 0.3 });
  dashed(S.draw(line([400, 680], [1660, 680], 0), W(48, 1), 0, { c: DS.P.white[0], w: DS.w.mid, op: 0.8 }), 0.012, 0.01);
  dashed(S.draw(line([300, 470], [540, 470], 0), W(48, 1), 0, { c: DS.P.white[0], w: DS.w.mid, op: 0.8 }), 0.04, 0.03);
  S.text("MOON", 560, 430, { size: DS.type.caption, c: DS.P.white[0] });
  S.arrow(390, 560, 520, 560, W(48, 13), 0, { c: DS.c("yellow", 1), w: DS.w.near }); S.arrow(170, 530, 300, 530, W(48, 13), 0, { c: DS.c("yellow", 1), w: DS.w.near });
  DS.card(S, "390× FURTHER AWAY", 1030, 780, { size: DS.type.body, t: W(48, 5) });
  DS.card(S, "THE DIFFERENCE MOSTLY FADES", 700, 250, { size: DS.type.small, t: W(48, 13), tc: "red" });
  DS.vignette(S, 0.2); }

// So the Moon does about two thirds of the tidal work, / and the Sun does about one third.
const wedge = (cx, cy, r, a0, a1) => { const p = (a) => [cx + r * Math.cos((a * Math.PI) / 180), cy + r * Math.sin((a * Math.PI) / 180)], [x0, y0] = p(a0), [x1, y1] = p(a1); return `M${cx} ${cy} L${x0} ${y0} A${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${x1} ${y1} Z`; };
const tidePie = (S, o = {}) => {
  const cx = 660, cy = 560, r = 280;
  S.draw(circ(cx, cy, r), S.start, 0, { c: DS.c("gray", 1), w: DS.w.mid, op: 0.6 });
  const mg = S.grp(); DS.shape(S, wedge(cx, cy, r, -90, 150), "paper", { t: o.moonT, parent: mg }); moon(S, cx + 130, cy + 75, 50, { t: o.moonT, glow: false, parent: mg });
  if (o.out !== undefined) { S.fadeOut(mg, o.out, 0.6); dashed(S.draw(wedge(cx, cy, r, -90, 150), o.out + 0.3, 0, { c: DS.P.white[0], w: DS.w.mid })); }
  DS.shape(S, wedge(cx, cy, r, 150, 270), "yellow", { t: o.sunT }); sun(S, cx - 130, cy - 75, 34, { t: o.sunT });
  return { cx, cy, r };
};
{ const S = sc(49, 0, { cam: "push", focus: "800 560" }); space(S);
  tidePie(S, { moonT: W(49, 5), sunT: W(50, 4) });
  DS.card(S, "WHO DOES THE TIDAL WORK?", 960, 110, { size: DS.type.body, t: S.start });
  DS.card(S, "THE MOON: ABOUT 2/3", 1380, 480, { size: DS.type.body, t: W(49, 5) });
  DS.card(S, "THE SUN: ABOUT 1/3", 1380, 680, { size: DS.type.body, t: W(50, 4) });
  DS.vignette(S, 0.2); }

// Take the Moon away, and the tides shrink to the Sun's third.
{ const S = sc(51, 0, { cam: "push", focus: "900 560" }); space(S);
  tidePie(S, { out: W(51, 1) });
  const gx = 1420, gb = 860, gh = 560;
  DS.shape(S, rrect(gx - 70, gb - gh, 140, gh, DS.r.sm), "white", { flat: true });
  const water = S.grp(); DS.shape(S, rect(gx - 60, gb - gh + 20, 120, gh - 30), "blue", { parent: water, w: "hair" });
  [1, 2].forEach((k) => S.draw(line([gx - 70, gb - (gh * k) / 3], [gx - 40, gb - (gh * k) / 3], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.detail }));
  tl.fromTo(water, { attr: { transform: `translate(${gx} ${gb}) scale(1 1) translate(${-gx} ${-gb})` } }, { attr: { transform: `translate(${gx} ${gb}) scale(1 0.36) translate(${-gx} ${-gb})` }, duration: 1.2, ease: "power2.inOut" }, W(51, 7));
  S.text("TIDES", gx, gb - gh - 30, { size: DS.type.small, c: DS.P.white[0] });
  DS.card(S, "TAKE THE MOON AWAY", 660, 120, { size: DS.type.body, t: W(51, 0) });
  DS.card(S, "TIDES SHRINK TO THE SUN'S THIRD", 1100, 960 - 60, { size: DS.type.small, t: W(51, 7), tc: "red" });
  DS.vignette(S, 0.2); }

// We don't have to imagine it. In Tahiti, the Moon's tide happens to almost cancel itself out.
const palm = (S, x, gy, k, lean = 1) => { DS.shape(S, `M${x - 8 * k} ${gy} Q${x + 10 * lean * k} ${gy - 120 * k} ${x + 40 * lean * k} ${gy - 230 * k} L${x + 52 * lean * k} ${gy - 226 * k} Q${x + 24 * lean * k} ${gy - 120 * k} ${x + 10 * k} ${gy} Z`, "wood", { w: "detail" }); const tx = x + 46 * lean * k, ty = gy - 230 * k; [[-120, 20], [-70, -40], [0, -60], [70, -30], [120, 30]].forEach(([dx, dy]) => DS.shape(S, `M${tx} ${ty} Q${tx + dx * 0.5 * k} ${ty + (dy - 50) * k} ${tx + dx * k} ${ty + dy * k} Q${tx + dx * 0.55 * k} ${ty + (dy - 20) * k} ${tx} ${ty} Z`, "green", { w: "detail" })); };
const island = (S, x, y, k) => {
  S.fill(circ(x, y + 20 * k, 520 * k, 70 * k), S.start, 0, DS.c("sky", 1), 0.8);
  DS.shape(S, `M${x - 440 * k} ${y + 20 * k} Q${x - 300 * k} ${y - 120 * k} ${x - 170 * k} ${y - 260 * k} Q${x - 90 * k} ${y - 330 * k} ${x - 20 * k} ${y - 200 * k} Q${x + 60 * k} ${y - 120 * k} ${x + 160 * k} ${y - 160 * k} Q${x + 260 * k} ${y - 200 * k} ${x + 330 * k} ${y - 80 * k} Q${x + 400 * k} ${y} ${x + 440 * k} ${y + 20 * k} Z`, "grass", { layer: "mid", tone: 2 });
  DS.shape(S, `M${x - 470 * k} ${y + 24 * k} Q${x} ${y - 10 * k} ${x + 470 * k} ${y + 24 * k} Q${x} ${y + 50 * k} ${x - 470 * k} ${y + 24 * k} Z`, "sand", { layer: "mid", w: "detail" });
};
const daySea = (S, hz = 560) => { DS.setHaze("sky"); S.fill(rect(-200, -200, 2320, 1480), S.start, 0, DS.vgrad(DS.c("sky", 2), DS.c("sky", 1)), 1); S.fill(rect(-200, hz, 2320, 800), S.start, 0, DS.vgrad(DS.c("blue", 1, "mid"), DS.c("blue", 0)), 1); for (let i = 0; i < 6; i++) S.draw(`M${-100 + (i % 2) * 150} ${hz + 40 + i * 60} q 70 -12 140 0 t 140 0 t 140 0 t 140 0 t 140 0 t 140 0 t 140 0 t 140 0 t 140 0 t 140 0 t 140 0 t 140 0 t 140 0 t 140 0 t 140 0`, S.start, 0, { c: DS.P.white[0], w: DS.w.hair, op: 0.4 }); };
{ const S = sc(52, 0, { cam: "pull" }); daySea(S, 600);
  moon(S, 1560, 230, 54, { glow: false });
  island(S, 820, 620, 1.0); palm(S, 520, 640, 0.8, -1); palm(S, 1120, 640, 0.9, 1);
  S.cross(1560, 230, 1.1, W(52, 13), 0, { c: DS.c("red"), w: DS.w.near });
  DS.card(S, "WE DON'T HAVE TO IMAGINE IT", 960, 110, { size: DS.type.body, t: W(52, 0) });
  DS.card(S, "TAHITI", 820, 260, { size: DS.type.body, t: W(52, 7) });
  DS.card(S, "THE MOON'S TIDE ALMOST CANCELS OUT", 1100, 860, { size: DS.type.small, t: W(52, 12), tc: "red" });
  DS.vignette(S, 0.12); }

// What's left is mostly the Sun's tide. / High water at noon, and again at midnight, every single day.
{ const S = sc(53, 0, { cam: "push" });
  S.fill(rect(-200, -200, 2320, 1480), S.start, 0, DS.c("sky", 1), 1);
  [[520, false, "NOON", 12, W(54, 3)], [1400, true, "MIDNIGHT", 12, W(54, 7)]].forEach(([x, night, lab, h, t]) => {
    const P = clipG(S, rrect(x - 400, 220, 800, 640, DS.r.lg));
    S.fill(rect(x - 400, 220, 800, 640), S.start, 0, night ? DS.vgrad(DS.P.navy[2], DS.c("night", 0)) : DS.vgrad(DS.c("sky", 2), DS.c("sky", 1)), 1, P);
    if (night) stars(S, 30, x - 400, 220, x + 400, 520, { parent: P }); else sun(S, x, 330, 60, { parent: P });
    S.fill(rect(x - 400, 560, 800, 400), S.start, 0, night ? DS.c("navy", 0) : DS.c("blue", 0), 1, P);
    S.fill(`M${x - 400} 760 L${x + 400} 700 L${x + 400} 860 L${x - 400} 860 Z`, S.start, 0, night ? DS.mix(DS.P.sand[2], DS.P.navy[2], 0.6) : DS.c("sand", 0), 1, P);
    const hw = S.draw(`M${x - 400} 690 Q${x} 660 ${x + 400} 640`, t, 0, { c: DS.P.white[0], w: DS.w.near, parent: P });
    S.draw(rrect(x - 400, 220, 800, 640, DS.r.lg), S.start, 0, { c: DS.c("ink"), w: DS.w.mid });
    clock(S, x + 280, 340, 70, h, 0, { t });
    S.text(lab, x - 230, 340, { size: DS.type.small, t, c: night ? DS.P.white[0] : DS.c("ink") });
  });
  DS.card(S, "MOSTLY THE SUN'S TIDE", 960, 110, { size: DS.type.body, t: W(53, 3) });
  DS.card(S, "HIGH WATER, EVERY SINGLE DAY", 960, 920 - 10, { size: DS.type.small, t: W(54, 8) });
  DS.vignette(S, 0.12); }

// Tahiti's tide runs like a very small, very wet clock.
{ const S = sc(55, 0, { cam: "zoom", focus: "960 540" }); daySea(S, 640);
  island(S, 380, 660, 0.6); palm(S, 1600, 700, 0.9, -1);
  const cx = 960, cy = 520, r = 230;
  DS.shape(S, circ(cx, cy, r + 20), "gold", { tone: 2 });
  const C = clipG(S, circ(cx, cy, r));
  S.fill(circ(cx, cy, r), S.start, 0, DS.c("white", 0), 1, C);
  const wv = S.draw(`M${cx - r} ${cy + 20} q 58 -26 115 0 t 115 0 t 115 0 t 115 0 L${cx + r} ${cy + r} L${cx - r} ${cy + r} Z`, S.start, 0, { c: DS.c("blue", 2), w: DS.w.detail, fill: DS.c("blue", 1), parent: C });
  tl.fromTo(wv, { x: -40 }, { x: 40, duration: 1.2, yoyo: true, repeat: 3, ease: "sine.inOut" }, S.start);
  S.draw(rays(cx, cy, r * 0.82, r * 0.94, 12, -Math.PI / 2), S.start, 0, { c: DS.c("ink"), w: DS.w.mid });
  const mh = S.grp(), hh = S.grp(); S.draw(line([cx, cy], [cx, cy - r * 0.72], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.near, parent: mh }); S.draw(line([cx, cy], [cx + r * 0.42, cy], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.near * 1.4, parent: hh });
  spin(mh, cx, cy, S.start, S.len, 300); spin(hh, cx, cy, S.start, S.len, 25);
  [[-60, 0], [30, 0.6], [90, 1.2]].forEach(([dx, d]) => { const dg = S.grp(); S.drop(cx + dx, cy + r + 30, 1.4, S.start, 0, { parent: dg }); tl.fromTo(dg, { y: -20, opacity: 0 }, { y: 120, opacity: 1, duration: 1.1, repeat: 2, ease: "power1.in" }, S.start + d); });
  DS.card(S, "A VERY SMALL, VERY WET CLOCK", 960, 110, { size: DS.type.body, t: W(55, 4) });
  DS.vignette(S, 0.12); }

// Without the Moon, every coast gets a tide like Tahiti's. Same times every day,
{ const S = sc(56, 0, { cam: "pull" }); space(S);
  earth(S, 960, 580, 280); ghost(S, 1640, 260, 60);
  [[600, 380, 760, 470], [520, 720, 720, 680], [1330, 380, 1160, 460], [1380, 760, 1190, 700], [960, 860, 980, 830]].forEach(([x, y, tx, ty], i) => {
    const t = W(56, 3) + i * 0.12; S.draw(line([x, y], [tx, ty], 0), t, 0, { c: DS.P.white[0], w: DS.w.detail, op: 0.8 }); clock(S, x, y, 54, 12, 0, { t }); });
  DS.card(S, "EVERY COAST: A TIDE LIKE TAHITI'S", 960, 110, { size: DS.type.body, t: W(56, 3) });
  DS.card(S, "SAME TIMES EVERY DAY", 1450, 600, { size: DS.type.small, t: W(56, 10) });
  DS.vignette(S, 0.2); }

// same small size all month. No spring tides, no neap tides.
const wboard = (S, x, y, w, h) => { DS.drop(S, rect(x + 8, y + 10, w, h)); DS.shape(S, rrect(x, y, w, h, DS.r.sm), "wood", { layer: "mid" }); DS.shape(S, rect(x + 22, y + 22, w - 44, h - 44), "white", { layer: "mid", w: "detail", flat: true }); };
{ const S = sc(56, 14, { cam: "push" }); DS.room(S, { wall: "wall", floor: "wood", window: false });
  wboard(S, 220, 200, 1480, 640);
  S.text("WITH THE MOON", 300, 330, { size: DS.type.caption, anchor: "start", c: DS.c("ink") });
  S.text("WITHOUT", 300, 620, { size: DS.type.caption, anchor: "start", c: DS.c("ink") });
  for (let i = 0; i < 28; i++) { const x = 330 + i * 46, h = 50 + 90 * Math.abs(Math.cos((i * Math.PI) / 14.8));
    DS.shape(S, rect(x, 500 - h, 26, h), "blue", { w: "hair", layer: "mid", op: 0.55 });
    DS.shape(S, rect(x, 780 - 40, 26, 40), "yellow", { w: "hair", t: W(56, 14) + i * 0.02 }); }
  S.text("SPRING", 330 + 14 * 46, 340, { size: DS.type.caption, c: DS.c("ink") }); S.text("NEAP", 330 + 7 * 46 + 13, 430, { size: DS.type.caption, c: DS.c("ink") });
  xMark(S, 330 + 14 * 46 + 70, 330, 0.5, W(56, 20)); xMark(S, 330 + 7 * 46 + 90, 420, 0.5, W(56, 23));
  DS.card(S, "SAME SMALL SIZE ALL MONTH", 960, 110, { size: DS.type.body, t: W(56, 14) });
  DS.card(S, "NO SPRING TIDES, NO NEAP TIDES", 960, 900, { size: DS.type.small, t: W(56, 19), tc: "red" });
  DS.vignette(S, 0.12); }

// The strip of shore between high and low water gets narrower. / The barnacles lose most of their beachfront.
const barnacle = (S, x, y, k, o = {}) => { const g = S.grp(o.parent); DS.shape(S, `M${x - 16 * k} ${y} L${x - 8 * k} ${y - 20 * k} L${x + 8 * k} ${y - 20 * k} L${x + 16 * k} ${y} Z`, "white", { tone: 2, w: "hair", parent: g, c: DS.c("gray", 2) }); S.fill(circ(x, y - 20 * k, 6 * k, 3 * k), S.start, 0, DS.c("gray", 2), 1, g); return g; };
{ const S = sc(57, 0, { cam: "push", focus: "1000 560" }); daySea(S, 320);
  DS.shape(S, `M2120 120 L1500 140 Q1300 200 1180 340 Q1000 520 820 620 Q600 760 300 860 L-200 980 L-200 1280 L2120 1280 Z`, "gray", { tone: 2, layer: "near" });
  const hiY = 420, loY = 760, A = S.grp(), Bz = S.grp();
  for (let i = 0; i < 26; i++) { const f = i / 25, y = hiY + 30 + f * (loY - hiY - 60), x = 1180 - (y - 340) * 1.08 + ((i * 37) % 120); const inner = Math.abs(y - 590) < 70; barnacle(S, x, y, 1.0, { parent: inner ? A : Bz }); }
  S.fadeOut(Bz, W(58, 2), 0.6);
  const hl = S.grp(), ll = S.grp();
  dashed(S.draw(line([300, hiY], [1700, hiY], 0), S.start, 0, { c: DS.c("blue", 2), w: DS.w.mid, parent: hl }), 0.02, 0.012); S.text("HIGH WATER", 1720, hiY - 16, { size: DS.type.caption, anchor: "end", c: DS.c("ink"), parent: hl });
  dashed(S.draw(line([200, loY], [1500, loY], 0), S.start, 0, { c: DS.c("blue", 2), w: DS.w.mid, parent: ll }), 0.02, 0.012); S.text("LOW WATER", 220, loY - 20, { size: DS.type.caption, anchor: "start", c: DS.P.white[0], parent: ll });
  tl.fromTo(hl, { y: 0 }, { y: 110, duration: 1.2, ease: "power2.inOut" }, W(57, 9)); tl.fromTo(ll, { y: 0 }, { y: -110, duration: 1.2, ease: "power2.inOut" }, W(57, 9));
  DS.card(S, "THE STRIP GETS NARROWER", 600, 200, { size: DS.type.body, t: W(57, 9) });
  DS.card(S, "BARNACLES LOSE MOST OF THEIR BEACHFRONT", 960, 880, { size: DS.type.small, t: W(58, 2), tc: "red" });
  DS.vignette(S, 0.12); }

// "Smaller tides, darker nights. Still sounds like a lamp to me."
{ const S = sc(59, 0, { cam: "push", focus: "800 560" }); bedroom(S, { moon: false });
  dave(S, 760, 960, "near", { pose: "cross", mood: "flat", look: -6 });
  bed(S, 1240, 1840, 960);
  say(S, 560, 330, 330, 170, 720, 560, ["SMALLER TIDES,", "DARKER NIGHTS.", "STILL SOUNDS", "LIKE A LAMP."], S.start);
  DS.vignette(S, 0.18); }

// ===================== 4. Job three: the brakes =====================
// Next line on the list: brakes. This is where tides get interesting.
{ const S = sc(60, 0, { cam: "zoom", focus: "900 520" }); wallCU(S, { state: "gone", read: 3, reef: true, lineT: W(60, 5), ring: 2, ringT: W(60, 5) });
  DS.card(S, "WHERE TIDES GET INTERESTING", 470, 870, { size: DS.type.caption, t: W(60, 6) });
  DS.vignette(S, 0.18); }

// top-down: Earth spinning inside its bulge of water, the Moon on its orbit to the right. o.lead = bulge angle (deg, negative = ahead), o.leadT = when it swings ahead
const EX = 660, EY = 560, MX = 1360;
const topDown = (S, o = {}) => {
  space(S);
  dashed(S.draw(circ(EX, EY, MX - EX), S.start, 0, { c: DS.P.white[0], w: DS.w.detail, op: 0.45 }), 0.006, 0.006);
  const bg = S.grp(); S.draw(circ(EX, EY, 250, 200), S.start, 0, { c: DS.c("sky", 1), w: DS.w.mid, fill: DS.c("sky", 0), op: 0.75, parent: bg });
  const a0 = o.leadT === undefined ? (o.lead ?? 0) : 0; bg.setAttribute("transform", `rotate(${a0} ${EX} ${EY})`);
  if (o.leadT !== undefined) tl.fromTo(bg, { attr: { transform: `rotate(0 ${EX} ${EY})` } }, { attr: { transform: `rotate(${o.lead} ${EX} ${EY})` }, duration: 1.0, ease: "power2.inOut" }, o.leadT);
  earth(S, EX, EY, 160, { atmo: false });
  spinArrow(S, EX, EY, 300, { c: "yellow", a0: 150, a1: 250, go: S.start, deg: 260 });
  moon(S, MX, EY, 64, { glowK: 0.3 });
  dashed(S.draw(line([EX, EY], [MX - 70, EY], 0), S.start, 0, { c: DS.c("gray", 1), w: DS.w.detail, op: 0.6 }), 0.02, 0.015);
  S.draw(arc(EX, EY, MX - EX, -14, -4), S.start, 0, { c: DS.c("gray", 1), w: DS.w.near });
  S.draw(arrowHead(EX + (MX - EX) * Math.cos(-0.244), EY + (MX - EX) * Math.sin(-0.244), -Math.PI / 2 - 0.2, 24), S.start, 0, { c: DS.c("gray", 1), w: DS.w.near });
  return bg;
};
const LEAD = -24, BT = [EX + 250 * Math.cos((LEAD * Math.PI) / 180), EY + 250 * Math.sin((LEAD * Math.PI) / 180)];
// Earth spins faster than the Moon goes round, / so it drags its bulge of water slightly ahead of the Moon.
{ const S = sc(61, 0, { cam: "push", focus: "900 560" }); topDown(S, { lead: LEAD, leadT: W(62, 2) });
  DS.card(S, "EARTH SPINS FASTER", 660, 140, { size: DS.type.body, t: W(61, 1) });
  DS.card(S, "THE BULGE RUNS AHEAD OF THE MOON", 1180, 880, { size: DS.type.small, t: W(62, 4), tc: "red" });
  DS.vignette(S, 0.2); }

// The Moon pulls back on that bulge, and the bulge pulls the Moon forward.
{ const S = sc(63, 0, { cam: "push", focus: "1000 520" }); topDown(S, { lead: LEAD });
  S.arrow(BT[0] + 40, BT[1] - 30, BT[0] + 90, BT[1] + 70, W(63, 1), 0, { c: DS.c("red", 1), w: DS.w.near * 1.4, bend: -0.2 });
  S.arrow(MX + 90, EY + 40, MX + 90, EY - 170, W(63, 9), 0, { c: DS.c("green", 1), w: DS.w.near * 1.4 });
  DS.card(S, "THE MOON PULLS BACK", 900, 140, { size: DS.type.small, t: W(63, 1) });
  DS.card(S, "THE BULGE PULLS THE MOON FORWARD", 1240, 860, { size: DS.type.small, t: W(63, 9) });
  DS.vignette(S, 0.2); }

// Two results. Earth's spin slows down, and the Moon slowly climbs away. / We can measure the second one.
{ const S = sc(64, 0, { cam: "push", focus: "1300 560" }); space(S);
  [[520, W(64, 2), "1. EARTH'S SPIN SLOWS"], [1400, W(64, 7), "2. THE MOON CLIMBS AWAY"]].forEach(([x, t, s], i) => {
    panel(S, x, 560, 760, 600, t, "navy");
    S.text(s, x, 340, { size: DS.type.small, t, c: DS.P.white[0] });
    if (i === 0) { earth(S, x, 600, 150, { t, atmo: false }); const a = spinArrow(S, x, 600, 220, { c: "yellow", t, a0: 160, a1: 290 }); tl.to(a, { rotation: -150, svgOrigin: `${x} 600`, duration: Math.max(1, S.end - t), ease: "power3.out" }, t); }
    else { earth(S, x - 220, 600, 60, { t, atmo: false }); dashed(S.draw(smooth(Array.from({ length: 40 }, (_, k) => { const a = -k * 0.2, r = 110 + k * 7; return [x - 220 + r * Math.cos(a), 600 + r * Math.sin(a) * 0.8]; })), t, 0, { c: DS.c("gray", 1), w: DS.w.detail }), 0.01, 0.008);
      const M = S.grp(); moon(S, x + 70, 560, 34, { t, parent: M, glowK: 0.3 }); tl.fromTo(M, { x: -60, y: 20 }, { x: 60, y: -10, duration: Math.max(1, S.end - t), ease: "none" }, t); }
  });
  ring(S, 1010, 250, 780, 620, W(65, 2));
  DS.card(S, "TWO RESULTS", 960, 120, { size: DS.type.body, t: W(64, 0) });
  DS.card(S, "WE CAN MEASURE THIS ONE", 1400, 920 - 10, { size: DS.type.small, t: W(65, 2), tc: "red" });
  DS.vignette(S, 0.2); }

// on the Moon: grey ground, black sky, Earth up high
const lunar = (S, o = {}) => {
  DS.setHaze("night");
  S.fill(rect(-200, -200, 2320, 1480), S.start, 0, DS.P.ink[2], 1);
  stars(S, 90, -100, -100, 2020, 600);
  earth(S, o.ex ?? 1520, o.ey ?? 210, 80, { night: true, nightA: 20 });
  S.fill(ridge(640, 40, 1.9), S.start, 0, DS.c("gray", 0, "far"), 1);
  S.fill(ridge(720, 26, 3.1), S.start, 0, DS.vgrad(DS.c("gray", 1, "mid"), DS.c("gray", 2)), 1);
  [[300, 800, 120], [1300, 760, 80], [1700, 880, 140], [650, 950, 90]].forEach(([x, y, r]) => { S.fill(circ(x, y, r, r * 0.28), S.start, 0, DS.c("gray", 2), 0.6); S.draw(arc(x, y, r, 180, 360, r * 0.28), S.start, 0, { c: DS.c("gray", 1), w: DS.w.detail }); });
};
const reflector = (S, x, gy, k, t) => { const g = S.grp(); DS.shadow(S, x, gy, 300 * k, { t, parent: g }); [-110, 110].forEach((dx) => DS.shape(S, rect(x + dx * k - 6 * k, gy - 90 * k, 12 * k, 90 * k), "gray", { t, tone: 2, w: "detail", parent: g }));
  DS.shape(S, `M${x - 170 * k} ${gy - 90 * k} L${x + 170 * k} ${gy - 90 * k} L${x + 130 * k} ${gy - 260 * k} L${x - 130 * k} ${gy - 260 * k} Z`, "gray", { t, tone: 2, parent: g });
  for (let r = 0; r < 4; r++) for (let c = 0; c < 7; c++) { const f = (r + 0.5) / 4, xl = x - (150 - 36 * f) * k, xr = x + (150 - 36 * f) * k, cx = xl + ((c + 0.5) / 7) * (xr - xl), cy = gy - (102 + r * 40) * k; DS.shape(S, circ(cx, cy, 14 * k, 12 * k), "glass", { t, w: "hair", parent: g }); }
  return g; };
// In nineteen sixty-nine, Apollo eleven astronauts left a panel of mirrors on the Moon. / Apollo fourteen and fifteen left two more.
{ const S = sc(66, 0, { cam: "push", focus: "900 700" }); lunar(S);
  [[560, 900], [620, 870], [690, 900], [750, 870]].forEach(([x, y]) => S.fill(rrect(x - 16, y - 8, 32, 16, DS.r.xs), S.start, 0, DS.c("gray", 2), 0.8));
  reflector(S, 960, 900, 1.2);
  reflector(S, 330, 700, 0.4, W(67, 0)); reflector(S, 1620, 690, 0.4, W(67, 2));
  S.text("14", 330, 590, { size: DS.type.caption, t: W(67, 1), c: DS.P.white[0] }); S.text("15", 1620, 580, { size: DS.type.caption, t: W(67, 3), c: DS.P.white[0] });
  DS.card(S, "1969 · APOLLO 11", 760, 120, { size: DS.type.body, t: W(66, 1) });
  DS.card(S, "A PANEL OF MIRRORS", 960, 470, { size: DS.type.small, t: W(66, 8) });
  DS.card(S, "+ APOLLO 14 AND 15", 960, 260, { size: DS.type.small, t: W(67, 0) });
  DS.vignette(S, 0.2); }

// Observatories still fire lasers at them and time the light coming back.
const observatory = (S, x, gy, k) => { DS.shadow(S, x, gy, 360 * k); DS.shape(S, rect(x - 150 * k, gy - 170 * k, 300 * k, 170 * k), "white", { tone: 2, layer: "mid" }); DS.shape(S, `M${x - 160 * k} ${gy - 170 * k} A${160 * k} ${150 * k} 0 0 1 ${x + 160 * k} ${gy - 170 * k} Z`, "white", { layer: "mid" }); DS.shape(S, `M${x + 10 * k} ${gy - 318 * k} L${x + 60 * k} ${gy - 300 * k} L${x + 70 * k} ${gy - 175 * k} L${x + 20 * k} ${gy - 175 * k} Z`, "ink", { tone: 1, w: "detail" }); DS.shape(S, rrect(x - 30 * k, gy - 90 * k, 60 * k, 90 * k, DS.r.xs), "wood", { layer: "mid", w: "detail" }); };
{ const S = sc(68, 0, { cam: "push", focus: "960 500" }); land(S, { hy: 780, moon: [1520, 220, 80] });
  observatory(S, 520, 840, 1.0);
  const bx = 560, by = 560, mx = 1490, my = 250;
  S.draw(line([bx, by], [mx, my], 0), W(68, 3), 0, { c: DS.c("green", 1), w: DS.w.mid, op: 0.85 });
  S.fill(circ(bx, by, 40), W(68, 3), 0, DS.glow(DS.P.green[1], 0.8), 1);
  const P = S.grp(); S.fill(circ(bx, by, 14), W(68, 3), 0, DS.c("green", 1), 1, P); S.fill(circ(bx, by, 34), W(68, 3), 0, DS.glow(DS.P.green[1], 0.9), 1, P);
  const d = 1.3; tl.fromTo(P, { x: 0, y: 0 }, { x: mx - bx, y: my - by, duration: d, ease: "none", yoyo: true, repeat: 3 }, W(68, 3));
  DS.card(S, "LASERS AT THE MIRRORS", 960, 110, { size: DS.type.body, t: W(68, 2) });
  DS.card(S, "TIME THE LIGHT COMING BACK", 1300, 640, { size: DS.type.small, t: W(68, 7) });
  DS.vignette(S, 0.16); }

// The Moon is moving away by about three point eight centimetres a year.
{ const S = sc(69, 0, { cam: "pull" }); space(S);
  earth(S, 380, 560, 170);
  const M = S.grp(); moon(S, 1380, 560, 70, { parent: M }); tl.fromTo(M, { x: 0 }, { x: 80, duration: S.len, ease: "none" }, S.start);
  S.arrow(1490, 560, 1720, 560, W(69, 3), 0, { c: DS.c("yellow", 1), w: DS.w.near });
  dashed(S.draw(line([560, 560], [1290, 560], 0), S.start, 0, { c: DS.P.white[0], w: DS.w.detail, op: 0.6 }), 0.01, 0.01);
  DS.card(S, "THE MOON IS MOVING AWAY", 960, 120, { size: DS.type.body, t: W(69, 3) });
  DS.card(S, "ABOUT 3.8 CM A YEAR", 1380, 780, { size: DS.type.body, t: W(69, 7), tc: "red" });
  DS.vignette(S, 0.2); }

// The Moon is leaving us. Slowly. At about the speed your fingernails grow.
const hand = (S, x, y, k, o = {}) => { // Dave's hand, index finger up; fingertip at (x, y)
  const g = S.grp(), ink = DS.c("ink");
  DS.shape(S, rect(x - 30 * k, y + 520 * k, 240 * k, 400 * k), "blue", { parent: g });
  DS.shape(S, rrect(x - 50 * k, y + 250 * k, 280 * k, 300 * k, DS.r.lg), "white", { parent: g });
  DS.shape(S, rrect(x - 36 * k, y, 92 * k, 330 * k, DS.r.lg), "white", { parent: g });
  [[0, 0], [1, 1], [2, 2]].forEach(([i]) => DS.shape(S, rrect(x + (64 + i * 52) * k, y + (250 + i * 6) * k, 58 * k, 150 * k, DS.r.lg), "white", { parent: g }));
  DS.shape(S, rrect(x + 150 * k, y + 330 * k, 160 * k, 70 * k, DS.r.lg), "white", { parent: g });
  S.draw(line([x - 10 * k, y + 180 * k], [x + 30 * k, y + 180 * k], 0), S.start, 0, { c: ink, w: DS.w.detail, parent: g });
  const nail = S.grp(g); DS.shape(S, rrect(x - 22 * k, y + 14 * k, 64 * k, 70 * k, DS.r.md), "pink", { tone: 1, parent: nail, w: "detail" });
  if (o.grow !== undefined) { const tip = S.grp(g); DS.shape(S, rrect(x - 22 * k, y - 10 * k, 64 * k, 34 * k, DS.r.sm), "white", { tone: 2, parent: tip, w: "detail" }); grow(tip, o.grow, x, y + 24 * k, false, Math.max(1, S.end - o.grow), 0.05); }
  return g; };
{ const S = sc(70, 0, { cam: "push", focus: "800 520" }); space(S);
  hand(S, 560, 300, 1.0, { grow: W(70, 7) });
  DS.shape(S, rrect(700, 220, 80, 520, DS.r.xs), "yellow", { w: "detail" }); for (let i = 0; i < 13; i++) S.draw(line([700, 240 + i * 40], [700 + (i % 2 ? 22 : 40), 240 + i * 40], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.detail });
  const M = S.grp(); moon(S, 1440, 330, 90, { parent: M }); tl.fromTo(M, { x: 0 }, { x: 70, duration: S.len, ease: "none" }, S.start);
  DS.card(S, "THE MOON IS LEAVING US. SLOWLY.", 1300, 120, { size: DS.type.small, t: W(70, 0) });
  DS.card(S, "ABOUT THE SPEED YOUR FINGERNAILS GROW", 1310, 640, { size: DS.type.caption, t: W(70, 7), tc: "red" });
  DS.vignette(S, 0.2); }

// Meanwhile, the day gets longer by about two thousandths of a second every century.
{ const S = sc(71, 0, { cam: "push", focus: "800 480" }); DS.room(S, { wall: "wall", floor: "wood", window: false });
  clock(S, 700, 470, 260, 4, 0, { spin: S.start, dur: S.len, turns: 0.15 });
  const C = cal(S, 1180, 230, 3, 2, 160, 120, { t: W(71, 12), title: "100 YEARS" });
  C.cells.forEach(([x, y], i) => S.draw(arc(x, y, 30, 200, 520), W(71, 12) + i * 0.1, 0, { c: DS.c("gray", 2), w: DS.w.detail }));
  DS.card(S, "THE DAY GETS LONGER", 700, 110, { size: DS.type.body, t: W(71, 1) });
  DS.card(S, "BY ABOUT 0.002 SECONDS", 700, 840, { size: DS.type.body, t: W(71, 6), tc: "red" });
  DS.card(S, "EVERY CENTURY", 1420, 640, { size: DS.type.small, t: W(71, 12) });
  DS.vignette(S, 0.12); }

// So Dave's twelve hours are already getting longer. Just not noticeably.
const sign12 = (S, F, o = {}) => { const [hx, hy] = F.hand("R"), cx = F.cx, y0 = hy - 50, g = S.grp(); g.setAttribute("data-layout-allow-overlap", ""); DS.drop(S, rrect(cx - 230 + 8, y0 + 10, 460, 210, DS.r.md), { parent: g }); DS.shape(S, rrect(cx - 230, y0, 460, 210, DS.r.md), "white", { flat: true, parent: g });
  const n = S.text(o.n || "12 HOURS", cx, y0 + 100, { size: DS.type.title, c: DS.c("ink"), parent: g }); S.text("OF PROPER DARK", cx, y0 + 170, { size: DS.type.small, c: DS.c("ink"), parent: g }); return { g, n, cx, y0 }; };
{ const S = sc(72, 0, { cam: "zoom", focus: "860 640" }); bedroom(S, { moon: false });
  const F = dave(S, 760, 960, "near", { pose: "hold", mood: "smile", look: 6 });
  const Sg = sign12(S, F);
  lens(S, Sg.cx + 330, Sg.y0 + 60, 74, W(72, 8));
  S.text("+0.0000…", Sg.cx + 330, Sg.y0 + 72, { size: DS.type.caption, t: W(72, 8), c: DS.c("red", 2) });
  bed(S, 1340, 1880, 960);
  DS.card(S, "ALREADY GETTING LONGER", 960, 120, { size: DS.type.body, t: W(72, 5) });
  DS.card(S, "JUST NOT NOTICEABLY", 1360, 420, { size: DS.type.small, t: W(72, 8) });
  F.face(W(72, 8), "flat", 6);
  DS.vignette(S, 0.18); }

// Dave panics anyway. If the brakes vanish, does the day spin up into something wild? // No. Earth keeps the spin it already has.
{ const S = sc(73, 0, { cam: "push", focus: "760 560" }); bedroom(S, { moon: false });
  const F = dave(S, 900, 960, "near", { pose: "head", mood: "wow", look: -6 });
  bed(S, 1300, 1860, 960);
  const T = S.grp(); S.thought(470, 360, 300, 230, 760, 600, S.start, 0.3, { parent: T });
  earth(S, 470, 360, 130, { atmo: false, parent: T });
  const wild = S.grp(T); [180, 210].forEach((r, i) => spinArrow(S, 470, 360, r, { parent: wild, c: "red", a0: 140 + i * 180, a1: 260 + i * 180, go: S.start, deg: 1400 }));
  S.fadeOut(wild, W(74, 0), 0.4); spinArrow(S, 470, 360, 190, { parent: T, c: "green", a0: 200, a1: 320, t: W(74, 1), go: W(74, 1), deg: 60 });
  F.face(W(74, 0), "smile", -6); F.setPose(W(74, 0), "stand");
  DS.card(S, "SPIN UP INTO SOMETHING WILD?", 1180, 300, { size: DS.type.small, t: W(73, 9), tc: "red" });
  DS.card(S, "NO.", 470, 680, { size: DS.type.title, t: W(74, 0), tc: "green" });
  DS.card(S, "EARTH KEEPS THE SPIN IT HAS", 1180, 160, { size: DS.type.small, t: W(74, 1) });
  DS.vignette(S, 0.18); }

// The day stays twenty-four hours. It just mostly stops getting longer. / Your alarm clock would never even notice.
const alarm = (S, cx, gy, r, o = {}) => { const g = S.grp(); DS.shadow(S, cx, gy, r * 2.2, { parent: g }); [-1, 1].forEach((sd) => { DS.shape(S, `M${cx + sd * r * 0.55} ${gy - r * 1.95} A${r * 0.32} ${r * 0.32} 0 0 1 ${cx + sd * r * 1.05} ${gy - r * 1.65} Z`, "red", { parent: g, w: "detail" }); DS.shape(S, rect(cx + sd * r * 0.62 - 6, gy - r * 0.3, 12, r * 0.3), "red", { tone: 2, parent: g, w: "hair" }); });
  DS.shape(S, circ(cx, gy - r * 1.15, r * 1.02), "red", { parent: g }); clock(S, cx, gy - r * 1.15, r * 0.84, o.h ?? 7, o.m ?? 0, { parent: g }); return g; };
{ const S = sc(75, 0, { cam: "push", focus: "1200 660" }); bedroom(S, { moon: false });
  const top = bed(S, 1240, 1840, 960); sleeper(S, 1840, top);
  DS.shadow(S, 1080, 960, 220); DS.shape(S, rrect(980, 760, 200, 200, DS.r.sm), "wood"); DS.shape(S, rrect(1000, 800, 160, 60, DS.r.xs), "wood", { tone: 1, w: "detail" });
  alarm(S, 1080, 760, 70);
  zzz(S, 1640, 650, S.start + 0.3);
  DS.card(S, "THE DAY STAYS 24 HOURS", 960, 120, { size: DS.type.body, t: W(75, 0) });
  DS.card(S, "IT MOSTLY STOPS GETTING LONGER", 540, 680, { size: DS.type.caption, t: W(75, 5) });
  DS.card(S, "YOUR ALARM CLOCK WOULD NEVER NOTICE", 1000, 250, { size: DS.type.caption, t: W(76, 1), tc: "green" });
  DS.vignette(S, 0.18); }

// ===================== 5. Job four: the steering =====================
// The last line on the list comes with a question mark: steering.
{ const S = sc(77, 0, { cam: "zoom", focus: "900 600" }); wallCU(S, { state: "gone", read: 4, reef: true, lineT: W(77, 11), ring: 3, ringT: W(77, 11) });
  DS.card(S, "IT COMES WITH A QUESTION MARK", 470, 870, { size: DS.type.caption, t: W(77, 6) });
  DS.vignette(S, 0.18); }

// angle arc from vertical (0) to deg, clockwise, round (cx, cy)
const arcV = (cx, cy, r, d0, d1) => smooth(Array.from({ length: 13 }, (_, i) => { const a = ((d0 + ((d1 - d0) * i) / 12) * Math.PI) / 180; return [cx + r * Math.sin(a), cy - r * Math.cos(a)]; }));
// Earth leans over by about twenty-three degrees. That lean is why you get seasons.
{ const S = sc(78, 0, { cam: "push", focus: "700 560" }); space(S);
  earth(S, 620, 580, 250, { tilt: 23, axis: true, night: true, nightA: 180 });
  dashed(S.draw(line([620, 230], [620, 330], 0), S.start, 0, { c: DS.c("gray", 1), w: DS.w.detail }), 0.06, 0.04);
  S.draw(arcV(620, 580, 320, 0, 23), W(78, 5), 0, { c: DS.c("yellow", 1), w: DS.w.near });
  S.text("23°", 760, 250, { size: DS.type.title, t: W(78, 5), c: DS.c("yellow", 1) });
  const t = W(78, 9); dashed(S.draw(circ(1450, 580, 330, 120), t, 0, { c: DS.P.white[0], w: DS.w.detail, op: 0.5 }), 0.008, 0.008);
  sun(S, 1450, 580, 60, { t });
  [[1130, "SUMMER"], [1770, "WINTER"]].forEach(([x, w], i) => { earth(S, x, 580, 56, { t, tilt: 23, axis: true, atmo: false, night: true, nightA: i ? 0 : 180 }); S.text(w, x, 720, { size: DS.type.caption, t: W(78, 12), c: DS.P.white[0] }); });
  DS.card(S, "EARTH LEANS ABOUT 23°", 620, 110, { size: DS.type.body, t: W(78, 3) });
  DS.card(S, "THE LEAN GIVES YOU SEASONS", 1450, 300, { size: DS.type.small, t: W(78, 10) });
  DS.vignette(S, 0.2); }

// With the Moon, the lean only nods by about a degree either way, / over tens of thousands of years.
{ const S = sc(79, 0, { cam: "push", focus: "800 560" }); space(S);
  const E = earth(S, 760, 580, 250, { tilt: 23, axis: true, night: true, nightA: 180 });
  tl.fromTo(E.axis, { attr: { transform: `rotate(21 760 580)` } }, { attr: { transform: `rotate(25 760 580)` }, duration: 1.4, yoyo: true, repeat: Math.ceil(S.len / 1.4), ease: "sine.inOut" }, S.start);
  S.fill(`M760 580 L${760 + 380 * Math.sin(0.367)} ${580 - 380 * Math.cos(0.367)} A380 380 0 0 1 ${760 + 380 * Math.sin(0.436)} ${580 - 380 * Math.cos(0.436)} Z`, W(79, 7), 0, DS.c("yellow", 1), 0.45);
  moon(S, 1500, 380, 80);
  DS.card(S, "WITH THE MOON: ABOUT ±1°", 760, 110, { size: DS.type.body, t: W(79, 7) });
  DS.card(S, "OVER TENS OF THOUSANDS OF YEARS", 1300, 860, { size: DS.type.small, t: W(80, 0) });
  DS.vignette(S, 0.2); }

// Paris, 1993: an office at night, the tower in the window, a desk of maths
const eiffel = (S, x, gy, k, parent) => { const c = DS.mix(DS.P.navy[2], DS.P.ink[2], 0.2), g = S.grp(parent);
  S.fill(`M${x - 110 * k} ${gy} L${x - 40 * k} ${gy - 200 * k} L${x - 18 * k} ${gy - 400 * k} L${x - 6 * k} ${gy - 560 * k} L${x} ${gy - 600 * k} L${x + 6 * k} ${gy - 560 * k} L${x + 18 * k} ${gy - 400 * k} L${x + 40 * k} ${gy - 200 * k} L${x + 110 * k} ${gy} L${x + 60 * k} ${gy} Q${x} ${gy - 120 * k} ${x - 60 * k} ${gy} Z`, S.start, 0, c, 1, g);
  [[-56, -200, 112], [-26, -400, 52]].forEach(([dx, dy, w]) => S.fill(rect(x + dx * k, gy + dy * k - 10 * k, w * k, 14 * k), S.start, 0, c, 1, g));
  for (let i = 0; i < 14; i++) { const f = rnd(), y = gy - f * 560 * k, hw = (1 - f) * 90 * k + 6 * k, p = S.fill(circ(x + (rnd() - 0.5) * 2 * hw, y, 3), S.start, 0, DS.c("yellow", 1), 0.9, g); tl.to(p, { opacity: 0.1, duration: 0.3 + rnd() * 0.4, yoyo: true, repeat: 8, ease: "none" }, S.start + rnd()); }
  return g; };
const office = (S, o = {}) => {
  DS.room(S, { wall: "wall", floor: "wood", window: false });
  const [wx, wy, ww, wh] = [1130, 160, 420, 360];
  DS.shape(S, rrect(wx - 16, wy - 16, ww + 32, wh + 32, DS.r.xs), "white", { layer: "mid", w: "mid" });
  const Wn = clipG(S, rect(wx, wy, ww, wh)); S.fill(rect(wx, wy, ww, wh), S.start, 0, DS.vgrad(DS.P.navy[2], DS.c("night", 0)), 1, Wn); stars(S, 14, wx, wy, wx + ww, wy + wh * 0.6, { parent: Wn, big: 2 });
  eiffel(S, wx + ww * 0.5, wy + wh + 20, 0.62, Wn);
  S.draw(`M${wx + ww / 2} ${wy} V${wy + wh} M${wx} ${wy + wh / 2} H${wx + ww}`, S.start, 0, { c: DS.c("white", 0, "mid"), w: DS.w.mid });
  DS.shadow(S, 760, 960, 980); DS.shape(S, rrect(260, 700, 1000, 40, DS.r.xs), "wood"); [300, 1180].forEach((x) => DS.shape(S, rect(x, 740, 30, 220), "wood", { w: "mid" }));
};
const crt = (S, cx, top, t) => { const g = S.grp(); DS.shape(S, rrect(cx - 200, top - 330, 400, 300, DS.r.md), "gray", { t, tone: 1, parent: g }); DS.shape(S, rrect(cx - 160, top - 300, 320, 230, DS.r.sm), "navy", { t, flat: true, tone: 2, w: "detail", parent: g }); DS.shape(S, rect(cx - 60, top - 30, 120, 30), "gray", { t, tone: 2, w: "detail", parent: g });
  [60, 100, 140].forEach((r, i) => S.draw(circ(cx, top - 185, r, r * 0.42), t ?? S.start, 0, { c: DS.c("green", 1), w: DS.w.hair, parent: g })); S.fill(circ(cx, top - 185, 12), t ?? S.start, 0, DS.c("yellow", 1), 1, g); [[60, 0], [-100, 0.6], [140, 2.4]].forEach(([r, a]) => S.fill(circ(cx + r * Math.cos(a), top - 185 + r * 0.42 * Math.sin(a), 7), t ?? S.start, 0, DS.c("sky", 1), 1, g)); return g; };
const papers = (S, x, y, n, t) => { for (let i = 0; i < n; i++) { const g = S.grp(), px = x + i * 30, py = y - i * 8; DS.drop(S, rect(px + 4, py + 6, 220, 140), { t, parent: g }); DS.shape(S, rect(px, py, 220, 140), "white", { t, flat: true, w: "detail", parent: g }); for (let j = 0; j < 4; j++) S.draw(smooth([[px + 20, py + 30 + j * 26], [px + 80, py + 24 + j * 26], [px + 140, py + 32 + j * 26], [px + 190, py + 28 + j * 26]]), t ?? S.start, 0, { c: DS.c("blue", 2), w: DS.w.detail, parent: g }); g.setAttribute("transform", `rotate(${(i - 1) * 4} ${px + 110} ${py + 70})`); } };
// In nineteen ninety-three, Jacques Laskar and his colleagues in Paris ran the planets through the maths, with no Moon.
{ const S = sc(81, 0, { cam: "push", focus: "900 560" }); office(S);
  crt(S, 720, 700, S.start); papers(S, 340, 640, 3, W(81, 13));
  ghost(S, 880, 450, 18, W(81, 16)).setAttribute("stroke", DS.c("red", 1));
  DS.card(S, "1993 · JACQUES LASKAR & COLLEAGUES", 760, 110, { size: DS.type.small, t: W(81, 3) });
  DS.card(S, "PARIS", 1340, 600, { size: DS.type.small, t: W(81, 9) });
  DS.card(S, "THE PLANETS, WITH NO MOON", 760, 850, { size: DS.type.small, t: W(81, 12), tc: "red" });
  DS.vignette(S, 0.12); }

// The tilt went chaotic. Anywhere from nearly zero degrees, to about eighty-five.
{ const S = sc(82, 0, { cam: "push", focus: "960 600" }); space(S);
  const cx = 960, cy = 640, R = 420;
  S.fill(`M${cx} ${cy} L${cx} ${cy - R} A${R} ${R} 0 0 1 ${cx + R * Math.sin(1.4835)} ${cy - R * Math.cos(1.4835)} Z`, W(82, 5), 0, DS.c("red"), 0.22);
  S.draw(arcV(cx, cy, R, 0, 85), W(82, 5), 0, { c: DS.c("red", 1), w: DS.w.mid });
  S.text("0°", cx, cy - R - 24, { size: DS.type.small, t: W(82, 6), c: DS.P.white[0] }); S.text("85°", cx + R + 80, cy - 20, { size: DS.type.small, t: W(82, 10), c: DS.P.white[0] });
  const E = earth(S, cx, cy, 220, { tilt: 23, axis: true });
  const K = [[S.start + 0.2, 60], [W(82, 3), 8], [W(82, 6), 2], [W(82, 8), 70], [W(82, 10), 85], [W(82, 11) + 0.5, 30], [W(82, 11) + 1.2, 75]];
  let prev = 23; K.forEach(([t, a]) => { tl.fromTo(E.axis, { attr: { transform: `rotate(${prev} ${cx} ${cy})` } }, { attr: { transform: `rotate(${a} ${cx} ${cy})` }, duration: 0.5, ease: "power2.inOut", immediateRender: false }, t); prev = a; });
  DS.card(S, "THE TILT WENT CHAOTIC", 600, 110, { size: DS.type.body, t: W(82, 1), tc: "red" });
  DS.card(S, "NEARLY 0° TO ABOUT 85°", 1440, 880, { size: DS.type.small, t: W(82, 5) });
  DS.vignette(S, 0.2); }

// At eighty-five, Earth rolls round the Sun on its side, / and almost everywhere gets months of daylight, then months of night.
{ const S = sc(83, 0, { cam: "pull" }); space(S);
  dashed(S.draw(circ(960, 600, 640, 200), S.start, 0, { c: DS.P.white[0], w: DS.w.detail, op: 0.45 }), 0.006, 0.006);
  sun(S, 960, 600, 110);
  earth(S, 330, 600, 130, { tilt: 85, axis: true, night: true, nightA: 180 });
  earth(S, 1590, 600, 130, { tilt: 85, axis: true, night: true, nightA: 0, t: W(84, 7) });
  DS.card(S, "AT 85°, EARTH ROLLS ON ITS SIDE", 960, 110, { size: DS.type.body, t: W(83, 1) });
  DS.card(S, "MONTHS OF DAYLIGHT", 400, 860, { size: DS.type.small, t: W(84, 4) });
  DS.card(S, "THEN MONTHS OF NIGHT", 1540, 860, { size: DS.type.small, t: W(84, 7) });
  DS.vignette(S, 0.2); }

// Laskar's team called the Moon a potential climate regulator for the Earth.
{ const S = sc(85, 0, { cam: "push", focus: "760 520" }); DS.room(S, { wall: "wall", floor: "wood", window: false });
  DS.drop(S, rect(328, 168, 760, 660)); DS.shape(S, rect(320, 160, 760, 660), "white", { flat: true, w: "detail" });
  S.text("NATURE · 1993", 700, 240, { size: DS.type.small, c: DS.c("ink") }); S.draw(line([360, 270], [1040, 270], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.detail });
  [330, 370, 410, 690, 730, 770].forEach((y) => S.draw(line([370, y], [1030, y], 0), S.start, 0, { c: DS.c("gray", 1), w: DS.w.mid }));
  S.fill(rect(360, 470, 680, 170), W(85, 6), 0, DS.c("yellow", 1), 0.8);
  S.text("“A POTENTIAL CLIMATE", 700, 535, { size: DS.type.small, c: DS.c("ink") }); S.text("REGULATOR FOR THE EARTH”", 700, 605, { size: DS.type.small, c: DS.c("ink") });
  const cx = 1460, cy = 470; DS.shape(S, circ(cx, cy, 220), "white"); S.draw(arc(cx, cy, 180, 150, 270), S.start, 0, { c: DS.c("blue"), w: DS.w.near * 2 }); S.draw(arc(cx, cy, 180, 270, 390), S.start, 0, { c: DS.c("red"), w: DS.w.near * 2 });
  moon(S, cx, cy, 110, { glow: false }); S.draw(line([cx, cy - 110], [cx, cy - 150], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.near });
  DS.card(S, "LASKAR'S TEAM", 700, 110, { size: DS.type.body, t: W(85, 0) });
  DS.card(S, "THE MOON AS A THERMOSTAT?", 1460, 780, { size: DS.type.small, t: W(85, 7) });
  DS.vignette(S, 0.12); }

// Dave stares at the switch. His one night off has just broken the seasons.
{ const S = sc(86, 0, { cam: "zoom", focus: "900 560" }); const R = bedroom(S, { moon: false });
  const F = dave(S, 760, 960, "near", { pose: "head", mood: "worried", look: 8 });
  bed(S, 1300, 1860, 960);
  ring(S, R.K.sx - 60, R.K.sy - 110, 120, 200, W(86, 3));
  F.face(W(86, 10), "wow", 8); S.tilt(3, W(86, 11), 0.4);
  DS.card(S, "HE JUST BROKE THE SEASONS?", 960, 120, { size: DS.type.body, t: W(86, 9), tc: "red" });
  DS.vignette(S, 0.18); }

// So that settles it, right? No Moon, no steady seasons. // Well, the story didn't end in Paris.
const stamp = (S, cx, cy, str, t, name = "red") => { const g = S.grp(), w = str.length * DS.type.small * 0.66 + 60, tf = (k) => `translate(${cx} ${cy}) rotate(-6) scale(${k}) translate(${-cx} ${-cy})`;
  S.draw(rrect(cx - w / 2, cy - 46, w, 92, DS.r.sm), S.start, 0, { c: DS.c(name, 2), w: DS.w.near, fill: DS.P.white[0], parent: g }); S.text(str, cx, cy + 19, { size: DS.type.small, t: S.start, c: DS.c(name, 2), parent: g });
  tl.fromTo(g, { opacity: 0, attr: { transform: tf(1.4) } }, { opacity: 1, attr: { transform: tf(1) }, duration: 0.25, ease: "power3.in" }, t); return g; };
{ const S = sc(87, 0, { cam: "push", focus: "800 560" }); office(S);
  DS.shape(S, rrect(360, 300, 760, 400, DS.r.sm), "earth", { tone: 1 }); DS.shape(S, rrect(360, 268, 260, 50, DS.r.sm), "earth", { tone: 1, w: "detail" });
  S.text("THE MOON CASE", 740, 400, { size: DS.type.small, c: DS.c("ink") });
  S.text("NO MOON = NO STEADY SEASONS", 740, 480, { size: DS.type.caption, t: W(87, 5), c: DS.c("ink") });
  stamp(S, 740, 590, "SETTLED?", W(87, 2));
  const P = S.grp(); DS.shape(S, `M0 0 L120 30 L0 60 L30 30 Z`, "white", { parent: P, w: "detail" }); P.setAttribute("transform", "translate(1000 640)");
  tl.fromTo(wrapG(P), { x: 0, y: 0 }, { x: 760, y: -420, duration: 2.2, ease: "power1.in" }, W(88, 1));
  DS.card(S, "THE STORY DIDN'T END IN PARIS", 760, 120, { size: DS.type.body, t: W(88, 1) });
  DS.vignette(S, 0.12); }

// In twenty twelve, Jack Lissauer's team at NASA ran moonless Earths for up to four billion years.
{ const S = sc(89, 0, { cam: "push", focus: "960 500" }); DS.room(S, { wall: "glass", floor: "gray", window: false });
  DS.shape(S, rrect(400, 180, 1120, 600, DS.r.md), "gray", { tone: 2 }); DS.shape(S, rect(430, 210, 1060, 540), "navy", { flat: true, tone: 2, w: "detail" });
  for (let r = 0; r < 3; r++) for (let c = 0; c < 6; c++) { const x = 530 + c * 172, y = 320 + r * 160, t = W(89, 9) + (r * 6 + c) * 0.04; earth(S, x, y, 46, { t, tilt: [10, 30, 18, 40, 24, 14, 36, 20, 28, 12, 34, 22, 16, 38, 26, 30, 20, 44][r * 6 + c], axis: true, atmo: false }); }
  DS.shape(S, rect(900, 780, 120, 120), "gray", { tone: 2, w: "detail" });
  DS.card(S, "2012 · JACK LISSAUER'S TEAM, NASA", 960, 110, { size: DS.type.small, t: W(89, 3) });
  DS.card(S, "MOONLESS EARTHS", 560, 860, { size: DS.type.small, t: W(89, 9) });
  DS.card(S, "UP TO 4 BILLION YEARS", 1380, 860, { size: DS.type.small, t: W(89, 13), tc: "red" });
  DS.vignette(S, 0.12); }

// The tilt did wander, much more than ours does. / But over hundreds of millions of years,
{ const S = sc(90, 0, { cam: "push", focus: "960 520" }); DS.room(S, { wall: "glass", floor: "gray", window: false });
  wboard(S, 220, 180, 1480, 680);
  S.draw(line([340, 770], [1600, 770], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.mid }); S.draw(line([340, 770], [340, 260], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.mid });
  S.text("TILT", 300, 250, { size: DS.type.caption, c: DS.c("ink") });
  S.text("HUNDREDS OF MILLIONS OF YEARS →", 1580, 815, { size: DS.type.caption, anchor: "end", t: W(91, 1), c: DS.c("ink") });
  S.draw(line([340, 560], [1600, 560], 0), S.start, 0, { c: DS.c("blue"), w: DS.w.near }); S.text("OURS", 1620, 572, { size: DS.type.caption, anchor: "start", c: DS.c("blue", 2) });
  const wl = S.draw(smooth(Array.from({ length: 60 }, (_, i) => [340 + i * 21.4, 560 + 140 * Math.sin(i * 0.37) * Math.cos(i * 0.11) + 50 * Math.sin(i * 1.3)])), S.start, 0, { c: DS.c("red"), w: DS.w.near });
  wipe(wl, 330, 250, 1300, 560, W(90, 1), 2.6);
  DS.card(S, "THE TILT DID WANDER", 960, 110, { size: DS.type.body, t: W(90, 1) });
  DS.card(S, "MUCH MORE THAN OURS", 1260, 330, { size: DS.type.small, t: W(90, 4), tc: "red" });
  DS.vignette(S, 0.12); }

// it usually stayed inside a band about twenty to twenty-five degrees wide. / That's a lot wobblier than now, / but nowhere near zero to eighty-five.
{ const S = sc(91, 10, { cam: "push", focus: "800 600" }); space(S);
  const cx = 600, cy = 820, R = 600, P = (d) => [cx + R * Math.sin((d * Math.PI) / 180), cy - R * Math.cos((d * Math.PI) / 180)];
  const W0 = (d0, d1, r = R) => `M${cx} ${cy} L${cx + r * Math.sin((d0 * Math.PI) / 180)} ${cy - r * Math.cos((d0 * Math.PI) / 180)} A${r} ${r} 0 0 1 ${cx + r * Math.sin((d1 * Math.PI) / 180)} ${cy - r * Math.cos((d1 * Math.PI) / 180)} Z`;
  DS.shape(S, W0(0, 90), "white", { flat: true, op: 0.12, c: DS.c("gray", 1) });
  for (let d = 0; d <= 90; d += 10) { const [x, y] = P(d), [x2, y2] = [cx + (R - 40) * Math.sin((d * Math.PI) / 180), cy - (R - 40) * Math.cos((d * Math.PI) / 180)]; S.draw(line([x2, y2], [x, y], 0), S.start, 0, { c: DS.P.white[0], w: DS.w.detail }); }
  [[0, "0°"], [90, "90°"]].forEach(([d, s]) => { const [x, y] = P(d); S.text(s, x + (d ? 70 : 0), y - (d ? -10 : 30), { size: DS.type.caption, c: DS.P.white[0] }); });
  const red = S.draw(W0(0, 85, R - 50), S.start, 0, { c: DS.c("red", 1), w: DS.w.mid }); dashed(red, 0.01, 0.008);
  DS.shape(S, W0(12, 36, R - 50), "green", { t: W(91, 12), op: 0.85 });
  DS.shape(S, W0(22.5, 24.5, R - 50), "sky", { t: W(92, 1), w: "hair" });
  earth(S, cx, cy, 120, { tilt: 24, axis: true, atmo: false });
  xMark(S, P(70)[0] - 40, P(70)[1] + 60, 0.9, W(93, 2));
  DS.card(S, "A BAND ABOUT 20–25° WIDE", 1380, 330, { size: DS.type.small, t: W(91, 12), tc: "green" });
  DS.card(S, "A LOT WOBBLIER THAN NOW", 1380, 500, { size: DS.type.small, t: W(92, 1) });
  DS.card(S, "NOWHERE NEAR 0 TO 85°", 1380, 670, { size: DS.type.small, t: W(93, 1), tc: "red" });
  DS.vignette(S, 0.2); }

// In twenty fourteen, Gongjie Li and Konstantin Batygin agreed the chaos is real, / but slow. Too slow to rule out life.
const snail = (S, x, gy, k) => { const g = S.grp(); DS.shadow(S, x, gy, 420 * k, { parent: g });
  DS.shape(S, `M${x - 220 * k} ${gy} Q${x - 230 * k} ${gy - 60 * k} ${x - 180 * k} ${gy - 70 * k} L${x + 150 * k} ${gy - 60 * k} Q${x + 240 * k} ${gy - 70 * k} ${x + 260 * k} ${gy - 150 * k} Q${x + 300 * k} ${gy - 120 * k} ${x + 290 * k} ${gy - 40 * k} Q${x + 270 * k} ${gy} ${x + 200 * k} ${gy} Z`, "sand", { parent: g, tone: 1 });
  [[250, 268], [285, 250]].forEach(([ex, ey]) => { S.draw(line([x + (ex - 10) * k, gy - 140 * k], [x + ex * k, gy - ey * k], 0), S.start, 0, { c: DS.c("sand", 2), w: DS.w.mid, parent: g }); S.draw(circ(x + ex * k, gy - ey * k, 12 * k), S.start, 0, { c: DS.c("ink"), w: DS.w.hair, fill: DS.P.white[0], parent: g }); S.fill(circ(x + (ex + 3) * k, gy - ey * k, 5 * k), S.start, 0, DS.c("ink"), 1, g); });
  earth(S, x - 20 * k, gy - 180 * k, 150 * k, { atmo: false, parent: g, tilt: 30 });
  S.draw(smooth(Array.from({ length: 30 }, (_, i) => { const a = i * 0.42, r = 10 + i * 4.3; return [x - 20 * k + r * k * Math.cos(a), gy - 180 * k + r * k * Math.sin(a)]; })), S.start, 0, { c: DS.P.white[0], w: DS.w.detail, op: 0.6, parent: g });
  return g; };
{ const S = sc(94, 0, { cam: "push", focus: "900 640" }); land(S, { hy: 760, pal: MOONLESS(), stars: 90 });
  const G = snail(S, 820, 930, 1.0); tl.fromTo(G, { x: 0 }, { x: 90, duration: S.len, ease: "none" }, S.start);
  DS.card(S, "2014 · GONGJIE LI & KONSTANTIN BATYGIN", 960, 110, { size: DS.type.small, t: W(94, 3) });
  DS.card(S, "THE CHAOS IS REAL", 960, 240, { size: DS.type.body, t: W(94, 9) });
  DS.card(S, "BUT SLOW. TOO SLOW TO RULE OUT LIFE.", 1300, 560, { size: DS.type.small, t: W(95, 0), tc: "green" });
  DS.vignette(S, 0.18); }

// So it's still argued about. Probably wobblier, probably not wild, / and nothing you'd feel in a lifetime.
{ const S = sc(96, 0, { cam: "push", focus: "960 560" }); DS.room(S, { wall: "glass", floor: "gray", window: false });
  const cx = 960, by = 380; DS.shadow(S, cx, 960, 360); DS.shape(S, rect(cx - 16, by, 32, 560), "gold", { tone: 2 }); DS.shape(S, rrect(cx - 160, 920, 320, 40, DS.r.sm), "gold", { tone: 2 });
  const B = S.grp(); DS.shape(S, rrect(cx - 480, by - 14, 960, 28, DS.r.sm), "gold", { parent: B });
  [[-1, "PROBABLY", "WOBBLIER"], [1, "PROBABLY", "NOT WILD"]].forEach(([sd, a, b]) => { const px = cx + sd * 440; S.draw(line([px, by], [px - 120, by + 260], 0) + line([px, by], [px + 120, by + 260], 0), S.start, 0, { c: DS.c("gold", 2), w: DS.w.detail, parent: B }); DS.shape(S, `M${px - 170} ${by + 260} L${px + 170} ${by + 260} Q${px} ${by + 340} ${px - 170} ${by + 260} Z`, "gold", { parent: B });
    const tg = S.grp(B); DS.shape(S, rrect(px - 150, by + 100, 300, 130, DS.r.md), "white", { flat: true, parent: tg, t: W(96, sd < 0 ? 6 : 8) }); S.text(a, px, by + 156, { size: DS.type.caption, t: W(96, sd < 0 ? 6 : 8), c: DS.c("ink"), parent: tg }); S.text(b, px, by + 206, { size: DS.type.caption, t: W(96, sd < 0 ? 6 : 8), c: DS.c("ink"), parent: tg }); });
  tl.fromTo(B, { attr: { transform: `rotate(-4 ${cx} ${by})` } }, { attr: { transform: `rotate(4 ${cx} ${by})` }, duration: 1.3, yoyo: true, repeat: Math.ceil(S.len / 1.3), ease: "sine.inOut" }, S.start);
  DS.card(S, "STILL ARGUED ABOUT", 960, 120, { size: DS.type.body, t: W(96, 2), tc: "red" });
  DS.card(S, "NOTHING YOU'D FEEL IN A LIFETIME", 960, 840, { size: DS.type.small, t: W(97, 0) });
  DS.vignette(S, 0.12); }

// So Dave has probably not broken the seasons. Mostly.
{ const S = sc(98, 0, { cam: "push", focus: "800 620" }); bedroom(S, { moon: false });
  const F = dave(S, 760, 960, "near", { pose: "hips", mood: "smile", look: 6 });
  bed(S, 1240, 1840, 960);
  DS.card(S, "PROBABLY NOT BROKEN", 960, 120, { size: DS.type.body, t: W(98, 3), tc: "green" });
  DS.card(S, "MOSTLY.", 420, 650, { size: DS.type.body, t: W(98, 8) });
  F.face(W(98, 8), "flat", 6);
  DS.vignette(S, 0.18); }

// ===================== 6. The last line =====================
// So, what if the Moon disappeared? Would anything change, apart from the dark?
{ const S = sc(99, 0, { cam: "pull" }); space(S, { milky: [-100, 900, 2000, 100] });
  earth(S, 960, 600, 260, { night: true, nightA: 0 }); ghost(S, 1580, 300, 70);
  DS.card(S, "WHAT IF THE MOON DISAPPEARED?", 960, 110, { size: DS.type.body, t: W(99, 1) });
  DS.card(S, "WOULD ANYTHING CHANGE?", 560, 900, { size: DS.type.small, t: W(99, 6) });
  DS.card(S, "APART FROM THE DARK?", 1360, 900, { size: DS.type.small, t: W(99, 9), tc: "red" });
  DS.vignette(S, 0.2); }

// Yes. Smaller tides, confused corals, and probably a wobblier tilt over millions of years.
{ const S = sc(100, 0, { cam: "push", focus: "960 540" }); space(S);
  panel(S, 960, 560, 1300, 640, S.start);
  S.text("WITHOUT THE MOON", 960, 330, { size: DS.type.small, c: DS.c("ink") });
  [[W(100, 1), "SMALLER TIDES"], [W(100, 3), "CONFUSED CORALS"], [W(100, 7), "WOBBLIER TILT (PROBABLY)"]].forEach(([t, s], i) => { const y = 450 + i * 130;
    if (i === 0) DS.shape(S, `M520 ${y + 20} Q560 ${y - 30} 600 ${y + 20} T680 ${y + 20} L680 ${y + 46} L520 ${y + 46} Z`, "blue", { t });
    if (i === 1) coral(S, 600, y + 50, 0.32, "branch", "pink", { t });
    if (i === 2) earth(S, 600, y + 10, 46, { t, tilt: 40, axis: true, atmo: false });
    S.text(s, 700, y + 30, { size: DS.type.small, anchor: "start", t, c: DS.c("ink") }); tick(S, 1540, y + 10, 0.9, t + 0.2); });
  DS.card(S, "YES.", 960, 120, { size: DS.type.title, t: W(100, 0) });
  DS.vignette(S, 0.2); }

// But no falling sky, and the same twenty-four-hour day. Not the end of the world. Just a quieter one.
{ const S = sc(101, 0, { cam: "pull" }); land(S, { hy: 780, pal: MOONLESS(), milky: [-100, 760, 2000, -40], stars: 140 });
  house(S, 1380, 850, 0.9);
  DS.card(S, "NO FALLING SKY · SAME 24-HOUR DAY", 960, 110, { size: DS.type.small, t: W(101, 1) });
  DS.card(S, "NOT THE END OF THE WORLD", 700, 420, { size: DS.type.body, t: W(101, 9) });
  DS.card(S, "JUST A QUIETER ONE", 700, 560, { size: DS.type.body, t: W(101, 15), tc: "green" });
  DS.vignette(S, 0.18); }

// There's one more line, at the very bottom. Dave never got to it.
{ const S = sc(102, 0, { cam: "zoom", focus: "1100 820" }); wallCU(S, { state: "gone", read: 4, reef: true, ring: "ps", ringT: W(102, 5) });
  lens(S, 1500, 790, 90, W(102, 3), 30);
  DS.card(S, "ONE MORE LINE", 470, 870, { size: DS.type.small, t: W(102, 1) });
  DS.card(S, "DAVE NEVER GOT TO IT", 470, 140, { size: DS.type.small, t: W(102, 8) });
  DS.vignette(S, 0.18); }

// Most likely, four and a half billion years ago, something about the size of Mars hit the young Earth.
const theia = (S, x, y, r, o = {}) => { const g = S.grp(o.parent); DS.shape(S, circ(x, y, r), "earth", { tone: 2, parent: g }); [[-0.3, -0.2, 0.18], [0.3, 0.3, 0.14], [0.1, -0.45, 0.1], [-0.35, 0.4, 0.12]].forEach(([a, b, k]) => S.draw(circ(x + a * r, y + b * r, k * r), S.start, 0, { c: DS.c("brown"), w: DS.w.detail, parent: g })); return g; };
{ const S = sc(103, 0, { cam: "push", focus: "960 540" }); space(S);
  earth(S, 700, 600, 230, { young: true });
  const T = S.grp(); [0, 1, 2].forEach((i) => S.draw(line([1720 + i * 40, 380 + i * 50], [1960 + i * 40, 300 + i * 50], 0), S.start, 0, { c: DS.c("orange", 1), w: DS.w.mid, op: 0.6 - i * 0.15, parent: T })); theia(S, 1620, 420, 120, { parent: T });
  tl.fromTo(T, { x: 0, y: 0 }, { x: -530, y: 110, duration: W(103, 15) - W(103, 9), ease: "power2.in" }, W(103, 9));
  S.draw(rays(950, 560, 60, 200, 14), W(103, 15), 0, { c: DS.c("yellow", 1), w: DS.w.near });
  DS.card(S, "MOST LIKELY", 400, 110, { size: DS.type.small, t: W(103, 0) });
  DS.card(S, "4.5 BILLION YEARS AGO", 1100, 110, { size: DS.type.body, t: W(103, 2) });
  DS.card(S, "ABOUT THE SIZE OF MARS", 1500, 780, { size: DS.type.small, t: W(103, 9) });
  DS.vignette(S, 0.2); }

// Scientists call it Theia. The wreckage that flew off became the Moon.
{ const S = sc(104, 0, { cam: "pull" }); space(S);
  earth(S, 700, 560, 220, { young: true });
  const D = S.grp(); for (let i = 0; i < 70; i++) { const a = rnd() * Math.PI * 2, r = 330 + rnd() * 160; S.fill(circ(700 + r * Math.cos(a), 560 + r * Math.sin(a) * 0.32, 5 + rnd() * 12), S.start, 0, DS.c(i % 3 ? "earth" : "orange", i % 2 ? 2 : 1), 0.95, D); }
  spin(D, 700, 560, S.start, S.len, -14);
  S.fadeOut(D, W(104, 9), 1.0); moon(S, 1460, 420, 90, { t: W(104, 9) });
  DS.card(S, "THEIA", 700, 110, { size: DS.type.title, t: W(104, 3) });
  DS.card(S, "THE WRECKAGE BECAME THE MOON", 1400, 720, { size: DS.type.caption, t: W(104, 9) });
  DS.vignette(S, 0.2); }

// The Apollo rocks came home with the same oxygen fingerprint as Earth's.
const fprint = (S, cx, cy, t) => { const g = S.grp(); for (let i = 0; i < 9; i++) { const rx = 18 + i * 16, ry = 26 + i * 20; S.draw(arc(cx, cy, rx, 200 + (i % 3) * 20, 520 - (i % 2) * 30, ry), t ?? S.start, 0, { c: DS.c("blue", 2), w: DS.w.mid, parent: g }); } return g; };
{ const S = sc(105, 0, { cam: "push", focus: "960 520" }); DS.room(S, { wall: "glass", floor: "gray", window: false });
  DS.shadow(S, 420, 800, 300); DS.shape(S, rrect(300, 700, 240, 100, DS.r.sm), "white", { tone: 2 });
  DS.shape(S, `M330 700 Q340 600 420 590 Q510 580 520 650 Q540 700 500 700 Z`, "gray", { tone: 1 }); [[380, 640, 10], [450, 620, 8], [480, 670, 6]].forEach(([x, y, r]) => S.draw(circ(x, y, r), S.start, 0, { c: DS.c("gray", 2), w: DS.w.hair }));
  S.text("APOLLO", 420, 770, { size: DS.type.caption, c: DS.c("ink") });
  [[960, "EARTH", W(105, 7)], [1440, "MOON", W(105, 8)]].forEach(([x, s, t]) => { panel(S, x, 480, 340, 440, t); fprint(S, x, 460, t); S.text(s, x, 688, { size: DS.type.small, t, c: DS.c("ink") }); });
  S.text("=", 1200, 510, { size: DS.type.display, t: W(105, 9), c: DS.c("ink") });
  DS.card(S, "THE APOLLO ROCKS", 420, 480, { size: DS.type.small, t: W(105, 1) });
  DS.card(S, "THE SAME OXYGEN FINGERPRINT", 1200, 840, { size: DS.type.small, t: W(105, 7), tc: "green" });
  DS.vignette(S, 0.12); }

// The night-light isn't something Earth bought. It's a piece of Earth.
{ const S = sc(106, 0, { cam: "push", focus: "1100 520" }); space(S);
  earth(S, 560, 600, 250);
  moon(S, 1380, 420, 120);
  dashed(S.draw(smooth([[760, 420], [1000, 300], [1240, 380]]), W(106, 7), 0, { c: DS.P.white[0], w: DS.w.mid }), 0.02, 0.015);
  S.draw(line([1380, 540], [1420, 640], 0), S.start, 0, { c: DS.c("gray", 1), w: DS.w.detail });
  const tag = S.grp(); DS.shape(S, `M1350 640 L1560 640 L1600 700 L1560 760 L1350 760 Z`, "white", { parent: tag }); S.draw(circ(1570, 700, 10), S.start, 0, { c: DS.c("ink"), w: DS.w.detail, parent: tag });
  const b = S.text("BOUGHT?", 1460, 718, { size: DS.type.small, c: DS.c("ink"), parent: tag }); const st = S.draw(line([1370, 708], [1550, 690], 0), W(106, 5), 0, { c: DS.c("red"), w: DS.w.near, parent: tag });
  S.hide(b, W(106, 7)); S.hide(st, W(106, 7)); S.text("EARTH", 1460, 718, { size: DS.type.small, t: W(106, 7), c: DS.c("green", 2), parent: tag });
  DS.card(S, "NOT SOMETHING EARTH BOUGHT", 960, 110, { size: DS.type.small, t: W(106, 1) });
  DS.card(S, "A PIECE OF EARTH", 960, 880, { size: DS.type.body, t: W(106, 7), tc: "green" });
  DS.vignette(S, 0.2); }

// And back then, Earth spun so fast that a whole day lasted about five hours.
{ const S = sc(107, 0, { cam: "push", focus: "800 560" }); space(S);
  earth(S, 700, 600, 230, { young: true });
  spinArrow(S, 700, 600, 300, { c: "yellow", a0: 150, a1: 270, go: S.start, deg: 1100 });
  moon(S, 1240, 340, 110, { glowK: 0.3 });
  clock(S, 1460, 680, 150, 5, 0, { spin: W(107, 4), dur: S.end - W(107, 4), turns: 6 });
  DS.card(S, "BACK THEN", 700, 110, { size: DS.type.body, t: W(107, 0) });
  DS.card(S, "A DAY LASTED ABOUT 5 HOURS", 1300, 920 - 20, { size: DS.type.small, t: W(107, 9), tc: "red" });
  DS.vignette(S, 0.2); }

// Dave's twelve-hour night would have lasted about two and a half hours. // Then the Moon got to work on the brakes.
{ const S = sc(108, 0, { cam: "push", focus: "800 600" }); bedroom(S, { moon: false });
  const F = dave(S, 700, 960, "near", { pose: "hold", mood: "flat", look: 6 });
  const Sg = sign12(S, F);
  S.draw(line([Sg.cx - 150, Sg.y0 + 70], [Sg.cx + 150, Sg.y0 + 60], 0), W(108, 7), 0, { c: DS.c("red"), w: DS.w.near });
  S.text("2½", Sg.cx + 310, Sg.y0 + 140, { size: DS.type.display, t: W(108, 7), c: DS.c("red", 2) });
  F.face(W(108, 8), "wow", 6);
  const dx = 1530, dy = 560; DS.shape(S, circ(dx, dy, 200), "sky", { t: W(108, 2) }); DS.shape(S, `M${dx} ${dy - 200} A200 200 0 0 1 ${dx} ${dy + 200} Z`, "navy", { t: W(108, 2), tone: 1 });
  S.text("5-HOUR DAY", dx, dy - 230, { size: DS.type.small, t: W(108, 2), c: DS.P.white[0] }); S.text("2½ H", dx + 100, dy + 20, { size: DS.type.small, t: W(108, 7), c: DS.P.white[0] });
  spinArrow(S, dx, dy, 250, { c: "yellow", a0: -30, a1: 80, t: W(109, 1), go: W(109, 1), deg: 40 });
  DS.card(S, "DAVE'S NIGHT: ABOUT 2½ HOURS", 960, 110, { size: DS.type.body, t: W(108, 7) });
  DS.card(S, "THEN THE MOON GOT TO WORK", 1480, 860, { size: DS.type.caption, t: W(109, 1) });
  DS.vignette(S, 0.18); }

// In nineteen sixty-three, John Wells at Cornell counted daily growth lines on fossil corals older than the dinosaurs.
const sauropod = (S, x, gy, k, t) => { const c = DS.c("green", 2), g = S.grp(); S.fill(circ(x, gy - 90 * k, 120 * k, 60 * k), t, 0, c, 1, g); S.fill(`M${x + 80 * k} ${gy - 120 * k} Q${x + 160 * k} ${gy - 280 * k} ${x + 210 * k} ${gy - 290 * k} L${x + 230 * k} ${gy - 270 * k} Q${x + 170 * k} ${gy - 250 * k} ${x + 110 * k} ${gy - 80 * k} Z`, t, 0, c, 1, g); S.fill(circ(x + 230 * k, gy - 285 * k, 26 * k, 18 * k), t, 0, c, 1, g); S.fill(`M${x - 100 * k} ${gy - 110 * k} Q${x - 220 * k} ${gy - 80 * k} ${x - 300 * k} ${gy - 20 * k} L${x - 100 * k} ${gy - 60 * k} Z`, t, 0, c, 1, g); [-80, -40, 40, 80].forEach((dx) => S.fill(rect(x + dx * k - 14 * k, gy - 60 * k, 28 * k, 60 * k), t, 0, c, 1, g)); S.fill(circ(x + 238 * k, gy - 290 * k, 4 * k), t, 0, DS.P.white[0], 1, g); return g; };
{ const S = sc(110, 0, { cam: "push", focus: "800 520" }); DS.room(S, { wall: "wall", floor: "wood", window: false });
  DS.shadow(S, 760, 820, 900); DS.shape(S, rrect(260, 760, 1000, 60, DS.r.sm), "wood");
  const hx = 300, hy = 720; DS.shape(S, `M${hx} ${hy} Q${hx + 300} ${hy - 40} ${hx + 900} ${hy - 330} L${hx + 940} ${hy - 160} Q${hx + 400} ${hy + 30} ${hx} ${hy} Z`, "sand", { tone: 0 });
  for (let i = 0; i < 46; i++) { const f = i / 45, x = hx + 40 + f * 860, y0 = hy - 30 - f * f * 280, y1 = hy - 8 - f * 150; S.draw(line([x, y0 - 8], [x + 6, y1 + 6], 0), S.start, 0, { c: DS.c("brown", 1), w: DS.w.hair }); }
  lens(S, 860, 560, 110, W(110, 7), 40);
  sauropod(S, 1560, 740, 0.9, W(110, 14));
  DS.card(S, "1963 · JOHN WELLS, CORNELL", 760, 110, { size: DS.type.body, t: W(110, 3) });
  DS.card(S, "DAILY GROWTH LINES", 600, 380, { size: DS.type.small, t: W(110, 8) });
  DS.card(S, "OLDER THAN THE DINOSAURS", 1400, 300, { size: DS.type.small, t: W(110, 14) });
  DS.vignette(S, 0.12); }

// About four hundred lines per year. // The year took just as long, so each day was shorter, about twenty-two hours.
{ const S = sc(111, 0, { cam: "push", focus: "960 520" }); DS.room(S, { wall: "wall", floor: "wood", window: false });
  panel(S, 560, 480, 640, 460, S.start);
  S.text("LINES PER YEAR", 560, 340, { size: DS.type.small, c: DS.c("ink") });
  swap(S, [[S.start, "0"], [S.start + 0.4, "100"], [S.start + 0.8, "200"], [S.start + 1.2, "300"], [W(111, 2), "400"]], 560, 540, { c: DS.c("red", 2) });
  S.text("ABOUT", 560, 640, { size: DS.type.small, t: W(111, 0), c: DS.c("ink") });
  clock(S, 1380, 480, 220, 10, 0, { t: W(112, 6) });
  S.text("1 DAY", 1380, 400, { size: DS.type.caption, t: W(112, 6), c: DS.c("ink") });
  DS.card(S, "THE YEAR TOOK JUST AS LONG", 960, 110, { size: DS.type.body, t: W(112, 1) });
  DS.card(S, "SO EACH DAY: ABOUT 22 HOURS", 1380, 820, { size: DS.type.small, t: W(112, 11), tc: "red" });
  DS.vignette(S, 0.12); }

// Dave wanted twelve hours of proper dark. / The Moon has spent four and a half billion years making them.
{ const S = sc(113, 0, { cam: "zoom", focus: "1100 820" }); wallCU(S, { state: "gone", read: 4, reef: true, ps: W(114, 10), ring: "ps", ringT: W(114, 10) });
  DS.card(S, "12 HOURS OF PROPER DARK", 470, 140, { size: DS.type.caption, t: W(113, 2) });
  DS.card(S, "4.5 BILLION YEARS IN THE MAKING", 1260, 770, { size: DS.type.caption, t: W(114, 4), tc: "green" });
  DS.vignette(S, 0.18); }

// Dave turns the switch back to on. The job, it turns out, mostly does itself.
{ const S = sc(115, 0, { cam: "push", focus: "900 520" }); bedroom(S, { moon: { in: W(115, 6) }, state: "gone", flip: W(115, 6) });
  const F = dave(S, 900, 800, "mid", { armR: [[60, -10], [120, -60]], mood: "smile", look: 6 });
  bed(S, 1240, 1840, 960);
  F.face(W(115, 6), "happy", 6);
  DS.card(S, "BACK TO ON", 640, 640, { size: DS.type.body, t: W(115, 6) });
  DS.card(S, "THE JOB MOSTLY DOES ITSELF", 960, 120, { size: DS.type.body, t: W(115, 12), tc: "green" });
  DS.vignette(S, 0.18); }

// Tonight, the Moon will be about a tenth of a millimetre further away than last night.
{ const S = sc(116, 0, { cam: "pull" }); space(S, { milky: [-100, 300, 2000, 900] });
  earth(S, 520, 580, 230, { night: true, nightA: 180 });
  const M = S.grp(); moon(S, 1400, 480, 100, { parent: M }); tl.fromTo(M, { x: 0 }, { x: 6, duration: S.len, ease: "none" }, S.start);
  lens(S, 1250, 640, 80, W(116, 7), 50);
  S.text("+0.1 MM", 1250, 655, { size: DS.type.caption, t: W(116, 7), c: DS.c("ink") });
  DS.card(S, "TONIGHT", 520, 110, { size: DS.type.body, t: W(116, 0) });
  DS.card(S, "ABOUT 0.1 MM FURTHER THAN LAST NIGHT", 1100, 880, { size: DS.type.small, t: W(116, 7) });
  DS.vignette(S, 0.2); }

// And Dave will sleep through twelve hours of night, with the night-light on.
{ const S = sc(117, 0, { cam: "push", focus: "1300 640" }); bedroom(S);
  const top = bed(S, 1180, 1840, 960); sleeper(S, 1840, top);
  zzz(S, 1640, 640, S.start + 0.4);
  DS.card(S, "12 HOURS OF NIGHT", 640, 640, { size: DS.type.body, t: W(117, 5) });
  DS.card(S, "WITH THE NIGHT-LIGHT ON", 960, 120, { size: DS.type.body, t: W(117, 10), tc: "green" });
  DS.vignette(S, 0.18); }

// Not bad at all, for a lamp.
{ const S = sc(118, 0, { cam: "pull" }); land(S, { hy: 760, moon: [1260, 300, 140], milky: [-100, 700, 2000, 0], stars: 120 });
  house(S, 600, 840, 1.0);
  DS.card(S, "NOT BAD FOR A LAMP.", 1260, 600, { size: DS.type.title, t: W(118, 0) });
  DS.vignette(S, 0.16); }
