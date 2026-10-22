// look: still
// What If You Drank 100 Energy Drinks? (~8:20). What-if escalation counted in cans (1 -> 3 -> 5 -> 100 -> a hundred of nothing but water). Dave lines up a hundred cans; he never gets near it.
// Runner 1: THE HUNDRED CANS on Dave's kitchen table, ten rows of ten, each with a tiny red-striped warning label; a CAN COUNTER ticks up and a pile of "reasons to stop" sticky notes grows beside it
//   (CAFFEINE LIMIT, HEART, SLEEP, SUGAR, WATER). Runner 2: THE LIBRARY in Dave's brain: adenosine = tired grey visitors who need a chair, caffeine = orange look-alikes who sit in the chairs and do nothing;
//   the tired ones queue in the corridor (it grows every chapter) and sit down in the last scene. Cast: Dave, his Brain (the ep38 librarian), a generic DOCTOR figure.
// Real Dave opens ONE can (can one, and the walk back to the fridge); everything else is PAPER DAVE (a cutout on a paper stand, dashed cut line round him).
// SAFETY / VISUAL: generic plain cans only (teal, blank band, never a brand). Nothing flashes or strobes: heart pulses are slow (1 s), water rises slowly, no dark/red danger palette. The danger chapter is calm and kind.
// No doses to harm are shown; only limits (200 mg single dose, 400 mg a day, 30 g sugar) and the premise's totals.
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
const clipTo = (g, d) => { const id = "cp38-" + ++CP, cp = el("clipPath", { id }, dsDefs()); el("path", { d }, cp); g.setAttribute("clip-path", `url(#${id})`); return g; };
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

// ---------- Dave's Brain: a small pink brain, round librarian glasses, a bun with a pencil, a green cardigan. Calm, tired, finger to lips ----------
// feet at (cx, gy); height about 295 * k. faces: tired stern worried smile shh. arms: R down shush point stop; L down hip up
const brainy = (S, cx, gy, k = 1, o = {}) => {
  const g = S.grp(o.parent), w = Math.max(3, 5.5 * Math.sqrt(k)), wd = Math.max(2, 3 * Math.sqrt(k)), INKC = DS.P.ink[0], t0 = o.t;
  const shp = (d, name, ww = w, tone, parent) => S.draw(d, t0 ?? S.start, 0, { fill: tone === undefined ? DS.vol(name) : DS.c(name, tone), c: INKC, w: ww, parent: parent || g });
  const X = (v) => cx + v * k, Y = (v) => gy + v * k;
  // legs + shoes
  S.draw(`M${X(-20)} ${Y(-62)} L${X(-22)} ${Y(-8)} M${X(20)} ${Y(-62)} L${X(22)} ${Y(-8)}`, t0 ?? S.start, 0, { c: INKC, w: w * 1.1, parent: g });
  shp(circ(X(-27), Y(-5), 17 * k, 8 * k), "ink", wd, 1); shp(circ(X(27), Y(-5), 17 * k, 8 * k), "ink", wd, 1);
  // cardigan + blouse + buttons
  shp(`M${X(-42)} ${Y(-140)} Q${X(0)} ${Y(-152)} ${X(42)} ${Y(-140)} L${X(54)} ${Y(-58)} Q${X(0)} ${Y(-48)} ${X(-54)} ${Y(-58)} Z`, "green");
  shp(`M${X(-14)} ${Y(-146)} L${X(0)} ${Y(-96)} L${X(14)} ${Y(-146)} Z`, "paper", wd, 1);
  [[-26, -112], [-28, -92], [-30, -72]].forEach(([dx, dy]) => shp(circ(X(dx), Y(dy), 4.5 * k), "gold", wd, 0));
  // hair bun + pencil, then the brain
  shp(circ(X(-34), Y(-268), 26 * k), "brown", wd);
  S.draw(`M${X(-74)} ${Y(-296)} L${X(-2)} ${Y(-262)}`, t0 ?? S.start, 0, { c: DS.c("yellow", 0), w: w * 1.5, parent: g });
  S.draw(`M${X(-74)} ${Y(-296)} L${X(-80)} ${Y(-299)}`, t0 ?? S.start, 0, { c: DS.c("pink", 0), w: w * 1.5, parent: g });
  const pts = []; for (let i = 0; i <= 26; i++) { const a = (i / 24) * Math.PI * 2, r = 1 + 0.055 * Math.cos(12 * a); pts.push([X(Math.cos(a) * 80 * r), Y(-200 + Math.sin(a) * 58 * r)]); }
  shp(smooth(pts), "pink");
  [[[0, -256], [6, -232], [-6, -212], [4, -190], [-2, -168]], [[-66, -214], [-48, -228], [-34, -210], [-20, -224]], [[66, -214], [48, -228], [34, -210], [20, -224]], [[-62, -176], [-46, -164], [-34, -178]], [[62, -176], [46, -164], [34, -178]]]
    .forEach((p) => S.draw(smooth(p.map(([a, b]) => [X(a), Y(b)])), t0 ?? S.start, 0, { c: DS.c("pink", 2), w: wd, parent: g }));
  // glasses
  [-30, 30].forEach((dx) => shp(circ(X(dx), Y(-198), 21 * k), "glass", w * 0.8, 1));
  S.draw(`M${X(-9)} ${Y(-202)} Q${X(0)} ${Y(-208)} ${X(9)} ${Y(-202)} M${X(-51)} ${Y(-200)} L${X(-74)} ${Y(-206)} M${X(51)} ${Y(-200)} L${X(74)} ${Y(-206)}`, t0 ?? S.start, 0, { c: INKC, w: w * 0.8, parent: g });
  // faces
  const F = {};
  const face = (name, build) => { const fg = S.grp(g); build(fg); fg.setAttribute("opacity", 0); F[name] = fg; };
  const eyes = (fg, dy = 0, rr = 4.5) => [-30, 30].forEach((dx) => S.draw(circ(X(dx), Y(-198 + dy), rr * k), t0 ?? S.start, 0, { fill: INKC, c: INKC, w: DS.w.hair, parent: fg }));
  const brow = (fg, a, b, sd) => S.draw(`M${X(sd * 30 + a[0])} ${Y(a[1])} L${X(sd * 30 + b[0])} ${Y(b[1])}`, t0 ?? S.start, 0, { c: INKC, w: w * 0.7, parent: fg });
  const mouth = (fg, d) => S.draw(d, t0 ?? S.start, 0, { c: INKC, w: w * 0.7, parent: fg });
  face("tired", (fg) => { // heavy lids: the top half of each lens is lid
    [-30, 30].forEach((dx) => { S.draw(`M${X(dx - 19)} ${Y(-198)} A${19 * k} ${19 * k} 0 0 1 ${X(dx + 19)} ${Y(-198)} Z`, t0 ?? S.start, 0, { fill: DS.c("pink", 1), c: INKC, w: wd, parent: fg }); });
    eyes(fg, 7, 4); mouth(fg, `M${X(-9)} ${Y(-163)} Q${X(0)} ${Y(-160)} ${X(9)} ${Y(-165)}`);
  });
  face("stern", (fg) => { eyes(fg, 1); brow(fg, [-18, -228], [14, -220], -1); brow(fg, [18, -228], [-14, -220], 1); mouth(fg, `M${X(-10)} ${Y(-164)} L${X(10)} ${Y(-164)}`); });
  face("worried", (fg) => { eyes(fg, 1); brow(fg, [-16, -218], [14, -230], -1); brow(fg, [16, -218], [-14, -230], 1); mouth(fg, `M${X(-10)} ${Y(-162)} Q${X(-4)} ${Y(-168)} ${X(2)} ${Y(-162)} Q${X(7)} ${Y(-157)} ${X(11)} ${Y(-163)}`); });
  face("smile", (fg) => { eyes(fg, 1); mouth(fg, `M${X(-11)} ${Y(-168)} Q${X(0)} ${Y(-155)} ${X(11)} ${Y(-168)}`); });
  face("shh", (fg) => { eyes(fg, 2, 4); brow(fg, [-18, -226], [14, -221], -1); brow(fg, [18, -226], [-14, -221], 1); S.draw(circ(X(0), Y(-163), 4.5 * k), t0 ?? S.start, 0, { c: INKC, w: w * 0.6, parent: fg }); });
  let curF = o.face || "tired"; F[curF].setAttribute("opacity", 1);
  // arms
  const arms = { R: {}, L: {} }, hand = (fg, x, y, r = 8) => shp(circ(X(x), Y(y), r * k), "pink", wd, 1, fg);
  const arm = (side, name, pts, hnd) => { const fg = S.grp(g); S.draw(smooth(pts.map(([a, b]) => [X(a), Y(b)])), t0 ?? S.start, 0, { c: INKC, w: w * 1.1, parent: fg }); if (hnd) hnd(fg); fg.setAttribute("opacity", 0); arms[side][name] = fg; };
  arm("R", "down", [[46, -130], [66, -100], [62, -70]], (fg) => hand(fg, 62, -66));
  arm("R", "shush", [[46, -128], [80, -118], [40, -150], [8, -166]], (fg) => { hand(fg, 8, -164, 7); shp(rrect(X(2), Y(-196), 11 * k, 40 * k, 5 * k), "pink", wd, 1, fg); });
  arm("R", "point", [[46, -128], [90, -134], [128, -134]], (fg) => { hand(fg, 128, -134, 9); shp(rrect(X(130), Y(-139), 30 * k, 10 * k, 5 * k), "pink", wd, 1, fg); });
  arm("R", "stop", [[46, -128], [84, -150], [92, -190]], (fg) => hand(fg, 92, -196, 15));
  arm("L", "down", [[-46, -130], [-66, -100], [-62, -70]], (fg) => hand(fg, -62, -66));
  arm("L", "hip", [[-46, -130], [-84, -108], [-54, -88]], (fg) => hand(fg, -54, -88, 7));
  arm("L", "up", [[-46, -130], [-86, -140], [-62, -176]], (fg) => hand(fg, -62, -178, 9));
  const cur = { R: o.armR || "down", L: o.armL || "down" }; arms.R[cur.R].setAttribute("opacity", 1); arms.L[cur.L].setAttribute("opacity", 1);
  // mouth flaps (open mouth over the face's closed mouth)
  const mk = (rx, ry, dy) => el("path", { d: circ(X(0), Y(-163 + dy), rx * k, ry * k), fill: MOUTHC, stroke: INKC, "stroke-width": wd, opacity: 0 }, g);
  const B = { g, cx, gy, k };
  B.talk = (a, b) => flaps(mk(6, 3.5, 0), mk(7, 8, 2), a, b);
  B.face = (t, name) => { tl.set(F[curF], { opacity: 0 }, t); tl.set(F[name], { opacity: 1 }, t); curF = name; return B; };
  B.arm = (t, side, name) => { tl.set(arms[side][cur[side]], { opacity: 0 }, t); tl.set(arms[side][name], { opacity: 1 }, t); cur[side] = name; return B; };
  // pop up from (dx, dy) away, small and transparent
  B.enter = (t, dx = 0, dy = 80, dur = 0.5, s0 = 0.5) => { const tf = (a, b, s) => `translate(${a} ${b}) translate(${cx} ${gy}) scale(${s}) translate(${-cx} ${-gy})`; tl.fromTo(g, { attr: { transform: tf(dx, dy, s0) }, opacity: 0 }, { attr: { transform: tf(0, 0, 1) }, opacity: 1, duration: dur, ease: "back.out(1.5)", immediateRender: true }, t); return B; };
  B.shift = (t, dur, dx, dy, s1 = 1) => { tl.to(g, { attr: { transform: `translate(${dx} ${dy}) translate(${cx} ${gy}) scale(${s1}) translate(${-cx} ${-gy})` }, duration: dur, ease: "power2.inOut" }, t); return B; };
  B.top = [cx, Y(-290)]; B.mouthAt = [cx, Y(-163)]; B.head = [cx, Y(-200)];
  return B;
};

// ===================== Episode 40 set pieces =====================
const LAV = DS.mix(DS.P.purple[1], DS.P.gray[1], 0.45); // a tired visitor (adenosine)
const CANC = DS.mix(DS.P.sky[2], DS.P.green[1], 0.45); // the plain teal can: blank band, no brand
const IK = DS.P.ink[0];
const WHITE = DS.P.white[0];
const rot = (g, deg, x, y) => g.setAttribute("transform", `rotate(${deg} ${x} ${y})`);
const pulse = (g, cx, cy, t0, t1, k = 1.07) => { // slow heartbeat: a gentle 1 s size change, never a flash
  const tf = (s) => `translate(${cx} ${cy}) scale(${s}) translate(${-cx} ${-cy})`;
  for (let t = t0; t < t1 - 0.5; t += 1.0) tl.fromTo(g, { attr: { transform: tf(1) } }, { attr: { transform: tf(k) }, duration: 0.5, ease: "sine.inOut", yoyo: true, repeat: 1, immediateRender: false }, t);
};

// ---------- the plain can (base centre x, gy; 54 x 112 at k = 1). o.words = lettering on the band; o.open; o.dull (empty) ----------
const can = (S, x, gy, k = 1, o = {}) => {
  const g = S.grp(o.parent), w = 54 * k, h = 112 * k, t = o.t ?? S.start, lw = k >= 1.6 ? DS.w.near : k >= 0.8 ? DS.w.mid : DS.w.detail;
  const bandH = (o.words ? 0.42 : 0.3) * h, bandY = gy - h * 0.68;
  S.draw(rrect(x - w / 2, gy - h, w, h, DS.r.xs * k), t, 0, { fill: DS.volHex(o.dull ? DS.c("gray", 1) : CANC), c: IK, w: lw, parent: g });
  S.draw(rect(x - w / 2, bandY, w, bandH), t, 0, { fill: WHITE, c: IK, w: DS.w.hair, parent: g });
  if (o.lo) return g; // far cans in the big grid: body + band only (keeps the page light)
  S.draw(circ(x, gy - h + 1.5 * k, w / 2, 5 * k), t, 0, { fill: DS.c("gray", 1), c: IK, w: DS.w.hair, parent: g });
  if (o.open) S.draw(circ(x, gy - h + 1.5 * k, w * 0.36, 3.2 * k), t, 0, { fill: DS.P.ink[1], c: IK, w: DS.w.hair, parent: g });
  else S.draw(circ(x + w * 0.1, gy - h + 1 * k, w * 0.14, 2.6 * k), t, 0, { fill: DS.c("gray", 2), c: IK, w: DS.w.hair, parent: g });
  if (o.words) { const sz = DS.type.caption, sp = sz * 1.1, n = o.words.length; o.words.forEach((s, i) => S.text(s, x, bandY + (bandH - (n - 1) * sp) / 2 + i * sp + sz * 0.36, { size: sz, c: IK, t: o.tw ?? T0(S), parent: g })); }
  else { // the tiny red-striped warning label
    S.draw(line([x - w * 0.34, bandY + bandH * 0.3], [x + w * 0.34, bandY + bandH * 0.3], 0), t, 0, { c: DS.c("red"), w: k >= 0.8 ? DS.w.detail : DS.w.hair, parent: g });
    S.draw(line([x - w * 0.34, bandY + bandH * 0.7], [x + w * 0.2, bandY + bandH * 0.7], 0), t, 0, { c: DS.c("gray", 1), w: DS.w.hair, parent: g });
  }
  return g;
};
// a can lying on its side (an empty one)
const canLie = (S, x, gy, k = 1, o = {}) => {
  const g = S.grp(o.parent), w = 54 * k, h = 112 * k, lw = k >= 0.8 ? DS.w.mid : DS.w.detail, t = o.t;
  S.draw(rrect(x - h / 2, gy - w, h, w, DS.r.xs * k), t ?? S.start, 0, { fill: DS.volHex(DS.c("gray", 1)), c: IK, w: lw, parent: g });
  S.draw(rect(x - h * 0.2, gy - w, h * 0.3, w), t ?? S.start, 0, { fill: WHITE, c: IK, w: DS.w.hair, parent: g });
  S.draw(circ(x + h / 2, gy - w / 2, 5 * k, w / 2), t ?? S.start, 0, { fill: DS.c("gray", 2), c: IK, w: DS.w.hair, parent: g });
  return fadeG(S, g, t);
};
// Dave holds a can in his right hand (pose "hold" or "reach")
const holdCan = (S, F, k = 1, o = {}) => { const [hx, hy] = F.hand("R", o.pose || "hold"); return can(S, hx + (o.dx || 0), hy + 56 * k + (o.dy || 0), k, { parent: F.all, t: o.t, open: o.open }); };

// ---------- the hundred cans: ten rows of ten on the table (back row small, front row big). Returns { cans[100] (row-major groups), rows } ----------
let GRIDT = false;
const canGrid = (S, cx, o = {}) => {
  if (!o.dyn) { // static grids are one shared template + a <use> per scene (keeps the page light: ~300 shapes once, not per scene)
    if (!GRIDT) { GRIDT = true; const g0 = el("g", { id: "gridT" }, dsDefs()); canGrid(S, 0, { dyn: true, parent: g0 }); }
    const u = el("use", { href: "#gridT", transform: `translate(${cx} 0)` }, o.parent || S.g);
    return { g: u, rows: [], cans: [], gone: () => {} };
  }
  const g = S.grp(o.parent), rows = [], cans = [];
  for (let r = 0; r < 10; r++) {
    const f = r / 9, k = 0.55 + 0.35 * f, sp = 56 + 16 * f, gy = 726 + 16.5 * r, rg = S.grp(g);
    for (let c = 0; c < 10; c++) { const cg = S.grp(rg); can(S, cx + (c - 4.5) * sp, gy, k, { parent: cg, lo: r < 7 }); cans.push(cg); }
    rows.push(rg);
    if (o.t0 !== undefined) fadeG(S, rg, o.t0 + r * (o.dt ?? 0.4), 0.3);
  }
  return { g, rows, cans, gone: (i, t) => tl.set(cans[i], { opacity: 0 }, t) };
};

