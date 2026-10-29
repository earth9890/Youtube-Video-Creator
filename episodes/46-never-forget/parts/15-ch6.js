// ===================== chapter 6: The twist (clips 50-61) =====================
let PARKN = 0;
const PARK = (S, x, y, k) => { // a whole park, shrunk into a picture and clipped to its 1920x1080 frame (the scene draws past it)
  const g = L.put(S, "scene-park-day", x, y, { s: k }), id = "clip-park-" + ++PARKN, cp = el("clipPath", { id }, S.g);
  el("rect", { x: 0, y: 0, width: 1920, height: 1080 }, cp); g.setAttribute("clip-path", `url(#${id})`); return g;
};
// 50 "Dave has one last hope. Surely, if he remembers everything, at least he remembers it correctly." + 51 "This is where it goes wrong."
shot(50, 0, (S) => {
  bg(S, "scene-park-day");
  const a = dave(S, 640, 950, { s: 1.3, face: "starry", pose: "pray-hands" }); swap(a, dave(S, 640, 950, { s: 1.3, face: "worried", pose: "stand" }), W(51, 2));
  const c1 = card(S, "ONE LAST HOPE", 960, 140, { t: W(50, 2), fill: "yellow" }); fadeOut(c1.g, W(50, 7), 0.3);
  think(S, 640, 950 - HEAD * 1.3, { s: 0.8, t: W(50, 8), pic: "ep46-binder", picO: { view: "front", label: "EVERYTHING", c: "green", bw: 190, bh: 230 }, picS: 0.9, picY: 100, seed: 11, dx: 380 });
  tick(S, 1180, 330, 2.0, W(50, 14));
  const c2 = card(S, "CORRECTLY?", 1280, 130, { t: W(50, 13), fill: "yellow" }); fadeOut(c2.g, W(51, 1), 0.3);
  S.draw("M1120 190 L1170 290 L1120 350 L1180 450 L1150 520", W(51, 3), 0.6, { c: DS.c("red"), w: DS.w.near });
  card(S, "WHERE IT GOES WRONG", 1280, 130, { t: W(51, 2), fill: "red" });
}, { cam: "push" });
// 51 "In twenty thirteen, researchers at Irvine tested twenty people with superior memories, and thirty-eight with ordinary ones."
shot(51, 6, (S) => {
  field(S, "wall", 1);
  study(S, "IRVINE \u00B7 2013", T0(S));
  doc(S, 150, 940, { s: 0.9, face: "smile" });
  doc(S, 1770, 940, { s: 0.9, face: "smile", flip: true });
  card(S, "SUPERIOR MEMORIES", 640, 230, { t: W(51, 13), fill: "purple", size: DS.type.caption });
  card(S, "ORDINARY", 1300, 230, { t: W(51, 19), size: DS.type.caption });
  [...Array(20)].forEach((_, i) => mini(S, 340 + (i % 10) * 62, 440 + Math.floor(i / 10) * 140, 1.0, { t: i > 4 ? W(51, 13) + i * 0.06 : undefined, fill: DS.c("purple", 1), c: DS.c("purple", 2) }));
  [...Array(38)].forEach((_, i) => mini(S, 1000 + (i % 10) * 62, 440 + Math.floor(i / 10) * 140, 1.0, { t: W(51, 19) + i * 0.06 }));
  countUp(S, 640, 900, 0, 20, W(51, 13), 1.2, { size: DS.type.display, c: DS.c("purple", 2), anchor: "middle" });
  countUp(S, 1300, 900, 0, 38, W(51, 19), 1.6, { size: DS.type.display, c: DS.c("ink", 1), anchor: "middle" });
}, { cam: "none" });
// 52 "First, a list of words."
const wordPanel = (S, x, title, words, t, hot = -1) => {
  panel(S, x, 530, 560, 640, t);
  card(S, title, x, 270, { t, size: DS.type.caption, fill: "yellow" });
  words.forEach((w, i) => txt(S, w, x, 390 + i * 80, { t: t + 0.2 + i * 0.25, size: DS.type.body, c: i === hot ? DS.c("red", 2) : DS.c("ink") }));
};
// 52 "First, a list of words. Then new words, some related to the list but never on it."
shot(52, 0, (S) => {
  bg(S, LAB);
  wordPanel(S, 560, "THE LIST", ["BED", "REST", "DREAM", "NAP", "SNORE", "PILLOW"], W(52, 2));
  wordPanel(S, 1360, "NEW WORDS", ["BED", "TABLE", "SLEEP", "NAP", "RIVER"], W(52, 6), 2);
  card(S, "RELATED, NEVER ON IT", 1360, 900, { t: W(52, 13), fill: "red", size: DS.type.caption });
}, { cam: "none" });
// 52 "The question was simple: which of these did you see?"
shot(52, 17, (S) => {
  bg(S, LAB);
  wordPanel(S, 1360, "NEW WORDS", ["BED", "TABLE", "SLEEP", "NAP", "RIVER"], T0(S), 2);
  doc(S, 560, 950, { s: 1.2, face: "smile", pose: "point" });
  L.put(S, "bubble-round", 640, 300, { s: 0.85, text: "WHICH DID YOU SEE?", tail: "left", t: W(52, 21) });
}, { cam: "none" });
// 53 "Both groups said yes to about seven in ten of the words that were never there."
shot(53, 0, (S) => {
  field(S, "wall", 1);
  card(S, "WORDS THAT WERE NEVER THERE", 960, 140, { t: W(53, 9), size: DS.type.caption });
  [["SUPERIOR MEMORY", "purple", 400], ["ORDINARY", "gray", 660]].forEach(([lab, c, y], r) => {
    card(S, lab, 330, y, { t: W(53, 0), size: DS.type.caption, fill: r ? undefined : "purple" });
    [...Array(10)].forEach((_, i) => { DS.shape(S, circ(700 + i * 108, y, 40), i < 7 ? "red" : "white", { flat: true, w: "mid" }); });
  });
  [0, 1].forEach((r) => [...Array(7)].forEach((_, i) => tick(S, 700 + i * 108, 400 + r * 260, 0.9, W(53, 4) + i * 0.15 + r * 0.05, "white")));
  card(S, "SAID YES: ABOUT 7 IN 10", 960, 860, { t: W(53, 5), fill: "yellow" });
}, { cam: "none" });
// 54 "The superior memories did remember more of the real words, seventy-seven percent against sixty-five."
shot(54, 0, (S) => {
  field(S, "wall", 1);
  legend(S); axis(S);
  card(S, "THE REAL WORDS", 960, 260, { t: W(54, 7), fill: "yellow", size: DS.type.caption });
  vbar(S, 690, YB, 150, HM, 0.77, "purple", W(54, 10)); vbar(S, 1080, YB, 150, HM, 0.65, "gray", W(54, 12));
  txt(S, "77%", 765, YB - HM * 0.77 - 30, { t: W(54, 10) + 0.5, size: DS.type.title, c: DS.c("purple", 2) });
  txt(S, "65%", 1155, YB - HM * 0.65 - 30, { t: W(54, 12) + 0.5, size: DS.type.title });
}, { cam: "none" });
// 54 "But they were fooled just as often."
shot(54, 14, (S) => {
  field(S, "wall", 1);
  legend(S); axis(S);
  card(S, "THE WORDS THAT WERE NEVER THERE", 960, 260, { t: T0(S), fill: "red", size: DS.type.caption });
  vbar(S, 690, YB, 150, HM, 0.7, "purple", W(54, 15)); vbar(S, 1080, YB, 150, HM, 0.7, "gray", W(54, 15));
  txt(S, "7 IN 10", 765, YB - HM * 0.7 - 30, { t: W(54, 17), size: DS.type.small, c: DS.c("purple", 2) });
  txt(S, "7 IN 10", 1155, YB - HM * 0.7 - 30, { t: W(54, 17), size: DS.type.small });
  card(S, "FOOLED JUST AS OFTEN", 960, 960, { t: W(54, 19), fill: "yellow", size: DS.type.caption });
}, { cam: "none" });
// 55 "So the people who never forget still remember things that never happened."
shot(55, 0, (S) => {
  bg(S, "scene-park-day");
  guy(S, "man06", 640, 950, { s: 1.3, face: "smug", pose: "hips" });
  think(S, 640, 950 - HEAD * 1.3, { s: 0.8, t: W(55, 7), kind: "faint", pic: "ep46-binder", picO: { view: "front", label: "NEVER|HAPPENED", c: "purple", bw: 190, bh: 230 }, picS: 0.9, picY: 100, seed: 13, dx: 380 });
  card(S, "STILL REMEMBER", 1280, 130, { t: W(55, 5), fill: "yellow" });
}, { cam: "push" });
// 56 "In a second test, they took in false details from a slideshow even more than the others did."
const slide = (S, x, y, t, extra) => {
  panel(S, x, y, 640, 440, t);
  PARK(S, x - 270, y - 170, 0.28);
  if (extra) { L.put(S, "animal-dog", x + 100, y + 170, { s: 0.5, t: extra }); S.draw(circ(x + 100, y + 115, 70), extra, 0.4, { c: DS.c("red"), w: DS.w.near }); L.put(S, "prop-umbrella-ducks", x - 150, y + 20, { s: 0.55, t: extra + 0.3 }); S.draw(circ(x - 150, y + 40, 85), extra + 0.3, 0.4, { c: DS.c("red"), w: DS.w.near }); }
};
shot(56, 0, (S) => {
  field(S, "wall", 1);
  card(S, "THE SLIDESHOW", 960, 140, { fill: "yellow" });
  slide(S, 960, 560, W(56, 4));
  guy(S, "man06", 260, 940, { s: 0.9, face: "smile" });
}, { cam: "push" });
shot(56, 10, (S) => {
  field(S, "wall", 1);
  slide(S, 520, 540, T0(S));
  slide(S, 1400, 540, W(56, 10), W(56, 12));
  card(S, "THE SLIDES", 520, 190, { t: T0(S), size: DS.type.caption });
  card(S, "WHAT THEY REMEMBERED", 1400, 190, { t: W(56, 10), size: DS.type.caption, fill: "purple" });
  card(S, "EVEN MORE FALSE DETAILS", 960, 900, { t: W(56, 14), size: DS.type.caption, fill: "red" });
}, { cam: "none" });
// 57 "Remembering is not playing back a recording. Each time, your brain rebuilds the scene from pieces, using what you know now."
shot(57, 0, (S) => {
  field(S, "wall", 1);
  panel(S, 440, 520, 440, 340, T0(S), "gray");
  S.fill("M370 400 L370 640 L560 520 Z", T0(S), 0.3, DS.c("white"), 1);
  xMark(S, 440, 520, 3.0, W(57, 5));
  card(S, "NOT A RECORDING", 440, 250, { fill: "yellow" });
  brain(S, 760, 940, 1.5, "smile", { armL: "up", t: W(57, 8) });
  PIECES.forEach(([c, i, j], k) => { const g = S.grp(); DS.shape(S, rrect(1000 + i * 190, 360 + j * 170, 180, 160, DS.r.sm), c, { w: "mid", parent: g }); fadeG(S, g, W(57, 9) + k * 0.1); shift(g, W(57, 11) + k * 0.2, 0.9, [(k % 2 ? 90 : -110), (k < 3 ? -120 : 130)], [0, 0], "power2.out"); });
  const now = S.grp(); DS.shape(S, rrect(1380, 360, 180, 160, DS.r.sm), "yellow", { w: "mid", parent: now }); S.text("NOW", 1470, 460, { size: DS.type.body, t: W(57, 19), parent: now }); fadeG(S, now, W(57, 19));
  card(S, "REBUILT FROM PIECES", 1380, 190, { t: W(57, 11), fill: "yellow" });
}, { cam: "none" });
// 57 "Each time, your brain rebuilds the scene from pieces, using what you know now."
const PIECES = [["sky", 0, 0], ["sky", 1, 0], ["sky", 2, 0], ["grass", 0, 1], ["grass", 1, 1], ["grass", 2, 1]];
// 58 "As one researcher on the study put it, we pull together everything in the present"
shot(58, 0, (S) => {
  bg(S, LAB);
  doc(S, 380, 950, { s: 1.2, face: "smile" });
  panel(S, 1150, 480, 1120, 440, W(58, 6));
  txt(S, "“WE PULL TOGETHER", 1150, 390, { t: W(58, 8), size: DS.type.title });
  txt(S, "EVERYTHING IN", 1150, 490, { t: W(58, 10), size: DS.type.title });
  txt(S, "THE PRESENT”", 1150, 590, { t: W(58, 12), size: DS.type.title, c: DS.c("red", 2) });
}, { cam: "none" });
// 58 "to come up with an approximation of the past."
shot(58, 16, (S) => {
  field(S, "wall", 1);
  panel(S, 560, 530, 640, 440, T0(S)); PARK(S, 290, 360, 0.28);
  panel(S, 1360, 530, 640, 440, W(58, 18)); const ap = S.grp(); PARK(S, 1090, 360, 0.28); 
  card(S, "THE PAST", 560, 190, { t: T0(S), size: DS.type.caption });
  card(S, "AN APPROXIMATION", 1360, 190, { t: W(58, 20), size: DS.type.caption, fill: "yellow" });
  S.fill(rect(1050, 330, 620, 400), W(58, 19), 0.5, DS.c("white"), 0.55);
  txt(S, "≈", 960, 560, { t: W(58, 19), size: DS.type.display });
}, { cam: "none" });
// 59 "So I remember everything, and some of it is wrong?"
shot(59, 0, (S) => {
  bg(S, "scene-park-day");
  daveTalk(S, 700, 950, { s: 1.3, face: "confused", pose: "scratch-head" }, 59);
  think(S, 700, 950 - HEAD * 1.3, { s: 0.8, t: W(59, 4), pic: "ep46-binder", picO: { view: "front", label: "SOME OF IT|IS WRONG?", c: "red", bw: 190, bh: 230 }, picS: 0.9, picY: 100, seed: 15, dx: 330 });
}, { cam: "push" });
// 60 "Yes, Dave. But with total confidence."
shot(60, 0, (S) => {
  bg(S, "scene-park-day");
  dave(S, 520, 950, { s: 1.25, face: "flat", pose: "cross" });
  binder(S, 1320, 900, "NEVER|HAPPENED", { view: "front", c: "purple", bw: 260, bh: 330, s: 1.6, t: W(60, 0) });
  stamp(S, "100% SURE", 1320, 780, "green", W(60, 4), { s: 0.85 });
  card(S, "TOTAL CONFIDENCE", 1000, 140, { t: W(60, 3), fill: "yellow" });
}, { cam: "none" });
// 61 "Dave, I am now certain of fifty things that never happened."
shot(61, 0, (S) => {
  bg(S, "room-library-light");
  brainTalk(S, 620, 940, 1.5, "smile", 61, {});
  panel(S, 1330, 470, 640, 400, W(61, 4));
  countUp(S, 1330, 520, 0, 50, W(61, 6), 1.6, { size: DS.type.display, c: DS.c("red", 2), anchor: "middle", t0: W(61, 4) });
  txt(S, "THINGS THAT", 1330, 590, { t: W(61, 8), size: DS.type.caption }); txt(S, "NEVER HAPPENED", 1330, 645, { t: W(61, 8), size: DS.type.caption });
}, { cam: "push" });
// 61 "I have binders for all of them."
shot(61, 11, (S) => {
  bg(S, "room-library-light");
  brainTalk(S, 520, 940, 1.5, "smile", 61, { armR: "point" });
  shelf(S, 1300, 950, 20, { s: 1.0, rows: 4, wd: 380, t: W(61, 13) });
  card(S, "BINDERS FOR ALL OF THEM", 1300, 130, { t: W(61, 13), fill: "yellow" });
}, { cam: "pull" });
