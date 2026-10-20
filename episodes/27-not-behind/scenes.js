// look: still
// You Are Not Behind (~1:45). Mystery: whose schedule is Dave, 29, behind on? Three suspects; the last one is Dave at eighteen. Illustrated stills, progressive changes on the spoken word.
const dave = (S, x, gy, layer = "near", o = {}) => DS.figure(S, x, gy, layer, Object.assign({ s: 1.1, hair: "side", hairC: DS.c("brown"), outfitC: DS.c("blue") }, o));
// Dave at eighteen: same face and hair colour, messier hair, black Thunder Wolf band tee with a yellow bolt
const young = (S, x, gy, layer = "near", o = {}) => {
  const F = DS.figure(S, x, gy, layer, Object.assign({ s: 1.1, hair: "messy", hairC: DS.c("brown"), outfitC: DS.c("ink", 1) }, o)), k = F.s, cx = F.cx, cy = F.sh[1] + 36 * k;
  DS.shape(S, poly([[cx + 8 * k, cy - 26 * k], [cx - 12 * k, cy + 4 * k], [cx, cy + 4 * k], [cx - 8 * k, cy + 26 * k], [cx + 13 * k, cy - 5 * k], [cx + 1 * k, cy - 5 * k]], 0) + " Z", "yellow", { t: o.t, w: "hair", flat: true, parent: F.g });
  return F;
};
const PEN = DS.c("blue", 2);

// ---------- the list on the fridge ----------
const fridge = (S, x, gy, w, h, o = {}) => {
  DS.shadow(S, x + w / 2, gy, w + 40);
  DS.shape(S, rrect(x, gy - h, w, h, DS.r.md), "white", { dir: "h" });
  const sy = gy - h * 0.7;
  S.draw(line([x, sy], [x + w, sy], 0), S.start, 0, { c: DS.line(), w: DS.w.mid });
  DS.shape(S, rrect(x + 26, sy - 130, 22, 100, DS.r.xs), "gray", { w: "detail" });
  DS.shape(S, rrect(x + 26, sy + 30, 22, 220, DS.r.xs), "gray", { w: "detail" });
  DS.shape(S, circ(x + w - 70, gy - h + 70, 18), "red", { w: "detail" }); DS.shape(S, circ(x + w - 120, gy - h + 120, 16), "green", { w: "detail" });
  const p = [x + 90, sy + 40, 220, 270];
  DS.drop(S, rect(p[0] + 5, p[1] + 7, p[2], p[3])); DS.shape(S, rect(p[0], p[1], p[2], p[3]), "white", { w: "detail", flat: true });
  DS.shape(S, circ(p[0] + 30, p[1] + 4, 14), "red", { w: "detail" }); DS.shape(S, circ(p[0] + p[2] - 30, p[1] + 4, 14), "yellow", { w: "detail" });
  S.text("By thirty:", p[0] + 24, p[1] + 64, { size: DS.type.caption, font: "caveat", anchor: "start", c: PEN });
  [[110, 150], [170, 90], [230, 180]].forEach(([dy, lw]) => { DS.shape(S, rect(p[0] + 22, p[1] + dy - 18, 18, 18), "white", { w: "hair", flat: true }); S.draw(line([p[0] + 54, p[1] + dy - 8], [p[0] + 54 + lw * 0.85, p[1] + dy - 10], 0), S.start, 0, { c: PEN, w: DS.w.detail }); });
  if (o.struck) { S.draw(line([p[0] + 18, p[1] + 52], [p[0] + 150, p[1] + 48], 0), S.start, 0, { c: DS.c("red"), w: DS.w.mid }); S.draw(line([p[0] + 46, p[1] + 222], [p[0] + 216, p[1] + 218], 0), S.start, 0, { c: DS.c("red"), w: DS.w.mid }); }
  return { cx: p[0] + p[2] / 2, cy: p[1] + p[3] / 2, top: gy - h };
};
// kitchen: back-wall cabinets + worktop (mid plane), fridge on the right (near plane)
const ROOM = { kitchen: { wall: "wall", floor: "wood", window: [470, 190, 240, 200] }, door: { window: false }, lineup: { wall: "paper", floor: "gray", window: false }, night: { wall: "night", floor: "wood", window: false }, lab: { wall: "glass", floor: "gray", window: false } };
const kitchen = (S, o = {}) => {
  DS.shadow(S, 640, 762, 560, { op: 0.15 });
  DS.shape(S, rect(380, 590, 520, 170), "wood", { layer: "mid" });
  [553, 726].forEach((x) => S.draw(line([x, 604], [x, 748], 0), S.start, 0, { c: DS.line("mid"), w: DS.w.hair }));
  [466, 640, 813].forEach((x) => DS.shape(S, rrect(x - 22, 616, 44, 10, DS.r.xs), "gray", { layer: "mid", w: "hair" }));
  DS.shape(S, rrect(366, 568, 548, 26, DS.r.xs), "gray", { layer: "mid", tone: 1, w: "mid" });
  DS.shape(S, rrect(780, 500, 70, 70, DS.r.sm), "red", { layer: "mid", w: "mid" }); DS.shape(S, rrect(800, 486, 30, 16, DS.r.xs), "red", { layer: "mid", w: "detail", tone: 2 });
  return fridge(S, 1180, 960, 360, 760, o);
};
// close-up of the list on the fridge door; o.head / o.items[i] / o.sig = fade-in times
const L = { x0: 240, y0: 100, wd: 1040, h: 800, hx: 370, hy: 250, bx: 370, tx: 470, rows: [410, 550, 690], iw: [467, 212, 764] };
const ITEMS = ["my own company", "a house", "front row at Thunder Wolf"];
const listCU = (S, o = {}) => {
  DS.drop(S, rrect(76, -50, 1800, 1220, DS.r.lg));
  DS.shape(S, rrect(60, -80, 1800, 1220, DS.r.lg), "white", { dir: "h" });
  DS.shape(S, rrect(110, 200, 36, 600, DS.r.sm), "gray", { w: "mid" });
  [[1660, 170, "red"], [1770, 880, "green"], [1470, 900, "yellow"]].forEach(([x, y, n]) => DS.shape(S, circ(x, y, 30), n, { w: "detail" }));
  const { x0, y0, wd: w, h } = L;
  DS.drop(S, rect(x0 + 8, y0 + 12, w, h)); DS.shape(S, rect(x0, y0, w, h), "white", { w: "detail", flat: true });
  [272, 432, 572, 712, 862].forEach((y) => S.draw(line([x0 + 30, y], [x0 + w - 30, y], 0), S.start, 0, { c: DS.c("sky"), w: DS.w.hair }));
  S.draw(line([x0 + 100, y0 + 24], [x0 + 100, y0 + h - 24], 0), S.start, 0, { c: DS.c("red", 1), w: DS.w.hair });
  [[x0 + 90, "red"], [x0 + w - 90, "yellow"]].forEach(([x, n]) => DS.shape(S, circ(x, y0 + 12, 34), n, { w: "detail" }));
  S.text("By thirty:", L.hx, L.hy, { size: DS.type.display, font: "caveat", anchor: "start", c: PEN, t: o.head });
  ITEMS.forEach((s, i) => { const t = (o.items || [])[i];
    DS.shape(S, rrect(L.bx, L.rows[i] - 58, 58, 58, DS.r.xs), "white", { w: "mid", flat: true, t });
    S.text(s, L.tx, L.rows[i], { size: DS.type.title, font: "caveat", anchor: "start", c: PEN, t }); });
  S.text("– Dave, 18", x0 + w - 70, y0 + h - 46, { size: DS.type.small, font: "caveat", anchor: "end", c: PEN, t: o.sig });
};
const strikeHead = (S, t) => S.draw(line([L.hx - 14, L.hy - 34], [L.hx + 390, L.hy - 44], 0), t, 0, { c: DS.c("red"), w: DS.w.near });
const strikeItem = (S, i, t) => S.draw(line([L.tx - 14, L.rows[i] - 22], [L.tx + L.iw[i] + 20, L.rows[i] - 30], 0), t, 0, { c: DS.c("red"), w: DS.w.near });

