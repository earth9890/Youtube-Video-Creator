// theme: dark
// Thumbnail A — pain moment: "CAN'T FOCUS." hero tired at a desk over a book, phone buzzing beside him
const S = scene(0, 1, { cam: "none" });
S.text("CAN'T", 600, 400, { size: 260 });
S.text("FOCUS.", 600, 740, { size: 320, c: RED });
const D = S.desk(1160, 960, 680, 0, 0.3);
const F = S.fig(1230, 960 - 125, { s: 1.6, sit: true, pose: "head" }).draw(0, 0.4);
F.face(0.4, "tired", 0);
S.book(1500, 700, 0.55, 0, 0.3);
S.phone(1760, 652, 1.3, 0, 0.3, { screen: "blank" });
// ponytail: engine bolt is YEL-filled; local red copy keeps the single accent
const bolt = (cx, cy, s) => S.draw(poly([[cx + 20 * s, cy - 70 * s], [cx - 25 * s, cy + 5 * s], [cx + 8 * s, cy + 5 * s], [cx - 18 * s, cy + 75 * s], [cx + 32 * s, cy - 10 * s], [cx, cy - 10 * s], [cx + 20 * s, cy - 70 * s]], 1), 0.1, 0.3, { w: 5, fill: RED, c: RED });
bolt(1690, 470, 1.0);
[[1808, 560], [1808, 610], [1808, 660], [1808, 710]].forEach(([x, y]) => S.draw(circ(x, y, 17), 0.2, 0.1, { c: RED, fill: RED, w: 4 }));
