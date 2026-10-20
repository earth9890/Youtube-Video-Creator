// look: still
// The Overview Effect (~8:44). Mission: Dave wants to see the Earth from space and "come home different"; a seat costs $450,000 and he saves $200 a month.
// Runner diagram: THE OVERVIEW LADDER, a log-altitude ladder that gains a rung per section: plane window, Gagarin, the Moon, Apollo 17, Voyager 1, back down to Shatner's ~100 km (Dave's rung), then a new bottom rung: one hill, 200 m.
// Runner objects: Dave's SPACE FUND jar; the sales pitch's red "ONLY" (struck out at the twist); colour film (Gagarin wanted it, Anders nearly missed loading it).
// Real people are labelled generic figures or name cards, never likenesses. Earthrise, the Blue Marble and the Pale Blue Dot are drawn in our own style, not copied.

// ---------- people ----------
// a figure on a depth plane; shadow and body share one group (F.all). o.float = no contact shadow (in space, in a lens)
const who = (S, x, gy, layer = "near", o = {}) => {
  const s = (o.s || 1.1) * DS.depth[layer].s, g = o.parent || S.grp();
  if (!o.float) DS.shadow(S, x, o.gs ?? gy, 150 * s, { t: o.t, parent: g });
  const F = S.fig(x, gy, Object.assign({ hair: "short", outfit: "tee" }, o, { s, parent: g, w: DS.w[DS.depth[layer].w] * 1.3 * Math.sqrt(s) })).draw(o.t ?? S.start, 0.4);
  F.face(o.t ?? S.start, o.mood || "flat", o.look || 0);
  F.all = g;
  return F;
};
const dave = (S, x, gy, layer = "near", o = {}) => who(S, x, gy, layer, Object.assign({ s: 1.1, hair: "side", hairC: DS.c("brown"), outfitC: DS.c("blue") }, o));
const OC = ["green", "purple", "orange", "pink", "gold", "red", "earth", "gray", "yellow"]; // no blue: blue is Dave's
const HAIR = ["short", "bun", "curly", "side", "messy", "short", "bun", "curly"];
const HC = [["brown", 0], ["ink", 0], ["gray", 1], ["earth", 2], ["brown", 2], ["gray", 2], ["earth", 0], ["ink", 1]];
const person = (S, x, gy, layer, i, o = {}) => who(S, x, gy, layer, Object.assign({ s: 1.1, hair: HAIR[i % 8], hairC: DS.c(HC[i % 8][0], HC[i % 8][1], layer), outfitC: DS.c(OC[i % 9], 0, layer), mood: "flat", look: ((i % 3) - 1) * 5 }, o));
const elder = (S, x, gy, layer, i, o = {}) => person(S, x, gy, layer, i, Object.assign({ hairC: DS.c("gray", i % 2, layer), hair: ["short", "bun", "curly"][i % 3] }, o));
// the generic "you" of the hook and the ending
const YOU = { hair: "curly", hairC: DS.c("ink"), outfitC: DS.c("orange") };
// labelled generic figures for real people (no likenesses): one fixed colour kit each
const FW = { hair: "short", hairC: DS.c("brown", 2), outfitC: DS.c("green") };       // Frank White, writer
const GAG = { hair: "short", hairC: DS.c("brown", 2), outfitC: DS.c("navy", 1) };    // Yuri Gagarin (uniform)
const ANDERS = { hairC: DS.c("ink") }, BORMAN = { hairC: DS.c("brown") }, LOVELL = { hairC: DS.c("gray", 1) };
const SAGAN = { hair: "side", hairC: DS.c("ink"), outfitC: DS.c("earth") };
const SHAT = { hair: "short", hairC: DS.c("gray", 1), outfitC: DS.c("navy") };        // William Shatner, aged 90
const SCI = { hair: "bun", hairC: DS.c("brown", 2), outfitC: DS.c("white") };        // a researcher in a lab coat
// suited astronaut: white suit, helmet as an outline ring (never a fill over the face), collar ring
const astro = (S, x, gy, layer = "near", o = {}) => {
  const F = who(S, x, gy, layer, Object.assign({ hair: "short", hairC: DS.c("brown", 2), outfitC: DS.c("white", 2) }, o));
  const [hx, hy] = F.hd, R = F.r, t = o.t ?? S.start, w = F.s > 0.7 ? DS.w.mid : DS.w.detail;
  DS.shape(S, rrect(hx - R * 0.95, hy + R * 0.9, R * 1.9, R * 0.42, DS.r.sm), "gray", { t: o.t, w: "detail", parent: F.g });
  if (o.helmet !== false) { S.draw(circ(hx, hy, R * 1.36), t, 0, { c: DS.c("gray", 1), w, parent: F.g }); S.draw(arc(hx, hy, R * 1.2, 205, 250), t, 0, { c: DS.P.white[0], w: DS.w.detail, parent: F.g }); }
  return F;
};
const seated = (S, x, top, o = {}) => (o.fn || who)(S, x, top + 50, "near", Object.assign({ sit: true, pose: "hold" }, o));
const kneel = (S, x, ground, side, i, o = {}) => person(S, x, ground - 62 * 1.1 * DS.depth[o.layer || "near"].s, o.layer || "near", i, Object.assign({ sit: true, gs: ground, legL: [[34 * side, 62], [-26 * side, 72]], legR: [[56 * side, 8], [62 * side, 72]], pose: side > 0 ? "reach" : "reachL", look: 6 * side, mood: "flat" }, o));

// ---------- small kit ----------
let CP = 0;
const clipTo = (g, d) => { const id = "cp" + ++CP, cp = el("clipPath", { id }, dsDefs()); el("path", { d }, cp); g.setAttribute("clip-path", `url(#${id})`); return g; };
// seek-safe rotation of a group about a fixed point (attr transform tween)
const spin = (g, t, dur, d0, d1, cx, cy, ease = "power2.inOut") => tl.fromTo(g, { attr: { transform: `rotate(${d0} ${cx} ${cy})` } }, { attr: { transform: `rotate(${d1} ${cx} ${cy})` }, duration: dur, ease }, t);
// slow drift + turn for floating things (zero gravity)
const drift = (g, t, dur, dx, dy, deg, cx, cy) => tl.fromTo(g, { attr: { transform: `translate(0 0) rotate(0 ${cx} ${cy})` } }, { attr: { transform: `translate(${dx} ${dy}) rotate(${deg} ${cx} ${cy})` }, duration: dur, ease: "sine.inOut" }, t);
const dash = (p, a, b) => { p.removeAttribute("pathLength"); p.setAttribute("stroke-dasharray", `${a} ${b}`); return p; };
const txt = (S, s, x, y, o = {}) => S.text(s, x, y, Object.assign({ size: DS.type.caption, c: DS.c("ink") }, o));
const panel = (S, cx, cy, w, h, t, name = "white") => { DS.drop(S, rrect(cx - w / 2 + 8, cy - h / 2 + 12, w, h, DS.r.md), { t }); DS.shape(S, rrect(cx - w / 2, cy - h / 2, w, h, DS.r.md), name, { t, flat: true, w: "detail" }); };
const say = (S, cx, cy, rx, ry, tx, ty, strs, t, o = {}) => {
  const g = S.grp(); (o.think ? S.thought : S.speech)(cx, cy, rx, ry, tx, ty, t, 0.3, { parent: g });
  const size = o.size || DS.type.small, n = strs.length;
  strs.forEach((s, i) => S.text(s, cx, cy + size * 0.36 + (i - (n - 1) / 2) * size * 1.2, { size, t, c: o.c ? DS.c(o.c, 2) : DS.c("ink"), parent: g }));
  return g;
};
// quote panel: lines of a real quote + who said it. o.ts = per-line times
const quote = (S, cx, cy, strs, by, o = {}) => {
  const t = o.t, g = S.grp(), size = o.size || DS.type.small, lh = size * 1.25, n = strs.length;
  const w = Math.max(...strs.map((s) => s.length)) * size * 0.62 + 130, h = n * lh + (by ? 66 : 0) + 64, y0 = cy - h / 2;
  DS.drop(S, rrect(cx - w / 2 + 8, y0 + 12, w, h, DS.r.md), { t, parent: g });
  DS.shape(S, rrect(cx - w / 2, y0, w, h, DS.r.md), "white", { t, flat: true, w: "detail", parent: g });
  DS.shape(S, rect(cx - w / 2 + 22, y0 + 26, 10, n * lh), "blue", { t, flat: true, w: "hair", parent: g });
  strs.forEach((s, i) => S.text(s, cx + 14, y0 + 30 + lh * (i + 0.78), { size, t: (o.ts || [])[i] ?? t, c: DS.c("ink"), parent: g }));
  if (by) S.text(by, cx + 14, y0 + h - 30, { size: DS.type.caption, t, c: DS.c("blue", 2), parent: g });
  return g;
};
const wboard = (S, x, y, w, h) => { DS.drop(S, rect(x + 8, y + 10, w, h)); DS.shape(S, rrect(x, y, w, h, DS.r.sm), "wood", { layer: "mid" }); DS.shape(S, rect(x + 22, y + 22, w - 44, h - 44), "white", { layer: "mid", w: "detail", flat: true }); };
const desk = (S, x, gy, w) => { DS.shadow(S, x + w / 2, gy, w); DS.shape(S, rrect(x, gy - 230, w, 40, DS.r.xs), "wood"); [x + 30, x + w - 50].forEach((lx) => DS.shape(S, rect(lx, gy - 190, 20, 190), "wood", { w: "mid" })); return gy - 230; };
const table = (S, x0, x1, top, gy = 960) => { DS.shadow(S, (x0 + x1) / 2, gy, x1 - x0 + 60); DS.shape(S, rect(x0 + 24, top + 20, x1 - x0 - 48, gy - top - 20), "wood", { tone: 2 }); DS.shape(S, rrect(x0, top, x1 - x0, 28, DS.r.xs), "wood"); return top; };
const paperR = (S, x, y, w, h, o = {}) => { DS.drop(S, rect(x + 6, y + 8, w, h), { t: o.t, parent: o.parent }); DS.shape(S, rect(x, y, w, h), "white", { t: o.t, w: "detail", flat: true, parent: o.parent }); };
const lines = (S, x, y, w, n, t, gap = 36, parent) => { for (let i = 0; i < n; i++) S.draw(line([x, y + i * gap], [x + (i === n - 1 ? w * 0.6 : w), y + i * gap], 0), t ?? S.start, 0, { c: DS.c("gray", 1), w: DS.w.detail, parent }); };
const tick = (S, x, y, k, t, name = "green") => S.tick(x, y, k, t, 0, { c: DS.c(name), w: DS.w.near });
const xMark = (S, x, y, k, t) => S.cross(x, y, k, t, 0, { c: DS.c("red"), w: DS.w.near });
const stamp = (S, cx, cy, str, t, name = "red") => {
  const g = S.grp(), w = str.length * DS.type.small * 0.66 + 60, tf = (k) => `translate(${cx} ${cy}) rotate(-8) scale(${k}) translate(${-cx} ${-cy})`;
  S.draw(rrect(cx - w / 2, cy - 46, w, 92, DS.r.sm), S.start, 0, { c: DS.c(name, 2), w: DS.w.near, fill: DS.P.white[0], parent: g });
  S.text(str, cx, cy + 19, { size: DS.type.small, t: S.start, c: DS.c(name, 2), parent: g });
  tl.fromTo(g, { opacity: 0, attr: { transform: tf(1.4) } }, { opacity: 1, attr: { transform: tf(1) }, duration: 0.25, ease: "power3.in" }, t);
};
const nightWin = (S, x, y, w, h) => {
  DS.shape(S, rrect(x - 14, y - 14, w + 28, h + 28, DS.r.xs), "white", { w: "detail" });
  DS.shape(S, rect(x, y, w, h), "night", { flat: true, tone: 2, w: "hair" });
  [[0.2, 0.2], [0.35, 0.62], [0.15, 0.8], [0.5, 0.14], [0.82, 0.72], [0.7, 0.3]].forEach(([a, b]) => S.fill(circ(x + w * a, y + h * b, 4), S.start, 0, DS.P.white[0], 0.85));
  S.draw(`M${x + w / 2} ${y} V${y + h} M${x} ${y + h / 2} H${x + w}`, S.start, 0, { c: DS.P.white[0], w: DS.w.mid });
};
const puff = (S, cx, cy, k, t, o = {}) => { const g = S.grp(o.parent); [[0, 0, 40], [-34, 10, 28], [34, 12, 30], [-10, -26, 26], [18, -22, 24]].forEach(([dx, dy, r]) => S.fill(circ(cx + dx * k, cy + dy * k, r * k), t ?? S.start, 0, o.c || DS.P.white[0], o.op ?? 0.92, g)); return g; };
const stopwatch = (S, cx, cy, r, o = {}) => {
  const t = o.t;
  DS.shape(S, rrect(cx - 18, cy - r - 46, 36, 34, DS.r.xs), "gray", { t, tone: 2, w: "detail" });
  DS.shape(S, circ(cx, cy, r), "white", { t });
  S.draw(rays(cx, cy, r * 0.8, r * 0.92, 12, -Math.PI / 2), t ?? S.start, 0, { c: DS.c("ink"), w: DS.w.detail });
  const hand = S.draw(line([cx, cy], [cx, cy - r * 0.75], 0), t ?? S.start, 0, { c: DS.c("red"), w: DS.w.near });
  tl.to(hand, { rotation: o.turn ?? 300, svgOrigin: `${cx} ${cy}`, duration: o.dur || 4, ease: "none" }, o.go ?? S.start);
  DS.shape(S, circ(cx, cy, 10), "ink", { t, w: "hair" });
};
const tape = (S, cx, cy, k, o = {}) => {
  const t = o.t, g = S.grp(o.parent);
  DS.drop(S, rrect(cx - 90 * k + 6, cy - 70 * k + 8, 180 * k, 140 * k, DS.r.sm), { t, parent: g });
  DS.shape(S, rrect(cx - 90 * k, cy - 70 * k, 180 * k, 140 * k, DS.r.sm), "gray", { t, parent: g });
  [-1, 1].forEach((sd) => {
    const rg = S.grp(g), x = cx + sd * 42 * k, y = cy - 16 * k;
    DS.shape(S, circ(x, y, 34 * k), "ink", { t, w: "detail", parent: rg });
    S.draw(rays(x, y, 8 * k, 28 * k, 3), t ?? S.start, 0, { c: DS.c("gray", 1), w: DS.w.detail, parent: rg });
    tl.to(rg, { rotation: 360 * Math.max(1, Math.round(S.len / 3)), svgOrigin: `${x} ${y}`, duration: S.len, ease: "none" }, S.start);
  });
  [-36, -12, 12, 36].forEach((dx) => DS.shape(S, rrect(cx + dx * k - 9 * k, cy + 34 * k, 18 * k, 18 * k, DS.r.xs), "ink", { t, w: "hair", parent: g }));
  return g;
};
const house = (S, x, gy, k = 1, o = {}) => {
  const t = o.t; DS.shadow(S, x, gy, 360 * k, { t });
  DS.shape(S, rect(x - 150 * k, gy - 230 * k, 300 * k, 230 * k), "wall", { t, dir: "h" });
  DS.shape(S, poly([[x - 185 * k, gy - 220 * k], [x, gy - 360 * k], [x + 185 * k, gy - 220 * k]], 0) + " Z", "brown", { t });
  DS.shape(S, rrect(x - 40 * k, gy - 130 * k, 80 * k, 130 * k, DS.r.xs), "wood", { t, w: "mid" });
  [x + 60 * k, x - 124 * k].forEach((wx) => DS.shape(S, rect(wx, gy - 184 * k, 64 * k, 60 * k), "glass", { t, w: "mid" }));
};
const ROOM = { home: { wall: "wall", floor: "wood", window: [1380, 170, 220, 200] }, office: { wall: "paper", floor: "wood", window: false }, lab: { wall: "glass", floor: "gray", window: false },
  night: { wall: "night", floor: "wood", window: false }, gallery: { wall: "paper", floor: "gray", window: false } };
const GN = 960;

// ---------- space kit (our own drawings, not copies of the photos) ----------
const STAR = Array.from({ length: 140 }, (_, i) => [((i * 733 + 151) % 1880) + 20, ((i * 397 + 67) % 1040) + 20, 1.6 + (i % 3) * 0.9, 0.4 + ((i * 7) % 6) * 0.1]);
const SPACE = { hy: 1400, sky: "navy", sun: false };
// deep space over a DS.outdoor navy sky: darker gradient + fixed stars
const space = (S, O, o = {}) => {
  S.fill(rect(-200, -200, 2320, 1480), S.start, 0, DS.vgrad(DS.P.ink[2], DS.P.navy[2]), o.deep ?? 0.72);
  STAR.slice(0, o.n ?? 70).forEach(([x, y, r, op]) => S.fill(circ(x, y, r), S.start, 0, DS.P.white[0], op));
  return O;
};
const MOONO = { hy: 1400, sky: "navy", sun: false };
const moonSurface = (S, O, hy = 790) => {
  space(S, O);
  DS.shape(S, smooth([[-200, hy - 10], [380, hy - 34], [900, hy], [1420, hy - 26], [2120, hy - 6]]) + " L2120 1280 L-200 1280 Z", "gray", { dir: "v" });
  [[300, hy + 70, 120], [1180, hy + 50, 90], [760, hy + 160, 170], [1600, hy + 130, 110], [120, hy + 220, 140]].forEach(([x, y, r]) => DS.shape(S, circ(x, y, r, r * 0.22), "gray", { flat: true, tone: 2, w: "hair" }));
  return O;
};
let LIMB;
const limb = () => { if (!LIMB) { LIMB = "ds-limb"; const gr = el("radialGradient", { id: LIMB, cx: 0.42, cy: 0.4, r: 0.62 }, dsDefs()); [[0.55, 0], [1, 0.5]].forEach(([of, a]) => el("stop", { offset: of, "stop-color": DS.P.navy[2], "stop-opacity": a }, gr)); } return `url(#${LIMB})`; };
// unit-circle continents of a north-up whole Earth: Africa, Sahara, Arabia, Madagascar, Antarctica + cloud bands
const AFR = [[-0.36, -0.46], [-0.1, -0.52], [0.16, -0.47], [0.27, -0.34], [0.46, -0.13], [0.37, -0.05], [0.29, 0.18], [0.17, 0.42], [0.03, 0.58], [-0.06, 0.5], [-0.1, 0.26], [-0.14, 0.05], [-0.28, -0.02], [-0.47, -0.1], [-0.52, -0.3]];
const SAH = [[-0.42, -0.36], [-0.1, -0.45], [0.15, -0.4], [0.2, -0.26], [0.02, -0.16], [-0.3, -0.13], [-0.44, -0.22]];
const ARB = [[0.31, -0.52], [0.47, -0.47], [0.66, -0.29], [0.6, -0.19], [0.5, -0.16], [0.37, -0.36]];
const MAD = [[0.37, 0.27], [0.43, 0.31], [0.41, 0.45], [0.34, 0.46], [0.33, 0.35]];
const ANT = [[-1.2, 0.84], [-0.6, 0.76], [-0.1, 0.8], [0.4, 0.74], [1.2, 0.82], [1.2, 1.3], [-1.2, 1.3]];
const CLD = [[[-0.92, 0.66], [-0.5, 0.6], [-0.1, 0.69], [0.32, 0.62], [0.86, 0.68]], [[-0.84, 0.5], [-0.56, 0.44], [-0.3, 0.5]], [[0.52, 0.06], [0.68, -0.04], [0.8, 0.1], [0.68, 0.22], [0.58, 0.12]],
  [[-0.78, -0.12], [-0.62, -0.24], [-0.72, 0.02]], [[-0.66, -0.66], [-0.3, -0.72], [0.18, -0.7], [0.6, -0.62]], [[0.02, 0.1], [0.14, 0.04], [0.24, 0.12]], [[-0.5, -0.86], [0, -0.92], [0.4, -0.84]]];
