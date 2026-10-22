// look: still
// What If You Used 100% of Your Brain? (~8 min). What-if escalation: Dave wants the other ninety percent. Runner: the DIAL on the back of Dave's head (10% sticker):
// needle 10 -> 20 -> 50 -> 100 -> back to 10, then the sticker is peeled and "practice" is underneath. Second runner: Dave's head as a house at night, a few windows lit,
// lights move room to room, never all on at once. New recurring character: Dave's Brain (brainy()), a small pink librarian brain; she pops out from behind Dave's head.
// VISUAL SAFETY: nothing flashes or strobes. "Everything at once" beats use slow (1.4-2 s) soft fades or a tripped fuse box; neurons sway in step, they never blink.
// Real people (James, Thomas, Lennie, Quiroga, Woollett, Maguire, the actress) are name cards on generic figures, never likenesses.
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

// ---------- neuron (blue) / librarian neuron (pink, glasses); axon = [dx, dy] to its end; lit(t) = soft yellow glow, never a flash ----------
const neuron = (S, cx, cy, k = 1, o = {}) => {
  const g = S.grp(o.parent), name = o.name || "blue", w = Math.max(3, 5 * Math.sqrt(k)), INKC = DS.P.ink[0], t0 = o.t, dc = DS.c(name, 2), n = o.arms ?? 6;
  for (let i = 0; i < n; i++) {
    const a = (o.a0 ?? 200) + (i / Math.max(1, n - 1)) * (o.span ?? 320), c = Math.cos((a * Math.PI) / 180), s = Math.sin((a * Math.PI) / 180), L = (62 + (i % 3) * 18) * k;
    const x1 = cx + c * 34 * k, y1 = cy + s * 34 * k, x2 = cx + c * (34 * k + L), y2 = cy + s * (34 * k + L);
    S.draw(`M${f1(x1)} ${f1(y1)} L${f1(x2)} ${f1(y2)} M${f1(x2)} ${f1(y2)} L${f1(x2 + Math.cos(((a + 32) * Math.PI) / 180) * 26 * k)} ${f1(y2 + Math.sin(((a + 32) * Math.PI) / 180) * 26 * k)} M${f1(x2)} ${f1(y2)} L${f1(x2 + Math.cos(((a - 32) * Math.PI) / 180) * 26 * k)} ${f1(y2 + Math.sin(((a - 32) * Math.PI) / 180) * 26 * k)}`, t0 ?? S.start, 0, { c: dc, w: w * 0.8, parent: g });
  }
  if (o.axon) { const [dx, dy] = o.axon; S.draw(`M${cx + 30 * k} ${cy + 10 * k} Q${cx + dx * 0.5} ${cy + dy * 0.5 + 40 * k} ${cx + dx} ${cy + dy}`, t0 ?? S.start, 0, { c: dc, w: w * 1.1, parent: g }); S.draw(circ(cx + dx, cy + dy, 9 * k), t0 ?? S.start, 0, { fill: DS.c(name, 1), c: dc, w: w * 0.6, parent: g }); }
  DS.shape(S, circ(cx, cy, 34 * k), name, { parent: g, t: t0, flat: true, tone: 1, w: "mid" });
  S.draw(circ(cx - 3 * k, cy + 2 * k, 11 * k), t0 ?? S.start, 0, { fill: DS.c(name, 2), c: dc, w: w * 0.4, parent: g });
  const ov = el("path", { d: circ(cx, cy, 34 * k), fill: DS.c("yellow", 1), opacity: 0 }, g), ring = el("path", { d: circ(cx, cy, 46 * k), fill: "none", stroke: DS.c("gold", 0), "stroke-width": w, opacity: 0 }, g);
  if (o.lib) { [-1, 1].forEach((sd) => S.draw(circ(cx + sd * 15 * k, cy - 4 * k, 11 * k), t0 ?? S.start, 0, { fill: DS.c("glass", 1), c: INKC, w: w * 0.5, parent: g })); S.draw(`M${cx - 4 * k} ${cy - 6 * k} L${cx + 4 * k} ${cy - 6 * k}`, t0 ?? S.start, 0, { c: INKC, w: w * 0.5, parent: g }); S.draw(circ(cx - 15 * k, cy - 3 * k, 3 * k), t0 ?? S.start, 0, { fill: INKC, c: INKC, w: DS.w.hair, parent: g }); S.draw(circ(cx + 15 * k, cy - 3 * k, 3 * k), t0 ?? S.start, 0, { fill: INKC, c: INKC, w: DS.w.hair, parent: g }); }
  if (o.eyes) { [-1, 1].forEach((sd) => { S.draw(circ(cx + sd * 12 * k, cy - 6 * k, 8 * k), t0 ?? S.start, 0, { fill: DS.P.white[0], c: INKC, w: w * 0.4, parent: g }); S.draw(circ(cx + sd * 12 * k + (o.look || 0) * 3 * k, cy - 5 * k, 3.4 * k), t0 ?? S.start, 0, { fill: INKC, c: INKC, w: DS.w.hair, parent: g }); }); S.draw(`M${cx - 8 * k} ${cy + 14 * k} Q${cx} ${cy + (o.sad ? 10 : 19) * k} ${cx + 8 * k} ${cy + 14 * k}`, t0 ?? S.start, 0, { c: INKC, w: w * 0.5, parent: g }); }
  const N = { g, cx, cy, r: 34 * k };
  N.lit = (t, dur = 0.8) => { tl.fromTo(ov, { opacity: 0 }, { opacity: 0.9, duration: dur, ease: "sine.inOut", immediateRender: false }, t); tl.fromTo(ring, { opacity: 0 }, { opacity: 1, duration: dur, ease: "sine.inOut", immediateRender: false }, t); return N; };
  N.dim = (t, dur = 0.8) => { tl.to(ov, { opacity: 0, duration: dur }, t); tl.to(ring, { opacity: 0, duration: dur }, t); return N; };
  N.on = () => { ov.setAttribute("opacity", 0.9); ring.setAttribute("opacity", 1); return N; };
  return N;
};

// ---------- a brain in profile (front = right): cerebrum, cerebellum, stem, folds, four lightable regions, a hippocampus ----------
const brainOrg = (S, cx, cy, k = 1, o = {}) => {
  const g = S.grp(o.parent), w = Math.max(3, 6 * Math.sqrt(k)), wd = Math.max(2, 3 * Math.sqrt(k)), INKC = DS.P.ink[0], t0 = o.t, name = o.name || "pink";
  const X = (v) => cx + v * k, Y = (v) => cy + v * k;
  const pts = []; for (let i = 0; i <= 30; i++) { const a = (i / 28) * Math.PI * 2, r = 1 + 0.035 * Math.cos(14 * a); pts.push([X(Math.cos(a) * 150 * r * (1 + 0.05 * Math.cos(a))), Y(Math.sin(a) * 105 * r)]); }
  const outline = smooth(pts);
  S.draw(`M${X(-34)} ${Y(80)} Q${X(-20)} ${Y(150)} ${X(-6)} ${Y(190)} L${X(30)} ${Y(188)} Q${X(24)} ${Y(140)} ${X(30)} ${Y(80)} Z`, t0 ?? S.start, 0, { fill: DS.c(name, 2), c: INKC, w, parent: g }); // stem
  S.draw(circ(X(-78), Y(92), 64 * k, 38 * k), t0 ?? S.start, 0, { fill: DS.c(name, 2), c: INKC, w, parent: g }); // cerebellum
  S.draw(outline, t0 ?? S.start, 0, { fill: DS.vol(name), c: INKC, w, parent: g });
  const folds = [[[14, -104], [22, -70], [6, -40], [18, -10]], [[132, 34], [96, 22], [52, 28], [10, 4], [-30, -10]], [[-110, -40], [-84, -58], [-60, -40], [-36, -56]], [[40, -86], [66, -70], [90, -80], [110, -60]], [[-100, 20], [-76, 6], [-56, 26], [-30, 14]], [[56, 62], [80, 50], [104, 66]], [[-30, 60], [-6, 48], [18, 64], [40, 52]], [[70, -30], [92, -16], [118, -26]]];
  const fg = S.grp(g); folds.forEach((p) => S.draw(smooth(p.map(([a, b]) => [X(a), Y(b)])), t0 ?? S.start, 0, { c: DS.c(name, 2), w: wd, parent: fg }));
  S.draw(`M${X(-110)} ${Y(104)} Q${X(-80)} ${Y(112)} ${X(-48)} ${Y(104)} M${X(-100)} ${Y(86)} Q${X(-78)} ${Y(94)} ${X(-52)} ${Y(86)}`, t0 ?? S.start, 0, { c: INKC, w: wd, parent: g });
  const clipG = clipTo(S.grp(g), outline), regs = [[X(86), Y(-20), 66 * k, 78 * k], [X(-4), Y(-62), 84 * k, 40 * k], [X(-100), Y(-6), 52 * k, 74 * k], [X(24), Y(62), 96 * k, 36 * k]];
  const B = { g, cx, cy, k, outline, regs: [], regC: regs, X, Y };
  regs.forEach(([x, y, rx, ry], i) => { const p = el("path", { d: circ(x, y, rx, ry), fill: DS.c(["blue", "green", "orange", "purple"][i], 0), opacity: 0 }, clipG); B.regs.push(p); });
  // gentle light on a region: fades in over dur, stays unless off() is called (never a flash)
  B.region = (i, t, dur = 0.8, c) => { if (c) B.regs[i].setAttribute("fill", c); tl.fromTo(B.regs[i], { opacity: 0 }, { opacity: 0.62, duration: dur, ease: "sine.inOut", immediateRender: false }, t); return B; };
  B.off = (i, t, dur = 0.8) => { tl.to(B.regs[i], { opacity: 0, duration: dur }, t); return B; };
  B.all = (t, dur, c = DS.c("yellow", 1)) => { const p = el("path", { d: outline, fill: c, opacity: 0 }, g); tl.fromTo(p, { opacity: 0 }, { opacity: 0.55, duration: dur, ease: "sine.inOut", immediateRender: false }, t); return p; };
  // hippocampus: a thick curved bar low in the temporal lobe; grow(t, dur, kk) scales it about its tail
  const hp = [[X(76), Y(58)], [X(44), Y(66)], [X(10), Y(56)], [X(-18), Y(34)], [X(-34), Y(8)]], hd = smooth(hp), hg = S.grp(g);
  B.hippo = (t, c = "green") => { S.draw(hd, t ?? S.start, 0, { c: INKC, w: Math.sqrt(k) * 22, parent: hg }); S.draw(hd, t ?? S.start, 0, { c: DS.c(c, 0), w: Math.sqrt(k) * 12, parent: hg }); S.draw(circ(X(-34), Y(8), 8 * k), t ?? S.start, 0, { fill: DS.c(c, 1), c: INKC, w: wd, parent: hg }); return B; };
  B.grow = (t, dur, kk) => { const tf = (v) => `translate(${X(-34)} ${Y(8)}) scale(${v}) translate(${-X(-34)} ${-Y(8)})`; tl.fromTo(hg, { attr: { transform: tf(1) } }, { attr: { transform: tf(kk) }, duration: dur, ease: "power2.inOut", immediateRender: false }, t); return B; };
  B.hg = hg;
  return B;
};

// ---------- the dial: needle 0..100 sweeps -120..+120 degrees; a yellow "10%" sticker sits over the lower half, "practice" is printed under it ----------
const dial = (S, cx, cy, r, o = {}) => {
  const g = S.grp(o.parent), INKC = DS.P.ink[0], w = Math.max(3, DS.w.near * (r / 200)), wd = Math.max(2, DS.w.detail * (r / 200)), a0 = -120, ang = (v) => a0 + 2.4 * v, rot = (v) => `rotate(${ang(v)} ${cx} ${cy})`;
  DS.drop(S, circ(cx + 8, cy + 12, r), { t: o.t, parent: g });
  DS.shape(S, circ(cx, cy, r), "gray", { parent: g, t: o.t, tone: 1, w: "near" });
  DS.shape(S, circ(cx, cy, r * 0.86), "paper", { parent: g, t: o.t, flat: true, w: "detail" });
  const pt = (v, f) => [cx + Math.sin((ang(v) * Math.PI) / 180) * r * f, cy - Math.cos((ang(v) * Math.PI) / 180) * r * f];
  S.draw(smooth(Array.from({ length: 11 }, (_, i) => pt(80 + i * 2, 0.76))), o.t ?? S.start, 0, { c: DS.c("red"), w: w * 1.6, parent: g });
  for (let v = 0; v <= 100; v += 10) { const [x1, y1] = pt(v, 0.78), [x2, y2] = pt(v, v % 50 === 0 ? 0.62 : 0.68); S.draw(`M${f1(x1)} ${f1(y1)} L${f1(x2)} ${f1(y2)}`, o.t ?? S.start, 0, { c: INKC, w: v % 50 === 0 ? w * 0.8 : wd, parent: g }); }
  if (r >= 150) [[10, "10"], [20, "20"], [50, "50"], [100, "100"]].forEach(([v, s]) => { const [x, y] = pt(v, 0.5); S.text(s, x, y + DS.type.caption * 0.34, { size: DS.type.caption, c: INKC, t: o.t ?? T0(S), parent: g }); });
  // "practice", printed under the sticker
  if (o.practice !== undefined) S.text("practice", cx, cy + r * 0.56 + 14, { size: DS.type.caption, c: INKC, font: "caveat", t: o.practice, parent: g });
  const nd = S.grp(g); S.draw(`M${cx} ${cy + r * 0.12} L${cx} ${cy - r * 0.7}`, o.t ?? S.start, 0, { c: INKC, w: w * 1.15, parent: nd }); S.draw(`M${cx - r * 0.05} ${cy - r * 0.58} L${cx} ${cy - r * 0.74} L${cx + r * 0.05} ${cy - r * 0.58} Z`, o.t ?? S.start, 0, { fill: DS.c("red"), c: DS.c("red"), w: DS.w.hair, parent: nd });
  nd.setAttribute("transform", rot(o.v ?? 10)); let cur = o.v ?? 10;
  const sticker = S.grp(g), sw = r * 0.92, sh = r * 0.36, sx = cx - sw / 2, sy = cy + r * 0.36;
  if (o.sticker !== false) { DS.drop(S, rrect(sx + 4, sy + 6, sw, sh, DS.r.xs), { t: o.t, parent: sticker }); DS.shape(S, rrect(sx, sy, sw, sh, DS.r.xs), "yellow", { t: o.t, parent: sticker, flat: true, w: "detail", tone: 0 }); if (r >= 100) { const fs = r >= 190 ? DS.type.title : r >= 150 ? DS.type.body : DS.type.caption; S.text("10%", cx, sy + sh * 0.5 + fs * 0.3, { size: fs, c: INKC, t: o.t ?? T0(S), parent: sticker }); } }
  DS.shape(S, circ(cx, cy, r * 0.1), "ink", { parent: g, t: o.t, w: "detail" });
  const D = { g, cx, cy, r, sticker };
  D.set = (t, v, dur = 0.9, ease = "power2.inOut") => { tl.fromTo(nd, { attr: { transform: rot(cur) } }, { attr: { transform: rot(v) }, duration: dur, ease, immediateRender: false }, t); cur = v; return D; };
  // peel: the sticker lifts from its top-left corner, curls away and falls off the dial
  D.peel = (t, dur = 1.0) => { const px = sx, py = sy, tf = (a, dx, dy) => `translate(${dx} ${dy}) rotate(${a} ${px} ${py})`; tl.fromTo(sticker, { attr: { transform: tf(0, 0, 0) } }, { attr: { transform: tf(-34, 0, 0) }, duration: dur * 0.55, ease: "power2.out", immediateRender: false }, t); tl.to(sticker, { attr: { transform: tf(-70, -60, r * 1.4) }, opacity: 0, duration: dur * 0.6, ease: "power2.in" }, t + dur * 0.5); return D; };
  return D;
};

// Dave seen from behind: a full-hair head, hands up at the head, a small dial on the back of it
const daveBack = (S, x, gy, s = 1.5, o = {}) => {
  const g = S.grp(), F = S.fig(x, gy, Object.assign({ s, hair: "none", outfit: "tee", outfitC: DS.c("blue"), pose: o.pose || "stand", w: DS.w.near * 1.3 * Math.sqrt(s), parent: g }, o.fig || {})).draw(S.start, 0.4);
  DS.shadow(S, x, gy, 150 * s, { parent: g });
  const hc = DS.shape(S, circ(F.hd[0], F.hd[1], F.r * 1.03), "brown", { w: "near", parent: g }); F.P.body.parentNode.insertBefore(hc, F.P.body);
  const sw = DS.shape(S, `M${F.hd[0] - F.r * 0.9} ${F.hd[1] - F.r * 0.45} Q${F.hd[0]} ${F.hd[1] - F.r * 1.1} ${F.hd[0] + F.r * 0.9} ${F.hd[1] - F.r * 0.45}`, "brown", { tone: 1, w: "hair", parent: g }); F.P.body.parentNode.insertBefore(sw, F.P.body);
  F.all = g; F.dialAt = [F.hd[0], F.hd[1] + F.r * 0.05]; F.dialR = F.r * 0.62;
  return F;
};
// close-up of the back of Dave's head filling the lower frame, with a big dial on it (call after DS.room). Returns the dial
const dialClose = (S, v = 10, o = {}) => {
  const cx = 960, cy = 850, R = 470;
  [-1, 1].forEach((sd) => DS.shape(S, circ(cx + sd * (R - 6), cy - 60, 44, 66), "paper", { w: "mid", flat: true }));
  DS.shadow(S, cx, 1010, 1100, { op: 0.16 });
  DS.shape(S, circ(cx, cy, R), "brown", { w: "near" });
  [[-250, -240, -120, -330], [-60, -300, 70, -360], [150, -270, 260, -330], [-330, -80, -400, -190], [330, -90, 410, -200]].forEach(([x1, y1, x2, y2]) => S.draw(smooth([[cx + x1, cy + y1], [cx + (x1 + x2) / 2 - 20, cy + (y1 + y2) / 2 + 24], [cx + x2, cy + y2]]), S.start, 0, { c: DS.c("brown", 1), w: DS.w.mid }));
  return dial(S, cx, 600, o.r || 200, { v, sticker: o.sticker, practice: o.practice });
};

// ---------- a house at night = Dave's head: windows are rooms; lit(i, t0, t1) fades a room's light on and off (never a flash) ----------
const houseHead = (S, cx, cy, k = 1, o = {}) => {
  const g = S.grp(o.parent), cols = o.cols || 3, rows = o.rows || 2, Wd = (cols * 120 + 70) * k, Hh = (rows * 130 + 70) * k, x0 = cx - Wd / 2, y0 = cy - Hh / 2, INKC = DS.P.ink[0];
  DS.drop(S, rect(x0 + 10, y0 + 14, Wd, Hh), { t: o.t, parent: g });
  DS.shape(S, rect(x0 + Wd * 0.72, y0 - 190 * k, 54 * k, 130 * k), "earth", { w: "mid", t: o.t, parent: g });
  DS.shape(S, `M${x0 - 36 * k} ${y0 + 2} L${cx} ${y0 - 170 * k} L${x0 + Wd + 36 * k} ${y0 + 2} Z`, "brown", { w: "near", t: o.t, parent: g });
  DS.shape(S, rrect(x0, y0, Wd, Hh, DS.r.sm), "wall", { w: "near", t: o.t, parent: g });
  DS.shape(S, rrect(cx - 38 * k, y0 + Hh - 112 * k, 76 * k, 112 * k, DS.r.xs), "wood", { w: "mid", t: o.t, parent: g });
  const win = [], ov = [], gl = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const wx = x0 + 35 * k + c * 120 * k, wy = y0 + 35 * k + r * 130 * k, ww = 80 * k, wh = 90 * k;
    if (r === rows - 1 && c === Math.floor(cols / 2) && cols % 2 === 1) continue; // the door sits here
    win.push({ x: wx, y: wy, w: ww, h: wh, cx: wx + ww / 2, cy: wy + wh / 2 });
  }
  win.forEach((q) => {
    DS.shape(S, rect(q.x, q.y, q.w, q.h), "navy", { w: "mid", t: o.t, parent: g, tone: 1, flat: true });
    gl.push(el("path", { d: circ(q.cx, q.cy, 120 * k), fill: DS.glow(DS.c("yellow", 1), 0.5), opacity: 0 }, g));
    ov.push(el("path", { d: rect(q.x, q.y, q.w, q.h), fill: DS.c("yellow", 0), opacity: 0 }, g));
    S.draw(`M${q.cx} ${q.y} V${q.y + q.h} M${q.x} ${q.cy} H${q.x + q.w} M${q.x} ${q.y} H${q.x + q.w} V${q.y + q.h} H${q.x} Z`, o.t ?? S.start, 0, { c: INKC, w: DS.w.mid, parent: g });
  });
  const H = { g, win, ov, x0, y0, Wd, Hh, cx, cy, k };
  H.lit = (i, t0, t1, fade = 0.6) => { [ov[i], gl[i]].forEach((e, j) => { const top = j ? 0.9 : 1; if (t0 <= S.start + 0.05) e.setAttribute("opacity", top); else tl.fromTo(e, { opacity: 0 }, { opacity: top, duration: fade, ease: "sine.inOut", immediateRender: false }, t0); if (t1 !== undefined) tl.to(e, { opacity: 0, duration: fade, ease: "sine.inOut" }, t1); }); return H; };
  return H;
};
const NIGHT = { hy: 640, sky: "night", hills: "navy", ground: "navy", sun: false };
const nightSky = (S, moon = true) => { [[160, 140], [420, 90], [700, 200], [1010, 110], [1300, 190], [1580, 100], [1790, 230], [240, 330], [1700, 380], [60, 450]].forEach(([x, y]) => S.fill(circ(x, y, 4), S.start, 0, DS.P.white[0], 0.85)); if (moon) { S.fill(circ(1640, 190, 70), S.start, 0, DS.glow(DS.c("yellow", 1), 0.6), 1); S.fill(circ(1640, 190, 50), S.start, 0, DS.c("yellow", 1), 1); } };

