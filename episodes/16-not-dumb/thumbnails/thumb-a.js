// look: v3
// A (floor-raiser): big-head Dave, puzzled; a test paper whose only answer is "PAGE 87". Wrongness: the only thing he remembered.
const S = scene(0, 1, { cam: "none" });
S.bg("flat", { sky: "#74C8ED", ground: "#6ABB5C", hy: 940 });
const F = S.fig(470, 1890, { s: 4.3, hair: "side", hairC: "#5a3825", outfit: "tee", outfitC: "#2f6fd6" }).instant(0);
F.face(0, "worried", 9);
S.draw(rect(1080, 300, 620, 740), 0, 0.1, { w: 10, fill: "#ffffff" });
[1, 2, 3].forEach((i) => S.draw(line([1130, 390 + i * 70], [1650, 390 + i * 70], 0), 0, 0.1, { w: 4, c: "#9ad4f5" }));
S.text("TEST", 1390, 400, { size: 90 });
S.text("PAGE 87", 1390, 800, { size: 140, c: "#e5383b" });
S.text("DUMB?", 960, 200, { size: 210, c: "#FEFE06", halo: "#111111", haloW: 0.1 });
