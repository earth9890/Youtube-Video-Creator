// look: still
// A (clickbait scene mode): a warm kitchen at 7 am. Huge shocked Dave, one raw egg halfway to his mouth; beside him a wobbling tower of forty-eight eggs,
// taller than he is and already tipping, with three eggs flying off the top. On the back wall: the fridge scoreboard, 0 / 300 g. Eggs only in mid-air, no mess.
// @include helpers.js
const S = scene(0, 1, { cam: "none" });
S.bg("flat", { sky: "#c9a27a", ground: "#8a6a4f", hy: 900 });
// sunrise through a window patch on the left, soft glow
S.fill(circ(120, 520, 760, 560), 0, 0, DS.glow("#ffd9a0", 0.75), 1);
DS.shape(S, rrect(40, 260, 250, 340, DS.r.xs), "sky", { t: 0, flat: true, tone: 1, w: "mid" }); S.draw("M165 260 V600 M40 430 H290", 0, 0, { c: "#fbf7ef", w: 12 });
// the counter top edge
S.fill(rect(0, 880, 1920, 34), 0, 0, "#b08968", 1);
// scoreboard on the back wall
scoreb(S, 940, 580, 0.72, { val: 0, t: 0 });
// the tower: 4 x 12 = 48 eggs, taller than Dave and tipping, three eggs flying off
const tw = S.grp(); DS.shadow(S, 1640, 934, 420, { parent: S.g });
for (let r = 0; r < 12; r++) for (let c = 0; c < 4; c++) egg(S, 1640 - 108 + c * 72 + (r % 2) * 36, 884 - r * 64, 1.45, { parent: tw });
tw.setAttribute("transform", "rotate(7 1640 930)");
[[1360, 330, -30], [1850, 330, 40], [1400, 560, 70]].forEach(([x, y, rot]) => { const e = S.grp(); egg(S, x, y, 1.5, { parent: e }); e.setAttribute("transform", `rotate(${rot} ${x} ${y})`); });
S.draw("M1310 440 Q1330 380 1340 360 M1830 420 Q1815 380 1820 360 M1350 640 Q1335 600 1345 590", 0, 0, { c: "#fbf7ef", w: 10, op: 0.6 });
// huge shocked Dave, eyes on the viewer, raw egg halfway to his mouth
const F = dave(S, 420, 1900, "near", { s: 4.2, mood: "wow", look: 0, breathe: false, armR: [[90, 0], [38, -41]] });
const [hx, hy] = F.hd, R = F.r, pg = F.P.head.parentNode;
sweatAt(S, hx - R * 1.1, hy - R * 0.5, 0, 2.2);
DS.shape(S, circ(672, 706, 34), "paper", { t: 0, flat: true, w: "mid" }); egg(S, 700, 690, 1.9, {});
S.text("48 EGGS?", 960, 215, { size: 210, c: "#FEFE06", halo: "#111111", haloW: 0.09 });
