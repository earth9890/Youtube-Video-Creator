// look: still
// C (clickbait scene mode, 2026-10-20): Dave in tears at night next to a giant phone showing someone else's highlight reel
// (sunny beach, podium, trophy) with likes flying out. Text "BEHIND?": the video's hook ("you're comparing your
// behind-the-scenes to everyone else's highlight reel... You're not behind").
const S = scene(0, 1, { cam: "none" });
S.bg("flat", { sky: "#9a6a58", ground: "#6e4a3d", hy: 940 });
// warm lamp glow on the left wall + the phone's cool glow on the right
S.fill(circ(260, 420, 420, 380), 0, 0, DS.glow("#ffc061", 0.6), 1);
S.fill(circ(1330, 680, 600, 540), 0, 0, DS.glow("#d6f0fc", 0.75), 1);
// the giant phone: someone else's perfect day
const PX = 1060, PY = 320, PW = 540, PH = 860;
S.draw(rrect(PX, PY, PW, PH, 60), 0, 0, { fill: "#2a2d36", c: "#1d1b1f", w: 8 });
S.draw(rrect(PX + 26, PY + 60, PW - 52, PH - 60, 26), 0, 0, { fill: DS.c("sky"), c: "#1d1b1f", w: 5 });
S.fill(rrect(PX + PW / 2 - 50, PY + 22, 100, 16, 8), 0, 0, "#6f757b", 1);
S.draw(circ(PX + 430, PY + 170, 56), 0, 0, { fill: DS.c("yellow"), c: "#1d1b1f", w: 5 });
S.draw(`M${PX + 26} ${PY + 470} Q${PX + 250} ${PY + 450} ${PX + PW - 26} ${PY + 470} L${PX + PW - 26} ${PY + 560} L${PX + 26} ${PY + 560} Z`, 0, 0, { fill: DS.c("blue", 1), c: "#1d1b1f", w: 5 });
S.draw(`M${PX + 26} ${PY + 560} L${PX + PW - 26} ${PY + 560} L${PX + PW - 26} ${PY + PH - 30} L${PX + 26} ${PY + PH - 30} Z`, 0, 0, { fill: DS.c("sand"), c: "#1d1b1f", w: 5 });
// podium + winner with a trophy
DS.shape(S, rrect(PX + 180, PY + 620, 180, 150, DS.r.xs), "gold", { t: 0, w: "mid" });
S.text("1", PX + 270, PY + 720, { size: 84, c: "#1d1b1f" });
const Wn = S.fig(PX + 270, PY + 620, { s: 1.05, armL: [[-40, -30], [-18, -135]], armR: [[40, -30], [18, -135]], hair: "curly", hairC: "#2a2220", outfit: "tee", outfitC: DS.c("pink") }).instant(0);
Wn.face(0, "happy", 0);
S.trophy(PX + 270, PY + 620 - 392, 0.75, 0, 0);
// likes flying out of the screen
[[PX + PW + 90, PY + 200, 1.4], [PX + PW + 170, PY + 420, 1.0], [PX + PW + 70, PY + 600, 0.85], [PX - 80, PY + 110, 1.0]].forEach(([x, y, k]) => S.draw(heartPath(x, y, k), 0, 0, { fill: DS.c("red"), c: "#1d1b1f", w: 5 }));
// front: Dave in tears
const F = S.fig(540, 1900, { s: 4.2, pose: "sad", hair: "side", hairC: DS.c("brown"), outfit: "tee", outfitC: DS.c("blue") }).instant(0);
F.face(0, "cry", 7);
S.text("BEHIND?", 960, 230, { size: 210, c: "#FEFE06", halo: "#111111", haloW: 0.09 });
