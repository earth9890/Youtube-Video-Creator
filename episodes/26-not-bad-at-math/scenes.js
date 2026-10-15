// look: still
// You Are Not Bad at Math (1-min, 70 s). Mystery: Dave never misses at darts, but the bill blanks him. What's stealing his math? Illustrated stills, progressive changes on the spoken word.
const dave = (S, x, gy, layer = "near", o = {}) => DS.figure(S, x, gy, layer, Object.assign({ s: 1.1, hair: "side", hairC: DS.c("brown"), outfitC: DS.c("blue") }, o));
// dartboard: black number ring, red/green double ring, cream beds, segment lines, bull
const dartboard = (S, cx, cy, r, t) => {
  DS.drop(S, circ(cx + 8, cy + 10, r), { t });
  DS.shape(S, circ(cx, cy, r), "ink", { t, w: "mid", flat: true });
  DS.shape(S, circ(cx, cy, r * 0.8), "red", { t, w: "hair", flat: true });
  DS.shape(S, circ(cx, cy, r * 0.72), "paper", { t, w: "hair", flat: true });
  DS.shape(S, circ(cx, cy, r * 0.5), "green", { t, w: "hair", flat: true });
  DS.shape(S, circ(cx, cy, r * 0.43), "paper", { t, w: "hair", flat: true });
  for (let i = 0; i < 20; i++) { const a = (i * Math.PI) / 10; S.draw(line([cx + Math.cos(a) * r * 0.12, cy + Math.sin(a) * r * 0.12], [cx + Math.cos(a) * r * 0.8, cy + Math.sin(a) * r * 0.8], 0), t ?? S.start, 0, { c: DS.c("ink"), w: DS.w.hair }); }
  DS.shape(S, circ(cx, cy, r * 0.12), "green", { t, w: "hair", flat: true });
  DS.shape(S, circ(cx, cy, r * 0.05), "red", { t, w: "hair", flat: true });
};
const dart = (S, x, y, t) => { S.draw(line([x, y], [x + 70, y + 26], 0), t, 0, { c: DS.c("gray", 2), w: DS.w.mid }); DS.shape(S, poly([[x + 64, y + 24], [x + 100, y + 2], [x + 92, y + 34], [x + 100, y + 58]], 0), "red", { t, w: "detail", flat: true }); };
// chalk scoreboard: wood frame, navy slate, white chalk rows (each row fades in at its own time)
const slate = (S, x, y, w, h, rows, t) => {
  DS.drop(S, rect(x + 8, y + 10, w, h), { t });
  DS.shape(S, rrect(x, y, w, h, DS.r.xs), "wood", { t, w: "mid" });
  DS.shape(S, rect(x + 18, y + 18, w - 36, h - 36), "navy", { t, w: "hair", flat: true });
  rows.forEach(([str, rt, size], i) => S.text(str, x + w / 2, y + 90 + i * 76, { size: size || DS.type.body, t: rt ?? t ?? S.start, c: DS.P.white[0] }));
};
// high pub table (legs hidden by the people behind it)
const ptable = (S, x, gy, w) => { DS.shadow(S, x + w / 2, gy, w); [x + 40, x + w - 60].forEach((lx) => DS.shape(S, rect(lx, gy - 170, 22, 170), "wood", { w: "mid" })); DS.shape(S, rrect(x, gy - 200, w, 36, DS.r.xs), "wood"); return gy - 200; };
// receipt with a zig-zag bottom
const receipt = (S, x, y, w, h, rows, t) => {
  const zz = Array.from({ length: 9 }, (_, i) => [x + w - (i * w) / 8, y + h + (i % 2 ? 16 : 0)]);
  const d = poly([[x, y], [x + w, y], ...zz, [x, y + h]], 0);
  DS.drop(S, rect(x + 8, y + 10, w, h), { t }); DS.shape(S, d, "white", { t, w: "detail", flat: true });
  rows.forEach(([str, rt, c, size], i) => S.text(str, x + w / 2, y + 80 + i * 80, { size: size || DS.type.small, t: rt ?? t ?? S.start, c: DS.c(c || "ink", c ? 2 : 0) }));
};
// note pad: spiral top, ruled lines, header; drawn into group g (so it can shrink)
const pad = (S, cx, cy, w, h, head, o = {}) => {
  const g = S.grp(), t = o.t ?? S.start, x = cx - w / 2, y = cy - h / 2;
  DS.drop(S, rect(x + 8, y + 10, w, h), { t, parent: g });
  DS.shape(S, rect(x, y, w, h), o.color || "yellow", { t, w: "detail", tone: 1, flat: true, parent: g });
  for (let i = 1; i <= 4; i++) S.draw(line([x + 30, y + 70 + i * (h - 100) / 5], [x + w - 30, y + 70 + i * (h - 100) / 5], 0), t, 0, { c: DS.c("blue", 1), w: DS.w.hair, parent: g });
  for (let i = 0; i < 6; i++) S.draw(circ(x + 40 + i * (w - 80) / 5, y, 12), t, 0, { c: DS.c("gray", 2), w: DS.w.detail, parent: g });
  S.text(head, cx, y + 70, { size: DS.type.small, t, c: DS.c("ink"), parent: g });
  (o.rows || []).forEach(([str, rt], i) => S.text(str, cx, y + 70 + (i + 1.4) * (h - 100) / 5, { size: DS.type.small, t: rt ?? t, c: DS.c("ink"), parent: g }));
  return g;
};
// the thief: a dark storm cloud wearing a burglar's eye mask
const thief = (S, cx, cy, k, t, lit = false) => {
  const g = S.grp(), c = lit ? "gray" : "navy";
  [[-90, 14, 66], [0, -24, 90], [92, 8, 68], [40, 38, 66], [-40, 38, 64]].forEach(([dx, dy, r]) => S.fill(circ(cx + dx * k, cy + dy * k, r * k), t, 0.35, DS.c(c, 2), 1, g));
  S.fill(circ(cx - 24 * k, cy - 46 * k, 48 * k), t, 0.35, DS.c(c, 0), 0.8, g);
  DS.shape(S, rrect(cx - 110 * k, cy - 22 * k, 220 * k, 52 * k, DS.r.md), "ink", { t, w: "detail", flat: true, parent: g });
  [-46, 46].forEach((dx) => { S.fill(circ(cx + dx * k, cy + 4 * k, 17 * k), t, 0.35, DS.P.white[0], 1, g); S.fill(circ(cx + dx * k + 5 * k, cy + 6 * k, 8 * k), t, 0.35, DS.P.ink[0], 1, g); });
  return g;
};
// lab monitor showing a head with a brain; glow = pain areas lighting up
const monitor = (S, cx, cy, w, h, t) => {
  DS.drop(S, rrect(cx - w / 2 + 8, cy - h / 2 + 10, w, h, DS.r.sm), { t });
  DS.shape(S, rrect(cx - w / 2, cy - h / 2, w, h, DS.r.sm), "gray", { t, w: "mid" });
  DS.shape(S, rect(cx - w / 2 + 24, cy - h / 2 + 24, w - 48, h - 48), "navy", { t, w: "hair", flat: true });
  DS.shape(S, rect(cx - 30, cy + h / 2, 60, 60), "gray", { t, w: "detail" }); DS.shape(S, rrect(cx - 120, cy + h / 2 + 56, 240, 24, DS.r.xs), "gray", { t, w: "detail" });
  DS.shape(S, circ(cx, cy, h * 0.33, h * 0.36), "white", { t, w: "mid", flat: true }); S.brain(cx + 4, cy - 6, h * 0.0019, t ?? S.start, 0);
};
const glow = (S, cx, cy, h, t) => { S.fill(circ(cx, cy - h * 0.02, h * 0.26, h * 0.2), t, 0.4, DS.c("red", 1), 0.35); S.fill(circ(cx - h * 0.07, cy, h * 0.07, h * 0.05), t, 0.4, DS.c("red"), 0.85); S.fill(circ(cx + h * 0.08, cy - h * 0.04, h * 0.06, h * 0.045), t, 0.4, DS.c("red"), 0.85); };
const paper = (S, x, y, w, h, o = {}) => { DS.drop(S, rect(x + 6, y + 8, w, h), { t: o.t }); DS.shape(S, rect(x, y, w, h), "white", { t: o.t, w: "detail", flat: true }); };
const scribble = (S, x, y, w, n, t) => { for (let i = 0; i < n; i++) S.draw(smooth([[x, y + i * 44], [x + w * 0.3, y + i * 44 - 8], [x + w * 0.6, y + i * 44 + 6], [x + w * (i === n - 1 ? 0.7 : 1), y + i * 44 - 4]]), t + i * 0.12, 0, { c: DS.c("ink"), w: DS.w.detail }); };

