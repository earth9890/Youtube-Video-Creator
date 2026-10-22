// look: still
// D (the minimal symbol): one perfect thin glowing ring, huge and centred on pure black. Tiny Dave floats alone in the middle of the dark like the pupil of an eye, waving his postcard home.
// No words: the ring and the postcard ask the question. The ring is our own stylised design.
// @include helpers.js
const S = scene(0, 1, { cam: "none" });
S.fill("M-200 -200 H2120 V1280 H-200 Z", 0, 0, "#000000", 1);
const C = [960, 540], R = 455;
const warm = lin([[0, "#ff5a1f", 1], [0.55, "#ff9a1f", 1], [1, "#ffd84a", 1]], 0, 0, 0.2, 1);
S.draw(circ(C[0], C[1], R), 0, 0, { c: "#ff8a1a", w: 80, op: 0.5 }).setAttribute("filter", blur(28));
S.draw(circ(C[0], C[1], R), 0, 0, { c: warm, w: 28, op: 0.95 }).setAttribute("filter", blur(6));
S.draw(circ(C[0], C[1], R), 0, 0, { c: "#fff4cc", w: 6 });
// tiny Dave alone in the middle of the dark (the pupil of the eye), postcard held high
const fx = C[0] - 10, fy = C[1] + 130;
const F = dave(S, fx, fy, "near", { s: 0.8, c: "#ffffff", pose: "wave", mood: "happy", look: -3 });
const [px, py] = F.hand("R", "wave");
{ const w = 150, h = 100, x = px - 26, y = py - h + 10, g = S.grp(F.all);
  S.draw(rrect(x, y, w, h, 6), 0, 0, { fill: "#fff8e6", c: "#ffffff", w: 4, parent: g });
  S.fill(rect(x + w - 34, y + 10, 24, 28), 0, 0, "#e5383b", 1, g);
  [0.55, 0.75].forEach((f) => S.draw(`M${x + 14} ${y + h * f} H${x + w - 44}`, 0, 0, { c: "#9aa3ad", w: 3, parent: g }));
  g.setAttribute("transform", `rotate(-12 ${x} ${y + h})`); }