// ---------- Dave's kitchen ----------
const kitchen = (S, o = {}) => {
  DS.room(S, { wall: "wall", floor: "wood", window: false, back: [300, 110, 1620, 740] });
  [0, 1, 2].forEach((i) => { DS.shape(S, rrect(700 + i * 190, 150, 180, 190, DS.r.xs), "wood", { layer: "mid", tone: 1, w: "detail" }); DS.shape(S, circ(700 + i * 190 + 150, 300, 7), "gold", { layer: "mid", w: "hair" }); });
  DS.shape(S, rect(660, 560, 640, 180), "wood", { layer: "mid", tone: 2, w: "detail" });
  DS.shape(S, rect(640, 536, 680, 28), "gray", { layer: "mid", tone: 1, w: "detail" });
  const fr = o.fridge === "open";
  DS.shape(S, rrect(380, 190, 190, 550, DS.r.sm), "white", { layer: "mid", tone: 2, w: "detail", flat: true });
  if (fr) { // door swung open: bright cold inside, shelves
    DS.shape(S, rect(396, 206, 158, 518), "sky", { layer: "mid", tone: 1, w: "hair", flat: true });
    [330, 440, 550].forEach((y) => S.draw(line([396, y], [554, y], 0), S.start, 0, { c: DS.c("gray", 2, "mid"), w: DS.w.mid }));
    DS.shape(S, "M380 190 L300 215 L300 770 L380 740 Z", "white", { layer: "mid", tone: 0, w: "detail" });
  } else {
    S.draw(line([380, 400], [570, 400], 0), S.start, 0, { c: DS.c("gray", 2, "mid"), w: DS.w.detail });
    DS.shape(S, rrect(540, 250, 10, 100, DS.r.xs), "gray", { layer: "mid", tone: 2, w: "hair" });
    DS.shape(S, rrect(540, 430, 10, 140, DS.r.xs), "gray", { layer: "mid", tone: 2, w: "hair" });
  }
  if (!o.hud) DS.frame(S, 1340, 200, 220, 160, "sky");
  // table
  DS.shadow(S, 1160, 962, 1500);
  [480, 1800].forEach((x) => DS.shape(S, rect(x, 920, 36, 44), "wood", { tone: 2, w: "mid", flat: true }));
  DS.shape(S, "M460 880 H1860 V922 H460 Z", "wood", { tone: 2, w: "mid", flat: true });
  DS.shape(S, "M560 690 H1760 L1860 880 H460 Z", "wood", { tone: 1, w: "mid", dir: "v" });
};

// ---------- wall clock; o.sweep = { t, dur, hours } turns the hands ----------
const wallClock = (S, cx, cy, r, h, m, o = {}) => {
  const g = S.grp(o.parent);
  DS.shape(S, circ(cx, cy, r), "white", { w: "mid", flat: true, parent: g });
  S.draw(rays(cx, cy, r * 0.82, r * 0.94, 12, -Math.PI / 2), S.start, 0, { c: IK, w: DS.w.detail, parent: g });
  const hg = S.grp(g), mg = S.grp(g);
  S.draw(line([cx, cy], [cx, cy - r * 0.5], 0), S.start, 0, { c: IK, w: DS.w.near, parent: hg });
  S.draw(line([cx, cy], [cx, cy - r * 0.78], 0), S.start, 0, { c: IK, w: DS.w.mid, parent: mg });
  DS.shape(S, circ(cx, cy, r * 0.07), "ink", { w: "hair", flat: true, parent: g });
  const a0 = ((h % 12) + m / 60) * 30, b0 = m * 6;
  rot(hg, a0, cx, cy); rot(mg, b0, cx, cy);
  if (o.sweep) { spin(hg, o.sweep.t, o.sweep.dur, a0, a0 + o.sweep.hours * 30, cx, cy, "none"); spin(mg, o.sweep.t, o.sweep.dur, b0, b0 + o.sweep.hours * 360, cx, cy, "none"); }
  return g;
};

// ---------- counter + sticky notes (the runner) ----------
const counter = (S, x, y, a, b, t, o = {}) => { // x, y = top-left of a dark panel 300 x 170
  const g = S.grp(o.parent);
  DS.drop(S, rrect(x + 6, y + 10, 300, 170, DS.r.md), { parent: g });
  DS.shape(S, rrect(x, y, 300, 170, DS.r.md), "navy", { w: "mid", flat: true, parent: g });
  wtxt(S, "CANS", x + 150, y + 56, { size: DS.type.caption, parent: g });
  countUp(S, x + 150, y + 140, a, b, t ?? S.start, o.dur || 0.6, { size: DS.type.title, c: DS.c("gold", 1), parent: g, t0: T0(S) });
  return g;
};
const NOTES = { limit: ["CAFFEINE", "LIMIT"], heart: ["HEART"], sleep: ["SLEEP"], sugar: ["SUGAR"], water: ["WATER"], q: ["?"] };
const sticky = (S, cx, cy, words, o = {}) => { // yellow note 230 x 120, slapped on at o.t
  const g = S.grp(o.parent), w = 230 * (o.k || 1), h = 120 * (o.k || 1), r = o.rot ?? -3, tf = (k) => `translate(${cx} ${cy}) rotate(${r}) scale(${k}) translate(${-cx} ${-cy})`;
  DS.drop(S, rect(cx - w / 2 + 6, cy - h / 2 + 8, w, h), { parent: g });
  S.draw(rect(cx - w / 2, cy - h / 2, w, h), S.start, 0, { fill: DS.c("yellow", 1), c: DS.c("gold", 2), w: DS.w.detail, parent: g });
  words.forEach((s, i) => S.text(s, cx, cy + 15 * (o.k || 1) + (i - (words.length - 1) / 2) * 46, { size: o.size || DS.type.caption, c: IK, t: T0(S), parent: g }));
  if (o.t !== undefined && o.t > S.start + 0.05) tl.fromTo(g, { opacity: 0, attr: { transform: tf(1.4) } }, { opacity: 1, attr: { transform: tf(1) }, duration: 0.28, ease: "power3.in", immediateRender: true }, o.t);
  else g.setAttribute("transform", tf(1));
  return g;
};
const NOTE_AT = [[1450, 360, -4], [1690, 372, 3], [1462, 500, 2], [1696, 512, -3], [1576, 630, -1]];
// the kitchen-wall board: counter on top, up to five notes below. o.cans = [from, to, t]; o.notes = n showing; o.at = [land time of each note] (missing = already there); o.q = every note reads "?"
const hud = (S, o = {}) => {
  const g = S.grp(), n = o.notes || 0, keys = ["limit", "heart", "sleep", "sugar", "water"];
  DS.shape(S, rrect(1330, 70, 480, 630, DS.r.md), "earth", { w: "mid", flat: true, parent: g });
  if (o.cans) counter(S, 1420, 96, o.cans[0], o.cans[1], o.cans[2], { parent: g, dur: o.dur });
  for (let i = 0; i < n; i++) { const [x, y, r] = NOTE_AT[i]; sticky(S, x, y, NOTES[o.q ? "q" : keys[i]], { rot: r, parent: g, t: o.at && o.at[i] }); }
  return g;
};

// ---------- paper Dave: the same Dave as a cutout on a folded paper base, with a dashed cut line round him ----------
const paperDave = (S, x, gy, layer = "near", o = {}) => {
  const F = dave(S, x, gy, layer, o), k = F.s, top = F.hd[1] - F.r * 1.45, hw = 135 * k, px = S.grp(F.all);
  dash(S.draw(rrect(x - hw, top, hw * 2, gy + 16 * k - top, DS.r.md), S.start, 0, { c: DS.c("gray", 2), w: DS.w.mid, parent: px }), 16, 12);
  DS.shape(S, `M${x - 74 * k} ${gy + 2} L${x + 74 * k} ${gy + 2} L${x + 54 * k} ${gy + 24 * k} L${x - 54 * k} ${gy + 24 * k} Z`, "paper", { w: "detail", flat: true, parent: px });
  if (o.tp !== undefined) fadeG(S, px, o.tp, 0.5);
  if (o.tOut !== undefined) tl.to(px, { opacity: 0, duration: 0.6 }, o.tOut);
  F.px = px;
  return F;
};
const DOC = { s: 1.1, hair: "side", hairC: DS.c("ink", 1), outfitC: DS.c("white", 2), tieC: "navy", specs: true };
const doc = (S, x, gy, layer = "near", o = {}) => who(S, x, gy, layer, Object.assign({}, DOC, o));
const YOUNG = [{ hair: "curly", hairC: DS.c("brown", 2), outfitC: DS.c("orange") }, { hair: "short", hairC: DS.c("ink"), outfitC: DS.c("green") }, { hair: "bun", hairC: DS.c("earth", 2), outfitC: DS.c("purple") }];

// ---------- the library's visitors: tired adenosine (lavender, heavy lids) and caffeine look-alikes (orange, wide-eyed) ----------
const visitor = (S, x, gy, k = 1, o = {}) => {
  const g = S.grp(o.parent), caf = o.kind === "caf", h = (o.sit ? 96 : 128) * k, bw = 38 * k, lw = Math.max(DS.w.detail, DS.w.mid * Math.sqrt(k)), tt = o.t ?? S.start;
  const col = caf ? DS.P.orange[1] : LAV, ey = gy - h * 0.66, ex = 15 * k;
  if (!o.sit) [-1, 1].forEach((s) => S.draw(circ(x + s * bw * 0.45, gy - 3 * k, 15 * k, 6 * k), tt, 0, { fill: DS.volHex(col), c: IK, w: DS.w.detail, parent: g }));
  S.draw(`M${x - bw} ${gy} V${gy - h * 0.62} Q${x - bw} ${gy - h} ${x} ${gy - h} Q${x + bw} ${gy - h} ${x + bw} ${gy - h * 0.62} V${gy} Z`, tt, 0, { fill: DS.volHex(col), c: IK, w: lw, parent: g });
  [-1, 1].forEach((s) => {
    const cx = x + s * ex, r = 10 * k;
    S.draw(circ(cx, ey, r), tt, 0, { fill: WHITE, c: IK, w: DS.w.hair, parent: g });
    S.draw(circ(cx + (caf ? 0 : s * 0.5 * k), ey + (caf ? 0 : 3.5 * k), (caf ? 4.8 : 4) * k), tt, 0, { fill: IK, c: IK, w: DS.w.hair, parent: g });
    if (!caf) { S.draw(`M${cx - r} ${ey} A${r} ${r} 0 0 1 ${cx + r} ${ey} Z`, tt, 0, { fill: DS.volHex(col), c: IK, w: DS.w.hair, parent: g }); S.draw(`M${cx - r * 0.8} ${ey + r * 1.25} Q${cx} ${ey + r * 1.55} ${cx + r * 0.8} ${ey + r * 1.25}`, tt, 0, { c: DS.c("purple", 2), w: DS.w.hair, parent: g }); }
  });
  S.draw(caf ? `M${x - 12 * k} ${ey + 22 * k} Q${x} ${ey + 36 * k} ${x + 12 * k} ${ey + 22 * k}` : line([x - 8 * k, ey + 28 * k], [x + 8 * k, ey + 27 * k], 0), tt, 0, { c: IK, w: DS.w.detail, parent: g });
  return { g, x, gy, k, top: gy - h };
};
const chair = (S, x, gy, k = 1, o = {}) => { // wooden library chair, front on. seatY = where a seated visitor's base goes
  const g = S.grp(o.parent), sy = gy - 56 * k, t = o.t ?? S.start;
  S.draw(rrect(x - 46 * k, sy - 98 * k, 92 * k, 104 * k, DS.r.sm * k), t, 0, { fill: DS.vol("wood", "mid"), c: IK, w: DS.w.mid, parent: g });
  [-1, 1].forEach((s) => S.draw(line([x + s * 44 * k, sy + 14 * k], [x + s * 48 * k, gy], 0), t, 0, { c: IK, w: DS.w.near, parent: g }));
  S.draw(rrect(x - 54 * k, sy, 108 * k, 18 * k, DS.r.xs), t, 0, { fill: DS.vol("wood", "mid"), c: IK, w: DS.w.mid, parent: g });
  return { g, seatY: sy + 2 * k, x, k };
};
const shelves = (S, x0, y0, x1, y1, rows = 4, P) => {
  DS.shape(S, rect(x0, y0, x1 - x0, y1 - y0), "wood", { layer: "mid", tone: 2, w: "detail", flat: true, parent: P });
  const rh = (y1 - y0) / rows, COL = ["red", "blue", "green", "orange", "purple", "gold", "navy", "pink"];
  for (let r = 0; r < rows; r++) {
    let x = x0 + 8, i = r * 5 + x0;
    while (x < x1 - 26) { const bw = 24 + ((i * 7) % 4) * 6, bh = rh * (0.5 + ((i * 3) % 4) * 0.12); S.fill(rect(x, y0 + (r + 1) * rh - 8 - bh, bw, bh), S.start, 0, DS.c(COL[(i * 5) % 8], i % 3, "mid"), 1, P); x += bw + 2; i++; }
    S.draw(line([x0, y0 + (r + 1) * rh - 6], [x1, y0 + (r + 1) * rh - 6], 0), S.start, 0, { c: DS.c("wood", 2, "mid"), w: DS.w.mid, parent: P });
  }
};
const el0 = (id) => document.getElementById(id);
const libraryRoom = (S, o = {}) => {
  DS.room(S, { wall: "earth", floor: "wood", window: false, back: [300, 110, 1620, 740] });
  if (!el0("shelvesT")) { const P = el("g", { id: "shelvesT" }, dsDefs()); shelves(S, 340, 140, 720, 700, 4, P); shelves(S, 780, 140, 1160, 700, 4, P); shelves(S, 1220, 140, 1580, 700, 4, P); }
  el("use", { href: "#shelvesT" }, S.g);
};
const deskLib = (S, x, top, w, o = {}) => {
  DS.shadow(S, x + w / 2, top + 150, w + 60);
  DS.shape(S, rect(x + 20, top + 24, w - 40, 126), "wood", { tone: 2, w: "mid", flat: true });
  DS.shape(S, rrect(x, top, w, 28, DS.r.xs), "wood", { tone: 1, w: "mid" });
};
// corridor: a long hall, the door at the far end; the queue stands along it
const corridorSet = (S) => {
  DS.room(S, { wall: "earth", floor: "wood", window: false, back: [800, 340, 1120, 640] });
  [[400, 180], [640, 440], [880, 700]].forEach(([y0, y1]) => { // shelf planks converging to the far door
    S.draw(line([-200, y0 + 200], [800, 340 + (y0 - 400) * 0.12 + 40], 0), S.start, 0, { c: DS.c("wood", 2, "mid"), w: DS.w.mid });
    S.draw(line([2120, y0 + 200], [1120, 340 + (y0 - 400) * 0.12 + 40], 0), S.start, 0, { c: DS.c("wood", 2, "mid"), w: DS.w.mid });
  });
  DS.shape(S, rrect(900, 420, 120, 220, DS.r.xs), "gold", { layer: "far", tone: 1, w: "detail" });
  DS.shape(S, circ(1000, 540, 6), "ink", { layer: "far", w: "hair", flat: true });
};
const QN = 14;
const QPOS = (i) => { const d = Math.min(i * 0.1, 0.98); return [640 + 300 * d, 985 - 335 * d, 1.7 - 1.25 * d]; };
// n visitors queueing in the corridor, back to front; o.t(i) = time visitor i appears (else present from the start). Returns the visitors.
const queue = (S, n, o = {}) => {
  const V = [];
  for (let i = n - 1; i >= 0; i--) { const [x, gy, k] = QPOS(i), v = visitor(S, x, gy, k, { kind: "ado" }); V[i] = v; if (o.t && o.t(i) !== undefined) fadeG(S, v.g, o.t(i), 0.4); }
  return V;
};
// tiny queue panel: n visitors in a row inside a card (the recurring "where is the queue now" inset)
const queuePanel = (S, x, y, n, o = {}) => {
  const g = S.grp(o.parent), w = 380, h = 190;
  DS.drop(S, rrect(x + 6, y + 8, w, h, DS.r.md), { parent: g });
  DS.shape(S, rrect(x, y, w, h, DS.r.md), "earth", { w: "mid", tone: 1, flat: true, parent: g });
  for (let i = 0; i < n; i++) visitor(S, x + 40 + i * (w - 80) / Math.max(1, n - 1 < 7 ? 7 : n - 1), y + h - 22, 0.55, { kind: "ado", parent: g, t: o.t });
  S.text("THE QUEUE", x + w / 2, y + 50, { size: DS.type.caption, c: IK, t: T0(S), parent: g });
  return fadeG(S, g, o.t);
};

// ---------- Dave's bedroom at night; Dave sits on the mattress (gy = 790) ----------
const bedroom = (S, o = {}) => {
  DS.room(S, { wall: "night", floor: "navy", window: false, back: [300, 110, 1620, 740] });
  DS.shape(S, rect(1280, 170, 280, 320), "white", { layer: "mid", tone: 1, w: "mid", flat: true });
  DS.shape(S, rect(1296, 186, 248, 288), "navy", { layer: "mid", tone: 0, w: "hair", flat: true });
  S.fill(circ(1450, 280, 38), S.start, 0, DS.c("gold", 1), 1);
  [[1340, 250], [1380, 360], [1500, 400], [1330, 420]].forEach(([x, y]) => S.fill(circ(x, y, 4), S.start, 0, WHITE, 1));
  S.draw(`M1420 186 V474 M1296 330 H1544`, S.start, 0, { c: DS.c("white", 2), w: DS.w.mid });
  wallClock(S, 900, 300, 90, 3, 0);
  // nightstand
  DS.shape(S, rect(1180, 770, 130, 120), "wood", { tone: 2, w: "mid", flat: true }); DS.shape(S, rrect(1170, 750, 150, 28, DS.r.xs), "wood", { w: "mid" });
  // bed: headboard, mattress, pillow
  DS.shadow(S, 760, 902, 880);
  DS.shape(S, rrect(360, 560, 36, 330, DS.r.xs), "wood", { tone: 2, w: "mid" });
  DS.shape(S, rect(396, 836, 760, 54), "wood", { tone: 2, w: "mid", flat: true });
  DS.shape(S, rrect(396, 790, 760, 54, DS.r.md), "white", { tone: 2, w: "mid", flat: true });
  DS.shape(S, smooth([[404, 790], [412, 744], [500, 738], [540, 790]]) + " Z", "white", { tone: 0, w: "mid", flat: true });
};
const blanket = (S, o = {}) => DS.shape(S, "M640 800 Q780 744 900 770 Q1040 744 1156 790 V882 H640 Z", "blue", { tone: 1, w: "mid", parent: o.parent });

