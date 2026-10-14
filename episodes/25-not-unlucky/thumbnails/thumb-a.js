// look: v3
// A (floor-raiser): big-head Dave squinting at a tiny photo while the same page shouts "WIN $250". Wrongness: the prize is right in front of him.
const S = scene(0, 1, { cam: "none" });
S.bg("flat", { sky: "#74C8ED", ground: "#6ABB5C", hy: 940 });
const F = S.fig(430, 1890, { s: 4.3, hair: "side", hairC: "#5a3825", outfit: "tee", outfitC: "#2f6fd6" }).instant(0);
F.face(0, "worried", 9);
S.draw(rect(960, 330, 800, 640), 0, 0.1, { w: 10, fill: "#fbf7ef" });
[[1000, 370], [1250, 370], [1500, 370]].forEach(([x, y]) => S.draw(rect(x, y, 220, 150), 0, 0.1, { w: 6, fill: "#a9dcf5" }));
S.draw(rect(1000, 560, 720, 370), 0, 0.1, { w: 8, fill: "#ffcf33" });
S.text("WIN $250", 1360, 795, { size: 140, c: "#e5383b" });
S.text("UNLUCKY?", 960, 210, { size: 210, c: "#FEFE06", halo: "#111111", haloW: 0.1 });