const halfShadow = (cx, cy, r, deg, kk) => {
  const a = (deg * Math.PI) / 180, u = [Math.cos(a), Math.sin(a)], v = [-u[1], u[0]], P = [];
  for (let i = 0; i <= 28; i++) { const th = (i / 28) * Math.PI; P.push([cx + r * 1.02 * (Math.cos(th) * v[0] - Math.sin(th) * u[0]), cy + r * 1.02 * (Math.cos(th) * v[1] - Math.sin(th) * u[1])]); }
  for (let i = 28; i >= 0; i--) { const th = (i / 28) * Math.PI; P.push([cx + r * Math.cos(th) * v[0] - kk * r * Math.sin(th) * u[0], cy + r * Math.cos(th) * v[1] - kk * r * Math.sin(th) * u[1]]); }
  return P;
};
// o: { t, parent, lit: "full" | "half", light (deg toward the Sun), k (terminator bulge), shift: [dx, dy] land offset in radii, halo, mono (black and white) }
const earth = (S, cx, cy, r, o = {}) => {
  const T = o.t ?? S.start, g = S.grp(o.parent), [sx, sy] = o.shift || [0, 0], U = (pts) => pts.map(([a, b]) => [cx + (a + sx) * r, cy + (b + sy) * r]);
  const N = (n) => (o.mono ? { blue: "gray", grass: "white", sand: "white", sky: "white" }[n] || n : n), lw = r < 60 ? DS.w.detail : DS.w.mid;
  if (r < 14) { S.fill(circ(cx, cy, r), T, 0, DS.c("sky", 1), 1, g); return { g, cx, cy, r }; }
  if (o.halo !== false) S.fill(circ(cx, cy, r * 1.06), T, 0, DS.c(N("sky"), 1), 0.4, g);
  S.draw(circ(cx, cy, r), T, 0, { fill: o.mono ? DS.c("gray", 2) : DS.vol("blue"), c: DS.c("ink"), w: lw, parent: g });
  const k = clipTo(S.grp(g), circ(cx, cy, r));
  const land = (pts, n) => S.draw(smooth(U(pts)) + " Z", T, 0, { fill: DS.c(N(n)), c: DS.c(N(n), 2), w: DS.w.hair, parent: k });
  land(AFR, "grass"); land(SAH, "sand"); land(ARB, "sand"); land(MAD, "grass"); land(ANT, "white");
  if (r >= 30) CLD.forEach((p) => S.draw(smooth(U(p)), T, 0, { c: DS.P.white[0], w: r > 200 ? DS.w.near : r > 70 ? DS.w.mid : DS.w.detail, parent: k, op: 0.85 }));
  if (o.lit === "half") S.fill(poly(halfShadow(cx, cy, r, o.light ?? 200, o.k ?? 0.15), 0) + " Z", T, 0, DS.c("navy", 2), 0.84, k);
  else S.fill(circ(cx, cy, r), T, 0, limb(), 1, k);
  S.draw(circ(cx, cy, r), T, 0, { c: DS.c("ink"), w: lw, parent: g });
  return { g, cx, cy, r };
};
const CRAT = [[-0.35, -0.25, 0.2], [0.3, 0.1, 0.14], [-0.05, 0.42, 0.12], [0.38, -0.4, 0.09], [-0.5, 0.25, 0.08], [0.1, -0.12, 0.07]];
const moon = (S, cx, cy, r, o = {}) => { const g = S.grp(o.parent); DS.shape(S, circ(cx, cy, r), "gray", { t: o.t, parent: g, w: r < 60 ? "detail" : "mid" }); CRAT.forEach(([a, b, k]) => DS.shape(S, circ(cx + a * r, cy + b * r, k * r), "gray", { t: o.t, flat: true, w: "hair", parent: g })); return g; };
const sunGlow = (S, x, y, r, t) => { S.fill(circ(x, y, r * 3), t ?? S.start, 0, DS.glow(DS.P.yellow[1], 0.8), 1); S.fill(circ(x, y, r), t ?? S.start, 0, DS.P.white[0], 1); };
// our Earthrise: black sky, a half-lit Earth over a grey lunar horizon. o: { round, earth: false, rise: [t, dur], mono, hz, ey }
const earthrise = (S, x, y, w, h, o = {}) => {
  const T = o.t ?? S.start, g = S.grp(o.parent), k = clipTo(S.grp(g), o.round ? rrect(x, y, w, h, DS.r.lg) : rect(x, y, w, h)), inner = S.grp(k);
  S.fill(rect(x - w, y - h, w * 3, h * 3), T, 0, DS.c("ink", 2), 1, inner);
  STAR.slice(0, 24).forEach(([sx, sy, r, op]) => S.fill(circ(x + (sx / 1920) * w, y + (sy / 1080) * h * 0.66, Math.max(1.2, (r * w) / 1500)), T, 0, DS.P.white[0], op * 0.8, inner));
  let E = null;
  if (o.earth !== false) {
    E = earth(S, x + w * (o.ex ?? 0.52), y + h * (o.ey ?? 0.38), h * 0.17, { t: o.t, parent: inner, lit: "half", light: 205, k: 0.12, mono: o.mono, halo: !o.mono });
    if (o.rise) tl.fromTo(E.g, { y: h * 0.5 }, { y: 0, duration: o.rise[1], ease: "power1.out" }, o.rise[0]);
  }
  const R = w * 2.4, gy = y + h * (o.hz ?? 0.7);
  S.draw(circ(x + w * 0.5, gy + R, R), T, 0, { fill: o.mono ? DS.c("gray", 1) : DS.vol("gray", "near", "v"), c: DS.c("ink"), w: w > 500 ? DS.w.mid : DS.w.detail, parent: inner });
  [[0.2, 0.07, 0.08], [0.62, 0.12, 0.11], [0.86, 0.06, 0.05], [0.4, 0.22, 0.14]].forEach(([a, b, rr]) => S.fill(circ(x + w * a, gy + h * b, w * rr, w * rr * 0.2), T, 0, DS.c("gray", 2), 0.8, inner));
  return { g, E, inner, cx: x + w / 2, cy: y + h / 2 };
};
// our Pale Blue Dot: dark frame, camera-artifact sunbeams, one pale dot in a beam
const pbd = (S, x, y, w, h, o = {}) => {
  const T = o.t ?? S.start, g = S.grp(o.parent), k = clipTo(S.grp(g), rect(x, y, w, h));
  S.fill(rect(x, y, w, h), T, 0, DS.c("ink", 2), 1, k);
  [[0.16, 0.1, "orange", 0.16], [0.42, 0.16, "sand", 0.24], [0.64, 0.08, "orange", 0.14], [0.82, 0.12, "pink", 0.12]].forEach(([f, bw, n, op]) => { const x0 = x + w * f; S.fill(poly([[x0 - w * 0.25, y - 10], [x0 - w * 0.25 + w * bw, y - 10], [x0 + w * 0.25 + w * bw, y + h + 10], [x0 + w * 0.25, y + h + 10]], 0) + " Z", T, 0, DS.c(n, 1), op, k); });
  const dx = x + w * (o.fx ?? 0.5), dy = y + h * (o.fy ?? 0.55);
  if (o.dot !== false) S.fill(circ(dx, dy, o.dr ?? Math.max(2.5, w / 200)), T, 0, DS.c("sky", 1), 1, k);
  S.draw(rect(x, y, w, h), T, 0, { c: DS.c("ink"), w: w > 400 ? DS.w.mid : DS.w.detail, parent: g });
  return { g, dx, dy };
};
const vostok = (S, cx, cy, k = 1, o = {}) => {
  const t = o.t, g = S.grp();
  DS.shape(S, poly([[cx + 40 * k, cy - 30 * k], [cx + 150 * k, cy - 54 * k], [cx + 150 * k, cy + 54 * k], [cx + 40 * k, cy + 30 * k]], 0) + " Z", "gray", { t, parent: g });
  DS.shape(S, circ(cx, cy, 58 * k), "white", { t, parent: g });
  DS.shape(S, circ(cx - 18 * k, cy - 12 * k, 15 * k), "sky", { t, w: "detail", parent: g });
  [[-40, -40, -96, -96], [-30, 44, -84, 100]].forEach(([a, b, c, d]) => S.draw(line([cx + a * k, cy + b * k], [cx + c * k, cy + d * k], 0), t ?? S.start, 0, { c: DS.c("gray", 1), w: DS.w.detail, parent: g }));
  return g;
};
const apollo = (S, cx, cy, k = 1, o = {}) => {
  const t = o.t, g = S.grp();
  DS.shape(S, poly([[cx - 30 * k, cy + 150 * k], [cx - 46 * k, cy + 200 * k], [cx + 46 * k, cy + 200 * k], [cx + 30 * k, cy + 150 * k]], 0) + " Z", "gray", { t, tone: 2, flat: true, parent: g });
  DS.shape(S, rect(cx - 56 * k, cy + 10 * k, 112 * k, 140 * k), "gray", { t, parent: g, dir: "h" });
  DS.shape(S, poly([[cx - 62 * k, cy + 12 * k], [cx - 14 * k, cy - 92 * k], [cx + 14 * k, cy - 92 * k], [cx + 62 * k, cy + 12 * k]], 0) + " Z", "white", { t, parent: g });
  DS.shape(S, circ(cx - 16 * k, cy - 24 * k, 9 * k), "sky", { t, w: "hair", parent: g });
  return g;
};
// Voyager-style probe: dish, ten-sided bus, booms, camera platform (cam = [x, y] of the lens)
const voyager = (S, cx, cy, k = 1, o = {}) => {
  const t = o.t, T = t ?? S.start, g = S.grp(o.parent), wd = k > 0.6 ? DS.w.mid : DS.w.detail;
  S.draw(line([cx, cy + 60 * k], [cx - 300 * k, cy + 190 * k], 0), T, 0, { c: DS.c("gray", 1), w: wd, parent: g });
  S.draw(line([cx, cy + 60 * k], [cx + 250 * k, cy + 150 * k], 0), T, 0, { c: DS.c("gray", 1), w: wd, parent: g });
  DS.shape(S, rrect(cx + 230 * k, cy + 130 * k, 70 * k, 44 * k, DS.r.xs), "gray", { t, w: "detail", parent: g });
  S.draw(line([cx, cy + 60 * k], [cx + 170 * k, cy - 40 * k], 0), T, 0, { c: DS.c("gray", 1), w: wd, parent: g });
  DS.shape(S, rrect(cx + 150 * k, cy - 84 * k, 80 * k, 56 * k, DS.r.xs), "gray", { t, w: "detail", parent: g });
  DS.shape(S, circ(cx + 230 * k, cy - 56 * k, 16 * k), "ink", { t, w: "detail", parent: g });
  DS.shape(S, poly(Array.from({ length: 10 }, (_, i) => [cx + Math.cos((i * Math.PI) / 5) * 60 * k, cy + 70 * k + Math.sin((i * Math.PI) / 5) * 40 * k]), 0) + " Z", "gold", { t, parent: g });
  DS.shape(S, circ(cx, cy - 10 * k, 170 * k, 70 * k), "white", { t, parent: g, dir: "v" });
  S.draw(circ(cx, cy - 10 * k, 110 * k, 44 * k), T, 0, { c: DS.c("gray", 1), w: DS.w.detail, parent: g });
  DS.shape(S, circ(cx, cy - 14 * k, 18 * k, 10 * k), "gray", { t, w: "detail", parent: g });
  return { g, cam: [cx + 230 * k, cy - 56 * k] };
};

// ---------- the runner: THE OVERVIEW LADDER (log altitude: 200 m at the foot, 6 billion km at the top) ----------
const LSKY = { hy: 1400, sky: "navy", sun: false };
const LX = 900;
const LY = (m) => 880 - ((Math.log10(m) - 2) / 11) * 680;
const HW = (y) => 52 + ((y - 96) / 834) * 44;
const RUNG = { hill: [200, "ONE HILL · 200 M", -1, 0], plane: [1e4, "PLANE WINDOW · ABOUT 10 KM", 1, 0], shatner: [1e5, "SHATNER · ABOUT 100 KM", -1, 0], gagarin: [3e5, "GAGARIN · ABOUT 300 KM", 1, -6],
  a17: [2.9e7, "APOLLO 17 · ABOUT 29,000 KM", 1, 14], moon: [3.8e8, "APOLLO 8 · THE MOON", 1, -14], voyager: [6e12, "VOYAGER 1 · 6 BILLION KM", 1, 0] };
const rtag = (S, x, y, str, side, o = {}) => {
  const size = DS.type.caption, w = str.length * size * 0.6 + 44, h = 58, x0 = side > 0 ? x : x - w, g = S.grp();
  DS.drop(S, rrect(x0 + 4, y - h / 2 + 6, w, h, DS.r.sm), { t: o.t, parent: g });
  S.draw(rrect(x0, y - h / 2, w, h, DS.r.sm), o.t ?? S.start, 0, { fill: o.hi ? DS.c("gold", 1) : DS.P.white[0], c: DS.P.ink[0], w: DS.w.detail, parent: g });
  S.text(str, x0 + w / 2, y + size * 0.36, { size, t: o.t, c: DS.P.ink[0], parent: g });
  return { g, x1: x0 + w, x0 };
};
// o.rungs = { key: true (already there) | time (appears then, gold) }
const ladder = (S, O, o = {}) => {
  const id = "lsky" + ++CP, gr = el("linearGradient", { id, x1: 0, y1: 0, x2: 0, y2: 1 }, dsDefs());
  [[0, DS.P.ink[2]], [0.4, DS.P.navy[2]], [0.62, DS.P.night[0]], [0.77, DS.P.sky[0]]].forEach(([of, c]) => el("stop", { offset: of, "stop-color": c }, gr));
  S.fill(rect(-200, -200, 2320, 1480), S.start, 0, `url(#${id})`, 1);
  STAR.filter(([, y]) => y < 520).forEach(([x, y, r, op]) => S.fill(circ(x, y, r), S.start, 0, DS.P.white[0], op));
  [[280, 820, 1.3], [1600, 790, 1.0], [1300, 850, 0.8]].forEach(([x, y, k]) => puff(S, x, y, k));
  DS.shape(S, smooth([[-200, 935], [500, 908], [1000, 918], [1500, 900], [2120, 925]]) + " L2120 1280 L-200 1280 Z", "grass");
  const yT = 96, yB = 930;
  [-1, 1].forEach((sd) => DS.shape(S, poly([[LX + sd * (HW(yT) - 8), yT], [LX + sd * (HW(yT) + 8), yT], [LX + sd * (HW(yB) + 12), yB], [LX + sd * (HW(yB) - 12), yB]], 0) + " Z", "wood", { dir: "h" }));
  const R = {};
  Object.entries(o.rungs || {}).forEach(([key, tt]) => {
    const [m, str, side, off] = RUNG[key], y = LY(m), hw = HW(y), t = tt === true ? undefined : tt, hi = tt !== true;
    DS.shape(S, rrect(LX - hw - 4, y - 9, hw * 2 + 8, 18, DS.r.xs), hi ? "gold" : "wood", { t, tone: 1, flat: true, w: "detail" });
    R[key] = rtag(S, side > 0 ? LX + hw + 30 : LX - hw - 30, y + off, str, side, { t, hi });
    R[key].y = y + off;
  });
  return R;
};
// mini Dave standing on a rung; o.to + o.at = climb to another rung
const climber = (S, from, o = {}) => {
  const y0 = LY(RUNG[from][0]) - 9, F = dave(S, LX, y0, "near", Object.assign({ s: 0.42, mood: "determined", look: 0 }, o));
  if (o.to) S.move(F.all, o.at, o.dur || 1.0, { y: LY(RUNG[o.to][0]) - 9 - y0 }, "power2.inOut");
  return F;
};

// ---------- Dave's props ----------
// the SPACE FUND jar; base = bottom y
const jar = (S, cx, base, k = 1, o = {}) => {
  const t = o.t, T = t ?? S.start, g = S.grp(o.parent), w = 170 * k, h = 200 * k, x = cx - w / 2, y = base - h, ww = k < 0.8 ? DS.w.detail : DS.w.mid;
  DS.shadow(S, cx, base, w * 1.15, { t, parent: g });
  S.fill(rrect(x, y, w, h, DS.r.lg), T, 0, DS.c("glass", 1), 0.95, g);
  for (let i = 0; i < (o.coins ?? 4); i++) DS.shape(S, circ(cx + ((i % 3) - 1) * 44 * k, base - 24 * k - Math.floor(i / 3) * 18 * k, 26 * k, 10 * k), "gold", { t, w: "detail", parent: g });
  S.draw(line([x + 24 * k, y + 40 * k], [x + 24 * k, y + h - 50 * k], 0), T, 0, { c: DS.P.white[0], w: ww, parent: g });
  S.draw(rrect(x, y, w, h, DS.r.lg), T, 0, { c: DS.c("ink"), w: ww, parent: g });
  DS.shape(S, rrect(x + 14 * k, y - 26 * k, w - 28 * k, 34 * k, DS.r.sm), "blue", { t, w: "detail", parent: g });
  if (o.label !== false && k >= 0.95) {
    DS.shape(S, rect(x + 8 * k, y + 50 * k, w - 16 * k, 92 * k), "white", { t, flat: true, w: "detail", parent: g });
    S.text("SPACE", cx, y + 50 * k + 40 * k, { size: DS.type.caption, t, c: DS.c("ink"), parent: g });
    S.text("FUND", cx, y + 50 * k + 80 * k, { size: DS.type.caption, t, c: DS.c("ink"), parent: g });
  }
  return g;
};
const coin = (S, x, y, t, k = 1) => DS.shape(S, circ(x, y, 26 * k, 10 * k), "gold", { t, w: "detail" });
// the sales pitch: a glossy brochure; ONLY is the runner word. o.ts = line times
const PITCH = ["THE PERSPECTIVE", "THAT CAN", "ONLY", "COME FROM SEEING OUR", "BEAUTIFUL PLANET", "FROM SPACE."];
const PY = [262, 312, 442, 526, 582, 638];
const pitch = (S, cx, cy, o = {}) => {
  const w = 640, h = 720, x = cx - w / 2, y = cy - h / 2, g = S.grp(), t = o.t, T = t ?? S.start;
  DS.drop(S, rrect(x + 10, y + 14, w, h, DS.r.md), { t, parent: g });
  DS.shape(S, rrect(x, y, w, h, DS.r.md), "white", { t, flat: true, w: "mid", parent: g });
  const hg = clipTo(S.grp(g), rrect(x + 24, y + 24, w - 48, 170, DS.r.sm));
  S.fill(rect(x, y, w, 220), T, 0, DS.c("navy", 2), 1, hg);
  STAR.slice(0, 16).forEach(([sx, sy, r]) => S.fill(circ(x + 30 + (sx / 1920) * (w - 60), y + 30 + (sy / 1080) * 90, r * 0.8), T, 0, DS.P.white[0], 0.8, hg));
  S.fill(circ(cx, y + 194 + 430, 470), T, 0, DS.c("sky", 1), 0.6, hg);
  S.fill(circ(cx, y + 194 + 440, 460), T, 0, DS.c("blue"), 1, hg);
  DS.shape(S, `M${cx + 40} ${y + 88} L${cx + 150} ${y + 80} Q${cx + 180} ${y + 84} ${cx + 186} ${y + 92} Q${cx + 180} ${y + 100} ${cx + 150} ${y + 102} L${cx + 40} ${y + 100} Z`, "white", { t, w: "detail", parent: hg });
  S.draw(rrect(x + 24, y + 24, w - 48, 170, DS.r.sm), T, 0, { c: DS.c("ink"), w: DS.w.detail, parent: g });
  PITCH.forEach((s, i) => S.text(s, cx, y + PY[i], { size: i === 2 ? DS.type.display : DS.type.caption, t: (o.ts || [])[i] ?? t, c: i === 2 ? DS.c("red", 2) : DS.c("ink"), parent: g }));
  return { g, only: [cx, y + PY[2] - 38], view: [x + w - 60, y + 60], x, y, w, h };
};
const ticket = (S, cx, cy, k = 1, o = {}) => {
  const t = o.t, g = S.grp(), w = 330 * k, h = 140 * k;
  DS.drop(S, rrect(cx - w / 2 + 6, cy - h / 2 + 8, w, h, DS.r.sm), { t, parent: g });
  DS.shape(S, rrect(cx - w / 2, cy - h / 2, w, h, DS.r.sm), "gold", { t, tone: 1, flat: true, w: "detail", parent: g });
  const p = S.draw(line([cx + w * 0.22, cy - h / 2 + 8], [cx + w * 0.22, cy + h / 2 - 8], 0), t ?? S.start, 0, { c: DS.c("ink"), w: DS.w.detail, parent: g }); dash(p, 6, 8);
  S.text(o.str || "$450,000", cx - w * 0.14, cy + 15, { size: DS.type.caption, t, c: DS.c("ink"), parent: g });
  if (o.rot) g.setAttribute("transform", `rotate(${o.rot} ${cx} ${cy})`);
  return g;
};
const priceTag = (S, x, y, str, t) => {
  const size = DS.type.title, w = str.length * size * 0.62 + 100, h = size * 1.45, g = S.grp(), tx = x + 40, ty = y + 70;
  S.draw(smooth([[x, y], [x + 10, y + 40], [tx + 40, ty + h / 2]]), t, 0, { c: DS.c("ink"), w: DS.w.detail, parent: g });
  DS.drop(S, `M${tx + 6} ${ty + h / 2 + 8} L${tx + 56} ${ty + 8} H${tx + w + 6} V${ty + h + 8} H${tx + 56} Z`, { t, parent: g });
  DS.shape(S, `M${tx} ${ty + h / 2} L${tx + 50} ${ty} H${tx + w} V${ty + h} H${tx + 50} Z`, "white", { t, flat: true, w: "mid", parent: g });
  S.draw(circ(tx + 40, ty + h / 2, 10), t, 0, { c: DS.c("ink"), w: DS.w.detail, parent: g });
  S.text(str, tx + 60 + (w - 60) / 2, ty + h / 2 + size * 0.36, { size, t, c: DS.c("red", 2), parent: g });
  return g;
};
const spaceplane = (S, cx, cy, k = 1, o = {}) => {
  const t = o.t, g = S.grp(), X = (v) => cx + v * k, Y = (v) => cy + v * k;
  DS.shape(S, `M${X(-170)} ${Y(26)} L${X(30)} ${Y(26)} L${X(-70)} ${Y(150)} L${X(-230)} ${Y(150)} Z`, "gray", { t, parent: g });
  DS.shape(S, `M${X(-336)} ${Y(-12)} L${X(-306)} ${Y(-132)} L${X(-252)} ${Y(-132)} L${X(-214)} ${Y(-24)} Z`, "white", { t, parent: g });
  DS.shape(S, `M${X(-340)} ${Y(-20)} Q${X(-340)} ${Y(-48)} ${X(-280)} ${Y(-50)} L${X(200)} ${Y(-46)} Q${X(330)} ${Y(-34)} ${X(360)} ${Y(4)} Q${X(330)} ${Y(36)} ${X(200)} ${Y(40)} L${X(-280)} ${Y(36)} Q${X(-340)} ${Y(32)} ${X(-340)} ${Y(-20)} Z`, "white", { t, parent: g, dir: "v" });
  DS.shape(S, `M${X(276)} ${Y(-37)} Q${X(330)} ${Y(-30)} ${X(360)} ${Y(4)} Q${X(330)} ${Y(30)} ${X(276)} ${Y(36)} Z`, "ink", { t, parent: g, w: "detail" });
  const win = []; for (let i = 0; i < 6; i++) { const wx = X(-200 + i * 70), wy = Y(-6); win.push([wx, wy]); DS.shape(S, circ(wx, wy, 16 * k), "sky", { t, w: "detail", parent: g }); }
  return { g, win };
};

