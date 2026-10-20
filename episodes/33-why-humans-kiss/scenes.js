// look: still
// Why Do Humans Kiss? (~8:52). Mission wrapped round a mystery: Dave has a first date on Friday and wants to know if the kiss is built into humans (so he "has to") or something somebody made up.
// Runner diagram: Dave's clipboard THE DOORSTEP PLAN, one row filled per chapter (BUILT IN? / HOW OLD? / WHAT FOR? / WHICH WAY? / DO I HAVE TO?), put down on the doorstep at the end.
// Runner greeting: the handshake (practised on the door, then twice a day) -> fist bump (Wales study) -> right turn + fist bump in the mirror ("the Gilgamesh move") -> handshake, then a cheek kiss anyway.
// Family-friendly: kisses are cartoon cheek kisses, hearts, a doorstep, or apes at a distance. Real people are name cards or labelled generic figures, never likenesses.
// On-screen spellings: Arbøll, Güntürkün, Irenäus Eibl-Eibesfeldt, Māori (script.md spells them for the voice).

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

const CUES = [[1, 0], [3, 0], [5, 0], [6, 0], [8, 0], [10, 0], [11, 4], [13, 0], [14, 0], [15, 0], [17, 0], [18, 0], [19, 0], [20, 0], [22, 0], [23, 0], [25, 0], [26, 0], [27, 0], [29, 0],
  [31, 0], [33, 0], [35, 0], [37, 0], [38, 0], [39, 0], [40, 0], [41, 0], [43, 0], [44, 0], [45, 0], [46, 0], [47, 0], [48, 0], [49, 0], [50, 0], [51, 0], [52, 0], [53, 0], [54, 0],
  [55, 0], [56, 0], [58, 0], [59, 0], [60, 0], [62, 0], [64, 0], [65, 0], [66, 0], [68, 0], [69, 0], [71, 0], [72, 0], [73, 0], [75, 0], [76, 0], [77, 0], [78, 0], [80, 0], [82, 0],
  [84, 0], [86, 0], [87, 0], [88, 0], [89, 0], [90, 0], [92, 0], [94, 0], [96, 0], [98, 0], [100, 0], [101, 0], [102, 0], [103, 0], [104, 0], [105, 0], [106, 0], [108, 0], [109, 0], [112, 0],
  [114, 0], [115, 0], [116, 0], [117, 0], [118, 0], [120, 0], [121, 0], [122, 0], [123, 0], [125, 0], [126, 0], [127, 0], [128, 0], [130, 0], [132, 0], [134, 0]];
const WINS = sceneWindows(CUES, -0.25); // each picture lands just after its first word; the 0.6 s crossfade covers the breath
const sc = (c, w, o) => { const k = CUES.findIndex(([a, b]) => a === c && b === w); if (k < 0) throw new Error("no cue " + c + ":" + w); return scene(WINS[k][0], WINS[k][1], o); };

// ===================== 1. The doorstep plan =====================
// This is Dave. On Friday, Dave has a first date, / and he has already planned the ending.
{ const S = sc(1, 0, { cam: "push", focus: "900 600" }); DS.room(S, ROOMX.den);
  calendar(S, 420, 200, 260, 250, { title: "FRIDAY" });
  heart(S, 589, 330, 0.75, { t: W(1, 4), name: "pink" });
  const F = dave(S, 960, GN, "near", { pose: "hold", mood: "smile", look: 0 });
  DS.card(S, "DAVE", 960, 470, { size: DS.type.body, t: W(1, 2) });
  DS.card(S, "FIRST DATE", 550, 530, { size: DS.type.small, t: W(1, 8) });
  const [hx, hy] = F.hand("R"); clipb(S, hx - 8, hy - 50, 0.8, { t: W(2, 4) });
  F.face(W(2, 4), "determined", 6);
  S.thought(1430, 330, 230, 170, 1100, 560, W(2, 5), 0.3);
  DS.shape(S, rect(1370, 230, 120, 200), "wood", { t: W(2, 5), w: "mid" }); DS.shape(S, circ(1468, 336, 9), "gold", { t: W(2, 5), w: "hair" });
  DS.vignette(S); }

// At the front door, he will offer his date / a firm, friendly, completely safe handshake.
{ const S = sc(3, 0, { cam: "push", focus: "900 640" }); doorstep(S);
  const F = dave(S, 800, GN, "near", { pose: "reach", mood: "determined", look: 6 });
  mitt(S, F, "R", { t: W(3, 6) });
  DS.card(S, "FIRM", 380, 130, { size: DS.type.body, t: W(4, 1) });
  DS.card(S, "FRIENDLY", 770, 130, { size: DS.type.body, t: W(4, 2) });
  DS.card(S, "COMPLETELY SAFE", 1320, 130, { size: DS.type.body, t: W(4, 3), tc: "green" });
  DS.vignette(S); }

// Because on Tuesday, Dave read one number, and he hasn't recovered. Eighty million.
{ const S = sc(5, 0, { cam: "zoom", focus: "1210 520" }); DS.room(S, ROOM.night); nightWin(S, 400, 170, 200, 200);
  const top = desk(S, 860, GN, 700);
  const L = laptop(S, 1210, top, 540, 300, { screen: "navy" });
  [0, 1, 2].forEach((i) => S.draw(line([L.x0 + 30, L.y0 + 36 + i * 30], [L.x1 - 30 - i * 60, L.y0 + 36 + i * 30], 0), S.start, 0, { c: DS.c("gray", 1), w: DS.w.detail }));
  S.text(N80, L.cx, L.y1 - 40, { size: DS.type.body, t: W(5, 11), c: DS.c("yellow") });
  const F = dave(S, 600, GN, "near", { mood: "flat", look: 7 });
  F.face(W(5, 9), "worried", 7); F.face(W(5, 11), "wow", 7);
  sweat(S, 676, 560, W(5, 11));
  DS.card(S, "TUESDAY", 600, 450, { size: DS.type.body, t: W(5, 2) });
  DS.vignette(S, 0.18); }

// When you think about it, pressing your face against somebody else's face is a strange thing to do. / Yet people everywhere seem to do it.
{ const S = sc(6, 0, { cam: "pull", focus: "960 600" }); DS.outdoor(S, OUT.day);
  const A = person(S, 760, GN, "near", 0, { mood: "flat", look: 6 }), B = person(S, 1010, GN, "near", 3, { mood: "flat", look: -6 });
  lean(A, W(6, 5), 12); lean(B, W(6, 5), -12);
  S.text("?", 885, 400, { size: DS.type.display, t: W(6, 14), c: DS.c("ink") });
  DS.card(S, "A STRANGE THING TO DO", 885, 150, { size: DS.type.body, t: W(6, 14) });
  [[1230, 1400, 770, 1], [1570, 1740, 770, 5], [190, 302, 700, 2]].forEach(([x1, x2, gy, i], j) => {
    const L = gy > 740 ? "mid" : "far", t = W(7, 1) + j * 0.22;
    const a = person(S, x1, gy, L, i, { t, look: 6 }), b = person(S, x2, gy, L, i + 3, { t, look: -6 });
    lean(a, t, 8, 0.01); lean(b, t, -8, 0.01); heart(S, (x1 + x2) / 2, gy - (L === "mid" ? 370 : 250), L === "mid" ? 0.45 : 0.32, { t: t + 0.3 });
  });
  DS.card(S, "EVERYWHERE", 1500, 300, { size: DS.type.body, t: W(7, 2), tc: "red" });
  DS.vignette(S); }

// So, why do humans kiss? Is it built into us, / or did somebody, somewhere, just make it up?
{ const S = sc(8, 0, { cam: "push", focus: "960 500" }); DS.outdoor(S, Object.assign({ path: [700, 1300] }, OUT.day));
  DS.shadow(S, 1000, 900, 80); DS.shape(S, rect(986, 300, 28, 600), "wood", { dir: "h" });
  const sign = (x0, x1, y, dir, str, t) => { const P = dir < 0 ? [[x0, y - 50], [x1, y - 50], [x1, y + 50], [x0, y + 50], [x0 - 60, y]] : [[x0, y - 50], [x1, y - 50], [x1 + 60, y], [x1, y + 50], [x0, y + 50]], g = S.grp(); DS.drop(S, poly(P.map(([a, b]) => [a + 6, b + 8]), 0) + " Z", { t, parent: g }); DS.shape(S, poly(P, 0) + " Z", "wood", { t, tone: 1, parent: g }); S.text(str, (x0 + x1) / 2 + dir * 20, y + 18, { size: DS.type.small, t, c: DS.c("ink"), parent: g }); };
  sign(640, 1000, 390, -1, "BUILT IN?", W(8, 7));
  sign(1000, 1380, 530, 1, "MADE UP?", W(9, 5));
  const F = dave(S, 620, GN, "near", { mood: "worried", look: 6 });
  F.face(W(9, 5), "worried", 8);
  DS.card(S, "WHY DO HUMANS KISS?", 960, 140, { size: DS.type.title, t: W(8, 1) });
  DS.vignette(S); }

// Because if it's built in, Dave is going to have to do it. / The answer goes through
{ const S = sc(10, 0, { cam: "zoom", focus: "940 780" }); DS.room(S, ROOMX.den);
  plan(S, { rows: S.start + 0.2, ring: [4, W(10, 9)] }); DS.vignette(S); }

// chimpanzees, baby food and clay tablets, / and one fact that should make Dave feel much better.
{ const S = sc(11, 4, { cam: "push", focus: "960 520" }); DS.room(S, ROOM.board);
  tile(S, 380, 420, "CHIMPANZEES", W(11, 4), (x, y) => ape(S, x, y + 100, 0.55, { t: W(11, 4), mood: "smile", float: true }), { tw: 340, th: 400 });
  tile(S, 780, 420, "BABY FOOD", W(11, 5), (x, y) => jarB(S, x, y + 90, 1.0, { t: W(11, 5) }), { tw: 340, th: 400 });
  tile(S, 1180, 420, "CLAY TABLETS", W(11, 8), (x, y) => tablet(S, x, y - 10, 200, 230, { t: W(11, 8) }), { tw: 340, th: 400 });
  const F = dave(S, 1600, GN, "near", { mood: "worried", look: -6 });
  F.face(W(12, 7), "smile", -4);
  DS.card(S, "ONE FACT", 1600, 470, { size: DS.type.small, t: W(12, 2), tc: "green" });
  DS.vignette(S); }

// Let's start with the apes, and a fight at a zoo.
{ const S = sc(13, 0, { cam: "push", focus: "960 560" }); zooGate(S, 960, "ZOO", () => ape(S, 960, 880, 0.75, { layer: "mid", t: W(13, 4), mood: "calm" }));
  DS.card(S, "THE APES", 960, 120, { size: DS.type.body, t: W(13, 4) });
  DS.card(S, "A FIGHT?", 1620, 520, { size: DS.type.body, t: W(13, 7), tc: "red" });
  DS.vignette(S); }

// ===================== 2. The apes did it first =====================
// November, nineteen seventy-five, Burgers Zoo in Arnhem, in the Netherlands.
{ const S = sc(14, 0, { cam: "zoom", focus: "960 600" }); zooGate(S, 960, "BURGERS ZOO", () => { ape(S, 800, 880, 0.6, { layer: "mid", mood: "calm" }); ape(S, 1130, 860, 0.5, { layer: "mid", mood: "calm", dir: -1 }); });
  DS.card(S, "NOVEMBER 1975", 960, 120, { size: DS.type.body, t: W(14, 0) });
  DS.card(S, "ARNHEM, THE NETHERLANDS", 960, 500, { size: DS.type.small, t: W(14, 6) });
  DS.vignette(S); }

// The top chimpanzee in the colony attacks a female. / The whole hall erupts, then goes strangely quiet.
{ const S = sc(15, 0, { cam: "push", focus: "960 600" }); hall(S);
  ape(S, 640, GN, 1.05, { mood: "angry", dir: 1, arms: [[-110, -300], [120, -310]] });
  crown(S, 663, 612, 0.9, { t: W(15, 1) });
  ape(S, 1180, GN, 0.85, { mood: "open", dir: 1, arms: [[-70, -250], [90, -60]] });
  DS.card(S, "TOP CHIMP", 640, 480, { size: DS.type.small, t: W(15, 1) });
  const n1 = noise(S, 640, 700, 130, W(15, 6), W(16, 5)), n2 = noise(S, 1180, 740, 110, W(16, 3), W(16, 5));
  [[380, 790, 0.5], [1500, 790, 0.5], [920, 780, 0.45]].forEach(([x, gy, k], i) => { const t = W(16, 3) + i * 0.12; ape(S, x, gy, k, { layer: "mid", mood: "open", arms: [[-80, -290], [80, -290]], t }); noise(S, x, gy - 150 * k, 90 * k, t, W(16, 5)); });
  DS.card(S, "QUIET...", 1400, 160, { size: DS.type.body, t: W(16, 6) });
  DS.vignette(S); }

// Then hooting and drumming, and in the middle of the noise, two chimps kiss and hug.
{ const S = sc(17, 0, { cam: "push", focus: "900 620" }); hall(S);
  [[1380, 520], [1470, 500], [1430, 420]].forEach(([x, y], i) => burstTxt(S, x, y, 60, "!", W(17, 3) + i * 0.2));
  ape(S, 330, 820, 0.55, { layer: "mid", mood: "open", t: W(17, 1) }); ape(S, 1620, 820, 0.55, { layer: "mid", mood: "open", t: W(17, 1) + 0.2 });
  note(S, 330, 520, 0.6, W(17, 1)); note(S, 1620, 520, 0.6, W(17, 1) + 0.2);
  apePair(S, 900, GN, 0.95, { t: W(17, 11) });
  heart(S, 900, 560, 0.9, { t: W(17, 13), name: "pink" });
  DS.card(S, "KISS AND HUG", 900, 150, { size: DS.type.body, t: W(17, 13) });
  DS.vignette(S); }

