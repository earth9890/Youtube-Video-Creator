// ===================== library/science.js — science explainer diagrams (category "science") =====================
// Friendly labelled diagrams for explainer videos. Every label goes through L.text and can be switched off with
// o.labels === false (the drawing then works as a plain illustration). Colours/widths come from the L tokens only.
(function () {
const L = window.L, f1 = L.f1;

// ---------- helpers ----------
const D2R = Math.PI / 180, P = (r, a, cx = 0, cy = 0) => [cx + r * Math.cos(a * D2R), cy + r * Math.sin(a * D2R)];
let nid = 0;
const clip = (d, inner) => { const id = "scc" + ++nid; return `<clipPath id="${id}"><path d="${d}"/></clipPath><g clip-path="url(#${id})">${inner}</g>`; };
const fl = (d, c, tone = 0, op) => L.tag("path", { d, fill: L.c(c, tone), opacity: op }); // flat fill in any tone, no outline
const pt = (v) => `${f1(v[0])} ${f1(v[1])}`;
const lab = (o, s, x, y, size = 28, c, anchor) => (o.labels === false ? "" : L.text(s, x, y, { size, c, anchor, halo: c === "white" ? "navy" : "paper", haloW: 0.2 }));
const card = (x, y, w, h, c = "paper") => L.shape(L.rrect(x, y, w, h, 30), c, { w: "prop", flat: true });
const cardD = (x, y, w, h) => L.rrect(x, y, w, h, 30);
const dot = (x, y, r = 6, c = "ink") => L.shape(L.circ(x, y, r), c, { w: "detail", flat: true });
const arrow = (pts, c = "ink", w = "prop", hs = 18) => {
  const a = pts[pts.length - 2], b = pts[pts.length - 1], ang = Math.atan2(b[1] - a[1], b[0] - a[0]);
  const h = (d) => [b[0] - hs * Math.cos(ang + d), b[1] - hs * Math.sin(ang + d)];
  return L.stroke(pts.length > 2 ? L.smooth(pts) : L.poly(pts), { c, w }) + L.stroke(L.poly([h(0.5), b, h(-0.5)]), { c, w });
};
const leader = (o, x1, y1, x2, y2) => (o.labels === false ? "" : L.stroke(L.poly([[x1, y1], [x2, y2]]), { w: "detail" }) + dot(x1, y1, 5));
// one outlined cloud/blob from overlapping circles [x, y, r]: single outer outline, each puff shaded on its own
const puff = (cs, c = "white") =>
  cs.map(([x, y, r]) => L.shape(L.circ(x, y, r), c, { w: "prop", flat: true })).join("") +
  cs.map(([x, y, r]) => L.tag("path", { d: L.circ(x, y, Math.max(r - L.lw("prop") / 2 + 0.5, 1)), fill: L.paint(c) })).join("");
// place another library asset: fitted by its gallery box into a square of `size`, centred on (cx, cy)
const fit = (name, cx, cy, size, o = {}) => {
  const b = L.get(name).box, k = size / Math.max(b[2], b[3]);
  return L.g(L.inline(name, o), `translate(${f1(cx)} ${f1(cy)}) scale(${k.toFixed(3)}) translate(${-(b[0] + b[2] / 2)} ${-(b[1] + b[3] / 2)})`);
};
// standing asset (origin = ground): scaled so its box's longest side is `size`, feet at (cx, gy)
const stand = (name, cx, gy, size, o = {}) => {
  const b = L.get(name).box, k = size / Math.max(b[2], b[3]);
  return L.g(L.inline(name, o), `translate(${f1(cx)} ${f1(gy)}) scale(${k.toFixed(3)})`);
};
// ring sector (r0 = 0 gives a pie slice), angles in degrees, clockwise on screen
const sector = (cx, cy, r0, r1, a0, a1) => {
  const A = P(r1, a0, cx, cy), B = P(r1, a1, cx, cy), C = P(r0, a1, cx, cy), E = P(r0, a0, cx, cy), big = a1 - a0 > 180 ? 1 : 0;
  return `M${pt(A)} A${r1} ${r1} 0 ${big} 1 ${pt(B)} L${pt(C)}` + (r0 > 0 ? ` A${r0} ${r0} 0 ${big} 0 ${pt(E)} Z` : " Z");
};
const sunIcon = (x, y, r, n = 10) => {
  let s = "";
  for (let i = 0; i < n; i++) s += L.stroke(L.poly([P(r * 1.3, i * (360 / n), x, y), P(r * 1.7, i * (360 / n), x, y)]), { c: "orange", w: "prop" });
  return s + L.shape(L.circ(x, y, r), "yellow", { w: "prop" });
};
const leaf = (bx, by, ang, len, wid, c = "green") =>
  L.g(L.shape(`M0 0 C${f1(len * 0.3)} ${f1(-wid)} ${f1(len * 0.8)} ${f1(-wid * 0.9)} ${len} 0 C${f1(len * 0.8)} ${f1(wid * 0.9)} ${f1(len * 0.3)} ${f1(wid)} 0 0 Z`, c, { w: "prop" }) + L.stroke(`M0 0 L${f1(len * 0.85)} 0`, { c: "ink", w: "detail", op: 0.5 }), `translate(${bx} ${by}) rotate(${ang})`);
// a ball with a highlight (atoms, planets)
const ball = (x, y, r, c) => L.shape(L.circ(x, y, r), c, { w: "prop" }) + fl(L.circ(x - r * 0.32, y - r * 0.38, r * 0.22, r * 0.14), "white", 0, 0.55);
// blobby continent outlines relative to a globe radius
const LAND = [
  [[-0.5, -0.5], [-0.2, -0.68], [0.12, -0.5], [0.02, -0.2], [-0.22, -0.06], [-0.5, -0.18], [-0.5, -0.5]],
  [[0.2, 0.0], [0.5, -0.18], [0.7, 0.1], [0.5, 0.42], [0.26, 0.3], [0.2, 0.0]],
  [[-0.55, 0.22], [-0.2, 0.16], [-0.12, 0.5], [-0.34, 0.74], [-0.55, 0.52], [-0.55, 0.22]],
];
// Earth: ocean sphere + land; `night` = degrees to rotate the dark half (0 = right half dark), undefined = no night side
const globe = (cx, cy, r, night, tilt) => {
  let s = "";
  if (tilt !== undefined) s += L.stroke(L.poly([P(r * 1.55, -90 + tilt, cx, cy), P(r * 1.55, 90 + tilt, cx, cy)]), { c: "white", w: "prop" });
  s += L.shape(L.circ(cx, cy, r), "water", { w: "prop" });
  s += clip(L.circ(cx, cy, r), LAND.map((p) => L.shape(L.smooth(p.map(([x, y]) => [cx + x * r, cy + y * r])), "grass", { w: "detail" })).join(""));
  if (night !== undefined) s += L.g(fl(`M${f1(cx)} ${f1(cy - r)} A${r} ${r} 0 0 1 ${f1(cx)} ${f1(cy + r)} Z`, "navy", 0, 0.6), `rotate(${f1(night)} ${f1(cx)} ${f1(cy)})`);
  return s + L.stroke(L.circ(cx, cy, r), { w: "prop" });
};
const reg = (name, fn, meta) => L.reg("science", name, fn, meta);
const call = (name, extra = "") => `L.put(S, "${name}", x, y, { s: 1, t${extra} })`;

// ===================== Earth and space =====================
reg("sci-earth-layers", (o) => {
  const cx = -70, cy = 10, R = 170, pie = sector(cx, cy, 0, R, 0, 270);
  let s = L.shape(pie, "water", { w: "prop" });
  s += clip(pie, LAND.map((p) => L.shape(L.smooth(p.map(([x, y]) => [cx + x * R * 1.1, cy + y * R * 1.1 + 12])), "grass", { w: "detail" })).join(""));
  s += L.stroke(pie, { w: "prop" });
  const rings = [[R - 15, R, "earth"], [105, R - 15, "lava"], [58, 105, "orange"], [0, 58, "yellow"]];
  rings.forEach(([r0, r1, c]) => (s += L.shape(sector(cx, cy, r0, r1, -90, 0), c, { w: "prop" })));
  [["Crust", 163, -75], ["Mantle", 130, -55], ["Outer core", 82, -35], ["Inner core", 29, -15]].forEach(([t, r, a]) => {
    const p = P(r, a, cx, cy);
    s += leader(o, p[0], p[1], 125, p[1]) + lab(o, t, 135, p[1] + 10, 30, "ink", "start");
  });
  return s;
}, { box: [-300, -220, 620, 440], group: "Earth & space", label: "Earth layers", tags: ["geology", "crust", "mantle", "core", "cross-section", "planet"], call: call("sci-earth-layers", ", labels: false") });

reg("sci-water-cycle", (o) => {
  const slopeY = (x) => { const m = [[-40, 150], [30, 125], [95, 70], [150, 20], [200, -30], [235, 10], [270, 60], [330, 100]]; for (let i = 0; i < m.length - 1; i++) if (x >= m[i][0] && x <= m[i + 1][0]) return m[i][1] + ((m[i + 1][1] - m[i][1]) * (x - m[i][0])) / (m[i + 1][0] - m[i][0]); return 150; };
  let inner = "";
  inner += fl(L.rect(-340, 150, 680, 100), "water", 0);
  inner += L.shape("M-340 150 C-300 138 -270 162 -230 150 S-150 138 -110 150 S-50 162 -20 150 L-20 240 L-340 240 Z", "water", { w: "prop" });
  [[-300, 215], [-230, 225], [-120, 215], [-70, 190]].forEach(([x, y]) => (inner += L.stroke(`M${x - 22} ${y} Q${x - 11} ${y - 10} ${x} ${y} T${x + 22} ${y}`, { c: "white", w: "detail" })));
  inner += L.shape("M-40 240 L-40 150 L30 125 L95 70 L150 20 L200 -30 L235 10 L270 60 L330 100 L330 240 Z", "stone", { w: "prop" });
  inner += L.shape("M200 -30 L222 -6 L210 -12 L200 2 L189 -10 L177 -4 Z", "snow", { w: "detail" });
  [250, 278, 306].forEach((x) => { const y = slopeY(x) + 6; inner += L.shape(L.poly([[x, y - 32], [x + 15, y], [x - 15, y]], true), "green", { w: "detail" }); });
  // river back to the sea
  inner += arrow([[120, 50], [70, 100], [20, 140], [-15, 160]], "water");
  // evaporation (big arrow + two wavy ones), rain
  inner += arrow([[-120, 118], [-135, 60], [-105, 0], [-55, -55], [-5, -100]], "orange");
  [-235, -190].forEach((x) => (inner += arrow([[x, 120], [x - 12, 85], [x + 10, 50], [x - 8, 15]], "orange", "detail", 12)));
  inner += sunIcon(-255, -160, 36, 10);
  inner += puff([[35, -120, 38], [80, -142, 48], [135, -122, 40], [60, -100, 36], [110, -100, 36]]);
  [[55, -62], [85, -62], [115, -62], [70, -40], [100, -40]].forEach(([x, y]) => (inner += L.stroke(L.poly([[x, y], [x - 8, y + 20]]), { c: "water", w: "prop" })));
  const w = clip(cardD(-330, -230, 660, 460), inner);
  let s = card(-330, -230, 660, 460, "sky") + w + L.stroke(cardD(-330, -230, 660, 460), { w: "prop" });
  s += lab(o, "Evaporation", -215, -10, 26) + lab(o, "Condensation", 85, -190, 26) + lab(o, "Precipitation", 232, -75, 26) + lab(o, "Collection", -175, 190, 26);
  return s;
}, { box: [-340, -240, 680, 480], group: "Earth & space", label: "Water cycle", tags: ["rain", "evaporation", "condensation", "clouds", "weather", "geography"], call: call("sci-water-cycle", ", labels: false") });

reg("sci-solar-system-lineup", (o) => {
  let s = card(-630, -165, 1260, 330, "navy");
  const r = L.rng(7);
  for (let i = 0; i < 40; i++) s += fl(L.circ(-620 + r() * 1240, -150 + r() * 270, 1.5 + r() * 2), "white", 0, 0.7);
  s += L.shape(L.circ(-505, -10, 100), "yellow", { w: "prop" }) + fl(L.circ(-540, -45, 28, 20), "white", 0, 0.4);
  s += lab(o, "Sun", -505, 135, 26, "white");
  const planet = (x, rr, c, extra = "", name) => {
    let p = extra && extra.back ? extra.back : "";
    p += L.shape(L.circ(x, -10, rr), c, { w: "prop" });
    if (extra && extra.inner) p += clip(L.circ(x, -10, rr), extra.inner);
    p += L.stroke(L.circ(x, -10, rr), { w: "prop" });
    if (extra && extra.front) p += extra.front;
    return p + lab(o, name, x, 100, 24, "white");
  };
  const band = (x, rr, ys, c, tone = 0) => ys.map((y) => fl(L.rect(x - rr, -10 + y * rr, rr * 2, rr * 0.22), c, tone, 0.8)).join("");
  s += planet(-360, 14, "gray", 0, "Mercury");
  s += planet(-255, 24, "cream", { inner: band(-255, 24, [-0.3, 0.2], "gold") }, "Venus");
  s += planet(-150, 26, "water", { inner: LAND.map((p) => L.shape(L.smooth(p.map(([x, y]) => [-150 + x * 26, -10 + y * 26])), "grass", { w: "detail" })).join("") }, "Earth");
  s += planet(-50, 18, "red", 0, "Mars");
  s += planet(60, 60, "orange", { inner: band(60, 60, [-0.6, -0.15, 0.3], "earth", 1) + L.tag("ellipse", { cx: 85, cy: 20, rx: 14, ry: 8, fill: L.c("red", 1), opacity: 0.8 }) }, "Jupiter");
  const ringA = `M${215 - 82} -10 A82 20 0 0 1 ${215 + 82} -10`, ringB = `M${215 - 82} -10 A82 20 0 0 0 ${215 + 82} -10`;
  s += planet(215, 44, "gold", { back: L.g(L.stroke(ringA, { c: "sand", w: "prop" }), "rotate(-14 215 -10)"), inner: band(215, 44, [-0.5, 0, 0.45], "earth", 1), front: L.g(L.stroke(ringB, { c: "sand", w: "prop" }), "rotate(-14 215 -10)") }, "Saturn");
  s += planet(350, 30, "teal", 0, "Uranus");
  s += planet(480, 30, "blue", 0, "Neptune");
  s += lab(o, "sizes and distances not to scale", 300, 145, 22, "white");
  return s;
}, { box: [-640, -175, 1280, 350], group: "Earth & space", wide: true, label: "Solar system line-up", tags: ["planets", "sun", "astronomy", "labelled", "space"], call: call("sci-solar-system-lineup", ", labels: false") });

reg("sci-day-night-globe", (o) => {
  let s = card(-340, -190, 680, 380, "navy");
  const r = L.rng(3);
  for (let i = 0; i < 18; i++) s += fl(L.circ(120 + r() * 200, -170 + r() * 340, 1.6 + r() * 2), "white", 0, 0.7);
  [-90, -45, 0, 45, 90].forEach((y) => (s += L.stroke(L.poly([[-170, y], [100 - Math.sqrt(110 * 110 - y * y) - 10, y]]), { c: "yellow", w: "detail", dash: "14 10" })));
  s += L.shape(L.circ(-265, 0, 66), "yellow", { w: "prop" });
  s += globe(105, 0, 110, 0, 23);
  s += lab(o, "Sun", -265, 105, 28, "white") + lab(o, "Day", 40, 10, 30) + lab(o, "Night", 168, 10, 30, "white") + lab(o, "Earth spins once a day", -60, 172, 24, "white");
  return s + L.stroke(cardD(-340, -190, 680, 380), { w: "prop" });
}, { box: [-350, -200, 700, 400], group: "Earth & space", label: "Day and night", tags: ["globe", "sun", "rotation", "earth", "light"], call: call("sci-day-night-globe", ", labels: false") });

reg("sci-seasons", (o) => {
  const sx = 0, sy = 10, rx = 270, ry = 125;
  let s = card(-370, -245, 740, 490, "navy");
  const r = L.rng(11);
  for (let i = 0; i < 26; i++) { const x = -350 + r() * 700, y = -225 + r() * 450; if (Math.abs(x) < 380 && (Math.abs(y - sy) > ry + 70 || Math.abs(x) > rx + 70)) s += fl(L.circ(x, y, 1.6 + r() * 1.8), "white", 0, 0.7); }
  s += L.stroke(L.circ(sx, sy, rx, ry), { c: "white", w: "detail", dash: "16 12" });
  s += arrow([[-240, 56], [-210, 85], [-160, 108], [-110, 120]], "yellow", "prop", 16);
  s += L.shape(L.circ(sx, sy, 56), "yellow", { w: "prop" }) + lab(o, "Sun", sx, sy + 10, 28);
  [["Summer", -rx, sy, 92], ["Autumn", 0, sy + ry, 225], ["Winter", rx, sy, 92], ["Spring", 0, sy - ry, -190]].forEach(([t, ex, ey, ly]) => {
    const away = Math.atan2(-(sy - ey), -(sx - ex)) / D2R;
    s += globe(ex, ey, 34, ex === 0 && ey === sy ? 0 : away, 23) + lab(o, t, ex, ly, 28, "white");
  });
  s += lab(o, "northern hemisphere", -345, -210, 22, "white", "start");
  return s + L.stroke(cardD(-370, -245, 740, 490), { w: "prop" });
}, { box: [-380, -255, 760, 510], group: "Earth & space", label: "Seasons (tilted orbit)", tags: ["earth", "orbit", "tilt", "summer", "winter", "spring", "autumn", "sun"], call: call("sci-seasons", ", labels: false") });

reg("sci-gravity-well", (o) => {
  const dep = (r) => 130 / (1 + (r / 55) ** 2), proj = (r, a) => [r * Math.cos(a * D2R), -50 + 0.36 * r * Math.sin(a * D2R) + dep(r)];
  const ring = (r) => L.smooth(Array.from({ length: 25 }, (_, i) => proj(r, i * 15)));
  let s = card(-300, -195, 600, 405);
  let g = fl(ring(250), "blue", 0, 0.14);
  [30, 60, 95, 135, 185, 250].forEach((r) => (g += L.stroke(ring(r), { c: "blue", w: "detail" })));
  for (let a = 0; a < 360; a += 30) g += L.stroke(L.smooth([250, 200, 150, 115, 85, 62, 45, 32, 24].map((r) => proj(r, a))), { c: "blue", w: "detail" });
  g += L.stroke(ring(190), { c: "red", w: "detail", dash: "12 10" });
  const m = proj(190, 205);
  g += ball(0, 44, 38, "orange") + ball(m[0], m[1] - 15, 15, "purple");
  g += leader(o, 30, 55, 140, 85) + lab(o, "Heavy star", 140, 95, 26, "ink", "start");
  g += leader(o, m[0] - 10, m[1] - 20, -200, -145) + lab(o, "Planet", -250, -150, 28);
  s += L.g(g, "translate(0 28)");
  s += lab(o, "mass bends space like a stretchy sheet", 0, 192, 24);
  return s;
}, { box: [-310, -205, 620, 425], group: "Earth & space", label: "Gravity well", tags: ["gravity", "spacetime", "sheet", "orbit", "mass", "einstein"], call: call("sci-gravity-well", ", labels: false") });

reg("sci-atmosphere-layers", (o) => {
  const x0 = -150, w = 380, L5 = [["Exosphere", -230, 80, "navy", 0, "600+ km"], ["Thermosphere", -150, 80, "blue", 0, "85 km"], ["Mesosphere", -70, 80, "blue", 1, "50 km"], ["Stratosphere", 10, 80, "sky", 0, "12 km"], ["Troposphere", 90, 100, "sky", 1, "0 km"]];
  let s = "";
  L5.forEach(([n, y, h, c, tone]) => (s += L.shape(L.rect(x0, y, w, h), c, { w: "prop", tone, dir: "v" })));
  // icons
  s += L.shape(L.rrect(135, -198, 30, 18, 4), "gold", { w: "detail" }) + L.shape(L.rect(98, -194, 30, 10), "blue", { w: "detail" }) + L.shape(L.rect(172, -194, 30, 10), "blue", { w: "detail" });
  s += fl("M70 -105 C100 -135 130 -85 160 -110 C175 -122 195 -100 205 -115 L205 -92 C190 -80 170 -100 155 -88 C125 -66 100 -118 70 -85 Z", "green", 0, 0.8);
  s += L.shape(L.poly([[190, -50], [130, -12], [185, -34]], true), "paper", { w: "detail", flat: true }) + L.shape(L.circ(193, -52, 8), "yellow", { w: "detail" });
  s += L.stroke(L.poly([[120, 62], [120, 80]]), { w: "detail" }) + L.shape(L.rect(112, 78, 16, 10), "wood", { w: "detail" }) + L.shape(L.circ(120, 42, 22, 26), "red", { w: "detail" });
  s += L.shape(L.poly([[150, 190], [190, 135], [228, 190]], true), "stone", { w: "prop" }) + L.shape(L.poly([[190, 135], [201, 154], [190, 148], [179, 156]], true), "snow", { w: "detail" });
  s += puff([[60, 150, 18], [85, 140, 24], [112, 152, 18]]);
  s += L.shape(L.rrect(140, 100, 70, 20, 10), "white", { w: "detail" }) + L.shape(L.poly([[170, 108], [155, 90], [190, 108]], true), "gray", { w: "detail" }) + L.shape(L.poly([[150, 120], [140, 128], [162, 120]], true), "gray", { w: "detail" });
  s += L.shape(L.rect(x0, 190, w, 24), "grass", { w: "prop" });
  L5.forEach(([n, y, h, c, tone, alt]) => (s += lab(o, n, x0 + 12, y + 40 + (n === "Troposphere" ? 25 : 0), 28, "ink", "start") + lab(o, alt, x0 - 12, y + h + 8, 22, "ink", "end")));
  s += lab(o, "altitude", x0 - 12, -245, 22, "ink", "end");
  return s;
}, { box: [-330, -260, 620, 490], group: "Earth & space", label: "Layers of the atmosphere", tags: ["sky", "troposphere", "stratosphere", "ozone", "weather", "altitude"], call: call("sci-atmosphere-layers", ", labels: false") });

// ===================== Earth science =====================
reg("sci-volcano", (o) => {
  let inner = fl(L.rect(-340, 60, 680, 190), "earth", 0);
  inner += fl("M-340 105 C-200 90 -100 120 40 105 S260 90 340 110 L340 128 C240 112 140 138 20 125 S-220 112 -340 126 Z", "sand", 0, 0.9);
  inner += fl("M-340 175 C-220 160 -80 190 60 175 S250 165 340 180 L340 200 C240 188 130 205 40 195 S-230 182 -340 198 Z", "earth", 2, 0.6);
  inner += L.shape("M-290 60 L-205 15 L-125 -40 L-62 -108 L-30 -92 L30 -92 L62 -108 L125 -40 L205 15 L290 60 Z", "brown", { w: "prop" });
  // lava flow on the right slope, vent and chamber
  inner += L.shape("M40 -96 L62 -106 L100 -62 L128 -38 L160 -14 L150 -2 L118 -20 L84 -44 L48 -78 Z", "lava", { w: "detail" });
  inner += L.shape("M-24 -96 L24 -96 L30 140 L-30 140 Z", "lava", { w: "prop" });
  inner += L.shape(L.smooth([[-110, 168], [-80, 120], [-20, 108], [60, 112], [110, 140], [90, 188], [20, 205], [-70, 200], [-110, 168]]), "lava", { w: "prop" });
  [[-50, 160, 10], [10, 150, 14], [55, 170, 9], [-5, 185, 8]].forEach(([x, y, r]) => (inner += fl(L.circ(x, y, r), "yellow", 0, 0.8)));
  inner += puff([[-35, -145, 36], [10, -170, 46], [62, -150, 38], [-5, -125, 32]], "gray");
  inner += L.shape(L.poly([[-4, -92], [14, -128], [-12, -118]], true), "orange", { w: "detail" });
  let s = card(-320, -230, 640, 460, "sky") + clip(cardD(-320, -230, 640, 460), inner) + L.stroke(cardD(-320, -230, 640, 460), { w: "prop" });
  s += leader(o, -48, -96, -200, -140) + lab(o, "Crater", -235, -145, 26);
  s += leader(o, 40, -150, 190, -185) + lab(o, "Ash cloud", 235, -190, 26);
  s += leader(o, 130, -30, 215, -60) + lab(o, "Lava flow", 255, -70, 26);
  s += leader(o, -6, 10, -190, 20) + lab(o, "Vent", -215, 30, 26);
  s += leader(o, -60, 170, -170, 195) + lab(o, "Magma chamber", -190, 215, 24, "ink", "middle");
  return s;
}, { box: [-330, -240, 660, 480], group: "Earth & space", label: "Volcano cross-section", tags: ["lava", "magma", "eruption", "geology", "crater"], call: call("sci-volcano", ", labels: false") });

reg("sci-tectonic-plates", (o) => {
  let inner = fl(L.rect(-340, 20, 680, 230), "orange", 0);
  inner += fl("M-340 160 C-250 140 -170 190 -60 170 S150 215 340 190 L340 250 L-340 250 Z", "lava", 0, 0.55);
  inner += fl(L.rect(-340, -240, 680, 100), "sky", 1, 0);
  inner += fl("M-340 -30 L24 -30 L-30 40 L-340 40 Z", "water", 0);
  inner += L.stroke("M-330 -20 Q-310 -30 -290 -20 T-250 -20", { c: "white", w: "detail" });
  // continental plate (right) with mountains, oceanic plate dives under it
  inner += L.shape("M-30 10 L20 -20 L48 -95 L72 -45 L110 -112 L142 -40 L190 -22 L340 -14 L340 108 L150 108 L60 60 Z", "earth", { w: "prop" });
  inner += L.shape(L.poly([[48, -95], [60, -72], [50, -78], [40, -70]], true), "snow", { w: "detail" }) + L.shape(L.poly([[110, -112], [124, -84], [112, -92], [100, -84]], true), "snow", { w: "detail" });
  inner += L.shape(L.limb([[-345, 18], [-210, 20], [-90, 28], [-25, 52], [35, 96], [100, 150], [150, 205]], 40, 40), "stone", { w: "prop" });
  inner += arrow([[-300, 20], [-200, 20]], "white", "prop", 16) + arrow([[300, 40], [210, 40]], "white", "prop", 16);
  inner += arrow([[-60, 140], [-40, 120]], "yellow", "detail", 12);
  let s = card(-330, -220, 660, 440, "sky") + clip(cardD(-330, -220, 660, 440), inner) + L.stroke(cardD(-330, -220, 660, 440), { w: "prop" });
  s += lab(o, "Ocean plate", -200, 78, 26) + lab(o, "Continental plate", 200, 78, 24) + lab(o, "Hot mantle", -120, 165, 26) + lab(o, "Mountains rise", 40, -150, 26);
  s += lab(o, "plates push together", -170, -110, 24);
  return s;
}, { box: [-340, -230, 680, 460], group: "Earth & space", label: "Tectonic plates colliding", tags: ["earthquake", "mountains", "subduction", "geology", "crust", "mantle"], call: call("sci-tectonic-plates", ", labels: false") });

// ===================== Life =====================
reg("sci-food-chain", (o) => {
  const gy = 70, xs = [-300, -150, 0, 150, 300];
  let inner = fl(L.rect(-390, gy - 10, 780, 200), "grass", 0) + fl(L.rect(-390, gy - 10, 780, 30), "grass", 1, 0.7);
  let s = card(-380, -125, 760, 315, "sky") + clip(cardD(-380, -125, 760, 315), inner);
  // grass tuft
  let tuft = "";
  [-26, -12, 0, 13, 27].forEach((dx, i) => (tuft += L.shape(`M${xs[1] + dx - 7} ${gy} Q${xs[1] + dx - 4} ${gy - 28 - (i % 2) * 14} ${xs[1] + dx * 1.4} ${gy - 56 + (i % 2) * 12} Q${xs[1] + dx + 6} ${gy - 28} ${xs[1] + dx + 7} ${gy} Z`, "green", { w: "detail" })));
  s += sunIcon(xs[0], -10, 28, 10) + tuft + stand("animal-mouse", xs[2], gy, 150) + stand("animal-snake", xs[3], gy, 150) + stand("animal-owl", xs[4], gy, 150);
  for (let i = 0; i < 4; i++) s += arrow([[xs[i] + 52, -20 + (i === 3 ? -10 : 0)], [xs[i + 1] - 52, -20 + (i === 3 ? -10 : 0)]], "red", "prop", 16);
  [["Sun", "energy"], ["Grass", "producer"], ["Mouse", "eats plants"], ["Snake", "eats mice"], ["Owl", "eats snakes"]].forEach(([n, r], i) => (s += lab(o, n, xs[i], 128, 28) + lab(o, r, xs[i], 164, 20)));
  return s + L.stroke(cardD(-380, -125, 760, 315), { w: "prop" });
}, { box: [-390, -135, 780, 335], group: "Life", label: "Food chain", tags: ["ecosystem", "producer", "consumer", "predator", "prey", "biology"], call: call("sci-food-chain", ", labels: false") });

reg("sci-photosynthesis", (o) => {
  let inner = fl(L.rect(-340, 95, 680, 160), "earth", 0) + fl(L.rect(-340, 95, 680, 18), "grass", 0);
  inner += fl("M-340 190 C-200 170 -80 205 60 190 S250 180 340 195 L340 215 C240 203 120 222 40 212 S-230 200 -340 215 Z", "earth", 2, 0.5);
  // roots
  [[-8, 130, -70, 175], [8, 130, 70, 170], [0, 130, 0, 200]].forEach(([x1, y1, x2, y2]) => (inner += L.stroke(`M0 100 Q${x1} ${y1} ${x2} ${y2}`, { c: "cream", w: "prop" })));
  inner += L.stroke("M0 100 L0 -70", { c: "green", w: "char" });
  inner += leaf(0, -70, -150, 120, 36) + leaf(0, -70, -35, 120, 36) + leaf(0, 10, 165, 95, 28) + leaf(0, 10, -15, 95, 28);
  inner += sunIcon(-215, -165, 38, 10);
  let s = card(-300, -250, 600, 500, "sky") + clip(cardD(-300, -250, 600, 500), inner) + L.stroke(cardD(-300, -250, 600, 500), { w: "prop" });
  s += arrow([[-175, -135], [-100, -85]], "orange", "prop") + arrow([[-150, -155], [-65, -95]], "orange", "detail", 12);
  s += arrow([[245, -45], [165, -40], [112, -45]], "gray") + arrow([[95, -95], [150, -135], [225, -170]], "blue");
  s += arrow([[-215, 155], [-130, 160], [-60, 150]], "water") + arrow([[32, -20], [32, 70]], "gold");
  s += lab(o, "Sunlight", -225, -75, 28) + lab(o, "CO₂ in", 215, -12, 28) + lab(o, "O₂ out", 205, -195, 28) + lab(o, "Water", -175, 190, 28) + lab(o, "Sugar", 90, 45, 28);
  s += lab(o, "leaves make food from light", 0, -218, 24);
  return s;
}, { box: [-310, -260, 620, 520], group: "Life", label: "Photosynthesis", tags: ["plant", "sunlight", "oxygen", "carbon dioxide", "leaf", "biology"], call: call("sci-photosynthesis", ", labels: false") });

const cells = (kind) => (o) => {
  const R = 185, cy = -10, field = L.circ(0, cy, R);
  let inner = fl(field, kind === "plant" ? "cream" : "pink", 1, 1);
  const rg = L.rng(kind === "plant" ? 5 : 9);
  if (kind === "plant") {
    const hex = (cx, cy2, r) => L.poly(Array.from({ length: 6 }, (_, i) => P(r, 30 + i * 60, cx, cy2)), true);
    for (let row = -4; row <= 4; row++) for (let col = -4; col <= 4; col++) {
      const r = 52, cx = col * r * 1.73 + (row % 2) * r * 0.865, cy2 = cy + row * r * 1.5;
      if (Math.hypot(cx, cy2 - cy) > R + 40) continue;
      inner += L.shape(hex(cx, cy2, r - 3), "green", { w: "detail", tone: 1 });
      inner += fl(L.circ(cx, cy2, r * 0.42, r * 0.34), "sky", 1, 0.9);
      for (let k = 0; k < 4; k++) { const a = rg() * 360, d = r * (0.5 + rg() * 0.2); inner += fl(L.circ(cx + Math.cos(a * D2R) * d, cy2 + Math.sin(a * D2R) * d, 5, 3.5), "green", 2); }
      inner += L.shape(L.circ(cx + r * 0.35, cy2 - r * 0.1, 7), "purple", { w: "detail" });
    }
  } else {
    [[-85, -95, 60], [60, -100, 52], [-110, 25, 55], [20, -5, 62], [120, 50, 56], [-30, 120, 54], [75, 140, 42], [-170, -30, 34], [150, -30, 34]].forEach(([x, y, r]) => {
      const pts = Array.from({ length: 11 }, (_, i) => P(r * (0.88 + rg() * 0.22), i * (360 / 10), x, y + cy)); pts[10] = pts[0];
      inner += L.shape(L.smooth(pts), "pink", { w: "prop" });
      inner += L.shape(L.circ(x + r * 0.08, y + cy - r * 0.05, r * 0.36), "purple", { w: "detail" });
      for (let k = 0; k < 3; k++) { const a = rg() * 360, d = r * (0.5 + rg() * 0.2); inner += fl(L.circ(x + Math.cos(a * D2R) * d, y + cy + Math.sin(a * D2R) * d, 4), "red", 0, 0.7); }
    });
  }
  let s = L.shape(L.circ(0, cy, R + 18), "gray", { w: "prop" }) + clip(field, inner) + L.stroke(field, { w: "prop" });
  return s + lab(o, kind === "plant" ? "plant cells" : "animal cells", 0, 245, 32);
};
reg("sci-cells-animal", cells("animal"), { box: [-215, -225, 430, 500], group: "Life", label: "Cells under a microscope (animal)", tags: ["microscope", "nucleus", "biology", "view", "lens"], call: call("sci-cells-animal", ", labels: false") });
reg("sci-cells-plant", cells("plant"), { box: [-215, -225, 430, 500], group: "Life", label: "Cells under a microscope (plant)", tags: ["microscope", "chloroplast", "vacuole", "biology", "view", "lens"], call: call("sci-cells-plant", ", labels: false") });

reg("sci-scale-ladder", (o) => {
  const rs = [46, 52, 58, 66, 74, 84], xs = [-455, -290, -130, 45, 225, 425];
  let s = card(-550, -125, 1100, 330);
  const items = [["sci-atom", "Atom", "0.1 nm"], ["body-cell", "Cell", "10 µm"], ["animal-ant", "Ant", "5 mm"], ["person", "Human", "1.7 m"], ["space-planet-earth", "Earth", "12,700 km"], ["sun-simple", "Sun", "1.4 million km"]];
  items.forEach(([n, t, sz], i) => {
    s += L.shape(L.circ(xs[i], 0, rs[i]), "white", { w: "prop", flat: true });
    if (n === "person") s += L.g(L.inline("person", { style: "man01", pose: "stand", face: "smile" }), `translate(${xs[i]} ${rs[i] * 0.75}) scale(${(rs[i] * 2.2 / 480).toFixed(3)})`);
    else if (n === "animal-ant") s += stand(n, xs[i] + 4, rs[i] * 0.3, rs[i] * 1.55);
    else s += fit(n, xs[i], 0, rs[i] * (n === "sun-simple" ? 2.3 : 1.55));
    s += lab(o, t, xs[i], 128, 30) + lab(o, sz, xs[i], 163, 22);
    if (i < 5) s += arrow([[xs[i] + rs[i] + 12, 0], [xs[i + 1] - rs[i + 1] - 12, 0]], "red", "detail", 12);
  });
  return s;
}, { box: [-560, -135, 1120, 350], group: "Earth & space", wide: true, label: "Scale ladder (atom to Sun)", tags: ["size", "scale", "tiny", "huge", "comparison", "universe"], call: call("sci-scale-ladder", ", labels: false") });

// ===================== Matter =====================
reg("sci-atom-labeled", (o) => {
  const cx = -110, cy = 0, parts = [[0, 0], ...[0, 60, 120, 180, 240, 300].map((a) => P(27, a)), ...[10, 82, 154, 226, 298].map((a) => P(51, a))];
  let s = "";
  [100, 165].forEach((r) => (s += L.stroke(L.circ(cx, cy, r), { c: "gray", w: "detail", dash: "10 10" })));
  const kinds = parts.map((_, i) => (i % 2 ? "gray" : "red"));
  parts.map((p, i) => [p, i]).sort((a, b) => a[0][1] - b[0][1]).forEach(([p, i]) => (s += ball(cx + p[0], cy + p[1], 15, kinds[i])));
  [200, 20].forEach((a) => (s += ball(...[...P(100, a, cx, cy), 11, "blue"])));
  [60, 150, 240, 330].forEach((a) => (s += ball(...[...P(165, a, cx, cy), 11, "blue"])));
  const eP = P(165, 330, cx, cy), pP = [cx + parts[1][0] + 0, cy + parts[1][1]], nP = [cx + parts[2][0], cy + parts[2][1]], nuc = P(60, -35, cx, cy), sh = P(165, 8, cx, cy);
  s += leader(o, eP[0] + 8, eP[1] - 6, 120, -110) + lab(o, "Electron (−)", 130, -100, 28, "ink", "start");
  s += leader(o, cx + 51 * Math.cos(10 * D2R) + 8, cy + 51 * Math.sin(10 * D2R) - 4, 120, -30) + lab(o, "Neutron", 130, -20, 28, "ink", "start");
  s += leader(o, cx + 51 * Math.cos(82 * D2R) + 10, cy + 51 * Math.sin(82 * D2R), 120, 55) + lab(o, "Proton (+)", 130, 65, 28, "ink", "start");
  s += leader(o, sh[0], sh[1], 120, 140) + lab(o, "Electron shell", 130, 150, 28, "ink", "start");
  s += lab(o, "nucleus = protons + neutrons", cx, 215, 24);
  return s;
}, { box: [-300, -210, 650, 450], group: "Chemistry & matter", label: "Atom (Bohr model, labelled)", tags: ["bohr", "proton", "neutron", "electron", "nucleus", "shell", "physics", "chemistry"], call: call("sci-atom-labeled", ", labels: false") });

const bond = (a, b, n = 1, gap = 14) => {
  const dx = b[0] - a[0], dy = b[1] - a[1], d = Math.hypot(dx, dy), ang = Math.atan2(dy, dx) / D2R;
  let s = "";
  for (let i = 0; i < n; i++) { const off = (i - (n - 1) / 2) * gap; s += L.g(L.shape(L.rrect(0, -6 + off, d, 12, 6), "stone", { w: "detail" }), `translate(${f1(a[0])} ${f1(a[1])}) rotate(${f1(ang)})`); }
  return s;
};
const atom = (x, y, r, el) => ball(x, y, r, el === "O" ? "red" : el === "C" ? "gray" : "white") + L.text(el, x, y + r * 0.34, { size: r * 0.95, c: el === "H" ? "ink" : "white", halo: el === "H" ? undefined : "ink", haloW: 0.05 });
reg("sci-molecule-h2o", (o) => {
  const O = [0, -30], H1 = P(110, 90 - 52, ...O), H2 = P(110, 90 + 52, ...O);
  return bond(O, H1) + bond(O, H2) + atom(H1[0], H1[1], 40, "H") + atom(H2[0], H2[1], 40, "H") + atom(O[0], O[1], 66, "O") + lab(o, "H₂O · water", 0, 135, 40);
}, { box: [-190, -130, 380, 300], group: "Chemistry & matter", label: "Molecule: water (H2O)", tags: ["chemistry", "hydrogen", "oxygen", "atoms", "bond"], call: call("sci-molecule-h2o", ", labels: false") });
reg("sci-molecule-co2", (o) => {
  const C = [0, 0], A = [-150, 0], B = [150, 0];
  return bond(C, A, 2) + bond(C, B, 2) + atom(C[0], C[1], 50, "C") + atom(A[0], A[1], 58, "O") + atom(B[0], B[1], 58, "O") + lab(o, "CO₂ · carbon dioxide", 0, 118, 38);
}, { box: [-250, -100, 500, 250], group: "Chemistry & matter", label: "Molecule: carbon dioxide (CO2)", tags: ["chemistry", "carbon", "oxygen", "greenhouse", "atoms", "bond"], call: call("sci-molecule-co2", ", labels: false") });
reg("sci-molecule-o2", (o) => bond([-80, 0], [80, 0], 2) + atom(-80, 0, 58, "O") + atom(80, 0, 58, "O") + lab(o, "O₂ · oxygen", 0, 118, 40), { box: [-200, -100, 400, 250], group: "Chemistry & matter", label: "Molecule: oxygen (O2)", tags: ["chemistry", "air", "breathe", "atoms", "bond"], call: call("sci-molecule-o2", ", labels: false") });

// ===================== Light, sound, waves =====================
reg("sci-light-prism", (o) => {
  const band = ["red", "orange", "yellow", "green", "blue", "purple"], ex = [50, 40];
  let s = card(-340, -170, 680, 340, "navy");
  s += fl("M-330 12 L-39 14 L-39 26 L-330 28 Z", "white", 0, 0.95) + fl("M-39 14 L-39 26 L51 52 L51 40 Z", "white", 0, 0.7);
  band.forEach((c, i) => (s += fl(`M${pt(ex)} L320 ${50 + i * 15} L320 ${65 + i * 15} Z`, c, 0, 0.95)));
  s += L.shape(L.poly([[-80, 90], [80, 90], [0, -48]], true), "glass", { w: "prop", op: 0.75 });
  s += lab(o, "White light", -200, -15, 30, "white") + lab(o, "Prism", 0, 135, 28, "white") + lab(o, "Rainbow", 235, 15, 28, "white");
  return s + L.stroke(cardD(-340, -170, 680, 340), { w: "prop" });
}, { box: [-350, -180, 700, 360], group: "Light & sound", label: "Light split by a prism", tags: ["rainbow", "colours", "refraction", "optics", "white light", "spectrum"], call: call("sci-light-prism", ", labels: false") });

reg("sci-spectrum-bar", (o) => {
  const cols = ["red", "orange", "yellow", "green", "blue", "purple"], names = ["Red", "Orange", "Yellow", "Green", "Blue", "Violet"], w = 100, x0 = -300, bar = L.rrect(-300, -15, 600, 60, 20);
  let s = card(-340, -115, 680, 240), seg = "";
  cols.forEach((c, i) => (seg += L.shape(L.rect(x0 + i * w, -15, w, 60), c, { w: "detail", flat: true })));
  s += clip(bar, seg) + L.stroke(bar, { w: "prop" });
  const pts = []; let ph = 0;
  for (let x = -300; x <= 300; x += 4) { ph += (0.05 + 0.13 * ((x + 300) / 600)); pts.push([x, -62 + 18 * Math.sin(ph)]); }
  s += L.stroke(L.smooth(pts), { c: "ink", w: "prop" });
  names.forEach((n, i) => (s += lab(o, n, x0 + i * w + w / 2, 80, 24)));
  s += lab(o, "long waves · 700 nm", -300, 112, 22, "ink", "start") + lab(o, "400 nm · short waves", 300, 112, 22, "ink", "end");
  return s;
}, { box: [-350, -125, 700, 260], group: "Light & sound", label: "Visible light spectrum", tags: ["rainbow", "colours", "wavelength", "optics", "red", "violet"], call: call("sci-spectrum-bar", ", labels: false") });

reg("sci-sound-vs-light", (o) => {
  let s = card(-330, -225, 660, 450);
  // sound: air squeezed and stretched
  s += L.shape(L.rect(-300, -155, 20, 60), "gray", { w: "detail" }) + L.shape(L.poly([[-280, -145], [-250, -170], [-250, -80], [-280, -105]], true), "gray", { w: "detail" });
  let x = -235; const lines = [];
  while (x < 300) { lines.push(x); x += 6 * (1.0 + 0.8 * Math.sin(((x + 235) / 120) * 2 * Math.PI)) + 2; }
  lines.forEach((lx) => (s += L.stroke(L.poly([[lx, -165], [lx, -85]]), { c: "blue", w: "detail" })));
  s += lab(o, "Sound: air squeezed and stretched", 0, -185, 26);
  s += L.stroke("M-330 -45 L330 -45", { c: "gray", w: "detail", dash: "10 10" });
  // light: a sideways wiggle
  const wv = Array.from({ length: 81 }, (_, i) => [-290 + i * 7.25, 70 - 45 * Math.sin(((-290 + i * 7.25 + 210) / 150) * 2 * Math.PI)]);
  s += L.stroke(L.smooth(wv), { c: "orange", w: "char" });
  s += L.stroke("M-290 70 L290 70", { c: "gray", w: "detail", dash: "6 8" });
  s += L.stroke("M-210 25 L-210 150 M-60 25 L-60 150", { c: "gray", w: "detail" }) + arrow([[-205, 140], [-65, 140]], "ink", "detail", 12) + arrow([[-65, 140], [-205, 140]], "ink", "detail", 12);
  s += lab(o, "wavelength", -135, 175, 24) + lab(o, "Light: a wave that wiggles sideways", 0, -20, 26);
  return s;
}, { box: [-340, -235, 680, 470], group: "Light & sound", label: "Sound wave vs light wave", tags: ["wavelength", "physics", "vibration", "speaker", "compression", "transverse"], call: call("sci-sound-vs-light", ", labels: false") });

reg("sci-magnet-field", (o) => {
  const hw = 70, hh = 26;
  let s = card(-300, -190, 600, 380);
  [[105, 48], [150, 82], [200, 112], [250, 138]].forEach(([rx, ry]) => {
    s += L.stroke(L.circ(0, 0, rx, ry), { c: "purple", w: "detail" });
    s += arrow([[14, -ry], [-14, -ry]], "purple", "detail", 14) + arrow([[14, ry], [-14, ry]], "purple", "detail", 14);
  });
  s += L.shape(L.rrect(-hw, -hh, hw, hh * 2, 8), "blue", { w: "prop" }) + L.shape(L.rrect(0, -hh, hw, hh * 2, 8), "red", { w: "prop" });
  s += L.text("S", -hw / 2, 14, { size: 44, c: "white", halo: "ink", haloW: 0.06 }) + L.text("N", hw / 2, 14, { size: 44, c: "white", halo: "ink", haloW: 0.06 });
  s += lab(o, "Field lines leave N and curve back into S", 0, 176, 24);
  return s;
}, { box: [-310, -200, 620, 400], group: "Forces & machines", label: "Bar magnet field lines", tags: ["magnetism", "north", "south", "physics", "attract", "poles"], call: call("sci-magnet-field", ", labels: false") });

// ===================== Energy =====================
reg("sci-lightning-cloud", (o) => {
  let inner = fl(L.rect(-300, 125, 600, 120), "grass", 0) + fl(L.rect(-300, 125, 600, 16), "grass", 1, 0.8);
  inner += L.shape(L.rect(115, 70, 18, 60), "brown", { w: "detail" }) + L.shape(L.circ(124, 55, 38, 44), "green", { w: "prop" });
  inner += puff([[-110, -105, 56], [-40, -140, 72], [50, -135, 68], [115, -100, 52], [0, -95, 56]], "gray");
  inner += L.shape(L.poly([[-8, -52], [30, -52], [10, -8], [36, -8], [-26, 125], [-8, 20], [-34, 20]], true), "yellow", { w: "prop" });
  [[-95, -120], [-40, -160], [25, -165], [85, -140], [118, -125]].forEach(([x, y]) => (inner += L.text("+", x, y, { size: 38, c: "red", halo: "paper", haloW: 0.14 })));
  [[-95, -78], [-50, -62], [60, -62], [112, -72]].forEach(([x, y]) => (inner += L.text("−", x, y, { size: 38, c: "blue", halo: "paper", haloW: 0.14 })));
  const cd = cardD(-260, -240, 520, 480);
  let s = card(-260, -240, 520, 480, "sky", 0) + clip(cd, inner) + L.stroke(cd, { w: "prop" });
  s += lab(o, "+ charges gather at the top", 0, -218, 22) + lab(o, "− charges below", -245, -5, 22, "ink", "start") + lab(o, "Lightning!", -125, 85, 32, "ink");
  return s;
}, { box: [-270, -250, 540, 500], group: "Energy", label: "Lightning in a storm cloud", tags: ["storm", "thunder", "charge", "static", "electricity", "weather", "bolt"], call: call("sci-lightning-cloud", ", labels: false") });

reg("sci-heat-transfer", (o) => {
  const cx = [-320, 0, 320], tile = (i, title, sub, inner) => card(cx[i] - 150, -175, 300, 350, "cream") + lab(o, title, cx[i], -128, 34) + lab(o, sub, cx[i], -96, 22) + inner;
  const flame = (x, y, k = 1) => L.shape(`M${x} ${y} C${x + 30 * k} ${y - 20 * k} ${x + 22 * k} ${y - 50 * k} ${x} ${y - 70 * k} C${x - 4 * k} ${y - 45 * k} ${x - 30 * k} ${y - 30 * k} ${x} ${y} Z`, "orange", { w: "detail" }) + fl(`M${x} ${y} C${x + 12 * k} ${y - 10 * k} ${x + 8 * k} ${y - 26 * k} ${x} ${y - 36 * k} C${x - 12 * k} ${y - 20 * k} ${x - 10 * k} ${y - 8 * k} ${x} ${y} Z`, "yellow", 0, 1);
  // conduction: heated rod
  const rod = L.rrect(cx[0] - 120, 15, 240, 34, 14), cols = ["red", "orange", "yellow", "sky", "blue"];
  let a = clip(rod, cols.map((c, i) => L.shape(L.rect(cx[0] - 120 + i * 48, 15, 48, 34), c, { w: "detail", flat: true })).join("")) + L.stroke(rod, { w: "prop" });
  a += flame(cx[0] - 105, 108, 0.9) + L.shape(L.rect(cx[0] - 128, 118, 56, 12), "gray", { w: "detail" });
  a += arrow([[cx[0] - 90, -20], [cx[0] - 10, -35], [cx[0] + 60, -20], [cx[0] + 110, -30]], "red") + lab(o, "heat travels along", cx[0], 162, 22, "ink");
  // convection: pot of water
  let b = L.shape(L.rrect(cx[1] - 65, -40, 130, 130, 14), "glass", { w: "prop", op: 0.9 }) + fl(L.rect(cx[1] - 59, -15, 118, 99), "water", 0, 0.75);
  b += arrow([[cx[1], 78], [cx[1], -10]], "red") + arrow([[cx[1] - 4, -18], [cx[1] - 30, -20], [cx[1] - 44, 10], [cx[1] - 44, 55]], "blue", "detail", 14) + arrow([[cx[1] + 4, -18], [cx[1] + 30, -20], [cx[1] + 44, 10], [cx[1] + 44, 55]], "blue", "detail", 14);
  b += flame(cx[1], 135, 0.6) + lab(o, "warm rises, cool sinks", cx[1], 162, 22, "ink");
  // radiation: sun to earth through space
  let c = L.shape(L.circ(cx[2] - 85, -25, 34), "yellow", { w: "prop" });
  for (let i = 0; i < 8; i++) c += L.stroke(L.poly([P(46, i * 45, cx[2] - 85, -25), P(58, i * 45, cx[2] - 85, -25)]), { c: "orange", w: "detail" });
  [-20, 10, 40].forEach((dy) => { const p = Array.from({ length: 20 }, (_, i) => [cx[2] - 20 + i * 4.5, 10 + dy + 8 * Math.sin(i * 0.9)]); c += L.stroke(L.smooth(p), { c: "orange", w: "detail" }); });
  c += globe(cx[2] + 108, 35, 30, 0, 23);
  c += lab(o, "waves cross empty space", cx[2], 162, 22, "ink");
  return tile(0, "Conduction", "through solids", a) + tile(1, "Convection", "in liquids and gases", b) + tile(2, "Radiation", "as invisible rays", c);
}, { box: [-480, -185, 960, 370], group: "Energy", wide: true, label: "Heat transfer (3 ways)", tags: ["conduction", "convection", "radiation", "temperature", "thermal", "physics"], call: call("sci-heat-transfer", ", labels: false") });

const circuit = (on) => (o) => {
  let s = card(-300, -195, 600, 430);
  const W = (d) => L.stroke(d, { w: "prop" });
  s += W("M-200 -50 L-200 -100 L-60 -100") + W("M60 -100 L200 -100 L200 -42") + W("M200 60 L200 100 L-200 100 L-200 50");
  // battery
  s += L.shape(L.rrect(-222, -50, 44, 100, 10), "blue", { w: "prop" }) + L.shape(L.rrect(-222, -50, 44, 34, 10), "gold", { w: "prop" }) + L.shape(L.rrect(-210, -60, 20, 12, 3), "gray", { w: "detail" });
  s += L.text("+", -200, -22, { size: 34, c: "ink" }) + L.text("−", -200, 38, { size: 40, c: "white", halo: "ink", haloW: 0.06 });
  // switch
  s += dot(-60, -100, 9, "gray") + dot(60, -100, 9, "gray");
  s += L.stroke(on ? "M-60 -100 L52 -100" : "M-60 -100 L-5 -152", { c: "ink", w: "char" });
  // bulb
  if (on) { s += fl(L.circ(200, 0, 78), "yellow", 0, 0.28); for (let i = 0; i < 9; i++) s += L.stroke(L.poly([P(62, -170 + i * 22, 200, 0), P(80, -170 + i * 22, 200, 0)]), { c: "orange", w: "detail" }); }
  s += L.shape(L.circ(200, 0, 42), on ? "yellow" : "glass", { w: "prop" }) + L.shape(L.rrect(182, 38, 36, 24, 6), "gray", { w: "detail" });
  s += L.stroke("M188 40 L188 12 L196 -8 L204 12 L212 -8 L212 40", { c: "ink", w: "detail" });
  if (on) [[0, -100, 130, -100], [200, -96, 200, -66], [0, 100, -60, 100]].forEach(([x1, y1, x2, y2]) => (s += arrow([[x1, y1], [x2, y2]], "orange", "prop", 14)));
  s += lab(o, "Battery", -125, 8, 26, "ink", "start") + lab(o, "Bulb", 105, 8, 26, "ink", "end") + lab(o, "Switch", 0, -60, 26) + lab(o, "Wire", 0, 138, 26);
  s += lab(o, on ? "switch closed: current flows, bulb lights" : "switch open: the loop is broken, bulb off", 0, 203, 22);
  return s;
};
reg("sci-circuit", circuit(true), { box: [-310, -205, 620, 450], group: "Energy", label: "Simple circuit (on)", tags: ["electricity", "battery", "bulb", "switch", "current", "wire", "physics"], demo: {}, call: call("sci-circuit", ", labels: false") });
reg("sci-circuit-open", circuit(false), { box: [-310, -205, 620, 450], group: "Energy", label: "Simple circuit (switch open)", tags: ["electricity", "battery", "bulb", "switch", "broken", "off", "physics"], call: call("sci-circuit-open", ", labels: false") });

// ===================== Forces and machines =====================
reg("sci-lever", (o) => {
  const pv = [-60, 70], ang = 10, rot = (x, y) => [pv[0] + x * Math.cos(ang * D2R) - y * Math.sin(ang * D2R), pv[1] + x * Math.sin(ang * D2R) + y * Math.cos(ang * D2R)];
  let inner = fl(L.rect(-320, 150, 640, 100), "grass", 0) + fl(L.rect(-320, 150, 640, 14), "grass", 1, 0.8);
  inner += L.shape(L.poly([[pv[0], pv[1]], [pv[0] - 48, 152], [pv[0] + 48, 152]], true), "stone", { w: "prop" });
  const crate = L.shape(L.rect(-168, -83, 70, 70), "wood", { w: "prop" }) + L.stroke("M-168 -83 L-98 -13 M-98 -83 L-168 -13", { c: "wood", w: "detail" }) + L.text("LOAD", -133, -38, { size: 20, c: "white", halo: "ink", haloW: 0.14 });
  inner += L.g(L.shape(L.rrect(-190, -11, 460, 22, 6), "gold", { w: "prop" }) + crate, `translate(${pv[0]} ${pv[1]}) rotate(${ang})`);
  const tip = rot(255, -12);
  inner += arrow([[tip[0] + 4, tip[1] - 120], [tip[0] + 4, tip[1] - 14]], "red", "char", 22);
  inner += dot(pv[0], pv[1], 7, "ink");
  let s = card(-300, -190, 600, 380, "sky") + clip(cardD(-300, -190, 600, 380), inner) + L.stroke(cardD(-300, -190, 600, 380), { w: "prop" });
  const ld = rot(-133, -100);
  s += lab(o, "Load", ld[0] - 10, ld[1] - 12, 28) + lab(o, "Fulcrum", pv[0], 182, 24) + lab(o, "Effort", tip[0] - 5, tip[1] - 135, 28);
  s += lab(o, "a long arm lifts a heavy load", 20, -160, 22);
  return s;
}, { box: [-310, -200, 620, 400], group: "Forces & machines", label: "Lever", tags: ["simple machine", "fulcrum", "effort", "load", "physics", "force"], call: call("sci-lever", ", labels: false") });

reg("sci-pulley", (o) => {
  let s = card(-260, -250, 520, 500);
  s += L.shape(L.rrect(-140, -232, 280, 28, 8), "wood", { w: "prop" }) + L.stroke("M0 -204 L0 -140", { w: "prop" });
  // ropes
  s += L.stroke("M-46 -140 L-46 25", { c: "earth", w: "char" }) + L.stroke("M46 -140 L46 125", { c: "earth", w: "char" });
  s += L.shape(L.circ(0, -140, 50), "gray", { w: "prop" }) + L.shape(L.circ(0, -140, 18), "stone", { w: "detail" }) + dot(0, -140, 5);
  s += L.shape(L.rrect(-92, 25, 92, 84, 12), "stone", { w: "prop" }) + L.text("10 kg", -46, 77, { size: 26, c: "white", halo: "ink", haloW: 0.06 });
  s += L.shape(L.rrect(24, 125, 44, 36, 14), "s3", { w: "prop" });
  s += arrow([[-125, 100], [-125, 10]], "blue", "char", 20) + arrow([[46, 165], [46, 215]], "red", "char", 20);
  s += lab(o, "Pulley wheel", 70, -168, 26, "ink", "start");
  s += lab(o, "Load goes up", -125, 140, 24) + lab(o, "Pull down", 125, 205, 28) + lab(o, "Rope", -92, -60, 24);
  return s;
}, { box: [-270, -260, 540, 520], group: "Forces & machines", label: "Pulley", tags: ["simple machine", "rope", "lift", "wheel", "physics", "force"], call: call("sci-pulley", ", labels: false") });

// ===================== Lab =====================
reg("sci-lab-bench", (o) => {
  const top = 70;
  let s = card(-380, -190, 760, 360, "cream");
  s += L.shape(L.rect(-348, top + 28, 14, 64), "wood", { w: "prop" }) + L.shape(L.rect(334, top + 28, 14, 64), "wood", { w: "prop" });
  s += L.shape(L.rrect(-355, top, 710, 32, 8), "wood", { w: "prop" });
  s += fit("sci-microscope", -270, top - 100, 230) + fit("sci-test-tube-rack", 125, top - 58, 150) + fit("sci-beaker", 275, top - 58, 130);
  // bunsen burner + tripod + flask
  s += L.stroke("M-120 -20 L-150 62 M-60 -20 L-30 62 M-90 -20 L-90 62", { w: "prop" }) + L.shape(L.rrect(-125, -28, 70, 10, 4), "gray", { w: "detail" });
  s += fit("sci-flask", -90, -85, 110);
  s += L.shape(L.rrect(-102, 12, 24, 46, 6), "gray", { w: "detail" }) + L.shape(L.rrect(-102, 22, 24, 8, 2), "gold", { w: "detail" }) + L.shape(L.rrect(-120, 56, 60, 14, 6), "gray", { w: "detail" });
  s += L.shape("M-90 12 C-76 -2 -80 -14 -90 -26 C-100 -14 -106 -2 -90 12 Z", "orange", { w: "detail" });
  s += lab(o, "Microscope", -245, 150, 22) + lab(o, "Heating a flask", -85, 150, 22) + lab(o, "Test tubes", 125, 150, 22) + lab(o, "Beaker", 265, 150, 22);
  return s;
}, { box: [-390, -200, 780, 380], group: "Lab", wide: true, label: "Lab bench set-up", tags: ["experiment", "chemistry", "microscope", "flask", "beaker", "science", "classroom"], call: call("sci-lab-bench", ", labels: false") });
})();
