// look: still
// C (clickbait scene mode, 2026-10-20): late at night the work on Dave's laptop has turned into a monster (the task's bad
// feeling, made visible), pages fly off the desk, and Dave hides behind his phone. Text "NOT LAZY?": the video's opening
// hook ("You're not lazy. Procrastination isn't a time problem. It's a feeling problem.").
const S = scene(0, 1, { cam: "none" });
S.bg("flat", { sky: "#6f7d5c", ground: "#525c43", hy: 980 });
// desk lamp glow
S.fill(circ(1380, 640, 620, 500), 0, 0, DS.glow("#ffd27a", 0.75), 1);
// wall clock: 11:58
S.clock(1760, 360, 92, 0, 0, { h: 11, m: 58 });
// desk
DS.shape(S, rrect(980, 860, 900, 46, DS.r.xs), "wood", { t: 0, w: "mid" });
DS.shape(S, rrect(1010, 906, 50, 200, DS.r.xs), "wood", { t: 0, w: "mid", tone: 2 });
DS.shape(S, rrect(1800, 906, 50, 200, DS.r.xs), "wood", { t: 0, w: "mid", tone: 2 });
// laptop: base + screen showing the document with a monster face
const LX = 1380;
S.draw(`M${LX - 300} 860 L${LX + 300} 860 L${LX + 270} 830 L${LX - 270} 830 Z`, 0, 0, { fill: "#c4c8cc", c: "#1d1b1f", w: 7 });
S.draw(rrect(LX - 250, 440, 500, 390, 22), 0, 0, { fill: "#3a363d", c: "#1d1b1f", w: 7 });
S.draw(rrect(LX - 222, 466, 444, 338, 10), 0, 0, { fill: "#ffffff", c: "#1d1b1f", w: 5 });
[500, 530].forEach((y) => S.draw(line([LX - 190, y], [LX + 190, y], 0), 0, 0, { c: "#c4c8cc", w: 6 }));
// angry eyes + brows
[-1, 1].forEach((sd) => {
  S.draw(circ(LX + sd * 90, 610, 42, 34), 0, 0, { fill: "#fff36b", c: "#1d1b1f", w: 6 });
  S.fill(circ(LX + sd * 80, 615, 16), 0, 0, "#1d1b1f", 1);
  S.draw(line([LX + sd * 150, 548], [LX + sd * 40, 582], 0), 0, 0, { c: "#1d1b1f", w: 12 });
});
// jagged mouth with teeth
S.draw(`M${LX - 150} 690 Q${LX} 800 ${LX + 150} 690 Z`, 0, 0, { fill: "#8c2f39", c: "#1d1b1f", w: 6 });
S.draw(`M${LX - 140} 692 L${LX - 110} 730 L${LX - 80} 696 L${LX - 50} 738 L${LX - 18} 698 L${LX + 18} 740 L${LX + 50} 698 L${LX + 80} 734 L${LX + 110} 694 L${LX + 140} 692 Z`, 0, 0, { fill: "#ffffff", c: "#1d1b1f", w: 5 });
// pages flying off the desk
[[1000, 640, -24], [910, 470, 18], [1720, 600, 22]].forEach(([x, y, a]) => {
  const g = S.grp(); g.setAttribute("transform", `rotate(${a} ${x} ${y})`);
  S.draw(rrect(x - 60, y - 78, 120, 156, 8), 0, 0, { fill: "#ffffff", c: "#1d1b1f", w: 5, parent: g });
  [-40, -14, 12, 38].forEach((dy) => S.draw(line([x - 38, y + dy], [x + 38, y + dy], 0), 0, 0, { c: "#9aa0a6", w: 5, parent: g }));
});
// front: Dave recoiling, hiding behind his phone
const F = S.fig(470, 1900, { s: 4.2, hair: "side", hairC: DS.c("brown"), outfit: "tee", outfitC: DS.c("blue"), armL: [[-58, -12], [-34, -64]], armR: [[46, 34], [56, -12]] }).instant(0);
F.face(0, "wow", 9);
const hx = 470, hy = 1900 - 309 * 4.2, r = 210;
S.drop(hx - 1.1 * r, hy - 0.2 * r, 2.2, 0, 0); S.drop(hx + 1.1 * r, hy - 0.45 * r, 1.8, 0, 0);
S.phone(470 + 24 * 4.2 + 56 * 4.2, 1900 - 255 * 4.2 + 10 * 4.2 - 12 * 4.2 - 20, 2.0, 0, 0, { screen: "play", glow: true });
S.text("NOT LAZY?", 960, 230, { size: 210, c: "#FEFE06", halo: "#111111", haloW: 0.09 });
