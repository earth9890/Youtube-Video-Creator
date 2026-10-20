// look: still
// The Hawthorne Effect (~8:19). Mystery: does being watched change what we do, and which Dave is the real one? Illustrated stills, progressive changes on the spoken word.
// Runner: "the line" (an output chart): Dave's 11-second spike on his office whiteboard -> the lighting tests -> the relay room (the paper tape becomes the line) -> the eyes banner's zig-zag -> weekly bumps in the re-analysis -> hallway x3 vs patient rooms flat -> Dave's line, nobody counting.
// Runner object: Dave's paper eyes, taped to his monitor (scene 62), gone at night (scene 87).
// Real people (Edison, Mayo, Landsberger, Bateson, Levitt, List, McCambridge, Zajac) are name cards on generic figures, never likenesses.
// 1920s scenes are warm (sand / dusk / wood); Dave's office and the modern studies are cool (glass / gray).

// ---------- people ----------
const T0 = (S) => Math.max(0, S.start - 0.6); // static text pops in under the crossfade, so carried-over labels never blink
const txt = (S, s, x, y, o = {}) => S.text(s, x, y, Object.assign({ size: DS.type.caption, c: DS.c("ink") }, o, { t: o.t ?? T0(S) }));
// a figure on a depth plane; shadow and body share one group (F.all) so they fade and move together. o.gs = shadow y
const who = (S, x, gy, layer = "near", o = {}) => {
  const s = (o.s || 1.1) * DS.depth[layer].s, g = o.parent || S.grp();
  DS.shadow(S, x, o.gs ?? gy, 150 * s, { t: o.t, parent: g });
  const F = S.fig(x, gy, Object.assign({ hair: "short", outfit: "tee" }, o, { s, parent: g, w: DS.w[DS.depth[layer].w] * 1.3 * Math.sqrt(s) })).draw(o.t ?? S.start, 0.4);
  F.face(o.t ?? S.start, o.mood || "flat", o.look || 0);
  F.all = g; F.look = o.look || 0;
  if (o.tieC) tie(S, F, o.tieC);
  if (o.specs) specs(S, F);
  return F;
};
const tie = (S, F, name) => { const k = F.s, x = F.cx, y = F.sh[1] + 4 * k; DS.shape(S, `M${x - 7 * k} ${y} L${x + 7 * k} ${y} L${x + 10 * k} ${y + 54 * k} L${x} ${y + 68 * k} L${x - 10 * k} ${y + 54 * k} Z`, name, { w: "hair", flat: true, parent: F.g }); };
const specs = (S, F) => { const R = F.r, x = F.hd[0] + F.look * F.s * 0.8, y = F.hd[1] - 0.08 * R; S.draw(circ(x - 0.34 * R, y, 0.3 * R) + " " + circ(x + 0.34 * R, y, 0.3 * R) + " " + line([x - 0.05 * R, y], [x + 0.05 * R, y], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.detail, parent: F.g }); };
const sweat = (S, F, t) => S.fill(`M${F.hd[0] + F.r * 0.95} ${F.hd[1] - F.r * 0.55} Q${F.hd[0] + F.r * 1.2} ${F.hd[1] - F.r * 0.1} ${F.hd[0] + F.r * 0.95} ${F.hd[1] - F.r * 0.05} Q${F.hd[0] + F.r * 0.72} ${F.hd[1] - F.r * 0.1} ${F.hd[0] + F.r * 0.95} ${F.hd[1] - F.r * 0.55} Z`, t ?? S.start, 0, DS.c("sky", 2), 1, F.g);
const DAVE = { s: 1.1, hair: "side", hairC: DS.c("brown"), outfitC: DS.c("blue") };
const dave = (S, x, gy, layer = "near", o = {}) => who(S, x, gy, layer, Object.assign({}, DAVE, o));
const TYPE = { armL: [[-30, 44], [-14, 64]], armR: [[30, 44], [16, 62]] }; // seated, hands on the keyboard
// seated behind a desk or bench (drawn after it, so it hides the legs); make = who | dave | a closure
const seated = (S, x, top, layer, o = {}, make = who) => make(S, x, top + 46 * (o.s || 1.1) * DS.depth[layer].s, layer, Object.assign({ sit: true, pose: "hold" }, o));
// the five relay assemblers keep their colours all episode (no blue: blue is Dave's)
const WC = ["purple", "green", "orange", "pink", "gold", "sand", "navy"], WH = [["brown", 0], ["ink", 0], ["earth", 2], ["brown", 2], ["ink", 1], ["earth", 0], ["ink", 0]];
const woman = (S, x, gy, layer, i, o = {}) => who(S, x, gy, layer, Object.assign({ s: 1.05, hair: "bun", hairC: DS.c(WH[i][0], WH[i][1]), outfitC: DS.c(WC[i]), mood: "flat" }, o));
// lighting-test workers (other departments): muted colours
const LC = ["earth", "grass", "gray", "dusk", "wood"];
const worker = (S, x, gy, layer, i, o = {}) => who(S, x, gy, layer, Object.assign({ s: 1.05, hair: ["bun", "curly", "bun", "side", "bun"][i % 5], hairC: DS.c(["brown", "ink", "earth", "brown", "ink"][i % 5], i % 2 ? 0 : 2), outfitC: DS.c(LC[i % 5], i % 5 === 2 ? 1 : 0), mood: "flat" }, o));
const man = (S, x, gy, layer, i, o = {}) => who(S, x, gy, layer, Object.assign({ s: 1.1, hair: ["short", "side"][i % 2], hairC: DS.c(["ink", "brown", "gray", "earth"][i % 4], i % 4 === 2 ? 1 : 0), outfitC: DS.c(["gray", "navy", "brown", "earth"][i % 4], i % 4 === 0 ? 2 : 0), tieC: ["gold", "purple", "green", "orange"][i % 4], mood: "flat" }, o));
const BOSS = { s: 1.1, hair: "short", hairC: DS.c("ink", 1), outfitC: DS.c("gray", 2), tieC: "purple" };
const OBS = { s: 1.1, hair: "side", hairC: DS.c("brown", 2), outfitC: DS.c("earth"), tieC: "green", specs: true }; // the test-room observer
const ENG = { s: 1.1, hair: "side", hairC: DS.c("ink"), outfitC: DS.c("white", 2), tieC: "navy" }; // lighting engineer
const MAYO = { s: 1.1, hair: "short", hairC: DS.c("gray", 1), outfitC: DS.c("navy"), tieC: "gold" };
const EDISON = { s: 1.1, hair: "messy", hairC: DS.c("white", 2), outfitC: DS.c("gray", 2), tieC: "purple" };
const LANDS = { s: 1.1, hair: "side", hairC: DS.c("gray", 2), outfitC: DS.c("brown"), tieC: "gold", specs: true };
const BATESON = { s: 1.05, hair: "curly", hairC: DS.c("brown", 2), outfitC: DS.c("green") };
const LEVITT = { s: 1.1, hair: "short", hairC: DS.c("brown"), outfitC: DS.c("navy"), tieC: "gold" };
const LIST = { s: 1.1, hair: "side", hairC: DS.c("ink"), outfitC: DS.c("gray", 2), tieC: "green" };
const MCCAM = { s: 1.1, hair: "short", hairC: DS.c("gray", 1), outfitC: DS.c("purple"), specs: true };
const HIST = { s: 1.05, hair: "bun", hairC: DS.c("gray", 2), outfitC: DS.c("orange"), specs: true };
const ZAJAC = { s: 1.05, hair: "bun", hairC: DS.c("gray", 1), outfitC: DS.c("purple"), specs: true };
const ringFig = (S, F, t, name = "red") => S.draw(circ(F.cx, F.hd[1] + F.r * 2.4, F.r * 2.6, F.r * 4.2), t, 0, { c: DS.c(name), w: DS.w.near });

// ---------- generic bits ----------
const desk = (S, x0, x1, top, gy = 960, name = "wood") => { DS.shadow(S, (x0 + x1) / 2, gy, x1 - x0 + 60); DS.shape(S, rect(x0 + 24, top + 20, x1 - x0 - 48, gy - top - 20), name, { tone: 2 }); DS.shape(S, rrect(x0, top, x1 - x0, 28, DS.r.xs), name); };
const paperR = (S, x, y, wd, ht, o = {}) => { DS.drop(S, rect(x + 6, y + 8, wd, ht), { t: o.t, parent: o.parent }); DS.shape(S, rect(x, y, wd, ht), o.name || "white", { t: o.t, w: "detail", flat: true, parent: o.parent }); };
const lines = (S, x, y, wd, n, t, gap = 36, parent) => { for (let i = 0; i < n; i++) S.draw(line([x, y + i * gap], [x + (i === n - 1 ? wd * 0.6 : wd), y + i * gap], 0), t ?? S.start, 0, { c: DS.c("gray", 1), w: DS.w.detail, parent }); };
const panel = (S, cx, cy, wd, ht, t, name = "white") => { const g = S.grp(); DS.drop(S, rrect(cx - wd / 2 + 8, cy - ht / 2 + 12, wd, ht, DS.r.md), { t, parent: g }); DS.shape(S, rrect(cx - wd / 2, cy - ht / 2, wd, ht, DS.r.md), name, { t, flat: true, w: "detail", parent: g }); return g; };
const say = (S, cx, cy, rx, ry, tx, ty, strs, t, o = {}) => {
  const g = S.grp(); (o.think ? S.thought : S.speech)(cx, cy, rx, ry, tx, ty, t, 0.3, { parent: g });
  const size = o.size || DS.type.small, n = strs.length;
  strs.forEach((s, i) => S.text(s, cx, cy + size * 0.36 + (i - (n - 1) / 2) * size * 1.2, { size, t: t ?? T0(S), c: o.c ? DS.c(o.c, 2) : DS.c("ink"), parent: g }));
  if (t > S.start + 0.05) tl.fromTo(g, { opacity: 0 }, { opacity: 1, duration: 0.3 }, t);
  return g;
};
const stamp = (S, cx, cy, str, t, name = "red") => {
  const g = S.grp(), wd = str.length * DS.type.small * 0.66 + 60, tf = (k) => `translate(${cx} ${cy}) rotate(-6) scale(${k}) translate(${-cx} ${-cy})`;
  S.draw(rrect(cx - wd / 2, cy - 46, wd, 92, DS.r.sm), S.start, 0, { c: DS.c(name, 2), w: DS.w.near, fill: DS.P.white[0], parent: g });
  S.text(str, cx, cy + 19, { size: DS.type.small, t: T0(S), c: DS.c(name, 2), parent: g });
  tl.fromTo(g, { opacity: 0, attr: { transform: tf(1.4) } }, { opacity: 1, attr: { transform: tf(1) }, duration: 0.25, ease: "power3.in" }, t);
  return g;
};
const tick = (S, x, y, k, t, name = "green") => S.tick(x, y, k, t, 0, { c: DS.c(name), w: DS.w.near });
const xMark = (S, x, y, k, t) => S.cross(x, y, k, t, 0, { c: DS.c("red"), w: DS.w.near });
const arrowR = (S, x1, y1, x2, y2, t, o = {}) => S.arrow(x1, y1, x2, y2, t, 0.3, { c: DS.c(o.c || "ink"), w: DS.w.near, bend: o.bend || 0 });
// tiny doodle person for icons and counts
const mini = (S, x, gy, k, o = {}) => {
  const t = o.t ?? S.start, c = o.c || DS.c("ink"), w = o.w || DS.w.mid, g = S.grp(o.parent);
  S.draw(`M${x} ${gy - 50 * k} L${x} ${gy - 22 * k} M${x - 11 * k} ${gy} L${x} ${gy - 22 * k} L${x + 11 * k} ${gy} M${x - 15 * k} ${gy - 30 * k} L${x} ${gy - 44 * k} L${x + 15 * k} ${gy - 30 * k}`, t, 0, { c, w, parent: g });
  S.draw(circ(x, gy - 63 * k, 13 * k), t, 0, { c, w, fill: o.fill || DS.P.white[0], parent: g });
  if (o.bun) S.fill(circ(x + 2 * k, gy - 80 * k, 6 * k), t, 0, c, 1, g);
  return g;
};
let CP = 0;
const clipTo = (g, d) => { const id = "cp35-" + ++CP, cp = el("clipPath", { id }, dsDefs()); el("path", { d }, cp); g.setAttribute("clip-path", `url(#${id})`); };
const grow = (g, t, x, y, dur = 0.6) => { const tf = (k) => `translate(${x} ${y}) scale(1 ${k}) translate(${-x} ${-y})`; tl.fromTo(g, { attr: { transform: tf(0.02) } }, { attr: { transform: tf(1) }, duration: dur, ease: "power2.out" }, t); };
const bar = (S, x, base, wd, ht, name, t, parent) => { const g = S.grp(parent); DS.shape(S, rect(x, base - ht, wd, ht), name, { dir: "h", parent: g }); if (t > S.start + 0.05) grow(g, t, x, base); return g; };
const wobble = (S, g, cx, cy, t, dur, deg = 4) => { const tf = (a) => `rotate(${a} ${cx} ${cy})`; for (let i = 0, n = Math.floor(dur / 0.5); i < n; i++) tl.fromTo(g, { attr: { transform: tf(i % 2 ? deg : -deg) } }, { attr: { transform: tf(i % 2 ? -deg : deg) }, duration: 0.5, ease: "sine.inOut", immediateRender: false }, t + i * 0.5); };

// ---------- the runner: "the line" ----------
// chart panel: kind "paper" (1920s graph paper on a board) | "board" (whiteboard) | "none" (axes only). P(u, v) maps 0..1 to canvas.
const chart = (S, x, y, wd, ht, o = {}) => {
  const t = o.t, g = S.grp(o.parent), L = o.layer || "near", kind = o.kind || "paper";
  if (kind !== "none") {
    DS.drop(S, rect(x + 8, y + 10, wd, ht), { t, parent: g });
    DS.shape(S, rrect(x, y, wd, ht, DS.r.sm), kind === "paper" ? "wood" : "gray", { t, layer: L, tone: kind === "paper" ? 0 : 1, parent: g });
    DS.shape(S, rect(x + 16, y + 16, wd - 32, ht - 32), kind === "paper" ? "paper" : "white", { t, layer: L, flat: true, w: "detail", parent: g });
  }
  const x0 = x + (o.lpad || 64), x1 = x + wd - 44, y0 = y + (o.title ? 96 : 50), y1 = y + ht - (o.xpad || 52);
  if (kind === "paper") for (let i = 1; i < 6; i++) { const yy = y0 + ((y1 - y0) * i) / 6; S.draw(line([x0, yy], [x1, yy], 0), t ?? S.start, 0, { c: DS.c("earth", 1), w: DS.w.hair, parent: g }); }
  S.draw(`M${x0} ${y0 - 10} V${y1} H${x1 + 10}`, t ?? S.start, 0, { c: o.axisC || DS.c("ink"), w: DS.w.mid, parent: g });
  if (o.title) txt(S, o.title, x + wd / 2, y + 68, { t, parent: g, c: o.axisC || DS.c("ink") });
  return { g, P: (u, v) => [x0 + u * (x1 - x0), y1 - v * (y1 - y0)], x0, y0, x1, y1 };
};
// a path that draws itself on (static when t is at the scene start)
const growD = (S, d, t, dur, o = {}) => {
  if (t === undefined || t <= S.start + 0.05) return S.draw(d, S.start, 0, { c: o.c, w: o.w, parent: o.parent });
  const p = el("path", { d, pathLength: 1, fill: "none", stroke: o.c, "stroke-width": o.w, "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-dasharray": "1 2" }, o.parent || S.g);
  tl.fromTo(p, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: dur, ease: o.ease || "power1.inOut" }, t);
  return p;
};
const plot = (S, C, pts, t, dur = 1, o = {}) => {
  const c = o.c || DS.c("red"), w = o.w || DS.w.near, P = pts.map(([u, v]) => C.P(u, v));
  const p = growD(S, poly(P, 0), t, dur, { c, w, parent: o.parent || C.g });
  if (o.dash) p.setAttribute("stroke-dasharray", o.dash);
  if (o.dot !== false) { const [ex, ey] = P[P.length - 1]; S.fill(circ(ex, ey, w * 1.4), t === undefined ? S.start : t + dur * 0.92, 0, c, 1, o.parent || C.g); }
  return p;
};
const LINE_DAVE = [[0, 0.28], [0.3, 0.28], [0.36, 0.92], [0.56, 0.92], [0.62, 0.28], [1, 0.28]];
const LINE_UP = [[0, 0.18], [0.14, 0.27], [0.28, 0.24], [0.42, 0.4], [0.57, 0.47], [0.71, 0.44], [0.86, 0.6], [1, 0.7]];
const LINE_CTRL = [[0, 0.14], [0.14, 0.22], [0.28, 0.2], [0.42, 0.34], [0.57, 0.39], [0.71, 0.4], [0.86, 0.54], [1, 0.62]];
// light bulb icon; lvl 0..1 = how bright
const bulbI = (S, cx, cy, k, lvl, t, parent) => {
  const g = S.grp(parent);
  if (lvl > 0.05) S.draw(rays(cx, cy - 6 * k, 30 * k, 36 * k + 14 * k * lvl, 8), t ?? S.start, 0, { c: DS.c("gold", 2), w: DS.w.detail, parent: g });
  S.draw(circ(cx, cy - 6 * k, 20 * k), t ?? S.start, 0, { fill: DS.mix(DS.P.gray[1], DS.P.yellow[lvl > 0.6 ? 1 : 0], Math.min(1, lvl * 1.3)), c: DS.line(), w: DS.w.detail, parent: g });
  DS.shape(S, rrect(cx - 9 * k, cy + 12 * k, 18 * k, 14 * k, DS.r.xs), "gray", { t, tone: 2, w: "hair", parent: g });
  return g;
};
// bulbs along a chart's x axis (levels by step), each popping in from t0 + i * dt
const bulbRow = (S, C, lvls, y, t0, dt = 0, k = 0.9) => lvls.map((lv, i) => bulbI(S, C.P((i + 0.5) / lvls.length, 0)[0], y, k, lv, t0 === undefined ? undefined : t0 + i * dt));
const easel = (S, x, y, wd, ht, o = {}) => {
  const gy = o.gy ?? 960;
  DS.shadow(S, x + wd / 2, gy, wd * 0.8);
  [[0.2, 0.06], [0.8, 0.94], [0.5, 0.5]].forEach(([a, b]) => S.draw(line([x + wd * a, y + ht - 20], [x + wd * b, gy], 0), S.start, 0, { c: DS.c("wood", 2), w: DS.w.near }));
  return chart(S, x, y, wd, ht, Object.assign({ kind: "paper" }, o));
};

