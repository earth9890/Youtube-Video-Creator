// look: still
// A (floor-raiser, archetype A): big-head Dave, uneasy, holding out a stiff handshake at a giant pair of red cartoon lips with green bacteria hopping off them.
// Wrongness: a kiss coming at you with a crowd on board. Text = the hook's planted number as a question (not the title).
// @include kit.js
const S = scene(0, 1, { cam: "none" });
S.fill(rect(-200, -200, 2320, 1480), 0, 0, "#74C8ED", 1);
S.fill(rect(-200, 790, 2320, 600), 0, 0, "#6C5D4C", 1);
S.fill(rect(-200, 790, 2320, 18), 0, 0, "#4f4236", 1);
// the lips + bacteria
const L = S.grp(); lips(S, 1400, 560, 5.0, { parent: L }); L.setAttribute("transform", "rotate(-8 1400 560)");
[[1060, 430, 2.2], [1130, 700, 1.9], [1700, 380, 2.0], [1760, 690, 2.3], [1420, 300, 1.7], [1440, 830, 1.9]].forEach(([x, y, k]) => { S.draw(rays(x, y, 36 * k, 48 * k, 12, 0.2), 0, 0, { c: "#2c7536", w: 7 }); bug(S, x, y, k); });
// Dave: big-head crop, leaning back, stiff handshake
const F = who(S, 470, 1890, "near", { s: 4.3, hair: "side", hairC: "#5a3825", outfitC: "#2f6fd6", mood: "worried", look: 9, armR: [[34, 8], [66, 4]], breathe: false });
const [hx, hy] = F.hand("R"), P = S.grp(); palm(S, hx + 40, hy, 1.7, { parent: P, sleeve: "blue" }); P.setAttribute("transform", `rotate(90 ${hx + 40} ${hy})`);
F.gi.setAttribute("transform", "rotate(-5 470 1890)");
S.text("80 MILLION?", 960, 215, { size: 200, c: "#FEFE06", halo: "#111111", haloW: 0.09 });
