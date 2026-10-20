// look: v3
// B (lottery): one symbol, no words: a cartoon bomb with "30" on it, fuse lit, on a flat orange field. Wrongness: turning thirty as a bomb about to go off.
const S = scene(0, 1, { cam: "none" });
S.bg("flat", { sky: "#FCA55D", ground: "#FCA55D", hy: 1000 });
const cx = 820, cy = 640, r = 320;
S.fill(circ(cx + 30, cy + 330, 300, 40), 0, 0.1, "#000000", 0.18);
S.draw(smooth([[cx + 170, cy - 300], [cx + 250, cy - 420], [cx + 400, cy - 400], [cx + 480, cy - 450]]), 0, 0.1, { w: 18, c: "#5a3825" });
S.draw(rrect(cx + 80, cy - 350, 160, 120, 18), 0, 0.1, { w: 10, fill: "#6f757b" });
S.draw(circ(cx, cy, r), 0, 0.1, { w: 12, c: "#000000", fill: "#1d1b1f" });
S.fill(circ(cx - 130, cy - 140, 80, 50), 0, 0.1, "#ffffff", 0.25);
S.text("30", cx, cy + 105, { size: 300, c: "#ffffff" });
S.burst(cx + 480, cy - 450, 50, 170, 12, 0, 0.1, { c: "#FEFE06", w: 16 });
S.fill(circ(cx + 480, cy - 450, 50), 0, 0.1, "#e5383b", 1);
S.fill(circ(cx + 480, cy - 450, 24), 0, 0.1, "#fff4d6", 1);
