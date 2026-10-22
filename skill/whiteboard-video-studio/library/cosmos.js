// ===================== library/cosmos.js — space and physics props (category "cosmos", prefix cos-) =====================
// Planets with their looks, stars, black holes, galaxies, small bodies, orbit/light diagrams, spacecraft, telescopes, aliens,
// atoms, waves and simple machines. Floating things draw around the origin; things that stand have the origin on the ground.
// Diagram labels go through L.text and switch off with o.labels === false. Colours/widths come from the L tokens only.
(function () {
const L = window.L, f1 = L.f1;

// ---------- helpers ----------
const D2R = Math.PI / 180, P = (r, a, cx = 0, cy = 0) => [cx + r * Math.cos(a * D2R), cy + r * Math.sin(a * D2R)];
const pt = (v) => `${f1(v[0])} ${f1(v[1])}`;
let nid = 0;
const clip = (d, inner) => { const id = "cosc" + ++nid; return `<clipPath id="${id}"><path d="${d}"/></clipPath><g clip-path="url(#${id})">${inner}</g>`; };
const fl = (d, c, tone = 0, op) => L.tag("path", { d, fill: L.c(c, tone), opacity: op }); // flat fill in any tone, no outline
const dot = (x, y, r = 5, c = "ink", op) => L.tag("path", { d: L.circ(x, y, r), fill: L.c(c), opacity: op });
const lab = (o, s, x, y, size = 28, c, anchor) => (o.labels === false ? "" : L.text(s, x, y, { size, c, anchor, halo: c === "white" ? "navy" : "paper", haloW: 0.2 }));
const card = (x, y, w, h, c = "navy") => L.shape(L.rrect(x, y, w, h, 28), c, { w: "prop", flat: true });
const ellp = (cx, cy, rx, ry, rev) => rev ? `M${f1(cx - rx)} ${f1(cy)} A${f1(rx)} ${f1(ry)} 0 1 1 ${f1(cx + rx)} ${f1(cy)} A${f1(rx)} ${f1(ry)} 0 1 1 ${f1(cx - rx)} ${f1(cy)} Z` : L.circ(cx, cy, rx, ry);
const blob = (cx, cy, r, seed, n = 12, j = 0.14) => { const g = L.rng(seed), p = Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2, k = r * (1 - j / 2 + g() * j); return [cx + Math.cos(a) * k, cy + Math.sin(a) * k]; }); p.push(p[0]); return L.smooth(p); };
const arrow = (pts, c = "ink", w = "prop", hs = 16) => {
  const a = pts[pts.length - 2], b = pts[pts.length - 1], ang = Math.atan2(b[1] - a[1], b[0] - a[0]);
  const h = (d) => [b[0] - hs * Math.cos(ang + d), b[1] - hs * Math.sin(ang + d)];
  return L.stroke(pts.length > 2 ? L.smooth(pts) : L.poly(pts), { c, w }) + L.stroke(L.poly([h(0.5), b, h(-0.5)]), { c, w });
};
const tube = (d, c, w, op) => (L.T.ink === "none" ? "" : L.stroke(d, { c: L.outline(c), w: w + L.lw("detail") * 2, op })) + L.stroke(d, { c, w, op });
const spark = (x, y, r, c = "white", op = 0.9) => fl(L.star(x, y, r, r * 0.26, 4, -90), c, 0, op);
const leader = (o, x1, y1, x2, y2) => (o.labels === false ? "" : L.stroke(L.poly([[x1, y1], [x2, y2]]), { w: "detail" }) + dot(x1, y1, 5));
const puff = (cs, c = "white") =>
  cs.map(([x, y, r]) => L.shape(L.circ(x, y, r), c, { w: "prop", flat: true })).join("") +
  cs.map(([x, y, r]) => L.tag("path", { d: L.circ(x, y, Math.max(r - L.lw("prop") / 2 + 0.5, 1)), fill: L.paint(c) })).join("");
// soft crescent of shade on the lower right of a sphere
const shade = (cx, cy, r) => L.T.shade === "flat" ? "" : L.tag("path", { d: L.circ(cx, cy, r * 2.2) + L.circ(cx - r * 0.3, cy - r * 0.3, r * 1.05), fill: L.c("ink"), "fill-rule": "evenodd", opacity: 0.16 });
// a lit ball: base colour + inner surface detail (clipped) + shade + glint + outline
const sph = (cx, cy, r, c, inner = "", o = {}) => {
  const d = L.circ(cx, cy, r);
  return L.shape(d, c, { w: "prop" }) + clip(d, inner + shade(cx, cy, r)) + (o.noHi ? "" : fl(L.circ(cx - r * 0.38, cy - r * 0.42, r * 0.2, r * 0.12), "white", 0, 0.45)) + edge(d);
};
const glow = (cx, cy, r, c, n = 3, op = 0.2) => Array.from({ length: n }, (_, i) => fl(L.circ(cx, cy, r * (1 + (n - i) * 0.22)), c, 1, op)).join("");
const crater = (x, y, rx, ry = rx * 0.6) => fl(ellp(x, y, rx, ry), "ink", 0, 0.2) + fl(ellp(x - rx * 0.12, y - ry * 0.18, rx * 0.8, ry * 0.7), "white", 0, 0.16);
// place another library asset: fitted by its gallery box into a square of `size`, centred on (cx, cy)
const fit = (name, cx, cy, size, o = {}) => {
  const b = L.get(name).box, k = size / Math.max(b[2], b[3]);
  return L.g(L.inline(name, o), `translate(${f1(cx)} ${f1(cy)}) scale(${k.toFixed(3)}) translate(${-(b[0] + b[2] / 2)} ${-(b[1] + b[3] / 2)})`);
};
// outline closing a clipped group (nothing in no-outline looks)
// soft radial-gradient cloud (no hard edge): fades from op at the centre to nothing at the rim
const rgrad = (cx, cy, rx, ry, c, tone, op, rot = 0) => { const id = "cosg" + ++nid, col = L.c(c, tone);
  return `<defs><radialGradient id="${id}"><stop offset="0" stop-color="${col}" stop-opacity="${op}"/><stop offset="0.5" stop-color="${col}" stop-opacity="${f1(op * 0.5)}"/><stop offset="1" stop-color="${col}" stop-opacity="0"/></radialGradient></defs>` +
    L.tag("ellipse", { cx, cy, rx, ry, fill: `url(#${id})`, transform: rot ? `rotate(${rot} ${cx} ${cy})` : undefined }); };
const wisp = (d, c, w, op) => L.tag("path", { d, fill: "none", stroke: L.c(c, 1), "stroke-width": w, "stroke-linecap": "round", opacity: op });
const edge = (d) => (L.T.ink === "none" ? "" : L.stroke(d, { c: L.outline(), w: "prop" }));
const reg = (name, label, group, tags, fn, box, extra = {}) =>
  L.reg("cosmos", name, fn, Object.assign({ box, group, label, tags, call: `L.put(S, "${name}", x, y, { s: 1, t })` }, extra));

// continents (relative to the globe radius)
const LAND = [
  [[-0.5, -0.5], [-0.2, -0.68], [0.12, -0.5], [0.02, -0.2], [-0.22, -0.06], [-0.5, -0.18], [-0.5, -0.5]],
  [[0.2, 0.0], [0.5, -0.18], [0.7, 0.1], [0.5, 0.42], [0.26, 0.3], [0.2, 0.0]],
  [[-0.55, 0.22], [-0.2, 0.16], [-0.12, 0.5], [-0.34, 0.74], [-0.55, 0.52], [-0.55, 0.22]],
];
const earth = (cx, cy, r, night) => {
  let inner = LAND.map((p) => L.shape(L.smooth(p.map(([x, y]) => [cx + x * r, cy + y * r])), "grass", { w: "detail" })).join("");
  inner += [[-0.3, -0.35, 0.3, 0.07], [0.3, -0.5, 0.24, 0.06], [-0.1, 0.45, 0.26, 0.06], [0.45, 0.35, 0.2, 0.05]].map(([x, y, a, b]) => fl(ellp(cx + x * r, cy + y * r, a * r, b * r), "white", 0, 0.8)).join("");
  if (night) {
    inner += fl(`M${f1(cx)} ${f1(cy - r)} A${r} ${r} 0 0 1 ${f1(cx)} ${f1(cy + r)} Z`, "navy", 0, 0.62);
    [[0.42, 0.0], [0.52, 0.2], [0.34, 0.17], [0.58, 0.02], [0.45, 0.28], [0.3, -0.04]].forEach(([x, y]) => (inner += dot(cx + x * r, cy + y * r, r * 0.028, "yellow")));
  }
  return L.stroke(L.circ(cx, cy, r + 6), { c: "sky", w: 7, op: 0.5 }) + sph(cx, cy, r, "water", inner);
};
const band = (y0, y1, c, op, tone = 0, R = 130) => fl(`M${-R} ${y0} Q${-R / 2} ${y0 - 10} 0 ${y0} T${R} ${y0} V${y1} Q${R / 2} ${y1 + 10} 0 ${y1} T${-R} ${y1} Z`, c, tone, op);
const jupiter = (cx, cy, r) => {
  const k = r / 120;
  const inner = L.g(band(-82, -58, "orange", 0.6) + band(-58, -30, "cream", 0.95) + band(-30, -4, "orange", 0.55) + band(-4, 24, "cream", 0.9) + band(24, 52, "brown", 0.35) + band(52, 80, "cream", 0.8) +
    fl(ellp(34, 38, 36, 21), "red", 0, 0.95) + L.stroke(ellp(34, 38, 22, 11), { c: "orange", w: 4, op: 0.8 }) + L.stroke("M-120 8 Q-60 -4 0 8 T120 8", { c: "brown", w: 4, op: 0.3 }), `translate(${f1(cx)} ${f1(cy)}) scale(${k})`);
  return sph(cx, cy, r, "earth", inner);
};

// ===================== Planets & Sun =====================
const G1 = "Planets & Sun";
reg("cos-sun-flares", "Sun with flares", G1, ["sun", "star", "solar flare", "corona", "prominence", "heat", "solar storm"], () => {
  let s = "";
  for (let i = 0; i < 14; i++) { const a = i * (360 / 14) - 90, len = i % 2 ? 148 : 170; if (a > -75 && a < -20) continue; s += L.shape(L.poly([P(96, a - 8), P(len, a), P(96, a + 8)], true), i % 2 ? "yellow" : "orange", { w: "detail" }); }
  const d = `M${pt(P(92, -70))} C${pt(P(200, -80))} ${pt(P(200, -30))} ${pt(P(92, -38))}`;
  s += L.stroke(d, { c: "red", w: 22 }) + L.stroke(d, { c: "orange", w: 12 }) + L.stroke(d, { c: "yellow", w: 4 });
  const spots = [[-30, -20, 18, 11], [28, 30, 22, 13], [-48, 38, 12, 8], [40, -10, 14, 9]].map(([x, y, a, b]) => fl(ellp(x, y, a, b), "orange", 0, 0.35)).join("");
  return s + sph(0, 0, 100, "yellow", spots + fl(ellp(-8, -46, 22, 12), "brown", 0, 0.35) + fl(L.circ(-70, 50, 16), "white", 0, 0.8));
}, [-210, -230, 420, 440]);

reg("cos-sun-loop", "Solar prominence close-up", G1, ["sun", "solar flare", "prominence", "loop", "plasma", "magnetic", "corona"], () => {
  const stars = [[-200, -110], [-120, -60], [-40, -120], [90, -90], [170, -40], [210, -118], [-210, -10], [140, -130]].map(([x, y]) => spark(x, y, 7, "white", 0.85)).join("");
  const loops = [[-120, 50, -80, -110, 20, 36, 26], [100, 52, 130, -30, 190, 70, 18]].map(([x0, y0, cx1, cy1, x1, y1, w]) => {
    const d = `M${x0} ${y0} C${cx1 - 60} ${cy1} ${cx1 + 60} ${cy1} ${x1} ${y1}`;
    return L.stroke(d, { c: "red", w: w + 8 }) + L.stroke(d, { c: "orange", w }) + L.stroke(d, { c: "yellow", w: w * 0.3 });
  }).join("");
  const inner = fl(L.rect(-250, -150, 500, 270), "navy", 0) + stars + loops + L.shape(L.circ(0, 340, 312), "yellow", { w: "prop" }) + fl(L.circ(-120, 90, 22, 12), "orange", 0, 0.4) + fl(L.circ(130, 74, 18, 10), "orange", 0, 0.4) + fl(L.circ(0, 56, 30, 8), "white", 0, 0.5);
  return clip(L.rrect(-250, -150, 500, 270, 28), inner) + edge(L.rrect(-250, -150, 500, 270, 28));
}, [-262, -162, 524, 294], { wide: true });

reg("cos-earth-day-night", "Earth, day and night side", G1, ["earth", "planet", "night", "day", "city lights", "terminator", "world"], () => earth(0, 0, 110, true), [-130, -130, 260, 260]);

reg("cos-earth-moon", "Earth and Moon", G1, ["earth", "moon", "orbit", "planet", "satellite", "space"], (o) => {
  const moon = sph(87, -45, 26, "stone", crater(-6, -4, 8) + crater(8, 10, 6) + crater(10, -10, 4));
  return L.stroke(ellp(-60, 15, 170, 120), { w: "detail", op: 0.45, dash: "4 10" }) + earth(-60, 15, 80) + moon + lab(o, "Earth", -60, 168, 26) + lab(o, "Moon", 87, 8, 24);
}, [-245, -130, 380, 320]);

reg("cos-jupiter-storm", "Jupiter and its storm", G1, ["jupiter", "planet", "great red spot", "storm", "gas giant", "bands", "moon"], () =>
  jupiter(0, 0, 120) + sph(150, -98, 16, "yellow", fl(L.circ(4, 4, 5), "orange", 0, 0.5)) + fl(L.circ(150, 56, 6, 3), "ink", 0, 0), [-145, -145, 330, 290]);