// ---------- night couch + phone ----------
const nightWin = (S, x, y, w, h) => {
  DS.shape(S, rrect(x - 14, y - 14, w + 28, h + 28, DS.r.xs), "white", { w: "detail" });
  DS.shape(S, rect(x, y, w, h), "night", { flat: true, tone: 2, w: "hair" });
  S.fill(circ(x + w * 0.7, y + h * 0.3, 24), S.start, 0, DS.c("yellow", 1), 1);
  [[0.2, 0.2], [0.35, 0.62], [0.15, 0.8], [0.5, 0.14], [0.82, 0.72]].forEach(([a, b]) => S.fill(circ(x + w * a, y + h * b, 4), S.start, 0, DS.P.white[0], 0.85));
  S.draw(`M${x + w / 2} ${y} V${y + h} M${x} ${y + h / 2} H${x + w}`, S.start, 0, { c: DS.P.white[0], w: DS.w.mid });
};
const couch = (S, x, gy, w, name = "purple") => {
  DS.shadow(S, x + w / 2, gy, w + 80);
  DS.shape(S, rrect(x + 10, gy - 330, w - 20, 210, DS.r.lg), name);
  DS.shape(S, rrect(x, gy - 140, w, 100, DS.r.md), name);
  [x - 40, x + w - 30].forEach((ax) => DS.shape(S, rrect(ax, gy - 220, 70, 180, DS.r.md), name));
  [x + 30, x + w - 50].forEach((lx) => DS.shape(S, rect(lx, gy - 40, 20, 40), "wood", { w: "mid" }));
  return gy - 132;
};
const handPhone = (S, F, t) => { const [hx, hy] = F.hand("R"); DS.shape(S, rrect(hx - 18, hy - 66, 36, 64, DS.r.xs), "ink", { t, w: "detail" }); S.fill(rrect(hx - 13, hy - 60, 26, 50, DS.r.xs), t ?? S.start, 0, DS.c("sky", 1), 1); };
const bigPhone = (S, cx, cy, w, h, o = {}) => {
  const t = o.t ?? S.start;
  DS.drop(S, rrect(cx - w / 2 + 10, cy - h / 2 + 14, w, h, DS.r.lg), { t });
  DS.shape(S, rrect(cx - w / 2, cy - h / 2, w, h, DS.r.lg), "ink", { t, w: "mid" });
  const x0 = cx - w / 2 + 20, y0 = cy - h / 2 + 46, x1 = cx + w / 2 - 20, y1 = cy + h / 2 - 46;
  DS.shape(S, rrect(x0, y0, x1 - x0, y1 - y0, DS.r.sm), o.screen || "gray", { t, flat: true, w: "hair", tone: o.tone ?? 1 });
  return { x0, y0, x1, y1 };
};
const couchDave = (S, mood) => { const seat = couch(S, 160, 960, 500); const F = dave(S, 350, seat, "near", { sit: true, pose: "hold", mood, look: 6 }); handPhone(S, F); return F; };
// feed post i (0-2) inside a phone screen box P: avatar, name line, icon, caption
const post = (S, P, i, t, name, icon, str) => {
  const x = P.x0 + 16, y = P.y0 + 20 + i * 214, w = P.x1 - P.x0 - 32;
  DS.shape(S, rrect(x, y, w, 196, DS.r.sm), "white", { t, w: "detail", flat: true });
  DS.shape(S, circ(x + 44, y + 42, 24), name, { t, w: "hair" });
  S.draw(line([x + 84, y + 42], [x + 210, y + 42], 0), t ?? S.start, 0, { c: DS.c("gray", 1), w: DS.w.mid });
  icon(S, x + 92, y + 132, 1.25, t);
  if (str) S.text(str, x + 186, y + 146, { size: DS.type.caption, anchor: "start", t, c: DS.c("ink") });
};
const ringIcon = (S, cx, cy, k, t) => { S.draw(circ(cx, cy + 12 * k, 30 * k), t ?? S.start, 0, { c: DS.c("gold", 2), w: DS.w.near }); DS.shape(S, poly([[cx - 16 * k, cy - 40 * k], [cx + 16 * k, cy - 40 * k], [cx + 26 * k, cy - 28 * k], [cx, cy - 12 * k], [cx - 26 * k, cy - 28 * k]], 0) + " Z", "glass", { t, w: "detail" }); };
const keysIcon = (S, cx, cy, k, t) => {
  S.draw(circ(cx - 34 * k, cy - 30 * k, 16 * k), t ?? S.start, 0, { c: DS.c("gray", 2), w: DS.w.mid });
  [[-10, 0, 40, 34], [4, -16, 54, 6]].forEach(([dx, dy, ex, ey]) => { S.draw(line([cx + dx * k, cy + dy * k], [cx + ex * k, cy + ey * k], 0), t ?? S.start, 0, { c: DS.c("gold", 2), w: DS.w.near }); DS.shape(S, circ(cx + dx * k - 8 * k, cy + dy * k - 8 * k, 15 * k), "gold", { t, w: "detail" }); });
};
const rocketIcon = (S, cx, cy, k, t) => {
  DS.shape(S, poly([[cx - 12 * k, cy + 30 * k], [cx, cy + 56 * k], [cx + 12 * k, cy + 30 * k]], 0) + " Z", "orange", { t, w: "detail" });
  DS.shape(S, poly([[cx - 18 * k, cy + 6 * k], [cx - 36 * k, cy + 34 * k], [cx - 14 * k, cy + 28 * k]], 0) + " Z", "red", { t, w: "detail" });
  DS.shape(S, poly([[cx + 18 * k, cy + 6 * k], [cx + 36 * k, cy + 34 * k], [cx + 14 * k, cy + 28 * k]], 0) + " Z", "red", { t, w: "detail" });
  DS.shape(S, circ(cx, cy, 20 * k, 40 * k), "white", { t, w: "detail" });
  DS.shape(S, poly([[cx - 16 * k, cy - 22 * k], [cx, cy - 46 * k], [cx + 16 * k, cy - 22 * k]], 0) + " Z", "red", { t, w: "detail" });
  DS.shape(S, circ(cx, cy - 4 * k, 8 * k), "sky", { t, w: "hair" });
};
const starIcon = (S, cx, cy, k, t) => DS.shape(S, poly(Array.from({ length: 10 }, (_, i) => { const a = -Math.PI / 2 + (i * Math.PI) / 5, r = (i % 2 ? 15 : 36) * k; return [cx + Math.cos(a) * r, cy + Math.sin(a) * r]; }), 0) + " Z", "gold", { t, w: "detail" });
const essayIcon = (S, cx, cy, k, t) => { DS.shape(S, rect(cx - 30 * k, cy - 40 * k, 60 * k, 80 * k), "white", { t, w: "detail", flat: true }); [-18, -2, 14].forEach((dy) => S.draw(line([cx - 18 * k, cy + dy * k], [cx + 18 * k, cy + dy * k], 0), t ?? S.start, 0, { c: DS.c("gray"), w: DS.w.hair })); starIcon(S, cx + 26 * k, cy - 34 * k, 0.6 * k, t); };

