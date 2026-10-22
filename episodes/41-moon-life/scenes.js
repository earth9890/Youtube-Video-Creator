// look: still
// What If You Tried to Live on the Moon? (~8:30). What-if escalation by time: hour one, day one, day four, week two, month one, then the pit.
// Runner: DAVE'S SUITCASE and its PACKING LIST (earplugs, sunscreen, warm jumper, one bottle, seeds): one item tested per chapter and crossed out;
// the dust is written in at the bottom (not on the list); the jumper is the only item that earns a green tick (in the pit, 17 C). He unpacks in the cave at the end.
// Second runner: EARTH hangs in the same spot of the black sky (top right, EX/EY) in every surface scene, and above the pit at the end.
// VISUAL SAFETY: nothing flashes or strobes. Stars never twinkle; molten salt and dust drift slowly; sunrise and sunset are slow tweens.
// Real people (Cernan, Schmitt, Conrad, Paige, Wimmer-Schweingruber, the ESA/Glasgow/UF/Trento teams) are never shown: generic labelled figures only.
// ---------- people ----------
const T0 = (S) => Math.max(0, S.start - 0.6); // static text pops in under the crossfade, so carried-over labels never blink
const txt = (S, s, x, y, o = {}) => S.text(s, x, y, Object.assign({ size: DS.type.caption, c: DS.c("ink") }, o, { t: o.t ?? T0(S) }));
const wtxt = (S, s, x, y, o = {}) => txt(S, s, x, y, Object.assign({ c: DS.P.white[0] }, o));
const card = (S, s, x, y, o = {}) => DS.card(S, s, x, y, Object.assign({ size: DS.type.small }, o, { t: o.t ?? T0(S) }));
// a figure on a depth plane; shadow and body share one group (F.all) so they fade and move together. o.gs = shadow y, o.float = no shadow
const who = (S, x, gy, layer = "near", o = {}) => {
  const s = (o.s || 1.1) * DS.depth[layer].s, g = o.parent || S.grp();
  if (!o.float) DS.shadow(S, x, o.gs ?? gy, 150 * s, { t: o.t, parent: g });
  const F = S.fig(x, gy, Object.assign({ hair: "short", outfit: "tee" }, o, { s, parent: g, w: DS.w[DS.depth[layer].w] * 1.3 * Math.sqrt(s) })).draw(o.t ?? S.start, 0.4);
  F.face(o.t ?? S.start, o.mood || "flat", o.look || 0);
  F.all = g; F.look = o.look || 0;
  if (o.tieC) tie(S, F, o.tieC);
  if (o.specs) specs(S, F);
  if (o.vest) vest(S, F);
  return F;
};
const tie = (S, F, name) => { const k = F.s, x = F.cx, y = F.sh[1] + 4 * k; DS.shape(S, `M${x - 7 * k} ${y} L${x + 7 * k} ${y} L${x + 10 * k} ${y + 54 * k} L${x} ${y + 68 * k} L${x - 10 * k} ${y + 54 * k} Z`, name, { w: "hair", flat: true, parent: F.g }); };
const specs = (S, F) => { const R = F.r, x = F.hd[0] + F.look * F.s * 0.8, y = F.hd[1] - 0.08 * R; S.draw(circ(x - 0.34 * R, y, 0.3 * R) + " " + circ(x + 0.34 * R, y, 0.3 * R) + " " + line([x - 0.05 * R, y], [x + 0.05 * R, y], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.detail, parent: F.g }); };
const vest = (S, F) => { const k = F.s, x = F.cx, y0 = F.sh[1] + 4 * k, y1 = F.hip[1] + 10 * k; DS.shape(S, `M${x - 34 * k} ${y0 + 6 * k} L${x - 12 * k} ${y0} L${x} ${y0 + 40 * k} L${x + 12 * k} ${y0} L${x + 34 * k} ${y0 + 6 * k} L${x + 34 * k} ${y1} L${x - 34 * k} ${y1} Z`, "yellow", { w: "detail", flat: true, parent: F.g }); S.draw(line([x - 34 * k, y1 - 34 * k], [x + 34 * k, y1 - 34 * k], 0), S.start, 0, { c: DS.c("gray", 1), w: DS.w.mid * k, parent: F.g }); };
const sweat = (S, F, t) => S.fill(`M${F.hd[0] + F.r * 0.95} ${F.hd[1] - F.r * 0.55} Q${F.hd[0] + F.r * 1.2} ${F.hd[1] - F.r * 0.1} ${F.hd[0] + F.r * 0.95} ${F.hd[1] - F.r * 0.05} Q${F.hd[0] + F.r * 0.72} ${F.hd[1] - F.r * 0.1} ${F.hd[0] + F.r * 0.95} ${F.hd[1] - F.r * 0.55} Z`, t ?? S.start, 0, DS.c("sky", 2), 1, F.g);
const DAVE = { s: 1.1, hair: "side", hairC: DS.c("brown"), outfitC: DS.c("blue") };
const dave = (S, x, gy, layer = "near", o = {}) => who(S, x, gy, layer, Object.assign({}, DAVE, o));
const ringFig = (S, F, t, name = "red") => S.draw(circ(F.cx, F.hd[1] + F.r * 2.4, F.r * 2.6, F.r * 4.2), t, 0, { c: DS.c(name), w: DS.w.near });
const ARM = { stand: [[-28, 52], [-48, 100]], reach: [[62, 10], [134, 8]], near: [[54, 12], [106, 10]], up: [[62, -10], [130, -44]], upNear: [[54, -6], [104, -34]] };
// arm jabs: right arm swings between "near" and "reach" n times (gap s); kind "up" for a raised button
// ---------- small kit ----------
let CP = 0;
const clipTo = (g, d) => { const id = "cp41-" + ++CP, cp = el("clipPath", { id }, dsDefs()); el("path", { d }, cp); g.setAttribute("clip-path", `url(#${id})`); return g; };
const spin = (g, t, dur, d0, d1, cx, cy, ease = "power1.inOut") => tl.fromTo(g, { attr: { transform: `rotate(${d0} ${cx} ${cy})` } }, { attr: { transform: `rotate(${d1} ${cx} ${cy})` }, duration: dur, ease, immediateRender: false }, t);
const scaleY = (g, t, x, y, dur = 0.6, k0 = 0.02, k1 = 1) => { const tf = (k) => `translate(${x} ${y}) scale(1 ${k}) translate(${-x} ${-y})`; tl.fromTo(g, { attr: { transform: tf(k0) } }, { attr: { transform: tf(k1) }, duration: dur, ease: "power2.out" }, t); };
const shift = (g, t, dur, from, to, ease = "power1.inOut") => tl.fromTo(g, { attr: { transform: `translate(${from[0]} ${from[1]})` } }, { attr: { transform: `translate(${to[0]} ${to[1]})` }, duration: dur, ease, immediateRender: false }, t);
const fadeG = (S, g, t, dur = 0.35) => { if (t !== undefined && t > S.start + 0.05) tl.fromTo(g, { opacity: 0 }, { opacity: 1, duration: dur }, t); return g; };
const dash = (p, a, b) => { p.removeAttribute("pathLength"); p.setAttribute("stroke-dasharray", `${a} ${b}`); return p; };
const tick = (S, x, y, k, t, name = "green", parent) => S.tick(x, y, k, t, 0, { c: DS.c(name), w: DS.w.near, parent });
const xMark = (S, x, y, k, t, parent) => S.cross(x, y, k, t, 0, { c: DS.c("red"), w: DS.w.near, parent });
const arrowR = (S, x1, y1, x2, y2, t, o = {}) => S.arrow(x1, y1, x2, y2, t, 0.3, { c: DS.c(o.c || "ink", o.tone || 0), w: DS.w.near, bend: o.bend || 0 });
const panel = (S, cx, cy, wd, ht, t, name = "white") => { const g = S.grp(); DS.drop(S, rrect(cx - wd / 2 + 8, cy - ht / 2 + 12, wd, ht, DS.r.md), { t, parent: g }); DS.shape(S, rrect(cx - wd / 2, cy - ht / 2, wd, ht, DS.r.md), name, { t, flat: true, w: "detail", parent: g }); return g; };
const paperR = (S, x, y, wd, ht, o = {}) => { DS.drop(S, rect(x + 6, y + 8, wd, ht), { t: o.t, parent: o.parent }); DS.shape(S, rect(x, y, wd, ht), o.name || "white", { t: o.t, w: "detail", flat: true, tone: o.tone || 0, parent: o.parent }); };
const lines = (S, x, y, wd, n, t, gap = 36, parent, c) => { for (let i = 0; i < n; i++) S.draw(line([x, y + i * gap], [x + (i === n - 1 ? wd * 0.6 : wd), y + i * gap], 0), t ?? S.start, 0, { c: c || DS.c("gray", 1), w: DS.w.detail, parent }); };
// speech or thought bubble with centred lines of text, all in one group (fades in at t)
const say = (S, cx, cy, rx, ry, tx, ty, strs, t, o = {}) => {
  const g = S.grp(); (o.think ? S.thought : S.speech)(cx, cy, rx, ry, tx, ty, S.start, 0.3, { parent: g });
  const size = o.size || DS.type.small, n = strs.length;
  strs.forEach((s, i) => S.text(s, cx, cy + size * 0.36 + (i - (n - 1) / 2) * size * 1.2, { size, t: T0(S), c: o.c ? DS.c(o.c, 2) : DS.c("ink"), font: o.font, parent: g }));
  return fadeG(S, g, t, 0.3);
};
const stamp = (S, cx, cy, str, t, name = "red", o = {}) => {
  const g = S.grp(), size = o.size || DS.type.small, wd = str.length * size * 0.66 + 60, ht = size * 1.75, rot = o.rot ?? -6, tf = (k) => `translate(${cx} ${cy}) rotate(${rot}) scale(${k}) translate(${-cx} ${-cy})`;
  S.draw(rrect(cx - wd / 2, cy - ht / 2, wd, ht, DS.r.sm), S.start, 0, { c: DS.c(name, 2), w: DS.w.near, fill: DS.P.white[0], parent: g });
  S.text(str, cx, cy + size * 0.36, { size, t: T0(S), c: DS.c(name, 2), parent: g });
  tl.fromTo(g, { opacity: 0, attr: { transform: tf(1.4) } }, { opacity: 1, attr: { transform: tf(1) }, duration: 0.25, ease: "power3.in" }, t);
  return g;
};
// seek-safe count-up text
const countUp = (S, x, y, from, to, t, dur, o = {}) => {
  const fmt = o.fmt || ((n) => Math.round(n).toLocaleString("en-US")), te = S.text(fmt(from), x, y, { size: o.size || DS.type.title, c: o.c || DS.c("red", 2), t: o.t0 ?? t, anchor: o.anchor, parent: o.parent });
  const v = { n: from }; te.textContent = fmt(from);
  tl.fromTo(v, { n: from }, { n: to, duration: dur, ease: o.ease || "power1.out", immediateRender: false, onUpdate: () => (te.textContent = fmt(v.n)) }, t);
  return te;
};
// a quick flash: fades in for a moment and out again (bursts, sparks)
const flash = (S, d, t, c, parent, w = DS.w.near) => { const p = el("path", { d, fill: "none", stroke: c, "stroke-width": w, "stroke-linecap": "round", opacity: 0 }, parent || S.g); tl.fromTo(p, { opacity: 0 }, { opacity: 1, duration: 0.05, immediateRender: false }, t); tl.to(p, { opacity: 0, duration: 0.3 }, t + 0.12); return p; };
// tiny doodle person (icons, counts)
const mini = (S, x, gy, k, o = {}) => {
  const t = o.t ?? S.start, c = o.c || DS.c("ink"), w = o.w || DS.w.mid, g = S.grp(o.parent);
  S.draw(`M${x} ${gy - 50 * k} L${x} ${gy - 22 * k} M${x - 11 * k} ${gy} L${x} ${gy - 22 * k} L${x + 11 * k} ${gy} M${x - 15 * k} ${gy - 30 * k} L${x} ${gy - 44 * k} L${x + 15 * k} ${gy - 30 * k}`, t, 0, { c, w, parent: g });
  S.draw(circ(x, gy - 63 * k, 13 * k), t, 0, { c, w, fill: o.fill || DS.P.white[0], parent: g });
  return g;
};


// ---------- Dave talks: open-mouth flaps over the closed mouth (the face itself never changes, so nothing blinks) ----------
const MOUTHC = DS.mix(DS.P.red[2], DS.P.ink[0], 0.45);
const flaps = (a, b, t0, t1) => { // a = small open mouth, b = big open mouth; a slow, irregular chatter
  const seq = [1, 2, 0, 2, 1, 2, 0, 1, 2, 2, 0, 1];
  let i = 0;
  for (let t = t0; t < t1 - 0.1; t += 0.2, i++) { const s = seq[i % seq.length]; tl.set(a, { opacity: s === 1 ? 1 : 0 }, t); tl.set(b, { opacity: s === 2 ? 1 : 0 }, t); }
  tl.set([a, b], { opacity: 0 }, t1);
};
const talk = (S, F, t0, t1) => {
  const R = F.r, x = F.hd[0] + (F.look || 0) * F.s * 0.8, y = F.hd[1] + 0.5 * R, g = F.P.head.parentNode, mk = (d) => el("path", { d, fill: MOUTHC, stroke: DS.P.ink[0], "stroke-width": Math.max(2.5, R * 0.05), opacity: 0 }, g);
  flaps(mk(circ(x, y, 0.14 * R, 0.09 * R)), mk(circ(x, y + 0.03 * R, 0.13 * R, 0.2 * R)), t0, t1);
};
const DAVE_S = 1.1;
// ---------- sky, stars, moon, earth, sun (from episode 31) ----------
let CPN = 0;
const clipG = (S, d, parent) => { const id = "cg" + ++CPN, cp = el("clipPath", { id }, dsDefs()); el("path", { d }, cp); const g = S.grp(parent); g.setAttribute("clip-path", `url(#${id})`); return g; };
const hgrad = (a, b) => { const id = "hg" + ++CPN, g = el("linearGradient", { id, x1: 0, y1: 0, x2: 1, y2: 0 }, dsDefs()); el("stop", { offset: 0, "stop-color": a }, g); el("stop", { offset: 1, "stop-color": b }, g); return `url(#${id})`; };
const dashed = (p, a = 0.03, b = 0.022) => (p.setAttribute("stroke-dasharray", `${a} ${b}`), p);
const stars = (S, n, x0, y0, x1, y1, o = {}) => { // one path for the whole field (keeps the DOM small); stars never twinkle
  const g = S.grp(o.parent), t = o.t ?? S.start; let d = "";
  for (let i = 0; i < n; i++) {
    const x = x0 + rnd() * (x1 - x0), y = y0 + rnd() * (y1 - y0), r = 1.4 + rnd() * rnd() * (o.big ?? 4); rnd();
    d += r > 3.6 ? `M${x} ${y - r * 2.2} L${x + r * 0.5} ${y - r * 0.5} L${x + r * 2.2} ${y} L${x + r * 0.5} ${y + r * 0.5} L${x} ${y + r * 2.2} L${x - r * 0.5} ${y + r * 0.5} L${x - r * 2.2} ${y} L${x - r * 0.5} ${y - r * 0.5} Z ` : circ(x, y, r) + " ";
  }
  S.fill(d, t, 0, DS.P.white[0], 0.8, g);
  return g;
};
// the Milky Way: a soft band of glow and dense stars from (x0,y0) to (x1,y1)
const milky = (S, x0, y0, x1, y1, o = {}) => {
  const g = S.grp(o.parent), t = o.t ?? S.start, L = Math.hypot(x1 - x0, y1 - y0), nx = -(y1 - y0) / L, ny = (x1 - x0) / L;
  for (let i = 0; i <= 10; i++) { const f = i / 10; S.fill(circ(x0 + (x1 - x0) * f, y0 + (y1 - y0) * f, 230, 230), t, 0, DS.glow(DS.P.glass[1], o.k ?? 0.2), 1, g); }
  let dd = ""; for (let i = 0; i < (o.n ?? 160); i++) { const f = rnd(), d = (rnd() + rnd() + rnd() - 1.5) * 170, r = 1.2 + rnd() * 1.6; rnd(); dd += circ(x0 + (x1 - x0) * f + nx * d, y0 + (y1 - y0) * f + ny * d, r) + " "; }
  S.fill(dd, t, 0, DS.P.white[0], 0.6, g);
  return g;
};
const MARIA = [[-0.28, -0.32, 0.26, 0.22], [0.12, -0.28, 0.16, 0.15], [0.24, 0.02, 0.2, 0.17], [0.6, -0.12, 0.1, 0.12], [-0.5, 0.08, 0.2, 0.34], [-0.2, 0.38, 0.15, 0.1]];
const moon = (S, cx, cy, r, o = {}) => {
  const t = o.t, g = S.grp(o.parent);
  if (o.glow !== false) S.fill(circ(cx, cy, r * 2.6), t ?? S.start, 0, DS.glow(DS.P.yellow[1], o.glowK ?? 0.4), 1, g);
  DS.shape(S, circ(cx, cy, r), "paper", { t, parent: g, w: r > 70 ? "mid" : "detail", c: DS.c("gray") });
  MARIA.forEach(([a, b, rx, ry]) => S.fill(circ(cx + a * r, cy + b * r, rx * r, ry * r), t ?? S.start, 0, DS.c("gray", 1), 0.5, g));
  [[0.22, 0.58, 0.07], [-0.5, -0.5, 0.06], [0.55, 0.3, 0.05], [-0.15, 0.6, 0.05]].forEach(([a, b, k]) => S.draw(circ(cx + a * r, cy + b * r, k * r), t ?? S.start, 0, { c: DS.c("gray", 1), w: DS.w.hair, parent: g }));
  return g;
};
const ghost = (S, cx, cy, r, t) => dashed(S.draw(circ(cx, cy, r), t ?? S.start, 0, { c: DS.P.white[0], w: DS.w.mid, op: 0.75 }));
// lit part of a moon phase: f 0 new .. 1 full; left = waning (lit on the left)
const litPath = (cx, cy, r, f, left = false) => {
  const rx = Math.abs(1 - 2 * f) * r, gib = f > 0.5, so = left ? 0 : 1, st = left ? (gib ? 0 : 1) : (gib ? 1 : 0);
  return `M${cx} ${cy - r} A${r} ${r} 0 0 ${so} ${cx} ${cy + r} A${Math.max(0.1, rx).toFixed(1)} ${r} 0 0 ${st} ${cx} ${cy - r} Z`;
};
const phase = (S, cx, cy, r, f, left, t) => {
  const g = S.grp();
  DS.shape(S, circ(cx, cy, r), "navy", { t, tone: 1, flat: true, w: "detail", c: DS.c("night", 1), parent: g });
  if (f > 0.02) DS.shape(S, litPath(cx, cy, r, f, left), "paper", { t, w: "hair", c: DS.c("gray"), parent: g });
  else dashed(S.draw(circ(cx, cy, r + 10), t ?? S.start, 0, { c: DS.P.white[0], w: DS.w.detail, parent: g, op: 0.8 }));
  return g;
};
const LAND = [
  [[-0.08, -0.62], [0.16, -0.66], [0.3, -0.48], [0.18, -0.3], [0.34, -0.06], [0.24, 0.36], [0.08, 0.56], [-0.02, 0.32], [-0.1, 0.06], [-0.26, -0.06], [-0.24, -0.34]],
  [[-0.78, -0.42], [-0.52, -0.56], [-0.42, -0.34], [-0.56, -0.08], [-0.48, 0.2], [-0.6, 0.48], [-0.72, 0.24], [-0.84, -0.06]],
  [[0.5, -0.62], [0.74, -0.44], [0.8, -0.16], [0.62, -0.1], [0.48, -0.3]],
  [[0.5, 0.3], [0.68, 0.24], [0.72, 0.42], [0.56, 0.5]],
];
// Earth: ocean with volume, land, clouds, ice caps, a soft atmosphere. o.tilt (deg) rotates land + axis; o.night shades the far side (o.nightA = angle the shadow faces, deg); o.young = molten young Earth
const earth = (S, cx, cy, r, o = {}) => {
  const t = o.t, g = S.grp(o.parent), T = t ?? S.start;
  if (o.atmo !== false) S.fill(circ(cx, cy, r * 1.3), T, 0, DS.glow(o.young ? DS.P.orange[1] : DS.P.sky[0], 0.4), 1, g);
  DS.shape(S, circ(cx, cy, r), o.young ? "red" : "blue", { t, parent: g, w: r > 120 ? "mid" : "detail", tone: o.young ? 2 : 0 });
  const lg = clipG(S, circ(cx, cy, r - 2), g);
  if (o.young) [[-0.4, -0.3, 0.34, 0.2], [0.3, -0.1, 0.3, 0.22], [-0.1, 0.4, 0.4, 0.18], [0.5, 0.5, 0.2, 0.14]].forEach(([a, b, rx, ry]) => DS.shape(S, circ(cx + a * r, cy + b * r, rx * r, ry * r), "orange", { t, parent: lg, w: "hair", c: DS.c("yellow", 1) }));
  else {
    LAND.forEach((P) => DS.shape(S, smooth([...P, P[0]].map(([a, b]) => [cx + a * r, cy + b * r])) + " Z", "grass", { t, parent: lg, w: r > 120 ? "detail" : "hair" }));
    [[0, -0.98, 0.5, 0.16], [0, 1, 0.42, 0.12]].forEach(([a, b, rx, ry]) => S.fill(circ(cx + a * r, cy + b * r, rx * r, ry * r), T, 0, DS.P.white[0], 0.95, lg));
    [[-0.3, -0.18, 0.34], [0.36, 0.2, 0.3], [-0.1, 0.62, 0.36], [0.2, -0.56, 0.24]].forEach(([a, b, w]) => S.draw(smooth([[cx + (a - w / 2) * r, cy + b * r], [cx + a * r, cy + (b - 0.05) * r], [cx + (a + w / 2) * r, cy + (b + 0.01) * r]]), T, 0, { c: DS.P.white[0], w: r > 120 ? DS.w.near : DS.w.mid, op: 0.85, parent: lg }));
  }
  if (o.tilt !== undefined) lg.setAttribute("transform", `rotate(${o.tilt} ${cx} ${cy})`);
  if (o.night) { const a = o.nightA ?? 0, sg = S.grp(lg); S.fill(`M${cx} ${cy - r * 1.2} A${r * 1.2} ${r * 1.2} 0 0 1 ${cx} ${cy + r * 1.2} Z`, T, 0, DS.P.ink[0], 0.5, sg); sg.setAttribute("transform", `rotate(${a - (o.tilt || 0)} ${cx} ${cy})`); }
  if (o.axis) { const ag = S.grp(g); dashed(S.draw(line([cx, cy - r * 1.45], [cx, cy + r * 1.45], 0), o.axisT ?? T, 0, { c: DS.P.white[0], w: DS.w.mid, parent: ag }), 0.05, 0.03); S.fill(circ(cx, cy - r * 1.45, 8), o.axisT ?? T, 0, DS.c("red"), 1, ag); ag.setAttribute("transform", `rotate(${o.tilt || 0} ${cx} ${cy})`); g.axis = ag; }
  S.draw(circ(cx, cy, r), T, 0, { c: DS.line(), w: r > 120 ? DS.w.mid : DS.w.detail, parent: g });
  return g;
};
const sun = (S, cx, cy, r, o = {}) => {
  const g = S.grp(o.parent), t = o.t;
  S.fill(circ(cx, cy, r * 1.9), t ?? S.start, 0, DS.glow(DS.P.yellow[1], 0.7), 1, g);
  DS.shape(S, circ(cx, cy, r), "yellow", { t, parent: g, c: DS.c("orange", 2), w: r > 120 ? "mid" : "detail" });
  return g;
};
// curved spin arrow round (cx, cy); turns over the scene when o.go is a time
const ridge = (y, amp, ph, x0 = -200, x1 = 2120) => smooth(Array.from({ length: 9 }, (_, i) => [x0 + (i * (x1 - x0)) / 8, y - amp * (0.5 + 0.5 * Math.sin(i * 1.3 + ph))])) + ` L${x1} 1280 L${x0} 1280 Z`;
// night landscape: sky gradient, stars (and o.moon / o.milky) behind two hill planes and a ground plane
const land = (S, o = {}) => {
  DS.setHaze("night");
  const P = o.pal || NIGHTP(), hy = o.hy || 700, g = S.grp(o.parent), sh = (d, fill) => S.fill(d, S.start, 0, fill, 1, g);
  sh(rect(-200, -200, 2320, 1480), DS.vgrad(P.sky[0], P.sky[1]));
  const sky = S.grp(g);
  if (o.stars !== false) stars(S, o.stars || 80, -100, -100, 2020, hy - 30, { parent: sky });
  if (o.milky) milky(S, ...o.milky, { parent: sky, t: o.milkyT });
  if (o.moon) moon(S, o.moon[0], o.moon[1], o.moon[2], { parent: sky, t: o.moonT });
  sh(ridge(hy - 60, 80, o.ph ?? 0.7), P.far);
  sh(ridge(hy - 10, 50, (o.ph ?? 0.7) + 1.5), P.mid);
  sh(ridge(hy + 30, 16, 4.1), DS.vgrad(P.ground[0], P.ground[1]));
  return { g, sky, hy };
};
const space = (S, o = {}) => {
  DS.setHaze("night");
  const g = S.grp(); S.fill(rect(-200, -200, 2320, 1480), S.start, 0, DS.vgrad(DS.P.navy[2], DS.P.ink[2]), 1, g);
  if (o.milky) milky(S, ...o.milky, { parent: g, k: 0.12, n: 120 });
  stars(S, o.n ?? 120, -100, -100, 2020, 1180, { parent: g });
  return g;
};
// acacia silhouette (savanna)
const house = (S, x, gy, k, o = {}) => {
  const L = o.layer || "mid";
  DS.shadow(S, x, gy, 340 * k);
  DS.shape(S, rect(x + 70 * k, gy - 330 * k, 40 * k, 90 * k), "brown", { layer: L, w: "detail" });
  DS.shape(S, rect(x - 150 * k, gy - 210 * k, 300 * k, 210 * k), "wall", { layer: L, tone: 2 });
  DS.shape(S, `M${x - 180 * k} ${gy - 200 * k} L${x} ${gy - 330 * k} L${x + 180 * k} ${gy - 200 * k} Z`, "red", { layer: L, tone: 2 });
  DS.shape(S, rrect(x - 30 * k, gy - 120 * k, 60 * k, 120 * k, DS.r.xs), "wood", { layer: L, w: "detail" });
  [-95, 95].forEach((dx) => DS.shape(S, rect(x + dx * k - 32 * k, gy - 160 * k, 64 * k, 60 * k), o.lit ? "yellow" : "navy", { layer: L, flat: true, tone: o.lit ? 1 : 2, w: "detail" }));
};


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

