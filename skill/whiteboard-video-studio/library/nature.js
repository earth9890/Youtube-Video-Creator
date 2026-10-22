// ===================== library/nature.js — living world and Earth (category "nature", prefix nat-) =====================
// Trees, plants and growth, mushrooms and fruit, ocean life, insects, dinosaurs, rocks and fossils, volcano and Earth cross-sections.
// Standing things (trees, plants, dinosaurs, corals): origin = bottom centre on the ground. Floating things / cross-sections: origin = centre.
// Creatures face right (use flip: true for left) and take o.blink. Trees take o.time = "day" | "sunset" | "night". Tokens only.
(function () {
const L = window.L, f1 = L.f1;
let N = 0;
const B = (cx, cy, rx, ry, c, o) => L.shape(L.circ(cx, cy, rx, ry), c, o);
const P = (pts, c, o) => L.shape(L.smooth(pts.concat([pts[0]])), c, o);          // closed smooth blob through points
const T = (pts, c, o) => L.shape(L.poly(pts, true), c, o);                         // polygon
const LB = (pts, w0, w1, c, o) => L.shape(L.limb(pts, w0, w1), c, o);               // tube along a polyline
const R = (x, y, w, h, r, c, o) => L.shape(L.rrect(x, y, w, h, r), c, o);
const dot = (x, y, r, c = "ink", op) => L.flat(L.circ(x, y, r), c, op);
const sm = (pts, o) => L.stroke(L.smooth(pts), Object.assign({ w: "detail" }, o));
const ln = (a, b, o) => L.stroke(L.line(a, b), Object.assign({ w: "detail" }, o));
const hi = (d, c, op = 0.5) => L.flat(d, L.c(c, 1), op);   // light patch (top-left)
const dk = (d, c, op = 0.3) => L.flat(d, L.c(c, 2), op);   // shade patch
const blush = (x, y, r) => L.flat(L.circ(x, y, r, r * 0.6), "pink", 0.75);
const eye = (x, y, r = 8, k = 0.4, o = {}) => o.blink ? sm([[x - r, y], [x, y + r * 0.5], [x + r, y]]) :
  L.shape(L.circ(x, y, r), "white", { w: "detail", flat: true }) + dot(x + k * r * 0.35, y + r * 0.1, r * 0.56) + dot(x + k * r * 0.35 - r * 0.2, y - r * 0.15, r * 0.2, "white");
const clip = (d, inner) => { const id = "nt" + ++N; return `<clipPath id="${id}"><path d="${d}"/></clipPath><g clip-path="url(#${id})">${inner}</g>`; };
const rim = (d, c, o = {}) => L.tag("path", { d, fill: "none", stroke: L.outline(c), "stroke-width": L.lw(o.w || "prop", o.s || 1), "stroke-linejoin": "round" });
const D2R = Math.PI / 180, pol = (r, a, cx = 0, cy = 0) => [cx + r * Math.cos(a * D2R), cy + r * Math.sin(a * D2R)];
// scalloped blob (canopies, bushes, coral, rocks)
const blob = (cx, cy, rx, ry, lobes = 7, jit = 0.12, ph = 0, per = 4) => {
  const n = lobes * per, pts = [];
  for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2, k = 1 + jit * Math.cos(lobes * a + ph); pts.push([cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k]); }
  pts.push(pts[0]); return L.smooth(pts);
};
// leaf / petal shape pointing along +x from (x, y) rotated by ang, length len, half-width wd
const leafD = (x, y, ang, len, wd = 0.22) => { const c = Math.cos(ang * D2R), s = Math.sin(ang * D2R), p = (u, v) => [x + u * c - v * s, y + u * s + v * c];
  return L.smooth([p(0, 0), p(len * 0.35, -len * wd), p(len, 0), p(len * 0.35, len * wd), p(0, 0)]); };
const leaf = (x, y, ang, len, c = "green", o = {}) => L.shape(leafD(x, y, ang, len, o.wd), c, Object.assign({ w: "detail" }, o)) + (o.vein === false ? "" : (() => { const e = pol(len * 0.8, ang, x, y); return ln([x, y], e, { c: L.c(c, 2), op: 0.6 }); })());
const glow = (cx, cy, r, c = "yellow", op = 0.5, ry = r) => { const id = "ng" + ++N, col = L.c(c, 1); return `<defs><radialGradient id="${id}"><stop offset="0" stop-color="${col}" stop-opacity="${op}"/><stop offset="1" stop-color="${col}" stop-opacity="0"/></radialGradient></defs>` + L.tag("ellipse", { cx, cy, rx: r, ry, fill: `url(#${id})` }); };
const seed = (n) => L.rng(n);

// ---------- time of day for trees: the palette is mixed toward warm (sunset) or deep blue (night) while the tree draws ----------
const TM = { sunset: ["orange", 0, 0.22], night: ["blue", 2, 0.5] };
const timeLook = (time) => {
  if (!TM[time] || L.T.__time === time) return L.T;
  const base = L.T, key = base.palette + "~" + time, [n, t, k] = TM[time];
  if (!L.PALETTES[key]) { const tc = L.BASE[n][t], src = L.PALETTES[base.palette] || L.BASE; L.PALETTES[key] = Object.fromEntries(Object.entries(src).map(([c, v]) => [c, c === "ink" ? v : v.map((h) => L.mix(h, tc, k))])); }
  return Object.assign({}, base, { palette: key, __time: time, __base: base });
};
const withTime = (fn) => (o = {}) => { const tok = timeLook(o.time); return tok === L.T ? fn(o) : L.useLook(tok, () => fn(o)); };

// ---------- registration ----------
const reg = (name, fn, group, label, tags, o = {}) => L.reg("nature", name, fn, Object.assign({ box: [-150, -300, 300, 310], group, label, tags: ["nature"].concat(tags || []), call: `L.put(S, "${name}", x, gy, { s: 1, t })`, demo: {} }, o));
const regT = (name, fn, group, label, tags, o = {}) => reg(name, withTime(fn), group, label, tags, Object.assign({ call: `L.put(S, "${name}", x, gy, { s: 1, time: "day", t })`, demo: { time: "day" } }, o));
const regTN = (name, fn, group, label, tags, o = {}) => { const w = withTime(fn); regT(name, fn, group, label, tags, o);
  reg(name + "-night", (q) => w(Object.assign({}, q, { time: "night" })), group, label + " · night", tags, Object.assign({}, o, { call: `L.put(S, "${name}-night", x, gy, { s: 1, t })`, demo: { time: "night" } })); };
const soil = (x, y, w, h, o = {}) => { // soil block cross-section with grass lid: top-left (x, y)
  const d = L.rrect(x, y, w, h, 26);
  return L.shape(d, "earth", { w: "prop" }) + clip(d, dk(L.rect(x, y + h * 0.55, w, h), "earth", 0.45) + (o.stones === false ? "" : [[0.18, 0.5, 14], [0.75, 0.72, 18], [0.55, 0.35, 10], [0.35, 0.82, 12]].map(([a, b, r]) => B(x + a * w, y + b * h, r, r * 0.7, "stone", { w: "detail" })).join(""))) +
    L.shape(L.poly([[x + 6, y + 6], [x + w - 6, y + 6], [x + w - 6, y + 24], [x + w - 6, y + 28], [x + 6, y + 28]], true), "grass", { w: "detail" }) + rim(d, "earth");
};

// ===================== TREES =====================
const G = "Trees";
const bark = (pts, c = "wood") => pts.map((p) => sm(p, { c: L.c(c, 2), op: 0.55 })).join("");
regTN("nat-baobab", (o) => {
  const body = L.smooth([[-72, 0], [-100, -50], [-78, -150], [-46, -228], [-32, -262], [32, -262], [46, -228], [78, -150], [100, -50], [72, 0], [-72, 0]]);
  return L.shadow(0, 0, 260) + LB([[-18, -250], [-60, -300], [-104, -332]], 26, 12, "wood") + LB([[0, -256], [0, -310], [10, -362]], 24, 12, "wood") + LB([[18, -250], [64, -296], [108, -318]], 26, 12, "wood") +
    [[-104, -338, 56], [-60, -350, 44], [8, -378, 58], [66, -350, 44], [112, -326, 54]].map(([x, y, r], i) => L.shape(blob(x, y, r, r * 0.62, 5, 0.12, i), "green", { tone: i % 2 })).join("") +
    L.shape(body, "wood", { tone: 1 }) + hi(L.smooth([[-62, -20], [-86, -60], [-66, -150], [-38, -226], [-30, -150], [-44, -60], [-62, -20]]), "wood", 0.4) + clip(body, dk(L.smooth([[44, -240], [74, -150], [98, -50], [72, 0], [30, 0], [50, -80], [40, -170]]), "wood", 0.4)) +
    bark([[[-40, -60], [-44, -110], [-30, -170]], [[10, -30], [14, -100], [6, -190]], [[50, -50], [46, -120], [38, -200]], [[-10, -140], [-4, -210]]]) + L.shape(L.rrect(-14, -88, 30, 22, 8), "brown", { w: "detail", tone: 1 }) ;
}, G, "Baobab", ["tree", "africa", "savanna", "fat trunk", "bottle tree"], { box: [-190, -430, 380, 450] });

regT("nat-bamboo", (o) => {
  let s = L.shadow(0, 0, 200);
  const culm = (x, h, lean, w) => { const pts = [[x, 0], [x + lean * 0.5, -h * 0.5], [x + lean, -h]]; let t = LB(pts, w, w * 0.8, "green", { tone: 1 }) + hi(L.limb(pts.map(([a, b]) => [a - w * 0.22, b]), w * 0.25, w * 0.2), "green", 0.7);
    const nodes = Math.round(h / 62); for (let i = 1; i <= nodes; i++) { const k = i / (nodes + 0.4), cx = x + lean * k * (k < 0.5 ? 1 : 1), cy = -h * k, ww = w * (1.1 - 0.25 * k); t += L.stroke(L.poly([[cx - ww * 0.62, cy], [cx + ww * 0.62, cy]]), { c: L.c("green", 2), w: 6 }); }
    return t; };
  const lf = (x, y, a, l) => leaf(x, y, a, l, "green", { tone: 1, wd: 0.16 });
  s += culm(-46, 300, -8, 24) + culm(44, 270, 10, 22) + culm(0, 380, 4, 28);
  [[-50, -242, -150, 54], [-52, -180, -30, 50], [-54, -270, -60, 48], [38, -216, -35, 52], [42, -150, -145, 48], [48, -250, -115, 46], [6, -330, -140, 62], [8, -372, -45, 58], [4, -270, -20, 58], [8, -300, -165, 54]].forEach(([x, y, a, l]) => { s += lf(x, y, a, l); });
  return s + [[-70, -4], [-20, -2], [26, 0], [70, -4]].map(([x, y]) => L.flat(L.circ(x, y, 12, 5), "grass", 0.9)).join("");
}, G, "Bamboo", ["tree", "plant", "panda", "asia", "grass", "tall"], { box: [-160, -440, 320, 450] });

regTN("nat-sequoia", (o) => {
  const tr = L.smooth([[-52, 0], [-32, -60], [-28, -240], [-24, -420], [24, -420], [28, -240], [32, -60], [52, 0], [-52, 0]]);
  let s = L.shadow(0, 0, 220) + L.shape(tr, "brown", { tone: 1 }) + hi(L.smooth([[-38, -10], [-24, -70], [-20, -240], [-16, -410], [-8, -410], [-12, -240], [-16, -70], [-24, -10]]), "wood", 0.5) + clip(tr, dk(L.rect(8, -430, 40, 440), "brown", 0.5));
  s += bark([[[-14, -20], [-12, -120], [-14, -220]], [[8, -40], [10, -160], [8, -300]], [[20, -20], [18, -90]]], "brown");
  [[0, -400, 104, 62, 0], [-10, -470, 84, 52, 1], [6, -530, 62, 44, 2], [-72, -250, 52, 30, 3], [74, -310, 50, 28, 4], [-60, -330, 52, 30, 5], [64, -400, 52, 28, 6]].forEach(([x, y, rx, ry, i]) => { s += L.shape(blob(x, y, rx, ry, 5, 0.1, i), "green", { tone: i % 2 ? 1 : 0 }); });
  s += hi(blob(-24, -420, 52, 22, 3, 0.1, 0.5), "green", 0.5) + hi(blob(-8, -480, 40, 16, 3, 0.1, 1), "green", 0.5);
  return s;
}, G, "Giant sequoia", ["tree", "redwood", "tall", "forest", "california"], { box: [-150, -610, 300, 620] });

regT("nat-willow", (o) => {
  const r = seed(7), dome = blob(0, -262, 150, 78, 8, 0.07, 0.4);
  const strand = (x, len, tn, w0 = 18) => { const topY = -262 + 60 * Math.sqrt(Math.max(0, 1 - (x / 150) ** 2)), k = Math.sign(x) || 1, sw = (r() - 0.5) * 30, bow = k * (4 + r() * 8);
    return LB([[x, topY - 10], [x + bow * 0.6, topY + len * 0.3], [x + bow + sw * 0.5, topY + len * 0.65], [x + bow * 0.5 + sw, topY + len]], w0, 3, "green", { tone: tn, w: "hair" }); };
  let s = L.shadow(0, 0, 280);
  for (let i = 0; i < 16; i++) s += strand(-146 + i * 19.5 + (r() - 0.5) * 8, 70 + r() * 70, 1, 16);
  s += LB([[0, 0], [-8, -90], [14, -170], [8, -230]], 40, 22, "wood") + LB([[10, -190], [60, -240], [100, -250]], 16, 8, "wood") + LB([[0, -190], [-50, -240], [-100, -250]], 16, 8, "wood");
  s += L.shape(dome, "green", { tone: 1 });
  for (let i = 0; i < 26; i++) { const x = -148 + i * 11.4 + (r() - 0.5) * 6; if (Math.abs(x) < 26) continue; s += strand(x, 80 + r() * 75 + Math.abs(x) * 0.25, i % 3 === 0 ? 1 : 0); }
  s += hi(blob(-40, -300, 80, 28, 3, 0.1, 0.5), "green", 0.5);
  return s;
}, G, "Weeping willow", ["tree", "river", "pond", "hanging"], { box: [-190, -380, 380, 390] });

regT("nat-acacia", (o) => {
  let s = L.shadow(0, 0, 250) + LB([[-6, 0], [-4, -90], [-24, -170], [-70, -220]], 30, 16, "wood") + LB([[-8, -100], [20, -170], [66, -226]], 20, 10, "wood") + LB([[-20, -150], [-10, -210], [-4, -250]], 14, 8, "wood");
  [[-96, -250, 95, 30, 0], [70, -258, 100, 30, 1], [-8, -282, 112, 34, 2]].forEach(([x, y, rx, ry, i]) => { s += L.shape(blob(x, y, rx, ry, 6, 0.1, i, 4), "green", { tone: i % 2 ? 1 : 0 }); });
  s += hi(blob(-12, -296, 70, 14, 3, 0.1, 0.5), "green", 0.5);
  return s;
}, G, "Acacia", ["tree", "savanna", "africa", "flat top", "safari"], { box: [-220, -340, 440, 350] });

regTN("nat-apple-tree", (o) => {
  const apples = [[-74, -250], [-20, -300], [50, -262], [86, -214], [-100, -192], [4, -216], [-52, -166], [64, -312]];
  let s = L.shadow(0, 0, 250) + LB([[0, 0], [-4, -100], [4, -170]], 44, 28, "wood") + LB([[0, -130], [-50, -180], [-76, -222]], 16, 8, "wood") + LB([[2, -130], [56, -180], [78, -220]], 16, 8, "wood");
  s += L.shape(blob(0, -250, 132, 112, 7, 0.1), "green") + hi(blob(-44, -296, 58, 36, 3, 0.1, 0.5), "green", 0.6) + clip(blob(0, -250, 132, 112, 7, 0.1), dk(L.rect(-20, -190, 170, 120), "green", 0.25));
  apples.forEach(([x, y]) => { s += B(x, y, 15, 14, "red") + L.flat(L.circ(x - 5, y - 5, 4, 3), "white", 0.6) + ln([x, y - 12], [x + 2, y - 19], { c: L.c("brown", 0) }); });
  s += B(-70, -10, 14, 13, "red") + B(40, -6, 13, 12, "red") + L.flat(L.circ(-75, -15, 4, 3), "white", 0.6) + L.flat(L.circ(36, -10, 4, 3), "white", 0.6);
  return s;
}, G, "Apple tree", ["tree", "fruit", "orchard", "garden", "apples"], { box: [-190, -400, 380, 410] });

reg("nat-bonsai", (o) => {
  let s = L.shadow(0, 0, 230) + R(-96, -26, 192, 26, 10, "brown", { tone: 1 }) + R(-70, -70, 140, 46, 14, "terracotta" in L.BASE ? "terracotta" : "orange", { tone: 0 }) + L.flat(L.rrect(-62, -66, 124, 12, 6), "earth", 0.9);
  s += LB([[0, -64], [-14, -110], [18, -150], [-4, -196]], 26, 12, "wood") + LB([[8, -130], [60, -150], [92, -170]], 11, 6, "wood") + LB([[-8, -170], [-60, -186], [-84, -214]], 10, 6, "wood");
  [[0, -222, 66, 38, 0], [-86, -236, 46, 26, 1], [96, -190, 46, 26, 2]].forEach(([x, y, rx, ry, i]) => { s += L.shape(blob(x, y, rx, ry, 5, 0.12, i), "green", { tone: i === 0 ? 0 : 1 }) + hi(blob(x - rx * 0.3, y - ry * 0.4, rx * 0.5, ry * 0.4, 3, 0.1), "green", 0.5); });
  return s;
}, G, "Bonsai", ["tree", "small", "pot", "japan", "zen"], { box: [-150, -280, 300, 290] });

reg("nat-tree-rings", (o) => {
  const rg = seed(11), rings = [];
  let s = L.shadow(0, 150, 300).replace(/<ellipse[^>]*\/>/, "");
  const wob = (r, ph) => L.smooth(Array.from({ length: 33 }, (_, i) => { const a = (i % 32) / 32 * Math.PI * 2; return [Math.cos(a) * r * (1 + 0.035 * Math.sin(3 * a + ph) + 0.02 * Math.sin(5 * a)), Math.sin(a) * r * (1 + 0.035 * Math.sin(3 * a + ph) + 0.02 * Math.sin(5 * a))]; }));
  s += L.shape(wob(150, 0.5), "brown", { tone: 1 }) + L.shape(wob(136, 0.5), "wood", { tone: 1, w: "detail" });
  [118, 100, 84, 70, 56, 44, 33, 23, 14].forEach((r, i) => { s += L.tag("path", { d: wob(r, 0.5 + i * 0.3), fill: "none", stroke: L.c("wood", 2), "stroke-width": i % 3 === 0 ? 5 : 3, opacity: 0.85 }); });
  s += B(2, 0, 6, 6, "brown", { w: "detail", flat: true }) + L.stroke("M0 0 L128 -26", { c: L.c("wood", 2), w: 4, op: 0.6 }) + L.stroke("M0 0 L-80 118", { c: L.c("wood", 2), w: 3, op: 0.5 });
  s += hi(L.arc(0, 0, 124, 190, 262), "wood", 0.0);
  return s + L.tag("path", { d: L.arc(0, 0, 128, 195, 255), fill: "none", stroke: L.c("wood", 1), "stroke-width": 8, opacity: 0.55, "stroke-linecap": "round" });
}, G, "Tree rings (cut trunk)", ["tree", "age", "cross-section", "years", "growth rings", "wood"], { box: [-170, -170, 340, 340] });

reg("nat-stump", (o) => {
  const top = L.circ(0, -108, 92, 30), side = L.smooth([[-92, -108], [-100, -50], [-124, 0], [-60, 10], [0, 12], [60, 10], [124, 0], [100, -50], [92, -108]]);
  let s = L.shadow(0, 8, 300) + L.shape(side, "wood", { tone: 1 }) + clip(side, dk(L.rect(30, -120, 120, 140), "wood", 0.4)) + bark([[[-60, -90], [-70, -40], [-80, -4]], [[20, -80], [24, -30], [30, 8]], [[70, -84], [84, -30]]]) +
    L.shape(top, "sand", { tone: 1 }) + [66, 46, 26].map((r, i) => L.tag("ellipse", { cx: 0, cy: -108, rx: r, ry: r * 0.33, fill: "none", stroke: L.c("wood", 1), "stroke-width": 3 })).join("") + dot(0, -108, 4, "wood", 0.8) +
    leaf(78, -26, -30, 30, "green", { wd: 0.3 }) + B(-96, -4, 20, 10, "green", { tone: 1, w: "detail" });
  return s;
}, G, "Tree stump", ["tree", "logging", "forest", "rings", "cut"], { box: [-150, -170, 300, 200] });

reg("nat-log-mossy", (o) => {
  const log = L.smooth([[-150, -36], [-80, -62], [90, -62], [140, -42], [150, 0], [90, 8], [-80, 8], [-150, 0], [-150, -36]]);
  let s = L.shadow(0, 8, 340) + L.shape(log, "wood", { tone: 1 }) + clip(log, dk(L.rect(-160, -20, 320, 40), "wood", 0.4)) + bark([[[-100, -50], [-60, -40]], [[-20, -56], [30, -44]], [[60, -30], [110, -20]], [[-90, -14], [-40, -6]]]);
  s += L.shape(blob(-20, -64, 110, 22, 6, 0.1), "green", { w: "detail", tone: 1 }) + hi(blob(-50, -72, 60, 10, 3, 0.1), "green", 0.5);
  s += L.shape(L.circ(150, -22, 20, 30), "sand", { tone: 1 }) + L.tag("ellipse", { cx: 150, cy: -22, rx: 12, ry: 19, fill: "none", stroke: L.c("wood", 1), "stroke-width": 2.5 }) + L.tag("ellipse", { cx: 150, cy: -22, rx: 5, ry: 9, fill: "none", stroke: L.c("wood", 1), "stroke-width": 2.5 });
  s += LB([[60, -64], [60, -86]], 8, 8, "cream") + P([[40, -86], [48, -104], [76, -104], [84, -86]], "red", { w: "detail" }) + dot(58, -95, 3, "white") + dot(70, -98, 2.5, "white");
  return s;
}, G, "Mossy fallen log", ["tree", "forest", "decay", "moss", "log"], { box: [-190, -140, 380, 170] });

// ===================== PLANTS AND GROWTH =====================
const GP = "Plants and flowers", GG = "Growth and roots";
const lab = (o, s, x, y, size = 30) => (o.labels === false ? "" : L.text(s, x, y, { size, halo: "paper", haloW: 0.2 }));
const stem = (pts, w0 = 12, w1 = 8, c = "green") => LB(pts, w0, w1, c, { tone: 2, w: "detail" });
const drop = (x, y, s = 1) => L.shape(L.smooth([[x, y - 16 * s], [x + 9 * s, y], [x + 7 * s, y + 10 * s], [x, y + 13 * s], [x - 7 * s, y + 10 * s], [x - 9 * s, y], [x, y - 16 * s]]), "water", { w: "detail" }) + L.flat(L.circ(x - 3 * s, y + 2 * s, 2.5 * s, 4 * s), "white", 0.7);

reg("nat-rose", (o) => {
  let s = L.shadow(0, 0, 150) + stem([[0, 0], [10, -70], [-6, -140], [0, -214]], 12, 9) + leaf(6, -60, -30, 62, "green") + leaf(-4, -120, -150, 58, "green") + leaf(4, -30, -150, 44, "green");
  [[8, -92, 1], [-8, -150, -1], [6, -40, 1]].forEach(([x, y, d]) => { s += T([[x, y], [x + d * 12, y - 5], [x + d * 3, y - 14]], "green", { w: "hair", tone: 2 }); });
  s += B(0, -252, 52, 48, "red", { tone: 2 }) + P([[-48, -262], [-30, -300], [14, -300], [44, -272], [30, -222], [-26, -220]], "red") +
    P([[-34, -262], [-16, -290], [22, -284], [32, -258], [4, -236], [-24, -242]], "red", { tone: 1, w: "detail" }) + P([[-18, -262], [0, -278], [20, -266], [12, -246], [-8, -246]], "red", { tone: 2, w: "detail" }) +
    sm([[-6, -262], [4, -266], [8, -256], [-2, -250]], { c: L.c("red", 2) }) + sm([[-38, -230], [-14, -216], [14, -216], [38, -232]], { c: L.c("red", 2) }) + hi(L.circ(-22, -280, 12, 7), "red", 0.6);
  return s;
}, GP, "Rose", ["flower", "red", "love", "romantic", "thorns", "garden"], { box: [-110, -330, 220, 340] });

reg("nat-water-lily", (o) => {
  const pad = L.poly(Array.from({ length: 41 }, (_, i) => { const a = (18 + i * 8.55) * D2R; return [Math.cos(a) * 118, Math.sin(a) * 30]; }).concat([[0, 0]]), true);
  let s = [150, 118].map((rx, i) => L.tag("ellipse", { cx: 0, cy: 6, rx, ry: rx * 0.17, fill: "none", stroke: L.c("water", 2), "stroke-width": 3, opacity: 0.7 - i * 0.25 })).join("");
  s += L.shape(pad, "green", { tone: 1 }) + hi(L.smooth([[-92, -6], [-40, -16], [30, -14], [60, -8]]), "green", 0.6) + sm([[0, 0], [60, 14]], { c: L.c("green", 2) }) + sm([[0, 0], [-70, 12]], { c: L.c("green", 2) });
  [-72, 72, -40, 40].forEach((a, i) => { s += L.shape(leafD(0, -6, -90 + (i < 2 ? (a < 0 ? -62 : 62) : a < 0 ? -32 : 32), 70, 0.3), "pink", { w: "detail", tone: i < 2 ? 2 : 0 }); });
  s += L.shape(leafD(0, -6, -90, 78, 0.3), "pink", { w: "detail", tone: 1 }) + B(0, -12, 12, 7, "yellow", { w: "detail" });
  return s;
}, GP, "Water lily", ["flower", "lotus", "pond", "lily pad", "water plant"], { box: [-160, -110, 320, 160] });

reg("nat-fern", (o) => {
  const frond = (pts, n, len) => { const cu = L.smooth(pts); let d = ""; const at = (t) => { const k = t * (pts.length - 1), i = Math.min(pts.length - 2, Math.floor(k)), f = k - i, a = pts[i], b = pts[i + 1]; return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, Math.atan2(b[1] - a[1], b[0] - a[0]) / D2R]; };
    for (let i = 1; i <= n; i++) { const t = 0.1 + 0.88 * (i / n), [x, y, a] = at(t), l = len * (1 - t * 0.78); d += leafD(x, y, a + 68, l, 0.24) + leafD(x, y, a - 68, l, 0.24); }
    return L.shape(d, "green", { w: "detail" }) + L.stroke(cu, { c: L.c("green", 2), w: 5 }); };
  return L.shadow(0, 0, 220) + frond([[0, 0], [-60, -90], [-120, -130], [-150, -120]], 11, 56).replace(/$/, "") + frond([[0, 0], [60, -80], [110, -120], [140, -112]], 11, 54) + frond([[0, 0], [-8, -110], [4, -190], [20, -240]], 13, 62) + B(0, 0, 18, 8, "green", { tone: 2, w: "detail" });
}, GP, "Fern", ["plant", "forest", "frond", "leaf", "jungle", "prehistoric"], { box: [-180, -270, 360, 280] });

