// shared kit for the thumbnails (a copy of the base of ../scenes.js)
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
const clipTo = (g, d) => { const id = "cp39-" + ++CP, cp = el("clipPath", { id }, dsDefs()); el("path", { d }, cp); g.setAttribute("clip-path", `url(#${id})`); return g; };
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


// ---------- more people ----------
// fur-trimmed hood behind a head (fur ring outside, parka inside, the face stays clear)
const hood = (S, F, parka = "earth", ptone = 2) => {
  const [hx, hy] = F.hd, R = F.r, p = F.P.head.parentNode;
  const fur = DS.shape(S, circ(hx, hy + 0.05 * R, 1.5 * R, 1.42 * R), "white", { w: "detail", flat: true, parent: F.g });
  const par = DS.shape(S, circ(hx, hy + 0.08 * R, 1.22 * R), parka, { w: "detail", tone: ptone, flat: true, parent: F.g });
  p.insertBefore(fur, F.P.head); p.insertBefore(par, F.P.head);
};
const trapper = (S, x, gy, layer = "near", o = {}) => { const F = who(S, x, gy, layer, Object.assign({ s: 1.2, hair: "none", outfit: "tunic", outfitC: DS.c("earth", 2), mood: "flat" }, o)); hood(S, F, "earth", 2); return F; };
const explorer = (S, x, gy, layer = "near", o = {}) => { const F = who(S, x, gy, layer, Object.assign({ s: 1.2, hair: "none", outfit: "tunic", outfitC: DS.c("ink", 1), mood: "flat" }, o)); hood(S, F, "ink", 1); return F; };
const DOC = { s: 1.2, hair: "bun", hairC: DS.c("ink", 1), outfitC: DS.c("white", 2), specs: true };
const LABF = { s: 1.1, hair: "side", hairC: DS.c("ink", 1), outfitC: DS.c("white", 2), specs: true };
const LABG = { s: 1.1, hair: "bun", hairC: DS.c("brown", 2), outfitC: DS.c("white", 2) };
const FLEX = { armL: [[-70, 10], [-56, -48]], armR: [[70, 10], [56, -48]] };
const sweatAt = (S, x, y, t, k = 1) => S.fill(`M${x} ${y - 26 * k} Q${x + 18 * k} ${y} ${x} ${y + 8 * k} Q${x - 18 * k} ${y} ${x} ${y - 26 * k} Z`, t ?? S.start, 0, DS.c("sky", 2), 1);
const pie = (S, cx, cy, r, frac, o = {}) => {
  const g = S.grp(o.parent), p = arcPts(cx, cy, r, -90, -90 + 360 * frac, Math.max(8, Math.round(70 * frac)));
  DS.shape(S, circ(cx, cy, r), "white", { flat: true, w: "mid", parent: g, t: o.t });
  DS.shape(S, `M${cx} ${cy} ` + p.map(([x, y]) => `L${f1(x)} ${f1(y)}`).join(" ") + " Z", o.c || "red", { w: "mid", parent: g, t: o.t });
  return g;
};
const growX = (g, t, x, y, dur = 0.8, ease = "power2.out") => { const tf = (k) => `translate(${x} ${y}) scale(${k} 1) translate(${-x} ${-y})`; tl.fromTo(g, { attr: { transform: tf(0.02) } }, { attr: { transform: tf(1) }, duration: dur, ease, immediateRender: true }, t); };
const ringAt = (S, cx, cy, rx, ry, t, name = "red") => fadeG(S, S.draw(circ(cx, cy, rx, ry), S.start, 0, { c: DS.c(name), w: DS.w.near }), t);
const END = (c) => CLIP(c)[1];

