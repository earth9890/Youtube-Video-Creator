// look: v3
// B (lottery ticket): the word LAZY being scrubbed off a dark board by a yellow sponge; the Y is already half wiped away, with suds and a sparkle.
const S = scene(0, 1, { cam: "none" });
S.bg("flat", { sky: "#05031A", ground: "#05031A", hy: 1080 });
S.text("LAZ", 760, 660, { size: 380, c: "#ffffff" });
S.text("Y", 1250, 660, { size: 380, c: "#3a4a6e" });
[[1180, 330, 30], [1290, 280, 20], [1400, 340, 26], [1120, 420, 16], [1470, 270, 14], [1360, 420, 18]].forEach(([x, y, r]) => S.draw(circ(x, y, r), 0, 0.1, { w: 6, c: "#d6f0fc", fill: "#2f4a86" }));
S.draw(rrect(1140, 520, 440, 250, 40), 0, 0.1, { w: 12, fill: "#ffcf33" });
S.draw(rrect(1140, 710, 440, 60, 30), 0, 0.1, { w: 10, fill: "#3f9e4a" });
[[1220, 600, 18], [1330, 650, 14], [1460, 590, 20], [1400, 690, 12], [1270, 680, 10]].forEach(([x, y, r]) => S.draw(circ(x, y, r), 0, 0.1, { w: 5, fill: "#e0a800" }));
const star = (cx, cy, k) => S.draw(poly([[cx, cy - 60 * k], [cx + 14 * k, cy - 14 * k], [cx + 60 * k, cy], [cx + 14 * k, cy + 14 * k], [cx, cy + 60 * k], [cx - 14 * k, cy + 14 * k], [cx - 60 * k, cy], [cx - 14 * k, cy - 14 * k], [cx, cy - 60 * k]], 0), 0, 0.1, { w: 5, fill: "#F4BC22" });
star(1650, 400, 1.0); star(1080, 860, 0.8);
