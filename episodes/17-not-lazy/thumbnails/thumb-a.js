// look: v3
// A (floor-raiser): big-head Dave, uneasy side-eye, next to a spotless, sparkling oven. Wrongness: the "lazy" man just scrubbed an oven.
const S = scene(0, 1, { cam: "none" });
S.bg("flat", { sky: "#202C36", ground: "#FCA55D", hy: 1000 });
const star = (cx, cy, k) => S.draw(poly([[cx, cy - 60 * k], [cx + 14 * k, cy - 14 * k], [cx + 60 * k, cy], [cx + 14 * k, cy + 14 * k], [cx, cy + 60 * k], [cx - 14 * k, cy + 14 * k], [cx - 60 * k, cy], [cx - 14 * k, cy - 14 * k], [cx, cy - 60 * k]], 0), 0, 0.1, { w: 5, fill: "#F4BC22" });
S.draw(rrect(1010, 330, 640, 760, 24), 0, 0.1, { w: 12, fill: "#ffffff" });
S.draw(rect(1010, 330, 640, 120), 0, 0.1, { w: 10, fill: "#c4c8cc" });
[1110, 1250, 1390, 1530].forEach((x) => S.draw(circ(x, 390, 26), 0, 0.1, { w: 6, fill: "#1d1b1f" }));
S.draw(rrect(1080, 500, 500, 24, 10), 0, 0.1, { w: 8, fill: "#9aa0a6" });
S.draw(rrect(1080, 570, 500, 400, 20), 0, 0.1, { w: 10, fill: "#1f2a44" });
S.draw(line([1170, 920], [1290, 640], 0) + line([1250, 920], [1340, 760], 0), 0, 0.1, { w: 14, c: "#ffffff" });
star(1060, 360, 1.3); star(1610, 600, 1.0); star(1530, 930, 0.8);
const F = S.fig(470, 1890, { s: 4.3, hair: "side", hairC: "#5a3825", outfit: "tee", outfitC: "#2f6fd6" }).instant(0);
F.face(0, "worried", 9);
S.text("LAZY?", 960, 210, { size: 220, c: "#FEFE06", halo: "#111111", haloW: 0.1 });