// ---------- Dave's office ----------
const OFFICE = { wall: "glass", floor: "gray", window: false };
const NIGHT = { wall: "night", floor: "gray", window: false };
const DK = { x: 700, x0: 470, x1: 1330, top: 730, mx: 1060 }; // Dave sits at x; the monitor stands at mx
// back wall: the corridor doorway (left, where the boss walks past) + the whiteboard where Dave's line lives
const office = (S, o = {}) => {
  DS.shape(S, rect(400, 310, 220, 450), "white", { layer: "mid", tone: 2 });
  DS.shape(S, rect(418, 328, 184, 432), o.night ? "navy" : "glass", { layer: "mid", flat: true, tone: o.night ? 2 : 1, w: "detail" });
  if (o.night) { DS.shape(S, rrect(1660, 150, 160, 200, DS.r.xs), "white", { layer: "mid", w: "detail" }); DS.shape(S, rect(1672, 162, 136, 176), "navy", { layer: "mid", flat: true, tone: 2, w: "hair" }); S.fill(circ(1760, 210, 22), S.start, 0, DS.c("yellow", 1), 1); [[1700, 190], [1720, 300], [1790, 280]].forEach(([x, y]) => S.fill(circ(x, y, 4), S.start, 0, DS.P.white[0], 0.9)); }
  return chart(S, 1110, 100, 450, 320, { kind: "board", layer: "mid", title: o.title === undefined ? "DAVE'S SPEED" : o.title });
};
const keyboard = (S, cx, top, wd = 220) => DS.shape(S, rrect(cx - wd / 2, top - 16, wd, 18, DS.r.xs), "gray", { tone: 1, w: "detail" });
const mug = (S, cx, base, k = 1) => { DS.shape(S, rrect(cx - 26 * k, base - 64 * k, 52 * k, 64 * k, DS.r.sm), "yellow", { w: "detail" }); S.draw(arc(cx + 28 * k, base - 34 * k, 16 * k, -80, 80), S.start, 0, { c: DS.c("ink"), w: DS.w.mid }); };
// flat monitor facing the viewer; returns the screen box
const screenAt = (S, cx, base, wd, ht, o = {}) => {
  const t = o.t, x = cx - wd / 2, y = base - 44 - ht;
  DS.shape(S, rect(cx - 16, base - 48, 32, 48), "gray", { t, tone: 2, w: "detail" });
  DS.shape(S, rrect(cx - 80, base - 14, 160, 14, DS.r.xs), "gray", { t, tone: 2, w: "detail" });
  DS.shape(S, rrect(x, y, wd, ht, DS.r.sm), "ink", { t, w: "mid" });
  const B = { x0: x + 16, y0: y + 16, x1: x + wd - 16, y1: y + ht - 16 };
  DS.shape(S, rect(B.x0, B.y0, B.x1 - B.x0, B.y1 - B.y0), o.night ? "navy" : "white", { t, flat: true, w: "hair", tone: o.night ? 1 : 0 });
  return B;
};
const email = (S, B, o = {}) => {
  const g = S.grp(), t = o.t, wd = B.x1 - B.x0, k = (B.y1 - B.y0) / 200;
  DS.shape(S, rect(B.x0, B.y0, wd, 34 * k), "sky", { t, flat: true, w: "hair", parent: g });
  [0.5, 0.82, 0.66, 0.74, 0.4].forEach((f, i) => S.draw(line([B.x0 + 22, B.y0 + (66 + i * 28) * k], [B.x0 + 22 + (wd - 44) * f, B.y0 + (66 + i * 28) * k], 0), o.lineT ? o.lineT + i * 0.25 : t ?? S.start, 0, { c: DS.c("gray"), w: DS.w.mid, parent: g }));
  return g;
};
const sheet = (S, B, o = {}) => {
  const g = S.grp(), t = o.t, wd = B.x1 - B.x0, ht = B.y1 - B.y0, cw = wd / 5, rh = (ht - 30) / 6;
  DS.shape(S, rect(B.x0, B.y0, wd, ht), "white", { t, flat: true, w: "hair", parent: g });
  DS.shape(S, rect(B.x0, B.y0, wd, 30), "green", { t, flat: true, w: "hair", parent: g });
  [[1, 1], [2, 3], [3, 2], [0, 4], [4, 1], [2, 5]].forEach(([c, r]) => S.fill(rect(B.x0 + c * cw + 5, B.y0 + 30 + r * rh + 5, cw - 10, rh - 10), t ?? S.start, 0, DS.c("green", 1), 0.85, g));
  for (let i = 1; i < 5; i++) S.draw(line([B.x0 + i * cw, B.y0 + 30], [B.x0 + i * cw, B.y1], 0), t ?? S.start, 0, { c: DS.c("gray", 1), w: DS.w.hair, parent: g });
  for (let r = 1; r < 6; r++) S.draw(line([B.x0, B.y0 + 30 + r * rh], [B.x1, B.y0 + 30 + r * rh], 0), t ?? S.start, 0, { c: DS.c("gray", 1), w: DS.w.hair, parent: g });
  if (t > S.start + 0.05) tl.fromTo(g, { opacity: 0 }, { opacity: 1, duration: 0.3 }, t);
  return g;
};
// Dave at his desk (wide office): returns { F, B } (figure, screen box)
const daveDesk = (S, o = {}) => {
  const F = seated(S, DK.x, DK.top, "near", Object.assign({ look: 6, mood: "flat" }, TYPE, o.f || {}), dave);
  desk(S, DK.x0, DK.x1, DK.top);
  keyboard(S, DK.x, DK.top);
  mug(S, 1260, DK.top);
  const B = screenAt(S, DK.mx, DK.top, 340, 230, { night: o.night });
  return { F, B };
};
// close-up at the desk: bigger Dave, bigger monitor (scenes 4, 86, 123)
const CU = { x: 470, top: 780, mx: 1240 };
const daveClose = (S, o = {}) => {
  const F = seated(S, CU.x, CU.top, "near", Object.assign({ s: 1.6, mood: "flat", look: 7 }, TYPE, o.f || {}), dave);
  desk(S, 120, 1800, CU.top, 1080); keyboard(S, CU.x, CU.top, 300);
  const B = screenAt(S, CU.mx, CU.top, 740, 470, { night: o.night });
  return { F, B };
};
const deskLamp = (S) => { DS.shape(S, rect(1310, DK.top - 190, 20, 190), "gray", { tone: 2, w: "mid" }); DS.shape(S, `M1250 ${DK.top - 180} L1390 ${DK.top - 180} L1360 ${DK.top - 250} L1280 ${DK.top - 250} Z`, "yellow", { w: "mid" }); };
// shoe prints across the floor, appearing one by one (fade the group for "footsteps fade")
const steps = (S, x0, x1, y, n, t, o = {}) => {
  const g = S.grp(), dt = o.dt ?? 0.16;
  for (let i = 0; i < n; i++) { const x = x0 + (i * (x1 - x0)) / Math.max(1, n - 1), yy = y + (i % 2 ? 26 : 0); S.fill(circ(x, yy, 20, 9) + " " + circ(x - 31, yy, 10, 8), t === undefined ? S.start : t + i * dt, 0, DS.c("ink"), 0.3, g); }
  return g;
};
const boss = (S, x, o = {}) => who(S, x, 800, "mid", Object.assign({}, BOSS, o));
// speed lines by the hands (typing fast)
const fast = (S, x, y, t) => { const g = S.grp(); [[-60, -20], [-70, 4], [-56, 28]].forEach(([dx, dy]) => S.draw(line([x + dx, y + dy], [x + dx - 40, y + dy], 0), t, 0, { c: DS.c("gray", 2), w: DS.w.mid, parent: g })); [[60, -20], [70, 4], [56, 28]].forEach(([dx, dy]) => S.draw(line([x + dx, y + dy], [x + dx + 40, y + dy], 0), t, 0, { c: DS.c("gray", 2), w: DS.w.mid, parent: g })); return g; };

// ---------- the eyes banner (Bateson 2006) and its cousins ----------
const eyesPic = (S, cx, cy, wd, ht, o = {}) => {
  const t = o.t, g = S.grp(o.parent), er = Math.min(wd * 0.15, ht * 0.3);
  if (o.paper !== false) { DS.drop(S, rect(cx - wd / 2 + 6, cy - ht / 2 + 8, wd, ht), { t, parent: g }); DS.shape(S, rect(cx - wd / 2, cy - ht / 2, wd, ht), "white", { t, flat: true, w: "detail", parent: g }); }
  [-1, 1].forEach((sd) => {
    const ex = cx + sd * wd * 0.22, ey = cy + ht * 0.06;
    DS.shape(S, `M${ex - er * 1.5} ${ey} Q${ex} ${ey - er * 1.3} ${ex + er * 1.5} ${ey} Q${ex} ${ey + er * 1.3} ${ex - er * 1.5} ${ey} Z`, "white", { t, flat: true, w: o.paper === false ? "near" : "mid", parent: g });
    DS.shape(S, circ(ex, ey, er * 0.56), "brown", { t, tone: 1, w: "detail", parent: g });
    S.fill(circ(ex, ey, er * 0.28), t ?? S.start, 0, DS.c("ink"), 1, g);
    S.fill(circ(ex - er * 0.16, ey - er * 0.18, er * 0.1), t ?? S.start, 0, DS.P.white[0], 1, g);
    S.draw(smooth([[ex - er * 1.35, ey - er * 0.95], [ex - er * 0.2, ey - er * 1.35], [ex + er * 1.35, ey - er * 1.05]]), t ?? S.start, 0, { c: DS.c("ink"), w: o.paper === false ? DS.w.near * 1.6 : DS.w.near, parent: g });
  });
  if (t > S.start + 0.05) tl.fromTo(g, { opacity: 0 }, { opacity: 1, duration: 0.35 }, t);
  return g;
};
const flowersPic = (S, cx, cy, wd, ht, o = {}) => {
  const t = o.t, g = S.grp(o.parent);
  DS.drop(S, rect(cx - wd / 2 + 6, cy - ht / 2 + 8, wd, ht), { t, parent: g }); DS.shape(S, rect(cx - wd / 2, cy - ht / 2, wd, ht), "white", { t, flat: true, w: "detail", parent: g });
  [[-0.3, "pink"], [0, "yellow"], [0.3, "purple"]].forEach(([dx, n], i) => {
    const fx = cx + dx * wd, fy = cy - ht * 0.08 + (i % 2) * ht * 0.08, r = ht * 0.12;
    S.draw(line([fx, fy], [fx, cy + ht / 2 - 8], 0), t ?? S.start, 0, { c: DS.c("green", 2), w: DS.w.mid, parent: g });
    for (let p = 0; p < 6; p++) { const a = (p * Math.PI) / 3; DS.shape(S, circ(fx + Math.cos(a) * r, fy + Math.sin(a) * r, r * 0.7), n, { t, w: "hair", parent: g }); }
    DS.shape(S, circ(fx, fy, r * 0.6), "gold", { t, w: "hair", parent: g });
  });
  if (t > S.start + 0.05) tl.fromTo(g, { opacity: 0 }, { opacity: 1, duration: 0.35 }, t);
  return g;
};
// tiny week icons under the bars: a pair of eyes / a flower
const eyesI = (S, cx, cy, t) => eyesPic(S, cx, cy, 70, 30, { paper: false, t });
const flowersI = (S, cx, cy, t) => { const g = S.grp(); for (let p = 0; p < 6; p++) { const a = (p * Math.PI) / 3; DS.shape(S, circ(cx + Math.cos(a) * 9, cy + Math.sin(a) * 9, 7), "pink", { t, w: "hair", parent: g }); } DS.shape(S, circ(cx, cy, 6), "gold", { t, w: "hair", parent: g }); if (t > S.start + 0.05) tl.fromTo(g, { opacity: 0 }, { opacity: 1, duration: 0.3 }, t); return g; };
// Dave's paper eyes taped to the top of his monitor (B = screen box)
const paperEyes = (S, B, o = {}) => {
  const cx = (B.x0 + B.x1) / 2, wd = (B.x1 - B.x0) * 0.62, ht = wd * 0.42, cy = B.y0 + ht * 0.32, g = S.grp();
  eyesPic(S, cx, cy, wd, ht, { parent: g });
  [[-1, -14], [1, 14]].forEach(([sd, a]) => { const x = cx + sd * wd * 0.48, y = cy - ht / 2; const tg = S.grp(g); DS.shape(S, rect(x - 26, y - 12, 52, 24), "yellow", { tone: 1, flat: true, w: "hair", op: 0.9, parent: tg }); tg.setAttribute("transform", `rotate(${a} ${x} ${y})`); });
  if (o.t > S.start + 0.05) tl.fromTo(g, { opacity: 0 }, { opacity: 1, duration: 0.35 }, o.t);
  return g;
};

// ---------- 1920s: Hawthorne Works ----------
const WORKS = { hy: 720, sky: "dusk", hills: "earth", ground: "sand", sun: [1690, 150] };
const works = (S) => {
  DS.shape(S, rect(-200, 480, 2320, 260), "earth", { layer: "far", tone: 2, flat: true, w: "far" });
  for (let i = 0; i < 26; i++) S.fill(rect(-170 + i * 90, 520, 44, 60), S.start, 0, DS.c("glass", 2, "far"), 1);
  [[300, 170], [1560, 210], [1660, 250]].forEach(([x, y]) => { DS.shape(S, rect(x, y, 46, 500 - y), "gray", { layer: "far", tone: 2, w: "far" }); [[0, -30, 34], [30, -64, 44], [70, -92, 52]].forEach(([dx, dy, r]) => S.fill(circ(x + 23 + dx, y + dy, r), S.start, 0, DS.c("white", 2, "far"), 0.75)); });
  DS.shape(S, rect(120, 390, 1680, 340), "earth", { layer: "mid", tone: 2, dir: "h" });
  DS.shape(S, rect(100, 370, 1720, 26), "brown", { layer: "mid", w: "detail" });
  for (let r = 0; r < 3; r++) for (let c = 0; c < 22; c++) DS.shape(S, rect(150 + c * 74, 420 + r * 96, 40, 66), "glass", { layer: "mid", tone: 2, flat: true, w: "hair" });
  DS.shape(S, rect(870, 160, 180, 240), "earth", { layer: "mid", tone: 2 });
  DS.shape(S, "M846 168 L960 50 L1074 168 Z", "navy", { layer: "mid" });
  DS.shape(S, circ(960, 236, 36), "white", { layer: "mid", w: "detail" });
  S.draw("M960 236 L960 212 M960 236 L978 244", S.start, 0, { c: DS.c("ink"), w: DS.w.detail });
  [300, 352].forEach((y) => [900, 990].forEach((x) => DS.shape(S, rect(x, y, 30, 36), "glass", { layer: "mid", tone: 2, flat: true, w: "hair" })));
  DS.shape(S, rect(880, 610, 160, 120), "brown", { layer: "mid", tone: 1 });
  DS.shape(S, rect(-200, 740, 2320, 400), "sand", { layer: "near", tone: 0, flat: true, w: "hair" });
};
const candlePhone = (S, cx, base, k = 1, o = {}) => {
  const t = o.t, g = S.grp();
  DS.shadow(S, cx, base, 220 * k, { t, parent: g });
  S.draw(smooth([[cx + 20 * k, base - 20 * k], [cx + 120 * k, base + 6 * k], [cx + 150 * k, base - 120 * k], [cx + 96 * k, base - 200 * k]]), t ?? S.start, 0, { c: DS.c("ink"), w: DS.w.mid, parent: g });
  DS.shape(S, `M${cx - 90 * k} ${base} Q${cx - 86 * k} ${base - 56 * k} ${cx} ${base - 60 * k} Q${cx + 86 * k} ${base - 56 * k} ${cx + 90 * k} ${base} Z`, "ink", { t, parent: g });
  DS.shape(S, rrect(cx - 13 * k, base - 330 * k, 26 * k, 280 * k, DS.r.xs), "ink", { t, w: "detail", parent: g });
  DS.shape(S, `M${cx - 48 * k} ${base - 326 * k} L${cx + 48 * k} ${base - 326 * k} L${cx + 30 * k} ${base - 380 * k} L${cx - 30 * k} ${base - 380 * k} Z`, "ink", { t, parent: g });
  S.draw(line([cx + 13 * k, base - 250 * k], [cx + 70 * k, base - 262 * k], 0), t ?? S.start, 0, { c: DS.c("ink"), w: DS.w.near, parent: g });
  DS.shape(S, rrect(cx + 66 * k, base - 320 * k, 34 * k, 130 * k, DS.r.sm), "ink", { t, w: "detail", parent: g });
  if (t > S.start + 0.05) tl.fromTo(g, { opacity: 0 }, { opacity: 1, duration: 0.35 }, t);
  return g;
};
const switchRack = (S, x, base, wd, ht, o = {}) => {
  const t = o.t, g = S.grp();
  DS.shadow(S, x + wd / 2, base, wd + 40, { t, parent: g });
  DS.shape(S, rrect(x, base - ht, wd, ht, DS.r.sm), "gray", { t, tone: 2, parent: g });
  for (let r = 0; r < 6; r++) for (let c = 0; c < 4; c++) { const cx = x + 40 + c * ((wd - 80) / 3), cy = base - ht + 50 + r * ((ht - 100) / 5); DS.shape(S, rrect(cx - 22, cy - 14, 44, 28, DS.r.xs), "orange", { t, tone: 2, w: "hair", parent: g }); S.fill(circ(cx + 30, cy, 5), t ?? S.start, 0, DS.c("gold", 1), 1, g); }
  if (t > S.start + 0.05) tl.fromTo(g, { opacity: 0 }, { opacity: 1, duration: 0.35 }, t);
  return g;
};
// the site's own hospital, fire brigade and greenhouse (mid plane, base on the ground)
const hospitalB = (S, cx, base, t) => { const g = S.grp(); DS.shadow(S, cx, base, 300, { t, parent: g }); DS.shape(S, rect(cx - 130, base - 190, 260, 190), "white", { t, tone: 2, parent: g }); DS.shape(S, `M${cx - 150} ${base - 186} L${cx} ${base - 260} L${cx + 150} ${base - 186} Z`, "gray", { t, tone: 1, parent: g }); DS.shape(S, rect(cx - 20, base - 160, 40, 110), "red", { t, flat: true, w: "hair", parent: g }); DS.shape(S, rect(cx - 55, base - 125, 110, 40), "red", { t, flat: true, w: "hair", parent: g }); if (t > S.start + 0.05) tl.fromTo(g, { opacity: 0 }, { opacity: 1, duration: 0.35 }, t); };
const fireB = (S, cx, base, t) => { const g = S.grp(); DS.shadow(S, cx, base, 300, { t, parent: g }); DS.shape(S, rect(cx - 130, base - 230, 260, 230), "earth", { t, tone: 2, parent: g }); DS.shape(S, `M${cx - 80} ${base} V${base - 120} Q${cx} ${base - 200} ${cx + 80} ${base - 120} V${base} Z`, "wood", { t, tone: 2, parent: g }); DS.shape(S, `M${cx - 26} ${base - 240} Q${cx} ${base - 300} ${cx + 26} ${base - 240} Z`, "gold", { t, parent: g }); S.draw(line([cx - 60, base - 30], [cx + 60, base - 150], 0) + " " + line([cx - 30, base - 20], [cx + 90, base - 140], 0), t ?? S.start, 0, { c: DS.c("gray", 1), w: DS.w.mid, parent: g }); if (t > S.start + 0.05) tl.fromTo(g, { opacity: 0 }, { opacity: 1, duration: 0.35 }, t); };
const greenB = (S, cx, base, t) => { const g = S.grp(); DS.shadow(S, cx, base, 320, { t, parent: g }); DS.shape(S, `M${cx - 150} ${base} V${base - 110} Q${cx} ${base - 280} ${cx + 150} ${base - 110} V${base} Z`, "glass", { t, parent: g }); [-90, -30, 30, 90].forEach((dx) => S.draw(line([cx + dx, base], [cx + dx * 0.9, base - 190 + Math.abs(dx) * 0.6], 0), t ?? S.start, 0, { c: DS.c("white", 2), w: DS.w.detail, parent: g })); [-70, 0, 70].forEach((dx) => DS.shape(S, circ(cx + dx, base - 40, 34, 28), "grass", { t, w: "hair", parent: g })); if (t > S.start + 0.05) tl.fromTo(g, { opacity: 0 }, { opacity: 1, duration: 0.35 }, t); };