// ---------- kitchen, food, fridge ----------
const KIT = { wall: "wall", floor: "wood", window: false };
const counter = (S, x0, x1, top = 600) => {
  DS.shadow(S, (x0 + x1) / 2, 760, x1 - x0 + 40, { op: 0.16 });
  DS.shape(S, rect(x0, top + 22, x1 - x0, 760 - top - 22), "wood", { w: "mid", layer: "mid", tone: 1 });
  [0.34, 0.67].forEach((f) => S.draw(line([x0 + (x1 - x0) * f, top + 30], [x0 + (x1 - x0) * f, 752], 0), S.start, 0, { c: DS.c("wood", 2, "mid"), w: DS.w.detail }));
  DS.shape(S, rrect(x0 - 14, top, x1 - x0 + 28, 26, DS.r.xs), "sand", { w: "mid", tone: 1 });
};
const KITW = { wall: "wall", floor: "wood" }; // with the sunrise window
const egg = (S, cx, cy, k = 1, o = {}) => DS.shape(S, `M${cx} ${cy - 30 * k} C${cx + 25 * k} ${cy - 30 * k} ${cx + 27 * k} ${cy + 22 * k} ${cx} ${cy + 26 * k} C${cx - 27 * k} ${cy + 22 * k} ${cx - 25 * k} ${cy - 30 * k} ${cx} ${cy - 30 * k} Z`, o.name || "paper", { t: o.t, parent: o.parent, w: k >= 0.9 ? "mid" : "detail" });
// cy = bottom of the carton; o.n = eggs still in it (0..12)
const eggCarton = (S, cx, cy, k = 1, o = {}) => {
  const g = S.grp(o.parent), n = o.n ?? 12, t = o.t;
  DS.drop(S, rrect(cx - 150 * k + 6, cy - 76 * k + 8, 300 * k, 84 * k, DS.r.xs), { t, parent: g });
  DS.shape(S, rrect(cx - 154 * k, cy - 78 * k, 308 * k, 60 * k, DS.r.xs), "earth", { t, parent: g, w: "detail", tone: 2, flat: true });
  for (let i = 0; i < 12 && i < n; i++) egg(S, cx - 125 * k + (i % 6) * 50 * k, cy - 62 * k + (i < 6 ? 0 : 28 * k), k * 0.95, { t, parent: g, name: o.name });
  DS.shape(S, rrect(cx - 154 * k, cy - 26 * k, 308 * k, 32 * k, DS.r.xs), "earth", { t, parent: g, w: "detail", flat: true });
  return g;
};
// a stack of cartons (12 eggs each); o.ts[i] = time carton i appears
const eggStack = (S, cx, cy, k, nC = 4, o = {}) => {
  const g = S.grp(o.parent);
  for (let i = 0; i < nC; i++) { const cg = S.grp(g); eggCarton(S, cx, cy - i * 84 * k, k, { parent: cg }); if (o.ts && o.ts[i] !== undefined) fadeG(S, cg, o.ts[i]); }
  return g;
};
const plate = (S, cx, cy, rx, o = {}) => { const g = S.grp(o.parent); DS.shape(S, circ(cx, cy, rx, rx * 0.28), "white", { t: o.t, parent: g, w: "mid", flat: true, tone: 2 }); DS.shape(S, circ(cx, cy - rx * 0.02, rx * 0.7, rx * 0.19), "white", { t: o.t, parent: g, w: "hair", flat: true }); return g; };
const chicken = (S, cx, cy, k = 1, o = {}) => {
  const g = S.grp(o.parent); plate(S, cx, cy, 150 * k, { t: o.t, parent: g });
  DS.shape(S, `M${cx - 100 * k} ${cy - 6 * k} C${cx - 112 * k} ${cy - 66 * k} ${cx - 30 * k} ${cy - 92 * k} ${cx + 44 * k} ${cy - 72 * k} C${cx + 112 * k} ${cy - 52 * k} ${cx + 118 * k} ${cy - 2 * k} ${cx + 56 * k} ${cy + 8 * k} C${cx} ${cy + 18 * k} ${cx - 76 * k} ${cy + 16 * k} ${cx - 100 * k} ${cy - 6 * k} Z`, "earth", { t: o.t, parent: g, w: "mid" });
  [[-46, -58, -14, -14], [-6, -66, 26, -22], [34, -58, 62, -18]].forEach(([a, b, c, d]) => S.draw(line([cx + a * k, cy + b * k], [cx + c * k, cy + d * k], 0), o.t ?? S.start, 0, { c: DS.c("brown", 1), w: DS.w.detail, parent: g }));
  return g;
};
const kScale = (S, cx, cy, k, str, o = {}) => {
  const g = S.grp(o.parent); DS.shadow(S, cx, cy, 300 * k, { parent: g });
  DS.shape(S, rrect(cx - 130 * k, cy - 70 * k, 260 * k, 70 * k, DS.r.sm), "gray", { parent: g, w: "mid" });
  DS.shape(S, rrect(cx - 104 * k, cy - 92 * k, 208 * k, 28 * k, DS.r.xs), "gray", { parent: g, w: "mid", tone: 1 });
  DS.shape(S, rrect(cx - 62 * k, cy - 58 * k, 124 * k, 40 * k, DS.r.xs), "navy", { parent: g, w: "hair", flat: true, tone: 2 });
  S.text(str, cx, cy - 27 * k, { size: DS.type.caption, c: DS.c("yellow", 1), t: o.ts ?? T0(S), parent: g });
  return g;
};
const bathScale = (S, cx, gy, k, str, o = {}) => {
  const g = S.grp(o.parent);
  DS.shape(S, rrect(cx - 130 * k, gy - 24 * k, 260 * k, 24 * k, DS.r.sm), "gray", { parent: g, w: "mid", tone: 1 });
  DS.shape(S, rrect(cx - 56 * k, gy - 20 * k, 112 * k, 14 * k, DS.r.xs), "navy", { parent: g, w: "hair", flat: true, tone: 2 });
  if (str) S.text(str, cx + 190 * k, gy - 6 * k, { size: DS.type.small, c: DS.c("red", 2), t: o.ts ?? T0(S), parent: g, anchor: "start" });
  return g;
};
const wallClock = (S, cx, cy, r, h, m, o = {}) => {
  const g = S.grp(o.parent), pt = (a, f) => [cx + Math.sin((a * Math.PI) / 180) * r * f, cy - Math.cos((a * Math.PI) / 180) * r * f];
  DS.shape(S, circ(cx, cy, r), "white", { parent: g, t: o.t, w: "near" });
  S.draw(rays(cx, cy, r * 0.8, r * 0.92, 12, -Math.PI / 2), o.t ?? S.start, 0, { c: DS.c("ink"), w: DS.w.mid, parent: g });
  const ha = ((h % 12) + m / 60) * 30, ma = m * 6;
  S.draw(line([cx, cy], pt(ha, 0.5), 0), o.t ?? S.start, 0, { c: DS.c("ink"), w: DS.w.near * 1.2, parent: g });
  S.draw(line([cx, cy], pt(ma, 0.78), 0), o.t ?? S.start, 0, { c: DS.c("red"), w: DS.w.mid, parent: g });
  DS.shape(S, circ(cx, cy, r * 0.07), "ink", { parent: g, t: o.t, w: "detail" });
  if (o.label) S.text(o.label, cx, cy + r + DS.type.small + 8, { size: DS.type.small, c: o.lc || DS.c("ink"), t: o.t ?? T0(S), parent: g });
  return g;
};
const fridge = (S, x0, top, wd, ht, o = {}) => {
  const g = S.grp(o.parent), gy = top + ht; DS.shadow(S, x0 + wd / 2, gy, wd + 60, { parent: g, op: 0.2 });
  DS.shape(S, rrect(x0, top, wd, ht, DS.r.md), "gray", { parent: g, w: "near", tone: 1 });
  S.draw(line([x0 + 6, top + ht * 0.3], [x0 + wd - 6, top + ht * 0.3], 0), S.start, 0, { c: DS.c("gray", 2), w: DS.w.mid, parent: g });
  [[x0 + wd - 40, top + 40, top + ht * 0.26], [x0 + wd - 40, top + ht * 0.34, top + ht * 0.52]].forEach(([x, y0, y1]) => DS.shape(S, rrect(x - 8, y0, 16, y1 - y0, DS.r.xs), "gray", { parent: g, w: "detail", tone: 2 }));
  return { g, x0, top, wd, ht, gy };
};
// the scoreboard: one column PROTEIN with a big number and a progress bar. o: { val, from, ct, dur (count-up), two (adds a LIFTS column, at o.t2), t }
const scoreb = (S, cx, cy, k, o = {}) => {
  const g = S.grp(o.parent), two = !!o.two, colW = 440 * k, wd = colW * (two ? 2 : 1), ht = 330 * k, x0 = cx - wd / 2, y0 = cy - ht / 2, t = o.t;
  const big = k >= 1.8 ? DS.type.display : k >= 1.1 ? DS.type.title : DS.type.body, lab = k >= 1.8 ? DS.type.small : DS.type.caption;
  DS.drop(S, rrect(x0 + 8, y0 + 12, wd, ht, DS.r.sm), { t, parent: g });
  DS.shape(S, rrect(x0 - 14 * k, y0 - 14 * k, wd + 28 * k, ht + 28 * k, DS.r.sm), "wood", { t, parent: g, w: "mid" });
  DS.shape(S, rect(x0, y0, wd, ht), "white", { t, parent: g, w: "detail", flat: true });
  const cxp = x0 + colW / 2, tt = t ?? T0(S);
  S.draw(line([x0, y0 + ht * 0.22], [x0 + wd, y0 + ht * 0.22], 0), t ?? S.start, 0, { c: DS.c("gray", 1), w: DS.w.detail, parent: g });
  S.text("PROTEIN", cxp, y0 + ht * 0.155, { size: lab, c: DS.c("blue", 2), t: tt, parent: g });
  const by = y0 + ht * 0.58;
  let numEl;
  if (o.from !== undefined) numEl = countUp(S, cxp, by, o.from, o.val, o.ct, o.dur || 1.6, { size: big, c: o.numC || DS.c("ink"), parent: g, t0: tt });
  else numEl = S.text(String(o.val), cxp, by, { size: big, c: o.numC || DS.c("ink"), t: tt, parent: g });
  S.text(o.sub ?? "of 300 g", cxp, y0 + ht * 0.75, { size: lab, c: DS.c("gray", 2), t: tt, parent: g });
  const bx = x0 + colW * 0.1, bw = colW * 0.8, byy = y0 + ht * 0.84, bh = ht * 0.075;
  DS.shape(S, rrect(bx, byy, bw, bh, DS.r.xs), "gray", { t, parent: g, w: "hair", flat: true, tone: 1 });
  const bar = S.grp(g), v1 = o.val / 300, v0 = (o.from ?? o.val) / 300;
  DS.shape(S, rrect(bx, byy, bw, bh, DS.r.xs), o.val >= 300 ? "green" : "blue", { t, parent: bar, w: "hair", flat: true });
  const tf = (v) => `translate(${bx} ${byy}) scale(${Math.max(0.001, v)} 1) translate(${-bx} ${-byy})`;
  if (o.from !== undefined) tl.fromTo(bar, { attr: { transform: tf(v0) } }, { attr: { transform: tf(v1) }, duration: o.dur || 1.6, ease: "power1.out", immediateRender: true }, o.ct);
  else bar.setAttribute("transform", tf(v1));
  const B = { g, x0, y0, wd, ht, colW, num: numEl, cx2: x0 + colW * 1.5, lab };
  if (two) {
    const dg = S.grp(g);
    S.draw(line([x0 + colW, y0 + 10 * k], [x0 + colW, y0 + ht - 10 * k], 0), S.start, 0, { c: DS.c("gray", 1), w: DS.w.mid, parent: dg });
    S.text("LIFTS", B.cx2, y0 + ht * 0.155, { size: lab, c: DS.c("red", 2), t: o.t2 ?? tt, parent: g });
    if (o.t2 !== undefined) fadeG(S, dg, o.t2d ?? o.t2);
  }
  return B;
};
// chalk tally marks in groups of five; mark i appears at t0 + i*(t1-t0)/n
const tallyMarks = (S, x, y, n, t0, t1, o = {}) => {
  const h = o.h || 60, sp = o.sp || 18, c = o.c || DS.c("ink"), w = o.w || DS.w.mid, g = S.grp(o.parent);
  for (let i = 0; i < n; i++) {
    const grp = Math.floor(i / 5), j = i % 5, gx = x + grp * (sp * 5.2), t = t0 + (n > 1 ? (i * (t1 - t0)) / (n - 1) : 0);
    S.draw(j < 4 ? `M${gx + j * sp} ${y} L${gx + j * sp} ${y + h}` : `M${gx - sp * 0.4} ${y + h * 0.82} L${gx + sp * 3.4} ${y + h * 0.16}`, t, 0, { c, w, parent: g });
  }
  return g;
};
const bathDoor = (S, x, y, wd, ht, o = {}) => {
  const g = S.grp(o.parent);
  DS.shape(S, rect(x - 16, y - 16, wd + 32, ht + 16), "white", { parent: g, w: "mid", tone: 2, flat: true });
  DS.shape(S, rect(x, y, wd, ht), "wood", { parent: g, w: "mid", tone: 1 });
  [[0.1, 0.07], [0.1, 0.55]].forEach(([a, b]) => DS.shape(S, rect(x + wd * a, y + ht * b, wd * 0.8, ht * (b < 0.3 ? 0.4 : 0.38)), "wood", { parent: g, w: "hair", tone: 0, flat: true }));
  DS.shape(S, circ(x + wd - 34, y + ht * 0.52, 14), "gold", { parent: g, w: "detail" });
  return { g, x, y, wd, ht };
};

