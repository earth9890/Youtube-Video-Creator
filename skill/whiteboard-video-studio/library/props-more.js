// ===================== library/props-more.js — more props, pictograms and small scenery (category "props2") =====================
// Floating props: origin = centre (~170 px across). Standing things (stand: true): origin = bottom centre on the ground.
// Every asset: L.put(S, "p2-<name>", x, y, { s, t, ...options }). Options: color (palette name), open, full, level, etc. (see each call line).
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
const ngon = (cx, cy, r, n, a0 = -90) => po(Array.from({ length: n }, (_, i) => [cx + r * Math.cos(deg(a0 + (360 * i) / n)), cy + r * Math.sin(deg(a0 + (360 * i) / n))]), true);
// a thick line with the look's outline around it (handles, cords, stems)
const tube = (d, c, w = 8) => {
  const oc = L.outline(c), base = { d, fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round" };
  return (oc === "none" ? "" : L.tag("path", Object.assign({ stroke: oc, "stroke-width": w + 2 * L.lw("detail") }, base))) + L.tag("path", Object.assign({ stroke: L.c(c), "stroke-width": w }, base));
};
// solid fill + features clipped inside + outline on top
const solid = (d, c, inner = "", o = {}) => {
  const id = "p2c" + (L._n = (L._n || 0) + 1), ol = o.oc || L.outline(c);
  return L.tag("path", { d, fill: L.paint(c, o) }) + (inner ? `<clipPath id="${id}"><path d="${d}"/></clipPath><g clip-path="url(#${id})">${inner}</g>` : "") +
    (ol === "none" ? "" : L.tag("path", { d, fill: "none", stroke: ol, "stroke-width": L.lw(o.w || "prop", o.s || 1), "stroke-linejoin": L.T.join, "stroke-linecap": L.T.cap }));
};
const clipTo = (d, inner) => { const id = "p2c" + (L._n = (L._n || 0) + 1); return `<clipPath id="${id}"><path d="${d}"/></clipPath><g clip-path="url(#${id})">${inner}</g>`; };

const steam = (x, y) => st(sm([[x, y], [x - 8, y - 14], [x + 8, y - 28], [x, y - 42]]), { c: "gray", w: 5, op: 0.55 });
const reg = (group, name, label, fn, meta = {}) => {
  const { tags = [], stand, demo, ...rest } = meta;
  const opts = Object.entries(demo || {}).map(([k, v]) => `, ${k}: ${JSON.stringify(v)}`).join("");
  L.reg("props2", "p2-" + name, fn, Object.assign({ group, label, demo: demo || {}, tags: [label.toLowerCase(), group.toLowerCase(), ...tags],
    box: stand ? [-120, -215, 240, 235] : [-110, -110, 220, 220], call: `L.put(S, "p2-${name}", x, y, { s: 1${opts}, t })` }, rest));
};
// the same prop under several option sets: one gallery tile each
const variants = (group, name, label, fn, list, meta = {}) => list.forEach(([key, demo, lab]) => reg(group, name + "-" + key, label + " · " + (lab || key), fn, Object.assign({}, meta, { demo })));

// ============================ DRINKS ============================
const canFn = (o) => { const c = col(o, "red"), band = c === "yellow" || c === "white" ? "red" : "white"; return A(
  sh(rr(-33, -72, 66, 144, 10), c),
  fl(po([[-33, -12], [33, -38], [33, -8], [-33, 18]], true), band),
  sh(rr(-33, -74, 66, 14, 6), "gray", D), sh(rr(-33, 60, 66, 14, 6), "gray", D),
  sh(ci(5, -70, 10, 3.5), "gray", { tone: 2, w: "detail" }),
  gl(rr(-26, -52, 7, 104, 3), 0.45)); };
variants("Drinks", "soda-can", "Soda can", canFn, ["red", "blue", "green", "orange", "purple", "yellow"].map((c) => [c, { color: c }]), { tags: ["drink", "can", "fizzy", "pop"] });

reg("Drinks", "bottle", "Bottle", (o) => { const c = col(o, "green"), full = pick(o, "full", true); return A(
  sh(sm([[-13, -66], [13, -66], [14, -44], [34, -20], [34, 68], [28, 80], [-28, 80], [-34, 68], [-34, -20], [-14, -44], [-13, -66]]), "glass"),
  full ? sh(sm([[-34, -8], [-14, -14], [14, -14], [34, -8], [34, 68], [28, 80], [-28, 80], [-34, 68], [-34, -8]]), c, { tone: 2 }) : "",
  sh(rr(-34, 14, 68, 38, 2), "cream", D), sh(ci(0, 33, 10), c, D),
  sh(rr(-15, -78, 30, 16, 5), "gray", D),
  gl(rr(-27, -6, 6, 78, 3), 0.55)); }, { demo: { color: "green", full: true }, tags: ["drink", "glass", "soft drink", "empty", "full"] });

reg("Drinks", "smoothie", "Smoothie", (o) => { const c = col(o, "pink"); return A(
  tube("M8 -34 L26 -90", "red", 9), st("M8 -34 L26 -90", { c: "white", w: 3, op: 0.7 }),
  sh(po([[-40, -42], [40, -42], [31, 78], [-31, 78]], true), "glass"),
  sh(po([[-37, -30], [37, -30], [30, 72], [-30, 72]], true), c, D),
  sh(sm([[-37, -30], [-18, -40], [0, -30], [18, -40], [37, -30]]) + "L37 -26 L-37 -26Z", c, { tone: 1, w: "detail" }),
  sh(ci(-34, -44, 14), "red", D), fl(po([[-40, -56], [-34, -64], [-28, -56]], true), "green"),
  gl(rr(-30, -20, 6, 70, 3), 0.55)); }, { demo: { color: "pink" }, tags: ["drink", "juice", "shake", "straw", "fruit"] });

reg("Drinks", "coffee-togo", "Coffee to-go cup", (o) => A(
  o.hot === false ? "" : steam(0, -86),
  sh(po([[-36, -50], [36, -50], [27, 76], [-27, 76]], true), "paper"),
  sh(po([[-33, -6], [33, -6], [30, 36], [-30, 36]], true), "earth", { tone: 2 }),
  sh(rr(-42, -72, 84, 24, 9), "brown", D), sh(rr(-30, -84, 60, 14, 6), "brown", D),
  st("M-18 -77 h16", { c: "white", w: 4, op: 0.7 }),
  gl(po([[-28, -44], [-22, -44], [-18, 70], [-24, 70]], true), 0.5)), { demo: {}, tags: ["drink", "cafe", "tea", "paper cup", "hot"] });

reg("Drinks", "teapot", "Teapot", (o) => { const c = col(o, "teal"); return A(
  steam(-2, -82),
  tube("M-50 -10 Q-92 -10 -86 22 Q-80 46 -48 38", c, 12),
  sh(sm([[40, 22], [66, -34], [88, -50], [90, -38], [74, -6], [56, 34]]) + "Z", c, { tone: 2 }),
  sh(sm([[-56, 6], [-44, -42], [0, -54], [44, -42], [56, 6], [44, 50], [0, 58], [-44, 50], [-56, 6]]), c),
  sh(sm([[-30, -50], [-16, -68], [16, -68], [30, -50]]) + "Z", c, { tone: 2 }), dot(0, -74, 8, "gold", D),
  st(sm([[-40, 0], [0, 10], [40, 0]]), { c: "white", w: 5, op: 0.7 }),
  gl(sm([[-44, -14], [-38, -34], [-22, -44], [-30, -24], [-44, -14]]), 0.5)); }, { demo: { color: "teal" }, tags: ["tea", "pot", "kettle", "drink"] });

reg("Drinks", "juice-glass", "Juice glass", (o) => { const c = col(o, "orange"); return A(
  tube("M10 -30 L30 -84", "white", 8),
  sh(po([[-38, -44], [38, -44], [30, 74], [-30, 74]], true), "glass"),
  sh(po([[-35, -30], [35, -30], [29, 68], [-29, 68]], true), c, D),
  sh(ci(-32, -44, 20), "orange", { w: "detail" }), fl(ci(-32, -44, 13), "yellow"),
  ...[0, 60, 120, 180, 240, 300].map((a) => st(`M-32 -44 l${f1(13 * Math.cos(deg(a)))} ${f1(13 * Math.sin(deg(a)))}`, { c: "orange", w: 2.5 })),
  gl(rr(-28, -16, 6, 70, 3), 0.55)); }, { demo: { color: "orange" }, tags: ["drink", "orange juice", "glass", "straw"] });

reg("Drinks", "jug", "Water jug", () => A(
  ring(62, -2, 32, 17, "glass"),
  sh(po([[-46, -64], [-62, -76], [-46, -46]], true), "glass", D),
  sh(rr(-46, -66, 92, 146, 12), "glass"),
  sh(rr(-43, -30, 86, 107, 10), "water", D),
  sh(ci(-10, -30, 18), "yellow", D), st("M-10 -30 m-12 0 h24 M-10 -30 m0 -12 v24", { c: "gold", w: 2.5 }),
  gl(rr(-36, -10, 6, 70, 3), 0.55)), { demo: {}, tags: ["water", "pitcher", "lemonade", "drink"] });

reg("Drinks", "thermos", "Thermos flask", (o) => { const c = col(o, "blue"); return A(
  sh(rr(-30, -86, 60, 34, 12), "gray", { tone: 2 }), sh(rr(-34, -56, 68, 14, 5), "gray"),
  sh(rr(-34, -46, 68, 124, 14), c),
  sh(rr(-34, 20, 68, 20, 2), "white", D),
  sh(rr(-12, -102, 24, 18, 5), "gray", D),
  gl(rr(-26, -34, 7, 100, 3), 0.5)); }, { demo: { color: "blue" }, tags: ["flask", "bottle", "drink", "hot", "camping"] });

// ============================ FOOD ============================
reg("Food", "hot-dog", "Hot dog", () => A(
  sh(sm([[-82, 0], [-70, -20], [-30, -26], [30, -26], [70, -20], [82, 0], [70, 24], [30, 30], [-30, 30], [-70, 24], [-82, 0]]), "gold", { tone: 2 }),
  tube("M-92 -6 L92 -6", "red", 34),
  st("M-72 -16 l12 -8 l12 14 l12 -14 l12 14 l12 -14 l12 14 l12 -14 l12 14 l12 -14 l12 14", { c: "yellow", w: 6 }),
  sh(sm([[-80, 6], [-30, 0], [30, 0], [80, 6], [68, 32], [30, 40], [-30, 40], [-68, 32], [-80, 6]]), "gold"),
  gl(sm([[-66, 12], [-40, 6], [-56, 22], [-66, 12]]), 0.5)), { tags: ["fast food", "sausage", "bun", "snack"] });

reg("Food", "sushi", "Sushi", () => A(
  g(A(sh(ci(0, 0, 36), "ink", { tone: 1 }), sh(ci(0, 0, 28), "white", D), sh(ci(0, 0, 13), "orange", D), dot(0, 0, 6, "green", D)), "translate(-40 18) scale(0.95)"),
  g(A(sh(rr(-46, 0, 92, 36, 16), "white"), sh(sm([[-54, 2], [-30, -26], [20, -30], [54, 0], [46, 16], [0, 8], [-46, 14], [-54, 2]]), "orange"),
    st("M-30 -18 Q-10 -6 -14 8 M2 -22 Q22 -8 16 6 M30 -14 Q40 -4 36 4", { c: "pink", w: 4 }), gl(sm([[-40, -6], [-24, -18], [-30, -4], [-40, -6]]), 0.5)), "translate(36 22) scale(0.95)"),
  tube("M-100 -48 L100 -70", "wood", 7), tube("M-96 -62 L104 -52", "wood", 7)), { tags: ["japanese", "rice", "fish", "roll", "food"] });

reg("Food", "salad", "Salad bowl", () => A(
  sh(sm([[-60, -14], [-40, -52], [-6, -60], [32, -50], [60, -14]]) + "Z", "green"),
  sh(sm([[-38, -30], [-20, -66], [10, -54], [-2, -32]]) + "Z", "green", { tone: 1, w: "detail" }),
  sh(ci(-26, -28, 13), "red", D), sh(ci(28, -34, 12), "red", D), sh(ci(2, -40, 11), "orange", D),
  sh(sm([[-66, -16], [66, -16], [60, 24], [36, 62], [-36, 62], [-60, 24], [-66, -16]]), "teal"),
  st("M-62 -4 H62", { c: "gray", w: "detail", op: 0.4 }),
  gl(sm([[-56, -2], [-48, 24], [-32, 44], [-44, 18], [-56, -2]]), 0.55)), { tags: ["vegetables", "healthy", "lettuce", "food"] });

reg("Food", "cupcake", "Cupcake", (o) => { const c = col(o, "pink"); return A(
  sh(po([[-48, -2], [48, -2], [34, 66], [-34, 66]], true), c, { tone: 2 }),
  ...[-30, -15, 0, 15, 30].map((x) => st(`M${x} 0 L${f1(x * 0.72)} 64`, { c: "white", w: 3, op: 0.5 })),
  sh(sm([[-54, -4], [-46, -30], [-20, -40], [-2, -66], [20, -42], [46, -30], [54, -4], [0, 4], [-54, -4]]), "cream"),
  st("M-40 -22 Q0 -10 40 -22 M-20 -46 Q0 -34 22 -46", { c: "cream", w: 5, op: 0.9 }),
  dot(2, -72, 9, "red", D), st("M2 -80 Q6 -90 14 -92", { c: "brown", w: "detail" }),
  gl(sm([[-38, -24], [-28, -34], [-24, -24], [-38, -24]]), 0.6)); }, { demo: { color: "pink" }, tags: ["cake", "muffin", "bakery", "dessert", "sweet"] });

reg("Food", "cereal-bowl", "Cereal bowl", () => A(
  tube("M24 -64 L60 -96", "gray", 8), sh(ci(60, -98, 12, 9), "gray", D),
  sh(sm([[-76, -10], [76, -10], [66, 30], [34, 62], [-34, 62], [-66, 30], [-76, -10]]), "blue"),
  sh(ci(0, -12, 76, 22), "cream", D),
  ...[[-40, -14], [-10, -22], [24, -16], [46, -10], [-24, -8], [8, -8]].map(([x, y]) => ring(x, y, 11, 4.5, "gold", D)),
  gl(sm([[-66, 6], [-56, 30], [-36, 50], [-50, 24], [-66, 6]]), 0.5)), { tags: ["breakfast", "milk", "cornflakes", "food"] });

reg("Food", "orange", "Orange", (o) => o.slice ? A(
  sh(ci(0, 0, 64), "orange"), sh(ci(0, 0, 54), "yellow", D),
  ...[0, 40, 80, 120, 160, 200, 240, 280, 320].map((a) => st(`M0 0 L${f1(54 * Math.cos(deg(a)))} ${f1(54 * Math.sin(deg(a)))}`, { c: "orange", w: 3 })),
  dot(0, 0, 6, "orange", D), gl(sm([[-36, -30], [-22, -42], [-26, -30], [-36, -30]]), 0.6)) : A(
  sh(ci(0, 6, 64), "orange"), sh(sm([[2, -52], [20, -82], [54, -76], [38, -54], [2, -52]]), "green", D), dot(0, -54, 5, "brown", D),

  gl(sm([[-46, -10], [-40, -34], [-22, -46], [-30, -26], [-46, -10]]), 0.55)), { demo: {}, tags: ["fruit", "citrus", "slice"] });
reg("Food", "orange-slice", "Orange slice", (o) => L.svg("p2-orange", { slice: true }), { tags: ["fruit", "citrus"] });

reg("Food", "grapes", "Grapes", (o) => { const c = col(o, "purple"), pts = [[-44, -30], [-14, -34], [16, -34], [44, -30], [-30, -4], [0, -6], [30, -4], [-14, 22], [14, 22], [0, 48]]; return A(
  tube("M0 -34 Q4 -66 18 -84", "brown", 8), sh(sm([[10, -70], [40, -92], [74, -70], [44, -58], [10, -70]]), "green", D),
  ...pts.map(([x, y]) => dot(x, y, 22, c)), ...pts.map(([x, y]) => gl(ci(x - 8, y - 8, 5), 0.6))); }, { demo: { color: "purple" }, tags: ["fruit", "bunch", "vine", "wine-free", "green grapes"] });

reg("Food", "strawberry", "Strawberry", () => A(
  sh(sm([[0, -50], [40, -58], [66, -26], [48, 20], [0, 74], [-48, 20], [-66, -26], [-40, -58], [0, -50]]), "red"),
  ...[[-28, -20], [0, -26], [28, -20], [-36, 6], [-10, 0], [16, 0], [38, 6], [-20, 28], [8, 26], [-2, 50]].map(([x, y]) => fl(L.circ(x, y, 3.2, 4.5), "yellow")),
  sh(sm([[-36, -52], [-18, -70], [0, -56], [18, -70], [36, -52], [14, -48], [0, -38], [-14, -48], [-36, -52]]), "green", D),
  tube("M0 -58 L4 -80", "green", 6),
  gl(sm([[-52, -22], [-44, -42], [-30, -48], [-40, -28], [-48, -4], [-52, -22]]), 0.5)), { tags: ["fruit", "berry"] });

reg("Food", "watermelon", "Watermelon slice", () => A(
  sh("M-84 -30 A84 84 0 0 0 84 -30 Z", "green"),
  sh("M-72 -30 A72 72 0 0 0 72 -30 Z", "cream", D), sh("M-64 -30 A64 64 0 0 0 64 -30 Z", "red", D),
  ...[[-34, -6], [-6, 6], [24, -4], [44, -16], [-50, -18], [10, 30], [-22, 26]].map(([x, y]) => fl(L.circ(x, y, 4, 6.5), "ink")),
  gl(sm([[-52, -26], [-44, -8], [-30, 6], [-40, -14], [-52, -26]]), 0.4)), { tags: ["fruit", "summer", "melon"] });

reg("Food", "pineapple", "Pineapple", () => { const body = sm([[-46, 0], [-34, -44], [0, -54], [34, -44], [46, 0], [34, 56], [0, 74], [-34, 56], [-46, 0]]); return A(
  sh(sm([[-14, -50], [-34, -84], [-18, -72], [-8, -100], [0, -74], [12, -102], [18, -72], [34, -86], [14, -50]]) + "Z", "green"),
  solid(body, "gold", A(...[-26, 0, 26].map((x) => st(`M${x} -44 L${x + 40} 72 M${x} -44 L${x - 40} 72`, { c: "orange", w: 3, op: 0.8 })),
    ...[-16, 14, 42].map((y) => st(`M-50 ${y} L50 ${y}`, { c: "orange", w: 2.5, op: 0.4 })))),
  gl(sm([[-36, -20], [-30, -38], [-16, -44], [-26, -24], [-36, -20]]), 0.55)); }, { tags: ["fruit", "tropical"] });

reg("Food", "tomato", "Tomato", () => A(
  sh(sm([[0, -44], [34, -56], [64, -28], [60, 24], [30, 54], [0, 50], [-30, 54], [-60, 24], [-64, -28], [-34, -56], [0, -44]]), "red"),
  sh(sm([[0, -44], [16, -58], [34, -54], [20, -40], [34, -30], [14, -34], [0, -22], [-14, -34], [-34, -30], [-20, -40], [-34, -54], [-16, -58], [0, -44]]), "green", D),
  gl(sm([[-50, -14], [-44, -36], [-28, -44], [-36, -24], [-50, -14]]), 0.55)), { tags: ["vegetable", "red"] });

reg("Food", "corn", "Corn cob", () => g(A(
  sh(sm([[0, -78], [24, -70], [32, -20], [28, 40], [0, 54], [-28, 40], [-32, -20], [-24, -70], [0, -78]]), "yellow"),
  ...[-16, 0, 16].map((x) => st(`M${x} -72 V46`, { c: "gold", w: 2.5, op: 0.8 })),
  ...[-50, -28, -6, 16, 36].map((y) => st(`M-30 ${y} H30`, { c: "gold", w: 2.5, op: 0.8 })),
  sh(sm([[0, 70], [-46, 34], [-34, -14], [-12, 24], [0, 70]]), "green", { tone: 0 }), sh(sm([[0, 70], [46, 34], [34, -14], [12, 24], [0, 70]]), "green", { tone: 2 }),
  sh(sm([[0, 74], [-14, 40], [0, 8], [14, 40], [0, 74]]), "green", { tone: 1, w: "detail" }),
  gl(rr(-24, -64, 6, 70, 3), 0.5)), "rotate(24)"), { tags: ["vegetable", "maize", "sweetcorn"] });

reg("Food", "pancakes", "Pancakes", () => A(
  sh(sm([[-70, 28], [-70, 40], [-40, 54], [40, 54], [70, 40], [70, 28]]) + "Z", "earth", { tone: 2 }),
  sh(L.circ(0, 28, 72, 18), "earth"), sh(sm([[-70, 8], [-70, 20], [-40, 34], [40, 34], [70, 20], [70, 8]]) + "Z", "earth", { tone: 2 }),
  sh(L.circ(0, 8, 72, 18), "gold"), sh(sm([[-70, -12], [-70, 0], [-40, 14], [40, 14], [70, 0], [70, -12]]) + "Z", "earth", { tone: 2 }),
  sh(L.circ(0, -12, 72, 18), "gold"),
  sh(sm([[-30, -26], [-6, -32], [18, -24], [14, -10], [-14, -6], [-34, -12], [-30, -26]]), "earth", { tone: 2, w: "detail" }),
  sh(rr(-4, -52, 30, 24, 5), "yellow", D),
  gl(sm([[-52, -20], [-34, -26], [-48, -14], [-52, -20]]), 0.6)), { tags: ["breakfast", "syrup", "butter", "stack", "food"] });

reg("Food", "lemon", "Lemon", () => g(A(
  sh(sm([[-80, 0], [-62, -12], [-52, -34], [0, -42], [52, -34], [62, -12], [80, 0], [62, 12], [52, 34], [0, 42], [-52, 34], [-62, 12], [-80, 0]]), "yellow"),
  sh(sm([[12, -40], [30, -70], [62, -60], [42, -40], [12, -40]]), "green", D),
  gl(sm([[-48, -14], [-36, -28], [-16, -30], [-34, -18], [-48, -14]]), 0.6)), "rotate(-14)"), { tags: ["fruit", "citrus", "sour", "yellow"] });

reg("Food", "cherries", "Cherries", () => A(
  tube("M-34 12 Q-24 -50 12 -84 M34 20 Q30 -40 12 -84", "green", 6), sh(sm([[12, -84], [40, -100], [66, -80], [38, -70], [12, -84]]), "green", D),
  dot(-34, 40, 30, "red"), dot(36, 48, 28, "red"), gl(ci(-44, 30, 7), 0.6), gl(ci(26, 38, 7), 0.6)), { tags: ["fruit", "berry", "red"] });

reg("Food", "pear", "Pear", () => A(
  tube("M0 -58 Q2 -76 14 -86", "brown", 7), sh(sm([[6, -74], [30, -94], [58, -80], [30, -68], [6, -74]]), "green", D),
  sh(sm([[0, -60], [22, -54], [30, -22], [60, 14], [56, 54], [24, 78], [-24, 78], [-56, 54], [-60, 14], [-30, -22], [-22, -54], [0, -60]]), "green", { tone: 1 }),
  fl(sm([[-20, -20], [-10, -36], [10, -36], [20, -20]]) + "Z", "yellow", 0.4),
  gl(sm([[-44, 20], [-38, 2], [-24, -4], [-34, 18], [-42, 42], [-44, 20]]), 0.5)), { tags: ["fruit", "green"] });

reg("Food", "potato", "Potato", () => g(A(
  sh(sm([[-70, 6], [-56, -30], [-16, -44], [32, -38], [66, -10], [70, 24], [40, 46], [-8, 50], [-52, 38], [-70, 6]]), "earth"),
  ...[[-34, -6], [8, -16], [30, 18], [-14, 22], [46, -2]].map(([x, y]) => fl(L.circ(x, y, 4, 2.6), "brown", 0.8)),
  gl(sm([[-52, -6], [-42, -26], [-22, -34], [-36, -14], [-52, -6]]), 0.45)), "rotate(-8)"), { tags: ["vegetable", "spud", "food"] });

reg("Food", "taco", "Taco", () => A(
  sh(sm([[-70, -6], [-62, -30], [-40, -46], [-20, -34], [0, -50], [20, -34], [40, -48], [62, -30], [70, -6]]) + "Z", "green"),
  sh(ci(-30, -22, 12), "red", D), sh(ci(12, -26, 11), "red", D), sh(po([[34, -20], [56, -28], [58, -8], [42, -6]], true), "yellow", D),
  sh("M-88 -8 H88 A88 82 0 0 1 -88 -8 Z", "gold"),
  fl(ci(-30, 30, 3), "earth"), fl(ci(10, 44, 3), "earth"), fl(ci(40, 22, 3), "earth"), fl(ci(-8, 14, 3), "earth"),
  gl(sm([[-72, 6], [-56, 34], [-34, 52], [-54, 26], [-72, 6]]), 0.5)), { tags: ["mexican", "fast food", "snack"] });

reg("Food", "lollipop", "Lollipop", (o) => { const c = col(o, "pink"); return A(
  tube("M26 28 L62 90", "white", 9),
  sh(ci(0, -20, 54), c), st(L.smooth(Array.from({ length: 30 }, (_, i) => { const a = i * 0.5, r = 3 + i * 1.6; return [r * Math.cos(a), -20 + r * Math.sin(a)]; })), { c: "white", w: 7 }),
  gl(sm([[-38, -42], [-28, -56], [-12, -62], [-28, -46], [-38, -42]]), 0.6)); }, { demo: { color: "pink" }, tags: ["candy", "sweet", "swirl", "sugar"] });

reg("Food", "croissant", "Croissant", () => g(A(
  sh(sm([[-88, 22], [-72, -10], [-40, -34], [0, -42], [40, -34], [72, -10], [88, 22], [66, 30], [46, 6], [20, 22], [0, 28], [-20, 22], [-46, 6], [-66, 30], [-88, 22]]), "gold", { tone: 2 }),
  sh(sm([[-30, -30], [0, -40], [30, -30], [24, 18], [0, 28], [-24, 18], [-30, -30]]), "gold"),
  st("M-24 -26 Q-30 -4 -20 18 M24 -26 Q30 -4 20 18 M-58 -6 Q-48 8 -52 20 M58 -6 Q48 8 52 20", { c: "earth", w: "detail" }),
  gl(sm([[-14, -32], [-4, -36], [-8, -20], [-14, -32]]), 0.55)), "translate(0 10)"), { tags: ["bakery", "bread", "pastry", "breakfast", "french"] });

// ============================ KITCHEN ============================
reg("Kitchen", "cutting-board", "Cutting board", () => A(
  sh(rr(-78, -52, 156, 104, 16), "wood", { tone: 1 }), dot(56, -30, 9, "wood", { tone: 2, w: "detail" }),
  ...[[-38, -6, 25], [6, 20, 22]].map(([x, y, r]) => A(sh(ci(x, y, r), "green", D), sh(ci(x, y, r - 7), "cream", { w: "hair", flat: true }), fl(ci(x - 4, y - 3, 2), "green"), fl(ci(x + 4, y + 3, 2), "green"))),
  sh(ci(30, -10, 22), "red", D), sh(ci(30, -10, 14), "orange", { w: "hair", flat: true, tone: 1 }),
  gl(rr(-70, -44, 60, 6, 3), 0.4)), { tags: ["kitchen", "chopping", "board", "cooking"] });

reg("Kitchen", "kitchen-scale", "Kitchen scale", () => A(
  sh(rr(-70, 16, 140, 56, 16), "teal"),
  sh(rr(-12, -8, 24, 28, 4), "gray", D),
  sh(sm([[-62, -22], [-50, 2], [0, 10], [50, 2], [62, -22], [-62, -22]]), "gray"),
  sh(L.circ(0, -22, 62, 10), "gray", { tone: 1 }),
  sh(ci(0, 44, 18), "white", D), st("M0 44 L9 34", { c: "red", w: 3 }), dot(0, 44, 3, "ink", D),
  gl(rr(-58, 24, 40, 6, 3), 0.5)), { tags: ["weigh", "baking", "kitchen", "grams"] });

reg("Kitchen", "measuring-cup", "Measuring cup", (o) => { const full = pick(o, "full", true); return A(
  ring(48, -2, 32, 16, "glass"),
  sh(po([[-48, -64], [44, -64], [36, 66], [-40, 66]], true), "glass"),
  full ? sh(po([[-45, -14], [43, -14], [36, 62], [-39, 62]], true), "cream", D) : "",
  ...[-44, -24, -4, 16, 38].map((y, i) => st(`M-46 ${y} h${i % 2 ? 14 : 24}`, { c: "ink", w: 3, op: 0.55 })),
  st("M44 -64 L56 -70", { c: "ink", w: "detail", op: 0 }),
  gl(rr(10, -54, 6, 110, 3), 0.55)); }, { demo: { full: true }, tags: ["kitchen", "baking", "cup", "liquid", "jug", "empty"] });

reg("Kitchen", "fridge-open", "Fridge, open with food", () => A(
  L.shadow(20, 0, 200),
  sh(rr(-72, -200, 144, 200, 12), "gray", { tone: 0 }),
  sh(rr(-62, -190, 124, 180, 6), "cream", { tone: 1, flat: true }),
  ...[-130, -70, -14].map((y) => sh(rr(-62, y, 124, 7, 2), "glass", { w: "detail" })),
  // top shelf: milk + eggs; mid: cheese + apple + bottle; low: crate with veg
  sh(po([[-50, -178], [-30, -178], [-30, -134], [-50, -134]], true), "white", D), sh(po([[-50, -178], [-40, -190], [-30, -178]], true), "blue", D),
  sh(ci(-6, -146, 14, 17), "cream", { w: "detail", tone: 2 }), sh(ci(20, -146, 14, 17), "cream", { w: "detail", tone: 2 }), sh(ci(44, -146, 14, 17), "cream", { w: "detail", tone: 2 }),
  sh(po([[-52, -74], [-14, -74], [-14, -96], [-52, -80]], true), "yellow", D),
  dot(4, -88, 14, "red", D), sh(rr(24, -112, 20, 42, 6), "green", D), sh(rr(28, -118, 12, 8, 3), "gray", D),
  dot(-30, -34, 18, "orange", D), dot(8, -30, 14, "green", D), dot(40, -36, 18, "red", D),
  sh(po([[72, -200], [132, -178], [132, -22], [72, 0]], true), "white"),
  sh(po([[78, -188], [124, -172], [124, -140], [78, -150]], true), "glass", D), sh(po([[78, -120], [124, -106], [124, -76], [78, -88]], true), "glass", D),
  sh(rr(118, -150, 6, 50, 3), "gray", D),
), { stand: true, box: [-100, -215, 260, 235], tags: ["refrigerator", "kitchen", "food", "open", "cold"] });

reg("Kitchen", "stove-flame", "Stove with flame", () => A(
  L.shadow(0, 0, 190),
  sh(rr(-84, -112, 168, 112, 8), "gray", { tone: 1 }),
  sh(rr(-90, -128, 180, 20, 6), "gray", { tone: 2 }),
  sh(rr(-62, -88, 124, 70, 8), "navy", { tone: 1 }),
  gl(po([[-52, -80], [-26, -80], [-46, -26], [-56, -26]], true), 0.22),
  st("M-40 -64 H40", { c: "gray", w: 5 }),
  ...[-60, -20, 20, 60].map((x) => dot(x, -102, 7, "ink", { w: "detail", tone: 1 })),
  sh(L.circ(48, -128, 28, 7), "ink", { tone: 1, w: "detail" }),
  sh(sm([[26, -130], [34, -160], [44, -146], [52, -178], [62, -150], [72, -134], [66, -126], [30, -126]]) + "Z", "orange", D),
  sh(sm([[38, -130], [46, -152], [52, -142], [58, -130]]) + "Z", "yellow", D),

  sh(rr(-78, -176, 70, 50, 8), "blue"), sh(rr(-84, -182, 82, 10, 5), "blue", { tone: 2 }), tube("M-84 -166 h-12", "gray", 6)), { stand: true, tags: ["cooker", "kitchen", "cooking", "fire", "gas", "hob"] });

reg("Kitchen", "whisk", "Whisk", () => g(A(
  ...[56, 36, 18].map((r) => st(L.circ(0, -34, r * 0.5, 54), { c: "gray", w: 5 })),
  st("M0 -88 V20", { c: "gray", w: 4 }),
  sh(rr(-10, 12, 20, 86, 9), "red"), sh(rr(-12, 8, 24, 14, 5), "gray", D),
  gl(rr(-5, 24, 4, 60, 2), 0.5)), "rotate(26)"), { tags: ["kitchen", "baking", "mix", "egg"] });

reg("Kitchen", "rolling-pin", "Rolling pin", () => g(A(
  sh(rr(-98, -10, 44, 20, 9), "wood", { tone: 2 }), sh(rr(54, -10, 44, 20, 9), "wood", { tone: 2 }),
  sh(rr(-62, -28, 124, 56, 16), "wood", { tone: 1 }),
  gl(rr(-52, -22, 100, 7, 3), 0.5)), "rotate(-18)"), { tags: ["kitchen", "baking", "dough", "pastry"] });

// ============================ BATHROOM & BEDROOM ============================
reg("Bathroom", "toothbrush", "Toothbrush", (o) => { const c = col(o, "teal"); return g(A(
  ...Array.from({ length: 6 }, (_, i) => st(`M${40 + i * 8} -12 v-18`, { c: "white", w: 5 })),
  ...Array.from({ length: 6 }, (_, i) => st(`M${40 + i * 8} -12 v-18`, { c: "blue", w: 3 })),
  sh(sm([[-94, -2], [-90, -12], [-60, -12], [10, -8], [34, -12], [86, -12], [90, 10], [34, 10], [10, 10], [-60, 14], [-90, 14], [-94, -2]]), c),
  sh(rr(30, -14, 58, 26, 8), "white"),
  gl(rr(-84, -8, 80, 5, 2), 0.55)), "rotate(-32)"); }, { demo: { color: "teal" }, tags: ["teeth", "dental", "clean", "brush", "hygiene"] });

reg("Bathroom", "toothpaste", "Toothpaste", () => g(A(
  sh(po([[-94, -26], [46, -34], [46, 34], [-94, 26]], true), "white"),
  fl(po([[-30, -32], [-4, -33], [-4, 33], [-30, 33]], true), "blue", 0.9),
  ...[-92, -84, -76, -68].map((x) => st(`M${x} ${-26 + (x + 94) * 0.05} V${26 - (x + 94) * 0.05}`, { c: "ink", w: 2.5, op: 0.5 })),
  sh(rr(46, -22, 36, 44, 7), "red"),
  gl(rr(-86, -22, 120, 6, 3), 0.5)), "rotate(-14)"), { tags: ["teeth", "dental", "paste", "tube", "hygiene"] });

reg("Bathroom", "soap-bar", "Soap bar", (o) => { const c = col(o, "pink"); return A(
  sh(rr(-72, -34, 144, 70, 26), c), fl(rr(-50, -18, 100, 38, 16), "white", 0.28),
  sh(ci(54, -56, 16), "glass", D), sh(ci(80, -36, 10), "glass", D), sh(ci(38, -80, 9), "glass", D),
  gl(ci(50, -61, 4), 0.9), gl(rr(-62, -28, 60, 6, 3), 0.55)); }, { demo: { color: "pink" }, tags: ["wash", "clean", "bubbles", "hygiene", "bath"] });

reg("Bathroom", "towel", "Towel stack", (o) => { const c = col(o, "blue"); return A(
  sh(rr(-74, 8, 148, 44, 12), c, { tone: 2 }), fl(rr(-74, 24, 148, 8, 0), "white", 0.5),
  sh(rr(-70, -30, 140, 44, 12), c), fl(rr(-70, -14, 140, 8, 0), "white", 0.55),
  sh(rr(-66, -62, 132, 40, 12), "white") , fl(rr(-66, -46, 132, 7, 0), c, 0.7),
  ...[-60, -50, -40].map((x) => st(`M${x} 10 v8`, { c: "ink", w: 2, op: 0.3 })),
  gl(rr(-58, -56, 50, 6, 3), 0.7)); }, { demo: { color: "blue" }, tags: ["bath", "dry", "cloth", "fold", "hygiene"] });

reg("Bathroom", "hand-mirror", "Hand mirror", () => g(A(
  tube("M0 34 L0 94", "pink", 16),
  sh(ci(0, -22, 58), "gold"), sh(ci(0, -22, 46), "glass", D),
  st("M-24 -36 L-8 -52 M-30 -20 L-4 -46", { c: "white", w: 5, op: 0.9 }),
  gl(rr(-4, 48, 4, 38, 2), 0.5)), "rotate(16)"), { tags: ["glass", "reflection", "beauty", "vanity"] });

reg("Bathroom", "rubber-duck", "Rubber duck", () => A(
  sh(sm([[-80, -26], [-58, -6], [-30, -14], [0, -14], [30, -10], [58, 6], [58, 34], [24, 58], [-30, 58], [-64, 38], [-74, 10], [-80, -26]]), "yellow"),
  sh(sm([[-38, 8], [-8, 0], [18, 12], [-4, 38], [-36, 34], [-38, 8]]), "yellow", { tone: 2, w: "detail" }),
  dot(28, -34, 32, "yellow"),
  sh(sm([[56, -36], [88, -32], [86, -18], [56, -18]]) + "Z", "orange", D),
  fl(ci(36, -44, 5), "ink"), gl(ci(38, -46, 1.8), 0.9), gl(sm([[8, -52], [18, -62], [28, -60], [14, -48]]), 0.6)), { tags: ["bath", "toy", "bathtub", "yellow", "baby"] });

reg("Bathroom", "toilet-paper", "Toilet roll", () => A(
  sh(po([[-34, 40], [34, 40], [34, 98], [24, 92], [12, 100], [0, 92], [-12, 100], [-24, 92], [-34, 98]], true), "white"),
  sh(ci(0, 0, 58), "white"), sh(ci(0, 0, 22), "brown", D), dot(0, 0, 12, "paper", { w: "detail", tone: 2 }),
  st(L.smooth(Array.from({ length: 20 }, (_, i) => { const a = i * 0.45 + 1, r = 28 + i * 1.5; return [r * Math.cos(a), r * Math.sin(a)]; })), { c: "gray", w: 2.5, op: 0.5 }),
  gl(sm([[-46, -22], [-34, -42], [-18, -50], [-32, -32], [-46, -22]]), 0.7)), { tags: ["bathroom", "tissue", "paper", "toilet", "roll"] });

reg("Bathroom", "shower-head", "Shower", () => A(
  tube("M-92 -86 H-56 Q-30 -86 -22 -62", "gray", 12),
  g(A(sh(sm([[-14, 0], [-6, -22], [34, -22], [44, 0], [-14, 0]]), "gray"), sh(ci(15, 2, 46, 12), "gray", { tone: 1 }),
    ...[-24, -8, 8, 24, 40].map((x) => dot(x - 2, 3, 2.6, "ink", { w: "hair", tone: 1 }))), "translate(-30 -60) rotate(14 15 0)"),
  ...[-60, -30, 0, 30, 60].map((x) => st(`M${x} -34 L${x * 1.6 + 6} 96`, { c: "water", w: 5, dash: "9 14", op: 0.85 })),
  gl(sm([[-40, -64], [-30, -76], [-6, -74], [-28, -64]]), 0.5)), { tags: ["bathroom", "water", "wash", "spray"] });

reg("Bedroom", "pillow", "Pillow", (o) => { const c = col(o, "sky"); return A(
  sh(sm([[-82, -8], [-74, -42], [-34, -50], [0, -44], [34, -50], [74, -42], [84, -8], [74, 40], [34, 52], [0, 46], [-34, 52], [-74, 40], [-82, -8]]), c),
  st("M-70 -34 Q-52 -8 -68 36 M70 -34 Q52 -8 68 36", { c: "ink", w: "detail", op: 0.25 }),
  st("M-30 -30 Q0 -22 30 -30", { c: "ink", w: 3, op: 0.18 }),
  gl(sm([[-64, -30], [-40, -40], [-52, -22], [-64, -30]]), 0.6)); }, { demo: { color: "sky" }, tags: ["bed", "sleep", "cushion", "soft"] });

reg("Bedroom", "blanket", "Folded blanket", (o) => { const c = col(o, "purple"); return A(
  sh(rr(-80, -8, 160, 56, 14), c, { tone: 2 }), fl(rr(-80, 20, 160, 10, 0), "yellow", 0.55),
  sh(rr(-74, -50, 148, 48, 14), c), fl(rr(-74, -30, 148, 9, 0), "yellow", 0.6),
  ...[-50, -20, 10, 40, 64].map((x) => st(`M${x} -50 v48`, { c: "white", w: 2.5, op: 0.3 })),
  ...Array.from({ length: 7 }, (_, i) => st(`M${-70 + i * 11} 48 v12`, { c: c, w: 4 })),
  gl(rr(-66, -44, 54, 6, 3), 0.6)); }, { demo: { color: "purple" }, tags: ["bed", "sleep", "cover", "throw", "warm"] });

reg("Bedroom", "slippers", "Slippers", (o) => { const c = col(o, "pink"), one = (x, r) => g(A(
  sh(sm([[-30, -52], [30, -52], [36, 8], [30, 54], [0, 62], [-30, 54], [-36, 8], [-30, -52]]), c, { tone: 2 }),
  sh(sm([[-26, -52], [26, -52], [30, -14], [0, -2], [-30, -14], [-26, -52]]), c),
 fl(sm([[-20, 14], [20, 14], [16, 52], [-16, 52]]), "ink", 0.3), st(L.circ(0, 30, 15, 24), { c: "cream", w: 6 }),
  gl(sm([[-20, -44], [-10, -48], [-14, -30], [-20, -44]]), 0.6)), `translate(${x} 0) rotate(${r})`); return A(one(-44, -6), one(44, 6)); }, { demo: { color: "pink" }, tags: ["shoes", "home", "bedroom", "cosy", "pair"] });

// ============================ SCHOOL & OFFICE ============================
reg("Office", "pencil-case", "Pencil case", (o) => { const c = col(o, "red"); return A(
  ...[["yellow", -36, -26], ["blue", -4, -14], ["green", 30, -24]].map(([pc, x, r]) => g(A(sh(rr(-7, -88, 14, 78, 3), pc), sh(po([[-7, -88], [7, -88], [0, -106]], true), "earth", D), fl(po([[-3, -98], [3, -98], [0, -106]], true), "ink")), `translate(${x} 0) rotate(${r} 0 -10)`)),
  sh(rr(-84, -22, 168, 76, 28), c),
  st("M-62 -4 H62", { c: "ink", w: 3, dash: "8 6", op: 0.7 }), sh(rr(-10, -12, 20, 18, 6), "gold", D),
  gl(rr(-68, -14, 70, 6, 3), 0.5)); }, { demo: { color: "red" }, tags: ["school", "pencils", "stationery", "zip"] });

reg("Office", "abacus", "Abacus", () => A(
  ...[-34, -11, 12, 35].map((y, r) => st(`M-72 ${y} H72`, { c: "gray", w: 4 })),
  eo(sh(rr(-86, -62, 172, 124, 10) + rr(-72, -48, 144, 96, 3), "wood")),
  ...[-34, -11, 12, 35].map((y, r) => st(`M-72 ${y} H72`, { c: "gray", w: 4 })),
  ...[-34, -11, 12, 35].map((y, r) => A(...Array.from({ length: 4 + (r % 2) }, (_, i) => sh(L.circ(-60 + i * 17, y, 8, 10), r % 2 ? "red" : "blue", { w: "detail", flat: true })), ...Array.from({ length: 3 }, (_, i) => sh(L.circ(36 + i * 17, y, 8, 10), r % 2 ? "red" : "blue", { w: "detail", flat: true })))),
  gl(rr(-80, -58, 100, 5, 2), 0.4)), { tags: ["counting", "maths", "math", "school", "beads"] });

reg("Office", "calculator", "Calculator", () => A(
  sh(rr(-52, -84, 104, 168, 16), "navy"),
  sh(rr(-40, -72, 80, 34, 6), "teal", { tone: 1 }), L.text("128", 34, -46, { size: 26, c: "ink", font: "Fredoka", anchor: "end" }),
  ...[0, 1, 2, 3].flatMap((r) => [0, 1, 2].map((c) => sh(rr(-40 + c * 28, -26 + r * 28, 24, 22, 6), r === 0 && c === 2 ? "orange" : "white", { w: "detail", flat: true }))),

  gl(rr(-46, -78, 6, 150, 3), 0.18)), { tags: ["maths", "math", "numbers", "tax", "office", "school"] });

reg("Office", "stapler", "Stapler", (o) => { const c = col(o, "red"); return A(
  sh(rr(-84, 16, 168, 22, 8), "gray", { tone: 2 }),
  sh(sm([[-82, 12], [-86, -18], [-60, -30], [60, -22], [90, -6], [90, 14]]) + "Z", c),
  sh(rr(-92, 6, 26, 20, 7), "gray", D),
  st("M70 22 h22", { c: "ink", w: 3, op: 0.4 }),
  gl(sm([[-72, -12], [-56, -22], [20, -16], [-60, -8]]), 0.55)); }, { demo: { color: "red" }, tags: ["office", "paper", "staples", "stationery"] });

reg("Office", "printer", "Printer", () => A(
  sh(rr(-46, -76, 92, 54, 4), "white"), st("M-34 -62 H34 M-34 -48 H20 M-34 -36 H30", { c: "gray", w: 3, op: 0.6 }),
  sh(rr(-88, -26, 176, 74, 16), "gray", { tone: 1 }),
  sh(rr(-70, 14, 140, 14, 5), "ink", { tone: 1, w: "detail" }) ,
  sh(rr(-46, 28, 92, 52, 3), "white"), st("M-34 44 H34 M-34 58 H24", { c: "gray", w: 3, op: 0.6 }),
  dot(62, -10, 5, "green", D), dot(46, -10, 5, "gray", D),
  gl(rr(-80, -20, 80, 6, 3), 0.5)), { tags: ["office", "print", "paper", "scanner", "tech"] });

reg("Office", "desk-lamp", "Desk lamp", (o) => { const c = col(o, "blue"); return g(A(
  o.on === false ? "" : fl(po([[34, -26], [46, -20], [104, 70], [-6, 70]], true), "yellow", 0.22),
  sh(L.circ(0, 80, 46, 10), c, { tone: 2 }), sh(rr(-46, 74, 92, 14, 6), c),
  tube("M0 76 L-30 6 L28 -58", "gray", 9), dot(-30, 6, 8, "gray", D), dot(0, 76, 7, "gray", D),
  g(A(sh(sm([[-36, -14], [-14, -52], [46, -62], [60, -32], [30, 6], [-36, -14]]), c)), "translate(24 -46) rotate(-20)"),
  fl(ci(34, -26, 11), "yellow", 0.9), gl(sm([[-12, -62], [12, -78], [30, -74], [6, -60]]), 0.5)), "translate(6 16) scale(0.88)"); }, { demo: { color: "blue" }, tags: ["light", "desk", "study", "reading", "office"] });

reg("Office", "filing-cabinet", "Filing cabinet", () => A(
  L.shadow(0, 0, 130),
  sh(rr(-54, -172, 108, 172, 8), "gray"),
  ...[0, 1, 2].map((i) => A(sh(rr(-46, -164 + i * 54, 92, 48, 5), "gray", { tone: 1 }), sh(rr(-16, -146 + i * 54, 32, 8, 4), "ink", { tone: 1, w: "detail" }),)),
  gl(rr(-48, -166, 5, 160, 2), 0.35)), { stand: true, tags: ["office", "storage", "drawers", "documents", "cabinet"] });

reg("Office", "clipboard", "Clipboard", () => A(
  sh(rr(-58, -90, 116, 176, 12), "wood"),
  sh(rr(-46, -68, 92, 140, 4), "white"),
  ...[-44, -20, 4, 28, 52].map((y, i) => A(st(`M-18 ${y} H34`, { c: "gray", w: 4, op: 0.7 }), st(`M-36 ${y + 1} l5 6 l9 -12`, { c: i < 3 ? "green" : "gray", w: 4, op: i < 3 ? 1 : 0 }))),
  sh(rr(-24, -100, 48, 26, 7), "gray"), sh(rr(-12, -106, 24, 12, 5), "gray", { tone: 2, w: "detail" }),
  gl(rr(-52, -82, 5, 160, 2), 0.3)), { tags: ["checklist", "office", "form", "survey", "notes"] });

reg("Office", "sticky-notes", "Sticky notes", () => A(
  g(A(sh(rr(-44, -44, 88, 88, 3), "blue"), st("M-26 -18 H24 M-26 0 H10", { c: "ink", w: 3, op: 0.5 })), "translate(40 -28) rotate(12)"),
  g(A(sh(rr(-44, -44, 88, 88, 3), "pink"), st("M-26 -18 H24 M-26 0 H10", { c: "ink", w: 3, op: 0.5 })), "translate(-38 26) rotate(-9)"),
  g(A(sh(rr(-44, -44, 88, 88, 3), "yellow"), st("M-26 -18 H24 M-26 0 H10 M-26 18 H18", { c: "ink", w: 3, op: 0.5 }), fl(po([[44, 44], [44, 20], [20, 44]], true), "ink", 0.12)), "translate(0 0) rotate(3)"),
  gl(rr(-38, -38, 40, 5, 2), 0.6)), { tags: ["post-it", "notes", "reminder", "office", "memo"] });

reg("Office", "tear-calendar", "Day calendar", (o) => A(
  sh(rr(-62, -70, 124, 140, 12), "white"), sh(rr(-62, -70, 124, 38, 12), "red"), fl(rr(-62, -48, 124, 16, 0), "red", 1),
  ...[-34, 0, 34].map((x) => A(sh(rr(x - 5, -86, 10, 28, 5), "gray", D))),
  L.text(String(pick(o, "day", 15)), 0, 36, { size: 78, c: "ink" }),
  st("M-62 -32 H62", { c: "ink", w: "detail", op: 0.3 }),
  gl(rr(-54, -26, 6, 90, 3), 0.5)), { demo: { day: 15 }, tags: ["calendar", "date", "day", "schedule", "deadline", "month"] });

reg("Office", "ruler", "Ruler", () => g(A(
  sh(rr(-96, -20, 192, 40, 5), "yellow"),
  ...Array.from({ length: 17 }, (_, i) => st(`M${-86 + i * 10.5} -20 v${i % 4 === 0 ? 18 : i % 2 ? 8 : 12}`, { c: "ink", w: 2.5, op: 0.8 })),
  gl(rr(-90, 6, 120, 5, 2), 0.5)), "rotate(-20)"), { tags: ["measure", "school", "length", "geometry", "stationery"] });

reg("Office", "folder", "Folder", (o) => { const c = col(o, "yellow"); return A(
  sh(rr(-62, -60, 120, 112, 6), "white"), st("M-46 -40 H36 M-46 -22 H20", { c: "gray", w: 3, op: 0.6 }),
  sh(sm([[-80, -64], [-80, -76], [-46, -78], [-34, -64]]) + "Z", c, { tone: 2 }),

  sh(rr(-82, -52, 164, 108, 8), c),
  gl(rr(-74, -44, 70, 6, 3), 0.55)); }, { demo: { color: "yellow" }, tags: ["file", "documents", "office", "paperwork", "manila"] });

reg("Office", "paperclip", "Paper clip", () => g(A(
  tube("M-24 40 V-44 Q-24 -74 2 -74 Q28 -74 28 -44 V50 Q28 80 2 80 Q-42 80 -42 50 V-30", "gray", 8),
  st("M-10 -50 V40", { c: "white", w: 3, op: 0.5 })), "rotate(18)"), { tags: ["office", "paper", "attach", "stationery"] });

reg("Office", "paper-bin", "Paper bin", () => A(
  dot(-22, -50, 22, "white", D), dot(18, -58, 20, "paper", D), st("M-30 -56 l12 -6 M10 -64 l14 4", { c: "gray", w: 2.5, op: 0.5 }),
  sh(po([[-56, -40], [56, -40], [44, 80], [-44, 80]], true), "gray", { tone: 1 }),
  ...[-26, -6, 14, 34].map((x) => st(`M${x * 1.15} -36 L${x} 78`, { c: "ink", w: 2.5, op: 0.3 })),
  ...[-6, 20, 46].map((y) => st(`M-50 ${y} H50`, { c: "ink", w: 2.5, op: 0.25 })),
  sh(rr(-62, -48, 124, 14, 6), "gray", { tone: 2 }),
  gl(po([[-48, -28], [-40, -28], [-34, 60], [-40, 60]], true), 0.4)), { tags: ["trash", "waste", "bin", "rubbish", "office", "paper"] });

// ============================ TECH ============================
reg("Tech", "drone", "Drone", () => A(
  ...[[-76, -34], [76, -34]].map(([x, y]) => A(tube(`M${x * 0.4} -6 L${x} ${y + 12}`, "gray", 8))),
  ...[[-52, -52, 0.7], [52, -52, 0.7]].map(([x, y]) => A(tube(`M${x * 0.5} -12 L${x} ${y + 10}`, "gray", 6), fl(L.circ(x, y, 34 * 0.7, 5), "gray", 0.35), dot(x, y + 8, 4, "ink", D))),
  sh(rr(-34, -20, 68, 38, 16), "navy"), fl(rr(-24, -14, 48, 8, 4), "white", 0.25),
  ...[[-76, -34], [76, -34]].map(([x, y]) => A(dot(x, y + 14, 6, "ink", D), fl(L.circ(x, y, 40, 7), "gray", 0.4), st(`M${x - 40} ${y} h80`, { c: "gray", w: 3, op: 0.8 }))),
  sh(ci(0, 26, 12), "gray", D), dot(0, 26, 4, "ink", D), dot(18, -6, 4, "red", D),
  tube("M-24 20 L-34 50 H-14 M24 20 L34 50 H14", "gray", 6)), { tags: ["quadcopter", "flying", "camera", "aerial", "tech"] });

reg("Tech", "router", "Wi-Fi router", () => A(
  tube("M-52 -2 L-70 -62", "gray", 9), tube("M52 -2 L70 -62", "gray", 9), tube("M0 -2 L0 -76", "gray", 9),
  sh(rr(-84, -4, 168, 46, 14), "navy"),
  ...[-52, -34, -16, 2].map((x, i) => dot(x, 20, 5, i < 3 ? "green" : "yellow", D)),
  sh(rr(30, 14, 40, 12, 5), "gray", D),
  st(sm(L.arcPts(0, -30, 30, -140, -40, 8)), { c: "blue", w: 5, op: 0 }),
  gl(rr(-76, 2, 80, 5, 2), 0.4)), { tags: ["internet", "wifi", "network", "modem", "tech"] });

reg("Tech", "charger", "Phone charger", () => A(
  tube("M0 34 C0 80 70 70 70 40 V0", "white", 9),
  sh(rr(60, -34, 20, 28, 4), "gray", D),
  sh(rr(-36, -54, 72, 92, 14), "white"),
  sh(rr(-20, -86, 10, 34, 3), "gray", D), sh(rr(10, -86, 10, 34, 3), "gray", D),
 dot(0, -10, 10, "green", { w: "detail" }),
  gl(rr(-28, -46, 6, 76, 3), 0.6)), { tags: ["phone", "power", "plug", "usb", "cable", "tech"] });

reg("Tech", "usb-stick", "USB stick", (o) => { const c = col(o, "red"); return g(A(
  sh(rr(-18, -92, 36, 42, 3), "gray", { tone: 1 }), sh(rr(-10, -84, 6, 10, 1), "ink", { tone: 1, w: "hair" }), sh(rr(4, -84, 6, 10, 1), "ink", { tone: 1, w: "hair" }),
  sh(rr(-26, -54, 52, 112, 18), c), ring(0, 38, 11, 5, "gray", { tone: 1, w: "detail" }),
  gl(rr(-20, -46, 6, 80, 3), 0.55)), "rotate(22)"); }, { demo: { color: "red" }, tags: ["storage", "flash drive", "memory", "data", "tech"] });

reg("Tech", "vr-headset", "VR headset", () => A(
  tube("M-80 -2 Q-100 -40 -60 -60 Q0 -84 60 -60 Q100 -40 80 -2", "gray", 12),
  tube("M-80 8 Q-96 40 -70 52", "gray", 12), tube("M80 8 Q96 40 70 52", "gray", 12),
  sh(rr(-84, -36, 168, 76, 30), "navy"),
  sh(rr(-72, -26, 144, 56, 22), "navy", { tone: 1 }),
  fl(rr(-62, -16, 124, 8, 4), "white", 0.18), dot(-34, 8, 6, "teal", D), dot(34, 8, 6, "teal", D), dot(0, -2, 4, "gray", D),
  st("M-8 42 Q0 52 8 42", { c: "ink", w: "detail", op: 0.6 }),
  gl(rr(-70, -30, 60, 6, 3), 0.45)), { tags: ["virtual reality", "vr", "goggles", "gaming", "metaverse", "tech"] });

reg("Tech", "robot", "Robot", (o) => { const c = col(o, "blue"); return A(L.shadow(0, 0, 130), g(A(
  tube("M-44 -44 Q-78 -20 -64 14", "gray", 12), tube("M44 -44 Q78 -20 64 14", "gray", 12),
  dot(-64, 18, 11, "gray", D), dot(64, 18, 11, "gray", D),
  sh(rr(-30, -6, 20, 44, 6), "gray", { tone: 1 }), sh(rr(10, -6, 20, 44, 6), "gray", { tone: 1 }),
  sh(rr(-40, 34, 36, 14, 6), "ink", { tone: 1, w: "detail" }), sh(rr(4, 34, 36, 14, 6), "ink", { tone: 1, w: "detail" }),
  sh(rr(-46, -74, 92, 78, 16), c),
  sh(rr(-22, -62, 44, 28, 6), "cream", D), dot(-10, -48, 4, "ink", D),
  dot(-34, -1, 5, "green", D), dot(-18, -1, 5, "yellow", D), sh(rr(0, -8, 32, 14, 4), "white", D),
  tube("M0 -112 V-96", "gray", 6), dot(0, -118, 8, "red", D),
  sh(rr(-38, -112, 76, 44, 18), "gray"),
  dot(-16, -92, 9, "teal", { w: "detail", tone: 1 }), dot(16, -92, 9, "teal", { w: "detail", tone: 1 }), fl(ci(-14, -94, 3), "white", 0.9), fl(ci(18, -94, 3), "white", 0.9),
  st("M-8 -76 Q0 -70 8 -76", { c: "ink", w: "detail" }),
  gl(rr(-34, -106, 5, 26, 2), 0.5)), "translate(0 -50)")); }, { stand: true, demo: { color: "blue" }, tags: ["android", "machine", "ai", "tech", "bot", "friendly"] });

reg("Tech", "mouse", "Computer mouse", () => A(
  tube("M0 -34 Q0 -70 -30 -86", "gray", 5),
  sh(sm([[0, -50], [34, -44], [48, -8], [42, 44], [20, 62], [-20, 62], [-42, 44], [-48, -8], [-34, -44], [0, -50]]), "gray", { tone: 1 }),
  st("M0 -50 V-6 M-46 -6 Q0 2 46 -6", { c: "ink", w: "detail" }),
  sh(rr(-6, -38, 12, 24, 6), "ink", { tone: 1, w: "detail" }),
  gl(sm([[-34, -2], [-30, 28], [-18, 50], [-24, 22], [-34, -2]]), 0.45)), { tags: ["pc", "computer", "click", "cursor", "tech"] });

reg("Tech", "keyboard", "Keyboard", () => A(
  sh(rr(-92, -34, 184, 84, 14), "gray", { tone: 1 }),
  ...[0, 1, 2].flatMap((r) => Array.from({ length: 10 - (r === 2 ? 2 : 0) }, (_, i) => sh(rr(-82 + i * 17 + (r === 2 ? 8 : r === 1 ? 4 : 0), -24 + r * 20, 14, 15, 3), "white", { w: "hair", flat: true }))),


  gl(rr(-86, -30, 80, 4, 2), 0.35)), { tags: ["typing", "computer", "keys", "pc", "tech"] });

reg("Tech", "earbuds", "Earbuds", () => A(
  ...[-34, 34].map((x, i) => A(sh(rr(x - 7, -52, 14, 52, 7), "white"), sh(ci(x, -64, 22), "white"), dot(x + (i ? 6 : -6), -64, 7, "gray", D))),
  sh(rr(-52, 8, 104, 62, 26), "white"), fl(rr(-52, 28, 104, 3, 0), "ink", 0.2), dot(0, 46, 5, "green", D),
  gl(rr(-44, 14, 60, 5, 2), 0.7)), { tags: ["audio", "music", "wireless", "headphones", "airpods", "tech"] });

reg("Tech", "power-bank", "Power bank", (o) => { const c = col(o, "orange"), lvl = Math.max(0, Math.min(4, pick(o, "level", 3))); return A(
  sh(rr(-50, -84, 100, 168, 20), c),
 sh(rr(-16, 52, 32, 12, 4), "ink", { tone: 1, w: "detail" }),
  ...[0, 1, 2, 3].map((i) => sh(rr(-34 + i * 18, -62, 14, 30, 4), i < lvl ? "green" : "white", { w: "detail", tone: i < lvl ? 0 : 2 })),
  gl(rr(-44, -76, 6, 140, 3), 0.45)); }, { demo: { color: "orange", level: 3 }, tags: ["battery", "charge", "portable", "usb", "power", "tech"] });

// ============================ TOOLS ============================
reg("Tools", "saw", "Hand saw", () => g(A(
  sh(po([[-100, -26], [18, -34], [18, 28], [-100, 28]], true).replace(/Z$/, "Z"), "gray", { tone: 1 }),
  sh(po([[-100, 28], ...Array.from({ length: 12 }, (_, i) => [-100 + i * 9.8 + 4.9, 40]).flatMap((p, i) => [p, [p[0] + 4.9, 28]]).slice(0, 23)].slice(0, 24), true), "gray", { tone: 2, w: "hair" }),
  eo(sh(rr(14, -48, 84, 86, 24) + rr(36, -28, 40, 44, 14), "orange")),
  gl(po([[-92, -20], [10, -26], [10, -16], [-92, -12]], true), 0.5)), "rotate(-10)"), { tags: ["woodwork", "carpentry", "cut", "diy", "tool"] });

reg("Tools", "drill", "Power drill", (o) => { const c = col(o, "yellow"); return A(
  tube("M80 -20 H104", "gray", 5),
  sh(rr(50, -40, 32, 40, 8), "gray"),
  sh(rr(-64, -56, 120, 54, 16), c),
  sh(po([[-34, -10], [14, -10], [26, 62], [-24, 66]], true), "ink", { tone: 1 }),
  sh(rr(-46, 58, 80, 28, 8), "gray", { tone: 2 }),
  sh(rr(8, -4, 12, 22, 5), "orange", D),
  dot(-30, -30, 7, "ink", D),
  gl(rr(-54, -48, 70, 6, 3), 0.55)); }, { demo: { color: "yellow" }, tags: ["diy", "builder", "cordless", "hole", "tool", "power tool"] });

const wrenchOne = (len, c) => A(
  sh(rr(-9, -len / 2 + 18, 18, len, 9), c),
  tube(L.arc(0, -len / 2 + 6, 17, -55, 235), c, 17));
reg("Tools", "wrench-set", "Wrench set", () => A(
  g(wrenchOne(150, "gray"), "translate(-52 10) rotate(-24)"), g(wrenchOne(170, "stone"), "translate(0 4)"), g(wrenchOne(150, "gray"), "translate(52 10) rotate(24)"),
  ...[-52, 0, 52].map((x, i) => gl(`M${x - 4} ${24 - i % 2 * 4} v60`, 0))
  , dot(0, 78, 4, "ink", { w: "hair", tone: 1 })), { tags: ["spanner", "mechanic", "garage", "repair", "tool"] });

reg("Tools", "ladder", "Ladder", (o) => { const c = col(o, "orange"); return A(
  L.shadow(0, 0, 110),
  ...[-150, -112, -74, -36].map((y) => sh(rr(-36, y - 5, 72, 10, 3), "gray", { tone: 1, w: "detail" })),
  sh(rr(-46, -196, 14, 196, 6), c), sh(rr(32, -196, 14, 196, 6), c),
  ...[-170, -132, -94, -56, -18].map((y) => sh(rr(-36, y - 5, 72, 10, 3), "gray", { tone: 1, w: "detail" })),
  sh(rr(-48, -6, 18, 8, 3), "ink", { tone: 1, w: "hair" }), sh(rr(30, -6, 18, 8, 3), "ink", { tone: 1, w: "hair" }),
  gl(rr(-42, -190, 4, 180, 2), 0.5)); }, { stand: true, demo: { color: "orange" }, tags: ["climb", "diy", "step", "builder", "tool", "high"] });

reg("Tools", "paint-can", "Paint can", (o) => { const c = col(o, "red"), open = pick(o, "open", true); return A(
  tube("M-52 -26 Q0 -96 52 -26", "gray", 5),
  sh(rr(-56, -34, 112, 100, 8), "gray", { tone: 1 }),
  open ? sh(sm([[-58, -34], [-40, -42], [0, -40], [40, -42], [58, -34], [58, -26], [30, -20], [28, 6], [20, -18], [-10, -14], [-22, 14], [-30, -18], [-58, -26]]) + "Z", c) : "",
  sh(L.circ(0, -34, 56, 12), open ? c : "gray", open ? {} : { tone: 2 }),
  fl(rr(-56, 22, 112, 24, 0), c, 0.95), gl(rr(-48, -22, 6, 80, 3), 0.4),
); }, { demo: { color: "red", open: true }, tags: ["diy", "decorate", "house paint", "bucket", "colour", "tool"] });

reg("Tools", "paint-roller", "Paint roller", (o) => { const c = col(o, "blue"); return A(
  tube("M52 -50 H76 V4 H8 V22", "gray", 7),
  sh(rr(-76, -74, 128, 48, 18), c),

  sh(rr(-10, 20, 20, 74, 9), "wood"),
  gl(rr(-66, -68, 90, 7, 3), 0.55)); }, { demo: { color: "blue" }, tags: ["diy", "decorate", "wall", "paint", "tool", "brush"] });

reg("Tools", "pliers", "Pliers", () => g(A(
  tube("M-6 18 L-38 98", "red", 17), tube("M6 18 L38 98", "red", 17),
  sh(sm([[-22, 18], [-18, -30], [-6, -76], [6, -76], [18, -30], [22, 18], [0, 26], [-22, 18]]), "gray"),
  st("M0 -74 V4", { c: "ink", w: "detail" }), dot(0, 2, 8, "gold", D),
  gl(sm([[-14, -20], [-10, -50], [-6, -60], [-8, -24]]), 0.5)), "rotate(14)"), { tags: ["repair", "grip", "tool", "diy", "mechanic"] });

reg("Tools", "tape-measure", "Tape measure", () => A(
  sh(rr(30, 16, 78, 16, 2), "cream"), ...Array.from({ length: 8 }, (_, i) => st(`M${38 + i * 9} 16 v${i % 2 ? 7 : 11}`, { c: "ink", w: 2.5, op: 0.8 })),
  sh(rr(104, 8, 8, 32, 2), "gray", D),
  sh(rr(-66, -54, 100, 104, 30), "yellow"),
 sh(ci(-16, -2, 28), "white", D), dot(-16, -2, 8, "gray", D),
  sh(rr(-40, 40, 52, 20, 6), "ink", { tone: 1, w: "detail" }),
  gl(rr(-58, -46, 6, 70, 3), 0.55)), { tags: ["measure", "length", "builder", "tool", "diy", "ruler"] });

// ============================ GARDEN & OUTDOOR ============================
reg("Outdoor", "flower-pot", "Flower pot", (o) => { const c = col(o, "pink"); return A(
  tube("M0 -10 Q-4 -46 2 -74", "green", 7),
  sh(sm([[0, -30], [-36, -34], [-46, -56], [-20, -60], [0, -40]]) + "Z", "green", D), sh(sm([[0, -34], [36, -40], [46, -62], [20, -64], [0, -44]]) + "Z", "green", D),
  ...[0, 72, 144, 216, 288].map((a) => dot(2 + 20 * Math.cos(deg(a - 90)), -86 + 20 * Math.sin(deg(a - 90)), 14, c, D)), dot(2, -86, 11, "yellow", D),
  sh(po([[-46, -8], [46, -8], [34, 70], [-34, 70]], true), "orange", { tone: 2 }),
  sh(rr(-54, -20, 108, 22, 7), "orange", { tone: 2 }),
  gl(rr(-46, -14, 40, 5, 2), 0.45)); }, { demo: { color: "pink" }, tags: ["plant", "garden", "flowers", "pot", "terracotta"] });

reg("Outdoor", "watering-can", "Watering can", (o) => { const c = col(o, "green"); return A(
  tube("M40 40 L90 -34", "gray", 12), sh(sm([[78, -52], [104, -42], [100, -20], [76, -28]]) + "Z", "gray", D),
  tube("M-46 -20 Q-90 -30 -80 20 Q-76 44 -46 46", c, 11),
  tube("M-34 -14 Q0 -70 42 -12", c, 9),
  sh(rr(-52, -18, 98, 82, 14), c), sh(rr(-52, -22, 98, 14, 6), c, { tone: 2 }),
  fl(rr(-52, 20, 98, 8, 0), "white", 0.35),
  ...[[98, -12], [104, 4], [92, 14]].map(([x, y]) => fl(L.circ(x, y, 3, 5), "water")),
  gl(rr(-44, -10, 6, 66, 3), 0.5)); }, { demo: { color: "green" }, tags: ["garden", "water", "plants", "gardening"] });

reg("Outdoor", "wheelbarrow", "Wheelbarrow", (o) => { const c = col(o, "red"); return A(
 tube("M-102 -34 L-34 24", "wood", 11),
  tube("M10 40 L-6 76 M-44 30 L-62 76", "gray", 8),
  sh(sm([[-70, -34], [60, -42], [74, -48], [46, 24], [20, 40], [-40, 40], [-70, -34]]), c),
  sh(sm([[-60, -34], [-34, -66], [4, -72], [40, -62], [58, -42]]) + "Z", "earth", D),
  sh(L.circ(58, 52, 26), "ink", { w: "detail", tone: 1 }), sh(ci(58, 52, 13), "gray", D), dot(58, 52, 4, "ink", D),
  tube("M58 52 L52 8", "gray", 7),
  gl(sm([[-56, -26], [-32, -34], [-44, -14], [-56, -26]]), 0.5)); }, { demo: { color: "red" }, tags: ["garden", "carry", "soil", "building", "barrow"] });

reg("Outdoor", "compass", "Compass", () => A(
  sh(ci(0, -78, 14, 12), "gold", D),
  sh(ci(0, 0, 70), "gold"), sh(ci(0, 0, 58), "white", D),
  ...Array.from({ length: 12 }, (_, i) => st(`M${f1(58 * Math.cos(deg(i * 30)))} ${f1(58 * Math.sin(deg(i * 30)))} L${f1((i % 3 ? 50 : 44) * Math.cos(deg(i * 30)))} ${f1((i % 3 ? 50 : 44) * Math.sin(deg(i * 30)))}`, { c: "ink", w: 2.5, op: 0.7 })),
  g(A(sh(po([[0, -44], [9, 0], [-9, 0]], true), "red", D), sh(po([[0, 44], [9, 0], [-9, 0]], true), "gray", D)), "rotate(38)"), dot(0, 0, 4, "gold", { w: "hair" }),

  gl(sm([[-48, -22], [-36, -42], [-18, -50], [-34, -30], [-48, -22]]), 0.6)), { tags: ["navigation", "direction", "north", "hiking", "map", "explore"] });

reg("Outdoor", "binoculars", "Binoculars", () => A(
  sh(sm([[-82, -34], [-30, -34], [-26, 30], [-86, 30], [-82, -34]]), "navy"), sh(sm([[30, -34], [82, -34], [86, 30], [26, 30], [30, -34]]), "navy"),
  sh(rr(-20, -24, 40, 30, 8), "navy", { tone: 1 }),
  sh(rr(-80, -64, 44, 34, 12), "ink", { tone: 1 }), sh(rr(36, -64, 44, 34, 12), "ink", { tone: 1 }),
  sh(ci(-56, 44, 34), "ink", { tone: 1 }), sh(ci(56, 44, 34), "ink", { tone: 1 }),
  sh(ci(-56, 44, 24), "sky", D), sh(ci(56, 44, 24), "sky", D),
  gl(ci(-64, 36, 7), 0.8), gl(ci(48, 36, 7), 0.8), gl(rr(-76, -26, 6, 40, 3), 0.3)), { tags: ["birdwatching", "look", "spy", "explore", "zoom", "optics"] });

reg("Outdoor", "snowman", "Snowman", (o) => A(
  L.shadow(0, 0, 150),
  sh(ci(0, -42, 56), "snow"), sh(ci(0, -118, 40), "snow"), sh(ci(0, -176, 30), "snow"),
  tube("M-34 -112 L-96 -150 M-92 -140 L-108 -142 M-92 -140 L-100 -124 M34 -112 L96 -90", "brown", 6),
  sh(rr(-20, -234, 40, 36, 5), "ink"), sh(rr(-32, -208, 64, 9, 4), "ink", D),
 fl(ci(-10, -182, 3.5), "ink"), fl(ci(11, -182, 3.5), "ink"),
  sh(po([[0, -176], [34, -170], [0, -166]], true), "orange", D),
  sh(rr(-34, -142, 68, 14, 7), "red", D), sh(rr(14, -134, 14, 38, 5), "red", D),
  ...[-70, -48, -26].map((y) => fl(ci(0, y, 5), "ink")),
  gl(sm([[-42, -60], [-30, -84], [-14, -92], [-32, -66], [-42, -60]]), 0.8)), { stand: true, tags: ["winter", "snow", "christmas", "cold", "ice"] });

reg("Outdoor", "sandcastle", "Sandcastle", () => A(
  L.shadow(0, 0, 220),
  sh(sm([[-110, 0], [-96, -20], [-30, -26], [30, -26], [96, -20], [110, 0]]) + "Z", "sand", { tone: 2 }),
  sh(rr(-86, -92, 52, 74, 4), "sand"), sh(rr(34, -92, 52, 74, 4), "sand"),
  ...[-86, -68, -50].map((x) => sh(rr(x, -108, 16, 20, 2), "sand", D)), ...[34, 52, 70].map((x) => sh(rr(x, -108, 16, 20, 2), "sand", D)),
  sh(rr(-36, -122, 72, 108, 4), "sand", { tone: 1 }), ...[-36, -14, 8].map((x) => sh(rr(x, -138, 20, 20, 2), "sand", D)),
  sh("M-18 0 V-30 A18 18 0 0 1 18 -30 V0 Z", "sand", { tone: 2, w: "detail" }),
  tube("M0 -158 V-196", "wood", 5), sh(po([[2, -196], [40, -184], [2, -170]], true), "red", D),

  gl(rr(-30, -116, 6, 90, 3), 0.4)), { stand: true, tags: ["beach", "summer", "sand", "castle", "holiday", "kids"] });

reg("Outdoor", "beach-umbrella", "Beach umbrella", (o) => { const c = col(o, "red"); return A(
  L.shadow(0, 0, 120),
  tube("M0 -170 L6 0", "wood", 8),
  sh(sm([[-130, -112], [-110, -150], [-60, -176], [0, -186], [60, -176], [110, -150], [130, -112]]) + "Z", c),
  ...[-70, -26, 26, 70].map((x, i) => i % 2 === 0 ? fl(po([[x, -176], [x * 1.9 + (i === 0 ? -20 : 20), -112], [x * 0.2, -112]], true), "white", 0.95) : ""),
  st("M-130 -112 Q-96 -98 -66 -112 Q-34 -98 0 -112 Q34 -98 66 -112 Q96 -98 130 -112", { c: "ink", w: "detail" }),
  sh(sm([[-30, 0], [-10, -10], [30, -8], [50, 0]]) + "Z", "sand", { tone: 2, w: "detail" }),
  gl(sm([[-100, -128], [-76, -156], [-50, -166], [-82, -134]]), 0.5)); }, { stand: true, demo: { color: "red" }, tags: ["beach", "summer", "sun", "shade", "parasol", "holiday"] });

reg("Outdoor", "deckchair", "Deck chair", (o) => { const c = col(o, "blue"), band = L.limb([[-56, -150], [-34, -84], [0, -36], [44, -20], [76, -50]], 38, 38);
  const stripes = Array.from({ length: 8 }, (_, i) => L.tag("rect", { x: -90 + i * 24, y: -200, width: 12, height: 220, fill: L.c("white") })).join(""); return A(
  L.shadow(0, 0, 170),
  tube("M-72 0 L-34 -102 M76 0 L40 -44 M-84 -160 L-50 -140", "wood", 9), tube("M-30 -92 L58 -66", "wood", 8),
  solid(band, c, stripes),
  gl("M-60 -140 L-40 -86", 0)); }, { stand: true, demo: { color: "blue" }, tags: ["beach", "chair", "summer", "relax", "holiday", "garden", "lounger"] });

reg("Outdoor", "shovel", "Shovel", () => g(A(
  tube("M0 -62 V28", "wood", 11), tube("M-22 -82 Q0 -104 22 -82", "wood", 9),
  sh(sm([[-26, 20], [26, 20], [34, 62], [0, 92], [-34, 62], [-26, 20]]), "gray"),
  gl(sm([[-18, 30], [-8, 30], [-12, 62], [-22, 56]]), 0.5)), "rotate(24)"), { tags: ["garden", "dig", "spade", "soil", "sand", "tool"] });

reg("Outdoor", "lantern", "Lantern", (o) => { const c = col(o, "red"), lit = pick(o, "lit", true); return A(
  tube("M-34 -62 Q0 -118 34 -62", "gray", 7),
  sh(rr(-48, -66, 96, 16, 7), c, { tone: 2 }),
  sh(rr(-38, -52, 76, 100, 14), lit ? "yellow" : "glass"),
  lit ? fl(ci(0, -2, 22), "white", 0.8) : "",
  ...[-18, 18].map((x) => st(`M${x} -50 V46`, { c: "gray", w: 3, op: 0.8 })),
  sh(rr(-48, 44, 96, 18, 7), c, { tone: 2 }),
  gl(rr(-32, -44, 5, 70, 2), 0.7)); }, { demo: { color: "red", lit: true }, tags: ["camping", "light", "night", "lamp", "outdoor", "glow"] });

reg("Outdoor", "bird-house", "Bird house", () => A(
  L.shadow(0, 0, 90),
  sh(rr(-6, -90, 12, 90, 4), "wood", { tone: 2 }),
  sh(rr(-52, -178, 104, 90, 6), "wood", { tone: 1 }),
  sh(po([[-64, -176], [0, -228], [64, -176]], true), "red"),
  sh(ci(0, -142, 16), "ink", { tone: 1, w: "detail" }), sh(rr(-4, -120, 8, 18, 2), "wood", { tone: 2, w: "detail" }),

  gl(rr(-46, -170, 6, 70, 2), 0.35)), { stand: true, tags: ["bird", "garden", "nest", "box", "tweet", "wood"] });

reg("Outdoor", "sunflower", "Sunflower", () => A(
 tube("M0 4 Q-6 60 0 112", "green", 9),
  sh(sm([[0, 70], [-40, 50], [-52, 70], [-20, 82], [0, 70]]) + "Z", "green", D), sh(sm([[0, 56], [36, 36], [50, 54], [20, 68], [0, 56]]) + "Z", "green", D),

  ...Array.from({ length: 12 }, (_, i) => g(sh(sm([[0, 0], [-11, -26], [0, -50], [11, -26], [0, 0]]) + "Z", i % 2 ? "yellow" : "gold", D), `translate(0 -42) rotate(${i * 30})`)),
  sh(ci(0, -42, 24), "brown"), ...[[-8, -48], [6, -52], [10, -38], [-6, -34], [0, -42]].map(([x, y]) => fl(ci(x, y, 2.2), "ink", 0.6)),
  gl(ci(-10, -54, 4), 0.35)), { tags: ["flower", "garden", "summer", "yellow", "plant", "sun"] });

// ============================ SPORTS ============================
const glove = (c) => A(
  sh(sm([[-40, -60], [20, -74], [58, -40], [58, 10], [42, 42], [-32, 46], [-50, 10], [-40, -60]]), c),
  sh(sm([[-46, -6], [-72, -2], [-70, 24], [-42, 28]]) + "Z", c, { tone: 2 }),
  sh(rr(-46, 40, 94, 40, 9), "white"), st("M-30 52 H34 M-30 66 H34", { c: "gray", w: 3, op: 0.5 }),
  st("M-20 -50 Q10 -64 38 -40", { c: "white", w: 6, op: 0.5 }));
reg("Sports", "boxing-gloves", "Boxing gloves", (o) => { const c = col(o, "red"); return A(g(glove(c), "translate(-52 -4) rotate(-12) scale(0.9)"), g(glove(c), "translate(52 -4) scale(-0.9 0.9) rotate(-12)")); }, { demo: { color: "red" }, tags: ["boxing", "fight", "punch", "fitness", "training", "gym"] });

reg("Sports", "yoga-mat", "Yoga mat", (o) => { const c = col(o, "purple"); return g(A(
  sh(rr(-70, -44, 130, 88, 8), c, { tone: 2 }), sh(L.circ(-70, 0, 44, 44), c, { tone: 1 }),
  st(L.smooth(Array.from({ length: 24 }, (_, i) => { const a = i * 0.55, r = 4 + i * 1.7; return [-70 + r * Math.cos(a), r * Math.sin(a)]; })), { c: c, w: 4, op: 0.9 }),
  fl(rr(-50, -40, 100, 6, 3), "white", 0.4), sh(rr(-16, -48, 18, 96, 5), "gold", D)), "rotate(-14 0 0) translate(14 0)"); }, { demo: { color: "purple" }, tags: ["yoga", "fitness", "exercise", "gym", "stretch", "roll"] });

reg("Sports", "baseball-bat", "Baseball bat and ball", () => A(
  g(A(sh(sm([[-100, -8], [-98, -14], [60, -22], [96, -26], [102, 0], [96, 26], [60, 22], [-98, 14], [-100, -8]]), "wood", { tone: 1 }), sh(rr(-104, -12, 12, 24, 5), "wood", { tone: 2, w: "detail" }), gl(rr(-70, -12, 120, 6, 3), 0.45)), "rotate(-30) translate(-6 -16)"),
  sh(ci(40, 48, 32), "white"), st("M22 30 Q34 48 22 66 M58 30 Q46 48 58 66", { c: "red", w: 3 }),
  ...[[24, 34], [26, 42], [26, 54], [24, 62]].map(([x, y]) => st(`M${x} ${y} l7 0`, { c: "red", w: 2, op: 0 }))), { tags: ["baseball", "softball", "hit", "ball", "bat", "game"] });

reg("Sports", "golf", "Golf club and ball", () => A(
  g(A(tube("M0 -100 V40", "gray", 7), sh(rr(-6, -112, 12, 54, 5), "ink", { tone: 1 }), sh(sm([[-4, 36], [34, 40], [44, 60], [-10, 62], [-4, 36]]), "gray", { tone: 1 })), "rotate(18) translate(-14 -2)"),
 tube("M64 82 L64 66", "red", 8),
  sh(ci(64, 56, 15), "white"), ...[[60, 52], [68, 56], [62, 62]].map(([x, y]) => fl(ci(x, y, 1.6), "gray", 0.8))), { tags: ["sport", "course", "tee", "swing", "ball"] });

reg("Sports", "badminton", "Badminton racket and shuttlecock", () => A(
  g(A(tube("M0 20 V78", "ink", 7), tube("M0 20 V0", "gray", 7), eo(sh(ci(0, -46, 46, 56) + ci(0, -46, 36, 46), "red")), 
    ...[-22, -11, 0, 11, 22].map((x) => st(`M${x} ${-46 - 40 * Math.sqrt(1 - (x / 36) ** 2)} V${-46 + 40 * Math.sqrt(1 - (x / 36) ** 2)}`, { c: "white", w: 1.8, op: 0.9 })),
    ...[-26, -10, 6, 22, 38].map((y) => st(`M-34 ${y - 46 + 10} H34`, { c: "white", w: 1.8, op: 0.9 })), sh(rr(-5, 74, 10, 20, 4), "ink", D)), "translate(-34 -2) rotate(-28)"),
  g(A(sh(sm([[-12, -4], [-30, -48], [30, -48], [12, -4]]) + "Z", "white"), sh(ci(0, 4, 13), "red", D), st("M-14 -38 L-6 -8 M0 -42 V-6 M14 -38 L6 -8", { c: "gray", w: 2, op: 0.7 })), "translate(60 28) rotate(36)")), { tags: ["sport", "racket", "shuttle", "birdie", "game", "racquet"] });

reg("Sports", "table-tennis", "Table tennis paddle and ball", () => A(
  g(A(sh(rr(-9, 30, 18, 52, 7), "wood", { tone: 1 }), sh(ci(0, -14, 54, 50), "red"), fl(ci(0, -14, 44, 40), "red", 0.01), gl(sm([[-36, -30], [-24, -48], [-8, -52], [-28, -34]]), 0.5), st(L.arc(0, -14, 44, 200, 340, 40), { c: "white", w: 2.5, op: 0.3 })), "translate(-14 4) rotate(-20)"),
  sh(ci(62, 38, 16), "white"), gl(ci(57, 33, 4), 0.9)), { tags: ["ping pong", "sport", "bat", "ball", "game"] });

reg("Sports", "jump-rope", "Jump rope", () => A(
  tube("M-40 -60 C-100 40 -40 100 0 90 C40 100 100 40 40 -60", "red", 5),
  sh(rr(-52, -92, 24, 56, 10), "blue"), sh(rr(28, -92, 24, 56, 10), "blue"),
  gl(rr(-48, -86, 4, 40, 2), 0.5), gl(rr(32, -86, 4, 40, 2), 0.5)), { tags: ["skipping", "fitness", "exercise", "kids", "workout", "cardio"] });

reg("Sports", "bowling", "Bowling pin and ball", () => A(
  sh(sm([[40, -88], [58, -88], [62, -64], [50, -44], [64, -4], [70, 40], [50, 66], [18, 66], [-2, 40], [4, -4], [18, -44], [8, -64], [10, -88], [40, -88]]).replace("M40 -88", "M29 -88"), "white"),
  fl(rr(10, -36, 38, 8, 0), "red", 0.9), fl(rr(10, -22, 38, 8, 0), "red", 0.9),
  sh(ci(-34, 44, 40), "navy"), dot(-44, 30, 5, "ink", D), dot(-30, 28, 5, "ink", D),
  gl(sm([[-62, 28], [-52, 12], [-36, 8], [-50, 22]]), 0.6)), { tags: ["sport", "strike", "alley", "game", "ten pin", "ball"] });

// ============================ MUSIC & PARTY ============================
reg("Party", "balloons", "Balloons", (o) => A(
  tube("M-34 -4 Q-10 60 4 100 M0 -26 Q6 40 4 100 M36 -2 Q16 60 4 100", "gray", 3),
  ...[[-42, -40, "red", -8], [0, -62, "yellow", 0], [40, -36, "blue", 8]].map(([x, y, c, r]) => g(A(sh(sm([[0, -46], [28, -36], [32, 0], [14, 34], [0, 44], [-14, 34], [-32, 0], [-28, -36], [0, -46]]), c), sh(po([[0, 44], [-7, 54], [7, 54]], true), c, { tone: 2, w: "detail" }), gl(sm([[-20, -26], [-12, -38], [-4, -38], [-14, -22]]), 0.7)), `translate(${x} ${y}) rotate(${r}) scale(0.82)`))), { tags: ["party", "birthday", "celebration", "helium", "fun"] });

reg("Party", "birthday-cake", "Birthday cake", (o) => { const n = Math.max(0, Math.min(5, pick(o, "candles", 3))); return A(
  sh(rr(-70, 4, 140, 62, 10), "pink", { tone: 2 }), sh(rr(-54, -34, 108, 42, 10), "cream"),
  sh(sm([[-72, 8], [-54, 28], [-36, 8], [-18, 30], [0, 8], [18, 30], [36, 8], [54, 28], [72, 8]]) + "L72 0 L-72 0Z", "cream", { w: "detail" }),
  sh(rr(-64, 66, 128, 8, 4), "white", D),
  ...Array.from({ length: n }, (_, i) => { const x = n === 1 ? 0 : -36 + (72 / (n - 1)) * i; return A(sh(rr(x - 5, -62, 10, 30, 3), i % 2 ? "blue" : "yellow", D), fl(sm([[x, -92], [x + 8, -76], [x, -66], [x - 8, -76], [x, -92]]) + "Z", "orange"), fl(ci(x, -75, 3.5), "yellow")); }),
  ...[-40, -10, 22, 46].map((x, i) => dot(x, 36, 5, ["red", "yellow", "green", "blue"][i], D)),
  gl(rr(-48, -28, 40, 6, 3), 0.7)); }, { demo: { candles: 3 }, tags: ["party", "birthday", "celebration", "candles", "dessert", "sweet", "age"] });

reg("Party", "boombox", "Boombox", () => A(
  tube("M-40 -48 Q0 -92 40 -48", "gray", 7),
  sh(rr(-92, -48, 184, 100, 16), "gray", { tone: 1 }),
  sh(ci(-52, 6, 34), "ink", { tone: 1 }), sh(ci(52, 6, 34), "ink", { tone: 1 }), dot(-52, 6, 16, "gray", D), dot(52, 6, 16, "gray", D), dot(-52, 6, 5, "ink", D), dot(52, 6, 5, "ink", D),
  sh(rr(-24, -34, 48, 24, 5), "teal", { tone: 1, w: "detail" }), ...[-16, -4, 8].map((x, i) => fl(rr(x, -28, 6, 12 - i * 2, 1), "white", 0.85)),
  dot(-12, 14, 5, "red", D), dot(8, 14, 5, "yellow", D), sh(rr(-20, 28, 40, 10, 4), "ink", { tone: 1, w: "detail" }),
  gl(rr(-84, -42, 90, 5, 2), 0.35)), { tags: ["music", "radio", "stereo", "speaker", "retro", "audio", "party"] });

reg("Party", "vinyl-record", "Vinyl record", (o) => { const c = col(o, "red"); return A(
  sh(ci(0, 0, 80), "ink", { tone: 1 }),
  ...[66, 56, 46].map((r) => st(L.circ(0, 0, r), { c: "gray", w: 1.8, op: 0.45 })),
  sh(ci(0, 0, 28), c, D), dot(0, 0, 4, "paper", { w: "hair" }),
  gl(sm(L.arcPts(0, 0, 70, 200, 250, 6)), 0.5) && st(sm(L.arcPts(0, 0, 66, 205, 250, 6)), { c: "white", w: 5, op: 0.35 })); }, { demo: { color: "red" }, tags: ["music", "lp", "retro", "disc", "record", "dj", "vintage"] });

reg("Party", "violin", "Violin", () => g(A(
  tube("M0 -30 V-102", "wood", 9), sh(rr(-10, -112, 20, 16, 6), "wood", { tone: 2 }),
  sh(sm([[0, -32], [26, -36], [34, -10], [24, 6], [40, 24], [34, 60], [0, 70], [-34, 60], [-40, 24], [-24, 6], [-34, -10], [-26, -36], [0, -32]]), "orange", { tone: 2 }),
  st("M-14 -4 Q-20 8 -14 18 M14 -4 Q20 8 14 18", { c: "ink", w: 3.5 }), sh(rr(-16, 38, 32, 7, 3), "ink", { tone: 1, w: "detail" }),
  st("M-4 -36 V44 M4 -36 V44", { c: "gray", w: 1.5, op: 0.8 }), gl(sm([[-28, 28], [-30, 46], [-18, 58], [-28, 38]]), 0.45),
), "rotate(22)"), { tags: ["music", "strings", "classical", "orchestra", "instrument", "fiddle"] });

reg("Party", "maracas", "Maracas", () => A(
  g(A(tube("M0 24 V84", "wood", 9), sh(ci(0, -14, 38, 46), "red"), st("M-20 -30 Q0 -12 20 -40 M-30 -6 Q0 14 30 -14", { c: "yellow", w: 5 })), "translate(-34 4) rotate(-22)"),
  g(A(tube("M0 24 V84", "wood", 9), sh(ci(0, -14, 38, 46), "blue"), st("M-20 -30 Q0 -12 20 -40 M-30 -6 Q0 14 30 -14", { c: "yellow", w: 5 })), "translate(40 4) rotate(22)"),
  gl(sm([[-62, -26], [-54, -46], [-42, -52], [-54, -34]]), 0.6)), { tags: ["music", "percussion", "shake", "fiesta", "instrument", "party"] });

reg("Party", "tambourine", "Tambourine", () => A(
  sh(ci(0, 0, 68), "orange", { tone: 2 }), sh(ci(0, 0, 46), "paper", D),
  ...[0, 72, 144, 216, 288].map((a) => g(sh(rr(-9, -15, 18, 30, 4), "ink", { w: "detail", tone: 1, flat: true }) + dot(0, -7, 5.5, "gold", D) + dot(0, 7, 5.5, "gold", D), `translate(${f1(57 * Math.cos(deg(a - 90)))} ${f1(57 * Math.sin(deg(a - 90)))}) rotate(${a})`)),
  st(L.arc(0, 0, 36, 200, 250), { c: "white", w: 4, op: 0.6 })), { tags: ["music", "percussion", "instrument", "jingle", "band"] });

reg("Party", "party-horn", "Party horn", () => g(A(
  sh(sm([[-80, 50], [-60, 14], [22, -30], [44, 6], [4, 46], [-80, 50]]), "pink"),
  fl(po([[-44, 20], [-30, 36], [-8, 26], [-24, 8]], true), "yellow", 0.95), fl(po([[-4, -2], [10, 8], [24, -6], [14, -18]], true), "blue", 0.9),
  g(sh(L.circ(0, 0, 9, 26), "yellow", D), "translate(34 -12) rotate(-23)"),
  st("M-80 50 Q-90 60 -100 56", { c: "pink", w: 6 }),
  st("M44 6 Q62 -20 40 -40 Q18 -60 32 -84", { c: "orange", w: 5 }), st("M48 -6 Q82 -14 86 -44", { c: "teal", w: 5 }), st("M30 -26 Q36 -50 64 -60", { c: "red", w: 5 }),
  ...[[78, -70, "red"], [40, -90, "blue"], [96, -26, "yellow"]].map(([x, y, c]) => fl(ci(x, y, 5), c))), "translate(-10 8)"), { tags: ["party", "birthday", "celebration", "new year", "streamer", "blower"] });

// ============================ SHOP & MONEY ============================
reg("Shop", "shopping-cart", "Shopping cart", () => A(
  tube("M-100 -72 H-70 L-40 28 H60", "gray", 7),
  sh(po([[-62, -50], [88, -50], [70, 12], [-44, 12]], true), "red", { tone: 0 }),
  ...[-30, 0, 30, 60].map((x) => st(`M${x} -48 L${x - 8} 10`, { c: "white", w: 3, op: 0.55 })), st("M-58 -22 H82 M-52 -4 H78", { c: "white", w: 3, op: 0.55 }),
 dot(-30, 62, 11, "ink", D), dot(52, 62, 11, "ink", D), dot(-30, 62, 4, "gray", D), dot(52, 62, 4, "gray", D),
  tube("M-44 28 L-30 50 M60 28 L52 50", "gray", 7)), { tags: ["shopping", "store", "supermarket", "buy", "trolley", "retail", "cart"] });

reg("Shop", "shopping-basket", "Shopping basket", (o) => A(
  pick(o, "full", true) ? A(sh(rr(30, -78, 24, 54, 8), "green", D), dot(-18, -52, 17, "red", D), dot(8, -58, 16, "orange", D), sh(po([[-50, -30], [-30, -66], [-10, -30]], true), "yellow", D)) : "",
  tube("M-60 -26 Q0 -112 60 -26", "gray", 8),
 sh(po([[-86, -30], [86, -30], [68, 66], [-68, 66]], true), "orange"),
  ...[-48, -16, 16, 48].map((x) => st(`M${x * 1.1} -26 L${x * 0.95} 62`, { c: "white", w: 3, op: 0.5 })), ...[0, 28].map((y) => st(`M-80 ${y} H80`, { c: "white", w: 3, op: 0.5 })),
  sh(rr(-92, -40, 184, 14, 6), "orange", { tone: 2 }),
  gl(rr(-80, -34, 60, 5, 2), 0.5)), { demo: { full: true }, tags: ["shopping", "store", "groceries", "buy", "retail", "empty", "full"] });

reg("Shop", "price-tag", "Price tag", (o) => { const c = col(o, "yellow"); return g(A(
  tube("M-58 -46 Q-96 -76 -80 -92", "gray", 3),
  sh(po([[-70, -4], [-30, -44], [64, -44], [64, 44], [-30, 44]], true), c),
  sh(ci(-44, -4, 9), "paper", D), L.text(String(pick(o, "price", "$9")), 14, 14, { size: 44, c: "ink" }),
  gl(rr(-20, -38, 60, 5, 2), 0.6)), "rotate(-12)"); }, { demo: { color: "yellow", price: "$9" }, tags: ["sale", "price", "label", "cost", "store", "discount", "retail"] });

reg("Shop", "safe", "Safe", () => A(
  L.shadow(0, 0, 150),
  sh(rr(-70, -140, 140, 140, 10), "gray", { tone: 1 }),
  sh(rr(-56, -126, 112, 112, 6), "gray"),
  sh(ci(8, -70, 30), "gray", { tone: 2 }), dot(8, -70, 14, "gold", D), ...Array.from({ length: 8 }, (_, i) => st(`M${f1(8 + 20 * Math.cos(deg(i * 45)))} ${f1(-70 + 20 * Math.sin(deg(i * 45)))} L${f1(8 + 28 * Math.cos(deg(i * 45)))} ${f1(-70 + 28 * Math.sin(deg(i * 45)))}`, { c: "ink", w: 2.5 })),
  sh(rr(-52, -100, 10, 20, 3), "ink", { tone: 1, w: "detail" }), sh(rr(-52, -64, 10, 20, 3), "ink", { tone: 1, w: "detail" }),
  sh(rr(-62, 0, 20, 12, 3), "ink", { tone: 1, w: "detail" }), sh(rr(42, 0, 20, 12, 3), "ink", { tone: 1, w: "detail" }),
  gl(rr(-50, -120, 6, 100, 3), 0.3)), { stand: true, tags: ["bank", "vault", "money", "secure", "lock", "valuables", "treasure"] });

reg("Shop", "open-sign", "Open sign", (o) => { const open = pick(o, "open", true); return A(
  tube("M-40 -78 L-32 -50 M40 -78 L32 -50", "gray", 3),
  sh(rr(-84, -50, 168, 100, 18), open ? "green" : "red"),
  fl(rr(-72, -38, 144, 76, 10), "white", 0.18),
  L.text(open ? "OPEN" : "CLOSED", 0, 14, { size: open ? 56 : 44, c: "white", halo: "ink", haloW: 0.12 }),
  gl(rr(-76, -42, 80, 5, 2), 0.45)); }, { demo: { open: true }, tags: ["shop", "store", "closed", "sign", "business", "hours", "welcome"] });

// ============================ SIGNS & PICTOGRAMS ============================
reg("Signs", "no-entry", "No entry", () => A(
 sh(ci(0, 0, 72), "red"), sh(rr(-48, -13, 96, 26, 7), "white", D),
  gl(sm([[-52, -28], [-40, -48], [-20, -58], [-40, -36]]), 0.5)), { tags: ["stop", "forbidden", "road sign", "do not enter", "restricted"] });

reg("Signs", "exit-sign", "Exit sign", () => A(
  sh(rr(-88, -44, 176, 88, 14), "green"), fl(rr(-78, -34, 156, 68, 8), "white", 0.12),
  L.text("EXIT", -22, 15, { size: 42, c: "white" }),
  sh(po([[46, -8], [60, -8], [60, -20], [78, 0], [60, 20], [60, 8], [46, 8]], true), "white", D),
  gl(rr(-80, -38, 80, 5, 2), 0.4)), { tags: ["door", "way out", "emergency", "fire exit", "safety", "building"] });

reg("Signs", "signal-bars", "Signal bars", (o) => { const n = Math.max(0, Math.min(4, pick(o, "level", 3))); return A(
  ...[0, 1, 2, 3].map((i) => sh(rr(-68 + i * 36, 60 - (34 + i * 28), 26, 34 + i * 28, 6), i < n ? "green" : "gray", i < n ? { w: "detail" } : { w: "detail", tone: 1 }))); },
  { demo: { level: 3 }, tags: ["wifi", "reception", "network", "phone", "connection", "icon", "strength"] });

variants("Signs", "battery", "Battery level", (o) => { const v = Math.max(0, Math.min(1, pick(o, "level", 0.75))), c = v > 0.5 ? "green" : v > 0.25 ? "yellow" : "red"; return A(
  sh(rr(70, -18, 16, 36, 5), "gray", D), sh(rr(-86, -44, 160, 88, 16), "white"),
  v > 0.02 ? sh(rr(-76, -34, Math.max(20, 140 * v), 68, 9), c, { w: "detail" }) : "", gl(rr(-70, -30, 70 * Math.min(v, 1), 6, 3), 0.55)); },
  [["full", { level: 1 }, "full"], ["half", { level: 0.5 }, "half"], ["low", { level: 0.15 }, "low"]], { tags: ["power", "charge", "energy", "phone", "icon", "empty", "level"] });

reg("Signs", "info-badge", "Info badge", () => A(
  sh(ci(0, 0, 72), "blue"), dot(0, -34, 10, "white", D), sh(rr(-10, -14, 20, 52, 7), "white", D),
  gl(sm([[-52, -28], [-40, -48], [-20, -58], [-40, -36]]), 0.5)), { tags: ["information", "help", "i", "about", "icon", "tip"] });

reg("Signs", "prohibited", "Prohibited", () => A(
  fl(L.circ(0, 0, 54), "white", 0.65), ring(0, 0, 72, 54, "red"), g(sh(rr(-56, -9, 112, 18, 6), "red"), "rotate(-45)"),
  gl(sm([[-62, -28], [-52, -46], [-34, -58], [-48, -38]]), 0.5)), { tags: ["no", "forbidden", "not allowed", "ban", "cancel", "icon", "banned"] });

reg("Signs", "play-button", "Play button", () => A(
  sh(ci(0, 0, 72), "blue"), sh(po([[-20, -36], [-20, 36], [40, 0]], true), "white", D),
  gl(sm([[-52, -28], [-40, -48], [-20, -58], [-40, -36]]), 0.5)), { tags: ["video", "start", "media", "triangle", "icon", "go", "watch"] });

reg("Signs", "pause-button", "Pause button", () => A(
  sh(ci(0, 0, 72), "orange"), sh(rr(-30, -34, 20, 68, 6), "white", D), sh(rr(10, -34, 20, 68, 6), "white", D),
  gl(sm([[-52, -28], [-40, -48], [-20, -58], [-40, -36]]), 0.5)), { tags: ["video", "stop", "media", "wait", "icon", "hold"] });

reg("Signs", "bell", "Bell", () => A(
  dot(0, -72, 9, "gold", D),
  sh(sm([[0, -64], [30, -52], [38, -6], [46, 28], [64, 46], [-64, 46], [-46, 28], [-38, -6], [-30, -52], [0, -64]]), "gold"),
  sh(ci(0, 58, 13), "gold", { tone: 2, w: "detail" }),
  gl(sm([[-26, -42], [-18, -50], [-24, -6], [-30, 18]]), 0.55)), { tags: ["notification", "alert", "alarm", "ring", "icon", "reminder", "subscribe"] });

reg("Signs", "home-icon", "Home icon", () => A(
  sh(rr(-52, -10, 104, 76, 6), "cream"), sh(rr(26, -62, 18, 40, 3), "red", { tone: 2 }),
  sh(po([[-72, -6], [0, -76], [72, -6]], true), "red"), sh(rr(-14, 16, 28, 50, 5), "orange", D), sh(rr(-44, 6, 22, 22, 4), "sky", D), sh(rr(22, 6, 22, 22, 4), "sky", D),
  gl(rr(-44, -2, 50, 5, 2), 0.5)), { tags: ["house", "main", "building", "icon", "homepage", "address"] });

reg("Signs", "thumbs", "Thumbs up", (o) => { const up = pick(o, "up", true); return g(A(
  sh(sm([[-8, -8], [14, -40], [22, -76], [46, -78], [50, -46], [42, -22], [80, -22], [88, 0], [80, 20], [84, 38], [74, 56], [62, 68], [-8, 66]]) + "Z", "s2"),

  sh(rr(-62, -12, 52, 82, 10), "blue"), gl(rr(-54, -6, 6, 60, 3), 0.5)), up ? "translate(0 -4)" : "scale(1 -1) translate(0 -4)"); },
  { demo: { up: true }, tags: ["like", "approve", "good", "ok", "yes", "thumb", "icon", "thumbs down", "dislike"] });

reg("Signs", "user-icon", "User icon", () => A(
  sh(ci(0, 0, 72), "blue"), clipTo(L.circ(0, 0, 72), A(sh(ci(0, 86, 52, 56), "white", D))), sh(ci(0, -16, 26), "white", D),
) , { tags: ["person", "profile", "account", "avatar", "login", "icon", "member"] });

reg("Signs", "toggle", "Toggle switch", (o) => { const on = pick(o, "on", true); return A(
  sh(rr(-72, -38, 144, 76, 38), on ? "green" : "gray", on ? {} : { tone: 1 }),
  sh(ci(on ? 34 : -34, 0, 30), "white", D),
  gl(rr(-56, -30, 50, 6, 3), 0.4)); }, { demo: { on: true }, tags: ["switch", "on", "off", "setting", "icon", "control", "slider"] });

reg("Signs", "checkbox", "Checkbox", (o) => { const on = pick(o, "checked", true); return A(
  sh(rr(-62, -62, 124, 124, 20), "white"),
  on ? st("M-36 2 L-10 30 L40 -34", { c: "green", w: 18 }) : ""); }, { demo: { checked: true }, tags: ["tick", "done", "task", "todo", "form", "icon", "empty", "checked"] });

const heartD = sm([[0, 70], [-62, 14], [-74, -26], [-48, -58], [-14, -52], [0, -28], [14, -52], [48, -58], [74, -26], [62, 14], [0, 70]]);
reg("Signs", "heart-full", "Heart", (o) => A(sh(heartD, col(o, "red")), gl(sm([[-56, -24], [-48, -44], [-30, -48], [-40, -30]]), 0.6)), { demo: {}, tags: ["love", "like", "health", "life", "icon", "valentine", "favourite"] });
reg("Signs", "heart-half", "Heart (half)", () => A(solid(heartD, "white", fl(rr(-100, -100, 100, 200, 0), "red", 1)), gl(sm([[-56, -24], [-48, -44], [-30, -48], [-40, -30]]), 0.6)), { tags: ["love", "health", "life", "icon", "lives", "game", "half"] });
reg("Signs", "heart-empty", "Heart (empty)", () => sh(heartD, "white"), { tags: ["love", "health", "life", "icon", "lives", "game", "outline", "empty"] });
reg("Signs", "heart-broken", "Broken heart", () => {
  const cut = "M-200 -200 H0 L-12 -42 L10 -14 L-8 20 L8 46 L-4 100 H-200 Z", cutR = "M200 -200 H0 L-12 -42 L10 -14 L-8 20 L8 46 L-4 100 H200 Z";
  return A(g(clipTo(cut, sh(heartD, "red")), "translate(-7 2) rotate(-6)"), g(clipTo(cutR, sh(heartD, "red", { tone: 2 })), "translate(7 -2) rotate(5)"));
}, { tags: ["love", "sad", "breakup", "heartbreak", "icon", "grief", "lonely"] });

variants("Signs", "clock", "Clock", (o) => { const h = pick(o, "h", 3), m = pick(o, "m", 0), ah = deg((h % 12 + m / 60) * 30 - 90), am = deg(m * 6 - 90); return A(
  sh(ci(0, 0, 74), "white"),
  ...Array.from({ length: 12 }, (_, i) => st(`M${f1(62 * Math.cos(deg(i * 30)))} ${f1(62 * Math.sin(deg(i * 30)))} L${f1((i % 3 ? 55 : 48) * Math.cos(deg(i * 30)))} ${f1((i % 3 ? 55 : 48) * Math.sin(deg(i * 30)))}`, { c: "ink", w: i % 3 ? 2.5 : 4 })),
  st(`M0 0 L${f1(36 * Math.cos(ah))} ${f1(36 * Math.sin(ah))}`, { c: "ink", w: 8 }), st(`M0 0 L${f1(54 * Math.cos(am))} ${f1(54 * Math.sin(am))}`, { c: "ink", w: 5 }), dot(0, 0, 6, "red", D),
  gl(sm([[-56, -30], [-46, -48], [-28, -58], [-44, -38]]), 0.6)); },
  [["3", { h: 3, m: 0 }, "3 o'clock"], ["6-30", { h: 6, m: 30 }, "half past six"], ["9-15", { h: 9, m: 15 }, "quarter past nine"], ["12", { h: 12, m: 0 }, "noon"]], { tags: ["time", "hour", "watch", "icon", "deadline", "schedule", "wall clock"] });

variants("Signs", "volume", "Speaker icon", (o) => { const lv = pick(o, "level", 2); return A(
  sh(po([[-70, -22], [-40, -22], [-4, -56], [-4, 56], [-40, 22], [-70, 22]], true), "gray", { tone: 1 }),
  ...(lv ? [1, 2, 3].filter((i) => i <= lv).map((i) => st(L.arc(-4, 0, 18 + i * 22, -42, 42), { c: "ink", w: 7 })) : [st("M22 -26 L62 26 M62 -26 L22 26", { c: "red", w: 9 })])); },
  [["low", { level: 1 }, "low"], ["loud", { level: 3 }, "loud"], ["mute", { level: 0 }, "muted"]], { tags: ["sound", "audio", "mute", "volume", "icon", "loud", "quiet", "noise"] });

reg("Signs", "star-rating", "Star rating", (o) => { const n = pick(o, "n", 4); return A(...[0, 1, 2, 3, 4].map((i) => sh(L.star(-80 + i * 40, 0, 22, 9.5), i < n ? "yellow" : "gray", i < n ? { w: "detail" } : { w: "detail", tone: 1 }))); },
  { demo: { n: 4 }, tags: ["review", "stars", "rating", "score", "quality", "icon", "five star", "feedback"] });

// ============================ HEALTH ============================
reg("Health", "bathroom-scale", "Bathroom scale", () => A(
  sh(rr(-66, -82, 132, 160, 30), "white"), sh(rr(-36, -66, 72, 32, 9), "teal", { tone: 1, w: "detail" }), L.text("68", 0, -41, { size: 28, c: "ink", font: "Fredoka" }),
  ...[[-24, 24, -8], [24, 24, 8]].map(([x, y, r]) => g(A(fl(sm([[0, -34], [14, -26], [14, 12], [0, 28], [-14, 12], [-14, -26], [0, -34]]) + "Z", "gray", 0.45)), `translate(${x} ${y}) rotate(${r})`)),
  gl(rr(-58, -72, 40, 6, 3), 0.7)), { tags: ["weight", "weigh", "diet", "fitness", "bathroom", "kg", "health"] });

reg("Health", "water-drop", "Water drop", (o) => { const c = col(o, "water"); return A(
  sh(sm([[0, -82], [32, -30], [52, 10], [42, 50], [0, 74], [-42, 50], [-52, 10], [-32, -30], [0, -82]]), c),
  gl(sm([[-34, 6], [-30, -14], [-18, -34], [-22, -8], [-26, 22], [-34, 6]]), 0.65)); }, { demo: { color: "water" }, tags: ["hydration", "liquid", "rain", "tear", "drink", "icon", "wet", "drip"] });

reg("Health", "sleep-moon", "Sleeping moon", () => A(
  sh("M10 -70 A70 70 0 1 0 66 28 A54 54 0 0 1 10 -70 Z", "cream"),
  L.text("z", 46, -28, { size: 40, c: "blue", halo: "white", haloW: 0.12 }), L.text("z", 70, -56, { size: 28, c: "blue", halo: "white", haloW: 0.12 }), L.text("z", 88, -80, { size: 20, c: "blue", halo: "white", haloW: 0.12 }),
  st("M-40 -10 Q-30 -2 -20 -10 M-34 26 Q-26 20 -18 26", { c: "ink", w: 4 }),
  gl(sm([[-52, -34], [-40, -54], [-22, -60], [-40, -42]]), 0.7)), { tags: ["sleep", "night", "bedtime", "rest", "dream", "zzz", "insomnia", "icon"] });

reg("Health", "pulse-line", "Heartbeat line", () => A(
  sh(rr(-92, -56, 184, 112, 22), "white"), st("M-76 4 H-34 L-20 -30 L-2 38 L16 -44 L32 12 L42 4 H76", { c: "red", w: 9 }),
  gl(rr(-84, -48, 60, 5, 2), 0.7)), { tags: ["ecg", "heart rate", "pulse", "monitor", "health", "cardio", "beat", "fitness"] });

reg("Health", "running-shoe", "Running shoe", (o) => { const c = col(o, "blue"); return A(
  sh(sm([[-86, -40], [-52, -48], [-30, -22], [10, -14], [50, -24], [86, 12], [90, 36], [-86, 40], [-86, -40]]), c),
  sh(sm([[-90, 34], [90, 30], [92, 52], [-88, 54], [-90, 34]]), "white"),
  st("M-24 -22 L-8 -38 M-6 -14 L10 -30 M16 -16 L32 -30", { c: "white", w: 5 }), st("M-60 -4 Q-20 8 40 -2 Q64 4 84 18", { c: "white", w: 6, op: 0.85 }),
  gl(sm([[-76, -30], [-60, -40], [-62, -22]]), 0.5)); }, { demo: { color: "blue" }, tags: ["sneaker", "trainer", "fitness", "jogging", "shoe", "sport", "run", "footwear"] });

// ============================ NATURE BITS ============================
reg("Nature", "log", "Log", () => A(
  sh(sm([[-92, -34], [60, -42], [80, 0], [60, 42], [-92, 34], [-100, 0], [-92, -34]]), "wood", { tone: 1 }),
 st("M-72 -18 Q-20 -22 30 -18 M-76 14 Q-20 18 24 14", { c: "brown", w: 3, op: 0.55 }),
  sh(ci(66, 0, 34, 42), "earth"), st(L.circ(66, 0, 22, 28), { c: "wood", w: 3 }), st(L.circ(66, 0, 10, 13), { c: "wood", w: 3 }),
  gl(rr(-80, -28, 100, 6, 3), 0.35)), { tags: ["wood", "timber", "tree", "campfire", "forest", "firewood", "trunk"] });

reg("Nature", "mushroom", "Mushroom", (o) => { const c = col(o, "red"); return A(
  sh(sm([[-24, -4], [24, -4], [30, 70], [16, 78], [-16, 78], [-30, 70], [-24, -4]]), "cream"),
  sh(sm([[-82, 0], [-70, -46], [-30, -78], [30, -78], [70, -46], [82, 0], [40, 10], [0, 12], [-40, 10], [-82, 0]]), c),
  dot(-30, -46, 11, "white", D), dot(14, -62, 9, "white", D), dot(46, -26, 10, "white", D), dot(-4, -22, 7, "white", D),
  gl(sm([[-62, -26], [-52, -50], [-34, -62], [-48, -40]]), 0.55)); }, { demo: { color: "red" }, tags: ["fungi", "toadstool", "forest", "fairytale", "autumn", "plant", "fungus"] });

variants("Nature", "leaf", "Leaf", (o) => { const c = col(o, "green"); return g(A(
  tube("M-60 70 L-30 40", "brown", 7),
  sh(sm([[-34, 44], [-62, -14], [-30, -70], [30, -88], [62, -40], [50, 18], [0, 56], [-34, 44]]), c),
  st("M-34 44 Q-6 4 40 -62 M-12 14 L-46 -10 M6 -12 L-22 -44 M14 -22 L48 -6 M-2 0 L34 22", { c: c, w: 3.5, op: 0.55 && 1 }) && st("M-34 44 Q-6 4 40 -62 M-12 14 L-46 -10 M6 -12 L-22 -44 M14 -22 L48 -6 M-2 0 L34 22", { c: "white", w: 3.5, op: 0.6 }),
  gl(sm([[-44, -14], [-30, -48], [-8, -66], [-28, -34]]), 0.45)), "translate(8 -6)"); },
  [["green", { color: "green" }, "green"], ["orange", { color: "orange" }, "autumn orange"], ["red", { color: "red" }, "autumn red"], ["yellow", { color: "yellow" }, "autumn yellow"]], { tags: ["plant", "tree", "autumn", "fall", "nature", "foliage", "spring"] });

reg("Nature", "shell", "Seashell", (o) => { const c = col(o, "pink"); return A(
  sh(sm([[0, 62], [-72, 10], [-76, -26], [-52, -58], [-18, -72], [18, -72], [52, -58], [76, -26], [72, 10], [0, 62]]), c),
  ...[-52, -30, -10, 10, 30, 52].map((x) => st(`M0 58 L${x * 1.35} ${-56 - Math.abs(x) * 0.15}`, { c: c, w: 3.5, op: 1 }) && st(`M0 58 L${f1(x * 1.3)} ${f1(-60 + Math.abs(x) * 0.12)}`, { c: "white", w: 3.5, op: 0.7 })),
  sh(rr(-22, 58, 44, 18, 6), c, { tone: 2, w: "detail" }),
  gl(sm([[-52, -22], [-44, -44], [-26, -54], [-42, -30]]), 0.5)); }, { demo: { color: "pink" }, tags: ["beach", "sea", "ocean", "scallop", "summer", "holiday", "conch", "sand"] });

reg("Nature", "feather", "Feather", (o) => { const c = col(o, "blue"); return g(A(
  sh(sm([[-30, 88], [-52, 20], [-36, -50], [16, -96], [60, -88], [54, -30], [22, 30], [-30, 88]]), c),
  st("M-30 88 Q10 0 50 -86", { c: "white", w: 4, op: 0.85 }), st("M-8 38 L-40 24 M10 8 L-26 -12 M22 -20 L-10 -44 M-4 20 L30 12 M18 -8 L46 -22", { c: "white", w: 3, op: 0.55 }),
 gl(sm([[-42, 6], [-34, -34], [-12, -66], [-30, -26]]), 0.4)), "rotate(14)"); }, { demo: { color: "blue" }, tags: ["bird", "light", "quill", "soft", "writing", "wing", "fluffy"] });

reg("Nature", "acorn", "Acorn", () => A(
  tube("M0 -60 V-82", "brown", 7),
  sh(sm([[-34, -10], [-30, 40], [0, 76], [30, 40], [34, -10], [-34, -10]]), "earth", { tone: 1 }),
  sh(sm([[-46, -12], [-40, -50], [0, -64], [40, -50], [46, -12], [0, -2], [-46, -12]]), "brown", { tone: 1 }),
  ...[-26, -8, 12, 28].map((x) => st(`M${x} -50 L${x + 10} -10`, { c: "brown", w: 2.5, op: 0.8, c2: 0 }) && st(`M${x} -50 L${x + 10} -10`, { c: "wood", w: 2.5, op: 0.6 })),
  gl(sm([[-24, 8], [-20, 36], [-8, 54], [-16, 28]]), 0.5)), { tags: ["oak", "nut", "seed", "squirrel", "autumn", "tree", "forest"] });

reg("Nature", "pinecone", "Pine cone", () => g(A(
  sh(sm([[0, -70], [30, -52], [42, -4], [32, 46], [0, 76], [-32, 46], [-42, -4], [-30, -52], [0, -70]]), "brown", { tone: 1 }),
  ...[-48, -26, -4, 18, 40, 62].flatMap((y, r) => [-24, 0, 24].map((x, i) => (Math.abs(x + (r % 2 ? 12 : 0)) > (36 - Math.abs(y - 6) * 0.35) ? "" : sh(sm([[x + (r % 2 ? 12 : 0) - 14, y - 6], [x + (r % 2 ? 12 : 0), y + 10], [x + (r % 2 ? 12 : 0) + 14, y - 6]]) + "Z", "wood", { w: "hair", tone: r % 2 ? 0 : 1 })))),
  gl(sm([[-28, -34], [-22, -52], [-10, -58], [-20, -38]]), 0.4)), "rotate(10)"), { tags: ["pine", "conifer", "winter", "christmas", "forest", "seed", "tree"] });

reg("Nature", "stump", "Tree stump", () => A(
  L.shadow(0, 0, 150),
  sh(sm([[-62, 0], [-48, -10], [-44, -64], [44, -64], [48, -10], [62, 0], [30, 4], [-30, 4], [-62, 0]]), "wood", { tone: 1 }),
  sh(L.circ(0, -64, 44, 14), "earth"), st(L.circ(0, -64, 28, 8), { c: "wood", w: 3 }), st(L.circ(0, -64, 12, 4), { c: "wood", w: 3 }),
  st("M-32 -50 L-34 -8 M-12 -46 V0 M12 -46 V-2 M32 -50 L34 -10", { c: "brown", w: 3, op: 0.4 }),
  gl(rr(-40, -56, 6, 40, 3), 0.3)), { stand: true, box: [-100, -110, 200, 130], tags: ["tree", "wood", "forest", "cut", "log", "timber", "logging"] });

reg("Nature", "clover", "Four-leaf clover", () => A(
  tube("M0 8 Q6 50 -4 84", "green", 6),
  ...[0, 90, 180, 270].map((a) => g(sh(sm([[0, 0], [-26, -22], [-24, -52], [0, -40], [24, -52], [26, -22], [0, 0]]) + "Z", "green", D), `translate(0 -2) rotate(${a})`)),
 dot(0, -2, 5, "green", { w: "hair", tone: 2 })), { tags: ["luck", "lucky", "irish", "plant", "spring", "green", "shamrock"] });

reg("Nature", "pebbles", "Pebbles", () => A(
  L.shadow(0, 40, 170),
  sh(sm([[-88, 40], [-90, 8], [-62, -10], [-30, -6], [-18, 20], [-22, 40]]) + "Z", "stone", { tone: 1 }),
  sh(sm([[20, 40], [14, 6], [38, -16], [70, -10], [86, 14], [82, 40]]) + "Z", "stone"),
  sh(sm([[-30, 40], [-34, 10], [-10, -22], [24, -30], [48, -8], [46, 20], [34, 40]]) + "Z", "stone", { tone: 2 }),
  gl(sm([[-12, -4], [-4, -18], [12, -22], [0, -8]]), 0.5), gl(sm([[-76, 8], [-66, -2], [-52, -2], [-66, 12]]), 0.5)), { box: [-110, -80, 220, 140], tags: ["rock", "stone", "river", "garden", "small stones", "gravel", "beach"] });

// ---- final scale tweaks so nothing touches the tile edge (wraps the registered fn) ----
const wrap = (name, tr) => { const it = L.get("p2-" + name), f = it.fn; it.fn = (o) => g(f(o), tr); };
wrap("drone", "scale(0.88)"); wrap("tape-measure", "translate(-8 0)"); wrap("snowman", "scale(0.86)"); wrap("beach-umbrella", "scale(0.88)");
wrap("bird-house", "scale(0.92)"); wrap("violin", "scale(0.85)"); wrap("running-shoe", "scale(0.9)");
wrap("pliers", "scale(0.9)"); wrap("tape-measure", "scale(0.94)");
})();
