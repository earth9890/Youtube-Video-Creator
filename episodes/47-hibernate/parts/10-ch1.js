// ===================== chapter 1: Back in April (clips 1-8) =====================
const GEAR = ["beanie", "scarf"]; // Dave's winter gear, outdoors only
// 1 "This is Dave. Dave is done with winter. He has hung a sign on his front door that says: back in April."
shot(1, 0, (S) => {
  bg(S, "ep47-scene-door");
  dave(S, 700, 905, { s: 1.35, acc: GEAR, pose: "hug-self", face: "act-shiver" });
  card(S, "THIS IS DAVE", 700, 130);
}, { cam: "push" });
shot(1, 8, (S) => {
  bg(S, "ep47-scene-door", { close: true });
  dave(S, 540, 900, { s: 1.1, acc: GEAR, pose: "reach", face: "determined" });
  L.put(S, "ep47-sign", 1080, 150, { lines: [SIGN[0]], t: W(1, 12), pop: true });
}, { cam: "push" });
// 2 (@dave) "I'm going to sleep through all of it, like a bear. Wake me when it's April. Not before."
shot(2, 0, (S) => {
  bg(S, "ep47-scene-bedroom");
  L.put(S, "ep47-bed", 1330, 915, { s: 1.15, dave: false });
  daveTalk(S, 560, 930, { s: 1.25, face: "smile", pose: "hips" }, 2);
  think(S, 560, 930 - HEAD * 1.25, { s: 0.62, t: W(2, 9), pic: "ep47-bear", picO: { sleep: true }, picS: 0.95, picY: 40, dx: 130, seed: 3 });
});
shot(2, 11, (S) => {
  bg(S, "ep47-scene-bedroom");
  L.put(S, "ep47-bed", 1330, 915, { s: 1.15, dave: false });
  daveTalk(S, 560, 930, { s: 1.25, face: "determined", pose: "point" }, 2);
  months(S, 1130, 300, { s: 0.95, t: W(2, 11) });
  ring(S, 1130 + 2.5 * 166 * 0.95, 300, 92, 112, W(2, 15));
});
// 3 "So what would happen if humans could hibernate?"
shot(3, 0, (S) => {
  bg(S, "world-snow-forest");
  L.put(S, "ep47-bear", 500, 900, { s: 1.15, sleep: true });
  L.put(S, "ep47-squirrel", 1020, 900, { s: 1.5, sleep: true, zzz: true, t: W(3, 3) });
  L.put(S, "ep47-bed", 1520, 930, { s: 0.85, t: W(3, 5), pop: true });
  card(S, "COULD HUMANS HIBERNATE?", 960, 130, { fill: "yellow" });
}, { cam: "pull" });
// 4 "Could you really skip five months, or would your body quietly refuse?"
shot(4, 0, (S) => {
  field(S, "sky", 1);
  const x0 = 960, y0 = 480;
  months(S, x0, y0, { s: 1.55, t: W(4, 0) });
  for (let i = 0; i < 5; i++) xMark(S, x0 + (i - 2.5) * 166 * 1.55, y0, 1.7, W(4, 3) + i * 0.22);
  card(S, "SKIP FIVE MONTHS?", 960, 160);
}, { cam: "push" });
shot(4, 6, (S) => {
  bg(S, "ep47-scene-bedroom", { time: "light" });
  const d = dave(S, 760, 950, { s: 1.5, pose: "cross", face: "grumpy" });
  think(S, 760, 950 - HEAD * 1.5, { s: 0.55, t: W(4, 9), text: "nope.", size: DS.type.title, dx: 120, seed: 9 });
}, { cam: "zoom", focus: "760 520" });
// 5 "Here is the plan. We'll borrow tricks from a bear, a squirrel and a lemur, and meet the space agency that wants to try it on astronauts."
shot(5, 0, (S) => {
  field(S, "sky", 1);
  panel(S, 960, 520, 1640, 720, T0(S));
  card(S, "THE PLAN", 960, 190, { fill: "yellow" });
  const X = [340, 770, 1170, 1580];
  L.put(S, "ep47-bear", X[0], 700, { s: 0.72 });
  L.put(S, "ep47-squirrel", X[1], 700, { s: 1.4, fat: 0.4 });
  L.put(S, "ep47-lemur", X[2], 700, { s: 1.5 });
  L.put(S, "job-astronaut", X[3], 700, { s: 1.0 });
  ["BEAR", "SQUIRREL", "LEMUR", "SPACE AGENCY"].forEach((s, i) => card(S, s, X[i], 790, { size: DS.type.caption, t: [W(5, 9), W(5, 11), W(5, 14), W(5, 18)][i] }));
}, { cam: "push" });
// 6 "And Dave will find out that his sign is wrong about one very important word."
shot(6, 0, (S) => {
  doorClose(S, 1);
  dave(S, 540, 900, { s: 1.1, acc: GEAR, pose: "think", face: "worried" });
  ring(S, 1295, 298, 150, 62, W(6, 9));
  card(S, "ONE WORD IS WRONG", 960, 600, { t: W(6, 11), fill: "yellow" });
}, { cam: "push" });
// 7 "Scientists keep the terms simple. Torpor is a deep, energy-saving chill. When it lasts for many days, it is called hibernation."
shot(7, 0, (S) => {
  bg(S, "room-science-lab-light");
  doc(S, 520, 940, { s: 1.25, pose: "hold", face: "smile" });
  card(S, "TORPOR", 1260, 230, { t: W(7, 5), fill: "sky" });
  L.put(S, "p2-battery-low", 1450, 640, { s: 2.2, level: 0.2, t: W(7, 8), pop: true });
  L.put(S, "weather-snowflake", 1100, 660, { s: 1.3, t: W(7, 10), pop: true });
  card(S, "DEEP, ENERGY-SAVING CHILL", 1260, 880, { size: DS.type.caption, t: W(7, 8) });
});
shot(7, 11, (S) => {
  field(S, "sky", 1);
  const g = S.grp(), y = 520;
  DS.shape(S, rrect(260, y - 40, 1400, 80, DS.r.sm), "white", { flat: true, w: "detail" });
  DS.shape(S, rrect(260, y - 40, 1400, 80, DS.r.sm), "blue", { w: "detail", parent: g }); grow(g, W(7, 11), 260, y, 1.6);
  for (let i = 0; i < 12; i++) S.draw(`M${300 + i * 118} ${y + 60} v22`, T0(S), 0, { c: DS.c("ink"), w: DS.w.detail });
  card(S, "MANY DAYS", 960, 760, { t: W(7, 13) });
  card(S, "TORPOR", 460, 330, { t: W(7, 5) });
  card(S, "HIBERNATION", 1440, 330, { t: W(7, 19), fill: "yellow" });
  S.arrow(700, 330, 1180, 330, W(7, 17), 0.5, { c: DS.c("ink"), w: DS.w.near });
}, { cam: "push" });
// 8 "Dave turns off the lights, climbs into bed, and waits to become a bear."
shot(8, 0, (S) => {
  bg(S, "ep47-scene-bedroom", { time: "light" });
  L.put(S, "ep47-bed", 1330, 915, { s: 1.15, dave: false });
  L.put(S, "ep47-switch", 760, 540, { s: 0.5, on: true });
  dave(S, 520, 930, { s: 1.2, pose: "reach", face: "smile" });
  L.put(S, "ep47-switch", 760, 540, { s: 0.5, on: false, t: W(8, 3) });
});
shot(8, 7, (S) => {
  bg(S, "ep47-scene-bedroom");
  L.put(S, "ep47-bed", 1120, 925, { s: 1.35, face: "open", zzz: false });
  think(S, 1045, 925 - 190 * 1.35, { s: 0.6, t: W(8, 12), pic: "ep47-bear", picS: 0.95, picY: 40, dx: 20, gap: 30, seed: 8 });
}, { cam: "push" });