// ---------- line-up room + faceless hooded suspect (no likeness) ----------
const lineup = (S) => { for (let i = 0; i <= 10; i++) S.draw(line([360, 140 + i * 60], [1560, 140 + i * 60], 0), S.start, 0, { c: DS.c("gray", i % 2 ? 1 : 0, "mid"), w: i % 2 ? DS.w.hair : DS.w.detail }); };
const suspect = (S, x, gy, k, o = {}) => {
  const t = o.t, n = o.name || "gray", g = S.grp();
  DS.shadow(S, x, gy, 180 * k, { t, parent: g });
  [-1, 1].forEach((sd) => DS.shape(S, rrect(x + sd * 30 * k - 21 * k, gy - 150 * k, 42 * k, 150 * k, DS.r.sm), n, { t, tone: 2, parent: g }));
  DS.shape(S, `M${x - 84 * k} ${gy - 120 * k} L${x - 74 * k} ${gy - 262 * k} Q${x} ${gy - 300 * k} ${x + 74 * k} ${gy - 262 * k} L${x + 84 * k} ${gy - 120 * k} Z`, n, { t, parent: g });
  DS.shape(S, rrect(x - 40 * k, gy - 196 * k, 80 * k, 44 * k, DS.r.sm), n, { t, tone: 2, w: "detail", parent: g });
  DS.shape(S, circ(x, gy - 330 * k, 70 * k, 74 * k), n, { t, parent: g });
  S.fill(circ(x, gy - 322 * k, 48 * k, 54 * k), t ?? S.start, 0, DS.c(n, 2), 1, g);
  [-14, 14].forEach((dx) => S.draw(line([x + dx * k, gy - 270 * k], [x + dx * k * 1.4, gy - 220 * k], 0), t ?? S.start, 0, { c: DS.c("white", 2), w: DS.w.detail, parent: g }));
  if (o.q) S.text("?", x, gy - 300 * k, { size: DS.type.body, t, c: DS.P.white[0], parent: g });
  return g;
};
const plate = (S, cx, cy, str, t, o = {}) => { const w = str.length * 26 + 48; DS.shape(S, rrect(cx - w / 2, cy - 30, w, 60, DS.r.xs), "white", { t, w: "detail", flat: true, parent: o.parent }); S.text(str, cx, cy + 14, { size: DS.type.caption, t, c: DS.c("ink"), parent: o.parent }); };

// ---------- research props ----------
const desk = (S, x, gy, w) => { DS.shadow(S, x + w / 2, gy, w); DS.shape(S, rrect(x, gy - 230, w, 40, DS.r.xs), "wood"); [x + 30, x + w - 50].forEach((lx) => DS.shape(S, rect(lx, gy - 190, 20, 190), "wood", { w: "mid" })); return gy - 230; };
const paper = (S, x, y, w, h, o = {}) => { DS.drop(S, rect(x + 6, y + 8, w, h), { t: o.t }); DS.shape(S, rect(x, y, w, h), "white", { t: o.t, w: "detail", flat: true }); };
const scribble = (S, x, y, w, n, t, gap = 40) => { for (let i = 0; i < n; i++) S.draw(smooth([[x, y + i * gap], [x + w * 0.3, y + i * gap - 6], [x + w * 0.6, y + i * gap + 5], [x + w * (i === n - 1 ? 0.7 : 1), y + i * gap - 3]]), t ?? S.start, 0, { c: DS.c("gray", 2), w: DS.w.detail }); };
const wboard = (S, x, y, w, h) => { DS.drop(S, rect(x + 8, y + 10, w, h)); DS.shape(S, rrect(x, y, w, h, DS.r.sm), "wood", { layer: "mid" }); DS.shape(S, rect(x + 22, y + 22, w - 44, h - 44), "white", { layer: "mid", w: "detail", flat: true }); };
const laptop = (S, cx, top, w, h, o = {}) => {
  const t = o.t; DS.drop(S, rrect(cx - w / 2 + 8, top - h + 10, w, h, DS.r.sm), { t });
  DS.shape(S, rrect(cx - w / 2, top - h, w, h, DS.r.sm), "gray", { t, tone: 2, w: "mid" });
  DS.shape(S, rect(cx - w / 2 + 18, top - h + 18, w - 36, h - 44), o.screen || "navy", { t, flat: true, w: "hair" });
  DS.shape(S, `M${cx - w / 2 - 30} ${top} L${cx + w / 2 + 30} ${top} L${cx + w / 2 + 10} ${top - 18} L${cx - w / 2 - 10} ${top - 18} Z`, "gray", { t, w: "detail" });
  return { x0: cx - w / 2 + 18, y0: top - h + 18, x1: cx + w / 2 - 18, y1: top - 26 };
};
const person = (S, x, gy, layer, i, o = {}) => DS.figure(S, x, gy, layer, Object.assign({ s: 1.1, hair: ["short", "bun", "curly", "side", "messy", "short"][i % 6], hairC: DS.c(["brown", "ink", "gray", "earth", "brown", "gray"][i % 6], i % 6 === 2 || i % 6 === 5 ? 1 : 0, layer), outfitC: DS.c(["green", "purple", "orange", "sky", "pink", "navy"][i % 6], 0, layer), mood: "flat" }, o));
const block = (S, x, w, gy, h, name, t) => { DS.shadow(S, x + w / 2, gy, w + 20, { t }); DS.shape(S, rect(x, gy - h, w, h), name, { t, dir: "h" }); };

const CUES = [[1, 0], [4, 0], [6, 0], [9, 0], [12, 0], [14, 0], [16, 0], [20, 0], [22, 0], [23, 0], [26, 0], [29, 0], [31, 0], [35, 0], [36, 0], [37, 0], [41, 0], [43, 0], [44, 0], [45, 0], [48, 0], [49, 0], [53, 0], [55, 0], [57, 0], [60, 0], [63, 0], [66, 0]];
const WIN = sceneWindows(CUES, -0.25); // each picture lands just after its first word, so the last beat of the previous one can sit through the 0.6 s crossfade
WIN[16][1] += 0.2; WIN[17][0] += 0.2; // let "quit" sit
const sc = (k, o) => scene(WIN[k][0], WIN[k][1], o);