const CUES = [[1, 0], [4, 0], [8, 0], [12, 0], [13, 0], [17, 0], [19, 0], [21, 0], [24, 0], [28, 0], [32, 0], [34, 0], [37, 0], [39, 0], [43, 0], [45, 0]];
const WIN = sceneWindows(CUES, 0.15);
const sc = (k, o) => scene(WIN[k][0], WIN[k][1], o);

// 0  This is Dave. / At darts, he counts down from five oh one in his head. / Never wrong.
{ const S = sc(0, { cam: "push", focus: "960 560" }); DS.room(S, { wall: "dusk", floor: "wood", window: false });
  DS.frame(S, 820, 170, 150, 110, "grass");
  slate(S, 400, 150, 330, 400, [["501", S.start, DS.type.title], ["- 60 = 441", W(2, 3), DS.type.small], ["- 85 = 356", W(2, 7), DS.type.small], ["- 100 = 256", W(2, 10), DS.type.small]]);
  dartboard(S, 1380, 400, 170);
  dave(S, 900, 960, "near", { mood: "determined", look: 6, pose: "point" });
  dart(S, 1300, 360, W(2, 1)); dart(S, 1400, 430, W(2, 6));
  DS.card(S, "DAVE", 900, 520, { size: DS.type.body, t: W(1, 2) });
  S.tick(790, 330, 1.4, W(3, 0), 0.15, { c: DS.c("green"), w: DS.w.near });
  DS.card(S, "NEVER WRONG", 1380, 680, { size: DS.type.small, t: W(3, 0), tc: "green" });
  DS.plant(S, 110, 1120, 1.0, 1); DS.vignette(S); }

