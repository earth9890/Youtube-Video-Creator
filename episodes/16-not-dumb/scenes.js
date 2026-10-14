// look: still
// You Are Not Dumb (1-min, 70 s). Mystery: who stole chapter six? Illustrated stills, progressive changes on the spoken word.
const dave = (S, x, gy, layer = "near", o = {}) => DS.figure(S, x, gy, layer, Object.assign({ s: 1.1, hair: "side", hairC: DS.c("brown"), outfitC: DS.c("blue") }, o));
const einstein = (S, x, gy, layer = "near", o = {}) => { const F = DS.figure(S, x, gy, layer, Object.assign({ s: 1.1, hair: "messy", hairC: DS.c("gray", 1), outfitC: DS.c("brown", 1) }, o)); S.draw(smooth([[x - 26 * F.s, F.hd[1] + F.r * 0.32], [x, F.hd[1] + F.r * 0.22], [x + 26 * F.s, F.hd[1] + F.r * 0.32]]), o.t ?? S.start, 0, { c: DS.c("gray", 1), w: DS.w.near }); return F; };
const book = (S, cx, cy, k, label, o = {}) => { const g = S.grp(); DS.drop(S, rrect(cx - 130 * k + 6, cy - 90 * k + 8, 260 * k, 180 * k, DS.r.xs), { t: o.t }); DS.shape(S, rrect(cx - 130 * k, cy - 90 * k, 260 * k, 180 * k, DS.r.xs), o.color || "red", { t: o.t }); DS.shape(S, rect(cx - 110 * k, cy - 76 * k, 220 * k, 150 * k), "paper", { t: o.t, w: "detail", flat: true }); if (label) S.text(label, cx, cy + 16 * k, { size: o.size || DS.type.small, t: o.t ?? S.start, c: DS.c("ink") }); return g; };
const paper = (S, x, y, w, h, o = {}) => { DS.drop(S, rect(x + 6, y + 8, w, h), { t: o.t }); DS.shape(S, rect(x, y, w, h), "white", { t: o.t, w: "detail", flat: true }); [1, 2, 3, 4].forEach((i) => S.draw(line([x + 30, y + 60 + i * 50], [x + w - 30, y + 60 + i * 50], 0), o.t ?? S.start, 0, { c: DS.c("sky", 0), w: DS.w.hair })); };
const desk = (S, x, gy, w) => { DS.shadow(S, x + w / 2, gy, w); DS.shape(S, rrect(x, gy - 230, w, 40, DS.r.xs), "wood"); [x + 30, x + w - 50].forEach((lx) => DS.shape(S, rect(lx, gy - 190, 20, 190), "wood", { w: "mid" })); return gy - 230; };
const bar = (S, x, base, h, w, name, t, label) => { DS.shape(S, rect(x, base - h, w, h), name, { t, dir: "h" }); S.text(label, x + w / 2, base - h - 24, { size: DS.type.small, t, c: DS.c("ink") }); };
const head = (S, cx, cy, k, t) => { DS.shape(S, circ(cx, cy, 170 * k, 190 * k), "white", { t }); S.brain(cx + 10 * k, cy - 20 * k, 0.9 * k, t, 0.3); };

const CUES = [[1, 0], [3, 0], [5, 0], [7, 0], [9, 0], [13, 0], [17, 0], [18, 0], [21, 0], [25, 0], [27, 0], [29, 0], [32, 0], [35, 0], [37, 0]];
const WIN = sceneWindows(CUES, 0.15);
const sc = (k, o) => scene(WIN[k][0], WIN[k][1], o);

// 0  This is Dave. / He read chapter six five times.
{ const S = sc(0, { cam: "push", focus: "960 600" }); const R = DS.room(S, { window: [1300, 170, 240, 240] });
  DS.frame(S, 420, 180, 150, 120, "grass");
  const top = desk(S, 760, 960, 520);
  dave(S, 560, 960, "near", { mood: "determined", look: 6, pose: "hold" });
  book(S, 1020, top - 90, 0.9, "CH. 6", { color: "red" });
  DS.card(S, "DAVE", 560, 220, { size: DS.type.body, t: W(1, 2) });
  [0, 1, 2, 3, 4].forEach((i) => S.draw(line([1240 + i * 34, 520], [1240 + i * 34, 600], 0), W(2, 4) + i * 0.08, 0, { c: DS.c("red"), w: DS.w.near }));
  S.draw(line([1225, 590], [1400, 530], 0), W(2, 5), 0, { c: DS.c("red"), w: DS.w.near });
  DS.card(S, "READ 5 TIMES", 1310, 450, { size: DS.type.caption, t: W(2, 4) });
  DS.plant(S, 1810, 1120, 1.0, -1); DS.vignette(S); }