// 0  This is Dave. / Twenty-nine, / and behind.
{ const S = sc(0, { cam: "push", focus: "1000 600" }); DS.room(S, ROOM.kitchen); kitchen(S);
  const F = dave(S, 1000, 960, "near", { mood: "flat", look: 0 });
  DS.card(S, "DAVE, 29", 640, 470, { size: DS.type.body, t: W(2, 0) });
  F.face(W(3, 1), "sad", 0);
  DS.card(S, "BEHIND", 1000, 430, { size: DS.type.body, t: W(3, 1), tc: "red" });
  DS.vignette(S); }

// 1  Behind what? / The list on his fridge, written at eighteen.
{ const S = sc(1, { cam: "zoom", focus: "1300 560" }); DS.room(S, ROOM.kitchen); const Fr = kitchen(S);
  const F = dave(S, 1000, 960, "near", { mood: "worried", look: 0 }); F.face(W(5, 1), "worried", 7);
  S.ring(Fr.cx, Fr.cy, 150, 170, W(5, 1), 0, { c: DS.c("red"), w: DS.w.near });
  DS.card(S, "WRITTEN AT 18", 1360, 130, { size: DS.type.small, t: W(5, 5) });
  DS.vignette(S); }

// 2  By thirty: / my own company, / a house, / front row at Thunder Wolf.
{ const S = sc(2, { cam: "push", focus: "760 420" }); DS.room(S, ROOM.door); listCU(S, { head: W(6, 0), items: [W(6, 2), W(7, 0), W(8, 0)] }); DS.vignette(S); }

// 3  Eleven months left. / Ticks: / zero.
{ const S = sc(3, { cam: "zoom", focus: "1000 520" }); DS.room(S, ROOM.door); listCU(S);
  const g = S.grp(); DS.drop(S, rrect(1418, 166, 300, 330, DS.r.md), { t: W(9, 0), parent: g });
  DS.shape(S, rrect(1410, 156, 300, 330, DS.r.md), "white", { t: W(9, 0), w: "mid", parent: g });
  DS.shape(S, rect(1410, 176, 300, 76), "red", { t: W(9, 0), tone: 2, flat: true, w: "detail", parent: g });
  S.text("MONTHS LEFT", 1560, 228, { size: DS.type.caption, t: W(9, 0), c: DS.P.white[0], parent: g });
  S.text("11", 1560, 420, { size: DS.type.display, t: W(9, 0), c: DS.c("ink"), parent: g });
  S.draw(rrect(L.bx - 24, L.rows[0] - 82, 106, 360, DS.r.md), W(10, 0), 0, { c: DS.c("red"), w: DS.w.near });
  DS.card(S, "TICKS: 0", 1560, 700, { size: DS.type.title, t: W(11, 0), tc: "red" });
  DS.vignette(S); }

// 4  Tonight's scroll: / an engagement, new house keys, a classmate's startup.
{ const S = sc(4, { cam: "push", focus: "1100 560" }); DS.room(S, ROOM.night); nightWin(S, 760, 190, 200, 200);
  const F = couchDave(S, "flat");
  const P = bigPhone(S, 1340, 540, 520, 760);
  post(S, P, 0, W(13, 1), "pink", ringIcon, "SAID YES!");
  post(S, P, 1, W(13, 3), "green", keysIcon, "NEW HOME!");
  post(S, P, 2, W(13, 6), "orange", rocketIcon, "LAUNCHED!");
  DS.card(S, "TONIGHT'S SCROLL", 420, 170, { size: DS.type.body, t: W(12, 0) });
  F.face(W(13, 6), "sad", 6);
  DS.vignette(S, 0.18); }

// 5  So, is Dave behind? / Whose schedule says so?
{ const S = sc(5, { cam: "push", focus: "960 560" }); DS.room(S, ROOM.lineup); lineup(S);
  [760, 1060, 1360].forEach((x, i) => { suspect(S, x, 800, 0.9, { q: true, t: W(15, 0) + i * 0.12 }); plate(S, x, 400, String(i + 1), W(15, 0) + i * 0.12); });
  const F = dave(S, 380, 960, "near", { mood: "worried", look: 6, pose: "hold" });
  const [hx, hy] = F.hand("R"); paper(S, hx - 70, hy - 30, 140, 170); scribble(S, hx - 50, hy + 20, 100, 3, S.start, 34);
  DS.card(S, "BEHIND?", 380, 330, { size: DS.type.body, t: W(14, 3) });
  DS.card(S, "WHOSE SCHEDULE?", 1060, 230, { size: DS.type.body, t: W(15, 0), tc: "red" });
  DS.vignette(S); }

// 6  Suspect one: / Silicon Valley. / Mark Zuckerberg: / "Young people are just smarter."
{ const S = sc(6, { cam: "push", focus: "960 560" }); DS.room(S, ROOM.lineup); lineup(S);
  suspect(S, 960, 960, 1.15);
  plate(S, 960, 735, "SILICON VALLEY", W(17, 0));
  DS.card(S, "SUSPECT 1", 960, 130, { size: DS.type.body, t: W(16, 0), tc: "red" });
  DS.card(S, "MARK ZUCKERBERG · 2007", 470, 330, { size: DS.type.caption, t: W(18, 0) });
  S.speech(1440, 380, 330, 120, 1060, 560, W(19, 0), 0.3);
  S.text("YOUNG PEOPLE ARE", 1440, 370, { size: DS.type.small, t: W(19, 0), c: DS.c("ink") });
  S.text("JUST SMARTER.", 1440, 432, { size: DS.type.small, t: W(19, 0), c: DS.c("ink") });
  DS.vignette(S); }

// 7  He said it / at twenty-two.
{ const S = sc(7, { cam: "zoom", focus: "900 480" }); DS.room(S, ROOM.lineup); lineup(S);
  suspect(S, 960, 960, 1.15);
  plate(S, 960, 735, "SILICON VALLEY");
  DS.card(S, "MARK ZUCKERBERG · 2007", 470, 330, { size: DS.type.caption });
  S.speech(1440, 380, 330, 120, 1060, 560, S.start, 0);
  S.text("YOUNG PEOPLE ARE", 1440, 370, { size: DS.type.small, c: DS.c("ink") });
  S.text("JUST SMARTER.", 1440, 432, { size: DS.type.small, c: DS.c("ink") });
  DS.card(S, "HE WAS 22", 520, 560, { size: DS.type.title, t: W(21, 1), tc: "red" });
  DS.vignette(S); }

