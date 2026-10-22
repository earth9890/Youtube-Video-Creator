// look: still
// A (clickbait scene): huge shocked Dave in a white suit clutches his postcard; his legs stretch out behind him toward a glowing ring like one long cartoon noodle, feet first into the glow.
// Wrongness: a man turning into spaghetti on the way in. Small figure: the news friend in a lit ship window, mic out. Text asks the video's question.
// @include helpers.js
const S = scene(0, 1, { cam: "none" });
S.fill("M-200 -200 H2120 V1280 H-200 Z", 0, 0, lin([[0, "#3b5694", 1], [0.3, "#1a2550", 1], [0.55, "#05071a", 1], [1, "#03040f", 1]]), 1);
S.fill(circ(1000, 540, 900, 520), 0, 0, DS.glow("#7a5ad0", 0.22), 1);
const stars_ = []; for (let i = 0; i < 90; i++) stars_.push(circ(rnd() * 1920, rnd() * 1080, 1.6 + rnd() * 2.4)); S.fill(stars_.join(" "), 0, 0, "#ffffff", 0.85);
// the ring, our own stylised look, as the light source
S.fill(circ(1500, 520, 980, 760), 0, 0, DS.glow("#ff9a2a", 0.5), 1);
ehtRing(S, 1500, 520, 235);
// the noodle: a blue tube that thins as it runs from Dave's body to the ring, feet at the end
{
  const A = [660, 1130], B = [1215, 585], n = 90, P = [];
  for (let i = 0; i <= n; i++) { const u = i / n, x = A[0] + (B[0] - A[0]) * u, y = A[1] + (B[1] - A[1]) * u, nx = 0.68, ny = 0.73, off = Math.sin(u * Math.PI * 5.2 + 0.4) * 62 * (1 - u * 0.55); P.push([x + nx * off, y + ny * off]); }
  for (let pass = 0; pass < 2; pass++) for (let i = 0; i < n; i++) { const u = i / n, w = 128 - 112 * Math.pow(u, 0.8) + (pass ? 0 : 24); S.draw(`M${P[i][0]} ${P[i][1]} L${P[i + 1][0]} ${P[i + 1][1]}`, 0, 0, { c: pass ? "#2f6fd6" : "#ffffff", w }); }
  const [ex, ey] = P[n]; [[-16, -22], [14, 18]].forEach(([dx, dy]) => { S.draw(circ(ex + dx + 18, ey + dy - 16, 36, 19), 0, 0, { fill: "#ffffff", c: "#1d1b1f", w: 7 }); });
}
// Dave, huge and shocked, postcard to his chest
const F = S.fig(500, 1900, { s: 4.3, hair: "side", hairC: DS.c("brown"), outfit: "tee", outfitC: DS.c("blue"), c: "#ffffff", pose: "hold" }).instant(0);
F.face(0, "wow", 3); helmet(S, F);
postcard(S, 470, 990, 1.05, { side: "front", rot: -8, notext: true });
// the news friend in a warm ship window, mic out toward Dave
S.draw(rrect(40, 320, 270, 210, DS.r.md), 0, 0, { fill: "#ffd66b", c: "#ffffff", w: 12 });
S.draw(circ(150, 420, 40), 0, 0, { fill: "#ffffff", c: "#1d1b1f", w: 7 }); S.fill(circ(140, 368, 22), 0, 0, "#7a5236", 1); S.fill(`M90 530 Q150 440 210 530 Z`, 0, 0, "#8e5bb5", 1);
S.draw("M200 470 L250 440", 0, 0, { c: "#6f757b", w: 10 }); S.fill(circ(256, 436, 17), 0, 0, "#f2b84b", 1);
S.text("SPAGHETTI?", 1020, 235, { size: 200, c: "#FEFE06", halo: "#111111", haloW: 0.09 });
