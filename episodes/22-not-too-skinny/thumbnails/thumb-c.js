// look: still
// C (clickbait scene mode, 2026-10-20): golden-hour beach; huge shocked Dave in his August hoodie; behind him a giant plastic
// action figure flexing over the sand, the old 1960s figure (normal arms) at its feet; a beachgoer busy checking his own arm.
// Text "TOYS GREW?": the video's payoff ("Dave didn't shrink. The toys grew.", Pope 1999). Honest to the content.
const S = scene(0, 1, { cam: "none" });
S.bg("flat", { sky: "#f4a76a", ground: "#e2b874", hy: 760 });
// low sun + glow, sea band
S.fill(circ(1500, 600, 620, 420), 0, 0, "#ffe2a8", 0.45);
S.fill(circ(1500, 620, 120), 0, 0, "#fff3c4", 1);
S.draw(rect(-20, 640, 1960, 120), 0, 0, { w: 6, fill: "#3f8fb8" });
[[200, 690], [700, 710], [1200, 690], [1700, 712]].forEach(([x, y]) => S.draw(smooth([[x - 60, y], [x, y - 12], [x + 60, y]]), 0, 0, { w: 5, c: "#d6f0fc" }));
// action figure: helmet, green vest, plastic peg joints. flex = double-biceps pose. k = scale, arm = bicep size
const SKIN = "#f2c09a";
function toy(cx, gy, k, arm, chest, flex) {
  const sh = gy - 250 * k, wa = gy - 130 * k, o = { w: 8 };
  S.fill(circ(cx, gy + 4, 120 * k, 14 * k), 0, 0, "#000000", 0.2);
  [-30, 6].forEach((dx) => S.draw(rrect(cx + dx * k, wa - 4 * k, 24 * k, 134 * k, 6 * k), 0, 0, Object.assign({ fill: "#3f7a3a" }, o)));
  S.draw(`M${cx - chest / 2 * k} ${sh} L${cx + chest / 2 * k} ${sh} L${cx + 30 * k} ${wa} L${cx - 30 * k} ${wa} Z`, 0, 0, Object.assign({ fill: "#4f9a48" }, o));
  [-1, 1].forEach((d) => {
    const x0 = cx + d * chest / 2 * k;
    if (flex) { // upper arm out sideways with a huge bicep, forearm up, fist by the head
      const ex = x0 + d * arm * 1.5 * k, ey = sh + 24 * k;
      S.draw(rrect(ex - 18 * k, ey - 110 * k, 36 * k, 120 * k, 12 * k), 0, 0, Object.assign({ fill: SKIN }, o));
      S.draw(circ(ex, ey - 120 * k, 24 * k), 0, 0, Object.assign({ fill: SKIN }, o));
      S.draw(circ((x0 + ex) / 2, ey - 10 * k, arm * 0.85 * k, arm * 0.62 * k), 0, 0, Object.assign({ fill: SKIN }, o));
    } else {
      const ax = x0 + d * 10 * k;
      S.draw(rrect(ax - 10 * k, sh + 4 * k, 20 * k, 150 * k, 8 * k), 0, 0, Object.assign({ fill: SKIN }, o));
    }
  });
  S.draw(circ(cx, sh - 34 * k, 30 * k), 0, 0, Object.assign({ fill: SKIN }, o));
  S.draw(`M${cx - 31 * k} ${sh - 40 * k} Q${cx} ${sh - 86 * k} ${cx + 31 * k} ${sh - 40 * k} Z`, 0, 0, Object.assign({ fill: "#2c5a28" }, o));
  S.draw(circ(cx - 10 * k, sh - 32 * k, 3.4 * k) + circ(cx + 10 * k, sh - 32 * k, 3.4 * k), 0, 0, { w: 4, fill: "#111111" });
  S.draw(line([cx - 9 * k, sh - 18 * k], [cx + 9 * k, sh - 18 * k], 0), 0, 0, { w: 6 });
}
toy(1400, 1000, 1.95, 62, 150, true);
toy(1800, 1000, 1.1, 0, 60, false);
// beachgoer worrying about his own arm (the beach is busy with its own arms)
const B = S.fig(1020, 940, { s: 0.95, hair: "short", hairC: "#2b1d14", outfit: "tee", outfitC: "#e5383b", armL: [[-40, 20], [-20, -40]], armR: [[38, 46], [-6, 22]] }).instant(0);
B.face(0, "worried", -8);
// big shocked Dave in the hoodie, eyes on the toy
const F = S.fig(400, 1900, { s: 4.2, hair: "side", hairC: "#5a3825", outfit: "hoodie", outfitC: "#3a4a6e", pose: "armsUp" }).instant(0);
F.face(0, "wow", 12);
S.text("TOYS GREW?", 960, 230, { size: 210, c: "#FEFE06", halo: "#111111", haloW: 0.09 });