// ---------- piano (88 keys = 52 white + 36 black) and a cat ----------
const piano = (S, x0, y0, wd, ht, o = {}) => {
  const g = S.grp(o.parent), n = 52, kw = wd / n, keys = [], ov = [];
  DS.drop(S, rect(x0 + 8, y0 + 12, wd, ht), { t: o.t, parent: g });
  for (let i = 0; i < n; i++) { keys.push(x0 + i * kw); DS.shape(S, rect(x0 + i * kw, y0, kw, ht), "white", { flat: true, w: "hair", t: o.t, parent: g }); ov.push(el("path", { d: rect(x0 + i * kw, y0, kw, ht), fill: DS.c(o.lc || "orange", 1), opacity: 0 }, g)); }
  let blacks = 0;
  for (let i = 0; i < n - 1; i++) if ([0, 2, 3, 5, 6].includes(i % 7)) { blacks++; DS.shape(S, rect(x0 + (i + 1) * kw - kw * 0.3, y0, kw * 0.6, ht * 0.62), "ink", { w: "hair", t: o.t, parent: g }); }
  S.draw(rect(x0, y0, wd, ht), o.t ?? S.start, 0, { c: DS.P.ink[0], w: DS.w.mid, parent: g });
  const P = { g, kw, n, blacks, ov, x0, y0, wd, ht };
  P.on = (i, t, dur = 0.5, off) => { tl.fromTo(ov[i], { opacity: 0 }, { opacity: 0.8, duration: dur, ease: "sine.inOut", immediateRender: false }, t); if (off !== undefined) tl.to(ov[i], { opacity: 0, duration: dur }, off); return P; };
  return P;
};
const catSit = (S, x, gy, k = 1, o = {}) => {
  const g = S.grp(o.parent), w = Math.max(3, 6 * Math.sqrt(k)), INKC = DS.P.ink[0], X = (v) => x + v * k, Y = (v) => gy + v * k, t = o.t;
  S.draw(smooth([[X(60), Y(-20)], [X(120), Y(-30)], [X(130), Y(-90)], [X(100), Y(-130)]]), t ?? S.start, 0, { c: INKC, w: w * 2.2, parent: g });
  S.draw(smooth([[X(60), Y(-20)], [X(120), Y(-30)], [X(130), Y(-90)], [X(100), Y(-130)]]), t ?? S.start, 0, { c: DS.c("orange", 0), w: w * 1.3, parent: g });
  DS.shape(S, `M${X(-60)} ${Y(0)} Q${X(-70)} ${Y(-110)} ${X(-20)} ${Y(-150)} Q${X(20)} ${Y(-170)} ${X(50)} ${Y(-120)} Q${X(80)} ${Y(-40)} ${X(70)} ${Y(0)} Z`, "orange", { w: "near", t, parent: g });
  DS.shape(S, `M${X(-52)} ${Y(-185)} L${X(-46)} ${Y(-232)} L${X(-14)} ${Y(-198)} L${X(14)} ${Y(-198)} L${X(46)} ${Y(-232)} L${X(52)} ${Y(-185)} Q${X(60)} ${Y(-130)} ${X(0)} ${Y(-124)} Q${X(-60)} ${Y(-130)} ${X(-52)} ${Y(-185)} Z`, "orange", { w: "near", t, parent: g });
  [-1, 1].forEach((sd) => { S.draw(circ(X(sd * 22), Y(-170), 7 * k, 9 * k), t ?? S.start, 0, { fill: DS.c("green", 1), c: INKC, w: w * 0.5, parent: g }); S.draw(`M${X(sd * 22)} ${Y(-178)} V${Y(-162)}`, t ?? S.start, 0, { c: INKC, w: w * 0.6, parent: g }); });
  S.draw(`M${X(-6)} ${Y(-150)} L${X(6)} ${Y(-150)} L${X(0)} ${Y(-142)} Z M${X(-30)} ${Y(-146)} L${X(-60)} ${Y(-152)} M${X(-30)} ${Y(-140)} L${X(-60)} ${Y(-136)} M${X(30)} ${Y(-146)} L${X(60)} ${Y(-152)} M${X(30)} ${Y(-140)} L${X(60)} ${Y(-136)}`, t ?? S.start, 0, { c: INKC, w: w * 0.5, parent: g });
  return g;
};

// ---------- small pieces used across scenes ----------
const pie = (S, cx, cy, r, frac, o = {}) => {
  const g = S.grp(o.parent), p = arcPts(cx, cy, r, -90, -90 + 360 * frac, Math.max(8, Math.round(70 * frac)));
  DS.shape(S, circ(cx, cy, r), "white", { flat: true, w: "mid", parent: g, t: o.t });
  DS.shape(S, `M${cx} ${cy} ` + p.map(([x, y]) => `L${f1(x)} ${f1(y)}`).join(" ") + " Z", o.c || "red", { w: "mid", parent: g, t: o.t });
  return g;
};
const woman = { hair: "bun", hairC: DS.c("brown", 2), outfitC: DS.c("purple") };
const WOMAN2 = { s: 1.1, hair: "curly", hairC: DS.c("ink", 1), outfitC: DS.c("pink") };
const PROF = { s: 1.1, hair: "none", outfitC: DS.c("earth", 2), tieC: "red", specs: true };
const COAT = { s: 1.1, hair: "side", hairC: DS.c("ink", 1), outfitC: DS.c("white", 2), tieC: "navy", specs: true };
const DOC = { s: 1.1, hair: "bun", hairC: DS.c("ink", 1), outfitC: DS.c("white", 2) };
const tinyBook = (S, cx, cy, wd, ht, name, o = {}) => { const g = S.grp(o.parent); DS.drop(S, rrect(cx - wd / 2 + 6, cy - ht / 2 + 8, wd, ht, DS.r.xs), { t: o.t, parent: g }); DS.shape(S, rrect(cx - wd / 2, cy - ht / 2, wd, ht, DS.r.xs), name, { t: o.t, w: "detail", parent: g }); DS.shape(S, rect(cx - wd / 2, cy - ht / 2, 12, ht), name, { t: o.t, w: "hair", parent: g, tone: 2, flat: true }); return g; };
const shelf = (S, x0, y0, wd, rows, o = {}) => { const names = ["red", "blue", "green", "orange", "purple", "gold", "earth", "pink"]; for (let r = 0; r < rows; r++) { const y = y0 + r * 150; DS.shape(S, rect(x0 - 10, y + 138, wd + 20, 16), "wood", { w: "detail", flat: true }); let x = x0, i = r * 3; while (x < x0 + wd - 40) { const bw = 34 + ((i * 7) % 4) * 8, bh = 90 + ((i * 11) % 5) * 10; DS.shape(S, rect(x, y + 138 - bh, bw, bh), names[(i * 5) % 8], { w: "detail", flat: true, tone: (i % 3 === 0) ? 1 : 0 }); x += bw + 2; i++; } } };
const bulbIcon = (S, cx, cy, k, o = {}) => { const g = S.grp(o.parent); if (o.glow !== false) S.fill(circ(cx, cy - 20 * k, 130 * k), o.t ?? S.start, 0, DS.glow(DS.c("yellow", 1), 0.55), 1, g); DS.shape(S, `M${cx - 30 * k} ${cy + 36 * k} Q${cx - 70 * k} ${cy - 10 * k} ${cx - 56 * k} ${cy - 56 * k} Q${cx} ${cy - 120 * k} ${cx + 56 * k} ${cy - 56 * k} Q${cx + 70 * k} ${cy - 10 * k} ${cx + 30 * k} ${cy + 36 * k} Z`, o.name || "yellow", { t: o.t, w: "mid", parent: g }); DS.shape(S, rrect(cx - 28 * k, cy + 36 * k, 56 * k, 36 * k, DS.r.xs), "gray", { t: o.t, w: "mid", parent: g }); S.draw(`M${cx - 14 * k} ${cy + 20 * k} L${cx - 14 * k} ${cy - 20 * k} L${cx} ${cy} L${cx + 14 * k} ${cy - 20 * k} L${cx + 14 * k} ${cy + 20 * k}`, o.t ?? S.start, 0, { c: DS.c("orange", 2), w: DS.w.detail, parent: g }); return g; };
const wire = (S, x, y, wd, ht, name, o = {}) => { const g = S.grp(o.parent); DS.shape(S, rrect(x, y, wd, ht, DS.r.sm), name, { t: o.t, w: "mid", parent: g }); return g; };
const spoon = (S, cx, cy, k = 1, o = {}) => { const g = S.grp(o.parent), bowl = S.grp(g); S.draw(`M${cx} ${cy} L${cx} ${cy + 190 * k}`, o.t ?? S.start, 0, { c: DS.c("gray", 2), w: DS.w.near * 1.8 * k, parent: g }); DS.shape(S, circ(cx, cy - 30 * k, 46 * k, 62 * k), "gray", { t: o.t, w: "mid", tone: 1, parent: bowl }); return { g, bowl }; };

// ---------- more props ----------
const growX = (g, t, x, y, dur = 0.8, ease = "power2.out") => { const tf = (k) => `translate(${x} ${y}) scale(${k} 1) translate(${-x} ${-y})`; tl.fromTo(g, { attr: { transform: tf(0.02) } }, { attr: { transform: tf(1) }, duration: dur, ease, immediateRender: true }, t); };
let CW = 0;
const wipe = (g, x, y, wd, ht, t, dur) => { const id = "wp38-" + ++CW, cp = el("clipPath", { id }, dsDefs()), r = el("rect", { x, y, width: 0, height: ht }, cp); g.setAttribute("clip-path", `url(#${id})`); tl.fromTo(r, { attr: { width: 0 } }, { attr: { width: wd }, duration: dur, ease: "none", immediateRender: true }, t); return g; };
const sofa = (S, x0, seatY, wd, name = "red", o = {}) => { const g = S.grp(o.parent); DS.shadow(S, x0 + wd / 2, seatY + 110, wd + 80, { parent: g }); DS.shape(S, rrect(x0 + 30, seatY - 200, wd - 60, 230, DS.r.md), name, { w: "near", tone: 2, parent: g }); DS.shape(S, rrect(x0 + 40, seatY, wd - 80, 100, DS.r.sm), name, { w: "near", parent: g }); [x0, x0 + wd - 60].forEach((ax) => DS.shape(S, rrect(ax, seatY - 90, 60, 190, DS.r.md), name, { w: "near", tone: 1, parent: g })); return g; };
const pillBottle = (S, cx, cy, k = 1, o = {}) => { const g = S.grp(o.parent); DS.drop(S, rrect(cx - 60 * k + 6, cy - 90 * k + 8, 120 * k, 190 * k, DS.r.md), { t: o.t, parent: g }); DS.shape(S, rrect(cx - 60 * k, cy - 90 * k, 120 * k, 190 * k, DS.r.md * k), "orange", { t: o.t, w: "near", parent: g }); DS.shape(S, rrect(cx - 68 * k, cy - 130 * k, 136 * k, 50 * k, DS.r.sm * k), "white", { t: o.t, w: "mid", parent: g }); DS.shape(S, rect(cx - 52 * k, cy - 40 * k, 104 * k, 80 * k), "white", { t: o.t, w: "detail", flat: true, parent: g }); [-1, 1].forEach((sd) => DS.shape(S, rrect(cx + sd * 20 * k - 14 * k, cy - 14 * k, 28 * k, 14 * k, 7 * k), sd < 0 ? "red" : "white", { t: o.t, w: "detail", parent: g })); return g; };
const burger = (S, cx, cy, k = 1, o = {}) => { const g = S.grp(o.parent); DS.shape(S, `M${cx - 60 * k} ${cy - 10 * k} Q${cx - 62 * k} ${cy - 62 * k} ${cx} ${cy - 62 * k} Q${cx + 62 * k} ${cy - 62 * k} ${cx + 60 * k} ${cy - 10 * k} Z`, "earth", { t: o.t, w: "mid", parent: g }); DS.shape(S, rrect(cx - 66 * k, cy - 10 * k, 132 * k, 16 * k, 8 * k), "green", { t: o.t, w: "mid", parent: g }); DS.shape(S, rrect(cx - 62 * k, cy + 6 * k, 124 * k, 22 * k, 10 * k), "brown", { t: o.t, w: "mid", parent: g }); DS.shape(S, rrect(cx - 60 * k, cy + 28 * k, 120 * k, 22 * k, 10 * k), "earth", { t: o.t, w: "mid", parent: g }); return g; };
const glia = (S, cx, cy, k = 1, o = {}) => { const pts = []; for (let i = 0; i < 16; i++) { const a = (i / 16) * Math.PI * 2, r = (i % 2 ? 15 : 31) * k; pts.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]); } return DS.shape(S, poly(pts, 0) + " Z", "green", { t: o.t, w: "detail", parent: o.parent }); };
const clock24 = (S, cx, cy, r, o = {}) => { const g = S.grp(o.parent); DS.shape(S, circ(cx, cy, r), "white", { parent: g, t: o.t, w: "near" }); S.draw(rays(cx, cy, r * 0.8, r * 0.92, 24, -Math.PI / 2), o.t ?? S.start, 0, { c: DS.c("ink"), w: DS.w.mid, parent: g }); S.text("24 H", cx, cy + r * 0.5, { size: DS.type.caption, c: DS.c("gray", 2), t: o.t ?? T0(S), parent: g }); const hh = S.grp(g); S.draw(line([cx, cy], [cx, cy - r * 0.72], 0), o.t ?? S.start, 0, { c: DS.c("red"), w: DS.w.near * 1.2, parent: hh }); DS.shape(S, circ(cx, cy, r * 0.07), "ink", { parent: g, t: o.t, w: "detail" }); if (o.sweep) spin(hh, o.sweep[0], o.sweep[1], 0, 360, cx, cy, "none"); return g; };
const portrait = (S, cx, cy, wd, ht, o = {}) => { // framed bust of a generic woman. o.line = pencil drawing on paper
  const g = S.grp(o.parent), x = cx - wd / 2, y = cy - ht / 2; DS.drop(S, rrect(x + 6, y + 8, wd, ht, DS.r.xs), { t: o.t, parent: g });
  DS.shape(S, rrect(x, y, wd, ht, DS.r.xs), "wood", { w: "detail", t: o.t, parent: g }); DS.shape(S, rect(x + 14, y + 14, wd - 28, ht - 28), o.line ? "paper" : "sky", { w: "hair", flat: true, t: o.t, parent: g });
  const k = wd / 300, hx = cx, hy = cy - 20 * k, ink = o.line ? DS.c("gray", 2) : DS.P.ink[0], t = o.t ?? S.start;
  const hair = `M${hx - 62 * k} ${hy + 10 * k} Q${hx - 80 * k} ${hy - 80 * k} ${hx} ${hy - 82 * k} Q${hx + 80 * k} ${hy - 80 * k} ${hx + 62 * k} ${hy + 10 * k} L${hx + 70 * k} ${hy + 90 * k} L${hx - 70 * k} ${hy + 90 * k} Z`;
  S.draw(hair, t, 0, { fill: o.line ? "none" : DS.c("brown", 1), c: ink, w: DS.w.detail, parent: g });
  S.draw(`M${hx - 110 * k} ${y + ht - 14} Q${hx - 100 * k} ${hy + 90 * k} ${hx} ${hy + 84 * k} Q${hx + 100 * k} ${hy + 90 * k} ${hx + 110 * k} ${y + ht - 14}`, t, 0, { fill: o.line ? "none" : DS.c("purple"), c: ink, w: DS.w.detail, parent: g });
  S.draw(circ(hx, hy + 6 * k, 52 * k, 60 * k), t, 0, { fill: o.line ? "none" : DS.P.paper[0], c: ink, w: DS.w.detail, parent: g });
  S.draw(`M${hx - 52 * k} ${hy - 6 * k} Q${hx} ${hy - 70 * k} ${hx + 52 * k} ${hy - 6 * k} Q${hx} ${hy - 28 * k} ${hx - 52 * k} ${hy - 6 * k} Z`, t, 0, { fill: o.line ? "none" : DS.c("brown", 1), c: ink, w: DS.w.hair, parent: g });
  return g; };
const giraffe = (S, cx, gy, k = 1, o = {}) => { const g = S.grp(o.parent), t = o.t; DS.shape(S, rrect(cx - 70 * k, gy - 150 * k, 150 * k, 90 * k, 30 * k), "gold", { t, w: "mid", parent: g }); [-50, -20, 36, 62].forEach((dx) => S.draw(`M${cx + dx * k} ${gy - 70 * k} L${cx + dx * k} ${gy}`, t ?? S.start, 0, { c: DS.c("gold", 2), w: DS.w.near * k + 2, parent: g })); DS.shape(S, `M${cx + 40 * k} ${gy - 130 * k} L${cx + 70 * k} ${gy - 300 * k} L${cx + 96 * k} ${gy - 296 * k} L${cx + 78 * k} ${gy - 120 * k} Z`, "gold", { t, w: "mid", parent: g }); DS.shape(S, circ(cx + 96 * k, gy - 312 * k, 28 * k, 20 * k), "gold", { t, w: "mid", parent: g }); S.draw(`M${cx + 90 * k} ${gy - 336 * k} L${cx + 88 * k} ${gy - 356 * k} M${cx + 106 * k} ${gy - 334 * k} L${cx + 110 * k} ${gy - 354 * k}`, t ?? S.start, 0, { c: DS.P.ink[0], w: DS.w.detail, parent: g }); [[-30, -120], [10, -100], [60, -200], [66, -250], [-5, -135]].forEach(([dx, dy]) => S.fill(circ(cx + dx * k, gy + dy * k, 9 * k), t ?? S.start, 0, DS.c("brown", 1), 1, g)); return g; };
const orbit = (S, cx, cy, r, t0, t1, o = {}) => { const names = o.names || ["red", "yellow", "green"], g = S.grp(), n = Math.max(1, Math.ceil((t1 - t0) / 1.3)); names.forEach((nm, i) => { const bg = S.grp(g), a = (i / names.length) * 360; DS.shape(S, circ(cx + r, cy, 26), nm, { w: "mid", parent: bg }); tl.fromTo(bg, { attr: { transform: `rotate(${a} ${cx} ${cy})` } }, { attr: { transform: `rotate(${a + 360 * n} ${cx} ${cy})` }, duration: n * 1.3, ease: "none", immediateRender: true }, t0); }); fadeG(S, g, t0, 0.3); if (o.out) tl.to(g, { opacity: 0, duration: 0.3 }, t1); return g; };
const fish = (S, cx, cy, k = 1, o = {}) => { const g = S.grp(o.parent), t = o.t, nm = o.name || "sky", INKC = DS.P.ink[0]; DS.shape(S, `M${cx - 150 * k} ${cy} L${cx - 220 * k} ${cy - 60 * k} L${cx - 200 * k} ${cy} L${cx - 220 * k} ${cy + 60 * k} Z`, nm, { t, w: "mid", tone: 2, parent: g }); DS.shape(S, circ(cx, cy, 150 * k, 78 * k), nm, { t, w: "near", parent: g }); DS.shape(S, `M${cx - 20 * k} ${cy - 74 * k} Q${cx} ${cy - 130 * k} ${cx + 50 * k} ${cy - 70 * k} Z`, nm, { t, w: "mid", tone: 2, parent: g }); S.draw(`M${cx + 70 * k} ${cy - 30 * k} Q${cx + 86 * k} ${cy} ${cx + 70 * k} ${cy + 30 * k}`, t ?? S.start, 0, { c: INKC, w: DS.w.detail, parent: g });
  const eg = S.grp(g); const eyeSize = o.eye ?? 1; if (eyeSize > 0) { S.draw(circ(cx + 96 * k, cy - 18 * k, 24 * k * eyeSize), t ?? S.start, 0, { fill: DS.P.white[0], c: INKC, w: DS.w.mid, parent: eg }); S.draw(circ(cx + 100 * k, cy - 16 * k, 10 * k * eyeSize), t ?? S.start, 0, { fill: INKC, c: INKC, w: DS.w.hair, parent: eg }); } else S.draw(`M${cx + 84 * k} ${cy - 18 * k} Q${cx + 98 * k} ${cy - 10 * k} ${cx + 112 * k} ${cy - 18 * k}`, t ?? S.start, 0, { c: DS.c(nm, 2), w: DS.w.mid, parent: eg });
  return { g, eg, eye: [cx + 96 * k, cy - 18 * k] }; };
