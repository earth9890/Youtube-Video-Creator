// look: still
// C (clickbait scene mode, 2026-10-20): Saturday night, lamp-lit living room; huge shocked Dave, party confetti bursting out of
// his phone, stares at the window: across the street two neighbours sit alone on their couches, phones in hand.
// Text "ONLY ME?": the video's question (where are the other ninety-one? on a couch). Honest to the content.
const S = scene(0, 1, { cam: "none" });
S.bg("flat", { sky: "#c98f5e", ground: "#8a5a3b", hy: 900 });
// floor lamp on the right, warm glow
S.fill(circ(1500, 520, 700, 460), 0, 0, "#ffd08a", 0.3);
S.draw(line([1835, 900], [1835, 450], 0), 0, 0, { w: 9 });
S.draw(`M1750 450 L1920 450 L1880 340 L1790 340 Z`, 0, 0, { w: 8, fill: "#ffe38a" });
// window onto the night street: an apartment block with two lit windows, a neighbour alone on a couch in each
S.draw(rrect(1010, 300, 720, 560, 16), 0, 0, { w: 12, fill: "#1f2a44" });
[[1120, 380], [1250, 340], [1420, 400], [1560, 350], [1660, 410]].forEach(([x, y]) => S.fill(circ(x, y, 5), 0, 0, "#ffffff", 0.9));
S.draw(rect(1035, 440, 670, 420), 0, 0, { w: 6, fill: "#5a6a8e" });
function flat(x, y, c, hair, oc) {
  S.draw(rect(x, y, 290, 300), 0, 0, { w: 6, fill: "#ffd76a" });
  S.fill(rect(x + 3, y + 262, 284, 35), 0, 0, "#c98f5e", 1);
  S.draw(rrect(x + 30, y + 190, 230, 90, 14), 0, 0, { w: 5, fill: c });
  const P = S.fig(x + 145, y + 215, { s: 0.7, sit: true, hair, hairC: "#2b1d14", outfit: "hoodie", outfitC: oc, armL: [[-20, 50], [10, 40]], armR: [[22, 48], [14, 40]] }).instant(0);
  P.face(0, "flat", 4);
  const [hx, hy] = P.hand("R");
  S.draw(rrect(hx - 14, hy - 40, 28, 46, 6), 0, 0, { w: 4, fill: "#d6f0fc" });
}
flat(1060, 490, "#e5383b", "short", "#8e5bb5");
flat(1390, 490, "#3f9e4a", "bun", "#ff8c1a");
S.draw(rect(1010, 300, 720, 560) + line([1370, 300], [1370, 860], 0), 0, 0, { w: 14, c: "#7f5f45" });
// big shocked Dave, phone up, party bursting out of the screen
const F = S.fig(400, 1900, { s: 4.2, hair: "side", hairC: "#5a3825", outfit: "tee", outfitC: "#2f6fd6", armR: [[70, 10], [100, -30]] }).instant(0);
F.face(0, "wow", 14);
const [px, py] = F.hand("R");
S.draw(rrect(px - 70, py - 250, 150, 270, 22), 0, 0, { w: 9, fill: "#1d1b1f" });
S.draw(rrect(px - 54, py - 228, 118, 214, 10), 0, 0, { w: 5, fill: "#8e5bb5" });
[[-30, -190, "#ffcf33"], [20, -150, "#f28ca0"], [-10, -90, "#3f9e4a"], [30, -60, "#ffcf33"]].forEach(([dx, dy, c]) => S.fill(rect(px + dx, py + dy, 18, 26), 0, 0, c, 1));
[[-20, -300, "#f28ca0", 20], [60, -350, "#ffcf33", -25], [130, -280, "#3f9e4a", 40], [-90, -330, "#ff8c1a", 10], [160, -370, "#f28ca0", -40], [10, -400, "#2f6fd6", 30], [200, -320, "#ffcf33", 15]].forEach(([dx, dy, c, r]) => {
  const x = px + dx, y = py + dy, a = r * Math.PI / 180, u = [Math.cos(a) * 20, Math.sin(a) * 20], v = [-Math.sin(a) * 12, Math.cos(a) * 12];
  S.draw(poly([[x - u[0] - v[0], y - u[1] - v[1]], [x + u[0] - v[0], y + u[1] - v[1]], [x + u[0] + v[0], y + u[1] + v[1]], [x - u[0] + v[0], y - u[1] + v[1]], [x - u[0] - v[0], y - u[1] - v[1]]], 0), 0, 0, { w: 4, fill: c });
});
S.text("ONLY ME?", 960, 230, { size: 220, c: "#FEFE06", halo: "#111111", haloW: 0.09 });
