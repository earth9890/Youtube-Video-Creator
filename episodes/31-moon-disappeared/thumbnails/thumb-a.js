// look: still
// A (floor-raiser, archetype A): big uneasy Dave on the left, one finger still on the night-light switch he has just flipped down to GONE;
// on the right a near-black sky with an empty dashed circle where the full Moon should be. Wrongness: a light switch for the Moon, and the Moon missing.
// Words: JUST A LAMP? (Dave's wrong belief from the hook; asks the question without repeating the title). One accent: amber on the switch plate.
const S = scene(0, 1, { cam: "none" });
S.fill(rect(-200, -200, 2320, 1480), 0, 0, DS.vgrad("#05031A", "#0A0F2A"), 1);
S.fill(rect(-200, 880, 2320, 400), 0, 0, "#0B1A2E", 1);
let sd = 7; const r1 = () => ((sd = (sd * 16807) % 2147483647) - 1) / 2147483646;
for (let i = 0; i < 70; i++) { const x = 1080 + r1() * 840, y = 300 + r1() * 560, r = 2 + r1() * 2.5; S.fill(circ(x, y, r), 0, 0, "#ffffff", 0.4 + r1() * 0.4); }
for (let i = 0; i < 20; i++) { const x = r1() * 1920, y = 260 + r1() * 120, r = 1.5 + r1() * 2; S.fill(circ(x, y, r), 0, 0, "#ffffff", 0.35); }
// the empty place where the Moon was
S.fill(circ(1490, 560, 300), 0, 0, DS.glow("#cfe0ff", 0.12), 1);
const gm = S.draw(circ(1490, 560, 200), 0, 0, { c: "#ffffff", w: 9 }); gm.setAttribute("stroke-dasharray", "0.03 0.02");
// the switch: cream plate, amber edge, toggle flipped down
S.draw(rrect(800, 420, 230, 360, 20), 0, 0, { c: "#F4BC22", w: 7, fill: "#f6ecd2" });
S.draw(rrect(880, 500, 70, 200, 12), 0, 0, { c: "#1d1b1f", w: 4, fill: "#6f757b" });
S.draw(rrect(888, 600, 54, 130, 12), 0, 0, { c: "#1d1b1f", w: 4, fill: "#ffffff" });
// Dave: big head cropped by the bottom edge, worried side-eye at the empty sky, finger on the switch
const F = S.fig(380, 1890, { s: 4.3, hair: "side", hairC: "#5a3825", outfit: "tee", outfitC: "#2f6fd6", c: "#ffffff", armR: [[46, -8], [104, -44]], breathe: false }).instant(0);
F.face(0, "worried", 9);
S.text("JUST A LAMP?", 960, 215, { size: 200, c: "#FFFFFF" });
