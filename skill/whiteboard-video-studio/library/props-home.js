// ===================== library/props-home.js — food, drinks, kitchen, tech, home and tools, toys and music =====================
// Floating icon-style props, origin = centre, ~170 px across. Every prop: L.put(S, "prop-<name>", x, y, { s, t }).
(function () {
const L = window.L, f1 = L.f1;
const sh = L.shape, st = L.stroke, fl = L.flat, rr = L.rrect, ci = L.circ, po = L.poly, sm = L.smooth, g = L.g;
const A = (...a) => a.join(""), D = { w: "detail" };
const gl = (d, op = 0.5) => fl(d, "white", op);            // glint
const dk = (d, op = 0.16) => fl(d, "ink", op);             // soft shade
const eo = (s) => s.replace("<path ", '<path fill-rule="evenodd" '); // even-odd fill: lets a ring have a real hole
const ring = (cx, cy, R, r, c, o) => eo(sh(ci(cx, cy, R) + ci(cx, cy, r), c, o));
// a thick line with the look's outline around it (cords, handles, noodles, sticks)
const tube = (d, c, w = 8) => {
  const oc = L.outline(c), base = { d, fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round" };
  return (oc === "none" ? "" : L.tag("path", Object.assign({ stroke: oc, "stroke-width": w + 2 * L.lw("detail") }, base))) + L.tag("path", Object.assign({ stroke: L.c(c), "stroke-width": w }, base));
};
const steam = (x, y) => st(sm([[x, y], [x - 8, y - 14], [x + 8, y - 28], [x, y - 42]]), { c: "gray", w: 5, op: 0.55 });
const reg = (group, name, label, fn, meta = {}) => {
  const { tags = [], ...rest } = meta;
  L.reg("props", "prop-" + name, fn, Object.assign({ group, label, tags: [label.toLowerCase(), group.toLowerCase(), ...tags], box: [-110, -110, 220, 220] }, rest));
};

// ============================ FOOD ============================
reg("Food", "apple", "Apple", () => A(
  st("M0 -50 Q4 -68 14 -80", { c: "brown", w: "prop" }),
  sh(sm([[0, -50], [30, -62], [62, -30], [58, 20], [30, 64], [0, 56], [-30, 64], [-58, 20], [-62, -30], [-30, -62], [0, -50]]), "red"),
  sh(sm([[6, -64], [30, -88], [58, -72], [34, -56], [6, -64]]), "green", D),
  gl(sm([[-46, -28], [-38, -46], [-22, -50], [-30, -34], [-40, -12], [-46, -28]]))), { tags: ["fruit", "red"] });

reg("Food", "banana", "Banana", () => A(
  sh(sm([[-72, -54], [-66, -10], [-34, 34], [18, 52], [62, 36], [84, -4], [72, -14], [52, 10], [20, 24], [-14, 10], [-42, -24], [-54, -56], [-72, -54]]), "yellow"),
  sh(po([[-72, -54], [-54, -56], [-52, -72], [-68, -74]], true), "brown", D),
  sh(po([[84, -4], [72, -14], [70, -22], [86, -16]], true), "brown", D),
  st(sm([[-60, -22], [-42, 16], [0, 38]]), { c: "white", w: 4, op: 0.6 })), { tags: ["fruit", "yellow"] });

reg("Food", "bread", "Loaf of bread", () => A(
  sh(sm([[-72, 22], [-76, -8], [-52, -42], [0, -52], [52, -42], [76, -8], [72, 22], [62, 44], [-62, 44], [-72, 22]]), "earth", { tone: 2 }),
  ...[-32, 0, 32].map((x) => st(sm([[x - 12, -26], [x, -34], [x + 12, -42]]), { c: "cream", w: "prop" })),
  gl(sm([[-60, -8], [-48, -30], [-28, -42], [-44, -20], [-60, -8]]), 0.4)), { tags: ["bakery"] });

reg("Food", "egg", "Egg", () => A(
  sh(ci(0, 6, 46, 60), "cream"),
  gl(sm([[-30, -10], [-26, -34], [-12, -48], [-20, -26], [-26, 0], [-30, -10]]), 0.7)), { tags: ["breakfast"] });

reg("Food", "fried-egg", "Fried egg", () => A(
  sh(sm([[-70, 0], [-58, -38], [-22, -52], [10, -44], [48, -56], [74, -22], [70, 20], [48, 52], [4, 56], [-30, 46], [-62, 40], [-70, 0]]), "white"),
  sh(ci(-4, 2, 27), "yellow", { w: "prop" }),
  gl(sm([[-18, -12], [-8, -20], [2, -14], [-8, -8], [-18, -12]]), 0.8)), { tags: ["breakfast"] });

reg("Food", "chicken-leg", "Chicken leg", () => g(A(
  sh(rr(-6, 34, 12, 44, 5), "white"), sh(ci(-9, 82, 10), "white", D), sh(ci(9, 82, 10), "white", D),
  sh(sm([[0, -72], [40, -58], [50, -14], [24, 20], [9, 42], [-9, 42], [-24, 20], [-50, -14], [-40, -58], [0, -72]]), "orange", { tone: 2 }),
  st(sm([[-30, -40], [-8, -52], [14, -48]]), { c: "gold", w: 5, op: 0.8 }),
  gl(sm([[-38, -20], [-34, -42], [-18, -54], [-26, -30], [-38, -20]]), 0.45)), "translate(0 -4) rotate(32)"), { tags: ["meat", "drumstick"] });

reg("Food", "steak", "Steak", () => A(
  sh(sm([[-74, -6], [-58, -46], [-12, -58], [42, -48], [74, -14], [68, 28], [30, 54], [-22, 56], [-62, 38], [-74, -6]]), "red", { tone: 2 }),
  sh(sm([[-62, -4], [-48, -36], [-10, -46], [36, -38], [60, -10], [56, 20], [26, 42], [-20, 44], [-52, 30], [-62, -4]]), "red", D),
  sh(po([[-6, -42], [6, -42], [6, -8], [36, -8], [36, 8], [-36, 8], [-36, -8], [-6, -8]], true), "white", D),
  st("M-40 22 Q-24 14 -8 24 M14 -30 Q30 -26 42 -18", { c: "pink", w: 5 }),
  gl(sm([[-56, -22], [-44, -42], [-20, -50], [-38, -32], [-56, -22]]), 0.4)), { tags: ["meat", "beef", "t-bone"] });

reg("Food", "fish", "Fish", () => A(
  sh(po([[44, 0], [88, -34], [78, 0], [88, 34]], true), "orange", { tone: 2 }),
  sh(sm([[-72, 0], [-42, -32], [8, -40], [50, -16], [58, 0], [50, 16], [8, 40], [-42, 32], [-72, 0]]), "orange"),
  sh(sm([[-10, -38], [8, -62], [28, -30]]) + "Z", "orange", { tone: 2, w: "detail" }),
  st(sm([[10, -26], [20, 0], [10, 26]]), { c: "orange", w: "detail" }), st(sm([[26, -20], [34, 0], [26, 20]]), { c: "orange", w: "detail" }),
  sh(ci(-44, -8, 8), "white", D), fl(ci(-42, -8, 3.5), "ink"),
  st(sm([[-68, 4], [-60, 10], [-52, 8]]), { w: "detail" }),
  gl(sm([[-40, -22], [-10, -32], [-30, -16], [-40, -22]]), 0.5)), { tags: ["seafood"] });

reg("Food", "pizza", "Pizza slice", () => A(
  sh(sm([[-60, -44], [60, -44], [8, 72], [-8, 72], [-60, -44]]), "yellow"),
  sh(sm([[-22, 38], [-6, 54], [-4, 70], [-14, 62], [-24, 44]]), "yellow", { tone: 2, w: "detail" }),
  sh(ci(-22, -14, 13), "red", D), sh(ci(22, -16, 13), "red", D), sh(ci(2, 24, 11), "red", D),
  fl(ci(-4, -2, 4), "green"), fl(ci(36, 6, 4), "green"), fl(ci(-34, 14, 4), "green"), fl(ci(14, -36, 4), "green"),
  sh(rr(-70, -64, 140, 28, 14), "earth", { tone: 2 }),
  gl(rr(-58, -58, 60, 6, 3), 0.4)), { tags: ["fast food", "italian"] });

reg("Food", "burger", "Burger", () => A(
  sh(rr(-66, 40, 132, 30, 14), "gold"),
  sh(rr(-72, 16, 144, 28, 13), "brown"),
  sh(po([[-70, 8], [70, 8], [70, 20], [26, 20], [0, 40], [-26, 20], [-70, 20]], true), "yellow", D),
  sh(rr(-62, -4, 124, 14, 7), "red", D),
  sh(sm([[-76, -8], [-60, -20], [-40, -8], [-20, -20], [0, -8], [20, -20], [40, -8], [60, -20], [76, -8], [68, 4], [-68, 4], [-76, -8]]), "green", D),
  sh(sm([[-74, -12], [-72, -42], [-46, -68], [0, -76], [46, -68], [72, -42], [74, -12], [-74, -12]]), "gold"),
  ...[[-30, -52, 20], [-6, -62, -10], [22, -54, 30], [-44, -34, -30], [4, -38, 0], [40, -32, 20]].map(([x, y, r]) => fl(ci(x, y, 5, 2.5), "cream").replace("<path", `<path transform="rotate(${r} ${x} ${y})"`)),
  gl(sm([[-60, -34], [-46, -56], [-20, -66], [-40, -44], [-60, -34]]), 0.4)), { tags: ["fast food"] });

reg("Food", "fries", "French fries", () => A(
  ...[[-44, -44, 20, -8], [-24, -64, 18, 4], [-4, -52, 20, -3], [16, -70, 18, 6], [34, -46, 20, 10], [-60, -26, 16, -14]].map(([x, y, w, r]) => g(sh(rr(x, y, w * 0.8, 72, 4), "yellow", D), `rotate(${r} ${x} ${y + 36})`)),
  sh(po([[-58, -10], [58, -10], [46, 74], [-46, 74]], true), "red"),
  fl(po([[-52, 14], [52, 14], [49, 30], [-49, 30]], true), "yellow"),
  gl(po([[-50, -4], [-38, -4], [-30, 66], [-38, 66]], true), 0.35)), { tags: ["fast food", "chips"] });

reg("Food", "donut", "Donut", () => {
  const bump = []; for (let i = 0; i <= 24; i++) { const a = (i / 24) * Math.PI * 2, r = 50 + (i % 2 ? 6 : -2); bump.push([Math.cos(a) * r, Math.sin(a) * r * 0.96]); }
  return A(
    ring(0, 2, 66, 21, "earth", { tone: 0 }),
    eo(sh(sm(bump) + ci(0, 0, 21), "pink")),
    ...[[-30, -30, 30], [24, -36, -40], [38, 12, 70], [-6, 38, 10], [-40, 14, -60], [10, -22, 0]].map(([x, y, r], i) => tube(`M${x} ${y} l${6 * Math.cos((r * Math.PI) / 180)} ${6 * Math.sin((r * Math.PI) / 180)}`, ["yellow", "teal", "white", "blue", "yellow", "white"][i], 5)),
    gl(sm([[-44, -18], [-34, -38], [-14, -46], [-30, -32], [-44, -18]]), 0.5));
}, { tags: ["sweet", "dessert"] });

reg("Food", "cake", "Cake", () => A(
  sh(rr(-72, 14, 144, 56, 10), "brown", { tone: 1 }),
  sh(rr(-68, -22, 136, 40, 10), "cream"),
  sh(sm([[-76, -24], [-70, -34], [70, -34], [76, -24], [76, -18], [62, -18], [58, -2], [46, -2], [42, -18], [18, -18], [14, 2], [2, 2], [-2, -18], [-30, -18], [-34, -6], [-46, -6], [-50, -18], [-76, -18], [-76, -24]]), "pink"),
  sh(rr(-6, -66, 12, 32, 4), "blue", D), fl(sm([[0, -84], [8, -72], [0, -66], [-8, -72], [0, -84]]), "orange"), fl(ci(0, -72, 3), "yellow"),
  sh(ci(-40, -38, 9), "red", D), sh(ci(40, -38, 9), "red", D),
  gl(rr(-62, 22, 30, 6, 3), 0.3)), { tags: ["dessert", "birthday"] });

reg("Food", "cookie", "Cookie", () => {
  const e = []; for (let i = 0; i <= 18; i++) { const a = (i / 18) * Math.PI * 2, r = 66 + (i % 2 ? 2 : -3); e.push([Math.cos(a) * r, Math.sin(a) * r]); }
  return A(sh(sm(e), "earth", { tone: 0 }),
    ...[[-28, -28, 9], [22, -34, 8], [-8, -4, 10], [36, 8, 9], [-36, 22, 8], [8, 36, 9], [-52, -2, 7], [50, -22, 6]].map(([x, y, r]) => sh(sm([[x - r, y], [x - r * 0.4, y - r * 0.9], [x + r * 0.8, y - r * 0.5], [x + r, y + r * 0.3], [x, y + r], [x - r, y]]), "brown", D)),
    gl(sm([[-52, -30], [-36, -52], [-14, -60], [-34, -40], [-52, -30]]), 0.4));
}, { tags: ["sweet", "biscuit"] });

reg("Food", "ice-cream", "Ice cream", () => A(
  sh(po([[-34, -4], [34, -4], [0, 84]], true), "earth", { tone: 2 }),
  st("M-26 10 L12 62 M-6 4 L24 50 M-20 40 L18 18 M-8 62 L22 30 M-12 22 L-2 8", { c: "earth", w: "detail" }),
  sh(sm([[-46, -2], [-52, -22], [-34, -40], [0, -42], [34, -40], [52, -22], [46, -2], [30, 6], [14, -2], [0, 8], [-14, -2], [-30, 6], [-46, -2]]), "cream"),
  sh(sm([[-36, -34], [-40, -56], [-22, -74], [0, -78], [22, -74], [40, -56], [36, -34], [0, -28], [-36, -34]]), "pink"),
  sh(ci(0, -84, 8), "red", D), st("M0 -90 q4 -10 12 -12", { c: "brown", w: "detail" }),
  gl(sm([[-28, -52], [-24, -66], [-10, -72], [-18, -58], [-28, -52]]), 0.5)), { tags: ["dessert", "sweet", "cone"] });

reg("Food", "sandwich", "Sandwich", () => A(
  sh(rr(-68, 34, 136, 26, 12), "earth", { tone: 2 }),
  sh(po([[-72, 16], [72, 16], [72, 36], [-72, 36]], true), "pink", D),
  sh(sm([[-76, 4], [-60, -8], [-40, 4], [-20, -8], [0, 4], [20, -8], [40, 4], [60, -8], [76, 4], [72, 18], [-72, 18], [-76, 4]]), "green", D),
  sh(rr(-66, -10, 132, 12, 6), "red", D),
  sh(po([[-68, -12], [68, -12], [68, -2], [24, -2], [0, 14], [-24, -2], [-68, -2]], true), "yellow", D),
  sh(rr(-68, -50, 136, 40, 16), "earth", { tone: 1 }),
  tube("M30 -86 L30 -2", "wood", 4), sh(ci(30, -88, 8), "green", D), fl(ci(30, -88, 3), "red"),
  gl(rr(-58, -44, 70, 6, 3), 0.4)), { tags: ["lunch"] });

reg("Food", "rice-bowl", "Rice bowl", () => A(
  sh(sm([[-62, -26], [-30, -76], [0, -84], [30, -76], [62, -26], [-62, -26]]), "white"),
  ...[[-30, -48], [-8, -62], [14, -44], [30, -60], [-14, -34], [8, -26], [-38, -32], [40, -36]].map(([x, y], i) => fl(ci(x, y, 5, 2.6), "paper").replace("<path", `<path transform="rotate(${i * 40} ${x} ${y})"`)),
  sh(sm([[-72, -26], [-66, 6], [-40, 40], [0, 52], [40, 40], [66, 6], [72, -26], [-72, -26]]), "blue"),
  fl(sm([[-62, -14], [-58, 4], [-34, 30], [-50, 12]]), "white", 0.25),
  st("M-66 -10 Q0 4 66 -10", { c: "white", w: "detail" }),
  tube("M18 -96 L-6 -30", "wood", 5), tube("M32 -92 L12 -28", "wood", 5)), { tags: ["asian", "meal"] });

reg("Food", "noodles", "Noodles", () => A(
  steam(-20, -56), steam(18, -62),
  sh(sm([[-72, -20], [-66, 10], [-40, 42], [0, 54], [40, 42], [66, 10], [72, -20], [-72, -20]]), "red"),
  tube("M-62 -20 Q-50 -52 -34 -24 Q-18 -56 0 -24 Q18 -56 34 -24 Q50 -52 62 -20", "yellow", 8),
  tube("M-52 -16 Q-36 -40 -20 -14 Q-2 -42 16 -14 Q32 -40 50 -14", "yellow", 8),
  sh(rr(-72, -24, 144, 12, 6), "red", { tone: 2, w: "detail" }),
  fl(sm([[-62, -2], [-58, 14], [-34, 36], [-48, 18]]), "white", 0.25),
  tube("M26 -84 L2 -26", "wood", 5), tube("M42 -78 L18 -22", "wood", 5)), { tags: ["ramen", "asian", "pasta"] });

reg("Food", "carrot", "Carrot", () => g(A(
  sh(sm([[-8, -64], [-4, -80], [-22, -92]]) + "Z", "green", D), sh(sm([[0, -62], [2, -86], [0, -98]]) + "Z", "green", D), sh(sm([[8, -64], [4, -80], [24, -92]]) + "Z", "green", D),
  sh(sm([[-26, -56], [0, -66], [26, -56], [22, -20], [10, 36], [0, 82], [-10, 36], [-22, -20], [-26, -56]]), "orange"),
  st("M-24 -34 L-8 -32 M20 -12 L6 -10 M-16 14 L-4 16 M10 40 L2 42", { c: "orange", w: "detail" }),
  gl(sm([[-18, -50], [-14, -24], [-8, 8], [-14, -20], [-18, -50]]), 0.5)), "rotate(25) translate(0 6)"), { tags: ["vegetable"] });

reg("Food", "broccoli", "Broccoli", () => A(
  sh(sm([[-16, -24], [16, -24], [22, 70], [-22, 70], [-16, -24]]), "grass"),
  sh(sm([[-64, -4], [-70, -30], [-50, -52], [-24, -46], [-6, -26], [-18, -6], [-64, -4]]), "green", { tone: 0 }),
  sh(sm([[64, -4], [70, -30], [50, -52], [24, -46], [6, -26], [18, -6], [64, -4]]), "green"),
  sh(sm([[-40, -34], [-42, -66], [-18, -86], [18, -86], [42, -66], [40, -34], [20, -12], [-20, -12], [-40, -34]]), "green", { tone: 0 }),
  ...[[-18, -58], [10, -66], [22, -40], [-8, -34], [-34, -40]].map(([x, y]) => dk(ci(x, y, 6), 0.14)),
  gl(sm([[-30, -52], [-24, -72], [-8, -80], [-18, -62], [-30, -52]]), 0.35)), { tags: ["vegetable", "green"] });

reg("Food", "cheese", "Cheese", () => A(
  sh(po([[-70, -42], [70, 4], [38, -16], [-42, -58]], true), "yellow", { tone: 1 }),
  sh(po([[-70, -42], [70, 4], [70, 46], [-70, 46]], true), "yellow"),
  sh(ci(-38, 10, 11), "yellow", { tone: 2, w: "detail" }), sh(ci(10, 24, 9), "yellow", { tone: 2, w: "detail" }), sh(ci(44, 22, 7), "yellow", { tone: 2, w: "detail" }), sh(ci(-6, -2, 6), "yellow", { tone: 2, w: "detail" }),
  gl(po([[-62, -30], [-20, -14], [-20, -8], [-62, -22]], true), 0.35)), { tags: ["dairy"] });

reg("Food", "chocolate", "Chocolate bar", () => A(
  sh(rr(-46, -76, 92, 100, 8), "brown", { tone: 1 }),
  ...[0, 1, 2].flatMap((r) => [0, 1].map((c) => sh(rr(-40 + c * 42, -70 + r * 32, 38, 28, 5), "brown", { tone: 2, w: "detail" }))),
  sh(po([[-50, 0], [50, 0], [50, 76], [-50, 76]], true), "red"), fl(rr(-50, 30, 100, 14, 0), "gold"),
  st("M-50 0 L-30 -8 L-10 0 L10 -8 L30 0 L50 -8", { c: "gray", w: "detail" }),
  gl(po([[-42, 10], [-34, 10], [-34, 70], [-42, 70]], true), 0.3)), { tags: ["sweet", "candy"] });

reg("Food", "popcorn", "Popcorn", () => A(
  ...[[-44, -34, 24], [-14, -50, 26], [18, -48, 25], [46, -30, 23], [-30, -12, 24], [2, -22, 26], [32, -8, 24]].map(([x, y, r]) => sh(ci(x, y, r), "cream", D) + fl(ci(x + r * 0.2, y - r * 0.1, r * 0.3), "yellow")),
  sh(po([[-58, -4], [58, -4], [46, 76], [-46, 76]], true), "white"),
  ...[-1, 0, 1].map((k) => fl(po([[k * 40 - 10, -4], [k * 40 + 10, -4], [k * 32 + 8, 76], [k * 32 - 8, 76]], true), "red")),
  st("M-58 -4 L-46 76 M58 -4 L46 76", { w: "prop" }), st("M-58 -4 L58 -4", { w: "prop" }),
  gl(po([[-50, 6], [-42, 6], [-36, 68], [-42, 68]], true), 0.4)), { tags: ["snack", "cinema"] });

reg("Food", "candy", "Wrapped candy", () => A(
  sh(po([[-30, 0], [-84, -34], [-76, 0], [-84, 34]], true), "teal"), sh(po([[30, 0], [84, -34], [76, 0], [84, 34]], true), "teal"),
  sh(ci(0, 0, 40), "pink"), st("M-24 -26 Q0 -6 -22 24 M-4 -38 Q22 -8 2 38 M20 -32 Q34 0 18 32", { c: "white", w: "prop" }),
  gl(sm([[-30, -18], [-22, -32], [-8, -36], [-18, -22], [-30, -18]]), 0.7)), { tags: ["sweet"] });

reg("Food", "protein-tub", "Protein tub", () => A(
  sh(rr(-52, -76, 104, 24, 8), "gray", { tone: 2 }),
  sh(rr(-56, -56, 112, 130, 16), "blue"),
  sh(rr(-56, -30, 112, 70, 4), "cream", D),
  L.text("PROTEIN", 0, -2, { size: 19, weight: 700 }),
  // dumbbell icon (generic)
  sh(rr(-26, 16, 52, 8, 3), "gray", D), sh(rr(-32, 8, 10, 24, 4), "ink", D), sh(rr(22, 8, 10, 24, 4), "ink", D),
  gl(rr(-48, -50, 10, 118, 5), 0.3)), { tags: ["gym", "supplement", "whey"] });

// ============================ DRINKS ============================
reg("Drinks", "water-bottle", "Water bottle", () => A(
  sh(rr(-14, -86, 28, 18, 5), "blue"),
  sh(sm([[-16, -68], [16, -68], [18, -52], [42, -32], [44, 66], [34, 82], [-34, 82], [-44, 66], [-42, -32], [-18, -52], [-16, -68]]), "glass"),
  fl(po([[-42, -8], [42, -8], [44, 66], [34, 82], [-34, 82], [-44, 66]], true), "water", 0.7),
  sh(rr(-43, 14, 86, 30, 2), "white", D), st("M-43 29 Q-20 22 0 29 T43 29", { c: "blue", w: "detail" }),
  gl(rr(-34, -28, 8, 80, 4), 0.7)), { tags: ["drink", "hydration"] });

reg("Drinks", "water-glass", "Glass of water", () => A(
  sh(po([[-46, -64], [46, -64], [36, 72], [-36, 72]], true), "glass"),
  fl(po([[-43, -24], [43, -24], [36, 72], [-36, 72]], true), "water", 0.75),
  st("M-43 -24 Q-20 -30 0 -24 T43 -24", { c: "sky", w: "detail" }),
  fl(ci(-10, 10, 5), "white", 0.7), fl(ci(14, 30, 4), "white", 0.7), fl(ci(2, 46, 3), "white", 0.7),
  gl(po([[-36, -56], [-28, -56], [-24, 60], [-30, 60]], true), 0.7)), { tags: ["drink"] });

reg("Drinks", "coffee-mug", "Mug of coffee", () => A(
  steam(-18, -42), steam(14, -46),
  tube("M44 -4 C84 -10 84 40 42 38", "red", 12),
  sh(rr(-52, -30, 98, 96, 14), "red"),
  sh(ci(-3, -30, 49, 12), "cream", D), fl(ci(-3, -29, 41, 8), "brown"),
  gl(rr(-44, -14, 8, 66, 4), 0.4),
  sh(ci(-3, 18, 22), "white", D), fl(sm([[-12, 14], [-3, 6], [6, 14], [-3, 30], [-12, 14]]), "red")), { tags: ["drink", "hot", "cafe"] });

reg("Drinks", "tea-cup", "Tea cup", () => A(
  steam(-8, -34),
  sh(ci(0, 52, 78, 14), "white", D),
  tube("M44 -8 C80 -8 78 30 38 28", "white", 10),
  sh("M-50 -20 L50 -20 Q50 36 0 50 Q-50 36 -50 -20 Z", "white"),
  sh(ci(0, -20, 50, 11), "cream", D), fl(ci(0, -19, 42, 7), "orange", 0.8),
  st("M-46 4 Q0 18 46 4", { c: "pink", w: "prop" }),
  tube("M-10 -18 Q-30 -30 -34 -60", "gray", 2), sh(rr(-44, -76, 22, 14, 3), "yellow", D),
  gl(rr(-40, -8, 5, 30, 2), 0.5)), { tags: ["drink", "hot"] });

reg("Drinks", "milk-carton", "Milk carton", () => A(
  sh(rr(-24, -78, 48, 14, 3), "blue", D),
  sh(po([[-38, -22], [-26, -64], [26, -64], [38, -22]], true), "blue"),
  sh(rr(-38, -24, 76, 100, 4), "white"),
  sh(sm([[0, -14], [14, 10], [14, 22], [0, 34], [-14, 22], [-14, 10], [0, -14]]), "blue", D),
  sh(rr(-38, 46, 76, 14, 0), "blue", D),
  gl(rr(-32, -16, 6, 84, 3), 0.7)), { tags: ["drink", "dairy"] });

reg("Drinks", "juice-box", "Juice box", () => A(
  tube("M22 -48 L22 -84 Q22 -92 32 -92 L44 -92", "red", 5),
  sh(po([[-40, -48], [40, -48], [34, -40], [-34, -40]], true), "gray", D),
  sh(rr(-40, -44, 80, 112, 8), "orange"),
  sh(ci(0, 4, 26), "yellow", D), st("M-18 4 H18 M0 -14 V22 M-13 -9 L13 17 M13 -9 L-13 17", { c: "orange", w: "detail" }),
  sh(rr(-40, 46, 80, 10, 0), "orange", { tone: 2, w: "detail" }),
  gl(rr(-33, -36, 6, 96, 3), 0.4)), { tags: ["drink", "kids"] });

reg("Drinks", "energy-can", "Energy drink can", () => A(
  sh(rr(-27, -76, 54, 152, 9), "teal"),
  fl(po([[-27, -2], [27, -22], [27, 8], [-27, 28]], true), "yellow"),
  st("M-27 28 L27 8 M-27 -2 L27 -22", { c: "ink", w: "detail" }),
  sh(rr(-27, -78, 54, 14, 6), "gray", D), sh(rr(-27, 62, 54, 14, 6), "gray", D),
  sh(ci(4, -74, 8, 3), "gray", { tone: 2, w: "detail" }),
  gl(rr(-20, -56, 6, 110, 3), 0.45)), { tags: ["drink", "can", "generic"] });

reg("Drinks", "soda-can", "Soda can", () => A(
  sh(rr(-33, -72, 66, 144, 10), "red"),
  fl(sm([[-33, -10], [-16, -24], [0, -8], [16, -24], [33, -10], [33, 14], [16, 0], [0, 16], [-16, 0], [-33, 14], [-33, -10]]), "white"),
  sh(rr(-33, -74, 66, 14, 6), "gray", D), sh(rr(-33, 60, 66, 14, 6), "gray", D),
  sh(ci(5, -70, 10, 3.5), "gray", { tone: 2, w: "detail" }),
  gl(rr(-26, -52, 7, 104, 3), 0.45)), { tags: ["drink", "can", "fizzy"] });

reg("Drinks", "milkshake", "Milkshake", () => A(
  tube("M14 -70 L30 -104", "red", 7),
  sh(sm([[-34, -76], [-24, -96], [0, -104], [24, -96], [34, -76], [-34, -76]]), "white"),
  sh(sm([[-30, -56], [-24, -78], [0, -84], [24, -78], [30, -56], [-30, -56]]), "white", D),
  sh(ci(-4, -88, 9), "red", D),
  sh(po([[-48, -58], [48, -58], [36, 70], [-36, 70]], true), "glass"),
  fl(po([[-46, -46], [46, -46], [36, 70], [-36, 70]], true), "pink", 0.95),
  st("M-47 -46 Q-24 -34 0 -46 T47 -46", { c: "white", w: "detail" }),
  gl(po([[-38, -40], [-30, -40], [-26, 58], [-32, 58]], true), 0.5)), { tags: ["drink", "dessert"] });

// ============================ KITCHEN ============================
reg("Kitchen", "pan", "Frying pan", () => g(A(
  sh(rr(40, -9, 68, 18, 9), "wood"), fl(ci(96, 0, 3.5), "paper"),
  sh(ci(-6, 0, 62, 54), "gray", { tone: 2 }),
  sh(ci(-6, -2, 50, 43), "ink", { tone: 0, w: "detail", flat: true }),
  fl(ci(-6, -2, 50, 43), "navy", 0.6),
  gl(sm([[-44, -14], [-30, -30], [-8, -36]]).replace("Z", ""), 0.0), st(sm([[-42, -12], [-30, -28], [-10, -34]]), { c: "white", w: 4, op: 0.5 })), "translate(-14 0) rotate(-24)"), { tags: ["cooking"] });

reg("Kitchen", "pot", "Cooking pot", () => A(
  steam(-12, -62), steam(18, -68),
  sh(rr(-84, -4, 24, 14, 6), "ink", { w: "detail" }), sh(rr(60, -4, 24, 14, 6), "ink", { w: "detail" }),
  sh(rr(-58, -2, 116, 72, 10), "gray"),
  sh(rr(-64, -14, 128, 16, 8), "gray", { tone: 1 }),
  sh(sm([[-58, -14], [-50, -40], [-20, -52], [20, -52], [50, -40], [58, -14], [-58, -14]]), "gray", { tone: 1 }),
  sh(ci(0, -58, 9), "ink", { w: "detail" }),
  gl(rr(-50, 6, 8, 54, 4), 0.55)), { tags: ["cooking"] });

reg("Kitchen", "knife", "Kitchen knife", () => g(A(
  sh(sm([[-30, -12], [44, -14], [82, 0], [62, 11], [-30, 10], [-30, -12]]), "gray", { tone: 1 }),
  st("M-24 6 L58 6", { c: "white", w: "detail", op: 0.8 }),
  sh(rr(-92, -12, 64, 24, 11), "wood"), sh(rr(-34, -14, 8, 28, 2), "gray", { tone: 2, w: "detail" }),
  fl(ci(-80, 0, 3), "paper"), fl(ci(-58, 0, 3), "paper")), "rotate(-30)"), { tags: ["cutlery", "tool"] });

reg("Kitchen", "spoon", "Spoon", () => g(A(
  sh(sm([[-6, -14], [6, -14], [10, 70], [0, 84], [-10, 70], [-6, -14]]), "gray", { tone: 1 }),
  sh(ci(0, -50, 25, 35), "gray", { tone: 1 }),
  gl(sm([[-14, -62], [-8, -78], [4, -76], [-8, -58], [-14, -62]]), 0.6)), "rotate(28)"), { tags: ["cutlery"] });

reg("Kitchen", "fork", "Fork", () => g(A(
  ...[-18, -6, 6, 18].map((x) => sh(rr(x - 3.5, -86, 7, 52, 3.5), "gray", { tone: 1, w: "detail" })),
  sh(sm([[-6, -26], [6, -26], [10, 70], [0, 84], [-10, 70], [-6, -26]]), "gray", { tone: 1 }),
  sh(sm([[-24, -52], [24, -52], [22, -22], [8, -12], [-8, -12], [-22, -22], [-24, -52]]), "gray", { tone: 1 }),
  gl(sm([[-14, -44], [-12, -28], [-8, -18]]), 0.0), st("M-14 -44 L-12 -24", { c: "white", w: 3, op: 0.6 })), "rotate(-24)"), { tags: ["cutlery"] });

reg("Kitchen", "plate", "Plate", () => A(
  sh(ci(0, 4, 82, 30), "white"),
  fl(ci(0, 2, 56, 18), "paper"), st(L.arc(0, 2, 56, 10, 170, 18), { c: "gray", w: "detail", op: 0.5 }),
  st(L.arc(0, 4, 74, 190, 340, 26), { c: "blue", w: "detail" }),
  gl(sm([[-70, 0], [-56, -14], [-30, -22]]).replace("Z", ""), 0.0), st("M-70 2 Q-56 -14 -30 -20", { c: "white", w: 4, op: 0.8 })), { tags: ["dish", "tableware"] });

reg("Kitchen", "bowl", "Bowl", () => A(
  sh(sm([[-74, -18], [-68, 12], [-42, 44], [0, 54], [42, 44], [68, 12], [74, -18], [-74, -18]]), "teal"),
  sh(ci(0, -18, 74, 17), "cream", D), fl(ci(0, -16, 64, 12), "teal", 0.35),
  gl(sm([[-62, 0], [-56, 16], [-38, 36]]), 0.0), st("M-62 2 Q-56 22 -36 38", { c: "white", w: 4, op: 0.5 })), { tags: ["dish", "tableware"] });

reg("Kitchen", "kettle", "Kettle", () => A(
  tube("M-34 -40 Q0 -104 38 -34", "ink", 7),
  sh(sm([[50, 24], [60, -10], [86, -42], [98, -36], [76, 4], [66, 40]]) + "Z", "teal", { tone: 1 }),
  sh(sm([[-52, 54], [-60, 12], [-44, -26], [0, -40], [44, -26], [60, 12], [52, 54], [-52, 54]]), "teal"),
  sh(rr(-58, 44, 116, 16, 8), "teal", { tone: 2 }),
  sh(ci(0, -46, 9), "ink", { w: "detail" }),
  gl(sm([[-44, -10], [-34, -28], [-14, -32], [-30, -14], [-44, -10]]), 0.5), gl(rr(-44, 6, 8, 34, 4), 0.35)), { tags: ["hot", "tea", "appliance"] });

reg("Kitchen", "toaster", "Toaster", () => A(
  sh(rr(-44, -62, 38, 56, 8), "earth", { tone: 1 }), sh(rr(6, -54, 38, 48, 8), "earth", { tone: 1 }),
  sh(rr(-70, -22, 140, 74, 22), "red"),
  sh(rr(-62, -30, 124, 14, 7), "gray", { tone: 1, w: "detail" }),
  sh(rr(-52, 6, 30, 10, 5), "ink", { w: "detail" }), sh(ci(30, 18, 11), "gray", D), st("M30 18 L36 12", { w: "detail" }),
  sh(rr(72, 8, 10, 30, 4), "ink", { w: "detail" }),
  gl(rr(-56, -8, 80, 6, 3), 0.4)), { tags: ["appliance", "breakfast"] });

reg("Kitchen", "microwave", "Microwave", () => A(
  sh(rr(-84, -52, 168, 104, 12), "gray", { tone: 1 }),
  sh(rr(-74, -42, 100, 84, 8), "navy"), fl(rr(-68, -36, 88, 72, 5), "sky", 0.2),
  gl(po([[-62, -30], [-44, -30], [-62, 0]], true), 0.5),
  sh(rr(30, -42, 44, 84, 6), "white", D),
  sh(ci(52, -20, 13), "gray", D), st("M52 -20 L58 -28", { w: "detail" }),
  sh(rr(38, 4, 28, 10, 3), "green", D), sh(rr(38, 20, 12, 10, 3), "red", D), sh(rr(54, 20, 12, 10, 3), "gray", D),
  sh(rr(-80, -28, 5, 56, 2), "gray", { tone: 2, w: "detail" })), { tags: ["appliance"] });

reg("Kitchen", "blender", "Blender", () => A(
  sh(rr(-28, -92, 56, 14, 6), "ink", { w: "detail" }),
  sh(po([[-40, -80], [40, -80], [30, 20], [-30, 20]], true), "glass"),
  fl(po([[-37, -34], [37, -34], [30, 20], [-30, 20]], true), "red", 0.8),
  st("M-37 -34 Q-18 -26 0 -34 T37 -34", { c: "white", w: "detail", op: 0.8 }),
  gl(po([[-32, -72], [-26, -72], [-22, 12], [-26, 12]], true), 0.6),
  sh(po([[-30, 20], [30, 20], [34, 30], [-34, 30]], true), "gray", { tone: 2, w: "detail" }),
  sh(rr(-46, 28, 92, 52, 12), "gray"), sh(ci(-20, 54, 8), "white", D), sh(ci(6, 54, 8), "white", D), sh(rr(24, 48, 16, 12, 4), "red", D)), { tags: ["appliance", "smoothie"] });

reg("Kitchen", "oven-mitt", "Oven mitt", () => A(
  sh(sm([[-38, 56], [-42, -4], [-34, -56], [-10, -76], [16, -62], [20, -22], [38, -34], [58, -14], [42, 24], [36, 56], [-38, 56]]), "orange"),
  st("M-24 -30 Q0 -22 14 -40 M-30 0 Q0 10 30 -6 M-30 28 Q0 38 34 22", { c: "orange", w: "detail", op: 1 }),
  sh(rr(-46, 46, 90, 32, 8), "red"), st("M-46 62 H44", { c: "white", w: "detail" }),
  gl(sm([[-30, -40], [-22, -60], [-8, -68], [-18, -48], [-30, -40]]), 0.45)), { tags: ["cooking", "hot"] });

// ============================ TECH ============================
const phoneScreen = (kind) => {
  if (kind === "play") return A(fl(rr(-35, -70, 70, 138, 8), "blue", 1), fl(rr(-35, -70, 70, 70, 8), "blue", 1), sh(ci(0, -2, 22), "white", D), fl(po([[-7, -14], [-7, 10], [14, -2]], true), "blue"));
  if (kind === "chat") return A(fl(rr(-35, -70, 70, 138, 8), "paper"), sh(rr(-28, -48, 44, 22, 8), "gray", { tone: 1, w: "detail" }), sh(rr(-16, -18, 44, 22, 8), "blue", { w: "detail" }), sh(rr(-28, 12, 36, 22, 8), "gray", { tone: 1, w: "detail" }), sh(rr(-6, 42, 34, 18, 8), "blue", { w: "detail" }), fl(rr(-30, 62, 0.1, 0.1, 0), "paper"));
  return fl(rr(-35, -70, 70, 138, 8), "navy", 1);
};
const phone = (o) => A(
  sh(rr(-42, -80, 84, 160, 16), "ink"),
  phoneScreen(o.screen),
  fl(ci(0, -74, 3), "gray"),
  gl(po([[-35, -70], [-6, -70], [-35, -20]], true), o.screen === "blank" ? 0.14 : 0.22));
reg("Tech", "phone", "Phone (blank)", phone, { demo: { screen: "blank" }, tags: ["smartphone", "mobile", "screen"], call: 'L.put(S, "prop-phone", x, y, { screen: "blank" | "play" | "chat", s, t })' });
reg("Tech", "phone-play", "Phone (play)", phone, { defaults: { screen: "play" }, tags: ["smartphone", "video"], call: 'L.put(S, "prop-phone", x, y, { screen: "play" })' });
reg("Tech", "phone-chat", "Phone (chat)", phone, { defaults: { screen: "chat" }, tags: ["smartphone", "message"], call: 'L.put(S, "prop-phone", x, y, { screen: "chat" })' });

reg("Tech", "laptop", "Laptop", () => A(
  sh(rr(-74, -68, 148, 100, 8), "gray", { tone: 2 }),
  fl(rr(-66, -60, 132, 84, 4), "navy"),
  fl(rr(-58, -46, 40, 8, 3), "sky"), fl(rr(-58, -30, 70, 6, 3), "teal"), fl(rr(-58, -18, 52, 6, 3), "yellow"), fl(rr(-58, -6, 62, 6, 3), "sky"),
  gl(po([[-66, -60], [-20, -60], [-66, 0]], true), 0.1),
  sh(po([[-96, 34], [96, 34], [82, 54], [-82, 54]], true), "gray"), st("M-18 34 H18", { w: "detail" })), { tags: ["computer", "work"] });

reg("Tech", "monitor", "Desktop monitor", () => A(
  sh(rr(-14, 36, 28, 40, 4), "gray", { tone: 1 }), sh(ci(0, 78, 44, 9), "gray"),
  sh(rr(-84, -66, 168, 108, 10), "gray", { tone: 2 }),
  fl(rr(-76, -58, 152, 92, 4), "sky", 1),
  fl(po([[-76, 34], [-76, 4], [-40, -20], [-6, 10], [26, -12], [76, 20], [76, 34]], true), "grass"),
  fl(ci(40, -34, 12), "yellow"),
  gl(po([[-76, -58], [-26, -58], [-76, 6]], true), 0.2)), { tags: ["computer", "screen", "display"] });

reg("Tech", "tv", "Television", () => A(
  tube("M-20 -58 L-40 -86 M20 -58 L40 -86", "gray", 4),
  sh(po([[-62, 46], [-46, 46], [-54, 70], [-70, 70]], true), "ink", D), sh(po([[62, 46], [46, 46], [54, 70], [70, 70]], true), "ink", D),
  sh(rr(-88, -58, 176, 108, 12), "ink"),
  fl(rr(-78, -48, 156, 88, 5), "sky"),
  fl(po([[-78, 40], [-78, 6], [-40, -14], [0, 12], [34, -8], [78, 14], [78, 40]], true), "grass"), fl(ci(46, -22, 11), "yellow"),
  gl(po([[-78, -48], [-24, -48], [-78, 10]], true), 0.22), fl(ci(70, 44, 2.5), "red")), { tags: ["screen", "display", "telly"] });

reg("Tech", "tablet", "Tablet", () => A(
  sh(rr(-84, -62, 168, 124, 14), "gray", { tone: 2 }),
  fl(rr(-74, -52, 148, 104, 5), "paper"),
  sh(rr(-64, -42, 60, 46, 6), "sky", D), fl(po([[-64, 4], [-64, -14], [-44, -26], [-24, -10], [-4, 4]], true), "grass"), fl(ci(-22, -28, 5), "yellow"),
  fl(rr(6, -40, 58, 7, 3), "gray"), fl(rr(6, -26, 50, 7, 3), "gray", 0.6), fl(rr(6, -12, 54, 7, 3), "gray", 0.6),
  fl(rr(-64, 14, 128, 7, 3), "gray", 0.6), fl(rr(-64, 28, 90, 7, 3), "gray", 0.6),
  gl(po([[-74, -52], [-30, -52], [-74, 0]], true), 0.2), fl(ci(80, 0, 2.5), "gray")), { tags: ["ipad", "screen"] });

reg("Tech", "smartwatch", "Smartwatch", () => A(
  sh(rr(-24, -86, 48, 60, 8), "teal"), sh(rr(-24, 26, 48, 60, 8), "teal"),
  fl(ci(0, -70, 3), "ink"), fl(ci(0, 70, 3), "ink"),
  sh(rr(-38, -42, 76, 84, 20), "ink"),
  fl(rr(-31, -35, 62, 70, 14), "navy"),
  sh(ci(0, 0, 24), "white", { w: "detail", flat: true }), fl(ci(0, 0, 21), "paper"),
  st("M0 0 V-14 M0 0 L10 6", { w: "detail" }), fl(ci(0, 0, 2.5), "red"),
  sh(rr(36, -10, 7, 20, 3), "gray", D), gl(po([[-31, -35], [-4, -35], [-31, 0]], true), 0.2)), { tags: ["wearable", "watch", "fitness"] });

reg("Tech", "headphones", "Headphones", () => A(
  tube("M-58 14 C-58 -88 58 -88 58 14", "navy", 12),
  sh(rr(-80, -4, 34, 60, 15), "red"), sh(rr(46, -4, 34, 60, 15), "red"),
  sh(rr(-52, 4, 12, 44, 6), "ink", D), sh(rr(40, 4, 12, 44, 6), "ink", D),
  gl(rr(-74, 4, 7, 34, 3), 0.5), gl(rr(52, 4, 7, 34, 3), 0.5)), { tags: ["audio", "music"] });

reg("Tech", "controller", "Game controller", () => A(
  sh(sm([[-86, 8], [-72, -32], [-40, -42], [40, -42], [72, -32], [86, 8], [76, 52], [56, 56], [36, 24], [-36, 24], [-56, 56], [-76, 52], [-86, 8]]), "blue"),
  sh(po([[-56, -22], [-46, -22], [-46, -12], [-36, -12], [-36, -2], [-46, -2], [-46, 8], [-56, 8], [-56, -2], [-66, -2], [-66, -12], [-56, -12]], true), "white", D),
  sh(ci(62, -22, 7), "yellow", D), sh(ci(62, 0, 7), "green", D), sh(ci(51, -11, 7), "blue", { tone: 2, w: "detail" }), sh(ci(73, -11, 7), "red", D),
  sh(ci(-22, 14, 10), "ink", D), sh(ci(22, 14, 10), "ink", D),
  sh(rr(-10, -26, 20, 8, 4), "gray", D),
  gl(sm([[-72, -20], [-62, -34], [-38, -38], [-58, -28], [-72, -20]]), 0.4)), { tags: ["gaming", "gamepad"] });

reg("Tech", "camera", "Camera", () => A(
  sh(rr(-30, -58, 36, 18, 5), "gray", { tone: 2 }), sh(rr(-62, -48, 34, 10, 4), "ink", D), sh(rr(40, -54, 22, 12, 4), "red", D),
  sh(rr(-80, -42, 160, 100, 14), "gray", { tone: 1 }),
  fl(rr(-80, -42, 160, 36, 14), "ink", 0.85), fl(rr(-80, -20, 160, 14, 0), "ink", 0.85),
  sh(ci(0, 10, 40), "ink"), sh(ci(0, 10, 30), "navy", D), sh(ci(0, 10, 18), "blue", { w: "detail" }),
  fl(ci(-8, 2, 6), "white", 0.8), fl(ci(8, 18, 3), "white", 0.6),
  sh(rr(54, -34, 16, 10, 3), "white", D), sh(ci(-62, -26, 5), "yellow", D)), { tags: ["photo", "picture"] });

reg("Tech", "microphone", "Microphone", () => g(A(
  sh(sm([[-14, -20], [14, -20], [10, 50], [0, 74], [-10, 50], [-14, -20]]), "ink"),
  sh(ci(0, -50, 30), "gray", { tone: 1 }),
  ...[-20, -10, 0, 10, 20].map((dy) => { const w = Math.sqrt(900 - (dy + 0) * (dy + 0)) * 0.92; return st(`M${-w} ${-50 + dy} H${w}`, { c: "gray", w: "detail", op: 0.8 }); }),
  ...[-20, -10, 0, 10, 20].map((dx) => { const h = Math.sqrt(900 - dx * dx) * 0.92; return st(`M${dx} ${-50 - h} V${-50 + h}`, { c: "gray", w: "detail", op: 0.8 }); }),
  sh(rr(-20, -24, 40, 10, 5), "red", D),
  gl(sm([[-22, -62], [-14, -76], [0, -78], [-14, -62]]).replace("Z", "") + "Z", 0.5)), "rotate(20)"), { tags: ["audio", "podcast", "voice"] });

reg("Tech", "light-bulb", "Light bulb", () => A(
  ...[[-150, 44], [-120, 52], [-90, 40], [-60, 52], [-30, 44]].map(([a, r]) => { const rad = (a * Math.PI) / 180, x0 = Math.cos(rad), y0 = Math.sin(rad); return st(`M${f1(x0 * 64)} ${f1(-22 + y0 * 64)} L${f1(x0 * 82)} ${f1(-22 + y0 * 82)}`, { c: "yellow", w: "prop" }); }),
  st("M-72 -8 H-90 M72 -8 H90 M-60 -62 L-76 -74 M60 -62 L76 -74 M0 -86 V-102", { c: "yellow", w: "prop" }),
  sh(sm([[-20, 30], [-24, 10], [-46, -14], [-48, -46], [-26, -76], [0, -84], [26, -76], [48, -46], [46, -14], [24, 10], [20, 30], [-20, 30]]), "yellow", { tone: 1 }),
  st("M-12 30 L-12 -4 L-6 -14 L0 -4 L6 -14 L12 -4 L12 30", { c: "orange", w: "detail" }),
  sh(rr(-22, 30, 44, 12, 4), "gray", { tone: 1, w: "detail" }), sh(rr(-22, 42, 44, 12, 4), "gray", { w: "detail" }), sh(rr(-14, 54, 28, 12, 6), "gray", { tone: 2, w: "detail" }),
  gl(sm([[-36, -30], [-30, -56], [-14, -68], [-24, -46], [-36, -30]]), 0.7)), { tags: ["idea", "light", "lamp"] });

reg("Tech", "battery", "Battery", () => g(A(
  sh(rr(-14, -88, 28, 16, 5), "gray", { tone: 1 }),
  sh(rr(-30, -76, 60, 152, 12), "green"),
  sh(rr(-30, -76, 60, 34, 12), "gold"), fl(rr(-30, -58, 60, 16, 0), "gold"),
  st("M-30 -42 H30", { w: "detail" }),
  sh(po([[6, -22], [-14, 14], [-2, 14], [-8, 50], [14, 6], [2, 6]], true), "white", D),
  gl(rr(-24, -36, 6, 104, 3), 0.4)), "rotate(24)"), { tags: ["power", "energy", "charge"] });

reg("Tech", "plug", "Plug", () => A(
  tube("M0 30 C0 80 60 60 60 96", "ink", 9),
  sh(rr(-16, -76, 10, 34, 3), "gold", D), sh(rr(6, -76, 10, 34, 3), "gold", D),
  sh(rr(-38, -46, 76, 80, 18), "blue"),
  sh(rr(-20, 34, 40, 18, 6), "navy", D),
  gl(rr(-30, -38, 8, 60, 4), 0.4)), { tags: ["power", "electric", "socket"] });

reg("Tech", "wifi", "Wi-Fi", () => A(
  tube(L.arc(0, 56, 38, -135, -45), "blue", 14), tube(L.arc(0, 56, 72, -135, -45), "blue", 14), tube(L.arc(0, 56, 106, -135, -45), "blue", 14),
  sh(ci(0, 56, 12), "blue", D)), { tags: ["internet", "signal", "wireless"] });

reg("Tech", "remote", "Remote control", () => A(
  sh(rr(-30, -86, 60, 172, 18), "ink"),
  sh(ci(0, -62, 11), "red", D), fl(ci(0, -62, 4), "white"),
  sh(ci(0, -22, 22), "gray", { tone: 1, w: "detail" }), fl(ci(0, -22, 8), "ink", 0.7),
  ...[0, 1, 2].flatMap((r) => [0, 1, 2].map((c) => sh(ci(-16 + c * 16, 20 + r * 20, 6), "gray", { tone: 1, w: "detail" }))),
  sh(rr(-20, 76, 18, 6, 3), "blue", D), sh(rr(2, 76, 18, 6, 3), "green", D),
  gl(rr(-24, -78, 6, 150, 3), 0.18)), { tags: ["tv", "control", "clicker"] });

// ============================ HOME AND TOOLS ============================
reg("Home and tools", "key", "Key", () => g(A(
  sh(rr(-30, -7, 100, 14, 4), "gold"), sh(rr(42, 7, 10, 20, 3), "gold", D), sh(rr(58, 7, 10, 13, 3), "gold", D),
  ring(-56, 0, 32, 13, "gold"),
  gl(sm([[-76, -14], [-62, -26], [-46, -26]]).replace("Z", ""), 0.0), st("M-76 -12 Q-66 -26 -50 -26", { c: "white", w: 4, op: 0.6 })), "rotate(-32) translate(-6 0)"), { tags: ["lock", "house", "secure"] });

reg("Home and tools", "padlock", "Padlock", () => A(
  tube("M-30 -6 V-38 A30 30 0 0 1 30 -38 V-6", "gray", 14),
  sh(rr(-52, -8, 104, 84, 16), "gold"),
  sh(ci(0, 26, 11), "ink", D), sh(po([[-5, 30], [5, 30], [8, 54], [-8, 54]], true), "ink", D),
  gl(rr(-44, 0, 8, 60, 4), 0.45)), { tags: ["security", "lock", "safe"] });

reg("Home and tools", "umbrella", "Umbrella", () => A(
  tube("M0 -4 V56 Q0 78 -20 78 Q-34 78 -34 62", "navy", 8),
  sh("M-86 0 A86 80 0 0 1 86 0 Q57 26 29 0 Q0 26 -29 0 Q-57 26 -86 0 Z", "red"),
  sh("M0 -80 Q-44 -56 -29 0 Q0 26 29 0 Q44 -56 0 -80 Z", "yellow", D),
  st("M0 -80 V-92", { c: "ink", w: "prop" }),
  gl(sm([[-70, -22], [-56, -50], [-30, -66]]), 0.0), st("M-72 -22 Q-60 -52 -34 -68", { c: "white", w: 4, op: 0.55 })), { tags: ["rain", "weather"] });

reg("Home and tools", "shopping-bag", "Shopping bag", () => A(
  tube("M-24 -22 C-24 -80 24 -80 24 -22", "ink", 6),
  sh(po([[-52, -30], [52, -30], [58, 76], [-58, 76]], true), "green"),
  dk(po([[-52, -30], [52, -30], [53, -18], [-52, -18]], true), 0.14),
  fl(ci(-22, -26, 4), "ink"), fl(ci(22, -26, 4), "ink"),
  sh(ci(0, 22, 18), "white", D), fl(sm([[0, 34], [-9, 22], [-4, 14], [0, 18], [4, 14], [9, 22], [0, 34]]), "red"),
  gl(po([[-44, -14], [-36, -14], [-42, 64], [-50, 64]], true), 0.3)), { tags: ["shop", "retail", "paper bag"] });

reg("Home and tools", "suitcase", "Suitcase", () => A(
  tube("M-24 -48 V-70 H24 V-48", "ink", 8),
  sh(rr(-74, -50, 148, 108, 14), "orange"),
  sh(rr(-52, -50, 14, 108, 0), "orange", { tone: 2, w: "detail" }), sh(rr(38, -50, 14, 108, 0), "orange", { tone: 2, w: "detail" }),
  sh(rr(-10, -16, 20, 14, 3), "gold", D),
  sh(ci(-52, 70, 8), "ink", D), sh(ci(52, 70, 8), "ink", D),
  sh(ci(-20, 28, 13), "yellow", D), fl(sm([[-20, 36], [-26, 28], [-20, 20], [-14, 28], [-20, 36]]), "red"),
  gl(rr(-68, -44, 8, 94, 4), 0.35)), { tags: ["travel", "luggage", "holiday"] });

reg("Home and tools", "backpack", "Backpack", () => A(
  tube("M-14 -76 Q0 -92 14 -76", "teal", 7),
  sh(sm([[-50, 70], [-56, -20], [-42, -64], [0, -76], [42, -64], [56, -20], [50, 70], [-50, 70]]), "teal"),
  sh(rr(-38, 6, 76, 56, 12), "teal", { tone: 2 }),
  st("M-24 18 H24", { c: "gray", w: "prop" }), sh(rr(-6, 14, 12, 12, 3), "gold", D),
  st("M0 -60 V-12", { c: "ink", w: "detail" }), sh(rr(-6, -22, 12, 14, 4), "gold", D),
  tube("M-50 -28 Q-70 20 -48 60", "navy", 9), tube("M50 -28 Q70 20 48 60", "navy", 9),
  gl(sm([[-40, -30], [-34, -56], [-14, -66], [-26, -42], [-40, -30]]), 0.45)), { tags: ["school", "bag", "hiking"] });

reg("Home and tools", "broom", "Broom", () => g(A(
  sh(po([[-26, 14], [26, 14], [46, 84], [-46, 84]], true), "gold"),
  st("M-14 20 L-24 82 M0 20 V84 M14 20 L24 82", { c: "gold", w: "detail" }),
  sh(rr(-28, 6, 56, 16, 6), "red"),
  tube("M0 10 V-92", "wood", 10)), "rotate(22) translate(0 -2)"), { tags: ["clean", "sweep", "chores"] });

reg("Home and tools", "bucket", "Bucket", () => A(
  tube("M-52 -34 Q0 -110 52 -34", "gray", 7),
  sh(po([[-52, -32], [52, -32], [40, 68], [-40, 68]], true), "blue"),
  sh(ci(0, -32, 52, 11), "blue", { tone: 1, w: "detail" }), fl(ci(0, -30, 44, 7), "water", 0.9),
  fl(po([[-50, -14], [50, -14], [48, -2], [-49, -2]], true), "white", 0.35),
  gl(po([[-42, -20], [-34, -20], [-30, 58], [-36, 58]], true), 0.4)), { tags: ["clean", "water", "pail"] });

reg("Home and tools", "hammer", "Hammer", () => g(A(
  sh(rr(-8, -22, 16, 104, 6), "wood"),
  sh(sm([[-46, -52], [-64, -64], [-76, -58], [-58, -36], [-46, -20], [48, -20], [48, -52], [-46, -52]]), "gray"),
  sh(rr(30, -54, 20, 36, 4), "gray", { tone: 1, w: "detail" }),
  gl(rr(-40, -48, 60, 6, 3), 0.55)), "rotate(34) translate(0 -8)"), { tags: ["tool", "build", "fix"] });

reg("Home and tools", "wrench", "Wrench", () => {
  const arc = L.arcPts(0, -54, 32, -69.9, 249.9, 30), notch = [[-11, -83], [-11, -64], [-6, -58], [0, -56], [6, -58], [11, -64], [11, -83]];
  return g(A(
    sh(rr(-10, -30, 20, 96, 8), "gray"),
    sh(po([...arc, [-11, -83], [-11, -64], [-6, -58], [0, -56], [6, -58], [11, -64]], true), "gray"),
    ring(0, 68, 22, 9, "gray"),
    gl(rr(-5, -24, 4, 80, 2), 0.5)), "rotate(32) translate(0 -2)");
}, { tags: ["tool", "spanner", "fix"] });

reg("Home and tools", "screwdriver", "Screwdriver", () => g(A(
  sh(rr(-3.5, -26, 7, 84, 2), "gray", { tone: 1 }), sh(po([[-3.5, 56], [3.5, 56], [2, 82], [-2, 82]], true), "gray", { tone: 2, w: "detail" }),
  sh(rr(-9, -34, 18, 12, 3), "gray", { tone: 2, w: "detail" }),
  sh(rr(-15, -88, 30, 58, 13), "orange"),
  st("M-15 -66 H15 M-15 -54 H15 M-15 -42 H15", { c: "orange", w: "detail" }),
  gl(rr(-10, -82, 5, 44, 2.5), 0.5)), "rotate(-38) translate(0 4)"), { tags: ["tool", "fix"] });

reg("Home and tools", "toolbox", "Toolbox", () => A(
  tube("M-34 -36 V-60 H34 V-36", "gray", 9),
  sh(rr(-80, -38, 160, 30, 8), "red", { tone: 2 }),
  sh(rr(-80, -12, 160, 76, 8), "red"),
  sh(rr(-14, -20, 28, 22, 5), "gold", D),
  fl(rr(-80, 10, 160, 6, 0), "red", 0.0), st("M-80 16 H80", { c: "red", w: "detail" }),
  gl(rr(-72, -32, 70, 6, 3), 0.4), gl(rr(-72, -4, 8, 60, 4), 0.35)), { tags: ["tools", "fix", "build"] });

reg("Home and tools", "scissors", "Scissors", () => A(
  g(A(sh(po([[28, -92], [38, -84], [8, -6], [-6, -2]], true), "gray", { tone: 1 }), tube("M0 -6 L-26 30", "orange", 13), ring(-30, 52, 24, 11, "orange")), ""),
  g(A(sh(po([[28, -92], [38, -84], [8, -6], [-6, -2]], true), "gray", { tone: 1 }), tube("M0 -6 L-26 30", "orange", 13), ring(-30, 52, 24, 11, "orange")), "scale(-1 1)"),
  sh(ci(0, -4, 6), "gold", D)), { tags: ["cut", "craft", "tool"] });

reg("Home and tools", "tape", "Roll of tape", () => A(
  sh(po([[30, 56], [66, 40], [80, 84], [44, 92]], true), "sand", D),
  ring(0, 0, 66, 32, "yellow"),
  ring(0, 0, 66, 58, "sand", D), st(L.arc(0, 0, 50, 200, 300), { c: "white", w: 4, op: 0.7 })), { tags: ["sticky", "craft", "office"] });

reg("Home and tools", "glue", "Glue", () => A(
  sh(po([[-10, -52], [10, -52], [4, -88], [-4, -88]], true), "orange", D), sh(rr(-20, -58, 40, 10, 4), "orange", { tone: 2, w: "detail" }),
  sh(sm([[-20, -48], [20, -48], [20, -20], [34, -4], [34, 70], [-34, 70], [-34, -4], [-20, -20], [-20, -48]]), "white"),
  sh(rr(-34, 4, 68, 40, 2), "blue", D), fl(sm([[-20, 24], [0, 14], [20, 24], [0, 34], [-20, 24]]), "white"),
  gl(rr(-28, 0, 5, 64, 2), 0.7)), { tags: ["craft", "stick", "school"] });

reg("Home and tools", "parcel", "Box / parcel", () => A(
  sh(po([[-62, -20], [-22, -48], [70, -48], [30, -20]], true), "earth", { tone: 1 }),
  sh(rr(-62, -20, 92, 86, 3), "earth"),
  sh(po([[30, -20], [70, -48], [70, 40], [30, 66]], true), "earth", { tone: 2 }),
  fl(po([[-26, -20], [-8, -20], [32, -48], [14, -48]], true), "sand"), fl(po([[-26, -20], [-8, -20], [-8, 8], [-26, 8]], true), "sand"),
  sh(rr(-52, 28, 38, 26, 3), "white", D), st("M-46 38 H-22 M-46 46 H-30", { w: "detail" }),
  gl(rr(-58, -14, 5, 76, 2), 0.25)), { tags: ["package", "delivery", "shipping", "cardboard"] });

reg("Home and tools", "candle", "Candle", () => A(
  sh(sm([[0, -94], [14, -64], [10, -46], [0, -42], [-10, -46], [-14, -64], [0, -94]]), "orange"),
  fl(sm([[0, -76], [7, -60], [4, -50], [0, -48], [-4, -50], [-7, -60], [0, -76]]), "yellow"),
  st("M0 -42 V-34", { w: "prop" }),
  sh(ci(0, 70, 56, 12), "gold", D),
  sh(sm([[-26, -34], [26, -34], [26, 8], [22, 20], [18, 8], [18, 66], [-26, 66], [-26, -34]]), "cream"),
  sh(ci(0, -34, 26, 7), "cream", { tone: 1, w: "detail" }),
  gl(rr(-20, -26, 5, 84, 2), 0.7)), { tags: ["light", "birthday", "romantic"] });

reg("Home and tools", "alarm-clock", "Alarm clock", () => A(
  sh(ci(-44, -62, 24, 20), "gray", { tone: 1 }), sh(ci(44, -62, 24, 20), "gray", { tone: 1 }),
  st("M0 -62 V-96 M-14 -96 H14", { w: "prop" }),
  tube("M-34 66 L-48 86 M34 66 L48 86", "gray", 8),
  sh(ci(0, 4, 68), "red"),
  sh(ci(0, 4, 52), "white", D),
  ...Array.from({ length: 12 }, (_, i) => { const a = (i * Math.PI) / 6; return st(`M${f1(Math.sin(a) * 42)} ${f1(4 - Math.cos(a) * 42)} L${f1(Math.sin(a) * 47)} ${f1(4 - Math.cos(a) * 47)}`, { w: "detail" }); }),
  st("M0 4 V-30 M0 4 L22 16", { w: "prop" }), sh(ci(0, 4, 5), "red", D),
  gl(sm([[-54, -22], [-42, -46], [-22, -58]]), 0.0), st("M-58 -12 Q-52 -42 -26 -58", { c: "white", w: 4, op: 0.55 })), { tags: ["time", "wake", "morning", "clock"] });

reg("Home and tools", "hourglass", "Hourglass", () => A(
  sh(po([[-50, -80], [50, -80], [50, -62], [-50, -62]], true), "wood"),
  sh(po([[-50, 62], [50, 62], [50, 80], [-50, 80]], true), "wood"),
  sh(sm([[-38, -62], [38, -62], [38, -46], [8, -6], [8, 6], [38, 46], [38, 62], [-38, 62], [-38, 46], [-8, 6], [-8, -6], [-38, -46], [-38, -62]]), "glass"),
  fl(po([[-30, -54], [30, -54], [30, -48], [5, -10], [-5, -10], [-30, -48]], true), "yellow"),
  fl(po([[-30, 54], [30, 54], [30, 48], [10, 28], [0, 20], [-10, 28], [-30, 48]], true), "yellow"),
  st("M0 -8 V24", { c: "yellow", w: 3 }),
  gl(rr(-32, -52, 5, 24, 2), 0.7)), { tags: ["time", "wait", "timer", "sand"] });

reg("Home and tools", "calendar", "Calendar", () => A(
  sh(rr(-66, -72, 132, 144, 12), "white"),
  sh(rr(-66, -72, 132, 38, 12), "red"), fl(rr(-64, -50, 128, 14, 0), "red"), st("M-66 -34 H66", { w: "detail" }),
  tube("M-34 -86 V-62 M34 -86 V-62", "gray", 9),
  ...[0, 1, 2, 3].flatMap((r) => [0, 1, 2, 3, 4].map((c) => (r === 2 && c === 2 ? sh(ci(-44 + c * 22, -8 + r * 24, 11), "red", D) : fl(rr(-54 + c * 22, -18 + r * 24, 20, 18, 4), "gray", 0.3)))),
  gl(rr(-60, -28, 5, 90, 2), 0.0)), { tags: ["date", "schedule", "month", "day"] });

reg("Home and tools", "notebook", "Notebook", () => A(
  sh(rr(-48, -80, 100, 160, 8), "blue"),
  sh(rr(-20, -52, 62, 50, 6), "white", D), st("M-10 -38 H32 M-10 -26 H32 M-10 -14 H20", { c: "gray", w: "detail" }),
  
  ...Array.from({ length: 7 }, (_, i) => tube(`M-60 ${-62 + i * 22} H-36`, "gray", 6)),
  gl(rr(-30, 10, 60, 6, 3), 0.0), gl(rr(-40, -74, 6, 144, 3), 0.3)), { tags: ["school", "write", "diary", "journal"] });

const pencilLike = (body, band, cap, rot) => g(A(
  sh(rr(-12, -90, 24, 22, 7), cap),
  sh(rr(-12, -70, 24, 14, 2), "gray", { tone: 1, w: "detail" }),
  sh(rr(-12, -56, 24, 100, 2), body),
  sh(po([[-12, 44], [12, 44], [0, 78]], true), "sand", D), sh(po([[-4.6, 66], [4.6, 66], [0, 78]], true), "ink", { w: "detail" }),
  gl(rr(-9, -52, 5, 92, 2), 0.45)), `rotate(${rot})`);
reg("Home and tools", "pencil", "Pencil", () => pencilLike("yellow", "gray", "pink", 36), { tags: ["write", "draw", "school"] });

reg("Home and tools", "pen", "Pen", () => g(A(
  sh(rr(-8, -88, 16, 18, 6), "blue", { tone: 2 }),
  sh(rr(-9, -72, 18, 110, 6), "blue"),
  sh(rr(7, -70, 5, 52, 2.5), "gray", { w: "detail" }),
  sh(po([[-9, 38], [9, 38], [3, 66], [-3, 66]], true), "gray", { tone: 1 }), sh(po([[-3, 66], [3, 66], [0, 78]], true), "ink", { w: "detail" }),
  sh(rr(-9, 22, 18, 16, 3), "gray", { tone: 2, w: "detail" }),
  gl(rr(-5, -66, 4, 84, 2), 0.5)), "rotate(-36)"), { tags: ["write", "ballpoint", "office"] });

reg("Home and tools", "book-closed", "Book (closed)", () => A(
  sh(rr(-52, -72, 104, 144, 6), "purple"),
  sh(rr(-52, -72, 16, 144, 4), "purple", { tone: 2, w: "detail" }),
  sh(rr(-26, -48, 66, 44, 6), "cream", D), st("M-16 -34 H30 M-16 -22 H18", { c: "ink", w: "detail" }),
  fl(L.star(7, 34, 16, 7), "yellow"),
  gl(rr(-30, -66, 5, 132, 2), 0.25)), { tags: ["read", "school", "story"] });

reg("Home and tools", "book-open", "Book (open)", () => A(
  sh(po([[-92, -44], [92, -44], [92, 56], [0, 66], [-92, 56]], true), "blue", { tone: 2 }),
  sh(sm([[0, -36], [-30, -52], [-84, -46], [-84, 46], [-30, 52], [0, 62], [0, -36]]), "white"),
  sh(sm([[0, -36], [30, -52], [84, -46], [84, 46], [30, 52], [0, 62], [0, -36]]), "white"),
  ...[-26, -10, 6, 22].flatMap((y, i) => [fl(rr(-72, y - 8 + i * 0, 44 - (i % 2) * 10, 5, 2), "gray", 0.5), fl(rr(28, y - 8, 44 - ((i + 1) % 2) * 10, 5, 2), "gray", 0.5)]),
  fl(ci(50, 30, 10), "sky"), gl(po([[-80, -42], [-40, -48], [-80, -16]], true), 0.0)), { tags: ["read", "school", "study", "pages"] });

reg("Home and tools", "envelope", "Envelope", () => A(
  sh(rr(-78, -52, 156, 104, 8), "paper"),
  st("M-78 52 L-14 -4 M78 52 L14 -4", { c: "gray", w: "detail" }),
  sh(po([[-78, -48], [78, -48], [0, 12]], true), "white"),
  sh(ci(0, 10, 10), "red", D), fl(sm([[0, 15], [-5, 9], [0, 5], [5, 9], [0, 15]]), "white"),
  gl(rr(-70, 24, 40, 5, 2), 0.0)), { tags: ["mail", "letter", "message", "post"] });

reg("Home and tools", "gift", "Gift", () => A(
  sh(rr(-58, -8, 116, 76, 6), "red"),
  sh(rr(-66, -34, 132, 30, 6), "red", { tone: 1 }),
  sh(rr(-11, -34, 22, 30, 0), "yellow", D), sh(rr(-11, -6, 22, 74, 0), "yellow", D),
  sh(sm([[0, -34], [-32, -76], [-56, -58], [-42, -38], [0, -34]]), "yellow"),
  sh(sm([[0, -34], [32, -76], [56, -58], [42, -38], [0, -34]]), "yellow"),
  sh(ci(0, -38, 9), "yellow", { tone: 2, w: "detail" }),
  gl(rr(-52, 0, 7, 62, 3), 0.3)), { tags: ["present", "birthday", "surprise"] });

// ============================ TOYS AND MUSIC ============================
reg("Toys and music", "ball", "Beach ball", () => {
  const panel = (b1, b2, c) => fl(`M0 -66 Q${b1} 0 0 66 Q${b2} 0 0 -66 Z`, c);
  return A(
    sh(ci(0, 0, 66), "white"),
    panel(-132, -70, "red"), panel(-70, 0, "yellow"), panel(0, 70, "white"), panel(70, 132, "blue"),
    st(ci(0, 0, 66), { w: "prop" }),
    gl(sm([[-48, -26], [-38, -46], [-18, -56], [-34, -38], [-48, -26]]), 0.6));
}, { tags: ["toy", "summer", "beach", "sport"] });

reg("Toys and music", "teddy", "Teddy bear", () => A(
  sh(ci(-34, -66, 17), "earth", { tone: 2 }), sh(ci(34, -66, 17), "earth", { tone: 2 }), fl(ci(-34, -66, 9), "pink"), fl(ci(34, -66, 9), "pink"),
  sh(ci(-38, 78, 22, 17), "earth", { tone: 2 }), sh(ci(38, 78, 22, 17), "earth", { tone: 2 }),
  sh(ci(0, 36, 46, 50), "earth"),
  g(sh(ci(0, 0, 14, 28), "earth", { tone: 2 }), "translate(-52 22) rotate(30)"), g(sh(ci(0, 0, 14, 28), "earth", { tone: 2 }), "translate(52 22) rotate(-30)"),
  fl(ci(0, 42, 26, 28), "cream"),
  sh(ci(0, -28, 42, 40), "earth"),
  sh(ci(0, -16, 19, 14), "cream", D), sh(ci(0, -22, 6, 4), "ink", { w: "detail" }),
  fl(ci(-15, -34, 4.5), "ink"), fl(ci(15, -34, 4.5), "ink"),
  st("M0 -18 V-12 M-8 -9 Q0 -3 8 -9", { w: "detail" }),
  sh(po([[0, 12], [-22, 4], [-22, 22]], true), "red", D), sh(po([[0, 12], [22, 4], [22, 22]], true), "red", D), sh(ci(0, 12, 6), "red", { tone: 2, w: "detail" }),
  gl(sm([[-30, -52], [-22, -62], [-8, -64], [-20, -52], [-30, -52]]), 0.35)), { tags: ["toy", "plush", "kids", "bear"] });

reg("Toys and music", "kite", "Kite", () => A(
  tube("M0 46 C-22 58 14 66 -6 78 C-26 90 12 96 -4 104", "gray", 3),
  ...[[-20, 62, 0], [-4, 84, 1]].map(([x, y, k]) => sh(po([[x - 12, y - 7], [x, y], [x - 12, y + 7]], true), k ? "yellow" : "red", { w: "detail" }) + sh(po([[x + 12, y - 7], [x, y], [x + 12, y + 7]], true), k ? "yellow" : "red", { w: "detail" })),
  sh(po([[0, -88], [0, -16], [-52, -16]], true), "red"), sh(po([[0, -88], [52, -16], [0, -16]], true), "yellow"),
  sh(po([[0, 46], [0, -16], [-52, -16]], true), "blue"), sh(po([[0, 46], [52, -16], [0, -16]], true), "green"),
  st("M0 -88 V46 M-52 -16 H52", { w: "detail" }),
  gl(po([[-6, -80], [-6, -22], [-44, -22]], true), 0.0)), { tags: ["toy", "sky", "wind", "fly"] });

reg("Toys and music", "blocks", "Building blocks", () => {
  const blk = (x, y, c, ch, rot) => g(A(sh(rr(x, y, 58, 58, 6), c), fl(rr(x + 3, y + 3, 52, 8, 4), "white", 0.3), L.text(ch, x + 29, y + 45, { size: 38, c: "white", halo: "ink", haloW: 0.12 })), rot ? `rotate(${rot} ${x + 29} ${y + 29})` : "");
  return A(blk(-62, 22, "red", "A"), blk(4, 22, "blue", "B"), blk(-30, -38, "yellow", "C", 7));
}, { tags: ["toy", "kids", "abc", "play"] });

reg("Toys and music", "yoyo", "Yo-yo", () => A(
  tube("M0 0 C20 20 60 20 62 64", "gray", 3),
  ring(62, 76, 12, 6, "gray", D),
  sh(ci(-10, -8, 54), "red"), sh(ci(-10, -8, 36), "yellow", D), sh(ci(-10, -8, 11), "gray", D),
  st("M-10 -8 L-10 -44 M-10 -8 L24 -18 M-10 -8 L10 20 M-10 -8 L-30 20 M-10 -8 L-44 -18", { c: "orange", w: "detail" }),
  gl(sm([[-48, -26], [-38, -48], [-16, -58], [-34, -40], [-48, -26]]), 0.5)), { tags: ["toy", "kids", "string"] });

reg("Toys and music", "guitar", "Guitar", () => g(A(
  sh(rr(-7, -108, 14, 100, 3), "wood", { tone: 2 }),
  sh(rr(-11, -128, 22, 30, 7), "wood", { tone: 2 }),
  fl(ci(-15, -118, 3), "gray"), fl(ci(15, -118, 3), "gray"), fl(ci(-15, -106, 3), "gray"), fl(ci(15, -106, 3), "gray"),
  sh(sm([[0, -14], [24, -12], [34, 2], [28, 26], [34, 38], [46, 60], [40, 82], [0, 90], [-40, 82], [-46, 60], [-34, 38], [-28, 26], [-34, 2], [-24, -12], [0, -14]]), "orange"),
  sh(ci(0, 36, 14), "ink", D), st(ci(0, 36, 19), { c: "wood", w: "detail" }),
  sh(rr(-17, 62, 34, 9, 3), "brown", D),
  st("M-3 -98 V64 M0 -98 V64 M3 -98 V64", { c: "gray", w: 1.5 }),
  gl(sm([[-28, -2], [-20, -8], [-8, -8], [-22, 4], [-28, -2]]), 0.5)), "rotate(32) scale(0.86) translate(0 16)"), { tags: ["music", "instrument", "acoustic"] });

reg("Toys and music", "drum", "Drum", () => A(
  tube("M-52 -92 L24 -16", "wood", 8), tube("M52 -92 L-24 -16", "wood", 8), sh(ci(-52, -94, 9), "wood", { tone: 2, w: "detail" }), sh(ci(52, -94, 9), "wood", { tone: 2, w: "detail" }),
  sh("M-66 -6 L-66 52 A66 17 0 0 0 66 52 L66 -6 Z", "red"),
  st("M-62 2 L-44 48 L-26 4 L-8 50 L10 4 L28 50 L46 4 L62 48", { c: "white", w: "detail" }),
  sh(ci(0, -6, 66, 17), "white"), st(L.arc(0, -6, 58, 20, 160, 12), { c: "gray", w: "detail", op: 0.5 }),
  gl(rr(-58, 10, 6, 44, 3), 0.3)), { tags: ["music", "instrument", "percussion", "band"] });

reg("Toys and music", "piano", "Piano keyboard", () => {
  const blackAt = [0, 1, 3, 4, 5];
  return A(
    sh(rr(-88, -66, 176, 34, 8), "brown", { tone: 1 }),
    ...Array.from({ length: 8 }, (_, i) => sh(rr(-80 + i * 20, -34, 20, 96, 4), "white", { w: "detail" })),
    ...blackAt.map((i) => sh(rr(-80 + (i + 1) * 20 - 6.5, -34, 13, 58, 3), "ink", { w: "detail" })),
    gl(rr(-82, -62, 164, 5, 2), 0.25));
}, { tags: ["music", "instrument", "keys", "keyboard"] });

reg("Toys and music", "trumpet", "Trumpet", () => A(
  tube("M-86 -4 H-50", "gold", 7),
  tube("M-50 -4 H36", "gold", 9), tube("M-26 -4 V44 Q-26 56 -14 56 H34 Q46 56 46 44 V6", "gold", 9),
  sh(sm([[34, -4], [58, -10], [78, -40], [92, -40], [92, 58], [78, 58], [58, 26], [34, 8]]) + "Z", "gold"),
  sh(ci(92, 9, 6, 49), "gold", { tone: 1, w: "detail" }),
  ...[-34, -12, 10].map((x) => sh(rr(x - 5, -38, 10, 36, 4), "gold", { tone: 2, w: "detail" }) + sh(ci(x, -40, 7), "white", D)),
  sh(rr(-92, -9, 10, 10, 3), "gold", { tone: 2, w: "detail" }),
  gl(rr(-48, -9, 80, 3, 1.5), 0.5)), { tags: ["music", "instrument", "brass", "horn"] });

reg("Toys and music", "music-notes", "Music notes", () => A(
  g(A(sh(rr(-32, -64, 7, 72, 3), "ink", { w: "detail" }), sh(rr(40, -76, 7, 72, 3), "ink", { w: "detail" }), sh(po([[-32, -64], [47, -76], [47, -52], [-32, -40]], true), "ink", { w: "detail" }),
    sh(ci(-40, 10, 20, 14), "ink", { w: "detail" }).replace("<path", '<path transform="rotate(-22 -40 10)"'), sh(ci(32, -2, 20, 14), "ink", { w: "detail" }).replace("<path", '<path transform="rotate(-22 32 -2)"')), "translate(-6 14)"),
  g(A(sh(rr(-3, -30, 5, 40, 2), "purple", { w: "detail" }), sh(po([[2, -30], [24, -16], [24, -4], [2, -16]], true), "purple", { w: "detail" }), sh(ci(-9, 10, 13, 9), "purple", { w: "detail" }).replace("<path", '<path transform="rotate(-22 -9 10)"')), "translate(62 -52) scale(0.9)")), { tags: ["music", "song", "sound", "note"] });
})();
