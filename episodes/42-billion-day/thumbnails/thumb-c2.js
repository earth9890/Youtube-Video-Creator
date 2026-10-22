// look: still
// C2 (consequence at its extreme): Dave drowning in a towering avalanche of generic green notes on flat deep blue. Only his panicked face
// and one raised hand gripping a stopwatch clear the pile. Words: the real deadline from the video (the 6:45 pm wire cut-off). Generic notes, nothing flashes.
// @include helpers.js
const S = scene(0, 1, { cam: "none" });
S.fill(rect(-200, -200, 2320, 1480), 0, 0, "#1f4fc4", 1);
let sd42 = 42; const rng42 = () => ((sd42 = (sd42 * 16807) % 2147483647) / 2147483647);
const topAt = (P, x) => { for (let i = 1; i < P.length; i++) if (x <= P[i][0]) { const [x0, y0] = P[i - 1], [x1, y1] = P[i]; return y0 + ((y1 - y0) * (x - x0)) / (x1 - x0); } return P[P.length - 1][1]; };
// fill a region (everything below the top line P) with a solid dark mass, then a heap of notes at random angles
const heap = (P, n, k0, k1) => {
  S.fill(`M-200 1300 L${P.map(([x, y]) => `${x} ${y + 40}`).join(" L")} L2120 1300 Z`, 0, 0, "#1d6b33", 1);
  for (let i = 0; i < n; ) {
    const x = -80 + rng42() * 2080, y = -120 + rng42() * 1260;
    if (y < topAt(P, x)) continue;
    const nt = note(S, x, y, k0 + rng42() * (k1 - k0), { tone: rng42() < 0.4 ? 0 : 1 });
    nt.setAttribute("transform", `rotate(${(rng42() - 0.5) * 80} ${x} ${y})`); i++;
  }
};
// back mass: a wall of notes towering on the right, sloping down behind Dave
heap([[-200, 640], [300, 610], [700, 520], [1000, 400], [1220, 230], [1380, 40], [1460, -200], [2120, -200]], 100, 1.25, 1.65);
// notes spilling off the crest
[[1300, 120, -30], [1180, 300, 22], [1500, 40, 40]].forEach(([x, y, a]) => note(S, x, y, 1.1, {}).setAttribute("transform", `rotate(${a} ${x} ${y})`));
// Dave: head clears the pile, one arm straight up out of it
const F = dave(S, 800, 2060, "near", { s: 4.6, mood: "worried", look: 2, breathe: false, armR: [[75, -5], [105, -75]] });
// panic face: a clenched "eek" grimace over the worried mouth, two sweat drops
const R = F.r, mx = F.hd[0] + 2 * F.s * 0.8, my = F.hd[1] + 0.52 * R, gw = 0.46 * R, gh = 0.2 * R;
S.draw(rrect(mx - gw, my - gh, 2 * gw, 2 * gh, gh * 0.8), 0, 0, { c: "#1d1b1f", w: 9, fill: "#ffffff" });
S.draw(`M${mx - gw} ${my} H${mx + gw} ` + [-0.5, 0, 0.5].map((f) => `M${mx + f * gw} ${my - gh} V${my + gh}`).join(" "), 0, 0, { c: "#1d1b1f", w: 6 });
sweat(S, F); S.fill(circ(F.hd[0] - R * 1.05, F.hd[1] - R * 0.2, R * 0.09, R * 0.13), 0, 0, DS.c("sky", 2), 1);
// front mass: covers him to the chin
heap([[-200, 880], [300, 880], [560, 960], [1050, 960], [1250, 880], [1450, 820], [1700, 760], [2120, 720]], 55, 1.3, 1.7);
// bury the upper arm so only the forearm clears the pile
[[840, 950, -6], [1080, 850, 18], [1230, 790, -26], [1380, 830, 8]].forEach(([x, y, a]) => note(S, x, y, 1.15, {}).setAttribute("transform", `rotate(${a} ${x} ${y})`));
// stopwatch in the raised hand
const [hx, hy] = F.hand("R"), sx = hx + 10, sy = hy - 135, sr = 135;
S.draw(rrect(sx - 22, sy - sr - 52, 44, 44, 8), 0, 0, { c: "#1d1b1f", w: 9, fill: "#c9c9c9" });
S.draw(circ(sx, sy, sr), 0, 0, { c: "#1d1b1f", w: 11, fill: "#ffffff" });
S.draw(rays(sx, sy, sr * 0.74, sr * 0.9, 12, -Math.PI / 2), 0, 0, { c: "#1d1b1f", w: 8 });
S.draw(`M${sx} ${sy} L${sx - 22} ${sy - sr * 0.72}`, 0, 0, { c: "#e5383b", w: 13 });
S.fill(circ(sx, sy, 13), 0, 0, "#1d1b1f", 1);
// the fist gripping its rim
S.draw(rrect(hx - 44, sy + sr - 40, 88, 74, 34), 0, 0, { c: "#1d1b1f", w: 9, fill: "#ffffff" });
S.draw([-14, 14].map((f) => `M${hx + f} ${sy + sr - 40} V${sy + sr - 6}`).join(" "), 0, 0, { c: "#1d1b1f", w: 6 });
S.text("BY 6:45?", 960, 280, { size: 340, c: "#FEFE06", halo: "#111111", haloW: 0.09 });
