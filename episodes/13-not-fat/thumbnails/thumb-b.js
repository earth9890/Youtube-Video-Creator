// look: v3
const YF = "#ffd166";
function fatBlob(S, x, y, s) {
  S.draw(smooth([[x - 80 * s, y], [x - 70 * s, y - 55 * s], [x - 15 * s, y - 75 * s], [x + 45 * s, y - 65 * s], [x + 85 * s, y - 20 * s], [x + 70 * s, y + 35 * s], [x + 10 * s, y + 50 * s], [x - 55 * s, y + 40 * s], [x - 80 * s, y]]), 0, 0.1, { w: 7, fill: YF });
  [-1, 1].forEach((k) => S.fill(circ(x + k * 25 * s, y - 15 * s, 8 * s), 0, 0.1, INK, 1));
  S.draw(smooth(arcPts(x, y + 5 * s, 18 * s, 20, 160, 8)), 0, 0.1, { w: 5 });
}
// B (lottery / literal): a MISSING poster for 10 kg of fat. The joke is the picture.
const S = scene(0, 1, { cam: "none" });
S.bg("flat", { sky: "#FCA55D", ground: "#E89F5B", hy: 900 });
S.draw(rect(560, 70, 800, 900), 0, 0.1, { w: 10, fill: "#fbf6e9" });
[[600, 110], [1320, 110]].forEach(([x, y]) => S.fill(circ(x, y, 16), 0, 0.1, RED, 1));
S.text("MISSING", 960, 280, { size: 165, c: RED });
fatBlob(S, 960, 600, 3.0);
S.text("10 KG", 960, 900, { size: 130 });
