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
