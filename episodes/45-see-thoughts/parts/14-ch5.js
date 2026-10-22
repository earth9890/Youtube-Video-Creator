// ===================== chapter 5: Day four: his own bubble (clips 49-57) =====================
// 49 "By day four, Dave stops going out. Not because of other people's bubbles. Because of his own."
shot(49, 0, (S) => {
  bg(S, "room-living-room-light");
  L.put(S, "furn-sofa", 640, 940, { s: 1.4, c: "blue" });
  dave(S, 1200, 955, { s: 1.15, face: "worried", pose: "hug-self" });
  think(S, 1200, 955 - HEAD * 1.15, { s: 0.55, t: W(49, 13), kind: "faint", text: "?", size: DS.type.display, seed: 491 });
  clock(S, "DAY 4");
});
// 50 (@dave) "What if it works both ways, Brain? What if everyone can see mine?"
shot(50, 0, (S) => {
  bg(S, "room-living-room-light");
  daveTalk(S, 740, 955, { face: "worried", pose: "shrug" }, 50);
  brain(S, 1280, 920, 1.2, "worried", { armL: "hip" });
}, { cam: "push" });
// 51 (@brain) "Then they'll see what I put up with all day."
shot(51, 0, (S) => {
  bg(S, "kit-room-library-day", { time: "day" });
  L.put(S, "thought-flood", 960, 380, { s: 0.75, n: 26, seed: 511 });
  brainTalk(S, 960, 830, 1.6, "tired", 51);
  L.put(S, "kit-desk-library", 960, 950, { s: 1.4 });
}, { cam: "push" });
// 52 "On the way to the shops, his own head offers: what if you hugged the bus driver?"
shot(52, 0, (S) => {
  bg(S, "scene-city-street-day");
  L.put(S, "ride-city-bus", 1320, 930, { s: 1.05, color: "red", driver: true, time: "day" });
  brain(S, 690, 955 - HEAD * 1.1 + 120, 0.62, "smile", { t: W(52, 6) });
  dave(S, 600, 955, { s: 1.1, face: "nervous" });
  L.put(S, "bubble-round", 820, 300, { s: 0.8, text: "Hug the bus driver?", tail: "left", t: W(52, 10) });
});
// 52 "What if you sang at the checkout?"
shot(52, 17, (S) => {
  bg(S, "room-shop-counter-light");
  L.put(S, "job-cashier", 1280, 950, { s: 1.15 });
  brain(S, 710, 955 - HEAD * 1.1 + 120, 0.62, "smile");
  dave(S, 620, 955, { s: 1.1, face: "nervous" });
  L.put(S, "bubble-round", 850, 300, { s: 0.8, text: "Sing at the checkout?", tail: "left", t: W(52, 18) });
  L.put(S, "prop-music-notes", 1150, 470, { s: 0.8, t: W(52, 20) });
});
// 53 "So Dave wears a big woolly hat, just in case."
shot(53, 0, (S) => {
  bg(S, "room-living-room-light");
  const a = dave(S, 960, 1040, { s: 1.75, face: "nervous" });
  swap(a, dave(S, 960, 1040, { s: 1.75, face: "nervous", acc: ["beanie"], accC: "red" }), W(53, 2));
  L.put(S, "fx-sweat-drops", 1110, 420, { s: 0.7, t: W(53, 6) });
  card(S, "JUST IN CASE", 1500, 300, { t: W(53, 7), fill: "yellow" });
}, { cam: "zoom", focus: "960 460" });
// 54 "That feeling, that your thoughts are leaking out, has a name: the illusion of transparency."
shot(54, 0, (S) => {
  bg(S, "room-living-room-light");
  dave(S, 960, 1040, { s: 1.75, face: "worried", acc: ["beanie"], accC: "red" });
  [[760, 300, 0.22], [1170, 250, 0.28], [960, 170, 0.18]].forEach(([x, y, k], i) => {
    const g = S.grp(); L.put(S, "thought-pic", x, y, { s: k, noTail: true, kind: "faint", seed: 540 + i, t: W(54, 5) + i * 0.3, parent: g });
    shift(g, W(54, 5) + i * 0.3, 3, [0, 0], [0, -60]);
  });
  card(S, "THE ILLUSION OF TRANSPARENCY", 960, 110, { t: W(54, 11) });
}, { cam: "push" });
// 55 "In 1998, Thomas Gilovich's team at Cornell had students tell lies in small groups, then guess how many would catch them."
shot(55, 0, (S) => {
  bg(S, "room-classroom-light");
  study(S, "1998 · GILOVICH · CORNELL");
  guy(S, "man02", 960, 950, { s: 1.15, face: "nervous" });
  L.put(S, "fx-sweat-drops", 1020, 520, { s: 0.5, t: W(55, 10) });
  card(S, "LYING", 960, 330, { t: W(55, 10), fill: "red" });
  [[430, "girl04"], [700, "man09"], [1220, "girl10"], [1490, "man05"]].forEach(([x, st], i) => {
    guy(S, st, x, 950, { s: 0.9, face: "thinking", flip: x > 960 });
    think(S, x, 950 - HEAD * 0.9, { s: 0.33, text: "?", size: DS.type.display, seed: 550 + i, t: W(55, 16) + i * 0.15 });
  });
});
// 56 "The liars expected about half the group to see through them. Only about a quarter did, no better than guessing."
shot(56, 0, (S) => {
  field(S, "sand", 1);
  card(S, "HOW MANY WOULD CATCH THE LIAR?", 960, 120);
  hbar(S, "EXPECTED", 640, 420, 1000, 0.488, "orange", W(56, 2), "48.8%");
  hbar(S, "CAUGHT", 640, 620, 1000, 0.256, "blue", W(56, 11), "25.6%");
  card(S, "NO BETTER THAN GUESSING", 960, 820, { t: W(56, 16), fill: "yellow" });
});
// 57 "Everyone walks around feeling like Dave in his woolly hat."
shot(57, 0, (S) => {
  bg(S, "scene-city-street-day");
  [["girl03", 300, "pink"], ["man07", 600, "green"], ["girl08", 1260, "blue"], ["man10", 1560, "orange"]].forEach(([st, x, c], i) => guy(S, st, x, 945, { s: 0.95, face: "nervous", acc: ["beanie"], accC: c, flip: i % 2 === 1, t: W(57, 0) + i * 0.15 }));
  dave(S, 930, 960, { s: 1.05, face: "nervous", acc: ["beanie"], accC: "red" });
});

