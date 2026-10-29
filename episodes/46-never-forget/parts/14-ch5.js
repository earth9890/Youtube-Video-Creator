// ===================== chapter 5: The shelf that won't close (clips 40-49) =====================
const ROOM_LIV = "room-living-room-light";
// 40 "Back in Dave's head, the shelf is now a wall."
shot(40, 0, (S) => {
  bg(S, "ep46-binder-wall");
  chap(S, "THE SHELF THAT WON'T CLOSE");
  brain(S, 960, 940, 1.5, "tired", { t: W(40, 4) });
  card(S, "INSIDE DAVE'S HEAD", 1420, 110, { t: W(40, 2) });
  card(S, "NOW A WALL", 1420, 230, { t: W(40, 8), fill: "yellow" });
}, { cam: "push" });
// 40 "Every smell, song and date pulls a binder off it,"
shot(40, 10, (S) => {
  bg(S, "ep46-binder-wall");
  [["food-toast", 500, "TOAST", "SMELL", 12], ["fx-music-notes", 960, "THAT SONG", "SONG", 13], ["prop-calendar", 1420, "4 OCT", "DATE", 14]].forEach(([n, x, lab, tag, w], i) => {
    panel(S, x, 330, 300, 250, W(40, 11) + i * 0.6);
    L.put(S, n, x, 330, { s: 1.0, t: W(40, 11) + i * 0.6 });
    arrowR(S, x, 480, x, 590, W(40, 15) + i * 0.4);
    binder(S, x, 930, lab, { view: "front", c: ["orange", "purple", "red"][i], bw: 200, bh: 270, s: 1.1, t: W(40, 15) + i * 0.4 });
  });
}, { cam: "none" });
// 40 "and the binder will not close itself."
shot(40, 20, (S) => {
  bg(S, "ep46-binder-wall");
  brain(S, 520, 940, 1.5, "worried", { armR: "push" });
  L.put(S, "ep46-binder-open", 1120, 940, { s: 2.3, c: "red", t: W(40, 22) });
  card(S, "WON'T CLOSE", 1120, 130, { t: W(40, 24), fill: "red" });
}, { cam: "pull" });
// 41 "Dave, you smelled toast. I am now in the toast binders."
shot(41, 0, (S) => {
  bg(S, "ep46-warehouse");
  brainTalk(S, 960, 940, 1.5, "tired", 41, {});
  L.put(S, "food-toast", 1420, 560, { s: 2.6, t: W(41, 2) });
  card(S, "THE TOAST BINDERS", 960, 130, { t: W(41, 8), fill: "yellow" });
}, { cam: "push" });
// 41 "There are four thousand toast binders."
shot(41, 11, (S) => {
  bg(S, "ep46-warehouse");
  brainTalk(S, 960, 940, 1.3, "worried", 41, {});
  panel(S, 960, 250, 760, 230, W(41, 12));
  countUp(S, 960, 285, 0, 4000, W(41, 13), 2.4, { size: DS.type.display, c: DS.c("red", 2), anchor: "middle", t0: W(41, 12) });
  txt(S, "TOAST BINDERS", 960, 350, { t: W(41, 15), size: DS.type.caption });
}, { cam: "pull" });
// 42 "The woman from Irvine described it as a split screen."
const splitScreen = (S, t) => { panel(S, 960, 520, 1600, 780, T0(S)); S.draw("M960 130 V910", t, 0.5, { c: DS.c("ink"), w: DS.w.near }); };
shot(42, 0, (S) => {
  field(S, "wall", 1);
  splitScreen(S, W(42, 7));
  aj(S, 960, 880, { s: 1.0, face: "worried", t: W(42, 0) });
  card(S, "A SPLIT SCREEN", 960, 130, { fill: "yellow" });
}, { cam: "none" });
// 42 "On one side, the present. On the other, a reel of memories that never stops playing."
shot(42, 10, (S) => {
  field(S, "wall", 1);
  splitScreen(S, T0(S));
  aj(S, 560, 880, { s: 0.95, face: "smile", t: W(42, 12) });
  card(S, "THE PRESENT", 560, 190, { t: W(42, 14) });
  const fs = S.grp(); L.put(S, "ep46-filmstrip", 1360, 520, { s: 1.15, frames: 3, parent: fs }); fadeG(S, fs, W(42, 18));
  shift(fs, W(42, 18), 6.0, [60, 0], [-60, 0], "none");
  card(S, "A REEL THAT NEVER STOPS", 1360, 190, { t: W(42, 19), fill: "yellow" });
}, { cam: "none" });
// 43 "In an email to the researchers, she called it nonstop, uncontrollable and totally exhausting."
shot(43, 0, (S) => {
  bg(S, "room-home-office-light");
  L.put(S, "type-laptop", 480, 950, { s: 1.4, t: W(43, 0) });
  card(S, "AN EMAIL TO THE RESEARCHERS", 960, 140, { t: W(43, 2), fill: "yellow" });
  panel(S, 1300, 580, 1100, 520, W(43, 8));
  txt(S, "NONSTOP.", 1300, 440, { t: W(43, 9), size: DS.type.title });
  txt(S, "UNCONTROLLABLE.", 1300, 560, { t: W(43, 10), size: DS.type.title });
  txt(S, "TOTALLY EXHAUSTING.", 1300, 680, { t: W(43, 12), size: DS.type.title, c: DS.c("red", 2) });
}, { cam: "none" });
// 44 "To be fair, all of the people in the first group study said they enjoyed replaying their memories."
shot(44, 0, (S) => {
  bg(S, ROOM_LIV);
  const c1 = card(S, "TO BE FAIR", 960, 120, { t: W(44, 0), fill: "yellow" }); fadeOut(c1.g, W(44, 12), 0.3);
  [["girl05", 360], ["man06", 700], ["girl02", 1040], ["man03", 1380], ["girl08", 1700]].forEach(([st, x], i) => {
    const a = guy(S, st, x, 950, { s: 1.0, face: "happy", t: W(44, 3) + i * 0.3 });
    swap(a, guy(S, st, x, 950, { s: 1.0, face: "love", pose: "thumbs-up" }), W(44, 13));
    const th = think(S, x, 950 - HEAD, { s: 0.34, t: W(44, 8) + i * 0.3, pic: "ep46-filmstrip", picS: 0.5, picO: { frames: 2, seed: i }, seed: 60 + i }); fadeOut(th, W(44, 13), 0.3);
    L.put(S, "fx-hearts", x, 440, { s: 0.6, t: W(44, 14) + i * 0.25 });
  });
  card(S, "ALL OF THEM ENJOYED IT", 960, 130, { t: W(44, 14), fill: "green" });
}, { cam: "none" });
// 45 "One compares every fourth of October she can remember while drying her hair,"
shot(45, 0, (S) => {
  bg(S, "room-bathroom-light");
  aj(S, 280, 950, { s: 1.3, face: "smile", pose: "hold" });
  L.put(S, "ep46-hair-dryer", 280 - 120, 950 - HEAD * 1.3 + 40, { s: 0.7, c: "pink", t: W(45, 9) });
  [0, 1, 2].forEach((i) => think(S, 1180 + i * 250, 300 + (i % 2) * 130, { s: 0.3, y: 330 + (i % 2) * 140, t: W(45, 3) + i * 0.6, pic: "p2-tear-calendar", picO: { day: 4 }, picS: 0.9, noTail: true, seed: 70 + i }));
  card(S, "EVERY 4 OCTOBER", 1360, 130, { t: W(45, 3), fill: "yellow" });
}, { cam: "none" });
// 45 "then tells an imaginary person: now you do it."
shot(45, 13, (S) => {
  bg(S, "room-bathroom-light");
  aj(S, 560, 950, { s: 1.3, face: "mischief", pose: "point" });
  const gh = guy(S, "man03", 1380, 950, { s: 1.3, face: "smile", flip: true }); gh.setAttribute("opacity", 0.3);
  L.put(S, "bubble-round", 640, 300, { s: 0.85, text: "NOW YOU DO IT!", tail: "left", t: W(45, 18) });
  card(S, "AN IMAGINARY PERSON", 1380, 150, { t: W(45, 15), fill: "yellow" });
}, { cam: "none" });
// 46 "Most filed their memories by date, like a calendar."
shot(46, 0, (S) => {
  bg(S, "room-library-light");
  L.put(S, "prop-calendar", 560, 560, { s: 2.6, t: W(46, 3) });
  arrowR(S, 800, 600, 1000, 600, W(46, 5));
  shelf(S, 1400, 950, 18, { s: 1.0, rows: 3, wd: 380, t: W(46, 6) });
  card(S, "FILED BY DATE", 960, 120, { t: W(46, 4), fill: "yellow" });
}, { cam: "none" });
// 46 "Ordinary memory is bad at telling two weeks ago from two months ago."
shot(46, 9, (S) => {
  field(S, "wall", 1);
  guy(S, "man05", 960, 940, { s: 1.2, face: "confused", pose: "scratch-head" });
  card(S, "2 WEEKS AGO", 480, 400, { fill: "white" });
  card(S, "2 MONTHS AGO", 1440, 400, { t: W(46, 19) });
  txt(S, "=", 960, 300, { t: W(46, 19), size: DS.type.display });
  L.put(S, "fx-question-marks", 1100, 420, { s: 0.9, t: W(46, 20) });
  card(S, "ORDINARY MEMORY", 960, 130, { t: W(46, 9) });
}, { cam: "none" });
// 47 chart helpers
const YB = 840, HM = 520, XW = [[560, "purple"], [800, "gray"]], XM = [[1200, "purple"], [1440, "gray"]];
const legend = (S) => { card(S, "SUPERIOR MEMORY", 620, 150, { t: T0(S), fill: "purple", size: DS.type.caption }); card(S, "ORDINARY", 1100, 150, { t: T0(S), size: DS.type.caption }); };
const axis = (S) => S.draw(`M440 ${YB} H1560`, T0(S), 0, { c: DS.c("ink"), w: DS.w.near });
// 47 "In two thousand sixteen, the Irvine team compared recall after a week, and after a month."
shot(47, 0, (S) => {
  field(S, "wall", 1);
  study(S, "IRVINE · 2016", T0(S));
  aj(S, 600, 900, { s: 0.85, face: "smile" });
  guy(S, "man03", 1100, 900, { s: 0.85, face: "smile" });
  card(S, "AFTER A WEEK", 640, 330, { fill: "yellow" });
  card(S, "AFTER A MONTH", 1280, 330, { t: W(47, 14), fill: "yellow" });
  arrowR(S, 860, 330, 1020, 330, W(47, 13));
}, { cam: "none" });
// 47 "At one week, both groups remembered the same amount."
shot(47, 16, (S) => {
  field(S, "wall", 1);
  legend(S); axis(S);
  XW.forEach(([x, c]) => vbar(S, x - 70, YB, 140, HM, 0.72, c, W(47, 19)));
  txt(S, "1 WEEK", 680, 900, { t: W(47, 17), size: DS.type.small });
  card(S, "THE SAME", 680, 280, { t: W(47, 22), fill: "yellow" });
}, { cam: "none" });
// 48 "At one month, ordinary memory had dropped dramatically, and the superior memories were still going strong."
shot(48, 0, (S) => {
  field(S, "wall", 1);
  legend(S); axis(S);
  XW.forEach(([x, c]) => { const g = S.grp(); DS.shape(S, rrect(x - 70, YB - HM * 0.72, 140, HM * 0.72, DS.r.sm), c, { w: "detail", parent: g }); fadeG(S, g, T0(S)); });
  txt(S, "1 WEEK", 680, 900, { t: T0(S), size: DS.type.small });
  txt(S, "1 MONTH", 1320, 900, { t: W(48, 2), size: DS.type.small });
  XM.forEach(([x, c], i) => { const g = S.grp(); DS.shape(S, rrect(x - 70, YB - HM * 0.72, 140, HM * 0.72, DS.r.sm), c, { w: "detail", parent: g }); fadeG(S, g, W(48, 2) + i * 0.3); if (i === 1) scaleY(g, W(48, 5), x, YB, 1.4, 1, 0.3); });
  card(S, "DROPPED DRAMATICALLY", 1440, 560, { t: W(48, 6), fill: "red", size: DS.type.caption });
  card(S, "STILL GOING STRONG", 1180, 340, { t: W(48, 12), fill: "green", size: DS.type.caption });
}, { cam: "none" });
// 49 "That drop isn't a bug. It is your brain letting a month go."
shot(49, 0, (S) => {
  bg(S, "scene-park-day");
  L.put(S, "dev-bug", 520, 800, { s: 1.4, t: W(49, 2) });
  xMark(S, 520, 640, 3.0, W(49, 3));
  card(S, "NOT A BUG", 520, 140, { t: W(49, 3), fill: "yellow" });
  brain(S, 1280, 940, 1.6, "smile", { armL: "up", t: W(49, 7) });
  const cal = S.grp(); L.put(S, "info-calendar-month", 1560, 470, { s: 0.85, parent: cal }); fadeG(S, cal, W(49, 9));
  shift(cal, W(49, 10), 2.4, [0, 0], [200, -240], "power1.in"); fadeOut(cal, W(49, 11), 1.5);
  card(S, "LETTING A MONTH GO", 1280, 130, { t: W(49, 9), fill: "yellow" });
}, { cam: "pull" });
