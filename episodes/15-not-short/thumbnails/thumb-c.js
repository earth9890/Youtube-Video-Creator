// look: still
// C (clickbait scene mode, 2026-10-20): Dave hangs from a door frame to grow taller before Saturday (script: "No stretch, pill
// or door-hang reopens them. Dave tried all three. Sore."), while a poster of a 5'7" champion (generic footballer, no likeness)
// smiles from the wall. Text "TALLER?": the video's question, can a grown man grow in five days.
const S = scene(0, 1, { cam: "none" });
S.bg("flat", { sky: "#e3a167", ground: "#a8683f", hy: 1000 });
S.fill(circ(1420, 360, 640, 460), 0, 0, "#ffe6b0", 0.35); // lamp glow on the wall
// doorway behind Dave: darker hall beyond
DS.shape(S, rect(160, 280, 700, 900), "wood", { t: 0, flat: true, tone: 2, w: "mid" });
S.fill(circ(510, 700, 260, 340), 0, 0, "#5e3d26", 0.35);
// poster: a 5'7" champion with a trophy
DS.drop(S, rrect(1190, 292, 470, 640, DS.r.sm));
DS.shape(S, rrect(1180, 280, 470, 640, DS.r.sm), "white", { t: 0, w: "mid", flat: true });
DS.shape(S, rect(1206, 306, 418, 588), "sky", { t: 0, w: "hair", flat: true });
DS.shape(S, `M1206 760 H1624 V892 H1206 Z`, "grass", { t: 0, w: "hair", flat: true });
const P = S.fig(1415, 840, { s: 1.2, hair: "short", hairC: "#2a2220", outfit: "tee", outfitC: "#3f9e4a", armL: [[-50, -50], [-14, -126]], armR: [[50, -50], [14, -126]] }).instant(0);
P.face(0, "happy", 0);
S.trophy(1415, 394, 0.45, 0, 0);
S.draw(circ(1290, 845, 30), 0, 0, { c: "#1d1b1f", w: 5, fill: "#ffffff" }); // football
DS.shape(S, rrect(1310, 846, 210, 74, DS.r.sm), "white", { t: 0, w: "mid", flat: true });
S.text("5'7\"", 1415, 902, { size: 70, c: "#1d1b1f" });
// Dave hanging from the lintel, face strained
const F = S.fig(510, 2000, { s: 4.2, hair: "side", hairC: "#5a3825", outfit: "tee", outfitC: "#2f6fd6", armL: [[-36, -86], [-42, -166]], armR: [[36, -86], [42, -166]] }).instant(0);
F.face(0, "wow", 6);
// lintel drawn over the hands = gripping
DS.shape(S, rect(110, 248, 800, 62), "wood", { t: 0, w: "near", dir: "h" });
[110, 860].forEach((x) => DS.shape(S, rect(x, 310, 50, 800), "wood", { t: 0, w: "near", dir: "v" }));
// strain: sweat drops + shake marks at the hands
S.drop(250, 500, 2.2, 0); S.drop(790, 470, 1.8, 0);
[[233, 322], [787, 322]].forEach(([x, y]) => S.draw(`M${x - 50} ${y} l-34 24 M${x - 54} ${y + 34} l-34 20 M${x + 50} ${y} l34 24 M${x + 54} ${y + 34} l34 20`, 0, 0, { c: "#1d1b1f", w: 7 }));
// the lintel is cracking
S.draw("M470 250 L492 272 L474 288 L500 308", 0, 0, { c: "#1d1b1f", w: 8 });
S.draw("M560 250 L548 266 L566 282", 0, 0, { c: "#1d1b1f", w: 6 });
S.text("TALLER?", 960, 205, { size: 210, c: "#FEFE06", halo: "#111111", haloW: 0.09 });
