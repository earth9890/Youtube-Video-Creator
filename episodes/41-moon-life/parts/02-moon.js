
// ---------- the Moon set: black sky, grey ground, Earth fixed top right (the packing list lives top left) ----------
const EX = 1480, EY = 230, ER = 84; // Earth hangs in this spot in every surface scene, and above the pit at the end
const GRY = (k, tone = 0) => DS.c("gray", tone, k);
const CRATERS = [[300, 800, 120], [1300, 780, 80], [1700, 890, 140], [650, 960, 90], [1000, 740, 60], [120, 930, 100]];
// lunar(S, o): o.hy horizon, o.night (earthlit blue ground, more stars + Milky Way), o.sun [x, y, r] (a white sun in the black sky),
// o.earth false = no Earth, o.er / o.ex / o.ey override its spot, o.prints [[x, y], ...] bootprints, o.frost = fades a white frost over the ground at that time
const lunar = (S, o = {}) => {
  DS.setHaze("night");
  const hy = o.hy ?? 700, g = S.grp(); S.g.insertBefore(g, S.g.firstChild);
  const f = (d, fill, op = 1, t = S.start) => S.fill(d, t, 0, fill, op, g);
  f(rect(-200, -200, 2320, 1480), DS.vgrad(DS.P.ink[2], DS.mix(DS.P.navy[2], DS.P.ink[2], o.night ? 0.2 : 0.45)));
  const sky = S.grp(g);
  if (o.night) milky(S, 160, hy - 60, 1500, 120, { parent: sky, k: 0.14, n: 110 });
  stars(S, o.night ? 120 : 70, -300, -300, 2200, hy - 20, { parent: sky, big: 3 });
  const sunG = o.sun ? sun(S, o.sun[0], o.sun[1], o.sun[2] ?? 46, { parent: sky }) : null;
  if (o.earth !== false) earth(S, o.ex ?? EX, o.ey ?? EY, o.er ?? ER, { night: true, nightA: 20, parent: g });
  const dk = o.night ? 0.5 : 0;
  const tint = (name, tone, layer) => DS.mix(DS.c(name, tone, layer), DS.P.navy[2], dk);
  f(ridge(hy - 50, 44, 1.9), tint("gray", 0, "far"));
  f(ridge(hy + 20, 26, 3.1), DS.vgrad(tint("gray", 1, "mid"), tint("gray", 0)));
  f(`M-200 ${hy + 60} H2120 V1280 H-200 Z`, DS.vgrad(tint("gray", 0), tint("gray", 2)));
  CRATERS.forEach(([x, y, r]) => { f(circ(x, y, r, r * 0.26), tint("gray", 2), 0.55); S.draw(arc(x, y, r, 180, 360, r * 0.26), S.start, 0, { c: tint("gray", 1), w: DS.w.detail, parent: g }); });
  [[210, 880], [820, 900], [1500, 960], [1180, 850], [1840, 800]].forEach(([x, y], i) => f(circ(x, y, 14 + (i % 3) * 7, 6 + (i % 3) * 3), tint("gray", 2), 0.8));
  (o.prints || []).forEach(([x, y]) => f(circ(x, y, 22, 8), DS.P.ink[0], 0.28));
  if (o.frost !== undefined) { const fr = S.grp(g); [[260, 840, 200], [900, 900, 260], [1560, 850, 220], [560, 760, 150], [1260, 790, 180]].forEach(([x, y, r]) => S.fill(circ(x, y, r, r * 0.16), S.start, 0, DS.P.white[0], 0.5, fr)); tl.fromTo(fr, { opacity: 0 }, { opacity: 1, duration: 1.6, ease: "sine.inOut" }, o.frost); }
  return { g, hy, sunG, sky };
};
// Dave in his usual blue tee with a bubble helmet (an outline ring, never a fill over the face) and a grey backpack
const helmet = (S, F, o = {}) => {
  const R = F.r, [x, y] = F.hd, g = S.grp(F.g), t = o.t ?? S.start;
  S.draw(circ(x, y, R * 1.34), t, 0, { c: DS.c("sky", 2), w: DS.w.mid, parent: g });
  S.draw(arc(x, y, R * 1.34, 200, 255), t, 0, { c: DS.P.white[0], w: DS.w.mid, parent: g });
  S.draw(`M${x - R * 0.9} ${y + R * 1.05} Q${x} ${y + R * 1.55} ${x + R * 0.9} ${y + R * 1.05}`, t, 0, { c: DS.c("sky", 2), w: DS.w.detail, parent: g });
  return g;
};
const pack = (S, F, o = {}) => {
  const k = F.s, p = S.draw(rrect(F.cx - 46 * k, F.sh[1] - 6 * k, 92 * k, 112 * k, DS.r.sm), S.start, 0, { fill: DS.vol("gray", "near"), c: DS.P.ink[0], w: DS.w.detail, parent: F.g });
  F.g.insertBefore(p, F.g.firstChild);
  return p;
};
const daveM = (S, x, gy, layer = "near", o = {}) => {
  const F = dave(S, x, gy, layer, o);
  if (o.helmet !== false) helmet(S, F, { t: o.t }); if (o.pack !== false) pack(S, F);
  return F;
};
// a generic Apollo-style moonwalker: white suit, helmet ring, chest box. o.tag = name card above
const astro = (S, x, gy, layer = "near", o = {}) => {
  const F = who(S, x, gy, layer, Object.assign({ s: 1.1, hair: "none", outfitC: DS.c("white", 2), mood: "flat" }, o));
  helmet(S, F, { t: o.t }); pack(S, F);
  const k = F.s; DS.shape(S, rrect(F.cx - 14 * k, F.sh[1] + 30 * k, 28 * k, 22 * k, DS.r.xs), "gray", { flat: true, tone: 1, w: "hair", parent: F.g });
  return F;
};
// the striped jumper, pulled over Dave's torso (fades in at t)
const jumper = (S, F, t) => {
  const k = F.s, x = F.cx, y0 = F.sh[1] - 4 * k, y1 = F.hip[1] + 22 * k, g = S.grp(F.g);
  DS.shape(S, rrect(x - 40 * k, y0, 80 * k, y1 - y0, DS.r.md * k), "red", { w: "detail", parent: g });
  [0.3, 0.55, 0.8].forEach((f) => S.fill(rect(x - 40 * k, y0 + (y1 - y0) * f, 80 * k, 16 * k), S.start, 0, DS.c("yellow"), 1, g));
  S.draw(arc(x, y0, 18 * k, 0, 180), S.start, 0, { c: DS.c("red", 2), w: DS.w.detail, parent: g });
  S.draw(rrect(x - 40 * k, y0, 80 * k, y1 - y0, DS.r.md * k), S.start, 0, { c: DS.P.ink[0], w: DS.w.detail, parent: g });
  return fadeG(S, g, t);
};
// frost on Dave and breath puffs: small white flakes round the figure
const flakes = (S, cx, cy, n, t, parent) => { const g = S.grp(parent); for (let i = 0; i < n; i++) { const a = (i / n) * 6.28, r = 90 + (i % 3) * 36; S.draw(rays(cx + Math.cos(a) * r * 1.2, cy + Math.sin(a) * r, 5, 13, 6, 0), t, 0, { c: DS.c("sky", 1), w: DS.w.detail, parent: g }); } return g; };