// ---------- timing: one picture per beat (merged clips share a picture), landing just after its first word ----------
const CUES = [[1, 0], [2, 0], [3, 0], [4, 0], [4, 14], [5, 0], [5, 14], [6, 0], [7, 0], [7, 15],
  [8, 0], [8, 6], [9, 0], [10, 0], [11, 0], [12, 0], [13, 0], [13, 15], [14, 0], [14, 9], [15, 0],
  [16, 0], [16, 10], [17, 0], [17, 11], [18, 0], [19, 0], [20, 5], [21, 0], [22, 0], [23, 0], [24, 0], [25, 0], [25, 19],
  [26, 0], [27, 0], [28, 0], [29, 0], [29, 10], [29, 17], [30, 0], [30, 10], [31, 0], [32, 0], [33, 0], [33, 9], [34, 0], [35, 0], [35, 9], [36, 0], [36, 9],
  [37, 0], [38, 0], [39, 0], [39, 9], [40, 0], [40, 15], [41, 0], [42, 0], [42, 7], [42, 17], [43, 0], [43, 8],
  [44, 0], [44, 11], [45, 0], [45, 11], [46, 0], [46, 12], [47, 0], [48, 0], [49, 4], [50, 0], [51, 0], [51, 5], [52, 0], [53, 0], [54, 0], [54, 18],
  [55, 0], [56, 0], [56, 19], [57, 0], [58, 0], [59, 6], [59, 20], [60, 0], [61, 0], [61, 11], [62, 6], [63, 0], [64, 0], [65, 0], [65, 6], [66, 0], [66, 14],
  [67, 0], [67, 10], [68, 0], [69, 0], [69, 7], [70, 0], [70, 8], [71, 0], [72, 0], [73, 0]];
const WINS = sceneWindows(CUES, -0.25);
const sc = (c, w, o) => { const k = CUES.findIndex(([a, b]) => a === c && b === w); if (k < 0) throw new Error("no cue " + c + ":" + w); return scene(WINS[k][0], WINS[k][1], o); };
const ROOM = { wall: "wall", floor: "wood", window: false };

// ===================== 1. One suitcase =====================
// This is Dave. Dave has packed one suitcase, because Dave is moving to the Moon.
{ const S = sc(1, 0, { cam: "push", focus: "960 640" }); land(S, { hy: 720, moon: [1470, 250, 150] });
  house(S, 360, 800, 1.5, { lit: true });
  const F = dave(S, 900, 950, "near", { s: 1.3, look: 6, mood: "happy", pose: "point" });
  card(S, "DAVE", 900, 330, { t: W(1, 2) });
  fadeG(S, suitcase(S, 1120, 950, 0.9), W(1, 6));
  DS.vignette(S, 0.2); }

// He wants somewhere quiet, with a great view, where nobody knocks on the door.
{ const S = sc(2, 0, { cam: "push", focus: "960 540" }); DS.room(S, ROOM);
  const X = [400, 960, 1520];
  X.forEach((x, i) => fadeG(S, panel(S, x, 380, 440, 440, [S.start, W(2, 3), W(2, 10)][i] ?? S.start), [S.start, W(2, 3), W(2, 10)][i]));
  const t = [W(2, 3), W(2, 6), W(2, 10)];
  { const g = S.grp(); S.fill(circ(X[0], 380, 100), t[0], 0, DS.c("night"), 1, g); S.fill(circ(X[0] + 36, 355, 84), t[0], 0, DS.c("night", 2), 1, g); S.zzz(X[0] - 40, 400, t[0], 0.9); fadeG(S, g, t[0]); card(S, "QUIET", X[0], 520, { t: t[0] }); }
  { const g = S.grp(); DS.shape(S, rrect(X[1] - 170, 230, 340, 220, DS.r.xs), "wood", { w: "detail", parent: g });
    S.fill(rect(X[1] - 150, 250, 300, 180), S.start, 0, DS.vgrad(DS.P.ink[2], DS.P.navy[2]), 1, g); stars(S, 18, X[1] - 150, 250, X[1] + 150, 430, { parent: g, big: 2 }); earth(S, X[1] + 40, 340, 52, { parent: g, night: true, nightA: 20 });
    fadeG(S, g, t[1]); card(S, "GREAT VIEW", X[1], 520, { t: t[1] }); }
  { const g = S.grp(); DS.shape(S, rrect(X[2] - 80, 230, 160, 250, DS.r.sm), "wood", { t: t[2], w: "near", parent: g }); S.fill(circ(X[2] + 44, 370, 12), t[2], 0, DS.c("gold"), 1, g);
    [[-120, 320], [-120, 380]].forEach(([dx, dy], i) => S.draw(arc(X[2] + dx, dy, 22 + i * 18, -50, 50), t[2], 0, { c: DS.c("orange"), w: DS.w.near, parent: g }));
    S.draw(line([X[2] - 120, 210], [X[2] + 120, 500], 0), t[2] + 0.3, 0, { c: DS.c("red"), w: DS.w.near * 1.4, parent: g }); card(S, "NO KNOCKING", X[2], 520, { t: t[2] }); }
  dave(S, 960, 960, "near", { s: 0.82, look: 0, mood: "smile", pose: "think" });
  DS.vignette(S, 0.2); }

// So what if you tried to live on the Moon? Not visit for an afternoon. Live there.
{ const S = sc(3, 0, { cam: "pull" }); space(S, { milky: [200, 900, 1700, 120] });
  moon(S, 960, 560, 310);
  card(S, "LIVE ON THE MOON?", 960, 150, { size: DS.type.title, t: W(3, 6) });
  const a = card(S, "VISIT", 560, 900, { t: W(3, 10) }); S.draw(line([560 - a.w / 2, 900], [560 + a.w / 2, 880], 0), W(3, 12), 0, { c: DS.c("red"), w: DS.w.near * 1.4 });
  card(S, "LIVE", 1380, 900, { t: W(3, 15), fill: "gold" }); S.draw(rrect(1380 - 130, 900 - 62, 260, 124, DS.r.md), W(3, 16), 0, { c: DS.c("green"), w: DS.w.near });
  DS.vignette(S, 0.2); }

// Twelve people have walked on the Moon, and the longest anyone has stayed is about three days.
{ const S = sc(4, 0, { cam: "push", focus: "960 640" }); const L = lunar(S, { sun: [260, 170, 46] });
  const cnt = countUp(S, 960, 330, 0, 12, W(4, 0), WE(4, 3) - W(4, 0), { size: DS.type.display, c: DS.P.white[0], ease: "none" });
  const row = S.grp(); for (let i = 0; i < 12; i++) miniAstro(S, 330 + i * 114, 880, 1.9, W(4, 0) + (i / 12) * (WE(4, 3) - W(4, 0)), { parent: row });
  txt(S, "PEOPLE ON THE MOON", 960, 410, { size: DS.type.small, c: DS.P.white[0], t: W(4, 1) });
  const T = W(4, 8); S.hide(cnt, T);
  const g = S.grp(); [0, 1, 2].forEach((i) => tile(S, 640 + i * 230, 460, 190, "DAY " + (i + 1), "yellow", T + 0.15 * i, { parent: g, size: DS.type.small }));
  fadeG(S, g, T);
  card(S, "LONGEST STAY: ABOUT 3 DAYS", 780, 250, { size: DS.type.body, t: T });
  DS.vignette(S, 0.2); }

// Dave has packed for longer.
{ const S = sc(4, 14, { cam: "push", focus: "960 640" }); lunar(S, { sun: [260, 170, 46] });
  const g = S.grp(); for (let i = 0; i < 12; i++) tile(S, 160 + i * 126, 330, 104, "", i < 3 ? "gray" : "yellow", W(4, 18) + i * 0.08, { parent: g, tone: i < 3 ? 2 : 1 });
  txt(S, "3 DAYS", 338, 480, { size: DS.type.caption, c: DS.P.white[0], t: S.start });
  card(S, "PACKED FOR LONGER", 760, 190, { t: W(4, 19) });
  daveM(S, 700, 940, "near", { s: 1.3, look: 6, mood: "smile", pose: "hips" });
  fadeG(S, suitcase(S, 1000, 940, 0.9), W(4, 18));
  DS.vignette(S, 0.2); }

// Earplugs, sunscreen, a warm jumper, one bottle of water, and a packet of seeds, because every home needs a garden.
{ const S = sc(5, 0, { cam: "push", focus: "700 600" }); DS.room(S, ROOM);
  suitcase(S, 740, 940, 1.6, { open: true });
  const items = [[ITEM.earplugs, 330, 340, 1.3, 0], [ITEM.sunscreen, 520, 270, 1.1, 1], [ITEM.jumper, 760, 250, 1.1, 3], [ITEM.bottle, 980, 270, 0.9, 5], [ITEM.seeds, 1150, 350, 1.1, 10]];
  items.forEach(([fn, x, y, k, w]) => { const g = fn(S, x, y, k); fadeG(S, g, W(5, w)); shift(g, W(5, w), 0.6, [0, -60], [0, 0], "power2.out"); });
  plist(S, { x: 1350, y: 150, t: W(5, 0), big: false });
  DS.vignette(S, 0.2); }

// ... because every home needs a garden.
{ const S = sc(5, 14, { cam: "push", focus: "960 600" }); DS.room(S, ROOM);
  const sp = ITEM.seeds(S, 640, 560, 3.0, { t: T0(S) });
  pot(S, 1280, 900, 2.2, T0(S)); const sg = sprout(S, 1280, 690, 2.2, W(5, 17)); scaleY(sg, W(5, 17), 1280, 690, 1.2, 0.05);
  card(S, "EVERY HOME NEEDS A GARDEN", 960, 150, { t: W(5, 15) });
  DS.vignette(S, 0.2); }

// "One suitcase. Honestly, how hard can the Moon be?"
{ const S = sc(6, 0, { cam: "push", focus: "700 560" }); land(S, { hy: 720, moon: [1560, 220, 120] });
  const F = dave(S, 560, 960, "near", { s: 1.5, look: 4, mood: "smile", pose: "hips" }); talk(S, F, W(6, 0), END(6));
  suitcase(S, 1080, 960, 1.0);
  say(S, 1180, 400, 500, 210, 680, 500, ["ONE SUITCASE.", "HONESTLY, HOW HARD", "CAN THE MOON BE?"], W(6, 0), { size: DS.type.small });
  DS.vignette(S, 0.2); }

// By hour one, he can't hear a thing. By day four, he's broken a record.
{ const S = sc(7, 0, { cam: "push", focus: "960 640" }); lunar(S, { sun: [260, 170, 46] });
  card(S, "HOUR ONE", 560, 170, { size: DS.type.title, t: W(7, 1) });
  const F = daveM(S, 960, 940, "near", { s: 1.3, look: 0, mood: "worried", pose: "head" });
  const sp = speaker(S, 400, 760, 1.4, W(7, 4)); waves(S, 450, 760, 1.1, W(7, 4)); fadeG(S, sp, W(7, 4));
  xMark(S, 400, 760, 2.4, W(7, 6));
  F.face(W(7, 9), "happy", 0); F.setPose(W(7, 9), "armsUp");
  card(S, "DAY FOUR", 1060, 330, { size: DS.type.title, t: W(7, 9) });
  const tr = S.grp(); S.trophy(1560, 900, 1.5, W(7, 12), 0.5, { parent: tr }); fadeG(S, tr, W(7, 12)); shift(tr, W(7, 12), 0.6, [0, -80], [0, 0], "power2.out");
  DS.vignette(S, 0.2); }

// And by week two, the sun goes down for two weeks.
{ const S = sc(7, 15, { cam: "push", focus: "960 640" }); const L = lunar(S, { hy: 640, sun: [960, 560, 70] });
  card(S, "WEEK TWO", 960, 170, { size: DS.type.title, t: W(7, 16) });
  tl.fromTo(L.sunG, { y: 0 }, { y: 230, duration: WE(7, 25) - W(7, 19), ease: "power1.inOut" }, W(7, 19));
  daveM(S, 600, 940, "near", { s: 1.3, look: 5, mood: "worried", pose: "stand" });
  DS.vignette(S, 0.2); }

// ===================== 2. Hour one =====================
const ROOM2 = { wall: "glass", floor: "wood", window: false };
const lander = (S, x, gy, k, parent) => { const g = S.grp(parent);
  DS.shadow(S, x, gy, 520 * k, { parent: g });
  [-1, 1].forEach((sd) => { S.draw(`M${x + sd * 60 * k} ${gy - 150 * k} L${x + sd * 210 * k} ${gy - 8 * k}`, S.start, 0, { c: DS.c("gray", 2), w: DS.w.near, parent: g }); DS.shape(S, circ(x + sd * 214 * k, gy - 6 * k, 34 * k, 10 * k), "gray", { tone: 2, w: "detail", parent: g }); });
  DS.shape(S, `M${x - 120 * k} ${gy - 150 * k} L${x - 90 * k} ${gy - 220 * k} H${x + 90 * k} L${x + 120 * k} ${gy - 150 * k} L${x + 90 * k} ${gy - 100 * k} H${x - 90 * k} Z`, "gold", { w: "near", parent: g });
  DS.shape(S, `M${x - 80 * k} ${gy - 220 * k} L${x - 60 * k} ${gy - 300 * k} H${x + 60 * k} L${x + 80 * k} ${gy - 220 * k} Z`, "gray", { tone: 1, w: "near", parent: g });
  DS.shape(S, circ(x, gy - 262 * k, 22 * k), "glass", { w: "detail", parent: g });
  S.draw(`M${x - 40 * k} ${gy - 100 * k} L${x - 70 * k} ${gy - 8 * k} M${x - 18 * k} ${gy - 100 * k} L${x - 46 * k} ${gy - 8 * k}`, S.start, 0, { c: DS.c("gray", 2), w: DS.w.mid, parent: g });
  for (let i = 1; i < 6; i++) S.draw(line([x - 66 * k + (i * 5 * k) , gy - 100 * k + i * 15 * k], [x - 44 * k + i * 4 * k, gy - 100 * k + i * 15 * k], 0), S.start, 0, { c: DS.c("gray", 2), w: DS.w.detail, parent: g });
  return g; };
const kangaroo = (S, x, gy, k, parent) => { const g = S.grp(parent);
  DS.shadow(S, x, gy, 240 * k, { parent: g });
  S.draw(`M${x - 40 * k} ${gy - 70 * k} Q${x - 150 * k} ${gy - 30 * k} ${x - 190 * k} ${gy}`, S.start, 0, { c: DS.c("earth", 2), w: DS.w.near * 2.2, parent: g });
  DS.shape(S, smooth([[x - 60 * k, gy - 60 * k], [x - 70 * k, gy - 170 * k], [x - 20 * k, gy - 250 * k], [x + 40 * k, gy - 180 * k], [x + 56 * k, gy - 60 * k], [x - 60 * k, gy - 60 * k]]) + " Z", "earth", { w: "near", parent: g });
  DS.shape(S, circ(x + 4 * k, gy - 118 * k, 26 * k, 36 * k), "sand", { w: "detail", parent: g });
  DS.shape(S, `M${x - 70 * k} ${gy - 70 * k} Q${x - 10 * k} ${gy - 130 * k} ${x + 70 * k} ${gy - 60 * k} L${x + 120 * k} ${gy - 8 * k} H${x - 10 * k} Z`, "earth", { w: "near", tone: 2, parent: g });
  DS.shape(S, rrect(x + 60 * k, gy - 22 * k, 90 * k, 22 * k, DS.r.sm * k), "earth", { w: "near", tone: 2, parent: g });
  DS.shape(S, circ(x - 14 * k, gy - 270 * k, 36 * k, 32 * k), "earth", { w: "near", parent: g });
  DS.shape(S, `M${x + 6 * k} ${gy - 268 * k} L${x + 62 * k} ${gy - 252 * k} L${x + 14 * k} ${gy - 236 * k} Z`, "sand", { w: "detail", parent: g });
  [-34, -6].forEach((dx) => DS.shape(S, `M${x + dx * k} ${gy - 296 * k} Q${x + (dx - 10) * k} ${gy - 360 * k} ${x + (dx + 12) * k} ${gy - 350 * k} Q${x + (dx + 22) * k} ${gy - 320 * k} ${x + (dx + 14) * k} ${gy - 294 * k} Z`, "earth", { w: "detail", parent: g }));
  S.fill(circ(x + 2 * k, gy - 276 * k, 4 * k), S.start, 0, DS.P.ink[0], 1, g);
  [[-6, -190], [24, -176]].forEach(([dx, dy]) => S.draw(`M${x + dx * k} ${dy + gy} l${28 * k} ${12 * k}`, S.start, 0, { c: DS.c("earth", 2), w: DS.w.mid, parent: g }));
  return g; };
const bell = (S, x, gy, k, parent) => { const g = S.grp(parent);
  DS.shadow(S, x, gy, 200 * k, { parent: g });
  DS.shape(S, rect(x - 8 * k, gy - 230 * k, 16 * k, 50 * k), "gray", { tone: 2, w: "detail", parent: g });
  DS.shape(S, `M${x - 100 * k} ${gy - 80 * k} Q${x - 90 * k} ${gy - 230 * k} ${x} ${gy - 240 * k} Q${x + 90 * k} ${gy - 230 * k} ${x + 100 * k} ${gy - 80 * k} Z`, "gold", { w: "near", parent: g });
  DS.shape(S, rrect(x - 116 * k, gy - 84 * k, 232 * k, 24 * k, DS.r.xs), "gold", { tone: 2, w: "mid", parent: g });
  DS.shape(S, circ(x, gy - 50 * k, 20 * k), "gold", { tone: 2, w: "mid", parent: g });
  return g; };
const earRing = (S, t, o = {}) => dashed(S.draw(circ(EX, EY, ER + (o.pad ?? 30)), t, 0, { c: DS.P.white[0], w: DS.w.mid, op: 0.9 }), 0.025, 0.02);

// Dave steps outside and feels lighter.
{ const S = sc(8, 0, { cam: "push", focus: "960 700" }); lunar(S, { sun: [260, 170, 46], prints: [[900, 930], [1000, 910]] });
  lander(S, 330, 880, 1.3);
  const F = daveM(S, 820, 940, "near", { s: 1.3, look: 5, mood: "happy", pose: "armsUp" });
  suitcase(S, 1140, 940, 0.9);
  tl.fromTo(F.g, { y: 0 }, { y: -50, duration: 0.55, ease: "sine.out", yoyo: true, repeat: 1 }, W(8, 4));
  card(S, "LIGHTER", 900, 190, { t: W(8, 4), size: DS.type.title });
  DS.vignette(S, 0.2); }

// The Moon's gravity is about one sixth of Earth's, so in theory, he can jump about six times higher.
{ const S = sc(8, 6, { cam: "push", focus: "960 640" }); lunar(S, { sun: [260, 170, 46] });
  card(S, "GRAVITY: ABOUT 1/6 OF EARTH'S", 900, 170, { t: W(8, 7), size: DS.type.body });
  const U = 70, gy = 940, rx = 1240;
  S.draw(line([rx, gy], [rx, gy - 6.4 * U], 0), S.start, 0, { c: DS.P.white[0], w: DS.w.mid });
  for (let i = 1; i <= 6; i++) { S.draw(line([rx - 16, gy - i * U], [rx + 16, gy - i * U], 0), S.start, 0, { c: DS.P.white[0], w: DS.w.mid }); txt(S, String(i), rx + 52, gy - i * U + 14, { size: DS.type.caption, c: DS.P.white[0] }); }
  S.fill(rect(rx - 120, gy - U, 60, U), W(8, 18) - 0.2, 0, DS.c("red"), 1);
  card(S, "EARTH: 1×", rx - 70, gy - U - 60, { t: W(8, 18), size: DS.type.caption });
  card(S, "MOON: 6×", rx + 130, gy - 6 * U - 60, { t: W(8, 21), size: DS.type.caption });
  const mb = S.fill(rect(rx + 90, gy - 6 * U, 60, 6 * U), W(8, 21), 0, DS.c("green"), 1);
  const F = daveM(S, 320, gy, "near", { s: 1.3, look: 5, mood: "happy", pose: "armsUp" });
  tl.fromTo(F.g, { y: 0 }, { y: -6 * U, duration: 1.1, ease: "power2.out", yoyo: true, repeat: 1 }, W(8, 19));
  DS.vignette(S, 0.2); }

