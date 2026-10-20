// look: still
// C (clickbait scene mode, 2026-10-20): Dave's bedroom at night. Huge Dave cracks up, pulling the lever of his own tickle
// machine; the feather wiggles at his neck through the red delay box set to 0.2 s. His sister gapes behind him.
// Text "IT WORKS?": the video's beat "He pulls the lever. And for the first time in his life, Dave tickles Dave."
// @include kit.js
const S = scene(0, 1, { cam: "none" });
DS.room(S, { wall: "gold", floor: "wood", window: false });
nightWin(S, 1080, 250, 230, 210);
// floor lamp on the right: the warm light
S.fill(circ(1790, 330, 420), 0, 0, DS.glow("#fff3c4", 0.75), 1);
DS.shadow(S, 1790, 960, 160);
DS.shape(S, rect(1781, 400, 18, 560), "ink", { w: "detail" });
DS.shape(S, `M1700 400 L1880 400 L1840 250 L1740 250 Z`, "paper", { w: "mid" });
// his sister behind: jaw dropped, hands out ("what?")
const Z = sister(S, 1560, 960, "near", { s: 1.45, mood: "wow", look: -8, pose: "shrug" });
// the delay box on a stool, lever on top, stick + feather out to Dave's neck
DS.shadow(S, 1110, 1000, 520);
DS.shape(S, rect(900, 880, 420, 120), "wood", { tone: 2 });
const B = dbox(S, 810, 560, 2.4, { ang: 20 });
DS.shape(S, rrect(810 + 106 * 2.4, 560 + 38 * 2.4, 130 * 2.4, 56 * 2.4, DS.r.xs), "white", { w: "detail", flat: true });
[0, 1, 2, 3].forEach((i) => S.fill(rrect(1096 + i * 64, 678 + (3 - i) * 14, 44, 80 - (3 - i) * 14, DS.r.xs), 0, 0, i < 3 ? DS.c("red") : DS.c("gray", 1), 1)); // delay meter (no digits: keeps the tile to 2 words)
// lever out of the box's lower-left corner, knob in Dave's hand
DS.shape(S, capsule([840, 820], [720, 890], 12), "gray", { tone: 2, w: "mid" });
DS.shape(S, circ(720, 890, 34), "red", { w: "mid" });
// stick + big feather from the box to Dave's cheek
DS.shape(S, capsule([880, 566], [800, 500], 12), "wood", { w: "mid" });
// huge Dave: laughing so hard he cries, hand on the lever
const F = who(S, 380, 1900, "near", { s: 4.3, hair: "side", hairC: DS.c("brown"), outfitC: DS.c("blue"), mood: "happy", look: 4, breathe: false,
  armR: armAt(380, 1900, 4.3, "R", 712, 900, 1), armL: [[-35, -20], [-62, -82]] });
// tears of laughter squirting sideways
[[[265, 562], [190, 548], [130, 600]], [[505, 560], [590, 520], [650, 560]]].forEach((P) => { S.draw(smooth(P), 0, 0, { c: DS.c("blue"), w: 16 }); S.draw(smooth(P), 0, 0, { c: DS.c("sky", 1), w: 8 }); S.drop(P[2][0] + (P[2][0] < 300 ? -10 : 12), P[2][1] + 40, 1.6, 0, 0.1); });
feather(S, [810, 508], [500, 700], { vw: 40, name: "pink" });
squig(S, 520, 720, 0, 3.2, 3);
S.text("IT WORKS?", 960, 215, { size: 215, c: "#FEFE06", halo: "#111111", haloW: 0.09 });
