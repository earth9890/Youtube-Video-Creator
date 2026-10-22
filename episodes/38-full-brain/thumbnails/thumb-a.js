// look: still
// A (clickbait scene mode): a lamp-lit living room. Huge shocked Dave, hair on end; a dial on the back of his head cranked to 100 (still labelled 10%), steam;
// Dave's Brain (a small librarian) stands on his head with a finger to her lips. No flashes, no lightning.
// @include helpers.js
const S = scene(0, 1, { cam: "none" });
DS.room(S, { wall: "earth", floor: "wood", window: false });
S.fill(circ(1300, 480, 1000, 620), 0, 0, DS.glow("#ffe3a8", 0.7), 1);
const D = dial(S, 1060, 640, 250, { v: 100 });
// shaking marks round the needle tip, steam from the top
[0, 1, 2].forEach((i) => S.draw(arc(1060, 640, 215 + i * 26, 20, 56), 0, 0, { c: "#e5383b", w: 12 }));
[[1240, 440, 50], [1322, 360, 66], [1280, 274, 46]].forEach(([x, y, r]) => { S.fill(circ(x, y, r), 0, 0, "#ffffff", 0.97); S.draw(circ(x, y, r), 0, 0, { c: "#1d1b1f", w: 7 }); });
const B = brainy(S, 530, 400, 1.22, { face: "shh", armR: "shush", armL: "hip" });
const F = dave(S, 600, 2090, "near", { s: 4.8, mood: "wow", hair: "spiky", hairC: DS.c("brown"), look: 7, breathe: false });
sweatAt(S, F.hd[0] + F.r * 1.0, F.hd[1] - F.r * 0.2, 0, 2.6); sweatAt(S, F.hd[0] - F.r * 1.05, F.hd[1] + F.r * 0.1, 0, 2.2);
DS.vignette(S, 0.22);
S.text("100% BRAIN?", 1300, 215, { size: 175, c: "#FEFE06", halo: "#111111", haloW: 0.09 });
