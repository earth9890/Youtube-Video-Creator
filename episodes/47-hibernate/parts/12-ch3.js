// ===================== chapter 3: The squirrel (clips 19-27) =====================
// 19 "But a bear's trick starts in autumn. The arctic ground squirrel often doubles its body weight before it goes under. Fat is the fuel for the whole winter."
shot(19, 0, (S) => {
  bg(S, "scene-forest-sunset");
  L.put(S, "ep47-squirrel", 760, 900, { s: 1.7, t: W(19, 0) });
  L.put(S, "p2-acorn", 1160, 880, { s: 1.0, t: W(19, 5) });
  [[300, 300, "red"], [560, 200, "orange"], [1500, 260, "yellow"], [1250, 380, "orange"], [1700, 420, "red"]].forEach(([x, y, c], i) => L.put(S, "p2-leaf-" + c, x, y, { s: 2.2, rot: i * 40, t: W(19, 6) + i * 0.15 }));
  card(S, "AUTUMN", 960, 140, { t: W(19, 6), fill: "orange" });
}, { cam: "push" });
shot(19, 7, (S) => {
  field(S, "sand", 1);
  L.put(S, "ep47-squirrel", 560, 820, { s: 2.2, t: W(19, 7) });
  L.put(S, "ep47-squirrel", 1380, 820, { s: 2.2, fat: 1, t: W(19, 12), pop: true });
  S.arrow(780, 600, 1100, 600, W(19, 12), 0.5, { c: DS.c("ink"), w: DS.w.near });
  card(S, "BODY WEIGHT ×2", 960, 200, { t: W(19, 12), fill: "yellow" });
});
shot(19, 20, (S) => {
  field(S, "sand", 1);
  L.put(S, "ep47-squirrel", 700, 840, { s: 2.4, fat: 1 });
  L.put(S, "p2-battery-full", 1380, 600, { s: 3.2, level: 1, t: W(19, 21), pop: true });
  card(S, "FAT = FUEL", 1380, 840, { t: W(19, 21) });
  card(S, "THE WHOLE WINTER", 960, 170, { t: W(19, 24), fill: "yellow" });
});
// 20 "Then it spends seven to eight months in hibernation. Its out-of-office reply lasts most of the year."
shot(20, 0, (S) => {
  field(S, "sky", 1);
  months(S, 960, 250, { s: 0.88, names: ["OCT", "NOV", "DEC", "JAN", "FEB", "MAR", "APR", "MAY"], hi: [0, 1, 2, 3, 4, 5, 6, 7], goal: -1, tile: 140, t: W(20, 3) });
  L.put(S, "ep47-burrow", 960, 470, { s: 0.95, zzz: true });
  card(S, "SEVEN TO EIGHT MONTHS", 960, 110, { t: W(20, 3), fill: "yellow" });
}, { cam: "push" });
shot(20, 9, (S) => {
  field(S, "sky", 1);
  L.put(S, "ep47-burrow", 560, 430, { s: 0.85, zzz: true });
  panel(S, 1330, 520, 720, 560, T0(S));
  S.fill(rrect(970, 270, 720, 96, DS.r.md), T0(S), 0, DS.c("red", 0), 1);
  txt(S, "OUT OF OFFICE", 1330, 335, { size: DS.type.body, c: DS.P.white[0] });
  txt(S, "Hello. I am away", 1330, 470, { size: DS.type.small, t: W(20, 11) });
  txt(S, "until spring.", 1330, 540, { size: DS.type.small, t: W(20, 11) });
  txt(S, "Do not dig.", 1330, 640, { size: DS.type.small, t: W(20, 13), c: DS.c("red", 2) });
});
// 21 "Dave looks at his cupboards with a plan in his eyes."
shot(21, 0, (S) => {
  bg(S, "kit-room-kitchen-day");
  dave(S, 880, 950, { s: 1.35, face: "mischief", pose: "hips" });
  think(S, 880, 950 - HEAD * 1.35, { s: 0.58, t: W(21, 7), pic: "ep47-squirrel", picO: { fat: 1 }, picS: 1.5, picY: 60, dx: 170, seed: 21 });
}, { cam: "push" });
// 22 "To be clear, this is a thought experiment. Please don't try any of this."
shot(22, 0, (S) => {
  field(S, "paper", 1);
  dave(S, 560, 920, { s: 1.5, face: "worried", pose: "shrug" });
  card(S, "A THOUGHT EXPERIMENT", 1260, 360, { size: DS.type.body });
  L.put(S, "sign-cross-badge", 1260, 620, { s: 2.0, pop: true });
  card(S, "PLEASE DON'T TRY THIS", 1260, 840, { fill: "yellow" });
});
// 23 "The squirrel goes further than the bear. In 1987, a biologist at the University of Alaska Fairbanks, Brian Barnes, fitted twelve arctic ground squirrels with temperature transmitters."
shot(23, 0, (S) => {
  bg(S, "world-snow-forest");
  L.put(S, "ep47-bear", 500, 900, { s: 1.1 });
  L.put(S, "ep47-squirrel", 1300, 900, { s: 1.5, t: W(23, 1) });
  S.arrow(700, 640, 1080, 640, W(23, 3), 0.5, { c: DS.c("red"), w: DS.w.near });
  card(S, "GOES FURTHER", 960, 150, { t: W(23, 3), fill: "yellow" });
});
shot(23, 10, (S) => {
  bg(S, "world-snow-forest");
  sci(S, 620, 930, { style: "man06", s: 1.4 });
  card(S, "BRIAN BARNES", 620, 130, { t: W(23, 18), fill: "sky" });
  card(S, "BIOLOGIST · UNIVERSITY OF ALASKA FAIRBANKS", 1140, 380, { t: W(23, 11), size: DS.type.caption });
  card(S, "1987", 1140, 540, { t: W(23, 8), size: DS.type.title });
});
shot(23, 21, (S) => {
  field(S, "sky", 1);
  for (let i = 0; i < 12; i++) {
    const x = 400 + (i % 4) * 380, y = 400 + Math.floor(i / 4) * 230, t = W(23, 21) + i * 0.14;
    L.put(S, "ep47-squirrel", x, y + 110, { s: 0.82, t });
    S.draw(`M${x + 6} ${y + 24} v-44`, t + 0.3, 0, { c: DS.c("ink"), w: DS.w.detail }); S.fill(circ(x + 6, y - 24, 9), W(23, 26), 0, DS.c("red"), 1);
  }
  card(S, "12 SQUIRRELS · TRANSMITTERS", 960, 130, { t: W(23, 25), fill: "yellow" });
});
// 24 "Their bodies cooled below freezing. Minus two point nine degrees Celsius: the lowest body temperature ever recorded in a mammal."
shot(24, 0, (S) => {
  field(S, "sky", 1);
  L.put(S, "ep47-squirrel", 960, 850, { s: 2.8, sleep: true });
  [[360, 300], [1560, 340], [560, 640], [1400, 640], [900, 260]].forEach(([x, y], i) => L.put(S, "weather-snowflake", x, y, { s: 1.5, t: W(24, 2) + i * 0.15 }));
  card(S, "BELOW FREEZING", 960, 130, { t: W(24, 3), fill: "yellow" });
});
shot(24, 5, (S) => {
  field(S, "sky", 1);
  L.put(S, "ep47-thermo", 520, 770, { s: 1.25, min: -10, max: 40, val: -2.9 });
  countUp(S, 1280, 480, 0, -2.9, W(24, 5), 1.6, { fmt: (n) => n.toFixed(1).replace("-", "−") + " °C", size: DS.type.display, c: DS.c("blue", 2), anchor: "middle" });
  card(S, "LOWEST EVER IN A MAMMAL", 1280, 700, { t: W(24, 11), fill: "yellow" });
  L.put(S, "ep47-squirrel", 1480, 920, { s: 1.0, sleep: true, t: W(24, 12) });
});
// 25 (@dave) "Minus three? Fine. I'll just wear a very good hat."
shot(25, 0, (S) => {
  bg(S, "ep47-scene-door");
  daveTalk(S, 900, 905, { s: 1.6, acc: ["tophat", "scarf"], face: "smug", pose: "hips" }, 25);
}, { cam: "zoom", focus: "900 560" });
// 26 "A hat will not help, Dave. A Harvard researcher later pointed out that in humans, a drop of a couple of degrees leads to hypothermia and can be fatal."
shot(26, 0, (S) => {
  bg(S, "ep47-scene-door");
  dave(S, 900, 905, { s: 1.6, acc: ["tophat", "scarf"], face: "worried", pose: "hips" });
  xMark(S, 900, 905 - 400 * 1.6 + 10, 2.6, W(26, 3));
});
shot(26, 6, (S) => {
  field(S, "paper", 1);
  sci(S, 560, 930, { style: "girl06", s: 1.4 });
  card(S, "A HARVARD RESEARCHER", 560, 130, { t: W(26, 7), fill: "sky" });
  L.put(S, "bubble-round", 1260, 420, { s: 1.2, text: "In humans, a couple of degrees is trouble.", tail: "left", t: W(26, 12) });
});
shot(26, 15, (S) => {
  field(S, "paper", 1);
  dave(S, 560, 930, { s: 1.5, face: "worried", pose: "hug-self", acc: ["scarf"] });
  L.put(S, "ep47-thermo", 1060, 800, { s: 1.1, min: 30, max: 40, val: 35, t: W(26, 16) });
  S.draw(`M900 ${800 - 1.1 * 0.7 * 520} H1220`, W(26, 16), 0, { c: DS.c("red"), w: DS.w.mid });
  S.arrow(1280, 800 - 1.1 * 0.7 * 520, 1280, 800 - 1.1 * 0.5 * 520, W(26, 19), 0.5, { c: DS.c("blue"), w: DS.w.near });
  card(S, "A COUPLE OF DEGREES", 1620, 440, { t: W(26, 19), size: DS.type.caption });
  card(S, "HYPOTHERMIA", 1620, 590, { t: W(26, 24), fill: "sky" });
  card(S, "CAN BE FATAL", 1620, 720, { t: W(26, 26), fill: "yellow" });
});
// 27 "The squirrel's route is closed to us."
shot(27, 0, (S) => {
  bg(S, "world-snow-forest");
  dave(S, 480, 930, { s: 1.4, face: "sad", pose: "hips" });
  [760, 1160].forEach((x) => DS.shape(S, rrect(x - 18, 640, 36, 280, DS.r.xs), "wood", { w: "detail" }));
  DS.shape(S, rrect(740, 650, 440, 70, DS.r.xs), "red", { w: "mid" });
  for (let i = 0; i < 4; i++) DS.shape(S, `M${790 + i * 100} 650 l50 0 l-30 70 l-50 0 Z`, "white", { flat: true, w: "hair" });
  card(S, "ROUTE CLOSED", 960, 560, { t: W(27, 3), fill: "yellow" });
  L.put(S, "ep47-squirrel", 1560, 900, { s: 1.3, sleep: true });
}, { cam: "pull" });
