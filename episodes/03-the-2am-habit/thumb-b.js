// Thumbnail B (light) — "YOU'RE NOT BROKEN." with BROKEN struck out; small hero.
const S = scene(0, 1, { cam: "none" });
S.text("YOU'RE NOT", 960, 330, { size: 170, t: 0, dur: 0.5 });
S.text("BROKEN.", 960, 600, { size: 230, c: RED, t: 0, dur: 0.5 });
S.draw(line([500, 535], [1420, 520], 6), 0, 0.4, { c: INK, w: 18 });
const F = S.fig(960, 940, { s: 0.8 });
F.draw(0, 0.5);
F.face(0.5, "smile");
