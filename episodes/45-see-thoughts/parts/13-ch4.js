// ===================== chapter 4: Day two: the train (clips 36-48) =====================
const train = (S, o = {}) => {
  L.put(S, "ride-subway-interior", 960, 1010, { s: 2.15, crowd: true });
  if (o.crowd !== false) [["man02", 300, "flat"], ["girl05", 590, "bored"], ["man07", 1330, "tired"], ["girl09", 1620, "flat"]].forEach(([st, x, f]) => guy(S, st, x, 975, { s: 1.0, face: f }));
};
// 36 "Day two. Rush hour. Dave squeezes onto a train with about a hundred other people, and a hundred bubbles."
shot(36, 0, (S) => {
  train(S);
  dave(S, 960, 975, { s: 1.0, face: "nervous" });
  L.put(S, "fx-sweat-drops", 1010, 560, { s: 0.5, t: W(36, 5) });
  L.put(S, "thought-flood", 960, 270, { s: 0.95, n: 32, seed: 361, t: W(36, 16) });
  clock(S, "DAY 2");
});
// 37 "Shopping lists, old arguments, a song stuck on repeat, a dog someone saw in 2012."
shot(37, 0, (S) => {
  field(S, "sky", 1);
  L.put(S, "thought-flood", 960, 540, { s: 1.15, n: 34, seed: 371 }).setAttribute("opacity", 0.35);
  L.put(S, "thought-pic", 330, 470, { s: 0.6, noTail: true, text: "milk|eggs|bread", seed: 372, t: W(37, 0) });
  L.put(S, "thought-pic", 760, 640, { s: 0.6, noTail: true, text: "I SHOULD|HAVE SAID...", seed: 373, t: W(37, 2) });
  L.put(S, "thought-pic", 1170, 440, { s: 0.6, noTail: true, pic: "prop-music-notes", picS: 1.3, seed: 374, t: W(37, 4) });
  L.put(S, "thought-pic", 1590, 640, { s: 0.6, noTail: true, pic: "animal-dog", picS: 1.0, picY: 70, seed: 375, t: W(37, 9) });
  card(S, "2012", 1590, 880, { t: W(37, 13), fill: "yellow" });
  card(S, "REPEAT", 1170, 680, { t: W(37, 7) });
});
// 38 "Above a calm man in a suit: what if I licked that pole?"
shot(38, 0, (S) => {
  train(S, { crowd: false });
  DS.shape(S, rrect(1050, 120, 26, 840, DS.r.sm), "gray", { w: "detail" });
  guy(S, "man06", 930, 975, { s: 1.2, outfit: "suit", outfitC: "navy", face: "flat", pose: "reach" });
  think(S, 930, 975 - HEAD * 1.2, { s: 0.6, t: W(38, 7), text: "what if I|licked that pole?", seed: 381, dx: -330, gap: 10 });
  card(S, "VERY CALM", 1450, 300, { t: W(38, 2) });
}, { cam: "zoom", focus: "930 500" });
// 39 "Above a sweet old lady in the quiet carriage: what if I shouted a rude word, right now?"
shot(39, 0, (S) => {
  train(S, { crowd: false });
  guy(S, "girl07", 960, 975, { s: 1.1, body: "elderly", outfit: "sweater", outfitC: "purple", face: "smile" });
  card(S, "QUIET CARRIAGE", 1480, 140, { t: W(39, 6) });
  think(S, 960, 975 - HEAD * 1.1, { s: 0.62, t: W(39, 9), text: "what if I shouted|a rude word?", seed: 391, dx: -380, gap: 0 });
}, { cam: "zoom", focus: "960 520" });
// 40 "Is this train full of secret villains? No. These are intrusive thoughts, and almost everybody has them."
shot(40, 0, (S) => {
  train(S);
  const a = dave(S, 960, 975, { s: 1.0, face: "shocked", pose: "shocked" });
  swap(a, dave(S, 960, 975, { s: 1.0, face: "thinking" }), W(40, 7));
  const sw = L.put(S, "fx-sweat-drops", 1010, 600, { s: 0.6, t: W(40, 1) }); fadeOut(sw, W(40, 7));
  fadeOut(card(S, "SECRET VILLAINS?", 960, 120, { t: W(40, 3) }).g, W(40, 7), 0.3);
  [300, 590, 1330, 1620].forEach((x, i) => think(S, x, 975 - HEAD, { s: 0.36, text: "!?", size: DS.type.display, seed: 400 + i, t: W(40, 12) + i * 0.15 }));
  card(S, "INTRUSIVE THOUGHTS", 960, 120, { t: W(40, 10), fill: "yellow" });
});
// 41 "In 1978, Stanley Rachman and Padmal de Silva asked 124 people with no diagnosis about unwanted thoughts."
shot(41, 0, (S) => {
  field(S, "sand", 1);
  study(S, "1978 · RACHMAN & DE SILVA");
  panel(S, 960, 560, 1200, 600, S.start);
  grid(S, 124, 20, 523, 360, 46, 0.42, () => false, W(41, 10));
  card(S, "124 PEOPLE · NO DIAGNOSIS", 960, 800, { t: W(41, 14) });
});
// 42 "Ninety-nine of them said they had them, and most found them easy to brush off."
shot(42, 0, (S) => {
  field(S, "sand", 1);
  panel(S, 960, 560, 1200, 600, S.start);
  grid(S, 124, 20, 523, 360, 46, 0.42, (i) => i < 99, W(42, 0));
  card(S, "99 OF 124", 960, 120, { t: W(42, 0), fill: "yellow" });
  card(S, "EASY TO BRUSH OFF", 960, 800, { t: W(42, 9) });
});
// 43 "Even clinicians found them surprisingly hard to tell apart from patients' obsessions."
shot(43, 0, (S) => {
  bg(S, "room-hospital-room-light");
  guy(S, "girl01", 960, 960, { s: 1.15, outfit: "doctor", outfitC: "white", face: "confused", pose: "shrug" });
  panel(S, 450, 470, 460, 330, S.start); lines0(S, 450, 470);
  panel(S, 1470, 470, 460, 330, S.start); lines0(S, 1470, 470);
  card(S, "ORDINARY", 450, 250); card(S, "PATIENTS", 1470, 250);
  card(S, "WHICH IS WHICH?", 960, 120, { t: W(43, 6), fill: "yellow" });
});
const lines0 = (S, cx, cy) => { for (let i = 0; i < 4; i++) S.draw(line([cx - 170, cy - 90 + i * 58], [cx + (i === 3 ? 40 : 170), cy - 90 + i * 58], 0), T0(S), 0, { c: DS.c("gray", 1), w: DS.w.detail }); };
// 44 "In 2014, a survey of students in 13 countries found that 94% had had at least one in the past three months."
shot(44, 0, (S) => {
  field(S, "navy", 2);
  study(S, "2014 · 13 COUNTRIES");
  L.put(S, "ep-globe-flat", 640, 560, { s: 1.9 });
  const r = L.rng(44); for (let i = 0; i < 13; i++) { const a = r() * Math.PI * 2, d = Math.sqrt(r()) * 250; S.fill(circ(640 + Math.cos(a) * d, 560 + Math.sin(a) * d * 0.8, 14), W(44, 8) + i * 0.06, 0.2, DS.c("red"), 1); }
  countUp(S, 1400, 560, 0, 94, W(44, 12), 1.0, { size: DS.type.display, c: DS.P.white[0], fmt: (n) => Math.round(n) + "%" });
  card(S, "IN THE PAST 3 MONTHS", 1400, 720, { t: W(44, 19) });
});
// 45 "An intrusive thought isn't a plan. It's your brain checking a door it has no intention of opening."
shot(45, 0, (S) => {
  bg(S, "kit-room-corridor");
  L.put(S, "furn-door", 1250, 940, { s: 1.6 });
  const b = S.grp(); brain(S, 1000, 940, 1.35, "smile", { t: W(45, 6), parent: b });
  shift(b, W(45, 14), 1.4, [0, 0], [-420, 0]);
  card(S, "NOT A PLAN", 960, 130, { t: W(45, 3), fill: "yellow" });
  card(S, "JUST CHECKING", 1250, 330, { t: W(45, 9) });
});
// 46 "The man in the suit gets off at his stop. He has not licked anything."
shot(46, 0, (S) => {
  L.put(S, "ride-train-platform", 960, 1000, { s: 2.1, time: "day" });
  const m = S.grp(); guy(S, "man06", 760, 960, { s: 1.1, outfit: "suit", outfitC: "navy", face: "flat", pose: "cyc-walk-2", parent: m });
  shift(m, W(46, 0), 3.5, [0, 0], [380, 0], "none");
  card(S, "NOTHING LICKED", 960, 150, { t: W(46, 12), fill: "green" });
});
// 47 "But there's no off switch, and nobody gets a private moment."
shot(47, 0, (S) => {
  bg(S, "room-living-room-light");
  L.put(S, "p2-toggle", 1250, 470, { s: 2.2, on: true });
  card(S, "BUBBLES", 1250, 260);
  dave(S, 760, 950, { s: 1.15, face: "annoyed", pose: "push" });
  xMark(S, 1250, 470, 1.6, W(47, 3));
  card(S, "NO OFF SWITCH", 960, 120, { t: W(47, 2), fill: "yellow" });
});
// 47 "Not the man practising an apology, not the woman quietly missing her dad."
shot(47, 11, (S) => {
  bg(S, "scene-park-day");
  guy(S, "man08", 600, 960, { s: 1.05, face: "nervous" });
  think(S, 600, 960 - HEAD * 1.05, { s: 0.58, t: W(47, 13), text: "I'm sorry I... no...|I'm sorry that...", seed: 471, dx: 40 });
  guy(S, "girl09", 1330, 960, { s: 1.05, face: "sad", flip: true });
  think(S, 1330, 960 - HEAD * 1.05, { s: 0.5, t: W(47, 19), pic: "p2-heart-full", picS: 1.1, text: "Dad", textY: 120, size: DS.type.caption, seed: 472, dx: -20 });
});
// 48 "It feels like reading everyone's diary without asking."
shot(48, 0, (S) => {
  train(S);
  dave(S, 960, 1000, { s: 1.35, face: "embarrassed", pose: "hold" });
  L.put(S, "prop-book-open", 960, 800, { s: 1.15, t: W(48, 3) });
  card(S, "EVERYONE'S DIARY", 960, 140, { t: W(48, 4) });
}, { cam: "zoom", focus: "960 560" });