// ---------- sugar, water, measures ----------
const jar = (S, cx, base, w, h, o = {}) => { // glass jar; o.level (0..1) of sugar, rising from o.t; o.mark = fraction for a red limit line
  const g = S.grp(o.parent), x0 = cx - w / 2;
  if (o.level) { const f = S.grp(g); S.fill(rect(x0 + 8, base - h * o.level, w - 16, h * o.level - 8), S.start, 0, DS.c("white", 2), 1, f); if (o.t !== undefined) scaleY(f, o.t, cx, base - 8, 0.9, 0.02, 1); }
  S.draw(rrect(x0, base - h, w, h, DS.r.md), S.start, 0, { fill: o.level ? "none" : DS.c("glass", 1), c: IK, w: DS.w.mid, parent: g });
  DS.shape(S, rrect(x0 - 8, base - h - 30, w + 16, 34, DS.r.xs), "gray", { tone: 1, w: "detail", parent: g });
  if (o.mark) S.draw(line([x0 - 50, base - h * o.mark], [x0 + w + 50, base - h * o.mark], 0), S.start, 0, { c: DS.c("red"), w: DS.w.near, parent: g });
  return g;
};
const jug = (S, cx, base, w, h, o = {}) => { // measuring jug; o.fill colour name; o.level 0..1 rising from o.t over o.dur; o.marks = [[fraction, label]]
  const g = S.grp(o.parent), x0 = cx - w / 2;
  if (o.level) { const f = S.grp(g); S.fill(rect(x0 + 8, base - h * o.level, w - 16, h * o.level - 6), S.start, 0, DS.c(o.fill || "sky", 2), 0.92, f); if (o.t !== undefined) scaleY(f, o.t, cx, base - 6, o.dur || 1, 0.02, 1); }
  S.draw(`M${x0} ${base - h} L${x0 + 8} ${base} H${x0 + w - 8} L${x0 + w} ${base - h}`, S.start, 0, { c: IK, w: DS.w.mid, parent: g });
  S.draw(`M${x0 + w} ${base - h * 0.82} q${w * 0.32} 0 ${w * 0.32} ${h * 0.26} q0 ${h * 0.2} ${-w * 0.28} ${h * 0.2}`, S.start, 0, { c: IK, w: DS.w.mid, parent: g });
  (o.marks || []).forEach(([f]) => S.draw(line([x0 + 4, base - h * f], [x0 + w * 0.32, base - h * f], 0), S.start, 0, { c: IK, w: DS.w.detail, parent: g }));
  return g;
};
const tsp = (S, x, y, k, o = {}) => { // teaspoon with a white heap; (x, y) = bowl centre
  const g = S.grp(o.parent);
  S.draw(line([x + 26 * k, y], [x + 104 * k, y - 12 * k], 0), S.start, 0, { c: DS.c("gray", 2), w: DS.w.near, parent: g });
  DS.shape(S, circ(x, y, 30 * k, 17 * k), "gray", { tone: 1, w: "mid", parent: g });
  S.draw(`M${x - 25 * k} ${y - 2 * k} Q${x} ${y - 38 * k} ${x + 25 * k} ${y - 2 * k} Z`, S.start, 0, { fill: WHITE, c: IK, w: DS.w.detail, parent: g });
  return fadeG(S, g, o.t);
};
const cube = (S, x, y, k, o = {}) => { // sugar cube
  const g = S.grp(o.parent);
  DS.shape(S, rrect(x - 26 * k, y - 26 * k, 52 * k, 52 * k, DS.r.xs), "white", { w: "mid", tone: 2, parent: g });
  [[-10, -8], [8, 6], [-4, 12], [12, -12]].forEach(([a, b]) => S.fill(circ(x + a * k, y + b * k, 2.2 * k), S.start, 0, DS.c("gray", 1), 1, g));
  return fadeG(S, g, o.t);
};
const dropP = (S, cx, cy, k = 1, o = {}) => DS.shape(S, `M${cx} ${cy - 30 * k} C${cx + 6 * k} ${cy - 14 * k} ${cx + 20 * k} ${cy - 2 * k} ${cx + 20 * k} ${cy + 12 * k} A${20 * k} ${20 * k} 0 0 1 ${cx - 20 * k} ${cy + 12 * k} C${cx - 20 * k} ${cy - 2 * k} ${cx - 6 * k} ${cy - 14 * k} ${cx} ${cy - 30 * k} Z`, o.name || "sky", { w: o.w || "mid", parent: o.parent, t: o.t });
// a calm static flame (no flicker)
const flame = (S, cx, base, k = 1, o = {}) => {
  const g = S.grp(o.parent), fl = (s, name, tone) => DS.shape(S, `M${cx} ${base - 150 * k * s} C${cx + 40 * k * s} ${base - 90 * k * s} ${cx + 70 * k * s} ${base - 60 * k * s} ${cx + 50 * k * s} ${base - 20 * k * s} Q${cx} ${base + 14 * k * s} ${cx - 50 * k * s} ${base - 20 * k * s} C${cx - 70 * k * s} ${base - 60 * k * s} ${cx - 30 * k * s} ${base - 90 * k * s} ${cx} ${base - 150 * k * s} Z`, name, { tone, w: s === 1 ? "mid" : "hair", flat: true, parent: g });
  fl(1, "orange", 0); fl(0.62, "yellow", 0);
  return fadeG(S, g, o.t);
};
const wrapper = (S, x, y, k, name, o = {}) => { // crumpled sweet wrapper: twisted ends, striped middle
  const g = S.grp(o.parent);
  DS.shape(S, `M${x - 28 * k} ${y} L${x - 56 * k} ${y - 20 * k} L${x - 50 * k} ${y} L${x - 56 * k} ${y + 20 * k} Z M${x + 28 * k} ${y} L${x + 56 * k} ${y - 20 * k} L${x + 50 * k} ${y} L${x + 56 * k} ${y + 20 * k} Z`, name, { tone: 1, w: "detail", flat: true, parent: g });
  DS.shape(S, rrect(x - 30 * k, y - 22 * k, 60 * k, 44 * k, DS.r.sm * k), name, { w: "detail", parent: g });
  S.draw(`M${x - 14 * k} ${y - 20 * k} L${x - 4 * k} ${y + 20 * k} M${x + 6 * k} ${y - 20 * k} L${x + 16 * k} ${y + 20 * k}`, S.start, 0, { c: WHITE, w: DS.w.detail, parent: g });
  return fadeG(S, g, o.t);
};

// ---------- gauge: a bar scale 0..500 mg with a green "fine" zone up to o.limit; fill(level, t) grows Dave's level ----------
const gauge = (S, x, y, h, o = {}) => {
  const wd = 130, yOf = (v) => y + h - (v / 500) * h, g = S.grp(o.parent);
  DS.drop(S, rrect(x + 6, y + 8, wd, h, DS.r.sm), { parent: g });
  DS.shape(S, rrect(x, y, wd, h, DS.r.sm), "white", { w: "mid", flat: true, parent: g });
  if (o.limit) { const z = S.grp(g); S.fill(rect(x + 5, yOf(o.limit), wd - 10, y + h - 5 - yOf(o.limit)), S.start, 0, DS.c("green", 1), 0.6, z); fadeG(S, z, o.zoneT); S.draw(line([x - 36, yOf(o.limit)], [x + wd + 36, yOf(o.limit)], 0), o.zoneT ?? S.start, 0, { c: DS.c("green", 2), w: DS.w.near, parent: g }); }
  [0, 100, 200, 300, 400, 500].forEach((v) => { S.draw(line([x + wd - 18, yOf(v)], [x + wd, yOf(v)], 0), S.start, 0, { c: IK, w: DS.w.detail, parent: g }); });
  const fill = (level, t, dur = 1.0, name = "orange") => { const f = S.grp(g); S.fill(rect(x + 5, yOf(level), wd - 10, y + h - 5 - yOf(level)), S.start, 0, DS.c(name, 0), 1, f); scaleY(f, t, x, y + h - 5, dur, 0.02, 1); return f; };
  return { g, yOf, fill, x, wd };
};

// ---------- body and brain bits ----------
const brainBlob = (S, cx, cy, k = 1, o = {}) => {
  const g = S.grp(o.parent), pts = [];
  for (let i = 0; i <= 26; i++) { const a = (i / 24) * Math.PI * 2, r = 1 + 0.055 * Math.cos(12 * a); pts.push([cx + Math.cos(a) * 80 * k * r, cy + Math.sin(a) * 58 * k * r]); }
  S.draw(smooth(pts), o.t ?? S.start, 0, { fill: DS.vol("pink"), c: IK, w: DS.w.mid, parent: g });
  [[[0, -52], [6, -28], [-6, -8], [4, 14], [-2, 36]], [[-66, -10], [-48, -24], [-34, -6], [-20, -20]], [[66, -10], [48, -24], [34, -6], [20, -20]], [[-60, 26], [-44, 38], [-30, 24]], [[60, 26], [44, 38], [30, 24]]]
    .forEach((p) => S.draw(smooth(p.map(([a, b]) => [cx + a * k, cy + b * k])), o.t ?? S.start, 0, { c: DS.c("pink", 2), w: DS.w.detail, parent: g }));
  return g;
};
const kidney = (S, cx, cy, k = 1, o = {}) => {
  const g = S.grp(o.parent), pts = [];
  for (let i = 0; i <= 28; i++) { const a = (i / 28) * Math.PI * 2; let x = 62 * Math.cos(a), y = 88 * Math.sin(a); if (x < 0) x += 38 * Math.exp(-(y * y) / (2 * 30 * 30)); pts.push([cx + x * k, cy + y * k]); }
  S.draw(smooth(pts), o.t ?? S.start, 0, { fill: DS.volHex(DS.mix(DS.P.red[2], DS.P.brown[1], 0.5)), c: IK, w: DS.w.mid, parent: g });
  S.draw(line([cx - 20 * k, cy - 10 * k], [cx - 50 * k, cy - 20 * k], 1) + line([cx - 20 * k, cy + 10 * k], [cx - 50 * k, cy + 22 * k], 1), o.t ?? S.start, 0, { c: DS.c("red", 2), w: DS.w.mid, parent: g });
  return g;
};
const heartI = (S, cx, cy, s, o = {}) => { const g = S.grp(o.parent); DS.shape(S, heartPath(cx, cy, s), "red", { w: o.w || "mid", parent: g }); return g; };
// ECG strip on a white card at (x, y) of width w; n beats; amp in px
const ecg = (S, x, y, w, n, amp, o = {}) => {
  const bw = w / n, pts = [];
  for (let i = 0; i < n; i++) { const x0 = x + i * bw; [[0, 0], [0.2, 0], [0.26, -0.15], [0.32, 0], [0.4, 0], [0.44, 0.15], [0.5, -1], [0.56, 0.3], [0.62, 0], [0.78, -0.25], [0.9, 0], [1, 0]].forEach(([a, b]) => pts.push([x0 + a * bw, y + b * amp])); }
  return S.draw(poly(pts, 0), o.t ?? S.start, 0, { c: DS.c(o.name || "blue", 2), w: DS.w.near, parent: o.parent });
};
const hospital = (S, cx, gy, k = 1, o = {}) => {
  const g = S.grp(o.parent);
  DS.shadow(S, cx, gy, 520 * k, { parent: g });
  DS.shape(S, rect(cx - 210 * k, gy - 330 * k, 420 * k, 330 * k), "white", { w: "mid", tone: 2, flat: true, parent: g });
  DS.shape(S, rect(cx - 220 * k, gy - 350 * k, 440 * k, 30 * k), "blue", { w: "mid", tone: 1, flat: true, parent: g });
  for (let r = 0; r < 3; r++) for (let c = 0; c < 5; c++) DS.shape(S, rect(cx - 180 * k + c * 78 * k, gy - 300 * k + r * 76 * k, 50 * k, 46 * k), "sky", { w: "detail", tone: 1, flat: true, parent: g });
  DS.shape(S, rect(cx - 44 * k, gy - 112 * k, 88 * k, 112 * k), "blue", { w: "mid", tone: 1, flat: true, parent: g });
  DS.shape(S, `M${cx - 70 * k} ${gy - 118 * k} H${cx + 70 * k} L${cx + 56 * k} ${gy - 150 * k} H${cx - 56 * k} Z`, "blue", { w: "detail", parent: g });
  return fadeG(S, g, o.t);
};
// a horizontal track 0..100 cans with Dave's marker; (x0, x1, y) = 330, 1590, 700. xAt(n) gives the marker x
const TRK = { x0: 330, x1: 1590, y: 690 };
const trackOf = (S, o = {}) => {
  const { x0, x1, y } = TRK, g = S.grp(o.parent), xAt = (n) => x0 + ((x1 - x0) * n) / 100;
  DS.shape(S, rrect(x0 - 60, y - 190, x1 - x0 + 220, 360, DS.r.lg), "white", { w: "mid", flat: true, parent: g });
  S.draw(line([x0, y + 40], [x1, y + 40], 0), S.start, 0, { c: IK, w: DS.w.near, parent: g });
  for (let n = 0; n <= 100; n += 10) S.draw(line([xAt(n), y + 24], [xAt(n), y + 56], 0), S.start, 0, { c: IK, w: DS.w.detail, parent: g });
  S.draw(line([x1, y + 40], [x1, y - 130], 0), S.start, 0, { c: IK, w: DS.w.near, parent: g });
  DS.shape(S, `M${x1} ${y - 130} L${x1 + 110} ${y - 100} L${x1} ${y - 70} Z`, "red", { w: "mid", parent: g });
  txt(S, "0", x0, y + 118, { size: DS.type.body, parent: g }); txt(S, "100", x1, y + 118, { size: DS.type.body, parent: g });
  return { g, xAt };
};
// big plain label card on a can's flank / a label sheet: rows of ingredient lines. returns the y of each row
const labelSheet = (S, cx, cy, w, h, t) => {
  const g = S.grp(), x = cx - w / 2, y = cy - h / 2;
  DS.drop(S, rrect(x + 8, y + 12, w, h, DS.r.md), { parent: g });
  DS.shape(S, rrect(x, y, w, h, DS.r.md), "white", { w: "mid", flat: true, parent: g });
  txt(S, "INGREDIENTS", cx, y + 82, { size: DS.type.body, parent: g, c: DS.c("gray", 2) });
  S.draw(line([x + 40, y + 112], [x + w - 40, y + 112], 0), S.start, 0, { c: IK, w: DS.w.detail, parent: g });
  return { g, rows: [y + 200, y + 290, y + 380], x, y };
};
const armchair = (S, x, gy, k = 1, o = {}) => { // seatTop = gy - 90 * k
  const g = S.grp(o.parent), name = o.name || "green";
  DS.shadow(S, x, gy, 300 * k, { parent: g });
  DS.shape(S, rrect(x - 84 * k, gy - 250 * k, 168 * k, 220 * k, DS.r.md), name, { tone: 2, w: "mid", parent: g });
  DS.shape(S, rrect(x - 120 * k, gy - 150 * k, 44 * k, 130 * k, DS.r.sm), name, { w: "mid", parent: g });
  DS.shape(S, rrect(x + 76 * k, gy - 150 * k, 44 * k, 130 * k, DS.r.sm), name, { w: "mid", parent: g });
  DS.shape(S, rrect(x - 96 * k, gy - 96 * k, 192 * k, 62 * k, DS.r.sm), name, { tone: 1, w: "mid", parent: g });
  return { g, seatY: gy - 92 * k };
};