// ---------- the plane cabin (Frank White's window seat) ----------
const CABIN = { back: [60, 60, 1860, 900], wall: "white", floor: "navy", window: false };
const cabin = (S, o = {}) => {
  DS.shape(S, rect(60, 60, 1800, 130), "white", { tone: 1, layer: "mid", flat: true, w: "detail" });
  [480, 900, 1320].forEach((x) => S.draw(line([x, 70], [x, 185], 0), S.start, 0, { c: DS.line("mid"), w: DS.w.hair }));
  (o.wins || [260, 1320]).forEach((wx) => {
    DS.shape(S, rrect(wx - 22, 238, 244, 324, DS.r.lg), "white", { tone: 2, flat: true, w: "detail", layer: "mid" });
    const k = clipTo(S.grp(), rrect(wx, 260, 200, 280, DS.r.lg));
    S.fill(rect(wx, 260, 200, 280), S.start, 0, DS.vgrad(DS.c("sky", 0), DS.c("sky", 1)), 1, k);
    const land = S.grp(k);
    [["grass", 0], ["sand", 1], ["grass", 1], ["earth", 1], ["sand", 0]].forEach(([n, tn], i) => S.fill(rect(wx - 60 + i * 70, 450 + (i % 2) * 20, 72, 120), S.start, 0, DS.c(n, tn, "far"), 1, land));
    const cl = S.grp(k); puff(S, wx + 60, 400, 0.9, S.start, { parent: cl }); puff(S, wx + 170, 350, 0.7, S.start, { parent: cl });
    S.move(cl, S.start, S.len, { x: -70 }, "none"); S.move(land, S.start, S.len, { x: -30 }, "none");
    S.draw(rrect(wx, 260, 200, 280, DS.r.lg), S.start, 0, { c: DS.c("ink"), w: DS.w.mid });
  });
};
// airline seat, front view (draw the sitter after it); returns the cushion top
const seat = (S, x, gy, k = 1, o = {}) => {
  const t = o.t; DS.shadow(S, x, gy, 280 * k, { t });
  DS.shape(S, rrect(x - 115 * k, gy - 440 * k, 230 * k, 340 * k, DS.r.lg), "navy", { t });
  DS.shape(S, rrect(x - 74 * k, gy - 476 * k, 148 * k, 74 * k, DS.r.md), "white", { t, flat: true, tone: 2, w: "detail" });
  DS.shape(S, rect(x - 12 * k, gy - 80 * k, 24 * k, 80 * k), "gray", { t, tone: 2, flat: true, w: "detail" });
  DS.shape(S, rrect(x - 125 * k, gy - 150 * k, 250 * k, 76 * k, DS.r.md), "navy", { t });
  [x - 150 * k, x + 122 * k].forEach((ax) => DS.shape(S, rrect(ax, gy - 214 * k, 28 * k, 120 * k, DS.r.xs), "gray", { t, w: "detail" }));
  return gy - 140 * k;
};

// ---------- Apollo 8 interior ----------
const CAPS = { back: [220, 90, 1700, 860], wall: "gray", floor: "navy", window: false };
const capsule = (S, o = {}) => {
  DS.shape(S, rrect(300, 610, 1320, 250, DS.r.md), "gray", { tone: 2, flat: true, w: "mid", layer: "mid" });
  for (let r = 0; r < 3; r++) for (let c = 0; c < 18; c++) { const x = 340 + c * 70, y = 646 + r * 66;
    if ((r * 5 + c * 3) % 7 === 0) DS.shape(S, circ(x + 18, y + 16, 17), "white", { flat: true, tone: 2, w: "detail", layer: "mid" });
    else DS.shape(S, rrect(x, y, 34, 26, DS.r.xs), "gray", { flat: true, tone: (r + c) % 2, w: "hair", layer: "mid" }); }
  [[520, 652], [1110, 718], [1450, 652]].forEach(([x, y]) => S.fill(circ(x, y, 8), S.start, 0, DS.c("yellow", 1), 1));
  const [x, y, w, h] = o.win || [660, 150, 600, 400];
  DS.shape(S, rrect(x - 26, y - 26, w + 52, h + 52, DS.r.lg), "gray", { tone: 1, layer: "mid" });
  const V = earthrise(S, x, y, w, h, Object.assign({ round: true }, o.view || {}));
  S.draw(rrect(x, y, w, h, DS.r.lg), S.start, 0, { c: DS.c("ink"), w: DS.w.mid });
  if (o.win2) { DS.shape(S, rrect(150, 210, 340, 280, DS.r.lg), "gray", { tone: 1, layer: "mid" }); earthrise(S, 170, 230, 300, 240, { round: true, ey: 0.36 }); S.draw(rrect(170, 230, 300, 240, DS.r.lg), S.start, 0, { c: DS.c("ink"), w: DS.w.mid }); }
  return V;
};
const camera = (S, cx, cy, k = 1, o = {}) => {
  const t = o.t, g = S.grp(o.parent);
  DS.shape(S, rrect(cx - 70 * k, cy - 92 * k, 140 * k, 40 * k, DS.r.xs), "ink", { t, w: "detail", parent: g });
  DS.shape(S, rrect(cx - 70 * k, cy - 60 * k, 140 * k, 120 * k, DS.r.sm), "gray", { t, parent: g, w: k < 0.8 ? "detail" : "mid" });
  DS.shape(S, circ(cx, cy, 42 * k), "ink", { t, w: "detail", parent: g });
  S.fill(circ(cx - 12 * k, cy - 12 * k, 11 * k), t ?? S.start, 0, DS.c("glass", 1), 0.8, g);
  return g;
};
// a roll of 35 mm film: colour (striped canister) or black and white
const film = (S, cx, cy, k = 1, o = {}) => {
  const t = o.t, T = t ?? S.start, g = S.grp(), c = o.colour !== false;
  DS.shape(S, rect(cx + 40 * k, cy - 34 * k, 160 * k, 68 * k), c ? "orange" : "gray", { t, flat: true, tone: c ? 2 : 1, w: "detail", parent: g });
  for (let i = 0; i < 5; i++) [-26, 18].forEach((dy) => S.fill(rect(cx + 60 * k + i * 28 * k, cy + dy * k, 12 * k, 8 * k), T, 0, DS.P.white[0], 0.9, g));
  DS.shape(S, rrect(cx - 30 * k, cy - 106 * k, 60 * k, 30 * k, DS.r.xs), "ink", { t, w: "detail", parent: g });
  DS.shape(S, rrect(cx - 62 * k, cy - 82 * k, 124 * k, 164 * k, DS.r.sm), c ? "yellow" : "gray", { t, parent: g });
  if (c) ["red", "green", "blue"].forEach((n, i) => DS.shape(S, rect(cx - 62 * k, cy - 30 * k + i * 22 * k, 124 * k, 22 * k), n, { t, flat: true, w: "hair", parent: g }));
  else S.text("B&W", cx, cy + 14 * k, { size: DS.type.caption, t, c: DS.c("ink"), parent: g });
  return g;
};

// ---------- other props ----------
const book = (S, cx, cy, w, h, strs, o = {}) => {
  const t = o.t, g = S.grp();
  DS.drop(S, rrect(cx - w / 2 + 8, cy - h / 2 + 10, w, h, DS.r.xs), { t, parent: g });
  DS.shape(S, rrect(cx - w / 2, cy - h / 2, w, h, DS.r.xs), o.name || "navy", { t, parent: g });
  DS.shape(S, rect(cx - w / 2 + 14, cy - h / 2, 16, h), o.name || "navy", { t, tone: 2, flat: true, w: "hair", parent: g });
  strs.forEach((s, i) => S.text(s, cx + 10, cy - h / 2 + 70 + i * 50, { size: DS.type.caption, t, c: DS.P.white[0], parent: g }));
  if (o.earth !== false) earth(S, cx + 10, cy + h * 0.24, w * 0.22, { t, parent: g });
  return g;
};
const colony = (S, cx, cy, k, t) => {
  const g = S.grp();
  DS.shape(S, rrect(cx - 150 * k, cy - 56 * k, 300 * k, 112 * k, DS.r.lg), "gray", { t, parent: g, dir: "v" });
  [-90, -30, 30, 90].forEach((dx) => DS.shape(S, rect(cx + dx * k - 16 * k, cy - 50 * k, 32 * k, 100 * k), "glass", { t, flat: true, w: "hair", parent: g }));
  [-1, 1].forEach((sd) => DS.shape(S, poly([[cx - 140 * k, cy + sd * 50 * k], [cx - 40 * k, cy + sd * 120 * k], [cx + 40 * k, cy + sd * 120 * k], [cx + 140 * k, cy + sd * 50 * k]], 0) + " Z", "glass", { t, tone: 2, flat: true, w: "detail", parent: g }));
  return g;
};
const helmetIcon = (S, x, y, r, t) => { S.draw(circ(x, y, r), t ?? S.start, 0, { fill: DS.c("glass", 1), c: DS.c("gray", 2), w: DS.w.mid }); S.draw(arc(x, y, r * 0.8, 205, 255), t ?? S.start, 0, { c: DS.P.white[0], w: DS.w.detail }); DS.shape(S, rrect(x - r * 0.8, y + r * 0.85, r * 1.6, r * 0.34, DS.r.xs), "gray", { t, w: "detail" }); };
const rocketIcon = (S, cx, cy, k, t) => {
  DS.shape(S, poly([[cx - 12 * k, cy + 30 * k], [cx, cy + 56 * k], [cx + 12 * k, cy + 30 * k]], 0) + " Z", "orange", { t, w: "detail" });
  [-1, 1].forEach((sd) => DS.shape(S, poly([[cx + sd * 18 * k, cy + 6 * k], [cx + sd * 36 * k, cy + 34 * k], [cx + sd * 14 * k, cy + 28 * k]], 0) + " Z", "gray", { t, w: "detail" }));
  DS.shape(S, circ(cx, cy, 20 * k, 40 * k), "white", { t, w: "detail" });
  DS.shape(S, circ(cx, cy - 4 * k, 8 * k), "sky", { t, w: "hair" });
};
const heart = (S, cx, cy, k, t) => S.heart(cx, cy, k, t, 0, { fill: DS.c("red"), c: DS.c("ink"), w: DS.w.detail });
const eyeIcon = (S, cx, cy, k, t) => { DS.shape(S, `M${cx - 60 * k} ${cy} Q${cx} ${cy - 50 * k} ${cx + 60 * k} ${cy} Q${cx} ${cy + 50 * k} ${cx - 60 * k} ${cy} Z`, "white", { t, flat: true, w: "mid" }); DS.shape(S, circ(cx, cy, 22 * k), "blue", { t, w: "detail" }); S.fill(circ(cx, cy, 9 * k), t ?? S.start, 0, DS.c("ink"), 1); };
// tall eucalyptus: pale trunk off the top of the frame, crown at y0
const tree = (S, x, gy, w, y0, o = {}) => {
  DS.shadow(S, x, gy, w * 2.4);
  DS.shape(S, poly([[x - w / 2, gy], [x - w * 0.36, y0], [x + w * 0.36, y0], [x + w / 2, gy]], 0) + " Z", "white", { dir: "h", tone: 2, layer: o.layer || "near" });
  [0.3, 0.55, 0.75].forEach((f, i) => S.draw(line([x - w * 0.1 + i * 8, gy - (gy - y0) * f], [x + w * 0.06 + i * 6, gy - (gy - y0) * (f + 0.12)], 0), S.start, 0, { c: DS.c("gray", 1), w: DS.w.detail }));
  [[-1.6, 0, 1.1], [1.5, -10, 1.0], [0, -60, 1.3], [-0.8, 60, 0.9], [0.9, 50, 0.95]].forEach(([dx, dy, k], i) => DS.shape(S, circ(x + dx * w, y0 + dy, 110 * k * (o.k || 1), 80 * k * (o.k || 1)), "green", { flat: true, tone: i % 3 === 1 ? 1 : i % 3 === 2 ? 2 : 0, w: "mid" }));
};
const roundTree = (S, x, gy, k = 1, o = {}) => { DS.shadow(S, x, gy, 220 * k, { t: o.t }); DS.shape(S, rect(x - 22 * k, gy - 300 * k, 44 * k, 300 * k), "wood", { t: o.t, dir: "h" }); [[0, -380, 150], [-110, -300, 110], [110, -300, 110]].forEach(([dx, dy, r]) => DS.shape(S, circ(x + dx * k, gy + dy * k, r * k), "green", { t: o.t })); };
const building = (S, x, gy, w, h) => { DS.shadow(S, x + w / 2, gy, w + 30); DS.shape(S, rect(x, gy - h, w, h), "gray", { dir: "h" }); for (let r = 0; r < Math.floor((h - 60) / 80); r++) for (let c = 0; c < Math.floor((w - 30) / 70); c++) S.fill(rect(x + 26 + c * 70, gy - h + 40 + r * 80, 38, 50), S.start, 0, DS.c("glass", 2), 1); };
const PENC = ["red", "blue", "green", "orange", "purple", "yellow", "pink"];
const pens = (S, x, y, n, t, spread = 300) => { for (let i = 0; i < n; i++) { const px = x + ((i * 97) % spread) - spread / 2, py = y + ((i * 41) % 60), a = ((i * 53) % 180) - 90, g = S.grp(); DS.shape(S, rrect(px - 34, py - 6, 68, 12, DS.r.xs), PENC[i % 7], { t: t + i * 0.03, w: "detail", parent: g }); g.setAttribute("transform", `rotate(${a} ${px} ${py})`); } };
const coinStack = (S, x, gy, n, t) => { DS.shadow(S, x, gy, 120, { t }); for (let i = 0; i < n; i++) DS.shape(S, circ(x, gy - 10 - i * 16, 50, 14), "gold", { t: t + i * 0.02, w: "detail" }); };
// phone with a selfie on it: sky, hills, a face of radius r at the bottom
const selfie = (S, cx, cy, w, h, r, o = {}) => {
  const t = o.t, T = t ?? S.start, g = S.grp();
  DS.drop(S, rrect(cx - w / 2 + 8, cy - h / 2 + 12, w, h, DS.r.lg), { t, parent: g });
  DS.shape(S, rrect(cx - w / 2, cy - h / 2, w, h, DS.r.lg), "ink", { t, w: "mid", parent: g });
  const x0 = cx - w / 2 + 16, y0 = cy - h / 2 + 40, ww = w - 32, hh = h - 80, k = clipTo(S.grp(g), rect(x0, y0, ww, hh));
  S.fill(rect(x0, y0, ww, hh), T, 0, o.night ? DS.vgrad(DS.c("ink", 2), DS.c("night")) : DS.vgrad(DS.c("sky", 0), DS.c("sky", 1)), 1, k);
  if (o.night) STAR.slice(0, 40).forEach(([sx, sy, rr, op]) => S.fill(circ(x0 + (sx / 1920) * ww, y0 + (sy / 1080) * hh * 0.8, rr * 0.8), T, 0, DS.P.white[0], op, k));
  else DS.shape(S, smooth([[x0 - 20, y0 + hh * 0.55], [x0 + ww * 0.3, y0 + hh * 0.38], [x0 + ww * 0.6, y0 + hh * 0.5], [x0 + ww + 20, y0 + hh * 0.36]]) + ` L${x0 + ww + 20} ${y0 + hh + 20} L${x0 - 20} ${y0 + hh + 20} Z`, "grass", { t, flat: true, w: "detail", parent: k });
  if (o.night) DS.shape(S, smooth([[x0 - 20, y0 + hh * 0.86], [x0 + ww * 0.5, y0 + hh * 0.78], [x0 + ww + 20, y0 + hh * 0.86]]) + ` L${x0 + ww + 20} ${y0 + hh + 20} L${x0 - 20} ${y0 + hh + 20} Z`, "grass", { t, flat: true, tone: 2, w: "detail", parent: k });
  return { g, k, x0, y0, ww, hh, fx: cx, fy: y0 + hh - r * 0.9 };
};
const selfieFace = (S, cx, cy, r, big, t, parent) => {
  const T = t ?? S.start, g = S.grp(parent), lw = r > 60 ? DS.w.mid : DS.w.detail;
  S.draw(circ(cx, cy, r), T, 0, { fill: DS.P.white[0], c: DS.c("ink"), w: lw, parent: g });
  S.draw(smooth([...arcPts(cx, cy, r * 1.04, 190, 350, 10), [cx + r * 0.6, cy - r * 0.55], [cx, cy - r * 0.7], [cx - r * 0.6, cy - r * 0.55]]) + " Z", T, 0, { fill: DS.c("gray", 1), c: DS.c("ink"), w: lw, parent: g });
  [-1, 1].forEach((sd) => S.fill(circ(cx + sd * r * 0.32, cy - r * 0.02, r * 0.09), T, 0, DS.c("ink"), 1, g));
  if (big) S.draw(smooth([[cx - r * 0.42, cy + r * 0.24], [cx, cy + r * 0.66], [cx + r * 0.42, cy + r * 0.24]]) + " Z", T, 0, { fill: DS.c("red", 2), c: DS.c("ink"), w: lw, parent: g });
  else S.draw(smooth([[cx - r * 0.26, cy + r * 0.34], [cx, cy + r * 0.44], [cx + r * 0.26, cy + r * 0.34]]), T, 0, { c: DS.c("ink"), w: lw, parent: g });
  return g;
};
const rocket = (S, cx, gy, k = 1, o = {}) => {
  const t = o.t, g = S.grp();
  if (o.flame !== undefined) { DS.shape(S, poly([[cx - 40 * k, gy], [cx, gy + 190 * k], [cx + 40 * k, gy]], 0) + " Z", "orange", { t: o.flame, w: "detail", parent: g }); DS.shape(S, poly([[cx - 20 * k, gy], [cx, gy + 110 * k], [cx + 20 * k, gy]], 0) + " Z", "yellow", { t: o.flame, w: "hair", parent: g }); }
  [-1, 1].forEach((sd) => DS.shape(S, poly([[cx + sd * 40 * k, gy - 90 * k], [cx + sd * 80 * k, gy], [cx + sd * 40 * k, gy]], 0) + " Z", "gray", { t, parent: g }));
  DS.shape(S, rrect(cx - 44 * k, gy - 470 * k, 88 * k, 470 * k, DS.r.sm), "white", { t, parent: g, dir: "h" });
  DS.shape(S, rect(cx - 44 * k, gy - 480 * k, 88 * k, 18 * k), "navy", { t, parent: g, w: "detail" });
  DS.shape(S, `M${cx - 54 * k} ${gy - 480 * k} L${cx - 54 * k} ${gy - 540 * k} Q${cx} ${gy - 600 * k} ${cx + 54 * k} ${gy - 540 * k} L${cx + 54 * k} ${gy - 480 * k} Z`, "white", { t, parent: g });
  [-24, 24].forEach((dx) => DS.shape(S, circ(cx + dx * k, gy - 530 * k, 10 * k, 14 * k), "sky", { t, w: "hair", parent: g }));
  return g;
};
const landed = (S, cx, gy, k = 1) => {
  DS.shadow(S, cx, gy, 300 * k);
  DS.shape(S, smooth([[cx + 60 * k, gy], [cx + 120 * k, gy - 110 * k], [cx + 260 * k, gy - 130 * k], [cx + 330 * k, gy - 40 * k], [cx + 300 * k, gy]]) + " Z", "orange", { flat: true, tone: 1 });
  S.draw(smooth([[cx + 150 * k, gy - 100 * k], [cx + 200 * k, gy - 40 * k], [cx + 240 * k, gy]]), S.start, 0, { c: DS.P.white[0], w: DS.w.mid });
  DS.shape(S, `M${cx - 110 * k} ${gy} L${cx - 110 * k} ${gy - 100 * k} Q${cx} ${gy - 210 * k} ${cx + 110 * k} ${gy - 100 * k} L${cx + 110 * k} ${gy} Z`, "white", {});
  [-50, 0, 50].forEach((dx) => DS.shape(S, circ(cx + dx * k, gy - 110 * k, 14 * k, 18 * k), "sky", { w: "detail" }));
  DS.shape(S, rect(cx - 120 * k, gy - 22 * k, 240 * k, 22 * k), "gray", { tone: 2, flat: true, w: "detail" });
};
const tv = (S, cx, cy, k = 1, o = {}) => {
  const w = 520 * k, h = 330 * k;
  [-1, 1].forEach((sd) => S.draw(line([cx + sd * 60 * k, cy + h / 2], [cx + sd * 120 * k, cy + h / 2 + 90 * k], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.mid }));
  DS.shape(S, rrect(cx - w / 2, cy - h / 2, w, h, DS.r.sm), "ink", { w: "mid" });
  const k2 = clipTo(S.grp(), rect(cx - w / 2 + 20, cy - h / 2 + 20, w - 40, h - 40));
  S.fill(rect(cx - w / 2, cy - h / 2, w, h), S.start, 0, DS.c("night", 2), 1, k2);
  STAR.slice(0, 30).forEach(([sx, sy, r]) => S.fill(circ(cx - w / 2 + (sx / 1920) * w, cy - h / 2 + (sy / 1080) * h, r * 0.7), S.start, 0, DS.P.white[0], 0.8, k2));
  const sh = S.grp(k2), X = (v) => cx + v * k, Y = (v) => cy + v * k;
  DS.shape(S, `M${X(-170)} ${Y(-10)} L${X(140)} ${Y(-40)} L${X(190)} ${Y(0)} L${X(140)} ${Y(40)} L${X(-170)} ${Y(14)} Z`, "white", { parent: sh, dir: "v" });
  DS.shape(S, `M${X(-120)} ${Y(-8)} L${X(-190)} ${Y(-70)} L${X(-140)} ${Y(-70)} L${X(-40)} ${Y(-18)} Z`, "gray", { parent: sh, w: "detail" });
  S.fill(circ(X(-180), Y(2), 22 * k), S.start, 0, DS.c("orange", 1), 1, sh);
  S.move(sh, S.start, S.len, { x: 40 * k }, "none");
};
const flask = (S, cx, base, k = 1, t) => { DS.shadow(S, cx, base, 90 * k, { t }); DS.shape(S, rrect(cx - 30 * k, base - 170 * k, 60 * k, 170 * k, DS.r.md), "green", { t }); DS.shape(S, rrect(cx - 34 * k, base - 200 * k, 68 * k, 40 * k, DS.r.sm), "gray", { t, tone: 2 }); };
const bus = (S, x, gy, k = 1) => {
  DS.shadow(S, x, gy, 560 * k);
  DS.shape(S, rrect(x - 280 * k, gy - 250 * k, 560 * k, 210 * k, DS.r.md), "orange", { dir: "v" });
  for (let i = 0; i < 6; i++) DS.shape(S, rect(x - 250 * k + i * 82 * k, gy - 220 * k, 64 * k, 70 * k), "yellow", { flat: true, tone: 1, w: "detail" });
  [-170, 170].forEach((dx) => DS.shape(S, circ(x + dx * k, gy - 40 * k, 40 * k), "ink", { w: "detail" }));
  S.fill(circ(x + 270 * k, gy - 90 * k, 12 * k), S.start, 0, DS.c("yellow", 1), 1);
};
const TOWN = Array.from({ length: 110 }, (_, i) => [(i * 137) % 1000, (i * 53) % 190, 3 + (i % 3) * 1.5]);
const townLights = (S, x0, y0, t, k = 1, parent) => TOWN.forEach(([dx, dy, r], i) => S.fill(circ(x0 + dx * k, y0 + dy * k, r * Math.sqrt(k)), (t ?? S.start) + (t ? (i % 9) * 0.05 : 0), 0, DS.c(i % 4 ? "orange" : "yellow", 1), 0.95, parent));
const hand = (S, tx, ty, o = {}) => {
  const t = o.t, g = S.grp();
  DS.shape(S, rrect(tx + 130, ty - 46, 1000, 100, DS.r.lg), o.sleeve || "purple", { t, parent: g });
  DS.shape(S, rrect(tx + 40, ty - 54, 130, 116, DS.r.lg), "white", { t, parent: g });
  DS.shape(S, rrect(tx, ty - 16, 96, 32, DS.r.md), "white", { t, parent: g });
  return g;
};
const jet = (S, cx, cy, k = 1) => {
  const X = (v) => cx + v * k, Y = (v) => cy + v * k;
  DS.shape(S, `M${X(-80)} ${Y(4)} L${X(70)} ${Y(4)} L${X(-130)} ${Y(170)} L${X(-220)} ${Y(170)} Z`, "gray", { flat: true, tone: 2 });
  DS.shape(S, `M${X(-310)} ${Y(-14)} L${X(-340)} ${Y(-140)} L${X(-280)} ${Y(-140)} L${X(-210)} ${Y(-20)} Z`, "gray", {});
  DS.shape(S, `M${X(-320)} ${Y(-22)} L${X(200)} ${Y(-28)} Q${X(330)} ${Y(-12)} ${X(370)} ${Y(0)} Q${X(330)} ${Y(12)} ${X(200)} ${Y(26)} L${X(-320)} ${Y(22)} Z`, "gray", { dir: "v" });
  DS.shape(S, `M${X(-10)} ${Y(18)} L${X(140)} ${Y(18)} L${X(-30)} ${Y(-170)} L${X(-110)} ${Y(-170)} Z`, "gray", {});
  DS.shape(S, circ(X(160), Y(-30), 64 * k, 26 * k), "glass", { w: "detail" });
  helmetIcon(S, X(150), Y(-34), 14 * k);
};

