// theme: dark
// Thumbnail B: ONLY 23% / NOTICED. — big hero in the printed T-shirt, gray crowd behind looking away
const S = scene(0, 1, { cam: "none" });
S.text("ONLY", 1060, 280, { size: 280, anchor: "end", t: 0, dur: 0.5 });
S.text("23%", 1120, 280, { size: 280, anchor: "start", c: GREEN, t: 0, dur: 0.5 });
S.text("NOTICED.", 1100, 540, { size: 230, t: 0, dur: 0.5 });
const CR = S.crowd(6, 760, 980, 180, 0.9, 0, 0.5, { c: GRAY });
CR.forEach((C) => C.face(0.5, "flat", 12)); // hero is on the left, so "away" = gaze right
const F = S.fig(330, 1000, { s: 1.7 }).draw(0, 0.5);
F.face(0.5, "wow", 0);
S.shirt(330, F.sh[1] + 94, 1.45, 0.1, 0.5, { print: true });