// 1  In the test, he remembered / the page number.
{ const S = sc(1, { cam: "zoom", focus: "960 560" }); DS.room(S, { wall: "wall", window: false });
  const top = desk(S, 560, 960, 800);
  paper(S, 760, top - 520, 400, 480);
  S.text("TEST", 960, top - 440, { size: DS.type.body, c: DS.c("ink") });
  S.text("Q1 ... ?", 960, top - 300, { size: DS.type.small, t: W(3, 3), c: DS.c("ink") });
  S.text("PAGE 87", 960, top - 170, { size: DS.type.title, t: W(4, 1), c: DS.c("red") });
  DS.vignette(S); }

// 2  Is Dave dumb, / or did something steal chapter six?
{ const S = sc(2, { cam: "push" }); DS.room(S, { wall: "night", floor: "wood", window: false });
  dave(S, 620, 960, "near", { mood: "worried", look: 6 });
  book(S, 1260, 560, 1.3, "", { color: "red" });
  S.text("?", 1260, 610, { size: DS.type.display, t: W(6, 3), c: DS.c("red") });
  DS.card(S, "DUMB?", 620, 230, { size: DS.type.body, t: W(5, 2) });
  DS.card(S, "WHO STOLE CHAPTER 6?", 1260, 230, { size: DS.type.small, t: W(6, 3), tc: "red" });
  DS.vignette(S, 0.18); }

// 3  Dave's comfort: / "Even Einstein failed maths."
{ const S = sc(3); DS.room(S, { window: false });
  dave(S, 520, 960, "near", { mood: "smile", look: 6 });
  S.thought(1140, 470, 420, 300, 700, 560, W(7, 1), 0.3);
  einstein(S, 1000, 700, "mid", { s: 1.1, mood: "worried", t: W(8, 1) });
  paper(S, 1180, 330, 220, 260, { t: W(8, 2) });
  S.text("F", 1290, 520, { size: DS.type.display, t: W(8, 3), c: DS.c("red") });
  DS.card(S, "\"EINSTEIN FAILED MATHS\"", 960, 150, { size: DS.type.small, t: W(8, 1) }); }

// 4  He didn't: / he'd mastered calculus by fifteen. / Dave's comfort / did calculus.
{ const S = sc(4, { cam: "push" }); DS.room(S, { wall: "green", floor: "wood", window: false });
  DS.shape(S, rrect(520, 200, 880, 460, DS.r.sm), "wood"); DS.shape(S, rect(550, 230, 820, 400), "navy", { flat: true });
  S.text("∫ x² dx = x³/3", 960, 450, { size: DS.type.title, t: W(10, 2), c: DS.P.white[0] });
  DS.card(S, "MYTH", 960, 140, { size: DS.type.body, t: W(9, 0), tc: "red" });
  DS.card(S, "CALCULUS BY 15", 960, 740, { size: DS.type.small, t: W(10, 3) });
  const F = dave(S, 300, 1010, "near", { s: 0.95, mood: "smile", look: 6 }); F.face(W(12, 0), "sad", 6); }

// 5  So smart is just born? / But he taught himself algebra at twelve. / Even Einstein / started on page one.
{ const S = sc(5); DS.room(S, { window: [1340, 170, 230, 230] });
  dave(S, 420, 960, "near", { mood: "worried", look: 6 });
  S.speech(420, 220, 250, 90, 420, 330, W(13, 0), 0.25); S.text("BORN SMART?", 420, 240, { size: DS.type.small, t: W(13, 1), c: DS.c("ink") });
  const top = desk(S, 860, 960, 620);
  einstein(S, 1000, 960, "near", { s: 0.8, mood: "determined", look: 6, t: W(14, 1) });
  book(S, 1300, top - 90, 0.85, "ALGEBRA", { color: "green", size: DS.type.caption, t: W(14, 4) });
  DS.card(S, "AGE 12, SELF-TAUGHT", 1170, 330, { size: DS.type.caption, t: W(14, 4) });
  DS.card(S, "PAGE ONE", 1300, 470, { size: DS.type.small, t: W(16, 2), tc: "red" }); DS.vignette(S); }

