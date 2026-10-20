// look: still
// B (lottery ticket, archetype B: one symbol on black, no words): one huge stick-figure eye whose pupil is the Earth, crossed by a thin sunbeam streak.
// Wrongness: a whole planet sitting in a person's eye (the overview effect made literal).
// @include kit.js
const S = scene(0, 1, { cam: "none" });
S.fill(rect(-200, -200, 2320, 1480), 0, 0, "#000000", 1);
for (let i = 0; i < 50; i++) { const x = (i * 733 + 151) % 1900, y = (i * 397 + 67) % 1060, dx = x - 960, dy = y - 560; if (dx * dx + dy * dy > 470 * 470) S.fill(circ(x, y, 2 + (i % 3)), 0, 0, "#ffffff", 0.35 + (i % 5) * 0.1); }
S.draw(smooth([[610, 170], [960, 92], [1310, 175]]), 0, 0, { c: "#ffffff", w: 30 }); // raised brow: unease
S.draw(circ(960, 590, 350), 0, 0, { c: "#d9d4cc", w: 14, fill: "#ffffff" });
S.fill(circ(960, 600, 222), 0, 0, "#30B0E9", 1);
earth(S, 960, 600, 192, { halo: false });
S.fill("M560 1180 L640 1180 L1380 -100 L1300 -100 Z", 0, 0, "#F8D58F", 0.2); // the Pale Blue Dot's sunbeam
S.fill(circ(870, 500, 44), 0, 0, "#ffffff", 0.95);
