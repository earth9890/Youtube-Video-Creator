// look: still
// The Bystander Effect (~9:30). Mystery: would a crowd help Dave, and was the famous "38" true? Illustrated stills, progressive changes on the spoken word.
// Runner: Dave's hand tally counter + the number 38 (counts to 38 -> the 1964 page -> 1 vs 5 -> 37 -> 16 / 9 in 10 -> back on the street, he points at ONE).
// Real people are name cards or labelled generic figures, never likenesses. The 1964 case is shown only through symbols: windows, a front page, a phone, a lit doorway, a candle.

// ---------- people ----------
// a figure on a depth plane; shadow and body share one group (F.all) so they fade together. o.gs = shadow y (kneeling figures)
const who = (S, x, gy, layer = "near", o = {}) => {
  const s = (o.s || 1.1) * DS.depth[layer].s, g = o.parent || S.grp();
  DS.shadow(S, x, o.gs ?? gy, 150 * s, { t: o.t, parent: g });
  const F = S.fig(x, gy, Object.assign({ hair: "short", outfit: "tee" }, o, { s, parent: g, w: DS.w[DS.depth[layer].w] * 1.3 * Math.sqrt(s) })).draw(o.t ?? S.start, 0.4);
  F.face(o.t ?? S.start, o.mood || "flat", o.look || 0);
  F.all = g;
  return F;
};
const dave = (S, x, gy, layer = "near", o = {}) => who(S, x, gy, layer, Object.assign({ s: 1.1, hair: "side", hairC: DS.c("brown"), outfitC: DS.c("blue") }, o));
const CLICK = [[44, 12], [74, -18]]; // right arm raised, holding the counter up
const OC = ["green", "purple", "orange", "pink", "gold", "red", "earth", "gray", "yellow"]; // no blue: blue is Dave's (and the blue jacket's)
const HAIR = ["short", "bun", "curly", "side", "messy", "short", "bun", "curly"];
const HC = [["brown", 0], ["ink", 0], ["gray", 1], ["earth", 2], ["brown", 2], ["gray", 2], ["earth", 0], ["ink", 1]];
const person = (S, x, gy, layer, i, o = {}) => who(S, x, gy, layer, Object.assign({ s: 1.1, hair: HAIR[i % 8], hairC: DS.c(HC[i % 8][0], HC[i % 8][1], layer), outfitC: DS.c(OC[i % 9], 0, layer), mood: "flat", look: ((i % 3) - 1) * 5 }, o));
const crowdRow = (S, n, x0, x1, gy, layer, o = {}) => {
  const F = [];
  for (let i = 0; i < n; i++) {
    if ((o.skip || []).includes(i)) continue;
    const x = x0 + (n > 1 ? (i * (x1 - x0)) / (n - 1) : 0);
    F.push(person(S, x, gy + ((i * 7) % 3) * 6, layer, i + (o.k || 0), Object.assign({ t: o.t === undefined ? undefined : o.t + i * (o.dt ?? 0.04) }, o.f || {})));
  }
  return F;
};
const GN = 960, GM = 830, GF = 712; // street ground lines: near, mid, far
const DARLEY = { s: 1.1, hair: "short", hairC: DS.c("ink"), outfitC: DS.c("green"), mood: "flat", look: 6 };
const LATANE = { s: 1.1, hair: "curly", hairC: DS.c("brown", 2), outfitC: DS.c("purple"), mood: "flat", look: -6 };
const PROF = { s: 1.1, hair: "short", hairC: DS.c("gray", 1), outfitC: DS.c("white"), mood: "flat" }; // lab coat
const ACTOR = { s: 1.1, hair: "short", hairC: DS.c("ink", 1), outfitC: DS.c("gray"), mood: "flat" };
const BILL = { s: 1.0, hair: "messy", hairC: DS.c("ink"), outfitC: DS.c("sky"), mood: "flat", look: 6 };
// seated behind a table: the table (drawn after) hides the legs
const seated = (S, x, top, o = {}) => (o.dave === false ? who : dave)(S, x, top + 50, "near", Object.assign({ sit: true, pose: "hold" }, o));
const table = (S, x0, x1, top, gy = GN) => { DS.shadow(S, (x0 + x1) / 2, gy, x1 - x0 + 60); DS.shape(S, rect(x0 + 24, top + 20, x1 - x0 - 48, gy - top - 20), "wood", { tone: 2 }); DS.shape(S, rrect(x0, top, x1 - x0, 28, DS.r.xs), "wood"); };
// kneeling beside someone (side = 1 faces right)
const kneel = (S, x, ground, side, i, o = {}) => person(S, x, ground - 62 * 1.1 * DS.depth[o.layer || "near"].s, o.layer || "near", i, Object.assign({ sit: true, gs: ground, legL: [[34 * side, 62], [-26 * side, 72]], legR: [[56 * side, 8], [62 * side, 72]], pose: side > 0 ? "reach" : "reachL", look: 6 * side, mood: "worried" }, o));
const nurseCap = (S, F, t) => { const R = F.r, [x, y] = F.hd; DS.shape(S, rrect(x - 0.55 * R, y - 1.32 * R, 1.1 * R, 0.46 * R, DS.r.xs), "white", { t, w: "detail", parent: F.g }); DS.shape(S, rect(x - 0.07 * R, y - 1.27 * R, 0.14 * R, 0.36 * R), "red", { t, flat: true, w: "hair", parent: F.g }); DS.shape(S, rect(x - 0.18 * R, y - 1.16 * R, 0.36 * R, 0.14 * R), "red", { t, flat: true, w: "hair", parent: F.g }); };
const nurse = (S, x, gy, o = {}) => { const F = who(S, x, gy, "near", Object.assign({ s: 1.1, hair: "bun", hairC: DS.c("earth", 2), outfitC: DS.c("white"), mood: "smile", look: -6 }, o)); nurseCap(S, F, o.cap ?? o.t); return F; };
const marineCap = (S, F, t) => { const R = F.r, [x, y] = F.hd; DS.shape(S, `M${x - 0.95 * R} ${y - 0.45 * R} Q${x} ${y - 1.45 * R} ${x + 0.95 * R} ${y - 0.45 * R} Z`, "green", { t, tone: 2, w: "detail", parent: F.g }); DS.shape(S, rrect(x - 1.05 * R, y - 0.55 * R, 2.1 * R, 0.18 * R, DS.r.xs), "green", { t, tone: 2, w: "detail", parent: F.g }); };
const headset = (S, F, t) => {
  const R = F.r, [x, y] = F.hd, ink = DS.c("ink");
  S.draw(arc(x, y, R * 1.12, 196, 344), t ?? S.start, 0, { c: ink, w: DS.w.mid, parent: F.g });
  [-1, 1].forEach((sd) => DS.shape(S, rrect(x + sd * R * 1.05 - 0.16 * R, y - 0.3 * R, 0.32 * R, 0.6 * R, DS.r.xs), "ink", { t, w: "detail", parent: F.g }));
  S.draw(smooth([[x + R * 1.08, y + R * 0.2], [x + R * 0.95, y + R * 0.7], [x + R * 0.45, y + R * 0.8]]), t ?? S.start, 0, { c: ink, w: DS.w.detail, parent: F.g });
  DS.shape(S, circ(x + R * 0.4, y + R * 0.8, R * 0.12), "ink", { t, w: "hair", parent: F.g });
};
const phoneAt = (S, F, t) => { const [hx, hy] = F.hand("R"); DS.shape(S, rrect(hx - 16, hy - 60, 32, 58, DS.r.xs), "ink", { t, w: "detail", parent: F.g }); S.fill(rrect(hx - 11, hy - 54, 22, 44, DS.r.xs), t ?? S.start, 0, DS.c("sky", 1), 1, F.g); };

// ---------- the runner: Dave's tally counter ----------
// k 1 = in the hand. o.nums = [[t, "36"], [t, "37", "red"], ...] swaps the window digits on the spoken word
const T0 = (S) => Math.max(0, S.start - 0.6);
const counter = (S, cx, cy, k, o = {}) => {
  const t = o.t, g = S.grp(o.parent), size = k < 1.3 ? DS.type.caption : k < 2 ? DS.type.title : DS.type.display;
  S.draw(circ(cx - 60 * k, cy + 36 * k, 22 * k), t ?? S.start, 0, { c: DS.c("gray", 2), w: k < 1.3 ? DS.w.mid : DS.w.near, parent: g });
  DS.shape(S, rrect(cx - 12 * k, cy - 70 * k, 24 * k, 30 * k, DS.r.xs), "gray", { t, tone: 2, w: "detail", parent: g });
  DS.shape(S, rrect(cx - 58 * k, cy - 48 * k, 116 * k, 96 * k, DS.r.lg), "gray", { t, tone: 1, w: k < 1.3 ? "mid" : "near", parent: g });
  DS.shape(S, rrect(cx - 42 * k, cy - 26 * k, 84 * k, 52 * k, DS.r.xs), "white", { t, flat: true, w: "detail", parent: g });
  const nums = o.nums || [[t ?? T0(S), o.n || "38", o.c]];
  nums.forEach(([tn, str, cn], i) => { const c = cn || o.c; const te = S.text(str, cx, cy + size * 0.36, { size, t: tn, c: c ? DS.c(c, 2) : DS.c("ink"), parent: g }); if (nums[i + 1]) S.hide(te, nums[i + 1][0]); });
  return g;
};
const daveCounter = (S, x, o = {}) => { const F = dave(S, x, GN, "near", Object.assign({ armR: CLICK, look: 6 }, o)); const [hx, hy] = F.hand("R"); counter(S, hx + 52, hy - 8, 1, o.cnt || {}); return F; };

// ---------- sets ----------
const BLD = [[-80, 300, 360, "earth"], [230, 250, 290, "wall"], [490, 330, 420, "gray"], [830, 270, 330, "sand"], [1110, 340, 450, "earth"], [1460, 260, 300, "wall"], [1730, 330, 400, "gray"]];
const DAY = { hy: 640, sky: "sky", hills: "gray", ground: "gray", sun: [1700, 110] }, NIGHT = { hy: 640, sky: "night", hills: "gray", ground: "gray", sun: false };
const QNIGHT = { hy: 760, sky: "night", hills: "gray", ground: "gray", sun: false }, QDAY = { hy: 760, sky: "sky", hills: "gray", ground: "gray", sun: [1700, 120] };
const BOOTH = { back: [520, 140, 1400, 760], wall: "glass", floor: "gray", window: false }, SMOKE = { wall: "wall", floor: "wood", window: false };
const DOORSTEP = { hy: 860, sky: "night", hills: "gray", ground: "gray", sun: false };
// city street over a DS.outdoor sky: buildings (far plane, lit windows at night) + pavement
const street = (S, O, night = false) => {
  const hy = O.hy;
  BLD.forEach(([x, w, h, n], i) => {
    DS.shape(S, rect(x, hy - h, w, h + 60), n, { layer: "far", dir: "h" });
    const cols = Math.floor((w - 30) / 72), rows = Math.floor((h - 50) / 90);
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { const lit = night && (r * 3 + c * 5 + i) % 4 === 0;
      S.fill(rect(x + 30 + c * 72, hy - h + 36 + r * 90, 36, 50), S.start, 0, lit ? DS.c("yellow", 1, "far") : DS.c(night ? "navy" : "glass", night ? 1 : 2, "far"), 1); }
  });
  DS.shape(S, rect(-200, hy + 40, 2320, 700), "paper", { layer: "mid", tone: 2, flat: true, w: "hair" });
  S.draw(line([-200, hy + 40], [2120, hy + 40], 0), S.start, 0, { c: DS.line("mid"), w: DS.w.mid });
  return { hy };
};
// brick block with a grid of windows; o.lit(i) lights window i; o.heads = time the silhouettes appear in lit windows
const apartment = (S, x, yB, cols, rows, o = {}) => {
  const cw = o.cw || 160, rh = o.rh || 150, w = cols * cw + 60, h = rows * rh + 80, y = yB - h, L = o.layer || "mid", P = [];
  DS.shape(S, rect(x, y, w, h), o.name || "earth", { layer: L, tone: 2, dir: "h" });
  DS.shape(S, rect(x - 20, y - 24, w + 40, 30), "brown", { layer: L, w: "detail" });
  let n = 0;
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++, n++) {
    const wx = x + 40 + c * cw, wy = y + 50 + r * rh, ww = cw - 60, wh = rh - 50, lit = o.lit ? o.lit(n) : false;
    DS.shape(S, rect(wx, wy, ww, wh), lit ? "yellow" : o.day ? "glass" : "navy", { layer: L, flat: true, tone: lit ? 1 : 2, w: "detail" });
    if (lit && o.heads !== undefined) { const hx = wx + ww / 2, by = wy + wh; S.fill(circ(hx, by - 36, 15) + ` M${hx - 26} ${by} Q${hx} ${by - 40} ${hx + 26} ${by} Z`, o.heads + n * 0.02, 0, DS.c("ink", 1, L), 0.85); }
    P.push([wx + ww / 2, wy + wh / 2]);
  }
  return { P, x, y, w, h };
};
const lamp = (S, x, gy, k = 1) => { DS.shadow(S, x, gy, 120 * k); DS.shape(S, rect(x - 9 * k, gy - 520 * k, 18 * k, 520 * k), "ink", { w: "detail" }); DS.shape(S, rrect(x - 40 * k, gy - 580 * k, 80 * k, 60 * k, DS.r.sm), "ink", { w: "detail" }); S.fill(rrect(x - 30 * k, gy - 546 * k, 60 * k, 24 * k, DS.r.xs), S.start, 0, DS.c("yellow", 1), 1); };
// Kew Gardens, Queens, 1964: a quiet block at night (no people, no event; only windows)
const queens = (S, O, o = {}) => {
  if (!o.day) S.fill(circ(1660, 250, 50), S.start, 0, DS.c("yellow", 1), 1);
  const A = apartment(S, 260, 820, 7, 3, { cw: 170, lit: o.lit || ((i) => [3, 9, 15].includes(i)), heads: o.heads, day: o.day });
  DS.shape(S, rect(-200, 820, 2320, 400), "gray", { layer: "mid", tone: o.day ? 1 : 2, flat: true, w: "hair" });
  lamp(S, 1680, 900);
  return A;
};
const nightWin = (S, x, y, w, h) => {
  DS.shape(S, rrect(x - 14, y - 14, w + 28, h + 28, DS.r.xs), "white", { w: "detail" });
  DS.shape(S, rect(x, y, w, h), "night", { flat: true, tone: 2, w: "hair" });
  S.fill(circ(x + w * 0.7, y + h * 0.3, 22), S.start, 0, DS.c("yellow", 1), 1);
  [[0.2, 0.2], [0.35, 0.62], [0.15, 0.8], [0.5, 0.14], [0.82, 0.72]].forEach(([a, b]) => S.fill(circ(x + w * a, y + h * b, 4), S.start, 0, DS.P.white[0], 0.85));
  S.draw(`M${x + w / 2} ${y} V${y + h} M${x} ${y + h / 2} H${x + w}`, S.start, 0, { c: DS.P.white[0], w: DS.w.mid });
};
const paperR = (S, x, y, w, h, o = {}) => { DS.drop(S, rect(x + 6, y + 8, w, h), { t: o.t, parent: o.parent }); DS.shape(S, rect(x, y, w, h), "white", { t: o.t, w: "detail", flat: true, parent: o.parent }); };
const lines = (S, x, y, w, n, t, gap = 36, parent) => { for (let i = 0; i < n; i++) S.draw(line([x, y + i * gap], [x + (i === n - 1 ? w * 0.6 : w), y + i * gap], 0), t ?? S.start, 0, { c: DS.c("gray", 1), w: DS.w.detail, parent }); };
const wboard = (S, x, y, w, h) => { DS.drop(S, rect(x + 8, y + 10, w, h)); DS.shape(S, rrect(x, y, w, h, DS.r.sm), "wood", { layer: "mid" }); DS.shape(S, rect(x + 22, y + 22, w - 44, h - 44), "white", { layer: "mid", w: "detail", flat: true }); };
const txt = (S, s, x, y, o = {}) => S.text(s, x, y, Object.assign({ size: DS.type.caption, c: DS.c("ink") }, o));
const panel = (S, cx, cy, w, h, t, name = "white") => { DS.drop(S, rrect(cx - w / 2 + 8, cy - h / 2 + 12, w, h, DS.r.md), { t }); DS.shape(S, rrect(cx - w / 2, cy - h / 2, w, h, DS.r.md), name, { t, flat: true, w: "detail" }); };
// speech or thought bubble with centred lines of text, all in one group
const say = (S, cx, cy, rx, ry, tx, ty, strs, t, o = {}) => {
  const g = S.grp(); (o.think ? S.thought : S.speech)(cx, cy, rx, ry, tx, ty, t, 0.3, { parent: g });
  const size = o.size || DS.type.small, n = strs.length;
  strs.forEach((s, i) => S.text(s, cx, cy + size * 0.36 + (i - (n - 1) / 2) * size * 1.2, { size, t, c: o.c ? DS.c(o.c, 2) : DS.c("ink"), parent: g }));
  return g;
};
// ring outline around a person (never a fill over a face)
const ringFig = (S, F, t, name = "red") => S.draw(circ(F.cx, F.hd[1] + F.r * 2.4, F.r * 2.6, F.r * 4.2), t, 0, { c: DS.c(name), w: DS.w.near });
const grow = (g, t, x, y, sx = false, dur = 0.7) => { const tf = (k) => `translate(${x} ${y}) scale(${sx ? k : 1} ${sx ? 1 : k}) translate(${-x} ${-y})`; tl.fromTo(g, { attr: { transform: tf(0.02) } }, { attr: { transform: tf(1) }, duration: dur, ease: "power2.out" }, t); };
let WP = 0;
const wipe = (node, x, y, w, h, t, dur = 1.0) => { const id = "wp" + ++WP, cp = el("clipPath", { id }, dsDefs()), r = el("rect", { x, y, width: 0, height: h }, cp); node.setAttribute("clip-path", `url(#${id})`); tl.fromTo(r, { attr: { width: 0 } }, { attr: { width: w }, duration: dur, ease: "power1.inOut" }, t); };
const bar = (S, x, base, w, h, name, t) => { const g = S.grp(); DS.shape(S, rect(x, base - h, w, h), name, { t, dir: "h", parent: g }); if (t > S.start + 0.05) grow(g, t, x, base); return g; };
const stamp = (S, cx, cy, str, t, name = "red") => {
  const g = S.grp(), w = str.length * DS.type.small * 0.66 + 60, tf = (k) => `translate(${cx} ${cy}) rotate(-6) scale(${k}) translate(${-cx} ${-cy})`;
  S.draw(rrect(cx - w / 2, cy - 46, w, 92, DS.r.sm), S.start, 0, { c: DS.c(name, 2), w: DS.w.near, fill: DS.P.white[0], parent: g });
  S.text(str, cx, cy + 19, { size: DS.type.small, t: S.start, c: DS.c(name, 2), parent: g });
  tl.fromTo(g, { opacity: 0, attr: { transform: tf(1.4) } }, { opacity: 1, attr: { transform: tf(1) }, duration: 0.25, ease: "power3.in" }, t);
};
const tick = (S, x, y, k, t, name = "green") => S.tick(x, y, k, t, 0, { c: DS.c(name), w: DS.w.near });
const xMark = (S, x, y, k, t) => S.cross(x, y, k, t, 0, { c: DS.c("red"), w: DS.w.near });

