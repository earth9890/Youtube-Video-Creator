// look: still
// D (minimal symbol): one giant clock at 11:59 on flat deep green; beside it a stack of generic notes taller than the frame, tiny Dave at its foot for scale.
// Words: the day he gets. Nothing flashes.
// @include helpers.js
const S = scene(0, 1, { cam: "none" });
S.fill(rect(-200, -200, 2320, 1480), 0, 0, "#0f4a2a", 1);
S.fill(rect(-200, 1010, 2320, 300), 0, 0, "#0a3820", 1);
// the stack: taller than the frame, notes seen edge-on with a paper band
const x0 = 1440, x1 = 1760;
S.draw(rect(x0, -200, x1 - x0, 1215), 0, 0, { c: "#111111", w: 10, fill: "#5fbf6e" });
let d = ""; for (let y = 955; y > -190; y -= 58) d += `M${x0} ${y} H${x1} `; S.draw(d, 0, 0, { c: "#2c7536", w: 5 });
S.draw(rect(1570, -200, 60, 1215), 0, 0, { c: "#111111", w: 6, fill: "#fbf7ef" });
// a few notes slipping off it: these say "cash" at feed size
[[1600, 990, -8, 0.8], [1330, 470, 24, 0.75]].forEach(([x, y, a, k]) => note(S, x, y, k, {}).setAttribute("transform", `rotate(${a} ${x} ${y})`));
// tiny Dave at its foot, looking up
dave(S, 1300, 1010, "near", { s: 0.95, mood: "worried", look: 6, breathe: false });
// the clock: 11:59
const cx = 760, cy = 680, cr = 370;
S.draw(circ(cx, cy, cr), 0, 0, { c: "#111111", w: 22, fill: "#ffffff" });
S.draw(rays(cx, cy, cr * 0.8, cr * 0.92, 12, -Math.PI / 2), 0, 0, { c: "#111111", w: 14 });
S.draw(`M${cx} ${cy} L${cx - 28} ${cy - cr * 0.78}`, 0, 0, { c: "#e5383b", w: 20 });
S.draw(`M${cx} ${cy} L${cx - 4} ${cy - cr * 0.5}`, 0, 0, { c: "#111111", w: 30 });
S.fill(circ(cx, cy, 24), 0, 0, "#111111", 1);
S.text("24 HRS?", 960, 300, { size: 370, c: "#FEFE06", halo: "#111111", haloW: 0.09 });
