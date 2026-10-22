// ===================== library/wardrobe.js — body types, skin tones, outfits, hair, accessories =====================
// Extends the figure in people.js: adds entries to L.OUTFITS / L.HAIR / L.ACC (so L.person({ outfit, hair, acc }) can use them
// anywhere) and registers one gallery tile per variant (category "people").
//   L.put(S, "person", x, gy, { style: "man01", body: "muscular", outfit: "astronaut", outfitC: "white", hair: "afro", acc: ["glasses", "cap"], accC: "red" })
// accC = main colour of the accessory (tokens from L.BASE); several accessories share it.
(function () {
const L = window.L, f1 = L.f1;
const CAT = "people";

// ---------- tiny drawing kit: coordinates in "figure units" -> pixels, everything drawn through the L.* tokens ----------
// X(x) / Y(y) map units to pixels; U converts radii. Points are [x, y].
const mk = (X, Y, s, U) => {
  const P = (pts) => pts.map(([x, y]) => [X(x), Y(y)]);
  const sm = (pts) => { const q = P(pts); return L.smooth([...q, q[0]]); };
  const w = (o, k = "char") => Object.assign({ w: k, s }, o);
  return {
    s, U, X, Y, P,
    poly: (pts, c, o) => L.shape(L.poly(P(pts), true), c, w(o)),
    soft: (pts, c, o) => L.shape(sm(pts), c, w(o)),
    box: (x0, x1, y0, y1, c, r = 8, o) => L.shape(L.rrect(X(x0), Y(y0), X(x1) - X(x0), Y(y1) - Y(y0), r * U), c, w(o)),
    ell: (x, y, rx, ry, c, o) => L.shape(L.circ(X(x), Y(y), rx * U, ry * U), c, w(o, "detail")),
    dot: (x, y, r, c, o) => L.shape(L.circ(X(x), Y(y), r * U), c, w(o, "detail")),
    ln: (pts, o) => L.stroke(L.poly(P(pts)), Object.assign({ w: "detail", s }, o)),
    sln: (pts, o) => L.stroke(L.smooth(P(pts)), Object.assign({ w: "detail", s }, o)),
    fl: (pts, c, op) => L.flat(L.poly(P(pts), true), c, op),
    sfl: (pts, c, op) => L.flat(sm(pts), c, op),
    fdot: (x, y, r, c, op) => L.flat(L.circ(X(x), Y(y), r * U), c, op),
  };
};
// torso: x in half-pixels at s·W (tee = ±32), y = fraction shoulder→hip (number) or [fraction, px at s]
const geo = (sh, hip, s, W) => mk((v) => sh[0] + v * s * W, (v) => (Array.isArray(v) ? sh[1] + v[0] * (hip[1] - sh[1]) + v[1] * s : sh[1] + v * (hip[1] - sh[1])), s, s);
// head: units of the head radius R around the head centre (x scaled for oval heads)
const head = (a) => {
  const ov = a.shape === "oval", R = a.R, kx = ov ? 0.86 : 1, fr = ov ? R * 0.9 : R, fy = a.hd[1] + (ov ? R * 0.05 : 0);
  const h = mk((u) => a.hd[0] + u * R * kx, (v) => a.hd[1] + v * R, a.s, R);
  return Object.assign(h, { R, kx, cx: a.hd[0], cy: a.hd[1], ex: (0.34 * fr) / (R * kx), ey: (fy - a.hd[1]) / R - (0.08 * fr) / R, er: (0.21 * fr) / R });
};
const P_ = (hx, hy, R) => (a, k = 1) => [hx + Math.cos((a * Math.PI) / 180) * R * k, hy + Math.sin((a * Math.PI) / 180) * R * k];
const hairShape = (d, c, o) => L.shape(d, c, Object.assign({ w: "hair" }, o));
const cross = (x, u, k = 1) => [[x - 2.5 * k, [u, -7 * k]], [x + 2.5 * k, [u, -7 * k]], [x + 2.5 * k, [u, -2.5 * k]], [x + 7 * k, [u, -2.5 * k]], [x + 7 * k, [u, 2.5 * k]], [x + 2.5 * k, [u, 2.5 * k]], [x + 2.5 * k, [u, 7 * k]], [x - 2.5 * k, [u, 7 * k]], [x - 2.5 * k, [u, 2.5 * k]], [x - 7 * k, [u, 2.5 * k]], [x - 7 * k, [u, -2.5 * k]], [x - 2.5 * k, [u, -2.5 * k]]];

// ================= OUTFITS: (sh, hip, s, W, c) => markup =================
const O = L.OUTFITS, TOP = [0, -2];
O.suit = (sh, hip, s, W, c) => { const g = geo(sh, hip, s, W); return g.box(-34, 34, TOP, [1, 22], c, 8)
  + g.poly([[-11, TOP], [11, TOP], [0, 0.5]], "white", { w: "detail" }) + g.ln([[-11, TOP], [0, 0.52], [11, TOP]]) + g.ln([[0, 0.52], [0, [1, 22]]])
  + g.poly([[-4, TOP], [4, TOP], [3, [0, 8]], [-3, [0, 8]]], "red", { w: "detail" }) + g.poly([[-3, [0, 8]], [3, [0, 8]], [5.5, 0.46], [0, 0.56], [-5.5, 0.46]], "red", { w: "detail" })
  + g.dot(-4, 0.72, 2.2, "ink") + g.dot(-4, 0.88, 2.2, "ink") + g.ln([[14, 0.6], [28, 0.6]]) + g.poly([[-27, 0.3], [-17, 0.3], [-17, 0.36], [-27, 0.36]], "white", { w: "detail" }); };
O.labcoat = (sh, hip, s, W, c) => { const g = geo(sh, hip, s, W); return g.box(-35, 35, TOP, [1, 42], c, 8)
  + g.poly([[-9, TOP], [9, TOP], [0, 0.42]], "sky", { w: "detail" }) + g.ln([[-13, TOP], [0, 0.46], [13, TOP]]) + g.ln([[0, 0.46], [0, [1, 42]]])
  + g.box(-29, -13, 0.62, 0.86, c, 3, { w: "detail" }) + g.ln([[-24, 0.56], [-24, 0.7]], { c: "red", w: 4 }) + g.ln([[-19, 0.56], [-19, 0.7]], { c: "blue", w: 4 })
  + g.dot(3, 0.62, 2, "gray") + g.dot(3, 0.8, 2, "gray") + g.ln([[20, 0.78], [30, 0.78]]); };
O.doctor = (sh, hip, s, W, c) => { const g = geo(sh, hip, s, W); return g.box(-32, 32, TOP, [1, 16], c, 12)
  + g.poly([[-10, TOP], [10, TOP], [0, 0.22]], c, { w: "detail", tone: 2 }) + g.box(10, 27, 0.52, 0.74, c, 3, { w: "detail", tone: 2 })
  + g.sln([[-15, TOP], [-15, 0.34], [0, 0.56], [15, 0.34], [15, TOP]], { c: "ink", w: "char" }) + g.dot(0, 0.62, 5, "gray") + g.dot(15, [0, -2], 3, "gray"); };
O.nurse = (sh, hip, s, W, c) => { const g = geo(sh, hip, s, W); return g.poly([[-28, TOP], [28, TOP], [33, 1], [46, [1, 36]], [-46, [1, 36]], [-33, 1]], c)
  + g.ln([[-9, TOP], [0, 0.2], [9, TOP]]) + g.poly(cross(-15, 0.3), "red", { w: "detail" }) + g.ln([[-33, 0.72], [33, 0.72]], { c: "sky", w: 4 }) + g.dot(0, 0.5, 2, "gray") + g.dot(0, 0.64, 2, "gray"); };
O.astronaut = (sh, hip, s, W, c) => { const g = geo(sh, hip, s, W); return g.box(-36, 36, TOP, [1, 22], c, 14)
  + g.box(-18, 18, 0.28, 0.62, "gray", 5, { w: "detail" }) + g.dot(-9, 0.38, 3, "red") + g.dot(0, 0.38, 3, "green") + g.dot(9, 0.38, 3, "yellow") + g.ln([[-12, 0.52], [12, 0.52]], { c: "ink", w: 3 })
  + g.box(-36, 36, 0.8, 0.9, "orange", 0, { w: "detail" }) + g.box(-6, 6, 0.79, 0.91, "gray", 2, { w: "detail" })
  + L.shape(L.circ(g.X(0), g.Y(TOP), 27 * s * W, 8 * s), "gray", { w: "detail", s }) + g.sln([[18, 0.46], [34, 0.56], [34, 0.76]], { c: "gray", w: "char" }); };
O.chef = (sh, hip, s, W, c) => { const g = geo(sh, hip, s, W); let b = ""; [0.2, 0.36, 0.52].forEach((u) => { b += g.dot(-9, u, 2.6, "gray") + g.dot(9, u, 2.6, "gray"); });
  return g.box(-36, 36, TOP, [1, 18], c, 10) + g.ln([[-16, TOP], [-16, 0.5]]) + g.ln([[0, 0.1], [0, 0.5]]) + b
  + g.poly([[-12, TOP], [12, TOP], [0, 0.18]], "red", { w: "detail" })
  + g.ln([[-12, 0.5], [-8, TOP]]) + g.ln([[12, 0.5], [8, TOP]]) + g.box(-27, 27, 0.5, [1, 38], "navy", 6) + g.box(-14, 14, 0.74, 0.92, "navy", 3, { w: "detail", tone: 2 }) + g.ln([[-27, 0.56], [-34, 0.5]]) + g.ln([[27, 0.56], [34, 0.5]]); };
O.builder = (sh, hip, s, W, c) => { const g = geo(sh, hip, s, W); return g.box(-32, 32, TOP, T1, c, 12)
  + g.poly([[-30, TOP], [-9, TOP], [-3, 0.36], [-3, [1, 16]], [-30, [1, 16]]], "orange") + g.poly([[30, TOP], [9, TOP], [3, 0.36], [3, [1, 16]], [30, [1, 16]]], "orange")
  + g.fl([[-30, 0.58], [-3, 0.58], [-3, 0.68], [-30, 0.68]], "paper") + g.fl([[30, 0.58], [3, 0.58], [3, 0.68], [30, 0.68]], "paper")
  + g.fl([[-24, TOP], [-17, TOP], [-17, 0.58], [-24, 0.58]], "paper") + g.fl([[24, TOP], [17, TOP], [17, 0.58], [24, 0.58]], "paper") + g.ln([[0, 0.36], [0, [1, 16]]], { c: "gray" }); };
const T1 = [1, 16];
O.farmer = (sh, hip, s, W, c) => { const g = geo(sh, hip, s, W); let ck = ""; [-22, -8, 8, 22].forEach((x) => (ck += g.fl([[x - 2, [0, 10]], [x + 2, [0, 10]], [x + 2, T1], [x - 2, T1]], "white", 0.35))); [0.2, 0.5, 0.8].forEach((u) => (ck += g.fl([[-31, [u, -2]], [31, [u, -2]], [31, [u, 2]], [-31, [u, 2]]], "white", 0.3)));
  return g.box(-32, 32, TOP, T1, c, 12) + ck + g.box(-29, 29, 0.4, T1, "blue", 6) + g.box(-17, 17, 0.14, 0.44, "blue", 3)
  + g.poly([[-21, TOP], [-13, TOP], [-9, 0.17], [-16, 0.17]], "blue") + g.poly([[21, TOP], [13, TOP], [9, 0.17], [16, 0.17]], "blue")
  + g.dot(-14, 0.2, 2.4, "gold") + g.dot(14, 0.2, 2.4, "gold") + g.box(-9, 9, 0.28, 0.4, "blue", 2, { w: "detail", tone: 2 }) + g.ln([[-29, 0.72], [-22, 0.78]], { c: "yellow", w: 3 }); };
O.athlete = (sh, hip, s, W, c) => { const g = geo(sh, hip, s, W); return g.box(-32, 32, TOP, [1, 4], c, 12)
  + g.poly([[-9, TOP], [9, TOP], [0, 0.16]], "white", { w: "detail" }) + L.text("7", g.X(0), g.Y(0.62), { size: 46 * s, c: "white" })
  + g.poly([[-33, [1, 6]], [33, [1, 6]], [37, [1, 52]], [4, [1, 52]], [0, [1, 20]], [-4, [1, 52]], [-37, [1, 52]]], "white") + g.ln([[-34, [1, 12]], [-36, [1, 50]]], { c: "blue", w: 4 }) + g.ln([[34, [1, 12]], [36, [1, 50]]], { c: "blue", w: 4 }); };
O.pyjamas = (sh, hip, s, W, c) => { const g = geo(sh, hip, s, W); let st = ""; [[-18, 0.2], [14, 0.3], [-8, 0.56], [20, 0.62], [-22, 0.8], [6, 0.86]].forEach(([x, u]) => (st += L.flat(L.star(g.X(x), g.Y(u), 5 * s, 2.2 * s), "yellow")));
  return g.box(-34, 34, TOP, [1, 20], c, 14) + st + g.box(-34, 34, [1, 8], [1, 22], c, 10, { w: "detail", tone: 2 }) + g.ln([[-8, TOP], [0, 0.16], [8, TOP]]) + g.ln([[0, 0.16], [0, [1, 8]]]) + g.dot(0, 0.3, 2, "white") + g.dot(0, 0.5, 2, "white"); };
O.caveman = (sh, hip, s, W, c) => { const g = geo(sh, hip, s, W); let sp = ""; [[22, 0.1], [8, 0.3], [24, 0.45], [-6, 0.55], [14, 0.7], [-20, 0.78], [28, 0.88], [0, 0.92]].forEach(([x, u]) => (sp += g.dot(x, u, 3.6, "brown", { w: "hair" })));
  return g.poly([[-10, TOP], [34, TOP], [36, [1, 28]], [24, [1, 46]], [12, [1, 30]], [0, [1, 48]], [-12, [1, 30]], [-24, [1, 48]], [-34, [1, 28]], [-34, 0.3]], c) + sp + g.ln([[-10, TOP], [-34, 0.3]], { c: "brown", w: 5 }); };
O.king = (sh, hip, s, W, c) => { const g = geo(sh, hip, s, W); let tl = ""; [0.2, 0.42, 0.64, 0.86].forEach((u) => (tl += g.dot(0, u, 2.4, "ink", { w: "hair" })));
  return g.poly([[-30, TOP], [30, TOP], [36, 1], [54, [1, 72]], [-54, [1, 72]], [-36, 1]], c) + g.poly([[-9, [0, 6]], [9, [0, 6]], [14, [1, 72]], [-14, [1, 72]]], "white", { w: "detail" }) + tl
  + g.ln([[-54, [1, 66]], [54, [1, 66]]], { c: "gold", w: 5 }) + g.box(-31, 31, [0, -7], [0, 10], "white", 9) + g.dot(-18, [0, 2], 2.2, "ink", { w: "hair" }) + g.dot(18, [0, 2], 2.2, "ink", { w: "hair" }) + g.dot(0, [0, 12], 4, "gold"); };
O.queen = (sh, hip, s, W, c) => { const g = geo(sh, hip, s, W); return g.poly([[-26, TOP], [26, TOP], [30, 0.6], [40, [1, 10]], [68, [1, 74]], [-68, [1, 74]], [-40, [1, 10]], [-30, 0.6]], c)
  + g.box(-31, 31, 0.5, 0.62, "gold", 3, { w: "detail" }) + g.dot(0, 0.56, 3.4, "red") + g.ln([[-68, [1, 68]], [68, [1, 68]]], { c: "gold", w: 5 })
  + g.sln([[-20, TOP], [-11, [0, 12]], [0, [0, 16]], [11, [0, 12]], [20, TOP]], { c: "gold", w: "char" }) + g.dot(-8, [1, 34], 2.6, "pink") + g.dot(14, [1, 50], 2.6, "pink") + g.dot(-22, [1, 58], 2.6, "pink") + g.dot(30, [1, 26], 2.6, "pink"); };
O.pirate = (sh, hip, s, W, c) => { const g = geo(sh, hip, s, W); let st = ""; [0.16, 0.34, 0.52, 0.7].forEach((u) => (st += g.fl([[-31, u], [31, u], [31, u + 0.07], [-31, u + 0.07]], "navy", 0.85)));
  return g.box(-32, 32, TOP, T1, c, 12) + st + g.poly([[-30, TOP], [-17, TOP], [-12, 0.3], [-14, [1, 10]], [-30, [1, 10]]], "ink") + g.poly([[30, TOP], [17, TOP], [12, 0.3], [14, [1, 10]], [30, [1, 10]]], "ink")
  + g.dot(-22, 0.3, 2, "gold") + g.dot(-22, 0.52, 2, "gold") + g.dot(22, 0.3, 2, "gold") + g.dot(22, 0.52, 2, "gold") + g.box(-33, 33, 0.8, [1, 22], "red", 3) + g.poly([[22, [1, 8]], [40, [1, 40]], [30, [1, 42]], [24, [1, 20]]], "red", { w: "detail" }) + g.box(-5, 5, 0.83, [1, 12], "gold", 2, { w: "detail" }); };
O.knight = (sh, hip, s, W, c) => { const g = geo(sh, hip, s, W); return g.box(-36, 36, TOP, [1, 22], c, 14)
  + g.ln([[0, 0.05], [0, 0.78]]) + g.sln([[-34, 0.3], [-18, 0.4], [0, 0.34], [18, 0.4], [34, 0.3]]) + g.poly(cross(0, 0.5, 1.3), "red", { w: "detail" })
  + g.box(-20, 20, [0, -9], [0, 8], c, 6, { tone: 2 }) + g.box(-36, 36, 0.8, 0.9, "brown", 2, { w: "detail" }) + g.box(-5, 5, 0.79, 0.91, "gold", 2, { w: "detail" })
  + g.box(-34, -2, [1, 6], [1, 34], c, 6, { w: "detail" }) + g.box(2, 34, [1, 6], [1, 34], c, 6, { w: "detail" })
  + g.fl([[-28, 0.1], [-22, 0.1], [-24, 0.7], [-29, 0.7]], "white", 0.45); };
O.wizard = (sh, hip, s, W, c) => { const g = geo(sh, hip, s, W), mx = g.X(-14), my = g.Y(0.34); let st = "";
  [[16, 0.16], [-22, 0.3], [24, 0.5], [-6, 0.62], [34, [1, 30]], [-30, [1, 44]], [12, [1, 56]]].forEach(([x, u]) => (st += L.flat(L.star(g.X(x), g.Y(u), 5 * s, 2.2 * s), "yellow")));
  const cres = `M${f1(mx)} ${f1(my - 8 * s)} A${f1(8 * s)} ${f1(8 * s)} 0 1 0 ${f1(mx)} ${f1(my + 8 * s)} A${f1(5 * s)} ${f1(8 * s)} 0 0 1 ${f1(mx)} ${f1(my - 8 * s)} Z`;
  return g.poly([[-30, TOP], [30, TOP], [36, 1], [54, [1, 78]], [-54, [1, 78]], [-36, 1]], c) + st + L.flat(cres, "yellow") + g.box(-36, 36, 0.62, 0.7, "gold", 3, { w: "detail" }) + g.dot(-4, 0.66, 3, "gold") + g.ln([[-54, [1, 72]], [54, [1, 72]]], { c: "gold", w: 4 }); };
O.student = (sh, hip, s, W, c) => { const g = geo(sh, hip, s, W); return g.box(-32, 32, TOP, T1, c, 12)
  + g.poly([[-27, TOP], [-9, TOP], [0, 0.36], [9, TOP], [27, TOP], [27, [1, 12]], [-27, [1, 12]]], "navy") + g.box(-27, 27, [1, 0], [1, 14], "navy", 4, { w: "detail", tone: 2 })
  + g.poly([[-13, TOP], [-1, [0, 8]], [-9, [0, 12]]], "white", { w: "detail" }) + g.poly([[13, TOP], [1, [0, 8]], [9, [0, 12]]], "white", { w: "detail" })
  + g.poly([[-3, [0, 6]], [3, [0, 6]], [4, 0.3], [0, 0.35], [-4, 0.3]], "red", { w: "detail" }) + g.poly([[-20, 0.5], [-11, 0.5], [-11, 0.6], [-15.5, 0.68], [-20, 0.6]], "gold", { w: "detail" }); };
O.office = (sh, hip, s, W, c) => { const g = geo(sh, hip, s, W); let b = ""; [0.26, 0.46, 0.66, 0.86].forEach((u) => (b += g.dot(0, u, 1.8, "white", { w: "hair" })));
  return g.box(-33, 33, TOP, T1, c, 10) + g.ln([[0, 0.14], [0, [1, 16]]]) + b + g.poly([[-13, TOP], [0, [0, 4]], [-5, [0, 14]], [-15, [0, 4]]], "white", { w: "detail" }) + g.poly([[13, TOP], [0, [0, 4]], [5, [0, 14]], [15, [0, 4]]], "white", { w: "detail" })
  + g.box(12, 27, 0.34, 0.54, c, 2, { w: "detail" }) + g.ln([[17, 0.3], [17, 0.42]], { c: "navy", w: 4 }) + g.ln([[-9, TOP], [0, 0.42], [9, TOP]], { c: "red", w: 3 }) + g.box(-7, 7, 0.42, 0.62, "white", 2, { w: "detail" }); };
O.sweater = (sh, hip, s, W, c) => { const g = geo(sh, hip, s, W); let dm = ""; [-26, -13, 0, 13, 26].forEach((x) => (dm += g.fl([[x, [0.46, -6]], [x + 6.5, [0.46, 0]], [x, [0.46, 6]], [x - 6.5, [0.46, 0]]], "cream", 0.95)));
  return g.box(-37, 37, TOP, [1, 20], c, 16) + dm + g.fl([[-36, [0.46, -10]], [36, [0.46, -10]], [36, [0.46, -8]], [-36, [0.46, -8]]], "cream", 0.9) + g.fl([[-36, [0.46, 8]], [36, [0.46, 8]], [36, [0.46, 10]], [-36, [0.46, 10]]], "cream", 0.9)
  + g.box(-37, 37, [1, 2], [1, 22], c, 10, { w: "detail", tone: 2 }) + g.box(-15, 15, [0, -10], [0, 6], c, 6, { w: "detail", tone: 2 }); };
O.jacket = (sh, hip, s, W, c) => { const g = geo(sh, hip, s, W); return g.box(-9, 9, TOP, [1, 18], "white", 2, { w: "detail" }) + g.box(-36, -9, TOP, [1, 20], c, 12) + g.box(9, 36, TOP, [1, 20], c, 12)
  + g.box(-36, -9, [1, 6], [1, 22], c, 6, { w: "detail", tone: 2 }) + g.box(9, 36, [1, 6], [1, 22], c, 6, { w: "detail", tone: 2 }) + g.box(-13, -3, [0, -8], [0, 8], c, 4, { w: "detail", tone: 2 }) + g.box(3, 13, [0, -8], [0, 8], c, 4, { w: "detail", tone: 2 })
  + g.ln([[-31, 0.58], [-17, 0.66]]) + g.ln([[31, 0.58], [17, 0.66]]) + g.ln([[-9, 0.1], [-9, [1, 6]]], { c: "gray", w: 3 }); };
O.raincoat = (sh, hip, s, W, c) => { const g = geo(sh, hip, s, W); return g.poly([[-32, TOP], [32, TOP], [36, 1], [50, [1, 52]], [-50, [1, 52]], [-36, 1]], c)
  + g.box(-34, 34, 0.5, 0.58, c, 0, { w: "detail", tone: 2 }) + g.box(-5, 5, 0.49, 0.59, "gold", 2, { w: "detail" }) + g.ln([[0, 0.12], [0, 0.49]]) + g.ln([[0, 0.59], [0, [1, 50]]])
  + g.dot(-4, 0.26, 2.6, "ink") + g.dot(-4, 0.4, 2.6, "ink") + g.dot(-4, 0.74, 2.6, "ink") + g.box(-27, -9, 0.66, 0.74, c, 2, { w: "detail", tone: 2 }) + g.box(9, 27, 0.66, 0.74, c, 2, { w: "detail", tone: 2 })
  + g.fl([[-48, [1, 40]], [48, [1, 40]], [49, [1, 44]], [-49, [1, 44]]], "white", 0.8)
  + g.soft([[-22, [0, -4]], [0, [0, -10]], [22, [0, -4]], [29, [0, 12]], [0, [0, 24]], [-29, [0, 12]]], c, { w: "detail", tone: 2 }); };
O.superhero = (sh, hip, s, W, c) => { const g = geo(sh, hip, s, W); return g.poly([[22, [0, -4]], [34, TOP], [78, 0.5], [98, [1, 34]], [58, [1, 54]], [40, [1, 20]]], "red") + g.poly([[-22, [0, -4]], [-34, TOP], [-78, 0.5], [-98, [1, 34]], [-58, [1, 54]], [-40, [1, 20]]], "red")
  + g.box(-30, 30, TOP, [1, 8], c, 12) + g.poly([[0, [0.24, -14]], [13, [0.24, 0]], [0, [0.24, 14]], [-13, [0.24, 0]]], "yellow", { w: "detail" }) + L.flat(L.star(g.X(0), g.Y(0.24), 7 * s, 3 * s), "red")
  + g.poly([[-31, [1, 2]], [31, [1, 2]], [34, [1, 28]], [2, [1, 28]], [0, [1, 14]], [-2, [1, 28]], [-34, [1, 28]]], "red") + g.box(-31, 31, [1, -8], [1, 4], "yellow", 2, { w: "detail" }); };
O.striped = (sh, hip, s, W, c) => { const g = geo(sh, hip, s, W); let st = ""; [0.14, 0.31, 0.48, 0.65, 0.82].forEach((u) => (st += g.fl([[-31, u], [31, u], [31, u + 0.085], [-31, u + 0.085]], "navy", 0.9)));
  return g.box(-32, 32, TOP, T1, c, 12) + st; };
O.hawaiian = (sh, hip, s, W, c) => { const g = geo(sh, hip, s, W); let fw = ""; [[-20, 0.22, "pink"], [18, 0.28, "white"], [-10, 0.56, "white"], [22, 0.62, "pink"], [-24, 0.8, "pink"], [4, 0.88, "white"]].forEach(([x, u, pc]) => { for (let i = 0; i < 5; i++) { const a = (i / 5) * Math.PI * 2; fw += g.fdot(x + Math.cos(a) * 4.2, [u, Math.sin(a) * 4.2], 3.3, pc); } fw += g.fdot(x, u, 2.4, "yellow"); });
  return g.box(-34, 34, TOP, [1, 18], c, 10) + fw + g.poly([[-13, TOP], [0, 0.26], [13, TOP], [6, TOP], [0, 0.1], [-6, TOP]], c, { w: "detail", tone: 2 }) + g.ln([[0, 0.26], [0, [1, 18]]]); };
O.overcoat = (sh, hip, s, W, c) => { const g = geo(sh, hip, s, W); let b = ""; [0.52, 0.7, 0.88].forEach((u) => (b += g.dot(-10, u, 2.6, "ink") + g.dot(10, u, 2.6, "ink")));
  return g.box(-37, 37, TOP, [1, 64], c, 10) + g.poly([[-8, TOP], [8, TOP], [0, 0.3]], "white", { w: "detail" }) + g.poly([[-8, TOP], [-32, 0.1], [-20, 0.44], [-1, 0.32]], c, { w: "detail", tone: 2 }) + g.poly([[8, TOP], [32, 0.1], [20, 0.44], [1, 0.32]], c, { w: "detail", tone: 2 })
  + g.ln([[0, 0.32], [0, [1, 64]]]) + b + g.box(-37, 37, 0.58, 0.64, c, 0, { w: "detail", tone: 2 }) + g.ln([[-30, [1, 40]], [-16, [1, 40]]]) + g.ln([[30, [1, 40]], [16, [1, 40]]]); };

// ================= HAIR: (hx, hy, R, c) => { back, front } =================
const H = L.HAIR;
const capFront = (hx, hy, R, c) => H.short(hx, hy, R, c).front;
H.bald = (hx, hy, R, c) => { const P = P_(hx, hy, R), tuft = (sd) => hairShape(L.smooth([[hx + sd * 0.98 * R, hy - 0.4 * R], [hx + sd * 1.12 * R, hy - 0.1 * R], [hx + sd * 1.0 * R, hy + 0.2 * R], [hx + sd * 0.9 * R, hy - 0.05 * R], [hx + sd * 0.98 * R, hy - 0.4 * R]]), c);
  return { front: tuft(-1) + tuft(1) + L.stroke(L.arc(hx, hy, R * 0.74, 228, 262), { c: "white", w: 4 }) + L.flat(L.circ(...P(238, 0.86), R * 0.05), "white", 0.8) }; };
H.buzz = (hx, hy, R, c) => { const P = P_(hx, hy, R); return { front: L.shape(L.smooth([...L.arcPts(hx, hy, R * 1.03, 192, 348, 14), P(344, 0.97), [hx + 0.62 * R, hy - 0.52 * R], [hx + 0.2 * R, hy - 0.6 * R], [hx - 0.4 * R, hy - 0.56 * R], [hx - 0.78 * R, hy - 0.4 * R], P(196, 0.97), P(192, 1.03)]), c, { w: "hair", op: 0.55 }) }; };
H.afro = (hx, hy, R, c) => { const P = P_(hx, hy, R), pts = []; for (let i = 0; i < 28; i++) { const a = (i / 28) * Math.PI * 2; pts.push([hx + Math.cos(a) * R * (i % 2 ? 1.55 : 1.68), hy - 0.4 * R + Math.sin(a) * R * (i % 2 ? 1.3 : 1.42)]); } pts.push(pts[0]);
  return { back: hairShape(L.smooth(pts), c), front: hairShape(L.smooth([...L.arcPts(hx, hy, R * 1.08, 198, 342, 12), P(336, 0.9), [hx + 0.5 * R, hy - 0.6 * R], [hx, hy - 0.68 * R], [hx - 0.5 * R, hy - 0.6 * R], P(204, 0.9), P(198, 1.08)]), c) }; };
H.mohawk = (hx, hy, R, c) => ({ front: hairShape(L.poly([[hx - 0.38 * R, hy - 0.85 * R], [hx - 0.46 * R, hy - 1.7 * R], [hx - 0.24 * R, hy - 1.45 * R], [hx - 0.12 * R, hy - 2.05 * R], [hx + 0.06 * R, hy - 1.55 * R], [hx + 0.24 * R, hy - 2.0 * R], [hx + 0.34 * R, hy - 1.5 * R], [hx + 0.5 * R, hy - 1.7 * R], [hx + 0.38 * R, hy - 0.85 * R]], true), c) });
H.quiff = (hx, hy, R, c) => ({ front: capFront(hx, hy, R, c) + hairShape(L.smooth([[hx - 0.72 * R, hy - 0.5 * R], [hx - 0.68 * R, hy - 1.05 * R], [hx - 0.3 * R, hy - 1.5 * R], [hx + 0.35 * R, hy - 1.66 * R], [hx + 0.88 * R, hy - 1.38 * R], [hx + 0.96 * R, hy - 0.95 * R], [hx + 0.8 * R, hy - 0.62 * R], [hx + 0.3 * R, hy - 0.8 * R], [hx - 0.2 * R, hy - 0.64 * R], [hx - 0.72 * R, hy - 0.5 * R]]), c) });
H.manbun = (hx, hy, R, c) => ({ back: hairShape(L.circ(hx, hy - 1.28 * R, 0.36 * R), c) + L.stroke(L.arc(hx, hy - 1.28 * R, 0.36 * R, 200, 340), { w: "hair" }), front: H.side(hx, hy, R, c).front + L.stroke(L.line([hx - 0.3 * R, hy - 1.0 * R], [hx + 0.3 * R, hy - 1.0 * R]), { c: "red", w: 4 }) });
H.sidepart = (hx, hy, R, c) => { const P = P_(hx, hy, R); return { front: hairShape(L.smooth([...L.arcPts(hx, hy, R * 1.1, 190, 350, 14), P(346, 0.98), [hx + 0.56 * R, hy - 0.58 * R], [hx + 0.16 * R, hy - 0.66 * R], [hx - 0.1 * R, hy - 0.46 * R], [hx - 0.42 * R, hy - 0.5 * R], [hx - 0.7 * R, hy - 0.46 * R], P(194, 0.98), P(190, 1.1)]), c) + L.stroke(L.smooth([[hx + 0.18 * R, hy - 1.0 * R], [hx + 0.02 * R, hy - 0.82 * R], [hx - 0.3 * R, hy - 0.72 * R]]), { w: "hair" }) + L.stroke(L.smooth([[hx + 0.18 * R, hy - 1.0 * R], [hx + 0.2 * R, hy - 0.8 * R], [hx + 0.14 * R, hy - 0.66 * R]]), { w: "hair" }) }; };
H.wavy = (hx, hy, R, c) => { const P = P_(hx, hy, R), side = (sd) => Array.from({ length: 8 }, (_, i) => { const t = i / 7; return [hx + sd * (1.12 + 0.16 * Math.sin(t * 9)) * R, hy + t * 1.75 * R]; }), r = side(1), l = side(-1);
  return { back: hairShape(L.smooth([P(185, 1.1), ...L.arcPts(hx, hy, R * 1.12, 185, 355, 12), ...r, [hx + 0.55 * R, hy + 1.9 * R], [hx, hy + 1.75 * R], [hx - 0.55 * R, hy + 1.9 * R], ...l.reverse(), P(185, 1.1)]), c), front: H.side(hx, hy, R, c).front }; };
H.highTail = (hx, hy, R, c) => ({ back: hairShape(L.smooth([[hx - 0.1 * R, hy - 1.0 * R], [hx + 0.5 * R, hy - 1.58 * R], [hx + 1.3 * R, hy - 1.45 * R], [hx + 1.72 * R, hy - 0.6 * R], [hx + 1.78 * R, hy + 0.5 * R], [hx + 1.5 * R, hy + 1.0 * R], [hx + 1.3 * R, hy + 0.2 * R], [hx + 1.0 * R, hy - 0.55 * R], [hx + 0.4 * R, hy - 0.95 * R], [hx - 0.1 * R, hy - 1.0 * R]]), c), front: capFront(hx, hy, R, c) + L.shape(L.circ(hx + 0.2 * R, hy - 1.04 * R, 0.17 * R), "red", { w: "hair" }) });
H.spaceBuns = (hx, hy, R, c) => { const bun = (sd) => hairShape(L.circ(hx + sd * 0.78 * R, hy - 1.02 * R, 0.42 * R), c) + L.stroke(L.arc(hx + sd * 0.78 * R, hy - 1.02 * R, 0.24 * R, 20, 280), { w: "hair" }); return { back: bun(-1) + bun(1), front: capFront(hx, hy, R, c) }; };
H.bowl = (hx, hy, R, c) => { const P = P_(hx, hy, R); return { front: hairShape(L.smooth([...L.arcPts(hx, hy, R * 1.12, 188, 352, 14), [hx + 1.1 * R, hy + 0.12 * R], [hx + 0.95 * R, hy + 0.1 * R], [hx + 0.9 * R, hy - 0.3 * R], [hx + 0.5 * R, hy - 0.46 * R], [hx, hy - 0.4 * R], [hx - 0.5 * R, hy - 0.46 * R], [hx - 0.9 * R, hy - 0.3 * R], [hx - 0.95 * R, hy + 0.1 * R], [hx - 1.1 * R, hy + 0.12 * R], P(188, 1.12)]), c) }; };
H.bangsLong = (hx, hy, R, c) => ({ back: H.long(hx, hy, R, c).back, front: H.bowl(hx, hy, R, c).front });

// ================= ACCESSORIES: { front, draw(anchors, o) } =================
const A = L.ACC, col = (o, d) => o.accC || d;
const eyeLens = (h) => h.er * 1.5;
A.glasses = { front: true, draw(a, o) { const h = head(a), lr = eyeLens(h), c = col(o, "ink"), y = h.Y(h.ey); let t = "";
  [-1, 1].forEach((sd) => { const d = L.circ(h.X(sd * h.ex), y, lr * h.R); t += L.flat(d, "glass", 0.45) + L.stroke(d, { c, w: "prop", s: h.s }) + L.stroke(L.line([h.X(sd * h.ex) + sd * lr * h.R, y], [h.X(sd * 1.0), h.Y(h.ey - 0.04)]), { c, w: "detail", s: h.s }); });
  return t + L.stroke(L.line([h.X(-h.ex) + lr * h.R, h.Y(h.ey - 0.05)], [h.X(h.ex) - lr * h.R, h.Y(h.ey - 0.05)]), { c, w: "prop", s: h.s }); } };
A.sunglasses = { front: true, draw(a, o) { const h = head(a), lr = eyeLens(h), c = col(o, "ink"), W2 = 2.1 * lr * h.R, H2 = 1.5 * lr * h.R; let t = "";
  [-1, 1].forEach((sd) => { const x = h.X(sd * h.ex) - W2 / 2, y = h.Y(h.ey) - H2 * 0.55; t += L.shape(L.rrect(x, y, W2, H2, lr * h.R * 0.8), c, { w: "detail", s: h.s }) + L.flat(L.poly([[x + W2 * 0.2, y + H2 * 0.7], [x + W2 * 0.38, y + H2 * 0.18], [x + W2 * 0.5, y + H2 * 0.18], [x + W2 * 0.32, y + H2 * 0.7]], true), "white", 0.5) + L.stroke(L.line([h.X(sd * h.ex) + sd * W2 / 2, y + H2 * 0.3], [h.X(sd * 1.0), h.Y(h.ey - 0.06)]), { c, w: "prop", s: h.s }); });
  return t + L.stroke(L.line([h.X(-h.ex) + W2 / 2, h.Y(h.ey - 0.12)], [h.X(h.ex) - W2 / 2, h.Y(h.ey - 0.12)]), { c, w: "prop", s: h.s }); } };
A.cap = { front: true, draw(a, o) { const h = head(a), c = col(o, "red"), arc = L.arcPts(h.cx, h.Y(-0.48), 1.02 * h.R * h.kx, 180, 360, 16, 0.78 * h.R);
  return L.shape(L.smooth([...arc, ...h.P([[0.5, -0.43], [0, -0.4], [-0.5, -0.43]]), arc[0]]), c, { w: "char", s: h.s }) + h.sln([[-0.5, -1.2], [-0.34, -0.85], [-0.3, -0.43]]) + h.sln([[0.5, -1.2], [0.34, -0.85], [0.3, -0.43]]) + h.dot(0, -1.25, 0.07, c)
    + h.soft([[-0.95, -0.45], [-0.6, -0.31], [0, -0.26], [0.6, -0.31], [0.95, -0.45], [0.5, -0.42], [0, -0.4], [-0.5, -0.42]], c, { tone: 2 }); } };
A.beanie = { front: true, draw(a, o) { const h = head(a), c = col(o, "blue"), arc = L.arcPts(h.cx, h.Y(-0.42), 1.06 * h.R * h.kx, 180, 360, 16, 0.9 * h.R); let rib = "";
  for (let x = -0.9; x <= 0.91; x += 0.3) rib += h.ln([[x, -0.6], [x, -0.33]], { w: "hair" });
  return h.dot(0, -1.4, 0.24, "white", { w: "char" }) + L.shape(L.smooth([...arc, arc[0]]), c, { w: "char", s: h.s }) + h.sln([[-0.55, -1.15], [-0.35, -0.8]], { w: "hair" }) + h.sln([[0.55, -1.15], [0.35, -0.8]], { w: "hair" })
    + h.box(-1.08, 1.08, -0.64, -0.3, c, 0.1, { tone: 2 }) + rib; } };
A.tophat = { front: true, draw(a, o) { const h = head(a), c = col(o, "ink");
  return h.ell(0, -0.62, 1.3, 0.2, c, { w: "char" }) + h.box(-0.72, 0.72, -2.1, -0.62, c, 0.12) + h.box(-0.72, 0.72, -0.98, -0.72, "red", 0, { w: "detail" }) + h.fl([[-0.6, -2.0], [-0.5, -2.0], [-0.5, -1.2], [-0.6, -1.2]], "white", 0.3); } };
A.crown = { front: true, draw(a, o) { const h = head(a), c = col(o, "gold");
  return h.poly([[-0.82, -0.5], [-0.82, -1.55], [-0.6, -1.2], [-0.4, -1.6], [-0.2, -1.2], [0, -1.78], [0.2, -1.2], [0.4, -1.6], [0.6, -1.2], [0.82, -1.55], [0.82, -0.5], [0.5, -0.62], [0, -0.66], [-0.5, -0.62]], c)
    + h.dot(-0.82, -1.58, 0.08, "red") + h.dot(-0.4, -1.63, 0.08, "blue") + h.dot(0, -1.81, 0.1, "red") + h.dot(0.4, -1.63, 0.08, "blue") + h.dot(0.82, -1.58, 0.08, "red") + h.dot(0, -0.98, 0.12, "pink") + h.ln([[-0.8, -0.82], [0.8, -0.82]]); } };
A.chefhat = { front: true, draw(a, o) { const h = head(a), c = col(o, "white");
  return h.soft([[-0.8, -0.9], [-1.15, -1.2], [-1.0, -1.65], [-0.55, -1.82], [-0.3, -2.12], [0.15, -2.18], [0.48, -1.95], [0.92, -1.78], [1.15, -1.4], [0.85, -0.9]], c) + h.box(-0.8, 0.8, -1.0, -0.5, c, 0.1) + h.ln([[-0.4, -0.95], [-0.4, -0.55]], { w: "hair" }) + h.ln([[0, -0.95], [0, -0.55]], { w: "hair" }) + h.ln([[0.4, -0.95], [0.4, -0.55]], { w: "hair" })
    + h.sln([[-0.6, -1.7], [-0.5, -1.2]], { w: "hair" }) + h.sln([[0.55, -1.8], [0.5, -1.2]], { w: "hair" }); } };
A.hardhat = { front: true, draw(a, o) { const h = head(a), c = col(o, "yellow"), arc = L.arcPts(h.cx, h.Y(-0.42), 1.08 * h.R * h.kx, 180, 360, 16, 0.88 * h.R);
  return L.shape(L.smooth([...arc, arc[0]]), c, { w: "char", s: h.s }) + h.box(-0.14, 0.14, -1.28, -0.45, c, 0.06, { tone: 2, w: "detail" }) + h.box(-1.28, 1.28, -0.54, -0.36, c, 0.09) + h.dot(0, -0.78, 0.1, "white", { w: "hair" }); } };
A.headphones = { front: true, draw(a, o) { const h = head(a), c = col(o, "red"), cup = (sd) => h.ell(sd * 1.1, 0.02, 0.27, 0.4, c) + h.ell(sd * 1.1, 0.02, 0.13, 0.24, c, { tone: 2, w: "hair" });
  return L.stroke(L.arc(h.cx, h.cy, 1.14 * h.R * h.kx, 180, 360, 1.22 * h.R), { c: "ink", w: 9 * Math.sqrt(h.s) }) + cup(-1) + cup(1); } };
A.backpack = { draw(a, o) { const g = geo(a.sh, a.hip, a.s, a.W), c = col(o, "orange"); let t = "";
  [-1, 1].forEach((sd) => { t += g.box(Math.min(sd * 24, sd * 47), Math.max(sd * 24, sd * 47), [0, -6], 0.64, c, 10) + g.box(Math.min(sd * 30, sd * 44), Math.max(sd * 30, sd * 44), 0.42, 0.58, c, 4, { w: "detail", tone: 2 }); });
  return t + g.poly([[-22, TOP], [-11, TOP], [-12, 0.52], [-24, 0.52]], c, { w: "detail", tone: 2 }) + g.poly([[22, TOP], [11, TOP], [12, 0.52], [24, 0.52]], c, { w: "detail", tone: 2 }); } };
A.watch = { front: true, draw(a, o) { const s = a.s, pose = L.POSES[o.pose || "stand"] || L.POSES.stand, i = a.hands[1][1] < a.hands[0][1] ? 1 : 0, rel = pose[i], root = i ? a.abR : a.abL, hand = a.hands[i], el = rel.length > 1 ? [root[0] + rel[rel.length - 2][0] * s, root[1] + rel[rel.length - 2][1] * s] : root;
  let dx = hand[0] - el[0], dy = hand[1] - el[1]; const m = Math.hypot(dx, dy) || 1; dx /= m; dy /= m; const wx = hand[0] - dx * 20 * s, wy = hand[1] - dy * 20 * s, nx = -dy, ny = dx, c = col(o, "red");
  return L.shape(L.poly([[wx + nx * 10 * s - dx * 4 * s, wy + ny * 10 * s - dy * 4 * s], [wx + nx * 10 * s + dx * 4 * s, wy + ny * 10 * s + dy * 4 * s], [wx - nx * 10 * s + dx * 4 * s, wy - ny * 10 * s + dy * 4 * s], [wx - nx * 10 * s - dx * 4 * s, wy - ny * 10 * s - dy * 4 * s]], true), c, { w: "detail", s })
    + L.shape(L.circ(wx, wy, 7 * s), "gold", { w: "detail", s }) + L.stroke(L.poly([[wx, wy], [wx, wy - 4 * s]]), { w: 2 }) + L.stroke(L.poly([[wx, wy], [wx + 3 * s, wy]]), { w: 2 }); } };
A.handbag = { front: true, draw(a, o) { const s = a.s, [hx, hy] = a.hands[1], c = col(o, "pink");
  return L.stroke(L.arc(hx, hy + 16 * s, 11 * s, 180, 360, 15 * s), { c: "brown", w: "char", s }) + L.shape(L.rrect(hx - 18 * s, hy + 16 * s, 36 * s, 28 * s, 7 * s), c, { w: "char", s }) +
     L.shape(L.circ(hx, hy + 24 * s, 3.4 * s), "gold", { w: "detail", s }) + L.stroke(L.line([hx - 18 * s, hy + 24 * s], [hx + 18 * s, hy + 24 * s]), { w: "detail", s }); } };
A.scarf = { draw(a, o) { const g = geo(a.sh, a.hip, a.s, a.W), c = col(o, "red"); let st = "", fr = "";
  for (let x = -22; x <= 22; x += 11) st += g.fl([[x, [0, -8]], [x + 4.5, [0, -8]], [x + 4.5, [0, 14]], [x, [0, 14]]], "white", 0.85);
  for (let x = 12; x <= 18; x += 6) fr += g.ln([[x, [0.46, 0]], [x, [0.46, 7]]], { c, w: "hair" });
  return g.poly([[7, [0, 4]], [24, [0, 4]], [27, 0.5], [9, 0.55]], c) + g.fl([[8, 0.2], [25, 0.2], [26, 0.27], [9, 0.27]], "white", 0.85) + g.box(-27, 27, [0, -8], [0, 14], c, 9) + st; } };
A.bowtie = { draw(a, o) { const g = geo(a.sh, a.hip, a.s, a.W), c = col(o, "red");
  return g.poly([[0, [0, 7]], [-19, [0, -3]], [-19, [0, 17]]], c, { w: "detail" }) + g.poly([[0, [0, 7]], [19, [0, -3]], [19, [0, 17]]], c, { w: "detail" }) + g.box(-4, 4, [0, 2], [0, 12], c, 2, { w: "detail", tone: 2 }); } };
A.earrings = { draw(a, o) { const h = head(a), c = col(o, "gold"); return [-1, 1].map((sd) => h.dot(sd * 0.95, 0.38, 0.12, c) + h.ell(sd * 0.95, 0.62, 0.08, 0.14, c)).join(""); } };
A.medal = { draw(a, o) { const g = geo(a.sh, a.hip, a.s, a.W), c = col(o, "gold");
  return g.poly([[-16, TOP], [-5, TOP], [5, 0.44], [-6, 0.44]], "blue", { w: "detail" }) + g.poly([[16, TOP], [5, TOP], [-5, 0.44], [6, 0.44]], "red", { w: "detail" }) + g.dot(0, 0.52, 11, c) + g.dot(0, 0.52, 7.5, c, { tone: 2, w: "hair" }) + L.flat(L.star(g.X(0), g.Y(0.52), 6 * a.s, 2.6 * a.s), "yellow"); } };
A.wizardhat = { front: true, draw(a, o) { const h = head(a), c = col(o, "purple");
  return h.ell(0, -0.62, 1.38, 0.24, c, { w: "char", tone: 2 }) + h.soft([[-0.85, -0.65], [-0.55, -1.6], [-0.1, -2.3], [0.45, -2.72], [0.92, -2.55], [0.55, -2.2], [0.32, -1.6], [0.78, -0.65]], c) + h.box(-0.84, 0.8, -0.86, -0.64, "gold", 0.04, { w: "detail" })
    + L.flat(L.star(h.X(-0.15), h.Y(-1.5), h.R * 0.14, h.R * 0.06), "yellow") + L.flat(L.star(h.X(0.2), h.Y(-2.0), h.R * 0.1, h.R * 0.045), "yellow"); } };
A.piratehat = { front: true, draw(a, o) { const h = head(a), c = col(o, "ink");
  return h.soft([[-1.55, -0.5], [-0.95, -1.5], [0, -1.78], [0.95, -1.5], [1.55, -0.5], [0.8, -0.74], [0, -0.8], [-0.8, -0.74]], c) + h.sln([[-1.42, -0.55], [-0.85, -1.38], [0, -1.62], [0.85, -1.38], [1.42, -0.55]], { c: "gold", w: "hair" })
    + h.dot(0, -1.25, 0.16, "white", { w: "hair" }) + h.ln([[-0.22, -1.0], [0.22, -1.1]], { c: "white", w: 3 }) + h.ln([[0.22, -1.0], [-0.22, -1.1]], { c: "white", w: 3 }); } };
A.partyhat = { front: true, draw(a, o) { const h = head(a), c = col(o, "pink");
  return h.poly([[-0.52, -0.62], [0, -2.25], [0.52, -0.62]], c) + h.fl([[-0.4, -0.95], [0.4, -0.95], [0.3, -1.25], [-0.3, -1.25]], "yellow", 0.9) + h.fl([[-0.2, -1.55], [0.2, -1.55], [0.1, -1.85], [-0.1, -1.85]], "yellow", 0.9) + h.dot(0, -2.3, 0.14, "yellow", { w: "char" }); } };
A.cowboyhat = { front: true, draw(a, o) { const h = head(a), c = col(o, "brown");
  return h.soft([[-1.75, -0.95], [-1.2, -0.56], [0, -0.46], [1.2, -0.56], [1.75, -0.95], [1.2, -0.72], [0, -0.64], [-1.2, -0.72]], c, { tone: 2 }) + h.soft([[-0.75, -0.62], [-0.8, -1.55], [-0.3, -1.36], [0.3, -1.36], [0.8, -1.55], [0.75, -0.62]], c) + h.box(-0.76, 0.76, -0.9, -0.72, "gold", 0.03, { w: "detail" }); } };
A.santahat = { front: true, draw(a, o) { const h = head(a), c = col(o, "red");
  return h.soft([[-1.0, -0.55], [-0.7, -1.5], [0, -2.0], [0.8, -1.92], [1.38, -1.5], [1.0, -0.55]], c) + h.box(-1.1, 1.1, -0.8, -0.46, "white", 0.17) + h.dot(1.42, -1.38, 0.26, "white", { w: "char" }); } };
A.helmet = { front: true, draw(a, o) { const h = head(a), d = L.circ(h.cx, h.cy, 1.38 * h.R);
  return L.flat(d, "glass", 0.28) + L.stroke(d, { c: "gray", w: "char", s: h.s }) + L.stroke(L.arc(h.cx, h.cy, 1.2 * h.R, 200, 250), { c: "white", w: 6 }) + h.ell(0, 1.2, 1.0, 0.22, col(o, "gray"), { w: "char" }); } };
A.knighthelm = { front: true, draw(a, o) { const h = head(a), c = col(o, "gray"), arc = L.arcPts(h.cx, h.Y(-0.15), 1.13 * h.R * h.kx, 180, 360, 16, 1.0 * h.R);
  return h.soft([[0, -1.1], [-0.2, -1.8], [0.2, -2.1], [0.55, -1.8], [0.15, -1.1]], "red", { w: "detail" }) + L.shape(L.smooth([...arc, ...h.P([[1.1, 0.2], [0.8, 0.3], [0.72, -0.35], [0.4, -0.52], [-0.4, -0.52], [-0.72, -0.35], [-0.8, 0.3], [-1.1, 0.2]]), arc[0]]), c, { w: "char", s: h.s })
    + h.box(-0.09, 0.09, -1.15, 0.12, c, 0.05, { w: "detail", tone: 2 }) + h.ln([[-1.0, -0.58], [-0.72, -0.5]], { w: "hair" }) + h.ln([[1.0, -0.58], [0.72, -0.5]], { w: "hair" }); } };
A.eyepatch = { front: true, draw(a, o) { const h = head(a), c = col(o, "ink");
  return h.ln([[-0.98, -0.55], [h.ex - 0.26, h.ey - 0.14]], { c, w: "prop" }) + h.ln([[h.ex + 0.2, h.ey - 0.2], [0.98, -0.5]], { c, w: "prop" }) + h.ell(h.ex, h.ey, 0.3, 0.27, c, { w: "detail" }); } };
A.necklace = { draw(a, o) { const g = geo(a.sh, a.hip, a.s, a.W), c = col(o, "gold");
  return g.sln([[-17, [0, -4]], [-11, [0, 12]], [0, [0, 20]], [11, [0, 12]], [17, [0, -4]]], { c, w: "char" }) + g.dot(0, [0, 25], 5, "red"); } };
A.nursecap = { front: true, draw(a, o) { const h = head(a), c = col(o, "white");
  return h.poly([[-0.72, -0.78], [-0.6, -1.42], [0.6, -1.42], [0.72, -0.78], [0.4, -0.7], [-0.4, -0.7]], c) + h.poly(cross(0, 0, 1).map(([x, y]) => [x * 0.04, y[1] * 0.04 - 1.1]), "red", { w: "hair" }); } };
A.strawhat = { front: true, draw(a, o) { const h = head(a), c = col(o, "sand"), arc = L.arcPts(h.cx, h.Y(-0.55), 0.9 * h.R * h.kx, 180, 360, 14, 0.72 * h.R);
  return h.ell(0, -0.56, 1.65, 0.3, c, { w: "char", tone: 2 }) + L.shape(L.smooth([...arc, arc[0]]), c, { w: "char", s: h.s }) + h.box(-0.9, 0.9, -0.8, -0.55, "red", 0.03, { w: "detail" }) + h.sln([[-0.5, -1.15], [-0.3, -0.85]], { w: "hair" }) + h.sln([[0.4, -1.2], [0.25, -0.88]], { w: "hair" }); } };
// facial hair (colour = the figure's hair colour)
const beardPts = () => { const out = [], inn = []; for (let i = 0; i <= 14; i++) { const ang = 20 + (i * 140) / 14, r = (ang * Math.PI) / 180, k = 1.05 + 0.2 * Math.exp(-(((ang - 90) / 38) ** 2)); out.push([Math.cos(r) * k, Math.sin(r) * k]); }
  for (let i = 0; i <= 14; i++) { const ang = 160 - (i * 140) / 14, r = (ang * Math.PI) / 180; inn.push([Math.cos(r) * 0.55, 0.3 + Math.sin(r) * 0.6]); } return [...out, ...inn, out[0]]; };
const MOUSTACHE = [[-0.55, 0.24], [-0.3, 0.13], [0, 0.17], [0.3, 0.13], [0.55, 0.24], [0.32, 0.29], [0, 0.23], [-0.32, 0.29]];
A.beard = { draw(a, o) { const h = head(a), c = o.beardC || a.hairC || "brown"; return L.shape(L.smooth(h.P(beardPts())), c, { w: "hair" }) + h.soft(MOUSTACHE, c, { w: "hair" }); } };
A.moustache = { draw(a, o) { const h = head(a); return h.soft(MOUSTACHE, o.beardC || a.hairC || "brown", { w: "hair" }); } };
A.stubble = { draw(a, o) { const h = head(a), r = L.rng(7); let d = "", n = 0;
  for (let i = 0; i < 400 && n < 90; i++) { const ang = ((18 + r() * 144) * Math.PI) / 180, k = 0.5 + r() * 0.5, x = Math.cos(ang) * k, y = 0.1 + Math.sin(ang) * k * 0.95; if (y < 0.22 || Math.hypot(x, y) > 0.99 || (x / 0.46) ** 2 + ((y - 0.55) / 0.34) ** 2 < 1) continue; d += L.circ(h.X(x), h.Y(y), Math.max(1.1, h.R * 0.028)); n++; }
  return L.flat(d, "ink", 0.5); } };

// ================= REGISTRATION =================
const BOX = [-135, -455, 270, 465], HEAD = [-130, -440, 260, 230], HEAD2 = [-140, -470, 280, 260], TORSO = [-135, -375, 270, 320], HAIRBOX = [-125, -430, 250, 200];
const reg = (name, group, label, d, box, tags, call) => L.reg(CAT, name, (o) => L.person(Object.assign({}, d, o)), { box, group, label, tags: ["person", ...tags], call, demo: d });
const put = (o) => `L.put(S, "person", x, gy, { ${o}, t })`;

// ---- body types ----
const BSTYLE = { regular: "man01", muscular: "man01", skinny: "man01", chubby: "man01", tall: "girl01", short: "man01", kid: "girl01", teen: "man01", elderly: "man01", baby: "man01" };
const BPOSE = { muscular: "hips" };
Object.keys(L.BODIES).forEach((k) => reg("body-" + k, "Body types", "Body · " + k, { style: BSTYLE[k] || "man01", body: k, pose: BPOSE[k] || "stand" }, BOX, ["body", k], put(`style: "${BSTYLE[k] || "man01"}", body: "${k}"`)));
L.reg(CAT, "body-family", (o) => {
  const row = [["elderly", "man01", -430, {}], ["regular", "man01", -295, {}], ["regular", "girl01", -160, { hair: "bob" }], ["teen", "girl01", -40, { hair: "pigtails" }], ["kid", "man01", 50, {}], ["kid", "girl01", 125, { hair: "pixie" }], ["baby", "man01", 185, { hair: "tick" }], ["muscular", "man01", 300, { pose: "hips" }], ["chubby", "girl01", 450, {}]];
  return row.map(([b, st, x, ex]) => L.g(L.inline("person", Object.assign({ style: st, body: b }, ex)), `translate(${x} 0)`)).join("");
}, { box: [-560, -400, 1120, 420], group: "Family line-up", label: "Body · family line-up", wide: true, tags: ["person", "body", "group"], call: put('style: "man01", body: "elderly" | "regular" | "teen" | "kid" | "baby"') + "  // one person per body" });

// ---- skin tones (head filled with the skin colour: look token head.fill = "skin") ----
for (let i = 1; i <= 6; i++) {
  const st = i % 2 ? "man01" : "girl01", d = { style: st, skin: "s" + i, pose: "wave", face: "happy" };
  L.reg(CAT, "skin-s" + i, (o) => L.useLook(Object.assign({}, L.T, { head: Object.assign({}, L.T.head, { fill: "skin" }) }), () => L.person(Object.assign({}, d, o))),
    { box: [-130, -400, 260, 280], group: "Skin tones", label: "Skin · s" + i + (i === 1 ? " (lightest)" : i === 6 ? " (deepest)" : ""), tags: ["person", "skin"], demo: d,
      call: `L.put(S, "person", x, gy, { style: "${st}", skin: "s${i}", look: { head: { fill: "skin" } }, t })` });
}

// ---- outfits ----
const OUT = [
  ["tee", "man01", "blue", "T-shirt (base)"], ["hoodie", "man01", "orange", "Hoodie (base)"], ["dress", "girl01", "red", "Dress (base)"], ["skirt", "girl06", "green", "Skirt (base)"],
  ["suit", "man01", "navy", "Suit + tie"], ["labcoat", "girl01", "white", "Lab coat"], ["doctor", "man01", "teal", "Doctor scrubs"], ["nurse", "girl01", "white", "Nurse"],
  ["astronaut", "man01", "white", "Astronaut suit"], ["chef", "man01", "white", "Chef", ["chefhat"]], ["builder", "man01", "gray", "Builder, hi-vis vest", ["hardhat"]], ["farmer", "man01", "red", "Farmer, overalls", ["strawhat"]],
  ["athlete", "girl01", "red", "Athlete, jersey + shorts"], ["pyjamas", "man01", "purple", "Pyjamas"], ["caveman", "man01", "orange", "Caveman tunic"], ["king", "man01", "red", "King robe", ["crown"]],
  ["queen", "girl01", "purple", "Queen gown", ["crown"]], ["pirate", "man01", "white", "Pirate", ["piratehat"]], ["knight", "man01", "gray", "Knight armour", ["knighthelm"]], ["wizard", "man01", "purple", "Wizard robe", ["wizardhat"]],
  ["student", "girl01", "white", "Student uniform"], ["office", "man01", "sky", "Office shirt"], ["sweater", "girl01", "red", "Sweater"], ["jacket", "man01", "green", "Bomber jacket"],
  ["raincoat", "girl01", "yellow", "Raincoat"], ["superhero", "man01", "blue", "Superhero"], ["striped", "man01", "white", "Striped tee"], ["hawaiian", "man01", "teal", "Hawaiian shirt"], ["overcoat", "girl01", "gray", "Overcoat"],
];
OUT.forEach(([k, st, c, label, acc]) => { const d = Object.assign({ style: st, outfit: k, outfitC: c }, acc ? { acc } : {}), a = acc ? `, acc: ${JSON.stringify(acc)}` : "";
  reg("outfit-" + k, "Outfits", "Outfit · " + label, d, BOX, ["outfit", "clothes", k], put(`style: "${st}", outfit: "${k}", outfitC: "${c}"${a}`)); });

// ---- hair ----
const HR = [
  ["short", "man01", "brown", "Short"], ["side", "man01", "brown", "Side swept"], ["curly", "man03", "brown", "Curly"], ["messy", "man04", "gold", "Messy"], ["spiky", "man05", "ink", "Spiky"], ["bun", "girl01", "brown", "Bun"],
  ["ponytail", "girl02", "red", "Ponytail"], ["bob", "girl03", "ink", "Bob"], ["long", "girl04", "gold", "Long"], ["curlyLong", "girl05", "brown", "Long curly"], ["braids", "girl06", "ink", "Braids"],
  ["pixie", "girl07", "red", "Pixie"], ["hijab", "girl08", "blue", "Hijab"], ["puffs", "girl09", "ink", "Afro puffs"], ["pigtails", "girl03", "brown", "Pigtails"],
  ["bald", "man01", "brown", "Bald"], ["buzz", "man01", "ink", "Buzz cut"], ["afro", "man01", "ink", "Afro"], ["mohawk", "man01", "pink", "Mohawk"], ["quiff", "man01", "brown", "Quiff"],
  ["manbun", "man01", "brown", "Man bun"], ["sidepart", "man01", "ink", "Side part"], ["wavy", "girl01", "gold", "Wavy"], ["highTail", "girl01", "brown", "High ponytail"], ["spaceBuns", "girl01", "ink", "Space buns"],
  ["bowl", "man01", "brown", "Bowl cut"], ["bangsLong", "girl01", "brown", "Long with bangs"],
];
const kebab = (k) => k.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());
HR.forEach(([k, st, c, label]) => reg("hair-" + kebab(k), "Hair", "Hair · " + label, { style: st, hair: k, hairC: c }, HAIRBOX, ["hair", k], put(`style: "${st}", hair: "${k}", hairC: "${c}"`)));
[["beard", "man01", "brown", "Beard + moustache"], ["moustache", "man01", "ink", "Moustache"], ["stubble", "man01", "ink", "Stubble"]].forEach(([k, st, c, label]) => { const d = { style: st, hairC: c, acc: [k], hair: "short" };
  reg("hair-" + k, "Hair", "Facial hair · " + label, d, HAIRBOX, ["hair", "facial", k], put(`style: "${st}", hairC: "${c}", acc: ["${k}"]`)); });

// ---- accessories (the demo figure differs per tile, so every cast style is exercised) ----
const ACCS = [
  ["glasses", "man03", HEAD, "Glasses"], ["sunglasses", "man01", HEAD, "Sunglasses"], ["cap", "man10", HEAD2, "Baseball cap"], ["beanie", "girl05", HEAD, "Beanie"], ["tophat", "man01", HEAD2, "Top hat"],
  ["crown", "girl01", HEAD, "Crown"], ["chefhat", "man03", HEAD2, "Chef hat"], ["hardhat", "man01", HEAD, "Hard hat"], ["headphones", "girl05", HEAD, "Headphones"], ["backpack", "man01", TORSO, "Backpack"],
  ["watch", "man03", TORSO, "Wristwatch"], ["handbag", "girl01", TORSO, "Handbag"], ["scarf", "man01", TORSO, "Scarf"], ["bowtie", "man10", TORSO, "Bow tie"], ["earrings", "girl01", HEAD, "Earrings"],
  ["medal", "man01", TORSO, "Medal"], ["wizardhat", "man01", HEAD2, "Wizard hat"], ["piratehat", "man03", HEAD2, "Pirate hat"], ["partyhat", "girl05", HEAD2, "Party hat"], ["cowboyhat", "man01", HEAD2, "Cowboy hat"],
  ["santahat", "man10", HEAD2, "Santa hat"], ["helmet", "man01", HEAD2, "Space helmet"], ["knighthelm", "man03", HEAD2, "Knight helmet"], ["eyepatch", "man01", HEAD, "Eye patch"], ["necklace", "girl01", TORSO, "Necklace"],
  ["nursecap", "girl05", HEAD, "Nurse cap"], ["strawhat", "man01", HEAD2, "Straw hat"],
];
ACCS.forEach(([k, st, box, label]) => reg("acc-" + k, "Accessories", "Accessory · " + label, { style: st, acc: [k], pose: k === "watch" ? "wave" : "stand" }, box, ["accessory", k], put(`style: "${st}", acc: ["${k}"], accC: "red"`)));
})();