// Hours later, a young scientist called Frans de Waal realises they're the same two who were fighting.
{ const S = sc(18, 0, { cam: "push", focus: "1000 520" }); DS.room(S, ROOM.office);
  const F = who(S, 520, GN, "near", Object.assign({ pose: "hold", mood: "flat", look: 6 }, SCI));
  const [hx, hy] = F.hand("R"); paperR(S, hx - 60, hy - 70, 120, 150); lines(S, hx - 44, hy - 40, 88, 3, S.start, 30);
  plate(S, 520, 470, "FRANS DE WAAL", W(18, 6));
  F.face(W(18, 9), "wow", 6);
  S.thought(1220, 400, 400, 250, 740, 600, W(18, 9), 0.3);
  apePair(S, 1220, 560, 0.5, { t: W(18, 9) });
  DS.card(S, "THE SAME TWO", 1220, 760, { size: DS.type.body, t: W(18, 11), tc: "red" });
  DS.card(S, "HOURS LATER", 520, 150, { size: DS.type.small });
  DS.vignette(S); }

// In his diary, he writes the Dutch word for reconciliation.
{ const S = sc(19, 0, { cam: "zoom", focus: "1260 560" }); DS.room(S, ROOM.office);
  spread(S, 960, 560, 1300, 700, { name: "brown" });
  S.text("19 Nov. 1975", 450, 320, { size: DS.type.title, font: "caveat", anchor: "start", c: PEN });
  lines(S, 430, 410, 440, 7, S.start, 56);
  S.text("verzoening", 1260, 540, { size: DS.type.display, font: "caveat", t: W(19, 4), c: PEN });
  S.draw(line([1060, 580], [1460, 576], 0), W(19, 6), 0, { c: DS.c("red"), w: DS.w.mid });
  DS.card(S, "= RECONCILIATION", 1260, 720, { size: DS.type.small, t: W(19, 8) });
  DS.card(S, "HIS DIARY", 960, 120, { size: DS.type.body, t: W(19, 2) });
  DS.vignette(S); }

// The kiss that started a whole field of research / wasn't romance. It was an apology.
{ const S = sc(20, 0, { cam: "push", focus: "960 600" }); hall(S);
  apePair(S, 960, GN, 1.0);
  const h = heart(S, 960, 520, 1.0, { name: "pink" });
  xMark(S, 960, 520, 1.6, W(21, 1));
  say(S, 1440, 380, 200, 110, 1060, 600, ["SORRY"], W(21, 5), { size: DS.type.body });
  DS.card(S, "NOT ROMANCE", 520, 300, { size: DS.type.body, t: W(21, 1), tc: "red" });
  DS.card(S, "AN APOLOGY", 1440, 160, { size: DS.type.body, t: W(21, 5) });
  DS.vignette(S); }

// In twenty twenty-five, an Oxford team led by Matilda Brindle mapped kissing onto the primate family tree.
const TLEAF = [["GIBBONS", 380], ["ORANGUTANS", 640], ["GORILLAS", 900], ["CHIMPS", 1160], ["BONOBOS", 1390], ["HUMANS", 1600]];
const NODE = { pan: [1275, 440], hp: [1437, 530], gh: [1168, 620], ga: [904, 700], root: [642, 790] };
const famTree = (S, o = {}) => {
  wboard(S, 190, 100, 1540, 760);
  const t = o.t, Ld = (a, b, tt, name = "ink", ww = DS.w.mid) => S.draw(line(a, b, 0), tt ?? S.start, 0, { c: name === "ink" ? DS.c("gray", 2) : DS.c(name), w: ww });
  const leafY = 350, L = Object.fromEntries(TLEAF.map(([n, x]) => [n, [x, leafY]]));
  const edges = [["root", L.GIBBONS], ["root", NODE.ga], ["ga", L.ORANGUTANS], ["ga", NODE.gh], ["gh", L.GORILLAS], ["gh", NODE.hp], ["hp", NODE.pan], ["hp", L.HUMANS], ["pan", L.CHIMPS], ["pan", L.BONOBOS]];
  edges.forEach(([a, b]) => Ld(NODE[a], b, t));
  TLEAF.forEach(([n, x]) => txt(S, n, x, 300, { t }));
  if (o.pink) edges.slice(2).forEach(([a, b]) => Ld(NODE[a], b, o.pink, "pink", DS.w.near));
  if (o.ring) { S.draw(circ(NODE.ga[0], NODE.ga[1], 46), o.ring, 0, { c: DS.c("red"), w: DS.w.near }); heart(S, NODE.ga[0], NODE.ga[1], 0.45, { t: o.ring }); }
};
{ const S = sc(22, 0, { cam: "push", focus: "960 500" }); DS.room(S, ROOM.board);
  famTree(S, { t: W(22, 10) });
  DS.card(S, "2025", 300, 790, { size: DS.type.body, t: W(22, 1) });
  DS.card(S, "MATILDA BRINDLE, OXFORD", 960, 150, { size: DS.type.small, t: W(22, 8) });
  DS.vignette(S); }

// Their best estimate: it began in an ancestor of the great apes, / between twenty-one and seventeen million years ago.
{ const S = sc(23, 0, { cam: "zoom", focus: "904 640" }); DS.room(S, ROOM.board);
  famTree(S, { ring: W(23, 7), pink: W(23, 10) });
  DS.card(S, "21–17 MILLION YEARS AGO", 1250, 800, { size: DS.type.small, t: W(24, 1), tc: "red" });
  DS.card(S, "AN ANCESTOR OF THE GREAT APES", 960, 150, { size: DS.type.small, t: W(23, 7) });
  DS.vignette(S); }

// Chimps kiss, bonobos kiss, orangutans kiss, and Neanderthals probably did too.
{ const S = sc(25, 0, { cam: "push", focus: "960 640" }); DS.outdoor(S, OUT.day);
  tree(S, 200, 720, 1.1); tree(S, 1760, 700, 0.9);
  [["CHIMP", 380, "chimp", W(25, 0)], ["BONOBO", 760, "bonobo", W(25, 2)], ["ORANGUTAN", 1140, "orang", W(25, 4)]].forEach(([n, x, kind, t]) => {
    ape(S, x, 930, 0.95, { kind, mood: "smile", t: S.start }); plate(S, x, 440, n, S.start); heart(S, x, 560, 0.6, { t });
  });
  who(S, 1520, 930, "near", { s: 0.95, hair: "messy", hairC: DS.c("brown", 2), outfit: "tunic", outfitC: DS.c("earth"), mood: "smile", look: -4 });
  plate(S, 1520, 440, "NEANDERTHAL", S.start);
  heart(S, 1520, 545, 0.6, { t: W(25, 8) }); S.text("?", 1580, 530, { size: DS.type.body, t: W(25, 8), c: DS.c("ink") });
  DS.card(S, "PROBABLY", 1520, 150, { size: DS.type.small, t: W(25, 8) });
  DS.vignette(S); }

// Eastern gorillas, so far, have never been caught at it.
{ const S = sc(26, 0, { cam: "zoom", focus: "860 620" }); DS.outdoor(S, OUT.day);
  tree(S, 260, 720, 1.2); tree(S, 1700, 700, 1.0);
  ape(S, 860, 940, 1.25, { kind: "gorilla", mood: "calm", dir: 0 });
  cctv(S, 1500, 330, { t: W(26, 2) });
  DS.card(S, "EASTERN GORILLA", 860, 150, { size: DS.type.body, t: W(26, 0) });
  DS.card(S, "NEVER CAUGHT", 1500, 680, { size: DS.type.body, t: W(26, 7), tc: "red" });
  DS.vignette(S); }

// Even Charles Darwin, in eighteen seventy-two, wrote about two chimps meeting / with pushed-out lips, a hug, and a yell of delight.
{ const S = sc(27, 0, { cam: "push", focus: "1200 560" }); DS.room(S, ROOM.office);
  book(S, 470, 560, 380, 520, ["THE", "EXPRESSION", "OF THE", "EMOTIONS"], { name: "green" });
  DS.card(S, "CHARLES DARWIN, 1872", 470, 200, { size: DS.type.small, t: W(27, 1) });
  panel(S, 1250, 520, 820, 600, W(27, 8));
  const g1 = S.grp(), g2 = S.grp();
  ape(S, 1060, 760, 0.62, { dir: 1, lips: true, t: W(27, 8), float: true, parent: g1 }); ape(S, 1440, 760, 0.62, { dir: -1, lips: true, t: W(27, 8), float: true, parent: g1 });
  S.fadeOut(g1, W(28, 4), 0.3);
  apePair(S, 1250, 760, 0.62, { t: W(28, 4), parent: g2 });
  burstTxt(S, 1250, 330, 70, "!", W(28, 7));
  DS.card(S, "PUSHED-OUT LIPS", 1250, 880, { size: DS.type.small, t: W(28, 1) });
  DS.vignette(S); }

// Dave hears all this and reaches a conclusion. / "Twenty million years of kissing. So I have to."
{ const S = sc(29, 0, { cam: "zoom", focus: "950 820" }); DS.room(S, ROOMX.den);
  plan(S, { ans: [[0, "21–17M years", W(29, 5)]] });
  S.text("yes?", 990, PY(4), { size: DS.type.title, font: "caveat", anchor: "start", c: DS.c("red", 2), t: W(30, 7) });
  DS.vignette(S); }

// But for an ape, a kiss can mean many things. Making up, saying hello, calming a baby. / So where did the romantic part come from?
{ const S = sc(31, 0, { cam: "push", focus: "960 520" }); DS.room(S, ROOM.board);
  tile(S, 400, 470, "MAKING UP", W(31, 10), (x, y) => apePair(S, x, y + 120, 0.5, { t: W(31, 10) }), { tw: 400, th: 420 });
  tile(S, 850, 470, "SAYING HELLO", W(31, 12), (x, y) => ape(S, x, y + 120, 0.5, { t: W(31, 12), mood: "smile", arms: [[-76, -46], [110, -330]], float: true }), { tw: 400, th: 420 });
  tile(S, 1300, 470, "CALMING A BABY", W(31, 14), (x, y) => { ape(S, x, y + 120, 0.55, { t: W(31, 14), mood: "smile", arms: [[-20, -120], [40, -110]], float: true }); ape(S, x + 6, y + 70, 0.24, { t: W(31, 14), mood: "calm", float: true }); }, { tw: 400, th: 420 });
  heart(S, 1680, 450, 2.0, { t: W(32, 4), name: "pink" }); S.text("?", 1680, 490, { size: DS.type.title, t: W(32, 4), c: DS.c("ink") });
  DS.card(S, "MANY THINGS", 640, 150, { size: DS.type.body, t: W(31, 8) });
  DS.card(S, "THE ROMANTIC PART?", 1380, 150, { size: DS.type.body, t: W(32, 4), tc: "red" });
  DS.vignette(S); }

// ===================== 3. Was the first kiss lunch? =====================
// Theory one: in the nineteen seventies, the Austrian scientist Irenaus Eibl-Eibesfeldt suggested / that the very first kiss was lunch.
{ const S = sc(33, 0, { cam: "push", focus: "1150 520" }); DS.room(S, ROOM.office);
  wboard(S, 780, 230, 860, 560);
  const F = who(S, 470, GN, "near", Object.assign({ pose: "point", mood: "flat", look: 6 }, SCI));
  plate(S, 470, 470, "IRENÄUS EIBL-EIBESFELDT", W(33, 9));
  S.text("the 1970s", 1210, 360, { size: DS.type.title, font: "caveat", t: W(33, 4), c: PEN });
  sandwich(S, 1210, 600, 1.2, { t: W(34, 6) });
  heart(S, 1210, 460, 0.8, { t: W(34, 4), name: "pink" });
  F.face(W(34, 6), "smile", 6);
  DS.card(S, "THEORY 1", 470, 150, { size: DS.type.body, t: W(33, 0) });
  DS.card(S, "THE FIRST KISS = LUNCH?", 1210, 150, { size: DS.type.body, t: W(34, 6), tc: "red" });
  DS.vignette(S); }

// Before baby food came in jars, mothers chewed food soft / and passed it to the baby, mouth to mouth.
{ const S = sc(35, 0, { cam: "push", focus: "900 600" }); DS.room(S, ROOMX.den);
  const top = table(S, 1260, 1660, 720);
  jarB(S, 1460, top, 1.0);
  xMark(S, 1460, top - 90, 1.6, W(35, 4));
  const M = person(S, 760, GN, "near", 1, { s: 1.35, pose: "hold", mood: "flat", look: 6 });
  M.face(W(35, 7), "smile", 6);
  const [hx, hy] = M.hand("R");
  const B = who(S, hx + 34, hy, "near", { s: 0.6, sit: true, hair: "none", outfitC: DS.c("yellow"), mood: "flat", look: -6, float: true });
  B.face(W(36, 5), "happy", -6);
  S.arrow(M.hd[0] + 50, M.hd[1] + 30, B.hd[0] + 6, B.hd[1] - 36, W(36, 1), 0, { c: DS.c("orange"), w: DS.w.near, bend: -0.5 });
  DS.card(S, "BEFORE JARS", 1460, 420, { size: DS.type.body, t: W(35, 1) });
  DS.card(S, "MOUTH TO MOUTH", 760, 150, { size: DS.type.body, t: W(36, 6) });
  DS.vignette(S); }