const scissors = (S, px, py, k = 1, o = {}) => { const g = S.grp(o.parent), b1 = S.grp(g), b2 = S.grp(g); [[b1, -1], [b2, 1]].forEach(([bg, sd]) => { DS.shape(S, `M${px} ${py} L${px + 260 * k} ${py + sd * 14 * k} L${px + 10 * k} ${py + sd * 26 * k} Z`, "gray", { w: "mid", tone: 1, parent: bg }); DS.shape(S, circ(px - 50 * k, py - sd * 40 * k, 32 * k), "red", { w: "mid", parent: bg, flat: true }); S.draw(circ(px - 50 * k, py - sd * 40 * k, 14 * k), S.start, 0, { c: DS.P.ink[0], w: DS.w.mid, parent: bg }); }); DS.shape(S, circ(px, py, 10 * k), "ink", { w: "detail", parent: g }); return { g, b1, b2, snip: (t, n = 2) => { for (let i = 0; i < n; i++) { spin(b1, t + i * 0.5, 0.22, 0, 20, px, py, "power2.in"); spin(b2, t + i * 0.5, 0.22, 0, -20, px, py, "power2.in"); spin(b1, t + i * 0.5 + 0.25, 0.22, 20, 0, px, py, "power2.out"); spin(b2, t + i * 0.5 + 0.25, 0.22, -20, 0, px, py, "power2.out"); } } }; };
const padlock = (S, cx, cy, k = 1, o = {}) => { const g = S.grp(o.parent); S.draw(`M${cx - 36 * k} ${cy} V${cy - 50 * k} Q${cx - 36 * k} ${cy - 96 * k} ${cx} ${cy - 96 * k} Q${cx + 36 * k} ${cy - 96 * k} ${cx + 36 * k} ${cy - 66 * k} V${cy - 56 * k}`, o.t ?? S.start, 0, { c: DS.c("gray", 2), w: DS.w.near * 1.6, parent: g }); DS.shape(S, rrect(cx - 56 * k, cy, 112 * k, 90 * k, DS.r.sm), "gold", { t: o.t, w: "mid", parent: g }); S.fill(circ(cx, cy + 40 * k, 9 * k), o.t ?? S.start, 0, DS.P.ink[0], 1, g); return g; };
const envelope2 = (S, cx, cy, k = 1, o = {}) => { const g = S.grp(o.parent); DS.shape(S, rrect(cx - 70 * k, cy - 46 * k, 140 * k, 92 * k, DS.r.xs), "white", { t: o.t, w: "mid", flat: true, parent: g }); S.draw(`M${cx - 70 * k} ${cy - 46 * k} L${cx} ${cy + 6 * k} L${cx + 70 * k} ${cy - 46 * k}`, o.t ?? S.start, 0, { c: DS.P.ink[0], w: DS.w.detail, parent: g }); return g; };
const sweatAt = (S, x, y, t, k = 1) => S.fill(`M${x} ${y - 26 * k} Q${x + 18 * k} ${y} ${x} ${y + 8 * k} Q${x - 18 * k} ${y} ${x} ${y - 26 * k} Z`, t ?? S.start, 0, DS.c("sky", 2), 1);
// a 10x10 field of dots = the brain's neurons; lit(i, t, dur) fades a dot's light on, dim(i, t, dur) off
const dots100 = (S, cx, cy, gap, o = {}) => { const g = S.grp(o.parent), D = [], x0 = cx - gap * 4.5, y0 = cy - gap * 4.5, r = gap * 0.36; for (let i = 0; i < 100; i++) { const x = x0 + (i % 10) * gap, y = y0 + Math.floor(i / 10) * gap; DS.shape(S, circ(x, y, r), "gray", { flat: true, tone: 1, w: "detail", parent: g, t: o.t }); const ov = el("path", { d: circ(x, y, r), fill: DS.c("yellow", 0), stroke: DS.c("gold", 2), "stroke-width": DS.w.detail, opacity: 0 }, g); D.push({ x, y, r, ov }); }
  const lit = (i, t, dur = 0.6) => tl.fromTo(D[i].ov, { opacity: 0 }, { opacity: 1, duration: dur, ease: "sine.inOut", immediateRender: false }, t), dim = (i, t, dur = 0.6) => tl.to(D[i].ov, { opacity: 0, duration: dur, ease: "sine.inOut" }, t);
  return { g, D, lit, dim, on: (i) => D[i].ov.setAttribute("opacity", 1) }; };
const bracketsAround = (S, x0, y0, x1, y1, t, c = DS.P.ink[0]) => { const g = S.grp(), a = 60; S.draw(`M${x0} ${y0 + a} V${y0} H${x0 + a} M${x1 - a} ${y0} H${x1} V${y0 + a} M${x1} ${y1 - a} V${y1} H${x1 - a} M${x0 + a} ${y1} H${x0} V${y1 - a}`, S.start, 0, { c, w: DS.w.near, parent: g }); return fadeG(S, g, t); };

// ---------- timing: one picture per beat (merged clips share a picture), landing just after its first word ----------
const CUES = [[1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0], [10, 0], [11, 0], [12, 0],
  [13, 0], [14, 0], [15, 0], [16, 0], [17, 0], [18, 0], [19, 0], [20, 0], [21, 0], [22, 0], [23, 0], [25, 0], [26, 0], [28, 0], [29, 0], [31, 0],
  [32, 0], [33, 0], [34, 0], [35, 0], [36, 0], [38, 0], [39, 0], [40, 0], [42, 0], [43, 0], [44, 0], [46, 0], [47, 0], [48, 0], [49, 0], [50, 0], [52, 0], [53, 0], [55, 0],
  [56, 0], [57, 0], [58, 0], [59, 0], [60, 0], [61, 0], [62, 0], [63, 0], [64, 0], [65, 0], [66, 0], [67, 0], [68, 0], [69, 0], [70, 0], [71, 0], [72, 0],
  [73, 0], [74, 0], [75, 0], [76, 0], [77, 0], [78, 0], [79, 0], [80, 0], [81, 0], [82, 0], [84, 0], [85, 0], [86, 0], [87, 0], [88, 0],
  [89, 0], [90, 0], [91, 0], [93, 0], [94, 0], [95, 0], [96, 0], [97, 0],
  [98, 0], [99, 0], [100, 0], [101, 0], [102, 0], [103, 0], [104, 0], [105, 0], [106, 0], [107, 0],
  [108, 0], [110, 0], [111, 0], [112, 0], [113, 0], [114, 0], [115, 0]];
const WINS = sceneWindows(CUES, -0.25);
const sc = (c, w, o) => { const k = CUES.findIndex(([a, b]) => a === c && b === w); if (k < 0) throw new Error("no cue " + c + ":" + w); return scene(WINS[k][0], WINS[k][1], o); };
const ROOM = { wall: "wall", floor: "wood", window: false }, LAB2 = { wall: "glass", floor: "wood", window: false }, LAB = { wall: "sand", floor: "wood", window: false };
const LIB = { wall: "earth", floor: "wood", window: false }, NITE = { wall: "night", floor: "navy", window: false }, CINEMA = { wall: "purple", floor: "navy", window: false };
const END = (c) => CLIP(c)[1];
const dim = (S, a = 0.3) => S.fill(rect(-200, -200, 2320, 1480), S.start, 0, DS.P.ink[0], a);
const headband = (S, F) => { const [hx, hy] = F.hd, R = F.r; S.draw(`M${hx - R * 1.02} ${hy - R * 0.4} Q${hx} ${hy - R * 0.62} ${hx + R * 1.02} ${hy - R * 0.4}`, S.start, 0, { c: DS.c("red"), w: DS.w.near * 1.3, parent: F.g }); S.draw(`M${hx - R * 1.0} ${hy - R * 0.4} l${-R * 0.5} ${R * 0.35} M${hx - R * 1.0} ${hy - R * 0.4} l${-R * 0.55} ${R * 0.05}`, S.start, 0, { c: DS.c("red"), w: DS.w.mid, parent: F.g }); };
// ===================== 1. The dial =====================
// This is Dave. Dave has heard that he only uses ten percent of his brain.
{ const S = sc(1, 0, { cam: "push", focus: "800 520" }); DS.room(S, ROOM);
  const F = dave(S, 640, 960, "near", { s: 1.5, look: 4, mood: "smile" });
  card(S, "DAVE", 640, 190, { t: W(1, 2) });
  const g = S.grp(); S.thought(1290, 420, 340, 230, 780, 600, S.start, 0.3, { parent: g }); pie(S, 1290, 420, 140, 0.1, { c: "green", parent: g });
  txt(S, "10%", 1290, 770, { size: DS.type.title, c: DS.c("green", 2), t: W(1, 10), parent: g }); fadeG(S, g, W(1, 9));
  DS.vignette(S); }

// Which means ninety percent of his head is just sitting there, with the lights off.
{ const S = sc(2, 0, { cam: "push", focus: "1100 500" }); DS.outdoor(S, NIGHT); nightSky(S);
  const H = houseHead(S, 1180, 560, 0.95, { cols: 5, rows: 2 }); H.lit(3, S.start);
  const F = dave(S, 420, 920, "near", { s: 1.2, look: 6, mood: "flat", pose: "point" });
  card(S, "HIS HEAD", 1180, 170, { t: W(2, 6) });
  card(S, "90% DARK", 420, 330, { t: W(2, 2), tc: "red" });
  DS.vignette(S); }

// Tonight, Dave found a dial on the back of his head. It's set to ten.
{ const S = sc(3, 0, { cam: "push", focus: "900 520" }); DS.room(S, NITE);
  const F = daveBack(S, 560, 940, 1.7, { pose: "head" });
  const [dx, dy] = F.dialAt; dial(S, dx, dy, F.dialR, { v: 10, t: W(3, 4) });
  const big = dial(S, 1380, 480, 230, { v: 10, t: W(3, 8) });
  [[0.55, -0.82], [0.7, 0.6]].forEach(([a, b]) => S.draw(line([dx + F.dialR * a, dy + F.dialR * b], [1380 - 230 * 0.96, 480 + (b > 0 ? 130 : -130)], 0), W(3, 8), 0, { c: DS.c("gray", 2), w: DS.w.detail }));
  S.draw(circ(1380, 480, 262), W(3, 13), 0, { c: DS.c("red"), w: DS.w.near });
  card(S, "SET TO 10", 1380, 840, { t: W(3, 13), tc: "red" });
  DS.vignette(S); }

// "Right. Let's see what the other ninety percent can do." (Dave)
{ const S = sc(4, 0, { cam: "push", focus: "700 560" }); DS.room(S, ROOM);
  const F = dave(S, 600, 960, "near", { s: 1.5, look: 4, mood: "determined", pose: "hold" }); talk(S, F, W(4, 0), END(4));
  const g = S.grp(); pie(S, 1330, 520, 210, 0.9, { c: "green", parent: g }); fadeG(S, g, W(4, 5));
  card(S, "THE OTHER 90%", 1330, 190, { t: W(4, 5), tc: "green" });
  DS.vignette(S); }

// So what would happen if you used a hundred percent of your brain?
{ const S = sc(5, 0, { cam: "push", focus: "900 520" }); DS.room(S, ROOM);
  const F = dave(S, 640, 960, "near", { s: 1.5, look: 5, mood: "flat" });
  const g = S.grp(); S.thought(1290, 410, 340, 230, 780, 560, S.start, 0.3, { parent: g });
  const bo = brainOrg(S, 1290, 400, 0.95, { parent: g }); bo.all(W(5, 8), 1.6);
  fadeG(S, g, W(5, 3));
  card(S, "WHAT IF?", 640, 170, { t: W(5, 1) });
  txt(S, "100%", 1290, 770, { size: DS.type.display, c: DS.c("red", 2), t: W(5, 8) });
  DS.vignette(S); }

// Learn kung fu in an afternoon? Move a spoon just by looking at it?
{ const S = sc(6, 0, { cam: "push", focus: "960 520" }); DS.room(S, ROOM);
  const F = dave(S, 520, 960, "near", { s: 1.4, look: 8, mood: "determined", pose: "armsUp" }); headband(S, F);
  card(S, "KUNG FU", 520, 170, { t: W(6, 1) });
  const sp = spoon(S, 1380, 380, 1.5, { t: W(6, 8) });
  card(S, "SPOON", 1380, 170, { t: W(6, 8) });
  tl.fromTo(sp.bowl, { attr: { transform: `rotate(0 1380 380)` } }, { attr: { transform: `rotate(42 1380 380)` }, duration: 0.8, ease: "power2.inOut", immediateRender: false }, W(6, 11));
  const g = S.grp(); [[0, -20], [60, 0], [120, 30]].forEach(([dx, dy], i) => S.draw(arc(F.hd[0] + 130 + dx + i * 130, F.hd[1] - 30 + dy, 40 + i * 18, -50, 50), S.start, 0, { c: DS.c("orange"), w: DS.w.mid, parent: g })); fadeG(S, g, W(6, 10));
  DS.vignette(S); }

// That's what the films say. In Lucy, a woman absorbs a strange new drug,
{ const S = sc(7, 0, { cam: "push", focus: "800 520" }); DS.room(S, CINEMA);
  DS.shape(S, rrect(380, 100, 560, 760, DS.r.md), "gold", { w: "mid", tone: 1, flat: true });
  const F = who(S, 660, 860, "near", Object.assign({}, woman, { s: 1.4, mood: "wow", float: false, t: W(7, 7) }));
  card(S, "FILM 1", 660, 165, { t: W(7, 5) });
  txt(S, "10%", 660, 338, { size: DS.type.display, c: DS.c("red", 2), t: W(7, 5) });
  card(S, "A WOMAN", 660, 930, { t: W(7, 8), size: DS.type.caption });
  pillBottle(S, 1320, 560, 2.0, { t: W(7, 11) });
  card(S, "A STRANGE NEW DRUG", 1320, 270, { t: W(7, 11), size: DS.type.caption });
  DS.vignette(S); }

// passes ten percent, and gets more powerful with every step.
{ const S = sc(8, 0, { cam: "push", focus: "960 600" }); DS.room(S, CINEMA);
  const steps = [[360, 840, "10%", "gray"], [630, 720, "20%", "sky"], [900, 600, "50%", "gold"], [1170, 480, "100%", "orange"]];
  steps.forEach(([x, y, s, n], i) => { DS.shape(S, rect(x, y, 270, 960 - y), n, { w: "near", tone: i === 0 ? 0 : 1 }); txt(S, s, x + 135, y + 90, { size: DS.type.body, t: i === 0 ? undefined : W(8, 0) + i * 0.9 }); });
  const F = who(S, 495, 840, "near", Object.assign({}, woman, { s: 1.15, mood: "determined", float: true }));
  F.walk(W(8, 0) + 0.2, WE(8, 9) - W(8, 0) - 0.5, { x: 810, y: -360 });
  S.draw(circ(1305, 300, 120, 200), W(8, 6), 0, { c: DS.c("gold"), w: DS.w.near });
  card(S, "MORE POWERFUL", 800, 170, { t: W(8, 4), tc: "orange" });
  DS.vignette(S); }

// In Limitless, the number is twenty percent. Hollywood can't even agree on the myth.
{ const S = sc(9, 0, { cam: "push", focus: "960 520" }); DS.room(S, CINEMA);
  [[520, "FILM 1", "10%", "gold"], [1400, "FILM 2", "20%", "sky"]].forEach(([x, n, p, c], i) => {
    const g = S.grp(); DS.shape(S, rrect(x - 260, 130, 520, 740, DS.r.md), c, { w: "mid", tone: 1, flat: true, parent: g });
    txt(S, p, x, 340, { size: DS.type.display, c: DS.c("red", 2), parent: g, t: i ? W(9, 5) : undefined });
    const f = who(S, x, 850, "near", Object.assign({}, i ? { s: 1.3, hair: "side", hairC: DS.c("ink", 1), outfitC: DS.c("navy"), tieC: "gold" } : Object.assign({ s: 1.3 }, woman), { mood: "flat", float: true, parent: g }));
    card(S, n, x, 190, { t: i ? W(9, 1) : undefined, size: DS.type.caption });
    if (i) fadeG(S, g, W(9, 1)); });
  const ne = S.grp(); S.draw(`M900 450 H1020 M900 520 H1020 M930 560 L990 410`, S.start, 0, { c: DS.c("red"), w: DS.w.near * 1.4, parent: ne }); fadeG(S, ne, W(9, 8));
  DS.vignette(S); }

// Somewhere inside Dave's head, a small, tired voice answers. That's his brain.
{ const S = sc(10, 0, { cam: "push", focus: "800 520" }); DS.room(S, ROOM);
  const top = 960 - 1.5 * 309 - 75, B = brainy(S, 760, top + 6, 0.85, { face: "tired" });
  B.enter(W(10, 5), 0, 170, 0.7, 0.35);
  const F = dave(S, 760, 960, "near", { s: 1.5, look: 0, mood: "wow" });
  card(S, "A TIRED VOICE", 1390, 360, { t: W(10, 6) });
  card(S, "HIS BRAIN", 1390, 520, { t: W(10, 10), tc: "red" });
  arrowR(S, 1240, 520, 1000, 330, W(10, 10), { bend: 0.1 });
  DS.vignette(S); }

// "You won't like a hundred, Dave. Nobody likes a hundred." (Brain)
{ const S = sc(11, 0, { cam: "push", focus: "1100 520" }); DS.room(S, ROOM);
  const F = dave(S, 420, 960, "near", { s: 1.15, look: 7, mood: "worried" });
  const B = brainy(S, 1250, 920, 2.0, { face: "stern", armR: "stop", armL: "hip" }); B.talk(W(11, 0), END(11)); B.face(W(11, 4), "tired");
  card(S, "A HUNDRED?", 790, 250, { t: W(11, 5), tc: "red" });
  DS.vignette(S); }

// But before Dave turns it, let's find out who stuck that ten percent sticker on.
{ const S = sc(12, 0, { cam: "push", focus: "960 600" }); DS.room(S, NITE);
  const D = dialClose(S, 10);
  const B = brainy(S, 1320, 520, 1.1, { face: "tired", armL: "hip" });
  card(S, "WHO STUCK IT ON?", 960, 190, { t: W(12, 8) });
  const g = S.grp(); S.fill(circ(1060, 700, 110), S.start, 0, DS.c("glass", 1), 0.4, g); S.draw(circ(1060, 700, 110), S.start, 0, { c: DS.P.ink[0], w: DS.w.near * 1.2, parent: g }); S.draw(`M1140 780 L1250 890`, S.start, 0, { c: DS.c("brown"), w: DS.w.near * 2.2, parent: g }); fadeG(S, g, W(12, 6));
  DS.vignette(S); }

// ===================== 2. Who wrote ten percent? =====================
// Nobody knows exactly where the number came from. But there are three good suspects.
{ const S = sc(13, 0, { cam: "push", focus: "960 540" }); DS.room(S, ROOM);
  for (let i = 0; i < 6; i++) { S.draw(`M${400} ${220 + i * 120} H${1520}`, S.start, 0, { c: DS.c("gray", 1), w: DS.w.hair }); txt(S, String(200 - i * 20), 330, 232 + i * 120, { size: DS.type.caption, c: DS.c("gray", 2) }); }
  card(S, "WHO WROTE 10%?", 960, 140, { size: DS.type.body });
  [[560, 1.25, W(13, 11)], [960, 1.1, W(13, 12)], [1360, 1.0, W(13, 13)]].forEach(([x, s, t], i) => {
    const F = who(S, x, 900, "near", { s, hair: "none", outfitC: DS.c("ink", 1), mood: "flat", t });
    const g = S.grp(); S.draw(circ(F.hd[0], F.hd[1], F.r * 1.02), S.start, 0, { fill: DS.c("gray", 2), c: DS.P.ink[0], w: DS.w.near, parent: g }); S.text("?", F.hd[0], F.hd[1] + DS.type.body * 0.32, { size: DS.type.body, c: DS.P.white[0], t: T0(S), parent: g }); fadeG(S, g, t);
    card(S, "SUSPECT " + (i + 1), x, 240 + i * 0, { t, size: DS.type.caption }); });
  DS.vignette(S); }

// Suspect one is a Harvard professor called William James.
{ const S = sc(14, 0, { cam: "push", focus: "700 520" }); DS.room(S, LAB2);
  DS.shape(S, rrect(920, 150, 820, 520, DS.r.sm), "green", { w: "near", tone: 2, flat: true }); DS.shape(S, rect(920, 670, 820, 18), "wood", { w: "detail" });
  txt(S, "?", 1330, 470, { size: DS.type.display, c: DS.P.white[0] });
  const F = who(S, 600, 940, "near", Object.assign({}, PROF, { s: 1.45, pose: "point", mood: "flat", look: 6 }));
  card(S, "SUSPECT 1", 600, 150, { size: DS.type.body, tc: "red" });
  card(S, "HARVARD", 1330, 770, { t: W(14, 4), size: DS.type.caption });
  card(S, "WILLIAM JAMES", 600, 290, { t: W(14, 7) });
  DS.vignette(S); }

// In nineteen oh seven he wrote that we are making use of only a small part of our possible mental and physical resources.
{ const S = sc(15, 0, { cam: "push", focus: "800 520" }); DS.room(S, LAB2);
  paperR(S, 400, 90, 960, 850);
  txt(S, "THE ENERGIES OF MEN", 880, 190, { size: DS.type.caption, c: DS.c("gray", 2) });
  const hl = S.fill(rect(716, 446, 330, 68), W(15, 13), 0.4, DS.c("yellow", 1), 1);
  [["We are making use of only", 380, W(15, 7)], ["a small part of our possible", 460, W(15, 13)], ["mental and physical resources.", 540, W(15, 19)]].forEach(([s, y, t]) => S.text(s, 880, y, { size: DS.type.small, font: "caveat", c: DS.P.ink[0], t }));
  const F = who(S, 1530, 940, "near", Object.assign({}, PROF, { s: 1.3, pose: "reachL", mood: "flat", look: -6 }));
  card(S, "1907", 1530, 300, { t: W(15, 1), size: DS.type.title, tc: "red" });
  DS.vignette(S); }

// He meant effort, not brain cells, and he never gave a number.
{ const S = sc(16, 0, { cam: "push", focus: "960 520" }); DS.room(S, LAB2);
  const X = [560, 1360];
  X.forEach((x, i) => fadeG(S, panel(S, x, 480, 640, 700), i ? W(16, 3) : W(16, 1)));
  { const g = S.grp(); const F = who(S, 520, 760, "near", { s: 1.0, hair: "short", outfitC: DS.c("orange"), mood: "determined", pose: "armsUp", float: true, parent: g });
    S.draw(`M360 460 H690`, S.start, 0, { c: DS.P.ink[0], w: DS.w.near * 1.5, parent: g }); [[360, "gray"], [690, "gray"]].forEach(([x, n]) => DS.shape(S, rrect(x - 22, 400, 44, 120, DS.r.xs), n, { w: "mid", tone: 2, parent: g }));
    sweatAt(S, 590, 480, undefined); fadeG(S, g, W(16, 1)); txt(S, "EFFORT", 560, 820, { size: DS.type.small, t: W(16, 2) }); tick(S, 800, 300, 1.2, W(16, 2)); }
  { const g = S.grp(); [[1200, 380], [1360, 520], [1500, 380], [1250, 620], [1470, 640]].forEach(([x, y]) => neuron(S, x, y, 0.8, { parent: g, arms: 5 })); fadeG(S, g, W(16, 3)); txt(S, "BRAIN CELLS", 1360, 820, { size: DS.type.small, t: W(16, 4) }); xMark(S, 1360, 480, 2.2, W(16, 5)); }
  stamp(S, 960, 920, "NO NUMBER", W(16, 9), "red", { size: DS.type.body });
  DS.vignette(S); }

