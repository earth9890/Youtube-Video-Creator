// ===================== chapter 2: Hour one: a superpower (clips 10-20) =====================
// 10 "Hour one, and Dave is a genius. It's his sister's birthday, and her bubble holds a picture: a yellow umbrella, covered in ducks."
shot(10, 0, (S) => {
  bg(S, "room-dining-room-light");
  clock(S, "HOUR 1");
  fadeOut(card(S, "GENIUS", 960, 130, { t: W(10, 5), fill: "yellow" }).g, W(10, 12), 0.3);
  L.put(S, "furn-dining-table", 960, 930, { s: 1.5 });
  L.put(S, "p2-birthday-cake", 960, 680, { s: 0.9, candles: 5 });
  dave(S, 520, 950, { s: 1.05, face: "smug", look: 6 });
  guy(S, "girl05", 1380, 950, { outfit: "dress", outfitC: "purple", acc: ["partyhat"], accC: "pink", face: "happy" });
  think(S, 1380, 950 - HEAD * 1.05, { s: 0.6, t: W(10, 13), pic: "prop-umbrella-ducks", picS: 1.25, picY: 10, seed: 21, dx: -60 });
});
// 11 "Dave buys the umbrella. She cries. Best brother ever."
shot(11, 0, (S) => {
  bg(S, "room-dining-room-light");
  L.put(S, "furn-dining-table", 960, 930, { s: 1.5 });
  L.put(S, "p2-birthday-cake", 960, 680, { s: 0.9, candles: 5 });
  dave(S, 600, 950, { s: 1.05, face: "proud", pose: "reach" });
  L.put(S, "prop-gift", 790, 700, { s: 0.8, t: W(11, 0) });
  const a = guy(S, "girl05", 1340, 950, { outfit: "dress", outfitC: "purple", acc: ["partyhat"], accC: "pink", face: "happy" });
  swap(a, guy(S, "girl05", 1340, 950, { outfit: "dress", outfitC: "purple", acc: ["partyhat"], accC: "pink", face: "cryLaugh", pose: "armsUp" }), W(11, 4));
  L.put(S, "prop-umbrella-ducks", 1340, 390, { s: 1.0, t: W(11, 4) });
  card(S, "BEST BROTHER EVER", 960, 150, { t: W(11, 6), fill: "yellow" });
});
// 12 "At his job interview, the interviewer's bubble says: please, just say teamwork."
shot(12, 0, (S) => {
  bg(S, "room-office-light");
  seat(S, 640, 950, "furn-office-chair"); seat(S, 1290, 950, "furn-office-chair", true);
  dave(S, 640, 950, { s: 1.05, pose: "sit-chair", face: "nervous" });
  guy(S, "man06", 1290, 950, { outfit: "suit", outfitC: "navy", pose: "sit-chair", face: "flat", acc: ["glasses"], flip: true });
  L.put(S, "furn-desk", 980, 955, { s: 1.15 });
  think(S, 1290, 950 - HEAD * 1.05 + 40, { s: 0.62, t: W(12, 6), text: "please, just|say teamwork", seed: 31, dx: 40 });
});
// 12 "Dave says teamwork. He gets the job."
shot(12, 12, (S) => {
  bg(S, "room-office-light");
  seat(S, 640, 950, "furn-office-chair"); seat(S, 1290, 950, "furn-office-chair", true);
  dave(S, 640, 950, { s: 1.05, pose: "sit-chair", face: "smug" });
  const a = guy(S, "man06", 1290, 950, { outfit: "suit", outfitC: "navy", pose: "sit-chair", face: "flat", acc: ["glasses"], flip: true });
  swap(a, guy(S, "man06", 1290, 950, { outfit: "suit", outfitC: "navy", pose: "sit-chair", face: "delighted", acc: ["glasses"], flip: true }), W(12, 15));
  L.put(S, "furn-desk", 980, 955, { s: 1.15 });
  L.put(S, "bubble-round", 560, 370, { s: 0.8, text: "Teamwork.", tail: "right", t: W(12, 13) });
  card(S, "HIRED", 1290, 330, { t: W(12, 16), fill: "green" });
});
// 13 "But most of the bubbles don't have any words in them at all."
shot(13, 0, (S) => {
  bg(S, "scene-city-street-day");
  [["girl07", 560, "animal-cat", 1.1], ["man03", 1000, "prop-cake", 1.1], ["girl02", 1440, "prop-music-notes", 1.1]].forEach(([st, x, pic, k], i) => {
    guy(S, st, x, 945, { s: 0.95, face: ["smile", "happy", "flat"][i], flip: i === 2 });
    think(S, x, 945 - HEAD * 0.95, { s: 0.5, pic, picS: k, t: W(13, 2 + i * 3), seed: 40 + i });
  });
  dave(S, 230, 960, { s: 0.95, face: "confused", pose: "scratch-head" });
  card(S, "NO WORDS", 960, 120, { t: W(13, 8) });
});
// 14 "In 2008, Christopher Heavey and Russell Hurlburt gave thirty students a beeper that went off at random,"
shot(14, 0, (S) => {
  field(S, "sand", 1);
  study(S, "2008 · HEAVEY & HURLBURT");
  panel(S, 760, 560, 1080, 560, S.start);
  grid(S, 30, 10, 330, 470, 96, 0.95, () => false, W(14, 10));
  txt(S, "30 STUDENTS", 760, 790, { t: W(14, 10), size: DS.type.body });
  L.put(S, "prop-beeper", 1550, 520, { s: 2.2, t: W(14, 13) });
  txt(S, "AT RANDOM", 1550, 760, { t: W(14, 17), size: DS.type.body, c: DS.c("red", 2) });
});
// 14 "...and asked what was in their heads at each beep."
shot(14, 19, (S) => {
  bg(S, "room-classroom-light");
  guy(S, "girl02", 900, 955, { s: 1.2, outfit: "student", outfitC: "white", face: "wow", pose: "hold" });
  L.put(S, "prop-beeper", 960, 730, { s: 0.7 });
  L.put(S, "bubble-shout", 1250, 560, { s: 0.6, text: "BEEP", t: W(14, 26) });
  think(S, 900, 955 - HEAD * 1.2, { s: 0.55, t: W(14, 21), kind: "faint", text: "?", size: DS.type.display, seed: 51, dx: -380 });
  card(S, "WHAT'S IN YOUR HEAD RIGHT NOW?", 960, 120, { t: W(14, 20) });
});
// 15 "The inner voice turned up in only about a quarter of those moments, and pictures in about a third."
shot(15, 0, (S) => {
  field(S, "sky", 1);
  L.put(S, "thought-pic", 560, 400, { s: 0.75, noTail: true, text: "and then I'll|need to call...", seed: 61 });
  card(S, "INNER VOICE", 560, 650);
  countUp(S, 560, 820, 0, 26, W(15, 7), 0.6, { size: DS.type.display, fmt: (n) => Math.round(n) + "%" });
  L.put(S, "thought-pic", 1360, 400, { s: 0.75, noTail: true, pic: "scene-beach-day", picS: 0.2, picX: -190, picY: -105, seed: 62, t: W(15, 13) });
  card(S, "PICTURES", 1360, 650, { t: W(15, 13) });
  countUp(S, 1360, 820, 0, 34, W(15, 13), 0.6, { size: DS.type.display, fmt: (n) => Math.round(n) + "%" });
});
// 16 "And about one moment in five held a clear thought with no words or pictures at all."
shot(16, 0, (S) => {
  field(S, "sky", 1);
  L.put(S, "thought-pic", 960, 430, { s: 1.0, noTail: true, seed: 63 });
  countUp(S, 960, 470, 0, 22, W(16, 2), 0.9, { size: DS.type.display, c: DS.c("gray", 1), fmt: (n) => Math.round(n) + "%" });
  card(S, "NO WORDS. NO PICTURES.", 960, 800, { t: W(16, 10) });
  card(S, "1 IN 5", 960, 120, { t: W(16, 2) });
});
// 17 "So some bubbles are empty, and Dave still somehow knows they mean: maybe soup."
shot(17, 0, (S) => {
  bg(S, "scene-city-street-day");
  guy(S, "man03", 1150, 945, { s: 1.15, face: "flat" });
  think(S, 1150, 945 - HEAD * 1.15, { s: 0.6, seed: 64, dx: 60 });
  dave(S, 560, 960, { s: 1.15, face: "thinking", pose: "think" });
  card(S, "MAYBE SOUP", 1600, 470, { t: W(17, 12) });
});
// 18 "Five of the thirty students reported no inner voice at all."
shot(18, 0, (S) => {
  field(S, "sand", 1);
  panel(S, 960, 540, 1100, 560, S.start);
  grid(S, 30, 10, 528, 450, 96, 0.95, (i) => i % 7 === 3 && i < 30, W(18, 5));
  card(S, "5 OF 30: NO INNER VOICE", 960, 120, { t: W(18, 5) });
});
// 18 "So the interviewer has a radio station in his head, and Dave's sister has a silent picture book."
shot(18, 11, (S) => {
  bg(S, "room-office-light");
  S.fill(rect(960, -40, 1000, 1160), T0(S), 0, DS.c("pink", 1), 1);
  S.draw("M960 -40 V1120", T0(S), 0, { c: DS.c("ink"), w: DS.w.near });
  guy(S, "man06", 480, 950, { s: 1.0, outfit: "suit", outfitC: "navy", acc: ["glasses"], face: "flat" });
  think(S, 480, 950 - HEAD, { s: 0.68, text: "and ANOTHER thing|blah blah blah|so anyway", size: DS.type.caption, t: W(18, 15), seed: 71, dx: 40 });
  L.put(S, "p2-boombox", 760, 640, { s: 0.7, t: W(18, 15) });
  guy(S, "girl05", 1440, 950, { s: 1.0, outfit: "dress", outfitC: "purple", face: "smile" });
  think(S, 1440, 950 - HEAD, { s: 0.68, pic: "prop-umbrella-ducks", picS: 0.8, picX: -80, t: W(18, 26), seed: 72, dx: -40 });
  L.put(S, "prop-cake", 1520, 300, { s: 0.55, t: W(18, 26) });
});
// 19 "Normally, we're bad at this. In 1992, Linda Stinson and William Ickes filmed pairs of young men chatting, then had each one guess the other's thoughts."
shot(19, 0, (S) => {
  bg(S, "room-waiting-room-light");
  seat(S, 700, 950); guy(S, "man02", 700, 950, { s: 1.05, pose: "sit-chair", face: "smile" });
  seat(S, 1220, 950); guy(S, "man07", 1220, 950, { s: 1.05, pose: "sit-chair", face: "smile", flip: true });
  study(S, "1992 · STINSON & ICKES", W(19, 5));
  L.put(S, "prop-camera", 1660, 520, { s: 1.0, t: W(19, 13), flip: true });
});
// 19 "...then had each one guess the other's thoughts."
shot(19, 19, (S) => {
  bg(S, "room-waiting-room-light");
  seat(S, 700, 950); guy(S, "man02", 700, 950, { s: 1.05, pose: "sit-chair", face: "thinking" });
  seat(S, 1220, 950); guy(S, "man07", 1220, 950, { s: 1.05, pose: "sit-chair", face: "thinking", flip: true });
  study(S, "1992 · STINSON & ICKES");
  L.put(S, "prop-camera", 1660, 520, { s: 1.0, flip: true });
  think(S, 700, 950 - HEAD * 1.05 + 40, { s: 0.48, text: "he's bored?", t: W(19, 23), seed: 81, dx: -60 });
  think(S, 1220, 950 - HEAD * 1.05 + 40, { s: 0.48, text: "he likes|football?", t: W(19, 24), seed: 82, dx: 60 });
});
// 20 "Strangers got about twenty percent right. Friends, about thirty. And Dave is now on a hundred."
shot(20, 0, (S) => {
  field(S, "sand", 1);
  card(S, "GUESSING THOUGHTS RIGHT", 960, 120);
  hbar(S, "STRANGERS", 640, 360, 1000, 0.2, "blue", W(20, 1), "20%");
  hbar(S, "FRIENDS", 640, 540, 1000, 0.3, "green", W(20, 6), "30%");
  hbar(S, "DAVE", 640, 720, 1000, 1.0, "red", W(20, 13), "100%");
  dave(S, 230, 900, { s: 0.75, pose: "flex", face: "smug", t: W(20, 10) });
});