// 8  In twenty twenty, economists Pierre Azoulay and Benjamin Jones checked two point seven million American founders.
{ const S = sc(8, { cam: "pull" }); DS.room(S, ROOM.lab);
  DS.drop(S, rrect(488, 158, 944, 420, DS.r.sm)); DS.shape(S, rrect(480, 150, 944, 420, DS.r.sm), "gray", { layer: "mid", tone: 2 });
  DS.shape(S, rect(500, 170, 904, 380), "navy", { layer: "mid", flat: true, w: "hair", tone: 2 });
  for (let r = 0; r < 9; r++) for (let c = 0; c < 24; c++) { const x = 530 + c * 37.5, y = 196 + r * 40, t = W(22, 10) + (r + c) * 0.01, n = (r * 7 + c * 3) % 11 ? "white" : "gold";
    S.fill(circ(x, y, 7), t, 0, DS.c(n, 1), 1); S.fill(rrect(x - 9, y + 9, 18, 14, DS.r.xs), t, 0, DS.c(n, 1), 1); }
  DS.figure(S, 420, 960, "near", { s: 1.1, hair: "short", hairC: DS.c("ink"), outfitC: DS.c("green"), mood: "determined", look: 6, pose: "point" });
  DS.figure(S, 1500, 960, "near", { s: 1.1, hair: "side", hairC: DS.c("gray", 2), outfitC: DS.c("purple"), mood: "flat", look: -6 });
  DS.card(S, "2020 · AZOULAY & JONES", 960, 680, { size: DS.type.small, t: W(22, 5) });
  DS.card(S, "2.7 MILLION US FOUNDERS", 960, 820, { size: DS.type.small, t: W(22, 10), tc: "red" });
  DS.vignette(S); }

// 9  The fastest-growing one in a thousand? / Average founder age: / forty-five.
{ const S = sc(9, { cam: "push", focus: "900 460" }); DS.room(S, ROOM.lab);
  wboard(S, 220, 120, 960, 640);
  for (let r = 0; r < 25; r++) for (let c = 0; c < 40; c++) S.fill(circ(276 + c * 21.5, 168 + r * 22.5, 6.5), S.start, 0, DS.c("gray"), 1);
  const dx = 276 + 29 * 21.5, dy = 168 + 8 * 22.5;
  S.fill(circ(dx, dy, 9), W(23, 1), 0, DS.c("gold"), 1);
  S.draw(circ(dx, dy, 26), W(23, 1), 0, { c: DS.c("red"), w: DS.w.near });
  DS.card(S, "TOP 1 IN 1,000", 700, 840, { size: DS.type.small, t: W(23, 2) });
  const F = DS.figure(S, 1500, 960, "near", { s: 1.1, hair: "short", hairC: DS.c("gray", 2), outfitC: DS.c("green"), mood: "smile", look: -6, t: W(24, 0) });
  S.arrow(dx + 30, dy + 10, 1420, 560, W(24, 0), 0.3, { c: DS.c("red"), w: DS.w.mid, bend: -0.2 });
  DS.card(S, "AVERAGE AGE: 45", 1500, 300, { size: DS.type.body, t: W(25, 0), tc: "red" });
  DS.vignette(S); }

// 10  A fifty-year-old / was one point eight times as likely to get there / as a thirty-year-old.
{ const S = sc(10, { cam: "push", focus: "960 520" }); DS.room(S, ROOM.lab);
  block(S, 520, 340, 940, 360, "gold", W(26, 1));
  S.text("AGE 50", 690, 860, { size: DS.type.body, t: W(26, 1), c: DS.c("ink") });
  DS.figure(S, 690, 580, "near", { s: 0.9, hair: "short", hairC: DS.c("gray", 1), outfitC: DS.c("green"), mood: "happy", look: 6, pose: "armsUp", t: W(26, 1) });
  DS.card(S, "1.8× AS LIKELY", 690, 150, { size: DS.type.body, t: W(27, 1), tc: "green" });
  block(S, 1060, 340, 940, 200, "sky", W(28, 1));
  S.text("AGE 30", 1230, 860, { size: DS.type.body, t: W(28, 1), c: DS.c("ink") });
  DS.figure(S, 1230, 740, "near", { s: 0.9, hair: "side", hairC: DS.c("ink"), outfitC: DS.c("orange"), mood: "flat", look: -6, t: W(28, 1) });
  DS.vignette(S); }

// 11  Item one isn't late. / It's fifteen years early.
const AX = (a) => 440 + (a - 15) * 30, BASE = 600;
{ const S = sc(11, { cam: "push", focus: "1000 460" }); DS.room(S, { window: false });
  wboard(S, 340, 170, 1260, 560);
  S.draw(line([AX(16), BASE], [AX(52), BASE], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.mid });
  [20, 30, 40, 50].forEach((a) => { S.draw(line([AX(a), BASE - 12], [AX(a), BASE + 12], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.mid }); S.text(String(a), AX(a), BASE + 56, { size: DS.type.caption, c: DS.c("ink") }); });
  S.draw(line([AX(30), BASE], [AX(30), BASE - 250], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.detail });
  DS.shape(S, `M${AX(30)} ${BASE - 250} L${AX(30) + 70} ${BASE - 225} L${AX(30)} ${BASE - 200} Z`, "red", { w: "detail" });
  S.text("BY 30", AX(30), BASE - 280, { size: DS.type.small, c: DS.c("red", 2) });
  starIcon(S, AX(45), BASE - 200, 1.4, W(30, 1));
  S.text("AVERAGE: 45", AX(45), BASE - 280, { size: DS.type.small, t: W(30, 1), c: DS.c("ink") });
  S.arrow(AX(30) + 16, BASE - 60, AX(45) - 16, BASE - 60, W(30, 1), 0.4, { c: DS.c("green"), w: DS.w.near, bend: -0.12 });
  DS.card(S, "ITEM 1: MY OWN COMPANY", 960, 110, { size: DS.type.small, t: W(29, 0) });
  DS.card(S, "15 YEARS EARLY", 1115, 820, { size: DS.type.body, t: W(30, 1), tc: "green" });
  const F = dave(S, 250, 1000, "near", { s: 0.95, mood: "worried", look: 6 }); F.face(W(30, 1), "wow", 6);
  DS.vignette(S); }

// 12  Suspect two: / the feed. / Dave follows thirty founders under thirty, / for motivation.
{ const S = sc(12, { cam: "push", focus: "960 560" }); DS.room(S, ROOM.lineup); lineup(S);
  DS.shadow(S, 1060, 890, 420);
  const P = bigPhone(S, 1060, 540, 420, 700, { tone: 1 });
  S.text("30 UNDER 30", (P.x0 + P.x1) / 2, P.y0 + 60, { size: DS.type.caption, t: W(33, 2), c: DS.c("ink") });
  const cols = ["pink", "green", "orange", "purple", "sky", "gold"];
  for (let i = 0; i < 30; i++) { const cx = P.x0 + 46 + (i % 5) * 72, cy = P.y0 + 130 + Math.floor(i / 5) * 76, t = W(33, 2) + i * 0.02;
    S.fill(circ(cx, cy, 28), t, 0, DS.c(cols[i % 6]), 1); S.fill(circ(cx, cy - 6, 10), t, 0, DS.P.white[0], 1); S.fill(rrect(cx - 15, cy + 8, 30, 14, DS.r.xs), t, 0, DS.P.white[0], 1); }
  DS.card(S, "SUSPECT 2: THE FEED", 1060, 110, { size: DS.type.body, t: W(31, 0), tc: "red" });
  const F = dave(S, 420, 960, "near", { mood: "smile", look: 6, pose: "hold" }); handPhone(S, F);
  F.face(W(34, 0), "determined", 6);
  DS.card(S, "FOR MOTIVATION", 420, 400, { size: DS.type.small, t: W(34, 0) });
  DS.vignette(S); }

