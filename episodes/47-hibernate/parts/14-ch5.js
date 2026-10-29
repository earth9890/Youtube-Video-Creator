// ===================== chapter 5: Where is the switch? (clips 36-47) =====================
// 36 "So far, Dave has three problems: the fat, the cold and the switch."
shot(36, 0, (S) => {
  field(S, "sky", 1);
  dave(S, 230, 950, { s: 1.2, face: "worried", pose: "hips" });
  const X = [660, 1060, 1470];
  panel(S, X[0], 520, 340, 420, T0(S)); panel(S, X[1], 520, 340, 420, T0(S)); panel(S, X[2], 520, 340, 420, T0(S));
  L.put(S, "ep47-squirrel", X[0], 640, { s: 1.5, fat: 1 });
  L.put(S, "ep47-thermo", X[1] - 30, 700, { s: 0.55, min: -10, max: 40, val: -2.9 });
  L.put(S, "ep47-switch", X[2], 520, { s: 0.8, on: false });
  [["THE FAT", W(36, 7)], ["THE COLD", W(36, 9)], ["THE SWITCH", W(36, 12)]].forEach(([s, t], i) => card(S, s, X[i], 780, { t, size: DS.type.caption }));
  card(S, "THREE PROBLEMS", 1000, 170, { t: W(36, 5), fill: "yellow" });
});
// 37 "What flips the switch? In 2020, a team at Harvard Medical School found a group of neurons in a mouse's hypothalamus that can start a torpor-like state."
shot(37, 0, (S) => {
  field(S, "paper", 1);
  L.put(S, "ep47-switch", 1130, 620, { s: 2.0, on: false });
  dave(S, 480, 930, { s: 1.4, face: "confused", pose: "scratch-head" });
  card(S, "WHAT FLIPS THE SWITCH?", 960, 140, { fill: "yellow" });
}, { cam: "push" });
shot(37, 6, (S) => {
  bg(S, "room-science-lab-light");
  sci(S, 560, 940, { style: "man06", s: 1.3 }); sci(S, 880, 940, { style: "girl06", s: 1.3, t: W(37, 8) });
  card(S, "2020 · HARVARD MEDICAL SCHOOL", 960, 140, { t: W(37, 5) });
  L.put(S, "animal-mouse", 1380, 940, { s: 2.2, t: W(37, 7) });
});
shot(37, 14, (S) => {
  field(S, "pink", 1);
  L.put(S, "ep-brain-blob", 960, 560, { s: 3.6 });
  [[800, 560], [880, 620], [960, 580], [1040, 640], [900, 520]].forEach(([x, y], i) => L.put(S, "ep-neuron-lit", x, y, { s: 0.7, t: W(37, 16) + i * 0.15, name: "blue" }));
  card(S, "A GROUP OF NEURONS", 960, 150, { t: W(37, 15), fill: "yellow" });
  card(S, "THE HYPOTHALAMUS", 1540, 760, { t: W(37, 21), size: DS.type.caption });
  S.arrow(1400, 720, 1010, 640, W(37, 21), 0.5, { c: DS.c("ink"), w: DS.w.near });
  L.put(S, "animal-mouse", 340, 860, { s: 1.6, t: W(37, 19) });
}, { cam: "push" });
shot(37, 22, (S) => {
  field(S, "sky", 1);
  L.put(S, "animal-mouse", 960, 800, { s: 3.0 });
  L.put(S, "fx-zzz", 1180, 460, { s: 1.6, t: W(37, 25) });
  card(S, "A TORPOR-LIKE STATE", 960, 150, { t: W(37, 25), fill: "yellow" });
});
// 38 "Stimulating them dropped the mice into torpor, and kept them there for days. Silencing them stopped fasting mice from entering torpor, but changed nothing in well-fed mice."
shot(38, 0, (S) => {
  field(S, "sky", 1);
  L.put(S, "ep47-switch", 380, 540, { s: 1.0, on: true });
  card(S, "STIMULATE", 380, 810, { t: W(38, 0), size: DS.type.caption });
  L.put(S, "ep-neuron-lit", 960, 540, { s: 2.2, name: "blue", t: W(38, 1) });
  S.arrow(1200, 540, 1360, 540, W(38, 2), 0.4, { c: DS.c("ink"), w: DS.w.near });
  L.put(S, "animal-mouse", 1560, 700, { s: 2.2, t: W(38, 4) }); L.put(S, "fx-zzz", 1720, 430, { s: 1.4, t: W(38, 6) });
  card(S, "FOR DAYS", 1560, 880, { t: W(38, 10), fill: "yellow" });
});
shot(38, 13, (S) => {
  field(S, "paper", 1);
  L.put(S, "ep-neuron", 960, 260, { s: 1.3 });
  card(S, "SILENCED", 960, 400, { size: DS.type.caption, t: W(38, 13) });
  L.put(S, "animal-mouse", 560, 800, { s: 2.6 }); card(S, "FASTING", 560, 560, { t: W(38, 16), size: DS.type.caption }); xMark(S, 560, 720, 2.2, W(38, 18)); card(S, "NO TORPOR", 560, 920, { t: W(38, 19), size: DS.type.caption });
  L.put(S, "animal-mouse", 1400, 800, { s: 3.3 }); card(S, "WELL-FED", 1400, 520, { t: W(38, 25), size: DS.type.caption }); card(S, "NO CHANGE", 1400, 920, { t: W(38, 22), size: DS.type.caption, fill: "yellow" });
});
// 39 "One of the team, Sinisa Hrvatin, said the first step is studying the basic biology of torpor in animals, and that this is not science fiction."
shot(39, 0, (S) => {
  field(S, "paper", 1);
  sci(S, 520, 940, { style: "man07", s: 1.4 });
  card(S, "SINISA HRVATIN", 520, 130, { fill: "sky" });
  L.put(S, "bubble-round", 1300, 440, { s: 1.4, text: "First, study the basic biology of torpor.", tail: "left", t: W(39, 6) });
});
shot(39, 20, (S) => {
  field(S, "paper", 1);
  sci(S, 520, 940, { style: "man07", s: 1.4 });
  card(S, "SINISA HRVATIN", 520, 130, { fill: "sky" });
  L.put(S, "bubble-round", 1300, 440, { s: 1.4, text: "It is not science fiction.", tail: "left", t: W(39, 22) });
});
// 40 "His colleague Michael Greenberg said it was far too soon to say whether this could be done in a human."
shot(40, 0, (S) => {
  field(S, "paper", 1);
  sci(S, 520, 940, { style: "man08", s: 1.4 });
  card(S, "MICHAEL GREENBERG", 520, 130, { fill: "sky" });
  L.put(S, "bubble-round", 1100, 380, { s: 1.3, text: "Far too soon to say.", tail: "left", t: W(40, 5) });
  dave(S, 1560, 940, { s: 1.0, face: "worried", pose: "shrug", t: W(40, 17) });
  card(S, "IN A HUMAN?", 1560, 560, { t: W(40, 17), size: DS.type.caption, fill: "yellow" });
});
// 41 (@dave) "Is there a button? Please tell me there is a button somewhere on me."
shot(41, 0, (S) => {
  field(S, "paper", 1);
  daveTalk(S, 960, 960, { s: 1.9, face: "worried", pose: "arms-out" }, 41);
  [[960, 960 - 372 * 1.9 + 10, W(41, 3)], [960, 960 - 190 * 1.9, W(41, 10)], [1060, 960 - 260 * 1.9, W(41, 12)]].forEach(([x, y, t]) => { S.fill(circ(x, y, 30), t, 0.3, DS.c("red"), 1); S.text("?", x, y + 14, { size: DS.type.small, t, c: DS.P.white[0], anchor: "middle" }); });
});
// 42 "There is one last hope. Maybe we already did it, long ago."
shot(42, 0, (S) => {
  bg(S, "scene-cave-night");
  [[540, 930], [960, 940], [1380, 930]].forEach(([x, y], i) => dave(S, x, y, { s: 0.85, pose: "lie-down", face: "sleep" }));
  card(S, "ONE LAST HOPE", 960, 130, { t: W(42, 2), fill: "yellow" });
  card(S, "LONG AGO", 960, 280, { t: W(42, 10) });
}, { cam: "push" });
// 43 "In 2020, two researchers argued that four-hundred-thousand-year-old bones from a cave in Spain carried winter damage like that of hibernating mammals."
shot(43, 0, (S) => {
  bg(S, "scene-cave-day");
  sci(S, 520, 940, { style: "man06", s: 1.3 }); sci(S, 820, 940, { style: "girl06", s: 1.3, t: W(43, 3), flip: false });
  card(S, "2020 · TWO RESEARCHERS ARGUE", 960, 130, { t: W(43, 3) });
});
shot(43, 7, (S) => {
  field(S, "sand", 1);
  L.put(S, "body-bone", 700, 560, { s: 2.6, rot: -20 });
  L.put(S, "crt-skeleton", 1360, 900, { s: 1.4, pose: "stand" });
  card(S, "400,000 YEARS OLD", 960, 140, { t: W(43, 7), fill: "yellow" });
  card(S, "A CAVE IN SPAIN", 960, 280, { t: W(43, 11) });
});
shot(43, 14, (S) => {
  field(S, "sand", 1);
  L.put(S, "body-bone", 760, 600, { s: 3.6, rot: -12 });
  ring(S, 760, 640, 300, 190, W(43, 14));
  card(S, "WINTER DAMAGE", 960, 150, { t: W(43, 15), fill: "yellow" });
  L.put(S, "ep47-bear", 1500, 860, { s: 1.0, sleep: true, t: W(43, 19) });
  card(S, "LIKE HIBERNATING MAMMALS", 1500, 560, { t: W(43, 19), size: DS.type.caption });
});
// 44 "Even the authors thought it would have been unhealthy, because those people could not have built bear-sized fat stores. A hibernation plan with no pantry."
shot(44, 0, (S) => {
  bg(S, "scene-cave-day");
  dave(S, 480, 930, { s: 1.4, face: "sad", pose: "stand", t: W(44, 5) });
  L.put(S, "p2-battery-low", 480, 250, { s: 1.8, level: 0.15, t: W(44, 12), pop: true });
  L.put(S, "ep47-bear", 1380, 930, { s: 1.5 });
  L.put(S, "p2-battery-full", 1380, 250, { s: 1.8, level: 1, t: W(44, 15), pop: true });
  card(S, "BEAR-SIZED FAT STORES", 960, 110, { t: W(44, 15), fill: "yellow" });
});
shot(44, 19, (S) => {
  field(S, "sand", 1);
  DS.shape(S, rrect(560, 200, 800, 620, DS.r.sm), "wood", { w: "mid" });
  DS.shape(S, rrect(590, 230, 740, 560, DS.r.xs), "paper", { w: "detail", flat: true });
  [420, 610].forEach((y) => DS.shape(S, rrect(590, y, 740, 26, DS.r.xs), "wood", { w: "detail" }));
  L.put(S, "p2-acorn", 960, 562, { s: 0.9, t: W(44, 21) });
  card(S, "NO PANTRY", 960, 110, { t: W(44, 22), fill: "yellow" });
});
// 45 "Critics pointed to other explanations, and said large mammals cannot cool enough to truly hibernate. They enter a lighter state called torpor."
shot(45, 0, (S) => {
  field(S, "paper", 1);
  sci(S, 560, 940, { style: "man09", s: 1.4, pose: "point" });
  card(S, "THE CRITICS", 560, 130, { t: W(45, 0), fill: "sky" });
  L.put(S, "bubble-round", 1300, 420, { s: 1.3, text: "Other explanations?", tail: "left", t: W(45, 2) });
});
shot(45, 7, (S) => {
  field(S, "sky", 1);
  L.put(S, "ep47-bear", 400, 900, { s: 1.4 });
  card(S, "TRUE HIBERNATION", 1360, 360, { t: W(45, 13), size: DS.type.body });
  xMark(S, 1360, 360, 3.4, W(45, 12));
  card(S, "A LIGHTER STATE: TORPOR", 1360, 760, { t: W(45, 20), fill: "yellow", size: DS.type.small });
});
// 46 (@doc) "Dave, nobody has found the switch in a person. Please stop pressing your own forehead."
shot(46, 0, (S) => {
  bg(S, "room-science-lab-light");
  docTalk(S, 520, 940, { s: 1.35, pose: "hold" }, 46);
  dave(S, 1250, 940, { s: 1.35, face: "worried", pose: "facepalm", t: W(46, 10) });
  card(S, "DOC", 520, 140, { fill: "sky" });
});
// 47 "Dave adds a fourth line to his sign: switch not found."
shot(47, 0, (S) => {
  doorClose(S, 4, W(47, 8));
  dave(S, 540, 900, { s: 1.1, acc: GEAR, pose: "reach", face: "smug" });
}, { cam: "push" });
