// helpers copied from ../scenes.js (same Dave, lips, bacteria and Earth as the video)

// ---------- people ----------
// a figure on a depth plane; shadow and body share one group (F.all). o.float = no contact shadow
const who = (S, x, gy, layer = "near", o = {}) => {
  const s = (o.s || 1.1) * DS.depth[layer].s, g = o.parent || S.grp();
  if (!o.float) DS.shadow(S, x, o.gs ?? gy, 150 * s, { t: o.t, parent: g });
  const F = S.fig(x, gy, Object.assign({ hair: "short", outfit: "tee" }, o, { s, parent: g, w: DS.w[DS.depth[layer].w] * 1.3 * Math.sqrt(s) })).draw(o.t ?? S.start, 0.4);
  F.face(o.t ?? S.start, o.mood || "flat", o.look || 0);
  F.all = g;
  return F;
};
const dave = (S, x, gy, layer = "near", o = {}) => who(S, x, gy, layer, Object.assign({ s: 1.1, hair: "side", hairC: DS.c("brown"), outfitC: DS.c("blue") }, o));
const DATE = { hair: "bun", hairC: DS.c("ink"), outfitC: DS.c("purple") }; // Dave's Friday date (purple is hers alone)
const date = (S, x, gy, layer = "near", o = {}) => who(S, x, gy, layer, Object.assign({ s: 1.05 }, DATE, o));
const OC = ["green", "orange", "pink", "gold", "red", "earth", "gray", "yellow"]; // no blue (Dave), no purple (his date)
const HAIR = ["short", "bun", "curly", "side", "messy", "short", "bun", "curly"];
const HC = [["brown", 0], ["ink", 0], ["gray", 1], ["earth", 2], ["brown", 2], ["gray", 2], ["earth", 0], ["ink", 1]];
const person = (S, x, gy, layer, i, o = {}) => who(S, x, gy, layer, Object.assign({ s: 1.1, hair: HAIR[i % 8], hairC: DS.c(HC[i % 8][0], HC[i % 8][1], layer), outfitC: DS.c(OC[i % 8], 0, layer), mood: "flat", look: ((i % 3) - 1) * 5 }, o));
const SCI = { hair: "short", hairC: DS.c("brown", 2), outfitC: DS.c("white") }; // a generic researcher in a lab coat (never a likeness)
const seated = (S, x, top, o = {}) => (o.fn || who)(S, x, top + 50, "near", Object.assign({ sit: true, pose: "hold" }, o));
// seek-safe lean (rotation about the feet) for the cheek kiss and the right turn
const lean = (F, t, deg, dur = 0.5, from = 0) => tl.fromTo(F.gi, { attr: { transform: `rotate(${from} ${F.cx} ${F.gy})` } }, { attr: { transform: `rotate(${deg} ${F.cx} ${F.gy})` }, duration: dur, ease: "power2.inOut", immediateRender: false }, t);
// a round hand at the end of a stick arm (handshake practice); fist = closed, with knuckle lines
const mitt = (S, F, side = "R", o = {}) => { const [x, y] = F.hand(side), k = F.s, g = S.grp(o.parent || F.g); DS.shape(S, circ(x, y, (o.fist ? 17 : 14) * k), o.skin || "white", { t: o.t, w: "detail", parent: g }); if (o.fist) [-6, 3].forEach((d) => S.draw(line([x + 6 * k * (side === "R" ? 1 : -1), y + d * k], [x + 13 * k * (side === "R" ? 1 : -1), y + d * k], 0), o.t ?? S.start, 0, { c: DS.c("ink"), w: DS.w.hair, parent: g })); return g; };

// ---------- small kit ----------
let CP = 0;
const clipTo = (g, d) => { const id = "cp" + ++CP, cp = el("clipPath", { id }, dsDefs()); el("path", { d }, cp); g.setAttribute("clip-path", `url(#${id})`); return g; };
const spin = (g, t, dur, d0, d1, cx, cy, ease = "power2.inOut") => tl.fromTo(g, { attr: { transform: `rotate(${d0} ${cx} ${cy})` } }, { attr: { transform: `rotate(${d1} ${cx} ${cy})` }, duration: dur, ease, immediateRender: false }, t);
const dash = (p, a, b) => { p.removeAttribute("pathLength"); p.setAttribute("stroke-dasharray", `${a} ${b}`); return p; };
const txt = (S, s, x, y, o = {}) => S.text(s, x, y, Object.assign({ size: DS.type.caption, c: DS.c("ink") }, o));
const capsule = (a, b, r) => { const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1, nx = (-dy / L) * r, ny = (dx / L) * r; return `M${a[0] + nx} ${a[1] + ny} L${b[0] + nx} ${b[1] + ny} A${r} ${r} 0 0 0 ${b[0] - nx} ${b[1] - ny} L${a[0] - nx} ${a[1] - ny} A${r} ${r} 0 0 0 ${a[0] + nx} ${a[1] + ny} Z`; };
const panel = (S, cx, cy, w, h, t, name = "white") => { DS.drop(S, rrect(cx - w / 2 + 8, cy - h / 2 + 12, w, h, DS.r.md), { t }); DS.shape(S, rrect(cx - w / 2, cy - h / 2, w, h, DS.r.md), name, { t, flat: true, w: "detail" }); };
const say = (S, cx, cy, rx, ry, tx, ty, strs, t, o = {}) => {
  const g = S.grp(); (o.think ? S.thought : S.speech)(cx, cy, rx, ry, tx, ty, t, 0.3, { parent: g });
  const size = o.size || DS.type.small, n = strs.length;
  strs.forEach((s, i) => S.text(s, cx, cy + size * 0.36 + (i - (n - 1) / 2) * size * 1.2, { size, t, c: o.c ? DS.c(o.c, 2) : DS.c("ink"), parent: g }));
  return g;
};
// quote panel: lines of a real quote + who said it. o.ts = per-line times
const quote = (S, cx, cy, strs, by, o = {}) => {
  const t = o.t, g = S.grp(), size = o.size || DS.type.small, lh = size * 1.25, n = strs.length;
  const w = Math.max(...strs.map((s) => s.length)) * size * 0.62 + 130, h = n * lh + (by ? 66 : 0) + 64, y0 = cy - h / 2;
  DS.drop(S, rrect(cx - w / 2 + 8, y0 + 12, w, h, DS.r.md), { t, parent: g });
  DS.shape(S, rrect(cx - w / 2, y0, w, h, DS.r.md), "white", { t, flat: true, w: "detail", parent: g });
  DS.shape(S, rect(cx - w / 2 + 22, y0 + 26, 10, n * lh), "blue", { t, flat: true, w: "hair", parent: g });
  strs.forEach((s, i) => S.text(s, cx + 14, y0 + 30 + lh * (i + 0.78), { size, t: (o.ts || [])[i] ?? t, c: DS.c("ink"), parent: g }));
  if (by) S.text(by, cx + 14, y0 + h - 30, { size: DS.type.caption, t, c: DS.c("blue", 2), parent: g });
  return g;
};
// small name plate (a name under a figure; not one of the picture's three labels)
const plate = (S, cx, cy, str, t, o = {}) => { const w = str.length * 25 + 48; DS.drop(S, rrect(cx - w / 2 + 4, cy - 26, w, 56, DS.r.sm), { t }); DS.shape(S, rrect(cx - w / 2, cy - 30, w, 56, DS.r.sm), o.fill || "white", { t, w: "detail", flat: true, tone: o.fill ? 1 : 0 }); S.text(str, cx, cy + 12, { size: DS.type.caption, t, c: DS.c("ink") }); };
const wboard = (S, x, y, w, h, t) => { DS.drop(S, rect(x + 8, y + 10, w, h), { t }); DS.shape(S, rrect(x, y, w, h, DS.r.sm), "wood", { layer: "mid", t }); DS.shape(S, rect(x + 22, y + 22, w - 44, h - 44), "white", { layer: "mid", w: "detail", flat: true, t }); };
const desk = (S, x, gy, w) => { DS.shadow(S, x + w / 2, gy, w); DS.shape(S, rrect(x, gy - 230, w, 40, DS.r.xs), "wood"); [x + 30, x + w - 50].forEach((lx) => DS.shape(S, rect(lx, gy - 190, 20, 190), "wood", { w: "mid" })); return gy - 230; };
const paperR = (S, x, y, w, h, o = {}) => { DS.drop(S, rect(x + 6, y + 8, w, h), { t: o.t, parent: o.parent }); DS.shape(S, rect(x, y, w, h), "white", { t: o.t, w: "detail", flat: true, parent: o.parent }); };
const lines = (S, x, y, w, n, t, gap = 36, parent) => { for (let i = 0; i < n; i++) S.draw(line([x, y + i * gap], [x + (i === n - 1 ? w * 0.6 : w), y + i * gap], 0), t ?? S.start, 0, { c: DS.c("gray", 1), w: DS.w.detail, parent }); };
const tick = (S, x, y, k, t, name = "green") => S.tick(x, y, k, t, 0, { c: DS.c(name), w: DS.w.near });
const xMark = (S, x, y, k, t) => S.cross(x, y, k, t, 0, { c: DS.c("red"), w: DS.w.near });
const stamp = (S, cx, cy, str, t, name = "red") => {
  const g = S.grp(), w = str.length * DS.type.small * 0.66 + 60, tf = (k) => `translate(${cx} ${cy}) rotate(-8) scale(${k}) translate(${-cx} ${-cy})`;
  S.draw(rrect(cx - w / 2, cy - 46, w, 92, DS.r.sm), S.start, 0, { c: DS.c(name, 2), w: DS.w.near, fill: DS.P.white[0], parent: g });
  S.text(str, cx, cy + 19, { size: DS.type.small, t: S.start, c: DS.c(name, 2), parent: g });
  tl.fromTo(g, { opacity: 0, attr: { transform: tf(1.4) } }, { opacity: 1, attr: { transform: tf(1) }, duration: 0.25, ease: "power3.in" }, t);
};
// seek-safe count-up of a big number
const countUp = (S, x, y, to, t, dur, o = {}) => {
  const te = S.text("0", x, y, Object.assign({ size: DS.type.display, t, c: DS.c("red", 2) }, o)), v = { n: 0 }, fmt = (n) => (o.pre || "") + Math.round(n).toLocaleString("en-US") + (o.post || "");
  te.textContent = fmt(0);
  tl.fromTo(v, { n: 0 }, { n: to, duration: dur, ease: "power2.out", immediateRender: false, onUpdate: () => (te.textContent = fmt(v.n)) }, t);
  return te;
};
const heart = (S, cx, cy, k = 1, o = {}) => DS.shape(S, heartPath(cx, cy, k), o.name || "pink", { t: o.t, w: k > 0.7 ? "mid" : "detail", parent: o.parent });
// little heart that floats up from (cx, cy) on its word (a cheek kiss, a "yes")
const hearts = (S, cx, cy, t, n = 3, k = 0.6) => { for (let i = 0; i < n; i++) { const h = heart(S, cx + (i - (n - 1) / 2) * 52 * k, cy - (i % 2) * 30 * k, k * (1 - (i % 2) * 0.25), { t: t + i * 0.18 }); S.move(h, t + i * 0.18, 1.6, { y: -60 }, "sine.out"); } };
const stopwatch = (S, cx, cy, r, o = {}) => {
  const t = o.t;
  DS.shape(S, rrect(cx - 18, cy - r - 46, 36, 34, DS.r.xs), "gray", { t, tone: 2, w: "detail" });
  DS.shape(S, circ(cx, cy, r), "white", { t });
  S.draw(rays(cx, cy, r * 0.8, r * 0.92, 12, -Math.PI / 2), t ?? S.start, 0, { c: DS.c("ink"), w: DS.w.detail });
  const hand = S.draw(line([cx, cy], [cx, cy - r * 0.75], 0), t ?? S.start, 0, { c: DS.c("red"), w: DS.w.near });
  tl.to(hand, { rotation: o.turn ?? 300, svgOrigin: `${cx} ${cy}`, duration: o.dur || 4, ease: "none" }, o.go ?? S.start);
  DS.shape(S, circ(cx, cy, 10), "ink", { t, w: "hair" });
};
// bar: x centre, base y, height; label under it
const bar = (S, cx, base, w, h, name, t, str, o = {}) => { const g = S.grp(); DS.shape(S, rect(cx - w / 2, base - h, w, h), name, { t, dir: "h", parent: g }); tl.fromTo(g, { attr: { transform: `translate(0 ${base}) scale(1 0.001) translate(0 ${-base})` } }, { attr: { transform: `translate(0 ${base}) scale(1 1) translate(0 ${-base})` }, duration: 0.6, ease: "power2.out", immediateRender: false }, t ?? S.start); if (str) txt(S, str, cx, base + 50, { t, size: o.size || DS.type.caption }); return g; };
// grid of n dots (cultures / couples). o.fills = [[k, t, dur, name]]: k dots fill in a scattered order over dur
const dotGrid = (S, cx, cy, n, cols, gap, r, o = {}) => {
  const rows = Math.ceil(n / cols), x0 = cx - ((cols - 1) * gap) / 2, y0 = cy - ((rows - 1) * gap) / 2, P = [];
  for (let i = 0; i < n; i++) P.push([x0 + (i % cols) * gap, y0 + Math.floor(i / cols) * gap]);
  P.forEach(([x, y]) => S.draw(circ(x, y, r), o.t ?? S.start, 0, { fill: DS.c("gray", 1), c: DS.c("gray", 2), w: DS.w.hair }));
  const order = P.map((p, i) => [((i * 7919 + 13) % 1009) / 1009, i]).sort((a, b) => a[0] - b[0]).map((a) => a[1]);
  (o.fills || []).forEach(([k, t, dur, name, done]) => order.slice(0, k).forEach((i, j) => S.draw(circ(P[i][0], P[i][1], r), done ? S.start : t + (dur * j) / k, 0, { fill: DS.c(name), c: DS.c(name, 2), w: DS.w.hair })));
  return P;
};