// ---------- props ----------
// tiny doodle person (icons, monitors, counts): one stroke path + a filled head. pose: down | reach | block | reachL
const ARMS = { down: [[-15, -30], [15, -30]], reach: [[-15, -30], [28, -46]], reachL: [[-28, -46], [15, -30]], block: [[-28, -46], [28, -46]], up: [[-16, -70], [16, -70]] };
const mini = (S, x, gy, k, o = {}) => {
  const t = o.t ?? S.start, c = o.c || DS.c("ink"), [aL, aR] = ARMS[o.pose || "down"], w = o.w || DS.w.mid;
  S.draw(`M${x} ${gy - 50 * k} L${x} ${gy - 22 * k} M${x - 11 * k} ${gy} L${x} ${gy - 22 * k} L${x + 11 * k} ${gy} M${x + aL[0] * k} ${gy + aL[1] * k} L${x} ${gy - 44 * k} L${x + aR[0] * k} ${gy + aR[1] * k}`, t, 0, { c, w, parent: o.parent });
  S.draw(circ(x, gy - 63 * k, 13 * k), t, 0, { c, w, fill: o.fill || DS.P.white[0], parent: o.parent });
};
const minis = (S, n, x0, x1, gy, k, o = {}) => { for (let i = 0; i < n; i++) mini(S, n > 1 ? x0 + (i * (x1 - x0)) / (n - 1) : x0, gy, k, Object.assign({}, o, { t: o.t === undefined ? undefined : o.t + i * (o.dt ?? 0.03), fill: o.fills ? DS.c(o.fills[i % o.fills.length], 1) : o.fill })); };
// the 27 March 1964 front page (our layout and lettering, quoted headline + first line; no logo)
const PG = { x: 380, y: 70, pw: 860, ph: 860 };
const P37 = [PG.x + 98, 312], P38 = [PG.x + 200, 512];
const page64 = (S, o = {}) => {
  const { x, y, pw: w, ph: h } = PG, t = o.t, g = S.grp(), ink = DS.c("ink");
  DS.drop(S, rect(x + 10, y + 14, w, h), { t, parent: g }); DS.shape(S, rect(x, y, w, h), "paper", { t, w: "detail", flat: true, parent: g });
  txt(S, "THE NEW YORK TIMES", x + w / 2, 160, { size: DS.type.body, t, parent: g });
  [190, 200, 258].forEach((yy) => S.draw(line([x + 40, yy], [x + w - 40, yy], 0), t ?? S.start, 0, { c: ink, w: DS.w.hair, parent: g }));
  txt(S, "MARCH 27, 1964", x + w / 2, 240, { t, parent: g });
  txt(S, "37 WHO SAW MURDER", x + 64, 330, { size: DS.type.small, anchor: "start", t, parent: g });
  txt(S, "DIDN'T CALL THE POLICE", x + 64, 395, { size: DS.type.small, anchor: "start", t, parent: g });
  ["For more than half an hour", "thirty-eight respectable,", "law-abiding citizens in Queens..."].forEach((s, i) => txt(S, s, x + 64, 470 + i * 55, { anchor: "start", t, parent: g }));
  [0, 1, 2].forEach((c) => lines(S, x + 64 + c * 260, 650, 220, 7, t, 38, g));
  return g;
};
const newspaper = (S, x, y, w, h, date, o = {}) => {
  const t = o.t, g = S.grp();
  DS.drop(S, rect(x + 10, y + 14, w, h), { t, parent: g }); DS.shape(S, rect(x, y, w, h), "paper", { t, w: "detail", flat: true, parent: g });
  txt(S, "THE NEW YORK TIMES", x + w / 2, y + 90, { size: DS.type.small, t, parent: g });
  [y + 116, y + 176].forEach((yy) => S.draw(line([x + 40, yy], [x + w - 40, yy], 0), t ?? S.start, 0, { c: DS.c("ink"), w: DS.w.hair, parent: g }));
  txt(S, date, x + w / 2, y + 160, { t, parent: g });
  [0, 1].forEach((c) => lines(S, x + 50 + c * ((w - 80) / 2), y + 230, (w - 140) / 2, Math.floor((h - 270) / 40), t, 40, g));
  return g;
};
// rotary phone; cy = base bottom
const rotary = (S, cx, cy, k, o = {}) => {
  const t = o.t, g = S.grp(), n = o.name || "ink";
  DS.shadow(S, cx, cy, 250 * k, { t, parent: g });
  DS.shape(S, `M${cx - 110 * k} ${cy} L${cx - 82 * k} ${cy - 112 * k} L${cx + 82 * k} ${cy - 112 * k} L${cx + 110 * k} ${cy} Z`, n, { t, parent: g });
  DS.shape(S, circ(cx, cy - 56 * k, 44 * k), "white", { t, w: "detail", parent: g });
  for (let i = 0; i < 10; i++) { const a = ((60 + i * 28) * Math.PI) / 180; S.draw(circ(cx + Math.cos(a) * 30 * k, cy - 56 * k + Math.sin(a) * 30 * k, 6 * k), t ?? S.start, 0, { c: DS.c("gray", 2), w: DS.w.hair, parent: g }); }
  DS.shape(S, circ(cx, cy - 56 * k, 12 * k), n, { t, w: "hair", parent: g });
  [-1, 1].forEach((sd) => DS.shape(S, rrect(cx + sd * 70 * k - 10 * k, cy - 134 * k, 20 * k, 26 * k, DS.r.xs), n, { t, w: "detail", parent: g }));
  DS.shape(S, rrect(cx - 116 * k, cy - 160 * k, 232 * k, 30 * k, DS.r.sm), n, { t, parent: g });
  [-1, 1].forEach((sd) => DS.shape(S, rrect(cx + sd * 112 * k - 36 * k, cy - 172 * k, 72 * k, 50 * k, DS.r.sm), n, { t, parent: g }));
  S.draw(smooth([[cx - 110 * k, cy - 20 * k], [cx - 170 * k, cy - 10 * k], [cx - 190 * k, cy + 10 * k]]), t ?? S.start, 0, { c: DS.c("ink"), w: DS.w.detail, parent: g });
  return g;
};
const sideTable = (S, x, gy, w) => { DS.shadow(S, x + w / 2, gy, w + 40); DS.shape(S, rrect(x, gy - 300, w, 30, DS.r.xs), "wood"); [x + 24, x + w - 44].forEach((lx) => DS.shape(S, rect(lx, gy - 270, 20, 270), "wood", { w: "mid" })); return gy - 300; };
// reel-to-reel tape recorder (the four "other students"); reels spin through the scene
const tape = (S, cx, cy, k, o = {}) => {
  const t = o.t, g = S.grp(o.parent);
  DS.drop(S, rrect(cx - 90 * k + 6, cy - 70 * k + 8, 180 * k, 140 * k, DS.r.sm), { t, parent: g });
  DS.shape(S, rrect(cx - 90 * k, cy - 70 * k, 180 * k, 140 * k, DS.r.sm), "gray", { t, tone: 1, parent: g });
  [-1, 1].forEach((sd) => {
    const rg = S.grp(g), x = cx + sd * 42 * k, y = cy - 16 * k;
    DS.shape(S, circ(x, y, 34 * k), "ink", { t, w: "detail", parent: rg });
    S.draw(rays(x, y, 8 * k, 28 * k, 3), t ?? S.start, 0, { c: DS.c("gray", 1), w: DS.w.detail, parent: rg });
    S.fill(circ(x, y, 7 * k), t ?? S.start, 0, DS.c("white"), 1, rg);
    tl.to(rg, { rotation: 360 * Math.max(1, Math.round(S.len / 3)), svgOrigin: `${x} ${y}`, duration: S.len, ease: "none" }, S.start);
  });
  S.draw(line([cx - 42 * k, cy + 18 * k], [cx + 42 * k, cy + 18 * k], 0), t ?? S.start, 0, { c: DS.c("brown"), w: DS.w.detail, parent: g });
  [-36, -12, 12, 36].forEach((dx) => DS.shape(S, rrect(cx + dx * k - 9 * k, cy + 34 * k, 18 * k, 18 * k, DS.r.xs), "ink", { t, w: "hair", parent: g }));
  return g;
};
const intercom = (S, x, y, k, o = {}) => {
  const t = o.t;
  DS.drop(S, rrect(x - 70 * k + 6, y - 90 * k + 8, 140 * k, 180 * k, DS.r.sm), { t });
  DS.shape(S, rrect(x - 70 * k, y - 90 * k, 140 * k, 180 * k, DS.r.sm), "gray", { t, tone: 1 });
  for (let i = 0; i < 5; i++) S.draw(line([x - 44 * k, y - 56 * k + i * 22 * k], [x + 44 * k, y - 56 * k + i * 22 * k], 0), t ?? S.start, 0, { c: DS.c("ink", 1), w: DS.w.mid });
  DS.shape(S, circ(x, y + 58 * k, 12 * k), o.on !== undefined ? "red" : "gray", { t: o.on ?? t, w: "detail" });
};
const mic = (S, x, top, k = 1) => { DS.shape(S, rrect(x - 40 * k, top - 14 * k, 80 * k, 14 * k, DS.r.xs), "ink", { w: "detail" }); S.draw(line([x, top - 14 * k], [x + 14 * k, top - 90 * k], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.mid }); DS.shape(S, rrect(x + 2 * k, top - 128 * k, 26 * k, 44 * k, DS.r.sm), "gray", { tone: 2, w: "detail" }); };
const stopwatch = (S, cx, cy, r, o = {}) => {
  const t = o.t;
  DS.shape(S, rrect(cx - 18, cy - r - 46, 36, 34, DS.r.xs), "gray", { t, tone: 2, w: "detail" });
  DS.shape(S, circ(cx, cy, r), "white", { t });
  S.draw(rays(cx, cy, r * 0.8, r * 0.92, 12, -Math.PI / 2), t ?? S.start, 0, { c: DS.c("ink"), w: DS.w.detail });
  const hand = S.draw(line([cx, cy], [cx, cy - r * 0.75], 0), t ?? S.start, 0, { c: DS.c("red"), w: DS.w.near });
  tl.to(hand, { rotation: 300, svgOrigin: `${cx} ${cy}`, duration: o.dur || 4, ease: "none" }, o.go ?? S.start);
  DS.shape(S, circ(cx, cy, 10), "ink", { t, w: "hair" });
};
const labDoor = (S, x, y, w, h, o = {}) => {
  DS.shape(S, rect(x - 14, y - 14, w + 28, h + 14), "white", { layer: "mid", w: "mid" });
  if (o.open !== undefined) { DS.shape(S, rect(x, y, w, h), "yellow", { layer: "mid", flat: true, tone: 1, w: "detail", t: o.open }); }
  const p = DS.shape(S, rect(x, y, w, h), "wood", { layer: "mid", dir: "h" }); DS.shape(S, circ(x + w - 26, y + h * 0.55, 9), "gold", { layer: "mid", w: "detail", parent: undefined });
  if (o.open !== undefined) { S.fadeOut(p, o.open, 0.35); DS.shape(S, `M${x + w} ${y} L${x + w + w * 0.4} ${y + 40} L${x + w + w * 0.4} ${y + h + 26} L${x + w} ${y + h} Z`, "wood", { layer: "mid", t: o.open }); }
  if (o.sign) { DS.shape(S, rrect(x + w / 2 - 110, y - 92, 220, 60, DS.r.xs), "red", { tone: 2, flat: true, w: "detail" }); txt(S, o.sign, x + w / 2, y - 48, { c: DS.P.white[0] }); }
};
const VX = 1290, VY = 300, DOOR = [400, 300, 200, 460], WIN = [1410, 170, 140, 230];
const vent = (S, x, y, k = 1, t) => { DS.shape(S, rrect(x - 70 * k, y - 40 * k, 140 * k, 80 * k, DS.r.xs), "gray", { t, tone: 1, w: "mid" }); for (let i = 0; i < 4; i++) S.draw(line([x - 54 * k, y - 24 * k + i * 16 * k], [x + 54 * k, y - 24 * k + i * 16 * k], 0), t ?? S.start, 0, { c: DS.c("ink", 1), w: DS.w.detail }); };
// smoke puff: soft white blobs; o.drift = [dx, dy, dur] keeps it moving
const puff = (S, cx, cy, k, t, o = {}) => { const g = S.grp(); [[0, 0, 40], [-34, 10, 28], [34, 12, 30], [-10, -26, 26], [18, -22, 24]].forEach(([dx, dy, r]) => S.fill(circ(cx + dx * k, cy + dy * k, r * k), t ?? S.start, 0, DS.c("white", 2), o.op ?? 0.92, g)); if (o.drift) S.move(g, t ?? S.start, o.drift[2] || 4, { x: o.drift[0], y: o.drift[1] }, "sine.out"); return g; };
// the smoke-room set: waiting room, vent on the back wall, door left, window right. o.haze = smoke level (behind the people), o.open = window open
const smokeRoom = (S, R, o = {}) => {
  const [dx, dy, dw, dh] = DOOR; labDoor(S, dx, dy, dw, dh);
  const [wx, wy, ww, wh] = WIN;
  DS.shape(S, rrect(wx - 14, wy - 14, ww + 28, wh + 28, DS.r.xs), "white", { layer: "mid", w: "detail" });
  DS.shape(S, rect(wx, wy, ww, wh), "sky", { layer: "mid", dir: "v", w: "hair" });
  if (o.open) DS.shape(S, `M${wx} ${wy} L${wx - ww * 0.55} ${wy + 30} L${wx - ww * 0.55} ${wy + wh + 30} L${wx} ${wy + wh} Z`, "glass", { layer: "mid", t: o.open === true ? undefined : o.open });
  else S.draw(`M${wx + ww / 2} ${wy} V${wy + wh} M${wx} ${wy + wh / 2} H${wx + ww}`, S.start, 0, { c: DS.P.white[0], w: DS.w.mid });
  vent(S, VX, VY);
  if (o.haze) S.fill(rect(-200, -200, 2320, 1500), o.hazeT ?? S.start, 0, DS.c("gray", 1), o.haze);
  if (o.band) for (let i = 0; i < 9; i++) puff(S, 380 + i * 150, 170 + (i % 3) * 40, 1.5, o.bandT, { drift: [-40 + (i % 2) * 80, 10, S.len], op: 0.85 });
  if (o.puffs) [[VX - 120, VY + 30, 1.2], [VX + 90, VY + 70, 1], [VX - 260, VY + 110, 0.9], [VX - 420, VY + 40, 0.8], [VX + 40, VY - 50, 0.9]].slice(0, o.puffs).forEach(([x, y, k], i) => puff(S, x, y, k, o.puffT, { drift: [-60 - i * 20, -30 + i * 6, S.len] }));
};
const cctv = (S, x, y, k, o = {}) => {
  const t = o.t, g = S.grp(), b = S.grp(g);
  DS.shape(S, rect(x - 8 * k, y, 16 * k, 60 * k), "gray", { t, tone: 2, w: "detail", parent: g });
  DS.shape(S, rrect(x - 100 * k, y + 50 * k, 170 * k, 70 * k, DS.r.sm), "white", { t, parent: b });
  DS.shape(S, rrect(x - 136 * k, y + 58 * k, 44 * k, 54 * k, DS.r.xs), "ink", { t, w: "detail", parent: b });
  S.fill(circ(x + 42 * k, y + 72 * k, 8 * k), t ?? S.start, 0, DS.c("red"), 1, b);
  b.setAttribute("transform", `rotate(${o.a ?? -16} ${x} ${y + 60 * k})`);
  return g;
};
// CCTV monitor with a tiny night scene of n people (o.act = "calm" | "between" | "pull" shows one helping)
const monitor = (S, cx, cy, w, h, o = {}) => {
  const t = o.t, wh = DS.P.white[0];
  DS.shape(S, rrect(cx - w / 2, cy - h / 2, w, h, DS.r.sm), "ink", { t, w: "detail" });
  DS.shape(S, rect(cx - w / 2 + 10, cy - h / 2 + 10, w - 20, h - 20), "night", { t, flat: true, tone: 1, w: "hair" });
  const k = h / 230, gy = cy + h / 2 - 22 * k * 1.4, mo = { c: wh, fill: DS.c("night", 1), w: DS.w.detail, t };
  if (o.act === "calm") { mini(S, cx - 40 * k, gy, k * 1.4, Object.assign({}, mo, { pose: "reach" })); mini(S, cx + 30 * k, gy, k * 1.4, mo); }
  else if (o.act === "between") { mini(S, cx - 80 * k, gy, k * 1.4, Object.assign({}, mo, { pose: "reach" })); mini(S, cx, gy, k * 1.4, Object.assign({}, mo, { pose: "block" })); mini(S, cx + 80 * k, gy, k * 1.4, Object.assign({}, mo, { pose: "reachL" })); }
  else if (o.act === "pull") { mini(S, cx - 50 * k, gy, k * 1.4, Object.assign({}, mo, { pose: "reach" })); mini(S, cx + 10 * k, gy, k * 1.4, Object.assign({}, mo, { pose: "reachL" })); mini(S, cx + 70 * k, gy, k * 1.4, mo); }
  else for (let i = 0; i < (o.n ?? 3); i++) mini(S, cx - w * 0.3 + (i * w * 0.6) / Math.max(1, (o.n ?? 3) - 1), gy, k * 1.2, mo);
  S.fill(circ(cx + w / 2 - 26, cy - h / 2 + 26, 7), t ?? S.start, 0, DS.c("red"), 1);
};
const MON = []; for (let r = 0; r < 2; r++) for (let c = 0; c < 5; c++) MON.push([320 + c * 320, 400 + r * 250]);
const monitors10 = (S, o = {}) => MON.forEach(([x, y], i) => monitor(S, x, y, 280, 200, { t: o.t === undefined ? undefined : o.t + i * 0.05, n: 2 + (i % 3) }));
const wheelchair = (S, x, gy, k = 1) => {
  DS.shadow(S, x + 20 * k, gy, 300 * k);
  DS.shape(S, rrect(x - 90 * k, gy - 300 * k, 24 * k, 190 * k, DS.r.xs), "navy", { w: "mid" });
  DS.shape(S, rrect(x - 90 * k, gy - 132 * k, 190 * k, 26 * k, DS.r.xs), "navy", { w: "mid" });
  S.draw(line([x + 90 * k, gy - 110 * k], [x + 110 * k, gy - 30 * k], 0), S.start, 0, { c: DS.c("gray", 2), w: DS.w.mid });
  DS.shape(S, circ(x + 112 * k, gy - 20 * k, 20 * k), "ink", { w: "detail" });
  return gy - 132 * k;
};
const wheel = (S, x, gy, k = 1) => { S.draw(circ(x - 20 * k, gy - 96 * k, 96 * k), S.start, 0, { c: DS.c("ink"), w: DS.w.near }); S.draw(circ(x - 20 * k, gy - 96 * k, 80 * k), S.start, 0, { c: DS.c("gray", 2), w: DS.w.detail }); S.draw(rays(x - 20 * k, gy - 96 * k, 10 * k, 80 * k, 8), S.start, 0, { c: DS.c("gray", 2), w: DS.w.hair }); DS.shape(S, circ(x - 20 * k, gy - 96 * k, 12 * k), "gray", { w: "detail" }); };
const globe = (S, cx, cy, r) => {
  DS.shape(S, circ(cx, cy, r), "sky");
  [[-0.35, -0.3, 0.32, 0.22], [0.25, -0.1, 0.28, 0.4], [-0.2, 0.42, 0.24, 0.16]].forEach(([a, b, rx, ry]) => DS.shape(S, circ(cx + a * r, cy + b * r, rx * r, ry * r), "grass", { w: "detail" }));
  S.draw(circ(cx, cy, r * 0.45, r), S.start, 0, { c: DS.c("blue", 1), w: DS.w.hair }); S.draw(line([cx - r, cy], [cx + r, cy], 0), S.start, 0, { c: DS.c("blue", 1), w: DS.w.hair });
};
const bookP = (S, cx, cy, w, h, title, t) => { DS.drop(S, rrect(cx - w / 2 + 6, cy - h / 2 + 8, w, h, DS.r.xs), { t }); DS.shape(S, rrect(cx - w / 2, cy - h / 2, w, h, DS.r.xs), "red", { t, tone: 2, flat: true }); DS.shape(S, rect(cx - w / 2 + 14, cy - h / 2, 14, h), "red", { t, flat: true, w: "hair" }); txt(S, title, cx + 8, cy + 14, { t, c: DS.P.white[0] }); };
const aidKit = (S, cx, cy, k = 1) => { DS.shadow(S, cx, cy + 56 * k, 180 * k); S.draw(arc(cx, cy - 56 * k, 34 * k, 180, 360), S.start, 0, { c: DS.c("ink"), w: DS.w.mid }); DS.shape(S, rrect(cx - 80 * k, cy - 56 * k, 160 * k, 112 * k, DS.r.sm), "white"); DS.shape(S, rect(cx - 12 * k, cy - 36 * k, 24 * k, 72 * k), "red", { flat: true, w: "hair" }); DS.shape(S, rect(cx - 36 * k, cy - 12 * k, 72 * k, 24 * k), "red", { flat: true, w: "hair" }); };
const shelf = (S, x, yB, w, rows) => {
  DS.shape(S, rect(x, yB - rows * 110 - 20, w, rows * 110 + 20), "white", { layer: "mid", tone: 2 });
  const cols = ["red", "yellow", "green", "orange", "sky", "purple", "pink"];
  for (let r = 0; r < rows; r++) { const y = yB - 20 - r * 110; S.draw(line([x, y], [x + w, y], 0), S.start, 0, { c: DS.line("mid"), w: DS.w.mid }); for (let i = 0; i < Math.floor(w / 70); i++) DS.shape(S, rrect(x + 14 + i * 70, y - 80 + ((i + r) % 3) * 10, 52, 80 - ((i + r) % 3) * 10, DS.r.xs), cols[(i * 3 + r) % 7], { layer: "mid", w: "detail" }); }
};
const candle = (S, cx, base, k = 1, t) => {
  S.fill(circ(cx, base - 150 * k, 130 * k), t ?? S.start, 0, DS.glow(DS.P.yellow[1], 0.55), 1);
  DS.shape(S, rrect(cx - 20 * k, base - 120 * k, 40 * k, 120 * k, DS.r.xs), "white", { t });
  DS.shape(S, `M${cx} ${base - 196 * k} Q${cx + 22 * k} ${base - 150 * k} ${cx} ${base - 128 * k} Q${cx - 22 * k} ${base - 150 * k} ${cx} ${base - 196 * k} Z`, "gold", { t, w: "detail" });
};
// the doorway of Sophia Farrar's building at night (no people); o.open = time the door opens and warm light spills out
const doorstep = (S, O, o = {}) => {
  DS.shape(S, rect(-200, -200, 2320, 1080), "earth", { tone: 2, layer: "mid", dir: "h" });
  for (let r = 0; r < 14; r++) S.draw(line([-200, 60 + r * 60], [2120, 60 + r * 60], 0), S.start, 0, { c: DS.c("brown", 0, "mid"), w: DS.w.hair });
  [[260, 220], [1460, 220]].forEach(([x, y]) => DS.shape(S, rect(x, y, 200, 240), "navy", { layer: "mid", flat: true, tone: 2, w: "detail" }));
  const x = 800, y = 300, w = 320, h = 560;
  DS.shape(S, rect(x - 30, y - 30, w + 60, h + 30), "wood", { tone: 2, w: "mid" });
  DS.shape(S, rect(-200, 860, 2320, 300), "gray", { tone: 2, flat: true, w: "hair" });
  DS.shape(S, rrect(x - 80, 860, w + 160, 40, DS.r.xs), "gray", { tone: 1, w: "detail" });
  if (o.open === undefined) { DS.shape(S, rect(x, y, w, h), "wood", { dir: "h" }); DS.shape(S, circ(x + w - 34, y + h * 0.55, 10), "gold", { w: "detail" }); return; }
  DS.shape(S, rect(x, y, w, h), "yellow", { tone: 1, flat: true, w: "detail", t: o.open });
  S.fill(`M${x} ${y + h} L${x + w} ${y + h} L${x + w + 260} 1080 L${x - 260} 1080 Z`, o.open, 0, DS.c("yellow", 1), o.dim ? 0.5 : 0.7);
  const d = DS.shape(S, rect(x, y, w, h), "wood", { dir: "h" }); if (o.open > S.start + 0.05) S.fadeOut(d, o.open, 0.4); else d.setAttribute("opacity", 0);
  DS.shape(S, `M${x} ${y} L${x - w * 0.42} ${y - 30} L${x - w * 0.42} ${y + h + 30} L${x} ${y + h} Z`, "wood", { t: o.open, tone: 2 });
};
const pauseIcon = (S, cx, cy, k, t) => { const g = S.grp(); [-1, 1].forEach((sd) => DS.shape(S, rrect(cx + sd * 40 * k - 24 * k, cy - 80 * k, 48 * k, 160 * k, DS.r.sm), "white", { t, parent: g })); return g; };
const warnSign = (S, cx, cy, k, t) => { DS.shape(S, `M${cx} ${cy - 110 * k} L${cx + 120 * k} ${cy + 90 * k} L${cx - 120 * k} ${cy + 90 * k} Z`, "yellow", { t }); txt(S, "!", cx, cy + 70 * k, { size: DS.type.display, t }); };
const clipboard = (S, cx, cy, w, h, strs, o = {}) => { const t = o.t, g = S.grp(); DS.shape(S, rrect(cx - w / 2, cy - h / 2, w, h, DS.r.sm), "wood", { t, parent: g }); DS.shape(S, rect(cx - w / 2 + 16, cy - h / 2 + 24, w - 32, h - 40), "white", { t, flat: true, w: "hair", parent: g }); DS.shape(S, rrect(cx - 40, cy - h / 2 - 12, 80, 30, DS.r.xs), "gray", { t, tone: 2, w: "detail", parent: g }); strs.forEach((s, i) => txt(S, s, cx, cy - h / 2 + 84 + i * 56, { t, parent: g, c: i ? DS.c("blue", 2) : DS.c("ink") })); return g; };
const iceCity = (S, t) => {
  [[1060, 300, "glass"], [1200, 470, "glass"], [1360, 380, "sky"], [1520, 520, "glass"], [1660, 340, "sky"]].forEach(([x, h, n], i) => {
    DS.shape(S, rect(x, 860 - h, 130, h), n, { dir: "h", tone: i % 2 });
    for (let r = 0; r < Math.floor((h - 60) / 70); r++) [0, 1].forEach((c) => S.fill(rect(x + 22 + c * 52, 860 - h + 30 + r * 70, 34, 40), S.start, 0, DS.c("blue", 1), 0.8));
    for (let j = 0; j < 5; j++) DS.shape(S, `M${x + 8 + j * 26} ${860 - h} L${x + 21 + j * 26} ${860 - h} L${x + 14 + j * 26} ${860 - h + 34 + (j % 2) * 16} Z`, "white", { t, w: "hair", flat: true });
  });
};

