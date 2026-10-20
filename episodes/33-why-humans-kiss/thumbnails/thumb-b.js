// look: still
// B (lottery ticket, archetype B): one Earth on near-black; the left half is covered in red lipstick kiss marks, the right half is bare. No words.
// Wrongness: lipstick on a planet, and only on half of it (the 46 % twist).
// @include kit.js
const S = scene(0, 1, { cam: "none" });
S.fill(rect(-200, -200, 2320, 1480), 0, 0, "#05031A", 1);
for (let i = 0; i < 70; i++) { const x = (i * 733 + 151) % 1900, y = (i * 397 + 67) % 1060; if (Math.hypot(x - 960, y - 540) > 540) S.fill(circ(x, y, 2 + (i % 3)), 0, 0, "#ffffff", 0.35 + (i % 5) * 0.1); }
earth(S, 960, 540, 470);
const k = clipTo(S.grp(), circ(960, 540, 470));
[[620, 300, -20, 1.7], [810, 200, 12, 1.4], [680, 510, 8, 1.9], [870, 400, -14, 1.5], [580, 720, 18, 1.6], [820, 640, -6, 1.8], [730, 860, 10, 1.4], [890, 820, -18, 1.2], [530, 470, 4, 1.2]].forEach(([x, y, r, s]) => { const g = S.grp(k); lips(S, x, y, s, { parent: g }); g.setAttribute("transform", `rotate(${r} ${x} ${y})`); });
S.draw(line([960, 60], [960, 1020], 0), 0, 0, { c: "#ffffff", w: 5, op: 0.35 });
