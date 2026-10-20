// look: still
// B (lottery ticket, archetype B): a single full Moon on pure black with a lamp's pull-chain hanging from its bottom edge, the bead swinging. No words.
// Wrongness: the Moon is a lamp you can switch off. The title asks the question.
const S = scene(0, 1, { cam: "none" });
S.fill(rect(-200, -200, 2320, 1480), 0, 0, "#000000", 1);
let sd = 3; const r1 = () => ((sd = (sd * 16807) % 2147483647) - 1) / 2147483646;
for (let i = 0; i < 40; i++) { const x = r1() * 1920, y = r1() * 1080, r = 1.5 + r1() * 2; if (Math.hypot(x - 960, y - 430) > 470) S.fill(circ(x, y, r), 0, 0, "#ffffff", 0.3 + r1() * 0.35); }
const cx = 960, cy = 430, R = 330;
S.fill(circ(cx, cy, R * 1.45), 0, 0, DS.glow("#fff6d6", 0.22), 1);
S.draw(circ(cx, cy, R), 0, 0, { c: "#9aa0a6", w: 5, fill: DS.vol("paper") });
[[-0.28, -0.32, 0.26, 0.22], [0.12, -0.28, 0.16, 0.15], [0.24, 0.02, 0.2, 0.17], [0.6, -0.12, 0.1, 0.12], [-0.5, 0.08, 0.2, 0.34], [-0.2, 0.38, 0.15, 0.1]].forEach(([a, b, rx, ry]) => S.fill(circ(cx + a * R, cy + b * R, rx * R, ry * R), 0, 0, "#c4c8cc", 0.6));
[[0.22, 0.58, 0.07], [-0.5, -0.5, 0.06], [0.55, 0.3, 0.05], [-0.15, 0.6, 0.05]].forEach(([a, b, k]) => S.draw(circ(cx + a * R, cy + b * R, k * R), 0, 0, { c: "#b4b9be", w: 3 }));
// the pull-chain: a run of beads from the Moon's bottom edge, swinging a little to the right, ending in a pull
const x0 = cx, y0 = cy + R - 4, x1 = cx + 46, y1 = 980;
for (let i = 0; i <= 12; i++) { const f = i / 12; S.draw(circ(x0 + (x1 - x0) * f * f, y0 + (y1 - y0) * f, 12), 0, 0, { c: "#5d6873", w: 3, fill: "#d9dde1" }); }
S.draw(`M${x1 - 34} ${y1 + 14} Q${x1} ${y1 - 36} ${x1 + 34} ${y1 + 14} L${x1 + 26} ${y1 + 66} Q${x1} ${y1 + 80} ${x1 - 26} ${y1 + 66} Z`, 0, 0, { c: "#5d6873", w: 4, fill: "#F4BC22" });
