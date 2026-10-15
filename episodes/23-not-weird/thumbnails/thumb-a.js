// look: v3
// A (floor-raiser): big-head Dave, uneasy, side-eyeing the "normal person" he wants to copy, who is only a dashed outline. Wrongness: normal is empty.
const S = scene(0, 1, { cam: "none" });
S.bg("flat", { sky: "#74C8ED", ground: "#6ABB5C", hy: 940 });
const ghost = (x, gy, k, c) => {
  const hip = [x, gy - 130 * k], sh = [x, hip[1] - 125 * k], hd = [x, sh[1] - 54 * k], r = 50 * k, ar = [x, sh[1] + 16 * k];
  const P = (pts) => poly(pts.map(([dx, dy]) => [ar[0] + dx * k, ar[1] + dy * k]), 0);
  S.fill(circ(hd[0], hd[1], r), 0, 0.1, "#ffffff", 0.55);
  [circ(hd[0], hd[1], r), line([x, hd[1] + r], hip, 0), poly([hip, [x - 35 * k, gy]], 0), poly([hip, [x + 35 * k, gy]], 0), P([[0, 0], [-46, 45], [-12, 96]]), P([[0, 0], [46, 45], [12, 96]])]
    .forEach((d) => { const p = S.draw(d, 0, 0.1, { w: 13, c }); p.removeAttribute("pathLength"); p.setAttribute("stroke-dasharray", "34 24"); });
};
ghost(1360, 1080, 2.4, "#1d1b1f");
const F = S.fig(470, 1890, { s: 4.3, hair: "side", hairC: "#5a3825", outfit: "tee", outfitC: "#2f6fd6" }).instant(0);
F.face(0, "worried", 9);
S.text("NORMAL?", 1290, 210, { size: 210, c: "#FEFE06", halo: "#111111", haloW: 0.1 });
