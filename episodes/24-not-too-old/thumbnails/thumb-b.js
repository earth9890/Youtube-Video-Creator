// look: v3
// B (lottery): a range of peaks on navy; the tallest one is the LAST, flagged 70. Wrongness: your peak is still ahead.
const S = scene(0, 1, { cam: "none" });
S.bg("flat", { sky: "#202C36", ground: "#202C36", hy: 1000 });
const B = 960, pk = (x, h, w, c) => S.draw(smooth([[x - w, B], [x - w * 0.45, B - h * 0.5], [x, B - h], [x + w * 0.45, B - h * 0.5], [x + w, B]]) + " Z", 0, 0.1, { w: 10, fill: c });
pk(330, 330, 230, "#74C8ED"); pk(700, 390, 240, "#6ABB5C"); pk(1060, 460, 250, "#b48ad6"); pk(1470, 640, 300, "#F4BC22");
S.draw(line([1470, B - 640], [1470, B - 790], 0), 0, 0.1, { w: 10, c: "#ffffff" });
S.draw(`M1470 ${B - 790} L1580 ${B - 755} L1470 ${B - 720} Z`, 0, 0.1, { w: 8, c: "#ffffff", fill: "#e5383b" });
S.text("PEAK AT 70?", 700, 230, { size: 200, c: "#ffffff" });
