// ===================== chapter 4: The lemur (clips 28-35) =====================
// 28 "So look for a hibernator in your own family. In Madagascar, the fat-tailed dwarf lemur hibernates for up to seven months in the dry season."
shot(28, 0, (S) => {
  bg(S, "room-living-room-light");
  [[560, 330], [960, 300], [1360, 330]].forEach(([x, y], i) => DS.frame(S, x - 110, y - 90, 220, 180, ["sky", "pink", "wall"][i]));
  [[560, 330], [960, 300], [1360, 330]].forEach(([x, y], i) => i < 2 && L.put(S, "animal-monkey", x, y + 80, { s: 0.45, t: W(28, 4) + i * 0.3 }));
  dave(S, 860, 950, { s: 1.35, face: "thinking", pose: "hold" });

  card(S, "IN YOUR OWN FAMILY", 960, 130, { t: W(28, 5), fill: "yellow" });
}, { cam: "push" });
shot(28, 9, (S) => {
  bg(S, "scene-jungle-day");
  L.put(S, "ep47-lemur", 960, 900, { s: 2.6, t: W(28, 11) });
  card(S, "MADAGASCAR", 560, 130, { t: W(28, 10), fill: "sky" });
  card(S, "FAT-TAILED DWARF LEMUR", 1320, 130, { t: W(28, 12), fill: "yellow" });
}, { cam: "zoom", focus: "960 620" });
shot(28, 16, (S) => {
  field(S, "sand", 1);
  months(S, 960, 480, { s: 1.15, names: ["APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT"], hi: [], goal: -1 });
  L.put(S, "sun-rays", 240, 190, { s: 0.9, t: W(28, 22) });
  L.put(S, "ep47-lemur", 520, 900, { s: 1.3, sleep: true, t: W(28, 16) });
  card(S, "UP TO SEVEN MONTHS", 960, 190, { t: W(28, 19), fill: "yellow" });
  card(S, "THE DRY SEASON", 1160, 780, { t: W(28, 23) });
});
// 29 "In 2004, researchers reported that these lemurs were the first primates known to hibernate. And they don't need cold at all."
shot(29, 0, (S) => {
  field(S, "sand", 1);
  L.put(S, "ep47-lemur", 760, 900, { s: 2.4, sleep: true, zzz: true });
  card(S, "2004", 1420, 330, { t: W(29, 0), size: DS.type.title });
  L.put(S, "sport-trophy", 1420, 640, { s: 2.2, t: W(29, 10), pop: true });
  card(S, "FIRST PRIMATE TO HIBERNATE", 1380, 880, { t: W(29, 11), size: DS.type.caption, fill: "yellow" });
}, { cam: "push" });
shot(29, 16, (S) => {
  field(S, "sand", 1);
  L.put(S, "ep47-lemur", 600, 900, { s: 2.2 });
  L.put(S, "weather-snowflake", 1280, 500, { s: 2.6, t: W(29, 19) });
  xMark(S, 1280, 500, 3.6, W(29, 21));
  card(S, "NO COLD NEEDED", 1280, 800, { t: W(29, 19), fill: "yellow" });
  L.put(S, "sun-rays", 1700, 200, { s: 1.1 });
});
// 30 "The lemurs settle in tree holes where the air regularly rises above thirty degrees, and their bodies simply follow the temperature of the hole."
shot(30, 0, (S) => {
  field(S, "dusk", 1);
  L.put(S, "ep47-tree-hole", 620, 1000, { s: 1.1 });
  const a = L.put(S, "ep47-thermo", 1330, 840, { s: 1.15, min: 20, max: 40, val: 23 });
  swap(a, L.put(S, "ep47-thermo", 1330, 840, { s: 1.15, min: 20, max: 40, val: 32, t: W(30, 9) }), W(30, 9), 0.9);
  card(S, "AIR · ABOVE 30°", 1330, 120, { t: W(30, 11), fill: "yellow" });
}, { cam: "push" });
shot(30, 14, (S) => {
  field(S, "dusk", 1);
  L.put(S, "ep47-tree-hole", 460, 1000, { s: 0.95 });
  const hole = L.put(S, "ep47-thermo", 1000, 840, { s: 1.1, min: 20, max: 40, val: 32 });
  card(S, "THE HOLE", 1000, 190, { size: DS.type.caption });
  const b = L.put(S, "ep47-thermo", 1500, 840, { s: 1.1, min: 20, max: 40, val: 23, t: W(30, 15) });
  swap(b, L.put(S, "ep47-thermo", 1500, 840, { s: 1.1, min: 20, max: 40, val: 32, t: W(30, 18) }), W(30, 18), 0.9);
  card(S, "THE LEMUR'S BODY", 1500, 190, { size: DS.type.caption, t: W(30, 15) });
  card(S, "=", 1250, 520, { size: DS.type.display, t: W(30, 20), fill: "yellow" });
});
// 31 "Their tails store the fat for the whole season. The animal is named after its best feature."
shot(31, 0, (S) => {
  field(S, "sand", 1);
  L.put(S, "ep47-lemur", 960, 930, { s: 2.9 });
  ring(S, 760, 880, 210, 120, W(31, 1));
  card(S, "FAT STORE", 520, 420, { t: W(31, 1), fill: "yellow" });
}, { cam: "push" });
shot(31, 9, (S) => {
  field(S, "sand", 1);
  L.put(S, "ep47-lemur", 960, 930, { s: 2.9 });
  L.put(S, "label-ribbon", 960, 190, { s: 1.8, text: "FAT-TAILED", size: DS.type.title, t: W(31, 12) });
  card(S, "NAMED AFTER ITS BEST FEATURE", 960, 300, { t: W(31, 13), size: DS.type.caption });
});
// 32 "In 2013, two more dwarf lemur species were found hibernating underground in cold mountain forest. The lead researcher said they look more like temperate hibernators than we thought."
shot(32, 0, (S) => {
  bg(S, "scene-snowy-mountains-day");
  L.put(S, "ep47-burrow", 960, 420, { s: 1.35, squirrel: false });
  L.put(S, "ep47-lemur", 840, 420 + 344 * 1.35, { s: 1.0, sleep: true, t: W(32, 4) });
  L.put(S, "ep47-lemur", 1130, 420 + 344 * 1.35, { s: 1.0, sleep: true, t: W(32, 5), flip: true });
  card(S, "2013 · TWO MORE SPECIES", 960, 120, { t: W(32, 3), fill: "yellow" });
  card(S, "UNDERGROUND · COLD MOUNTAIN FOREST", 960, 260, { t: W(32, 12), size: DS.type.caption });
});
shot(32, 17, (S) => {
  field(S, "paper", 1);
  sci(S, 520, 930, { style: "girl04", s: 1.4 });
  card(S, "THE LEAD RESEARCHER", 520, 130, { fill: "sky" });
  L.put(S, "bubble-round", 1260, 400, { s: 1.15, text: "More like temperate hibernators than we thought.", tail: "left", t: W(32, 21) });
  L.put(S, "ep47-lemur", 1560, 930, { s: 1.2, sleep: true, t: W(32, 24) });
});
// 33 "The thread running through all of them is not cold. It is scarcity. When food and water run short, a mammal can migrate, or it can turn its metabolism way down."
shot(33, 0, (S) => {
  field(S, "paper", 1);
  L.put(S, "ep47-bear", 400, 800, { s: 0.9, sleep: true });
  L.put(S, "ep47-squirrel", 960, 800, { s: 1.5, sleep: true });
  L.put(S, "ep47-lemur", 1480, 800, { s: 1.4, sleep: true });
  const thread = S.draw(smooth([[180, 560], [400, 640], [700, 540], [960, 640], [1240, 540], [1480, 640], [1760, 560]]), W(33, 3), 0, { c: DS.c("red"), w: DS.w.mid }); drawOn(thread, W(33, 3), 1.4);
  L.put(S, "weather-snowflake", 700, 300, { s: 1.8, t: W(33, 8) }); xMark(S, 700, 300, 2.8, W(33, 9));
  card(S, "NOT COLD", 700, 460, { t: W(33, 8), size: DS.type.caption });
  card(S, "SCARCITY", 1260, 330, { t: W(33, 10), fill: "yellow", size: DS.type.title });
}, { cam: "push" });
shot(33, 13, (S) => {
  field(S, "paper", 1);
  L.put(S, "food-apple-core", 380, 520, { s: 3.4, t: W(33, 14) }); L.put(S, "p2-water-drop", 760, 520, { s: 2.8, t: W(33, 16), color: "sky" });
  card(S, "FOOD AND WATER RUN SHORT", 560, 250, { t: W(33, 14), size: DS.type.caption });
  L.put(S, "story-fork-road", 1330, 940, { s: 0.95, left: "MIGRATE", right: "SLOW DOWN" });
}, { cam: "push" });
// 34 "Dave is a primate. The lemur is a very distant cousin who got the family's best trick."
shot(34, 0, (S) => {
  field(S, "sand", 1);
  dave(S, 420, 930, { s: 1.5, face: "proud", pose: "hips" });
  card(S, "PRIMATE", 420, 150, { t: W(34, 1), fill: "yellow", size: DS.type.title });
  L.put(S, "ep47-lemur", 1500, 930, { s: 2.0, t: W(34, 5) });
  dashed(S.draw(`M640 700 Q960 520 1260 700`, W(34, 7), 0, { c: DS.c("ink"), w: DS.w.near }), "6 20");
  card(S, "VERY DISTANT COUSIN", 960, 440, { t: W(34, 8), fill: "yellow" });
  card(S, "THE BEST TRICK", 1500, 400, { t: W(34, 14), size: DS.type.caption });
});
// 35 "Dave adds a third line to his sign: small tail, hot room."
shot(35, 0, (S) => {
  doorClose(S, 3, W(35, 8));
  dave(S, 540, 900, { s: 1.1, acc: GEAR, pose: "reach", face: "smug" });
}, { cam: "push" });
