// ===================== library/props-world.js — science, space, money, medical, sports, vehicles, signs =====================
// Category "objects". Floating things: origin = centre. Vehicles / signs / net / wheelchair: origin = bottom centre on the ground,
// vehicles face RIGHT (flip with { flip: true }). Vehicles take { color } (a palette name).
(function () {
const L = window.L, f1 = L.f1;
const sh = L.shape, fl = L.flat, C = L.circ, RR = L.rrect, P = L.poly, G = L.g, T = L.text;
const reg = (name, label, group, tags, fn, meta = {}) => L.reg("objects", name, fn, Object.assign({ label, group, tags: [group.toLowerCase(), ...tags], box: [-120, -120, 240, 240], call: `L.put(S, "${name}", x, y, { s: 1, t })` }, meta));
const gl = (d, op = 0.55) => fl(d, "white", op); // highlight
const shd = (d, op = 0.18) => fl(d, "ink", op);  // soft shade
const deg = (a) => (a * Math.PI) / 180;
const ngon = (cx, cy, r, n, a0 = -90) => P(Array.from({ length: n }, (_, i) => [cx + r * Math.cos(deg(a0 + (360 * i) / n)), cy + r * Math.sin(deg(a0 + (360 * i) / n))]), true);
const dot = (x, y, r, c, o) => sh(C(x, y, r), c, o);
const ln = (a, b, o = { w: "detail" }) => L.stroke(L.line(a, b), o);
// solid fill + features clipped inside + outline on top (so stripes/spots never spill over the outline)
const solid = (d, c, inner = "", o = {}) => {
  const id = "wcp" + (L._n = (L._n || 0) + 1), ol = o.oc || L.outline(c), eo = o.eo ? "evenodd" : undefined;
  return L.tag("path", { d, fill: L.paint(c, o), "fill-rule": eo }) +
    (inner ? `<clipPath id="${id}"><path d="${d}"${eo ? ' clip-rule="evenodd"' : ""}/></clipPath><g clip-path="url(#${id})">${inner}</g>` : "") +
    (ol === "none" ? "" : L.tag("path", { d, fill: "none", stroke: ol, "stroke-width": L.lw(o.w || "prop", o.s || 1), "stroke-linejoin": L.T.join, "stroke-linecap": L.T.cap }));
};
// thick round-capped lines: [d, colourName, width]; all outlines first, then all fills (no seams where they cross)
const tubes = (list) => {
  let a = "", b = "";
  list.forEach(([d, c, w]) => {
    const ol = L.outline(c);
    if (ol !== "none") a += L.tag("path", { d, fill: "none", stroke: ol, "stroke-width": w + 2 * L.lw("prop"), "stroke-linecap": "round", "stroke-linejoin": "round" });
    b += L.tag("path", { d, fill: "none", stroke: L.c(c), "stroke-width": w, "stroke-linecap": "round", "stroke-linejoin": "round" });
  });
  return a + b;
};
const tube = (d, c, w) => tubes([[d, c, w]]);
const head = (a, b, s) => { const t = Math.atan2(b[1] - a[1], b[0] - a[0]), ux = Math.cos(t), uy = Math.sin(t), w = s * 0.8; return P([[b[0] + ux * s * 0.6, b[1] + uy * s * 0.6], [b[0] - ux * s * 0.4 - uy * w, b[1] - uy * s * 0.4 + ux * w], [b[0] - ux * s * 0.4 + uy * w, b[1] - uy * s * 0.4 - ux * w]], true); };
const wheel = (x, y, r, hub = "gray") => G(sh(C(0, 0, r), "ink", { w: "detail" }) + sh(C(0, 0, r * 0.55), hub, { w: "detail" }) + sh(C(0, 0, r * 0.17), "ink", { w: "detail" }), `translate(${x} ${y})`);
const grid = (x0, y0, x1, y1, nx, ny, o) => { let s = ""; for (let i = 0; i <= nx; i++) { const x = x0 + ((x1 - x0) * i) / nx; s += ln([x, y0], [x, y1], o); } for (let j = 0; j <= ny; j++) { const y = y0 + ((y1 - y0) * j) / ny; s += ln([x0, y], [x1, y], o); } return s; };
const wave = (x0, x1, y, a, n) => { let d = `M${x0} ${y}`; const w = (x1 - x0) / n; for (let i = 0; i < n; i++) d += ` q${f1(w / 4)} ${-a} ${f1(w / 2)} 0 t${f1(w / 2)} 0`; return d; };
const pick = (o, k, d) => (o[k] === undefined ? d : o[k]);

// =====================================================================================================================
// SCIENCE
// =====================================================================================================================
const SC = "Science";
reg("sci-beaker", "Beaker", SC, ["lab", "chemistry", "glass", "liquid"], (o) => {
  const liq = fl("M-70 -5 Q-35 -17 0 -5 T70 -5 V100 H-70 Z", pick(o, "liquid", "teal"), 0.92);
  const ticks = [-50, -25, 0].map((y, i) => ln([i % 2 ? 34 : 24, y], [48, y])).join("");
  const bub = [[-20, 35, 6], [10, 52, 4], [-5, 16, 3.5], [24, 30, 5]].map(([x, y, r]) => fl(C(x, y, r), "white", 0.8)).join("");
  return solid("M-55 -80 L-55 60 Q-55 82 -33 82 L33 82 Q55 82 55 60 L55 -80 Z", "glass", liq + ticks + bub + L.stroke("M-43 -62 V28", { c: "white", w: 6, op: 0.8 })) +
    sh(RR(-66, -94, 132, 16, 8), "glass");
}, { demo: {} });

reg("sci-flask", "Flask", SC, ["lab", "chemistry", "erlenmeyer", "potion"], (o) => {
  const liq = fl("M-90 20 Q-45 8 0 20 T90 20 V100 H-90 Z", pick(o, "liquid", "purple"), 0.92);
  const bub = [[-12, 55, 6], [22, 45, 4.5], [0, 34, 3.5]].map(([x, y, r]) => fl(C(x, y, r), "white", 0.8)).join("");
  return solid("M-20 -92 L-20 -30 L-70 60 Q-80 82 -55 82 L55 82 Q80 82 70 60 L20 -30 L20 -92 Z", "glass", liq + bub + L.stroke("M-8 -85 V-35", { c: "white", w: 6, op: 0.8 })) +
    sh(RR(-29, -104, 58, 15, 7), "glass");
});

reg("sci-test-tube-rack", "Test tube rack", SC, ["lab", "chemistry", "tubes"], () => {
  const cols = ["red", "blue", "green"];
  const tube1 = (x, c) => solid(`M${x - 14} -80 L${x - 14} 34 A14 14 0 0 0 ${x + 14} 34 L${x + 14} -80 Z`, "glass", fl(`M${x - 20} -22 H${x + 20} V60 H${x - 20} Z`, c, 0.95) + L.stroke(`M${x - 8} -70 V10`, { c: "white", w: 4, op: 0.8 }), { w: "detail" });
  return sh(RR(-90, 52, 180, 22, 6), "wood") + sh(RR(-84, -12, 16, 66, 4), "wood") + sh(RR(68, -12, 16, 66, 4), "wood") +
    [-48, 0, 48].map((x, i) => tube1(x, cols[i])).join("") + sh(RR(-90, -14, 180, 18, 6), "wood") + [-48, 0, 48].map((x) => fl(C(x, -5, 3), "ink", 0.4)).join("") +
    gl("M-82 -10 H80", 0);
});

reg("sci-microscope", "Microscope", SC, ["lab", "biology", "science"], () => {
  const arm = L.limb([[22, 78], [64, 52], [74, 0], [52, -48]], 26, 22);
  return sh(RR(-66, 72, 132, 20, 9), "gray") + sh(RR(-52, 24, 82, 10, 4), "gray") + dot(-30, 56, 11, "gray", { w: "detail" }) +
    sh(arm, "blue") + G(sh(RR(-17, -104, 34, 98, 8), "gray") + sh(RR(-11, -120, 22, 18, 5), "ink") + sh(RR(-12, -12, 24, 18, 5), "ink") + sh(RR(-13, 4, 26, 12, 4), "gray", { w: "detail" }) + fl(RR(-12, -98, 6, 86, 3), "white", 0.5), "translate(18 -30) rotate(-14)") +
    sh(RR(-14, 22, 36, 8, 3), "ink", { w: "detail" }) + dot(60, -2, 8, "orange", { w: "detail" });
}, { box: [-110, -150, 220, 260] });

reg("sci-magnifier", "Magnifying glass", SC, ["lab", "detective", "search", "zoom"], () =>
  sh(L.limb([[28, 28], [86, 86]], 22, 22), "wood") +
  tube("M30 30 L46 46", "gray", 16) + sh(C(-20, -20, 62), "blue") + sh(C(-20, -20, 46), "glass", { w: "detail" }) +
  gl("M-52 -34 Q-48 -52 -30 -60", 0) + L.stroke("M-55 -26 Q-52 -48 -32 -58", { c: "white", w: 8, op: 0.85 }) + fl(C(-4, -4, 5), "white", 0.7), { box: [-110, -110, 220, 220] });

reg("sci-dna", "DNA helix", SC, ["biology", "genetics", "science", "double helix"], () => {
  const x = (y, ph) => 40 * Math.sin(((y + 95) / 100) * 2 * Math.PI + ph);
  const strand = (ph, y0 = -100, y1 = 100) => { const pts = []; for (let y = y0; y <= y1; y += 5) pts.push([x(y, ph), y]); return L.smooth(pts); };
  let rungs = ""; const rc = ["yellow", "orange", "teal", "pink"];
  for (let y = -86, i = 0; y <= 90; y += 17, i++) rungs += tube(L.line([x(y, 0), y], [x(y, Math.PI), y]), rc[i % 4], 7);
  return rungs + tubes([[strand(Math.PI), "pink", 13], [strand(0), "blue", 13]]) + tubes([[strand(Math.PI, -45, 5), "pink", 13], [strand(Math.PI, 55, 100), "pink", 13]]);
});

reg("sci-atom", "Atom", SC, ["physics", "chemistry", "electron", "science"], () => {
  let orb = "", el = "";
  [0, 60, 120].forEach((a, i) => {
    orb += G(L.stroke(C(0, 0, 92, 32), { c: "ink", w: "prop" }), `rotate(${a})`);
    const t = deg(40 + i * 130), ex = 92 * Math.cos(t), ey = 32 * Math.sin(t), r = deg(a);
    el += dot(ex * Math.cos(r) - ey * Math.sin(r), ex * Math.sin(r) + ey * Math.cos(r), 10, ["yellow", "orange", "teal"][i], { w: "detail" });
  });
  return orb + dot(0, 0, 24, "red") + dot(-8, 6, 10, "blue", { w: "detail" }) + dot(8, -8, 10, "red", { w: "detail" }) + gl(C(-8, -10, 5), 0.6) + el;
});

reg("sci-magnet", "Magnet", SC, ["physics", "horseshoe", "science", "attract"], () =>
  G(solid("M-80 -72 L-80 0 A80 80 0 0 0 80 0 L80 -72 L36 -72 L36 0 A36 36 0 0 1 -36 0 L-36 -72 Z", "red", sh("M-90 -72 H-26 V-44 H-90 Z", "gray", { w: "detail" }) + sh("M26 -72 H90 V-44 H26 Z", "gray", { w: "detail" }) + L.stroke("M-70 -20 V0 A70 70 0 0 0 -50 50", { c: "white", w: 6, op: 0.45 })), "translate(0 -6)") +
  [-1, 1].map((k) => L.stroke(`M${k * 58} -86 q${k * 6} -12 0 -24 M${k * 72} -86 q${k * 6} -12 0 -24`, { w: "detail" })).join(""));

reg("sci-telescope", "Telescope", SC, ["astronomy", "space", "science", "stars"], () =>
  tubes([["M0 20 L-62 100", "wood", 11], ["M0 20 L0 100", "wood", 11], ["M0 20 L62 100", "wood", 11]]) +
  G(sh(RR(-76, -26, 120, 44, 10), "blue") + sh(RR(-90, -32, 28, 56, 8), "gold") + sh(RR(44, -16, 38, 24, 6), "gold") + sh(RR(80, -10, 14, 12, 3), "ink", { w: "detail" }) + sh(RR(-28, -26, 10, 44, 2), "gold", { w: "detail" }) + gl(RR(-70, -20, 110, 8, 4), 0.5), "translate(0 -26) rotate(-30)") + dot(0, 20, 12, "gray", { w: "detail" }));

reg("sci-globe", "Globe", SC, ["geography", "earth", "world", "school"], () => {
  const land = fl(L.smooth([[-45, -50], [-12, -62], [10, -40], [-8, -14], [-32, -10], [-52, -28], [-45, -50]]), "green") + fl(L.smooth([[14, -4], [46, -14], [62, 12], [42, 44], [20, 30], [14, -4]]), "green") + fl(L.smooth([[-48, 14], [-26, 6], [-14, 30], [-30, 50], [-50, 38], [-48, 14]]), "green");
  return tube("M-84 -20 A84 84 0 0 0 0 82", "gold", 8) + tube("M0 82 V100", "gold", 8) + sh(RR(-42, 96, 84, 14, 6), "wood") +
    solid(C(0, -14, 68), "water", land + fl(C(-18, -28, 3), "white", 0.7)) + L.stroke(L.arc(0, -14, 68, 60, 120, 20), { w: "detail", op: 0.4 }) + L.stroke("M-68 -14 Q0 6 68 -14", { w: "detail", op: 0.35 }) +
    tube("M-12 -96 A90 90 0 0 1 82 -2", "gold", 8) + dot(-12, -96, 6, "gold", { w: "detail" }) + gl("M-40 -48 Q-30 -64 -12 -68", 0) + L.stroke("M-52 -44 Q-44 -58 -26 -64", { c: "white", w: 7, op: 0.6 });
});

reg("sci-petri-dish", "Petri dish", SC, ["lab", "biology", "bacteria", "culture"], () => {
  const col = [[-30, 6, 9], [10, -4, 7], [32, 12, 8], [-8, 18, 5], [18, 24, 4]].map(([x, y, r]) => dot(x, y, r, "green", { w: "detail" })).join("");
  return solid("M-92 10 L-92 40 A92 34 0 0 0 92 40 L92 10 Z", "glass") + sh(C(0, 10, 92, 34), "glass") + sh(C(0, 12, 78, 26), "yellow", { w: "detail" }) + col +
    L.stroke("M-62 10 Q-40 -8 -10 -12", { c: "white", w: 6, op: 0.7 }) + L.stroke("M-82 20 V38", { c: "white", w: 6, op: 0.7 });
}, { box: [-120, -80, 240, 160] });

reg("sci-thermometer", "Thermometer", SC, ["medical", "temperature", "weather", "fever"], () => {
  const ticks = [-80, -60, -40, -20, 0, 20].map((y, i) => ln([16, y], [i % 2 ? 26 : 34, y])).join("");
  return solid("M-14 -92 A14 14 0 0 1 14 -92 V38 A28 28 0 1 1 -14 38 Z", "glass") + ticks + fl("M-5 -20 H5 V50 H-5 Z", "red") + dot(0, 62, 18, "red", { w: "detail" }) + fl(C(-6, 56, 5), "white", 0.6) + fl(RR(-5, -20, 10, 70, 5), "red") +
    L.stroke("M-8 -84 V-30", { c: "white", w: 5, op: 0.8 });
});

reg("sci-brain-monitor", "Brain scan monitor", SC, ["medical", "mri", "brain", "screen", "neuroscience"], () => {
  const brain = L.smooth([[-44, 4], [-48, -20], [-30, -44], [-6, -50], [16, -48], [40, -36], [50, -12], [44, 12], [26, 24], [8, 20], [-14, 26], [-34, 22], [-44, 4]]);
  const folds = ["M-34 -22 Q-20 -34 -8 -22 T14 -26", "M-30 0 Q-16 -12 -2 0 T24 -2", "M10 -40 Q22 -26 14 -12", "M28 -22 Q40 -14 34 4", "M-8 -44 Q-12 -30 -4 -14"].map((d) => L.stroke(d, { c: "pink", w: "detail", op: 1 })).join("");
  const screen = RR(-98, -92, 196, 130, 12);
  return sh(RR(-40, 52, 80, 14, 5), "gray") + sh(RR(-10, 36, 20, 20, 3), "gray") +
    solid(RR(-110, -100, 220, 144, 16), "gray", "") + sh(screen, "navy", { w: "detail" }) + fl(C(0, -28, 62), "teal", 0.18) + L.stroke(C(0, -28, 62), { c: "teal", w: 3, op: 0.7 }) +
    L.stroke("M-98 -28 H98 M0 -92 V38", { c: "teal", w: 2, op: 0.35 }) + sh(brain, "pink", { w: "detail" }) + folds + gl("M-34 -34 Q-24 -44 -10 -44", 0.6) +
    L.stroke("M-90 24 H-60 l6 -8 l8 14 l6 -6 H-20", { c: "green", w: 3, op: 0.9 }) + fl(C(80, -78, 3.5), "green");
}, { box: [-130, -120, 260, 200] });

const gear = (cx, cy, R, n, c, rot = 0, hole = 0.28) => {
  const w = (2 * Math.PI) / n, ri = R * 0.8, pts = [];
  for (let i = 0; i < n; i++) { const a = i * w + deg(rot); [[ri, -0.3], [R, -0.17], [R, 0.17], [ri, 0.3]].forEach(([r, k]) => pts.push([cx + r * Math.cos(a + k * w), cy + r * Math.sin(a + k * w)])); }
  return solid(P(pts, true) + C(cx, cy, R * hole), c, gl(C(cx - R * 0.15, cy - R * 0.15, R * 0.5), 0), { eo: true }) + L.stroke(C(cx, cy, R * 0.6), { w: "detail", op: 0.5 });
};
reg("sci-gears", "Gears", SC, ["engineering", "machine", "settings", "cogs"], () => gear(-32, 22, 68, 10, "orange", 0) + gear(58, -50, 42, 8, "blue", 22.5), { box: [-130, -130, 260, 260] });

reg("sci-lightning-icon", "Lightning bolt icon", SC, ["energy", "electric", "power", "storm"], () =>
  solid(P([[26, -106], [-46, 6], [-6, 6], [-26, 106], [50, -26], [8, -26], [36, -106]], true), "yellow", gl("M20 -90 L-30 0", 0)) + L.stroke("M14 -88 L-26 -18", { c: "white", w: 6, op: 0.6 }));

// =====================================================================================================================
// SPACE
// =====================================================================================================================
const SP = "Space";
reg("space-rocket", "Rocket", SP, ["spaceship", "launch", "flying"], (o) => {
  const body = "M0 -112 C50 -72 48 -4 32 52 L-32 52 C-48 -4 -50 -72 0 -112 Z", col = pick(o, "color", "red");
  return sh("M-30 6 L-66 64 L-30 40 Z", col) + sh("M30 6 L66 64 L30 40 Z", col) + sh("M-8 40 H8 V70 H-8 Z", col, { w: "detail" }) +
    sh("M-22 54 Q-30 100 0 132 Q30 100 22 54 Z", "orange") + sh("M-11 56 Q-14 86 0 108 Q14 86 11 56 Z", "yellow", { w: "detail" }) +
    solid(body, "white", fl("M-60 -120 H60 V-62 H-60 Z", col) + fl("M-60 26 H60 V40 H-60 Z", col)) + sh(RR(-20, 50, 40, 12, 4), "gray", { w: "detail" }) +
    dot(0, -34, 18, "glass") + dot(0, -34, 11, "sky", { w: "detail" }) + gl(C(-5, -39, 4), 0.8) + L.stroke("M-26 -70 Q-34 -30 -28 10", { c: "white", w: 6, op: 0.5 });
}, { demo: {}, box: [-90, -130, 180, 270] });

reg("space-satellite", "Satellite", SP, ["orbit", "communications", "gps", "space"], () => {
  const panel = (x) => sh(RR(x, -26, 70, 52, 3), "blue") + grid(x, -26, x + 70, 26, 4, 3, { w: "detail" }) + gl(`M${x + 4} -22 L${x + 22} -22 L${x + 4} -4 Z`, 0.3);
  return G(ln([-52, 0], [-58, 0], { w: "prop" }) + tubes([["M-34 0 H-56", "gray", 7], ["M34 0 H56", "gray", 7]]) + panel(-128) + panel(56) +
    sh(RR(-34, -32, 68, 64, 8), "gold") + L.stroke("M-34 -10 H34 M-34 10 H34", { w: "detail", op: 0.5 }) + tube("M0 32 V48", "gray", 6) + solid("M-24 66 Q0 36 24 66 Z", "white") + tube("M0 -32 V-62", "gray", 5) + dot(0, -66, 6, "red", { w: "detail" }) + gl(RR(-28, -26, 20, 8, 4), 0.55), "rotate(-24)");
}, { box: [-150, -130, 300, 260] });

reg("space-station", "Space station", SP, ["iss", "orbit", "modules", "space"], () => {
  const panel = (x, y) => sh(RR(x, y, 64, 46, 3), "blue") + grid(x, y, x + 64, y + 46, 4, 3, { w: "detail" });
  return sh(RR(-140, -5, 280, 10, 4), "gray") + panel(-140, -64) + panel(-140, 18) + panel(76, -64) + panel(76, 18) +
    sh(RR(-18, -62, 36, 124, 12), "white") + sh(RR(-66, -24, 132, 48, 20), "white") + sh(RR(-64, -10, 128, 8, 3), "orange", { w: "detail" }) +
    sh(C(0, -72, 14), "glass") + dot(0, 76, 12, "gray", { w: "detail" }) + dot(-48, 0, 8, "sky", { w: "detail" }) + dot(48, 0, 8, "sky", { w: "detail" }) + gl(RR(-56, -20, 40, 6, 3), 0.7) + sh(RR(-14, -6, 28, 12, 4), "gray", { w: "detail" });
}, { box: [-160, -110, 320, 220] });

reg("space-astronaut-helmet", "Astronaut helmet", SP, ["suit", "visor", "nasa-style", "space"], () =>
  sh(RR(-64, 56, 128, 30, 12), "gray") + sh(RR(-64, 64, 128, 8, 3), "orange", { w: "detail" }) + dot(-80, -4, 14, "gray", { w: "detail" }) + dot(80, -4, 14, "gray", { w: "detail" }) +
  solid(C(0, -8, 84), "white") + sh(RR(-58, -44, 116, 80, 36), "navy") + fl("M-44 -34 Q-20 -40 -6 -30 Q-24 -22 -44 -4 Z", "sky", 0.55) + fl("M16 -38 Q34 -34 44 -22 L36 -20 Q28 -30 12 -34 Z", "white", 0.5) +
  L.stroke("M-62 -52 Q-64 -78 -34 -84", { c: "white", w: 8, op: 0.7 }), { box: [-120, -110, 240, 210] });

reg("space-ufo", "Friendly UFO", SP, ["alien", "flying saucer", "extraterrestrial", "space"], () => {
  const lights = [-70, -35, 0, 35, 70].map((x, i) => dot(x, 24 + (1 - Math.abs(x) / 100) * 4, 7, ["red", "yellow", "green", "yellow", "red"][i], { w: "detail" })).join("");
  return fl("M-34 52 L-86 130 H86 L34 52 Z", "yellow", 0.3) +
    solid("M-50 8 C-50 -62 50 -62 50 8 Z", "glass") + dot(0, -14, 22, "green") + dot(-8, -17, 4, "ink", { flat: true }) + dot(8, -17, 4, "ink", { flat: true }) + L.stroke("M-8 -6 Q0 2 8 -6", { w: "detail" }) +
    tube("M-6 -36 Q-12 -52 -18 -52", "green", 4) + dot(-18, -52, 5, "green", { w: "detail" }) + tube("M6 -36 Q12 -52 18 -52", "green", 4) + dot(18, -52, 5, "green", { w: "detail" }) +
    sh(C(0, 30, 112, 28), "gray") + sh("M-52 44 Q0 74 52 44 Q40 62 0 64 Q-40 62 -52 44 Z", "gray") + lights + L.stroke("M-90 18 Q-70 8 -40 6", { c: "white", w: 6, op: 0.55 }) +
    gl("M-34 -40 Q-26 -50 -14 -50", 0) + L.stroke("M-40 -30 Q-34 -46 -22 -50", { c: "white", w: 5, op: 0.7 });
}, { box: [-130, -90, 260, 230] });

const ball = (r, c, inner, extra = "") => solid(C(0, 0, r), c, inner) + extra;
const PL = (id, label, r, c, inner, tags, extra) => reg("space-planet-" + id, label, SP, ["planet", "solar system", ...tags], () => ball(r, c, inner, extra && extra()), { box: [-110, -110, 220, 220] });
PL("mercury", "Mercury", 58, "gray", [[-22, -18, 14], [20, 10, 11], [-4, 34, 9], [28, -34, 7], [-36, 20, 6]].map(([x, y, r]) => fl(C(x, y, r), "ink", 0.2) + fl(C(x - 2, y - 2, r * 0.6), "white", 0.18)).join(""), ["small", "grey"]);
PL("venus", "Venus", 70, "yellow", ["M-90 -30 Q-45 -50 0 -30 T90 -30", "M-90 0 Q-45 -20 0 0 T90 0", "M-90 30 Q-45 10 0 30 T90 30"].map((d) => L.stroke(d, { c: "orange", w: 10, op: 0.4 })).join(""), ["hot", "yellow"]);
PL("earth", "Earth", 72, "water", fl(L.smooth([[-40, -48], [-10, -60], [12, -38], [-6, -12], [-32, -8], [-52, -26], [-40, -48]]), "green") + fl(L.smooth([[14, 2], [46, -8], [62, 18], [42, 52], [20, 38], [14, 2]]), "green") + fl(L.smooth([[-48, 20], [-26, 12], [-14, 36], [-30, 56], [-50, 44], [-48, 20]]), "green") +
  [[-30, -30, 24, 7], [30, -42, 20, 6], [-10, 30, 22, 6], [40, 22, 18, 5]].map(([x, y, rx, ry]) => fl(C(x, y, rx, ry), "white", 0.8)).join(""), ["home", "blue", "world"]);
PL("mars", "Mars", 52, "orange", fl(C(0, -46, 26, 14), "white", 0.85) + [[-18, -4, 14, 8], [20, 14, 16, 9], [-6, 30, 12, 7]].map(([x, y, rx, ry]) => fl(C(x, y, rx, ry), "red", 0.45)).join("") + [[24, -16, 6], [-28, 18, 5]].map(([x, y, r]) => fl(C(x, y, r), "ink", 0.18)).join(""), ["red planet", "rusty"]);
PL("jupiter", "Jupiter", 88, "earth", [[-60, -48, "orange", 0.55], [-34, -26, "cream", 0.9], [-6, 4, "orange", 0.55], [20, 30, "cream", 0.8], [46, 54, "brown", 0.35]].map(([y0, y1, c, op]) => fl(`M-100 ${y0} H100 V${y1} H-100 Z`, c, op)).join("") + fl(C(30, 34, 17, 10), "red", 0.9) + L.stroke("M-90 -8 Q-45 -20 0 -8 T90 -8", { c: "brown", w: 4, op: 0.3 }), ["giant", "big", "gas"]);
reg("space-planet-saturn", "Saturn", SP, ["planet", "solar system", "rings", "gas"], () =>
  G(tube(L.arc(0, 0, 118, 180, 360, 30), "gold", 16), "rotate(-18)") + ball(62, "yellow", ["M-70 -26 H70 V-10 H-70 Z", "M-70 12 H70 V26 H-70 Z"].map((d) => fl(d, "orange", 0.35)).join("")) + G(tube(L.arc(0, 0, 118, 0, 180, 30), "gold", 16), "rotate(-18)"), { box: [-150, -100, 300, 200] });
reg("space-planet-uranus", "Uranus", SP, ["planet", "solar system", "ice giant", "cyan"], () =>
  G(tube(L.arc(0, 0, 22, 90, 270, 100), "white", 5), "rotate(14)") + ball(54, "teal", fl("M-60 -14 H60 V-4 H-60 Z", "white", 0.3)) + G(tube(L.arc(0, 0, 22, -90, 90, 100), "white", 5), "rotate(14)"), { box: [-110, -110, 220, 220] });
PL("neptune", "Neptune", 58, "blue", fl(C(-14, 12, 17, 9), "navy", 0.55) + ["M-70 -24 Q-30 -34 20 -24", "M-70 30 Q-20 22 50 34"].map((d) => L.stroke(d, { c: "white", w: 6, op: 0.55 })).join(""), ["ice giant", "windy"]);
reg("space-planet-pluto", "Pluto", SP, ["planet", "dwarf planet", "solar system", "heart"], () =>
  ball(44, "earth", G(fl("M0 24 C-28 4 -22 -18 -9 -18 C-3 -18 0 -14 0 -9 C0 -14 3 -18 9 -18 C22 -18 28 4 0 24 Z", "cream", 0.9), "translate(-4 2)") + [[-26, -22, 7], [24, -26, 5], [28, 24, 6]].map(([x, y, r]) => fl(C(x, y, r), "brown", 0.3)).join("")), { box: [-110, -110, 220, 220] });

reg("space-comet", "Comet", SP, ["shooting star", "ice", "tail", "space"], () =>
  fl("M-62 -4 Q60 -30 118 -108 Q64 -4 -38 62 Z", "sky", 0.55) + fl("M-58 6 Q30 -6 88 -62 Q40 14 -42 52 Z", "white", 0.7) + fl("M-62 -4 Q-10 -14 30 -52 Q0 -2 -52 40 Z", "white", 0.7) +
  solid(C(-52, 28, 34), "stone", [[-62, 20, 9], [-40, 36, 7], [-48, 42, 4]].map(([x, y, r]) => fl(C(x, y, r), "ink", 0.2)).join("") + fl(C(-62, 16, 6), "white", 0.5)), { box: [-110, -120, 240, 220] });

reg("space-asteroid", "Asteroid", SP, ["rock", "meteor", "space"], () => {
  const r = L.rng(7), pts = Array.from({ length: 11 }, (_, i) => { const a = (i / 11) * Math.PI * 2, k = 62 + r() * 24; return [Math.cos(a) * k, Math.sin(a) * k * 0.82]; });
  pts.push(pts[0]);
  return solid(L.smooth(pts), "stone", [[-22, -14, 16, 10], [26, 10, 13, 8], [-6, 30, 10, 6], [30, -26, 8, 5]].map(([x, y, rx, ry]) => fl(C(x, y, rx, ry), "ink", 0.2) + fl(C(x - 2, y - 2, rx * 0.6, ry * 0.5), "white", 0.18)).join(""));
});

reg("space-dish", "Radio telescope dish", SP, ["antenna", "signal", "observatory", "space"], () =>
  tubes([["M0 22 L-34 100", "gray", 9], ["M0 22 L34 100", "gray", 9], ["M0 22 V100", "gray", 9]]) + sh(RR(-56, 98, 112, 12, 5), "gray") +
  G(solid("M-88 -36 Q0 96 88 -36 Z", "white", shd("M-100 -20 Q0 100 100 -20 V60 H-100 Z", 0.12)) + sh(C(0, -36, 88, 17), "white") + sh(C(0, -34, 70, 11), "gray", { w: "detail", op: 0 }) + L.stroke(L.line([0, -34], [0, -112]), { w: "prop" }) + dot(0, -114, 9, "red", { w: "detail" }), "translate(0 14) rotate(-28)") + dot(0, 22, 12, "gray", { w: "detail" }), { box: [-130, -130, 260, 250] });

// =====================================================================================================================
// MONEY  (generic designs only: no real currency art)
// =====================================================================================================================
const MN = "Money";
const ring = (d, c, w, tone = 2, op) => L.tag("path", { d, fill: "none", stroke: L.c(c, tone), "stroke-width": w, opacity: op });
const plus = (cx, cy, a, t, c, o = { w: "detail" }) => sh(P([[-t, -a], [t, -a], [t, -t], [a, -t], [a, t], [t, t], [t, a], [-t, a], [-t, t], [-a, t], [-a, -t], [-t, -t]].map(([x, y]) => [cx + x, cy + y]), true), c, o);
reg("money-coin", "Coin", MN, ["cash", "gold", "currency", "pay"], () =>
  dot(5, 6, 80, "gold", { tone: 2 }) + solid(C(0, 0, 80), "gold", "") + ring(C(0, 0, 62), "gold", 5) +
  T("$", 0, 26, { size: 84, c: "brown" }) + L.stroke("M-60 -30 Q-50 -52 -28 -62", { c: "white", w: 7, op: 0.7 }));

const coinPile = (x, y0, n) => {
  let s = "";
  for (let i = 0; i < n; i++) {
    const y = y0 - i * 14;
    s += sh(`M${x - 44} ${y - 14} V${y} A44 16 0 0 0 ${x + 44} ${y} V${y - 14} Z`, "gold", { tone: 2 }) + sh(C(x, y - 14, 44, 16), "gold") + L.stroke(C(x, y - 14, 30, 10), { w: "detail", op: 0.35 });
  }
  return s;
};
reg("money-coin-stack", "Coin stacks", MN, ["cash", "savings", "wealth", "coins"], () => coinPile(0, 40, 7) + coinPile(-72, 78, 4) + coinPile(70, 80, 3) + gl("M-6 -50 H20", 0) + fl(C(-12, -64, 6), "white", 0.7), { box: [-130, -110, 260, 210] });

reg("money-banknote", "Banknote", MN, ["cash", "bill", "paper money"], () =>
  solid(RR(-104, -56, 208, 112, 8), "green") + L.stroke(RR(-93, -45, 186, 90, 5), { c: "white", w: 3, op: 0.75 }) + sh(C(0, 0, 34), "cream", { w: "detail" }) + L.stroke(C(0, 0, 27), { w: 2, op: 0.4 }) + T("$", 0, 18, { size: 54, c: "green" }) +
  [[-72, -22], [-72, 22], [72, -22], [72, 22]].map(([x, y]) => sh(C(x, y, 11), "cream", { w: "detail" })).join("") + [[-72, 0], [72, 0]].map(([x, y]) => fl(RR(x - 11, y - 3, 22, 6, 3), "white", 0.7)).join("") +
  L.stroke("M-58 -40 H-40 M40 -40 H58 M-58 40 H-40 M40 40 H58", { c: "white", w: 3, op: 0.7 }), { box: [-130, -80, 260, 160] });

reg("money-note-bundle", "Bundle of notes", MN, ["cash", "stack", "banknotes", "paper money"], () =>
  [[-8, 12, -3], [0, 4, 2], [-4, -4, -1]].map(([x, y, r], i) => G(sh(RR(-92, -46, 184, 92, 6), "green"), `translate(${x} ${y}) rotate(${r})`)).join("") +
  G(sh(RR(-92, -46, 184, 92, 6), "green") + sh(C(-48, 0, 24), "cream", { w: "detail" }) + T("$", -48, 14, { size: 38, c: "green" }) + fl(RR(-10, -30, 80, 8, 4), "white", 0.7) + fl(RR(-10, -12, 56, 8, 4), "white", 0.7) + fl(RR(-10, 6, 70, 8, 4), "white", 0.7), "translate(-4 -12)") +
  sh(RR(-22, -62, 44, 112, 4), "cream") + L.stroke("M-22 -30 H22 M-22 18 H22", { c: "red", w: 4 }), { box: [-120, -90, 240, 170] });

reg("money-gold-bar", "Gold bar", MN, ["ingot", "bullion", "wealth", "gold"], () =>
  sh("M-90 52 L90 52 L68 4 L-68 4 Z", "gold") + sh("M-68 4 L68 4 L52 -26 L-52 -26 Z", "gold", { tone: 1 }) +
  sh(RR(-36, 16, 72, 26, 7), "gold", { w: "detail", tone: 2 }) + T("GOLD", 0, 36, { size: 20, c: "brown" }) + gl("M-52 -18 H20", 0) + L.stroke("M-40 -14 H10", { c: "white", w: 6, op: 0.7 }), { box: [-120, -60, 240, 140] });

reg("money-gold-stack", "Gold bars pile", MN, ["ingots", "bullion", "treasure", "wealth"], () => {
  const bar = (x, y) => sh(`M${x - 60} ${y + 34} L${x + 60} ${y + 34} L${x + 46} ${y} L${x - 46} ${y} Z`, "gold") + sh(`M${x - 46} ${y} L${x + 46} ${y} L${x + 36} ${y - 18} L${x - 36} ${y - 18} Z`, "gold", { tone: 1 }) + L.stroke(`M${x - 30} ${y - 10} H${x + 4}`, { c: "white", w: 4, op: 0.7 });
  return bar(-62, 50) + bar(62, 50) + bar(0, 14);
}, { box: [-140, -60, 280, 150] });

reg("money-piggy-bank", "Piggy bank", MN, ["savings", "pig", "coin", "pink"], () =>
  tube("M-92 -4 q-26 -6 -18 -28 q10 -16 22 -2", "pink", 8) + sh(RR(-62, 38, 30, 42, 12), "pink", { tone: 2 }) + sh(RR(26, 38, 30, 42, 12), "pink", { tone: 2 }) +
  sh(P([[22, -62], [38, -100], [62, -56]], true), "pink") + sh(C(0, -4, 98, 74), "pink") + sh(RR(-46, 38, 30, 42, 12), "pink") + sh(RR(40, 38, 30, 42, 12), "pink") +
  sh(C(96, 4, 22, 28), "pink") + fl(C(100, -4, 3.6), "ink", 0.9) + fl(C(100, 12, 3.6), "ink", 0.9) + fl(C(62, -26, 6), "ink") + fl(C(52, 8, 12, 8), "red", 0.25) + fl(RR(-30, -78, 56, 9, 4), "ink", 0.8) +
  sh(C(-6, -118, 10, 27), "gold") + L.stroke("M-6 -136 V-100", { c: "white", w: 4, op: 0.6 }) + L.stroke("M-70 -40 Q-60 -60 -40 -64", { c: "white", w: 7, op: 0.55 }), { box: [-140, -160, 280, 250] });

reg("money-wallet", "Wallet", MN, ["leather", "cash", "pay", "pocket"], () =>
  G(sh(RR(-56, -50, 100, 56, 5), "green"), "translate(-6 -22) rotate(-9)") + G(sh(RR(-50, -50, 100, 56, 5), "green", { tone: 1 }), "translate(10 -26) rotate(6)") +
  solid(RR(-96, -52, 192, 118, 18), "brown", "", { tone: 1 }) + L.stroke(RR(-85, -41, 170, 96, 12), { c: "earth", w: 3, dash: "8 7", op: 0.85 }) + sh(RR(24, -14, 80, 50, 16), "brown", { tone: 1 }) + dot(66, 11, 9, "gold", { w: "detail" }) + gl("M-84 -34 H-30", 0) + L.stroke("M-82 -34 H-40", { c: "white", w: 5, op: 0.3 }), { box: [-130, -100, 260, 190] });

reg("money-credit-card", "Credit card (blank)", MN, ["bank", "pay", "card", "plastic"], () =>
  solid(RR(-108, -68, 216, 136, 14), "blue", fl("M-120 70 Q-20 10 120 -40 V80 Z", "white", 0.13) + fl("M-120 -10 Q0 -30 120 -80 V-70 Q0 -20 -120 0 Z", "white", 0.1)) +
  sh(RR(-80, -30, 44, 34, 7), "gold", { w: "detail" }) + L.stroke("M-80 -13 H-36 M-58 -30 V4", { w: "detail", op: 0.5 }) +
  [0, 1, 2, 3].map((g) => [0, 1, 2, 3].map((i) => fl(C(-78 + g * 40 + i * 9, 30, 3), "white", 0.9)).join("")).join("") + fl(RR(-80, 50, 70, 8, 4), "white", 0.6) +
  [0, 1, 2].map((i) => L.stroke(L.arc(60, -34, 9 + i * 9, -50, 50), { c: "white", w: 4, op: 0.85 })).join(""), { box: [-130, -90, 260, 180] });

reg("money-cash-register", "Cash register", MN, ["shop", "till", "retail", "checkout"], () =>
  sh(RR(-96, 14, 192, 70, 10), "teal") + sh(RR(-76, 50, 152, 26, 6), "teal", { tone: 2, w: "detail" }) + sh(RR(-14, 58, 28, 8, 4), "ink", { w: "detail" }) +
  sh("M-84 14 L-62 -36 H62 L84 14 Z", "gray") + [-1, 0, 1].map((r) => [-3, -2, -1, 0, 1, 2, 3].map((c) => c > 1 && r > 0 ? "" : fl(RR(c * 18 - 7, -26 + (r + 1) * 13, 14, 9, 3), "white", 0.9)).join("")).join("") + sh(RR(-8, -50, 16, 20, 3), "gray", { w: "detail" }) +
  sh(RR(-52, -106, 104, 58, 10), "navy") + sh(RR(-42, -96, 84, 38, 6), "ink", { w: "detail" }) + T("$", 0, -68, { size: 38, c: "yellow" }) + dot(60, -78, 5, "red", { w: "detail" }) + gl("M-96 20 H-30", 0) + L.stroke("M-86 24 H-50", { c: "white", w: 5, op: 0.35 }), { box: [-120, -120, 240, 220] });

reg("money-receipt", "Receipt", MN, ["shop", "bill", "invoice", "paper"], () => {
  let top = "M-56 -92", bot = "";
  for (let i = 0; i < 8; i++) top += " l7 -8 l7 8";
  top += " V90";
  for (let i = 0; i < 8; i++) top += " l-7 8 l-7 -8";
  top += " Z";
  const rows = [-60, -42, -24, -6, 12].map((y, i) => fl(RR(-42, y, 48 + (i % 3) * 8, 8, 4), "gray", 0.8) + fl(RR(32, y, 14, 8, 4), "gray", 0.8)).join("");
  const bars = Array.from({ length: 16 }, (_, i) => ln([-38 + i * 5, 52], [-38 + i * 5, 76], { w: i % 3 ? 2 : 4 })).join("");
  return solid(top, "white", rows + L.stroke("M-44 28 H44", { w: "detail", dash: "5 5", op: 0.6 }) + fl(RR(-42, 34, 40, 10, 5), "ink", 0.85) + fl(RR(16, 34, 30, 10, 5), "ink", 0.85) + bars + shd("M30 -120 V120 H60 V-120 Z", 0.06));
}, { box: [-90, -120, 180, 230] });

reg("money-bag", "Money bag", MN, ["sack", "cash", "wealth", "loot"], () =>
  solid("M-26 -52 C-72 -18 -98 32 -82 72 Q-66 102 0 102 Q66 102 82 72 C98 32 72 -18 26 -52 Z", "earth", L.stroke("M-60 -4 Q-70 40 -50 80", { c: "white", w: 8, op: 0.3 })) +
  sh("M-34 -60 L-54 -100 Q-26 -82 0 -100 Q26 -82 54 -100 L34 -60 Z", "earth", { tone: 2 }) + sh(RR(-36, -64, 72, 16, 8), "red") + T("$", 0, 74, { size: 78, c: "brown" }), { box: [-120, -120, 240, 240] });

const chartBars = (up) => [40, 70, 100, 130].map((h, i) => sh(RR(-84 + i * 44, 84 - (up ? h : 170 - h), 34, up ? h : 170 - h, 5), "sky", { w: "detail" })).join("");
reg("money-chart-up", "Chart arrow up", MN, ["growth", "profit", "stocks", "graph", "success"], () => {
  const pts = [[-70, 20], [-26, -8], [8, 6], [66, -66]];
  return chartBars(true) + tube(L.poly(pts), "green", 14) + sh(head(pts[2], pts[3], 34), "green");
}, { box: [-120, -110, 240, 210] });
reg("money-chart-down", "Chart arrow down", MN, ["loss", "crash", "stocks", "graph", "decline"], () => {
  const pts = [[-70, -60], [-26, -30], [8, -42], [66, 34]];
  return chartBars(false) + tube(L.poly(pts), "red", 14) + sh(head(pts[2], pts[3], 34), "red");
}, { box: [-120, -110, 240, 210] });

// =====================================================================================================================
// MEDICAL
// =====================================================================================================================
const MD = "Medical";
reg("med-pill-bottle", "Pill bottle", MD, ["medicine", "pharmacy", "tablets", "drugs"], () =>
  solid(RR(-52, -62, 104, 152, 16), "orange", L.stroke("M-38 -40 V70", { c: "white", w: 8, op: 0.4 })) + sh(RR(-58, -102, 116, 46, 10), "white") + [-36, -18, 0, 18, 36].map((x) => ln([x, -96], [x, -62], { w: "detail", op: 0.5 })).join("") +
  sh(RR(-52, -26, 104, 82, 6), "white", { w: "detail" }) + plus(0, 14, 24, 9, "green"), { box: [-90, -120, 180, 230] });

reg("med-pills", "Pills", MD, ["medicine", "capsule", "tablet", "pharmacy"], () =>
  G(solid(RR(-70, -26, 140, 52, 26), "red", fl("M0 -40 H80 V40 H0 Z", "white") + L.stroke("M-52 -14 H-8", { c: "white", w: 6, op: 0.5 })), "translate(-8 -34) rotate(-28)") +
  dot(48, 40, 38, "white") + L.stroke("M20 40 H76", { w: "detail" }) + gl("M26 20 Q34 10 46 8", 0) + L.stroke("M26 24 Q32 14 44 10", { c: "white", w: 6, op: 0.8 }) +
  G(solid(RR(-42, -16, 84, 32, 16), "blue", fl("M0 -20 H50 V20 H0 Z", "yellow")), "translate(-52 56) rotate(18)"), { box: [-130, -110, 260, 200] });

reg("med-first-aid-kit", "First-aid kit", MD, ["emergency", "box", "medical", "safety"], () =>
  tube("M-32 -58 V-76 Q-32 -90 -18 -90 H18 Q32 -90 32 -76 V-58", "gray", 10) + solid(RR(-100, -60, 200, 130, 16), "green", L.stroke("M-100 -26 H100", { c: "ink", w: 3, op: 0.25 })) + sh(RR(-6, -44, 12, 22, 3), "gray", { w: "detail" }) + plus(0, 4, 42, 14, "white", { w: "prop" }) +
  sh(RR(-96, -24, 10, 26, 3), "gray", { w: "detail" }) + sh(RR(86, -24, 10, 26, 3), "gray", { w: "detail" }) + L.stroke("M-84 -50 H-30", { c: "white", w: 6, op: 0.4 }), { box: [-120, -110, 240, 200] });

reg("med-stethoscope", "Stethoscope", MD, ["doctor", "heart", "health", "listen"], () =>
  tubes([["M-52 -92 C-52 -24 -26 -2 0 22", "navy", 10], ["M52 -92 C52 -24 26 -2 0 22", "navy", 10], ["M0 22 C0 78 78 78 72 28", "navy", 10]]) +
  dot(-52, -96, 10, "gray", { w: "detail" }) + dot(52, -96, 10, "gray", { w: "detail" }) + sh(RR(-8, 18, 16, 14, 4), "gray", { w: "detail" }) + dot(72, 10, 26, "gray") + dot(72, 10, 14, "white", { w: "detail" }) + fl(C(66, 4, 4), "white", 0.8), { box: [-110, -120, 220, 230] });

reg("med-bandage", "Adhesive bandage", MD, ["plaster", "first aid", "injury", "heal"], () =>
  G(solid(RR(-104, -30, 208, 60, 30), "s3", [[-86, -14], [-64, 14], [-86, 14], [64, -14], [86, 14], [64, 14], [86, -14]].map(([x, y]) => fl(C(x, y, 3.5), "ink", 0.22)).join("")) + sh(RR(-40, -30, 80, 60, 4), "cream", { w: "detail" }) + [-24, -8, 8, 24].map((x) => [-14, 6].map((y) => fl(C(x, y, 2.5), "ink", 0.18)).join("")).join("") + L.stroke("M-90 -20 H-56", { c: "white", w: 6, op: 0.4 }), "rotate(-24)"), { box: [-130, -100, 260, 200] });

reg("med-heart-monitor", "Heart monitor", MD, ["ecg", "hospital", "pulse", "heartbeat"], () =>
  sh(RR(-34, 70, 68, 12, 5), "gray") + sh(RR(-10, 52, 20, 22, 3), "gray") + solid(RR(-112, -80, 224, 138, 16), "gray") + sh(RR(-100, -68, 200, 114, 8), "navy", { w: "detail" }) +
  L.stroke(L.poly([[-90, 8], [-52, 8], [-42, -6], [-32, 8], [-16, 8], [-6, -44], [6, 40], [16, 8], [36, 8], [44, -4], [52, 8], [90, 8]]), { c: "green", w: 5 }) + L.stroke("M-100 -22 H100 M-100 30 H100", { c: "green", w: 1.5, op: 0.18 }) +
  G(fl("M0 14 C-18 2 -14 -12 -6 -12 C-2 -12 0 -9 0 -6 C0 -9 2 -12 6 -12 C14 -12 18 2 0 14 Z", "red"), "translate(-72 -42)") + T("72", 70, -42, { size: 34, c: "yellow" }), { box: [-130, -100, 260, 200] });

reg("med-wheelchair", "Wheelchair", MD, ["accessibility", "hospital", "disability", "chair"], () => {
  const rim = solid(C(0, 0, 55) + C(0, 0, 46), "ink", "", { eo: true, w: "detail" });
  const spokes = Array.from({ length: 8 }, (_, i) => ln([0, 0], [46 * Math.cos(deg(i * 45)), 46 * Math.sin(deg(i * 45))], { w: "detail", op: 0.6 })).join("");
  return L.shadow(10, 0, 190) + G(rim + spokes + L.stroke(C(0, 0, 40), { c: "gray", w: 3 }) + dot(0, 0, 8, "gray", { w: "detail" }), "translate(-20 -55)") +
    tubes([["M-20 -55 L38 -82", "gray", 8], ["M42 -88 L60 -34", "gray", 8], ["M-52 -132 H4 V-96", "gray", 8], ["M-46 -96 L-60 -172 L-82 -178", "gray", 9], ["M46 -80 L68 -40", "gray", 8]]) +
    sh(P([[-48, -100], [-60, -166], [-44, -166], [-36, -100]], true), "blue") + sh(RR(-52, -102, 100, 16, 7), "blue") + sh(RR(54, -44, 38, 9, 4), "gray", { w: "detail" }) + G(dot(0, 0, 14, "ink", { w: "detail" }) + dot(0, 0, 5, "gray", { w: "detail" }), "translate(62 -14)") + tube("M60 -34 L62 -20", "gray", 7);
}, { box: [-110, -200, 240, 215] });

reg("med-crutches", "Crutches", MD, ["injury", "walking", "broken leg", "hospital"], () => {
  const one = (r, c) => G(tubes([["M0 -128 V96", "gray", 9], ["M-8 -22 H24", c, 12]]) + sh(C(2, -84, 15, 24), c, { w: "detail" }) + tube("M0 -128 q12 -4 12 -22", "gray", 8) + sh(RR(-8, 94, 16, 16, 6), "ink", { w: "detail" }) + L.stroke("M-3 -100 V60", { c: "white", w: 3, op: 0.5 }), `translate(${r * 1.6} 0) rotate(${r} 0 100)`);
  return one(-12, "orange") + one(12, "orange");
}, { box: [-120, -170, 240, 300] });

reg("med-xray", "X-ray sheet", MD, ["radiology", "bones", "hand", "scan"], () => {
  const seg = (x, y, w, h) => fl(RR(x - w / 2, y - h, w, h, w / 2), "white", 0.92);
  let hand = "";
  [[-33, 0.8, -9], [-11, 0.98, -3], [11, 1.1, 3], [33, 1, 9]].forEach(([x, k, r]) => { let f = seg(x, 26, 9, 52), y = -30; [26, 20, 16].forEach((l) => { f += seg(x, y, 8, l * k); y -= l * k + 4; }); hand += G(f, `rotate(${r} ${x} 26)`); });
  const thumb = G(seg(0, 0, 10, 34) + seg(0, -38, 9, 24) + seg(0, -66, 8, 20), "translate(44 30) rotate(34)");
  const wrist = seg(-10, 112, 11, 60) + seg(9, 112, 13, 60) + seg(0, 40, 62, 14) + fl(C(0, 28, 50, 36), "white", 0.12);
  return solid(RR(-86, -108, 172, 216, 14), "navy", fl(C(0, -10, 78), "sky", 0.12) + G(hand + thumb + wrist, "translate(0 18)")) + [[-76, -98], [66, -98], [-76, 90], [66, 90]].map(([x, y]) => sh(RR(x, y, 10, 10, 3), "gray", { w: "detail" })).join("");
}, { box: [-110, -130, 220, 260] });

reg("med-tooth", "Tooth", MD, ["dentist", "teeth", "smile", "health"], () =>
  solid("M-50 -62 C-50 -98 -10 -88 0 -74 C10 -88 50 -98 50 -62 C50 -12 36 0 32 50 C30 96 12 96 10 56 C8 30 -8 30 -10 56 C-12 96 -30 96 -32 50 C-36 0 -50 -12 -50 -62 Z", "white", shd("M30 -100 V110 H80 V-100 Z", 0.1)) +
  L.stroke("M-34 -66 Q-34 -80 -18 -80", { c: "sky", w: 7, op: 0.8 }) + fl(L.star(62, -78, 14, 5, 4, -90), "yellow") + fl(L.star(-66, -26, 9, 3, 4, -90), "yellow"), { box: [-100, -120, 200, 240] });

// =====================================================================================================================
// SPORTS
// =====================================================================================================================
const SPT = "Sports";
reg("sport-football", "Football (soccer ball)", SPT, ["soccer", "ball", "game", "kick"], () => {
  let inner = "";
  for (let k = 0; k < 5; k++) { const a = -90 + 72 * k, a2 = a + 36; inner += ln([24 * Math.cos(deg(a)), 24 * Math.sin(deg(a))], [86 * Math.cos(deg(a)), 86 * Math.sin(deg(a))], { w: "detail" }) + sh(ngon(86 * Math.cos(deg(a2)), 86 * Math.sin(deg(a2)), 28, 5, a2 + 180), "ink", { w: "detail", flat: true }); }
  return solid(C(0, 0, 82), "white", inner + sh(ngon(0, 0, 26, 5), "ink", { w: "detail", flat: true }) + gl(C(-30, -34, 12, 8), 0.7));
});
reg("sport-basketball", "Basketball", SPT, ["ball", "hoops", "nba-style", "game"], () =>
  solid(C(0, 0, 80), "orange", ["M0 -90 V90", "M-90 0 H90", "M-60 -56 Q-18 0 -60 56", "M60 -56 Q18 0 60 56"].map((d) => L.stroke(d, { w: "prop", s: 0.8 })).join("") + gl(C(-30, -34, 12, 8), 0.5)));
reg("sport-american-football", "American football", SPT, ["rugby-ish", "ball", "nfl-style", "game"], () =>
  G(solid("M-98 0 Q0 -66 98 0 Q0 66 -98 0 Z", "brown", fl("M-72 -60 Q-60 0 -72 60 H-58 Q-46 0 -58 -60 Z", "white") + fl("M72 -60 Q60 0 72 60 H58 Q46 0 58 -60 Z", "white") + L.stroke("M-30 -34 Q0 -42 30 -34", { c: "white", w: 6, op: 0.25 })) + ln([-36, 0], [36, 0], { w: "detail", c: "white" }) +
    [-24, -8, 8, 24].map((x) => L.stroke(L.line([x, -9], [x, 9]), { c: "white", w: 4 })).join(""), "rotate(-24)"), { box: [-120, -90, 240, 180] });
reg("sport-tennis-racket", "Tennis racket and ball", SPT, ["tennis", "racquet", "ball", "game"], () => {
  const strings = grid(-44, -102, 44, 10, 6, 8, { w: 2, c: "gray", op: 0.7 });
  return G(tubes([["M-16 8 L-6 40", "gray", 7], ["M16 8 L6 40", "gray", 7]]) + sh(RR(-9, 34, 18, 74, 7), "red") + [50, 64, 78, 92].map((y) => L.stroke(L.line([-9, y], [9, y + 6]), { w: "detail", op: 0.4 })).join("") +
    solid(C(0, -46, 44, 56), "cream", strings) + L.stroke(C(0, -46, 44, 56), { c: "blue", w: 9 }), "translate(-20 -6) rotate(-34)") +
    dot(66, 64, 26, "yellow") + L.stroke("M46 50 Q58 62 46 80 M86 50 Q74 62 86 78", { c: "white", w: 4 }) + gl("M52 50 Q58 44 66 44", 0);
}, { box: [-120, -130, 240, 250] });
reg("sport-dumbbell", "Dumbbell", SPT, ["gym", "weights", "fitness", "lift"], () =>
  G(sh(RR(-60, -9, 120, 18, 6), "gray") + [-1, 1].map((k) => sh(RR(k > 0 ? 56 : -80, -52, 24, 104, 8), "navy") + sh(RR(k > 0 ? 40 : -56, -38, 16, 76, 6), "navy", { tone: 1 })).join("") + gl("M-74 -42 V30", 0) + L.stroke("M-72 -40 V30", { c: "white", w: 4, op: 0.35 }) + L.stroke("M-26 -4 H26", { c: "white", w: 3, op: 0.5 }), "rotate(-18)"), { box: [-130, -100, 260, 200] });
reg("sport-kettlebell", "Kettlebell", SPT, ["gym", "weights", "fitness", "lift"], () =>
  tube("M-38 -14 C-48 -86 48 -86 38 -14", "ink", 16) + solid(C(0, 26, 62), "ink", fl("M-40 80 Q0 100 40 80 V100 H-40 Z", "ink", 0)) + fl(C(0, 30, 28, 24), "white", 0.18) + T("16", 0, 42, { size: 30, c: "white" }) + L.stroke("M-44 4 Q-38 -14 -22 -20", { c: "white", w: 7, op: 0.45 }), { box: [-100, -110, 200, 210] });
reg("sport-trophy", "Trophy", SPT, ["winner", "cup", "champion", "award"], () =>
  tubes([["M-52 -78 C-96 -80 -90 -26 -42 -22", "gold", 10], ["M52 -78 C96 -80 90 -26 42 -22", "gold", 10]]) + sh(RR(-12, -4, 24, 56, 4), "gold") + sh(RR(-44, 46, 88, 16, 6), "gold") + sh(RR(-62, 60, 124, 30, 7), "wood") + sh(RR(-24, 66, 48, 16, 4), "gold", { w: "detail" }) +
  solid("M-58 -96 H58 C58 -34 36 -6 0 0 C-36 -6 -58 -34 -58 -96 Z", "gold", L.stroke("M-42 -84 Q-42 -40 -20 -20", { c: "white", w: 8, op: 0.55 })) + sh(L.star(0, -52, 22, 9), "yellow", { w: "detail" }), { box: [-120, -120, 240, 230] });
reg("sport-medal", "Medal", SPT, ["winner", "award", "first place", "champion"], () =>
  sh(P([[-52, -112], [-14, -112], [24, -14], [-14, -14]], true), "red") + sh(P([[14, -112], [52, -112], [14, -14], [-24, -14]], true), "blue") + sh(RR(-12, -22, 24, 18, 6), "gold", { w: "detail" }) +
  dot(0, 42, 56, "gold") + ring(C(0, 42, 44), "gold", 4) + sh(L.star(0, 42, 30, 13), "yellow", { w: "detail" }) + L.stroke("M-38 22 Q-30 8 -12 4", { c: "white", w: 6, op: 0.6 }), { box: [-90, -125, 180, 250] });
reg("sport-stopwatch", "Stopwatch", SPT, ["timer", "race", "time", "clock"], () => {
  const ticks = Array.from({ length: 12 }, (_, i) => { const a = deg(i * 30 - 90), r0 = i % 3 ? 56 : 50; return L.stroke(L.line([r0 * Math.cos(a), 10 + r0 * Math.sin(a)], [64 * Math.cos(a), 10 + 64 * Math.sin(a)]), { w: i % 3 ? "detail" : "prop" }); }).join("");
  return sh(RR(-10, -102, 20, 24, 4), "gray") + sh(RR(-18, -112, 36, 12, 5), "gray") + G(sh(RR(-8, -98, 16, 22, 4), "gray"), "rotate(42 0 10)") +
    dot(0, 10, 80, "blue") + dot(0, 10, 68, "white", { w: "detail" }) + ticks + L.stroke("M0 10 L28 -34", { c: "red", w: 5 }) + L.stroke("M0 10 L-30 28", { w: "prop" }) + dot(0, 10, 8, "ink", { flat: true }) + gl("M-60 -14 Q-52 -40 -28 -52", 0) + L.stroke("M-70 -6 Q-62 -40 -34 -58", { c: "white", w: 6, op: 0.6 });
}, { box: [-110, -130, 220, 230] });
reg("sport-whistle", "Whistle", SPT, ["referee", "coach", "pe", "sound"], () =>
  tube("M54 -52 C66 -108 -30 -112 -52 -56", "red", 5) + sh(RR(-108, -4, 100, 36, 12), "blue") + sh(C(24, 10, 50), "blue") + sh(RR(-70, -8, 30, 10, 4), "navy", { w: "detail" }) + fl(C(26, 6, 14), "ink", 0.85) + fl(C(22, 2, 5), "white", 0.7) +
  tube("M54 -52 a8 8 0 1 1 0.1 0", "gray", 6) + L.stroke("M-96 6 H-24", { c: "white", w: 6, op: 0.45 }), { box: [-130, -110, 240, 190] });
reg("sport-bike-helmet", "Bicycle helmet", SPT, ["cycling", "safety", "head", "protection"], () => {
  const vents = [[-69, -24, -50], [-23, -55, -18], [34, -57, 15], [79, -31, 45]].map(([x, y, a]) => G(fl(C(0, 0, 8, 28), "ink", 0.8), `translate(${x} ${y}) rotate(${a})`)).join("");
  return tubes([["M-34 34 L-44 78", "ink", 5], ["M34 34 L42 78", "ink", 5]]) + sh(RR(-12, 74, 22, 14, 4), "gray", { w: "detail" }) +
    solid("M-98 34 C-98 -52 -40 -86 8 -86 C60 -86 100 -40 100 34 Z", "green", vents + fl("M-110 18 H110 V34 H-110 Z", "ink", 0.85) + L.stroke("M-84 -10 Q-66 -62 -20 -76", { c: "white", w: 7, op: 0.5 })) + sh(P([[72, 8], [114, 22], [106, 36], [72, 36]], true), "green", { tone: 2, w: "detail" });
}, { box: [-120, -110, 250, 210] });
reg("sport-skateboard", "Skateboard", SPT, ["skate", "deck", "trick", "street"], () =>
  tube("M-124 -26 Q-102 0 -70 0 H70 Q102 0 124 -26", "orange", 14) + L.stroke("M-70 -3 H70", { c: "white", w: 3, op: 0.5 }) + sh(RR(-76, 12, 30, 10, 3), "gray", { w: "detail" }) + sh(RR(46, 12, 30, 10, 3), "gray", { w: "detail" }) +
  [-60, 60].map((x) => dot(x, 36, 17, "yellow") + dot(x, 36, 6, "gray", { w: "detail" })).join(""), { box: [-150, -60, 300, 130] });
reg("sport-goal-net", "Goal and net", SPT, ["soccer", "football", "score", "post"], () => {
  const netO = { w: 2, c: "gray", op: 0.7 };
  const back = fl(P([[-112, -122], [112, -122], [112, -26], [-112, -26]], true), "white", 0.35) + grid(-112, -122, 112, -26, 14, 6, netO);
  const roof = fl(P([[-140, -152], [140, -152], [112, -122], [-112, -122]], true), "white", 0.3);
  let roofG = ""; for (let i = 1; i < 14; i++) roofG += ln([-140 + (280 * i) / 14, -152], [-112 + (224 * i) / 14, -122], netO); for (let j = 1; j < 3; j++) roofG += ln([-140 + 28 * (j / 3), -152 + 30 * (j / 3)], [140 - 28 * (j / 3), -152 + 30 * (j / 3)], netO);
  const side = (k) => { let r = fl(P([[k * 140, -152], [k * 112, -122], [k * 112, -26], [k * 140, 0]], true), "white", 0.3); for (let i = 1; i < 4; i++) { const t = i / 4; r += ln([k * (140 - 28 * t), -152 + 30 * t], [k * (140 - 28 * t), -26 * t], netO); } for (let j = 1; j < 6; j++) r += ln([k * 140, -152 + (152 * j) / 6], [k * 112, -122 + (96 * j) / 6], netO); return r; };
  return L.shadow(0, 0, 330) + back + roof + roofG + side(-1) + side(1) + tubes([["M-112 -26 V-122", "gray", 6], ["M112 -26 V-122", "gray", 6], ["M-140 0 L-112 -26", "gray", 5], ["M140 0 L112 -26", "gray", 5]]) + tubes([["M-140 0 V-152 H140 V0", "white", 13], ["M-140 -152 L-112 -122 H112 L140 -152", "white", 7]]);
}, { box: [-180, -190, 360, 215] });

// =====================================================================================================================
// VEHICLES  (side view, facing right, standing on the ground at y = 0; { color } picks the body colour; { flip: true } faces left)
// =====================================================================================================================
const VH = "Vehicles";
const veh = (name, label, tags, fn, box, color) => reg("veh-" + name, label, VH, ["vehicle", "transport", ...tags], fn, { box: [box[0], box[1], box[2], box[3] + 34], demo: color ? { color } : {}, wide: true, call: `L.put(S, "veh-${name}", x, gy, { color, flip, s, t })` });
const arches = (xs, y, r) => xs.map((x) => fl(C(x, y, r), "ink")).join("");
const winGlare = (x, y) => fl(P([[x, y], [x + 14, y], [x - 8, y + 30], [x - 22, y + 30]], true), "white", 0.5);

const carBase = (o, def, ex = {}) => {
  const c = pick(o, "color", def);
  const body = "M-175 -30 Q-178 -70 -150 -78 L-105 -84 C-95 -98 -85 -128 -50 -130 L40 -130 C70 -128 85 -100 100 -84 L150 -76 Q178 -70 175 -30 Q175 -22 165 -22 L-165 -22 Q-175 -22 -175 -30 Z";
  return L.shadow(0, 0, 400) + (ex.top || "") +
    solid(body, c, arches([-100, 100], -30, 38) + shd("M-180 -44 H180 V-20 H-180 Z", 0.14) + (ex.inner || "") + L.stroke("M-140 -78 Q0 -88 120 -76", { c: "white", w: 6, op: 0.4 })) +
    sh("M-96 -90 C-90 -108 -80 -121 -56 -123 L-8 -123 V-90 Z", "glass", { w: "detail" }) + sh("M4 -123 L38 -123 C58 -120 72 -106 86 -90 L4 -90 Z", "glass", { w: "detail" }) + winGlare(-52, -120) + winGlare(20, -120) +
    L.stroke("M-8 -90 V-28", { w: "detail" }) + sh(RR(-26, -80, 14, 5, 2), "gray", { w: "detail" }) + sh(RR(14, -80, 14, 5, 2), "gray", { w: "detail" }) +
    sh(RR(154, -68, 20, 14, 5), "yellow", { w: "detail" }) + sh(RR(-178, -66, 14, 16, 4), "red", { w: "detail" }) + sh(RR(150, -38, 30, 12, 5), "gray", { w: "detail" }) + sh(RR(-180, -38, 28, 12, 5), "gray", { w: "detail" }) +
    (ex.over || "") + wheel(-100, -30, 30) + wheel(100, -30, 30);
};
const checker = Array.from({ length: 28 }, (_, i) => [0, 1].map((r) => ((i + r) % 2 ? fl(`M${-170 + i * 12} ${-60 + r * 8} h12 v8 h-12 Z`, "ink") : "")).join("")).join("");
veh("car", "Car", ["sedan", "auto"], (o) => carBase(o, "red"), [-210, -150, 420, 170], "red");
veh("taxi", "Taxi (generic)", ["cab", "city", "yellow"], (o) => carBase(o, "yellow", { inner: checker, top: sh(RR(-26, -152, 52, 24, 7), "white") + T("TAXI", 0, -134, { size: 17 }) }), [-210, -170, 420, 190], "yellow");
veh("police-car", "Police car (generic)", ["cop", "law", "patrol"], (o) => carBase(o, "white", { inner: fl("M-180 -66 H180 V-52 H-180 Z", "blue"), top: sh(RR(-24, -148, 24, 18, 5), "blue") + sh(RR(0, -148, 24, 18, 5), "red"), over: T("POLICE", 0, -54, { size: 14, c: "white" }) }), [-210, -170, 420, 190], "white");

veh("bus", "City bus", ["public transport", "coach"], (o) => {
  const c = pick(o, "color", "blue"), win = [-196, -136, -76, -16, 44].map((x) => sh(RR(x, -130, 54, 46, 6), "glass", { w: "detail" }) + winGlare(x + 24, -128)).join("");
  return L.shadow(0, 0, 470) + solid("M-220 -40 V-130 Q-220 -150 -200 -150 H178 Q205 -150 214 -126 L222 -60 V-34 Q222 -22 210 -22 H-208 Q-220 -22 -220 -34 Z", c, arches([-140, 124], -32, 40) + fl("M-230 -76 H230 V-62 H-230 Z", "white", 0.9) + shd("M-230 -42 H230 V-20 H-230 Z", 0.14)) + win +
    sh(RR(108, -130, 40, 96, 4), "glass", { w: "detail" }) + L.stroke("M128 -130 V-34", { w: "detail" }) + sh(P([[158, -130], [196, -130], [212, -90], [158, -90]], true), "glass", { w: "detail" }) + sh(RR(158, -146, 46, 10, 3), "ink", { w: "detail" }) +
    sh(RR(206, -52, 16, 14, 4), "yellow", { w: "detail" }) + sh(RR(-222, -56, 10, 16, 3), "red", { w: "detail" }) + wheel(-140, -32, 32) + wheel(124, -32, 32);
}, [-250, -170, 500, 190], "blue");

veh("school-bus", "School bus", ["children", "yellow", "school"], (o) => {
  const c = pick(o, "color", "yellow"), win = [-200, -152, -104, -56, -8].map((x) => sh(RR(x, -132, 42, 38, 5), "glass", { w: "detail" })).join("");
  return L.shadow(0, 0, 470) + solid("M-220 -34 V-136 Q-220 -150 -206 -150 H100 Q112 -150 114 -138 V-100 H190 Q215 -100 220 -80 V-34 Q220 -22 208 -22 H-208 Q-220 -22 -220 -34 Z", c, arches([-140, 130], -34, 42) + fl("M-230 -82 H230 V-74 H-230 Z", "ink") + fl("M-230 -50 H230 V-42 H-230 Z", "ink") + shd("M-230 -40 H230 V-20 H-230 Z", 0.12)) + win +
    sh(RR(48, -132, 44, 100, 4), "glass", { w: "detail" }) + L.stroke("M70 -132 V-32", { w: "detail" }) + sh(P([[98, -132], [110, -132], [110, -104], [98, -104]], true), "glass", { w: "detail" }) + T("SCHOOL BUS", -20, -57, { size: 19 }) + sh(RR(-216, -156, 16, 8, 3), "red", { w: "detail" }) + sh(RR(88, -156, 16, 8, 3), "orange", { w: "detail" }) +
    sh(RR(204, -76, 14, 14, 4), "white", { w: "detail" }) + sh(RR(-222, -70, 8, 16, 3), "red", { w: "detail" }) + sh(RR(196, -42, 26, 12, 5), "gray", { w: "detail" }) + wheel(-140, -34, 34) + wheel(130, -34, 34);
}, [-250, -180, 500, 200], "yellow");

veh("truck", "Delivery truck", ["lorry", "cargo", "van"], (o) => {
  const c = pick(o, "color", "orange");
  return L.shadow(0, 0, 480) + sh(RR(-236, -52, 440, 22, 6), "gray") + solid(RR(-236, -200, 300, 152, 8), "white", fl("M-250 -92 Q-170 -112 -90 -92 T70 -92 V-70 Q-10 -90 -90 -70 T-250 -70 Z", c) + [-176, -116, -56, 4].map((x) => L.stroke(L.line([x, -200], [x, -50]), { w: "detail", op: 0.2 })).join("")) +
    solid("M70 -40 V-150 H128 Q148 -150 158 -134 L190 -96 Q204 -92 206 -72 V-40 Z", c, arches([140], -34, 40)) + sh(P([[84, -140], [124, -140], [150, -106], [84, -106]], true), "glass", { w: "detail" }) + winGlare(104, -138) + sh(RR(84, -100, 14, 5, 2), "gray", { w: "detail" }) +
    sh(RR(194, -76, 14, 14, 4), "yellow", { w: "detail" }) + sh(RR(190, -48, 24, 12, 5), "gray", { w: "detail" }) + sh(RR(54, -190, 10, 70, 4), "gray", { w: "detail" }) + wheel(-170, -34, 34) + wheel(-110, -34, 34) + wheel(140, -34, 34);
}, [-270, -220, 520, 240], "orange");

veh("bicycle", "Bicycle", ["bike", "cycling", "pedal"], (o) => {
  const c = pick(o, "color", "red"), B = [-4, -48], S = [-34, -134], H = [60, -128], Hb = [68, -104], RA = [-90, -56], FA = [90, -56];
  const wh = (cx) => G(solid(C(0, 0, 56) + C(0, 0, 49), "ink", "", { eo: true, w: "detail" }) + Array.from({ length: 12 }, (_, i) => ln([0, 0], [49 * Math.cos(deg(i * 30)), 49 * Math.sin(deg(i * 30))], { w: 1.6, c: "gray" })).join("") + dot(0, 0, 7, "gray", { w: "detail" }), `translate(${cx} -56)`);
  return L.shadow(0, 0, 220) + wh(-90) + wh(90) + tubes([[L.line(RA, S), c, 7], [L.line(RA, B), c, 7], [L.line(B, S), c, 8], [L.line(S, H), c, 8], [L.line(B, Hb), c, 8], [L.line(H, Hb), c, 9], [L.line([62, -120], FA), "gray", 7], [`M${H[0]} ${H[1]} L52 -152 L76 -150`, "gray", 6], [L.line(S, [-36, -148]), "gray", 6]]) +
    sh(RR(-62, -158, 44, 12, 6), "ink") + dot(-4, -48, 15, "gray", { w: "detail" }) + L.stroke(L.line([-4, -48], [-90, -56]), { w: 2, c: "ink", op: 0.7 }) + tube("M-4 -48 L10 -22", "gray", 6) + sh(RR(2, -24, 24, 7, 3), "ink", { w: "detail" }) + dot(-4, -48, 5, "ink", { flat: true }) + sh(RR(54, -134, 14, 16, 4), "yellow", { w: "detail" });
}, [-190, -190, 380, 200], "red");

veh("motorbike", "Motorbike", ["motorcycle", "bike", "scooter"], (o) => {
  const c = pick(o, "color", "red"), wh = (cx) => G(solid(C(0, 0, 44) + C(0, 0, 33), "ink", "", { eo: true, w: "detail" }) + dot(0, 0, 25, "gray", { w: "detail" }) + dot(0, 0, 7, "ink", { w: "detail" }), `translate(${cx} -44)`);
  return L.shadow(0, 0, 300) + wh(-115) + wh(115) + tubes([["M104 -118 L115 -44", "gray", 9], ["M-20 -66 L-115 -44", "gray", 7]]) +
    sh(RR(-82, -86, 112, 54, 16), "gray") + sh(RR(-96, -62, 124, 12, 6), "gray", { tone: 2 }) + sh(RR(-130, -66, 88, 14, 7), "gray", { w: "detail" }) + L.stroke("M-70 -78 H10 M-70 -60 H10", { w: "detail", op: 0.4 }) +
    sh("M-66 -112 Q-10 -142 52 -118 L62 -92 Q0 -82 -64 -92 Z", c) + sh("M-112 -112 Q-84 -128 -50 -112 L-58 -98 Q-92 -92 -118 -98 Z", "ink", { w: "detail" }) +
    sh("M88 -76 Q124 -92 140 -62 L108 -56 Z", c, { tone: 2, w: "detail" }) + tube("M100 -124 L80 -150 L58 -152", "gray", 7) + sh(C(112, -112, 15), "yellow", { w: "detail" }) + L.stroke("M-52 -120 Q-20 -134 14 -122", { c: "white", w: 6, op: 0.5 });
}, [-190, -170, 380, 180], "red");

veh("train", "Train", ["rail", "locomotive", "railway"], (o) => {
  const c = pick(o, "color", "red"), c2 = pick(o, "color2", "blue");
  const carr = (x) => solid(RR(x, -140, 210, 112, 12), c2, fl(`M${x} -64 H${x + 210} V-52 H${x} Z`, "white", 0.9) + shd(`M${x} -42 H${x + 210} V-20 H${x} Z`, 0.12)) + [0, 1, 2, 3].map((i) => sh(RR(x + 14 + i * 48, -122, 38, 40, 6), "glass", { w: "detail" })).join("") + sh(RR(x - 2, -90, 6, 26, 2), "gray", { w: "detail" });
  const wh = (x) => wheel(x - 16, -18, 16) + wheel(x + 16, -18, 16);
  return L.shadow(0, 0, 680) + sh(RR(-350, -4, 690, 8, 2), "gray", { w: "detail" }) + Array.from({ length: 29 }, (_, i) => fl(RR(-346 + i * 24, 2, 12, 5, 1), "wood")).join("") +
    carr(-336) + carr(-120) + solid("M104 -28 V-146 Q104 -158 118 -158 H250 Q302 -154 324 -96 V-34 Q324 -28 314 -28 Z", c, fl("M100 -66 H340 V-52 H100 Z", "white", 0.9) + shd("M100 -44 H340 V-20 H100 Z", 0.12)) +
    sh(P([[262, -142], [292, -118], [298, -92], [256, -92]], true), "glass", { w: "detail" }) + sh(RR(120, -136, 76, 40, 6), "glass", { w: "detail" }) + sh(C(316, -50, 8), "yellow", { w: "detail" }) + sh(RR(-130, -90, 12, 26, 2), "gray", { w: "detail" }) +
    wh(-290) + wh(-180) + wh(-74) + wh(40) + wh(140) + wh(270);
}, [-370, -180, 720, 200], "red");

veh("tram", "Tram", ["streetcar", "city", "electric"], (o) => {
  const c = pick(o, "color", "green");
  return L.shadow(0, 0, 420) + ln([-250, -222], [250, -222], { w: 2.5 }) + tubes([["M0 -152 L-34 -188 L22 -206", "gray", 5]]) + sh(RR(-14, -216, 64, 8, 3), "gray", { w: "detail" }) + sh(RR(-250, -4, 500, 8, 2), "gray", { w: "detail" }) +
    solid(RR(-196, -156, 392, 124, 28), c, fl("M-200 -70 H200 V-56 H-200 Z", "white", 0.9) + shd("M-200 -46 H200 V-30 H-200 Z", 0.14)) + [-168, -112, -56, 0, 56].map((x) => sh(RR(x, -138, 48, 50, 8), "glass", { w: "detail" }) + winGlare(x + 22, -136)).join("") +
    sh(RR(116, -138, 30, 100, 6), "glass", { w: "detail" }) + L.stroke("M131 -138 V-40", { w: "detail" }) + sh(P([[154, -140], [182, -140], [188, -92], [154, -92]], true), "glass", { w: "detail" }) + sh(RR(146, -154, 40, 10, 3), "ink", { w: "detail" }) + sh(C(188, -62, 7), "yellow", { w: "detail" }) +
    wheel(-132, -18, 18) + wheel(-76, -18, 18) + wheel(76, -18, 18) + wheel(132, -18, 18);
}, [-270, -240, 540, 260], "green");

veh("plane", "Airliner", ["aeroplane", "airplane", "jet", "flight"], (o) => {
  const c = pick(o, "color", "blue");
  return L.shadow(0, 0, 420) + tubes([["M-30 -56 V-30", "gray", 8], ["M190 -58 V-24", "gray", 7]]) + sh(P([[-250, -96], [-268, -196], [-216, -196], [-130, -112]], true), c) + sh(P([[-226, -104], [-160, -96], [-196, -82]], true), c, { tone: 2, w: "detail" }) +
    solid("M-250 -86 Q-250 -112 -222 -116 L200 -120 Q270 -118 270 -90 Q270 -62 200 -58 L-210 -56 Q-250 -58 -250 -86 Z", "white", fl("M-260 -82 Q0 -72 280 -82 V-70 Q0 -60 -260 -70 Z", c) + shd("M-260 -72 H280 V-50 H-260 Z", 0.1)) +
    Array.from({ length: 14 }, (_, i) => sh(C(-196 + i * 28, -100, 6), "glass", { w: 2 })).join("") + sh(P([[218, -114], [254, -108], [262, -96], [218, -96]], true), "glass", { w: "detail" }) +
    sh(P([[-20, -84], [-112, -56], [-64, -52], [44, -84]], true), "gray") + sh(RR(-44, -62, 76, 28, 14), "gray") + sh(C(30, -48, 11, 12), "ink", { w: "detail" }) + wheel(-30, -16, 16) + wheel(190, -14, 14);
}, [-290, -210, 580, 230], "blue");

veh("helicopter", "Helicopter", ["chopper", "rotor", "flying"], (o) => {
  const c = pick(o, "color", "orange");
  return L.shadow(0, 0, 300) + tubes([["M-56 -22 H96 q18 0 22 -12", "gray", 6], ["M-18 -56 L-26 -22", "gray", 6], ["M62 -56 L66 -22", "gray", 6]]) + sh(L.limb([[-36, -92], [-110, -98], [-188, -104]], 34, 14), c) + sh(P([[-190, -100], [-212, -154], [-190, -154], [-166, -100]], true), c, { tone: 2 }) +
    L.stroke(C(-198, -118, 22), { c: "gray", w: 4, op: 0.55 }) + dot(-198, -118, 5, "gray", { w: "detail" }) +
    solid("M-36 -92 C-36 -140 36 -156 84 -126 C116 -106 114 -70 92 -56 L-10 -50 Q-36 -56 -36 -92 Z", c, fl("M-50 -80 H130 V-68 H-50 Z", "white", 0.9) + shd("M-50 -64 H130 V-40 H-50 Z", 0.12)) +
    sh("M34 -128 C62 -126 90 -112 98 -88 L98 -86 H34 Z", "glass", { w: "detail" }) + winGlare(54, -126) + tube("M10 -146 V-168", "gray", 8) + sh(RR(-160, -180, 320, 12, 6), "gray") + dot(10, -170, 9, "gray", { w: "detail" }) + L.stroke("M-130 -176 H-30", { c: "white", w: 3, op: 0.4 });
}, [-230, -200, 400, 215], "orange");

const sea = (w, y, n = 10) => sh(wave(-w, w, y, 9, n) + ` V16 H${-w} Z`, "water", { w: "detail" }) + L.stroke(wave(-w, w, y + 12, 6, n - 2), { c: "white", w: 3, op: 0.5 });
veh("ship", "Ship", ["boat", "cruise", "sea", "ocean liner"], (o) => {
  const c = pick(o, "color", "red");
  return solid("M-240 -86 H252 L208 -8 Q202 0 188 0 H-170 Q-186 0 -194 -10 Z", "navy", fl("M-250 -64 H260 V-52 H-250 Z", c)) +
    solid(RR(-150, -128, 300, 44, 8), "white", "") + Array.from({ length: 12 }, (_, i) => sh(C(-126 + i * 24, -104, 7), "glass", { w: 2.5 })).join("") +
    solid(RR(-110, -170, 220, 44, 8), "white", "") + Array.from({ length: 8 }, (_, i) => sh(RR(-96 + i * 26, -160, 18, 22, 4), "glass", { w: 2.5 })).join("") + solid(RR(-46, -208, 120, 40, 8), "white", "") + sh(RR(-34, -198, 96, 18, 4), "glass", { w: 2.5 }) +
    sh(RR(-90, -240, 38, 72, 6), c) + sh(RR(-92, -244, 42, 16, 5), "ink") + tube("M14 -208 V-248", "gray", 5) + dot(14, -250, 5, "red", { w: "detail" }) + sea(300, -22);
}, [-310, -270, 620, 300], "red");

veh("sailboat", "Sailboat", ["yacht", "boat", "sea", "wind"], (o) => {
  const c = pick(o, "color", "red");
  return solid("M-124 -40 H132 Q104 0 62 0 H-82 Q-112 -10 -124 -40 Z", "white", fl("M-130 -26 H140 V-14 H-130 Z", c)) + tube("M2 -40 V-250", "wood", 8) + sh("M12 -244 Q76 -150 108 -62 H12 Z", "white") + sh("M-6 -226 Q-60 -140 -98 -62 H-6 Z", "cream") +
    sh(P([[0, -258], [30, -248], [0, -238]], true), c, { w: "detail" }) + sh(RR(-60, -34, 22, 14, 4), "glass", { w: 2.5 }) + sh(RR(-20, -34, 22, 14, 4), "glass", { w: 2.5 }) + sea(200, -20, 8);
}, [-210, -280, 420, 320], "red");

veh("submarine", "Submarine", ["underwater", "sea", "ocean", "periscope"], (o) => {
  const c = pick(o, "color", "yellow");
  const bub = [[150, -150, 9], [168, -176, 6], [140, -190, 5], [-230, -160, 7], [-244, -184, 5]].map(([x, y, r]) => sh(C(x, y, r), "glass", { w: 2.5 })).join("");
  return tubes([["M-196 -70 H-176", "gray", 8]]) + sh(C(-212, -98, 8, 22), "gray", { w: "detail" }) + sh(C(-212, -44, 8, 22), "gray", { w: "detail" }) + sh(P([[-166, -100], [-210, -150], [-200, -96]], true), c, { tone: 2 }) +
    sh(RR(-34, -166, 68, 52, 14), c) + tube("M18 -166 V-198 H46", "gray", 7) + solid(C(0, -70, 192, 64), c, fl("M-200 -62 H200 V-48 H-200 Z", "white", 0.9) + shd("M-200 -50 H200 V-6 H-200 Z", 0.14)) +
    [-90, -40, 10].map((x) => dot(x, -80, 15, "gray") + dot(x, -80, 10, "glass", { w: "detail" })).join("") + dot(60, -80, 15, "gray") + dot(60, -80, 10, "glass", { w: "detail" }) + sh(RR(-22, -158, 20, 18, 4), "glass", { w: "detail" }) + bub + L.stroke("M-150 -112 Q-60 -124 40 -118", { c: "white", w: 6, op: 0.45 });
}, [-270, -220, 540, 240], "yellow");

veh("rocket-launchpad", "Rocket on launchpad", ["space", "launch", "liftoff", "tower"], (o) => {
  const c = pick(o, "color", "red");
  const braces = Array.from({ length: 8 }, (_, i) => L.stroke(L.line([-132, -i * 44 - 20], [-102, -i * 44 - 64]), { w: "detail" }) + L.stroke(L.line([-102, -i * 44 - 20], [-132, -i * 44 - 64]), { w: "detail" })).join("");
  return L.shadow(0, 0, 300) + braces + tubes([["M-132 -24 V-376", "gray", 7], ["M-102 -24 V-376", "gray", 7], ["M-132 -376 H-102", "gray", 6], ["M-102 -270 H-40", "gray", 6]]) +
    sh("M-36 -124 L-72 -62 L-36 -62 Z", c) + sh("M36 -124 L72 -62 L36 -62 Z", c) + sh(RR(-24, -62, 48, 22, 6), "gray") +
    solid("M0 -392 C34 -350 36 -300 36 -250 V-60 H-36 V-250 C-36 -300 -34 -350 0 -392 Z", "white", fl("M-60 -400 H60 V-306 H-60 Z", c) + fl("M-60 -170 H60 V-144 H-60 Z", c) + L.stroke("M-22 -330 Q-26 -250 -22 -90", { c: "white", w: 6, op: 0.5 })) + dot(0, -250, 15, "glass") + dot(0, -250, 9, "sky", { w: "detail" }) +
    sh(RR(-104, -30, 208, 30, 6), "gray") + [[-60, -44, 24], [54, -42, 28], [4, -36, 20]].map(([x, y, r]) => sh(C(x, y, r), "white", { w: "detail" })).join("");
}, [-190, -420, 380, 430], "red");

veh("fire-engine", "Fire engine", ["firetruck", "emergency", "rescue", "ladder"], (o) => {
  const c = pick(o, "color", "red"), rungs = Array.from({ length: 14 }, (_, i) => ln([-210 + i * 20, -150 - i * 1.2], [-210 + i * 20, -168 - i * 1.2], { w: 3, c: "gray" })).join("");
  return L.shadow(0, 0, 480) + tubes([["M-216 -148 L66 -164", "gray", 6], ["M-216 -170 L66 -186", "gray", 6]]) + rungs + solid(RR(-232, -138, 304, 106, 8), c, arches([-150, -70], -34, 40) + fl("M-240 -88 H80 V-78 H-240 Z", "white", 0.9) + [-170, -100, -30].map((x) => L.stroke(L.line([x, -138], [x, -90]), { w: "detail", op: 0.35 })).join("")) +
    sh(RR(-210, -128, 90, 34, 5), "gray", { tone: 2, w: "detail" }) + L.stroke(C(-166, -110, 12), { c: "orange", w: 5 }) +
    solid("M72 -34 V-142 Q72 -150 82 -150 H140 Q158 -150 166 -134 L196 -96 Q208 -92 210 -74 V-34 Z", c, arches([140], -34, 40) + fl("M60 -80 H220 V-70 H60 Z", "white", 0.9)) + sh(P([[88, -140], [134, -140], [158, -108], [88, -108]], true), "glass", { w: "detail" }) + winGlare(106, -138) +
    sh(RR(92, -166, 22, 14, 5), "blue", { w: "detail" }) + sh(RR(116, -166, 22, 14, 5), "red", { w: "detail" }) + sh(RR(198, -78, 14, 14, 4), "yellow", { w: "detail" }) + sh(RR(190, -46, 26, 12, 5), "gray", { w: "detail" }) + wheel(-150, -34, 34) + wheel(-70, -34, 34) + wheel(140, -34, 34);
}, [-270, -210, 520, 230], "red");

veh("ambulance", "Ambulance (generic)", ["emergency", "hospital", "rescue", "medic"], (o) => {
  const c = pick(o, "color", "blue");
  return L.shadow(0, 0, 450) + sh(RR(-8, -208, 52, 22, 7), "red") + sh(RR(-8, -208, 26, 22, 7), "blue") +
    solid("M-200 -34 V-172 Q-200 -186 -186 -186 H64 Q80 -186 88 -172 L126 -112 H190 Q208 -112 210 -94 V-34 Q210 -24 198 -24 H-188 Q-200 -24 -200 -34 Z", "white", arches([-120, 130], -34, 42) + fl("M-210 -86 H220 V-68 H-210 Z", c) + shd("M-210 -42 H220 V-20 H-210 Z", 0.1)) +
    plus(-100, -140, 24, 8, c, { w: "prop" }) + T("AMBULANCE", 10, -96, { size: 22, c }) + sh(RR(-188, -168, 30, 36, 4), "glass", { w: "detail" }) + L.stroke("M-124 -184 V-30 M-78 -184 V-100", { w: "detail", op: 0.5 }) +
    sh(P([[72, -178], [84, -176], [116, -122], [72, -122]], true), "glass", { w: "detail" }) + winGlare(84, -174) + sh(RR(196, -88, 12, 14, 4), "yellow", { w: "detail" }) + sh(RR(-204, -70, 8, 16, 3), "red", { w: "detail" }) + sh(RR(190, -44, 26, 12, 5), "gray", { w: "detail" }) + wheel(-120, -34, 34) + wheel(130, -34, 34);
}, [-250, -230, 500, 250], "blue");

// =====================================================================================================================
// SIGNS AND ICONS
// =====================================================================================================================
const SG = "Signs and icons";
const sgn = (name, label, tags, fn, meta = {}) => reg("sign-" + name, label, SG, ["sign", "icon", ...tags], fn, meta);
const board = (c = "blue") => solid(RR(-92, -92, 184, 184, 22), c) + L.stroke(RR(-80, -80, 160, 160, 14), { c: "white", w: 5, op: 0.9 });
const whiteShape = (d) => sh(d, "white", { w: "detail" });

sgn("stop", "Stop sign", ["traffic", "road", "octagon"], () =>
  L.shadow(0, 0, 70) + sh(RR(-7, -170, 14, 170, 3), "gray") + solid(ngon(0, -216, 66, 8, -67.5), "red") + L.stroke(ngon(0, -216, 56, 8, -67.5), { c: "white", w: 4 }) + T("STOP", 0, -203, { size: 36, c: "white" }), { box: [-90, -290, 180, 320] });

const tl = (name, label, lit) => sgn("traffic-light-" + name, label, ["traffic", "road", "signal", "lights", name], () => {
  const lamps = [["red", -250], ["yellow", -195], ["green", -140]].map(([c, y]) => {
    const on = c === lit;
    return (on ? fl(C(0, y, 36), c, 0.3) : "") + (on ? sh(C(0, y, 22), c, { w: "detail" }) + fl(C(-7, y - 7, 5), "white", 0.8) : sh(C(0, y, 22), "ink", { w: "detail", flat: true }) + fl(C(0, y, 22), "white", 0.1)) + fl(`M-26 ${y - 18} Q0 ${y - 40} 26 ${y - 18} L26 ${y - 24} Q0 ${y - 48} -26 ${y - 24} Z`, "ink", 0.9);
  }).join("");
  return L.shadow(0, 0, 80) + sh(RR(-8, -100, 16, 100, 3), "gray") + sh(RR(-26, -10, 52, 10, 4), "gray", { w: "detail" }) + sh(RR(-44, -296, 88, 200, 20), "ink") + lamps;
}, { box: [-90, -330, 180, 350], label });
tl("red", "Traffic light (red)", "red"); tl("amber", "Traffic light (amber)", "yellow"); tl("green", "Traffic light (green)", "green");

const arrowR = "M-56 -20 H4 V-54 L62 0 L4 54 V20 H-56 Z";
[["right", 0], ["down", 90], ["left", 180], ["up", -90]].forEach(([n, a]) => sgn("arrow-" + n, "Arrow sign " + n, ["direction", "arrow", n, "road"], () => board() + G(whiteShape(arrowR), `rotate(${a})`), { box: [-110, -110, 220, 220] }));
sgn("arrow-two-way", "Arrow sign two-way", ["direction", "arrow", "both", "road"], () => board() + whiteShape(P([[-70, 0], [-30, -36], [-30, -15], [30, -15], [30, -36], [70, 0], [30, 36], [30, 15], [-30, 15], [-30, 36]], true)), { box: [-110, -110, 220, 220] });
sgn("arrow-turn", "Arrow sign turn", ["direction", "arrow", "curve", "road"], () => board() + tubes([["M-40 64 V-6 Q-40 -42 -4 -42 H20", "white", 26]]) + sh(head([-4, -42], [34, -42], 40), "white", { w: "detail" }), { box: [-110, -110, 220, 220] });
sgn("arrow-loop", "Arrow sign refresh loop", ["direction", "arrow", "repeat", "cycle", "refresh"], () => {
  const arc = (a0, a1) => { const pts = L.arcPts(0, 0, 46, a0, a1, 14); return tube(L.smooth(pts.slice(0, 13)), "white", 18) + sh(head(pts[12], pts[14], 40), "white", { w: "detail" }); };
  return board() + arc(-170, -20) + arc(10, 160);
}, { box: [-110, -110, 220, 220] });

sgn("warning", "Warning triangle", ["danger", "caution", "alert", "hazard"], () =>
  solid(P([[0, -92], [98, 80], [-98, 80]], true), "yellow", "", { w: "char" }) + fl(RR(-10, -42, 20, 66, 10), "ink") + fl(C(0, 50, 11), "ink"), { box: [-120, -115, 240, 210] });
sgn("question-mark", "Question mark", ["help", "ask", "why", "confused"], () => tube("M-38 -50 C-38 -100 42 -100 42 -50 C42 -14 0 -20 0 16", "yellow", 30) + sh(C(0, 62, 18), "yellow"), { box: [-90, -130, 180, 230] });
sgn("exclamation-mark", "Exclamation mark", ["warning", "alert", "wow", "attention"], () => sh(RR(-19, -100, 38, 120, 19), "red") + sh(C(0, 62, 20), "red"), { box: [-90, -130, 180, 230] });
sgn("tick", "Tick", ["check", "yes", "correct", "done"], () => tube("M-62 4 L-20 48 L64 -52", "green", 36), { box: [-110, -90, 220, 180] });
sgn("cross", "Cross", ["no", "wrong", "close", "x", "incorrect"], () => tubes([["M-52 -52 L52 52", "red", 36], ["M52 -52 L-52 52", "red", 36]]), { box: [-100, -100, 200, 200] });
sgn("tick-badge", "Tick in circle", ["check", "yes", "correct", "done", "badge"], () => solid(C(0, 0, 90), "green") + L.stroke("M-44 4 L-12 36 L46 -30", { c: "white", w: 22 }) + L.stroke("M-70 -34 Q-52 -62 -20 -74", { c: "white", w: 7, op: 0.45 }), { box: [-110, -110, 220, 220] });
sgn("cross-badge", "Cross in circle", ["no", "wrong", "close", "x", "badge"], () => solid(C(0, 0, 90), "red") + L.stroke("M-34 -34 L34 34 M34 -34 L-34 34", { c: "white", w: 22 }) + L.stroke("M-70 -34 Q-52 -62 -20 -74", { c: "white", w: 7, op: 0.45 }), { box: [-110, -110, 220, 220] });
sgn("heart", "Heart", ["love", "like", "health", "valentine"], () =>
  solid("M0 84 C-118 12 -84 -76 -38 -76 C-16 -76 0 -60 0 -44 C0 -60 16 -76 38 -76 C84 -76 118 12 0 84 Z", "red") + L.stroke("M-70 -22 Q-72 -50 -48 -56", { c: "white", w: 9, op: 0.6 }), { box: [-130, -110, 260, 210] });
sgn("star", "Star", ["favourite", "rating", "award", "night"], () => solid(L.star(0, 4, 100, 44), "yellow") + L.stroke("M-54 -14 L-24 -40", { c: "white", w: 8, op: 0.6 }), { box: [-120, -110, 240, 220] });
sgn("location-pin", "Location pin", ["map", "place", "gps", "where"], () =>
  fl(C(0, 100, 34, 9), "ink", 0.2) + solid("M0 100 C-60 34 -72 12 -72 -26 A72 72 0 1 1 72 -26 C72 12 60 34 0 100 Z", "red") + dot(0, -26, 28, "white", { w: "detail" }) + L.stroke("M-56 -40 Q-48 -68 -22 -78", { c: "white", w: 8, op: 0.5 }), { box: [-100, -120, 200, 240] });
sgn("clock", "Clock icon", ["time", "hour", "watch", "late"], () => {
  const ticks = Array.from({ length: 12 }, (_, i) => { const a = deg(i * 30 - 90), r0 = i % 3 ? 56 : 50; return ln([r0 * Math.cos(a), r0 * Math.sin(a)], [64 * Math.cos(a), 64 * Math.sin(a)], { w: i % 3 ? "detail" : "prop" }); }).join("");
  return dot(0, 0, 90, "blue") + dot(0, 0, 74, "white", { w: "detail" }) + ticks + L.stroke("M0 0 L-28 -20", { w: 9 }) + L.stroke("M0 0 L42 -26", { w: 6 }) + dot(0, 0, 8, "red", { w: "detail" }) + L.stroke("M-60 -34 Q-50 -56 -28 -66", { c: "white", w: 6, op: 0.7 });
}, { box: [-110, -110, 220, 220] });
sgn("speech", "Speech icon", ["chat", "talk", "message", "bubble", "comment"], () =>
  sh(P([[-56, 38], [-70, 96], [6, 46]], true), "blue") + sh(RR(-96, -76, 192, 124, 38), "blue") + [-44, 0, 44].map((x) => fl(C(x, -14, 13), "white")).join("") + L.stroke("M-72 -46 Q-60 -62 -38 -64", { c: "white", w: 7, op: 0.5 }), { box: [-120, -100, 240, 210] });
sgn("calendar", "Calendar page", ["date", "schedule", "day", "planner"], () => {
  const cells = [0, 1, 2, 3].map((j) => [0, 1, 2, 3, 4].map((i) => (i === 2 && j === 1 ? sh(RR(-72 + i * 30, -24 + j * 30, 22, 18, 5), "red", { w: "detail" }) : fl(RR(-72 + i * 30, -24 + j * 30, 22, 18, 5), "gray", 0.45))).join("")).join("");
  return solid(RR(-88, -84, 176, 180, 16), "white", fl("M-100 -100 H100 V-42 H-100 Z", "red") + cells) + sh(RR(-48, -104, 16, 36, 8), "gray", { w: "detail" }) + sh(RR(32, -104, 16, 36, 8), "gray", { w: "detail" });
}, { box: [-110, -120, 220, 230] });
})();
