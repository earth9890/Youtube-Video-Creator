// look: still
// B (old style, test partner): big uneasy Dave on a lighter navy band holds up a postcard "GREETINGS FROM INSIDE"; the glowing ring with its dark shadow on near-black. One red mark: arrow from his boots to the ring.
// @include helpers.js
const S = scene(0, 1, { cam: "none" });
S.fill("M-200 -200 H2120 V1280 H-200 Z", 0, 0, "#05031A", 1);
const sb = []; for (let i = 0; i < 60; i++) sb.push(circ(900 + rnd() * 1100, rnd() * 1080, 1.6 + rnd() * 2.2)); S.fill(sb.join(" "), 0, 0, "#ffffff", 0.85);
S.fill(rect(-200, 760, 1500, 400), 0, 0, lin([[0, "#31487A", 1], [0.55, "#31487A", 1], [1, "#31487A", 0]]), 1);
S.fill(circ(1480, 520, 900, 700), 0, 0, DS.glow("#ff9a2a", 0.4), 1);
ehtRing(S, 1480, 520, 270);
const F = S.fig(440, 1900, { s: 4.3, hair: "side", hairC: DS.c("brown"), outfit: "tee", outfitC: DS.c("blue"), c: "#ffffff", pose: "hold" }).instant(0);
F.face(0, "worried", 5); helmet(S, F);
postcard(S, 500, 960, 1.05, { side: "front", rot: -7, notext: true });
S.draw("M780 1010 Q980 1060 1180 880", 0, 0, { c: "#e5383b", w: 22 }); S.draw(arrowHead(1180, 880, -0.9, 60), 0, 0, { c: "#e5383b", w: 22 });
S.text("FEET FIRST?", 700, 220, { size: 160, c: "#ffffff" });