// ---------- 1920s: the lighting tests ----------
const SHOP = { wall: "sand", floor: "wood", window: false };
const DIM = { wall: "navy", floor: "brown", window: false };
const shopWins = (S, dark) => [470, 830, 1190].forEach((x) => { DS.shape(S, rect(x - 10, 120, 280, 190), "white", { layer: "mid", tone: 2, w: "detail" }); DS.shape(S, rect(x, 130, 260, 170), dark ? "night" : "sky", { layer: "mid", flat: true, tone: dark ? 2 : 0, w: "hair" }); S.draw(`M${x + 87} 130 V300 M${x + 173} 130 V300 M${x} 215 H${x + 260}`, S.start, 0, { c: DS.c("white", dark ? 2 : 0, "mid"), w: DS.w.detail }); });
// hanging enamel lamp; steps = [[t, lvl], ...] switches the bulb and its glow (kept above head height) on the spoken word
const lamp = (S, x, y, steps0) => {
  const steps = typeof steps0 === "number" ? [[S.start, steps0]] : steps0;
  S.draw(line([x, -20], [x, y - 56], 0), S.start, 0, { c: DS.c("ink", 1, "mid"), w: DS.w.detail });
  const layer = (fn) => steps.map(([t, lvl], i) => { const g = S.grp(); fn(lvl, g); if (i > 0) S.fadeIn(g, t, 0.35); if (i + 1 < steps.length) S.fadeOut(g, steps[i + 1][0], 0.35); return g; });
  layer((lvl, g) => { if (lvl > 0.02) S.fill(circ(x, y + 30, 60 + 120 * lvl), S.start, 0, DS.glow(DS.P.yellow[1], 0.3 + 0.55 * lvl), 1, g); });
  DS.shape(S, `M${x - 76} ${y} Q${x - 70} ${y - 56} ${x} ${y - 58} Q${x + 70} ${y - 56} ${x + 76} ${y} Z`, "green", { layer: "mid", tone: 2 });
  layer((lvl, g) => S.draw(circ(x, y + 14, 22), S.start, 0, { fill: DS.mix(DS.P.gray[1], DS.P.yellow[lvl > 0.6 ? 1 : 0], Math.min(1, lvl * 1.4)), c: DS.line("mid"), w: DS.w.detail, parent: g }));
};
const LX = [560, 960, 1360], LY = 360;
// the workroom: windows, three lamps (levels or step lists), a mid-plane bench with workers seated behind it
const shop = (S, o = {}) => {
  shopWins(S, o.dark);
  LX.forEach((x, i) => lamp(S, x, LY, (o.lamps || [0.35, 0.35, 0.35])[i]));
  const n = o.n ?? 4, xs = o.xs || [500, 800, 1100, 1400].slice(0, n);
  const F = xs.map((x, i) => seated(S, x, 760, "mid", Object.assign({ mood: o.mood || "determined", look: o.look ?? 0 }, (o.f || [])[i] || {}), (S2, x2, g2, L2, oo) => worker(S2, x2, g2, L2, i, oo)));
  if (n) desk(S, 360, 1560, 760, 820);
  xs.forEach((x) => { DS.shape(S, rrect(x + 46, 742, 52, 18, DS.r.xs), "orange", { layer: "mid", tone: 2, w: "hair" }); });
  return F;
};
// committee room: a wall display of bulbs (the lighting industry) over a long table
const COMM = { wall: "dusk", floor: "wood", window: false };
const display = (S, t) => {
  const g = S.grp();
  DS.drop(S, rrect(668, 108, 600, 200, DS.r.md), { t, parent: g });
  DS.shape(S, rrect(660, 100, 600, 200, DS.r.md), "navy", { t, parent: g });
  [0, 1, 2, 3].forEach((i) => bulbI(S, 750 + i * 140, 180, 1.4, 1, t, g));
  S.text("MORE LIGHT!", 960, 280, { size: DS.type.small, t: t ?? T0(S), c: DS.c("yellow", 1), parent: g });
  if (t > S.start + 0.05) tl.fromTo(g, { opacity: 0 }, { opacity: 1, duration: 0.35 }, t);
  return g;
};
const committee = (S, o = {}) => {
  const xs = o.xs || [420, 700, 1220, 1500];
  const F = xs.map((x, i) => seated(S, x, 760, "near", Object.assign({ mood: o.mood || "smile", look: x < 960 ? 6 : -6, t: o.t }, (o.f || [])[i] || {}), (S2, x2, g2, L2, oo) => man(S2, x2, g2, L2, i, oo)));
  desk(S, 260, 1660, 760);
  return F;
};
// locker room: a row of lockers, one small high window with the moon
const LOCK = { wall: "navy", floor: "gray", window: false };
const lockers = (S) => {
  for (let i = 0; i < 9; i++) { const x = 380 + i * 128; DS.shape(S, rect(x, 300, 120, 460), "gray", { layer: "mid", tone: 2 }); [330, 350, 370].forEach((y) => S.draw(line([x + 30, y], [x + 90, y], 0), S.start, 0, { c: DS.c("ink", 1, "mid"), w: DS.w.hair })); DS.shape(S, rrect(x + 96, 520, 10, 40, DS.r.xs), "gray", { layer: "mid", tone: 1, w: "hair" }); }
  DS.shape(S, rrect(1500, 120, 170, 130, DS.r.xs), "white", { layer: "mid", tone: 2, w: "detail" }); DS.shape(S, rect(1512, 132, 146, 106), "night", { layer: "mid", flat: true, tone: 2, w: "hair" });
  S.fill(circ(1590, 180, 24), S.start, 0, DS.c("yellow", 1), 1); S.fill(circ(1600, 172, 22), S.start, 0, DS.c("night", 2), 1);
};
const pair = (S, o = {}) => { const F = [700, 1080].map((x, i) => seated(S, x, 780, "near", Object.assign({ mood: o.mood || "determined", look: i ? -4 : 4 }, (o.f || [])[i] || {}), (S2, x2, g2, L2, oo) => worker(S2, x2, g2, L2, i + 1, oo))); desk(S, 520, 1260, 780); return F; };
const ladder = (S, x, top, gy) => { [-60, 60].forEach((dx) => S.draw(line([x + dx * 0.4, top], [x + dx, gy], 0), S.start, 0, { c: DS.c("wood", 2), w: DS.w.near })); for (let i = 1; i < 6; i++) { const y = top + ((gy - top) * i) / 6, w0 = 24 + (36 * i) / 6; S.draw(line([x - w0, y], [x + w0, y], 0), S.start, 0, { c: DS.c("wood", 2), w: DS.w.mid }); } };
const pie = (S, cx, cy, r, frac, o = {}) => {
  DS.shape(S, circ(cx, cy, r), "gray", { tone: 1 });
  const a = -Math.PI / 2, b = a + frac * Math.PI * 2;
  DS.shape(S, `M${cx} ${cy} L${cx + Math.cos(a) * r} ${cy + Math.sin(a) * r} A${r} ${r} 0 0 1 ${cx + Math.cos(b) * r} ${cy + Math.sin(b) * r} Z`, "yellow", { t: o.t, w: "detail" });
  [0.22, 0.4, 0.61, 0.83].forEach((f) => { const c = a + f * Math.PI * 2; S.draw(line([cx, cy], [cx + Math.cos(c) * r, cy + Math.sin(c) * r], 0), S.start, 0, { c: DS.c("white"), w: DS.w.mid }); });
  return [cx + Math.cos((a + b) / 2) * r * 0.7, cy + Math.sin((a + b) / 2) * r * 0.7];
};
const report = (S, cx, cy, o = {}) => { DS.drop(S, rect(cx - 170, cy - 220, 360, 460)); DS.shape(S, rect(cx - 180, cy - 230, 360, 460), "navy"); DS.shape(S, rect(cx - 150, cy - 200, 300, 400), "white", { flat: true, w: "detail" }); txt(S, "FINAL", cx, cy - 120, { size: DS.type.small }); txt(S, "REPORT", cx, cy - 60, { size: DS.type.small }); S.draw(line([cx - 110, cy - 30], [cx + 110, cy - 30], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.detail }); };

// ---------- 1920s: the relay assembly test room ----------
const RELAY = { wall: "wall", floor: "wood", window: [1300, 140, 230, 200] };
const RB = { x0: 280, x1: 1640, top: 740 }, RX = [420, 690, 960, 1230, 1500];
const relay = (S, cx, cy, k, o = {}) => {
  const t = o.t, g = S.grp(o.parent);
  DS.shape(S, rrect(cx - 90 * k, cy - 50 * k, 180 * k, 100 * k, DS.r.xs), "gray", { t, tone: 1, w: k < 0.6 ? "detail" : "mid", parent: g });
  DS.shape(S, rrect(cx - 72 * k, cy - 34 * k, 110 * k, 68 * k, DS.r.sm), "orange", { t, tone: 2, w: k < 0.6 ? "hair" : "mid", parent: g });
  if (k >= 0.6) for (let i = 1; i < 7; i++) S.draw(line([cx - 72 * k + i * 15.7 * k, cy - 34 * k], [cx - 72 * k + i * 15.7 * k, cy + 34 * k], 0), t ?? S.start, 0, { c: DS.c("orange"), w: DS.w.hair, parent: g });
  [-24, -8, 8, 24].forEach((dy) => S.draw(line([cx + 46 * k, cy + dy * k], [cx + 130 * k, cy + dy * k - 8 * k], 0), t ?? S.start, 0, { c: DS.c("gold", 2), w: k < 0.6 ? DS.w.hair : DS.w.detail, parent: g }));
  [[-78, -38], [78, -38], [-78, 38], [78, 38]].forEach(([dx, dy]) => DS.shape(S, circ(cx + dx * k, cy + dy * k, 8 * k), "gray", { t, tone: 2, w: "hair", parent: g }));
  if (t > S.start + 0.05) tl.fromTo(g, { opacity: 0 }, { opacity: 1, duration: 0.35 }, t);
  return g;
};
// the five women seated behind the bench. o.ids = colour ids per seat, o.f[i] = per-figure options, o.skip = empty seats
const relayRoom = (S, o = {}) => {
  const ids = o.ids || [0, 1, 2, 3, 4];
  const F = RX.map((x, i) => ((o.skip || []).includes(i) ? null : seated(S, x, RB.top, "near", Object.assign({ mood: o.mood || "determined", look: o.look ?? 0 }, (o.f || [])[i] || {}), (S2, x2, g2, L2, oo) => woman(S2, x2, g2, L2, ids[i], oo))));
  desk(S, RB.x0, RB.x1, RB.top);
  RX.forEach((x) => relay(S, x + 74, RB.top - 16, 0.3));
  return F;
};
let TP = 0;
// the punched paper tape: rows of holes, one per finished relay. o.scroll = px the holes travel left over the scene
const tapeStrip = (S, x, y, wd, ht, o = {}) => {
  const t = o.t, g = S.grp(o.parent), rows = o.rows || 5, gap = o.gap || 34, rad = Math.min(9, ht / (rows + 1) / 2.6);
  DS.drop(S, rect(x + 6, y + 8, wd, ht), { t, parent: g });
  DS.shape(S, rect(x, y, wd, ht), "paper", { t, flat: true, w: "detail", parent: g });
  const outer = S.grp(g); clipTo(outer, rect(x, y, wd, ht)); const holes = S.grp(outer);
  const n = Math.ceil((wd + (o.scroll || 0)) / gap) + 1, sd = o.seed ?? TP++;
  for (let i = 0; i < n; i++) for (let r = 0; r < rows; r++) if ((i * 7 + r * 3 + sd) % 5 !== 0 && !(o.gapAt && i >= o.gapAt[0] && i <= o.gapAt[1])) S.fill(circ(x + gap / 2 + i * gap, y + (ht * (r + 1)) / (rows + 1), rad), t ?? S.start, 0, DS.c("ink", 1), 1, holes);
  if (o.scroll) S.move(holes, S.start, S.len, { x: -o.scroll }, "none");
  if (t > S.start + 0.05) tl.fromTo(g, { opacity: 0 }, { opacity: 1, duration: 0.35 }, t);
  return { g, holes };
};
// tape recorder at the end of the bench: chute in, tape out to the right
const recorder = (S, cx, base, k = 1) => {
  DS.shadow(S, cx, base, 260 * k);
  DS.shape(S, rect(cx - 16 * k, base - 160 * k, 32 * k, 160 * k), "gray", { tone: 2, w: "mid" });
  DS.shape(S, rrect(cx - 110 * k, base - 330 * k, 220 * k, 180 * k, DS.r.sm), "gray", { tone: 1 });
  [-50, 50].forEach((dx) => DS.shape(S, circ(cx + dx * k, base - 240 * k, 30 * k), "ink", { w: "detail" }));
  return [cx + 110 * k, base - 200 * k];
};
const notebook = (S, x, y, wd, ht, t, n = 4, lineT) => { paperR(S, x, y, wd, ht, { t }); for (let i = 0; i < n; i++) S.draw(line([x + 20, y + 40 + i * 34], [x + wd - 30 - (i % 2) * 30, y + 40 + i * 34], 0), lineT ? lineT + i * 0.3 : t ?? S.start, 0, { c: DS.c("blue", 2), w: DS.w.detail }); };
const cupI = (S, cx, cy, k = 1, t) => { DS.shape(S, `M${cx - 40 * k} ${cy - 40 * k} H${cx + 40 * k} L${cx + 32 * k} ${cy + 36 * k} H${cx - 32 * k} Z`, "white", { t, w: "mid" }); S.draw(arc(cx + 42 * k, cy - 4 * k, 20 * k, -80, 80), t ?? S.start, 0, { c: DS.c("ink"), w: DS.w.mid }); S.draw(smooth([[cx - 12 * k, cy - 56 * k], [cx - 4 * k, cy - 72 * k], [cx - 12 * k, cy - 90 * k]]) + " " + smooth([[cx + 12 * k, cy - 56 * k], [cx + 20 * k, cy - 72 * k], [cx + 12 * k, cy - 90 * k]]), t ?? S.start, 0, { c: DS.c("gray", 1), w: DS.w.detail }); };
const clockI = (S, cx, cy, r, h, m, t) => { DS.shape(S, circ(cx, cy, r), "white", { t }); S.draw(rays(cx, cy, r * 0.8, r * 0.92, 12, -Math.PI / 2), t ?? S.start, 0, { c: DS.c("ink"), w: DS.w.detail }); const ha = ((h % 12) + m / 60) * 30 - 90, ma = m * 6 - 90, R = Math.PI / 180; S.draw(line([cx, cy], [cx + Math.cos(ma * R) * r * 0.72, cy + Math.sin(ma * R) * r * 0.72], 0) + " " + line([cx, cy], [cx + Math.cos(ha * R) * r * 0.45, cy + Math.sin(ha * R) * r * 0.45], 0), t ?? S.start, 0, { c: DS.c("ink"), w: DS.w.near }); };
const calI = (S, cx, cy, k, str, t) => { DS.shape(S, rrect(cx - 70 * k, cy - 70 * k, 140 * k, 140 * k, DS.r.sm), "white", { t }); DS.shape(S, rect(cx - 70 * k, cy - 70 * k, 140 * k, 40 * k), "red", { t, flat: true, w: "hair", tone: 2 }); if (str) S.text(str, cx, cy + 40 * k, { size: DS.type.caption, t: t ?? T0(S), c: DS.c("ink") }); };
const sandwich = (S, cx, cy, k = 1, o = {}) => {
  const t = o.t, g = S.grp(o.parent);
  DS.shape(S, circ(cx, cy + 46 * k, 200 * k, 44 * k), "white", { t, parent: g });
  DS.shape(S, rrect(cx - 150 * k, cy, 300 * k, 44 * k, DS.r.md), "sand", { t, parent: g });
  DS.shape(S, `M${cx - 165 * k} ${cy + 4 * k} Q${cx - 90 * k} ${cy - 34 * k} ${cx - 10 * k} ${cy - 4 * k} Q${cx + 80 * k} ${cy + 22 * k} ${cx + 165 * k} ${cy - 10 * k} L${cx + 150 * k} ${cy + 14 * k} L${cx - 150 * k} ${cy + 14 * k} Z`, o.fill || "pink", { t, parent: g });
  DS.shape(S, `M${cx - 150 * k} ${cy - 14 * k} Q${cx - 150 * k} ${cy - 92 * k} ${cx} ${cy - 96 * k} Q${cx + 150 * k} ${cy - 92 * k} ${cx + 150 * k} ${cy - 14 * k} Z`, "sand", { t, parent: g });
  if (t > S.start + 0.05) tl.fromTo(g, { opacity: 0 }, { opacity: 1, duration: 0.35 }, t);
  return g;
};
const bunting = (S, y = 120) => { S.draw(smooth([[300, y], [960, y + 60], [1620, y]]), S.start, 0, { c: DS.c("ink", 1, "mid"), w: DS.w.detail }); for (let i = 0; i < 14; i++) { const u = (i + 0.5) / 14, x = 300 + u * 1320, yy = y + 60 * (1 - (2 * u - 1) ** 2); DS.shape(S, `M${x - 30} ${yy} L${x + 30} ${yy} L${x} ${yy + 56} Z`, ["yellow", "pink", "green", "orange"][i % 4], { layer: "mid", w: "hair" }); } };
const cake = (S, cx, base) => { DS.shape(S, rrect(cx - 90, base - 90, 180, 90, DS.r.sm), "pink"); DS.shape(S, rrect(cx - 96, base - 100, 192, 26, DS.r.md), "white", { w: "detail" }); [[-40, 0], [0, 0], [40, 0]].forEach(([dx]) => { DS.shape(S, rect(cx + dx - 5, base - 140, 10, 40), "yellow", { w: "hair" }); S.fill(circ(cx + dx, base - 150, 8, 12), S.start, 0, DS.c("orange"), 1); }); };
const envelope = (S, cx, cy, k = 1, o = {}) => { const t = o.t, g = S.grp(); DS.drop(S, rect(cx - 90 * k + 6, cy - 56 * k + 8, 180 * k, 112 * k), { t, parent: g }); DS.shape(S, rect(cx - 90 * k, cy - 56 * k, 180 * k, 112 * k), "sand", { t, tone: 1, parent: g }); S.draw(`M${cx - 90 * k} ${cy - 56 * k} L${cx} ${cy + 6 * k} L${cx + 90 * k} ${cy - 56 * k}`, t ?? S.start, 0, { c: DS.c("earth", 2), w: DS.w.detail, parent: g }); if (o.q) S.text("?", cx, cy + 46 * k, { size: DS.type.body, t: t ?? T0(S), c: DS.c("ink"), parent: g }); if (t > S.start + 0.05) tl.fromTo(g, { opacity: 0 }, { opacity: 1, duration: 0.35 }, t); return g; };
const coins = (S, cx, base, n, t, parent) => { const g = S.grp(parent); for (let i = 0; i < n; i++) DS.shape(S, circ(cx + ((i % 3) - 1) * 26, base - 10 - Math.floor(i / 3) * 14, 22, 9), "gold", { t, w: "detail", parent: g }); if (t > S.start + 0.05) tl.fromTo(g, { opacity: 0 }, { opacity: 1, duration: 0.35 }, t); return g; };
const coin = (S, cx, cy, r, t, parent) => { const g = S.grp(parent); DS.shape(S, circ(cx, cy, r), "gold", { t, w: "detail", parent: g }); S.draw(circ(cx, cy, r * 0.7), t ?? S.start, 0, { c: DS.c("gold", 2), w: DS.w.hair, parent: g }); return g; };
const chalk = (S, x, y, wd, ht) => { DS.drop(S, rect(x + 8, y + 10, wd, ht)); DS.shape(S, rrect(x, y, wd, ht, DS.r.sm), "wood", { layer: "mid" }); DS.shape(S, rect(x + 20, y + 20, wd - 40, ht - 40), "green", { layer: "mid", tone: 2, flat: true, w: "detail" }); };

