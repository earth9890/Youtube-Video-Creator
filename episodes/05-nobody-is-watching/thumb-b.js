// theme: dark
// Thumbnail B (dark): ONLY 23% NOTICED — hero in the printed T-shirt in front of a crowd
const S = scene(0, 1, { cam: "none" });
S.text("ONLY", 990, 250, { size: 210, anchor: "end", t: 0, dur: 0.5 });
S.text("23%", 1050, 250, { size: 210, anchor: "start", c: GREEN, t: 0, dur: 0.5 });
S.text("NOTICED", 960, 460, { size: 210, t: 0, dur: 0.5 });
const F = S.fig(540, 980, { s: 1.15 }).draw(0, 0.5);
F.face(0.5, "worried", 6);
S.shirt(540, F.sh[1] + 62, 0.98, 0.1, 0.5, { print: true });
S.crowd(6, 1000, 980, 140, 0.65, 0, 0.5);