// He bounces like a kangaroo. NASA's notes say no Apollo astronaut used that hop on flat ground, except in play. Dave is playing.
{ const S = sc(9, 0, { cam: "push", focus: "960 640" }); lunar(S, { sun: [260, 170, 46] });
  const F = daveM(S, 1520, 940, "near", { s: 1.3, look: -4, mood: "happy", pose: "armsUp" });
  const K = kangaroo(S, 1000, 940, 1.3);
  tl.fromTo(K, { y: 0 }, { y: -150, duration: 0.7, ease: "sine.out", yoyo: true, repeat: 3 }, W(9, 1)); tl.to(K, { opacity: 0, duration: 0.5 }, W(9, 5) - 0.2);
  tl.fromTo(F.g, { y: 0 }, { y: -150, duration: 0.7, ease: "sine.out", yoyo: true, repeat: Math.ceil((END(9) - W(9, 1)) / 1.4) }, W(9, 1));
  const kc = card(S, "LIKE A KANGAROO", 900, 190, { t: W(9, 2), size: DS.type.body }); S.hide(kc.g, W(9, 5));
  const pg = S.grp(); paperR(S, 150, 380, 400, 480, { parent: pg }); txt(S, "NASA NOTES", 350, 450, { size: DS.type.caption, parent: pg }); lines(S, 190, 500, 320, 7, S.start, 44, pg);
  fadeG(S, pg, W(9, 5));
  const A = astro(S, 900, 940, "near", { s: 1.3, look: 5, mood: "flat", pose: "stand" }); fadeG(S, A.all, W(9, 6));
  A.walk(W(9, 7), 2.0, { x: 90 });
  card(S, "NO HOP ON FLAT GROUND", 900, 190, { t: W(9, 8), size: DS.type.body, tc: "red" });
  tl.fromTo(A.g, { y: 0 }, { y: -130, duration: 0.6, ease: "sine.out", yoyo: true, repeat: 3 }, W(9, 17));
  card(S, "EXCEPT IN PLAY", 900, 300, { t: W(9, 17), fill: "gold" });
  DS.vignette(S, 0.2); }

// Then he notices the quiet. Sound needs air to travel through, and the Moon has almost none.
{ const S = sc(10, 0, { cam: "push", focus: "960 640" }); lunar(S, { sun: [260, 170, 46] });
  const F = daveM(S, 560, 940, "near", { s: 1.3, look: 6, mood: "worried", pose: "stand", armR: [[52, -6], [44, -70]] });
  bell(S, 1300, 920, 1.3);
  card(S, "SOUND NEEDS AIR", 900, 190, { t: W(10, 5), size: DS.type.body });
  const arcs = S.grp(); [0, 1, 2, 3].forEach((i) => { const a = S.draw(arc(1300, 760, 170 + i * 70, 120, 240), W(10, 6) + i * 0.25, 0, { c: DS.c("yellow"), w: DS.w.near, op: 0.9 - i * 0.2, parent: arcs }); });
  const nx = S.grp(); S.draw(arc(1300, 760, 170 + 4 * 70, 150, 210), W(10, 13), 0, { c: DS.c("red"), w: DS.w.near, parent: nx }); xMark(S, 900, 770, 2.4, W(10, 13), nx);
  card(S, "ALMOST NO AIR", 960, 880, { t: W(10, 13), size: DS.type.small, tc: "red" });
  DS.vignette(S, 0.2); }

// A sugar cube of Earth's air holds about a hundred trillion times more molecules than the same space just above the Moon.
{ const S = sc(11, 0, { cam: "push", focus: "960 540" }); DS.room(S, ROOM2);
  const cy = 520, s = 170, L = 560, R = 1360;
  cube(S, L, cy, s, "white", S.start); dotsIn(S, L - 150, cy - 60, L + 150, cy + 130, 90, W(11, 5), DS.c("blue"), undefined, 6);
  card(S, "EARTH'S AIR", L, 190, { t: W(11, 1), size: DS.type.small });
  const mg = S.grp(); cube(S, R, cy, s, "white", S.start, { parent: mg }); S.fill(circ(R + 20, cy + 40, 6), S.start, 0, DS.c("blue"), 1, mg); fadeG(S, mg, W(11, 14));
  card(S, "ABOVE THE MOON", R, 190, { t: W(11, 15), size: DS.type.small });
  card(S, "ABOUT 100 TRILLION ×", 960, 880, { t: W(11, 9), size: DS.type.title, tc: "red" });
  DS.vignette(S, 0.2); }

// So Dave has brought earplugs to a place where sound can't even travel.
{ const S = sc(12, 0, { cam: "push", focus: "960 640" }); lunar(S, { sun: [260, 170, 46] });
  plist(S, { cross: [[0, W(12, 9)]] });
  const F = daveM(S, 860, 940, "near", { s: 1.4, look: 0, mood: "flat", pose: "stand" });
  [-1, 1].forEach((sd) => DS.shape(S, circ(F.hd[0] + sd * F.r * 1.03, F.hd[1] + F.r * 0.1, 0.18 * F.r, 0.26 * F.r), "orange", { w: "hair", parent: F.g }));
  const e = ITEM.earplugs(S, 1360, 640, 2.2, { t: W(12, 4) }); fadeG(S, e, W(12, 4));
  const sp = speaker(S, 1250, 840, 0.8, W(12, 9)); fadeG(S, sp, W(12, 9)); xMark(S, 1260, 840, 1.6, W(12, 10));
  DS.vignette(S, 0.2); }

// The sky is black, even at midday, because there's no air to scatter the sunlight.
{ const S = sc(13, 0, { cam: "push", focus: "960 640" }); lunar(S, { sun: [960, 190, 64] });
  card(S, "BLACK SKY AT MIDDAY", 1160, 400, { t: W(13, 3), size: DS.type.title });
  const rg = S.grp(); [[560, 780], [760, 820], [960, 840], [1160, 820], [1360, 780]].forEach(([x, y]) => dashed(S.draw(line([960, 250], [x, y], 0), W(13, 10), 0, { c: DS.c("yellow", 1), w: DS.w.near, op: 0.7, parent: rg }), 0.04, 0.025));
  card(S, "NO AIR TO SCATTER LIGHT", 1160, 560, { t: W(13, 9), size: DS.type.small });
  daveM(S, 420, 940, "near", { s: 1.3, look: 6, mood: "wow", pose: "stand" });
  DS.vignette(S, 0.2); }

// And hanging in that black sky is the Earth.
{ const S = sc(13, 15, { cam: "none" }); lunar(S, { sun: [260, 170, 46] });
  const F = daveM(S, 700, 940, "near", { s: 1.3, look: 7, mood: "wow", pose: "point" });
  earRing(S, W(13, 21)); card(S, "THE EARTH", EX, EY + 190, { t: W(13, 22), size: DS.type.small });
  S.zoom(1100, 520, 1.12, W(13, 18), 2.4);
  DS.vignette(S, 0.2); }

// On the side of the Moon that faces us, Earth stays in almost the same spot.
{ const S = sc(14, 0, { cam: "pull" }); space(S, { milky: [200, 900, 1700, 120] });
  earth(S, 420, 540, 200);
  moon(S, 1380, 540, 140);
  const m = miniAstro(S, 1230, 540, 1.2, W(14, 3)); dashed(S.draw(line([1190, 520], [680, 520], 0), W(14, 3), 0, { c: DS.P.white[0], w: DS.w.mid, op: 0.85 }), 0.03, 0.02);
  card(S, "THE SIDE THAT FACES US", 960, 160, { t: W(14, 2), size: DS.type.body });
  card(S, "ALWAYS FACING EARTH", 1380, 800, { t: W(14, 7), size: DS.type.small });
  DS.vignette(S, 0.2); }

// Earth stays in almost the same spot. It never rises, and it never sets.
{ const S = sc(14, 9, { cam: "none" }); const L = lunar(S, { night: true, sun: [200, 160, 40] });
  tl.fromTo(L.sky, { rotation: 0 }, { rotation: 12, svgOrigin: "960 760", duration: S.len, ease: "none" }, S.start);
  earRing(S, W(14, 9)); card(S, "EARTH STAYS PUT", 900, 190, { t: W(14, 9), size: DS.type.body });
  const ar = S.grp();
  S.arrow(EX - 190, EY + 60, EX - 190, EY - 90, W(14, 17), 0.3, { c: DS.P.white[0], w: DS.w.near, parent: ar }); xMark(S, EX - 190, EY - 10, 1.4, W(14, 17));
  S.arrow(EX + 190, EY - 60, EX + 190, EY + 90, W(14, 21), 0.3, { c: DS.P.white[0], w: DS.w.near, parent: ar }); xMark(S, EX + 190, EY + 10, 1.4, W(14, 21));
  daveM(S, 800, 940, "near", { s: 1.3, look: 7, mood: "smile", pose: "stand" });
  DS.vignette(S, 0.2); }

// Dave wanted a home with a view. He got a view that never moves.
{ const S = sc(15, 0, { cam: "none" }); lunar(S, { sun: [260, 170, 46] });
  const fr = S.grp(); DS.shape(S, `M${EX - 150} ${EY - 130} H${EX + 150} V${EY + 130} H${EX - 150} Z M${EX - 120} ${EY - 100} V${EY + 100} H${EX + 120} V${EY - 100} Z`, "wood", { w: "near", parent: fr }); fadeG(S, fr, W(15, 3));
  const F = daveM(S, 760, 940, "near", { s: 1.3, look: 7, mood: "happy", pose: "hips" }); F.face(W(15, 8), "flat", 7);
  suitcase(S, 1000, 940, 0.8);
  const pn = S.grp(); S.fill(circ(EX + 70, EY - 40, 14), W(15, 11), 0, DS.c("red"), 1, pn); S.draw(line([EX + 70, EY - 26], [EX + 62, EY + 10], 0), W(15, 11), 0, { c: DS.c("gray", 2), w: DS.w.mid, parent: pn });
  card(S, "A VIEW THAT NEVER MOVES", 900, 190, { t: W(15, 9), size: DS.type.body });
  DS.vignette(S, 0.2); }

// ===================== 3. Day one =====================
// But a day on the Moon isn't really a day.
{ const S = sc(16, 0, { cam: "push", focus: "960 640" }); lunar(S, { sun: [260, 170, 46] });
  const F = daveM(S, 600, 940, "near", { s: 1.3, look: 5, mood: "worried", pose: "think" });
  say(S, 1100, 330, 300, 180, 760, 560, [], W(16, 1), { think: true });
  const ck = S.clock(1100, 330, 96, W(16, 1), 0.01, { h: 12, m: 0 }); card(S, "24 HOURS", 1100, 520, { t: W(16, 2), size: DS.type.small });
  xMark(S, 1100, 330, 3.2, W(16, 6));
  DS.vignette(S, 0.2); }

// From one sunrise to the next takes about twenty-nine and a half Earth days.
{ const S = sc(16, 10, { cam: "none" }); const L = lunar(S, { hy: 700, sun: [300, 640, 60] });
  tl.fromTo(L.sunG, { y: 190 }, { y: 0, duration: 1.8, ease: "power1.out" }, W(16, 10));
  dashed(S.draw(circ(1640, 640, 60), W(16, 14), 0, { c: DS.c("yellow"), w: DS.w.mid }), 0.05, 0.03);
  S.arrow(380, 800, 1560, 800, W(16, 14), 0.5, { c: DS.P.white[0], w: DS.w.near });
  card(S, "SUNRISE", 300, 470, { t: W(16, 11), size: DS.type.caption }); card(S, "NEXT SUNRISE", 1640, 470, { t: W(16, 14), size: DS.type.caption });
  countUp(S, 960, 330, 0, 29.5, W(16, 17), WE(16, 22) - W(16, 17), { size: DS.type.display, c: DS.P.white[0], fmt: (n) => n.toFixed(1) + " DAYS", ease: "none" });
  DS.vignette(S, 0.2); }

// That's about two weeks of sun, then two weeks of night.
{ const S = sc(17, 0, { cam: "push", focus: "960 540" }); space(S, { milky: [200, 900, 1700, 120] });
  const a = S.grp(), b = S.grp();
  DS.shape(S, rrect(200, 440, 760, 220, DS.r.md), "yellow", { w: "near", parent: a }); sun(S, 580, 550, 56, { parent: a }); growX(a, W(17, 2), 200, 550, 0.9);
  DS.shape(S, rrect(960, 440, 760, 220, DS.r.md), "navy", { w: "near", parent: b }); stars(S, 26, 990, 460, 1690, 640, { parent: b, big: 2 }); moon(S, 1340, 550, 54, { parent: b, glow: false }); growX(b, W(17, 7), 960, 550, 0.9);
  card(S, "ABOUT 2 WEEKS OF SUN", 580, 330, { t: W(17, 2), size: DS.type.small }); card(S, "ABOUT 2 WEEKS OF NIGHT", 1340, 330, { t: W(17, 7), size: DS.type.small });
  txt(S, "ONE LUNAR DAY", 960, 780, { size: DS.type.body, c: DS.P.white[0], t: W(17, 9) }); S.arrow(220, 720, 1700, 720, W(17, 9), 0.6, { c: DS.P.white[0], w: DS.w.near });
  DS.vignette(S, 0.2); }

// Dave's first day on the Moon will last a month.
{ const S = sc(17, 11, { cam: "push", focus: "960 640" }); lunar(S, { sun: [260, 170, 46] });
  const g = S.grp(); for (let i = 0; i < 30; i++) tile(S, 150 + i * 56, 360, 48, "", i < 15 ? "yellow" : "navy", W(17, 17) + i * 0.05, { parent: g, tone: i < 15 ? 0 : 1 });
  card(S, "ONE DAY = ONE MONTH", 760, 220, { t: W(17, 14), size: DS.type.body });
  const F = daveM(S, 760, 940, "near", { s: 1.3, look: 0, mood: "wow", pose: "head" });
  suitcase(S, 1100, 940, 0.9);
  DS.vignette(S, 0.2); }

// With no air to spread the heat around, the ground near the equator heats up to over a hundred and twenty degrees Celsius. Hotter than boiling water.
{ const S = sc(18, 0, { cam: "push", focus: "960 640" }); const L = lunar(S, { hy: 700, sun: [760, 150, 70] });
  const ar = S.grp(); [[560, 800], [760, 860], [960, 800]].forEach(([x, y], i) => S.arrow(760 + (x - 760) * 0.2, 250, x, y - 90, W(18, 5) + i * 0.15, 0.4, { c: DS.c("orange"), w: DS.w.near, parent: ar }));
  const nac = card(S, "NO AIR TO SPREAD THE HEAT", 700, 370, { t: W(18, 1), size: DS.type.small });
  const gl = S.fill(circ(760, 940, 560, 70), W(18, 8), 0.6, DS.c("orange"), 0.35);
  const th = thermo(S, 1500, 930, 520, "red", W(18, 8)); level(th, W(18, 13), WE(18, 20) - W(18, 13), 0.08, 0.92);
  card(S, "OVER 120°C", 1500, 372, { t: W(18, 18), size: DS.type.body, tc: "red" });
  const F = daveM(S, 420, 940, "near", { s: 1.3, look: 5, mood: "worried", pose: "stand" }); sweat(S, F, W(18, 10)); tl.to(F.all, { opacity: 0, duration: 0.4 }, W(18, 23) - 0.1);
  const kg = S.grp(); kettle(S, 420, 930, 1.9, undefined, kg); fadeG(S, kg, W(18, 23)); const sm = S.grp(); steam(S, 380, 600, 1.4, W(18, 23), sm); fadeG(S, sm, W(18, 23));
  card(S, "BOILING WATER: 100°C", 420, 330, { t: W(18, 24), size: DS.type.small }); S.hide(nac.g, W(18, 23));
  dashed(S.draw(line([1300, 930 - 520 * 100 / 130], [1740, 930 - 520 * 100 / 130], 0), W(18, 25), 0, { c: DS.P.white[0], w: DS.w.mid }), 0.04, 0.03);
  DS.vignette(S, 0.2); }

// Dave puts on his sunscreen. He is very thorough about it. But sunscreen is for sunburn.
{ const S = sc(19, 0, { cam: "push", focus: "960 640" }); lunar(S, { sun: [260, 170, 46] });
  const F = daveM(S, 760, 940, "near", { s: 1.5, look: 4, mood: "smile", pose: "stand" });
  const sc1 = ITEM.sunscreen(S, 1350, 700, 2.2, { t: T0(S) });
  const k = F.s, cr = (d, t) => S.draw(d, t, 0, { c: DS.P.white[0], w: DS.w.near * 1.5, parent: F.g });
  cr(line([F.cx - 24 * k, F.sh[1] + 24 * k], [F.cx + 24 * k, F.sh[1] + 70 * k], 0), W(19, 3));
  const ls = [[F.cx - 30 * k, F.sh[1] + 30 * k, F.cx - 48 * k, F.sh[1] + 100 * k], [F.cx - 20 * k, F.hip[1], F.cx - 30 * k, F.gy - 20 * k], [F.cx + 20 * k, F.hip[1], F.cx + 30 * k, F.gy - 20 * k], [F.cx + 30 * k, F.sh[1] + 30 * k, F.cx + 48 * k, F.sh[1] + 100 * k]];
  ls.forEach(([a, b, c, d], i) => cr(line([a, b], [c, d], 0), W(19, 6) + i * 0.3));
  [[-26, 60, 26, 100], [-26, 100, 26, 140], [-22, 140, 22, 170]].forEach(([a, b, c, d], i) => cr(line([F.cx + a * k, F.sh[1] + b * k - 40 * k], [F.cx + c * k, F.sh[1] + d * k - 40 * k], 0), W(19, 7) + i * 0.3));
  card(S, "SPF 50", 1100, 600, { t: W(19, 4), size: DS.type.caption });
  plist(S, { x: 100, y: 240, cross: [[1, W(20, 3)]], t: W(20, 1) });
  const sh = S.grp(); S.draw(arc(760, 620, 330, 200, 340, 150), W(20, 1), 0, { c: DS.c("orange"), w: DS.w.near * 1.4, parent: sh });
  [600, 760, 920].forEach((x, i) => S.arrow(x, 130, x, 250, W(20, 1) + i * 0.1, 0.3, { c: DS.c("yellow"), w: DS.w.near, parent: sh }));
  card(S, "SUNBURN: BLOCKED", 1330, 400, { t: W(20, 3), size: DS.type.small }); tick(S, 1640, 400, 1.6, W(20, 4));
  DS.vignette(S, 0.2); }

// The real danger is invisible: cosmic rays, particles from deep space.
{ const S = sc(20, 5, { cam: "push", focus: "960 640" }); lunar(S, { sun: [260, 170, 46] });
  [[300, -40, 700, 940], [520, -40, 920, 940], [760, -40, 1160, 940], [1000, -40, 1400, 940], [1240, -40, 1640, 940], [60, 80, 420, 940]].forEach(([a, b, c, d], i) => ray(S, a, b, c, d, W(20, 9) + i * 0.1, { delay: i * 0.4 }));
  daveM(S, 900, 940, "near", { s: 1.3, look: 0, mood: "flat", pose: "stand" });
  card(S, "INVISIBLE", 700, 190, { t: W(20, 9), size: DS.type.title }); card(S, "COSMIC RAYS FROM DEEP SPACE", 960, 330, { t: W(20, 10), size: DS.type.small });
  DS.vignette(S, 0.2); }

// On Earth, our thick air and our magnetic field protect us. The Moon has neither.
{ const S = sc(21, 0, { cam: "push", focus: "960 560" }); space(S, { milky: [200, 900, 1700, 120] });
  earth(S, 480, 560, 170);
  S.fill(circ(480, 560, 216), S.start, 0, DS.glow(DS.P.sky[0], 0.55), 1);
  [0, 1, 2].forEach((i) => { const r = 250 + i * 60; S.draw(`M480 ${560 - r * 1.15} C${480 + r * 1.6} ${560 - r * 0.9} ${480 + r * 1.6} ${560 + r * 0.9} 480 ${560 + r * 1.15}`, W(21, 6) + i * 0.15, 0, { c: DS.c("orange"), w: DS.w.mid }); S.draw(`M480 ${560 - r * 1.15} C${480 - r * 1.6} ${560 - r * 0.9} ${480 - r * 1.6} ${560 + r * 0.9} 480 ${560 + r * 1.15}`, W(21, 6) + i * 0.15, 0, { c: DS.c("orange"), w: DS.w.mid }); });
  [[1000, 300, 800, 420], [1020, 560, 820, 560], [1000, 820, 800, 700]].forEach(([a, b, c, d], i) => S.arrow(a, b, c, d, W(21, 8) + i * 0.15, 0.4, { c: DS.P.white[0], w: DS.w.near, bend: i === 1 ? 0 : (i === 0 ? -0.25 : 0.25) }));
  card(S, "THICK AIR", 480, 880, { t: W(21, 3), size: DS.type.small }); card(S, "MAGNETIC FIELD", 480, 160, { t: W(21, 6), size: DS.type.small });
  const mg = S.grp(); moon(S, 1480, 600, 200, { glow: false, parent: mg }); fadeG(S, mg, W(21, 11));
  [[1260, -20, 1320, 400], [1480, -20, 1480, 390], [1700, -20, 1640, 400], [1130, 120, 1330, 470], [1830, 120, 1630, 470]].forEach(([a, b, c, d], i) => ray(S, a, b, c, d, W(21, 11) + i * 0.1, { delay: i * 0.3, dur: 1.8 }));
  const a = card(S, "NO AIR", 1380, 880, { t: W(21, 13), size: DS.type.body }); xMark(S, 1380 - a.w / 2 - 30, 880, 1.2, W(21, 13));
  const b = card(S, "NO MAGNETIC FIELD", 1500, 160, { t: W(21, 14), size: DS.type.small }); xMark(S, 1500 - b.w / 2 - 30, 160, 1.2, W(21, 14));
  DS.vignette(S, 0.2); }

// In twenty nineteen, a Chinese lander took the first proper radiation measurements on the Moon's surface.
{ const S = sc(22, 0, { cam: "push", focus: "700 700" }); lunar(S, { sun: [260, 170, 46] });
  lander(S, 560, 900, 1.5);
  const bx = S.grp(); DS.shape(S, rrect(1010, 730, 220, 170, DS.r.sm), "gray", { tone: 1, w: "near", parent: bx }); dial(S, 1120, 800, 56, -60, 40, W(22, 7), { parent: bx, dur: 1.6 }); fadeG(S, bx, W(22, 5));
  S.draw(line([840, 780], [1010, 800], 0), W(22, 5), 0, { c: DS.P.ink[0], w: DS.w.mid });
  card(S, "2019", 560, 190, { t: W(22, 1), size: DS.type.title }); card(S, "FIRST MEASUREMENTS ON THE SURFACE", 1060, 330, { t: W(22, 8), size: DS.type.small });
  DS.vignette(S, 0.2); }

// That's about two hundred times the dose you'd get on the ground on Earth, and nearly twice the dose inside the Space Station.
{ const S = sc(23, 0, { cam: "push", focus: "960 600" }); space(S);
  const base = 840, X = [420, 960, 1500], Hh = [6, 235, 440], nm = ["green", "orange", "red"];
  S.draw(line([240, base], [1680, base], 0), S.start, 0, { c: DS.P.white[0], w: DS.w.mid });
  const bar = (i, t) => { const g = S.grp(); DS.shape(S, rect(X[i] - 100, base - Hh[i], 200, Hh[i]), nm[i], { w: "near", parent: g }); fadeG(S, g, t); scaleY(g, t, X[i], base, 0.7, 0.02); };
  bar(2, S.start); bar(0, W(23, 9)); bar(1, W(23, 18));
  card(S, "MOON SURFACE", X[2], 900 - 20, { t: S.start, size: DS.type.caption }); card(S, "EARTH'S GROUND", X[0], 900 - 20, { t: W(23, 9), size: DS.type.caption }); card(S, "SPACE STATION", X[1], 900 - 20, { t: W(23, 19), size: DS.type.caption });
  card(S, "ABOUT 200 × MORE THAN EARTH'S GROUND", 960, 160, { t: W(23, 2), size: DS.type.small });
  card(S, "NEARLY 2 × THE STATION", 1500, 310, { t: W(23, 14), size: DS.type.small, tc: "red" });
  DS.vignette(S, 0.2); }