// ---------- modern studies ----------
const HALL = { wall: "glass", floor: "gray", window: false, back: [460, 120, 1460, 760] };
const dispenser = (S, x, y, t) => { DS.shape(S, rrect(x - 26, y - 44, 52, 88, DS.r.sm), "white", { layer: "mid", t }); S.fill(`M${x} ${y - 20} Q${x + 14} ${y} ${x} ${y + 14} Q${x - 14} ${y} ${x} ${y - 20} Z`, t ?? S.start, 0, DS.c("sky", 2), 1); };
const hall = (S, o = {}) => {
  [[540, "12"], [1180, "14"]].forEach(([x, n]) => { DS.shape(S, rect(x - 10, 350, 220, 410), "white", { layer: "mid", tone: 2 }); DS.shape(S, rect(x, 360, 200, 400), o.open ? "glass" : "wood", { layer: "mid", tone: o.open ? 1 : 0, dir: "h" }); DS.shape(S, rrect(x + 60, 300, 80, 40, DS.r.xs), "white", { layer: "mid", w: "detail" }); txt(S, n, x + 100, 334); });
  S.draw(line([460, 600], [1460, 600], 0), S.start, 0, { c: DS.c("gray", 2, "mid"), w: DS.w.mid });
  [880, 1040].forEach((x) => dispenser(S, x, 470));
};
const nurse = (S, x, gy, layer, i, o = {}) => who(S, x, gy, layer, Object.assign({ s: 1.05, hair: ["bun", "short", "curly"][i % 3], hairC: DS.c(["ink", "brown", "earth"][i % 3], i % 3 === 2 ? 2 : 0), outfitC: DS.c("green", 1), mood: "flat" }, o));
const auditor = (S, x, gy, layer, o = {}) => { const F = who(S, x, gy, layer, Object.assign({ s: 1.05, hair: "bun", hairC: DS.c("ink"), outfitC: DS.c("white", 2), pose: "hold", look: 6 }, o)); const [hx, hy] = F.hand("R"), k = F.s; DS.shape(S, rrect(hx - 40 * k, hy - 70 * k, 80 * k, 100 * k, DS.r.xs), "wood", { w: "detail", parent: F.g }); DS.shape(S, rect(hx - 30 * k, hy - 58 * k, 60 * k, 80 * k), "white", { flat: true, w: "hair", parent: F.g }); DS.shape(S, rrect(F.cx - 16 * k, F.sh[1] + 50 * k, 32 * k, 40 * k, DS.r.xs), "red", { w: "hair", parent: F.g }); return F; };
const ping = (S, cx, cy, t, n = 3) => { for (let i = 0; i < n; i++) { const p = S.draw(circ(cx, cy, 60), t + i * 0.45, 0, { c: DS.c("red"), w: DS.w.mid }); tl.fromTo(p, { attr: { transform: `translate(${cx} ${cy}) scale(0.4) translate(${-cx} ${-cy})` } }, { attr: { transform: `translate(${cx} ${cy}) scale(1.6) translate(${-cx} ${-cy})` }, duration: 0.9, ease: "power1.out" }, t + i * 0.45); S.fadeOut(p, t + i * 0.45 + 0.5, 0.4); } };
const COFFEE = { wall: "wall", floor: "wood", window: [1380, 160, 220, 190] };
const kettle = (S, cx, base) => { DS.shape(S, `M${cx - 60} ${base} L${cx - 50} ${base - 110} Q${cx} ${base - 140} ${cx + 50} ${base - 110} L${cx + 60} ${base} Z`, "gray", { tone: 1 }); S.draw(smooth([[cx - 36, base - 120], [cx, base - 170], [cx + 36, base - 120]]), S.start, 0, { c: DS.c("ink"), w: DS.w.near }); S.draw(line([cx + 56, base - 70], [cx + 100, base - 110], 0), S.start, 0, { c: DS.c("gray", 2), w: DS.w.near }); };
const jug = (S, cx, base, k = 1, t) => { const h = Math.max(1, k); DS.shape(S, `M${cx - 66 * h} ${base} L${cx - 58 * h} ${base - 110 * k} L${cx + 46 * h} ${base - 110 * k} L${cx + 70 * h} ${base - 128 * k} L${cx + 66 * h} ${base} Z`, "white", { t }); txt(S, "MILK", cx, base - 40 * k, { t, size: DS.type.caption }); };
const cupsRow = (S, x0, base, n) => { for (let i = 0; i < n; i++) DS.shape(S, rrect(x0 + i * 70, base - 52, 46, 52, DS.r.sm), ["pink", "yellow", "green", "white"][i % 4], { w: "detail" }); };
const honesty = (S, cx, base, k = 1) => { const pw = k > 1.2 ? 248 * k : 310; DS.shadow(S, cx, base, 340 * k); DS.shape(S, rrect(cx - pw / 2 - 16, base - 170 * k, pw + 32, 170 * k, DS.r.sm), "wood"); DS.shape(S, rrect(cx - 60 * k, base - 160 * k, 120 * k, 14 * k, DS.r.xs), "ink", { w: "hair" }); DS.shape(S, rrect(cx - pw / 2, base - 120 * k, pw, 64 * k, DS.r.xs), "white", { flat: true, w: "detail" }); S.text("HONESTY BOX", cx, base - 76 * k, { size: k > 1.2 ? DS.type.small : DS.type.caption, t: T0(S), c: DS.c("ink") }); return [cx, base - 160 * k]; };
const priceList = (S, x, y, t) => { paperR(S, x, y, 300, 220, { t }); [["TEA", 60], ["COFFEE", 120], ["MILK", 180]].forEach(([s, dy]) => { txt(S, s, x + 30, y + dy, { anchor: "start", t }); S.draw(line([x + 200, y + dy - 12], [x + 270, y + dy - 12], 0), t ?? S.start, 0, { c: DS.c("gray", 1), w: DS.w.detail }); }); };
const coffeeSet = (S, o = {}) => { desk(S, 360, 1560, 700, 900, "white"); kettle(S, 520, 700); cupsRow(S, 640, 700, 4); jug(S, 1000, 700); if (o.box !== false) honesty(S, 1300, 700); };
const psych = (S, x, gy, layer, i, o = {}) => who(S, x, gy, layer, Object.assign({ s: 1.05, hair: ["curly", "short", "bun", "side"][i % 4], hairC: DS.c(["earth", "ink", "brown", "gray"][i % 4], i % 4 === 3 ? 1 : 0), outfitC: DS.c(["purple", "green", "orange", "pink"][i % 4]), specs: i % 2 === 0, mood: "worried", look: 0 }, o));
const spines = (S, x, yB, wd, rows) => {
  DS.shape(S, rect(x, yB - rows * 120 - 20, wd, rows * 120 + 20), "wood", { layer: "mid", tone: 2 });
  const cols = ["red", "navy", "green", "gold", "purple", "orange", "earth", "sky"];
  for (let r = 0; r < rows; r++) { const y = yB - 20 - r * 120; S.draw(line([x, y], [x + wd, y], 0), S.start, 0, { c: DS.line("mid"), w: DS.w.mid }); for (let bx = x + 14, i = 0; bx < x + wd - 50; i++) { const bw = 30 + ((i * 7 + r * 3) % 4) * 6, bh = 70 + ((i * 5 + r) % 4) * 8; DS.shape(S, rrect(bx, y - bh, bw, bh, DS.r.xs), cols[(i * 3 + r) % 8], { layer: "mid", w: "detail" }); S.draw(line([bx + 6, y - bh + 16], [bx + bw - 6, y - bh + 16], 0), S.start, 0, { c: DS.c("white", 0, "mid"), w: DS.w.hair }); bx += bw + 6; } }
};
const shelfBooks = (S, x, yB, wd, rows, gapAt) => {
  DS.shape(S, rect(x, yB - rows * 120 - 20, wd, rows * 120 + 20), "wood", { layer: "mid", tone: 2 });
  for (let r = 0; r < rows; r++) { const y = yB - 20 - r * 120; S.draw(line([x, y], [x + wd, y], 0), S.start, 0, { c: DS.line("mid"), w: DS.w.mid }); for (let i = 0; i < Math.floor(wd / 100); i++) { if (gapAt && gapAt[0] === r && gapAt[1] === i) continue; DS.shape(S, rrect(x + 14 + i * 100, y - 90, 84, 90, DS.r.xs), ["earth", "sand", "earth", "wood"][(i + r) % 4], { layer: "mid", tone: 1, w: "detail" }); S.draw(rect(x + 34 + i * 100, y - 60, 44, 20), S.start, 0, { c: DS.line("mid"), w: DS.w.hair, fill: DS.P.white[0] }); } }
};
const reader = (S, cx, base, wd, ht) => {
  DS.shadow(S, cx, base, wd + 80);
  DS.shape(S, `M${cx - wd / 2 - 40} ${base} L${cx - wd / 2} ${base - 140} H${cx + wd / 2} L${cx + wd / 2 + 40} ${base} Z`, "gray", { tone: 2 });
  DS.shape(S, rrect(cx - wd / 2 - 30, base - 140 - ht - 30, wd + 60, ht + 50, DS.r.md), "gray", { tone: 1 });
  DS.shape(S, rect(cx - wd / 2, base - 140 - ht - 10, wd, ht), "navy", { flat: true, tone: 2, w: "detail" });
  [-1, 1].forEach((sd) => DS.shape(S, circ(cx + sd * (wd / 2 - 40), base - 70, 30), "ink", { w: "detail" }));
  return { x0: cx - wd / 2, y0: base - 140 - ht - 10, x1: cx + wd / 2, y1: base - 150 };
};
const book = (S, cx, cy, wd, ht, o = {}) => {
  DS.drop(S, rect(cx - wd / 2 + 10, cy - ht / 2 + 14, wd, ht));
  DS.shape(S, rrect(cx - wd / 2 - 16, cy - ht / 2 - 10, wd + 32, ht + 30, DS.r.sm), o.cover || "red", { tone: 2 });
  [-1, 1].forEach((sd) => DS.shape(S, sd < 0 ? rect(cx - wd / 2, cy - ht / 2, wd / 2, ht) : rect(cx, cy - ht / 2, wd / 2, ht), "paper", { flat: true, w: "detail" }));
  S.fill(rect(cx - 14, cy - ht / 2, 28, ht), S.start, 0, DS.c("paper", 2), 1);
  return { L: [cx - wd / 2 + 40, cy - ht / 2 + 30, wd / 2 - 70, ht - 60], R: [cx + 30, cy - ht / 2 + 30, wd / 2 - 70, ht - 60] };
};
const bookCover = (S, cx, cy, wd, ht, lines2, o = {}) => { DS.drop(S, rrect(cx - wd / 2 + 8, cy - ht / 2 + 10, wd, ht, DS.r.xs)); DS.shape(S, rrect(cx - wd / 2, cy - ht / 2, wd, ht, DS.r.xs), o.name || "navy"); DS.shape(S, rect(cx - wd / 2 + 16, cy - ht / 2, 16, ht), o.name || "navy", { tone: 2, flat: true, w: "hair" }); lines2.forEach((s, i) => S.text(s, cx + 10, cy - ht / 2 + 100 + i * 64, { size: o.size || DS.type.small, t: T0(S), c: DS.c("yellow", 1) })); };
const weekGrid = (S, B, t) => { // 3 weeks x 7 days on the microfilm screen; the Sunday column is the closed day
  const days = ["M", "T", "W", "T", "F", "S", "S"], cw = (B.x1 - B.x0 - 40) / 7, rh = (B.y1 - B.y0 - 90) / 3;
  days.forEach((d, i) => txt(S, d, B.x0 + 20 + cw * (i + 0.5), B.y0 + 56, { c: DS.c("white"), t }));
  for (let r = 0; r < 3; r++) for (let i = 0; i < 7; i++) S.draw(rect(B.x0 + 24 + cw * i, B.y0 + 80 + r * rh, cw - 8, rh - 10), t ?? S.start, 0, { c: DS.c("white", 2), w: DS.w.detail, fill: DS.c("navy", 1) });
  return { cw, rh, sx: B.x0 + 20 + cw * 6.5, ys: [0, 1, 2].map((r) => B.y0 + 80 + r * rh + rh / 2) };
};
const miniChart = (S, cx, cy, pts, t, o = {}) => { const g = S.grp(); DS.drop(S, rrect(cx - 120 + 4, cy - 80 + 6, 240, 160, DS.r.sm), { t, parent: g }); DS.shape(S, rrect(cx - 120, cy - 80, 240, 160, DS.r.sm), "white", { t, flat: true, w: "detail", parent: g }); S.draw(`M${cx - 90} ${cy - 56} V${cy + 54} H${cx + 96}`, t ?? S.start, 0, { c: DS.c("ink"), w: DS.w.detail, parent: g }); S.draw(poly(pts.map(([u, v]) => [cx - 84 + u * 172, cy + 48 - v * 96]), 0), t ?? S.start, 0, { c: DS.c(o.c || "red"), w: DS.w.mid, parent: g }); if (t > S.start + 0.05) tl.fromTo(g, { opacity: 0 }, { opacity: 1, duration: 0.3 }, t); return g; };
const bin = (S, cx, base, k = 1) => { DS.shadow(S, cx, base, 160 * k); DS.shape(S, `M${cx - 60 * k} ${base - 150 * k} H${cx + 60 * k} L${cx + 48 * k} ${base} H${cx - 48 * k} Z`, "gray", { tone: 1 }); DS.shape(S, rrect(cx - 70 * k, base - 168 * k, 140 * k, 22 * k, DS.r.xs), "gray", { tone: 2, w: "detail" }); };
const deckChair = (S, x, gy) => { DS.shadow(S, x, gy, 300); S.draw(line([x - 120, gy], [x + 60, gy - 220], 0) + " " + line([x + 120, gy], [x - 40, gy - 150], 0), S.start, 0, { c: DS.c("wood", 2), w: DS.w.near }); DS.shape(S, `M${x - 110} ${gy - 120} Q${x - 10} ${gy - 70} ${x + 50} ${gy - 230} L${x + 20} ${gy - 250} Q${x - 30} ${gy - 110} ${x - 120} ${gy - 150} Z`, "orange", { w: "mid" }); };

