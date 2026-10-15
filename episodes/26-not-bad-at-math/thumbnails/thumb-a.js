// look: v3
// A (floor-raiser): big-head Dave, uneasy, with a masked storm cloud (the worry thief) sitting on his head. Wrongness: a burglar on your brain.
const S = scene(0, 1, { cam: "none" });
S.bg("flat", { sky: "#74C8ED", ground: "#6ABB5C", hy: 940 });
const F = S.fig(560, 1890, { s: 4.3, hair: "side", hairC: "#5a3825", outfit: "tee", outfitC: "#2f6fd6" }).instant(0);
F.face(0, "worried", 9);
const cx = 740, cy = 270, k = 2.3;
[[-90, 14, 66], [0, -24, 90], [92, 8, 68], [40, 38, 66], [-40, 38, 64]].forEach(([dx, dy, r]) => S.draw(circ(cx + dx * k, cy + dy * k, r * k), 0, 0.1, { w: 8, c: "#111111", fill: "#6f757b" }));
[[-90, 14, 62], [0, -24, 86], [92, 8, 64], [40, 38, 62], [-40, 38, 60]].forEach(([dx, dy, r]) => S.fill(circ(cx + dx * k, cy + dy * k, r * k), 0, 0.1, "#6f757b", 1));
S.fill(circ(cx - 24 * k, cy - 46 * k, 48 * k), 0, 0.1, "#9aa0a6", 1);
S.draw(rrect(cx - 110 * k, cy - 22 * k, 220 * k, 52 * k, 20), 0, 0.1, { w: 6, fill: "#111111" });
[-46, 46].forEach((dx) => { S.fill(circ(cx + dx * k, cy + 4 * k, 17 * k), 0, 0.1, "#ffffff", 1); S.fill(circ(cx + dx * k - 5 * k, cy + 8 * k, 8 * k), 0, 0.1, "#111111", 1); });
S.text("MATH", 1470, 300, { size: 230, c: "#FEFE06", halo: "#111111", haloW: 0.1 });
S.text("THIEF?", 1470, 540, { size: 230, c: "#FEFE06", halo: "#111111", haloW: 0.1 });
