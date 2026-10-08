// theme: dark
// thumbnail B: "5 CM TALLER." — the same man twice: STUDENT small, PROFESSOR grown, a ruler between
const S = scene(0, 1, { cam: "none" });
S.text("5 CM", 520, 300, { size: 260, c: GREEN, t: 0, dur: 0.5 });
S.text("TALLER.", 520, 560, { size: 220, t: 0, dur: 0.5 });
const A = S.fig(1250, 940, { s: 1.3 }).draw(0, 0.5);
A.face(0.5, "flat", 0);
S.tag(1250, 440, "STUDENT", 0, 0.5, { size: 40 });
S.ruler(1435, 940, 540, 0, 0.5);
const B = S.fig(1680, 940, { s: 1.3 }).draw(0, 0.5);
B.grow(0, 0.05, 1.12);
B.face(0.5, "happy", 0);
S.tag(1680, 385, "PROFESSOR", 0, 0.5, { size: 40 });