// ---------- timing: one picture per beat, landing just after its first word (the 0.6 s crossfade covers the breath) ----------
const CUES = [[1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [9, 0], [10, 0],
  [12, 0], [13, 0], [14, 0], [15, 0], [17, 0], [19, 0], [21, 0], [22, 0], [24, 0], [25, 0], [26, 0], [28, 0], [30, 0], [31, 0], [32, 0], [33, 0], [35, 0], [36, 0], [38, 0],
  [40, 0], [41, 0], [42, 0], [44, 0], [46, 0], [48, 0], [50, 0], [51, 0], [52, 0], [53, 0], [55, 0], [56, 0], [58, 0], [60, 0], [61, 0], [63, 0], [64, 0], [66, 0], [67, 0],
  [69, 0], [71, 0], [72, 0], [73, 0], [74, 7], [75, 0], [76, 0], [77, 0], [78, 11], [80, 0], [81, 0], [83, 0], [84, 0], [85, 0], [86, 0], [88, 0],
  [89, 0], [90, 0], [91, 0], [93, 0], [95, 0], [96, 0], [98, 0], [99, 0], [100, 0], [101, 0], [102, 0], [104, 0], [105, 7], [107, 0], [109, 0], [111, 0], [112, 0],
  [114, 0], [115, 0], [116, 0], [118, 0], [119, 0], [120, 0], [122, 0], [123, 0], [124, 0]];
const WINS = sceneWindows(CUES, -0.25);
const sc = (c, w, o) => { const k = CUES.findIndex(([a, b]) => a === c && b === w); if (k < 0) throw new Error("no cue " + c + ":" + w); return scene(WINS[k][0], WINS[k][1], o); };

// ===================== 1. The Boss Walks By =====================
// This is Dave, answering emails at his desk at a perfectly normal speed.
{ const S = sc(1, 0, { cam: "push", focus: "820 560" }); DS.room(S, OFFICE); const C = office(S);
  const { B } = daveDesk(S); email(S, B);
  plot(S, C, [[0, 0.28], [1, 0.28]], W(1, 10), 0.9);
  DS.card(S, "DAVE", 700, 430, { size: DS.type.body, t: W(1, 2) });
  DS.card(S, "NORMAL SPEED", 1450, 470, { size: DS.type.caption, t: W(1, 11) });
  DS.vignette(S); }

// Then he hears footsteps. His boss is walking past.
{ const S = sc(2, 0, { cam: "push", focus: "700 600" }); DS.room(S, OFFICE); const C = office(S);
  plot(S, C, [[0, 0.28], [1, 0.28]]);
  steps(S, 40, 380, 846, 6, W(2, 3), { dt: 0.2 });
  const Bo = boss(S, 40, { look: 6, t: W(2, 4) });
  Bo.walk(W(2, 4), 1.4, {}); S.move(Bo.all, W(2, 4), 1.4, { x: 480 }, "power1.out");
  const { F, B } = daveDesk(S); email(S, B);
  F.face(W(2, 3), "wow", -6);
  DS.card(S, "HIS BOSS", 520, 250, { size: DS.type.body, t: W(2, 5) });
  DS.vignette(S); }

// For eleven seconds, Dave is the hardest-working man in the building.
{ const S = sc(3, 0, { cam: "zoom", focus: "900 520" }); DS.room(S, OFFICE); const C = office(S);
  steps(S, 40, 380, 846, 6);
  boss(S, 520, { look: 6 });
  const { F, B } = daveDesk(S, { f: { mood: "determined" } }); email(S, B);
  plot(S, C, LINE_DAVE.slice(0, 4), W(3, 1), 1.0);
  fast(S, DK.x, DK.top - 30, W(3, 3)); sweat(S, F, W(3, 6));
  DS.card(S, "11 SECONDS", 845, 200, { size: DS.type.body, t: W(3, 1), tc: "red" });
  DS.card(S, "HARDEST-WORKING MAN", 845, 305, { size: DS.type.caption, t: W(3, 6) });
  DS.vignette(S); }

// He sits up, types faster, and opens a spreadsheet he doesn't need.
{ const S = sc(4, 0, { cam: "push", focus: "960 600" }); DS.room(S, Object.assign({ back: [160, 40, 1760, 820] }, OFFICE));
  const { F, B } = daveClose(S, { f: { mood: "determined" } }); email(S, B);
  sweat(S, F, W(4, 1)); fast(S, CU.x, CU.top - 30, W(4, 3));
  sheet(S, B, { t: W(4, 8) });
  DS.card(S, "HE DOESN'T NEED IT", 1220, 200, { size: DS.type.body, t: W(4, 10), tc: "red" });
  DS.vignette(S); }

// Footsteps fade. Spreadsheet closes. Normal speed.
{ const S = sc(5, 0, { cam: "pull", focus: "900 560" }); DS.room(S, OFFICE); const C = office(S);
  const fp = steps(S, 40, 380, 846, 6); S.fadeOut(fp, W(5, 0), 0.6);
  const Bo = boss(S, 520, { look: -6 }); S.fadeOut(Bo.all, W(5, 0), 0.5);
  const { F, B } = daveDesk(S, { f: { mood: "determined" } }); email(S, B);
  const sh = sheet(S, B); S.fadeOut(sh, W(5, 2), 0.35);
  plot(S, C, LINE_DAVE.slice(0, 4), undefined, 0, { dot: false });
  plot(S, C, LINE_DAVE.slice(3), W(5, 4), 0.8);
  F.face(W(5, 4), "flat", 6);
  DS.card(S, "NORMAL SPEED", 1450, 470, { size: DS.type.caption, t: W(5, 4) });
  DS.vignette(S); }

// Psychologists have a name for Dave's eleven seconds. They call it the Hawthorne effect.
{ const S = sc(6, 0, { cam: "push", focus: "860 520" }); DS.room(S, OFFICE);
  const C = chart(S, 220, 250, 1240, 640, { kind: "board", title: "DAVE'S SPEED" });
  plot(S, C, LINE_DAVE);
  const [rx, ry0] = C.P(0.27, 0.98), [rx1, ry1] = C.P(0.65, 0.18);
  S.draw(rrect(rx, ry0, rx1 - rx, ry1 - ry0, DS.r.md), W(6, 6), 0, { c: DS.c("red"), w: DS.w.near });
  const rx2 = (rx + rx1) / 2;
  txt(S, "11 SECONDS", rx2, C.P(0, 0.06)[1], { t: W(6, 6), c: DS.c("red", 2), size: DS.type.small });
  const P = who(S, 1640, 960, "near", { s: 1.1, hair: "curly", hairC: DS.c("ink"), outfitC: DS.c("white", 2), specs: true, pose: "pointL", look: -6, t: W(6, 0) });
  DS.card(S, "THE HAWTHORNE EFFECT", 840, 130, { size: DS.type.title, t: W(6, 12), tc: "red" });
  DS.vignette(S); }

// But does being watched really change what we do? / And if it does, which Dave is the real one?
{ const S = sc(7, 0, { cam: "push", focus: "960 560" }); DS.room(S, OFFICE);
  const A = dave(S, 560, 960, "near", { mood: "determined", look: 0, pose: "hips" }); sweat(S, A, W(7, 3));
  eyesPic(S, 560, 250, 420, 170, { paper: false, t: W(7, 3) });
  DS.card(S, "WATCHED", 560, 420, { size: DS.type.small, t: W(7, 3) });
  const Bv = dave(S, 1360, 960, "near", { mood: "flat", look: -4, t: W(8, 4) });
  DS.card(S, "NOT WATCHED", 1360, 420, { size: DS.type.small, t: W(8, 4) });
  S.text("?", 960, 690, { size: DS.type.display, t: W(8, 8), c: DS.c("red", 2) });
  DS.card(S, "WHICH IS THE REAL DAVE?", 960, 130, { size: DS.type.body, t: W(8, 8), tc: "red" });
  DS.vignette(S); }

// The answer starts in a giant factory near Chicago, a hundred years ago,
{ const S = sc(9, 0, { cam: "pull" }); DS.outdoor(S, WORKS); works(S);
  DS.card(S, "NEAR CHICAGO", 480, 860, { size: DS.type.body, t: W(9, 7) });
  DS.card(S, "100 YEARS AGO", 1440, 860, { size: DS.type.body, t: W(9, 10), tc: "red" });
  DS.vignette(S); }

// with a light bulb committee, five women, a paper tape, and some missing data. / So let's start where they started, with the light.
{ const S = sc(10, 0, { cam: "push", focus: "330 520" }); DS.room(S, { wall: "sand", floor: "wood", window: false });
  const X = [330, 760, 1190, 1620], tt = [W(10, 2), W(10, 5), W(10, 8), W(10, 12)];
  X.forEach((x, i) => panel(S, x, 500, 380, 440, tt[i]));
  bulbI(S, X[0], 470, 3.2, 1, tt[0]);
  for (let i = 0; i < 5; i++) mini(S, X[1] - 120 + i * 60, 560, 1.4, { t: tt[1], fill: DS.c(WC[i], 1), bun: true });
  tapeStrip(S, X[2] - 160, 430, 320, 120, { t: tt[2] });
  { const t = tt[3]; DS.shape(S, rrect(X[3] - 130, 390, 260, 190, DS.r.sm), "sand", { t, tone: 2 }); DS.shape(S, rrect(X[3] - 130, 370, 110, 40, DS.r.xs), "sand", { t, tone: 2 }); S.text("?", X[3], 530, { size: DS.type.display, t, c: DS.c("ink") }); }
  ["COMMITTEE", "5 WOMEN", "PAPER TAPE", "MISSING DATA"].forEach((s, i) => txt(S, s, X[i], 680, { t: tt[i] }));
  S.draw(rrect(X[0] - 210, 260, 420, 480, DS.r.lg), W(11, 7), 0, { c: DS.c("red"), w: DS.w.near });
  DS.card(S, "START WITH THE LIGHT", 760, 150, { size: DS.type.body, t: W(11, 6), tc: "red" });
  DS.vignette(S); }

// ===================== 2. More Light, More Work? =====================
// In the nineteen twenties, Western Electric's Hawthorne Works made the phones and switches for the Bell telephone system.
{ const S = sc(12, 0, { cam: "zoom", focus: "960 400" }); DS.outdoor(S, WORKS); works(S);
  DS.card(S, "1920s", 330, 130, { size: DS.type.body, t: W(12, 2) });
  DS.card(S, "HAWTHORNE WORKS", 985, 870, { size: DS.type.body, t: W(12, 6) });
  candlePhone(S, 560, 930, 1.0, { t: W(12, 10) });
  switchRack(S, 1260, 930, 300, 330, { t: W(12, 12) });
  DS.card(S, "BELL TELEPHONE SYSTEM", 960, 470, { size: DS.type.small, t: W(12, 15) });
  DS.vignette(S); }

// It was so big it had its own hospital, its own fire brigade and its own greenhouse.
{ const S = sc(13, 0, { cam: "pull" }); DS.outdoor(S, WORKS); works(S);
  hospitalB(S, 420, 900, W(13, 8)); fireB(S, 960, 900, W(13, 11)); greenB(S, 1500, 900, W(13, 16));
  DS.card(S, "HOSPITAL", 420, 560, { size: DS.type.small, t: W(13, 8) });
  DS.card(S, "FIRE BRIGADE", 960, 560, { size: DS.type.small, t: W(13, 11) });
  DS.card(S, "GREENHOUSE", 1500, 560, { size: DS.type.small, t: W(13, 16) });
  DS.vignette(S); }

// By nineteen twenty-nine, more than forty thousand people worked there.
{ const S = sc(14, 0, { cam: "push", focus: "960 760" }); DS.outdoor(S, WORKS); works(S);
  const fills = WC.concat(LC);
  for (let r = 0; r < 3; r++) for (let i = 0; i < 26; i++) mini(S, 110 + i * 66 + (r % 2) * 30, 800 + r * 62, 0.85 + r * 0.12, { t: W(14, 5) + (i + r * 26) * 0.012, fill: DS.c(fills[(i * 5 + r) % fills.length], 1), bun: (i + r) % 3 === 0 });
  DS.card(S, "1929", 600, 130, { size: DS.type.body, t: W(14, 1) });
  DS.card(S, "40,000+ PEOPLE", 1310, 130, { size: DS.type.body, t: W(14, 5), tc: "red" });
  DS.vignette(S); }

// In nineteen twenty-four, the factory agreed to help answer one question. / Does better lighting make workers faster?
{ const S = sc(15, 0, { cam: "push", focus: "960 500" }); DS.room(S, SHOP);
  shop(S, { mood: "determined" });
  DS.card(S, "1924", 360, 520, { size: DS.type.body, t: W(15, 1) });
  DS.card(S, "BETTER LIGHT = FASTER?", 960, 520, { size: DS.type.body, t: W(16, 1), tc: "red" });
  DS.vignette(S); }

// The electric lighting industry was very interested, / and the committee behind the study had Thomas Edison as its honorary chairman.
{ const S = sc(17, 0, { cam: "push", focus: "960 480" }); DS.room(S, COMM);
  display(S, W(17, 1));
  DS.card(S, "THE LIGHTING INDUSTRY", 960, 362, { size: DS.type.small, t: W(17, 2) });
  committee(S, { t: W(18, 2), mood: "smile" });
  const E = man(S, 960, 960, "near", 0, Object.assign({}, EDISON, { mood: "smile", t: W(18, 7) }));
  DS.card(S, "THOMAS EDISON", 960, 486, { size: DS.type.small, t: W(18, 7) });
  DS.card(S, "HONORARY CHAIRMAN", 1500, 470, { size: DS.type.caption, t: W(18, 11), tc: "red" });
  DS.vignette(S); }

// They were hoping for a nice, simple result. / More light, more work, and more light bulbs.
{ const S = sc(19, 0, { cam: "push", focus: "960 400" }); DS.room(S, COMM);
  const g = panel(S, 960, 335, 1400, 380);
  const X = [470, 960, 1450];
  txt(S, "A NICE, SIMPLE RESULT:", 960, 205, { t: W(19, 5), size: DS.type.small });
  bulbI(S, X[0], 330, 2.0, 1, W(20, 0));
  mini(S, X[1], 400, 1.9, { t: W(20, 2), fill: DS.c("earth", 1), bun: true }); S.draw(line([X[1] + 44, 350], [X[1] + 100, 350], 0), W(20, 2), 0, { c: DS.c("gray", 2), w: DS.w.mid });
  [-60, 0, 60].forEach((dx) => bulbI(S, X[2] + dx, 330 + Math.abs(dx) * 0.3, 1.3, 1, W(20, 5)));
  ["MORE LIGHT", "MORE WORK", "MORE BULBS"].forEach((s, i) => txt(S, s, X[i], 480, { t: [W(20, 0), W(20, 2), W(20, 5)][i], size: DS.type.small }));
  arrowR(S, 560, 345, 800, 345, W(20, 2)); arrowR(S, 1110, 345, 1350, 345, W(20, 5));
  committee(S, { mood: "smile", f: [{}, {}, {}, {}] }).forEach((F) => F.face(W(20, 5), "happy", F.look));
  DS.vignette(S); }

// So the engineers turned the lights up, and output mostly rose. The line went up.
{ const S = sc(21, 0, { cam: "push", focus: "1200 500" }); DS.room(S, SHOP);
  shopWins(S);
  LX.slice(0, 2).forEach((x) => lamp(S, x, LY, [[S.start, 0.3], [W(21, 5), 1]]));
  [500, 800].forEach((x, i) => seated(S, x, 760, "mid", { mood: "determined", look: 4 }, (S2, x2, g2, L2, oo) => worker(S2, x2, g2, L2, i, oo)));
  desk(S, 360, 940, 760, 820);
  const C = easel(S, 1040, 170, 700, 560, { title: "OUTPUT", xpad: 100 });
  bulbRow(S, C, [0.2, 0.3, 0.45, 0.6, 0.75, 0.9, 1], C.y1 + 46, W(21, 3), 0.12, 0.55);
  plot(S, C, LINE_UP, W(21, 8), 2.2);
  man(S, 200, 960, "near", 1, Object.assign({}, ENG, { pose: "hold", look: 6 }));
  DS.card(S, "LIGHTS UP", 650, 160, { size: DS.type.body, t: W(21, 5) });
  DS.card(S, "THE LINE WENT UP", 1390, 110, { size: DS.type.small, t: W(21, 11), tc: "red" });
  DS.vignette(S); }

// Then they did it properly, with a second group whose lights stayed the same. / That group's line went up too.
{ const S = sc(22, 0, { cam: "push", focus: "1000 480" }); DS.room(S, SHOP);
  const C = easel(S, 330, 130, 1260, 700, { title: "OUTPUT", xpad: 150, lpad: 170 });
  bulbRow(S, C, [0.2, 0.3, 0.45, 0.6, 0.75, 0.9, 1], C.y1 + 40, undefined, 0, 0.55);
  bulbRow(S, C, [0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4], C.y1 + 100, W(22, 8), 0.06, 0.55);
  txt(S, "TEST", C.x0 - 10, C.y1 + 52, { anchor: "end", c: DS.c("red", 2) }); txt(S, "SAME", C.x0 - 10, C.y1 + 112, { anchor: "end", t: W(22, 8), c: DS.c("gray", 2) });
  plot(S, C, LINE_UP);
  plot(S, C, LINE_CTRL, W(23, 2), 1.4, { c: DS.c("gray", 2) });
  DS.card(S, "SECOND GROUP", 600, 270, { size: DS.type.small, t: W(22, 7) });
  DS.card(S, "UP TOO", 1290, 600, { size: DS.type.body, t: W(23, 3), tc: "red" });
  DS.vignette(S); }

// So they turned the test group's lights down, step by step, and both lines kept going up.
{ const S = sc(24, 0, { cam: "push", focus: "1000 500" }); DS.room(S, SHOP);
  const C = easel(S, 330, 130, 1260, 700, { title: "OUTPUT", xpad: 150, lpad: 170 });
  bulbRow(S, C, [1, 0.85, 0.7, 0.55, 0.4, 0.28, 0.16], C.y1 + 40, W(24, 7), 0.2, 0.55);
  bulbRow(S, C, [0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4], C.y1 + 100, undefined, 0, 0.55);
  txt(S, "TEST", C.x0 - 10, C.y1 + 52, { anchor: "end", c: DS.c("red", 2) }); txt(S, "SAME", C.x0 - 10, C.y1 + 112, { anchor: "end", c: DS.c("gray", 2) });
  plot(S, C, LINE_CTRL, W(24, 12), 1.6, { c: DS.c("gray", 2) });
  plot(S, C, LINE_UP, W(24, 12), 1.6);
  DS.card(S, "LIGHTS DOWN", 600, 270, { size: DS.type.small, t: W(24, 6) });
  DS.card(S, "BOTH UP", 1290, 600, { size: DS.type.body, t: W(24, 13), tc: "red" });
  DS.vignette(S); }

// Output only fell at the very bottom, when the women said they could hardly see what they were doing.
{ const S = sc(25, 0, { cam: "zoom", focus: "800 600" }); DS.room(S, DIM);
  shop(S, { dark: true, lamps: [0.04, 0.04, 0.04], n: 3, xs: [520, 900, 1280], mood: "worried", f: [{ look: 4 }, { look: 0 }, { look: -4 }] });
  say(S, 720, 200, 330, 80, 880, 575, ["WE CAN HARDLY SEE!"], W(25, 10));
  panel(S, 1600, 300, 360, 260); const C = chart(S, 1420, 170, 360, 260, { kind: "none" });
  plot(S, C, [[0, 0.2], [0.3, 0.4], [0.6, 0.6], [0.8, 0.72]], undefined, 0, { dot: false, w: DS.w.mid });
  plot(S, C, [[0.8, 0.72], [1, 0.2]], W(25, 2), 0.6, { w: DS.w.mid });
  DS.card(S, "THE VERY BOTTOM", 1540, 500, { size: DS.type.small, t: W(25, 5), tc: "red" });
  DS.vignette(S, 0.2); }

// Then two volunteers were moved into a locker room, / with the light turned down to about the level of moonlight.
{ const S = sc(26, 0, { cam: "push", focus: "900 560" }); DS.room(S, LOCK); lockers(S);
  lamp(S, 890, 260, [[S.start, 0.06]]);
  pair(S, { f: [{ t: W(26, 1) }, { t: W(26, 1) + 0.15 }] });
  DS.card(S, "LOCKER ROOM", 600, 160, { size: DS.type.small, t: W(26, 7) });
  DS.card(S, "ABOUT MOONLIGHT", 1300, 330, { size: DS.type.small, t: W(27, 10), tc: "red" });
  DS.vignette(S, 0.2); }

// They kept working at the same speed. / They said their eyes felt fine, and they were less tired than under bright lights.
{ const S = sc(28, 0, { cam: "push", focus: "900 520" }); DS.room(S, LOCK); lockers(S);
  lamp(S, 890, 260, [[S.start, 0.06]]);
  const F = pair(S); F.forEach((f) => f.face(W(29, 3), "smile", f.look));
  panel(S, 1610, 430, 360, 240, W(28, 5)); const C = chart(S, 1430, 310, 360, 240, { kind: "none", t: W(28, 5), title: "SAME SPEED" });
  plot(S, C, [[0, 0.5], [1, 0.5]], W(28, 5), 0.8, { w: DS.w.mid });
  say(S, 700, 330, 220, 70, 700, 450, ["EYES FINE!"], W(29, 3));
  say(S, 1180, 330, 240, 70, 1080, 450, ["LESS TIRED!"], W(29, 9));
  DS.vignette(S, 0.2); }

// Which is not what a light bulb committee wants to hear.
{ const S = sc(30, 0, { cam: "zoom", focus: "960 600" }); DS.room(S, COMM); display(S);
  const F = committee(S, { mood: "smile" }); F.forEach((f) => f.face(W(30, 2), "worried", f.look));
  paperR(S, 810, 650, 300, 110); txt(S, "EYES FINE.", 960, 698); txt(S, "LESS TIRED.", 960, 742);
  sweat(S, F[1], W(30, 7)); sweat(S, F[2], W(30, 7));
  DS.vignette(S); }

// And then came the strangest test of all. After days of brighter and brighter light,
{ const S = sc(31, 0, { cam: "push", focus: "960 500" }); DS.room(S, SHOP); shopWins(S);
  const t1 = W(31, 9), t2 = W(31, 11), t3 = W(31, 13);
  LX.forEach((x) => lamp(S, x, LY, [[S.start, 0.3], [t1, 0.5], [t2, 0.75], [t3, 1]]));
  [500, 800, 1100, 1400].forEach((x, i) => seated(S, x, 760, "mid", { mood: "smile", look: 0 }, (S2, x2, g2, L2, oo) => worker(S2, x2, g2, L2, i, oo)));
  desk(S, 360, 1560, 760, 820);
  [["DAY 1", t1], ["DAY 2", t2], ["DAY 3", t3]].forEach(([s, t], i) => calI(S, 640 + i * 320, 515, 0.85, s, t));
  DS.card(S, "THE STRANGEST TEST", 960, 110, { size: DS.type.body, t: W(31, 4), tc: "red" });
  DS.vignette(S); }

// the women watched an electrician swap the bulbs, for bulbs of exactly the same size.
{ const S = sc(32, 0, { cam: "push", focus: "960 420" }); DS.room(S, SHOP); shopWins(S);
  lamp(S, 560, LY, 1);
  S.draw(line([1080, -20], [1080, 344], 0), S.start, 0, { c: DS.c("ink", 1, "mid"), w: DS.w.detail });
  DS.shape(S, "M1004 400 Q1010 344 1080 342 Q1150 344 1156 400 Z", "green", { layer: "mid", tone: 2 });
  ladder(S, 930, 700, 960);
  const El = who(S, 930, 760, "near", { s: 1.0, hair: "short", hairC: DS.c("ink"), outfitC: DS.c("navy"), outfit: "apron", armR: [[60, -40], [130, -100]], armL: [[-34, 10], [-60, 40]], look: 5, mood: "flat" });
  const [hx, hy] = El.hand("L"); bulbI(S, hx - 14, hy + 30, 0.9, 0.9, W(32, 7));
  [300, 620].forEach((x, i) => worker(S, x, 960, "near", i, { mood: "wow", look: 6, s: 1.0 }));
  const g = S.grp(); panel(S, 1560, 620, 360, 220, W(32, 9));
  bulbI(S, 1470, 630, 1.5, 1, W(32, 9)); bulbI(S, 1650, 630, 1.5, 1, W(32, 9)); txt(S, "=", 1560, 650, { t: W(32, 9), size: DS.type.title });
  DS.card(S, "EXACTLY THE SAME SIZE", 1340, 130, { size: DS.type.small, t: W(32, 11), tc: "red" });
  DS.card(S, "ELECTRICIAN", 460, 130, { size: DS.type.small, t: W(32, 4) });
  DS.vignette(S); }

// The women said they liked the brighter light. / Their output, at every stage, barely changed.
{ const S = sc(33, 0, { cam: "push", focus: "800 520" }); DS.room(S, SHOP); shopWins(S);
  LX.forEach((x) => lamp(S, x, LY, 1));
  const F = [380, 760].map((x, i) => worker(S, x, 960, "near", i, { mood: "happy", look: 4 }));
  say(S, 300, 380, 190, 66, 370, 560, ["SO BRIGHT!"], W(33, 4));
  const C = easel(S, 1100, 300, 640, 460, { title: "OUTPUT", t: W(34, 1) });
  plot(S, C, [[0, 0.44], [0.2, 0.47], [0.4, 0.43], [0.6, 0.46], [0.8, 0.44], [1, 0.46]], W(34, 2), 1.4);
  DS.card(S, "BARELY CHANGED", 1420, 200, { size: DS.type.body, t: W(34, 5), tc: "red" });
  DS.vignette(S); }

// The company decided that light was only one factor, and apparently a minor one.
{ const S = sc(35, 0, { cam: "push", focus: "900 520" }); DS.room(S, { wall: "sand", floor: "wood", window: false });
  const g = panel(S, 760, 500, 700, 620);
  const [lx, ly] = pie(S, 760, 520, 230, 0.07, { t: W(35, 4) });
  S.arrow(1124, 280, lx + 20, ly - 10, W(35, 4), 0.3, { c: DS.c("red"), w: DS.w.near, bend: 0.2 });
  txt(S, "LIGHT", 1215, 270, { t: W(35, 4), size: DS.type.small, c: DS.c("red", 2) });
  man(S, 1440, 960, "near", 1, { mood: "flat", look: -6, pose: "pointL" });
  DS.card(S, "ONLY ONE FACTOR", 760, 120, { size: DS.type.body, t: W(35, 6) });
  DS.card(S, "A MINOR ONE", 1440, 360, { size: DS.type.body, t: W(35, 12), tc: "red" });
  DS.vignette(S); }

// No final report was ever written. / One historian suspects the answer just wasn't the one the industry wanted: buy more light bulbs.
{ const S = sc(36, 0, { cam: "push", focus: "800 500" }); DS.room(S, { wall: "sand", floor: "wood", window: false });
  report(S, 520, 480);
  stamp(S, 520, 640, "NEVER WRITTEN", W(36, 4));
  const H = who(S, 1180, 960, "near", Object.assign({}, HIST, { look: 6, mood: "flat", pose: "think", t: W(37, 1) }));
  DS.card(S, "ONE HISTORIAN", 1180, 470, { size: DS.type.small, t: W(37, 1) });
  const b = say(S, 1500, 260, 300, 110, 1330, 420, ["BUY MORE", "LIGHT BULBS?"], W(37, 9), { think: true });
  S.draw(line([1310, 210], [1690, 310], 0), W(37, 12), 0, { c: DS.c("red"), w: DS.w.near });
  DS.vignette(S); }

// But if it wasn't the light, / something was still making the line go up.
{ const S = sc(38, 0, { cam: "zoom", focus: "1300 400" }); DS.room(S, SHOP);
  const C = easel(S, 330, 130, 1260, 700, { title: "OUTPUT", xpad: 150, lpad: 170 });
  bulbRow(S, C, [0.2, 0.3, 0.45, 0.6, 0.75, 0.9, 1], C.y1 + 40, undefined, 0, 0.55);
  plot(S, C, LINE_UP); plot(S, C, LINE_CTRL, undefined, 0, { c: DS.c("gray", 2) });
  bulbI(S, 1700, 300, 2.4, 0.2, W(38, 4)); xMark(S, 1700, 290, 1.4, W(38, 4));
  const [ex, ey] = C.P(1, 0.7);
  S.text("?", ex - 40, ey - 40, { size: DS.type.display, t: W(39, 5), c: DS.c("red", 2) });
  DS.card(S, "SOMETHING ELSE", 960, 270, { size: DS.type.body, t: W(39, 0), tc: "red" });
  DS.vignette(S); }

// ===================== 3. Five Women and a Paper Tape =====================
// In April nineteen twenty-seven, the company tried again, with more control.
{ const S = sc(40, 0, { cam: "push", focus: "960 520" }); DS.room(S, RELAY);
  DS.shape(S, rect(840, 330, 260, 430), "white", { layer: "mid", tone: 2 }); DS.shape(S, rect(860, 350, 220, 410), "wood", { layer: "mid", dir: "h" }); DS.shape(S, circ(1050, 570, 10), "gold", { layer: "mid", w: "detail" });
  DS.shape(S, rrect(840, 380, 260, 70, DS.r.xs), "white", { layer: "mid", w: "detail" }); txt(S, "TEST ROOM", 970, 428);
  calI(S, 520, 400, 1.6, "1927", W(40, 1)); txt(S, "APRIL", 520, 320, { t: W(40, 1), c: DS.P.white[0] });
  man(S, 1400, 960, "near", 1, { mood: "determined", look: -6, pose: "hold" });
  DS.card(S, "MORE CONTROL", 1400, 300, { size: DS.type.body, t: W(40, 9), tc: "red" });
  DS.vignette(S); }

// Five women who built telephone relays got a small room of their own.
{ const S = sc(41, 0, { cam: "pull" }); DS.room(S, RELAY);
  relayRoom(S, { f: RX.map((x, i) => ({ t: W(41, 0) + i * 0.12 })) });
  DS.card(S, "5 WOMEN", 520, 140, { size: DS.type.body, t: W(41, 0) });
  DS.card(S, "TELEPHONE RELAYS", 960, 290, { size: DS.type.small, t: W(41, 4) });
  DS.card(S, "A ROOM OF THEIR OWN", 1360, 140, { size: DS.type.small, t: W(41, 9), tc: "red" });
  DS.vignette(S); }

// A relay was about thirty-five tiny parts and four screws. / Each woman built one roughly every minute, about five hundred a day.
{ const S = sc(42, 0, { cam: "push", focus: "960 600" }); DS.room(S, RELAY);
  DS.shape(S, rect(-200, 560, 2320, 600), "wood", { dir: "v" });
  const tp = W(42, 4);
  for (let i = 0; i < 35; i++) { const x = 220 + (i % 7) * 70 + ((i * 13) % 20), y = 640 + Math.floor(i / 7) * 56 + ((i * 7) % 16); DS.shape(S, i % 3 ? rrect(x - 14, y - 7, 28, 14, DS.r.xs) : circ(x, y, 10), ["gray", "orange", "gold"][i % 3], { t: tp + i * 0.02, tone: 1, w: "hair" }); }
  for (let i = 0; i < 4; i++) { const x = 740, y = 650 + i * 60; DS.shape(S, circ(x, y, 14), "gray", { t: W(42, 8), tone: 2, w: "detail" }); S.draw(line([x, y], [x, y + 36], 0), W(42, 8), 0, { c: DS.c("gray", 2), w: DS.w.near }); }
  S.ring(745, 740, 60, 150, W(42, 8), 0, { c: DS.c("red"), w: DS.w.mid });
  arrowR(S, 820, 760, 1000, 760, W(43, 2));
  relay(S, 1180, 770, 1.0, { t: W(43, 2) });
  clockI(S, 1580, 740, 110, 9, 1, W(43, 5));
  DS.card(S, "~35 PARTS + 4 SCREWS", 520, 160, { size: DS.type.small, t: tp });
  DS.card(S, "~1 A MINUTE", 1300, 160, { size: DS.type.small, t: W(43, 5) });
  DS.card(S, "~500 A DAY", 1300, 300, { size: DS.type.body, t: W(43, 8), tc: "red" });
  DS.vignette(S); }

// Every finished relay dropped down a chute / and punched one hole in a moving paper tape.
{ const S = sc(44, 0, { cam: "push", focus: "1000 640" }); DS.room(S, RELAY);
  const F = seated(S, 420, 560, "near", { mood: "determined", look: 6 }, (S2, x2, g2, L2, oo) => woman(S2, x2, g2, L2, 2, oo));
  desk(S, 160, 900, 560, 960);
  DS.shape(S, rrect(700, 548, 90, 20, DS.r.xs), "ink", { w: "detail" });
  DS.shape(S, "M700 588 L790 588 L830 760 L760 760 Z", "gray", { tone: 1, w: "mid" });
  const [tx, ty] = recorder(S, 900, 960, 1.0);
  const rg = relay(S, 745, 520, 0.36);
  S.move(rg, W(44, 3), 0.7, { y: 260, opacity: 0 }, "power2.in");
  const T = tapeStrip(S, tx, ty - 50, 1000, 100, { scroll: 160, gap: 32 });
  S.draw(circ(tx + 40, ty, 28), W(45, 3), 0, { c: DS.c("red"), w: DS.w.near });
  txt(S, "CHUTE", 860, 500, { t: W(44, 6), size: DS.type.small });
  DS.card(S, "MOVING PAPER TAPE", 1400, 640, { size: DS.type.small, t: W(45, 6) });
  DS.card(S, "1 RELAY = 1 HOLE", 1360, 220, { size: DS.type.body, t: W(45, 2), tc: "red" });
  DS.vignette(S); }

// One hole, one relay, on the record forever. / And an observer sat with them, writing down everything they did and said.
{ const S = sc(46, 0, { cam: "push", focus: "700 560" }); DS.room(S, RELAY);
  const xs = [700, 920, 1140, 1360, 1580];
  xs.forEach((x, i) => seated(S, x, 760, "mid", { mood: "determined", look: -2 }, (S2, x2, g2, L2, oo) => woman(S2, x2, g2, L2, i, oo)));
  desk(S, 600, 1680, 760, 820);
  tapeStrip(S, 620, 800, 1040, 70, { scroll: 120, gap: 28 });
  const O = seated(S, 330, 820, "near", Object.assign({}, OBS, { look: 6, mood: "flat", t: W(47, 1) }), who);
  desk(S, 140, 560, 820, 1000);
  notebook(S, 360, 740, 170, 76, W(47, 1), 2, W(47, 6));
  DS.card(S, "ON THE RECORD FOREVER", 1120, 300, { size: DS.type.small, t: W(46, 4) });
  DS.card(S, "THE OBSERVER", 370, 400, { size: DS.type.body, t: W(47, 2), tc: "red" });
  DS.vignette(S); }

// Over the next two years, the company kept changing things. / Rest breaks. Shorter days. Saturday mornings off.
{ const S = sc(48, 0, { cam: "push", focus: "960 560" }); DS.room(S, RELAY);
  const X = [420, 960, 1500], tt = [W(49, 0), W(49, 2), W(49, 4)];
  X.forEach((x, i) => panel(S, x, 600, 420, 460, tt[i]));
  cupI(S, X[0], 600, 1.6, tt[0]); clockI(S, X[1], 580, 110, 4, 0, tt[1]); calI(S, X[2], 580, 1.3, "SAT", tt[2]);
  ["REST BREAKS", "SHORTER DAYS", "SAT. MORNINGS OFF"].forEach((s, i) => txt(S, s, X[i], 780, { t: tt[i], size: i === 2 ? DS.type.caption : DS.type.small }));
  DS.card(S, "2 YEARS OF CHANGES", 960, 180, { size: DS.type.body, t: W(48, 3) });
  DS.vignette(S); }

// And a company sandwich at half past nine. Occasionally, tongue.
{ const S = sc(50, 0, { cam: "zoom", focus: "1000 640" }); DS.room(S, RELAY);
  const F = woman(S, 400, 960, "near", 3, { s: 1.3, mood: "flat", look: 6 });
  desk(S, 640, 1700, 760, 960);
  sandwich(S, 1100, 690, 1.2, { t: W(50, 3) });
  clockI(S, 1520, 360, 110, 9, 30, W(50, 4));
  txt(S, "9:30", 1520, 540, { t: W(50, 4), size: DS.type.small });
  F.face(W(50, 9), "worried", 6); sweat(S, F, W(50, 9));
  DS.card(S, "OCCASIONALLY: TONGUE", 1060, 200, { size: DS.type.body, t: W(50, 8), tc: "red" });
  DS.vignette(S); }

// Breaks added, the line went up. Shorter days, the line went up.
{ const S = sc(51, 0, { cam: "push", focus: "960 480" }); DS.room(S, RELAY);
  const C = chart(S, 300, 120, 1320, 640, { kind: "paper", title: "RELAYS PER HOUR" });
  tapeStrip(S, 300, 800, 1320, 80, { scroll: 140, gap: 30 });
  plot(S, C, [[0, 0.2], [0.18, 0.22], [0.25, 0.22]], undefined, 0, { dot: false });
  plot(S, C, [[0.25, 0.22], [0.32, 0.4], [0.55, 0.42]], W(51, 2), 0.8, { dot: false });
  plot(S, C, [[0.55, 0.42], [0.62, 0.62], [0.95, 0.66]], W(51, 8), 0.8);
  txt(S, "BREAKS", C.P(0.36, 0)[0], C.P(0, 0.52)[1], { t: W(51, 0), size: DS.type.small });
  txt(S, "SHORTER DAYS", C.P(0.72, 0)[0], C.P(0, 0.78)[1], { t: W(51, 6), size: DS.type.small });
  DS.vignette(S); }

// In nineteen twenty-eight, the company asked a Harvard Business School professor, Elton Mayo, to help explain it.
{ const S = sc(52, 0, { cam: "push", focus: "700 520" }); DS.room(S, RELAY);
  const C = chart(S, 1040, 170, 700, 420, { kind: "paper", layer: "mid" });
  plot(S, C, [[0, 0.2], [0.25, 0.22], [0.32, 0.4], [0.55, 0.42], [0.62, 0.62], [0.95, 0.66]]);
  const M = man(S, 640, 960, "near", 1, Object.assign({}, MAYO, { pose: "think", look: 6, mood: "flat", t: W(52, 11) }));
  DS.card(S, "1928", 300, 140, { size: DS.type.body, t: W(52, 1) });
  DS.card(S, "HARVARD BUSINESS SCHOOL", 640, 300, { size: DS.type.small, t: W(52, 7) });
  DS.card(S, "ELTON MAYO", 640, 470, { size: DS.type.body, t: W(52, 11), tc: "red" });
  DS.vignette(S); }

// That autumn, they took it all away. / Back to forty-eight hours a week, with no breaks and no sandwich.
{ const S = sc(53, 0, { cam: "push", focus: "960 560" }); DS.room(S, RELAY);
  const X = [330, 750, 1170, 1590];
  X.forEach((x) => panel(S, x, 600, 360, 400));
  cupI(S, X[0], 600, 1.4); clockI(S, X[1], 580, 100, 4, 0); calI(S, X[2], 580, 1.2, "SAT"); sandwich(S, X[3], 620, 0.8);
  [W(54, 8), W(53, 5), W(53, 6), W(54, 11)].forEach((t, i) => xMark(S, X[i], 600, 2.2, t));
  DS.card(S, "TOOK IT ALL AWAY", 960, 160, { size: DS.type.body, t: W(53, 3) });
  DS.card(S, "48 HOURS A WEEK", 960, 880, { size: DS.type.body, t: W(54, 2), tc: "red" });
  DS.vignette(S); }

// If the breaks were the secret, output should have crashed.
{ const S = sc(55, 0, { cam: "zoom", focus: "1300 500" }); DS.room(S, RELAY);
  const C = chart(S, 300, 120, 1320, 640, { kind: "paper", title: "RELAYS PER HOUR" });
  plot(S, C, [[0, 0.2], [0.25, 0.22], [0.32, 0.4], [0.55, 0.42], [0.62, 0.62], [0.8, 0.66]], undefined, 0, { dot: false });
  plot(S, C, [[0.8, 0.66], [0.86, 0.3], [1, 0.08]], W(55, 6), 0.9, { c: DS.c("gray", 2), dash: "22 16" });
  DS.card(S, "SHOULD HAVE CRASHED", 760, 300, { size: DS.type.small, t: W(55, 7), tc: "red" });
  DS.vignette(S); }

// Their speed per hour dipped a little. / But their weekly total hit a new record anyway.
{ const S = sc(56, 0, { cam: "push", focus: "1300 480" }); DS.room(S, RELAY);
  const A = chart(S, 160, 200, 780, 560, { kind: "paper", title: "PER HOUR" });
  plot(S, A, [[0, 0.2], [0.25, 0.22], [0.32, 0.4], [0.55, 0.42], [0.62, 0.62], [0.8, 0.66]], undefined, 0, { dot: false });
  plot(S, A, [[0.8, 0.66], [1, 0.58]], W(56, 4), 0.6);
  const B = chart(S, 980, 200, 780, 560, { kind: "paper", title: "PER WEEK" });
  [0.3, 0.38, 0.45, 0.52, 0.6, 0.66, 0.86].forEach((v, i) => { const [x, y0] = B.P(0.05 + i * 0.135, 0), [, y] = B.P(0, v); bar(S, x, y0, 70, y0 - y, i === 6 ? "gold" : "earth", i === 6 ? W(57, 4) : undefined); });
  const [sx, sy] = B.P(0.86, 0.86);
  S.draw(poly(Array.from({ length: 10 }, (_, i) => { const a = -Math.PI / 2 + (i * Math.PI) / 5, r = i % 2 ? 18 : 42; return [sx + 36 + Math.cos(a) * r, sy - 60 + Math.sin(a) * r]; }), 0) + " Z", W(57, 6), 0, { fill: DS.c("gold", 1), c: DS.c("ink"), w: DS.w.detail });
  DS.card(S, "DIPPED A LITTLE", 550, 120, { size: DS.type.small, t: W(56, 4) });
  DS.card(S, "NEW RECORD", 1370, 120, { size: DS.type.body, t: W(57, 6), tc: "red" });
  DS.vignette(S); }

// Something in that room was making them work harder, / and it clearly wasn't the tongue.
{ const S = sc(58, 0, { cam: "push", focus: "960 600" }); DS.room(S, RELAY);
  relayRoom(S, { mood: "determined" });
  S.magnifier(960, 300, 110, W(58, 1), 0, { c: DS.c("ink"), w: DS.w.near });
  S.text("?", 960, 336, { size: DS.type.display, t: W(58, 1), c: DS.c("red", 2) });
  const g = S.grp(); panel(S, 1560, 260, 360, 240, W(59, 4)); sandwich(S, 1560, 290, 0.75, { t: W(59, 4) }); xMark(S, 1560, 260, 1.8, W(59, 5));
  DS.card(S, "NOT THE TONGUE", 420, 200, { size: DS.type.body, t: W(59, 4), tc: "red" });
  DS.vignette(S); }

// Here's a clue. That autumn, at a little party after a medical check-up, the women chatted with the observer.
{ const S = sc(60, 0, { cam: "push", focus: "960 560" }); DS.room(S, RELAY); bunting(S, 100);
  desk(S, 840, 1080, 760, 820); cake(S, 960, 760);
  [260, 500, 740, 1420, 1660].map((x, i) => woman(S, x, 960, "near", i, { mood: "happy", look: x < 960 ? 6 : -6, t: W(60, 13) + i * 0.1 }));
  const O = who(S, 1180, 960, "near", Object.assign({}, OBS, { look: -4, mood: "smile" }));
  DS.card(S, "A CLUE", 380, 380, { size: DS.type.body, t: W(60, 1), tc: "red" });
  DS.card(S, "A LITTLE PARTY", 960, 300, { size: DS.type.small, t: W(60, 8) });
  DS.vignette(S); }

// "Say, he's no boss. We don't have any boss." / When the observer started to reply, another one of them told him to shut up.
{ const S = sc(61, 0, { cam: "push", focus: "1000 520" }); DS.room(S, RELAY); bunting(S, 100);
  desk(S, 840, 1080, 760, 820); cake(S, 960, 760);
  [260, 500, 740, 1420, 1660].map((x, i) => woman(S, x, 960, "near", i, { mood: i === 4 ? "angry" : "happy", look: x < 960 ? 6 : -6 }));
  const O = who(S, 1180, 960, "near", Object.assign({}, OBS, { look: -4, mood: "smile" }));
  const b1 = say(S, 520, 280, 300, 90, 510, 450, ["SAY, HE'S NO BOSS."], W(61, 0)); S.fadeOut(b1, W(62, 3), 0.3);
  const b2 = say(S, 1150, 280, 270, 80, 1180, 450, ["BUT YOU KNOW..."], W(62, 3)); S.fadeOut(b2, W(62, 13), 0.3);
  O.face(W(62, 13), "wow", -4);
  say(S, 1580, 280, 220, 84, 1650, 450, ["SHUT UP."], W(62, 13), { size: DS.type.body });
  DS.vignette(S); }

// Mayo's answer became famous. It wasn't the breaks, the hours or the food.
{ const S = sc(63, 0, { cam: "push", focus: "900 460" }); DS.room(S, RELAY);
  chalk(S, 360, 150, 900, 560);
  [["BREAKS", W(63, 7)], ["HOURS", W(63, 9)], ["FOOD", W(63, 12)]].forEach(([s, t], i) => { txt(S, s, 640, 310 + i * 140, { t: W(63, 4), size: DS.type.title, c: DS.P.white[0] }); xMark(S, 960, 284 + i * 140, 0.9, t); });
  const M = man(S, 1500, 960, "near", 1, Object.assign({}, MAYO, { pose: "pointL", look: -6, mood: "flat" }));
  DS.card(S, "MAYO'S ANSWER", 1500, 360, { size: DS.type.body, t: W(63, 0) });
  DS.vignette(S); }

// The women had become a team, / and the man watching them felt less like a boss and more like a friend.
{ const S = sc(64, 0, { cam: "push", focus: "960 560" }); DS.room(S, RELAY);
  const F = [260, 480, 700, 920, 1140].map((x, i) => woman(S, x, 960, "near", i, { mood: "happy", look: 0, armL: [[-60, 10], [-100, 30]], armR: [[60, 10], [100, 30]] }));
  S.draw(rrect(150, 440, 1100, 500, DS.r.lg), W(64, 4), 0, { c: DS.c("green"), w: DS.w.near });
  DS.card(S, "A TEAM", 700, 340, { size: DS.type.body, t: W(64, 4), tc: "green" });
  const O = who(S, 1560, 960, "near", Object.assign({}, OBS, { look: -6, mood: "smile" }));
  const bc = DS.card(S, "BOSS", 1560, 300, { size: DS.type.body, t: W(65, 9) });
  S.draw(line([1460, 260], [1660, 340], 0), W(65, 10), 0, { c: DS.c("red"), w: DS.w.near });
  DS.card(S, "FRIEND", 1560, 160, { size: DS.type.body, t: W(65, 14), tc: "green" });
  DS.vignette(S); }

// Somebody was paying attention, and they responded. That's the version in the textbooks.
{ const S = sc(66, 0, { cam: "pull", focus: "960 540" }); DS.room(S, { wall: "sand", floor: "wood", window: false });
  const Bk = book(S, 960, 560, 1300, 640, { cover: "navy" });
  eyesPic(S, Bk.L[0] + Bk.L[2] / 2, Bk.L[1] + 200, 380, 160, { paper: false, t: W(66, 2) });
  txt(S, "ATTENTION", Bk.L[0] + Bk.L[2] / 2, Bk.L[1] + 380, { t: W(66, 2), size: DS.type.small });
  const C = chart(S, Bk.R[0], Bk.R[1], Bk.R[2], Bk.R[3] - 60, { kind: "none" });
  plot(S, C, [[0, 0.15], [0.3, 0.35], [0.6, 0.6], [1, 0.9]], W(66, 5), 1.0);
  txt(S, "OUTPUT", Bk.R[0] + Bk.R[2] / 2, Bk.R[1] + Bk.R[3] - 10, { t: W(66, 5), size: DS.type.small });
  arrowR(S, 860, 420, 1060, 420, W(66, 4), { c: "red" });
  DS.card(S, "THE TEXTBOOK VERSION", 960, 140, { size: DS.type.body, t: W(66, 8) });
  DS.vignette(S); }

// But there was one more change in that room, / one that almost nobody mentions. We'll come back to it.
{ const S = sc(67, 0, { cam: "zoom", focus: "1300 680" }); DS.room(S, RELAY);
  relayRoom(S, { mood: "flat" });
  envelope(S, 1410, 700, 0.7, { q: true, t: W(67, 4) });
  S.ring(1410, 700, 100, 70, W(68, 3), 0, { c: DS.c("red"), w: DS.w.near });
  DS.card(S, "ONE MORE CHANGE", 960, 160, { size: DS.type.body, t: W(67, 3), tc: "red" });
  DS.card(S, "LATER", 1410, 440, { size: DS.type.small, t: W(68, 5) });
  DS.vignette(S); }

// ===================== 4. Watching Eyes =====================
// In the nineteen fifties, the idea got a name, / and sociologist Henry Landsberger helped make it famous.
{ const S = sc(69, 0, { cam: "push", focus: "900 520" }); DS.room(S, { wall: "dusk", floor: "wood", window: false });
  const L = man(S, 520, 960, "near", 0, Object.assign({}, LANDS, { look: 6, mood: "smile", pose: "point", t: W(70, 1) }));
  [[1060, 300, -6], [1340, 360, 4], [1600, 300, -2]].forEach(([x, y, a], i) => { const g = S.grp(); const t = W(70, 7) + i * 0.15; paperR(S, x - 130, y - 160, 260, 320, { t, parent: g }); S.text("HAWTHORNE", x, y - 90, { size: DS.type.caption, t, c: DS.c("ink"), parent: g }); S.text("EFFECT", x, y - 44, { size: DS.type.caption, t, c: DS.c("ink"), parent: g }); lines(S, x - 100, y + 10, 200, 4, t, 34, g); g.setAttribute("transform", `rotate(${a} ${x} ${y})`); });
  DS.card(S, "1950s", 330, 140, { size: DS.type.body, t: W(69, 2) });
  DS.card(S, "A NAME", 700, 140, { size: DS.type.body, t: W(69, 8), tc: "red" });
  DS.card(S, "HENRY LANDSBERGER", 520, 486, { size: DS.type.small, t: W(70, 2) });
  DS.vignette(S); }

// The Hawthorne effect. Watch people, and the line goes up.
{ const S = sc(71, 0, { cam: "push", focus: "960 540" }); DS.room(S, { wall: "paper", floor: "gray", window: false });
  DS.card(S, "THE HAWTHORNE EFFECT", 960, 140, { size: DS.type.title, t: W(71, 0), tc: "red" });
  eyesPic(S, 520, 520, 600, 240, { paper: false, t: W(71, 3) });
  txt(S, "WATCH PEOPLE", 520, 760, { t: W(71, 3), size: DS.type.small });
  arrowR(S, 860, 520, 1060, 520, W(71, 5), { c: "red" });
  const C = chart(S, 1120, 300, 600, 480, { kind: "board" });
  plot(S, C, [[0, 0.15], [0.3, 0.32], [0.6, 0.55], [1, 0.88]], W(71, 6), 1.0);
  DS.vignette(S); }

// Management books loved it. One bestseller noted that the best companies seemed to manage by creating an endless stream of Hawthorne effects.
{ const S = sc(72, 0, { cam: "push", focus: "1100 500" }); DS.room(S, { wall: "wall", floor: "wood", window: false });
  spines(S, 300, 700, 600, 4);
  [380, 560, 740].forEach((x, i) => S.heart(x, 160, 0.9, W(72, 2) + i * 0.12, 0, { fill: DS.c("red"), c: DS.c("ink"), w: DS.w.detail }));
  bookCover(S, 1300, 380, 380, 420, ["IN SEARCH OF", "EXCELLENCE"], { name: "red", size: DS.type.caption });
  DS.drop(S, rect(940, 776, 920, 60)); DS.shape(S, rrect(930, 770, 940, 60, DS.r.md), "gray", { tone: 2 });
  [980, 1180, 1380, 1580, 1780].forEach((x) => DS.shape(S, circ(x, 800, 22), "gray", { tone: 1, w: "detail" }));
  const cg = S.grp(); clipTo(cg, rect(930, 560, 940, 220)); const belt = S.grp(cg);
  for (let i = 0; i < 9; i++) { const x = 900 + i * 230, g = S.grp(belt); DS.shape(S, rrect(x, 660, 180, 110, DS.r.sm), "sand", { t: W(72, 15), parent: g }); eyesPic(S, x + 90, 708, 150, 70, { paper: false, t: W(72, 15), parent: g }); }
  tl.fromTo(belt, { attr: { transform: "translate(0 0)" } }, { attr: { transform: "translate(-690 0)" }, duration: Math.max(1, S.end - W(72, 15)), ease: "none" }, W(72, 15));
  DS.card(S, "BESTSELLER", 1300, 122, { size: DS.type.small, t: W(72, 5), tc: "red" });
  DS.card(S, "AN ENDLESS STREAM", 1400, 920, { size: DS.type.small, t: W(72, 16) });
  DS.vignette(S); }

// And it shows up far from factories. / In two thousand fourteen, a Canadian hospital
{ const S = sc(73, 0, { cam: "pull" }); const O = DS.outdoor(S, { hy: 760, sky: "sky", hills: "grass", ground: "gray", sun: [1660, 150] });
  DS.shape(S, rect(460, 260, 1000, 520), "white", { layer: "mid", tone: 2, dir: "h" });
  for (let r = 0; r < 4; r++) for (let c = 0; c < 9; c++) DS.shape(S, rect(510 + c * 104, 300 + r * 100, 64, 60), "glass", { layer: "mid", tone: 2, flat: true, w: "hair" });
  DS.shape(S, rect(860, 640, 200, 140), "glass", { layer: "mid", tone: 1 });
  DS.shape(S, rrect(890, 180, 140, 100, DS.r.sm), "red", { layer: "mid" }); txt(S, "H", 960, 254, { size: DS.type.title, c: DS.P.white[0] });
  DS.card(S, "FAR FROM FACTORIES", 960, 900, { size: DS.type.small, t: W(73, 4) });
  DS.card(S, "2014", 300, 140, { size: DS.type.body, t: W(74, 1) });
  DS.card(S, "A CANADIAN HOSPITAL", 1470, 140, { size: DS.type.small, t: W(74, 5) });
  DS.vignette(S); }

// logged every squirt of hand gel and soap in two wards for eight months,
{ const S = sc(74, 7, { cam: "push", focus: "960 520" }); DS.room(S, HALL); hall(S);
  const N = [[760, 0], [1200, 1]].map(([x, i]) => nurse(S, x, 960, "near", i, { pose: "hold", look: x < 960 ? 6 : -6 }));
  [[880, 470], [1040, 470]].forEach(([x, y], i) => { const t = W(74, 8) + i * 0.4; txt(S, "+1", x, y - 70, { t, size: DS.type.small, c: DS.c("green", 2) }); txt(S, "+1", x, y - 120, { t: t + 0.7, size: DS.type.small, c: DS.c("green", 2) }); });
  DS.card(S, "EVERY SQUIRT", 960, 160, { size: DS.type.body, t: W(74, 9) });
  DS.card(S, "2 WARDS", 300, 300, { size: DS.type.small, t: W(74, 16) });
  DS.card(S, "8 MONTHS", 1620, 300, { size: DS.type.small, t: W(74, 19), tc: "red" });
  DS.vignette(S); }

// and tracked the auditors who walk the halls checking hand washing.
{ const S = sc(75, 0, { cam: "push", focus: "1100 560" }); DS.room(S, HALL); hall(S);
  nurse(S, 700, 960, "near", 2, { pose: "hold", look: 6 });
  const A = auditor(S, 1700, 960, "near", { look: -6 });
  A.walk(S.start, 2.2, {}); S.move(A.all, S.start, 2.2, { x: -340 }, "power1.out");
  ping(S, 1360, 520, W(75, 1));
  DS.card(S, "TRACKED", 1360, 280, { size: DS.type.small, t: W(75, 1), tc: "red" });
  DS.card(S, "AUDITOR", 1360, 160, { size: DS.type.body, t: W(75, 3) });
  DS.vignette(S); }

// When an auditor was in sight, hallway hand washing roughly tripled.
{ const S = sc(76, 0, { cam: "push", focus: "800 560" }); DS.room(S, HALL); hall(S);
  nurse(S, 820, 960, "near", 0, { pose: "hold", look: -6 }); nurse(S, 1060, 960, "near", 1, { pose: "hold", look: -6 });
  const A = auditor(S, 400, 960, "near", { look: 6 });
  S.draw(`M440 580 L760 520 M440 590 L1000 540`, W(76, 3), 0, { c: DS.c("red"), w: DS.w.mid, op: 0.8 }).setAttribute("stroke-dasharray", "18 14");
  panel(S, 1550, 450, 540, 460);
  bar(S, 1360, 590, 110, 70, "gray", W(76, 6)); bar(S, 1630, 590, 110, 210, "red", W(76, 9));
  txt(S, "NO AUDITOR", 1415, 640); txt(S, "AUDITOR", 1685, 640);
  DS.card(S, "ROUGHLY 3×", 1560, 160, { size: DS.type.title, t: W(76, 9), tc: "red" });
  DS.vignette(S); }

// And you don't even need a real person. / In two thousand six, psychologist Melissa Bateson's team at Newcastle University
{ const S = sc(77, 0, { cam: "pull" }); DS.outdoor(S, { hy: 760, sky: "sky", hills: "grass", ground: "grass", sun: [1700, 140] });
  DS.shape(S, rect(560, 260, 1060, 520), "sand", { layer: "mid", tone: 1, dir: "h" });
  for (let c = 0; c < 6; c++) DS.shape(S, `M${620 + c * 170} 520 V380 Q${670 + c * 170} 320 ${720 + c * 170} 380 V520 Z`, "glass", { layer: "mid", tone: 2, w: "hair" });
  DS.shape(S, rrect(800, 590, 580, 80, DS.r.xs), "white", { layer: "mid", w: "detail" }); txt(S, "NEWCASTLE UNIVERSITY", 1090, 644);
  S.draw(circ(330, 760, 60, 150) , W(77, 4), 0, { c: DS.c("gray", 2), w: DS.w.mid }).setAttribute("stroke-dasharray", "14 12");
  txt(S, "?", 330, 790, { t: W(77, 4), size: DS.type.display, c: DS.c("gray", 2) });
  const Bt = who(S, 1560, 960, "near", Object.assign({}, BATESON, { look: -6, mood: "smile", t: W(78, 4) }));
  DS.card(S, "NO REAL PERSON?", 400, 140, { size: DS.type.small, t: W(77, 5), tc: "red" });
  DS.card(S, "2006", 960, 140, { size: DS.type.body, t: W(78, 1) });
  DS.card(S, "MELISSA BATESON", 1500, 480, { size: DS.type.small, t: W(78, 5) });
  DS.vignette(S); }

// ran a test in their own coffee room. / Tea and coffee worked on trust.
{ const S = sc(78, 11, { cam: "push", focus: "960 560" }); DS.room(S, COFFEE); coffeeSet(S);
  priceList(S, 810, 300);
  DS.card(S, "THEIR OWN COFFEE ROOM", 760, 140, { size: DS.type.body, t: W(78, 15) });
  DS.card(S, "ON TRUST", 1300, 420, { size: DS.type.body, t: W(79, 4), tc: "red" });
  DS.vignette(S); }

// You took a drink, and you dropped the money into an honesty box.
{ const S = sc(80, 0, { cam: "zoom", focus: "1100 600" }); DS.room(S, COFFEE);
  desk(S, 160, 1760, 760, 1080, "white");
  const F = psych(S, 460, 960, "near", 1, { mood: "smile", look: 6, pose: "reach", s: 1.25, t: W(80, 0) });
  { const [hx, hy] = F.hand("R"); DS.shape(S, rrect(hx - 4, hy - 56, 50, 60, DS.r.sm), "pink", { w: "detail", parent: F.g }); }
  const [slx, sly] = honesty(S, 1100, 760, 1.6);
  const cg = S.grp(); coin(S, slx, sly - 160, 26, undefined, cg); S.fadeIn(cg, W(80, 6), 0.2); S.move(cg, W(80, 6) + 0.2, 0.6, { y: 150, opacity: 0 }, "power2.in");
  jug(S, 1560, 760, 1.2);
  DS.card(S, "TAKE A DRINK", 460, 160, { size: DS.type.small, t: W(80, 1) });
  DS.vignette(S); }

// Above the price list, they put a picture that changed every week for ten weeks. / Either some flowers, or a pair of eyes.
{ const S = sc(81, 0, { cam: "push", focus: "960 400" }); DS.room(S, COFFEE); coffeeSet(S, { box: false });
  priceList(S, 810, 360, W(81, 2));
  S.draw(rect(720, 180, 480, 140), W(81, 7), 0, { c: DS.c("gray", 2), w: DS.w.mid }).setAttribute("stroke-dasharray", "16 12");
  txt(S, "?", 960, 278, { t: W(81, 7), size: DS.type.title, c: DS.c("gray", 2) });
  const fl = flowersPic(S, 960, 250, 480, 140, { t: W(82, 2) }); S.fadeOut(fl, W(82, 5), 0.3);
  eyesPic(S, 960, 250, 480, 140, { t: W(82, 5) });
  for (let i = 0; i < 10; i++) calI(S, 290 + (i % 5) * 70, 310 + Math.floor(i / 5) * 80, 0.42, null, W(81, 13) + i * 0.05);
  txt(S, "10 WEEKS", 430, 476, { t: W(81, 13), size: DS.type.small });
  DS.vignette(S); }

// In the weeks with eyes, people paid two point seven six times as much, for the same amount of milk.
{ const S = sc(83, 0, { cam: "push", focus: "960 500" }); DS.room(S, COFFEE);
  const C = chart(S, 240, 160, 1180, 680, { kind: "board", title: "PAID PER LITRE OF MILK" });
  const H = [0.82, 0.3, 0.7, 0.28, 0.9, 0.34, 0.74, 0.26, 0.8, 0.32], pts = [];
  H.forEach((v, i) => { const [x, y0] = C.P(0.02 + i * 0.1, 0), [, y] = C.P(0, v); bar(S, x, y0, 70, y0 - y, i % 2 ? "pink" : "sky", W(83, 1) + i * 0.08, C.g); pts.push([0.02 + i * 0.1 + 35 / (C.x1 - C.x0), v]); (i % 2 ? flowersI : eyesI)(S, x + 35, y0 + 30, W(83, 1) + i * 0.08); });
  plot(S, C, pts, W(83, 6), 1.2);
  jug(S, 1620, 860, 1.3, W(83, 16)); txt(S, "SAME MILK", 1620, 640, { t: W(83, 16), size: DS.type.small });
  DS.card(S, "2.76×", 1620, 300, { size: DS.type.title, t: W(83, 7), tc: "red" });
  txt(S, "AS MUCH", 1620, 410, { t: W(83, 11), size: DS.type.small, c: DS.c("red", 2) });
  DS.vignette(S); }

// Nobody was watching them. The eyes were printed on paper.
{ const S = sc(84, 0, { cam: "zoom", focus: "960 300" }); DS.room(S, COFFEE); coffeeSet(S);
  priceList(S, 810, 360);
  const g = eyesPic(S, 960, 250, 480, 140);
  S.fill("M1200 320 L1200 270 Q1170 300 1150 320 Z", W(84, 7), 0, DS.c("paper", 2), 1);
  [[740, 182], [1180, 182]].forEach(([x, y]) => DS.shape(S, rect(x - 24, y - 10, 48, 20), "yellow", { tone: 1, flat: true, w: "hair", op: 0.9, t: W(84, 7) }));
  DS.card(S, "NOBODY WATCHING", 440, 140, { size: DS.type.small, t: W(84, 0) });
  DS.card(S, "JUST PAPER", 1440, 140, { size: DS.type.body, t: W(84, 7), tc: "red" });
  DS.vignette(S); }

// A department full of psychologists, paying extra because a printout was looking at them.
{ const S = sc(85, 0, { cam: "push", focus: "960 500" }); DS.room(S, COFFEE);
  eyesPic(S, 960, 210, 480, 140);
  const xs = [380, 660, 1260, 1540];
  xs.forEach((x, i) => { const F = psych(S, x, 960, "near", i, { look: 0, mood: "worried", pose: i === 1 ? "reach" : "hold", t: W(85, 1) + i * 0.1 }); if (i === 2) sweat(S, F, W(85, 11)); });
  desk(S, 790, 1130, 780, 900, "white"); const [slx, sly] = honesty(S, 960, 780, 1.0);
  [0, 1, 2].forEach((i) => { const cg = S.grp(); coin(S, slx + (i - 1) * 30, sly - 120, 18, undefined, cg); S.fadeIn(cg, W(85, 5) + i * 0.35, 0.15); S.move(cg, W(85, 5) + i * 0.35 + 0.15, 0.5, { y: 110, opacity: 0 }, "power2.in"); });
  DS.card(S, "PSYCHOLOGISTS", 520, 400, { size: DS.type.small, t: W(85, 4) });
  DS.card(S, "PAYING EXTRA", 1400, 400, { size: DS.type.small, t: W(85, 5), tc: "red" });
  DS.vignette(S); }

// Dave printed a pair of eyes and taped them to his monitor. / He has never worked harder. He has also never felt so judged.
{ const S = sc(86, 0, { cam: "push", focus: "960 560" }); DS.room(S, Object.assign({ back: [160, 40, 1760, 820] }, OFFICE));
  const { F, B } = daveClose(S); email(S, B);
  paperEyes(S, B, { t: W(86, 7) });
  F.face(W(87, 0), "determined", 7); fast(S, CU.x, CU.top - 30, W(87, 2));
  F.face(W(87, 8), "worried", 7); sweat(S, F, W(87, 9));
  DS.card(S, "NEVER WORKED HARDER", 960, 110, { size: DS.type.small, t: W(87, 2) });
  DS.card(S, "NEVER FELT SO JUDGED", 470, 300, { size: DS.type.small, t: W(87, 8), tc: "red" });
  DS.vignette(S); }

// So that settles it, right? Watch people, even with paper, and the line goes up.
{ const S = sc(88, 0, { cam: "push", focus: "960 500" }); DS.room(S, OFFICE);
  panel(S, 960, 500, 1500, 640);
  boss(S, 400, { look: 6, s: 1.1 }).all.setAttribute("transform", "translate(0 -60)");
  eyesPic(S, 760, 440, 260, 110, { t: W(88, 7) });
  arrowR(S, 920, 500, 1060, 500, W(88, 10), { c: "red" });
  const C = chart(S, 1100, 260, 560, 440, { kind: "none" });
  plot(S, C, [[0, 0.15], [0.3, 0.32], [0.6, 0.55], [1, 0.9]], W(88, 11), 0.9);
  stamp(S, 960, 860, "CASE CLOSED?", W(88, 2));
  DS.vignette(S); }

// ===================== 5. The Missing Data =====================
// Well, not quite. For decades, the light experiment's data were believed to be destroyed.
{ const S = sc(89, 0, { cam: "push", focus: "960 500" }); DS.room(S, { wall: "sand", floor: "gray", window: false });
  shelfBooks(S, 360, 820, 1200, 5, [2, 5]);
  S.draw(rect(874, 470, 84, 90), W(89, 5), 0, { c: DS.c("red"), w: DS.w.mid }).setAttribute("stroke-dasharray", "10 8");
  DS.card(S, "NOT QUITE", 960, 110, { size: DS.type.body, t: W(89, 1), tc: "red" });
  DS.card(S, "LIGHT DATA: DESTROYED?", 960, 900, { size: DS.type.small, t: W(89, 10) });
  DS.vignette(S); }

// In two thousand eleven, Chicago economists Steven Levitt and John List published the first real analysis,
{ const S = sc(90, 0, { cam: "push", focus: "960 520" }); DS.room(S, { wall: "glass", floor: "gray", window: [1380, 160, 220, 190] });
  const A = man(S, 640, 960, "near", 0, Object.assign({}, LEVITT, { look: 6, mood: "smile", t: W(90, 6) }));
  const B = man(S, 1280, 960, "near", 1, Object.assign({}, LIST, { look: -6, mood: "smile", pose: "hold", t: W(90, 9) }));
  const [hx, hy] = B.hand("R"); paperR(S, hx - 70, hy - 110, 140, 170, { t: W(90, 11) }); S.draw(poly([[hx - 50, hy + 30], [hx - 20, hy - 10], [hx + 10, hy], [hx + 50, hy - 60]], 0), W(90, 11), 0, { c: DS.c("red"), w: DS.w.mid });
  DS.card(S, "2011 · CHICAGO ECONOMISTS", 960, 140, { size: DS.type.small, t: W(90, 3) });
  DS.card(S, "STEVEN LEVITT", 640, 480, { size: DS.type.small, t: W(90, 6) });
  DS.card(S, "JOHN LIST", 1280, 480, { size: DS.type.small, t: W(90, 9) });
  DS.vignette(S); }

// from charts they'd found on old microfilm. / Every lighting change had been made on a Sunday, the one day the factory was closed.
{ const S = sc(91, 0, { cam: "push", focus: "960 460" }); DS.room(S, { wall: "glass", floor: "gray", window: false });
  const B = reader(S, 960, 960, 1000, 520);
  const G = weekGrid(S, B, W(92, 0));
  G.ys.forEach((y, i) => bulbI(S, G.sx, y + 6, 1.0, 1, W(92, 8) + i * 0.15));
  S.draw(rrect(G.sx - G.cw / 2 - 6, B.y0 + 70, G.cw + 12, B.y1 - B.y0 - 70, DS.r.sm), W(92, 8), 0, { c: DS.c("yellow", 1), w: DS.w.near });
  DS.card(S, "OLD MICROFILM", 400, 140, { size: DS.type.small, t: W(91, 5) });
  DS.card(S, "SUNDAY: FACTORY CLOSED", 1300, 120, { size: DS.type.small, t: W(92, 9), tc: "red" });
  DS.vignette(S); }

// And output jumped at the start of every week, / whether the lights had changed or not.
{ const S = sc(93, 0, { cam: "push", focus: "960 480" }); DS.room(S, { wall: "glass", floor: "gray", window: false });
  const C = chart(S, 200, 150, 1520, 660, { kind: "board", title: "OUTPUT, DAY BY DAY", xpad: 120 });
  const pts = [];
  for (let w = 0; w < 4; w++) for (let d = 0; d < 6; d++) pts.push([(w * 7 + d) / 27, 0.78 - d * 0.085 + ((w * 3 + d) % 4) * 0.015]);
  plot(S, C, pts, W(93, 1), 2.4);
  [0, 1, 2, 3].forEach((w) => { const [x] = C.P((w * 7) / 27, 0); txt(S, "MON", x, C.y1 + 50, { t: W(93, 4), size: DS.type.caption, c: DS.c("red", 2) }); });
  [1, 3].forEach((w) => { const [x] = C.P((w * 7 - 1) / 27, 0); bulbI(S, x, C.y1 - 36, 0.8, 1, W(94, 1)); });
  DS.card(S, "EVERY WEEK", 1500, 260, { size: DS.type.body, t: W(93, 7), tc: "red" });
  DS.card(S, "LIGHTS CHANGED OR NOT", 1300, 880, { size: DS.type.small, t: W(94, 2) });
  DS.vignette(S); }

// The famous pattern wasn't the light. It was the day off.
{ const S = sc(95, 0, { cam: "push", focus: "1200 600" }); DS.outdoor(S, { hy: 700, sky: "sky", hills: "grass", ground: "grass", sun: [1600, 160] });
  const g = S.grp(); panel(S, 420, 380, 400, 400);
  bulbI(S, 420, 380, 3.4, 1); xMark(S, 420, 360, 2.6, W(95, 4));
  deckChair(S, 1280, 920);
  const F = worker(S, 1270, 820, "near", 3, { sit: true, s: 1.05, mood: "sleep", pose: "head", look: 0, gs: 920 });
  S.zzz(1400, 470, W(95, 9), 0.6);
  DS.card(S, "NOT THE LIGHT", 420, 660, { size: DS.type.small, t: W(95, 4), tc: "red" });
  DS.card(S, "THE DAY OFF", 1280, 230, { size: DS.type.title, t: W(95, 8), tc: "green" });
  DS.vignette(S); }

// The remarkable patterns in the textbooks, they wrote, were entirely fictional. / They did find hints of something real, just much smaller.
{ const S = sc(96, 0, { cam: "push", focus: "1200 500" }); DS.room(S, { wall: "sand", floor: "wood", window: false });
  const Bk = book(S, 960, 560, 1300, 640, { cover: "navy" });
  const L = chart(S, Bk.L[0], Bk.L[1], Bk.L[2], Bk.L[3] - 40, { kind: "none" });
  plot(S, L, [[0, 0.1], [0.25, 0.4], [0.5, 0.62], [0.75, 0.82], [1, 0.98]]);
  txt(S, "REMARKABLE!", Bk.L[0] + Bk.L[2] / 2, Bk.L[1] + 40, { size: DS.type.small });
  stamp(S, Bk.L[0] + Bk.L[2] / 2, Bk.L[1] + 300, "ENTIRELY FICTIONAL", W(96, 9));
  const R = chart(S, Bk.R[0], Bk.R[1], Bk.R[2], Bk.R[3] - 40, { kind: "none", t: W(97, 2) });
  plot(S, R, [[0, 0.3], [0.4, 0.32], [0.6, 0.36], [1, 0.38]], W(97, 3), 1.0, { w: DS.w.mid });
  S.magnifier(Bk.R[0] + Bk.R[2] * 0.62, Bk.R[1] + Bk.R[3] * 0.62, 90, W(97, 5), 0, { c: DS.c("ink"), w: DS.w.near });
  DS.card(S, "MUCH SMALLER", 1300, 140, { size: DS.type.body, t: W(97, 8), tc: "red" });
  DS.vignette(S); }

// And the relay room? Remember the change that almost nobody mentions? It was their pay.
{ const S = sc(98, 0, { cam: "zoom", focus: "1300 680" }); DS.room(S, RELAY);
  relayRoom(S, { mood: "flat" });
  const e = envelope(S, 1410, 700, 0.7, { q: true }); S.fadeOut(e, W(98, 11), 0.3);
  S.ring(1410, 700, 100, 70, W(98, 4), 0, { c: DS.c("red"), w: DS.w.near });
  envelope(S, 1410, 700, 0.7, { t: W(98, 11) }); coins(S, 1410, 690, 6, W(98, 12));
  DS.card(S, "THE ONE NOBODY MENTIONS", 960, 160, { size: DS.type.small, t: W(98, 4) });
  DS.card(S, "THEIR PAY", 1500, 320, { size: DS.type.title, t: W(98, 13), tc: "red" });
  DS.vignette(S); }

// In the main department, their earnings depended on a group of about a hundred.
{ const S = sc(99, 0, { cam: "push", focus: "960 520" }); DS.room(S, SHOP);
  panel(S, 960, 530, 1240, 600);
  for (let i = 0; i < 100; i++) mini(S, 420 + (i % 20) * 57, 360 + Math.floor(i / 20) * 105, 0.9, { t: W(99, 9) + i * 0.008, fill: DS.c(i === 47 ? "purple" : "gray", 1), bun: i % 3 === 0 });
  S.ring(420 + 7 * 57, 360 + 2 * 105 - 40, 40, 60, W(99, 13), 0, { c: DS.c("red"), w: DS.w.mid });
  DS.card(S, "MAIN DEPARTMENT", 960, 130, { size: DS.type.body, t: W(99, 2) });
  DS.card(S, "A GROUP OF ~100", 960, 890, { size: DS.type.small, t: W(99, 11), tc: "red" });
  DS.vignette(S); }

// In the test room, a group of five. Every extra relay now showed up in their pay.
{ const S = sc(100, 0, { cam: "push", focus: "960 520" }); DS.room(S, RELAY);
  panel(S, 960, 540, 1240, 600);
  for (let i = 0; i < 5; i++) mini(S, 560 + i * 200, 640, 3.0, { t: W(100, 5) + i * 0.1, fill: DS.c(WC[i], 1), bun: true });
  relay(S, 640, 790, 0.6, { t: W(100, 9) }); arrowR(S, 760, 790, 1080, 790, W(100, 12), { c: "red" }); coins(S, 1240, 810, 6, W(100, 15));
  DS.card(S, "TEST ROOM: A GROUP OF 5", 960, 130, { size: DS.type.body, t: W(100, 4) });
  DS.card(S, "EXTRA RELAY = EXTRA PAY", 960, 895, { size: DS.type.small, t: W(100, 14), tc: "red" });
  DS.vignette(S); }

// Two women who chatted a lot and fell behind were swapped out.
{ const S = sc(101, 0, { cam: "push", focus: "800 560" }); DS.room(S, RELAY);
  const F = relayRoom(S, { mood: "determined", ids: [0, 1, 2, 3, 4] });
  [0, 1].forEach((i) => { const b = say(S, RX[i] + 30, 330, 110, 60, RX[i] + 10, 440, ["..."], W(101, 3) + i * 0.2, { size: DS.type.body }); S.fadeOut(b, W(101, 9), 0.3); S.fadeOut(F[i].all, W(101, 9), 0.4); });
  [0, 1].forEach((i) => seated(S, RX[i], RB.top, "near", { mood: "determined", look: 0, t: W(101, 10) + i * 0.15 }, (S2, x2, g2, L2, oo) => woman(S2, x2, g2, L2, 5 + i, oo)));
  desk(S, RB.x0, RB.x1, RB.top); RX.forEach((x) => relay(S, x + 74, RB.top - 16, 0.3));
  DS.card(S, "FELL BEHIND", 560, 160, { size: DS.type.small, t: W(101, 7) });
  DS.card(S, "SWAPPED OUT", 1300, 160, { size: DS.type.body, t: W(101, 10), tc: "red" });
  DS.vignette(S); }

// And once, they slowed down on purpose, to get their breaks back. / They knew they were being watched, and they used it.
{ const S = sc(102, 0, { cam: "push", focus: "960 560" }); DS.room(S, RELAY);
  const C = chart(S, 1180, 90, 520, 300, { kind: "paper", layer: "mid" });
  plot(S, C, [[0, 0.3], [0.4, 0.6], [0.6, 0.66]], undefined, 0, { dot: false });
  plot(S, C, [[0.6, 0.66], [0.8, 0.4], [1, 0.38]], W(102, 3), 0.8);
  const F = relayRoom(S, { mood: "smile", ids: [5, 6, 2, 3, 4], look: 0 });
  who(S, 170, 960, "near", Object.assign({}, OBS, { look: 6, mood: "flat", pose: "hold" }));
  F.forEach((f) => f.face(W(103, 1), "smile", -8));
  DS.card(S, "ON PURPOSE", 1440, 450, { size: DS.type.small, t: W(102, 5), tc: "red" });
  DS.card(S, "THEY USED IT", 660, 200, { size: DS.type.body, t: W(103, 7), tc: "red" });
  DS.vignette(S); }

// So is the Hawthorne effect just a myth? / In two thousand fourteen, Jim McCambridge's team
{ const S = sc(104, 0, { cam: "push", focus: "800 520" }); DS.room(S, { wall: "glass", floor: "gray", window: false });
  bookCover(S, 620, 460, 380, 500, ["THE", "HAWTHORNE", "EFFECT"]);
  stamp(S, 620, 700, "JUST A MYTH?", W(104, 6));
  const M = who(S, 1380, 960, "near", Object.assign({}, MCCAM, { look: -6, mood: "flat", pose: "think", t: W(105, 4) }));
  DS.card(S, "2014", 1380, 160, { size: DS.type.body, t: W(105, 1) });
  DS.card(S, "JIM McCAMBRIDGE'S TEAM", 1380, 470, { size: DS.type.small, t: W(105, 4) });
  DS.vignette(S); }

// reviewed nineteen studies built to test it. / Most found something, but it varied so much that there's no single Hawthorne effect.
{ const S = sc(105, 7, { cam: "pull", focus: "960 520" }); DS.room(S, { wall: "glass", floor: "gray", window: false });
  const SH = [[[0, 0.2], [1, 0.9]], [[0, 0.4], [1, 0.5]], [[0, 0.3], [0.5, 0.6], [1, 0.4]], [[0, 0.5], [1, 0.45]], [[0, 0.2], [1, 0.6]], [[0, 0.6], [0.5, 0.3], [1, 0.7]], [[0, 0.3], [1, 0.35]], [[0, 0.1], [0.6, 0.7], [1, 0.8]]];
  for (let i = 0; i < 19; i++) { const r = Math.floor(i / 5), c = i % 5, cx = 380 + c * 290 + (r === 3 ? 145 : 0), cy = 300 + r * 186; miniChart(S, cx, cy, SH[(i * 3) % 8], W(105, 8) + i * 0.04); if (i % 4 !== 3) tick(S, cx + 86, cy - 50, 0.5, W(106, 1) + i * 0.03); }
  DS.card(S, "19 STUDIES", 380, 120, { size: DS.type.body, t: W(105, 8) });
  DS.card(S, "NO SINGLE HAWTHORNE EFFECT", 1150, 120, { size: DS.type.small, t: W(106, 10), tc: "red" });
  DS.vignette(S); }

// And that hospital had one more detail. Inside the patient rooms, nothing changed. / The effect stayed in the hallway.
{ const S = sc(107, 0, { cam: "push", focus: "960 500" }); DS.room(S, HALL);
  DS.shape(S, rect(460, 120, 500, 640), "white", { layer: "mid", tone: 0, dir: "v" });
  DS.shape(S, rrect(540, 610, 340, 100, DS.r.sm), "sky", { layer: "mid", tone: 1 }); DS.shape(S, rrect(550, 570, 90, 50, DS.r.sm), "white", { layer: "mid", w: "detail" }); [560, 860].forEach((x) => DS.shape(S, rect(x, 710, 14, 50), "gray", { layer: "mid", tone: 2, w: "hair" }));
  DS.shape(S, rect(950, 120, 24, 900), "gray", { tone: 2 });
  dispenser(S, 1220, 470);
  auditor(S, 1560, 960, "near", { look: -6 }); nurse(S, 1200, 960, "near", 0, { pose: "hold", look: 6 });
  const A = panel(S, 710, 280, 380, 220, W(107, 7)); const CA = chart(S, 520, 170, 380, 220, { kind: "none", t: W(107, 7) });
  plot(S, CA, [[0, 0.4], [1, 0.42]], W(107, 11), 0.7, { w: DS.w.mid, c: DS.c("gray", 2) });
  const B = panel(S, 1340, 280, 380, 220, W(108, 1)); const CB = chart(S, 1150, 170, 380, 220, { kind: "none", t: W(108, 1) });
  plot(S, CB, [[0, 0.2], [0.5, 0.25], [0.6, 0.85], [1, 0.88]], W(108, 2), 0.8, { w: DS.w.mid });
  DS.card(S, "PATIENT ROOMS: NO CHANGE", 710, 470, { size: DS.type.caption, t: W(107, 11) });
  DS.card(S, "HALLWAY: ~3×", 1340, 470, { size: DS.type.small, t: W(108, 4), tc: "red" });
  DS.vignette(S); }

// Even the paper eyes have wobbled. In lab games, they barely make people more generous, / though they may still cut littering.
{ const S = sc(109, 0, { cam: "push", focus: "960 400" }); DS.room(S, { wall: "wall", floor: "wood", window: false });
  const e = eyesPic(S, 960, 200, 480, 140); wobble(S, e, 960, 130, W(109, 3), 2.0, 5);
  panel(S, 520, 640, 640, 420, W(109, 6));
  [400, 640].forEach((x, i) => mini(S, x, 760, 2.0, { t: W(109, 6), fill: DS.c(["orange", "green"][i], 1) }));
  coin(S, 520, 700, 18, W(109, 10)); txt(S, "LAB GAMES: BARELY", 520, 492, { t: W(109, 6), size: DS.type.small });
  panel(S, 1400, 640, 640, 420, W(110, 0));
  bin(S, 1400, 800, 1.0); eyesPic(S, 1400, 560, 220, 70, { t: W(110, 0) });
  [[1220, 800], [1300, 820]].forEach(([x, y], i) => { const p = DS.shape(S, rrect(x, y - 14, 34, 18, DS.r.xs), "white", { w: "hair", t: W(110, 0) }); S.fadeOut(p, W(110, 4) + i * 0.2, 0.4); });
  txt(S, "LITTER: MAYBE LESS", 1400, 492, { t: W(110, 0), size: DS.type.small });
  DS.vignette(S); }

// Being watched does change us, but not like the legend, and not everywhere.
{ const S = sc(111, 0, { cam: "push", focus: "960 520" }); DS.room(S, { wall: "paper", floor: "gray", window: false });
  const C = chart(S, 400, 200, 1120, 640, { kind: "board" });
  const lg = S.grp(); plot(S, C, [[0, 0.1], [0.3, 0.4], [0.6, 0.7], [1, 0.98]], undefined, 0, { dot: false, parent: lg, c: DS.c("gray", 2) });
  txt(S, "THE LEGEND", C.P(0.6, 0)[0] - 120, C.P(0, 0.9)[1], { size: DS.type.small, c: DS.c("gray", 2), parent: lg });
  S.move(lg, W(111, 6), 0.5, { opacity: 0.22 }, "power1.out");
  plot(S, C, [[0, 0.1], [0.4, 0.14], [0.7, 0.2], [1, 0.24]], W(111, 6), 0.8);
  DS.card(S, "NOT LIKE THE LEGEND", 960, 120, { size: DS.type.body, t: W(111, 6), tc: "red" });
  DS.card(S, "NOT EVERYWHERE", 1300, 520, { size: DS.type.small, t: W(111, 11) });
  DS.vignette(S); }

// It changes what we do in the hallway, / wherever we think someone can see.
{ const S = sc(112, 0, { cam: "push", focus: "960 560" }); DS.room(S, { wall: "glass", floor: "gray", window: false, back: [460, 120, 1460, 760] });
  [[520, 0], [1200, 1]].forEach(([x, i]) => { DS.shape(S, rect(x - 10, 350, 220, 410), "white", { layer: "mid", tone: 2 }); DS.shape(S, rect(x, 360, 200, 400), i ? "glass" : "wood", { layer: "mid", tone: i ? 1 : 0, dir: "h" }); });
  const Bo = boss(S, 1300, { look: -6 });
  const D = dave(S, 760, 960, "near", { mood: "determined", look: 6 });
  S.draw(`M${1300 - 30} 520 L880 560 M${1300 - 30} 530 L860 760`, W(113, 2), 0, { c: DS.c("red"), w: DS.w.mid, op: 0.85 }).setAttribute("stroke-dasharray", "18 14");
  DS.card(S, "THE HALLWAY", 760, 160, { size: DS.type.body, t: W(112, 6) });
  DS.card(S, "WHEREVER SOMEONE CAN SEE", 1240, 280, { size: DS.type.small, t: W(113, 0), tc: "red" });
  DS.vignette(S); }

// ===================== 6. Nobody's Watching =====================
// In nineteen seventy-six, test room worker Theresa Layman Zajac looked back.
{ const S = sc(114, 0, { cam: "push", focus: "800 560" }); DS.room(S, { wall: "dusk", floor: "wood", window: [1360, 160, 220, 200] });
  DS.shadow(S, 760, 960, 520); DS.shape(S, rrect(520, 520, 480, 300, DS.r.lg), "purple", { tone: 2 }); DS.shape(S, rrect(480, 700, 560, 180, DS.r.md), "purple"); [500, 1000].forEach((x) => DS.shape(S, rrect(x - 40, 640, 80, 220, DS.r.md), "purple"));
  const Z = who(S, 760, 780, "near", Object.assign({}, ZAJAC, { sit: true, pose: "hold", look: 6, mood: "smile", gs: 960 }));
  const [hx, hy] = Z.hand("R");
  const g = S.grp(), fx = hx + 50; DS.shape(S, rrect(fx - 10, hy - 120, 220, 160, DS.r.xs), "wood", { w: "detail", parent: g }); DS.shape(S, rect(fx + 4, hy - 106, 192, 132), "sand", { flat: true, w: "hair", parent: g }); for (let i = 0; i < 5; i++) mini(S, fx + 30 + i * 36, hy, 0.9, { fill: DS.c(WC[i], 1), bun: true, parent: g });
  DS.card(S, "1976", 340, 140, { size: DS.type.body, t: W(114, 1) });
  DS.card(S, "TEST ROOM WORKER", 900, 140, { size: DS.type.small, t: W(114, 3) });
  DS.card(S, "THERESA LAYMAN ZAJAC", 900, 300, { size: DS.type.small, t: W(114, 6), tc: "red" });
  DS.vignette(S); }

// "I had no idea there would be so much happening and so many people watching us."
{ const S = sc(115, 0, { cam: "push", focus: "960 600" }); DS.room(S, RELAY);
  relayRoom(S, { mood: "flat", look: 0 });
  const xs = [200, 1720, 555, 1365, 825, 1095];
  xs.forEach((x, i) => { const F = man(S, x, 800, "mid", i, { mood: "flat", look: x < 960 ? 6 : -6, t: W(115, 9) + i * 0.25, pose: "hold" }); });
  DS.card(S, "SO MANY PEOPLE WATCHING", 960, 120, { size: DS.type.body, t: W(115, 12), tc: "red" });
  DS.vignette(S); }

// The tape counted every relay they made. / And one of them remembered what it didn't count.
{ const S = sc(116, 0, { cam: "push", focus: "960 500" }); DS.room(S, RELAY);
  const T = tapeStrip(S, 100, 380, 1720, 260, { scroll: 260, gap: 56, gapAt: [16, 20], seed: 2 });
  S.text("?", 100 + 28 + 18 * 56, 550, { size: DS.type.display, t: W(117, 5), c: DS.c("red", 2), parent: T.holes });
  DS.card(S, "COUNTED EVERY RELAY", 960, 180, { size: DS.type.body, t: W(116, 2) });
  DS.card(S, "WHAT IT DIDN'T COUNT?", 960, 800, { size: DS.type.body, t: W(117, 5), tc: "red" });
  DS.vignette(S); }

// "We've been the best friends since the day we were in the test room."
{ const S = sc(118, 0, { cam: "push", focus: "960 560" }); DS.room(S, RELAY);
  [420, 690, 960, 1230, 1500].forEach((x, i) => woman(S, x, 960, "near", i, { mood: "happy", look: i < 2 ? 4 : i > 2 ? -4 : 0, armL: [[-70, 0], [-128, 26]], armR: [[70, 0], [128, 26]] }));
  [[700, 330], [960, 290], [1220, 330]].forEach(([x, y], i) => S.heart(x, y, 1.0, W(118, 3) + i * 0.15, 0, { fill: DS.c("red"), c: DS.c("ink"), w: DS.w.detail }));
  DS.card(S, "BEST FRIENDS", 960, 150, { size: DS.type.title, t: W(118, 3), tc: "green" });
  DS.vignette(S); }

// Tomorrow, the footsteps will come, and Dave will sit up straight. Everyone has a hallway.
{ const S = sc(119, 0, { cam: "push", focus: "800 560" }); DS.room(S, OFFICE); const C = office(S);
  plot(S, C, LINE_DAVE);
  steps(S, 40, 380, 846, 6, W(119, 2), { dt: 0.2 });
  boss(S, 520, { look: 6, t: W(119, 2) + 0.6 });
  const { F, B } = daveDesk(S); email(S, B);
  F.face(W(119, 8), "determined", -4);
  DS.card(S, "TOMORROW", 900, 280, { size: DS.type.small, t: W(119, 0) });
  DS.card(S, "EVERYONE HAS A HALLWAY", 960, 890, { size: DS.type.small, t: W(119, 11), tc: "red" });
  DS.vignette(S); }

// But footsteps fade. Who you are when nobody's watching / is whatever happens after they do.
{ const S = sc(120, 0, { cam: "pull", focus: "800 560" }); DS.room(S, OFFICE); const C = office(S);
  plot(S, C, LINE_DAVE);
  const fp = steps(S, 40, 380, 846, 6); S.fadeOut(fp, W(120, 1), 0.6);
  const Bo = boss(S, 520, { look: 6 }); S.fadeOut(Bo.all, W(120, 1), 0.5);
  const { F, B } = daveDesk(S, { f: { mood: "determined" } }); email(S, B);
  F.face(W(120, 3), "flat", 6);
  DS.card(S, "WHEN NOBODY'S WATCHING", 960, 890, { size: DS.type.small, t: W(120, 7) });
  DS.vignette(S); }

// Tonight, Dave is the last one in the office. No boss, no footsteps, no paper eyes.
{ const S = sc(122, 0, { cam: "push", focus: "860 560" }); DS.room(S, NIGHT); const C = office(S, { night: true });
  plot(S, C, LINE_DAVE, undefined, 0, { c: DS.c("red", 1) });
  const { F, B } = daveDesk(S, { night: true }); email(S, B);
  const pe = paperEyes(S, B); S.fadeOut(pe, W(122, 13), 0.4);
  deskLamp(S);
  [[620, W(122, 9), "NO BOSS"], [960, W(122, 11), "NO FOOTSTEPS"], [1340, W(122, 13), "NO PAPER EYES"]].forEach(([x, t, s]) => DS.card(S, s, x, 880, { size: DS.type.caption, t }));
  DS.card(S, "THE LAST ONE IN", 520, 200, { size: DS.type.small, t: W(122, 3) });
  DS.vignette(S, 0.2); }

// He finishes the email he's been avoiding all week, and nobody will ever know.
{ const S = sc(123, 0, { cam: "push", focus: "1000 560" }); DS.room(S, Object.assign({ back: [160, 40, 1760, 820] }, NIGHT));
  const { F, B } = daveClose(S, { night: true, f: { mood: "determined" } }); email(S, B, { lineT: W(123, 1) });
  const sb = S.grp(); DS.shape(S, rrect(B.x1 - 230, B.y1 - 90, 200, 64, DS.r.sm), "green", { t: W(123, 8), parent: sb }); S.text("SENT", B.x1 - 130, B.y1 - 44, { size: DS.type.caption, t: W(123, 8), c: DS.P.white[0], parent: sb });
  F.face(W(123, 8), "smile", 7);
  DS.card(S, "AVOIDING IT ALL WEEK", 960, 110, { size: DS.type.small, t: W(123, 6) });
  DS.card(S, "NOBODY WILL EVER KNOW", 470, 300, { size: DS.type.small, t: W(123, 10), tc: "green" });
  DS.vignette(S, 0.18); }

// His line goes up a little, and nobody's counting. / That's the part that counts.
{ const S = sc(124, 0, { cam: "pull", focus: "1200 400" }); DS.room(S, NIGHT); const C = office(S, { night: true, title: null });
  plot(S, C, [[0, 0.3], [0.7, 0.32]], undefined, 0, { dot: false });
  plot(S, C, [[0.7, 0.32], [1, 0.46]], W(124, 1), 1.2, { c: DS.c("green") });
  const { F, B } = daveDesk(S, { night: true, f: { mood: "smile", look: -3 } }); email(S, B);
  deskLamp(S);
  txt(S, "NOBODY'S", 1360, 205, { t: W(124, 7), c: DS.c("gray", 2) }); txt(S, "COUNTING", 1360, 250, { t: W(124, 7), c: DS.c("gray", 2) });
  DS.card(S, "THE PART THAT COUNTS", 680, 200, { size: DS.type.body, t: W(125, 1), tc: "green" });
  DS.vignette(S, 0.2); }
