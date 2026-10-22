// look: still
// B (old style, Test & Compare partner): cream wall and grey floor band. Big uneasy Dave on the left, sweat drops, three wavy heat lines off his head (a small radiator that runs on eggs);
// on the right the fridge scoreboard with one column, PROTEIN, and a red 300 / 300.
// @include helpers.js
const S = scene(0, 1, { cam: "none" });
S.bg("flat", { sky: "#f3e6cf", ground: "#b9b4aa", hy: 930 });
const B = scoreb(S, 1330, 630, 1.95, { val: 300, t: 0, numC: "#e5383b", sub: "/ 300 g" });
const F = dave(S, 400, 1500, "near", { s: 3.4, mood: "worried", look: 10, breathe: false });
const [hx, hy] = F.hd, R = F.r;
sweatAt(S, hx + R * 1.1, hy - R * 0.4, 0, 2.4); sweatAt(S, hx - R * 1.15, hy - R * 0.1, 0, 2.0);
heat(S, hx - 70, hy - R - 20, 3, undefined, { gap: 70 });
S.text("TOO MUCH?", 1240, 215, { size: 190, c: "#ffffff", halo: "#111111", haloW: 0.09 });
