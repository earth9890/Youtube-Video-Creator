// look: still
// C (clickbait scene mode, 2026-10-20): Friday, the front door at dusk, the porch lamp on. His date leans in with hearts
// floating up; huge panicking Dave sticks out a stiff, trembling handshake. Text "HANDSHAKE?": the video's runner and its
// last scene ("His date looks at Dave's outstretched hand, shakes it, and then kisses him on the cheek anyway").
// Family-friendly: hearts only, no lips.
// @include kit.js
const S = scene(0, 1, { cam: "none" });
doorstep(S, { sky: "dusk", sun: [260, 300] });
S.fill(circ(DX - 250, 460, 420), 0, 0, DS.glow("#ffd27a", 0.55), 1); // porch light on the step
// his date on the step, leaning in, hearts rising
const Dt = date(S, 1250, 900, "near", { s: 1.7, mood: "smile", look: -8, pose: "hold", breathe: false });
Dt.gi.setAttribute("transform", "rotate(-9 1250 900)");
[[1060, 420, 1.7], [960, 330, 1.25], [1110, 300, 0.9]].forEach(([x, y, k]) => heart(S, x, y, k, { name: "pink" }));
// huge Dave: eyes wide, sweating, arm out stiff as a plank
const F = who(S, 420, 1900, "near", { s: 4.3, hair: "side", hairC: DS.c("brown"), outfitC: DS.c("blue"), mood: "wow", look: 9, breathe: false, armR: [[34, 6], [70, 0]] });
const [hx, hy] = F.hand("R"), P = S.grp(); palm(S, hx + 40, hy, 1.8, { parent: P, sleeve: "blue" }); P.setAttribute("transform", `rotate(90 ${hx + 40} ${hy})`);
[[hx + 150, hy - 120, hx + 190, hy - 160], [hx + 175, hy - 70, hx + 225, hy - 90], [hx + 150, hy + 110, hx + 190, hy + 150]].forEach(([a, b, c, d]) => S.draw(line([a, b], [c, d], 0), 0, 0, { c: DS.c("ink"), w: 9 }));
S.drop(680, 420, 3.0, 0, 0.1); S.drop(150, 500, 2.2, 0, 0.1); S.drop(720, 560, 1.8, 0, 0.1);
S.text("HANDSHAKE?", 960, 210, { size: 200, c: "#FEFE06", halo: "#111111", haloW: 0.09 });
