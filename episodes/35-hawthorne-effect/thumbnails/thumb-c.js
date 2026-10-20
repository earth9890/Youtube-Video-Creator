// look: still
// C (clickbait scene mode, 2026-10-20): the office. His boss stops in the glass doorway with a coffee; huge Dave types
// so fast the keyboard smokes and sparks, a spreadsheet he doesn't need on the screen, side-eyeing the door.
// Text "WATCHED?": the video's opening beat ("For eleven seconds, Dave is the hardest-working man in the building")
// and its question (does being watched change what we do?).
// ---------- helpers (from scenes.js) ----------
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
const BOSS = { s: 1.1, hair: "short", hairC: DS.c("ink", 1), outfitC: DS.c("gray", 2), tieC: "purple" };
const desk = (S, x0, x1, top, gy = 960, name = "wood") => { DS.shadow(S, (x0 + x1) / 2, gy, x1 - x0 + 60); DS.shape(S, rect(x0 + 24, top + 20, x1 - x0 - 48, gy - top - 20), name, { tone: 2 }); DS.shape(S, rrect(x0, top, x1 - x0, 28, DS.r.xs), name); };
const keyboard = (S, cx, top, wd = 220) => DS.shape(S, rrect(cx - wd / 2, top - 16, wd, 18, DS.r.xs), "gray", { tone: 1, w: "detail" });
const mug = (S, cx, base, k = 1) => { DS.shape(S, rrect(cx - 26 * k, base - 64 * k, 52 * k, 64 * k, DS.r.sm), "yellow", { w: "detail" }); S.draw(arc(cx + 28 * k, base - 34 * k, 16 * k, -80, 80), S.start, 0, { c: DS.c("ink"), w: DS.w.mid }); };
const screenAt = (S, cx, base, wd, ht, o = {}) => {
  const t = o.t, x = cx - wd / 2, y = base - 44 - ht;
  DS.shape(S, rect(cx - 16, base - 48, 32, 48), "gray", { t, tone: 2, w: "detail" });
  DS.shape(S, rrect(cx - 80, base - 14, 160, 14, DS.r.xs), "gray", { t, tone: 2, w: "detail" });
  DS.shape(S, rrect(x, y, wd, ht, DS.r.sm), "ink", { t, w: "mid" });
  const B = { x0: x + 16, y0: y + 16, x1: x + wd - 16, y1: y + ht - 16 };
  DS.shape(S, rect(B.x0, B.y0, B.x1 - B.x0, B.y1 - B.y0), o.night ? "navy" : "white", { t, flat: true, w: "hair", tone: o.night ? 1 : 0 });
  return B;
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
const smoke = (S, B) => {
  B.forEach(([x, y, r]) => S.fill(circ(x, y, r + 6), 0, 0, DS.P.ink[0], 1));
  B.forEach(([x, y, r]) => S.fill(circ(x, y, r), 0, 0, "#a7abb1", 1));
  B.forEach(([x, y, r]) => S.fill(circ(x - r * 0.12, y - r * 0.16, r * 0.84), 0, 0, "#dcdde0", 1));
};

const S = scene(0, 1, { cam: "none" });
DS.room(S, { wall: "earth", floor: "wood", window: false });
// glass doorway at the back right: the boss has stopped in it
DS.shape(S, rect(1470, 300, 270, 520), "white", { layer: "mid", tone: 2 });
DS.shape(S, rect(1490, 320, 230, 500), "glass", { layer: "mid", flat: true, tone: 1, w: "detail" });
const Bo = who(S, 1605, 900, "near", Object.assign({}, BOSS, { s: 1.5, mood: "flat", look: -8, pose: "hold" }));
mug(S, Bo.hand("R")[0] + 4, Bo.hand("R")[1] + 30, 1.3);
// warm desk lamp + the monitor with the spreadsheet he doesn't need
S.fill(circ(1430, 620, 440), 0, 0, DS.glow("#ffe08a", 0.6), 1);
const B = screenAt(S, 1090, 950, 480, 330);
sheet(S, B);
DS.shape(S, rect(1395, 760, 20, 190), "gray", { tone: 2, w: "mid" });
DS.shape(S, `M1330 770 L1480 770 L1450 690 L1360 690 Z`, "yellow", { w: "mid" });
// huge Dave: side-eye at the door, sweating, typing flat out
const F = who(S, 430, 1780, "near", Object.assign({}, DAVE, { s: 4.2, mood: "determined", look: 9, breathe: false, armL: [[-28, 29], [12, 43]], armR: [[28, 29], [-10, 43]] }));
S.drop(690, 360, 3.0, 0, 0.1); S.drop(175, 430, 2.2, 0, 0.1);
DS.shape(S, `M-100 950 H2020 V1200 H-100 Z`, "wood", { dir: "v" }); // desk top
DS.shape(S, rrect(180, 930, 500, 52, DS.r.sm), "gray", { tone: 1, w: "mid" }); // keyboard
for (let i = 0; i < 8; i++) S.fill(rrect(204 + i * 58, 942, 46, 26, DS.r.xs), 0, 0, DS.c("gray", 2), 1);
// speed lines, smoke and sparks off the keys
[[160, 905, 80, 885], [150, 945, 60, 945], [700, 905, 780, 885], [710, 945, 800, 945]].forEach(([a, b, c, d]) => S.draw(line([a, b], [c, d], 0), 0, 0, { c: DS.c("ink"), w: 8 }));
smoke(S, [[640, 905, 24], [676, 868, 30], [712, 828, 36], [762, 796, 30]]);
S.burst(290, 925, 20, 52, 7, 0, 0, { c: DS.c("orange"), w: 8 }); S.burst(580, 925, 20, 52, 7, 0, 0, { c: DS.c("red"), w: 8 });
S.text("WATCHED?", 960, 215, { size: 220, c: "#FEFE06", halo: "#111111", haloW: 0.09 });
