
// ---------- ant-level sets ----------
const xf = (g, deg, cx, cy, k = 1) => (g.setAttribute("transform", `translate(${cx} ${cy}) rotate(${deg}) scale(${k}) translate(${-cx} ${-cy})`), g);
const R4 = (v) => Math.round(v * 10) / 10;
// the breakfast table seen from five millimetres up: DS.room's plank floor is the tabletop; far away stand a mug and a jam jar. Call as tbl(S, DS.room(S, TBL)).
const TBL = { wall: "wall", floor: "wood", window: false };
const tbl = (S, R, far = true) => {
  const g = S.grp(); S.g.insertBefore(g, R.g.nextSibling);
  if (far) {
    const L = "far", by = R.hy + 6;
    DS.shape(S, `M1490 ${by - 214} H1640 L1650 ${by} H1480 Z`, "blue", { layer: L, parent: g, flat: true });
    S.draw(`M1640 ${by - 180} Q1730 ${by - 170} 1720 ${by - 110} Q1710 ${by - 60} 1646 ${by - 54}`, S.start, 0, { c: DS.c("blue", 0, L), w: DS.w.near, parent: g });
    DS.shape(S, rrect(240, by - 150, 130, 150, DS.r.sm), "red", { layer: L, parent: g, flat: true });
    DS.shape(S, rrect(232, by - 186, 146, 40, DS.r.xs), "gold", { layer: L, parent: g, flat: true });
  }
  return R;
};
// a toast crumb, bigger than Dave's head: crust rim, soft inside, pores. Feet at (cx, gy); about 230k wide, 160k tall
const crumb = (S, cx, gy, k = 1, o = {}) => {
  const g = S.grp(o.parent), pts = [[-112, -14], [-104, -88], [-44, -142], [28, -150], [96, -112], [120, -40], [92, 0], [8, 8], [-70, 4]].map(([a, b]) => [cx + a * k, gy + b * k]);
  const d = smooth([...pts, pts[0], pts[1]]) + " Z";
  DS.shadow(S, cx, gy + 4 * k, 260 * k, { t: o.t, parent: g });
  DS.shape(S, d, "earth", { t: o.t, w: "near", parent: g });
  const inner = pts.map(([x, y]) => [cx + (x - cx) * 0.8, gy - 70 * k + (y - (gy - 70 * k)) * 0.8]);
  S.draw(smooth([...inner, inner[0], inner[1]]) + " Z", o.t ?? S.start, 0, { fill: DS.c("sand", 1), c: DS.c("earth", 2), w: DS.w.detail, parent: g });
  [[-40, -88, 9, 6], [20, -110, 7, 5], [50, -60, 10, 6], [-70, -50, 7, 5], [-6, -48, 8, 5], [70, -92, 6, 4]].forEach(([a, b, rx, ry]) => S.fill(circ(cx + a * k, gy + b * k, rx * k, ry * k), o.t ?? S.start, 0, DS.c("earth", 0), 0.7, g));
  return g;
};
// a grain of rice lying along angle `rot` (degrees), centre (cx, cy), about 190k long
const rice = (S, cx, cy, k = 1, o = {}) => {
  const g = S.grp(o.parent);
  DS.shape(S, circ(cx, cy, 95 * k, 28 * k), "paper", { t: o.t, w: "mid", parent: g });
  S.draw(`M${cx - 70 * k} ${cy - 4 * k} Q${cx} ${cy - 14 * k} ${cx + 70 * k} ${cy - 4 * k}`, o.t ?? S.start, 0, { c: DS.c("gray", 1), w: DS.w.hair, parent: g });
  return xf(g, o.rot ?? 0, cx, cy);
};
// film-reel card: the film is only ever named, never drawn
const reel = (S, cx, cy, k = 1, o = {}) => {
  const kk = Math.max(k, 0.85), wd = 520 * kk, ht = 270 * kk; // small reels keep a card wide enough for the words
  panel(S, cx, cy, wd, ht, o.t ?? S.start); const g = S.grp(o.parent); // panel first, so the reel draws over it
  const rx = cx, ry = cy - 36 * kk, kr = Math.min(1, k + 0.15);
  S.draw(circ(rx, ry, 74 * kr), o.t ?? S.start, 0, { fill: DS.c("gray", 1), c: DS.P.ink[0], w: DS.w.mid, parent: g });
  [0, 1, 2, 3, 4, 5].forEach((i) => { const a = (i / 6) * Math.PI * 2 + 0.3; S.draw(circ(rx + Math.cos(a) * 44 * kr, ry + Math.sin(a) * 44 * kr, 13 * kr), o.t ?? S.start, 0, { fill: DS.P.paper[0], c: DS.P.ink[0], w: DS.w.detail, parent: g }); });
  S.draw(circ(rx, ry, 11 * kr), o.t ?? S.start, 0, { fill: DS.P.ink[0], c: DS.P.ink[0], w: DS.w.detail, parent: g });
  S.text(o.text || "SHRINK-RAY MOVIE", cx, cy + 96 * kk, { size: DS.type.caption, c: DS.P.ink[0], t: o.t ?? T0(S), parent: g });
  return g;
};
// Dave's list of dangers (the runner). o.rows = [t0, t1, t2] when each line appears; o.strike = [t, t] crosses out rows 0 and 1; o.under = time of the three red lines under row 2;
// o.wch = time the shivery last line appears. cx, cy = centre of the paper at scale k.
const DL_ITEMS = ["TOO WEAK", "FALLING OFF THINGS", "GETTING STEPPED ON"];
const dangerList = (S, cx, cy, k = 1, o = {}) => {
  const g = S.grp(o.parent), x0 = cx - 340, y0 = cy - 250, rows = o.rows || [], st = o.strike || [];
  paperR(S, x0, y0, 680, 500, { t: o.t, parent: g });
  S.draw(`M${x0 + 30} ${y0 + 100} H${x0 + 650}`, o.t ?? S.start, 0, { c: DS.c("red", 1), w: DS.w.detail, parent: g });
  S.text("DAVE'S LIST OF DANGERS", cx, y0 + 70, { size: DS.type.caption, c: DS.P.ink[0], t: o.t ?? T0(S), parent: g });
  DL_ITEMS.forEach((s, i) => {
    const y = y0 + 185 + i * 80, ti = rows[i] ?? o.t ?? T0(S);
    S.draw(rrect(x0 + 44, y - 36, 40, 40, DS.r.xs), ti, 0, { fill: DS.P.white[0], c: DS.P.ink[0], w: DS.w.detail, parent: g });
    S.text(s, x0 + 110, y, { size: DS.type.caption, c: DS.P.ink[0], anchor: "start", t: ti, parent: g });
    if (st[i] !== undefined) { const wd = s.length * 26 + 30; S.draw(`M${x0 + 96} ${y - 8} Q${x0 + 96 + wd / 2} ${y - 22} ${x0 + 96 + wd} ${y - 12}`, st[i], 0, { c: DS.c("red", 0), w: DS.w.near * 1.3, parent: g }); S.draw(`M${x0 + 96} ${y - 20} Q${x0 + 96 + wd / 2} ${y} ${x0 + 96 + wd} ${y - 4}`, st[i] + 0.05, 0, { c: DS.c("red", 0), w: DS.w.mid, parent: g }); }
  });
  if (o.under !== undefined) [0, 1, 2].forEach((i) => S.draw(`M${x0 + 100} ${y0 + 185 + 160 + 14 + i * 12} Q${x0 + 300} ${y0 + 185 + 160 + 6 + i * 12} ${x0 + 580} ${y0 + 185 + 160 + 14 + i * 12}`, o.under + i * 0.15, 0, { c: DS.c("red", 0), w: DS.w.mid, parent: g }));
  if (o.wch !== undefined) { // one time, or four (a word each)
    const wg = S.grp(g), ts = Array.isArray(o.wch) ? o.wch : [o.wch, o.wch, o.wch, o.wch], ws = ["wet,", "cold,", "hungry,", "blind."], ww = ws.map((w) => w.length * 25 + 24), x1 = cx - ww.reduce((a, b) => a + b, 0) / 2 + 12;
    let x = x1; ws.forEach((w, i) => { S.text(w, x, y0 + 450, { size: DS.type.small, font: "caveat", c: DS.c("red", 2), anchor: "start", t: ts[i], parent: wg }); x += ww[i]; });
    tl.to(wg, { x: 2.5, duration: 0.16, repeat: 40, yoyo: true, ease: "sine.inOut" }, ts[0] + 0.4);
  }
  return k === 1 ? g : xf(g, 0, cx, cy, k);
};
// the shrink ray: a chunky purple ray gun with a battery window. charge(t, dur, v0, v1) fills the bar.
const ray = (S, cx, gy, k = 1, o = {}) => {
  const g = S.grp(o.parent), t = o.t, X = (v) => cx + v * k, Y = (v) => gy + v * k;
  DS.shadow(S, cx + 20 * k, gy + 2, 360 * k, { t, parent: g });
  DS.shape(S, rrect(X(-40), Y(-110), 60 * k, 110 * k, DS.r.sm), "gray", { t, w: "mid", parent: g });
  DS.shape(S, rrect(X(-150), Y(-220), 300 * k, 120 * k, 40 * k), "purple", { t, w: "near", parent: g });
  DS.shape(S, rect(X(140), Y(-182), 120 * k, 44 * k), "gray", { t, w: "mid", tone: 1, parent: g });
  DS.shape(S, circ(X(268), Y(-160), 34 * k, 56 * k), "yellow", { t, w: "mid", parent: g });
  S.draw(rrect(X(-120), Y(-196), 140 * k, 44 * k, DS.r.xs), t ?? S.start, 0, { fill: DS.P.white[0], c: DS.P.ink[0], w: DS.w.detail, parent: g });
  const bar = el("path", { d: rect(X(-114), Y(-190), 128 * k, 32 * k), fill: DS.c(o.c || "green", 0) }, g);
  const tf = (v) => `translate(${X(-114)} 0) scale(${Math.max(0.001, v)} 1) translate(${-X(-114)} 0)`;
  bar.setAttribute("transform", tf(o.level ?? 1));
  S.draw(circ(X(100), Y(-160), 14 * k), t ?? S.start, 0, { fill: DS.c("red", 0), c: DS.P.ink[0], w: DS.w.detail, parent: g });
  return { g, bar, charge: (ta, dur, v0, v1) => tl.fromTo(bar, { attr: { transform: tf(v0) } }, { attr: { transform: tf(v1) }, duration: dur, ease: "none", immediateRender: true }, ta) };
};
// a garden at ant height. Call as garden(S, DS.outdoor(S, GARD.morning)); foreground grass blades frame the edges.
const GARD = { morning: { hy: 560, sky: "sky", sun: false }, rain: { hy: 560, sky: "gray", sun: false }, sun: { hy: 560, sky: "sky", sun: [1520, 190] }, dusk: { hy: 560, sky: "dusk", sun: [420, 570] } };
const garden = (S, O, o = {}) => {
  if (o.flowers !== false) [[300, "red"], [700, "yellow"], [1250, "pink"], [1620, "orange"]].forEach(([x, nm], i) => { const y = O.hy + 22 + (i % 2) * 14; S.draw(`M${x} ${y} Q${x + 8} ${y - 60} ${x} ${y - 120}`, S.start, 0, { c: DS.c("green", 2, "far"), w: DS.w.far }); [0, 1, 2, 3, 4].forEach((j) => { const a = (j / 5) * Math.PI * 2; S.fill(circ(x + Math.cos(a) * 20, y - 128 + Math.sin(a) * 20, 14), S.start, 0, DS.c(nm, 0, "far"), 1); }); S.fill(circ(x, y - 128, 12), S.start, 0, DS.c("yellow", 0, "far"), 1); });
  if (o.blades !== false) blades(S);
  return O;
};
const blades = (S, o = {}) => {
  const g = S.grp(), c = DS.c("green", 2), c2 = DS.c("green", 0);
  [[-30, 1080, -60, 330, 90], [90, 1080, 70, 480, 80], [210, 1080, 260, 640, 60], [1700, 1080, 1620, 360, 100], [1830, 1080, 1850, 520, 80], [1950, 1080, 1900, 300, 110]].forEach(([x, y, tx, ty, w], i) => {
    DS.shape(S, `M${x - w / 2} ${y} Q${x - w / 4 + (tx - x) * 0.3} ${(y + ty) / 2} ${tx} ${ty} Q${x + w / 4 + (tx - x) * 0.4} ${(y + ty) / 2 + 40} ${x + w / 2} ${y} Z`, "green", { parent: g, flat: true, tone: i % 2 ? 2 : 0, w: "near" });
  });
  return g;
};
// a big leaf: stem toward bottom-left, tip to the right; rot in degrees
const leaf = (S, cx, cy, wd, o = {}) => {
  const g = S.grp(o.parent), h = wd * 0.34;
  DS.shape(S, `M${cx - wd / 2} ${cy} Q${cx - wd * 0.1} ${cy - h * 1.5} ${cx + wd / 2} ${cy - h * 0.2} Q${cx} ${cy + h * 0.9} ${cx - wd / 2} ${cy} Z`, "green", { t: o.t, w: "near", parent: g });
  S.draw(`M${cx - wd / 2} ${cy} Q${cx} ${cy - h * 0.3} ${cx + wd * 0.42} ${cy - h * 0.16}`, o.t ?? S.start, 0, { c: DS.c("green", 2), w: DS.w.mid, parent: g });
  return xf(g, o.rot ?? 0, cx, cy);
};
// water: a dome drop sitting on a surface (rx wide, ry tall) with highlight; clear = outline only (never over a face)
const dome = (S, cx, cy, rx, ry, o = {}) => {
  const g = S.grp(o.parent), d = `M${cx - rx} ${cy} A${rx} ${ry} 0 0 1 ${cx + rx} ${cy} Q${cx} ${cy + ry * 0.16} ${cx - rx} ${cy} Z`;
  if (!o.clear) S.fill(d, o.t ?? S.start, 0, DS.c("sky", 0), 0.78, g);
  S.draw(d, o.t ?? S.start, 0, { c: DS.c("sky", 2), w: DS.w.near, parent: g });
  S.draw(`M${cx - rx * 0.62} ${cy - ry * 0.4} Q${cx - rx * 0.5} ${cy - ry * 0.82} ${cx - rx * 0.14} ${cy - ry * 0.9}`, o.t ?? S.start, 0, { c: DS.P.white[0], w: DS.w.mid, parent: g });
  return g;
};
// falling raindrop: pointed top, round bottom
const tear = (S, cx, cy, k = 1, o = {}) => {
  const g = S.grp(o.parent), d = `M${cx} ${cy - 62 * k} Q${cx - 6 * k} ${cy - 30 * k} ${cx - 34 * k} ${cy + 8 * k} A${36 * k} ${36 * k} 0 1 0 ${cx + 34 * k} ${cy + 8 * k} Q${cx + 6 * k} ${cy - 30 * k} ${cx} ${cy - 62 * k} Z`;
  S.draw(d, o.t ?? S.start, 0, { fill: DS.c("sky", 0), c: DS.c("sky", 2), w: DS.w.mid, parent: g });
  S.draw(`M${cx - 18 * k} ${cy + 6 * k} Q${cx - 22 * k} ${cy + 22 * k} ${cx - 8 * k} ${cy + 30 * k}`, o.t ?? S.start, 0, { c: DS.P.white[0], w: DS.w.detail, parent: g });
  return g;
};
// outline bubble round Dave's head (the drop that grabs his face): ring + highlight, nothing filled over the face
const faceBubble = (S, F, t, parent) => {
  const g = S.grp(parent), [hx, hy] = F.hd, r = F.r * 1.55;
  S.draw(circ(hx, hy, r), t, 0, { c: DS.c("sky", 2), w: DS.w.near, parent: g });
  S.draw(circ(hx, hy, r * 0.93), t, 0, { c: DS.c("sky", 0), w: DS.w.mid, parent: g });
  S.draw(`M${hx - r * 0.78} ${hy - r * 0.3} Q${hx - r * 0.7} ${hy - r * 0.7} ${hx - r * 0.3} ${hy - r * 0.86}`, t, 0, { c: DS.P.white[0], w: DS.w.near, parent: g });
  return g;
};
const cheeks = (S, F, t, parent) => { const [hx, hy] = F.hd; [-1, 1].forEach((sd) => S.fill(circ(hx + sd * F.r * 0.62, hy + F.r * 0.32, F.r * 0.2), t, 0, DS.c("pink", 0), 0.9, parent || F.g)); };

