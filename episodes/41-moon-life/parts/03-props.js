
// ---------- small icons and props used across the chapters ----------
const END = (c) => CLIP(c)[1];
const waves = (S, x, y, k, t, o = {}) => { const g = S.grp(o.parent); [1, 2, 3].forEach((i) => S.draw(arc(x, y, 34 * k * i, -50, 50), t ?? S.start, 0, { c: o.c || DS.c("yellow"), w: DS.w.near, parent: g })); return g; };
const speaker = (S, x, y, k, t, parent) => { const g = S.grp(parent); DS.shape(S, rect(x - 40 * k, y - 22 * k, 34 * k, 44 * k), "gray", { t, tone: 2, w: "mid", parent: g }); DS.shape(S, `M${x - 6 * k} ${y - 22 * k} L${x + 40 * k} ${y - 60 * k} V${y + 60 * k} L${x - 6 * k} ${y + 22 * k} Z`, "gray", { t, w: "mid", parent: g }); return g; };
const sprout = (S, x, gy, k, t, o = {}) => { const g = S.grp(o.parent), c = o.c || "green";
  S.draw(`M${x} ${gy} Q${x + 6 * k} ${gy - 40 * k} ${x} ${gy - 70 * k}`, t ?? S.start, 0, { c: DS.c(c, 2), w: DS.w.mid, parent: g });
  [[-1, -60], [1, -76]].forEach(([sd, dy]) => DS.shape(S, `M${x} ${gy + dy * k} Q${x + sd * 44 * k} ${gy + (dy - 34) * k} ${x + sd * 62 * k} ${gy + (dy - 8) * k} Q${x + sd * 34 * k} ${gy + (dy + 18) * k} ${x} ${gy + dy * k} Z`, c, { t, w: "detail", tone: o.tone ?? 1, parent: g }));
  return g; };
const pot = (S, x, gy, k, t, o = {}) => { const g = S.grp(o.parent);
  DS.shape(S, `M${x - 60 * k} ${gy - 80 * k} H${x + 60 * k} L${x + 46 * k} ${gy} H${x - 46 * k} Z`, "orange", { t, w: "mid", parent: g });
  DS.shape(S, rect(x - 68 * k, gy - 96 * k, 136 * k, 22 * k), "orange", { t, tone: 2, w: "mid", parent: g });
  S.fill(`M${x - 56 * k} ${gy - 96 * k} H${x + 56 * k} V${gy - 84 * k} H${x - 56 * k} Z`, t ?? S.start, 0, DS.c("brown"), 1, g);
  return g; };
// a small sun-baked kettle for "hotter than boiling water"
const kettle = (S, x, gy, k, t, parent) => { const g = S.grp(parent);
  DS.shadow(S, x, gy, 220 * k, { t, parent: g });
  DS.shape(S, `M${x - 70 * k} ${gy} V${gy - 90 * k} Q${x - 70 * k} ${gy - 150 * k} ${x} ${gy - 150 * k} Q${x + 70 * k} ${gy - 150 * k} ${x + 70 * k} ${gy - 90 * k} V${gy} Z`, "gray", { t, tone: 1, w: "near", parent: g });
  DS.shape(S, `M${x + 66 * k} ${gy - 100 * k} L${x + 130 * k} ${gy - 140 * k} L${x + 136 * k} ${gy - 124 * k} L${x + 70 * k} ${gy - 70 * k} Z`, "gray", { t, tone: 1, w: "mid", parent: g });
  S.draw(`M${x - 70 * k} ${gy - 100 * k} Q${x - 130 * k} ${gy - 100 * k} ${x - 128 * k} ${gy - 50 * k} Q${x - 124 * k} ${gy - 20 * k} ${x - 70 * k} ${gy - 30 * k}`, t ?? S.start, 0, { c: DS.P.ink[0], w: DS.w.near, parent: g });
  DS.shape(S, rrect(x - 20 * k, gy - 168 * k, 40 * k, 22 * k, DS.r.xs), "ink", { t, tone: 1, w: "detail", parent: g });
  return g; };