// ---------- sets ----------
const ROOM = { home: { wall: "wall", floor: "wood", window: [1380, 170, 220, 200] }, office: { wall: "paper", floor: "wood", window: false }, lab: { wall: "glass", floor: "gray", window: false },
  night: { wall: "night", floor: "wood", window: false }, board: { wall: "paper", floor: "wood", window: false, back: [170, 56, 1750, 830] }, hall: { wall: "sand", floor: "earth", window: [1180, 150, 300, 200] } };
const GN = 960;
const nightWin = (S, x, y, w, h) => {
  DS.shape(S, rrect(x - 14, y - 14, w + 28, h + 28, DS.r.xs), "white", { w: "detail" });
  DS.shape(S, rect(x, y, w, h), "night", { flat: true, tone: 2, w: "hair" });
  [[0.2, 0.2], [0.35, 0.62], [0.15, 0.8], [0.5, 0.14], [0.82, 0.72], [0.7, 0.3]].forEach(([a, b]) => S.fill(circ(x + w * a, y + h * b, 4), S.start, 0, DS.P.white[0], 0.85));
  S.draw(`M${x + w / 2} ${y} V${y + h} M${x} ${y + h / 2} H${x + w}`, S.start, 0, { c: DS.P.white[0], w: DS.w.mid });
};
const couch = (S, x, gy, w, name = "green") => {
  DS.shadow(S, x + w / 2, gy, w + 80);
  DS.shape(S, rrect(x + 10, gy - 330, w - 20, 210, DS.r.lg), name);
  DS.shape(S, rrect(x, gy - 140, w, 100, DS.r.md), name);
  [x - 40, x + w - 30].forEach((ax) => DS.shape(S, rrect(ax, gy - 220, 70, 180, DS.r.md), name));
  [x + 30, x + w - 50].forEach((lx) => DS.shape(S, rect(lx, gy - 40, 20, 40), "wood", { w: "mid" }));
  return gy - 132;
};
const laptop = (S, cx, top, w, h, o = {}) => {
  const t = o.t; DS.drop(S, rrect(cx - w / 2 + 8, top - h + 10, w, h, DS.r.sm), { t });
  DS.shape(S, rrect(cx - w / 2, top - h, w, h, DS.r.sm), "gray", { t, tone: 2, w: "mid" });
  DS.shape(S, rect(cx - w / 2 + 18, top - h + 18, w - 36, h - 44), o.screen || "navy", { t, flat: true, w: "hair", tone: o.tone ?? 0 });
  DS.shape(S, `M${cx - w / 2 - 30} ${top} L${cx + w / 2 + 30} ${top} L${cx + w / 2 + 10} ${top - 18} L${cx - w / 2 - 10} ${top - 18} Z`, "gray", { t, w: "detail" });
  return { x0: cx - w / 2 + 18, y0: top - h + 18, x1: cx + w / 2 - 18, y1: top - 26, cx, cy: top - h / 2 - 12 };
};
const table = (S, x0, x1, top, gy = 960) => { DS.shadow(S, (x0 + x1) / 2, gy, x1 - x0 + 60); DS.shape(S, rect(x0 + 24, top + 20, x1 - x0 - 48, gy - top - 20), "wood", { tone: 2 }); DS.shape(S, rrect(x0, top, x1 - x0, 28, DS.r.xs), "wood"); return top; };
const calendar = (S, x, y, w, h, o = {}) => {
  DS.drop(S, rect(x + 6, y + 8, w, h)); DS.shape(S, rect(x, y, w, h), "white", { flat: true, w: "detail" }); DS.shape(S, rect(x, y, w, 56), "red", { flat: true, tone: 2, w: "detail" });
  S.text(o.title || "FRIDAY", x + w / 2, y + 42, { size: DS.type.caption, c: DS.P.white[0] });
  for (let i = 0; i < 3; i++) for (let j = 0; j < 4; j++) DS.shape(S, rect(x + 20 + j * ((w - 40) / 4), y + 76 + i * ((h - 96) / 3), (w - 40) / 4 - 10, (h - 96) / 3 - 10), "paper", { flat: true, w: "hair" });
};
// Dave's front door: house front in the near plane, hills and sky behind. o.sky = "sky" (day) | "dusk" (Friday)
const DX = 1240;
const doorstep = (S, o = {}) => {
  DS.outdoor(S, { hy: 690, sky: o.sky || "sky", sun: o.sun ?? [330, 200] });
  DS.shape(S, rect(660, 216, 1500, 700), "wall", { dir: "h" });
  DS.shape(S, poly([[590, 236], [940, 40], [2200, 40], [2200, 236]], 0) + " Z", "brown");
  DS.shape(S, rect(640, 226, 1520, 24), "wood", { tone: 2, flat: true, w: "detail" });
  DS.shape(S, rrect(1520, 370, 260, 240, DS.r.xs), "white", { w: "mid" });
  DS.shape(S, rect(1542, 392, 216, 196), o.sky === "dusk" ? "gold" : "glass", { w: "detail", dir: "v", tone: o.sky === "dusk" ? 1 : 0 });
  S.draw(`M1650 392 V588 M1542 490 H1758`, S.start, 0, { c: DS.P.white[0], w: DS.w.mid });
  DS.shape(S, rect(DX - 150, 404, 300, 512), "white", { w: "mid" });
  DS.shape(S, rect(DX - 124, 430, 248, 486), "wood", { tone: 0, dir: "h" });
  [[456, 170], [646, 230]].forEach(([y, h]) => DS.shape(S, rrect(DX - 92, y, 184, h, DS.r.xs), "wood", { tone: 1, w: "detail" }));
  DS.shape(S, circ(DX + 88, 700, 13), "gold", { w: "detail" });
  if (o.sky === "dusk") S.fill(circ(DX - 250, 460, 100), S.start, 0, DS.glow(DS.P.yellow[1], 0.6), 1);
  DS.shape(S, rrect(DX - 274, 420, 48, 78, DS.r.sm), o.sky === "dusk" ? "yellow" : "glass", { w: "detail", tone: 1 });
  DS.shape(S, rrect(DX - 280, 408, 60, 20, DS.r.xs), "ink", { w: "hair", tone: 1 });
  DS.shape(S, rrect(DX - 210, 904, 420, 40, DS.r.xs), "gray", { tone: 1 });
  DS.shape(S, rrect(DX - 110, 896, 220, 16, DS.r.xs), "earth", { tone: 2, w: "detail" });
  return { door: [DX, 660] };
};
// zoo entrance; inside() draws what lives behind the bars
const zooGate = (S, cx, str, inside) => {
  DS.outdoor(S, { hy: 660, sky: "sky", sun: [1600, 170] });
  [[cx - 420, 1], [cx + 420, -1]].forEach(([x]) => { DS.shadow(S, x, 900, 200); DS.shape(S, rect(x - 50, 300, 100, 600), "earth", { dir: "h" }); DS.shape(S, rrect(x - 66, 270, 132, 50, DS.r.xs), "earth", { tone: 2 }); });
  DS.shape(S, rrect(cx - 520, 210, 1040, 140, DS.r.md), "green", { tone: 2 });
  DS.shape(S, rrect(cx - 490, 226, 980, 108, DS.r.sm), "white", { flat: true, w: "detail" });
  S.text(str, cx, 304, { size: DS.type.title, c: DS.c("green", 2) });
  if (inside) inside();
  for (let i = 0; i < 9; i++) S.draw(line([cx - 340 + i * 85, 400], [cx - 340 + i * 85, 900], 0), S.start, 0, { c: DS.c("gray", 2, "mid"), w: DS.w.mid });
  S.draw(line([cx - 370, 420], [cx + 370, 420], 0), S.start, 0, { c: DS.c("gray", 2, "mid"), w: DS.w.mid });
};
// the chimp hall at Burgers Zoo: indoor hall, climbing frame, metal drums in the corner
const hall = (S) => {
  DS.room(S, ROOM.hall);
  [[520, 300], [760, 300]].forEach(([x, y]) => DS.shape(S, rect(x - 14, y, 28, 460), "wood", { layer: "mid" }));
  DS.shape(S, rect(480, 380, 330, 24), "wood", { layer: "mid" }); DS.shape(S, rect(480, 560, 330, 24), "wood", { layer: "mid" });
  S.draw(smooth([[640, 404], [600, 470], [640, 540]]), S.start, 0, { c: DS.c("earth", 2, "mid"), w: DS.w.mid });
  [[1390, 700], [1470, 700], [1430, 610]].forEach(([x, y]) => { DS.shape(S, rrect(x - 40, y - 80, 80, 140, DS.r.sm), "gray", { layer: "mid", dir: "h" }); S.draw(line([x - 40, y - 34], [x + 40, y - 34], 0), S.start, 0, { c: DS.line("mid"), w: DS.w.hair }); S.draw(line([x - 40, y + 14], [x + 40, y + 14], 0), S.start, 0, { c: DS.line("mid"), w: DS.w.hair }); });
};
const OUT = { day: { hy: 640, sky: "sky", sun: [1600, 170] }, desert: { hy: 650, sky: "sky", sun: [1560, 160], hills: "sand", ground: "sand" }, dusk: { hy: 660, sky: "dusk", sun: [360, 230] } };
const STAR = Array.from({ length: 140 }, (_, i) => [((i * 733 + 151) % 1880) + 20, ((i * 397 + 67) % 1040) + 20, 1.6 + (i % 3) * 0.9, 0.4 + ((i * 7) % 6) * 0.1]);
const SPACE = { hy: 1400, sky: "navy", sun: false };
const space = (S, O) => { S.fill(rect(-200, -200, 2320, 1480), S.start, 0, DS.vgrad(DS.P.ink[2], DS.P.navy[2]), 0.72); STAR.slice(0, 70).forEach(([x, y, r, op]) => S.fill(circ(x, y, r), S.start, 0, DS.P.white[0], op)); return O; };
let LIMB;
const limb = () => { if (!LIMB) { LIMB = "ds-limb"; const gr = el("radialGradient", { id: LIMB, cx: 0.42, cy: 0.4, r: 0.62 }, dsDefs()); [[0.55, 0], [1, 0.5]].forEach(([of, a]) => el("stop", { offset: of, "stop-color": DS.P.navy[2], "stop-opacity": a }, gr)); } return `url(#${LIMB})`; };
const AFR = [[-0.36, -0.46], [-0.1, -0.52], [0.16, -0.47], [0.27, -0.34], [0.46, -0.13], [0.37, -0.05], [0.29, 0.18], [0.17, 0.42], [0.03, 0.58], [-0.06, 0.5], [-0.1, 0.26], [-0.14, 0.05], [-0.28, -0.02], [-0.47, -0.1], [-0.52, -0.3]];
const EUR = [[-0.5, -0.56], [-0.3, -0.78], [0.1, -0.86], [0.5, -0.8], [0.8, -0.56], [0.7, -0.5], [0.44, -0.58], [0.2, -0.54], [-0.1, -0.56], [-0.34, -0.5]];
const SAH = [[-0.42, -0.36], [-0.1, -0.45], [0.15, -0.4], [0.2, -0.26], [0.02, -0.16], [-0.3, -0.13], [-0.44, -0.22]];
const ARB = [[0.31, -0.52], [0.47, -0.47], [0.66, -0.29], [0.6, -0.19], [0.5, -0.16], [0.37, -0.36]];
const MAD = [[0.37, 0.27], [0.43, 0.31], [0.41, 0.45], [0.34, 0.46], [0.33, 0.35]];
const CLD = [[[-0.92, 0.66], [-0.5, 0.6], [-0.1, 0.69], [0.32, 0.62], [0.86, 0.68]], [[0.52, 0.06], [0.68, -0.04], [0.8, 0.1], [0.68, 0.22], [0.58, 0.12]], [[-0.78, -0.12], [-0.62, -0.24], [-0.72, 0.02]], [[0.02, 0.1], [0.14, 0.04], [0.24, 0.12]]];
const earth = (S, cx, cy, r, o = {}) => {
  const T = o.t ?? S.start, g = S.grp(o.parent), U = (pts) => pts.map(([a, b]) => [cx + a * r, cy + b * r]), lw = r < 60 ? DS.w.detail : DS.w.mid;
  S.fill(circ(cx, cy, r * 1.06), T, 0, DS.c("sky", 1), 0.4, g);
  S.draw(circ(cx, cy, r), T, 0, { fill: DS.vol("blue"), c: DS.c("ink"), w: lw, parent: g });
  const k = clipTo(S.grp(g), circ(cx, cy, r));
  const land = (pts, n) => S.draw(smooth(U(pts)) + " Z", T, 0, { fill: DS.c(n), c: DS.c(n, 2), w: DS.w.hair, parent: k });
  land(AFR, "grass"); land(EUR, "grass"); land(SAH, "sand"); land(ARB, "sand"); land(MAD, "grass");
  CLD.forEach((p) => S.draw(smooth(U(p)), T, 0, { c: DS.P.white[0], w: r > 200 ? DS.w.near : DS.w.mid, parent: k, op: 0.85 }));
  S.fill(circ(cx, cy, r), T, 0, limb(), 1, k);
  S.draw(circ(cx, cy, r), T, 0, { c: DS.c("ink"), w: lw, parent: g });
  return { g, cx, cy, r };
};