// 6  In 2011, Eleanor Maguire scanned trainee London cabbies learning 25,000 streets.
{ const S = sc(6, { cam: "pull" }); const O = DS.outdoor(S, { hy: 620, sky: "sky", sun: [300, 180], ground: "gray", hills: "gray" });
  [[1150, 300], [1330, 360], [1510, 280], [1690, 340], [260, 380], [450, 320]].forEach(([x, top]) => DS.shape(S, rect(x, top, 160, 640 - top), "wall", { layer: "far", w: "far" }));
  const cx = 860, gy = 930;
  DS.shadow(S, cx, gy, 560);
  DS.shape(S, rrect(cx - 280, gy - 230, 560, 170, DS.r.lg), "ink", { w: "near" });
  DS.shape(S, rrect(cx - 170, gy - 330, 330, 120, DS.r.md), "ink", { w: "near" });
  [[cx - 150, "glass"], [cx + 10, "glass"]].forEach(([x, c]) => DS.shape(S, rrect(x, gy - 315, 130, 90, DS.r.xs), c, { w: "detail" }));
  DS.shape(S, rrect(cx - 50, gy - 375, 100, 40, DS.r.xs), "yellow", { w: "detail" }); S.text("TAXI", cx, gy - 343, { size: DS.type.caption, c: DS.c("ink") });
  [cx - 170, cx + 170].forEach((x) => { DS.shape(S, circ(x, gy - 50, 58), "ink"); DS.shape(S, circ(x, gy - 50, 24), "gray"); });
  DS.card(S, "2011 · ELEANOR MAGUIRE", 960, 140, { size: DS.type.small, t: W(17, 3) });
  DS.card(S, "25,000 STREETS", 1460, 520, { size: DS.type.body, t: W(17, 10), tc: "red" }); DS.vignette(S); }

// 7  At the start, same IQ scores, same brains. / Years later, those who qualified had grown grey matter / in the brain's map room.
{ const S = sc(7); DS.room(S, { wall: "glass", floor: "gray", window: false });
  head(S, 620, 560, 1.1); head(S, 1300, 560, 1.1);
  S.text("=", 960, 600, { size: DS.type.display, c: DS.c("ink") });
  DS.card(S, "SAME BRAINS", 960, 150, { size: DS.type.body, t: W(18, 5) });
  S.fill(circ(1330, 600, 70, 50), W(19, 6), 0.4, DS.c("gold"), 0.85);
  S.fill(circ(1330, 600, 130, 100), W(19, 6), 0.4, DS.c("gold", 1), 0.35);
  DS.card(S, "MAP ROOM GREW", 1300, 860, { size: DS.type.small, t: W(20, 2), tc: "green" }); DS.vignette(S); }

// 8  Their secret: / twice the weekly practice. / London didn't pick smart brains. / It built them.
{ const S = sc(8, { cam: "push" }); DS.room(S, { window: false });
  S.draw(line([440, 860], [1480, 860], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.mid });
  bar(S, 560, 860, 230, 220, "gray", W(22, 1), "17 h");
  bar(S, 1000, 860, 480, 220, "green", W(22, 2), "35 h");
  S.text("PRACTICE / WEEK", 960, 920, { size: DS.type.caption, c: DS.c("ink") });
  DS.card(S, "2× PRACTICE", 960, 150, { size: DS.type.body, t: W(22, 0), tc: "green" });
  DS.card(S, "BUILT, NOT PICKED", 1520, 330, { size: DS.type.small, t: W(24, 1) }); }

// 9  "So I read it fifty more times?" / "No."
{ const S = sc(9); DS.room(S, { window: false });
  dave(S, 560, 960, "near", { mood: "wow", look: 6 });
  [0, 1, 2, 3, 4, 5, 6].forEach((i) => book(S, 1240 + (i % 2) * 14, 900 - i * 95, 0.85, "", { color: ["red", "blue", "green", "orange", "purple", "red", "blue"][i], t: W(25, 3) + i * 0.06 }));
  S.speech(560, 230, 300, 90, 560, 340, W(25, 0), 0.25); S.text("50 MORE TIMES?", 560, 250, { size: DS.type.small, t: W(25, 1), c: DS.c("ink") });
  DS.card(S, "NO.", 1600, 280, { size: DS.type.title, t: W(26, 0), tc: "red" }); }

