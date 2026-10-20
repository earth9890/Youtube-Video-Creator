// look: still
// C (clickbait scene mode, 2026-10-20): Dave's room at night lit by one sparkling candle; his blank canvas waits on the easel
// behind it (cobweb: three years untouched); huge Dave stares at the candle, shocked.
// Text "MAGIC CANDLE?": the video's trick (Tice 2001: students told a candle had frozen their mood stopped dodging work). Honest:
// the video says "it was just a candle"; the sparkles are the claim the students were told.
const S = scene(0, 1, { cam: "none" });
S.bg("flat", { sky: "#a97b58", ground: "#6b4a3a", hy: 900 });
// candle glow (the light source)
S.fill(circ(1100, 470, 560, 430), 0, 0, "#ffd08a", 0.32);
S.fill(circ(1100, 440, 230), 0, 0, "#ffe9a8", 0.45);
// easel + blank canvas (with a cobweb in the corner)
S.draw(line([1560, 905], [1640, 330], 0) + line([1800, 905], [1720, 330], 0) + line([1680, 300], [1680, 905], 0), 0, 0, { w: 9, c: "#7f5f45" });
S.draw(rect(1470, 340, 420, 400), 0, 0, { w: 8, fill: "#fbf7ef" });
S.draw(rect(1450, 740, 460, 22), 0, 0, { w: 6, fill: "#b08968" });
S.draw(line([1490, 732], [1660, 700], 0), 0, 0, { w: 9, c: "#b08968" });
S.draw(`M1640 700 L1690 690 L1700 702 L1650 712 Z`, 0, 0, { w: 5, fill: "#2f6fd6" });
const web = [1890, 340];
[[1890, 440], [1830, 420], [1790, 340]].forEach((p) => S.draw(line(web, p, 0), 0, 0, { w: 3, c: "#9aa0a6" }));
[30, 60, 90].forEach((r) => S.draw(smooth([[1890, 340 + r], [1890 - r * 0.6, 340 + r * 0.8], [1890 - r, 340]]), 0, 0, { w: 3, c: "#9aa0a6" }));
// side table + candle + flame
S.draw(rect(950, 760, 300, 26), 0, 0, { w: 8, fill: "#b08968" });
S.draw(line([1100, 786], [1100, 900], 0) + line([1030, 905], [1170, 905], 0), 0, 0, { w: 9 });
S.draw(rrect(1030, 540, 140, 220, 12), 0, 0, { w: 8, fill: "#fbf0dc" });
S.draw(smooth([[1048, 542], [1056, 590], [1064, 566]]), 0, 0, { w: 5, c: "#e0c79f" });
S.draw(line([1100, 540], [1100, 516], 0), 0, 0, { w: 6 });
S.flame(1100, 525, 1.45, 0, 0);
// sparkles: the "mood-freezing" magic
const spark = (x, y, k, c) => S.draw(poly([[x, y - 50 * k], [x + 12 * k, y - 12 * k], [x + 50 * k, y], [x + 12 * k, y + 12 * k], [x, y + 50 * k], [x - 12 * k, y + 12 * k], [x - 50 * k, y], [x - 12 * k, y - 12 * k], [x, y - 50 * k]], 0), 0, 0, { w: 5, fill: c });
spark(900, 450, 1.1, "#ffcf33"); spark(1290, 380, 1.3, "#d6f0fc"); spark(1260, 640, 0.8, "#ffcf33"); spark(930, 660, 0.7, "#d6f0fc"); spark(1330, 520, 0.6, "#ffe38a");
// big shocked Dave
const F = S.fig(400, 1900, { s: 4.2, hair: "side", hairC: "#5a3825", outfit: "tee", outfitC: "#2f6fd6", pose: "armsUp" }).instant(0);
F.face(0, "wow", 14);
S.text("MAGIC CANDLE?", 960, 230, { size: 190, c: "#FEFE06", halo: "#111111", haloW: 0.09 });
