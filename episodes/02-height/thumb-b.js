// theme: dark
// thumbnail B (dark): "NOT YOUR FAULT." — small orange hero behind a tall crowd
const S = scene(0, 1, { cam: "none" });
S.text("NOT YOUR", 620, 470, { size: 200, font: "caveat", c: ORANGE, t: 0, dur: 0.5 });
S.text("FAULT.", 620, 730, { size: 200, font: "caveat", c: ORANGE, t: 0, dur: 0.5 });
const F = S.fig(1485, 860, { s: 0.75, c: ORANGE }).draw(0, 0.5);
F.face(0.5, "sad");
S.crowd(4, 1200, 920, 190, 1.25, 0, 0.6);