// 13  In twenty sixteen, Todd Rogers and Avi Feller followed nearly six thousand online students
{ const S = sc(13, { cam: "pull" }); DS.room(S, { wall: "glass", floor: "wood", window: [1440, 170, 200, 200] });
  const top = desk(S, 420, 960, 1080);
  const Sc = laptop(S, 960, top, 760, 470);
  const hair = ["short", "bun", "curly", "side", "messy"];
  for (let i = 0; i < 24; i++) { const x = Sc.x0 + 12 + (i % 6) * 120, y = Sc.y0 + 10 + Math.floor(i / 6) * 102, t = W(35, 10) + i * 0.02;
    S.fill(rrect(x, y, 108, 90, DS.r.xs), t, 0, DS.c(["purple", "green", "orange", "blue"][i % 4], 1), 1);
    S.fill(circ(x + 54, y + 40, 18), t, 0, DS.P.white[0], 1); S.fill(rrect(x + 30, y + 62, 48, 28, DS.r.sm), t, 0, DS.P.white[0], 1);
    if (hair[i % 5] === "bun") S.fill(circ(x + 54, y + 18, 9), t, 0, DS.c("brown"), 1); }
  DS.card(S, "2016 · ROGERS & FELLER", 960, 110, { size: DS.type.small, t: W(35, 3) });
  DS.card(S, "5,740 ONLINE STUDENTS", 960, 860, { size: DS.type.small, t: W(35, 10), tc: "red" });
  DS.vignette(S); }

// 14  grading three random classmates' essays.
const student = (S, x, gy, layer, o = {}) => DS.figure(S, x, gy, layer, Object.assign({ s: 1.1, hair: "bun", hairC: DS.c("brown", 2), outfitC: DS.c("purple") }, o));
{ const S = sc(14, { cam: "push", focus: "1100 520" }); DS.room(S, { wall: "glass", floor: "wood", window: false });
  const top = desk(S, 200, 960, 700);
  laptop(S, 690, top, 380, 250);
  student(S, 330, 960, "near", { mood: "determined", look: 6 });
  [[1060, 330, -6], [1300, 300, 0], [1540, 330, 6]].forEach(([x, y, a], i) => { const t = W(36, 1) + i * 0.15, g = S.grp();
    DS.drop(S, rect(x - 100 + 6, y + 8, 200, 270), { t, parent: g }); DS.shape(S, rect(x - 100, y, 200, 270), "white", { t, w: "detail", flat: true, parent: g });
    for (let k = 0; k < 4; k++) S.draw(line([x - 70, y + 70 + k * 44], [x + (k === 3 ? 20 : 70), y + 70 + k * 44], 0), t, 0, { c: DS.c("gray", 2), w: DS.w.detail, parent: g });
    S.draw(circ(x + 60, y + 230, 26), t, 0, { c: DS.c("red"), w: DS.w.mid, parent: g }); S.text("?", x + 60, y + 246, { size: DS.type.caption, t, c: DS.c("red", 2), parent: g });
    g.setAttribute("transform", `rotate(${a} ${x} ${y + 135})`); });
  DS.card(S, "GRADE 3 RANDOM ESSAYS", 1300, 160, { size: DS.type.small, t: W(36, 0) });
  DS.vignette(S); }

// 15  Graded average essays? / Sixty-eight percent passed. / Graded the very best? / Forty-five.
{ const S = sc(15, { cam: "push" }); DS.room(S, { wall: "glass", floor: "wood", window: false });
  paper(S, 400, 250, 320, 400, { t: W(37, 0) }); scribble(S, 440, 330, 240, 5, W(37, 0), 56);
  S.text("AVERAGE ESSAYS", 560, 720, { size: DS.type.small, t: W(37, 1), c: DS.c("ink") });
  S.text("68%", 560, 870, { size: DS.type.display, t: W(38, 0), c: DS.c("green", 2) });
  paper(S, 1200, 250, 320, 400, { t: W(39, 0) }); scribble(S, 1240, 330, 240, 5, W(39, 0), 56);
  starIcon(S, 1470, 290, 1.4, W(39, 0)); S.text("A+", 1270, 620, { size: DS.type.title, t: W(39, 0), c: DS.c("red", 2) });
  S.text("THE VERY BEST", 1360, 720, { size: DS.type.small, t: W(39, 2), c: DS.c("ink") });
  S.text("45%", 1360, 870, { size: DS.type.display, t: W(40, 0), c: DS.c("red", 2) });
  DS.card(S, "PASSED THE COURSE", 960, 130, { size: DS.type.body, t: W(38, 2) });
  DS.vignette(S); }

// 16  The best essays didn't teach them to write. / They taught them to quit.
const exitDoor = (S, x, y, w, h) => {
  DS.shape(S, rect(x - 14, y - 14, w + 28, h + 14), "white", { layer: "mid", w: "mid" }); DS.shape(S, rect(x, y, w, h), "ink", { layer: "mid", flat: true, w: "detail" });
  DS.shape(S, poly([[x + w, y], [x + w + w * 0.45, y + 40], [x + w + w * 0.45, y + h + 25], [x + w, y + h]], 0) + " Z", "wood", { layer: "mid" });
  DS.shape(S, rrect(x + w / 2 - 70, y - 86, 140, 54, DS.r.xs), "green", { tone: 2, flat: true, w: "detail" }); S.text("EXIT", x + w / 2, y - 45, { size: DS.type.caption, c: DS.P.white[0] });
};
{ const S = sc(16, { cam: "push", focus: "900 540" }); const R = DS.room(S, { wall: "glass", floor: "wood", window: false });
  exitDoor(S, 1340, 330, 230, 430);
  const top = desk(S, 300, 960, 760);
  const Sc = laptop(S, 760, top, 520, 330, { screen: "white" });
  S.fill(rect(Sc.x0 + 150, Sc.y0 + 20, 190, 250), S.start, 0, DS.c("paper", 2), 1); scribble(S, Sc.x0 + 175, Sc.y0 + 80, 140, 4, S.start, 40);
  starIcon(S, Sc.x0 + 330, Sc.y0 + 40, 1.0, S.start); S.text("A+", Sc.x0 + 90, Sc.y0 + 130, { size: DS.type.body, c: DS.c("red", 2) });
  const sit = student(S, 380, 960, "near", { mood: "worried", look: 6 }); S.fadeOut(sit.g, W(42, 2), 0.35);
  student(S, 1455, R.hy + 40, "mid", { mood: "sad", look: 6, t: W(42, 2) });
  DS.card(S, "QUIT", 1455, 180, { size: DS.type.title, t: W(42, 4), tc: "red" });
  DS.vignette(S); }

