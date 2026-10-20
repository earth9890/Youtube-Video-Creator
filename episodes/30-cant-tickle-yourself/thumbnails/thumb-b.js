// look: still
// B (lottery ticket, archetype H, literal idiom): near-black; one big white hand, palm to us, a blue feather lying across the palm; a red rubber stamp across the fingers: CANCELLED.
// The twist ("your brain is constantly cancelling you out of your own life") drawn literally; the title supplies the question. One word, one red mark.
// @include kit.js
const S = scene(0, 1, { cam: "none" });
S.fill(rect(-200, -200, 2320, 1480), 0, 0, "#05031A", 1);
for (let i = 0; i < 46; i++) { const x = (i * 733 + 151) % 1900, y = (i * 397 + 67) % 1060; if (x > 1420 || x < 260) S.fill(circ(x, y, 2 + (i % 3)), 0, 0, "#ffffff", 0.3 + (i % 4) * 0.1); }
hand2(S, 820, 1250, 6, 2.9, { palm: true, sleeve: "navy", mirror: -1 });
feather(S, [520, 1060], [1180, 760], { vw: 70, name: "sky" });
const cx = 860, cy = 560, g = S.grp(); g.setAttribute("transform", `rotate(-10 ${cx} ${cy})`);
S.fill(rrect(cx - 530, cy - 125, 1060, 250, 30), 0, 0, "#05031A", 0.55, g);
S.draw(rrect(cx - 530, cy - 125, 1060, 250, 30), 0, 0, { c: "#E01E1E", w: 22, parent: g });
S.text("CANCELLED", cx, cy + 58, { size: 170, c: "#E01E1E", parent: g });