// ---------- creatures ----------
// mouse (grey) or shrew (brown, longer snout, smaller ears). faces right. feet at (cx, gy), about 110k tall
const rodent = (S, cx, gy, k = 1, o = {}) => {
  const g = S.grp(o.parent), nm = o.name || "gray", t = o.t, X = (v) => cx + v * k, Y = (v) => gy + v * k, INKC = DS.P.ink[0], sn = o.long ? 1.5 : 1;
  S.draw(smooth([[X(-70), Y(-30)], [X(-110), Y(-20)], [X(-130), Y(-50)], [X(-150), Y(-44)]]), t ?? S.start, 0, { c: DS.c("pink", 2), w: DS.w.mid * Math.sqrt(k), parent: g });
  DS.shape(S, circ(X(-10), Y(-48), 76 * k, 44 * k), nm, { t, w: "mid", parent: g });
  [[-40, 0], [30, 0]].forEach(([dx]) => S.draw(`M${X(dx)} ${Y(-12)} V${Y(0)}`, t ?? S.start, 0, { c: INKC, w: DS.w.near * Math.sqrt(k), parent: g }));
  DS.shape(S, `M${X(54)} ${Y(-84)} Q${X(100 + 20 * sn)} ${Y(-60)} ${X(78 + 30 * sn)} ${Y(-44)} Q${X(66)} ${Y(-20)} ${X(46)} ${Y(-26)} Z`, nm, { t, w: "mid", tone: 1, parent: g });
  DS.shape(S, circ(X(48), Y(-88), (o.long ? 11 : 17) * k), "pink", { t, w: "detail", parent: g });
  S.fill(circ(X(78 + 30 * sn), Y(-44), 5 * k), t ?? S.start, 0, DS.c("pink", 2), 1, g);
  S.draw(circ(X(66), Y(-62), 5 * k), t ?? S.start, 0, { fill: INKC, c: INKC, w: DS.w.hair, parent: g });
  return g;
};
const fly = (S, cx, cy, k = 1, o = {}) => {
  const g = S.grp(o.parent), t = o.t, INKC = DS.P.ink[0];
  [-1, 1].forEach((sd) => S.draw(circ(cx + sd * 22 * k, cy - 34 * k, 28 * k, 14 * k), t ?? S.start, 0, { fill: DS.P.glass[1], c: DS.c("gray", 0), w: DS.w.detail, parent: g }));
  DS.shape(S, circ(cx, cy, 36 * k, 22 * k), "ink", { t, w: "detail", parent: g });
  S.draw(circ(cx + 40 * k, cy - 6 * k, 15 * k), t ?? S.start, 0, { fill: DS.c("red", 0), c: INKC, w: DS.w.detail, parent: g });
  [-14, 4, 22].forEach((dx) => S.draw(`M${cx + dx * k} ${cy + 14 * k} L${cx + (dx - 8) * k} ${cy + 36 * k}`, t ?? S.start, 0, { c: INKC, w: DS.w.detail, parent: g }));
  return g;
};
const beetle = (S, cx, cy, k = 1, o = {}) => {
  const g = S.grp(o.parent), t = o.t, INKC = DS.P.ink[0];
  DS.shape(S, `M${cx - 70 * k} ${cy} Q${cx - 66 * k} ${cy - 62 * k} ${cx} ${cy - 62 * k} Q${cx + 66 * k} ${cy - 62 * k} ${cx + 70 * k} ${cy} Z`, "navy", { t, w: "mid", parent: g });
  S.draw(`M${cx} ${cy - 62 * k} V${cy}`, t ?? S.start, 0, { c: INKC, w: DS.w.detail, parent: g });
  S.draw(circ(cx + 78 * k, cy - 12 * k, 20 * k), t ?? S.start, 0, { fill: DS.c("navy", 1), c: INKC, w: DS.w.mid, parent: g });
  [-40, 0, 40].forEach((dx) => S.draw(`M${cx + dx * k} ${cy} L${cx + (dx - 10) * k} ${cy + 22 * k}`, t ?? S.start, 0, { c: INKC, w: DS.w.mid, parent: g }));
  return g;
};
const mosquito = (S, cx, cy, k = 1, o = {}) => {
  const g = S.grp(o.parent), t = o.t, INKC = DS.P.ink[0];
  [-1, 1].forEach((sd) => S.draw(circ(cx + sd * 12 * k - 10 * k, cy - 36 * k, 32 * k, 10 * k), t ?? S.start, 0, { fill: DS.P.glass[1], c: DS.c("gray", 0), w: DS.w.detail, parent: g }));
  DS.shape(S, circ(cx, cy, 52 * k, 12 * k), "gray", { t, w: "mid", tone: 2, parent: g });
  DS.shape(S, circ(cx + 58 * k, cy - 2 * k, 14 * k), "gray", { t, w: "mid", tone: 2, parent: g });
  S.draw(`M${cx + 70 * k} ${cy} L${cx + 140 * k} ${cy + 24 * k}`, t ?? S.start, 0, { c: INKC, w: DS.w.mid, parent: g });
  [-30, -4, 22].forEach((dx) => S.draw(`M${cx + dx * k} ${cy + 8 * k} L${cx + (dx - 16) * k} ${cy + 44 * k}`, t ?? S.start, 0, { c: INKC, w: DS.w.detail, parent: g }));
  return g;
};
const thermo = (S, cx, cy, h, level, o = {}) => { // level 0..1 of the red column
  const g = S.grp(o.parent), wd = 30;
  S.draw(rrect(cx - wd / 2, cy - h / 2, wd, h, wd / 2), o.t ?? S.start, 0, { fill: DS.P.white[0], c: DS.P.ink[0], w: DS.w.mid, parent: g });
  S.draw(circ(cx, cy + h / 2 + 8, 26), o.t ?? S.start, 0, { fill: DS.c(o.c || "red", 0), c: DS.P.ink[0], w: DS.w.mid, parent: g });
  S.fill(rect(cx - 8, cy + h / 2 - level * (h - 10), 16, level * (h - 10) + 10), o.t ?? S.start, 0, DS.c(o.c || "red", 0), 1, g);
  return g;
};
const plate = (S, cx, cy, rx, o = {}) => { const g = S.grp(o.parent); DS.shape(S, circ(cx, cy, rx, rx * 0.26), "white", { t: o.t, w: "mid", flat: true, parent: g }); S.draw(circ(cx, cy, rx * 0.72, rx * 0.17), o.t ?? S.start, 0, { c: DS.c("gray", 1), w: DS.w.hair, parent: g }); return g; };
// a heap of n little crumbs on (cx, cy)
const heap = (S, cx, cy, n, sp, o = {}) => { const g = S.grp(o.parent); for (let i = 0; i < n; i++) { const a = i * 2.4, r = Math.sqrt(i + 1) * sp * 0.55; S.draw(circ(cx + Math.cos(a) * r, cy - 6 - (i % 5) * sp * 0.3 + Math.sin(a) * r * 0.35, sp * 0.5, sp * 0.36), o.t ?? S.start, 0, { fill: DS.c("earth", i % 2 ? 1 : 0), c: DS.c("earth", 2), w: DS.w.hair, parent: g }); } return g; };
const sunDisc = (S, cx, cy, r, o = {}) => { const g = S.grp(o.parent); S.fill(circ(cx, cy, r * 2.4), o.t ?? S.start, 0, DS.glow(DS.c("yellow", 1), 0.8), 1, g); S.draw(rays(cx, cy, r * 1.25, r * 1.7, 12, 0), o.t ?? S.start, 0, { c: DS.c("gold", 0), w: DS.w.near, parent: g }); DS.shape(S, circ(cx, cy, r), "yellow", { t: o.t, w: "near", parent: g }); return g; };
const blanket = (S, F, t) => { const k = F.s, x = F.cx, sy = F.sh[1], hy = F.hip[1], g = S.grp(F.g.parentNode);
  S.draw(`M${x - 44 * k} ${sy + 6 * k} Q${x} ${sy - 18 * k} ${x + 44 * k} ${sy + 6 * k} L${x + 70 * k} ${hy + 56 * k} Q${x} ${hy + 72 * k} ${x - 70 * k} ${hy + 56 * k} Z`, t, 0, { fill: DS.c("red", 0), c: DS.P.ink[0], w: DS.w.near, parent: g });
  [0.3, 0.6].forEach((f) => S.draw(`M${x - (44 + 26 * f) * k} ${sy + (6 + (hy - sy + 50) * f) * k * 1} L${x + (44 + 26 * f) * k} ${sy + (6 + (hy - sy + 50) * f) * k * 1}`, t, 0, { c: DS.c("red", 2), w: DS.w.mid, parent: g }));
  S.draw(`M${x - 22 * k} ${sy - 4 * k} L${x - 22 * k} ${hy + 64 * k} M${x + 22 * k} ${sy - 4 * k} L${x + 22 * k} ${hy + 64 * k}`, t, 0, { c: DS.c("red", 2), w: DS.w.mid, parent: g });
  return g; };