const CUES = [[1, 0], [3, 0], [4, 0], [5, 0], [7, 0], [9, 0], [11, 0], [12, 0], [14, 0], [16, 0], [18, 0], [20, 0], [21, 0], [22, 0], [24, 0], [26, 0], [27, 0], [28, 0], [30, 0], [32, 0],
  [34, 0], [35, 0], [37, 0], [39, 0], [40, 0], [42, 0], [43, 0], [45, 0], [47, 0], [49, 0], [51, 0], [52, 0], [53, 0], [55, 0], [57, 0], [58, 0], [59, 0], [60, 0], [61, 0], [63, 0],
  [64, 0], [65, 0], [67, 0], [68, 0], [70, 0], [72, 0], [74, 0], [76, 0], [77, 0], [79, 0], [80, 0], [82, 0], [85, 0], [86, 0], [88, 0], [90, 0], [91, 0], [92, 0], [93, 0], [95, 0],
  [96, 0], [98, 0], [99, 0], [100, 0], [101, 0], [103, 0], [106, 0], [109, 0], [110, 0], [111, 0], [113, 0], [115, 0], [116, 0], [117, 0], [118, 0], [120, 0], [122, 0], [123, 9], [124, 0], [125, 0],
  [126, 0], [128, 0], [130, 0], [132, 0], [134, 0], [136, 0], [138, 0], [140, 0], [142, 0], [144, 0], [145, 0], [146, 0], [148, 0]];
const WINS = sceneWindows(CUES, -0.25); // each picture lands just after its first word; the 0.6 s crossfade covers the breath
const sc = (c, w, o) => { const k = CUES.findIndex(([a, b]) => a === c && b === w); if (k < 0) throw new Error("no cue " + c + ":" + w); return scene(WINS[k][0], WINS[k][1], o); };

// ===================== 1. You have never seen your planet =====================
// Right now, you're standing on a planet / that moves about thirty kilometres every second.
{ const S = sc(1, 0, { cam: "push", focus: "1060 560" }); space(S, DS.outdoor(S, SPACE));
  [[260, 520, 470], [200, 640, 560], [300, 760, 480]].forEach(([x, y, l]) => S.draw(line([x, y], [x + l, y], 0), S.start, 0, { c: DS.P.white[0], w: DS.w.mid, op: 0.3 }));
  earth(S, 1060, 680, 250);
  who(S, 1060, 432, "near", Object.assign({ s: 0.42, c: DS.P.white[0], mood: "flat", look: 0 }, YOU));
  DS.card(S, "YOU", 1060, 250, { size: DS.type.small, t: W(1, 2) });
  S.arrow(1370, 880, 1420, 470, W(2, 1), 0, { c: DS.c("yellow"), w: DS.w.near, bend: 0.25 });
  DS.card(S, "ABOUT 30 KM EVERY SECOND", 520, 300, { size: DS.type.small, t: W(2, 3) });
  DS.vignette(S); }

// You have never seen it. You have seen a floor.
{ const S = sc(3, 0, { cam: "pull", focus: "960 760" }); DS.room(S, ROOM.home);
  who(S, 960, 960, "near", Object.assign({ s: 1.25, mood: "flat", look: 0 }, YOU));
  DS.card(S, "NEVER SEEN IT", 960, 150, { size: DS.type.body, t: W(3, 2), tc: "red" });
  DS.card(S, "A FLOOR", 1480, 640, { size: DS.type.body, t: W(3, 8) });
  S.arrow(1400, 690, 1170, 930, W(3, 8), 0, { c: DS.c("red"), w: DS.w.near, bend: -0.2 });
  DS.vignette(S); }

// Fewer than eight hundred people have gone high enough to look back at it.
{ const S = sc(4, 0, { cam: "push", focus: "960 560" }); space(S, DS.outdoor(S, SPACE));
  earth(S, 960, 1780, 1080, { shift: [0, -0.45] });
  [[520, 640], [960, 540], [1400, 660]].forEach(([x, gy], i) => astro(S, x, gy, "near", { s: 0.62, c: DS.P.white[0], float: true, mood: "flat", look: 0 }).face(W(4, 10) + i * 0.1, "wow", 0));
  DS.card(S, "FEWER THAN 800 PEOPLE", 960, 150, { size: DS.type.body, tc: "red" });
  DS.vignette(S); }

// And something keeps happening to them. / They come home different.
{ const S = sc(5, 0, { cam: "push", focus: "1000 600" }); DS.outdoor(S, { hy: 640, sky: "sky", sun: [1650, 160] });
  house(S, 1420, 900, 1.1);
  const A = astro(S, 760, 920, "near", { s: 1.15, helmet: false, mood: "flat", look: 6 });
  say(S, 470, 330, 170, 120, 680, 560, [], W(5, 1), { think: true }); earth(S, 470, 330, 72, { t: W(5, 1) });
  A.face(W(6, 2), "smile", 6);
  DS.card(S, "THEY COME HOME DIFFERENT", 1100, 140, { size: DS.type.body, t: W(6, 1) });
  DS.vignette(S); }

// It even has a name. The Overview Effect. / So what do they see up there that changes people?
{ const S = sc(7, 0, { cam: "zoom", focus: "960 640" }); space(S, DS.outdoor(S, SPACE));
  earth(S, 960, 1700, 950, { shift: [0, -0.5] });
  astro(S, 1440, 600, "near", { s: 0.8, c: DS.P.white[0], float: true, mood: "wow", look: -6 });
  DS.card(S, "THE OVERVIEW EFFECT", 960, 200, { size: DS.type.title, t: W(7, 5) });
  DS.card(S, "WHAT DO THEY SEE?", 760, 470, { size: DS.type.body, t: W(8, 1), tc: "blue" });
  DS.vignette(S); }

// This is Dave, and Dave would like to come home different. / He has started saving.
{ const S = sc(9, 0, { cam: "push", focus: "900 600" }); DS.room(S, ROOM.home);
  const top = table(S, 1100, 1640, 720);
  jar(S, 1370, top, 1.0, { t: W(10, 2), coins: 1 });
  dave(S, 760, GN, "near", { mood: "smile", look: 6 });
  DS.card(S, "DAVE", 760, 480, { size: DS.type.body, t: W(9, 2) });
  say(S, 400, 300, 220, 140, 640, 560, [], W(9, 8), { think: true });
  earth(S, 330, 300, 72, { t: W(9, 8) }); helmetIcon(S, 490, 290, 56, W(9, 8));
  DS.vignette(S); }

// A seat on a suborbital spaceplane has sold for four hundred and fifty thousand dollars.
{ const S = sc(11, 0, { cam: "push", focus: "960 480" }); DS.outdoor(S, { hy: 1150, sky: "sky", sun: [1700, 150] });
  puff(S, 300, 300, 2.2); puff(S, 1500, 820, 2.6); puff(S, 420, 860, 1.8);
  const P = spaceplane(S, 860, 450, 1.4);
  S.draw(circ(P.win[2][0], P.win[2][1], 36), W(11, 1), 0, { c: DS.c("red"), w: DS.w.near });
  DS.card(S, "SUBORBITAL SPACEPLANE", 860, 150, { size: DS.type.small, t: W(11, 4) });
  priceTag(S, 1140, 500, "$450,000", W(11, 9));
  DS.vignette(S); }

// And the company's sales pitch promises / "the perspective that can only come from seeing our beautiful planet from space."
{ const S = sc(12, 0, { cam: "push", focus: "1150 520" }); DS.room(S, ROOM.office);
  dave(S, 420, GN, "near", { pose: "hold", mood: "flat", look: 6 });
  const P = pitch(S, 1180, 500, { ts: [W(13, 0), W(13, 2), W(13, 4), W(13, 5), W(13, 9), W(13, 11)] });
  S.draw(circ(P.only[0], P.only[1], 186, 60), W(13, 4) + 0.3, 0, { c: DS.c("red"), w: DS.w.near });
  DS.card(S, "THE SALES PITCH", 420, 420, { size: DS.type.small, t: W(12, 3) });
  DS.vignette(S); }

// Dave saves two hundred dollars a month. / At that rate, he lifts off in about a hundred and eighty-seven years.
{ const S = sc(14, 0, { cam: "push", focus: "1000 560" }); DS.room(S, ROOM.home);
  const top = table(S, 1080, 1600, 720);
  jar(S, 1260, top, 1.0, { coins: 3 });
  const F = dave(S, 860, GN, "near", { pose: "reach", mood: "smile", look: 6 });
  const c = coin(S, 1260, 430, W(14, 1)); S.move(c, W(14, 1) + 0.35, 0.5, { y: 150 }, "power2.in"); S.fadeOut(c, W(14, 1) + 0.8, 0.15);
  DS.card(S, "$200 A MONTH", 1260, 290, { size: DS.type.body, t: W(14, 2) });
  DS.card(S, "LIFTOFF IN ABOUT 187 YEARS", 960, 140, { size: DS.type.body, t: W(15, 11), tc: "red" });
  F.face(W(15, 11), "worried", 6);
  DS.vignette(S); }

// So does Dave really need the ticket? / To find out, we'll climb a ladder, from a plane window to six billion kilometres away.
{ const S = sc(16, 0, { cam: "push", focus: "900 520" }); ladder(S, DS.outdoor(S, LSKY), { rungs: { plane: W(17, 9), voyager: W(17, 12) } });
  S.text("?", LX, 500, { size: DS.type.display, t: W(17, 4), c: DS.P.white[0] });
  const F = dave(S, 400, GN, "near", { armR: [[44, 12], [74, -18]], mood: "worried", look: 6 });
  const [hx, hy] = F.hand("R"); ticket(S, hx + 110, hy - 30, 0.8, { rot: -8 });
  DS.card(S, "NEED THE TICKET?", 400, 480, { size: DS.type.small, t: W(16, 1), tc: "red" });
  DS.vignette(S); }

// On the way: a photo nobody scheduled, a camera pointed almost at the Sun, / and a ninety-year-old who found grief up there.
{ const S = sc(18, 0, { cam: "push" }); DS.room(S, ROOM.office);
  [[400, W(18, 4), "A PHOTO NOBODY", "SCHEDULED"], [960, W(18, 8), "A CAMERA POINTED", "AT THE SUN"], [1520, W(19, 2), "A 90-YEAR-OLD", "WHO FOUND GRIEF"]].forEach(([x, t, a, b], i) => {
    panel(S, x, 520, 480, 560, t);
    if (i === 0) earthrise(S, x - 200, 280, 400, 300, { t });
    if (i === 1) { const g = S.grp(); clipTo(g, rect(x - 200, 280, 400, 300)); S.fill(rect(x - 200, 280, 400, 300), t, 0, DS.c("ink", 2), 1, g); S.fill(circ(x + 120, 360, 200), t, 0, DS.glow(DS.P.yellow[1], 0.9), 1, g); S.fill(circ(x + 120, 360, 40), t, 0, DS.P.white[0], 1, g); camera(S, x - 70, 470, 0.8, { t, parent: g }); }
    if (i === 2) { DS.shape(S, rect(x - 200, 280, 400, 300), "dusk", { t, flat: true, w: "detail" }); who(S, x, 560, "near", Object.assign({ s: 0.72, mood: "sad", look: 0, t }, SHAT)); }
    txt(S, a, x, 680, { t }); txt(S, b, x, 734, { t });
  });
  DS.card(S, "ON THE WAY", 960, 150, { size: DS.type.body, t: W(18, 0) });
  DS.vignette(S); }

// Let's start with the man who named it, and where he was sitting.
{ const S = sc(20, 0, { cam: "zoom", focus: "760 560" }); DS.room(S, CABIN); cabin(S, { wins: [260, 1320] });
  const top = seat(S, 760, 960); seat(S, 1160, 960);
  S.text("?", 760, top - 110, { size: DS.type.display, t: W(20, 9), c: DS.P.white[0] });
  S.draw(rrect(610, 470, 300, 470, DS.r.lg), W(20, 9), 0, { c: DS.c("red"), w: DS.w.near });
  DS.card(S, "THE MAN WHO NAMED IT", 960, 140, { size: DS.type.body, t: W(20, 4) });
  DS.vignette(S); }

// ===================== 2. The man in the window seat =====================
// Years before his book, the writer Frank White was flying across America, looking out the window.
{ const S = sc(21, 0, { cam: "push", focus: "560 480" }); DS.room(S, CABIN); cabin(S, { wins: [260, 1320] });
  const top = seat(S, 760, 960); who(S, 760, top, "near", Object.assign({ s: 1.1, sit: true, mood: "flat", look: -8 }, FW));
  DS.card(S, "FRANK WHITE, WRITER", 1240, 700, { size: DS.type.small, t: W(21, 6) });
  DS.card(S, "ACROSS AMERICA", 360, 640, { size: DS.type.small, t: W(21, 10) });
  DS.vignette(S); }

// He pictured living in a space colony between the Earth and the Moon, and thought: / "I would always have an overview of the Earth."
{ const S = sc(22, 0, { cam: "push", focus: "1200 420" }); DS.room(S, CABIN); cabin(S, { wins: [260] });
  const top = seat(S, 560, 960); who(S, 560, top, "near", Object.assign({ s: 1.1, sit: true, mood: "smile", look: 6 }, FW));
  S.thought(1230, 350, 540, 200, 760, 600, W(22, 1), 0.3);
  colony(S, 1230, 350, 1, W(22, 5));
  earth(S, 860, 360, 100, { t: W(22, 9) });
  moon(S, 1600, 340, 66, { t: W(22, 12) });
  quote(S, 1230, 790, ["I WOULD ALWAYS HAVE AN", "OVERVIEW OF THE EARTH."], "FRANK WHITE", { t: W(23, 0) });
  DS.vignette(S); }

// The most famous feeling in space / was first imagined from a plane seat.
{ const S = sc(24, 0, { cam: "zoom", focus: "960 640" }); DS.room(S, CABIN); cabin(S, { wins: [200, 1500] });
  seat(S, 960, 1000, 1.4);
  DS.card(S, "THE MOST FAMOUS FEELING IN SPACE", 960, 140, { size: DS.type.small });
  DS.card(S, "FIRST IMAGINED HERE", 1460, 680, { size: DS.type.small, t: W(25, 1), tc: "red" });
  S.arrow(1360, 730, 1160, 800, W(25, 1), 0, { c: DS.c("red"), w: DS.w.near, bend: -0.2 });
  DS.vignette(S); }

// In nineteen eighty-seven he published The Overview Effect, built on interviews with astronauts.
{ const S = sc(26, 0, { cam: "push", focus: "800 520" }); DS.room(S, ROOM.office);
  const top = desk(S, 300, 960, 900);
  book(S, 600, top - 210, 300, 420, ["THE", "OVERVIEW", "EFFECT"]);
  tape(S, 1000, top - 70, 0.9, { t: W(26, 9) });
  [1270, 1450, 1630].forEach((x, i) => astro(S, x, 830, "mid", { s: 1.1, helmet: false, mood: ["smile", "flat", "wow"][i], look: -6, t: W(26, 10) + i * 0.12 }));
  DS.card(S, "1987", 600, 150, { size: DS.type.body, t: W(26, 1) });
  DS.card(S, "INTERVIEWS WITH ASTRONAUTS", 1430, 300, { size: DS.type.caption, t: W(26, 10) });
  DS.vignette(S); }

// Again and again, they described a fragile planet with no borders.
{ const S = sc(27, 0, { cam: "push", focus: "960 540" }); space(S, DS.outdoor(S, SPACE));
  const E = earth(S, 960, 560, 320);
  [[[-0.42, -0.24], [0.18, -0.3]], [[-0.08, -0.48], [-0.02, 0.12]], [[0.0, 0.0], [0.32, 0.12]], [[-0.4, -0.06], [-0.12, 0.3]], [[0.36, -0.42], [0.54, -0.22]]].forEach(([a, b]) => {
    const p = S.draw(line([960 + a[0] * 320, 560 + a[1] * 320], [960 + b[0] * 320, 560 + b[1] * 320], 0), S.start, 0, { c: DS.c("red"), w: DS.w.mid, parent: E.g }); dash(p, 16, 12); S.fadeOut(p, W(27, 9), 0.5); });
  DS.card(S, "A FRAGILE PLANET", 960, 120, { size: DS.type.body, t: W(27, 6) });
  DS.card(S, "NO BORDERS", 1560, 820, { size: DS.type.body, t: W(27, 9), tc: "green" });
  DS.vignette(S); }

