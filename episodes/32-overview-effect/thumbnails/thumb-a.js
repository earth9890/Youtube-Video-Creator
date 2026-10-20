// look: still
// A (floor-raiser, archetype A on space black): big-head Dave, uneasy side-eye at a glowing Earth that wears a red $450,000 price tag; he holds his SPACE FUND jar.
// Wrongness: a price tag on the planet. Text turns the sales pitch's "only" into a question (not the title).
// @include kit.js
const S = scene(0, 1, { cam: "none" });
S.fill(rect(-200, -200, 2320, 1480), 0, 0, "#05031A", 1);
for (let i = 0; i < 60; i++) { const x = (i * 733 + 151) % 1900, y = (i * 397 + 67) % 1060; if (x > 1050 || y > 260) S.fill(circ(x, y, 2 + (i % 3)), 0, 0, "#ffffff", 0.4 + (i % 5) * 0.1); }
S.fill(circ(1450, 560, 560), 0, 0, DS.glow("#30B0E9", 0.5), 1);
earth(S, 1450, 560, 330);
// price tag on a string from the planet
const g = S.grp();
S.draw(smooth([[1730, 700], [1720, 760], [1680, 790]]), 0, 0, { c: "#ffffff", w: 7, parent: g });
S.draw("M1160 830 L1220 760 H1710 V900 H1220 Z", 0, 0, { c: "#111111", w: 9, fill: "#D93A45", parent: g });
S.draw(circ(1208, 830, 14), 0, 0, { c: "#111111", w: 7, fill: "#05031A", parent: g });
S.text("$450,000", 1470, 866, { size: 96, c: "#ffffff", parent: g });
g.setAttribute("transform", "rotate(-7 1400 830)");
// Dave: big-head crop, white limbs on black, jar in hand
const F = who(S, 470, 1890, "near", { s: 4.3, c: "#ffffff", hair: "side", hairC: "#5a3825", outfitC: "#2f6fd6", mood: "worried", look: 9, armR: [[30, 10], [53, 15]], breathe: false });
const [hx, hy] = F.hand("R"); jar(S, hx + 20, hy + 130, 1.6, { coins: 3 });
S.text("ONLY FROM SPACE?", 960, 205, { size: 180, c: "#FEFE06", halo: "#111111", haloW: 0.09 });
