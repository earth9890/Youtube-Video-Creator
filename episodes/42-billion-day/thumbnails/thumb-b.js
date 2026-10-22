// look: still
// B (old style, test partner): flat warm-ochre field. Big uneasy Dave on the left with a small empty backpack; on the right one strange object,
// a cash stack taller than the frame (cut off at the top) with a tiny elephant at its base for scale. Text: 10 TONNES? Red only as the arrow.
// @include helpers.js
const S = scene(0, 1, { cam: "none" });
S.fill(rect(-200, -200, 2320, 1480), 0, 0, "#F2A93B", 1);
S.fill(rect(-200, 960, 2320, 200), 0, 0, "#D98A22", 1);
// the stack: taller than the frame
S.draw(rect(1370, -200, 340, 1160), 0, 0, { c: "#1d1b1f", w: 9, fill: DS.vgrad("#6fc078", "#2c7536") });
let d = ""; for (let y = 940; y > -190; y -= 62) d += `M1370 ${y} H1710 `; S.draw(d, 0, 0, { c: "#2c7536", w: 5 });
S.draw(rect(1510, -200, 60, 1160), 0, 0, { c: "#1d1b1f", w: 6, fill: "#fbf7ef" });
elephant(S, 1190, 985, 0.36, {});
// Dave with a small empty backpack on the ground
const F = dave(S, 380, 1890, "near", { s: 3.7, mood: "worried", look: 9, breathe: false });
backpack(S, 760, 985, 1.9, 0.5, {});
S.draw("M880 790 C 980 700, 1100 700, 1330 760", 0, 0, { c: "#e5383b", w: 14 });
S.draw(arrowHead(1330, 760, 0.5, 46), 0, 0, { c: "#e5383b", w: 14 });
S.text("10 TONNES?", 900, 245, { size: 210, c: "#ffffff", halo: "#111111", haloW: 0.12 });