reg("cos-saturn-rings-close", "Saturn, rings close up", G1, ["saturn", "planet", "rings", "gas giant", "titan", "moon"], () => {
  const rings = (a0, a1) => L.g([[150, 38, 18, "gold"], [118, 29, 14, "cream"], [94, 23, 8, "sand"]].map(([rx, ry, w, c]) => tube(L.arc(0, 0, rx, a0, a1, ry), c, w)).join(""), "rotate(-16)");
  const stripes = band(-50, -34, "orange", 0.35, 0, 80) + band(-18, 4, "cream", 0.5, 0, 80) + band(22, 36, "orange", 0.3, 0, 80) + fl(L.rect(-80, 28, 160, 100), "ink", 0, 0.1);
  return rings(180, 360) + sph(0, 0, 70, "yellow", stripes) + rings(0, 180) + sph(125, -95, 13, "orange", "");
}, [-170, -130, 340, 250]);

reg("cos-venus-hot", "Venus, scorching hot", G1, ["venus", "planet", "hot", "greenhouse", "clouds", "heat", "yellow"], (o) => {
  const sw = ["M-90 -36 Q-45 -62 0 -36 T90 -36", "M-90 -4 Q-45 -30 0 -4 T90 -4", "M-90 28 Q-45 2 0 28 T90 28", "M-90 58 Q-45 36 0 58 T90 58"].map((d) => L.stroke(d, { c: "orange", w: 9, op: 0.4 })).join("");
  const heat = [-40, 0, 40].map((x) => L.stroke(`M${x} -100 q-12 -14 0 -28 t0 -28`, { c: "red", w: 6, op: 0.75 })).join("");
  return heat + sph(0, 0, 80, "yellow", sw + fl(ellp(-26, -30, 24, 10), "white", 0, 0.45)) + lab(o, "460 °C", 0, 118, 30, "ink");
}, [-110, -170, 220, 320]);

reg("cos-uranus-tilted", "Uranus on its side", G1, ["uranus", "planet", "ice giant", "tilt", "axis", "rings", "sideways", "spin"], () => {
  const ring = (a0, a1) => [[20, 112, 8, "white"], [32, 120, 5, "sky"]].map(([rx, ry, w, c]) => tube(L.arc(0, 0, rx, a0, a1, ry), c, w)).join("");
  const axis = L.stroke("M-136 0 H136", { w: "detail", dash: "8 8", op: 0.7 });
  const spin = arrow(Array.from({ length: 8 }, (_, i) => P(1, -60 + i * 40).map((v, k) => (k ? 28 * v : 12 * v) + (k ? 0 : 128))), "orange", "prop", 14);
  return L.g(ring(90, 270) + axis + sph(0, 0, 66, "teal", fl(L.rect(-70, -8, 140, 14), "white", 0, 0.3)) + ring(-90, 90) + spin, "rotate(-8)");
}, [-150, -150, 300, 300]);

reg("cos-neptune-winds", "Neptune, windy blue", G1, ["neptune", "planet", "ice giant", "wind", "storm", "dark spot", "blue"], () => {
  const wind = [-34, 0, 34].map((y, i) => L.stroke(`M${-148 + i * 8} ${y} H${-102 + i * 8}`, { c: "blue", w: 6, op: 0.55 })).join("");
  const inner = band(-40, -28, "white", 0.28, 0, 80) + band(30, 40, "white", 0.2, 0, 80) + fl(ellp(-16, 14, 20, 12), "navy", 0, 0.6) + L.stroke("M-52 -8 Q-20 -22 22 -12", { c: "white", w: 6, op: 0.6 });
  return wind + sph(0, 0, 76, "blue", inner);
}, [-155, -100, 270, 200]);

reg("cos-mercury-extremes", "Mercury, hot and cold sides", G1, ["mercury", "planet", "temperature", "craters", "hot", "cold", "extremes"], (o) => {
  const inner = crater(-10, -18, 14) + crater(18, 14, 11) + crater(-24, 22, 9) + crater(26, -26, 7) + fl(L.rect(-60, -60, 60, 120), "yellow", 0, 0.28) + fl(L.rect(0, -60, 60, 120), "navy", 0, 0.38);
  const rays = [-26, 0, 26].map((y) => arrow([[-150, y], [-86, y * 0.8]], "orange", "detail", 12)).join("");
  return rays + sph(0, 0, 60, "gray", inner) + lab(o, "430 °C", -92, 100, 28, "ink") + lab(o, "−180 °C", 92, 100, 28, "ink");
}, [-170, -80, 340, 200]);

reg("cos-dwarf-planets", "Dwarf planets: Pluto, Ceres, Eris", G1, ["dwarf planet", "pluto", "ceres", "eris", "kuiper belt", "small"], (o) => {
  const pluto = sph(-150, 0, 40, "earth", fl("M-150 24 C-176 4 -170 -16 -158 -16 C-152 -16 -150 -12 -150 -8 C-150 -12 -148 -16 -142 -16 C-130 -16 -124 4 -150 24 Z", "cream", 0, 0.9));
  const ceres = sph(0, 6, 30, "stone", crater(-8, -6, 7) + crater(9, 8, 5) + fl(L.circ(2, -10, 4), "white", 0, 0.85));
  const eris = sph(150, -2, 38, "snow", fl(ellp(8, 10, 20, 8), "sky", 0, 0.4) + crater(-12, -14, 8));
  return pluto + ceres + eris + lab(o, "Pluto", -150, 84, 26) + lab(o, "Ceres", 0, 84, 26) + lab(o, "Eris", 150, 84, 26);
}, [-215, -60, 430, 160]);

reg("cos-planet-sizes", "Earth next to Jupiter", G1, ["size", "scale", "earth", "jupiter", "compare", "giant", "tiny"], (o) =>
  jupiter(-60, 0, 110) + sph(126, 0, 10, "water", fl(L.circ(-2, -2, 5), "grass", 0, 1), { noHi: true }) + lab(o, "Jupiter", -60, 148, 28) + lab(o, "Earth", 126, 60, 26) +
  L.stroke(L.poly([[126, 20], [126, 40]]), { w: "detail" }), [-190, -130, 370, 300]);

// ===================== Stars =====================
const G2 = "Stars";
reg("cos-star-red-dwarf", "Red dwarf star", G2, ["star", "red dwarf", "small star", "cool", "dim", "flare star"], () =>
  glow(0, 0, 50, "red", 3, 0.14) + sph(0, 0, 50, "red", fl(ellp(-14, -12, 12, 8), "brown", 0, 0.35) + fl(ellp(16, 14, 9, 6), "brown", 0, 0.3) + fl(ellp(-4, 22, 14, 7), "orange", 0, 0.4)), [-120, -120, 240, 240]);

reg("cos-star-blue-giant", "Blue giant star", G2, ["star", "blue giant", "hot star", "massive", "bright", "big star"], () =>
  fl(L.star(0, 0, 175, 20, 4, -90), "sky", 0, 0.55) + fl(L.star(0, 0, 118, 18, 4, -45), "sky", 0, 0.45) + glow(0, 0, 92, "sky", 3, 0.2) + sph(0, 0, 92, "blue", fl(ellp(-20, -26, 40, 24), "white", 0, 0.28)), [-185, -185, 370, 370]);

reg("cos-star-white-dwarf", "White dwarf (Earth-sized)", G2, ["star", "white dwarf", "dead star", "small", "earth-size", "dense", "remnant"], () =>
  glow(0, 0, 26, "sky", 3, 0.28) + sph(0, 0, 26, "white", "") + sph(86, 8, 22, "water", fl(L.circ(-4, -4, 9), "grass", 0, 1) + fl(ellp(8, 8, 8, 4), "white", 0, 0.8), { noHi: true }), [-85, -65, 200, 130]);

reg("cos-star-neutron", "Neutron star with beams", G2, ["star", "neutron star", "pulsar", "magnetar", "dense", "beam", "remnant"], () => {
  const beam = (a) => L.g(fl("M-8 0 L-44 -175 Q0 -190 44 -175 L8 0 Z", "sky", 0, 0.5) + fl("M-4 0 L-18 -170 Q0 -176 18 -170 L4 0 Z", "white", 0, 0.7), `rotate(${a})`);
  return beam(25) + beam(205) + L.g(L.stroke(ellp(0, 0, 76, 30), { c: "purple", w: 4, dash: "10 8", op: 0.7 }), "rotate(25)") + glow(0, 0, 20, "sky", 2, 0.35) + sph(0, 0, 20, "sky", "");
}, [-120, -180, 240, 360]);

reg("cos-supernova", "Supernova burst", G2, ["supernova", "explosion", "star death", "shock wave", "burst", "nova", "dying star"], () => {
  let s = "";
  [[120, "purple", 3], [98, "red", 5], [76, "orange", 8], [54, "yellow", 11], [30, "white", 14]].forEach(([r, c, sd]) => (s += L.shape(blob(0, 0, r, sd, 14, 0.12), c, { w: "prop" })));
  const g = L.rng(5);
  for (let i = 0; i < 14; i++) { const a = i * (360 / 14) + g() * 14, r = 138 + g() * 24; s += dot(...P(r, a), 4 + g() * 4, i % 2 ? "orange" : "red"); }
  return s;
}, [-175, -175, 350, 350]);

reg("cos-star-red-giant", "Red giant star", G2, ["star", "red giant", "old star", "huge", "swollen", "sun future"], () => {
  const mot = [[-40, -30, 30, 18, "orange"], [30, -50, 22, 12, "yellow"], [46, 20, 26, 15, "orange"], [-20, 40, 34, 16, "brown"], [-60, 10, 14, 10, "brown"]].map(([x, y, a, b, c]) => fl(ellp(x, y, a, b), c, 0, 0.4)).join("");
  return glow(0, 0, 100, "orange", 2, 0.16) + sph(0, 0, 100, "red", mot) + sph(122, 92, 11, "yellow", "", { noHi: true });
}, [-150, -150, 300, 300]);

reg("cos-star-binary", "Two stars orbiting each other", G2, ["binary star", "double star", "orbit", "barycentre", "two suns", "twin"], () =>
  L.stroke(ellp(0, 0, 44, 26), { w: "detail", dash: "6 8", op: 0.55 }) + L.stroke(ellp(0, 0, 90, 52), { w: "detail", dash: "6 8", op: 0.55 }) + L.stroke("M-8 0 H8 M0 -8 V8", { w: "detail", op: 0.7 }) +
  glow(-38, 6, 44, "orange", 2, 0.2) + sph(-38, 6, 44, "orange", fl(ellp(-46, -2, 12, 8), "red", 0, 0.35)) + glow(76, -14, 24, "sky", 2, 0.28) + sph(76, -14, 24, "blue", ""), [-170, -110, 340, 220]);

reg("cos-star-life-cycle", "Life cycle of stars", G2, ["star", "life cycle", "stellar evolution", "birth", "death", "diagram", "red giant", "supernova"], (o) => {
  let s = "";
  const rows = [[-130, "Sun-sized star", [["cos-nebula-pink", "Gas cloud"], ["cos-sun-flares", "Star"], ["cos-star-red-giant", "Red giant"], ["cos-star-white-dwarf", "White dwarf"]]],
    [140, "Massive star", [["cos-nebula-pink", "Gas cloud"], ["cos-star-blue-giant", "Blue giant"], ["cos-supernova", "Supernova"], ["cos-star-neutron", "Neutron star"]]]];
  rows.forEach(([y, title, items]) => {
    s += lab(o, title, -330, y - 84, 36, "ink", "start");
    items.forEach(([name, text], i) => {
      const x = -300 + i * 220;
      s += fit(name, x, y, 130) + lab(o, text, x, y + 100, 30);
      if (i < 3) s += arrow([[x + 76, y], [x + 144, y]], "ink", "prop", 16);
    });
  });
  return s;
}, [-400, -240, 880, 500], { wide: true });

reg("cos-star-sizes", "Star size comparison", G2, ["star", "size", "scale", "compare", "sun", "giant", "supergiant", "earth"], (o) => {
  let inner = fl(L.rect(-420, -170, 840, 340), "navy", 0);
  const g = L.rng(11); for (let i = 0; i < 34; i++) inner += dot(-410 + g() * 820, -160 + g() * 320, 1.4 + g() * 2, "white", 0.7);
  inner += L.shape(L.circ(250, 0, 190), "red", { w: "prop" }) + fl(ellp(210, -60, 60, 26), "orange", 0, 0.4) + fl(ellp(260, 70, 70, 30), "brown", 0, 0.3) +
    L.shape(L.circ(-90, 0, 72), "blue", { w: "prop" }) + fl(ellp(-110, -20, 28, 16), "white", 0, 0.3) +
    L.shape(L.circ(-250, 0, 26), "yellow", { w: "prop" }) + L.shape(L.circ(-340, 0, 7), "water", { w: "detail" });
  let s = clip(L.rrect(-420, -170, 840, 340, 28), inner) + edge(L.rrect(-420, -170, 840, 340, 28));
  s += lab(o, "Earth", -340, 52, 28, "white") + lab(o, "Sun", -250, 82, 30, "white") + lab(o, "Blue giant", -90, 124, 32, "white") + lab(o, "Red supergiant", 250, 24, 40, "white");
  return s;
}, [-430, -180, 860, 360], { wide: true });