// Suspect two is the introduction that added one.
{ const S = sc(17, 0, { cam: "push", focus: "960 520" }); DS.room(S, LAB2);
  DS.drop(S, rrect(404, 214, 520, 580, DS.r.xs)); DS.shape(S, rrect(400, 210, 520, 580, DS.r.xs), "white", { w: "near", flat: true }); DS.shape(S, rrect(1000, 210, 520, 580, DS.r.xs), "white", { w: "near", flat: true });
  lines(S, 450, 300, 420, 7, undefined, 52); txt(S, "INTRODUCTION", 1260, 300, { size: DS.type.small }); lines(S, 1050, 370, 420, 7, undefined, 52);
  S.draw(`M960 210 V790`, S.start, 0, { c: DS.P.ink[0], w: DS.w.mid });
  card(S, "SUSPECT 2", 960, 130, { size: DS.type.body, tc: "red" });
  const g = S.grp(); DS.shape(S, rrect(1170, 440, 180, 90, DS.r.xs), "yellow", { w: "detail", parent: g }); S.text("+ 10%", 1260, 505, { size: DS.type.body, c: DS.P.ink[0], t: T0(S), parent: g });
  tl.fromTo(g, { attr: { transform: "translate(0 -420)" }, opacity: 0 }, { attr: { transform: "translate(0 0)" }, opacity: 1, duration: 0.5, ease: "power2.in", immediateRender: true }, W(17, 5));
  DS.vignette(S); }

// In nineteen thirty-six, the bestseller How to Win Friends and Influence People opened with a foreword by Lowell Thomas.
{ const S = sc(18, 0, { cam: "push", focus: "900 520" }); DS.room(S, LAB2);
  tinyBook(S, 520, 520, 470, 640, "blue");
  ["HOW TO WIN", "FRIENDS AND", "INFLUENCE", "PEOPLE"].forEach((s, i) => wtxt(S, s, 535, 400 + i * 62, { size: DS.type.small }));
  card(S, "1936", 520, 150, { t: W(18, 1), size: DS.type.title });
  const g = S.grp(); paperR(S, 1000, 190, 600, 640, { parent: g }); txt(S, "FOREWORD", 1300, 300, { size: DS.type.body, parent: g, t: T0(S) }); lines(S, 1060, 380, 480, 6, undefined, 54, g); fadeG(S, g, W(18, 12));
  card(S, "LOWELL THOMAS", 1300, 890, { t: W(18, 17), size: DS.type.small });
  DS.vignette(S); }

// It said William James used to say that the average man develops only ten percent of his latent mental ability.
{ const S = sc(19, 0, { cam: "push", focus: "960 520" }); DS.room(S, LAB2);
  paperR(S, 440, 80, 1040, 860);
  txt(S, "FOREWORD", 960, 190, { size: DS.type.caption, c: DS.c("gray", 2) });
  S.fill(rect(900, 392, 340, 70), W(19, 13), 0.4, DS.c("yellow", 1), 1);
  [["Professor William James of Harvard", 280, 1], ["used to say that the average man", 360, 5], ["develops only ten percent", 440, 11], ["of his latent mental ability.", 520, 15]].forEach(([s, y, w]) => S.text(s, 960, y, { size: DS.type.small, font: "caveat", c: DS.P.ink[0], t: W(19, w) }));
  S.draw(circ(1070, 428, 170, 54), W(19, 14), 0, { c: DS.c("red"), w: DS.w.near });
  stamp(S, 1600, 700, "10%", W(19, 14), "red", { size: DS.type.title, rot: 8 });
  DS.vignette(S); }

// James had died twenty-six years earlier, so he wasn't available to argue.
{ const S = sc(20, 0, { cam: "push", focus: "960 540" }); DS.room(S, LAB2);
  S.draw(`M300 620 H1620`, S.start, 0, { c: DS.P.ink[0], w: DS.w.near });
  [[420, "1910"], [1500, "1936"]].forEach(([x, y]) => { S.draw(`M${x} 590 V650`, S.start, 0, { c: DS.P.ink[0], w: DS.w.near }); txt(S, y, x, 720, { size: DS.type.body }); });
  DS.shape(S, `M360 590 V470 Q360 400 420 400 Q480 400 480 470 V590 Z`, "gray", { w: "near", tone: 1, t: W(20, 2) }); txt(S, "R.I.P.", 420, 510, { size: DS.type.caption, t: W(20, 2) });
  tinyBook(S, 1500, 520, 150, 190, "blue", { t: W(20, 5) });
  S.draw(`M440 800 Q960 900 1480 800`, W(20, 3), 0, { c: DS.c("red"), w: DS.w.near }); card(S, "26 YEARS", 960, 400, { t: W(20, 3), tc: "red", size: DS.type.title });
  stamp(S, 960, 880, "NOT AVAILABLE", W(20, 8), "red", { size: DS.type.body });
  DS.vignette(S); }

// And ten was the perfect number. Precise enough to sound like science,
{ const S = sc(21, 0, { cam: "push", focus: "800 520" }); DS.room(S, LAB2);
  const F = dave(S, 620, 960, "near", { s: 1.5, look: 5, mood: "smile", pose: "hold", outfitC: DS.c("white", 2), hairC: DS.c("brown") });
  const g = S.grp(); DS.shape(S, rrect(560, 700, 130, 170, DS.r.xs), "white", { w: "detail", flat: true, parent: g }); S.text("10%", 625, 800, { size: DS.type.body, c: DS.c("red", 2), t: T0(S), parent: g });
  const rs = S.grp(); S.draw(`M1230 380 L1190 520 M1330 380 L1370 520`, S.start, 0, { c: DS.c("red"), w: DS.w.near * 1.4, parent: rs }); DS.shape(S, circ(1280, 360, 130), "gold", { w: "near", parent: rs }); S.text("10%", 1280, 385, { size: DS.type.title, c: DS.P.ink[0], t: T0(S), parent: rs }); fadeG(S, rs, W(21, 3));
  const bk = S.grp(); DS.shape(S, `M1500 640 L1540 640 L1540 540 L1620 400 L1660 400 L1740 540 L1740 640 L1780 640 L1780 700 L1500 700 Z`, "glass", { w: "near", parent: bk }); S.fill(`M1540 600 H1740 V640 H1540 Z`, S.start, 0, DS.c("green", 1), 0.9, bk); fadeG(S, bk, W(21, 9));
  card(S, "SOUNDS LIKE SCIENCE", 1280, 880, { t: W(21, 9), size: DS.type.caption });
  DS.vignette(S); }

// and small enough to sell you the other ninety.
{ const S = sc(22, 0, { cam: "push", focus: "1000 520" }); DS.room(S, ROOM);
  const stall = S.grp(); DS.shape(S, `M900 230 H1700 L1740 360 H860 Z`, "red", { w: "near", parent: stall }); [0, 1, 2, 3].forEach((i) => S.fill(`M${900 + i * 200 - 40 * (i ? 1 : 0)} 230 h100 l-12 130 h-100 Z`, S.start, 0, DS.P.white[0], 0.9, stall));
  DS.shape(S, rect(940, 360, 20, 480), "wood", { w: "mid", parent: stall }); DS.shape(S, rect(1640, 360, 20, 480), "wood", { w: "mid", parent: stall });
  const S1 = who(S, 1300, 810, "near", { s: 1.15, hair: "curly", hairC: DS.c("ink", 1), outfitC: DS.c("orange"), tieC: "gold", mood: "smile", pose: "reach", float: true });
  DS.shape(S, rrect(940, 770, 720, 190, DS.r.sm), "wood", { w: "near", tone: 2 });
  DS.shape(S, rrect(1500, 650, 130, 120, DS.r.sm), "glass", { w: "mid", t: W(22, 7) }); S.text("90%", 1565, 730, { size: DS.type.body, c: DS.c("green", 2), t: W(22, 7) });
  const D = dave(S, 460, 960, "near", { s: 1.3, look: 6, mood: "worried", pose: "hold" });
  card(S, "SALE", 1300, 150, { t: W(22, 4), tc: "red", size: DS.type.title });
  DS.vignette(S); }

// Suspect three is the glue. For decades, people said your brain had a hundred billion neurons, and ten times as many support cells, called glia.
{ const S = sc(23, 0, { cam: "push", focus: "1100 520" }); DS.room(S, LAB2);
  const gl = S.grp(); DS.shape(S, `M330 400 H470 L490 560 H310 Z`, "white", { w: "near", parent: gl }); DS.shape(S, rrect(360, 300, 80, 100, DS.r.xs), "orange", { w: "mid", parent: gl }); DS.shape(S, `M385 260 H415 V300 H385 Z`, "orange", { w: "mid", parent: gl }); S.text("GLUE", 400, 520, { size: DS.type.caption, c: DS.P.ink[0], t: T0(S), parent: gl });
  card(S, "SUSPECT 3", 400, 170, { size: DS.type.body, tc: "red" });
  const N = neuron(S, 1100, 540, 1.9, { arms: 8, axon: [330, 150], a0: 150, span: 300 });
  [[1480, 330], [1560, 650], [740, 760]].forEach(([x, y]) => neuron(S, x, y, 1.0, { arms: 5 }));
  card(S, "100 BILLION NEURONS", 1100, 190, { t: W(23, 13), size: DS.type.small });
  const cells = [[0, -150], [130, -110], [160, 10], [120, 130], [20, 170], [-120, 140], [-170, 20], [-130, -110], [60, -200], [-70, -190]];
  const cg = S.grp(); cells.forEach(([dx, dy]) => glia(S, 1100 + dx * 1.15, 540 + dy * 1.15, 1.0, { parent: cg })); fadeG(S, cg, W(24, 1));
  card(S, "10 × GLIA", 1100, 880, { t: W(24, 1), tc: "green", size: DS.type.body });
  card(S, "GLIA = GLUE", 1560, 870, { t: W(24, 8), size: DS.type.caption });
  DS.vignette(S); }

// One cell in ten doing the thinking. Ten percent again.
{ const S = sc(25, 0, { cam: "push", focus: "960 520" }); DS.room(S, LAB2);
  for (let i = 0; i < 10; i++) { const x = 640 + (i % 5) * 160, y = 440 + Math.floor(i / 5) * 190; if (i === 0) neuron(S, x, y, 1.0, { arms: 5 }).lit(W(25, 4), 0.8); else glia(S, x, y, 1.2); }
  card(S, "ONE IN TEN", 960, 190, { t: W(25, 2), size: DS.type.body });
  stamp(S, 1500, 640, "10% AGAIN", W(25, 7), "red", { size: DS.type.body, rot: -8 });
  DS.vignette(S); }

// In two thousand nine, a team in Brazil counted them. They turned brains into a kind of soup and counted the cells.
{ const S = sc(26, 0, { cam: "push", focus: "1000 520" }); DS.room(S, LAB);
  [[290, COAT], [520, DOC], [750, Object.assign({}, COAT, { hair: "curly" })]].forEach(([x, o], i) => who(S, x, 940, "near", Object.assign({}, o, { s: 1.15, mood: i === 1 ? "smile" : "flat", look: 6, pose: i === 1 ? "hold" : "stand" })));
  card(S, "2009", 400, 170, { t: W(26, 1), size: DS.type.title }); card(S, "BRAZIL", 800, 300, { t: W(26, 7), size: DS.type.body });
  DS.shape(S, rect(930, 800, 700, 160), "gray", { w: "near", tone: 2 });
  DS.shape(S, `M1060 600 H1500 L1460 800 H1100 Z`, "gray", { w: "near", tone: 1 }); S.fill(`M1070 640 H1490 L1470 680 H1090 Z`, S.start, 0, DS.c("orange", 1), 0.9);
  DS.shape(S, rrect(1020, 580, 520, 40, DS.r.sm), "gray", { w: "mid" }); S.draw(`M1020 600 H970 M1540 600 H1590`, S.start, 0, { c: DS.P.ink[0], w: DS.w.near * 1.5 });
  const bg = S.grp(); brainOrg(S, 1280, 330, 0.55, { parent: bg }); tl.fromTo(bg, { attr: { transform: "translate(0 -220)" }, opacity: 0 }, { attr: { transform: "translate(0 190)" }, opacity: 1, duration: 0.7, ease: "power2.in", immediateRender: true }, W(27, 2)); tl.to(bg, { opacity: 0, duration: 0.3 }, W(27, 2) + 0.75);
  [[1180, 560], [1280, 540], [1380, 560]].forEach(([x, y], i) => { const st = S.grp(); S.draw(`M${x} ${y} q10 -50 0 -100 M${x + 30} ${y} q-10 -50 0 -100`, S.start, 0, { c: DS.c("gray", 1), w: DS.w.mid, parent: st }); fadeG(S, st, W(27, 3) + i * 0.2); });
  card(S, "BRAIN SOUP", 1280, 190, { t: W(27, 6), size: DS.type.body });
  const tg = S.grp(); [[1700, 560], [1700, 640]].forEach(([x, y]) => { for (let i = 0; i < 4; i++) S.draw(`M${x - 60 + i * 24} ${y - 34} v68`, S.start, 0, { c: DS.P.ink[0], w: DS.w.near, parent: tg }); S.draw(`M${x - 80} ${y + 20} L${x + 50} ${y - 20}`, S.start, 0, { c: DS.c("red"), w: DS.w.mid, parent: tg }); }); fadeG(S, tg, W(27, 9));
  DS.vignette(S); }

// About eighty-six billion neurons, and about eighty-five billion other cells. Roughly one to one.
{ const S = sc(28, 0, { cam: "push", focus: "960 540" }); DS.room(S, LAB2);
  DS.shape(S, rect(940, 480, 40, 400), "gray", { w: "near", tone: 2 }); DS.shape(S, rrect(800, 860, 320, 50, DS.r.sm), "gray", { w: "near", tone: 2 });
  DS.shape(S, rrect(520, 460, 880, 40, DS.r.sm), "gold", { w: "near" });
  [[540, "blue"], [1380, "green"]].forEach(([x, n], i) => { S.draw(`M${x} 500 L${x - 140} 700 M${x} 500 L${x + 140} 700`, S.start, 0, { c: DS.P.ink[0], w: DS.w.mid }); DS.shape(S, `M${x - 190} 700 H${x + 190} Q${x + 150} 790 ${x} 790 Q${x - 150} 790 ${x - 190} 700 Z`, "gray", { w: "near", tone: 1 });
    const dg = S.grp(); for (let j = 0; j < 12; j++) { const dx = ((j % 6) - 2.5) * 56, dy = -Math.floor(j / 6) * 52 - 26; DS.shape(S, circ(x + dx, 690 + dy, 24), n, { w: "mid", parent: dg }); } fadeG(S, dg, i ? W(28, 5) : W(28, 1)); });
  card(S, "86 BILLION NEURONS", 540, 280, { t: W(28, 1), size: DS.type.caption }); card(S, "85 BILLION OTHER CELLS", 1380, 280, { t: W(28, 5), size: DS.type.caption });
  stamp(S, 960, 180, "1 : 1", W(28, 11), "green", { size: DS.type.title });
  DS.vignette(S); }

// And yet in a twenty twelve survey, nearly half the teachers asked in Britain and the Netherlands still believed it.
{ const S = sc(29, 0, { cam: "push", focus: "900 520" }); DS.room(S, LAB2);
  paperR(S, 220, 90, 600, 840); DS.shape(S, rrect(440, 60, 160, 60, DS.r.sm), "gray", { w: "mid", tone: 1 });
  txt(S, "SURVEY 2012", 520, 210, { size: DS.type.small, t: W(29, 4) }); S.text("We only use 10%", 520, 330, { size: DS.type.small, font: "caveat", c: DS.P.ink[0], t: T0(S) }); S.text("of our brain.", 520, 400, { size: DS.type.small, font: "caveat", c: DS.P.ink[0], t: T0(S) });
  [["TRUE", 540], ["FALSE", 680]].forEach(([s, y]) => { S.draw(rrect(300, y - 40, 60, 60, DS.r.xs), S.start, 0, { c: DS.P.ink[0], w: DS.w.near }); txt(S, s, 470, y + 8, { size: DS.type.small }); });
  tick(S, 330, 510, 1.1, W(30, 11), "red");
  card(S, "NEARLY HALF", 1300, 170, { t: W(30, 0), size: DS.type.body });
  [["BRITAIN", 400, 0.48, "48%", 6], ["NETHERLANDS", 600, 0.46, "46%", 9]].forEach(([s, y, f, p, w]) => { const g = S.grp(); DS.shape(S, rrect(1000, y, 700, 90, DS.r.sm), "white", { w: "mid", flat: true, tone: 2, parent: g }); const bar = S.grp(g); DS.shape(S, rrect(1000, y, 700 * f, 90, DS.r.sm), "red", { w: "mid", parent: bar }); growX(bar, W(30, w) + 0.1, 1000, y, 0.9); fadeG(S, g, W(30, w)); txt(S, s, 1350, y - 26, { size: DS.type.caption, t: W(30, w), parent: S.g }); S.text(p, 1000 + 700 * f - 24, y + 64, { size: DS.type.body, c: DS.P.white[0], anchor: "end", t: W(30, w) + 0.9 }); });
  txt(S, "242 TEACHERS", 1350, 850, { size: DS.type.caption, t: W(30, 3), c: DS.c("gray", 2) });
  DS.vignette(S); }

// Dave doesn't care who wrote it. He turns the dial to twenty.
{ const S = sc(31, 0, { cam: "push", focus: "960 600" }); DS.room(S, NITE);
  const D = dialClose(S, 10); D.set(W(31, 9), 20, WE(31, 11) + 0.2 - W(31, 9));
  const ar = S.grp(); S.draw(arc(960, 600, 262, -60, 20), S.start, 0, { c: DS.c("orange"), w: DS.w.near * 1.3, parent: ar }); S.draw(arrowHead(1230, 660, 1.9, 36), S.start, 0, { c: DS.c("orange"), w: DS.w.near * 1.3, parent: ar }); fadeG(S, ar, W(31, 7));
  card(S, "DAVE DOESN'T CARE", 960, 180, { t: W(31, 1), size: DS.type.body });
  DS.vignette(S); }

// ===================== 3. Twenty, fifty, nothing =====================
// Nothing happens. Not even a little bit of kung fu.
{ const S = sc(32, 0, { cam: "push", focus: "960 520" }); DS.room(S, ROOM);
  const F = dave(S, 880, 960, "near", { s: 1.5, look: 0, mood: "flat" }); headband(S, F); F.setPose(W(32, 8), "armsUp"); F.face(W(32, 8), "determined", 0);
  dial(S, 1560, 330, 130, { v: 20 });
  card(S, "20%", 1560, 150, { size: DS.type.body, tc: "red" });
  stamp(S, 420, 330, "NOTHING HAPPENS", W(32, 0) + 0.2, "gray", { size: DS.type.body, rot: -6 });
  const dots = S.grp(); S.text("...", 1180, 420, { size: DS.type.display, c: DS.c("gray", 2), t: T0(S), parent: dots }); fadeG(S, dots, W(32, 3));
  DS.vignette(S); }

// "Brain? Is the extra twenty percent kicking in yet?" (Dave)
{ const S = sc(33, 0, { cam: "push", focus: "800 520" }); DS.room(S, ROOM);
  const F = dave(S, 700, 960, "near", { s: 1.5, look: 6, mood: "worried", pose: "think" }); talk(S, F, W(33, 0), END(33));
  dial(S, 1480, 480, 200, { v: 20 });
  card(S, "20%", 1480, 190, { size: DS.type.title, tc: "red" });
  DS.vignette(S); }

// "Dave, I'm already doing everything. You just never notice." (Brain)
{ const S = sc(34, 0, { cam: "push", focus: "1000 520" }); DS.room(S, ROOM);
  const F = dave(S, 330, 960, "near", { s: 1.1, look: 7, mood: "flat" });
  const B = brainy(S, 1360, 930, 2.1, { face: "tired", armL: "up", armR: "stop" }); B.talk(W(34, 0), END(34));
  const ic = (x, y, t, draw) => { const g = S.grp(); DS.shape(S, circ(x, y, 90), "white", { w: "near", flat: true, parent: g }); draw(g); fadeG(S, g, t); };
  ic(720, 320, W(34, 3), (g) => S.draw(heartPath(720, 322, 2.4), S.start, 0, { fill: DS.c("red"), c: DS.P.ink[0], w: DS.w.mid, parent: g }));
  ic(640, 560, W(34, 3) + 0.25, (g) => { S.draw(`M580 560 Q640 500 700 560 Q640 620 580 560 Z`, S.start, 0, { fill: DS.P.white[0], c: DS.P.ink[0], w: DS.w.mid, parent: g }); S.draw(circ(640, 560, 26), S.start, 0, { fill: DS.c("sky", 2), c: DS.P.ink[0], w: DS.w.detail, parent: g }); });
  ic(780, 790, W(34, 4), (g) => { S.draw(`M730 800 Q720 740 780 740 Q840 740 830 790 Q825 830 790 830 M780 770 Q800 780 790 800`, S.start, 0, { c: DS.P.ink[0], w: DS.w.near, parent: g }); });
  ic(1000, 410, W(34, 4) + 0.3, (g) => { S.draw(`M950 400 Q1000 340 1050 400 M960 400 Q1000 460 1040 400`, S.start, 0, { c: DS.c("blue"), w: DS.w.near, parent: g }); S.draw(`M1000 380 V450`, S.start, 0, { c: DS.c("blue"), w: DS.w.mid, parent: g }); });
  card(S, "EVERYTHING", 760, 150, { t: W(34, 4), size: DS.type.body });
  DS.vignette(S); }