// You can't feel it. But over a long stay, it raises the risk of cancer.
{ const S = sc(24, 0, { cam: "push", focus: "960 640" }); lunar(S, { sun: [260, 170, 46] });
  [[500, -40, 860, 940], [760, -40, 1120, 940], [1020, -40, 1380, 940]].forEach(([a, b, c, d], i) => ray(S, a, b, c, d, S.start, { delay: i * 0.5 }));
  daveM(S, 700, 940, "near", { s: 1.3, look: 0, mood: "flat", pose: "stand" });
  card(S, "CAN'T FEEL IT", 700, 200, { t: W(24, 1), size: DS.type.body });
  const gp = S.grp(); DS.shape(S, rrect(1650, 330, 100, 520, DS.r.md), "white", { flat: true, w: "near", parent: gp }); const fl = S.grp(gp); S.fill(rrect(1662, 342, 76, 496, DS.r.sm), S.start, 0, DS.c("red"), 1, fl); fadeG(S, gp, W(24, 5));
  scaleY(fl, W(24, 6), 1700, 838, WE(24, 14) - W(24, 6), 0.06, 0.62);
  card(S, "RISK", 1700, 270, { t: W(24, 5), size: DS.type.small }); card(S, "OVER A LONG STAY", 1560, 900, { t: W(24, 5), size: DS.type.caption });
  DS.vignette(S, 0.2); }

// The scientists who built the detector had a tip: cover your home with a thick layer of Moon soil.
{ const S = sc(25, 0, { cam: "push", focus: "960 540" }); DS.room(S, ROOM2);
  const F = sci(S, 420, 960, "near", { s: 1.2, look: 5, mood: "smile", pose: "point" }); talk(S, F, W(25, 8), WE(25, 18));
  card(S, "DETECTOR TEAM", 420, 380, { t: W(25, 1), size: DS.type.caption });
  panel(S, 1340, 450, 640, 520, S.start);
  const hs = S.grp(); DS.shape(S, rect(1130, 520, 220, 150), "gray", { tone: 1, w: "near", parent: hs }); DS.shape(S, rrect(1190, 560, 100, 110, DS.r.xs), "wood", { w: "detail", parent: hs });
  S.draw(line([1100, 670], [1560, 670], 0), S.start, 0, { c: DS.c("gray", 2), w: DS.w.near });
  const mg = S.grp(); mound(S, 1240, 670, 380, 220, "earth", undefined, mg); S.draw(line([1100, 670], [1560, 670], 0), S.start, 0, { c: DS.c("gray", 2), w: DS.w.near, parent: mg }); fadeG(S, mg, W(25, 14)); scaleY(mg, W(25, 14), 1240, 670, 1.1, 0.05);
  say(S, 880, 250, 380, 150, 600, 450, ["COVER YOUR HOME", "WITH A THICK LAYER", "OF MOON SOIL"], W(25, 8), { size: DS.type.caption });
  DS.vignette(S, 0.2); }

// Dave's home is a suitcase.
{ const S = sc(25, 19, { cam: "push", focus: "960 640" }); lunar(S, { sun: [260, 170, 46] });
  suitcase(S, 1000, 940, 1.1); mound(S, 1000, 780, 240, 80, "gray", W(25, 22));
  card(S, "HOME", 1000, 560, { t: W(25, 22), size: DS.type.title });
  daveM(S, 600, 940, "near", { s: 1.4, look: 6, mood: "flat", pose: "stand" });
  DS.vignette(S, 0.2); }

// ===================== 4. Day four: the dust =====================
const grain = (S, x, y, k, t, o = {}) => { const g = S.grp(o.parent), pts = [[-90, -20], [-50, -80], [-10, -50], [30, -96], [70, -40], [96, 10], [50, 70], [0, 40], [-40, 84], [-84, 40]];
  if (o.round) DS.shape(S, circ(x, y, 74 * k, 70 * k), o.name || "gray", { t, w: "near", parent: g });
  else DS.shape(S, poly(pts.map(([a, b]) => [x + a * k, y + b * k]), 0) + " Z", o.name || "gray", { t, w: "near", parent: g });
  return g; };
const shard = (S, x, y, k, rot, t, parent) => { const g = S.grp(parent);
  DS.shape(S, `M${x} ${y - 120 * k} L${x + 44 * k} ${y + 60 * k} L${x - 36 * k} ${y + 46 * k} Z`, "glass", { t, w: "near", parent: g });
  S.draw(`M${x - 4 * k} ${y - 90 * k} L${x + 20 * k} ${y + 40 * k}`, t ?? S.start, 0, { c: DS.P.white[0], w: DS.w.detail, parent: g });
  g.setAttribute("transform", `rotate(${rot} ${x} ${y})`); return g; };
const boot = (S, x, gy, k, t, o = {}) => { const g = S.grp(o.parent);
  DS.shape(S, `M${x - 40 * k} ${gy - 200 * k} H${x + 30 * k} V${gy - 70 * k} Q${x + 110 * k} ${gy - 60 * k} ${x + 130 * k} ${gy - 20 * k} V${gy} H${x - 60 * k} V${gy - 90 * k} Z`, "white", { t, tone: 2, w: "near", parent: g });
  S.fill(rect(x - 60 * k, gy - 22 * k, 190 * k, 22 * k), t ?? S.start, 0, DS.c("gray", 2), 1, g);
  if (o.dusty) for (let i = 0; i < 26; i++) S.fill(circ(x - 50 * k + rnd() * 170 * k, gy - 20 * k - rnd() * 180 * k, 4 + rnd() * 5), t ?? S.start, 0, DS.c("gray", 2), 0.8, g);
  return g; };
const brush = (S, x, y, k, t, parent) => { const g = S.grp(parent);
  DS.shape(S, rrect(x, y - 20 * k, 150 * k, 40 * k, DS.r.sm * k), "wood", { t, w: "mid", parent: g });
  DS.shape(S, rect(x - 70 * k, y - 28 * k, 70 * k, 56 * k), "yellow", { t, w: "mid", parent: g });
  for (let i = 0; i < 6; i++) S.draw(line([x - 66 * k + i * 11 * k, y + 28 * k], [x - 70 * k + i * 12 * k, y + 56 * k], 0), t ?? S.start, 0, { c: DS.P.ink[0], w: DS.w.detail, parent: g });
  return g; };
const dustpan = (S, x, gy, k, t, parent) => { const g = S.grp(parent);
  DS.shape(S, `M${x - 110 * k} ${gy - 30 * k} L${x + 90 * k} ${gy - 30 * k} L${x + 120 * k} ${gy} L${x - 140 * k} ${gy} Z`, "blue", { t, w: "mid", parent: g });
  S.draw(`M${x + 70 * k} ${gy - 28 * k} L${x + 200 * k} ${gy - 120 * k}`, t ?? S.start, 0, { c: DS.c("blue", 2), w: DS.w.near * 1.4, parent: g });
  brush(S, x + 300 * k, gy - 40 * k, k, t, g);
  return g; };
const balloon = (S, x, y, k, t, parent) => { const g = S.grp(parent);
  S.draw(`M${x} ${y + 76 * k} Q${x - 20 * k} ${y + 140 * k} ${x + 10 * k} ${y + 200 * k}`, t ?? S.start, 0, { c: DS.P.ink[0], w: DS.w.detail, parent: g });
  DS.shape(S, smooth([[x, y - 90 * k], [x + 66 * k, y - 40 * k], [x + 60 * k, y + 40 * k], [x, y + 80 * k], [x - 60 * k, y + 40 * k], [x - 66 * k, y - 40 * k], [x, y - 90 * k]]) + " Z", "red", { t, w: "mid", parent: g });
  S.fill(circ(x - 24 * k, y - 36 * k, 12 * k, 20 * k), t ?? S.start, 0, DS.P.white[0], 0.6, g);
  return g; };
// the lander cabin: grey walls, a porthole onto the surface, panels
const cabin = (S) => { DS.room(S, { wall: "gray", floor: "gray", window: false });
  S.fill(circ(1500, 360, 140), S.start, 0, DS.P.ink[2], 1); stars(S, 16, 1380, 240, 1620, 480, { big: 2 }); earth(S, 1540, 330, 44, { night: true, nightA: 20 });
  S.draw(circ(1500, 360, 140), S.start, 0, { c: DS.c("gray", 2), w: DS.w.near * 1.6 }); S.fill(`M1370 440 Q1500 410 1630 450 L1620 480 Q1500 520 1380 480 Z`, S.start, 0, DS.c("gray", 0), 1);
  [[200, 220], [340, 220], [200, 330], [340, 330]].forEach(([x, y]) => { DS.shape(S, rrect(x, y, 100, 80, DS.r.xs), "gray", { tone: 2, flat: true, w: "detail" }); S.fill(circ(x + 24, y + 40, 8), S.start, 0, DS.c("green"), 1); S.fill(circ(x + 56, y + 40, 8), S.start, 0, DS.c("orange"), 1); }); };

// On day four, Dave breaks the record set by Apollo seventeen's crew: about seventy-five hours.
{ const S = sc(26, 0, { cam: "push", focus: "960 700" }); lunar(S, { sun: [260, 170, 46] });
  const gy = 900, x0 = 200, x100 = 1600, x75 = x0 + 0.75 * (x100 - x0);
  S.draw(line([x0, gy + 10], [x100, gy + 10], 0), S.start, 0, { c: DS.P.white[0], w: DS.w.mid });
  [0, 25, 50, 75, 100].forEach((h) => { const x = x0 + (h / 100) * (x100 - x0); S.draw(line([x, gy + 2], [x, gy + 22], 0), S.start, 0, { c: DS.P.white[0], w: DS.w.mid }); });
  card(S, "DAY FOUR", 700, 190, { t: W(26, 1), size: DS.type.title });
  S.draw(line([x75, gy], [x75, gy - 230], 0), W(26, 9), 0, { c: DS.P.white[0], w: DS.w.mid }); DS.shape(S, `M${x75} ${gy - 230} L${x75 + 120} ${gy - 200} L${x75} ${gy - 170} Z`, "red", { t: W(26, 9), w: "detail" });
  card(S, "APOLLO 17: ABOUT 75 HOURS", x75 - 120, gy - 500, { t: W(26, 10), size: DS.type.caption });
  const F = daveM(S, 300, gy - 10, "near", { s: 1.1, look: 6, mood: "smile", pose: "stand" }); F.walk(W(26, 2), WE(26, 13) - W(26, 2), { x: x100 - 300 - 120 });
  const tr = S.grp(); S.trophy(1740, gy, 1.2, W(26, 13), 0.4, { parent: tr }); fadeG(S, tr, W(26, 13));
  DS.vignette(S, 0.2); }

// "Breaking news. A man on the Moon has set a new record, mostly by not leaving."
{ const S = sc(27, 0, { cam: "push", focus: "700 560" }); DS.room(S, { wall: "navy", floor: "navy", window: false });
  const sc1 = screen(S, 1300, 380, 640, 360, S.start, { fill: "red", tone: 2 });
  txt(S, "BREAKING NEWS", 1300, 330, { size: DS.type.body, c: DS.P.white[0] }); moon(S, 1300, 460, 70, { glow: false });
  const F = who(S, 560, 930, "near", Object.assign({}, ANCHOR, { s: 1.3, look: 4, mood: "smile", pose: "hold" })); talk(S, F, W(27, 0), END(27));
  const dg = S.grp(); DS.shape(S, rrect(180, 800, 760, 240, DS.r.sm), "wood", { w: "near", parent: dg }); S.fill(rect(180, 800, 760, 24), S.start, 0, DS.c("wood", 2), 1, dg);
  card(S, "NEWS", 560, 420, { t: W(27, 1), size: DS.type.caption });
  const cy = S.grp(); S.fill(rect(1000, 800, 820, 120), S.start, 0, DS.c("red", 2), 1, cy); txt(S, "A NEW RECORD", 1410, 850, { size: DS.type.small, c: DS.P.white[0], t: W(27, 9), parent: cy }); txt(S, "MOSTLY BY NOT LEAVING", 1410, 900, { size: DS.type.caption, c: DS.P.white[0], t: W(27, 12), parent: cy });
  DS.vignette(S, 0.2); }

// But Dave now has a problem that wasn't on his packing list. The dust.
{ const S = sc(28, 0, { cam: "push", focus: "960 540" }); lunar(S, { sun: [260, 170, 46] });
  plist(S, { big: true, x: 700, y: 150, crossed: [0, 1], dust: W(28, 12) });
  daveM(S, 330, 940, "near", { s: 1.3, look: 7, mood: "worried", pose: "pointL" });
  const q = txt(S, "?", 1500, 800, { size: DS.type.display, c: DS.c("red", 2), t: W(28, 8) }); S.hide(q, W(28, 12));
  const dc = dustCloud(S, 1560, 800, 1.4, W(28, 12)); fadeG(S, dc, W(28, 12));
  DS.vignette(S, 0.2); }

// On Earth, wind and water wear grains of dust smooth.
{ const S = sc(29, 0, { cam: "push", focus: "960 560" }); DS.outdoor(S, { hy: 640, ground: "sand", hills: "sand" });
  const j = grain(S, 960, 640, 1.7, S.start), r = grain(S, 960, 640, 1.7, S.start, { round: true }); tl.set(r, { opacity: 0 }, 0); tl.to(j, { opacity: 0, duration: 1.2 }, W(29, 5)); tl.to(r, { opacity: 1, duration: 1.2 }, W(29, 5));
  [-1, 1].forEach((sd, i) => { for (let n = 0; n < 3; n++) S.draw(`M${960 + sd * 640} ${520 + n * 90} Q${960 + sd * 460} ${480 + n * 90} ${960 + sd * 320} ${540 + n * 90}`, W(29, 2) + n * 0.15, 0, { c: DS.c("gray", 1), w: DS.w.near }); });
  [[820, 300], [960, 260], [1100, 300]].forEach(([x, y], i) => S.fill(`M${x} ${y - 30} Q${x + 18} ${y} ${x} ${y + 12} Q${x - 18} ${y} ${x} ${y - 30} Z`, W(29, 4) + i * 0.2, 0, DS.c("sky", 2), 1));
  card(S, "WIND + WATER", 960, 170, { t: W(29, 2), size: DS.type.title }); card(S, "SMOOTH", 960, 900, { t: W(29, 8), size: DS.type.title });
  daveM(S, 300, 940, "near", { s: 1.1, look: 6, mood: "flat", pose: "stand", helmet: false, pack: false });
  DS.vignette(S, 0.2); }

// The Moon has neither, so its dust stays as fine as flour,
{ const S = sc(29, 10, { cam: "push", focus: "960 560" }); lunar(S, { sun: [260, 170, 46] });
  grain(S, 960, 640, 1.7, S.start);
  const a = card(S, "NO WIND", 520, 440, { t: W(29, 11), size: DS.type.body }); xMark(S, 520 - a.w / 2 - 40, 440, 1.3, W(29, 12));
  const b = card(S, "NO WATER", 1400, 440, { t: W(29, 12), size: DS.type.body }); xMark(S, 1400 - b.w / 2 - 40, 440, 1.3, W(29, 13));
  card(S, "STILL JAGGED", 960, 900, { t: W(29, 16), size: DS.type.body, tc: "red" });
  DS.vignette(S, 0.2); }

// ... as fine as flour, and as sharp as broken glass.
{ const S = sc(29, 17, { cam: "push", focus: "960 600" }); DS.room(S, ROOM2);
  const fl = S.grp(); mound(S, 540, 880, 560, 300, "white", undefined, fl); S.draw(circ(540, 880, 280, 24), S.start, 0, { c: DS.c("gray", 2), w: DS.w.detail, parent: fl }); fadeG(S, fl, W(29, 18)); scaleY(fl, W(29, 18), 540, 880, 0.8, 0.05);
  card(S, "FINE AS FLOUR", 540, 190, { t: W(29, 19), size: DS.type.body });
  const gl = S.grp(); [[1300, 640, 2.4, -14], [1560, 700, 1.7, 22], [1060, 740, 1.5, -48]].forEach(([x, y, k, r]) => shard(S, x, y, k, r, undefined, gl)); fadeG(S, gl, W(29, 24));
  card(S, "SHARP AS BROKEN GLASS", 1340, 190, { t: W(29, 24), size: DS.type.body });
  DS.vignette(S, 0.2); }

// Sunlight gives it an electric charge, so it clings to everything,
{ const S = sc(30, 0, { cam: "push", focus: "960 640" }); lunar(S, { sun: [860, 160, 56] });
  const F = daveM(S, 960, 940, "near", { s: 1.4, look: 0, mood: "flat", pose: "stand" });
  [[700, 280], [860, 260], [1020, 280]].forEach(([x, y], i) => S.arrow(x, y, x - (i - 1) * 40, y + 120, W(30, 1) + i * 0.15, 0.3, { c: DS.c("yellow"), w: DS.w.near }));
  const k = F.s, dots = S.grp();
  for (let i = 0; i < 34; i++) { const sx = 300 + rnd() * 1400, sy = 800 + rnd() * 140, a = rnd() * 6.28, ex = F.cx + Math.cos(a) * (26 + rnd() * 30) * k, ey = F.gy - 20 * k - rnd() * 190 * k;
    const d = S.fill(circ(sx, sy, 5 + rnd() * 3), S.start, 0, DS.c("gray", 2), 1, dots); tl.fromTo(d, { x: 0, y: 0 }, { x: ex - sx, y: ey - sy, duration: 1.6, ease: "power2.inOut" }, W(30, 7) + rnd() * 1.5); }
  card(S, "ELECTRIC CHARGE", 560, 330, { t: W(30, 3), size: DS.type.small }); card(S, "CLINGS TO EVERYTHING", 1400, 480, { t: W(30, 8), size: DS.type.small });
  DS.vignette(S, 0.2); }

// ... like static on a balloon.
{ const S = sc(30, 10, { cam: "push", focus: "960 540" }); DS.room(S, ROOM);
  const F = dave(S, 760, 960, "near", { s: 1.5, look: 5, mood: "wow", pose: "reachL" });
  const R = F.r, hx = F.hd[0], hy = F.hd[1];
  balloon(S, hx + 200, hy - 20, 1.3, S.start);
  for (let i = 0; i < 9; i++) { const a = -Math.PI / 2 + (i - 4) * 0.22; S.draw(line([hx + Math.cos(a) * R * 0.9, hy + Math.sin(a) * R * 0.9], [hx + Math.cos(a) * R * 1.9, hy + Math.sin(a) * R * 1.9 - 20], 0), W(30, 13), 0, { c: DS.c("brown"), w: DS.w.detail }); }
  card(S, "STATIC ON A BALLOON", 1200, 200, { t: W(30, 12), size: DS.type.body });
  DS.vignette(S, 0.2); }

// On Apollo, it jammed latches, scratched visors, wore through layers of boots, and broke the seals on boxes of Moon rock.
{ const S = sc(31, 0, { cam: "push", focus: "960 540" }); space(S);
  const X = [330, 780, 1230, 1650], t = [W(31, 3), W(31, 5), W(31, 11), W(31, 15)], lbl = ["JAMMED LATCHES", "SCRATCHED VISORS", "WORN BOOTS", "BROKEN SEALS"];
  X.forEach((x, i) => { const pg = panel(S, x, 520, 400, 620, t[i]); fadeG(S, pg, t[i]); card(S, lbl[i], x, 280, { t: t[i], size: DS.type.caption }); });
  { const g = S.grp(); DS.shape(S, rrect(250, 470, 160, 100, DS.r.sm), "wood", { w: "near", parent: g }); DS.shape(S, rect(300, 440, 60, 60), "gray", { w: "mid", parent: g }); S.draw(line([300, 500], [360, 500], 0), S.start, 0, { c: DS.P.ink[0], w: DS.w.detail, parent: g }); dustCloud(S, 330, 590, 0.5, undefined, { parent: g }); fadeG(S, g, t[0]); xMark(S, 330, 520, 1.2, t[0] + 0.5); }
  { const g = S.grp(); S.draw(circ(780, 500, 120), S.start, 0, { c: DS.c("sky", 2), w: DS.w.near, parent: g }); [[-70, -40, 60, 20], [-30, -10, 90, 36], [10, 40, 70, 12], [-60, 50, 40, -20]].forEach(([a, b, c, d]) => S.draw(line([780 + a, 500 + b], [780 + a + c, 500 + b + d], 0), S.start, 0, { c: DS.c("gray", 2), w: DS.w.detail, parent: g })); fadeG(S, g, t[1]); }
  { const g = S.grp(); boot(S, 1180, 650, 1.0, undefined, { parent: g, dusty: true }); [[1180, 580, 120], [1190, 610, 110]].forEach(([x, y, w]) => S.draw(line([x - w / 2 + 40, y], [x + w / 2 + 40, y + 14], 0), S.start, 0, { c: DS.c("red"), w: DS.w.mid, parent: g })); fadeG(S, g, t[2]); }
  { const g = S.grp(); DS.shape(S, rrect(1560, 470, 190, 150, DS.r.sm), "gray", { tone: 1, w: "near", parent: g }); S.draw(line([1560, 530], [1750, 530], 0), S.start, 0, { c: DS.c("red"), w: DS.w.near, parent: g }); mound(S, 1655, 470, 110, 60, "gray", undefined, g); S.draw(`M1640 530 l12 -14 l8 14 l12 -14`, S.start, 0, { c: DS.c("red"), w: DS.w.near, parent: g }); fadeG(S, g, t[3]); }
  DS.vignette(S, 0.2); }

// One commander said his suit looked more worn after eight hours on the Moon than his training suit after a hundred.
{ const S = sc(32, 0, { cam: "push", focus: "960 600" }); DS.room(S, ROOM2);
  const A = astro(S, 560, 960, "near", { s: 1.5, look: 4, mood: "flat" });
  for (let i = 0; i < 26; i++) S.fill(circ(A.cx + (rnd() - 0.5) * 120, A.sh[1] + rnd() * 300, 5 + rnd() * 9, 4 + rnd() * 5), W(32, 5), 0, DS.c("gray", 2), 0.65, A.g);
  const B = astro(S, 1360, 960, "near", { s: 1.5, look: -4, mood: "smile" });
  card(S, "8 HOURS ON THE MOON", 560, 250, { t: W(32, 8), size: DS.type.small }); card(S, "100 HOURS OF TRAINING", 1360, 250, { t: W(32, 18), size: DS.type.small });
  tick(S, 1360, 180, 1.2, W(32, 19)); xMark(S, 560, 180, 1.2, W(32, 9));
  DS.vignette(S, 0.2); }

// Back inside their lander, it smelled like burnt gunpowder,
{ const S = sc(33, 0, { cam: "push", focus: "960 560" }); cabin(S);
  const A = who(S, 760, 960, "near", { s: 1.5, hair: "none", outfitC: DS.c("white", 2), look: 5, mood: "worried", pose: "stand" });
  for (let i = 0; i < 24; i++) S.fill(circ(A.cx + (rnd() - 0.5) * 110, A.sh[1] + rnd() * 280, 4 + rnd() * 7, 3 + rnd() * 4), S.start, 0, DS.c("gray", 2), 0.7, A.g);
  [-1, 0, 1].forEach((i) => { const p = S.draw(`M${A.hd[0] + 80} ${A.hd[1] + 40 + i * 30} q 30 -20 60 0 t 60 0 t 60 0`, W(33, 5) + (i + 1) * 0.2, 0, { c: DS.c("orange", 2), w: DS.w.near, op: 0.85 }); tl.fromTo(p, { x: 0 }, { x: 18, duration: 2.2, ease: "sine.inOut", yoyo: true, repeat: 3 }, W(33, 5)); });
  card(S, "BURNT GUNPOWDER", 700, 200, { t: W(33, 7), size: DS.type.title });
  DS.vignette(S, 0.2); }