// 1  Then, the bill. / Ninety dollars, three friends. / Dave's brain: / blank.
{ const S = sc(1, { cam: "zoom", focus: "700 560" }); DS.room(S, { wall: "dusk", floor: "wood", window: false });
  const F = dave(S, 470, 960, "near", { s: 1.25, mood: "smile", look: 6 });
  DS.figure(S, 790, 960, "near", { s: 1.2, hair: "curly", hairC: DS.c("ink"), outfitC: DS.c("orange"), mood: "smile", look: -6 });
  DS.figure(S, 1060, 960, "near", { s: 1.2, hair: "bun", hairC: DS.c("brown", 1), outfitC: DS.c("purple"), mood: "smile", look: -6 });
  ptable(S, 330, 960, 900);
  receipt(S, 1380, 150, 360, 470, [["THE BILL", W(4, 2)], ["FOOD    62", W(4, 2), null, DS.type.caption], ["DRINKS  28", W(4, 2), null, DS.type.caption], ["TOTAL $90", W(5, 0)], ["÷ 3 = ?", W(5, 2), "red"]], W(4, 2));
  F.face(W(6, 1), "flat", 0);
  S.thought(470, 270, 190, 120, 470, 520, W(7, 0), 0.25);
  DS.vignette(S); }

// 2  "I'm not a math person." / But darts is math. / Is Dave bad at math, / or is something stealing it?
{ const S = sc(2, { cam: "push" }); DS.room(S, { wall: "dusk", floor: "wood", window: false });
  const F = dave(S, 560, 960, "near", { mood: "sad", look: 4 });
  S.speech(560, 300, 330, 100, 600, 560, W(8, 0), 0.25); S.text("NOT A MATH PERSON", 560, 318, { size: DS.type.small, t: W(8, 0), c: DS.c("ink") });
  dartboard(S, 1340, 450, 160, W(9, 1)); dart(S, 1300, 420, W(9, 1));
  DS.card(S, "DARTS = MATH", 1340, 700, { size: DS.type.small, t: W(9, 3), tc: "green" });
  F.face(W(10, 1), "worried", 6);
  DS.card(S, "SO WHO'S STEALING IT?", 1240, 170, { size: DS.type.small, t: W(11, 2), tc: "red" }); DS.vignette(S); }

