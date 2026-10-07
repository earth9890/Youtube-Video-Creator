// theme: dark
// thumbnail B (dark): WHAT IF… + hamster wheel with hero
const S = scene(0, 1, { cam: "none" });
S.text("WHAT", 560, 440, { size: 220, font: "caveat", c: GRAY, t: 0, dur: 0.4 });
S.text("IF…", 560, 700, { size: 270, font: "caveat", c: ORANGE, t: 0.1, dur: 0.4 });
S.hamsterWheel(1350, 520, 300, 0, 0.5);
S.fig(1290, 760, { s: 1.1, w: 11 }).draw(0, 0.5).face(0.5, "worried");
