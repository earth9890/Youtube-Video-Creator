// look: still
// C (clickbait scene mode, 2026-10-20): Dave chases a buzzing phone dangled from a stick strapped to his own head, like a
// donkey's carrot (script: "Every buzz, every red dot, every scroll is a tiny reward. And your mind learned to chase the
// next one." / "Your brain isn't broken. It's been trained."). His homework book lies open behind. Text: "TRAINED?".
const S = scene(0, 1, { cam: "none" });
S.bg("flat", { sky: "#df9f69", ground: "#9a6440", hy: 900 });
S.fill(circ(1500, 560, 620, 420), 0, 0, "#fff0c4", 0.32); // the phone's glow on the wall
// desk with the abandoned book
DS.shape(S, rect(1060, 880, 900, 60), "wood", { t: 0, w: "mid", dir: "h" });
DS.shape(S, rect(1800, 940, 50, 200), "wood", { t: 0, w: "mid", tone: 2, flat: true });
S.book(1640, 860, 0.8, 0, 0);
// big Dave, crazed, reaching
const F = S.fig(600, 1900, { s: 4.2, hair: "side", hairC: "#5a3825", outfit: "tee", outfitC: "#2f6fd6", armR: [[60, -10], [100, -60]], armL: [[-40, 40], [-60, 100]] }).instant(0);
F.face(0, "wow", 9);
// headband + stick + string + phone
S.draw(`M${600 - 205} 470 Q600 420 ${600 + 205} 470`, 0, 0, { c: "#e5383b", w: 26 });
S.draw("M470 450 L1330 255", 0, 0, { c: "#7f5f45", w: 22 });
S.draw("M470 450 L1330 255", 0, 0, { c: "#b08968", w: 12 });
S.draw("M1320 262 L1320 420", 0, 0, { c: "#1d1b1f", w: 5 });
S.draw(rays(1320, 590, 210, 270, 12), 0, 0, { c: "#fff6d6", w: 9 });
DS.drop(S, rrect(1230, 432, 200, 330, 30));
S.draw(rrect(1220, 420, 200, 330, 30), 0, 0, { w: 9, fill: "#2b2d42" });
S.draw(rrect(1236, 452, 168, 266, 8), 0, 0, { w: 4, fill: "#fff6d6" });
S.heart(1320, 585, 2.4, 0, 0); // the tiny reward
[[1236, 450, "9"], [1420, 520, "+1"], [1210, 690, "!"]].forEach(([cx, cy, n]) => { S.draw(circ(cx, cy, 46), 0, 0, { w: 6, fill: "#e5383b" }); S.text(n, cx, cy + 20, { size: 60, c: "#ffffff" }); });
[[-1, 0], [1, 0]].forEach(([k]) => S.draw(`M${1320 + k * 140} 380 l${k * 30} -24 M${1320 + k * 150} 420 l${k * 40} -6`, 0, 0, { c: "#1d1b1f", w: 7 })); // buzz
S.text("TRAINED?", 960, 200, { size: 210, c: "#FEFE06", halo: "#111111", haloW: 0.09 });