// steam curls that drift up slowly (no flicker)
const steam = (S, x, y, k, t0, parent) => { [-30, 0, 30].forEach((dx, i) => { const p = S.draw(smooth([[x + dx * k, y], [x + (dx + 14) * k, y - 40 * k], [x + (dx - 14) * k, y - 80 * k], [x + dx * k, y - 120 * k]]), t0, 0, { c: DS.P.white[0], w: DS.w.mid, op: 0.8, parent }); tl.fromTo(p, { y: 0 }, { y: -26, duration: 2.4, ease: "sine.inOut", yoyo: true, repeat: 3 }, t0 + i * 0.3); }); };
// thermometer: bulb at (x, gy), tube to the top; fill level 0..1 set by the caller via the returned fill (scaleY from the bulb)
const thermo = (S, x, gy, h, name, t, o = {}) => { const g = S.grp(o.parent), tw = 44;
  DS.shape(S, rrect(x - tw / 2, gy - h, tw, h, tw / 2), "white", { t, flat: true, w: "near", parent: g });
  DS.shape(S, circ(x, gy + 10, 44), "white", { t, flat: true, w: "near", parent: g });
  const fill = S.grp(g); S.fill(rrect(x - 12, gy - h + 12, 24, h - 12, DS.r.sm), t ?? S.start, 0, DS.c(name), 1, fill); S.fill(circ(x, gy + 10, 34), t ?? S.start, 0, DS.c(name), 1, g);
  for (let i = 1; i < 6; i++) S.draw(line([x + tw / 2, gy - (h * i) / 6], [x + tw / 2 + 18, gy - (h * i) / 6], 0), t ?? S.start, 0, { c: DS.P.ink[0], w: DS.w.detail, parent: g });
  return { g, fill, gy, h }; };
const level = (th, t, dur, k0, k1) => { const tf = (k) => `translate(0 ${th.gy}) scale(1 ${k}) translate(0 ${-th.gy})`; tl.fromTo(th.fill, { attr: { transform: tf(k0) } }, { attr: { transform: tf(k1) }, duration: dur, ease: "power1.inOut", immediateRender: false }, t); };
// a numbered calendar tile
const tile = (S, x, y, w, str, name, t, o = {}) => { const g = S.grp(o.parent); DS.shape(S, rrect(x, y, w, w, DS.r.sm), name, { t, flat: true, tone: o.tone ?? 1, w: "detail", parent: g }); if (str) S.text(str, x + w / 2, y + w * 0.66, { size: o.size ?? DS.type.caption, t, c: DS.P.ink[0], parent: g }); return g; };
// micro moonwalker for counting (white suit, helmet ring)
const miniAstro = (S, x, gy, k, t, o = {}) => { const g = S.grp(o.parent);
  S.draw(`M${x - 12 * k} ${gy} L${x} ${gy - 28 * k} L${x + 12 * k} ${gy} M${x} ${gy - 28 * k} V${gy - 62 * k} M${x - 18 * k} ${gy - 36 * k} L${x} ${gy - 52 * k} L${x + 18 * k} ${gy - 36 * k}`, t ?? S.start, 0, { c: DS.P.white[0], w: DS.w.mid, parent: g });
  S.draw(circ(x, gy - 78 * k, 15 * k), t ?? S.start, 0, { fill: DS.P.white[0], c: DS.P.ink[0], w: DS.w.detail, parent: g });
  S.draw(circ(x, gy - 78 * k, 22 * k), t ?? S.start, 0, { c: DS.c("sky", 2), w: DS.w.detail, parent: g });
  return fadeG(S, g, t); };
// a generic grid of dots (molecules)
const dotsIn = (S, x0, y0, x1, y1, n, t, c, parent, r = 4) => { const g = S.grp(parent); for (let i = 0; i < n; i++) S.fill(circ(x0 + rnd() * (x1 - x0), y0 + rnd() * (y1 - y0), r), S.start, 0, c, 0.9, g); return fadeG(S, g, t); };
// an isometric cube (o.dots fills it with molecules)
const cube = (S, cx, cy, s, name, t, o = {}) => { const g = S.grp(o.parent), h = s * 0.5;
  DS.shape(S, `M${cx - s} ${cy - h} L${cx} ${cy - 2 * h} L${cx + s} ${cy - h} L${cx} ${cy} Z`, name, { t, tone: 1, w: "mid", parent: g });
  DS.shape(S, `M${cx - s} ${cy - h} L${cx} ${cy} V${cy + 1.4 * s} L${cx - s} ${cy + 1.4 * s - h} Z`, name, { t, tone: 2, w: "mid", parent: g });
  DS.shape(S, `M${cx} ${cy} L${cx + s} ${cy - h} V${cy + 1.4 * s - h} L${cx} ${cy + 1.4 * s} Z`, name, { t, w: "mid", parent: g });
  return g; };
// the astronaut's rock box and other tiny set pieces are built inside their scenes
const mound = (S, x, gy, w, h, name, t, parent) => DS.shape(S, `M${x - w / 2} ${gy} Q${x - w * 0.3} ${gy - h} ${x} ${gy - h} Q${x + w * 0.3} ${gy - h} ${x + w / 2} ${gy} Z`, name, { t, w: "mid", parent });
// "TV frame" for the anchor, the control-room screen and the radio calls
const screen = (S, cx, cy, wd, ht, t, o = {}) => { const g = S.grp(o.parent);
  DS.drop(S, rrect(cx - wd / 2 + 8, cy - ht / 2 + 12, wd + 40, ht + 40, DS.r.md), { t, parent: g });
  DS.shape(S, rrect(cx - wd / 2 - 20, cy - ht / 2 - 20, wd + 40, ht + 40, DS.r.md), "ink", { t, flat: true, tone: 1, w: "near", parent: g });
  DS.shape(S, rrect(cx - wd / 2, cy - ht / 2, wd, ht, DS.r.sm), o.fill || "night", { t, flat: true, tone: o.tone ?? 0, w: "detail", parent: g });
  return { g, x0: cx - wd / 2, y0: cy - ht / 2, x1: cx + wd / 2, y1: cy + ht / 2 }; };