// A Cornell team found it in thirty-eight of a hundred and nineteen cultures with notes on baby feeding.
{ const S = sc(37, 0, { cam: "push", focus: "960 520" }); DS.room(S, ROOM.board);
  wboard(S, 360, 230, 1200, 600);
  dotGrid(S, 960, 530, 119, 17, 52, 18, { fills: [[38, W(37, 6), 1.4, "orange"]] });
  DS.card(S, "CORNELL", 480, 150, { size: DS.type.body, t: W(37, 1) });
  DS.card(S, "38 OF 119 CULTURES", 1220, 150, { size: DS.type.body, t: W(37, 11), tc: "orange" });
  DS.vignette(S); }

// At one Beijing university, sixty-three percent of the students asked had been fed pre-chewed food as babies.
{ const S = sc(38, 0, { cam: "push", focus: "1250 520" }); DS.outdoor(S, OUT.day);
  const gx = 520, gy = 760;
  DS.shadow(S, gx, gy, 700); DS.shape(S, rect(gx - 300, gy - 300, 600, 300), "wall", { layer: "mid", dir: "h" });
  DS.shape(S, poly([[gx - 360, gy - 290], [gx, gy - 430], [gx + 360, gy - 290]], 0) + " Z", "brown", { layer: "mid" });
  [-210, -105, 0, 105, 210].forEach((dx) => DS.shape(S, rect(gx + dx - 18, gy - 280, 36, 280), "white", { layer: "mid", w: "detail" }));
  [[300, 2], [420, 4], [560, 0], [700, 6]].forEach(([x, i]) => person(S, x, 930, "near", i, { s: 0.85, mood: "smile", look: 4 }));
  panel(S, 1340, 520, 620, 600, S.start);
  pie(S, 1340, 500, 190, 0.63, "orange", { ft: W(38, 4) });
  txt(S, "FED PRE-CHEWED FOOD", 1340, 770, { t: W(38, 13), size: DS.type.caption });
  DS.card(S, "BEIJING", 520, 150, { size: DS.type.body, t: W(38, 2) });
  DS.card(S, "63%", 1340, 150, { size: DS.type.title, t: W(38, 4), tc: "orange" });
  DS.vignette(S); }

// Dave has decided not to ask his mum about this.
{ const S = sc(39, 0, { cam: "push", focus: "800 600" }); DS.room(S, ROOMX.den);
  const seat = couch(S, 260, GN, 560, "green");
  const F = dave(S, 560, seat, "near", { sit: true, pose: "hold", mood: "worried", look: 6 });
  const [hx, hy] = F.hand("R");
  DS.shape(S, rrect(hx - 18, hy - 66, 36, 64, DS.r.xs), "ink", { w: "detail" });
  const P = S.grp(); DS.drop(S, rrect(1180, 230, 360, 620, DS.r.lg), { parent: P });
  DS.shape(S, rrect(1170, 220, 360, 620, DS.r.lg), "ink", { parent: P, w: "mid" });
  DS.shape(S, rrect(1192, 270, 316, 520, DS.r.sm), "navy", { parent: P, flat: true, w: "hair", tone: 1 });
  S.text("MUM", 1350, 420, { size: DS.type.title, c: DS.P.white[0], parent: P });
  S.text("calling...", 1350, 480, { size: DS.type.small, font: "caveat", c: DS.P.white[0], parent: P });
  DS.shape(S, circ(1270, 690, 46), "green", { parent: P, w: "detail" }); DS.shape(S, circ(1430, 690, 46), "red", { parent: P, w: "detail" });
  S.draw(circ(1430, 690, 66), W(39, 3), 0, { c: DS.c("yellow"), w: DS.w.near });
  F.face(W(39, 3), "determined", 6);
  DS.card(S, "NOT ASKING", 560, 330, { size: DS.type.body, t: W(39, 3), tc: "red" });
  DS.vignette(S); }

// Theory two, from Adriano Lameira at Warwick in twenty twenty-four, is grooming.
{ const S = sc(40, 0, { cam: "push", focus: "960 640" }); DS.outdoor(S, OUT.day);
  tree(S, 240, 700, 1.2); tree(S, 1700, 690, 1.0);
  ape(S, 820, GN, 1.0, { dir: 1, mood: "calm" });
  ape(S, 1080, GN, 1.0, { dir: -1, mood: "calm", arms: [[-170, -210], [-120, -130]] });
  DS.card(S, "THEORY 2", 360, 300, { size: DS.type.body, t: W(40, 0) });
  DS.card(S, "ADRIANO LAMEIRA, WARWICK, 2024", 960, 140, { size: DS.type.small, t: W(40, 3) });
  DS.card(S, "GROOMING", 1520, 320, { size: DS.type.body, t: W(40, 11), tc: "green" });
  DS.vignette(S); }

// When a great ape grooms a friend, it often finishes with a little pucker, / sucking the last bit of dirt off the fur.
{ const S = sc(41, 0, { cam: "zoom", focus: "820 720" }); DS.outdoor(S, OUT.day);
  tree(S, 200, 690, 1.0);
  ape(S, 700, 990, 1.3, { dir: -1, mood: "calm" });
  const arms = [[-130, -160], [-100, -90]];
  ape(S, 875, 990, 1.0, { dir: -1, mood: "calm", arms });
  ape(S, 875, 990, 1.0, { dir: -1, lips: true, arms, t: W(41, 13), float: true });
  const sp = S.grp(); [[0, 0], [10, 8], [-6, 12]].forEach(([dx, dy]) => S.fill(circ(788 + dx, 754 + dy, 5), S.start, 0, DS.P.ink[0], 1, sp));
  S.move(sp, W(42, 0), 0.5, { x: 14, y: 0 }); S.fadeOut(sp, W(42, 0) + 0.4, 0.3);
  S.draw(circ(792, 760, 40), W(42, 2), 0, { c: DS.c("red"), w: DS.w.mid });
  DS.card(S, "A LITTLE PUCKER", 1380, 300, { size: DS.type.body, t: W(41, 12) });
  DS.card(S, "THE LAST BIT OF DIRT", 520, 160, { size: DS.type.small, t: W(42, 2), tc: "red" });
  DS.vignette(S); }

// Our ancestors lost the fur. They kept the pucker.
{ const S = sc(43, 0, { cam: "push", focus: "960 600" }); DS.outdoor(S, OUT.day);
  ape(S, 560, GN, 1.0, { dir: 1, lips: true, mood: "calm" });
  S.arrow(780, 700, 1080, 700, W(43, 2), 0, { c: DS.c("ink"), w: DS.w.near, bend: -0.15 });
  [[860, 760], [930, 800], [1000, 770]].forEach(([x, y], i) => DS.shape(S, smooth([[x, y], [x + 14, y - 20], [x + 26, y + 4], [x + 12, y + 16], [x, y]]) + " Z", "brown", { t: W(43, 3) + i * 0.1, w: "hair" }));
  const F = person(S, 1340, GN, "near", 2, { mood: "flat", look: -4, t: W(43, 2) });
  F.face(W(43, 6), "wow", -4);
  DS.card(S, "LOST THE FUR", 930, 300, { size: DS.type.body, t: W(43, 2) });
  DS.card(S, "KEPT THE PUCKER", 1340, 160, { size: DS.type.body, t: W(43, 6), tc: "red" });
  DS.vignette(S); }

// So which is right? Oxford psychologist Robin Dunbar gave an honest answer.
{ const S = sc(44, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM.office);
  tile(S, 440, 420, "LUNCH?", S.start, (x, y) => sandwich(S, x, y + 20, 0.9), { tw: 380, th: 340 });
  tile(S, 1480, 420, "GROOMING?", S.start, (x, y) => ape(S, x, y + 90, 0.5, { lips: true, dir: 1, float: true }), { tw: 380, th: 340 });
  S.text("OR", 960, 450, { size: DS.type.title, c: DS.c("ink") });
  const F = who(S, 960, GN, "near", Object.assign({ mood: "flat", look: 0 }, SCI, { outfitC: DS.c("gray", 1) }));
  F.setPose(W(44, 8), "shrug"); F.face(W(44, 8), "worried", 0);
  plate(S, 960, 560, "ROBIN DUNBAR, OXFORD", W(44, 6));
  DS.card(S, "WHICH IS RIGHT?", 960, 140, { size: DS.type.body, t: W(44, 1) });
  DS.vignette(S); }

// "I am not sure we have anything close to an explanation."
{ const S = sc(45, 0, { cam: "push", focus: "1100 480" }); DS.room(S, ROOM.office);
  const F = who(S, 360, GN, "near", Object.assign({ pose: "shrug", mood: "worried", look: 6 }, SCI, { outfitC: DS.c("gray", 1) }));
  quote(S, 1120, 450, ["I AM NOT SURE WE HAVE", "ANYTHING CLOSE TO", "AN EXPLANATION."], "ROBIN DUNBAR", { t: W(45, 0), ts: [W(45, 0), W(45, 6), W(45, 9)] });
  DS.vignette(S); }

// But we can at least find out when people started writing it down.
{ const S = sc(46, 0, { cam: "push", focus: "1050 620" }); DS.room(S, ROOMX.den);
  const top = desk(S, 820, GN, 780);
  scroll(S, 1050, top - 70, 300, 120, { t: W(46, 9) }); tablet(S, 1380, top - 90, 200, 170, { t: W(46, 10) });
  const F = dave(S, 560, GN, "near", { pose: "reach", mood: "determined", look: 6 });
  const [hx, hy] = F.hand("R"); magnifier(S, hx + 70, hy - 50, 56, { t: S.start });
  DS.card(S, "WRITTEN DOWN", 1200, 300, { size: DS.type.body, t: W(46, 10) });
  DS.vignette(S); }

// ===================== 4. The oldest written kiss =====================
// For years, the oldest written romantic kiss was thought to be Indian, about three and a half thousand years old.
{ const S = sc(47, 0, { cam: "push", focus: "960 520" }); DS.room(S, ROOMX.museum);
  const top = showcase(S, 900, GN, 540, 340);
  scroll(S, 900, top - 150, 420, 220);
  heart(S, 900, top - 280, 0.7, { t: W(47, 5) });
  DS.card(S, "OLDEST WRITTEN KISS?", 960, 140, { size: DS.type.body, t: W(47, 3) });
  DS.card(S, "INDIA", 380, 420, { size: DS.type.body, t: W(47, 11) });
  DS.card(S, "ABOUT 3,500 YEARS OLD", 1480, 420, { size: DS.type.caption, t: W(47, 13), tc: "red" });
  DS.vignette(S); }

// Then in twenty twenty-three, Assyriologist Troels Pank Arboll and zoologist Sophie Lund Rasmussen
{ const S = sc(48, 0, { cam: "push", focus: "960 600" }); DS.room(S, ROOMX.museum);
  const A = who(S, 620, GN, "near", { pose: "hold", hair: "short", hairC: DS.c("earth", 2), outfitC: DS.c("green"), mood: "smile", look: 6, t: W(48, 4) });
  const [ax, ay] = A.hand("R"); tablet(S, ax, ay - 30, 120, 100, { t: W(48, 4) });
  const B = who(S, 1300, GN, "near", { pose: "hold", hair: "bun", hairC: DS.c("brown"), outfitC: DS.c("orange"), mood: "smile", look: -6, t: W(48, 9) });
  plate(S, 620, 470, "TROELS PANK ARBØLL", W(48, 5)); plate(S, 1300, 470, "SOPHIE LUND RASMUSSEN", W(48, 10));
  DS.card(S, "ASSYRIOLOGIST", 620, 360, { size: DS.type.small, t: W(48, 4) });
  DS.card(S, "ZOOLOGIST", 1300, 360, { size: DS.type.small, t: W(48, 9) });
  DS.card(S, "2023", 960, 140, { size: DS.type.body, t: W(48, 2) });
  DS.vignette(S); }

// pushed it back a thousand years, in the journal Science.
{ const S = sc(49, 0, { cam: "push", focus: "800 560" }); DS.room(S, ROOM.board);
  wboard(S, 200, 260, 1520, 500);
  const X = (bc) => 1560 - (bc - 1000) * 0.5;
  S.arrow(1640, 600, 300, 600, S.start, 0, { c: DS.c("gray", 2), w: DS.w.mid, bend: 0 });
  [3000, 2500, 2000, 1500, 1000].forEach((bc) => { S.draw(line([X(bc), 580], [X(bc), 620], 0), S.start, 0, { c: DS.c("gray", 2), w: DS.w.mid }); txt(S, bc + " BC", X(bc), 670); });
  DS.shape(S, circ(X(1500), 600, 18), "gray", { w: "detail" }); txt(S, "INDIA", X(1500), 540);
  DS.shape(S, circ(X(2500), 600, 22), "red", { w: "detail", t: W(49, 4) }); txt(S, "MESOPOTAMIA", X(2500), 540, { t: W(49, 4) });
  S.arrow(X(1500) - 30, 450, X(2500) + 40, 450, W(49, 2), 0, { c: DS.c("red"), w: DS.w.near, bend: -0.3 });
  DS.card(S, "1,000 YEARS EARLIER", 1060, 330, { size: DS.type.small, t: W(49, 4), tc: "red" });
  const J = S.grp(); DS.drop(S, rrect(1528, 66, 220, 170, DS.r.sm), { t: W(49, 8), parent: J }); DS.shape(S, rrect(1520, 56, 220, 170, DS.r.sm), "white", { t: W(49, 8), flat: true, w: "detail", parent: J });
  DS.shape(S, rect(1520, 56, 220, 54), "red", { t: W(49, 8), tone: 2, flat: true, w: "hair", parent: J }); S.text("Science", 1630, 98, { size: DS.type.caption, t: W(49, 8), c: DS.P.white[0], parent: J }); lines(S, 1550, 140, 160, 3, W(49, 8), 28, J);
  DS.vignette(S); }