// ---------- apes (cartoon, at a distance, never romantic) ----------
const APE = { chimp: { body: "brown", face: ["earth", 1], ears: true }, bonobo: { body: "ink", face: ["brown", 1], ears: true, lip: "pink" }, orang: { body: "orange", face: ["sand", 0], ears: false }, gorilla: { body: "ink", face: ["gray", 2], ears: false } };
// sitting ape, feet at gy. o: { kind, dir (-1 left, 0 front, 1 right: where the face turns), lips (pushed out), mood ("calm" | "smile" | "open" | "angry"), arms: [[lx, ly], [rx, ry]] hand offsets, t, layer, parent }
const ape = (S, x, gy, k = 1, o = {}) => {
  const A = APE[o.kind || "chimp"], layer = o.layer || "near", t = o.t, T = t ?? S.start, g = S.grp(o.parent), dir = o.dir ?? 0;
  const bc = DS.vol(A.body, layer), fc = DS.c(A.face[0], A.face[1], layer), ln = DS.line(layer), w = DS.w[k > 0.75 ? "mid" : "detail"];
  const sh = (d, fill, ww = w) => S.draw(d, T, 0, { fill, c: ln, w: ww, parent: g });
  const X = (v) => x + v * k, Y = (v) => gy + v * k;
  if (!o.float) DS.shadow(S, x, gy, 240 * k, { t, parent: g });
  [-1, 1].forEach((sd) => sh(circ(X(sd * 50), Y(-30), 56 * k, 32 * k), bc));
  sh(circ(X(0), Y(-122), 84 * k, 102 * k), bc);
  const arms = o.arms || [[-76, -46], [76, -46]], sho = [[-56, -184], [56, -184]];
  arms.forEach((hnd, i) => { const a = [X(sho[i][0]), Y(sho[i][1])], b = [X(hnd[0]), Y(hnd[1])]; sh(capsule(a, b, 21 * k), bc); sh(circ(b[0], b[1], 21 * k), fc); });
  const hx = X(dir * 22), hy = Y(-262), R = 58 * k, fx = hx + dir * 14 * k;
  if (A.ears) [-1, 1].forEach((sd) => sh(circ(hx + sd * R * 1.0, hy + 2 * k, 19 * k), fc));
  sh(circ(hx, hy, R), bc);
  sh(circ(fx, hy + 8 * k, 41 * k, 42 * k), fc, DS.w.hair);
  const brow = o.mood === "angry" ? [[-30, -30], [-8, -16], [8, -16], [30, -30]] : [[-30, -20], [-12, -27], [12, -27], [30, -20]];
  S.draw(smooth(brow.map(([a, b]) => [fx + a * k, hy + b * k])), T, 0, { c: DS.c("brown", 2, layer), w: DS.w.detail, parent: g });
  [-1, 1].forEach((sd) => { S.fill(circ(fx + sd * 15 * k + dir * 3 * k, hy - 6 * k, 6 * k), T, 0, DS.P.ink[0], 1, g); S.fill(circ(fx + sd * 15 * k + dir * 3 * k - 2 * k, hy - 8 * k, 2 * k), T, 0, DS.P.white[0], 1, g); });
  [-1, 1].forEach((sd) => S.fill(circ(fx + sd * 5 * k + dir * 4 * k, hy + 14 * k, 2.6 * k), T, 0, DS.c("brown", 2, layer), 1, g));
  if (o.lips) { const lx = fx + dir * 30 * k, ly = hy + 30 * k; sh(circ(lx, ly, 16 * k, 12 * k), A.lip ? DS.c(A.lip, 0, layer) : fc, DS.w.detail); S.fill(circ(lx + dir * 4 * k, ly, 5 * k, 4 * k), T, 0, DS.c("brown", 2, layer), 1, g); }
  else if (o.mood === "open" || o.mood === "angry") sh(circ(fx, hy + 30 * k, 15 * k, 10 * k), DS.c("brown", 2, layer), DS.w.hair);
  else S.draw(smooth([[fx - 14 * k, hy + 26 * k], [fx, hy + (o.mood === "smile" ? 36 : 31) * k], [fx + 14 * k, hy + 26 * k]]), T, 0, { c: DS.c("brown", 2, layer), w: DS.w.detail, parent: g });
  return { g, head: [hx, hy], R, lips: [fx + dir * 30 * k, hy + 30 * k] };
};
// two apes kissing and hugging (reconciliation), heads together; cx = where the lips meet
const apePair = (S, cx, gy, k, o = {}) => {
  const a = ape(S, cx - 82 * k, gy, k, { kind: o.kinds?.[0], dir: 1, lips: true, arms: [[-60, -110], [150, -170]], t: o.t, layer: o.layer, parent: o.parent });
  const b = ape(S, cx + 82 * k, gy, k, { kind: o.kinds?.[1], dir: -1, lips: true, arms: [[-150, -150], [60, -110]], t: o.t, layer: o.layer, parent: o.parent });
  return [a, b];
};