// generic story people (name cards go above them)
const SCI = { s: 1.1, hair: "side", hairC: DS.c("ink", 1), outfitC: DS.c("white", 2), tieC: "navy", specs: true };
const SCI2 = { s: 1.1, hair: "bun", hairC: DS.c("brown", 1), outfitC: DS.c("white", 2), specs: true };
const ANCHOR = { s: 1.1, hair: "short", hairC: DS.c("ink", 1), outfitC: DS.c("red", 2), tieC: "gold" };
const DOC = { s: 1.1, hair: "bun", hairC: DS.c("ink"), outfitC: DS.c("purple") };
const CAVEMAN = { s: 1.1, hair: "messy", hairC: DS.c("brown", 1), outfit: "tunic", outfitC: DS.c("earth", 2) };
const sci = (S, x, gy, layer = "near", o = {}) => who(S, x, gy, layer, Object.assign({}, SCI, o));
const sci2 = (S, x, gy, layer = "near", o = {}) => who(S, x, gy, layer, Object.assign({}, SCI2, o));
const growX = (g, t, x, y, dur = 0.8, ease = "power2.out") => { const tf = (k) => `translate(${x} ${y}) scale(${k} 1) translate(${-x} ${-y})`; tl.fromTo(g, { attr: { transform: tf(0.02) } }, { attr: { transform: tf(1) }, duration: dur, ease, immediateRender: true }, t); };
// round gauge with a needle that swings from a0 to a1 degrees (0 = straight up) at time t
const dial = (S, cx, cy, r, a0, a1, t, o = {}) => { const g = S.grp(o.parent);
  DS.shape(S, circ(cx, cy, r), "white", { flat: true, w: "near", parent: g });
  for (let i = -4; i <= 4; i++) { const a = (i * 30 - 90) * Math.PI / 180; S.draw(line([cx + Math.cos(a) * r * 0.74, cy + Math.sin(a) * r * 0.74], [cx + Math.cos(a) * r * 0.9, cy + Math.sin(a) * r * 0.9], 0), S.start, 0, { c: DS.P.ink[0], w: DS.w.detail, parent: g }); }
  const nd = S.grp(g); S.draw(line([cx, cy], [cx, cy - r * 0.78], 0), S.start, 0, { c: DS.c("red"), w: DS.w.near, parent: nd }); S.fill(circ(cx, cy, r * 0.09), S.start, 0, DS.P.ink[0], 1, g);
  const tf = (a) => `rotate(${a} ${cx} ${cy})`; tl.fromTo(nd, { attr: { transform: tf(a0) } }, { attr: { transform: tf(a1) }, duration: o.dur ?? 1.4, ease: "power2.inOut", immediateRender: true }, t);
  return g; };
// a straight cosmic ray (dashed) with a particle that slides along it, over and over, slowly
const ray = (S, x0, y0, x1, y1, t, o = {}) => { const g = S.grp(o.parent);
  dashed(S.draw(line([x0, y0], [x1, y1], 0), t, 0, { c: o.c || DS.c("sky", 1), w: DS.w.mid, op: 0.7, parent: g }), 0.03, 0.025);
  const d = S.fill(circ(x0, y0, 9), t, 0, o.c || DS.c("sky", 1), 1, g); tl.fromTo(d, { x: 0, y: 0 }, { x: x1 - x0, y: y1 - y0, duration: o.dur ?? 2.6, ease: "none", repeat: Math.ceil(S.len / (o.dur ?? 2.6)) }, t + (o.delay ?? 0));
  return g; };

const dustCloud = (S, x, y, k, t, o = {}) => { const g = S.grp(o.parent), c = o.name || "gray";
  [[0, 0, 90, 60], [-80, 20, 64, 46], [80, 22, 70, 48], [-30, -34, 60, 44], [36, -30, 56, 42]].forEach(([dx, dy, rx, ry], i) => DS.shape(S, circ(x + dx * k, y + dy * k, rx * k, ry * k), c, { t, tone: i % 2 ? 1 : 0, w: "detail", flat: true, parent: g }));
  for (let i = 0; i < 12; i++) S.fill(circ(x + (rnd() - 0.5) * 220 * k, y + (rnd() - 0.5) * 120 * k, (3 + rnd() * 3)), t ?? S.start, 0, DS.c("gray", 2), 0.8, g);
  return g; };
