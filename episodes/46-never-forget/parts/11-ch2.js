// ===================== chapter 2: The people who remember (clips 10-20) =====================
const LAB = "room-science-lab-light";
const stamp = (S, text, x, y, c, t, o = {}) => L.put(S, "stamp-nope", x, y, Object.assign({ text, c, s: 1.2, rot: -6, t }, o));
// 10 "This is not only a thought experiment. In two thousand six, scientists at the University of California, Irvine published..."
shot(10, 0, (S) => {
  bg(S, "scene-office-district-day");
  chap(S, "THE PEOPLE WHO REMEMBER");
  dave(S, 300, 950, { s: 1.05, face: "thinking", pose: "think" });
  think(S, 300, 950 - HEAD * 1.05, { s: 0.5, t: W(10, 3), pic: "ep46-shelf", picS: 0.34, picY: 80, picO: { n: 8, rows: 2 }, seed: 5, dx: 60 });
  stamp(S, "REAL", 780, 480, "green", W(10, 5));
  card(S, "UC IRVINE \u00B7 2006", 1450, 230, { t: W(10, 8) });
  doc(S, 1040, 950, { s: 1.1, face: "smile", flip: true, t: W(10, 9) });
  doc(S, 1360, 950, { s: 1.1, face: "happy", flip: true, t: W(10, 10) });
  panel(S, 1700, 600, 300, 400, W(10, 18));
  txt(S, "CASE REPORT", 1700, 470, { t: W(10, 18), size: DS.type.caption });
  [0, 1, 2, 3].forEach((i) => S.draw(`M1580 ${540 + i * 50} H${1820 - (i % 2) * 60}`, W(10, 19), 0, { c: DS.c("gray", 1), w: DS.w.near }));
}, { cam: "none" });
// 10 "...the case of a woman they called A J." + 11 "They described her memory as nonstop, uncontrollable and automatic."
shot(10, 19, (S) => {
  bg(S, LAB);
  const a = aj(S, 960, 950, { s: 1.2, face: "smile" });
  swap(a, aj(S, 960, 950, { s: 1.2, face: "worried" }), W(11, 2));
  L.put(S, "fx-glow-ring", 960, 950, { s: 1.0, t: W(10, 22) });
  card(S, "A.J.", 960, 160, { t: W(10, 25), fill: "purple" });
  doc(S, 380, 950, { s: 1.1, face: "smile" });
  const fs = S.grp(); L.put(S, "ep46-filmstrip", 1100, 330, { s: 0.9, frames: 5, parent: fs }); fadeG(S, fs, W(11, 0));
  shift(fs, W(11, 0), END(11) - W(11, 0), [-120, 0], [120, 0], "none");
  card(S, "NONSTOP", 1480, 470, { t: W(11, 5), fill: "yellow" });
  card(S, "UNCONTROLLABLE", 1480, 600, { t: W(11, 6) });
  card(S, "AUTOMATIC", 1480, 730, { t: W(11, 8) });
}, { cam: "none" });
// 12 "Give her any date from her life, and she could tell you the day of the week and what she was doing." + 13 "So the researchers tested her."
shot(12, 0, (S) => {
  bg(S, LAB);
  doc(S, 1500, 950, { s: 1.1, flip: true, face: "smile" });
  const a = aj(S, 620, 950, { s: 1.2, face: "thinking", pose: "think" });
  swap(a, aj(S, 620, 950, { s: 1.2, face: "happy", pose: "point" }), W(12, 8));
  const cal = L.put(S, "prop-calendar", 960, 360, { s: 2.0, t: W(12, 2) }); fadeOut(cal, W(12, 9), 0.4);
  const cd = card(S, "ANY DATE", 960, 160, { t: W(12, 2), fill: "yellow" }); fadeOut(cd.g, W(12, 9), 0.4);
  L.put(S, "bubble-round", 520, 330, { s: 0.7, text: "A THURSDAY", tail: "left", t: W(12, 12) });
  const th = think(S, 620, 950 - HEAD * 1.2, { s: 0.55, t: W(12, 17), pic: "prop-sandwich", picS: 1.2, seed: 8, dx: 330, y: 430 }); fadeOut(th, W(13, 1), 0.4);
  L.put(S, "ep-stopwatch", 1060, 560, { s: 1.1, t: W(13, 2) });
  card(S, "THE EASTER TEST", 960, 160, { t: W(13, 3), fill: "yellow" });
}, { cam: "none" });
// 13 "They asked for the date of Easter in every year from nineteen eighty to two thousand three."
shot(13, 5, (S) => {
  field(S, "wall", 1);
  card(S, "EASTER, EVERY YEAR", 960, 150, { fill: "yellow" });
  S.draw("M300 620 H1620", T0(S), 0, { c: DS.c("ink"), w: DS.w.near });
  for (let i = 0; i < 12; i++) { const x = 330 + i * 114; S.draw(`M${x} 600 V640`, T0(S), 0, { c: DS.c("ink"), w: DS.w.mid }); if (i % 2 == 0 || i > 8) L.put(S, "ep-egg", x, 520, { s: 0.75, c: ["pink", "sky", "yellow", "green"][i % 4], t: i ? W(13, 11) + i * 0.16 : undefined }); }
  card(S, "1980", 330, 730, { t: W(13, 16) });
  card(S, "2003", 1590, 730, { t: W(13, 19) });
  aj(S, 960, 940, { s: 0.7, face: "smile", t: W(13, 13) });
}, { cam: "none" });
// 14 "She got one wrong, by two days,"
const yearGrid = (S, t0) => {
  for (let i = 0; i < 24; i++) {
    const x = 300 + (i % 12) * 120, y = 440 + Math.floor(i / 12) * 150;
    panel(S, x, y, 96, 110, T0(S));
    if (i !== 10) tick(S, x, y, 1.0, T0(S));
  }
};
// 14 "She got one wrong, by two days, and corrected it herself when asked again two years later."
shot(14, 0, (S) => {
  field(S, "wall", 1);
  yearGrid(S, 0);
  const x = 300 + 10 * 120;
  xMark(S, x, 440, 1.1, W(14, 1));
  const c1 = card(S, "1 WRONG: 2 DAYS OFF", 960, 160, { t: W(14, 3), fill: "yellow" }); fadeOut(c1.g, W(14, 11), 0.4);
  const a = aj(S, 960, 940, { s: 0.7, face: "worried" });
  swap(a, aj(S, 960, 940, { s: 0.7, face: "smile", pose: "cheer" }), W(14, 9));
  S.fill(rect(x - 46, 386, 92, 108), W(14, 9), 0.3, DS.c("white"), 1); tick(S, x, 440, 1.1, W(14, 9));
  card(S, "2 YEARS LATER", 960, 160, { t: W(14, 13), fill: "green" });
}, { cam: "none" });
// 15 "They also asked what she had been doing on each of those days."
shot(15, 0, (S) => {
  bg(S, LAB);
  doc(S, 1400, 950, { s: 1.1, flip: true, face: "smile" });
  aj(S, 600, 950, { s: 1.2, face: "thinking", pose: "think" });
  L.put(S, "bubble-round", 1100, 360, { s: 0.75, text: "What were you doing?", tail: "right", t: W(15, 3) });
}, { cam: "push" });
// 15 "One answer, for one whole Sunday, was: house smells like ham."
shot(15, 13, (S) => {
  bg(S, LAB);
  aj(S, 560, 950, { s: 1.2, face: "smile" });
  card(S, "ONE WHOLE SUNDAY", 960, 140, { t: W(15, 15), fill: "yellow" });
  think(S, 560, 950 - HEAD * 1.2, { s: 0.75, t: W(15, 19), text: "HOUSE SMELLS|LIKE HAM", size: DS.type.small, seed: 14, dx: 200, y: 360 });
  L.put(S, "ep46-ham", 1450, 700, { s: 1.5, t: W(15, 22) });
  L.put(S, "fx-steam", 1450, 520, { s: 1.0, t: W(15, 23) });
}, { cam: "none" });
// 16 "In another test, the lead scientist told her a famous date was wrong by one day. She said no."
shot(16, 0, (S) => {
  bg(S, LAB);
  doc(S, 1400, 950, { s: 1.1, flip: true, face: "smile" });
  aj(S, 600, 950, { s: 1.2, face: "flat", pose: "cross" });
  L.put(S, "bubble-round", 1180, 330, { s: 0.75, text: "OFF BY ONE DAY", tail: "right", t: W(16, 8) });
  L.put(S, "bubble-round", 520, 330, { s: 0.7, text: "NO.", tail: "left", t: W(16, 17) });
}, { cam: "none" });
// 16 "He checked a second source, and the book was wrong."
shot(16, 19, (S) => {
  bg(S, LAB);
  doc(S, 660, 950, { s: 1.1, face: "smile", pose: "reach" });
  L.put(S, "prop-book-open", 1130, 700, { s: 2.0, t: W(16, 21) });
  L.put(S, "ep-magnifier", 880, 640, { s: 1.1, t: W(16, 22) });
  card(S, "SECOND SOURCE", 960, 140, { t: W(16, 21), fill: "yellow" });
  stamp(S, "WRONG", 1180, 480, "red", W(16, 27), { s: 0.8 });
  aj(S, 1680, 950, { s: 1.0, face: "smug", flip: true, pose: "hips" });
}, { cam: "none" });
// 17 "The scientists named it hyperthymesia,"
const word = (S, t) => { panel(S, 960, 480, 1360, 220, T0(S)); return txt(S, "HYPERTHYMESIA", 960, 520, { t, size: DS.type.display }); };
// 17 "The scientists named it hyperthymesia, a name the lead researcher later called a mistake,"
shot(17, 0, (S) => {
  bg(S, LAB);
  word(S, W(17, 4));
  const d1 = doc(S, 380, 950, { s: 1.1, face: "smile", pose: "point" }); swap(d1, doc(S, 380, 950, { s: 1.1, face: "sad", pose: "facepalm" }), W(17, 11));
  aj(S, 1540, 950, { s: 1.1, face: "flat", flip: true });
  S.draw("M300 520 L1620 440", W(17, 12), 0.5, { c: DS.c("red"), w: DS.w.near });
  stamp(S, "MISTAKE", 1500, 780, "red", W(17, 12));
}, { cam: "push" });
// 17 "because it sounds as if you know what it is."
shot(17, 14, (S) => {
  bg(S, LAB);
  word(S, T0(S));
  L.put(S, "fx-question-marks", 960, 270, { s: 1.0, t: W(17, 16) });
  card(S, "SOUNDS LIKE AN EXPLANATION", 960, 750, { t: W(17, 19), fill: "yellow" });
  doc(S, 380, 950, { s: 1.1, face: "confused", pose: "shrug" });
}, { cam: "none" });
// 18 "It isn't even new. In eighteen seventy-one, a journal described a blind man in Ohio"
shot(18, 0, (S) => {
  field(S, "sand", 1);
  panel(S, 560, 540, 600, 700, T0(S));
  txt(S, "A JOURNAL", 560, 330, { t: W(18, 4) });
  card(S, "1871", 560, 460, { fill: "yellow" });
  [0, 1, 2, 3, 4].forEach((i) => S.draw(`M320 ${540 + i * 50} H${800 - (i % 2) * 90}`, T0(S), 0, { c: DS.c("gray", 1), w: DS.w.near }));
  guy(S, "man04", 1360, 940, { s: 1.15, acc: ["sunglasses", "cap"], face: "smile", t: W(18, 10) });
  S.draw("M1450 690 L1570 940", W(18, 11), 0.3, { c: DS.c("ink"), w: DS.w.near }); S.draw("M1450 690 L1570 940", W(18, 11), 0.3, { c: DS.c("white"), w: DS.w.mid });
  card(S, "OHIO \u00B7 1871", 1360, 190, { t: W(18, 14), fill: "yellow" });
}, { cam: "push" });
// 18 "who recalled the weather for any date back to eighteen twenty-seven."
shot(18, 15, (S) => {
  field(S, "sky", 1);
  card(S, "1871", 1500, 780, { t: W(18, 5) });
  card(S, "1827", 420, 780, { t: W(18, 24) });
  arrowR(S, 1400, 650, 520, 650, W(18, 22));
  [["weather-cloud-sun", 1300], ["cloud-rain", 1080], ["sun-rays", 860], ["weather-cloud-sun", 640]].forEach(([n, x], i) => L.put(S, n, x, 420, { s: 1.0, t: i ? W(18, 17) + i * 0.5 : undefined }));
  card(S, "THE WEATHER, ANY DATE", 960, 140, { fill: "yellow" });
}, { cam: "none" });
// 19 "After a television programme about people with this memory aired,"
shot(19, 0, (S) => {
  bg(S, "room-living-room-light");
  L.put(S, "prop-tv", 960, 560, { s: 2.6 });
  card(S, "ON TELEVISION", 960, 150, { t: W(19, 2), fill: "yellow" });
  aj(S, 960, 600, { s: 0.55, face: "smile", t: W(19, 4) });
  L.put(S, "furn-sofa", 960, 960, { s: 1.5 });
}, { cam: "push" });
// 19 "more than six hundred emails arrived from viewers who thought they had it."
shot(19, 10, (S) => {
  bg(S, "scene-suburb-day");
  [["girl02", 300], ["man05", 620], ["man03", 1300], ["girl06", 1620]].forEach(([st, x], i) => {
    guy(S, st, x, 940, { s: 0.95, face: "thinking", t: W(19, 16) + i * 0.2 });
    think(S, x, 940 - HEAD * 0.95, { s: 0.38, t: W(19, 18) + i * 0.3, text: "ME?", size: DS.type.small, seed: 20 + i });
  });
  L.put(S, "ep46-envelope-pile", 960, 950, { s: 1.5, n: 30, t: W(19, 11) });
  panel(S, 960, 280, 540, 200, W(19, 11));
  countUp(S, 960, 330, 0, 600, W(19, 11), 2.2, { fmt: (n) => Math.round(n) + "+", size: DS.type.display, anchor: "middle", c: DS.c("red", 2), t0: W(19, 11) });
  card(S, "EMAILS", 960, 120, { t: W(19, 14), fill: "yellow" });
}, { cam: "none" });
// 20 "By twenty eleven, the researchers had confirmed twenty-two."
shot(20, 0, (S) => {
  field(S, "wall", 1);
  card(S, "BY 2011", 960, 130, { t: W(20, 1), fill: "yellow" });
  L.put(S, "ep46-envelope-pile", 480, 900, { s: 1.2, n: 18 });
  txt(S, "600+ EMAILS", 480, 640, { size: DS.type.body });
  for (let i = 0; i < 22; i++) { const g = mini(S, 1000 + (i % 8) * 90, 480 + Math.floor(i / 8) * 150, 1.15, { t: W(20, 5) + i * 0.1 }); }
  countUp(S, 1360, 300, 0, 22, W(20, 5), 2.2, { size: DS.type.display, c: DS.c("red", 2) });
  txt(S, "CONFIRMED", 1360, 380, { t: W(20, 6), size: DS.type.small });
}, { cam: "none" });
