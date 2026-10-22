// ===================== library/body.js — friendly body diagrams (educational, never gory) =====================
// Everything is drawn around the origin (0,0). Most pieces take o.labels (true -> adds name labels with leader lines)
// and o.face (cute eyes + smile on the cell-like ones). Pastel organs, round forms, no blood, no cut flesh.
(function () {
const L = window.L, f1 = L.f1;
let N = 0;
const B = (cx, cy, rx, ry, c, o) => L.shape(L.circ(cx, cy, rx, ry), c, o);
const P = (pts, c, o) => L.shape(L.smooth(pts.concat([pts[0]])), c, o);
const T = (pts, c, o) => L.shape(L.poly(pts, true), c, o);
const LB = (pts, w0, w1, c, o) => L.shape(L.limb(pts, w0, w1), c, o);
const dot = (x, y, r, c = "ink", op) => L.flat(L.circ(x, y, r), c, op);
const sm = (pts, o) => L.stroke(L.smooth(pts), Object.assign({ w: "detail" }, o));
const ln = (a, b, o) => L.stroke(L.line(a, b), Object.assign({ w: "detail" }, o));
const blush = (x, y, r) => L.flat(L.circ(x, y, r, r * 0.6), "pink", 0.75);
const eye = (x, y, r = 8, k = 0.3) => L.shape(L.circ(x, y, r), "white", { w: "detail", flat: true }) + dot(x + k * r * 0.35, y + r * 0.1, r * 0.56) + dot(x + k * r * 0.35 - r * 0.2, y - r * 0.15, r * 0.2, "white");
const face = (x, y, s = 1) => eye(x - 16 * s, y, 9 * s, 0.2) + eye(x + 16 * s, y, 9 * s, 0.2) + sm([[x - 10 * s, y + 16 * s], [x, y + 24 * s], [x + 10 * s, y + 16 * s]]) + blush(x - 28 * s, y + 14 * s, 7 * s) + blush(x + 28 * s, y + 14 * s, 7 * s);
const clip = (d, inner) => { const id = "bd" + ++N; return `<clipPath id="${id}"><path d="${d}"/></clipPath><g clip-path="url(#${id})">${inner}</g>`; };
const rim = (d, c, o = {}) => L.tag("path", { d, fill: "none", stroke: L.outline(c), "stroke-width": L.lw(o.w || "prop", o.s || 1), "stroke-linejoin": "round" });
// label with leader line (only when o.labels): dot on the part at (x,y), text at (tx,ty)
const lab = (o, x, y, tx, ty, text, anchor = "start") => !o.labels ? "" : L.stroke(L.line([x, y], [tx, ty]), { w: 3 }) + dot(x, y, 5) + L.text(text, tx + (anchor === "end" ? -8 : anchor === "middle" ? 0 : 8), ty + (anchor === "middle" ? 24 : 8), { size: 24, anchor, halo: "white", haloW: 0.22 });
const squig = (x0, y0, x1, y1, n, amp, seed) => { const r = L.rng(seed), pts = []; for (let i = 0; i <= n; i++) { const t = i / n; pts.push([x0 + (x1 - x0) * t + (r() - 0.5) * amp * 0.6, y0 + (y1 - y0) * t + (i % 2 ? amp : -amp) * (0.6 + r() * 0.6)]); } return pts; };
const reg = (name, fn, label, tags, o = {}) => L.reg("body", name, fn, Object.assign({ box: [-200, -200, 400, 400], group: "Body", label, tags: ["body", "anatomy", "diagram"].concat(tags || []), call: `L.put(S, "${name}", x, y, { s: 1, t })`, demo: {} }, o));
const reg2 = (name, base, over, label, tags, o = {}) => reg(name, (x) => L.svg(base, Object.assign({}, x, over)), label, tags, Object.assign({ call: `L.put(S, "${name}", x, y, { s: 1, t })` }, o));

// ---------- brain ----------
const cerebrumD = L.smooth(Array.from({ length: 73 }, (_, i) => { const t = (i % 72) / 72 * Math.PI * 2, w = 1 + 0.028 * Math.sin(t * 11), sn = Math.sin(t); return [Math.cos(t) * 128 * w, -34 + sn * (sn < 0 ? 84 : 62) * w]; }));
const LOBES = { blue: [[40, -140], [150, -140], [150, 6], [60, -4], [28, -12], [34, -70]], green: [[-52, -2], [28, -12], [60, -4], [150, 6], [150, 90], [-70, 90]], yellow: [[-60, -140], [40, -140], [34, -70], [28, -12], [-52, -2], [-56, -60]], red: [[-150, -140], [-60, -140], [-56, -60], [-52, -2], [-70, 90], [-150, 90]] };
const brainBase = (o, lobes) => LB([[-14, 30], [-8, 84], [-16, 118]], 30, 20, "pink", { tone: 2 }) + B(-62, 56, 44, 24, "pink", { tone: 2 }) + [0, 1, 2].map((i) => sm([[-92 + i * 4, 44 + i * 9], [-62, 40 + i * 9 + 3], [-30 - i * 4, 44 + i * 9]], { c: "red", op: 0.4 })).join("") +
  L.shape(cerebrumD, "pink") + clip(cerebrumD, (lobes ? Object.entries(LOBES).map(([c, pts]) => L.flat(L.smooth(pts.concat([pts[0]])), c, 0.7)).join("") : "") +
    [[[8, -100], [-2, -66], [16, -34], [6, -6]], [[-110, 8], [-46, -12], [30, -6], [96, -22]], [[-96, -44], [-64, -66], [-40, -42]], [[56, -80], [84, -60], [104, -74]], [[-80, -4], [-50, -30], [-20, -24]], [[60, -40], [90, -34], [112, -44]], [[-30, -70], [-10, -88], [4, -74]]].map((p) => L.stroke(L.smooth(p), { c: "red", w: 4, op: 0.4 })).join("")) + rim(cerebrumD, "pink") + (o.face ? face(40, -20, 0.9) : "");
reg("body-brain", (o) => brainBase(o, false) + lab(o, 20, -70, 20, -150, "Cerebrum", "middle") + lab(o, -62, 60, -130, 110, "Cerebellum", "end") + lab(o, -12, 100, 40, 140, "Brain stem"), "Brain (side view)", ["brain", "head", "mind", "think"], { box: [-260, -180, 460, 340] });
reg("body-brain-lobes", (o) => brainBase(o, true) + lab(o, 80, -50, 150, -90, "Frontal") + lab(o, -10, -80, 10, -146, "Parietal", "middle") + lab(o, -96, -30, -138, -90, "Occipital", "end") + lab(o, 20, 20, 150, 70, "Temporal") + lab(o, -62, 60, -130, 110, "Cerebellum", "end"), "Brain with labelled lobes", ["brain", "lobes", "frontal", "parietal", "temporal", "occipital"], { box: [-270, -180, 560, 340], demo: { labels: true } });

// ---------- neuron + synapse ----------
reg("body-neuron", (o) => { const c = o.c || "purple", den = (a, b, d) => LB([[-96, 0], a, b, d], 16, 4, c, { tone: 1 }); let s = "";
  [[[-130, -26], [-148, -50], [-170, -56]], [[-128, -6], [-150, -10], [-172, -22]], [[-124, 22], [-146, 40], [-168, 36]], [[-100, -32], [-108, -62], [-126, -86]], [[-96, 34], [-106, 62], [-124, 80]]].forEach(([a, b, d]) => (s += den(a, b, d)));
  const ax = [[-62, 0], [0, 0], [60, 0], [120, 0], [170, 0]];
  s += LB(ax, 14, 10, c, { tone: 1 }) + [0, 1, 2, 3].map((i) => L.g(P([[-34, -13], [-10, -17], [12, -13], [12, 13], [-10, 17], [-34, 13]], "yellow", { w: "detail" }), `translate(${-12 + i * 54} 0)`)).join("");
  s += LB([[170, 0], [196, -26], [214, -44]], 10, 6, c, { tone: 1 }) + LB([[170, 0], [200, 4], [222, 6]], 10, 6, c, { tone: 1 }) + LB([[170, 0], [194, 28], [212, 48]], 10, 6, c, { tone: 1 }) + [[214, -44], [222, 6], [212, 48]].map(([x, y]) => B(x, y, 9, 9, c)).join("");
  s += P(Array.from({ length: 12 }, (_, i) => { const a = (i / 12) * 6.283, k = i % 2 ? 0.8 : 1.12; return [-92 + Math.cos(a) * 40 * k, Math.sin(a) * 40 * k]; }), c) + B(-90, 0, 17, 17, c, { tone: 2 }) + dot(-86, -2, 6, "white", 0.8) + L.flat(L.circ(-106, -18, 10, 6), "white", 0.35);
  if (o.face) s += face(-96, 8, 0.7);
  return s + lab(o, -92, 0, -150, -120, "Cell body", "end") + lab(o, -150, -50, -200, -90, "Dendrites", "end") + lab(o, 42, -13, 40, -110, "Myelin sheath", "middle") + lab(o, 120, 0, 150, 90, "Axon") + lab(o, 214, -44, 230, -100, "Terminals"); },
  "Neuron", ["neuron", "nerve", "brain cell"], { box: [-210, -130, 460, 260] });
reg2("body-neuron-labeled", "body-neuron", { labels: true }, "Neuron (labelled)", ["neuron", "nerve", "labelled"], { box: [-350, -150, 740, 290] });
reg("body-synapse", (o) => { const pre = L.smooth([[-110, -150], [110, -150], [120, -80], [80, -30], [30, -10], [-30, -10], [-80, -30], [-120, -80], [-110, -150]]), post = L.smooth([[-130, 70], [-90, 40], [-30, 28], [30, 28], [90, 40], [130, 70], [130, 150], [-130, 150], [-130, 70]]);
  const stars = [[-60, 6], [-20, 10], [20, 8], [60, 4], [-36, 18], [40, 18]].map(([x, y]) => L.flat(L.star(x, y, 7, 3, 4, 0), "gold")).join("");
  return L.shape(pre, "blue", { tone: 1 }) + [[-70, -90], [-20, -100], [30, -86], [70, -100], [-40, -52], [20, -48], [60, -56]].map(([x, y]) => B(x, y, 15, 15, "yellow", { w: "detail" })).join("") + [[-70, -90], [30, -86], [60, -56]].map(([x, y]) => dot(x, y, 4, "orange")).join("") + L.shape(post, "pink", { tone: 1 }) +
    [-90, -50, -10, 30, 70].map((x) => L.shape(`M${x - 11} 28 A11 11 0 0 1 ${x + 11} 28 Z`, "red", { w: "detail" })).join("") + stars + dot(-30, 100, 10, "white", 0.3) + dot(40, 110, 14, "white", 0.3) + (o.face ? face(0, 100, 1) : "") +
    lab(o, 30, -86, 150, -120, "Vesicles") + lab(o, 20, 8, 150, -10, "Neurotransmitters") + lab(o, 30, 28, 150, 56, "Receptors") + lab(o, -100, -130, -160, -150, "Sending cell", "end") + lab(o, -100, 120, -160, 120, "Receiving cell", "end"); },
  "Synapse", ["synapse", "neurotransmitter", "neuron", "signal"], { box: [-210, -190, 420, 360] });
reg2("body-synapse-labeled", "body-synapse", { labels: true }, "Synapse (labelled)", ["synapse", "labelled"], { box: [-350, -190, 740, 360] });

// ---------- organs ----------
reg("body-heart", (o) => { const hd = "M0 -44 C-24 -86 -92 -78 -92 -22 C-92 30 -40 66 0 112 C40 66 92 30 92 -22 C92 -78 24 -86 0 -44 Z";
  return LB([[-6, -50], [-12, -108], [-52, -138], [-88, -112]], 26, 22, "red", { tone: 2 }) + LB([[44, -48], [58, -88], [54, -130]], 24, 22, "blue", { tone: 1 }) + LB([[-34, -54], [-52, -92], [-96, -96]], 18, 16, "blue", { tone: 2 }) +
    L.shape(hd, "red") + clip(hd, L.flat(L.circ(-70, -14, 60, 40), "white", 0.14) + sm([[-8, -50], [-14, 20], [10, 70]], { c: "red", w: 5, op: 0.55 }).replace(/<path /, '<path stroke="' + L.c("red", 2) + '" ') + L.flat(L.circ(-48, -44, 18, 10), "white", 0.4)) + rim(hd, "red") + sm([[-8, -50], [-14, 20], [10, 70]], { c: "ink", w: 3, op: 0.35 }) + (o.face ? face(14, 4, 1) : "") +
    lab(o, -52, -134, -130, -170, "Aorta", "end") + lab(o, 54, -110, 130, -140, "Vena cava") + lab(o, -50, 20, -130, 40, "Left ventricle", "end") + lab(o, 44, 10, 120, 50, "Right ventricle") + lab(o, 50, -44, 130, -70, "Right atrium"); },
  "Heart", ["heart", "organ", "cardio", "pump"], { box: [-200, -190, 400, 330] });
reg2("body-heart-labeled", "body-heart", { labels: true }, "Heart (labelled)", ["heart", "labelled"], { box: [-340, -190, 680, 330] });
reg("body-lungs", (o) => { const lobe = (s, big) => P([[s * 20, -76], [s * 62, -96], [s * (100 + big), -48], [s * (112 + big), 20], [s * (94 + big), 72], [s * 44, 84], [s * 22, 62], [s * 18, 0]], "pink");
  const tree = (s) => [[[s * 22, -42], [s * 56, -18], [s * 74, 18]], [[s * 40, -30], [s * 66, -50], [s * 84, -42]], [[s * 52, -12], [s * 76, -8], [s * 98, -20]], [[s * 58, 0], [s * 62, 36], [s * 56, 60]], [[s * 66, 10], [s * 88, 34], [s * 96, 52]]].map((p) => L.stroke(L.smooth(p), { c: "sky", w: 5, op: 0.85 })).join("");
  return LB([[0, -150], [0, -60]], 24, 24, "sky", { tone: 2 }) + [-1, 0, 1, 2, 3, 4].map((i) => sm([[-12, -140 + i * 14], [12, -140 + i * 14]], { c: "ink", op: 0.25 })).join("") + lobe(-1, 8) + lobe(1, 0) + tree(-1) + tree(1) + LB([[0, -60], [-30, -40], [-48, -14]], 16, 10, "sky", { tone: 2 }) + LB([[0, -60], [30, -40], [48, -14]], 16, 10, "sky", { tone: 2 }) + L.flat(L.circ(-70, -54, 14, 22), "white", 0.35) + L.flat(L.circ(70, -54, 14, 22), "white", 0.35) +
    (o.face ? face(-74, 10, 0.7) : "") + lab(o, 0, -120, 80, -170, "Trachea") + lab(o, -90, 30, -150, 70, "Lung", "end") + lab(o, 20, -40, 150, -50, "Bronchi"); },
  "Lungs", ["lungs", "breathing", "organ", "respiratory"], { box: [-200, -190, 400, 300] });
reg("body-stomach", (o) => { const st = L.smooth([[-20, -84], [14, -76], [48, -56], [96, -44], [128, -16], [124, 22], [90, 44], [40, 66], [-20, 92], [-70, 80], [-92, 36], [-86, -20], [-60, -62], [-20, -84]]);
  return LB([[-34, -170], [-34, -120], [-24, -86]], 26, 26, "pink", { tone: 2 }) + LB([[124, 2], [150, 20], [150, 60], [110, 90]], 24, 22, "pink", { tone: 2 }) + L.shape(st, "orange", { tone: 1 }) + clip(st, [0, 1, 2, 3].map((i) => L.stroke(L.smooth([[-70 + i * 26, -30 + i * 20], [-24 + i * 24, -6 + i * 18], [20 + i * 20, -20 + i * 20]]), { c: "orange", w: 4, op: 0.5 }).replace(/stroke="[^"]*"/, `stroke="${L.c("orange", 2)}"`)).join("") + L.flat(L.circ(-40, -30, 22, 11), "white", 0.4)) + rim(st, "orange") + (o.face ? face(10, 20, 0.9) : "") +
    lab(o, -34, -140, -120, -170, "Oesophagus", "end") + lab(o, 10, -10, 150, -90, "Stomach") + lab(o, 150, 50, 170, 120, "Small intestine"); },
  "Stomach", ["stomach", "digestion", "organ", "food"], { box: [-230, -200, 460, 330] });
reg("body-intestines", (o) => { const sp = [], ys = [-46, -22, 2, 26, 50]; ys.forEach((y, i) => { const l = i % 2 ? [40, -40] : [-40, 40]; sp.push([l[0], y], [l[1], y], [l[1] + (l[1] > 0 ? 12 : -12), y + 12]); }); sp.pop(); const sd = L.smooth(sp);
  return LB([[-76, 84], [-78, -40], [-50, -86], [50, -86], [78, -40], [76, 84]], 34, 34, "orange", { tone: 1 }) + L.stroke(sd, { c: "ink", w: 27 }) + L.stroke(sd, { c: "pink", w: 20 }) + L.stroke(sd, { c: "white", w: 4, op: 0.4 }) + B(70, 90, 16, 16, "orange", { tone: 2 }) + (o.face ? face(0, -62, 0.8) : "") +
    lab(o, 0, -86, 0, -140, "Large intestine", "middle") + lab(o, 30, 2, 140, 40, "Small intestine"); },
  "Intestines", ["intestines", "digestion", "gut", "organ"], { box: [-200, -170, 400, 300] });
reg("body-kidneys", (o) => { const kid = (s) => P([[s * 36, -62], [s * 74, -42], [s * 78, 14], [s * 52, 60], [s * 20, 56], [s * 30, 18], [s * 20, -10], [s * 18, -42]], "red", { tone: 2 });
  return LB([[0, -130], [0, 56]], 16, 16, "red", { tone: 1 }) + LB([[-26, 10], [-12, -12], [0, -16]], 8, 8, "blue", { tone: 1 }) + LB([[26, 10], [12, -12], [0, -16]], 8, 8, "red", { tone: 1 }) + LB([[-28, 40], [-22, 80], [-8, 118]], 10, 8, "yellow", { tone: 1 }) + LB([[28, 40], [22, 80], [8, 118]], 10, 8, "yellow", { tone: 1 }) +
    kid(-1) + kid(1) + L.flat(L.circ(-58, -28, 8, 20), "white", 0.3) + L.flat(L.circ(58, -28, 8, 20), "white", 0.3) + B(0, 126, 24, 18, "yellow", { tone: 1 }) + (o.face ? face(-54, 0, 0.55) + face(54, 0, 0.55) : "") +
    lab(o, -60, 0, -130, -50, "Kidney", "end") + lab(o, -20, 80, -100, 110, "Ureter", "end") + lab(o, 0, 128, 70, 150, "Bladder"); },
  "Kidneys", ["kidneys", "urinary", "organ", "filter"], { box: [-200, -150, 400, 330] });
reg("body-liver", (o) => { const lv = L.smooth([[-112, -20], [-82, -52], [-22, -62], [50, -42], [112, 2], [102, 32], [44, 42], [-6, 30], [-50, 52], [-92, 42], [-112, -20]]);
  return L.shape(lv, "brown", { tone: 1 }) + clip(lv, L.flat(L.circ(-50, -30, 40, 12), "white", 0.25) + sm([[-4, -62], [8, -20], [-6, 30]], { c: "brown", w: 4, op: 0.6 }).replace(/stroke="[^"]*"/, `stroke="${L.c("brown", 2)}"`)) + rim(lv, "brown") + B(56, 52, 20, 24, "green", { tone: 1 }) + LB([[56, 36], [40, 20]], 6, 6, "green", { tone: 1 }) + (o.face ? face(-30, -6, 0.9) : "") + lab(o, -50, -10, -100, -90, "Liver", "end") + lab(o, 56, 56, 110, 100, "Gallbladder"); },
  "Liver", ["liver", "organ", "digestion", "bile"], { box: [-200, -150, 400, 280] });

// ---------- skeleton + muscles ----------
const bone = (a, b, w, c = "white") => { const dx = b[0] - a[0], dy = b[1] - a[1], m = Math.hypot(dx, dy) || 1, px = (-dy / m) * w * 0.42, py = (dx / m) * w * 0.42, k = (p) => B(p[0] + px, p[1] + py, w * 0.62, w * 0.62, c, { w: "detail" }) + B(p[0] - px, p[1] - py, w * 0.62, w * 0.62, c, { w: "detail" });
  return k(a) + k(b) + L.g(L.shape(L.rrect(-m / 2, -w / 2, m, w, w / 2), c), `translate(${f1((a[0] + b[0]) / 2)} ${f1((a[1] + b[1]) / 2)}) rotate(${f1(Math.atan2(dy, dx) * 180 / Math.PI)})`); };
const skeleton = (o) => { let s = "";
  s += Array.from({ length: 12 }, (_, i) => L.shape(L.rrect(-8, -126 + i * 14, 16, 12, 5), "white", { w: "detail" })).join("");
  [-1, 1].forEach((m) => { for (let i = 0; i < 6; i++) { const y = -100 + i * 14, k = 1 - i * 0.05; s += LB([[m * 4, y], [m * 30 * k, y - 6], [m * 46 * k, y + 8], [m * 36 * k, y + 24]], 9, 8, "white"); } });
  s += LB([[0, -108], [0, -48]], 12, 10, "white") + LB([[-8, -118], [-48, -112]], 8, 8, "white") + LB([[8, -118], [48, -112]], 8, 8, "white");
  s += P([[-54, 24], [-20, 32], [0, 40], [20, 32], [54, 24], [64, 56], [40, 84], [10, 66], [0, 70], [-10, 66], [-40, 84], [-64, 56]], "white");
  [-1, 1].forEach((m) => {
    s += bone([m * 50, -110], [m * 76, -30], 11) + bone([m * 76, -30], [m * 88, 36], 10) + B(m * 90, 48, 12, 12, "white") + [-1, 0, 1].map((k) => ln([m * (90 + k * 6), 56], [m * (92 + k * 8), 66], { c: "ink", w: 4 })).join("");
    s += bone([m * 26, 70], [m * 32, 150], 15) + bone([m * 32, 154], [m * 34, 226], 12) + P([[m * 34, 224], [m * 56, 230], [m * 62, 240], [m * 14, 240]], "white", { w: "detail" });
  });
  s += P([[-28, -156], [28, -156], [24, -136], [0, -130], [-24, -136]], "white") + B(0, -176, 42, 38, "white") + eye(-16, -176, 11, 0) + eye(16, -176, 11, 0) + T([[0, -166], [-4, -158], [4, -158]], "ink", { flat: true, w: "detail" }) + sm([[-18, -146], [0, -140], [18, -146]]) + [-8, 0, 8].map((x) => ln([x, -146], [x, -140], { w: 3 })).join("");
  return s + lab(o, 0, -176, 110, -200, "Skull") + lab(o, 26, -70, 110, -100, "Ribs") + lab(o, 0, -10, 110, -20, "Spine") + lab(o, 0, 56, 110, 40, "Pelvis") + lab(o, 32, 150, 110, 150, "Femur") + lab(o, 76, -30, 130, -50, "Arm bones"); };
reg("body-skeleton", skeleton, "Skeleton (friendly)", ["skeleton", "bones", "skull", "ribs"], { box: [-130, -230, 260, 480] });
reg2("body-skeleton-labeled", "body-skeleton", { labels: true }, "Skeleton (labelled)", ["skeleton", "bones", "labelled"], { box: [-130, -240, 400, 500] });
reg("body-bone", (o) => bone([-110, 30], [110, -30], 34) + L.flat(L.circ(-30, -2, 20, 6), "white", 0.0) + sm([[-70, 20], [0, 2], [70, -16]], { c: "ink", op: 0.15 }) + (o.face ? face(0, 0, 0.8) : ""), "Bone", ["bone", "skeleton"], { box: [-170, -80, 340, 160] });
reg("body-muscle-arm", (o) => { const skin = o.skin || "s3"; return LB([[-140, 76], [-70, 70], [10, 68]], 66, 56, skin) + LB([[10, 68], [18, 0], [8, -70]], 56, 46, skin) + P([[-120, 56], [-100, 14], [-56, -4], [-16, 16], [-4, 58]], skin, { tone: 1 }) + sm([[-86, 24], [-56, 8], [-30, 22]], { c: "brown", op: 0.4 }) + L.flat(L.circ(-76, 22, 16, 8), "white", 0.35) +
  B(8, -96, 40, 34, skin) + [-14, 0, 14].map((x) => sm([[8 + x, -110], [8 + x, -86]], { c: "brown", op: 0.5 })).join("") + B(-26, -78, 15, 13, skin, { w: "detail" }) + [[70, -110], [90, -80], [76, -50]].map(([x, y], i) => L.flat(L.star(x, y, 12 - i * 2, 4, 4, 0), "gold")).join("") + [[-110, -60], [-130, -40]].map(([x, y]) => L.flat(L.star(x, y, 9, 3, 4, 0), "gold")).join(""); },
  "Muscle (flexing arm)", ["muscle", "arm", "biceps", "strong", "flex"], { box: [-190, -150, 320, 280] });
reg("body-muscle-diagram", (o) => { const shaft = [[0, -126], [8, 38]];
  return LB([[-4, -126], [4, 38]], 20, 18, "white") + LB([[10, 42], [34, 150]], 13, 11, "white") + LB([[12, 42], [18, 150]], 11, 10, "white") + B(-4, -134, 26, 26, "white") + B(10, 42, 15, 15, "white") +
    P([[-12, -116], [-40, -62], [-34, -10], [-4, 30], [4, -10], [4, -70]], "red", { tone: 1 }) + sm([[-22, -90], [-24, -40], [-12, 0]], { c: "red", op: 0.5 }) + P([[14, -116], [40, -62], [40, -4], [18, 36], [10, -10], [10, -70]], "red", { tone: 2 }) +
    LB([[-10, -126], [-14, -116]], 7, 7, "white", { w: "detail" }) + LB([[-6, 30], [6, 48]], 7, 7, "white", { w: "detail" }) + (o.face ? face(-24, -50, 0.6) : "") + lab(o, -30, -60, -110, -90, "Biceps", "end") + lab(o, 36, -50, 100, -80, "Triceps") + lab(o, 0, 36, -90, 40, "Tendon", "end") + lab(o, 20, 100, 90, 110, "Bone"); },
  "Muscles (arm diagram)", ["muscle", "biceps", "triceps", "tendon", "arm"], { box: [-230, -170, 460, 340], demo: { labels: true } });

// ---------- eye ----------
reg("body-eye", (o) => { const arcs = (w, c) => L.stroke(L.arc(0, 0, 84, 124, 236), { c, w });
  return LB([[-86, 12], [-122, 16], [-156, 34]], 24, 18, "yellow", { tone: 1 }) + B(0, 0, 90, 90, "white") + B(0, 0, 78, 78, "sky", { flat: true, w: "detail", tone: 1, op: 0.55 }) + arcs(15, "ink") + arcs(8, "orange") +
    P([[64, -50], [92, -44], [116, 0], [92, 44], [64, 50]], "glass", { tone: 2 }) + P([[58, -60], [74, -60], [74, -16], [58, -16]], "blue", { w: "detail" }) + P([[58, 16], [74, 16], [74, 60], [58, 60]], "blue", { w: "detail" }) + B(46, 0, 13, 28, "yellow", { tone: 1, op: 0.75, w: "detail" }) + L.flat(L.circ(42, -10, 4, 10), "white", 0.8) +
    (o.rays ? [-26, 0, 26].map((y) => ln([190, y * 2.2], [80, y * 0.6], { c: "gold", w: 4 }) + L.flat(L.poly([[84, y * 0.6 - 7], [70, y * 0.6], [84, y * 0.6 + 7]], true), "gold")).join("") : "") +
    lab(o, 100, -20, 150, -90, "Cornea") + lab(o, 66, -38, 130, -130, "Iris") + lab(o, 66, 0, 160, 0, "Pupil") + lab(o, 46, 26, 130, 90, "Lens") + lab(o, -80, -20, -120, -100, "Retina", "end") + lab(o, -140, 28, -170, 90, "Optic nerve", "end"); },
  "Eye (cross-section)", ["eye", "sight", "vision", "retina", "cornea"], { box: [-200, -150, 400, 280] });
reg2("body-eye-labeled", "body-eye", { labels: true, rays: true }, "Eye (labelled, light rays)", ["eye", "labelled", "vision"], { box: [-350, -150, 680, 280] });

// ---------- ear ----------
reg("body-ear", (o) => { const ring = (cx, cy, rx, ry, rot) => { const d = L.circ(0, 0, rx, ry), g = (w, c) => L.g(L.stroke(d, { c, w }), `translate(${cx} ${cy}) rotate(${rot})`); return g(15, "ink") + g(9, "sky"); };
  return [0, 1, 2].map((i) => L.stroke(L.arc(280, 0, 50 + i * 26, 150, 210), { c: "gold", w: 5, op: 0.9 - i * 0.25 })).join("") + ring(-62, -78, 20, 28, 20) + ring(-84, -62, 26, 18, -30) + ring(-50, -62, 18, 24, 70) + LB([[-96, 22], [-136, -6], [-176, -20]], 14, 10, "yellow", { tone: 1 }) +
    P([[84, -62], [120, -100], [168, -82], [176, -30], [160, 30], [132, 70], [100, 62], [88, 30], [96, -4]], "s2") + sm([[112, -66], [148, -62], [156, -20], [132, 38]], { c: "brown", op: 0.45 }) + LB([[100, 0], [40, 0]], 28, 24, "s2", { tone: 1 }) + B(36, 0, 6, 18, "cream", { w: "detail" }) +
    LB([[28, 0], [8, -8], [-8, 2]], 8, 6, "white", { w: "detail" }) + B(-12, 2, 9, 9, "white", { w: "detail" }) + B(-28, 6, 8, 6, "white", { w: "detail" }) + B(-72, 34, 32, 32, "pink") + sm(Array.from({ length: 14 }, (_, i) => { const a = i * 0.9, r = 4 + i * 1.8; return [-72 + Math.cos(a) * r, 34 + Math.sin(a) * r]; }), { c: "red", w: 4, op: 0.7 }) +
    lab(o, 150, -50, 150, -140, "Outer ear", "middle") + lab(o, 66, 0, 70, 80, "Ear canal", "middle") + lab(o, 36, -8, 36, -126, "Eardrum", "middle") + lab(o, -10, 0, -30, 110, "Ossicles", "middle") + lab(o, -72, 34, -150, 90, "Cochlea", "end") + lab(o, -150, -14, -190, -60, "Nerve", "end"); },
  "Ear (cross-section)", ["ear", "hearing", "sound", "cochlea", "eardrum"], { box: [-240, -160, 520, 300] });
reg2("body-ear-labeled", "body-ear", { labels: true }, "Ear (labelled)", ["ear", "labelled", "hearing"], { box: [-310, -170, 650, 330] });

// ---------- tooth ----------
const TOOTH = [[-50, -90], [-20, -100], [0, -92], [20, -100], [50, -90], [66, -50], [56, 0], [44, 60], [40, 110], [24, 120], [14, 70], [0, 52], [-14, 70], [-24, 120], [-40, 110], [-44, 60], [-56, 0], [-66, -50], [-50, -90]];
const toothD = (k = 1, cy = -20) => L.smooth(TOOTH.map(([x, y]) => [x * k, (y - cy) * k + cy]));
reg("body-tooth", (o) => P(TOOTH.slice(0, -1), "white", { tone: 1 }) + L.flat(L.circ(-34, -66, 14, 8), "white", 0.8) + (o.face === false ? "" : face(0, -44, 1)) + L.flat(L.star(66, -88, 12, 4, 4, 0), "gold") + L.flat(L.star(84, -62, 7, 3, 4, 0), "gold"), "Tooth (cute)", ["tooth", "teeth", "dental", "smile"], { box: [-110, -140, 220, 280] });
reg("body-tooth-section", (o) => { const d = toothD(1);
  return L.shape(L.rrect(-120, 40, 240, 96, 16), "cream") + L.shape(L.smooth([[-120, 10], [-90, 2], [-60, 14], [-30, 4], [0, 14], [30, 4], [60, 14], [90, 2], [120, 10], [120, 62], [-120, 62], [-120, 10]]), "pink", { tone: 1 }) +
    L.shape(d, "white", { tone: 1 }) + L.shape(toothD(0.8, -20), "cream", { w: "detail" }) + L.shape(L.smooth([[-24, -60], [0, -66], [24, -60], [30, -20], [22, 40], [16, 100], [8, 100], [0, 36], [-8, 100], [-16, 100], [-22, 40], [-30, -20], [-24, -60]]), "pink", { w: "detail" }) + ln([-12, 100], [-12, 128], { c: "red", w: 4 }) + ln([12, 100], [12, 128], { c: "blue", w: 4 }) +
    lab(o, 44, -70, 130, -110, "Enamel") + lab(o, 30, -20, 130, -50, "Dentin") + lab(o, 0, -30, -130, -80, "Pulp", "end") + lab(o, -90, 36, -150, 36, "Gum", "end") + lab(o, -90, 100, -150, 110, "Jaw bone", "end") + lab(o, 24, 100, 130, 100, "Root"); },
  "Tooth (cross-section)", ["tooth", "enamel", "dentin", "pulp", "dental"], { box: [-290, -140, 540, 290], demo: { labels: true } });

// ---------- DNA ----------
reg("body-dna", (o) => { const N = 28, H = 300, y0 = -H / 2, A = 46, tw = 3.2, pts = (ph) => Array.from({ length: N + 1 }, (_, i) => { const t = (i / N) * tw * Math.PI * 2 + ph; return { x: Math.sin(t) * A, y: y0 + (i / N) * H, z: Math.cos(t) }; });
  const a = pts(0), b = pts(Math.PI), cols = ["red", "yellow", "green", "blue"];
  const seg = (p, zs) => { let out = "", cur = []; const flush = () => { if (cur.length > 1) { const d = L.smooth(cur); out += L.stroke(d, { c: "ink", w: 15 }) + L.stroke(d, { c: zs.c, w: 9 }); } cur = []; };
    p.forEach((q, i) => { const front = zs.front ? q.z >= 0 : q.z < 0; if (front) cur.push([q.x, q.y]); else flush(); }); flush(); return out; };
  let s = seg(a, { front: false, c: "blue" }) + seg(b, { front: false, c: "red" });
  for (let i = 1; i < N; i += 2) { const p = a[i], q = b[i], c = cols[(i >> 1) % 4], m = [(p.x + q.x) / 2, p.y]; s += L.stroke(L.line([p.x, p.y], [m[0], m[1]]), { c: "ink", w: 12 }) + L.stroke(L.line([p.x, p.y], [m[0], m[1]]), { c, w: 7 }) + L.stroke(L.line([q.x, q.y], [m[0], m[1]]), { c: "ink", w: 12 }) + L.stroke(L.line([q.x, q.y], [m[0], m[1]]), { c: cols[((i >> 1) + 2) % 4], w: 7 }); }
  return s + seg(a, { front: true, c: "blue" }) + seg(b, { front: true, c: "red" }) + lab(o, 0, 0, 100, -60, "Base pairs") + lab(o, a[N >> 1].x, 0, -110, 40, "Strand", "end"); },
  "DNA double helix", ["dna", "gene", "helix", "genetic", "biology"], { box: [-110, -170, 220, 340] });

// ---------- cells and blood ----------
const mito = (x, y, rot) => L.g(P([[-26, 0], [-10, -15], [14, -15], [28, 0], [14, 15], [-10, 15]], "orange") + sm([[-16, 0], [-8, -8], [0, 6], [8, -8], [16, 0]], { c: "red", op: 0.7 }), `translate(${x} ${y}) rotate(${rot})`);
reg("body-cell", (o) => { const mem = L.smooth([[-150, 0], [-130, -70], [-70, -112], [10, -120], [90, -104], [140, -50], [150, 20], [120, 84], [50, 118], [-30, 120], [-100, 94], [-140, 50], [-150, 0]]);
  return L.shape(mem, "pink", { tone: 1 }) + clip(mem, L.flat(L.circ(-80, -70, 70, 30), "white", 0.3)) + B(-90, -52, 22, 18, "sky", { w: "detail" }) + L.flat(L.circ(-96, -58, 6, 4), "white", 0.8) +
    [0, 1, 2].map((i) => sm([[26 + i * 10, 6 + i * 12], [50 + i * 10, -4 + i * 12], [74 + i * 10, 10 + i * 12], [96 + i * 6, 0 + i * 12]], { c: "teal", w: 6 })).join("") + B(-14, -4, 56, 52, "purple", { tone: 1 }) + B(-6, -2, 18, 18, "purple", { tone: 2, w: "detail" }) + [[-34, -24], [-32, 22], [18, -26], [24, 26]].map(([x, y]) => dot(x, y, 3, "navy", 0.5)).join("") + L.flat(L.circ(-30, -30, 16, 8), "white", 0.3) +
    mito(70, -58, -20) + mito(-90, 66, 25) + mito(96, 72, -10) + [0, 1, 2].map((i) => LB([[-34, 94 + i * 9 - 8], [0, 84 + i * 9 - 8], [34, 94 + i * 9 - 8]], 8, 8, "yellow", { w: "detail" })).join("") +
    [[-70, 20], [-110, 10], [110, -20], [100, 50], [20, 100]].map(([x, y]) => B(x, y, 9, 9, "green", { w: "detail" })).join("") + [[-50, -80], [-20, -92], [60, -90], [-110, -10], [-120, 40], [110, 90], [0, 60], [-60, 80], [130, 20], [-30, 100]].map(([x, y]) => dot(x, y, 2.6, "ink", 0.55)).join("") + (o.face ? face(30, 56, 0.8) : "") +
    lab(o, -14, -4, -60, -170, "Nucleus", "middle") + lab(o, 70, -58, 190, -110, "Mitochondrion") + lab(o, 100, 4, 190, -20, "Endoplasmic reticulum") + lab(o, -143, 24, -210, 70, "Membrane", "end") + lab(o, 110, 90, 190, 110, "Cytoplasm") + lab(o, -70, 20, -210, 20, "Lysosome", "end") + lab(o, 22, 96, 190, 170, "Golgi apparatus"); },
  "Cell (animal)", ["cell", "nucleus", "mitochondria", "biology", "organelle"], { box: [-180, -150, 360, 300] });
reg2("body-cell-labeled", "body-cell", { labels: true }, "Cell (labelled)", ["cell", "labelled", "organelles"], { box: [-350, -190, 880, 380] });
const dropD = "M0 -100 C22 -62 68 -12 68 38 C68 80 38 102 0 102 C-38 102 -68 80 -68 38 C-68 -12 -22 -62 0 -100 Z";
reg("body-blood-drop", (o) => L.shape(dropD, "red") + L.flat("M-40 40 C-44 14 -30 -12 -14 -30 C-24 -6 -26 20 -22 46 Z", "white", 0.45) + (o.face === false ? "" : face(8, 40, 1)), "Blood drop", ["blood", "drop", "donate", "red"], { box: [-110, -130, 220, 260] });
const rbcAt = (x, y, r, rot, o, f) => L.g(B(0, 0, r, r * 0.92, "red") + B(0, 0, r * 0.52, r * 0.46, "red", { tone: 2, flat: true, w: "detail" }) + L.flat(L.circ(-r * 0.4, -r * 0.45, r * 0.18, r * 0.1), "white", 0.5) + (f ? face(0, r * 0.05, r / 90) : ""), `translate(${x} ${y}) rotate(${rot})`);
reg("body-red-blood-cell", (o) => rbcAt(0, 0, 90, 0, o, o.face !== false), "Red blood cell", ["red blood cell", "rbc", "blood", "oxygen"], { box: [-110, -110, 220, 220] });
const wbcD = (r) => L.smooth(Array.from({ length: 17 }, (_, i) => { const a = (i % 16) / 16 * 6.283, k = 1 + 0.06 * Math.sin(a * 7); return [Math.cos(a) * r * k, Math.sin(a) * r * k]; }));
const wbcAt = (x, y, r, o, f) => L.g(L.shape(wbcD(r), "white", { tone: 1 }) + B(-r * 0.3, -r * 0.4, r * 0.28, r * 0.26, "purple", { tone: 1, w: "detail" }) + B(r * 0.18, -r * 0.46, r * 0.26, r * 0.24, "purple", { tone: 1, w: "detail" }) + B(r * 0.5, -r * 0.1, r * 0.22, r * 0.22, "purple", { tone: 1, w: "detail" }) + (f ? face(0, r * 0.28, r / 100) : ""), `translate(${x} ${y})`);
reg("body-white-blood-cell", (o) => wbcAt(0, 0, 100, o, o.face !== false), "White blood cell", ["white blood cell", "immune", "defender", "blood"], { box: [-120, -120, 240, 240] });
reg("body-blood-vessel", (o) => { const tube = L.rrect(-200, -64, 400, 128, 64), inner = L.rrect(-190, -54, 380, 108, 54);
  return L.shape(tube, "pink", { tone: 2 }) + L.shape(inner, "red", { tone: 1, flat: true, w: "detail", c: "none" }).replace(/fill="[^"]*"/, `fill="${L.mix(L.c("pink", 1), "#ffffff", 0.35)}"`) + rbcAt(-140, -8, 30, 15, o, o.face) + rbcAt(-70, 16, 28, -20, o, o.face) + rbcAt(10, -22, 31, 30, o, o.face) + wbcAt(80, 8, 38, o, o.face) + rbcAt(150, -14, 28, -8, o, o.face) + rbcAt(-20, 24, 24, 50, o, false) +
    [[-100, 22], [40, 28], [120, -34], [-40, -30]].map(([x, y]) => L.flat(L.circ(x, y, 8, 6), "purple", 0.8)).join("") + [-60, 60].map((x) => L.stroke(L.line([x - 20, -90], [x + 30, -90]), { c: "ink", w: 4 }) + L.flat(L.poly([[x + 28, -98], [x + 44, -90], [x + 28, -82]], true), "ink")).join("") + lab(o, -140, -8, -150, -120, "Red cell", "middle") + lab(o, 80, 8, 90, 100, "White cell", "middle") + lab(o, 40, 28, 150, 100, "Platelet"); },
  "Blood vessel with cells", ["blood", "vessel", "artery", "vein", "cells", "flow"], { box: [-240, -150, 480, 300] });

// ---------- germs (cute, never scary) ----------
reg("body-virus", (o) => { const c = o.c || "green"; let s = ""; for (let i = 0; i < 12; i++) { const a = (i / 12) * Math.PI * 2 + 0.2, x = Math.cos(a), y = Math.sin(a); s += LB([[x * 50, y * 50], [x * 84, y * 84]], 10, 8, c, { tone: 2 }) + B(x * 90, y * 90, 12, 12, "yellow"); }
  return s + B(0, 0, 66, 66, c) + L.flat(L.circ(-26, -34, 20, 10), "white", 0.4) + [[-30, 26], [34, -26], [38, 34]].map(([x, y]) => B(x, y, 6, 6, c, { tone: 2, w: "detail" })).join("") + eye(-20, -8, 12, 0.3) + eye(20, -8, 12, 0.3) + sm([[-14, 20], [0, 30], [14, 20]]) + blush(-34, 14, 8) + blush(34, 14, 8); },
  "Virus (cute)", ["virus", "germ", "cold", "flu", "microbe"], { box: [-120, -120, 240, 240] });
reg("body-bacteria", (o) => { const c = o.c || "teal"; return L.g(L.stroke(L.smooth([[-70, 0], [-96, 14], [-120, -10], [-146, 10], [-168, -6]]), { c: "ink", w: 11 }) + L.stroke(L.smooth([[-70, 0], [-96, 14], [-120, -10], [-146, 10], [-168, -6]]), { c: c, w: 6 }) +
    [-40, 0, 40].map((x) => L.stroke(L.line([x, -34], [x - 4, -52]), { c: "ink", w: 5 }) + L.stroke(L.line([x, 34], [x - 4, 52]), { c: "ink", w: 5 })).join("") +
    L.shape(L.rrect(-76, -38, 152, 76, 38), c) + L.flat(L.rrect(-60, -30, 60, 14, 7), "white", 0.35) + [[-50, 18], [20, 22], [50, -14]].map(([x, y]) => B(x, y, 6, 6, c, { tone: 2, w: "detail" })).join("") + eye(-12, -4, 11, 0.3) + eye(24, -4, 11, 0.3) + sm([[-4, 18], [8, 26], [20, 18]]) + blush(-26, 14, 7) + blush(38, 14, 7), "rotate(-14)"); },
  "Bacteria (cute)", ["bacteria", "germ", "microbe", "bug"], { box: [-190, -110, 340, 220] });

// ---------- whole body ----------
const bodyOrgans = (o) => { const skin = o.skin || "s2", sh = (x) => [-1, 1].map((m) => x(m)).join(""), u = (n, x, y, k) => L.g(L.inline(n, {}), `translate(${x} ${y}) scale(${k})`);
  let s = L.shadow(0, 224, 130);
  s += sh((m) => LB([[m * 18, 50], [m * 20, 130], [m * 22, 206]], 36, 28, skin) + B(m * 24, 214, 24, 10, "navy", { w: "detail" }));
  s += sh((m) => LB([[m * 58, -128], [m * 82, -70], [m * 90, -14]], 28, 22, skin) + B(m * 91, -4, 13, 13, skin, { w: "detail" }));
  s += LB([[0, -170], [0, -146]], 20, 20, skin) + sh((m) => LB([[m * 58, -128], [m * 74, -96]], 36, 32, "blue"));
  s += P([[-54, -144], [-22, -156], [22, -156], [54, -144], [52, 30], [-52, 30]], "blue") + P([[-50, 22], [50, 22], [54, 96], [6, 100], [0, 70], [-6, 100], [-54, 96]], "navy");
  s += B(0, -198, 36, 38, skin);
  if (o.organs === false) return s + eye(-13, -200, 7, 0.2) + eye(13, -200, 7, 0.2) + sm([[-10, -184], [0, -178], [10, -184]]);
  s += u("body-brain", 0, -196, 0.2) + u("body-lungs", 0, -104, 0.36) + u("body-liver", -18, -42, 0.3) + u("body-stomach", 16, -46, 0.25) + u("body-heart", 10, -92, 0.23) + u("body-intestines", 0, -2, 0.32);
  return s + lab(o, 0, -196, 110, -230, "Brain") + lab(o, -30, -104, -120, -130, "Lungs", "end") + lab(o, 14, -92, 120, -100, "Heart") + lab(o, -36, -42, -120, -60, "Liver", "end") + lab(o, 28, -46, 120, -40, "Stomach") + lab(o, 10, 4, 120, 40, "Intestines"); };
reg("body-organs", bodyOrgans, "Body with organs", ["body", "organs", "human", "anatomy", "silhouette"], { box: [-130, -250, 260, 500] });
reg2("body-organs-labeled", "body-organs", { labels: true }, "Body with organs (labelled)", ["body", "organs", "labelled"], { box: [-250, -260, 500, 510] });
reg("body-silhouette", (o) => bodyOrgans(Object.assign({}, o, { organs: false })), "Body outline (no organs)", ["body", "human", "silhouette", "outline"], { box: [-130, -250, 260, 500] });

})();
