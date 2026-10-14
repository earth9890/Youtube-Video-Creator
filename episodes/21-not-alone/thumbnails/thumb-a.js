// look: v3
// A (floor-raiser): big-head Dave at night, uneasy, holding a phone that shows a party. Wrongness: everyone is out but him.
const S = scene(0, 1, { cam: "none" });
S.bg("flat", { sky: "#202C36", ground: "#2c3a6b", hy: 960 });
const F = S.fig(470, 1890, { s: 4.3, hair: "side", hairC: "#5a3825", outfit: "tee", outfitC: "#2f6fd6" }).instant(0);
F.face(0, "worried", 9);
S.fill(circ(1360, 640, 520, 460), 0, 0.1, "#74C8ED", 0.18);
S.draw(rrect(1080, 300, 560, 740, 44), 0, 0.1, { w: 12, fill: "#111111" });
S.draw(rrect(1112, 350, 496, 640, 18), 0, 0.1, { w: 4, fill: "#3b2a6b" });
[[1120, 380], [1180, 440], [1260, 395], [1330, 460], [1410, 385], [1480, 450], [1560, 400], [1220, 520], [1440, 530], [1540, 520]].forEach(([x, y], i) => S.fill(rect(x, y, 18, 28), 0, 0.1, i % 2 ? "#F4BC22" : "#F93684", 1));
[[1210, "#F93684"], [1360, "#3f9e4a"], [1510, "#ff8c1a"]].forEach(([x, c], i) => {
  const P = S.fig(x, 950, { s: 0.95, pose: i === 1 ? "armsUp" : "wave", hair: "short", hairC: "#5a3825", outfit: "tee", outfitC: c }).instant(0);
  P.face(0, "happy", 0);
  const [hx, hy] = P.top();
  S.draw(poly([[hx - 26, hy + 8], [hx, hy - 62], [hx + 26, hy + 8], [hx - 26, hy + 8]], 0), 0, 0.1, { w: 5, fill: "#F4BC22" });
});
S.text("EVERYONE'S OUT?", 960, 210, { size: 180, c: "#FEFE06", halo: "#111111", haloW: 0.1 });
