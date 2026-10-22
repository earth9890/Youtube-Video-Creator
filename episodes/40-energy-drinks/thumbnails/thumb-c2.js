// look: still
// C2 (consequence at its extreme): the twist, 25 litres of water. Dave's body is a sagging, over-filled water balloon (his blue tee riding up
// on top), hands to his cheeks in panic, eyes vibrating, standing in a puddle of fizz with a few plain bolt cans sticking out. Flat hot-orange field.
// @include helpers.js
const S = scene(0, 1, { cam: "none" });
{
const BG = "#ff5a1f", COLS = ["#1e6bff", "#ff2d95", "#9be31b"], BOLT = "#ffe600";
// a bold generic can (same as thumb-c.js): lightning-bolt icon, silver top. (x, gy) = base centre
const bcan = (x, gy, k, col, o = {}) => {
  const g = S.grp(o.parent), w = 54 * k, h = 112 * k, lw = k >= 1.6 ? DS.w.near : DS.w.mid;
  S.draw(rrect(x - w / 2, gy - h, w, h, DS.r.xs * k), 0, 0, { fill: DS.volHex(col), c: IK, w: lw, parent: g });
  S.draw(circ(x, gy - h + 1.5 * k, w / 2, 5 * k), 0, 0, { fill: DS.c("gray", 1), c: IK, w: DS.w.hair, parent: g });
  S.draw(circ(x + w * 0.1, gy - h + 1 * k, w * 0.14, 2.6 * k), 0, 0, { fill: DS.c("gray", 2), c: IK, w: DS.w.hair, parent: g });
  const u = h * 0.5, cy = gy - h * 0.5;
  const b = [[0.12, -0.5], [-0.2, 0.05], [0, 0.05], [-0.12, 0.5], [0.22, -0.1], [0, -0.1]].map(([a, c]) => [x + a * u, cy + c * u]);
  S.draw("M" + b.map((p) => p.join(" ")).join(" L") + " Z", 0, 0, { fill: BOLT, c: IK, w: lw * 0.7, parent: g });
  return g;
};
S.fill(rect(-200, -200, 2320, 1500), 0, 0, BG, 1);
// ---- puddle of fizz round his feet, cans sticking out ----
S.draw("M-50 1030 Q300 1000 600 1030 Q960 1060 1320 1030 Q1620 1000 1970 1030 V1200 H-50 Z", 0, 0, { fill: "#c9f23a", c: IK, w: 12 });
[[180, 1060, 12], [330, 1045, 8], [1600, 1055, 10], [1760, 1040, 14], [1450, 1065, 7], [520, 1065, 9]].forEach(([x, y, r]) => S.draw(circ(x, y, r), 0, 0, { fill: "#f4ffd0", c: IK, w: 5 }));
[[230, 1075, 1.8, -28, 0], [1710, 1070, 1.9, 24, 1], [440, 1085, 1.3, 62, 2]].forEach(([x, gy, k, a, ci]) => { const g = S.grp(); bcan(x, gy, k, COLS[ci], { parent: g }); rot(g, a, x, gy); });
// ---- Dave, wobbling: a tight round sphere of water, tee riding up on top ----
const dv = S.grp(), BX = 960, BY = 728, BR = 350, BODY = circ(BX, BY, BR * 1.05, BR);
const bal = S.grp(dv);
S.draw(BODY, 0, 0, { fill: "#8fdcff", c: IK, w: 0, parent: bal });
const inner = clipTo(S.grp(bal), BODY), WL = 690;
const wave = `M${BX - 420} ${WL} Q${BX - 315} ${WL - 44} ${BX - 210} ${WL} T${BX} ${WL} T${BX + 210} ${WL} T${BX + 420} ${WL}`;
S.fill(wave + " V1200 H" + (BX - 420) + " Z", 0, 0, "#2f97ea", 1, inner);
S.draw(wave, 0, 0, { c: "#e2f6ff", w: 10, parent: inner });
[[790, 900, 18], [850, 800, 11], [1130, 940, 20], [1170, 790, 12], [1050, 870, 9], [930, 1000, 10]].forEach(([x, y, r]) => S.draw(circ(x, y, r), 0, 0, { c: "#e2f6ff", w: 6, parent: inner }));
S.fill(`M${BX - 420} 360 H${BX + 420} V600 Q${BX} 660 ${BX - 420} 600 Z`, 0, 0, DS.c("blue"), 1, inner);
S.draw(`M${BX - 420} 600 Q${BX} 660 ${BX + 420} 600`, 0, 0, { c: IK, w: 10, parent: inner });
S.draw(`M${BX - 245} 830 Q${BX - 255} 700 ${BX - 150} 640`, 0, 0, { c: "#ffffff", w: 26, parent: bal });
S.fill(circ(BX - 100, 668, 15), 0, 0, "#ffffff", 1, bal);
S.draw(BODY, 0, 0, { c: IK, w: 16, parent: bal });
// stubby arms flailing out of the sides, motion arcs
[-1, 1].forEach((sd) => { const x0 = BX + sd * BR * 1.04, y0 = BY - 80;
  S.draw(`M${x0} ${y0} L${x0 + sd * 120} ${y0 - 70} L${x0 + sd * 165} ${y0 - 190}`, 0, 0, { c: IK, w: 20, parent: dv });
  [0, 1].forEach((i) => S.draw(arc(x0 + sd * 165, y0 - 190, 70 + i * 40, sd < 0 ? 200 : -70, sd < 0 ? 250 : -20), 0, 0, { c: "#ffffff", w: 10, parent: dv })); });
// head on top
const HS = 0.88, HY = 440;
const F = dave(S, BX, HY + 1298 * HS, "near", { s: 4.2 * HS, mood: "worried", look: 0, breathe: false, float: true, parent: S.grp(dv) });
["body", "legL", "legR", "armL", "armR", "out0"].forEach((k) => F.P[k] && (F.P[k].style.display = "none"));
const R = F.r, [hx, hy] = F.hd;
// wide eyes, pin pupils
[-1, 1].forEach((sd) => { const ex = hx + sd * 0.34 * R, ey = hy - 0.08 * R, er = 0.26 * R;
  S.draw(circ(ex, ey, er), 0, 0, { fill: "#ffffff", c: IK, w: 11, parent: dv });
  S.fill(circ(ex, ey, er * 0.28), 0, 0, IK, 1, dv);
});
// shake lines and sweat
[-1, 1].forEach((sd) => [0, 1, 2].forEach((i) => { const a = (sd < 0 ? 180 : 0) + (i - 1) * 24, t = a * Math.PI / 180, r0 = R * 1.3, r1 = R * 1.6;
  S.draw(line([hx + Math.cos(t) * r0, hy + Math.sin(t) * r0], [hx + Math.cos(t) * r1, hy + Math.sin(t) * r1], 0), 0, 0, { c: "#ffffff", w: 12, parent: dv }); }));
dropP(S, hx + R * 1.12, hy + R * 0.05, 2.2, { name: "sky", w: "detail", parent: dv });
rot(dv, -5, BX, 1050);
S.text("25 LITRES?", 960, 228, { size: 250, c: "#FEFE06", halo: "#111111", haloW: 0.09 });
}
