// ===================== library/activity.js — one-person ACTIVITIES, JOBS and feelings-in-context =====================
// Each asset is a ready group: a figure (any cast style / body / outfit / face via the usual person options) in the right pose, with its
// prop already in hand or in place (derived from L.anchors, so it follows the figure on every cast style) plus a small bit of set
// (chair, desk, counter, bed…) and a contact shadow. Origin = bottom centre (feet) on the ground. Everything is drawn through the tokens.
//   L.put(S, "eat-burger", x, gy, { s, t })                       // defaults: Man 01
//   L.put(S, "job-doctor", x, gy, { style: "girl04", outfitC: "teal", face: "happy" })   // any person option overrides the default
// Options: style, body, skin, hair, hairC, outfit, outfitC, face, look, acc (added to the asset's own accessories), accC. s is applied by L.put.
// Needs people.js; uses wardrobe.js outfits/accessories when loaded (falls back to the plain T-shirt without it) and adds its own "act-*" ones.
(function () {
const L = window.L, f1 = L.f1, D = Math.PI / 180, r1 = (v) => Math.round(v * 10) / 10;
const CAT = "activity";
const sin = (a) => Math.sin(a * D), cos = (a) => Math.cos(a * D), rot2 = (p, a) => [p[0] * cos(a) - p[1] * sin(a), p[0] * sin(a) + p[1] * cos(a)];

// ---------- tiny shape kit (figure / world pixels, all through the L.* tokens) ----------
const sh = (d, c, o) => L.shape(d, c, Object.assign({ w: "detail" }, o));
const rr = (x, y, w, h, r, c, o) => sh(L.rrect(x, y, w, h, r), c, o);
const ci = (x, y, r, c, o) => sh(L.circ(x, y, r), c, o);
const el = (x, y, rx, ry, c, o) => sh(L.circ(x, y, rx, ry), c, o);
const po = (pts, c, o) => sh(L.poly(pts, true), c, o);
const sm = (pts, c, o) => sh(L.smooth([...pts, pts[0]]), c, o);
const ln = (pts, o) => L.stroke(L.poly(pts), Object.assign({ w: "detail" }, o));
const sl = (pts, o) => L.stroke(L.smooth(pts), Object.assign({ w: "detail" }, o));
const fl = (pts, c, op) => L.flat(L.poly(pts, true), c, op);
const fc = (x, y, r, c, op, ry) => L.flat(L.circ(x, y, r, ry || r), c, op);
const fr = (x, y, w, h, c, op) => L.flat(L.rect(x, y, w, h), c, op);
const at = (inner, x, y, k = 1, rot = 0) => L.g(inner, `translate(${f1(x)} ${f1(y)})${rot ? ` rotate(${f1(rot)})` : ""}${k !== 1 ? ` scale(${f1(k * 100) / 100})` : ""}`);
const spark = (x, y, r, c = "yellow") => L.flat(L.star(x, y, r, r * 0.34, 4, -90), c);
const drop = (x, y, k = 1) => L.tag("path", { d: L.smooth([[x, y - 10 * k], [x - 5 * k, y + 1 * k], [x, y + 8 * k], [x + 5 * k, y + 1 * k], [x, y - 10 * k]]), fill: L.c("sky"), stroke: L.c("blue"), "stroke-width": Math.max(2, 2.2 * k), "stroke-linejoin": "round" });
const steam = (x, y, k = 1, c = "gray") => [0, 1].map((i) => sl([[x + i * 12 * k, y], [x + (i * 12 + 6) * k, y - 12 * k], [x + (i * 12 - 4) * k, y - 24 * k], [x + (i * 12 + 4) * k, y - 36 * k]], { c, w: "hair", op: 0.75 })).join("");
const note = (x, y, k = 1, c = "ink", rot = 0) => at(L.flat(L.circ(0, 0, 9, 7), c) + L.stroke("M8 -2 V-36 Q8 -30 20 -26", { c, w: "detail" }), x, y, k, rot);
const notes = (x, y, k = 1) => note(x, y, k, "purple") + note(x + 44 * k, y - 26 * k, k * 0.8, "blue", 8) + note(x - 34 * k, y - 46 * k, k * 0.7, "red", -8);
const puff = (x, y, r, c = "white", op = 0.9) => fc(x, y, r, c, op) + fc(x + r * 0.9, y + r * 0.2, r * 0.7, c, op) + fc(x - r * 0.8, y + r * 0.25, r * 0.6, c, op);
const speed = (x, y, n, len, gap, c = "gray") => Array.from({ length: n }, (_, i) => ln([[x, y + i * gap], [x - len + (i % 2) * 14, y + i * gap]], { c, w: "detail", op: 0.7 })).join("");
const ground = (x0, x1, c = "grass", y = 0) => rr(x0, y, x1 - x0, 14, 6, c, { w: "hair" });
const ball = (x, y, r, c = "white") => ci(x, y, r, c, { w: "prop" }) + po([0, 1, 2, 3, 4].map((i) => [x + sin(i * 72) * r * 0.42, y - cos(i * 72) * r * 0.42]), "ink", { w: "hair" }) + [0, 1, 2, 3, 4].map((i) => ln([[x + sin(i * 72) * r * 0.42, y - cos(i * 72) * r * 0.42], [x + sin(i * 72) * r * 0.95, y - cos(i * 72) * r * 0.95]], { w: "hair" })).join("");
const bubbles = (pts, c = "white") => pts.map(([x, y, r]) => ci(x, y, r, c, { w: "hair" })).join("");

// ---------- IK + pose building (same maths as motion.js, kept local so this file works without it) ----------
const A1 = 58, A2 = 52, T1 = 62, T2 = 73;
const ik = (rx, ry, hx, hy, l1, l2, pref) => {
  let dx = hx - rx, dy = hy - ry, d = Math.hypot(dx, dy) || 1;
  const mx = l1 + l2 - 0.5, mn = Math.abs(l1 - l2) + 1, k = d > mx ? mx / d : d < mn ? mn / d : 1;
  dx *= k; dy *= k; d *= k;
  const a = (l1 * l1 - l2 * l2 + d * d) / (2 * d), h = Math.sqrt(Math.max(0, l1 * l1 - a * a)), ux = dx / d, uy = dy / d;
  const c1 = [ux * a - uy * h, uy * a + ux * h], c2 = [ux * a + uy * h, uy * a - ux * h];
  const e = c1[0] * pref[0] + c1[1] * pref[1] >= c2[0] * pref[0] + c2[1] * pref[1] ? c1 : c2;
  return [e.map(r1), [dx, dy].map(r1)];
};
const armIK = (side, rx, hand, pref) => ik(side * rx, 0, hand[0], hand[1], A1, A2, pref || [side, 0.7]);
const legIK = (foot, pref) => ik(0, 0, foot[0], foot[1], T1, T2, pref || [foot[0] < 0 ? -0.5 : 0.5, 0.3]);
const armT = (side, t1, t2) => { const e = [side * A1 * sin(t1), A1 * cos(t1)]; return [e, [e[0] + side * A2 * sin(t2), e[1] + A2 * cos(t2)]].map((p) => p.map(r1)); };
const legT = (off, t1, t2) => { const k = [off + T1 * sin(t1), T1 * cos(t1)]; return [k, [k[0] + T2 * sin(t2), k[1] + T2 * cos(t2)]].map((p) => p.map(r1)); };
const XF = {}; // pose name -> { rot, drop, dx, dy, planted }
const GEO = {};
// geometry of a style (in s = 1 units, relative to the arm-root centre C = (0, shoulder line + 16)): used to aim hands at the mouth / eyes / head
const geoOf = (st, body) => {
  const key = st + "|" + (body || ""); if (GEO[key]) return GEO[key];
  const a = L.anchors({ style: st, body, pose: "stand" }), s = a.s, cy = a.abL[1], R = a.R / s, hy = (a.hd[1] - cy) / s;
  return (GEO[key] = { R, rx: a.abR[0] / s, hd: [0, hy], m: [0, hy + 0.45 * R], e: [0, hy - 0.08 * R], chin: [0, hy + R], top: [0, hy - R], hip: [0, (a.hip[1] - cy) / s] });
};
const T_ = (t, g) => (typeof t === "function" ? t(g) : t);
const defPose = (name, p, g) => {
  const xf = p.xf || {}, pl = xf.planted === true ? [true, true] : [].concat(xf.planted || []), STAND = L.POSES.stand;
  L.POSES[name] = [p.al ? armT(...p.al) : p.l ? armIK(-1, g.rx, T_(p.l, g), p.pl) : STAND[0], p.ar ? armT(...p.ar) : p.r ? armIK(1, g.rx, T_(p.r, g), p.pr) : STAND[1]];
  if (p.ll || p.rl || p.lt || p.rt) {
    const one = (i, tgt, ang, pref, def) => {
      if (ang) return legT(...ang);
      let f = tgt || def, pr = pref;
      if (pl[i] && xf.rot) { f = rot2(f, -xf.rot); pr = pr && rot2(pr, -xf.rot); }
      return legIK(f, pr);
    };
    L.POSE_LEGS[name] = [one(0, p.ll, p.lt, p.kl, [-35, 130]), one(1, p.rl, p.rt, p.kr, [35, 130])];
  }
  XF[name] = xf;
  return name;
};
// the standard seated legs: thighs forward (+x), shins down. Hidden behind desks, visible on sofas / stools
const SIT = { lt: [0, 88, 0], rt: [14, 88, 0] };
const SITXF = { drop: 57 };

// ---------- faces added for this file (people.js data shape) ----------
Object.assign(L.FACES, {
  "act-yawn": { m: "O", b: "low", e: "closed" }, "act-sneeze": { m: "O", b: "down", e: "closed" }, "act-gulp": { m: "flat", b: "mid", e: "closed" },
  "act-yum": { m: "open", b: "mid", e: "closedUp", blush: 1 }, "act-shiver": { m: "wavy", b: "up", e: "wide" }, "act-hot": { m: "tired", b: "low", e: "half", sweat: 1 },
  "act-bliss": { m: "smile", b: "mid", e: "closedUp", blush: 1 }, "act-calm": { m: "small", b: "mid" }, "act-effort": { m: "teeth", b: "down" },
});

// ---------- wardrobe additions (act-* so they never clash with wardrobe.js) ----------
const mkK = (X, Y, s, U) => {
  const P = (pts) => pts.map(([x, y]) => [X(x), Y(y)]), w = (o, k = "char") => Object.assign({ w: k, s }, o);
  return { s, U, X, Y, P, poly: (pts, c, o) => L.shape(L.poly(P(pts), true), c, w(o)), box: (x0, x1, y0, y1, c, r = 8, o) => L.shape(L.rrect(X(x0), Y(y0), X(x1) - X(x0), Y(y1) - Y(y0), r * U), c, w(o)),
    dot: (x, y, r, c, o) => L.shape(L.circ(X(x), Y(y), r * U), c, w(o, "detail")), ln: (pts, o) => L.stroke(L.poly(P(pts)), Object.assign({ w: "detail", s }, o)), fl: (pts, c, op) => L.flat(L.poly(P(pts), true), c, op) };
};
const geo = (sh_, hip, s, W) => mkK((v) => sh_[0] + v * s * W, (v) => (Array.isArray(v) ? sh_[1] + v[0] * (hip[1] - sh_[1]) + v[1] * s : sh_[1] + v * (hip[1] - sh_[1])), s, s);
const TOP = [0, -2], OUT = L.OUTFITS;
const star5 = (g, x, y, r, c) => L.flat(L.star(g.X(x), g.Y(y), r * g.s, r * 0.42 * g.s, 5), c);
OUT["act-police"] = (sh_, hip, s, W, c) => { const g = geo(sh_, hip, s, W); return g.box(-33, 33, TOP, [1, 16], c, 10) + g.poly([[-12, TOP], [12, TOP], [0, 0.2]], "white", { w: "detail" }) + g.ln([[-12, TOP], [0, 0.22], [12, TOP]]) + g.poly([[-3, 0.2], [3, 0.2], [4, 0.7], [0, 0.78], [-4, 0.7]], "ink", { w: "detail" }) + g.box(-33, 33, 0.78, [1, 4], "ink", 2, { w: "detail" }) + g.box(-5, 5, 0.77, [1, 6], "gold", 2, { w: "detail" }) + g.dot(-20, 0.3, 8, "gold") + star5(g, -20, 0.3, 7, "yellow") + g.box(14, 28, 0.28, 0.4, "gold", 2, { w: "detail" }) + g.box(-29, -13, 0.52, 0.68, c, 3, { w: "detail", tone: 2 }); };
OUT["act-pilot"] = (sh_, hip, s, W, c) => { const g = geo(sh_, hip, s, W); return g.box(-33, 33, TOP, [1, 16], c, 10) + g.poly([[-12, TOP], [12, TOP], [0, 0.2]], "white", { w: "detail" }) + g.poly([[-3, 0.2], [3, 0.2], [4, 0.66], [0, 0.72], [-4, 0.66]], "ink", { w: "detail" }) + g.ln([[0, 0.3], [0, [1, 14]]]) + g.dot(-4, 0.78, 1.8, "gold") + g.dot(4, 0.78, 1.8, "gold")
  + g.box(-33, -17, [0, -3], [0, 8], "gold", 2, { w: "detail" }) + g.box(17, 33, [0, -3], [0, 8], "gold", 2, { w: "detail" }) + g.box(-33, -17, [0, 2], [0, 4], "ink", 0, { w: "hair" }) + g.box(17, 33, [0, 2], [0, 4], "ink", 0, { w: "hair" }) + g.box(-29, -11, 0.46, 0.6, "gold", 2, { w: "detail" }) + star5(g, -20, 0.53, 6, "white"); };
OUT["act-firefighter"] = (sh_, hip, s, W, c) => { const g = geo(sh_, hip, s, W); return g.box(-37, 37, TOP, [1, 24], c, 12) + g.box(-37, 37, 0.58, 0.7, "gray", 1, { w: "detail" }) + g.box(-37, 37, 0.9, [1, 20], "gray", 1, { w: "detail" }) + g.box(-4, 4, TOP, [1, 20], "gray", 1, { w: "detail" }) + g.ln([[0, 0.05], [0, [1, 22]]]) + g.dot(-11, 0.4, 2.3, "gold") + g.dot(11, 0.4, 2.3, "gold") + g.dot(-11, 0.78, 2.3, "gold") + g.dot(11, 0.78, 2.3, "gold") + g.box(-20, -8, 0.16, 0.26, "gray", 2, { w: "detail" }); };
OUT["act-coverall"] = (sh_, hip, s, W, c) => { const g = geo(sh_, hip, s, W); return g.box(-33, 33, TOP, [1, 18], c, 10) + g.poly([[-12, TOP], [12, TOP], [0, 0.2]], c, { w: "detail", tone: 2 }) + g.ln([[0, 0.2], [0, [1, 16]]]) + g.dot(-4, 0.5, 2, "gray") + g.dot(-4, 0.72, 2, "gray") + g.box(8, 26, 0.3, 0.5, c, 3, { w: "detail", tone: 2 }) + g.box(-26, -10, 0.62, 0.84, c, 3, { w: "detail", tone: 2 }) + g.fl([[-33, 0.9], [33, 0.9], [33, 0.96], [-33, 0.96]], "gold", 0.9); };
OUT["act-judge"] = (sh_, hip, s, W, c) => { const g = geo(sh_, hip, s, W); return g.poly([[-30, TOP], [30, TOP], [38, 1], [48, [1, 66]], [-48, [1, 66]], [-38, 1]], c) + g.poly([[-14, TOP], [14, TOP], [8, [1, 66]], [-8, [1, 66]]], "white", { w: "detail" }) + g.ln([[-10, TOP], [-8, [1, 60]]], { c: "gray" }) + g.ln([[10, TOP], [8, [1, 60]]], { c: "gray" }) + g.box(-32, 32, [0, -6], [0, 6], c, 8, { w: "detail", tone: 2 }); };
OUT["act-apron"] = (sh_, hip, s, W, c) => { const g = geo(sh_, hip, s, W); return g.box(-32, 32, TOP, [1, 16], "white", 12) + g.poly([[-18, TOP], [18, TOP], [27, 0.38], [27, [1, 52]], [-27, [1, 52]], [-27, 0.38]], c) + g.ln([[-18, TOP], [-32, [0, 14]]], { c: c }) + g.ln([[18, TOP], [32, [0, 14]]], { c: c }) + g.box(-14, 14, 0.6, 0.82, c, 4, { w: "detail", tone: 2 }) + g.ln([[-27, 0.38], [27, 0.38]], { w: "hair" }); };
OUT["act-ninja"] = (sh_, hip, s, W, c) => { const g = geo(sh_, hip, s, W); return g.box(-33, 33, TOP, [1, 16], c, 12) + g.ln([[-33, 0.3], [33, 0.52]], { c: "white", w: "detail", op: 0.35 }) + g.box(-34, 34, 0.74, 0.88, "red", 3, { w: "detail" }) + g.poly([[20, 0.78], [46, [1, 40]], [34, [1, 42]], [24, 0.92]], "red", { w: "detail" }) + g.poly([[14, 0.8], [30, [1, 54]], [20, [1, 52]]], "red", { w: "detail" }); };
OUT["act-clown"] = (sh_, hip, s, W, c) => { let d = ""; const g = geo(sh_, hip, s, W); [[-22, 0.2, "yellow"], [10, 0.28, "green"], [-6, 0.56, "pink"], [24, 0.62, "yellow"], [-24, 0.82, "green"], [8, 0.9, "sky"]].forEach(([x, u, cc]) => (d += g.dot(x, u, 6, cc, { w: "hair" })));
  return g.box(-42, 42, TOP, [1, 28], c, 16) + d + g.poly([[-18, TOP], [0, 0.2], [18, TOP], [26, [0, -8]], [-26, [0, -8]]], "white", { w: "detail" }) + g.dot(0, 0.5, 4.2, "red") + g.dot(0, 0.76, 4.2, "red"); };
OUT["act-magician"] = (sh_, hip, s, W, c) => { const g = geo(sh_, hip, s, W); return g.poly([[-30, [0, -6]], [30, [0, -6]], [66, 0.7], [76, [1, 70]], [-76, [1, 70]], [-66, 0.7]], "red", { tone: 2 }) + g.box(-32, 32, TOP, [1, 16], c, 10) + g.poly([[-11, TOP], [11, TOP], [0, 0.22]], "white", { w: "detail" }) + g.poly([[-3, 0.22], [3, 0.22], [5, 0.44], [0, 0.5], [-5, 0.44]], "red", { w: "detail" }) + g.ln([[0, 0.5], [0, [1, 16]]], { w: "hair" }) + star5(g, -17, 0.5, 6, "yellow") + star5(g, 17, 0.74, 5, "yellow"); };
OUT["act-tutu"] = (sh_, hip, s, W, c) => { const g = geo(sh_, hip, s, W); return g.box(-26, 26, TOP, 0.7, c, 12) + g.poly([[-24, 0.66], [24, 0.66], [66, [1, 28]], [30, [1, 40]], [0, [1, 32]], [-30, [1, 40]], [-66, [1, 28]]], c, { w: "detail", tone: 1 }) + g.poly([[-20, 0.7], [20, 0.7], [44, [1, 20]], [0, [1, 26]], [-44, [1, 20]]], "white", { w: "detail" }) + g.ln([[-17, TOP], [0, 0.14], [17, TOP]], { w: "hair" }); };
OUT["act-mail"] = (sh_, hip, s, W, c) => { const g = geo(sh_, hip, s, W); return g.box(-33, 33, TOP, [1, 16], c, 10) + g.poly([[-12, TOP], [12, TOP], [0, 0.22]], "white", { w: "detail" }) + g.ln([[-12, TOP], [0, 0.24], [12, TOP]]) + g.box(8, 24, 0.32, 0.46, "gold", 2, { w: "detail" }) + g.ln([[0, 0.24], [0, [1, 14]]], { w: "hair" }) + g.box(-27, -9, 0.6, 0.82, c, 3, { w: "detail", tone: 2 }) + g.box(9, 27, 0.6, 0.82, c, 3, { w: "detail", tone: 2 }); };
OUT["act-swim"] = (sh_, hip, s, W, c) => { const g = geo(sh_, hip, s, W); return g.box(-30, 30, TOP, [1, 14], c, 12) + g.fl([[-30, 0.3], [30, 0.3], [30, 0.4], [-30, 0.4]], "white", 0.8) + g.fl([[-30, 0.58], [30, 0.58], [30, 0.68], [-30, 0.68]], "white", 0.8); };
OUT["act-scrubs"] = (sh_, hip, s, W, c) => { const g = geo(sh_, hip, s, W); return g.box(-32, 32, TOP, [1, 16], c, 12) + g.poly([[-11, TOP], [0, 0.26], [11, TOP]], "paper", { w: "detail" }) + g.box(-27, -11, 0.56, 0.74, c, 3, { w: "detail", tone: 2 }) + g.box(11, 27, 0.56, 0.74, c, 3, { w: "detail", tone: 2 }); };

// ---------- accessories added for this file (anchors: hd, R, sh, hip, s, W, hands …) ----------
const ACC = L.ACC;
const hmk = (a) => { const R = a.R, ov = a.shape === "oval", kx = ov ? 0.86 : 1, cx = a.hd[0], cy = a.hd[1];
  return { R, kx, cx, cy, s: a.s, X: (u) => cx + u * R * kx, Y: (v) => cy + v * R, U: R, ey: -0.08 + (ov ? 0.05 : 0) }; };
const hxy = (h) => ({ pts: (p) => p.map(([x, y]) => [h.X(x), h.Y(y)]), poly: (p, c, o) => L.shape(L.poly(p.map(([x, y]) => [h.X(x), h.Y(y)]), true), c, Object.assign({ w: "char", s: h.s }, o)),
  soft: (p, c, o) => { const q = p.map(([x, y]) => [h.X(x), h.Y(y)]); return L.shape(L.smooth([...q, q[0]]), c, Object.assign({ w: "char", s: h.s }, o)); },
  ell: (x, y, rx, ry, c, o) => L.shape(L.circ(h.X(x), h.Y(y), rx * h.R, ry * h.R), c, Object.assign({ w: "detail", s: h.s }, o)),
  box: (x0, x1, y0, y1, c, r, o) => L.shape(L.rrect(h.X(x0), h.Y(y0), h.X(x1) - h.X(x0), h.Y(y1) - h.Y(y0), r * h.R), c, Object.assign({ w: "detail", s: h.s }, o)),
  ln: (p, o) => L.stroke(L.poly(p.map(([x, y]) => [h.X(x), h.Y(y)])), Object.assign({ w: "detail", s: h.s }, o)), sln: (p, o) => L.stroke(L.smooth(p.map(([x, y]) => [h.X(x), h.Y(y)])), Object.assign({ w: "detail", s: h.s }, o)) });
const hat = (name, fn) => { ACC[name] = { front: true, draw(a, o) { const h = hmk(a); return fn(Object.assign(h, hxy(h)), o.accC); } }; };
hat("act-beret", (h, c) => h.soft([[-1.0, -0.6], [-0.9, -1.1], [-0.2, -1.38], [0.7, -1.3], [1.2, -0.95], [0.9, -0.6], [0, -0.5]], c || "red") + h.ln([[0.0, -1.35], [0.04, -1.55]], { w: "char" }));
hat("act-pilotcap", (h, c) => h.soft([[-1.0, -0.5], [-0.95, -1.35], [0, -1.62], [0.95, -1.35], [1.0, -0.5], [0.5, -0.62], [-0.5, -0.62]], c || "navy") + h.box(-1.06, 1.06, -0.74, -0.52, c || "navy", 0.08, { tone: 2 }) + h.ell(0, -0.95, 0.24, 0.2, "gold") + h.ln([[-0.5, -0.95], [-0.24, -0.95]], { c: "gold" }) + h.ln([[0.24, -0.95], [0.5, -0.95]], { c: "gold" }));
hat("act-policecap", (h, c) => h.box(-1.06, 1.06, -0.84, -0.52, c || "navy", 0.12, { tone: 2 }) + h.soft([[-0.9, -0.78], [-0.95, -1.35], [0, -1.55], [0.95, -1.35], [0.9, -0.78]], c || "navy") + h.soft([[-0.7, -0.6], [0, -0.42], [0.7, -0.6], [0.7, -0.52], [0, -0.34], [-0.7, -0.52]], "ink", { w: "hair" }) + h.ell(0, -1.08, 0.2, 0.2, "gold"));
hat("act-firehelmet", (h, c) => h.soft([[-1.0, -0.4], [-0.95, -1.15], [-0.4, -1.5], [0.4, -1.5], [0.95, -1.15], [1.0, -0.4], [0, -0.52]], c || "red") + h.soft([[-1.0, -0.4], [-1.5, -0.2], [-1.0, -0.1], [0, -0.3], [1.0, -0.1], [1.5, -0.2], [1.0, -0.4], [0, -0.52]], c || "red", { tone: 2 }) + h.box(-0.12, 0.12, -1.6, -0.52, c || "red", 0.05, { tone: 2, w: "hair" }) + h.ell(0, -0.95, 0.26, 0.24, "gold"));
hat("act-scrubcap", (h, c) => h.soft([[-1.0, -0.2], [-1.0, -1.1], [-0.4, -1.5], [0.5, -1.45], [1.0, -1.1], [1.0, -0.2], [0.6, -0.55], [0, -0.5], [-0.6, -0.55]], c || "teal") + h.ln([[-0.95, -0.55], [0.95, -0.55]], { w: "hair" }));
hat("act-headband", (h, c) => h.sln([[-1.0, -0.42], [-0.5, -0.62], [0.5, -0.62], [1.0, -0.42]], { c: c || "red", w: 10 * Math.sqrt(h.s) }));
hat("act-wig", (h) => h.soft([[-1.0, -0.2], [-1.35, 0.2], [-1.2, 0.8], [-0.9, 0.7], [-1.0, 0.2], [-1.08, -0.7], [-0.6, -1.35], [0, -1.5], [0.6, -1.35], [1.08, -0.7], [1.0, 0.2], [0.9, 0.7], [1.2, 0.8], [1.35, 0.2], [1.0, -0.2]], "white", { w: "char", tone: 2 }) + [-1, 1].map((s_) => h.ell(s_ * 1.2, 0.5, 0.17, 0.17, "white", { w: "hair" }) + h.ell(s_ * 1.2, 0.18, 0.15, 0.15, "white", { w: "hair" })).join(""));
hat("act-clownnose", (h) => L.shape(L.circ(h.X(0), h.Y(0.26), h.R * 0.2), "red", { w: "detail", s: h.s }) + L.flat(L.circ(h.X(-0.06), h.Y(0.2), h.R * 0.05), "white", 0.8));
hat("act-ninjahood", (h) => L.shape(L.circ(h.cx, h.cy, h.R * 1.06) + L.rrect(h.X(-0.86), h.Y(-0.42), h.R * 1.72 * h.kx, h.R * 0.56, h.R * 0.26), "ink", { w: "char", s: h.s }) + h.ln([[0.95, -0.5], [1.6, -0.2]], { c: "red", w: 8 }) + h.ln([[0.95, -0.58], [1.6, -0.86]], { c: "red", w: 8 }));
hat("act-goggles", (h) => h.sln([[-1.0, h.ey], [0, h.ey - 0.02], [1.0, h.ey]], { c: "ink", w: 8 }) + [-1, 1].map((s_) => h.ell(s_ * 0.34, h.ey, 0.3, 0.26, "sky", { w: "prop" })).join(""));
hat("act-mask", (h) => h.soft([[-0.8, 0.1], [0, 0.0], [0.8, 0.1], [0.72, 0.62], [0, 0.88], [-0.72, 0.62]], "sky", { w: "detail" }) + h.ln([[-0.5, 0.3], [0.5, 0.3]], { c: "white", w: "hair" }) + h.ln([[-0.46, 0.5], [0.46, 0.5]], { c: "white", w: "hair" }) + h.ln([[-0.8, 0.12], [-1.0, -0.05]], { w: "hair" }) + h.ln([[0.8, 0.12], [1.0, -0.05]], { w: "hair" }));
hat("act-visor", (h, c) => h.sln([[-1.0, -0.5], [-0.5, -0.66], [0.5, -0.66], [1.0, -0.5]], { c: c || "white", w: 8 }) + h.soft([[-0.9, -0.52], [0, -0.44], [0.9, -0.52], [1.3, -0.28], [0, -0.1], [-1.3, -0.28]], c || "white", { w: "detail" }));
hat("act-postcap", (h, c) => h.soft([[-1.0, -0.5], [-0.95, -1.2], [0, -1.4], [0.95, -1.2], [1.0, -0.5], [0, -0.6]], c || "blue") + h.soft([[-1.0, -0.5], [-1.4, -0.3], [0, -0.1], [1.4, -0.3], [1.0, -0.5], [0, -0.62]], c || "blue", { tone: 2 }) + h.ell(0, -0.95, 0.18, 0.16, "gold"));
// body accessories
const bodyAcc = (name, fn, front) => { ACC[name] = { front: !!front, draw(a, o) { const g = geo(a.sh, a.hip, a.s, a.W); return fn(g, a, o.accC); } }; };
bodyAcc("act-stethoscope", (g, a) => g.ln([[-16, TOP], [-14, 0.3], [0, 0.56], [14, 0.3], [16, TOP]], { c: "gray", w: "char" }) + g.dot(0, 0.62, 6, "gray") + g.dot(0, 0.62, 3, "white", { w: "hair" }), true);
bodyAcc("act-toolbelt", (g) => g.box(-34, 34, 0.72, 0.84, "brown", 3, { w: "detail" }) + g.box(-5, 5, 0.73, 0.83, "gold", 1, { w: "hair" }) + g.box(-30, -16, 0.84, [1, 22], "brown", 3, { w: "detail", tone: 2 }) + g.box(14, 28, 0.84, [1, 28], "brown", 3, { w: "detail", tone: 2 }) + g.ln([[-22, 0.84], [-26, 0.7]], { c: "gray", w: 5 }) + g.ln([[22, 0.84], [20, 0.66]], { c: "red", w: 5 }), true);
bodyAcc("act-badge", (g, a, c) => g.dot(-18, 0.3, 8, c || "gold") + star5(g, -18, 0.3, 7, "yellow"), true);
bodyAcc("act-lanyard", (g) => g.ln([[-12, TOP], [0, 0.42], [12, TOP]], { c: "red", w: "detail" }) + g.box(-9, 9, 0.42, 0.66, "white", 2, { w: "detail" }) + g.ln([[-5, 0.52], [5, 0.52]], { w: "hair" }), true);
bodyAcc("act-pack", (g, a, c) => g.box(-30, 30, [0, -6], 0.7, c || "orange", 12, { tone: 2 }), false);

// ---------- the builder ----------
const build = (name, S, o) => {
  const dflt = S.opt || {}, po_ = Object.assign({ style: "man01", face: S.face || "smile" }, dflt, o);
  po_.acc = [].concat(dflt.acc || [], o.acc || []);
  const st = po_.style, geoS = geoOf(st, po_.body), key = `act:${name}:${st}:${po_.body || ""}`;
  const spec = typeof S.pose === "function" ? S.pose(geoS) : S.pose || {};
  if (!L.POSES[key]) defPose(key, spec, geoS);
  po_.pose = key; delete po_.s;
  if (po_.face === undefined) po_.face = "smile";
  const A = L.anchors(po_), s = A.s, u = -A.hip[1] / 130, cy = A.abL[1], x = XF[key] || {}, hipY = A.hip[1];
  const dx = (x.dx || 0) * s, dy = (x.drop || 0) * u + (x.dy || 0) * s, ra = (x.rot || 0);
  const tp = (p) => { const q = rot2([p[0], p[1] - hipY], ra); return [q[0] + dx, q[1] + hipY + dy]; };
  const c = { o: po_, A, g: geoS, s, u, C: [0, cy], hd: A.hd, R: A.R, hands: A.hands, tp, x,
    P: (px, py) => [px * s, cy + py * s], W: (inner) => L.g(inner, `scale(${f1(u * 1000) / 1000})`),
    at: (inner, px, py, k = 1, r = 0) => at(inner, px * s, cy + py * s, k * s, r), H: (i, inner, ox = 0, oy = 0, k = 1, r = 0) => at(inner, A.hands[i][0] + ox * s, A.hands[i][1] + oy * s, k * s, r) };
  const personOpts = Object.assign({}, po_);
  if (S.lying) Object.assign(personOpts, { hair: "none", acc: [], face: "smile" });
  const inner = L.useLook(Object.assign({}, L.T, { shadow: false }), () => L.person(personOpts));
  let over = "";
  if (S.lying) { // lying figures: the body is rotated, the head stays upright (drawn over the rotated one)
    const hp = tp(A.hd), R = A.R, skin = A.skinName, hairK = po_.hair ?? (L.CAST[st] || L.CAST.man01).hair, hairC = A.hairC;
    const hr = (L.HAIR[hairK] || L.HAIR.none)(hp[0], hp[1], R, hairC);
    const d = A.shape === "oval" ? L.circ(hp[0], hp[1], R * 0.86, R * 1.08) : L.circ(hp[0], hp[1], R), headFill = (L.CAST[st] || L.CAST.man01).head.fill || L.T.head.fill;
    over = (hr.back || "") + L.tag("path", { d, fill: headFill === "none" ? L.c("white") : L.paint(skin), stroke: L.outline(null) === "none" ? L.c(skin, 2) : L.outline(null), "stroke-width": L.outline(null) === "none" ? 2 : L.T.line.char * Math.sqrt(Math.max(s, 0.3)), "stroke-linejoin": "round" }) + (hr.front || "")
      + [].concat(po_.acc || []).map((n) => (ACC[n] ? ACC[n].draw(Object.assign({}, A, { hd: hp }), po_) : "")).join("")
      + L.face(hp[0], hp[1], R, po_.face, { eyes: (L.CAST[st] || L.CAST.man01).eyes, look: po_.look, olK: 1, skinName: skin });
  }
  const shadow = S.shadow === false ? "" : L.shadow(((S.shadow && S.shadow[0]) || 0) * u , 0, ((S.shadow && S.shadow[1]) || 150) * u * A.W);
  const held = S.held ? S.held(c) : "", under = S.under ? S.under(c) : "";
  const body = L.g(under + inner + held, `translate(${f1(dx)} ${f1(dy)})${ra ? ` rotate(${ra} 0 ${f1(hipY)})` : ""}`);
  return (S.back ? S.back(c) : "") + shadow + body + over + (S.lyingHeld ? S.lyingHeld(c) : "") + (S.front ? S.front(c) : "");
};
const ALL = [];
const act = (name, group, label, tags, S) => {
  ALL.push(name);
  L.reg(CAT, name, (o) => build(name, S, o), { box: S.box || [-190, -430, 380, 450], group, label, tags: ["activity", "person", "group", ...tags], demo: S.demo || {},
    call: `L.put(S, "${name}", x, gy, { s, t${S.callHint ? ", " + S.callHint : ""} })`, wide: !!S.wide });
};

// ---------- shared set pieces / props (world pieces are drawn for u = 1 and wrapped by c.W; hand props are drawn around their grip) ----------
const chairBack = (c = "blue", w = 104, top = -236, bot = -92) => rr(-w / 2, top, w, bot - top, 18, c, { w: "prop" });
const deskFront = (x0, x1, top, c = "wood") => rr(x0, top, x1 - x0, -top, 6, c, { w: "prop", tone: 2 }) + rr(x0 - 8, top - 4, x1 - x0 + 16, 16, 6, c, { w: "prop" }) + rr(x0 + 16, top + 26, x1 - x0 - 32, 34, 5, c, { w: "detail" }) + ci((x0 + x1) / 2, top + 43, 4, "gold", { w: "hair" });
const counterFront = (x0, x1, top, c = "wood", cap = "stone") => rr(x0, top, x1 - x0, -top, 4, c, { w: "prop", tone: 2 }) + rr(x0 - 8, top - 6, x1 - x0 + 16, 16, 5, cap, { w: "prop" });
const burger = () => rr(-26, 6, 52, 12, 6, "gold") + rr(-29, -4, 58, 12, 6, "brown") + po([[-31, -6], [31, -6], [31, -1], [10, -1], [0, 8], [-10, -1], [-31, -1]], "yellow", { w: "hair" }) + sm([[-30, -7], [-22, -13], [-10, -8], [0, -13], [12, -8], [22, -13], [30, -7], [0, -4]], "green", { w: "hair" }) + sm([[-28, -12], [-26, -26], [-10, -35], [10, -35], [26, -26], [28, -12]], "gold") + [[-12, -26], [2, -30], [14, -24], [-2, -20]].map(([x, y]) => L.flat(L.circ(x, y, 2, 1.2), "cream")).join("");
const bowl = (c = "red") => sm([[-38, -14], [38, -14], [32, 12], [14, 26], [-14, 26], [-32, 12]], c, { w: "prop" }) + el(0, -14, 38, 7, c, { tone: 2, w: "detail" }) + L.flat(L.circ(-6, -15, 30, 4.5), "cream") + sl([[-30, -16], [-16, -21], [0, -16], [16, -21], [30, -16]], { c: "earth", w: "detail" }) + L.flat("M-24 4 Q-20 16 -10 20", "white", 0.5);
const apple = () => { const body = L.smooth([[0, -16], [14, -21], [27, -9], [20, -4], [27, 1], [20, 7], [24, 15], [10, 27], [0, 23], [-10, 27], [-24, 15], [-26, -9], [-14, -21], [0, -16]]); return L.flat(L.poly([[27, -9], [20, -4], [27, 1], [20, 7], [24, 15], [16, 13], [10, 2], [13, -12]], true), "cream") + L.shape(body, "red", { w: "detail" }) + ln([[0, -16], [3, -30]], { c: "brown", w: "detail" }) + sm([[3, -26], [14, -34], [22, -26], [12, -22]], "green", { w: "hair" }) + L.flat("M-16 -8 Q-18 6 -12 14", "white", 0.55); };
const pizza = () => rr(-33, -8, 66, 14, 7, "earth", { w: "detail" }) + po([[-30, 4], [30, 4], [2, 72]], "yellow") + ci(-9, 22, 7, "red", { w: "hair" }) + ci(10, 34, 6, "red", { w: "hair" }) + ci(-2, 52, 5, "red", { w: "hair" }) + ci(14, 14, 4, "green", { w: "hair" }) + sm([[-4, 66], [4, 76], [8, 84], [2, 80], [-2, 74]], "yellow", { w: "hair" });
const can = (c = "red") => rr(-13, -24, 26, 46, 5, c, { w: "prop" }) + rr(-13, -24, 26, 8, 3, "gray", { w: "hair" }) + rr(-13, 15, 26, 7, 3, "gray", { w: "hair" }) + sl([[-13, -2], [-5, -9], [4, 1], [13, -6]], { c: "white", w: 7 }) + L.flat("M-9 -12 V12", "white", 0.5);
const bottle = (c = "water") => rr(-6, -46, 12, 10, 3, "blue", { w: "detail" }) + po([[-6, -36], [6, -36], [14, -22], [-14, -22]], "glass", { w: "detail" }) + rr(-15, -24, 30, 62, 12, "glass", { w: "prop" }) + L.flat(L.rrect(-13, -4, 26, 40, 10), c, 0.85) + rr(-15, 4, 30, 14, 2, "white", { w: "hair" }) + L.flat("M-9 -18 V30", "white", 0.6);
const tube = (d, c, k = 1) => (L.T.ink === "none" ? "" : L.stroke(d, { c: "ink", w: L.T.line.prop * 1.7 * k })) + L.stroke(d, { c, w: L.T.line.prop * (L.T.ink === "none" ? 1.3 : 0.75) * k });
const mug = (c = "white") => tube("M16 -10 Q36 -10 36 4 Q36 16 16 14", c) + rr(-18, -20, 36, 40, 8, c, { w: "prop" }) + el(0, -17, 15, 3.5, "brown", { w: "hair" }) + L.flat("M-12 -10 V14", "white", 0.5);
const cupSaucer = (c = "white") => tube("M22 -8 Q40 -8 38 4 Q36 12 20 10", c, 0.8) + el(0, 18, 36, 6, c, { w: "detail" }) + sm([[-24, -14], [24, -14], [20, 10], [10, 18], [-10, 18], [-20, 10]], c, { w: "prop" }) + el(0, -14, 24, 4, "orange", { w: "hair" });
const glass = () => po([[-14, -26], [14, -26], [11, 24], [-11, 24]], "glass", { w: "prop" }) + L.flat(L.poly([[-13, -8], [13, -8], [11, 22], [-11, 22]], true), "water", 0.75) + ci(-3, 6, 2.2, "white", { w: "hair" }) + ci(4, -2, 1.6, "white", { w: "hair" }) + L.flat("M-9 -22 V16", "white", 0.7);
const toothbrush = () => rr(-30, -5, 64, 10, 5, "blue", { w: "detail" }) + rr(-44, -6, 22, 12, 3, "white", { w: "detail" }) + [0, 1, 2, 3].map((i) => ln([[-41 + i * 5, -6], [-41 + i * 5, -12]], { c: "teal", w: "hair" })).join("") + po([[-22, -3], [-30, -3], [-30, 3], [-22, 3]], "blue", { w: "hair" });
const foam = (x, y, k = 1) => [[0, 0, 7], [11, 4, 6], [-10, 5, 5.5], [4, 11, 5], [-3, -9, 5], [15, -3, 4]].map(([a, b, r]) => ci(x + a * k, y + b * k, r * k, "white", { w: "hair" })).join("");
const bed = (night, blanketC) => { const out = [];
  out.push(rr(-270, -204, 24, 204, 8, "wood", { w: "prop", tone: 2 }) + rr(-282, -214, 48, 22, 10, "wood", { w: "prop" }) + rr(-248, -14, 504, 14, 4, "wood", { w: "prop", tone: 2 }) + rr(-248, -42, 504, 32, 12, "white", { w: "prop" }) + rr(226, -116, 22, 116, 8, "wood", { w: "prop", tone: 2 }) + rr(220, -126, 38, 18, 8, "wood", { w: "prop" }));
  out.push(rr(-250, -92, 118, 56, 26, night ? "paper" : "white", { w: "prop" }));
  return out.join(""); };
const blanket = (c, pat) => { const top = [[-110, -76], [-60, -86], [0, -80], [70, -88], [140, -82], [212, -86]]; return L.shape(L.smooth([...top, [214, -20], [-108, -20], top[0]]), c, { w: "prop" }) + sl([[-108, -50], [-50, -58], [10, -54], [80, -62], [150, -56], [212, -60]], { c: pat || "white", w: "detail", op: 0.8 }) + L.shape(L.smooth([[-112, -84], [-60, -94], [0, -88], [-60, -76], [-112, -64]]), c, { w: "detail", tone: 2 }); };
const windowFrame = (x, y, w, h, inner) => L.g(rr(x - 6, y - 6, w + 12, h + 12, 6, "wood", { w: "prop" }) + L.flat(L.rect(x, y, w, h), "sky") + inner + ln([[x + w / 2, y], [x + w / 2, y + h]], { c: "wood", w: "prop" }) + ln([[x, y + h / 2], [x + w, y + h / 2]], { c: "wood", w: "prop" }));
const moonSmall = (x, y, r) => L.flat(L.circ(x, y, r), "cream") + L.flat(L.circ(x + r * 0.45, y - r * 0.2, r * 0.82), "night");
const nightWindow = (x, y, w, h) => L.g(rr(x - 6, y - 6, w + 12, h + 12, 6, "wood", { w: "prop" }) + L.flat(L.rect(x, y, w, h), "night") + moonSmall(x + w * 0.3, y + h * 0.32, w * 0.16) + spark(x + w * 0.7, y + h * 0.25, 8, "cream") + spark(x + w * 0.62, y + h * 0.66, 6, "cream") + spark(x + w * 0.2, y + h * 0.75, 5, "cream") + ln([[x + w / 2, y], [x + w / 2, y + h]], { c: "wood", w: "prop" }) + ln([[x, y + h / 2], [x + w, y + h / 2]], { c: "wood", w: "prop" }));
const alarmClock = (x, y, k = 1) => at(ci(-14, -34, 7, "red", { w: "hair" }) + ci(14, -34, 7, "red", { w: "hair" }) + ci(0, 0, 24, "red", { w: "prop" }) + ci(0, 0, 18, "white", { w: "detail" }) + ln([[0, 0], [0, -11]], { w: "detail" }) + ln([[0, 0], [8, 4]], { w: "detail" }) + ln([[0, 24], [-8, 32]], { w: "detail" }) + ln([[0, 24], [8, 32]], { w: "detail" }), x, y, k);
const lampSmall = (x, y, lit) => at((lit ? fc(0, -66, 62, "yellow", 0.28) + fc(0, -66, 40, "yellow", 0.3) : "") + rr(-6, -30, 12, 30, 3, "wood", { w: "detail" }) + rr(-18, -6, 36, 8, 4, "wood", { w: "detail" }) + po([[-22, -68], [22, -68], [32, -30], [-32, -30]], lit ? "yellow" : "cream", { w: "prop" }), x, y);
const nightstand = (x) => rr(x - 44, -90, 88, 90, 8, "wood", { w: "prop", tone: 2 }) + rr(x - 52, -98, 104, 14, 6, "wood", { w: "prop" }) + rr(x - 32, -72, 64, 22, 5, "wood", { w: "detail" }) + ci(x, -61, 3.5, "gold", { w: "hair" });
const zzz = (x, y, k = 1) => L.text("z", x, y, { size: 30 * k }) + L.text("Z", x + 26 * k, y - 28 * k, { size: 42 * k }) + L.text("Z", x + 62 * k, y - 62 * k, { size: 56 * k });

// =================================================================== EATING / DRINKING ===================================================================
const G_EAT = "Eating", G_DRINK = "Drinking";
act("eat-burger", G_EAT, "Eating a burger", ["eat", "food", "lunch", "hungry", "meal", "fast food", "snack"], {
  face: "act-yum", opt: { outfit: "hoodie", outfitC: "orange" }, pose: { r: (g) => [g.m[0] + 34, g.m[1] + 8], pr: [0.8, 1], l: [-30, 62], pl: [-1, 1] },
  held: (c) => c.H(1, burger(), -12, -16, 1, -16) + c.at(L.flat(L.circ(0, 0, 2.4), "cream") + L.flat(L.circ(14, 8, 2), "cream") + L.flat(L.circ(-12, 12, 2), "cream"), -20, c.g.m[1] + 24), box: [-150, -440, 300, 460] });
act("eat-noodles", G_EAT, "Slurping noodles", ["eat", "food", "ramen", "bowl", "lunch", "dinner", "chopsticks", "meal"], {
  face: "act-yum", opt: { outfit: "tee", outfitC: "teal" }, pose: { r: (g) => [g.m[0] + 30, g.m[1] + 10], pr: [0.6, 1], l: [-14, 34], pl: [-1, 1] }, demo: { style: "girl01" },
  held: (c) => c.at(bowl("red"), -12, 52, 1.05) + c.at(steam(-8, 0, 1.1), -12, 18) + L.stroke(`M${f1(c.P(0, 0)[0] + 2)} ${f1(c.P(0, c.g.m[1] + 14)[1])} L${f1(c.hands[1][0] + 5 * c.s)} ${f1(c.hands[1][1] - 3 * c.s)}`, { c: "wood", w: "detail" }) + L.stroke(`M${f1(c.P(0, 0)[0] + 8)} ${f1(c.P(0, c.g.m[1] + 8)[1])} L${f1(c.hands[1][0] + 10 * c.s)} ${f1(c.hands[1][1] - 6 * c.s)}`, { c: "wood", w: "detail" })
    + [0, 1, 2].map((i) => c.at(sl([[0, 0], [-3 + i * 3, 14], [4 - i * 2, 28], [-2 + i * 4, 42]], { c: "earth", w: "detail" }), -2 + i * 5, c.g.m[1] + 14)).join(""), box: [-170, -440, 340, 460] });
act("eat-apple", G_EAT, "Biting an apple", ["eat", "fruit", "food", "healthy", "snack", "apple"], {
  face: "act-yum", opt: { outfit: "sweater", outfitC: "green" }, pose: { r: (g) => [g.m[0] + 40, g.m[1] + 4], pr: [0.8, 1], l: [-48, 100] },
  held: (c) => c.H(1, apple(), -12, -6, 1.15, 10), box: [-150, -440, 300, 460] });
act("eat-pizza", G_EAT, "Eating a pizza slice", ["eat", "food", "pizza", "cheese", "dinner", "meal", "snack"], {
  face: "act-yum", opt: { outfit: "tee", outfitC: "red" }, pose: { r: (g) => [g.m[0] + 62, g.m[1] - 32], pr: [1, 0.5], l: [-48, 100] }, demo: { style: "girl01", outfit: "tee", outfitC: "red" },
  held: (c) => c.H(1, pizza(), 0, -2, 1, 56), box: [-150, -440, 320, 460] });
act("drink-can", G_DRINK, "Drinking from a can", ["drink", "soda", "can", "thirsty", "refreshing", "cola"], {
  face: "act-gulp", opt: { outfit: "tee", outfitC: "blue" }, pose: { r: (g) => [g.m[0] + 26, g.m[1] + 22], pr: [1, 0.5], l: [-48, 100] },
  held: (c) => c.H(1, can("red"), 2, 0, 1.3, -54), box: [-150, -440, 300, 460] });
act("drink-bottle", G_DRINK, "Drinking from a bottle", ["drink", "water", "bottle", "thirsty", "hydrate", "sport"], {
  face: "act-gulp", opt: { outfit: "athlete", outfitC: "teal" }, pose: { r: (g) => [g.m[0] + 30, g.m[1] + 24], pr: [1, 0.5], l: [-48, 100] }, demo: { style: "girl01" },
  held: (c) => c.H(1, bottle("water"), 2, 0, 1.2, -62), box: [-150, -440, 300, 460] });
act("drink-coffee", G_DRINK, "Sipping coffee", ["drink", "coffee", "mug", "morning", "cosy", "warm", "caffeine", "break"], {
  face: "act-bliss", opt: { outfit: "sweater", outfitC: "orange" }, pose: { l: [-4, 30], r: [4, 30], pl: [-1, 1], pr: [1, 1] }, demo: { style: "girl01" },
  held: (c) => c.at(mug("white") + steam(-6, -24, 1), 0, 22, 1.1), box: [-150, -450, 300, 470] });
act("drink-tea", G_DRINK, "Drinking tea", ["drink", "tea", "cup", "afternoon", "calm", "saucer", "break"], {
  face: "act-bliss", opt: { outfit: "sweater", outfitC: "purple" }, pose: { r: (g) => [g.m[0] + 22, g.m[1] + 44], pr: [1, 1], l: [-18, 54], pl: [-1, 1] }, demo: { style: "girl01" },
  held: (c) => c.H(1, cupSaucer("white") + steam(-6, -16, 0.9), 0, -14, 1, 0), box: [-150, -450, 300, 470] });
act("drink-water-glass", G_DRINK, "Drinking a glass of water", ["drink", "water", "glass", "thirsty", "hydrate", "health"], {
  face: "act-gulp", opt: { outfit: "tee", outfitC: "sky" }, pose: { r: (g) => [g.m[0] + 26, g.m[1] + 20], pr: [1, 0.5], l: [-48, 100] },
  held: (c) => c.H(1, glass(), 2, 0, 1.3, -34), box: [-150, -440, 300, 460] });
act("drink-gulp", G_DRINK, "Gulping water, head back", ["drink", "gulp", "water", "thirsty", "sport", "after workout", "sweat"], {
  face: "act-gulp", opt: { outfit: "athlete", outfitC: "red" }, pose: (g) => ({ r: [g.m[0] + 26, g.m[1] + 4], pr: [1, 0.5], l: [-50, 70], ll: [-35, 130], rl: [35, 130], xf: { rot: -9, planted: true } }),
  held: (c) => c.H(1, bottle("water") + bubbles([[0, 14, 3], [-4, 2, 2.4], [3, -6, 2]], "white"), -2, -10, 1.05, -160) + c.at(drop(0, 0, 1.1) + drop(-14, 28, 0.9), 62, c.g.hd[1] + 34) + c.at(drop(0, 0, 0.9), -62, c.g.hd[1] - 20), box: [-170, -440, 340, 460] });

// =================================================================== HYGIENE / SLEEP / MORNING ===================================================================
const G_HOME = "Home and daily life";
act("brush-teeth", G_HOME, "Brushing teeth", ["hygiene", "teeth", "toothbrush", "morning", "bathroom", "routine", "dental"], {
  face: "smile", opt: { outfit: "pyjamas", outfitC: "sky" }, pose: { r: (g) => [g.m[0] + 50, g.m[1] + 6], pr: [0.6, 1], l: [-34, 60], pl: [-1, 1] },
  held: (c) => c.H(1, toothbrush(), -4, 0, 1.15, 0) + c.at(foam(0, 0, 0.9) + foam(26, 2, 0.6), -8, c.g.m[1] + 2) + c.H(0, rr(-11, -16, 22, 30, 5, "glass", { w: "prop" }) + L.flat(L.rrect(-9, -4, 18, 16, 3), "water", 0.7) + ln([[3, -16], [6, -34]], { c: "blue", w: "detail" }) + rr(-3, -36, 12, 8, 3, "red", { w: "hair" }), 0, 4, 1), box: [-150, -440, 300, 460] });
act("wash-hands", G_HOME, "Washing hands at a sink", ["hygiene", "wash", "hands", "soap", "sink", "bathroom", "clean", "health"], {
  face: "smile", opt: { outfit: "tee", outfitC: "teal" }, pose: { l: [-14, 100], r: [14, 100], pl: [-1, 1], pr: [1, 1] }, demo: { style: "girl01" }, shadow: [0, 240],
  back: (c) => c.W(ln([[70, -132], [70, -200]], { c: "gray", w: "prop" }) + sl([[70, -200], [66, -232], [30, -234], [18, -210]], { c: "gray", w: "prop" }) + rr(10, -214, 16, 8, 3, "gray", { w: "detail" })),
  held: (c) => foam(c.hands[0][0] + 12 * c.s, c.hands[0][1] - 6 * c.s, 0.9 * c.s) + foam(c.hands[1][0] - 12 * c.s, c.hands[1][1] - 8 * c.s, 0.8 * c.s) + c.W(ln([[18, -206], [18, -152]], { c: "water", w: "detail", op: 0.9 }) + drop(26, -176, 0.8) + drop(12, -164, 0.7)),
  front: (c) => c.W(counterFront(-130, 130, -132, "wood", "white") + L.flat(L.rect(-30, -134, 60, 3), "water", 0.7) + at(rr(-8, -12, 16, 10, 3, "pink", { w: "hair" }), 92, -138) + bubbles([[-60, -150, 6], [-50, -165, 4], [-70, -176, 3]], "glass")), box: [-170, -440, 340, 460] });
act("shower-curtain", G_HOME, "Showering behind a curtain", ["hygiene", "shower", "wash", "bathroom", "water", "morning", "routine", "bath"], {
  face: "act-bliss", opt: { outfit: "none", hair: "short" }, pose: (g) => ({ l: [g.hd[0] - 38, g.hd[1] + 6], r: [g.hd[0] + 38, g.hd[1] + 6], pl: [-1, -0.2], pr: [1, -0.2] }), shadow: [0, 220],
  back: (c) => c.W([0, 1, 2].map((i) => ln([[-128, -380 + i * 130], [128, -380 + i * 130]], { c: "glass", w: "hair", op: 0.6 })).join("") + ln([[96, -420], [96, -392]], { c: "gray", w: "prop" }) + po([[70, -392], [122, -392], [112, -372], [80, -372]], "gray", { w: "prop" }) + [0, 1, 2, 3, 4, 5].map((i) => L.flat(L.circ(78 + (i % 3) * 16 + (i > 2 ? 8 : 0), -356 + Math.floor(i / 3) * 18, 2.6, 1), "sky", 0.9)).join("") + [[-4, -250], [-30, -320], [60, -310], [30, -280], [-70, -270], [74, -260]].map(([x, y], i) => drop(x + 4 * (i % 2), y, 0.9)).join("")),
  held: (c) => c.at(foam(0, 0, 1.25) + foam(-34, 12, 0.8) + foam(32, 10, 0.8), 0, c.g.top[1] + 14),
  front: (c) => c.W(ln([[-134, -270], [134, -270]], { c: "gray", w: "prop" }) + po([[-120, -266], [120, -266], [126, -18], [60, -8], [0, -18], [-60, -8], [-126, -18]], "teal", { w: "prop", tone: 1 }) + [-96, -48, 0, 48, 96].map((x) => ln([[x, -262], [x + 2, -24]], { c: "white", w: "hair", op: 0.55 })).join("") + [-110, -66, -22, 22, 66, 110].map((x) => ci(x, -270, 7, "gray", { w: "hair" })).join("") + [[-70, -190], [-10, -150], [60, -210], [20, -90], [-60, -80], [90, -120]].map(([x, y]) => ci(x, y, 12, "teal", { w: "hair", tone: 1 })).join("") + el(0, 6, 120, 12, "stone", { w: "detail" })), box: [-170, -440, 340, 470] });

const sleepAsset = (night) => ({
  face: "sleep", lying: true, opt: { outfit: "pyjamas", outfitC: night ? "purple" : "sky", hair: "side" }, pose: { l: [-26, 96], r: [26, 96], pl: [-1, 1], pr: [1, 1], ll: [-8, 130], rl: [8, 130], xf: { rot: -90, drop: 60 } }, shadow: [0, 540], wide: true,
  back: (c) => c.W((night ? nightWindow(-120, -400, 150, 120) : windowFrame(-120, -400, 150, 120, L.flat(L.circ(-30, -350, 24), "yellow") + [0, 1, 2, 3, 4, 5, 6, 7].map((i) => L.flat(L.poly([[-30 + cos(i * 45) * 30, -350 + sin(i * 45) * 30], [-30 + cos(i * 45 + 8) * 40, -350 + sin(i * 45 + 8) * 40], [-30 + cos(i * 45 - 8) * 40, -350 + sin(i * 45 - 8) * 40]], true), "yellow", 0.8)).join("") + L.flat("M-100 -300 Q-76 -322 -52 -300 Q-30 -316 -4 -300 Z", "white", 0.9))) + bed(night) + nightstand(-344) + lampSmall(-344, -98, night) + (night ? "" : alarmClock(-318, -122, 0.7))),
  front: (c) => c.W(blanket(night ? "purple" : "yellow", night ? "gold" : "orange") + (night ? zzz(-172, -140, 1) + spark(150, -330, 10, "cream") + spark(-200, -250, 7, "cream") : zzz(-172, -140, 1))), box: [-390, -430, 700, 450] });
act("sleep-bed-day", G_HOME, "Sleeping in bed (day)", ["sleep", "bed", "nap", "rest", "bedroom", "zzz", "morning", "day"], sleepAsset(false));
act("sleep-bed-night", G_HOME, "Sleeping in bed (night)", ["sleep", "bed", "night", "bedroom", "zzz", "moon", "dream", "bedtime"], sleepAsset(true));
act("wake-stretch", G_HOME, "Waking up and stretching", ["wake up", "stretch", "morning", "yawn", "alarm", "pyjamas", "sleepy"], {
  face: "act-yawn", opt: { outfit: "pyjamas", outfitC: "purple", hair: "messy" }, pose: { l: [-50, -98], r: [50, -98], pl: [-1, 0.2], pr: [1, 0.2], ll: [-40, 130], rl: [40, 130], xf: { rot: -3, planted: true } },
  held: (c) => [-1, 1].map((sd) => c.H(sd < 0 ? 0 : 1, ln([[sd * 10, -12], [sd * 18, -26]], { c: "gray", w: "detail" }) + ln([[sd * 18, -2], [sd * 30, -8]], { c: "gray", w: "detail" }), 0, 0, 1)).join(""),
  front: (c) => c.W(alarmClock(-132, -26, 0.9)), box: [-190, -440, 380, 460] });
act("yawn", G_HOME, "Yawning", ["yawn", "tired", "sleepy", "bored", "morning", "rest", "exhausted"], {
  face: "act-yawn", opt: { outfit: "hoodie", outfitC: "gray" }, pose: (g) => ({ r: [g.m[0] + 26, g.m[1] + 12], pr: [1, 0.6], l: [-72, -50], pl: [-1, 0.2], xf: { rot: -4, planted: true }, ll: [-35, 130], rl: [35, 130] }),
  held: (c) => c.at(drop(0, 0, 0.8), -44, c.g.hd[1] + 8) + c.at(L.stroke("M0 0 Q8 -6 16 0", { c: "gray", w: "detail" }) + L.stroke("M-4 12 Q8 6 20 12", { c: "gray", w: "detail" }), 56, c.g.hd[1] - 10) + c.at(zzz(0, 0, 0.5), 54, c.g.hd[1] - 54), box: [-190, -440, 380, 460] });

// =================================================================== STUDY / SCREENS / MUSIC ===================================================================
const G_STUDY = "Reading, study and screens", G_MUSIC = "Music and art";
const bookBack = (c = "red") => po([[-48, -34], [-40, -42], [40, -42], [48, -34]], "cream", { w: "hair" }) + rr(-52, -34, 104, 66, 8, c, { w: "prop" }) + ln([[0, -34], [0, 32]], { w: "detail" }) + rr(-36, -20, 28, 10, 3, "gold", { w: "hair" }) + rr(8, -20, 28, 10, 3, "gold", { w: "hair" });
const laptopBack = (c = "gray") => rr(-64, -80, 128, 82, 8, c, { w: "prop" }) + ci(0, -40, 7, "white", { w: "hair" }) + rr(-70, -2, 140, 8, 4, c, { w: "detail", tone: 2 });
const phoneUp = (screen) => rr(-17, -32, 34, 64, 7, "ink", { w: "prop" }) + L.flat(L.rrect(-13, -27, 26, 52, 3), screen || "sky") + rr(-10, -22, 20, 14, 3, "white", { w: "hair" }) + rr(-10, -4, 20, 8, 3, "pink", { w: "hair" }) + rr(-10, 8, 20, 8, 3, "yellow", { w: "hair" });
const controller = () => sm([[-34, -10], [-18, -18], [18, -18], [34, -10], [42, 14], [34, 26], [22, 14], [-22, 14], [-34, 26], [-42, 14]], "blue", { w: "prop" }) + L.flat("M-30 -8 H-22 M-26 -12 V-4", "white") + ci(26, -6, 3.5, "red", { w: "hair" }) + ci(18, 0, 3.5, "green", { w: "hair" }) + ci(26, 6, 3.5, "yellow", { w: "hair" }) + ci(-14, 4, 5, "ink", { w: "hair" }) + ci(8, 4, 5, "ink", { w: "hair" });
const tvSet = (x, w, screenInner) => { const h = w * 0.62; return at(rr(-w / 2 - 8, -h - 22, w + 16, h + 16, 8, "ink", { w: "prop" }) + fr(-w / 2, -h - 14, w, h, "navy") + screenInner(w, h) + rr(-30, -6, 60, 8, 4, "gray", { w: "detail" }) + rr(-6, -22, 12, 18, 2, "gray", { w: "detail" }), x, 0); };
const pongScreen = (w, h) => fr(-w / 2 + 6, -h - 8, w - 12, 4, "white", 0.5) + fr(-w / 2 + 12, -h * 0.75, 6, 28, "green") + fr(w / 2 - 18, -h * 0.5, 6, 28, "red") + fc(0, -h * 0.55, 6, "yellow") + ln([[0, -h - 8], [0, -h * 0.05 - 8]], { c: "white", w: "hair", dash: "6 6", op: 0.6 });
const showScreen = (w, h) => fr(-w / 2, -h - 14, w, h, "sky") + fc(-w * 0.22, -h * 0.68, 12, "yellow") + L.flat(`M${f1(-w / 2)} ${f1(-14)} L${f1(-w * 0.1)} ${f1(-h * 0.55)} L${f1(w * 0.12)} ${f1(-h * 0.2)} L${f1(w * 0.3)} ${f1(-h * 0.5)} L${f1(w / 2)} ${f1(-14)} Z`, "green") + fr(-w / 2, -26, w, 12, "grass");
const sofa = (c = "blue") => rr(-150, -236, 300, 156, 30, c, { w: "prop" }) + rr(-150, -86, 300, 50, 16, c, { w: "prop", tone: 2 }) + rr(-174, -150, 44, 118, 18, c, { w: "prop", tone: 1 }) + rr(130, -150, 44, 118, 18, c, { w: "prop", tone: 1 }) + rr(-150, -40, 300, 40, 6, "wood", { w: "detail", tone: 2 }) + rr(-100, -186, 90, 70, 14, c, { w: "detail", tone: 1 }) + rr(10, -186, 90, 70, 14, c, { w: "detail", tone: 1 });
const sofaFront = (c = "blue") => rr(-174, -150, 44, 118, 18, c, { w: "prop", tone: 1 }) + rr(130, -150, 44, 118, 18, c, { w: "prop", tone: 1 });
const micHand = () => ci(0, -22, 13, "gray", { w: "prop" }) + L.flat("M-8 -26 H8 M-9 -20 H9 M-6 -31 H6", "white", 0.6) + po([[-7, -12], [7, -12], [5, 28], [-5, 28]], "ink", { w: "prop" }) + rr(-8, -12, 16, 6, 2, "red", { w: "hair" });
const deskPose = (l, r) => Object.assign({ l, r, pl: [-1, 1], pr: [1, 1] }, SIT, { xf: SITXF });
const DESKTOP = -112;
const chairAt = (c) => c.W(chairBack("blue"));
act("read-book", G_STUDY, "Reading a book", ["read", "book", "study", "library", "quiet", "learn", "novel"], {
  face: "smile", opt: { outfit: "sweater", outfitC: "red", acc: ["glasses"] }, pose: { l: [-36, 36], r: [36, 36], pl: [-1, 1], pr: [1, 1] }, demo: { style: "girl01", outfit: "sweater" },
  held: (c) => c.at(bookBack("green"), 0, 34, 1), box: [-150, -440, 300, 460] });
act("study-desk", G_STUDY, "Studying at a desk", ["study", "homework", "desk", "write", "school", "exam", "learn", "student", "work"], {
  face: "determined", opt: { outfit: "student", outfitC: "white" }, pose: deskPose((g) => [-30, 66], (g) => [30, 66]), shadow: [0, 300],
  back: chairAt,
  held: (c) => c.H(1, ln([[0, 0], [12, -36]], { c: "yellow", w: "prop" }) + ln([[10, -32], [12, -36]], { c: "ink", w: "prop" }), 0, 0, 1.1),
  front: (c) => c.W(deskFront(-150, 150, DESKTOP, "wood") + po([[-58, DESKTOP - 2], [0, DESKTOP - 8], [58, DESKTOP - 2], [66, DESKTOP + 10], [0, DESKTOP + 4], [-66, DESKTOP + 10]], "paper", { w: "detail" }) + ln([[0, DESKTOP - 8], [0, DESKTOP + 4]], { w: "hair" }) + [0, 1].map((i) => ln([[-46, DESKTOP + i * 5], [-8, DESKTOP - 4 + i * 5]], { c: "gray", w: "hair" })).join("") + rr(-140, DESKTOP - 30, 54, 12, 3, "red", { w: "detail" }) + rr(-134, DESKTOP - 42, 46, 12, 3, "blue", { w: "detail" }) + rr(-138, DESKTOP - 54, 50, 12, 3, "green", { w: "detail" }) + at(ln([[0, 0], [0, -46]], { c: "gray", w: "prop" }) + ln([[0, -46], [28, -66]], { c: "gray", w: "prop" }) + po([[18, -62], [48, -78], [56, -62], [28, -52]], "yellow", { w: "prop" }) + rr(-14, -6, 28, 8, 3, "gray", { w: "detail" }), 118, DESKTOP)), box: [-190, -440, 380, 460] });
act("type-laptop", G_STUDY, "Typing on a laptop", ["laptop", "type", "computer", "work", "office", "coding", "email", "desk", "remote work"], {
  face: "determined", opt: { outfit: "office", outfitC: "sky" }, pose: deskPose((g) => [-34, 62], (g) => [34, 62]), shadow: [0, 300], back: chairAt,
  front: (c) => c.W(deskFront(-150, 150, DESKTOP, "wood") + at(laptopBack("gray"), 0, DESKTOP + 2, 1) + at(mug("white") + steam(-4, -24, 0.8), 112, DESKTOP - 14, 0.9) + rr(-140, DESKTOP - 20, 36, 20, 3, "yellow", { w: "detail" })), box: [-190, -440, 380, 460] });
act("game-controller", G_STUDY, "Gaming with a controller", ["game", "gaming", "controller", "video game", "play", "sofa", "fun", "console"], {
  face: "determined", opt: { outfit: "hoodie", outfitC: "green" }, look: -0.9, pose: Object.assign(deskPose(() => [-30, 32], () => [30, 32]), { xf: SITXF }), shadow: [-40, 520], wide: true,
  back: (c) => c.W(at(sofa("purple"), 0, 0)) , held: (c) => c.at(controller(), 0, 40, 1.1),
  front: (c) => c.W(sofaFront("purple") + tvSet(-300, 150, pongScreen)), box: [-380, -350, 600, 370] });
act("scroll-phone", G_STUDY, "Scrolling on a phone", ["phone", "scroll", "social media", "mobile", "smartphone", "texting", "bored", "screen"], {
  face: "bored", opt: { outfit: "hoodie", outfitC: "purple" }, pose: { l: [-26, 34], r: [26, 34], pl: [-1, 1], pr: [1, 1], ll: [-35, 130], rl: [35, 130], xf: { rot: 5, planted: true } }, look: 0, demo: { style: "girl01", outfit: "hoodie" },
  held: (c) => c.at(phoneUp("sky"), 0, 26, 1.2, -4) + c.at(ln([[0, 0], [0, -22]], { c: "gray", w: "detail" }) + L.stroke("M-5 -18 L0 -26 L5 -18", { c: "gray", w: "detail" }), 36, 6), box: [-150, -440, 300, 460] });
act("video-call", G_STUDY, "On a video call", ["video call", "meeting", "online", "zoom", "remote work", "headset", "webcam", "work"], {
  face: "happy", opt: { outfit: "office", outfitC: "white", acc: ["headphones"], accC: "gray" }, pose: Object.assign(deskPose((g) => [-34, 62], (g) => [58, -34]), { pr: [1, 0.2] }), shadow: [0, 300], back: chairAt, wide: true,
  front: (c) => c.W(deskFront(-150, 150, DESKTOP, "wood") + at(laptopBack("gray"), -30, DESKTOP + 2, 0.9)) + c.W(at(rr(0, 0, 170, 126, 12, "white", { w: "prop" }) + L.flat(L.rect(8, 8, 154, 80), "navy") + ci(46, 44, 14, "s2", { w: "hair" }) + ci(122, 44, 14, "s4", { w: "hair" }) + L.flat("M30 84 Q46 56 62 84 Z", "teal") + L.flat("M106 84 Q122 56 138 84 Z", "orange") + ci(70, 108, 10, "red", { w: "hair" }) + ci(100, 108, 10, "green", { w: "hair" }), 190, -360)), box: [-190, -440, 580, 460] });
act("watch-tv", G_STUDY, "Watching TV on the sofa", ["tv", "television", "watch", "sofa", "relax", "movie", "popcorn", "evening"], {
  face: "act-bliss", opt: { outfit: "tee", outfitC: "orange" }, look: -0.9, pose: Object.assign(deskPose(() => [-26, 40], () => [26, 40]), { xf: SITXF }), shadow: [-40, 520], wide: true,
  back: (c) => c.W(sofa("teal")), held: (c) => c.at(rr(-24, -2, 48, 34, 8, "red", { w: "prop" }) + [[-14, -8], [0, -12], [14, -8], [-6, -4], [8, -4]].map(([x, y]) => ci(x, y, 7, "cream", { w: "hair" })).join("") + rr(-24, 6, 48, 26, 6, "red", { w: "prop" }), 0, 66, 1),
  front: (c) => c.W(sofaFront("teal") + tvSet(-300, 150, showScreen)), box: [-380, -350, 600, 370] });
act("music-headphones", G_MUSIC, "Listening to music on headphones", ["music", "headphones", "listen", "song", "dance", "relax", "phone", "audio"], {
  face: "act-bliss", opt: { outfit: "hoodie", outfitC: "red", acc: ["headphones"], accC: "gray" }, pose: { l: [-44, 56], r: [40, 30], pl: [-1, 1], pr: [1, 1], ll: [-35, 130], rl: [35, 130], xf: { rot: 5, planted: true } }, demo: { style: "girl01", outfit: "hoodie" },
  held: (c) => c.H(1, phoneUp("pink"), 4, 0, 0.8, 8) + c.at(notes(0, 0, 1), 78, c.g.hd[1] - 30) + c.at(note(0, 0, 0.8, "teal", 8), -76, c.g.hd[1] + 10), box: [-170, -460, 340, 480] });
act("sing-mic", G_MUSIC, "Singing into a microphone", ["sing", "singer", "microphone", "karaoke", "concert", "music", "perform", "stage"], {
  face: "laugh", opt: { outfit: "jacket", outfitC: "purple" }, pose: (g) => ({ r: [g.m[0] + 22, g.m[1] + 24], pr: [1, 0.6], l: [-70, -70], pl: [-1, 0.2], ll: [-40, 130], rl: [40, 130], xf: { rot: -3, planted: true } }), demo: { style: "girl01", outfit: "jacket" },
  held: (c) => c.H(1, micHand(), 0, -10, 1.1, -10) + c.at(notes(0, 0, 1.1), -92, c.g.hd[1] - 20), box: [-190, -460, 380, 480] });

// ---- instruments / art / sport props ----
const guitar = () => sm([[-6, -26], [18, -34], [42, -26], [44, -8], [34, 0], [46, 12], [40, 32], [14, 38], [-6, 30], [-10, 14], [-4, 0], [-10, -14]], "orange", { w: "prop" }) + ci(14, 2, 10, "ink", { w: "hair" }) + rr(26, 18, 18, 7, 2, "wood", { w: "hair" }) + rr(-120, -5, 118, 10, 2, "wood", { w: "detail" }) + L.flat("M-98 -3 H-8 M-98 3 H-8", "white", 0.7) + po([[-136, -9], [-116, -9], [-116, 9], [-136, 9]], "wood", { w: "detail", tone: 2 }) + [-130, -122].map((x) => ci(x, -12, 2, "gray", { w: "hair" })).join("");
const violin = () => sm([[-48, -6], [-44, -22], [-28, -28], [-14, -20], [-8, -10], [2, -16], [16, -18], [22, -8], [22, 8], [16, 18], [2, 16], [-8, 10], [-14, 20], [-28, 28], [-44, 22], [-48, 6]], "orange", { w: "prop" }) + rr(20, -4, 100, 8, 2, "ink", { w: "detail" }) + ci(126, -3, 6, "wood", { w: "detail" }) + L.stroke("M-30 -14 Q-24 0 -30 14", { c: "ink", w: "hair" }) + L.stroke("M-14 -14 Q-8 0 -14 14", { c: "ink", w: "hair" }) + rr(-52, -8, 12, 16, 4, "ink", { w: "hair" });
const bow = () => ln([[0, 40], [10, -60]], { c: "wood", w: "prop" }) + ln([[2, 30], [12, -52]], { c: "white", w: "hair" }) + rr(-4, 30, 10, 14, 3, "ink", { w: "hair" });
const palette = () => sm([[-30, -4], [-24, -22], [4, -28], [30, -14], [34, 8], [14, 22], [-14, 18], [-4, 6], [-20, 8]], "wood", { w: "prop", tone: 1 }) + [[-14, -14, "red"], [4, -18, "blue"], [20, -8, "yellow"], [18, 8, "green"]].map(([x, y, c]) => ci(x, y, 5.5, c, { w: "hair" })).join("");
const camera = () => rr(-36, -22, 72, 46, 9, "gray", { w: "prop" }) + rr(-22, -30, 24, 10, 3, "gray", { w: "detail", tone: 2 }) + ci(0, 2, 19, "ink", { w: "prop" }) + ci(0, 2, 12, "blue", { w: "detail" }) + L.flat(L.circ(-4, -2, 3.5), "white", 0.8) + rr(18, -18, 12, 8, 2, "red", { w: "hair" }) + rr(-30, -16, 10, 7, 2, "yellow", { w: "hair" });
const dumbbell = (c = "ink") => rr(-34, -3, 68, 6, 2, "gray", { w: "detail" }) + [-1, 1].map((sd) => rr(sd * 30 - (sd > 0 ? 0 : 14), -17, 14, 34, 4, c, { w: "prop" }) + rr(sd * 44 - (sd > 0 ? 0 : 8), -11, 8, 22, 3, c, { w: "detail", tone: 2 })).join("");
const barbell = (hw = 150) => ln([[-hw, 0], [hw, 0]], { c: "gray", w: "prop" }) + [-1, 1].map((sd) => rr(sd * (hw - 22) - 10, -46, 20, 92, 6, "ink", { w: "prop" }) + rr(sd * (hw - 40) - 8, -34, 16, 68, 5, "red", { w: "detail" }) + rr(sd * (hw - 4) - (sd > 0 ? 0 : 8), -10, 8, 20, 3, "gray", { w: "detail" })).join("");
const mat = (c = "teal", w = 190) => rr(-w / 2, -8, w, 10, 5, c, { w: "prop" });
const G_MUS = "Music and art";
act("play-guitar", G_MUS, "Playing the guitar", ["guitar", "music", "play", "strum", "instrument", "band", "hobby", "acoustic"], {
  face: "act-bliss", opt: { outfit: "tee", outfitC: "red", hair: "messy" }, pose: { l: [-60, 42], r: [26, 86], pl: [-1, 0.6], pr: [1, 1], ll: [-38, 130], rl: [38, 130] }, demo: { style: "man01" },
  held: (c) => c.at(guitar(), 6, 78, 1.05, 26) + c.at(notes(0, 0, 1), 96, c.g.hd[1] - 6), box: [-190, -440, 380, 460] });
act("play-piano", G_MUS, "Playing the piano keyboard", ["piano", "keyboard", "music", "play", "instrument", "pianist", "practice", "hobby"], {
  face: "act-bliss", opt: { outfit: "suit", outfitC: "navy" }, pose: deskPose(() => [-44, 62], () => [44, 62]), shadow: [0, 320], wide: true,
  back: (c) => c.W(rr(-40, -72, 80, 12, 5, "wood", { w: "prop" }) + rr(-6, -62, 12, 62, 3, "wood", { w: "detail", tone: 2 })),
  held: (c) => c.at(notes(0, 0, 1), 120, -80),
  front: (c) => c.W(ln([[-100, 0], [-30, -108]], { c: "gray", w: "prop" }) + ln([[100, 0], [30, -108]], { c: "gray", w: "prop" }) + rr(-130, -126, 260, 22, 5, "ink", { w: "prop" }) + fr(-124, -122, 248, 14, "white") + Array.from({ length: 17 }, (_, i) => ln([[-124 + 14.6 * i, -122], [-124 + 14.6 * i, -108]], { c: "gray", w: "hair" })).join("") + [0, 1, 3, 4, 5, 7, 8, 10, 11, 12, 14, 15].map((i) => rr(-120 + 14.6 * i, -122, 9, 9, 1, "ink", { w: "hair" })).join("")), box: [-200, -440, 420, 460] });
act("play-drums", G_MUS, "Playing the drums", ["drums", "drummer", "music", "band", "rock", "play", "instrument", "percussion"], {
  face: "act-effort", opt: { outfit: "tee", outfitC: "yellow", hair: "spiky" }, pose: Object.assign(deskPose(() => [-66, 54], () => [60, 38]), { pl: [-1, 0.2], pr: [1, 0.2] }), shadow: [0, 420], wide: true,
  back: (c) => c.W(ln([[-134, -200], [-134, -30]], { c: "gray", w: "prop" }) + el(-134, -212, 54, 8, "gold", { w: "prop" }) + ln([[130, -220], [130, -30]], { c: "gray", w: "prop" }) + el(130, -232, 56, 8, "gold", { w: "prop" }) + rr(-40, -72, 80, 12, 5, "red", { w: "prop" }) + rr(-6, -62, 12, 62, 3, "wood", { w: "detail", tone: 2 })),
  held: (c) => c.H(0, ln([[0, 0], [-30, -34]], { c: "wood", w: "prop" }), 0, 0, 1) + c.H(1, ln([[0, 0], [30, -34]], { c: "wood", w: "prop" }), 0, 0, 1),
  front: (c) => c.W(ci(0, -66, 62, "white", { w: "prop" }) + ci(0, -66, 22, "red", { w: "detail" }) + rr(-110, -126, 80, 30, 6, "white", { w: "prop" }) + rr(-110, -126, 80, 8, 3, "gray", { w: "detail" }) + ln([[-70, -96], [-70, -30]], { c: "gray", w: "prop" }) + rr(30, -156, 80, 34, 6, "red", { w: "prop" }) + rr(30, -156, 80, 8, 3, "gray", { w: "detail" }) + ln([[70, -122], [70, -70]], { c: "gray", w: "prop" })), box: [-220, -440, 440, 460] });
act("play-violin", G_MUS, "Playing the violin", ["violin", "music", "play", "classical", "orchestra", "instrument", "bow", "strings"], {
  face: "act-bliss", opt: { outfit: "suit", outfitC: "purple", hair: "bun" }, pose: { r: (g) => [g.chin[0] + 94, g.chin[1] + 18], pr: [1, 0.2], l: [26, 46], pl: [0.3, 1], ll: [-35, 130], rl: [35, 130] }, demo: { style: "girl01", outfit: "dress" },
  held: (c) => c.at(violin(), 22, c.g.chin[1] + 2, 0.95, 14) + c.at(bow(), 28, 40, 1.2, 8) + c.at(notes(0, 0, 0.9), -76, c.g.hd[1] - 20), box: [-190, -440, 380, 460] });
act("paint-easel", G_MUS, "Painting at an easel", ["paint", "painter", "artist", "canvas", "easel", "art", "creative", "hobby", "brush"], {
  face: "act-bliss", opt: { outfit: "act-apron", outfitC: "purple", acc: ["act-beret"], accC: "red", hair: "short" }, pose: { r: [86, 8], pr: [0.6, 1], l: [-44, 56], pl: [-1, 1], ll: [-35, 130], rl: [35, 130] }, wide: true, shadow: [60, 300],
  held: (c) => c.H(0, palette(), 0, 6, 1.1, -10) + c.H(1, ln([[0, 0], [34, -8]], { c: "wood", w: "prop" }) + ci(38, -9, 4, "red", { w: "hair" }), 0, 0, 1),
  front: (c) => c.W(ln([[96, -150], [76, 0]], { c: "wood", w: "prop" }) + ln([[184, -150], [204, 0]], { c: "wood", w: "prop" }) + ln([[140, -250], [140, -60]], { c: "wood", w: "prop" }) + rr(92, -306, 100, 140, 4, "white", { w: "prop" }) + fr(98, -300, 88, 128, "sky") + fc(166, -270, 14, "yellow") + L.flat("M98 -200 Q130 -236 158 -206 Q176 -224 186 -210 V-172 H98 Z", "green") + L.flat("M98 -190 Q126 -178 160 -190 V-172 H98 Z", "grass") + rr(88, -160, 108, 10, 3, "wood", { w: "detail" })), box: [-170, -440, 400, 460] });
act("take-photo", G_MUS, "Taking a photo", ["photo", "camera", "photographer", "picture", "snap", "travel", "hobby", "tourist"], {
  face: "smile", opt: { outfit: "hawaiian", outfitC: "teal", acc: ["act-visor"], accC: "white" }, pose: (g) => ({ l: [-30, g.e[1] + 22], r: [30, g.e[1] + 22], pl: [-1, 1], pr: [1, 1], ll: [-38, 130], rl: [38, 130], xf: { rot: 2, planted: true } }),
  held: (c) => c.at(camera(), 0, c.g.e[1] + 8, 1.35), box: [-170, -440, 340, 460] });

// =================================================================== DANCE / YOGA / GYM ===================================================================
const G_SPORT = "Sport and exercise", G_DANCE = "Dance";
const discoBall = (x, y, r) => at(ln([[0, -200], [0, -r]], { c: "gray", w: "detail" }) + ci(0, 0, r, "gray", { w: "prop" }) + [-0.6, -0.2, 0.2, 0.6].map((k) => ln([[-r * 0.95, r * k], [r * 0.95, r * k]], { c: "white", w: "hair", op: 0.8 })).join("") + [-0.6, -0.2, 0.2, 0.6].map((k) => ln([[r * k, -r * 0.95], [r * k, r * 0.95]], { c: "white", w: "hair", op: 0.8 })).join("") + spark(-r * 0.4, -r * 0.4, 8, "white"), x, y);
act("dance-disco", G_DANCE, "Disco dance", ["dance", "disco", "party", "music", "club", "fun", "groove", "solo"], {
  face: "excited", opt: { outfit: "jacket", outfitC: "purple" }, pose: { r: [58, -112], pr: [1, 0.4], l: [-42, 58], pl: [-1, 1], ll: [-62, 126], rl: [34, 120], kr: [1, 0.1], xf: { rot: -6 } },
  back: (c) => c.W(discoBall(-90, -400, 36)), held: (c) => c.at(spark(0, 0, 12, "yellow") + spark(34, 22, 8, "pink"), 94, -150) + c.at(spark(0, 0, 10, "sky"), -84, -60), box: [-190, -450, 380, 470] });
act("dance-hiphop", G_DANCE, "Hip-hop dance", ["dance", "hip hop", "street", "party", "music", "groove", "cool", "solo", "breakdance"], {
  face: "smug", opt: { outfit: "hoodie", outfitC: "gray", acc: ["cap", "sunglasses"], accC: "orange" }, pose: { l: [-92, 26], pl: [-1, 0.6], r: [52, -58], pr: [1, 0.2], ll: [-62, 100], kl: [-1, 0.2], rl: [62, 100], kr: [1, 0.2], xf: { drop: 30, rot: 4, planted: true } },
  held: (c) => c.at(notes(0, 0, 1), -108, -150) + c.at(speed(0, 0, 3, 36, 12, "gray"), 130, 40), box: [-200, -440, 400, 460] });
act("dance-ballet", G_DANCE, "Ballet pirouette", ["dance", "ballet", "twirl", "graceful", "dancer", "tutu", "performance", "solo"], {
  face: "act-bliss", opt: { outfit: "act-tutu", outfitC: "pink", hair: "bun" }, pose: { l: [-26, -104], pl: [-1, 0.2], r: [26, -104], pr: [1, 0.2], ll: [-4, 62], kl: [-1, 0.1], rl: [6, 130], xf: { dy: -6 } }, demo: { style: "girl01" },
  held: (c) => c.at(spark(0, 0, 9, "yellow"), -90, -120) + c.at(spark(0, 0, 7, "pink"), 96, -60) + c.at(sl([[-80, 0], [-70, -16], [-52, -22]], { c: "pink", w: "detail", op: 0.8 }) + sl([[80, 0], [70, -16], [52, -22]], { c: "pink", w: "detail", op: 0.8 }), 0, 90), box: [-190, -450, 380, 470] });
act("dance-swing", G_DANCE, "Swing / Charleston dance", ["dance", "swing", "retro", "party", "kick", "jazz", "fun", "solo"], {
  face: "excited", opt: { outfit: "striped", outfitC: "white", hair: "quiff" }, pose: { l: [-94, 60], pl: [-1, 0.4], r: [80, -44], pr: [1, 0.4], ll: [-28, 130], rl: [96, 84], kr: [0.4, -1], xf: { rot: -4, planted: [true, false] } },
  held: (c) => c.at(notes(0, 0, 1), 110, -168) + c.at(sl([[0, 0], [10, 10], [24, 14]], { c: "gray", w: "detail" }) + sl([[0, 16], [10, 26], [24, 30]], { c: "gray", w: "detail" }), 140, 150), box: [-200, -450, 420, 470] });
act("yoga-tree", G_SPORT, "Yoga: tree pose", ["yoga", "balance", "tree pose", "stretch", "calm", "exercise", "wellness", "meditation"], {
  face: "act-calm", opt: { outfit: "athlete", outfitC: "teal", hair: "ponytail" }, pose: { l: [-5, 34], pl: [-1, 1], r: [5, 34], pr: [1, 1], ll: [-4, 130], rl: [-6, 60], kr: [1, 0.1] }, demo: { style: "girl01", outfit: "athlete" },
  back: (c) => c.W(mat("purple", 200).replace(/$/, "")), box: [-190, -440, 380, 460] });
act("yoga-warrior", G_SPORT, "Yoga: warrior pose", ["yoga", "warrior", "lunge", "stretch", "calm", "exercise", "wellness", "strength"], {
  face: "act-calm", opt: { outfit: "athlete", outfitC: "purple" }, pose: { l: [-124, 6], r: [124, 6], ll: [-96, 96], kl: [-1, -0.2], rl: [100, 88], kr: [0.3, -1], xf: { drop: 34 } }, shadow: [0, 330],
  back: (c) => c.W(mat("teal", 330)), box: [-230, -440, 460, 460] });
act("yoga-lotus", G_SPORT, "Meditating in lotus pose", ["yoga", "meditate", "meditation", "lotus", "calm", "mindful", "sit", "relax", "zen"], {
  face: "act-bliss", opt: { outfit: "tee", outfitC: "orange", hair: "bun" }, pose: { l: [-60, 100], pl: [-1, 0.6], r: [60, 100], pr: [1, 0.6], lt: [0, -80, 88], rt: [0, 80, -88], xf: { drop: 118 } }, shadow: [0, 290], demo: { style: "girl01", outfit: "tee" },
  back: (c) => c.W(mat("green", 250)), box: [-190, -400, 380, 420] });
act("lift-barbell", G_SPORT, "Lifting a barbell overhead", ["weights", "barbell", "lift", "gym", "strong", "muscle", "workout", "powerlifting", "fitness"], {
  face: "act-effort", opt: { outfit: "athlete", outfitC: "red", acc: ["act-headband"], accC: "white" }, demo: { body: "muscular" }, pose: { l: [-84, -96], pl: [-1, 0.3], r: [84, -96], pr: [1, 0.3], ll: [-52, 126], kl: [-1, 0.1], rl: [52, 126], kr: [1, 0.1], xf: { drop: 8 } },
  under: (c) => c.at(barbell(150), 0, -96, 1), held: (c) => c.at(drop(0, 0, 1), 70, c.g.hd[1] + 6) + c.at(drop(0, 0, 0.8), -74, c.g.hd[1] - 14), box: [-220, -470, 440, 490] });
act("lift-dumbbells", G_SPORT, "Dumbbell curls", ["weights", "dumbbell", "curl", "gym", "biceps", "muscle", "workout", "fitness", "exercise"], {
  face: "act-effort", opt: { outfit: "athlete", outfitC: "blue" }, demo: { body: "muscular", style: "girl01", outfit: "athlete" }, pose: { l: [-46, -14], pl: [-1, 1], r: [46, -14], pr: [1, 1], ll: [-44, 128], rl: [44, 128] },
  held: (c) => c.H(0, dumbbell("ink"), 0, -6, 1, 90) + c.H(1, dumbbell("ink"), 0, -6, 1, 90) + c.at(drop(0, 0, 0.9), 68, c.g.hd[1] + 6), box: [-190, -440, 380, 460] });

// ---- sport props ----
const bball = (x, y, r) => ci(x, y, r, "orange", { w: "prop" }) + L.stroke(`M${f1(x - r)} ${f1(y)} H${f1(x + r)} M${f1(x)} ${f1(y - r)} V${f1(y + r)}`, { c: "ink", w: "hair" }) + L.stroke(L.arc(x - r * 1.1, y, r * 0.8, -60, 60), { c: "ink", w: "hair" }) + L.stroke(L.arc(x + r * 1.1, y, r * 0.8, 120, 240), { c: "ink", w: "hair" });
const racket = () => ln([[0, 14], [0, -34]], { c: "wood", w: "prop" }) + rr(-4, -2, 8, 22, 3, "red", { w: "hair" }) + el(0, -74, 24, 36, "white", { w: "prop", flat: true }).replace(/fill="[^"]*"/, 'fill="none"') + [-12, -4, 4, 12].map((x) => ln([[x, -104], [x, -44]], { c: "gray", w: "hair", op: 0.8 })).join("") + [-90, -76, -62].map((y) => ln([[-20, y], [20, y]], { c: "gray", w: "hair", op: 0.8 })).join("");
const glove = (x, y, k = 1) => at(sm([[-16, -4], [-12, -18], [4, -22], [16, -10], [16, 8], [8, 18], [-10, 14]], "red", { w: "prop" }) + rr(-12, 14, 24, 10, 3, "white", { w: "detail" }) + ln([[-8, -2], [8, -2]], { c: "white", w: "hair", op: 0.7 }), x, y, k);
const hoopSet = (x, y) => at(rr(0, -90, 12, 110, 3, "white", { w: "prop" }) + rr(-2, -28, 8, 30, 2, "red", { w: "detail" }) + ln([[-48, 0], [0, 0]], { c: "orange", w: "prop" }) + [-40, -26, -12].map((px) => ln([[px, 2], [px + 6, 36]], { c: "white", w: "hair" })).join("") + ln([[-46, 4], [-4, 4]], { c: "white", w: "hair" }), x, y);
const G_RUN = "Running and moving";
const runBase = { ll: [-92, 50], kl: [-0.3, 1], rl: [60, 102], kr: [1, -0.1] };
act("run", G_RUN, "Running", ["run", "running", "jog", "sprint", "exercise", "race", "fast", "cardio", "move"], {
  face: "determined", opt: { outfit: "athlete", outfitC: "blue" }, pose: Object.assign({ r: [74, -18], pr: [0.2, 1], l: [-76, 8], pl: [-0.5, 1], xf: { rot: 8, drop: 26 } }, runBase), shadow: [10, 180],
  back: (c) => c.W(speed(-96, -270, 3, 90, 44, "gray")), box: [-250, -440, 480, 460] });
act("jog", G_RUN, "Jogging", ["jog", "jogging", "run", "exercise", "morning run", "health", "cardio", "fitness", "park"], {
  face: "smile", opt: { outfit: "tee", outfitC: "teal", acc: ["act-headband", "watch"], accC: "red" }, pose: { r: [56, 14], pr: [0.2, 1], l: [-58, 30], pl: [-0.5, 1], ll: [-64, 110], kl: [-0.3, 1], rl: [46, 118], kr: [1, 0], xf: { rot: 4, drop: 10 } }, demo: { style: "girl01", outfit: "tee" }, shadow: [0, 170],
  held: (c) => c.at(drop(0, 0, 0.9), 62, c.g.hd[1] + 10) + c.at(drop(0, 0, 0.7), -64, c.g.hd[1] - 20), box: [-220, -440, 440, 460] });
act("sprint", G_RUN, "Sprinting", ["sprint", "run", "race", "fast", "track", "athlete", "speed", "olympic", "dash"], {
  face: "act-effort", opt: { outfit: "athlete", outfitC: "red", acc: ["act-headband"], accC: "white" }, pose: { r: [96, -64], pr: [0.4, 1], l: [-70, 44], pl: [-0.5, 1], ll: [-112, 62], kl: [-0.3, 1], rl: [76, 100], kr: [1, -0.1], xf: { rot: 16, drop: 34 } }, shadow: [10, 200],
  back: (c) => c.W(speed(-90, -300, 4, 120, 34, "gray") + puff(-100, -10, 14, "stone", 0.6) + puff(-150, -6, 10, "stone", 0.5)), box: [-300, -440, 560, 460] });
act("jump-rope", G_RUN, "Jumping rope", ["jump rope", "skipping", "exercise", "cardio", "boxing training", "fitness", "playground", "kid"], {
  face: "happy", opt: { outfit: "athlete", outfitC: "pink", hair: "ponytail" }, demo: { style: "girl01", outfit: "athlete" }, pose: { l: [-62, 62], pl: [-1, 1], r: [62, 62], pr: [1, 1], ll: [-18, 108], kl: [-1, 0.2], rl: [18, 108], kr: [1, 0.2], xf: { dy: -36 } }, shadow: [0, 100],
  held: (c) => sl([c.hands[0], [-100 * c.s, -250 * c.s], [-86 * c.s, -400 * c.s], [0, -450 * c.s], [86 * c.s, -400 * c.s], [100 * c.s, -250 * c.s], c.hands[1]], { c: "orange", w: "prop" }) + c.hands.map((h) => rr(h[0] - 6, h[1] - 12, 12, 24, 5, "yellow", { w: "hair" })).join(""), box: [-170, -520, 340, 540] });
act("swim", G_RUN, "Swimming (front crawl)", ["swim", "swimming", "pool", "water", "crawl", "exercise", "summer", "sport", "swimmer"], {
  face: "determined", lying: true, opt: { outfit: "act-swim", outfitC: "teal", acc: ["act-goggles"], hair: "none" }, pose: { r: [36, -104], pr: [1, 0.3], l: [-30, 96], pl: [-1, 0.5], ll: [-18, 132], rl: [26, 118], kr: [1, 0], xf: { rot: 90, drop: 60 } }, shadow: false, wide: true,
  front: (c) => c.W(L.flat("M-260 -66 Q-230 -80 -200 -66 T-140 -66 T-80 -66 T-20 -66 T40 -66 T100 -66 T160 -66 T220 -66 T280 -66 V34 H-260 Z", "water", 0.62) + sl([[-260, -66], [-230, -78], [-200, -66], [-170, -78], [-140, -66], [-110, -78], [-80, -66], [-50, -78], [-20, -66], [10, -78], [40, -66], [70, -78], [100, -66], [130, -78], [160, -66], [190, -78], [220, -66], [250, -78], [280, -66]], { c: "blue", w: "detail" }) + puff(-190, -84, 10, "white", 0.9) + puff(-150, -92, 7, "white", 0.9) + drop(236, -130, 1) + drop(262, -112, 0.8) + drop(210, -150, 0.8)), box: [-290, -250, 600, 300] });
act("cycle-on-spot", G_RUN, "Cycling on an exercise bike", ["cycle", "cycling", "exercise bike", "spin", "gym", "cardio", "fitness", "pedal", "indoor"], {
  face: "act-effort", opt: { outfit: "athlete", outfitC: "orange" }, pose: { l: [58, 52], pl: [0, 1], r: [86, 46], pr: [1, 1], ll: [30, 106], kl: [1, 0.2], rl: [22, 48], kr: [1, -0.3], xf: { drop: 4 } }, shadow: [30, 280], wide: true,
  back: (c) => c.W(ln([[-4, -126], [-4, -40]], { c: "gray", w: "prop" }) + rr(-30, -140, 52, 14, 6, "ink", { w: "prop" }) + ln([[74, -200], [64, -70]], { c: "gray", w: "prop" }) + ln([[60, -204], [96, -204]], { c: "ink", w: "prop" }) + rr(-50, -30, 190, 12, 5, "gray", { w: "prop" }) + ln([[-4, -40], [64, -70]], { c: "gray", w: "prop" }) + ci(64, -70, 46, "gray", { w: "prop", tone: 2 }) + ci(64, -70, 22, "red", { w: "detail" }) + ci(64, -70, 6, "ink", { w: "hair" }) + rr(-60, -18, 16, 18, 4, "ink", { w: "detail" }) + rr(124, -18, 16, 18, 4, "ink", { w: "detail" })), box: [-190, -440, 400, 460] });
act("kick-football", G_RUN, "Kicking a football", ["football", "soccer", "kick", "ball", "sport", "goal", "player", "team"], {
  face: "determined", opt: { outfit: "athlete", outfitC: "green" }, pose: { l: [-80, -26], r: [70, 74], ll: [-18, 132], rl: [118, 22], kr: [0.3, -1], xf: { rot: -8, planted: [true, false] } }, shadow: [0, 190], wide: true,
  front: (c) => { const f = c.tp([118 * c.u + 12 * c.s, c.A.hip[1] + 14 * c.u]); return ball(f[0] + 22, f[1] - 10, 22) + ln([[f[0] + 54, f[1] - 4], [f[0] + 96, f[1] - 4]], { c: "gray", w: "detail" }) + ln([[f[0] + 52, f[1] + 14], [f[0] + 88, f[1] + 16]], { c: "gray", w: "detail" }); }, box: [-200, -440, 460, 460] });
act("basketball-shot", G_RUN, "Shooting a basketball", ["basketball", "shoot", "hoop", "sport", "ball", "jump shot", "nba", "court", "player"], {
  face: "determined", opt: { outfit: "athlete", outfitC: "purple" }, pose: { r: [34, -112], pr: [1, 0.3], l: [-24, -94], pl: [-1, 0.3], ll: [-34, 118], kl: [-1, 0.2], rl: [34, 112], kr: [1, 0.2], xf: { dy: -26 } }, shadow: [0, 110], wide: true,
  held: (c) => c.at(bball(0, 0, 22), 10, -150), back: (c) => c.W(hoopSet(250, -400) + L.stroke("M20 -460 Q110 -560 206 -370", { c: "gray", w: "detail", dash: "9 9" })), box: [-190, -560, 480, 580] });
act("tennis-serve", G_RUN, "Tennis serve", ["tennis", "serve", "racket", "sport", "ball", "court", "player", "match"], {
  face: "determined", opt: { outfit: "athlete", outfitC: "white", acc: ["act-visor"], accC: "yellow" }, pose: { r: [50, -108], pr: [1, 0.3], l: [-44, -96], pl: [-1, 0.3], ll: [-46, 128], rl: [46, 128], xf: { rot: -5 } }, shadow: [0, 170],
  held: (c) => c.H(1, racket(), 0, -4, 1.1, 24) + c.H(0, ci(-4, -34, 10, "yellow", { w: "prop" }) + L.stroke(L.arc(-4, -34, 7, 200, 340), { c: "white", w: "hair" }), 0, 0, 1), box: [-190, -460, 380, 480] });
act("golf-swing", G_RUN, "Golf swing", ["golf", "swing", "club", "sport", "course", "putt", "ball", "tee", "hobby"], {
  face: "determined", opt: { outfit: "sweater", outfitC: "green", acc: ["act-visor"], accC: "white" }, pose: { l: [8, 82], pl: [-1, 1], r: [16, 82], pr: [1, 1], ll: [-40, 124], kl: [-1, 0.1], rl: [40, 124], kr: [1, 0.1], xf: { rot: 6, drop: 6, planted: true } }, shadow: [30, 300], wide: true,
  held: (c) => ln([c.hands[1], [c.hands[1][0] + 70 * c.s, 0]], { c: "gray", w: "prop" }),
  front: (c) => c.W(ci(126, -6, 6, "white", { w: "detail" }) + ln([[126, 0], [126, 2]], { c: "red", w: "detail" }) + L.stroke("M120 -300 Q40 -380 -60 -250", { c: "gray", w: "detail", dash: "9 9" }) + rr(70, -12, 36, 12, 3, "gray", { w: "detail" }) + ln([[220, 0], [220, -210]], { c: "gray", w: "prop" }) + po([[220, -210], [270, -194], [220, -178]], "red", { w: "detail" })), box: [-190, -440, 480, 460] });
act("boxing-bag", G_RUN, "Punching a boxing bag", ["boxing", "punch", "bag", "gym", "fight", "workout", "fitness", "gloves", "training"], {
  face: "act-effort", opt: { outfit: "athlete", outfitC: "blue", acc: ["act-headband"], accC: "red" }, pose: { r: [110, -26], pr: [1, 0.6], l: [-26, -44], pl: [-1, 0.6], ll: [-50, 116], rl: [50, 122], xf: { drop: 10, rot: 4, planted: true } }, shadow: [40, 360], wide: true,
  held: (c) => c.H(1, glove(0, 0, 1.1), 8, 0, 1, 90) + c.H(0, glove(0, 0, 1.1), 0, -2, 1, 0) + c.at(drop(0, 0, 0.9), 62, c.g.hd[1] + 10),
  front: (c) => c.W(ln([[240, -440], [240, -360]], { c: "gray", w: "prop" }) + at(rr(-34, 0, 68, 190, 28, "red", { w: "prop" }) + ln([[-34, 36], [34, 36]], { w: "hair" }) + ln([[-34, 150], [34, 150]], { w: "hair" }) + rr(-6, -10, 12, 12, 3, "gray", { w: "detail" }), 240, -360, 1, 7) + speed(190, -240, 2, 20, 18, "gray")), box: [-190, -450, 480, 470] });
act("skateboard-trick", G_RUN, "Skateboard ollie", ["skateboard", "skate", "trick", "ollie", "jump", "sport", "street", "board", "teen"], {
  face: "excited", opt: { outfit: "hoodie", outfitC: "yellow", acc: ["cap"], accC: "blue" }, pose: { l: [-92, 10], pl: [-1, 0.5], r: [90, -18], pr: [1, 0.5], ll: [-34, 100], kl: [-1, 0.2], rl: [34, 96], kr: [1, 0.2], xf: { dy: -64 } }, shadow: [0, 120],
  under: (c) => at(rr(-76, -7, 152, 14, 7, "orange", { w: "prop" }) + ci(-46, 16, 9, "white", { w: "detail" }) + ci(46, 16, 9, "white", { w: "detail" }) + L.flat(L.rect(-60, -5, 120, 3), "yellow"), 0, c.A.hip[1] + 108 * c.u, 1, -9), box: [-190, -500, 380, 520] });
act("ladder-climb", G_RUN, "Climbing a ladder", ["ladder", "climb", "climbing", "up", "work", "repair", "height", "rungs"], {
  face: "determined", opt: { outfit: "builder", outfitC: "gray", acc: ["hardhat"] }, pose: { l: [-56, -98], pl: [-1, 0.3], r: [56, -36], pr: [1, 0.6], ll: [-26, 128], rl: [30, 90], kr: [1, -0.3] }, shadow: [0, 170],
  back: (c) => c.W([-58, 58].map((x) => rr(x - 6, -470, 12, 470, 4, "wood", { w: "prop" })).join("") + Array.from({ length: 10 }, (_, i) => rr(-58, -440 + i * 46, 116, 10, 3, "wood", { w: "detail" })).join("")), box: [-190, -480, 380, 500] });
act("wall-climb", G_RUN, "Climbing a climbing wall", ["climb", "climbing wall", "bouldering", "rock climbing", "sport", "indoor", "holds", "adventure"], {
  face: "act-effort", opt: { outfit: "athlete", outfitC: "teal", acc: ["hardhat"], accC: "red" }, pose: { l: [-74, -96], pl: [-1, 0.3], r: [66, -34], pr: [1, 0.6], ll: [-58, 98], kl: [-1, 0.2], rl: [52, 124], kr: [1, 0.2] }, shadow: [0, 230],
  back: (c) => c.W(rr(-130, -470, 260, 470, 6, "sand", { w: "prop" }) + [[-90, -420, "red"], [30, -400, "blue"], [-30, -340, "yellow"], [80, -300, "green"], [-84, -290, "pink"], [-76, -210, "orange"], [64, -200, "purple"], [-20, -120, "red"], [70, -100, "blue"], [-70, -70, "yellow"], [-10, -40, "green"]].map(([x, y, cc]) => el(x, y, 14, 10, cc, { w: "detail" })).join("")),
  under: (c) => ln([[8, c.A.hip[1]], [8, -470 * c.u]], { c: "orange", w: "prop" }), box: [-190, -480, 380, 500] });
act("hike-backpack", G_RUN, "Hiking with a backpack", ["hike", "hiking", "backpack", "trek", "outdoors", "walk", "mountain", "adventure", "camping"], {
  face: "smile", opt: { outfit: "jacket", outfitC: "green", acc: ["strawhat"] }, pose: { r: [74, 40], pr: [1, 0.8], l: [-56, 58], pl: [-1, 1], ll: [-48, 124], kl: [-1, 0.2], rl: [46, 126], kr: [1, 0.2], xf: { rot: 3, planted: true } }, shadow: [10, 180],
  under: (c) => c.at(rr(-56, -48, 112, 140, 24, "red", { w: "prop" }) + rr(-40, -70, 80, 34, 14, "orange", { w: "prop" }) + rr(-30, 36, 60, 40, 8, "red", { w: "detail", tone: 2 }) + ln([[-44, 20], [-60, 70]], { c: "brown", w: "detail" }) + ln([[44, 20], [60, 70]], { c: "brown", w: "detail" }), 0, 40, 1),
  held: (c) => ln([[c.hands[1][0], c.hands[1][1] - 40 * c.s], [c.hands[1][0] + 18 * c.s, 0]], { c: "wood", w: "prop" }) + rr(c.hands[1][0] - 8 * c.s, c.hands[1][1] - 44 * c.s, 16 * c.s, 14 * c.s, 5, "red", { w: "hair" }), box: [-190, -440, 380, 460] });

// =================================================================== OUTDOORS / CHORES / KITCHEN ===================================================================
const G_OUT = "Outdoors and hobbies", G_CHORE = "Chores, DIY and kitchen", G_CARRY = "Shopping and carrying";
const flame = (x, y, k = 1) => at(sm([[0, -64], [16, -34], [26, -6], [10, 14], [-10, 14], [-26, -6], [-14, -36]], "red", { w: "prop" }) + sm([[0, -44], [10, -22], [16, -2], [0, 10], [-14, -2], [-8, -24]], "orange", { w: "detail" }) + sm([[0, -22], [6, -8], [0, 4], [-6, -8]], "yellow", { w: "hair" }), x, y, k);
const potPlant = (x, y, k = 1) => at(po([[-26, -44], [26, -44], [20, 0], [-20, 0]], "orange", { w: "prop" }) + rr(-30, -54, 60, 14, 5, "orange", { w: "detail", tone: 2 }) + sl([[0, -54], [0, -100]], { c: "green", w: "prop" }) + sm([[0, -80], [-26, -96], [-20, -70]], "green", { w: "hair" }) + sm([[0, -90], [24, -110], [26, -84]], "green", { w: "hair" }) + ci(0, -108, 10, "pink", { w: "detail" }) + ci(0, -108, 4, "yellow", { w: "hair" }), x, y, k);
const wateringCan = () => rr(-30, -22, 52, 44, 8, "blue", { w: "prop" }) + ln([[22, 0], [64, -34]], { c: "blue", w: "prop" }) + po([[60, -46], [78, -30], [68, -24], [52, -38]], "blue", { w: "detail", tone: 2 }) + tube("M-30 -14 Q-52 -14 -50 0 Q-48 12 -30 12", "blue", 0.8) + ln([[-20, -22], [-10, -34], [10, -34], [18, -22]], { c: "blue", w: "prop" });
const trowel = () => ln([[0, 0], [0, -22]], { c: "wood", w: "prop" }) + po([[-9, -22], [9, -22], [0, -58]], "gray", { w: "detail" });
const sprout = (x, y) => at(sl([[0, 0], [0, -20]], { c: "green", w: "detail" }) + sm([[0, -14], [-14, -26], [-6, -8]], "green", { w: "hair" }) + sm([[0, -18], [14, -32], [10, -12]], "green", { w: "hair" }), x, y);
const flower = (x, y, c) => at(sl([[0, 0], [0, -40]], { c: "green", w: "detail" }) + [0, 1, 2, 3, 4].map((i) => ci(sin(i * 72) * 9, -46 - cos(i * 72) * 9, 7, c, { w: "hair" })).join("") + ci(0, -46, 5, "yellow", { w: "hair" }), x, y);
const pan = () => ci(0, 0, 34, "ink", { w: "prop" }) + ci(0, 0, 26, "gray", { w: "detail", tone: 2 }) + rr(30, -5, 56, 10, 4, "ink", { w: "detail" });
const knife = () => rr(-5, 0, 10, 34, 4, "brown", { w: "detail" }) + po([[-5, 0], [5, 0], [9, -62], [-4, -50]], "gray", { w: "detail" });
const broomShape = () => ln([[130, 0], [52, -236]], { c: "wood", w: "prop" }) + po([[116, -34], [136, -36], [170, 2], [100, 2]], "gold", { w: "prop" }) + [0, 1, 2, 3, 4].map((i) => ln([[112 + i * 14, -8], [104 + i * 17, 2]], { c: "earth", w: "hair" })).join("");
const bagPaper = (c = "wood") => rr(-24, -2, 48, 58, 4, c, { w: "prop" }) + tube("M-12 -2 Q-12 -22 0 -22 Q12 -22 12 -2", "wood", 0.7) + po([[8, -2], [20, -30], [26, -26], [16, 0]], "gold", { w: "detail" }) + sm([[-12, -2], [-20, -22], [-8, -20], [-2, -6]], "green", { w: "hair" });
const boxBrown = (w = 108, h = 84, icon) => rr(-w / 2, -h / 2, w, h, 6, "wood", { w: "prop" }) + rr(-9, -h / 2, 18, h, 0, "sand", { w: "hair", flat: true }) + (icon || "");
const G_OUTD = G_OUT;
act("fishing", G_OUTD, "Fishing", ["fish", "fishing", "rod", "lake", "angler", "hobby", "relax", "pond"], {
  face: "act-calm", opt: { outfit: "jacket", outfitC: "teal", acc: ["strawhat"] }, pose: { l: [28, 54], pl: [-1, 1], r: [64, 40], pr: [1, 1], ll: [-38, 130], rl: [38, 130] }, shadow: [10, 190], wide: true,
  held: (c) => ln([c.hands[1], [c.hands[1][0] + 130 * c.s, c.hands[1][1] - 190 * c.s]], { c: "wood", w: "prop" }) + c.hands.map((h) => "").join(""),
  front: (c) => { const t = [c.hands[1][0] + 130 * c.s, c.hands[1][1] - 190 * c.s]; return c.W(el(300, 0, 130, 14, "water", { w: "detail", flat: true }) + sl([[200, 0], [300, 6], [400, 0]], { c: "blue", w: "hair", op: 0.6 })) + L.stroke(`M${f1(t[0])} ${f1(t[1])} Q${f1(t[0] + 50)} ${f1(t[1] + 100)} ${f1(c.u * 290)} ${f1(-6)}`, { c: "gray", w: "hair" }) + c.W(ci(290, -8, 7, "red", { w: "detail" }) + L.flat("M290 -8 m-7 0 a7 7 0 0 0 14 0 Z", "white") + rr(-130, -50, 44, 50, 6, "blue", { w: "prop" }) + at(sm([[-18, 0], [-6, -10], [10, -8], [20, 0], [10, 8], [-6, 8]], "orange", { w: "detail" }) + po([[18, 0], [28, -8], [28, 8]], "orange", { w: "detail" }), -108, -56, 1, -20)); }, box: [-190, -450, 580, 470] });
const campAsset = (night) => ({
  face: "act-bliss", opt: { outfit: "hoodie", outfitC: night ? "orange" : "red", hair: "short" }, pose: Object.assign({ l: [28, 56], pl: [-1, 1], r: [72, 42], pr: [1, 1] }, SIT, { xf: SITXF }), shadow: [30, 520], wide: true,
  back: (c) => c.W((night ? L.shape(L.rrect(-350, -490, 700, 490, 28), "night", { w: "scene" }) + rr(-350, -34, 700, 34, 12, "navy", { w: "scene" }) + moonSmall(-250, -420, 28) + spark(-120, -440, 8, "cream") + spark(60, -470, 6, "cream") + spark(200, -430, 9, "cream") + spark(300, -380, 6, "cream") : "") + po([[-330, 0], [-230, -190], [-130, 0]], night ? "teal" : "orange", { w: "prop" }) + po([[-230, -190], [-262, 0], [-198, 0]], "ink", { w: "detail", tone: 2 }) + ln([[-230, -190], [-230, -214]], { c: "wood", w: "detail" }) + rr(-80, -66, 160, 66, 28, "wood", { w: "prop" }) + el(80, -33, 12, 28, "sand", { w: "detail" })),
  held: (c) => ln([c.hands[1], [c.hands[1][0] + 80 * c.s, c.hands[1][1] + 6 * c.s]], { c: "wood", w: "prop" }) + ci(c.hands[1][0] + 84 * c.s, c.hands[1][1] + 6 * c.s, 7 * c.s, "cream", { w: "detail" }),
  front: (c) => c.W((night ? fc(200, -40, 120, "yellow", 0.22) + fc(200, -40, 70, "orange", 0.25) : fc(200, -30, 70, "yellow", 0.18)) + rr(160, -18, 90, 18, 8, "wood", { w: "prop" }) + at(rr(-45, -12, 90, 18, 8, "wood", { w: "prop", tone: 2 }), 205, -12, 1, 16) + flame(205, -14, 1.15) + [[250, -90], [152, -100], [182, -126]].map(([x, y]) => spark(x, y, 5, "yellow")).join("")), box: [-350, -480, 700, 500] });
act("camp-fire-day", G_OUTD, "Camping by a fire (day)", ["camp", "camping", "fire", "campfire", "marshmallow", "outdoors", "tent", "adventure", "day"], campAsset(false));
act("camp-fire-night", G_OUTD, "Camping by a fire (night)", ["camp", "camping", "fire", "campfire", "marshmallow", "outdoors", "tent", "night", "stars"], campAsset(true));
act("gardening", G_OUTD, "Gardening", ["garden", "gardening", "plant", "flowers", "soil", "trowel", "hobby", "green thumb"], {
  face: "smile", opt: { outfit: "farmer", outfitC: "green", acc: ["strawhat"] }, pose: { l: [-34, 98], pl: [-1, 1], r: [36, 98], pr: [1, 1], ll: [-44, 70], kl: [-1, 0.2], rl: [44, 70], kr: [1, 0.2], xf: { drop: 60 } }, shadow: [0, 300], wide: true,
  held: (c) => c.H(1, trowel(), 0, 2, 1, 14),
  front: (c) => c.W(rr(-130, -64, 260, 64, 6, "wood", { w: "prop", tone: 2 }) + rr(-136, -74, 272, 16, 6, "earth", { w: "prop" }) + sprout(-96, -74) + sprout(-50, -74) + flower(60, -74, "pink") + flower(100, -74, "red") + flower(-8, -74, "yellow") + at(wateringCan(), 190, -28, 0.8)), box: [-190, -440, 440, 460] });
act("watering-plants", G_OUTD, "Watering plants", ["water", "watering can", "plants", "garden", "flowers", "chores", "houseplant", "grow"], {
  face: "happy", opt: { outfit: "tee", outfitC: "yellow", hair: "bob" }, pose: { r: [82, 36], pr: [1, 1], l: [-44, 80], pl: [-1, 1], ll: [-38, 130], rl: [38, 130] }, demo: { style: "girl01", outfit: "tee" }, shadow: [40, 280], wide: true,
  held: (c) => c.H(1, wateringCan(), 18, 6, 1.1, 22) + [0, 1, 2, 3].map((i) => c.H(1, ln([[0, 0], [2, 36]], { c: "water", w: "detail", op: 0.9 }), 86 + i * 9, 20 + i * 8, 1, -6)).join(""),
  front: (c) => c.W(potPlant(220, 0, 1.2) + potPlant(290, 0, 0.9)), box: [-190, -440, 560, 460] });
act("mow-lawn", G_OUTD, "Mowing the lawn", ["mow", "mower", "lawn", "garden", "grass", "chores", "yard", "summer"], {
  face: "determined", opt: { outfit: "tee", outfitC: "orange", acc: ["cap"], accC: "green" }, pose: { l: [66, 48], pl: [0, 1], r: [92, 44], pr: [1, 1], ll: [-40, 126], rl: [44, 128], xf: { rot: 8, planted: true } }, shadow: [80, 330], wide: true,
  held: (c) => ln([[(c.hands[0][0] + c.hands[1][0]) / 2 + 8, (c.hands[0][1] + c.hands[1][1]) / 2 - 4], [190 * c.u, -80 * c.u]], { c: "gray", w: "prop" }) + rr(c.hands[0][0] - 8 * c.s, c.hands[0][1] - 8 * c.s, 50 * c.s, 14 * c.s, 5, "ink", { w: "hair" }),
  front: (c) => c.W(rr(150, -86, 130, 56, 14, "red", { w: "prop" }) + rr(158, -100, 50, 18, 6, "red", { w: "detail", tone: 2 }) + ci(176, -26, 20, "ink", { w: "prop" }) + ci(176, -26, 8, "gray", { w: "hair" }) + ci(258, -26, 20, "ink", { w: "prop" }) + ci(258, -26, 8, "gray", { w: "hair" }) + puff(300, -50, 8, "grass", 0.9) + puff(322, -76, 6, "grass", 0.9) + [[-60, -4], [20, -2], [100, -4]].map(([x, y]) => ln([[x, y], [x + 5, y - 14]], { c: "grass", w: "detail" })).join("")), box: [-190, -440, 560, 460] });
act("paint-wall", G_CHORE, "Painting a wall with a roller", ["paint", "wall", "roller", "diy", "decorate", "renovate", "house", "chores", "painter"], {
  face: "determined", opt: { outfit: "act-coverall", outfitC: "blue", acc: ["cap"], accC: "white" }, pose: { r: [96, -66], pr: [1, 0.3], l: [-44, 64], pl: [-1, 1], ll: [-38, 130], rl: [38, 130] }, shadow: [50, 320], wide: true,
  back: (c) => c.W(rr(120, -430, 200, 430, 0, "cream", { w: "scene" }) + fr(122, -428, 90, 426, "sky") + L.flat("M122 -428 H212 V-2 H122 Z", "sky") + rr(-120, -34, 40, 34, 4, "red", { w: "prop" }) + ln([[-120, -34], [-80, -34]], { w: "hair" })),
  held: (c) => c.H(1, ln([[0, 0], [0, -28], [36, -40]], { c: "gray", w: "prop" }) + rr(6, -64, 70, 24, 10, "blue", { w: "prop" }) + ln([[76, -52], [82, -52]], { c: "blue", w: "prop" }) + drop(34, -26, 0.8), 0, 0, 1), box: [-190, -440, 520, 460] });
const hammerP = () => ln([[0, 0], [0, -62]], { c: "wood", w: "prop" }) + rr(-26, -84, 52, 24, 5, "gray", { w: "prop" }) + po([[-26, -80], [-40, -74], [-26, -66]], "gray", { w: "detail" });
act("hammering", G_CHORE, "Hammering a nail", ["hammer", "nail", "carpenter", "diy", "build", "tool", "wood", "workshop", "builder"], {
  face: "determined", opt: { outfit: "builder", outfitC: "gray", acc: ["hardhat", "act-toolbelt"] }, pose: { r: [74, -52], pr: [1, 0.2], l: [-40, 80], pl: [-1, 1], ll: [-38, 130], rl: [38, 130] }, shadow: [60, 300], wide: true,
  held: (c) => c.H(1, hammerP(), 0, 6, 1.05, 24),
  front: (c) => c.W(rr(70, -120, 220, 18, 5, "wood", { w: "prop" }) + ln([[90, -102], [90, 0]], { c: "wood", w: "prop" }) + ln([[270, -102], [270, 0]], { c: "wood", w: "prop" }) + rr(110, -140, 120, 20, 3, "sand", { w: "detail" }) + ln([[150, -150], [150, -140]], { c: "gray", w: "prop" }) + ln([[130, -176], [118, -190]], { c: "gray", w: "detail" }) + ln([[170, -180], [180, -194]], { c: "gray", w: "detail" })), box: [-190, -440, 440, 460] });
act("drilling", G_CHORE, "Drilling into a wall", ["drill", "power tool", "diy", "wall", "repair", "tool", "hole", "workshop"], {
  face: "determined", opt: { outfit: "builder", outfitC: "gray", acc: ["glasses", "hardhat"] }, pose: { r: [86, 0], pr: [1, 0.8], l: [60, 14], pl: [0, 1], ll: [-38, 130], rl: [38, 130] }, shadow: [40, 260], wide: true,
  held: (c) => c.H(1, rr(-26, -16, 50, 30, 8, "orange", { w: "prop" }) + rr(-6, 12, 18, 30, 6, "ink", { w: "detail" }) + rr(24, -9, 14, 18, 3, "gray", { w: "detail" }) + ln([[38, 0], [66, 0]], { c: "gray", w: "prop" }), 0, 0, 1),
  back: (c) => c.W(rr(150, -460, 48, 460, 0, "sand", { w: "prop" }) + [0, 1, 2, 3].map((i) => ln([[150, -400 + i * 110], [198, -400 + i * 110]], { w: "hair" })).join("")),
  front: (c) => c.W(puff(138, -226, 8, "stone", 0.8) + puff(124, -246, 6, "stone", 0.7) + puff(140, -196, 6, "stone", 0.7)), box: [-190, -440, 420, 460] });
act("sweeping", G_CHORE, "Sweeping the floor", ["sweep", "broom", "clean", "chores", "tidy", "floor", "housework", "dust"], {
  face: "smile", opt: { outfit: "act-apron", outfitC: "teal", acc: ["act-headband"], accC: "pink" }, pose: { r: [66, 49], pr: [1, 1], l: [58, 22], pl: [0.4, 1], ll: [-38, 130], rl: [38, 130] }, demo: { style: "girl01" }, shadow: [40, 270], wide: true,
  front: (c) => c.W(broomShape() + puff(190, -12, 10, "stone", 0.7) + puff(214, -22, 7, "stone", 0.6) + [[230, -4, "orange"], [252, -6, "red"], [260, -2, "yellow"]].map(([x, y, cc]) => L.flat(L.circ(x, y, 7, 4), cc)).join("")), box: [-190, -440, 520, 460] });
act("mopping", G_CHORE, "Mopping the floor", ["mop", "mopping", "clean", "chores", "floor", "wet floor", "housework", "janitor", "cleaner"], {
  face: "determined", opt: { outfit: "tee", outfitC: "sky", acc: ["act-headband"], accC: "yellow" }, pose: { r: [66, 49], pr: [1, 1], l: [58, 22], pl: [0.4, 1], ll: [-38, 130], rl: [38, 130] }, shadow: [40, 270], wide: true,
  front: (c) => c.W(ln([[130, 0], [52, -236]], { c: "wood", w: "prop" }) + rr(96, -22, 80, 22, 8, "gray", { w: "prop" }) + [0, 1, 2, 3, 4, 5, 6].map((i) => ln([[100 + i * 12, -2], [96 + i * 12, 14]], { c: "white", w: "prop" })).join("") + el(210, 6, 30, 5, "water", { w: "hair", flat: true }) + at(po([[-34, 0], [-28, -80], [28, -80], [34, 0]], "blue", { w: "prop" }) + el(0, -80, 28, 6, "water", { w: "detail" }) + bubbles([[-8, -86, 6], [8, -84, 5]], "white"), 270, 0) + at(po([[-30, 0], [0, -86], [30, 0]], "yellow", { w: "prop" }) + ln([[0, -60], [0, -34]], { c: "ink", w: "prop" }) + ci(0, -22, 4, "ink", { w: "hair" }), -120, 0)), box: [-210, -440, 560, 460] });
const CTOP = -128;
const knob = (x, y) => ci(x, y, 5, "gray", { w: "hair" });
act("cooking-stove", G_CHORE, "Cooking at a stove", ["cook", "cooking", "stove", "kitchen", "pan", "chef", "dinner", "frying", "food"], {
  face: "act-yum", opt: { outfit: "act-apron", outfitC: "red", acc: ["chefhat"] }, pose: { r: [44, 100], pr: [1, 1], l: [-42, 60], pl: [-1, 1], ll: [-38, 130], rl: [38, 130] }, shadow: [0, 300],
  held: (c) => c.H(1, pan(), 40, 22, 0.9, 0) + c.H(0, ln([[0, 0], [30, 22]], { c: "wood", w: "prop" }) + rr(26, 18, 22, 12, 4, "gray", { w: "detail" }), 0, 0, 1) + c.H(1, steam(60, 0, 1), 0, -4),
  front: (c) => c.W(counterFront(-110, 110, CTOP, "gray", "ink") + [-70, -30, 30, 70].map((x) => knob(x, -90)).join("") + rr(-70, -70, 140, 52, 6, "ink", { w: "detail" }) + L.flat("M-60 -66 H60", "white", 0.5) + at(flame(0, 0, 0.35), 30, CTOP) + at(flame(0, 0, 0.35), 50, CTOP) + ci(-62, CTOP - 20, 20, "gray", { w: "prop" }) + el(-62, CTOP - 40, 22, 5, "gray", { w: "detail", tone: 2 }) + steam(-70, CTOP - 46, 1)), box: [-190, -440, 380, 460] });
act("chopping-veg", G_CHORE, "Chopping vegetables", ["chop", "chopping", "knife", "kitchen", "cook", "vegetables", "carrot", "prep", "food"], {
  face: "determined", opt: { outfit: "act-apron", outfitC: "green", acc: ["act-headband"], accC: "white" }, pose: { r: [34, 96], pr: [1, 1], l: [-14, 98], pl: [-1, 1], ll: [-38, 130], rl: [38, 130] }, shadow: [0, 300],
  held: (c) => c.H(1, knife(), 4, 4, 1, 28),
  front: (c) => c.W(counterFront(-120, 120, CTOP, "wood", "sand") + rr(-62, CTOP - 12, 124, 10, 3, "sand", { w: "detail" }) + [0, 1, 2, 3].map((i) => rr(-42 + i * 12, CTOP - 22, 8, 10, 2, "orange", { w: "hair" })).join("") + rr(-8, CTOP - 22, 36, 10, 5, "orange", { w: "detail" }) + el(52, CTOP - 22, 10, 9, "red", { w: "detail" }) + el(80, CTOP - 20, 9, 8, "red", { w: "detail" }) + at(rr(-8, -14, 44, 16, 3, "green", { w: "detail" }), -86, CTOP - 12)), box: [-190, -440, 380, 460] });
act("baking-cookies", G_CHORE, "Baking: tray of cookies from the oven", ["bake", "baking", "cookies", "oven", "kitchen", "tray", "dessert", "baker", "mitts"], {
  face: "act-yum", opt: { outfit: "act-apron", outfitC: "pink", acc: ["chefhat"] }, pose: { l: [-40, 68], pl: [-1, 1], r: [40, 68], pr: [1, 1], ll: [-38, 130], rl: [38, 130] }, demo: { style: "girl01" }, shadow: [60, 360], wide: true,
  held: (c) => c.at(rr(-66, 0, 132, 10, 4, "gray", { w: "prop" }) + [[-48, -8], [-22, -10], [4, -8], [30, -10], [54, -8]].map(([x, y]) => el(x, y, 11, 8, "earth", { w: "detail" }) + ci(x - 3, y - 2, 1.8, "brown", { w: "hair" }) + ci(x + 4, y + 1, 1.6, "brown", { w: "hair" })).join("") + steam(-20, -20, 0.9), 0, 70, 1) + c.hands.map((h) => ci(h[0], h[1], 14 * c.s, "red", { w: "prop" })).join(""),
  back: (c) => c.W(rr(150, -200, 150, 200, 12, "gray", { w: "prop" }) + rr(166, -170, 118, 96, 8, "ink", { w: "detail" }) + L.flat(L.rect(172, -164, 106, 84), "orange", 0.35) + rr(160, -184, 130, 8, 4, "ink", { w: "hair" })), box: [-190, -440, 520, 460] });
act("waiter-serve", G_CARRY, "Waiter serving food", ["waiter", "waitress", "serve", "restaurant", "tray", "food", "cafe", "dinner", "hospitality", "job"], {
  face: "smile", opt: { outfit: "office", outfitC: "white", acc: ["bowtie"], accC: "red" }, pose: { r: [58, -74], pr: [1, 0.2], l: [-26, 66], pl: [0, 1], ll: [-38, 130], rl: [38, 130] }, shadow: [0, 170],
  held: (c) => c.H(1, el(0, -10, 56, 8, "gray", { w: "prop" }) + sm([[-30, -16], [-26, -44], [0, -58], [26, -44], [30, -16]], "glass", { w: "prop" }) + ci(0, -62, 5, "gray", { w: "detail" }) + rr(36, -40, 12, 28, 3, "glass", { w: "detail" }) + L.flat(L.rrect(37, -26, 10, 14, 2), "red", 0.8), 0, -2, 1) + c.H(0, rr(-8, -12, 18, 40, 4, "white", { w: "detail" }), 0, 0, 1, 8), box: [-170, -480, 340, 500] });
act("shopping-cart", G_CARRY, "Pushing a shopping cart", ["shopping", "cart", "trolley", "supermarket", "groceries", "shop", "store", "buy"], {
  face: "smile", opt: { outfit: "sweater", outfitC: "orange", hair: "bob" }, pose: { l: [56, 50], pl: [0, 1], r: [74, 46], pr: [1, 1], ll: [-40, 130], rl: [40, 130], xf: { rot: 4, planted: true } }, demo: { style: "girl01", outfit: "sweater" }, shadow: [90, 330], wide: true,
  back: (c) => c.W(ln([[246, -140], [246, -150]], { c: "gray", w: "prop" }) + rr(108, -176, 40, 56, 5, "white", { w: "detail" }) + rr(112, -186, 32, 14, 3, "blue", { w: "hair" }) + at(rr(-8, -10, 100, 18, 9, "earth", { w: "detail" }), 138, -168, 1, -24) + ci(212, -168, 12, "red", { w: "detail" }) + sm([[176, -170], [184, -196], [190, -170]], "orange", { w: "hair" }) + sm([[176, -184], [168, -204], [182, -196]], "green", { w: "hair" })),
  front: (c) => c.W(ln([[56, -190], [82, -150]], { c: "gray", w: "prop" }) + po([[82, -150], [262, -150], [238, -70], [102, -70]], "glass", { w: "prop" }) + [0, 1, 2, 3, 4].map((i) => ln([[100 + i * 38, -150], [112 + i * 30, -70]], { c: "gray", w: "hair" })).join("") + [-120, -95].map((y) => ln([[90 + (y + 150) * 0.3 * 0, y], [250 - (y + 150) * 0.5, y]], { c: "gray", w: "hair" })).join("") + ln([[110, -70], [120, -44]], { c: "gray", w: "prop" }) + ln([[232, -70], [222, -44]], { c: "gray", w: "prop" }) + ci(120, -24, 17, "ink", { w: "prop" }) + ci(120, -24, 6, "gray", { w: "hair" }) + ci(222, -24, 17, "ink", { w: "prop" }) + ci(222, -24, 6, "gray", { w: "hair" })), box: [-190, -440, 520, 460] });
act("carry-bags", G_CARRY, "Carrying shopping bags", ["shopping", "bags", "carry", "groceries", "walk", "buy", "store", "errand", "market"], {
  face: "happy", opt: { outfit: "jacket", outfitC: "teal", hair: "wavy" }, pose: { l: [-60, 98], pl: [-1, 1], r: [60, 98], pr: [1, 1], ll: [-36, 130], rl: [36, 130] }, demo: { style: "girl01", outfit: "jacket" }, shadow: [0, 200],
  held: (c) => c.H(0, bagPaper("wood"), 0, 6, 1.2, 4) + c.H(1, bagPaper("pink"), 0, 6, 1.2, -4), box: [-190, -440, 380, 460] });
act("carry-box", G_CARRY, "Carrying a big box", ["box", "carry", "parcel", "moving", "delivery", "lift", "heavy", "package"], {
  face: "determined", opt: { outfit: "hoodie", outfitC: "gray", acc: ["cap"], accC: "orange" }, pose: { l: [-44, 62], pl: [-1, 1], r: [44, 62], pr: [1, 1], ll: [-38, 128], rl: [38, 128], xf: { rot: -3, planted: true } }, shadow: [0, 190],
  held: (c) => c.at(boxBrown(120, 90, L.stroke("M-20 14 V-14 M-30 -4 L-20 -16 L-10 -4", { c: "ink", w: "prop", op: 0.6 }) + rr(22, -28, 22, 14, 3, "white", { w: "hair" })), 0, 74, 1), box: [-190, -440, 380, 460] });
act("push-hand-truck", G_CARRY, "Pushing a hand truck with boxes", ["hand truck", "trolley", "warehouse", "delivery", "boxes", "move", "push", "work", "dolly"], {
  face: "determined", opt: { outfit: "act-coverall", outfitC: "orange", acc: ["cap"], accC: "white" }, pose: { l: [58, 8], pl: [0, 1], r: [92, 10], pr: [1, 1], ll: [-40, 130], rl: [40, 128], xf: { rot: 8, planted: true } }, shadow: [90, 320], wide: true,
  front: (c) => c.W(ln([[108, -250], [104, -40]], { c: "gray", w: "prop" }) + ln([[140, -250], [136, -40]], { c: "gray", w: "prop" }) + ln([[80, -250], [140, -250]], { c: "gray", w: "prop" }) + rr(104, -24, 70, 10, 4, "gray", { w: "prop" }) + ci(150, -22, 22, "ink", { w: "prop" }) + ci(150, -22, 8, "gray", { w: "hair" }) + at(boxBrown(94, 82), 160, -66) + at(boxBrown(84, 72), 156, -148) + ln([[120, -228], [120, -40]], { c: "gray", w: "detail", op: 0.0 })), box: [-190, -440, 460, 460] });

// =================================================================== PROFESSIONS ===================================================================
const G_MED = "Jobs: health and science", G_SERV = "Jobs: services and trades", G_PUB = "Jobs: public, media and office", G_ROLE = "Roles and characters";
const clipboard = () => rr(-22, -30, 44, 60, 5, "wood", { w: "prop" }) + rr(-17, -22, 34, 48, 2, "white", { w: "hair" }) + rr(-8, -34, 16, 10, 3, "gray", { w: "detail" }) + [0, 1, 2, 3].map((i) => ln([[-12, -12 + i * 10], [12, -12 + i * 10]], { c: "gray", w: "hair" })).join("");
const firstAid = () => rr(-30, -22, 60, 44, 7, "white", { w: "prop" }) + L.flat("M-5 -12 h10 v7 h7 v10 h-7 v7 h-10 v-7 h-7 v-10 h7 z", "red") + rr(-12, -30, 24, 10, 4, "white", { w: "detail" });
const glove2 = (x, y, k = 1) => ci(x, y, 13 * k, "sky", { w: "detail" });
const toothModel = () => rr(-26, -6, 52, 10, 4, "gray", { w: "detail" }) + sm([[-44, -92], [-22, -116], [0, -108], [22, -116], [44, -92], [40, -58], [28, -20], [14, -34], [0, -46], [-14, -34], [-28, -20], [-40, -58]], "white", { w: "prop" }) + ci(-14, -80, 4, "ink", { w: "hair" }) + ci(14, -80, 4, "ink", { w: "hair" }) + sl([[-14, -64], [0, -56], [14, -64]], { c: "ink", w: "detail" }) + L.flat("M-30 -104 Q-36 -86 -30 -72", "glass", 0.9);
const beakerG = () => po([[-16, -34], [16, -34], [22, 20], [-22, 20]], "glass", { w: "prop" }) + L.flat(L.poly([[-18, -6], [18, -6], [21, 18], [-21, 18]], true), "green", 0.8) + bubbles([[-6, -14, 4], [6, -22, 3], [0, -30, 2.5]], "white") + rr(-20, -38, 40, 6, 3, "glass", { w: "detail" });
const microscope = () => rr(-30, 0, 60, 10, 4, "gray", { w: "prop" }) + ln([[18, 0], [18, -56]], { c: "gray", w: "prop" }) + at(rr(-8, -14, 16, 56, 5, "ink", { w: "prop" }), 0, -64, 1, 24) + rr(-18, -22, 36, 6, 2, "gray", { w: "detail" });
const heartMon = () => rr(-44, -70, 88, 64, 7, "gray", { w: "prop" }) + rr(-37, -62, 74, 40, 3, "ink", { w: "detail" }) + sl([[-32, -42], [-20, -42], [-14, -58], [-6, -28], [2, -50], [8, -42], [32, -42]], { c: "green", w: "detail" }) + ci(-24, -14, 3, "red", { w: "hair" }) + ci(-12, -14, 3, "green", { w: "hair" });
const mirrorTool = () => ln([[0, 0], [10, -36]], { c: "gray", w: "prop" }) + ci(12, -46, 11, "glass", { w: "prop" }) + L.flat(L.circ(9, -49, 3.5), "white", 0.9);
act("job-doctor", G_MED, "Doctor with stethoscope", ["doctor", "job", "work", "medical", "health", "hospital", "physician", "stethoscope", "profession"], {
  face: "smile", opt: { outfit: "labcoat", outfitC: "white", acc: ["act-stethoscope"] }, pose: { l: [-26, 36], pl: [-1, 1], r: [52, 92], pr: [1, 1] }, demo: { style: "girl01", outfit: "labcoat" },
  held: (c) => c.H(0, clipboard(), 0, 0, 1, -8), box: [-170, -440, 340, 460] });
act("job-nurse", G_MED, "Nurse with first-aid kit", ["nurse", "job", "work", "medical", "health", "hospital", "care", "profession", "first aid"], {
  face: "happy", opt: { outfit: "nurse", outfitC: "white", acc: ["nursecap"] }, pose: { r: [58, 96], pr: [1, 1], l: [-62, -34], pl: [-1, 0.3] }, demo: { style: "girl01", outfit: "nurse" },
  held: (c) => c.H(1, firstAid(), 0, 24, 1, 0), box: [-170, -440, 340, 460] });
act("job-surgeon", G_MED, "Surgeon, calm and ready", ["surgeon", "job", "work", "medical", "hospital", "operation", "doctor", "scrubs", "profession"], {
  face: "act-calm", opt: { outfit: "act-scrubs", outfitC: "teal", acc: ["act-scrubcap", "act-mask"], accC: "teal" }, pose: { l: [-34, 14], pl: [-1, 1], r: [34, 14], pr: [1, 1], ll: [-35, 130], rl: [35, 130] }, shadow: [40, 300], wide: true,
  held: (c) => c.hands.map((h) => glove2(h[0], h[1], c.s)).join(""), front: (c) => c.W(at(heartMon(), 190, -90, 1.1)), box: [-170, -440, 420, 460] });
act("job-dentist", G_MED, "Dentist with tooth model", ["dentist", "job", "work", "teeth", "dental", "clinic", "health", "profession", "tooth"], {
  face: "smile", opt: { outfit: "labcoat", outfitC: "sky", acc: ["act-mask", "glasses"] }, pose: { r: [60, 6], pr: [1, 0.8], l: [-40, 80], pl: [-1, 1] }, shadow: [60, 340], wide: true,
  held: (c) => c.H(1, mirrorTool(), 0, 0, 1.3, 20), front: (c) => c.W(at(toothModel(), 190, -34, 1.25) + rr(168, -36, 44, 36, 4, "gray", { w: "detail" })), box: [-170, -440, 440, 460] });
act("job-scientist", G_MED, "Scientist at the lab bench", ["scientist", "job", "work", "lab", "science", "research", "experiment", "chemistry", "profession"], {
  face: "excited", opt: { outfit: "labcoat", outfitC: "white", acc: ["glasses"], hair: "messy" }, pose: { r: [56, 30], pr: [1, 1], l: [-40, 98], pl: [-1, 1] }, shadow: [0, 330], wide: true,
  held: (c) => c.H(1, beakerG(), 0, -18, 1.3, 0),
  front: (c) => c.W(counterFront(-150, 150, -118, "wood", "stone") + at(microscope(), -100, -122, 0.9) + at(po([[-12, -34], [12, -34], [24, 0], [-24, 0]], "glass", { w: "prop" }) + L.flat(L.poly([[-20, -12], [20, -12], [24, 0], [-24, 0]], true), "pink", 0.8) + rr(-6, -46, 12, 14, 3, "glass", { w: "detail" }), -50, -122, 0.9) + at(rr(-14, -34, 28, 34, 5, "glass", { w: "prop" }) + L.flat(L.rrect(-12, -20, 24, 18, 3), "orange", 0.8), 90, -122, 0.9)), box: [-190, -440, 380, 460] });
act("job-astronaut", G_MED, "Astronaut floating in space", ["astronaut", "job", "space", "float", "zero gravity", "nasa", "spacewalk", "profession", "science"], {
  face: "wow", opt: { outfit: "astronaut", outfitC: "white", acc: ["helmet"] }, pose: { l: [-92, -26], pl: [-1, 0.2], r: [90, -52], pr: [1, 0.2], ll: [-52, 110], kl: [-1, 0.3], rl: [34, 118], kr: [1, 0.2], xf: { rot: 22, dy: -50 } }, shadow: false, wide: true,
  back: (c) => c.W([[-200, -420, 8], [180, -460, 6], [240, -240, 9], [-230, -200, 6], [-120, -490, 5], [100, -90, 7]].map(([x, y, r]) => spark(x, y, r, "yellow")).join("") + ci(210, -380, 26, "orange", { w: "prop" }) + el(210, -380, 44, 9, "yellow", { w: "detail", flat: true }).replace(/fill="[^"]*"/, 'fill="none"') + sl([[-100, -110], [-170, -60], [-230, -110], [-290, -80]], { c: "gray", w: "detail", dash: "6 8" })), box: [-300, -540, 600, 580] });
const cockpitDash = () => po([[-190, -96], [190, -96], [220, 0], [-220, 0]], "gray", { w: "prop", tone: 2 }) + rr(-190, -112, 380, 20, 8, "ink", { w: "prop" }) + [-120, -60, 60, 120].map((x) => ci(x, -62, 17, "white", { w: "detail" }) + ln([[x, -62], [x + 8, -70]], { w: "detail" })).join("") + rr(-30, -72, 60, 38, 5, "navy", { w: "detail" }) + ln([[-22, -52], [-8, -52], [-2, -62], [6, -44], [14, -52], [22, -52]], { c: "green", w: "hair" });
act("job-pilot", G_SERV, "Pilot in the cockpit", ["pilot", "job", "work", "plane", "aeroplane", "aviation", "captain", "flight", "profession"], {
  face: "smile", opt: { outfit: "act-pilot", outfitC: "navy", acc: ["act-pilotcap", "sunglasses"] }, pose: Object.assign(deskPose(() => [-46, 40], () => [46, 40]), {}), shadow: [0, 400], wide: true,
  back: (c) => c.W(chairBack("gray", 120, -236, -92)),
  front: (c) => c.W(cockpitDash() + ln([[0, -92], [0, -118]], { c: "gray", w: "prop" }) + ln([[-50, -150], [50, -150]], { c: "ink", w: "prop" }) + ln([[-50, -150], [-50, -126]], { c: "ink", w: "prop" }) + ln([[50, -150], [50, -126]], { c: "ink", w: "prop" }) + ln([[0, -118], [0, -150]], { c: "gray", w: "prop" })), box: [-240, -440, 480, 460] });
act("job-firefighter", G_SERV, "Firefighter spraying water", ["firefighter", "fireman", "job", "work", "fire", "hose", "rescue", "emergency", "profession"], {
  face: "determined", opt: { outfit: "act-firefighter", outfitC: "yellow", acc: ["act-firehelmet"], accC: "red" }, pose: { l: [58, 38], pl: [0, 1], r: [86, 30], pr: [1, 1], ll: [-44, 126], rl: [44, 126], xf: { rot: 5, planted: true } }, shadow: [40, 400], wide: true,
  held: (c) => rr(c.hands[1][0] - 4 * c.s, c.hands[1][1] - 12 * c.s, 40 * c.s, 22 * c.s, 8, "red", { w: "prop" }) + L.stroke(`M${f1(-150 * c.u)} ${f1(-4)} Q${f1(-60 * c.u)} ${f1(-70 * c.u)} ${f1(c.hands[0][0])} ${f1(c.hands[0][1] + 6)}`, { c: "red", w: L.T.line.prop * 2.2 }),
  front: (c) => { const n = [c.hands[1][0] + 38 * c.s, c.hands[1][1]]; return L.flat(`M${f1(n[0])} ${f1(n[1] - 6)} Q${f1(n[0] + 90 * c.u)} ${f1(n[1] - 40 * c.u)} ${f1(250 * c.u)} ${f1(-90 * c.u)} L${f1(262 * c.u)} ${f1(-60 * c.u)} Q${f1(n[0] + 100 * c.u)} ${f1(n[1] + 10 * c.u)} ${f1(n[0])} ${f1(n[1] + 8)} Z`, "water", 0.7) + c.W(drop(236, -50, 0.9) + drop(270, -110, 0.8) + flame(300, 0, 0.9) + puff(310, -90, 10, "stone", 0.6)); }, box: [-190, -440, 560, 460] });
act("job-police", G_PUB, "Police officer, friendly wave", ["police", "officer", "job", "work", "safety", "law", "community", "cop", "profession"], {
  face: "happy", opt: { outfit: "act-police", outfitC: "navy", acc: ["act-policecap"] }, pose: { r: [62, -70], pr: [1, 0.3], l: [-48, 100] }, shadow: [0, 240],
  front: (c) => c.W(at(po([[-30, 0], [-12, -120], [12, -120], [30, 0]], "orange", { w: "prop" }) + rr(-18, -78, 36, 12, 0, "white", { w: "detail", flat: true }) + rr(-38, -6, 76, 10, 3, "ink", { w: "detail" }), -130, 0, 0.8)), box: [-210, -440, 400, 460] });
act("job-builder", G_SERV, "Builder laying bricks", ["builder", "bricklayer", "construction", "job", "work", "wall", "hard hat", "site", "profession"], {
  face: "determined", opt: { outfit: "builder", outfitC: "gray", acc: ["hardhat"] }, pose: { r: [78, 56], pr: [1, 1], l: [-30, 76], pl: [-1, 1] }, shadow: [60, 330], wide: true,
  held: (c) => c.H(1, rr(-4, -10, 36, 12, 2, "gray", { w: "detail" }) + rr(-8, 0, 12, 16, 3, "wood", { w: "detail" }), 0, -2, 1.1, -10) + c.H(0, rr(-18, -8, 36, 18, 2, "red", { w: "detail" }), 0, 0, 1),
  front: (c) => c.W([0, 1, 2, 3, 4].map((r) => [0, 1, 2, 3].map((i) => rr(110 + i * 38 + (r % 2) * 19, -r * 26 - 26, 36, 24, 2, "red", { w: "detail", tone: r % 2 })).join("")).join("") + rr(110, -134, 160, 8, 2, "sand", { w: "hair", flat: true })), box: [-170, -440, 480, 460] });
act("job-farmer", G_SERV, "Farmer with a hoe", ["farmer", "farm", "job", "work", "hoe", "crops", "agriculture", "field", "profession"], {
  face: "smile", opt: { outfit: "farmer", outfitC: "red", acc: ["strawhat"] }, pose: { l: [59, 29], pl: [0.6, 1], r: [80, 79], pr: [1, 1], ll: [-38, 130], rl: [38, 130] }, shadow: [40, 300], wide: true,
  front: (c) => c.W(ln([[150, 0], [36, -262]], { c: "wood", w: "prop" }) + po([[140, -6], [190, -22], [200, -6], [188, 0]], "gray", { w: "prop" }) + [0, 1, 2, 3].map((i) => sprout(210 + i * 32, 0)).join("") + rr(200, 2, 140, 8, 3, "earth", { w: "detail" })), box: [-170, -440, 520, 460] });
act("job-chef", G_SERV, "Chef presenting a dish", ["chef", "cook", "job", "work", "restaurant", "kitchen", "food", "cuisine", "profession"], {
  face: "proud", opt: { outfit: "chef", outfitC: "white", acc: ["chefhat", "moustache"] }, pose: { r: [58, -52], pr: [1, 0.3], l: [-50, 40], pl: [-1, 1] }, shadow: [0, 200],
  held: (c) => c.H(1, el(0, 0, 44, 7, "gray", { w: "prop" }) + sm([[-32, -4], [-28, -34], [0, -46], [28, -34], [32, -4]], "gray", { w: "prop", tone: 1 }) + ci(0, -50, 5, "gray", { w: "detail" }) + L.flat("M-22 -26 Q-20 -36 -8 -38", "white", 0.8), 0, -4, 1), box: [-170, -460, 340, 480] });
act("job-baker", G_SERV, "Baker with fresh bread", ["baker", "bread", "bakery", "job", "work", "baguette", "food", "flour", "profession"], {
  face: "happy", opt: { outfit: "act-apron", outfitC: "brown", acc: ["chefhat"] }, pose: { l: [-50, 70], pl: [-1, 1], r: [46, 66], pr: [1, 1] }, shadow: [0, 220],
  held: (c) => c.H(0, [0, 1, 2].map((i) => at(rr(-6, -60, 12, 66, 6, "earth", { w: "detail" }) + ln([[-3, -50], [3, -44]], { c: "gold", w: "hair" }) + ln([[-3, -34], [3, -28]], { c: "gold", w: "hair" }), -14 + i * 14, 0, 1, -14 + i * 14)).join("") + rr(-30, -4, 60, 40, 8, "wood", { w: "prop" }) + ln([[-30, 10], [30, 10]], { c: "earth", w: "hair" }) + ln([[-30, 22], [30, 22]], { c: "earth", w: "hair" }), 0, 10, 1) + c.H(1, sm([[-26, 8], [-26, -14], [-8, -28], [14, -28], [28, -12], [28, 8]], "earth", { w: "prop" }) + ln([[-12, -14], [-2, -4]], { c: "gold", w: "detail" }) + ln([[6, -16], [14, -6]], { c: "gold", w: "detail" }) + puff(20, -40, 5, "white", 0.8) + puff(34, -50, 4, "white", 0.7), 0, -4, 1), box: [-170, -460, 340, 480] });
act("job-barista", G_SERV, "Barista making coffee", ["barista", "coffee", "cafe", "job", "work", "latte", "espresso", "shop", "profession"], {
  face: "smile", opt: { outfit: "act-apron", outfitC: "brown", acc: ["cap"], accC: "brown" }, pose: { r: [34, 104], pr: [1, 1], l: [-30, 100], pl: [-1, 1] }, shadow: [0, 330], wide: true,
  held: (c) => c.H(1, rr(-16, -4, 32, 28, 8, "white", { w: "prop" }) + el(0, -4, 15, 4, "brown", { w: "hair" }) + L.flat("M0 -2 c-6 -5 -9 -1 -4 2 l4 3 l4 -3 c5 -3 2 -7 -4 -2 z", "cream") + steam(-4, -10, 0.7), 0, 0, 1),
  front: (c) => c.W(counterFront(-150, 150, -118, "wood", "sand") + at(rr(-46, -88, 92, 78, 8, "gray", { w: "prop" }) + rr(-36, -82, 72, 22, 4, "ink", { w: "detail" }) + ci(0, -40, 12, "white", { w: "detail" }) + ln([[0, -40], [5, -46]], { w: "hair" }) + rr(-22, -12, 44, 12, 3, "gray", { w: "detail", tone: 2 }) + rr(-42, -102, 84, 16, 6, "gray", { w: "prop", tone: 2 }), -90, -122, 1) + at(rr(-12, -26, 24, 30, 4, "white", { w: "detail" }), 106, -122, 0.9)), box: [-190, -440, 380, 460] });
const chalkboard = (w = 200, h = 150, inner = "") => rr(-w / 2 - 8, -h - 14, w + 16, h + 16, 6, "wood", { w: "prop" }) + fr(-w / 2, -h - 6, w, h, "green") + L.flat(L.rect(-w / 2, -h - 6, w, 14), "white", 0.1) + inner + rr(-w / 2, 0, w, 6, 2, "wood", { w: "detail" }) + ln([[-w / 2 + 14, 2], [-w / 2 + 14, 70]], { c: "wood", w: "prop" }) + ln([[w / 2 - 14, 2], [w / 2 - 14, 70]], { c: "wood", w: "prop" });
const chalkBoardInner = () => L.text("2 + 2 = 4", 0, -96, { size: 36, c: "white" }) + sl([[-60, -48], [-20, -60], [20, -44], [60, -58]], { c: "white", w: "detail", op: 0.8 }) + L.flat(L.star(-48, -134, 7, 3, 5), "yellow") + ci(40, -132, 8, "pink", { w: "hair" });
act("job-teacher", G_PUB, "Teacher at the board", ["teacher", "school", "job", "work", "class", "lesson", "board", "education", "profession"], {
  face: "happy", opt: { outfit: "sweater", outfitC: "purple", acc: ["glasses"] }, pose: { l: [-94, -12], pl: [-1, 0.4], r: [48, 70], pr: [1, 1], ll: [-35, 130], rl: [35, 130] }, demo: { style: "girl01", outfit: "sweater" }, shadow: [-90, 520], wide: true,
  held: (c) => c.H(0, ln([[0, 0], [-72, -22]], { c: "wood", w: "prop" }), 0, 0, 1),
  front: (c) => c.W(at(chalkboard(190, 130, chalkBoardInner()), -280, -64)), box: [-400, -440, 600, 460] });
act("job-student-hand", G_PUB, "Student raising a hand", ["student", "school", "class", "question", "raise hand", "learn", "pupil", "answer", "kid"], {
  face: "excited", opt: { outfit: "student", outfitC: "white", acc: [] }, body: undefined, pose: Object.assign(deskPose(() => [-32, 62], () => [40, -102]), { pr: [1, 0.2] }), shadow: [0, 260], demo: { style: "man01" },
  back: chairAt,
  front: (c) => c.W(deskFront(-100, 100, -108, "wood") + rr(-60, -128, 40, 16, 2, "white", { w: "detail" }) + ln([[10, -112], [50, -126]], { c: "yellow", w: "prop" })), held: (c) => c.at(spark(0, 0, 8, "yellow"), 70, -126), box: [-170, -440, 340, 460] });
const gavelP = () => ln([[0, 0], [0, -40]], { c: "wood", w: "prop" }) + rr(-18, -62, 36, 22, 4, "wood", { w: "prop", tone: 2 });
const scalesP = () => ln([[0, 0], [0, -56]], { c: "gold", w: "prop" }) + ln([[-34, -52], [34, -52]], { c: "gold", w: "prop" }) + [-1, 1].map((sd) => ln([[sd * 34, -52], [sd * 24, -26]], { c: "gold", w: "hair" }) + ln([[sd * 34, -52], [sd * 44, -26]], { c: "gold", w: "hair" }) + el(sd * 34, -24, 16, 4, "gold", { w: "detail" })).join("") + rr(-16, -4, 32, 6, 2, "gold", { w: "detail" });
act("job-judge", G_PUB, "Judge with gavel", ["judge", "court", "law", "job", "work", "justice", "gavel", "trial", "profession"], {
  face: "flat", opt: { outfit: "act-judge", outfitC: "ink", acc: ["act-wig"] }, pose: deskPose(() => [-30, 68], () => [52, -42]), shadow: [0, 380], wide: true,
  back: (c) => c.W(chairBack("red", 130, -240, -92)), held: (c) => c.H(1, gavelP(), 0, 4, 1, 16),
  front: (c) => c.W(deskFront(-170, 170, -112, "wood") + at(scalesP(), -120, -112, 0.8) + rr(60, -126, 60, 14, 4, "wood", { w: "detail", tone: 2 })), box: [-210, -440, 420, 460] });
act("job-lawyer", G_PUB, "Lawyer with briefcase", ["lawyer", "attorney", "law", "job", "work", "briefcase", "court", "legal", "profession"], {
  face: "smug", opt: { outfit: "suit", outfitC: "navy", acc: ["glasses"], hair: "sidepart" }, pose: { r: [60, -86], pr: [1, 0.3], l: [-58, 100], pl: [-1, 1] }, shadow: [0, 240],
  held: (c) => c.H(0, rr(-30, 0, 60, 44, 6, "brown", { w: "prop" }) + tube("M-12 0 Q-12 -14 0 -14 Q12 -14 12 0", "brown", 0.7) + rr(-5, 14, 10, 8, 2, "gold", { w: "hair" }), 0, 4, 1) + c.H(1, ln([[0, 0], [0, -28]], { c: "ink", w: "prop" }) + rr(-12, -62, 24, 38, 3, "white", { w: "detail" }) + ln([[-6, -52], [6, -52]], { c: "gray", w: "hair" }) + ln([[-6, -44], [6, -44]], { c: "gray", w: "hair" }), 0, -6, 1), box: [-170, -440, 340, 460] });
const micNews = () => ci(0, -24, 14, "ink", { w: "prop" }) + rr(-14, -12, 28, 22, 4, "red", { w: "prop" }) + po([[-7, 8], [7, 8], [5, 50], [-5, 50]], "ink", { w: "prop" }) + ln([[-8, -26], [8, -26]], { c: "gray", w: "hair" });
act("job-journalist", G_PUB, "Reporter with microphone", ["journalist", "reporter", "news", "job", "work", "interview", "microphone", "press", "media", "profession"], {
  face: "happy", opt: { outfit: "overcoat", outfitC: "sand", acc: ["act-lanyard"], hair: "bob" }, pose: (g) => ({ r: [g.m[0] + 52, g.m[1] + 38], pr: [1, 0.6], l: [-38, 44], pl: [-1, 1] }), demo: { style: "girl01", outfit: "overcoat" }, shadow: [0, 200],
  held: (c) => c.H(1, micNews(), 0, -6, 1.2, -14) + c.H(0, rr(-18, -22, 36, 44, 4, "white", { w: "prop" }) + [0, 1, 2].map((i) => ln([[-11, -12 + i * 10], [11, -12 + i * 10]], { c: "gray", w: "hair" })).join("") + ln([[16, -22], [22, -34]], { c: "red", w: "detail" }), 0, 0, 1, 8), box: [-170, -440, 340, 460] });
const videoCam = () => rr(-40, -26, 84, 58, 8, "ink", { w: "prop" }) + rr(44, -18, 38, 42, 5, "gray", { w: "prop" }) + ci(82, 3, 17, "ink", { w: "prop" }) + ci(82, 3, 9, "blue", { w: "detail" }) + rr(-36, -40, 40, 16, 4, "gray", { w: "detail" }) + ci(-26, -10, 4, "red", { w: "hair" }) + rr(-52, -12, 14, 28, 3, "gray", { w: "detail" });
act("job-cameraman", G_PUB, "Cameraman with shoulder camera", ["cameraman", "camera operator", "film", "video", "job", "work", "tv", "media", "profession", "crew"], {
  face: "determined", look: 0.9, opt: { outfit: "jacket", outfitC: "gray", acc: ["cap"], accC: "ink" }, pose: { r: [20, -14], pr: [0.6, 1], l: [62, 14], pl: [0.2, 1], ll: [-40, 130], rl: [40, 130] }, shadow: [0, 220],
  held: (c) => c.at(videoCam(), 20, -34, 0.95), box: [-170, -440, 380, 460] });
act("job-news-anchor", G_PUB, "News anchor at the desk", ["news", "anchor", "tv", "presenter", "job", "work", "studio", "broadcast", "media", "profession"], {
  face: "smile", opt: { outfit: "suit", outfitC: "red", hair: "sidepart" }, pose: deskPose(() => [-34, 66], () => [34, 66]), shadow: [0, 420], wide: true, demo: { style: "girl01", outfit: "suit" },
  back: (c) => c.W(rr(-230, -440, 460, 300, 16, "navy", { w: "prop" }) + ci(-110, -290, 70, "blue", { w: "detail" }) + L.flat(L.circ(-110, -290, 50), "sky", 0.4) + sl([[-160, -290], [-110, -330], [-60, -290]], { c: "white", w: "hair", op: 0.7 }) + rr(-20, -330, 230, 14, 4, "red", { w: "detail" }) + rr(-20, -300, 170, 14, 4, "white", { w: "detail" }) + rr(-20, -270, 200, 14, 4, "yellow", { w: "detail" })),
  front: (c) => c.W(rr(-200, -112, 400, 112, 10, "blue", { w: "prop", tone: 2 }) + rr(-210, -126, 420, 20, 8, "white", { w: "prop" }) + L.flat("M-190 -80 Q-90 -100 0 -80 T200 -80 V-60 Q100 -40 0 -60 T-190 -60 Z", "sky", 0.6) + rr(-60, -144, 70, 20, 2, "white", { w: "detail" }) + at(ci(0, -4, 6, "ink", { w: "detail" }) + ln([[0, -4], [0, -26]], { c: "gray", w: "prop" }), 100, -126, 1)), box: [-250, -440, 500, 460] });
act("job-delivery", G_SERV, "Delivery person with a parcel", ["delivery", "courier", "parcel", "package", "job", "work", "post", "shipping", "profession"], {
  face: "happy", opt: { outfit: "jacket", outfitC: "yellow", acc: ["cap"], accC: "red" }, pose: { r: [66, 22], pr: [1, 1], l: [-52, 100], pl: [-1, 1], ll: [-40, 130], rl: [40, 130], xf: { rot: 2, planted: true } }, shadow: [0, 210],
  under: (c) => c.at(rr(-54, -60, 108, 130, 10, "orange", { w: "prop" }) + rr(-40, -44, 80, 20, 4, "orange", { w: "detail", tone: 2 }) + rr(-10, -60, 20, 24, 4, "white", { w: "hair" }), 0, 40, 1),
  held: (c) => c.H(1, boxBrown(60, 44, rr(14, -14, 14, 10, 2, "white", { w: "hair" })), 0, -22, 1, -6), box: [-170, -440, 340, 460] });
act("job-mail-carrier", G_SERV, "Mail carrier with letters", ["mail", "postman", "mail carrier", "letters", "post", "job", "work", "delivery", "mailbox", "profession"], {
  face: "happy", opt: { outfit: "act-mail", outfitC: "blue", acc: ["act-postcap"], accC: "blue" }, pose: { r: [68, 14], pr: [1, 1], l: [-52, 88], pl: [-1, 1], ll: [-40, 130], rl: [40, 130] }, shadow: [40, 360], wide: true,
  held: (c) => ln([c.P(24, -4), c.P(-40, 100)], { c: "brown", w: "prop" }) + c.at(rr(-26, -6, 52, 46, 8, "brown", { w: "prop" }) + rr(-26, -6, 52, 14, 6, "brown", { w: "detail", tone: 2 }) + rr(-14, -22, 20, 20, 2, "white", { w: "hair" }) + rr(-2, -26, 20, 20, 2, "white", { w: "hair" }), -48, 96, 1) + c.H(1, rr(-20, -14, 40, 28, 2, "white", { w: "prop" }) + L.flat("M-20 -14 L0 4 L20 -14", "gray", 0.4) + rr(8, -10, 8, 8, 1, "red", { w: "hair" }), 4, -4, 1.1, -8),
  front: (c) => c.W(ln([[200, 0], [200, -150]], { c: "wood", w: "prop" }) + rr(160, -210, 90, 60, 20, "blue", { w: "prop" }) + rr(166, -178, 76, 12, 2, "ink", { w: "detail", tone: 2 }) + rr(226, -240, 6, 34, 1, "red", { w: "detail" }) + rr(226, -246, 24, 14, 2, "red", { w: "detail" })), box: [-170, -440, 480, 460] });
act("job-bus-driver", G_SERV, "Bus driver at the wheel", ["bus", "driver", "bus driver", "job", "work", "transport", "steering wheel", "road", "profession", "drive"], {
  face: "smile", opt: { outfit: "act-mail", outfitC: "gray", acc: ["act-postcap"], accC: "gray" }, pose: deskPose(() => [-62, 60], () => [62, 60]), shadow: [0, 400], wide: true,
  back: (c) => c.W(rr(-236, -440, 472, 300, 14, "sky", { w: "prop", tone: 1 }) + ln([[0, -440], [0, -140]], { c: "ink", w: "prop" }) + chairBack("gray", 120, -236, -92) + at(rr(-24, -16, 48, 28, 5, "ink", { w: "detail" }) + L.flat(L.rect(-20, -12, 40, 18), "sky", 0.8), 160, -400)),
  front: (c) => c.W(rr(-220, -108, 440, 108, 12, "gray", { w: "prop", tone: 2 }) + rr(-228, -122, 456, 22, 8, "ink", { w: "prop" }) + ln([[0, -110], [0, -130]], { c: "ink", w: "prop" }) + el(0, -134, 92, 34, "ink", { w: "prop", flat: true }).replace(/fill="[^"]*"/, 'fill="none"') + ci(0, -134, 10, "gray", { w: "detail" }) + [-150, 150].map((x) => ci(x, -64, 14, "yellow", { w: "detail" })).join("")), box: [-250, -440, 500, 460] });
const carSide = () => rr(40, -150, 330, 56, 20, "red", { w: "prop" }) + sm([[110, -150], [150, -216], [290, -216], [330, -150]], "red", { w: "prop", tone: 1 }) + sm([[134, -156], [160, -204], [210, -204], [210, -156]], "glass", { w: "detail" }) + sm([[222, -156], [222, -204], [282, -204], [310, -156]], "glass", { w: "detail" }) + ci(344, -120, 6, "yellow", { w: "hair" });
act("job-mechanic", G_SERV, "Mechanic under a car", ["mechanic", "car", "repair", "garage", "job", "work", "engine", "under car", "workshop", "profession"], {
  face: "determined", lying: true, opt: { outfit: "act-coverall", outfitC: "blue", acc: ["cap"], accC: "red", hair: "short" }, pose: { l: [-96, 10], pl: [-1, 0.2], r: [26, 96], pr: [1, 1], xf: { rot: 90, drop: 60 } }, shadow: false, wide: true,
  back: (c) => c.W(ln([[110, -100], [110, 0]], { c: "gray", w: "prop" }) + ln([[300, -100], [300, 0]], { c: "gray", w: "prop" }) + rr(80, -10, 60, 10, 3, "gray", { w: "detail" }) + rr(270, -10, 60, 10, 3, "gray", { w: "detail" }) + carSide() + [90, 310].map((x) => ci(x, -130, 40, "ink", { w: "prop" }) + ci(x, -130, 16, "gray", { w: "detail" })).join("") + el(60, 3, 120, 7, "ink", { w: "hair", flat: true }).replace(/fill="[^"]*"/, 'fill="none"') + rr(-120, -30, 200, 14, 7, "gray", { w: "prop" }) + [-100, 60].map((x) => ci(x, -8, 9, "ink", { w: "detail" })).join("")),
  held: (c) => c.H(0, ln([[0, 0], [0, -34]], { c: "gray", w: "prop" }) + ci(0, -38, 9, "gray", { w: "prop" }) + ci(0, -38, 4, "white", { w: "hair" }), 0, 0, 1, -90), box: [-200, -300, 600, 320] });
const bulb = () => fc(0, -26, 44, "yellow", 0.22) + sm([[-6, 4], [-18, -16], [-20, -40], [-8, -56], [8, -56], [20, -40], [18, -16], [6, 4]], "yellow", { w: "prop" }) + rr(-9, 4, 18, 14, 3, "gray", { w: "detail" }) + rr(-7, 18, 14, 6, 2, "gray", { w: "detail", tone: 2 }) + sl([[-6, -34], [0, -26], [6, -34]], { c: "orange", w: "hair" });
act("job-electrician", G_SERV, "Electrician with a light bulb", ["electrician", "electric", "job", "work", "light bulb", "wires", "repair", "power", "profession"], {
  face: "proud", opt: { outfit: "act-coverall", outfitC: "orange", acc: ["hardhat", "act-toolbelt"], accC: "white" }, pose: { r: [60, -44], pr: [1, 0.2], l: [-52, 70], pl: [-1, 1] }, shadow: [0, 200],
  held: (c) => c.H(1, bulb(), 0, -14, 1.05) + c.H(0, ln([[0, 0], [0, -26]], { c: "blue", w: "prop" }) + rr(-5, -4, 10, 18, 3, "yellow", { w: "detail" }), 0, 0, 1, 12) + c.at(ci(0, 0, 26, "ink", { w: "prop", flat: true }).replace(/fill="[^"]*"/, 'fill="none"') + sl([[-22, -6], [0, -14], [22, -6]], { c: "blue", w: "prop" }) + sl([[-22, 4], [0, -4], [22, 4]], { c: "yellow", w: "prop" }) + sl([[-22, 14], [0, 6], [22, 14]], { c: "red", w: "prop" }), -34, -12, 0.9, -20), box: [-170, -440, 340, 460] });
act("job-plumber", G_SERV, "Plumber with a pipe wrench", ["plumber", "pipe", "wrench", "leak", "job", "work", "repair", "bathroom", "water", "profession"], {
  face: "smile", opt: { outfit: "act-coverall", outfitC: "blue", acc: ["cap", "moustache"], accC: "red" }, pose: { r: [72, 66], pr: [1, 1], l: [-48, 90], pl: [-1, 1] }, shadow: [60, 340], wide: true,
  held: (c) => c.H(1, ln([[0, 0], [26, -60]], { c: "red", w: "prop" }) + at(sm([[-14, -6], [14, -6], [18, -24], [-18, -24]], "red", { w: "detail" }), 28, -64, 1, 24), 0, 0, 1),
  front: (c) => c.W(rr(150, -170, 26, 170, 4, "gray", { w: "prop" }) + rr(100, -196, 76, 26, 4, "gray", { w: "prop" }) + rr(142, -184, 42, 44, 3, "gray", { w: "detail", tone: 2 }) + drop(106, -164, 0.9) + drop(106, -120, 0.8) + drop(108, -80, 0.7) + at(po([[-26, 0], [-20, -46], [20, -46], [26, 0]], "blue", { w: "prop" }) + el(0, -46, 20, 5, "water", { w: "detail" }), 108, 0, 1)), box: [-170, -440, 400, 460] });
act("job-sculptor", G_PUB, "Artist sculpting a bust", ["artist", "sculptor", "sculpture", "clay", "art", "job", "work", "creative", "studio", "profession"], {
  face: "act-bliss", opt: { outfit: "act-apron", outfitC: "brown", acc: ["act-beret"], accC: "purple" }, pose: { r: [86, 8], pr: [0.6, 1], l: [-40, 80], pl: [-1, 1] }, demo: { style: "girl01" }, shadow: [60, 330], wide: true,
  held: (c) => c.H(1, ln([[0, 0], [20, -10]], { c: "gray", w: "prop" }) + ci(22, -11, 4, "gray", { w: "hair" }), 0, 0, 1),
  front: (c) => c.W(rr(112, -150, 70, 150, 4, "stone", { w: "prop" }) + rr(104, -164, 86, 16, 4, "stone", { w: "prop", tone: 1 }) + sm([[120, -172], [114, -216], [130, -252], [158, -262], [180, -240], [182, -200], [168, -172]], "earth", { w: "prop" }) + ln([[146, -222], [146, -204]], { c: "earth", w: "detail" }) + L.flat("M122 -226 Q126 -244 138 -250", "white", 0.5) + at(ln([[0, 0], [0, -22]], { c: "wood", w: "prop" }), 220, 0, 1)), box: [-170, -440, 400, 460] });
const blueprint = () => rr(-84, -58, 168, 116, 4, "blue", { w: "prop" }) + L.stroke("M-60 -34 H-8 V6 H-60 Z M-8 -34 H44 V20 H-8 M-40 6 V30 H-20 V6 M16 -34 V-10 M30 -34 V-10", { c: "white", w: "hair" }) + L.stroke("M-60 36 H60 M-60 42 H20", { c: "white", w: "hair", op: 0.7 }) + L.stroke(L.arc(-40, 30, 12, 270, 360), { c: "white", w: "hair" });
act("job-architect", G_PUB, "Architect with plans", ["architect", "plans", "blueprint", "design", "job", "work", "building", "drawing", "profession"], {
  face: "proud", opt: { outfit: "sweater", outfitC: "gray", acc: ["glasses"], hair: "side" }, pose: { l: [-62, 40], pl: [-1, 1], r: [62, 40], pr: [1, 1], ll: [-35, 130], rl: [35, 130] }, shadow: [0, 200],
  held: (c) => c.at(blueprint(), 0, 46, 1), under: (c) => ln([[c.hd[0] + c.R * 0.96, c.hd[1] - 4 * c.s], [c.hd[0] + c.R * 1.5, c.hd[1] - 26 * c.s]], { c: "yellow", w: "prop" }), box: [-170, -440, 340, 460] });
const cog = (x, y, r, c = "gray") => at(L.shape(L.poly(Array.from({ length: 16 }, (_, i) => { const a = (i * 22.5) * D, k = i % 2 ? r * 0.84 : r; return [Math.cos(a) * k, Math.sin(a) * k]; }), true), c, { w: "detail" }) + ci(0, 0, r * 0.35, "white", { w: "hair" }), x, y);
act("job-engineer", G_PUB, "Engineer with laptop", ["engineer", "engineering", "laptop", "job", "work", "tech", "hard hat", "gears", "profession"], {
  face: "smile", opt: { outfit: "builder", outfitC: "gray", acc: ["hardhat", "glasses"], accC: "white" }, pose: { l: [-44, 56], pl: [-1, 1], r: [46, 76], pr: [1, 1], ll: [-35, 130], rl: [35, 130] }, shadow: [0, 250], wide: true,
  held: (c) => c.at(rr(-56, -78, 112, 76, 6, "ink", { w: "prop" }) + fr(-50, -72, 100, 64, "navy") + sl([[-40, -26], [-24, -40], [-8, -30], [10, -52], [34, -44]], { c: "green", w: "detail" }) + rr(-50, -8, 100, 6, 2, "gray", { w: "detail" }) + rr(-62, -2, 124, 8, 3, "gray", { w: "detail", tone: 2 }), 0, 62, 1),
  back: (c) => c.W(cog(-110, -330, 28, "gray") + cog(-76, -370, 18, "orange") + cog(130, -350, 24, "teal")), box: [-190, -440, 380, 460] });
act("job-banker", G_PUB, "Banker counting coins", ["banker", "bank", "money", "coins", "finance", "job", "work", "counting", "cash", "profession"], {
  face: "smug", opt: { outfit: "suit", outfitC: "gray", acc: ["glasses"], hair: "sidepart" }, pose: { r: [40, 28], pr: [1, 1], l: [-40, 90], pl: [-1, 1] }, shadow: [0, 340], wide: true,
  held: (c) => c.H(1, ci(0, -4, 14, "gold", { w: "prop" }) + ci(0, -4, 8, "gold", { w: "detail", tone: 2 }) + L.flat(L.star(-4, -8, 4, 2, 4), "white", 0.7), 0, -12, 1.1),
  front: (c) => c.W(counterFront(-160, 160, -118, "navy", "wood") + [[-110, 4], [-86, 3], [-60, 5]].map(([x, n]) => Array.from({ length: n * 2 }, (_, i) => el(x, -126 - i * 7, 15, 5, "gold", { w: "hair" })).join("")).join("") + at(sm([[-22, 0], [-26, -40], [-8, -62], [-14, -74], [14, -74], [8, -62], [26, -40], [22, 0]], "brown", { w: "prop" }) + L.text("$", 0, -22, { size: 34, c: "gold" }), 100, -122, 0.9) + rr(30, -140, 36, 16, 2, "green", { w: "detail" }) + rr(24, -150, 36, 16, 2, "green", { w: "detail", tone: 2 })), box: [-190, -440, 380, 460] });
act("job-cashier", G_SERV, "Cashier at the till", ["cashier", "checkout", "till", "shop", "supermarket", "job", "work", "retail", "scan", "profession"], {
  face: "smile", opt: { outfit: "act-apron", outfitC: "red", acc: ["act-badge"], accC: "white" }, pose: { r: [42, 94], pr: [1, 1], l: [-34, 100], pl: [-1, 1] }, shadow: [0, 380], wide: true,
  held: (c) => c.H(1, rr(-12, -34, 24, 44, 4, "red", { w: "prop" }) + rr(-12, -20, 24, 12, 0, "white", { w: "hair", flat: true }), 0, -6, 1),
  front: (c) => c.W(counterFront(-180, 180, -118, "wood", "gray") + at(rr(-34, -62, 68, 50, 7, "gray", { w: "prop" }) + rr(-26, -56, 52, 24, 3, "ink", { w: "detail" }) + L.flat(L.rect(-22, -52, 44, 16), "green", 0.8) + rr(-40, -12, 80, 12, 3, "gray", { w: "detail", tone: 2 }) + [0, 1, 2].map((i) => ci(-14 + i * 14, -24, 3, "white", { w: "hair" })).join(""), -100, -122, 1) + at(rr(-12, -34, 24, 34, 5, "white", { w: "prop" }) + rr(-12, -34, 24, 10, 4, "blue", { w: "detail" }), 100, -122, 1) + at(rr(-30, -14, 60, 14, 6, "earth", { w: "prop" }), 150, -122, 1, -8)), box: [-210, -440, 420, 460] });
const bookShelf = () => rr(-110, -300, 220, 300, 6, "wood", { w: "prop" }) + [0, 1, 2].map((r) => rr(-102, -292 + r * 98, 204, 6, 2, "wood", { w: "detail", tone: 2 }) + [...Array(9)].map((_, i) => rr(-100 + i * 22, -290 + r * 98 + 8 - ((i * 7 + r * 3) % 4) * 4, 17, 82 - ((i * 7 + r * 3) % 4) * -4 + 0, 2, ["red", "blue", "green", "orange", "purple", "teal", "yellow", "pink", "navy"][(i + r * 2) % 9], { w: "hair" })).join("")).join("");
act("job-librarian", G_PUB, "Librarian saying shh", ["librarian", "library", "books", "quiet", "shh", "job", "work", "reading", "profession"], {
  face: "act-calm", opt: { outfit: "sweater", outfitC: "teal", acc: ["glasses"], hair: "bun" }, pose: (g) => ({ l: [g.m[0] - 12, g.m[1] + 12], pl: [-1, 0.8], r: [50, 52], pr: [1, 1], ll: [-35, 130], rl: [35, 130] }), demo: { style: "girl01", outfit: "sweater" }, shadow: [-30, 320], wide: true,
  back: (c) => c.W(at(bookShelf(), -150, 0, 1)), held: (c) => c.H(1, rr(-18, -24, 36, 48, 3, "red", { w: "prop" }) + rr(-14, -20, 28, 40, 1, "cream", { w: "hair", flat: true }) + rr(-18, -24, 8, 48, 2, "red", { w: "detail", tone: 2 }), 0, 0, 1, -8) + c.H(0, ln([[0, -2], [0, -14]], { c: "ink", w: "hair" }), 0, 0, 1), box: [-290, -440, 480, 460] });
act("job-magician", G_ROLE, "Magician with hat and wand", ["magician", "magic", "wand", "trick", "rabbit", "show", "performer", "hat", "stage", "job"], {
  face: "wink", opt: { outfit: "act-magician", outfitC: "ink", acc: ["tophat", "bowtie"], accC: "red" }, pose: { r: [66, -48], pr: [1, 0.3], l: [-54, 76], pl: [-1, 1] }, shadow: [60, 360], wide: true,
  held: (c) => c.H(1, ln([[0, 0], [28, -34]], { c: "ink", w: "prop" }) + ln([[22, -27], [28, -34]], { c: "white", w: "prop" }), 0, 0, 1) + c.H(1, spark(0, 0, 12, "yellow") + spark(24, -18, 8, "pink") + spark(-10, -24, 6, "sky"), 40, -44, 1),
  front: (c) => c.W(rr(124, -110, 100, 14, 5, "red", { w: "prop" }) + ln([[140, -96], [136, 0]], { c: "wood", w: "prop" }) + ln([[208, -96], [212, 0]], { c: "wood", w: "prop" }) + at(sm([[-30, -2], [-30, -12], [-24, -52], [24, -52], [30, -12], [30, -2]], "ink", { w: "prop" }) + el(0, -52, 24, 6, "ink", { w: "detail", tone: 2 }) + rr(-28, -16, 56, 12, 0, "red", { w: "detail" }), 174, -112, 1) + [-1, 1].map((sd) => sm([[174 + sd * 6, -150], [174 + sd * 14, -202], [174 + sd * 26, -204], [174 + sd * 20, -150]], "white", { w: "detail" }) + L.flat(`M${174 + sd * 14} -160 L${174 + sd * 19} -196 L${174 + sd * 23} -160 Z`, "pink", 0.8)).join("") + spark(150, -230, 8, "yellow") + spark(214, -220, 6, "pink")), box: [-190, -440, 440, 460] });
const balloon = (x, y, c, k = 1) => at(sm([[0, -26], [18, -16], [20, 6], [8, 24], [0, 28], [-8, 24], [-20, 6], [-18, -16]], c, { w: "prop" }) + po([[0, 28], [-5, 36], [5, 36]], c, { w: "hair" }) + L.flat("M-10 -14 Q-14 -2 -10 6", "white", 0.6), x, y, k);
act("job-clown", G_ROLE, "Friendly clown with balloons", ["clown", "circus", "party", "balloons", "funny", "entertainer", "birthday", "performer", "job"], {
  face: "laugh", opt: { outfit: "act-clown", outfitC: "red", acc: ["act-clownnose"], hair: "afro", hairC: "orange" }, pose: { r: [70, -20], pr: [1, 0.6], l: [-50, 60], pl: [-1, 1], ll: [-40, 130], rl: [40, 130] }, shadow: [0, 220],
  held: (c) => c.H(1, [[-30, -90, "red"], [4, -118, "blue"], [34, -86, "yellow"]].map(([x, y, cc]) => ln([[0, 0], [x * 0.9, y + 30]], { c: "gray", w: "hair" }) + balloon(x, y, cc, 1.3)).join(""), 0, 0, 1),
  front: (c) => c.W([-1, 1].map((sd) => el(sd * 34, -8, 34, 14, "orange", { w: "prop" })).join("")), box: [-170, -520, 360, 540] });
const throne = (c1 = "red") => rr(-70, -330, 140, 330, 14, "gold", { w: "prop" }) + rr(-54, -300, 108, 190, 10, c1, { w: "detail" }) + ci(0, -340, 14, "gold", { w: "prop" }) + rr(-76, -120, 152, 50, 8, c1, { w: "prop", tone: 2 }) + rr(-84, -80, 168, 80, 8, "gold", { w: "prop", tone: 2 }) + [-1, 1].map((sd) => ci(sd * 70, -330, 10, "gold", { w: "detail" })).join("");
act("job-king", G_ROLE, "King with scepter", ["king", "royal", "crown", "monarch", "throne", "medieval", "ruler", "scepter", "fairy tale"], {
  face: "proud", opt: { outfit: "king", outfitC: "red", acc: ["crown", "beard"] }, pose: { r: [70, 40], pr: [1, 1], l: [-48, 100], pl: [-1, 1] }, shadow: [0, 260], wide: true,
  back: (c) => c.W(throne("blue")), held: (c) => c.H(1, ln([[0, 30], [0, -80]], { c: "gold", w: "prop" }) + ci(0, -90, 14, "gold", { w: "prop" }) + ci(0, -90, 7, "red", { w: "detail" }), 0, 0, 1), box: [-190, -440, 380, 460] });
act("job-queen", G_ROLE, "Queen waving", ["queen", "royal", "crown", "monarch", "throne", "medieval", "ruler", "princess", "fairy tale"], {
  face: "happy", opt: { outfit: "queen", outfitC: "purple", acc: ["crown"], hair: "long", hairC: "gold" }, pose: { r: [60, -56], pr: [1, 0.3], l: [-48, 96], pl: [-1, 1] }, demo: { style: "girl01" }, shadow: [0, 280], wide: true,
  back: (c) => c.W(throne("pink")), held: (c) => c.at(spark(0, 0, 8, "yellow"), 94, -112), box: [-190, -440, 380, 460] });
const shield = () => sm([[-34, -40], [34, -40], [34, 0], [20, 36], [0, 52], [-20, 36], [-34, 0]], "white", { w: "prop" }) + L.flat(L.poly([[-30, -36], [30, -36], [30, 0], [0, 0]], true), "blue") + L.flat(L.poly([[-30, 0], [0, 0], [-16, 34]], true), "blue") + L.flat("M-5 -30 h10 v18 h14 v10 h-14 v22 h-10 v-22 h-14 v-10 h14 z", "red");
act("job-knight", G_ROLE, "Knight with sword and shield", ["knight", "armour", "sword", "shield", "medieval", "castle", "hero", "fairy tale", "warrior"], {
  face: "determined", opt: { outfit: "knight", outfitC: "gray", acc: ["knighthelm"], accC: "gray" }, pose: { r: [66, -12], pr: [1, 0.8], l: [-54, 40], pl: [-1, 1], ll: [-44, 130], rl: [44, 130] }, shadow: [0, 220],
  held: (c) => c.H(1, ln([[0, 18], [0, -120]], { c: "gray", w: "prop" }) + L.flat("M-2 -110 V-6", "white", 0.7) + rr(-20, 0, 40, 10, 4, "gold", { w: "prop" }) + rr(-5, 10, 10, 18, 3, "brown", { w: "detail" }), 0, 0, 1) + c.H(0, shield(), -10, 6, 1, -6), box: [-170, -460, 340, 480] });
const parrot = () => sm([[0, -26], [14, -16], [16, 8], [4, 26], [-8, 8], [-10, -14]], "red", { w: "prop" }) + po([[10, -22], [30, -16], [12, -12]], "yellow", { w: "detail" }) + ci(4, -18, 3, "white", { w: "hair" }) + ci(5, -18, 1.4, "ink", { w: "hair" }) + sm([[-6, -2], [-24, 8], [-14, 24], [0, 10]], "blue", { w: "detail" }) + sm([[-2, 22], [-8, 44], [4, 40], [6, 24]], "green", { w: "hair" });
act("job-pirate", G_ROLE, "Pirate with cutlass and parrot", ["pirate", "cutlass", "parrot", "treasure", "sea", "ship", "adventure", "fairy tale", "captain"], {
  face: "smug", opt: { outfit: "pirate", outfitC: "white", acc: ["piratehat", "eyepatch", "beard"], hairC: "ink" }, pose: { r: [72, -68], pr: [1, 0.3], l: [-48, 96], pl: [-1, 1], ll: [-44, 130], rl: [44, 130] }, shadow: [30, 320], wide: true,
  held: (c) => c.H(1, ln([[0, 10], [18, -70]], { c: "gray", w: "prop" }) + rr(-10, 6, 20, 8, 3, "gold", { w: "detail" }), 0, 0, 1, 14) + c.at(parrot(), -48, -14, 0.8),
  front: (c) => c.W(rr(110, -64, 90, 64, 8, "wood", { w: "prop" }) + sm([[110, -64], [114, -92], [196, -92], [200, -64]], "wood", { w: "prop", tone: 1 }) + rr(100, -60, 8, 14, 2, "gold", { w: "hair" }) + rr(188, -60, 8, 14, 2, "gold", { w: "hair" }) + rr(144, -72, 18, 14, 3, "gold", { w: "detail" }) + [[120, -96], [136, -100], [150, -98], [176, -96]].map(([x, y]) => ci(x, y, 7, "gold", { w: "hair" })).join("")), box: [-170, -460, 400, 480] });
act("job-wizard", G_ROLE, "Wizard with staff", ["wizard", "magic", "staff", "spell", "fantasy", "sorcerer", "fairy tale", "hat", "beard"], {
  face: "wink", opt: { outfit: "wizard", outfitC: "purple", acc: ["wizardhat", "beard"], hairC: "white" }, pose: { r: [66, 30], pr: [1, 1], l: [-76, -42], pl: [-1, 0.3] }, shadow: [30, 230],
  held: (c) => ln([[c.hands[1][0], 0], [c.hands[1][0], -520 * c.u]], { c: "wood", w: "prop" }) + c.W(fc(0, 0, 1, "ink", 0)) + ci(c.hands[1][0], -520 * c.u, 18 * c.u, "sky", { w: "prop" }) + L.flat(L.circ(c.hands[1][0] + 4, -528 * c.u, 6 * c.u), "white", 0.8) + spark(c.hands[1][0] + 30, -560 * c.u, 9, "yellow") + c.H(0, spark(0, 0, 12, "yellow") + spark(-26, 12, 8, "pink") + spark(20, -20, 7, "sky"), -8, -12, 1), box: [-190, -620, 380, 640] });
act("job-caveman", G_ROLE, "Caveman with club", ["caveman", "stone age", "prehistoric", "club", "primitive", "cave", "history", "ancient", "neanderthal"], {
  face: "angry", opt: { outfit: "caveman", outfitC: "orange", acc: ["beard"], hair: "messy", hairC: "ink", armC: "s2" }, pose: { r: [62, -30], pr: [1, 0.5], l: [-48, 96], pl: [-1, 1], ll: [-44, 130], rl: [44, 130] }, shadow: [10, 220],
  held: (c) => c.H(1, sm([[-8, 20], [-6, -50], [-22, -60], [-24, -92], [-4, -108], [18, -100], [24, -72], [10, -52], [8, 20]], "wood", { w: "prop" }) + ci(-8, -84, 3, "brown", { w: "hair" }), 4, 4, 1, 20) + c.H(0, sm([[-16, -6], [-8, -14], [8, -14], [18, -6], [8, 0], [14, 10], [-14, 10], [-8, 0]], "white", { w: "prop" }), 0, 6, 1, -10), box: [-170, -440, 340, 460] });
act("job-ninja", G_ROLE, "Ninja in a stance", ["ninja", "martial arts", "stealth", "warrior", "japan", "karate", "fighter", "fantasy", "black"], {
  face: "determined", opt: { outfit: "act-ninja", outfitC: "ink", acc: ["act-ninjahood"] }, pose: { l: [-98, -6], pl: [-1, 0.4], r: [86, -30], pr: [1, 0.4], ll: [-70, 100], kl: [-1, 0.2], rl: [64, 100], kr: [1, 0.2], xf: { drop: 30, rot: -4, planted: true } }, shadow: [0, 240],
  under: (c) => ln([[c.P(34, -70)[0], c.P(34, -70)[1]], [c.P(-44, 120)[0], c.P(-44, 120)[1]]], { c: "gray", w: "prop" }) + rr(c.P(-52, 114)[0] - 6 * c.s, c.P(-52, 114)[1] - 6 * c.s, 14 * c.s, 14 * c.s, 3, "red", { w: "detail" }),
  held: (c) => c.at(L.flat(L.star(0, 0, 12, 4, 4, -45), "gray"), 150, -46, 1, 14), box: [-210, -440, 420, 460] });

// =================================================================== FEELINGS IN CONTEXT ===================================================================
const G_FEEL = "Feelings in context";
const paperStack = (x, y, n, k = 1) => at(Array.from({ length: n }, (_, i) => rr(-26 + ((i * 7) % 5) - 2, -i * 9 - 9, 52, 9, 1, "white", { w: "hair" }) + ln([[-18 + (i % 3) * 3, -i * 9 - 4], [10, -i * 9 - 4]], { c: "gray", w: "hair", op: 0.6 })).join(""), x, y, k);
const flyPaper = (x, y, r) => at(rr(-14, -18, 28, 36, 1, "white", { w: "hair" }) + ln([[-8, -8], [8, -8]], { c: "gray", w: "hair" }) + ln([[-8, 0], [8, 0]], { c: "gray", w: "hair" }) + ln([[-8, 8], [2, 8]], { c: "gray", w: "hair" }), x, y, 1, r);
act("feel-stressed-desk", G_FEEL, "Stressed at a desk with paper piles", ["stressed", "overwhelmed", "work", "deadline", "office", "burnout", "paperwork", "anxious", "busy"], {
  face: "nervous", opt: { outfit: "office", outfitC: "white", hair: "messy" }, pose: (g) => Object.assign(deskPose(() => [0, 0], () => [0, 0]), { l: [g.hd[0] - 56, g.hd[1] + 14], r: [g.hd[0] + 56, g.hd[1] + 14], pl: [-1, -0.2], pr: [1, -0.2] }), shadow: [0, 420], wide: true,
  back: (c) => c.W(chairBack("gray", 104, -236, -92) + flyPaper(-130, -330, -18) + flyPaper(140, -360, 14) + flyPaper(-190, -250, 30) + flyPaper(200, -270, -24) + at(ci(0, 0, 24, "white", { w: "prop" }) + ln([[0, 0], [0, -14]], { w: "detail" }) + ln([[0, 0], [10, 6]], { w: "detail" }), 200, -420)),
  held: (c) => c.at(drop(0, 0, 1), 64, c.g.hd[1] - 20) + c.at(drop(0, 0, 0.8), -66, c.g.hd[1] - 4) + c.at(sl([[0, 0], [8, -8], [0, -16], [8, -24]], { c: "gray", w: "detail" }), -60, c.g.top[1] - 16),
  front: (c) => c.W(deskFront(-190, 190, DESKTOP, "wood") + paperStack(-150, DESKTOP, 11) + paperStack(-100, DESKTOP, 6) + paperStack(140, DESKTOP, 13) + paperStack(100, DESKTOP, 7) + at(mug("white"), 60, DESKTOP - 20, 0.8) + at(mug("white"), -50, DESKTOP - 20, 0.8) + rr(-30, DESKTOP - 6, 60, 6, 2, "white", { w: "hair" })), box: [-260, -450, 520, 470] });
const confettiBits = () => { const r = L.rng(5), cols = ["red", "blue", "yellow", "green", "pink", "orange", "purple", "teal"]; let o = ""; for (let i = 0; i < 46; i++) { const x = -190 + r() * 380, y = -470 + r() * 360, a = r() * 180, c2 = cols[i % 8]; o += i % 3 ? at(L.flat(L.rect(-6, -3, 12, 6), c2), x, y, 1, a) : L.flat(L.circ(x, y, 4.5), c2); if (i % 9 === 0) o += sl([[x, y], [x + 16, y + 14], [x, y + 28], [x + 16, y + 42]], { c: c2, w: "detail" }); } return o; };
act("feel-celebrate", G_FEEL, "Celebrating with confetti", ["celebrate", "party", "confetti", "happy", "birthday", "win", "cheer", "joy", "success", "congratulations"], {
  face: "excited", opt: { outfit: "tee", outfitC: "pink", acc: ["partyhat"] }, pose: { l: [-60, -106], pl: [-1, 0.3], r: [60, -106], pr: [1, 0.3], ll: [-36, 118], rl: [36, 118], xf: { dy: -22 } }, demo: { style: "girl01", outfit: "tee" }, shadow: [0, 120],
  back: (c) => c.W(confettiBits()), box: [-200, -520, 400, 540] });
const trophy = () => sm([[-30, -64], [30, -64], [26, -24], [10, -6], [10, 10], [24, 14], [24, 28], [-24, 28], [-24, 14], [-10, 10], [-10, -6], [-26, -24]], "gold", { w: "prop" }) + tube("M-30 -54 Q-52 -52 -46 -34 Q-42 -22 -26 -26", "gold", 0.8) + tube("M30 -54 Q52 -52 46 -34 Q42 -22 26 -26", "gold", 0.8) + L.flat("M-20 -54 Q-22 -34 -14 -22", "white", 0.6) + L.flat(L.star(0, -42, 9, 4, 5), "yellow");
act("feel-win-trophy", G_FEEL, "Winning a trophy", ["win", "winner", "trophy", "champion", "success", "victory", "award", "first place", "proud", "celebrate"], {
  face: "happy", opt: { outfit: "athlete", outfitC: "blue", acc: ["medal"] }, pose: { l: [-40, -92], pl: [-1, 0.3], r: [40, -92], pr: [1, 0.3], ll: [-44, 126], rl: [44, 126] }, shadow: [0, 260],
  held: (c) => c.at(trophy(), 0, -112, 1.5) + c.at(spark(0, 0, 10, "yellow") + spark(34, -20, 7, "pink"), 84, -150) + c.at(spark(0, 0, 9, "sky") + spark(-30, -22, 6, "yellow"), -84, -140),
  front: (c) => c.W(), box: [-200, -500, 400, 520] });
act("feel-trip", G_FEEL, "Tripping over a stone", ["trip", "stumble", "fall", "oops", "accident", "funny", "clumsy", "slip", "surprise"], {
  face: "shocked", opt: { outfit: "tee", outfitC: "teal", hair: "spiky" }, pose: { l: [-96, -46], pl: [-1, 0.3], r: [100, -60], pr: [1, 0.3], ll: [-70, 90], kl: [-1, 0.3], rl: [30, 128], kr: [1, 0.3], xf: { rot: 24, dy: -10, planted: [false, true] } }, shadow: [30, 190], wide: true,
  held: () => "", front: (c) => c.W(sm([[40, 0], [48, -22], [74, -30], [96, -14], [92, 0]], "stone", { w: "prop" }) + L.flat("M52 -14 Q60 -22 72 -22", "white", 0.5) + speed(-70, -330, 3, 70, 30, "gray") + [[130, -150, "orange"], [-130, -240, "yellow"]].map(([x, y, cc]) => ci(x, y, 9, cc, { w: "detail" })).join("") + sl([[110, -120], [120, -134], [128, -144]], { c: "gray", w: "hair", dash: "4 6" })), box: [-230, -440, 480, 460] });
act("feel-wait-bus-stop", G_FEEL, "Waiting at a bus stop", ["wait", "waiting", "bus stop", "bored", "late", "commute", "transport", "patience", "checking watch"], {
  face: "bored", opt: { outfit: "jacket", outfitC: "green", acc: ["watch"], accC: "red" }, pose: { r: [34, 20], pr: [1, 1], l: [-50, 98], pl: [-1, 1], ll: [-38, 130], rl: [38, 130] }, shadow: [30, 360], wide: true,
  back: (c) => c.W(rr(-200, -80, 120, 14, 5, "wood", { w: "prop" }) + ln([[-190, -66], [-190, 0]], { c: "gray", w: "prop" }) + ln([[-90, -66], [-90, 0]], { c: "gray", w: "prop" })),
  front: (c) => c.W(ln([[170, 0], [170, -330]], { c: "gray", w: "prop" }) + rr(120, -400, 100, 80, 10, "blue", { w: "prop" }) + rr(136, -380, 68, 34, 8, "yellow", { w: "detail" }) + ci(150, -342, 6, "ink", { w: "hair" }) + ci(190, -342, 6, "ink", { w: "hair" }) + rr(136, -384, 68, 6, 0, "ink", { w: "hair" }) + ln([[130, -330], [210, -330]], { c: "white", w: "detail" })), box: [-230, -440, 480, 460] });
act("feel-sweating-sun", G_FEEL, "Sweating in the hot sun", ["hot", "heat", "sweat", "summer", "sun", "sweating", "warm", "weather", "thirsty", "heatwave"], {
  face: "act-hot", opt: { outfit: "hawaiian", outfitC: "orange", acc: ["sunglasses"] }, pose: { r: [58, -34], pr: [1, 0.4], l: [-48, 96], pl: [-1, 1], ll: [-38, 130], rl: [38, 130] }, shadow: [0, 200],
  held: (c) => c.at(drop(0, 0, 1), 62, c.g.hd[1] + 6) + c.at(drop(0, 0, 0.8), -62, c.g.hd[1] - 6) + c.at(drop(0, 0, 0.7), 70, c.g.hd[1] + 40) + c.H(1, ln([[0, 0], [14, -18]], { c: "wood", w: "prop" }) + sm([[8, -22], [34, -52], [56, -32], [30, -6]], "pink", { w: "prop" }), 0, 0, 1),
  back: (c) => c.W(at(fc(0, 0, 90, "yellow", 0.25) + ci(0, 0, 50, "yellow", { w: "prop" }) + Array.from({ length: 12 }, (_, i) => ln([[Math.cos(i * 30 * D) * 62, Math.sin(i * 30 * D) * 62], [Math.cos(i * 30 * D) * 88, Math.sin(i * 30 * D) * 88]], { c: "orange", w: "prop" })).join("") + sl([[-14, 6], [0, 16], [14, 6]], { c: "ink", w: "detail" }) + ci(-14, -8, 3, "ink", { w: "hair" }) + ci(14, -8, 3, "ink", { w: "hair" }), -150, -420, 0.9) + [[-60, -20], [0, -34], [60, -20]].map(([x, y]) => sl([[x, y], [x + 8, y - 20], [x - 8, y - 40], [x, y - 60]], { c: "orange", w: "hair", op: 0.5 })).join("")), box: [-260, -520, 440, 540] });
const snow = (x, y, r) => [0, 1, 2].map((i) => ln([[x + cos(i * 60) * r, y + sin(i * 60) * r], [x - cos(i * 60) * r, y - sin(i * 60) * r]], { c: "sky", w: "detail" })).join("");
act("feel-shivering-cold", G_FEEL, "Shivering in the cold", ["cold", "freezing", "winter", "shiver", "snow", "chilly", "brr", "weather", "scarf"], {
  face: "act-shiver", opt: { outfit: "overcoat", outfitC: "blue", acc: ["beanie", "scarf"], accC: "red" }, pose: { l: [30, 30], pl: [0, 1], r: [-30, 30], pr: [0, 1], ll: [-26, 130], rl: [26, 130] }, shadow: [0, 170],
  held: (c) => [-1, 1].map((sd) => sl([[sd * 66, -190], [sd * 76, -170], [sd * 66, -150], [sd * 76, -130]], { c: "sky", w: "detail" })).join("") + c.at(sl([[0, 0], [10, -6], [20, 2], [30, -4]], { c: "white", w: "prop", op: 0.9 }) + puff(36, -8, 6, "white", 0.8), 34, c.g.m[1] - 4),
  back: (c) => c.W([[-120, -380], [130, -330], [-150, -240], [160, -450], [-60, -460], [100, -200]].map(([x, y]) => snow(x, y, 12)).join("") + rr(-150, -6, 300, 10, 5, "snow", { w: "prop" })), box: [-200, -480, 400, 500] });
act("feel-sneeze", G_FEEL, "Sneezing into a tissue", ["sneeze", "cold", "flu", "allergy", "tissue", "sick", "achoo", "hay fever", "health"], {
  face: "act-sneeze", opt: { outfit: "sweater", outfitC: "gray", acc: ["scarf"], accC: "orange" }, pose: (g) => ({ r: [g.m[0] + 18, g.m[1] - 2], pr: [1, 0.6], l: [-38, 44], pl: [-1, 1], ll: [-35, 130], rl: [35, 130], xf: { rot: 6, planted: true } }),
  held: (c) => c.H(1, sm([[-14, -10], [-6, -22], [8, -18], [16, -4], [10, 10], [-8, 12]], "white", { w: "prop" }) + ln([[-6, -8], [6, 2]], { c: "gray", w: "hair" }), 0, 0, 1) + c.H(0, rr(-18, -22, 36, 36, 4, "sky", { w: "prop" }) + sm([[-6, -22], [-2, -40], [8, -34], [6, -22]], "white", { w: "hair" }), 0, 4, 1) + [[40, -4], [54, 8], [48, 22], [64, -10], [34, 14]].map(([x, y]) => ci(c.hands[1][0] + x * c.s, c.hands[1][1] + y * c.s, 2.4 * c.s, "sky", { w: "hair" })).join("") + c.at(speed(0, 0, 3, 24, 12, "gray"), 100, c.g.m[1] - 14), box: [-170, -440, 340, 460] });
act("feel-sick-bed", G_FEEL, "Sick in bed with a thermometer", ["sick", "ill", "fever", "bed", "thermometer", "flu", "rest", "recover", "health", "cold"], {
  face: "sick", lying: true, opt: { outfit: "pyjamas", outfitC: "sky", hair: "side" }, pose: { l: [-26, 96], r: [26, 96], pl: [-1, 1], pr: [1, 1], ll: [-8, 130], rl: [8, 130], xf: { rot: -90, drop: 60 } }, shadow: [0, 540], wide: true,
  back: (c) => c.W(bed(false) + nightstand(-344) + at(rr(-12, -34, 24, 34, 5, "white", { w: "prop" }) + rr(-13, -42, 26, 10, 3, "orange", { w: "detail" }) + rr(-8, -26, 16, 10, 0, "red", { w: "hair", flat: true }), -352, -100) + at(po([[-12, -40], [12, -40], [10, 0], [-10, 0]], "glass", { w: "prop" }) + L.flat(L.poly([[-11, -20], [11, -20], [10, 0], [-10, 0]], true), "water", 0.7), -318, -98)),
  front: (c) => { const hp = c.tp(c.hd), R = c.R; return c.W(blanket("green", "white")) + rr(hp[0] - R * 0.5, hp[1] - R * 1.04, R, R * 0.4, 5, "sky", { w: "detail" }) + ln([[hp[0] + 2, hp[1] + R * 0.36], [hp[0] + R * 1.5, hp[1] + R * 0.52]], { c: "gray", w: "prop" }) + ci(hp[0] + R * 1.56, hp[1] + R * 0.53, 5, "red", { w: "hair" }) + c.W(puff(-220, -170, 8, "stone", 0.0)) + drop(hp[0] - R * 1.1, hp[1] - R * 0.5, 0.9); }, box: [-390, -430, 700, 450] });
act("feel-exhausted-couch", G_FEEL, "Exhausted on the couch", ["exhausted", "tired", "couch", "sofa", "worn out", "after work", "after workout", "sleepy", "drained", "lazy"], {
  face: "tired", opt: { outfit: "athlete", outfitC: "teal", hair: "messy" }, pose: Object.assign(deskPose(() => [0, 0], () => [0, 0]), { l: [-52, 108], r: [52, 108], pl: [-1, 1], pr: [1, 1], lt: [0, 70, 20], rt: [16, 80, 26], xf: { drop: 57, rot: -10, planted: false } }), shadow: [0, 480], wide: true,
  back: (c) => c.W(sofa("orange")), held: (c) => c.at(drop(0, 0, 0.9), 62, c.g.hd[1] + 12) + c.at(drop(0, 0, 0.8), -62, c.g.hd[1] - 4) + c.at(rr(-30, -6, 60, 12, 6, "white", { w: "detail" }), 0, -6, 1),
  front: (c) => c.W(sofaFront("orange") + at(puff(0, 0, 12, "white", 0.8) + puff(22, -14, 8, "white", 0.7), 70, -330) + at(rr(-14, -34, 28, 34, 8, "glass", { w: "prop" }) + L.flat(L.rrect(-12, -20, 24, 18, 4), "water", 0.8), 210, 0, 1.1)), box: [-210, -440, 460, 460] });
})();