// Mesopotamia, in what is now Iraq and Syria, about four and a half thousand years ago.
{ const S = sc(50, 0, { cam: "pull", focus: "960 600" }); DS.outdoor(S, OUT.desert);
  ziggurat(S, 1260, 700, 1.0);
  palmTree(S, 380, 760, 1.1); palmTree(S, 1700, 740, 0.9);
  DS.shape(S, smooth([[-200, 860], [400, 830], [900, 870], [1400, 840], [2120, 870], [2120, 930], [1400, 900], [900, 930], [400, 890], [-200, 920]]) + " Z", "blue", { tone: 1, flat: true, w: "detail" });
  DS.card(S, "MESOPOTAMIA", 700, 150, { size: DS.type.body, t: W(50, 0) });
  DS.card(S, "TODAY: IRAQ AND SYRIA", 700, 290, { size: DS.type.small, t: W(50, 5) });
  DS.card(S, "ABOUT 4,500 YEARS AGO", 1260, 820, { size: DS.type.small, t: W(50, 8), tc: "red" });
  DS.vignette(S); }

// Kisses, written into clay tablets in cuneiform.
{ const S = sc(51, 0, { cam: "zoom", focus: "960 520" }); DS.room(S, ROOMX.museum);
  tablet(S, 960, 500, 760, 560, { gap: 90, icon: (x, y) => glyph(S, x, y + 30, "lovers", W(51, 0)) });
  DS.card(S, "CLAY TABLETS", 960, 140, { size: DS.type.body, t: W(51, 3) });
  DS.card(S, "CUNEIFORM", 1560, 820, { size: DS.type.body, t: W(51, 6) });
  DS.vignette(S); }

// Lovers kissed, parents kissed their children, friends kissed.
{ const S = sc(52, 0, { cam: "push", focus: "960 520" }); DS.room(S, ROOMX.museum);
  [["lovers", 420, W(52, 0), "LOVERS"], ["kids", 960, W(52, 2), "PARENTS + CHILDREN"], ["friends", 1500, W(52, 6), "FRIENDS"]].forEach(([k, x, t, str]) => {
    tablet(S, x, 470, 420, 420, { t, gap: 110, icon: (cx, cy) => glyph(S, cx, cy + 40, k, t) }); txt(S, str, x, 760, { t, size: DS.type.small });
  });
  DS.vignette(S); }

// But in the Akkadian texts, most kisses weren't on anyone's lips.
{ const S = sc(53, 0, { cam: "push", focus: "1200 520" }); DS.room(S, ROOMX.museum);
  tablet(S, 560, 500, 520, 600);
  lips(S, 1300, 480, 2.2, { t: W(53, 6) });
  xMark(S, 1300, 480, 3.6, W(53, 7));
  DS.card(S, "AKKADIAN TEXTS", 560, 140, { size: DS.type.body, t: W(53, 3) });
  DS.card(S, "NOT ON THE LIPS", 1300, 760, { size: DS.type.body, t: W(53, 8), tc: "red" });
  DS.vignette(S); }

// People kissed the ground before the gods, and the feet of kings.
{ const S = sc(54, 0, { cam: "push", focus: "1000 640" }); DS.room(S, ROOMX.palace);
  const seat = throne(S, 1500, GN);
  const K = who(S, 1500, seat + 30, "near", { sit: true, s: 1.2, hair: "curly", hairC: DS.c("ink"), outfit: "tunic", outfitC: DS.c("purple", 2), mood: "flat", look: -6 });
  crown(S, K.hd[0], K.hd[1] - K.r * 1.05, K.s, { parent: K.g }); beard(S, K, S.start);
  const L = person(S, 340, GN, "near", 2, { outfit: "tunic", outfitC: DS.c("earth"), mood: "flat", look: 6 });
  spin(L.gi, W(54, 1), 0.5, 0, 82, L.cx, L.gy);
  heart(S, 760, 930, 0.5, { t: W(54, 3) });
  kneel(S, 1250, GN, 1, 4, { outfit: "tunic", outfitC: DS.c("sand", 2), t: S.start });
  heart(S, 1560, 900, 0.5, { t: W(54, 9) });
  DS.card(S, "THE GROUND", 560, 300, { size: DS.type.body, t: W(54, 3) });
  DS.card(S, "THE FEET OF KINGS", 1160, 150, { size: DS.type.body, t: W(54, 9) });
  DS.vignette(S); }

// In one Sumerian story, the hero Gilgamesh meets a monster called Huwawa,
const forest = (S) => { DS.outdoor(S, Object.assign({}, OUT.day, { hills: "green" })); [[160, 700, 1.1], [420, 680, 0.8], [1720, 700, 1.0], [1520, 670, 0.7]].forEach(([x, gy, k]) => cedar(S, x, gy, k)); };
{ const S = sc(55, 0, { cam: "push", focus: "960 600" }); forest(S);
  gilg(S, 640, GN, { t: W(55, 6) });
  huwawa(S, 1340, GN, 0.95, { t: W(55, 9) });
  DS.card(S, "A SUMERIAN STORY", 960, 130, { size: DS.type.body, t: W(55, 2) });
  DS.card(S, "GILGAMESH", 640, 470, { size: DS.type.body, t: W(55, 6) });
  DS.card(S, "HUWAWA", 1340, 280, { size: DS.type.body, t: W(55, 11) });
  DS.vignette(S); }

// makes as if to kiss him, / and punches him on the cheek.
{ const S = sc(56, 0, { cam: "zoom", focus: "1180 640" }); forest(S);
  const G = gilg(S, 1000, GN, { pose: "stand" });
  lean(G, W(56, 0), 9, 0.5); heart(S, 1150, 560, 0.6, { t: W(56, 2) });
  const H = huwawa(S, 1420, GN, 0.9);
  G.setPose(W(57, 1), "push"); spin(G.gi, W(57, 1), 0.2, 9, 0, G.cx, G.gy);
  burstTxt(S, 1270, 700, 100, "POW", W(57, 1) + 0.1);
  DS.card(S, "AS IF TO KISS...", 760, 150, { size: DS.type.body, t: W(56, 0) });
  DS.vignette(S); }

// And one old Sumerian proverb may complain about couples kissing on an open street.
const street = (S) => { DS.outdoor(S, OUT.desert); mudHouse(S, 120, 760, 340, 260); mudHouse(S, 1480, 760, 360, 280); mudHouse(S, 560, 720, 240, 190, { layer: "far" }); mudHouse(S, 1180, 720, 220, 170, { layer: "far" }); };
{ const S = sc(58, 0, { cam: "push", focus: "900 600" }); street(S);
  const A = person(S, 820, GN, "near", 0, { outfit: "tunic", outfitC: DS.c("green"), look: 6 }), B = person(S, 1070, GN, "near", 1, { outfit: "tunic", outfitC: DS.c("orange"), look: -6 });
  lean(A, W(58, 8), 12); lean(B, W(58, 8), -12); hearts(S, 945, 520, W(58, 9), 2, 0.5);
  const O = elderly(S, 1500, GN, { mood: "angry", look: -6 });
  DS.shadow(S, 330, 930, 280, { t: W(58, 4) }); tablet(S, 330, 830, 260, 200, { t: W(58, 4) });
  DS.card(S, "AN OLD SUMERIAN PROVERB", 600, 140, { size: DS.type.small, t: W(58, 3) });
  DS.card(S, "ON AN OPEN STREET", 1320, 270, { size: DS.type.small, t: W(58, 12) });
  DS.vignette(S); }

// Kissing in public has been frowned upon since the Bronze Age.
{ const S = sc(59, 0, { cam: "pull", focus: "960 600" }); street(S);
  [[380, 3], [700, 5], [1240, 6], [1560, 7]].forEach(([x, i], j) => elderly(S, x, GN, { mood: j < 2 ? "angry" : "worried", look: j < 2 ? 6 : -6, i, t: W(59, 5) + j * 0.12 }));
  DS.shadow(S, 960, GN, 80); DS.shape(S, rect(948, 520, 24, 440), "gray", { tone: 2 });
  heart(S, 960, 470, 1.4, { name: "pink" }); S.draw(circ(960, 470, 82), S.start, 0, { c: DS.c("red"), w: DS.w.near }); S.draw(line([902, 412], [1018, 528], 0), S.start, 0, { c: DS.c("red"), w: DS.w.near });
  DS.card(S, "FROWNED UPON", 960, 150, { size: DS.type.body, t: W(59, 5) });
  DS.card(S, "SINCE THE BRONZE AGE", 960, 270, { size: DS.type.small, t: W(59, 7), tc: "red" });
  DS.vignette(S); }

// Arboll's conclusion: kissing didn't start in one place and spread. / It turned up in many ancient cultures, over thousands of years.
{ const S = sc(60, 0, { cam: "push", focus: "960 560" }); space(S, DS.outdoor(S, SPACE));
  const R = 320, E = earth(S, 960, 560, R);
  const P0 = [960 + 0.5 * R, 560 - 0.5 * R];
  DS.shape(S, circ(P0[0], P0[1], 16), "red", { t: W(60, 6), w: "detail" });
  const arr = S.grp(); [[-120, -80], [-150, 60], [40, 150], [120, -40]].forEach(([dx, dy]) => S.arrow(P0[0], P0[1], P0[0] + dx, P0[1] + dy, W(60, 9), 0, { c: DS.c("red"), w: DS.w.mid, parent: arr }));
  xMark(S, P0[0], P0[1], 2.0, W(60, 9) + 0.5);
  S.fadeOut(arr, W(61, 0), 0.3);
  [[-0.05, -0.62], [0.2, -0.36], [0.5, -0.5], [-0.3, -0.7], [0.72, -0.3], [0.3, -0.72], [-0.12, 0.1], [0.1, 0.35], [-0.42, -0.25]].forEach(([a, b], i) => heart(S, 960 + a * R, 560 + b * R, 0.5, { t: W(61, 4) + i * 0.16 }));
  DS.card(S, "ARBØLL'S CONCLUSION", 960, 120, { size: DS.type.body, t: W(60, 0) });
  DS.card(S, "MANY ANCIENT CULTURES", 420, 860, { size: DS.type.caption, t: W(61, 4) });
  DS.card(S, "OVER THOUSANDS OF YEARS", 1480, 860, { size: DS.type.caption, t: W(61, 8) });
  DS.vignette(S); }

// Dave reads that twice, and stays completely fine. / "So it's ancient, and it's everywhere. I definitely have to."
{ const S = sc(62, 0, { cam: "push", focus: "800 560" }); DS.room(S, ROOMX.den);
  const F = dave(S, 760, GN, "near", { pose: "hold", mood: "flat", look: 0 });
  const [hx, hy] = F.hand("R"); paperR(S, hx - 80, hy - 80, 160, 190); lines(S, hx - 60, hy - 46, 120, 4, S.start, 32);
  F.face(W(62, 5), "smile", 0); sweat(S, 840, 560, W(62, 6));
  DS.card(S, "COMPLETELY FINE", 560, 420, { size: DS.type.body, t: W(62, 6) });
  say(S, 1400, 380, 360, 190, 880, 580, ["IT'S ANCIENT.", "IT'S EVERYWHERE.", "I DEFINITELY HAVE TO."], W(63, 0), { size: DS.type.small });
  F.face(W(63, 6), "worried", 6);
  DS.vignette(S); }

// So if it's everywhere, what is it for?
{ const S = sc(64, 0, { cam: "zoom", focus: "940 560" }); DS.room(S, ROOMX.den);
  plan(S, { ans: [[0, "21–17M years"], [1, "2500 BC", S.start + 0.2]], ring: [2, W(64, 4)] });
  S.text("yes!", 990, PY(4), { size: DS.type.title, font: "caveat", anchor: "start", c: DS.c("red", 2) });
  DS.vignette(S); }

// ===================== 5. The taste test =====================
// In twenty thirteen, Rafael Wlodarski and Robin Dunbar asked nine hundred and two adults what kissing is for.
{ const S = sc(65, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM.office);
  paperR(S, 250, 230, 580, 650);
  txt(S, "WHAT IS KISSING FOR?", 540, 310);
  txt(S, "SURVEY, 2013", 540, 366, { c: DS.c("gray", 2), t: W(65, 1) });
  [470, 570, 670, 770].forEach((y, i) => { DS.shape(S, rect(300, y - 34, 44, 44), "white", { flat: true, w: "detail" }); S.draw(line([376, y - 12], [376 + [320, 250, 360, 220][i], y - 12], 0), S.start, 0, { c: DS.c("gray", 1), w: DS.w.detail }); });
  for (let i = 0; i < 7; i++) person(S, 1020 + i * 115, 920, "mid", i, { t: W(65, 9) + i * 0.07, look: -4 });
  DS.card(S, "RAFAEL WLODARSKI & ROBIN DUNBAR", 960, 130, { size: DS.type.small, t: W(65, 3) });
  DS.card(S, "902 ADULTS", 1380, 330, { size: DS.type.body, t: W(65, 9), tc: "blue" });
  DS.vignette(S); }