// 3  In 2001, Mark Ashcraft measured the mental scratchpad of math dreaders.
{ const S = sc(3, { cam: "pull" }); DS.room(S, { wall: "glass", floor: "gray", window: false });
  DS.figure(S, 520, 960, "near", { s: 1.1, hair: "short", hairC: DS.c("gray", 2), outfitC: DS.c("navy"), mood: "determined", look: 6, pose: "point" });
  DS.card(S, "2001 · MARK ASHCRAFT", 960, 150, { size: DS.type.small, t: W(12, 4) });
  S.thought(1250, 520, 330, 260, 760, 700, W(12, 8), 0.25);
  pad(S, 1250, 530, 380, 330, "SCRATCHPAD", { t: W(12, 9), rows: [["27 + 14", W(12, 9)]] });
  DS.card(S, "WORKING MEMORY", 1250, 880, { size: DS.type.caption, t: W(12, 9) }); DS.vignette(S); }

// 4  With words: / normal. / With sums: / it shrank.
{ const S = sc(4); DS.room(S, { wall: "glass", floor: "gray", window: false });
  pad(S, 620, 520, 420, 420, "WORDS", { rows: [["CAT  SUN", S.start], ["MOON  DOG", S.start]] });
  const P = pad(S, 1300, 520, 420, 420, "SUMS", { t: W(15, 0), rows: [["27 + 14", W(15, 0)], ["48 - 19", W(15, 0)]] });
  DS.card(S, "NORMAL", 620, 840, { size: DS.type.body, t: W(14, 0), tc: "green" });
  S.move(P, W(16, 0), 0.45, { scale: 0.6, svgOrigin: "1300 720" }, "power2.out");
  DS.card(S, "SHRANK", 1300, 840, { size: DS.type.body, t: W(16, 0), tc: "red" }); DS.vignette(S); }

// 5  Something sits on it, / only when it smells math.
{ const S = sc(5, { cam: "push", focus: "1300 520" }); DS.room(S, { wall: "glass", floor: "gray", window: false });
  pad(S, 620, 520, 420, 420, "WORDS", { rows: [["CAT  SUN"], ["MOON  DOG"]] });
  const P = pad(S, 1300, 600, 420, 420, "SUMS", { rows: [["27 + 14"], ["48 - 19"]] }); P.setAttribute("transform", "matrix(0.6 0 0 0.6 520 288)");
  thief(S, 1300, 440, 1.1, W(17, 1));
  ["+", "×", "÷"].forEach((s, i) => S.text(s, 1080 + i * 200, 230 - (i % 2) * 40, { size: DS.type.title, t: W(18, 3) + i * 0.1, c: DS.c("red") }));
  DS.card(S, "ONLY FOR MATH", 960, 860, { size: DS.type.small, t: W(18, 3), tc: "red" }); DS.vignette(S, 0.18); }

// 6  "So math hurts my brain?" / Kind of.
{ const S = sc(6, { cam: "zoom", focus: "760 520" }); DS.room(S, { wall: "night", floor: "wood", window: false });
  dave(S, 760, 960, "near", { s: 1.3, mood: "worried", look: 4, pose: "head" });
  S.speech(1300, 300, 380, 110, 980, 470, W(19, 0), 0.25); S.text("MATH HURTS MY BRAIN?", 1300, 318, { size: DS.type.small, t: W(19, 0), c: DS.c("ink") });
  DS.card(S, "KIND OF.", 1300, 620, { size: DS.type.title, t: W(20, 0), tc: "red" }); DS.vignette(S, 0.18); }

// 7  In 2012, Ian Lyons scanned them. / As a sum approached, / pain areas lit up.
{ const S = sc(7, { cam: "push", focus: "860 520" }); DS.room(S, { wall: "glass", floor: "gray", window: false });
  DS.card(S, "2012 · IAN LYONS", 960, 140, { size: DS.type.small, t: W(21, 3) });
  monitor(S, 860, 500, 700, 460, S.start);
  const N = DS.card(S, "7 + 8", 1760, 500, { size: DS.type.title, t: W(22, 1), tc: "red" });
  S.move(N.g, W(22, 2), 1.0, { x: -170 }, "power1.out");
  glow(S, 866, 486, 460, W(23, 0));
  DS.card(S, "PAIN AREAS", 860, 860, { size: DS.type.small, t: W(23, 1), tc: "red" }); DS.vignette(S); }

// 8  During the math? / Gone. / It hurt to wait, / not to add.
{ const S = sc(8); DS.room(S, { wall: "glass", floor: "gray", window: false });
  monitor(S, 560, 470, 600, 400); glow(S, 566, 458, 400, S.start);
  S.text("WAITING", 560, 820, { size: DS.type.small, c: DS.c("ink") });
  monitor(S, 1360, 470, 600, 400, W(24, 0));
  S.text("DOING MATH", 1360, 820, { size: DS.type.small, t: W(24, 0), c: DS.c("ink") });
  DS.card(S, "GONE", 1360, 140, { size: DS.type.body, t: W(25, 0), tc: "green" });
  DS.card(S, "IT HURT TO WAIT", 560, 140, { size: DS.type.small, t: W(26, 0), tc: "red" }); }