// a generic hardback: o.lines = text lines on the cover
const hardback = (S, cx, cy, wd, ht, lines, o = {}) => {
  const g = S.grp(o.parent);
  DS.drop(S, rrect(cx - wd / 2 + 10, cy - ht / 2 + 14, wd, ht, DS.r.sm), { t: o.t, parent: g });
  DS.shape(S, rrect(cx - wd / 2, cy - ht / 2, wd, ht, DS.r.sm), o.name || "navy", { t: o.t, w: "near", parent: g });
  DS.shape(S, rect(cx - wd / 2, cy - ht / 2 + 6, 22, ht - 12), o.name || "navy", { t: o.t, w: "hair", tone: 2, flat: true, parent: g });
  lines.forEach((s, i) => S.text(s, cx + 8, cy - ht / 2 + 110 + i * 70, { size: DS.type.small, c: DS.c("gold", 1), t: o.t ?? T0(S), parent: g }));
  S.draw(`M${cx - wd * 0.32} ${cy + ht / 2 - 80} H${cx + wd * 0.34}`, o.t ?? S.start, 0, { c: DS.c("gold", 0), w: DS.w.mid, parent: g });
  return g;
};
// a sunflower seed (striped, dark) lying along angle rot, centre (cx, cy), 1.4 -> about 150 long
const carrySeed = (S, cx, cy, k = 1, parent, rot = 0) => {
  const g = S.grp(parent);
  DS.shape(S, circ(cx, cy, 78 * k, 34 * k), "brown", { w: "mid", parent: g });
  [-0.5, 0, 0.5].forEach((f) => S.draw(`M${cx - 60 * k} ${cy + f * 30 * k} Q${cx} ${cy + f * 40 * k - 6 * k} ${cx + 60 * k} ${cy + f * 30 * k}`, S.start, 0, { c: DS.P.paper[2], w: DS.w.detail, parent: g }));
  return xf(g, rot, cx, cy);
};
const cloudy = (S, cx, cy, k = 1, o = {}) => { const g = S.grp(o.parent); [[-90, 14, 70], [-20, -20, 90], [70, -6, 80], [130, 20, 56]].forEach(([dx, dy, r]) => S.fill(circ(cx + dx * k, cy + dy * k, r * k, r * 0.8 * k), o.t ?? S.start, 0, DS.c("gray", o.tone ?? 0), 1, g)); return g; };
// slanted rain streaks over a box; they fade in on t, static (no flicker)
const streaks = (S, x0, x1, y0, y1, n, t, parent) => { const g = S.grp(parent); for (let i = 0; i < n; i++) { const x = x0 + ((x1 - x0) * ((i * 37) % n)) / n, y = y0 + ((y1 - y0) * ((i * 53) % n)) / n; S.draw(`M${R4(x)} ${R4(y)} l-14 52`, t ?? S.start, 0, { c: DS.c("sky", 2), w: DS.w.mid, parent: g, op: 0.8 }); } return g; };
const cam = (S, cx, cy, k = 1, o = {}) => { const g = S.grp(o.parent); DS.shape(S, rrect(cx - 70 * k, cy - 46 * k, 140 * k, 92 * k, DS.r.sm), "gray", { t: o.t, w: "mid", tone: 2, parent: g }); S.draw(circ(cx, cy, 30 * k), o.t ?? S.start, 0, { fill: DS.c("glass", 0), c: DS.P.ink[0], w: DS.w.mid, parent: g }); return g; };
// wavy red lines of body heat rising from (x, y); n lines spaced 50 apart. They fade in softly on t and stay (no flicker).
const heat = (S, x, y, n, t, parent, h = 200) => { const g = S.grp(parent); for (let i = 0; i < n; i++) { const bx = x + (i - (n - 1) / 2) * 56; S.draw(smooth([[bx, y], [bx + 16, y - h * 0.25], [bx - 16, y - h * 0.5], [bx + 16, y - h * 0.75], [bx, y - h]]), t ?? S.start, 0, { c: DS.c("red", 0), w: DS.w.near, parent: g, op: 0.85 }); S.draw(arrowHead(bx, y - h, -Math.PI / 2, 22), t ?? S.start, 0, { c: DS.c("red", 0), w: DS.w.near, parent: g }); } return g; };
// a very gentle shiver: a 2 px sway, about 4 per second, for the given window
const shiver = (g, t0, t1, amp = 2) => tl.to(g, { x: amp, duration: 0.12, repeat: Math.floor((t1 - t0) / 0.12), yoyo: true, ease: "sine.inOut" }, t0);
let BLN = 0;
const blurry = (g, sd = 8) => { const id = "bl44-" + ++BLN, f = el("filter", { id, x: "-20%", y: "-20%", width: "140%", height: "140%" }, dsDefs()); el("feGaussianBlur", { stdDeviation: sd }, f); g.setAttribute("filter", `url(#${id})`); return g; };
// a small house: wall, roof, door, a lit window. layer far = hazed
const house = (S, cx, gy, k = 1, o = {}) => { const g = S.grp(o.parent), L = o.layer || "near";
  DS.shape(S, rect(cx - 120 * k, gy - 160 * k, 240 * k, 160 * k), "wall", { layer: L, w: "mid", parent: g, tone: 2, flat: true });
  DS.shape(S, `M${cx - 150 * k} ${gy - 160 * k} L${cx} ${gy - 270 * k} L${cx + 150 * k} ${gy - 160 * k} Z`, "red", { layer: L, w: "mid", parent: g });
  DS.shape(S, rect(cx - 24 * k, gy - 90 * k, 48 * k, 90 * k), "wood", { layer: L, w: "mid", parent: g });
  DS.shape(S, rect(cx + 50 * k, gy - 120 * k, 50 * k, 50 * k), "yellow", { layer: L, w: "mid", parent: g, flat: true, tone: 1 });
  return g; };
