// look: still
// C (clickbait scene mode, 2026-10-20): night camp under a Bortle-two sky. Huge shocked Dave points up at a giant running emu
// made of the Milky Way's dark dust; a small modern stargazer at a telescope gawps too, lit by a camp lantern.
// Wrongness: a bird the size of the sky, drawn with the gaps between the stars (the video's Emu in the Sky). Text asks the question.
// @include helpers.js
const S = scene(0, 1, { cam: "none" });
S.fill(rect(-200, -200, 2320, 1480), 0, 0, DS.vgrad("#060820", "#1b2550"), 1);
milky(S, 1.35, { from: [560, -40], to: [2240, 1220], wd: 170, bulge: 0.5, emu: "run", emuAt: [0.5, 30, 1.22], tilt: 0.12, dust: "#060820", rim: 0, rimC: "#F4BC22" });
field(S, 0.5, 1000, { keep: (x, y) => x > 760 || y < 300 });
// speed lines behind the running emu
[[1700, 470, 170], [1740, 560, 210], [1690, 650, 150]].forEach(([x, y, l]) => S.draw(line([x, y], [x + l, y + 24], 0), 0, 0, { c: "#F4BC22", w: 12, op: 0.85 }));
// ground: far ridge + warm near hill, lit by the lantern
S.fill(smooth([[-200, 930], [400, 900], [900, 940], [1400, 905], [2120, 935]]) + " L2120 1280 L-200 1280 Z", 0, 0, "#3a2c26", 1);
S.fill(smooth([[-200, 985], [600, 965], [1200, 990], [2120, 970]]) + " L2120 1280 L-200 1280 Z", 0, 0, "#6b4a34", 1);
S.fill(circ(1240, 1000, 520, 230), 0, 0, DS.glow("#ffb347", 0.55), 1);
// camp lantern
DS.shape(S, rrect(817, 935, 46, 62, 10), "yellow", { tone: 1 });
S.fill(circ(840, 966, 120), 0, 0, DS.glow("#fff3c4", 0.8), 1);
S.draw(arc(840, 935, 22, 180, 360), 0, 0, { c: "#1d1b1f", w: 6 });
// small modern stargazer at a telescope aimed at the emu (white limbs: night, as in the video)
const tx = 1110, ty = 880;
[[-50, 120], [0, 128], [48, 120]].forEach(([dx, dy]) => S.draw(line([tx, ty], [tx + dx, ty + dy], 0), 0, 0, { c: "#ffffff", w: 7 }));
S.draw(line([tx - 50, ty + 30], [tx + 60, ty - 110], 0), 0, 0, { c: "#ffffff", w: 40 });
S.draw(line([tx + 30, ty - 72], [tx + 50, ty - 97], 0), 0, 0, { c: "#3a363d", w: 40 });
const G = person(S, 1000, 1005, "near", 1, { s: 1.05, hair: "bun", outfit: "hoodie", outfitC: DS.c("orange"), c: DS.P.white[0], mood: "wow", look: 8, pose: "reach" });
// big shocked Dave, one hand on his head, the other pointing at the emu
const F = dave(S, 420, 1900, "near", { s: 4.2, mood: "wow", look: 9, breathe: false, armL: [[-58, -12], [-34, -64]], armR: [[50, -30], [95, -75]] });
S.text("GIANT EMU?", 960, 215, { size: 200, c: "#FEFE06", halo: "#111111", haloW: 0.09 });