// ---------- timing: one picture per beat, landing just after its first word (the 0.6 s crossfade covers the breath) ----------
const CUES = [[1, 0], [2, 0], [3, 0], [5, 0], [6, 0], [7, 0], [8, 0], [10, 0], [11, 0], [12, 0], [13, 0], [14, 0],
  [15, 0], [16, 0], [18, 0], [19, 0], [20, 0], [21, 0], [22, 0], [24, 0], [25, 0], [27, 0], [29, 0], [30, 0], [32, 0], [33, 0], [35, 0], [37, 0], [39, 0],
  [40, 0], [42, 0], [43, 0], [44, 0], [45, 0], [47, 0], [49, 0], [50, 0], [50, 13], [52, 0], [54, 0], [55, 0], [56, 0], [57, 0], [58, 0], [59, 0], [61, 0], [62, 0], [63, 0], [65, 0],
  [66, 0], [67, 0], [68, 0], [69, 0], [72, 0], [74, 0], [75, 0], [76, 0], [78, 0], [81, 0], [83, 0], [85, 0], [86, 0],   [88, 0], [90, 0], [91, 0], [93, 0], [94, 0], [96, 0], [98, 0], [99, 0], [101, 0], [103, 0], [105, 0], [106, 0], [107, 0], [108, 0], [110, 0], [112, 0], [113, 0], [115, 0],
  [117, 0], [119, 0], [121, 0], [123, 0], [124, 0], [125, 0], [127, 0], [128, 0], [129, 0], [131, 0], [133, 0], [135, 0]];
const WINS = sceneWindows(CUES, -0.25);
const sc = (c, w, o) => { const k = CUES.findIndex(([a, b]) => a === c && b === w); if (k < 0) throw new Error("no cue " + c + ":" + w); return scene(WINS[k][0], WINS[k][1], o); };

// ===================== 1. Dave counts the crowd =====================
// This is Dave. Dave is on a busy street, counting the people around him.
{ const S = sc(1, 0, { cam: "push", focus: "960 620" }); street(S, DS.outdoor(S, DAY));
  crowdRow(S, 10, 180, 1760, GF, "far", { skip: [4] });
  crowdRow(S, 6, 200, 1720, GM, "mid", { k: 4, skip: [2, 3] });
  daveCounter(S, 900, { mood: "flat", cnt: { nums: [[T0(S), "12"], [W(1, 9), "19"], [W(1, 11), "27"], [W(1, 13), "35"]] } });
  DS.card(S, "DAVE", 900, 450, { size: DS.type.body, t: W(1, 2) });
  DS.vignette(S); }

// Thirty-six, thirty-seven, thirty-eight. Dave stops. That's the number he's afraid of.
{ const S = sc(2, 0, { cam: "zoom", focus: "1200 520" }); street(S, DS.outdoor(S, DAY));
  crowdRow(S, 8, 140, 1780, GF, "far", { k: 2 });
  const F = dave(S, 560, GN, "near", { s: 1.3, mood: "flat", look: 8 });
  counter(S, 1240, 480, 2.6, { nums: [[T0(S), "36"], [W(2, 1), "37"], [W(2, 2), "38", "red"]] });
  F.face(W(2, 3), "wow", 8); F.face(W(2, 7), "worried", 8);
  S.draw(rrect(1110, 392, 260, 176, DS.r.md), W(2, 7), 0, { c: DS.c("red"), w: DS.w.near });
  DS.vignette(S); }

// Dave once read that thirty-eight people heard a woman cry for help, / and not one of them did anything.
{ const S = sc(3, 0, { cam: "zoom", focus: "960 520" }); DS.outdoor(S, { hy: 900, sky: "night", hills: "gray", ground: "gray", sun: false });
  apartment(S, 340, 920, 8, 5, { cw: 155, rh: 130, lit: (i) => i !== 12 && i !== 29, heads: W(3, 5) });
  DS.card(S, "38 PEOPLE", 700, 110, { size: DS.type.body, t: W(3, 4) });
  DS.card(S, "NOT ONE", 1220, 110, { size: DS.type.body, t: W(4, 1), tc: "red" });
  DS.vignette(S, 0.18); }

// So Dave has a plan. If he ever collapses, he'll do it in front of exactly one person, ideally a nurse.
{ const S = sc(5, 0, { cam: "push", focus: "960 600" }); street(S, DS.outdoor(S, DAY));
  crowdRow(S, 7, 160, 1760, GF, "far", { k: 5 });
  const F = dave(S, 560, GN, "near", { pose: "hold", mood: "determined", look: 6 });
  const [hx, hy] = F.hand("R"); clipboard(S, hx - 30, hy + 40, 250, 220, ["MY PLAN:", "1 PERSON"]);
  xMark(S, 1080, 900, 0.6, W(5, 8)); txt(S, "COLLAPSE HERE", 1080, 850, { t: W(5, 8) });
  const N = nurse(S, 1400, GN, { t: W(5, 16), cap: W(5, 19) });
  DS.card(S, "EXACTLY 1 PERSON", 1400, 300, { size: DS.type.small, t: W(5, 15) });
  DS.card(S, "IDEALLY A NURSE", 1400, 420, { size: DS.type.small, t: W(5, 19), tc: "red" });
  F.face(W(5, 19), "smile", 6);
  DS.vignette(S); }

// Psychologists have a name for what Dave is afraid of: the bystander effect.
{ const S = sc(6, 0, { cam: "pull" }); street(S, DS.outdoor(S, DAY));
  crowdRow(S, 11, 140, 1780, GF, "far", { k: 1 });
  crowdRow(S, 7, 180, 1740, GM, "mid", { k: 6, skip: [3] });
  dave(S, 960, GN, "near", { s: 0.9, mood: "worried", look: -6 });
  DS.card(S, "THE BYSTANDER EFFECT", 960, 200, { size: DS.type.title, t: W(6, 10), tc: "red" });
  DS.vignette(S); }

// So, if you fell down right here, in front of thirty-eight strangers, would anyone help you?
{ const S = sc(7, 0, { cam: "push", focus: "960 700" }); street(S, DS.outdoor(S, DAY));
  crowdRow(S, 12, 120, 1800, GF, "far", { k: 3 });
  crowdRow(S, 6, 160, 1760, GM, "mid", { k: 8, skip: [2, 3] });
  const Y = person(S, 760, 900, "near", 2, { s: 1.0, mood: "worried", outfitC: DS.c("sky") });
  Y.lie(W(7, 3), 0.4, 86);
  DS.card(S, "YOU", 960, 790, { size: DS.type.small, t: W(7, 2) });
  DS.card(S, "38 STRANGERS", 960, 130, { size: DS.type.body, t: W(7, 10) });
  DS.card(S, "WOULD ANYONE HELP?", 960, 250, { size: DS.type.body, t: W(7, 12), tc: "red" });
  DS.vignette(S); }

