// look: still
// C (clickbait scene mode, 2026-10-20): on a mountain path at sunset everyone else is quitting (one sits slumped, one walks
// down waving a white flag) while a huge, sweating Dave grits his teeth and keeps climbing toward the summit flag.
// Text "GIVE UP?": the video's message ("keep showing up, when everyone else gives up").
const S = scene(0, 1, { cam: "none" });
S.bg("flat", { sky: "#e9a36f", ground: "#8a6a4a", hy: 1000 });
// low sun with a glow, behind the mountain
S.fill(circ(1180, 470, 520, 460), 0, 0, DS.glow("#fff0b0", 0.85), 1);
S.fill(circ(1180, 470, 110), 0, 0, "#fff3c4", 1);
// the mountain + summit flag
S.draw(`M640 1100 L1080 560 Q1130 510 1180 520 L1300 430 Q1340 400 1380 430 L1980 900 L1980 1100 Z`, 0, 0, { fill: DS.vol("earth"), c: "#1d1b1f", w: 7 });
S.draw(`M1300 430 Q1340 400 1380 430 L1450 485 Q1410 470 1390 500 Q1360 470 1330 495 Q1300 470 1270 470 Z`, 0, 0, { fill: "#ffffff", c: "#1d1b1f", w: 5 });
S.draw(line([1340, 412], [1340, 300], 0), 0, 0, { c: "#1d1b1f", w: 8 });
S.draw(`M1340 300 L1440 325 L1340 352 Z`, 0, 0, { fill: DS.c("red"), c: "#1d1b1f", w: 5 });
// winding path
S.draw(smooth([[860, 1100], [1060, 960], [1450, 900], [1300, 780], [1420, 640], [1350, 520]]), 0, 0, { c: DS.c("sand", 1), w: 26 });
// quitters on the path: one slumped on a rock, one heading down with a white flag
DS.shape(S, `M1500 905 Q1500 860 1560 855 Q1640 852 1650 905 Z`, "gray", { t: 0, w: "mid" });
const A = S.fig(1550, 860, { s: 1.15, sit: true, pose: "sad", hair: "curly", hairC: "#2a2220", outfit: "tee", outfitC: DS.c("green") }).instant(0);
A.face(0, "sad", -4);
const B = S.fig(1760, 960, { s: 1.25, armL: [[-35, -20], [-62, -82]], hair: "bun", hairC: "#3b2a20", outfit: "tee", outfitC: DS.c("purple") }).instant(0);
B.face(0, "tired", 4);
const [fx, fy] = B.hand("L");
S.draw(line([fx, fy + 40], [fx, fy - 120], 0), 0, 0, { c: "#1d1b1f", w: 6 });
S.draw(`M${fx} ${fy - 120} Q${fx - 50} ${fy - 135} ${fx - 95} ${fy - 115} L${fx - 95} ${fy - 50} Q${fx - 50} ${fy - 70} ${fx} ${fy - 55} Z`, 0, 0, { fill: "#ffffff", c: "#1d1b1f", w: 5 });
// front: huge Dave, sweating, teeth gritted, still climbing
const F = S.fig(480, 1900, { s: 4.2, pose: "reach", hair: "side", hairC: DS.c("brown"), outfit: "tee", outfitC: DS.c("blue") }).instant(0);
F.face(0, "determined", 6);
const hx = 480, hy = 1900 - 309 * 4.2, r = 210;
S.draw(rrect(hx - 0.3 * r + 6, hy + 0.34 * r, 0.6 * r, 0.22 * r, 12), 0, 0, { fill: "#ffffff", c: "#1d1b1f", w: 6 });
S.draw(line([hx - 0.3 * r + 6, hy + 0.45 * r], [hx + 0.3 * r + 6, hy + 0.45 * r], 0) + [-0.15, 0, 0.15].map((k) => line([hx + k * r + 6, hy + 0.34 * r], [hx + k * r + 6, hy + 0.56 * r], 0)).join(""), 0, 0, { c: "#1d1b1f", w: 4 });
S.drop(hx - 1.1 * r, hy - 0.3 * r, 2.4, 0, 0); S.drop(hx + 1.1 * r, hy - 0.5 * r, 2.0, 0, 0); S.drop(hx - 0.95 * r, hy + 0.4 * r, 1.6, 0, 0);
S.text("GIVE UP?", 960, 230, { size: 210, c: "#FEFE06", halo: "#111111", haloW: 0.09 });