// ... and all twelve moonwalkers reacted to it, from sneezing to a blocked nose.
{ const S = sc(33, 9, { cam: "push", focus: "960 560" }); cabin(S);
  const row = S.grp(); for (let i = 0; i < 12; i++) { const tt = W(33, 10) + i * 0.12; miniAstro(S, 300 + i * 90, 440, 1.5, tt, { parent: row }); tick(S, 300 + i * 90, 290, 0.8, tt + 0.25, "red", row); }
  card(S, "12 OF 12", 960, 170, { t: W(33, 11), size: DS.type.title });
  const A = who(S, 760, 960, "near", { s: 1.5, hair: "none", outfitC: DS.c("white", 2), look: 5, mood: "wow", pose: "head" });
  say(S, 1250, 700, 300, 120, 880, 760, ["ACHOO!"], W(33, 16), { size: DS.type.title });
  card(S, "BLOCKED NOSE", 1450, 880, { t: W(33, 19), size: DS.type.small });
  DS.vignette(S, 0.2); }

// "Mission Control here. Dave, you have what one Apollo astronaut called lunar hay fever."
{ const S = sc(34, 0, { cam: "push", focus: "960 540" }); DS.room(S, { wall: "navy", floor: "navy", window: false });
  [[420, 270], [960, 270], [1500, 270]].forEach(([x, y], i) => { screen(S, x, y, 400, 240, S.start, { fill: "ink", tone: 1 }); S.draw(smooth([[x - 160, y + 60], [x - 80, y - 20], [x, y + 30], [x + 80, y - 50], [x + 160, y]]), S.start, 0, { c: DS.c(["green", "sky", "orange"][i]), w: DS.w.near }); });
  const dv = who(S, 960, 360, "near", { s: 0.5, hair: "side", hairC: DS.c("brown"), outfitC: DS.c("blue"), mood: "wow", pose: "head", float: true }); fadeG(S, dv.all, W(34, 8));
  txt(S, "ACHOO", 1130, 200, { size: DS.type.caption, c: DS.P.white[0], t: W(34, 9) });
  const F = who(S, 560, 940, "near", Object.assign({}, DOC, { s: 1.3, look: 3, mood: "smile", pose: "hold" })); talk(S, F, W(34, 0), END(34));
  S.draw(arc(F.hd[0], F.hd[1] - 4, F.r * 1.15, 180, 360), S.start, 0, { c: DS.P.ink[0], w: DS.w.near, parent: F.g }); S.draw(`M${F.hd[0] - F.r * 1.15} ${F.hd[1] - 4} V${F.hd[1] + F.r * 0.2} Q${F.hd[0] - F.r * 1.1} ${F.hd[1] + F.r * 0.7} ${F.hd[0] - F.r * 0.3} ${F.hd[1] + F.r * 0.8}`, S.start, 0, { c: DS.P.ink[0], w: DS.w.mid, parent: F.g });
  const dg = S.grp(); DS.shape(S, rrect(180, 830, 760, 200, DS.r.sm), "gray", { tone: 2, w: "near", parent: dg });
  card(S, "MISSION CONTROL", 560, 430, { t: W(34, 1), size: DS.type.caption }); card(S, "LUNAR HAY FEVER", 1250, 600, { t: W(34, 11), size: DS.type.body, tc: "red" });
  DS.vignette(S, 0.2); }

// The last commander to leave the Moon said they could beat every other problem up there,
{ const S = sc(35, 0, { cam: "push", focus: "1000 640" }); lunar(S, { sun: [260, 170, 46], prints: [[600, 930], [700, 920], [800, 925]] });
  lander(S, 1380, 900, 1.5);
  const A = astro(S, 640, 940, "near", { s: 1.3, look: 6, mood: "determined", pose: "stand" }); A.walk(W(35, 2), 2.6, { x: 330 });
  card(S, "LAST COMMANDER TO LEAVE", 760, 200, { t: W(35, 1), size: DS.type.small });
  DS.vignette(S, 0.2); }

// ... except the dust.
{ const S = sc(35, 9, { cam: "push", focus: "960 640" }); lunar(S, { sun: [260, 170, 46] });
  const A = astro(S, 480, 940, "near", { s: 1.5, look: 6, mood: "determined", pose: "point" }); talk(S, A, W(35, 9), END(35));
  [["HEAT", W(35, 10)], ["COLD", W(35, 11)], ["RADIATION", W(35, 12)]].forEach(([s, t], i) => { card(S, s, 1250, 300 + i * 130, { t, size: DS.type.body }); tick(S, 1000, 300 + i * 130, 1.4, t + 0.2); });
  card(S, "THE DUST", 1250, 700, { t: W(35, 16), size: DS.type.title, tc: "red" }); xMark(S, 940, 700, 1.7, W(35, 17));
  const D = daveM(S, 1700, 940, "near", { s: 0.9, look: -6, mood: "worried", pose: "stand" });
  DS.vignette(S, 0.2); }

// Dave didn't pack a dustpan. It wouldn't have helped.
{ const S = sc(36, 0, { cam: "push", focus: "960 640" }); lunar(S, { sun: [260, 170, 46] });
  plist(S, { big: false, crossed: [0, 1], dust: true });
  const F = daveM(S, 600, 940, "near", { s: 1.3, look: 5, mood: "flat", pose: "shrug" });
  const dp = dustpan(S, 1150, 900, 1.5, undefined); fadeG(S, dp, W(36, 3));
  S.draw(line([1000, 640], [1560, 900], 0), W(36, 5), 0, { c: DS.c("red"), w: DS.w.near * 1.6 }); S.draw(line([1560, 640], [1000, 900], 0), W(36, 5) + 0.15, 0, { c: DS.c("red"), w: DS.w.near * 1.6 });
  DS.vignette(S, 0.2); }

// On Apollo, brushing worked far better in tests than on the Moon.
{ const S = sc(36, 9, { cam: "push", focus: "960 540" }); DS.room(S, ROOM2);
  [[520, "TEST ON EARTH", true], [1400, "ON THE MOON", false]].forEach(([x, nm, ok], i) => { const t = [W(36, 10), W(36, 15)][i]; const pg = panel(S, x, 520, 700, 640, t); fadeG(S, pg, t);
    const g = S.grp(); boot(S, x - 60, 760, 1.5, undefined, { parent: g, dusty: !ok }); brush(S, x + 130, 560, 1.2, undefined, g); fadeG(S, g, t);
    card(S, nm, x, 250, { t, size: DS.type.small }); (ok ? tick : xMark)(S, x + 250, 760, ok ? 2 : 1.7, t + 0.5); });
  DS.vignette(S, 0.2); }

// ===================== 5. Week two: the night =====================
// a polar crater in cross-section: low sun on the left grazing the rim, the floor in shadow. o.sun false = no sun
const crater = (S, o = {}) => { DS.setHaze("night");
  const g = S.grp(); S.g.insertBefore(g, S.g.firstChild); const f = (d, fill, op = 1) => S.fill(d, S.start, 0, fill, op, g);
  f(rect(-200, -200, 2320, 1480), DS.vgrad(DS.P.ink[2], DS.mix(DS.P.navy[2], DS.P.ink[2], 0.3)));
  const sky = S.grp(g); stars(S, 70, -100, -100, 2020, 640, { parent: sky, big: 3 });
  earth(S, EX, EY, ER, { night: true, nightA: 20, parent: g });
  const sunG = o.sun === false ? null : sun(S, 150, 560, 60, { parent: g });
  const bowl = "M-200 700 H560 Q760 700 800 800 Q960 900 1120 800 Q1160 700 1360 700 H2120 V1280 H-200 Z";
  f(bowl, DS.vgrad(DS.c("gray", 0), DS.c("gray", 2)));
  f("M560 700 Q760 700 800 800 Q960 900 1120 800 Q1160 700 1360 700 Z", DS.P.ink[2], 0.55);
  S.draw("M-200 700 H560 Q760 700 800 800 Q960 900 1120 800 Q1160 700 1360 700 H2120", S.start, 0, { c: DS.P.ink[0], w: DS.w.near, parent: g });
  return { g, sunG }; };
const jet = (S, x, y, k, parent) => { const g = S.grp(parent);
  [[-1, 0], [1, 0]].forEach(([sd]) => DS.shape(S, `M${x - 40 * k} ${y + 10 * k} L${x + 120 * k} ${y + 120 * k + sd * 0} L${x + 200 * k} ${y + 120 * k} L${x + 110 * k} ${y + 6 * k} Z`, "gray", { tone: 1, w: "mid", parent: g }));
  DS.shape(S, `M${x - 300 * k} ${y} Q${x - 300 * k} ${y - 56 * k} ${x - 220 * k} ${y - 60 * k} H${x + 240 * k} L${x + 340 * k} ${y - 130 * k} L${x + 380 * k} ${y - 130 * k} L${x + 350 * k} ${y} Q${x + 300 * k} ${y + 40 * k} ${x + 200 * k} ${y + 40 * k} H${x - 220 * k} Q${x - 300 * k} ${y + 36 * k} ${x - 300 * k} ${y} Z`, "white", { w: "near", parent: g });
  S.fill(`M${x - 250 * k} ${y - 20 * k} H${x - 150 * k} L${x - 160 * k} ${y - 46 * k} H${x - 230 * k} Q${x - 250 * k} ${y - 40 * k} ${x - 250 * k} ${y - 20 * k} Z`, S.start, 0, DS.c("sky", 2), 1, g);
  for (let i = 0; i < 14; i++) S.fill(circ(x - 110 * k + i * 26 * k, y - 20 * k, 6 * k), S.start, 0, DS.c("sky", 2), 1, g);
  DS.shape(S, rrect(x + 20 * k, y - 82 * k, 90 * k, 30 * k, DS.r.xs), "ink", { tone: 1, w: "detail", parent: g });
  DS.shape(S, rrect(x - 40 * k, y + 40 * k, 80 * k, 36 * k, DS.r.sm), "gray", { tone: 1, w: "mid", parent: g });
  DS.shape(S, rrect(x + 120 * k, y + 40 * k, 80 * k, 36 * k, DS.r.sm), "gray", { tone: 1, w: "mid", parent: g });
  return g; };
const miniBottle = (S, x, y, k, t, parent) => { const g = S.grp(parent); DS.shape(S, rrect(x - 10 * k, y - 18 * k, 20 * k, 40 * k, DS.r.xs * k), "glass", { t, w: "hair", parent: g }); S.fill(rect(x - 9 * k, y + 2 * k, 18 * k, 19 * k), t ?? S.start, 0, DS.c("sky"), 0.9, g); DS.shape(S, rect(x - 5 * k, y - 28 * k, 10 * k, 10 * k), "blue", { t, w: "hair", parent: g }); return g; };
const balance = (S, cx, cy, t, parent) => { const g = S.grp(parent);
  DS.shape(S, `M${cx - 90} ${cy + 330} L${cx} ${cy} L${cx + 90} ${cy + 330} Z`, "wood", { t, w: "near", parent: g });
  DS.shape(S, rect(cx - 340, cy - 12, 680, 24), "gray", { t, w: "near", parent: g });
  [-1, 1].forEach((sd) => { const px = cx + sd * 320; S.draw(`M${px} ${cy + 12} L${px - 90} ${cy + 190} M${px} ${cy + 12} L${px + 90} ${cy + 190}`, t ?? S.start, 0, { c: DS.P.ink[0], w: DS.w.detail, parent: g }); DS.shape(S, `M${px - 130} ${cy + 190} H${px + 130} Q${px + 100} ${cy + 240} ${px} ${cy + 240} Q${px - 100} ${cy + 240} ${px - 130} ${cy + 190} Z`, "gold", { t, w: "mid", parent: g }); });
  return g; };

// Around day fifteen, the sun sets. With no air to hold in the heat, the ground near the equator drops to about minus a hundred and thirty degrees Celsius.
{ const S = sc(37, 0, { cam: "push", focus: "960 640" }); const L = lunar(S, { hy: 640, sun: [960, 540, 70], frost: W(37, 20) });
  tl.fromTo(L.sunG, { y: 0 }, { y: 240, duration: 2.6, ease: "power1.inOut" }, W(37, 3));
  const dim = S.fill(rect(-200, 660, 2320, 700), S.start, 0, DS.P.navy[2], 0.5); tl.fromTo(dim, { opacity: 0 }, { opacity: 0.5, duration: 1.6, ease: "sine.inOut" }, W(37, 6));
  milky(S, 160, 560, 1500, 120, { k: 0.14, n: 110, t: W(37, 6) + 0.6 });
  const dc = card(S, "DAY 15", 700, 190, { t: W(37, 1), size: DS.type.title }); S.hide(dc.g, W(37, 6));
  const F = daveM(S, 700, 940, "near", { s: 1.3, look: 5, mood: "worried", pose: "stand" }); F.face(W(37, 7), "sad", 5); F.setPose(W(37, 8), "cross");
  const th = thermo(S, 1700, 930, 520, "sky", W(37, 18)); level(th, W(37, 20), WE(37, 27) - W(37, 20), 1, 0.12);
  countUp(S, 1300, 520, 120, -130, W(37, 20), WE(37, 27) - W(37, 20), { size: DS.type.title, c: DS.P.white[0], fmt: (n) => Math.round(n) + "°C", ease: "power1.inOut", t0: W(37, 19) });
  card(S, "NO AIR TO HOLD IN THE HEAT", 760, 190, { t: W(37, 7), size: DS.type.small });
  DS.vignette(S, 0.2); }

// Dave puts on his warm jumper. It is not warm enough.
{ const S = sc(38, 0, { cam: "push", focus: "960 640" }); lunar(S, { night: true });
  plist(S, { crossed: [0, 1], cross: [[2, W(38, 8)]] });
  const F = daveM(S, 880, 940, "near", { s: 1.4, look: 5, mood: "smile", pose: "armsUp" });
  const big = ITEM.jumper(S, 1380, 640, 2.2, { t: T0(S) }); tl.to(big, { opacity: 0, duration: 0.4 }, W(38, 4) + 0.2);
  const wc = card(S, "WARM JUMPER", 1380, 400, { t: W(38, 3), size: DS.type.body }); S.hide(wc.g, W(38, 6));
  jumper(S, F, W(38, 4)); F.setPose(W(38, 4), "stand"); F.face(W(38, 6), "sad", 0); F.setPose(W(38, 7), "cross");
  tl.fromTo(F.g, { x: 0 }, { x: 4, duration: 0.18, ease: "sine.inOut", yoyo: true, repeat: Math.ceil((S.end - W(38, 6)) / 0.18) }, W(38, 6));
  flakes(S, F.cx, F.hd[1] + 90, 7, W(38, 6) + 0.2);
  const th = thermo(S, 1700, 930, 360, "sky", W(38, 6)); level(th, S.start, 0.01, 0.12, 0.12); card(S, "-130°C", 1700, 480, { t: W(38, 7), size: DS.type.body });
  DS.vignette(S, 0.2); }

// Dave's water bottle is now a block of ice.
{ const S = sc(39, 0, { cam: "push", focus: "960 640" }); lunar(S, { night: true });
  plist(S, { crossed: [0, 1, 2], cross: [[3, W(39, 6)]] });
  daveM(S, 600, 940, "near", { s: 1.4, look: 6, mood: "sad", pose: "reach" });
  const b = ITEM.bottle(S, 1250, 640, 2.4, { t: T0(S) });
  const ice = S.grp(); S.fill(`M${1250 - 66} ${640 - 40} Q${1250 - 70} ${640 - 120} ${1250 - 38} ${640 - 150} H${1250 + 38} Q${1250 + 70} ${640 - 120} ${1250 + 66} ${640 - 40} V${640 + 180} Q${1250} ${640 + 210} ${1250 - 66} ${640 + 180} Z`, S.start, 0, DS.c("sky", 1), 0.85, ice);
  [[-30, -80, 50, 40], [10, 0, 40, -30], [-40, 80, 60, 20], [20, 130, 30, -40]].forEach(([a, c, d, e]) => S.draw(line([1250 + a, 640 + c], [1250 + a + d, 640 + c + e], 0), S.start, 0, { c: DS.P.white[0], w: DS.w.mid, parent: ice }));
  fadeG(S, ice, W(39, 5)); card(S, "A BLOCK OF ICE", 1250, 330, { t: W(39, 6), size: DS.type.body });
  DS.vignette(S, 0.2); }

// And that, it turns out, is how the Moon keeps its water.
{ const S = sc(39, 9, { cam: "pull" }); space(S, { milky: [200, 900, 1700, 120] });
  moon(S, 960, 580, 280, { glow: false });
  const cp = clipG(S, circ(960, 580, 278)); [[960, 330, 150, 46], [960, 830, 130, 40]].forEach(([x, y, rx, ry]) => { S.fill(circ(x, y, rx, ry), S.start, 0, DS.c("sky", 1), 0.95, cp); });
  card(S, "THE MOON KEEPS ITS WATER AS ICE", 960, 150, { t: W(39, 14), size: DS.type.small });
  S.arrow(1360, 300, 1100, 340, W(39, 16), 0.4, { c: DS.P.white[0], w: DS.w.near }); card(S, "ICE", 1480, 290, { t: W(39, 16), size: DS.type.body });
  DS.vignette(S, 0.2); }

// Near the poles, the Sun stays so low that some crater floors never see sunlight.
{ const S = sc(40, 0, { cam: "push", focus: "960 700" }); const C = crater(S);
  [[560, 700], [1360, 700]].forEach(([x, y], i) => dashed(S.draw(line([210, 575], [x, y - 8], 0), W(40, 4) + i * 0.3, 0, { c: DS.c("yellow", 1), w: DS.w.mid, op: 0.8 }), 0.04, 0.025));
  dashed(S.draw(line([560, 692], [1360, 692], 0), W(40, 5), 0, { c: DS.c("yellow", 1), w: DS.w.mid, op: 0.8 }), 0.04, 0.025);
  card(S, "NEAR THE POLES", 700, 190, { t: W(40, 1), size: DS.type.title }); card(S, "NEVER SEES SUNLIGHT", 960, 960 - 60, { t: W(40, 11), size: DS.type.small });
  DS.vignette(S, 0.2); }

// Down there, the warmest it ever gets is about minus a hundred and fifty-seven degrees.
{ const S = sc(40, 15, { cam: "push", focus: "960 700" }); crater(S, { sun: false });
  const th = thermo(S, 960, 880, 280, "sky", S.start); level(th, S.start, 0.01, 0.2, 0.2);
  card(S, "WARMEST: ABOUT -157°C", 960, 420, { t: W(40, 18), size: DS.type.body });
  DS.vignette(S, 0.2); }

// In two thousand nine, NASA crashed part of a rocket into one of those craters on purpose, and found water ice in the debris.
{ const S = sc(41, 0, { cam: "push", focus: "960 700" }); crater(S, { sun: false });
  card(S, "2009", 600, 190, { t: W(41, 1), size: DS.type.title });
  const rk = S.grp(); DS.shape(S, rrect(930, 120, 60, 200, DS.r.sm), "gray", { tone: 1, w: "near", parent: rk }); DS.shape(S, `M930 320 L920 360 H1000 L990 320 Z`, "gray", { tone: 2, w: "mid", parent: rk }); DS.shape(S, `M930 120 Q960 70 990 120 Z`, "gray", { w: "mid", parent: rk });
  tl.fromTo(rk, { y: -330 }, { y: 440, duration: WE(41, 9) - W(41, 5), ease: "power1.in" }, W(41, 5)); tl.set(rk, { opacity: 0 }, WE(41, 9) + 0.02);
  const pl = dustCloud(S, 960, 780, 1.2, undefined); tl.fromTo(pl, { opacity: 0, y: 40, scale: 0.4, svgOrigin: "960 800" }, { opacity: 0.95, y: -120, scale: 1.2, svgOrigin: "960 800", duration: 2.2, ease: "power1.out" }, WE(41, 9) + 0.05);
  const ic = S.grp(); for (let i = 0; i < 9; i++) { const x = 840 + i * 30, y = 640 - (i % 3) * 60; S.draw(rays(x, y, 5, 16, 6, 0), S.start, 0, { c: DS.c("sky", 1), w: DS.w.mid, parent: ic }); }
  tl.fromTo(ic, { opacity: 0, y: 60 }, { opacity: 1, y: -80, duration: 2.6, ease: "power1.out" }, W(41, 19));
  card(S, "WATER ICE IN THE DEBRIS", 1300, 500, { t: W(41, 19), size: DS.type.small });
  DS.vignette(S, 0.2); }

// Away from the poles, it's far drier.
{ const S = sc(42, 0, { cam: "push", focus: "960 700" }); lunar(S, { sun: [960, 170, 60] });
  [[300, 840, 220], [820, 900, 260], [1400, 860, 240], [1700, 940, 160]].forEach(([x, y, w], i) => { S.draw(`M${x - w / 2} ${y} L${x - w / 6} ${y - 14} L${x} ${y + 8} L${x + w / 5} ${y - 12} L${x + w / 2} ${y + 6} M${x - w / 6} ${y - 14} L${x - w / 4} ${y + 24} M${x} ${y + 8} L${x + 20} ${y + 36}`, S.start, 0, { c: DS.c("gray", 2), w: DS.w.mid }); });
  const dr = S.grp(); S.fill(`M960 300 Q1060 400 960 470 Q860 400 960 300 Z`, S.start, 0, DS.c("sky", 1), 1, dr); S.draw(line([880, 300], [1040, 480], 0), W(42, 4), 0, { c: DS.c("red"), w: DS.w.near * 1.6, parent: dr });
  card(S, "FAR DRIER", 960, 600, { t: W(42, 4), size: DS.type.title });
  DS.vignette(S, 0.2); }

// In twenty twenty, a telescope flying in a jumbo jet
{ const S = sc(42, 7, { cam: "push", focus: "960 540" }); DS.outdoor(S, { hy: 840, sun: [260, 180] });
  const jg = jet(S, 760, 520, 1.5); tl.fromTo(jg, { x: -120 }, { x: 160, duration: S.len, ease: "none" }, S.start);
  card(S, "2020", 560, 190, { t: W(42, 8), size: DS.type.title }); card(S, "A TELESCOPE IN A JUMBO JET", 1260, 190, { t: W(42, 10), size: DS.type.small });
  DS.vignette(S, 0.2); }

// ... found about one small bottle of water per cubic metre of sunlit soil.
{ const S = sc(42, 17, { cam: "push", focus: "960 600" }); DS.room(S, ROOM2);
  const cb = cube(S, 700, 600, 260, "earth", S.start);
  S.arrow(420, 700, 420, 450, W(42, 24), 0.4, { c: DS.c("red"), w: DS.w.near }); card(S, "1 m", 360, 580, { t: W(42, 24), size: DS.type.caption });
  card(S, "ONE CUBIC METRE OF SUNLIT SOIL", 700, 200, { t: W(42, 24), size: DS.type.small });
  const b = ITEM.bottle(S, 1400, 640, 1.8, { t: W(42, 19) }); fadeG(S, b, W(42, 19)); card(S, "ABOUT ONE SMALL BOTTLE", 1400, 880, { t: W(42, 21), size: DS.type.small });
  DS.vignette(S, 0.2); }