// Edgar Mitchell, who walked on the Moon, put it like this: / "From out there on the moon, international politics looks so petty."
{ const S = sc(28, 0, { cam: "push", focus: "800 560" }); moonSurface(S, DS.outdoor(S, MOONO));
  earth(S, 1660, 600, 80, { lit: "half", light: 200 });
  astro(S, 560, 930, "near", { s: 1.15, c: DS.P.white[0], mood: "flat", look: 6 });
  DS.card(S, "EDGAR MITCHELL", 560, 230, { size: DS.type.small });
  DS.card(S, "WALKED ON THE MOON", 560, 340, { size: DS.type.caption, t: W(28, 3) });
  say(S, 1250, 330, 420, 150, 650, 540, ["FROM OUT THERE ON THE MOON,", "INTERNATIONAL POLITICS", "LOOKS SO PETTY."], W(29, 0), { size: DS.type.caption });
  DS.vignette(S); }

// The rest involves dragging a politician a quarter of a million miles by the scruff of the neck, / plus a phrase we won't repeat.
{ const S = sc(30, 0, { cam: "push", focus: "1100 560" }); moonSurface(S, DS.outdoor(S, MOONO));
  earth(S, 330, 300, 120, { lit: "half", light: 200 });
  const pth = S.draw(smooth([[470, 330], [900, 250], [1260, 470]]), W(30, 6), 0, { c: DS.P.white[0], w: DS.w.mid }); dash(pth, 4, 22);
  DS.card(S, "A QUARTER OF A MILLION MILES", 900, 130, { size: DS.type.small, t: W(30, 7) });
  const A = astro(S, 1250, 930, "near", { s: 1.15, c: DS.P.white[0], mood: "determined", look: 6, armR: [[50, -30], [96, -80]] });
  const [hx, hy] = A.hand("R");
  const P = who(S, hx + 10, hy + 160, "near", { s: 0.62, c: DS.P.white[0], hair: "side", hairC: DS.c("gray", 2), outfitC: DS.c("gray", 2), mood: "worried", look: -6, t: W(30, 5), float: true });
  DS.shape(S, poly([[P.cx - 7, P.sh[1] + 6], [P.cx + 7, P.sh[1] + 6], [P.cx + 10, P.sh[1] + 54], [P.cx, P.sh[1] + 66], [P.cx - 10, P.sh[1] + 54]], 0) + " Z", "red", { t: W(30, 5), w: "hair", parent: P.g });
  const b = say(S, 760, 520, 260, 90, 1150, 600, [], W(31, 2));
  DS.shape(S, rrect(590, 480, 340, 80, DS.r.sm), "ink", { t: W(31, 2), w: "detail", parent: b });
  S.text("BLEEP", 760, 538, { size: DS.type.small, t: W(31, 2), c: DS.P.white[0], parent: b });
  DS.vignette(S); }

// So how high do you have to go before it starts? / Next rung up. Yuri Gagarin, the first human in orbit, nineteen sixty-one.
{ const S = sc(32, 0, { cam: "push", focus: "900 640" }); ladder(S, DS.outdoor(S, LSKY), { rungs: { plane: true, gagarin: W(33, 0), voyager: true } });
  climber(S, "plane", { to: "gagarin", at: W(33, 1) });
  DS.card(S, "HOW HIGH?", 440, 380, { size: DS.type.body, t: W(32, 1) });
  DS.card(S, "FIRST HUMAN IN ORBIT", 440, 520, { size: DS.type.caption, t: W(33, 6) });
  DS.card(S, "1961", 440, 630, { size: DS.type.small, t: W(33, 10) });
  DS.vignette(S); }

// ===================== 3. The photo nobody scheduled =====================
// He saw a blue halo around the planet, fading through violet into black.
const haloLimb = (S, o = {}) => {
  const cx = 960, cy = 1880, r = 1160;
  [[96, "purple", 0, o.v, 0.6], [66, "blue", 1, o.b, 0.75], [40, "sky", 0, o.h, 0.85], [16, "sky", 1, o.h, 0.95]].forEach(([d, n, tn, t, op]) => S.fill(circ(cx, cy, r + d), t ?? S.start, 0, DS.c(n, tn), op));
  earth(S, cx, cy, r, { halo: false, shift: [0, -0.62] });
};
{ const S = sc(34, 0, { cam: "push", focus: "960 600" }); space(S, DS.outdoor(S, SPACE));
  haloLimb(S, { h: W(34, 3), b: W(34, 4), v: W(34, 10) });
  vostok(S, 900, 340, 1.0);
  DS.card(S, "BLUE HALO", 520, 170, { size: DS.type.body, t: W(34, 3) });
  DS.card(S, "VIOLET, THEN BLACK", 1380, 170, { size: DS.type.small, t: W(34, 10), tc: "purple" });
  DS.vignette(S); }

// Afterwards, a state commission asked whether he could have taken pictures. / His answer: yes, if he'd had colour film.
{ const S = sc(35, 0, { cam: "push", focus: "1000 520" }); DS.room(S, ROOM.office);
  [1060, 1290, 1520].forEach((x, i) => seated(S, x, 700, { fn: (S2, ...a) => person(S2, a[0], a[1], a[2], i + 5, a[3]), mood: "flat", look: -5 }));
  table(S, 900, 1680, 700);
  who(S, 380, GN, "near", Object.assign({ s: 1.1, mood: "flat", look: 6 }, GAG));
  DS.card(S, "YURI GAGARIN", 380, 470, { size: DS.type.small });
  DS.card(S, "STATE COMMISSION", 1290, 130, { size: DS.type.small, t: W(35, 2) });
  const q = say(S, 1250, 300, 450, 90, 1290, 430, ["COULD YOU HAVE TAKEN PICTURES?"], W(35, 4), { size: DS.type.caption }); S.fadeOut(q, W(36, 0), 0.3);
  say(S, 980, 300, 330, 110, 440, 600, ["YES, IF I'D HAD", "COLOUR FILM."], W(36, 2), { size: DS.type.caption });
  film(S, 620, 720, 0.8, { t: W(36, 6) });
  DS.vignette(S); }

// "I haven't been able to see those colors on Earth." / Hold on to the colour film. It matters seven years later.
{ const S = sc(37, 0, { cam: "push", focus: "960 460" }); space(S, DS.outdoor(S, SPACE));
  haloLimb(S);
  quote(S, 760, 330, ["I HAVEN'T BEEN ABLE TO SEE", "THOSE COLORS ON EARTH."], "YURI GAGARIN, 1961");
  film(S, 1460, 440, 1.3, { t: W(38, 0) });
  DS.card(S, "7 YEARS LATER", 1500, 640, { size: DS.type.small, t: W(38, 8) });
  DS.vignette(S); }

// Christmas Eve, nineteen sixty-eight. Apollo eight is the first crew to circle the Moon.
{ const S = sc(39, 0, { cam: "push", focus: "900 460" }); const R = ladder(S, DS.outdoor(S, LSKY), { rungs: { plane: true, gagarin: true, moon: W(39, 4), voyager: true } });
  moon(S, R.moon.x1 + 60, R.moon.y, 40, { t: W(39, 4) });
  climber(S, "gagarin", { to: "moon", at: W(39, 5), dur: 1.2 });
  DS.card(S, "CHRISTMAS EVE 1968", 440, 300, { size: DS.type.small });
  DS.card(S, "FIRST CREW AROUND THE MOON", 450, 420, { size: DS.type.caption, t: W(39, 8) });
  DS.vignette(S); }

// Their job is photographing the Moon, by the flight plan. / On the fourth orbit, as the ship rolls, Bill Anders looks out of his window.
const clipboard = (S, cx, cy, w, h, strs, o = {}) => { const t = o.t, g = S.grp(); DS.shape(S, rrect(cx - w / 2, cy - h / 2, w, h, DS.r.sm), "wood", { t, parent: g }); DS.shape(S, rect(cx - w / 2 + 16, cy - h / 2 + 24, w - 32, h - 40), "white", { t, flat: true, w: "hair", parent: g }); DS.shape(S, rrect(cx - 40, cy - h / 2 - 12, 80, 30, DS.r.xs), "gray", { t, tone: 2, w: "detail", parent: g }); strs.forEach((s, i) => txt(S, s, cx, cy - h / 2 + 84 + i * 56, { t, parent: g, c: i ? DS.c("blue", 2) : DS.c("ink") })); return g; };
{ const S = sc(40, 0, { cam: "push", focus: "960 420" }); DS.room(S, CAPS); const V = capsule(S, { view: { earth: false } });
  spin(V.inner, W(41, 6), 1.6, 0, -9, 960, 350);
  clipboard(S, 420, 380, 380, 300, ["FLIGHT PLAN:", "PHOTOGRAPH", "THE MOON"], { t: W(40, 3) });
  DS.card(S, "ORBIT 4", 1530, 260, { size: DS.type.body, t: W(41, 2) });
  astro(S, 1500, GN, "near", Object.assign({ s: 1.1, helmet: false, mood: "flat", look: -8, t: W(41, 8) }, ANDERS));
  DS.card(S, "BILL ANDERS", 1500, 460, { size: DS.type.small, t: W(41, 8) });
  DS.vignette(S); }

// "Oh my God, look at that picture over there!"
{ const S = sc(42, 0, { cam: "zoom", focus: "960 340" }); DS.room(S, CAPS); capsule(S, { view: { rise: [S.start - 0.3, 1.8] } });
  astro(S, 1500, GN, "near", Object.assign({ s: 1.1, helmet: false, mood: "wow", look: -8 }, ANDERS));
  quote(S, 900, 760, ["OH MY GOD, LOOK AT THAT", "PICTURE OVER THERE!"], "BILL ANDERS", { size: DS.type.caption, t: S.start + 0.2 });
  DS.vignette(S); }

// The Earth had already risen three times. / Nobody had seen it.
{ const S = sc(43, 0, { cam: "push" }); space(S, DS.outdoor(S, SPACE));
  [480, 960, 1440].forEach((x, i) => { const t = W(43, 5) + i * 0.15; panel(S, x, 500, 440, 420, t, "gray"); earthrise(S, x - 200, 310, 400, 290, { t }); txt(S, "ORBIT " + (i + 1), x, 668, { t, size: DS.type.small }); xMark(S, x, 450, 1.2, W(44, 0) + i * 0.12); });
  DS.card(S, "ALREADY RISEN 3 TIMES", 960, 160, { size: DS.type.body, t: W(43, 3) });
  DS.card(S, "NOBODY SAW IT", 960, 850, { size: DS.type.body, t: W(44, 0), tc: "red" });
  DS.vignette(S); }

// His commander, Frank Borman, makes a joke: / "Hey, don't take that, it's not scheduled."
{ const S = sc(45, 0, { cam: "push", focus: "800 560" }); DS.room(S, CAPS); capsule(S, { view: {} });
  astro(S, 420, GN, "near", Object.assign({ s: 1.1, helmet: false, mood: "smile", look: 6 }, BORMAN));
  const A = astro(S, 1500, GN, "near", Object.assign({ s: 1.1, helmet: false, mood: "wow", look: -8, pose: "hold" }, ANDERS)); const [hx, hy] = A.hand("R"); camera(S, hx - 10, hy - 50, 0.7);
  DS.card(S, "FRANK BORMAN", 420, 500, { size: DS.type.small, t: W(45, 2) });
  DS.card(S, "COMMANDER", 420, 410, { size: DS.type.caption, t: W(45, 1) });
  quote(S, 960, 760, ["HEY, DON'T TAKE THAT,", "IT'S NOT SCHEDULED."], "FRANK BORMAN, JOKING", { size: DS.type.caption, t: W(46, 0) });
  DS.vignette(S); }

// Anders grabs one shot in black and white, then turns to Jim Lovell. / "Hand me a roll of color, quick, would you?"
{ const S = sc(47, 0, { cam: "push", focus: "1000 560" }); DS.room(S, CAPS); capsule(S, { view: {} });
  const A = astro(S, 1320, GN, "near", Object.assign({ s: 1.1, helmet: false, mood: "determined", look: -6, pose: "hold" }, ANDERS)); const [hx, hy] = A.hand("R"); camera(S, hx - 10, hy - 50, 0.7);
  DS.shape(S, rect(1438, 268, 304, 224), "white", { t: W(47, 3), flat: true, w: "detail" }); earthrise(S, 1450, 280, 280, 200, { t: W(47, 3), mono: true });
  txt(S, "1 SHOT, BLACK AND WHITE", 1590, 540, { t: W(47, 5), c: DS.P.white[0] });
  astro(S, 450, GN, "near", Object.assign({ s: 1.1, helmet: false, mood: "flat", look: 6, t: W(47, 11) }, LOVELL));
  DS.card(S, "JIM LOVELL", 450, 470, { size: DS.type.small, t: W(47, 11) });
  quote(S, 890, 760, ["HAND ME A ROLL OF COLOR,", "QUICK, WOULD YOU?"], "BILL ANDERS", { size: DS.type.caption, t: W(48, 0) });
  DS.vignette(S); }

// After a frantic hunt for the film, Anders says, / "Well, I think we missed it."
{ const S = sc(49, 0, { cam: "push", focus: "960 560" }); DS.room(S, CAPS); capsule(S, { view: { earth: false } });
  [[560, 330, 0.6, 140, 30, 50], [1380, 300, 0.55, -120, 60, -60], [980, 640, 0.5, 90, -80, 90]].forEach(([x, y, k, dx, dy, a], i) => { const g = film(S, x, y, k, { colour: i !== 1, t: W(49, 2) + i * 0.1 }); drift(g, S.start, S.len, dx, dy, a, x, y); });
  { const g = S.grp(); paperR(S, 1520, 560, 140, 180, { parent: g }); lines(S, 1540, 600, 100, 3, S.start, 34, g); drift(g, S.start, S.len, -80, -60, -25, 1590, 650); }
  astro(S, 460, GN, "near", Object.assign({ s: 1.1, helmet: false, mood: "worried", look: 6, pose: "head" }, LOVELL));
  const A = astro(S, 1440, GN, "near", Object.assign({ s: 1.1, helmet: false, mood: "flat", look: -6 }, ANDERS)); A.face(W(50, 3), "sad", -6);
  DS.card(S, "A FRANTIC HUNT", 460, 500, { size: DS.type.small, t: W(49, 2) });
  quote(S, 960, 770, ["WELL, I THINK WE MISSED IT."], "BILL ANDERS", { size: DS.type.caption, t: W(50, 0) });
  DS.vignette(S); }

// Then Lovell spots the Earth in another window.
{ const S = sc(51, 0, { cam: "zoom", focus: "420 420" }); DS.room(S, CAPS); capsule(S, { view: { earth: false }, win2: true });
  astro(S, 760, GN, "near", Object.assign({ s: 1.1, helmet: false, mood: "wow", look: -8, pose: "pointL" }, LOVELL));
  S.draw(rrect(130, 190, 380, 320, DS.r.lg), W(51, 3), 0, { c: DS.c("yellow"), w: DS.w.near });
  DS.card(S, "ANOTHER WINDOW", 380, 600, { size: DS.type.small, t: W(51, 6) });
  DS.vignette(S); }

// The colour shot became Earthrise. It's one of the most famous photographs of the century.
{ const S = sc(52, 0, { cam: "pull", focus: "960 420" }); DS.room(S, ROOM.gallery);
  DS.drop(S, rect(568, 148, 800, 560)); DS.shape(S, rect(560, 140, 800, 560), "wood", { w: "mid" });
  earthrise(S, 590, 170, 740, 500);
  person(S, 290, GN, "near", 1, { s: 0.95, look: 6 }); person(S, 1640, GN, "near", 4, { s: 0.95, look: -6 });
  DS.card(S, "EARTHRISE", 960, 790, { size: DS.type.title, t: W(52, 4) });
  DS.card(S, "ONE OF THE CENTURY'S MOST FAMOUS", 960, 892, { size: DS.type.caption, t: W(52, 9) });
  DS.vignette(S); }

// Gagarin never got his colour film. / Anders got his, just in time.
{ const S = sc(53, 0, { cam: "push" }); DS.room(S, ROOM.office);
  DS.shape(S, rect(950, -200, 20, 1500), "ink", { flat: true, w: "hair" });
  film(S, 450, 520, 1.6, { colour: false }); xMark(S, 450, 520, 2, W(53, 1));
  DS.card(S, "GAGARIN: NO COLOUR FILM", 500, 200, { size: DS.type.small });
  film(S, 1400, 520, 1.6, { t: W(54, 0) }); tick(S, 1400, 760, 2.6, W(54, 3));
  DS.card(S, "ANDERS: JUST IN TIME", 1440, 200, { size: DS.type.small, t: W(54, 0), tc: "green" });
  DS.vignette(S); }

// Years later, Anders put it simply: / "the most important thing is that we discovered the Earth."
{ const S = sc(55, 0, { cam: "push", focus: "1100 480" }); DS.room(S, ROOM.home);
  DS.drop(S, rect(286, 178, 330, 236)); DS.shape(S, rect(280, 170, 330, 236), "wood", { w: "mid" }); earthrise(S, 296, 186, 298, 204);
  who(S, 500, GN, "near", { s: 1.1, hair: "short", hairC: DS.c("gray", 1), outfitC: DS.c("green", 2), mood: "smile", look: 6 });
  DS.card(S, "BILL ANDERS, YEARS LATER", 500, 500, { size: DS.type.caption, t: W(55, 2) });
  quote(S, 1300, 520, ["THE MOST IMPORTANT THING", "IS THAT WE DISCOVERED", "THE EARTH."], "BILL ANDERS", { ts: [W(56, 0), W(56, 4), W(56, 7)], t: W(56, 0) });
  DS.vignette(S); }

// Four years after that, Apollo seventeen photographed the whole Earth, fully lit,
{ const S = sc(57, 0, { cam: "push", focus: "1200 540" }); space(S, DS.outdoor(S, SPACE));
  sunGlow(S, 120, 960, 90);
  [[260, 880], [300, 940]].forEach(([x, y]) => { const p = S.draw(line([x, y], [x + 760, y - 380], 0), S.start, 0, { c: DS.c("yellow", 1), w: DS.w.mid, op: 0.5 }); dash(p, 10, 18); });
  apollo(S, 430, 720, 0.9);
  earth(S, 1200, 560, 300);
  DS.card(S, "APOLLO 17 · 1972", 400, 230, { size: DS.type.small, t: W(57, 4) });
  DS.card(S, "THE WHOLE EARTH, FULLY LIT", 1240, 130, { size: DS.type.small, t: W(57, 8) });
  DS.vignette(S); }

// from about twenty-nine thousand kilometres away.
{ const S = sc(58, 0, { cam: "push", focus: "900 520" }); const R = ladder(S, DS.outdoor(S, LSKY), { rungs: { plane: true, gagarin: true, a17: W(58, 2), moon: true, voyager: true } });
  moon(S, R.moon.x1 + 60, R.moon.y, 40); earth(S, R.a17.x1 + 60, R.a17.y, 34, { t: W(58, 2) });
  climber(S, "moon", { mood: "wow" });
  DS.card(S, "THE WHOLE EARTH", 440, 520, { size: DS.type.small, t: W(58, 2) });
  DS.vignette(S); }

// They called it the Blue Marble, probably one of the most shared photos ever taken.
{ const S = sc(59, 0, { cam: "pull", focus: "960 520" }); DS.room(S, ROOM.home);
  DS.drop(S, rect(408, 148, 380, 380)); DS.shape(S, rect(400, 140, 380, 380), "white", { t: W(59, 4), w: "mid" }); S.fill(rect(420, 160, 340, 340), W(59, 4), 0, DS.c("ink", 2), 1); earth(S, 590, 330, 140, { t: W(59, 4) });
  const t = W(59, 11);
  const top = table(S, 1040, 1700, 720);
  DS.shape(S, rrect(1110, top - 300, 170, 300, DS.r.md), "ink", { t, w: "mid" }); earth(S, 1195, top - 150, 64, { t });
  DS.shape(S, rrect(1330, top - 230, 190, 230, DS.r.xs), "red", { t: t + 0.12 }); earth(S, 1425, top - 120, 56, { t: t + 0.12 });
  DS.shape(S, rrect(1560, top - 150, 110, 150, DS.r.sm), "white", { t: t + 0.24 }); earth(S, 1615, top - 76, 38, { t: t + 0.24 });
  DS.card(S, "THE BLUE MARBLE", 590, 620, { size: DS.type.body, t: W(59, 4) });
  DS.card(S, "ONE OF THE MOST SHARED", 1370, 160, { size: DS.type.small, t });
  DS.vignette(S); }

// It was taken upside down, with Antarctica at the top.
const print = (S, cx, cy, w, t) => { DS.drop(S, rect(cx - w / 2 + 10, cy - w / 2 + 14, w, w), { t }); DS.shape(S, rect(cx - w / 2, cy - w / 2, w, w), "white", { t, flat: true, w: "detail" }); S.fill(rect(cx - w / 2 + 28, cy - w / 2 + 28, w - 56, w - 56), t ?? S.start, 0, DS.c("ink", 2), 1); };
{ const S = sc(60, 0, { cam: "push", focus: "960 500" }); space(S, DS.outdoor(S, SPACE));
  print(S, 960, 540, 640);
  const E = earth(S, 960, 540, 250); E.g.setAttribute("transform", "rotate(180 960 540)");
  DS.card(S, "TAKEN UPSIDE DOWN", 960, 130, { size: DS.type.body, t: W(60, 2) });
  DS.card(S, "ANTARCTICA", 1560, 330, { size: DS.type.small, t: W(60, 6) });
  S.arrow(1440, 350, 1110, 360, W(60, 6), 0, { c: DS.c("yellow"), w: DS.w.near, bend: -0.12 });
  DS.vignette(S); }