// ---------- small single-purpose bits ----------
const nightWindow = (S, x, y) => { // a window onto a starry sky with a moon
  DS.shape(S, rect(x, y, 280, 320), "white", { layer: "mid", tone: 1, w: "mid", flat: true });
  DS.shape(S, rect(x + 16, y + 16, 248, 288), "navy", { layer: "mid", tone: 0, w: "hair", flat: true });
  S.fill(circ(x + 190, y + 110, 38), S.start, 0, DS.c("gold", 1), 1);
  [[60, 70], [100, 200], [210, 240], [50, 250]].forEach(([a, b]) => S.fill(circ(x + a, y + b, 4), S.start, 0, WHITE, 1));
  S.draw(`M${x + 140} ${y + 16} V${y + 304} M${x + 16} ${y + 160} H${x + 264}`, S.start, 0, { c: DS.c("white", 2), w: DS.w.mid });
};
const bolt = (S, cx, cy, k, o = {}) => DS.shape(S, poly([[cx + 10 * k, cy - 44 * k], [cx - 26 * k, cy + 4 * k], [cx - 2 * k, cy + 4 * k], [cx - 12 * k, cy + 46 * k], [cx + 28 * k, cy - 8 * k], [cx + 4 * k, cy - 8 * k]], 0) + " Z", "yellow", { w: "mid", parent: o.parent });
// glide a group in from (dx, dy) away while it fades in
const slideIn = (S, g, t, dx, dy, dur = 0.9) => { fadeG(S, g, t, 0.4); shift(g, t, dur, [dx, dy], [0, 0], "power2.out"); return g; };
// fade a group out and drift it up
const drift = (S, g, t, dy = -120, dur = 1.0) => { tl.to(g, { opacity: 0, duration: dur, ease: "power1.in" }, t); shift(g, t, dur, [0, 0], [0, dy], "power1.in"); return g; };
const pencilBig = (S, x, y, len, deg, o = {}) => { // yellow pencil, tip at (x, y), pointing along deg (0 = right)
  const g = S.grp(o.parent);
  DS.shape(S, rect(x - len, y - 22, len - 54, 44), "yellow", { w: "mid", parent: g });
  DS.shape(S, `M${x - 54} ${y - 22} L${x} ${y} L${x - 54} ${y + 22} Z`, "sand", { w: "mid", parent: g });
  DS.shape(S, rect(x - len - 30, y - 22, 30, 44), "pink", { w: "mid", parent: g });
  rot(g, deg, x, y); return fadeG(S, g, o.t);
};
const mug = (S, cx, base, k, o = {}) => {
  const g = S.grp(o.parent);
  DS.shape(S, circ(cx, base, 120 * k, 18 * k), "white", { w: "mid", tone: 2, flat: true, parent: g });
  S.draw(`M${cx + 80 * k} ${base - 150 * k} q${70 * k} ${10 * k} ${50 * k} ${70 * k} q${-20 * k} ${40 * k} ${-76 * k} ${40 * k}`, S.start, 0, { c: IK, w: DS.w.near, parent: g });
  DS.shape(S, rrect(cx - 90 * k, base - 190 * k, 180 * k, 190 * k, DS.r.md), "white", { w: "near", parent: g });
  DS.shape(S, circ(cx, base - 188 * k, 90 * k, 14 * k), "brown", { w: "mid", flat: true, parent: g });
  [-34, 0, 34].forEach((dx) => S.draw(`M${cx + dx * k} ${base - 220 * k} q${14 * k} ${-26 * k} 0 ${-52 * k} q${-14 * k} ${-26 * k} 0 ${-52 * k}`, S.start, 0, { c: DS.c("gray", 1), w: DS.w.mid, parent: g }));
  return fadeG(S, g, o.t);
};
const warnTri = (S, cx, cy, k, o = {}) => { // calm amber caution triangle
  const g = S.grp(o.parent);
  DS.shape(S, `M${cx} ${cy - 90 * k} L${cx + 100 * k} ${cy + 80 * k} H${cx - 100 * k} Z`, "gold", { w: "near", parent: g });
  S.draw(line([cx, cy - 36 * k], [cx, cy + 28 * k], 0), S.start, 0, { c: IK, w: DS.w.near, parent: g }); S.fill(circ(cx, cy + 54 * k, 7 * k), S.start, 0, IK, 1, g);
  return fadeG(S, g, o.t);
};
const magnifier = (S, cx, cy, r, o = {}) => {
  const g = S.grp(o.parent);
  S.draw(line([cx + r * 0.72, cy + r * 0.72], [cx + r * 1.7, cy + r * 1.7], 0), S.start, 0, { c: DS.c("brown"), w: DS.w.near * 2, parent: g });
  S.draw(circ(cx, cy, r), S.start, 0, { fill: DS.c("glass", 1), c: IK, w: DS.w.near, parent: g, op: 1 });
  return fadeG(S, g, o.t);
};
const factory = (S, x, gy, k, o = {}) => {
  const g = S.grp(o.parent);
  DS.shadow(S, x + 200 * k, gy, 520 * k, { parent: g });
  DS.shape(S, rect(x + 300 * k, gy - 330 * k, 70 * k, 330 * k), "red", { tone: 2, w: "mid", flat: true, parent: g });
  DS.shape(S, `M${x} ${gy} V${gy - 150 * k} L${x + 100 * k} ${gy - 220 * k} V${gy - 150 * k} L${x + 200 * k} ${gy - 220 * k} V${gy - 150 * k} L${x + 300 * k} ${gy - 220 * k} V${gy} Z`, "gray", { tone: 1, w: "mid", parent: g });
  [0, 1, 2].forEach((i) => DS.shape(S, rect(x + 30 * k + i * 100 * k, gy - 110 * k, 50 * k, 44 * k), "sky", { tone: 1, w: "detail", flat: true, parent: g }));
  return fadeG(S, g, o.t);
};
const flask = (S, cx, base, k, o = {}) => {
  const g = S.grp(o.parent);
  DS.shape(S, `M${cx - 30 * k} ${base - 250 * k} H${cx + 30 * k} V${base - 150 * k} L${cx + 110 * k} ${base - 20 * k} Q${cx + 120 * k} ${base} ${cx + 90 * k} ${base} H${cx - 90 * k} Q${cx - 120 * k} ${base} ${cx - 110 * k} ${base - 20 * k} L${cx - 30 * k} ${base - 150 * k} Z`, "glass", { w: "near", flat: true, parent: g });
  S.fill(`M${cx - 66 * k} ${base - 70 * k} H${cx + 66 * k} L${cx + 104 * k} ${base - 14 * k} Q${cx + 100 * k} ${base - 6 * k} ${cx + 88 * k} ${base - 6 * k} H${cx - 88 * k} Q${cx - 100 * k} ${base - 6 * k} ${cx - 104 * k} ${base - 14 * k} Z`, S.start, 0, DS.c("green", 1), 0.9, g);
  return fadeG(S, g, o.t);
};
const megaphone = (S, cx, cy, k, o = {}) => {
  const g = S.grp(o.parent);
  DS.shape(S, `M${cx - 90 * k} ${cy - 40 * k} L${cx + 110 * k} ${cy - 110 * k} V${cy + 110 * k} L${cx - 90 * k} ${cy + 40 * k} Z`, "red", { w: "near", parent: g });
  DS.shape(S, rrect(cx - 150 * k, cy - 46 * k, 70 * k, 92 * k, DS.r.sm), "gray", { tone: 1, w: "mid", parent: g });
  DS.shape(S, rrect(cx - 130 * k, cy + 30 * k, 36 * k, 90 * k, DS.r.xs), "gray", { tone: 2, w: "mid", parent: g });
  return fadeG(S, g, o.t);
};

// ---------- timing: one picture per beat; long clips get a second picture at a mid-clause cue; each landing just after its first word ----------
const CUES = [[1, 0], [2, 0], [2, 8], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0], [10, 0], [10, 14], [11, 0], [11, 14], [12, 0],
  [13, 0], [14, 0], [14, 10], [15, 0], [16, 0], [16, 7], [17, 0], [18, 0], [19, 0], [20, 0], [21, 0],
  [22, 0], [23, 0], [23, 13], [24, 0], [24, 11], [25, 0], [26, 0], [26, 13], [27, 0], [28, 0], [29, 0], [30, 0], [31, 0], [32, 0], [33, 0], [34, 0], [35, 0],
  [36, 0], [37, 0], [37, 14], [38, 0], [39, 0], [39, 13], [40, 0], [41, 0], [41, 8], [42, 0], [43, 0], [43, 17], [44, 0], [45, 0], [46, 0], [46, 8], [47, 0], [47, 9], [48, 0], [48, 10], [49, 0], [50, 0],
  [51, 0], [52, 0], [53, 0], [54, 0], [55, 0], [55, 7], [56, 0],
  [57, 0], [58, 0], [60, 0], [61, 0], [62, 0], [63, 0], [64, 0], [65, 0], [66, 0], [66, 16], [67, 0], [67, 8], [68, 0], [69, 0], [70, 0],
  [71, 0], [72, 0], [73, 0], [74, 0], [75, 0], [76, 0], [77, 0], [78, 0], [79, 0]];
const WINS = sceneWindows(CUES, -0.25);
const sc = (c, w, o) => { const k = CUES.findIndex(([a, b]) => a === c && b === w); if (k < 0) throw new Error("no cue " + c + ":" + w); return scene(WINS[k][0], WINS[k][1], o); };
const END = (c) => CLIP(c)[1];
const ROOM = { wall: "wall", floor: "wood", window: false }, NITE = { wall: "night", floor: "navy", window: false };
const GX = 1000; // the hundred cans sit here on the kitchen table
const ENERGY = (n) => `${Math.round(n)} mg`;

// ===================== 1. A hundred cans =====================
// This is Dave. Dave has lined up a hundred cans of energy drink on his kitchen table, in ten neat rows of ten.
{ const S = sc(1, 0, { cam: "push", focus: "1000 560" }); kitchen(S);
  const F = dave(S, 300, 960, "near", { s: 1.4, look: 8, mood: "smile" });
  card(S, "DAVE", 300, 290, { t: W(1, 2) });
  canGrid(S, GX, { dyn: true, t0: W(1, 8), dt: 0.4 });
  fadeG(S, counter(S, 1480, 110, 0, 0), W(1, 12));
  card(S, "10 ROWS OF 10", GX, 560, { t: W(1, 18) });
  DS.vignette(S); }

// Dave is tired.
{ const S = sc(2, 0, { cam: "push", focus: "700 560" }); kitchen(S);
  const F = dave(S, 300, 960, "near", { s: 1.4, look: 8, mood: "tired" });
  card(S, "TIRED", 300, 290, { t: W(2, 2) });
  canGrid(S, GX);
  txt(S, "z", 430, 410, { size: DS.type.title, t: W(2, 2), c: DS.c("gray", 2) }); txt(S, "z", 480, 360, { size: DS.type.display, t: W(2, 2) + 0.4, c: DS.c("gray", 2) });
  counter(S, 1480, 110, 0, 0);
  DS.vignette(S); }

// And Dave has a theory. If one can gives you energy, then a hundred cans should give you a hundred times more.
{ const S = sc(2, 8, { cam: "push", focus: "800 460" }); kitchen(S);
  const F = dave(S, 300, 960, "near", { s: 1.4, look: 6, mood: "smile", pose: "think" });
  canGrid(S, GX); counter(S, 1480, 110, 0, 0);
  const g = S.grp(); S.thought(980, 270, 520, 210, 440, 480, S.start, 0.3, { parent: g });
  const r1 = S.grp(g); can(S, 700, 300, 1.1, { parent: r1 }); txt(S, "= 1x", 900, 290, { size: DS.type.title, parent: r1, c: DS.c("gray", 2) }); bolt(S, 1100, 250, 1.3, { parent: r1 });
  const r2 = S.grp(g), gw = S.grp(r2); canGrid(S, 700, { parent: gw }); gw.setAttribute("transform", "translate(0 -375) translate(700 800) scale(0.5) translate(-700 -800)");
  txt(S, "= 100x", 1010, 430, { size: DS.type.title, parent: r2, c: DS.c("red", 2) }); bolt(S, 1260, 395, 1.4, { parent: r2 });
  fadeG(S, g, W(2, 8), 0.4); fadeG(S, r2, W(2, 15), 0.4);
  DS.vignette(S); }

// "A hundred cans. I am never going to be tired again." (Dave)
{ const S = sc(3, 0, { cam: "push", focus: "700 560" }); kitchen(S);
  const F = dave(S, 300, 960, "near", { s: 1.4, look: 8, mood: "happy", pose: "armsUp" }); talk(S, F, W(3, 0), END(3));
  canGrid(S, GX); counter(S, 1480, 110, 0, 0);
  say(S, 1000, 300, 480, 150, F.hd[0] + 90, F.hd[1] - 20, ["A hundred cans.", "Never tired again."], W(3, 0));
  DS.vignette(S); }

// So what would happen if you drank a hundred energy drinks?
{ const S = sc(4, 0, { cam: "push", focus: "1000 560" }); kitchen(S);
  const F = dave(S, 300, 960, "near", { s: 1.4, look: 8, mood: "wow", pose: "shrug" });
  card(S, "WHAT IF?", 300, 290, { t: W(4, 1) });
  canGrid(S, GX); counter(S, 1480, 110, 0, 0);
  S.draw(rrect(780, 636, 440, 260, DS.r.md), W(4, 7), 0, { c: DS.c("red"), w: DS.w.near });
  card(S, "100 ENERGY DRINKS", GX, 540, { t: W(4, 7) });
  DS.vignette(S); }

// The honest answer comes first. Dave will never get anywhere near a hundred.
{ const S = sc(5, 0, { cam: "push", focus: "960 600" }); DS.room(S, ROOM);
  const T = trackOf(S);
  const m = mini(S, T.xAt(0), TRK.y + 40, 1.7); shift(m, W(5, 8), 1.4, [0, 0], [T.xAt(5) - T.xAt(0), 0]);
  card(S, "DAVE", T.xAt(0) + 40, 410, { t: W(5, 5), size: DS.type.small });
  xMark(S, TRK.x1 + 55, TRK.y - 100, 1.1, W(5, 7));
  card(S, "NEVER NEAR 100", 960, 190, { t: W(5, 9), tc: "red" });
  DS.vignette(S); }

// The interesting part is what stops him, and when. Every can adds a new reason, and the last one isn't the one you'd guess.
{ const S = sc(6, 0, { cam: "push", focus: "1000 460" }); kitchen(S, { hud: true });
  const F = dave(S, 300, 960, "near", { s: 1.4, look: 8, mood: "worried", pose: "think" });
  canGrid(S, GX);
  hud(S, { cans: [0, 0], notes: 5, q: true, at: [W(6, 11), W(6, 12), W(6, 14), W(6, 15), W(6, 17)] });
  S.draw(rrect(1560, 560, 240, 140, DS.r.sm), W(6, 19), 0, { c: DS.c("red"), w: DS.w.near });
  DS.vignette(S); }

// By can three, he's past what Europe's food safety experts call fine in one go.
{ const S = sc(7, 0, { cam: "push", focus: "1100 640" }); kitchen(S);
  DS.shape(S, rrect(130, 850, 870, 110, DS.r.md), "green", { layer: "mid", tone: 1, w: "detail", flat: true });
  dash(S.draw(line([1010, 640], [1010, 980], 0), S.start, 0, { c: DS.c("gray", 2), w: DS.w.mid }), 18, 14);
  const F = dave(S, 1380, 960, "near", { s: 1.4, look: -6, mood: "worried", pose: "pointL" });
  [0, 1, 2].forEach((i) => can(S, 1130 + i * 70, 960, 1.1, { t: W(7, 1) + i * 0.25 }));
  counter(S, 110, 90, 2, 3, W(7, 1));
  card(S, "FINE IN ONE GO", 560, 640, { t: W(7, 8), tc: "green" });
  card(S, "CAN 3", 1250, 290, { t: W(7, 1) });
  DS.vignette(S); }

// By can five, he has used up a whole day's worth of caffeine.
{ const S = sc(8, 0, { cam: "push", focus: "1000 600" }); kitchen(S);
  const F = dave(S, 300, 960, "near", { s: 1.4, look: 8, mood: "wow" });
  counter(S, 110, 90, 3, 5, W(8, 2), { dur: 0.7 });
  [0, 1, 2, 3, 4].forEach((i) => { const x = 650 + i * 230; DS.shape(S, rect(x, 360, 220, 64), "white", { w: "mid", flat: true }); S.fill(rect(x + 5, 365, 210, 54), W(8, 1) + i * 0.3, 0.3, DS.c("green", 0), 1); can(S, x + 110, 840, 1.8, { t: W(8, 1) + i * 0.3 }); });
  card(S, "A WHOLE DAY'S WORTH", 1250, 270, { t: W(8, 7), tc: "green" });
  DS.vignette(S); }

// And long before can one hundred, the problem isn't even the caffeine.
{ const S = sc(9, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM);
  can(S, 600, 900, 3.4, {});
  const d = S.grp(); [[900, 470], [990, 540], [900, 610], [1010, 420], [1010, 650]].forEach(([x, y]) => DS.shape(S, circ(x, y, 26), "orange", { w: "mid", parent: d })); fadeG(S, d, W(9, 8)); xMark(S, 950, 540, 2.4, W(9, 10));
  card(S, "NOT THE CAFFEINE", 950, 270, { t: W(9, 8) });
  dropP(S, 1450, 640, 6, { name: "ink", t: W(9, 5) }); S.text("?", 1450, 700, { size: DS.type.display, c: WHITE, t: W(9, 5) + 0.2 });
  DS.vignette(S); }

// Luckily, Dave is a drawing, so he can do all of this on paper.
{ const S = sc(10, 0, { cam: "push", focus: "800 560" }); DS.room(S, ROOM);
  const F = paperDave(S, 520, 960, "near", { s: 1.45, look: 6, mood: "smile", pose: "wave", tp: W(10, 3) });
  card(S, "A DRAWING", 520, 290, { t: W(10, 4) });
  pencilBig(S, 1330, 760, 460, 38, { t: W(10, 2) });
  card(S, "ON PAPER", 1500, 400, { t: W(10, 12) });
  DS.vignette(S); }

// You are not a drawing, so please don't try this one.
{ const S = sc(10, 14, { cam: "push", focus: "900 560" }); kitchen(S);
  const F = paperDave(S, 360, 960, "near", { s: 1.4, look: 8, mood: "smile", pose: "wave" });
  canGrid(S, GX);
  card(S, "PLEASE DON'T TRY THIS", GX, 330, { t: W(10, 19), size: DS.type.body });
  DS.vignette(S); }

// Somewhere behind Dave's eyes, a small, tired voice clears its throat. It's his brain.
{ const S = sc(11, 0, { cam: "push", focus: "800 520" }); DS.room(S, ROOM);
  const top = 960 - 1.5 * 309 - 75, B = brainy(S, 760, top + 6, 0.85, { face: "tired" });
  B.enter(W(11, 4), 0, 170, 0.7, 0.35);
  const F = dave(S, 760, 960, "near", { s: 1.5, look: 0, mood: "wow" });
  card(S, "A TIRED VOICE", 1390, 360, { t: W(11, 6) });
  card(S, "HIS BRAIN", 1390, 520, { t: W(11, 12), tc: "red" });
  arrowR(S, 1240, 520, 1000, 330, W(11, 12), { bend: 0.1 });
  DS.vignette(S); }

