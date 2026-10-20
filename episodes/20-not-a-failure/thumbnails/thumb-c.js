// look: still
// C (clickbait scene mode, 2026-10-20): an awards stage under a spotlight; the near miss holding "NO" stands on the top step
// with the trophy, the grant winner holding "YES" is a step below; huge Dave stares, shocked. Confetti falls.
// Text "LOSERS WIN?": the video's twist (Wang 2019: near misses later landed hit papers a fifth more often than the winners).
const S = scene(0, 1, { cam: "none" });
S.bg("flat", { sky: "#a8423b", ground: "#9c6f48", hy: 900 });
// curtain folds + spotlight
for (let x = 60; x < 1920; x += 150) S.draw(smooth([[x, -20], [x + 18, 300], [x - 10, 600], [x + 12, 900]]), 0, 0, { w: 6, c: "#7c2a26" });
S.fill(`M1340 -20 L1540 -20 L1820 900 L1060 900 Z`, 0, 0, "#ffe9a8", 0.3);
S.fill(circ(1440, 905, 400, 50), 0, 0, "#ffe9a8", 0.45);
// podium: 1 in the middle, 2 on the right
S.draw(rect(1320, 750, 240, 155), 0, 0, { w: 8, fill: "#f3e2c4" });
S.draw(rect(1560, 820, 220, 85), 0, 0, { w: 8, fill: "#e0c79f" });
S.text("1", 1440, 870, { size: 100, c: "#c98e1c" });
S.text("2", 1670, 892, { size: 70, c: "#6f757b" });
// a held sign: white card with one word
const sign = (x, y, word, c) => { S.draw(rrect(x - 85, y - 60, 170, 110, 10), 0, 0, { w: 6, fill: "#ffffff" }); S.text(word, x, y + 24, { size: 76, c }); };
// near miss on top: trophy up, "NO" letter in the other hand
const A = S.fig(1440, 750, { s: 1.0, hair: "curly", hairC: "#2b1d14", outfit: "tee", outfitC: "#8e5bb5", armL: [[-40, 50], [-80, 40]], armR: [[40, -20], [62, -86]] }).instant(0);
A.face(0, "happy", -6);
const [tx, ty] = A.hand("R");
S.trophy(tx, ty + 20, 0.75, 0, 0);
const [nx, ny] = A.hand("L");
sign(nx - 60, ny - 10, "NO", "#e5383b");
// grant winner one step down, "YES" letter, worried
const B = S.fig(1670, 820, { s: 1.0, hair: "bun", hairC: "#5a3825", outfit: "tee", outfitC: "#3f9e4a", armR: [[44, 30], [86, 4]] }).instant(0);
B.face(0, "worried", -10);
const [yx, yy] = B.hand("R");
sign(yx + 30, yy - 40, "YES", "#3f9e4a");
// confetti
[[1180, 380, "#ffcf33", 20], [1300, 300, "#f28ca0", -30], [1150, 470, "#6d9ee8", 40], [1760, 300, "#ffcf33", -15], [1820, 330, "#f28ca0", 25], [1180, 700, "#6fc078", 60], [1580, 640, "#ffcf33", -50], [1100, 600, "#f28ca0", 10]].forEach(([x, y, c, r]) => {
  const a = r * Math.PI / 180, u = [Math.cos(a) * 20, Math.sin(a) * 20], v = [-Math.sin(a) * 11, Math.cos(a) * 11];
  S.draw(poly([[x - u[0] - v[0], y - u[1] - v[1]], [x + u[0] - v[0], y + u[1] - v[1]], [x + u[0] + v[0], y + u[1] + v[1]], [x - u[0] + v[0], y - u[1] + v[1]], [x - u[0] - v[0], y - u[1] - v[1]]], 0), 0, 0, { w: 4, fill: c });
});
// big shocked Dave
const F = S.fig(400, 1900, { s: 4.2, hair: "side", hairC: "#5a3825", outfit: "tee", outfitC: "#2f6fd6", pose: "armsUp" }).instant(0);
F.face(0, "wow", 14);
S.text("LOSERS WIN?", 960, 230, { size: 200, c: "#FEFE06", halo: "#111111", haloW: 0.09 });
