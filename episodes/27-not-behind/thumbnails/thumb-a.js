// look: v3
// A (floor-raiser): big-head Dave, uneasy, beside his fridge list "By 30:" with three EMPTY boxes. Wrongness: a deadline nobody asked him about, zero ticks.
const S = scene(0, 1, { cam: "none" });
S.bg("flat", { sky: "#74C8ED", ground: "#6ABB5C", hy: 940 });
const F = S.fig(470, 1890, { s: 4.3, hair: "side", hairC: "#5a3825", outfit: "tee", outfitC: "#2f6fd6" }).instant(0);
F.face(0, "worried", 9);
const g = S.grp();
S.draw(rect(1010, 330, 640, 620), 0, 0.1, { w: 10, fill: "#ffffff", parent: g });
S.draw(circ(1330, 340, 34), 0, 0.1, { w: 8, fill: "#e5383b", parent: g });
S.text("By 30:", 1070, 500, { size: 150, font: "caveat", anchor: "start", c: "#1f4fa3", parent: g });
[620, 740, 860].forEach((y) => { S.draw(rrect(1080, y - 70, 76, 76, 12), 0, 0.1, { w: 9, fill: "#ffffff", parent: g }); S.draw(line([1200, y - 26], [1560, y - 30], 0), 0, 0.1, { w: 9, c: "#1f4fa3", parent: g }); });
g.setAttribute("transform", "rotate(3 1330 640)");
S.text("WHO SAID 30?", 960, 210, { size: 200, c: "#FEFE06", halo: "#111111", haloW: 0.1 });
