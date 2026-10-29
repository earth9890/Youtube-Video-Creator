// ===================== chapter 2: The bear (clips 9-18) =====================
const woods = (S) => bg(S, "world-snow-forest");
// 9 "Start with the bear. In 2011, researchers at the University of Alaska Fairbanks watched black bears hibernate in dens built for the study."
shot(9, 0, (S) => {
  woods(S);
  L.put(S, "ep47-den", 1330, 880, { s: 0.8, zzz: true });
  sci(S, 380, 930, { style: "man06", s: 1.1, t: W(9, 8) });
  sci(S, 640, 930, { style: "girl06", s: 1.1, t: W(9, 9) });
  card(S, "THE BLACK BEAR", 1330, 130, { t: W(9, 3), fill: "yellow" });
  card(S, "2011 · ALASKA FAIRBANKS", 640, 130, { t: W(9, 5), size: DS.type.caption });
});
shot(9, 19, (S) => {
  woods(S);
  L.put(S, "ep47-den", 960, 880, { s: 1.1, logs: true, zzz: true });
  card(S, "A DEN BUILT FOR THE STUDY", 960, 130, { t: W(9, 20) });
}, { cam: "zoom", focus: "960 600" });
// 10 "The bears spent five to seven months without eating, drinking, urinating or defecating."
shot(10, 0, (S) => {
  field(S, "sky", 1);
  months(S, 960, 500, { s: 1.25, names: ["NOV", "DEC", "JAN", "FEB", "MAR", "APR", "MAY"], hi: [0, 1, 2, 3, 4, 5, 6], goal: -1 });
  card(S, "FIVE TO SEVEN MONTHS", 960, 200, { t: W(10, 3), fill: "yellow" });
  L.put(S, "ep47-bear", 960, 900, { s: 0.7, sleep: true });
});
shot(10, 7, (S) => {
  field(S, "sky", 1);
  const X = [330, 770, 1190, 1590], items = [["prop-apple", 1.8, "NO EATING"], ["p2-water-drop", 2.4, "NO DRINKING"], ["furn-toilet", 1.5, "NO URINATING"], ["p2-toilet-paper", 2.2, "NO DEFECATING"]];
  items.forEach(([n, k, lab], i) => {
    const t = W(10, 8 + i);
    L.put(S, n, X[i], n === "furn-toilet" ? 640 : 500, { s: k, color: "water" });
    xMark(S, X[i], 500, 2.4, t + 0.4);
    card(S, lab, X[i], 760, { size: DS.type.caption });
  });
}, { cam: "push" });
// 11 "Their metabolism dropped to about twenty-five percent of normal."
shot(11, 0, (S) => {
  field(S, "paper", 1);
  const a = L.put(S, "ep47-dial", 960, 610, { s: 1.9, v: 1, label: "NORMAL" });
  swap(a, L.put(S, "ep47-dial", 960, 610, { s: 1.9, v: 0.25, label: "25 %", c: "orange", t: W(11, 2) }), W(11, 2), 0.8);
  card(S, "METABOLISM", 960, 150, { fill: "yellow" });
  L.put(S, "ep47-bear", 360, 880, { s: 0.8, sleep: true, t: W(11, 3) });
}, { cam: "push" });
// 12 "A seventy-five percent discount on being alive."
shot(12, 0, (S) => {
  field(S, "pink", 1);
  L.put(S, "ep-heart", 760, 580, { s: 3.4 });
  card(S, "75% OFF", 1330, 400, { size: DS.type.display, fill: "yellow", t: W(12, 3) });
  card(S, "BEING ALIVE", 1330, 600, { t: W(12, 5) });
}, { cam: "push" });
// 13 "Here is the strange part. Their core temperature fell by only five or six degrees. Normally, chemistry slows by about half for every ten degrees of cooling."
shot(13, 0, (S) => {
  field(S, "sky", 1);
  L.put(S, "ep47-thermo", 760, 800, { s: 1.4, min: 20, max: 40, val: 31 });
  const y = (d) => 800 + 40 * 1.4 - (d - 20) / 20 * 520 * 1.4 - 40 * 1.4;
  S.draw(`M600 ${y(37)} H980`, W(13, 7), 0, { c: DS.c("red"), w: DS.w.mid });
  S.arrow(1060, y(37), 1060, y(31) - 6, W(13, 9), 0.5, { c: DS.c("red"), w: DS.w.near });
  card(S, "ONLY 5 OR 6 DEGREES", 1400, 450, { t: W(13, 10), fill: "yellow" });
  L.put(S, "ep47-bear", 1400, 900, { s: 0.8, sleep: true, t: W(13, 5) });
}, { cam: "push" });
shot(13, 15, (S) => {
  field(S, "paper", 1);
  L.put(S, "sci-flask", 260, 560, { s: 2.2 });
  card(S, "CHEMISTRY", 260, 820, {});
  L.put(S, "ep47-thermo", 600, 800, { s: 1.2, min: 20, max: 40, val: 30 });
  S.arrow(840, 330, 840, 770, W(13, 22), 0.5, { c: DS.c("blue"), w: DS.w.near });
  card(S, "-10 DEGREES", 1060, 560, { size: DS.type.caption });
  L.put(S, "ep47-dial", 1540, 600, { s: 1.4, v: 0.5, label: "HALF SPEED", c: "orange" });
});
// 14 "So the bears did far more than the cold alone could explain."
shot(14, 0, (S) => {
  field(S, "paper", 1);
  card(S, "BEARS VS COLD", 960, 160, { fill: "yellow" });
  hbar(S, "THE BEARS", 560, 430, 1000, 0.75, "orange", S.start, "-75 %");
  hbar(S, "COLD ALONE", 560, 640, 1000, 0.3, "sky", S.start + 0.3, "A BIT");
  L.put(S, "ep47-bear", 360, 900, { s: 0.7, sleep: true, t: W(14, 2) });
});
// 15 "Their heart rate slowed from about fifty-five beats a minute to about fourteen."
shot(15, 0, (S) => {
  field(S, "pink", 1);
  const h = S.grp(); L.put(S, "ep-heart", 640, 520, { s: 3, parent: h });
  beats(h, 640, 520, S.start + 0.4, END(15) + 3, 1.09, 4.3);
  countUp(S, 1300, 580, 55, 14, W(15, 3), END(15) - W(15, 3) - 0.8, { size: DS.type.display, c: DS.c("red", 2), anchor: "middle", t0: W(15, 0) });
  txt(S, "BEATS A MINUTE", 1300, 700, { size: DS.type.body });
  card(S, "THE BEAR'S HEART", 960, 150, { fill: "yellow" });
}, { cam: "push" });
// 16 "Their body temperature drifted between thirty and thirty-six degrees, in slow cycles of two to seven days."
shot(16, 0, (S) => {
  field(S, "paper", 1);
  const x0 = 300, x1 = 1640, yT = 340, yB = 640;
  S.draw(`M${x0} ${yT} H${x1}`, T0(S), 0, { c: DS.c("red", 1), w: DS.w.detail }); S.draw(`M${x0} ${yB} H${x1}`, T0(S), 0, { c: DS.c("blue", 1), w: DS.w.detail });
  txt(S, "36°", x0 - 30, yT + 18, { anchor: "end", size: DS.type.body }); txt(S, "30°", x0 - 30, yB + 18, { anchor: "end", size: DS.type.body });
  const pts = []; let ph = 0; for (let i = 0; i <= 120; i++) { const x = x0 + (x1 - x0) * i / 120, f = 0.05 + 0.1 * (i / 120) * (1 + Math.sin(i / 14)); ph += f; pts.push([x, (yT + yB) / 2 + Math.sin(ph * 2.2) * 120]); }
  const p = S.draw(smooth(pts), S.start, 0, { c: DS.c("orange", 2), w: DS.w.near }); drawOn(p, S.start - 0.4, END(16) - S.start - 1.5);
  card(S, "SLOW CYCLES · 2 TO 7 DAYS", 960, 800, { t: W(16, 13) });
  L.put(S, "ep47-bear", 1500, 250, { s: 0.45, sleep: true, t: W(16, 0) });
});
// 17 (@doc) "Dave, a bear is not napping. It is running almost everything at a quarter speed, on purpose."
shot(17, 0, (S) => {
  woods(S);
  L.put(S, "ep47-den", 1450, 880, { s: 0.75, zzz: true });
  docTalk(S, 430, 930, { s: 1.25, pose: "hold" }, 17);
  card(S, "DOC", 430, 150, { fill: "sky" });
  dave(S, 900, 930, { s: 1.25, face: "confused", pose: "scratch-head", t: W(17, 0) });
});
shot(17, 7, (S) => {
  field(S, "paper", 1);
  L.put(S, "ep47-dial", 960, 600, { s: 1.9, v: 0.25, label: "¼ SPEED", c: "orange" });
  card(S, "ON PURPOSE", 960, 150, { t: W(17, 15), fill: "yellow" });
  L.put(S, "ep47-bear", 360, 880, { s: 0.8, sleep: true });
}, { cam: "push" });
// 18 "Dave adds a second line to his sign: bladder not available."
shot(18, 0, (S) => {
  doorClose(S, 2, W(18, 8));
  dave(S, 540, 900, { s: 1.1, acc: GEAR, pose: "reach", face: "smug" });
}, { cam: "push" });
