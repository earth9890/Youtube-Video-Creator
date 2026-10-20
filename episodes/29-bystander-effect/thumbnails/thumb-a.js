// look: v3
// A (floor-raiser): big-head Dave, side-eye with a sweat drop, holding up his tally counter at 38; on the right one tight wall of identical faces staring straight out, nobody moving.
// Wrongness: a whole crowd watching and nobody moving, with the scared man counting them.
const S = scene(0, 1, { cam: "none" });
S.bg("flat", { sky: "#202C36", ground: "#18222b", hy: 940 });
// the crowd, back row first: identical blank faces, all looking at the viewer
[[0.95, 380, 8, 1110, 1880], [1.15, 530, 7, 1080, 1890], [1.4, 700, 6, 1060, 1900]].forEach(([s, hy, n, x0, x1]) => {
  for (let i = 0; i < n; i++) { const F = S.fig(x0 + (i * (x1 - x0)) / (n - 1), hy + 309 * s, { s, hair: "none", outfit: "tee", outfitC: "#5d6873", breathe: false }).instant(0); F.face(0, "flat", 0); }
});
// Dave: big head cropped by the bottom edge, worried side-eye toward the crowd, counter held up
const D = S.fig(420, 1890, { s: 4.3, hair: "side", hairC: "#5a3825", outfit: "tee", outfitC: "#2f6fd6", armR: [[40, 20], [64, -14]], breathe: false }).instant(0);
D.face(0, "worried", 9);
S.drop(640, 400, 3.2, 0, 0.1);
const cx = 880, cy = 700, k = 2.5;
S.draw(circ(cx - 60 * k, cy + 36 * k, 22 * k), 0, 0.1, { c: "#6f757b", w: 9 });
S.draw(rrect(cx - 12 * k, cy - 70 * k, 24 * k, 30 * k, 8), 0, 0.1, { w: 7, fill: "#6f757b" });
S.draw(rrect(cx - 58 * k, cy - 48 * k, 116 * k, 96 * k, 40), 0, 0.1, { w: 9, fill: "#c4c8cc" });
S.draw(rrect(cx - 42 * k, cy - 26 * k, 84 * k, 52 * k, 8), 0, 0.1, { w: 6, fill: "#ffffff" });
S.text("38", cx, cy + 50, { size: 150, c: "#e5383b" });
S.text("NOBODY?", 1300, 220, { size: 210, c: "#FEFE06", halo: "#111111", haloW: 0.09 });
