// look: still
// B (old style, test partner): flat saturated field. Big calm Dave on the left has peeled the "10%" sticker off a dial; "PRACTICE" is printed underneath.
// Wrongness: the sticker was hiding a word. Text asks the question in white.
// @include helpers.js
const S = scene(0, 1, { cam: "none" });
S.fill(rect(-200, -200, 2320, 1480), 0, 0, "#74C8ED", 1);
S.fill(rect(-200, 840, 2320, 400), 0, 0, "#6ABB5C", 1);
const D = dial(S, 1340, 540, 340, { v: 10, sticker: false });
S.text("PRACTICE", 1310, 745, { size: 100, c: "#1d1b1f", font: "caveat" });
// the sticker, peeled off and held out front
const sg = S.grp(); sg.setAttribute("transform", "rotate(-12 1090 880)");
S.draw(rrect(1090, 800, 340, 130, 12), 0, 0, { fill: "#ffcf33", c: "#1d1b1f", w: 9, parent: sg }); S.text("10%", 1260, 898, { size: 110, c: "#1d1b1f", parent: sg });
const F = dave(S, 430, 1890, "near", { s: 4.2, mood: "flat", look: 9, pose: "reach", breathe: false });
S.text("10%?", 560, 225, { size: 250, c: "#ffffff", halo: "#111111", haloW: 0.09 });
