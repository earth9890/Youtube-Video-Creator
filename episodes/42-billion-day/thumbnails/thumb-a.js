// look: still
// A (clickbait scene, ★ mode): inside the 24-hour supermarket at night. Huge terrified Dave, hand on his head, glowing phone in the other hand;
// an overflowing trolley of cash bundles with notes mid-air beside him; behind: a wall clock at 11:59 and a small grumpy car dealer holding up one form.
// Wrongness: a clock one tick from midnight, and a billion with nowhere to go. Text asks the stakes (not the title). Nothing flashes; neat bundles, no burning money.
// @include helpers.js
const S = scene(0, 1, { cam: "none" });
// dark windows along the top (night outside), cream wall, two shelf boards with a few big boxes, tiled floor
S.fill(rect(-200, -200, 2320, 1480), 0, 0, "#f3e2c4", 1);
S.fill(rect(-200, -200, 2320, 520), 0, 0, "#25335c", 1);
[[1560, 120], [1700, 230], [1810, 90], [80, 100], [200, 250], [330, 140]].forEach(([x, y]) => S.fill(circ(x, y, 6), 0, 0, "#ffffff", 0.85));
S.fill(circ(1740, 150, 44), 0, 0, "#fbf0dc", 1);
S.fill(rect(-200, 300, 2320, 24), 0, 0, "#1d1b1f", 1);
for (const x of [0, 640, 1280, 1920]) S.fill(rect(x - 9, -200, 18, 500), 0, 0, "#f3e2c4", 1);
S.fill(rect(-200, 790, 2320, 400), 0, 0, "#d9c9a8", 1);
for (let i = -2; i < 10; i++) S.draw(`M${i * 300} 1090 L${960 + (i - 3.5) * 100} 790`, 0, 0, { c: "#b9a780", w: 3 });
const shelfBoxes = (y0, cols) => { let x = -20; for (let i = 0; x < 1920; i++) { const w = 120 + ((i * 37) % 70), h = 110 + ((i * 23) % 50); S.draw(rrect(x, y0 - h, w, h, 6), 0, 0, { c: "#1d1b1f", w: 5, fill: cols[i % cols.length] }); x += w + 12; } };
S.fill(rect(-200, 600, 2320, 16), 0, 0, "#9c6f48", 1); shelfBoxes(600, ["#ff8c1a", "#fbf0dc", "#ffb466", "#ffcf33"]);
S.fill(rect(480, 18, 1000, 18), 0, 0, "#ffffff", 1);
// the wrongness: wall clock at 11:59
const cx = 1110, cy = 480, cr = 180;
S.draw(circ(cx, cy, cr), 0, 0, { c: "#1d1b1f", w: 10, fill: "#ffffff" });
S.draw(rays(cx, cy, cr * 0.8, cr * 0.93, 12, -Math.PI / 2), 0, 0, { c: "#1d1b1f", w: 7 });
S.draw(`M${cx} ${cy} L${cx - 14} ${cy - cr * 0.52}`, 0, 0, { c: "#1d1b1f", w: 13 });
S.draw(`M${cx} ${cy} L${cx - 9} ${cy - cr * 0.78}`, 0, 0, { c: "#e5383b", w: 9 });
S.fill(circ(cx, cy, 11), 0, 0, "#1d1b1f", 1);
S.text("11:59", cx + 80, cy + cr + 95, { size: 110, c: "#e5383b", halo: "#ffffff", haloW: 0.16 });
// the trolley with an overflowing cash pile, notes mid-air, and a dashed outline where a corner is already gone
trolley(S, 1700, 1030, 2.0);
[[1560, 590], [1700, 590], [1840, 590], [1630, 530], [1770, 530], [1700, 470]].forEach(([x, y], i) => bundle(S, x, y, 0.9, {}));
[[1520, 400, -22], [1660, 350, 14], [1820, 410, 28], [1880, 520, -12]].forEach(([x, y, a]) => { const n = note(S, x, y, 0.62, {}); n.setAttribute("transform", `rotate(${a} ${x} ${y})`); });
dash(S.draw(`M1820 520 H1880 V590 H1830`, 0, 0, { c: "#9c6f48", w: 7 }), 16, 14);
// small grumpy dealer behind the trolley, one form held up
const D = who(S, 1850, 905, "mid", Object.assign({}, DEALER, { s: 1.15, look: -8, pose: "point" }));
form(S, 1850, 500, 0.3, {});
// Dave: huge, terrified, hand on head, phone in the other hand
const F = dave(S, 430, 1890, "near", { s: 4.3, mood: "wow", look: 6, breathe: false, armL: [[-58, -12], [-34, -64]], armR: [[44, 6], [86, 38]] });
const [hx, hy] = F.hand("R");
mphone(S, hx + 14, hy - 110, 0.74, { screen: "green", tone: 0 });
S.draw(circ(hx + 14, hy - 100, 52), 0, 0, { c: "#1d1b1f", w: 7, fill: "#f2b84b" }); S.draw(circ(hx + 14, hy - 100, 38), 0, 0, { c: "#c98e1c", w: 4 });
S.text("BY MIDNIGHT?", 960, 245, { size: 200, c: "#FEFE06", halo: "#111111", haloW: 0.09 });
