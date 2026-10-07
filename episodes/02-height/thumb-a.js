// thumbnail A (light): "5 CM TALLER" — hero beside a ruler, tagged PROFESSOR
const S = scene(0, 1, { cam: "none" });
S.text("5 CM", 560, 430, { size: 230, c: GREEN, t: 0, dur: 0.5 });
S.text("TALLER", 560, 690, { size: 200, t: 0, dur: 0.5 });
S.ruler(1180, 900, 620, 0, 0.6, { labels: [[0.5, "170"], [0.75, "175"], [1, "180"]] });
const F = S.fig(1500, 900, { s: 1.5 }).draw(0, 0.5);
F.face(0.5, "smile");
S.tag(1500, 960, "PROFESSOR", 0, 0.5, { size: 48 });