// ===================== chapter 6: Can anyone really read minds? (clips 58-65) =====================
const lab = (S) => { bg(S, "room-science-lab-light"); };
// 58 "So Dave visits a lab. Can anyone really read minds?"
shot(58, 0, (S) => {
  lab(S);
  L.put(S, "sci-mri-scanner", 1350, 950, { s: 1.05 });
  const d = S.grp(); dave(S, 380, 955, { s: 1.1, face: "worried", acc: ["beanie"], accC: "red", pose: "cyc-walk-1", parent: d });
  shift(d, S.start, 1.6, [0, 0], [260, 0], "power1.out");
  card(S, "CAN ANYONE REALLY READ MINDS?", 960, 120, { t: W(58, 5) });
});
// 59 (@doc) "Brain decoders are real, Dave. They're just very slow and very picky."
shot(59, 0, (S) => {
  lab(S);
  L.put(S, "sci-mri-scanner", 1390, 950, { s: 1.05 });
  docTalk(S, 880, 955, { pose: "point" }, 59);
  dave(S, 420, 955, { s: 1.05, face: "thinking", acc: ["beanie"], accC: "red" });
  card(S, "SLOW", 1390, 200, { t: W(59, 8) }); card(S, "PICKY", 1390, 290, { t: W(59, 11) });
});
// 60 "In 2023, Jerry Tang and Alexander Huth's team in Texas had three volunteers listen to sixteen hours of stories inside a brain scanner."
shot(60, 0, (S) => {
  lab(S);
  study(S, "2023 · TANG & HUTH · TEXAS");
  L.put(S, "sci-mri-scanner", 960, 950, { s: 1.05 });
});
// 60 "...had three volunteers listen to sixteen hours of stories inside a brain scanner."
shot(60, 11, (S) => {
  lab(S);
  study(S, "2023 · TANG & HUTH · TEXAS");
  L.put(S, "sci-mri-scanner", 700, 950, { s: 1.05 });
  L.put(S, "prop-headphones", 700, 740, { s: 0.7, t: W(60, 14) });
  panel(S, 1330, 640, 620, 560, S.start);
  [1210, 1330, 1450].forEach((x, i) => mini(S, x, 500, 1.4, { t: W(60, 12) + i * 0.15 }));
  card(S, "3 VOLUNTEERS", 1330, 580, { t: W(60, 12) });
  countUp(S, 1330, 800, 0, 16, W(60, 16), 1.0, { size: DS.type.display, fmt: (n) => Math.round(n) + " HOURS" });
});
// 61 "Then a computer turned new brain activity back into words. Well, the gist."
shot(61, 0, (S) => {
  lab(S);
  L.put(S, "sci-brain-monitor", 520, 520, { s: 1.6 });
  arrowR(S, 760, 520, 1100, 520, W(61, 3), { c: "red" });
  L.put(S, "prop-laptop", 1360, 560, { s: 2.0, t: W(61, 7) });
  [0, 1, 2].forEach((i) => S.draw(line([1250, 470 + i * 34], [1250 + (i === 2 ? 120 : 220), 470 + i * 34], 0), W(61, 8) + i * 0.2, 0, { c: DS.c("ink"), w: DS.w.detail }));
  card(S, "THE GIST", 1360, 230, { t: W(61, 11), fill: "yellow" });
});
// 62 "When one volunteer heard, I don't have my driver's license yet, it wrote: she has not even started to learn to drive yet."
shot(62, 0, (S) => {
  field(S, "sand", 1);
  panel(S, 960, 330, 1500, 220, S.start);
  card(S, "THE VOLUNTEER HEARD", 520, 250);
  txt(S, "“I don't have my driver's license yet.”", 960, 365, { size: DS.type.body, t: W(62, 4) });
  panel(S, 960, 690, 1500, 220, W(62, 11));
  card(S, "THE DECODER WROTE", 520, 610, { t: W(62, 11) });
  txt(S, "“She has not even started to learn to drive yet.”", 960, 725, { size: DS.type.small, t: W(62, 13) });
});
// 63 "Trained on one person, it barely worked on anyone else."
shot(63, 0, (S) => {
  lab(S);
  L.put(S, "sci-mri-scanner", 640, 950, { s: 1.0 });
  guy(S, "man09", 1000, 955, { s: 1.0, face: "confused" });
  L.put(S, "prop-laptop", 1450, 600, { s: 1.8, t: W(63, 4) });
  txt(S, "? # & % ?", 1450, 560, { size: DS.type.body, c: DS.c("red", 2), t: W(63, 5) });
  card(S, "ONE PERSON ONLY", 960, 120, { t: W(63, 0) });
});
// 63 "And when volunteers silently named animals, it mostly stopped working."
shot(63, 10, (S) => {
  lab(S);
  guy(S, "girl04", 760, 955, { s: 1.1, face: "smug" });
  const hy = 955 - HEAD * 1.1;
  think(S, 760, hy, { s: 0.6, pic: "animal-giraffe", picS: 0.55, picY: 100, seed: 631, t: W(63, 14), dx: -60 });
  L.put(S, "thought-pic", 1080, 300, { s: 0.36, noTail: true, pic: "animal-cat", picS: 0.9, picY: 60, seed: 632, t: W(63, 15) });
  L.put(S, "prop-laptop", 1450, 600, { s: 1.8 });
  xMark(S, 1450, 560, 1.1, W(63, 17));
});
// 64 "So one of the best mind readers on Earth needs sixteen hours of your help, and you can beat it by thinking about giraffes."
shot(64, 0, (S) => {
  lab(S);
  L.put(S, "sci-mri-scanner", 1420, 950, { s: 1.0 });
  dave(S, 720, 955, { s: 1.15, face: "smug", acc: ["beanie"], accC: "red" });
  card(S, "16 HOURS OF YOUR HELP", 960, 120, { t: W(64, 9) });
  think(S, 720, 955 - HEAD * 1.15, { s: 0.62, pic: "animal-giraffe", picS: 0.58, picY: 105, seed: 641, t: W(64, 21), dx: 40 });
  L.put(S, "animal-giraffe", 1080, 955, { s: 0.9, t: W(64, 23) });
});
// 65 "For now, the lid stays on. Your thoughts are still your own."
shot(65, 0, (S) => {
  bg(S, "scene-city-street-day");
  dave(S, 900, 955, { s: 1.15, face: "relieved", acc: ["beanie"], accC: "red" });
  L.put(S, "prop-padlock", 1250, 420, { s: 1.1, t: W(65, 3) });
  card(S, "STILL YOUR OWN", 1250, 640, { t: W(65, 6), fill: "green" });
});
