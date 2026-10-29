// ===================== chapter 4: Everything (clips 28-39) =====================
const OFFICE = "room-office-light";
// 28 "Something like that has happened once. In the nineteen twenties, the Russian psychologist Alexander Luria met a newspaper reporter who appears in his book only as S."
shot(28, 0, (S) => {
  bg(S, OFFICE);
  chap(S, "EVERYTHING");
  card(S, "HAPPENED ONCE", 1300, 110, { t: W(28, 4), fill: "yellow" });
  card(S, "1920s \u00B7 RUSSIA", 960, 250, { t: W(28, 7) });
  luria(S, 440, 950, { s: 1.15, t: W(28, 12) });
  card(S, "LURIA", 440, 330, { t: W(28, 13), fill: "blue" });
  ss(S, 1500, 950, { s: 1.15, face: "smile", flip: true, t: W(28, 16) });
  L.put(S, "ep-newspaper", 1330, 720, { s: 0.8, t: W(28, 17) });
  L.put(S, "prop-book-closed", 960, 640, { s: 2.4, t: W(28, 20) });
  txt(S, "S.", 960, 700, { t: W(28, 25), size: DS.type.display });
  card(S, "ONLY AS S.", 960, 400, { t: W(28, 24), fill: "orange" });
}, { cam: "none" });
// 29 "S. had been scolded for not taking notes at a meeting,"
shot(29, 0, (S) => {
  bg(S, OFFICE);
  L.put(S, "furn-desk", 960, 960, { s: 1.5 });
  ss(S, 480, 950, { s: 1.15, face: "worried" });
  guy(S, "man09", 1400, 950, { s: 1.15, face: "angry", flip: true, pose: "point" });
  L.put(S, "bubble-round", 1330, 300, { s: 0.7, text: "WHERE ARE YOUR NOTES?", tail: "right", t: W(29, 4) });
  card(S, "SCOLDED", 480, 170, { t: W(29, 3), fill: "red" });
}, { cam: "push" });
// 29 "so he recited the whole speech word for word."
shot(29, 11, (S) => {
  bg(S, OFFICE);
  L.put(S, "furn-desk", 960, 960, { s: 1.5 });
  ss(S, 520, 950, { s: 1.15, face: "smug", pose: "armsUp" });
  guy(S, "man09", 1400, 950, { s: 1.15, face: "wow", flip: true });
  L.put(S, "bubble-round", 620, 290, { s: 0.85, text: "WORD FOR WORD", tail: "left", t: W(29, 17) });
  [0, 1, 2, 3].forEach((i) => S.draw(`M900 ${300 + i * 46} H${1260 - (i % 2) * 90}`, W(29, 13) + i * 0.25, 0, { c: DS.c("gray", 1), w: DS.w.near }));
}, { cam: "none" });
// 30 "Luria read S. lists of thirty, fifty, even seventy numbers."
shot(30, 0, (S) => {
  bg(S, OFFICE);
  luria(S, 380, 950, { s: 1.15 });
  [["30", 5, 240], ["50", 6, 360], ["70", 8, 480]].forEach(([n, w, h], i) => {
    const x = 800 + i * 330; panel(S, x, 760 - h / 2, 220, h, W(30, w));
    for (let k = 0; k < h / 50 - 1; k++) S.draw(`M${x - 70} ${760 - h + 50 + k * 46} H${x + 70}`, W(30, w), 0, { c: DS.c("gray", 1), w: DS.w.near });
    card(S, n, x, 760 - h - 56, { t: W(30, w), fill: "yellow" });
  });
}, { cam: "none" });
// 30 "S. closed his eyes, and repeated every one."
shot(30, 10, (S) => {
  bg(S, OFFICE);
  ss(S, 600, 950, { s: 1.3, face: "sleep" });
  L.put(S, "bubble-round", 1180, 340, { s: 0.95, text: "7 3 9 1 4 2 8 6 0 5 ...", tail: "left", t: W(30, 15) });
  luria(S, 1560, 950, { s: 1.15, flip: true });
}, { cam: "push" });
// 31 "Twelve and sixteen years later, he could still recite the same lists."
shot(31, 0, (S) => {
  field(S, "wall", 1);
  ss(S, 500, 940, { s: 1.15, face: "smile" });
  L.put(S, "bubble-round", 1100, 350, { s: 0.85, text: "7 3 9 1 4 2 8 6 0 5 ...", tail: "left", t: W(31, 6) });
  S.draw("M300 700 H1640", T0(S), 0, { c: DS.c("ink"), w: DS.w.near });
  card(S, "12 YEARS LATER", 640, 780, { t: W(31, 0) });
  card(S, "16 YEARS LATER", 1200, 780, { t: W(31, 2) });
  card(S, "SAME LISTS", 960, 150, { t: W(31, 9), fill: "yellow" });
}, { cam: "none" });
// 32 "But a perfect memory is a terrible way to read a story."
shot(32, 0, (S) => {
  bg(S, "room-library-light");
  ss(S, 760, 950, { s: 1.2, face: "worried" });
  L.put(S, "prop-book-open", 1140, 780, { s: 2.0, t: W(32, 9) });
  card(S, "READING A STORY", 960, 140, { t: W(32, 9), fill: "yellow" });
}, { cam: "push" });
// 32 "Every word raised a picture, and every picture raised more pictures."
shot(32, 12, (S) => {
  field(S, "wall", 1);
  card(S, "ONE WORD", 960, 760, { fill: "yellow" });
  ss(S, 240, 940, { s: 1.0, face: "worried" });
  const t1 = [["prop-sandwich", 560], ["animal-cow", 960], ["weather-cloud-sun", 1360]], t2 = ["prop-calendar", "sign-star", "prop-tv", "cloud-rain", "prop-milk-carton", "animal-dog"];
  t1.forEach(([n, x], i) => { arrowR(S, 960, 690, x, 520, i ? W(32, 14) + i * 0.3 : T0(S)); think(S, x, 600, { s: 0.38, y: 480, t: i ? W(32, 14) + i * 0.3 : undefined, pic: n, picS: 0.8, noTail: true, seed: 30 + i }); });
  t2.forEach((n, i) => { const x = 340 + i * 250; think(S, x, 300, { s: 0.32, y: 230, t: W(32, 20) + i * 0.2, pic: n, picS: 0.7, noTail: true, seed: 40 + i }); });
}, { cam: "none" });
// 33 "Luria wrote that grasping even a simple passage became an endless uphill task."
shot(33, 0, (S) => {
  field(S, "sky", 1);
  DS.shape(S, "M-40 900 L1960 300 V1120 H-40 Z", "grass", { w: "mid" });
  L.put(S, "prop-book-closed", 1020, 440, { s: 3.4 });
  ss(S, 760, 700, { s: 1.0, face: "determined", pose: "push" });
  card(S, "AN ENDLESS UPHILL TASK", 960, 130, { fill: "yellow" });
}, { cam: "none" });
// 34 "Dave tries it on a note stuck to his fridge. It says: buy milk."
shot(34, 0, (S) => {
  bg(S, "kit-room-kitchen-day");
  panel(S, 420, 520, 260, 140, W(34, 6), "yellow"); txt(S, "BUY MILK", 420, 535, { t: W(34, 12), size: DS.type.caption });
  dave(S, 880, 950, { s: 1.2, face: "thinking", pose: "pointL" });
}, { cam: "push" });
// 35 "Buy milk. I remember the first milk. I remember every milk."
shot(35, 0, (S) => {
  bg(S, "kit-room-kitchen-day");
  daveTalk(S, 760, 950, { s: 1.25, face: "worried", pose: "scratch-head" }, 35);
  think(S, 760, 950 - HEAD * 1.25, { s: 0.45, t: W(35, 5), pic: "prop-milk-carton", picS: 1.2, seed: 3, dx: -260 });
  think(S, 760, 950 - HEAD * 1.25, { s: 0.45, t: W(35, 8), pic: "prop-milk-carton", picS: 1.2, seed: 4, dx: 240 });
  for (let i = 0; i < 9; i++) L.put(S, "prop-milk-carton", 1120 + (i % 3) * 120, 560 + Math.floor(i / 3) * 130, { s: 0.7, t: W(35, 9) + i * 0.15 });
  card(S, "EVERY MILK", 1240, 160, { t: W(35, 9), fill: "yellow" });
}, { cam: "none" });
// 35 "Brain, why am I crying at a cow?"
shot(35, 11, (S) => {
  bg(S, "scene-farm-day");
  daveTalk(S, 620, 950, { s: 1.25, face: "sob", pose: "stand" }, 35);
  L.put(S, "animal-cow", 1380, 940, { s: 1.6, t: W(35, 15) });
  brain(S, 620 + 14, 950 - HEAD * 1.25 + 14, 0.7, "worried", { t: W(35, 11) });
}, { cam: "push" });
// 36 "S. struggled with faces, too."
const faceHead = (S, x, y, r, shade, t, o = {}) => {
  const g = S.grp(o.parent); DS.shape(S, circ(x, y, r), "white", { flat: true, w: "near", parent: g });
  if (shade) S.fill(`M${x} ${y - r} A${r} ${r} 0 0 ${shade > 0 ? 1 : 0} ${x} ${y + r} Z`, T0(S), 0, DS.c("gray", 1), Math.abs(shade), g);
  S.draw(`M${x - r * 0.4} ${y - r * 0.15} v${r * 0.12} M${x + r * 0.4} ${y - r * 0.15} v${r * 0.12} M${x - r * 0.32} ${y + r * 0.35} Q${x} ${y + r * 0.55} ${x + r * 0.32} ${y + r * 0.35}`, T0(S), 0, { c: DS.c("ink"), w: DS.w.near, parent: g });
  return fadeG(S, g, t);
};
// 36 "S. struggled with faces, too. To him, a face was a pattern of light and shade that kept changing,"
shot(36, 0, (S) => {
  field(S, "wall", 1);
  ss(S, 240, 940, { s: 1.0, face: "confused" });
  card(S, "FACES", 240, 330, { fill: "yellow" });
  [[760, 0], [1080, 0.45], [1400, -0.7]].forEach(([x, sh], i) => { faceHead(S, x, 500, 130, sh, i ? W(36, 9) + i * 0.9 : T0(S)); });
  arrowR(S, 900, 500, 940, 500, W(36, 11)); arrowR(S, 1220, 500, 1260, 500, W(36, 13));
  card(S, "LIGHT AND SHADE", 1080, 190, { t: W(36, 12), fill: "yellow" });
  card(S, "KEPT CHANGING", 1080, 800, { t: W(36, 17) });
}, { cam: "none" });
// 36 "so someone he knew could look brand new."
shot(36, 19, (S) => {
  bg(S, "scene-city-street-day");
  ss(S, 640, 950, { s: 1.2, face: "smile", pose: "wave" });
  guy(S, "man03", 1280, 950, { s: 1.2, face: "worried", flip: true });
  L.put(S, "bubble-round", 640, 330, { s: 0.75, text: "Nice to meet you!", tail: "left", t: W(36, 24) });
  card(S, "BRAND NEW", 1280, 190, { t: W(36, 25), fill: "yellow" });
}, { cam: "none" });
// 37 "Luria summed it up like this. Many of us look for ways to improve our memories,"
shot(37, 0, (S) => {
  bg(S, "scene-park-day");
  luria(S, 220, 940, { s: 1.0 });
  card(S, "LURIA SUMS IT UP", 420, 130, { t: W(37, 1), fill: "blue" });
  [["girl02", 620, "prop-book-open"], ["man05", 960, "mind-brain-lit-memory"], ["girl08", 1300, "p2-clipboard"], ["man03", 1640, "prop-calendar"]].forEach(([st, x, pic], i) => {
    guy(S, st, x, 940, { s: 0.95, face: "determined", t: W(37, 7) + i * 0.35 });
    think(S, x, 940 - HEAD * 0.95, { s: 0.38, t: W(37, 9) + i * 0.35, pic, picS: 0.85, seed: 50 + i });
  });
  card(S, "IMPROVE MY MEMORY", 1300, 130, { t: W(37, 10), fill: "yellow" });
}, { cam: "none" });
// 38 "but none of us has to learn how to forget."
shot(38, 0, (S) => {
  bg(S, "scene-park-day");
  [["girl02", 360], ["man05", 800], ["girl08", 1240], ["man03", 1620]].forEach(([st, x], i) => guy(S, st, x, 940, { s: 0.95, face: "smile" }));
  binder(S, 960, 560, "HOW TO|FORGET", { view: "front", c: "blue", bw: 230, bh: 300, s: 1.15, t: W(38, 6) });
  xMark(S, 960, 410, 3.2, W(38, 7));
  card(S, "NOBODY NEEDS THIS", 960, 130, { t: W(38, 6), fill: "yellow" });
}, { cam: "none" });
// 38 "S. had the reverse problem."
shot(38, 10, (S) => {
  bg(S, "room-library-light");
  ss(S, 760, 950, { s: 1.2, face: "worried", pose: "facepalm" });
  L.put(S, "ep46-shelf", 1400, 950, { s: 1.0, n: 20, rows: 4, wd: 380, t: W(38, 11) });
  card(S, "THE REVERSE PROBLEM", 960, 130, { t: W(38, 12), fill: "orange" });
}, { cam: "push" });
// 39 "He reportedly wrote numbers on paper and burned them, hoping the fire would take the numbers with it. It did not."
shot(39, 0, (S) => {
  bg(S, OFFICE);
  const a = ss(S, 560, 950, { s: 1.2, face: "determined", pose: "hold" });
  const b = ss(S, 560, 950, { s: 1.2, face: "smile", pose: "hold" }); swap(a, b, W(39, 6));
  swap(b, ss(S, 560, 950, { s: 1.2, face: "flat", pose: "shrug" }), W(39, 17));
  card(S, "REPORTEDLY", 960, 130, { t: W(39, 1), fill: "yellow" });
  panel(S, 1060, 640, 340, 280, W(39, 3));
  NUMS.slice(0, 4).forEach((ln, i) => txt(S, ln, 1060, 570 + i * 52, { t: W(39, 4) + i * 0.25, size: DS.type.caption }));
  DS.shape(S, rrect(1500, 700, 240, 260, DS.r.sm), "gray", { w: "mid" });
  const f = L.put(S, "fx-fire", 1620, 650, { s: 1.0, t: W(39, 8) }); fadeOut(f, W(39, 16), 0.8);
  const n = txt(S, "7 3 9 1 4", 1620, 520, { t: W(39, 11), size: DS.type.small, c: DS.c("gray", 2) }); shift(n, W(39, 11), 3.0, [0, 0], [0, -130], "power1.out"); fadeOut(n, W(39, 14), 1.8);
  think(S, 560, 950 - HEAD * 1.2, { s: 0.7, t: W(39, 19), text: "7 3 9 1 4|2 8 6 0 5", size: DS.type.small, seed: 17, dx: 200 });
}, { cam: "none" });
