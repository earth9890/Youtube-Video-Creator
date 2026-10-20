// look: still
// C (clickbait scene mode, 2026-10-20): Dave in bed at night, face lit by the phone, and a huge wave curling over him
// inside the bedroom (the video: "an urge is a wave — it rises, it peaks, and it passes"). Text "2 AM AGAIN?": the video's
// opening ("It's 2 AM. You promised yourself: never again."). Nothing explicit: only the back of the phone is shown.
const S = scene(0, 1, { cam: "none" });
S.bg("flat", { sky: "#5e6899", ground: "#474f78", hy: 900 });
// night window, top right
DS.shape(S, rrect(1560, 300, 280, 250, DS.r.sm), "night", { t: 0, flat: true, w: "mid" });
S.draw(line([1700, 300], [1700, 550], 0) + line([1560, 425], [1840, 425], 0), 0, 0, { c: "#1d1b1f", w: 7 });
S.fill(circ(1775, 360, 30), 0, 0, "#fff3c4", 1);
[[1600, 350], [1640, 500], [1790, 500]].forEach(([x, y]) => S.fill(circ(x, y, 5), 0, 0, "#ffffff", 0.9));
// the wave: rises from the left, crest curling over toward Dave
const WV = S.grp(); WV.setAttribute("transform", "translate(-40 0) scale(1.13 1) translate(40 0)");
S.draw(`M-40 1100 L-40 720 Q60 520 300 400 Q520 290 760 330 Q930 370 960 500 Q900 430 820 450 Q700 480 690 600 Q690 760 820 1100 Z`, 0, 0, { fill: DS.vol("blue"), c: "#1d1b1f", w: 7, parent: WV });
S.draw(`M140 560 Q300 430 520 390 M260 760 Q340 620 520 560 M500 980 Q480 800 600 690`, 0, 0, { c: DS.c("blue", 1), w: 10, parent: WV });
// foam on the crest
S.draw(smooth([[300, 400], [380, 345], [470, 330], [560, 312], [660, 318], [760, 330], [860, 360], [935, 420], [960, 500], [915, 470], [880, 500], [840, 452], [790, 480], [760, 440], [700, 470], [660, 420], [580, 430], [520, 395], [440, 420], [380, 410], [300, 400]]) + " Z", 0, 0, { fill: "#ffffff", c: "#1d1b1f", w: 6, parent: WV });
[[1105, 450], [1060, 560], [1010, 600]].forEach(([x, y], i) => S.draw(circ(x, y, 14 - i * 3), 0, 0, { fill: "#ffffff", c: "#1d1b1f", w: 4 }));
// phone light: a cool glow behind Dave
S.fill(circ(1250, 820, 420, 380), 0, 0, DS.glow("#bfefff", 0.7), 1);
// pillow behind him
DS.shape(S, rrect(1010, 760, 520, 260, 90), "paper", { t: 0, w: "mid" });
// Dave sitting up in bed, holding the phone, eyes wide at the wave
const F = S.fig(1260, 1900, { s: 4.2, hair: "side", hairC: DS.c("brown"), outfit: "tee", outfitC: DS.c("blue"), armL: [[-58, 50], [-10, 26]], armR: [[58, 50], [10, 26]] }).instant(0);
F.face(0, "wow", -9);
const hx = 1260, hy = 1900 - 309 * 4.2, r = 210;
S.fill(circ(hx, hy + 0.5 * r, 0.9 * r, 0.6 * r), 0, 0, DS.glow("#9fe6ff", 0.35), 1); // screen light on his face
S.drop(hx + 1.08 * r, hy - 0.3 * r, 2.2, 0, 0);
// blanket
DS.shape(S, `M720 1010 Q1000 965 1260 990 Q1560 960 1980 1000 L1980 1100 L720 1100 Z`, "purple", { t: 0, w: "mid" });
// phone (back side) in both hands, glowing at the edges
S.fill(rrect(1170, 870, 180, 250, 30), 0, 0, "#bfefff", 0.55);
S.draw(rrect(1185, 885, 150, 230, 24), 0, 0, { fill: "#2a2d36", c: "#1d1b1f", w: 7 });
S.fill(circ(1215, 920, 12), 0, 0, "#6f757b", 1); S.fill(circ(1215, 952, 12), 0, 0, "#6f757b", 1);
S.text("2 AM AGAIN?", 960, 230, { size: 200, c: "#FEFE06", halo: "#111111", haloW: 0.09 });
