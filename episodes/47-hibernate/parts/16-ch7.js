// ===================== chapter 7: The twist (clips 59-71) =====================
const dark = (S) => bg(S, "ep47-scene-bedroom");
// 59 "So, what would happen if humans could hibernate? You would eat for months, then run at a quarter speed for several more."
shot(59, 0, (S) => {
  bg(S, "world-snow-forest");
  L.put(S, "ep47-bear", 420, 900, { s: 1.0, sleep: true });
  L.put(S, "ep47-squirrel", 860, 900, { s: 1.4, sleep: true });
  L.put(S, "ep47-lemur", 1190, 900, { s: 1.3, sleep: true });
  L.put(S, "ep47-bed", 1580, 930, { s: 0.7, t: W(59, 5), pop: true });
  card(S, "WHAT IF HUMANS COULD HIBERNATE?", 960, 130, { fill: "yellow", size: DS.type.small });
}, { cam: "pull" });
shot(59, 8, (S) => {
  field(S, "sky", 1);
  const g1 = S.grp(), g2 = S.grp();
  DS.shape(S, rrect(260, 440, 760, 110, DS.r.md), "green", { w: "detail", parent: g1 }); grow(g1, S.start, 260, 495, 1.4);
  DS.shape(S, rrect(1020, 440, 640, 110, DS.r.md), "blue", { w: "detail", parent: g2 }); grow(g2, S.start + 0.4, 1020, 495, 1.4);
  L.put(S, "prop-apple", 640, 300, { s: 2.2 }); card(S, "EAT FOR MONTHS", 640, 680, { t: W(59, 10), size: DS.type.caption });
  L.put(S, "ep47-dial", 1340, 310, { s: 0.9, v: 0.25, label: "¼", c: "orange" }); card(S, "QUARTER SPEED", 1340, 680, { t: W(59, 15), size: DS.type.caption });
  card(S, "SEVERAL MONTHS MORE", 1340, 780, { t: W(59, 19), size: DS.type.caption });
});
// 60 "And the first people to use it would probably be astronauts."
shot(60, 0, (S) => {
  field(S, "sky", 1);
  L.put(S, "job-astronaut", 460, 930, { s: 1.5 });
  L.put(S, "job-astronaut", 860, 930, { s: 1.15 });
  dave(S, 1360, 930, { s: 1.0, face: "worried", pose: "stand" });
  L.put(S, "ep47-sign", 1560, 640, { s: 0.3, lines: [SIGN[0]] });
  card(S, "FIRST IN LINE", 640, 150, { fill: "yellow" });
});
// 61 "Now, the one word Dave's sign gets wrong. It says April. Hibernation is not one long sleep."
shot(61, 0, (S) => {
  doorClose(S, 1);
  dave(S, 540, 900, { s: 1.1, acc: GEAR, pose: "think", face: "confused" });
  ring(S, 1295, 298, 150, 62, W(61, 10));
}, { cam: "push" });
shot(61, 11, (S) => {
  field(S, "sky", 1);
  const g = S.grp(); DS.shape(S, rrect(260, 440, 1400, 110, DS.r.md), "blue", { w: "detail", parent: g }); grow(g, W(61, 11), 260, 495, 1.2);
  L.put(S, "ep47-bed", 560, 360, { s: 0.5, t: W(61, 11) });
  xMark(S, 960, 495, 5, W(61, 13));
  card(S, "ONE LONG SLEEP", 960, 700, { t: W(61, 14), size: DS.type.title });
});
// 62 "Every two to three weeks, a hibernating arctic ground squirrel, still asleep, shivers and shakes for twelve to fifteen hours, until its body is back near thirty-seven degrees. Then it cools down again."
shot(62, 0, (S) => {
  field(S, "paper", 1);
  const ch = saw(S, 300, 260, 1340, 440, S.start + 0.1, W(62, 10) - S.start - 1.2);
  card(S, "EVERY 2 TO 3 WEEKS", 960, 140, { fill: "yellow" });
  L.put(S, "ep47-squirrel", 960, 930, { s: 0.9, sleep: true });
});
shot(62, 10, (S) => {
  field(S, "sky", 1);
  shiver(S, (w) => L.put(S, "ep47-squirrel", 960, 860, { s: 2.8, sleep: true, parent: w }), W(62, 12), W(62, 20));
  card(S, "STILL ASLEEP", 520, 200, { t: W(62, 10), size: DS.type.caption });
  card(S, "SHIVERING", 1400, 200, { t: W(62, 12), size: DS.type.caption });
  card(S, "12 TO 15 HOURS", 960, 150, { t: W(62, 15), fill: "yellow" });
});
shot(62, 20, (S) => {
  field(S, "paper", 1);
  const a = L.put(S, "ep47-thermo", 700, 800, { s: 1.4, min: 0, max: 40, val: 5 });
  const b = L.put(S, "ep47-thermo", 700, 800, { s: 1.4, min: 0, max: 40, val: 37, t: W(62, 24) });
  swap(a, b, W(62, 24), 1.4);
  const c = L.put(S, "ep47-thermo", 700, 800, { s: 1.4, min: 0, max: 40, val: 5, t: W(62, 29) });
  tl.fromTo(c, { opacity: 0 }, { opacity: 1, duration: 1.2, immediateRender: false }, W(62, 29)); tl.to(b, { opacity: 0, duration: 1.2 }, W(62, 29));
  card(S, "BACK NEAR 37°", 1250, 360, { t: W(62, 26), fill: "yellow" });
  card(S, "THEN IT COOLS DOWN AGAIN", 1250, 640, { t: W(62, 29), size: DS.type.caption });
  L.put(S, "ep47-squirrel", 1500, 930, { s: 1.2, sleep: true });
});
// 63 "If Dave were a squirrel, he would spend half of week three shivering at the ceiling. The body sets the alarm, and it has no snooze button."
shot(63, 0, (S) => {
  dark(S);
  shiver(S, (w) => L.put(S, "ep47-bed", 960, 925, { s: 1.5, face: "open", zzz: false, parent: w }), W(63, 12), W(63, 16), 5);
  card(S, "WEEK THREE", 960, 140, { t: W(63, 10), fill: "yellow" });
  card(S, "STARING AT THE CEILING", 960, 280, { t: W(63, 13), size: DS.type.caption });
}, { cam: "pull" });
shot(63, 16, (S) => {
  dark(S);
  L.put(S, "ep47-bed", 700, 925, { s: 1.2, face: "worried", zzz: false });
  L.put(S, "prop-alarm-clock", 1450, 500, { s: 3.2 });
  card(S, "SNOOZE", 1450, 900, { t: W(63, 24), size: DS.type.title });
  xMark(S, 1450, 880, 3.0, W(63, 25));
});
// 64 "That warm-up is expensive. In one lab study at two degrees above freezing, the warm-ups made up eighty-six percent of the energy cost of the whole winter."
shot(64, 0, (S) => {
  field(S, "sand", 1);
  L.put(S, "money-receipt", 960, 540, { s: 3.2 });
  L.put(S, "ep47-squirrel", 420, 900, { s: 1.4 });
  card(S, "EXPENSIVE", 960, 140, { t: W(64, 3), fill: "yellow" });
}, { cam: "push" });
shot(64, 7, (S) => {
  field(S, "sky", 1);
  L.put(S, "info-pie-fraction", 700, 560, { s: 2.0, pct: 86, text: "86 %", c: "red" });
  card(S, "WARM-UPS: 86 % OF THE WINTER'S ENERGY", 640, 130, { t: W(64, 14), size: DS.type.caption, fill: "yellow" });
  L.put(S, "ep47-thermo", 1440, 800, { s: 1.0, min: -15, max: 10, val: 2, t: W(64, 8) });
  card(S, "2° ABOVE FREEZING", 1440, 190, { t: W(64, 8), size: DS.type.caption });
});
// 65 "In a much colder burrow, the share fell to twenty-three percent."
shot(65, 0, (S) => {
  field(S, "sky", 1);
  const a = L.put(S, "info-pie-fraction", 700, 560, { s: 2.0, pct: 86, text: "86 %", c: "red" });
  swap(a, L.put(S, "info-pie-fraction", 700, 560, { s: 2.0, pct: 23, text: "23 %", c: "red", t: W(65, 7) }), W(65, 7), 1.0);
  L.put(S, "ep47-thermo", 1440, 800, { s: 1.0, min: -15, max: 10, val: -12, t: W(65, 2) });
  card(S, "MUCH COLDER BURROW", 1440, 190, { t: W(65, 2), size: DS.type.caption });
  card(S, "THE SHARE FELL", 700, 130, { t: W(65, 6), fill: "yellow" });
});
// 66 "So why wake at all? One idea is that the animals wake up to sleep. In 1991, researchers found that ground squirrels sleep during these warm-ups,"
shot(66, 0, (S) => {
  field(S, "paper", 1);
  card(S, "WHY WAKE AT ALL?", 960, 130, { fill: "yellow" });
  L.put(S, "fx-lightbulb", 960, 420, { s: 1.6, t: W(66, 6), pop: true });
  L.put(S, "ep47-squirrel", 520, 900, { s: 1.8 });
  S.arrow(820, 760, 1100, 760, W(66, 12), 0.5, { c: DS.c("ink"), w: DS.w.near });
  L.put(S, "ep47-squirrel", 1400, 900, { s: 1.8, sleep: true, zzz: true });
  card(S, "WAKE UP", 520, 560, { t: W(66, 11), size: DS.type.caption }); card(S, "TO SLEEP", 1400, 560, { t: W(66, 14), size: DS.type.caption });
});
shot(66, 15, (S) => {
  field(S, "paper", 1);
  const ch = saw(S, 300, 260, 1340, 440, S.start, 0.01, { spikes: 4 });
  [0, 1, 2, 3].forEach((k) => L.put(S, "fx-zzz", ch.x(k) + 90, ch.top + 40, { s: 0.45, t: W(66, 23) + k * 0.25 }));
  card(S, "1991 · THEY SLEEP DURING WARM-UPS", 960, 140, { t: W(66, 15), fill: "yellow", size: DS.type.caption });
});
// 67 "and that the need for sleep seemed to build in deep torpor."
shot(67, 0, (S) => {
  field(S, "sky", 1);
  L.put(S, "ep47-squirrel", 560, 880, { s: 2.2, sleep: true });
  hbar(S, "NEED FOR SLEEP", 1000, 560, 640, 0.9, "orange", W(67, 8), "");
  card(S, "DEEP TORPOR", 560, 460, { t: W(67, 10), size: DS.type.caption });
  card(S, "THE NEED SEEMED TO BUILD", 960, 150, { t: W(67, 6), fill: "yellow" });
});
// 68 "Later studies found mixed results. A twenty sixteen paper on dwarf lemurs put it plainly: it remains unclear."
shot(68, 0, (S) => {
  field(S, "paper", 1);
  panel(S, 640, 540, 520, 480, T0(S)); panel(S, 1280, 540, 520, 480, T0(S));
  tick(S, 640, 540, 5, S.start); xMark(S, 1280, 540, 5, W(68, 3));
  card(S, "MIXED RESULTS", 960, 150, { t: W(68, 3), fill: "yellow" });
});
shot(68, 5, (S) => {
  field(S, "paper", 1);
  panel(S, 960, 540, 1100, 560, T0(S));
  txt(S, "2016 · DWARF LEMURS", 960, 360, { size: DS.type.body, t: W(68, 5) });
  L.put(S, "ep47-lemur", 560, 760, { s: 1.0, sleep: true });
  card(S, "IT REMAINS UNCLEAR", 1200, 640, { t: W(68, 15), size: DS.type.title, fill: "yellow" });
});
// 69 "One more clue comes from the lemur. In hot tree holes, where its body passively warms above thirty degrees, it seems to get sleep-like states without waking."
shot(69, 0, (S) => {
  field(S, "sand", 1);
  L.put(S, "ep47-lemur", 960, 900, { s: 2.4 });
  card(S, "ONE MORE CLUE", 960, 150, { t: W(69, 2), fill: "yellow" });
});
shot(69, 7, (S) => {
  field(S, "dusk", 1);
  L.put(S, "ep47-tree-hole", 620, 1000, { s: 1.1 });
  L.put(S, "ep47-thermo", 1330, 840, { s: 1.15, min: 20, max: 40, val: 32, t: W(69, 8) });
  L.put(S, "sun-rays", 1760, 560, { s: 0.8, t: W(69, 8) });
  card(S, "HOT TREE HOLE · ABOVE 30°", 1330, 190, { t: W(69, 8), size: DS.type.caption, fill: "yellow" });
});
shot(69, 19, (S) => {
  field(S, "dusk", 1);
  L.put(S, "ep47-tree-hole", 620, 1000, { s: 1.1, zzz: true });
  think(S, 620, 1000 - 270 * 1.1, { s: 0.5, text: "zzz", size: DS.type.title, t: W(69, 22), dx: 420, y: 420, seed: 69 });
  card(S, "SLEEP-LIKE STATES", 1400, 560, { t: W(69, 22), fill: "yellow" });
  card(S, "WITHOUT WAKING", 1400, 700, { t: W(69, 25), size: DS.type.caption });
});
// 70 (@dave) "So I'd wake up, in the middle of my sleep, in order to sleep?"
shot(70, 0, (S) => {
  dark(S);
  L.put(S, "ep47-bed", 1300, 925, { s: 1.2, dave: false });
  daveTalk(S, 620, 940, { s: 1.5, face: "confused", pose: "scratch-head" }, 70);
  think(S, 620, 940 - HEAD * 1.5, { s: 0.75, text: "wake up|to sleep?", size: DS.type.small, t: W(70, 5), dx: 150, seed: 70 });
});
// 71 "Possibly, Dave. So hibernation is not skipping sleep. It may be a very long winter with a nap break, and a bill for every wake-up."
shot(71, 0, (S) => {
  dark(S);
  L.put(S, "ep47-bed", 960, 925, { s: 1.5, zzz: true });
  card(S, "NOT SKIPPING SLEEP", 960, 140, { t: W(71, 5), fill: "yellow" });
});
shot(71, 9, (S) => {
  field(S, "sky", 1);
  const g = S.grp(); DS.shape(S, rrect(220, 470, 1480, 100, DS.r.md), "blue", { w: "detail", parent: g }); grow(g, S.start - 0.3, 220, 520, 1.0);
  [420, 760, 1100, 1440].forEach((x, i) => { const w = 110; DS.shape(S, rrect(x - w / 2, 470, w, 100, DS.r.sm), "yellow", { w: "detail", t: W(71, 15) + i * 0.2 }); });
  card(S, "A VERY LONG WINTER", 960, 270, { t: W(71, 11), fill: "yellow" });
  card(S, "NAP BREAKS", 960, 740, { t: W(71, 16) });
});
shot(71, 19, (S) => {
  field(S, "sand", 1);
  [0, 1, 2].forEach((i) => L.put(S, "money-receipt", 620 + i * 340, 520 + (i % 2) * 40, { s: 2.0, rot: -6 + i * 6, t: i ? W(71, 21) + i * 0.25 : undefined, pop: true }));
  card(S, "A BILL FOR EVERY WAKE-UP", 960, 150, { t: W(71, 20), fill: "yellow" });
});
