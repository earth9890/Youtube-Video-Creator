// look: still
// B (lottery ticket, archetype B: one symbol on black, no words): one blazing "new" star with a red crack through its core.
// Wrongness: a broken star (the guest star of 1006 had died 7,000 years before anyone saw it).
// @include helpers.js
const S = scene(0, 1, { cam: "none" });
S.fill(rect(-200, -200, 2320, 1480), 0, 0, "#000000", 1);
for (let i = 0; i < 60; i++) { const x = (i * 733 + 151) % 1900, y = (i * 397 + 67) % 1060, dx = x - 960, dy = y - 540; if (dx * dx + dy * dy > 520 * 520) S.fill(circ(x, y, 2 + (i % 3)), 0, 0, "#ffffff", 0.3 + (i % 5) * 0.1); }
S.fill(circ(960, 540, 760), 0, 0, DS.glow("#FFF4D6", 0.28), 1);
S.fill(circ(960, 540, 330), 0, 0, DS.glow("#ffffff", 0.85), 1);
const sp = (r, w) => `M960 ${540 - r} Q${960 + w} ${540 - w} ${960 + r} 540 Q${960 + w} ${540 + w} 960 ${540 + r} Q${960 - w} ${540 + w} ${960 - r} 540 Q${960 - w} ${540 - w} 960 ${540 - r} Z`;
S.fill(sp(420, 26), 0, 0, "#ffffff", 1);
S.fill(circ(960, 540, 110), 0, 0, "#ffffff", 1);
S.draw("M850 300 L930 420 L880 480 L990 560 L940 630 L1060 790 M990 560 L1090 530", 0, 0, { c: "#D93A45", w: 30 });
S.draw("M850 300 L930 420 L880 480 L990 560 L940 630 L1060 790", 0, 0, { c: "#5C024F", w: 9 });
