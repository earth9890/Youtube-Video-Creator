// ===================== chapter 7: The twist (clips 66-75) =====================
// 66 "So Dave takes off the hat, goes back out, and this time, he reads slowly."
shot(66, 0, (S) => {
  bg(S, "scene-city-street-day");
  const a = dave(S, 960, 960, { s: 1.3, face: "determined", acc: ["beanie"], accC: "red" });
  const b = dave(S, 960, 960, { s: 1.3, face: "determined", pose: "hold" }); swap(a, b, W(66, 2));
  swap(b, dave(S, 960, 960, { s: 1.3, face: "thinking", acc: ["glasses"], pose: "think" }), W(66, 12));
  card(S, "SLOWLY", 1450, 330, { t: W(66, 13), fill: "yellow" });
});
const cafe = (S) => { bg(S, "room-restaurant-light"); dave(S, 540, 950, { s: 1.05, face: "thinking", acc: ["glasses"] }); };
// 67 "Sam's bubble still says: his hair looks weird today."
shot(67, 0, (S) => {
  cafe(S);
  guy(S, SAM.style, 1180, 950, Object.assign({}, SAM, { face: "smile", flip: true }));
  think(S, 1180, 950 - HEAD * 1.05, { s: 0.56, text: "his hair looks|weird today", seed: 111, dx: -30 });
});
// 67 "But the next one says: I'm really glad he came."
shot(67, 9, (S) => {
  cafe(S);
  guy(S, SAM.style, 1180, 950, Object.assign({}, SAM, { face: "happy", flip: true }));
  L.put(S, "thought-pic", 1010, 190, { s: 0.42, noTail: true, kind: "faint", text: "his hair looks|weird today", seed: 111 });
  think(S, 1180, 950 - HEAD * 1.05, { s: 0.6, text: "I'm really glad|he came.", seed: 671, dx: 160, t: W(67, 13) });
  L.put(S, "p2-heart-full", 1530, 470, { s: 0.42, t: W(67, 15) });
});
// 68 "And Jo's says: he gets so happy about that goldfish. I love that."
shot(68, 0, (S) => {
  cafe(S);
  guy(S, JO.style, 1180, 950, Object.assign({}, JO, { face: "happy", flip: true }));
  think(S, 1180, 950 - HEAD * 1.05, { s: 0.64, text: "he gets so happy|about that goldfish.|I love that.", seed: 681, dx: 40, t: W(68, 2) });
  L.put(S, "prop-fishbowl", 1600, 640, { s: 0.6, t: W(68, 9) });
});
// 69 "The rude thoughts were real. They were just the loudest, not the last."
shot(69, 0, (S) => {
  field(S, "sky", 1);
  L.put(S, "bubble-shout", 470, 450, { s: 1.05, text: "WEIRD HAIR", c: "red" });
  L.put(S, "thought-pic", 1000, 470, { s: 0.55, noTail: true, kind: "faint", text: "lunch?", seed: 691, t: W(69, 5) });
  L.put(S, "thought-pic", 1460, 460, { s: 0.7, noTail: true, text: "glad|he came", seed: 692, t: W(69, 7) });
  L.put(S, "p2-heart-full", 1640, 330, { s: 0.45, t: W(69, 8) });
  arrowR(S, 720, 640, 1340, 640, W(69, 6), { c: "ink", bend: 0.15 });
  card(S, "LOUDEST", 470, 770, { t: W(69, 9), fill: "red" });
  card(S, "LAST", 1450, 770, { t: W(69, 12), fill: "green" });
});
// 70 "In 2018, Erica Boothby's team asked people after a chat how much they liked their partner, and how much they thought they were liked."
shot(70, 0, (S) => {
  bg(S, "room-waiting-room-light");
  study(S, "2018 · BOOTHBY");
  seat(S, 720, 950); seat(S, 1220, 950, "furn-dining-chair", true);
  guy(S, "man10", 720, 950, { s: 1.05, pose: "sit-chair", face: "smile" });
  guy(S, "girl10", 1220, 950, { s: 1.05, pose: "sit-chair", face: "smile", flip: true });
  think(S, 720, 950 - HEAD * 1.05 + 40, { s: 0.46, pic: "p2-heart-full", picS: 1.0, seed: 701, dx: -80, t: W(70, 13) });
  think(S, 1220, 950 - HEAD * 1.05 + 40, { s: 0.46, text: "they found|me boring?", seed: 702, dx: 80, t: W(70, 20) });
});
// 71 "Again and again, people underestimated it. The researchers called it the liking gap,"
shot(71, 0, (S) => {
  field(S, "sand", 1);
  const bar = (x, h, name, t, label) => { const g = S.grp(); DS.shape(S, rrect(x - 110, 860 - h, 220, h, DS.r.sm), name, { w: "detail", parent: g }); scaleY(g, t, x, 860, 0.7); txt(S, label, x, 920, { size: DS.type.caption, t }); };
  bar(640, 560, "green", W(71, 3), "HOW MUCH THEY LIKED YOU");
  bar(1280, 330, "gray", W(71, 4), "HOW MUCH YOU THOUGHT");
  S.draw("M1430 300 H1470 V530 H1430", W(71, 10), 0, { c: DS.c("red", 2), w: DS.w.near });
  card(S, "THE LIKING GAP", 1500, 200, { t: W(71, 10), fill: "yellow" });
});
// 71 "...and among students sharing a dorm, it lasted for months."
shot(71, 13, (S) => {
  bg(S, "room-bedroom-light");
  L.put(S, "furn-bed", 520, 930, { s: 1.0 }); L.put(S, "furn-bed", 1400, 930, { s: 1.0, flip: true });
  guy(S, "girl02", 820, 950, { s: 1.0, outfit: "student", outfitC: "white", face: "smile" });
  guy(S, "girl06", 1100, 950, { s: 1.0, face: "smile", flip: true });
  L.put(S, "story-calendar-flip", 1600, 300, { s: 0.6, frame: 2, day: 12, month: "OCT", t: W(71, 19) });
  card(S, "FOR MONTHS", 960, 120, { t: W(71, 20), fill: "yellow" });
});
// 72 "So Dave spent four days scared of what people really think."
shot(72, 0, (S) => {
  field(S, "sky", 1);
  [["smile", null], ["nervous", null], ["worried", null], ["scared", "beanie"]].forEach(([f, acc], i) => {
    dave(S, 330 + i * 420, 880, Object.assign({ s: 0.95, face: f, t: W(72, 2) + i * 0.2 }, acc ? { acc: [acc], accC: "red" } : {}));
    card(S, "DAY " + (i + 1), 330 + i * 420, 330, { t: W(72, 2) + i * 0.2 });
  });
});
// 72 "Mostly, they think: oven, lunch, a song on repeat, and, very quietly, I like Dave."
shot(72, 11, (S) => {
  field(S, "sky", 1);
  L.put(S, "thought-pic", 330, 330, { s: 0.48, noTail: true, pic: "furn-stove", picS: 0.8, picY: 70, seed: 721, t: W(72, 14) });
  L.put(S, "thought-pic", 760, 330, { s: 0.48, noTail: true, pic: "prop-sandwich", picS: 1.2, seed: 722, t: W(72, 15) });
  L.put(S, "thought-pic", 1190, 330, { s: 0.48, noTail: true, pic: "prop-music-notes", picS: 1.2, seed: 723, t: W(72, 17) });
  L.put(S, "thought-pic", 1600, 380, { s: 0.5, noTail: true, text: "I like Dave", size: DS.type.title, seed: 724, t: W(72, 23) });
  const a = dave(S, 960, 960, { s: 1.15, face: "thinking", acc: ["glasses"] });
  swap(a, dave(S, 960, 960, { s: 1.15, face: "love", acc: ["glasses"] }), W(72, 24));
});
// 73 "Every head is as messy as his: half-finished sentences, empty bubbles, an urge to lick a pole,"
const crowd5 = [["girl03", 260], ["man07", 600], ["girl08", 1300], ["man06", 1640]];
const MESS = [{ text: "I should|really...", seed: 731 }, { seed: 732 }, { text: "lick|the pole?", seed: 733 }, { text: "where did|I put...", seed: 734 }];
shot(73, 0, (S) => {
  bg(S, "scene-city-street-day");
  crowd5.forEach(([st, x], i) => { guy(S, st, x, 945, { s: 0.9, face: "flat", flip: i > 1 }); think(S, x, 945 - HEAD * 0.9, Object.assign({ s: 0.42, t: W(73, 7 + i * 2) }, MESS[i])); });
  dave(S, 950, 960, { s: 1.0, face: "thinking", acc: ["glasses"] });
});
// 73 "...and underneath it all, a lot of kindness nobody says out loud."
shot(73, 17, (S) => {
  bg(S, "scene-city-street-day");
  crowd5.forEach(([st, x], i) => {
    guy(S, st, x, 945, { s: 0.9, face: "smile", flip: i > 1 });
    fadeOut(think(S, x, 945 - HEAD * 0.9, Object.assign({ s: 0.42 }, MESS[i])), W(73, 18) + i * 0.2, 0.6, 0.35);
    L.put(S, "thought-pic", x + (i > 1 ? -60 : 60), 945 - HEAD * 0.9 - 40, { s: 0.22, noTail: true, pic: "p2-heart-full", picS: 1.5, seed: 735 + i, t: W(73, 19) + i * 0.25 });
  });
  dave(S, 950, 960, { s: 1.0, face: "relieved", acc: ["glasses"] });
});
// 74 "And there's a better superpower than bubbles. In 2018, Tal Eyal and Nicholas Epley ran twenty-five experiments on reading minds."
shot(74, 0, (S) => {
  field(S, "sand", 1);
  dave(S, 330, 920, { s: 1.0, pose: "flex", face: "smile", outfit: "superhero", outfitC: "red" });
  card(S, "A BETTER SUPERPOWER", 960, 120);
  study(S, "2018 · EYAL & EPLEY", W(74, 8));
  for (let i = 0; i < 25; i++) L.put(S, "sci-flask", 860 + (i % 5) * 150, 330 + Math.floor(i / 5) * 120, { s: 0.42, t: W(74, 16) + i * 0.03 });
  card(S, "25 EXPERIMENTS", 1160, 900, { t: W(74, 16) });
});
// 75 "Imagining someone else's point of view didn't reliably make anyone more accurate."
shot(75, 0, (S) => {
  bg(S, "room-waiting-room-light");
  guy(S, "man02", 640, 950, { s: 1.1, face: "thinking", pose: "think" });
  think(S, 640, 950 - HEAD * 1.1, { s: 0.6, pic: "person", picO: { style: "girl10", face: "smile" }, picS: 0.42, picY: 75, seed: 751, dx: 60, t: W(75, 0) });
  guy(S, "girl10", 1350, 950, { s: 1.1, face: "flat", flip: true });
  xMark(S, 1000, 520, 1.2, W(75, 7));
  card(S, "NOT MORE ACCURATE", 1350, 300, { t: W(75, 10) });
});
// 75 "What worked was much less magic. You ask them."
shot(75, 12, (S) => {
  bg(S, "room-waiting-room-light");
  dave(S, 640, 950, { s: 1.1, face: "smile", acc: ["glasses"], pose: "wave" });
  guy(S, SAM.style, 1300, 950, Object.assign({}, SAM, { face: "happy", flip: true }));
  L.put(S, "bubble-round", 860, 370, { s: 0.8, text: "How are you, really?", tail: "left", t: W(75, 18) });
  tick(S, 1300, 330, 1.2, W(75, 19));
  card(S, "ASK", 960, 120, { t: W(75, 18), fill: "green" });
});
