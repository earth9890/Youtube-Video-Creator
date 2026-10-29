// ===================== chapter 7: What forgetting is for (clips 62-68) =====================
const prof = (S, st, x, gy, o = {}) => { // a generic scientist: glasses + clipboard
  const s = o.s || 1.05, fl = o.flip ? -1 : 1;
  guy(S, st, x, gy, Object.assign({ s, acc: ["glasses"], pose: "hold", face: "smile" }, o));
  L.put(S, "p2-clipboard", x + fl * 78 * s, gy - 200 * s, { s: 0.62 * s, flip: o.flip, t: o.t });
};
// 62 "So what is memory for? In two thousand seventeen, the neuroscientists Blake Richards and Paul Frankland, at the University of Toronto, argued"
shot(62, 0, (S) => {
  bg(S, "scene-office-district-day");
  chap(S, "WHAT FORGETTING IS FOR");
  card(S, "WHAT IS MEMORY FOR?", 960, 270, { t: W(62, 3), fill: "yellow", size: DS.type.title });
  card(S, "TORONTO \u00B7 2017", 1450, 110, { t: W(62, 6) });
  prof(S, "man02", 600, 950, { s: 1.15, t: W(62, 11) });
  card(S, "RICHARDS", 600, 440, { t: W(62, 12), size: DS.type.caption, fill: "blue" });
  prof(S, "man08", 1320, 950, { s: 1.15, flip: true, t: W(62, 14) });
  card(S, "FRANKLAND", 1320, 440, { t: W(62, 15), size: DS.type.caption, fill: "blue" });
}, { cam: "none" });
// 62 "argued it is not storage."
shot(62, 21, (S) => {
  bg(S, "ep46-warehouse");
  xMark(S, 960, 520, 6.0, W(62, 24));
  card(S, "NOT STORAGE", 960, 140, { t: W(62, 24), fill: "yellow" });
  prof(S, "man02", 380, 950, { s: 1.0, face: "smile" });
}, { cam: "pull" });
// 63 "Richards said the real goal of memory is to optimize decision-making."
shot(63, 0, (S) => {
  bg(S, "scene-park-day");
  dave(S, 960, 950, { s: 1.25, face: "thinking", pose: "think" });
  arrowR(S, 800, 620, 560, 520, W(63, 8)); arrowR(S, 1120, 620, 1360, 520, W(63, 8) + 0.3);
  card(S, "THE REAL GOAL: DECISIONS", 960, 140, { t: W(63, 6), fill: "yellow" });
}, { cam: "push" });
// 63 "If your brain keeps surfacing old, conflicting memories, it gets harder to choose well."
shot(63, 11, (S) => {
  bg(S, "scene-park-day");
  dave(S, 960, 950, { s: 1.25, face: "dizzy", pose: "scratch-head" });
  [["GO LEFT!", 380, 360], ["GO RIGHT!", 1540, 360], ["THE OTHER WAY!", 960, 190]].forEach(([tx, x, y], i) => L.put(S, "bubble-round", x, y, { s: 0.6, text: tx, tail: i === 2 ? "left" : (i ? "left" : "right"), t: W(63, 15) + i * 0.5 }));
  card(S, "HARDER TO CHOOSE", 1480, 640, { t: W(63, 19), fill: "red" });
}, { cam: "none" });
// 64 "That is why it matters that the brain forgets irrelevant details."
shot(64, 0, (S) => {
  bg(S, "room-library-light");
  brain(S, 600, 940, 1.6, "smile", { armL: "up" });
  L.put(S, "p2-paper-bin", 1400, 880, { s: 2.2 });
  ["A RECEIPT", "A BUS NUMBER", "A RANDOM SONG"].forEach((tx, i) => { const g = panel(S, 960 + i * 60, 400 + i * 110, 330, 90, W(64, 8) + i * 0.4); S.text(tx, 960 + i * 60, 425 + i * 110, { size: DS.type.caption, t: W(64, 8) + i * 0.4, parent: g }); shift(g, W(64, 9) + i * 0.5 + 0.6, 1.2, [0, 0], [500 - i * 60, 380 - i * 110], "power2.in"); fadeOut(g, W(64, 9) + i * 0.5 + 1.7, 0.3); });
  card(S, "IRRELEVANT DETAILS", 960, 140, { t: W(64, 9), fill: "yellow" });
}, { cam: "none" });
// 64 "Old information becomes outdated, and keeping it around has a cost."
shot(64, 11, (S) => {
  field(S, "wall", 1);
  panel(S, 960, 540, 760, 520, T0(S), "yellow");
  txt(S, "OLD NEWS", 960, 440, { t: W(64, 11), size: DS.type.title });
  [0, 1, 2].forEach((i) => S.draw(`M700 ${520 + i * 50} H${1220 - i * 60}`, W(64, 11), 0, { c: DS.c("gray", 2), w: DS.w.near }));
  stamp(S, "OUTDATED", 1160, 700, "red", W(64, 14), { s: 1.3 });
  card(S, "KEEPING IT COSTS", 960, 140, { t: W(64, 17), fill: "yellow" });
}, { cam: "none" });
// 65 "Yesterday's parking space is the clearest case. By tomorrow, it is the most useless fact you own."
shot(65, 0, (S) => {
  bg(S, "scene-city-street-day");
  const car = L.put(S, "ride-car-parked", 960, 900, { s: 1.4, t: W(65, 1) }); fadeOut(car, W(65, 8), 0.8);
  psign(S, 1480, 560, 1.4, W(65, 2));
  const c1 = card(S, "YESTERDAY'S SPACE", 960, 140, { t: W(65, 0), fill: "yellow" }); fadeOut(c1.g, W(65, 8), 0.3);
  S.draw("M600 900 H1320", W(65, 8), 0.3, { c: DS.c("white"), w: DS.w.near });
  card(S, "TOMORROW", 960, 140, { t: W(65, 8) });
  dave(S, 460, 950, { s: 1.1, face: "smug", pose: "hips", t: W(65, 9) });
  stamp(S, "USELESS", 960, 560, "red", W(65, 12), { s: 0.9 });
}, { cam: "push" });
// 66 "Frankland's lab found that the growth of new neurons in the hippocampus seems to promote forgetting."
shot(66, 0, (S) => {
  field(S, "wall", 1);
  card(S, "FRANKLAND'S LAB", 960, 130, { fill: "blue" });
  L.put(S, "ep-brain-hippocampus", 760, 560, { s: 1.9, hippo: true });
  card(S, "THE HIPPOCAMPUS", 480, 900, { t: W(66, 11), size: DS.type.caption, fill: "yellow" });
  [[1260, 300, 7], [1480, 520, 8], [1250, 740, 9]].forEach(([x, y, w], i) => L.put(S, "ep-neuron-lit", x, y, { s: 0.8, lit: true, name: "green", t: W(66, w) + i * 0.1 }));
  card(S, "NEW NEURONS", 1500, 190, { t: W(66, 7), fill: "green" });
  arrowR(S, 1180, 840, 1100, 880, W(66, 13));
  card(S, "FORGETTING", 960, 900, { t: W(66, 15), fill: "yellow" });
}, { cam: "push" });
// 67 "Your brain grows new cells, in part, to let go. Here, growth means demolition."
shot(67, 0, (S) => {
  bg(S, "room-library-light");
  L.put(S, "kit-neuron-face", 560, 700, { s: 1.8, eyes: true, name: "green", t: W(67, 3) });
  shelf(S, 1340, 950, 12, { s: 1.0, rows: 2, wd: 380 });
  [0, 1, 2].forEach((i) => binder(S, 940 + i * 80, 940, "", { c: ["red", "blue", "orange"][i], rot: [70, 85, 75][i], t: W(67, 8) + i * 0.3 }));
  const c1 = card(S, "NEW CELLS, TO LET GO", 960, 140, { t: W(67, 6), fill: "yellow" }); fadeOut(c1.g, W(67, 10), 0.3);
  const ball = S.grp(); S.draw("M960 -40 V380", W(67, 10), 0.01, { c: DS.c("ink"), w: DS.w.near, parent: ball }); DS.shape(S, circ(960, 430, 70), "gray", { w: "near", parent: ball }); fadeG(S, ball, W(67, 10), 0.3);
  tl.fromTo(ball, { attr: { transform: "rotate(-32 960 -40)" } }, { attr: { transform: "rotate(14 960 -40)" }, duration: 2.4, ease: "power2.inOut", immediateRender: false }, W(67, 10));
  card(S, "GROWTH = DEMOLITION", 960, 140, { t: W(67, 11), fill: "yellow" });
}, { cam: "none" });
// 68 "The delete button Dave begged for was already installed."
shot(68, 0, (S) => {
  bg(S, "room-library-light");
  L.put(S, "ep46-delete-key", 960, 430, { s: 1.4 });
  card(S, "ALREADY INSTALLED", 960, 170, { t: W(68, 6), fill: "green" });
  dave(S, 400, 950, { s: 1.2, face: "wow", pose: "shocked" });
  brain(S, 1520, 950, 1.5, "smile", { armL: "up" });
}, { cam: "push" });
// 68 "It has been running his whole life."
shot(68, 9, (S) => {
  field(S, "wall", 1);
  S.draw("M240 760 H1700", T0(S), 0, { c: DS.c("ink"), w: DS.w.near });
  [["kid", 360, 0.6], ["kid", 760, 0.8], ["regular", 1160, 1.0], ["elderly", 1560, 1.0]].forEach(([b, x, k], i) => {
    guy(S, "man02", x, 760, { s: k * 0.9, body: i === 0 ? "baby" : b, face: "smile", t: i > 1 ? W(68, 11) + i * 0.4 : undefined });
    L.put(S, "ep46-delete-key", x, 300, { s: 0.45, t: i > 1 ? W(68, 11) + i * 0.4 : undefined });
  });
  card(S, "RUNNING HIS WHOLE LIFE", 960, 140, { fill: "yellow" });
}, { cam: "none" });