// First problem: your brain is expensive.
{ const S = sc(35, 0, { cam: "push", focus: "960 500" }); DS.room(S, ROOM);
  DS.shadow(S, 960, 880, 520); DS.shape(S, rrect(760, 700, 400, 180, DS.r.sm), "white", { w: "near", tone: 1 });
  const B = brainOrg(S, 960, 500, 1.2);
  const tg = S.grp(); S.draw(`M860 400 Q800 360 740 400`, S.start, 0, { c: DS.P.ink[0], w: DS.w.mid, parent: tg }); DS.shape(S, rrect(560, 380, 230, 110, DS.r.sm), "yellow", { w: "near", parent: tg }); S.text("$$$", 675, 460, { size: DS.type.title, c: DS.c("red", 2), t: T0(S), parent: tg }); fadeG(S, tg, W(35, 5));
  card(S, "PROBLEM 1", 960, 150, { size: DS.type.body, tc: "red" });
  const F = dave(S, 1560, 960, "near", { s: 1.1, look: -7, mood: "wow" });
  DS.vignette(S); }

// It's about two percent of your body weight, and it burns about twenty percent of your energy.
{ const S = sc(36, 0, { cam: "push", focus: "960 520" }); DS.room(S, ROOM);
  const F = dave(S, 400, 960, "near", { s: 1.3, look: 7, mood: "flat" });
  pie(S, 1040, 440, 150, 0.02, { c: "red" }); card(S, "2% OF WEIGHT", 1040, 690, { t: W(36, 2), size: DS.type.small });
  const g = S.grp(); pie(S, 1560, 440, 150, 0.2, { c: "orange", parent: g }); card(S, "20% OF ENERGY", 1560, 690, { size: DS.type.small, parent: g }); fadeG(S, g, W(37, 4));
  const fl = S.grp(); S.draw(`M1560 250 Q1500 190 1540 130 Q1560 170 1590 150 Q1630 210 1560 250 Z`, S.start, 0, { fill: DS.c("orange", 1), c: DS.c("orange", 2), w: DS.w.mid, parent: fl }); fadeG(S, fl, W(37, 2));
  DS.vignette(S); }

// It runs on roughly twenty watts, about a third of an old light bulb,
{ const S = sc(38, 0, { cam: "push", focus: "960 500" }); DS.room(S, ROOM);
  bulbIcon(S, 640, 580, 1.0, { t: W(38, 3) }); txt(S, "20 W", 640, 800, { size: DS.type.title, t: W(38, 4) }); card(S, "YOUR BRAIN", 640, 190, { t: W(38, 3), size: DS.type.small });
  const mb = brainOrg(S, 640, 560, 0.2, { t: W(38, 3) });
  bulbIcon(S, 1260, 520, 1.9, { t: W(38, 10) }); txt(S, "60 W", 1260, 800, { size: DS.type.title, t: W(38, 11) }); card(S, "OLD BULB", 1260, 190, { t: W(38, 10), size: DS.type.small });
  card(S, "ABOUT A THIRD", 950, 890, { t: W(38, 8), size: DS.type.small, tc: "red" });
  DS.vignette(S); }

// and it never fully switches off, not even while you sleep.
{ const S = sc(39, 0, { cam: "push", focus: "960 540" }); DS.room(S, NITE); dim(S, 0.12);
  DS.shape(S, rrect(340, 720, 1080, 70, DS.r.sm), "wood", { w: "near" }); DS.shape(S, rect(340, 780, 36, 160), "wood", { w: "near", tone: 2 }); DS.shape(S, rect(1384, 780, 36, 160), "wood", { w: "near", tone: 2 }); DS.shape(S, rrect(1380, 560, 50, 230, DS.r.sm), "wood", { w: "near", tone: 2 });
  DS.shape(S, circ(1180, 690, 110, 46), "white", { w: "mid", flat: true });
  const F = who(S, 780, 700, "near", { s: 1.15, hair: "side", hairC: DS.c("brown"), outfitC: DS.c("blue"), mood: "sleep", float: true, breathe: false }); F.lie(Math.max(0, S.start - 0.8), 0.01, 88);
  DS.shape(S, rrect(560, 590, 460, 150, DS.r.md), "blue", { w: "near", tone: 1 }); S.draw(`M600 640 H980 M600 690 H980`, S.start, 0, { c: DS.c("blue", 2), w: DS.w.detail });
  const g = S.grp(); S.thought(1320, 320, 280, 190, 1250, 520, S.start, 0.3, { parent: g }); bulbIcon(S, 1320, 330, 0.9, { name: "pink", parent: g }); fadeG(S, g, W(39, 3));
  card(S, "NEVER OFF", 1320, 130, { t: W(39, 4), size: DS.type.body });
  txt(S, "Z z z", 1420, 560, { size: DS.type.title, t: W(39, 8), c: DS.c("gray", 2) });
  DS.vignette(S); }

// If ninety percent of that did nothing, it would be the most expensive nothing you own.
{ const S = sc(40, 0, { cam: "push", focus: "960 520" }); DS.room(S, ROOM);
  const g = S.grp(); DS.shape(S, rect(330, 280, 180, 560), "green", { w: "near", parent: g }); DS.shape(S, rect(330, 280, 180, 504), "gray", { w: "near", tone: 1, parent: g }); fadeG(S, g, W(40, 0));
  card(S, "90% NOTHING", 420, 190, { t: W(40, 2), tc: "red", size: DS.type.small });
  const F = dave(S, 880, 960, "near", { s: 1.2, look: 7, mood: "wow" });
  const c = S.grp(); DS.shadow(S, 1400, 880, 420, { parent: c }); DS.shape(S, rrect(1230, 700, 340, 180, DS.r.sm), "white", { w: "near", tone: 1, parent: c });
  DS.shape(S, `M1260 700 V380 Q1260 330 1310 330 H1490 Q1540 330 1540 380 V700 Z`, "glass", { w: "near", parent: c }); txt(S, "NOTHING", 1400, 800, { size: DS.type.caption, parent: c, t: T0(S) }); fadeG(S, c, W(41, 3));
  const pg = S.grp(); S.draw(`M1540 400 Q1600 380 1640 430`, S.start, 0, { c: DS.P.ink[0], w: DS.w.mid, parent: pg }); DS.shape(S, rrect(1560, 420, 230, 100, DS.r.sm), "gold", { w: "near", parent: pg }); S.text("$$$$", 1675, 490, { size: DS.type.body, c: DS.c("red", 2), t: T0(S), parent: pg }); fadeG(S, pg, W(41, 5));
  DS.vignette(S); }

// And evolution hates paying for nothing.
{ const S = sc(42, 0, { cam: "push", focus: "900 520" }); DS.room(S, LAB2);
  const F = who(S, 640, 940, "near", { s: 1.45, hair: "short", hairC: DS.c("ink", 1), outfitC: DS.c("green"), specs: true, mood: "angry", pose: "hold" });
  DS.shape(S, `M${F.hd[0] - F.r * 1.1} ${F.hd[1] - F.r * 0.45} H${F.hd[0] + F.r * 1.1} L${F.hd[0] + F.r * 1.5} ${F.hd[1] - F.r * 0.3} H${F.hd[0] - F.r * 0.9} Z`, "green", { w: "mid", tone: 2, parent: F.g });
  card(S, "EVOLUTION", 640, 150, { t: W(42, 1), size: DS.type.body });
  paperR(S, 1060, 190, 620, 640); txt(S, "BILL", 1370, 290, { size: DS.type.small }); lines(S, 1110, 350, 520, 3, undefined, 70); txt(S, "BRAIN: 90% NOTHING", 1370, 560, { size: DS.type.caption, c: DS.c("gray", 2) });
  stamp(S, 1370, 700, "DELETE", W(42, 3), "red", { size: DS.type.title, rot: -8 });
  DS.vignette(S); }

// Mexican cavefish live in total darkness, and over many generations, their eyes have all but disappeared.
{ const S = sc(43, 0, { cam: "push", focus: "960 520" }); DS.room(S, NITE); dim(S, 0.22);
  [[300, 130], [700, 70], [1160, 120], [1560, 80]].forEach(([x, h]) => DS.shape(S, `M${x - 90} 64 L${x} ${64 + h} L${x + 90} 64 Z`, "gray", { w: "mid", tone: 2 }));
  const fs = [[480, 1.0], [960, 0.5], [1440, 0]].map(([x, e], i) => { const f = fish(S, x, 560, 0.95, { name: "sky", eye: e, t: i ? W(43, 6 + i * 2) : undefined }); return f; });
  [[690, 560, 780], [1170, 560, 1260]].forEach(([x, y, x2], i) => arrowR(S, x, y, x2, y, W(43, 7 + i * 2)));
  card(S, "MEXICAN CAVEFISH", 960, 190, { t: W(43, 0), size: DS.type.body });
  card(S, "MANY GENERATIONS", 960, 800, { t: W(43, 8), size: DS.type.small });
  card(S, "NO EYES", 1440, 380, { t: W(43, 13), tc: "red", size: DS.type.caption });
  DS.vignette(S); }

// In twenty fifteen, a team at Lund University worked out what eyes cost a young fish: about fifteen percent of its resting energy.
{ const S = sc(44, 0, { cam: "push", focus: "960 520" }); DS.room(S, LAB2);
  const F = who(S, 440, 940, "near", Object.assign({}, COAT, { s: 1.3, look: 7, mood: "smile", pose: "reach" }));
  DS.shape(S, rrect(800, 400, 320, 440, DS.r.md), "glass", { w: "near" }); S.fill(`M810 520 H1110 V830 H810 Z`, S.start, 0, DS.c("sky", 0), 0.55);
  const f = fish(S, 960, 690, 0.32, { name: "orange", eye: 1.4 });
  card(S, "2015", 440, 170, { t: W(44, 1), size: DS.type.title }); card(S, "LUND UNIVERSITY", 960, 190, { t: W(44, 5), size: DS.type.small });
  S.draw(circ(f.eye[0], f.eye[1], 36), W(45, 0), 0, { c: DS.c("red"), w: DS.w.near });
  const g = S.grp(); pie(S, 1570, 520, 150, 0.15, { c: "orange", parent: g }); card(S, "15% OF RESTING ENERGY", 1570, 760, { size: DS.type.caption, parent: g }); fadeG(S, g, W(45, 1));
  DS.vignette(S); }

// In a cave, that's a big bill for a view of nothing.
{ const S = sc(46, 0, { cam: "push", focus: "900 520" }); DS.room(S, NITE); dim(S, 0.22);
  fish(S, 640, 760, 1.0, { name: "sky", eye: 0 });
  const fr = S.grp(); DS.shape(S, rrect(330, 200, 560, 340, DS.r.xs), "wood", { w: "near", parent: fr }); DS.shape(S, rect(360, 230, 500, 280), "ink", { w: "hair", tone: 2, parent: fr }); fadeG(S, fr, W(46, 8)); card(S, "THE VIEW", 610, 590, { t: W(46, 9), size: DS.type.caption });
  const rc = S.grp(); paperR(S, 1100, 160, 560, 640, { parent: rc }); txt(S, "BILL", 1380, 250, { size: DS.type.small, parent: rc, t: T0(S) }); S.draw(`M1150 290 H1610`, S.start, 0, { c: DS.P.ink[0], w: DS.w.mid, parent: rc }); txt(S, "EYES", 1260, 420, { size: DS.type.body, parent: rc, t: T0(S) }); fadeG(S, rc, W(46, 3));
  txt(S, "15%", 1500, 600, { size: DS.type.display, c: DS.c("red", 2), t: W(46, 5) });
  DS.vignette(S); }

// So if ninety percent of your brain were spare, evolution would have trimmed it long ago.
{ const S = sc(47, 0, { cam: "push", focus: "900 520" }); DS.room(S, ROOM);
  const bo = brainOrg(S, 800, 520, 1.5); const ov = bo.all(W(47, 2), 0.8, DS.c("gray", 1));
  card(S, "SPARE 90%", 800, 170, { t: W(47, 2), tc: "gray", size: DS.type.body });
  const sc2 = scissors(S, 1500, 520, 1.2); fadeG(S, sc2.g, W(47, 10)); sc2.snip(W(47, 11), 2);
  tl.to(bo.g, { attr: { transform: `translate(${800 * 0.55} ${520 * 0.55}) scale(0.45)` }, duration: 0.9, ease: "power2.inOut" }, W(47, 13)); tl.to(ov, { opacity: 0, duration: 0.5 }, W(47, 13));
  stamp(S, 1500, 820, "TRIMMED", W(47, 13), "red", { size: DS.type.body });
  DS.vignette(S); }

// Dave turns the dial to fifty. Still nothing.
{ const S = sc(48, 0, { cam: "push", focus: "960 600" }); DS.room(S, NITE);
  const D = dialClose(S, 20); D.set(W(48, 2), 50, W(48, 5) + 0.25 - W(48, 2));
  const B = brainy(S, 1320, 520, 1.1, { face: "tired", armR: "down" });
  card(S, "STILL NOTHING", 820, 180, { t: W(48, 6), size: DS.type.body });
  DS.vignette(S); }

// Second problem: brain scans never find a quiet ninety percent.
{ const S = sc(49, 0, { cam: "push", focus: "900 520" }); DS.room(S, LAB2);
  DS.shape(S, rrect(360, 270, 480, 460, DS.r.lg * 2), "white", { w: "near", tone: 2 }); DS.shape(S, circ(600, 540, 160), "ink", { w: "mid", tone: 1, flat: true });
  DS.shape(S, rect(480, 580, 700, 40), "gray", { w: "near", tone: 1 }); DS.shape(S, rect(900, 620, 30, 330), "gray", { w: "near", tone: 2 });
  const F = who(S, 1000, 580, "near", Object.assign({}, DAVE, { s: 1.2, mood: "flat", float: true, breathe: false })); F.lie(Math.max(0, S.start - 0.8), 0.01, -88);
  const mon = S.grp(); DS.drop(S, rrect(1330, 250, 420, 320, DS.r.md), { parent: mon }); DS.shape(S, rrect(1330, 250, 420, 320, DS.r.md), "ink", { w: "near", tone: 1, parent: mon });
  const mb = brainOrg(S, 1540, 410, 0.55, { name: "gray", parent: mon });
  [0, 1, 2, 3].forEach((i) => mb.region(i, W(49, 3) + i * 0.7, 1.0));
  card(S, "PROBLEM 2", 960, 150, { size: DS.type.body, tc: "red" });
  card(S, "NO QUIET 90%", 1540, 700, { t: W(49, 8), size: DS.type.small, tc: "red" });
  DS.vignette(S); }

// Different parts light up for different jobs, and across a whole day, almost all of it gets a turn.
{ const S = sc(50, 0, { cam: "push", focus: "900 520" }); DS.room(S, LAB2);
  const bo = brainOrg(S, 700, 540, 1.7);
  const jobs = [["SEEING", 2, 290, 540, W(50, 2), W(50, 4)], ["MOVING", 1, 700, 250, W(50, 4), W(50, 6)], ["HEARING", 3, 1010, 760, W(50, 6) - 0.1, 0], ["WORDS", 0, 1090, 400, W(50, 6) + 0.4, 0]];
  jobs.forEach(([s, ri, x, y, t, off]) => { card(S, s, x, y, { t, size: DS.type.caption }); });
  bo.region(2, W(50, 2), 0.7); bo.off(2, W(50, 4), 0.6); bo.region(1, W(50, 4), 0.7); bo.off(1, W(50, 6), 0.6); bo.region(3, W(50, 6) - 0.1, 0.7); bo.region(0, W(50, 6) + 0.4, 0.7);
  clock24(S, 1450, 520, 220, { sweep: [W(51, 1), END(51) - W(51, 1) - 0.4] });
  card(S, "ONE DAY", 1450, 220, { t: W(51, 1), size: DS.type.body });
  card(S, "ALMOST ALL GETS A TURN", 1450, 840, { t: W(51, 8), size: DS.type.caption });
  DS.vignette(S); }

// A Mayo Clinic neurologist put it simply: over a day, you use a hundred percent of your brain.
{ const S = sc(52, 0, { cam: "push", focus: "900 520" }); DS.room(S, LAB2);
  const F = who(S, 520, 940, "near", Object.assign({}, COAT, { s: 1.4, look: 6, mood: "smile", pose: "point" }));
  S.draw(`M${F.cx - 30} ${F.sh[1] + 10} Q${F.cx - 40} ${F.sh[1] + 120} ${F.cx} ${F.sh[1] + 130} Q${F.cx + 40} ${F.sh[1] + 120} ${F.cx + 30} ${F.sh[1] + 10}`, S.start, 0, { c: DS.c("gray", 2), w: DS.w.mid, parent: F.g });
  card(S, "A MAYO CLINIC NEUROLOGIST", 520, 170, { t: W(52, 1), size: DS.type.caption });
  say(S, 1270, 440, 400, 250, 700, 560, ["OVER A DAY:", "100%"], W(52, 7), { size: DS.type.title });
  DS.vignette(S); }

// And there's no spare part. Damage almost any area, even a small one, and something changes. A word, a face, a hand, a feeling.
{ const S = sc(53, 0, { cam: "push", focus: "900 520" }); DS.room(S, ROOM);
  const cr = S.grp(); DS.shape(S, rrect(220, 300, 340, 230, DS.r.sm), "wood", { w: "near", parent: cr }); S.draw(`M240 350 H540`, S.start, 0, { c: DS.c("wood", 2), w: DS.w.mid, parent: cr }); txt(S, "SPARE PARTS", 390, 440, { size: DS.type.caption, parent: cr }); xMark(S, 390, 400, 2.6, W(53, 2));
  const bo = brainOrg(S, 1100, 420, 1.3); const sp = S.grp(); S.draw(circ(bo.X(86), bo.Y(-20), 44), S.start, 0, { fill: DS.c("red", 1), c: DS.c("red"), w: DS.w.near, parent: sp }); fadeG(S, sp, W(53, 8));
  card(S, "EVEN A SMALL ONE", 1100, 150, { t: W(53, 10), size: DS.type.caption });
  const row = (x, t, draw) => { const g = S.grp(); DS.shape(S, circ(x, 830, 78), "white", { w: "near", flat: true, parent: g }); draw(g, x); fadeG(S, g, t); xMark(S, x, 830, 1.7, t + 0.45); };
  row(560, W(54, 3), (g, x) => S.text("Aa", x, 852, { size: DS.type.body, c: DS.P.ink[0], t: T0(S), parent: g }));
  row(800, W(54, 5), (g, x) => { S.draw(circ(x, 830, 44), S.start, 0, { fill: DS.P.paper[0], c: DS.P.ink[0], w: DS.w.mid, parent: g }); S.draw(`M${x - 18} ${822} h1 M${x + 18} ${822} h1`, S.start, 0, { c: DS.P.ink[0], w: DS.w.near * 1.6, parent: g }); S.draw(`M${x - 18} 848 Q${x} 862 ${x + 18} 848`, S.start, 0, { c: DS.P.ink[0], w: DS.w.mid, parent: g }); });
  row(1040, W(54, 7), (g, x) => { S.draw(`M${x - 28} 860 V810 Q${x - 28} 790 ${x - 12} 790 V774 Q${x} 766 ${x + 12} 774 V790 Q${x + 28} 790 ${x + 28} 810 V860 Z`, S.start, 0, { fill: DS.P.paper[0], c: DS.P.ink[0], w: DS.w.mid, parent: g }); });
  row(1280, W(54, 9), (g, x) => S.draw(heartPath(x, 832, 2.2), S.start, 0, { fill: DS.c("red"), c: DS.P.ink[0], w: DS.w.mid, parent: g }));
  DS.vignette(S); }

// "Fine. Then give me all of it, at the same time." (Dave)
{ const S = sc(55, 0, { cam: "push", focus: "800 520" }); DS.room(S, ROOM);
  const F = dave(S, 620, 960, "near", { s: 1.6, look: 4, mood: "angry", pose: "armsUp" }); talk(S, F, W(55, 0), END(55));
  const B = brainy(S, 1380, 930, 1.6, { face: "worried", armL: "up", armR: "stop" });
  DS.vignette(S); }

// ===================== 4. A hundred, all at once =====================
// Dave turns the dial all the way to a hundred.
{ const S = sc(56, 0, { cam: "push", focus: "960 600" }); DS.room(S, NITE);
  const D = dialClose(S, 50); D.set(W(56, 1) + 0.2, 100, W(56, 9) + 0.3 - W(56, 1) - 0.2, "power1.inOut");
  const B = brainy(S, 1320, 520, 1.2, { face: "worried", armR: "stop", armL: "up" });
  card(S, "ALL THE WAY", 960, 180, { t: W(56, 4), size: DS.type.body, tc: "red" });
  DS.vignette(S); }

// Now the question changes: what if every neuron fired at once?
{ const S = sc(57, 0, { cam: "push", focus: "960 520" }); DS.room(S, ROOM);
  const P = [[420, 560], [640, 400], [680, 700], [900, 540], [1110, 380], [1160, 690], [1380, 540], [1560, 400], [1600, 700], [300, 360], [900, 800]], L = [[0, 1], [0, 2], [1, 3], [2, 3], [3, 4], [3, 5], [4, 6], [5, 6], [6, 7], [6, 8], [9, 1], [2, 10], [10, 5]];
  L.forEach(([a, b]) => S.draw(line(P[a], P[b], 0), S.start, 0, { c: DS.c("gray", 1), w: DS.w.mid }));
  const Ns = P.map(([x, y]) => neuron(S, x, y, 0.62, { arms: 4 }));
  Ns.forEach((n, i) => n.lit(W(57, 8) + (i % 3) * 0.1, 2.0));
  card(S, "ALL AT ONCE?", 960, 150, { t: W(57, 4), size: DS.type.body });
  DS.vignette(S); }

