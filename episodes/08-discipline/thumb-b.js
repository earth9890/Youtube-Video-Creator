// theme: dark
// Thumbnail B (dark): "66 DAYS." — calendar of ticks with one empty cell
const S = scene(0, 1, { cam: "none" });
S.text("66", 860, 330, { size: 290, c: GREEN, anchor: "end", t: 0, dur: 0.5 });
S.text("DAYS.", 920, 330, { size: 250, anchor: "start", t: 0, dur: 0.5 });
const C = S.calendar(435, 450, 7, 2, 150, 130, 0, 0.6);
C.cells.forEach((c, i) => { if (i === 9) return; S.tick(c[0], c[1], 1.15, 0.3, 0.2); });