// ---------- kiss symbols, bacteria, hands ----------
const lipsD = (cx, cy, k) => smooth([[cx - 60 * k, cy], [cx - 36 * k, cy - 24 * k], [cx - 14 * k, cy - 22 * k], [cx, cy - 12 * k], [cx + 14 * k, cy - 22 * k], [cx + 36 * k, cy - 24 * k], [cx + 60 * k, cy], [cx + 34 * k, cy + 28 * k], [cx, cy + 34 * k], [cx - 34 * k, cy + 28 * k], [cx - 60 * k, cy]]) + " Z";
const lips = (S, cx, cy, k = 1, o = {}) => { const g = S.grp(o.parent); DS.shape(S, lipsD(cx, cy, k), "red", { t: o.t, w: k > 0.7 ? "mid" : "detail", parent: g }); S.draw(smooth([[cx - 54 * k, cy + 1 * k], [cx - 22 * k, cy + 6 * k], [cx, cy + 2 * k], [cx + 22 * k, cy + 6 * k], [cx + 54 * k, cy + 1 * k]]), o.t ?? S.start, 0, { c: DS.c("red", 2), w: DS.w.detail, parent: g }); return g; };
const bug = (S, cx, cy, k = 1, o = {}) => {
  const g = S.grp(o.parent), t = o.t, T = t ?? S.start;
  DS.shape(S, smooth(Array.from({ length: 13 }, (_, i) => { const a = (i / 12) * Math.PI * 2, r = (i % 2 ? 29 : 34) * k; return [cx + Math.cos(a) * r * 1.15, cy + Math.sin(a) * r]; })) + " Z", o.name || "green", { t, w: "detail", parent: g });
  [-1, 1].forEach((sd) => { S.fill(circ(cx + sd * 11 * k, cy - 6 * k, 8 * k), T, 0, DS.P.white[0], 1, g); S.fill(circ(cx + sd * 11 * k + 2 * k, cy - 5 * k, 3.8 * k), T, 0, DS.P.ink[0], 1, g); });
  S.draw(arc(cx, cy + 5 * k, 9 * k, 25, 155), T, 0, { c: DS.P.ink[0], w: DS.w.hair, parent: g });
  return g;
};
const bugs = (S, cx, cy, n, spread, k, t, dur = 1) => { for (let i = 0; i < n; i++) { const a = i * 2.39996, rr = spread * Math.sqrt((i + 0.5) / n); bug(S, cx + Math.cos(a) * rr * 1.3, cy + Math.sin(a) * rr, k * (0.8 + (i % 3) * 0.12), { t: t + (dur * i) / n }); } };
const palm = (S, cx, cy, k = 1, o = {}) => {
  const g = S.grp(o.parent), t = o.t;
  DS.shape(S, rect(cx - 30 * k, cy + 40 * k, 60 * k, 60 * k), o.sleeve || "gray", { t, w: "detail", parent: g });
  [[-27, -60, 52], [-9, -74, 64], [9, -72, 62], [27, -60, 52]].forEach(([dx, top, h]) => DS.shape(S, rrect(cx + dx * k - 9 * k, cy + top * k, 18 * k, h * k + 12 * k, DS.r.sm), o.skin || "white", { t, w: "detail", parent: g }));
  DS.shape(S, capsule([cx - 26 * k, cy + 18 * k], [cx - 60 * k, cy - 14 * k], 10 * k), o.skin || "white", { t, w: "detail", parent: g });
  DS.shape(S, rrect(cx - 38 * k, cy - 16 * k, 76 * k, 66 * k, DS.r.md), o.skin || "white", { t, w: "detail", parent: g });
  return g;
};
const fistI = (S, cx, cy, k = 1, o = {}) => {
  const g = S.grp(o.parent), t = o.t, f = o.flip ? -1 : 1;
  DS.shape(S, rect(cx - f * 110 * k - 30 * k, cy - 26 * k, 60 * k, 52 * k), o.sleeve || "gray", { t, w: "detail", parent: g });
  DS.shape(S, rrect(cx - 60 * k, cy - 40 * k, 120 * k, 80 * k, DS.r.md), o.skin || "white", { t, w: "detail", parent: g });
  [-20, 0, 20].forEach((dy) => S.draw(line([cx + f * 34 * k, cy + dy * k], [cx + f * 58 * k, cy + dy * k], 0), t ?? S.start, 0, { c: DS.c("ink"), w: DS.w.detail, parent: g }));
  S.draw(smooth([[cx - f * 40 * k, cy - 14 * k], [cx, cy - 6 * k], [cx + f * 22 * k, cy - 14 * k]]), t ?? S.start, 0, { c: DS.c("ink"), w: DS.w.detail, parent: g });
  return g;
};
const shakeI = (S, cx, cy, k = 1, o = {}) => {
  const g = S.grp(o.parent), t = o.t, T = t ?? S.start;
  DS.shape(S, rect(cx - 170 * k, cy - 26 * k, 80 * k, 56 * k), o.sleeveL || "blue", { t, w: "detail", parent: g });
  DS.shape(S, rect(cx + 90 * k, cy - 30 * k, 80 * k, 56 * k), o.sleeveR || "purple", { t, w: "detail", parent: g });
  DS.shape(S, rrect(cx - 100 * k, cy - 28 * k, 130 * k, 58 * k, DS.r.md), o.skin || "white", { t, w: "detail", parent: g });
  DS.shape(S, rrect(cx - 34 * k, cy - 34 * k, 134 * k, 66 * k, DS.r.md), o.skin || "white", { t, w: "detail", parent: g });
  [-30, -6, 18].forEach((dx) => S.draw(smooth([[cx + dx * k, cy - 32 * k], [cx + (dx - 8) * k, cy], [cx + (dx - 4) * k, cy + 30 * k]]), T, 0, { c: DS.c("ink"), w: DS.w.detail, parent: g }));
  S.draw(smooth([[cx - 70 * k, cy - 26 * k], [cx - 30 * k, cy - 40 * k], [cx + 4 * k, cy - 34 * k]]), T, 0, { c: DS.c("ink"), w: DS.w.detail, parent: g });
  return g;
};
// icon card: a white rounded tile with one icon and a word under it
const tile = (S, cx, cy, str, t, draw, o = {}) => { panel(S, cx, cy, o.tw || 300, o.th || 300, t); draw(cx, cy - 30); if (str) txt(S, str, cx, cy + (o.th || 300) / 2 - 34, { t, size: o.size || DS.type.caption }); };
const N80 = "80,000,000"; // (a variable: scene_lint reads commas in a literal as coordinates)