// Brain cells talk in tiny electrical pulses called spikes.
{ const S = sc(58, 0, { cam: "push", focus: "960 520" }); DS.room(S, ROOM);
  const A = neuron(S, 480, 460, 1.5, { arms: 5, axon: [560, 0], a0: 120, span: 240 }), B = neuron(S, 1360, 460, 1.5, { arms: 5, a0: 300, span: 240 });
  [W(58, 3), W(58, 5), W(58, 7)].forEach((t, i) => { const p = S.grp(); DS.shape(S, circ(560, 480, 20), "gold", { w: "mid", parent: p }); tl.fromTo(p, { attr: { transform: "translate(0 0)" }, opacity: 0 }, { attr: { transform: "translate(620 -10)" }, opacity: 1, duration: 1.4, ease: "none", immediateRender: true }, t); tl.to(p, { opacity: 0, duration: 0.25 }, t + 1.4); });
  const sp = S.grp(); S.draw(`M360 830 H700 L740 700 L780 900 L820 830 H1160`, S.start, 0, { c: DS.c("red"), w: DS.w.near, parent: sp }); fadeG(S, sp, W(58, 6));
  card(S, "SPIKES", 960, 150, { t: W(58, 8), size: DS.type.title, tc: "red" });
  DS.vignette(S); }

// In two thousand three, the neuroscientist Peter Lennie did the sums for the cortex, your brain's wrinkly outer layer.
{ const S = sc(59, 0, { cam: "push", focus: "1000 520" }); DS.room(S, LAB2);
  const F = who(S, 420, 940, "near", Object.assign({}, COAT, { s: 1.3, look: 6, mood: "determined", pose: "hold" }));
  const bo = brainOrg(S, 1260, 520, 1.5); const rim = S.grp(); S.draw(bo.outline, S.start, 0, { c: DS.c("orange"), w: DS.w.near * 2.2, parent: rim }); fadeG(S, rim, W(59, 13));
  card(S, "2003", 420, 170, { t: W(59, 1), size: DS.type.title }); card(S, "PETER LENNIE", 420, 280, { t: W(59, 6), size: DS.type.caption }); card(S, "THE CORTEX", 1260, 200, { t: W(59, 13), size: DS.type.body, tc: "orange" });
  const pp = S.grp(); paperR(S, 680, 640, 300, 220, { parent: pp }); txt(S, "+ - × =", 830, 760, { size: DS.type.body, parent: pp }); fadeG(S, pp, W(59, 10));
  DS.vignette(S); }

// Its energy budget lets the average neuron there fire only about once every six seconds.
{ const S = sc(60, 0, { cam: "push", focus: "960 520" }); DS.room(S, ROOM);
  const N = neuron(S, 560, 540, 2.2, { arms: 6, axon: [420, 20], a0: 120, span: 240 });
  const t1 = END(60) - 1.0; N.lit(t1, 0.6); const p = S.grp(); DS.shape(S, circ(700, 560, 22), "gold", { w: "mid", parent: p }); tl.fromTo(p, { attr: { transform: "translate(0 0)" }, opacity: 0 }, { attr: { transform: "translate(380 0)" }, opacity: 1, duration: 0.9, ease: "none", immediateRender: true }, t1);
  panel(S, 1440, 520, 480, 400);
  countUp(S, 1440, 580, 0, 6, W(60, 10), END(60) - W(60, 10) - 0.5, { size: DS.type.display, fmt: (n) => Math.round(n) + " s", ease: "none", c: DS.c("ink") });
  card(S, "ONCE EVERY 6 SECONDS", 960, 170, { t: W(60, 11), size: DS.type.body });
  DS.vignette(S); }

// "Once every six seconds? My brain is lazier than me." (Dave)
{ const S = sc(61, 0, { cam: "push", focus: "900 560" }); DS.room(S, ROOM);
  sofa(S, 380, 740, 760, "red");
  const F = who(S, 780, 740 + 46 * 1.2, "near", Object.assign({}, DAVE, { s: 1.2, sit: true, pose: "shrug", mood: "flat", look: 5 })); talk(S, F, W(61, 0), END(61));
  const g = S.grp(); S.thought(1440, 400, 300, 200, 1000, 560, S.start, 0.3, { parent: g }); neuron(S, 1440, 400, 1.3, { parent: g, arms: 5, eyes: true, sad: true }); txt(S, "Z z z", 1560, 280, { size: DS.type.title, parent: g, c: DS.c("gray", 2) }); fadeG(S, g, W(61, 4));
  DS.vignette(S); }

// Now turn every neuron up to a hundred spikes a second.
{ const S = sc(62, 0, { cam: "push", focus: "960 520" }); DS.room(S, ROOM);
  const N = neuron(S, 460, 540, 1.8, { arms: 6, axon: [360, 0], a0: 120, span: 240 });
  panel(S, 1320, 520, 820, 440);
  S.draw(`M960 660 H1700`, S.start, 0, { c: DS.P.ink[0], w: DS.w.mid }); S.draw(`M1000 660 V440 M1000 440 H1000`, S.start, 0, { c: DS.c("red"), w: DS.w.near });
  const g = S.grp(); for (let i = 0; i < 90; i++) S.draw(`M${1060 + i * 7.6} 660 V${430 + (i % 3) * 20}`, S.start, 0, { c: DS.c("red"), w: DS.w.detail, parent: g }); wipe(g, 1040, 380, 700, 300, W(62, 6), W(62, 9) - W(62, 6));
  card(S, "100 SPIKES / SECOND", 1320, 190, { t: W(62, 6), size: DS.type.caption });
  DS.vignette(S); }

// Your cortex would need about seventy-nine times its normal energy.
{ const S = sc(63, 0, { cam: "push", focus: "960 520" }); DS.room(S, ROOM);
  DS.shape(S, rect(540, 850, 200, 10), "green", { w: "mid" }); txt(S, "NORMAL", 640, 910, { size: DS.type.caption }); txt(S, "1×", 640, 800, { size: DS.type.title, c: DS.c("green", 2) });
  const bar = S.grp(); DS.shape(S, rect(1060, 210, 240, 650), "red", { w: "near", parent: bar }); scaleY(bar, W(63, 5), 1180, 860, 1.2, 0.012, 1);
  txt(S, "79 TIMES", 1180, 910, { size: DS.type.caption, t: W(63, 5) });
  countUp(S, 1180, 160, 1, 79, W(63, 5), 1.2, { size: DS.type.display, fmt: (n) => Math.round(n) + "×", c: DS.c("red", 2), t0: W(63, 5) });
  DS.vignette(S); }

// That's roughly eight times as much food, every day, just to keep the lights on.
{ const S = sc(64, 0, { cam: "push", focus: "960 540" }); DS.room(S, ROOM);
  DS.shape(S, circ(500, 700, 150, 40), "white", { w: "near", flat: true }); burger(S, 500, 660, 1.3);
  txt(S, "1×", 500, 330, { size: DS.type.display, c: DS.c("green", 2) });
  const pos = [[1100, 760], [1300, 760], [1500, 760], [1700, 760], [1200, 640], [1400, 640], [1600, 640], [1400, 520]];
  pos.forEach(([x, y], i) => burger(S, x, y, 1.0, { t: W(64, 2) + i * 0.22 }));
  card(S, "× 8 THE FOOD", 1400, 300, { t: W(64, 2), size: DS.type.title, tc: "red" });
  const bl = S.grp(); bulbIcon(S, 960, 250, 0.9, { parent: bl }); fadeG(S, bl, W(64, 13));
  DS.vignette(S); }

// But the food bill isn't the worst part.
{ const S = sc(65, 0, { cam: "push", focus: "800 520" }); DS.room(S, ROOM);
  paperR(S, 400, 130, 520, 700); txt(S, "FOOD BILL", 660, 230, { size: DS.type.small }); txt(S, "× 8", 660, 520, { size: DS.type.display, c: DS.c("red", 2) }); lines(S, 450, 300, 420, 2, undefined, 60);
  card(S, "WORSE?", 1230, 350, { t: W(65, 6), size: DS.type.display, tc: "red" });
  const B = brainy(S, 1560, 930, 1.5, { face: "worried", armL: "up", armR: "stop" }); B.enter(W(65, 4), 140, 0, 0.5, 0.7);
  DS.vignette(S); }

// When huge numbers of neurons fire together, all in step, doctors have a name for it. It's a seizure.
{ const S = sc(66, 0, { cam: "push", focus: "960 520" }); DS.room(S, LAB2);
  const row = []; for (let i = 0; i < 6; i++) { const g = S.grp(); neuron(S, 280 + i * 200, 560, 0.7, { parent: g, arms: 4, eyes: true }); row.push(g); tl.to(g, { x: 26, duration: 1.2, ease: "sine.inOut", yoyo: true, repeat: Math.ceil(S.len / 1.2) }, S.start); }
  card(S, "ALL IN STEP", 700, 280, { t: W(66, 7), size: DS.type.body });
  const F = who(S, 1580, 940, "near", Object.assign({}, DOC, { s: 1.3, mood: "smile", pose: "hold", t: W(66, 10) }));
  card(S, "A SEIZURE", 1580, 190, { t: W(66, 17), size: DS.type.body, tc: "blue" });
  DS.vignette(S); }

// You don't get superpowers. In many seizures, a person isn't even aware it's happening.
{ const S = sc(67, 0, { cam: "push", focus: "1000 540" }); DS.room(S, ROOM);
  fadeG(S, panel(S, 440, 520, 560, 700), undefined); const cp = S.grp(); S.draw(`M360 300 H520 L580 420 Q520 760 440 780 Q360 760 300 420 Z`, S.start, 0, { fill: DS.c("red"), c: DS.P.ink[0], w: DS.w.near, parent: cp }); xMark(S, 440, 540, 3.4, W(67, 3));
  card(S, "NO SUPERPOWERS", 440, 190, { t: W(67, 2), size: DS.type.caption, tc: "red" });
  sofa(S, 900, 700, 640, "blue");
  const P = who(S, 1180, 700 + 46 * 1.1, "near", Object.assign({}, WOMAN2, { sit: true, mood: "tired", pose: "stand", look: 0, t: W(67, 6) }));
  const FR = who(S, 840, 960, "near", { s: 1.1, hair: "short", hairC: DS.c("ink", 1), outfitC: DS.c("green"), mood: "smile", pose: "reach", t: W(67, 6) });
  const g = S.grp(); S.thought(1300, 330, 230, 150, 1230, 520, S.start, 0.3, { parent: g }); txt(S, "...", 1300, 380, { size: DS.type.display, parent: g, c: DS.c("gray", 2) }); fadeG(S, g, W(67, 9));
  card(S, "NOT EVEN AWARE", 1300, 150, { t: W(67, 9), size: DS.type.caption });
  DS.vignette(S); }

// Around fifty million people live with epilepsy, and for them it's no superpower.
{ const S = sc(68, 0, { cam: "push", focus: "960 540" }); DS.room(S, ROOM);
  for (let i = 0; i < 50; i++) { const x = 400 + (i % 10) * 124, y = 520 + Math.floor(i / 10) * 80; mini(S, x, y, 1.1, { t: W(68, 1) + 0.3 + Math.floor(i / 10) * 0.25, fill: DS.c("sky", 1), c: DS.c("navy", 1) }); }
  countUp(S, 960, 330, 0, 50, W(68, 1), 1.6, { size: DS.type.display, fmt: (n) => Math.round(n) + " MILLION", c: DS.c("blue", 2), t0: W(68, 1) });
  card(S, "EPILEPSY", 960, 140, { t: W(68, 6), size: DS.type.body });
  txt(S, "1 PERSON = 1 MILLION", 960, 925, { size: DS.type.caption, c: DS.c("gray", 2), t: W(68, 3) });
  DS.vignette(S); }

// It's something doctors work hard to stop, and with treatment, up to seven in ten could be seizure free.
{ const S = sc(69, 0, { cam: "push", focus: "1000 540" }); DS.room(S, ROOM);
  const F = who(S, 400, 940, "near", Object.assign({}, DOC, { s: 1.35, mood: "smile", pose: "hold" }));
  pillBottle(S, 700, 700, 0.9, { t: W(69, 8) });
  const people = [];
  for (let i = 0; i < 10; i++) { const x = 840 + i * 100; const m = mini(S, x, 640, 1.2, { t: W(69, 10), fill: DS.c("gray", 1), c: DS.c("gray", 2) }); if (i < 7) { const gm = mini(S, x, 640, 1.2, { fill: DS.c("green", 1), c: DS.c("green", 2) }); fadeG(S, gm, W(69, 12) + i * 0.12); tick(S, x, 740, 0.9, W(69, 12) + 0.3 + i * 0.12); } }
  card(S, "UP TO 7 IN 10", 1290, 330, { t: W(69, 12), size: DS.type.title, tc: "green" });
  card(S, "SEIZURE FREE", 1290, 880, { t: W(69, 17), size: DS.type.body });
  DS.vignette(S); }

// So the dial at a hundred doesn't turn Dave into a genius.
{ const S = sc(70, 0, { cam: "push", focus: "960 540" }); DS.room(S, ROOM);
  dial(S, 520, 520, 260, { v: 100 });
  const F = dave(S, 1330, 960, "near", { s: 1.4, look: -6, mood: "flat" });
  const bl = S.grp(); bulbIcon(S, 1330, 250, 0.8, { parent: bl }); xMark(S, 1330, 250, 2.2, W(70, 10));
  card(S, "GENIUS?", 1330, 130, { t: W(70, 10), size: DS.type.body, tc: "red" });
  DS.vignette(S); }

// It asks his brain to do the one thing it spends all day trying not to do.
{ const S = sc(71, 0, { cam: "push", focus: "1000 540" }); DS.room(S, ROOM);
  DS.shadow(S, 1200, 900, 700);
  DS.shape(S, rrect(930, 180, 520, 680, DS.r.sm), "gray", { w: "near", tone: 1 }); DS.shape(S, rrect(960, 210, 460, 620, DS.r.xs), "gray", { w: "mid", tone: 2, flat: true });
  for (let i = 0; i < 6; i++) { const x = 1010 + (i % 3) * 140, y = 270 + Math.floor(i / 3) * 210; DS.shape(S, rrect(x, y, 80, 150, DS.r.xs), "ink", { w: "mid", tone: 1, flat: true }); DS.shape(S, rrect(x + 14, y + 12, 52, 56, DS.r.xs), "green", { w: "detail", flat: true }); }
  DS.shape(S, rrect(830, 640, 110, 190, DS.r.sm), "gray", { w: "near" });
  const lv = S.grp(); S.draw(`M885 760 L832 630`, S.start, 0, { c: DS.c("ink"), w: DS.w.near * 2.2, parent: lv }); DS.shape(S, circ(832, 626, 26), "red", { w: "near", parent: lv });
  const B = brainy(S, 600, 930, 1.75, { face: "stern", armR: "point" }); sweatAt(S, 640, 520, W(71, 10), 1.6);
  card(S, "ALL AT ONCE", 1190, 120, { t: W(71, 7), size: DS.type.body, tc: "red" }); card(S, "ALL DAY", 600, 120, { t: W(71, 11), size: DS.type.body });
  DS.vignette(S); }

// "I did warn you about a hundred. Put it back, please." (Brain)
{ const S = sc(72, 0, { cam: "push", focus: "960 600" }); DS.room(S, NITE);
  const D = dialClose(S, 100); D.set(W(72, 7), 10, WE(72, 10) + 0.3 - W(72, 7), "power2.inOut");
  const B = brainy(S, 560, 560, 1.3, { face: "stern", armR: "point" }); B.talk(W(72, 0), END(72)); B.arm(W(72, 7), "R", "stop");
  card(S, "PUT IT BACK", 1480, 330, { t: W(72, 7), size: DS.type.body, tc: "red" });
  DS.vignette(S); }

// ===================== 5. The librarians =====================
const libRoom = (S) => { DS.room(S, LIB); shelf(S, 400, 120, 1120, 4); };
// So how does your brain stop it from happening?
{ const S = sc(73, 0, { cam: "push", focus: "1000 520" }); DS.room(S, ROOM);
  [[340, 360], [340, 600], [560, 480], [560, 720], [780, 360], [780, 600]].forEach(([x, y]) => { neuron(S, x, y, 0.6, { arms: 4 }); S.draw(arrowHead(x + 100, y, 0, 30), S.start, 0, { c: DS.c("green"), w: DS.w.near }); S.draw(`M${x + 60} ${y} H${x + 100}`, S.start, 0, { c: DS.c("green"), w: DS.w.near }); });
  txt(S, "GO!", 560, 200, { size: DS.type.title, c: DS.c("green", 2) });
  const B = brainy(S, 1340, 930, 1.9, { face: "stern", armR: "stop", armL: "hip" });
  const sg = S.grp(); S.draw(`M1470 560 V420`, S.start, 0, { c: DS.c("brown"), w: DS.w.near * 1.4, parent: sg }); DS.shape(S, poly(Array.from({ length: 8 }, (_, i) => [1470 + Math.cos(Math.PI / 8 + (i * Math.PI) / 4) * 120, 340 + Math.sin(Math.PI / 8 + (i * Math.PI) / 4) * 120]), 0) + " Z", "red", { w: "near", parent: sg }); S.text("STOP", 1470, 360, { size: DS.type.body, c: DS.P.white[0], t: T0(S), parent: sg }); fadeG(S, sg, W(73, 5));
  DS.vignette(S); }

// It hires staff whose whole job is saying shush.
{ const S = sc(74, 0, { cam: "push", focus: "960 520" }); libRoom(S);
  const pp = S.grp(); paperR(S, 220, 330, 400, 460, { parent: pp }); txt(S, "HELP WANTED", 420, 430, { size: DS.type.caption, parent: pp }); txt(S, "SHUSHER", 420, 540, { size: DS.type.body, parent: pp, c: DS.c("red", 2) }); lines(S, 270, 600, 300, 2, undefined, 50, pp); fadeG(S, pp, W(74, 1));
  const B = brainy(S, 1000, 930, 2.1, { face: "shh", armR: "shush", armL: "hip" });
  card(S, "STAFF", 1330, 640, { t: W(74, 2), size: DS.type.caption }); arrowR(S, 1270, 640, 1050, 700, W(74, 2));
  card(S, "SHHH", 1500, 250, { t: W(74, 8), size: DS.type.title });
  DS.vignette(S); }

// In the human cortex, somewhere between one in five and one in four neurons is inhibitory.
{ const S = sc(75, 0, { cam: "push", focus: "960 520" }); DS.room(S, LAB2);
  const lib = [3, 7, 11, 16, 19];
  for (let i = 0; i < 20; i++) { const x = 600 + (i % 5) * 150, y = 290 + Math.floor(i / 5) * 150; neuron(S, x, y, 0.9, { arms: 0 }); const j = lib.indexOf(i); if (j >= 0) { const g = S.grp(); neuron(S, x, y, 0.9, { arms: 0, lib: true, name: "pink", parent: g }); fadeG(S, g, j < 4 ? W(75, 6) + j * 0.2 : W(75, 11)); } }
  card(S, "1 IN 5", 1560, 330, { t: W(75, 8), size: DS.type.title, tc: "red" }); card(S, "TO 1 IN 4", 1560, 520, { t: W(75, 11), size: DS.type.title, tc: "red" });
  card(S, "INHIBITORY", 960, 130, { t: W(75, 14), size: DS.type.body });
  DS.vignette(S); }

// When they fire, they stop other neurons from firing.
{ const S = sc(76, 0, { cam: "push", focus: "960 520" }); DS.room(S, LAB2);
  const A = neuron(S, 480, 540, 1.6, { lib: true, name: "pink", arms: 4, axon: [440, 0], a0: 120, span: 240 }), B = neuron(S, 1340, 540, 1.6, { arms: 5, a0: 300, span: 240, eyes: true, sad: true });
  A.lit(W(76, 2), 0.6); const p = S.grp(); DS.shape(S, circ(560, 550, 20), "gold", { w: "mid", parent: p }); tl.fromTo(p, { attr: { transform: "translate(0 0)" }, opacity: 0 }, { attr: { transform: "translate(360 0)" }, opacity: 1, duration: 1.1, ease: "none", immediateRender: true }, W(76, 2)); tl.to(p, { opacity: 0, duration: 0.2 }, W(76, 2) + 1.1);
  const tb = S.grp(); S.draw(`M960 450 V630`, S.start, 0, { c: DS.c("red"), w: DS.w.near * 2, parent: tb }); fadeG(S, tb, W(76, 3));
  card(S, "STOP!", 960, 220, { t: W(76, 4), size: DS.type.title, tc: "red" });
  DS.vignette(S); }

// "Quiet, please. All of you. Not you. You may speak." (Brain)
{ const S = sc(77, 0, { cam: "push", focus: "1000 520" }); libRoom(S);
  const B = brainy(S, 400, 930, 1.9, { face: "shh", armR: "shush", armL: "hip" }); B.talk(W(77, 0), END(77)); B.arm(W(77, 5), "R", "point"); B.face(W(77, 5), "tired");
  panel(S, 1250, 590, 900, 600); const N = []; [[900, 470], [1130, 470], [1360, 470], [1590, 470], [900, 720], [1130, 720], [1360, 720], [1590, 720]].forEach(([x, y], i) => { const n = neuron(S, x, y, 1.0, { arms: 0, eyes: true, look: -1 }); N.push(n); });
  const sp = S.grp(); S.draw(circ(1360, 720, 80), S.start, 0, { c: DS.c("gold"), w: DS.w.near, parent: sp }); fadeG(S, sp, W(77, 7)); N[6].lit(W(77, 7), 0.8);
  DS.vignette(S); }