// She's a librarian, and she has been on shift since seven this morning.
{ const S = sc(11, 14, { cam: "push", focus: "960 520" }); libraryRoom(S);
  const B = brainy(S, 960, 800, 1.55, { face: "tired" });
  deskLib(S, 640, 640, 640);
  [[760, 600, 150, 40, "red"], [770, 564, 130, 36, "blue"], [785, 530, 110, 34, "green"]].forEach(([x, y, w, h, n]) => DS.shape(S, rect(x, y, w, h), n, { w: "mid" }));
  wallClock(S, 1460, 330, 110, 7, 0);
  card(S, "ON SHIFT SINCE 7", 960, 190, { t: W(11, 20) });
  DS.vignette(S); }

// "Dave, I'm not out of energy. I'm out of day." (Brain)
{ const S = sc(12, 0, { cam: "push", focus: "1100 520" }); DS.room(S, ROOM);
  const F = dave(S, 420, 960, "near", { s: 1.15, look: 7, mood: "worried" });
  const B = brainy(S, 1250, 920, 2.0, { face: "tired", armL: "up", armR: "down" }); B.talk(W(12, 0), END(12));
  card(S, "OUT OF DAY", 790, 250, { t: W(12, 6), tc: "red" });
  DS.vignette(S); }

// ===================== 2. Can one =====================
// Dave opens can number one. A typical small can holds two hundred and fifty millilitres, and usually about eighty milligrams of caffeine.
{ const S = sc(13, 0, { cam: "push", focus: "800 560" }); kitchen(S, { hud: true });
  const F = dave(S, 300, 960, "near", { s: 1.4, look: 8, mood: "smile", pose: "hold" });
  holdCan(S, F, 1.1, { open: true });
  canGrid(S, GX);
  hud(S, { cans: [0, 1, W(13, 3)], notes: 0 });
  can(S, 1010, 900, 3.4, { t: W(13, 5), parent: S.grp() });
  card(S, "250 ml", 1010, 240, { t: W(13, 9) }); card(S, "ABOUT 80 mg", 1010, 380, { t: W(13, 17), tc: "orange" });
  DS.vignette(S); }

// That's roughly the same as a cup of instant coffee.
{ const S = sc(14, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM);
  can(S, 600, 880, 3.0, {}); mug(S, 1330, 880, 1.7, { t: W(14, 5) });
  card(S, "80 mg", 600, 250, { t: W(14, 0), tc: "orange" }); card(S, "80 mg", 1330, 250, { t: W(14, 6), tc: "orange" });
  txt(S, "=", 960, 640, { size: DS.type.display, t: W(14, 3) });
  card(S, "INSTANT COFFEE", 1330, 920, { t: W(14, 8), size: DS.type.caption });
  DS.vignette(S); }

// Within about forty-five minutes, almost all of it has moved from his gut into his blood.
{ const S = sc(14, 10, { cam: "push", focus: "960 560" }); DS.room(S, ROOM);
  DS.shape(S, smooth([[440, 520], [520, 430], [660, 440], [720, 540], [650, 640], [520, 640], [440, 520]]) + " Z", "pink", { w: "near" });
  DS.shape(S, rrect(820, 480, 740, 90, DS.r.lg), "red", { tone: 1, w: "near", flat: true });
  card(S, "GUT", 580, 300, { t: W(14, 21) }); card(S, "BLOOD", 1190, 340, { t: W(14, 24), tc: "red" });
  for (let i = 0; i < 6; i++) { const d = S.grp(); DS.shape(S, circ(600, 540, 20), "orange", { w: "detail", parent: d }); fadeG(S, d, W(14, 13) + i * 0.55, 0.2); shift(d, W(14, 13) + i * 0.55, 3.2, [0, 0], [900, 0], "none"); tl.to(d, { opacity: 0, duration: 0.5 }, W(14, 13) + i * 0.55 + 2.9); }
  wallClock(S, 960, 800, 100, 0, 0, { sweep: { t: W(14, 11), dur: 4, hours: 0.75 } });
  card(S, "45 MIN", 1400, 800, { t: W(14, 12) });
  DS.vignette(S); }

// "There it is. I can feel the energy kicking in." (Dave)
{ const S = sc(15, 0, { cam: "push", focus: "700 520" }); DS.room(S, ROOM);
  const F = dave(S, 560, 960, "near", { s: 1.5, look: 6, mood: "happy", pose: "armsUp" }); talk(S, F, W(15, 0), END(15));
  const g = S.grp(); [[-1, 0], [1, 0]].forEach(([s]) => [0, 1, 2].forEach((i) => S.draw(arc(F.hd[0] + s * (190 + i * 46), F.hd[1] - 40, 56 + i * 12, s > 0 ? -50 : 130, s > 0 ? 50 : 230), S.start, 0, { c: DS.c("orange"), w: DS.w.mid, parent: g }))); fadeG(S, g, W(15, 7));
  say(S, 1330, 330, 460, 150, F.hd[0] + 190, F.hd[1] - 10, ["I can feel the", "energy kicking in."], W(15, 0));
  DS.vignette(S); }

// Here's the thing. Caffeine has no calories.
{ const S = sc(16, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM);
  can(S, 600, 900, 3.4, {});
  const mol = S.grp(); [[1180, 520, 56], [1330, 430, 40], [1330, 620, 40], [1450, 520, 34]].forEach(([x, y, r], i) => { if (i) S.draw(line([1180, 520], [x, y], 0), S.start, 0, { c: IK, w: DS.w.mid, parent: mol }); }); [[1180, 520, 56], [1330, 430, 40], [1330, 620, 40], [1450, 520, 34]].forEach(([x, y, r]) => DS.shape(S, circ(x, y, r), "orange", { w: "mid", parent: mol })); fadeG(S, mol, W(16, 1));
  card(S, "CAFFEINE", 1300, 270, { t: W(16, 3) }); card(S, "0 CALORIES", 1300, 800, { t: W(16, 4), tc: "red" });
  DS.vignette(S); }

// If energy means fuel, the kind your body can burn, the only fuel in that can is the sugar.
{ const S = sc(16, 7, { cam: "push", focus: "960 600" }); DS.room(S, ROOM);
  DS.shape(S, rrect(1020, 800, 460, 40, DS.r.xs), "brown", { w: "mid", parent: S.grp() }); const lg = S.grp(); [-22, 22].forEach((a) => { const l = S.grp(lg); DS.shape(S, rrect(1070, 836, 360, 44, DS.r.xs), "brown", { w: "mid", parent: l }); rot(l, a, 1250, 860); });
  flame(S, 1250, 850, 1.9);
  card(S, "FUEL", 1250, 290, { t: W(16, 10) });
  const cg = S.grp(); [[540, 880], [620, 880], [700, 880], [580, 826], [660, 826], [620, 772]].forEach(([x, y]) => cube(S, x, y, 1.4, { parent: cg })); fadeG(S, cg, W(16, 24));
  card(S, "SUGAR", 620, 560, { t: W(16, 24) });
  arrowR(S, 790, 800, 1040, 800, W(16, 24), { bend: -0.1 });
  DS.vignette(S); }

// And there's a lot of it. Some small cans carry up to seven teaspoons.
{ const S = sc(17, 0, { cam: "push", focus: "1000 560" }); DS.room(S, ROOM);
  can(S, 380, 900, 3.0, {});
  for (let i = 0; i < 7; i++) tsp(S, 760 + (i % 4) * 280, 560 + Math.floor(i / 4) * 220, 1.2, { t: W(17, 6) + (i * (W(17, 13) - W(17, 6))) / 7 });
  card(S, "UP TO 7 TEASPOONS", 1170, 280, { t: W(17, 10) });
  DS.vignette(S); }

// Britain's health service says adults should have no more than thirty grams of free sugars a day.
{ const S = sc(18, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM);
  jar(S, 960, 900, 320, 420, { level: 0.96, t: W(18, 9), mark: 0.96 });
  card(S, "BRITAIN'S LIMIT", 960, 210, { t: W(18, 0) });
  card(S, "30 g A DAY", 1480, 480, { t: W(18, 10), tc: "red" });
  DS.vignette(S); }

// One small can, and Dave has nearly finished his sugar for the whole day. It's ten past four.
{ const S = sc(19, 0, { cam: "push", focus: "800 560" }); kitchen(S);
  const F = dave(S, 300, 960, "near", { s: 1.4, look: 8, mood: "worried", pose: "hold" }); holdCan(S, F, 1.1, { open: true, t: undefined });
  jar(S, 1060, 820, 260, 340, { level: 0.93, t: W(19, 0) + 0.2, mark: 0.96 });
  card(S, "28 g OF 30 g", 1060, 290, { t: W(19, 5), tc: "red" });
  fadeG(S, wallClock(S, 1560, 330, 110, 4, 10), W(19, 14));
  DS.vignette(S); }

// And the name itself? America's Food and Drug Administration points out that the term energy drink was developed by the food industry.
{ const S = sc(20, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM);
  can(S, 600, 920, 3.6, { words: ["ENERGY", "DRINK"], tw: W(20, 13) });
  factory(S, 1200, 900, 1.3, { t: W(20, 17) });
  card(S, "FOOD INDUSTRY", 1380, 260, { t: W(20, 19) });
  arrowR(S, 1180, 700, 830, 700, W(20, 21), { bend: 0.15 });
  DS.vignette(S); }

// So energy drink isn't a science word. It's a marketing word.
{ const S = sc(21, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM);
  flask(S, 560, 840, 1.9, {}); card(S, "SCIENCE WORD", 560, 260, { t: W(21, 4) }); xMark(S, 560, 560, 3.0, W(21, 5));
  megaphone(S, 1360, 600, 1.7, { t: W(21, 8) }); stamp(S, 1360, 330, "MARKETING WORD", W(21, 9), "red", { size: DS.type.small });
  DS.vignette(S); }

// ===================== 3. The chairs =====================
// But Dave definitely feels something. So if the caffeine isn't fuel, what is it doing inside his head?
{ const S = sc(22, 0, { cam: "push", focus: "800 520" }); DS.room(S, ROOM);
  const F = dave(S, 480, 960, "near", { s: 1.5, look: 8, mood: "wow", pose: "hold" }); holdCan(S, F, 1.1, { open: true });
  DS.shape(S, circ(1000, 470, 44), "orange", { w: "mid" });
  arrowR(S, 1060, 440, F.hd[0] + 110, F.hd[1] - 20, W(22, 8), { c: "orange", bend: -0.25 });
  S.text("?", 1250, 540, { size: DS.type.display, c: DS.c("red", 2), t: W(22, 11) });
  card(S, "INSIDE HIS HEAD", 1150, 230, { t: W(22, 14) });
  DS.vignette(S); }

// the library, the furnace and the leftovers share one picture across two beats
const burn = (S, o = {}) => {
  libraryRoom(S);
  const B = brainy(S, 560, 800, 1.45, { face: "tired", armR: "point" });
  deskLib(S, 340, 640, 480);
  [[0, 0], [1, 1], [2, 2]].forEach(([i]) => DS.shape(S, rrect(1010 + i * 62, 760, 52, 90, DS.r.xs), "gold", { w: "mid" })); // fuel cells
  flame(S, 1420, 860, 1.7);
  [-20, 20].forEach((a) => { const l = S.grp(); DS.shape(S, rrect(1290, 846, 260, 34, DS.r.xs), "brown", { w: "mid", parent: l }); rot(l, a, 1420, 860); });
  return B;
};
// All day, while Dave's brain works, it burns through its main fuel molecule.
{ const S = sc(23, 0, { cam: "push", focus: "1000 560" }); burn(S);
  arrowR(S, 1210, 740, 1330, 780, W(23, 7), { bend: -0.2 });
  card(S, "BRAIN FUEL", 1120, 250, { t: W(23, 9) });
  DS.vignette(S); }

// One of the leftovers is a substance called adenosine.
{ const S = sc(23, 13, { cam: "push", focus: "1000 560" }); burn(S);
  [[1640, 800, "orange"], [1560, 880, "pink"], [1700, 890, "gold"]].forEach(([x, y, n], i) => wrapper(S, x, y, 0.9, n, { t: W(23, 14) + i * 0.3 }));
  const v = visitor(S, 1740, 760, 1.2, { kind: "ado", t: W(23, 19) });
  card(S, "ADENOSINE", 1640, 440, { t: W(23, 19), tc: "purple" });
  card(S, "LEFTOVERS", 1500, 270, { t: W(23, 14) });
  DS.vignette(S); }

// In animal brains, adenosine builds up the longer they stay awake.
{ const S = sc(24, 0, { cam: "push", focus: "960 600" }); libraryRoom(S);
  DS.shape(S, rect(300, 840, 1320, 24), "wood", { tone: 2, w: "mid", flat: true });
  for (let i = 0; i < 8; i++) visitor(S, 420 + i * 150, 840, 1.1, { kind: "ado", t: W(24, 3) + i * 0.26 });
  wallClock(S, 1540, 300, 100, 7, 0, { sweep: { t: W(24, 3), dur: 6, hours: 1.5 } });
  card(S, "IN ANIMAL BRAINS", 780, 220, { t: W(24, 0) });
  card(S, "HOURS AWAKE", 780, 960 - 130, { t: W(24, 8), size: DS.type.caption });
  DS.vignette(S); }

// Scientists think it's one of the ways a brain keeps count of its shift.
{ const S = sc(24, 11, { cam: "push", focus: "900 560" }); libraryRoom(S);
  const B = brainy(S, 560, 800, 1.5, { face: "tired", armR: "point" });
  deskLib(S, 340, 640, 480);
  DS.shape(S, rrect(1000, 250, 560, 400, DS.r.sm), "navy", { w: "mid", flat: true });
  [0, 1].forEach((g) => { for (let i = 0; i < 4; i++) S.draw(line([1080 + g * 210 + i * 36, 330], [1080 + g * 210 + i * 36, 450], 0), W(24, 15) + g * 1.2 + i * 0.25, 0, { c: WHITE, w: DS.w.near }); S.draw(line([1060 + g * 210, 470], [1230 + g * 210, 320], 0), W(24, 15) + g * 1.2 + 1.0, 0, { c: WHITE, w: DS.w.near }); });
  card(S, "COUNTING HER SHIFT", 1280, 190, { t: W(24, 17) });
  DS.vignette(S); }

// So tiredness is partly made from used-up energy. It's the wrapper left over from the day.
{ const S = sc(25, 0, { cam: "push", focus: "960 640" }); libraryRoom(S);
  [[700, 860, "orange"], [820, 880, "pink"], [940, 860, "gold"], [1060, 880, "red"], [1180, 860, "purple"], [880, 810, "green"], [1000, 810, "orange"]].forEach(([x, y, n], i) => wrapper(S, x, y, 1.5, n, { t: i > 3 ? W(25, 8) : undefined }));
  visitor(S, 940, 770, 2.4, { kind: "ado", sit: true });
  card(S, "TIREDNESS", 940, 200, { t: W(25, 1), tc: "purple" });
  card(S, "USED-UP ENERGY", 1500, 560, { t: W(25, 5) });
  arrowR(S, 1330, 600, 1230, 780, W(25, 5), { bend: 0.15 });
  DS.vignette(S); }

// To be felt, adenosine has to slot into receptors on your brain cells.
{ const S = sc(26, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM);
  DS.shape(S, circ(760, 560, 240), "blue", { tone: 1, w: "near" }); DS.shape(S, circ(700, 540, 80), "blue", { tone: 2, w: "mid" });
  [-50, -17, 17, 50].forEach((a, i) => { const x = 760 + 240 * Math.cos(a * Math.PI / 180), y = 560 + 240 * Math.sin(a * Math.PI / 180); const c = S.grp(); DS.shape(S, rrect(x - 8, y - 32, 60, 64, DS.r.sm), "gray", { tone: 1, w: "mid", parent: c }); rot(c, a, x, y);
    const p = S.grp(); DS.shape(S, rrect(x + 4, y - 22, 44, 44, DS.r.sm), "purple", { tone: 1, w: "mid", parent: p }); rot(p, a, x, y); const q = S.grp(); q.appendChild(p); slideIn(S, q, W(26, 5) + i * 0.5, 360, 0, 1.0); });
  card(S, "BRAIN CELL", 760, 190, { t: W(26, 9) }); card(S, "RECEPTORS", 1400, 330, { t: W(26, 8), tc: "purple" });
  DS.vignette(S); }

// Think of them as chairs. The more chairs that fill, the sleepier you feel.
{ const S = sc(26, 13, { cam: "push", focus: "960 600" }); libraryRoom(S);
  const C = [0, 1, 2, 3, 4, 5].map((i) => chair(S, 400 + i * 190, 880, 1.25));
  C.forEach((c, i) => visitor(S, c.x, c.seatY, 1.25, { kind: "ado", sit: true, t: W(26, 19) + i * 0.33 }));
  const F = dave(S, 1680, 960, "near", { s: 0.9, look: -6, mood: "smile" }); F.face(W(26, 23), "tired", -6);
  card(S, "CHAIRS = RECEPTORS", 800, 210, { t: W(26, 15) }); card(S, "SLEEPIER", 1660, 460, { t: W(26, 24) });
  DS.vignette(S); }

// Caffeine is shaped enough like adenosine to sit in the same chairs. But it doesn't switch anything on.
{ const S = sc(27, 0, { cam: "push", focus: "960 600" }); libraryRoom(S);
  const C = [0, 1, 2].map((i) => chair(S, 600 + i * 360, 880, 1.6));
  visitor(S, C[0].x, C[0].seatY, 1.6, { kind: "ado", sit: true });
  visitor(S, C[1].x, C[1].seatY, 1.6, { kind: "caf", sit: true, t: W(27, 8) });
  card(S, "ADENOSINE", C[0].x, 300, { t: W(27, 0), tc: "purple" }); card(S, "CAFFEINE", C[1].x, 300, { t: W(27, 1), tc: "orange" });
  card(S, "SAME SHAPE", 780, 190, { t: W(27, 3) });
  card(S, "SWITCHES NOTHING ON", 1160, 480, { t: W(27, 13), size: DS.type.caption });
  DS.vignette(S); }