// ===================== Black holes, galaxies, nebulae =====================
const G3 = "Black holes & galaxies";
// black hole with accretion disk: lensed ring over the top, front half of the disk across the hole. Origin = centre of the hole.
const blackHole = (R, ratio = 0.24, o = {}) => {
  const ring = (rx0, rx1, c) => L.shape(ellp(0, 0, rx0, rx0 * ratio) + ellp(0, 0, rx1, rx1 * ratio, true), c, { w: "detail" });
  const disk = () => ring(2.6 * R, 1.95 * R, "orange") + ring(1.95 * R, 1.55 * R, "yellow") + ring(1.55 * R, 1.3 * R, "cream");
  const front = clip(L.rect(-4 * R, 0, 8 * R, 3 * R), disk());
  return disk() + L.shape(L.circ(0, 0, R), "ink", { w: "prop", flat: true, tone: 2 }) + L.stroke(L.circ(0, 0, R + R * 0.12), { c: "orange", w: R * 0.26 }) + L.stroke(L.circ(0, 0, R + R * 0.12), { c: "yellow", w: R * 0.12 }) +
    edge(L.circ(0, 0, R)) + front;
};
reg("cos-blackhole-disk", "Black hole with accretion disk", G3, ["black hole", "accretion disk", "event horizon", "space", "gravity", "interstellar", "singularity"], () => blackHole(70), [-200, -110, 400, 220]);

reg("cos-blackhole-labelled", "Black hole, labelled", G3, ["black hole", "event horizon", "accretion disk", "singularity", "diagram", "labels", "point of no return"], (o) => {
  let s = blackHole(70) + dot(0, 0, 4, "white");
  if (o.labels !== false) {
    s += leader(o, 150, -10, 215, -80) + lab(o, "Accretion disk", 224, -76, 30, "ink", "start");
    s += leader(o, -49, 49, -140, 100) + lab(o, "Event horizon", -146, 118, 30, "ink", "end");
    s += leader(o, 2, 3, 110, 112) + lab(o, "Singularity", 116, 128, 30, "ink", "start");
  }
  return s;
}, [-350, -130, 780, 280], { wide: true });

reg("cos-blackhole-jets", "Black hole with jets", G3, ["black hole", "jets", "quasar", "accretion disk", "beams", "galaxy core", "energy"], () => {
  const jet = (sy) => L.g(L.shape("M-12 -24 L-52 -232 Q0 -262 52 -232 L12 -24 Z", "sky", { w: "prop", op: 0.9 }) + fl("M-6 -30 L-24 -224 Q0 -236 24 -224 L6 -30 Z", "white", 0, 0.65), `scale(1 ${sy})`);
  return jet(1) + jet(-1) + blackHole(52, 0.14) + spark(-66, -190, 14, "yellow") + spark(70, 170, 12, "yellow");
}, [-170, -270, 340, 540]);

reg("cos-event-horizon-diagram", "Event horizon diagram", G3, ["event horizon", "photon sphere", "singularity", "black hole", "diagram", "light", "escape", "point of no return"], (o) => {
  let s = L.shape(L.circ(0, 0, 150) + ellp(0, 0, 112, 112, true), "orange", { w: "detail", op: 0.9 });
  s += L.stroke(L.circ(0, 0, 90), { c: "yellow", w: 6, dash: "12 8" }) + L.shape(L.circ(0, 0, 60), "ink", { w: "prop", flat: true, tone: 2 }) + dot(0, 0, 5, "white");
  s += arrow([[-190, -118], [-60, -118], [30, -140], [150, -190]], "gold", "prop", 16);
  s += arrow([[-190, 118], [-110, 112], [-60, 70], [-20, 24]], "red", "prop", 16);
  if (o.labels !== false) {
    s += leader(o, 106, -14, 190, -40) + lab(o, "Accretion disk", 196, -34, 24, "ink", "start");
    s += leader(o, 90, 6, 190, 20) + lab(o, "Photon sphere", 196, 28, 24, "ink", "start");
    s += leader(o, 52, 30, 190, 80) + lab(o, "Event horizon", 196, 88, 24, "ink", "start");
    s += leader(o, 3, 3, 190, 140) + lab(o, "Singularity", 196, 148, 24, "ink", "start");
    s += lab(o, "light escapes", -125, -146, 22, "ink") + lab(o, "light falls in", -125, 150, 22, "ink");
  }
  return s;
}, [-210, -215, 700, 430], { wide: true });

// galaxies: flattened discs on a night-sky ellipse, tilted
const tf = (x, y, k, ph) => { const yy = y * k; return [x * Math.cos(ph) - yy * Math.sin(ph), x * Math.sin(ph) + yy * Math.cos(ph)]; };
const galaxyHalo = (rx, ry, ph, seed) => {
  let s = L.shape(ellp(0, 0, rx, ry), "navy", { w: "prop", flat: true });
  const g = L.rng(seed), cl = [];
  for (let i = 0; i < 26; i++) { const a = g() * 6.283, r = Math.sqrt(g()); cl.push([Math.cos(a) * r * (rx - 8), Math.sin(a) * r * (ry - 8), 1.4 + g() * 2]); }
  return { base: s, stars: cl.map(([x, y, r]) => dot(x, y, r, "white", 0.8)).join("") };
};
const spiral = (o) => {
  const k = 0.62, ph = -20 * D2R, bar = o.bar, r0 = bar ? 46 : 18, R = 170, th0 = bar ? 0 : -0.5;
  const halo = galaxyHalo(212, 138, ph, o.seed || 3);
  let s = halo.base + halo.stars;
  for (let a = 0; a < 2; a++) {
    const pts = Array.from({ length: 26 }, (_, i) => { const t = i / 25, ang = th0 + a * Math.PI + t * 2.1 * Math.PI * (bar ? 0.9 : 1), r = r0 + (R - r0) * Math.pow(t, 0.9); return tf(Math.cos(ang) * r, Math.sin(ang) * r, k, ph); });
    s += L.shape(L.limb(pts, 70, 16), "purple", { w: "detail" }) + fl(L.limb(pts, 50, 8), "pink", 0, 0.9) + fl(L.limb(pts, 22, 3), "white", 0, 0.5);
  }
  if (bar) s += L.shape(L.limb([tf(-r0 - 10, 0, k, ph), tf(r0 + 10, 0, k, ph)], 30, 30), "gold", { w: "detail" });
  s += L.shape(ellp(0, 0, 44, 44 * k), "yellow", { w: "detail" }) + fl(ellp(0, 0, 22, 22 * k), "white", 0, 0.9);
  return s + edge(ellp(0, 0, 212, 138));
};
reg("cos-galaxy-spiral", "Spiral galaxy", G3, ["galaxy", "spiral", "milky way", "stars", "arms", "space", "universe", "cosmos"], () => spiral({}), [-220, -146, 440, 292]);
reg("cos-galaxy-barred", "Barred spiral galaxy", G3, ["galaxy", "barred spiral", "milky way", "bar", "stars", "space", "universe"], () => spiral({ bar: true, seed: 8 }), [-220, -146, 440, 292]);

reg("cos-galaxy-elliptical", "Elliptical galaxy", G3, ["galaxy", "elliptical", "old stars", "round", "yellow", "space", "universe"], () => {
  const h = galaxyHalo(190, 128, 0, 6);
  let s = h.base + h.stars;
  [[120, 76, "orange", 0.55], [92, 58, "gold", 0.8], [64, 40, "yellow", 1], [34, 22, "cream", 1]].forEach(([rx, ry, c, op]) => (s += L.g(L.shape(ellp(0, 0, rx, ry), c, { w: "detail", op }), "rotate(-24)")));
  return s + edge(ellp(0, 0, 190, 128));
}, [-200, -138, 400, 276]);

reg("cos-galaxy-edge-on", "Galaxy seen edge-on", G3, ["galaxy", "edge-on", "dust lane", "disc", "bulge", "space", "universe"], () => {
  const h = galaxyHalo(200, 100, 0, 9);
  let s = h.base + h.stars;
  s += L.g(fl(ellp(0, 0, 186, 32), "pink", 0, 0.35) + fl(ellp(0, 0, 168, 20), "pink", 0, 0.6) + fl(ellp(0, 0, 150, 11), "white", 0, 0.5) + fl(ellp(0, 0, 80, 56), "yellow", 0, 0.45) + fl(ellp(0, 0, 52, 36), "yellow", 0, 0.9) + fl(ellp(0, 0, 26, 18), "white", 0, 0.9) +
    L.stroke("M-165 5 Q-80 13 0 9 T165 4", { c: "brown", w: 7, op: 0.7 }), "rotate(-12)");
  return s + edge(ellp(0, 0, 200, 100));
}, [-210, -110, 420, 220]);

reg("cos-nebula-pink", "Nebula cloud", G3, ["nebula", "gas cloud", "stellar nursery", "pink", "space", "stars", "dust"], () => {
  const R = L.rrect(-190, -130, 380, 260, 28);
  let inner = fl(L.rect(-200, -140, 400, 280), "navy", 0);
  [[-60, -10, 170, 100, "purple", 0, 0.8, -20], [80, 24, 150, 96, "purple", 1, 0.62, 25], [-110, 60, 90, 56, "teal", 0, 0.6, 10], [112, -60, 100, 54, "teal", 1, 0.6, -15], [-20, -30, 110, 64, "pink", 0, 0.8, -30], [64, 40, 96, 58, "pink", 1, 0.75, 20], [0, 0, 70, 48, "white", 0, 0.9, 0]].forEach(([x, y, rx, ry, c, t, op, rot]) => (inner += rgrad(x, y, rx, ry, c, t, op, rot)));
  inner += rgrad(-10, 24, 130, 14, "navy", 2, 0.55, -24) + rgrad(70, -44, 100, 12, "navy", 2, 0.5, 18);
  inner += wisp("M-170 44 C-110 -26 -50 66 14 8 S130 -26 178 34", "pink", 6, 0.16) + wisp("M-150 -52 C-90 -10 -30 -64 40 -22 S120 30 172 -6", "purple", 8, 0.2) + wisp("M-130 84 C-70 40 -10 90 56 54 S130 70 170 100", "teal", 5, 0.16);
  const g = L.rng(5);
  for (let i = 0; i < 40; i++) { const x = -185 + g() * 370, y = -125 + g() * 250, r = 1 + g() * 1.8; inner += dot(x, y, r, "white", 0.85) + (i % 5 === 0 ? rgrad(x, y, r * 5, r * 5, "white", 0, 0.5) : ""); }
  inner += rgrad(0, -4, 36, 36, "yellow", 1, 0.8) + spark(0, -4, 24, "white", 1) + spark(-120, -70, 11) + spark(130, -80, 9) + spark(112, 80, 10) + spark(-140, 90, 8);
  return clip(R, inner) + edge(R);
}, [-200, -140, 400, 280], { wide: true });

reg("cos-nebula-pillars", "Pillars of gas", G3, ["nebula", "pillars", "gas", "dust", "star birth", "eagle", "space"], () => {
  const R = L.rrect(-230, -140, 460, 280, 28);
  const pillar = (x, w, top) => { const d = L.smooth([[x - w / 2, 150], [x - w / 2 + 3, top + 60], [x - w / 3, top + 16], [x - 6, top - 8], [x + w / 4, top + 6], [x + w / 2 - 4, top + 54], [x + w / 2, 150]]); return rgrad(x, top + 20, w * 1.3, 50, "orange", 0, 0.5) + L.shape(d, "brown", { w: "prop" }) + clip(d, [0.1, 0.18, 0.28].map((k) => fl(L.rect(x - w / 2, top - 20, w * k, 200), "orange", 0, 0.22)).join("") + [60, 100, 140].map((y) => fl(L.rect(x - w / 2, top + y, w, 200), "ink", 0, 0.08)).join("") + rgrad(x - w * 0.2, top + 10, w * 0.5, 40, "yellow", 1, 0.55)); };
  let inner = fl(L.rect(-240, -150, 480, 300), "purple", 1);
  [[-70, -70, 230, 120, "pink", 0, 0.85, -10], [120, -80, 170, 100, "orange", 0, 0.7, 10], [-160, 20, 120, 80, "teal", 0, 0.55, 0], [0, -130, 150, 50, "yellow", 1, 0.45, 0], [170, 60, 100, 60, "purple", 0, 0.7, 0]].forEach(([x, y, rx, ry, c, t, op, rot]) => (inner += rgrad(x, y, rx, ry, c, t, op, rot)));
  const g = L.rng(8); for (let i = 0; i < 26; i++) inner += dot(-225 + g() * 450, -135 + g() * 150, 1.2 + g() * 1.6, "white", 0.85);
  inner += pillar(-110, 64, -40) + pillar(0, 84, -110) + pillar(118, 60, 10) + rgrad(-110, 140, 130, 34, "pink", 1, 0.8) + rgrad(10, 146, 150, 34, "purple", 0, 0.8) + rgrad(120, 140, 120, 30, "pink", 1, 0.8);
  inner += rgrad(0, -112, 30, 30, "yellow", 1, 0.8) + spark(0, -112, 16, "yellow", 1) + spark(-110, -42, 10, "yellow", 1) + spark(118, 8, 9, "yellow", 1) + spark(-170, -100, 8) + spark(180, -90, 8);
  return clip(R, inner) + edge(R);
}, [-240, -150, 480, 300], { wide: true });

reg("cos-star-cluster", "Star cluster", G3, ["star cluster", "globular", "stars", "swarm", "space", "sparkle"], () => {
  const g = L.rng(21), cs = ["white", "yellow", "sky", "orange", "pink"];
  let s = L.shape(L.circ(0, 0, 130), "navy", { w: "prop", flat: true });
  for (let i = 0; i < 64; i++) { const a = g() * 6.283, r = Math.pow(g(), 1.5) * 116, k = 3.2 + g() * 4.2 * (1 - r / 150); s += spark(Math.cos(a) * r, Math.sin(a) * r, k + 2, cs[i % 5], 1); }
  return s + spark(-40, -46, 16, "white", 1) + spark(50, 30, 13, "yellow", 1) + spark(8, 62, 11, "sky", 1);
}, [-140, -140, 280, 280]);