// To find out, we'll need a fake seizure, a room full of smoke, / and two hundred and nineteen real fights and arguments, caught on camera.
{ const S = sc(8, 0, { cam: "push" }); DS.room(S, { wall: "paper", floor: "gray", window: false });
  [[400, W(8, 6), "FAKE SEIZURE"], [960, W(8, 9), "ROOM OF SMOKE"], [1520, W(9, 1), "219 REAL FIGHTS"]].forEach(([x, t, s], i) => {
    panel(S, x, 500, 480, 500, t, i === 1 ? "wall" : "white");
    if (i === 0) { intercom(S, x - 70, 470, 1.1, { t }); mic(S, x + 110, 640, 1.1); }
    if (i === 1) { vent(S, x - 60, 360, 1, t); puff(S, x + 30, 460, 1.0, t, { drift: [60, 40, 3] }); puff(S, x + 110, 560, 0.8, t, { drift: [60, 30, 3] }); }
    if (i === 2) cctv(S, x + 60, 300, 1.4, { t });
    txt(S, s, x, 700, { t, size: DS.type.caption });
  });
  DS.card(S, "TO FIND OUT", 960, 140, { size: DS.type.body, t: W(8, 0) });
  DS.vignette(S); }

// Plus that number, thirty-eight, which isn't quite what it seems.
{ const S = sc(10, 0, { cam: "zoom", focus: "960 500" }); DS.room(S, { wall: "navy", floor: "navy", window: false });
  const g = counter(S, 960, 520, 2.6, { c: "red" });
  S.move(g, W(10, 5), 0.5, { rotation: -8, svgOrigin: "960 520" }, "back.out(2)");
  S.text("?", 1330, 470, { size: DS.type.display, t: W(10, 5), c: DS.c("yellow") });
  DS.card(S, "THAT NUMBER", 960, 160, { size: DS.type.body, t: W(10, 1) });
  DS.vignette(S, 0.2); }

// In nineteen sixty-four, a young woman named Kitty Genovese was killed by a stranger, near her home in Queens, New York.
{ const S = sc(11, 0, { cam: "pull" }); queens(S, DS.outdoor(S, QNIGHT));
  DS.card(S, "1964", 330, 130, { size: DS.type.small, t: W(11, 1) });
  DS.card(S, "KITTY GENOVESE", 860, 130, { size: DS.type.small, t: W(11, 7) });
  DS.card(S, "QUEENS, NEW YORK", 1500, 130, { size: DS.type.small, t: W(11, 18) });
  DS.vignette(S, 0.2); }

// Two weeks later, the New York Times reported that thirty-eight neighbors had watched the attack,
{ const S = sc(12, 0, { cam: "push", focus: "800 450" }); DS.room(S, { wall: "wall", floor: "wood", window: false });
  page64(S);
  DS.card(S, "2 WEEKS LATER", 1560, 200, { size: DS.type.small, t: W(12, 0) });
  S.draw(circ(P38[0], P38[1], 170, 40), W(12, 9), 0, { c: DS.c("red"), w: DS.w.near });
  DS.card(S, "38 NEIGHBORS", 1560, 520, { size: DS.type.body, t: W(12, 9), tc: "red" });
  DS.vignette(S); }

// and that nobody called the police until it was too late.
{ const S = sc(13, 0, { cam: "zoom", focus: "1000 640" }); DS.room(S, { wall: "night", floor: "wood", window: false });
  nightWin(S, 1270, 190, 260, 260);
  const top = sideTable(S, 820, GN, 380); rotary(S, 1010, top, 1.2);
  DS.card(S, "NOBODY CALLED", 700, 220, { size: DS.type.body, t: W(13, 2), tc: "red" });
  DS.card(S, "TOO LATE", 700, 350, { size: DS.type.small, t: W(13, 9) });
  DS.vignette(S, 0.2); }

// The story went around the world, as proof that big cities had made people cold.
{ const S = sc(14, 0, { cam: "push", focus: "960 540" }); DS.room(S, { wall: "paper", floor: "gray", window: false });
  globe(S, 540, 540, 220);
  const orbit = S.grp();
  [0, 1, 2, 3].forEach((i) => { const a = (i * Math.PI) / 2 + 0.4, x = 540 + Math.cos(a) * 300, y = 540 + Math.sin(a) * 300, g = S.grp(orbit); paperR(S, x - 50, y - 64, 100, 128, { t: W(14, 2) + i * 0.15, parent: g }); lines(S, x - 34, y - 34, 68, 4, W(14, 2) + i * 0.15, 20, g); });
  S.move(orbit, S.start, S.len, { rotation: 50, svgOrigin: "540 540" }, "none");
  iceCity(S, W(14, 14));
  DS.card(S, "AROUND THE WORLD", 540, 140, { size: DS.type.small, t: W(14, 2) });
  DS.card(S, "COLD CITIES?", 1390, 200, { size: DS.type.body, t: W(14, 9), tc: "blue" });
  DS.vignette(S); }

// ===================== 2. The voice on the intercom =====================
// Two young psychologists in New York, John Darley and Bibb Latané, weren't convinced.
{ const S = sc(15, 0, { cam: "push", focus: "960 560" }); DS.room(S, { wall: "wall", floor: "wood", window: [1330, 150, 200, 200] });
  const D = who(S, 700, GN, "near", DARLEY), L = who(S, 1220, GN, "near", LATANE);
  DS.card(S, "JOHN DARLEY", 700, 440, { size: DS.type.small, t: W(15, 6) });
  DS.card(S, "BIBB LATANÉ", 1220, 440, { size: DS.type.small, t: W(15, 9) });
  D.face(W(15, 11), "determined", 6); L.face(W(15, 11), "determined", -6);
  DS.card(S, "NOT CONVINCED", 960, 150, { size: DS.type.body, t: W(15, 11), tc: "red" });
  DS.vignette(S); }

// Over dinner, they landed on a strange idea. / What if the problem wasn't the people? What if it was the number?
{ const S = sc(16, 0, { cam: "push", focus: "960 480" }); DS.room(S, { wall: "wall", floor: "wood", window: false }); nightWin(S, 1460, 160, 200, 200);
  who(S, 600, GN, "near", Object.assign({}, DARLEY, { look: 6 })); who(S, 1320, GN, "near", Object.assign({}, LATANE, { look: -6 }));
  table(S, 380, 1540, 780);
  [700, 1220].forEach((x) => { DS.shape(S, circ(x, 776, 90, 16), "white", { w: "detail" }); DS.shape(S, circ(x, 770, 52, 9), "orange", { w: "hair" }); });
  S.bulb(960, 620, 0.8, W(16, 6), 0);
  say(S, 960, 290, 380, 150, 960, 540, ["THE PEOPLE?", "THE NUMBER?"], W(17, 0), { think: true, size: DS.type.body });
  S.draw(line([740, 248], [1180, 238], 0), W(17, 6), 0, { c: DS.c("red"), w: DS.w.near });
  S.draw(circ(960, 334, 250, 52), W(17, 12), 0, { c: DS.c("red"), w: DS.w.near });
  DS.vignette(S); }

// So they built a fake emergency, and we're putting Dave in it.
{ const S = sc(18, 0, { cam: "push", focus: "1000 540" }); DS.room(S, { wall: "glass", floor: "gray", window: false });
  labDoor(S, 1060, 300, 240, 460, { sign: "LAB" });
  const R = who(S, 720, GN, "near", Object.assign({}, PROF, { pose: "point", look: 6 }));
  dave(S, 1480, GN, "near", { t: W(18, 9), mood: "worried", look: -6 });
  DS.card(S, "FAKE EMERGENCY", 760, 160, { size: DS.type.body, t: W(18, 4), tc: "red" });
  DS.vignette(S); }

// Dave sits alone in a small room at New York University, in a headset.
{ const S = sc(19, 0, { cam: "zoom", focus: "960 600" }); DS.room(S, BOOTH);
  intercom(S, 1250, 380, 1);
  const F = seated(S, 900, 850, { mood: "flat", look: 6 });
  table(S, 640, 1180, 850); mic(S, 1060, 850);
  headset(S, F, W(19, 13));
  DS.card(S, "ALONE", 640, 330, { size: DS.type.body, t: W(19, 2) });
  DS.card(S, "NEW YORK UNIVERSITY", 960, 110, { size: DS.type.small, t: W(19, 8) });
  DS.vignette(S); }

// He's told he's in a group discussion over an intercom, one microphone at a time.
{ const S = sc(20, 0, { cam: "zoom", focus: "1100 420" }); DS.room(S, BOOTH);
  intercom(S, 1250, 380, 1, { on: W(20, 8) });
  const F = seated(S, 820, 850, { mood: "flat", look: 6 }); headset(S, F);
  table(S, 560, 1100, 850); mic(S, 980, 850);
  DS.card(S, "GROUP DISCUSSION", 820, 120, { size: DS.type.small, t: W(20, 5) });
  for (let i = 0; i < 5; i++) { const x = 640 + i * 120, y = 250; mini(S, x, y + 34, 1.1, { t: W(20, 5) + i * 0.06 });
    DS.shape(S, circ(x, y + 70, 12), "gray", { w: "detail", t: W(20, 5) + i * 0.06 });
    const on = DS.shape(S, circ(x, y + 70, 12), "red", { w: "detail", t: W(20, 10) + i * 0.55 }); if (i < 4) S.hide(on, W(20, 10) + (i + 1) * 0.55); }
  DS.vignette(S); }

// Then another student, who'd mentioned he gets seizures, starts to stammer and asks for help.
{ const S = sc(21, 0, { cam: "zoom", focus: "1150 420" }); DS.room(S, BOOTH);
  intercom(S, 1250, 380, 1.3, { on: true });
  const F = seated(S, 760, 850, { mood: "flat", look: 6 }); headset(S, F);
  table(S, 500, 1040, 850); mic(S, 920, 850);
  [0, 1, 2].forEach((i) => S.draw(poly([[1150 - i * 40, 300 + i * 10], [1130 - i * 40, 330], [1150 - i * 40, 360], [1130 - i * 40, 390], [1150 - i * 40, 420 - i * 10]], 0), W(21, 8) + i * 0.12, 0, { c: DS.c("ink"), w: DS.w.mid }));
  say(S, 830, 300, 190, 80, 1090, 360, ["HELP...?"], W(21, 12));
  F.face(W(21, 8), "worried", 8);
  DS.card(S, "ANOTHER STUDENT", 1250, 120, { size: DS.type.small, t: W(21, 1) });
  DS.vignette(S); }

// One participant, overheard on her microphone, said to herself, / "It's just my kind of luck, something has to happen to me."
{ const S = sc(22, 0, { cam: "push", focus: "800 520" }); DS.room(S, Object.assign({}, BOOTH, { wall: "pink" }));
  const F = seated(S, 640, 850, { dave: false, hair: "bun", hairC: DS.c("earth", 2), outfitC: DS.c("green"), mood: "flat", look: 6 }); headset(S, F);
  table(S, 400, 900, 850); mic(S, 800, 850);
  F.face(W(23, 0), "worried", 6);
  say(S, 1200, 370, 420, 150, 760, 580, ["IT'S JUST MY KIND OF LUCK,", "SOMETHING HAS TO", "HAPPEN TO ME!"], W(23, 0), { size: DS.type.caption });
  DS.card(S, "ONE PARTICIPANT", 640, 120, { size: DS.type.small, t: W(22, 0) });
  DS.vignette(S); }

// The scientists timed how long it took to get up and tell someone.
{ const S = sc(24, 0, { cam: "push", focus: "1100 500" }); DS.room(S, { wall: "glass", floor: "gray", window: false });
  const R = who(S, 620, GN, "near", Object.assign({}, PROF, { pose: "hold", look: 6, mood: "determined" }));
  clipboard(S, R.hand("R")[0] - 20, R.hand("R")[1] + 40, 200, 200, ["TIME:"]);
  stopwatch(S, 1250, 520, 200, { t: W(24, 2), go: W(24, 2), dur: S.end - W(24, 2) });
  DS.card(S, "TIME TO TELL SOMEONE", 1250, 140, { size: DS.type.small, t: W(24, 9) });
  DS.vignette(S); }

// Some believed they were the only listener. / Others, that four more students could hear it too.
{ const S = sc(25, 0, { cam: "push" }); DS.room(S, { wall: "paper", floor: "gray", window: false });
  panel(S, 500, 560, 720, 620, S.start, "glass"); panel(S, 1420, 560, 720, 620, S.start, "glass");
  const A = seated(S, 500, 800, { s: 0.95, mood: "flat", look: 0 }); headset(S, A);
  const B = seated(S, 1260, 800, { s: 0.95, mood: "flat", look: 6, t: W(26, 0) }); headset(S, B, W(26, 0));
  table(S, 300, 700, 800, 860); table(S, 1080, 1440, 800, 860);
  [[1500, 390], [1680, 390], [1500, 600], [1680, 600]].forEach(([x, y], i) => { const t = W(26, 2) + i * 0.1; DS.shape(S, rrect(x - 60, y - 70, 120, 140, DS.r.sm), "white", { t, w: "detail" }); mini(S, x, y + 50, 1.2, { t }); });
  DS.card(S, "ONLY LISTENER", 500, 170, { size: DS.type.small, t: W(25, 5) });
  DS.card(S, "+ 4 LISTENERS", 1420, 170, { size: DS.type.small, t: W(26, 2), tc: "red" });
  DS.vignette(S); }

// Alone? Eighty-five percent went for help before the seizure ended. / With four others listening? Only thirty-one percent.
{ const S = sc(27, 0, { cam: "push", focus: "960 520" }); DS.room(S, { wall: "paper", floor: "gray", window: false }); wboard(S, 300, 110, 1320, 790);
  DS.card(S, "WENT FOR HELP", 960, 190, { size: DS.type.small, t: W(27, 3) });
  bar(S, 560, 790, 260, 0.85 * 460, "green", W(27, 1)); S.text("85%", 690, 380, { size: DS.type.display, t: W(27, 1), c: DS.c("green", 2) });
  txt(S, "ALONE", 690, 850, { size: DS.type.small, t: W(27, 0) }); mini(S, 820, 860, 0.9, { t: W(27, 0) });
  bar(S, 1100, 790, 260, 0.31 * 460, "red", W(28, 5)); S.text("31%", 1230, 600, { size: DS.type.display, t: W(28, 5), c: DS.c("red", 2) });
  txt(S, "WITH 4 OTHERS", 1230, 850, { size: DS.type.small, t: W(28, 1) });
  DS.vignette(S); }

// Here's the strange part: the other four students were tape recordings.
{ const S = sc(29, 0, { cam: "push", focus: "1150 480" }); DS.room(S, BOOTH);
  const F = seated(S, 640, 850, { mood: "flat", look: 6 }); headset(S, F);
  table(S, 400, 880, 850);
  [[1040, 300], [1280, 300], [1040, 540], [1280, 540]].forEach(([x, y], i) => { const t = W(29, 9) + i * 0.12;
    DS.shape(S, rrect(x - 100, y - 90, 200, 180, DS.r.sm), "white", { w: "detail" });
    const h = S.grp(); mini(S, x, y + 70, 1.6, { parent: h }); S.fadeOut(h, t, 0.3); tape(S, x, y, 0.85, { t }); });
  DS.card(S, "TAPE RECORDINGS", 1160, 120, { size: DS.type.body, t: W(29, 9), tc: "red" });
  DS.vignette(S); }

// So every crowd of five had exactly one real person in it. / And that person waited for the tapes.
{ const S = sc(30, 0, { cam: "push", focus: "960 600" }); DS.room(S, { wall: "glass", floor: "gray", window: false });
  const F = dave(S, 420, GN, "near", { s: 1.0, mood: "flat", look: 0 }); headset(S, F);
  [800, 1060, 1320, 1580].forEach((x) => { DS.shadow(S, x, 900, 220); DS.shape(S, rrect(x - 90, 740, 180, 26, DS.r.xs), "wood"); DS.shape(S, rect(x - 14, 766, 28, 134), "wood", { w: "mid" }); tape(S, x, 664, 0.9); });
  DS.card(S, "A CROWD OF 5", 1190, 300, { size: DS.type.small, t: W(30, 2) });
  ringFig(S, F, W(30, 7));
  DS.card(S, "1 REAL PERSON", 420, 400, { size: DS.type.small, t: W(30, 7), tc: "red" });
  F.face(W(31, 3), "worried", 8);
  DS.card(S, "WAITING FOR THE TAPES", 1190, 160, { size: DS.type.small, t: W(31, 3) });
  DS.vignette(S); }

// But the ones who stayed weren't cold. Their hands shook, and their palms sweated.
{ const S = sc(32, 0, { cam: "zoom", focus: "960 640" }); DS.room(S, BOOTH);
  const F = seated(S, 960, 850, { s: 1.35, mood: "worried", look: 0 }); headset(S, F);
  table(S, 600, 1320, 850);
  tl.to(F.arms, { x: 3, duration: 0.05, yoyo: true, repeat: Math.max(1, Math.floor((S.end - W(32, 8)) / 0.05)), ease: "none" }, W(32, 8));
  const [lx, ly] = F.hand("L"), [rx, ry] = F.hand("R");
  [[lx - 40, ly - 10], [rx + 40, ry - 10]].forEach(([x, y]) => S.draw(`M${x - 12} ${y - 22} L${x + 12} ${y - 30} M${x - 14} ${y} L${x + 14} ${y - 6}`, W(32, 8), 0, { c: DS.c("ink"), w: DS.w.detail }));
  [[lx - 70, ly - 50], [rx + 70, ry - 50], [F.hd[0] + 90, F.hd[1] - 30]].forEach(([x, y], i) => S.drop(x, y, 1.4, W(32, 12) + i * 0.12, 0));
  DS.card(S, "NOT COLD", 960, 150, { size: DS.type.body, t: W(32, 5), tc: "green" });
  DS.vignette(S); }

