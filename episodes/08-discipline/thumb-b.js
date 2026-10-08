// theme: dark
// Thumbnail B: "66 DAYS." — hero marking the next tick on a 7×3 calendar that is 2/3 done
const S = scene(0, 1, { cam: "none" });
S.text("66", 820, 320, { size: 320, c: GREEN, anchor: "end", t: 0, dur: 0.4 });
S.text("DAYS.", 880, 320, { size: 250, anchor: "start", t: 0, dur: 0.4 });
const C = S.calendar(170, 380, 7, 3, 150, 120, 0, 0.4);
C.cells.slice(0, 13).forEach((c) => S.tick(c[0], c[1], 1.1, 0.3, 0.1));
S.tick(C.cells[13][0], C.cells[13][1], 1.1, 0.5, 0.1); // the one being marked
const F = S.fig(1376, 1000, { s: 1.5, pose: "reachL" }).draw(0, 0.4);
F.face(0.4, "determined", -8);
