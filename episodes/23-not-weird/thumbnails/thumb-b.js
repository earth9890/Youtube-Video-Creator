// look: v3
// B (lottery): a spotlight on an empty dashed outline: the "average man" nobody fits. Near-black, white text, no outline.
const S = scene(0, 1, { cam: "none" });
S.bg("flat", { sky: "#0b0d1a", ground: "#121828", hy: 960 });
S.fill("M880 -20 L1040 -20 L1340 930 L580 930 Z", 0, 0.1, "#fff6d6", 0.16);
S.fill(circ(960, 930, 380, 70), 0, 0.1, "#fff6d6", 0.35);
const ghost = (x, gy, k, c) => {
  const hip = [x, gy - 130 * k], sh = [x, hip[1] - 125 * k], hd = [x, sh[1] - 54 * k], r = 50 * k, ar = [x, sh[1] + 16 * k];
  const P = (pts) => poly(pts.map(([dx, dy]) => [ar[0] + dx * k, ar[1] + dy * k]), 0);
  [circ(hd[0], hd[1], r), line([x, hd[1] + r], hip, 0), poly([hip, [x - 35 * k, gy]], 0), poly([hip, [x + 35 * k, gy]], 0), P([[0, 0], [-46, 45], [-12, 96]]), P([[0, 0], [46, 45], [12, 96]])]
    .forEach((d) => { const p = S.draw(d, 0, 0.1, { w: 10, c }); p.removeAttribute("pathLength"); p.setAttribute("stroke-dasharray", "34 24"); });
};
ghost(960, 930, 2.0, "#ffffff");
S.text("FITS NOBODY", 960, 200, { size: 190, c: "#ffffff" });