// NASA rotated it before release, to match our maps. / Space doesn't have a top. Maps do.
{ const S = sc(61, 0, { cam: "push", focus: "900 520" }); space(S, DS.outdoor(S, SPACE));
  print(S, 720, 540, 600);
  const E = earth(S, 720, 540, 230); spin(E.g, W(61, 1), 1.4, 180, 360, 720, 540);
  DS.card(S, "NASA ROTATED IT", 380, 140, { size: DS.type.small, t: W(61, 0) });
  [[0, -1], [1, 0], [0, 1], [-1, 0]].forEach(([a, b], i) => S.arrow(720 + a * 340, 540 + b * 340, 720 + a * 420, 540 + b * 420, W(62, 1) + i * 0.08, 0, { c: DS.P.white[0], w: DS.w.near }));
  const mx = 1500, my = 520;
  DS.drop(S, rect(mx - 230 + 8, my - 160 + 10, 460, 320), { t: W(61, 6) }); DS.shape(S, rect(mx - 230, my - 160, 460, 320), "glass", { t: W(61, 6), flat: true, w: "mid" });
  [[-120, -20, 90, 70, "grass"], [40, -60, 80, 50, "sand"], [60, 60, 60, 70, "grass"], [-60, 110, 140, 26, "white"]].forEach(([dx, dy, rx, ry, n]) => DS.shape(S, circ(mx + dx, my + dy, rx, ry), n, { t: W(61, 6), flat: true, w: "hair" }));
  S.arrow(mx + 180, my + 40, mx + 180, my - 110, W(61, 6), 0, { c: DS.c("red"), w: DS.w.near });
  S.text("N", mx + 180, my + 96, { size: DS.type.small, t: W(61, 6), c: DS.c("red", 2) });
  DS.card(S, "MAPS DO.", mx, 240, { size: DS.type.body, t: W(62, 5), tc: "red" });
  DS.vignette(S); }

// ===================== 4. Six billion kilometres =====================
// In nineteen eighty-one, Carl Sagan asked for something stranger.
{ const S = sc(63, 0, { cam: "push", focus: "820 500" }); DS.room(S, ROOM.night);
  nightWin(S, 1600, 150, 180, 180);
  who(S, 520, GN, "near", Object.assign({ s: 1.1, mood: "determined", look: 6 }, SAGAN));
  DS.card(S, "CARL SAGAN · 1981", 520, 480, { size: DS.type.small, t: W(63, 3) });
  S.thought(1190, 430, 330, 200, 640, 600, W(63, 5), 0.3);
  const V = voyager(S, 1190, 420, 0.58, { t: W(63, 5) });
  S.arrow(1020, 300, 1360, 300, W(63, 7), 0, { c: DS.c("red"), w: DS.w.near, bend: -0.3 });
  DS.card(S, "SOMETHING STRANGER", 1190, 130, { size: DS.type.small, t: W(63, 7) });
  DS.vignette(S); }

// Turn Voyager around, and photograph the Earth from beyond the planets.
{ const S = sc(64, 0, { cam: "pull" }); space(S, DS.outdoor(S, SPACE));
  sunGlow(S, 60, 560, 70);
  earth(S, 300, 560, 10);
  DS.shape(S, circ(560, 560, 56), "earth", {}); [[-20, 6], [8, 4], [28, 3]].forEach(([dy, h]) => S.fill(rect(504, 560 + dy, 112, h * 2), S.start, 0, DS.c("brown", 1), 0.5));
  S.draw(circ(800, 560, 90, 22), S.start, 0, { c: DS.c("sand", 1), w: DS.w.mid }); DS.shape(S, circ(800, 560, 44), "sand", {});
  DS.shape(S, circ(1020, 560, 30), "glass", {}); DS.shape(S, circ(1200, 560, 30), "blue", {});
  voyager(S, 1600, 470, 0.85);
  S.arrow(1440, 230, 1760, 230, W(64, 0), 0, { c: DS.c("red"), w: DS.w.near, bend: -0.35 });
  [[1795, 420, 300, 548], [1795, 420, 300, 572]].forEach(([a, b, c, d]) => { const p = S.draw(line([a - 0, b], [c + 20, d], 0), W(64, 4), 0, { c: DS.c("yellow", 1), w: DS.w.detail, op: 0.6 }); dash(p, 10, 14); });
  S.draw(circ(300, 560, 30), W(64, 6), 0, { c: DS.c("yellow"), w: DS.w.near });
  DS.card(S, "TURN AROUND", 1600, 820, { size: DS.type.small, t: W(64, 0), tc: "red" });
  DS.card(S, "BEYOND THE PLANETS", 760, 160, { size: DS.type.body, t: W(64, 8) });
  DS.vignette(S); }

// The team said no, for eight years and six requests. / Pointing the camera that close to the Sun could damage it.
{ const S = sc(65, 0, { cam: "push", focus: "960 500" }); DS.room(S, ROOM.office);
  for (let i = 0; i < 6; i++) { const x = 220 + (i % 3) * 230, y = 260 + Math.floor(i / 3) * 300, t = W(65, 3) + i * 0.14; paperR(S, x, y, 190, 250); txt(S, String(i + 1), x + 95, y + 56, { size: DS.type.small }); lines(S, x + 22, y + 90, 146, 3, S.start, 34); stamp(S, x + 95, y + 190, "NO", t); }
  DS.card(S, "8 YEARS, 6 REQUESTS", 560, 140, { size: DS.type.small, t: W(65, 5) });
  const t2 = W(66, 0);
  panel(S, 1440, 520, 560, 560, t2, "navy");
  S.fill(circ(1620, 340, 190), t2, 0, DS.glow(DS.P.yellow[1], 0.9), 1); S.fill(circ(1620, 340, 46), t2, 0, DS.P.white[0], 1);
  camera(S, 1330, 560, 1.1, { t: t2 });
  DS.shape(S, `M${1560} ${600} L${1660} ${770} L${1460} ${770} Z`, "yellow", { t: W(66, 8) }); txt(S, "!", 1560, 752, { size: DS.type.small, t: W(66, 8) });
  DS.card(S, "COULD DAMAGE IT", 1440, 860, { size: DS.type.small, t: W(66, 8), tc: "red" });
  DS.vignette(S); }

// On Valentine's Day, nineteen ninety, Voyager one looked back from six billion kilometres away.
{ const S = sc(67, 0, { cam: "push", focus: "900 300" }); ladder(S, DS.outdoor(S, LSKY), { rungs: { plane: true, gagarin: true, a17: true, moon: true, voyager: W(67, 5) } });
  climber(S, "moon", { to: "voyager", at: W(67, 6), dur: 1.4 });
  DS.card(S, "VALENTINE'S DAY, 1990", 450, 300, { size: DS.type.small });
  DS.card(S, "LOOKING BACK", 450, 420, { size: DS.type.small, t: W(67, 8) });
  DS.vignette(S); }

// The Earth came out as zero point one two of a pixel. / Home doesn't fill one dot.
{ const S = sc(68, 0, { cam: "zoom", focus: "960 520" }); space(S, DS.outdoor(S, SPACE), { n: 20 });
  const cs = 210, x0 = 960 - 1.5 * cs, y0 = 520 - 1.5 * cs;
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) S.draw(rect(x0 + c * cs, y0 + r * cs, cs, cs), S.start, 0, { fill: DS.c("ink", (r + c) % 2 ? 1 : 0), c: DS.c("gray", 2), w: DS.w.detail });
  S.draw(rect(960 - cs / 2, 520 - cs / 2, cs, cs), S.start, 0, { c: DS.c("yellow"), w: DS.w.near });
  const e = Math.sqrt(0.12) * cs; S.fill(rect(960 - cs / 2 + 8, 520 - cs / 2 + 8, e, e), W(68, 5), 0, DS.c("sky", 1), 1);
  DS.card(S, "0.12 OF A PIXEL", 960, 120, { size: DS.type.body, t: W(68, 5) });
  DS.card(S, "HOME DOESN'T FILL ONE DOT", 960, 890, { size: DS.type.small, t: W(69, 0), tc: "blue" });
  DS.vignette(S); }

// The famous sunbeam it sits in / is just sunlight bouncing around inside the camera.
{ const S = sc(70, 0, { cam: "push", focus: "700 520" }); space(S, DS.outdoor(S, SPACE), { n: 12 });
  const P = pbd(S, 220, 210, 860, 620, { fy: 0.55 });
  S.draw(circ(P.dx, P.dy, 34), S.start, 0, { c: DS.c("yellow"), w: DS.w.mid });
  DS.card(S, "THE FAMOUS SUNBEAM", 650, 120, { size: DS.type.small, t: W(70, 1) });
  const t2 = W(71, 2), cx = 1460, cy = 500;
  DS.shape(S, rrect(cx - 230, cy - 150, 460, 300, DS.r.md), "gray", { t: t2 }); DS.shape(S, rect(cx - 200, cy - 120, 400, 240), "ink", { t: t2, flat: true, w: "detail" });
  DS.shape(S, rrect(cx - 300, cy - 70, 80, 140, DS.r.sm), "gray", { t: t2, tone: 2 });
  S.draw(poly([[cx - 300, cy - 40], [cx - 120, cy - 110], [cx - 30, cy + 110], [cx + 80, cy - 110], [cx + 180, cy + 100]], 0), t2, 0, { c: DS.c("orange", 1), w: DS.w.near });
  S.draw(arrowHead(cx + 180, cy + 100, Math.atan2(210, 100), 30), t2, 0, { c: DS.c("orange", 1), w: DS.w.near });
  DS.card(S, "SUNLIGHT INSIDE THE CAMERA", 1460, 760, { size: DS.type.caption, t: W(71, 3) });
  DS.vignette(S); }

// Thirty-four minutes later, Voyager switched off its cameras forever. / One of the last things it ever saw was us.
{ const S = sc(72, 0, { cam: "push", focus: "1100 480" }); space(S, DS.outdoor(S, SPACE));
  const V = voyager(S, 1220, 440, 1.15);
  S.fill(circ(V.cam[0], V.cam[1], 9), W(72, 4), 0, DS.c("red", 1), 1);
  DS.card(S, "OFF", V.cam[0] + 40, V.cam[1] - 100, { size: DS.type.small, t: W(72, 4), tc: "red" });
  DS.card(S, "34 MINUTES LATER", 640, 140, { size: DS.type.body });
  const p = S.draw(line([V.cam[0] - 40, V.cam[1] + 10], [240, 760], 0), W(73, 7), 0, { c: DS.c("yellow", 1), w: DS.w.detail, op: 0.7 }); dash(p, 10, 16);
  earth(S, 230, 770, 6); S.draw(circ(230, 770, 30), W(73, 7), 0, { c: DS.c("yellow"), w: DS.w.near });
  DS.card(S, "US", 230, 660, { size: DS.type.body, t: W(73, 8) });
  DS.vignette(S); }

// Carl Sagan looked at that dot and wrote: / "That's here. That's home. That's us."
{ const S = sc(74, 0, { cam: "push", focus: "1100 480" }); DS.room(S, ROOM.night);
  DS.drop(S, rect(306, 156, 300, 220)); pbd(S, 300, 150, 300, 220, { fy: 0.55 });
  seated(S, 560, 700, { fn: (S2, ...a) => who(S2, ...a), ...SAGAN, s: 1.1, mood: "flat", look: 6 });
  table(S, 330, 820, 700);
  paperR(S, 600, 670, 170, 30); S.pencil(760, 690, 120, -40, S.start, 0);
  DS.card(S, "CARL SAGAN", 560, 470, { size: DS.type.small });
  quote(S, 1320, 500, ["THAT'S HERE.", "THAT'S HOME.", "THAT'S US."], "CARL SAGAN, PALE BLUE DOT", { size: DS.type.title, ts: [W(75, 0), W(75, 2), W(75, 4)], t: W(75, 0) });
  DS.vignette(S); }

// At the Jet Propulsion Laboratory, visitors kept touching the printed dot,
{ const S = sc(76, 0, { cam: "push", focus: "960 420" }); DS.room(S, { wall: "paper", floor: "gray", window: false, back: [180, 80, 1740, 780] });
  for (let i = 0; i < 7; i++) pbd(S, 280 + i * 196, 300, 176, 200, { dot: i === 4, fy: 0.6 });
  const dx = 280 + 4 * 196 + 88, dy = 300 + 120;
  person(S, 520, GN, "near", 2, { s: 1.05, look: 6 }); person(S, 1600, GN, "near", 6, { s: 1.05, look: -6, mood: "smile" });
  const F = person(S, dx - 105, GN, "near", 0, { s: 1.25, look: 4, mood: "wow" }); F.setPose(W(76, 7), "stand", [[[-28, 52], [-48, 100]], [[30, -60], [60, -187]]]);
  DS.card(S, "JET PROPULSION LABORATORY", 960, 130, { size: DS.type.small, t: W(76, 2) });
  DS.vignette(S); }

// until they wore it away, more than once. // So why does a dot do that to people?
{ const S = sc(77, 0, { cam: "zoom", focus: "860 540" }); DS.room(S, ROOM.gallery);
  const P = pbd(S, 360, 150, 880, 620, { fy: 0.55 });
  S.fill(circ(P.dx, P.dy, 30), W(77, 2), 0, DS.c("paper", 2), 1);
  const H = hand(S, P.dx + 34, P.dy, { sleeve: "green" }); S.move(H, W(77, 0), 1.6, { x: 30 }, "sine.inOut");
  DS.card(S, "WORN AWAY, MORE THAN ONCE", 800, 860, { size: DS.type.small, t: W(77, 2), tc: "red" });
  DS.card(S, "WHY A DOT?", 1530, 230, { size: DS.type.title, t: W(78, 1), tc: "blue" });
  DS.vignette(S); }

// ===================== 5. Why a dot changes people =====================
// In twenty sixteen, psychologist David Yaden's team went through astronauts' accounts of seeing the Earth.
{ const S = sc(79, 0, { cam: "push", focus: "900 560" }); DS.room(S, ROOM.lab);
  seated(S, 700, 700, Object.assign({ fn: (S2, ...a) => who(S2, ...a), s: 1.1, mood: "flat", look: 6 }, SCI));
  table(S, 420, 1500, 700);
  [[900, 5], [1080, 7], [1260, 4]].forEach(([x, n], j) => { for (let i = 0; i < n; i++) paperR(S, x - 70 + (i % 2) * 6, 690 - i * 14, 150, 18, { t: W(79, 9) + j * 0.1 }); helmetIcon(S, x + 4, 690 - n * 14 - 50, 34, W(79, 9) + j * 0.1); });
  DS.card(S, "2016 · DAVID YADEN'S TEAM", 900, 140, { size: DS.type.small, t: W(79, 1) });
  DS.card(S, "ASTRONAUTS' ACCOUNTS", 1100, 300, { size: DS.type.small, t: W(79, 9) });
  DS.vignette(S); }

// The same things kept coming up: beauty, overwhelming emotion, / and feeling connected to everyone down there.
{ const S = sc(80, 0, { cam: "push" }); DS.room(S, ROOM.lab);
  [[400, W(80, 6), ["BEAUTY"]], [960, W(80, 7), ["OVERWHELMING", "EMOTION"]], [1520, W(81, 1), ["CONNECTED"]]].forEach(([x, t, strs], i) => {
    panel(S, x, 520, 480, 540, t);
    if (i === 0) { S.draw(rays(x, 420, 40, 120, 8), t, 0, { c: DS.c("gold"), w: DS.w.near }); DS.shape(S, poly(Array.from({ length: 10 }, (_, j) => { const a = -Math.PI / 2 + (j * Math.PI) / 5, r = j % 2 ? 30 : 70; return [x + Math.cos(a) * r, 420 + Math.sin(a) * r]; }), 0) + " Z", "gold", { t }); }
    if (i === 1) { heart(S, x, 410, 2.2, t); S.drop(x + 90, 330, 1.6, t); }
    if (i === 2) { earth(S, x, 440, 110, { t }); [[-150, 0], [150, 0]].forEach(([dx]) => { S.draw(line([x + dx * 0.55, 440], [x + dx, 440], 0), t, 0, { c: DS.c("ink"), w: DS.w.mid }); S.draw(circ(x + dx, 420, 18), t, 0, { fill: DS.P.white[0], c: DS.c("ink"), w: DS.w.mid }); }); }
    strs.forEach((s, j) => txt(S, s, x, 680 + j * 52, { t, size: DS.type.small }));
  });
  DS.card(S, "AGAIN AND AGAIN", 960, 150, { size: DS.type.body });
  DS.vignette(S); }

// They called it a state of awe, / caused by "a particularly striking visual stimulus." / That stimulus is the planet you live on.
{ const S = sc(82, 0, { cam: "push", focus: "1000 560" }); space(S, DS.outdoor(S, SPACE));
  earth(S, 1140, 600, 290);
  DS.card(S, "A STATE OF AWE", 480, 160, { size: DS.type.body, t: W(82, 5) });
  const t = W(83, 0); S.draw(smooth([[810, 410], [880, 380], [930, 420]]), t, 0, { c: DS.c("ink", 1), w: DS.w.detail });
  panel(S, 480, 420, 680, 170, t); txt(S, "A PARTICULARLY STRIKING", 480, 404, { t }); txt(S, "VISUAL STIMULUS", 480, 460, { t });
  S.arrow(560, 760, 1060, 620, W(84, 3), 0, { c: DS.c("red"), w: DS.w.near, bend: 0.15 });
  DS.card(S, "YOU LIVE HERE", 460, 790, { size: DS.type.body, t: W(84, 3), tc: "red" });
  DS.vignette(S); }

// In two thousand three, Dacher Keltner and Jonathan Haidt gave awe two ingredients.
const AWEB = (S) => { wboard(S, 500, 130, 920, 560); S.text("AWE =", 700, 360, { size: DS.type.title, c: DS.c("ink") }); [[960, 1], [1240, 2]].forEach(([x, n]) => { S.draw(rrect(x - 110, 240, 220, 220, DS.r.md), S.start, 0, { c: DS.c("gray", 2), w: DS.w.mid }); S.text(String(n), x - 80, 290, { size: DS.type.caption, c: DS.c("gray", 2) }); }); S.text("+", 1100, 370, { size: DS.type.title, c: DS.c("ink") }); };
{ const S = sc(85, 0, { cam: "push", focus: "960 460" }); DS.room(S, ROOM.lab);
  AWEB(S);
  S.text("2 INGREDIENTS", 1100, 600, { size: DS.type.small, t: W(85, 11), c: DS.c("blue", 2) });
  who(S, 300, GN, "near", { s: 1.1, hair: "short", hairC: DS.c("gray", 1), outfitC: DS.c("purple"), mood: "smile", look: 6, t: W(85, 4) });
  who(S, 1640, GN, "near", { s: 1.1, hair: "curly", hairC: DS.c("ink"), outfitC: DS.c("green"), mood: "flat", look: -6, t: W(85, 7) });
  DS.card(S, "DACHER KELTNER", 300, 800, { size: DS.type.caption, t: W(85, 4) });
  DS.card(S, "JONATHAN HAIDT", 1600, 800, { size: DS.type.caption, t: W(85, 7) });
  DS.card(S, "2003", 960, 96, { size: DS.type.small, t: W(85, 1) });
  DS.vignette(S); }

// Something vast. And a mind that has to stretch to take it in. / From orbit, you get both at once.
{ const S = sc(86, 0, { cam: "push", focus: "1100 420" }); DS.room(S, ROOM.lab);
  AWEB(S);
  DS.shape(S, poly([[870, 440], [940, 290], [980, 340], [1020, 270], [1050, 440]], 0) + " Z", "gray", { t: W(86, 1) }); S.text("VAST", 960, 520, { size: DS.type.caption, t: W(86, 1), c: DS.c("ink") });
  S.draw(circ(1240, 350, 56), W(86, 8), 0, { fill: DS.P.white[0], c: DS.c("ink"), w: DS.w.mid }); [[-1, 0], [1, 0], [0, -1]].forEach(([a, b]) => S.arrow(1240 + a * 66, 350 + b * 66, 1240 + a * 104, 350 + b * 104, W(86, 8), 0, { c: DS.c("blue"), w: DS.w.mid }));
  S.text("STRETCH", 1240, 520, { size: DS.type.caption, t: W(86, 8), c: DS.c("ink") });
  earth(S, 1100, 840, 90, { t: W(87, 1) }); tick(S, 1050, 262, 1.1, W(87, 4)); tick(S, 1330, 262, 1.1, W(87, 4));
  DS.card(S, "FROM ORBIT: BOTH AT ONCE", 1100, 650, { size: DS.type.small, t: W(87, 1), tc: "green" });
  DS.vignette(S); }