// 9  The thief comes early: / worry. / "So I stop worrying?" / No.
{ const S = sc(9, { cam: "push", focus: "1240 500" }); DS.room(S, { wall: "glass", floor: "gray", window: false });
  const P = pad(S, 1240, 640, 420, 420, "SUMS", { rows: [["27 + 14"], ["48 - 19"]] }); P.setAttribute("transform", "matrix(0.6 0 0 0.6 496 304)");
  thief(S, 1240, 420, 1.25, S.start, true);
  DS.card(S, "WORRY", 1240, 170, { size: DS.type.title, t: W(29, 0), tc: "red" });
  const F = dave(S, 460, 960, "near", { s: 1.0, mood: "worried", look: 6, t: W(30, 0) });
  S.speech(460, 330, 260, 90, 470, 560, W(30, 0), 0.25); S.text("STOP WORRYING?", 460, 348, { size: DS.type.small, t: W(30, 0), c: DS.c("ink") });
  DS.card(S, "NO.", 820, 520, { size: DS.type.title, t: W(31, 0), tc: "red" });
  F.face(W(31, 0), "sad", 6); DS.vignette(S); }

// 10  In 2011, Gerardo Ramirez tested a fix before a ninth grade final. / Anxious students who wrote their worries down for ten minutes
{ const S = sc(10, { cam: "pull" }); DS.room(S, { wall: "green", floor: "wood", window: [1420, 170, 220, 220] });
  slate(S, 600, 190, 560, 230, [["FINAL EXAM", S.start, DS.type.title]]);
  DS.card(S, "2011 · GERARDO RAMIREZ", 880, 110, { size: DS.type.small, t: W(32, 3) });
  DS.figure(S, 1260, 830, "mid", { s: 1.0, hair: "curly", hairC: DS.c("ink"), outfitC: DS.c("orange"), mood: "flat", look: -4 });
  DS.figure(S, 560, 960, "near", { s: 1.0, hair: "bun", hairC: DS.c("brown"), outfitC: DS.c("purple"), mood: "worried", look: 6, pose: "hold" });
  const top = ptable(S, 620, 960, 560);
  paper(S, 650, top - 150, 260, 150, { t: W(33, 3) });
  S.text("MY WORRIES", 780, top - 110, { size: DS.type.caption, t: W(33, 3), c: DS.c("ink") });
  scribble(S, 680, top - 70, 190, 2, W(33, 5));
  S.timer(1600, 560, 120, W(33, 3), 0.3, { label: "10:00", fillAt: W(33, 8), fillDur: 1.2, c: DS.c("green") }); DS.vignette(S); }

// 11  averaged B plus. / Anxious non-writers: / B minus.
{ const S = sc(11, { cam: "push" }); DS.room(S, { wall: "green", floor: "wood", window: false });
  DS.card(S, "ANXIOUS STUDENTS", 960, 140, { size: DS.type.small });
  paper(S, 400, 300, 420, 520); S.text("FINAL", 610, 380, { size: DS.type.small, c: DS.c("ink") }); scribble(S, 450, 440, 320, 3, S.start);
  S.text("B+", 610, 760, { size: DS.type.display, t: W(34, 1), c: DS.c("green", 2) });
  DS.card(S, "WROTE FIRST", 610, 880, { size: DS.type.small, tc: "green" });
  paper(S, 1100, 300, 420, 520, { t: W(35, 0) }); S.text("FINAL", 1310, 380, { size: DS.type.small, t: W(35, 0), c: DS.c("ink") }); scribble(S, 1150, 440, 320, 3, W(35, 0));
  S.text("B-", 1310, 760, { size: DS.type.display, t: W(36, 0), c: DS.c("red", 2) });
  DS.card(S, "DIDN'T WRITE", 1310, 880, { size: DS.type.small, t: W(35, 1), tc: "red" }); }