// It just sits there, taking up the seat.
{ const S = sc(28, 0, { cam: "push", focus: "960 600" }); libraryRoom(S);
  [0, 1, 2, 3, 4].forEach((i) => { const c = chair(S, 460 + i * 250, 880, 1.4); visitor(S, c.x, c.seatY, 1.4, { kind: "caf", sit: true, t: i ? W(28, 1) + i * 0.3 : undefined }); });
  card(S, "TAKING UP THE SEAT", 960, 230, { t: W(28, 4) });
  DS.vignette(S); }

// "Excuse me. That seat is for tiredness. And you're not even reading." (Brain)
{ const S = sc(29, 0, { cam: "push", focus: "900 560" }); libraryRoom(S);
  const c = chair(S, 640, 900, 1.7); const v = visitor(S, c.x, c.seatY, 1.7, { kind: "caf", sit: true });
  visitor(S, 280, 930, 1.5, { kind: "ado" });
  const B = brainy(S, 1360, 940, 1.9, { face: "stern", armR: "point", armL: "hip" }); B.talk(W(29, 0), END(29));
  DS.vignette(S); }

// So here's the turn. Caffeine doesn't give Dave energy. It hides his tiredness.
{ const S = sc(30, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM);
  const F = dave(S, 500, 960, "near", { s: 1.4, look: 7, mood: "flat" });
  [1180, 1340, 1500].forEach((x, i) => visitor(S, x, 930, 1.5, { kind: "ado" }));
  const sh = S.grp(); DS.shape(S, "M1080 560 Q1340 470 1600 560 V960 H1080 Z", "white", { tone: 2, w: "mid", parent: sh }); [1180, 1340, 1500].forEach((x) => S.draw(`M${x - 70} 960 Q${x} 900 ${x + 70} 960`, S.start, 0, { c: DS.c("gray", 1), w: DS.w.detail, parent: sh })); slideIn(S, sh, W(30, 10), 0, -90, 0.8);
  card(S, "GIVES ENERGY?", 500, 270, { t: W(30, 6) }); xMark(S, 500, 270, 1.5, W(30, 8));
  card(S, "HIDES TIREDNESS", 1340, 380, { t: W(30, 10), tc: "purple" });
  DS.vignette(S); }

// And the adenosine doesn't leave. It waits in the corridor,
{ const S = sc(31, 0, { cam: "push", focus: "960 640" }); corridorSet(S);
  queue(S, 5);
  card(S, "THE CORRIDOR", 960, 200, { t: W(31, 8) });
  DS.vignette(S); }

// and every hour that Dave stays awake, a few more of them join the queue.
{ const S = sc(32, 0, { cam: "push", focus: "960 640" }); corridorSet(S);
  queue(S, 9, { t: (i) => (i < 5 ? undefined : W(32, 7) + (i - 5) * 0.55) });
  wallClock(S, 400, 300, 110, 9, 0, { sweep: { t: W(32, 1), dur: 5, hours: 1.2 } });
  card(S, "A FEW MORE EVERY HOUR", 1250, 200, { t: W(32, 7) });
  DS.vignette(S); }

// "So I'm not less tired. I just can't see the queue?" (Dave)
{ const S = sc(33, 0, { cam: "push", focus: "800 640" }); corridorSet(S);
  queue(S, 10);
  S.fill("M520 560 Q780 500 1060 580 V1000 H520 Z", S.start, 0, WHITE, 0.9);
  const F = dave(S, 330, 990, "near", { s: 1.4, look: 8, mood: "worried", pose: "shrug" }); talk(S, F, W(33, 0), END(33));
  DS.vignette(S); }

// "Correct, Dave. And it's getting longer by the hour." (Brain)
{ const S = sc(34, 0, { cam: "push", focus: "1000 640" }); corridorSet(S);
  queue(S, 10);
  const sh = S.grp(); S.fill("M520 560 Q780 500 1060 580 V1000 H520 Z", S.start, 0, WHITE, 0.9, sh); tl.to(sh, { opacity: 0, duration: 0.8 }, W(34, 3));
  const F = dave(S, 330, 990, "near", { s: 1.4, look: 8, mood: "worried" });
  const B = brainy(S, 1500, 990, 1.9, { face: "tired", armR: "point", armL: "hip" }); B.talk(W(34, 0), END(34));
  DS.vignette(S); }

// He will meet that queue again later. For now, paper Dave reaches for can number two. And then three.
{ const S = sc(35, 0, { cam: "push", focus: "800 560" }); kitchen(S, { hud: true });
  const F = paperDave(S, 300, 960, "near", { s: 1.4, look: 8, mood: "flat", pose: "reach", tp: W(35, 9) });
  canGrid(S, GX);
  queuePanel(S, 130, 80, 10, { t: W(35, 0) });
  hud(S, { cans: [1, 3, W(35, 13)], dur: 1.4 });
  card(S, "PAPER DAVE", 300, 290, { t: W(35, 9) });
  DS.vignette(S); }

// ===================== 4. Cans three to five =====================
// Cans two and three take paper Dave to two hundred and forty milligrams of caffeine, in about an hour.
{ const S = sc(36, 0, { cam: "push", focus: "900 560" }); kitchen(S, { hud: true });
  const F = paperDave(S, 300, 960, "near", { s: 1.4, look: 8, mood: "wow" });
  canGrid(S, GX); hud(S, { cans: [3, 3], notes: 1 });
  countUp(S, 960, 420, 80, 240, W(36, 8), 1.6, { size: DS.type.display, c: DS.c("red", 2), fmt: ENERGY, t0: W(36, 7) });
  card(S, "IN ABOUT AN HOUR", 960, 560, { t: W(36, 15), size: DS.type.caption });
  DS.vignette(S); }

// Europe's food safety authority says single doses of up to about two hundred milligrams don't raise safety concerns for healthy adults.
{ const S = sc(37, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM);
  const G = gauge(S, 780, 150, 720, { limit: 200, zoneT: W(37, 11) });
  card(S, "EU FOOD SAFETY", 400, 330, { t: W(37, 0) });
  card(S, "FINE: 200 mg", 1280, G.yOf(200), { t: W(37, 12), tc: "green" });
  DS.vignette(S); }

// Dave is already past it.
{ const S = sc(37, 14, { cam: "push", focus: "960 560" }); DS.room(S, ROOM);
  const G = gauge(S, 780, 150, 720, { limit: 200 });
  G.fill(240, W(37, 22), 1.2);
  const F = paperDave(S, 1400, 960, "near", { s: 1.3, look: -7, mood: "worried", pose: "pointL" });
  card(S, "240 mg", 520, G.yOf(240), { t: W(37, 22), tc: "orange" });
  sticky(S, 1560, 310, NOTES.limit, { t: W(37, 24), rot: -4, k: 1.2 });
  DS.vignette(S); }

// Can four makes a whole litre. In studies where healthy young adults drank about a litre of energy drink at once,
{ const S = sc(38, 0, { cam: "push", focus: "900 560" }); DS.room(S, ROOM);
  jug(S, 520, 900, 260, 440, { fill: "orange", level: 1, t: W(38, 0), dur: 2.2, marks: [[0.25], [0.5], [0.75], [1]] });
  [0, 1, 2, 3].forEach((i) => { const c = S.grp(); can(S, 520, 400 - i * 0, 1.2, { parent: c }); fadeG(S, c, W(38, 1) + i * 0.5, 0.3); tl.to(c, { opacity: 0, duration: 0.4 }, W(38, 1) + i * 0.5 + 0.7); });
  card(S, "1 LITRE", 520, 190, { t: W(38, 4) });
  YOUNG.forEach((y, i) => { const p = who(S, 1000 + i * 260, 940, "near", Object.assign({ s: 1.0, mood: "flat", look: -4, t: W(38, 10) }, y)); });
  card(S, "STUDIES", 1260, 330, { t: W(38, 6) });
  DS.vignette(S); }

// some got a pounding heart, shortness of breath, shaky muscles and bad nausea.
{ const S = sc(39, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM);
  const F = who(S, 960, 960, "near", Object.assign({ s: 1.5, mood: "worried", look: 0, pose: "stand" }, YOUNG[1]));
  const h = heartI(S, 560, 420, 2.4); pulse(h, 560, 420, W(39, 3), END(39)); fadeG(S, h, W(39, 3)); txt(S, "POUNDING HEART", 560, 560, { t: W(39, 3) });
  const b = S.grp(); [0, 1, 2].forEach((i) => S.draw(arc(1330, 380 + i * 52, 80 + i * 14, -70, 70), S.start, 0, { c: DS.c("gray", 2), w: DS.w.mid, parent: b })); fadeG(S, b, W(39, 5)); txt(S, "SHORT OF BREATH", 1380, 580, { t: W(39, 5) });
  const m = S.grp(); [0, 1, 2].forEach((i) => S.draw(`M${460 + i * 6} ${700 + i * 40} l24 -16 l-24 -16 l24 -16`, S.start, 0, { c: DS.c("orange"), w: DS.w.mid, parent: m })); fadeG(S, m, W(39, 8)); txt(S, "SHAKY MUSCLES", 560, 900, { t: W(39, 8) });
  const n = S.grp(); S.draw(smooth(Array.from({ length: 24 }, (_, i) => [1330 + Math.cos(i * 0.5) * (10 + i * 4), 760 + Math.sin(i * 0.5) * (10 + i * 4)])), S.start, 0, { c: DS.c("green", 2), w: DS.w.mid, parent: n }); fadeG(S, n, W(39, 11)); txt(S, "BAD NAUSEA", 1380, 900, { t: W(39, 11) });
  DS.vignette(S); }

// Some studies even found changes in the electrical pattern of their heartbeat.
{ const S = sc(39, 13, { cam: "push", focus: "960 560" }); DS.room(S, ROOM);
  panel(S, 960, 560, 1400, 520, undefined);
  for (let i = 1; i < 14; i++) S.draw(line([260 + i * 100, 320], [260 + i * 100, 800], 0), S.start, 0, { c: DS.c("pink", 1), w: DS.w.hair });
  for (let j = 1; j < 5; j++) S.draw(line([270, 320 + j * 96], [1650, 320 + j * 96], 0), S.start, 0, { c: DS.c("pink", 1), w: DS.w.hair });
  ecg(S, 300, 580, 1320, 6, 180);
  S.draw(`M770 700 V740 H1010 V700`, W(39, 18), 0, { c: DS.c("red"), w: DS.w.near });
  card(S, "HEARTBEAT TRACE", 960, 190, { t: W(39, 16) });
  sticky(S, 1600, 160, NOTES.heart, { t: W(39, 21), rot: 3 });
  DS.vignette(S); }

// "Why is my hand doing that? I didn't ask it to." (Dave)
{ const S = sc(40, 0, { cam: "push", focus: "800 560" }); kitchen(S, { hud: true });
  const F = paperDave(S, 360, 960, "near", { s: 1.5, look: 8, mood: "worried", pose: "reach" }); talk(S, F, W(40, 0), END(40));
  const [hx, hy] = F.hand("R", "reach"); const tr = S.grp(); [0, 1, 2].forEach((i) => S.draw(arc(hx + 16, hy, 40 + i * 22, -50, 50), S.start, 0, { c: DS.c("orange"), w: DS.w.mid, parent: tr })); fadeG(S, tr, W(40, 3));
  canGrid(S, GX); hud(S, { cans: [3, 4, W(40, 0) + 0.3], notes: 2 });
  DS.vignette(S); }

// Can five brings him to four hundred milligrams.
{ const S = sc(41, 0, { cam: "push", focus: "900 560" }); kitchen(S, { hud: true });
  const F = paperDave(S, 300, 960, "near", { s: 1.4, look: 8, mood: "wow" });
  canGrid(S, GX); hud(S, { cans: [4, 5, W(41, 0) + 0.3], notes: 2 });
  countUp(S, 960, 420, 240, 400, W(41, 3), 1.0, { size: DS.type.display, c: DS.c("red", 2), fmt: ENERGY, t0: W(41, 2) });
  DS.vignette(S); }

// That's the amount the Food and Drug Administration says is not generally linked to negative effects, for most adults.
{ const S = sc(41, 8, { cam: "push", focus: "960 560" }); DS.room(S, ROOM);
  const G = gauge(S, 780, 150, 720, { limit: 400 });
  G.fill(400, S.start, 0.01);
  card(S, "FDA: 400 mg", 1290, G.yOf(400), { t: W(41, 11), tc: "green" });
  tick(S, 560, 420, 2.4, W(41, 22), "green");
  card(S, "FOR MOST ADULTS", 400, 600, { t: W(41, 24), size: DS.type.caption });
  DS.vignette(S); }

// That's meant to cover a whole day. Dave has managed it in one afternoon.
{ const S = sc(42, 0, { cam: "push", focus: "960 600" }); DS.room(S, ROOM);
  DS.shape(S, rrect(260, 700, 1400, 70, DS.r.md), "white", { w: "mid", flat: true });
  for (let i = 0; i <= 8; i++) S.draw(line([300 + i * 165, 700], [300 + i * 165, 770], 0), S.start, 0, { c: IK, w: DS.w.detail });
  S.fill(rect(1050, 706, 220, 58), W(42, 8), 0.3, DS.c("orange", 1), 1);
  [0, 1, 2, 3, 4].forEach((i) => can(S, 1090 + i * 40, 700 - (i % 2) * 6, 1.9, { t: W(42, 8) + i * 0.2 }));
  card(S, "A WHOLE DAY", 960, 840, { t: W(42, 3) }); card(S, "ONE AFTERNOON", 1160, 330, { t: W(42, 11), tc: "orange" });
  DS.vignette(S); }

// In Europe, drinks like these with more than a hundred and fifty milligrams of caffeine per litre
{ const S = sc(43, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM);
  can(S, 620, 900, 3.4, {});
  jug(S, 1280, 900, 300, 480, { fill: "orange", level: 0.5, t: W(43, 7), dur: 1.0, marks: [[0.5], [1]] });
  card(S, "EUROPE", 620, 250, { t: W(43, 1) });
  card(S, "OVER 150 mg A LITRE", 1280, 250, { t: W(43, 7), tc: "red" });
  DS.vignette(S); }

// have to carry a warning: high caffeine content.
{ const S = sc(43, 17, { cam: "push", focus: "960 560" }); DS.room(S, ROOM);
  can(S, 960, 960, 4.6, { words: ["HIGH", "CAFFEINE", "CONTENT"], tw: W(43, 21) });
  warnTri(S, 960, 250, 0.9, { t: W(43, 19) });
  card(S, "A WARNING", 1500, 600, { t: W(43, 19) });
  DS.vignette(S); }

// So Dave's kitchen table holds a hundred little warnings, and he has drunk five of them.
{ const S = sc(44, 0, { cam: "push", focus: "1000 640" }); kitchen(S, { hud: true });
  const F = paperDave(S, 300, 960, "near", { s: 1.4, look: 8, mood: "tired" });
  canGrid(S, GX); hud(S, { cans: [5, 5], notes: 2 });
  [0, 1, 2, 3, 4].forEach((i) => canLie(S, 560 + i * 54, 868, 0.9, { t: W(44, 11) + i * 0.25 }));
  card(S, "100 WARNINGS", GX, 560, { t: W(44, 5), tc: "red" });
  DS.vignette(S); }

// the FDA's list, drawn once and revealed over three beats (n items already there, the rest land on their words)
const FDA_ITEMS = ["FASTER HEART RATE", "PALPITATIONS", "HIGH BLOOD PRESSURE", "ANXIETY", "JITTERS", "UPSET STOMACH", "NAUSEA", "HEADACHES", "TROUBLE SLEEPING"];
const fdaPaper = (S, nStatic, times, tTitle) => {
  paperR(S, 560, 130, 800, 800, {});
  S.draw(line([960, 110], [960, 190], 0), S.start, 0, { c: DS.c("gray", 2), w: DS.w.near * 1.4 });
  txt(S, "TOO MUCH CAFFEINE", 960, 260, { size: DS.type.body, t: tTitle, c: DS.c("red", 2) });
  S.draw(line([620, 300], [1300, 300], 0), S.start, 0, { c: IK, w: DS.w.detail });
  FDA_ITEMS.forEach((s, i) => { if (i < nStatic || times[i] !== undefined) txt(S, s, 640, 380 + i * 58, { anchor: "start", size: DS.type.caption, t: i < nStatic ? undefined : times[i] }); });
};
// The Food and Drug Administration lists what too much caffeine can do.
{ const S = sc(45, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM);
  fdaPaper(S, 0, [], W(45, 7));
  card(S, "THE FDA'S LIST", 1620, 300, { t: W(45, 1) });
  DS.vignette(S); }

// A faster heart rate, palpitations, high blood pressure, anxiety,
{ const S = sc(46, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM);
  fdaPaper(S, 0, { 0: W(46, 1), 1: W(46, 4), 2: W(46, 5), 3: W(46, 8) }, undefined);
  DS.vignette(S); }

// jitters, an upset stomach, nausea, headaches, and trouble sleeping.
{ const S = sc(46, 8, { cam: "push", focus: "960 560" }); DS.room(S, ROOM);
  fdaPaper(S, 4, { 4: W(46, 9), 5: W(46, 11), 6: W(46, 13), 7: W(46, 14), 8: W(46, 16) }, undefined);
  DS.vignette(S); }

// And the caffeine doesn't leave when the buzz does.
{ const S = sc(47, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM);
  panel(S, 960, 540, 1400, 640, undefined);
  S.draw(`M360 800 H1560 M360 800 V280`, S.start, 0, { c: IK, w: DS.w.near });
  txt(S, "HOURS", 1460, 840, { size: DS.type.caption, c: DS.c("gray", 2) });
  const pc = S.draw(smooth([[380, 340], [700, 352], [1000, 400], [1300, 450], [1520, 500]]), W(47, 1), 0, { c: DS.c("orange"), w: DS.w.near * 1.4 });
  const pb = S.draw(smooth([[380, 340], [600, 372], [800, 500], [1000, 660], [1180, 760]]), W(47, 5), 0, { c: DS.c("green"), w: DS.w.near * 1.4 });
  card(S, "CAFFEINE", 1300, 360, { t: W(47, 2), tc: "orange" }); card(S, "THE BUZZ", 1180, 660, { t: W(47, 6), tc: "green" });
  DS.vignette(S); }

