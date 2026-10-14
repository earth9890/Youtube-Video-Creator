// look: v3
// A (floor-raiser): big-head Dave, worried side-eye, beside a replay screen stuck on "x9". Wrongness: he replayed a five-minute chat nine times.
const S = scene(0, 1, { cam: "none" });
S.bg("flat", { sky: "#74C8ED", ground: "#6ABB5C", hy: 940 });
const F = S.fig(470, 1890, { s: 4.3, hair: "side", hairC: "#5a3825", outfit: "tee", outfitC: "#2f6fd6" }).instant(0);
F.face(0, "worried", 9);
S.draw(rrect(1080, 330, 660, 470, 30), 0, 0.1, { w: 12, fill: "#1d1b1f" });
S.draw(poly([[1330, 440], [1330, 690], [1530, 565], [1330, 440]], 0), 0, 0.1, { w: 10, c: "#ffffff", fill: "#ffffff" });
S.text("×9", 1600, 940, { size: 260, c: "#e5383b", halo: "#111111", haloW: 0.1 });
S.text("BORING?", 960, 200, { size: 210, c: "#FEFE06", halo: "#111111", haloW: 0.1 });
