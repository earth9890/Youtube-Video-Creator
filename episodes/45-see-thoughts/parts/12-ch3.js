// ===================== chapter 3: Hour six: six thousand thoughts (clips 21-35) =====================
// 21 "By hour six, the bubbles won't stay still. They keep changing."
shot(21, 0, (S) => {
  bg(S, "room-restaurant-light");
  guy(S, "girl06", 1200, 950, { s: 1.1, face: "thinking", flip: true });
  const hy = 950 - HEAD * 1.1, o = { s: 0.6, dx: -40 };
  const B = [think(S, 1200, hy, Object.assign({ text: "lunch?", size: DS.type.title, seed: 91 }, o)), think(S, 1200, hy, Object.assign({ pic: "animal-dog", picS: 0.9, picY: 60, seed: 92 }, o)),
    think(S, 1200, hy, Object.assign({ text: "did I reply|to that?", seed: 93 }, o)), think(S, 1200, hy, Object.assign({ pic: "prop-music-notes", picS: 1.3, seed: 94 }, o)), think(S, 1200, hy, Object.assign({ text: "shoes?", size: DS.type.title, seed: 95 }, o))];
  for (let k = 1; k < B.length; k++) swap(B[k - 1], B[k], W(21, 5) + (k - 1) * 0.85, 0.3);
  dave(S, 560, 960, { s: 1.1, face: "dizzy" });
  clock(S, "HOUR 6");
});
// 22 "You may have heard we have sixty thousand thoughts a day."
shot(22, 0, (S) => {
  bg(S, "room-office-light");
  panel(S, 960, 470, 1000, 520, S.start, "yellow");
  txt(S, "60,000", 960, 470, { size: DS.type.display, c: DS.c("red", 2) });
  txt(S, "THOUGHTS A DAY!", 960, 600, { size: DS.type.title });
  txt(S, "THEY SAY", 960, 300, { size: DS.type.small, c: DS.c("gray", 2) });
});
// 22 "It's often credited to the National Science Foundation, which can't find it either."
shot(22, 11, (S) => {
  bg(S, "room-office-light");
  L.put(S, "p2-filing-cabinet", 1300, 690, { s: 2.0 });
  guy(S, "girl01", 820, 950, { s: 1.1, outfit: "office", outfitC: "sky", face: "confused", pose: "scratch-head" });
  L.put(S, "ep-magnifier", 1050, 560, { s: 0.9, t: W(22, 19) });
  card(S, "NATIONAL SCIENCE FOUNDATION", 960, 120);
  card(S, "SOURCE: NOT FOUND", 1300, 300, { t: W(22, 20), fill: "red" });
});
// 23 "In 2020, Julie Tseng and Jordan Poppenk in Canada studied brain scans of 184 people watching films and resting."
shot(23, 0, (S) => {
  bg(S, "room-science-lab-light");
  study(S, "2020 · TSENG & POPPENK");
  L.put(S, "sci-mri-scanner", 700, 950, { s: 1.0, t: W(23, 11) });
  L.put(S, "prop-tv", 1360, 520, { s: 1.6, t: W(23, 19) });
  card(S, "FILMS + REST", 1360, 720, { t: W(23, 20) });
  countUp(S, 1360, 870, 0, 184, W(23, 14), 1.0, { size: DS.type.title, fmt: (n) => Math.round(n) + " PEOPLE" });
});
// 24 "They counted the moments when brain activity jumps to a new pattern, which they think marks a new thought."
shot(24, 0, (S) => {
  field(S, "navy", 2);
  card(S, "BRAIN ACTIVITY OVER TIME", 960, 120);
  const C = [[420, 520], [960, 470], [1500, 540]], r = L.rng(24);
  C.forEach(([cx, cy], k) => {
    const pts = []; for (let i = 0; i < 12; i++) pts.push([cx + (r() - 0.5) * 220, cy + (r() - 0.5) * 170]);
    const g = S.grp(); S.draw(smooth(pts), T0(S), 0, { c: DS.c("sky", 1), w: DS.w.mid, parent: g });
    pts.forEach(([x, y]) => S.fill(circ(x, y, 11), T0(S), 0, DS.c("yellow"), 1, g));
    if (k) fadeG(S, g, W(24, 7) + (k - 1) * 0.8);
  });
  arrowR(S, 560, 470, 820, 420, W(24, 7), { c: "red", bend: -0.25 });
  arrowR(S, 1100, 430, 1360, 480, W(24, 7) + 0.8, { c: "red", bend: -0.25 });
  card(S, "NEW THOUGHT", 690, 760, { t: W(24, 15), fill: "yellow" });
  card(S, "NEW THOUGHT", 1230, 760, { t: W(24, 16), fill: "yellow" });
});
// 25 "About six and a half a minute, or, as a tentative estimate, a little over six thousand a day."
shot(25, 0, (S) => {
  field(S, "navy", 2);
  panel(S, 560, 520, 640, 420, S.start);
  countUp(S, 560, 520, 0, 6.5, W(25, 0), 0.9, { size: DS.type.display, fmt: (n) => n.toFixed(1) });
  txt(S, "PER MINUTE", 560, 640, { size: DS.type.body });
  panel(S, 1360, 520, 640, 420, W(25, 12));
  countUp(S, 1360, 520, 0, 6000, W(25, 12), 1.2, { size: DS.type.display, t0: W(25, 12), fmt: (n) => Math.round(n).toLocaleString("en-US") + "+" });
  txt(S, "PER DAY", 1360, 640, { size: DS.type.body, t: W(25, 12) });
  card(S, "A TENTATIVE ESTIMATE", 1360, 860, { t: W(25, 10), fill: "yellow" });
});
// 26 "So Dave isn't reading one book per person. He's reading six thousand very short ones."
shot(26, 0, (S) => {
  bg(S, "room-library-light");
  L.put(S, "prop-book-closed", 760, 720, { s: 1.3, t: W(26, 4) });
  const g = S.grp(); for (let i = 0; i < 14; i++) L.put(S, "prop-book-closed", 1250 + (i % 2) * 18 - 9, 900 - i * 52, { s: 0.6, parent: g, rot: i % 3 ? 4 : -5 });
  fadeG(S, g, W(26, 9));
  dave(S, 1000, 955, { s: 1.05, face: "dizzy" });
  card(S, "× 6,000", 1500, 300, { t: W(26, 10), fill: "yellow" });
  card(S, "1 BOOK?", 760, 520, { t: W(26, 4) });
});
// 27 "At lunch, his date's bubble says: he's sweet. Is that spinach?"
shot(27, 0, (S) => {
  bg(S, "room-restaurant-light");
  seat(S, 690, 950); seat(S, 1230, 950, "furn-dining-chair", true);
  dave(S, 690, 950, { s: 1.05, pose: "sit-chair", face: "happy" });
  guy(S, "girl06", 1230, 950, { s: 1.05, pose: "sit-chair", face: "smile", flip: true });
  L.put(S, "furn-dining-table", 960, 960, { s: 1.25 });
  think(S, 1230, 950 - HEAD * 1.05 + 40, { s: 0.6, t: W(27, 4), text: "he's sweet.|is that spinach?", seed: 101, dx: 60 });
});
// 27 "Dave checks. It is spinach. He has never loved a bubble more."
shot(27, 11, (S) => {
  bg(S, "room-restaurant-light");
  const a = dave(S, 800, 1010, { s: 1.6, face: "embarrassed", pose: "hold" });
  swap(a, dave(S, 800, 1010, { s: 1.6, face: "love", pose: "hold" }), W(27, 16));
  L.put(S, "p2-hand-mirror", 1060, 640, { s: 1.0, t: W(27, 11) });
  card(S, "IT IS SPINACH", 1400, 330, { t: W(27, 13) });
  L.put(S, "p2-heart-full", 1400, 560, { s: 0.7, t: W(27, 19) });
}, { cam: "zoom", focus: "800 500" });
// 28 "Then his friends arrive. Sam's bubble says: his hair looks weird today."
shot(28, 0, (S) => {
  bg(S, "room-restaurant-light");
  dave(S, 600, 950, { s: 1.05, face: "happy", pose: "wave" });
  guy(S, SAM.style, 1130, 950, Object.assign({}, SAM, { face: "smile", flip: true, t: W(28, 1) }));
  guy(S, JO.style, 1450, 950, Object.assign({}, JO, { face: "smile", flip: true, t: W(28, 2) }));
  think(S, 1130, 950 - HEAD * 1.05, { s: 0.56, t: W(28, 5), text: "his hair looks|weird today", seed: 111, dx: -30 });
});
// 29 "Jo nods along to Dave's story. Her bubble says: he's talking about his goldfish again."
shot(29, 0, (S) => {
  bg(S, "room-restaurant-light");
  daveTalk(S, 560, 950, { face: "happy", pose: "point" }, 29);
  L.put(S, "prop-fishbowl", 820, 640, { s: 0.65, t: W(29, 2) });
  guy(S, SAM.style, 1130, 950, Object.assign({}, SAM, { face: "smile", flip: true }));
  guy(S, JO.style, 1450, 950, Object.assign({}, JO, { face: "smile", flip: true }));
  think(S, 1450, 950 - HEAD * 1.05, { s: 0.56, t: W(29, 7), text: "he's talking about|his goldfish again", seed: 112, dx: -40 });
});
// 30 "And when Sam says, love the haircut, his bubble says: it's, well, a haircut."
shot(30, 0, (S) => {
  bg(S, "room-restaurant-light");
  dave(S, 560, 950, { s: 1.05, face: "happy" });
  guy(S, SAM.style, 1130, 950, Object.assign({}, SAM, { face: "smile", flip: true, mouth: "e" }));
  guy(S, JO.style, 1450, 950, Object.assign({}, JO, { face: "smile", flip: true }));
  L.put(S, "bubble-round", 820, 400, { s: 0.75, text: "Love the haircut!", tail: "right", t: W(30, 3) });
  think(S, 1130, 950 - HEAD * 1.05, { s: 0.56, t: W(30, 8), text: "it's... well...|a haircut.", seed: 113, dx: 120 });
});
// 31 "That's a white lie. In 1996, Bella DePaulo's team had 147 people log every lie they told for a week."
shot(31, 0, (S) => {
  bg(S, "room-home-office-light");
  fadeOut(card(S, "A WHITE LIE", 960, 110).g, W(31, 4), 0.3);
  study(S, "1996 · DePAULO", W(31, 4));
  L.put(S, "prop-notebook", 760, 560, { s: 2.3, t: W(31, 16) });
  [0, 1, 2, 3, 4].forEach((i) => S.draw(line([680 + i * 26, 610], [688 + i * 26, 690], 0), W(31, 17) + i * 0.12, 0, { c: DS.c("red", 2), w: DS.w.near }));
  panel(S, 1360, 600, 460, 380, W(31, 11));
  countUp(S, 1360, 520, 0, 147, W(31, 11), 1.0, { size: DS.type.display, fmt: (n) => String(Math.round(n)) });
  txt(S, "PEOPLE", 1360, 620, { size: DS.type.body, t: W(31, 11) });
  card(S, "1 WEEK", 1360, 760, { t: W(31, 21), fill: "yellow" });
});
// 32 "Students told about two a day, other adults about one, and one lie in four was told to protect someone else."
shot(32, 0, (S) => {
  field(S, "sand", 1);
  guy(S, "girl01", 420, 900, { s: 0.95, outfit: "student", outfitC: "white", face: "smug" });
  card(S, "2 A DAY", 420, 300, { t: W(32, 3), fill: "yellow" });
  guy(S, "man03", 900, 900, { s: 0.95, outfit: "office", outfitC: "gray", face: "smile", t: W(32, 6) });
  card(S, "1 A DAY", 900, 300, { t: W(32, 9), fill: "yellow" });
  S.pie(1450, 520, 210, 0.25, W(32, 11), 0.5, { cBig: DS.c("yellow"), cSmall: DS.c("gray", 1) });
  L.put(S, "p2-heart-full", 1530, 420, { s: 0.45, t: W(32, 18) });
  card(S, "1 IN 4: TO PROTECT SOMEONE", 1400, 820, { t: W(32, 17) });
});
// 33 "In Dave's world, every white lie comes with subtitles."
shot(33, 0, (S) => {
  bg(S, "room-restaurant-light");
  dave(S, 560, 950, { s: 1.05, face: "sad" });
  guy(S, SAM.style, 1240, 950, Object.assign({}, SAM, { face: "smile", flip: true, mouth: "e" }));
  L.put(S, "bubble-round", 960, 390, { s: 0.75, text: "Love the haircut!", tail: "right" });
  const g = S.grp(); DS.shape(S, rrect(560, 760, 800, 96, DS.r.sm), "ink", { flat: true, w: "detail", parent: g });
  S.text("(it's... a haircut)", 960, 822, { size: DS.type.body, t: T0(S), c: DS.P.white[0], parent: g });
  fadeG(S, g, W(33, 7));
});
// 34 (@dave) "Brain, I don't want to know what people think anymore."
shot(34, 0, (S) => {
  bg(S, "room-living-room-light");
  L.put(S, "furn-sofa", 820, 940, { s: 1.5, c: "blue" });
  daveTalk(S, 800, 870, { face: "sad", pose: "sit-chair" }, 34);
  brain(S, 1260, 900, 1.15, "worried", { t: W(34, 0) });
}, { cam: "push" });
// 35 (@brain) "I did mention the lids, Dave."
shot(35, 0, (S) => {
  bg(S, "room-living-room-light");
  L.put(S, "furn-sofa", 560, 940, { s: 1.3, c: "blue" });
  dave(S, 540, 880, { s: 0.95, face: "grumpy", pose: "sit-chair" });
  brainTalk(S, 1200, 960, 2.1, "stern", 35, { armR: "point" });
}, { cam: "push" });
