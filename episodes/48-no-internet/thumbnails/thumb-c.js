// look: still
// @library auto
// Third concept B (object as hero), kept as a spare for Test & Compare: the internet's actual body, a fat sea cable snapped in two, glass-fibre strands fanning out of both ends. Deep sea-blue field. Words: "WET WIRE?" (script line 13).
// Critique round 1 (focal / emotion / curiosity / contrast / text / composition / polish / honesty / brand): 2 / 1 / 3 / 3 / 4 / 2 / 2 / 5 / 3.
//   Rows under 4: the cable was a thin line lost on the sand with a big empty middle, no face or feeling, a flat glow ellipse that looked like a stain.
//   Fixes: cable 150 px thick across the whole frame, cross-sections with copper and fanned cyan fibre strands (the real thing), no ellipse, a tiny scared crab-free sea floor.
// Critique round 2: 4 / 3 / 4 / 4 / 5 / 4 / 4 / 5 / 4. Emotion stays 3 on purpose: B is the object-only lottery ticket next to A's face. Passes at 168 px (see the feed grid).
const S = scene(0, 1, { cam: "none" });
S.bg("flat", { sky: "#0a5d86", ground: "#e6c98f", hy: 860 });
S.fill(rect(0, 0, 1920, 560), 0, 0, "#0e7aa6", 0.55);
[[230, 330, 38], [420, 760, 24], [1650, 420, 44], [1790, 650, 26], [1480, 250, 22], [300, 640, 18]].forEach(([x, y, r]) => S.draw(circ(x, y, r), 0, 0.01, { c: "#d9f3ff", w: 7 }));
const cy = 600, gx0 = 840, gx1 = 1080;
// two cable halves, each with highlight and dark bands
[[-140, gx0], [gx1, 2060]].forEach(([a, b]) => {
  S.draw(rrect(a, cy - 80, b - a, 160, 36), 0, 0.01, { c: "#0b1220", w: 10, fill: "#243247", fo: 1 });
  S.fill(rect(a, cy - 62, b - a, 18), 0, 0, "#ffffff", 0.22);
  for (let x = a + 120; x < b - 60; x += 220) S.fill(rect(x, cy - 78, 26, 156), 0, 0, "#0b1220", 0.55);
});
// cut faces: copper ring + fibre strands fanning into the gap
[[gx0, -1], [gx1, 1]].forEach(([x, d]) => {
  S.draw(circ(x, cy, 34, 78), 0, 0.01, { c: "#7c2d12", w: 8, fill: "#f59e0b", fo: 1 });
  S.fill(circ(x, cy, 16, 46), 0, 0, "#fde68a", 1);
  for (let i = -5; i <= 5; i++) S.draw(`M${x} ${cy + i * 6} Q${x + d * 90} ${cy + i * 26} ${x + d * (150 + Math.abs(i) * 6)} ${cy + i * 52}`, 0, 0.01, { c: "#67e8f9", w: 7 });
});
L.put(S, "fx-star-burst", 960, cy - 10, { s: 1.1 });
S.text("WET WIRE?", 960, 270, { size: 260, c: "#FEFE06", halo: "#111111", haloW: 0.09 });