// When the researcher came in, many asked: / "Is he being taken care of?"
{ const S = sc(33, 0, { cam: "push", focus: "960 520" }); DS.room(S, BOOTH);
  labDoor(S, 1140, 300, 200, 460, { open: W(33, 3) });
  who(S, 1250, 800, "mid", Object.assign({}, PROF, { t: W(33, 3), look: -6 }));
  const F = seated(S, 700, 850, { mood: "worried", look: 8 }); headset(S, F);
  table(S, 440, 960, 850);
  say(S, 620, 300, 330, 120, 690, 560, ["IS HE BEING", "TAKEN CARE OF?"], W(34, 0));
  DS.vignette(S); }

// They hadn't decided not to help. / They were waiting for somebody else to go first.
{ const S = sc(35, 0, { cam: "zoom", focus: "800 560" }); DS.room(S, BOOTH);
  const F = seated(S, 680, 850, { mood: "worried", look: 8 }); headset(S, F);
  table(S, 420, 940, 850);
  [[1080, 330], [1300, 330], [1080, 560], [1300, 560]].forEach(([x, y]) => tape(S, x, y, 0.8));
  F.setPose(W(36, 2), "reach"); F.face(W(36, 4), "worried", 8);
  DS.card(S, "UNDECIDED", 680, 330, { size: DS.type.small, t: W(35, 1) });
  DS.card(S, "WAITING FOR SOMEBODY ELSE", 960, 120, { size: DS.type.small, t: W(36, 4) });
  DS.vignette(S); }

// Darley and Latané called it diffusion of responsibility. / One job, split five ways, feels like a fifth of a job.
{ const S = sc(37, 0, { cam: "push", focus: "960 500" }); DS.room(S, { wall: "paper", floor: "gray", window: false });
  DS.card(S, "DIFFUSION OF RESPONSIBILITY", 960, 130, { size: DS.type.small, t: W(37, 5) });
  const big = S.grp(); DS.drop(S, rrect(816, 336, 300, 240, DS.r.md), { t: W(38, 0), parent: big }); DS.shape(S, rrect(810, 320, 300, 240, DS.r.md), "gold", { t: W(38, 0), parent: big }); S.text("1 JOB", 960, 470, { size: DS.type.title, t: W(38, 0), c: DS.c("ink"), parent: big });
  S.fadeOut(big, W(38, 2), 0.3);
  for (let i = 0; i < 5; i++) { const g = S.grp(); DS.shape(S, rrect(810 + i * 60, 320, 60, 240, DS.r.xs), "gold", { t: W(38, 2), parent: g }); S.move(g, W(38, 2) + 0.15, 0.7, { x: 560 + i * 200 - 840 - i * 60 }, "power2.out"); }
  dave(S, 560, 930, "near", { s: 0.72, mood: "flat", look: 6, t: W(38, 2) });
  [760, 960, 1160, 1360].forEach((x, i) => tape(S, x, 820, 0.6, { t: W(38, 2) + i * 0.08 }));
  DS.card(S, "1/5 OF A JOB", 1500, 230, { size: DS.type.body, t: W(38, 8), tc: "red" });
  DS.vignette(S); }

// Dave approves. His nurse plan now has a scientific paper behind it.
{ const S = sc(39, 0, { cam: "push", focus: "760 560" }); DS.room(S, { wall: "wall", floor: "wood", window: [1330, 160, 220, 200] });
  const F = dave(S, 640, GN, "near", { pose: "hold", mood: "smile", look: 6 });
  const [hx, hy] = F.hand("R"); clipboard(S, hx - 30, hy + 40, 250, 220, ["MY PLAN:", "1 NURSE"]);
  F.face(W(39, 1), "happy", 6);
  paperR(S, 1080, 380, 300, 380, { t: W(39, 8) }); txt(S, "SCIENCE", 1230, 450, { size: DS.type.small, t: W(39, 8) }); txt(S, "1968", 1230, 510, { t: W(39, 8), c: DS.c("red", 2) }); lines(S, 1110, 560, 240, 4, W(39, 8), 40);
  S.arrow(1060, 600, hx + 110, hy + 10, W(39, 10), 0.3, { c: DS.c("green"), w: DS.w.near, bend: 0.2 });
  DS.card(S, "DAVE APPROVES", 960, 150, { size: DS.type.body, t: W(39, 1), tc: "green" });
  DS.vignette(S); }

// ===================== 3. The room filling with smoke =====================
// But nobody in that study could see anybody. / So their second test, at Columbia University, had faces.
{ const S = sc(40, 0, { cam: "pull" }); DS.room(S, { wall: "glass", floor: "gray", window: false });
  const tF = W(41, 5);
  [260, 560, 860, 1160, 1460].forEach((x, i) => {
    const box = DS.shape(S, rect(x - 130, 380, 260, 470), "white", { w: "mid" }), lid = DS.shape(S, rect(x - 130, 380, 260, 40), "gray", { tone: 1, flat: true, w: "detail" });
    S.fadeOut(box, tF, 0.5); S.fadeOut(lid, tF, 0.5);
    if (i === 0) mini(S, x, 830, 2.4, { fill: DS.c("blue", 1) }); else { S.fadeOut(tape(S, x, 700, 0.75), tF, 0.4); mini(S, x, 830, 2.4, { fill: DS.c(OC[i], 1), t: tF + 0.1 }); }
    S.eye(x, 310, 1.1, S.start, 0); S.fadeOut(xMark(S, x, 310, 0.75, W(40, 6) + i * 0.08).g, tF, 0.4); });
  DS.card(S, "NO ONE COULD SEE", 960, 130, { size: DS.type.body, t: W(40, 5) });
  DS.card(S, "COLUMBIA UNIVERSITY", 960, 225, { size: DS.type.small, t: W(41, 5) });
  DS.vignette(S); }


// Dave is filling in a questionnaire when white smoke starts puffing out of a wall vent.
{ const S = sc(42, 0, { cam: "zoom", focus: "1100 440" }); smokeRoom(S, DS.room(S, SMOKE));
  const F = seated(S, 800, 850, { mood: "flat", look: 2 }); table(S, 560, 1060, 850); paperR(S, 760, 840, 140, 12); S.pencil(880, 838, 120, -40, S.start, 0);
  puff(S, VX - 70, VY + 40, 1.1, W(42, 8), { drift: [-140, 30, 4] }); puff(S, VX + 60, VY + 80, 0.9, W(42, 10), { drift: [-90, 40, 4] }); puff(S, VX - 200, VY + 10, 0.8, W(42, 13), { drift: [-120, 20, 4] });
  F.face(W(42, 9), "wow", 8);
  DS.card(S, "WHITE SMOKE", 1290, 140, { size: DS.type.small, t: W(42, 7) });
  DS.vignette(S); }

// Alone, Dave is sensible. He sniffs it, waves at it, and goes to report it.
{ const S = sc(43, 0, { cam: "push", focus: "960 520" }); smokeRoom(S, DS.room(S, SMOKE), { puffs: 4 });
  const F = dave(S, 1180, GN, "near", { mood: "flat", look: 6 });
  F.face(W(43, 5), "wow", 8); F.setPose(W(43, 7), "wave"); S.fadeOut(F.all, W(43, 11), 0.35);
  dave(S, 660, 800, "mid", { t: W(43, 11), pose: "reachL", mood: "determined", look: -6 });
  DS.card(S, "ALONE", 760, 150, { size: DS.type.body, t: W(43, 0) });
  DS.card(S, "SENSIBLE", 1140, 150, { size: DS.type.body, t: W(43, 3), tc: "green" });
  DS.vignette(S); }

// Three out of four lone students did the same.
{ const S = sc(44, 0, { cam: "push" }); DS.room(S, { wall: "paper", floor: "gray", window: false });
  [330, 750, 1170, 1590].forEach((x, i) => { panel(S, x, 540, 360, 440, S.start, "wall"); vent(S, x + 90, 400, 0.6); puff(S, x + 40, 460, 0.6, S.start);
    mini(S, x - 40, 720, 2.2, { fill: DS.c(OC[i], 1) }); if (i < 3) tick(S, x + 70, 620, 1.6, W(44, 0) + i * 0.25); });
  DS.card(S, "3 OUT OF 4", 960, 170, { size: DS.type.body, t: W(44, 3), tc: "green" });
  DS.vignette(S); }

// Now sit Dave with two other students. / They're actors, told to look at the smoke, shrug, and keep writing.
{ const S = sc(45, 0, { cam: "push", focus: "960 560" }); smokeRoom(S, DS.room(S, SMOKE), { puffs: 3, puffT: W(46, 6) });
  const A = seated(S, 560, 850, Object.assign({}, ACTOR, { dave: false, look: 6, t: W(45, 4) }));
  const F = seated(S, 960, 850, { mood: "flat", look: 0 });
  const B = seated(S, 1360, 850, Object.assign({}, ACTOR, { dave: false, look: -6, t: W(45, 4), hair: "curly" }));
  table(S, 380, 1540, 850); [600, 1000, 1400].forEach((x) => paperR(S, x - 60, 842, 120, 12));
  DS.card(S, "ACTOR", 560, 470, { size: DS.type.small, t: W(46, 1), tc: "red" }); DS.card(S, "ACTOR", 1360, 470, { size: DS.type.small, t: W(46, 1), tc: "red" });
  [A, B].forEach((P) => { P.face(W(46, 4), "flat", 0); P.setPose(W(46, 8), "shrug"); P.setPose(W(46, 10), "hold"); });
  F.face(W(46, 6), "worried", 6);
  DS.vignette(S); }

// If Dave asks what it is, they say, I dunno, / and go back to their questionnaires.
{ const S = sc(47, 0, { cam: "push", focus: "960 560" }); smokeRoom(S, DS.room(S, SMOKE), { puffs: 4 });
  const A = seated(S, 560, 850, Object.assign({}, ACTOR, { dave: false, look: 6 }));
  const F = seated(S, 960, 850, { mood: "worried", look: -6 });
  const B = seated(S, 1360, 850, Object.assign({}, ACTOR, { dave: false, look: -6, hair: "curly" }));
  table(S, 380, 1540, 850); [600, 1000, 1400].forEach((x) => paperR(S, x - 60, 842, 120, 12));
  say(S, 960, 440, 210, 70, 960, 600, ["WHAT IS IT?"], W(47, 2));
  const b = say(S, 1480, 470, 190, 70, 1380, 610, ["I DUNNO."], W(47, 8)); S.fadeOut(b, W(48, 3), 0.3);
  F.face(W(47, 2), "worried", 8);
  [A, B].forEach((P) => P.face(W(48, 1), "flat", 0));
  DS.vignette(S); }

// Of ten students tested like this, one reported the smoke.
{ const S = sc(49, 0, { cam: "push" }); DS.room(S, { wall: "paper", floor: "gray", window: false });
  for (let i = 0; i < 10; i++) { const x = 560 + (i % 5) * 200, y = i < 5 ? 520 : 820; mini(S, x, y, 2.3, { fill: DS.c(OC[i % 9], 1), t: W(49, 1) + i * 0.05 }); }
  S.draw(circ(560 + 200, 820 - 90, 92, 130), W(49, 6), 0, { c: DS.c("green"), w: DS.w.near }); tick(S, 840, 640, 1.4, W(49, 7));
  DS.card(S, "10 TESTED", 700, 140, { size: DS.type.small, t: W(49, 1) });
  DS.card(S, "1 REPORTED IT", 1220, 140, { size: DS.type.small, t: W(49, 6), tc: "green" });
  DS.vignette(S); }

// The other nine stayed, coughing, rubbing their eyes, waving the smoke away,
{ const S = sc(50, 0, { cam: "zoom", focus: "960 600" }); smokeRoom(S, DS.room(S, SMOKE), { haze: 0.3, puffs: 5, band: true });
  const A = seated(S, 560, 850, Object.assign({}, ACTOR, { dave: false, look: 6 }));
  const F = seated(S, 960, 850, { mood: "flat", look: 0 });
  const B = seated(S, 1360, 850, Object.assign({}, ACTOR, { dave: false, look: -6, hair: "curly" }));
  table(S, 380, 1540, 850);
  F.face(W(50, 4), "cry", 0); S.draw(`M${F.hd[0] + 70} ${F.hd[1] + 20} l26 -10 M${F.hd[0] + 72} ${F.hd[1] + 36} l30 0`, W(50, 4), 0, { c: DS.c("ink"), w: DS.w.detail });
  A.setPose(W(50, 5), "head"); A.face(W(50, 5), "sleep", 0);
  B.setPose(W(50, 8), "wave"); B.face(W(50, 8), "worried", -6);
  DS.card(S, "THE OTHER 9 STAYED", 960, 140, { size: DS.type.body, t: W(50, 2) });
  DS.vignette(S); }

// and opening a window. / They did not open the door.
{ const S = sc(50, 13, { cam: "push", focus: "960 480" }); smokeRoom(S, DS.room(S, SMOKE), { haze: 0.3, open: true, puffs: 5, band: true });
  seated(S, 760, 850, Object.assign({}, ACTOR, { dave: false, look: 6, mood: "smile" }));
  seated(S, 1160, 850, { mood: "flat", look: 8 });
  table(S, 580, 1340, 850);
  puff(S, WIN[0] - 60, WIN[1] + 90, 0.9, S.start, { drift: [160, -60, S.len] });
  const [dx, dy, dw, dh] = DOOR; S.draw(rrect(dx - 26, dy - 26, dw + 52, dh + 40, DS.r.md), W(51, 3), 0, { c: DS.c("red"), w: DS.w.near });
  DS.card(S, "NOT THE DOOR", 500, 200, { size: DS.type.body, t: W(51, 4), tc: "red" });
  DS.vignette(S); }

// Afterwards, they explained. It was steam, or air-conditioning, / or smog pumped in to make it feel like a city.
{ const S = sc(52, 0, { cam: "push", focus: "960 500" }); smokeRoom(S, DS.room(S, SMOKE), { haze: 0.2, puffs: 2 });
  [560, 960, 1360].forEach((x, i) => (i === 1 ? seated(S, x, 850, { mood: "smile", look: 0 }) : seated(S, x, 850, Object.assign({}, ACTOR, { dave: false, mood: "smile", look: i ? -4 : 4 }))));
  table(S, 380, 1540, 850);
  [[560, "STEAM?", W(52, 5)], [960, "AIR-CON?", W(52, 7)], [1360, "CITY SMOG?", W(53, 1)]].forEach(([x, s, t]) => say(S, x, 450, 190, 72, x, 620, [s], t, { think: true }));
  DS.card(S, "THEIR EXPLANATIONS", 860, 130, { size: DS.type.small, t: W(52, 1) });
  DS.vignette(S); }

// And two students decided it was truth gas, to make them answer the questionnaire honestly.
{ const S = sc(54, 0, { cam: "zoom", focus: "960 520" }); smokeRoom(S, DS.room(S, SMOKE), { haze: 0.2, puffs: 3 });
  const A = seated(S, 640, 850, { dave: false, hair: "messy", hairC: DS.c("brown"), outfitC: DS.c("orange"), look: 6, mood: "flat" });
  const B = seated(S, 1280, 850, { dave: false, hair: "bun", hairC: DS.c("ink"), outfitC: DS.c("purple"), look: -6, mood: "flat" });
  table(S, 440, 1480, 850); [700, 1340].forEach((x) => paperR(S, x - 60, 842, 120, 12));
  const g = S.grp(); S.thought(960, 400, 240, 190, 960, 640, W(54, 6), 0.3, { parent: g });
  DS.shape(S, rrect(900, 300, 120, 200, DS.r.lg), "green", { t: W(54, 6), parent: g }); DS.shape(S, rrect(935, 270, 50, 36, DS.r.xs), "gray", { t: W(54, 6), tone: 2, w: "detail", parent: g });
  DS.shape(S, rrect(890, 370, 140, 60, DS.r.xs), "white", { t: W(54, 6), flat: true, w: "detail", parent: g }); txt(S, "TRUTH", 960, 412, { t: W(54, 6), parent: g });
  [A, B].forEach((P) => P.face(W(54, 11), "determined", 0));
  DS.card(S, "TRUTH GAS", 960, 130, { size: DS.type.body, t: W(54, 6), tc: "red" });
  DS.vignette(S); }

// The researchers noted that this did not seem to bother them.
{ const S = sc(55, 0, { cam: "push", focus: "900 560" }); smokeRoom(S, DS.room(S, SMOKE), { haze: 0.2, puffs: 3 });
  const A = seated(S, 640, 850, { dave: false, hair: "messy", hairC: DS.c("brown"), outfitC: DS.c("orange"), look: 0, mood: "flat" });
  const B = seated(S, 1060, 850, { dave: false, hair: "bun", hairC: DS.c("ink"), outfitC: DS.c("purple"), look: 0, mood: "flat" });
  table(S, 440, 1260, 850);
  const R = who(S, 1580, GN, "near", Object.assign({}, PROF, { pose: "hold", look: -6, mood: "flat" })); clipboard(S, R.hand("R")[0] - 30, R.hand("R")[1] + 40, 200, 200, ["NOTE:", "CALM"], { t: W(55, 2) });
  [A, B].forEach((P) => P.face(W(55, 9), "smile", 0));
  DS.card(S, "NOT BOTHERED", 860, 150, { size: DS.type.body, t: W(55, 9) });
  DS.vignette(S); }

// Then three ordinary students together, no actors.
{ const S = sc(56, 0, { cam: "pull" }); smokeRoom(S, DS.room(S, SMOKE));
  seated(S, 560, 850, { dave: false, hair: "messy", hairC: DS.c("brown"), outfitC: DS.c("orange"), look: 6 });
  seated(S, 960, 850, { mood: "flat", look: 0 });
  seated(S, 1360, 850, { dave: false, hair: "bun", hairC: DS.c("ink"), outfitC: DS.c("purple"), look: -6 });
  table(S, 380, 1540, 850); [600, 1000, 1400].forEach((x) => paperR(S, x - 60, 842, 120, 12));
  DS.card(S, "3 REAL STUDENTS", 760, 140, { size: DS.type.small, t: W(56, 1) });
  DS.card(S, "NO ACTORS", 760, 250, { size: DS.type.small, t: W(56, 5), tc: "green" });
  DS.vignette(S); }

