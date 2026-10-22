// look: still
// C (clickbait scene mode, punchy): dark-ish night kitchen lit by one warm lamp. HUGE jittery Dave mid-gulp, can tipped to his mouth, spiral eyes, hair on end, sweat, shake lines.
// Behind: a pyramid of bold generic cans (blue/pink/lime/orange, lightning-bolt icon, no brand), cans tumbling mid-air, one bursting with foam.
// @include helpers.js
const S = scene(0, 1, { cam: "none" });
{
const COLS = ["#1e6bff", "#ff2d95", "#9be31b", "#ff8a00"], BOLT = "#ffe600";
// a bold generic can: lightning-bolt icon, silver top. (x, gy) = base centre; 54 x 112 at k = 1
const bcan = (x, gy, k, col, o = {}) => {
  const g = S.grp(o.parent), w = 54 * k, h = 112 * k, lw = k >= 1.6 ? DS.w.near : DS.w.mid;
  S.draw(rrect(x - w / 2, gy - h, w, h, DS.r.xs * k), 0, 0, { fill: DS.volHex(col), c: IK, w: lw, parent: g });
  S.draw(circ(x, gy - h + 1.5 * k, w / 2, 5 * k), 0, 0, { fill: DS.c("gray", 1), c: IK, w: DS.w.hair, parent: g });
  if (o.open) S.draw(circ(x, gy - h + 1.5 * k, w * 0.36, 3.2 * k), 0, 0, { fill: DS.P.ink[1], c: IK, w: DS.w.hair, parent: g });
  else S.draw(circ(x + w * 0.1, gy - h + 1 * k, w * 0.14, 2.6 * k), 0, 0, { fill: DS.c("gray", 2), c: IK, w: DS.w.hair, parent: g });
  const u = h * 0.5, cx = x, cy = gy - h * 0.5;
  const b = [[0.12, -0.5], [-0.2, 0.05], [0, 0.05], [-0.12, 0.5], [0.22, -0.1], [0, -0.1]].map(([a, c]) => [cx + a * u, cy + c * u]);
  S.draw("M" + b.map((p) => p.join(" ")).join(" L") + " Z", 0, 0, { fill: BOLT, c: IK, w: lw * 0.7, parent: g });
  return g;
};
const tilt = (g, deg, x, y) => rot(g, deg, x, y);
// ---- warm mid-tone night kitchen ----
S.fill(rect(-200, -200, 2320, 1500), 0, 0, "#5a4535", 1);
S.fill(rect(-200, 880, 2320, 600), 0, 0, "#3d2c20", 1);
S.fill(rect(-200, 870, 2320, 14), 0, 0, "#2b1e15", 1);
// hanging lamp, top right, pooling light on the can wall
S.draw(line([1740, -20], [1740, 150], 0), 0, 0, { c: IK, w: 8 });
S.draw("M1650 250 L1700 150 H1780 L1830 250 Z", 0, 0, { c: IK, w: 9, fill: "#ffd23f" });
S.fill(circ(1450, 560, 900, 620), 0, 0, DS.glow("#ffe2a0", 0.75), 1);
// ---- the pyramid of cans (back to front: rows bottom-up) ----
const PY = 1380, GY = 1040, K = 1.3, W = 54 * K + 8, STEP = 112 * K * 0.94;
let n = 0;
[7, 6, 5, 4, 3, 2].forEach((cnt, r) => {
  for (let c = 0; c < cnt; c++) bcan(PY + (c - (cnt - 1) / 2) * W, GY - r * STEP, K, COLS[(n++ + r) % 4]);
});
// ---- cans tumbling mid-air, with motion streaks ----
[[1010, 560, 1.15, -38, 0], [1080, 330, 1.0, 62, 1], [1700, 560, 1.2, 28, 3], [1010, 790, 1.0, -70, 2]].forEach(([x, y, k, a, ci]) => {
  const g = S.grp(); bcan(x, y + 56 * k, k, COLS[ci], { parent: g }); tilt(g, a, x, y);
  [-1, 0, 1].forEach((i) => S.draw(line([x + 70 + i * 22, y - 40 + i * 30], [x + 110 + i * 22, y - 90 + i * 30], 0), 0, 0, { c: "#ffffff", w: 7 }));
});
// ---- the one that bursts: foam fountain + droplets ----
const bx = 1330, by = 470, bg = S.grp(); bcan(bx, by + 140, 1.25, COLS[1], { parent: bg, open: true }); tilt(bg, 14, bx, by + 70);
const FOAM = [[0, 0, 46], [-50, -30, 38], [48, -36, 40], [-14, -86, 46], [36, -112, 36], [-62, -116, 30], [10, -160, 28]];
FOAM.forEach(([dx, dy, r]) => S.draw(circ(bx + 18 + dx, by - 40 + dy, r), 0, 0, { fill: "#ffffff", c: IK, w: DS.w.mid }));
for (let i = 0; i < 7; i++) { const a = -150 + i * 20, rr = 200 + (i % 3) * 30; S.draw(line([bx + 18 + Math.cos(a * Math.PI / 180) * 130, by - 100 + Math.sin(a * Math.PI / 180) * 130], [bx + 18 + Math.cos(a * Math.PI / 180) * rr, by - 100 + Math.sin(a * Math.PI / 180) * rr], 0), 0, 0, { c: "#ffffff", w: 9 }); }
[[1130, 380, 1.6, 1], [1210, 300, 1.2, 1], [1500, 330, 1.5, 1], [1580, 450, 1.1, 1]].forEach(([x, y, k, c]) => dropP(S, x, y, k, { name: "pink", w: "detail" }));
// ---- shake ghosts behind Dave, then HUGE Dave mid-gulp ----
const DX = 560, DGY = 1900;
const F = dave(S, DX, DGY, "near", { s: 4.2, mood: "wow", look: 0, hair: "spiky", breathe: false, armL: [[-35, -20], [-62, -82]], armR: [[62, -26], [52, -88]] });
const [hx, hy] = F.hand("R"), R = F.r, [hdx, hdy] = F.hd;
// hair straight up
const sp = [-150, -128, -106, -84, -62, -40, -22];
const zig = []; sp.forEach((a, i) => { const t = a * Math.PI / 180; zig.push([hdx + Math.cos(t) * R * 0.96, hdy + Math.sin(t) * R * 0.96]); zig.push([hdx + (Math.cos(t) * 0.9 + (i - 3) * 0.05) * R, hdy - R * (1.28 + (i % 2) * 0.22)]); });
// ponytail: spikes as thin triangles
sp.forEach((a, i) => { const t = a * Math.PI / 180, bx0 = hdx + Math.cos(t) * R * 0.97, by0 = hdy + Math.sin(t) * R * 0.97, tx = hdx + (i - 3) * R * 0.12, ty = hdy - R * (1.3 + (i % 2) * 0.22), nx = Math.cos(t + 0.28) * R * 0.97, ny = Math.sin(t + 0.28) * R * 0.97;
  const d = `M${bx0} ${by0} L${tx} ${ty} L${hdx + nx} ${hdy + ny}`; S.fill(d + " Z", 0, 0, "#8a5a35", 1); S.draw(d, 0, 0, { c: IK, w: 12 }); });
// spiral eyes
const spiral = (cx, cy, r, turns, a0) => { let d = ""; for (let i = 0; i <= 60; i++) { const f = i / 60, a = a0 + f * turns * 2 * Math.PI, rr = r * f; d += (i ? " L" : "M") + (cx + Math.cos(a) * rr) + " " + (cy + Math.sin(a) * rr); } return d; };
[-1, 1].forEach((sd, i) => { const ex = hdx + sd * 0.34 * R, ey = hdy - 0.08 * R;
  S.draw(circ(ex, ey, 0.27 * R), 0, 0, { fill: "#ffffff", c: IK, w: 12 });
  S.draw(spiral(ex + (i ? 6 : -6), ey + (i ? -5 : 5), 0.2 * R, 2.4, i * 2), 0, 0, { c: IK, w: 9 }); });
// the can, tipped to his mouth (top at the mouth, bottom out to the right), gripped mid-body
const mx = hdx + 14, my = hdy + 0.55 * R, kc = 2.9, ch = 112 * kc, phi = -118, cg = S.grp();
bcan(mx, my + ch, kc, COLS[0], { parent: cg, open: true }); tilt(cg, phi, mx, my);
const pr = phi * Math.PI / 180, gd = 0.62 * ch, gx = mx - gd * Math.sin(pr), gy = my + gd * Math.cos(pr);
// own right arm: shoulder -> elbow (out and down) -> grip
const sh0 = [F.cx + 24 * F.s, F.sh[1] + 10 * F.s], el0 = [sh0[0] + 66 * F.s, sh0[1] + 2 * F.s];
F.P.armR.style.display = "none";
el("path", { d: `M${sh0[0]} ${sh0[1]} L${el0[0]} ${el0[1]} L${gx + 10} ${gy + 30}`, fill: "none", stroke: IK, "stroke-width": F.P.armR.getAttribute("stroke-width"), "stroke-linecap": "round", "stroke-linejoin": "round" }, F.g);
S.draw(circ(gx + 4, gy + 22, 36), 0, 0, { fill: "#f3e5d2", c: IK, w: 10 });
// vibration ghosts of the head
[-26, 26].forEach((d) => { const p = S.draw(circ(hdx + d, hdy - d * 0.3, R), 0, 0, { c: "#fff3c4", w: 7 }); F.all.parentNode.insertBefore(p, F.all); });
// sweat, shake lines
[[hdx - R * 1.15, hdy - R * 0.35, 3.0], [hdx - R * 1.3, hdy + R * 0.2, 2.4], [hdx - R * 0.9, hdy - R * 0.9, 2.2]].forEach(([x, y, k]) => dropP(S, x, y, k, { name: "sky", w: "detail" }));
for (let i = 0; i < 9; i++) { const a = (160 + i * 14) * Math.PI / 180, r0 = R * 1.12, r1 = R * (1.32 + (i % 2) * 0.1); S.draw(line([hdx + Math.cos(a) * r0, hdy + Math.sin(a) * r0], [hdx + Math.cos(a) * r1, hdy + Math.sin(a) * r1], 0), 0, 0, { c: BOLT, w: 12 }); }
// red starburst badge
const bcx = 1730, bcy = 800, bgp = S.grp(); let bd = "";
for (let i = 0; i < 20; i++) { const a = i * Math.PI / 10, r = i % 2 ? 108 : 150; bd += (i ? " L" : "M") + (bcx + Math.cos(a) * r) + " " + (bcy + Math.sin(a) * r * 0.82); }
S.draw(bd + " Z", 0, 0, { fill: "#e5383b", c: IK, w: 9, parent: bgp });
S.text("CAN 99", bcx, bcy + 22, { size: 64, c: "#ffffff", parent: bgp, halo: "#111111", haloW: 0.12 });
S.text("100 CANS?", 1000, 220, { size: 210, c: "#FEFE06", halo: "#111111", haloW: 0.09 });
}
