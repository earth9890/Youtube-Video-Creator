// look: still
// C (clickbait scene mode, 2026-10-20): Dave in his bathroom, shocked by his own selfie (giant nose: "at one foot, a nose looks
// thirty percent wider"), while the mirror behind shows a calm, normal, flipped Dave. The video's question, "which Dave is
// real?", as text: "REAL YOU?".
const S = scene(0, 1, { cam: "none" });
S.bg("flat", { sky: "#eeb086", ground: "#d6956b", hy: 1080 });
let grid = ""; for (let x = 0; x <= 1920; x += 128) grid += `M${x} 0 V1080 `; for (let y = 40; y <= 1080; y += 128) grid += `M0 ${y} H1920 `;
S.draw(grid, 0, 0, { c: "#d89068", w: 4 });
S.fill(circ(1480, 300, 560, 380), 0, 0, "#fff1c9", 0.4); // vanity light glow
// mirror: Dave as he likes himself, flipped
DS.drop(S, rrect(1238, 316, 500, 600, 40));
DS.shape(S, rrect(1226, 300, 500, 600, 40), "gold", { t: 0, w: "near" });
DS.shape(S, rrect(1254, 328, 444, 544, 26), "glass", { t: 0, w: "mid", flat: true });
const mg = S.grp();
const M = S.fig(1476, 1100, { s: 2.0, hair: "side", hairC: "#5a3825", outfit: "tee", outfitC: "#2f6fd6", parent: mg }).instant(0);
M.face(0, "smile", 0);
mg.setAttribute("transform", "translate(2952 0) scale(-1 1)");
S.draw("M1290 420 L1370 360 M1300 480 L1420 380", 0, 0, { c: "#ffffff", w: 10 });
DS.shape(S, rrect(1306, 248, 340, 40, DS.r.sm), "yellow" /* lamp bar */, { t: 0, w: "mid", flat: true, tone: 1 });
// sink counter hides the reflection's legs
DS.shape(S, rect(1120, 880, 860, 260), "white", { t: 0, w: "near", dir: "v" });
DS.shape(S, rect(1100, 860, 900, 40), "white", { t: 0, w: "mid", flat: true, tone: 2 });
// big shocked Dave holding his selfie
const F = S.fig(400, 1900, { s: 4.2, hair: "side", hairC: "#5a3825", outfit: "tee", outfitC: "#2f6fd6", armR: [[40, 30], [84, -12]] }).instant(0);
F.face(0, "wow", 8);
S.drop(660, 470, 2.2, 0);
const x = 910, y = 650, w = 340, h = 580;
DS.drop(S, rrect(x - w / 2 + 10, y - h / 2 + 14, w, h, 44));
S.draw(rrect(x - w / 2, y - h / 2, w, h, 44), 0, 0, { w: 10, fill: "#2b2d42" });
S.draw(rrect(x - w / 2 + 24, y - h / 2 + 56, w - 48, h - 112, 10), 0, 0, { w: 5, fill: "#eaf6ff" });
const fx = x, fy = y + 10, r = 118;
S.draw(circ(fx, fy, r * 1.08, r), 0, 0, { w: 8, fill: "#ffffff" });
S.draw(smooth(arcPts(fx - 10, fy - 22, r * 1.05, 195, 335, 10)), 0, 0, { w: 36, c: "#5a3825" });
[-1, 1].forEach((k) => S.fill(circ(fx + k * 74, fy - 16, 11), 0, 0, "#1d1b1f", 1));
S.draw(circ(fx, fy + 34, 70, 46), 0, 0, { w: 8, fill: "#ffc9a8" });
S.draw(line([fx - 36, fy + 96], [fx + 36, fy + 96], 0), 0, 0, { w: 7 });
S.text("REAL YOU?", 960, 200, { size: 210, c: "#FEFE06", halo: "#111111", haloW: 0.09 });