// 10  In 2006, Henry Roediger's students read a passage fourteen times, / or three times, then tested themselves.
{ const S = sc(10); DS.room(S, { wall: "wall", window: false });
  DS.card(S, "2006 · HENRY ROEDIGER", 960, 140, { size: DS.type.small, t: W(27, 3) });
  DS.figure(S, 540, 960, "near", { s: 0.95, hair: "bun", hairC: DS.c("brown"), outfitC: DS.c("purple"), mood: "flat", look: 6 });
  [0, 1, 2, 3].forEach((i) => book(S, 820, 860 - i * 90, 0.7, i === 3 ? "×14" : "", { color: "purple", size: DS.type.small, t: W(27, 10) }));
  DS.figure(S, 1220, 960, "near", { s: 0.95, hair: "curly", hairC: DS.c("ink"), outfitC: DS.c("green"), mood: "determined", look: 6, t: W(28, 0) });
  book(S, 1480, 860, 0.7, "×3", { color: "green", size: DS.type.small, t: W(28, 1) });
  paper(S, 1400, 470, 190, 230, { t: W(28, 4) }); S.text("QUIZ", 1495, 560, { size: DS.type.caption, t: W(28, 4), c: DS.c("red") });
  DS.card(S, "RE-READ", 680, 330, { size: DS.type.caption, t: W(27, 10) }); DS.card(S, "TESTED", 1340, 330, { size: DS.type.caption, t: W(28, 4) }); }

// 11  After five minutes, re-readers won, and felt surest. / A week later, they remembered forty percent, / the testers sixty-one.
{ const S = sc(11, { cam: "push" }); DS.room(S, { window: false });
  S.draw(line([300, 860], [1620, 860], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.mid });
  bar(S, 380, 860, 498, 170, "purple", W(29, 2), "83%"); bar(S, 570, 860, 426, 170, "green", W(29, 2), "71%");
  S.text("5 MIN", 560, 920, { size: DS.type.caption, c: DS.c("ink") });
  bar(S, 1090, 860, 240, 170, "purple", W(30, 3), "40%"); bar(S, 1280, 860, 366, 170, "green", W(31, 2), "61%");
  S.text("1 WEEK", 1270, 920, { size: DS.type.caption, t: W(30, 0), c: DS.c("ink") });
  DS.card(S, "RE-READ", 700, 150, { size: DS.type.caption, tc: "purple" }); DS.card(S, "TESTED", 1220, 150, { size: DS.type.caption, tc: "green" });
  DS.card(S, "WINNER", 1365, 380, { size: DS.type.caption, t: W(31, 2), tc: "green" }); }

// 12  Re-reading feels like knowing. / It's recognising, / like a page number.
{ const S = sc(12); DS.room(S, { wall: "dusk", floor: "wood", window: false });
  book(S, 960, 560, 1.8, "", { color: "red" });
  S.fill(circ(960, 600, 170, 90), W(34, 2), 0.4, DS.c("gold", 1), 0.55);
  S.text("p. 87", 960, 625, { size: DS.type.title, t: W(34, 2), c: DS.c("red") });
  DS.card(S, "FEELS LIKE KNOWING", 960, 150, { size: DS.type.small, t: W(32, 2) });
  DS.card(S, "IT'S ONLY RECOGNISING", 960, 920, { size: DS.type.small, t: W(33, 1), tc: "red" }); DS.vignette(S); }

// 13  Dave isn't dumb. / Dave was re-reading.
{ const S = sc(13, { cam: "zoom", focus: "960 600" }); DS.room(S, { window: [1300, 170, 240, 240] });
  const F = dave(S, 760, 960, "near", { s: 1.2, mood: "wow", look: 6 });
  F.face(W(35, 2), "happy", 0);
  const top = desk(S, 1080, 960, 420); book(S, 1290, top - 90, 0.9, "", { color: "red" });
  DS.card(S, "NOT DUMB", 760, 230, { size: DS.type.body, t: W(35, 2), tc: "green" });
  DS.card(S, "CULPRIT: RE-READING", 1280, 440, { size: DS.type.small, t: W(36, 2), tc: "red" }); DS.vignette(S); }

// 14  Tonight, chapter six, book shut, / what do you remember? / You are not dumb. / You just haven't learned it yet.
{ const S = sc(14, { cam: "pull" }); DS.room(S, { wall: "night", floor: "wood", window: [1460, 200, 220, 220] });
  const top = desk(S, 760, 960, 600);
  S.fill(circ(1200, top - 260, 260, 200), S.start, 0, DS.c("gold", 1), 0.25);
  dave(S, 560, 960, "near", { mood: "determined", look: 6, pose: "hold" });
  book(S, 960, top - 60, 0.75, "", { color: "red" });
  paper(S, 1110, top - 330, 240, 290, { t: W(37, 4) });
  S.draw(smooth([[1150, top - 230], [1210, top - 240], [1270, top - 225], [1310, top - 235]]), W(38, 2), 0, { c: DS.c("ink"), w: DS.w.detail });
  DS.card(S, "BOOK SHUT. TEST YOURSELF.", 960, 150, { size: DS.type.small, t: W(37, 4) });
  DS.card(S, "YOU'RE NOT DUMB", 960, 260, { size: DS.type.body, t: W(39, 0), tc: "green" }); DS.vignette(S); }
