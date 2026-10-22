// look: still
// C2 (consequence at its extreme): flat deep-blue field. Dave's head, huge, cut open like a jar; his brain has swollen out of it,
// steaming, with his little hair cap pushed up and sitting crooked on top. Cross-eyed, wobbly mouth. Dial on the right: past 100, in the red.
// Kind overload, no flashes, no medical detail. Words: "ALL ON?"
// @include helpers.js
const S = scene(0, 1, { cam: "none" });
const HX = 700, HY = 905, R = 320, CY = HY - 0.6 * R, HW = R * Math.sqrt(1 - 0.36);
S.fill(rect(-200, -200, 2320, 1480), 0, 0, "#1546b8", 1);
// front-view brain: bumpy outline, a midline groove, bold folds
const brainFront = (cx, cy, rx, ry) => {
  const pts = []; for (let i = 0; i <= 38; i++) { const a = (i / 38) * Math.PI * 2, r = 1 + 0.045 * Math.cos(16 * a); pts.push([cx + Math.cos(a) * rx * r, cy + Math.sin(a) * ry * r]); }
  S.draw(smooth(pts), 0, 0, { fill: DS.vol("pink"), c: INK, w: 16 });
  const fold = (p) => S.draw(smooth(p.map(([a, b]) => [cx + a * rx, cy + b * ry])), 0, 0, { c: DS.c("pink", 2), w: 11 });
  fold([[0, -1], [0.04, -0.6], [-0.04, -0.2], [0.03, 0.2], [0, 0.6]]);
  [-1, 1].forEach((sd) => {
    fold([[sd * 0.18, -0.7], [sd * 0.34, -0.82], [sd * 0.5, -0.62], [sd * 0.68, -0.7]]);
    fold([[sd * 0.14, -0.3], [sd * 0.3, -0.42], [sd * 0.44, -0.22], [sd * 0.62, -0.34], [sd * 0.82, -0.2]]);
    fold([[sd * 0.2, 0.1], [sd * 0.36, -0.02], [sd * 0.52, 0.16], [sd * 0.72, 0.06]]);
    fold([[sd * 0.3, 0.42], [sd * 0.5, 0.32], [sd * 0.66, 0.5]]);
  });
};
// heat rays (static strokes)
for (let i = 0; i < 9; i++) { const a = Math.PI * (1.08 + i * 0.105), c = Math.cos(a), s = Math.sin(a); S.draw(line([HX + c * 470, 470 + s * 330], [HX + c * 560, 470 + s * 395], 0), 0, 0, { c: "#ffe066", w: 16 }); }
// steam puffs out of the sides
[[HX - 470, 330, 60], [HX - 545, 230, 44], [HX - 590, 145, 32], [HX + 470, 320, 62], [HX + 545, 215, 46], [HX + 595, 125, 34]].forEach(([x, y, r]) => { S.fill(circ(x, y, r), 0, 0, "#ffffff", 0.97); S.draw(circ(x, y, r), 0, 0, { c: INK, w: 8 }); });
brainFront(HX, 490, 410, 300);
// the head: a bowl below the cut; the front lip curves over the brain
S.draw(`M${HX - HW} ${CY} A${R} ${R} 0 1 0 ${HX + HW} ${CY} Q${HX} ${CY + 70} ${HX - HW} ${CY} Z`, 0, 0, { fill: DS.vol("white"), c: INK, w: 16 });
// his hair cap, pushed up, sitting crooked on top of the brain
const cap = S.grp(), CX = HX + 30, CB = 250;
S.draw(`M${CX - HW * 0.8} ${CB} Q${CX - HW * 0.8} ${CB - 190} ${CX} ${CB - 190} Q${CX + HW * 0.8} ${CB - 190} ${CX + HW * 0.8} ${CB} Q${CX + HW * 0.3} ${CB - 40} ${CX - HW * 0.1} ${CB + 10} Q${CX - HW * 0.45} ${CB - 30} ${CX - HW * 0.8} ${CB} Z`, 0, 0, { fill: DS.vol("brown"), c: INK, w: 14, parent: cap });
cap.setAttribute("transform", `rotate(17 ${CX} ${CB})`);
// cross-eyed face
const eye = (x, y, px) => { S.draw(circ(x, y, 0.27 * R), 0, 0, { fill: "#ffffff", c: INK, w: 12 }); S.fill(circ(x + px, y + 6, 0.11 * R), 0, 0, INK, 1); };
eye(HX - 0.38 * R, HY - 0.04 * R, 0.13 * R); eye(HX + 0.38 * R, HY - 0.04 * R, -0.13 * R);
S.draw(`M${HX - 0.62 * R} ${HY - 0.4 * R} Q${HX - 0.4 * R} ${HY - 0.52 * R} ${HX - 0.16 * R} ${HY - 0.42 * R}`, 0, 0, { c: INK, w: 16 });
S.draw(`M${HX + 0.16 * R} ${HY - 0.36 * R} Q${HX + 0.4 * R} ${HY - 0.4 * R} ${HX + 0.64 * R} ${HY - 0.3 * R}`, 0, 0, { c: INK, w: 16 });
S.draw(smooth(Array.from({ length: 9 }, (_, i) => [HX - 0.3 * R + i * 0.075 * R, HY + 0.42 * R + (i % 2 ? -18 : 18)])), 0, 0, { c: INK, w: 14 });
[-0.62, 0.62].forEach((dx) => S.fill(circ(HX + dx * R, HY + 0.24 * R, 0.13 * R, 0.08 * R), 0, 0, "#ff7a8a", 0.55));
sweatAt(S, HX + R * 0.98, HY - R * 0.12, 0, 3.2); sweatAt(S, HX - R * 1.0, HY + R * 0.05, 0, 2.6);
// the dial: needle past 100, deep in the red, shaking
dial(S, 1590, 815, 185, { v: 116, sticker: false });
[0, 1, 2].forEach((i) => S.draw(arc(1590, 815, 205 + i * 24, 40, 76), 0, 0, { c: "#e5383b", w: 12 }));
S.text("ALL", 1560, 300, { size: 355, c: "#FEFE06", halo: "#111111", haloW: 0.09 });
S.text("ON?", 1565, 595, { size: 355, c: "#FEFE06", halo: "#111111", haloW: 0.09 });