// ---------- the suitcase and what's in it (the runner) ----------
const ITEM = {
  earplugs: (S, cx, cy, k = 1, o = {}) => { const g = S.grp(o.parent), t = o.t;
    S.draw(smooth([[cx - 30 * k, cy + 6 * k], [cx - 12 * k, cy + 34 * k], [cx + 12 * k, cy + 34 * k], [cx + 30 * k, cy + 6 * k]]), t ?? S.start, 0, { c: DS.c("gray", 2), w: DS.w.detail, parent: g });
    [-30, 30].forEach((dx) => DS.shape(S, `M${cx + dx * k - 15 * k} ${cy + 22 * k} Q${cx + dx * k - 17 * k} ${cy - 28 * k} ${cx + dx * k} ${cy - 30 * k} Q${cx + dx * k + 17 * k} ${cy - 28 * k} ${cx + dx * k + 15 * k} ${cy + 22 * k} Z`, "orange", { t, w: "mid", parent: g }));
    return g; },
  sunscreen: (S, cx, cy, k = 1, o = {}) => { const g = S.grp(o.parent), t = o.t;
    DS.shape(S, rrect(cx - 34 * k, cy - 50 * k, 68 * k, 120 * k, DS.r.sm), "yellow", { t, w: "mid", parent: g });
    DS.shape(S, rrect(cx - 22 * k, cy - 76 * k, 44 * k, 30 * k, DS.r.xs), "white", { t, w: "mid", parent: g });
    S.draw(circ(cx, cy + 6 * k, 15 * k) + rays(cx, cy + 6 * k, 22 * k, 32 * k, 8, 0), t ?? S.start, 0, { c: DS.c("orange", 2), w: DS.w.detail, parent: g });
    return g; },
  bottle: (S, cx, cy, k = 1, o = {}) => { const g = S.grp(o.parent), t = o.t, full = o.full ?? 1;
    DS.shape(S, `M${cx - 30 * k} ${cy - 20 * k} Q${cx - 34 * k} ${cy - 50 * k} ${cx - 16 * k} ${cy - 64 * k} V${cy - 84 * k} H${cx + 16 * k} V${cy - 64 * k} Q${cx + 34 * k} ${cy - 50 * k} ${cx + 30 * k} ${cy - 20 * k} V${cy + 76 * k} Q${cx} ${cy + 88 * k} ${cx - 30 * k} ${cy + 76 * k} Z`, "glass", { t, w: "mid", parent: g });
    if (full > 0) S.fill(`M${cx - 28 * k} ${cy + 76 * k - 150 * k * full} H${cx + 28 * k} V${cy + 76 * k} Q${cx} ${cy + 86 * k} ${cx - 28 * k} ${cy + 76 * k} Z`, t ?? S.start, 0, DS.c("sky", 0), 0.9, g);
    DS.shape(S, rrect(cx - 20 * k, cy - 104 * k, 40 * k, 24 * k, DS.r.xs), "blue", { t, w: "detail", parent: g });
    return g; },
  seeds: (S, cx, cy, k = 1, o = {}) => { const g = S.grp(o.parent), t = o.t;
    DS.shape(S, `M${cx - 40 * k} ${cy - 56 * k} L${cx - 30 * k} ${cy - 66 * k} L${cx - 20 * k} ${cy - 56 * k} L${cx - 10 * k} ${cy - 66 * k} L${cx} ${cy - 56 * k} L${cx + 10 * k} ${cy - 66 * k} L${cx + 20 * k} ${cy - 56 * k} L${cx + 30 * k} ${cy - 66 * k} L${cx + 40 * k} ${cy - 56 * k} V${cy + 56 * k} H${cx - 40 * k} Z`, "green", { t, w: "mid", tone: 1, parent: g });
    DS.shape(S, rrect(cx - 28 * k, cy - 36 * k, 56 * k, 70 * k, DS.r.xs), "paper", { t, w: "hair", flat: true, parent: g });
    S.draw(`M${cx} ${cy + 22 * k} V${cy - 6 * k} M${cx} ${cy - 2 * k} Q${cx - 18 * k} ${cy - 8 * k} ${cx - 16 * k} ${cy - 24 * k} Q${cx} ${cy - 18 * k} ${cx} ${cy - 2 * k} M${cx} ${cy - 8 * k} Q${cx + 18 * k} ${cy - 12 * k} ${cx + 16 * k} ${cy - 28 * k} Q${cx} ${cy - 22 * k} ${cx} ${cy - 8 * k}`, t ?? S.start, 0, { c: DS.c("green", 2), w: DS.w.detail, parent: g });
    return g; },
  jumper: (S, cx, cy, k = 1, o = {}) => { const g = S.grp(o.parent), t = o.t;
    DS.shape(S, `M${cx - 30 * k} ${cy - 60 * k} Q${cx} ${cy - 44 * k} ${cx + 30 * k} ${cy - 60 * k} L${cx + 66 * k} ${cy - 40 * k} L${cx + 82 * k} ${cy + 60 * k} L${cx + 56 * k} ${cy + 64 * k} L${cx + 46 * k} ${cy - 6 * k} V${cy + 66 * k} H${cx - 46 * k} V${cy - 6 * k} L${cx - 56 * k} ${cy + 64 * k} L${cx - 82 * k} ${cy + 60 * k} L${cx - 66 * k} ${cy - 40 * k} Z`, "red", { t, w: "mid", parent: g });
    [-0.3, 0.1, 0.5].forEach((f) => S.fill(rect(cx - 46 * k, cy + 66 * k * f, 92 * k, 16 * k), t ?? S.start, 0, DS.c("yellow"), 1, g));
    [-0.3, 0.1, 0.5].forEach((f) => { [-1, 1].forEach((sd) => S.fill(rect(cx + sd * 69 * k - 12 * k, cy + 30 * k + 66 * k * f * 0.6, 24 * k, 12 * k), t ?? S.start, 0, DS.c("yellow"), 1, g)); });
    S.draw(arc(cx, cy - 60 * k, 30 * k, 0, 180, 14 * k), t ?? S.start, 0, { c: DS.c("red", 2), w: DS.w.mid, parent: g });
    return g; },
};
// the suitcase: brown case, metal corners, two latches, a moon sticker. o.open = the lid stands open behind it
const suitcase = (S, x, gy, k = 1, o = {}) => { const g = S.grp(o.parent), t = o.t;
  DS.shadow(S, x, gy, 300 * k, { t, parent: g });
  if (o.open) { DS.shape(S, rrect(x - 130 * k, gy - 330 * k, 260 * k, 190 * k, DS.r.md * k), "wood", { t, tone: 2, w: "near", parent: g }); DS.shape(S, rrect(x - 112 * k, gy - 314 * k, 224 * k, 158 * k, DS.r.sm * k), "paper", { t, tone: 2, flat: true, w: "hair", parent: g }); }
  DS.shape(S, rrect(x - 140 * k, gy - 150 * k, 280 * k, 150 * k, DS.r.md * k), "wood", { t, w: "near", parent: g });
  if (!o.open) { DS.shape(S, `M${x - 40 * k} ${gy - 150 * k} V${gy - 182 * k} Q${x - 40 * k} ${gy - 196 * k} ${x - 26 * k} ${gy - 196 * k} H${x + 26 * k} Q${x + 40 * k} ${gy - 196 * k} ${x + 40 * k} ${gy - 182 * k} V${gy - 150 * k}`, "gray", { t, tone: 2, flat: true, w: "mid", parent: g }); }
  [-1, 1].forEach((sd) => { DS.shape(S, rect(x + sd * 78 * k - 12 * k, gy - 100 * k, 24 * k, 34 * k), "gray", { t, w: "hair", parent: g }); DS.shape(S, rect(x + sd * 140 * k - (sd > 0 ? 24 : 0) * k, gy - 150 * k, 24 * k, 24 * k), "gray", { t, w: "hair", flat: true, parent: g }); });
  S.draw(arc(x, gy - 60 * k, 20 * k, 60, 300), t ?? S.start, 0, { c: DS.c("yellow"), w: DS.w.mid, parent: g });
  return g; };

