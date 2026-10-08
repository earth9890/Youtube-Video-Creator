// theme: dark
// thumb A: the pain moment — frozen before the START door, "WHAT IF I FAIL?"
const S = scene(0, 1, { cam: "none" });
S.text("WHAT IF", 560, 330, { size: 240, t: 0, dur: 0.5 });
S.text("I", 140, 640, { size: 300, anchor: "start", t: 0, dur: 0.5 });
S.text("FAIL?", 330, 640, { size: 300, anchor: "start", c: RED, t: 0, dur: 0.5 });
S.door(1580, 430, 260, 540, 0, 0.4, { sign: "START" });
const F = S.fig(1360, 970, { s: 1.6 }).draw(0, 0.5);
F.face(0.5, "worried", 6);
S.hourglass(1160, 870, 1.0, 0, 0.4);
