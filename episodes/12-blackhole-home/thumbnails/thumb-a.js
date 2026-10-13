// look: v3
const OR = "#ff9f1c", OR2 = "#ffd166";
const S = scene(0, 1, { cam: "none" });
S.bg("black");
for (let i = 0; i < 60; i++) S.fill(circ(rnd() * 1920, rnd() * 1080, 2 + rnd() * 3), 0, 0.1, "#ffffff", 0.85);
const x = 1220, y = 600, r = 300;
S.draw(smooth(arcPts(x, y, r * 2.0, 180, 360, 24, r * 0.5)), 0, 0.2, { w: r * 0.18, c: OR });
S.draw(smooth(arcPts(x, y + r * 0.1, r * 1.3, 170, 370, 24, r * 1.25)), 0, 0.2, { w: r * 0.16, c: OR });
S.draw(circ(x, y, r), 0, 0.2, { w: 8, c: "#000", fill: "#000" });
S.draw(circ(x, y, r * 1.06), 0, 0.2, { w: 5, c: OR2 });
// home inside the hole, glowing window
const hx = 1220, hy = 690, s = 1.05;
S.draw(rect(hx - 110 * s, hy - 170 * s, 220 * s, 170 * s), 0, 0.2, { w: 7, fill: "#f6e7c8" });
S.draw(poly([[hx - 140 * s, hy - 165 * s], [hx, hy - 300 * s], [hx + 140 * s, hy - 165 * s], [hx - 140 * s, hy - 165 * s]], 2), 0, 0.2, { w: 7, fill: "#d1495b" });
S.draw(rect(hx - 30 * s, hy - 100 * s, 60 * s, 100 * s), 0, 0.2, { w: 6, fill: "#8a5a3c" });
S.draw(rect(hx + 45 * s, hy - 140 * s, 50 * s, 50 * s), 0, 0.2, { w: 5, fill: "#ffe066" });
S.draw(smooth(arcPts(x, y, r * 2.0, 0, 180, 24, r * 0.5)), 0, 0.2, { w: r * 0.18, c: OR });
const F = S.fig(400, 1060, { s: 1.9, hair: "short", outfit: "tee", outfitC: "#2f6fd6" }).instant(0);
F.face(0, "worried", 6);
S.text("WE LIVE HERE?", 960, 190, { size: 190, c: "#FEFE06", halo: "#111111", haloW: 0.16 });
