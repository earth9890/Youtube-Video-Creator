// thumbnail A (light): 91% NEVER HAPPENS + pie + small worried hero
const S = scene(0, 1, { cam: "none" });
S.text("91%", 560, 400, { size: 230, c: GREEN, t: 0, dur: 0.4 });
S.text("NEVER", 560, 600, { size: 170, t: 0.1, dur: 0.4 });
S.text("HAPPENS", 560, 790, { size: 170, t: 0.2, dur: 0.4 });
S.pie(1420, 420, 280, 0.914, 0, 0.5, { cBig: GREEN, cSmall: RED });
S.fig(1420, 1010, { s: 0.75 }).draw(0, 0.5).face(0.5, "worried");