// Astronaut Ron Garan saw how thin our air is: / "that paper-thin layer keeps every living thing on our planet alive."
{ const S = sc(88, 0, { cam: "push", focus: "960 640" }); space(S, DS.outdoor(S, SPACE));
  S.fill(circ(960, 2120, 1416), S.start, 0, DS.c("sky", 1), 0.95);
  earth(S, 960, 2120, 1400, { halo: false, shift: [0, -0.72] });
  { const g = S.grp(); DS.shape(S, rect(1300, 250, 360, 20), "gray", { parent: g }); [1320, 1580].forEach((x) => DS.shape(S, rect(x, 190, 70, 140), "navy", { flat: true, tone: 1, w: "detail", parent: g })); DS.shape(S, rrect(1420, 230, 120, 60, DS.r.sm), "white", { parent: g }); drift(g, S.start, S.len, -40, 0, 0, 1480, 260); }
  DS.card(S, "RON GARAN, ASTRONAUT", 480, 140, { size: DS.type.small, t: W(88, 1) });
  quote(S, 760, 410, ["THAT PAPER-THIN LAYER KEEPS", "EVERY LIVING THING ON", "OUR PLANET ALIVE."], "RON GARAN", { size: DS.type.caption, t: W(89, 0) });
  S.arrow(1000, 560, 1160, 700, W(89, 1), 0, { c: DS.c("yellow"), w: DS.w.near, bend: 0.2 });
  DS.vignette(S); }

// And awe changes how people act, even on the ground.
{ const S = sc(90, 0, { cam: "pull" }); DS.outdoor(S, { hy: 700, sky: "sky", sun: [1650, 160] });
  puff(S, 500, 260, 2); puff(S, 1200, 200, 1.6);
  person(S, 600, 930, "near", 1, { s: 1.0, mood: "wow", look: 4 });
  person(S, 960, 940, "near", 2, { s: 1.05, mood: "smile", pose: "wave", look: 0 });
  person(S, 1320, 930, "near", 3, { s: 1.0, mood: "wow", look: -4 });
  DS.card(S, "EVEN ON THE GROUND", 960, 420, { size: DS.type.body, t: W(90, 6) });
  DS.vignette(S); }

// In twenty fifteen, Paul Piff and Dacher Keltner's team took students to a grove of eucalyptus trees over sixty metres tall.
{ const S = sc(91, 0, { cam: "push", focus: "960 640" }); DS.outdoor(S, { hy: 780, sky: "sky", sun: [1700, 120] });
  [[220, 70], [620, 90], [1060, 80], [1460, 96], [1800, 70]].forEach(([x, w], i) => tree(S, x, 900, w, 110 + (i % 2) * 40));
  for (let i = 0; i < 7; i++) person(S, 420 + i * 150, 900, "far", i, { s: 1.1, mood: "wow", look: 0, t: W(91, 10) + i * 0.05 });
  S.draw(line([1660, 900], [1660, 120], 0), W(91, 17), 0, { c: DS.c("red"), w: DS.w.near }); [900, 120].forEach((y) => S.draw(line([1630, y], [1690, y], 0), W(91, 17), 0, { c: DS.c("red"), w: DS.w.near }));
  DS.card(S, "OVER 60 METRES", 1500, 520, { size: DS.type.small, t: W(91, 18), tc: "red" });
  DS.card(S, "2015 · PIFF & KELTNER'S TEAM", 800, 330, { size: DS.type.small, t: W(91, 3) });
  DS.vignette(S); }

// One minute looking up. Then a researcher staged an accident with a box of pens.
{ const S = sc(92, 0, { cam: "push", focus: "1100 640" }); DS.outdoor(S, { hy: 780, sky: "sky", sun: false });
  [[180, 110], [760, 130], [1780, 120]].forEach(([x, w]) => tree(S, x, 930, w, -40));
  [400, 560, 720].forEach((x, i) => person(S, x, GN, "near", i + 1, { s: 1.0, mood: "wow", look: 0 }));
  stopwatch(S, 560, 290, 80, { dur: 2.5, go: S.start, turn: 360 });
  DS.card(S, "1 MINUTE LOOKING UP", 560, 120, { size: DS.type.small });
  const R = who(S, 1300, GN, "near", Object.assign({ s: 1.1, mood: "worried", look: -6, pose: "reach" }, SCI));
  DS.shape(S, rrect(1420, 760, 90, 60, DS.r.xs), "white", { w: "detail" });
  pens(S, 1250, 900, 11, W(92, 9), 360);
  DS.card(S, "A STAGED ACCIDENT", 1300, 470, { size: DS.type.small, t: W(92, 7), tc: "red" });
  DS.vignette(S); }

// The tree group picked up more pens / than students who'd stared at a tall building.
{ const S = sc(93, 0, { cam: "push" }); DS.outdoor(S, { hy: 760, sky: "sky", sun: false });
  [[180, 90], [600, 100]].forEach(([x, w]) => tree(S, x, 900, w, 60));
  building(S, 1140, 900, 520, 820);
  DS.shape(S, rect(950, -200, 20, 1500), "ink", { flat: true, w: "hair" });
  kneel(S, 420, 950, 1, 1, { mood: "smile" }); kneel(S, 760, 950, -1, 3, { mood: "smile" }); pens(S, 590, 910, 8, S.start, 200);
  kneel(S, 1300, 950, 1, 5); person(S, 1640, GN, "near", 6, { s: 1.0, look: -6 }); pens(S, 1450, 910, 7, S.start, 200);
  DS.card(S, "TREES: 7.70 PENS", 480, 140, { size: DS.type.small, t: W(93, 3), tc: "green" });
  DS.card(S, "BUILDING: 7.02 PENS", 1400, 140, { size: DS.type.small, t: W(94, 6) });
  DS.vignette(S); }

// They also felt they deserved to be paid about two dollars less.
{ const S = sc(95, 0, { cam: "push" }); DS.outdoor(S, { hy: 760, sky: "sky", sun: false });
  [[180, 90], [600, 100]].forEach(([x, w]) => tree(S, x, 900, w, 60));
  building(S, 1140, 900, 520, 820);
  DS.shape(S, rect(950, -200, 20, 1500), "ink", { flat: true, w: "hair" });
  panel(S, 480, 640, 400, 460, S.start); coinStack(S, 480, 820, 9, W(95, 7)); txt(S, "$3.57", 480, 520, { size: DS.type.title, t: W(95, 7) });
  panel(S, 1440, 640, 400, 460, S.start); coinStack(S, 1440, 820, 14, W(95, 7)); txt(S, "$5.74", 1440, 520, { size: DS.type.title, t: W(95, 7) });
  DS.card(S, "DESERVED PAY", 960, 140, { size: DS.type.small, t: W(95, 4) });
  DS.card(S, "ABOUT $2 LESS", 480, 260, { size: DS.type.body, t: W(95, 9), tc: "green" });
  DS.vignette(S); }

// One minute of trees. / Dave is keeping his jar away from trees.
{ const S = sc(96, 0, { cam: "push", focus: "800 600" }); DS.outdoor(S, { hy: 660, sky: "sky", sun: [1700, 150] });
  roundTree(S, 1450, 930, 1.6);
  const F = dave(S, 760, GN, "near", { pose: "hold", mood: "worried", look: 8 });
  const [hx, hy] = F.hand("R"); const J = jar(S, hx + 10, hy + 70, 0.8, { coins: 3 });
  F.setPose(W(97, 2), "reachL"); S.move(J, W(97, 2), 0.4, { x: -290, y: -10 }); F.face(W(97, 2), "determined", 8);
  DS.card(S, "1 MINUTE OF TREES", 960, 140, { size: DS.type.body });
  DS.card(S, "AWAY FROM TREES", 470, 420, { size: DS.type.small, t: W(97, 5), tc: "red" });
  DS.vignette(S); }

// Psychologists call it the small self. You feel smaller. And you get kinder.
{ const S = sc(98, 0, { cam: "push", focus: "960 600" }); DS.outdoor(S, { hy: 700, sky: "sky", sun: [1700, 150] });
  tree(S, 380, 930, 130, -60, { k: 1.4 });
  const A = person(S, 900, GN, "near", 2, { s: 1.15, mood: "wow", look: -6 }); A.grow(W(98, 7), 0.6, 0.76);
  A.setPose(W(98, 11), "reach"); A.face(W(98, 11), "smile", 6);
  person(S, 1360, GN, "near", 5, { s: 1.05, mood: "flat", look: -6 }).face(W(98, 11) + 0.2, "smile", -6);
  heart(S, 1130, 520, 1.3, W(98, 11));
  DS.card(S, "THE SMALL SELF", 1100, 150, { size: DS.type.body, t: W(98, 3) });
  DS.card(S, "SMALLER, AND KINDER", 1100, 330, { size: DS.type.small, t: W(98, 8), tc: "green" });
  DS.vignette(S); }

// So the plan is clear. Go up, look down, come home kinder.
{ const S = sc(99, 0, { cam: "push", focus: "1100 440" }); DS.room(S, ROOM.home);
  wboard(S, 820, 130, 860, 600);
  S.text("THE PLAN", 1250, 240, { size: DS.type.title, t: W(99, 1), c: DS.c("ink") });
  [[W(99, 5), "1. GO UP", 0], [W(99, 7), "2. LOOK DOWN", 1], [W(99, 9), "3. COME HOME KINDER", 2]].forEach(([t, s, i]) => { const y = 360 + i * 120; S.text(s, 900, y + 18, { size: DS.type.small, t, anchor: "start", c: DS.c("ink") });
    if (i === 0) rocketIcon(S, 1610, y - 10, 1.0, t); if (i === 1) eyeIcon(S, 1610, y, 0.8, t); if (i === 2) heart(S, 1610, y, 1.0, t); });
  const F = dave(S, 480, GN, "near", { pose: "point", mood: "determined", look: 6 });
  jar(S, 260, GN, 0.8, { coins: 3 });
  DS.vignette(S); }

// ===================== 6. The part nobody talks about =====================
// Now, back down the ladder, to the rung Dave is saving for.
{ const S = sc(100, 0, { cam: "push", focus: "900 560" }); const R = ladder(S, DS.outdoor(S, LSKY), { rungs: { plane: true, shatner: W(100, 6), gagarin: true, a17: true, moon: true, voyager: true } });
  climber(S, "voyager", { to: "shatner", at: W(100, 1), dur: 1.6, mood: "flat" });
  DS.card(S, "DAVE'S RUNG: $450,000", 470, 560, { size: DS.type.caption, t: W(100, 8), tc: "red" });
  DS.vignette(S); }

// In October twenty twenty-one, William Shatner, aged ninety, / flew to space on a Blue Origin rocket.
{ const S = sc(101, 0, { cam: "push", focus: "1000 560" }); DS.outdoor(S, { hy: 700, sky: "sky", hills: "sand", ground: "sand", sun: [1700, 140] });
  const Rk = rocket(S, 1520, 880, 1.0, { flame: W(102, 0) }); S.move(Rk, W(102, 0) + 0.3, 2.2, { y: -300 }, "power2.in");
  puff(S, 1440, 900, 1.2, W(102, 0) + 0.2, { c: DS.c("white", 2) }); puff(S, 1600, 910, 1.1, W(102, 0) + 0.3, { c: DS.c("white", 2) });
  who(S, 520, GN, "near", Object.assign({ s: 1.1, mood: "smile", look: 6 }, SHAT));
  DS.card(S, "OCTOBER 2021", 520, 360, { size: DS.type.small, t: W(101, 1) });
  DS.card(S, "WILLIAM SHATNER, 90", 520, 470, { size: DS.type.small, t: W(101, 4) });
  DS.card(S, "BLUE ORIGIN ROCKET", 1040, 260, { size: DS.type.small, t: W(102, 5) });
  DS.vignette(S); }

// He had played a starship captain for decades, / and he flew as a guest. / Dave writes this down.
{ const S = sc(103, 0, { cam: "push", focus: "1000 560" }); DS.room(S, ROOM.home);
  tv(S, 480, 500, 1.0);
  DS.card(S, "STARSHIP CAPTAIN, FOR DECADES", 520, 150, { size: DS.type.caption, t: W(103, 3) });
  ticket(S, 1000, 380, 1.1, { str: "SEAT", rot: -6 }); stamp(S, 1030, 440, "GUEST", W(104, 4), "green");
  const F = dave(S, 1480, GN, "near", { pose: "hold", mood: "determined", look: -4, t: W(105, 0) });
  DS.drop(S, rect(1336, 728, 300, 180), { t: W(105, 0) }); DS.shape(S, rect(1330, 720, 300, 180), "white", { t: W(105, 0), flat: true, w: "detail" });
  S.text("1. play a captain", 1350, 790, { size: DS.type.caption, font: "caveat", anchor: "start", t: W(105, 1), c: DS.c("blue", 2) });
  S.text("2. for decades", 1350, 850, { size: DS.type.caption, font: "caveat", anchor: "start", t: W(105, 2), c: DS.c("blue", 2) });
  DS.vignette(S); }

// The flight lasted about ten minutes. / He climbed out in tears and said, / "I hope I never recover from this."
{ const S = sc(106, 0, { cam: "push", focus: "900 560" }); DS.outdoor(S, { hy: 700, sky: "sky", hills: "sand", ground: "sand", sun: [1700, 140] });
  landed(S, 1380, 900, 1.1);
  stopwatch(S, 400, 330, 80, { t: W(106, 3), go: W(106, 3), dur: 1.5, turn: 60 });
  DS.card(S, "ABOUT 10 MINUTES", 400, 160, { size: DS.type.small, t: W(106, 3) });
  const H = who(S, 860, GN, "near", Object.assign({ s: 1.1, mood: "flat", look: 6 }, SHAT)); H.face(W(107, 4), "cry", 0);
  say(S, 1100, 330, 380, 110, 900, 560, ["I HOPE I NEVER", "RECOVER FROM THIS."], W(108, 0), { size: DS.type.caption });
  DS.vignette(S); }

// A year later, he wrote about it. It wasn't the celebration he'd expected.
{ const S = sc(109, 0, { cam: "push", focus: "960 520" }); DS.room(S, ROOM.home);
  const top = desk(S, 300, 960, 760);
  book(S, 560, top - 160, 240, 320, ["HIS", "BOOK"], { name: "red" });
  DS.card(S, "A YEAR LATER", 560, 200, { size: DS.type.body, t: W(109, 1) });
  [[1220, 380, "pink"], [1360, 320, "yellow"], [1500, 400, "green"]].forEach(([x, y, n]) => { S.draw(smooth([[x, y + 70], [x + 10, y + 200], [x - 6, y + 330]]), S.start, 0, { c: DS.c("ink"), w: DS.w.detail }); DS.shape(S, circ(x, y, 60, 74), n, {}); });
  for (let i = 0; i < 14; i++) S.fill(rect(1150 + ((i * 89) % 420), 560 + ((i * 47) % 200), 14, 22), S.start, 0, DS.c(PENC[i % 7]), 0.9);
  S.cross(1360, 470, 3.2, W(109, 9), 0, { c: DS.c("red"), w: DS.w.near });
  DS.card(S, "NOT A CELEBRATION", 1360, 830, { size: DS.type.small, t: W(109, 10), tc: "red" });
  DS.vignette(S); }

// "It was among the strongest feelings of grief I have ever encountered."
{ const S = sc(110, 0, { cam: "push", focus: "1100 500" }); DS.room(S, { wall: "dusk", floor: "wood", window: false });
  who(S, 420, GN, "near", Object.assign({ s: 1.0, mood: "sad", look: 6 }, SHAT));
  quote(S, 1180, 480, ["IT WAS AMONG THE STRONGEST", "FEELINGS OF GRIEF", "I HAVE EVER ENCOUNTERED."], "WILLIAM SHATNER, 2022", { ts: [W(110, 0), W(110, 6), W(110, 8)], t: W(110, 0) });
  DS.vignette(S, 0.18); }

// Above him, a cold black emptiness. / Below him, the thin blue blanket that everything lives under.
{ const S = sc(111, 0, { cam: "push", focus: "960 560" }); space(S, DS.outdoor(S, SPACE), { deep: 0.92, n: 8 });
  S.fill(circ(960, 2100, 1340), S.start, 0, DS.c("sky", 1), 0.95); S.fill(circ(960, 2100, 1315), S.start, 0, DS.c("sky", 0), 1);
  earth(S, 960, 2100, 1300, { halo: false, shift: [0, -0.76] });
  { const g = S.grp(); DS.shape(S, `M${900} ${540} L${900} ${490} Q${960} ${430} ${1020} ${490} L${1020} ${540} Z`, "white", { parent: g }); DS.shape(S, rect(890, 538, 140, 16), "gray", { parent: g, w: "detail" }); drift(g, S.start, S.len, 30, -10, 4, 960, 500); }
  DS.card(S, "A COLD BLACK EMPTINESS", 960, 200, { size: DS.type.body, t: W(111, 3) });
  DS.card(S, "A THIN BLUE BLANKET", 960, 690, { size: DS.type.body, t: W(112, 3), tc: "blue" });
  DS.vignette(S); }

// He later learned it had a name, the Overview Effect. / For him, it came as grief first, and hope later.
{ const S = sc(113, 0, { cam: "push", focus: "1100 500" }); DS.room(S, ROOM.home);
  const H = who(S, 360, GN, "near", Object.assign({ s: 1.0, mood: "flat", look: 6 }, SHAT)); H.face(W(114, 8), "smile", 6);
  DS.card(S, "THE OVERVIEW EFFECT", 1060, 140, { size: DS.type.body, t: W(113, 7) });
  const t1 = W(114, 4); puff(S, 860, 440, 2.2, t1, { c: DS.c("gray", 1) }); for (let i = 0; i < 6; i++) S.draw(line([780 + i * 34, 520], [770 + i * 34, 580], 0), t1, 0, { c: DS.c("blue", 1), w: DS.w.mid });
  txt(S, "GRIEF FIRST", 860, 680, { size: DS.type.small, t: t1 });
  S.arrow(1060, 450, 1260, 450, W(114, 7), 0, { c: DS.c("ink"), w: DS.w.near });
  const t2 = W(114, 8); S.draw(rays(1470, 440, 100, 150, 12), t2, 0, { c: DS.c("gold"), w: DS.w.near }); DS.shape(S, circ(1470, 440, 80), "yellow", { t: t2 });
  txt(S, "HOPE LATER", 1470, 680, { size: DS.type.small, t: t2 });
  DS.vignette(S); }

// It isn't new, either. In nineteen fifty-seven, researchers asked a hundred and thirty-seven Navy and Marine pilots about flying high.
{ const S = sc(115, 0, { cam: "push", focus: "960 520" }); DS.outdoor(S, { hy: 1300, sky: "night", sun: false });
  S.fill(circ(960, 2500, 1640), S.start, 0, DS.c("sky", 1), 0.6); S.fill(circ(960, 2500, 1600), S.start, 0, DS.c("blue"), 1);
  jet(S, 960, 520, 1.3);
  DS.card(S, "IT ISN'T NEW", 420, 160, { size: DS.type.small, t: W(115, 1) });
  DS.card(S, "1957", 1500, 160, { size: DS.type.body, t: W(115, 5) });
  DS.card(S, "137 NAVY & MARINE PILOTS", 960, 790, { size: DS.type.body, t: W(115, 12) });
  DS.vignette(S); }

// About a third had felt strangely cut off from the Earth. They called it break-off.
{ const S = sc(116, 0, { cam: "push", focus: "800 500" }); DS.room(S, ROOM.lab);
  wboard(S, 200, 130, 900, 700);
  for (let i = 0; i < 137; i++) { const x = 280 + (i % 13) * 58, y = 220 + Math.floor(i / 13) * 56, hi = (i * 37) % 137 < 48;
    S.draw(circ(x, y, 19), S.start, 0, { fill: DS.P.white[0], c: DS.c("gray", 2), w: DS.w.detail });
    if (hi) S.draw(circ(x, y, 19), W(116, 2) + (i % 13) * 0.02, 0, { fill: DS.c("orange", 1), c: DS.c("orange", 2), w: DS.w.detail }); }
  DS.card(S, "48 OF 137", 1450, 330, { size: DS.type.title, t: W(116, 2) });
  DS.card(S, "CUT OFF FROM THE EARTH", 1450, 470, { size: DS.type.caption, t: W(116, 6) });
  DS.card(S, "BREAK-OFF", 1450, 640, { size: DS.type.title, t: W(116, 14), tc: "red" });
  DS.vignette(S); }

// Historian Jordan Bimm adds a catch. People now go up expecting it.
{ const S = sc(117, 0, { cam: "push", focus: "1000 520" }); DS.room(S, ROOM.office);
  who(S, 380, GN, "near", { s: 1.1, hair: "side", hairC: DS.c("earth", 2), outfitC: DS.c("purple"), mood: "flat", look: 6 });
  DS.card(S, "JORDAN BIMM, HISTORIAN", 400, 480, { size: DS.type.caption, t: W(117, 1) });
  DS.shape(S, rrect(1560, 300, 220, 560, DS.r.md), "white", { tone: 2 }); S.fill(rrect(1580, 330, 180, 500, DS.r.sm), S.start, 0, DS.c("ink", 2), 1); STAR.slice(0, 10).forEach(([x, y]) => S.fill(circ(1590 + (x % 160), 350 + (y % 460), 3), S.start, 0, DS.P.white[0], 0.8));
  [[900, 0], [1130, 3], [1360, 4]].forEach(([x, i], j) => { const t = W(117, 6) + j * 0.12; elder(S, x, GN, "near", i, { s: 1.0, mood: "smile", look: 6 }); say(S, x - 10, 380, 100, 80, x, 560, [], t, { think: true }); earth(S, x - 30, 380, 30, { t }); heart(S, x + 30, 384, 0.6, t); });
  DS.card(S, "THEY GO UP EXPECTING IT", 1130, 150, { size: DS.type.small, t: W(117, 9), tc: "red" });
  DS.vignette(S); }

