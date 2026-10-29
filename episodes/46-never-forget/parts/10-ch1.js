// ===================== chapter 1: The wish (clips 1-9) =====================
// small drawn icons for the wish
const psign = (S, x, y, k, t) => { const g = S.grp(); DS.shape(S, rect(x - 8 * k, y, 16 * k, 150 * k), "gray", { w: "detail", parent: g }); DS.shape(S, rrect(x - 70 * k, y - 140 * k, 140 * k, 140 * k, DS.r.sm), "blue", { w: "mid", parent: g }); S.text("P", x, y - 36 * k, { size: DS.type.display, c: DS.c("white"), t, parent: g }); return fadeG(S, g, t); };
const nametag = (S, x, y, k, t) => { const g = S.grp(); DS.shape(S, rrect(x - 110 * k, y - 70 * k, 220 * k, 140 * k, DS.r.sm), "white", { w: "mid", parent: g }); DS.shape(S, rrect(x - 110 * k, y - 70 * k, 220 * k, 44 * k, DS.r.sm), "red", { w: "mid", parent: g }); S.text("HELLO", x, y - 38 * k, { size: DS.type.caption, c: DS.c("white"), t, parent: g }); S.text("MY NAME IS", x, y + 4 * k, { size: DS.type.caption, c: DS.c("ink"), t, parent: g }); return fadeG(S, g, t); };
// 1 "This is Dave. Dave has forgotten where he parked. It is the fourth time this week,"
shot(1, 0, (S) => {
  bg(S, "scene-city-street-day");
  L.put(S, "ride-parking-lot", 1400, 930, { s: 0.95 });
  dave(S, 640, 945, { s: 1.15, face: "confused", pose: "scratch-head" });
  card(S, "THIS IS DAVE", 960, 130, { t: W(1, 1) });
  L.put(S, "fx-question-marks", 720, 440, { s: 0.7, t: W(1, 5) });
  const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"], hit = [0, 1, 3, 5];
  days.forEach((d, i) => {
    const x = 330 + i * 210;
    panel(S, x, 310, 180, 150, W(1, 9));
    txt(S, d, x, 275, { t: W(1, 9), size: DS.type.caption });
    const k = hit.indexOf(i);
    if (k >= 0) txt(S, "P?", x, 350, { t: W(1, 12) + k * 0.28, size: DS.type.title, c: DS.c("red", 2) });
  });
}, { cam: "push" });
// 1 "and the car is somewhere in a very large field."
shot(1, 16, (S) => {
  bg(S, "ep46-field", { car: true });
  dave(S, 430, 960, { s: 1.0, face: "worried", pose: "look-up" });
}, { cam: "pull" });
// 2 "I wish I never forgot anything. Not a name, not a date, not one single parking space." + 3 "His wish is granted on the spot."
shot(2, 0, (S) => {
  bg(S, "scene-park-night");
  L.put(S, "star-shooting", 1250, 150, { s: 1.0, t: W(2, 2) });
  nametag(S, 400, 330, 1.2, W(2, 8));
  L.put(S, "prop-calendar", 760, 340, { s: 1.7, t: W(2, 11) });
  psign(S, 1100, 250, 1.3, W(2, 15));
  daveTalk(S, 960, 945, { s: 1.15, pose: "pray-hands", face: "smile" }, 2);
  L.put(S, "fx-star-burst", 1620, 430, { s: 1.3, t: W(3, 2) });
  card(S, "GRANTED", 1620, 640, { t: W(3, 3), fill: "green" });
}, { cam: "push" });
// 3 "From now on, Dave will remember every day of his life, in full and for good."
shot(3, 7, (S) => {
  field(S, "wall", 1);
  dave(S, 330, 945, { s: 1.1, pose: "thumbs-up", face: "happy" });
  card(S, "NOW", 640, 300, { fill: "yellow" });
  arrowR(S, 600, 560, 1450, 560, W(3, 7) + 0.2);
  [0, 1, 2, 3, 4].forEach((i) => L.put(S, "p2-tear-calendar", 760 + i * 150, 440, { s: 0.85, day: 3 + i * 5, t: i ? W(3, 13) + i * 0.35 : undefined }));
  shelf(S, 1650, 945, 5, { s: 0.8, rows: 2, wd: 300, t: W(3, 18) });
  card(S, "EVERY DAY. FOR GOOD.", 1130, 150, { t: W(3, 18) });
}, { cam: "none" });
// 4 "It does not help with today's car. The wish only covers what happens from now on."
shot(4, 0, (S) => {
  field(S, "wall", 1);
  S.fill(rect(-40, 180, 880, 800), T0(S), 0, DS.c("gray", 1), 0.45);
  S.fill(rect(840, 180, 1200, 800), T0(S), 0, DS.c("green", 1), 0.5);
  S.draw(`M840 180 V940`, T0(S), 0, { c: DS.c("ink"), w: DS.w.near });
  card(S, "BEFORE THE WISH", 420, 130, { t: W(4, 0) });
  L.put(S, "ride-car-red", 420, 640, { s: 0.7 });
  card(S, "TODAY'S CAR", 420, 330, { fill: "yellow" });
  xMark(S, 420, 520, 2.4, W(4, 6));
  card(S, "FROM NOW ON", 1380, 130, { t: W(4, 11), fill: "green" });
  [0, 1, 2, 3, 4, 5].forEach((i) => binder(S, 1020 + i * 90, 700, "", { c: ["blue", "red", "green", "orange", "purple", "teal"][i], t: W(4, 11) + i * 0.25 }));
  const a = dave(S, 840, 945, { s: 1.1, pose: "shrug", face: "sad" });
  swap(a, dave(S, 840, 945, { s: 1.1, pose: "point", face: "smile" }), W(4, 11));
}, { cam: "none" });
// 5 "So what would happen if you never forgot anything?"
shot(5, 0, (S) => {
  bg(S, "scene-city-street-day");
  dave(S, 960, 960, { s: 1.35, pose: "think", face: "thinking" });
  L.put(S, "fx-question-marks", 1280, 520, { s: 1.1, t: W(5, 1) });
  card(S, "NEVER FORGET ANYTHING", 960, 130, { t: W(5, 3), fill: "yellow" });
}, { cam: "push" });
// 6 "Would you become a genius, or the most tired person alive?"
shot(6, 0, (S) => {
  bg(S, "room-library-light");
  dave(S, 560, 945, { s: 1.15, pose: "arms-out", face: "smug", acc: ["glasses"] });
  L.put(S, "fx-lightbulb", 560, 300, { s: 1.2, t: W(6, 3) });
  card(S, "GENIUS", 560, 150, { t: W(6, 4), fill: "yellow" });
  dave(S, 1360, 945, { s: 1.15, pose: "sad", face: "sleepy", t: W(6, 6) });
  L.put(S, "fx-zzz", 1360, 330, { s: 1.0, t: W(6, 8) });
  card(S, "MOST TIRED", 1360, 150, { t: W(6, 7) });
}, { cam: "push" });
// 7 "Here is the plan. First we meet the people who can really do this. Then we give Dave the full version."
shot(7, 0, (S) => {
  field(S, "sand", 1);
  panel(S, 960, 560, 1500, 700, S.start);
  card(S, "THE PLAN", 960, 190, { t: W(7, 2), fill: "yellow" });
  txt(S, "1  MEET THE REAL PEOPLE", 460, 460, { size: DS.type.body, anchor: "start" });
  doc(S, 330, 560, { s: 0.5 });
  txt(S, "2  GIVE DAVE THE FULL VERSION", 460, 690, { t: W(7, 14), size: DS.type.body, anchor: "start" });
  dave(S, 330, 790, { s: 0.5, face: "smile", t: W(7, 16) });
  tick(S, 1560, 440, 1.0, W(7, 13));
}, { cam: "none" });
// 8 "And by the end, he will be begging his Brain for a delete button."
shot(8, 0, (S) => {
  bg(S, "kit-room-library-day");
  dave(S, 600, 950, { s: 1.15, pose: "kneel", face: "sob" });
  brain(S, 1260, 950, 1.35, "stern", { armR: "point" });
  L.put(S, "ep46-delete-key", 1180, 330, { s: 0.8, t: W(8, 11) });
  card(S, "BEGGING", 600, 150, { t: W(8, 7), fill: "yellow" });
}, { cam: "push" });
// 9 "Quick note, Dave. I've started a shelf. One binder per day."
shot(9, 0, (S) => {
  bg(S, "room-bedroom-light");
  dave(S, 600, 950, { s: 1.15, face: "worried" });
  brainTalk(S, 610, 950 - HEAD * 1.15 + 14, 0.7, "tired", 9, { t: W(9, 0) });
  shelf(S, 1360, 950, 6, { s: 1.0, rows: 2, wd: 300, t: W(9, 5) });
  card(S, "ONE BINDER PER DAY", 1360, 160, { t: W(9, 7), fill: "yellow" });
}, { cam: "none" });
// 9 "I'm going to need a much bigger shelf."
shot(9, 11, (S) => {
  bg(S, "room-bedroom-light");
  dave(S, 520, 950, { s: 1.15, face: "worried" });
  brainTalk(S, 530, 950 - HEAD * 1.15 + 14, 0.7, "worried", 9);
  shelf(S, 1180, 950, 20, { s: 0.9, rows: 4, wd: 380, t: W(9, 15) });
  shelf(S, 1620, 950, 10, { s: 0.9, rows: 4, wd: 380, t: W(9, 17) });
}, { cam: "pull" });
