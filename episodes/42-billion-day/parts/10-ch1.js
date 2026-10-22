
// ---------- timing: one picture per beat, landing just after its first word (the 0.6 s crossfade covers the breath) ----------
const CUES = [[1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [6, 8], [7, 0], [8, 0], [9, 0], [10, 0], [11, 0], [12, 0],
  [13, 0], [14, 0], [15, 0], [15, 12], [16, 0], [17, 0], [18, 0], [19, 0],
  [20, 0], [20, 15], [21, 0], [21, 15], [22, 0], [23, 0], [24, 0], [24, 10], [25, 0], [26, 0], [27, 0],
  [28, 0], [28, 19], [29, 0], [30, 0], [30, 15], [31, 0], [32, 0], [33, 0], [34, 0],
  [35, 0], [36, 0], [37, 0], [37, 12], [38, 0], [39, 0], [40, 0], [40, 9], [41, 0], [41, 11], [42, 0], [43, 0], [43, 9], [44, 0], [44, 11], [45, 0], [46, 0],
  [47, 0], [48, 0], [49, 0], [50, 0], [51, 0], [51, 19], [52, 0],
  [53, 0], [53, 11], [54, 0], [55, 0], [56, 0], [57, 0], [58, 0],
  [59, 0], [60, 0], [61, 0], [61, 7], [62, 0], [63, 0], [63, 9], [64, 0], [65, 0], [66, 0], [66, 6], [67, 0], [68, 0], [69, 0],
  [70, 0], [71, 0], [72, 0], [73, 0], [74, 0], [75, 0], [76, 0], [77, 0], [77, 13], [78, 0], [79, 0], [80, 0], [80, 10], [81, 0], [82, 0], [83, 0], [84, 0], [85, 0]];
const WINS = sceneWindows(CUES, -0.25);
const sc = (c, w, o) => { const k = CUES.findIndex(([a, b]) => a === c && b === w); if (k < 0) throw new Error("no cue " + c + ":" + w); return scene(WINS[k][0], WINS[k][1], o); };
const END = (c) => CLIP(c)[1];
const ROOM = { wall: "wall", floor: "wood", window: false }, STORE = { wall: "white", floor: "gray", window: false }, BANK = { wall: "sand", floor: "gray", window: false }, LAB2 = { wall: "glass", floor: "wood", window: false };

// ---------- the runner's keyframes: HM = day-clock moves [t0, t1, hour0, hour1], MK = money events [t, dur, new value] ----------
const H0 = 1 / 60, EASE = gsap.parseEase("power1.inOut");
const HM = [
  [W(13, 0), W(13, 7), H0, 1.0], [W(15, 12), WE(15, 15), 1.0, 1 + 20 / 60], [W(19, 4), W(19, 13), 1 + 20 / 60, 9.0], [W(27, 0), WE(27, 8), 9.0, 9.5], [W(28, 0), WE(28, 18), 9.5, 10.0],
  [W(29, 0), WE(33, 15), 10.0, 12.0], [W(35, 0), WE(45, 15), 12.0, 14.0], [W(47, 0), WE(50, 9), 14.0, 16.0], [W(53, 0), WE(53, 3), 16.0, 18.5],
  [W(55, 0), WE(55, 13), 18.5, 18 + 41 / 60], [W(66, 0), WE(66, 21), 18 + 41 / 60, 18 + 43 / 60], [W(67, 0), WE(67, 3), 18 + 43 / 60, 18 + 44 / 60], [W(84, 0), W(84, 2), 18 + 44 / 60, 24.0]];
const MK = [[W(15, 20), 0.6, 999999600], [W(28, 11), 0.8, 999900000], [W(67, 3), 2.0, 0]];
const hourAt = (t) => { let h = H0; for (const [ta, tb, h0, h1] of HM) { if (t >= tb) h = h1; else if (t > ta) return h0 + (h1 - h0) * EASE((t - ta) / (tb - ta)); else return h; } return h; };
const moneyAt = (t) => { let v = 1e9; for (const [ts, d, to] of MK) { if (t >= ts + d) v = to; else if (t > ts) { const p = (t - ts) / d; return v + (to - v) * (p * p * (3 - 2 * p)); } else return v; } return v; };

// ---------- scene helpers used by several chapters ----------
// night window: dark glass, moon and a few stars (the room's own window is switched off)
const nightWin = (S, x, y, w, h) => {
  DS.shape(S, rrect(x - 14, y - 14, w + 28, h + 28, DS.r.xs), "white", { flat: true, w: "detail" });
  S.draw(rect(x, y, w, h), S.start, 0, { fill: DS.vgrad(DS.P.navy[1], DS.P.night[0]), c: DS.P.ink[0], w: DS.w.hair });
  S.fill(circ(x + w * 0.7, y + h * 0.28, w * 0.13), S.start, 0, DS.P.paper[1], 1);
  [[0.2, 0.2], [0.35, 0.55], [0.55, 0.12], [0.8, 0.62], [0.15, 0.8]].forEach(([a, b]) => S.fill(circ(x + w * a, y + h * b, 4), S.start, 0, DS.P.white[0], 0.9));
  S.draw(`M${x + w / 2} ${y} V${y + h} M${x} ${y + h / 2} H${x + w}`, S.start, 0, { c: DS.c("white", 0), w: DS.w.near });
};
// the "what would happen" question: money on the left, one day on the right, Dave in the middle. o.done = answer stamp
const question = (S, t0, t1, o = {}) => {
  DS.room(S, ROOM);
  cashPile(S, 470, 900, 0.8, 4, { t0, dt: 0.18 });
  txt(S, "$1 BILLION", 470, 300, { size: DS.type.title, t: t0, c: DS.c("green", 2) });
  dayClock(S, 1450, 520, 200, { h: 12, t: t1 });
  txt(S, "ONE DAY", 1450, 300, { size: DS.type.title, t: t1, c: DS.c("red", 2) });
  const F = dave(S, 960, 960, "near", { look: 0, mood: o.mood || "worried", pose: o.pose || "shrug" });
  if (o.stampT !== undefined) stamp(S, 960, 330, o.stamp, o.stampT, o.name || "red", { size: DS.type.body });
  return F;
};

// paper shopping bag with handles (generic, no print)
const bag = (S, cx, gy, k = 1, name = "red", o = {}) => {
  const g = S.grp(o.parent), w = 110 * k, h = 130 * k;
  DS.shadow(S, cx, gy, w * 1.2, { parent: g });
  S.draw(`M${cx - w * 0.22} ${gy - h} Q${cx} ${gy - h - 44 * k} ${cx + w * 0.22} ${gy - h}`, S.start, 0, { c: DS.line("near"), w: DS.w.mid, parent: g });
  DS.shape(S, rect(cx - w / 2, gy - h, w, h), name, { w: "mid", parent: g });
  DS.shape(S, rect(cx - w / 2, gy - h, w * 0.18, h), name, { tone: 2, flat: true, w: "hair", parent: g });
  return fadeG(S, g, o.t);
};

// ===================== 1. The prize =====================
// This is Dave. At one minute past midnight, Dave won a strange prize: a billion dollars.
{ const S = sc(1, 0, { cam: "push", focus: "900 600" }); DS.room(S, { wall: "wall", floor: "wood", window: false });
  nightWin(S, 470, 170, 300, 340);
  DS.rug(S, 700, 940, 760, "purple");
  const F = dave(S, 700, 960, "near", { s: 1.25, look: 6, mood: "wow", pose: "hold" });
  const [hx, hy] = F.hand("R", "hold");
  mphone(S, hx + 10, hy - 30, 0.34, { screen: "green", tone: 0 });
  card(S, "DAVE", 480, 590, { t: W(1, 2) });
  const pg = panel(S, 1340, 560, 700, 400, W(1, 8)); fadeG(S, pg, W(1, 8));
  txt(S, "YOU WON!", 1340, 470, { size: DS.type.title, t: W(1, 8), c: DS.c("red", 2) });
  countUp(S, 1340, 590, 0, 1e9, W(1, 13), WE(1, 15) - W(1, 13), { size: DS.type.small, fmt: mon, c: DS.c("green", 2), ease: "power2.out" });
  txt(S, "PRIZE", 1340, 660, { t: W(1, 11) });
  fin(S); }

// The rule is simple. Spend it all by the next midnight, or whatever's left vanishes.
{ const S = sc(2, 0, { cam: "push", focus: "960 540" }); DS.room(S, ROOM);
  const sweep = (t) => (t <= W(2, 3) ? H0 : t >= WE(2, 10) ? 24 : H0 + (24 - H0) * EASE((t - W(2, 3)) / (WE(2, 10) - W(2, 3))));
  dayClock(S, 560, 530, 250, { fn: sweep, labels: true });
  card(S, "SPEND IT ALL", 560, 112, { t: W(2, 4) });
  const pg = S.grp();
  cashPile(S, 1330, 900, 0.9, 5, { parent: pg });
  card(S, "WHATEVER'S LEFT", 1330, 270, { t: W(2, 12) });
  tl.to(pg, { opacity: 0, duration: 1.4, ease: "power1.inOut" }, W(2, 13) + 0.1);
  { const gh = S.grp(); dash(S.draw(`M${1330 - 340} ${900} H${1330 + 340} V${900 - 262} H${1330 - 340} Z`, S.start, 0, { c: DS.c("gray", 2), w: DS.w.mid, parent: gh }), 14, 14); fadeG(S, gh, W(2, 14) + 0.4, 0.8); }
  const F = dave(S, 1710, 960, "near", { s: 0.95, look: -6, mood: "worried" });
  fin(S, { no: true }); }

// Breaking news. A local man has won a very large prize with a very short deadline.
{ const S = sc(3, 0, { cam: "push", focus: "960 500" }); DS.room(S, ROOM);
  // the TV on a stand, anchor inside it
  DS.shape(S, rrect(260, 600, 1400, 90, DS.r.sm), "wood", { tone: 1, w: "mid" });
  DS.drop(S, rrect(486, 130, 960, 560, DS.r.md));
  DS.shape(S, rrect(470, 114, 960, 560, DS.r.md), "ink", { tone: 1, w: "mid" });
  S.draw(rect(502, 146, 896, 496), S.start, 0, { fill: DS.vgrad(DS.c("sky", 1), DS.c("sky", 0)), c: DS.P.ink[0], w: DS.w.hair });
  const A = who(S, 950, 640, "near", Object.assign({}, ANCHOR, { s: 1.25, mood: "flat" }));
  talk(S, A, W(3, 0), END(3));
  DS.shape(S, rect(560, 500, 780, 72), "wood", { tone: 0, w: "detail" });
  ticker(S, 502, 570, 896, "BREAKING NEWS", { t: W(3, 0) });
  card(S, "NEWS ANCHOR", 950, 735, { t: W(3, 0), size: DS.type.caption });
  const D = dave(S, 1560, 960, "near", { look: -8, mood: "wow" });
  fin(S); }

// How hard can it be? I love spending money.
{ const S = sc(4, 0, { cam: "push", focus: "800 560" }); DS.outdoor(S, DAY); street(S, DAY, { zebra: 1500 });
  bag(S, 330, 950, 1.5, "red"); bag(S, 1060, 950, 1.3, "purple"); bag(S, 1150, 960, 1.1, "orange");
  const F = dave(S, 700, 960, "near", { s: 1.45, look: 4, mood: "happy", pose: "hips" }); talk(S, F, W(4, 0), END(4));
  say(S, 1320, 300, 400, 130, 800, 620, ["“HOW HARD CAN IT BE?”"], W(4, 0), { size: DS.type.small });
  say(S, 1380, 540, 440, 120, 880, 660, ["“I LOVE SPENDING MONEY”"], W(4, 5), { size: DS.type.small });
  fin(S, { noClock: true }); }

// So what would happen if you had to spend a billion dollars in a day?
{ const S = sc(5, 0, { cam: "pull", focus: "960 540" });
  question(S, W(5, 10), W(5, 14));
  fin(S, { no: true }); }

// Twenty minutes in, he's fourteen million dollars behind.
{ const S = sc(6, 0, { cam: "push", focus: "900 600" }); DS.room(S, STORE);
  shelves(S, 420, 180, 1080, 480); striplight(S, 960, 100, 700);
  const F = dave(S, 760, 960, "near", { look: 6, mood: "worried", pose: "push" });
  trolley(S, 1060, 960, 1.15);
  const sw = stopwatch(S, 340, 560, 130, { go: W(6, 0), dur: 3.0, deg: 120 }); fadeG(S, sw, W(6, 0));
  card(S, "20 MIN", 340, 760, { t: W(6, 0), size: DS.type.caption });
  { const pg = panel(S, 1480, 520, 560, 220, W(6, 3)); fadeG(S, pg, W(6, 3)); }
  countUp(S, 1480, 500, 0, 14e6, W(6, 3), WE(6, 6) - W(6, 3), { size: DS.type.title, fmt: (n) => "-" + mon(n), c: DS.c("red", 2), ease: "power1.out" });
  txt(S, "BEHIND", 1480, 590, { size: DS.type.small, t: W(6, 7), c: DS.c("red", 2) });
  fin(S, { noClock: true }); }

// By lunch, he's looking at a hundred thousand government forms.
{ const S = sc(6, 8, { cam: "pull", focus: "1100 600" }); DS.room(S, ROOM);
  stack(S, 1000, 940, 340, 24, "white", { h: 22, t0: W(6, 13), dt: 0.07 }); stack(S, 1400, 940, 340, 30, "white", { h: 22, t0: W(6, 13) + 0.2, dt: 0.07 }); stack(S, 1740, 940, 300, 17, "white", { h: 22, t0: W(6, 14), dt: 0.07 });
  const F = dave(S, 330, 960, "near", { s: 1.0, look: 8, mood: "worried" });
  countUp(S, 960, 260, 0, 100000, W(6, 13), WE(6, 17) - W(6, 13), { size: DS.type.display, fmt: (n) => Math.round(n).toLocaleString("en-US"), c: DS.c("red", 2), ease: "power1.out" });
  txt(S, "FORMS", 960, 340, { size: DS.type.title, t: W(6, 16) });
  fin(S, { noClock: true }); }

// And by the evening, he's racing a deadline that isn't midnight.
{ const S = sc(7, 0, { cam: "push", focus: "1000 560" }); DS.outdoor(S, DAWN); street(S, DAWN, { zebra: 1500 });
  const tw = 1380; DS.shape(S, rect(tw - 110, 260, 220, 360), "wall", { layer: "far", tone: 2, dir: "h", w: "far" }); DS.shape(S, `M${tw - 130} 262 L${tw} 150 L${tw + 130} 262 Z`, "red", { layer: "far", tone: 2, w: "far" });
  DS.shape(S, circ(tw, 400, 86), "white", { w: "mid" }); txt(S, "?", tw, 432, { size: DS.type.display, t: W(7, 8), c: DS.c("red", 2) });
  const F = dave(S, 300, 960, "near", { look: 8, mood: "determined", pose: "reach" }); F.walk(W(7, 4), WE(7, 10) - W(7, 4), { x: 700 });
  card(S, "NOT MIDNIGHT", 960, 190, { t: W(7, 8) });
  fin(S, { noClock: true }); }

// First, the maths. A day has eighty-six thousand four hundred seconds,
{ const S = sc(8, 0, { cam: "push", focus: "900 540" }); DS.room(S, ROOM);
  const sweep = (t) => (t <= W(8, 3) ? H0 : t >= WE(8, 10) ? 24 : H0 + (24 - H0) * ((t - W(8, 3)) / (WE(8, 10) - W(8, 3))));
  dayClock(S, 520, 500, 230, { fn: sweep, labels: true });
  card(S, "ONE DAY", 520, 140, { t: W(8, 4) });
  countUp(S, 1360, 520, 0, 86400, W(8, 3), WE(8, 10) - W(8, 3), { size: DS.type.display, ease: "none", c: DS.c("red", 2) });
  txt(S, "SECONDS", 1360, 620, { size: DS.type.title, t: W(8, 5) });
  const F = dave(S, 1700, 960, "near", { s: 0.9, look: -6, mood: "flat" });
  fin(S, { no: true }); }

// so Dave has to spend about eleven thousand five hundred dollars every second, including the seconds he spends deciding.
{ const S = sc(9, 0, { cam: "push", focus: "900 540" }); DS.room(S, ROOM);
  const F = dave(S, 460, 960, "near", { look: 6, mood: "worried", pose: "hold" });
  const sw = stopwatch(S, 1010, 560, 190, { go: W(9, 11), dur: 6.0, deg: 1080 }); fadeG(S, sw, W(9, 10));
  txt(S, "$11,574", 1560, 520, { size: DS.type.display, t: W(9, 4), c: DS.c("green", 2) });
  txt(S, "EVERY SECOND", 1560, 620, { size: DS.type.small, t: W(9, 10) });
  say(S, 520, 330, 170, 100, 470, 620, ["?"], W(9, 14), { think: true, size: DS.type.title });
  fin(S); }

// If he stops to sleep for eight hours, it's more like seventeen thousand dollars a second. So sleep is cancelled.
{ const S = sc(10, 0, { cam: "push", focus: "800 600" }); DS.room(S, { wall: "wall", floor: "wood", window: false });
  DS.rug(S, 700, 960, 900, "purple");
  const bx = 280; DS.shadow(S, bx + 480, 930, 1000);
  DS.shape(S, rect(bx, 600, 40, 330), "wood", { w: "mid" }); DS.shape(S, rrect(bx + 40, 740, 880, 60, DS.r.sm), "wood", { tone: 1, w: "mid" }); DS.shape(S, rrect(bx + 40, 700, 880, 56, DS.r.md), "white", { w: "mid" });
  const F = who(S, bx + 330, 692 + 4, "near", Object.assign({}, DAVE, { s: 1.0, sit: true, legL: [[78, 2], [150, 6]], legR: [[90, 8], [166, 12]], mood: "sleep" }));
  DS.shape(S, rrect(bx + 380, 620, 540, 150, DS.r.lg), "blue", { w: "mid" });
  DS.shape(S, rrect(bx + 70, 664, 130, 56, DS.r.md), "white", { tone: 2, w: "detail" });
  S.draw(rect(bx + 420, 636, 40, 0), S.start, 0, { c: DS.P.ink[0], w: DS.w.hair });
  txt(S, "Z z z", bx + 440, 470, { size: DS.type.title, t: W(10, 1), c: DS.c("blue", 2) });
  const cl = dayClock(S, 1520, 700, 120, { h: 8, t: W(10, 5) });
  txt(S, "8 HOURS", 1520, 880, { size: DS.type.small, t: W(10, 5) });
  txt(S, "$17,361", 1520, 330, { size: DS.type.display, t: W(10, 10), c: DS.c("red", 2) }); txt(S, "A SECOND", 1520, 420, { size: DS.type.small, t: W(10, 13), c: DS.c("red", 2) });
  xMark(S, 700, 770, 3.0, W(10, 17));
  stamp(S, 700, 260, "SLEEP CANCELLED", W(10, 18), "red", { size: DS.type.body });
  fin(S); }

// And a billion is bigger than it sounds. A million seconds is about eleven and a half days.
{ const S = sc(11, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM);
  const Cg = calGrid(S, 560, 340, 4, 3, 200, 140, { t: W(11, 8) });
  const cells = Cg.C; cells.slice(0, 11).forEach(([cx, cy], i) => S.fill(rect(cx - 98, cy - 68, 196, 136), W(11, 13) + i * 0.16, 0, DS.c("yellow", 1), 0.95)); S.fill(rect(cells[11][0] - 98, cells[11][1] - 68, 98, 136), W(11, 15), 0, DS.c("yellow", 1), 0.95);
  card(S, "1,000,000 SECONDS", 960, 180, { t: W(11, 8) });
  txt(S, "11.5 DAYS", 960, 850, { size: DS.type.title, t: W(11, 13), c: DS.c("red", 2) });
  const F = dave(S, 1700, 960, "near", { s: 0.9, look: -6, mood: "flat" });
  fin(S); }

// A billion seconds is about thirty-one years.
{ const S = sc(12, 0, { cam: "push", focus: "960 600" }); DS.outdoor(S, DAY);
  const X = [380, 760, 1140, 1520], HC = [DS.c("brown"), DS.c("brown", 1), DS.c("gray", 0), DS.c("gray", 1)];
  X.forEach((x, i) => { const F = dave(S, x, 940, "near", { s: 1.0, hairC: HC[i], mood: i < 2 ? "smile" : "tired", look: i % 2 ? 4 : -4, t: W(12, i) }); if (i === 3) { S.draw(`M${x + 70} 700 Q${x + 70} 668 ${x + 98} 674 M${x + 70} 700 V940`, W(12, 3), 0, { c: DS.c("wood", 2), w: DS.w.near }); } });
  arrowR(S, 300, 380, 1640, 380, W(12, 0));
  card(S, "1,000,000,000 SECONDS", 760, 280, { t: W(12, 0), size: DS.type.caption });
  txt(S, "31 YEARS", 1500, 300, { size: DS.type.title, t: W(12, 5), c: DS.c("red", 2) });
  fin(S); }