// They're your brain's librarians. Without them, every book in the building would start shouting at once.
{ const S = sc(78, 0, { cam: "push", focus: "960 520" }); libRoom(S);
  DS.shape(S, rrect(260, 760, 700, 190, DS.r.sm), "wood", { w: "near", tone: 2 }); const g = S.grp();
  const B = brainy(S, 610, 790, 1.5, { face: "tired", armR: "shush", parent: g }); tl.to(g, { opacity: 0, duration: 0.5 }, W(78, 5));
  card(S, "LIBRARIAN", 610, 200, { t: W(78, 3), size: DS.type.body });
  const sn = S.grp(); DS.shape(S, rrect(495, 800, 230, 70, DS.r.xs), "white", { w: "detail", flat: true, parent: sn }); S.text("BACK SOON", 610, 850, { size: DS.type.caption, c: DS.P.ink[0], t: T0(S), parent: sn }); fadeG(S, sn, W(78, 6));
  for (let i = 0; i < 5; i++) { const x = 1050 + i * 150, hh = 270 + (i % 2) * 40, g2 = S.grp(); DS.shape(S, rrect(x, 840 - hh, 120, hh, DS.r.xs), ["red", "blue", "green", "orange", "purple"][i], { w: "near", parent: g2 }); S.draw(circ(x + 60, 840 - hh * 0.62, 28, 36), S.start, 0, { fill: MOUTHC, c: DS.P.ink[0], w: DS.w.mid, parent: g2 }); [-1, 1].forEach((sd) => { S.draw(circ(x + 60 + sd * 24, 840 - hh * 0.62 - 56, 11), S.start, 0, { fill: DS.P.white[0], c: DS.P.ink[0], w: DS.w.detail, parent: g2 }); S.fill(circ(x + 60 + sd * 24, 840 - hh * 0.62 - 54, 4), S.start, 0, DS.P.ink[0], 1, g2); }); fadeG(S, g2, W(78, 9) + i * 0.25); S.text(["!!", "BOOK!", "!!!", "HEY!", "!!"][i], x + 60, 840 - hh - 30 - (i % 2) * 20, { size: DS.type.body, c: DS.c("red", 2), t: W(78, 11) + i * 0.15 }); }
  DS.vignette(S); }

// And the quiet isn't wasted space. The quiet is the message.
{ const S = sc(79, 0, { cam: "push", focus: "960 520" }); DS.room(S, LAB2);
  const ps = []; for (let r = 0; r < 4; r++) for (let c = 0; c < 8; c++) ps.push([300 + c * 190 + (r % 2) * 90, 330 + r * 150]);
  ps.forEach(([x, y], i) => { if (i === 13) return; neuron(S, x, y, 0.42, { arms: 3, name: "gray" }); });
  const [lx, ly] = ps[13]; const N = neuron(S, lx, ly, 0.7, { arms: 5 }); N.lit(W(79, 6), 0.8);
  card(S, "THE QUIET IS THE MESSAGE", 960, 150, { t: W(79, 6), size: DS.type.body });
  const e = envelope2(S, lx, ly - 150, 1.0); fadeG(S, e, W(79, 9));
  DS.vignette(S); }

// In two thousand five, Rodrigo Quian Quiroga's team recorded single neurons in patients
{ const S = sc(80, 0, { cam: "push", focus: "1000 520" }); DS.room(S, LAB2);
  [[260, COAT], [500, DOC]].forEach(([x, o]) => who(S, x, 940, "near", Object.assign({}, o, { s: 1.2, mood: "smile", look: 6, pose: o === DOC ? "hold" : "stand" })));
  card(S, "2005", 380, 170, { t: W(80, 1), size: DS.type.title }); card(S, "QUIROGA'S TEAM", 380, 290, { t: W(80, 4), size: DS.type.caption });
  sofa(S, 700, 760, 420, "gray"); const P = who(S, 910, 760 + 46 * 1.1, "near", Object.assign({}, WOMAN2, { sit: true, mood: "smile", pose: "hold", t: W(80, 11) }));
  const mon = S.grp(); DS.shape(S, rrect(1260, 240, 460, 340, DS.r.md), "ink", { w: "near", tone: 1, parent: mon }); S.draw(`M1290 450 H1440 L1470 330 L1500 520 L1530 450 H1690`, S.start, 0, { c: DS.c("green", 1), w: DS.w.near, parent: mon }); fadeG(S, mon, W(80, 8));
  card(S, "1 NEURON", 1490, 680, { t: W(80, 10), size: DS.type.body, tc: "green" });
  DS.vignette(S); }

// who already had electrodes in their brains to find the source of their seizures.
{ const S = sc(81, 0, { cam: "push", focus: "900 520" }); DS.room(S, LAB2);
  const bo = brainOrg(S, 760, 520, 1.6);
  const el2 = S.grp(); [[620, -90], [760, -100], [880, -60], [960, 30], [540, -10]].forEach(([dx, dy]) => { S.draw(`M${bo.cx + dx * 1.0} ${bo.cy + dy * 1.0} Q${bo.cx + dx * 1.0} 160 1300 160`, S.start, 0, { c: DS.c("gray", 2), w: DS.w.detail, parent: el2 }); S.fill(circ(bo.cx + dx * 1.0, bo.cy + dy * 1.0, 7), S.start, 0, DS.c("gold"), 1, el2); }); fadeG(S, el2, W(81, 3));
  DS.shape(S, rrect(1300, 110, 200, 100, DS.r.sm), "gray", { w: "near", tone: 1 });
  const F = who(S, 1620, 940, "near", Object.assign({}, DOC, { s: 1.3, mood: "smile", pose: "reachL", look: -6 }));
  S.draw(circ(bo.X(86), bo.Y(-20), 60), W(81, 10), 0, { c: DS.c("red"), w: DS.w.near }); card(S, "THE SOURCE", 1200, 800, { t: W(81, 10), size: DS.type.body, tc: "red" });
  DS.vignette(S); }

// quiroga stage: the lit neuron and its pictures
const quiroga = (S, stage) => {
  const NY = [250, 400, 550, 700, 850], ns = NY.map((y, i) => neuron(S, 420, y, 0.72, { arms: 4, eyes: i === 2, name: i === 2 ? "blue" : "gray" }));
  return ns[2]; };
// One neuron fired for photos of one particular actress, for a drawing of her, even for her name written down,
{ const S = sc(82, 0, { cam: "push", focus: "1000 520" }); DS.room(S, LAB2);
  const N = quiroga(S, 0); N.lit(W(82, 2), 0.8);
  const fr = [[1000, 300, 0, W(82, 4)], [1000, 700, 1, W(82, 11)]];
  S.draw(line([480, 550], [880, 320], 0), W(82, 4), 0, { c: DS.c("gold", 2), w: DS.w.mid }); S.draw(line([480, 550], [880, 680], 0), W(82, 11), 0, { c: DS.c("gold", 2), w: DS.w.mid });
  fadeG(S, portrait(S, 1000, 300, 300, 330), W(82, 4)); fadeG(S, portrait(S, 1000, 700, 300, 330, { line: true }), W(82, 11));
  S.draw(line([480, 550], [1360, 520], 0), W(83, 2), 0, { c: DS.c("gold", 2), w: DS.w.mid });
  const nm = S.grp(); paperR(S, 1300, 380, 320, 280, { parent: nm }); lines(S, 1340, 460, 240, 3, undefined, 56, nm); txt(S, "HER NAME", 1460, 590, { size: DS.type.caption, parent: nm, c: DS.c("gray", 2) }); fadeG(S, nm, W(83, 2));
  DS.vignette(S); }

// and stayed almost silent for nearly everything else.
{ const S = sc(84, 0, { cam: "push", focus: "1000 520" }); DS.room(S, LAB2);
  const N = quiroga(S, 1); N.on(); N.dim(W(84, 2), 1.0);
  const items = [[880, 300, "sp"], [1130, 300, "ho"], [1380, 300, "tr"], [1630, 300, "gi"], [880, 700, "ca"], [1130, 700, "fl"], [1380, 700, "st"], [1630, 700, "ap"]];
  const draw = (g, x, y, k) => { if (k === "sp") { S.draw(`M${x} ${y - 60} V${y + 70}`, S.start, 0, { c: DS.c("gray", 2), w: DS.w.near * 1.4, parent: g }); S.draw(circ(x, y - 82, 22, 30), S.start, 0, { fill: DS.c("gray", 1), c: DS.P.ink[0], w: DS.w.mid, parent: g }); } else if (k === "ho") { DS.shape(S, `M${x - 60} ${y + 50} V${y - 10} L${x} ${y - 60} L${x + 60} ${y - 10} V${y + 50} Z`, "earth", { w: "mid", parent: g }); } else if (k === "tr") { DS.shape(S, rect(x - 10, y + 10, 20, 60), "brown", { w: "mid", parent: g }); DS.shape(S, circ(x, y - 20, 50), "green", { w: "mid", parent: g }); } else if (k === "gi") { giraffe(S, x, y + 70, 0.45, { parent: g }); } else if (k === "ca") { DS.shape(S, rrect(x - 70, y - 10, 140, 50, DS.r.sm), "red", { w: "mid", parent: g }); DS.shape(S, circ(x - 38, y + 44, 18), "ink", { w: "mid", parent: g }); DS.shape(S, circ(x + 38, y + 44, 18), "ink", { w: "mid", parent: g }); } else if (k === "fl") { DS.shape(S, circ(x, y - 20, 24), "gold", { w: "mid", parent: g }); [0, 1, 2, 3, 4].forEach((i) => DS.shape(S, circ(x + Math.cos(i * 1.256) * 40, y - 20 + Math.sin(i * 1.256) * 40, 20), "pink", { w: "detail", parent: g })); S.draw(`M${x} ${y + 20} V${y + 80}`, S.start, 0, { c: DS.c("green", 2), w: DS.w.mid, parent: g }); } else if (k === "st") { const pts = []; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + (i / 10) * Math.PI * 2, r = i % 2 ? 26 : 60; pts.push([x + Math.cos(a) * r, y + Math.sin(a) * r]); } DS.shape(S, poly(pts, 0) + " Z", "yellow", { w: "mid", parent: g }); } else DS.shape(S, circ(x, y, 50), "red", { w: "mid", parent: g }); };
  items.forEach(([x, y, k], i) => { const g = S.grp(); DS.shape(S, rrect(x - 90, y - 110, 180, 220, DS.r.xs), "white", { w: "detail", flat: true, parent: g }); draw(g, x, y + 10, k); fadeG(S, g, W(84, 5) + i * 0.2); });
  txt(S, "...", 420, 920, { size: DS.type.display, c: DS.P.ink[0], t: W(84, 3) });
  DS.vignette(S); }

// If that neuron fired for everything, it would fire for your grandma, a spoon and a giraffe.
{ const S = sc(85, 0, { cam: "push", focus: "1000 520" }); DS.room(S, LAB2);
  const N = quiroga(S, 2); N.lit(W(85, 3), 0.8);
  [[1000, 280, W(85, 11)], [1000, 600, W(85, 13)], [1400, 440, W(85, 16)]].forEach(([x, y, t], i) => { S.draw(line([480, 550], [x - 120, y], 0), t, 0, { c: DS.c("gold", 2), w: DS.w.mid }); const g = S.grp(); DS.shape(S, rrect(x - 120, y - 150, 240, 300, DS.r.xs), "white", { w: "detail", flat: true, parent: g });
    if (i === 0) { const F = who(S, x, y + 140, "near", { s: 0.78, hair: "bun", hairC: DS.c("gray", 1), outfitC: DS.c("purple"), specs: true, mood: "smile", float: true, parent: g }); } else if (i === 1) { S.draw(`M${x} ${y - 100} V${y + 110}`, S.start, 0, { c: DS.c("gray", 2), w: DS.w.near * 1.6, parent: g }); S.draw(circ(x, y - 120, 34, 46), S.start, 0, { fill: DS.c("gray", 1), c: DS.P.ink[0], w: DS.w.mid, parent: g }); } else giraffe(S, x - 50, y + 130, 0.58, { parent: g });
    fadeG(S, g, t); });
  card(S, "GRANDMA", 1000, 880, { t: W(85, 11), size: DS.type.caption });
  DS.vignette(S); }

// And it would mean nothing at all.
{ const S = sc(86, 0, { cam: "push", focus: "960 520" }); DS.room(S, LAB2);
  const cols = ["red", "blue", "green", "orange", "purple", "pink", "gold", "earth"];
  const pts = cols.map((c, i) => [960 + Math.cos(i * 0.785 + 0.4) * 640, 500 + Math.sin(i * 0.785 + 0.4) * 340]);
  pts.forEach(([x, y]) => S.draw(line([960, 500], [x, y], 0), S.start, 0, { c: DS.c("gold", 2), w: DS.w.mid }));
  pts.forEach(([x, y], i) => { DS.shape(S, rrect(x - 70, y - 70, 140, 140, DS.r.xs), "white", { w: "detail", flat: true }); DS.shape(S, [circ(x, y, 34), `M${x - 36} ${y + 30} L${x} ${y - 36} L${x + 36} ${y + 30} Z`, rect(x - 32, y - 32, 64, 64)][i % 3], cols[i], { w: "mid" }); });
  const N = neuron(S, 960, 500, 1.2, { arms: 6 }); N.on();
  stamp(S, 960, 840, "MEANS NOTHING", W(86, 3), "red", { size: DS.type.title, rot: -4 });
  DS.vignette(S); }

// A thought isn't your whole brain lighting up.
{ const S = sc(87, 0, { cam: "push", focus: "960 520" }); DS.room(S, ROOM);
  const bo = brainOrg(S, 960, 500, 1.7); bo.all(W(87, 4), 1.4);
  xMark(S, 960, 500, 7, W(87, 6)); card(S, "A THOUGHT", 960, 140, { t: W(87, 1), size: DS.type.body });
  DS.vignette(S); }

// It's a few of the right cells speaking, while billions of others politely stay quiet.
{ const S = sc(88, 0, { cam: "push", focus: "900 520" }); DS.room(S, LAB2);
  const bo = brainOrg(S, 820, 500, 2.0, { name: "gray" });
  const lit = [[790, 450], [900, 380], [680, 500], [980, 520], [840, 560], [760, 380]];
  for (let i = 0; i < 70; i++) { const a = i * 2.399, r = Math.sqrt(i / 70) * 250; const x = 820 + Math.cos(a) * r * 1.1, y = 480 + Math.sin(a) * r * 0.78; S.fill(circ(x, y, 9), S.start, 0, DS.c("gray", 2), 0.8); }
  lit.forEach(([x, y], i) => neuron(S, x, y, 0.28, { arms: 0 }).lit(W(88, 2) + i * 0.35, 0.8));
  card(S, "A FEW SPEAK", 820, 150, { t: W(88, 6), size: DS.type.body });
  const B = brainy(S, 1600, 930, 1.5, { face: "tired", armR: "down" }); B.face(W(88, 12), "shh"); B.arm(W(88, 12), "R", "shush");
  card(S, "BILLIONS STAY QUIET", 1400, 150, { t: W(88, 10), size: DS.type.caption });
  DS.vignette(S); }

// ===================== 6. The twist =====================
// And here's the twist. The ten percent myth didn't just get the number wrong.
{ const S = sc(89, 0, { cam: "push", focus: "1000 520" }); DS.room(S, ROOM);
  const g = S.grp(); DS.drop(S, rrect(780, 330, 700, 330, DS.r.sm), { parent: g }); DS.shape(S, rrect(770, 320, 700, 330, DS.r.sm), "yellow", { w: "near", parent: g }); S.text("10%", 1120, 540, { size: DS.type.display, c: DS.P.ink[0], t: T0(S), parent: g }); g.setAttribute("transform", "rotate(-5 1120 480)");
  const F = dave(S, 400, 960, "near", { s: 1.2, look: 7, mood: "wow" });
  card(S, "THE TWIST", 1000, 150, { t: W(89, 2), size: DS.type.title });
  xMark(S, 1120, 480, 4.2, W(89, 11)); stamp(S, 1120, 800, "WRONG", W(89, 12), "red", { size: DS.type.title, rot: 6 });
  DS.vignette(S); }

// At any single moment, ten percent was too generous.
{ const S = sc(90, 0, { cam: "push", focus: "960 520" }); DS.room(S, LAB2);
  const G = dots100(S, 960, 560, 56); for (let i = 0; i < 10; i++) G.lit(i, W(90, 4) + i * 0.08, 0.5);
  xMark(S, 960, 560, 4.5, W(90, 6));
  card(S, "AT ONE MOMENT", 960, 150, { t: W(90, 0), size: DS.type.body }); card(S, "TOO GENEROUS", 960, 900, { t: W(90, 7), size: DS.type.body, tc: "red" });
  DS.vignette(S); }

// Peter Lennie's sums suggest the energy budget limits, possibly to fewer than one percent, the neurons that can be strongly active at the same time.
{ const S = sc(91, 0, { cam: "push", focus: "960 520" }); DS.room(S, LAB2);
  const G = dots100(S, 960, 560, 56); for (let i = 0; i < 10; i++) { G.on(i); G.dim(i, W(91, 8), 0.8); }
  const half = S.grp(); S.draw(circ(G.D[44].x, G.D[44].y, G.D[44].r), S.start, 0, { c: DS.c("gold", 2), w: DS.w.near, parent: half }); S.fill(circ(G.D[44].x, G.D[44].y, G.D[44].r * 0.7), S.start, 0, DS.c("yellow"), 1, half); fadeG(S, half, W(91, 10), 0.7);
  card(S, "LENNIE'S SUMS", 400, 160, { t: W(91, 0), size: DS.type.caption }); card(S, "FEWER THAN 1%", 960, 150, { t: W(91, 10), size: DS.type.title, tc: "red" });
  bracketsAround(S, 600, 230, 1320, 870, W(92, 4)); card(S, "AT THE SAME TIME", 960, 925, { t: W(92, 7), size: DS.type.body });
  DS.vignette(S); }

// "So I really do use one percent? I knew it." (Dave)
{ const S = sc(93, 0, { cam: "push", focus: "900 520" }); DS.room(S, ROOM);
  const F = dave(S, 520, 960, "near", { s: 1.55, look: 4, mood: "smile", pose: "hips" }); talk(S, F, W(93, 0), END(93));
  const G = dots100(S, 1260, 520, 36); G.lit(37, W(93, 5), 0.8);
  card(S, "1%", 1260, 180, { t: W(93, 5), size: DS.type.display, tc: "red" });
  const B = brainy(S, 1680, 930, 1.2, { face: "tired", armL: "hip" });
  DS.vignette(S); }

// Yes, Dave, about one percent at a time. Just never the same one percent.
{ const S = sc(94, 0, { cam: "push", focus: "960 520" }); DS.room(S, LAB2);
  const G = dots100(S, 960, 560, 56); const seq = [[22, W(94, 2)], [71, W(94, 8)], [48, W(94, 10)], [86, W(94, 12)]];
  seq.forEach(([i, t], k) => { G.lit(i, t, 0.7); if (k < seq.length - 1) G.dim(i, seq[k + 1][1] - 0.1, 0.7); });
  card(S, "1% AT A TIME", 960, 150, { t: W(94, 3), size: DS.type.body }); card(S, "NEVER THE SAME 1%", 960, 940, { t: W(94, 9), size: DS.type.body, tc: "red" });
  DS.vignette(S); }

// Think of a piano. Over a whole song, a pianist might use all eighty-eight keys.
{ const S = sc(95, 0, { cam: "push", focus: "960 600" }); DS.room(S, ROOM);
  paperR(S, 640, 110, 640, 280); S.draw(`M680 190 H1240 M680 230 H1240 M680 270 H1240 M680 310 H1240`, S.start, 0, { c: DS.c("gray", 1), w: DS.w.detail }); [[760, 270], [860, 230], [960, 310], [1060, 190], [1140, 270]].forEach(([x, y]) => S.fill(circ(x, y, 14, 10), S.start, 0, DS.P.ink[0], 1));
  const F = dave(S, 960, 960, "near", { s: 1.1, look: 0, mood: "smile", pose: "reach" });
  const P = piano(S, 210, 700, 1500, 220);
  const seq = [10, 14, 17, 21, 24, 28, 33, 36, 40, 44, 47, 20, 30, 38]; seq.forEach((i, k) => P.on(i, W(95, 6) + k * 0.28, 0.45, W(95, 6) + k * 0.28 + 0.8));
  card(S, "88 KEYS", 1560, 230, { t: W(95, 13), size: DS.type.title });
  DS.vignette(S); }

// But press all eighty-eight at once, and it isn't music. It's a cat sitting on the keyboard.
{ const S = sc(96, 0, { cam: "push", focus: "960 600" }); DS.room(S, ROOM);
  const F = dave(S, 960, 960, "near", { s: 1.1, look: 0, mood: "smile", pose: "reach" }); F.face(W(96, 7), "worried", 0); F.setPose(W(96, 8), "head");
  const P = piano(S, 210, 700, 1500, 220); for (let i = 0; i < 52; i++) P.on(i, W(96, 3) + (i % 4) * 0.1, 1.0);
  const nz = S.grp(); [[360, 560], [560, 500], [760, 580], [1160, 520], [1360, 590], [1560, 540]].forEach(([x, y]) => S.draw(`M${x} ${y} l30 -40 l15 36 l30 -44 l15 40`, S.start, 0, { c: DS.c("red"), w: DS.w.near, parent: nz })); fadeG(S, nz, W(96, 6));
  const ct = catSit(S, 1380, 720, 1.05, {}); fadeG(S, ct, W(96, 12));
  card(S, "NOT MUSIC", 960, 190, { t: W(96, 8), size: DS.type.title, tc: "red" });
  DS.vignette(S); }

// Your brain plays all of its keys. Just never all of them at the same time.
{ const S = sc(97, 0, { cam: "push", focus: "960 600" }); DS.room(S, ROOM);
  const B = brainy(S, 960, 960, 1.7, { face: "smile", armR: "down" });
  const P = piano(S, 210, 720, 1500, 220);
  const seq = [6, 12, 19, 25, 31, 38, 43, 49]; seq.forEach((i, k) => P.on(i, W(97, 2) + k * 0.4, 0.5, W(97, 2) + k * 0.4 + 0.8));
  [[8, 20, 33], [26, 40, 47]].forEach((gr, k) => gr.forEach((i) => P.on(i, W(97, 8) + k * 1.1, 0.5, W(97, 8) + k * 1.1 + 0.9)));
  card(S, "ALL OF ITS KEYS", 560, 250, { t: W(97, 3), size: DS.type.body }); card(S, "NEVER AT ONCE", 1360, 250, { t: W(97, 9), size: DS.type.body, tc: "red" });
  DS.vignette(S); }