// The Sahara has about a hundred times more.
{ const S = sc(43, 0, { cam: "push", focus: "960 600" }); DS.outdoor(S, { hy: 560, ground: "sand", hills: "sand", sun: [1500, 180] });
  const b = ITEM.bottle(S, 420, 700, 1.4, { t: T0(S) }); card(S, "MOON: ONE", 420, 880, { t: S.start, size: DS.type.small });
  const gg = S.grp(); for (let i = 0; i < 100; i++) miniBottle(S, 880 + (i % 10) * 82, 560 + Math.floor(i / 10) * 74, 1.5, undefined, gg);
  fadeG(S, gg, W(43, 2)); card(S, "SAHARA: ABOUT 100 ×", 1260, 200, { t: W(43, 3), size: DS.type.body });
  DS.vignette(S, 0.2); }

// So Dave's one bottle of water is worth about a cubic metre of Moon.
{ const S = sc(43, 8, { cam: "push", focus: "960 600" }); DS.room(S, ROOM2);
  balance(S, 960, 470, S.start);
  ITEM.bottle(S, 640, 560, 1.2, { t: T0(S) }); cube(S, 1280, 506, 110, "gray", T0(S));
  card(S, "ONE BOTTLE = ABOUT ONE CUBIC METRE OF MOON", 960, 190, { t: W(43, 15), size: DS.type.small });
  DS.vignette(S, 0.2); }

// ===================== 6. Month one: air and salad =====================
const padlock2 = (S, cx, cy, k, t, parent) => { const g = S.grp(parent);
  S.draw(`M${cx - 36 * k} ${cy} V${cy - 50 * k} Q${cx - 36 * k} ${cy - 96 * k} ${cx} ${cy - 96 * k} Q${cx + 36 * k} ${cy - 96 * k} ${cx + 36 * k} ${cy - 50 * k} V${cy}`, t ?? S.start, 0, { c: DS.c("gray", 2), w: DS.w.near * 1.4, parent: g });
  DS.shape(S, rrect(cx - 56 * k, cy - 6 * k, 112 * k, 90 * k, DS.r.sm * k), "gold", { t, w: "near", parent: g }); S.fill(circ(cx, cy + 34 * k, 10 * k), t ?? S.start, 0, DS.P.ink[0], 1, g); return g; };
const bone = (S, cx, cy, k, t, o = {}) => { const g = S.grp(o.parent), nm = o.name || "paper";
  DS.shape(S, `M${cx - 150 * k} ${cy - 30 * k} Q${cx - 190 * k} ${cy - 50 * k} ${cx - 190 * k} ${cy - 10 * k} Q${cx - 220 * k} ${cy} ${cx - 190 * k} ${cy + 20 * k} Q${cx - 190 * k} ${cy + 56 * k} ${cx - 150 * k} ${cy + 34 * k} L${cx + 150 * k} ${cy + 34 * k} Q${cx + 190 * k} ${cy + 56 * k} ${cx + 190 * k} ${cy + 20 * k} Q${cx + 220 * k} ${cy} ${cx + 190 * k} ${cy - 10 * k} Q${cx + 190 * k} ${cy - 50 * k} ${cx + 150 * k} ${cy - 30 * k} Z`, nm, { t, tone: 1, w: "near", parent: g });
  for (let i = 0; i < (o.holes ?? 0); i++) S.fill(circ(cx - 120 * k + (i % 8) * 34 * k, cy - 6 * k + Math.floor(i / 8) * 22 * k, 6 * k), t ?? S.start, 0, DS.c("gray", 2), 0.7, g);
  return g; };
const bowl = (S, cx, cy, k, t, o = {}) => { const g = S.grp(o.parent);
  [[-70, -30, 70, "green"], [10, -50, 80, "green"], [80, -24, 64, "green"], [-20, -20, 60, "grass"]].forEach(([dx, dy, r, nm], i) => DS.shape(S, circ(cx + dx * k, cy + dy * k, r * k, r * 0.8 * k), nm, { t, tone: i % 2 ? 1 : 0, w: "mid", parent: g }));
  S.fill(circ(cx + 40 * k, cy - 70 * k, 24 * k), t ?? S.start, 0, DS.c("red"), 1, g); S.fill(circ(cx - 60 * k, cy - 54 * k, 20 * k), t ?? S.start, 0, DS.c("red"), 1, g);
  DS.shape(S, `M${cx - 170 * k} ${cy - 20 * k} H${cx + 170 * k} Q${cx + 150 * k} ${cy + 130 * k} ${cx} ${cy + 140 * k} Q${cx - 150 * k} ${cy + 130 * k} ${cx - 170 * k} ${cy - 20 * k} Z`, "white", { t, tone: 2, w: "near", parent: g });
  return g; };
const dna = (S, cx, cy, h, t, parent) => { const g = S.grp(parent), n = 14, pts = (ph) => Array.from({ length: n + 1 }, (_, i) => [cx + Math.sin(i * 0.9 + ph) * 90, cy - h / 2 + (i / n) * h]);
  for (let i = 0; i <= n; i++) { const a = pts(0)[i], b = pts(Math.PI)[i]; S.draw(line(a, b, 0), t ?? S.start, 0, { c: DS.c("gray", 1), w: DS.w.detail, parent: g }); }
  S.draw(smooth(pts(0)), t ?? S.start, 0, { c: DS.c("blue"), w: DS.w.near * 1.2, parent: g }); S.draw(smooth(pts(Math.PI)), t ?? S.start, 0, { c: DS.c("red"), w: DS.w.near * 1.2, parent: g }); return g; };
const shaker = (S, cx, gy, k, t, parent) => { const g = S.grp(parent);
  DS.shape(S, `M${cx - 50 * k} ${gy - 130 * k} H${cx + 50 * k} L${cx + 64 * k} ${gy} H${cx - 64 * k} Z`, "glass", { t, w: "mid", parent: g }); DS.shape(S, `M${cx - 50 * k} ${gy - 130 * k} Q${cx} ${gy - 190 * k} ${cx + 50 * k} ${gy - 130 * k} Z`, "gray", { t, w: "mid", parent: g });
  S.fill(`M${cx - 58 * k} ${gy - 60 * k} H${cx + 58 * k} L${cx + 64 * k} ${gy} H${cx - 64 * k} Z`, t ?? S.start, 0, DS.P.white[0], 1, g); [-18, 0, 18].forEach((dx) => S.fill(circ(cx + dx * k, gy - 150 * k, 4 * k), t ?? S.start, 0, DS.P.ink[0], 1, g)); return g; };
const nut = (S, cx, cy, k, t, parent) => { const g = S.grp(parent), pts = Array.from({ length: 6 }, (_, i) => [cx + Math.cos(i * Math.PI / 3) * 90 * k, cy + Math.sin(i * Math.PI / 3) * 90 * k]);
  DS.shape(S, poly(pts, 0) + " Z", "gray", { t, w: "near", parent: g }); S.draw(circ(cx, cy, 40 * k), t ?? S.start, 0, { fill: DS.c("gray", 2), c: DS.P.ink[0], w: DS.w.mid, parent: g }); return g; };
const plant = (S, x, gy, h, k, nm, t, o = {}) => { const g = S.grp(o.parent);
  S.draw(`M${x} ${gy} Q${x + 10 * k} ${gy - h / 2} ${x} ${gy - h}`, t ?? S.start, 0, { c: DS.c("green", 2), w: DS.w.near * k, parent: g });
  [[-1, 0.45], [1, 0.6], [-1, 0.78], [1, 0.95]].slice(0, o.leaves ?? 4).forEach(([sd, f]) => DS.shape(S, `M${x} ${gy - h * f} Q${x + sd * 70 * k} ${gy - h * f - 60 * k} ${x + sd * 110 * k} ${gy - h * f - 14 * k} Q${x + sd * 60 * k} ${gy - h * f + 24 * k} ${x} ${gy - h * f} Z`, nm, { t, tone: 1, w: "detail", parent: g }));
  return g; };
const roots = (S, x, gy, len, t, parent) => { const g = S.grp(parent);
  [[0, 1], [-40, 0.8], [40, 0.8], [-80, 0.5], [80, 0.5]].forEach(([dx, f]) => S.draw(smooth([[x, gy], [x + dx * 0.4, gy + len * f * 0.5], [x + dx, gy + len * f]]), t ?? S.start, 0, { c: DS.c("sand", 2), w: DS.w.mid, parent: g })); return g; };
const labRoom = { wall: "sand", floor: "wood", window: false };

// By the end of the first month, Dave needs more air.
{ const S = sc(44, 0, { cam: "push", focus: "960 640" }); lunar(S, { sun: [260, 170, 46] });
  card(S, "END OF THE FIRST MONTH", 760, 190, { t: W(44, 1), size: DS.type.small });
  const F = daveM(S, 600, 940, "near", { s: 1.4, look: 5, mood: "worried", pose: "hold" });
  dial(S, 1280, 640, 190, 50, -62, W(44, 6), { dur: 2.2 }); card(S, "AIR", 1280, 380, { t: W(44, 6), size: DS.type.title, tc: "red" });
  DS.vignette(S, 0.2); }

// The good news is, he's standing on it.
{ const S = sc(44, 11, { cam: "push", focus: "960 700" }); lunar(S, { sun: [260, 170, 46] });
  const F = daveM(S, 700, 940, "near", { s: 1.4, look: 0, mood: "happy", pose: "hips" });
  card(S, "AIR", 1200, 500, { t: W(44, 15), size: DS.type.title }); S.arrow(1200, 570, 1000, 880, W(44, 16), 0.5, { c: DS.c("yellow"), w: DS.w.near * 1.4, bend: 0.2 });
  DS.vignette(S, 0.2); }

// By weight, Moon soil is about forty to forty-five percent oxygen.
{ const S = sc(45, 0, { cam: "push", focus: "960 540" }); space(S);
  const cx = 960, cy = 560, r = 280, a0 = -Math.PI / 2, a1 = a0 + 0.425 * Math.PI * 2;
  DS.shape(S, circ(cx, cy, r), "gray", { w: "near" });
  const sec = DS.shape(S, `M${cx} ${cy} L${cx} ${cy - r} A${r} ${r} 0 0 1 ${cx + Math.cos(a1) * r} ${cy + Math.sin(a1) * r} Z`, "sky", { w: "near" }); fadeG(S, sec, W(45, 5));
  card(S, "OXYGEN", 1280, 460, { t: W(45, 5), size: DS.type.body }); card(S, "40-45%", 1280, 600, { t: W(45, 6), size: DS.type.title, tc: "red" });
  card(S, "OF MOON SOIL, BY WEIGHT", 960, 190, { t: W(45, 2), size: DS.type.small });
  DS.vignette(S, 0.2); }

// It's just locked inside the minerals.
{ const S = sc(45, 11, { cam: "push", focus: "960 600" }); space(S);
  const cx = 900, cy = 620; DS.shape(S, poly(Array.from({ length: 6 }, (_, i) => [cx + Math.cos(i * Math.PI / 3 + 0.3) * 300, cy + Math.sin(i * Math.PI / 3 + 0.3) * 270]), 0) + " Z", "gray", { w: "near" });
  [[-110, -90], [90, -110], [140, 40], [-30, 30], [-170, 80], [30, 150], [-70, 160]].forEach(([dx, dy], i) => { const gg = S.grp(); S.fill(circ(cx + dx, cy + dy, 40), S.start, 0, DS.c("sky"), 1, gg); S.draw(circ(cx + dx, cy + dy, 40), S.start, 0, { c: DS.P.ink[0], w: DS.w.mid, parent: gg }); S.text("O", cx + dx, cy + dy + 15, { size: DS.type.small, t: S.start, c: DS.P.ink[0], parent: gg }); fadeG(S, gg, W(45, 12) + i * 0.1); });
  const pl = padlock2(S, 1200, 520, 1.6, W(45, 13)); fadeG(S, pl, W(45, 13));
  card(S, "LOCKED INSIDE THE MINERALS", 960, 170, { t: W(45, 12), size: DS.type.small });
  DS.vignette(S, 0.2); }

// In twenty nineteen, a team in Glasgow, working with the European Space Agency,
{ const S = sc(46, 0, { cam: "push", focus: "700 600" }); DS.room(S, labRoom);
  const F = sci2(S, 520, 960, "near", { s: 1.4, look: 5, mood: "smile", pose: "hips" });
  card(S, "2019", 960, 190, { t: W(46, 1), size: DS.type.title }); card(S, "GLASGOW TEAM", 520, 380, { t: W(46, 5), size: DS.type.small });
  const sp = who(S, 1000, 960, "near", { s: 1.4, hair: "short", hairC: DS.c("gray", 1), outfitC: DS.c("navy"), look: -5, mood: "smile", pose: "hips" });
  card(S, "EUROPEAN SPACE AGENCY", 1250, 380, { t: W(46, 8), size: DS.type.small });
  DS.vignette(S, 0.2); }

// ... cooked fake Moon soil in molten salt and ran a current through it.
{ const S = sc(46, 12, { cam: "push", focus: "960 640" }); DS.room(S, labRoom);
  const px = 960, py = 780; DS.shape(S, `M${px - 260} ${py - 120} H${px + 260} Q${px + 240} ${py + 120} ${px} ${py + 130} Q${px - 240} ${py + 120} ${px - 260} ${py - 120} Z`, "gray", { tone: 2, w: "near" });
  const mol = S.grp(); S.fill(`M${px - 244} ${py - 100} H${px + 244} Q${px + 226} ${py + 100} ${px} ${py + 112} Q${px - 226} ${py + 100} ${px - 244} ${py - 100} Z`, S.start, 0, DS.c("orange"), 1, mol); S.draw(`M${px - 244} ${py - 100} Q${px - 120} ${py - 124} ${px} ${py - 100} T${px + 244} ${py - 100}`, S.start, 0, { c: DS.c("yellow"), w: DS.w.near, parent: mol });
  const so = S.grp(); DS.shape(S, rrect(px - 90, py - 60, 180, 120, DS.r.sm), "gray", { w: "near", parent: so }); for (let i = 0; i < 10; i++) S.fill(circ(px - 70 + (i % 5) * 34, py - 30 + Math.floor(i / 5) * 40, 8), S.start, 0, DS.c("gray", 2), 1, so); fadeG(S, so, W(46, 13));
  card(S, "FAKE MOON SOIL", 420, 660, { t: W(46, 13), size: DS.type.small }); card(S, "MOLTEN SALT", 1500, 660, { t: W(46, 17), size: DS.type.small });
  const el1 = S.grp(); S.draw(`M${px - 130} ${py - 300} V${py - 20}`, S.start, 0, { c: DS.c("gray", 2), w: DS.w.near * 1.6, parent: el1 }); S.draw(`M${px + 130} ${py - 300} V${py - 20}`, S.start, 0, { c: DS.c("gray", 2), w: DS.w.near * 1.6, parent: el1 }); S.draw(`M${px - 130} ${py - 300} V${py - 420} H${px - 330} M${px + 130} ${py - 300} V${py - 420} H${px + 330}`, S.start, 0, { c: DS.P.ink[0], w: DS.w.near, parent: el1 });
  DS.shape(S, rrect(px - 330, py - 480, 140, 100, DS.r.sm), "yellow", { w: "near", parent: el1 }); DS.shape(S, rrect(px + 190, py - 480, 140, 100, DS.r.sm), "gray", { w: "near", parent: el1 }); fadeG(S, el1, W(46, 20));
  const bb = S.grp(); for (let i = 0; i < 7; i++) { const b = S.draw(circ(px - 90 + (i % 4) * 60, py - 40, 12), S.start, 0, { c: DS.c("sky", 2), w: DS.w.detail, fill: DS.c("sky", 1), parent: bb }); tl.fromTo(b, { y: 0 }, { y: -220 - (i % 3) * 30, duration: 2.4, ease: "none", repeat: 5 }, W(46, 21) + i * 0.35); } fadeG(S, bb, W(46, 21));
  card(S, "A CURRENT", 960, 190, { t: W(46, 20), size: DS.type.small });
  DS.vignette(S, 0.2); }

// In fifty hours, they pulled out ninety-six percent of its oxygen.
{ const S = sc(47, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM2);
  const ck = S.clock(480, 500, 150, W(47, 1), 0.01, { h: 12, m: 0 }); ck.spin && ck.spin(W(47, 1), WE(47, 2) - W(47, 1), 6);
  card(S, "50 HOURS", 480, 760, { t: W(47, 1), size: DS.type.title });
  DS.shape(S, rrect(820, 440, 900, 130, DS.r.md), "white", { flat: true, w: "near" });
  const fl = S.grp(); S.fill(rrect(832, 452, 876, 106, DS.r.sm), S.start, 0, DS.c("sky"), 1, fl); growX(fl, W(47, 6), 832, 505, WE(47, 7) - W(47, 6), "power1.inOut");
  countUp(S, 1270, 380, 0, 96, W(47, 6), WE(47, 7) - W(47, 6), { size: DS.type.title, c: DS.c("red", 2), fmt: (n) => Math.round(n) + " %", ease: "power1.inOut" });
  card(S, "OF ITS OXYGEN", 1270, 680, { t: W(47, 8), size: DS.type.small });
  DS.vignette(S, 0.2); }

// "Air from rocks. Brilliant. Now, what's for dinner?"
{ const S = sc(48, 0, { cam: "push", focus: "800 600" }); lunar(S, { sun: [260, 170, 46] });
  const F = dave(S, 620, 960, "near", { s: 1.5, look: 5, mood: "happy", pose: "armsUp" }); talk(S, F, W(48, 0), END(48));
  mound(S, 980, 960, 300, 200, "gray", undefined); const bb = S.grp(); for (let i = 0; i < 4; i++) { const b = S.draw(circ(960 + (i - 1.5) * 50, 740, 18), S.start, 0, { c: DS.c("sky", 2), w: DS.w.detail, fill: DS.c("sky", 1), parent: bb }); tl.fromTo(b, { y: 0 }, { y: -160, duration: 2.0, ease: "none", repeat: 3 }, S.start + i * 0.4); }
  const sb = say(S, 1330, 350, 420, 220, 800, 520, ["AIR FROM ROCKS.", "BRILLIANT. NOW,", "WHAT'S FOR", "DINNER?"], W(48, 0), { size: DS.type.caption }); tl.to(sb, { opacity: 0, duration: 0.4 }, W(49, 0));
  const pl = S.grp(); S.draw(circ(1500, 840, 110, 36), S.start, 0, { fill: DS.P.white[0], c: DS.P.ink[0], w: DS.w.near, parent: pl }); S.draw(circ(1500, 836, 70, 20), S.start, 0, { c: DS.c("gray", 1), w: DS.w.detail, parent: pl });
  S.draw(`M1330 790 V890 M1318 790 v30 M1330 790 v30 M1342 790 v30`, S.start, 0, { c: DS.c("gray", 2), w: DS.w.near, parent: pl }); S.draw(`M1670 790 V890 M1670 790 Q1700 820 1670 850`, S.start, 0, { c: DS.c("gray", 2), w: DS.w.near, parent: pl }); fadeG(S, pl, W(48, 5)); tl.to(pl, { opacity: 0, duration: 0.4 }, W(49, 0));
  F.setPose(W(49, 0), "reach");
  ITEM.seeds(S, 1480, 600, 2.4, { t: W(49, 0) }); card(S, "SEEDS", 1480, 330, { t: W(49, 1), size: DS.type.title });
  for (let i = 0; i < 6; i++) { const sd = S.fill(circ(1470 + i * 14, 790, 9, 6), W(49, 2), 0, DS.c("brown"), 1); tl.fromTo(sd, { y: -120 }, { y: 70 + (i % 3) * 14, duration: 0.7, ease: "power2.in" }, W(49, 2) + i * 0.1); }
  DS.vignette(S, 0.2); }

// In twenty twenty-two, a University of Florida team tried that on Earth, with just twelve grams of real Apollo soil.
{ const S = sc(49, 4, { cam: "push", focus: "960 600" }); DS.room(S, labRoom);
  sci(S, 420, 960, "near", { s: 1.4, look: 5, mood: "smile", pose: "point" });
  card(S, "2022", 960, 190, { t: W(49, 5), size: DS.type.title }); card(S, "FLORIDA TEAM", 420, 380, { t: W(49, 8), size: DS.type.small });
  const sg = S.grp(); DS.shape(S, rrect(1020, 700, 520, 220, DS.r.md), "gray", { tone: 1, w: "near", parent: sg }); DS.shape(S, rrect(1100, 730, 360, 100, DS.r.sm), "ink", { tone: 1, flat: true, w: "detail", parent: sg });
  const dg = countUp(S, 1280, 805, 0, 12, W(49, 18), WE(49, 19) - W(49, 18), { size: DS.type.title, c: DS.c("green", 1), fmt: (n) => Math.round(n) + " g", ease: "none", parent: sg }); fadeG(S, sg, W(49, 15));
  mound(S, 1280, 700, 120, 46, "gray", W(49, 16));
  card(S, "REAL APOLLO SOIL", 1280, 480, { t: W(49, 20), size: DS.type.small });
  DS.vignette(S, 0.2); }

// They planted thale cress, a small weed from the mustard family.
{ const S = sc(50, 0, { cam: "push", focus: "960 600" }); DS.room(S, labRoom);
  pot(S, 640, 900, 2.0, S.start); const sg = sprout(S, 640, 708, 2.0, W(50, 1)); scaleY(sg, W(50, 1), 640, 708, 1.0, 0.05);
  card(S, "THALE CRESS", 640, 190, { t: W(50, 2), size: DS.type.title }); card(S, "A SMALL WEED", 640, 330, { t: W(50, 4), size: DS.type.small });
  const fl = S.grp(); S.draw(`M1300 900 Q1310 700 1300 540`, W(50, 8), 0, { c: DS.c("green", 2), w: DS.w.near * 1.4, parent: fl });
  [[1300, 520], [1240, 600], [1360, 640]].forEach(([x, y], i) => { [0, 1, 2, 3].forEach((a) => DS.shape(S, circ(x + Math.cos(a * Math.PI / 2) * 40, y + Math.sin(a * Math.PI / 2) * 40, 32, 32), "yellow", { w: "detail", parent: fl })); S.fill(circ(x, y, 12), S.start, 0, DS.c("orange"), 1, fl); }); fadeG(S, fl, W(50, 8));
  card(S, "MUSTARD FAMILY", 1300, 190, { t: W(50, 8), size: DS.type.small });
  DS.vignette(S, 0.2); }

// After two days, everything sprouted.
{ const S = sc(51, 0, { cam: "push", focus: "960 640" }); DS.room(S, labRoom);
  for (let i = 0; i < 6; i++) { const x = 330 + i * 250; pot(S, x, 880, 1.3, S.start); const sg = sprout(S, x, 755, 1.3, W(51, 3) + i * 0.2); scaleY(sg, W(51, 3) + i * 0.2, x, 755, 0.8, 0.05); }
  card(S, "DAY 2", 700, 190, { t: W(51, 1), size: DS.type.title }); card(S, "EVERYTHING SPROUTED", 1300, 190, { t: W(51, 3), size: DS.type.small });
  DS.vignette(S, 0.2); }