// By the odds, nearly every group should have reported it. Only three out of eight did.
{ const S = sc(57, 0, { cam: "push" }); DS.room(S, { wall: "paper", floor: "gray", window: false });
  for (let i = 0; i < 8; i++) { const x = 420 + (i % 4) * 360, y = i < 4 ? 420 : 690, t = W(57, 4) + i * 0.06;
    panel(S, x, y, 300, 220, t, "wall"); minis(S, 3, x - 80, x + 80, y + 80, 1.3, { t, fills: ["orange", "blue", "purple"] });
    if ([1, 4, 6].includes(i)) tick(S, x + 110, y - 70, 1.0, W(57, 11) + i * 0.08); }
  DS.card(S, "EXPECTED: OVER 98%", 600, 150, { size: DS.type.small, t: W(57, 2) });
  DS.card(S, "ONLY 3 OF 8", 1360, 150, { size: DS.type.small, t: W(57, 10), tc: "red" });
  DS.vignette(S); }

// Three heads, it turns out, are worse than one.
{ const S = sc(58, 0, { cam: "push", focus: "960 560" }); DS.room(S, { wall: "wall", floor: "wood", window: false });
  [340, 560, 780].forEach((x, i) => person(S, x, GN, "near", [5, 1, 3][i], { s: 1.0, mood: "flat", look: i === 1 ? 0 : i ? -4 : 4 }));
  puff(S, 560, 380, 1.2, S.start, { drift: [40, -20, S.len] });
  const F = person(S, 1480, GN, "near", 2, { s: 1.1, mood: "wow", look: -4, pose: "wave" });
  S.text("<", 1110, 700, { size: DS.type.display, t: W(58, 5), c: DS.c("red", 2) });
  DS.card(S, "3 HEADS", 560, 180, { size: DS.type.small, t: W(58, 0) });
  DS.card(S, "WORSE THAN 1", 1440, 180, { size: DS.type.small, t: W(58, 6), tc: "red" });
  DS.vignette(S); }

// Each student checked the others' faces. / Everyone looked calm, so everyone decided it was fine.
{ const S = sc(59, 0, { cam: "zoom", focus: "960 640" }); smokeRoom(S, DS.room(S, SMOKE), { haze: 0.2, puffs: 3 });
  const A = seated(S, 560, 850, { dave: false, hair: "messy", hairC: DS.c("brown"), outfitC: DS.c("orange"), look: 0 });
  const F = seated(S, 960, 850, { mood: "flat", look: 0 });
  const B = seated(S, 1360, 850, { dave: false, hair: "bun", hairC: DS.c("ink"), outfitC: DS.c("purple"), look: 0 });
  table(S, 380, 1540, 850);
  A.face(W(59, 1), "flat", 8); F.face(W(59, 2), "flat", -8); B.face(W(59, 3), "flat", -8); F.face(W(59, 4), "flat", 8); A.face(W(59, 5), "flat", 8);
  [A, F, B].forEach((P, i) => { P.face(W(60, 2) + i * 0.1, "smile", 0); say(S, P.cx, 470, 140, 62, P.cx, 600, ["FINE."], W(60, 5) + i * 0.15, { think: true }); });
  DS.card(S, "CHECKING FACES", 960, 140, { size: DS.type.small, t: W(59, 2) });
  DS.vignette(S); }

// Psychologists call this pluralistic ignorance, and Darley later called it an anti-panic mob.
{ const S = sc(61, 0, { cam: "push", focus: "960 600" }); smokeRoom(S, DS.room(S, SMOKE), { haze: 0.3, puffs: 5, band: true });
  seated(S, 560, 850, { dave: false, hair: "messy", hairC: DS.c("brown"), outfitC: DS.c("orange"), look: 4, mood: "smile" });
  seated(S, 960, 850, { mood: "smile", look: 0 });
  seated(S, 1360, 850, { dave: false, hair: "bun", hairC: DS.c("ink"), outfitC: DS.c("purple"), look: -4, mood: "smile" });
  table(S, 380, 1540, 850);
  DS.card(S, "PLURALISTIC IGNORANCE", 960, 140, { size: DS.type.small, t: W(61, 3) });
  DS.card(S, "ANTI-PANIC MOB", 960, 250, { size: DS.type.small, t: W(61, 11), tc: "red" });
  DS.vignette(S); }

// Afterwards, almost all of them claimed they'd ignored the others completely.
{ const S = sc(62, 0, { cam: "push", focus: "960 560" }); DS.room(S, { wall: "wall", floor: "wood", window: [1360, 170, 200, 200] });
  const R = who(S, 360, GN, "near", Object.assign({}, PROF, { pose: "hold", look: 6 })); clipboard(S, R.hand("R")[0] - 20, R.hand("R")[1] + 40, 180, 190, ["?"]);
  [[820, { dave: false, hair: "messy", hairC: DS.c("brown"), outfitC: DS.c("orange") }], [1140, {}], [1460, { dave: false, hair: "bun", hairC: DS.c("ink"), outfitC: DS.c("purple") }]].forEach(([x, o], i) =>
    (o.dave === false ? who : dave)(S, x, GN, "near", Object.assign({ s: 1.1, pose: "cross", mood: "determined", look: [-8, 8, -8][i] }, o)));
  DS.card(S, "CLAIMED: IGNORED THE OTHERS", 1000, 150, { size: DS.type.small, t: W(62, 5) });
  DS.vignette(S); }

// So now Dave has two experiments on his side. / He does his grocery shopping at four in the morning.
{ const S = sc(63, 0, { cam: "push", focus: "900 560" }); DS.room(S, { wall: "white", floor: "gray", window: false });
  shelf(S, 380, 760, 520, 4); shelf(S, 1060, 760, 500, 4);
  const F = dave(S, 940, GN, "near", { pose: "hold", mood: "smile", look: 6 });
  const [hx, hy] = F.hand("R"); DS.shape(S, rrect(hx - 70, hy + 4, 140, 90, DS.r.sm), "red"); S.draw(arc(hx, hy + 6, 50, 180, 360), S.start, 0, { c: DS.c("red", 2), w: DS.w.mid });
  [[1180, 820], [1330, 830]].forEach(([x, y], i) => { paperR(S, x - 60, y - 160, 120, 150, { t: W(63, 4) + i * 0.15 }); txt(S, i ? "SMOKE" : "TAPES", x, y - 110, { t: W(63, 4) + i * 0.15 }); });
  S.digital(1360, 170, "4:00 AM", 1.1, W(64, 6), 0);
  DS.card(S, "2 EXPERIMENTS", 620, 150, { size: DS.type.body, t: W(63, 4), tc: "green" });
  DS.vignette(S); }

// So is that it? Are crowds just thirty-eight people, waiting for each other?
{ const S = sc(65, 0, { cam: "pull" }); street(S, DS.outdoor(S, DAY));
  crowdRow(S, 11, 140, 1780, GF, "far", { k: 2, f: { look: 0 } }).forEach((P, i) => P.face(W(65, 9) + i * 0.05, "flat", i % 2 ? 8 : -8));
  crowdRow(S, 6, 180, 1740, GM, "mid", { k: 7, skip: [2, 3] }).forEach((P, i) => P.face(W(65, 9) + i * 0.05, "flat", i % 2 ? -8 : 8));
  daveCounter(S, 900, { mood: "worried", cnt: { c: "red" } });
  DS.card(S, "WAITING FOR EACH OTHER?", 960, 140, { size: DS.type.small, t: W(65, 9), tc: "red" });
  DS.vignette(S); }

// ===================== 4. The thirty-eight who weren't (told gently; no jokes) =====================
// Not quite. The number thirty-eight had problems from day one.
{ const S = sc(66, 0, { cam: "push", focus: "800 450" }); DS.room(S, { wall: "wall", floor: "wood", window: false });
  page64(S);
  DS.card(S, "NOT QUITE.", 1560, 220, { size: DS.type.body, t: W(66, 0) });
  S.draw(circ(P38[0], P38[1], 170, 40), W(66, 4), 0, { c: DS.c("red"), w: DS.w.near });
  S.text("?", 1300, 560, { size: DS.type.display, t: W(66, 4), c: DS.c("red", 2) });
  DS.card(S, "FROM DAY ONE", 1560, 520, { size: DS.type.small, t: W(66, 7), tc: "red" });
  DS.vignette(S); }

// The Times headline said thirty-seven, and its first sentence said thirty-eight.
{ const S = sc(67, 0, { cam: "push", focus: "700 400" }); DS.room(S, { wall: "wall", floor: "wood", window: false });
  page64(S);
  S.draw(circ(P37[0], P37[1], 56, 46), W(67, 4), 0, { c: DS.c("red"), w: DS.w.near });
  DS.card(S, "HEADLINE: 37", 1560, 300, { size: DS.type.body, t: W(67, 4), tc: "red" });
  S.draw(circ(P38[0], P38[1], 170, 40), W(67, 10), 0, { c: DS.c("red"), w: DS.w.near });
  DS.card(S, "FIRST LINE: 38", 1560, 520, { size: DS.type.body, t: W(67, 10), tc: "red" });
  DS.vignette(S); }

// In two thousand seven, psychologists Rachel Manning, Mark Levine and Alan Collins went back to the trial records.
{ const S = sc(68, 0, { cam: "push", focus: "960 560" }); DS.room(S, { wall: "wall", floor: "wood", window: false });
  const top = sideTable(S, 560, GN, 800);
  for (let i = 0; i < 6; i++) DS.shape(S, rrect(700 + (i % 2) * 10, top - 40 - i * 38, 520, 40, DS.r.xs), "sand", { w: "detail", tone: i % 2 });
  DS.shape(S, rrect(700, top - 300, 140, 40, DS.r.xs), "sand", { w: "detail", tone: 1 }); txt(S, "1964", 770, top - 268, {});
  txt(S, "TRIAL RECORDS", 960, top - 120, { size: DS.type.small });
  S.magnifier(1300, top - 330, 70, W(68, 16), 0);
  DS.shape(S, rrect(1470, 330, 200, 180, DS.r.sm), "white", { w: "detail" }); DS.shape(S, rect(1470, 330, 200, 50), "red", { tone: 2, flat: true, w: "detail" }); txt(S, "2007", 1570, 470, { size: DS.type.body, t: W(68, 1) });
  DS.card(S, "RACHEL MANNING", 430, 160, { size: DS.type.small, t: W(68, 5) });
  DS.card(S, "MARK LEVINE", 960, 160, { size: DS.type.small, t: W(68, 7) });
  DS.card(S, "ALAN COLLINS", 1480, 160, { size: DS.type.small, t: W(68, 10) });
  DS.vignette(S); }

// They found no evidence of thirty-eight witnesses, / no evidence that witnesses watched the murder, / and no evidence that they all did nothing.
{ const S = sc(69, 0, { cam: "push", focus: "960 520" }); DS.room(S, { wall: "paper", floor: "gray", window: false }); wboard(S, 260, 110, 1400, 780);
  DS.card(S, "THE TRIAL RECORDS", 960, 190, { size: DS.type.small });
  [["38 WITNESSES", W(69, 2)], ["WATCHED IT", W(70, 0)], ["ALL DID NOTHING", W(71, 1)]].forEach(([s, t], i) => { const y = 380 + i * 180;
    txt(S, s, 360, y + 22, { size: DS.type.body, anchor: "start" }); stamp(S, 1320, y, "NO EVIDENCE", t); });
  DS.vignette(S); }

// In two thousand sixteen, the Times itself wrote that its story had grossly exaggerated / how many people saw, and how much.
{ const S = sc(72, 0, { cam: "push", focus: "800 480" }); DS.room(S, { wall: "wall", floor: "wood", window: false });
  newspaper(S, 300, 110, 780, 800, "APRIL 2016");
  DS.card(S, "THE TIMES, 2016", 1470, 220, { size: DS.type.small, t: W(72, 3) });
  DS.card(S, "\"GROSSLY EXAGGERATED\"", 1470, 420, { size: DS.type.small, t: W(72, 12), tc: "red" });
  DS.card(S, "WHO SAW, HOW MUCH", 1470, 620, { size: DS.type.small, t: W(73, 0) });
  DS.vignette(S); }

// Nobody saw the whole attack. Many thought they'd heard drunks, or a couple, arguing.
{ const S = sc(74, 0, { cam: "push", focus: "960 480" }); const A = queens(S, DS.outdoor(S, QNIGHT), { lit: (i) => [2, 9, 12, 16].includes(i), heads: S.start });
  DS.card(S, "NOBODY SAW IT ALL", 960, 130, { size: DS.type.small, t: W(74, 0) });
  say(S, A.P[9][0] - 140, A.P[9][1] - 150, 170, 66, A.P[9][0], A.P[9][1] - 20, ["DRUNKS?"], W(74, 9), { think: true });
  say(S, A.P[12][0] + 40, A.P[12][1] - 150, 300, 66, A.P[12][0], A.P[12][1] - 20, ["A COUPLE ARGUING?"], W(74, 12), { think: true, size: DS.type.caption });
  DS.vignette(S, 0.2); }

// There were two attacks, not three, and two people did call the police.
{ const S = sc(75, 0, { cam: "push", focus: "960 600" }); DS.room(S, { wall: "night", floor: "wood", window: false });
  const top = sideTable(S, 420, GN, 1080);
  rotary(S, 720, top, 1.1, { t: W(75, 7) }); rotary(S, 1220, top, 1.1, { t: W(75, 8) });
  tick(S, 720, top - 260, 1.6, W(75, 10)); tick(S, 1220, top - 260, 1.6, W(75, 10) + 0.15);
  DS.card(S, "2 ATTACKS, NOT 3", 960, 140, { size: DS.type.body, t: W(75, 2) });
  DS.card(S, "2 PEOPLE CALLED THE POLICE", 960, 270, { size: DS.type.small, t: W(75, 10), tc: "green" });
  DS.vignette(S, 0.2); }

// And Kitty's friend and neighbor, Sophia Farrar, / ran out without knowing if the attacker was still there.
{ const S = sc(76, 0, { cam: "zoom", focus: "960 560" }); doorstep(S, DS.outdoor(S, DOORSTEP), { open: W(77, 0) });
  DS.card(S, "KITTY'S FRIEND & NEIGHBOR", 960, 120, { size: DS.type.small, t: W(76, 2) });
  DS.card(S, "SOPHIA FARRAR", 960, 230, { size: DS.type.body, t: W(76, 5) });
  DS.vignette(S, 0.2); }

// She held Kitty in her arms and whispered that help was coming. / Kitty died on the way to the hospital. / The famous article never mentioned her.
{ const S = sc(78, 0, { cam: "push", focus: "960 640" }); doorstep(S, DS.outdoor(S, DOORSTEP), { open: S.start, dim: true });
  const h = DS.card(S, "HELP IS COMING", 960, 180, { size: DS.type.body, t: W(78, 9) }); S.fadeOut(h.g, W(80, 0), 0.3);
  candle(S, 1500, 900, 1, W(79, 0));
  DS.card(S, "KITTY GENOVESE", 1500, 520, { size: DS.type.small, t: W(79, 0) });
  DS.card(S, "SOPHIA FARRAR: NEVER MENTIONED", 960, 180, { size: DS.type.small, t: W(80, 3), tc: "red" });
  DS.vignette(S, 0.22); }


// Kitty's younger brother Bill was sixteen. / The story of thirty-eight people who did nothing never left him.
{ const S = sc(81, 0, { cam: "push", focus: "900 520" }); DS.room(S, { wall: "wall", floor: "wood", window: [1360, 170, 200, 200] });
  const B = who(S, 700, GN, "near", BILL);
  DS.card(S, "BILL GENOVESE, 16", 700, 420, { size: DS.type.small, t: W(81, 3) });
  const g = S.grp(); S.thought(1220, 470, 230, 170, 800, 560, W(82, 3), 0.3, { parent: g });
  paperR(S, 1140, 370, 160, 200, { t: W(82, 3), parent: g }); S.text("38", 1220, 500, { size: DS.type.title, t: W(82, 3), c: DS.c("red", 2), parent: g });
  B.face(W(82, 8), "sad", 6);
  DS.vignette(S); }

// He joined the Marines partly to prove he'd never be one of them, / and he lost both legs in Vietnam.
{ const S = sc(83, 0, { cam: "pull" }); DS.outdoor(S, { hy: 660, sky: "dusk", hills: "earth", ground: "earth", sun: [1500, 260] });
  const B = who(S, 800, GN, "near", Object.assign({}, BILL, { s: 1.1, outfitC: DS.c("green", 2), mood: "determined", look: 4 })); marineCap(S, B);
  DS.card(S, "U.S. MARINES", 800, 400, { size: DS.type.small, t: W(83, 3) });
  DS.card(S, "VIETNAM", 1380, 200, { size: DS.type.body, t: W(84, 5) });
  B.face(W(84, 2), "sad", 4);
  DS.vignette(S, 0.16); }

// Decades later, he spent eleven years finding the people who were there, for the documentary The Witness.
{ const S = sc(85, 0, { cam: "push", focus: "900 560" }); const A = queens(S, DS.outdoor(S, QDAY), { day: true, lit: () => false });
  const seat = wheelchair(S, 760, GN, 1.0);
  const B = who(S, 740, seat, "near", { s: 1.1, sit: true, pose: "hold", hair: "side", hairC: DS.c("gray", 1), outfitC: DS.c("sky", 2), mood: "determined", look: 6 });
  DS.shape(S, `M${720} ${seat - 30} L${846} ${seat - 30} Q${868} ${seat - 26} ${866} ${seat - 4} L${860} ${seat + 120} L${816} ${seat + 126} L${812} ${seat + 14} L${720} ${seat + 14} Z`, "purple", { tone: 2 });
  wheel(S, 760, GN, 1.0);
  const [hx, hy] = B.hand("R"); paperR(S, hx - 20, hy - 70, 110, 80);
  [3, 5, 8, 10, 13, 16].forEach((i, k) => tick(S, A.P[i][0], A.P[i][1], 0.8, W(85, 6) + k * 0.25));
  DS.card(S, "11 YEARS", 1400, 160, { size: DS.type.body, t: W(85, 4) });
  DS.card(S, "\"THE WITNESS\"", 560, 160, { size: DS.type.small, t: W(85, 15) });
  DS.vignette(S); }