// 17  Dave's feed / is all best essays.
{ const S = sc(17, { cam: "zoom", focus: "1200 540" }); DS.room(S, ROOM.night); nightWin(S, 760, 190, 200, 200);
  const F = couchDave(S, "flat");
  const P = bigPhone(S, 1340, 540, 520, 760);
  ["pink", "green", "orange"].forEach((n, i) => post(S, P, i, S.start, n, essayIcon, ["UNDER 30!", "SOLD: $1B", "PERFECT 10!"][i]));
  [0, 1, 2].forEach((i) => starIcon(S, P.x1 - 56, P.y0 + 66 + i * 214, 1.1, W(43, 4) + i * 0.12));
  DS.card(S, "ALL BEST ESSAYS", 420, 170, { size: DS.type.body, t: W(43, 3), tc: "red" });
  F.face(W(43, 3), "sad", 6);
  DS.vignette(S, 0.18); }

// 18  Now, check the handwriting.
{ const S = sc(18, { cam: "zoom", focus: "1100 760" }); DS.room(S, ROOM.door); listCU(S);
  const g = S.grp(); g.setAttribute("data-layout-allow-overlap", ""); const lx = 1120, ly = 800, r = 116; // the lens magnifies the signature under it
  S.fill(circ(lx, ly, r), W(44, 1), 0, DS.c("glass", 1), 1, g);
  S.text("Dave, 18", lx, ly + 20, { size: DS.type.body, font: "caveat", t: W(44, 1), c: PEN, parent: g });
  S.draw(circ(lx, ly, r), W(44, 1), 0, { c: DS.c("ink"), w: DS.w.near, parent: g });
  S.draw(line([lx + r * 0.9, ly + r * 0.42], [lx + r * 1.75, ly + r * 0.82], 0), W(44, 1), 0, { c: DS.c("ink"), w: DS.w.near * 2.4, parent: g });
  DS.card(S, "WHO WROTE IT?", 1580, 300, { size: DS.type.small, t: W(44, 2), tc: "red" });
  DS.vignette(S); }

// 19  Suspect three / wrote the list. / Dave, / aged eighteen.
{ const S = sc(19, { cam: "zoom", focus: "960 600" }); DS.room(S, ROOM.lineup); lineup(S);
  const sg = suspect(S, 960, 960, 1.15, { q: true }); S.fadeOut(sg, W(47, 0), 0.35);
  const F = young(S, 960, 960, "near", { s: 1.35, mood: "determined", look: 0, pose: "hold", t: W(47, 0) });
  const [hx, hy] = F.hand("R");
  paper(S, hx - 100, hy - 14, 200, 230, { t: W(46, 0) });
  S.text("By thirty:", hx - 78, hy + 40, { size: DS.type.caption, font: "caveat", anchor: "start", t: W(46, 0), c: PEN });
  scribble(S, hx - 70, hy + 96, 140, 3, W(46, 0), 38);
  DS.card(S, "SUSPECT 3", 960, 130, { size: DS.type.body, t: W(45, 0), tc: "red" });
  DS.card(S, "DAVE, AGED 18", 1420, 420, { size: DS.type.body, t: W(47, 1) });
  DS.vignette(S); }

// 20  In twenty thirteen, Daniel Gilbert's team asked over nineteen thousand people, aged eighteen to sixty-eight:
{ const S = sc(20, { cam: "pull" }); DS.outdoor(S, { hy: 620, sky: "sky", sun: [1600, 180] });
  for (let i = 0; i < 11; i++) person(S, 330 + i * 126, 700, "far", i, { s: 1.5, t: W(48, 8) + i * 0.04 });
  [[300, 0, "smile"], [760, 3, "flat"], [1180, 2, "smile"], [1620, 5, "flat"]].forEach(([x, i, mood], k) => person(S, x, 960, "near", i, { s: 1.0, mood, look: k % 2 ? -4 : 4, hairC: DS.c(k === 3 ? "gray" : ["brown", "earth", "gray"][k % 3], k >= 2 ? 1 : 0) }));
  DS.card(S, "2013 · GILBERT'S TEAM", 960, 130, { size: DS.type.small, t: W(48, 4) });
  DS.card(S, "19,000+ PEOPLE, AGED 18 TO 68", 960, 250, { size: DS.type.small, t: W(48, 8), tc: "red" });
  DS.vignette(S); }

// 21  How much did you change in the last ten years? / A lot. / In the next ten? / Not much.
{ const S = sc(21, { cam: "push", focus: "1000 520" }); DS.room(S, { wall: "glass", floor: "wood", window: false });
  wboard(S, 780, 120, 900, 720);
  S.text("HOW MUCH YOU CHANGE", 1230, 210, { size: DS.type.small, c: DS.c("ink") });
  S.draw(line([840, 700], [1620, 700], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.mid });
  S.text("LAST 10 YEARS", 1030, 770, { size: DS.type.caption, t: W(49, 7), c: DS.c("ink") });
  DS.shape(S, rect(920, 300, 220, 400), "orange", { t: W(50, 0), dir: "h" });
  S.text("NEXT 10 YEARS", 1430, 770, { size: DS.type.caption, t: W(51, 2), c: DS.c("ink") });
  DS.shape(S, rect(1320, 620, 220, 80), "sky", { t: W(52, 0), dir: "h" });
  const F = person(S, 400, 960, "near", 1, { mood: "smile", look: 6 });
  const b1 = S.grp(); S.speech(400, 330, 220, 90, 420, 540, W(50, 0), 0.25, { parent: b1 }); S.text("A LOT.", 400, 352, { size: DS.type.body, t: W(50, 0), c: DS.c("ink"), parent: b1 }); S.fadeOut(b1, W(52, 0) - 0.05, 0.25);
  S.speech(400, 330, 220, 90, 420, 540, W(52, 0), 0.25); S.text("NOT MUCH.", 400, 352, { size: DS.type.body, t: W(52, 0), c: DS.c("ink") });
  F.face(W(52, 0), "flat", 6);
  DS.vignette(S); }

// 22  At every age. / Everyone thinks they're finished.
{ const S = sc(22, { cam: "pull" }); DS.room(S, { wall: "wall", floor: "wood", window: [1460, 170, 200, 200] });
  [[380, "messy", "brown", 0, "sky", "18"], [780, "short", "ink", 0, "yellow", "30"], [1180, "bun", "brown", 1, "pink", "50"], [1580, "short", "gray", 1, "gold", "68"]].forEach(([x, hair, hc, tone, oc, age], i) => {
    const F = DS.figure(S, x, 960, "near", { s: 1.05, hair, hairC: DS.c(hc, tone), outfitC: DS.c(oc), mood: "smile", look: i < 2 ? 4 : -4 });
    S.text(age, x, F.sh[1] + 86, { size: DS.type.caption, c: DS.c("ink") });
    const [tx, ty] = F.top(); S.thought(tx + 40, ty - 90, 120, 56, tx, ty - 10, W(54, 2) + i * 0.08, 0.25); S.text("DONE.", tx + 40, ty - 76, { size: DS.type.caption, t: W(54, 2) + i * 0.08, c: DS.c("ink") }); });
  DS.card(S, "AT EVERY AGE", 960, 130, { size: DS.type.body, t: W(53, 0) });
  DS.vignette(S); }

