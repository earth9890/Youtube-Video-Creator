// look: still
// D (minimal symbol): one huge pink brain (front view) on black. A yellow "10%" sticker on it is peeling off at one corner.
// Words: "ONLY 1%?" in white (the twist: at any moment, maybe under one percent of neurons are strongly active).
// @include helpers.js
const S = scene(0, 1, { cam: "none" });
S.fill(rect(-200, -200, 2320, 1480), 0, 0, "#000000", 1);
// front-view brain, so big its base runs off the bottom: bumpy outline, a midline groove, dense bold folds
const BX = 960, BY = 770, RX = 590, RY = 420;
const pts = []; for (let i = 0; i <= 38; i++) { const a = (i / 38) * Math.PI * 2, r = 1 + 0.04 * Math.cos(16 * a); pts.push([BX + Math.cos(a) * RX * r, BY + Math.sin(a) * RY * r]); }
S.draw(smooth(pts), 0, 0, { fill: DS.vol("pink"), c: INK, w: 16 });
const fold = (p) => S.draw(smooth(p.map(([a, b]) => [BX + a * RX, BY + b * RY])), 0, 0, { c: DS.c("pink", 2), w: 14 });
fold([[0, -1], [0.04, -0.7], [-0.04, -0.4], [0.03, -0.1], [0, 0.3]]);
[-1, 1].forEach((sd) => {
  fold([[sd * 0.14, -0.78], [sd * 0.28, -0.9], [sd * 0.44, -0.74], [sd * 0.54, -0.76]]);
  fold([[sd * 0.12, -0.5], [sd * 0.26, -0.62], [sd * 0.4, -0.46], [sd * 0.56, -0.58], [sd * 0.72, -0.48]]);
  fold([[sd * 0.16, -0.22], [sd * 0.3, -0.34], [sd * 0.46, -0.18], [sd * 0.62, -0.3], [sd * 0.8, -0.16]]);
  fold([[sd * 0.12, 0.06], [sd * 0.28, -0.04], [sd * 0.42, 0.1], [sd * 0.58, 0.0], [sd * 0.76, 0.12], [sd * 0.88, 0.05]]);
  fold([[sd * 0.2, 0.32], [sd * 0.36, 0.22], [sd * 0.52, 0.36], [sd * 0.7, 0.28]]);
});
// the "10%" sticker, its top-right corner lifted and curling off
const sg = S.grp(), x0 = 1080, y0 = 640, x1 = 1460, y1 = 800, f = 140;
S.fill(`M${x0 + 10} ${y0 + 14} L${x1 - f + 10} ${y0 + 14} L${x1 + 10} ${y0 + f + 14} L${x1 + 10} ${y1 + 14} L${x0 + 10} ${y1 + 14} Z`, 0, 0, "#000000", 0.3, sg);
S.draw(`M${x0} ${y0} L${x1 - f} ${y0} L${x1} ${y0 + f} L${x1} ${y1} L${x0} ${y1} Z`, 0, 0, { fill: "#ffcf33", c: INK, w: 10, parent: sg });
S.text("10%", x0 + 165, y0 + 128, { size: 125, c: INK, parent: sg });
S.fill(`M${x1 - f} ${y0} L${x1} ${y0 + f} Q${x1 + 85} ${y0 + 70} ${x1 + 75} ${y0 - 40} Q${x1 - 20} ${y0 - 60} ${x1 - f} ${y0} Z`, 0, 0, "#000000", 0.25, sg);
S.draw(`M${x1 - f} ${y0} L${x1} ${y0 + f} Q${x1 + 60} ${y0 + 40} ${x1 + 50} ${y0 - 70} Q${x1 - 40} ${y0 - 80} ${x1 - f} ${y0} Z`, 0, 0, { fill: DS.vol("white"), c: INK, w: 10, parent: sg });
S.draw(`M${x1 - f + 22} ${y0 - 4} L${x1 + 4} ${y0 + f - 22}`, 0, 0, { c: "#d9cfbd", w: 12, parent: sg });
sg.setAttribute("transform", "rotate(-8 1270 720)");
S.text("ONLY 1%?", 960, 312, { size: 360, c: "#ffffff", halo: "#111111", haloW: 0.09 });
