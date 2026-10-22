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
const canGrid = (S, cx, o = {}) => {
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
const shelves = (S, x0, y0, x1, y1, rows = 4) => {
  DS.shape(S, rect(x0, y0, x1 - x0, y1 - y0), "wood", { layer: "mid", tone: 2, w: "detail", flat: true });
  const rh = (y1 - y0) / rows, COL = ["red", "blue", "green", "orange", "purple", "gold", "navy", "pink"];
  for (let r = 0; r < rows; r++) {
    let x = x0 + 8, i = r * 5 + x0;
    while (x < x1 - 26) { const bw = 24 + ((i * 7) % 4) * 6, bh = rh * (0.5 + ((i * 3) % 4) * 0.12); S.fill(rect(x, y0 + (r + 1) * rh - 8 - bh, bw, bh), S.start, 0, DS.c(COL[(i * 5) % 8], i % 3, "mid"), 1); x += bw + 2; i++; }
    S.draw(line([x0, y0 + (r + 1) * rh - 6], [x1, y0 + (r + 1) * rh - 6], 0), S.start, 0, { c: DS.c("wood", 2, "mid"), w: DS.w.mid });
  }
};
const libraryRoom = (S, o = {}) => {
  DS.room(S, { wall: "earth", floor: "wood", window: false, back: [300, 110, 1620, 740] });
  shelves(S, 340, 140, 720, 700, 4); shelves(S, 780, 140, 1160, 700, 4); shelves(S, 1220, 140, 1580, 700, 4);
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
