// look: still
// C (clickbait scene mode, 2026-10-20): a beach at night. Huge Dave clutches the unplugged Moon (its cord and plug
// sparking) under an empty dashed circle where it used to hang; a dung beetle and a turtle hatchling wander lost on the sand.
// Text "NO MOON?": the video's question (Dave flips the night-light to GONE; the beetle loses its moonlight compass,
// hatchlings circle more on dark nights).
// ---------- helpers (from scenes.js) ----------
const dashed = (p, a = 0.03, b = 0.022) => (p.setAttribute("stroke-dasharray", `${a} ${b}`), p);
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
const NIGHTP = () => ({ sky: [DS.P.night[2], DS.P.night[0]], far: DS.mix(DS.P.navy[1], DS.P.night[1], 0.35), mid: DS.P.navy[0], ground: [DS.P.navy[0], DS.P.navy[2]] });
const MOONLESS = () => ({ sky: [DS.P.ink[2], DS.P.navy[2]], far: DS.mix(DS.P.navy[2], DS.P.navy[1], 0.45), mid: DS.mix(DS.P.navy[2], DS.P.ink[2], 0.3), ground: [DS.P.navy[2], DS.P.ink[2]] });
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

const S = scene(0, 1, { cam: "none" });
beach(S, { hz: 520, shore: 700, glow: false });
S.fill(`M-200 700 Q 480 682 960 700 T 2120 700 L2120 1280 L-200 1280 Z`, 0, 0, DS.vgrad("#b39a72", "#7d6a52"), 1); // warmer sand
// where the Moon used to be
S.fill(circ(1640, 420, 200), 0, 0, DS.glow("#cfe0ff", 0.14), 1);
ghost(S, 1640, 420, 110, 0);
// lost on the sand: a dung beetle with its ball, a hatchling going round in circles
const Bt = beetle(S, 1330, 900, 1.25, { eye: "worried" });
dashed(S.draw(circ(1680, 860, 110, 46), 0, 0, { c: DS.P.white[0], w: DS.w.mid, op: 0.7 }));
turtle(S, 1790, 860, 1.3, 100);
// huge Dave, terrified, holding the Moon he unplugged
const F = S.fig(420, 1900, { s: 4.3, hair: "side", hairC: DS.c("brown"), outfit: "tee", outfitC: DS.c("blue"), breathe: false,
  armL: [[-62, 4], [-26, -50]], armR: [[22, 46], [56, 34]] }).instant(0);
F.face(0, "wow", 8);
S.fill(circ(860, 830, 640), 0, 0, DS.glow("#ffe9a8", 0.6), 1); // the Moon lights the sand
moon(S, 860, 820, 205, { glowK: 0.5 });
// its cord + plug, sparking
S.draw(smooth([[1030, 920], [1110, 990], [1180, 960], [1230, 1010]]), 0, 0, { c: DS.c("ink"), w: 14 });
DS.shape(S, rrect(1210, 990, 80, 56, DS.r.xs), "gray", { tone: 1, w: "mid" });
[[1300, 1000], [1300, 1030]].forEach(([x, y]) => DS.shape(S, rect(x - 10, y - 6, 40, 12), "gold", { w: "detail" }));
S.burst(1380, 1015, 30, 70, 7, 0, 0, { c: DS.c("yellow"), w: 9 });
S.drop(680, 420, 3.0, 0, 0.1); S.drop(150, 520, 2.2, 0, 0.1);
S.text("NO MOON?", 960, 215, { size: 215, c: "#FEFE06", halo: "#111111", haloW: 0.09 });