// After about day six, the Moon plants fell behind: slower, with stunted roots, and some turned reddish.
{ const S = sc(51, 5, { cam: "push", focus: "960 640" }); DS.room(S, labRoom);
  const X = [520, 1400], gy = 660;
  X.forEach((x, i) => { panel(S, x, 560, 720, 780, S.start); S.fill(rect(x - 340, gy, 680, 240), S.start, 0, DS.c("brown", 1), 1); S.draw(line([x - 340, gy], [x + 340, gy], 0), S.start, 0, { c: DS.P.ink[0], w: DS.w.near }); });
  const gL = plant(S, X[0], gy, 330, 1.2, "green", W(51, 6)); roots(S, X[0], gy, 190, W(51, 6)); fadeG(S, gL, W(51, 6));
  const gR = plant(S, X[1], gy, 150, 0.9, "red", W(51, 11), { leaves: 2 }); roots(S, X[1], gy, 60, W(51, 15)); fadeG(S, gR, W(51, 11));
  card(S, "DAY 6", 960, 160, { t: W(51, 5), size: DS.type.title }); card(S, "NORMAL SOIL", X[0], 250, { t: W(51, 6), size: DS.type.small }); card(S, "MOON SOIL", X[1], 250, { t: W(51, 10), size: DS.type.small });
  card(S, "STUNTED ROOTS", X[1], 830, { t: W(51, 15), size: DS.type.caption }); card(S, "REDDISH", X[1] + 230, 520, { t: W(51, 19), size: DS.type.caption, tc: "red" });
  DS.vignette(S, 0.2); }

// Their genes showed the same stress as plants grown in too much salt or metal.
{ const S = sc(52, 0, { cam: "push", focus: "960 600" }); DS.room(S, ROOM2);
  const dn = dna(S, 960, 560, 560, S.start); card(S, "GENES SHOW STRESS", 960, 190, { t: W(52, 1), size: DS.type.small });
  const a = S.grp(); shaker(S, 380, 800, 1.5, undefined, a); fadeG(S, a, W(52, 8)); card(S, "TOO MUCH SALT", 380, 870, { t: W(52, 9), size: DS.type.caption });
  const b = S.grp(); nut(S, 1540, 700, 1.3, undefined, b); fadeG(S, b, W(52, 12)); card(S, "TOO MUCH METAL", 1540, 870, { t: W(52, 13), size: DS.type.caption });
  txt(S, "=", 660, 700, { size: DS.type.display, t: W(52, 8) }); txt(S, "=", 1260, 700, { size: DS.type.display, t: W(52, 12) });
  DS.vignette(S, 0.2); }

// So you can grow a salad on the Moon. It just won't be a happy salad.
{ const S = sc(53, 0, { cam: "push", focus: "960 640" }); lunar(S, { sun: [260, 170, 46] });
  plist(S, { crossed: [0, 1, 2, 3], cross: [[4, W(53, 12)]], t: W(53, 9) });
  const F = daveM(S, 620, 940, "near", { s: 1.4, look: 6, mood: "happy", pose: "hips" }); F.face(W(53, 9), "flat", 6); F.setPose(W(53, 10), "shrug");
  const bw = bowl(S, 1220, 760, 1.6, undefined); fadeG(S, bw, W(53, 4));
  const sd = S.grp(); S.fill(circ(1180, 820, 14), S.start, 0, DS.P.ink[0], 1, sd); S.fill(circ(1270, 820, 14), S.start, 0, DS.P.ink[0], 1, sd); S.draw(`M1170 900 Q1225 860 1280 900`, S.start, 0, { c: DS.P.ink[0], w: DS.w.near, parent: sd }); fadeG(S, sd, W(53, 10));
  const c1 = card(S, "A SALAD ON THE MOON", 960, 190, { t: W(53, 4), size: DS.type.body }); S.hide(c1.g, W(53, 9));
  card(S, "NOT A HAPPY SALAD", 1220, 430, { t: W(53, 11), size: DS.type.body });
  DS.vignette(S, 0.2); }

// In orbit, astronauts' bones lose about one to one and a half percent of their density a month.
{ const S = sc(54, 0, { cam: "push", focus: "960 600" }); space(S, { milky: [200, 900, 1700, 120] });
  earth(S, 960, 1380, 700);
  const A = astro(S, 640, 700, "near", { s: 1.2, look: 5, mood: "flat", pose: "armsUp", float: true });
  tl.fromTo(A.g, { y: 0 }, { y: -26, duration: 2.4, ease: "sine.inOut", yoyo: true, repeat: 6 }, S.start);
  const bn = bone(S, 1290, 560, 1.4, undefined, { holes: 0 }); fadeG(S, bn, W(54, 3));
  const dn = S.grp(); for (let i = 0; i < 16; i++) S.fill(circ(1290 - 220 + (i % 8) * 62, 540 + Math.floor(i / 8) * 44, 8, 8), S.start, 0, DS.c("gray", 2), 0.8, dn); fadeG(S, dn, W(54, 12)); tl.fromTo(dn, { opacity: 0 }, { opacity: 0.9, duration: 2 }, W(54, 12));
  card(S, "IN ORBIT", 960, 160, { t: W(54, 1), size: DS.type.body }); card(S, "LOSE 1 TO 1.5% A MONTH", 1290, 800, { t: W(54, 5), size: DS.type.small, tc: "red" });
  DS.vignette(S, 0.2); }

// Whether one sixth of Earth's gravity helps, nobody knows yet.
{ const S = sc(54, 18, { cam: "push", focus: "960 640" }); lunar(S, { sun: [260, 170, 46] });
  daveM(S, 620, 940, "near", { s: 1.4, look: 6, mood: "worried", pose: "shrug" });
  bone(S, 1280, 700, 1.1, undefined); txt(S, "?", 1280, 620, { size: DS.type.display, c: DS.c("red", 2), t: W(54, 24) });
  card(S, "1/6 GRAVITY: DOES IT HELP?", 800, 190, { t: W(54, 19), size: DS.type.body }); card(S, "NOBODY KNOWS YET", 1280, 900, { t: W(54, 25), size: DS.type.small, tc: "red" });
  DS.vignette(S, 0.2); }

// ===================== 7. Under the Moon =====================
// the Moon in cross-section: black sky + fixed Earth above, grey regolith at the surface line sy, dark rock below. o.sun [x, y, r]
const cutaway = (S, o = {}) => { DS.setHaze("night");
  const sy = o.sy ?? 560, g = S.grp(); S.g.insertBefore(g, S.g.firstChild); const f = (d, fill, op = 1) => S.fill(d, S.start, 0, fill, op, g);
  f(rect(-200, -200, 2320, 1480), DS.vgrad(DS.P.ink[2], DS.mix(DS.P.navy[2], DS.P.ink[2], 0.4)));
  const sky = S.grp(g); stars(S, 70, -100, -100, 2020, sy, { parent: sky, big: 3 });
  const sunG = o.sun ? sun(S, o.sun[0], o.sun[1], o.sun[2] ?? 46, { parent: sky }) : null;
  if (o.earth !== false) earth(S, EX, EY, ER, { night: true, nightA: 20, parent: g });
  f(`M-200 ${sy} H2120 V1280 H-200 Z`, DS.vgrad(DS.c("gray", 2), DS.mix(DS.c("gray", 2), DS.P.ink[2], 0.7)));
  f(`M-200 ${sy} Q300 ${sy - 14} 800 ${sy} T1700 ${sy} T2120 ${sy} V${sy + 46} H-200 Z`, DS.vgrad(DS.c("gray", 1), DS.c("gray", 0)));
  for (let i = 0; i < 60; i++) f(circ(rnd() * 1920, sy + 60 + rnd() * (1080 - sy - 60), 3 + rnd() * 9, 2 + rnd() * 5), rnd() > 0.5 ? DS.c("gray", 1) : DS.P.ink[0], 0.22);
  S.draw(`M-200 ${sy} Q300 ${sy - 14} 800 ${sy} T1700 ${sy} T2120 ${sy}`, S.start, 0, { c: DS.P.ink[0], w: DS.w.near, parent: g });
  return { g, sy, sunG, f }; };
// a dark hollow in the rock (cavity / tunnel / pit); d is any closed path
const hollow = (S, d, o = {}) => { const g = S.grp(o.parent); S.fill(d, o.t ?? S.start, 0, DS.vgrad(DS.P.ink[1], DS.P.ink[2]), 1, g); S.draw(d, o.t ?? S.start, 0, { c: DS.P.ink[0], w: DS.w.near, parent: g }); return g; };
const habitat = (S, x, gy, k, t, parent) => { const g = S.grp(parent); DS.shape(S, `M${x - 120 * k} ${gy} V${gy - 70 * k} Q${x - 120 * k} ${gy - 170 * k} ${x} ${gy - 170 * k} Q${x + 120 * k} ${gy - 170 * k} ${x + 120 * k} ${gy - 70 * k} V${gy} Z`, "white", { t, w: "near", parent: g }); DS.shape(S, rrect(x - 26 * k, gy - 70 * k, 52 * k, 70 * k, DS.r.xs), "gray", { t, w: "detail", parent: g }); S.fill(circ(x + 60 * k, gy - 100 * k, 18 * k), t ?? S.start, 0, DS.c("sky"), 1, g); return g; };
const snowflake = (S, x, y, k, t, parent) => { const g = S.grp(parent); [0, 1, 2].forEach((i) => { const a = i * Math.PI / 3; S.draw(line([x - Math.cos(a) * 70 * k, y - Math.sin(a) * 70 * k], [x + Math.cos(a) * 70 * k, y + Math.sin(a) * 70 * k], 0), t ?? S.start, 0, { c: DS.c("sky", 2), w: DS.w.near, parent: g }); }); return g; };
const orbiter = (S, x, y, k, parent) => { const g = S.grp(parent); [-1, 1].forEach((sd) => { DS.shape(S, rect(x + sd * 150 * k - 70 * k, y - 36 * k, 140 * k, 72 * k), "blue", { w: "mid", parent: g }); for (let i = 1; i < 4; i++) S.draw(line([x + sd * 150 * k - 70 * k + i * 35 * k, y - 36 * k], [x + sd * 150 * k - 70 * k + i * 35 * k, y + 36 * k], 0), S.start, 0, { c: DS.c("sky", 1), w: DS.w.hair, parent: g }); }); S.draw(line([x - 80 * k, y], [x + 80 * k, y], 0), S.start, 0, { c: DS.P.ink[0], w: DS.w.mid, parent: g }); DS.shape(S, rrect(x - 60 * k, y - 50 * k, 120 * k, 100 * k, DS.r.sm), "gold", { w: "near", parent: g }); S.draw(arc(x, y - 56 * k, 36 * k, 180, 360, 24 * k), S.start, 0, { c: DS.P.ink[0], w: DS.w.near, parent: g }); return g; };

// Air, water and food. Dave can live on the Moon.
{ const S = sc(55, 0, { cam: "push", focus: "960 540" }); lunar(S, { sun: [260, 170, 46] });
  const X = [500, 960, 1420], t = [W(55, 5), W(55, 6), W(55, 8)];
  X.forEach((x, i) => { const pg = panel(S, x, 480, 380, 400, t[i]); fadeG(S, pg, t[i]); });
  { const g = S.grp(); dial(S, X[0], 500, 110, -40, 40, S.start, { parent: g, dur: 0.01 }); fadeG(S, g, t[0]); card(S, "AIR", X[0], 330, { t: t[0], size: DS.type.small }); tick(S, X[0] + 130, 380, 1.6, t[0] + 0.3); }
  { const g = S.grp(); ITEM.bottle(S, X[1], 510, 1.5, { parent: g }); fadeG(S, g, t[1]); card(S, "WATER", X[1], 330, { t: t[1], size: DS.type.small }); tick(S, X[1] + 130, 380, 1.6, t[1] + 0.3); }
  { const g = S.grp(); bowl(S, X[2], 520, 1.0, undefined, { parent: g }); fadeG(S, g, t[2]); card(S, "FOOD", X[2], 330, { t: t[2], size: DS.type.small }); tick(S, X[2] + 130, 380, 1.6, t[2] + 0.3); }
  daveM(S, 960, 960, "near", { s: 0.85, look: 0, mood: "happy", pose: "hips" });
  card(S, "DAVE CAN LIVE ON THE MOON", 860, 150, { t: W(55, 9), size: DS.type.small });
  DS.vignette(S, 0.2); }

// Well, not quite. Not on it, anyway. Look at Dave's problems: the heat, the cold, the radiation, the dust.
{ const S = sc(56, 0, { cam: "push", focus: "960 540" }); space(S);
  const X = [340, 780, 1220, 1660], t = [W(56, 11), W(56, 13), W(56, 15), W(56, 17)], lb = ["THE HEAT", "THE COLD", "THE RADIATION", "THE DUST"];
  card(S, "NOT QUITE", 960, 150, { t: W(56, 0), size: DS.type.title, tc: "red" });
  X.forEach((x, i) => { const pg = panel(S, x, 520, 400, 460, t[i]); fadeG(S, pg, t[i]); card(S, lb[i], x, 700, { t: t[i], size: DS.type.caption }); });
  { const g = S.grp(); sun(S, X[0], 500, 60, { parent: g }); fadeG(S, g, t[0]); }
  snowflake(S, X[1], 500, 1.4, t[1]);
  { const g = S.grp(); [[-80, -90], [0, -100], [80, -90]].forEach(([dx, dy], i) => S.arrow(X[2] + dx, 400 + dy + 20, X[2] + dx * 0.3, 580, t[2] + i * 0.1, 0.3, { c: DS.c("sky", 2), w: DS.w.near, parent: g })); }
  { const g = dustCloud(S, X[3], 500, 0.8, undefined); fadeG(S, g, t[3]); }
  DS.vignette(S, 0.2); }

// They all live on the surface.
{ const S = sc(56, 19, { cam: "push", focus: "960 600" }); const C = cutaway(S, { sy: 640 });
  [[400, 0], [800, 1], [1200, 2], [1600, 3]].forEach(([x, i], k) => { const t = W(56, 20) + k * 0.05; if (i === 0) { const g = S.grp(); sun(S, x, 520, 38, { parent: g }); } if (i === 1) snowflake(S, x, 540, 0.9); if (i === 2) { [-40, 0, 40].forEach((dx) => S.arrow(x + dx, 440, x + dx * 0.4, 600, S.start, 0.3, { c: DS.c("sky", 2), w: DS.w.near })); } if (i === 3) dustCloud(S, x, 560, 0.55); });
  const rg = S.draw(`M-100 612 H2020 V700 H-100 Z`, W(56, 21), 0, { c: DS.c("red"), w: DS.w.near * 1.4 }); dashed(rg, 0.02, 0.012);
  card(S, "ALL ON THE SURFACE", 800, 200, { t: W(56, 21), size: DS.type.title });
  daveM(S, 960, 624, "near", { s: 0.45, look: 0, mood: "worried", pose: "stand" });
  DS.vignette(S, 0.2); }

// So the best home on the Moon might not be on the Moon. It might be in it.
{ const S = sc(57, 0, { cam: "push", focus: "960 640" }); const C = cutaway(S, { sy: 560 });
  hollow(S, `M900 640 Q900 600 960 600 H1480 Q1540 600 1540 650 V860 Q1540 900 1480 900 H960 Q900 900 900 860 Z`);
  const hb = S.grp(); habitat(S, 1200, 560, 1.2, undefined, hb); const q = txt(S, "?", 1200, 360, { size: DS.type.display, c: DS.P.white[0], t: W(57, 4) });
  card(S, "NOT ON THE MOON", 600, 300, { t: W(57, 6), size: DS.type.small, tc: "red" });
  tl.to(hb, { y: 270, duration: 1.4, ease: "power2.inOut" }, W(57, 13)); S.hide(q, W(57, 13));
  card(S, "IN IT", 1500, 430, { t: W(57, 15), size: DS.type.title });
  DS.vignette(S, 0.2); }

// "I came all this way to live in a hole?" Yes, Dave. A very good hole.
{ const S = sc(58, 0, { cam: "push", focus: "800 600" }); lunar(S, { sun: [260, 170, 46] });
  const F = daveM(S, 560, 960, "near", { s: 1.5, look: 6, mood: "angry", pose: "armsUp" }); talk(S, F, W(58, 0), END(58));
  S.fill(circ(1330, 900, 330, 66), S.start, 0, DS.P.ink[2], 1); S.draw(arc(1330, 900, 330, 0, 180, 66), S.start, 0, { c: DS.P.ink[0], w: DS.w.near });
  const sb = say(S, 1250, 380, 520, 190, 700, 500, ["I CAME ALL THIS WAY", "TO LIVE IN A HOLE?"], W(58, 0), { size: DS.type.small }); tl.to(sb, { opacity: 0, duration: 0.4 }, W(59, 0));
  F.face(W(59, 0), "flat", 6); F.setPose(W(59, 0), "shrug");
  const sg = S.grp(); S.draw(line([1640, 940], [1640, 560], 0), S.start, 0, { c: DS.c("wood", 2), w: DS.w.near * 1.6, parent: sg }); DS.shape(S, rrect(1420, 400, 440, 180, DS.r.sm), "wood", { w: "near", parent: sg }); txt(S, "A VERY GOOD", 1640, 470, { size: DS.type.caption, c: DS.P.white[0], t: W(59, 2), parent: sg }); txt(S, "HOLE", 1640, 540, { size: DS.type.small, c: DS.c("gold"), t: W(59, 3), parent: sg }); fadeG(S, sg, W(59, 2));
  DS.vignette(S, 0.2); }

// In two thousand nine, a Japanese orbiter confirmed the first pit in the Moon.
{ const S = sc(59, 6, { cam: "pull" }); space(S, { milky: [200, 900, 1700, 120] });
  moon(S, 960, 1300, 820, { glow: false }); S.fill(circ(1000, 520, 70, 22), S.start, 0, DS.P.ink[2], 1); S.draw(circ(1000, 520, 70, 22), S.start, 0, { c: DS.P.ink[0], w: DS.w.near });
  const ob = orbiter(S, 520, 250, 0.9); fadeG(S, ob, W(59, 8));
  dashed(S.draw(`M560 290 L930 510 M600 290 L1070 510`, W(59, 12), 0, { c: DS.c("yellow", 1), w: DS.w.mid, op: 0.8 }), 0.03, 0.02);
  card(S, "2009", 960, 150, { t: W(59, 7), size: DS.type.title }); card(S, "JAPANESE ORBITER", 520, 420, { t: W(59, 10), size: DS.type.caption }); card(S, "THE FIRST PIT", 1320, 560, { t: W(59, 15), size: DS.type.small });
  DS.vignette(S, 0.2); }

// Today we know of more than two hundred.
{ const S = sc(59, 20, { cam: "push", focus: "960 540" }); space(S);
  moon(S, 960, 560, 400, { glow: false }); const cp = clipG(S, circ(960, 560, 396));
  for (let i = 0; i < 220; i++) { const a = rnd() * 6.28, r = Math.sqrt(rnd()) * 380, d = S.fill(circ(960 + Math.cos(a) * r, 560 + Math.sin(a) * r, 6, 6), W(59, 21) + (i / 220) * (W(59, 26) - W(59, 21)), 0, DS.P.ink[0], 0.9, cp); }
  countUp(S, 1560, 540, 0, 200, W(59, 21), W(59, 26) - W(59, 21), { size: DS.type.display, c: DS.P.white[0], fmt: (n) => Math.round(n) + "+", ease: "none" });
  card(S, "PITS ON THE MOON", 1560, 700, { t: W(59, 22), size: DS.type.small });
  DS.vignette(S, 0.2); }

// Some are probably skylights into lava tubes, tunnels where rivers of molten rock once flowed.
{ const S = sc(60, 0, { cam: "push", focus: "960 640" }); const C = cutaway(S, { sy: 520 });
  hollow(S, `M180 760 Q180 700 260 700 H1660 Q1740 700 1740 760 V800 Q1740 850 1660 850 H260 Q180 850 180 800 Z`);
  const sh = S.grp(); S.fill(`M900 520 H1020 V705 H900 Z`, S.start, 0, DS.P.ink[2], 1, sh); S.draw(`M900 520 V705 M1020 520 V705`, S.start, 0, { c: DS.P.ink[0], w: DS.w.near, parent: sh });
  S.fill(`M900 520 H1020 L1180 850 H760 Z`, W(60, 3), 0, DS.c("yellow", 1), 0.25);
  card(S, "A SKYLIGHT", 640, 400, { t: W(60, 3), size: DS.type.body }); S.arrow(800, 440, 900, 560, W(60, 4), 0.3, { c: DS.P.white[0], w: DS.w.near });
  card(S, "LAVA TUBE", 1380, 930, { t: W(60, 5), size: DS.type.body });
  const lv = S.grp(); S.fill(`M190 770 H1730 V840 H190 Z`, S.start, 0, DS.c("orange"), 1, lv); growX(lv, W(60, 8), 190, 800, 1.6, "power1.inOut"); tl.to(lv, { opacity: 0, duration: 1.4 }, W(60, 13)); fadeG(S, lv, W(60, 8));
  DS.vignette(S, 0.2); }

// In twenty twenty-four, a team in Italy reread old radar data and found a cave
{ const S = sc(61, 0, { cam: "push", focus: "960 540" }); DS.room(S, labRoom);
  sci(S, 420, 960, "near", { s: 1.4, look: 5, mood: "smile", pose: "point" }); sci2(S, 760, 960, "near", { s: 1.4, look: 5, mood: "smile", pose: "hold" });
  card(S, "2024", 960, 170, { t: W(61, 1), size: DS.type.title }); card(S, "ITALIAN TEAM", 590, 380, { t: W(61, 5), size: DS.type.small });
  const pg = S.grp(); paperR(S, 1200, 330, 520, 480, { parent: pg }); [0, 1, 2, 3, 4].forEach((i) => S.draw(smooth([[1230, 400 + i * 80], [1330, 370 + i * 80], [1430, 430 + i * 80], [1540, 390 + i * 80], [1690, 410 + i * 80]]), S.start, 0, { c: DS.c("gray", 2), w: DS.w.mid, parent: pg })); fadeG(S, pg, W(61, 7));
  card(S, "OLD RADAR DATA", 1460, 880, { t: W(61, 8), size: DS.type.small });
  DS.vignette(S, 0.2); }

// ... and found a cave stretching tens of metres beyond the bottom of one pit. Nobody knows how far it goes.
{ const S = sc(61, 11, { cam: "push", focus: "960 640" }); const C = cutaway(S, { sy: 480 });
  hollow(S, `M560 480 H700 V760 H560 Z`);
  const cv = hollow(S, `M700 700 Q700 660 760 660 H1580 Q1660 660 1660 740 Q1660 820 1580 820 H760 Q700 820 700 780 Z`); tl.fromTo(cv, { opacity: 0.1 }, { opacity: 1, duration: 1.2 }, W(61, 13));
  card(S, "A CAVE", 1220, 590, { t: W(61, 13), size: DS.type.title });
  S.arrow(720, 880, 1650, 880, W(61, 15), 0.8, { c: DS.P.white[0], w: DS.w.near }); S.arrow(1650, 880, 720, 880, W(61, 15), 0.8, { c: DS.P.white[0], w: DS.w.near }); card(S, "TENS OF METRES", 1180, 930, { t: W(61, 16), size: DS.type.small });
  card(S, "THE PIT", 640, 340, { t: W(61, 22), size: DS.type.small });
  const ds = S.grp(); S.draw(`M1660 660 H1900 M1660 820 H1900`, W(62, 2), 0, { c: DS.c("gray", 1), w: DS.w.near, parent: ds }); dashed(ds.firstChild, 0.03, 0.03);
  txt(S, "?", 1800, 790, { size: DS.type.display, c: DS.P.white[0], t: W(62, 3) });
  card(S, "NOBODY KNOWS HOW FAR", 760, 230, { t: W(62, 1), size: DS.type.body });
  DS.vignette(S, 0.2); }

