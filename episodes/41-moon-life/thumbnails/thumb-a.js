// look: still
// A (clickbait scene): the Moon at low sunrise, warm raking light from the right. Huge terrified Dave in a bubble helmet, mid-sneeze (lunar hay fever),
// dust puff at his nose. His suitcase has burst open and the jumper, sunscreen, earplugs and seeds float up in low gravity. Earth glows in the black sky.
// Wrongness: a man moving to the Moon with luggage. Text: MOVE IN? (the video's first question).
// @include helpers.js
const S = scene(0, 1, { cam: "none" });
S.fill(rect(-200, -200, 2320, 1480), 0, 0, "#07060d", 1);
stars(S, 70, -50, -50, 1960, 560, { big: 4 });
earth(S, 330, 290, 210, { night: false });
S.fill(`M-200 720 Q300 650 800 690 T1700 670 T2120 690 V1280 H-200 Z`, 0, 0, DS.vgrad("#a39b8b", "#6c6454"), 1);
S.fill(circ(1500, 760, 900, 420), 0, 0, DS.glow("#ffcf7a", 0.55), 1);
[[520, 880, 380], [900, 960, 460], [1400, 900, 320]].forEach(([x, y, w]) => S.fill(circ(x, y, w, w * 0.07), 0, 0, "#2b2620", 0.35));
const F = daveM(S, 1000, 1930, "near", { s: 4.3, mood: "wow", look: 0, outfitC: "#f4f1ea", breathe: false });
dustCloud(S, F.hd[0] - F.r * 1.05, F.hd[1] + F.r * 0.75, 1.6, undefined);
const rot = (g, a, x, y) => g.setAttribute("transform", `rotate(${a} ${x} ${y})`);
suitcase(S, 1430, 1040, 1.15, { open: true });
rot(ITEM.jumper(S, 1560, 560, 2.7), -14, 1560, 560);
rot(ITEM.sunscreen(S, 1790, 420, 1.7), 22, 1790, 420);
rot(ITEM.earplugs(S, 1380, 400, 1.7), -18, 1380, 400);
rot(ITEM.seeds(S, 1810, 760, 1.5), 16, 1810, 760);
DS.vignette(S, 0.2);
S.text("MOVE IN?", 1230, 215, { size: 200, c: "#FEFE06", halo: "#111111", haloW: 0.09 });
