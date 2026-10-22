// look: still
// A (clickbait scene mode): Dave's kitchen at night. A hanging lamp pools yellow light on a table of ten rows of plain cans running back into the frame; the open fridge glows cold blue at the side.
// Huge shocked Dave in front, hair on end, one hand shaking round a single open can; one can tips off the table edge mid-air. Behind: the Brain librarian leans out of a doorway, finger to lips, a short queue of sleepy blobs behind her.
// Wrongness: a hundred cans, the premise the video really shows. Text asks the question (not the title). No brand, no lightning bolts, no hospital imagery.
// @include helpers.js
const S = scene(0, 1, { cam: "none" });
// warm mid-tone kitchen (ink lines must read): wall, floor
S.fill(rect(-200, -200, 2320, 1500), 0, 0, "#7a644d", 1);
S.fill(rect(-200, 700, 2320, 600), 0, 0, "#5e4630", 1);
S.fill(rect(-200, 690, 2320, 14), 0, 0, "#463220", 1);
// the open fridge, right edge: bright cold inside, door swung open
S.draw("M1740 120 L1620 160 V740 L1740 760 Z", 0, 0, { c: "#1d1b1f", w: 9, fill: "#ffffff" });
S.draw(rrect(1720, 120, 260, 640, 18), 0, 0, { c: "#1d1b1f", w: 9, fill: "#e9e4dc" });
S.draw(rect(1744, 146, 212, 588), 0, 0, { c: "#1d1b1f", w: 6, fill: "#bfe6ff" });
[300, 450, 600].forEach((y) => S.draw(line([1744, y], [1956, y], 0), 0, 0, { c: "#6f757b", w: 8 }));
S.fill(circ(1700, 440, 520), 0, 0, DS.glow("#bfe6ff", 0.45), 1);
// the doorway behind, left of the cans: a warm corridor with the librarian and a queue of sleepy grey blobs
S.draw(rrect(1130, 130, 210, 440, 12), 0, 0, { c: "#1d1b1f", w: 9, fill: "#c9a46e" });
visitor(S, 1180, 560, 0.5, { kind: "ado" }); visitor(S, 1245, 560, 0.6, { kind: "ado" });
const B = brainy(S, 1290, 566, 0.7, { face: "shh", armR: "shush" });
// the table: top, lit by the lamp
S.draw("M780 700 H1980 V1100 H700 Z", 0, 0, { c: "#1d1b1f", w: 9, fill: "#a9804e" });
// hanging lamp and its pool of light on the cans
S.draw(line([1560, -20], [1560, 250], 0), 0, 0, { c: "#1d1b1f", w: 8 });
S.draw("M1450 360 L1500 250 H1620 L1670 360 Z", 0, 0, { c: "#1d1b1f", w: 9, fill: "#ffd23f" });
// ten rows of ten plain cans, back to front
const G = canGrid(S, 1400, {});
G.g.setAttribute("transform", "translate(120 190) translate(1400 880) scale(1.55) translate(-1400 -880)");
S.fill(circ(1500, 820, 620, 300), 0, 0, DS.glow("#ffe9a8", 0.55), 1);
// one can tipping off the table, a few drops flying
const fc = S.grp(); can(S, 1010, 640, 2.2, { parent: fc }); rot(fc, 34, 1010, 520);
[[1120, 510, 1.4], [1160, 600, 1.1], [1075, 440, 1.0], [1170, 680, 0.8]].forEach(([x, y, k]) => dropP(S, x, y, k, { name: "orange", w: "detail" }));
// huge shocked Dave, hair on end, both hands up, one holding the open can and shaking
const F = dave(S, 520, 1900, "near", { s: 4.2, mood: "wow", look: 0, pose: "armsUp", hair: "spiky", breathe: false });
const [hx, hy] = F.hand("R", "armsUp");
can(S, hx, hy + 190, 3.4, { open: true });
[0, 1, 2].forEach((i) => S.draw(arc(hx, hy - 30, 220 + i * 54, -160, -110), 0, 0, { c: "#ffd23f", w: 12 }));
[0, 1, 2].forEach((i) => S.draw(arc(hx, hy - 30, 220 + i * 54, -70, -20), 0, 0, { c: "#ffd23f", w: 12 }));
S.text("100 CANS?", 960, 220, { size: 200, c: "#FEFE06", halo: "#111111", haloW: 0.09 });
