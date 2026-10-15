// look: v3
// B (lottery): a restaurant bill whose answer is missing; a masked storm cloud runs off with the "30". No title words.
const S = scene(0, 1, { cam: "none" });
S.bg("flat", { sky: "#1F2A55", ground: "#2c3a6b", hy: 980 });
const x = 330, y = 130, w = 640, h = 800;
const zz = Array.from({ length: 11 }, (_, i) => [x + w - (i * w) / 10, y + h + (i % 2 ? 28 : 0)]);
S.draw(poly([[x, y], [x + w, y], ...zz, [x, y + h]], 0), 0, 0.1, { w: 10, fill: "#fbf7ef" });
S.text("TOTAL $90", x + w / 2, y + 190, { size: 110 });
S.text("3 =", x + w / 2 + 70, y + 430, { size: 190 });
const dx0 = x + w / 2 - 150, dy0 = y + 365;
S.draw(line([dx0 - 55, dy0], [dx0 + 55, dy0], 0), 0, 0.1, { w: 18 });
[-42, 42].forEach((o) => S.fill(circ(dx0, dy0 + o, 14), 0, 0.1, "#111111", 1));
S.draw(rrect(x + 170, y + 520, 300, 190, 20), 0, 0.1, { w: 8, c: "#e5383b", fill: "#fbf7ef" });
const cx = 1440, cy = 420, k = 2.0;
[[-90, 14, 66], [0, -24, 90], [92, 8, 68], [40, 38, 66], [-40, 38, 64]].forEach(([dx, dy, r]) => S.fill(circ(cx + dx * k, cy + dy * k, r * k), 0, 0.1, "#9aa0a6", 1));
S.fill(circ(cx - 24 * k, cy - 46 * k, 48 * k), 0, 0.1, "#c4c8cc", 1);
S.draw(rrect(cx - 110 * k, cy - 22 * k, 220 * k, 52 * k, 20), 0, 0.1, { w: 6, fill: "#111111" });
[-46, 46].forEach((dx) => { S.fill(circ(cx + dx * k, cy + 4 * k, 17 * k), 0, 0.1, "#ffffff", 1); S.fill(circ(cx + dx * k - 6 * k, cy + 6 * k, 8 * k), 0, 0.1, "#111111", 1); });
[[1010, 560, 1180, 600], [1010, 640, 1200, 680], [1010, 720, 1180, 760]].forEach(([x1, y1, x2, y2]) => S.draw(line([x1, y1], [x2, y2], 0), 0, 0.1, { w: 12, c: "#FEFE06" }));
S.text("30", 1400, 800, { size: 260, c: "#FEFE06", halo: "#111111", haloW: 0.1 });