// 12  Dave isn't bad at math. / At darts, nobody told him it was math.
{ const S = sc(12, { cam: "pull" }); DS.room(S, { wall: "dusk", floor: "wood", window: false });
  slate(S, 380, 150, 330, 400, [["501", S.start, DS.type.title], ["- 60 = 441", S.start, DS.type.small], ["- 85 = 356", S.start, DS.type.small], ["- 100 = 256", S.start, DS.type.small]]);
  dartboard(S, 1400, 400, 170); dart(S, 1330, 380, S.start); dart(S, 1420, 330, S.start);
  dave(S, 920, 960, "near", { mood: "happy", look: 6, pose: "point" });
  DS.card(S, "NOT BAD AT MATH", 1080, 140, { size: DS.type.body, t: W(37, 1), tc: "green" });
  DS.card(S, "THIS IS MATH", 545, 610, { size: DS.type.small, t: W(38, 5), tc: "red" });
  DS.plant(S, 1810, 1120, 1.0, -1); DS.vignette(S); }

// 13  Next bill, Dave writes his worries first. / All ten minutes. / The waiter waits. / Thirty each.
{ const S = sc(13, { cam: "push", focus: "800 560" }); DS.room(S, { wall: "dusk", floor: "wood", window: false });
  const F = dave(S, 520, 960, "near", { mood: "determined", look: 6, pose: "hold" });
  const W8 = DS.figure(S, 1420, 960, "near", { s: 1.15, hair: "short", hairC: DS.c("ink"), outfit: "apron", outfitC: DS.c("white", 2), mood: "smile", look: -6, t: W(39, 0) });
  const top = ptable(S, 380, 960, 760);
  paper(S, 620, top - 150, 260, 150, { t: W(39, 3) });
  S.text("WORRIES", 750, top - 110, { size: DS.type.caption, t: W(39, 3), c: DS.c("ink") });
  scribble(S, 650, top - 70, 190, 2, W(39, 5));
  S.clock(1420, 260, 90, W(40, 1), 0.2, { h: 8, m: 10 });
  W8.face(W(41, 1), "flat", -6);
  DS.card(S, "$90 ÷ 3 = $30", 960, 140, { size: DS.type.title, t: W(42, 0), tc: "green" });
  F.face(W(42, 0), "happy", 6); DS.vignette(S); }

// 14  Next test, ten minutes: / write every worry down.
{ const S = sc(14, { cam: "zoom", focus: "960 600" }); DS.room(S, { wall: "night", floor: "wood", window: [1460, 200, 220, 220] });
  const top = ptable(S, 460, 960, 1000);
  S.fill(circ(960, top - 200, 420, 260), S.start, 0, DS.c("gold", 1), 0.25);
  paper(S, 760, top - 330, 400, 310);
  S.text("MY WORRIES", 960, top - 270, { size: DS.type.small, c: DS.c("ink") });
  scribble(S, 800, top - 200, 320, 4, W(44, 0));
  S.pencil(1160, top - 90, 200, -30, W(44, 0), 0);
  S.timer(1500, top - 160, 110, S.start, 0, { label: "10:00", fillAt: W(43, 2), fillDur: 2.0, c: DS.c("green") });
  DS.card(S, "BEFORE THE TEST", 960, 160, { size: DS.type.body, t: W(43, 0) }); DS.vignette(S); }

// 15  You are not bad at math. / Your brain was never blank. / It was full.
{ const S = sc(15, { cam: "pull" }); DS.room(S, { wall: "dusk", floor: "wood", window: false });
  const F = dave(S, 760, 960, "near", { s: 1.25, mood: "smile", look: 6 });
  S.thought(1300, 470, 330, 230, 900, 600, S.start, 0);
  const bl = S.grp(); S.text("BLANK?", 1300, 500, { size: DS.type.body, t: W(46, 4), c: DS.c("gray", 2), parent: bl }); S.fadeOut(bl, W(47, 1), 0.3);
  const full = S.grp();
  [["27 + 14", 1170, 400], ["$90 ÷ 3", 1430, 400], ["501", 1170, 560], ["WORRY", 1430, 560]].forEach(([s, x, y]) => S.text(s, x, y, { size: DS.type.small, t: W(47, 2), c: DS.c("ink"), parent: full }));
  DS.card(S, "YOU'RE NOT BAD AT MATH", 960, 140, { size: DS.type.small, t: W(45, 0), tc: "green" });
  DS.card(S, "FULL", 1300, 790, { size: DS.type.title, t: W(47, 2), tc: "red" });
  F.face(W(47, 2), "happy", 6); DS.vignette(S); }