// Two answers came out on top. Checking out a new partner, / and keeping an existing one close.
{ const S = sc(66, 0, { cam: "push", focus: "960 580" }); DS.room(S, ROOM.office);
  const pod = (x, h, n, t) => { DS.shadow(S, x, GN, 460, { t }); DS.shape(S, rect(x - 220, GN - h, 440, h), "gold", { t, dir: "h" }); S.text(n, x, GN - h + 120, { size: DS.type.display, t, c: DS.c("ink") }); };
  pod(640, 260, "1", W(66, 6)); pod(1280, 200, "2", W(67, 1));
  heart(S, 610, 540, 1.7, { t: W(66, 6), name: "pink" }); magnifier(S, 590, 520, 92, { t: W(66, 6) });
  heart(S, 1225, 610, 1.4, { t: W(67, 1), name: "pink" }); heart(S, 1335, 620, 1.4, { t: W(67, 1), name: "red" });
  DS.card(S, "TWO ANSWERS ON TOP", 960, 130, { size: DS.type.body, t: W(66, 0) });
  DS.card(S, "CHECKING OUT A NEW PARTNER", 640, 290, { size: DS.type.small, t: W(66, 6) });
  DS.card(S, "KEEPING ONE CLOSE", 1300, 410, { size: DS.type.small, t: W(67, 1) });
  DS.vignette(S); }

// So a first kiss isn't only a kiss. It's a taste test.
{ const S = sc(68, 0, { cam: "zoom", focus: "940 560" }); DS.room(S, ROOMX.den);
  plan(S, { ans: [[0, "21–17M years"], [1, "2500 BC"], [2, "a taste test!", W(68, 10)]], ring: [2, W(68, 4)] });
  S.text("yes!", 990, PY(4), { size: DS.type.title, font: "caveat", anchor: "start", c: DS.c("red", 2) });
  DS.vignette(S); }

// In one small survey by Gordon Gallup, / fifty-nine percent of men and sixty-six percent of women
{ const S = sc(69, 0, { cam: "push", focus: "960 540" }); DS.room(S, ROOM.board);
  wboard(S, 420, 220, 1080, 660);
  S.draw(line([560, 780], [1360, 780], 0), S.start, 0, { c: DS.c("gray", 2), w: DS.w.mid });
  [[760, 0.59, "59%", "MEN", W(70, 0)], [1160, 0.66, "66%", "WOMEN", W(70, 5)]].forEach(([x, f, p, n, t]) => {
    bar(S, x, 780, 220, f * 480, "orange", t); txt(S, n, x, 836, { t, size: DS.type.small }); S.text(p, x, 780 - f * 480 - 30, { size: DS.type.title, t, c: DS.c("ink") });
  });
  DS.card(S, "ONE SMALL SURVEY: GORDON GALLUP", 960, 130, { size: DS.type.small, t: W(69, 2) });
  DS.vignette(S); }

// said they'd liked someone, kissed them, and gone right off them.
{ const S = sc(71, 0, { cam: "push", focus: "1200 520" }); DS.room(S, ROOM.board);
  const pair = (x, y, t, k) => { const A = person(S, x - 70, y, "near", 0, { s: 0.55, t, look: 6, mood: k === 2 ? "flat" : "smile" }), B = person(S, x + 70, y, "near", 1, { s: 0.52, t, look: k === 2 ? 8 : -6, mood: k === 2 ? "flat" : "smile" }); return [A, B]; };
  tile(S, 420, 470, "LIKED THEM", W(71, 2), (x, y) => { pair(x, y + 170, W(71, 2), 0); heart(S, x - 70, y - 40, 0.6, { t: W(71, 2) }); }, { tw: 460, th: 460 });
  tile(S, 960, 470, "KISSED THEM", W(71, 4), (x, y) => { const [A, B] = pair(x, y + 170, W(71, 4), 1); lean(A, W(71, 4), 10, 0.3); lean(B, W(71, 4), -10, 0.3); heart(S, x, y - 40, 0.6, { t: W(71, 4) + 0.3 }); }, { tw: 460, th: 460 });
  tile(S, 1500, 470, "GONE RIGHT OFF THEM", W(71, 7), (x, y) => { const [A, B] = pair(x, y + 170, W(71, 7), 2); S.move(B.all, W(71, 8), 0.6, { x: 60 }); heart(S, x, y - 40, 0.6, { t: W(71, 7), name: "gray" }); xMark(S, x, y - 40, 0.8, W(71, 8)); }, { tw: 460, th: 460 });
  DS.vignette(S); }

// Dave is fine. Dave now practises the handshake twice a day.
{ const S = sc(72, 0, { cam: "push", focus: "900 620" }); doorstep(S);
  const F = dave(S, 800, GN, "near", { pose: "reach", mood: "smile", look: 6 });
  mitt(S, F, "R");
  sweat(S, 880, 560, W(72, 2));
  DS.card(S, "DAVE IS FINE", 800, 440, { size: DS.type.body, t: W(72, 1) });
  DS.card(S, "TWICE A DAY", 1240, 150, { size: DS.type.body, t: W(72, 8), tc: "red" });
  DS.vignette(S); }

// Which brings us back to Tuesday's number. / In twenty fourteen, Dutch scientists led by Remco Kort
{ const S = sc(73, 0, { cam: "push", focus: "1000 520" }); DS.room(S, ROOM.night); nightWin(S, 1560, 150, 160, 160);
  const top = desk(S, 860, GN, 700);
  const L = laptop(S, 1210, top, 540, 300, { screen: "navy" });
  [0, 1, 2].forEach((i) => S.draw(line([L.x0 + 30, L.y0 + 36 + i * 30], [L.x1 - 30 - i * 60, L.y0 + 36 + i * 30], 0), S.start, 0, { c: DS.c("gray", 1), w: DS.w.detail }));
  S.text(N80, L.cx, L.y1 - 40, { size: DS.type.body, c: DS.c("yellow") });
  dave(S, 600, GN, "near", { mood: "worried", look: 7 });
  DS.card(S, "TUESDAY'S NUMBER", 1180, 360, { size: DS.type.body, t: W(73, 5), tc: "red" });
  DS.card(S, "2014: DUTCH SCIENTISTS", 560, 140, { size: DS.type.small, t: W(74, 1) });
  DS.card(S, "LED BY REMCO KORT", 560, 250, { size: DS.type.small, t: W(74, 7) });
  DS.vignette(S, 0.18); }

// published a kissing experiment on twenty-one couples visiting Amsterdam's zoo.
{ const S = sc(75, 0, { cam: "push", focus: "960 600" }); zooGate(S, 960, "ARTIS, AMSTERDAM");
  [[300, 420, 0], [880, 1010, 2], [1520, 1640, 4]].forEach(([a, b, i], j) => { const t = W(75, 5) + j * 0.15; person(S, a, GN, "near", i, { s: 0.92, look: 6, mood: "smile", t }); person(S, b, GN, "near", i + 1, { s: 0.88, look: -6, mood: "smile", t }); heart(S, (a + b) / 2, 560, 0.5, { t: t + 0.2 }); });
  DS.card(S, "A KISSING EXPERIMENT", 960, 120, { size: DS.type.body, t: W(75, 2) });
  DS.card(S, "21 COUPLES", 960, 470, { size: DS.type.body, t: W(75, 5), tc: "red" });
  DS.vignette(S); }

// A zoo again. This time, the apes being studied were the visitors.
{ const S = sc(76, 0, { cam: "push", focus: "960 560" }); DS.outdoor(S, OUT.day);
  DS.shadow(S, 960, 860, 860);
  [[560, 0], [1360, 0]].forEach(([x]) => DS.shape(S, rect(x - 16, 300, 32, 560), "gray", { layer: "mid", tone: 2 }));
  [[760, 860, 0, 1], [1080, 860, 3, 4]].forEach(([x, gy, i, j]) => { person(S, x - 60, gy, "mid", i, { look: 6, mood: "smile" }); person(S, x + 60, gy, "mid", j, { look: -6, mood: "smile" }); });
  S.fill(rect(576, 300, 768, 560), S.start, 0, DS.c("glass", 1), 0.3);
  DS.shape(S, rect(540, 270, 840, 40), "gray", { layer: "mid", tone: 2 });
  plate(S, 960, 240, "HUMANS", W(76, 10), { fill: "yellow" });
  [[300, 1], [1620, -1]].forEach(([x, d], i) => { const k = 0.9, gy = GN; ape(S, x, gy, k, { dir: d, mood: "calm", arms: [[-40, -150], [40, -150]], t: W(76, 6) + i * 0.15 }); clipb(S, x + d * 6, gy - 150 * k, 0.55, { t: W(76, 6) + i * 0.15 }); });
  DS.card(S, "A ZOO AGAIN", 960, 130, { size: DS.type.body, t: W(76, 0) });
  DS.vignette(S); }

// One partner drank a yoghurt drink full of easy-to-spot bacteria, then they kissed for ten seconds.
{ const S = sc(77, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM.lab);
  const top = table(S, 180, 580, 720);
  bottle(S, 380, top, 1.5, { t: W(77, 4) });
  plate(S, 380, 880, "YOGHURT DRINK", W(77, 4));
  bugs(S, 380, 240, 6, 70, 0.55, W(77, 9), 0.6);
  const A = person(S, 900, GN, "near", 0, { look: 6, mood: "smile" }), B = person(S, 1150, GN, "near", 1, { look: -6, mood: "smile" });
  lean(A, W(77, 12), 12); lean(B, W(77, 12), -12); hearts(S, 1025, 520, W(77, 12) + 0.3, 2, 0.5);
  stopwatch(S, 1590, 430, 110, { t: W(77, 13), go: W(77, 14), dur: 1.4, turn: 360 });
  DS.card(S, "10 SECONDS", 1590, 650, { size: DS.type.body, t: W(77, 14) });
  DS.card(S, "EASY-TO-SPOT BACTERIA", 760, 120, { size: DS.type.small, t: W(77, 8), tc: "green" });
  DS.vignette(S); }

// The scientists worked out what had moved across. / About eighty million bacteria, in one kiss.
{ const S = sc(78, 0, { cam: "zoom", focus: "1160 480" }); DS.room(S, ROOM.lab);
  const F = who(S, 360, GN, "near", Object.assign({ pose: "hold", mood: "flat", look: 6 }, SCI));
  const [hx, hy] = F.hand("R"); calc(S, hx, hy - 50, 0.8, { t: W(78, 2) });
  F.face(W(79, 1), "wow", 6);
  countUp(S, 1160, 500, 80000000, W(79, 1), 1.4);
  for (let i = 0; i < 14; i++) { const a = (i / 14) * Math.PI * 2, x = 1160 + Math.cos(a) * 520, y = 470 + Math.sin(a) * 250; if (x < 1780) bug(S, x, y, 0.75, { t: W(79, 3) + i * 0.05 }); }
  DS.card(S, "BACTERIA", 1160, 640, { size: DS.type.body, t: W(79, 3), tc: "green" });
  DS.card(S, "IN ONE KISS", 1160, 820, { size: DS.type.body, t: W(79, 4) });
  DS.vignette(S); }

// Also, in the same couples, the men reported about ten kisses a day, / and the women about five. Somebody is counting wrong.
{ const S = sc(80, 0, { cam: "push", focus: "960 520" }); DS.room(S, ROOM.office);
  wboard(S, 220, 200, 640, 380); wboard(S, 1060, 200, 640, 380);
  txt(S, "MEN", 540, 280, { size: DS.type.small }); txt(S, "WOMEN", 1380, 280, { size: DS.type.small });
  tally(S, 390, 330, 10, W(80, 9), { step: 0.08 }); tally(S, 1300, 330, 5, W(81, 4), { step: 0.08 });
  txt(S, "10 A DAY", 540, 520, { size: DS.type.small, t: W(80, 9), c: DS.c("red", 2) }); txt(S, "5 A DAY", 1380, 520, { size: DS.type.small, t: W(81, 4), c: DS.c("red", 2) });
  const M = person(S, 560, GN, "near", 0, { pose: "pointL", mood: "smile", look: -4 }), Wm = person(S, 1360, GN, "near", 1, { pose: "point", mood: "flat", look: 4 });
  M.face(W(81, 5), "worried", 6); Wm.face(W(81, 5), "worried", -6);
  S.text("?", 960, 640, { size: DS.type.display, t: W(81, 5), c: DS.c("red", 2) });
  DS.card(S, "SOMEBODY IS COUNTING WRONG", 960, 120, { size: DS.type.small, t: W(81, 6) });
  DS.vignette(S); }

// Then Dave finds a study from Wales. / The same year, scientists there dipped a gloved hand in harmless bacteria and shook another.
{ const S = sc(82, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM.lab);
  const top = table(S, 460, 900, 760);
  petri(S, 640, top - 30, 1.0, { t: W(83, 9) });
  const F = who(S, 380, GN, "near", Object.assign({ armR: [[60, 30], [120, 62]], mood: "flat", look: 6 }, SCI));
  mitt(S, F, "R", { skin: "sky", t: W(83, 7) });
  bugs(S, 660, top - 34, 6, 70, 0.42, W(83, 10), 0.5);
  greet(S, 1400, GN, 1.0, "shake", { skin: "sky", coat: true, t: W(83, 13), i: 2 });
  DS.card(S, "A STUDY FROM WALES, 2014", 960, 130, { size: DS.type.small, t: W(82, 4) });
  DS.card(S, "HARMLESS BACTERIA", 760, 460, { size: DS.type.small, t: W(83, 10), tc: "green" });
  DS.card(S, "GLOVED HANDSHAKE", 1400, 420, { size: DS.type.small, t: W(83, 13) });
  DS.vignette(S); }

