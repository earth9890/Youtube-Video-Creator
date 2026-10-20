// look: still
// C (clickbait scene mode, 2026-10-20): the script's line made literal, "it's fear wearing a nicer jacket": a furry monster in
// a blazer and tie with a "HIGH STANDARDS" name badge leans in behind terrified Dave, claw on his shoulder. Text "FEAR?".
const S = scene(0, 1, { cam: "none" });
S.bg("flat", { sky: "#dc9a62", ground: "#9a6240", hy: 960 });
S.fill(circ(520, 420, 520, 380), 0, 0, "#ffe7ad", 0.3); // desk-lamp glow
// the monster (fear)
const mx = 1390;
const fur = []; for (let i = 0; i <= 40; i++) { const a = Math.PI + (i / 40) * Math.PI, rr = i % 2 ? 1 : 1.07; fur.push([mx + Math.cos(a) * 300 * rr, 640 + Math.sin(a) * 330 * rr]); }
S.draw(poly([[mx - 300, 1120], ...fur, [mx + 300, 1120]], 1) + " Z", 0, 0, { w: 8, fill: "#8e5bb5" });
[[-1], [1]].forEach(([sd]) => S.draw(`M${mx + sd * 150} 360 L${mx + sd * 210} 230 L${mx + sd * 230} 380 Z`, 0, 0, { w: 7, fill: "#f6e7c4" }));
[-1, 1].forEach((sd) => { S.draw(circ(mx + sd * 85, 470, 62, 70), 0, 0, { w: 7, fill: "#ffffff" }); S.fill(circ(mx + sd * 85 - 30, 488, 26), 0, 0, "#1d1b1f", 1); });
S.draw(`M${mx - 160} 372 L${mx - 40} 402 M${mx + 160} 372 L${mx + 40} 402`, 0, 0, { w: 12 }); // sly brows
S.draw(`M${mx - 150} 590 Q${mx} 700 ${mx + 150} 590 Q${mx} 620 ${mx - 150} 590 Z`, 0, 0, { w: 7, fill: "#8c2f39" });
let teeth = ""; for (let i = 0; i < 6; i++) { const x = mx - 125 + i * 50; teeth += `M${x} ${600 + Math.abs(i - 2.5) * -4} l20 34 l20 -34 Z `; }
S.draw(teeth, 0, 0, { w: 4, fill: "#ffffff" });
// the nicer jacket: blazer, shirt, tie
S.draw(`M${mx - 300} 1120 L${mx - 300} 820 Q${mx - 290} 740 ${mx - 170} 720 L${mx} 960 L${mx + 170} 720 Q${mx + 290} 740 ${mx + 300} 820 L${mx + 300} 1120 Z`, 0, 0, { w: 8, fill: "#2f4a86" });
S.draw(`M${mx - 170} 720 L${mx} 960 L${mx + 170} 720 Z`, 0, 0, { w: 6, fill: "#ffffff" });
S.draw(`M${mx - 26} 730 L${mx + 26} 730 L${mx + 14} 760 L${mx + 34} 900 L${mx} 950 L${mx - 34} 900 L${mx - 14} 760 Z`, 0, 0, { w: 6, fill: "#e5383b" });
S.draw(`M${mx - 170} 720 L${mx - 130} 820 L${mx - 90} 800 M${mx + 170} 720 L${mx + 130} 820 L${mx + 90} 800`, 0, 0, { w: 7 });
// name badge
S.draw(rrect(mx + 70, 830, 230, 130, 14), 0, 0, { w: 6, fill: "#ffffff" });
S.draw(rrect(mx + 70, 830, 230, 40, 14), 0, 0, { w: 6, fill: "#e5383b" });
S.text("HIGH", mx + 185, 905, { size: 38, c: "#1d1b1f" }); S.text("STANDARDS", mx + 185, 945, { size: 34, c: "#1d1b1f" });
// terrified Dave
const F = S.fig(470, 1900, { s: 4.2, hair: "side", hairC: "#5a3825", outfit: "tee", outfitC: "#2f6fd6" }).instant(0);
F.face(0, "wow", 4);
S.drop(220, 520, 2.4, 0); S.drop(720, 470, 1.8, 0);
// the jacket sleeve reaches over; claw on Dave's shoulder
S.draw(`M${mx - 250} 800 Q960 760 640 880`, 0, 0, { w: 92, c: "#1d1b1f" });
S.draw(`M${mx - 250} 800 Q960 760 640 880`, 0, 0, { w: 74, c: "#2f4a86" });
S.draw(circ(620, 900, 58, 50), 0, 0, { w: 7, fill: "#8e5bb5" });
[[-40, 0], [0, 10], [40, 0]].forEach(([dx, dy]) => S.draw(`M${600 + dx} ${930 + dy} l-8 46 l26 -40`, 0, 0, { w: 6, fill: "#f6e7c4" }));
S.text("FEAR?", 960, 210, { size: 220, c: "#FEFE06", halo: "#111111", haloW: 0.09 });