reg("cos-wormhole", "Wormhole tunnel", G3, ["wormhole", "tunnel", "portal", "space-time", "shortcut", "einstein-rosen", "travel"], () => {
  const w = (y) => 30 + 110 * Math.pow(Math.abs(y) / 110, 2.2);
  const left = Array.from({ length: 12 }, (_, i) => { const y = -110 + i * 20; return [-w(y), y]; }), right = left.map(([x, y]) => [-x, y]).reverse();
  const body = L.smooth(left) + " L" + pt(right[0]) + " " + L.smooth(right).replace(/^M\S+ \S+ /, "") + " Z";
  let s = L.shape(body, "purple", { w: "prop" }) + clip(body, rgrad(0, 0, 80, 100, "navy", 2, 0.6));
  [-84, -56, -28, 0, 28, 56, 84].forEach((y) => (s += L.stroke(ellp(0, y, w(y), w(y) * 0.28), { c: "pink", w: 4, op: 0.65 })));
  s += L.shape(ellp(0, -110, 140, 40), "sky", { w: "prop" }) + L.stroke(L.arc(0, -110, 90, 20, 340, 24), { c: "white", w: 5, op: 0.8 }) + L.stroke(L.arc(0, -110, 40, 20, 340, 11), { c: "white", w: 4, op: 0.8 });
  s += L.shape(ellp(0, 110, 140, 40), "navy", { w: "prop" }) + spark(-50, 110, 9) + spark(40, 104, 7) + spark(80, 116, 6) + spark(-90, 106, 5);
  return s;
}, [-155, -160, 310, 320]);

// ===================== Small bodies =====================
const G4 = "Small bodies";
const sunIcon = (x, y, r, n = 12) => { let s = ""; for (let i = 0; i < n; i++) s += L.stroke(L.poly([P(r * 1.3, i * (360 / n), x, y), P(r * 1.7, i * (360 / n), x, y)]), { c: "orange", w: "prop" }); return s + L.shape(L.circ(x, y, r), "yellow", { w: "prop" }) + fl(L.circ(x - r * 0.3, y - r * 0.36, r * 0.2, r * 0.12), "white", 0, 0.5); };
// a burning rock; the tail streams along +x (the caller rotates it)
const meteor = (r, len) => {
  const tail = (k, c, op) => fl(`M0 ${-r * k} L${len * k} ${-r * k * 0.3} Q${len * k * 1.12} 0 ${len * k} ${r * k * 0.3} L0 ${r * k} Z`, c, 0, op);
  return tail(1.5, "red", 0.8) + tail(1.1, "orange", 0.9) + tail(0.7, "yellow", 1) + dot(0, 0, r * 1.5, "orange", 0.5) + L.shape(blob(0, 0, r, 4, 9, 0.25), "stone", { w: "prop" }) + crater(-r * 0.3, -r * 0.2, r * 0.3) + crater(r * 0.25, r * 0.3, r * 0.2);
};

reg("cos-comet-orbit", "Comet on its orbit", G4, ["comet", "orbit", "tail", "ice", "sun", "ellipse", "halley-like"], () => {
  const cx = 40, rx = 160, ry = 55, fx = cx - Math.sqrt(rx * rx - ry * ry), a = -125 * D2R;
  const px = cx + rx * Math.cos(a), py = ry * Math.sin(a), dx = px - fx, m = Math.hypot(dx, py), ux = dx / m, uy = py / m, nx = -uy, ny = ux;
  const tip = (k) => [px + ux * 170 * k, py + uy * 170 * k], base = (w) => [[px + nx * w, py + ny * w], [px - nx * w, py - ny * w]];
  const tail = (k, w, c, op) => fl(L.smooth([base(w)[0], [px + ux * 80 * k + nx * w * 1.8, py + uy * 80 * k + ny * w * 1.8], tip(k), [px + ux * 80 * k - nx * w * 1.8, py + uy * 80 * k - ny * w * 1.8], base(w)[1], base(w)[0]]), c, 0, op);
  return L.stroke(ellp(cx, 0, rx, ry), { w: "detail", dash: "6 8", op: 0.6 }) + sunIcon(fx, 0, 20, 10) + tail(1, 15, "sky", 0.7) + tail(0.7, 9, "white", 0.85) + sph(px, py, 13, "stone", crater(-3, -2, 4), { noHi: true }) + dot(px - 3, py - 4, 3, "white", 0.7);
}, [-215, -190, 440, 250]);

reg("cos-meteor-streak", "Meteor burning up", G4, ["meteor", "shooting star", "fireball", "falling", "burning", "rock", "re-entry"], () =>
  L.g(L.g(meteor(20, 150), "rotate(-35)"), "translate(-70 50)") + dot(70, -34, 4, "yellow") + dot(100, -64, 3, "orange") + dot(50, -10, 3, "red"), [-130, -140, 310, 250]);

reg("cos-meteor-shower", "Meteor shower", G4, ["meteor shower", "shooting stars", "night sky", "falling stars", "perseids-like"], () => {
  const streak = (x, y, len, w) => L.g(fl(`M0 0 L${len} ${-w * 0.35} L${len} ${w * 0.35} Z`, "white", 0, 0.9) + fl(`M0 0 L${len * 0.6} ${-w * 0.2} L${len * 0.6} ${w * 0.2} Z`, "yellow", 0, 0.9) + dot(0, 0, w * 0.9, "white", 1), `translate(${x} ${y}) rotate(-32)`);
  let inner = fl(L.rect(-210, -120, 420, 240), "navy", 0);
  const g = L.rng(31); for (let i = 0; i < 22; i++) inner += dot(-205 + g() * 410, -115 + g() * 150, 1.2 + g() * 1.8, "white", 0.7);
  inner += streak(-120, 10, 110, 9) + streak(-30, -50, 140, 11) + streak(70, -10, 90, 8) + streak(130, 40, 120, 10) + streak(-160, -70, 70, 7) + streak(20, 60, 80, 7);
  inner += fl("M-210 120 L-210 70 Q-160 40 -100 76 Q-50 50 0 78 Q70 40 130 80 Q180 56 210 74 L210 120 Z", "ink", 2, 0.85);
  return clip(L.rrect(-210, -120, 420, 240, 28), inner) + edge(L.rrect(-210, -120, 420, 240, 28));
}, [-222, -132, 444, 264], { wide: true });

reg("cos-crater-cross-section", "Impact crater, cut open", G4, ["crater", "impact", "cross-section", "asteroid", "ground", "dinosaur", "rim", "rock layers"], (o) => {
  const top = [[-230, 0], [-160, 0], [-124, -16], [-100, -8], [-80, 18], [-40, 56], [0, 66], [40, 56], [80, 18], [100, -8], [124, -16], [160, 0], [230, 0]];
  const d = L.smooth(top) + " L230 140 L-230 140 Z";
  const bowl = L.smooth([[-98, -2], [-78, 24], [-40, 62], [0, 72], [40, 62], [78, 24], [98, -2], [90, 30], [40, 92], [0, 100], [-40, 92], [-90, 30], [-98, -2]]);
  const inner = fl(L.rect(-240, 80, 480, 70), "stone", 2, 0.35) + fl(L.rect(-240, 112, 480, 40), "stone", 2, 0.35) + fl(bowl, "sand", 0, 0.75) +
    [[-70, 40, 6], [-30, 78, 5], [30, 82, 7], [70, 44, 5], [0, 90, 4]].map(([x, y, r]) => dot(x, y, r, "stone", 0.9)).join("");
  let s = L.shape(d, "stone", { w: "prop" }) + clip(d, inner) + edge(d);
  s += [[-196, -8, 11], [-176, -4, 7], [196, -9, 10], [172, -4, 6], [-140, -22, 6], [146, -24, 7]].map(([x, y, r]) => L.shape(blob(x, y, r, Math.abs(x), 8, 0.3), "stone", { w: "detail" })).join("");
  if (o.labels !== false) s += lab(o, "Rim", -124, -44, 26) + lab(o, "Floor", 0, 36, 26) + lab(o, "Broken rock", 0, 126, 24);
  return s;
}, [-240, -70, 480, 220]);

reg("cos-crater-moon", "Moon crater close-up", G4, ["crater", "moon", "lunar", "surface", "bowl", "central peak", "impact"], () => {
  const gd = L.smooth([[-195, 10], [-170, -40], [-60, -78], [70, -80], [170, -42], [196, 12], [150, 70], [20, 92], [-120, 80], [-195, 10]]);
  const rimOut = ellp(0, -4, 118, 54), bowl = ellp(2, -2, 98, 44), floor = ellp(16, 10, 74, 26);
  const g = L.rng(14);
  // ground: dust speckle, pale ejecta rays and a soft shade toward the lower right
  let gr = L.shape(gd, "stone", { w: "prop", tone: 1 });
  let rays = ""; for (let i = 0; i < 16; i++) { const a = (i / 16) * Math.PI * 2 + g() * 0.3; rays += L.poly([[Math.cos(a) * 110, Math.sin(a) * 52], [Math.cos(a - 0.05) * 230, Math.sin(a - 0.05) * 110], [Math.cos(a + 0.05) * 230, Math.sin(a + 0.05) * 110]], true); }
  let dust = ""; for (let i = 0; i < 70; i++) dust += dot(-190 + g() * 380, -78 + g() * 168, 0.8 + g() * 1.6, "ink", 0.14);
  gr += clip(gd, fl(rays, "white", 0, 0.2) + dust + rgrad(-70, -40, 150, 60, "white", 0, 0.5) + rgrad(110, 54, 130, 50, "ink", 0, 0.28));
  // raised rim: lit on the upper left, in shade on the lower right
  const rim = L.shape(rimOut, "stone", { w: "prop", tone: 0 }) + clip(rimOut, fl(L.rect(-130, -64, 260, 120), "white", 0, 0.0) + rgrad(-60, -34, 100, 30, "white", 0, 0.7) + rgrad(80, 36, 90, 26, "ink", 0, 0.3));
  // bowl: upper-left inner wall in shadow, lower-right inner wall catches the light
  const shadowWall = L.tag("path", { d: bowl + ellp(14, 10, 90, 38, true), fill: L.c("ink"), "fill-rule": "evenodd", opacity: 0.5 });
  const litWall = L.tag("path", { d: bowl + ellp(-8, -8, 90, 38, true), fill: L.c("white"), "fill-rule": "evenodd", opacity: 0.32 });
  const inner = fl(bowl, "stone", 2, 1) + shadowWall + litWall + fl(floor, "stone", 1, 0.95) + fl(ellp(-6, 14, 44, 10), "ink", 0, 0.14) + crater(40, 16, 12) + crater(-34, 6, 8);
  const pk = L.shape(L.poly([[-6, 16], [16, -16], [42, 16]], true), "stone", { w: "detail", tone: 0 }) + fl(L.poly([[16, -16], [42, 16], [24, 16]], true), "ink", 0, 0.3) + fl(L.poly([[16, -16], [6, 0], [12, 4]], true), "white", 0, 0.5) + fl(ellp(26, 20, 26, 5), "ink", 0, 0.18);
  const rock = (x, y, r) => fl(ellp(x + r * 0.6, y + r * 0.35, r * 1.3, r * 0.4), "ink", 0, 0.22) + L.shape(blob(x, y, r, Math.round(x + y), 7, 0.25), "stone", { w: "detail", tone: 1 }) + fl(L.circ(x - r * 0.3, y - r * 0.3, r * 0.34, r * 0.22), "white", 0, 0.55);
  const small = [[-148, 32, 22], [138, 34, 16], [-104, -50, 12], [116, -52, 10]].map(([x, y, r]) => fl(ellp(x, y, r * 1.2, r * 0.52), "ink", 0, 0.26) + L.shape(ellp(x, y, r, r * 0.45), "stone", { w: "detail", tone: 2 }) + fl(ellp(x - r * 0.2, y - r * 0.12, r * 0.7, r * 0.26), "white", 0, 0.35) + L.stroke(L.arc(x, y, r, 190, 290, r * 0.45), { c: "white", w: 3, op: 0.7 })).join("");
  return gr + small + rim + L.shape(bowl, "stone", { w: "prop", tone: 2 }) + clip(bowl, inner) + edge(bowl) + pk + rock(-72, 62, 10) + rock(92, 66, 13) + rock(-150, -4, 8) + rock(160, 4, 9) + L.stroke("M-100 -26 Q-60 -52 0 -50", { c: "white", w: 5, op: 0.6 });
}, [-205, -90, 410, 190]);

reg("cos-asteroid-belt", "Asteroid belt between Mars and Jupiter", G4, ["asteroid belt", "mars", "jupiter", "orbit", "rocks", "solar system", "debris"], (o) => {
  let s = "";
  [70, 190].forEach((r) => (s += L.stroke(L.circ(0, 0, r), { w: "detail", dash: "6 8", op: 0.45 })));
  const g = L.rng(17);
  for (let i = 0; i < 170; i++) { const a = g() * 360, r = 104 + g() * 40, [x, y] = P(r, a); i % 5 ? (s += dot(x, y, 2 + g() * 2.4, "stone")) : (s += L.shape(blob(x, y, 4 + g() * 3, i, 7, 0.3), "stone", { w: "hair" })); }
  s += sunIcon(0, 0, 14, 10) + sph(...P(70, -40), 7, "red", "", { noHi: true }) + sph(...P(190, 160), 17, "earth", band(-6, 4, "orange", 0.6, 0, 40), { noHi: true });
  if (o.labels !== false) s += leader(o, ...P(125, 140), -140, 190) + lab(o, "Asteroid belt", -140, 214, 26, "ink", "end") + lab(o, "Mars", ...P(70, -40).map((v, i) => (i ? v - 14 : v - 14)), 22, "ink", "end") + lab(o, "Jupiter", ...P(190, 160).map((v, i) => (i ? v + 38 : v)), 24);
  return s;
}, [-250, -215, 500, 450]);

