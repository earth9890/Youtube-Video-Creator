// look: still
// C2 (the consequence, at its extreme): an open fridge on the left spews an avalanche of eggs and chicken legs; Dave is buried to the chin in it,
// cheeks stuffed, face going green, eyes half-shut and queasy. One flat royal-blue field. Words: 1 DAY?
// @library auto
// @include helpers.js
const S = scene(0, 1, { cam: "none" });
S.bg("flat", { sky: "#1d4ed8", ground: "#1d4ed8", hy: 1100 });
let sd39 = 39; const rn39 = () => ((sd39 = (sd39 * 16807) % 2147483647) / 2147483647);
const rot = (g, x, y, a) => { const w = S.grp(); w.appendChild(g); w.setAttribute("transform", `rotate(${a} ${x} ${y})`); return w; };
const item = (x, y, k, a, leg) => rot(L.put(S, leg ? "prop-chicken-leg" : "prop-egg", x, y, { s: k, t: 0 }), x, y, a);
const hx = 1190, hy = 630, R = 250;
S.fill(circ(hx, hy, 640, 560), 0, 0, DS.glow("#5b8cff", 0.7), 1);
// the fridge, door swung open to the left, shelves packed
L.put(S, "kit-fridge-open", 400, 1030, { s: 1.7, t: 0 });
[[328, 6], [517, 5], [705, 6]].forEach(([sy, n]) => { for (let i = 0; i < n; i++) item(285 + i * 50 + rn39() * 10, sy - 52 - rn39() * 8, 0.8, rn39() * 30 - 15, i === 2 && sy === 517); });
// the avalanche: rows from the back (top) to the front (bottom); T(x) = top of the pile
const T = (x) => x < 620 ? 610 + (620 - x) * 0.18 : x < 1900 ? 610 + (x - 620) * 0.13 : 776;
const F = (x) => { const d = Math.abs(x - hx); return d < 0.82 * R ? hy + 0.98 * R : hy + 0.88 * R; }; // in front of Dave below this
const back = [], front = [];
for (let y = 560; y < 1200; y += 76) for (let x = -60; x < 2000; x += 104) {
  const px = x + (rn39() - 0.5) * 50 + ((y / 76) % 2) * 52, py = y + (rn39() - 0.5) * 30;
  if (py < T(px)) continue;
  const it = [px, py, 1.3 + (py - 600) / 700, rn39() * 80 - 40, rn39() < 0.13];
  if (it[4]) it[3] = rn39() * 360;
  (py > F(px) ? front : back).push(it);
}
S.fill(`M-20 1100 L-20 ${T(0) + 40} L620 ${T(620) + 40} L1920 ${T(1900) + 40} L1940 1100 Z`, 0, 0, "#c79a5c", 1);
back.forEach((it) => item(...it));
// eggs and legs in mid-air, still pouring out of the fridge
[[640, 470, 1.05, 30, 0], [760, 380, 0.95, -25, 1], [700, 600, 1.1, 60, 0], [860, 520, 1, 140, 1]].forEach(([x, y, k, a, l]) => item(x, y, k, a, l));
S.draw("M585 455 Q600 430 610 420 M690 335 Q705 320 715 312 M612 590 Q628 565 640 555", 0, 0, { c: "#ffffff", w: 10, op: 0.55 });
// Dave, buried to the chin: head only, cheeks puffed out, face going green from the chin up
const LK = -12, dx = LK * 5 * 0.8; // eyes slide toward the fridge: more is coming
const D = dave(S, hx, hy + 309 * 5, "near", { s: 5, mood: "worried", look: LK, breathe: false, float: true });
const hg = D.P.head.parentNode, kids = [...hg.children];
kids.slice(2, kids.length - 1).forEach((c) => c.remove()); // no body under the pile
const fg = kids[kids.length - 1]; [...fg.children].slice(1).forEach((c) => c.remove()); // keep the eyes, redraw brows + mouth
const gr = el("linearGradient", { id: "ep39-queasy", gradientUnits: "userSpaceOnUse", x1: hx, y1: hy - R, x2: hx, y2: hy + R }, dsDefs());
[[0, "#ffffff"], [0.45, "#f6f9f0"], [0.64, "#b6e08f"], [1, "#74bf4e"]].forEach(([o, c]) => el("stop", { offset: o, "stop-color": c }, gr));
const bulge = (th) => 0.2 * (Math.exp(-(((th - 0.55) / 0.3) ** 2)) + Math.exp(-(((th - (Math.PI - 0.55)) / 0.3) ** 2))); // th from +x, y down
const pts = []; for (let i = 0; i < 160; i++) { const th = (i / 160) * Math.PI * 2, rr = R * (1 + bulge(th)); pts.push([hx + Math.cos(th) * rr, hy + Math.sin(th) * rr]); }
D.P.head.setAttribute("d", "M" + pts.map((p) => p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" L") + " Z");
D.P.head.setAttribute("fill", "url(#ep39-queasy)");
const ink = { c: DS.c("ink"), w: DS.w.near * 1.1, parent: hg };
S.draw(`M${hx + dx - 0.55 * R} ${hy - 0.36 * R} Q${hx + dx - 0.36 * R} ${hy - 0.44 * R} ${hx + dx - 0.14 * R} ${hy - 0.58 * R}`, 0, 0, ink); // worried brows
S.draw(`M${hx + dx + 0.55 * R} ${hy - 0.36 * R} Q${hx + dx + 0.36 * R} ${hy - 0.44 * R} ${hx + dx + 0.14 * R} ${hy - 0.58 * R}`, 0, 0, ink);
const mx = hx + dx * 0.6, my = hy + 0.5 * R;
S.draw(`M${mx - 0.24 * R} ${my} Q${mx - 0.12 * R} ${my - 0.08 * R} ${mx} ${my} Q${mx + 0.12 * R} ${my + 0.08 * R} ${mx + 0.24 * R} ${my}`, 0, 0, ink); // lips pressed shut
S.draw(`M${mx - 0.36 * R} ${my - 0.12 * R} Q${mx - 0.44 * R} ${my} ${mx - 0.36 * R} ${my + 0.12 * R} M${mx + 0.36 * R} ${my - 0.12 * R} Q${mx + 0.44 * R} ${my} ${mx + 0.36 * R} ${my + 0.12 * R}`, 0, 0, { c: DS.c("ink"), w: DS.w.mid, parent: hg }); // cheeks full
sweatAt(S, hx + R * 1.12, hy - R * 0.45, 0, 2.6); sweatAt(S, hx - R * 1.14, hy - R * 0.2, 0, 2.1);
// the front of the pile, over his neck
S.fill(`M${hx - 1.3 * R} 1100 L${hx - 1.3 * R} ${hy + 1.02 * R} L${hx + 1.3 * R} ${hy + 1.02 * R} L${hx + 1.3 * R} 1100 Z`, 0, 0, "#c79a5c", 1);
front.forEach((it) => item(...it));
[[1560, 770, 1.55, 165], [300, 860, 1.6, -35], [880, 1000, 1.65, 200], [1780, 980, 1.6, 20]].forEach(([x, y, k, an]) => item(x, y, k, an, 1)); // drumsticks on top of the heap
S.text("1 DAY?", 1290, 292, { size: 330, c: "#FEFE06", halo: "#111111", haloW: 0.09 });
