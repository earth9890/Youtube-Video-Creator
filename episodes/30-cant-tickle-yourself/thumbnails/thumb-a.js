// look: still
// A (floor-raiser, archetype A): big-head Dave, deadpan side-eye, tickling his own cheek with a feather; his fist is wired to a big red DELAY box with the dial on 0.2 s.
// Wrongness: a man tickling himself with a dead face, plugged into a box that shouldn't be needed. Text = the hook's planted number as a question (not the title).
// @include kit.js
const S = scene(0, 1, { cam: "none" });
const INKH = "#1d1b1f";
S.fill(rect(-200, -200, 2320, 1480), 0, 0, "#FCA55D", 1);
S.fill(rect(-200, 900, 2320, 600), 0, 0, "#202C36", 1);
// cable: Dave's fist -> the box
S.draw(smooth([[1060, 1060], [1160, 1040], [1240, 950], [1280, 850]]), 0, 0, { c: INKH, w: 16 });
// the delay box
const bx = 1170, by = 330, bw = 640, bh = 520;
S.fill(rrect(bx + 16, by + 24, bw, bh, 44), 0, 0, INKH, 0.25);
S.draw(rrect(bx, by, bw, bh, 44), 0, 0, { fill: "#e5383b", c: INKH, w: 12 });
S.draw(rrect(bx + 50, by + 36, bw - 100, 104, 20), 0, 0, { fill: "#b02225", c: INKH, w: 8 });
S.text("DELAY", bx + bw / 2, by + 118, { size: 84, c: "#ffffff" });
const dx = bx + bw / 2, dy = by + 330, r = 150;
S.draw(circ(dx, dy, r), 0, 0, { fill: "#ffffff", c: INKH, w: 10 });
[-70, -35, 0, 35, 70].forEach((a) => { const q = (a * Math.PI) / 180; S.draw(line([dx + Math.sin(q) * r * 0.72, dy - Math.cos(q) * r * 0.72], [dx + Math.sin(q) * r * 0.9, dy - Math.cos(q) * r * 0.9], 0), 0, 0, { c: INKH, w: 8 }); });
const nq = (12 * Math.PI) / 180; S.draw(line([dx, dy], [dx + Math.sin(nq) * r * 0.86, dy - Math.cos(nq) * r * 0.86], 0), 0, 0, { c: "#b02225", w: 16 });
S.fill(circ(dx, dy, 18), 0, 0, INKH, 1);
// Dave: big-head crop, flat face, eyes sideways to the box
const F = who(S, 470, 1890, "near", { s: 4.3, hair: "side", hairC: "#5a3825", outfitC: "#2f6fd6", mood: "flat", look: 9, breathe: false });
// his fist (blue sleeve from the bottom) holding a feather to his own cheek
const fx = 1010, fy = 1020, g = S.grp(); g.setAttribute("transform", `rotate(-45 ${fx} ${fy})`);
feather(S, [fx - 4, fy - 40], [fx - 6, fy - 505], { vw: 84, parent: g });
S.draw(rrect(fx - 70, fy + 50, 140, 420, 30), 0, 0, { fill: "#2f6fd6", c: INKH, w: 11, parent: g });
S.draw(rrect(fx - 95, fy - 70, 190, 150, 64), 0, 0, { fill: "#ffffff", c: INKH, w: 11, parent: g });
[-40, 0, 40].forEach((d) => S.draw(line([fx + d, fy - 66], [fx + d, fy - 20], 0), 0, 0, { c: INKH, w: 7, parent: g }));
S.draw(rrect(fx - 120, fy - 30, 110, 62, 31), 0, 0, { fill: "#ffffff", c: INKH, w: 11, parent: g });
S.text("0.2 SECONDS?", 990, 210, { size: 190, c: "#FEFE06", halo: "#111111", haloW: 0.09 });