// ---------- the runner: THE DOORSTEP PLAN ----------
const PLAN = ["BUILT IN?", "HOW OLD?", "WHAT FOR?", "WHICH WAY?", "DO I HAVE TO?"];
const PY = (i) => 324 + i * 120;
const PEN = DS.c("blue", 2);
// close-up of Dave's clipboard. o.ans = [[row, str, t]] (t undefined = already written), o.ring = [row, t], o.no = t (red NO on the last row), o.rows = t (questions appear)
const plan = (S, o = {}) => {
  DS.drop(S, rrect(346, 76, 1240, 880, DS.r.lg));
  DS.shape(S, rrect(330, 60, 1240, 880, DS.r.lg), "wood", { dir: "h" });
  DS.drop(S, rect(378, 128, 1144, 770)); DS.shape(S, rect(370, 120, 1144, 770), "white", { flat: true, w: "detail" });
  DS.shape(S, rrect(800, 30, 300, 100, DS.r.sm), "gray", { tone: 1 }); DS.shape(S, rrect(866, 52, 168, 30, DS.r.xs), "gray", { tone: 2, w: "detail" });
  S.text("THE DOORSTEP PLAN", 942, 214, { size: DS.type.body, c: DS.c("ink") });
  S.draw(line([660, 238], [1226, 238], 0), S.start, 0, { c: DS.c("red", 1), w: DS.w.detail });
  PLAN.forEach((q, i) => {
    const y = PY(i), t = o.rows === undefined ? undefined : o.rows + i * 0.25;
    DS.shape(S, rrect(410, y - 46, 52, 52, DS.r.xs), "white", { flat: true, w: "mid", t });
    S.text(q, 492, y, { size: DS.type.small, anchor: "start", c: DS.c("ink"), t });
    S.draw(line([400, y + 30], [1480, y + 30], 0), S.start, 0, { c: DS.c("sky"), w: DS.w.hair });
  });
  (o.ans || []).forEach(([i, str, t]) => { S.text(str, 990, PY(i), { size: DS.type.title, font: "caveat", anchor: "start", c: PEN, t }); tick(S, 436, PY(i) - 22, 0.95, t); });
  if (o.ring) S.draw(rrect(392, PY(o.ring[0]) - 68, 1104, 104, DS.r.md), o.ring[1], 0, { c: DS.c("red"), w: DS.w.near });
  if (o.no) stamp(S, 1380, PY(4) - 12, "NO", o.no);
};
// the clipboard as a small prop (in a hand or on the step)
const clipb = (S, cx, cy, k = 1, o = {}) => {
  const g = S.grp(o.parent), t = o.t;
  DS.shape(S, rrect(cx - 70 * k, cy - 90 * k, 140 * k, 180 * k, DS.r.sm), "wood", { t, w: "detail", parent: g });
  DS.shape(S, rect(cx - 58 * k, cy - 74 * k, 116 * k, 152 * k), "white", { t, flat: true, w: "hair", parent: g });
  DS.shape(S, rrect(cx - 30 * k, cy - 100 * k, 60 * k, 22 * k, DS.r.xs), "gray", { t, w: "hair", parent: g });
  for (let i = 0; i < 5; i++) S.draw(line([cx - 44 * k, cy - 44 * k + i * 26 * k], [cx + 44 * k, cy - 44 * k + i * 26 * k], 0), t ?? S.start, 0, { c: DS.c("gray", 1), w: DS.w.hair, parent: g });
  return g;
};

