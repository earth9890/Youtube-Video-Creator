// look: still
// C (clickbait scene mode, 2026-10-20): Dave frozen in a spotlight in a silly duck T-shirt, cringing, while the two people
// behind him chat and never look. Text "NOBODY?": the video's hook (the embarrassing-T-shirt study: only 23% noticed).
const S = scene(0, 1, { cam: "none" });
S.bg("flat", { sky: "#8a6650", ground: "#5e4636", hy: 860 });
// party room: a string of warm fairy lights over the guests
S.draw(smooth([[1040, 280], [1260, 330], [1500, 340], [1740, 320], [1960, 280]]), 0, 0, { c: "#3a2a20", w: 5 });
[[1090, 292], [1200, 314], [1450, 338], [1560, 338], [1760, 318], [1880, 298]].forEach(([x, y], i) => {
  S.fill(circ(x, y + 22, 46), 0, 0, "#ffd58a", 0.35);
  DS.shape(S, circ(x, y + 22, 15, 19), ["yellow", "orange", "pink", "yellow"][i % 4], { t: 0, flat: true, w: "detail" });
});
// the spotlight: cone from the ceiling onto Dave + its pool on the floor
S.fill(`M470 -20 L650 -20 L1010 1100 L110 1100 Z`, 0, 0, "#fff3c4", 0.32);
S.fill(circ(560, 1040, 470, 90), 0, 0, "#fff3c4", 0.35);
// behind: two people chatting with each other, facing away from Dave
const A = S.fig(1330, 990, { s: 1.65, pose: "hips", hair: "bun", hairC: "#3b2a20", outfit: "tee", outfitC: DS.c("green") }).instant(0);
A.face(0, "happy", 9);
const B = S.fig(1640, 990, { s: 1.65, pose: "shrug", hair: "curly", hairC: "#2a2220", outfit: "tee", outfitC: DS.c("orange") }).instant(0);
B.face(0, "happy", -9);
// front: big cringing Dave in the duck T-shirt, hands on his head
const F = S.fig(560, 1900, { s: 4.2, pose: "head", hair: "side", hairC: DS.c("brown"), outfit: "tee", outfitC: DS.c("blue") }).instant(0);
F.face(0, "wow", 0);
const hx = 560, hy = 1900 - 309 * 4.2, r = 210;
[-1, 1].forEach((sd) => S.fill(circ(hx + sd * 0.56 * r, hy + 0.26 * r, 0.16 * r, 0.09 * r), 0, 0, "#f2788a", 0.9)); // red cheeks
S.drop(hx + 1.08 * r, hy - 0.35 * r, 2.2, 0, 0); S.drop(hx - 1.1 * r, hy - 0.1 * r, 1.8, 0, 0);
// the duck print
DS.shape(S, circ(560, 985, 70), "yellow", { t: 0, w: "mid" });
DS.shape(S, `M610 985 Q660 975 668 995 Q650 1015 606 1006 Z`, "orange", { t: 0, w: "detail" });
S.fill(circ(575, 965, 11), 0, 0, "#1d1b1f", 1);
S.text("NOBODY?", 960, 230, { size: 210, c: "#FEFE06", halo: "#111111", haloW: 0.09 });
