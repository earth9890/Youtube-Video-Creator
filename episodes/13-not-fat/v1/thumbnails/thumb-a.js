// look: v3
const YF = "#ffd166";
function fatBlob(S, x, y, s) {
  S.draw(smooth([[x - 80 * s, y], [x - 70 * s, y - 55 * s], [x - 15 * s, y - 75 * s], [x + 45 * s, y - 65 * s], [x + 85 * s, y - 20 * s], [x + 70 * s, y + 35 * s], [x + 10 * s, y + 50 * s], [x - 55 * s, y + 40 * s], [x - 80 * s, y]]), 0, 0.1, { w: 7, fill: YF });
  [-1, 1].forEach((k) => S.fill(circ(x + k * 25 * s, y - 15 * s, 8 * s), 0, 0.1, INK, 1));
  S.draw(smooth(arcPts(x, y + 5 * s, 18 * s, 20, 160, 8)), 0, 0.1, { w: 5 });
}
// A (floor-raiser): big-head Dave exhaling his own fat as a puff. Wrongness: fat leaving through the mouth.
const S = scene(0, 1, { cam: "none" });
S.bg("day", { hy: 900 });
const F = S.fig(470, 1890, { s: 4.3, hair: "short", outfit: "tee", outfitC: "#2f6fd6" }).instant(0);
F.face(0, "wow", 8);
const mx = 470 + 215 * 0.5, my = 1890 - 309 * 4.3 + 215 * 0.5;
[[-40, -30], [0, 0], [40, 30]].forEach(([dy, bend]) => S.draw(smooth([[mx + 70, my + dy * 0.6], [mx + 330, my + dy * 1.6 - bend], [mx + 600, my + dy * 2.4 - 60]]), 0, 0.1, { w: 12, c: "#8a94a8" }));
fatBlob(S, 1430, 560, 2.0);
S.text("BREATHED OUT?", 960, 190, { size: 200, c: "#FEFE06", halo: "#111111", haloW: 0.1 });