// In healthy adults, the body takes about five hours to clear half of it, and sometimes much longer.
{ const S = sc(47, 9, { cam: "push", focus: "960 560" }); DS.room(S, ROOM);
  panel(S, 960, 540, 1400, 640, undefined);
  S.draw(`M360 800 H1560 M360 800 V280`, S.start, 0, { c: IK, w: DS.w.near });
  const pts = Array.from({ length: 16 }, (_, t) => [380 + t * 76, 800 - 460 * Math.pow(0.5, t / 5)]);
  S.draw(smooth(pts), S.start, 0, { c: DS.c("orange"), w: DS.w.near * 1.4 });
  dash(S.draw(smooth(Array.from({ length: 16 }, (_, t) => [380 + t * 76, 800 - 460 * Math.pow(0.5, t / 9)])), W(47, 23), 0, { c: DS.c("orange", 1), w: DS.w.mid }), 14, 12);
  dash(S.draw(line([760, 800], [760, 570], 0), W(47, 16), 0, { c: IK, w: DS.w.mid }), 10, 10); dash(S.draw(line([380, 570], [760, 570], 0), W(47, 19), 0, { c: IK, w: DS.w.mid }), 10, 10);
  card(S, "ABOUT 5 HOURS", 760, 890, { t: W(47, 16), size: DS.type.caption }); card(S, "HALF GONE", 1120, 440, { t: W(47, 19), tc: "orange" }); card(S, "SOMETIMES MUCH LONGER", 1220, 240, { t: W(47, 23), size: DS.type.caption });
  DS.vignette(S); }

// So if Dave stopped at five cans at five o'clock,
{ const S = sc(48, 0, { cam: "push", focus: "960 600" }); DS.room(S, ROOM);
  [0, 1, 2, 3, 4].forEach((i) => can(S, 420 + i * 140, 880, 2.1, { t: W(48, 3) + i * 0.2 }));
  card(S, "5 CANS", 700, 330, { t: W(48, 4) });
  fadeG(S, wallClock(S, 1400, 520, 200, 5, 0), W(48, 8)); card(S, "FIVE O'CLOCK", 1400, 800, { t: W(48, 8), size: DS.type.caption });
  DS.vignette(S); }

// there would still be about a can's worth inside him at three in the morning.
{ const S = sc(48, 10, { cam: "push", focus: "800 560" }); bedroom(S);
  const F = dave(S, 560, 790, "near", { s: 1.4, look: 7, mood: "wow", sit: true, pose: "hold" }); blanket(S);
  const g = S.grp(); S.thought(1020, 500, 240, 150, 700, 600, S.start, 0.3, { parent: g }); can(S, 1020, 560, 1.4, { parent: g }); fadeG(S, g, W(48, 14), 0.4);
  card(S, "ABOUT A CAN'S WORTH", 1020, 330, { t: W(48, 15), size: DS.type.caption }); card(S, "3 IN THE MORNING", 900, 170, { t: W(48, 20) });
  DS.vignette(S); }

// Europe's food safety authority says even a hundred milligrams close to bedtime can affect sleep in some adults.
{ const S = sc(49, 0, { cam: "push", focus: "900 640" }); bedroom(S);
  can(S, 1245, 750, 0.9, { t: W(49, 5) });
  const F = dave(S, 735, 790, "near", { s: 1.4, look: 0, mood: "wow", sit: true, pose: "stand" }); F.lie(S.start, 0.01, -88); blanket(S);
  card(S, "100 mg BEFORE BED", 960, 200, { t: W(49, 5), tc: "orange" });
  txt(S, "z z z", 470, 620, { size: DS.type.title, t: W(49, 12), c: DS.c("gray", 1) }); xMark(S, 520, 600, 2.2, W(49, 13));
  sticky(S, 1650, 640, NOTES.sleep, { t: W(49, 14), rot: 3 });
  DS.vignette(S); }

// Dave wanted to stop being tired. Instead, he gets to be tired and awake at the same time.
{ const S = sc(50, 0, { cam: "push", focus: "800 560" }); bedroom(S);
  const F = dave(S, 560, 790, "near", { s: 1.4, look: 7, mood: "tired", sit: true, pose: "stand" }); blanket(S);
  card(S, "TIRED", 560, 300, { t: W(50, 11), tc: "purple" }); card(S, "AND AWAKE", 560, 430, { t: W(50, 12), tc: "orange" });
  queuePanel(S, 1400, 560, 12, { t: W(50, 3) });
  DS.vignette(S); }

// ===================== 5. The hundred, on paper =====================
// So let's be plain about this part. Large amounts of caffeine can be dangerous, and people have ended up in hospital.
{ const S = sc(51, 0, { cam: "push", focus: "960 560" }); DS.outdoor(S, { hy: 640 });
  card(S, "LET'S BE PLAIN", 960, 200, { t: W(51, 1) });
  warnTri(S, 560, 600, 1.8, { t: W(51, 12) });
  hospital(S, 1250, 880, 1.3, { t: W(51, 19) });
  DS.vignette(S); }

// In twenty eleven, American emergency departments saw more than twenty thousand visits involving energy drinks, roughly double the number four years earlier.
{ const S = sc(52, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM);
  panel(S, 960, 540, 1300, 700, undefined);
  S.draw(line([420, 800], [1500, 800], 0), S.start, 0, { c: IK, w: DS.w.near });
  DS.shape(S, rect(1080, 360, 260, 440), "blue", { w: "mid", t: W(52, 7) }); countUp(S, 1210, 320, 0, 20000, W(52, 8), 1.6, { size: DS.type.title, c: DS.c("blue", 2), fmt: (n) => (n >= 20000 ? "20,000+" : Math.round(n / 10) * 10 + ""), t0: W(52, 7) });
  DS.shape(S, rect(620, 580, 260, 220), "sky", { w: "mid", t: W(52, 18) }); txt(S, "ABOUT HALF", 750, 540, { t: W(52, 18) });
  txt(S, "2007", 750, 880, { size: DS.type.body, t: W(52, 18) }); txt(S, "2011", 1210, 880, { size: DS.type.body, t: W(52, 1) });
  card(S, "EMERGENCY VISITS", 960, 190, { t: W(52, 3) });
  DS.vignette(S); }

// The report noted that large amounts of caffeine can cause a fast heartbeat, and even seizures, severe enough to need emergency care.
{ const S = sc(53, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM);
  paperR(S, 340, 180, 560, 700, {}); txt(S, "THE REPORT", 620, 270, { size: DS.type.body, c: DS.c("gray", 2) }); S.draw(line([380, 300], [860, 300], 0), S.start, 0, { c: IK, w: DS.w.detail });
  txt(S, "FAST HEARTBEAT", 380, 400, { anchor: "start", t: W(53, 11) }); txt(S, "SEIZURES", 380, 500, { anchor: "start", t: W(53, 14) }); txt(S, "EMERGENCY CARE", 380, 600, { anchor: "start", t: W(53, 18), c: DS.c("blue", 2) });
  const h = heartI(S, 1350, 540, 4.2); pulse(h, 1350, 540, S.start + 0.3, END(53)); fadeG(S, h, W(53, 10));
  DS.vignette(S); }

// "If caffeine ever leaves you with a racing heart, chest pain, or feeling really unwell, please get medical help straight away." (Doctor)
{ const S = sc(54, 0, { cam: "push", focus: "900 560" }); DS.room(S, { wall: "sand", floor: "wood", window: false });
  DS.plant(S, 1790, 1010, 0.55, -1);
  const F = doc(S, 640, 960, "near", { s: 1.5, look: 4, mood: "smile", pose: "stand" }); talk(S, F, W(54, 0), END(54));
  card(S, "DOCTOR", 640, 290, { t: W(54, 0) });
  say(S, 1250, 390, 470, 200, F.hd[0] + 110, F.hd[1] - 10, ["If you feel unwell,", "get medical help", "straight away."], W(54, 0) + 0.2);
  DS.vignette(S); }

// And all one hundred cans? On paper,
{ const S = sc(55, 0, { cam: "push", focus: "1000 640" }); kitchen(S, { hud: true });
  const F = paperDave(S, 300, 960, "near", { s: 1.4, look: 8, mood: "worried" });
  canGrid(S, GX); hud(S, { cans: [5, 100, W(55, 0) + 0.3], notes: 2, dur: 1.3 });
  card(S, "100 CANS", GX, 560, { t: W(55, 1) });
  DS.vignette(S); }

// that's twenty times the caffeine the Food and Drug Administration cites for a whole day, in one sitting.
{ const S = sc(55, 7, { cam: "push", focus: "960 560" }); DS.room(S, ROOM);
  for (let i = 0; i < 20; i++) { const x = 400 + (i % 5) * 200, y = 290 + Math.floor(i / 5) * 130, g = S.grp(); DS.shape(S, rrect(x - 90, y - 50, 180, 100, DS.r.sm), "white", { w: "mid", flat: true, parent: g }); txt(S, "400 mg", x, y + 14, { size: DS.type.caption, parent: g, t: W(55, 8) }); fadeG(S, g, W(55, 8) + i * 0.16, 0.25); }
  countUp(S, 1560, 520, 0, 20, W(55, 8), 3, { size: DS.type.display, c: DS.c("red", 2), fmt: (n) => Math.round(n) + "x", t0: W(55, 8) });
  card(S, "IN ONE SITTING", 960, 900, { t: W(55, 22) });
  DS.vignette(S); }

// Plus up to seven hundred teaspoons of sugar. That's about three months of Britain's daily sugar limit, gone before dinner.
{ const S = sc(56, 0, { cam: "push", focus: "960 600" }); DS.room(S, ROOM);
  DS.shape(S, smooth([[240, 900], [320, 760], [480, 640], [640, 600], [800, 660], [920, 780], [1000, 900], [240, 900]]) + " Z", "white", { tone: 2, w: "near" });
  card(S, "700 TEASPOONS", 620, 470, { t: W(56, 3) });
  sticky(S, 340, 250, NOTES.sugar, { t: W(56, 16), rot: -4 });
  [0, 1, 2].forEach((i) => { const g = S.grp(); DS.shape(S, rrect(1180 + i * 220, 360, 190, 230, DS.r.sm), "white", { w: "mid", parent: g }); S.fill(rect(1180 + i * 220, 360, 190, 56), S.start, 0, DS.c("red", 1), 1, g); txt(S, "MONTH " + (i + 1), 1275 + i * 220, 470, { size: DS.type.caption, parent: g }); xMark(S, 1275 + i * 220, 520, 0.9, W(56, 11) + i * 0.3, g); fadeG(S, g, W(56, 9) + i * 0.3, 0.3); });
  card(S, "ABOUT 3 MONTHS", 1400, 230, { t: W(56, 9), tc: "red" });
  fadeG(S, wallClock(S, 1500, 780, 100, 6, 0), W(56, 16)); card(S, "BEFORE DINNER", 1500, 930, { t: W(56, 16), size: DS.type.caption });
  DS.vignette(S); }

// ===================== 6. The first ingredient =====================
// "Fine. Then I'll have a hundred with no caffeine and no sugar." (Dave)
{ const S = sc(57, 0, { cam: "push", focus: "900 560" }); kitchen(S);
  const F = paperDave(S, 360, 960, "near", { s: 1.5, look: 8, mood: "determined", pose: "point" }); talk(S, F, W(57, 0), END(57));
  canGrid(S, GX);
  card(S, "0 CAFFEINE", 1480, 380, { t: W(57, 7), tc: "green" }); tick(S, 1250, 380, 1.4, W(57, 8), "green");
  card(S, "0 SUGAR", 1480, 520, { t: W(57, 10), tc: "green" }); tick(S, 1250, 520, 1.4, W(57, 11), "green");
  DS.vignette(S); }

// All right. Take out the caffeine. Take out the sugar. Take out everything that makes it an energy drink. So what's left inside the can?
{ const S = sc(58, 0, { cam: "push", focus: "900 580" }); DS.room(S, ROOM);
  const cx = 640, gy = 920, w = 250, h = 470;
  S.fill(rect(cx - w / 2 + 6, gy - h * 0.78, w - 12, h * 0.78 - 4), S.start, 0, DS.c("sky", 2), 0.95);
  const part = (t, mk) => { const g = S.grp(); mk(g); drift(S, g, t, -520, 1.2); return g; };
  part(W(58, 5), (g) => [[580, 560], [640, 500], [700, 590], [610, 660], [680, 680]].forEach(([x, y]) => DS.shape(S, circ(x, y, 22), "orange", { w: "mid", parent: g })));
  part(W(58, 9), (g) => [[570, 760], [650, 780], [710, 740], [620, 830]].forEach(([x, y]) => cube(S, x, y, 0.8, { parent: g })));
  part(W(58, 13), (g) => [[600, 440], [700, 470], [560, 620], [720, 640], [650, 570]].forEach(([x, y], i) => DS.shape(S, poly([[x, y - 24], [x + 7, y - 7], [x + 24, y], [x + 7, y + 7], [x, y + 24], [x - 7, y + 7], [x - 24, y], [x - 7, y - 7]], 0) + " Z", ["pink", "purple", "gold"][i % 3], { w: "detail", parent: g })));
  S.draw(`M${cx - w / 2} ${gy - h} V${gy - 12} Q${cx - w / 2} ${gy} ${cx - w / 2 + 14} ${gy} H${cx + w / 2 - 14} Q${cx + w / 2} ${gy} ${cx + w / 2} ${gy - 12} V${gy - h}`, S.start, 0, { c: IK, w: DS.w.near });
  S.draw(circ(cx, gy - h, w / 2, 14), S.start, 0, { fill: DS.c("gray", 1), c: IK, w: DS.w.mid });
  card(S, "NO CAFFEINE", 1300, 270, { t: W(58, 3) }); card(S, "NO SUGAR", 1300, 410, { t: W(58, 7) }); card(S, "NOTHING ELSE", 1300, 550, { t: W(58, 11) });
  S.text("?", 640, 330, { size: DS.type.display, c: DS.c("red", 2), t: W(59, 2) }); S.text("?", 1300, 790, { size: DS.type.display, c: DS.c("red", 2), t: W(59, 3) });
  DS.vignette(S); }

// The first ingredient on the label. Harvard's public health school puts it plainly: after water, sugar is the main ingredient in energy drinks.
{ const S = sc(60, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM);
  const L = labelSheet(S, 960, 560, 880, 620);
  S.fill(rect(L.x + 30, L.rows[0] - 56, 820, 76), W(60, 1), 0.3, DS.c("yellow", 1), 1);
  txt(S, "1. WATER", L.x + 60, L.rows[0], { anchor: "start", size: DS.type.title, t: W(60, 1) });
  txt(S, "2. SUGAR", L.x + 60, L.rows[1], { anchor: "start", size: DS.type.body, t: W(60, 15), c: DS.c("gray", 2) });
  txt(S, "3. ...", L.x + 60, L.rows[2], { anchor: "start", size: DS.type.body, t: W(60, 16), c: DS.c("gray", 1) });
  card(S, "HARVARD PUBLIC HEALTH", 960, 170, { t: W(60, 6) });
  DS.vignette(S); }

// An energy drink is mostly water. And a hundred cans is twenty-five litres, about five times all the blood in Dave's body.
{ const S = sc(61, 0, { cam: "push", focus: "1000 600" }); DS.room(S, ROOM);
  can(S, 440, 920, 3.4, {});
  [[360, 560], [440, 500], [520, 580]].forEach(([x, y], i) => dropP(S, x, y, 1.6, { t: W(61, 4) + i * 0.2 }));
  card(S, "MOSTLY WATER", 440, 330, { t: W(61, 4) });
  sticky(S, 320, 160, NOTES.water, { t: W(61, 5), rot: -4 });
  [0, 1, 2, 3, 4].forEach((i) => jug(S, 1000 + i * 150, 900, 110, 230, { fill: "sky", level: 0.9, parent: (() => { const g = S.grp(); fadeG(S, g, W(61, 11) + i * 0.25, 0.3); return g; })() }));
  const bj = S.grp(); jug(S, 880, 900, 110, 230, { fill: "red", level: 0.9, parent: bj }); fadeG(S, bj, W(61, 17), 0.4);
  card(S, "25 LITRES", 1350, 580, { t: W(61, 11) }); card(S, "ABOUT 5 x HIS BLOOD", 1180, 330, { t: W(61, 17), size: DS.type.caption });
  DS.vignette(S); }

// Here's the part nobody thinks about. Your kidneys have a speed limit.
{ const S = sc(62, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM);
  kidney(S, 560, 580, 2.0, {}); kidney(S, 920, 580, 2.0, {});
  card(S, "YOUR KIDNEYS", 740, 240, { t: W(62, 6) });
  const g = S.grp(); S.draw(circ(1500, 560, 190), S.start, 0, { fill: WHITE, c: DS.c("red"), w: DS.w.near * 2, parent: g }); S.text("SPEED", 1500, 540, { size: DS.type.body, c: IK, parent: g, t: T0(S) }); S.text("LIMIT", 1500, 620, { size: DS.type.body, c: IK, parent: g, t: T0(S) }); fadeG(S, g, W(62, 9));
  DS.vignette(S); }

