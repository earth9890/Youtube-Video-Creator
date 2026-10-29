// ===================== chapter 3: Not everything (clips 21-27) =====================
const NUMS = ["7 3 9 1 4", "2 8 6 0 5", "9 4 1 7 3", "5 0 8 2 6", "1 6 3 9 7", "4 2 7 5 8"];
const numbers = (S, cx, cy, t, o = {}) => { panel(S, cx, cy, 560, 520, t); NUMS.forEach((ln, i) => txt(S, ln, cx, cy - 170 + i * 68, { t, size: o.size || DS.type.small, c: DS.c("ink", 1) })); };
// 21 "Now the catch. The gift stops at their own lives."
shot(21, 0, (S) => {
  field(S, "wall", 1);
  chap(S, "NOT EVERYTHING");
  S.fill(circ(620, 580, 400), T0(S), 0, DS.c("yellow", 1), 0.45);
  S.draw(circ(620, 580, 400), T0(S), 0, { c: DS.c("ink"), w: DS.w.near });
  shelf(S, 450, 800, 10, { s: 0.75, rows: 2, wd: 300 });
  aj(S, 720, 800, { s: 0.9, face: "smile" });
  card(S, "HER OWN LIFE", 620, 250, { fill: "purple" });
  txt(S, "everything else?", 1460, 560, { t: W(21, 6), size: DS.type.body, c: DS.c("gray", 2) });
}, { cam: "none" });
// 21 "Shown a table of random numbers and told to memorise it,"
shot(21, 10, (S) => {
  bg(S, LAB);
  numbers(S, 1200, 520, W(21, 12));
  card(S, "RANDOM NUMBERS", 1200, 180, { t: W(21, 13), fill: "yellow" });
  aj(S, 560, 950, { s: 1.2, face: "worried" });
  doc(S, 220, 950, { s: 1.0, face: "smile" });
}, { cam: "none" });
// 21 "the woman laughed and said it was impossible."
shot(21, 22, (S) => {
  bg(S, LAB);
  numbers(S, 1500, 520, T0(S), { size: DS.type.caption });
  aj(S, 700, 950, { s: 1.3, face: "cryLaugh", pose: "armsUp" });
  L.put(S, "bubble-round", 1000, 330, { s: 0.8, text: "IMPOSSIBLE!", tail: "left", t: W(21, 26) });
}, { cam: "push" });
// 22 "After hours with two interviewers, she couldn't say what either of them had been wearing."
shot(22, 0, (S) => {
  bg(S, "room-office-light");
  guy(S, "man09", 480, 950, { s: 1.1, face: "smile", pose: "hold" });
  guy(S, "girl06", 1440, 950, { s: 1.1, face: "smile", pose: "hold", flip: true });
  const a = aj(S, 960, 950, { s: 1.2, face: "smile" }); swap(a, aj(S, 960, 950, { s: 1.2, face: "confused", pose: "think" }), W(22, 6));
  L.put(S, "p2-clock-3", 960, 330, { s: 1.3, t: W(22, 1) });
  const h = card(S, "HOURS TOGETHER", 960, 140, { t: W(22, 1) }); fadeOut(h.g, W(22, 6), 0.4);
  think(S, 960, 950 - HEAD * 1.2, { s: 0.55, t: W(22, 8), text: "?", size: DS.type.display, seed: 6, dx: 0 });
  card(S, "WEARING?", 960, 140, { t: W(22, 11), fill: "yellow" });
}, { cam: "none" });
// 23 "And on most standard laboratory memory tests, the group scored about the same as everyone else."
shot(23, 0, (S) => {
  bg(S, LAB);
  [[400, "THE GROUP", "purple", AJ.style, 1], [1520, "EVERYONE ELSE", "gray", "man03", -1]].forEach(([x, lab, fill, st, d]) => {
    guy(S, st, x, 950, { s: 1.15, face: "thinking", pose: "hold", flip: d < 0 });
    panel(S, x + d * 120, 640, 150, 200, W(23, 3));
    [0, 1, 2, 3].forEach((k) => S.draw(`M${x + d * 120 - 50} ${580 + k * 40} H${x + d * 120 + 50}`, W(23, 3), 0, { c: DS.c("gray", 1), w: DS.w.near }));
    card(S, lab, x, 190, { t: W(23, 4), fill });
  });
  panel(S, 960, 560, 560, 640, W(23, 8));
  S.draw("M720 800 H1200", W(23, 8), 0, { c: DS.c("ink"), w: DS.w.near });
  vbar(S, 760, 800, 150, 440, 0.62, "purple", W(23, 9)); vbar(S, 1010, 800, 150, 440, 0.6, "gray", W(23, 9));
  card(S, "ABOUT THE SAME", 960, 190, { t: W(23, 10), fill: "yellow" });
}, { cam: "none" });
// 24 "School, she says, was torture, because she couldn't hold on to facts and figures."
shot(24, 0, (S) => {
  bg(S, "scene-school-yard-day");
  aj(S, 700, 950, { s: 1.25, pose: "sad", face: "sob" });
  L.put(S, "prop-book-closed", 960, 800, { s: 1.6, t: W(24, 8) });
  card(S, "SCHOOL: TORTURE", 960, 140, { t: W(24, 3), fill: "red" });
  ["7 x 8", "1066", "H2O"].forEach((s, i) => { const t = txt(S, s, 1250 + i * 170, 520 - i * 70, { t: W(24, 9) + i * 0.3, size: DS.type.body, c: DS.c("gray", 2) }); shift(t, W(24, 9) + i * 0.3 + 0.4, 2.4, [0, 0], [120, -140], "power1.in"); fadeOut(t, W(24, 12) + i * 0.3, 1.5); });
}, { cam: "none" });
// 24 "But ask about television from the nineteen sixties and seventies, and she is unbeatable."
shot(24, 14, (S) => {
  bg(S, "room-living-room-light");
  L.put(S, "prop-tv", 1300, 600, { s: 2.3, t: W(24, 17) });
  const c1 = card(S, "TV: 1960s AND 1970s", 1300, 180, { t: W(24, 19), fill: "yellow" }); fadeOut(c1.g, W(24, 25), 0.4);
  const a = aj(S, 560, 950, { s: 1.2, face: "delighted" }); swap(a, aj(S, 560, 950, { s: 1.25, face: "proud", pose: "cheer" }), W(24, 25));
  L.put(S, "sport-trophy", 900, 780, { s: 1.5, t: W(24, 26) });
  card(S, "UNBEATABLE", 960, 180, { t: W(24, 26), fill: "yellow" });
}, { cam: "push" });
// 25 "What mattered to her stuck. She knew the date of a famous crisis because she was a self-described news junkie"
shot(25, 0, (S) => {
  bg(S, "scene-suburb-day");
  const a = aj(S, 640, 950, { s: 1.3, face: "love" }); swap(a, aj(S, 640, 950, { s: 1.3, face: "thinking", pose: "hold" }), W(25, 10));
  const h = L.put(S, "fx-hearts", 640, 400, { s: 1.0, t: W(25, 1) }); fadeOut(h, W(25, 9), 0.4);
  const n = panel(S, 1300, 560, 460, 360, W(25, 3), "yellow"); const t1 = txt(S, "WHAT", 1300, 520, { t: W(25, 3), size: DS.type.title }); const t2 = txt(S, "MATTERED", 1300, 610, { t: W(25, 3), size: DS.type.title });
  const st = card(S, "STUCK", 1300, 800, { t: W(25, 4), fill: "green" });
  [n, t1, t2, st.g].forEach((e) => fadeOut(e, W(25, 10), 0.4));
  L.put(S, "ep-newspaper", 1320, 600, { s: 1.4, t: W(25, 11) });
  card(S, "BREAKING NEWS", 1320, 120, { t: W(25, 11), fill: "red" });
  L.put(S, "ep-mug-coffee", 880, 800, { s: 1.0, t: W(25, 14) });
  card(S, "NEWS JUNKIE", 640, 190, { t: W(25, 17), fill: "purple" });
}, { cam: "none" });
// 25 "and had made it part of her day."
shot(25, 20, (S) => {
  field(S, "wall", 1);
  card(S, "PART OF HER DAY", 960, 130, { t: W(25, 22), fill: "yellow" });
  panel(S, 960, 520, 1500, 260, T0(S));
  S.fill(rect(210, 400, 1500, 240), T0(S), 0, DS.c("gray", 1), 0.4);
  S.fill(rect(1050, 400, 190, 240), W(25, 22), 0.4, DS.c("red", 1), 0.9);
  txt(S, "HER DAY", 560, 540, { t: W(25, 22), size: DS.type.title });
  card(S, "NEWS", 1145, 760, { t: W(25, 23), fill: "red" });
}, { cam: "none" });
// 26 "Dave is unimpressed."
shot(26, 0, (S) => {
  bg(S, "room-living-room-light");
  dave(S, 760, 950, { s: 1.25, face: "flat", pose: "cross" });
  card(S, "UNIMPRESSED", 760, 160, { t: W(26, 2) });
  shelf(S, 1380, 950, 3, { s: 0.75, rows: 2, wd: 300, t: W(26, 6) });
  card(S, "A START", 1380, 380, { t: W(26, 10), fill: "yellow" });
}, { cam: "push" });
// 26 "But he wants the full version."
shot(26, 12, (S) => {
  bg(S, "room-living-room-light");
  dave(S, 600, 950, { s: 1.2, face: "determined", pose: "point" });
  shelf(S, 1280, 950, 6, { s: 0.9, rows: 3, wd: 380, t: W(26, 6) });
  card(S, "THE FULL VERSION", 1280, 160, { t: W(26, 15), fill: "yellow" });
  txt(S, "?", 1500, 520, { t: W(26, 16), size: DS.type.display, c: DS.c("red", 2) });
}, { cam: "none" });
// 27 "Then give me everything. Names, numbers, faces, facts. All of it, all the time."
shot(27, 0, (S) => {
  bg(S, "room-living-room-light");
  daveTalk(S, 960, 950, { s: 1.3, face: "determined", pose: "arms-out" }, 27);
  const c1 = card(S, "EVERYTHING", 960, 130, { t: W(27, 3), fill: "yellow" }); fadeOut(c1.g, W(27, 8), 0.3);
  nametag(S, 360, 430, 1.1, W(27, 4));
  numbers(S, 1580, 470, W(27, 5), { size: DS.type.caption });
  const f = S.grp(); DS.shape(S, circ(560, 300, 70), "white", { flat: true, w: "mid", parent: f }); S.draw("M535 285 v10 M585 285 v10 M530 325 Q560 350 590 325", W(27, 6), 0, { c: DS.c("ink"), w: DS.w.mid, parent: f }); fadeG(S, f, W(27, 6));
  L.put(S, "prop-book-closed", 1300, 260, { s: 1.8, t: W(27, 7) });
  card(S, "ALL OF IT, ALL THE TIME", 960, 130, { t: W(27, 8), fill: "yellow" });
}, { cam: "push" });