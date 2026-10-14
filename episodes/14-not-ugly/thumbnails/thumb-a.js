// look: v3
// A (floor-raiser): big-head Dave, calm normal face; the phone in his hand shows him with a giant nose. Wrongness: the phone lies.
const S = scene(0, 1, { cam: "none" });
S.bg("flat", { sky: "#74C8ED", ground: "#6ABB5C", hy: 930 });
const F = S.fig(520, 1890, { s: 4.3, hair: "side", hairC: "#5a3825", outfit: "tee", outfitC: "#2f6fd6" }).instant(0);
F.face(0, "worried", 9);
// phone, big, right half, screen = distorted selfie
const x = 1400, y = 630, w = 470, h = 760;
S.draw(rrect(x - w / 2, y - h / 2, w, h, 60), 0, 0.1, { w: 12, fill: "#2b2d42" });
S.draw(rect(x - w / 2 + 34, y - h / 2 + 70, w - 68, h - 140), 0, 0.1, { w: 6, fill: "#eaf6ff" });
const fx = x, fy = y + 20, r = 175;
S.draw(circ(fx, fy, r * 1.08, r), 0, 0.1, { w: 9, fill: "#ffffff" });
S.draw(smooth(arcPts(fx - 15, fy - 30, r * 1.05, 195, 335, 10)), 0, 0.1, { w: 52, c: "#5a3825" });
[-1, 1].forEach((k) => S.fill(circ(fx + k * 105, fy - 20, 16), 0, 0.1, INK, 1));
S.draw(circ(fx, fy + 50, 95, 62), 0, 0.1, { w: 9, fill: "#ffc9a8" });
S.draw(line([fx - 55, fy + 140], [fx + 55, fy + 140], 0), 0, 0.1, { w: 8 });
S.text("PHONE LIES", 960, 190, { size: 200, c: "#FEFE06", halo: "#111111", haloW: 0.1 });
