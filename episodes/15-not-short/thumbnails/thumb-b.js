// look: v3
// B (lottery): a tiny figure beside a giant ruler, holding a trophy bigger than his head. "5'7"" only.
const S = scene(0, 1, { cam: "none" });
S.bg("flat", { sky: "#1F2A55", ground: "#2c3a6b", hy: 960 });
S.draw(rect(1180, 120, 170, 840), 0, 0.1, { w: 10, fill: "#f2d38a" });
for (let i = 0; i <= 14; i++) S.draw(line([1180, 960 - i * 60], [1180 + (i % 2 ? 50 : 90), 960 - i * 60], 0), 0, 0.1, { w: 7 });
const F = S.fig(820, 960, { s: 1.4, hair: "short", hairC: "#3a2a1a", outfit: "tee", outfitC: "#7ab8e8", pose: "armsUp", c: "#ffffff" }).instant(0);
F.face(0, "happy", 0);
S.trophy(820, 500, 1.8, 0, 0.1);
S.text("5'7\"", 330, 620, { size: 230, c: "#FEFE06", halo: "#111111", haloW: 0.1 });