// ---------- ancient props ----------
// clay tablet with cuneiform wedges. o.icon(cx, cy) draws an engraved picture in the middle
const tablet = (S, cx, cy, w, h, o = {}) => {
  const g = S.grp(o.parent), t = o.t, T = t ?? S.start;
  DS.drop(S, rrect(cx - w / 2 + 8, cy - h / 2 + 12, w, h, DS.r.lg), { t, parent: g });
  DS.shape(S, rrect(cx - w / 2, cy - h / 2, w, h, DS.r.lg), "earth", { t, parent: g });
  const rows = Math.max(2, Math.floor((h - 60) / 44));
  for (let r = 0; r < rows; r++) {
    const y = cy - h / 2 + 40 + r * 44; if (o.gap && y > cy - o.gap && y < cy + o.gap) continue;
    for (let c = 0; c < Math.floor((w - 60) / 46); c++) { const x = cx - w / 2 + 40 + c * 46 + ((r * 17 + c * 29) % 13); S.draw(`M${x} ${y} L${x + 18} ${y + 6} L${x} ${y + 12} Z M${x + 18} ${y + 6} H${x + 30}`, T, 0, { c: DS.c("earth", 2), w: DS.w.hair, fill: DS.c("earth", 2), parent: g }); }
  }
  if (o.icon) o.icon(cx, cy);
  return g;
};
const ziggurat = (S, cx, gy, k = 1, o = {}) => { const L = o.layer || "mid"; DS.shadow(S, cx, gy, 600 * k, { t: o.t }); [560, 420, 280].forEach((w, i) => DS.shape(S, rect(cx - (w / 2) * k, gy - (i + 1) * 110 * k, w * k, 110 * k), "sand", { t: o.t, layer: L, dir: "h" })); DS.shape(S, rect(cx - 30 * k, gy - 330 * k, 60 * k, 330 * k), "sand", { t: o.t, layer: L, tone: 2 }); DS.shape(S, rect(cx - 50 * k, gy - 380 * k, 100 * k, 50 * k), "earth", { t: o.t, layer: L }); };
const crown = (S, cx, cy, k = 1, o = {}) => DS.shape(S, poly([[cx - 40 * k, cy + 20 * k], [cx - 44 * k, cy - 24 * k], [cx - 20 * k, cy], [cx, cy - 34 * k], [cx + 20 * k, cy], [cx + 44 * k, cy - 24 * k], [cx + 40 * k, cy + 20 * k]], 0) + " Z", "gold", { t: o.t, w: "detail", parent: o.parent });
// beard below the mouth (chin to chest), never over the eyes or mouth
const beard = (S, F, t, name = "ink") => { const [x, y] = F.hd, R = F.r; return DS.shape(S, smooth([[x - 0.86 * R, y + 0.58 * R], [x - 0.6 * R, y + 1.4 * R], [x, y + 1.85 * R], [x + 0.6 * R, y + 1.4 * R], [x + 0.86 * R, y + 0.58 * R], [x, y + 0.78 * R], [x - 0.86 * R, y + 0.58 * R]]) + " Z", name, { t, w: "detail", tone: 1, parent: F.g }); };
// Gilgamesh: a labelled hero (crown, beard, tunic). Huwawa: a big, round, more silly-than-scary forest monster
const gilg = (S, x, gy, o = {}) => { const F = who(S, x, gy, o.layer || "near", Object.assign({ hair: "curly", hairC: DS.c("ink"), outfit: "tunic", outfitC: DS.c("gold", 2), mood: "determined", look: 6 }, o)); beard(S, F, o.t); crown(S, F.hd[0], F.hd[1] - F.r * 1.05, F.s, { t: o.t, parent: F.g }); return F; };
const huwawa = (S, x, gy, k = 1, o = {}) => {
  const g = S.grp(), t = o.t, T = t ?? S.start;
  DS.shadow(S, x, gy, 420 * k, { t, parent: g });
  [-1, 1].forEach((sd) => DS.shape(S, poly([[x + sd * 120 * k, gy - 470 * k], [x + sd * 190 * k, gy - 600 * k], [x + sd * 70 * k, gy - 500 * k]], 0) + " Z", "white", { t, tone: 2, w: "mid", parent: g }));
  DS.shape(S, smooth(Array.from({ length: 25 }, (_, i) => { const a = (i / 24) * Math.PI * 2, r = (i % 2 ? 196 : 216) * k; return [x + Math.cos(a) * r, gy - 250 * k + Math.sin(a) * r * 1.12]; })) + " Z", "grass", { t, tone: 2, parent: g });
  DS.shape(S, circ(x, gy - 230 * k, 120 * k, 110 * k), "grass", { t, tone: 1, w: "mid", parent: g });
  [-1, 1].forEach((sd) => { S.draw(circ(x + sd * 52 * k, gy - 300 * k, 30 * k), T, 0, { fill: DS.P.white[0], c: DS.c("ink"), w: DS.w.mid, parent: g }); S.fill(circ(x + sd * 52 * k - 8 * k, gy - 296 * k, 12 * k), T, 0, DS.P.ink[0], 1, g); S.draw(line([x + sd * 20 * k, gy - 340 * k], [x + sd * 84 * k, gy - 356 * k], 0), T, 0, { c: DS.c("ink"), w: DS.w.mid, parent: g }); });
  S.draw(smooth([[x - 50 * k, gy - 200 * k], [x, gy - 220 * k], [x + 50 * k, gy - 200 * k]]), T, 0, { c: DS.c("ink"), w: DS.w.mid, parent: g });
  [-1, 1].forEach((sd) => DS.shape(S, rrect(x + sd * 230 * k - 30 * k, gy - 90 * k, 60 * k, 90 * k, DS.r.md), "grass", { t, tone: 2, w: "mid", parent: g }));
  return { g, cheek: [x - 100 * k, gy - 250 * k] };
};
const palmTree = (S, x, gy, k = 1, o = {}) => { DS.shadow(S, x, gy, 160 * k, { t: o.t }); DS.shape(S, smooth([[x - 18 * k, gy], [x - 10 * k, gy - 200 * k], [x + 20 * k, gy - 380 * k], [x + 40 * k, gy - 380 * k], [x + 14 * k, gy - 200 * k], [x + 18 * k, gy]]) + " Z", "wood", { t: o.t, layer: o.layer || "mid" }); [-150, -70, 20, 110, 170].forEach((a) => { const r = (a * Math.PI) / 180, ex = x + 30 * k + Math.cos(r) * 200 * k, ey = gy - 380 * k + Math.sin(r) * 120 * k + 50 * k; DS.shape(S, smooth([[x + 30 * k, gy - 380 * k], [(x + 30 * k + ex) / 2, Math.min(gy - 380 * k, ey) - 40 * k], [ex, ey], [(x + 30 * k + ex) / 2, (gy - 380 * k + ey) / 2 + 10 * k], [x + 30 * k, gy - 380 * k]]) + " Z", "grass", { t: o.t, layer: o.layer || "mid", tone: 2 }); }); };
const fire = (S, cx, gy, k = 1, o = {}) => { DS.shadow(S, cx, gy, 240 * k, { t: o.t }); [-50, 50, 0].forEach((dx) => DS.shape(S, capsule([cx + dx * k, gy - 6 * k], [cx - dx * 0.6 * k, gy - 30 * k], 14 * k), "wood", { t: o.t, w: "detail" })); DS.shape(S, smooth([[cx - 60 * k, gy - 20 * k], [cx - 40 * k, gy - 100 * k], [cx - 10 * k, gy - 70 * k], [cx, gy - 160 * k], [cx + 22 * k, gy - 80 * k], [cx + 46 * k, gy - 110 * k], [cx + 60 * k, gy - 20 * k]]) + " Z", "orange", { t: o.t, w: "detail" }); DS.shape(S, smooth([[cx - 30 * k, gy - 22 * k], [cx - 12 * k, gy - 70 * k], [cx + 4 * k, gy - 50 * k], [cx + 30 * k, gy - 22 * k]]) + " Z", "yellow", { t: o.t, w: "hair" }); };
const book = (S, cx, cy, w, h, strs, o = {}) => { const t = o.t, g = S.grp(); DS.drop(S, rrect(cx - w / 2 + 10, cy - h / 2 + 14, w, h, DS.r.sm), { t, parent: g }); DS.shape(S, rrect(cx - w / 2, cy - h / 2, w, h, DS.r.sm), o.name || "green", { t, tone: 2, parent: g }); DS.shape(S, rect(cx - w / 2 + 16, cy - h / 2, 14, h), o.name || "green", { t, tone: 1, flat: true, w: "hair", parent: g }); strs.forEach((s, i) => S.text(s, cx + 8, cy - h / 2 + 90 + i * 50, { size: DS.type.caption, t, c: DS.c("gold", 1), parent: g })); return g; };
// open book / journal spread: two pages, o.left / o.right draw on them
const spread = (S, cx, cy, w, h, o = {}) => { const t = o.t; DS.drop(S, rrect(cx - w / 2 + 10, cy - h / 2 + 14, w, h, DS.r.sm), { t }); DS.shape(S, rrect(cx - w / 2 - 14, cy - h / 2 - 10, w + 28, h + 20, DS.r.sm), o.name || "green", { t, tone: 2 }); [-1, 1].forEach((sd) => DS.shape(S, rect(sd < 0 ? cx - w / 2 : cx, cy - h / 2, w / 2, h), "paper", { t, w: "detail", tone: 1 })); S.draw(line([cx, cy - h / 2], [cx, cy + h / 2], 0), t ?? S.start, 0, { c: DS.c("ink"), w: DS.w.detail }); };