// ---------- Dave's packing list (the runner): rows tick off through the video ----------
const ITEMS = ["EARPLUGS", "SUNSCREEN", "WARM JUMPER", "ONE BOTTLE", "SEEDS"];
// plist(S, o): o.x, o.y top-left; o.big (bigger type); o.crossed [idx...] drawn crossed-out from the start; o.ticked [idx...] green ticks from the start;
// o.cross [[idx, t]...], o.tick [[idx, t]...] happen on their word; o.dust = true | time: DUST written in red at the bottom (not on the list)
const plist = (S, o = {}) => {
  const x = o.x ?? 100, y = o.y ?? 92, size = o.big ? DS.type.small : DS.type.caption, rh = o.big ? 70 : 54, w = o.big ? 520 : 390, rows = ITEMS.length + (o.dust !== undefined ? 1 : 0), h = 82 + rows * rh, g = S.grp(o.parent);
  const t0 = o.t ?? T0(S);
  DS.drop(S, rrect(x + 8, y + 12, w, h, DS.r.md), { t: t0, parent: g });
  DS.shape(S, rrect(x, y, w, h, DS.r.md), "paper", { t: t0, flat: true, w: "detail", parent: g });
  txt(S, "PACKING LIST", x + w / 2, y + 54, { size: size, t: t0, parent: g });
  const row = (i) => y + 82 + i * rh + rh / 2, bx = x + 38, tx = x + 76;
  ITEMS.forEach((s, i) => {
    DS.shape(S, rrect(bx - 16, row(i) - 16, 32, 32, DS.r.xs), "white", { t: t0, flat: true, w: "detail", parent: g });
    txt(S, s, tx, row(i) + size * 0.34, { size, anchor: "start", t: t0, parent: g });
    const wd = s.length * size * 0.62;
    const strike = (t) => { S.draw(line([tx - 8, row(i)], [tx + wd + 8, row(i) - 4], 0), t, 0, { c: DS.c("red"), w: DS.w.near, parent: g }); xMark(S, bx, row(i), 0.7, t, g); };
    const ok = (t) => tick(S, bx, row(i), 0.9, t, "green", g);
    if ((o.crossed || []).includes(i)) strike(S.start);
    if ((o.ticked || []).includes(i)) ok(S.start);
    (o.cross || []).forEach(([j, t]) => j === i && strike(t));
    (o.tick || []).forEach(([j, t]) => j === i && ok(t));
  });
  if (o.dust !== undefined) {
    const i = ITEMS.length, td = o.dust === true ? t0 : o.dust;
    S.draw(rrect(bx - 16, row(i) - 16, 32, 32, DS.r.xs), td, 0, { c: DS.c("red"), w: DS.w.detail, parent: g });
    S.text("DUST?", tx, row(i) + size * 0.34, { size, anchor: "start", t: td, c: DS.c("red", 2), font: "caveat", parent: g });
  }
  return { g, x, y, w, h, row, bx, tx };
};
const NIGHTP = () => ({ sky: [DS.P.night[2], DS.P.night[0]], far: DS.mix(DS.P.navy[1], DS.P.night[1], 0.35), mid: DS.P.navy[0], ground: [DS.P.navy[0], DS.P.navy[2]] });
