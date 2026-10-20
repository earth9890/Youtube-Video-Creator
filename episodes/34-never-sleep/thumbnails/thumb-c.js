// look: still
// C (clickbait scene mode, 2026-10-20): Dave's den at 3 a.m., the lamp on. Huge Dave tries the dolphin method: one eye
// shut and snoring "Z", the other wide open and bloodshot. A duck on his pillow does the same, properly.
// Text "HALF ASLEEP?": the video's half-a-brain chapter (dolphins and ducks sleep one half at a time; "Dave tries the
// dolphin method, and closes one eye. Both halves of his brain stay awake").
// @include kit.js
const S = scene(0, 1, { cam: "none" });
DS.room(S, { wall: "wood", floor: "floor", window: false });
nightWin(S, 1160, 300, 260, 220);
wallClock(S, 880, 430, 88, 3, 0);
S.fill(circ(1830, 380, 520), 0, 0, DS.glow("#ffe08a", 0.7), 1); // the lamp
lamp(S, 1830, 960);
// the bed; a duck on the pillow, one eye open
const Bd = bed(S, 1120, 960, 640, { blanket: "sky" });
Bd.bl && Bd.bl(1, "sky");
duck(S, 1300, Bd.top - 20, 1.5, { R: "open" });
// huge Dave, head drooping: one eye shut, one wide open and bloodshot
const F = who(S, 420, 1900, "near", { s: 4.3, hair: "side", hairC: DS.c("brown"), outfitC: DS.c("blue"), mood: "wow", look: 6, breathe: false });
wink(S, F, 0, -1, 6);
const ex = F.hd[0] + 6 * F.s * 0.8 + 0.34 * F.r, ey = F.hd[1] - 0.1 * F.r, er = 0.33 * F.r;
S.draw(circ(ex, ey, er), 0, 0, { c: DS.c("ink"), w: 11, fill: "#ffffff", parent: F.g }); // the open eye, far too wide
S.fill(circ(ex + 10, ey + 2, 0.075 * F.r), 0, 0, DS.c("ink"), 1, F.g); S.fill(circ(ex + 5, ey - 4, 0.025 * F.r), 0, 0, "#ffffff", 1, F.g);
[[200, 0.95, 0.45], [150, 0.92, 0.5], [330, 0.95, 0.4], [20, 0.93, 0.45]].forEach(([a, r0, r1]) => { const q = (a * Math.PI) / 180, c = Math.cos(q), s = Math.sin(q);
  S.draw(smooth([[ex + c * er * r0, ey + s * er * r0], [ex + c * er * 0.7 + s * 6, ey + s * er * 0.7 - c * 6], [ex + c * er * r1, ey + s * er * r1]]), 0, 0, { c: DS.c("red"), w: 5, parent: F.g }); });
F.g.setAttribute("transform", "rotate(-5 420 1900)"); // head droops (wink + veins ride along)
[["Z", 140, 330, 120], ["z", 80, 220, 86]].forEach(([z, x, y, size]) => S.text(z, x, y, { size, c: "#ffffff", halo: "#111111", haloW: 0.12 }));
S.text("HALF ASLEEP?", 960, 205, { size: 190, c: "#FEFE06", halo: "#111111", haloW: 0.09 });