// A handshake passed on nearly twice as many as a high five, / and a fist bump the fewest.
{ const S = sc(84, 0, { cam: "push", focus: "960 520" }); DS.room(S, ROOM.board);
  wboard(S, 260, 170, 1400, 740);
  const base = 680;
  S.draw(line([380, base], [1540, base], 0), S.start, 0, { c: DS.c("gray", 2), w: DS.w.mid });
  [[560, 400, "HANDSHAKE", W(84, 1), "shake"], [960, 210, "HIGH FIVE", W(84, 10), "five"], [1360, 90, "FIST BUMP", W(85, 2), "bump"]].forEach(([x, h, n, t, kind], i) => {
    bar(S, x, base, 220, h, "green", t); txt(S, n, x, base - h - 26, { t, size: DS.type.small }); greet(S, x, base + 190, 0.42, kind, { t, i });
  });
  DS.card(S, "BACTERIA PASSED ON", 960, 110, { size: DS.type.body });
  DS.vignette(S); }

// The handshake is not the clean option. Dave switches to a fist bump.
{ const S = sc(86, 0, { cam: "push", focus: "900 620" }); doorstep(S);
  tile(S, 380, 420, "", S.start, (x, y) => greet(S, x, y + 150, 0.5, "shake"), { tw: 380, th: 320 });
  xMark(S, 380, 420, 2.4, W(86, 3));
  const F = dave(S, 800, GN, "near", { pose: "reach", mood: "flat", look: 6 });
  const m1 = mitt(S, F, "R"); S.fadeOut(m1, W(86, 8), 0.2);
  mitt(S, F, "R", { fist: true, t: W(86, 8) });
  F.face(W(86, 8), "determined", 6);
  DS.card(S, "NOT THE CLEAN OPTION", 380, 170, { size: DS.type.small, t: W(86, 3), tc: "red" });
  DS.card(S, "FIST BUMP", 1000, 560, { size: DS.type.body, t: W(86, 11) });
  DS.vignette(S); }

// ===================== 6. Left or right? =====================
// Dave's last hope: if a kiss does happen, he can at least get the angle right.
{ const S = sc(87, 0, { cam: "zoom", focus: "940 680" }); DS.room(S, ROOMX.den);
  plan(S, { ans: [[0, "21–17M years"], [1, "2500 BC"], [2, "a taste test!"]], ring: [3, W(87, 13)] });
  S.text("?", 990, PY(3), { size: DS.type.title, font: "caveat", anchor: "start", c: PEN, t: W(87, 14) });
  S.text("yes!", 990, PY(4), { size: DS.type.title, font: "caveat", anchor: "start", c: DS.c("red", 2) });
  DS.vignette(S); }

// In two thousand three, psychologist Onur Gunturkun watched kissing couples
{ const S = sc(88, 0, { cam: "push", focus: "900 600" }); DS.outdoor(S, OUT.day);
  tree(S, 1500, 700, 1.0);
  const A = person(S, 1200, 720, "far", 2, { look: 6, mood: "smile", t: W(88, 8) }), B = person(S, 1290, 720, "far", 5, { look: -6, mood: "smile", t: W(88, 8) });
  lean(A, W(88, 8), 9, 0.3); lean(B, W(88, 8), -9, 0.3); heart(S, 1245, 470, 0.35, { t: W(88, 8) + 0.3 });
  const F = who(S, 520, GN, "near", Object.assign({ pose: "hold", mood: "flat", look: 8 }, SCI, { outfitC: DS.c("earth", 1) }));
  const [hx, hy] = F.hand("R"); paperR(S, hx - 50, hy - 60, 110, 130); lines(S, hx - 34, hy - 30, 76, 3, S.start, 28);
  DS.shape(S, smooth([[300, 960], [300, 860], [360, 800], [460, 790], [560, 820], [640, 800], [720, 860], [740, 960]]) + " Z", "green", { tone: 2 });
  plate(S, 520, 470, "ONUR GÜNTÜRKÜN", W(88, 5));
  DS.card(S, "2003", 520, 150, { size: DS.type.body, t: W(88, 1) });
  DS.card(S, "WATCHED KISSING COUPLES", 1240, 150, { size: DS.type.small, t: W(88, 7) });
  DS.vignette(S); }

// at airports, stations, beaches and parks in the United States, Germany and Turkey.
{ const S = sc(89, 0, { cam: "push", focus: "960 520" }); DS.room(S, ROOM.board);
  [[330, "AIRPORTS", W(89, 1), iconPlane], [750, "STATIONS", W(89, 2), iconTrain], [1170, "BEACHES", W(89, 3), iconBeach], [1590, "PARKS", W(89, 5), iconTree]].forEach(([x, n, t, ic]) => tile(S, x, 440, n, t, (cx, cy) => ic(S, cx, cy, t), { tw: 360, th: 380 }));
  DS.card(S, "UNITED STATES · GERMANY · TURKEY", 960, 780, { size: DS.type.small, t: W(89, 8) });
  DS.vignette(S); }

// Out of a hundred and twenty-four couples, / eighty turned their heads to the right, about two in three.
{ const S = sc(90, 0, { cam: "push", focus: "960 540" }); DS.room(S, ROOM.board);
  wboard(S, 200, 200, 1520, 660);
  dotGrid(S, 700, 540, 124, 16, 52, 19, { fills: [[80, W(91, 0), 1.3, "red"]] });
  const g = S.grp(); [-46, 46].forEach((dx) => { DS.shape(S, circ(1400 + dx, 470, 46), "white", { parent: g, t: W(91, 1) }); const fg = S.grp(g); face3(S, fg, 1400 + dx + 6, 470, 46, W(91, 1), "smile", 1, DS.P.ink[0]); }); g.setAttribute("transform", "rotate(16 1400 470)");
  S.arrow(1270, 600, 1560, 600, W(91, 4), 0, { c: DS.c("red"), w: DS.w.near, bend: 0 });
  txt(S, "RIGHT", 1415, 660, { t: W(91, 5), size: DS.type.small, c: DS.c("red", 2) });
  DS.card(S, "124 COUPLES", 700, 130, { size: DS.type.body, t: W(90, 3) });
  DS.card(S, "80 OF 124: ABOUT 2 IN 3", 1360, 790, { size: DS.type.small, t: W(91, 7), tc: "red" });
  DS.vignette(S); }

// His idea: it's the same right turn babies make in their last weeks in the womb, / and in their first six months.
{ const S = sc(92, 0, { cam: "zoom", focus: "900 640" }); DS.room(S, ROOMX.nursery);
  DS.shadow(S, 960, GN, 760);
  [600, 1300].forEach((x) => DS.shape(S, rect(x - 15, 560, 30, 400), "white", { tone: 2 }));
  DS.shape(S, rrect(600, 760, 700, 60, DS.r.sm), "white", { tone: 1 });
  DS.shape(S, rrect(700, 650, 180, 110, DS.r.md), "white", { flat: true });
  DS.shape(S, rrect(840, 660, 380, 110, DS.r.lg), "yellow", { tone: 1 });
  const hx = 800, hy = 690, R = 56, fg = S.grp();
  DS.shape(S, circ(hx, hy, R), "white", { parent: fg });
  face3(S, fg, hx + 9, hy, R, S.start, "sleep", 1, DS.P.ink[0]);
  S.arrow(760, 590, 900, 590, W(92, 5), 0, { c: DS.c("red"), w: DS.w.near, bend: -0.3 });
  DS.card(S, "THE SAME RIGHT TURN", 960, 140, { size: DS.type.body, t: W(92, 5), tc: "red" });
  DS.card(S, "LAST WEEKS BEFORE BIRTH", 520, 300, { size: DS.type.small, t: W(92, 11) });
  DS.card(S, "FIRST 6 MONTHS", 1420, 300, { size: DS.type.small, t: W(93, 3) });
  DS.vignette(S); }

// And the paper, in the journal Nature, contains this exact sentence. / It takes two people to kiss.
{ const S = sc(94, 0, { cam: "zoom", focus: "960 560" }); DS.room(S, ROOM.office);
  paperR(S, 520, 190, 880, 740);
  S.text("nature", 960, 290, { size: DS.type.title, c: DS.c("ink") });
  S.draw(line([580, 330], [1340, 330], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.detail });
  lines(S, 580, 400, 760, 3, S.start, 44); lines(S, 580, 660, 760, 4, S.start, 44);
  DS.shape(S, rrect(570, 530, 740, 74, DS.r.xs), "yellow", { t: W(95, 0), flat: true, tone: 1, w: "hair" });
  S.text("It takes two people to kiss.", 600, 580, { size: DS.type.small, anchor: "start", t: W(95, 0), c: DS.c("ink") });
  DS.card(S, "THIS EXACT SENTENCE", 960, 110, { size: DS.type.body, t: W(94, 7) });
  DS.vignette(S); }

// So Dave practises a right turn and a fist bump together, in the mirror. / It looks exactly like the Gilgamesh move.
{ const S = sc(96, 0, { cam: "push", focus: "980 560" }); DS.room(S, ROOMX.den);
  const R = mirror(S, 1260, 520, 440, 620);
  const Fr = dave(S, 1260, 880, "mid", { parent: R, armL: [[-62, 10], [-134, 8]], mood: "determined", look: -7, float: true });
  mitt(S, Fr, "L", { fist: true });
  const F = dave(S, 700, GN, "near", { pose: "reach", mood: "determined", look: 7 });
  mitt(S, F, "R", { fist: true });
  lean(F, W(96, 4), 7); lean(Fr, W(96, 4), -7);
  tile(S, 400, 300, "", W(97, 1), (x, y) => { const G = gilg(S, x - 70, y + 140, { s: 0.42, pose: "push", t: W(97, 1) }); huwawa(S, x + 100, y + 140, 0.32, { t: W(97, 1) }); }, { tw: 400, th: 300 });
  DS.card(S, "THE GILGAMESH MOVE", 960, 110, { size: DS.type.body, t: W(97, 5), tc: "red" });
  DS.vignette(S); }

// ===================== 7. Only forty-six percent =====================
// For decades, scientists repeated the same number. / Romantic kissing happens in more than ninety percent of human cultures.
{ const S = sc(98, 0, { cam: "push", focus: "960 480" }); DS.room(S, ROOM.office);
  [380, 680, 980, 1280, 1580].forEach((x, i) => { const t = W(98, 1) + i * 0.22; paperR(S, x - 110, 250, 220, 290, { t }); lines(S, x - 80, 300, 160, 5, t, 34); S.text("90%", x, 500, { size: DS.type.title, t: W(98, 5) + i * 0.15, c: DS.c("red", 2) }); });
  who(S, 1580, GN, "near", Object.assign({ pose: "pointL", mood: "smile", look: -6 }, SCI, { outfitC: DS.c("gray", 1) }));
  DS.card(S, "FOR DECADES", 960, 140, { size: DS.type.body, t: W(98, 1) });
  DS.card(S, "MORE THAN 90% OF HUMAN CULTURES", 820, 680, { size: DS.type.small, t: W(99, 4) });
  DS.vignette(S); }

// In twenty fifteen, anthropologists William Jankowiak, Shelly Volsche and Justin Garcia checked a hundred and sixty-eight cultures.
const grid168 = (S, o = {}) => { wboard(S, 900, 190, 860, 660); return dotGrid(S, 1330, 520, 168, 14, 40, 14, o); };
{ const S = sc(100, 0, { cam: "push", focus: "1000 520" }); DS.room(S, ROOM.board);
  names(S, 470, 470, ["WILLIAM JANKOWIAK", "SHELLY VOLSCHE", "JUSTIN GARCIA"], [W(100, 4), W(100, 6), W(100, 9)]);
  grid168(S, { t: W(100, 13) });
  DS.card(S, "2015", 470, 220, { size: DS.type.body, t: W(100, 1) });
  DS.card(S, "168 CULTURES", 1330, 120, { size: DS.type.body, t: W(100, 15) });
  DS.vignette(S); }

// Romantic kissing turned up in forty-six percent. Less than half.
{ const S = sc(101, 0, { cam: "zoom", focus: "1100 520" }); DS.room(S, ROOM.board);
  grid168(S, { fills: [[77, W(101, 1), 1.4, "red"]] });
  DS.card(S, "168 CULTURES", 1330, 120, { size: DS.type.body });
  DS.card(S, "46%", 470, 400, { size: DS.type.display, t: W(101, 5), tc: "red" });
  DS.card(S, "LESS THAN HALF", 470, 580, { size: DS.type.body, t: W(101, 7) });
  DS.vignette(S); }

// The ninety percent seems to have counted every kind of kiss, mostly parents and children.
{ const S = sc(102, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM.board);
  const pc = (x, y, t) => { const P = kneelS(S, x - 40, y, 1, 2, 0.62, { t, look: 8 }), C = person(S, x + 24, y, "near", 5, { s: 0.38, t, look: -6, mood: "happy" }); lean(P, t + 0.2, 10, 0.4); heart(S, x + 4, y - 200, 0.5, { t: t + 0.5 }); };
  const two = (x, y, t, hrt) => { const A = person(S, x - 66, y, "near", 0, { s: 0.6, t, look: 6, mood: "smile" }), B = person(S, x + 66, y, "near", hrt ? 1 : 4, { s: 0.58, t, look: -6, mood: "smile" }); lean(A, t + 0.2, 11, 0.3); lean(B, t + 0.2, -11, 0.3); if (hrt) heart(S, x, y - 250, 0.5, { t: t + 0.5 }); };
  tile(S, 420, 540, "PARENTS + CHILDREN", W(102, 7), (x, y) => pc(x, y + 170, W(102, 7)), { tw: 460, th: 440 });
  tile(S, 960, 540, "FRIENDS, HELLOS", W(102, 8), (x, y) => two(x, y + 170, W(102, 8)), { tw: 460, th: 440 });
  tile(S, 1500, 540, "COUPLES", W(102, 9), (x, y) => two(x, y + 170, W(102, 9), true), { tw: 460, th: 440 });
  S.draw(rrect(176, 304, 488, 472, DS.r.lg), W(102, 12), 0, { c: DS.c("red"), w: DS.w.near });
  DS.card(S, "THE 90%: EVERY KIND OF KISS", 960, 150, { size: DS.type.body, t: W(102, 1) });
  DS.vignette(S); }