// 23  Eighteen-year-old Dave was sure he'd love Thunder Wolf forever. / He hasn't played them since twenty sixteen.
{ const S = sc(23, { cam: "push", focus: "960 460" }); DS.room(S, { wall: "purple", floor: "wood", window: false });
  const px = 520, py = 150, pw = 440, ph = 520;
  DS.drop(S, rect(px + 8, py + 10, pw, ph)); DS.shape(S, rect(px, py, pw, ph), "navy", { tone: 2, flat: true, w: "detail" });
  S.bolt(px + pw / 2, py + 220, 2.0, S.start, 0);
  S.text("THUNDER", px + pw / 2, py + 430, { size: DS.type.body, c: DS.c("yellow", 1) });
  S.text("WOLF", px + pw / 2, py + 495, { size: DS.type.body, c: DS.c("yellow", 1) });
  [[px + 20, py + 20], [px + pw - 20, py + 20]].forEach(([x, y]) => DS.shape(S, circ(x, y, 10), "red", { w: "hair" }));
  S.fill(rect(px, py, pw, ph), W(56, 1), 0, DS.c("gray", 1), 0.6);
  S.draw(`M${px + pw} ${py + 130} L${px + pw - 130} ${py} M${px + pw} ${py + 64} Q${px + pw - 54} ${py + 54} ${px + pw - 64} ${py} M${px + pw} ${py + 104} Q${px + pw - 94} ${py + 94} ${px + pw - 104} ${py}`, W(56, 1), 0, { c: DS.c("white", 2), w: DS.w.hair });
  const F = young(S, 1400, 960, "near", { mood: "happy", look: -6 });
  const tg = S.grp(); S.thought(1450, 320, 200, 110, 1410, 530, W(55, 5), 0.25, { parent: tg });
  S.heart(1450, 300, 0.8, W(55, 5), 0, { fill: DS.c("red"), c: DS.c("ink"), w: DS.w.detail, parent: tg });
  S.text("FOREVER", 1450, 392, { size: DS.type.small, t: W(55, 8), c: DS.c("ink"), parent: tg });
  F.face(W(56, 1), "flat", -6);
  DS.card(S, "LAST PLAYED: 2016", 740, 790, { size: DS.type.small, t: W(56, 4), tc: "red" });
  DS.vignette(S); }

// 24  Dave isn't behind. / He's taking orders / from an eighteen-year-old.
{ const S = sc(24, { cam: "push", focus: "800 560" }); DS.room(S, ROOM.kitchen); kitchen(S);
  const D = dave(S, 1000, 960, "near", { mood: "worried", look: -6, pose: "hold", t: S.start });
  D.face(W(57, 0), "smile", -6); D.face(W(58, 1), "worried", -6);
  DS.card(S, "NOT BEHIND", 1000, 460, { size: DS.type.body, t: W(57, 0), tc: "green" });
  const Y = young(S, 480, 960, "near", { mood: "angry", look: 6, pose: "point", t: W(58, 1) });
  S.speech(470, 330, 230, 80, 490, 540, W(58, 1), 0.25); S.text("BY THIRTY!", 470, 350, { size: DS.type.small, t: W(58, 1), c: DS.c("ink") });
  DS.card(S, "ORDERS FROM: DAVE, 18", 1000, 110, { size: DS.type.small, t: W(59, 1), tc: "red" });
  DS.vignette(S); }

// 25  Tonight, write your own list. / No dates. / Only what you still want.
{ const S = sc(25, { cam: "push", focus: "960 560" }); DS.room(S, { wall: "night", floor: "wood", window: false });
  nightWin(S, 400, 170, 200, 200);
  const top = desk(S, 380, 960, 1160);
  DS.shape(S, rect(470, top - 210, 30, 210), "gray", { tone: 2, w: "mid" }); DS.shape(S, `M${410} ${top - 200} L${560} ${top - 200} L${525} ${top - 280} L${445} ${top - 280} Z`, "yellow", { w: "mid" });
  paper(S, 700, 210, 520, top - 230);
  S.text("My list", 760, 300, { size: DS.type.title, font: "caveat", anchor: "start", c: PEN, t: W(60, 1) });
  [400, 490, 580].forEach((y) => S.draw(line([760, y], [1160, y], 0), S.start, 0, { c: DS.c("sky"), w: DS.w.hair }));
  S.heart(800, 470, 0.7, W(62, 3), 0, { fill: DS.c("red"), c: DS.c("ink"), w: DS.w.detail });
  S.text("still want", 860, 480, { size: DS.type.body, font: "caveat", anchor: "start", t: W(62, 3), c: PEN });
  S.pencil(1180, top - 30, 220, -28, W(60, 1), 0);
  const cg = S.grp(); DS.shape(S, rrect(1360, 480, 200, 190, DS.r.sm), "white", { t: W(61, 0), w: "mid", parent: cg }); DS.shape(S, rect(1360, 500, 200, 46), "red", { t: W(61, 0), flat: true, w: "detail", tone: 2, parent: cg });
  S.text("30", 1460, 640, { size: DS.type.title, t: W(61, 0), c: DS.c("ink"), parent: cg });
  S.cross(1460, 580, 1.4, W(61, 1), 0, { c: DS.c("red"), w: DS.w.near });
  DS.card(S, "NO DATES", 1460, 400, { size: DS.type.body, t: W(61, 0), tc: "red" });
  DS.card(S, "TONIGHT", 960, 120, { size: DS.type.body, t: W(60, 0) });
  DS.vignette(S, 0.16); }

// 26  Dave kept his list. / He crossed out "by thirty." / And Thunder Wolf.
{ const S = sc(26, { cam: "zoom", focus: "760 400" }); DS.room(S, ROOM.door); listCU(S);
  DS.card(S, "KEPT THE LIST", 1580, 300, { size: DS.type.small, t: W(63, 1), tc: "green" });
  strikeHead(S, W(64, 1)); strikeItem(S, 2, W(65, 1));
  S.pencil(1430, 760, 260, -40, W(64, 0), 0);
  DS.vignette(S); }

// 27  You are not behind. / You're just not eighteen any more.
{ const S = sc(27, { cam: "pull", focus: "1100 560" }); DS.room(S, ROOM.kitchen); kitchen(S, { struck: true });
  const F = dave(S, 1000, 960, "near", { mood: "smile", look: 6 }); F.face(W(67, 0), "happy", 0);
  DS.card(S, "YOU ARE NOT BEHIND", 760, 140, { size: DS.type.body, t: W(66, 0), tc: "green" });
  DS.card(S, "JUST NOT 18 ANY MORE", 640, 470, { size: DS.type.small, t: W(67, 2) });
  DS.plant(S, 110, 1120, 1.0, 1); DS.vignette(S); }