reg("cos-asteroid-impact", "Asteroid heading for Earth", G4, ["asteroid", "impact", "earth", "collision", "meteor", "extinction", "danger"], () =>
  L.stroke("M80 -56 L22 -2", { w: "detail", dash: "6 8", op: 0.7 }) + sph(-70, 70, 100, "water", LAND.map((p) => L.shape(L.smooth(p.map(([x, y]) => [-70 + x * 100, 70 + y * 100])), "grass", { w: "detail" })).join("")) +
  L.stroke(L.circ(7, 6, 9), { c: "red", w: 4 }) + L.g(meteor(18, 100), "translate(120 -86) rotate(-40)"), [-190, -215, 440, 395]);

// ===================== Orbits & light =====================
const G5 = "Orbits & light";
reg("cos-orbits-topdown", "Planet orbits from above", G5, ["orbits", "solar system", "planets", "top view", "diagram", "sun", "rings"], () => {
  const pl = [[36, "gray", 5, -150], [58, "yellow", 7, 40], [82, "water", 8, 110], [106, "red", 6, -60], [150, "earth", 17, 160], [190, "gold", 14, -30], [222, "teal", 10, 80], [252, "blue", 10, -120]];
  let s = pl.map(([r]) => L.stroke(L.circ(0, 0, r), { w: "detail", dash: "6 8", op: 0.4 })).join("") + sunIcon(0, 0, 18, 10);
  pl.forEach(([r, c, pr, a], i) => { const [x, y] = P(r, a); s += (i === 5 ? L.stroke(ellp(x, y, 26, 8), { c: "gold", w: 5 }) : "") + sph(x, y, pr, c, "", { noHi: pr < 9 }); });
  return s;
}, [-272, -272, 544, 544]);

reg("cos-orbit-ellipse", "Elliptical orbit", G5, ["orbit", "ellipse", "perihelion", "aphelion", "kepler", "speed", "diagram"], (o) => {
  const c = 160;
  let s = L.stroke(ellp(0, 0, 200, 120), { w: "prop", op: 0.8 }) + sunIcon(-c, 0, 18, 10);
  s += L.stroke(L.poly([[-c, 0], [-200, 0]]), { w: "detail", dash: "5 6" }) + L.stroke(L.poly([[-c, 0], [200, 0]]), { w: "detail", dash: "5 6" });
  s += sph(-200, 0, 9, "water", "") + sph(200, 0, 9, "water", "") + sph(...P(1, 0).map((v, i) => (i ? -120 : 0)), 9, "water", "");
  s += arrow([[-60, -112], [40, -118]], "orange", "prop", 14) + arrow([[196, 28], [196, 60]], "orange", "detail", 10);
  return s + lab(o, "Closest · fastest", -140, 168, 24, "ink") + lab(o, "Farthest · slowest", 180, 168, 24, "ink");
}, [-250, -140, 560, 340]);

reg("cos-orbit-cannon", "Newton's cannonball", G5, ["orbit", "newton", "cannon", "gravity", "falling", "thought experiment", "speed"], (o) => {
  const W = 260;
  let inner = fl(L.rect(-W, -100, 2 * W, 270), "navy", 0);
  const g = L.rng(41); for (let i = 0; i < 20; i++) inner += dot(-W + g() * 2 * W, -95 + g() * 90, 1.3 + g() * 1.6, "white", 0.7);
  inner += L.stroke(L.circ(0, 190, 206), { c: "green", w: 5, dash: "10 8" }) + L.stroke("M12 -16 Q55 -26 70 57", { c: "red", w: 5 }) + L.stroke("M12 -16 Q150 -40 140 136", { c: "orange", w: 5 });
  inner += sph(0, 190, 150, "water", fl(ellp(-60, 70, 60, 20), "grass", 0, 1) + fl(ellp(80, 100, 50, 16), "grass", 0, 1), { noHi: true }) + L.shape(L.poly([[-44, 44], [0, -8], [44, 44]], true), "stone", { w: "prop" }) + L.shape(L.rrect(-4, -26, 34, 14, 5), "gray", { w: "detail" }) + dot(-2, -10, 7, "ink");
  inner += arrow([[160, -4], [190, 12]], "green", "prop", 12);
  let s = clip(L.rrect(-W, -100, 2 * W, 270, 28), inner) + edge(L.rrect(-W, -100, 2 * W, 270, 28));
  [["red", "too slow", -62], ["orange", "faster", -30], ["green", "orbit!", 2]].forEach(([c, t, y]) => (s += L.stroke(L.poly([[-236, y - 8], [-206, y - 8]]), { c, w: 7 }) + lab(o, t, -196, y + 2, 26, "white", "start")));
  return s;
}, [-270, -112, 540, 294], { wide: true });

reg("cos-light-year-ruler", "Light-year ruler", G5, ["light-year", "distance", "ruler", "scale", "nearest star", "space", "speed of light"], (o) => {
  let s = L.shape(L.rrect(-390, -30, 790, 60, 10), "yellow", { w: "prop" });
  for (let i = 0; i <= 21; i++) { const x = -360 + i * 32, big = i % 5 === 0; s += L.stroke(L.poly([[x, 30], [x, big ? -2 : 12]]), { w: big ? "prop" : "detail" }); }
  [0, 1, 2, 3, 4].forEach((i) => (s += lab(o, String(i), -360 + i * 160, 74, 28)));
  s += sunIcon(-360, -92, 24, 10) + glow(312, -92, 14, "red", 2, 0.2) + sph(312, -92, 14, "red", "", { noHi: true });
  s += L.stroke(L.poly([[-360, -50], [-360, -30]]), { w: "detail" }) + L.stroke(L.poly([[312, -50], [312, -30]]), { w: "detail" });
  s += dot(-150, -100, 8, "yellow") + L.stroke("M-200 -100 H-168 M-196 -90 H-170 M-196 -110 H-170", { c: "gold", w: 4 });
  s += lab(o, "Sun", -360, -140, 26) + lab(o, "Nearest star", 312, -128, 26) + lab(o, "light-years", 250, 74, 26, "ink", "start");
  return s + lab(o, "1 light-year = 9.5 trillion km", 0, 128, 30);
}, [-420, -170, 840, 330], { wide: true });

reg("cos-light-sun-earth", "Sunlight takes 8 minutes", G5, ["light", "speed of light", "sun", "earth", "8 minutes", "distance", "travel time"], (o) => {
  const ray = [-34, 0, 34].map((y) => L.stroke(`M-170 ${y} H190`, { c: y ? "gold" : "orange", w: y ? 5 : 9, dash: y ? "16 10" : undefined })).join("");
  return ray + L.stroke(L.poly([[190, 0], [168, -14]]), { c: "orange", w: 9 }) + L.stroke(L.poly([[190, 0], [168, 14]]), { c: "orange", w: 9 }) + sunIcon(-250, 0, 54, 12) + earth(262, 0, 26) +
    lab(o, "8 min 20 s", 0, -64, 36) + lab(o, "150 million km", 0, 78, 28) + lab(o, "Sun", -250, 112, 26) + lab(o, "Earth", 262, 62, 26);
}, [-352, -110, 684, 230], { wide: true });

reg("cos-eclipse-diagram", "Solar eclipse diagram", G5, ["eclipse", "solar eclipse", "moon", "shadow", "sun", "earth", "umbra", "diagram"], (o) => {
  const rays = [-52, -34, 34, 52].map((y) => arrow([[-220, y], [180, y * 0.8]], "gold", "detail", 12)).join("");
  return fl(L.poly([[96, -16], [262, -52], [262, 52], [96, 16]], true), "ink", 0, 0.1) + fl(L.poly([[96, -16], [256, -3], [256, 3], [96, 16]], true), "ink", 0, 0.4) + rays +
    sunIcon(-300, 0, 64, 12) + sph(96, 0, 16, "stone", "", { noHi: true }) + earth(268, 0, 42) +
    lab(o, "Sun", -300, 118, 26) + lab(o, "Moon", 96, 56, 28) + lab(o, "Earth", 268, 100, 28) + lab(o, "Shadow", 170, -64, 26, "ink");
}, [-415, -90, 745, 220], { wide: true });

reg("cos-universe-expansion", "The expanding universe", G5, ["expanding universe", "big bang", "galaxies", "stretch", "dots", "diagram", "cosmology"], (o) => {
  const g = L.rng(13), dots = Array.from({ length: 9 }, () => { const a = g() * 6.283, r = Math.sqrt(g()) * 0.82; return [Math.cos(a) * r, Math.sin(a) * r]; });
  let s = "";
  [[-260, 50, "Then"], [-30, 82, "Later"], [250, 116, "Now"]].forEach(([x, r, t]) => {
    s += L.shape(L.circ(x, 0, r), "navy", { w: "prop", flat: true }) + dots.map(([dx, dy]) => dot(x + dx * r, dy * r, 5, "yellow")).join("") + lab(o, t, x, r + 42, 28);
  });
  return s + arrow([[-190, 0], [-134, 0]], "ink", "prop", 14) + arrow([[66, 0], [114, 0]], "ink", "prop", 14);
}, [-330, -140, 720, 310], { wide: true });

const clockFace = (cx, cy, r, hA, mA) => {
  let s = L.shape(L.circ(cx, cy, r), "white", { w: "prop" });
  for (let i = 0; i < 12; i++) s += L.stroke(L.poly([P(r * 0.82, i * 30, cx, cy), P(r * 0.94, i * 30, cx, cy)]), { w: "detail" });
  return s + L.stroke(L.poly([[cx, cy], P(r * 0.5, hA - 90, cx, cy)]), { w: "prop" }) + L.stroke(L.poly([[cx, cy], P(r * 0.78, mA - 90, cx, cy)]), { w: "detail" }) + dot(cx, cy, 5);
};
reg("cos-time-dilation", "Time runs slower near a black hole", G5, ["time dilation", "relativity", "black hole", "clock", "slow time", "gravity", "interstellar"], (o) =>
  L.g(blackHole(30, 0.22), "translate(-325 0)") + clockFace(-150, 0, 70, 30, 0) + clockFace(170, 0, 70, 120, 200) +
  lab(o, "1 hour", -150, 122, 34) + lab(o, "7 years", 170, 122, 34) + lab(o, "Near the black hole", -230, -100, 30) + lab(o, "Far away", 170, -100, 30), [-420, -140, 720, 300], { wide: true });

reg("cos-redshift", "Redshift: stretched light", G5, ["redshift", "doppler", "light wave", "stretch", "galaxy", "moving away", "expanding universe"], (o) => {
  const pts = [], X0 = -230, X1 = 190; let ph = 0;
  for (let x = X0; x <= X1; x += 2) { const p = 20 + 0.16 * (x - X0); ph += (2 * Math.PI * 2) / p; pts.push([x, -Math.sin(ph) * 26]); }
  const cols = ["blue", "purple", "pink", "orange", "red"], n = pts.length / 5 | 0;
  let s = cols.map((c, i) => L.stroke(L.smooth(pts.slice(Math.max(0, i * n - 1), (i + 1) * n + 1)), { c, w: 8 })).join("");
  s += fit("cos-galaxy-edge-on", -300, 0, 110) + arrow([[-330, 62], [-260, 62]], "ink", "prop", 14) + sph(266, 0, 20, "water", "");
  return s + lab(o, "moving away", -262, 104, 30) + lab(o, "light gets stretched", -20, 80, 36) + lab(o, "us", 266, 62, 32);
}, [-385, -90, 700, 210], { wide: true });

