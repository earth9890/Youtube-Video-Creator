// look: v3
// B (lottery ticket): one symbol on near-black, no words. An old light bulb glowing amber; where the filament should be, one open eye looks at the viewer.
// Wrongness in 3 words: the bulb watches. (The episode's two halves: the lighting tests + being watched.)
const S = scene(0, 1, { cam: "none" });
S.bg("flat", { sky: "#05031A", ground: "#05031A", hy: 1080 });
const cx = 960, cy = 470, r = 250;
const rg = el("radialGradient", { id: "glowB" }, defs); el("stop", { offset: 0.55, "stop-color": "#F4BC22", "stop-opacity": 0.6 }, rg); el("stop", { offset: 1, "stop-color": "#F4BC22", "stop-opacity": 0 }, rg);
S.fill(circ(cx, cy, 400), 0, 0.1, "url(#glowB)", 1);
// glass: round bulb narrowing into the neck
S.draw(`M${cx - 105} ${cy + 290} C${cx - 110} ${cy + 220} ${cx - r} ${cy + 140} ${cx - r} ${cy} C${cx - r} ${cy - 150} ${cx - 140} ${cy - r} ${cx} ${cy - r} C${cx + 140} ${cy - r} ${cx + r} ${cy - 150} ${cx + r} ${cy} C${cx + r} ${cy + 140} ${cx + 110} ${cy + 220} ${cx + 105} ${cy + 290} Z`, 0, 0.1, { w: 12, c: "#111111", fill: "#FFE38A" });
S.fill(circ(cx - 120, cy - 120, 60, 36), 0, 0.1, "#ffffff", 0.55);
// screw base
S.draw(rrect(cx - 115, cy + 285, 230, 150, 18), 0, 0.1, { w: 10, fill: "#9aa0a6" });
[cy + 325, cy + 365, cy + 405].forEach((y) => S.draw(line([cx - 112, y], [cx + 112, y - 10], 0), 0, 0.1, { w: 8, c: "#6f757b" }));
S.draw(rrect(cx - 50, cy + 430, 100, 40, 14), 0, 0.1, { w: 10, fill: "#1d1b1f" });
// the eye where the filament should be
const er = 104;
S.draw(`M${cx - er * 1.6} ${cy} Q${cx} ${cy - er * 1.4} ${cx + er * 1.6} ${cy} Q${cx} ${cy + er * 1.4} ${cx - er * 1.6} ${cy} Z`, 0, 0.1, { w: 12, c: "#111111", fill: "#ffffff" });
S.draw(circ(cx, cy, er * 0.62), 0, 0.1, { w: 8, c: "#111111", fill: "#7a5236" });
S.fill(circ(cx, cy, er * 0.32), 0, 0.1, "#111111", 1);
S.fill(circ(cx - er * 0.18, cy - er * 0.2, er * 0.12), 0, 0.1, "#ffffff", 1);
// two filament wires leading down into the neck
S.draw(line([cx - 40, cy + 120], [cx - 30, cy + 285], 0) + " " + line([cx + 40, cy + 120], [cx + 30, cy + 285], 0), 0, 0.1, { w: 7, c: "#6f757b" });
