// look: v3
// A (floor-raiser): big-head Dave, uneasy, side-eyeing a giant biscuit tin wearing a champion's belt. Wrongness: a biscuit tin is the champ.
const S = scene(0, 1, { cam: "none" });
S.bg("flat", { sky: "#1F2A55", ground: "#c8976a", hy: 900 });
// the champ: blue tin, gold lid, black belt with a gold plate
S.draw(rrect(1010, 440, 700, 520, 30), 0, 0.1, { w: 12, fill: "#2f6fd6" });
S.draw(rrect(975, 360, 770, 110, 30), 0, 0.1, { w: 12, fill: "#f2b84b" });
S.draw(rect(1010, 620, 700, 150), 0, 0.1, { w: 10, fill: "#1d1b1f" });
S.draw(circ(1360, 695, 150, 120), 0, 0.1, { w: 12, fill: "#F4BC22" });
S.draw(circ(1360, 695, 92), 0, 0.1, { w: 8, fill: "#d9a86c" });
[[-40, -30], [35, -38], [5, 10], [-30, 42], [42, 36]].forEach(([dx, dy]) => S.draw(circ(1360 + dx, 695 + dy, 13), 0, 0.1, { w: 4, fill: "#5a3825" }));
const F = S.fig(470, 1890, { s: 4.3, hair: "side", hairC: "#5a3825", outfit: "tee", outfitC: "#e5383b" }).instant(0);
F.face(0, "worried", 9);
S.text("UNDEFEATED", 960, 215, { size: 200, c: "#FEFE06", halo: "#111111", haloW: 0.1 });