// ---------- episode props ----------
const ROOMX = { den: { wall: "wall", floor: "wood", window: false }, nursery: { wall: "dusk", floor: "wood", window: false }, palace: { wall: "sand", floor: "earth", window: false }, museum: { wall: "paper", floor: "gray", window: false } };
const jarB = (S, cx, base, k = 1, o = {}) => { const g = S.grp(o.parent), t = o.t; DS.shadow(S, cx, base, 150 * k, { t, parent: g }); DS.shape(S, rrect(cx - 60 * k, base - 150 * k, 120 * k, 150 * k, DS.r.md), "glass", { t, parent: g, tone: 1, flat: true, w: "mid" }); DS.shape(S, rrect(cx - 50 * k, base - 96 * k, 100 * k, 86 * k, DS.r.sm), "orange", { t, parent: g, flat: true, tone: 1, w: "hair" }); DS.shape(S, rrect(cx - 66 * k, base - 176 * k, 132 * k, 34 * k, DS.r.sm), "gray", { t, parent: g, w: "mid" }); DS.shape(S, rect(cx - 60 * k, base - 132 * k, 120 * k, 38 * k), "white", { t, parent: g, flat: true, w: "hair" }); return g; };
const sandwich = (S, cx, cy, k = 1, o = {}) => { const g = S.grp(o.parent), t = o.t; DS.shape(S, rrect(cx - 130 * k, cy + 20 * k, 260 * k, 46 * k, DS.r.md), "sand", { t, parent: g }); DS.shape(S, smooth([[cx - 140 * k, cy + 18 * k], [cx - 90 * k, cy + 2 * k], [cx - 40 * k, cy + 22 * k], [cx + 10 * k, cy + 4 * k], [cx + 60 * k, cy + 22 * k], [cx + 140 * k, cy + 10 * k], [cx + 130 * k, cy + 30 * k], [cx - 130 * k, cy + 30 * k]]) + " Z", "grass", { t, parent: g, w: "detail" }); DS.shape(S, rrect(cx - 120 * k, cy - 2 * k, 240 * k, 18 * k, DS.r.xs), "red", { t, parent: g, w: "detail" }); DS.shape(S, smooth([[cx - 130 * k, cy], [cx - 120 * k, cy - 50 * k], [cx, cy - 66 * k], [cx + 120 * k, cy - 50 * k], [cx + 130 * k, cy]]) + " Z", "sand", { t, parent: g }); return g; };
const magnifier = (S, cx, cy, r, o = {}) => { const g = S.grp(o.parent), t = o.t; DS.shape(S, capsule([cx + r * 0.72, cy + r * 0.72], [cx + r * 1.6, cy + r * 1.6], r * 0.16), "wood", { t, parent: g, w: "detail" }); S.draw(circ(cx, cy, r), t ?? S.start, 0, { fill: DS.c("glass", 1), c: DS.c("gray", 2), w: DS.w.near, parent: g, op: 0.9 }); return g; };
const scroll = (S, cx, cy, w, h, o = {}) => { const g = S.grp(o.parent), t = o.t; for (let i = 0; i < 4; i++) { const y = cy - h / 2 + i * (h / 4); DS.shape(S, rrect(cx - w / 2, y + 6, w, h / 4 - 12, DS.r.sm), "sand", { t, parent: g, w: "detail" }); S.draw(line([cx - w / 2 + 30, y + h / 8], [cx + w / 2 - 30, y + h / 8], 0), t ?? S.start, 0, { c: DS.c("earth", 2), w: DS.w.hair, parent: g }); DS.shape(S, circ(cx, y + h / 8, 8), "earth", { t, parent: g, w: "hair", tone: 2 }); } return g; };
// museum case on a pedestal
const showcase = (S, cx, gy, w, h) => { DS.shadow(S, cx, gy, w + 40); DS.shape(S, rect(cx - w / 2 + 30, gy - 330, w - 60, 330), "white", { dir: "h" }); DS.shape(S, rrect(cx - w / 2, gy - 350, w, 30, DS.r.xs), "white", { tone: 2 }); S.fill(rect(cx - w / 2, gy - 350 - h, w, h), S.start, 0, DS.c("glass", 1), 0.35); S.draw(rect(cx - w / 2, gy - 350 - h, w, h), S.start, 0, { c: DS.c("gray", 1), w: DS.w.mid }); return gy - 350; };
const tophat = (S, F, t, name = "ink") => { const [x, y] = F.hd, R = F.r; DS.shape(S, rrect(x - R * 1.15, y - R * 1.02, R * 2.3, R * 0.22, DS.r.xs), name, { t, w: "detail", tone: 1, parent: F.g }); DS.shape(S, rrect(x - R * 0.7, y - R * 1.9, R * 1.4, R * 0.95, DS.r.xs), name, { t, w: "detail", tone: 1, parent: F.g }); };
const tallhat = (S, F, t, name = "white") => { const [x, y] = F.hd, R = F.r; DS.shape(S, poly([[x - R * 0.8, y - R * 0.86], [x - R * 0.5, y - R * 2.1], [x + R * 0.5, y - R * 2.1], [x + R * 0.8, y - R * 0.86]], 0) + " Z", name, { t, w: "detail", tone: 2, parent: F.g }); };
const bench = (S, x0, x1, gy, o = {}) => { DS.shadow(S, (x0 + x1) / 2, gy, x1 - x0 + 40, { t: o.t }); [x0 + 30, x1 - 50].forEach((lx) => DS.shape(S, rect(lx, gy - 120, 20, 120), "wood", { w: "mid", tone: 2, t: o.t, layer: o.layer })); DS.shape(S, rrect(x0, gy - 140, x1 - x0, 28, DS.r.xs), "wood", { t: o.t, layer: o.layer }); DS.shape(S, rrect(x0 + 10, gy - 260, x1 - x0 - 20, 24, DS.r.xs), "wood", { t: o.t, layer: o.layer }); [x0 + 40, x1 - 60].forEach((lx) => DS.shape(S, rect(lx, gy - 240, 16, 100), "wood", { w: "detail", tone: 2, t: o.t, layer: o.layer })); return gy - 112; };
const tree = (S, x, gy, k = 1, o = {}) => { const L = o.layer || "mid"; DS.shadow(S, x, gy, 200 * k, { t: o.t }); DS.shape(S, rect(x - 18 * k, gy - 220 * k, 36 * k, 220 * k), "wood", { layer: L, t: o.t }); DS.shape(S, smooth([[x - 140 * k, gy - 230 * k], [x - 160 * k, gy - 340 * k], [x - 70 * k, gy - 440 * k], [x + 40 * k, gy - 450 * k], [x + 150 * k, gy - 370 * k], [x + 150 * k, gy - 250 * k], [x, gy - 200 * k], [x - 140 * k, gy - 230 * k]]) + " Z", o.name || "grass", { layer: L, t: o.t, tone: o.tone ?? 0 }); };
const cedar = (S, x, gy, k = 1, o = {}) => { const L = o.layer || "mid"; DS.shape(S, rect(x - 14 * k, gy - 90 * k, 28 * k, 90 * k), "wood", { layer: L, tone: 2 }); [[0, 300], [70, 240], [140, 170]].forEach(([dy, w]) => DS.shape(S, poly([[x - (w / 2) * k, gy - 80 * k - dy * k], [x, gy - 230 * k - dy * k], [x + (w / 2) * k, gy - 80 * k - dy * k]], 0) + " Z", "green", { layer: L, tone: 2 })); };
const mudHouse = (S, x, gy, w, h, o = {}) => { const L = o.layer || "mid"; DS.shape(S, rect(x, gy - h, w, h), "sand", { layer: L, dir: "h", t: o.t }); DS.shape(S, rrect(x + w / 2 - 34, gy - 120, 68, 120, DS.r.xs), "earth", { layer: L, tone: 2, t: o.t }); DS.shape(S, rect(x + 30, gy - h + 40, 50, 40), "earth", { layer: L, tone: 2, t: o.t, w: "detail" }); };
const throne = (S, cx, gy) => { DS.shadow(S, cx, gy, 300); DS.shape(S, rrect(cx - 110, gy - 520, 220, 400, DS.r.md), "gold", { tone: 2 }); DS.shape(S, rrect(cx - 130, gy - 190, 260, 60, DS.r.sm), "gold"); [cx - 120, cx + 90].forEach((x) => DS.shape(S, rect(x, gy - 130, 30, 130), "gold", { tone: 2, w: "mid" })); return gy - 190; };
const kneel = (S, x, ground, side, i, o = {}) => person(S, x, ground - 62 * 1.1 * DS.depth[o.layer || "near"].s, o.layer || "near", i, Object.assign({ sit: true, gs: ground, legL: [[34 * side, 62], [-26 * side, 72]], legR: [[56 * side, 8], [62 * side, 72]], pose: side > 0 ? "reach" : "reachL", look: 6 * side, mood: "flat" }, o));
const cctv = (S, x, y, o = {}) => { const g = S.grp(), t = o.t; DS.shape(S, rect(x - 8, y, 16, 260), "gray", { t, tone: 2, w: "detail", parent: g }); const h = S.grp(g); DS.shape(S, rrect(x - 130, y - 50, 160, 70, DS.r.sm), "white", { t, parent: h, dir: "v" }); DS.shape(S, rrect(x - 160, y - 42, 40, 54, DS.r.xs), "gray", { t, parent: h, tone: 2, w: "detail" }); DS.shape(S, circ(x - 150, y - 15, 12), "ink", { t, parent: h, w: "hair" }); S.fill(circ(x + 10, y - 30, 7), t ?? S.start, 0, DS.c("red"), 1, h); h.setAttribute("transform", `rotate(-18 ${x} ${y})`); return g; };
const petri = (S, cx, cy, k = 1, o = {}) => { DS.shape(S, circ(cx, cy, 140 * k, 50 * k), "glass", { t: o.t, w: "mid", tone: 1 }); DS.shape(S, circ(cx, cy, 120 * k, 40 * k), "green", { t: o.t, w: "detail", tone: 1, flat: true }); };
const bottle = (S, cx, base, k = 1, o = {}) => { const t = o.t; DS.shadow(S, cx, base, 150 * k, { t }); DS.shape(S, smooth([[cx - 60 * k, base], [cx - 64 * k, base - 160 * k], [cx - 40 * k, base - 220 * k], [cx - 30 * k, base - 260 * k], [cx + 30 * k, base - 260 * k], [cx + 40 * k, base - 220 * k], [cx + 64 * k, base - 160 * k], [cx + 60 * k, base]]) + " Z", "pink", { t, tone: 1, dir: "h" }); DS.shape(S, rrect(cx - 36 * k, base - 290 * k, 72 * k, 36 * k, DS.r.xs), "white", { t, tone: 2, w: "mid" }); DS.shape(S, rect(cx - 62 * k, base - 150 * k, 124 * k, 70 * k), "white", { t, flat: true, w: "detail" }); };
const calc = (S, cx, cy, k = 1, o = {}) => { const g = S.grp(o.parent), t = o.t; DS.shape(S, rrect(cx - 60 * k, cy - 90 * k, 120 * k, 180 * k, DS.r.sm), "gray", { t, tone: 2, parent: g, w: "detail" }); DS.shape(S, rect(cx - 44 * k, cy - 72 * k, 88 * k, 40 * k), "green", { t, tone: 1, flat: true, parent: g, w: "hair" }); for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) DS.shape(S, rrect(cx - 44 * k + j * 32 * k, cy - 18 * k + i * 32 * k, 24 * k, 24 * k, DS.r.xs), "white", { t, parent: g, w: "hair" }); return g; };
const tally = (S, x, y, n, t, o = {}) => { for (let i = 0; i < n; i++) { const grp = Math.floor(i / 5), j = i % 5, gx = x + grp * 150; S.draw(j < 4 ? line([gx + j * 26, y], [gx + j * 26, y + 90], 0) : line([gx - 14, y + 70], [gx + 92, y + 16], 0), t + i * (o.step ?? 0.1), 0, { c: DS.c(o.name || "ink"), w: DS.w.near }); } };
const mirror = (S, cx, cy, w, h) => { DS.drop(S, rrect(cx - w / 2 + 8, cy - h / 2 + 12, w, h, DS.r.lg)); DS.shape(S, rrect(cx - w / 2, cy - h / 2, w, h, DS.r.lg), "gold", { tone: 2 }); DS.shape(S, rrect(cx - w / 2 + 24, cy - h / 2 + 24, w - 48, h - 48, DS.r.md), "glass", { dir: "v", w: "detail" }); return clipTo(S.grp(), rrect(cx - w / 2 + 24, cy - h / 2 + 24, w - 48, h - 48, DS.r.md)); };
const crib = (S, x0, x1, gy) => { DS.shadow(S, (x0 + x1) / 2, gy, x1 - x0 + 40); DS.shape(S, rect(x0, gy - 380, 24, 380), "white", { tone: 2 }); DS.shape(S, rect(x1 - 24, gy - 380, 24, 380), "white", { tone: 2 }); DS.shape(S, rect(x0 + 24, gy - 200, x1 - x0 - 48, 30), "white", { tone: 2, w: "mid" }); return gy - 200; };
const cribBars = (S, x0, x1, gy) => { DS.shape(S, rect(x0, gy - 330, x1 - x0, 22), "white", { tone: 2, w: "mid" }); for (let x = x0 + 70; x < x1 - 40; x += 70) DS.shape(S, rect(x - 7, gy - 310, 14, 140), "white", { tone: 2, w: "detail" }); };
// names stacked on one card (several real people at once); ts = per-name times
const names = (S, cx, cy, strs, ts, o = {}) => { const size = o.size || DS.type.small, lh = size * 1.3, w = Math.max(...strs.map((s) => s.length)) * size * 0.62 + 80, h = strs.length * lh + 50, y0 = cy - h / 2; DS.drop(S, rrect(cx - w / 2 + 8, y0 + 12, w, h, DS.r.md), { t: ts[0] }); DS.shape(S, rrect(cx - w / 2, y0, w, h, DS.r.md), "white", { flat: true, w: "detail", t: ts[0] }); strs.forEach((s, i) => S.text(s, cx, y0 + 25 + lh * (i + 0.72), { size, t: ts[i], c: DS.c("ink") })); };
const sweat = (S, x, y, t, k = 1) => DS.shape(S, smooth([[x, y - 22 * k], [x - 12 * k, y + 2 * k], [x - 8 * k, y + 12 * k], [x, y + 15 * k], [x + 8 * k, y + 12 * k], [x + 12 * k, y + 2 * k], [x, y - 22 * k]]) + " Z", "sky", { t, w: "detail" });
const pie = (S, cx, cy, r, f, name, o = {}) => { DS.shape(S, circ(cx, cy, r), "gray", { t: o.t, tone: 1, flat: true, w: "mid" }); const a0 = -Math.PI / 2, a1 = a0 + f * Math.PI * 2; DS.shape(S, `M${cx} ${cy} L${cx + Math.cos(a0) * r} ${cy + Math.sin(a0) * r} A${r} ${r} 0 ${f > 0.5 ? 1 : 0} 1 ${cx + Math.cos(a1) * r} ${cy + Math.sin(a1) * r} Z`, name, { t: o.ft ?? o.t, w: "mid" }); };
// engraved picture on a tablet: two heads (+ a small one) and a heart, cut in darker clay
const glyph = (S, cx, cy, kind, t) => { const c = DS.c("earth", 2), d = (p) => S.draw(p, t ?? S.start, 0, { c, w: DS.w.mid }); if (kind === "kids") { d(circ(cx - 40, cy, 34)); d(circ(cx + 40, cy + 18, 22)); } else { d(circ(cx - 42, cy, 32)); d(circ(cx + 42, cy, 32)); } if (kind === "friends") d(line([cx - 30, cy + 60], [cx + 30, cy + 60], 0)); else S.draw(heartPath(cx, cy - 64, 0.7), t ?? S.start, 0, { c, w: DS.w.mid }); };
const iconPlane = (S, cx, cy, t) => DS.shape(S, `M${cx - 110} ${cy} L${cx + 90} ${cy - 10} Q${cx + 120} ${cy} ${cx + 90} ${cy + 10} Z M${cx - 10} ${cy - 4} L${cx - 60} ${cy - 80} L${cx - 30} ${cy - 80} L${cx + 30} ${cy - 4} Z M${cx - 10} ${cy + 4} L${cx - 60} ${cy + 80} L${cx - 30} ${cy + 80} L${cx + 30} ${cy + 4} Z M${cx - 100} ${cy - 2} L${cx - 120} ${cy - 40} L${cx - 96} ${cy - 40} L${cx - 76} ${cy - 2} Z`, "white", { t, w: "detail", tone: 2 });
const iconTrain = (S, cx, cy, t) => { DS.shape(S, rrect(cx - 110, cy - 70, 220, 130, DS.r.md), "red", { t, w: "detail" }); [-60, 0, 60].forEach((dx) => DS.shape(S, rrect(cx + dx - 22, cy - 50, 44, 40, DS.r.xs), "glass", { t, w: "hair" })); [-60, 60].forEach((dx) => DS.shape(S, circ(cx + dx, cy + 66, 20), "ink", { t, w: "hair", tone: 1 })); };
const iconBeach = (S, cx, cy, t) => { DS.shape(S, rrect(cx - 130, cy + 50, 260, 40, DS.r.sm), "sand", { t, w: "detail" }); S.draw(line([cx, cy - 60], [cx + 20, cy + 60], 0), t ?? S.start, 0, { c: DS.c("ink"), w: DS.w.mid }); DS.shape(S, `M${cx - 120} ${cy - 40} Q${cx - 10} ${cy - 160} ${cx + 110} ${cy - 70} Z`, "orange", { t, w: "detail" }); };
const iconTree = (S, cx, cy, t) => { DS.shape(S, rect(cx - 14, cy, 28, 90), "wood", { t, w: "detail" }); DS.shape(S, circ(cx, cy - 40, 90, 74), "grass", { t, w: "detail" }); };
const note = (S, cx, cy, k, t) => { DS.shape(S, circ(cx - 30 * k, cy + 50 * k, 26 * k, 20 * k), "ink", { t, w: "hair", tone: 1 }); DS.shape(S, circ(cx + 40 * k, cy + 34 * k, 26 * k, 20 * k), "ink", { t, w: "hair", tone: 1 }); DS.shape(S, poly([[cx - 8 * k, cy + 50 * k], [cx - 8 * k, cy - 60 * k], [cx + 62 * k, cy - 76 * k], [cx + 62 * k, cy + 34 * k], [cx + 54 * k, cy + 34 * k], [cx + 54 * k, cy - 50 * k], [cx, cy - 38 * k], [cx, cy + 50 * k]], 0) + " Z", "ink", { t, w: "hair", tone: 1 }); };
const burstTxt = (S, cx, cy, r, str, t) => { const g = S.grp(); DS.shape(S, poly(Array.from({ length: 20 }, (_, i) => { const a = (i / 20) * Math.PI * 2, rr = i % 2 ? r * 0.7 : r; return [cx + Math.cos(a) * rr, cy + Math.sin(a) * rr * 0.8]; }), 0) + " Z", "yellow", { t, w: "mid", parent: g }); S.text(str, cx, cy + 22, { size: DS.type.body, t, c: DS.c("red", 2), parent: g }); return g; };
const noise = (S, cx, cy, r, t, out) => { const p = S.draw(rays(cx, cy, r, r * 1.35, 14), t, 0, { c: DS.c("ink"), w: DS.w.mid }); if (out) S.fadeOut(p, out, 0.5); return p; };
const elderly = (S, x, gy, o = {}) => { const i = o.i ?? 3; return person(S, x, gy, o.layer || "near", i, Object.assign({ hairC: DS.c("gray", 1, o.layer || "near"), outfit: "tunic", outfitC: DS.c(["earth", "sand", "wood", "brown"][i % 4], 0, o.layer || "near") }, o)); };
// two small people greeting: "shake" (hands joined), "five" (palms up high), "bump" (fists). o: { t, i, skin (glove), coat }
const greet = (S, cx, gy, s, kind = "shake", o = {}) => {
  const arm = { shake: [[62, 10], [134, 8]], five: [[50, -30], [96, -96]], bump: [[56, 12], [116, 10]] }[kind], reach = (24 + arm[1][0]) * s, i = o.i ?? 0, coat = o.coat ? { outfitC: DS.c("white") } : {};
  const A = person(S, cx - reach - 6 * s, gy, "near", i, Object.assign({ s, armR: arm, look: 6, mood: "smile", t: o.t }, coat));
  const B = person(S, cx + reach + 6 * s, gy, "near", i + 3, Object.assign({ s, armL: arm.map(([x, y]) => [-x, y]), look: -6, mood: "smile", t: o.t }, coat));
  mitt(S, A, "R", { fist: kind === "bump", t: o.t, skin: o.skin }); mitt(S, B, "L", { fist: kind === "bump", t: o.t, skin: o.skin });
  return [A, B];
};
// kneeling person (sits on the heels), any scale
const kneelS = (S, x, ground, side, i, s, o = {}) => person(S, x, ground - 62 * s, "near", i, Object.assign({ s, sit: true, gs: ground, legL: [[34 * side, 62], [-26 * side, 72]], legR: [[56 * side, 8], [62 * side, 72]], look: 6 * side, mood: "smile" }, o));
