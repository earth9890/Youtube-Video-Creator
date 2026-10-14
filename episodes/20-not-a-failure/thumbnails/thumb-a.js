// look: v3
// A (floor-raiser): big-head Dave, uneasy; the rejection letter that starts "UNFORTUNATELY". Wrongness: one word decided who he is.
const S = scene(0, 1, { cam: "none" });
S.bg("flat", { sky: "#74C8ED", ground: "#6ABB5C", hy: 940 });
const F = S.fig(450, 1890, { s: 4.3, hair: "side", hairC: "#5a3825", outfit: "tee", outfitC: "#2f6fd6" }).instant(0);
F.face(0, "worried", 9);
S.draw(rect(960, 360, 880, 520), 0, 0.1, { w: 10, fill: "#ffffff" });
S.text("UNFORTUNATELY", 1400, 620, { size: 100, c: "#e5383b" });
[1, 2].forEach((i) => S.draw(line([1030, 680 + i * 60], [1770, 680 + i * 60], 0), 0, 0.1, { w: 5, c: "#9ad4f5" }));
S.text("FAILURE?", 960, 210, { size: 220, c: "#FEFE06", halo: "#111111", haloW: 0.1 });
