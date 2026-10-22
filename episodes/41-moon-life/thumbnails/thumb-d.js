// look: still
// D (minimal symbol): one huge full Moon on black with a single black pit in its middle (the twist: the pit's shade stays at about 17 °C all month).
// A soft warm light deep in the pit; tiny Dave on the rim with his suitcase, for scale. Text: 17°C? (the pit temperature the video gives).
// @include helpers.js
const S = scene(0, 1, { cam: "none" });
S.fill(rect(-200, -200, 2320, 1480), 0, 0, "#000000", 1);
const MX = 960, MY = 650, MR = 450;
// a flat cream Moon (Zenn-style single shape): maria and a few crater rings
const disc = clipTo(S.grp(), circ(MX, MY, MR));
S.fill(circ(MX, MY, MR), 0, 0, "#f2e8c4", 1, disc);
MARIA.forEach(([a, b, rx, ry]) => S.fill(circ(MX + a * MR, MY + b * MR, rx * MR, ry * MR), 0, 0, "#d9cca0", 1, disc));
[[0.5, 0.45, 0.07], [-0.55, -0.45, 0.06], [0.62, -0.42, 0.05], [-0.3, 0.62, 0.06], [-0.68, 0.3, 0.045]].forEach(([a, b, k]) => S.draw(circ(MX + a * MR, MY + b * MR, k * MR), 0, 0, { c: "#bfb084", w: 7, parent: disc }));
S.draw(circ(MX, MY, MR), 0, 0, { c: DS.P.ink[0], w: 12 });
// the pit: a black hole with a darker rim and a warm glow deep inside
const PX = MX + 10, PY = MY + 60, PRX = 195, PRY = 150;
S.fill(circ(PX, PY, PRX + 30, PRY + 26), 0, 0, "#c9b98a", 1);
S.fill(circ(PX, PY, PRX, PRY), 0, 0, "#060504", 1);
// far inner wall catching light, so it reads as a hole with depth, not a black spot
S.fill(`M${PX - PRX} ${PY} A${PRX} ${PRY} 0 0 1 ${PX + PRX} ${PY} A${PRX} ${PRY * 0.62} 0 0 0 ${PX - PRX} ${PY} Z`, 0, 0, DS.vgrad("#a89970", "#3a3326"), 1);
S.fill(circ(PX, PY + 45, PRX * 0.5, PRY * 0.36), 0, 0, DS.glow("#ffd76a", 0.85), 1);
S.draw(circ(PX, PY, PRX, PRY), 0, 0, { c: DS.P.ink[0], w: 10 });
// tiny Dave on the rim, waving, with his suitcase (thin lines at this scale)
const F = S.fig(PX - 70, PY - PRY + 4, Object.assign({ outfit: "tee" }, DAVE, { s: 0.62, pose: "wave", w: 7 })).draw(0, 0);
F.face(0, "flat", 0); helmet(S, F);
suitcase(S, PX + 50, PY - PRY + 4, 0.3);
S.text("17°C?", 960, 335, { size: 360, c: "#FEFE06", halo: "#111111", haloW: 0.09 });