// ===================== Spacecraft =====================
const G6 = "Spacecraft";
// generic rocket, nose up, origin centre (about 100 x 280 with the flame)
const rocket = () => {
  const body = "M0 -120 C46 -84 42 -10 30 66 L-30 66 C-42 -10 -46 -84 0 -120 Z";
  return L.shape("M-18 66 Q-26 120 0 160 Q26 120 18 66 Z", "orange", { w: "detail" }) + L.shape("M-9 70 Q-12 108 0 132 Q12 108 9 70 Z", "yellow", { w: "detail" }) +
    L.shape("M-30 10 L-64 74 L-30 54 Z", "red", { w: "prop" }) + L.shape("M30 10 L64 74 L30 54 Z", "red", { w: "prop" }) + L.shape("M-14 64 H14 L19 80 H-19 Z", "gray", { w: "detail" }) +
    L.shape(body, "white", { w: "prop" }) + clip(body, fl(L.rect(-60, -130, 120, 54), "red") + fl("M-60 30 H60 V44 H-60 Z", "red") + fl("M-34 -90 Q-40 -20 -34 40 L-24 40 Q-30 -20 -24 -84 Z", "white", 0, 0.5)) + edge(body) +
    sph(0, -34, 17, "glass", fl(L.circ(-3, -37, 10), "sky", 0, 0.9), { noHi: true });
};
// generic comms satellite, panels left and right, origin centre (about 240 x 90)
const satellite = () => {
  const panel = (x) => L.shape(L.rrect(x, -26, 84, 52, 3), "blue", { w: "prop" }) + L.stroke(`M${x} -9 H${x + 84} M${x} 9 H${x + 84} M${x + 28} -26 V26 M${x + 56} -26 V26`, { w: "hair", op: 0.55 });
  return tube("M-34 0 H-44 M34 0 H44", "gray", 7) + panel(-128) + panel(44) + tube("M0 -30 V-58", "gray", 5) + dot(0, -62, 6, "red", 1) + L.shape(L.rrect(-34, -32, 68, 64, 8), "gold", { w: "prop" }) + L.stroke("M-34 -10 H34 M-34 10 H34", { w: "detail", op: 0.4 }) + fl(L.rrect(-28, -26, 20, 8, 4), "white", 0, 0.5);
};
reg("cos-rocket-stages", "Rocket stages", G6, ["rocket", "stages", "booster", "payload", "launch", "separation", "diagram"], (o) => {
  const gray = (d) => L.shape(d, "gray", { w: "detail" });
  let s = L.stroke("M-34 -208 V-192 M34 -208 V-192 M-38 -64 V-40 M38 -64 V-40", { w: "detail", dash: "4 5" });
  s += L.shape("M-32 -212 L-32 -252 C-32 -290 -8 -322 0 -330 C8 -322 32 -290 32 -252 L32 -212 Z", "white", { w: "prop" }) + fl("M-32 -252 H32 V-236 H-32 Z", "red", 0) + dot(0, -278, 11, "glass", 1) + L.stroke(L.circ(0, -278, 11), { w: "detail" });
  s += gray("M-14 -90 H14 L24 -66 H-24 Z") + L.shape(L.rrect(-34, -190, 68, 100, 8), "white", { w: "prop" }) + fl("M-34 -176 H34 V-160 H-34 Z", "red", 0) + L.stroke("M-34 -176 H34 M-34 -160 H34", { w: "hair" });
  s += L.shape("M-40 -20 L-76 70 L-40 50 Z", "red", { w: "prop" }) + L.shape("M40 -20 L76 70 L40 50 Z", "red", { w: "prop" });
  s += [-26, 0, 26].map((x) => gray(`M${x - 8} 110 H${x + 8} L${x + 12} 134 H${x - 12} Z`)).join("") + L.shape(L.rrect(-40, -40, 80, 152, 8), "white", { w: "prop" }) + fl("M-40 -22 H40 V-6 H-40 Z", "red", 0) + L.stroke("M-40 -22 H40 M-40 -6 H40", { w: "hair" }) + fl("M-30 -34 V100", "white", 0, 0);
  if (o.labels !== false) s += leader(o, 34, -270, 90, -270) + lab(o, "Payload", 98, -260, 26, "ink", "start") + leader(o, 34, -140, 90, -140) + lab(o, "Stage 2", 98, -130, 26, "ink", "start") + leader(o, 40, 40, 90, 40) + lab(o, "Stage 1", 98, 50, 26, "ink", "start");
  return s;
}, [-100, -345, 330, 500]);

reg("cos-rocket-liftoff", "Rocket lifting off with smoke trail", G6, ["rocket", "launch", "liftoff", "smoke", "trail", "ascent", "space"], () =>
  puff([[-30, 100, 22], [-52, 126, 28], [-84, 150, 34], [-126, 168, 40], [-174, 180, 46]], "white") + L.g(rocket(), "translate(50 -30) rotate(30) scale(1.1)"), [-225, -150, 360, 380]);

reg("cos-rocket-landing", "Rocket booster landing", G6, ["rocket", "landing", "booster", "reusable", "legs", "touchdown", "pad"], () => {
  let s = L.shape(ellp(0, 6, 120, 20), "gray", { w: "detail" }) + L.stroke(ellp(0, 6, 80, 12), { c: "white", w: 4 }) + L.stroke("M-18 0 L18 12 M-18 12 L18 0", { c: "white", w: 4 }) + L.shadow(0, 4, 90);
  s += fl("M-30 -4 Q0 30 30 -4 Z", "yellow", 0, 0.9) + fl("M-16 -8 Q0 22 16 -8 Z", "white", 0, 0.9);
  s += puff([[-122, -10, 18], [-100, -6, 14], [122, -10, 18], [100, -6, 14]], "white");
  s += tube("M-30 -76 L-84 -6", "gray", 9) + tube("M30 -76 L84 -6", "gray", 9) + L.shape(L.rrect(-98, -10, 28, 8, 3), "gray", { w: "detail" }) + L.shape(L.rrect(70, -10, 28, 8, 3), "gray", { w: "detail" });
  s += L.shape("M-14 -20 H14 L22 -4 H-22 Z", "gray", { w: "detail" }) + L.shape(L.rrect(-30, -250, 60, 232, 10), "white", { w: "prop" }) + fl("M-30 -236 H30 V-206 H-30 Z", "navy", 0, 0.9) + fl("M-30 -28 H30 V-18 H-30 Z", "navy", 0, 0.9) + fl("M-30 -250 H-18 V-18 H-30 Z", "white", 1, 0.6);
  s += L.shape(L.rrect(-52, -222, 22, 8, 3), "gray", { w: "detail" }) + L.shape(L.rrect(30, -222, 22, 8, 3), "gray", { w: "detail" });
  return s;
}, [-130, -270, 260, 300]);

reg("cos-capsule-chutes", "Capsule under parachutes", G6, ["capsule", "parachute", "re-entry", "splashdown", "landing", "descent", "return"], () => {
  const dome = (cx, cy, k, rot, c1, c2) => {
    const d = "M-90 0 Q-92 -90 0 -92 Q92 -90 90 0 Q60 -14 45 0 Q22 -14 0 0 Q-22 -14 -45 0 Q-60 -14 -90 0 Z";
    const stripes = [-72, -36, 0, 36].map((x, i) => fl(`M${x} -100 H${x + 36} V10 H${x} Z`, i % 2 ? c2 : c1, 0)).join("");
    return L.g(L.shape(d, c2, { w: "prop" }) + clip(d, stripes + fl(L.circ(-30, -70, 40, 22), "white", 0, 0.25)) + edge(d), `translate(${cx} ${cy}) rotate(${rot}) scale(${k})`);
  };
  let s = [[-190, -75, -50, 90], [190, -75, 50, 90]].map(([x, y, bx]) => L.stroke(`M${x} ${y} L-18 72 M${x + (x < 0 ? 60 : -60)} ${y} L-6 72`, { w: "hair", op: 0.8 })).join("");
  s += L.stroke("M-64 -92 L-20 72 M-20 -92 L-6 72 M24 -92 L10 72 M64 -92 L22 72", { w: "hair", op: 0.8 });
  s += dome(-130, -60, 0.6, -18, "orange", "white") + dome(130, -60, 0.6, 18, "orange", "white") + dome(0, -92, 0.85, 0, "red", "white");
  s += L.shape("M-26 70 H26 L44 128 H-44 Z", "white", { w: "prop" }) + L.shape("M-44 126 Q0 150 44 126 Q0 134 -44 126 Z", "brown", { w: "detail" }) + L.shape(L.circ(0, 100, 10), "glass", { w: "detail" }) + fl("M-22 72 L-8 72 L-30 124 L-40 124 Z", "white", 1, 0.7);
  return s;
}, [-210, -210, 420, 380]);

reg("cos-rover", "Planet rover", G6, ["rover", "mars", "robot", "wheels", "explorer", "science", "moon buggy"], () => {
  const wheel = (x) => L.shape(L.circ(x, -22, 22), "gray", { w: "prop", tone: 2 }) + [0, 60, 120, 180, 240, 300].map((a) => L.stroke(L.poly([P(14, a, x, -22), P(22, a, x, -22)]), { c: "stone", w: 4 })).join("") + L.shape(L.circ(x, -22, 8), "white", { w: "detail" });
  let s = L.shadow(0, 0, 220) + tube("M-72 -22 L-30 -46 L28 -46 L72 -22", "gray", 8) + [-72, 0, 72].map(wheel).join("");
  s += tube("M50 -80 L50 -142", "gray", 7) + L.shape(L.rrect(32, -164, 40, 24, 7), "gray", { w: "prop" }) + dot(44, -152, 5, "navy") + dot(60, -152, 5, "navy") + dot(44, -154, 1.5, "white");
  s += L.shape(L.rrect(-80, -84, 160, 44, 10), "cream", { w: "prop" }) + L.shape(L.rrect(-62, -104, 60, 24, 6), "gold", { w: "detail" }) + L.shape(L.rrect(-76, -80, 40, 14, 4), "blue", { w: "detail" });
  s += L.g(L.shape("M-14 0 Q0 22 14 0 Z", "white", { w: "detail" }) + L.shape(ellp(0, 0, 14, 4), "white", { w: "detail" }), "translate(-30 -108) rotate(-25)");
  s += tube("M80 -62 L112 -44 L104 -18", "gray", 6) + dot(104, -16, 6, "gold", 1);
  return s;
}, [-130, -175, 260, 200]);

reg("cos-probe", "Deep-space probe", G6, ["probe", "spacecraft", "dish", "voyager-like", "deep space", "antenna", "robot explorer"], () => {
  let s = L.stroke("M0 -12 L-34 -86 M0 -12 L34 -86 M0 -12 V-90", { c: "gray", w: 4 });
  s += L.g(L.shape("M-72 0 Q0 74 72 0 Z", "white", { w: "prop" }) + L.shape(ellp(0, 0, 72, 17), "white", { w: "prop" }) + fl(ellp(0, 2, 58, 10), "gray", 0, 0.45), "translate(0 -6)") + dot(0, -90, 7, "red", 1) + L.stroke(L.circ(0, -90, 7), { w: "detail" });
  s += tube("M34 50 H108", "gray", 6) + L.shape(L.rrect(106, 36, 44, 28, 6), "gray", { w: "prop" }) + L.stroke("M118 36 V64 M130 36 V64 M142 36 V64", { w: "hair", op: 0.6 }) + tube("M-34 54 L-120 70", "gray", 5) + dot(-124, 70, 6, "gold", 1);
  s += L.shape(L.rrect(-38, 18, 76, 62, 10), "gold", { w: "prop" }) + L.stroke("M-38 40 H38 M-38 60 H38", { w: "hair", op: 0.5 }) + L.shape(L.rrect(-16, 80, 32, 12, 4), "gray", { w: "detail" }) + fl("M-30 24 H-8 V34 H-30 Z", "white", 0, 0.5);
  return L.g(s, "rotate(-20)");
}, [-190, -170, 380, 330]);

reg("cos-satellite-orbit", "Satellite orbiting Earth", G6, ["satellite", "orbit", "earth", "signal", "gps", "communications", "space"], () => {
  const arcs = (a0, a1) => L.g(L.stroke(L.arc(0, 0, 130, a0, a1, 38), { c: "ink", w: "detail", dash: "7 7", op: 0.7 }), "rotate(-25)");
  const [sx, sy] = (() => { const a = 20 * D2R, x = 130 * Math.cos(a), y = 38 * Math.sin(a), r = -25 * D2R; return [x * Math.cos(r) - y * Math.sin(r), x * Math.sin(r) + y * Math.cos(r)]; })();
  return arcs(180, 360) + earth(0, 0, 62) + arcs(0, 180) + L.g(satellite(), `translate(${f1(sx)} ${f1(sy - 6)}) scale(0.4)`);
}, [-175, -100, 350, 200]);

reg("cos-space-telescope", "Space telescope", G6, ["space telescope", "observatory", "hubble-like", "mirror", "orbit", "solar panels", "astronomy"], () => {
  const panel = (y, f) => L.shape(L.rrect(-60, y, 80, 74, 3), "blue", { w: "prop" }) + L.stroke(`M-60 ${y + 25} H20 M-60 ${y + 50} H20 M-33 ${y} V${y + 74} M-7 ${y} V${y + 74}`, { w: "hair", op: 0.55 });
  let s = tube("M-20 -34 V-44 M-20 34 V44", "gray", 6) + panel(-124) + panel(50);
  s += L.shape(L.rrect(-100, -34, 170, 68, 14), "gray", { w: "prop", tone: 1 }) + fl("M-100 -34 H70 V-22 H-100 Z", "white", 0, 0.4) + L.shape(L.rrect(66, -26, 22, 52, 6), "gold", { w: "detail" });
  s += L.shape(ellp(-100, 0, 16, 34), "navy", { w: "prop" }) + L.shape("M-104 -34 L-150 -62 L-146 -22 Z", "gray", { w: "detail" }) + dot(-102, -8, 5, "sky", 0.6) + L.stroke("M40 34 L54 66", { c: "gray", w: 4 }) + dot(56, 70, 6, "red", 1);
  return L.g(s, "rotate(-20)");
}, [-165, -150, 330, 290]);

reg("cos-spaceplane", "Spaceplane gliding", G6, ["spaceplane", "shuttle-like", "glider", "reusable", "landing", "orbiter", "winged"], () => {
  let s = L.shape("M-30 14 L-100 56 L-112 60 L40 28 Z", "gray", { w: "prop" }) + L.shape("M-96 -20 L-120 -74 L-76 -24 Z", "white", { w: "prop" });
  s += L.shape("M-112 -4 L-98 -26 L40 -30 Q100 -26 134 12 L126 24 L-112 28 Z", "white", { w: "prop" }) + L.shape("M-110 18 H120 L126 26 L-112 30 Z", "navy", { w: "detail" }) + L.shape("M104 -16 Q130 -6 134 12 L112 6 Z", "navy", { w: "detail" });
  s += L.shape("M58 -22 Q84 -26 96 -14 L62 -8 Z", "glass", { w: "detail" }) + [-8, 6, 18].map((y) => L.shape(L.circ(-118, y, 6), "gray", { w: "hair" })).join("") + fl("M-90 -22 H30 V-14 H-90 Z", "white", 1, 0.7);
  return L.g(s, "rotate(-8)");
}, [-150, -90, 300, 170]);