// Most hunter-gatherer groups in the sample showed no sign of it.
{ const S = sc(103, 0, { cam: "push", focus: "960 620" }); DS.outdoor(S, OUT.dusk);
  fire(S, 960, 900, 1.0);
  const sit = (x, d, i) => person(S, x, 905, "near", i, { sit: true, s: 0.95, legL: [[d * 62, 4], [d * 124, 8]], legR: [[d * 72, -2], [d * 134, 2]], mood: "smile", look: d * 6, outfit: "tunic" });
  sit(560, 1, 2); sit(720, 1, 5); sit(1200, -1, 3); sit(1360, -1, 6);
  heart(S, 1600, 420, 1.1, { name: "gray", t: W(103, 7) }); S.text("?", 1600, 450, { size: DS.type.title, t: W(103, 7), c: DS.c("ink") });
  DS.card(S, "HUNTER-GATHERERS", 960, 150, { size: DS.type.body, t: W(103, 1) });
  DS.card(S, "NO SIGN OF IT", 1600, 600, { size: DS.type.body, t: W(103, 7), tc: "red" });
  DS.vignette(S); }

// When the Thonga people of southern Africa first saw Europeans kissing, they laughed.
{ const S = sc(104, 0, { cam: "push", focus: "960 600" }); DS.outdoor(S, Object.assign({}, OUT.day, { ground: "sand", hills: "sand" }));
  tree(S, 960, 690, 1.1, { name: "green" });
  const A = person(S, 380, GN, "near", 4, { mood: "smile", look: 7 }), B = person(S, 600, GN, "near", 6, { mood: "smile", look: 7 });
  A.face(W(104, 12), "happy", 7); B.face(W(104, 12), "happy", 7);
  const E1 = person(S, 1250, GN, "near", 7, { outfitC: DS.c("navy"), look: 6 }), E2 = person(S, 1500, GN, "near", 1, { outfitC: DS.c("gray", 2), look: -6 });
  tophat(S, E1, S.start);
  lean(E1, W(104, 10), 12); lean(E2, W(104, 10), -12); heart(S, 1375, 520, 0.6, { t: W(104, 10) + 0.3 });
  say(S, 300, 420, 120, 70, 360, 560, ["HA!"], W(104, 12)); say(S, 700, 400, 120, 70, 620, 560, ["HA HA!"], W(104, 12) + 0.2, { size: DS.type.caption });
  DS.card(S, "THONGA, SOUTHERN AFRICA", 520, 150, { size: DS.type.small, t: W(104, 2) });
  DS.card(S, "THEY LAUGHED", 1375, 150, { size: DS.type.body, t: W(104, 12) });
  DS.vignette(S); }

// "Look at these people. They eat each other's saliva and dirt."
{ const S = sc(105, 0, { cam: "push", focus: "1080 480" }); DS.outdoor(S, Object.assign({}, OUT.day, { ground: "sand", hills: "sand" }));
  [[250, 4], [430, 6]].forEach(([x, i]) => person(S, x, GN, "near", i, { s: 0.95, mood: "happy", look: 7 }));
  quote(S, 1100, 450, ["LOOK AT THESE PEOPLE.", "THEY EAT EACH OTHER'S", "SALIVA AND DIRT."], "H. A. JUNOD, 1927", { t: W(105, 0), ts: [W(105, 0), W(105, 4), W(105, 8)] });
  DS.vignette(S); }

// In Melanesia, the Trobriand Islanders reportedly called kissing / "a rather insipid and silly form of amusement."
{ const S = sc(106, 0, { cam: "push", focus: "1000 520" }); DS.outdoor(S, { hy: 560, sky: "sky", sun: [1650, 160], hills: "sky", ground: "sky" });
  DS.shape(S, rect(-200, 540, 2320, 760), "blue", { tone: 1, flat: true, w: "hair" });
  [[700, 600], [1300, 640]].forEach(([y, w]) => S.draw(line([300, y], [300 + w, y], 0), S.start, 0, { c: DS.P.white[0], w: DS.w.detail, op: 0.6 }));
  DS.shape(S, smooth([[-200, 1100], [-100, 820], [300, 760], [800, 770], [1100, 840], [1200, 1100]]) + " Z", "sand", {});
  palmTree(S, 220, 820, 1.1); palmTree(S, 960, 860, 0.9);
  const A = person(S, 480, 950, "near", 3, { mood: "tired", look: 6, outfit: "tunic", outfitC: DS.c("orange") }), B = person(S, 700, 950, "near", 0, { mood: "flat", look: 6, outfit: "tunic", outfitC: DS.c("green") });
  A.face(W(107, 2), "tired", 6); B.face(W(107, 4), "smile", 6);
  quote(S, 1320, 420, ["A RATHER INSIPID AND", "SILLY FORM OF AMUSEMENT."], "REPORTED", { t: W(107, 0), ts: [W(107, 0), W(107, 4)] });
  DS.card(S, "TROBRIAND ISLANDS, MELANESIA", 960, 110, { size: DS.type.small, t: W(106, 1) });
  DS.vignette(S); }

// And remember Darwin's kissing chimps? On the very next page, he wrote this.
{ const S = sc(108, 0, { cam: "push", focus: "1260 560" }); DS.room(S, ROOM.office);
  spread(S, 960, 560, 1300, 700, { name: "green" });
  apePair(S, 640, 680, 0.5);
  txt(S, "213", 640, 880, { c: DS.c("gray", 2) }); txt(S, "214", 1280, 880, { c: DS.c("gray", 2) });
  lines(S, 1040, 290, 480, 8, S.start, 62);
  S.arrow(860, 420, 1100, 420, W(108, 8), 0, { c: DS.c("red"), w: DS.w.near, bend: -0.3 });
  DS.card(S, "DARWIN'S KISSING CHIMPS", 640, 330, { size: DS.type.small, t: W(108, 2) });
  DS.card(S, "THE VERY NEXT PAGE", 1280, 760, { size: DS.type.small, t: W(108, 6), tc: "red" });
  DS.vignette(S); }

// "We Europeans are so accustomed to kissing / that it might be thought to be innate in mankind, / but this is not the case."
{ const S = sc(109, 0, { cam: "push", focus: "960 520" }); DS.room(S, ROOM.office);
  quote(S, 960, 470, ["WE EUROPEANS ARE SO", "ACCUSTOMED TO KISSING", "THAT IT MIGHT BE THOUGHT", "TO BE INNATE IN MANKIND,", "BUT THIS IS NOT THE CASE."], "CHARLES DARWIN, 1872", { t: W(109, 0), ts: [W(109, 0), W(109, 4), W(110, 0), W(110, 4), W(111, 0)] });
  S.draw(line([590, 604], [1360, 600], 0), W(111, 3), 0, { c: DS.c("red"), w: DS.w.near });
  DS.vignette(S); }

// Here's what everyone missed. Who writes on clay tablets? / Cities, with kings, priests and scribes.
{ const S = sc(112, 0, { cam: "push", focus: "1100 560" }); DS.outdoor(S, OUT.desert);
  ziggurat(S, 1300, 690, 0.9, { t: W(113, 0) });
  mudHouse(S, 640, 700, 240, 180, { layer: "far", t: W(113, 0) }); mudHouse(S, 1640, 700, 220, 170, { layer: "far", t: W(113, 0) });
  tablet(S, 320, 560, 280, 320, { t: W(112, 4), gap: 60 }); S.text("?", 320, 600, { size: DS.type.display, t: W(112, 4), c: DS.c("ink") });
  const K = person(S, 840, GN, "near", 0, { outfit: "tunic", outfitC: DS.c("purple", 2), mood: "flat", look: -4, t: W(113, 2) }); crown(S, K.hd[0], K.hd[1] - K.r * 1.05, K.s, { t: W(113, 2), parent: K.g });
  const Pr = person(S, 1120, GN, "near", 3, { outfit: "tunic", outfitC: DS.c("white"), mood: "flat", look: -4, t: W(113, 3) }); tallhat(S, Pr, W(113, 3));
  const Sc = person(S, 1400, GN, "near", 2, { pose: "hold", outfit: "tunic", outfitC: DS.c("earth"), mood: "flat", look: -6, t: W(113, 5) }); const [hx, hy] = Sc.hand("R"); tablet(S, hx, hy - 30, 110, 90, { t: W(113, 5) });
  plate(S, 840, 450, "KING", W(113, 2)); plate(S, 1120, 450, "PRIEST", W(113, 3)); plate(S, 1400, 450, "SCRIBE", W(113, 5));
  DS.card(S, "WHO WRITES ON CLAY TABLETS?", 760, 130, { size: DS.type.small, t: W(112, 4) });
  DS.card(S, "CITIES", 1600, 260, { size: DS.type.body, t: W(113, 0) });
  DS.vignette(S); }

// And Jankowiak found that the more social classes a society had, the more likely it was to kiss.
{ const S = sc(114, 0, { cam: "push", focus: "960 540" }); DS.room(S, ROOM.board);
  wboard(S, 300, 190, 1320, 700);
  S.arrow(440, 780, 1520, 780, S.start, 0, { c: DS.c("gray", 2), w: DS.w.mid, bend: 0 }); S.arrow(440, 780, 440, 260, S.start, 0, { c: DS.c("gray", 2), w: DS.w.mid, bend: 0 });
  txt(S, "SOCIAL CLASSES", 980, 840, { size: DS.type.small }); txt(S, "KISSING", 560, 280, { size: DS.type.small });
  const pts = [[560, 720], [790, 650], [1020, 560], [1250, 450], [1440, 330]];
  pts.forEach(([x, y], i) => { const t = W(114, 6) + i * 0.3; for (let j = 0; j <= i; j++) DS.shape(S, rect(x - 40 + j * 4, 760 - (j + 1) * 16, 80 - j * 8, 14), "gray", { t, flat: true, w: "hair", tone: 1 }); heart(S, x, y, 0.42 + i * 0.06, { t: W(114, 12) + i * 0.15, name: "red" }); });
  S.draw(smooth(pts), W(114, 12), 0, { c: DS.c("red", 1), w: DS.w.mid });
  DS.card(S, "THE MORE CLASSES, THE MORE KISSING", 960, 110, { size: DS.type.small, t: W(114, 11) });
  DS.vignette(S); }

// So the oldest tablets were written by exactly the kind of people who kiss.
{ const S = sc(115, 0, { cam: "push", focus: "960 560" }); DS.outdoor(S, OUT.desert);
  ziggurat(S, 1420, 690, 0.8);
  const Sc = person(S, 560, GN, "near", 2, { pose: "hold", outfit: "tunic", outfitC: DS.c("earth"), mood: "smile", look: 6 }); const [hx, hy] = Sc.hand("R"); tablet(S, hx, hy - 40, 150, 120);
  S.text("=", 960, 640, { size: DS.type.display, t: W(115, 5), c: DS.c("ink") });
  hearts(S, 1420, 330, W(115, 12), 3, 0.8);
  DS.card(S, "THE OLDEST TABLETS", 560, 150, { size: DS.type.body, t: W(115, 2) });
  DS.card(S, "WRITTEN BY KISSERS", 1420, 150, { size: DS.type.body, t: W(115, 11), tc: "red" });
  DS.vignette(S); }

// So, why do humans kiss? Partly because the urge to press close is ancient.
{ const S = sc(116, 0, { cam: "zoom", focus: "960 640" }); DS.outdoor(S, OUT.day);
  tree(S, 260, 700, 1.1); tree(S, 1680, 690, 1.0);
  apePair(S, 960, GN, 1.0);
  heart(S, 960, 560, 0.8, { t: W(116, 10), name: "pink" });
  DS.card(S, "WHY DO HUMANS KISS?", 960, 130, { size: DS.type.title, t: W(116, 1) });
  DS.card(S, "THE URGE TO PRESS CLOSE", 960, 280, { size: DS.type.small, t: W(116, 7) });
  DS.card(S, "ANCIENT", 1480, 520, { size: DS.type.body, t: W(116, 13), tc: "red" });
  DS.vignette(S); }

// Apes kiss to make up. Parents almost everywhere kiss their children.
{ const S = sc(117, 0, { cam: "push", focus: "960 600" }); DS.outdoor(S, OUT.day);
  apePair(S, 520, GN, 0.8, { t: W(117, 0) });
  const P = kneelS(S, 1300, GN, 1, 1, 1.1, { look: 8, t: W(117, 5) }), C = person(S, 1420, GN, "near", 5, { s: 0.68, mood: "happy", look: -6, t: W(117, 5) });
  lean(P, W(117, 8), 10, 0.5); heart(S, 1385, 600, 0.6, { t: W(117, 8) + 0.4 });
  DS.card(S, "APES MAKE UP", 520, 300, { size: DS.type.body, t: W(117, 0) });
  DS.card(S, "PARENTS, ALMOST EVERYWHERE", 1300, 200, { size: DS.type.small, t: W(117, 5) });
  DS.vignette(S); }