// ---------- body, chemistry, charts ----------
// a limb as a capsule: ink outline stroke under a coloured stroke
const limb = (S, pts, wd, name, o = {}) => { const d = smooth(pts), t = o.t ?? S.start; S.draw(d, t, 0, { c: DS.c("ink"), w: wd + 2 * DS.w.near, parent: o.parent }); return S.draw(d, t, 0, { c: DS.c(name, o.tone || 0), w: wd, parent: o.parent }); };
// flexed arm icon (skin = dusk); k scales it; the bicep bulge is o.bulge (1 = normal)
const bicep = (S, cx, cy, k = 1, o = {}) => {
  const g = S.grp(o.parent), b = o.bulge || 1, t = o.t, sk = o.name || "dusk";
  limb(S, [[cx - 140 * k, cy + 70 * k], [cx - 40 * k, cy + 74 * k], [cx + 50 * k, cy + 60 * k]], 54 * k, sk, { parent: g, t });
  limb(S, [[cx + 50 * k, cy + 60 * k], [cx + 66 * k, cy - 20 * k], [cx + 60 * k, cy - 90 * k]], 50 * k, sk, { parent: g, t });
  DS.shape(S, circ(cx - 20 * k, cy + 28 * k, 58 * k * b, 44 * k * b), sk, { parent: g, t, w: "mid", flat: true, tone: 1 });
  DS.shape(S, circ(cx + 60 * k, cy - 112 * k, 34 * k), sk, { parent: g, t, w: "mid", flat: true });
  S.draw(line([cx + 46 * k, cy - 120 * k], [cx + 76 * k, cy - 120 * k], 0), t ?? S.start, 0, { c: DS.c("ink"), w: DS.w.detail, parent: g });
  DS.shape(S, rrect(cx - 168 * k, cy + 38 * k, 56 * k, 70 * k, DS.r.sm), "blue", { parent: g, t, w: "mid" });
  return g;
};
const heat = (S, x, y, n, t, o = {}) => {
  const g = S.grp(o.parent), gap = o.gap || 34;
  for (let i = 0; i < n; i++) S.draw(smooth([[x + i * gap, y], [x + i * gap - 14, y - 40], [x + i * gap + 14, y - 80], [x + i * gap - 14, y - 122]]), S.start, 0, { c: DS.c(o.c || "orange"), w: DS.w.mid, parent: g });
  return fadeG(S, g, t, 0.6);
};
const radiator = (S, cx, gy, wd, ht, o = {}) => {
  const g = S.grp(o.parent), n = 6, fw = wd / n; DS.shadow(S, cx, gy, wd + 40, { parent: g });
  DS.shape(S, rect(cx - wd / 2 - 10, gy - ht * 0.92, wd + 20, 20), "gray", { parent: g, w: "mid", tone: 1 });
  for (let i = 0; i < n; i++) DS.shape(S, rrect(cx - wd / 2 + i * fw + 6, gy - ht * 0.9, fw - 12, ht * 0.9, DS.r.sm), "red", { parent: g, w: "mid" });
  [0.08, 0.92].forEach((f) => DS.shape(S, rect(cx - wd / 2 + wd * f - 8, gy - 12, 16, 12), "gray", { parent: g, w: "detail", tone: 2, flat: true }));
  return g;
};
// atoms: C ink, H white, O red, N blue
const ATOM = { C: ["ink", 1, "white"], H: ["white", 0, "ink"], O: ["red", 0, "white"], N: ["blue", 0, "white"] };
const atom = (S, cx, cy, r, sym, o = {}) => {
  const [nm, tone, tc] = ATOM[sym], g = S.grp(o.parent);
  DS.shape(S, circ(cx, cy, r), nm, { parent: g, t: o.t, w: "mid", tone, flat: tone === 1 });
  if (r >= 26) S.text(sym, cx, cy + DS.type.caption * 0.34, { size: DS.type.caption, c: tc === "white" ? DS.P.white[0] : DS.c("ink"), t: o.t ?? T0(S), parent: g });
  return g;
};
const ammonia = (S, cx, cy, k, o = {}) => {
  const g = S.grp(o.parent);
  [[-1, 0.9], [0, -1.1], [1, 0.9]].forEach(([dx, dy]) => { const hx = cx + dx * 56 * k, hy = cy + dy * 52 * k; S.draw(line([cx, cy], [hx, hy], 0), o.t ?? S.start, 0, { c: DS.c("ink"), w: DS.w.mid, parent: g }); });
  [[-1, 0.9], [0, -1.1], [1, 0.9]].forEach(([dx, dy]) => atom(S, cx + dx * 56 * k, cy + dy * 52 * k, 20 * k, "H", { parent: g, t: o.t }));
  atom(S, cx, cy, 32 * k, "N", { parent: g, t: o.t });
  return g;
};
const jar = (S, cx, base, k, label, o = {}) => {
  const g = S.grp(o.parent), t = o.t;
  DS.shadow(S, cx, base, 190 * k, { parent: g });
  DS.shape(S, rrect(cx - 80 * k, base - 190 * k, 160 * k, 190 * k, DS.r.md), "glass", { parent: g, t, w: "mid", flat: true, tone: 1 });
  DS.shape(S, rrect(cx - 70 * k, base - 120 * k, 140 * k, 112 * k, DS.r.sm), "white", { parent: g, t, w: "detail", flat: true });
  DS.shape(S, rrect(cx - 90 * k, base - 224 * k, 180 * k, 36 * k, DS.r.sm), "gray", { parent: g, t, w: "mid" });
  [[-34, -86], [8, -66], [-12, -34], [34, -40], [30, -90]].forEach(([a, b]) => S.fill(circ(cx + a * k, base + b * k, 7 * k), t ?? S.start, 0, DS.c("sky", 1), 1, g));
  if (label) S.text(label, cx, base - 148 * k + DS.type.caption * 0.34, { size: DS.type.caption, c: DS.c("ink"), t: t ?? T0(S), parent: g });
  return g;
};
const liver = (S, cx, cy, k = 1, o = {}) => DS.shape(S, `M${cx - 120 * k} ${cy - 20 * k} C${cx - 110 * k} ${cy - 90 * k} ${cx + 10 * k} ${cy - 100 * k} ${cx + 100 * k} ${cy - 50 * k} C${cx + 150 * k} ${cy - 20 * k} ${cx + 110 * k} ${cy + 40 * k} ${cx + 30 * k} ${cy + 60 * k} C${cx - 40 * k} ${cy + 78 * k} ${cx - 130 * k} ${cy + 40 * k} ${cx - 120 * k} ${cy - 20 * k} Z`, "brown", { parent: o.parent, t: o.t, w: "mid", tone: 1 });
const kidney = (S, cx, cy, k = 1, o = {}) => { const g = S.grp(o.parent); DS.shape(S, `M${cx + 20 * k} ${cy - 70 * k} C${cx - 70 * k} ${cy - 80 * k} ${cx - 80 * k} ${cy + 60 * k} ${cx + 20 * k} ${cy + 72 * k} C${cx + 50 * k} ${cy + 72 * k} ${cx + 40 * k} ${cy + 30 * k} ${cx + 14 * k} ${cy + 6 * k} C${cx + 42 * k} ${cy - 14 * k} ${cx + 56 * k} ${cy - 60 * k} ${cx + 20 * k} ${cy - 70 * k} Z`, "red", { parent: g, t: o.t, w: "mid", tone: 2, flat: true }); return g; };
const stomach = (S, cx, cy, k, o = {}) => {
  const g = S.grp(o.parent), d = `M${cx - 70 * k} ${cy - 90 * k} C${cx - 20 * k} ${cy - 120 * k} ${cx + 90 * k} ${cy - 80 * k} ${cx + 100 * k} ${cy + 10 * k} C${cx + 110 * k} ${cy + 110 * k} ${cx + 10 * k} ${cy + 140 * k} ${cx - 50 * k} ${cy + 90 * k} C${cx - 90 * k} ${cy + 50 * k} ${cx - 30 * k} ${cy + 10 * k} ${cx - 60 * k} ${cy - 30 * k} C${cx - 80 * k} ${cy - 50 * k} ${cx - 90 * k} ${cy - 70 * k} ${cx - 70 * k} ${cy - 90 * k} Z`;
  DS.shape(S, d, "pink", { parent: g, t: o.t, w: "mid" });
  if (o.fill) { const fg = S.grp(g); clipTo(fg, d); S.draw(rect(cx - 140 * k, cy + 150 * k - o.fill * 260 * k, 280 * k, 260 * k), S.start, 0, { fill: DS.c("earth", 0), c: DS.c("earth", 2), w: DS.w.detail, parent: fg }); }
  return g;
};
const fuelGauge = (S, cx, cy, r, v, o = {}) => {
  const g = S.grp(o.parent), pt = (a, f) => [cx + Math.sin((a * Math.PI) / 180) * r * f, cy - Math.cos((a * Math.PI) / 180) * r * f];
  DS.shape(S, `M${cx - r} ${cy} A${r} ${r} 0 0 1 ${cx + r} ${cy} Z`, "white", { parent: g, t: o.t, w: "near", flat: true });
  S.draw(arc(cx, cy, r * 0.86, 190, 232), S.start, 0, { c: DS.c("red"), w: DS.w.near * 1.4, parent: g });
  for (let i = 0; i <= 8; i++) { const a = -80 + i * 20, p1 = pt(a, 0.9), p2 = pt(a, 0.78); S.draw(line(p1, p2, 0), S.start, 0, { c: DS.c("ink"), w: DS.w.detail, parent: g }); }
  S.text("E", cx - r * 0.62, cy - r * 0.18, { size: DS.type.caption, c: DS.c("red", 2), t: T0(S), parent: g });
  S.text("F", cx + r * 0.62, cy - r * 0.18, { size: DS.type.caption, c: DS.c("green", 2), t: T0(S), parent: g });
  const nd = S.grp(g); S.draw(line([cx, cy], [cx, cy - r * 0.78], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.near, parent: nd });
  const a0 = -80 + 160 * v; nd.setAttribute("transform", `rotate(${a0} ${cx} ${cy})`);
  DS.shape(S, circ(cx, cy, r * 0.08), "ink", { parent: g, t: o.t, w: "detail" });
  return { g, nd, set: (t, vv, dur = 1.2) => spin(nd, t, dur, a0, -80 + 160 * vv, cx, cy) };
};
// horizontal track 0..max with a green zone up to `limit` and a red zone after it; at(v) = x of a value
const track = (S, x, y, wd, ht, max, limit, o = {}) => {
  const g = S.grp(o.parent), at = (v) => x + (wd * v) / max;
  DS.shape(S, rect(x, y, at(limit) - x, ht), "green", { parent: g, t: o.t, w: "hair", flat: true, tone: 1 });
  DS.shape(S, rect(at(limit), y, x + wd - at(limit), ht), "red", { parent: g, t: o.t, w: "hair", flat: true, tone: 1 });
  S.draw(rect(x, y, wd, ht), S.start, 0, { c: DS.c("ink"), w: DS.w.mid, parent: g });
  return { g, at };
};
const pointer = (S, x, y, name, t, parent) => fadeG(S, DS.shape(S, `M${x} ${y} L${x - 22} ${y - 40} L${x + 22} ${y - 40} Z`, name, { w: "detail", flat: true, parent }), t);
const bar = (S, x, base, wd, ht, name, t, o = {}) => { const g = S.grp(o.parent); DS.shape(S, rect(x, base - ht, wd, ht), name, { parent: g, w: "mid", tone: o.tone }); scaleY(g, t, x, base, o.dur || 0.7, 0.02, 1); return g; };
const dumbbell = (S, cx, cy, k = 1, o = {}) => {
  const g = S.grp(o.parent), L = (o.len || 260) * k / 2, t = o.t;
  DS.shape(S, rrect(cx - L, cy - 9 * k, 2 * L, 18 * k, DS.r.xs), "gray", { parent: g, t, w: "mid", tone: 1 });
  [-1, 1].forEach((sd) => { DS.shape(S, rrect(cx + sd * (L - 8 * k) - 15 * k, cy - 54 * k, 30 * k, 108 * k, DS.r.xs), "ink", { parent: g, t, w: "mid", tone: 1, flat: true }); DS.shape(S, rrect(cx + sd * (L + 26 * k) - 11 * k, cy - 38 * k, 22 * k, 76 * k, DS.r.xs), "ink", { parent: g, t, w: "mid", tone: 1, flat: true }); });
  return g;
};
const hall = (S, cx, gy, wd, ht, o = {}) => {
  const g = S.grp(o.parent), x0 = cx - wd / 2, top = gy - ht;
  DS.shadow(S, cx, gy, wd + 80, { parent: g, op: 0.18 });
  [0, 1, 2].forEach((i) => DS.shape(S, rect(x0 - 30 + i * 12, gy - 24 + i * 8 - 8, wd + 60 - i * 24, 12), "gray", { parent: g, w: "detail", tone: 1, flat: true }));
  DS.shape(S, rect(x0, top + 60, wd, ht - 60 - 36), o.name || "sand", { parent: g, w: "mid", tone: 1 });
  DS.shape(S, `M${x0 - 24} ${top + 66} L${cx} ${top - 10} L${x0 + wd + 24} ${top + 66} Z`, o.roof || "wall", { parent: g, w: "mid", tone: 2 });
  const n = o.cols || 5;
  for (let i = 0; i < n; i++) DS.shape(S, rect(x0 + 24 + (i * (wd - 80)) / (n - 1), top + 76, 28, ht - 76 - 36), "white", { parent: g, w: "detail", flat: true });
  DS.shape(S, rrect(cx - 44, gy - 150, 88, 114, DS.r.sm), "navy", { parent: g, w: "mid", flat: true, tone: 2 });
  return g;
};
const pine = (S, x, gy, k = 1, o = {}) => {
  const g = S.grp(o.parent);
  DS.shape(S, rect(x - 12 * k, gy - 50 * k, 24 * k, 50 * k), "brown", { parent: g, w: "detail", flat: true, layer: o.layer || "mid" });
  [[0, 150, 100], [70, 120, 84], [130, 90, 66]].forEach(([dy, w, h]) => DS.shape(S, `M${x - w * k / 2} ${gy - 50 * k - dy * k} L${x} ${gy - 50 * k - (dy + h) * k - 20 * k} L${x + w * k / 2} ${gy - 50 * k - dy * k} Z`, "green", { parent: g, w: "mid", tone: 2, layer: o.layer || "mid" }));
  return g;
};
const SNOW = { hy: 640, sky: "glass", hills: "white", ground: "white", sun: false };
const snowDeco = (S) => { pine(S, 250, 700, 1.6, { layer: "far" }); pine(S, 1650, 690, 1.4, { layer: "far" }); pine(S, 1500, 720, 1.1, { layer: "mid" }); };
const rabbit = (S, cx, gy, k = 1, o = {}) => {
  const g = S.grp(o.parent), t = o.t, INKC = DS.P.ink[0];
  DS.shadow(S, cx, gy, 220 * k, { parent: g });
  [[-26, 0], [30, 0]].forEach(([dx]) => S.draw(line([cx + dx * k, gy - 66 * k], [cx + dx * k, gy - 2 * k], 0), t ?? S.start, 0, { c: INKC, w: DS.w.mid, parent: g }));
  DS.shape(S, circ(cx - 62 * k, gy - 86 * k, 24 * k), "white", { parent: g, t, w: "detail", flat: true });
  DS.shape(S, circ(cx, gy - 100 * k, 76 * k, 40 * k), "gray", { parent: g, t, w: "mid", tone: 1 });
  DS.shape(S, circ(cx - 34 * k, gy - 92 * k, 30 * k, 26 * k), "gray", { parent: g, t, w: "detail", tone: 0 });
  DS.shape(S, circ(cx + 62 * k, gy - 142 * k, 30 * k, 26 * k), "gray", { parent: g, t, w: "mid", tone: 1 });
  [[44, 0.15], [72, -0.1]].forEach(([dx, a]) => DS.shape(S, `M${cx + dx * k} ${gy - 160 * k} Q${cx + (dx - 6) * k} ${gy - 240 * k} ${cx + (dx + 18) * k} ${gy - 250 * k} Q${cx + (dx + 30) * k} ${gy - 220 * k} ${cx + (dx + 18) * k} ${gy - 162 * k} Z`, "gray", { parent: g, t, w: "detail", tone: 1 }));
  S.fill(circ(cx + 72 * k, gy - 148 * k, 5 * k), t ?? S.start, 0, INKC, 1, g);
  S.fill(circ(cx + 90 * k, gy - 138 * k, 4 * k), t ?? S.start, 0, DS.c("pink", 2), 1, g);
  S.draw(`M${cx + 74 * k} ${gy - 130 * k} Q${cx + 80 * k} ${gy - 124 * k} ${cx + 88 * k} ${gy - 128 * k}`, t ?? S.start, 0, { c: INKC, w: DS.w.hair, parent: g });
  const tg = S.grp(g);
  S.draw(line([cx + 56 * k, gy - 112 * k], [cx + 70 * k, gy - 72 * k], 0), t ?? S.start, 0, { c: DS.c("brown"), w: DS.w.detail, parent: tg });
  DS.shape(S, rrect(cx + 24 * k, gy - 74 * k, 128 * k, 46 * k, DS.r.xs), "white", { parent: tg, t, w: "detail", flat: true });
  S.text("LEAN", cx + 88 * k, gy - 42 * k, { size: DS.type.caption, c: DS.c("red", 2), t: t ?? T0(S), parent: tg });
  return g;
};
const calPage = (S, cx, cy, wd, ht, title, o = {}) => {
  const g = S.grp(o.parent), x0 = cx - wd / 2, y0 = cy - ht / 2, t = o.t, cols = o.cols || 0, rows = o.rows || 0, hh = ht * 0.2;
  DS.drop(S, rrect(x0 + 8, y0 + 12, wd, ht, DS.r.md), { t, parent: g });
  DS.shape(S, rrect(x0, y0, wd, ht, DS.r.md), "white", { parent: g, t, w: "mid", flat: true });
  DS.shape(S, rrect(x0, y0, wd, hh, DS.r.md), "red", { parent: g, t, w: "mid", flat: true, tone: 2 });
  S.text(title, cx, y0 + hh * 0.7, { size: o.size || DS.type.small, c: DS.P.white[0], t: t ?? T0(S), parent: g });
  const cells = [];
  if (cols) { const cw = (wd - 40) / cols, ch = (ht - hh - 30) / rows; for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { const x = x0 + 20 + c * cw, y = y0 + hh + 14 + r * ch; S.draw(rect(x + 4, y + 4, cw - 8, ch - 8), t ?? S.start, 0, { c: DS.c("gray", 1), w: DS.w.hair, parent: g }); cells.push([x + cw / 2, y + ch / 2]); } }
  return { g, cells, x0, y0 };
};
// a small paper with a title line, for "a review of N studies"
const paperCard = (S, cx, cy, wd, ht, o = {}) => { const g = S.grp(o.parent), x = cx - wd / 2, y = cy - ht / 2; paperR(S, x, y, wd, ht, { t: o.t, parent: g }); lines(S, x + 20, y + 30, wd - 40, o.n || 4, o.t, 26, g); return g; };
const miniGrid = (S, x0, y0, cols, rows, gx, gy, k, o = {}) => {
  const g = S.grp(o.parent), n = o.n ?? cols * rows, t0 = o.t0, t1 = o.t1 ?? t0;
  for (let i = 0; i < n; i++) { const c = i % cols, r = Math.floor(i / cols); mini(S, x0 + c * gx, y0 + r * gy, k, { t: t0 !== undefined ? t0 + (n > 1 ? (i * (t1 - t0)) / (n - 1) : 0) : undefined, c: o.c, parent: g, fill: o.fill }); }
  return g;
};
const dropWater = (S, cx, cy, k, t, parent) => fadeG(S, DS.shape(S, `M${cx} ${cy - 26 * k} C${cx + 18 * k} ${cy - 4 * k} ${cx + 18 * k} ${cy + 20 * k} ${cx} ${cy + 20 * k} C${cx - 18 * k} ${cy + 20 * k} ${cx - 18 * k} ${cy - 4 * k} ${cx} ${cy - 26 * k} Z`, "sky", { w: "detail", parent }), t);
const nameCard = (S, cx, cy, str, t) => card(S, str, cx, cy, { t, size: DS.type.caption });
const bread = (S, cx, cy, k, o = {}) => { const g = S.grp(o.parent); DS.shape(S, `M${cx - 60 * k} ${cy + 50 * k} V${cy - 10 * k} C${cx - 84 * k} ${cy - 50 * k} ${cx - 40 * k} ${cy - 80 * k} ${cx} ${cy - 66 * k} C${cx + 40 * k} ${cy - 80 * k} ${cx + 84 * k} ${cy - 50 * k} ${cx + 60 * k} ${cy - 10 * k} V${cy + 50 * k} Z`, "earth", { parent: g, t: o.t, w: "mid" }); DS.shape(S, rrect(cx - 44 * k, cy - 40 * k, 88 * k, 80 * k, DS.r.sm), "sand", { parent: g, t: o.t, w: "detail", flat: true, tone: 1 }); return g; };
const butter = (S, cx, cy, k, o = {}) => { const g = S.grp(o.parent); DS.shape(S, `M${cx - 70 * k} ${cy + 20 * k} L${cx - 50 * k} ${cy - 20 * k} L${cx + 80 * k} ${cy - 20 * k} L${cx + 70 * k} ${cy + 20 * k} Z`, "yellow", { parent: g, t: o.t, w: "mid", tone: 1 }); DS.shape(S, rrect(cx - 70 * k, cy + 20 * k, 140 * k, 40 * k, DS.r.xs), "yellow", { parent: g, t: o.t, w: "mid" }); return g; };
const tub = (S, cx, base, k, o = {}) => {
  const g = S.grp(o.parent); DS.shadow(S, cx, base, 220 * k, { parent: g });
  DS.shape(S, rrect(cx - 90 * k, base - 200 * k, 180 * k, 200 * k, DS.r.md), "blue", { parent: g, t: o.t, w: "mid" });
  DS.shape(S, rrect(cx - 100 * k, base - 236 * k, 200 * k, 44 * k, DS.r.sm), "white", { parent: g, t: o.t, w: "mid" });
  DS.shape(S, rrect(cx - 66 * k, base - 160 * k, 132 * k, 90 * k, DS.r.sm), "white", { parent: g, t: o.t, w: "detail", flat: true });
  S.text("PROTEIN", cx, base - 100 * k, { size: DS.type.caption, c: DS.c("blue", 2), t: o.t ?? T0(S), parent: g });
  return g;
};
const scoop = (S, cx, cy, k, o = {}) => { const g = S.grp(o.parent); DS.shape(S, circ(cx, cy, 42 * k, 28 * k), "yellow", { parent: g, t: o.t, w: "mid", tone: 1 }); DS.shape(S, `M${cx + 36 * k} ${cy - 6 * k} L${cx + 120 * k} ${cy - 24 * k} L${cx + 124 * k} ${cy - 10 * k} L${cx + 40 * k} ${cy + 10 * k} Z`, "yellow", { parent: g, t: o.t, w: "detail", tone: 2 }); return g; };

