// look: still
// A (clickbait scene mode): a garden at golden hour seen at ant height. Huge shocked Dave in front, both hands pushing at a giant clear raindrop that has swallowed his whole face
// (outline bubble: face stays visible). More drops fall above him, one splashes on a leaf. A calm black ant behind carries a grain of rice over her head. Wrongness: one drop holding a grown man prisoner.
// @include helpers.js
const S = scene(0, 1, { cam: "none" });
DS.outdoor(S, { hy: 560, sky: "dusk", sun: [1380, 500], hills: "grass", ground: "grass" });
S.fill(rect(-200, 560, 2320, 520), 0, 0, DS.glow("#ffd23f", 0.5), 1);
// soil band along the bottom quarter, with the tuft line above it
S.draw(`M-100 830 Q400 800 900 826 Q1400 850 2000 816 V1100 H-100 Z`, 0, 0, { fill: "#996D40", c: "#1d1b1f", w: 9 });
// grass blades like tall trees on both sides
[[1420, 830, 1380, 250, 120], [1560, 830, 1630, 330, 110], [1760, 830, 1720, 180, 140], [1880, 830, 1950, 400, 100], [1300, 830, 1290, 470, 90]].forEach(([x, y, tx, ty, w], i) => DS.shape(S, `M${x - w / 2} ${y} Q${x - w / 4 + (tx - x) * 0.3} ${(y + ty) / 2} ${tx} ${ty} Q${x + w / 4 + (tx - x) * 0.4} ${(y + ty) / 2 + 40} ${x + w / 2} ${y} Z`, "green", { flat: true, tone: i % 2 ? 2 : 0, w: "near" }));
// a leaf with a splash, front right
leaf(S, 1520, 850, 700, { rot: -4 }); dome(S, 1650, 810, 90, 60, {});
[[1580, 770], [1730, 740]].forEach(([x, y]) => S.fill(circ(x, y, 9), 0, 0, DS.c("sky", 0), 1));
// falling drops above
[[1130, 340, 1.5], [1640, 180, 1.4], [1330, 470, 1.2]].forEach(([x, y, k]) => tear(S, x, y, k, {}));
// the ant, calm, carrying rice
const A = ant(S, 1500, 905, 1.9, { face: "smile", look: -3, dir: -1 }); rice(S, A.XA(20), A.YA(-132), 1.5, { rot: -8 });
// Dave, huge, both hands up at the bubble
const F = dave(S, 560, 1890, "near", { s: 4.2, mood: "wow", look: 0, pose: "head", breathe: false });
const [hx, hy] = F.hd, R = F.r;
S.draw(circ(hx, hy, R * 1.5), 0, 0, { c: "#2f6fd6", w: 26 });
S.draw(circ(hx, hy, R * 1.42), 0, 0, { c: "#a9dcf5", w: 14 });
S.draw(`M${hx - R * 1.05} ${hy - R * 0.5} Q${hx - R * 0.95} ${hy - R * 1.05} ${hx - R * 0.3} ${hy - R * 1.3}`, 0, 0, { c: "#ffffff", w: 28 });
S.draw(`M${hx + R * 0.6} ${hy + R * 1.1} Q${hx + R * 1.0} ${hy + R * 0.8} ${hx + R * 1.2} ${hy + R * 0.4}`, 0, 0, { c: "#ffffff", w: 16 });
[[hx + R * 0.9, hy - R * 1.6, 26], [hx + R * 0.35, hy - R * 1.9, 16], [hx - R * 0.9, hy + R * 1.5, 20]].forEach(([x, y, r]) => S.draw(circ(x, y, r), 0, 0, { fill: "#d6f0fc", c: "#2f6fd6", w: 8 }));
[[hx + R * 1.0, hy - R * 0.2], [hx - R * 1.05, hy + R * 0.1]].forEach(([x, y]) => S.fill(circ(x, y, R * 0.12), 0, 0, "#f28ca0", 0.9));
DS.vignette(S, 0.22);
S.text("1 DROP?", 960, 215, { size: 210, c: "#FEFE06", halo: "#111111", haloW: 0.09 });
