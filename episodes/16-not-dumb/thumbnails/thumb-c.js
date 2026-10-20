// look: still
// C (clickbait scene mode, 2026-10-20): a London street at sunset; a cabbie beside his black cab, his brain
// bulging out of his head with growth lines; huge Dave, hand on his own head, is shocked.
// Text "BRAINS GROW?": the video's proof (Maguire 2011: trainee cabbies who qualified grew grey matter; "London built them").
const S = scene(0, 1, { cam: "none" });
S.bg("flat", { sky: "#f2a36b", ground: "#8a8f96", hy: 870 });
// low sun setting behind the terrace (the light source)
S.fill(circ(1250, 500, 520, 360), 0, 0, "#ffe2a8", 0.4);
S.fill(circ(1250, 500, 120), 0, 0, "#fff3c4", 1);
// far terrace + a clock tower, pavement edge
S.draw(`M640 870 L640 560 L760 500 L880 560 L880 470 L1000 420 L1120 470 L1120 560 L1240 520 L1360 560 L1360 870 Z`, 0, 0, { w: 5, fill: "#c97e5f", c: "#6b4a3a" });
[[690, 620], [800, 620], [930, 540], [1040, 540], [930, 660], [1040, 660], [1180, 620], [1290, 620]].forEach(([x, y]) => S.draw(rect(x, y, 50, 70), 0, 0, { w: 4, fill: "#ffe38a", c: "#6b4a3a" }));
S.draw(`M1500 870 L1500 330 L1540 270 L1580 330 L1580 870 Z`, 0, 0, { w: 5, fill: "#b9745a", c: "#6b4a3a" });
S.draw(circ(1540, 380, 26), 0, 0, { w: 4, fill: "#fbf0dc", c: "#6b4a3a" });
S.draw(rect(-20, 870, 1960, 18), 0, 0, { w: 6, fill: "#c4c8cc" });
// black cab: rounded cabin, bonnet at the front (right), TAXI sign
S.draw(`M1210 860 L1210 700 Q1220 640 1300 630 L1350 560 Q1360 545 1400 545 L1620 545 Q1660 545 1670 580 L1700 640 Q1820 650 1840 700 L1850 860 Z`, 0, 0, { w: 8, fill: "#2e2e34" });
S.draw(`M1365 575 L1480 575 L1480 635 L1325 635 Z`, 0, 0, { w: 5, fill: "#a9dcf5" });
S.draw(`M1510 575 L1640 575 L1665 635 L1510 635 Z`, 0, 0, { w: 5, fill: "#a9dcf5" });
S.draw(rrect(1460, 505, 110, 40, 8), 0, 0, { w: 5, fill: "#ffcf33" });
S.text("TAXI", 1515, 538, { size: 34, c: "#1d1b1f" });
[1330, 1720].forEach((x) => { S.draw(circ(x, 860, 56), 0, 0, { w: 8, fill: "#1d1b1f" }); S.draw(circ(x, 860, 24), 0, 0, { w: 5, fill: "#c4c8cc" }); });
S.draw(circ(1830, 720, 18), 0, 0, { w: 5, fill: "#fff3c4" });
// cabbie with a cap and a bulging brain + growth lines
const C = S.fig(1060, 880, { s: 1.15, hair: "short", hairC: "#3b2a20", outfit: "tee", outfitC: "#6f757b", pose: "hips" }).instant(0);
C.face(0, "happy", 6);
const [bx, by] = [C.hd[0], C.hd[1] - C.r * 0.5 - 84]; // brain bottom stays on the forehead, above the eyes
S.draw(rays(bx, by + 10, 150, 195, 9, Math.PI * 1.05, Math.PI * 0.9), 0, 0, { w: 7, c: "#1d1b1f" });
S.brain(bx, by, 0.8, 0, 0);
// big shocked Dave, hand to his own head
const F = S.fig(400, 1900, { s: 4.2, hair: "side", hairC: "#5a3825", outfit: "tee", outfitC: "#2f6fd6", armR: [[80, -10], [22, -82]] }).instant(0);
F.face(0, "wow", 14);
S.text("BRAINS GROW?", 960, 230, { size: 200, c: "#FEFE06", halo: "#111111", haloW: 0.09 });
