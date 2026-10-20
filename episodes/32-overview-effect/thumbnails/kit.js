// helpers copied from ../scenes.js (same Earth, Dave and jar as the video)
const who = (S, x, gy, layer = "near", o = {}) => {
  const s = (o.s || 1.1) * DS.depth[layer].s, g = o.parent || S.grp();
  if (!o.float) DS.shadow(S, x, o.gs ?? gy, 150 * s, { t: o.t, parent: g });
  const F = S.fig(x, gy, Object.assign({ hair: "short", outfit: "tee" }, o, { s, parent: g, w: DS.w[DS.depth[layer].w] * 1.3 * Math.sqrt(s) })).draw(o.t ?? S.start, 0.4);
  F.face(o.t ?? S.start, o.mood || "flat", o.look || 0);
  F.all = g;
  return F;
};
const dave = (S, x, gy, layer = "near", o = {}) => who(S, x, gy, layer, Object.assign({ s: 1.1, hair: "side", hairC: DS.c("brown"), outfitC: DS.c("blue") }, o));
let CP = 0;
const clipTo = (g, d) => { const id = "cp" + ++CP, cp = el("clipPath", { id }, dsDefs()); el("path", { d }, cp); g.setAttribute("clip-path", `url(#${id})`); return g; };
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
