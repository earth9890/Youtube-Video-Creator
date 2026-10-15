// look: v3
// A (floor-raiser): big-head Dave in a hoodie at the beach, side-eyeing a plastic action figure with absurd arms. Wrongness: the toy is his yardstick.
const S = scene(0, 1, { cam: "none" });
S.bg("flat", { sky: "#74C8ED", ground: "#ECD49E", hy: 880 });
function toy(cx, gy, k, arm, chest, W) {
  const sh = gy - 250 * k, wa = gy - 130 * k, o = { w: W }, skin = "#f2c09a";
  [-30, 6].forEach((dx) => S.draw(rrect(cx + dx * k, wa - 4 * k, 24 * k, 130 * k, 6), 0, 0.1, Object.assign({ fill: "#3f7a3a" }, o)));
  [-1, 1].forEach((d) => { const ax = cx + d * (chest / 2 + arm * 0.2) * k;
    S.draw(rrect(ax - arm * 0.3 * k, sh + 90 * k, arm * 0.6 * k, 100 * k, 12 * k), 0, 0.1, Object.assign({ fill: skin }, o));
    S.draw(circ(ax, sh + 196 * k, arm * 0.36 * k + 6 * k), 0, 0.1, Object.assign({ fill: skin }, o));
    S.draw(circ(ax, sh + 55 * k, arm / 2 * k, 62 * k), 0, 0.1, Object.assign({ fill: skin }, o)); });
  S.draw(`M${cx - chest / 2 * k} ${sh} L${cx + chest / 2 * k} ${sh} L${cx + 30 * k} ${wa} L${cx - 30 * k} ${wa} Z`, 0, 0.1, Object.assign({ fill: "#4f9a48" }, o));
  S.draw(circ(cx, sh - 34 * k, 30 * k), 0, 0.1, Object.assign({ fill: skin }, o));
  S.draw(`M${cx - 30 * k} ${sh - 40 * k} Q${cx} ${sh - 84 * k} ${cx + 30 * k} ${sh - 40 * k} Z`, 0, 0.1, Object.assign({ fill: "#2c5a28" }, o));
  S.draw(circ(cx - 10 * k, sh - 32 * k, 3 * k) + circ(cx + 10 * k, sh - 32 * k, 3 * k), 0, 0.1, { w: 4, fill: "#111111" });
  S.draw(line([cx - 9 * k, sh - 18 * k], [cx + 9 * k, sh - 18 * k], 0), 0, 0.1, { w: 5 });
}
const F = S.fig(470, 1890, { s: 4.3, hair: "side", hairC: "#5a3825", outfit: "hoodie", outfitC: "#3a4a6e" }).instant(0);
F.face(0, "worried", 9);
S.fill(circ(1360, 1062, 260, 34), 0, 0.1, "#000000", 0.22);
toy(1360, 1060, 2.2, 64, 150, 9);
S.text("TOO SKINNY?", 960, 210, { size: 200, c: "#FEFE06", halo: "#111111", haloW: 0.1 });