// It could run for kilometres under the Sea of Tranquillity.
{ const S = sc(62, 6, { cam: "push", focus: "960 560" }); space(S, { milky: [200, 900, 1700, 120] });
  moon(S, 960, 560, 340, { glow: false }); const cp = clipG(S, circ(960, 560, 336));
  S.fill(circ(1050, 470, 170, 120), W(62, 12), 0, DS.c("brown", 1), 0.55, cp);
  S.fill(circ(1000, 480, 10), W(62, 12), 0, DS.c("red"), 1);
  dashed(S.draw(smooth([[1000, 480], [1070, 520], [1150, 500], [1230, 540]]), W(62, 8), 0, { c: DS.c("yellow"), w: DS.w.near * 1.4 }), 0.03, 0.025);
  card(S, "KILOMETRES?", 1500, 700, { t: W(62, 8), size: DS.type.body }); card(S, "SEA OF TRANQUILLITY", 1450, 330, { t: W(62, 12), size: DS.type.small }); S.arrow(1330, 380, 1130, 460, W(62, 13), 0.4, { c: DS.P.white[0], w: DS.w.near });
  DS.vignette(S, 0.2); }

// Two years earlier, a University of California team studied that same pit.
{ const S = sc(63, 0, { cam: "push", focus: "960 540" }); DS.room(S, labRoom);
  sci2(S, 420, 960, "near", { s: 1.4, look: 5, mood: "smile", pose: "point" });
  const sc1 = screen(S, 1280, 500, 720, 440, S.start, { fill: "orange", tone: 0 }); S.fill(circ(1280, 500, 110), S.start, 0, DS.c("sky", 2), 1); S.draw(circ(1280, 500, 110), S.start, 0, { c: DS.P.ink[0], w: DS.w.near });
  card(S, "2022", 960, 170, { t: W(63, 0), size: DS.type.title }); card(S, "CALIFORNIA TEAM", 420, 380, { t: W(63, 4), size: DS.type.small }); card(S, "THE SAME PIT", 1280, 860, { t: W(63, 9), size: DS.type.small });
  DS.vignette(S, 0.2); }

// In the shade under its overhang, it stays at about seventeen degrees Celsius. All day, all night, all month.
{ const S = sc(64, 0, { cam: "push", focus: "960 640" }); const C = cutaway(S, { sy: 520, sun: [200, 150, 46] });
  tl.fromTo(C.sunG, { x: 0 }, { x: 900, duration: S.len, ease: "none" }, S.start);
  hollow(S, `M620 520 H780 V700 Q780 720 800 720 H1700 Q1760 720 1760 780 V860 Q1760 900 1700 900 H800 Q620 900 620 800 Z`);
  const th = thermo(S, 1330, 880, 130, "green", W(64, 8)); level(th, S.start, 0.01, 1, 1);
  card(S, "ABOUT 17°C", 1330, 620, { t: W(64, 9), size: DS.type.title, tc: "green" }); card(S, "IN THE SHADE", 1050, 760, { t: W(64, 3), size: DS.type.caption });
  ["ALL DAY", "ALL NIGHT", "ALL MONTH"].forEach((s, i) => card(S, s, 330, 660 + i * 110, { t: W(64, 13 + i), size: DS.type.small }));
  DS.vignette(S, 0.2); }

// The university called it sweater weather.
{ const S = sc(65, 0, { cam: "push", focus: "960 540" }); DS.room(S, labRoom);
  const pg = S.grp(); paperR(S, 560, 180, 800, 700, { parent: pg }); txt(S, "SWEATER", 960, 330, { size: DS.type.display, t: W(65, 4), parent: pg }); txt(S, "WEATHER", 960, 450, { size: DS.type.display, t: W(65, 5), parent: pg });
  lines(S, 640, 520, 640, 3, S.start, 44, pg); ITEM.jumper(S, 960, 720, 1.4, { parent: pg, t: W(65, 4) });
  card(S, "THE UNIVERSITY", 960, 130, { t: W(65, 1), size: DS.type.small });
  DS.vignette(S, 0.2); }

// Dave would call it jumper weather.
{ const S = sc(65, 6, { cam: "push", focus: "960 640" }); const C = cutaway(S, { sy: 440 });
  hollow(S, `M300 440 H520 V480 Q520 500 600 500 H1600 Q1700 500 1700 600 V920 Q1700 980 1600 980 H500 Q300 980 300 800 Z`);
  plist(S, { x: 100, y: 120, crossed: [0, 1, 3, 4], cross: [], tick: [[2, W(65, 9)]], t: S.start });
  const F = daveM(S, 1000, 960, "near", { s: 1.1, look: 0, mood: "happy", pose: "hips", helmet: false, pack: false }); jumper(S, F);
  const th = thermo(S, 1500, 960, 220, "green", S.start); level(th, S.start, 0.01, 1, 1); card(S, "17°C", 1500, 700, { t: S.start, size: DS.type.body, tc: "green" });
  card(S, "JUMPER WEATHER", 1000, 290, { t: W(65, 8), size: DS.type.title });
  DS.vignette(S, 0.2); }

// A roof of rock also gives some protection from cosmic rays and tiny meteorites.
{ const S = sc(66, 0, { cam: "push", focus: "960 640" }); const C = cutaway(S, { sy: 400 });
  hollow(S, `M300 620 Q300 580 380 580 H1540 Q1620 580 1620 620 V900 Q1620 960 1540 960 H380 Q300 960 300 900 Z`);
  [[400, -20, 700, 420], [700, -20, 1000, 420], [1000, -20, 1300, 420], [1300, -20, 1600, 420], [160, 120, 420, 420]].forEach(([a, b, c, d], i) => ray(S, a, b, c, d, W(66, 8) + i * 0.1, { delay: i * 0.4, dur: 1.8 }));
  [[560, 360], [1200, 340]].forEach(([x, y], i) => { const m = S.fill(circ(x, y - 260, 12, 10), W(66, 11), 0, DS.c("gray", 1), 1); tl.fromTo(m, { y: 0 }, { y: 250, duration: 1.4, ease: "power2.in", repeat: 3, repeatDelay: 0.6 }, W(66, 11) + i * 0.7); });
  daveM(S, 960, 960, "near", { s: 0.9, look: 0, mood: "smile", pose: "stand", helmet: false, pack: false });
  card(S, "A ROOF OF ROCK", 800, 270, { t: W(66, 1), size: DS.type.title }); card(S, "SOME PROTECTION", 1450, 520, { t: W(66, 5), size: DS.type.small });
  DS.vignette(S, 0.2); }

// Remember the tip, to cover your home with Moon soil? The Moon already did it.
{ const S = sc(66, 14, { cam: "push", focus: "960 640" }); const C = cutaway(S, { sy: 400 });
  hollow(S, `M300 620 Q300 580 380 580 H1540 Q1620 580 1620 620 V900 Q1620 960 1540 960 H380 Q300 960 300 900 Z`);
  daveM(S, 960, 960, "near", { s: 0.9, look: 0, mood: "smile", pose: "stand", helmet: false, pack: false });
  card(S, "COVER YOUR HOME WITH MOON SOIL", 760, 190, { t: W(66, 15), size: DS.type.small });
  const rg = S.draw(`M220 420 H1700 V580 H220 Z`, W(66, 24), 0, { c: DS.c("green"), w: DS.w.near * 1.4 }); dashed(rg, 0.02, 0.012);
  card(S, "THE MOON ALREADY DID IT", 960, 500, { t: W(66, 24), size: DS.type.title, tc: "green" }); tick(S, 1680, 500, 2, W(66, 26));
  DS.vignette(S, 0.2); }

// ===================== 8. Unpacking =====================
// the pit home in cross-section: a shaft up to the surface right under Earth (x 1480), light falling in, a floor at y 940
const cave = (S, o = {}) => { const C = cutaway(S, { sy: 400 });
  hollow(S, `M200 560 Q200 500 280 500 H1360 V400 H1600 V500 H1640 Q1720 500 1720 560 V900 Q1720 950 1640 950 H280 Q200 950 200 900 Z`);
  S.fill(`M1360 400 H1600 L1720 950 H1240 Z`, S.start, 0, DS.c("yellow", 1), 0.16);
  return C; };
const campfire = (S, x, gy, k, t, parent) => { const g = S.grp(parent);
  [-1, 1].forEach((sd) => S.draw(line([x + sd * 90 * k, gy - 6 * k], [x - sd * 70 * k, gy - 40 * k], 0), t ?? S.start, 0, { c: DS.c("wood", 2), w: DS.w.near * 1.6, parent: g }));
  const fl = S.grp(g); DS.shape(S, `M${x} ${gy - 160 * k} Q${x + 70 * k} ${gy - 80 * k} ${x + 40 * k} ${gy - 30 * k} Q${x} ${gy - 10 * k} ${x - 40 * k} ${gy - 30 * k} Q${x - 70 * k} ${gy - 80 * k} ${x} ${gy - 160 * k} Z`, "orange", { t, w: "mid", parent: fl });
  DS.shape(S, `M${x} ${gy - 100 * k} Q${x + 30 * k} ${gy - 60 * k} ${x + 16 * k} ${gy - 30 * k} Q${x} ${gy - 20 * k} ${x - 16 * k} ${gy - 30 * k} Q${x - 30 * k} ${gy - 60 * k} ${x} ${gy - 100 * k} Z`, "yellow", { t, w: "detail", parent: fl });
  tl.fromTo(fl, { attr: { transform: `translate(${x} ${gy}) scale(1 1) translate(${-x} ${-gy})` } }, { attr: { transform: `translate(${x} ${gy}) scale(1.04 1.08) translate(${-x} ${-gy})` }, duration: 1.6, ease: "sine.inOut", yoyo: true, repeat: 12 }, S.start);
  return g; };
const handprint = (S, x, y, k, parent) => { const g = S.grp(parent); S.draw(`M${x - 24 * k} ${y + 50 * k} L${x - 28 * k} ${y - 10 * k} M${x - 10 * k} ${y + 40 * k} L${x - 12 * k} ${y - 30 * k} M${x + 6 * k} ${y + 40 * k} L${x + 8 * k} ${y - 34 * k} M${x + 22 * k} ${y + 40 * k} L${x + 28 * k} ${y - 20 * k}`, S.start, 0, { c: DS.c("earth", 1), w: DS.w.near * 1.4, parent: g }); S.fill(circ(x, y + 54 * k, 30 * k, 22 * k), S.start, 0, DS.c("earth", 1), 1, g); return g; };

// So, what if you tried to live on the Moon?
{ const S = sc(67, 0, { cam: "pull" }); space(S, { milky: [200, 900, 1700, 120] });
  moon(S, 960, 1380, 860, { glow: false });
  daveM(S, 960, 520, "near", { s: 0.75, look: 0, mood: "smile", pose: "stand" }); suitcase(S, 1130, 520, 0.4);
  card(S, "LIVE ON THE MOON?", 960, 130, { t: W(67, 6), size: DS.type.title });
  DS.vignette(S, 0.2); }

// On the surface, it's a fight with the heat, the cold, the radiation and, worst of all, the dust.
{ const S = sc(67, 10, { cam: "push", focus: "960 640" }); lunar(S, { sun: [260, 170, 46] });
  const F = daveM(S, 520, 940, "near", { s: 1.5, look: 6, mood: "determined", pose: "armsUp" });
  const t = [W(67, 18), W(67, 20), W(67, 22), W(67, 27)];
  { const g = S.grp(); sun(S, 1000, 700, 52, { parent: g }); fadeG(S, g, t[0]); card(S, "HEAT", 1000, 560, { t: t[0], size: DS.type.caption }); }
  { snowflake(S, 1260, 700, 1.0, t[1]); card(S, "COLD", 1260, 560, { t: t[1], size: DS.type.caption }); }
  { const g = S.grp(); [-50, 0, 50].forEach((dx, i) => S.arrow(1520 + dx, 590, 1520 + dx * 0.4, 740, S.start, 0.3, { c: DS.c("sky", 2), w: DS.w.near, parent: g })); fadeG(S, g, t[2]); card(S, "RADIATION", 1520, 480, { t: t[2], size: DS.type.caption }); }
  { const dc = dustCloud(S, 1700, 740, 1.0, undefined); fadeG(S, dc, t[3]); card(S, "WORST OF ALL: DUST", 1440, 900, { t: t[3], size: DS.type.small, tc: "red" }); }
  DS.vignette(S, 0.2); }

// But underneath, you might just manage, with air from rock, ice from the craters, and a stressed salad.
{ const S = sc(68, 0, { cam: "push", focus: "960 640" }); const C = cutaway(S, { sy: 400 });
  hollow(S, `M200 560 Q200 500 280 500 H1640 Q1720 500 1720 560 V900 Q1720 950 1640 950 H280 Q200 950 200 900 Z`);
  const F = daveM(S, 440, 940, "near", { s: 1.1, look: 6, mood: "smile", pose: "hips", helmet: false, pack: false }); jumper(S, F);
  const X = [780, 1180, 1560], t = [W(68, 7), W(68, 10), W(68, 15)], CY = [640, 730, 640];
  { const g = S.grp(); mound(S, X[0], 940, 220, 150, "gray", undefined, g); [[-40, -60], [30, -90], [50, -40]].forEach(([dx, dy]) => { const b = S.draw(circ(X[0] + dx, 940 + dy - 80, 14), S.start, 0, { c: DS.c("sky", 2), w: DS.w.detail, fill: DS.c("sky", 1), parent: g }); tl.fromTo(b, { y: 0 }, { y: -90, duration: 2.0, ease: "none", repeat: 4 }, t[0] + dx / 100); }); fadeG(S, g, t[0]); card(S, "AIR FROM ROCK", X[0], CY[0], { t: t[0], size: DS.type.caption }); }
  { const g = S.grp(); DS.shape(S, rrect(X[1] - 80, 820, 160, 120, DS.r.sm), "sky", { tone: 1, w: "near", parent: g }); S.draw(line([X[1] - 40, 850], [X[1] + 10, 900], 0), S.start, 0, { c: DS.P.white[0], w: DS.w.mid, parent: g }); fadeG(S, g, t[1]); card(S, "ICE FROM THE CRATERS", X[1], CY[1], { t: t[1], size: DS.type.caption }); }
  { const g = S.grp(); bowl(S, X[2], 880, 0.7, undefined, { parent: g }); S.fill(circ(X[2] - 24, 920, 7), S.start, 0, DS.P.ink[0], 1, g); S.fill(circ(X[2] + 24, 920, 7), S.start, 0, DS.P.ink[0], 1, g); S.draw(`M${X[2] - 28} ${948} Q${X[2]} ${930} ${X[2] + 28} ${948}`, S.start, 0, { c: DS.P.ink[0], w: DS.w.detail, parent: g }); fadeG(S, g, t[2]); card(S, "A STRESSED SALAD", X[2], CY[2], { t: t[2], size: DS.type.caption }); }
  DS.vignette(S, 0.2); }

// One of those scientists put it simply:
{ const S = sc(69, 0, { cam: "push", focus: "700 600" }); DS.room(S, labRoom);
  const F = sci(S, 520, 960, "near", { s: 1.5, look: 4, mood: "smile", pose: "hold" }); talk(S, F, W(69, 0), W(69, 7));
  card(S, "ONE OF THE SCIENTISTS", 520, 360, { t: W(69, 3), size: DS.type.small });
  say(S, 1250, 420, 520, 230, 700, 560, ["HUMANS EVOLVED LIVING IN CAVES,", "AND TO CAVES WE MIGHT RETURN", "WHEN WE LIVE ON THE MOON."], W(69, 6), { size: DS.type.caption });
  DS.vignette(S, 0.2); }

// ... humans evolved living in caves, and to caves we might return when we live on the Moon.
{ const S = sc(69, 7, { cam: "push", focus: "960 640" }); DS.setHaze("earth");
  const g = S.grp(); S.g.insertBefore(g, S.g.firstChild); const f = (d, fill, op = 1) => S.fill(d, S.start, 0, fill, op, g);
  f(rect(-200, -200, 2320, 1480), DS.vgrad(DS.c("earth", 2), DS.mix(DS.c("earth", 2), DS.P.ink[2], 0.6)));
  f(`M-200 960 Q300 900 960 920 T2120 940 V1280 H-200 Z`, DS.vgrad(DS.c("gray", 2), DS.mix(DS.c("gray", 2), DS.P.ink[2], 0.5)));
  const op = S.grp(g); S.fill(`M1100 920 Q1100 360 1400 340 Q1700 360 1700 920 Z`, S.start, 0, DS.vgrad(DS.P.ink[2], DS.P.navy[2]), 1, op); stars(S, 18, 1130, 380, 1680, 880, { parent: op, big: 2 });
  S.draw(`M1100 920 Q1100 360 1400 340 Q1700 360 1700 920`, S.start, 0, { c: DS.P.ink[0], w: DS.w.near * 1.4, parent: g });
  const er = earth(S, 1500, 520, 60, { night: true, nightA: 20 }); tl.fromTo(er, { opacity: 0 }, { opacity: 1, duration: 1.6 }, W(69, 19));
  [[300, 380], [520, 300], [760, 420]].forEach(([x, y]) => handprint(S, x, y, 1.4, g));
  campfire(S, 760, 930, 1.5, undefined);
  const c1 = who(S, 500, 940, "near", Object.assign({}, CAVEMAN, { s: 1.3, look: 6, mood: "happy", pose: "hips" })), c2 = who(S, 1000, 940, "near", Object.assign({}, CAVEMAN, { s: 1.2, hairC: DS.c("ink", 1), look: -6, mood: "smile", pose: "stand" }));
  const dv = daveM(S, 1280, 940, "near", { s: 1.3, look: -6, mood: "happy", pose: "stand", helmet: false, pack: false }); jumper(S, dv); fadeG(S, dv.all, W(69, 14));
  card(S, "HUMANS EVOLVED IN CAVES", 620, 190, { t: W(69, 8), size: DS.type.body }); card(S, "ON THE MOON?", 1500, 190, { t: W(69, 20), size: DS.type.body });
  DS.vignette(S, 0.2); }

// Dave carries his suitcase down into the pit.
{ const S = sc(70, 0, { cam: "push", focus: "960 640" }); const C = cutaway(S, { sy: 420 });
  hollow(S, `M880 420 H1120 L1500 700 V960 H300 V700 Z`);
  const F = daveM(S, 1000, 410, "near", { s: 0.7, look: 0, mood: "smile", pose: "stand" }); F.walk(W(70, 1), WE(70, 7) - W(70, 1), { x: -300, y: 530 });
  const sg = suitcase(S, 1090, 410, 0.28); tl.to(sg, { x: -300, y: 530, duration: WE(70, 7) - W(70, 1), ease: "none" }, W(70, 1));
  card(S, "INTO THE PIT", 700, 200, { t: W(70, 3), size: DS.type.title });
  DS.vignette(S, 0.2); }

// Out come the earplugs, the sunscreen, the empty bottle and the seeds.
{ const S = sc(70, 8, { cam: "push", focus: "960 700" }); cave(S);
  plist(S, { x: 100, y: 100, crossed: [0, 1, 3, 4], t: S.start });
  daveM(S, 420, 940, "near", { s: 1.1, look: 6, mood: "smile", pose: "reach", helmet: false, pack: false });
  suitcase(S, 760, 940, 1.1, { open: true });
  const it = [[ITEM.earplugs, 1060, 880, 1.0, 11], [ITEM.sunscreen, 1190, 860, 0.9, 13], [ITEM.bottle, 1330, 860, 0.9, 16], [ITEM.seeds, 1470, 880, 1.0, 19]];
  it.forEach(([fn, x, y, k, w]) => { const g = fn(S, x, y, k, fn === ITEM.bottle ? { full: 0 } : {}); tl.fromTo(g, { x: 760 - x, y: 700 - y, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 1.1, ease: "power1.out" }, W(70, w)); });
  DS.vignette(S, 0.2); }

// Then the one thing he packed that works exactly as planned. He puts on his jumper.
{ const S = sc(71, 0, { cam: "push", focus: "960 700" }); cave(S);
  plist(S, { x: 100, y: 100, crossed: [0, 1, 3, 4], tick: [[2, W(71, 9)]], t: S.start });
  const F = daveM(S, 420, 940, "near", { s: 1.1, look: 6, mood: "smile", pose: "armsUp", helmet: false, pack: false });
  suitcase(S, 760, 940, 1.1, { open: true });
  [[ITEM.earplugs, 1060, 880, 1.0], [ITEM.sunscreen, 1190, 860, 0.9], [ITEM.bottle, 1330, 860, 0.9], [ITEM.seeds, 1470, 880, 1.0]].forEach(([fn, x, y, k]) => fn(S, x, y, k, fn === ITEM.bottle ? { full: 0 } : {}));
  const big = ITEM.jumper(S, 660, 400, 1.4, { t: T0(S) }); tl.to(big, { opacity: 0, duration: 0.4 }, W(71, 12) + 0.2);
  jumper(S, F, W(71, 12)); F.setPose(W(71, 12), "stand");
  const th = thermo(S, 1640, 900, 160, "green", S.start); level(th, S.start, 0.01, 1, 1); card(S, "17°C", 1640, 700, { t: S.start, size: DS.type.body, tc: "green" });
  DS.vignette(S, 0.2); }

// Above the pit, the Earth hangs in the same spot it has hung all month.
{ const S = sc(72, 0, { cam: "none" }); DS.setHaze("night");
  const g = S.grp(); S.g.insertBefore(g, S.g.firstChild); const f = (d, fill, op = 1) => S.fill(d, S.start, 0, fill, op, g);
  f(rect(-200, -200, 2320, 1480), DS.vgrad(DS.mix(DS.P.ink[1], DS.P.ink[2], 0.4), DS.P.ink[2]));
  for (let i = 0; i < 50; i++) f(circ(rnd() * 1920, rnd() * 1080, 3 + rnd() * 9, 2 + rnd() * 5), rnd() > 0.5 ? DS.c("gray", 1) : DS.P.ink[0], 0.2);
  f(`M1060 230 Q1060 40 1480 40 Q1900 40 1900 230 Q1900 420 1480 420 Q1060 420 1060 230 Z`, DS.vgrad(DS.P.ink[2], DS.P.navy[2]));
  const sk = S.grp(g); stars(S, 40, 1080, 60, 1880, 400, { parent: sk, big: 2 });
  S.fill(`M1080 300 H1880 L1820 1080 H1140 Z`, S.start, 0, DS.c("yellow", 1), 0.12, g);
  earth(S, EX, EY, ER, { night: true, nightA: 20, parent: g }); S.draw(`M1060 230 Q1060 40 1480 40 Q1900 40 1900 230 Q1900 420 1480 420 Q1060 420 1060 230 Z`, S.start, 0, { c: DS.P.ink[0], w: DS.w.near * 1.4, parent: g });
  const F = daveM(S, 700, 940, "near", { s: 1.5, look: 7, mood: "smile", pose: "point", helmet: false, pack: false }); jumper(S, F);
  suitcase(S, 1000, 940, 0.9);
  card(S, "ALL MONTH", 900, 200, { t: W(72, 12), size: DS.type.title });
  DS.vignette(S, 0.2); }

// And for the first time, Dave unpacks.
{ const S = sc(73, 0, { cam: "push", focus: "960 700" }); cave(S);
  plist(S, { x: 100, y: 100, crossed: [0, 1, 3, 4], ticked: [2], t: S.start });
  const sc1 = suitcase(S, 800, 940, 1.1, { open: true });
  const F = daveM(S, 580, 940, "near", { s: 1.1, look: 6, mood: "happy", pose: "hips", helmet: false, pack: false }); jumper(S, F);
  [[ITEM.earplugs, 1000, 910, 0.9], [ITEM.sunscreen, 1110, 890, 0.8], [ITEM.bottle, 1220, 890, 0.8]].forEach(([fn, x, y, k]) => fn(S, x, y, k, fn === ITEM.bottle ? { full: 0 } : {}));
  pot(S, 1400, 940, 1.1, S.start); const sg = sprout(S, 1400, 856, 1.1, S.start);
  DS.frame(S, 330, 650, 150, 110, "sky", "mid");
  DS.vignette(S, 0.2); }
