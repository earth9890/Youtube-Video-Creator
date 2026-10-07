// theme: dark
const S = scene(0, 1, { cam: "none" });
S.text("I'LL START", 560, 300, { size: 240 });
S.text("TOMORROW", 560, 560, { size: 300, c: RED });
const D = S.desk(1080, 960, 760, 0, 0.3);
const F = S.fig(1230, 960 - 125, { s: 1.6, sit: true, pose: "head" }).draw(0, 0.4);
F.face(0.4, "tired", 0);
S.laptop(1520, D.top, 1.1, 0, 0.3);
S.clock(1700, 240, 110, 0, 0.3, { h: 11, m: 58 });
const F2 = S.fig(300, 930, { s: 0.9 }).draw(0, 0.3); F2.face(0.3, "cry");
const F3 = S.fig(150, 930, { s: 0.9 }).draw(0, 0.3); F3.face(0.3, "angry");