reg("nat-moss", (o) => {
  const rock = L.smooth([[-110, 0], [-124, -40], [-80, -86], [-10, -98], [70, -84], [118, -40], [120, 0], [-110, 0]]);
  let s = L.shadow(0, 0, 270) + L.shape(rock, "stone") + clip(rock, dk(L.smooth([[20, -100], [130, -40], [130, 6], [30, 6]]), "stone", 0.5)) + hi(L.circ(-60, -50, 20, 12), "stone", 0.6);
  s += L.shape(blob(-14, -92, 96, 34, 9, 0.12, 0.3), "green", { tone: 1 })  + hi(blob(-44, -108, 50, 14, 4, 0.1), "green", 0.6);
  [[-50, -112], [-6, -122], [32, -110], [64, -100]].forEach(([x, y]) => { s += LB([[x, y + 10], [x + 4, y - 16]], 4, 3, "green", { w: "hair", tone: 2 }) + B(x + 4, y - 20, 6, 8, "gold", { w: "hair" }); });
  return s;
}, GP, "Mossy rock", ["moss", "rock", "forest", "damp", "green", "stone"], { box: [-150, -170, 300, 190] });

reg("nat-venus-flytrap", (o) => {
  const trap = (x, y, rot, open, tilt = 0) => { const lowD = "M-46 0 A46 32 0 0 0 46 0 Z", upD = "M-46 0 A46 32 0 0 1 46 0 Z"; let teeth = (dir) => { let d = ""; for (let i = -4; i <= 4; i++) d += L.poly([[i * 10 - 4, 0], [i * 10, dir * 15], [i * 10 + 4, 0]], true); return L.shape(d, "green", { w: "hair", tone: 2 }); };
    const lower = L.shape(lowD, "green", { tone: 1 }) + L.shape("M-40 0 A40 24 0 0 0 40 0 Z", "red", { w: "hair", flat: true }) + teeth(-1);
    const upper = L.g(L.shape(upD, "green") + L.shape("M-40 0 A40 24 0 0 1 40 0 Z", "red", { w: "hair", flat: true }) + teeth(1), `rotate(${-open} 46 0)`);
    return L.g(lower + upper, `translate(${x} ${y}) rotate(${rot})`); };
  let s = L.shadow(0, 0, 200) + stem([[0, 0], [-30, -60], [-70, -90]], 14, 10) + stem([[0, 0], [30, -50], [64, -70]], 14, 10) + stem([[0, 0], [-6, -80], [4, -150]], 14, 10);
  s += leaf(0, -4, -150, 70, "green", { tone: 1 }) + leaf(0, -4, -30, 62, "green", { tone: 1 }) + trap(-70, -96, -24, 0) + trap(64, -78, 12, 56) + trap(4, -168, -90, 0).replace(/$/, "");
  return s + dot(112, -164, 5) + L.tag("ellipse", { cx: 106, cy: -176, rx: 9, ry: 4, fill: L.c("glass"), stroke: L.c("ink"), "stroke-width": 1.5, opacity: 0.9, transform: "rotate(-30 106 -176)" });
}, GP, "Venus flytrap", ["plant", "carnivorous", "insect eater", "trap", "swamp"], { box: [-150, -230, 300, 240] });

reg("nat-dandelion", (o) => {
  const cx = 6, cy = -210;
  let rays = "", tips = "";
  for (let i = 0; i < 32; i++) { const a = i * 360 / 32, [x, y] = pol(58, a, cx, cy); rays += L.line([cx, cy], [x, y]); tips += L.circ(x, y, 5.5); }
  let s = L.shadow(0, 0, 120) + stem([[0, 0], [-6, -80], [cx, cy + 10]], 8, 6) + leaf(-2, -6, -150, 62, "green", { wd: 0.3 }) + leaf(2, -6, -30, 56, "green", { wd: 0.3 });
  s += L.stroke(rays, { c: L.c("gray", 1), w: 2.5 }) + L.shape(tips, "white", { w: "hair" }) + B(cx, cy, 12, 12, "brown", { w: "detail", tone: 1 });
  [[96, -300, 20], [128, -250, -30], [70, -340, 50]].forEach(([x, y, a]) => { let w = ""; for (let k = -2; k <= 2; k++) w += L.line([x, y], pol(14, a - 90 + k * 24, x, y)); s += ln([x, y], pol(-16, a - 90, x, y), { w: "detail" }) + L.stroke(w, { c: L.c("gray", 1), w: 2 }); });
  return s;
}, GP, "Dandelion", ["flower", "wish", "seeds", "wind", "weed", "puffball"], { box: [-110, -360, 260, 370] });

reg("nat-lavender", (o) => {
  let s = L.shadow(0, 0, 170);
  [[-40, 250, -10], [0, 300, 2], [42, 260, 12]].forEach(([x, h, lean]) => { const top = [x + lean, -h]; s += stem([[x * 0.6, 0], [x + lean * 0.5, -h * 0.5], top], 7, 4);
    let b = ""; for (let i = 0; i < 9; i++) { const t = i / 9, yy = -h + 6 + i * 11, w = 14 - i * 0.4; b += L.circ(top[0] - w * 0.55, yy, w * 0.6, 7) + L.circ(top[0] + w * 0.55, yy + 4, w * 0.6, 7); } s += L.shape(b + L.circ(top[0], -h - 12, 8, 12), "purple", { w: "detail", tone: 1 }); });
  for (let i = 0; i < 6; i++) s += leaf(-4 + (i % 3) * 4, -2, -90 + (i - 2.5) * 22, 120, "green", { wd: 0.07, w: "hair", vein: false });
  return s;
}, GP, "Lavender", ["flower", "purple", "herb", "garden", "scent", "bee"], { box: [-110, -350, 220, 360] });

reg("nat-wheat", (o) => {
  let s = L.shadow(0, 0, 190);
  [[-46, 260, -14], [0, 300, 0], [46, 270, 14]].forEach(([x, h, lean]) => { const top = [x + lean, -h]; s += stem([[x * 0.4, 0], [x + lean * 0.4, -h * 0.5], top], 6, 4, "gold");
    let g1 = "", g2 = ""; for (let i = 0; i < 8; i++) { const y = -h + 8 + i * 16, px = top[0] - 0.03 * lean * i; g1 += leafD(px, y, -118, 30, 0.3); g2 += leafD(px, y, -62, 30, 0.3); } s += L.shape(g1, "gold", { w: "hair", tone: 1 }) + L.shape(g2, "gold", { w: "hair" });
    s += L.shape(leafD(top[0], -h + 2, -90, 28, 0.3), "gold", { w: "hair", tone: 1 }); for (let k = -2; k <= 2; k++) s += ln([top[0], -h + 4], [top[0] + k * 8 + lean * 0.4, -h - 52], { c: L.c("gold", 2), w: 2 }); });
  return s + leaf(0, -2, -150, 120, "green", { wd: 0.08, vein: false }) + leaf(0, -2, -30, 110, "green", { wd: 0.08, vein: false });
}, GP, "Wheat", ["grain", "crop", "farm", "bread", "harvest", "cereal"], { box: [-130, -380, 260, 390] });

// ---------- growth stages (soil cross-section, ground line at y = 0) ----------
const GB = [-150, -275, 300, 505];
const SOILW = 250;
const plantBox = (inner) => soil(-SOILW / 2, 0, SOILW, 170, { stones: false }) + inner;
const rootLine = (pts, w = 8) => LB(pts, w, w * 0.4, "cream", { w: "detail", tone: 2 });
const STAGES = {
  seed: (o) => plantBox(drop(-60, -90) + drop(50, -60, 0.8) + B(0, 74, 22, 15, "wood", { tone: 1 }) + hi(L.circ(-7, 68, 8, 4), "wood", 0.7) + lab(o, "seed", 0, 206, 28)),
  sprout: (o) => plantBox(rootLine([[0, 80], [4, 110], [-6, 140]], 10) + rootLine([[2, 100], [30, 118]], 6) + stem([[0, 76], [2, 36], [0, -20]], 8, 6) + leaf(0, -14, -150, 44, "green", { tone: 1, wd: 0.32 }) + leaf(0, -14, -30, 44, "green", { tone: 1, wd: 0.32 }) + B(0, 82, 18, 12, "wood", { tone: 1, w: "detail" }) + lab(o, "sprout", 0, 206, 28)),
  sapling: (o) => plantBox(rootLine([[0, 20], [2, 80], [-4, 150]], 10) + rootLine([[2, 60], [-40, 90], [-70, 130]], 6) + rootLine([[2, 80], [44, 104], [64, 140]], 6) + rootLine([[-20, 120], [-30, 150]], 4) + stem([[0, 24], [-2, -60], [4, -130]], 10, 7) +
    leaf(-2, -50, -150, 56, "green", { tone: 1, wd: 0.3 }) + leaf(0, -70, -30, 56, "green", { tone: 1, wd: 0.3 }) + leaf(2, -104, -145, 52, "green", { tone: 1, wd: 0.3 }) + leaf(4, -122, -38, 52, "green", { tone: 1, wd: 0.3 }) + leaf(4, -130, -90, 44, "green", { tone: 1, wd: 0.3 }) + lab(o, "seedling", 0, 206, 28)),
  bloom: (o) => plantBox(rootLine([[0, 20], [2, 80], [-4, 154]], 11) + rootLine([[2, 56], [-46, 86], [-80, 134]], 7) + rootLine([[2, 80], [52, 104], [80, 142]], 7) + rootLine([[-30, 100], [-52, 150]], 4) + rootLine([[40, 98], [44, 150]], 4) + stem([[0, 24], [-3, -90], [3, -190]], 12, 8) +
    leaf(-2, -50, -155, 72, "green", { tone: 1, wd: 0.3 }) + leaf(0, -90, -25, 72, "green", { tone: 1, wd: 0.3 }) + leaf(2, -130, -150, 60, "green", { tone: 1, wd: 0.3 }) +
    [0, 1, 2, 3, 4, 5, 6, 7].map((i) => L.shape(leafD(...pol(10, i * 45, 3, -204).concat([i * 45, 46, 0.3])), "yellow", { w: "detail", tone: i % 2 })).join("") + B(3, -204, 17, 17, "orange", { w: "detail" }) + hi(L.circ(-2, -209, 6, 4), "orange", 0.7) + lab(o, "flower", 0, 206, 28)),
};
[["seed", "Seed in soil", ["seed", "planting", "start", "germination"]], ["sprout", "Sprouting seed", ["sprout", "germination", "roots", "shoot"]], ["sapling", "Seedling", ["seedling", "young plant", "leaves", "growing"]], ["bloom", "Flowering plant", ["bloom", "flower", "adult plant", "grown"]]].forEach(([k, label, tags]) =>
  reg("nat-grow-" + k, STAGES[k], GG, label, ["growth", "plant", "stage", "soil", "cross-section"].concat(tags), { box: GB, call: `L.put(S, "nat-grow-${k}", x, gy, { s: 1, t, labels: false })` }));
reg("nat-grow-strip", (o) => {
  let s = "";
  ["seed", "sprout", "sapling", "bloom"].forEach((k, i) => { const x = -450 + i * 300; s += L.g(STAGES[k](Object.assign({}, o, { labels: o.labels === true })), `translate(${x} 20) scale(0.85)`); if (i < 3) s += L.stroke(L.poly([[x + 130, 60], [x + 170, 60]]), { w: "prop" }) + L.stroke(L.poly([[x + 156, 46], [x + 172, 60], [x + 156, 74]]), { w: "prop" }); });
  return s;
}, GG, "Plant life cycle strip", ["growth", "plant", "stages", "timeline", "seed to flower", "life cycle"], { box: [-600, -230, 1200, 420], wide: true, call: 'L.put(S, "nat-grow-strip", x, gy, { s: 0.8, t })', demo: {} });