reg("cos-solar-sail", "Solar sail", G6, ["solar sail", "light pressure", "sail", "propulsion", "spacecraft", "photons", "future"], () => {
  const c = [[-110, -130], [50, -150], [136, 56], [-26, 84]];
  let s = [[-285, -70], [-285, -10], [-285, 50]].map(([x, y]) => arrow([[x, y], [x + 80, y + (y > -10 ? 10 : y < -10 ? -10 : 0)]], "gold", "prop", 14)).join("");
  s += L.stroke(L.poly([[-110, -130], [10, 150], [136, 56], [10, 150], [50, -150], [10, 150], [-26, 84]]), { w: "hair", op: 0.8 });
  s += L.shape(L.poly(c, true), "yellow", { w: "prop" }) + L.stroke(L.poly([c[0], c[2]]), { w: "hair", op: 0.4 }) + L.stroke(L.poly([c[1], c[3]]), { w: "hair", op: 0.4 }) + fl(L.poly([c[0], c[1], [8, -20], [-40, -4]], true), "white", 0, 0.45);
  s += L.shape(L.rrect(-4, 140, 28, 28, 6), "gray", { w: "prop" }) + dot(10, 154, 5, "gold", 1);
  return s;
}, [-320, -170, 500, 350]);

// ===================== Telescopes & aliens =====================
const G7 = "Telescopes & aliens";
reg("cos-telescope-refractor", "Refractor telescope on a tripod", G7, ["telescope", "refractor", "stargazing", "tripod", "lens", "astronomy", "observe"], () => {
  let s = L.shadow(0, 0, 150) + tube("M0 -80 L-62 0 M0 -80 L62 0 M0 -80 L6 0", "gray", 8);
  const tubeG = L.shape(L.rrect(-76, -17, 200, 34, 9), "white", { w: "prop" }) + L.shape(L.rrect(116, -21, 18, 42, 5), "gold", { w: "prop" }) + fl("M-76 -14 H124 V-8 H-76 Z", "blue", 0, 0.3) + L.shape(L.rrect(-100, -9, 28, 18, 5), "gray", { w: "detail" }) + L.shape(L.rrect(-106, -5, 10, 10, 3), "ink", { w: "hair" }) +
    L.shape(L.rrect(10, -42, 72, 12, 5), "gray", { w: "detail" }) + tube("M24 -30 V-18 M66 -30 V-18", "gray", 4);
  return s + L.g(tubeG, "translate(0 -84) rotate(-38)") + dot(0, -84, 9, "gray", 1) + L.stroke(L.circ(0, -84, 9), { w: "detail" });
}, [-135, -220, 300, 235]);

reg("cos-telescope-reflector", "Reflector telescope on a dobsonian base", G7, ["telescope", "reflector", "dobsonian", "newtonian", "mirror", "astronomy", "stargazing"], () => {
  let s = L.shadow(0, 0, 150) + L.shape(L.rrect(-60, -52, 120, 52, 10), "wood", { w: "prop" }) + L.shape(L.rrect(-52, -78, 16, 30, 4), "wood", { w: "detail" }) + L.shape(L.rrect(36, -78, 16, 30, 4), "wood", { w: "detail" });
  const t = L.shape(L.rrect(-70, -36, 168, 72, 12), "blue", { w: "prop" }) + fl("M-70 -34 H98 V-22 H-70 Z", "white", 0, 0.35) + L.shape(ellp(98, 0, 14, 36), "navy", { w: "prop" }) + L.stroke(ellp(98, 0, 8, 22), { c: "sky", w: 3, op: 0.7 }) +
    L.shape(L.rrect(58, -66, 18, 30, 5), "gray", { w: "detail" }) + L.shape(L.rrect(55, -72, 24, 8, 3), "ink", { w: "detail" });
  return s + L.g(t, "translate(0 -82) rotate(-50)") + dot(0, -82, 8, "gray", 1);
}, [-120, -250, 330, 262]);

reg("cos-observatory-dome", "Observatory dome", G7, ["observatory", "dome", "telescope", "stargazing", "astronomy", "building", "slit"], () => {
  const dome = "M-100 -90 A100 100 0 0 1 100 -90 Z";
  let s = L.shadow(0, 0, 250) + L.shape(L.rrect(-104, -92, 208, 92, 8), "cream", { w: "prop" }) + L.shape(L.rrect(-18, -52, 36, 52, 10), "wood", { w: "detail" }) + dot(10, -26, 3, "gold", 1);
  s += L.shape(dome, "white", { w: "prop" }) + clip(dome, L.stroke("M-70 -90 Q-70 -170 -4 -192 M-34 -90 Q-34 -168 -4 -192 M30 -90 Q30 -168 -4 -192", { c: "stone", w: 3, op: 0.5 }) + fl("M18 -200 L50 -200 L58 -88 L26 -88 Z", "navy", 0) + tube("M36 -100 L56 -176", "gray", 16)) + edge(dome);
  s += L.shape(L.rrect(-110, -96, 220, 10, 4), "gray", { w: "detail" }) + spark(-70, -200, 9, "yellow", 1) + spark(86, -190, 7, "yellow", 1);
  return s;
}, [-125, -225, 250, 240]);

reg("cos-radio-array", "Radio telescope array", G7, ["radio telescope", "dish", "array", "antenna", "listening", "signal", "seti"], () => {
  const dish = (x, y, k) => L.g(L.shadow(0, 0, 76) + tube("M0 0 V-34", "gray", 9) + L.g(L.shape("M-38 0 Q0 48 38 0 Z", "white", { w: "prop" }) + L.shape(ellp(0, 0, 38, 10), "white", { w: "prop" }) + fl(ellp(0, 2, 30, 6), "gray", 0, 0.5) + L.stroke("M0 0 V-52", { w: "detail" }) + dot(0, -54, 4, "red", 1), "translate(0 -34) rotate(-32)"), `translate(${x} ${y}) scale(${k})`);
  return dish(-120, 4, 1.6) + dish(-10, -6, 1.4) + dish(86, -16, 1.2) + dish(166, -24, 1.0);
}, [-210, -170, 420, 190]);

reg("cos-alien-cute", "Cute alien", G7, ["alien", "extraterrestrial", "green", "cute", "visitor", "martian", "antenna"], () => {
  let s = L.shadow(0, 0, 90) + tube("M-12 -34 L-16 -6 M12 -34 L16 -6", "green", 9) + L.shape(ellp(-18, -3, 14, 6), "green", { w: "detail" }) + L.shape(ellp(18, -3, 14, 6), "green", { w: "detail" });
  s += tube("M-20 -62 Q-40 -54 -42 -36 M20 -62 Q40 -54 42 -36", "green", 8) + L.shape("M-24 -34 C-30 -62 -22 -76 0 -76 C22 -76 30 -62 24 -34 Z", "green", { w: "prop" });
  s += tube("M-20 -140 Q-34 -168 -26 -184 M20 -140 Q34 -168 26 -184", "green", 5) + sph(-26, -186, 7, "yellow", "", { noHi: true }) + sph(26, -186, 7, "yellow", "", { noHi: true });
  s += sph(0, -104, 52, "green", "") + L.g(L.shape(ellp(0, 0, 14, 22), "ink", { w: "detail", flat: true }) + dot(-4, -8, 4, "white"), "translate(-24 -98) rotate(22)") + L.g(L.shape(ellp(0, 0, 14, 22), "ink", { w: "detail", flat: true }) + dot(-4, -8, 4, "white"), "translate(24 -98) rotate(-22)") + L.stroke("M-9 -70 Q0 -62 9 -70", { w: "detail" });
  return s;
}, [-90, -205, 180, 215]);

reg("cos-alien-blob", "Jelly alien", G7, ["alien", "blob", "jelly", "cute", "monster", "three eyes", "purple"], () => {
  const body = "M-62 0 C-70 -50 -46 -116 0 -118 C46 -116 70 -50 62 0 Q40 12 20 2 Q0 14 -20 2 Q-40 12 -62 0 Z";
  let s = L.shadow(0, 2, 150) + L.shape(body, "purple", { w: "prop" }) + fl("M-40 -90 Q-20 -112 8 -108 Q-24 -100 -34 -70 Z", "white", 0, 0.4);
  s += [[-34, -34, 7], [38, -48, 6], [30, -16, 5], [-14, -20, 4]].map(([x, y, r]) => dot(x, y, r, "pink", 0.8)).join("");
  s += sph(0, -70, 22, "white", "", { noHi: true }) + dot(2, -68, 11, "teal") + dot(2, -68, 6, "ink", 1) + dot(-1, -72, 2.5, "white") + sph(-38, -48, 10, "white", "", { noHi: true }) + dot(-37, -47, 5, "ink") + sph(38, -48, 10, "white", "", { noHi: true }) + dot(37, -47, 5, "ink");
  s += L.stroke("M-16 -30 Q0 -18 16 -30", { w: "detail" }) + tube("M-60 -40 Q-84 -50 -86 -66 M60 -40 Q84 -50 86 -66", "purple", 8);
  return s;
}, [-100, -140, 200, 155]);

reg("cos-ufo-beam", "UFO with tractor beam", G7, ["ufo", "flying saucer", "beam", "abduction", "alien ship", "tractor beam", "tree"], () => {
  let s = fl("M-34 -158 L34 -158 L100 0 L-100 0 Z", "yellow", 0, 0.32) + fl("M-20 -158 L20 -158 L58 0 L-58 0 Z", "yellow", 1, 0.35) + fl(ellp(0, 2, 100, 14), "yellow", 0, 0.5);
  s += L.shadow(0, 0, 60) + tube("M0 -22 V-52", "brown", 10) + puff([[0, -78, 30], [-22, -64, 20], [22, -64, 20]], "green");
  const ufo = L.shape("M-50 8 C-50 -62 50 -62 50 8 Z", "glass", { w: "prop" }) + sph(0, -14, 22, "green", "", { noHi: true }) + dot(-8, -17, 4, "ink") + dot(8, -17, 4, "ink") + L.stroke("M-8 -6 Q0 2 8 -6", { w: "detail" }) +
    L.shape(ellp(0, 30, 112, 28), "gray", { w: "prop" }) + [-70, -35, 0, 35, 70].map((x, i) => dot(x, 26 + (1 - Math.abs(x) / 100) * 4, 7, ["red", "yellow", "green", "yellow", "red"][i])).join("");
  return s + L.g(ufo, "translate(0 -216) scale(0.85)");
}, [-130, -300, 260, 310]);

// ===================== Atoms & matter =====================
const G8 = "Atoms & matter";
const nucleusBalls = [[0, 0, 0], [-1, -0.6, 1], [1, -0.6, 0], [0, 1.1, 1], [-1.1, 0.7, 0], [1.1, 0.7, 1], [0, -1.2, 0]];
reg("cos-atom-shells", "Atom with electron shells", G8, ["atom", "electron", "shell", "nucleus", "bohr", "carbon", "proton", "neutron", "chemistry"], () => {
  let s = [58, 100].map((r) => L.stroke(L.circ(0, 0, r), { w: "detail", op: 0.6 })).join("");
  s += nucleusBalls.map(([x, y, k]) => sph(x * 17, y * 17, 14, k ? "red" : "gray", "", { noHi: true })).join("");
  [30, 210].forEach((a) => (s += sph(...P(58, a), 9, "blue", "", { noHi: true })));
  [20, 110, 200, 290].forEach((a) => (s += sph(...P(100, a), 9, "blue", "", { noHi: true })));
  return s;
}, [-115, -115, 230, 230]);

reg("cos-atom-nucleus", "Nucleus: protons and neutrons", G8, ["nucleus", "proton", "neutron", "atom", "particles", "physics", "legend"], (o) => {
  const pos = [[0, 0, 1], [-36, -14, 0], [36, -14, 0], [-18, 32, 1], [20, 32, 0], [-52, 28, 1], [54, 28, 1], [0, -44, 1], [-34, -52, 0], [34, -52, 1]];
  let s = pos.map(([x, y, k]) => sph(x, y, 24, k ? "red" : "gray", "", {}) + (k ? L.text("+", x, y + 9, { size: 28, c: "white" }) : "")).join("");
  if (o.labels !== false) s += sph(124, -20, 12, "red", "", { noHi: true }) + lab(o, "Proton", 146, -10, 26, "ink", "start") + sph(124, 24, 12, "gray", "", { noHi: true }) + lab(o, "Neutron", 146, 34, 26, "ink", "start");
  return s;
}, [-90, -90, 380, 180]);

reg("cos-molecule-methane", "Molecule (ball and stick)", G8, ["molecule", "methane", "ball and stick", "carbon", "hydrogen", "chemistry", "bond"], () => {
  const H = [[0, -82], [-76, 34], [76, 34], [26, 80]];
  let s = H.map(([x, y]) => tube(L.poly([[0, 0], [x, y]]), "gray", 10)).join("");
  s += sph(0, 0, 28, "gray", "", {}) + H.map(([x, y]) => sph(x, y, 18, "white", "", {})).join("");
  return s;
}, [-110, -110, 220, 220]);

reg("cos-molecule-chain", "Long molecule chain", G8, ["molecule", "polymer", "chain", "carbon", "plastic", "chemistry", "fat", "hydrocarbon"], () => {
  const C = Array.from({ length: 6 }, (_, i) => [-150 + i * 60, i % 2 ? 14 : -14]);
  let s = L.stroke(L.poly(C), { c: L.outline("gray"), w: 16 }) + L.stroke(L.poly(C), { c: "gray", w: 10 });
  C.forEach(([x, y], i) => { const up = y < 0 ? -1 : 1; s += tube(L.poly([[x, y], [x, y + up * 40]]), "gray", 7) + sph(x, y + up * 48, 11, "white", "", { noHi: true }); });
  return s + C.map(([x, y]) => sph(x, y, 20, "gray", "", {})).join("");
}, [-190, -90, 380, 180]);

