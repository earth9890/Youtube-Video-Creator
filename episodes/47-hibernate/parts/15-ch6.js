// ===================== chapter 6: Mars (clips 48-58) =====================
const deep = (S) => { field(S, "navy", 2); let r = 7; const rnd = () => ((r = (r * 16807) % 2147483647) - 1) / 2147483646; for (let i = 0; i < 70; i++) S.fill(circ(rnd() * 1920, rnd() * 930, 1.5 + rnd() * 2.5), T0(S), 0, DS.P.white[0], 0.45 + rnd() * 0.5); };   // plain starfield
// 48 "But one organisation is very interested in the switch. In 2019, engineers at the European Space Agency designed a spacecraft where the crew hibernates on the way to Mars."
shot(48, 0, (S) => {
  bg(S, "scene-office-district-day");
  L.put(S, "job-engineer", 500, 930, { s: 1.4, t: W(48, 2) });
  L.put(S, "ep47-switch", 1280, 560, { s: 1.5, on: false, t: W(48, 7), pop: true });
  card(S, "A SPACE AGENCY", 960, 130, { t: W(48, 2), fill: "yellow" });
}, { cam: "push" });
shot(48, 9, (S) => {
  field(S, "navy", 1);
  L.put(S, "job-engineer", 400, 930, { s: 1.2 }); L.put(S, "job-engineer", 740, 930, { s: 1.2, flip: true, t: W(48, 12) });
  card(S, "2019 · EUROPEAN SPACE AGENCY", 960, 140, { t: W(48, 9), size: DS.type.small });
  L.put(S, "ep47-ship", 1380, 560, { s: 0.8, quarters: true, pods: 6, t: W(48, 19), pop: true });
});
shot(48, 22, (S) => {
  deep(S);
  L.put(S, "ep47-ship", 760, 560, { s: 1.0, quarters: true, pods: 6 });
  L.put(S, "space-planet-mars", 1600, 360, { s: 1.8, t: W(48, 29), pop: true });
  card(S, "THE CREW HIBERNATES", 760, 140, { t: W(48, 23), fill: "yellow" });
});
// 49 "Their plan: a hundred-and-eighty-day cruise, with every astronaut's metabolism cut by seventy-five percent, using a drug to start a state called torpor."
shot(49, 0, (S) => {
  deep(S);
  L.put(S, "space-planet-earth", 330, 600, { s: 1.5 });
  L.put(S, "space-planet-mars", 1600, 600, { s: 1.2 });
  const arc = S.draw(`M480 560 Q960 280 1480 560`, W(49, 3), 0, { c: DS.c("white"), w: DS.w.mid }); drawOn(arc, W(49, 3), 2.0);
  L.put(S, "ep47-ship", 960, 430, { s: 0.3 });
  countUp(S, 960, 800, 0, 180, W(49, 2), 1.4, { fmt: (n) => Math.round(n) + " DAYS", size: DS.type.display, c: DS.P.white[0], anchor: "middle" });
});
shot(49, 6, (S) => {
  field(S, "sky", 1);
  L.put(S, "job-astronaut", 560, 930, { s: 1.5, t: W(49, 6) });
  L.put(S, "ep47-dial", 1300, 600, { s: 1.6, v: 0.25, label: "−75 %", c: "orange", t: W(49, 8) });
  card(S, "EVERY ASTRONAUT'S METABOLISM", 960, 130, { t: W(49, 7), fill: "yellow", size: DS.type.caption });
});
shot(49, 13, (S) => {
  field(S, "navy", 1);
  L.put(S, "med-pills", 620, 560, { s: 2.8, t: W(49, 14), pop: true });
  S.arrow(900, 560, 1260, 560, W(49, 16), 0.5, { c: DS.P.white[0], w: DS.w.near });
  card(S, "TORPOR", 1500, 560, { t: W(49, 20), fill: "yellow", size: DS.type.title });
  card(S, "A DRUG TO START IT", 620, 800, { t: W(49, 15), size: DS.type.caption });
});
// 50 "Sleeping crews don't need living space. Taking out the crew quarters made the spacecraft about a third lighter."
shot(50, 0, (S) => {
  deep(S);
  L.put(S, "ep47-ship", 960, 600, { s: 1.5, quarters: true, pods: 6 });
  card(S, "CREW QUARTERS", 760, 220, { t: W(50, 4), size: DS.type.caption });
  xMark(S, 880, 360, 3.2, W(50, 2));
}, { cam: "push" });
shot(50, 6, (S) => {
  deep(S);
  const a = L.put(S, "ep47-ship", 960, 600, { s: 1.5, quarters: true, pods: 6 });
  swap(a, L.put(S, "ep47-ship", 960, 600, { s: 1.5, pods: 6, t: W(50, 7) }), W(50, 7), 0.9);
  card(S, "TAKE OUT THE QUARTERS", 960, 160, { t: W(50, 7), fill: "yellow" });
});
shot(50, 14, (S) => {
  field(S, "navy", 1);
  L.put(S, "ep47-ship", 640, 400, { s: 0.65, quarters: true, pods: 6 });
  L.put(S, "ep47-ship", 640, 760, { s: 0.65, pods: 6, t: W(50, 15) });
  hbar(S, "", 1010, 400, 700, 1.0, "gray", W(50, 14), "");
  hbar(S, "", 1010, 760, 700, 0.67, "orange", W(50, 15), "");
  card(S, "ABOUT A THIRD LIGHTER", 1360, 580, { t: W(50, 15), fill: "yellow" });
});
// 51 "The agency's own research team calls metabolic reduction a game changer, for space and for medicine."
shot(51, 0, (S) => {
  field(S, "sky", 1);
  card(S, "GAME CHANGER", 960, 170, { size: DS.type.display, fill: "yellow" });
  L.put(S, "ep-rocket", 560, 780, { s: 1.0 }); card(S, "SPACE", 560, 880, { size: DS.type.caption });
  L.put(S, "ep-heart", 1360, 660, { s: 2.2 }); card(S, "MEDICINE", 1360, 880, { size: DS.type.caption });
});
// 52 "The reference mission was six people on a five-year round trip. Food and water needs could fall by up to seventy-five percent, which is the point of the whole idea."
shot(52, 0, (S) => {
  field(S, "sky", 1);
  for (let i = 0; i < 6; i++) L.put(S, "job-astronaut", 340 + i * 250, 930, { s: 1.0 });
  const loop = S.draw(`M300 380 Q960 60 1620 380 Q960 220 300 380`, W(52, 8), 0, { c: DS.c("ink"), w: DS.w.mid }); drawOn(loop, W(52, 8), 1.6);
  card(S, "SIX PEOPLE · FIVE-YEAR ROUND TRIP", 960, 150, { fill: "yellow", size: DS.type.caption });
});
shot(52, 11, (S) => {
  field(S, "sky", 1);
  for (let i = 0; i < 4; i++) L.put(S, "furn-crate", 480 + (i % 2) * 190, 640 - Math.floor(i / 2) * 150, { s: 1.5, t: W(52, 11) });
  S.arrow(840, 520, 1160, 520, W(52, 16), 0.5, { c: DS.c("ink"), w: DS.w.near });
  L.put(S, "furn-crate", 1500, 640, { s: 1.5, t: W(52, 16) });
  card(S, "FOOD AND WATER", 580, 850, { size: DS.type.caption });
  card(S, "UP TO −75 %", 1500, 850, { t: W(52, 20), fill: "yellow" });
  card(S, "THE POINT OF THE WHOLE IDEA", 960, 140, { t: W(52, 22), size: DS.type.caption });
});
// 53 "Like hibernating animals, the crew would build body fat beforehand, and need about twenty-one days to recover after waking. Based on animal hibernation, the planners do not expect them to lose bone or muscle."
shot(53, 0, (S) => {
  field(S, "sky", 1);
  L.put(S, "job-astronaut", 560, 930, { s: 1.5 });
  const a = L.put(S, "p2-battery-low", 1300, 560, { s: 3.4, level: 0.15 });
  swap(a, L.put(S, "p2-battery-full", 1300, 560, { s: 3.4, level: 1, t: W(53, 6) }), W(53, 6), 1.2);
  card(S, "BODY FAT FIRST", 1300, 850, { t: W(53, 7), fill: "yellow" });
});
shot(53, 10, (S) => {
  field(S, "sky", 1);
  L.put(S, "job-astronaut", 560, 930, { s: 1.5, face: "sleepy" });
  countUp(S, 1300, 560, 0, 21, W(53, 13), 1.4, { fmt: (n) => Math.round(n) + " DAYS", size: DS.type.display, c: DS.c("ink"), anchor: "middle" });
  card(S, "TO RECOVER AFTER WAKING", 1300, 700, { t: W(53, 15), fill: "yellow", size: DS.type.caption });
});
shot(53, 19, (S) => {
  field(S, "sky", 1);
  L.put(S, "body-bone", 560, 560, { s: 3.2, rot: -25 });
  L.put(S, "body-muscle-arm", 1360, 560, { s: 2.6 });
  tick(S, 760, 440, 3, W(53, 30)); tick(S, 1560, 440, 3, W(53, 32));
  card(S, "BONE", 560, 840, { t: W(53, 30), size: DS.type.caption }); card(S, "MUSCLE", 1360, 840, { t: W(53, 32), size: DS.type.caption });
  card(S, "EXPECTED, BASED ON ANIMALS", 960, 140, { t: W(53, 19), size: DS.type.caption });
});
// 54 "With the whole crew asleep, the ship would have to run itself, using artificial intelligence to manage faults."
shot(54, 0, (S) => {
  deep(S);
  L.put(S, "ep47-ship", 960, 640, { s: 1.5, pods: 6, quarters: true });
  card(S, "THE WHOLE CREW ASLEEP", 960, 130, { t: W(54, 2), fill: "yellow", size: DS.type.caption });
});
shot(54, 9, (S) => {
  field(S, "navy", 1);
  L.put(S, "crt-robot-assistant", 700, 930, { s: 1.8, face: "smile", pose: "wave", t: W(54, 10) });
  L.put(S, "ep-warning-triangle", 1200, 560, { s: 2.2, t: W(54, 17), pop: true });
  tick(S, 1560, 540, 3.4, W(54, 17));
  card(S, "AUTOPILOT", 700, 150, { t: W(54, 10), fill: "yellow" });
  card(S, "MANAGING FAULTS", 1380, 820, { t: W(54, 16), size: DS.type.caption });
});
// 55 "A sign on the door is not fault management."
shot(55, 0, (S) => {
  bg(S, "room-spaceship-cabin-light");
  L.put(S, "ep47-sign", 960, 160, { s: 0.8, lines: [SIGN[0]], t: W(55, 2) });
  L.put(S, "ep-warning-triangle", 1500, 480, { s: 1.5, t: W(55, 3) });
  card(S, "FAULT", 1500, 660, { t: W(55, 3), size: DS.type.caption, fill: "yellow" });
  dave(S, 480, 960, { s: 1.2, face: "sad", pose: "shrug", acc: ["helmet"] });
});
// 56 "The engineers sketched a roadmap to validate it within twenty years, starting with animals and then moving to people."
shot(56, 0, (S) => {
  field(S, "sand", 1);
  const road = S.draw(smooth([[200, 760], [520, 640], [860, 720], [1200, 560], [1560, 500], [1720, 420]]), S.start, 0, { c: DS.c("ink"), w: DS.w.far * 2 }); 
  card(S, "NOW", 200, 860, { size: DS.type.caption }); card(S, "THE ROADMAP", 960, 150, { fill: "yellow" });
  L.put(S, "animal-mouse", 820, 650, { s: 2.2 }); card(S, "ANIMALS", 820, 830, { size: DS.type.caption });
  dave(S, 1300, 600, { s: 1.0, pose: "wave" }); card(S, "PEOPLE", 1300, 700, { size: DS.type.caption });
  card(S, "WITHIN 20 YEARS", 1650, 280, { fill: "yellow", size: DS.type.caption });
}, { cam: "push" });
// 57 "Twenty years. Dave's sign says April."
shot(57, 0, (S) => {
  field(S, "sky", 1);
  countUp(S, 560, 560, 0, 20, W(57, 0), 1.4, { fmt: (n) => Math.round(n) + " YEARS", size: DS.type.display, c: DS.c("red", 2), anchor: "middle" });
  L.put(S, "ep47-sign", 1380, 200, { s: 0.85, lines: [SIGN[0]] });
  ring(S, 1380 + 0.85 * 215, 200 + 0.85 * 148, 130, 54, W(57, 5));
});
// 58 "Dave adds a fifth line to his sign: sleeping on the way to Mars."
shot(58, 0, (S) => {
  doorClose(S, 5, W(58, 8));
  dave(S, 540, 900, { s: 1.1, acc: GEAR, pose: "reach", face: "smug" });
}, { cam: "push" });
