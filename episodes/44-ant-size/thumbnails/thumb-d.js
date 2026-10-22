// look: still
// D (the minimal symbol): one giant friendly ant face rising from the bottom of a flat bold-green field, eyes rolled up at a tiny Dave standing on her head. Words: 5 MM?
// The ant is the episode's worker ant ("kid"): black, shiny, big white eyes, pink cheeks and bow, bobbly antennae; drawn front-on here (ant() is a side view).
// @include helpers.js
const S = scene(0, 1, { cam: "none" });
S.fill(rect(-200, -200, 2320, 1480), 0, 0, "#33B249", 1);
const INKC = DS.P.ink[0], hx = 960, hy = 960, rx = 580, ry = 480, ht = hy - ry;
// antennae: elbowed, thick, with bobbles
[-1, 1].forEach((sd) => {
  const p = [[hx + sd * 150, ht + 50], [hx + sd * 290, ht - 140], [hx + sd * 600, ht - 170]];
  S.draw(smooth(p), 0, 0, { c: INKC, w: 32 });
  S.draw(circ(p[2][0], p[2][1], 36), 0, 0, { fill: INKC, c: INKC, w: 6 });
});
// head, shine, bow
DS.shape(S, circ(hx, hy, rx, ry), "ink", { w: "near" });
S.draw(`M${hx - rx * 0.78} ${hy - ry * 0.42} Q${hx - rx * 0.6} ${hy - ry * 0.82} ${hx - rx * 0.22} ${hy - ry * 0.9}`, 0, 0, { c: DS.P.white[0], w: 34, op: 0.4 });
const bx = hx + rx * 0.5, by = ht + ry * 0.2;
[-1, 1].forEach((sd) => S.draw(`M${bx} ${by} Q${bx + sd * 80} ${by - 70} ${bx + sd * 86} ${by + 6} Q${bx + sd * 40} ${by + 22} ${bx} ${by} Z`, 0, 0, { fill: DS.c("pink", 0), c: INKC, w: 8 }));
S.draw(circ(bx, by, 17), 0, 0, { fill: DS.c("pink", 2), c: INKC, w: 8 });
// eyes rolled up at Dave, a touch cross-eyed
[-1, 1].forEach((sd) => {
  const ex = hx + sd * 215, ey = hy - 130;
  S.draw(circ(ex, ey, 118), 0, 0, { fill: DS.P.white[0], c: DS.P.white[2], w: 6 });
  S.draw(circ(ex - sd * 22, ey - 44, 64), 0, 0, { fill: INKC, c: INKC, w: 4 });
  S.fill(circ(ex - sd * 22 + 22, ey - 66, 20), 0, 0, DS.P.white[0], 1);
  S.fill(circ(hx + sd * 380, hy + 20, 66, 44), 0, 0, DS.c("pink", 0), 0.85);
});
S.draw(`M${hx - 90} ${hy + 30} Q${hx} ${hy + 110} ${hx + 90} ${hy + 30}`, 0, 0, { c: DS.c("pink", 1), w: 18 });
// tiny Dave on her head
dave(S, hx - 40, ht + 8, "near", { s: 0.6, mood: "smile", look: 0, pose: "hips", breathe: false });
S.text("5 MM?", 960, 290, { size: 340, c: "#FEFE06", halo: "#111111", haloW: 0.095 });