// What he found mattered more than any number. / His sister was not alone at the end. She was in the arms of a friend.
{ const S = sc(86, 0, { cam: "push", focus: "880 500" }); const A = queens(S, DS.outdoor(S, QNIGHT), { lit: (i) => i === 10 }); const [wx, wy] = A.P[10];
  S.fill(circ(wx, wy, 200), W(86, 5), 0, DS.glow(DS.P.yellow[1], 0.5), 1);
  const g = counter(S, wx, wy, 2.4, { c: "gray" }); S.fadeOut(g, W(86, 5), 1.2);
  S.heart(wx, wy - 2, 0.9, W(87, 4), 0, { fill: DS.c("red"), c: DS.c("ink"), w: DS.w.detail });
  const m = DS.card(S, "MORE THAN ANY NUMBER", 960, 120, { size: DS.type.small, t: W(86, 3) }); S.fadeOut(m.g, W(87, 3), 0.3);
  DS.card(S, "NOT ALONE", 960, 120, { size: DS.type.body, t: W(87, 4) });
  DS.card(S, "IN THE ARMS OF A FRIEND", 960, 225, { size: DS.type.small, t: W(87, 12) });
  DS.vignette(S, 0.2); }


// ===================== 5. Two hundred and nineteen fights on camera =====================
// So, was the bystander effect a myth too? / Here's the slightly awkward answer: no.
{ const S = sc(88, 0, { cam: "push", focus: "900 600" }); street(S, DS.outdoor(S, DAY));
  crowdRow(S, 9, 160, 1760, GF, "far", { k: 4, skip: [4] });
  const F = daveCounter(S, 900, { mood: "flat" });
  F.face(W(88, 6), "wow", 6); F.face(W(89, 5), "flat", 0);
  DS.card(S, "A MYTH TOO?", 520, 200, { size: DS.type.body, t: W(88, 6) });
  DS.card(S, "NO.", 1400, 200, { size: DS.type.title, t: W(89, 5), tc: "red" });
  DS.vignette(S); }

// In twenty eleven, a review pooled a hundred and five results from over seven thousand seven hundred people.
{ const S = sc(90, 0, { cam: "push", focus: "960 540" }); DS.room(S, { wall: "paper", floor: "gray", window: false }); wboard(S, 300, 220, 1320, 680);
  for (let i = 0; i < 105; i++) { const c = i % 15, r = Math.floor(i / 15); S.fill(circ(420 + c * 77, 310 + r * 82, 22), W(90, 9) + i * 0.012, 0, DS.c(["blue", "orange", "green", "purple", "red"][(c + r) % 5], 0, "mid"), 1); }
  DS.card(S, "2011 REVIEW", 470, 130, { size: DS.type.small, t: W(90, 4) });
  DS.card(S, "105 RESULTS", 960, 130, { size: DS.type.small, t: W(90, 9) });
  DS.card(S, "7,700+ PEOPLE", 1450, 130, { size: DS.type.small, t: W(90, 13), tc: "red" });
  DS.vignette(S); }

// It held up: alone, people help more. / But it got weaker when the danger was obvious, with an attacker right there.
{ const S = sc(91, 0, { cam: "push", focus: "960 520" }); DS.room(S, { wall: "paper", floor: "gray", window: false }); wboard(S, 300, 110, 1320, 790);
  bar(S, 560, 790, 260, 420, "green", W(91, 3)); txt(S, "ALONE", 690, 850, { size: DS.type.small, t: W(91, 3) });
  bar(S, 1100, 790, 260, 260, "orange", W(91, 3) + 0.3); txt(S, "WITH OTHERS", 1230, 850, { size: DS.type.small, t: W(91, 3) + 0.3 });
  txt(S, "HELPED", 690, 340, { size: DS.type.small, t: W(91, 5), c: DS.c("green", 2) });
  const c1 = DS.card(S, "IT HELD UP", 960, 200, { size: DS.type.body, t: W(91, 1), tc: "green" }); S.fadeOut(c1.g, W(92, 2), 0.3);
  bar(S, 1100, 530, 260, 130, "orange", W(92, 3));
  warnSign(S, 960, 420, 0.8, W(92, 6));
  DS.card(S, "WEAKER WHEN DANGER IS OBVIOUS", 960, 200, { size: DS.type.small, t: W(92, 3) });
  DS.vignette(S); }


// And real life rarely happens alone in a quiet room.
{ const S = sc(93, 0, { cam: "push" }); street(S, DS.outdoor(S, DAY));
  crowdRow(S, 10, 1060, 1800, GF, "far", { k: 3 }); crowdRow(S, 4, 1100, 1760, GM, "mid", { k: 5 });
  panel(S, 500, 560, 680, 560, S.start, "glass"); DS.shape(S, rect(240, 420, 520, 360), "glass", { tone: 2, w: "detail" });
  dave(S, 500, 800, "near", { s: 0.75, mood: "flat" }); intercom(S, 680, 520, 0.6);
  S.strike(240, 300, 760, 820, W(93, 5), 0, { c: DS.c("red"), w: DS.w.near });
  DS.card(S, "QUIET ROOM", 500, 220, { size: DS.type.small, t: W(93, 8) });
  DS.card(S, "REAL LIFE", 1420, 220, { size: DS.type.body, t: W(93, 1), tc: "green" });
  DS.vignette(S); }

// In twenty nineteen, Mark Levine, one of the three who took the thirty-eight apart, / tried something new with Richard Philpot and colleagues.
{ const S = sc(94, 0, { cam: "push", focus: "1100 480" }); street(S, DS.outdoor(S, DAY));
  crowdRow(S, 8, 140, 1780, GF, "far", { k: 6 });
  DS.shape(S, rect(1490, 300, 20, 660), "gray", { tone: 2, w: "detail" }); DS.shadow(S, 1500, GN, 120); cctv(S, 1500, 260, 1.5, { a: -12 });
  DS.card(S, "2019", 520, 140, { size: DS.type.body, t: W(94, 1) });
  DS.card(S, "MARK LEVINE", 600, 300, { size: DS.type.small, t: W(94, 3) });
  DS.card(S, "RICHARD PHILPOT", 600, 430, { size: DS.type.small, t: W(95, 4) });
  paperR(S, 960, 240, 150, 190, { t: W(94, 12) }); S.text("38", 1035, 360, { size: DS.type.title, t: W(94, 12), c: DS.c("ink", 1) }); xMark(S, 1035, 335, 1.0, W(94, 13));
  DS.vignette(S); }

// They watched two hundred and nineteen real arguments and fights, / filmed by city cameras in Lancaster, Amsterdam and Cape Town.
{ const S = sc(96, 0, { cam: "push", focus: "960 480" }); DS.room(S, { wall: "navy", floor: "gray", window: false });
  for (let i = 0; i < 18; i++) { const c = i % 6, r = Math.floor(i / 6); monitor(S, 220 + c * 296, 300 + r * 190, 270, 170, { t: W(96, 1) + i * 0.06, n: 2 + (i % 3) }); }
  DS.card(S, "219 REAL CONFLICTS", 960, 120, { size: DS.type.small, t: W(96, 2) });
  DS.shape(S, rrect(260, 800, 1400, 80, DS.r.md), "white", { flat: true, w: "detail", t: W(97, 3) });
  [["LANCASTER", 500, W(97, 5)], ["AMSTERDAM", 960, W(97, 6)], ["CAPE TOWN", 1420, W(97, 8)]].forEach(([s, x, t]) => txt(S, s, x, 855, { size: DS.type.small, t }));
  DS.vignette(S); }

// No actors, no smoke, no tape recorders. Just people having a very bad night out.
{ const S = sc(98, 0, { cam: "push", focus: "960 600" }); street(S, DS.outdoor(S, NIGHT), true);
  DS.shape(S, rect(620, 330, 680, 360), "brown", { layer: "mid", dir: "h" });
  [700, 1020].forEach((x) => DS.shape(S, rect(x, 430, 200, 160), "yellow", { layer: "mid", flat: true, tone: 1, w: "detail" }));
  DS.shape(S, rrect(820, 340, 280, 70, DS.r.sm), "green", { layer: "mid", tone: 2, flat: true, w: "detail" }); txt(S, "PUB", 960, 390, { size: DS.type.small, c: DS.P.white[0] });
  [[420, "ACTORS"], [960, "SMOKE"], [1500, "TAPES"]].forEach(([x, s], i) => { const t = W(98, [0, 2, 4][i]); panel(S, x, 170, 260, 110, t); txt(S, s, x, 186, { size: DS.type.small, t }); xMark(S, x, 170, 0.9, W(98, [1, 3, 6][i])); });
  const A = person(S, 860, GM + 40, "mid", 5, { mood: "angry", look: 6, pose: "point", t: W(98, 8) }), B = person(S, 1080, GM + 40, "mid", 7, { mood: "angry", look: -6, pose: "pointL", t: W(98, 8) });
  person(S, 1320, GM + 40, "mid", 2, { mood: "worried", look: -6, t: W(98, 9) });
  DS.card(S, "A VERY BAD NIGHT OUT", 960, 262, { size: DS.type.small, t: W(98, 11) });
  DS.vignette(S, 0.18); }

// The cameras had no sound, so only actions counted: / a calming hand, stepping in between, pulling someone back.
{ const S = sc(99, 0, { cam: "push", focus: "960 520" }); DS.room(S, { wall: "navy", floor: "gray", window: false });
  cctv(S, 300, 110, 1.1);
  const sp = [560, 220]; DS.shape(S, `M${sp[0] - 40} ${sp[1] - 20} H${sp[0] - 14} L${sp[0] + 14} ${sp[1] - 46} V${sp[1] + 46} L${sp[0] - 14} ${sp[1] + 20} H${sp[0] - 40} Z`, "white", { t: W(99, 3) }); xMark(S, sp[0] + 60, sp[1], 0.5, W(99, 3));
  [["calm", "CALMING HAND", W(100, 1)], ["between", "STEPPING BETWEEN", W(100, 3)], ["pull", "PULLING BACK", W(100, 6)]].forEach(([act, s, t], i) => { const x = 400 + i * 560;
    monitor(S, x, 500, 500, 330, { t, act }); txt(S, s, x, 726, { t, c: DS.P.white[0] }); });
  DS.card(S, "ONLY ACTIONS COUNTED", 1180, 200, { size: DS.type.small, t: W(99, 6) });
  DS.vignette(S); }

// In nine out of ten of them, somebody stepped in, / usually several people, almost four on average.
{ const S = sc(101, 0, { cam: "push", focus: "960 520" }); DS.room(S, { wall: "navy", floor: "gray", window: false });
  monitors10(S);
  MON.forEach(([x, y], i) => { if (i !== 7) tick(S, x + 90, y - 50, 1.2, W(101, 1) + i * 0.1); });
  DS.card(S, "9 OUT OF 10", 640, 140, { size: DS.type.body, t: W(101, 1), tc: "green" });
  DS.card(S, "ALMOST 4 HELPERS", 1320, 140, { size: DS.type.small, t: W(102, 3) });
  DS.vignette(S); }

// The average one had about sixteen bystanders, / and the more there were, the more likely someone helped.
{ const S = sc(103, 0, { cam: "pull" }); street(S, DS.outdoor(S, NIGHT), true);
  crowdRow(S, 10, 160, 1760, GF, "far", { k: 1, t: W(103, 4), dt: 0.06 });
  crowdRow(S, 6, 200, 1720, GM, "mid", { k: 5, t: W(103, 5), dt: 0.06 });
  S.arrow(560, 860, 1500, 400, W(104, 2), 0.4, { c: DS.c("green"), w: DS.w.near, bend: -0.1, head: 40 });
  DS.card(S, "ABOUT 16 BYSTANDERS", 960, 130, { size: DS.type.small, t: W(103, 5) });
  DS.card(S, "MORE PEOPLE, MORE HELP", 1300, 260, { size: DS.type.small, t: W(104, 6), tc: "green" });
  DS.vignette(S, 0.18); }

// Dave looks at his counter. For the first time, he wants a bigger number.
{ const S = sc(105, 0, { cam: "zoom", focus: "860 520" }); street(S, DS.outdoor(S, DAY));
  crowdRow(S, 8, 140, 1780, GF, "far", { k: 3 });
  const F = dave(S, 600, GN, "near", { s: 1.3, armR: CLICK, mood: "flat", look: 8 });
  const [hx, hy] = F.hand("R"); counter(S, hx + 90, hy - 20, 1.6, { nums: [[T0(S), "16"], [W(105, 10), "22", "green"], [W(105, 11) + 0.1, "30", "green"], [W(105, 12) + 0.1, "38", "green"]] });
  F.face(W(105, 5), "smile", 8); F.face(W(105, 12), "happy", 8);
  say(S, 1380, 300, 180, 80, 1060, 470, ["MORE!"], W(105, 12), { think: true, size: DS.type.body });
  DS.vignette(S); }

// Each extra bystander raised the odds of help by about ten percent.
{ const S = sc(106, 0, { cam: "push", focus: "960 520" }); DS.room(S, { wall: "paper", floor: "gray", window: false }); wboard(S, 260, 110, 1400, 790);
  for (let i = 0; i < 5; i++) { const x = 420 + i * 240, h = 200 * Math.pow(1.1, i), t = W(106, 1) + i * 0.3;
    bar(S, x, 760, 160, h, "green", t); minis(S, i + 1, x + 20, x + 140, 840, 0.75, { t }); if (i) txt(S, "+10%", x + 80, 760 - h - 24, { t: W(106, 9) + i * 0.1, c: DS.c("green", 2) }); }
  DS.card(S, "EACH EXTRA BYSTANDER", 960, 190, { size: DS.type.small, t: W(106, 1) });
  DS.vignette(S); }

// So which is it? Do crowds freeze, or do crowds help?
{ const S = sc(107, 0, { cam: "push", focus: "960 600" }); street(S, DS.outdoor(S, DAY));
  S.fill(rect(-200, -200, 1160, 1500), S.start, 0, DS.c("glass"), 0.45);
  crowdRow(S, 3, 200, 760, GM, "mid", { k: 2, f: { mood: "flat", look: 0 } });
  const L = person(S, 380, 900, "near", 6, { s: 1.0 }); L.lie(S.start - 0.7, 0.01, 86);
  const R = person(S, 1300, 900, "near", 3, { s: 1.0 }); R.lie(S.start - 0.7, 0.01, 86);
  crowdRow(S, 2, 1160, 1440, GM, "mid", { k: 1, f: { look: 4, mood: "worried" } }); kneel(S, 1740, 900, -1, 4, { mood: "worried" });
  S.divider(960, S.start);
  DS.card(S, "FREEZE?", 480, 180, { size: DS.type.body, t: W(107, 6), tc: "blue" });
  DS.card(S, "HELP?", 1440, 180, { size: DS.type.body, t: W(107, 10), tc: "green" });
  DS.vignette(S); }

// Strangely, both. Each person in a crowd is a little less likely to act. / But a crowd has a lot of persons.
{ const S = sc(108, 0, { cam: "push", focus: "960 500" }); DS.room(S, { wall: "paper", floor: "gray", window: false }); wboard(S, 240, 110, 1440, 790);
  const O = [420, 780], X1 = 1540, ink = DS.c("ink");
  S.draw(`M${O[0]} 230 V${O[1]} H${X1 + 30}`, S.start, 0, { c: ink, w: DS.w.mid });
  [[1, 0], [5, 0.2], [16, 0.55], [38, 1]].forEach(([n, f]) => { const x = O[0] + 20 + f * (X1 - O[0] - 20); S.draw(line([x, O[1]], [x, O[1] + 16], 0), S.start, 0, { c: ink, w: DS.w.mid }); txt(S, String(n), x, O[1] + 56); });
  txt(S, "PEOPLE AROUND", 1300, O[1] + 56, { anchor: "middle" }); txt(S, "CHANCE", 450, 240, { anchor: "start" });
  const red = S.draw(smooth([[O[0] + 20, 480], [700, 590], [1000, 660], [1300, 700], [X1, 715]]), S.start, 0, { c: DS.c("red"), w: DS.w.near * 1.3 }); wipe(red, O[0], 200, X1 - O[0] + 40, 600, W(108, 10), 1.2);
  const grn = S.draw(smooth([[O[0] + 20, 480], [700, 380], [1000, 310], [1300, 270], [X1, 255]]), S.start, 0, { c: DS.c("green"), w: DS.w.near * 1.3 }); wipe(grn, O[0], 200, X1 - O[0] + 40, 600, W(109, 2), 1.2);
  txt(S, "CHANCE YOU HELP", X1, 640, { anchor: "end", t: W(108, 13), c: DS.c("red", 2) });
  txt(S, "CHANCE SOMEONE HELPS", X1, 222, { anchor: "end", t: W(109, 6), c: DS.c("green", 2) });
  DS.card(S, "BOTH.", 820, 170, { size: DS.type.body, t: W(108, 1) });
  DS.vignette(S); }

