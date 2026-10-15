// look: v3
// B (lottery ticket, scale crop): a giant plastic action figure bleeds off the frame; a tiny white stick man at its feet, a white arrow and "YOU". Wrongness: you are measuring yourself against that.
const S = scene(0, 1, { cam: "none" });
S.bg("flat", { sky: "#1F2A44", ground: "#151d30", hy: 1000 });
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
toy(1220, 1440, 4.0, 64, 150, 12);
const F = S.fig(420, 1000, { s: 0.75, c: "#ffffff" }).instant(0);
F.face(0, "worried", 6);
S.draw(`M395 560 L445 560 L445 630 L490 630 L420 705 L350 630 L395 630 Z`, 0, 0.1, { w: 6, c: "#111111", fill: "#ffffff" });
S.text("YOU", 420, 520, { size: 190, c: "#ffffff" });