// an eye: almond, iris, pupil, catch-light. dash = dashed ghost outline only
const eyeball = (S, cx, cy, k = 1, o = {}) => { const g = S.grp(o.parent), d = `M${cx - 130 * k} ${cy} Q${cx} ${cy - 120 * k} ${cx + 130 * k} ${cy} Q${cx} ${cy + 120 * k} ${cx - 130 * k} ${cy} Z`;
  if (o.dash) { dashed(S.draw(d, S.start, 0, { c: DS.c("gray", 2), w: DS.w.mid, parent: g })); return g; }
  S.draw(d, S.start, 0, { fill: DS.P.white[0], c: DS.P.ink[0], w: Math.max(2, DS.w.near * Math.sqrt(k)), parent: g });
  S.draw(circ(cx, cy, 52 * k), S.start, 0, { fill: DS.c("blue", 0), c: DS.P.ink[0], w: Math.max(2, DS.w.mid * Math.sqrt(k)), parent: g });
  S.draw(circ(cx, cy, 22 * k), S.start, 0, { fill: DS.P.ink[0], c: DS.P.ink[0], w: DS.w.hair, parent: g }); S.fill(circ(cx + 14 * k, cy - 14 * k, 8 * k), S.start, 0, DS.P.white[0], 1, g);
  return g; };
const toyBrick = (S, cx, gy, k = 1, o = {}) => { const g = S.grp(o.parent); DS.shadow(S, cx, gy + 2, 520 * k, { parent: g });
  DS.shape(S, rect(cx - 220 * k, gy - 150 * k, 440 * k, 150 * k), "red", { w: "near", parent: g });
  [-150, -50, 50, 150].forEach((dx) => DS.shape(S, `M${cx + dx * k - 38 * k} ${gy - 150 * k} V${gy - 178 * k} Q${cx + dx * k} ${gy - 192 * k} ${cx + dx * k + 38 * k} ${gy - 178 * k} V${gy - 150 * k} Z`, "red", { w: "mid", parent: g, tone: 1 }));
  DS.shape(S, rrect(cx - 60 * k, gy - 110 * k, 120 * k, 110 * k, DS.r.sm), "ink", { w: "mid", parent: g, flat: true });
  return g; };
// body heat rising from above a figure's head (never over the face)
const heatTop = (S, F, n, t, parent, h = 160) => heat(S, F.cx, F.hd[1] - F.r * 1.6, n, t, parent, h);
