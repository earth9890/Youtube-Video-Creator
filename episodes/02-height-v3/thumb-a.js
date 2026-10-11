// theme: dark
// thumbnail A: "TOO SHORT?" — hero crying between two towering grey figures, their eye-level line over his head
const S = scene(0, 1, { cam: "none" });
S.text("TOO", 700, 330, { size: 280, anchor: "end", t: 0, dur: 0.5 });
S.text("SHORT?", 745, 330, { size: 280, anchor: "start", c: RED, t: 0, dur: 0.5 });
S.fig(1200, 970, { s: 1.8, c: GRAY }).draw(0, 0.5);
S.fig(1680, 970, { s: 1.8, c: GRAY }).draw(0, 0.5);
const F = S.fig(1440, 970, { s: 1.1 }).draw(0, 0.5);
F.face(0.5, "cry", 0);
S.draw(line([1290, 420], [1590, 420], 2), 0.3, 0.3, { c: GRAY, w: 5 }); // their eye level