reg("nat-roots", (o) => {
  const r = seed(5); let roots = "";
  const branch = (x, y, ang, len, w, depth) => { const pts = [[x, y]]; let cx = x, cy = y, a = ang; for (let i = 1; i <= 3; i++) { a += (r() - 0.5) * 24; cx += Math.cos(a * D2R) * len / 3; cy += Math.sin(a * D2R) * len / 3; pts.push([cx, cy]); }
    roots += LB(pts, w, w * 0.45, "cream", { w: "detail", tone: 2 }); if (depth > 0) { branch(pts[2][0], pts[2][1], a + 38 + r() * 20, len * 0.62, w * 0.55, depth - 1); branch(pts[2][0], pts[2][1], a - 38 - r() * 20, len * 0.62, w * 0.55, depth - 1); } };
  branch(0, 24, 90, 130, 18, 0); branch(0, 60, 40, 120, 11, 2); branch(0, 60, 140, 120, 11, 2); branch(0, 120, 70, 90, 9, 2); branch(0, 120, 112, 90, 9, 1);
  let s = soil(-250, 0, 500, 270) + roots;
  s += L.g(LB([[-170, 190], [-150, 176], [-130, 192], [-110, 178], [-92, 190]], 14, 12, "pink", { w: "detail" }) + dot(-96, 186, 2.5), "") + drop(150, 130) + drop(190, 170, 0.8) + drop(120, 200, 0.8);
  s += L.stroke(L.poly([[170, 70], [170, 108]]), { c: L.c("water", 2), w: 4 }) + L.stroke(L.poly([[160, 98], [170, 110], [180, 98]]), { c: L.c("water", 2), w: 4 });
  s += stem([[0, 28], [-3, -80], [3, -170]], 18, 12) + leaf(-2, -60, -155, 80, "green", { tone: 1, wd: 0.3 }) + leaf(0, -100, -25, 80, "green", { tone: 1, wd: 0.3 }) + leaf(2, -140, -150, 66, "green", { tone: 1, wd: 0.3 }) + leaf(3, -160, -40, 66, "green", { tone: 1, wd: 0.3 }) + leaf(3, -176, -92, 56, "green", { tone: 1, wd: 0.3 });
  return s + lab(o, "roots", -150, 230, 30) + lab(o, "stem", 90, -80, 30) + lab(o, "water", 190, 240, 26).replace(/$/, "");
}, GG, "Roots cross-section", ["roots", "soil", "underground", "plant", "water", "nutrients", "cross-section"], { box: [-270, -250, 540, 540], call: 'L.put(S, "nat-roots", x, gy, { s: 1, t, labels: false })' });

// ===================== MUSHROOMS AND FRUIT =====================
const GM = "Mushrooms and fruit";
const cap = (x, y, w, h, c, spots, tone = 0, gills = false) => {
  const d = L.smooth([[x - w, y], [x - w * 0.92, y - h * 0.62], [x, y - h], [x + w * 0.92, y - h * 0.62], [x + w, y], [x, y + 8], [x - w, y]]);
  return L.shape(d, c, { tone }) + clip(d, spots.map(([a, b, r]) => B(x + a * w, y + b * h, r, r * 0.8, "white", { w: "hair", flat: true })).join("") + dk(L.rect(x + w * 0.35, y - h, w, h + 10), c, 0.35)) + rim(d, c) + hi(L.circ(x - w * 0.4, y - h * 0.72, w * 0.22, h * 0.1), c, 0.7);
};
reg("nat-mushrooms", (o) => {
  const m = (x, h, w, cw, ch, c, spots, tone) => LB([[x, 0], [x + 2, -h]], w, w * 0.8, "cream", { tone: 1 }) + cap(x, -h + 6, cw, ch, c, spots, tone);
  let s = L.shadow(0, 0, 260) + m(-70, 70, 28, 62, 56, "red", [[-0.4, -0.5, 7], [0.1, -0.78, 6], [0.45, -0.4, 8], [-0.1, -0.3, 5]]) + m(56, 100, 22, 50, 50, "wood", [], 1) + m(10, 46, 18, 36, 34, "cream", [], 1);
  for (const x of [-120, -20, 100, 130]) s += leaf(x, -2, -90 - (x % 3) * 20, 40, "green", { wd: 0.1, w: "hair", vein: false });
  return s;
}, GM, "Mushrooms", ["fungi", "toadstool", "forest", "red cap", "spores", "fungus"], { box: [-170, -190, 340, 200] });

reg("nat-mycelium", (o) => {
  const r = seed(9); let net = "";
  const tree = (x, h) => L.shape(blob(x, -h - 24, 66, 54, 6, 0.1, x), "green") + hi(blob(x - 20, -h - 40, 28, 18, 3, 0.1), "green", 0.5) + LB([[x, 0], [x, -h]], 22, 16, "wood") + [[-1, 1], [1, 1]].map(([d]) => rootLine([[x, 16], [x + d * 40, 70], [x + d * 70, 120]], 9)).join("");
  let s = soil(-300, 0, 600, 260) + tree(-220, 90) + tree(220, 110);
  const thread = (a, b, mid) => { net += L.stroke(L.smooth([a, mid, b]), { c: L.c("white"), w: 4 }); };
  [[[-20, 40], [-190, 100], [-110, 90]], [[20, 40], [190, 110], [110, 100]], [[0, 50], [-120, 190], [-60, 120]], [[0, 50], [130, 200], [60, 130]], [[-190, 100], [-240, 200], [-230, 150]], [[190, 110], [250, 210], [230, 160]], [[-110, 90], [-40, 220], [-80, 170]], [[110, 100], [30, 230], [70, 180]]].forEach(([a, b, m]) => thread(a, b, m));
  for (let i = 0; i < 10; i++) { const x = -250 + r() * 500, y = 80 + r() * 150; net += L.stroke(L.smooth([[x, y], [x + (r() - 0.5) * 50, y + 22], [x + (r() - 0.5) * 70, y + 40]]), { c: L.c("white"), w: 2.5 }); }
  s += net + [[-190, 100], [190, 110], [0, 50], [-120, 190], [130, 200]].map(([x, y]) => dot(x, y, 7, "yellow", 0.9)).join("");
  s += LB([[0, 0], [2, -50]], 26, 20, "cream", { tone: 1 }) + cap(0, -44, 62, 56, "red", [[-0.4, -0.5, 7], [0.1, -0.78, 6], [0.45, -0.4, 8]]) + LB([[-60, 2], [-52, -26]], 14, 12, "cream") + cap(-56, -22, 24, 22, "red", [[0, -0.5, 4]]);
  return s + lab(o, "fungus network", 0, 238, 28);
}, GM, "Fungus network underground", ["mycelium", "wood wide web", "roots", "fungi", "soil", "cross-section", "forest"], { box: [-320, -240, 640, 520], call: 'L.put(S, "nat-mycelium", x, gy, { s: 0.8, t, labels: false })' });

