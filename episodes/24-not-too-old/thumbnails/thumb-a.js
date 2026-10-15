// look: v3
// A (floor-raiser): big-head Dave, uneasy; a chart with ONE peak at 25 and a red "40" far down the slope. Wrongness: he is past the peak.
const S = scene(0, 1, { cam: "none" });
S.bg("flat", { sky: "#74C8ED", ground: "#6ABB5C", hy: 940 });
const F = S.fig(430, 1890, { s: 4.3, hair: "side", hairC: "#5a3825", outfit: "tee", outfitC: "#2f6fd6" }).instant(0);
F.face(0, "worried", 9);
S.draw(rect(960, 300, 860, 620), 0, 0.1, { w: 10, fill: "#ffffff" });
const X = (a) => 1010 + (a - 10) * 11, B = 850;
S.draw(smooth([[X(10), B], [X(18), B - 260], [X(25), B - 430], [X(33), B - 260], [X(45), B - 110], [X(60), B - 40], [X(80), B - 10]]) + ` L${X(80)} ${B} Z`, 0, 0.1, { w: 8, fill: "#9aa0a6" });
S.draw(line([980, B], [1800, B], 0), 0, 0.1, { w: 8 });
S.draw(circ(X(42), B - 128, 34), 0, 0.1, { w: 8, fill: "#e5383b" });
S.text("40", X(42) + 110, B - 150, { size: 110, c: "#e5383b" });
S.text("TOO LATE?", 960, 210, { size: 210, c: "#FEFE06", halo: "#111111", haloW: 0.1 });
