// ===================== library/thoughts.js — thought bubbles that hold a picture or text, a crowd of thoughts, and a few props (ep45) =====================
(function () {
const L = window.L, f1 = L.f1;
// cloud outline: n outward bumps around an ellipse rx × ry, jittered by seed
const cloud = (rx, ry, n, seed) => {
  const r = L.rng(seed), pts = [];
  for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2 + (r() - 0.5) * 0.25; pts.push([Math.cos(a) * rx, Math.sin(a) * ry]); }
  let d = `M${f1(pts[0][0])} ${f1(pts[0][1])}`;
  for (let i = 0; i < n; i++) { const p = pts[i], q = pts[(i + 1) % n], br = Math.hypot(q[0] - p[0], q[1] - p[1]) * (0.52 + r() * 0.1); d += ` A${f1(br)} ${f1(br)} 0 0 1 ${f1(q[0])} ${f1(q[1])}`; }
  return d + " Z";
};
const dashed = (s) => s.replace("<path ", '<path stroke-dasharray="16 12" ');
// three shrinking circles from the bubble edge toward (tx, ty), the head it belongs to
const tail = (rx, ry, tx, ty, fill, faint) => {
  const a = Math.atan2(ty / ry, tx / rx), ex = Math.cos(a) * rx, ey = Math.sin(a) * ry, R = Math.min(34, Math.max(rx, ry) * 0.14);
  return [[0.3, 1], [0.62, 0.68], [0.9, 0.42]].map(([f, k]) => { const c = L.shape(L.circ(ex + (tx - ex) * f, ey + (ty - ey) * f, R * k), fill, { flat: true, w: "detail" }); return faint ? dashed(c) : c; }).join("");
};
// small marks inside crowd bubbles: scribbles, a "?", a heart, a music note
const heart = (k) => `M0 ${f1(12 * k)} C${f1(-30 * k)} ${f1(-10 * k)} ${f1(-14 * k)} ${f1(-30 * k)} 0 ${f1(-14 * k)} C${f1(14 * k)} ${f1(-30 * k)} ${f1(30 * k)} ${f1(-10 * k)} 0 ${f1(12 * k)} Z`;
const marks = (m, rx, ry, seed) => {
  const r = L.rng(seed + 3), k = rx / 110;
  if (m === 3) return L.text("?", 0, 26 * k, { size: 78 * k, c: "gray" });
  if (m === 4) return L.shape(heart(1.6 * k), "red", { flat: true, w: "detail" });
  if (m === 5) return L.stroke(`M${f1(8 * k)} ${f1(-26 * k)} L${f1(8 * k)} ${f1(14 * k)} M${f1(8 * k)} ${f1(-26 * k)} Q${f1(26 * k)} ${f1(-22 * k)} ${f1(28 * k)} ${f1(-6 * k)}`, { w: "detail", c: "ink" }) + L.flat(L.circ(-2 * k, 15 * k, 11 * k), "ink");
  let s = ""; const n = 2 + (m % 2);
  for (let i = 0; i < n; i++) { const y = (i - (n - 1) / 2) * ry * 0.42, wd = rx * (0.55 + r() * 0.3); s += L.stroke(L.smooth([[-wd, y], [-wd / 3, y - 8 * k], [wd / 3, y + 8 * k], [wd * (i === n - 1 ? 0.3 : 1), y]]), { w: "detail", c: "gray" }); }
  return s;
};

// bubble size: fixed 240 x 170 for pictures, grown to fit the text (lines split on "|") otherwise
L.thoughtBox = (o) => {
  if (!o.text) return [o.rx || 240, o.ry || 170];
  const lines = String(o.text).split("|"), size = o.size || 64, long = Math.max(...lines.map((l) => l.length));
  return [o.rx || Math.max(240, long * size * 0.31 + 60), o.ry || Math.max(170, lines.length * size * 0.68 + 70)];
};
L.reg("text", "thought-pic", (o) => {
  const [rx, ry] = L.thoughtBox(o), fill = o.c || "white", faint = o.kind === "faint";
  const tx = o.tx ?? -rx * 0.75, ty = o.ty ?? ry + 120;
  let s = o.noTail ? "" : tail(rx, ry, tx, ty, fill, faint);
  const body = L.shape(cloud(rx, ry, o.n || 11, o.seed || 7), fill, { flat: true, w: o.w || "prop", op: faint ? 0.85 : undefined });
  s += faint ? dashed(body) : body;
  let inner = "";
  if (o.pic) inner += L.g(L.inline(o.pic, o.picO || {}), `translate(${f1(o.picX || 0)} ${f1(o.picY || 0)}) scale(${o.picS || 1})`);
  if (o.text) {
    const lines = String(o.text).split("|"), size = o.size || 64;
    lines.forEach((ln, i) => (inner += L.text(ln, 0, (o.textY || 0) + size * 0.35 + (i - (lines.length - 1) / 2) * size * 1.15, { size, c: o.tc || "ink" })));
  }
  return s + (faint ? L.g(inner, "", 0.75) : inner);
}, { box: [-420, -300, 840, 640], group: "Thoughts", label: "Thought bubble · picture or text", tags: ["thought", "bubble", "think", "mind", "cloud", "picture", "half-formed", "faint", "idea"],
  call: 'L.put(S, "thought-pic", x, y, { s, t, text: "line one|line two", size: 52, pic: "prop-gift", picS: 1, picX: 0, picY: 0, picO: {}, rx: 240, ry: 170, tx, ty, noTail, kind: "clear"|"faint", c: "white", seed })',
  demo: { text: "Did I leave|the oven on?" } });

L.reg("text", "thought-flood", (o) => {
  const w = o.w || 1600, h = o.h || 420, n = o.n || 26, r = L.rng(o.seed || 45), items = [];
  for (let i = 0; i < n; i++) items.push({ x: (r() - 0.5) * w, y: (r() - 0.5) * h, rx: (o.min || 80) + r() * (o.var || 90), seed: 1 + Math.floor(r() * 999), m: Math.floor(r() * 6) });
  items.sort((a, b) => a.y - b.y);
  return items.map((it) => { const ry = it.rx * 0.68; return L.g(L.shape(cloud(it.rx, ry, 9, it.seed), o.c || "white", { flat: true, w: "detail" }) + marks(it.m, it.rx, ry, it.seed), `translate(${f1(it.x)} ${f1(it.y)})`); }).join("");
}, { box: [-860, -300, 1720, 600], group: "Thoughts", label: "Crowd of thoughts (overlapping bubbles)", tags: ["thought", "bubbles", "crowd", "noise", "overload", "flood", "busy", "minds", "many"],
  call: 'L.put(S, "thought-flood", x, y, { s, t, w: 1600, h: 420, n: 26, min: 80, var: 90, seed })', demo: { w: 1600, h: 420, n: 26 } });

L.reg("props", "prop-umbrella-ducks", (o) => {
  const c = o.c || "yellow", sc = [-120, -60, 0, 60, 120];
  let d = `M-120 0 C-120 -80 -70 -124 0 -124 C70 -124 120 -80 120 0`; for (let i = 4; i > 0; i--) d += ` Q${sc[i] - 30} -22 ${sc[i - 1]} 0`;
  const duck = (x, y, k) => L.g(L.shape(`M-16 2 C-16 -10 -2 -12 6 -6 C10 -16 22 -16 24 -6 C26 2 18 6 12 6 C12 12 0 14 -8 12 C-14 10 -16 6 -16 2 Z`, "white", { flat: true, w: "hair" }) + L.shape(`M24 -9 L33 -6 L24 -3 Z`, "orange", { flat: true, w: "hair" }) + L.flat(L.circ(16, -10, 2.2), "ink"), `translate(${x} ${y}) scale(${k})`);
  return L.stroke(`M0 -2 L0 104 Q0 126 -20 126 Q-34 126 -34 112`, { w: "prop" }) + L.shape(d, c, { w: "prop" }) +
    L.stroke(`M0 -124 Q-22 -60 -60 0 M0 -124 Q22 -60 60 0`, { w: "hair", c: L.c(c, 2) }) + duck(-78, -40, 0.9) + duck(-6, -86, 0.9) + duck(66, -40, 0.9) + L.stroke(`M0 -124 L0 -140`, { w: "prop" });
}, { box: [-150, -160, 300, 300], group: "Home and tools", label: "Umbrella with ducks", tags: ["umbrella", "duck", "gift", "rain", "present", "yellow", "cute"], call: 'L.put(S, "prop-umbrella-ducks", x, y, { s: 1, t, c: "yellow" })' });

L.reg("props", "prop-fishbowl", (o) => {
  const R = 120, yr = -96, xr = Math.sqrt(R * R - yr * yr), yw = -58, xw = Math.sqrt(R * R - yw * yw), yg = 78, xg = Math.sqrt(R * R - yg * yg);
  const bowl = `M${f1(-xr)} ${yr} A${R} ${R} 0 1 0 ${f1(xr)} ${yr} Z`;
  return L.shadow(0, R, 200) + L.flat(bowl, "glass", 0.45) + L.flat(`M${f1(-xw)} ${yw} A${R} ${R} 0 1 0 ${f1(xw)} ${yw} Z`, "water", 0.75) +
    L.flat(`M${f1(-xg)} ${yg} A${R} ${R} 0 0 0 ${f1(xg)} ${yg} Z`, "sand", 1) + L.g(L.inline("animal-fish", { c: o.c || "orange" }), "translate(8 6) scale(0.62)") +
    L.flat(L.arc(0, 0, R - 18, 200, 250), "white", 0.6) + L.stroke(L.arc(0, 0, R - 20, 200, 250), { w: "detail", c: "white" }) +
    L.stroke(bowl, { w: "prop" }) + L.shape(L.circ(0, yr, xr, 12), "glass", { flat: true, w: "detail" });
}, { box: [-150, -140, 300, 290], group: "Home and tools", label: "Goldfish bowl", tags: ["goldfish", "fish", "bowl", "pet", "aquarium", "water"], call: 'L.put(S, "prop-fishbowl", x, y, { s: 1, t, c: "orange" })' });

L.reg("props", "prop-beeper", (o) => {
  return L.shape(L.rrect(-24, -58, 48, 22, 6), "gray", { w: "detail" }) + L.shape(L.rrect(-72, -42, 144, 84, 14), o.c || "teal", { w: "prop" }) +
    L.shape(L.rrect(-56, -28, 80, 40, 6), "green", { flat: true, tone: 1, w: "detail" }) + L.text(o.text || "BEEP", -16, 0, { size: 24, c: "ink" }) +
    L.shape(L.circ(46, -6, 12), "red", { w: "detail" }) + L.shape(L.circ(46, 24, 7), "gray", { flat: true, w: "hair" });
}, { box: [-110, -90, 220, 180], group: "Home and tools", label: "Beeper / pager", tags: ["beeper", "pager", "alarm", "random", "signal", "experience sampling", "beep"], call: 'L.put(S, "prop-beeper", x, y, { s: 1, t, text: "BEEP", c: "teal" })' });

L.reg("science", "sci-mri-scanner", (o) => {
  const by = -300, R = 140;
  return L.shadow(0, 0, 520) + L.shape(L.rrect(-240, -540, 480, 470, 36), o.c || "white", { w: "prop" }) +
    L.shape(L.circ(0, by, R + 34), "gray", { flat: true, tone: 1, w: "detail" }) + L.shape(L.circ(0, by, R), "navy", { flat: true, tone: 2, w: "detail" }) +
    L.flat(L.circ(0, by + 18, R - 30, R - 48), "navy", 0.6) + L.shape(L.circ(190, -500, 12), "green", { flat: true, w: "hair" }) +
    L.shape(L.rrect(-110, -150, 220, 150, 12), "gray", { w: "prop" }) +
    L.shape(`M-86 ${by + R - 26} L86 ${by + R - 26} L150 -150 L-150 -150 Z`, "sky", { tone: 1, w: "prop" }) + L.shape(L.rrect(-160, -158, 320, 22, 10), "white", { w: "detail" }) +
    L.stroke(`M-200 -100 L200 -100`, { w: "hair", c: "gray" });
}, { box: [-300, -580, 600, 600], group: "Lab", label: "Brain scanner (MRI)", tags: ["mri", "fmri", "scanner", "brain scan", "hospital", "medical", "lab", "research"], call: 'L.put(S, "sci-mri-scanner", x, gy, { s: 1, t, c: "white" })' });
})();
