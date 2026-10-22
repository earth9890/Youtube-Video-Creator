// look: still
// D (minimal symbol): one giant plain energy can on pure black (hot pink, big yellow bolt, "100" on it, no brand, ring-pull lid so it reads
// as a drink, not a battery). Tiny uneasy Dave (white sticker edge) stands at its foot holding the normal-size can: "a hundred of these" without a pyramid of props.
// @include helpers.js
const S = scene(0, 1, { cam: "none" });
{
const PINK = "#ff2d95", BOLT = "#ffe600", SIL = DS.c("gray", 1), SIL2 = DS.c("gray", 2);
const bolt = (x, cy, u, lw, parent) => {
  const b = [[0.12, -0.5], [-0.2, 0.05], [0, 0.05], [-0.12, 0.5], [0.22, -0.1], [0, -0.1]].map(([a, c]) => [x + a * u, cy + c * u]);
  S.draw("M" + b.map((p) => p.join(" ")).join(" L") + " Z", 0, 0, { fill: BOLT, c: IK, w: lw, parent });
};
// a drink can: straight body, tapered neck, lid seen from slightly above with a ring pull. (x, gy) = base centre; w x h
const drink = (x, gy, w, h, lw, o = {}) => {
  const g = S.grp(o.parent), nk = h * 0.07, top = gy - h, lw2 = w * 0.84, ry = w * 0.13, br = w * 0.07;
  // body + neck as one outline
  const d = `M${x - w / 2} ${top + nk} L${x - lw2 / 2} ${top} L${x + lw2 / 2} ${top} L${x + w / 2} ${top + nk} V${gy - br} Q${x + w / 2} ${gy} ${x + w / 2 - br * 1.6} ${gy} H${x - w / 2 + br * 1.6} Q${x - w / 2} ${gy} ${x - w / 2} ${gy - br} Z`;
  S.draw(d, 0, 0, { fill: DS.volHex(PINK), c: IK, w: lw, parent: g });
  S.draw(`M${x - w / 2} ${top + nk} Q${x} ${top + nk + ry * 0.9} ${x + w / 2} ${top + nk}`, 0, 0, { c: IK, w: lw * 0.5, parent: g });
  S.draw(`M${x - w / 2} ${gy - br * 2.2} Q${x} ${gy - br * 2.2 + ry * 0.8} ${x + w / 2} ${gy - br * 2.2}`, 0, 0, { c: IK, w: lw * 0.5, parent: g });
  // lid
  S.draw(circ(x, top, lw2 / 2, ry), 0, 0, { fill: SIL, c: IK, w: lw, parent: g });
  S.draw(circ(x, top + ry * 0.12, lw2 * 0.42, ry * 0.78), 0, 0, { fill: DS.c("gray", 0), c: IK, w: lw * 0.4, parent: g });
  // ring pull: loop + rivet, and the score line of the opening
  S.draw(circ(x + lw2 * 0.17, top - ry * 0.05, lw2 * 0.14, ry * 0.34), 0, 0, { fill: SIL2, c: IK, w: lw * 0.45, parent: g });
  S.draw(circ(x + lw2 * 0.17, top - ry * 0.05, lw2 * 0.07, ry * 0.15), 0, 0, { fill: SIL, c: IK, w: lw * 0.35, parent: g });
  S.draw(circ(x - lw2 * 0.03, top + ry * 0.02, lw2 * 0.04, ry * 0.12), 0, 0, { fill: SIL2, c: IK, w: lw * 0.35, parent: g });
  S.draw(circ(x - lw2 * 0.2, top + ry * 0.1, lw2 * 0.13, ry * 0.3), 0, 0, { c: IK, w: lw * 0.3, parent: g });
  bolt(x, gy - h * 0.52, h * 0.62, lw * 0.8, g);
  return g;
};
S.fill(rect(-200, -200, 2320, 1500), 0, 0, "#000000", 1);
// the giant can
const CX = 900, GY = 1010, CW = 540, CH = 900;
drink(CX, GY, CW, CH, 16);
// cold drops running down it
[[CX - 190, 420, 1.4], [CX + 200, 560, 1.2], [CX - 205, 760, 1.0], [CX + 180, 840, 1.5]].forEach(([x, y, k]) => S.draw(`M${x} ${y - 30 * k} C${x + 6 * k} ${y - 14 * k} ${x + 18 * k} ${y - 2 * k} ${x + 18 * k} ${y + 10 * k} A${18 * k} ${18 * k} 0 0 1 ${x - 18 * k} ${y + 10 * k} C${x - 18 * k} ${y - 2 * k} ${x - 6 * k} ${y - 14 * k} ${x} ${y - 30 * k} Z`, 0, 0, { fill: "#ffd3ea", c: IK, w: 5 }));
S.text("100", CX, 680, { size: 290, c: "#ffffff", halo: "#111111", haloW: 0.1 });
// tiny Dave at its foot, holding the normal-size can, side-eye; a white sticker edge so his ink reads on black
const F = dave(S, CX + 480, GY, "near", { s: 1.15, mood: "worried", look: -10, breathe: false, float: true, pose: "hold" });
const [hx, hy] = F.hand("R", "hold");
drink(hx, hy + 54, 60, 112, DS.w.detail, { parent: F.g });
const edge = F.all.cloneNode(true);
edge.querySelectorAll("path").forEach((n) => { const f = n.getAttribute("fill"); n.setAttribute("stroke", "#ffffff"); n.setAttribute("stroke-width", (parseFloat(n.getAttribute("stroke-width")) || 0) + 22); if (f && f !== "none") n.setAttribute("fill", "#ffffff"); ["stroke-dasharray", "stroke-dashoffset", "pathLength"].forEach((k) => n.removeAttribute(k)); n.style.strokeDasharray = n.style.strokeDashoffset = ""; });
F.all.parentNode.insertBefore(edge, F.all);
// eyes rolled up toward the top of the giant can
[-1, 1].forEach((sd) => { const ex = F.hd[0] + sd * 0.34 * F.r, ey = F.hd[1] - 0.08 * F.r, er = 0.25 * F.r;
  S.draw(circ(ex, ey, er), 0, 0, { fill: "#ffffff", c: IK, w: 5 });
  S.fill(circ(ex - er * 0.38, ey - er * 0.42, er * 0.42), 0, 0, IK, 1); });
}
