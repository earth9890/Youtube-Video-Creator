// look: v3
// A (floor-raiser): big-head Dave, uneasy side-eye with a sweat drop; on the right his monitor with a huge printed pair of eyes taped over the screen, staring straight at the viewer.
// Wrongness in 3 words: paper eyes watching. One red mark: the tape.
const S = scene(0, 1, { cam: "none" });
S.bg("flat", { sky: "#202C36", ground: "#FCA55D", hy: 930 });
// monitor (right half)
S.draw(rect(1350, 860, 70, 80), 0, 0.1, { w: 9, fill: "#6f757b" });
S.draw(rrect(1180, 920, 410, 26, 10), 0, 0.1, { w: 9, fill: "#6f757b" });
S.draw(rrect(960, 300, 840, 580, 22), 0, 0.1, { w: 12, fill: "#1d1b1f" });
S.draw(rect(996, 336, 768, 508), 0, 0.1, { w: 6, fill: "#dff3ff" });
// the taped paper with the eyes
const px = 1040, py = 380, pw = 680, ph = 420, g = S.grp();
S.fill(rect(px + 12, py + 16, pw, ph), 0, 0.1, "#000000", 0.25, g);
S.draw(rect(px, py, pw, ph), 0, 0.1, { w: 8, fill: "#ffffff", parent: g });
[-1, 1].forEach((sd) => {
  const ex = px + pw / 2 + sd * 165, ey = py + ph / 2 + 30, er = 92;
  S.draw(`M${ex - er * 1.5} ${ey} Q${ex} ${ey - er * 1.35} ${ex + er * 1.5} ${ey} Q${ex} ${ey + er * 1.35} ${ex - er * 1.5} ${ey} Z`, 0, 0.1, { w: 12, fill: "#ffffff", parent: g });
  S.draw(circ(ex, ey, er * 0.58), 0, 0.1, { w: 8, fill: "#7a5236", parent: g });
  S.fill(circ(ex, ey, er * 0.3), 0, 0.1, "#111111", 1, g);
  S.fill(circ(ex - er * 0.17, ey - er * 0.18, er * 0.11), 0, 0.1, "#ffffff", 1, g);
  S.draw(smooth([[ex - er * 1.35, ey - er * 1.0], [ex - er * 0.2, ey - er * 1.42], [ex + er * 1.35, ey - er * 1.1]]), 0, 0.1, { w: 18, c: "#111111", parent: g });
});
g.setAttribute("transform", "rotate(-2 1380 590)");
[[px + 30, py - 4, -16], [px + pw - 30, py - 4, 16]].forEach(([x, y, a]) => { const tg = S.grp(); S.draw(rect(x - 60, y - 22, 120, 44), 0, 0.1, { w: 6, fill: "#e5383b", parent: tg }); tg.setAttribute("transform", `rotate(${a} ${x} ${y})`); });
// Dave: big head cropped by the bottom edge, uneasy side-eye at the eyes
const D = S.fig(430, 1890, { s: 4.3, hair: "side", hairC: "#5a3825", outfit: "tee", outfitC: "#2f6fd6", breathe: false }).instant(0);
D.face(0, "worried", 9);
S.drop(690, 400, 3.2, 0, 0.1);
S.text("WHO'S WATCHING?", 960, 210, { size: 170, c: "#FEFE06", halo: "#111111", haloW: 0.09 });
