// look: still
// B (old style, test partner): flat sky-blue field over a breakfast-table band. Big uneasy Dave on the left hugging himself and shivering; filling the right half, a toast crumb bigger than he is
// with a tiny red arrow labelled LUNCH. Words: 5 MM? in white with a black halo.
// @include helpers.js
const S = scene(0, 1, { cam: "none" });
S.fill(rect(-200, -200, 2320, 1480), 0, 0, "#74C8ED", 1);
S.fill(rect(-200, 800, 2320, 400), 0, 0, "#C4A472", 1);
S.draw(`M-200 800 H2120`, 0, 0, { c: "#1d1b1f", w: 9 });
[[0, 900, 1920, 900], [0, 990, 1920, 990]].forEach(([a, b, c, d]) => S.draw(`M${a} ${b} H${c}`, 0, 0, { c: "#9c7a4a", w: 5 }));
const cg = crumb(S, 1420, 1010, 3.3, {});
S.draw(`M1300 380 L1380 560`, 0, 0, { c: "#e5383b", w: 16 }); S.draw(arrowHead(1380, 560, 1.15, 52), 0, 0, { c: "#e5383b", w: 16 });
S.text("LUNCH", 1230, 340, { size: 100, c: "#e5383b", halo: "#ffffff", haloW: 0.16 });
const F = dave(S, 470, 1890, "near", { s: 4.2, mood: "worried", look: 6, pose: "cross", breathe: false });
[[-1, 0.0], [1, 0.0]].forEach(([sd]) => [0, 1, 2].forEach((i) => S.draw(arc(F.cx + sd * (250 + i * 44), 1000, 110 + i * 24, sd > 0 ? -30 : 150, sd > 0 ? 30 : 210), 0, 0, { c: "#1d1b1f", w: 12 })));
S.text("5 MM?", 960, 215, { size: 250, c: "#ffffff", halo: "#111111", haloW: 0.09 });