// Astronaut Loren Acton told Frank White, / "I went up expecting that experience, and I had it."
{ const S = sc(118, 0, { cam: "push", focus: "900 520" }); DS.room(S, ROOM.office);
  astro(S, 420, GN, "near", { s: 1.1, helmet: false, mood: "smile", look: 6, hairC: DS.c("gray", 2) });
  DS.card(S, "LOREN ACTON, ASTRONAUT", 440, 480, { size: DS.type.caption, t: W(118, 1) });
  seated(S, 1500, 700, Object.assign({ fn: (S2, ...a) => who(S2, ...a), s: 1.1, mood: "flat", look: -6 }, FW));
  table(S, 1240, 1760, 700); tape(S, 1330, 660, 0.7);
  DS.card(S, "FRANK WHITE", 1560, 430, { size: DS.type.small, t: W(118, 4) });
  quote(S, 900, 250, ["I WENT UP EXPECTING THAT", "EXPERIENCE, AND I HAD IT."], "LOREN ACTON", { t: W(119, 0) });
  DS.vignette(S); }

// So the ticket might not even deliver. / Dave stares at his jar.
{ const S = sc(120, 0, { cam: "push", focus: "1000 640" }); DS.room(S, ROOM.night);
  nightWin(S, 1460, 160, 220, 200);
  seated(S, 700, 700, { fn: dave, mood: "flat", look: 6 }).face(W(121, 1), "sad", 8);
  table(S, 420, 1500, 700);
  jar(S, 1000, 700, 1.0, { coins: 3 });
  ticket(S, 1300, 660, 0.8, { rot: 6 }); S.text("?", 1420, 600, { size: DS.type.title, t: W(120, 3), c: DS.c("red", 1) });
  DS.card(S, "MIGHT NOT DELIVER", 960, 150, { size: DS.type.body, t: W(120, 3), tc: "red" });
  DS.vignette(S, 0.18); }

// ===================== 7. The cheap seat =====================
// But here's what isn't in the sales pitch. / In twenty twenty, Virginia Sturm and Dacher Keltner's team
{ const S = sc(122, 0, { cam: "push", focus: "800 520" }); DS.room(S, ROOM.office);
  pitch(S, 560, 500);
  const t = W(122, 3); S.draw(circ(560, 760, 120), t, 0, { fill: DS.c("glass", 1), c: DS.c("ink"), w: DS.w.near, op: 0.9 }); S.draw(line([645, 845], [740, 940], 0), t, 0, { c: DS.c("ink"), w: DS.w.near * 2 });
  DS.card(S, "NOT IN THE PITCH", 1340, 150, { size: DS.type.body, t: W(122, 3), tc: "red" });
  who(S, 1360, GN, "near", Object.assign({ s: 1.1, mood: "smile", look: -6, t: W(123, 3) }, SCI));
  DS.card(S, "2020 · STURM & KELTNER'S TEAM", 1340, 420, { size: DS.type.caption, t: W(123, 3) });
  DS.vignette(S); }

// asked sixty older adults to take a fifteen-minute walk, once a week, for eight weeks.
{ const S = sc(123, 9, { cam: "push", focus: "960 600" }); DS.outdoor(S, { hy: 620, sky: "sky", sun: [1650, 150], path: [560, 1360] });
  [[300, 900, 0], [560, 860, 1], [820, 930, 2], [1100, 880, 3], [1360, 920, 4], [1620, 870, 5]].forEach(([x, gy, i], j) => elder(S, x, gy, "near", i, { s: 0.95, mood: "smile", look: 6, float: true }).walk(S.start, S.len, { x: 60 }));
  DS.card(S, "60 OLDER ADULTS", 960, 150, { size: DS.type.body, t: W(123, 10) });
  DS.card(S, "15 MINUTES · ONCE A WEEK · 8 WEEKS", 960, 270, { size: DS.type.caption, t: W(123, 16) });
  DS.vignette(S); }

// Half were told to look for awe. Somewhere vast. Somewhere new. With a sense of wonder.
{ const S = sc(124, 0, { cam: "push", focus: "1100 520" }); DS.outdoor(S, { hy: 660, sky: "sky", hills: "gray", sun: [1700, 140] });
  elder(S, 460, GN, "near", 1, { s: 1.1, mood: "smile", look: 6, pose: "hold" });
  panel(S, 1220, 520, 760, 520, S.start);
  [[W(124, 7), "SOMEWHERE VAST"], [W(124, 9), "SOMEWHERE NEW"], [W(124, 11), "A SENSE OF WONDER"]].forEach(([t, s], i) => { const y = 380 + i * 120; DS.shape(S, rrect(900, y - 40, 70, 70, DS.r.xs), "white", { w: "mid", flat: true }); txt(S, s, 1010, y + 18, { size: DS.type.small, anchor: "start" }); tick(S, 936, y - 6, 1.4, t); });
  DS.card(S, "HALF: LOOK FOR AWE", 1220, 150, { size: DS.type.body, tc: "green" });
  DS.vignette(S); }

// And on every walk, everyone took a selfie.
{ const S = sc(125, 0, { cam: "push", focus: "900 520" }); DS.outdoor(S, { hy: 640, sky: "sky", hills: "gray", sun: [1700, 140] });
  const F = elder(S, 760, GN, "near", 2, { s: 1.15, mood: "smile", look: 4, armR: [[50, -30], [110, -110]] });
  const [hx, hy] = F.hand("R"); DS.shape(S, rrect(hx - 26, hy - 60, 52, 90, DS.r.sm), "ink", { w: "detail" }); S.fill(rect(hx - 18, hy - 50, 36, 66), S.start, 0, DS.c("sky", 1), 1);
  DS.card(S, "EVERY WALK: A SELFIE", 1300, 300, { size: DS.type.body, t: W(125, 6) });
  DS.vignette(S); }

// Over the weeks, the awe walkers took up less and less of their own selfies. / And their smiles got bigger.
{ const S = sc(126, 0, { cam: "push", focus: "960 480" }); DS.room(S, ROOM.gallery);
  [[360, 120, "WEEK 1"], [760, 92, "WEEK 3"], [1160, 66, "WEEK 5"], [1560, 44, "WEEK 8"]].forEach(([x, r, s], i) => { const t = W(126, 1) + i * 0.3, P = selfie(S, x, 440, 300, 520, r, { t });
    const a = selfieFace(S, x, P.fy, r, false, t, P.k); S.hide(a, W(127, 2)); selfieFace(S, x, P.fy, r, true, W(127, 2), P.k); txt(S, s, x, 760, { size: DS.type.small, t }); });
  DS.card(S, "LESS AND LESS OF THE SELFIE", 960, 130, { size: DS.type.small, t: W(126, 8) });
  DS.card(S, "BIGGER SMILES", 960, 870, { size: DS.type.body, t: W(127, 2), tc: "green" });
  DS.vignette(S); }

// Their everyday distress fell more than the other walkers'. / It's one small study. But nobody needed a rocket.
{ const S = sc(128, 0, { cam: "push", focus: "800 500" }); DS.room(S, ROOM.lab);
  wboard(S, 200, 140, 1000, 640);
  S.draw(line([300, 220], [300, 700], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.mid }); S.draw(line([300, 700], [1120, 700], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.mid });
  txt(S, "DAILY DISTRESS", 520, 250, { size: DS.type.caption }); txt(S, "8 WEEKS", 1000, 750, { size: DS.type.caption });
  S.draw(smooth([[320, 320], [600, 350], [880, 380], [1100, 400]]), W(128, 0), 0, { c: DS.c("gray", 2), w: DS.w.near }); txt(S, "OTHER WALKS", 980, 360, { t: W(128, 6) });
  S.draw(smooth([[320, 320], [600, 440], [880, 560], [1100, 630]]), W(128, 3), 0, { c: DS.c("green"), w: DS.w.near }); txt(S, "AWE WALKS", 940, 660, { t: W(128, 3), c: DS.c("green", 2) });
  DS.card(S, "ONE SMALL STUDY", 700, 880, { size: DS.type.small, t: W(129, 1) });
  rocketIcon(S, 1530, 460, 2.6, W(129, 5)); xMark(S, 1530, 470, 2.2, W(129, 6));
  DS.card(S, "NO ROCKET NEEDED", 1530, 760, { size: DS.type.small, t: W(129, 6), tc: "green" });
  DS.vignette(S); }

// Remember Frank White in his plane seat? / He called what he felt a mild overview effect.
{ const S = sc(130, 0, { cam: "push", focus: "560 480" }); DS.room(S, CABIN); cabin(S, { wins: [260, 1320] });
  const top = seat(S, 760, 960); who(S, 760, top, "near", Object.assign({ s: 1.1, sit: true, mood: "smile", look: -8 }, FW));
  DS.card(S, "FRANK WHITE", 1240, 640, { size: DS.type.small, t: W(130, 1) });
  DS.card(S, "A MILD OVERVIEW EFFECT", 1240, 760, { size: DS.type.small, t: W(131, 6), tc: "green" });
  DS.vignette(S); }

// Even Ron Garan, who has been up there, says / "you don't have to be in orbit to have the orbital perspective."
{ const S = sc(132, 0, { cam: "push", focus: "900 520" }); DS.outdoor(S, { hy: 660, sky: "dusk", hills: "grass", sun: [1600, 300] });
  astro(S, 480, GN, "near", { s: 1.15, helmet: false, mood: "smile", look: 6, hairC: DS.c("gray", 1) });
  DS.card(S, "RON GARAN, ASTRONAUT", 480, 470, { size: DS.type.caption, t: W(132, 1) });
  quote(S, 1180, 330, ["YOU DON'T HAVE TO BE IN ORBIT", "TO HAVE THE ORBITAL PERSPECTIVE."], "RON GARAN", { size: DS.type.caption, t: W(133, 0) });
  DS.vignette(S); }

// So the sales pitch was right about the view. / It was just wrong about the word only.
{ const S = sc(134, 0, { cam: "push", focus: "1100 500" }); DS.room(S, ROOM.office);
  const P = pitch(S, 1180, 500);
  tick(S, P.view[0] - 10, P.view[1] + 20, 1.6, W(134, 6));
  DS.card(S, "RIGHT ABOUT THE VIEW", 450, 330, { size: DS.type.small, t: W(134, 6), tc: "green" });
  S.draw(line([P.only[0] - 170, P.only[1] + 6], [P.only[0] + 170, P.only[1] - 6], 0), W(135, 7), 0, { c: DS.c("red"), w: DS.w.near * 1.6 });
  DS.card(S, "WRONG ABOUT \"ONLY\"", 450, 560, { size: DS.type.small, t: W(135, 3), tc: "red" });
  DS.vignette(S); }

// ===================== 8. The hill =====================
// So tonight, Dave takes a little money out of the space fund. / Bus fare. And a flask of tea.
{ const S = sc(136, 0, { cam: "push", focus: "1000 600" }); DS.room(S, ROOM.night);
  nightWin(S, 1460, 160, 220, 200);
  const top = table(S, 1000, 1620, 720);
  jar(S, 1200, top, 1.0, { coins: 3 });
  const F = dave(S, 760, GN, "near", { pose: "reach", mood: "smile", look: 6 });
  const c = coin(S, 1200, 620, W(136, 3)); S.move(c, W(136, 3), 0.6, { x: -266, y: 84 });
  ticket(S, 1440, top - 50, 0.7, { str: "BUS", rot: 8, t: W(137, 0) });
  flask(S, 1560, top, 1.0, W(137, 4));
  DS.card(S, "TONIGHT", 760, 400, { size: DS.type.body, t: W(136, 1) });
  DS.card(S, "BUS FARE", 1300, 240, { size: DS.type.small, t: W(137, 0) });
  DS.card(S, "A FLASK OF TEA", 1300, 360, { size: DS.type.small, t: W(137, 4) });
  DS.vignette(S, 0.18); }

// He rides to the edge of town, / and climbs the hill nobody bothers with.
{ const S = sc(138, 0, { cam: "push", focus: "1100 560" }); DS.outdoor(S, { hy: 760, sky: "night", hills: "grass", ground: "grass", sun: false });
  STAR.slice(0, 50).forEach(([x, y, r, op]) => y < 560 && S.fill(circ(x, y, r), S.start, 0, DS.P.white[0], op));
  DS.shape(S, smooth([[860, 1000], [1100, 700], [1400, 420], [1620, 380], [1900, 460], [2120, 560]]) + " L2120 1280 L860 1280 Z", "grass", { flat: true, tone: 2 });
  S.draw(smooth([[1000, 960], [1180, 760], [1380, 560], [1560, 420]]), S.start, 0, { c: DS.c("sand", 1), w: DS.w.mid, op: 0.7 });
  DS.shape(S, rect(-200, 900, 1100, 90), "gray", { flat: true, tone: 2, w: "hair" });
  bus(S, 440, 920, 1.0);
  const F = dave(S, 1060, 880, "near", { s: 0.8, mood: "smile", look: 6, float: true, t: W(139, 0) }); F.walk(W(139, 0), 2.2, { x: 260, y: -270 });
  DS.card(S, "THE EDGE OF TOWN", 440, 560, { size: DS.type.small, t: W(138, 4) });
  DS.card(S, "THE HILL NOBODY BOTHERS WITH", 1100, 160, { size: DS.type.small, t: W(139, 3) });
  DS.vignette(S, 0.16); }

// Below him, the town is a scatter of orange lights. / Above him, more stars than he's seen in years.
{ const S = sc(140, 0, { cam: "pull", focus: "760 500" }); DS.outdoor(S, { hy: 700, sky: "night", hills: "navy", ground: "navy", sun: false });
  STAR.slice(0, 30).forEach(([x, y, r, op]) => y < 560 && S.fill(circ(x, y, r), S.start, 0, DS.P.white[0], op));
  STAR.forEach(([x, y, r, op], i) => y < 640 && S.fill(circ((x + 61) % 1900, (y + 23) % 640, r), W(141, 2) + (i % 12) * 0.06, 0, DS.P.white[0], op));
  townLights(S, 860, 720, W(140, 3));
  DS.shape(S, smooth([[-200, 760], [200, 660], [600, 610], [900, 660], [1200, 860], [1500, 1100]]) + " L1500 1280 L-200 1280 Z", "grass", { flat: true, tone: 2 });
  const F = seated(S, 560, 560, { fn: dave, s: 1.0, mood: "smile", look: 6, pose: "hold" });
  flask(S, 700, 640, 0.6);
  DS.vignette(S, 0.2); }

// Out there, Voyager one is still flying, about a light-day from home. / And the dot in its photo is the hill under Dave's feet.
{ const S = sc(142, 0, { cam: "push", focus: "700 560" }); space(S, DS.outdoor(S, SPACE));
  voyager(S, 1640, 260, 0.4);
  const p = S.draw(line([1560, 300], [270, 760], 0), W(142, 7), 0, { c: DS.c("yellow", 1), w: DS.w.detail, op: 0.6 }); dash(p, 10, 16);
  earth(S, 260, 770, 6);
  DS.card(S, "ABOUT A LIGHT-DAY FROM HOME", 1000, 140, { size: DS.type.small, t: W(142, 7) });
  S.draw(circ(260, 770, 28), W(143, 2), 0, { c: DS.c("yellow"), w: DS.w.near });
  const t = W(143, 7), lx = 640, ly = 580, lr = 200, g = S.grp(), k = clipTo(S.grp(g), circ(lx, ly, lr));
  S.fill(rect(lx - lr, ly - lr, lr * 2, lr * 2), t, 0, DS.c("night", 2), 1, k);
  STAR.slice(0, 30).forEach(([x, y, r]) => S.fill(circ(lx - lr + (x / 1920) * lr * 2, ly - lr + (y / 1080) * lr, r * 0.7), t, 0, DS.P.white[0], 0.8, k));
  townLights(S, lx + 10, ly + 80, t, 0.22, k);
  DS.shape(S, smooth([[lx - lr - 20, ly + 70], [lx - 80, ly + 20], [lx + 20, ly + 60], [lx + 120, ly + 150]]) + ` L${lx + lr} ${ly + lr + 20} L${lx - lr - 20} ${ly + lr + 20} Z`, "grass", { t, flat: true, tone: 2, w: "detail", parent: k });
  seated(S, lx - 80, ly + 20, { fn: dave, s: 0.36, mood: "smile", look: 6, float: true, t, parent: k });
  S.draw(circ(lx, ly, lr), t, 0, { c: DS.c("yellow"), w: DS.w.near, parent: g });
  S.draw(line([272, 750], [lx - lr * 0.8, ly + lr * 0.55], 0), t, 0, { c: DS.c("yellow"), w: DS.w.mid });
  DS.card(S, "DAVE'S HILL", 640, 330, { size: DS.type.body, t: W(143, 8) });
  DS.vignette(S); }

// New bottom rung on the ladder: one hill, two hundred metres high.
{ const S = sc(144, 0, { cam: "pull", focus: "900 760" }); ladder(S, DS.outdoor(S, LSKY), { rungs: { hill: W(144, 1), plane: true, shatner: true, gagarin: true, a17: true, moon: true, voyager: true } });
  climber(S, "hill", { mood: "happy", t: W(144, 6) });
  DS.card(S, "NEW BOTTOM RUNG", 440, 520, { size: DS.type.small, t: W(144, 0), tc: "green" });
  DS.vignette(S); }

// Dave takes a selfie. He's tiny in it, and smiling.
{ const S = sc(145, 0, { cam: "push", focus: "960 520" }); DS.outdoor(S, { hy: 760, sky: "night", hills: "navy", ground: "navy", sun: false });
  STAR.slice(0, 60).forEach(([x, y, r, op]) => S.fill(circ(x, y, r), S.start, 0, DS.P.white[0], op));
  const P = selfie(S, 900, 520, 500, 800, 0, { night: true });
  dave(S, 900, P.y0 + P.hh * 0.83, "near", { s: 0.3, mood: "happy", look: 0, float: true, parent: P.k });
  DS.card(S, "TINY, AND SMILING", 1500, 420, { size: DS.type.body, t: W(145, 5), tc: "green" });
  DS.vignette(S, 0.18); }

// Right now, you're standing on a planet / that moves about thirty kilometres every second.
{ const S = sc(146, 0, { cam: "pull", focus: "1060 600" }); space(S, DS.outdoor(S, SPACE));
  [[260, 520, 470], [200, 640, 560], [300, 760, 480]].forEach(([x, y, l]) => S.draw(line([x, y], [x + l, y], 0), S.start, 0, { c: DS.P.white[0], w: DS.w.mid, op: 0.3 }));
  earth(S, 1060, 680, 250);
  who(S, 1060, 432, "near", Object.assign({ s: 0.42, c: DS.P.white[0], mood: "smile", look: 0 }, YOU));
  DS.card(S, "YOU", 1060, 250, { size: DS.type.small, t: W(146, 2) });
  S.arrow(1370, 880, 1420, 470, W(147, 1), 0, { c: DS.c("yellow"), w: DS.w.near, bend: 0.25 });
  DS.card(S, "ABOUT 30 KM EVERY SECOND", 520, 300, { size: DS.type.small, t: W(147, 3) });
  DS.vignette(S); }

// You've seen the floor. / Tonight, go and look at the planet.
{ const S = sc(148, 0, { cam: "push", focus: "1200 560" }); DS.room(S, ROOM.night);
  const dx = 1240, dy = 240, dw = 360, dh = 540, k = clipTo(S.grp(), rect(dx, dy, dw, dh));
  S.fill(rect(dx, dy, dw, dh), S.start, 0, DS.vgrad(DS.c("ink", 2), DS.c("night")), 1, k);
  STAR.slice(0, 40).forEach(([x, y, r, op]) => S.fill(circ(dx + (x / 1920) * dw, dy + (y / 1080) * dh * 0.7, r * 0.8), S.start, 0, DS.P.white[0], op, k));
  DS.shape(S, smooth([[dx - 20, dy + dh * 0.82], [dx + dw * 0.5, dy + dh * 0.7], [dx + dw + 20, dy + dh * 0.8]]) + ` L${dx + dw + 20} ${dy + dh + 20} L${dx - 20} ${dy + dh + 20} Z`, "grass", { flat: true, tone: 2, w: "detail", parent: k });
  DS.shape(S, rect(dx - 20, dy - 20, dw + 40, 20), "white", { tone: 2 }); DS.shape(S, `M${dx} ${dy} L${dx - 150} ${dy - 40} L${dx - 150} ${dy + dh + 50} L${dx} ${dy + dh} Z`, "wood", {});
  const F = who(S, 760, GN, "near", Object.assign({ s: 1.15, mood: "flat", look: 6, float: true }, YOU));
  F.face(W(149, 1), "smile", 6); F.walk(W(149, 1), 2.4, { x: 560, y: -40 });
  const c1 = DS.card(S, "YOU'VE SEEN THE FLOOR", 720, 160, { size: DS.type.body }); S.fadeOut(c1.g, W(149, 0), 0.3);
  DS.card(S, "TONIGHT, LOOK AT THE PLANET", 760, 160, { size: DS.type.body, t: W(149, 0), tc: "blue" });
  DS.vignette(S, 0.16); }