// ---------- signs, faces on organs ----------
// eyes + mouth on a blob (organs as characters). kind: worried flat smile sad
const blobFace = (S, cx, cy, k, kind = "worried", o = {}) => {
  const g = S.grp(o.parent), INKC = DS.P.ink[0];
  [-1, 1].forEach((sd) => { S.draw(circ(cx + sd * 26 * k, cy, 15 * k), S.start, 0, { fill: DS.P.white[0], c: INKC, w: DS.w.detail, parent: g }); S.fill(circ(cx + sd * 26 * k + (o.look || 0) * 3 * k, cy + 2 * k, 6 * k), S.start, 0, INKC, 1, g); });
  const m = { worried: `M${cx - 20 * k} ${cy + 42 * k} Q${cx - 8 * k} ${cy + 30 * k} ${cx} ${cy + 40 * k} Q${cx + 8 * k} ${cy + 50 * k} ${cx + 20 * k} ${cy + 38 * k}`, flat: `M${cx - 18 * k} ${cy + 40 * k} L${cx + 18 * k} ${cy + 40 * k}`, smile: `M${cx - 22 * k} ${cy + 34 * k} Q${cx} ${cy + 58 * k} ${cx + 22 * k} ${cy + 34 * k}`, sad: `M${cx - 22 * k} ${cy + 48 * k} Q${cx} ${cy + 30 * k} ${cx + 22 * k} ${cy + 48 * k}` }[kind];
  S.draw(m, S.start, 0, { c: INKC, w: DS.w.detail, parent: g });
  if (kind === "worried" || kind === "sad") S.draw(`M${cx - 44 * k} ${cy - 26 * k} L${cx - 10 * k} ${cy - 34 * k} M${cx + 44 * k} ${cy - 26 * k} L${cx + 10 * k} ${cy - 34 * k}`, S.start, 0, { c: INKC, w: DS.w.detail, parent: g });
  return g;
};
const limitSign = (S, cx, cy, r, str, o = {}) => {
  const g = S.grp(o.parent), t = o.t; DS.shadow(S, cx, cy + r * 2.3, r * 1.6, { parent: g });
  DS.shape(S, rect(cx - 8, cy + r, 16, r * 1.3), "gray", { parent: g, t, w: "detail", tone: 1, flat: true });
  DS.shape(S, circ(cx, cy, r), "white", { parent: g, t, w: "mid", flat: true });
  S.draw(circ(cx, cy, r * 0.84), t ?? S.start, 0, { c: DS.c("red"), w: DS.w.near * 1.8, parent: g });
  S.text(str, cx, cy + DS.type.title * 0.34, { size: DS.type.title, c: DS.c("ink"), t: t ?? T0(S), parent: g });
  return g;
};
const noSign = (S, cx, cy, r, t, parent) => fadeG(S, (() => { const g = S.grp(parent); S.draw(circ(cx, cy, r), S.start, 0, { c: DS.c("red"), w: DS.w.near * 1.8, parent: g }); S.draw(line([cx - r * 0.7, cy - r * 0.7], [cx + r * 0.7, cy + r * 0.7], 0), S.start, 0, { c: DS.c("red"), w: DS.w.near * 1.8, parent: g }); return g; })(), t);
const warnTri = (S, cx, cy, k, t, o = {}) => { const g = S.grp(o.parent); DS.shape(S, `M${cx} ${cy - 90 * k} L${cx + 100 * k} ${cy + 70 * k} L${cx - 100 * k} ${cy + 70 * k} Z`, "yellow", { parent: g, w: "near" }); S.text("!", cx, cy + 40 * k, { size: DS.type.display, c: DS.c("ink"), t: T0(S), parent: g }); return fadeG(S, g, t); };
const weightKg = (S, cx, base, k, str, o = {}) => { const g = S.grp(o.parent); DS.shadow(S, cx, base, 200 * k, { parent: g }); DS.shape(S, `M${cx - 50 * k} ${base - 130 * k} L${cx + 50 * k} ${base - 130 * k} L${cx + 100 * k} ${base} L${cx - 100 * k} ${base} Z`, "gray", { parent: g, t: o.t, w: "mid", tone: 2 }); DS.shape(S, rrect(cx - 34 * k, base - 170 * k, 68 * k, 50 * k, DS.r.sm), "gray", { parent: g, t: o.t, w: "mid", tone: 2 }); S.text(str, cx, base - 50 * k, { size: DS.type.small, c: DS.P.white[0], t: o.t ?? T0(S), parent: g }); return g; };
const bigText = (S, str, cx, cy, size, name, t, parent) => S.text(str, cx, cy, { size, c: DS.c(name, 2), t, parent });
const FLOOR = { wall: "wall", floor: "wood", window: false };
