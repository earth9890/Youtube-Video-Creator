// look: still
// C2 (the consequence, at its extreme): a frame-filling glowing ring on deep blue; Dave's body is one long noodle spiralling feet first into the black centre.
// His big head stays outside on the right, eyes side-eyeing his own feet, teeth clenched in an "eek". Cartoon stretch, no gore. Words ask the video's question.
// @include helpers.js
const S = scene(0, 1, { cam: "none" });
S.fill("M-200 -200 H2120 V1280 H-200 Z", 0, 0, "#1544cc", 1);
S.fill(circ(960, 540, 1250, 900), 0, 0, radial([[0, "#1544cc", 0], [0.55, "#0f33a8", 0.4], [1, "#081a66", 1]]), 1);
const st = []; for (let i = 0; i < 70; i++) st.push(circ(rnd() * 1920, rnd() * 1080, 1.8 + rnd() * 2.6)); S.fill(st.join(" "), 0, 0, "#ffffff", 0.8);
// the ring (our own stylised look): a hot band, brighter at the bottom, a thin white inner edge, a tight glow
const C = [760, 690], R = 285;
S.fill(circ(C[0], C[1], R * 2.1), 0, 0, DS.glow("#ff8a1a", 0.5), 1);
S.draw(circ(C[0], C[1], R * 1.3), 0, 0, { c: lin([[0, "#ff3d1f", 1], [0.5, "#ff8a1a", 1], [1, "#ffd84a", 1]], 0, 0, 0.25, 1), w: R * 0.3 }).setAttribute("filter", blur(R * 0.03));
S.draw(circ(C[0], C[1], R * 1.1), 0, 0, { c: "#fff4c2", w: R * 0.05 });
S.fill(circ(C[0], C[1], R * 1.06), 0, 0, "#000000", 1);
// the noodle: Dave's body, a short blue tee into long white legs, crossing the ring and spiralling feet first into the centre
const hx = 1530, hy = 655, hr = 212;
{
  const sp = []; for (let i = 0; i <= 90; i++) { const u = i / 90, a = ((70 + u * 600) * Math.PI) / 180, r = R * 0.9 * Math.pow(1 - u, 0.85) + 10; sp.push([C[0] + Math.cos(a) * r, C[1] + Math.sin(a) * r]); }
  const P = catmull([[hx - 10, hy + hr + 40], [hx - 220, hy + hr + 120], [1090, 915], ...sp], 6), n = P.length - 1;
  const L = [0]; for (let i = 1; i <= n; i++) L.push(L[i - 1] + Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]));
  const wd = (u) => (u < 0.08 ? 95 - 400 * u : 46 - 38 * Math.pow((u - 0.08) / 0.92, 0.8));
  for (let pass = 0; pass < 2; pass++) for (let i = 0; i < n; i++) { const u = L[i] / L[n]; S.draw(`M${P[i][0]} ${P[i][1]} L${P[i + 1][0]} ${P[i + 1][1]}`, 0, 0, { c: pass ? (u < 0.08 ? "#2f6fd6" : "#ffffff") : "#111111", w: wd(u) + (pass ? 0 : 14) }); }
  // feet first: two little boots at the very end
  const [ex, ey] = P[n], [px, py] = P[n - 3], ang = Math.atan2(ey - py, ex - px);
  [-1, 1].forEach((sd) => { const bx = ex + Math.cos(ang) * 16 - Math.sin(ang) * sd * 14, by = ey + Math.sin(ang) * 16 + Math.cos(ang) * sd * 14; S.draw(circ(bx, by, 22, 14), 0, 0, { fill: "#ffffff", c: "#111111", w: 6 }); });
}
// arms flung up in panic
[[hx - 80, hy + hr + 20, hx - 360, hy - 40], [hx + 80, hy + hr + 20, hx + 320, hy - 20]].forEach(([x1, y1, x2, y2]) => {
  const d = `M${x1} ${y1} Q${(x1 + x2) / 2} ${y1 + 10} ${x2} ${y2}`;
  S.draw(d, 0, 0, { c: "#111111", w: 44 }); S.draw(d, 0, 0, { c: "#ffffff", w: 26 });
  S.draw(circ(x2, y2, 30), 0, 0, { fill: "#ffffff", c: "#111111", w: 7 });
});
// the head: engine Dave (hair), clipped to the head, with our own face
const hg = clipG(S, circ(hx, hy, hr * 1.1));
const F = S.fig(hx, hy + 309 * (hr / 50), { s: hr / 50, hair: "side", hairC: DS.c("brown"), outfit: "tee", outfitC: DS.c("blue"), c: "#ffffff", pose: "stand", parent: hg }).instant(0);
F.face(0, "flat", 0); if (F.faceG) F.faceG.setAttribute("display", "none");
S.draw(circ(hx, hy, hr * 1.4), 0, 0, { c: DS.c("sky", 1), w: 7 }); S.draw(arc(hx, hy, hr * 1.22, 205, 250), 0, 0, { c: "#ffffff", w: 10, op: 0.8 });
const ink = "#111111";
[-1, 1].forEach((sd) => {
  const ex = hx + sd * hr * 0.36, ey = hy - hr * 0.02;
  S.draw(circ(ex, ey, hr * 0.25), 0, 0, { fill: "#ffffff", c: ink, w: 9 });
  S.fill(circ(ex - hr * 0.12, ey + hr * 0.09, hr * 0.085), 0, 0, ink, 1);
  S.draw(`M${hx + sd * hr * 0.62} ${hy - hr * 0.3} Q${hx + sd * hr * 0.45} ${hy - hr * 0.5} ${hx + sd * hr * 0.14} ${hy - hr * 0.5}`, 0, 0, { c: ink, w: 14 });
});
{ const mw = hr * 0.66, mh = hr * 0.28, mx = hx - mw / 2 - hr * 0.04, my = hy + hr * 0.36;
  S.draw(rrect(mx, my, mw, mh, mh * 0.45), 0, 0, { fill: "#ffffff", c: ink, w: 9 });
  S.draw(`M${mx + 6} ${my + mh / 2} H${mx + mw - 6}`, 0, 0, { c: ink, w: 5 });
  [0.25, 0.5, 0.75].forEach((f) => S.draw(`M${mx + mw * f} ${my + 4} V${my + mh - 4}`, 0, 0, { c: ink, w: 5 })); }
sweat(S, F); S.fill(`M${hx - hr * 1.05} ${hy - hr * 0.45} q${-hr * 0.2} ${hr * 0.4} 0 ${hr * 0.45} q${hr * 0.2} ${-hr * 0.05} 0 ${-hr * 0.45} Z`, 0, 0, DS.c("sky", 1), 1);
// words: condensed so the letters stay huge (>= 22 % of the height) and still fit
const tg = S.grp(); tg.setAttribute("transform", "translate(960 0) scale(0.85 1) translate(-960 0)");
S.text("SPAGHETTI?", 960, 290, { size: 345, c: "#FEFE06", halo: "#111111", haloW: 0.09, parent: tg });