// Darley and Latané even did this maths in nineteen sixty-eight. / After the first minute, the victim on the tape was likely to get help in every group.
{ const S = sc(110, 0, { cam: "push", focus: "960 500" }); DS.room(S, { wall: "paper", floor: "gray", window: false }); wboard(S, 240, 110, 1440, 790);
  const O = [420, 760], X1 = 1520, sx = (sec) => O[0] + (sec / 150) * (X1 - O[0]), ink = DS.c("ink");
  S.draw(`M${O[0]} 240 V${O[1]} H${X1 + 30}`, S.start, 0, { c: ink, w: DS.w.mid });
  [[0, "0"], [60, "1 MIN"], [120, "2 MIN"]].forEach(([s, l]) => { S.draw(line([sx(s), O[1]], [sx(s), O[1] + 16], 0), S.start, 0, { c: ink, w: DS.w.mid }); txt(S, l, sx(s), O[1] + 56); });
  txt(S, "GOT HELP", 450, 250, { anchor: "start" });
  [[["blue", 2], [[0, 0], [20, 0.25], [45, 0.5], [70, 0.82], [150, 0.92]], "ALONE"], [["purple", 2], [[0, 0], [30, 0.12], [55, 0.45], [80, 0.8], [150, 0.9]], "2 PEOPLE"], [["red", 2], [[0, 0], [45, 0], [62, 0.5], [90, 0.78], [150, 0.86]], "5 PEOPLE"]].forEach(([c, pts, l], i) => {
    const p = S.draw(smooth(pts.map(([s, f]) => [sx(s), O[1] - f * 460])), S.start, 0, { c: DS.c(c[0], 0), w: DS.w.near }); wipe(p, O[0], 200, X1 - O[0] + 20, 600, W(110, 6) + i * 0.4, 1.2);
    const ly = 520 + i * 64, lt = W(110, 6) + i * 0.4; S.draw(line([1170, ly - 12], [1240, ly - 12], 0), lt, 0, { c: DS.c(c[0], 0), w: DS.w.near }); txt(S, l, 1260, ly, { anchor: "start", t: lt, c: DS.c(c[0], 2) }); });
  S.draw(`M${sx(60)} 250 V${O[1]}`, W(111, 2), 0, { c: DS.c("green", 2), w: DS.w.mid });
  DS.card(S, "1968 MATHS", 960, 190, { size: DS.type.small, t: W(110, 6) });
  DS.vignette(S); }

// In that study, the crowd mostly didn't stop help. It slowed it down.
{ const S = sc(112, 0, { cam: "push", focus: "960 500" }); DS.room(S, { wall: "paper", floor: "gray", window: false }); wboard(S, 240, 110, 1440, 790);
  txt(S, "AVERAGE TIME TO REPORT", 960, 300, { size: DS.type.small });
  txt(S, "ALONE", 580, 450, { anchor: "end", size: DS.type.small }); const a = S.grp(); DS.shape(S, rrect(620, 400, 52 * 5, 70, DS.r.xs), "green", { parent: a }); txt(S, "52 s", 620 + 52 * 5 + 20, 452, { anchor: "start", size: DS.type.small });
  txt(S, "WITH 4 OTHERS", 580, 620, { anchor: "end", size: DS.type.small }); const b = S.grp(); DS.shape(S, rrect(620, 570, 166 * 5, 70, DS.r.xs), "orange", { t: W(112, 10), parent: b }); grow(b, W(112, 10), 620, 605, true, 1.0); txt(S, "166 s", 620 + 166 * 5 + 20, 622, { anchor: "start", size: DS.type.small, t: W(112, 11) });
  DS.card(S, "DIDN'T STOP HELP", 700, 790, { size: DS.type.small, t: W(112, 6), tc: "green" });
  DS.card(S, "SLOWED IT DOWN", 1260, 790, { size: DS.type.small, t: W(112, 10), tc: "red" });
  DS.vignette(S); }

// So, would a crowd help you? / Probably. Nine times out of ten, somebody did.
{ const S = sc(113, 0, { cam: "push", focus: "960 700" }); street(S, DS.outdoor(S, DAY));
  crowdRow(S, 12, 120, 1800, GF, "far", { k: 3 });
  crowdRow(S, 6, 160, 1760, GM, "mid", { k: 8, skip: [2, 3] });
  const Y = person(S, 760, 900, "near", 2, { s: 1.0, mood: "worried", outfitC: DS.c("sky") }); Y.lie(S.start - 0.7, 0.01, 86);
  kneel(S, 1290, 900, -1, 5, { t: W(114, 0) }); const H = person(S, 1560, GN, "near", 1, { t: W(114, 6), look: -6, mood: "determined", pose: "hold" }); phoneAt(S, H, W(114, 6));
  DS.card(S, "WOULD A CROWD HELP YOU?", 960, 130, { size: DS.type.small });
  DS.card(S, "PROBABLY. 9 IN 10", 960, 250, { size: DS.type.body, t: W(114, 0), tc: "green" });
  DS.vignette(S); }

// Dave's plan was to need help near one person, ideally a nurse. / The cameras would like him near sixteen.
{ const S = sc(115, 0, { cam: "push" }); street(S, DS.outdoor(S, DAY));
  crowdRow(S, 10, 1040, 1820, GF, "far", { k: 2, t: W(116, 5), dt: 0.04 }); crowdRow(S, 6, 1020, 1840, GM, "mid", { k: 4, t: W(116, 5), dt: 0.05 });
  dave(S, 300, GN, "near", { mood: "smile", look: 6 }); nurse(S, 680, GN, { t: W(115, 9) });
  dave(S, 1430, GN, "near", { mood: "wow", look: 0, t: W(116, 0) });
  S.divider(960, S.start);
  DS.card(S, "1 NURSE", 480, 200, { size: DS.type.body, t: W(115, 9) });
  DS.card(S, "16 PEOPLE", 1440, 200, { size: DS.type.body, t: W(116, 5), tc: "green" });
  DS.vignette(S); }

// ===================== 6. How to get help in a crowd =====================
// But nine out of ten is not ten. / The bystander effect lives in the pause, when everyone waits for someone else.
{ const S = sc(117, 0, { cam: "push", focus: "960 600" }); street(S, DS.outdoor(S, DAY));
  crowdRow(S, 10, 160, 1760, GF, "far", { k: 5, f: { look: 0 } });
  crowdRow(S, 6, 180, 1740, GM, "mid", { k: 2, f: { mood: "worried" } }).forEach((P, i) => P.face(W(118, 8) + i * 0.08, "worried", i % 2 ? 8 : -8));
  const Y = person(S, 760, 920, "near", 0, { s: 1.0, mood: "flat", outfitC: DS.c("orange") }); Y.lie(S.start - 0.7, 0.01, 86);
  DS.card(S, "9 IN 10", 700, 115, { size: DS.type.small, t: W(117, 1) });
  DS.card(S, "IS NOT 10", 1220, 115, { size: DS.type.small, t: W(117, 6), tc: "red" });
  pauseIcon(S, 960, 370, 1.1, W(118, 6));
  DS.card(S, "THE PAUSE", 960, 225, { size: DS.type.body, t: W(118, 6), tc: "red" });
  DS.vignette(S); }


// So shorten the pause. Don't shout at the crowd. / Point at one person, and give them one job.
{ const S = sc(119, 0, { cam: "push", focus: "960 600" }); street(S, DS.outdoor(S, DAY));
  crowdRow(S, 9, 760, 1800, GF, "far", { k: 6 }); const M = crowdRow(S, 4, 1000, 1760, GM, "mid", { k: 1 }); M.forEach((P, i) => P.face(W(119, 7), "flat", i % 2 ? 8 : -8));
  const F = dave(S, 420, GN, "near", { pose: "armsUp", mood: "angry", look: 6 });
  const b = say(S, 820, 360, 300, 90, 520, 520, ["SOMEBODY HELP!"], W(119, 4)); S.fadeOut(b, W(120, 0), 0.3);
  S.fadeOut(xMark(S, 820, 360, 1.6, W(119, 7)).g, W(120, 0), 0.3);
  F.setPose(W(120, 0), "point"); F.face(W(120, 0), "determined", 6);
  ringFig(S, M[1], W(120, 2)); M[1].face(W(120, 3), "wow", -6);
  DS.card(S, "SHORTEN THE PAUSE", 960, 130, { size: DS.type.small, t: W(119, 1) });
  DS.card(S, "ONE PERSON", M[1].cx, 330, { size: DS.type.small, t: W(120, 2), tc: "red" });
  DS.card(S, "ONE JOB", 700, 240, { size: DS.type.body, t: W(120, 7) });
  DS.vignette(S); }


// Psychologist Robert Cialdini put it like this. / "You, sir, in the blue jacket, I need help. Call an ambulance."
{ const S = sc(121, 0, { cam: "push", focus: "960 560" }); street(S, DS.outdoor(S, DAY));
  crowdRow(S, 9, 160, 1760, GF, "far", { k: 7 });
  const V = person(S, 520, 920, "near", 3, { sit: true, pose: "point", mood: "worried", look: 6, legL: [[70, -5], [110, 4]], legR: [[90, 6], [140, 10]], gs: 940 });
  const J = person(S, 1380, GN, "near", 1, { outfit: "hoodie", outfitC: DS.c("blue"), look: -6, mood: "wow" });
  DS.card(S, "ROBERT CIALDINI", 440, 130, { size: DS.type.small, t: W(121, 1) }); bookP(S, 900, 130, 300, 96, "INFLUENCE", W(121, 2));
  say(S, 960, 350, 460, 100, 640, 600, ["YOU, SIR, IN THE BLUE JACKET,", "I NEED HELP. CALL AN AMBULANCE."], W(122, 0), { size: DS.type.caption });
  ringFig(S, J, W(122, 4), "blue");
  DS.vignette(S); }

// That one sentence tells him it's an emergency, it's his job, and what to do.
{ const S = sc(123, 0, { cam: "push", focus: "960 560" }); street(S, DS.outdoor(S, DAY));
  crowdRow(S, 7, 1060, 1800, GF, "far", { k: 7 });
  const J = person(S, 1400, GN, "near", 1, { outfit: "hoodie", outfitC: DS.c("blue"), look: -6, mood: "determined", pose: "hold" }); phoneAt(S, J, W(123, 12));
  panel(S, 640, 520, 820, 560, S.start);
  [["IT'S AN EMERGENCY", W(123, 7)], ["IT'S HIS JOB", W(123, 10)], ["WHAT TO DO", W(123, 12)]].forEach(([s, t], i) => { const y = 380 + i * 140;
    DS.shape(S, rrect(300, y - 40, 70, 70, DS.r.xs), "white", { w: "mid", flat: true }); txt(S, s, 410, y + 18, { size: DS.type.small, anchor: "start" }); tick(S, 336, y - 6, 1.4, t); });
  DS.vignette(S); }

// First aid trainers say the same: pick someone specific to make the call.
{ const S = sc(124, 0, { cam: "push", focus: "960 540" }); DS.room(S, { wall: "wall", floor: "wood", window: [1380, 160, 200, 200] });
  wboard(S, 560, 200, 760, 420); txt(S, "PICK SOMEONE", 940, 360, { size: DS.type.body, t: W(124, 6) }); txt(S, "SPECIFIC", 940, 460, { size: DS.type.body, t: W(124, 7), c: DS.c("red", 2) });
  const T = who(S, 380, GN, "near", { s: 1.1, hair: "bun", hairC: DS.c("brown", 2), outfitC: DS.c("red"), pose: "point", look: 6, mood: "determined" });
  DS.shape(S, rect(T.cx - 7, T.sh[1] + 36, 14, 40), "white", { flat: true, w: "hair", parent: T.g }); DS.shape(S, rect(T.cx - 20, T.sh[1] + 49, 40, 14), "white", { flat: true, w: "hair", parent: T.g });
  const top = sideTable(S, 1080, GN, 420); aidKit(S, 1290, top - 56, 1.1);
  DS.card(S, "FIRST AID TRAINERS", 940, 110, { size: DS.type.small, t: W(124, 0) });
  DS.vignette(S); }

// "What if nobody's wearing a blue jacket?" / Then, Dave, pick a different colour.
{ const S = sc(125, 0, { cam: "push", focus: "1000 600" }); street(S, DS.outdoor(S, DAY));
  crowdRow(S, 9, 760, 1800, GF, "far", { k: 1 }); const M = crowdRow(S, 4, 900, 1740, GM, "mid", { k: 6 });
  const F = dave(S, 420, GN, "near", { mood: "worried", look: 6 });
  F.setPose(W(126, 2), "point"); F.face(W(126, 2), "determined", 6);
  ringFig(S, M[2], W(126, 4), "green");
  DS.card(S, "NO BLUE JACKET?", 700, 150, { size: DS.type.small, t: W(125, 5) });
  DS.card(S, "PICK A DIFFERENT COLOUR", 1240, 260, { size: DS.type.small, t: W(126, 3), tc: "green" });
  DS.vignette(S); }

// A week later, Dave is back on the busy street. Thirty-eight people. He counts out of habit.
{ const S = sc(127, 0, { cam: "pull" }); street(S, DS.outdoor(S, DAY));
  crowdRow(S, 10, 180, 1760, GF, "far", { skip: [4] });
  crowdRow(S, 6, 200, 1720, GM, "mid", { k: 4, skip: [2, 3] });
  daveCounter(S, 900, { mood: "flat", cnt: { nums: [[T0(S), "30"], [W(127, 10), "38"]] } });
  DS.card(S, "A WEEK LATER", 960, 140, { size: DS.type.body, t: W(127, 0) });
  DS.vignette(S); }

// A man in front of him trips, falls, and doesn't get up.
{ const S = sc(128, 0, { cam: "push", focus: "1000 700" }); street(S, DS.outdoor(S, DAY));
  crowdRow(S, 10, 180, 1760, GF, "far", { k: 2 }).forEach((P, i) => P.face(W(128, 7) + i * 0.04, "wow", 0));
  crowdRow(S, 4, 1180, 1760, GM, "mid", { k: 3 }).forEach((P) => P.face(W(128, 7), "wow", -6));
  const F = dave(S, 420, GN, "near", { mood: "flat", look: 6 }); F.face(W(128, 6), "wow", 8);
  const M = person(S, 690, 920, "near", 2, { s: 1.0, outfitC: DS.c("orange"), mood: "flat", look: 6 }); M.lie(W(128, 7), 0.45, 86); M.face(W(128, 7), "worried", 6);
  DS.vignette(S); }

// Dave doesn't freeze. He points at a woman in a green coat. / "You, in the green coat. Call an ambulance."
{ const S = sc(129, 0, { cam: "push", focus: "1000 600" }); street(S, DS.outdoor(S, DAY));
  crowdRow(S, 10, 180, 1760, GF, "far", { k: 2 });
  const M = person(S, 690, 920, "near", 2, { s: 1.0, outfitC: DS.c("orange"), mood: "worried", look: 6 }); M.lie(S.start - 0.7, 0.01, 86);
  const F = dave(S, 420, GN, "near", { mood: "determined", look: 6 }); F.setPose(W(129, 4), "point");
  const G = who(S, 1560, GN, "near", { s: 1.1, hair: "bun", hairC: DS.c("ink"), outfit: "hoodie", outfitC: DS.c("green"), look: -6, mood: "wow" });
  ringFig(S, G, W(129, 10), "green");
  say(S, 980, 300, 380, 100, 560, 560, ["YOU, IN THE GREEN COAT.", "CALL AN AMBULANCE."], W(130, 0), { size: DS.type.caption });
  DS.card(S, "DOESN'T FREEZE", 420, 130, { size: DS.type.small, t: W(129, 1), tc: "green" });
  DS.vignette(S); }

// She isn't a nurse, and she doesn't need to be. / She's already dialling, and two other people are kneeling beside the man.
{ const S = sc(131, 0, { cam: "push", focus: "1000 640" }); street(S, DS.outdoor(S, DAY));
  crowdRow(S, 10, 180, 1760, GF, "far", { k: 2 });
  kneel(S, 900, 850, 1, 7, { layer: "mid", t: W(132, 8) + 0.2 });
  const M = person(S, 690, 920, "near", 2, { s: 1.0, outfitC: DS.c("orange"), mood: "worried", look: 6 }); M.lie(S.start - 0.7, 0.01, 86);
  dave(S, 420, GN, "near", { mood: "smile", look: 6 });
  const G = who(S, 1560, GN, "near", { s: 1.1, hair: "bun", hairC: DS.c("ink"), outfit: "hoodie", outfitC: DS.c("green"), look: -6, mood: "determined", pose: "hold" }); phoneAt(S, G, W(132, 1));
  kneel(S, 1250, 900, -1, 5, { t: W(132, 8) });
  DS.card(S, "NOT A NURSE", 1560, 380, { size: DS.type.small, t: W(131, 3) });
  DS.card(S, "DOESN'T NEED TO BE", 1100, 150, { size: DS.type.small, t: W(131, 7), tc: "green" });
  DS.vignette(S); }

// Dave was right about one thing. / In a crowd, everybody waits for somebody else.
{ const S = sc(133, 0, { cam: "pull" }); street(S, DS.outdoor(S, DAY));
  crowdRow(S, 11, 140, 1780, GF, "far", { k: 6 });
  crowdRow(S, 6, 180, 1740, GM, "mid", { k: 3, skip: [2, 3] }).forEach((P, i) => P.face(W(134, 3) + i * 0.1, "flat", i % 2 ? 8 : -8));
  daveCounter(S, 960, { mood: "flat", look: 0, cnt: { c: "gray" } });
  DS.card(S, "EVERYBODY WAITS", 960, 150, { size: DS.type.body, t: W(134, 3) });
  DS.vignette(S); }

// So tell them who.
{ const S = sc(135, 0, { cam: "none" }); street(S, DS.outdoor(S, DAY));
  crowdRow(S, 11, 140, 1780, GF, "far", { k: 6 });
  const M = crowdRow(S, 4, 1000, 1760, GM, "mid", { k: 4 });
  const F = dave(S, 460, GN, "near", { pose: "point", mood: "determined", look: 6 });
  const [lx, ly] = F.hand("L"); counter(S, lx - 10, ly + 10, 1, { n: "1", c: "green" });
  ringFig(S, M[1], W(135, 1));
  DS.card(S, "TELL THEM WHO.", 960, 150, { size: DS.type.title, t: W(135, 1) });
  DS.vignette(S); }
