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
