// look: still
// A (floor-raiser, archetype A): big-head Dave, eyes far too wide, side-eye at his scoreboard: an open eye over 264, a tangerine in hand at the bottom edge.
// Wrongness: a man who has been awake for eleven days, and the board proves it. Text = a question about the stakes (not the title).
// @include kit.js
const S = scene(0, 1, { cam: "none" });
S.fill(rect(-200, -200, 2320, 1480), 0, 0, "#202C36", 1);
S.fill(rect(-200, 860, 2320, 600), 0, 0, "#141B23", 1);
// the scoreboard (right half)
S.draw(rrect(1010, 300, 820, 560, 40), 0, 0, { c: "#000000", w: 12, fill: "#6f757b" });
[1060, 1780].forEach((x) => S.draw(circ(x, 350, 18), 0, 0, { c: "#000000", w: 6, fill: "#ffcf33" }));
S.draw("M1330 358 Q1420 300 1510 358 Q1420 416 1330 358 Z", 0, 0, { c: "#000000", w: 7, fill: "#ffffff" }); S.draw(circ(1420, 358, 22), 0, 0, { c: "#000000", w: 4, fill: "#1d1b1f" }); // an open eye = hours awake (keeps the tile to 3 words)
S.draw(rrect(1050, 410, 740, 410, 28), 0, 0, { c: "#000000", w: 8, fill: "#1d1b1f" });
S.text("264", 1420, 720, { size: 330, c: "#ff4a4d" });
// Dave: big-head crop, wide eyes, side-eye toward the board, sweat drop, tangerine low in his hand
const F = who(S, 470, 1890, "near", { s: 4.3, hair: "side", hairC: "#5a3825", outfitC: "#2f6fd6", mood: "wow", look: 9, armR: [[44, 34], [104, 44]], breathe: false });
const [hx, hy] = F.hand("R"); tangerine(S, hx + 30, hy - 30, 95, 0);
S.draw(smooth([[800, 400], [776, 450], [780, 474], [800, 486], [820, 474], [824, 450], [800, 400]]), 0, 0, { c: "#1f4fa3", w: 6, fill: "#a9dcf5" });
S.text("11 DAYS?", 960, 230, { size: 220, c: "#FEFE06", halo: "#111111", haloW: 0.09 });