// But the romantic kiss looks like a habit about half the world's cultures picked up, / and the other half never bothered with.
{ const S = sc(118, 0, { cam: "push", focus: "960 560" }); space(S, DS.outdoor(S, SPACE));
  const R = 320; earth(S, 960, 560, R);
  const dl = S.draw(line([960, 220], [960, 900], 0), W(118, 9), 0, { c: DS.P.white[0], w: DS.w.mid }); dash(dl, 18, 14);
  [[-0.7, -0.3], [-0.45, -0.6], [-0.2, -0.75], [-0.75, 0.15], [-0.5, 0.0], [-0.25, -0.3], [-0.5, 0.45], [-0.2, 0.25], [-0.25, 0.7]].forEach(([a, b], i) => heart(S, 960 + a * R, 560 + b * R, 0.5, { t: W(118, 13) + i * 0.1 }));
  DS.card(S, "A HABIT", 960, 120, { size: DS.type.body, t: W(118, 7) });
  DS.card(S, "HALF PICKED IT UP", 420, 860, { size: DS.type.small, t: W(118, 13), tc: "red" });
  DS.card(S, "HALF NEVER BOTHERED", 1500, 860, { size: DS.type.small, t: W(119, 4) });
  DS.vignette(S); }

// ===================== 8. The other half was fine =====================
// Here's the part that should help Dave. The other half was fine.
{ const S = sc(120, 0, { cam: "zoom", focus: "940 800" }); DS.room(S, ROOMX.den);
  plan(S, { ans: [[0, "21–17M years"], [1, "2500 BC"], [2, "a taste test!"], [3, "right (2 in 3)", S.start + 0.2]], no: W(120, 10) });
  S.text("yes!", 990, PY(4), { size: DS.type.title, font: "caveat", anchor: "start", c: DS.c("red", 2) });
  S.draw(line([980, PY(4) - 24], [1140, PY(4) - 30], 0), W(120, 7), 0, { c: DS.c("ink"), w: DS.w.near });
  S.text("46%", 1170, PY(4), { size: DS.type.title, font: "caveat", anchor: "start", c: PEN, t: W(120, 8) });
  DS.vignette(S); }

// Back in nineteen ninety-two, Jankowiak and Edward Fischer checked a hundred and sixty-six cultures for romantic love itself,
const grid166 = (S, o = {}) => { wboard(S, 900, 190, 860, 660); return dotGrid(S, 1330, 520, 166, 14, 40, 14, o); };
{ const S = sc(121, 0, { cam: "push", focus: "1000 520" }); DS.room(S, ROOM.board);
  names(S, 470, 430, ["WILLIAM JANKOWIAK", "EDWARD FISCHER"], [W(121, 4), W(121, 6)]);
  grid166(S, { t: W(121, 12) });
  DS.card(S, "1992", 470, 220, { size: DS.type.body, t: W(121, 2) });
  DS.card(S, "166 CULTURES", 1330, 120, { size: DS.type.body, t: W(121, 12) });
  DS.card(S, "ROMANTIC LOVE", 470, 640, { size: DS.type.body, t: W(121, 15) });
  DS.vignette(S); }

// love songs, love stories, the agony of a crush.
{ const S = sc(122, 0, { cam: "push", focus: "960 520" }); DS.room(S, ROOM.board);
  tile(S, 420, 480, "LOVE SONGS", W(122, 0), (x, y) => { note(S, x - 20, y, 1.1, W(122, 0)); heart(S, x + 80, y - 70, 0.5, { t: W(122, 0) }); }, { tw: 440, th: 420 });
  tile(S, 960, 480, "LOVE STORIES", W(122, 2), (x, y) => { book(S, x, y, 170, 230, [], { name: "red", t: W(122, 2) }); heart(S, x + 8, y, 0.8, { t: W(122, 2), name: "pink" }); }, { tw: 440, th: 420 });
  tile(S, 1500, 480, "AGONY OF A CRUSH", W(122, 5), (x, y) => { heart(S, x, y, 1.6, { t: W(122, 5), name: "pink" }); S.draw(poly([[x - 6, y - 52], [x + 10, y - 20], [x - 10, y + 6], [x + 6, y + 40]], 0), W(122, 5), 0, { c: DS.c("ink"), w: DS.w.mid }); sweat(S, x + 80, y - 60, W(122, 5)); }, { tw: 440, th: 420 });
  DS.vignette(S); }

// They found it in a hundred and forty-seven. Love, nearly everywhere. / The kiss, in less than half.
{ const S = sc(123, 0, { cam: "push", focus: "1000 520" }); DS.room(S, ROOM.board);
  grid166(S, { fills: [[147, W(123, 3), 1.6, "gold"]] });
  DS.card(S, "147 OF 166", 470, 330, { size: DS.type.title, t: W(123, 7) });
  DS.card(S, "LOVE: NEARLY EVERYWHERE", 470, 490, { size: DS.type.small, t: W(123, 8) });
  DS.card(S, "THE KISS: LESS THAN HALF", 470, 640, { size: DS.type.small, t: W(124, 1), tc: "red" });
  DS.vignette(S); }

// So plenty of couples seem to have fallen in love without a single romantic kiss.
{ const S = sc(125, 0, { cam: "push", focus: "960 600" }); DS.outdoor(S, OUT.dusk);
  tree(S, 280, 700, 1.2); tree(S, 1760, 690, 0.9);
  bench(S, 1260, 1640, 820, { layer: "mid" });
  const mt = 820 - 140; who(S, 1360, mt + 9, "mid", { sit: true, hair: "curly", hairC: DS.c("ink", 0, "mid"), outfitC: DS.c("green", 0, "mid"), mood: "smile", look: 6, float: true }); who(S, 1500, mt + 9, "mid", { sit: true, hair: "bun", hairC: DS.c("brown", 0, "mid"), outfitC: DS.c("orange", 0, "mid"), mood: "smile", look: -6, float: true });
  heart(S, 1450, 420, 0.5, { t: W(125, 9) });
  bench(S, 560, 1160, GN);
  const top = GN - 140;
  const A = who(S, 700, top + 11, "near", { sit: true, hair: "short", hairC: DS.c("gray", 2), outfitC: DS.c("red", 0), armR: [[34, 50], [70, 84]], mood: "smile", look: 6, float: true });
  const B = who(S, 900, top + 11, "near", { sit: true, hair: "bun", hairC: DS.c("gray", 1), outfitC: DS.c("gold"), armL: [[-34, 50], [-70, 84]], mood: "smile", look: -6, float: true });
  hearts(S, 800, 440, W(125, 9), 3, 0.55);
  DS.card(S, "FALLEN IN LOVE", 800, 150, { size: DS.type.body, t: W(125, 7) });
  DS.card(S, "WITHOUT A ROMANTIC KISS", 1450, 230, { size: DS.type.small, t: W(125, 11) });
  DS.vignette(S); }

// They had other gestures, like the Maori hongi, a gentle pressing of noses.
{ const S = sc(126, 0, { cam: "push", focus: "960 600" }); DS.outdoor(S, Object.assign({}, OUT.day, { hills: "green" }));
  const A = person(S, 840, GN, "near", 2, { mood: "smile", look: 8 }), B = person(S, 1090, GN, "near", 6, { mood: "smile", look: -8 });
  lean(A, W(126, 9), 12); lean(B, W(126, 9), -12);
  A.face(W(126, 10), "sleep", 8); B.face(W(126, 10), "sleep", -8);
  DS.card(S, "OTHER GESTURES", 520, 300, { size: DS.type.small, t: W(126, 2) });
  DS.card(S, "MĀORI HONGI", 960, 140, { size: DS.type.body, t: W(126, 6) });
  DS.card(S, "A GENTLE PRESSING OF NOSES", 1420, 300, { size: DS.type.small, t: W(126, 9) });
  DS.vignette(S); }

// Friday. The front door. Dave has a fist bump, a handshake and a right turn ready.
{ const S = sc(127, 0, { cam: "push", focus: "1000 600" }); doorstep(S, { sky: "dusk", sun: [300, 260] });
  const F = dave(S, 840, GN, "near", { mood: "worried", look: 7 });
  date(S, 1260, GN, "near", { mood: "smile", look: -6, t: W(127, 2) });
  S.thought(580, 290, 380, 170, 800, 560, W(127, 4), 0.3);
  [["FIST BUMP", W(127, 7)], ["HANDSHAKE", W(127, 10)], ["RIGHT TURN", W(127, 13)]].forEach(([str, t], i) => { const y = 226 + i * 70; S.text(str, 430, y + 18, { size: DS.type.small, anchor: "start", t, c: DS.c("ink") }); tick(S, 810, y, 0.8, t); });
  DS.card(S, "FRIDAY", 1500, 120, { size: DS.type.title, t: W(127, 0) });
  DS.vignette(S); }

// His date looks at Dave's outstretched hand, / shakes it, and then kisses him on the cheek anyway.
{ const S = sc(128, 0, { cam: "push", focus: "980 600" }); doorstep(S, { sky: "dusk", sun: [300, 260] });
  const F = dave(S, 880, GN, "near", { pose: "reach", mood: "worried", look: 7 });
  const m = mitt(S, F, "R");
  const D = date(S, 1220, GN, "near", { mood: "smile", look: -6 });
  D.face(W(128, 2), "flat", -8);
  D.setPose(W(129, 0), null, [[[-62, 2], [-134, -4]], [[28, 52], [48, 100]]]);
  D.face(W(129, 0), "smile", -8);
  const t2 = W(129, 2) + 0.15;
  F.setPose(t2, "stand"); S.fadeOut(m, t2, 0.2); D.setPose(t2, "stand");
  D.walk(t2, 0.45, { x: -150 }); S.move(D.all.firstChild, t2, 0.45, { x: -150 }, "none");
  lean(D, W(129, 4), -15, 0.4);
  hearts(S, 935, 530, W(129, 4) + 0.3, 3, 0.55);
  F.face(W(129, 5), "happy", 8);
  DS.card(S, "A HANDSHAKE...", 520, 150, { size: DS.type.body, t: W(128, 5) });
  DS.card(S, "...THEN A CHEEK KISS", 1340, 150, { size: DS.type.body, t: W(129, 4), tc: "red" });
  DS.vignette(S); }

// Dave turns right, like two in three kissing couples. / Not because he has to. Because he'd like to.
{ const S = sc(130, 0, { cam: "push", focus: "960 560" }); doorstep(S, { sky: "dusk", sun: [300, 260] });
  const F = dave(S, 820, GN, "near", { s: 1.3, mood: "happy", look: 8 });
  const D = date(S, 1110, GN, "near", { s: 1.24, mood: "happy", look: -8 });
  lean(F, W(130, 1), 12, 0.5);
  S.arrow(700, 400, 900, 400, W(130, 1), 0, { c: DS.c("red"), w: DS.w.near, bend: -0.3 });
  hearts(S, 965, 420, W(131, 5), 3, 0.6);
  DS.card(S, "RIGHT, LIKE 2 IN 3", 960, 120, { size: DS.type.body, t: W(130, 2) });
  DS.card(S, "NOT BECAUSE HE HAS TO", 470, 280, { size: DS.type.small, t: W(131, 0) });
  DS.card(S, "BECAUSE HE'D LIKE TO", 1450, 280, { size: DS.type.small, t: W(131, 5), tc: "red" });
  DS.vignette(S); }

// Half the cultures on Earth would have stopped at the handshake, / and everyone would have been fine.
{ const S = sc(132, 0, { cam: "pull", focus: "960 560" }); space(S, DS.outdoor(S, SPACE));
  const R = 320; earth(S, 960, 560, R);
  const dl = S.draw(line([960, 220], [960, 900], 0), S.start, 0, { c: DS.P.white[0], w: DS.w.mid }); dash(dl, 18, 14);
  [[-0.7, -0.3], [-0.45, -0.6], [-0.2, -0.75], [-0.75, 0.15], [-0.5, 0.0], [-0.25, -0.3], [-0.5, 0.45], [-0.2, 0.25], [-0.25, 0.7]].forEach(([a, b]) => heart(S, 960 + a * R, 560 + b * R, 0.5));
  [[0.3, -0.6], [0.6, -0.35], [0.3, -0.1], [0.65, 0.1], [0.35, 0.4], [0.55, 0.6]].forEach(([a, b], i) => { if (i % 2 === 0) greet(S, 960 + a * R + 20, 560 + b * R + 50, 0.2, "shake", { t: W(132, 10) + i * 0.1, i }); });
  [[0.3, -0.6], [0.6, -0.35], [0.3, -0.1], [0.65, 0.1], [0.35, 0.4], [0.55, 0.6], [-0.7, -0.3], [-0.2, 0.25]].forEach(([a, b], i) => tick(S, 960 + a * R + 40, 560 + b * R - 40, 0.7, W(133, 5) + i * 0.06));
  DS.card(S, "HALF THE CULTURES ON EARTH", 420, 860, { size: DS.type.caption, t: W(132, 1) });
  DS.card(S, "STOPPED AT THE HANDSHAKE", 1480, 860, { size: DS.type.caption, t: W(132, 7) });
  DS.card(S, "EVERYONE: FINE", 960, 120, { size: DS.type.body, t: W(133, 5), tc: "green" });
  DS.vignette(S); }

// Dave didn't stop. That's fine too.
{ const S = sc(134, 0, { cam: "pull", focus: "1000 600" }); doorstep(S, { sky: "dusk", sun: [300, 260] });
  const F = dave(S, 860, GN, "near", { pose: "hold", mood: "happy", look: 8 });
  const [hx, hy] = F.hand("R"); const cb = clipb(S, hx - 6, hy - 50, 0.75); S.fadeOut(cb, W(134, 1), 0.3);
  const cb2 = clipb(S, 1430, 880, 0.6, { t: W(134, 1) + 0.2 }); cb2.setAttribute("transform", "rotate(-72 1430 880)");
  F.setPose(W(134, 1), "stand");
  date(S, 1060, GN, "near", { mood: "happy", look: -8 });
  hearts(S, 960, 500, W(134, 3), 3, 0.6);
  DS.card(S, "THAT'S FINE TOO", 960, 150, { size: DS.type.title, t: W(134, 3) });
  DS.vignette(S); }
