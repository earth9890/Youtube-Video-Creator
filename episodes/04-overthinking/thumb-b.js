// theme: dark
// thumbnail B: 91% NEVER / HAPPENS. — hero looks up at a pie that is almost all green
const S = scene(0, 1, { cam: "none" });
S.text("91%", 120, 300, { size: 260, c: GREEN, anchor: "start", t: 0, dur: 0.4 });
S.text("NEVER", 540, 300, { size: 260, anchor: "start", t: 0.1, dur: 0.4 });
S.text("HAPPENS.", 120, 560, { size: 240, anchor: "start", t: 0.2, dur: 0.4 });
S.pie(1480, 420, 260, 0.914, 0, 0.5, { cBig: GREEN, cSmall: RED });
S.fig(1130, 1000, { s: 1.5 }).draw(0, 0.5).face(0.5, "wow", 8);
