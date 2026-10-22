// look: still
// D (the minimal symbol): one gigantic egg standing on black, x48 printed across it; tiny white-lined Dave at its foot, hands on his head, looking up.
// @library auto
// @include helpers.js
const S = scene(0, 1, { cam: "none" });
S.bg("flat", { sky: "#0b0b0e", ground: "#0b0b0e", hy: 1100 });
S.fill(circ(960, 990, 520, 60), 0, 0, DS.glow("#4a4136", 0.9), 1); // a pool of light under it
// the egg: narrow top, wide bottom (x = W/2 sin p (1 - 0.13 cos p)), cream with a soft top-left light
const ex = 960, ey = 560, EW = 760, EH = 860, ep = [];
for (let i = 0; i < 120; i++) { const p = (i / 120) * Math.PI * 2; ep.push([ex + (EW / 2) * Math.sin(p) * (1 - 0.13 * Math.cos(p)), ey - (EH / 2) * Math.cos(p)]); }
const eg = el("radialGradient", { id: "ep39-egg", gradientUnits: "userSpaceOnUse", cx: ex - 140, cy: ey - 220, r: 720 }, dsDefs());
[[0, "#fffdf6"], [0.55, "#f8ebcf"], [1, "#d9bf8f"]].forEach(([o, c]) => el("stop", { offset: o, "stop-color": c }, eg));
S.fill("M" + ep.map((q) => q[0].toFixed(1) + " " + q[1].toFixed(1)).join(" L") + " Z", 0, 0, "url(#ep39-egg)", 1);
S.draw(`M${ex - 250} ${ey - 120} Q${ex - 240} ${ey - 300} ${ex - 120} ${ey - 380}`, 0, 0, { c: "#ffffff", w: 28, op: 0.7 });
S.text("×48", 960, 720, { size: 340, c: "#111111" });
const F = dave(S, 1480, 995, "near", { s: 0.9, mood: "worried", look: -10, pose: "head", breathe: false, c: "#ffffff" });