// Even working flat out, healthy kidneys can only get rid of roughly seven hundred millilitres to a litre of water an hour.
{ const S = sc(63, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM);
  kidney(S, 480, 580, 2.2, {});
  S.draw("M590 560 C 760 560, 800 440, 1010 450", S.start, 0, { c: DS.c("gray", 2), w: DS.w.near * 2 });
  jug(S, 1180, 900, 300, 460, { fill: "sky", level: 1, t: W(63, 11), dur: 3.5, marks: [[0.7], [1]] });
  [0, 1, 2].forEach((i) => { const d = S.grp(); dropP(S, 1010, 470, 0.9, { parent: d, w: "detail" }); fadeG(S, d, W(63, 11) + i * 1.0, 0.1); shift(d, W(63, 11) + i * 1.0, 0.7, [0, 0], [100, 240], "power2.in"); tl.to(d, { opacity: 0, duration: 0.2 }, W(63, 11) + i * 1.0 + 0.55); });
  card(S, "FLAT OUT", 480, 250, { t: W(63, 1) }); card(S, "700 ml TO 1 LITRE", 1180, 250, { t: W(63, 11), size: DS.type.caption });
  fadeG(S, wallClock(S, 1700, 330, 100, 0, 0, { sweep: { t: W(63, 18), dur: 3, hours: 1 } }), W(63, 18)); card(S, "AN HOUR", 1700, 500, { t: W(63, 20), size: DS.type.caption });
  DS.vignette(S); }

// Twenty-five litres would keep Dave's kidneys working flat out for more than a whole day.
{ const S = sc(64, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM);
  kidney(S, 480, 640, 1.6, {}); card(S, "25 LITRES", 480, 300, { t: W(64, 0) });
  const cx = 1200, cy = 580, r = 250;
  DS.shape(S, circ(cx, cy, r), "white", { w: "near", flat: true });
  for (let i = 0; i < 24; i++) { const a = (i / 24) * Math.PI * 2 - Math.PI / 2; S.draw(line([cx + Math.cos(a) * r * 0.86, cy + Math.sin(a) * r * 0.86], [cx + Math.cos(a) * r * 0.97, cy + Math.sin(a) * r * 0.97], 0), S.start, 0, { c: IK, w: i % 6 ? DS.w.detail : DS.w.near }); }
  const hg = S.grp(); S.draw(line([cx, cy], [cx, cy - r * 0.78], 0), S.start, 0, { c: DS.c("red"), w: DS.w.near * 1.4, parent: hg }); DS.shape(S, circ(cx, cy, 14), "ink", { w: "hair", flat: true });
  spin(hg, W(64, 5), 4.5, 0, 400, cx, cy, "none");
  card(S, "MORE THAN A DAY", 1200, 230, { t: W(64, 10), tc: "red" });
  DS.vignette(S); }

// Dave would see a lot of his bathroom.
{ const S = sc(65, 0, { cam: "push", focus: "900 580" }); DS.room(S, { wall: "glass", floor: "gray", window: false });
  DS.shape(S, rrect(1280, 460, 220, 170, DS.r.sm), "white", { w: "mid", tone: 2, flat: true });
  DS.shape(S, circ(1400, 760, 150, 70), "white", { w: "mid", tone: 2, flat: true }); DS.shape(S, rrect(1290, 620, 220, 110, DS.r.md), "white", { w: "near" }); DS.shape(S, rrect(1320, 800, 160, 90, DS.r.sm), "white", { w: "mid", tone: 2 });
  S.draw(circ(1200, 560, 40), S.start, 0, { fill: WHITE, c: IK, w: DS.w.mid }); S.draw(circ(1200, 560, 12), S.start, 0, { c: IK, w: DS.w.detail });
  const F = paperDave(S, 640, 960, "near", { s: 1.4, look: 8, mood: "tired", pose: "hips" });
  wallClock(S, 900, 300, 100, 6, 0, { sweep: { t: S.start + 0.4, dur: 2.8, hours: 3 } });
  DS.vignette(S); }

// Drink far faster than your kidneys can keep up, and the extra water stays inside you.
{ const S = sc(66, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM);
  jug(S, 800, 900, 380, 560, { fill: "sky", level: 0.9, t: W(66, 1), dur: 4.5, marks: [] });
  DS.shape(S, rrect(780, 130, 40, 150, DS.r.xs), "gray", { tone: 1, w: "mid" }); DS.shape(S, rrect(740, 120, 140, 40, DS.r.sm), "gray", { w: "mid" });
  const st = S.grp(); S.fill(rect(790, 280, 20, 300), S.start, 0, DS.c("sky", 2), 0.85, st); fadeG(S, st, W(66, 1), 0.3);
  kidney(S, 1380, 760, 0.9, {}); S.draw("M1250 860 H1330", S.start, 0, { c: DS.c("gray", 2), w: DS.w.near });
  card(S, "TOO FAST", 400, 320, { t: W(66, 1) }); card(S, "KIDNEYS", 1380, 540, { t: W(66, 5) }); card(S, "STAYS INSIDE", 400, 520, { t: W(66, 12) });
  DS.vignette(S); }

// It dilutes the salt in your blood. Doctors call it hyponatremia.
{ const S = sc(66, 16, { cam: "push", focus: "960 560" }); DS.room(S, ROOM);
  const bx = 640, gy = 900, w = 400, h = 560;
  const bl = S.grp(); S.fill(rect(bx - w / 2 + 8, gy - h * 0.46, w - 16, h * 0.46 - 6), S.start, 0, DS.c("red", 1), 0.9, bl);
  const wt = S.grp(); S.fill(rect(bx - w / 2 + 8, gy - h * 0.92, w - 16, h * 0.92 - 6), S.start, 0, DS.c("sky", 2), 0.75, wt); scaleY(wt, W(66, 17), bx, gy - 6, 3.0, 0.5, 1);
  S.draw(`M${bx - w / 2} ${gy - h} L${bx - w / 2 + 8} ${gy} H${bx + w / 2 - 8} L${bx + w / 2} ${gy - h}`, S.start, 0, { c: IK, w: DS.w.mid });
  for (let i = 0; i < 14; i++) { const x0 = bx - 120 + (i % 5) * 60, y0 = gy - 40 - Math.floor(i / 5) * 56, d = S.grp(); DS.shape(S, circ(x0, y0, 12), "white", { w: "detail", parent: d }); shift(d, W(66, 17), 3.0, [0, 0], [(i % 5 - 2) * 18, -(i % 3) * 80 - 40], "power1.inOut"); }
  card(S, "SALT IN YOUR BLOOD", 1290, 400, { t: W(66, 18) }); card(S, "HYPONATREMIA", 1290, 560, { t: W(66, 26), tc: "blue" });
  DS.vignette(S); }

// Water moves into your cells, and they swell.
{ const S = sc(67, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM);
  const cell = S.grp(); DS.shape(S, circ(860, 580, 200), "blue", { tone: 1, w: "near", parent: cell }); DS.shape(S, circ(810, 560, 62), "blue", { tone: 2, w: "mid", parent: cell });
  tl.fromTo(cell, { attr: { transform: "translate(860 580) scale(1) translate(-860 -580)" } }, { attr: { transform: "translate(860 580) scale(1.28) translate(-860 -580)" }, duration: 2.0, ease: "sine.inOut", immediateRender: false }, W(67, 0) + 0.5);
  [[420, 380], [380, 560], [420, 760]].forEach(([x, y], i) => { const d = S.grp(); dropP(S, x, y, 1.5, { parent: d }); fadeG(S, d, W(67, 0) + i * 0.4, 0.2); shift(d, W(67, 0) + i * 0.4 + 0.3, 1.6, [0, 0], [330, (580 - y) * 0.9], "power1.inOut"); tl.to(d, { opacity: 0, duration: 0.3 }, W(67, 0) + i * 0.4 + 1.6); });
  card(S, "CELLS SWELL", 860, 220, { t: W(67, 4) });
  DS.vignette(S); }

// In the brain, which is boxed in by the skull, that can be very dangerous.
{ const S = sc(67, 8, { cam: "push", focus: "960 560" }); DS.room(S, ROOM);
  DS.shape(S, rrect(660, 270, 600, 560, DS.r.lg), "sand", { tone: 1, w: "near" });
  DS.shape(S, rrect(700, 310, 520, 480, DS.r.md), "paper", { w: "mid", flat: true });
  const br = S.grp(); brainBlob(S, 960, 550, 3.0, { parent: br }); tl.fromTo(br, { attr: { transform: "translate(960 550) scale(0.94) translate(-960 -550)" } }, { attr: { transform: "translate(960 550) scale(1.04) translate(-960 -550)" }, duration: 3, ease: "sine.inOut", immediateRender: false }, W(67, 12));
  card(S, "BOXED IN BY THE SKULL", 960, 190, { t: W(67, 10) }); card(S, "NO ROOM TO SWELL", 960, 900, { t: W(67, 17), tc: "red", size: DS.type.caption });
  DS.vignette(S); }

// "Dave, I am a librarian. I do not want the library flooded." (Brain)
{ const S = sc(68, 0, { cam: "push", focus: "960 640" }); libraryRoom(S);
  const B = brainy(S, 840, 900, 1.7, { face: "worried", armL: "up", armR: "stop" }); B.talk(W(68, 0), END(68));
  const F = dave(S, 1500, 930, "near", { s: 1.15, look: -6, mood: "worried" });
  const wt = S.grp(); S.fill(rect(-200, 820, 2320, 600), S.start, 0, DS.c("sky", 2), 0.55, wt); S.draw(line([-200, 820], [2120, 820], 0), S.start, 0, { c: DS.c("blue", 1), w: DS.w.mid, parent: wt });
  tl.fromTo(wt, { attr: { transform: "translate(0 120)" } }, { attr: { transform: "translate(0 -10)" }, duration: END(68) - W(68, 0) - 0.4, ease: "power1.inOut", immediateRender: true }, W(68, 0));
  DS.vignette(S); }

// So even with no caffeine and no sugar, a hundred cans in one go would still be dangerous.
{ const S = sc(69, 0, { cam: "push", focus: "1000 600" }); kitchen(S, { hud: true });
  canGrid(S, GX - 80);
  card(S, "0 CAFFEINE", 420, 330, { t: W(69, 3), tc: "green" }); card(S, "0 SUGAR", 420, 470, { t: W(69, 6), tc: "green" });
  dropP(S, 1540, 470, 5, { t: W(69, 8) });
  card(S, "STILL DANGEROUS", 960, 250, { t: W(69, 15), tc: "red" });
  DS.vignette(S); }

// The scariest ingredient was never hidden in the small print. It was the very first word on the list.
{ const S = sc(70, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM);
  const L = labelSheet(S, 960, 540, 880, 620);
  txt(S, "1. WATER", L.x + 60, L.rows[0], { anchor: "start", size: DS.type.title });
  txt(S, "2. SUGAR", L.x + 60, L.rows[1], { anchor: "start", size: DS.type.body, c: DS.c("gray", 2) });
  [0, 1, 2].forEach((i) => S.draw(line([L.x + 50, L.rows[2] + 10 + i * 18], [L.x + 700 - i * 90, L.rows[2] + 10 + i * 18], 0), S.start, 0, { c: DS.c("gray", 1), w: DS.w.hair }));
  magnifier(S, L.x + 320, L.rows[2] + 20, 62, { t: W(70, 5) }); card(S, "SMALL PRINT", 1500, 800, { t: W(70, 7), size: DS.type.caption });
  S.draw(rrect(L.x + 24, L.rows[0] - 66, 800, 96, DS.r.md), W(70, 13), 0, { c: DS.c("red"), w: DS.w.near * 1.4 });
  card(S, "THE FIRST WORD", 1500, 330, { t: W(70, 13), tc: "red" });
  DS.vignette(S); }

// ===================== 7. Waiting for a seat =====================
// So what would happen if you drank a hundred energy drinks? You would never get anywhere near a hundred.
{ const S = sc(71, 0, { cam: "push", focus: "960 600" }); DS.room(S, ROOM);
  const T = trackOf(S);
  mini(S, T.xAt(5), TRK.y + 40, 1.7); card(S, "DAVE", T.xAt(5) + 30, 410, { t: S.start, size: DS.type.small });
  xMark(S, TRK.x1 + 55, TRK.y - 100, 1.1, W(71, 13));
  card(S, "NEVER NEAR 100", 960, 190, { t: W(71, 13), tc: "red" });
  DS.vignette(S); }

// Every can stacks up another reason to stop. The caffeine limit, the heart, the sleep, the sugar, and finally the water itself.
{ const S = sc(72, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM);
  const F = paperDave(S, 260, 960, "near", { s: 1.0, look: 8, mood: "tired" });
  [[700, 300, "limit", -4], [1060, 270, "heart", 3], [1420, 320, "sleep", -2], [880, 560, "sugar", 2], [1260, 600, "water", -3]].forEach(([x, y, k, r], i) => sticky(S, x, y, NOTES[k], { k: 1.5, size: DS.type.small, rot: r, t: [W(72, 9), W(72, 12), W(72, 14), W(72, 16), W(72, 20)][i] }));
  card(S, "REASONS TO STOP", 960, 130, { t: W(72, 1) });
  DS.vignette(S); }

// Off the paper, Dave only ever opened one can. He carries the other ninety-nine back to the fridge.
{ const S = sc(73, 0, { cam: "push", focus: "800 600" }); kitchen(S, { hud: true, fridge: "open" });
  const F = paperDave(S, 1180, 960, "near", { s: 1.4, look: -8, mood: "smile", pose: "hold", tOut: W(73, 2) });
  const G = canGrid(S, GX, { dyn: true }); for (let r = 0; r < 9; r++) tl.set(G.rows[r], { opacity: 0 }, W(73, 10) + r * 0.25); for (let c = 0; c < 10; c++) if (c !== 5) G.gone(90 + c, W(73, 10) + 9 * 0.25);
  const tray = S.grp(); DS.shape(S, rrect(1110, 800, 200, 24, DS.r.xs), "wood", { w: "mid", parent: tray }); [0, 1, 2, 3].forEach((i) => can(S, 1140 + i * 46, 800, 0.9, { parent: tray })); fadeG(S, tray, W(73, 9), 0.3);
  F.walk(W(73, 9), 2.6, { x: -520 }); shift(tray, W(73, 9), 2.6, [0, 0], [-520, 0], "none");
  hud(S, { cans: [1, 1], notes: 5 });
  card(S, "ONE CAN", 1000, 540, { t: W(73, 6) }); card(S, "99 BACK", 700, 300, { t: W(73, 13), tc: "green" });
  DS.vignette(S); }

// Around eleven, most of the caffeine has drifted out of the chairs.
{ const S = sc(74, 0, { cam: "push", focus: "960 620" }); libraryRoom(S);
  [0, 1, 2, 3, 4].forEach((i) => { const c = chair(S, 460 + i * 250, 880, 1.4); const v = visitor(S, c.x, c.seatY, 1.4, { kind: "caf", sit: true }); drift(S, v.g, W(74, 5) + i * 0.2, -160, 1.0); });
  wallClock(S, 1500, 330, 100, 11, 0);
  card(S, "ABOUT ELEVEN", 960, 200, { t: W(74, 1) });
  DS.vignette(S); }

// And the tiredness that's been waiting in the corridor all evening walks in and sits down.
{ const S = sc(75, 0, { cam: "push", focus: "960 620" }); libraryRoom(S);
  [0, 1, 2, 3, 4].forEach((i) => { const c = chair(S, 460 + i * 250, 880, 1.4); const v = visitor(S, c.x, c.seatY, 1.4, { kind: "ado", sit: true, parent: S.grp() }); slideIn(S, v.g, W(75, 10) + i * 0.3, 1740 - c.x, 0, 1.0); });
  card(S, "THE TIREDNESS", 960, 200, { t: W(75, 2), tc: "purple" });
  DS.vignette(S); }

// "Finally. Quiet, please. The library is closing now." (Brain)
{ const S = sc(76, 0, { cam: "push", focus: "1000 620" }); libraryRoom(S);
  [0, 1, 2, 3].forEach((i) => { const c = chair(S, 360 + i * 230, 900, 1.3); visitor(S, c.x, c.seatY, 1.3, { kind: "ado", sit: true }); });
  const B = brainy(S, 1420, 960, 1.9, { face: "shh", armR: "shush", armL: "hip" }); B.talk(W(76, 0), END(76)); B.face(W(76, 0), "tired"); B.face(W(76, 3), "shh");
  card(S, "CLOSING", 960, 200, { t: W(76, 5), size: DS.type.title });
  DS.vignette(S); }

// Dave lined up a hundred cans so he would never be tired again.
{ const S = sc(77, 0, { cam: "push", focus: "800 560" }); kitchen(S);
  const F = dave(S, 300, 960, "near", { s: 1.4, look: 8, mood: "smile" });
  const g = S.grp(); S.thought(1080, 340, 400, 210, 460, 520, S.start, 0.3, { parent: g });
  const gw = S.grp(g); canGrid(S, 1080, { parent: gw }); gw.setAttribute("transform", "translate(0 -430) translate(1080 800) scale(0.8) translate(-1080 -800)");
  fadeG(S, g, W(77, 3), 0.5);
  DS.vignette(S); }

// But the tiredness was there all along.
{ const S = sc(78, 0, { cam: "push", focus: "900 600" }); DS.room(S, NITE); nightWindow(S, 820, 150);
  const v = visitor(S, 900, 940, 1.6, { kind: "ado" }); fadeG(S, v.g, W(78, 2), 0.8);
  const F = dave(S, 760, 960, "near", { s: 1.5, look: 4, mood: "tired" });
  card(S, "THE TIREDNESS", 1250, 520, { t: W(78, 2), tc: "purple" });
  DS.vignette(S); }

// It was just waiting for a seat.
{ const S = sc(79, 0, { cam: "pull", focus: "960 600" }); DS.room(S, NITE); nightWindow(S, 820, 150);
  const A = armchair(S, 720, 980, 1.5, { name: "green" }), A2 = armchair(S, 1220, 980, 1.5, { name: "green" });
  const F = dave(S, 720, A.seatY, "near", { s: 1.15, look: 4, mood: "sleep", sit: true });
  const v = visitor(S, 1220, A2.seatY, 1.5, { kind: "ado", sit: true, parent: S.grp() }); slideIn(S, v.g, W(79, 5), 360, 0, 1.4);
  DS.vignette(S); }