// ===================== 7. The real upgrade =====================
// So can you unlock more? Not with a dial. But there is a way.
{ const S = sc(98, 0, { cam: "push", focus: "960 520" }); DS.room(S, ROOM);
  const bo = brainOrg(S, 520, 560, 1.2); padlock(S, 520, 260, 1.0, { t: W(98, 3) });
  dial(S, 1020, 560, 170, { v: 10, t: W(98, 5) }); xMark(S, 1020, 560, 4.2, W(98, 7));
  const sg = S.grp(); DS.shape(S, rect(1500, 360, 28, 520), "wood", { w: "near", parent: sg }); DS.shape(S, `M1400 330 H1700 L1750 390 L1700 450 H1400 Z`, "green", { w: "near", parent: sg }); S.text("A WAY", 1560, 410, { size: DS.type.body, c: DS.P.white[0], t: T0(S), parent: sg }); fadeG(S, sg, W(98, 11));
  DS.vignette(S); }

// To drive a black cab in London, you have to learn around twenty-five thousand streets. It takes three to four years.
{ const S = sc(99, 0, { cam: "push", focus: "1000 520" }); DS.room(S, LAB2);
  const cb = S.grp(); DS.shadow(S, 480, 900, 640, { parent: cb });
  DS.shape(S, `M200 840 V700 Q200 660 250 650 L330 640 L400 540 H600 L680 650 L740 660 Q780 670 780 710 V840 Z`, "ink", { w: "near", tone: 1, parent: cb });
  DS.shape(S, `M350 640 L410 560 H500 V640 Z M530 640 V560 H600 L660 640 Z`, "glass", { w: "mid", parent: cb }); DS.shape(S, rrect(430, 500, 140, 46, DS.r.xs), "yellow", { w: "mid", parent: cb }); S.text("TAXI", 500, 540, { size: DS.type.caption, c: DS.P.ink[0], t: T0(S), parent: cb });
  [320, 660].forEach((x) => { DS.shape(S, circ(x, 840, 58), "ink", { w: "mid", tone: 2, parent: cb }); DS.shape(S, circ(x, 840, 22), "gray", { w: "detail", parent: cb }); });
  const mp = S.grp(); const pn = panel(S, 1280, 480, 800, 680); const ln = S.grp(); for (let i = 0; i < 26; i++) { const a = (i * 137) % 700, b = (i * 241) % 520; S.draw(`M${900 + a * 0.2 + (i % 5) * 20} ${200 + (i % 7) * 20} L${960 + (a % 600)} ${300 + b * 0.8}`, S.start, 0, { c: DS.c("gray", 2), w: DS.w.detail, parent: ln }); S.draw(`M${900 + (i % 9) * 85} 190 V770`, S.start, 0, { c: DS.c("gray", 1), w: DS.w.hair, parent: ln }); S.draw(`M890 ${200 + (i % 7) * 85} H1670`, S.start, 0, { c: DS.c("gray", 1), w: DS.w.hair, parent: ln }); }
  fadeG(S, pn, W(99, 11)); fadeG(S, ln, W(99, 11));
  countUp(S, 1280, 905, 0, 25000, W(99, 12), 1.8, { size: DS.type.title, fmt: (n) => Math.round(n).toLocaleString("en-US") + " STREETS", c: DS.c("red", 2), t0: W(99, 12) });
  card(S, "3 TO 4 YEARS", 600, 250, { t: W(99, 17), size: DS.type.body });
  DS.vignette(S); }

// In twenty eleven, Katherine Woollett and Eleanor Maguire scanned trainees before and after.
{ const S = sc(100, 0, { cam: "push", focus: "1000 520" }); DS.room(S, LAB2);
  who(S, 300, 940, "near", Object.assign({}, WOMAN2, { s: 1.2, mood: "smile", pose: "hold", outfitC: DS.c("white", 2) })); who(S, 580, 940, "near", Object.assign({}, DOC, { s: 1.2, mood: "smile", pose: "reachL", look: 6 }));
  card(S, "2011", 440, 170, { t: W(100, 1), size: DS.type.title }); card(S, "WOOLLETT", 300, 280, { t: W(100, 4), size: DS.type.caption }); card(S, "MAGUIRE", 600, 360, { t: W(100, 7), size: DS.type.caption });
  [[1180, "BEFORE", W(100, 10)], [1580, "AFTER", W(100, 12)]].forEach(([x, s, t]) => { panel(S, x, 520, 360, 460); const g = S.grp(); const b = brainOrg(S, x, 500, 0.6, { parent: g }); b.hippo(); fadeG(S, g, t); card(S, s, x, 880, { t, size: DS.type.caption }); });
  DS.vignette(S); }

// The ones who qualified gained grey matter at the back of the hippocampus, a part that helps with memory and finding your way.
{ const S = sc(101, 0, { cam: "push", focus: "900 520" }); DS.room(S, LAB2);
  const bo = brainOrg(S, 900, 500, 1.9); bo.hippo(W(101, 4)); bo.grow(W(101, 5), 1.4, 1.4);
  S.draw(circ(bo.X(-34), bo.Y(8), 44), W(101, 9), 0, { c: DS.c("red"), w: DS.w.near });
  card(S, "QUALIFIED", 400, 170, { t: W(101, 3), size: DS.type.body, tc: "green" }); tick(S, 400, 290, 1.3, W(101, 3), "green");
  card(S, "HIPPOCAMPUS", 900, 910, { t: W(101, 12), size: DS.type.body });
  const cp = S.grp(); DS.shape(S, circ(1640, 500, 130), "white", { w: "near", flat: true, parent: cp }); S.draw(`M1640 400 L1690 500 L1640 600 L1590 500 Z`, S.start, 0, { fill: DS.c("red"), c: DS.P.ink[0], w: DS.w.mid, parent: cp }); fadeG(S, cp, W(101, 20)); card(S, "FINDING YOUR WAY", 1640, 760, { t: W(101, 20), size: DS.type.caption });
  DS.vignette(S); }

// Trainees who failed didn't change. Neither did people who never trained.
{ const S = sc(102, 0, { cam: "push", focus: "960 520" }); DS.room(S, LAB2);
  [[480, "QUALIFIED", 1.4, undefined], [960, "FAILED", 1.0, W(102, 0)], [1440, "NEVER TRAINED", 1.0, W(102, 5)]].forEach(([x, s, hk, t], i) => { const pn = panel(S, x, 480, 420, 520); const g = S.grp(); const b = brainOrg(S, x, 460, 0.62, { parent: g }); b.hippo(); if (hk > 1) b.grow(S.start, 0.01, hk); if (t !== undefined) { fadeG(S, g, t); fadeG(S, pn, t); } card(S, s, x, 830, { t, size: DS.type.caption, tc: i === 0 ? "green" : undefined }); if (i) txt(S, "NO CHANGE", x, 920, { size: DS.type.caption, c: DS.c("gray", 2), t: t + 0.4 }); });
  DS.vignette(S); }

// In two thousand four, a team in Germany taught volunteers to juggle three balls for three months.
{ const S = sc(103, 0, { cam: "push", focus: "900 520" }); DS.room(S, ROOM);
  const F = dave(S, 760, 960, "near", { s: 1.3, look: 0, mood: "determined", pose: "armsUp" });
  orbit(S, 760, 400, 130, W(103, 12), END(103));
  card(S, "2004", 400, 170, { t: W(103, 1), size: DS.type.title }); card(S, "GERMANY", 1180, 170, { t: W(103, 7), size: DS.type.body });
  const cg = S.grp(); DS.shape(S, rrect(1280, 330, 460, 460, DS.r.md), "white", { w: "near", flat: true, parent: cg }); DS.shape(S, rrect(1280, 330, 460, 100, DS.r.md), "red", { w: "near", parent: cg }); for (let r = 0; r < 4; r++) for (let c = 0; c < 5; c++) S.draw(circ(1330 + c * 85, 490 + r * 70, 6), S.start, 0, { fill: DS.c("gray", 1), c: DS.c("gray", 1), w: DS.w.hair, parent: cg }); fadeG(S, cg, W(103, 14));
  card(S, "3 MONTHS", 1510, 880, { t: W(103, 15), size: DS.type.body });
  DS.vignette(S); }

// A part of their brains that handles moving things grew.
{ const S = sc(104, 0, { cam: "push", focus: "900 520" }); DS.room(S, LAB2);
  const bo = brainOrg(S, 700, 520, 1.9); const [rx, ry] = bo.regC[1]; bo.region(1, W(104, 1), 0.8, DS.c("orange", 0));
  const sf = (k) => `translate(${rx} ${ry}) scale(${k}) translate(${-rx} ${-ry})`; tl.fromTo(bo.regs[1], { attr: { transform: sf(1) } }, { attr: { transform: sf(1.5) }, duration: 1.1, ease: "power2.inOut", immediateRender: false }, W(104, 9));
  orbit(S, 1480, 520, 100, S.start, END(104));
  card(S, "MOVING THINGS", 1480, 260, { t: W(104, 6), size: DS.type.body }); card(S, "IT GREW", 700, 160, { t: W(104, 9), size: DS.type.title, tc: "green" });
  DS.vignette(S); }

// Then they stopped juggling for three months, and the gain shrank back.
{ const S = sc(105, 0, { cam: "push", focus: "900 520" }); DS.room(S, LAB2);
  const bo = brainOrg(S, 700, 520, 1.9); const [rx, ry] = bo.regC[1]; bo.regs[1].setAttribute("fill", DS.c("orange", 0)); bo.regs[1].setAttribute("opacity", 0.62);
  const sf = (k) => `translate(${rx} ${ry}) scale(${k}) translate(${-rx} ${-ry})`; bo.regs[1].setAttribute("transform", sf(1.5)); tl.to(bo.regs[1], { attr: { transform: sf(1) }, duration: 1.1, ease: "power2.inOut" }, W(105, 9));
  [[1330, 800, "red"], [1480, 830, "yellow"], [1640, 790, "green"]].forEach(([x, y, n], i) => { const b = S.grp(); DS.shape(S, circ(x, y, 26), n, { w: "mid", parent: b }); tl.fromTo(b, { attr: { transform: "translate(0 -420)" }, opacity: 0 }, { attr: { transform: "translate(0 0)" }, opacity: 1, duration: 0.55, ease: "bounce.out", immediateRender: true }, W(105, 2) + i * 0.15); });
  const cg = S.grp(); DS.shape(S, rrect(1330, 220, 360, 330, DS.r.md), "white", { w: "near", flat: true, parent: cg }); DS.shape(S, rrect(1330, 220, 360, 80, DS.r.md), "red", { w: "near", parent: cg }); txt(S, "3 MONTHS", 1510, 450, { size: DS.type.body, parent: cg }); fadeG(S, cg, W(105, 4));
  card(S, "SHRANK BACK", 700, 160, { t: W(105, 10), size: DS.type.body, tc: "red" });
  DS.vignette(S); }

// Your brain doesn't have a hidden ninety percent.
{ const S = sc(106, 0, { cam: "push", focus: "1000 560" }); DS.room(S, ROOM);
  const ch = S.grp(); DS.shadow(S, 1160, 900, 600, { parent: ch });
  DS.shape(S, `M860 580 L920 400 H1400 L1460 580 Z`, "ink", { w: "near", tone: 1, parent: ch }); DS.shape(S, rrect(840, 560, 640, 320, DS.r.sm), "wood", { w: "near", parent: ch }); [900, 1400].forEach((x) => DS.shape(S, rect(x, 560, 40, 320), "gold", { w: "mid", parent: ch })); DS.shape(S, rrect(1130, 620, 60, 80, DS.r.xs), "gold", { w: "mid", parent: ch });
  DS.shape(S, `M870 460 L930 180 H1390 L1450 460 Z`, "wood", { w: "near", tone: 2, parent: ch });
  const lb = S.grp(); S.text("90%", 1160, 780, { size: DS.type.title, c: DS.P.white[0], t: T0(S), parent: lb }); fadeG(S, lb, W(106, 6));
  stamp(S, 1160, 330, "EMPTY", W(106, 7), "red", { size: DS.type.title, rot: -6 });
  const F = dave(S, 460, 960, "near", { s: 1.4, look: 8, mood: "sad" });
  DS.vignette(S); }

// It has something better. It rewires itself around whatever you keep doing.
{ const S = sc(107, 0, { cam: "push", focus: "960 520" }); DS.room(S, LAB2);
  const P = Array.from({ length: 8 }, (_, i) => [960 + Math.cos(i * 0.785) * 520, 500 + Math.sin(i * 0.785) * 300]);
  const L = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 0], [0, 4], [1, 5], [2, 6], [3, 7]];
  L.forEach(([a, b], i) => S.draw(line(P[a], P[b], 0), W(107, 5) + (i / L.length) * (END(107) - W(107, 5) - 0.8), 0, { c: DS.c("gold", 2), w: DS.w.near }));
  P.forEach(([x, y]) => neuron(S, x, y, 0.62, { arms: 4 }));
  card(S, "REWIRES ITSELF", 960, 150, { t: W(107, 5), size: DS.type.body }); card(S, "KEEP DOING IT", 960, 500, { t: W(107, 9), size: DS.type.title, tc: "green" });
  DS.vignette(S); }

// ===================== 8. Waiting its turn =====================
// Dave peels the ten percent sticker off the dial. Underneath, in very small writing, it says practice.
{ const S = sc(108, 0, { cam: "push", focus: "960 640" }); DS.room(S, NITE);
  const D = dialClose(S, 10, { practice: W(109, 0) }); D.peel(W(108, 1) + 0.2, W(108, 6) - W(108, 1));
  S.zoom(960, 700, 1.25, W(109, 0), 1.4);
  S.draw(`M850 748 Q960 762 1070 748`, W(109, 7), 0, { c: DS.c("gold"), w: DS.w.near });
  card(S, "IN VERY SMALL WRITING", 960, 240, { t: W(109, 1), size: DS.type.caption }); card(S, "PRACTICE", 1440, 470, { t: W(109, 7), size: DS.type.title, tc: "green" });
  DS.vignette(S); }

// So what would happen if you used a hundred percent of your brain?
{ const S = sc(110, 0, { cam: "push", focus: "900 520" }); DS.room(S, ROOM);
  const top = 960 - 1.5 * 309 - 75, B = brainy(S, 640, top + 6, 0.8, { face: "tired" });
  const F = dave(S, 640, 960, "near", { s: 1.5, look: 5, mood: "flat" });
  const g = S.grp(); S.thought(1290, 410, 340, 230, 780, 560, S.start, 0.3, { parent: g });
  const bo = brainOrg(S, 1290, 400, 0.95, { parent: g }); bo.all(W(110, 8), 1.6);
  txt(S, "100%", 1290, 770, { size: DS.type.display, c: DS.c("red", 2), t: W(110, 8) });
  DS.vignette(S); }

// All at once, you'd have a very bad afternoon.
{ const S = sc(111, 0, { cam: "push", focus: "960 540" }); DS.room(S, ROOM);
  const fb = S.grp(); DS.shadow(S, 520, 900, 380, { parent: fb }); DS.shape(S, rrect(360, 210, 320, 520, DS.r.sm), "gray", { w: "near", tone: 1, parent: fb }); DS.shape(S, rrect(390, 240, 260, 460, DS.r.xs), "gray", { w: "mid", tone: 2, flat: true, parent: fb });
  for (let i = 0; i < 4; i++) DS.shape(S, rrect(420 + (i % 2) * 120, 270 + Math.floor(i / 2) * 130, 80, 100, DS.r.xs), "ink", { w: "mid", tone: 1, flat: true, parent: fb });
  const mb = S.grp(); DS.shape(S, rrect(470, 560, 120, 100, DS.r.xs), "gray", { w: "mid", parent: mb }); const lv = S.grp(mb); S.draw(`M530 600 L530 540`, S.start, 0, { c: DS.c("ink"), w: DS.w.near * 1.6, parent: lv }); DS.shape(S, circ(530, 536, 18), "red", { w: "mid", parent: lv });
  tl.fromTo(lv, { attr: { transform: "rotate(0 530 600)" } }, { attr: { transform: "rotate(180 530 600)" }, duration: 0.6, ease: "power2.inOut", immediateRender: false }, W(111, 2));
  card(S, "TRIPPED", 520, 130, { t: W(111, 3), size: DS.type.body, tc: "red" });
  sofa(S, 1000, 740, 680, "blue");
  const F = who(S, 1330, 740 + 46 * 1.2, "near", Object.assign({}, DAVE, { s: 1.2, sit: true, pose: "head", mood: "sad", look: -4 }));
  const ip = S.grp(); DS.shape(S, rrect(F.hd[0] - 50, F.hd[1] - F.r - 36, 100, 50, DS.r.sm), "sky", { w: "mid", parent: ip }); fadeG(S, ip, W(111, 6));
  card(S, "A VERY BAD AFTERNOON", 1200, 140, { t: W(111, 5), size: DS.type.body });
  DS.vignette(S); }

// But over a day, you already do. Every room in the house gets its turn with the lights.
{ const S = sc(112, 0, { cam: "push", focus: "1000 520" }); DS.outdoor(S, NIGHT); nightSky(S);
  const H = houseHead(S, 1100, 580, 1.05, { cols: 3, rows: 3 }); const order = [0, 4, 2, 6, 1, 5, 3, 7], t0 = W(112, 7), step = (END(112) - 0.4 - t0) / 8;
  order.forEach((w, i) => H.lit(w, t0 + i * step, t0 + (i + 1) * step + 0.2, 0.5));
  clock24(S, 420, 520, 190, { sweep: [t0, END(112) - 0.4 - t0] });
  const F = dave(S, 1620, 900, "near", { s: 1.15, look: -6, mood: "smile", pose: "pointL" });
  card(S, "OVER A DAY", 420, 230, { t: W(112, 1), size: DS.type.body }); card(S, "EVERY ROOM, A TURN", 1100, 130, { t: W(112, 7), size: DS.type.body });
  DS.vignette(S); }

// Dave picks up three balls and drops all three of them.
{ const S = sc(113, 0, { cam: "push", focus: "960 540" }); DS.room(S, ROOM);
  const F = dave(S, 960, 960, "near", { s: 1.5, look: 0, mood: "smile", pose: "hold" }); F.face(W(113, 7), "worried", 0);
  [[900, "red"], [960, "yellow"], [1020, "green"]].forEach(([x, n], i) => { const b = S.grp(); DS.shape(S, circ(x, 930, 28), n, { w: "mid", parent: b });
    tl.fromTo(b, { attr: { transform: "translate(0 0)" }, opacity: 0 }, { attr: { transform: "translate(0 0)" }, opacity: 1, duration: 0.3 }, W(113, 3) + i * 0.1);
    tl.to(b, { attr: { transform: `translate(${(i - 1) * 24} -270)` }, duration: 0.5, ease: "power2.out" }, W(113, 4) + i * 0.1);
    tl.to(b, { attr: { transform: `translate(${(i - 1) * 140} 0)` }, duration: 0.8, ease: "bounce.out" }, W(113, 6) + i * 0.12); });
  card(S, "THREE BALLS", 960, 170, { t: W(113, 3), size: DS.type.body });
  DS.vignette(S); }

// "Again, please. Quietly. I'm busy rewiring." (Brain)
{ const S = sc(114, 0, { cam: "push", focus: "960 520" }); DS.room(S, ROOM);
  const top = 960 - 1.4 * 309 - 70, B = brainy(S, 960, top + 6, 1.0, { face: "tired" }); B.talk(W(114, 0), END(114)); B.face(W(114, 2), "shh"); B.arm(W(114, 2), "R", "shush");
  DS.shape(S, `M${960 - 68} ${top - 238} Q${960} ${top - 330} ${960 + 68} ${top - 238} Z`, "yellow", { w: "mid", parent: B.g }); DS.shape(S, rrect(960 - 84, top - 244, 168, 22, DS.r.xs), "yellow", { w: "mid", tone: 2, parent: B.g });
  const F = dave(S, 960, 960, "near", { s: 1.4, look: 0, mood: "worried" });
  [[760, "red"], [1160, "yellow"], [1330, "green"]].forEach(([x, n]) => DS.shape(S, circ(x, 930, 28), n, { w: "mid" }));
  card(S, "REWIRING", 520, 200, { t: W(114, 5), size: DS.type.title });
  DS.vignette(S); }

// Ninety percent of Dave's brain was never switched off. It was waiting its turn.
{ const S = sc(115, 0, { cam: "pull", focus: "960 540" }); DS.outdoor(S, NIGHT); nightSky(S);
  const H = houseHead(S, 960, 540, 1.1, { cols: 3, rows: 3 }); H.lit(4, S.start, W(115, 13), 0.7); H.lit(1, W(115, 13) + 0.2, undefined, 0.9);
  H.win.forEach((q, i) => { if (i === 4) return; const g = S.grp(); const k = 0.5; S.draw(circ(q.cx, q.cy + 12, 20 * k * 1.5), S.start, 0, { fill: DS.c("blue", 1), c: DS.P.ink[0], w: DS.w.detail, parent: g }); S.fill(circ(q.cx - 8, q.cy + 8, 3.5), S.start, 0, DS.P.ink[0], 1, g); S.fill(circ(q.cx + 8, q.cy + 8, 3.5), S.start, 0, DS.P.ink[0], 1, g); S.draw(rect(q.cx + 14, q.cy + 14, 22, 28), S.start, 0, { fill: DS.P.white[0], c: DS.P.ink[0], w: DS.w.hair, parent: g }); fadeG(S, g, W(115, 9) + i * 0.3, 0.6); });
  card(S, "WAITING ITS TURN", 960, 150, { t: W(115, 11), size: DS.type.title });
  DS.vignette(S); }
