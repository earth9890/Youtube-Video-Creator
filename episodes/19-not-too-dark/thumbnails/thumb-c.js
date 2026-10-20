// look: still
// C (clickbait scene mode, 2026-10-20): a 1950s photo lab; an old bellows camera on a tripod is aimed at the "SHIRLEY" card
// (a generic woman in a bright dress + colour swatches) under a studio lamp; huge Dave stares at it, shocked.
// Text "WHO'S SHIRLEY?": the video's culprit (labs tuned colour prints to one photo of a white woman called Shirley).
// Respect rules: Dave's skin = the episode's (DS brown light #7a5236), no glow or fill over any face.
const S = scene(0, 1, { cam: "none" });
S.bg("flat", { sky: "#c9a06b", ground: "#8a6a4a", hy: 900 });
// studio lamp (top right) and its warm pool behind the card
S.fill(circ(1480, 600, 470, 400), 0, 0, "#ffe9a8", 0.4);
S.draw(line([1860, 900], [1860, 420], 0) + line([1860, 420], [1830, 390], 0), 0, 0, { w: 8 });
S.draw(`M1760 330 Q1820 300 1880 350 L1810 440 Z`, 0, 0, { w: 7, fill: "#6f757b" });
// easel + the Shirley card
S.draw(line([1340, 905], [1420, 300], 0) + line([1640, 905], [1560, 300], 0), 0, 0, { w: 9, c: "#7f5f45" });
S.draw(rrect(1240, 290, 470, 600, 14), 0, 0, { w: 9, fill: "#fbf7ef" });
S.draw(rect(1270, 320, 410, 370), 0, 0, { w: 5, fill: "#a9dcf5" });
const SH = S.fig(1475, 690, { s: 1.0, hair: "bun", hairC: "#5a3825", skin: "#f6e7c4", outfit: "apron", outfitC: "#e5383b", pose: "hips" }).instant(0);
SH.face(0, "smile", 0);
["#e5383b", "#ffcf33", "#3f9e4a", "#2f6fd6", "#9aa0a6"].forEach((c, i) => S.draw(rect(1280 + i * 80, 705, 70, 60), 0, 0, { w: 4, fill: c }));
S.text("SHIRLEY", 1475, 860, { size: 84, c: "#1d1b1f" });
// bellows camera on a tripod, lens aimed at the card
S.draw(line([1010, 640], [930, 905], 0) + line([1010, 640], [1090, 905], 0) + line([1010, 640], [1010, 905], 0), 0, 0, { w: 8 });
S.draw(rrect(900, 500, 120, 150, 10), 0, 0, { w: 8, fill: "#3a363d" });
S.draw(`M1020 520 L1130 545 L1130 605 L1020 630 Z`, 0, 0, { w: 7, fill: "#5a3825" });
[1050, 1080, 1105].forEach((x) => S.draw(line([x, 527 + (x - 1020) * 0.23], [x, 623 - (x - 1020) * 0.23], 0), 0, 0, { w: 4, c: "#3d2418" }));
S.draw(circ(1145, 575, 34), 0, 0, { w: 7, fill: "#1d1b1f" });
S.fill(circ(1138, 566, 10), 0, 0, "#ffffff", 0.8);
// big shocked Dave, eyes on the card
const F = S.fig(400, 1900, { s: 4.2, hair: "short", hairC: "#1d1b1f", skin: "#7a5236", outfit: "tee", outfitC: "#2f6fd6", pose: "armsUp" }).instant(0);
F.face(0, "wow", 14);
S.text("WHO'S SHIRLEY?", 960, 230, { size: 180, c: "#FEFE06", halo: "#111111", haloW: 0.09 });
