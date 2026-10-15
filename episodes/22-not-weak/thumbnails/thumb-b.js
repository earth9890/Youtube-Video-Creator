// look: v3
// B (lottery ticket): one symbol on black, no words. A biscuit tin in a spotlight, wearing boxing gloves.
const S = scene(0, 1, { cam: "none" });
S.bg("flat", { sky: "#05031A", ground: "#05031A", hy: 1080 });
S.draw("M860 0 L1060 0 L1420 1080 L500 1080 Z", 0, 0.1, { w: 0, fill: "#fff6d6", fo: 0.12 });
S.draw(circ(960, 930, 380, 70), 0, 0.1, { w: 0, fill: "#fff6d6", fo: 0.22 });
S.draw(rrect(720, 470, 480, 430, 26), 0, 0.1, { w: 12, fill: "#2f6fd6" });
S.draw(rrect(690, 400, 540, 96, 26), 0, 0.1, { w: 12, fill: "#f2b84b" });
S.draw(circ(960, 690, 160), 0, 0.1, { w: 10, fill: "#fbf7ef" });
S.draw(circ(960, 690, 125), 0, 0.1, { w: 9, fill: "#d9a86c" });
[[-50, -38], [44, -46], [6, 12], [-38, 54], [54, 44]].forEach(([dx, dy]) => S.draw(circ(960 + dx, 690 + dy, 17), 0, 0.1, { w: 5, fill: "#5a3825" }));
// arms from the tin to the gloves
[[720, 640, 640, 600], [1200, 640, 1280, 600]].forEach(([a, b, c, d]) => S.draw(line([a, b], [c, d], 0), 0, 0.1, { w: 14, c: "#ffffff" }));
// gloves: red mitts with a white cuff, raised either side
[[560, 560, -1], [1360, 560, 1]].forEach(([x, y, d]) => {
  S.draw(rrect(x - 110, y - 130, 220, 250, 100), 0, 0.1, { w: 12, fill: "#D93A45" });
  S.draw(rrect(x - 90 - d * 20, y + 100, 180, 80, 14), 0, 0.1, { w: 10, fill: "#ffffff" });
  S.draw(smooth([[x - 40 * d, y - 60], [x - 70 * d, y + 10], [x - 40 * d, y + 60]]), 0, 0.1, { w: 8 });
});