// ===================== Forces, waves & energy =====================
const G9 = "Forces, waves & energy";
reg("cos-electromagnet", "Electromagnet picking up paperclips", G9, ["electromagnet", "magnet", "coil", "battery", "electricity", "paperclip", "magnetic field"], () => {
  let s = L.stroke(ellp(0, -10, 150, 66), { w: "detail", dash: "8 8", op: 0.4, c: "purple" });
  s += tube("M-78 24 V108 H-48 M70 24 V108 H48", "red", 6) + L.shape(L.rrect(-50, 88, 100, 44, 8), "blue", { w: "prop" }) + L.shape(L.rrect(46, 98, 12, 24, 3), "gray", { w: "detail" }) + L.text("+", 30, 118, { size: 30, c: "white" }) + L.text("−", -30, 118, { size: 30, c: "white" });
  s += L.shape(L.rrect(-110, -12, 232, 24, 6), "gray", { w: "prop" }) + L.shape(L.rrect(-118, -18, 14, 36, 5), "gray", { w: "detail" });
  for (let i = 0; i < 9; i++) { const x = -80 + i * 17; s += tube(`M${x} 20 Q${x + 12} 0 ${x + 4} -20`, "orange", 8); }
  [[134, 24, 14], [124, 44, -8], [142, 62, 10]].forEach(([x, y, r]) => (s += L.g(L.stroke(L.rrect(-5, -12, 10, 24, 5), { c: "stone", w: 4 }) + L.stroke(L.rrect(-3, -8, 6, 16, 3), { c: "stone", w: 3 }), `translate(${x} ${y}) rotate(${r})`)));
  return s;
}, [-170, -90, 340, 240]);

reg("cos-em-spectrum", "Electromagnetic spectrum", G9, ["spectrum", "electromagnetic", "radio", "microwave", "infrared", "visible light", "ultraviolet", "x-ray", "gamma", "wavelength"], (o) => {
  const names = ["Radio", "Micro-\nwave", "Infrared", "Visible", "Ultra-\nviolet", "X-ray", "Gamma"], cols = ["gray", "orange", "red", null, "purple", "blue", "navy"];
  let s = "", pts = [], ph = 0;
  for (let x = -420; x <= 420; x += 2) { const p = 80 * Math.pow(0.12, (x + 420) / 840); ph += (2 * Math.PI * 2) / p; pts.push([x, -Math.sin(ph) * 26 - 80]); }
  s += L.stroke(L.poly(pts), { c: "ink", w: 3.5 });
  names.forEach((n, i) => {
    const x = -420 + i * 120;
    if (cols[i]) s += L.shape(L.rect(x, -30, 120, 76), cols[i], { w: "detail" });
    else ["red", "orange", "yellow", "green", "blue", "purple"].forEach((c, k) => (s += L.shape(L.rect(x + k * 20, -30, 20, 76), c, { w: "hair" })));
    n.split("\n").forEach((t, k, a) => (s += lab(o, t, x + 60, 82 + k * 26 - (a.length - 1) * 13 + 13, 24)));
  });
  return s + edge(L.rrect(-420, -30, 840, 76, 6)) + lab(o, "long waves, low energy", -250, 160, 26, "ink") + lab(o, "short waves, high energy", 235, 160, 26, "ink");
}, [-440, -130, 880, 320], { wide: true });

reg("cos-wave-sound", "Speaker sending sound waves", G9, ["sound", "waves", "speaker", "volume", "noise", "vibration", "audio"], () => {
  let s = L.shape(L.rrect(-110, -74, 92, 148, 14), "navy", { w: "prop" }) + sph(-64, 22, 30, "gray", dot(-64, 22, 12, "ink", 0.6), { noHi: true }) + sph(-64, -38, 14, "gray", "", { noHi: true });
  [[44, 0.9], [72, 0.7], [100, 0.5], [128, 0.3]].forEach(([r, op]) => (s += L.stroke(L.arc(-18, 0, r, -42, 42), { c: "blue", w: 9, op })));
  return s;
}, [-125, -90, 320, 180]);

reg("cos-wave-anatomy", "Parts of a wave", G9, ["wave", "wavelength", "amplitude", "crest", "trough", "diagram", "physics", "frequency"], (o) => {
  const A = 70, T = 240, pts = Array.from({ length: 61 }, (_, i) => { const x = -300 + i * 10; return [x, -A * Math.cos((2 * Math.PI * x) / T)]; });
  let s = L.stroke("M-310 0 H310", { w: "detail", dash: "6 7", op: 0.5 }) + L.stroke(L.smooth(pts), { c: "blue", w: 9 });
  s += dot(0, -A, 7, "red") + dot(120, A, 7, "red") + dot(240, -A, 7, "red");
  s += L.stroke(`M240 ${-A} H330`, { w: "detail", dash: "5 6", op: 0.6 }) + arrow([[0, -A - 40], [240, -A - 40]], "ink", "detail", 12) + arrow([[240, -A - 40], [0, -A - 40]], "ink", "detail", 12) + L.stroke(`M0 ${-A - 52} V${-A - 28} M240 ${-A - 52} V${-A - 28}`, { w: "detail" });
  s += arrow([[320, 0], [320, -A + 6]], "ink", "detail", 12) + arrow([[320, -A + 6], [320, 0]], "ink", "detail", 12);
  return s + lab(o, "Wavelength", 120, -A - 58, 30) + lab(o, "Amplitude", 340, -A / 2 + 10, 30, "ink", "start") + lab(o, "Crest", -24, -A - 4, 30, "ink", "end") + lab(o, "Trough", 120, A + 50, 30);
}, [-320, -170, 860, 310], { wide: true });

reg("cos-pendulum", "Swinging pendulum", G9, ["pendulum", "swing", "gravity", "oscillation", "physics", "time", "clock"], (o) => {
  const px = 0, py = -190, len = 190, bob = (a) => P(len, 90 + a, px, py);
  let s = L.stroke(L.arc(px, py, len, 52, 128), { w: "detail", dash: "6 8", op: 0.55 });
  const [gx, gy] = bob(36); s += L.stroke(L.poly([[px, py], [gx, gy]]), { w: "detail", op: 0.3 }) + L.shape(L.circ(gx, gy, 26), "gray", { w: "detail", op: 0.3 });
  const [bx, by] = bob(-36);
  s += L.stroke(L.poly([[px, py], [px, py + len + 30]]), { w: "hair", dash: "5 6", op: 0.5 }) + L.stroke(L.poly([[px, py], [bx, by]]), { w: "prop" }) + sph(bx, by, 26, "red", "") + L.stroke(L.arc(px, py, 60, 90, 126), { w: "detail" });
  s += L.shape(L.rrect(-110, -226, 220, 20, 6), "wood", { w: "prop" }) + tube("M-90 -206 V-80 M90 -206 V-80", "wood", 8) + dot(px, py, 7, "gray", 1);
  return s + lab(o, "θ", 28, py + 92, 30, "ink");
}, [-170, -245, 340, 300]);

reg("cos-newtons-cradle", "Newton's cradle", G9, ["newton's cradle", "momentum", "collision", "swing", "balls", "physics", "energy"], () => {
  let s = L.shape(L.rrect(-210, 108, 420, 16, 6), "wood", { w: "prop" }) + L.shape(L.rrect(-200, -112, 12, 220, 4), "gray", { w: "detail" }) + L.shape(L.rrect(188, -112, 12, 220, 4), "gray", { w: "detail" }) + L.shape(L.rrect(-206, -118, 412, 14, 6), "gray", { w: "prop" });
  [-88, -44, 0, 44, 88].forEach((x, i) => {
    const ang = i === 0 ? 24 * D2R : 0, bx = x - 180 * Math.sin(ang), by = -104 + 180 * Math.cos(ang);
    s += L.stroke(L.poly([[x - 14, -104], [bx, by]]), { w: "hair" }) + L.stroke(L.poly([[x + 14, -104], [bx, by]]), { w: "hair" }) + sph(bx, by, 22, "gray", "");
  });
  return s;
}, [-220, -130, 440, 260]);

reg("cos-ramp-forces", "Box on a ramp with forces", G9, ["forces", "ramp", "inclined plane", "gravity", "friction", "normal force", "physics", "diagram"], (o) => {
  const t = 24 * D2R, sx = Math.cos(t), sy = -Math.sin(t), cx = 8, cy = -16;
  let s = L.shape("M-190 100 L190 100 L190 -66 Z", "stone", { w: "prop" }) + L.g(L.shape(L.rrect(-30, -30, 60, 60, 6), "wood", { w: "prop" }) + L.stroke("M-24 -24 L24 24 M24 -24 L-24 24", { c: "wood", w: 3, op: 0 }) + fl("M-30 -30 H30 V-18 H-30 Z", "white", 0, 0.25), `translate(${cx} ${cy}) rotate(-24)`);
  s += arrow([[cx, cy], [cx, cy + 90]], "red", "prop", 16) + arrow([[cx, cy], [cx - 0.407 * 90, cy - 0.913 * 90]], "green", "prop", 16) + arrow([[cx, cy], [cx - sx * 80, cy - sy * 80]], "orange", "prop", 16);
  return s + lab(o, "Gravity", cx + 26, cy + 106, 30, "ink", "start") + lab(o, "Support", cx - 40, cy - 96, 30, "ink", "end") + lab(o, "Friction", cx - 80, cy + 8, 30, "ink", "end");
}, [-250, -150, 470, 270]);

reg("cos-pulley", "Pulley lifting a weight", G9, ["pulley", "rope", "weight", "simple machine", "lift", "physics", "force"], (o) => {
  let s = L.shape(L.rrect(-120, -178, 240, 16, 6), "gray", { w: "prop" }) + tube("M0 -162 V-136", "gray", 6);
  s += L.stroke("M-38 -100 V60 M38 -100 V0", { c: "wood", w: 5 }) + L.stroke(L.arc(0, -100, 38, 180, 360), { c: "wood", w: 5 });
  s += L.shape(L.circ(0, -100, 38), "gray", { w: "prop" }) + L.shape(L.circ(0, -100, 14), "white", { w: "detail" }) + dot(0, -100, 4, "ink");
  s += L.shape(L.rrect(-76, 56, 76, 76, 8), "stone", { w: "prop" }) + L.text("10", -38, 108, { size: 36 }) + L.shape(L.rrect(16, 0, 44, 44, 6), "stone", { w: "prop" }) + L.text("2", 38, 34, { size: 30 });
  s += arrow([[-90, 70], [-90, 130]], "red", "prop", 14) + arrow([[80, 40], [80, -20]], "green", "prop", 14);
  return s;
}, [-150, -190, 300, 330]);

reg("cos-gear-train", "Three meshing gears", G9, ["gears", "cogs", "machine", "rotation", "mechanism", "physics", "teeth"], () => {
  const gear = (cx, cy, R, n, c, rot) => {
    const w = (2 * Math.PI) / n, ri = R * 0.8, pts = [];
    for (let i = 0; i < n; i++) { const a = i * w + rot * D2R; [[ri, -0.3], [R, -0.17], [R, 0.17], [ri, 0.3]].forEach(([r, k]) => pts.push([cx + r * Math.cos(a + k * w), cy + r * Math.sin(a + k * w)])); }
    return L.shape(L.poly(pts, true) + L.circ(cx, cy, R * 0.28), c, { w: "prop" }) + L.stroke(L.circ(cx, cy, R * 0.6), { w: "detail", op: 0.4 });
  };
  const turn = (cx, cy, r, cw) => arrow(L.arcPts(cx, cy, r, cw ? -140 : -40, cw ? -40 : -140, 8), "ink", "detail", 12);
  return gear(-92, 10, 52, 10, "orange", 0) + gear(0, 10, 40, 8, "blue", 22.5) + gear(88, 10, 48, 10, "green", 18) + turn(-92, 10, 70, true) + turn(0, 10, 58, false) + turn(88, 10, 66, true);
}, [-170, -100, 340, 220]);

reg("cos-emc2-card", "E = mc² on a blackboard", G9, ["e=mc2", "einstein-like", "relativity", "equation", "blackboard", "energy", "mass", "formula"], () => {
  const board = L.rrect(-184, -104, 368, 208, 14);
  return L.shape(L.rrect(-200, -120, 400, 240, 22), "wood", { w: "prop" }) + L.shape(board, "navy", { w: "detail", flat: true }) + L.text("E = mc²", 0, 30, { size: 84, c: "white" }) +
    L.stroke("M-150 70 H150", { c: "white", w: 4, op: 0.35 }) + spark(-148, -66, 12, "yellow", 1) + spark(150, -70, 9, "yellow", 1) + L.shape(L.rrect(-60, 120, 120, 12, 4), "wood", { w: "detail", tone: 2 });
}, [-210, -130, 420, 275]);

reg("cos-thermometer-space", "Thermometer of space temperatures", G9, ["thermometer", "temperature", "hot", "cold", "sun", "deep space", "absolute zero", "scale"], (o) => {
  let s = L.shape(L.rrect(-24, -250, 48, 420, 24), "glass", { w: "prop" }) + L.shape(L.circ(0, 186, 42), "glass", { w: "prop" }) + L.shape(L.circ(0, 186, 32), "red", { w: "detail" }) + L.shape(L.rrect(-9, -210, 18, 400, 9), "red", { w: "detail" }) + fl(L.rrect(-17, -236, 8, 280, 4), "white", 0, 0.6);
  [[-200, "Sun's surface", "5,500 °C"], [-90, "Boiling water", "100 °C"], [0, "Room", "20 °C"], [90, "Ice", "0 °C"], [168, "Deep space", "−270 °C"]].forEach(([y, a, b]) => {
    s += L.stroke(L.poly([[26, y], [60, y]]), { w: "prop" }) + dot(60, y, 6, "ink") + lab(o, a, 74, y - 4, 26, "ink", "start") + lab(o, b, 74, y + 28, 26, "red", "start");
  });
  return s;
}, [-70, -270, 400, 530]);

})();
