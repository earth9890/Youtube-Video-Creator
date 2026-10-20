// look: still
// C (clickbait scene mode, 2026-10-20): a warm house party; big Dave in front, crying, looking away, sure nobody wants him,
// while right behind him two friends wave him over (script: "Loneliness makes you read rejection where there is none. So you
// pull back."). Text "THEY HATE ME?": the misread the video is about.
const S = scene(0, 1, { cam: "none" });
S.bg("flat", { sky: "#d68b5f", ground: "#8f5a3c", hy: 930 });
S.fill(circ(1380, 560, 700, 440), 0, 0, "#ffe2a6", 0.32); // lamp glow
// string lights
const LX = [80, 240, 400, 560, 720, 880, 1040, 1200, 1360, 1520, 1680, 1840], ly = (x) => 300 + 50 * Math.sin(((x - 80) / 1760) * Math.PI * 2) ** 2;
S.draw(smooth(LX.map((x) => [x, ly(x)])), 0, 0, { c: "#3d2418", w: 5 });
LX.forEach((x, i) => { const c = ["#ffcf33", "#f28ca0", "#6fc078", "#6d9ee8"][i % 4]; S.fill(circ(x, ly(x) + 30, 34), 0, 0, c, 0.35); S.draw(circ(x, ly(x) + 26, 14, 18), 0, 0, { w: 4, fill: c }); });
// couch + two friends waving Dave over
DS.shape(S, rrect(1050, 700, 760, 230, DS.r.lg), "purple", { t: 0, w: "mid" });
DS.shape(S, rrect(1010, 760, 110, 190, DS.r.md), "purple", { t: 0, w: "mid", tone: 2 });
DS.shape(S, rrect(1740, 760, 110, 190, DS.r.md), "purple", { t: 0, w: "mid", tone: 2 });
const A = S.fig(1300, 840, { s: 1.5, sit: true, hair: "bun", hairC: "#2a2220", outfit: "tee", outfitC: "#3f9e4a", pose: "wave" }).instant(0); A.face(0, "happy", -9);
const B = S.fig(1580, 840, { s: 1.5, sit: true, hair: "curly", hairC: "#5a3825", outfit: "hoodie", outfitC: "#ff8c1a", pose: "hold" }).instant(0); B.face(0, "happy", -9);
S.coffee(B.hand("R")[0] - 4, B.hand("R")[1] + 14, 0.5, 0, 0);
S.speech(1200, 470, 100, 74, 1260, 545, 0, 0); S.heart(1200, 470, 1.6, 0, 0); // "come sit with us"
// big Dave, alone in front, crying, looking away
const F = S.fig(520, 1900, { s: 4.2, hair: "side", hairC: "#5a3825", outfit: "tee", outfitC: "#2f6fd6", pose: "sad" }).instant(0);
F.face(0, "cry", -6);
S.text("THEY HATE ME?", 960, 200, { size: 185, c: "#FEFE06", halo: "#111111", haloW: 0.09 });