const branchWith = (fruit, o2 = {}) => (o) => {
  let s = LB([[-200, -26], [-100, -40], [10, -30], [120, -46], [200, -34]], 14, 7, "wood") + LB([[-60, -38], [-40, -74], [-8, -96]], 7, 4, "wood");
  [[-150, -36, -70], [-90, -40, -120], [-20, -38, -60], [70, -34, -115], [150, -44, -65], [-30, -80, -100], [-70, -38, 60], [40, -34, 115], [110, -44, 70]].forEach(([x, y, a]) => { s += leaf(x, y, a, 62, "green", { tone: 1, wd: 0.3 }); });
  return s + [[-120, -34], [-44, -36], [38, -32], [112, -44]].map(([x, y], i) => fruit(x, y, i, o)).join("");
};
const applesF = (x, y, i) => LB([[x, y], [x + 2, y + 22]], 4, 3, "wood", { w: "hair" }) + B(x + 2, y + 50, 29, 27, i % 3 === 1 ? "yellow" : "red") + L.flat(L.circ(x - 8, y + 38, 8, 5), "white", 0.55) + sm([[x + 2, y + 26], [x + 2, y + 30]]) + dk(L.circ(x + 14, y + 62, 14, 10), i % 3 === 1 ? "yellow" : "red", 0.3);
reg("nat-branch-apples", branchWith(applesF), GM, "Branch with apples", ["fruit", "tree", "orchard", "harvest", "ripe", "autumn"], { box: [-220, -170, 440, 290], call: 'L.put(S, "nat-branch-apples", x, y, { s: 1, t })' });
reg("nat-branch-cherries", branchWith((x, y, i) => [[-14, 40], [14, 34]].map(([dx, dy]) => sm([[x, y], [x + dx * 0.4, y + dy * 0.6], [x + dx, y + dy + 14]], { c: L.c("green", 2), w: 4 }) + B(x + dx, y + dy + 30, 17, 16, "red", { tone: 2 }) + L.flat(L.circ(x + dx - 5, y + dy + 24, 5, 3), "white", 0.7)).join("")), GM, "Branch with cherries", ["fruit", "tree", "cherry", "red", "summer"], { box: [-220, -170, 440, 290], call: 'L.put(S, "nat-branch-cherries", x, y, { s: 1, t })' });
reg("nat-branch-oranges", branchWith((x, y, i) => LB([[x, y], [x + 2, y + 14]], 4, 3, "wood", { w: "hair" }) + B(x + 2, y + 44, 32, 31, "orange") + L.flat(L.circ(x - 9, y + 32, 9, 6), "white", 0.5) + dk(L.circ(x + 14, y + 58, 16, 12), "orange", 0.3) + [[-10, 50], [8, 40], [14, 56], [-4, 62]].map(([a, b]) => dot(x + 2 + a, y + b, 1.6, "orange", 0.9).replace(/fill="[^"]*"/, `fill="${L.c("orange", 2)}"`)).join("") + leaf(x + 2, y + 14, -40, 22, "green", { w: "hair", vein: false })), GM, "Branch with oranges", ["fruit", "citrus", "tree", "orange", "vitamin c"], { box: [-220, -170, 440, 300], call: 'L.put(S, "nat-branch-oranges", x, y, { s: 1, t })' });
reg("nat-branch-berries", branchWith((x, y, i) => { let b = ""; const cs = [[0, 30, 14], [-18, 46, 13], [18, 44, 13], [0, 62, 14], [-10, 78, 11]]; b += sm([[x, y], [x, y + 28]], { c: L.c("green", 2), w: 4 }); cs.forEach(([a, c, r]) => { b += B(x + a, y + c, r, r, "blue", { tone: 1 }) + L.shape(L.star(x + a, y + c - r * 0.3, r * 0.4, r * 0.2, 5), "navy", { w: "hair", flat: true }) + L.flat(L.circ(x + a - r * 0.35, y + c - r * 0.5, r * 0.25, r * 0.15), "white", 0.5); }); return b; }), GM, "Branch with berries", ["fruit", "blueberry", "bush", "berries", "wild"], { box: [-220, -170, 440, 300], call: 'L.put(S, "nat-branch-berries", x, y, { s: 1, t })' });

// ===================== OCEAN LIFE =====================
const GO = "Ocean life";
const OB = [-170, -150, 340, 300]; // floating creature box
const wavy = (x0, y0, len, amp, n = 5, ph = 0, dir = 1) => Array.from({ length: n + 1 }, (_, i) => [x0 + Math.sin(i * 1.4 + ph) * amp * (0.3 + i / n), y0 + dir * (len * i) / n]);
const mouthSmile = (x, y, w = 10) => sm([[x - w, y], [x, y + w * 0.6], [x + w, y]]);
const fishBody = (pts, c, o) => P(pts, c, o);

const coralBase = (c = "sand") => B(0, -6, 70, 16, c, { tone: 1, w: "detail" });
reg("nat-coral-branch", (o) => {
  const r = seed(3); let s = L.shadow(0, 0, 200) + coralBase(), arms = "";
  const br = (x, y, ang, len, w, d) => { const pts = [[x, y]]; let cx = x, cy = y, a = ang; for (let i = 0; i < 2; i++) { a += (r() - 0.5) * 22; cx += Math.cos(a * D2R) * len / 2; cy += Math.sin(a * D2R) * len / 2; pts.push([cx, cy]); }
    arms += LB(pts, w, w * 0.7, "pink", { tone: d % 2 ? 0 : 1 }) ; if (d > 0) { br(cx, cy, a - 30, len * 0.75, w * 0.78, d - 1); br(cx, cy, a + 28, len * 0.72, w * 0.78, d - 1); } else arms += B(cx, cy, w * 0.45, w * 0.45, "pink", { tone: 1, w: "detail" }); };
  br(0, -10, -90, 100, 38, 3); br(-24, -6, -128, 80, 26, 2); br(24, -6, -52, 80, 26, 2);
  return s + arms;
}, GO, "Staghorn coral", ["coral", "reef", "sea", "pink", "branching"], { box: [-230, -440, 460, 450] });
reg("nat-coral-brain", (o) => {
  const dome = L.smooth([[-110, 0], [-118, -50], [-70, -104], [0, -118], [70, -104], [118, -50], [110, 0], [-110, 0]]);
  let m = ""; for (let i = 0; i < 7; i++) { const y = -104 + i * 17, pts = Array.from({ length: 9 }, (_, k) => [-130 + k * 32, y + Math.sin(k * 1.7 + i * 2.1) * 9]); m += L.stroke(L.smooth(pts), { c: L.c("orange", 2), w: 5, op: 0.8 }); }
  return L.shadow(0, 0, 270) + coralBase() + L.shape(dome, "orange", { tone: 1 }) + clip(dome, m + hi(L.circ(-44, -80, 36, 14), "orange", 0.6) + dk(L.rect(40, -130, 100, 140), "orange", 0.3)) + rim(dome, "orange");
}, GO, "Brain coral", ["coral", "reef", "sea", "dome", "maze"], { box: [-150, -150, 300, 170] });
reg("nat-coral-fan", (o) => {
  const fan = L.smooth([[-4, -26], [-76, -84], [-112, -150], [-96, -214], [-120, -262], [-60, -276], [-30, -310], [8, -280], [46, -314], [70, -268], [124, -262], [100, -200], [116, -140], [80, -80], [4, -26], [-4, -26]]);
  let net = ""; for (let i = 0; i < 11; i++) net += L.line([0, -30], pol(300, -90 + (i - 5) * 14, 0, -30)); for (let k = 1; k <= 5; k++) net += L.arc(0, -30, k * 50, -180 + 8, -8).replace(/^/, "");
  return L.shadow(0, 0, 200) + coralBase() + LB([[0, -4], [0, -40]], 16, 12, "purple", { tone: 2 }) + L.shape(fan, "purple", { tone: 1, op: 0.95 }) + clip(fan, L.stroke(net, { c: L.c("purple", 2), w: 4, op: 0.8 }) + hi(L.circ(-50, -200, 30, 60), "purple", 0.5)) + rim(fan, "purple");
}, GO, "Sea fan coral", ["coral", "reef", "sea", "purple", "fan"], { box: [-160, -340, 320, 360] });
reg("nat-coral-tubes", (o) => {
  let s = L.shadow(0, 0, 230) + coralBase(); const tb = [[-60, 90, 34, "red"], [-18, 150, 38, "pink"], [28, 110, 34, "red"], [66, 70, 28, "pink"], [-96, 60, 26, "pink"]];
  tb.forEach(([x, h, w, c], i) => { s += LB([[x, -4], [x + 2, -h]], w, w * 0.9, c, { tone: i % 2 }) + L.shape(L.circ(x + 2, -h, w * 0.46, w * 0.18), "navy", { w: "detail", flat: true }) + hi(L.rect(x - w * 0.36, -h + 8, w * 0.14, h - 20), c, 0.55); });
  return s;
}, GO, "Organ-pipe coral", ["coral", "reef", "sea", "tubes", "pipes"], { box: [-150, -190, 300, 210] });

const clown = (o = {}) => {
  const body = L.smooth([[-70, 0], [-44, -36], [14, -42], [60, -14], [72, 6], [50, 32], [0, 38], [-50, 24], [-70, 0]]);
  const band = (x, w) => L.shape(L.rect(x, -60, w, 130), "white", { w: "detail", flat: true });
  return P([[-62, 0], [-112, -36], [-100, 0], [-112, 36]], "orange", { tone: 1 }) + P([[-30, -34], [-6, -62], [30, -52], [34, -34]], "orange", { tone: 1 }) + P([[-10, 30], [10, 54], [30, 30]], "orange", { tone: 1, w: "detail" }) +
    L.shape(body, "orange") + clip(body, band(-40, 14) + band(8, 20) + band(52, 10) + dk(L.rect(-70, 12, 160, 40), "orange", 0.3)) + rim(body, "orange") + hi(L.circ(-10, -26, 30, 8), "orange", 0.6) + eye(44, -8, 8, 0.5, o) + mouthSmile(66, 12, 7);
};
reg("nat-clownfish", clown, GO, "Clownfish", ["fish", "orange", "reef", "stripes", "nemo-like", "sea"], { box: [-130, -80, 220, 160], call: 'L.put(S, "nat-clownfish", x, y, { s: 1, flip: false, t })' });
const anemone = (o = {}, front = false) => { let s = "", r = seed(front ? 4 : 2);
  const n = front ? 11 : 13; for (let i = 0; i < n; i++) { const a = -160 + (i / (n - 1)) * 140 + (front ? 6 : 0), len = (front ? 56 : 80) + r() * 24, x0 = (i - (n - 1) / 2) * (front ? 9 : 8), ph = r() * 3; const pts = [[x0, -34], [x0 + Math.cos(a * D2R) * len * 0.45 + Math.sin(ph) * 8, -34 + Math.sin(a * D2R) * len * 0.45], [x0 + Math.cos(a * D2R) * len, -34 + Math.sin(a * D2R) * len]];
    s += LB(pts, 13, 8, front ? "pink" : "purple", { tone: i % 2 ? 1 : 0, w: "detail" }) + B(pts[2][0], pts[2][1], 6, 6, "pink", { tone: 1, w: "hair" }); }
  return s; };
reg("nat-anemone-clownfish", (o) => L.shadow(0, 0, 220) + R(-60, -24, 120, 24, 10, "stone") + anemone(o) + P([[-44, -6], [-30, -50], [30, -50], [44, -6]], "purple", { tone: 2 }) + anemone(o, true) + L.g(clown(o), "translate(2 -96) scale(0.95)"),
  GO, "Clownfish in anemone", ["clownfish", "anemone", "reef", "sea", "symbiosis", "friends"], { box: [-150, -170, 300, 180] });

reg("nat-jellyfish", (o) => {
  const bell = L.smooth([[-84, 0], [-88, -44], [-58, -92], [0, -106], [58, -92], [88, -44], [84, 0], [66, 8], [44, -2], [22, 8], [0, -2], [-22, 8], [-44, -2], [-66, 8], [-84, 0]]);
  let s = ""; for (let i = 0; i < 7; i++) { const x = -56 + i * 18.7; s += L.stroke(L.smooth(wavy(x, 2, 110 + (i % 3) * 22, 10, 6, i * 1.3)), { c: L.c("pink", 2), w: 4 }); }
  [-30, 0, 30].forEach((x, i) => { s += LB(wavy(x, 4, 80 + i % 2 * 26, 14, 5, i * 2), 18, 6, "pink", { tone: 2, w: "detail", op: 0.9 }); });
  s += L.shape(bell, "pink", { tone: 1, op: 0.93 }) + clip(bell, hi(L.circ(-30, -66, 40, 18), "white", 0.5).replace(/fill="[^"]*"/, `fill="${L.c("white")}"`) + dk(L.rect(30, -110, 70, 130), "pink", 0.35)) + rim(bell, "pink") + [[-50, -50], [0, -78], [50, -50]].map(([x, y]) => L.flat(L.circ(x, y, 7, 5), "white", 0.55)).join("") + eye(-24, -38, 9, 0.3, o) + eye(24, -38, 9, 0.3, o) + mouthSmile(0, -22, 9) + blush(-44, -26, 8) + blush(44, -26, 8);
  return s;
}, GO, "Jellyfish", ["jellyfish", "sea", "tentacles", "floating", "ocean", "sting"], { box: [-120, -130, 240, 300], call: 'L.put(S, "nat-jellyfish", x, y, { s: 1, t })' });

reg("nat-starfish", (o) => {
  const pts = []; for (let i = 0; i < 10; i++) { const a = -90 + i * 36, r = i % 2 ? 40 : 118; pts.push(pol(r, a)); } pts.push(pts[0]);
  const d = L.smooth(pts); let bump = ""; for (let i = 0; i < 5; i++) for (let k = 1; k <= 4; k++) bump += L.circ(...pol(k * 24 + 6, -90 + i * 72), 4.6 - k * 0.5);
  return L.shape(d, "orange") + clip(d, L.flat(bump, "yellow", 0.85) + hi(L.circ(-30, -50, 40, 28), "orange", 0.5) + dk(L.rect(10, -120, 120, 240), "orange", 0.25)) + rim(d, "orange") + eye(-14, -4, 9, 0.2, o) + eye(14, -4, 9, 0.2, o) + mouthSmile(0, 16, 8);
}, GO, "Starfish", ["starfish", "sea star", "beach", "ocean", "five arms"], { box: [-140, -140, 280, 280], call: 'L.put(S, "nat-starfish", x, y, { s: 1, t })' });

reg("nat-sea-urchin", (o) => {
  let sp = ""; for (let i = 0; i < 26; i++) sp += L.line(pol(48, i * 360 / 26), pol(100 + (i % 2) * 14, i * 360 / 26));
  return L.stroke(sp, { c: L.c("purple", 2), w: 7 }) + B(0, 0, 62, 60, "purple") + hi(L.circ(-22, -26, 20, 12), "purple", 0.7) + eye(-18, -2, 10, 0.3, o) + eye(18, -2, 10, 0.3, o) + mouthSmile(0, 20, 9);
}, GO, "Sea urchin", ["urchin", "spiky", "sea", "ocean", "spines"], { box: [-120, -120, 240, 240], call: 'L.put(S, "nat-sea-urchin", x, y, { s: 1, t })' });

reg("nat-seahorse", (o) => {
  const spine = [[4, -112], [-8, -76], [-4, -36], [14, 4], [12, 44], [-14, 66], [-34, 48], [-22, 32]];
  return P([[-6, -90], [-50, -110], [-34, -60], [-16, -70]], "yellow", { tone: 1, w: "detail" }) + P([[0, -100], [-34, -128], [-8, -138]], "yellow", { tone: 1, w: "detail" }) + LB(spine, 48, 10, "yellow") + LB([[8, -126], [58, -114]], 20, 14, "yellow", { tone: 1 }) + B(10, -120, 32, 30, "yellow") + hi(L.circ(-6, -50, 8, 36), "yellow", 0.6) + [-84, -62, -40, -18, 4].map((y) => sm([[-12, y], [18, y + 6]], { c: L.c("orange", 2), op: 0.7 })).join("") + P([[26, -140], [18, -166], [8, -142]], "orange", { w: "detail" }) + eye(14, -124, 8, 0.6, o) + dot(56, -118, 2.5) + blush(0, -108, 6);
}, GO, "Seahorse", ["seahorse", "sea", "ocean", "curly", "fish"], { box: [-90, -190, 180, 280], call: 'L.put(S, "nat-seahorse", x, y, { s: 1, t })' });

reg("nat-kelp", (o) => {
  let s = L.shadow(0, 0, 220) + B(0, -12, 90, 26, "stone", { w: "detail" });
  [[-50, 330, 0], [0, 400, 1.7], [50, 290, 3.1]].forEach(([x, h, ph]) => { const pts = Array.from({ length: 9 }, (_, i) => [x + Math.sin(i * 0.9 + ph) * 22, -10 - (h * i) / 8]); s += LB(pts, 12, 6, "green", { tone: 2, w: "detail" });
    let bl = "", bb = ""; pts.forEach(([a, b], i) => { if (i > 0 && i < 8) { const dir = i % 2 ? 1 : -1; bl += leafD(a, b, dir > 0 ? -30 : -150, 58, 0.26); bb += L.circ(a + dir * 5, b + 4, 6, 6); } }); s += L.shape(bl, "green", { tone: 1, w: "detail" }) + L.shape(bb, "gold", { w: "hair" }); });
  return s;
}, GO, "Kelp", ["seaweed", "algae", "kelp forest", "sea", "plant", "underwater"], { box: [-130, -430, 260, 440] });

reg("nat-anglerfish", (o) => {
  const body = L.smooth([[-100, -10], [-80, -70], [-10, -92], [66, -66], [94, -20], [80, 40], [20, 74], [-50, 60], [-100, -10]]);
  let teeth = ""; for (let i = 0; i < 6; i++) teeth += L.poly([[34 + i * 12, 12 + i * 2], [40 + i * 12, 34 + i * 2], [46 + i * 12, 12 + i * 2]], true);
  return glow(138, -128, 62, "yellow", 0.7) + P([[-96, -6], [-150, -48], [-136, -4], [-152, 44]], "navy", { tone: 0 }) + sm([[56, -70], [82, -138], [136, -148], [140, -132]], { c: L.c("ink"), w: "prop" }) + B(138, -128, 13, 13, "yellow", { tone: 1 }) + L.shape(body, "navy", { tone: 1 }) + hi(L.circ(-40, -50, 30, 14), "navy", 0.6) + P([[-30, -80], [0, -112], [30, -86]], "navy", { w: "detail", tone: 0 }) +
    P([[30, 12], [96, 4], [100, 36], [60, 56], [30, 40]], "red", { tone: 2, w: "detail" }) + L.shape(teeth, "white", { w: "hair" }) + eye(34, -34, 15, 0.5, o) + L.flat(L.circ(34, -34, 5), "yellow", 0.0) + P([[-20, 30], [-50, 62], [-6, 50]], "navy", { w: "detail" });
}, GO, "Anglerfish", ["anglerfish", "deep sea", "lure", "dark", "glow", "bioluminescence"], { box: [-170, -210, 380, 300], call: 'L.put(S, "nat-anglerfish", x, y, { s: 1, flip: false, t })' });

reg("nat-plankton", (o) => {
  let s = L.tag("circle", { cx: 0, cy: 0, r: 180, fill: L.c("water", 1), opacity: 0.35 }) + L.stroke(L.circ(0, 0, 180), { c: L.c("water", 2), w: "prop", op: 0.7 });
  // diatom
  let rad = ""; for (let i = 0; i < 12; i++) rad += L.line(pol(8, i * 30, -76, -62), pol(40, i * 30, -76, -62));
  s += B(-76, -62, 44, 44, "green", { tone: 1 }) + L.stroke(rad, { c: L.c("green", 2), w: 3 }) + B(-76, -62, 10, 10, "yellow", { w: "detail" }) + eye(-90, -70, 6, 0.3, o) + eye(-64, -70, 6, 0.3, o);
  // copepod
  s += sm([[56, -86], [84, -126], [112, -120]], { w: "detail" }) + sm([[64, -90], [100, -138], [128, -112]], { w: "detail" }) + P([[-0, -64], [20, -90], [60, -92], [90, -76], [96, -60], [60, -42], [20, -44]], "orange") + P([[0, -66], [-26, -74], [-20, -52]], "orange", { tone: 1, w: "detail" }) + sm([[-24, -62], [-48, -80]], { w: "detail" }) + sm([[-22, -58], [-50, -54]], { w: "detail" }) + eye(72, -70, 7, 0.5, o) + mouthSmile(86, -58, 5);
  // dinoflagellate with tail
  s += sm(wavy(-30, 42, 80, 12, 5, 1).map(([x, y]) => [x - 30 + (y - 42) * 0.3, y + 20]), { w: "prop", c: L.c("pink", 2) }) + P([[-84, 50], [-60, 10], [-20, 14], [-4, 52], [-30, 84], [-70, 84]], "pink") + L.flat(L.circ(-50, 36, 10, 6), "white", 0.6) + eye(-48, 50, 6, 0.3, o) + eye(-28, 50, 6, 0.3, o);
  // radiolarian star + dots
  s += L.shape(L.star(80, 62, 52, 22, 8, -90), "purple", { tone: 1 }) + B(80, 62, 16, 16, "white", { w: "detail", flat: true }) + dot(80, 62, 6, "purple", 0.9);
  [[130, 0, 6], [-130, 0, 5], [10, 14, 6], [30, 130, 5], [-110, 120, 4], [0, -150, 5], [140, 100, 4]].forEach(([x, y, r]) => { s += B(x, y, r, r, "green", { tone: 1, w: "hair" }); });
  return s;
}, GO, "Plankton under the microscope", ["plankton", "microscope", "tiny", "krill", "food chain", "microorganisms"], { box: [-200, -200, 400, 400], call: 'L.put(S, "nat-plankton", x, y, { s: 1, t })' });

reg("nat-manta", (o) => {
  const body = L.smooth([[0, -44], [72, -38], [150, -4], [126, 14], [52, 10], [20, 34], [0, 40], [-20, 34], [-52, 10], [-126, 14], [-150, -4], [-72, -38], [0, -44]]);
  return LB([[0, 34], [2, 96], [-6, 160]], 14, 3, "navy", { tone: 1 }) + L.shape(body, "navy", { tone: 1 }) + clip(body, L.flat(L.circ(0, 20, 54, 34), "white", 0.95) + hi(L.circ(-50, -30, 50, 12), "navy", 0.6)) + rim(body, "navy") + P([[-30, -40], [-48, -66], [-18, -50]], "navy", { w: "detail" }) + P([[30, -40], [48, -66], [18, -50]], "navy", { w: "detail" }) +
    [[-70, -14], [-36, -22], [36, -22], [70, -14], [0, -28]].map(([x, y]) => dot(x, y, 4, "white", 0.8)).join("") + eye(-24, -20, 7, 0, o) + eye(24, -20, 7, 0, o) + mouthSmile(0, 6, 12);
}, GO, "Manta ray", ["manta", "ray", "sea", "ocean", "wings", "swimming"], { box: [-170, -90, 340, 270], call: 'L.put(S, "nat-manta", x, y, { s: 1, t })' });

reg("nat-pufferfish", (o) => {
  let sp = ""; for (let i = 0; i < 16; i++) { const a = i * 360 / 16; sp += L.poly([pol(70, a - 7), pol(98, a), pol(70, a + 7)], true); }
  const bd = L.circ(0, 0, 78, 72);
  return P([[-70, 0], [-124, -34], [-112, 0], [-124, 34]], "yellow", { tone: 1 }) + L.shape(sp, "yellow", { tone: 2, w: "detail" }) + L.shape(bd, "yellow") + clip(bd, L.flat(L.circ(10, 52, 62, 36), "cream", 0.95) + dk(L.rect(30, -90, 80, 180), "yellow", 0.3)) + rim(bd, "yellow") + hi(L.circ(-26, -40, 20, 12), "yellow", 0.7) +
    P([[-4, 10], [-34, 38], [-14, 44], [6, 28]], "orange", { w: "detail" }) + eye(34, -14, 17, 0.6, o) + L.shape(L.circ(70, 14, 9, 7), "pink", { w: "detail" }) + blush(40, 22, 8);
}, GO, "Pufferfish", ["pufferfish", "fish", "spiky", "round", "sea", "blowfish"], { box: [-140, -110, 260, 220], call: 'L.put(S, "nat-pufferfish", x, y, { s: 1, flip: false, t })' });

reg("nat-seashell", (o) => {
  const fan = L.smooth([[-8, 0], [-96, -34], [-130, -100], [-104, -150], [-54, -180], [0, -190], [54, -180], [104, -150], [130, -100], [96, -34], [8, 0], [-8, 0]]);
  let ribs = ""; for (let i = 0; i < 9; i++) ribs += L.line([0, -2], pol(200, -90 + (i - 4) * 17.5, 0, -2));
  return L.shadow(0, 0, 230) + R(-46, -8, 92, 30, 10, "pink", { tone: 2, w: "detail" }) + L.shape(fan, "pink", { tone: 0 }) + clip(fan, L.stroke(ribs, { c: L.c("pink", 2), w: 5, op: 0.85 }) + [60, 100, 140].map((r) => L.tag("path", { d: L.arc(0, -2, r, -180, 0, r * 0.95), fill: "none", stroke: L.c("orange", 1), "stroke-width": 5, opacity: 0.55 })).join("") + hi(L.circ(-50, -120, 36, 50), "pink", 0.55) + dk(L.rect(30, -200, 110, 210), "pink", 0.3)) + rim(fan, "pink") +
    P([[-40, 4], [-80, -6], [-60, -34], [-22, -26]], "pink", { tone: 1, w: "detail" }) + P([[40, 4], [80, -6], [60, -34], [22, -26]], "pink", { tone: 1, w: "detail" });
}, GO, "Scallop shell", ["shell", "scallop", "beach", "sea", "seashell", "clam"], { box: [-150, -210, 300, 250] });

// ===================== INSECTS =====================
const GI = "Insects";
const leg = (pts, w = "detail", c = "ink") => L.stroke(L.smooth(pts), { c, w });
const antennae = (x, y, dx, dy) => leg([[x - 4, y], [x - dx * 0.6, y - dy], [x - dx, y - dy - 14]], "detail") + leg([[x + 4, y], [x + dx * 0.6, y - dy], [x + dx, y - dy - 14]], "detail");
const miniBee = (x, y, s = 1, flip = 1) => L.g(
  P([[-8, -10], [-22, -34], [2, -26]], "glass", { w: "hair", flat: true, op: 0.85 }) + P([[2, -12], [14, -36], [24, -18]], "glass", { w: "hair", flat: true, op: 0.85 }) +
  B(0, 0, 24, 17, "yellow") + clip(L.circ(0, 0, 24, 17), [-12, 2, 14].map((px) => L.shape(L.rect(px - 3, -20, 6, 40), "ink", { w: "hair", flat: true })).join("")) + rim(L.circ(0, 0, 24, 17), "yellow", { w: "detail" }) + B(22, -2, 10, 9, "ink", { w: "hair" }) + dot(26, -5, 2.4, "white") + T([[-24, 0], [-34, 3], [-24, 6]], "ink", { w: "hair" }), `translate(${x} ${y}) scale(${flip * s} ${s})`);

reg("nat-ladybird", (o) => {
  const sh = L.circ(0, 0, 84, 92);
  let s = [[-1, -50], [-1, 0], [-1, 46]].map(([d, y]) => leg([[d * 70, y], [d * 108, y + (y < 0 ? -22 : y > 0 ? 18 : -2)], [d * 126, y + (y < 0 ? -10 : y > 0 ? 40 : 18)]], "prop")).join("") + [[1, -50], [1, 0], [1, 46]].map(([d, y]) => leg([[d * 70, y], [d * 108, y + (y < 0 ? -22 : y > 0 ? 18 : -2)], [d * 126, y + (y < 0 ? -10 : y > 0 ? 40 : 18)]], "prop")).join("");
  s += antennae(0, -108, 34, 20) + B(0, -92, 38, 30, "ink") + [-1, 1].map((d) => L.flat(L.circ(d * 20, -102, 11, 8), "white")).join("") + dot(-18, -102, 3.5) + dot(22, -102, 3.5);
  s += L.shape(sh, "red") + clip(sh, [[-40, -36, 15], [42, -36, 15], [-54, 20, 14], [56, 22, 14], [-20, 60, 13], [22, 60, 13], [0, 0, 12]].map(([x, y, r]) => B(x, y, r, r, "ink", { w: "hair", flat: true })).join("") + hi(L.circ(-38, -48, 24, 14), "red", 0.75) + dk(L.rect(30, -100, 70, 200), "red", 0.3)) + rim(sh, "red") + L.stroke("M0 -90 L0 90", { w: "detail" }) + L.shape("M-30 -78 Q0 -66 30 -78 L24 -66 Q0 -58 -24 -66 Z", "ink", { w: "hair", flat: true });
  return s;
}, GI, "Ladybird", ["ladybug", "beetle", "insect", "spots", "garden", "red"], { box: [-140, -150, 280, 260], call: 'L.put(S, "nat-ladybird", x, y, { s: 1, t })' });

reg("nat-dragonfly", (o) => {
  const wing = (ang, len, wd, tone) => L.shape(leafD(0, -34, ang, len, wd), "glass", { w: "detail", op: 0.78, flat: true });
  const veins = (ang, len) => { let d = ""; for (let k = 1; k < 5; k++) d += L.line(pol(len * 0.2 * k, ang, 0, -34), pol(len * 0.2 * k + 4, ang + (ang < 0 || ang > 90 ? 18 : -18), 0, -34)); return L.stroke(L.line([0, -34], pol(len * 0.9, ang, 0, -34)), { c: L.c("teal", 2), w: 2.5, op: 0.8 }); };
  let s = wing(-18, 160, 0.17) + wing(16, 150, 0.17) + wing(198, 160, 0.17) + wing(164, 150, 0.17) + veins(-18, 160) + veins(16, 150) + veins(198, 160) + veins(164, 150);
  s += LB([[0, -26], [0, 40], [0, 130]], 16, 6, "teal") + [0, 1, 2, 3, 4, 5].map((i) => L.stroke(L.poly([[-8 + i * 0.6, -4 + i * 20], [8 - i * 0.6, -4 + i * 20]]), { c: L.c("teal", 2), w: 3 })).join("") + B(0, -34, 20, 28, "teal", { tone: 1 }) + B(0, -68, 24, 20, "teal") + [-1, 1].map((d) => B(d * 17, -72, 15, 16, "blue", { tone: 1, w: "detail" }) + L.flat(L.circ(d * 14, -77, 4, 5), "white", 0.7)).join("") + antennae(0, -84, 8, 6).replace(/stroke-width="[^"]*"/g, "stroke-width=\"3\"");
  return s;
}, GI, "Dragonfly", ["dragonfly", "insect", "wings", "pond", "flying", "summer"], { box: [-190, -130, 380, 290], call: 'L.put(S, "nat-dragonfly", x, y, { s: 1, t })' });

reg("nat-grasshopper", (o) => {
  let s = L.shadow(0, 0, 220) + leg([[-8, -52], [-20, -26], [-12, 0]], "prop") + leg([[28, -50], [36, -26], [44, 0]], "prop");
  s += LB([[-36, -50], [-78, -118], [-112, -24], [-98, -2]], 16, 8, "green", { tone: 2 }) + LB([[-98, -2], [-82, -2]], 8, 8, "green", { tone: 2, w: "detail" });
  s += P([[-110, -66], [-60, -86], [30, -78], [44, -56], [26, -44], [-60, -44], [-110, -56]], "green") + P([[-100, -72], [-40, -94], [34, -78], [-20, -66]], "green", { tone: 2, w: "detail" }) + hi(L.smooth([[-70, -78], [-20, -86], [10, -80]]), "green", 0.7) +
    B(52, -66, 30, 28, "green", { tone: 1 }) + eye(62, -74, 10, 0.5, o) + mouthSmile(70, -54, 6) + antennae(60, -92, 0, 0).replace(/^/, "") + leg([[64, -92], [96, -134], [128, -122]], "detail") + leg([[50, -92], [60, -144], [96, -170]], "detail") +
    leg([[-36, -50], [-60, -34]], "prop").replace(/^.*$/, "");
  return s;
}, GI, "Grasshopper", ["grasshopper", "insect", "jump", "green", "meadow", "hopper"], { box: [-170, -190, 340, 200], call: 'L.put(S, "nat-grasshopper", x, gy, { s: 1, flip: false, t })' });

reg("nat-firefly", (o) => {
  return glow(0, 40, 130, "yellow", 0.65) + P([[-10, -20], [-70, -64], [-84, -10], [-34, 8]], "glass", { w: "detail", flat: true, op: 0.8 }) + P([[10, -20], [70, -64], [84, -10], [34, 8]], "glass", { w: "detail", flat: true, op: 0.8 }) +
    antennae(0, -62, 22, 6) + B(0, -48, 18, 16, "ink") + L.shape(L.circ(0, -16, 26, 22), "ink", { tone: 1 }) + L.shape(L.smooth([[-20, -30], [0, -40], [20, -30], [14, -6], [-14, -6], [-20, -30]]), "orange", { w: "detail", tone: 0 }) +
    L.shape(L.circ(0, 44, 30, 46), "yellow", { tone: 1, flat: true }) + L.flat(L.circ(-8, 30, 12, 20), "white", 0.7) + [30, 50, 68].map((y) => L.stroke(L.poly([[-24, y], [24, y]]), { c: L.c("orange", 0), w: 2.5, op: 0.6 })).join("") + eye(-8, -50, 5, 0.3, o) + eye(8, -50, 5, 0.3, o);
}, GI, "Firefly", ["firefly", "lightning bug", "glow", "night", "bioluminescence", "insect"], { box: [-140, -110, 280, 270], call: 'L.put(S, "nat-firefly", x, y, { s: 1, t })' });

reg("nat-mantis", (o) => {
  let s = L.shadow(0, 0, 170) + leg([[-24, -66], [-40, -34], [-34, 0]], "prop") + leg([[-8, -76], [6, -40], [8, 0]], "prop") + LB([[-60, -74], [-30, -66], [-24, -90]], 28, 14, "green", { tone: 2, w: "detail" });
  s += LB([[-70, -84], [-34, -76], [0, -96], [14, -150]], 26, 16, "green") + P([[-100, -76], [-30, -86], [-16, -66]], "green", { tone: 1, w: "detail" });
  s += LB([[10, -128], [62, -146], [78, -100]], 12, 8, "green", { tone: 1 }) + LB([[78, -100], [60, -80], [40, -84]], 8, 4, "green", { tone: 2, w: "detail" }) + LB([[6, -118], [48, -118], [58, -76]], 10, 6, "green", { tone: 2, w: "detail" }).replace(/^/, "");
  s += T([[-6, -186], [28, -190], [40, -168], [14, -150], [-8, -164]], "green", { tone: 1 }) + eye(6, -172, 8, 0.6, o) + eye(26, -174, 8, 0.6, o) + mouthSmile(20, -158, 6) + leg([[8, -190], [-14, -226]], "detail") + leg([[26, -192], [48, -224]], "detail");
  return s;
}, GI, "Praying mantis", ["mantis", "insect", "green", "predator", "camouflage"], { box: [-130, -240, 260, 250], call: 'L.put(S, "nat-mantis", x, gy, { s: 1, flip: false, t })' });

reg("nat-spider-web", (o) => {
  const R0 = 170, N = 9, a0 = -90;
  let web = "", thr = { c: L.c("ink"), w: 2.6, op: 0.55 };
  for (let i = 0; i < N; i++) web += L.line([0, 0], pol(R0, a0 + i * 360 / N));
  for (let k = 1; k <= 7; k++) { const r = k * 23 + 6, pts = []; for (let i = 0; i <= N; i++) pts.push(pol(r, a0 + i * 360 / N)); let d = ""; for (let i = 0; i < N; i++) { const a = pts[i], b = pts[i + 1], m = [(a[0] + b[0]) / 2 * 0.93, (a[1] + b[1]) / 2 * 0.93]; d += `M${f1(a[0])} ${f1(a[1])} Q${f1(m[0])} ${f1(m[1])} ${f1(b[0])} ${f1(b[1])}`; } web += d; }
  let s = L.stroke(web, { c: L.c("ink"), w: 2.6, op: 0.6 }) + [[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([x, y]) => L.stroke(L.line(pol(R0, a0, 0, 0).map((v, i) => [0, v][i]).length ? [x * 150, y * 150] : [0, 0], [x * 190, y * 190]), { c: L.c("ink"), w: 2.6, op: 0.4 })).join("");
  [[40, 70], [-58, 38], [88, -30], [-30, -92], [-96, -60], [30, -48]].forEach(([x, y], i) => { s += L.shape(L.circ(x, y, 8 - (i % 2), 8 - (i % 2)), "glass", { w: "hair", flat: true }) + L.flat(L.circ(x - 2.5, y - 3, 2.2), "white"); });
  const sx = 52, sy = 12;
  s += [-1, 1].map((d) => [0, 1, 2, 3].map((k) => leg([[sx + d * 8, sy + (k - 1.5) * 4], [sx + d * 26, sy + (k - 1.5) * 12 - 8], [sx + d * 36, sy + (k - 1.5) * 14 + 8]], "detail")).join("")).join("") + B(sx, sy + 12, 13, 15, "ink", { tone: 1 }) + B(sx, sy - 6, 10, 9, "ink") + eye(sx - 4, sy - 8, 4, 0.2, o) + eye(sx + 4, sy - 8, 4, 0.2, o);
  return s;
}, GI, "Spider web with dew", ["spider", "web", "cobweb", "dew", "trap", "halloween"], { box: [-200, -200, 400, 400], call: 'L.put(S, "nat-spider-web", x, y, { s: 1, t })' });

reg("nat-beehive", (o) => {
  let s = L.shadow(0, 0, 260) + R(-120, -34, 240, 34, 8, "wood") + LB([[-90, -30], [-90, 0]], 12, 12, "wood") + LB([[90, -30], [90, 0]], 12, 12, "wood");
  [[-110, -34, 1.0, 0], [-96, -86, 0.9, 1], [-80, -138, 0.76, 0], [-62, -186, 0.62, 1], [-40, -226, 0.44, 0]].forEach(([x, y, k, tn], i) => { const w = -x * 2, h = 56; s += L.shape(L.smooth([[x, y], [x - 6, y - h * 0.5], [x + 10, y - h], [-x - 10, y - h], [-x + 6, y - h * 0.5], [-x, y], [x, y]]), "yellow", { tone: tn }); });
  s += hi(L.smooth([[-80, -120], [-60, -170], [-40, -226]]), "yellow", 0.0) + L.shape(L.smooth([[-24, -34], [-24, -66], [0, -78], [24, -66], [24, -34], [-24, -34]]), "brown", { w: "detail", tone: 0 }) + L.shape(L.circ(0, -250, 22, 12), "yellow", { tone: 1 }) + sm([[-96, -90], [-60, -98]], { c: L.c("yellow", 2) }) + sm([[-82, -146], [-40, -154]], { c: L.c("yellow", 2) });
  return s + miniBee(-130, -150, 0.9, 1) + miniBee(120, -190, 0.8, -1) + miniBee(58, -70, 0.7, 1);
}, GI, "Beehive", ["bees", "hive", "honey", "farm", "apiary", "skep"], { box: [-180, -290, 360, 300] });

reg("nat-honeycomb", (o) => {
  const r = 44, w = Math.sqrt(3) * r, hexD = (cx, cy, k = 1) => L.poly(Array.from({ length: 6 }, (_, i) => pol(r * k, 30 + i * 60, cx, cy)), true);
  const cells = []; for (let j = 0; j < 4; j++) for (let i = 0; i < (j % 2 ? 3 : 4); i++) cells.push([(i - (j % 2 ? 1 : 1.5)) * w, (j - 1.5) * r * 1.5, j, i]);
  const filled = (j, i) => (j + i) % 3 !== 1;
  let s = cells.map(([x, y]) => L.shape(hexD(x, y), "gold", { tone: 1, w: "detail" })).join("");
  s += cells.map(([x, y, j, i]) => filled(j, i) ? L.shape(hexD(x, y, 0.74), "orange", { w: "hair", tone: 1, flat: false }) + L.flat(L.smooth([[x - 14, y - 12], [x - 2, y - 20], [x + 8, y - 12]]), "yellow", 0.85) : L.shape(hexD(x, y, 0.74), "gold", { tone: 2, w: "hair", flat: true })).join("");
  return s;
}, GI, "Honeycomb", ["honeycomb", "bees", "honey", "hexagon", "hive", "sweet"], { box: [-180, -150, 360, 300], call: 'L.put(S, "nat-honeycomb", x, y, { s: 1, t })' });

reg("nat-ant-colony", (o) => {
  const ant = (x, y, k = 1, f = 1, c = "brown") => L.g([-1, 0, 1].map((d) => leg([[d * 6, 0], [d * 14 + 6, -10], [d * 18 + 8, 4]], "hair")).join("") + B(-15, 0, 11, 8, c, { w: "hair" }) + B(0, 0, 7, 6, c, { w: "hair" }) + B(12, -3, 8, 7, c, { w: "hair" }) + leg([[14, -9], [22, -18]], "hair") + dot(15, -4, 1.6, "white"), `translate(${x} ${y}) scale(${f * k} ${k})`);
  const TUN = [[[[0, 6], [8, 34], [-10, 70], [0, 104]], 40, 36], [[[0, 100], [-44, 92], [-88, 118], [-132, 108], [-176, 126]], 34, 32], [[[2, 104], [46, 124], [92, 100], [140, 122], [176, 132]], 34, 32],
    [[[0, 108], [-6, 150], [12, 178], [-6, 200], [-20, 212]], 32, 30], [[[-92, 114], [-110, 150], [-130, 190], [-146, 208]], 22, 20], [[[96, 106], [110, 150], [132, 190], [146, 212]], 22, 20], [[[-132, 108], [-148, 74], [-156, 46]], 20, 18]];
  const ch = [L.circ(-190, 130, 64, 40), L.circ(190, 134, 62, 40), L.circ(-20, 210, 76, 38), L.circ(-150, 216, 32, 20), L.circ(150, 218, 32, 20)];
  const soilD = L.rrect(-300, 0, 600, 270, 26);
  let s = soil(-300, 0, 600, 270, { stones: false });
  const fills = TUN.map(([p, a, b]) => L.limb(p, a, b)).concat(ch);
  const earthDet = [[-262, 70, 16], [250, 60, 14], [-258, 236, 14], [262, 236, 18], [-86, 52, 11], [88, 52, 13], [70, 190, 10], [-60, 246, 9]].map(([x, y, rr]) => B(x, y, rr, rr * 0.7, "stone", { w: "detail" })).join("") +
    [[[-60, 26], [-52, 44], [-62, 62]], [[64, 26], [70, 48], [60, 68], [66, 80]], [[-230, 30], [-238, 52], [-226, 80]]].map((p) => sm(p, { c: "wood", w: 3 })).join("");
  s += clip(soilD, earthDet + fills.map((d) => L.tag("path", { d, fill: "none", stroke: L.c("ink"), "stroke-width": L.lw("prop") * 2.2, "stroke-linejoin": "round" })).join("") + fills.map((d) => L.tag("path", { d, fill: L.c("brown", 1), opacity: 1 })).join("") + fills.map((d) => L.tag("path", { d, fill: L.c("wall", 1) })).join(""));
  // chambers: queen + eggs, food, pupae
  s += ant(-20, 214, 2.1, 1, "red") + [[-70, 226], [-60, 206], [30, 230], [48, 214]].map(([x, y]) => B(x, y, 9, 11, "cream", { w: "hair" })).join("") +
    [[-158, 220], [-144, 214], [-150, 228]].map(([x, y]) => B(x, y, 7, 9, "cream", { w: "hair", tone: 2 })).join("") + [[142, 222], [158, 220], [150, 228]].map(([x, y]) => B(x, y, 6, 5, "gold", { w: "hair", tone: 1 })).join("");
  s += [[-214, 140], [-196, 150], [-176, 138], [-206, 124], [-184, 124]].map(([x, y]) => B(x, y, 9, 11, "cream", { w: "hair", tone: 1 })).join("") + ant(-196, 106, 1.1, -1);
  s += [[170, 144], [192, 150], [214, 142], [180, 126], [204, 126], [226, 128]].map(([x, y]) => B(x, y, 8, 6, "gold", { w: "hair", tone: 1 })).join("") + ant(170, 108, 1.1, 1);
  s += ant(2, 40, 1.1, 1).replace(/^<g /, "<g ") + ant(-120, 112, 1.1, -1) + ant(112, 110, 1.1, 1) + ant(-8, 156, 1.1, 1);
  // mound + surface
  s += L.shape(L.smooth([[-110, 0], [-70, -34], [-24, -52], [24, -52], [70, -34], [110, 0]]).replace(/$/, " Z"), "earth", { tone: 1 }) + L.shape(L.circ(0, -4, 22, 10), "brown", { w: "detail", flat: true }) + ant(70, -4, 1.2, 1) + L.flat(L.circ(-200, -8, 8), "grass", 0.0) + leaf(-210, 0, -80, 40, "green", { w: "detail" }) + leaf(-196, 0, -120, 34, "green", { w: "detail" }) + leaf(220, 0, -70, 44, "green", { w: "detail" });
  return s + lab(o, "queen", -20, 264, 24) + lab(o, "eggs", -192, 186, 24) + lab(o, "food", 192, 190, 24);
}, GI, "Ant colony cross-section", ["ant", "colony", "tunnels", "queen", "underground", "cross-section", "anthill"], { box: [-330, -90, 660, 400], call: 'L.put(S, "nat-ant-colony", x, gy, { s: 0.8, t, labels: false })' });

// ---------- butterfly life cycle ----------
const GB2 = "Butterfly life cycle";
const bigLeaf = (x, y, ang, len, wd = 0.34) => L.shape(leafD(x, y, ang, len, wd), "green", { tone: 1 }) + L.stroke(L.line([x, y], pol(len * 0.94, ang, x, y)), { c: L.c("green", 2), w: 4 }) +
  [0.25, 0.45, 0.65].map((k) => { const [px, py] = pol(len * k, ang, x, y); return [-1, 1].map((d) => ln([px, py], pol(len * 0.2, ang + d * 52, px, py), { c: L.c("green", 2), op: 0.7 })).join(""); }).join("");
reg("nat-bfly-eggs", (o) => {
  let s = bigLeaf(-140, 44, -18, 270);
  [[-20, 6, 0], [4, -4, 1], [26, 8, 0], [-4, 26, 1], [-34, 28, 0], [18, 30, 1]].forEach(([x, y, i]) => { s += B(x, y, 12, 14, "cream", { tone: i, w: "detail" }) + L.flat(L.circ(x - 4, y - 5, 3.5, 4.5), "white", 0.9) + sm([[x - 9, y], [x + 9, y]], { c: L.c("cream", 2), op: 0.7 }); });
  s += L.g(LB([[0, 0], [14, -4], [28, 0]], 12, 10, "green", { tone: 1, w: "detail" }) + B(32, -2, 9, 9, "red", { w: "detail" }) + eye(34, -4, 3.5, 0.5, o), "translate(80 -34) rotate(-12)");
  return s;
}, GB2, "Butterfly eggs on a leaf", ["butterfly", "eggs", "life cycle", "leaf", "metamorphosis", "stage 1"], { box: [-190, -130, 380, 250], call: 'L.put(S, "nat-bfly-eggs", x, y, { s: 1, t })' });

reg("nat-caterpillar", (o) => {
  const segs = 7; let s = bigLeaf(-150, 50, -12, 300, 0.3);
  let body = "";
  for (let i = 0; i < segs; i++) { const x = -112 + i * 32, y = 16 - 16 * Math.sin(i * 0.75) - (i === segs - 1 ? 0 : 0), rr = 22 - Math.abs(i - 3) * 0.6 - (i === 0 ? 4 : 0);
    body += B(x, y, rr, rr, i % 2 ? "yellow" : "green", { tone: 1, w: "detail" }) + L.flat(L.circ(x, y + 4, 4, rr * 0.62), "ink", 0.55) + leg([[x - 4, y + rr - 2], [x - 4, y + rr + 8]], "detail") + leg([[x + 5, y + rr - 2], [x + 6, y + rr + 8]], "detail"); }
  const hx = -112 + segs * 32 - 6, hy = 16 - 16 * Math.sin(segs * 0.75) - 8;
  s += body + B(hx, hy, 32, 30, "red", { tone: 1 }) + hi(L.circ(hx - 10, hy - 14, 10, 6), "red", 0.7) + eye(hx + 2, hy - 4, 9, 0.5, o) + eye(hx + 22, hy - 6, 7, 0.5, o) + mouthSmile(hx + 14, hy + 12, 8) + leg([[hx - 6, hy - 28], [hx - 18, hy - 54]], "prop") + leg([[hx + 8, hy - 30], [hx + 12, hy - 58]], "prop");
  return s;
}, GB2, "Caterpillar", ["caterpillar", "larva", "butterfly", "life cycle", "leaf", "stage 2", "hungry"], { box: [-190, -150, 380, 250], call: 'L.put(S, "nat-caterpillar", x, y, { s: 1, t })' });

reg("nat-chrysalis", (o) => {
  const pod = L.smooth([[0, -100], [26, -72], [34, -20], [22, 40], [0, 80], [-14, 40], [-26, -20], [-24, -72], [0, -100]]);
  return LB([[-110, -150], [-40, -164], [60, -160], [120, -146]], 20, 14, "wood") + B(-76, -168, 14, 8, "green", { tone: 1, w: "detail" }) + L.stroke(L.line([0, -156], [0, -104]), { c: L.c("green", 2), w: 5 }) + L.shape(pod, "green", { tone: 1 }) +
    clip(pod, [-60, -30, 0, 30, 60].map((y, i) => L.stroke(L.smooth([[-34, y], [0, y + 12], [34, y]]), { c: L.c("green", 2), w: 3, op: 0.8 })).join("") + hi(L.circ(-12, -30, 8, 40), "green", 0.7) + dk(L.rect(8, -110, 40, 200), "green", 0.35)) + rim(pod, "green") + [[0, -86], [-10, -66], [10, -66]].map(([x, y]) => dot(x, y, 4.5, "gold")).join("") + [[-14, -4], [14, 0], [0, 28]].map(([x, y]) => dot(x, y, 4, "gold")).join("");
}, GB2, "Chrysalis", ["chrysalis", "pupa", "cocoon", "butterfly", "life cycle", "stage 3", "metamorphosis"], { box: [-140, -190, 280, 290], call: 'L.put(S, "nat-chrysalis", x, y, { s: 1, t })' });

reg("nat-butterfly-wings", (o) => {
  const fw = L.smooth([[8, -8], [36, -74], [112, -108], [142, -76], [104, -10], [8, -8]]), hw = L.smooth([[8, 2], [104, 4], [112, 50], [68, 74], [18, 44], [8, 2]]);
  const wing = (d, sx) => L.g(L.shape(d, "orange") + clip(d, L.tag("path", { d, fill: "none", stroke: L.c("ink"), "stroke-width": 20 }) + [[30, -20], [56, -50], [90, -66], [70, 0], [60, 24]].map(([a, b]) => ln([8, -2], [a * 1.5, b * 1.5 - 0], { c: L.c("ink"), op: 0.8, w: "detail" })).join("") + [[40, -90], [66, -102], [92, -98], [120, -86], [128, -64], [118, -30], [100, 22], [92, 56], [60, 66], [38, 52]].map(([a, b]) => dot(a, b, 4, "white")).join("") + hi(L.circ(48, -36, 20, 12), "orange", 0.7)) + rim(d, "orange"), `scale(${sx} 1)`);
  return wing(fw, -1) + wing(hw, -1) + wing(fw, 1) + wing(hw, 1) + LB([[0, -50], [0, 10], [0, 70]], 12, 5, "ink") + B(0, -58, 12, 12, "ink", { tone: 1 }) + leg([[-3, -66], [-22, -104], [-38, -108]], "detail") + leg([[3, -66], [22, -104], [38, -108]], "detail") + [-30, -6, 20, 44].map((y) => dot(0, y, 2.5, "white")).join("") + eye(-4, -60, 3.5, 0, o).replace(/^/, "");
}, GB2, "Butterfly wings spread", ["butterfly", "wings", "orange", "insect", "life cycle", "stage 4", "monarch"], { box: [-170, -130, 340, 220], call: 'L.put(S, "nat-butterfly-wings", x, y, { s: 1, t })' });

const fitN = (name, cx, cy, size, o = {}) => { const b = L.get(name).box, k = size / Math.max(b[2], b[3]); return L.g(L.inline(name, o), `translate(${f1(cx)} ${f1(cy)}) scale(${k.toFixed(3)}) translate(${-(b[0] + b[2] / 2)} ${-(b[1] + b[3] / 2)})`); };
const arrowS = (a, b) => { const ang = Math.atan2(b[1] - a[1], b[0] - a[0]), h = (d) => [b[0] - 26 * Math.cos(ang + d), b[1] - 26 * Math.sin(ang + d)]; return L.stroke(L.line(a, b), { w: "prop" }) + L.stroke(L.poly([h(0.5), b, h(-0.5)]), { w: "prop" }); };
reg("nat-bfly-cycle", (o) => {
  const S4 = [["nat-bfly-eggs", -270, -150, "1  egg"], ["nat-caterpillar", 270, -150, "2  caterpillar"], ["nat-chrysalis", 270, 190, "3  chrysalis"], ["nat-butterfly-wings", -270, 190, "4  butterfly"]];
  let s = "";
  S4.forEach(([n, x, y, t]) => { s += fitN(n, x, y, 250) + lab(o, t, x, y + 134, 40); });
  return s + arrowS([-130, -150], [130, -150]) + arrowS([270, 14], [270, 62]) + arrowS([130, 190], [-130, 190]) + arrowS([-270, 62], [-270, 14]);
}, GB2, "Butterfly life cycle diagram", ["butterfly", "life cycle", "metamorphosis", "diagram", "egg", "caterpillar", "chrysalis"], { box: [-450, -290, 900, 620], wide: true, call: 'L.put(S, "nat-bfly-cycle", x, y, { s: 0.8, t, labels: true })' });

// ===================== DINOSAURS =====================
const GD = "Dinosaurs";
const DB = [-250, -330, 480, 340];
const dreg = (name, fn, label, tags, o = {}) => reg(name, fn, GD, label, ["dinosaur", "prehistoric"].concat(tags), Object.assign({ box: DB, call: `L.put(S, "${name}", x, gy, { s: 1, flip: false, t })` }, o));
const toes = (x, y, c, n = 3) => Array.from({ length: n }, (_, i) => T([[x + i * 12 - 3, y], [x + i * 12 + 14, y - 2], [x + i * 12 + 4, y - 12]], "cream", { w: "hair", flat: true })).join("");

dreg("nat-trex", (o) => {
  const c = "green", body = L.smooth([[-76, -86], [-62, -176], [0, -208], [64, -184], [78, -116], [46, -56], [-28, -52], [-76, -86]]);
  let s = L.shadow(0, 0, 340) + LB([[-60, -100], [-130, -92], [-200, -56], [-236, -40]], 78, 8, c, { tone: 1 });
  s += LB([[-14, -70], [-26, -34], [-20, -6]], 38, 24, c, { tone: 2 }) + P([[-38, -6], [8, -6], [26, 0], [-38, 0]], c, { tone: 2, w: "detail" });
  s += L.shape(body, c) + clip(body, L.flat(L.smooth([[-8, -60], [60, -110], [70, -170], [90, -160], [90, -50]]), "cream", 0.95) + dk(L.rect(30, -230, 80, 200), c, 0.3)) + rim(body, c) + hi(L.circ(-30, -160, 24, 14), c, 0.7);
  s += LB([[30, -70], [48, -34], [50, -4]], 44, 28, c) + P([[34, -6], [80, -6], [88, 0], [34, 0]], c, { w: "detail" }) + toes(44, 0, c).replace(/^/, "");
  s += LB([[52, -150], [70, -130], [86, -130]], 12, 8, c, { tone: 1 }) + T([[84, -126], [94, -128], [90, -118]], "cream", { w: "hair" });
  s += LB([[40, -176], [74, -214]], 56, 70, c, { tone: 0 }) + P([[52, -250], [96, -262], [160, -246], [176, -218], [162, -194], [74, -184], [48, -214]], c) + P([[78, -186], [166, -196], [160, -170], [110, -158], [80, -166]], c, { tone: 1 }) +
    T([[100, -194], [108, -176], [116, -194], [124, -194], [132, -178], [140, -196], [150, -196]], "white", { w: "hair", flat: true }) + eye(106, -230, 11, 0.7, o) + dot(166, -224, 3) + L.flat(L.circ(88, -246, 10, 5), "green", 0.0) + mouthSmile(120, -176, 12).replace(/^.*$/, "");
  return s;
}, "Tyrannosaurus (cute)", ["t-rex", "trex", "tyrannosaurus", "predator", "teeth", "big"]);

dreg("nat-longneck", (o) => {
  const c = "teal", body = L.circ(0, -132, 112, 62);
  let s = L.shadow(0, 0, 380) + LB([[-80, -140], [-160, -110], [-230, -50], [-250, -20]], 60, 6, c, { tone: 1 });
  [[-62, 2], [58, 2]].forEach(([x, t]) => { s += LB([[x, -120], [x, -10]], 44, 40, c, { tone: 2 }) + B(x, -6, 24, 10, c, { tone: 2, w: "detail" }) + toes(x - 14, 0, c).replace(/^/, ""); });
  s += L.shape(body, c) + clip(body, L.flat(L.circ(-6, -92, 100, 30), "cream", 0.95) + dk(L.rect(40, -200, 100, 140), c, 0.3) + [[-50, -164], [10, -176], [60, -158], [-10, -140]].map(([x, y]) => B(x, y, 12, 9, c, { tone: 2, w: "hair", flat: true })).join("")) + rim(body, c) + hi(L.circ(-50, -170, 34, 14), c, 0.7);
  [[-30, 2], [86, 2]].forEach(([x]) => { s += LB([[x, -118], [x, -10]], 46, 40, c) + B(x, -6, 25, 10, c, { w: "detail" }) + toes(x - 14, 0, c).replace(/^/, ""); });
  s += LB([[70, -150], [118, -210], [128, -280], [150, -310]], 58, 28, c) + hi(L.limb([[70, -160], [110, -214], [118, -276]], 10, 6), c, 0.5) + B(160, -314, 34, 26, c, { tone: 1 }) + eye(170, -322, 9, 0.6, o) + mouthSmile(176, -306, 8) + blush(158, -304, 6);
  return s;
}, "Long-neck dinosaur", ["brachiosaurus", "long neck", "sauropod", "giant", "herbivore", "tall"], { box: [-290, -360, 520, 380] });

dreg("nat-triceratops", (o) => {
  const c = "orange", body = L.circ(0, -92, 104, 56);
  let s = L.shadow(0, 0, 330) + LB([[-90, -100], [-160, -80], [-210, -40]], 50, 6, c, { tone: 1 });
  [[-62], [50]].forEach(([x]) => { s += LB([[x, -86], [x, -8]], 38, 34, c, { tone: 2 }) + B(x, -6, 22, 9, c, { tone: 2, w: "detail" }); });
  s += L.shape(body, c) + clip(body, L.flat(L.circ(0, -60, 94, 26), "cream", 0.95) + dk(L.rect(40, -160, 100, 130), c, 0.3)) + rim(body, c) + hi(L.circ(-44, -130, 30, 12), c, 0.7);
  [[-30], [76]].forEach(([x]) => { s += LB([[x, -84], [x, -8]], 40, 34, c) + B(x, -6, 23, 9, c, { w: "detail" }); });
  const frill = L.smooth([[70, -120], [60, -200], [90, -238], [140, -236], [176, -200], [170, -140], [120, -110], [70, -120]]);
  s += L.shape(frill, "red", { tone: 1 }) + [[96, -222], [130, -228], [160, -208], [166, -166]].map(([x, y]) => B(x, y, 7, 7, "yellow", { w: "hair", flat: true })).join("") + hi(L.circ(100, -206, 18, 10), "red", 0.6);
  s += P([[100, -184], [170, -188], [208, -160], [204, -122], [150, -104], [100, -118]], c) + T([[168, -184], [196, -250], [180, -182]], "white", { w: "detail" }) + T([[196, -176], [250, -190], [204, -158]], "white", { w: "detail" }) + P([[190, -128], [220, -136], [226, -112], [196, -104]], "yellow", { tone: 1, w: "detail" }) + eye(158, -156, 11, 0.7, o) + mouthSmile(190, -118, 10);
  return s;
}, "Triceratops (cute)", ["triceratops", "horns", "three horns", "frill", "herbivore"], { box: [-250, -330, 520, 340] });

dreg("nat-stegosaurus", (o) => {
  const c = "green", body = L.smooth([[-110, -50], [-90, -128], [-20, -150], [70, -130], [110, -80], [100, -48], [0, -42], [-110, -50]]);
  let s = L.shadow(0, 0, 340) + LB([[-90, -80], [-150, -70], [-200, -40], [-232, -62]], 60, 8, c, { tone: 1 }) + [[-176, -50, -110, 38], [-210, -60, -130, 30]].map(([x, y, a, l]) => T([[x, y], [x - 8, y - l * 0.0 + 0], [x + 14, y + 4]], "white", { w: "hair" }) + "").join("") + T([[-214, -58], [-242, -86], [-228, -52]], "white", { w: "detail" }) + T([[-196, -46], [-220, -76], [-208, -42]], "white", { w: "detail" });
  [[-52], [58]].forEach(([x]) => { s += LB([[x, -60], [x, -8]], 36, 32, c, { tone: 2 }) + B(x, -6, 22, 9, c, { tone: 2, w: "detail" }); });
  [[-90, -130, 30], [-56, -154, 46], [-16, -164, 58], [24, -158, 54], [62, -140, 42], [88, -112, 30]].forEach(([x, y, h], i) => { s += L.g(L.shape(L.smooth([[-18, 4], [-16, -h * 0.6], [0, -h], [16, -h * 0.6], [18, 4], [-18, 4]]), i % 2 ? "orange" : "yellow", { tone: 1 }), `translate(${x} ${y + 12}) rotate(${(x - 0) * 0.18})`); });
  s += L.shape(body, c) + clip(body, L.flat(L.circ(0, -52, 100, 18), "cream", 0.95) + dk(L.rect(40, -170, 90, 140), c, 0.3)) + rim(body, c) + hi(L.circ(-50, -126, 28, 10), c, 0.7);
  [[-26], [84]].forEach(([x]) => { s += LB([[x, -62], [x, -8]], 38, 32, c) + B(x, -6, 22, 9, c, { w: "detail" }); });
  s += P([[96, -108], [126, -100], [166, -86], [170, -62], [126, -50], [90, -66]], c) + eye(142, -82, 8, 0.7, o) + mouthSmile(158, -62, 8);
  return s;
}, "Stegosaurus (cute)", ["stegosaurus", "plates", "spikes", "herbivore", "tail"], { box: [-270, -230, 470, 240] });

reg("nat-pterosaur", (o) => {
  const c = "orange";
  const wingR = L.smooth([[10, -10], [60, -80], [160, -118], [230, -90], [190, -40], [150, -52], [110, -22], [76, -34], [30, 0]]);
  const wingL = L.smooth([[-10, -4], [-40, -60], [-110, -100], [-170, -84], [-150, -34], [-114, -50], [-80, -18], [-46, -28], [-20, 6]]);
  return L.g(L.shape(wingL, c, { tone: 2 }) + [[-60, -50], [-100, -66]].map(([x, y]) => ln([-14, -6], [x - 20, y], { c: L.c(c, 2), op: 0.6 })).join(""), "") + L.shape(wingR, c, { tone: 1 }) + [[80, -50], [120, -80], [170, -74]].map(([x, y]) => ln([14, -6], [x, y], { c: L.c(c, 2), op: 0.6 })).join("") + LB([[-20, 10], [-70, 30], [-100, 56]], 14, 4, c, { tone: 1 }) +
    P([[-24, -10], [14, -22], [40, 0], [26, 24], [-16, 30]], c) + L.flat(L.circ(0, 14, 24, 14), "cream", 0.9) + LB([[24, -10], [46, -32]], 24, 22, c) + P([[34, -50], [64, -52], [150, -30], [64, -22], [38, -28]], c, { tone: 1 }) + P([[38, -54], [4, -78], [30, -46]], "red", { w: "detail", tone: 1 }) + eye(52, -38, 8, 0.7, o) + sm([[70, -28], [120, -26]], { w: "detail" });
}, GD, "Pterosaur (flying reptile)", ["pterodactyl", "pterosaur", "flying", "wings", "beak", "sky"], { box: [-200, -150, 440, 220], call: 'L.put(S, "nat-pterosaur", x, y, { s: 1, flip: false, t })' });

reg("nat-dino-eggs", (o) => {
  const egg = (x, y, k, tn) => { const d = L.smooth([[x, y - 46 * k], [x + 30 * k, y - 20 * k], [x + 32 * k, y + 14 * k], [x, y + 36 * k], [x - 32 * k, y + 14 * k], [x - 30 * k, y - 20 * k], [x, y - 46 * k]]); return L.shape(d, "cream", { tone: tn }) + clip(d, [[-12, -14, 8], [10, 4, 7], [-6, 18, 6], [14, -24, 5]].map(([a, b, r]) => B(x + a * k, y + b * k, r * k, r * k * 0.8, "green", { w: "hair", flat: true, tone: 1 })).join("") + dk(L.rect(x + 8 * k, y - 50 * k, 40 * k, 100 * k), "cream", 0.35)) + rim(d, "cream") + hi(L.circ(x - 14 * k, y - 22 * k, 5 * k, 10 * k), "white", 0.9); };
  let s = L.shadow(0, 0, 280) + L.shape(L.smooth([[-130, -20], [-120, 6], [-60, 14], [60, 14], [120, 6], [130, -20], [100, -34], [-100, -34], [-130, -20]]), "brown", { tone: 1 });
  s += egg(-56, -70, 1.0, 0) + egg(52, -66, 0.94, 1) + egg(-4, -100, 1.0, 0).replace(/^/, "");
  for (let i = 0; i < 12; i++) s += L.stroke(L.smooth([[-124 + i * 22, -8 - (i % 3) * 8], [-110 + i * 22, -30 + (i % 2) * 10], [-96 + i * 22, -14]]), { c: L.c("wood", 0), w: 6 });
  return s;
}, GD, "Dinosaur eggs in a nest", ["dino", "eggs", "nest", "prehistoric", "baby", "hatch"], { box: [-160, -170, 320, 200], call: 'L.put(S, "nat-dino-eggs", x, gy, { s: 1, t })' });

reg("nat-dino-hatching", (o) => {
  const lower = L.smooth([[-52, -66], [-56, -20], [-30, 8], [30, 8], [56, -20], [52, -66]]), crack = [[-52, -70], [-34, -92], [-18, -64], [0, -96], [18, -62], [34, -90], [52, -70]];
  let s = L.shadow(0, 8, 190) + L.shape(lower.replace(/$/, " Z"), "cream", { tone: 0 }) + L.shape(L.poly(crack.concat([[52, -66], [-52, -66]]), true), "cream", { tone: 0, w: "detail" });
  const head = LB([[0, -50], [0, -110]], 70, 70, "green", { tone: 1 });
  s = L.shadow(0, 8, 190) + B(0, -96, 40, 38, "green", { tone: 1 }) + eye(-14, -102, 10, 0.4, o) + eye(16, -102, 10, 0.4, o) + mouthSmile(2, -80, 9) + blush(-28, -86, 7) + blush(30, -86, 7) + [[-14, -134], [0, -142], [14, -134]].map(([x, y]) => T([[x - 6, y + 10], [x, y - 6], [x + 6, y + 10]], "green", { tone: 2, w: "hair" })).join("") +
    L.shape(lower.replace(/$/, ""), "cream") + clip(lower, [[-24, -30, 8], [18, -16, 7], [-10, 0, 5]].map(([a, b, r]) => B(a, b, r, r, "green", { w: "hair", flat: true, tone: 1 })).join("") + dk(L.rect(10, -70, 60, 90), "cream", 0.35)) + L.shape(L.poly(crack.concat([[52, -52], [-52, -52]]), true), "cream", { w: "detail" }) + rim(lower, "cream") +
    P([[-70, -72], [-58, -96], [-40, -70]], "cream", { w: "detail", tone: 1 }) + P([[60, -86], [80, -74], [58, -64]], "cream", { w: "detail", tone: 1 });
  return s;
}, GD, "Baby dinosaur hatching", ["dino", "baby", "hatching", "egg", "newborn", "cute"], { box: [-110, -170, 220, 200], call: 'L.put(S, "nat-dino-hatching", x, gy, { s: 1, t })' });

reg("nat-dino-skeleton", (o) => {
  const bn = "cream", b = (pts, w0, w1) => LB(pts, w0, w1, bn, { w: "detail", tone: 0 });
  let s = L.shadow(0, 0, 340) + R(-190, -14, 380, 14, 6, "stone", { w: "detail" });
  s += b([[-60, -110], [-130, -102], [-200, -62], [-232, -40]], 22, 3) + [-110, -150, -184, -212].map((x, i) => L.stroke(L.line([x, -102 + i * 14 - 8], [x - 4, -102 + i * 14 + 14]), { c: L.c("ink"), w: 3 }).replace(/^/, "")).join("");
  s += b([[-60, -110], [-10, -150], [40, -190], [74, -222]], 22, 14);
  for (let i = 0; i < 6; i++) { const x = -30 + i * 14, y = -128 - i * 4; s += LB([[x, y], [x + 14, y + 40 - i * 4], [x + 30, y + 64 - i * 8]], 11, 5, bn, { w: "detail" }); }
  s += b([[-10, -90], [-20, -50], [-14, -8]], 24, 16) + b([[40, -88], [58, -50], [60, -8]], 28, 18) + P([[-30, -6], [10, -6], [26, 0], [-30, 0]], bn, { w: "detail" }) + P([[46, -6], [86, -6], [96, 0], [46, 0]], bn, { w: "detail" });
  s += b([[40, -160], [56, -140], [70, -142]], 8, 4) + P([[56, -250], [100, -262], [166, -246], [180, -222], [168, -200], [80, -190], [56, -216]], bn) + L.shape(L.circ(106, -228, 14, 13), "ink", { w: "detail", flat: true }) + L.flat(L.circ(106, -228, 5), "white", 0.0) + T([[100, -200], [108, -182], [116, -200], [124, -200], [132, -184], [140, -200], [150, -200], [158, -202]], "white", { w: "hair", flat: true }) + L.stroke(L.line([84, -196], [170, -204]), { c: L.c("ink"), w: 3 }) + L.shape(L.circ(168, -228, 4, 5), "ink", { w: "hair", flat: true });
  return s;
}, GD, "Dinosaur skeleton (museum)", ["fossil", "skeleton", "bones", "museum", "dinosaur", "paleontology"], { box: [-250, -330, 480, 350], call: 'L.put(S, "nat-dino-skeleton", x, gy, { s: 1, flip: false, t })' });

reg("nat-dino-footprint", (o) => {
  const slab = L.smooth([[-150, -10], [-140, -90], [-60, -146], [60, -148], [140, -96], [152, -10], [60, 16], [-60, 16], [-150, -10]]);
  const toe = (x, y, a, l) => L.g(L.shape(L.smooth([[0, 0], [l * 0.3, -14], [l, 0], [l * 0.3, 14], [0, 0]]), "brown", { w: "detail", flat: true }) + L.shape(L.poly([[l, -3], [l + 14, 0], [l, 3]], true), "ink", { w: "hair", flat: true }), `translate(${x} ${y}) rotate(${a})`);
  return L.shadow(0, 14, 330) + L.shape(slab, "earth", { tone: 1 }) + clip(slab, dk(L.rect(60, -100, 120, 120), "earth", 0.35) + hi(L.circ(-70, -66, 60, 14), "earth", 0.7)) + rim(slab, "earth") +
    toe(0, -52, -122, 70) + toe(0, -52, -90, 86) + toe(0, -52, -58, 70) + L.shape(L.circ(0, -46, 32, 24), "brown", { w: "detail", flat: true }) + [[-100, -30], [100, -22], [-90, -52], [112, -52]].map(([x, y]) => dot(x, y, 5, "stone", 0.9)).join("") + leaf(110, -12, -70, 34, "green", { w: "detail" });
}, GD, "Dinosaur footprint in mud", ["footprint", "track", "fossil", "mud", "dinosaur", "trace"], { box: [-170, -170, 340, 210], call: 'L.put(S, "nat-dino-footprint", x, gy, { s: 1, t })' });

// ===================== ROCKS, MINERALS AND FOSSILS =====================
const GR = "Rocks and fossils";
const rreg = (name, fn, label, tags, o = {}) => reg(name, fn, GR, label, ["rock", "geology"].concat(tags), Object.assign({ call: `L.put(S, "${name}", x, y, { s: 1, t })` }, o));
const slab = (w, h, tone = 0) => { const d = L.rrect(-w / 2, -h / 2, w, h, 36); return L.shape(d, "stone", { tone }) + clip(d, hi(L.circ(-w * 0.2, -h * 0.32, w * 0.4, h * 0.2), "stone", 0.6) + dk(L.rect(w * 0.18, -h / 2, w, h), "stone", 0.3) + [[-0.3, 0.3, 5], [0.34, -0.3, 7], [0.1, 0.38, 4], [-0.38, -0.34, 4]].map(([a, b, r]) => B(a * w, b * h, r, r * 0.7, "stone", { tone: 2, w: "hair", flat: true })).join("")) + rim(d, "stone"); };
const sparkle = (x, y, r) => L.shape(L.star(x, y, r, r * 0.22, 4, -90), "white", { w: "hair", flat: true });

rreg("nat-crystals", (o) => {
  const pr = (x, ang, w, h, c, tn) => L.g(L.shape(L.poly([[-w / 2, 0], [-w / 2, -h], [0, -h - w * 0.7], [w / 2, -h], [w / 2, 0]], true), c, { tone: tn, w: "detail" }) + clip(L.poly([[-w / 2, 0], [-w / 2, -h], [0, -h - w * 0.7], [w / 2, -h], [w / 2, 0]], true), hi(L.poly([[-w / 2, 0], [-w / 2, -h], [-w * 0.1, -h - w * 0.55], [-w * 0.1, 0]], true), c, 0.75) + dk(L.poly([[w * 0.2, 0], [w * 0.2, -h - w * 0.5], [w / 2, -h], [w / 2, 0]], true), c, 0.4)) + ln([-w * 0.05, -h - w * 0.62], [-w * 0.05, -h], { c: L.c(c, 2), op: 0.5 }), `translate(${x} 0) rotate(${ang})`);
  let s = L.shadow(0, 0, 250) + L.shape(blob(0, -12, 110, 26, 6, 0.1), "stone", { w: "detail" });
  s += pr(-70, -34, 44, 90, "purple", 1) + pr(60, 32, 46, 100, "purple", 1) + pr(-30, -12, 58, 150, "purple", 0) + pr(26, 10, 62, 176, "purple", 0) + pr(0, 0, 40, 100, "pink", 0) + pr(-100, -52, 30, 54, "pink", 1) + pr(96, 50, 30, 60, "pink", 1);
  return s + sparkle(-18, -250, 14) + sparkle(78, -170, 10) + sparkle(-80, -150, 9);
}, "Crystal cluster", ["crystal", "amethyst", "quartz", "mineral", "gem", "purple"], { box: [-170, -330, 340, 350], call: 'L.put(S, "nat-crystals", x, gy, { s: 1, t })' });

rreg("nat-geode", (o) => {
  let s = L.shape(blob(0, 0, 144, 136, 9, 0.05, 0.4), "stone") + hi(blob(-50, -80, 60, 22, 3, 0.1), "stone", 0.6) + B(0, 0, 114, 106, "cream", { w: "detail" }) + B(0, 0, 100, 92, "purple", { tone: 1, w: "detail" }) + B(0, 0, 88, 80, "white", { w: "detail", flat: true }) + B(0, 0, 76, 68, "purple", { tone: 0, w: "detail" });
  for (let i = 0; i < 20; i++) { const a = i * 18; s += L.shape(L.poly([pol(70, a - 7, 0, 0), pol(30, a, 0, 0), pol(70, a + 7, 0, 0)], true), i % 2 ? "purple" : "pink", { tone: i % 3 === 0 ? 1 : 0, w: "hair" }); }
  return s + B(0, 0, 24, 22, "purple", { tone: 2, w: "detail" }) + sparkle(-24, -26, 12) + sparkle(30, 20, 8);
}, "Geode cut open", ["geode", "crystal", "agate", "mineral", "gemstone", "inside"], { box: [-160, -160, 320, 320] });

rreg("nat-strata", (o) => {
  const W = 210, H = 150, d = L.rrect(-W, -H, W * 2, H * 2, 22), bands = [["grass", 0, -H, 26], ["earth", 0, -H + 26, 48], ["sand", 1, -H + 74, 44], ["orange", 2, -H + 118, 50], ["stone", 1, -H + 168, 56], ["wood", 1, -H + 224, 80]];
  let s = L.shape(d, "earth", { w: "prop" }), inner = "";
  bands.forEach(([c, tn, y, h], i) => { const top = Array.from({ length: 9 }, (_, k) => [-W - 10 + k * 53, y + Math.sin(k * 1.3 + i) * 6]), bot = Array.from({ length: 9 }, (_, k) => [W + 10 - k * 53, y + h + Math.sin((8 - k) * 1.3 + i + 1) * 6]);
    inner += L.tag("path", { d: L.smooth(top.concat(bot, [top[0]])), fill: L.paint(c, { tone: tn, flat: true }), stroke: L.outline(c), "stroke-width": L.lw("detail") }); });
  inner += B(-120, -H + 148, 14, 9, "stone", { tone: 2, w: "hair" }) + B(-84, -H + 160, 9, 6, "stone", { tone: 2, w: "hair" }) + B(110, -H + 196, 18, 11, "stone", { tone: 0, w: "hair" });
  // fossils: shell (middle), fish bones (deep), bone (deepest)
  inner += L.g(P([[-18, 10], [-8, -12], [14, -10], [20, 10]], "cream", { w: "detail" }) + [-10, 0, 10].map((x) => ln([x * 0.5, 8], [x, -10], { c: L.c("cream", 2) })).join(""), `translate(-80 ${-H + 150})`) +
    L.g(sm([[-30, 0], [30, 0]], { c: "cream", w: 5 }) + [-20, -10, 0, 10, 20].map((x) => ln([x, -8], [x, 8], { c: L.c("cream", 1) })).join("") + T([[30, 0], [48, -12], [48, 12]], "cream", { w: "hair", flat: true }) + B(-36, 0, 9, 8, "cream", { w: "hair" }), `translate(70 ${-H + 200})`) +
    L.g(LB([[-34, 0], [34, 0]], 9, 9, "cream", { w: "detail" }) + B(-38, -6, 10, 10, "cream", { w: "detail" }) + B(-38, 6, 10, 10, "cream", { w: "detail" }) + B(38, -6, 10, 10, "cream", { w: "detail" }) + B(38, 6, 10, 10, "cream", { w: "detail" }), `translate(-60 ${-H + 262}) rotate(-8)`);
  s += clip(d, inner) + rim(d, "earth");
  return s + lab(o, "newer", W + 54, -H + 28, 26).replace("text-anchor=\"middle\"", "text-anchor=\"middle\"") + lab(o, "older", W + 54, H - 12, 26) + (o.labels === false ? "" : L.stroke(L.poly([[W + 54, -H + 44], [W + 54, H - 40]]), { w: "prop" }) + L.stroke(L.poly([[W + 42, H - 56], [W + 54, H - 38], [W + 66, H - 56]]), { w: "prop" }));
}, "Rock layers (strata)", ["strata", "layers", "fossils", "geology", "cross-section", "time", "sediment"], { box: [-250, -180, 560, 360], call: 'L.put(S, "nat-strata", x, y, { s: 1, t, labels: true })' });

rreg("nat-ammonite", (o) => {
  const pts = Array.from({ length: 34 }, (_, i) => { const th = i * 0.4, r = 6.6 * Math.exp(0.2 * th); return [Math.cos(th - 1) * r * 0.98, Math.sin(th - 1) * r * 0.98]; });
  const mid = pts[pts.length - 1], ofs = [-mid[0] * 0.4, -mid[1] * 0.4];
  const sh = pts.map(([x, y]) => [x + ofs[0], y + ofs[1]]);
  let s = slab(300, 260) + L.g(LB(sh, 5, 68, "sand", { tone: 1, w: "detail" }), "") + sh.filter((_, i) => i > 6 && i % 2 === 0).map(([x, y], k, a) => { const i = pts.indexOf(pts.find((p) => p[0] + ofs[0] === x && p[1] + ofs[1] === y)), w = 5 + 63 * (i / 33), nx = sh[Math.min(33, i + 1)], ang = Math.atan2(nx[1] - y, nx[0] - x) + Math.PI / 2; return L.stroke(L.line([x - Math.cos(ang) * w * 0.4, y - Math.sin(ang) * w * 0.4], [x + Math.cos(ang) * w * 0.4, y + Math.sin(ang) * w * 0.4]), { c: L.c("sand", 2), w: 3.5 }); }).join("");
  return s + B(sh[0][0], sh[0][1], 5, 5, "sand", { tone: 2, w: "hair" });
}, "Ammonite fossil", ["ammonite", "fossil", "spiral", "shell", "ancient", "stone"], { box: [-170, -150, 340, 300] });

rreg("nat-trilobite", (o) => {
  let s = slab(300, 240), body = "";
  for (let i = 0; i < 8; i++) { const y = -36 + i * 17, w = 52 - i * 3.4; body += L.shape(L.smooth([[-w, y], [-w * 0.9, y + 14], [w * 0.9, y + 14], [w, y], [0, y - 8], [-w, y]]), "sand", { tone: i % 2 ? 0 : 1, w: "detail" }); }
  s += L.shape(L.smooth([[-52, -36], [-54, -76], [-20, -96], [20, -96], [54, -76], [52, -36], [0, -28], [-52, -36]]), "sand", { tone: 1 }) + body + L.shape(L.smooth([[-30, 96], [-24, 70], [24, 70], [30, 96], [0, 112], [-30, 96]]), "sand", { tone: 0, w: "detail" }).replace(/^/, "");
  s += L.stroke(L.line([0, -88], [0, 96]), { c: L.c("sand", 2), w: 4, op: 0.8 }) + eye(-26, -66, 8, 0, o).replace(/^/, "");
  s += [-26, 26].map((x) => B(x, -66, 9, 7, "ink", { w: "hair", flat: true })).join("") + sm([[-50, -50], [-68, -34]]).replace(/^/, "") + hi(L.circ(-30, -70, 18, 8), "sand", 0.6);
  return s;
}, "Trilobite fossil", ["trilobite", "fossil", "ancient", "arthropod", "stone", "prehistoric"], { box: [-170, -140, 340, 280] });

rreg("nat-fossil-fish", (o) => {
  const b = (d, w = 5) => L.stroke(d, { c: L.c("cream", 0), w });
  let s = slab(340, 220, 1), ribs = "";
  for (let i = 0; i < 9; i++) { const x = -50 + i * 15, h = 38 - Math.abs(i - 3.5) * 3; ribs += L.line([x, 0], [x - 8, -h]) + L.line([x, 0], [x - 8, h]); }
  s += b("M-92 0 L96 0", 7) + b(ribs, 4) + b(L.smooth([[-92, 0], [-84, -42], [-40, -52], [20, -38], [96, 0], [20, 38], [-40, 52], [-84, 42], [-92, 0]]), 4) + b("M-96 0 L-132 -40 M-96 0 L-132 40 M-98 0 L-136 -18 M-98 0 L-136 18", 4) + B(70, -2, 20, 17, "cream", { w: "detail" }) + L.shape(L.circ(74, -6, 7, 7), "stone", { tone: 2, w: "hair", flat: true }) + b("M96 0 L112 -8 M96 0 L112 8", 4) + b("M-20 -46 L-10 -62 L10 -44", 4);
  return s;
}, "Fish fossil", ["fish", "fossil", "skeleton", "ancient", "stone", "bones"], { box: [-180, -120, 360, 240] });

rreg("nat-gems", (o) => {
  const gem = (cx, cy, w, h, c, tn) => { const q = (x, y) => [cx + x * w, cy + y * h], sh = L.poly([q(-0.5, -0.18), q(-0.3, -0.5), q(0.3, -0.5), q(0.5, -0.18), q(0, 0.5)], true), f = (pts, k, op) => L.flat(L.poly(pts.map(([x, y]) => q(x, y)), true), L.c(c, k), op);
    return L.shape(sh, c, { tone: tn, flat: true }) + f([[-0.3, -0.5], [0.3, -0.5], [0.18, -0.18], [-0.18, -0.18]], 1, 1) + f([[-0.5, -0.18], [-0.3, -0.5], [-0.18, -0.18]], 0, 1) + f([[0.5, -0.18], [0.3, -0.5], [0.18, -0.18]], 2, 0.9) + f([[-0.5, -0.18], [-0.18, -0.18], [0, 0.5]], 0, 1) + f([[0.5, -0.18], [0.18, -0.18], [0, 0.5]], 2, 1) + f([[-0.18, -0.18], [0.18, -0.18], [0, 0.5]], 1, 0.9) + L.tag("path", { d: L.poly([q(-0.5, -0.18), q(-0.3, -0.5), q(0.3, -0.5), q(0.5, -0.18), q(0, 0.5)], true) + L.poly([q(-0.5, -0.18), q(0.5, -0.18)]) + L.poly([q(-0.18, -0.18), q(0, 0.5), q(0.18, -0.18)]) + L.poly([q(-0.3, -0.5), q(-0.18, -0.18)]) + L.poly([q(0.3, -0.5), q(0.18, -0.18)]), fill: "none", stroke: L.outline(c), "stroke-width": L.lw("detail"), "stroke-linejoin": "round" });
  };
  return L.shadow(0, 70, 360) + gem(-100, 14, 110, 120, "red", 0) + gem(100, 14, 110, 120, "green", 0) + gem(0, -4, 150, 160, "water", 0) + sparkle(-34, -62, 16) + sparkle(120, -34, 11) + sparkle(-120, -34, 10) + sparkle(46, -18, 8);
}, "Gemstones", ["gems", "diamond", "ruby", "emerald", "jewel", "treasure", "crystal"], { box: [-190, -110, 380, 200] });

rreg("nat-cave-formations", (o) => {
  const cone = (x, y, w, h, c = "stone", tn = 0) => L.shape(L.smooth([[x - w / 2, y], [x - w * 0.18, y + h * 0.6], [x, y + h], [x + w * 0.18, y + h * 0.6], [x + w / 2, y], [x - w / 2, y]]), c, { tone: tn, w: "detail" });
  const ce = L.smooth([[-190, -304], [-190, -246], [-120, -236], [-30, -250], [60, -234], [140, -244], [190, -246], [190, -304], [-190, -304]]);
  let s = L.shape(ce, "stone", { tone: 2 }) + [[-140, -240, 38, 90], [-70, -242, 26, 56], [-6, -250, 44, 120], [70, -238, 30, 70], [130, -244, 40, 100]].map(([x, y, w, h], i) => cone(x, y, w, h, "stone", i % 2 ? 1 : 0) + hi(L.poly([[x - w * 0.3, y], [x - w * 0.05, y + h * 0.8], [x - w * 0.12, y]], true), "stone", 0.6)).join("") + drop(40, -150, 0.9);
  const fl = L.smooth([[-190, 0], [-190, -30], [-100, -22], [0, -30], [100, -22], [190, -30], [190, 0], [-190, 0]]);
  s += L.shape(fl, "stone", { tone: 2 }) + [[-120, -22, 40, -80], [-40, -26, 28, -50], [6, -30, 44, -116], [76, -24, 34, -66], [136, -22, 44, -92]].map(([x, y, w, h], i) => L.shape(L.smooth([[x - w / 2, y], [x - w * 0.16, y + h * 0.6], [x, y + h], [x + w * 0.16, y + h * 0.6], [x + w / 2, y], [x - w / 2, y]]), "stone", { tone: i % 2 ? 0 : 1, w: "detail" })).join("");
  return s + B(-60, -6, 40, 8, "water", { w: "hair", flat: true, tone: 1 }) + L.shadow(0, 0, 0);
}, "Stalactites and stalagmites", ["cave", "stalactite", "stalagmite", "dripping", "underground", "limestone"], { box: [-210, -320, 420, 340], call: 'L.put(S, "nat-cave-formations", x, gy, { s: 1, t })' });

rreg("nat-rock-arch", (o) => {
  const outer = [[-190, 0], [-176, -100], [-130, -190], [-40, -236], [60, -232], [140, -186], [184, -96], [194, 0]], inner = [[100, 0], [96, -70], [60, -120], [0, -134], [-60, -118], [-96, -70], [-100, 0]];
  const d = L.smooth(outer.concat([outer[0]])) + L.smooth(inner.concat([inner[0]])).replace(/^M[^C]*/, (m) => m);
  const arch = L.smooth([[-190, 0], [-176, -100], [-130, -190], [-40, -236], [60, -232], [140, -186], [184, -96], [194, 0], [100, 0], [96, -70], [60, -120], [0, -134], [-60, -118], [-96, -70], [-100, 0], [-190, 0]]);
  let bands = ""; [[-232, 0], [-196, 1], [-160, 2], [-120, 0], [-84, 1], [-44, 2], [-6, 0]].forEach(([y, tn], i, a) => { bands += L.tag("path", { d: L.rect(-200, y, 400, (a[i + 1] ? a[i + 1][0] : 4) - y + 2), fill: L.c("orange", tn === 0 ? 1 : tn === 1 ? 0 : 2), opacity: 1 }) + L.tag("path", { d: L.poly([[-200, y], [200, y]]), stroke: L.c("orange", 2), "stroke-width": 3, opacity: 0.6 }); });
  return L.shadow(0, 0, 420) + L.shape(arch, "orange", { tone: 0 }) + clip(arch, bands + hi(L.circ(-100, -170, 50, 24), "orange", 0.6) + dk(L.rect(100, -240, 100, 250), "orange", 0.3)) + rim(arch, "orange") + B(-210, -6, 22, 14, "orange", { tone: 1, w: "detail" }) + B(214, -4, 18, 12, "orange", { tone: 1, w: "detail" });
}, "Natural rock arch", ["arch", "desert", "sandstone", "erosion", "canyon", "rock formation"], { box: [-240, -260, 480, 280], call: 'L.put(S, "nat-rock-arch", x, gy, { s: 1, t })' });

rreg("nat-gold-nuggets", (o) => {
  const nug = (x, y, k, tn) => { const pts = [[-30, 4], [-34, -16], [-16, -34], [10, -36], [32, -20], [34, 2], [14, 12], [-14, 12], [-30, 4]].map(([a, b]) => [x + a * k, y + b * k]); return L.shape(L.smooth(pts), "gold", { tone: tn }) + hi(L.circ(x - 10 * k, y - 22 * k, 12 * k, 6 * k), "gold", 0.9) + dk(L.circ(x + 16 * k, y - 4 * k, 12 * k, 8 * k), "gold", 0.4) + ln([x - 4 * k, y - 6 * k], [x + 8 * k, y + 2 * k], { c: L.c("gold", 2), op: 0.7 }); };
  return L.shadow(0, 0, 260) + nug(-70, 0, 1.1, 0) + nug(70, -2, 1.0, 1) + nug(0, 2, 1.2, 0) + nug(-34, -40, 0.9, 1) + nug(36, -42, 0.95, 0) + nug(0, -76, 0.8, 1) + sparkle(-18, -112, 14) + sparkle(78, -66, 10) + sparkle(-100, -50, 9);
}, "Gold nuggets", ["gold", "nuggets", "mining", "treasure", "ore", "rich", "gold rush"], { box: [-170, -150, 340, 170], call: 'L.put(S, "nat-gold-nuggets", x, gy, { s: 1, t })' });

// ===================== VOLCANO AND EARTH =====================
const GE = "Volcano and Earth";
const ereg = (name, fn, label, tags, o = {}) => reg(name, fn, GE, label, ["earth", "geology"].concat(tags), Object.assign({ call: `L.put(S, "${name}", x, gy, { s: 1, t })` }, o));
const cloud = (cs, c = "gray", tn = 1) => cs.map(([x, y, r]) => L.shape(L.circ(x, y, r), c, { w: "prop", flat: true, tone: tn })).join("") + cs.map(([x, y, r]) => L.tag("path", { d: L.circ(x, y, Math.max(r - L.lw("prop") / 2 + 0.5, 1)), fill: L.paint(c, { tone: tn }) })).join("");
const arrowH = (a, b, c = "ink", w = "prop") => { const ang = Math.atan2(b[1] - a[1], b[0] - a[0]), h = (d) => [b[0] - 22 * Math.cos(ang + d), b[1] - 22 * Math.sin(ang + d)]; return L.stroke(L.line(a, b), { c, w }) + L.stroke(L.poly([h(0.5), b, h(-0.5)]), { c, w }); };

ereg("nat-volcano-erupting", (o) => {
  const mt = L.smooth([[-240, 0], [-150, -90], [-70, -190], [-42, -232], [42, -232], [70, -190], [150, -90], [240, 0], [-240, 0]]);
  let s = glow(0, -250, 170, "orange", 0.55, 120) + L.shadow(0, 0, 500);
  s += [[-40, -300, 9], [30, -330, 11], [60, -290, 8], [-10, -360, 8]].map(([x, y, r]) => B(x, y, r, r, "lava", { tone: 1, w: "detail" })).join("");
  s += L.shape(L.smooth([[-30, -234], [-52, -300], [-30, -340], [0, -366], [28, -334], [52, -296], [34, -234], [-30, -234]]), "lava", { tone: 0, w: "detail" }) + L.shape(L.smooth([[-14, -236], [-18, -290], [0, -332], [20, -288], [16, -236]]), "yellow", { tone: 0, w: "hair", flat: true });
  s += L.shape(mt, "brown", { tone: 1 }) + clip(mt, hi(L.smooth([[-60, -170], [-140, -80], [-200, -10], [-150, -10], [-90, -90]]), "brown", 0.5) + dk(L.smooth([[70, -190], [160, -80], [240, 0], [120, 0], [60, -120]]), "brown", 0.5)) + rim(mt, "brown");
  s += L.shape(L.smooth([[-40, -232], [-26, -222], [0, -226], [26, -222], [40, -232], [20, -240], [-20, -240], [-40, -232]]), "lava", { w: "detail", tone: 0 });
  s += L.shape(L.smooth([[-20, -230], [-34, -190], [-60, -150], [-80, -100], [-70, -60], [-52, -100], [-36, -140], [-8, -186], [0, -226]]), "lava", { tone: 0, w: "detail" }) + L.shape(L.smooth([[14, -228], [30, -180], [60, -130], [92, -70], [106, -30], [124, -30], [116, -80], [84, -140], [44, -196], [30, -228]]), "lava", { tone: 1, w: "detail" });
  s += cloud([[-90, -400, 46], [-30, -440, 56], [40, -430, 50], [96, -396, 44], [10, -392, 44]], "gray", 1) + cloud([[-130, -450, 28], [140, -450, 26], [-44, -490, 24]], "gray", 0);
  return s;
}, "Erupting volcano", ["volcano", "eruption", "lava", "ash", "magma", "explosion"], { box: [-270, -540, 540, 560] });

ereg("nat-volcano-island", (o) => {
  const isl = L.smooth([[-230, 0], [-150, -20], [-100, -70], [-56, -150], [-30, -190], [30, -190], [58, -150], [100, -80], [160, -30], [240, 0], [-230, 0]]);
  let s = L.shape(isl, "green", { tone: 0 }) + clip(isl, L.flat(L.smooth([[-50, -150], [-30, -190], [30, -190], [50, -150], [20, -120], [0, -140], [-20, -118]]), "brown", 1) + dk(L.rect(30, -200, 220, 220), "green", 0.3) + hi(L.circ(-120, -50, 50, 14), "green", 0.6) + L.flat(L.smooth([[-240, -6], [-100, -12], [100, -12], [240, -4], [240, 4], [-240, 4]]), "sand", 1)) + rim(isl, "green");
  s += L.shape(L.smooth([[-14, -192], [-6, -178], [6, -178], [14, -192], [0, -198], [-14, -192]]), "lava", { w: "hair", tone: 0 }) + cloud([[10, -226, 16], [26, -258, 20], [10, -292, 24], [-14, -330, 26]], "gray", 0) + [[-150, -30], [-170, -26], [120, -34], [150, -26]].map(([x, y], i) => L.g(LB([[0, 0], [0, -20]], 8, 6, "wood", { w: "hair" }) + blob(0, -26, 16, 11, 5, 0.12), `translate(${x} ${y})`).replace(/<path d="(M[^"]*)" fill="url\(#[^"]*\)"/, "$&")).join("");
  s += L.shape(L.rrect(-260, -4, 520, 76, 24), "water", { tone: 0, w: "prop" }) + [[-200, 20], [-60, 38], [90, 18], [190, 40]].map(([x, y]) => sm([[x - 30, y], [x - 14, y - 7], [x, y], [x + 14, y - 7], [x + 30, y]], { c: "white", w: 4 })).join("");
  return s;
}, "Volcanic island", ["volcano", "island", "sea", "ocean", "tropical", "hawaii-like"], { box: [-270, -390, 540, 480] });

ereg("nat-geyser", (o) => {
  const rimD = L.smooth([[-170, 0], [-160, -26], [-90, -40], [0, -44], [90, -40], [160, -26], [170, 0], [-170, 0]]);
  let s = L.shadow(0, 0, 360) + L.shape(rimD, "stone") + clip(rimD, dk(L.rect(60, -50, 120, 60), "stone", 0.4) + hi(L.circ(-90, -30, 40, 8), "stone", 0.7)) + rim(rimD, "stone") + L.shape(L.circ(0, -34, 80, 16), "water", { tone: 1, w: "detail" });
  s += L.shape(L.smooth([[-30, -34], [-24, -130], [-34, -230], [-22, -300], [0, -330], [22, -300], [34, -230], [24, -130], [30, -34], [0, -26], [-30, -34]]), "glass", { tone: 0 }) + hi(L.smooth([[-18, -50], [-20, -140], [-14, -250], [-8, -300], [-8, -150], [-10, -50]]), "white", 0.9) + [[-60, -110], [64, -160], [-70, -210], [70, -250], [-44, -300], [54, -312]].map(([x, y]) => drop(x, y, 0.9)).join("");
  s += cloud([[-50, -350, 36], [10, -378, 46], [66, -346, 36], [0, -340, 36]], "white", 0) + cloud([[-100, -300, 22], [110, -290, 20]], "white", 0);
  return s + [[-130, -14, 14], [130, -12, 16], [-100, -34, 10]].map(([x, y, r]) => B(x, y, r, r * 0.7, "stone", { tone: 2, w: "hair" })).join("");
}, "Geyser", ["geyser", "hot spring", "steam", "yellowstone-like", "water", "eruption"], { box: [-190, -450, 380, 470] });

ereg("nat-tectonic-plates", (o) => {
  const W = 260;
  let s = L.shape(L.rrect(-W, 40, W * 2, 220, 24), "lava", { tone: 1, w: "prop" }) + clip(L.rrect(-W, 40, W * 2, 220, 24), hi(L.circ(-120, 170, 140, 50), "lava", 0.6)) + rim(L.rrect(-W, 40, W * 2, 220, 24), "lava");
  s += L.shape(L.rrect(-W, 0, W - 10, 44, 10), "earth", { tone: 0, w: "prop" }) + L.shape(L.rrect(10, 0, W - 10, 44, 10), "earth", { tone: 1, w: "prop" });
  s += P([[-120, 2], [-70, -48], [-30, -110], [0, -150], [34, -108], [74, -48], [124, 2]], "stone", { tone: 0 }) + L.shape(L.smooth([[-18, -126], [0, -150], [20, -120], [8, -110], [0, -120], [-8, -108]]), "snow", { w: "detail" }) + sm([[-44, -70], [-20, -76], [-6, -56]], { c: L.c("stone", 2), op: 0.7 }) + sm([[56, -64], [36, -80], [24, -56]], { c: L.c("stone", 2), op: 0.7 });
  s += arrowH([-240, -26], [-150, -26], "red", "prop").replace(/^/, "") + arrowH([240, -26], [150, -26], "red", "prop");
  s += L.stroke(L.smooth([[-170, 100], [-170, 70], [-100, 62]]), { c: L.c("yellow", 1), w: 7 }) + arrowH([-150, 66], [-80, 62], "yellow", "prop") + arrowH([150, 70], [80, 66], "yellow", "prop") + L.stroke(L.smooth([[170, 200], [100, 220], [-100, 220], [-170, 190]]), { c: L.c("yellow", 1), w: 7 }) + arrowH([-90, 220], [-170, 192], "yellow", "prop");
  return s + lab(o, "crust", -170, -52, 28) + lab(o, "plates push", 0, -176, 28) + lab(o, "mantle", 0, 150, 34) + lab(o, "rises", 200, 128, 26).replace(/^/, "");
}, "Colliding tectonic plates", ["plates", "mountains", "crust", "mantle", "earthquake", "continents", "cross-section"], { box: [-290, -220, 580, 500], call: 'L.put(S, "nat-tectonic-plates", x, gy, { s: 1, t, labels: true })' });

ereg("nat-iceberg", (o) => {
  const tip = L.smooth([[-70, 0], [-56, -50], [-28, -100], [4, -78], [30, -118], [64, -52], [90, 0], [-70, 0]]), under = L.smooth([[-130, 0], [-170, 60], [-150, 140], [-70, 210], [20, 232], [110, 190], [166, 110], [150, 40], [120, 0], [-130, 0]]);
  let s = L.shape(L.rrect(-260, 0, 520, 280, 30), "water", { tone: 0, w: "prop", op: 0.5 }) + L.shape(under, "glass", { tone: 0, w: "prop", op: 0.8 }) + clip(under, hi(L.circ(-60, 80, 70, 40), "water", 0.4) + dk(L.rect(40, 0, 140, 240), "water", 0.35)) + rim(under, "glass");
  s += L.shape(tip, "snow") + clip(tip, dk(L.smooth([[4, -78], [30, -118], [64, -52], [90, 0], [20, 0]]), "snow", 0.8) + hi(L.circ(-30, -50, 20, 30), "white", 0.9)) + rim(tip, "snow");
  s += sm([[-262, 0], [-210, -10], [-160, 0], [-110, -10], [-70, -2]], { c: "white", w: 6 }) + sm([[96, -2], [140, -10], [190, 0], [230, -10], [262, 0]], { c: "white", w: 6 }) + L.tag("path", { d: "M-260 0 H260", stroke: L.c("water", 2), "stroke-width": 3, opacity: 0.0 });
  return s + lab(o, "10%", 160, -34, 36) + lab(o, "90% below water", 0, 260, 34);
}, "Iceberg (above and below water)", ["iceberg", "ice", "tip of the iceberg", "arctic", "ocean", "titanic-like", "hidden"], { box: [-280, -140, 560, 440], call: 'L.put(S, "nat-iceberg", x, gy, { s: 1, t, labels: true })' });

ereg("nat-waterfall", (o) => {
  const sq = (pts) => pts.map(([x, y]) => [Math.abs(x) > 100 ? x * 0.93 : x, y]);
  const lc = L.smooth(sq([[-244, 0], [-248, -120], [-232, -196], [-184, -228], [-124, -234], [-80, -222], [-56, -198], [-62, -150], [-74, -84], [-72, -30], [-90, 0], [-244, 0]])),
    rc = L.smooth(sq([[244, 0], [248, -110], [232, -184], [186, -214], [128, -214], [86, -200], [60, -180], [62, -130], [72, -70], [76, -24], [90, 0], [244, 0]]));
  const fall = L.smooth([[-56, -200], [-50, -130], [-52, -70], [-62, -28], [-74, -2], [0, 8], [74, -2], [62, -28], [54, -70], [52, -130], [58, -196], [0, -212], [-56, -200]]);
  let s = L.shadow(0, 0, 480) + L.shape(fall, "water", { tone: 1, w: "detail" }) + clip(fall, hi(L.rect(-70, -220, 56, 230), "water", 0.7) + dk(L.rect(30, -220, 50, 230), "water", 0.35) +
    [[-34, -200, -60], [-14, -210, -120], [8, -196, -40], [28, -204, -90], [-24, -150, -40], [18, -120, -50]].map(([x, y, h]) => sm([[x, y], [x + 4, y - h * 0.4], [x - 3, y - h * 0.8], [x + 2, y - h * 1.2 - 40]].map(([a, b]) => [a, -b + y * 2 - y]), { c: "white", w: 4, op: 0.8 })).join(""));
  s += [[-40, -170, 80], [-8, -190, 120], [22, -160, 90], [42, -130, 70], [-26, -90, 60]].map(([x, y, h]) => sm([[x, y], [x + 3, y + h * 0.35], [x - 2, y + h * 0.7], [x + 2, y + h]], { c: "white", w: 4, op: 0.85 })).join("");
  s += L.shape(lc, "stone") + clip(lc, hi(L.circ(-160, -170, 70, 26), "stone", 0.6) + dk(L.rect(-110, -240, 60, 250), "stone", 0.25) + [[-230, -150, -150, -130, -80, -150], [-230, -90, -170, -70, -100, -92], [-200, -30, -150, -10, -92, -34]].map(([a, b, c, d, e, f]) => sm([[a, b], [c, d], [e, f]], { c: L.c("stone", 2), op: 0.5 })).join("") +
    L.flat(L.smooth([[-250, -150], [-232, -206], [-184, -234], [-124, -240], [-70, -228], [-52, -204], [-110, -196], [-170, -190], [-210, -170], [-250, -150]]), "green", 1) + L.flat(L.smooth([[-200, -210], [-150, -226], [-100, -222]]), "grass", 0.5)) + rim(lc, "stone");
  s += L.shape(rc, "stone", { tone: 1 }) + clip(rc, dk(L.rect(100, -220, 160, 230), "stone", 0.3) + [[240, -140, 170, -120, 90, -140], [240, -80, 160, -60, 90, -82], [220, -26, 160, -8, 96, -28]].map(([a, b, c, d, e, f]) => sm([[a, b], [c, d], [e, f]], { c: L.c("stone", 2), op: 0.5 })).join("") +
    L.flat(L.smooth([[250, -140], [232, -194], [186, -220], [128, -220], [80, -204], [58, -180], [120, -176], [180, -170], [220, -156], [250, -140]]), "green", 1)) + rim(rc, "stone");
  s += B(0, -4, 150, 30, "water", { tone: 1, w: "detail" }) + [[0, -2, 104, 20], [0, -2, 58, 11]].map(([x, y, rx, ry]) => L.tag("ellipse", { cx: x, cy: y, rx, ry, fill: "none", stroke: "white", "stroke-width": 4, opacity: 0.85 })).join("");
  s += L.shape(blob(0, -12, 80, 20, 9, 0.2), "white", { w: "detail" }) + hi(blob(-20, -20, 40, 8, 4, 0.2), "water", 0.5) + cloud([[-70, -26, 10], [66, -24, 12], [-34, -36, 9], [38, -38, 8]], "white", 0);
  s += L.g(LB([[0, 0], [0, -34]], 10, 8, "wood") + L.shape(blob(0, -54, 30, 24, 5, 0.12), "green"), "translate(-190 -232) scale(0.8)") + L.g(LB([[0, 0], [0, -34]], 10, 8, "wood") + L.shape(blob(0, -54, 30, 24, 5, 0.12), "green"), "translate(160 -212) scale(0.9)");
  return s + B(-130, -4, 30, 12, "stone", { tone: 1, w: "detail" }) + B(120, -6, 24, 10, "stone", { tone: 1, w: "detail" });
}, "Waterfall", ["waterfall", "river", "cliff", "mist", "nature", "scenery"], { box: [-250, -310, 500, 330] });

ereg("nat-canyon", (o) => {
  const Lw = [[-270, -216], [-240, -214], [-218, -198], [-212, -160], [-188, -148], [-164, -140], [-154, -112], [-132, -98], [-106, -92], [-98, -62], [-82, -46], [-64, -30], [-52, 4]],
    Rw = [[52, 4], [66, -30], [84, -48], [96, -66], [112, -90], [140, -100], [156, -114], [168, -142], [196, -150], [214, -162], [220, -198], [244, -214], [270, -216]];
  const valley = L.smooth(Lw).replace(/^M/, "M") + " " + L.smooth(Rw).replace(/^M/, "L") + " L270 40 L-270 40 Z";
  const r = seed(11), strata = [["sand", 1, -216], ["orange", 1, -158], ["orange", 0, -102], ["orange", 2, -50], ["wood", 1, 0]];
  const wave = (y) => L.smooth([-290, -220, -150, -80, 0, 80, 150, 220, 290].map((x) => [x, y + (r() - 0.5) * 12])) + " L290 60 L-290 60 Z";
  let inner = strata.map(([c, tn, y]) => L.tag("path", { d: wave(y), fill: L.c(c, tn) })).join("") + dk(L.rect(60, -220, 230, 270), "orange", 0.22) + hi(L.circ(-190, -190, 70, 26), "sand", 0.5);
  const far = L.smooth([[-112, 6], [-104, -52], [-76, -76], [-34, -82], [0, -94], [40, -88], [76, -74], [102, -46], [112, 6], [-112, 6]]);
  let s = L.shape(far, "sand", { tone: 0, w: "detail" }) + clip(far, L.flat(L.rect(-120, -50, 240, 70), "orange", 0.3) + L.flat(L.rect(-120, -90, 240, 24), "orange", 0.18)) + rim(far, "sand", { w: "detail" });
  s += L.shape(valley, "orange", { tone: 0 }) + clip(valley, inner + [-148, -92, -42].map((y) => sm([[-270, y], [-100, y + 6], [100, y - 4], [270, y + 4]], { c: L.c("orange", 2), op: 0.35 })).join("")) + rim(valley, "orange");
  return s + L.shape(L.smooth([[-84, 4], [-60, -6], [0, -2], [60, -6], [84, 4], [60, 28], [-60, 28], [-84, 4]]), "water", { w: "detail", tone: 0 }) + sm([[-54, 6], [-30, 0], [0, 6], [30, 0], [54, 6]], { c: "white", w: 4 }) + [[-190, -156], [244, -156], [-124, -102]].map(([x, y]) => B(x, y - 6, 12, 7, "green", { tone: 1, w: "detail" })).join("") + L.g(LB([[0, 0], [0, -18]], 5, 4, "wood") + L.shape(blob(0, -28, 14, 12, 4, 0.1), "green", { w: "detail" }), "translate(-60 -34)");
}, "Canyon with river", ["canyon", "river", "erosion", "layers", "desert", "grand canyon-like"], { box: [-290, -230, 580, 280], call: 'L.put(S, "nat-canyon", x, gy, { s: 1, t })' });
})();
