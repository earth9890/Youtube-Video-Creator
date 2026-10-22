// ===================== library/food.js — food and nutrition for "what if you ate…" episodes (category "food") =====================
// Floating things: origin = centre (~170 px across). Plated meals and builders are wider (wide: true, box 280 x 220).
// Every asset: L.put(S, "food-<name>", x, y, { s, t, ...options }). Options are listed on each call line.
(function () {
const L = window.L, f1 = L.f1;
const sh = L.shape, st = L.stroke, fl = L.flat, rr = L.rrect, ci = L.circ, po = L.poly, sm = L.smooth, g = L.g;
const A = (...a) => a.join(""), D = { w: "detail" };
const gl = (d, op = 0.5) => fl(d, "white", op);   // glint
const dk = (d, op = 0.16) => fl(d, "ink", op);    // soft shade
const eo = (s) => s.replace("<path ", '<path fill-rule="evenodd" '); // even-odd: real holes
const ring = (cx, cy, R, r, c, o) => eo(sh(ci(cx, cy, R) + ci(cx, cy, r), c, o));
const dot = (x, y, r, c, o) => sh(ci(x, y, r), c, o);
const ln = (a, b, o) => st(L.line(a, b), o || D);
const pick = (o, k, d) => (o[k] === undefined ? d : o[k]);
const col = (o, d) => (L.BASE[o.color] ? o.color : d);
const deg = (a) => (a * Math.PI) / 180;
const sc = (pts, k, dx = 0, dy = 0) => pts.map(([x, y]) => [x * k + dx, y * k + dy]);
const tube = (d, c, w = 8) => {
  const oc = L.outline(c), base = { d, fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round" };
  return (oc === "none" ? "" : L.tag("path", Object.assign({ stroke: oc, "stroke-width": w + 2 * L.lw("detail") }, base))) + L.tag("path", Object.assign({ stroke: L.c(c), "stroke-width": w }, base));
};
// solid fill + features clipped inside + outline on top
const solid = (d, c, inner = "", o = {}) => {
  const id = "fdc" + (L._n = (L._n || 0) + 1), ol = o.oc || L.outline(c);
  return L.tag("path", { d, fill: L.paint(c, o) }) + (inner ? `<clipPath id="${id}"><path d="${d}"/></clipPath><g clip-path="url(#${id})">${inner}</g>` : "") +
    (ol === "none" ? "" : L.tag("path", { d, fill: "none", stroke: ol, "stroke-width": L.lw(o.w || "prop", o.s || 1), "stroke-linejoin": L.T.join, "stroke-linecap": L.T.cap }));
};
const clipTo = (d, inner) => { const id = "fdc" + (L._n = (L._n || 0) + 1); return `<clipPath id="${id}"><path d="${d}"/></clipPath><g clip-path="url(#${id})">${inner}</g>`; };
// a thick soft line without the look's outline (shading bands, stripes, grill marks), colour tone by number
const band = (d, c, tone, w, op) => L.tag("path", { d, fill: "none", stroke: L.c(c, tone), "stroke-width": w, "stroke-linecap": "round", "stroke-linejoin": "round", opacity: op });
const steam = (x, y) => st(sm([[x, y], [x - 8, y - 14], [x + 8, y - 28], [x, y - 42]]), { c: "gray", w: 5, op: 0.55 });
const closed = (pts) => sm([...pts, pts[0]]);
const ell = (cx, cy, rx, ry, n = 24) => closed(Array.from({ length: n }, (_, i) => [cx + Math.cos(deg((360 * i) / n)) * rx, cy + Math.sin(deg((360 * i) / n)) * ry]));
// pie wedge path (angles in degrees, y down)
const pie = (cx, cy, r, a0, a1) => { const p = (a) => [cx + r * Math.cos(deg(a)), cy + r * Math.sin(deg(a))], [x0, y0] = p(a0), [x1, y1] = p(a1); return `M${f1(cx)} ${f1(cy)} L${f1(x0)} ${f1(y0)} A${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${f1(x1)} ${f1(y1)} Z`; };

const reg = (group, name, label, fn, meta = {}) => {
  const { tags = [], demo, wide, ...rest } = meta;
  const opts = Object.entries(demo || {}).map(([k, v]) => `, ${k}: ${JSON.stringify(v)}`).join("");
  L.reg("food", "food-" + name, fn, Object.assign({ group, label, demo: demo || {}, wide, tags: [label.toLowerCase(), group.toLowerCase(), "food", ...tags],
    box: wide ? [-150, -115, 300, 230] : [-110, -110, 220, 220], call: `L.put(S, "food-${name}", x, y, { s: 1${opts}, t })` }, rest));
};
const variants = (group, name, label, fn, list, meta = {}) => list.forEach(([key, demo, lab]) => reg(group, name + "-" + key, label + " · " + (lab || key), fn, Object.assign({}, meta, { demo })));

// ============================ FRUIT ============================
reg("Fruit", "mango", "Mango", () => A(
  solid(sm([[-54, -6], [-34, -46], [10, -58], [50, -38], [62, 2], [40, 46], [-6, 58], [-44, 38], [-54, -6]]), "yellow", A(
    fl(sm([[70, -20], [64, 54], [-10, 66], [-30, 44], [20, 36], [44, 6], [70, -20]]), "orange", 0.7),
    fl(sm([[70, 10], [60, 56], [20, 62], [40, 36], [70, 10]]), "red", 0.35))),
  sh(sm([[-2, -52], [12, -84], [46, -88], [40, -62], [10, -50]]), "green", D), st("M10 -56 Q22 -70 38 -78", { c: "green", w: "detail", op: 0.6 }),
  gl(sm([[-46, -4], [-36, -34], [-12, -48], [-26, -22], [-40, 6], [-46, -4]]), 0.55)), { tags: ["fruit", "tropical", "sweet"] });

const avoPts = [[0, -66], [26, -56], [44, -20], [56, 24], [44, 60], [0, 72], [-44, 60], [-56, 24], [-44, -20], [-26, -56], [0, -66]];
reg("Fruit", "avocado-half", "Avocado half", (o) => A(
  sh(sm(avoPts), "green", { tone: 2 }),
  sh(sm(sc(avoPts, 0.86, 0, 3)), "grass", { tone: 1, w: "detail" }),
  fl(sm(sc(avoPts, 0.6, 0, 10)), "yellow", 0.5),
  o.pit === false ? "" : A(sh(ci(0, 28, 24), "brown"), gl(sm([[-14, 18], [-6, 8], [4, 8], [-6, 18], [-14, 18]]), 0.45)),
  gl(sm([[-36, 6], [-30, -22], [-14, -40], [-24, -14], [-30, 14], [-36, 6]]), 0.4)), { demo: { pit: true }, tags: ["fruit", "healthy fat", "guacamole", "green"] });
reg("Fruit", "avocado-whole", "Avocado", () => A(
  solid(sm(avoPts), "green", A(fl(sm([[60, 20], [40, 74], [-10, 76], [-30, 40], [20, 36], [60, 20]]), "ink", 0.2),
    ...[[-10, -20], [14, 0], [-20, 20], [20, 34], [-4, 46], [-24, -2]].map(([x, y]) => fl(ci(x, y, 2.4), "ink", 0.25)))),
  gl(sm([[-38, 4], [-32, -24], [-14, -42], [-26, -14], [-32, 12], [-38, 4]]), 0.4)), { tags: ["fruit", "healthy fat", "green", "guacamole"] });

reg("Fruit", "kiwi-half", "Kiwi half", () => A(
  sh(ci(0, 0, 60, 54), "brown", { tone: 1 }),
  sh(ci(0, 0, 52, 46), "grass", { tone: 1, w: "detail" }),
  ...Array.from({ length: 14 }, (_, i) => { const a = deg((360 * i) / 14); return st(L.line([Math.cos(a) * 22, Math.sin(a) * 19], [Math.cos(a) * 46, Math.sin(a) * 41]), { c: "cream", w: 2, op: 0.55 }); }),
  sh(ci(0, 0, 18, 15), "cream", D),
  ...Array.from({ length: 12 }, (_, i) => { const a = deg((360 * i) / 12 + 8); return fl(ci(Math.cos(a) * 26, Math.sin(a) * 22, 3, 2), "ink", 0.85); }),
  gl(sm([[-40, -16], [-30, -34], [-12, -42], [-26, -26], [-40, -16]]), 0.4)), { tags: ["fruit", "green", "vitamin c"] });

reg("Fruit", "peach", "Peach", () => A(
  solid(sm([[0, -46], [30, -54], [56, -30], [60, 10], [38, 50], [0, 58], [-38, 50], [-60, 10], [-56, -30], [-30, -54], [0, -46]]), "orange", A(
    fl(sm([[70, -10], [50, 64], [-10, 70], [10, 30], [40, 10], [70, -10]]), "pink", 0.85), fl(ci(-30, -10, 34), "yellow", 0.35))),
  st("M0 -46 Q-12 -6 0 40", { c: "orange", w: "detail", op: 0.8 }),
  sh(sm([[2, -48], [22, -76], [54, -72], [44, -52], [16, -44]]), "green", D), tube("M2 -46 L-2 -62", "brown", 5),
  gl(sm([[-48, -14], [-42, -36], [-26, -46], [-34, -26], [-46, -6], [-48, -14]]), 0.55)), { tags: ["fruit", "stone fruit", "summer"] });

reg("Fruit", "blueberries", "Blueberries", () => {
  const b = ([x, y, r]) => A(sh(ci(x, y, r), "blue", { tone: 0 }), fl(L.star(x + r * 0.15, y - r * 0.1, r * 0.26, r * 0.12, 5), "navy", 0.7), gl(ci(x - r * 0.4, y - r * 0.45, r * 0.18, r * 0.12), 0.7));
  return A(...[[0, -34, 26], [-34, 0, 27], [34, 2, 26], [-62, 36, 24], [-18, 34, 28], [28, 40, 27], [64, 38, 22]].map(b)); }, { tags: ["fruit", "berry", "small", "pile"] });

reg("Fruit", "coconut-half", "Coconut half", () => A(
  sh(ci(0, 0, 64, 58), "brown", { tone: 1 }),
  sh(ci(0, 4, 54, 49), "white", D),
  sh(ci(0, 8, 40, 36), "cream", { w: "detail", tone: 2 }),
  fl(ci(-8, 0, 26, 18), "glass", 0.7),
  gl(sm([[-44, -10], [-32, -34], [-12, -44], [-26, -24], [-40, -2], [-44, -10]]), 0.45)), { tags: ["fruit", "tropical", "nut", "beach"] });

const banana = () => A(
  sh(sm([[-64, -14], [-52, 26], [-20, 52], [22, 54], [56, 34], [74, -4], [68, -30], [58, -6], [34, 22], [0, 30], [-30, 10], [-48, -20], [-64, -14]]), "yellow"),
  sh(sm([[-66, -20], [-60, -8], [-50, -14], [-52, -24], [-66, -20]]), "brown", D),
  sh(sm([[64, -26], [74, -36], [82, -26], [70, -14]]), "green", D),
  gl(sm([[-40, 14], [-24, 38], [4, 44], [-18, 34], [-40, 14]]), 0.55));
reg("Fruit", "banana-bunch", "Banana bunch", () => A(
  g(banana(), "translate(-4 0) rotate(-24 68 -30) scale(0.86)"), g(banana(), "translate(-4 8) rotate(-4 68 -30) scale(0.86)"), g(banana(), "translate(-4 14) rotate(16 68 -30) scale(0.86)"),
  sh(sm([[56, -42], [76, -48], [90, -36], [86, -16], [64, -18], [56, -42]]), "green", { tone: 2, w: "detail" })), { tags: ["fruit", "bananas", "yellow", "potassium"] });

const appleD = [[0, -44], [30, -56], [58, -30], [60, 14], [36, 54], [0, 48], [-36, 54], [-60, 14], [-58, -30], [-30, -56], [0, -44]];
reg("Fruit", "apple-half", "Apple cut in half", () => A(
  solid(sm(appleD), "red", A(fl(sm(sc(appleD, 0.88)), "cream", 1))),
  sh(ci(0, 4, 13, 24), "cream", { tone: 2, w: "detail" }),
  ...[[-4, -4], [4, -4], [-4, 12], [4, 12]].map(([x, y]) => fl(ci(x, y, 3, 5), "brown")),
  tube("M0 -44 Q4 -62 14 -70", "brown", 6),
  gl(sm([[-48, -18], [-42, -38], [-26, -48], [-34, -28], [-46, -8], [-48, -18]]), 0.5)), { tags: ["fruit", "red", "slice"] });
reg("Fruit", "apple-core", "Apple core", () => A(
  sh(po([[-18, -54], [-8, -46], [0, -54], [8, -46], [18, -54], [22, -22], [14, 0], [22, 24], [18, 54], [8, 46], [0, 54], [-8, 46], [-18, 54], [-22, 24], [-14, 0], [-22, -22]], true), "cream"),
  ...[[-5, -6], [5, -6], [0, 12]].map(([x, y]) => fl(ci(x, y, 3, 5), "brown")),
  tube("M0 -50 Q4 -68 14 -76", "brown", 6),
  gl(sm([[-16, -40], [-14, -14], [-8, -34], [-16, -40]]), 0.6)), { tags: ["fruit", "eaten", "leftover", "bite"] });

reg("Fruit", "watermelon-whole", "Watermelon", () => {
  const body = ell(0, 0, 82, 62);
  return A(solid(body, "green", A(...[-4, -3, -2, -1, 0, 1, 2, 3, 4].map((i) => band(`M${i * 20} -70 Q${i * 30} 0 ${i * 20} 70`, "green", 2, 8, 0.75)), fl(ci(-40, -26, 46, 26), "white", 0.18), fl(ci(50, 40, 70, 40), "ink", 0.12))),
    gl(sm([[-62, -22], [-50, -42], [-26, -54], [-42, -34], [-60, -8], [-62, -22]]), 0.5), tube("M0 -60 L4 -76", "brown", 5)); }, { tags: ["fruit", "summer", "melon", "big"] });

reg("Fruit", "fruit-bowl", "Fruit bowl", () => g(A(
  g(banana(), "translate(20 -58) scale(0.7)"), dot(-34, -40, 32, "red", {}), dot(30, -36, 30, "orange", {}), tube("M-34 -70 L-30 -84", "brown", 5),
  ...[[-8, -70], [8, -78], [-2, -90], [16, -64]].map(([x, y]) => dot(x, y, 11, "purple", D)),
  gl(ci(-46, -52, 7, 5), 0.6), gl(ci(18, -48, 7, 5), 0.6),
  sh(sm([[-82, -6], [82, -6], [70, 40], [38, 66], [-38, 66], [-70, 40], [-82, -6]]), "teal"),
  sh(rr(-88, -14, 176, 16, 8), "teal", { tone: 1 }),
  gl(sm([[-70, 10], [-60, 38], [-40, 54], [-52, 26], [-70, 10]]), 0.5)), "translate(0 14)"), { wide: false, tags: ["fruit", "healthy", "bowl", "kitchen"] });

// ============================ VEGETABLES ============================
variants("Vegetables", "onion", "Onion", (o) => { const c = col(o, "purple"); return A(
  sh(sm([[0, -50], [18, -40], [50, -8], [56, 26], [34, 56], [0, 62], [-34, 56], [-56, 26], [-50, -8], [-18, -40], [0, -50]]), c, { tone: c === "purple" ? 1 : 0 }),
  clipTo(sm([[0, -50], [18, -40], [50, -8], [56, 26], [34, 56], [0, 62], [-34, 56], [-56, 26], [-50, -8], [-18, -40], [0, -50]]),
    A(band("M0 -44 Q-44 6 -4 62", c, 2, 3, 0.6), band("M0 -44 Q38 10 6 62", c, 2, 3, 0.6), band("M0 -44 Q-20 8 -2 62", c, 2, 3, 0.5), band("M0 -44 Q14 10 2 62", c, 2, 3, 0.5))),
  sh(po([[-8, -44], [-4, -70], [4, -70], [8, -44]], true), "earth", D),
  ...[-12, 0, 12].map((x) => st(`M${x} 60 l${x / 3} 10`, { c: "earth", w: 2 })),
  gl(sm([[-44, 2], [-38, -22], [-22, -34], [-30, -12], [-40, 12], [-44, 2]]), 0.5)); },
  [["red", { color: "purple" }, "red"], ["brown", { color: "earth" }, "brown"]], { tags: ["vegetable", "cooking", "cry", "bulb"] });

const chilliD = sm([[-56, -34], [-30, -44], [0, -24], [30, 16], [56, 56], [68, 78], [34, 68], [2, 44], [-30, 6], [-52, -14], [-56, -34]]);
const chilliCap = sh(sm([[-64, -44], [-48, -56], [-30, -52], [-34, -30], [-54, -26], [-64, -44]]), "green", D);
variants("Vegetables", "chilli", "Chilli", (o) => { const c = col(o, "red"); return g(A(
  g(A(sh(chilliD, c, { tone: 2 }), chilliCap), "translate(46 -6) rotate(10) scale(0.8)"),
  g(A(sh(chilliD, c), chilliCap, tube("M-58 -48 Q-66 -66 -52 -78", "green", 7),
    gl(sm([[-44, -34], [-26, -38], [-4, -18], [-26, -24], [-44, -34]]), 0.55)), "translate(-14 -2) scale(0.92)")), "translate(-6 4)"); },
  [["red", { color: "red" }, "red"], ["green", { color: "green" }, "green"]], { tags: ["vegetable", "spicy", "hot", "pepper"] });

reg("Vegetables", "pea-pod", "Pea pod", () => A(
  sh(sm([[-74, 2], [-40, -26], [10, -32], [60, -20], [78, -4], [50, 20], [0, 30], [-48, 24], [-74, 2]]), "green"),
  fl(sm([[-62, 2], [-34, -16], [10, -22], [56, -12], [64, -4], [40, 10], [0, 18], [-40, 14], [-62, 2]]), "grass", 1),
  ...[-44, -20, 4, 28, 50].map((x, i) => A(dot(x, -2 + (i % 2) * 2, 14, "grass", { tone: 1 }), gl(ci(x - 4, -8, 4, 3), 0.7))),
  st("M-74 2 Q-90 -10 -84 -28 Q-80 -34 -72 -30", { c: "green", w: "detail" }),
  dot(-20, 58, 14, "grass", { tone: 1 }), dot(14, 66, 14, "grass", { tone: 1 }), gl(ci(-24, 53, 4, 3), 0.7), gl(ci(10, 61, 4, 3), 0.7)), { tags: ["vegetable", "green", "peas", "legume"] });

reg("Vegetables", "spinach", "Spinach leaves", () => {
  const leaf = (c, t) => A(tube("M0 60 L0 84", "green", 6), sh(sm([[0, -60], [26, -40], [34, -4], [18, 34], [0, 52], [-18, 34], [-34, -4], [-26, -40], [0, -60]]), c, { tone: t }), st("M0 48 L0 -44 M0 -8 L16 -22 M0 -8 L-16 -22 M0 18 L12 6 M0 18 L-12 6", { c: "grass", w: 2, op: 0.7 }), gl(sm([[-22, -30], [-10, -48], [-4, -34], [-20, -10], [-22, -30]]), 0.3));
  return g(A(g(leaf("green", 2), "translate(0 20) rotate(-34 0 80) scale(0.8)"), g(leaf("green", 2), "translate(0 20) rotate(34 0 80) scale(0.8)"), g(leaf("green", 0), "translate(0 20) scale(0.9)")), "translate(0 -12)"); }, { tags: ["vegetable", "leafy", "green", "popeye", "iron"] });

reg("Vegetables", "cucumber", "Cucumber", () => A(
  g(solid(rr(-84, -24, 168, 48, 24), "green", A(...[-60, -30, 0, 30, 60].map((x) => band(`M${x} -22 L${x + 8} 22`, "grass", 1, 6, 0.55)), fl(rr(-84, 6, 168, 22, 10), "ink", 0.14))) + gl(rr(-70, -18, 120, 8, 4), 0.45), "translate(-6 -22) rotate(-14)"),
  sh(ci(50, 50, 30), "green", { tone: 2 }), sh(ci(50, 50, 24), "grass", { tone: 1, w: "detail" }), sh(ci(50, 50, 11), "cream", D),
  ...Array.from({ length: 6 }, (_, i) => fl(ci(50 + Math.cos(deg(i * 60)) * 17, 50 + Math.sin(deg(i * 60)) * 17, 2.2), "cream"))), { tags: ["vegetable", "salad", "green", "slice"] });

variants("Vegetables", "bell-pepper", "Bell pepper", (o) => { const c = col(o, "red"); return A(
  solid(sm([[-44, -30], [-20, -44], [0, -36], [20, -44], [44, -30], [56, 10], [44, 48], [20, 62], [0, 56], [-20, 62], [-44, 48], [-56, 10], [-44, -30]]), c, A(
    band("M-14 -38 Q-24 10 -14 58", c, 2, 3, 0.45), band("M16 -38 Q26 10 16 58", c, 2, 3, 0.45), fl(ci(46, 30, 44, 50), "ink", 0.1))),
  sh(sm([[-14, -40], [-8, -50], [8, -50], [14, -40], [0, -34], [-14, -40]]), "green", D), tube("M0 -48 Q2 -62 10 -70", "green", 8),
  gl(sm([[-46, -8], [-40, -28], [-26, -36], [-32, -14], [-42, 8], [-46, -8]]), 0.55)); },
  [["red", { color: "red" }, "red"], ["yellow", { color: "yellow" }, "yellow"], ["green", { color: "green" }, "green"]], { tags: ["vegetable", "capsicum", "pepper"] });

reg("Vegetables", "mushroom", "Mushroom", () => A(
  sh(rr(-20, -6, 40, 66, 16), "cream"), fl(rr(2, 0, 16, 60, 8), "ink", 0.1),
  sh(sm([[-66, 2], [-56, -30], [-24, -52], [22, -52], [54, -30], [66, 2], [40, 12], [-40, 12], [-66, 2]]), "earth", { tone: 0 }),
  ...[[-30, -26, 7], [8, -34, 8], [34, -14, 6], [-8, -10, 5]].map(([x, y, r]) => fl(ci(x, y, r, r * 0.8), "cream", 0.75)),
  gl(sm([[-56, -8], [-48, -30], [-28, -44], [-38, -24], [-54, -2], [-56, -8]]), 0.45)), { tags: ["vegetable", "fungi", "edible", "brown"] });

reg("Vegetables", "eggplant", "Eggplant", () => A(
  solid(sm([[-56, -40], [-30, -38], [0, -14], [34, 14], [50, 44], [34, 66], [0, 64], [-34, 40], [-52, 0], [-64, -26], [-56, -40]]), "purple", fl(sm([[70, 20], [60, 80], [0, 70], [20, 30], [70, 20]]), "ink", 0.2)),
  sh(sm([[-72, -40], [-52, -60], [-34, -46], [-24, -28], [-48, -22], [-62, -26], [-72, -40]]), "green", D), tube("M-60 -54 Q-66 -72 -52 -80", "green", 7),
  gl(sm([[-50, -24], [-34, -30], [-6, -2], [-30, -8], [-50, -24]]), 0.5)), { tags: ["vegetable", "aubergine", "purple", "brinjal"] });

reg("Vegetables", "garlic", "Garlic bulb", () => A(
  solid(sm([[0, -60], [14, -38], [44, -20], [54, 18], [34, 52], [0, 58], [-34, 52], [-54, 18], [-44, -20], [-14, -38], [0, -60]]), "paper", A(
    band("M0 -40 Q-40 8 -10 56", "pink", 1, 3, 0.7), band("M0 -40 Q40 8 10 56", "pink", 1, 3, 0.7), band("M0 -40 Q-14 8 0 56", "pink", 1, 3, 0.6), fl(ci(40, 30, 40, 50), "ink", 0.08))),
  ...[-10, 0, 10].map((x) => st(`M${x} 56 l${x / 4} 8`, { c: "earth", w: 2 })),
  gl(sm([[-44, 4], [-38, -18], [-22, -32], [-30, -10], [-40, 12], [-44, 4]]), 0.7)), { tags: ["vegetable", "seasoning", "clove", "cooking"] });

reg("Vegetables", "pumpkin", "Pumpkin", () => A(
  solid(ell(0, 4, 74, 56), "orange", A(
    ...[-40, -20, 0, 20, 40].map((x) => band(`M${x * 0.5} -50 Q${x * 1.7} 4 ${x * 0.5} 58`, "orange", 2, 3, 0.55)), fl(ci(46, 36, 60, 40), "ink", 0.1))),
  sh(sm([[-8, -50], [-6, -72], [8, -74], [10, -50]]), "green", { tone: 2, w: "detail" }),
  gl(sm([[-56, -8], [-46, -32], [-24, -44], [-36, -22], [-52, 4], [-56, -8]]), 0.5)), { tags: ["vegetable", "orange", "autumn", "gourd"] });

reg("Vegetables", "lettuce", "Lettuce head", () => {
  const pts = Array.from({ length: 33 }, (_, i) => { const a = deg(i * 11.25), r = 62 + 7 * Math.sin(a * 8); return [Math.cos(a) * r, Math.sin(a) * r * 0.92]; });
  return A(sh(sm([...pts.slice(0, 32), pts[0]]), "green", { tone: 1 }),
    sh(sm([[0, 52], [-34, 20], [-30, -30], [0, -50], [30, -30], [34, 20], [0, 52]]), "grass", { tone: 1, w: "detail" }),
    st("M0 52 L0 -40 M0 20 L-22 -4 M0 20 L22 -4 M0 -6 L-14 -24 M0 -6 L14 -24", { c: "green", w: 2, op: 0.5 }),
    st("M-54 10 Q-40 -10 -50 -30 M54 10 Q40 -10 50 -30", { c: "green", w: 2, op: 0.5 }),
    gl(sm([[-52, -22], [-40, -44], [-20, -54], [-34, -34], [-50, -10], [-52, -22]]), 0.35)); }, { tags: ["vegetable", "salad", "leafy", "green"] });

reg("Vegetables", "veg-basket", "Vegetable basket", () => g(A(
  st("M-70 -14 C-70 -118 70 -118 70 -14", { c: "wood", w: 11 }), st("M-70 -14 C-70 -118 70 -118 70 -14", { c: "wood", w: 5, op: 0 }),
  // carrots (two, leaning out, leafy tops)
  g(A(tube("M-6 -92 L-10 -116", "green", 7), tube("M0 -92 L8 -118", "green", 7), sh(po([[-14, -92], [14, -92], [0, -4]], true), "orange"), st("M-8 -76 l9 -2 M-6 -56 l8 -2 M-3 -36 l6 -2", { c: "ink", w: 2, op: 0.3 })), "translate(-50 -4) rotate(-16)"),
  g(A(tube("M-6 -88 L-8 -112", "green", 7), sh(po([[-14, -88], [14, -88], [0, -4]], true), "orange", { tone: 1 }), st("M-6 -70 l8 -2 M-4 -48 l7 -2", { c: "ink", w: 2, op: 0.3 })), "translate(-24 -6) rotate(8)"),
  // broccoli
  tube("M34 -4 L36 -64", "grass", 16), ...[[18, -78, 22], [40, -88, 24], [58, -72, 20], [36, -66, 20]].map(([x, y, r]) => dot(x, y, r, "green", D)),
  // corn
  g(A(sh(sm([[-10, -4], [-14, -50], [0, -70], [14, -50], [10, -4], [-10, -4]]), "yellow"), st("M-4 -64 V-6 M4 -64 V-6 M-10 -48 H10 M-11 -30 H11 M-10 -14 H10", { c: "orange", w: 1.6, op: 0.5 }), sh(sm([[-12, -4], [-30, -50], [-8, -30], [-12, -4]]), "grass", D)), "translate(8 -6) rotate(4)"),
  // eggplant + tomato + pepper in front of the rim
  sh(sm([[-58, -34], [-40, -50], [-28, -38], [-34, -14], [-52, -12], [-58, -34]]), "purple"), sh(sm([[-46, -48], [-40, -58], [-34, -46]]), "green", D),
  dot(-2, -26, 30, "red"), sh(sm([[-14, -50], [-2, -60], [10, -50], [-2, -44]]), "green", D), gl(ci(-12, -34, 6, 9), 0.55),
  dot(48, -22, 22, "yellow"), gl(ci(41, -28, 5, 7), 0.5),
  // basket body, rim in front of the produce
  sh(sm([[-86, -6], [86, -6], [76, 52], [62, 70], [-62, 70], [-76, 52], [-86, -6]]), "wood"),
  st("M-82 14 H82 M-76 36 H76 M-66 56 H66", { c: "ink", w: 2, op: 0.25 }), st("M-44 -4 L-48 66 M0 -4 V68 M44 -4 L48 66", { c: "ink", w: 2, op: 0.25 }),
  sh(rr(-92, -16, 184, 14, 7), "wood", { tone: 1 }),
  gl(sm([[-72, 6], [-62, 40], [-58, 56], [-68, 28], [-72, 6]]), 0.4)), "translate(0 8) scale(0.82)"), { tags: ["vegetables", "market", "healthy", "harvest", "shopping"] });

// ============================ PROTEIN ============================
reg("Protein", "chicken-breast", "Chicken breast", () => {
  const body = sm([[-92, 20], [-78, -2], [-50, -26], [-14, -38], [14, -34], [20, -14], [20, 18], [8, 36], [-30, 40], [-72, 34], [-92, 20]]);
  const slice = (cx, cy, r, k) => g(A(sh(ci(0, 0, 21, 34), "earth", { tone: 0, w: "detail" }), sh(ci(2, 0, 17, 30), "cream", { w: "detail" }),
    st("M-6 -22 Q-2 -2 -8 20 M4 -24 Q8 -4 2 22 M12 -16 Q14 0 10 14", { c: "earth", w: 2, op: 0.4 }), gl(sm([[-8, -20], [-2, -22], [-6, -4], [-10, -6], [-8, -20]]), 0.7)), `translate(${cx} ${cy}) rotate(${r}) scale(${k})`);
  return A(L.shadow(0, 46, 200),
    solid(body, "earth", A(fl(ci(-10, 40, 100, 30), "orange", 0.55), fl(ci(-50, -26, 40, 14), "yellow", 0.3),
      ...[-70, -46, -22, 2].map((x) => band(`M${x} -40 L${x + 22} 44`, "brown", 1, 6, 0.6)),
      ...[[-60, 14], [-30, 20], [-20, -12], [-44, -6], [-6, 10]].map(([x, y]) => fl(ci(x, y, 2.4), "brown", 0.5)))),
    sh(ci(18, 2, 12, 31), "cream", { w: "detail" }), st("M14 -18 Q18 0 13 18 M22 -14 Q24 2 20 14", { c: "earth", w: 2, op: 0.4 }),
    gl(sm([[-80, 10], [-70, -10], [-48, -22], [-58, -4], [-76, 12], [-80, 10]]), 0.5),
    slice(52, 6, 8, 0.95), slice(78, 12, 14, 0.85),
    sh(sm([[-84, 40], [-62, 30], [-40, 46], [-58, 62], [-84, 40]]), "yellow", D), st("M-76 42 L-56 56 M-66 38 L-52 52", { c: "cream", w: 2, op: 0.9 }),
    tube("M-22 52 L30 56", "green", 4), ...[[-10, 48, -30], [4, 56, 30], [16, 50, -30], [26, 58, 30]].map(([x, y, r]) => g(sh(sm([[0, 0], [5, -9], [10, 0], [5, 9], [0, 0]]), "green", D), `translate(${x} ${y}) rotate(${r})`))); }, { tags: ["meat", "grilled", "cooked", "protein", "poultry"] });

reg("Protein", "fish-fillet", "Fish fillet with lemon", () => A(
  solid(sm([[-72, 0], [-44, -26], [10, -34], [62, -22], [78, 6], [50, 28], [0, 36], [-50, 26], [-72, 0]]), "orange", A(
    fl(ci(-20, -20, 90, 20), "pink", 0.4), ...[-44, -22, 0, 22, 44].map((x) => band(`M${x} -34 Q${x + 12} 0 ${x - 6} 34`, "paper", 0, 5, 0.75)), fl(ci(20, 34, 110, 14), "ink", 0.12))),
  sh(sm([[40, 24], [60, 50], [30, 70], [4, 54], [18, 30], [40, 24]]), "yellow", {}),
  st("M40 28 L40 64 M34 30 L10 56 M46 30 L62 52", { c: "cream", w: 2, op: 0.9 }),
  gl(sm([[-62, -2], [-44, -20], [-14, -28], [-40, -14], [-62, 4], [-62, -2]]), 0.5)), { tags: ["fish", "salmon", "seafood", "protein", "omega-3"] });

reg("Protein", "bean-bowl", "Bowl of beans", () => {
  const r = L.rng(7), beans = Array.from({ length: 26 }, () => { const a = r() * Math.PI, rad = Math.sqrt(r()) * 56; return [Math.cos(a) * rad * 1.1, -Math.sin(a) * rad * 0.5 - 6 - (1 - Math.abs(Math.cos(a))) * 8, r() * 180]; });
  return A(sh(sm([[-62, -8], [62, -8], [54, 36], [28, 58], [-28, 58], [-54, 36], [-62, -8]]), "teal"),
    ...beans.sort((a, b) => a[1] - b[1]).map(([x, y, a]) => g(sh(ci(0, 0, 11, 7), "red", { tone: 2, w: "detail" }) + fl(ci(-3, -2, 3, 1.6), "white", 0.5), `translate(${f1(x)} ${f1(y - 12)}) rotate(${f1(a)})`)),
    sh(rr(-68, -14, 136, 14, 7), "teal", { tone: 1 }),
    gl(sm([[-52, 8], [-44, 34], [-28, 48], [-40, 24], [-52, 8]]), 0.5)); }, { tags: ["legume", "kidney beans", "protein", "vegan", "fibre"] });

reg("Protein", "tofu", "Tofu", () => {
  const cube = (x, y, s) => A(sh(po([[x, y], [x + s, y], [x + s + s * 0.4, y - s * 0.34], [x + s * 0.4, y - s * 0.34]], true), "cream", { tone: 1 }),
    sh(po([[x + s, y], [x + s + s * 0.4, y - s * 0.34], [x + s + s * 0.4, y + s * 0.64], [x + s, y + s * 0.98]], true), "cream", { tone: 2 }),
    sh(po([[x, y], [x + s, y], [x + s, y + s * 0.98], [x, y + s * 0.98]], true), "cream"),
    gl(rr(x + 6, y + 6, 8, s * 0.5, 3), 0.6));
  return A(L.shadow(0, 56, 160), cube(-70, 8, 62), cube(8, 8, 62), cube(-32, -34, 62)); }, { tags: ["soy", "vegan", "protein", "cubes", "plant based"] });

reg("Protein", "mixed-nuts", "Mixed nuts", () => {
  const almond = (x, y, a) => g(A(sh(sm([[-20, 0], [-6, -12], [16, -8], [24, 0], [16, 10], [-6, 12], [-20, 0]]), "earth", { tone: 0, w: "detail" }), st("M-14 0 Q0 -4 16 0", { c: "brown", w: 2, op: 0.4 })), `translate(${x} ${y}) rotate(${a})`);
  const walnut = (x, y) => g(A(sh(ci(0, 0, 24, 21), "wood", { w: "detail" }), st("M0 -20 Q-6 0 0 20 M-12 -14 Q-16 0 -12 14 M12 -14 Q16 0 12 14", { c: "brown", w: 2, op: 0.55 }), gl(ci(-9, -9, 6, 3), 0.45)), `translate(${x} ${y})`);
  const peanut = (x, y, a) => g(A(sh(sm([[-24, 0], [-18, -12], [-4, -10], [0, -6], [4, -10], [18, -12], [24, 0], [18, 12], [4, 10], [0, 6], [-4, 10], [-18, 12], [-24, 0]]), "sand", { tone: 0, w: "detail" }), ...[[-14, 0], [14, 0]].map(([dx]) => fl(ci(dx, 0, 2, 1.4), "earth", 0.8))), `translate(${x} ${y}) rotate(${a})`);
  return A(L.shadow(0, 62, 170), almond(-50, 36, -20), peanut(52, 40, 15), almond(4, 44, 10), walnut(-36, 8), peanut(30, 14, -20), almond(62, 8, 40), walnut(2, -14), almond(-8, -34, -35), peanut(-62, -14, 30), almond(36, -26, 20)); }, { tags: ["nuts", "almond", "walnut", "peanut", "snack", "protein", "fats"] });

reg("Protein", "protein-shaker", "Protein shaker", (o) => A(
  sh(rr(-4, -104, 26, 14, 5), "blue", { tone: 1, w: "detail" }),
  sh(po([[-40, -76], [40, -76], [34, 80], [-34, 80]], true), "glass"),
  sh(po([[-38, -40], [38, -40], [34, 76], [-34, 76]], true), "earth", { tone: 2, w: "detail" }),
  sh(po([[-38, -40], [-20, -46], [0, -40], [20, -46], [38, -40], [38, -34], [-38, -34]], true), "cream", { w: "detail" }),
  sh(rr(-44, -90, 88, 20, 8), "blue"), sh(rr(-46, 70, 92, 14, 6), "blue"),
  sh(rr(-33, 0, 66, 40, 8), "white", D), L.text(o.label || "PROTEIN", 0, 26, { size: 12, c: "ink" }),
  gl(rr(-30, -66, 7, 120, 3), 0.55)), { demo: { label: "PROTEIN" }, tags: ["gym", "shake", "bottle", "whey", "drink", "muscle", "fitness"] });

reg("Protein", "shrimp", "Shrimp", () => A(
  L.shadow(0, 60, 130),
  sh(sm([[-40, 50], [-58, 24], [-52, -14], [-24, -40], [14, -44], [46, -26], [58, 6], [44, 28], [40, 6], [26, -14], [4, -16], [-16, 0], [-14, 26], [-28, 50], [-40, 50]]), "orange", { tone: 0 }),
  sh(sm([[-36, 54], [-66, 62], [-70, 40], [-56, 28], [-36, 54]]), "orange", { tone: 2, w: "detail" }),
  ...[[-48, 14, -20, 22], [-44, -12, -18, -6], [-30, -30, -6, -20], [-8, -38, 6, -26], [18, -38, 24, -24], [38, -22, 38, -8]].map(([a, b, c, d]) => st(L.line([a, b], [c, d]), { c: "red", w: 2, op: 0.55 })),
  dot(54, -6, 4.5, "ink", D), st("M58 -18 Q76 -40 90 -34 M60 -6 Q86 -16 96 -8", { c: "orange", w: 2.5 }),
  gl(sm([[-50, 0], [-44, -22], [-24, -34], [-34, -14], [-46, 6], [-50, 0]]), 0.5)), { tags: ["seafood", "prawn", "shellfish", "protein"] });

reg("Protein", "egg-halves", "Boiled egg halves", () => A(
  L.shadow(0, 58, 160),
  sh(ci(-38, 4, 34, 46), "white"), sh(ci(-38, 10, 17, 19), "yellow", D), gl(ci(-45, 2, 4, 6), 0.7),
  sh(ci(40, 4, 34, 46), "white"), sh(ci(40, 10, 17, 19), "yellow", D), gl(ci(33, 2, 4, 6), 0.7),
  fl(ci(0, 56, 4, 2), "ink", 0.0)), { tags: ["egg", "boiled", "protein", "breakfast", "yolk"] });

// ============================ DAIRY AND BREAD ============================
reg("Dairy and bread", "butter", "Butter", () => A(
  L.shadow(0, 40, 170),
  sh(po([[-72, 0], [60, 0], [88, -26], [-44, -26]], true), "cream", { tone: 1 }),
  sh(po([[60, 0], [88, -26], [88, 24], [60, 52]], true), "yellow", { tone: 2 }),
  sh(po([[-72, 0], [60, 0], [60, 52], [-72, 52]], true), "yellow"),
  sh(po([[-72, 0], [-30, 0], [-30, 52], [-72, 52]], true), "white", D), st("M-60 14 h18 M-60 26 h12", { c: "ink", w: 2, op: 0.35 }),
  sh(po([[-72, -26], [-44, -26], [-30, 0], [-72, 0]], true), "white", D),
  gl(rr(-24, 6, 8, 36, 3), 0.55), sh(rr(-6, -66, 54, 30, 10), "yellow"), gl(rr(0, -60, 20, 7, 3), 0.7)), { tags: ["dairy", "spread", "fat", "toast", "cooking"] });

reg("Dairy and bread", "yogurt", "Yogurt cup", (o) => { const c = col(o, "pink"); return A(
  L.shadow(0, 70, 120),
  sh(po([[-48, -34], [48, -34], [36, 70], [-36, 70]], true), "white"),
  sh(po([[-45, -4], [45, -4], [40, 34], [-40, 34]], true), c, D),
  dot(0, 15, 11, c, { tone: 2, w: "detail" }), gl(ci(-4, 11, 3, 2), 0.7),
  sh(sm([[-52, -34], [52, -34], [52, -44], [30, -52], [-30, -52], [-52, -44], [-52, -34]]), "gray", { tone: 1, w: "detail" }),
  sh(po([[-52, -44], [52, -44], [52, -34], [-52, -34]], true), "gray", { tone: 0, w: "detail" }),
  tube("M18 -52 L40 -96", "gray", 8), sh(ci(42, -100, 11, 8), "gray", { tone: 1, w: "detail" }),
  gl(po([[-40, -28], [-34, -28], [-26, 62], [-32, 62]], true), 0.55)); }, { demo: { color: "pink" }, tags: ["dairy", "probiotic", "breakfast", "cup", "spoon"] });

reg("Dairy and bread", "milk-glass", "Glass of milk", () => A(
  L.shadow(0, 76, 100),
  sh(po([[-42, -76], [42, -76], [34, 76], [-34, 76]], true), "glass"),
  sh(sm([[-39, -50], [-20, -56], [0, -50], [20, -56], [39, -50], [34, 72], [-34, 72], [-39, -50]]), "white", D),
  fl(po([[16, -48], [36, -52], [32, 70], [14, 70]], true), "ink", 0.08),
  gl(rr(-30, -64, 7, 120, 3), 0.6), dot(46, -60, 5, "white", D)), { tags: ["dairy", "drink", "calcium", "white", "breakfast"] });

reg("Dairy and bread", "cheese-slices", "Cheese slices", () => A(
  L.shadow(0, 60, 150),
  ...[0, 1, 2].map((i) => g(A(sh(po([[-60, 4], [50, 4], [64, -14], [-46, -14]], true), "yellow", { tone: i === 0 ? 0 : 1 }), sh(po([[-60, 4], [50, 4], [50, 16], [-60, 16]], true), "yellow", { tone: 2, w: "detail" }),
    sh(po([[50, 4], [64, -14], [64, -2], [50, 16]], true), "yellow", { tone: 2, w: "detail" })), `translate(${i * 8 - 8} ${46 - i * 26})`)),
  dot(-10, -10, 6, "orange", D), dot(26, -13, 4.5, "orange", D), gl(po([[-40, -4], [0, -4], [-2, -1], [-42, -1]], true), 0.6)), { tags: ["dairy", "cheese", "sandwich", "slices", "calcium"] });

reg("Dairy and bread", "baguette", "Baguette", () => A(
  L.shadow(0, 62, 190),
  g(solid(rr(-90, -22, 180, 44, 22), "earth", A(
    ...[-56, -22, 12, 46].map((x) => fl(sm([[x - 4, -16], [x + 22, -24], [x + 30, -10], [x + 4, 0], [x - 4, -16]]), "cream", 0.85)), fl(rr(-90, 6, 180, 20, 10), "ink", 0.14), fl(rr(-82, -18, 150, 8, 4), "white", 0.3))), "rotate(-14)")), { tags: ["bread", "french", "carbs", "bakery", "loaf"] });

reg("Dairy and bread", "toast", "Toast slice", (o) => { const body = sm([[-50, 52], [-52, -6], [-60, -22], [-46, -50], [-22, -52], [0, -40], [22, -52], [46, -50], [60, -22], [52, -6], [50, 52], [-50, 52]]), toasted = o.toasted !== false; return A(
  L.shadow(0, 54, 120),
  sh(body, "earth", { tone: toasted ? 2 : 0 }),
  sh(sm(sc([[-50, 52], [-52, -6], [-60, -22], [-46, -50], [-22, -52], [0, -40], [22, -52], [46, -50], [60, -22], [52, -6], [50, 52], [-50, 52]], 0.8, 0, 2)), "cream", { w: "detail", tone: toasted ? 0 : 1 }),
  toasted ? fl(sm(sc([[-50, 52], [-52, -6], [-60, -22], [-46, -50], [-22, -52], [0, -40], [22, -52], [46, -50], [60, -22], [52, -6], [50, 52], [-50, 52]], 0.8, 0, 2)), "orange", 0.35) : "",
  o.butter ? A(sh(rr(-16, -14, 40, 28, 8), "yellow"), gl(rr(-8, -8, 14, 5, 2), 0.7)) : "",
  gl(sm([[-42, -14], [-40, -36], [-26, -44], [-30, -22], [-36, 0], [-42, -14]]), 0.45)); }, { demo: { toasted: true, butter: true }, tags: ["bread", "breakfast", "carbs", "slice"] });
reg("Dairy and bread", "bread-slice", "Bread slice", (o) => L.svg("food-toast", { toasted: false }), { tags: ["bread", "white bread", "carbs", "slice"] });

reg("Dairy and bread", "bagel", "Bagel", () => A(
  L.shadow(0, 56, 140),
  ring(0, 0, 64, 20, "earth", { tone: 0 }),
  fl(ci(0, 0, 54, 54), "white", 0.0),
  ...[[-48, -8, 20], [-36, -34, -40], [-12, -50, 0], [18, -48, 30], [44, -26, 60], [50, 6, 80], [38, 36, 20], [10, 50, 0], [-24, 46, 40], [-46, 24, 70], [-30, -18, 30], [28, -22, 80], [-8, -38, 50], [34, 20, 10]].map(([x, y, a]) => fl(ci(x, y, 4, 2), "cream", 0.9).replace("<path ", `<path transform="rotate(${a} ${x} ${y})" `)),
  gl(sm([[-52, -20], [-40, -44], [-18, -56], [-34, -36], [-50, -12], [-52, -20]]), 0.45)), { tags: ["bread", "breakfast", "carbs", "sesame", "ring"] });

reg("Dairy and bread", "bread-loaf", "Loaf with slices", () => { const sl = (x, y, a) => g(A(sh(sm([[-26, 28], [-28, 2], [-32, -8], [-24, -22], [-10, -24], [0, -18], [10, -24], [24, -22], [32, -8], [28, 2], [26, 28], [-26, 28]]), "earth", { w: "detail" }),
    sh(sm([[-21, 24], [-23, 2], [-26, -8], [-20, -18], [-9, -19], [0, -13], [9, -19], [20, -18], [26, -8], [23, 2], [21, 24], [-21, 24]]), "cream", D)), `translate(${x} ${y}) rotate(${a})`);
  return A(L.shadow(0, 54, 190), sh(sm([[-86, 24], [-90, -8], [-70, -34], [-20, -42], [30, -38], [62, -26], [70, 24], [-86, 24]]), "earth", { tone: 0 }),
    ...[-56, -28, 0, 28].map((x) => st(`M${x} -34 l8 22`, { c: "brown", w: 2, op: 0.4 })),
    sh(rr(-88, 20, 158, 30, 8), "earth", { tone: 2 }), sl(36, 24, -10), sl(70, 30, 12), sl(100, 28, 24)); }, { wide: true, tags: ["bread", "bakery", "carbs", "sliced", "breakfast"] });

// ============================ SWEETS ============================
reg("Sweets", "cake-slice", "Cake slice", (o) => { const c = col(o, "pink"); return A(
  L.shadow(0, 62, 170),
  sh(po([[-70, 2], [66, -8], [92, -34], [-30, -48]], true), c, { tone: 1 }),
  sh(po([[66, -8], [92, -34], [92, 40], [66, 60]], true), "earth", { tone: 2 }),
  solid(po([[-70, 2], [66, -8], [66, 60], [-70, 60]], true), "earth", A(
    fl(rr(-74, 14, 144, 12, 0), "cream", 1), fl(rr(-74, 40, 144, 10, 0), "cream", 1), fl(rr(-74, 0, 144, 14, 0), c, 0.0))),
  sh(sm([[-70, 2], [-70, 18], [-56, 8], [-40, 22], [-24, 6], [-6, 16], [14, 2], [34, 14], [52, 0], [66, -8], [66, -8], [-70, 2]]), c, { w: "detail" }),
  dot(-8, -38, 13, "red", D), tube("M-8 -50 L2 -66", "green", 4), gl(ci(-13, -42, 4, 3), 0.8)); }, { demo: { color: "pink" }, tags: ["dessert", "birthday", "sugar", "sweet", "cherry", "icing"] });

reg("Sweets", "ice-cream-bowl", "Ice cream bowl", () => { const sc3 = (x, y, c) => A(sh(sm([[x - 32, y], [x - 30, y - 22], [x - 12, y - 36], [x + 12, y - 36], [x + 30, y - 22], [x + 32, y], [x + 24, y + 8], [x + 12, y + 2], [x, y + 10], [x - 12, y + 2], [x - 24, y + 8], [x - 32, y]]), c), gl(sm([[x - 24, y - 12], [x - 18, y - 26], [x - 4, y - 32], [x - 14, y - 18], [x - 24, y - 12]]), 0.55));
  return A(L.shadow(0, 68, 140), g(A(sh(rr(-6, -90, 14, 80, 2), "sand"), st("M-6 -76 h14 M-6 -62 h14 M-6 -48 h14 M-6 -34 h14", { c: "earth", w: 2, op: 0.7 })), "rotate(24 0 -10) translate(30 -14)"),
    sc3(-26, -20, "brown"), sc3(0, -50, "pink"), sc3(26, -18, "cream"), dot(0, -86, 8, "red", D), tube("M0 -92 L8 -104", "green", 3),
    sh(sm([[-62, -2], [62, -2], [50, 30], [24, 62], [-24, 62], [-50, 30], [-62, -2]]), "glass"), sh(rr(-68, -8, 136, 12, 6), "glass", { tone: 1 }), sh(rr(-8, 60, 16, 12, 2), "glass", { tone: 1, w: "detail" }), sh(rr(-36, 70, 72, 8, 4), "glass", { tone: 1, w: "detail" }),
    gl(sm([[-50, 6], [-42, 26], [-26, 48], [-36, 22], [-50, 6]]), 0.7)); }, { tags: ["dessert", "scoops", "cold", "sweet", "summer", "sundae"] });

reg("Sweets", "chocolate-bar", "Chocolate bar", (o) => { const bites = o.bites || 0, cells = [];
  for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) if (!(bites >= 1 && r === 0 && c === 3) && !(bites >= 2 && r === 0 && c === 2) && !(bites >= 3 && r === 1 && c === 3)) cells.push([c, r]);
  return A(L.shadow(0, 64, 150), g(A(
    sh(rr(-62, 28, 124, 52, 6), "gold", D), L.text(o.label || "DARK", -1, 66, { size: 16, c: "ink" }),
    ...cells.map(([c, r]) => A(sh(rr(-62 + c * 31, -62 + r * 31, 30, 30, 5), "brown", { w: "detail" }), gl(rr(-58 + c * 31, -58 + r * 31, 12, 4, 2), 0.35), fl(rr(-48 + c * 31, -44 + r * 31, 15, 15, 3), "ink", 0.18)))), "rotate(-8)")); },
  { demo: { bites: 0 }, tags: ["dessert", "sweet", "cocoa", "candy", "sugar", "snack"] });
reg("Sweets", "chocolate-bar-bitten", "Chocolate bar · bitten", (o) => L.svg("food-chocolate-bar", { bites: 3 }), { tags: ["dessert", "sweet", "cocoa", "candy", "eaten"] });

reg("Sweets", "candy-pile", "Pile of candy", () => {
  const wrapped = (x, y, c, a) => g(A(sh(po([[-28, 0], [-14, -9], [-14, 9]], true), c, { tone: 1, w: "detail" }), sh(po([[28, 0], [14, -9], [14, 9]], true), c, { tone: 1, w: "detail" }), sh(ci(0, 0, 16, 12), c), st("M-6 -9 L-6 9 M6 -9 L6 9", { c: "white", w: 2, op: 0.6 }), gl(ci(-6, -5, 4, 2), 0.7)), `translate(${x} ${y}) rotate(${a})`);
  const hard = (x, y, c) => A(sh(ci(x, y, 15), c), st(L.arc(x, y, 8, 20, 300), { c: "white", w: 3, op: 0.7 }), gl(ci(x - 6, y - 6, 3, 2), 0.8));
  return A(L.shadow(0, 56, 190), hard(-60, 32, "red"), hard(60, 34, "green"), hard(-30, 40, "yellow"), hard(32, 42, "purple"), wrapped(-4, 34, "orange", -10), wrapped(-66, 6, "pink", 20), wrapped(60, 6, "blue", -20), hard(-34, 12, "blue"), hard(36, 14, "orange"),
    wrapped(2, 4, "red", 8), hard(-16, -18, "pink"), hard(18, -16, "yellow"), wrapped(0, -34, "green", -14), hard(-8, -52, "purple")); }, { tags: ["sweets", "sugar", "treats", "halloween", "lollies", "pile"] });

reg("Sweets", "cookie-jar", "Cookie jar", (o) => { const r = L.rng(3), cookies = o.empty ? [] : Array.from({ length: 11 }, (_, i) => [-26 + (i % 3) * 26 + (r() - 0.5) * 8, 50 - Math.floor(i / 3) * 24 + (r() - 0.5) * 6]);
  return A(L.shadow(0, 72, 130),
    sh(sm([[-50, -44], [50, -44], [58, -20], [58, 62], [48, 74], [-48, 74], [-58, 62], [-58, -20], [-50, -44]]), "glass"),
    ...cookies.map(([x, y]) => A(dot(x, y, 22, "earth", { tone: 0, w: "detail" }), ...[[-8, -6], [6, -2], [-2, 8], [8, 9]].map(([dx, dy]) => fl(ci(x + dx, y + dy, 3, 2.4), "brown", 0.95)))),
    sh(sm([[-50, -44], [50, -44], [58, -20], [58, 62], [48, 74], [-48, 74], [-58, 62], [-58, -20], [-50, -44]]), "glass", { flat: true, c: undefined }).replace(/fill="[^"]*"/, 'fill="none"'),
    sh(rr(-58, -64, 116, 22, 8), "red"), sh(rr(-12, -84, 24, 22, 10), "red", { tone: 2, w: "detail" }),
    gl(rr(-48, -30, 8, 90, 4), 0.55)); }, { demo: { empty: false }, tags: ["sweets", "biscuit", "snack", "kitchen", "dessert", "jar"] });

reg("Sweets", "donut-box", "Box of doughnuts", () => { const dn = (x, y, c, sp) => A(sh(ci(x, y, 31, 24), "earth", { tone: 0 }), sh(sm(sc(L.arcPts(0, 0, 1, 0, 360, 12).slice(0, 12).concat([[1, 0]]).map(([a, b]) => [a * 27, b * 20]), 1, x, y - 2)), c, { w: "detail" }), sh(ci(x, y - 1, 8, 6), "white", { flat: true, w: "detail", c: "ink" }).replace(/fill="[^"]*"/, 'fill="#000" fill-opacity="0.35"'),
    ...(sp ? [[-14, -8], [14, -10], [-6, 10], [12, 8], [-18, 4], [20, 0]].map(([dx, dy], i) => fl(rr(x + dx - 4, y + dy - 1, 8, 2.6, 1).replace(/^/, ""), ["yellow", "white", "blue", "green", "orange", "pink"][i], 1)) : []), gl(ci(x - 14, y - 12, 5, 2.5), 0.6));
  return A(L.shadow(0, 62, 200), sh(po([[-92, -16], [92, -16], [100, 50], [-100, 50]], true), "paper", { tone: 2 }),
    dn(-52, -24, "pink", true), dn(2, -30, "brown"), dn(54, -24, "yellow"), dn(-50, 6, "brown", false), dn(4, 2, "pink", true), dn(56, 8, "cream"),
    sh(po([[-100, 30], [100, 30], [100, 60], [-100, 60]], true), "paper"), sh(rr(-100, 24, 200, 12, 4), "paper", { tone: 1 }), L.text("DOUGHNUTS", 0, 53, { size: 16, c: "ink", weight: 700 })); }, { wide: true, tags: ["sweets", "dessert", "doughnuts", "bakery", "dozen", "sugar"] });

reg("Sweets", "popsicle", "Ice lolly", (o) => A(
  g(A(sh(rr(-9, 30, 18, 70, 8), "sand"), solid(sm([[-30, 30], [-30, -44], [-18, -66], [0, -72], [18, -66], [30, -44], [30, 30], [-30, 30]]), o.bite ? "orange" : "pink", A(fl(rr(-40, 0, 80, 40, 0), "orange", 0.7), fl(rr(-40, 22, 80, 20, 0), "yellow", 0.7))),
    o.bite ? "" : gl(rr(-22, -56, 8, 70, 4), 0.6), o.bite ? sh(ci(26, -56, 12), "paper", { flat: true }).replace(/fill="[^"]*"/, 'fill="#fff"') : ""), "rotate(18)")), { demo: { bite: false }, tags: ["ice", "summer", "dessert", "cold", "lolly", "sweet"] });

reg("Sweets", "pie-slice", "Pie slice", () => {
  const h = 30, ye = (x, y0) => 20 + ((x + 66) * 4) / 138 + y0;
  const arcP = [[8, -44], [42, -44], [66, -24], [72, 4], [72, 24]], arcD = sm(arcP).replace(/^M\S+ \S+ /, "");
  const top = `M-66 20 L8 -44 ${arcD} Z`;
  const lay = (y0, y1) => po([[-66, ye(-66, y0)], [72, ye(72, y0)], [72, ye(72, y1)], [-66, ye(-66, y1)]], true);
  const front = po([[-66, 20], [72, 24], [72, 24 + h], [-66, 20 + h]], true);
  const band2 = po([...arcP, ...arcP.map(([x, y]) => [x, y + h]).reverse()], true);
  return A(L.shadow(0, 20 + h + 4, 160),
    sh(band2, "earth", { tone: 2, w: "detail" }),
    solid(front, "earth", A(fl(lay(0, 9), "earth", 1), fl(lay(9, 22), "red", 1), fl(lay(22, 31), "earth", 1), fl(lay(9, 12), "ink", 0.2),
      ...[-44, -12, 22, 50].map((x) => fl(ci(x, ye(x, 15), 3, 2), "pink", 0.7))), { w: "detail" }),
    solid(top, "red", A(
      ...[-80, -58, -36, -14, 8, 30, 52, 74].map((x) => band(`M${x} -50 L${x + 100} 50`, "earth", 2, 12, 0.5) + band(`M${x} -50 L${x + 100} 50`, "earth", 1, 8, 1)),
      ...[-30, -8, 14, 36, 58, 80, 102, 124].map((x) => band(`M${x} -50 L${x - 100} 50`, "earth", 2, 12, 0.5) + band(`M${x} -50 L${x - 100} 50`, "earth", 0, 8, 1)),
      band(`M8 -44 ${arcD}`, "earth", 1, 26, 1), band(`M8 -44 ${arcD}`, "earth", 0, 20, 1),
      ...[[24, -44], [42, -43], [56, -35], [66, -21], [71, -4], [72, 12]].map(([ox, oy]) => st(L.line([ox, oy], [ox - 0.2 * ox - 3, oy + 10]), { c: "earth", w: 2.5, op: 0.9 })))),
    gl(sm([[-48, 16], [-26, -10], [-4, -32], [-14, -6], [-36, 16], [-48, 16]]), 0.3)); }, { tags: ["dessert", "apple pie", "baking", "sweet", "slice", "bakery"] });

// ============================ MEALS ============================
const plate = (cy = 24, rx = 112, ry = 44) => A(L.shadow(0, cy + ry + 6, rx * 2), sh(ci(0, cy + 6, rx, ry), "gray", { tone: 2, w: "detail" }), sh(ci(0, cy, rx, ry), "white"),
  st(ci(0, cy + 2, rx * 0.72, ry * 0.68), { c: "gray", w: "detail", op: 0.35 }), gl(L.arc(0, cy, rx * 0.9, 150, 215, ry * 0.9), 0.0));
const bowl = (cy, rx, depth, c, rimC = "cream") => A(sh(sm([[-rx, cy], [rx, cy], [rx * 0.86, cy + depth * 0.55], [rx * 0.56, cy + depth], [-rx * 0.56, cy + depth], [-rx * 0.86, cy + depth * 0.55], [-rx, cy]]), c),
  sh(ci(0, cy, rx, rx * 0.34), rimC, { tone: 1 }));
const burger = (o = {}) => A(
  sh(rr(-48, 22, 96, 18, 9), "gold"),
  sh(rr(-52, 6, 104, 18, 9), "brown"),
  sh(po([[-52, 2], [52, 2], [48, 12], [32, 8], [24, 22], [14, 8], [-48, 12]], true), "yellow", D),
  sh(rr(-46, -8, 92, 10, 5), "red", D),
  sh(sm([[-56, -8], [-42, -18], [-28, -8], [-14, -18], [0, -8], [14, -18], [28, -8], [42, -18], [56, -8], [44, 0], [-44, 0], [-56, -8]]), "grass", D),
  sh(sm([[-50, -14], [-46, -44], [-22, -62], [22, -62], [46, -44], [50, -14], [-50, -14]]), "gold", { tone: 0 }),
  ...[[-22, -42], [0, -50], [22, -42], [-8, -30], [14, -28], [-30, -26]].map(([x, y], i) => fl(ci(x, y, 4, 2.2), "cream", 0.95).replace("<path ", `<path transform="rotate(${i * 40} ${x} ${y})" `)),
  gl(sm([[-42, -26], [-36, -44], [-18, -56], [-28, -38], [-40, -22], [-42, -26]]), 0.5));

reg("Meals", "breakfast-plate", "Breakfast plate", () => A(plate(22, 118, 48),
  g(A(sh(rr(-28, -26, 56, 52, 12), "earth"), sh(rr(-22, -20, 44, 40, 9), "cream", D), sh(rr(-12, -10, 24, 18, 6), "yellow", D), gl(rr(-8, -6, 10, 4, 2), 0.7)), "translate(-62 12) rotate(-12)"),
  sh(sm([[-24, -30], [10, -42], [48, -34], [58, -6], [44, 24], [4, 30], [-24, 18], [-34, -10], [-24, -30]]), "white", D), dot(12, -8, 17, "yellow", D), gl(ci(6, -14, 5, 4), 0.8),
  ...[[66, 6, 14], [60, 30, 4]].map(([x, y, a]) => g(A(sh(sm([[-34, -6], [-16, -14], [2, -6], [20, -14], [38, -6], [38, 10], [20, 18], [2, 10], [-16, 18], [-34, 10], [-34, -6]]), "red", { tone: 0 }), band("M-30 2 Q-16 -4 2 2 T38 2", "paper", 0, 5, 0.75)), `translate(${x} ${y}) rotate(${a}) scale(0.9)`)),
  dot(-44, -22, 11, "red", D), dot(-26, -30, 11, "red", D), gl(ci(-47, -26, 3, 2), 0.7), gl(ci(-29, -34, 3, 2), 0.7)), { wide: true, tags: ["meal", "morning", "eggs", "bacon", "toast", "plate"] });

reg("Meals", "rice-curry", "Rice and curry", () => A(plate(22, 118, 48),
  sh(sm([[-82, 34], [-84, 8], [-62, -22], [-26, -34], [4, -22], [12, 8], [8, 36], [-82, 34]]), "white"),
  ...[[-60, 0], [-40, -14], [-20, -22], [-48, 18], [-24, 4], [-6, -6], [-30, 24], [-8, 20], [-68, 22]].map(([x, y], i) => fl(ci(x, y, 3, 1.5), "paper", 1).replace("<path ", `<path transform="rotate(${i * 30} ${x} ${y})" `).replace('fill="#fbf7ef"', 'fill="#d3cbbc"')),
  gl(sm([[-72, 6], [-60, -16], [-36, -26], [-52, -6], [-70, 18], [-72, 6]]), 0.7),
  sh(sm([[14, -4], [48, -20], [88, -8], [106, 20], [84, 44], [40, 48], [12, 34], [14, -4]]), "orange", { tone: 2 }),
  fl(sm([[24, 0], [50, -12], [80, -2], [90, 14], [70, 28], [38, 30], [24, 18], [24, 0]]), "yellow", 0.25),
  sh(rr(30, 6, 18, 16, 5), "yellow", D), sh(rr(62, 20, 18, 16, 5), "yellow", D), dot(52, -2, 8, "orange", { tone: 0, w: "detail" }), dot(76, 6, 8, "orange", { tone: 0, w: "detail" }),
  ...[[44, 28], [88, 14], [66, 4], [30, 24]].map(([x, y]) => dot(x, y, 4, "grass", D)),
  sh(sm([[56, 36], [66, 24], [80, 34], [66, 42], [56, 36]]), "green", D), gl(sm([[26, 6], [42, -8], [64, -12], [44, -2], [26, 6]]), 0.35)), { wide: true, tags: ["meal", "indian", "dal", "dinner", "plate", "lunch", "thali"] });

reg("Meals", "pasta-plate", "Spaghetti and meatballs", () => { const nest = sm([[-70, 36], [-78, 14], [-60, -14], [-30, -30], [-4, -38], [30, -30], [58, -12], [74, 12], [64, 36], [-70, 36]]);
  return A(plate(26, 118, 48), sh(nest, "yellow", { tone: 1 }),
  clipTo(nest, A(...["M-70 22 Q-40 -30 10 -30", "M-50 36 Q-10 -10 40 -22", "M-20 -34 Q30 -34 62 6", "M-72 8 Q-30 36 20 20", "M-30 8 Q10 -14 52 22", "M-56 -8 Q-10 24 40 -10", "M-10 36 Q20 4 70 20", "M-44 -20 Q0 -4 30 -30"].map((d) => band(d, "earth", 0, 3.5, 0.75)), ...["M-64 30 Q-20 0 30 6", "M0 -36 Q10 0 66 -4"].map((d) => band(d, "paper", 0, 2.5, 0.8)))),
  st(nest, { c: "ink", w: "prop" }),
  sh(sm([[-30, -16], [0, -32], [34, -20], [40, 2], [10, 12], [-24, 6], [-30, -16]]), "red", { tone: 0, w: "detail" }), gl(sm([[-20, -14], [-4, -24], [14, -24], [-6, -16], [-20, -14]]), 0.5),
  ...[[-34, 24, 17], [32, 28, 17], [0, 4, 18]].map(([x, y, r]) => A(dot(x, y, r, "brown", { tone: 1 }), gl(ci(x - 5, y - 6, 5, 3), 0.45))),
  sh(sm([[-4, -16], [8, -36], [30, -32], [24, -14], [4, -10], [-4, -16]]), "green", D), st("M0 -16 L22 -30", { c: "grass", w: 2, op: 0.7 })); }, { wide: true, tags: ["meal", "italian", "noodles", "dinner", "carbs", "plate"] });

reg("Meals", "burger-meal", "Burger, fries and drink", () => A(
  L.shadow(0, 64, 250), sh(rr(-124, 36, 248, 26, 10), "gray"), sh(rr(-114, 38, 228, 10, 5), "gray", { tone: 1, w: "detail" }),
  g(burger(), "translate(-60 -4) scale(0.88)"),
  g(A(...[-18, -10, -2, 6, 14].map((x, i) => sh(rr(x - 3.5, -48 - (i % 3) * 8, 7, 66, 3), "yellow", D)), sh(po([[-26, -6], [26, -6], [22, 44], [-22, 44]], true), "red"), sh(rr(-26, -10, 52, 10, 4), "red", { tone: 1, w: "detail" }), gl(rr(-18, 4, 5, 30, 2), 0.5)), "translate(34 4)"),
  g(A(tube("M4 -30 L16 -78", "red", 7), sh(po([[-20, -22], [20, -22], [15, 44], [-15, 44]], true), "white"), sh(po([[-18, -2], [18, -2], [16, 20], [-16, 20]], true), "red", D), sh(rr(-24, -34, 48, 14, 6), "red", { tone: 1 }), gl(rr(-14, -16, 5, 52, 2), 0.55)), "translate(96 2)")), { wide: true, tags: ["meal", "fast food", "junk food", "combo", "tray", "lunch", "unhealthy"] });

reg("Meals", "grain-bowl", "Healthy grain bowl", () => { const top = ell(0, 0, 90, 32);
  return A(L.shadow(0, 82, 190), sh(sm([[-92, 0], [92, 0], [80, 40], [52, 72], [-52, 72], [-80, 40], [-92, 0]]), "teal"),
    sh(ell(0, 0, 94, 34), "cream", { tone: 1 }),
    clipTo(top, A(fl(pie(0, 2, 120, -90, -20), "white", 1), fl(pie(0, 2, 120, -20, 50), "purple", 1), fl(pie(0, 2, 120, 50, 120), "orange", 1), fl(pie(0, 2, 120, 120, 190), "grass", 1), fl(pie(0, 2, 120, 190, 270), "yellow", 1),
      ...[[-40, -14], [-26, -22], [-14, -8], [30, -18], [44, -4], [38, 14]].map(([x, y]) => dot(x, y, 7, "red", { w: "detail", tone: 0 })).slice(0, 0))),
    ...[[-44, 12], [-30, 16], [-18, 8]].map(([x, y]) => dot(x, y, 6, "orange", { tone: 2, w: "detail" })), ...[[-26, 10], [-40, 18]].map(([x, y]) => dot(x, y, 0.1, "ink")),
    ...[[40, -6], [52, 2], [30, -10]].map(([x, y]) => dot(x, y, 6, "yellow", { tone: 2, w: "detail" })),
    sh(sm([[-14, 10], [10, 16], [30, 6], [24, 14], [6, 24], [-14, 10]]), "grass", { tone: 1, w: "detail" }), sh(sm([[-8, -2], [18, 4], [24, -8], [12, -12], [-8, -2]]), "grass", { tone: 1, w: "detail" }),
    ...[[-30, -18], [-16, -24], [-4, -20]].map(([x, y]) => dot(x, y, 6, "paper", { w: "detail", tone: 0 })),
    st(ell(0, 0, 94, 34), { c: "ink", w: "prop" }), gl(sm([[-76, 18], [-62, 44], [-44, 62], [-56, 36], [-76, 18]]), 0.5)); }, { wide: true, tags: ["meal", "healthy", "buddha bowl", "vegan", "salad", "lunch", "colourful"] });

reg("Meals", "sushi-platter", "Sushi platter", () => { const roll = (x, y, fillC) => A(sh(ci(x, y + 12, 27, 23), "navy", { tone: 2, w: "detail" }), fl(rr(x - 27, y, 54, 12, 0), "navy", 1).replace('fill="#1f2a44"', 'fill="#121a2e"'), sh(ci(x, y, 27, 23), "navy", { tone: 2 }), sh(ci(x, y, 20, 17), "white", D), sh(ci(x, y, 9, 8), fillC, D), gl(ci(x - 3, y - 3, 3, 2), 0.7));
  return A(L.shadow(0, 70, 240), sh(rr(-120, 4, 240, 64, 12), "wood"), sh(rr(-112, 8, 224, 18, 8), "wood", { tone: 1, w: "detail" }),
    roll(-76, 24, "orange"), roll(-24, 20, "grass"), roll(28, 24, "red"), roll(-50, 52, "yellow"), roll(2, 52, "pink"),
    sh(ci(88, 24, 16, 12), "green", D), sh(sm([[70, 44], [86, 38], [108, 44], [102, 56], [78, 58], [70, 44]]), "pink", D), st("M76 48 Q88 44 100 50", { c: "white", w: 2, op: 0.7 }),
    tube("M52 -4 L112 -66", "wood", 7), tube("M64 4 L122 -48", "wood", 7)); }, { wide: true, tags: ["meal", "japanese", "rolls", "maki", "rice", "fish", "seaweed", "lunch"] });

reg("Meals", "pizza-whole", "Whole pizza", (o) => { const miss = o.missing || 0, a0 = -112.5, R = 84, ang = (x, y) => (((Math.atan2(y, x) * 180) / Math.PI - a0) % 360 + 360) % 360, r = L.rng(11);
  const shape = (rad) => (miss ? pie(0, 0, rad, a0 + miss * 45, a0 + 360) : ci(0, 0, rad)), tops = [];
  for (let i = 0; i < 18; i++) { const a = r() * 360, d = 14 + r() * 48, x = Math.cos(deg(a)) * d, y = Math.sin(deg(a)) * d; if (!miss || ang(x, y) > miss * 45 + 10) tops.push([x, y, i % 6]); }
  return A(sh(ci(0, 0, 100), "wood", { tone: 0 }), sh(ci(0, 0, 100), "wood", { tone: 1, w: "detail" }).replace(/fill="[^"]*"/, 'fill="none"'),
    sh(shape(R), "earth", { tone: 1 }), sh(shape(R - 12), "yellow", { tone: 1, w: "detail" }), fl(shape(R - 14), "orange", 0.25),
    ...tops.map(([x, y, k]) => k < 3 ? A(dot(x, y, 11, "red", { tone: 2, w: "detail" }), fl(ci(x - 3, y - 2, 2.2), "ink", 0.35), fl(ci(x + 3, y + 3, 2), "ink", 0.35), gl(ci(x - 4, y - 5, 3, 1.8), 0.5)) : k < 5 ? ring(x, y, 7, 3, "navy", { w: "detail", tone: 2 }) : sh(sm([[x - 8, y], [x, y - 7], [x + 8, y], [x, y + 7], [x - 8, y]]), "green", D)),
    ...Array.from({ length: 8 }, (_, i) => i).filter((i) => i >= miss).map((i) => st(L.line([0, 0], [Math.cos(deg(a0 + i * 45)) * (R - 8), Math.sin(deg(a0 + i * 45)) * (R - 8)]), { c: "earth", w: 2, op: 0.9 })),
    gl(L.arc(0, 0, R - 4, 190, 250), 0.4)); }, { demo: { missing: 0 }, tags: ["meal", "italian", "pepperoni", "cheese", "dinner", "party", "fast food"] });
reg("Meals", "pizza-eaten", "Whole pizza · three slices gone", (o) => L.svg("food-pizza-whole", { missing: 3 }), { tags: ["meal", "pepperoni", "slices", "eaten", "leftover"] });

reg("Meals", "steak-dinner", "Steak dinner", () => A(plate(26, 118, 48),
  sh(sm([[-76, 6], [-58, -22], [-20, -34], [26, -24], [52, 6], [44, 36], [0, 46], [-50, 38], [-76, 6]]), "brown", { tone: 1 }),
  clipTo(sm([[-76, 6], [-58, -22], [-20, -34], [26, -24], [52, 6], [44, 36], [0, 46], [-50, 38], [-76, 6]]), A(...[-60, -36, -12, 12, 36].map((x) => band(`M${x} -34 L${x + 34} 46`, "ink", 0, 6, 0.55)), fl(ci(30, 30, 60, 30), "ink", 0.12))),
  st(sm([[-76, 6], [-58, -22], [-20, -34], [26, -24], [52, 6], [44, 36], [0, 46], [-50, 38], [-76, 6]]), { c: "ink", w: "prop" }),
  sh(rr(-10, -14, 22, 16, 6), "yellow", D), gl(rr(-5, -11, 8, 4, 2), 0.7), gl(sm([[-66, 0], [-52, -18], [-24, -28], [-44, -12], [-66, 6], [-66, 0]]), 0.4),
  ...[[0, 0], [10, 6], [20, 12]].map(([dx, dy]) => g(sh(rr(54 + dx, 4 + dy, 52, 8, 4), "green", D), "rotate(14 54 4)")),
  ...[[66, -14], [86, -8], [96, 14]].map(([x, y], i) => g(sh(sm([[-12, 8], [0, -14], [14, 4], [8, 14], [-12, 8]]), "yellow", { tone: 1, w: "detail" }), `translate(${x} ${y + 18}) rotate(${i * 25})`)).slice(0, 0)), { wide: true, tags: ["meal", "beef", "meat", "protein", "grilled", "dinner", "plate"] });

reg("Meals", "ramen-bowl", "Noodle bowl", () => A(
  steam(-22, -34), steam(8, -44), steam(36, -34), L.shadow(0, 82, 180),
  tube("M44 -30 L128 -86", "wood", 6), tube("M56 -22 L134 -70", "wood", 6),
  sh(sm([[-88, 0], [88, 0], [76, 42], [50, 76], [-50, 76], [-76, 42], [-88, 0]]), "red"), st("M-82 36 Q0 56 82 36", { c: "cream", w: 4, op: 0.8 }), st("M-70 52 Q0 72 70 52", { c: "cream", w: 4, op: 0.8 }),
  sh(ell(0, 0, 90, 30), "red", { tone: 1 }), sh(ell(0, 2, 80, 24), "orange", { tone: 1, w: "detail" }),
  clipTo(ell(0, 2, 80, 24), A(...["M-70 6 Q-40 -20 -10 6 T50 6", "M-60 14 Q-30 -8 0 14 T70 14", "M-50 -8 Q-20 -22 10 -4 T66 -4", "M-66 -2 Q-30 -26 10 8 T74 2"].map((d) => band(d, "cream", 0, 6, 1)), ...["M-70 6 Q-40 -20 -10 6 T50 6", "M-60 14 Q-30 -8 0 14 T70 14"].map((d) => band(d, "yellow", 2, 1.6, 0.6)))),
  g(A(sh(ell(0, 0, 21, 15), "white", D), dot(0, 1, 8, "yellow", D)), "translate(-34 -2)"), sh(rr(32, -34, 22, 34, 3), "navy", { tone: 2, w: "detail" }),
  ...[[2, 8], [14, 12], [-8, 14], [24, 4]].map(([x, y]) => ring(x, y, 5, 2, "green", { w: "detail" })), 
  g(A(dot(0, 0, 14, "paper", D), st(L.arc(0, 0, 8, 0, 300), { c: "pink", w: 3 })), "translate(-4 -2) translate(18 -4)").slice(0, 0),
  gl(sm([[-72, 14], [-62, 44], [-44, 66], [-54, 36], [-72, 14]]), 0.5)), { wide: true, tags: ["meal", "ramen", "noodles", "soup", "japanese", "bowl", "chopsticks", "lunch"] });

reg("Meals", "tacos-plate", "Plate of tacos", () => {
  const seg = (pts) => sm(pts).replace(/^M\S+ \S+ /, "");
  const taco = (x, y, k, a) => g(A(
    // back half of the folded shell (inside, in shade)
    sh(sm([[-48, 0], [-46, -24], [-26, -40], [0, -44], [26, -40], [46, -24], [48, 0], [-48, 0]]), "gold", { tone: 2 }),
    // meat crumbs
    sh(sm([[-42, 0], [-40, -18], [-24, -28], [-8, -24], [10, -30], [28, -24], [42, -16], [42, 0], [-42, 0]]), "brown", { tone: 1, w: "detail" }),
    ...[[-30, -14], [-14, -18], [4, -20], [20, -16], [34, -10]].map(([bx, by]) => dot(bx, by, 4.5, "brown", { tone: 2, w: "hair" })),
    // ruffled lettuce spilling over the whole mouth
    sh(sm([[-46, -8], [-46, -22], [46, -22], [46, -8], [-46, -8]]), "grass", D),
    sh(sm([[-46, -18], [-40, -36], [-30, -32], [-22, -42], [-12, -34], [-2, -44], [8, -35], [18, -43], [28, -33], [38, -38], [46, -18], [-46, -18]]), "green", { tone: 0, w: "detail" }),
    sh(sm([[-46, -10], [-42, -28], [-34, -26], [-26, -35], [-17, -27], [-8, -36], [2, -27], [12, -36], [22, -26], [32, -34], [40, -26], [46, -10], [-46, -10]]), "grass", D),
    st("M-36 -22 Q-30 -30 -24 -22 M-8 -26 Q-2 -34 4 -26 M20 -26 Q26 -34 32 -24", { c: "green", w: 2, op: 0.55 }),
    // diced tomato and cheese
    ...[[-28, -22, 20], [-6, -26, -15], [18, -24, 25], [34, -18, -10]].map(([tx, ty, r]) => g(sh(L.rect(-5.5, -5.5, 11, 11), "red", D), `translate(${tx} ${ty}) rotate(${r})`)),
    st("M-38 -18 l8 -4 M-18 -14 l9 3 M8 -14 l9 -4 M26 -10 l8 3", { c: "yellow", w: 4, op: 0.95 }),
    // front half of the shell: shallow, folded, speckled
    sh(sm([[-50, -4], [-46, 14], [-30, 30], [0, 36], [30, 30], [46, 14], [50, -4], [26, -9], [0, -10], [-26, -9], [-50, -4]]), "gold", { tone: 0 }),
    st("M-44 4 Q0 14 44 4", { c: "orange", w: 2.5, op: 0.5 }),
    ...[[-24, 18], [-6, 24], [14, 20], [28, 12], [-34, 10]].map(([sx, sy]) => fl(ci(sx, sy, 1.8), "orange", 0.7)),
    gl(sm([[-42, 0], [-38, 14], [-24, 24], [-30, 10], [-42, 0]]), 0.6)), `translate(${x} ${y}) rotate(${a}) scale(${k})`);
  return A(plate(30, 124, 50), taco(-62, 14, 0.78, -16), taco(62, 14, 0.78, 16), taco(0, 28, 0.95, 0),
    sh(sm([[84, -26], [114, -34], [112, -14], [86, -6], [84, -26]]), "grass", D), st("M92 -22 L108 -16", { c: "green", w: 2.5, op: 0.6 }),
    sh(sm([[-116, -14], [-92, -26], [-92, -2], [-116, -14]]), "yellow", D)); }, { wide: true, tags: ["meal", "mexican", "tortilla", "dinner", "fiesta", "plate", "taco"] });

reg("Meals", "club-sandwich", "Club sandwich", () => { const slice = (y, c) => sh(rr(-62, y, 124, 18, 8), c); return A(L.shadow(0, 76, 170),
  sh(rr(-62, 54, 124, 20, 9), "earth"), sh(rr(-56, 56, 112, 12, 5), "cream", { w: "detail" }),
  sh(sm([[-64, 36], [-40, 28], [-16, 38], [8, 28], [32, 38], [64, 36], [64, 52], [-64, 52], [-64, 36]]), "grass", D),
  sh(rr(-58, 26, 116, 12, 5), "red", D), sh(po([[-62, 18], [62, 18], [58, 32], [40, 26], [32, 36], [20, 26], [-58, 32]], true), "pink", D),
  sh(rr(-62, -2, 124, 22, 9), "earth"), sh(rr(-56, 0, 112, 14, 5), "cream", { w: "detail" }),
  sh(sm([[-62, -8], [-40, -16], [-16, -6], [8, -16], [32, -6], [62, -8], [62, 6], [-62, 6], [-62, -8]]), "grass", D),
  sh(po([[-60, -14], [60, -14], [56, -2], [38, -8], [30, 2], [18, -8], [-56, -2]], true), "yellow", D),
  sh(sm([[-62, -22], [-60, -34], [-30, -42], [30, -42], [60, -34], [62, -22], [-62, -22]]), "earth"), sh(rr(-58, -26, 116, 8, 3), "cream", { w: "detail" }),
  tube("M0 -30 L2 -86", "wood", 4), dot(2, -88, 9, "green", D), dot(2, -88, 3, "red", D), sh(po([[2, -64], [24, -70], [24, -52], [2, -56]], true), "red", D),
  gl(rr(-50, -38, 40, 6, 3), 0.55)); }, { tags: ["meal", "lunch", "sandwich", "deli", "bread", "layers", "picnic"] });

reg("Meals", "roast-chicken", "Roast chicken dinner", () => A(plate(30, 124, 50),
  ...[[-78, 22], [-90, 6], [84, 26]].map(([x, y]) => sh(rr(x - 16, y - 12, 32, 24, 12), "yellow", { tone: 1, w: "detail" })), 
  sh(sm([[-64, 6], [-54, -26], [-20, -42], [24, -40], [58, -20], [70, 8], [50, 34], [0, 44], [-46, 34], [-64, 6]]), "earth", { tone: 2 }),
  fl(sm([[-46, -4], [-36, -26], [-6, -34], [20, -28], [40, -10], [10, -6], [-30, 4], [-46, -4]]), "yellow", 0.35),
  ...[[-30, -10, 7], [-6, -22, 8], [24, -14, 7], [-18, 12, 8], [24, 14, 7]].map(([x, y, r]) => fl(ci(x, y, r, r * 0.7), "brown", 0.28)),
  g(A(sh(sm([[-14, 0], [0, -12], [22, -10], [30, 4], [18, 22], [-4, 26], [-14, 0]]), "earth", { tone: 0, w: "detail" }), sh(rr(18, 6, 22, 10, 5), "cream", D), dot(40, 11, 6, "cream", D)), "translate(-56 22) rotate(-20)"),
  g(A(sh(sm([[-14, 0], [0, -12], [22, -10], [30, 4], [18, 22], [-4, 26], [-14, 0]]), "earth", { tone: 0, w: "detail" }), sh(rr(-38, 6, 22, 10, 5), "cream", D), dot(-40, 11, 6, "cream", D)), "translate(58 22) scale(-1 1) rotate(-20)").replace("scale(-1 1)", "scale(1 1)").slice(0, 0),
  gl(sm([[-50, -4], [-42, -24], [-20, -36], [-32, -16], [-46, 4], [-50, -4]]), 0.45),
  sh(sm([[-100, 30], [-92, 14], [-80, 28], [-100, 30]]), "green", D)), { wide: true, tags: ["meal", "poultry", "dinner", "sunday", "protein", "plate", "turkey"] });

reg("Meals", "soup-bowl", "Soup bowl", (o) => { const c = col(o, "red"); return A(
  steam(-20, -26), steam(10, -36), tube("M30 -10 L96 -58", "gray", 6), sh(ci(100, -62, 12, 9), "gray", { tone: 1, w: "detail" }), L.shadow(0, 78, 170),
  sh(sm([[-84, 0], [84, 0], [72, 40], [46, 72], [-46, 72], [-72, 40], [-84, 0]]), "cream"), st("M-76 30 Q0 50 76 30", { c: "teal", w: 4, op: 0.9 }),
  sh(ell(0, 0, 86, 28), "cream", { tone: 1 }), sh(ell(0, 2, 76, 22), c, { tone: 1, w: "detail" }), fl(ell(-10, 0, 40, 10), "white", 0.18),
  ...[[-20, 2], [4, 8], [28, 0], [-4, -2]].map(([x, y]) => sh(rr(x - 6, y - 5, 12, 10, 3), "gold", D)), sh(sm([[26, 6], [34, 0], [46, 6], [38, 12], [26, 6]]), "green", D),
  gl(sm([[-66, 14], [-56, 40], [-40, 60], [-50, 34], [-66, 14]]), 0.55)); }, { demo: { color: "red" }, wide: true, tags: ["meal", "tomato soup", "hot", "starter", "bowl", "lunch", "warm"] });

// ============================ QUANTITY BUILDERS ============================
// unit foods (about 60 px across, origin = centre) used by the pile and count builders
const UNITS = {
  apple: () => A(sh(sm([[0, -20], [16, -28], [30, -14], [30, 10], [18, 28], [0, 24], [-18, 28], [-30, 10], [-30, -14], [-16, -28], [0, -20]]), "red"), tube("M0 -20 Q2 -30 8 -34", "brown", 4), sh(sm([[4, -28], [16, -38], [26, -32], [14, -24], [4, -28]]), "green", D), gl(sm([[-22, -8], [-18, -20], [-8, -24], [-14, -12], [-22, -8]]), 0.55)),
  orange: () => A(dot(0, 0, 29, "orange"), sh(sm([[-3, -28], [8, -38], [20, -32], [8, -26], [-3, -28]]), "green", D), fl(ci(0, -28, 3), "green"), ...[[-10, -6], [8, 8], [-2, 16], [14, -10], [-14, 12]].map(([x, y]) => fl(ci(x, y, 1.3), "orange", 0.0)), gl(sm([[-22, -8], [-16, -20], [-6, -24], [-12, -12], [-22, -8]]), 0.55)),
  donut: () => A(eo(sh(ci(0, 0, 30) + ci(0, 0, 10), "earth")), eo(sh(ci(0, -2, 26) + ci(0, -2, 13), "pink", D)), ...[[-18, -8, 30], [10, -20, -20], [18, 6, 60], [-6, 16, 10], [-20, 8, 70]].map(([x, y, a]) => fl(rr(x - 3.5, y - 1.2, 7, 2.4, 1), "white", 1).replace("<path ", `<path transform="rotate(${a} ${x} ${y})" `)), gl(sm([[-22, -14], [-14, -22], [-6, -22], [-16, -14], [-22, -14]]), 0.6)),
  cookie: () => A(dot(0, 0, 29, "earth", { tone: 0 }), ...[[-12, -10], [8, -14], [14, 4], [-4, 8], [-16, 12], [4, 20]].map(([x, y]) => fl(ci(x, y, 4, 3.2), "brown", 0.95)), gl(sm([[-22, -10], [-16, -20], [-6, -24], [-12, -12], [-22, -10]]), 0.45)),
  egg: () => A(sh(ci(0, 0, 22, 29), "cream", { tone: 0 }), gl(ci(-8, -10, 4, 8), 0.7)),
  tomato: () => A(dot(0, 2, 29, "red"), sh(sm([[0, -26], [10, -36], [18, -28], [10, -24], [18, -18], [6, -22], [0, -16], [-6, -22], [-18, -18], [-10, -24], [-18, -28], [-10, -36], [0, -26]]), "green", D), gl(sm([[-22, -4], [-18, -18], [-8, -22], [-14, -10], [-22, -4]]), 0.55)),
};
const unit = (kind) => (UNITS[kind] || UNITS.apple)();
const KINDS = Object.keys(UNITS);

reg("Quantity", "pile", "Pile of food (n items)", (o) => {
  const n = Math.max(1, Math.min(400, Math.round(o.n || 10))), kind = KINDS.includes(o.kind) ? o.kind : "apple", d = 58;
  let c = 1; while ((c * (c + 1)) / 2 < n) c++;
  const rows = []; let left = n; for (let k = c; k >= 1 && left > 0; k--) { rows.push(Math.min(k, left)); left -= rows[rows.length - 1]; }
  const H = (rows.length - 1) * 0.8 * d + d, k = Math.min(1.5, 262 / (c * 0.92 * d), 184 / H), out = [];
  for (let i = rows.length - 1; i >= 0; i--) for (let j = 0; j < rows[i]; j++) out.push(g(unit(kind), `translate(${f1((j - (rows[i] - 1) / 2) * 0.92 * d)} ${f1(H / 2 - d / 2 - i * 0.8 * d)})`));
  return g(A(L.shadow(0, H / 2 + 2, c * 0.92 * d), ...out), `scale(${f1(k)}) translate(0 ${f1(-6 / k)})`); },
  { wide: true, demo: { kind: "apple", n: 15 }, call: 'L.put(S, "food-pile", x, y, { s: 1, kind: "apple", n: 15, t })  // kind: apple | orange | donut | cookie | egg | tomato, n: 1-400', tags: ["pile", "heap", "many", "quantity", "count", "how many", "lots", "pyramid"] });
[["donuts", { kind: "donut", n: 28 }], ["cookies", { kind: "cookie", n: 21 }], ["eggs", { kind: "egg", n: 36 }], ["oranges", { kind: "orange", n: 6 }], ["tomatoes", { kind: "tomato", n: 100 }]].forEach(([nm, demo]) =>
  reg("Quantity", "pile-" + nm, "Pile of " + nm, (o) => L.svg("food-pile", Object.assign({}, demo, o)), { wide: true, demo, tags: ["pile", "heap", "many", "quantity", nm], call: `L.put(S, "food-pile", x, y, { s: 1, kind: "${demo.kind}", n: ${demo.n}, t })` }));

reg("Quantity", "stack", "Tall stack (n layers)", (o) => {
  const kind = ["pancake", "pizza-box", "burger"].includes(o.kind) ? o.kind : "pancake", n = Math.max(1, Math.min(60, Math.round(o.n || 8)));
  const per = kind === "burger" ? 28 : 15, H = n * per + (kind === "burger" ? 70 : 40), k = Math.min(1.4, 184 / H), out = []; let y = H / 2;
  if (kind === "pancake") { for (let i = 0; i < n; i++) { y -= per; out.push(sh(rr(-72, y, 144, 20, 10), "earth", { tone: i % 2 ? 0 : 1 }), fl(rr(-62, y + 3, 90, 4, 2), "white", 0.3)); }
    out.push(sh(rr(-18, y - 12, 36, 18, 6), "yellow", D), gl(rr(-12, y - 8, 12, 4, 2), 0.7), sh(sm([[-70, y + 8], [-50, y + 2], [-30, y + 12], [-10, y + 2], [20, y + 12], [44, y + 4], [70, y + 10], [70, y + 24], [-70, y + 24]]), "orange", { tone: 2, w: "detail" }).replace(/^/, "")); }
  else if (kind === "pizza-box") { for (let i = 0; i < n; i++) { y -= per; out.push(sh(rr(-84, y, 168, 17, 3), i % 2 ? "sand" : "earth", { tone: i % 2 ? 0 : 1 }), fl(rr(-84, y + 12, 168, 5, 0), "ink", 0.12), st(`M-74 ${y + 4} h46`, { c: "white", w: 2, op: 0.7 })); }
    out.push(L.text("PIZZA", 0, y + 13, { size: 12, c: "ink", weight: 700 })); }
  else { out.push(sh(rr(-52, y - 22, 104, 22, 10), "gold")); y -= 22;
    for (let i = 0; i < n; i++) { y -= 14; out.push(sh(rr(-54, y, 108, 16, 8), "brown"), sh(po([[-52, y - 3], [52, y - 3], [46, y + 10], [30, y + 4], [22, y + 18], [12, y + 4], [-48, y + 10]], true), "yellow", D)); y -= 4; out.push(sh(sm([[-58, y], [-44, y - 8], [-30, y], [-16, y - 8], [0, y], [16, y - 8], [30, y], [44, y - 8], [58, y], [48, y + 8], [-48, y + 8], [-58, y]]), "grass", D)); y -= 4; }
    out.push(sh(sm([[-52, y], [-48, y - 28], [-24, y - 46], [24, y - 46], [48, y - 28], [52, y], [-52, y]]), "gold"), ...[[-20, -30], [2, -36], [22, -28], [-4, -20]].map(([x, yy]) => fl(ci(x, y + yy + 8, 3.5, 2), "cream", 0.95))); }
  return g(A(L.shadow(0, H / 2 + 2, 170), ...out), `scale(${f1(k)}) translate(0 ${f1(-6 / k)})`); },
  { demo: { kind: "pancake", n: 8 }, call: 'L.put(S, "food-stack", x, y, { s: 1, kind: "pancake", n: 8, t })  // kind: pancake | pizza-box | burger, n: 1-60', tags: ["stack", "tower", "tall", "many", "quantity", "pile", "layers"] });
[["pancakes", { kind: "pancake", n: 20 }], ["pizza-boxes", { kind: "pizza-box", n: 12 }], ["burger-tower", { kind: "burger", n: 6 }]].forEach(([nm, demo]) =>
  reg("Quantity", "stack-" + nm, "Stack of " + nm.replace("-", " "), (o) => L.svg("food-stack", Object.assign({}, demo, o)), { demo, tags: ["stack", "tower", "tall", "quantity", nm], call: `L.put(S, "food-stack", x, y, { s: 1, kind: "${demo.kind}", n: ${demo.n}, t })` }));

reg("Quantity", "count", "Food × count label", (o) => { const kind = KINDS.includes(o.kind) ? o.kind : "apple", burgerK = o.kind === "burger";
  return A(g(burgerK ? g(burger(), "scale(0.6)") : unit(kind), "translate(-70 0) scale(1.45)"), L.text("× " + (o.n === undefined ? 365 : typeof o.n === "number" ? o.n.toLocaleString("en-US") : o.n), 4, 22, { size: 60, anchor: "start", halo: "white", c: "ink" })); },
  { wide: true, box: [-150, -75, 460, 150], demo: { kind: "apple", n: 365 }, call: 'L.put(S, "food-count", x, y, { s: 1, kind: "apple", n: 365, t })  // kind: apple | orange | donut | cookie | egg | tomato | burger, n: number or text', tags: ["count", "number", "times", "multiply", "quantity", "per year", "how many", "label"] });
[["burgers", { kind: "burger", n: 1000 }], ["donuts", { kind: "donut", n: 100 }]].forEach(([nm, demo]) =>
  reg("Quantity", "count-" + nm, nm[0].toUpperCase() + nm.slice(1) + " × count", (o) => L.svg("food-count", Object.assign({}, demo, o)), { wide: true, box: [-150, -75, 460, 150], demo, tags: ["count", "number", "times", "quantity", nm], call: `L.put(S, "food-count", x, y, { s: 1, kind: "${demo.kind}", n: ${demo.n}, t })` }));

// ============================ GUIDES AND GAUGES ============================
reg("Guides and gauges", "nutrition-label", "Nutrition label", (o) => { const v = Object.assign({ cal: 250, fat: 12, carbs: 30, sugar: 18, protein: 4, salt: 0.5 }, o), rows = [["Fat", v.fat + " g"], ["Carbs", v.carbs + " g"], ["Sugar", v.sugar + " g"], ["Protein", v.protein + " g"], ["Salt", v.salt + " g"]];
  return A(L.shadow(0, 150, 150), sh(rr(-90, -146, 180, 292, 8), "white"),
    L.text(o.title || "NUTRITION", 0, -110, { size: 26, weight: 700 }), L.text("per serving", 0, -84, { size: 15, c: "gray" }),
    st("M-78 -70 H78", { w: 10 }), L.text("Calories", -76, -26, { size: 16, anchor: "start" }), L.text(String(v.cal), 76, -22, { size: 34, anchor: "end", weight: 700 }), st("M-78 -8 H78", { w: 6 }),
    ...rows.map(([k, val], i) => A(L.text(k, -76, 26 + i * 24, { size: 18, anchor: "start" }), L.text(val, 76, 26 + i * 24, { size: 18, anchor: "end" }), st(`M-78 ${34 + i * 24} H78`, { w: 1.5, c: "gray" }))),
    st("M-78 -70 H78", { w: 0 })); },
  { box: [-110, -160, 220, 320], demo: { cal: 250, fat: 12, carbs: 30, sugar: 18, protein: 4, salt: 0.5 }, call: 'L.put(S, "food-nutrition-label", x, y, { s: 1, cal: 250, fat: 12, carbs: 30, sugar: 18, protein: 4, salt: 0.5, t })', tags: ["label", "calories", "facts", "ingredients", "packet", "macros", "sugar", "fat", "protein"] });
reg("Guides and gauges", "nutrition-label-sugar", "Nutrition label · sugar bomb", (o) => L.svg("food-nutrition-label", Object.assign({ cal: 540, fat: 24, carbs: 72, sugar: 58, protein: 3, salt: 1.1 }, o)), { box: [-110, -160, 220, 320], demo: {}, tags: ["label", "calories", "sugar", "junk food"], call: 'L.put(S, "food-nutrition-label", x, y, { s: 1, cal: 540, fat: 24, carbs: 72, sugar: 58, protein: 3, salt: 1.1, t })' });

reg("Guides and gauges", "pyramid", "Food pyramid", (o) => { const bands = [[-100, -62, "pink", "TREATS"], [-62, -20, "red", "PROTEIN"], [-20, 22, "blue", "DAIRY"], [22, 62, "green", "FRUIT + VEG"], [62, 100, "yellow", "GRAINS"]], hw = (y) => 40 + ((y + 100) / 200) * 90;
  return A(L.shadow(0, 100, 270), ...bands.map(([y0, y1, c, label]) => A(sh(po([[-hw(y0), y0], [hw(y0), y0], [hw(y1), y1], [-hw(y1), y1]], true), c, { tone: c === "blue" ? 1 : 0 }), o.labels === false ? "" : L.text(label, 0, (y0 + y1) / 2 + 6, { size: y1 - y0 > 38 ? 17 : 14, weight: 700, c: c === "red" || c === "green" || c === "blue" ? "white" : "ink" }))),
    gl(po([[-hw(-96) + 6, -96], [-hw(-80) + 4, -80], [-hw(-80) + 14, -80], [-hw(-96) + 14, -96]], true), 0.0)); },
  { wide: true, box: [-150, -115, 300, 230], demo: { labels: true }, call: 'L.put(S, "food-pyramid", x, y, { s: 1, labels: true, t })', tags: ["food pyramid", "diet", "healthy", "nutrition", "guide", "food groups", "balanced"] });

reg("Guides and gauges", "plate-guide", "Healthy plate guide", (o) => { const secs = [[90, 200, "green", "VEG"], [200, 270, "red", "FRUIT"], [270, 360, "yellow", "GRAINS"], [0, 90, "orange", "PROTEIN"]];
  return A(L.shadow(0, 100, 220), sh(ci(0, 0, 102), "white"),
    ...secs.map(([a0, a1, c]) => sh(pie(0, 0, 88, a0, a1), c, { w: "detail" })),
    ...secs.map(([a0, a1, , label]) => { const m = deg((a0 + a1) / 2), r = label === "FRUIT" ? 60 : 54; return o.labels === false ? "" : L.text(label, Math.cos(m) * r, Math.sin(m) * r + 6, { size: 16, weight: 700, c: "ink", halo: "white" }); }),
    gl(L.arc(0, 0, 96, 200, 250), 0.6)); },
  { demo: { labels: true }, call: 'L.put(S, "food-plate-guide", x, y, { s: 1, labels: true, t })', tags: ["plate", "balanced diet", "healthy", "portion", "nutrition", "guide", "meal"] });

reg("Guides and gauges", "calorie-counter", "Calorie counter", (o) => { const v = o.value === undefined ? 2000 : o.value, mx = o.max || 2500, k = Math.max(0, Math.min(1, v / mx)), bar = k < 0.7 ? "green" : k < 1 ? "yellow" : "red";
  return A(L.shadow(0, 62, 220), sh(rr(-112, -60, 224, 120, 20), "navy"), sh(rr(-100, -48, 200, 66, 12), "ink", { tone: 1, w: "detail" }),
    g(A(sh(sm([[0, -26], [16, -4], [20, 14], [8, 28], [-8, 28], [-20, 14], [-14, -6], [-4, 4], [0, -26]]), "orange"), sh(sm([[0, 4], [8, 14], [4, 24], [-4, 24], [-8, 14], [0, 4]]), "yellow", D)), "translate(-66 -14) scale(0.9)"),
    L.text(typeof v === "number" ? v.toLocaleString("en-US") : v, 22, -6, { size: String(v).length > 4 ? 34 : 42, c: "white", weight: 700, anchor: "middle" }), L.text("CALORIES", 20, 12, { size: 13, c: "gray" }),
    sh(rr(-96, 32, 192, 14, 7), "gray", { tone: 2, w: "detail" }), k > 0 ? sh(rr(-96, 32, Math.max(14, 192 * k), 14, 7), bar, { w: "detail" }) : ""); },
  { box: [-125, -70, 250, 140], demo: { value: 2000, max: 2500 }, call: 'L.put(S, "food-calorie-counter", x, y, { s: 1, value: 2000, max: 2500, t })  // bar turns red at/over max', tags: ["calories", "kcal", "energy", "diet", "counter", "tracker", "app", "number"] });
reg("Guides and gauges", "calorie-counter-over", "Calorie counter · way over", (o) => L.svg("food-calorie-counter", Object.assign({ value: 12000, max: 2500 }, o)), { box: [-125, -70, 250, 140], demo: {}, tags: ["calories", "kcal", "too much", "overeating"], call: 'L.put(S, "food-calorie-counter", x, y, { s: 1, value: 12000, max: 2500, t })' });

reg("Guides and gauges", "fullness-dial", "Stomach fullness dial", (o) => { const lv = Math.max(0, Math.min(1, o.level === undefined ? 0.5 : o.level)), a = deg(180 + lv * 180), zone = (a0, a1, c) => tube(L.arc(0, 40, 80, a0, a1), c, 26);
  return A(L.shadow(0, 56, 200), zone(180, 252, "green"), zone(252, 306, "yellow"), zone(306, 360, "red"),
    tube(`M0 40 L${f1(Math.cos(a) * 70)} ${f1(40 + Math.sin(a) * 70)}`, "ink", 7), dot(0, 40, 13, "ink"), dot(0, 40, 5, "white", D),
    L.text("EMPTY", -80, 76, { size: 16, weight: 700 }), L.text("FULL", 80, 76, { size: 16, weight: 700 }), L.text(o.label || "STOMACH", 0, -66, { size: 18, weight: 700 })); },
  { box: [-125, -100, 250, 190], demo: { level: 0.5 }, call: 'L.put(S, "food-fullness-dial", x, y, { s: 1, level: 0.5, t })  // level 0 = empty … 1 = bursting', tags: ["stomach", "full", "hungry", "meter", "gauge", "dial", "appetite", "eating"] });
[["empty", 0.05], ["full", 0.72], ["bursting", 1]].forEach(([nm, level]) => reg("Guides and gauges", "fullness-dial-" + nm, "Fullness dial · " + nm, (o) => L.svg("food-fullness-dial", Object.assign({ level }, o)), { box: [-125, -100, 250, 190], demo: { level }, tags: ["stomach", "meter", "gauge", nm], call: `L.put(S, "food-fullness-dial", x, y, { s: 1, level: ${level}, t })` }));

reg("Guides and gauges", "stomach-cartoon", "Cartoon stomach", (o) => { const lv = Math.max(0, Math.min(1, o.level === undefined ? 0.5 : o.level)), k = 0.7 + lv * 0.32, body = sm([[-30, -70], [10, -80], [40, -60], [54, -20], [62, 20], [44, 60], [0, 76], [-44, 60], [-60, 20], [-52, -20], [-30, -70]]);
  const eyes = lv > 0.85 ? A(st("M-26 -8 l12 12 m0 -12 l-12 12", { w: 5 }), st("M10 -8 l12 12 m0 -12 l-12 12", { w: 5 })) : A(dot(-20, -2, 6, "ink", { flat: true }), dot(16, -2, 6, "ink", { flat: true })),
    mouth = lv < 0.3 ? st("M-14 34 Q-2 22 10 34", { w: 5 }) : lv > 0.85 ? st("M-16 30 q8 -8 16 0 t16 0", { w: 5 }) : st("M-14 26 Q-2 40 10 26", { w: 5 });
  return A(g(A(L.shadow(0, 78, 140), tube("M-34 -66 Q-40 -96 -20 -106", "pink", 16), sh(body, "pink"), fl(ci(-26, -24, 20, 12), "white", 0.18), fl(ci(-34, 6, 7, 5), "red", 0.28), fl(ci(30, 6, 7, 5), "red", 0.28), eyes, mouth,
    lv < 0.3 ? A(st("M62 -4 q10 -6 20 0 M66 14 q10 -6 22 0", { c: "gray", w: 3, op: 0.8 }), st("M-70 -4 q-10 -6 -20 0 M-74 14 q-10 -6 -22 0", { c: "gray", w: 3, op: 0.8 })) : "",
    lv > 0.85 ? A(sh(sm([[48, -50], [56, -66], [64, -50], [56, -44], [48, -50]]), "water", D), sh(sm([[-58, -42], [-50, -58], [-42, -42], [-50, -36], [-58, -42]]), "water", D)) : "",
    gl(sm([[-44, -22], [-36, -48], [-18, -62], [-28, -38], [-40, -6], [-44, -22]]), 0.45)), `translate(0 20) scale(${f1(k)}) translate(0 ${f1(-8 / k)})`)); },
  { demo: { level: 0.5 }, call: 'L.put(S, "food-stomach-cartoon", x, y, { s: 1, level: 0.5, t })  // level 0 = hungry … 1 = stuffed', tags: ["stomach", "belly", "hungry", "full", "digestion", "cartoon", "organ", "tummy"] });
[["hungry", 0.05], ["stuffed", 1]].forEach(([nm, level]) => reg("Guides and gauges", "stomach-cartoon-" + nm, "Cartoon stomach · " + nm, (o) => L.svg("food-stomach-cartoon", Object.assign({ level }, o)), { demo: { level }, tags: ["stomach", "belly", "tummy", nm], call: `L.put(S, "food-stomach-cartoon", x, y, { s: 1, level: ${level}, t })` }));

// ============================ TABLEWARE AND KITCHEN ============================
reg("Tableware and kitchen", "cutlery-set", "Fork, knife and spoon", () => A(
  L.shadow(0, 106, 170),
  g(A(sh(rr(-6, -34, 12, 126, 6), "gray"), sh(rr(-22, -96, 44, 44, 12), "gray"), ...[-17, -6, 5, 16].map((x) => sh(rr(x - 3, -102, 7, 40, 3), "gray", { tone: 1, w: "detail" })), gl(rr(-3, -26, 3, 100, 1.5), 0.7)), "translate(-56 0)"),
  g(A(sh(rr(-6, -20, 12, 112, 6), "gray"), sh(sm([[-10, -98], [10, -90], [14, -10], [-10, -10], [-10, -98]]), "gray", { tone: 1 }), gl(rr(-7, -88, 3, 70, 1.5), 0.7)), "translate(0 0)"),
  g(A(sh(rr(-6, -20, 12, 112, 6), "gray"), sh(ci(0, -64, 20, 30), "gray", { tone: 1 }), gl(ci(-8, -76, 4, 10), 0.7)), "translate(56 0)")), { tags: ["cutlery", "silverware", "utensils", "eating", "dinner", "table setting"] });

reg("Tableware and kitchen", "chopsticks", "Chopsticks", () => A(
  L.shadow(0, 62, 150),
  sh(rr(-52, 38, 104, 18, 8), "teal", { w: "detail" }),
  g(A(sh(po([[-6, -100], [6, -100], [3, 100], [-3, 100]], true), "wood"), sh(rr(-6.5, -100, 13, 36, 4), "red", D)), "translate(-14 -8) rotate(-28) scale(0.82)"),
  g(A(sh(po([[-6, -100], [6, -100], [3, 100], [-3, 100]], true), "wood"), sh(rr(-6.5, -100, 13, 36, 4), "red", D)), "translate(10 -10) rotate(-36) scale(0.82)")), { tags: ["chopsticks", "asian", "utensils", "eating", "japanese", "chinese", "noodles"] });

reg("Tableware and kitchen", "lunchbox-open", "Lunchbox, open (bento)", () => A(
  L.shadow(0, 76, 200), sh(rr(-98, -72, 196, 148, 24), "blue"), sh(rr(-84, -58, 168, 120, 14), "white", { w: "detail" }), st("M10 -58 V62 M10 4 H84", { c: "blue", w: 5, op: 0.6 }),
  g(A(sh(po([[-34, 24], [34, 24], [0, -30]], true), "cream", { w: "detail" }), sh(po([[-34, 24], [34, 24], [30, 16], [-30, 16]], true), "earth", D), sh(sm([[-26, 14], [-14, 8], [0, 14], [14, 8], [26, 14], [0, 18]]), "grass", D), sh(po([[-14, 2], [14, 2], [8, -8], [-8, -8]], true), "yellow", D)), "translate(-46 4) rotate(-14)"),
  g(A(sh(po([[-34, 24], [34, 24], [0, -30]], true), "cream", { w: "detail" }), sh(po([[-34, 24], [34, 24], [30, 16], [-30, 16]], true), "earth", D)), "translate(-30 24) rotate(20) scale(0.8)"),
  g(unit("apple"), "translate(48 -26) scale(0.95)"),
  ...[0, 1, 2].map((i) => g(sh(rr(-4, -34, 8, 54, 4), "orange", D), `translate(${28 + i * 16} 38) rotate(${-70 + i * 6})`)), sh(sm([[26, 30], [32, 22], [42, 28], [34, 36], [26, 30]]), "grass", D),
  gl(rr(-88, -66, 60, 5, 2.5), 0.5)), { tags: ["lunch", "bento", "school", "packed lunch", "container", "healthy"] });

reg("Tableware and kitchen", "lunchbox-closed", "Lunchbox, closed", (o) => { const c = col(o, "red"); return A(
  L.shadow(0, 62, 190), tube("M-34 -44 Q0 -100 34 -44", "gray", 9),
  sh(rr(-84, -36, 168, 98, 18), c), sh(rr(-88, -46, 176, 34, 14), c, { tone: 1 }), sh(rr(-14, -34, 28, 28, 6), "gold", D), dot(0, -20, 5, "ink", D),
  sh(rr(-66, 18, 132, 30, 8), "white", D), L.text(o.label || "LUNCH", 0, 41, { size: 20, weight: 700 }),
  gl(rr(-76, -26, 6, 78, 3), 0.5)); }, { demo: { color: "red", label: "LUNCH" }, tags: ["lunch", "school", "packed lunch", "container", "box"] });

const fridgeItems = (empty) => empty ? A(sh(ci(0, -100, 14, 12), "yellow", D), sh(sm([[-30, -76], [-16, -76], [-16, -90], [-30, -90], [-30, -76]]), "orange", D)) : A(
  // top shelf: milk, jam, eggs
  sh(po([[-52, -176], [-30, -176], [-30, -134], [-52, -134]], true), "white", D), sh(po([[-52, -176], [-41, -188], [-30, -176]], true), "blue", D), sh(rr(-50, -158, 18, 12, 2), "blue", { w: "detail" }),
  sh(rr(-22, -156, 24, 22, 6), "red", D), sh(rr(-18, -164, 16, 8, 3), "gray", D),
  ...[14, 32, 50].map((x) => sh(ci(x, -145, 8, 11), "cream", { tone: 0, w: "detail" })),
  // middle: cheese, apple, bottle
  sh(po([[-54, -76], [-16, -76], [-16, -98], [-54, -82]], true), "yellow", D), dot(-32, -86, 3, "orange", D),
  dot(4, -90, 14, "red", D), sh(rr(26, -118, 20, 44, 6), "green", D), sh(rr(31, -124, 10, 8, 3), "gray", D), sh(rr(50, -100, 8, 26, 3), "orange", D),
  // low: tomato, lettuce, carrot
  dot(-34, -36, 18, "red", D), dot(6, -32, 20, "grass", D), st("M-4 -40 Q6 -26 -2 -22 M10 -44 Q18 -30 12 -22", { c: "green", w: 2, op: 0.7 }), g(sh(po([[-6, -4], [6, -4], [0, 36]], true), "orange", D), "translate(42 -52) rotate(70)"));
reg("Tableware and kitchen", "fridge-stocked", "Fridge, open and stocked", (o) => A(
  L.shadow(20, 0, 210), sh(rr(-72, -200, 144, 200, 12), "gray"), sh(rr(-62, -190, 124, 180, 6), "cream", { tone: 1, flat: true }), fl(rr(-62, -190, 124, 46, 6), "yellow", 0.22),
  ...[-130, -70, -14].map((y) => sh(rr(-62, y, 124, 7, 2), "glass", { w: "detail" })),
  fridgeItems(o.empty),
  sh(po([[72, -200], [134, -178], [134, -22], [72, 0]], true), "white"),
  sh(po([[78, -188], [126, -172], [126, -140], [78, -150]], true), "glass", D), sh(po([[78, -120], [126, -104], [126, -74], [78, -88]], true), "glass", D),
  o.empty ? "" : A(sh(rr(86, -170, 10, 22, 3), "orange", D), sh(rr(102, -166, 10, 22, 3), "green", D), sh(rr(86, -102, 10, 20, 3), "red", D)),
  sh(rr(120, -150, 6, 50, 3), "gray", D)), { stand: true, demo: { empty: false }, box: [-100, -215, 260, 235], call: 'L.put(S, "food-fridge-stocked", x, gy, { s: 1, empty: false, t })  // empty: true = hungry-night fridge', tags: ["refrigerator", "kitchen", "food", "open", "cold", "midnight snack", "groceries"] });
reg("Tableware and kitchen", "fridge-empty", "Fridge, open and nearly empty", (o) => L.svg("food-fridge-stocked", { empty: true }), { stand: true, box: [-100, -215, 260, 235], demo: {}, call: 'L.put(S, "food-fridge-stocked", x, gy, { s: 1, empty: true, t })', tags: ["refrigerator", "kitchen", "empty", "hungry", "no food"] });

reg("Tableware and kitchen", "grocery-bag", "Grocery bag", () => A(
  g(sh(rr(-8, -100, 20, 100, 10), "earth", { tone: 1 }), "translate(-22 4) rotate(-14)"),
  st("M-22 -86 l-6 -22 M-14 -90 l0 -26 M-6 -88 l8 -22", { c: "green", w: 5 }).replace("<path ", '<path stroke-linecap="round" ').slice(0, 0),
  g(A(tube("M0 -20 L0 -70", "green", 9), sh(po([[-12, -20], [12, -20], [0, 40]], true), "orange", D)), "translate(36 -28) rotate(12)"),
  g(A(sh(rr(-16, -56, 32, 56, 4), "white", D), sh(po([[-16, -56], [0, -70], [16, -56]], true), "blue", D)), "translate(-4 -34) rotate(-6)"),
  dot(46, -34, 17, "orange", D),
  sh(po([[-62, -30], [62, -30], [56, 92], [-56, 92]], true), "earth"), sh(po([[34, -30], [62, -30], [56, 92], [28, 92]], true), "earth", { tone: 2, w: "detail" }).replace(/^/, ""),
  st("M-62 -30 H62", { w: "detail", c: "earth" }), st("M-46 28 H46", { c: "earth", w: 2, op: 0.0 }), gl(rr(-52, -20, 8, 100, 4), 0.35)), { tags: ["shopping", "groceries", "shop", "bag", "supermarket", "food", "paper bag"] });

reg("Tableware and kitchen", "place-setting", "Place setting", () => { const fork = (x) => g(A(sh(rr(-5, -20, 10, 110, 5), "gray"), sh(rr(-16, -78, 32, 36, 9), "gray"), ...[-11, -4, 3, 10].map((dx) => sh(rr(dx - 2.5, -88, 5, 32, 2), "gray", { tone: 1, w: "detail" }))), `translate(${x} 0)`),
  knife = (x) => g(A(sh(rr(-5, -10, 10, 100, 5), "gray"), sh(sm([[-8, -86], [8, -78], [10, -4], [-8, -4], [-8, -86]]), "gray", { tone: 1 })), `translate(${x} 0)`),
  spoon = (x) => g(A(sh(rr(-5, -10, 10, 100, 5), "gray"), sh(ci(0, -50, 14, 24), "gray", { tone: 1 })), `translate(${x} 0)`);
  return A(L.shadow(0, 82, 260), sh(rr(-142, -84, 284, 170, 14), "wall", { tone: 2 }), sh(ci(0, 0, 72), "white"), st(ci(0, 0, 50), { c: "gray", w: "detail", op: 0.35 }), gl(L.arc(0, 0, 66, 200, 250), 0.6), sh(rr(-134, -46, 38, 56, 6), "blue", { tone: 1, w: "detail" }).slice(0, 0), g(A(fork(-112), knife(104), spoon(132)), "translate(0 -4) scale(0.92)")); },
  { wide: true, box: [-150, -95, 300, 190], tags: ["table", "dinner", "cutlery", "plate", "meal", "setting", "restaurant"] });

reg("Tableware and kitchen", "water-glass", "Glass of water", () => A(
  L.shadow(0, 76, 100), sh(po([[-40, -76], [40, -76], [32, 76], [-32, 76]], true), "glass"), sh(sm([[-37, -40], [-18, -46], [0, -40], [18, -46], [37, -40], [31, 72], [-31, 72], [-37, -40]]), "water", { tone: 1, w: "detail" }),
  ...[[-12, 10, 5], [10, 30, 4], [-4, -14, 3.5], [14, -2, 3]].map(([x, y, r]) => fl(ci(x, y, r), "white", 0.55)), gl(rr(-30, -64, 7, 120, 3), 0.6)), { tags: ["drink", "water", "hydration", "glass", "thirst", "healthy"] });

})();
