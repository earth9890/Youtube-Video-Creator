// look: still
// What If You Ate 300g of Protein a Day? (~8.5 min). What-if escalation by the hour (7 am, 7:15, noon, 4 pm, 10 pm, next morning). Runner: the SCOREBOARD on Dave's fridge
// (one column "PROTEIN": 0 -> 75 -> 150 -> 225 -> 300); in the last scene Dave draws a second column, "LIFTS". Second runner: four dozen eggs on the counter (12 go at breakfast,
// 36 are still standing at the end). Cast: Dave, his Brain (librarian from ep38), a fur-hooded trapper (old), a calm doctor (doc), a generic explorer silhouette for Stefansson.
// VISUAL SAFETY: nothing flashes or strobes. Bathroom = a closed door with a tally on it, nothing more. The rabbit is alive and holds a LEAN tag. Stefansson = a generic fur-hooded
// silhouette, never a likeness. Scientists = generic lab figures with name-less cards. No brands: unbranded eggs, chicken, powder tub.
// ---------- people ----------
const T0 = (S) => Math.max(0, S.start - 0.6); // static text pops in under the crossfade, so carried-over labels never blink
const txt = (S, s, x, y, o = {}) => S.text(s, x, y, Object.assign({ size: DS.type.caption, c: DS.c("ink") }, o, { t: o.t ?? T0(S) }));
const wtxt = (S, s, x, y, o = {}) => txt(S, s, x, y, Object.assign({ c: DS.P.white[0] }, o));
const card = (S, s, x, y, o = {}) => DS.card(S, " " + s + " ", x, y, Object.assign({ size: DS.type.small }, o, { t: o.t ?? T0(S) }));
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
  const t = o.t ?? S.start, c = o.c || DS.c("ink"), w = o.w || DS.w.mid * 0.8, g = S.grp(o.parent);
  S.draw(`M${x - 7 * k} ${gy - 20 * k} L${x - 9 * k} ${gy} M${x + 7 * k} ${gy - 20 * k} L${x + 9 * k} ${gy}`, t, 0, { c, w, parent: g });
  S.draw(`M${x - 14 * k} ${gy - 50 * k} L${x - 21 * k} ${gy - 28 * k} M${x + 14 * k} ${gy - 50 * k} L${x + 21 * k} ${gy - 28 * k}`, t, 0, { c, w, parent: g });
  S.draw(rrect(x - 14 * k, gy - 56 * k, 28 * k, 38 * k, DS.r.xs), t, 0, { c, w: DS.w.detail, fill: DS.c(o.shirt || "gray", 0), parent: g });
  S.draw(circ(x, gy - 68 * k, 13 * k), t, 0, { c, w: DS.w.detail, fill: o.fill || DS.P.white[0], parent: g });
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
const trapper = (S, x, gy, layer = "near", o = {}) => { const F = who(S, x, gy, layer, Object.assign({ s: 1.2, hair: "none", outfit: "hoodie", outfitC: DS.c("earth", 2), mood: "flat" }, o)); hood(S, F, "earth", 2); return F; };
const explorer = (S, x, gy, layer = "near", o = {}) => { const F = who(S, x, gy, layer, Object.assign({ s: 1.2, hair: "none", outfit: "hoodie", outfitC: DS.c("gray", 2), mood: "flat" }, o)); hood(S, F, "gray", 2); return F; };
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
// flexed arm icon (skin = dusk): upper arm, forearm leaning over, a fist with fingers, a bicep bump
const bicep = (S, cx, cy, k = 1, o = {}) => {
  const g = S.grp(o.parent), b = o.bulge || 1, t = o.t, sk = o.name || "dusk";
  limb(S, [[cx - 150 * k, cy + 74 * k], [cx - 50 * k, cy + 84 * k], [cx + 50 * k, cy + 96 * k]], 58 * k, sk, { parent: g, t });
  limb(S, [[cx + 50 * k, cy + 96 * k], [cx + 36 * k, cy - 10 * k], [cx - 30 * k, cy - 78 * k]], 50 * k, sk, { parent: g, t });
  DS.shape(S, circ(cx - 44 * k, cy + 30 * k, 70 * k * b, 48 * k * b), sk, { parent: g, t, w: "mid", flat: true, tone: 1 });
  S.draw(arc(cx - 44 * k, cy + 30 * k, 40 * k * b, 205, 255, 28 * k * b), t ?? S.start, 0, { c: DS.c(sk, 2), w: DS.w.detail, parent: g });
  const fg = S.grp(g), fx = cx - 52 * k, fy = cy - 112 * k;
  DS.shape(S, rrect(fx - 42 * k, fy - 36 * k, 84 * k, 72 * k, DS.r.sm), sk, { parent: fg, t, w: "mid", flat: true });
  [-18, 0, 18].forEach((dx) => S.draw(line([fx + dx * k, fy - 34 * k], [fx + dx * k, fy - 8 * k], 0), t ?? S.start, 0, { c: DS.c(sk, 2), w: DS.w.detail, parent: fg }));
  DS.shape(S, circ(fx - 40 * k, fy + 10 * k, 16 * k, 22 * k), sk, { parent: fg, t, w: "detail", flat: true });
  fg.setAttribute("transform", `rotate(-28 ${fx} ${fy})`);
  DS.shape(S, rrect(cx - 178 * k, cy + 36 * k, 60 * k, 78 * k, DS.r.sm), "blue", { parent: g, t, w: "mid" });
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
  if (o.fill) { const fg = S.grp(g); clipTo(fg, d); S.draw(rect(cx - 140 * k, cy + 150 * k - o.fill * 260 * k, 280 * k, 260 * k), S.start, 0, { fill: DS.c("orange", 1), c: DS.c("orange", 2), w: DS.w.detail, parent: fg }); }
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
  DS.shadow(S, cx, gy, 240 * k, { parent: g });
  S.draw(line([cx + 38 * k, gy - 52 * k], [cx + 44 * k, gy - 4 * k], 0), t ?? S.start, 0, { c: INKC, w: DS.w.mid, parent: g });
  S.draw(line([cx + 54 * k, gy - 52 * k], [cx + 62 * k, gy - 4 * k], 0), t ?? S.start, 0, { c: INKC, w: DS.w.mid, parent: g });
  DS.shape(S, circ(cx - 82 * k, gy - 80 * k, 20 * k), "white", { parent: g, t, w: "detail", flat: true });
  DS.shape(S, circ(cx - 44 * k, gy - 12 * k, 40 * k, 12 * k), "gray", { parent: g, t, w: "detail", tone: 1, flat: true });
  DS.shape(S, circ(cx, gy - 82 * k, 76 * k, 38 * k), "gray", { parent: g, t, w: "mid", tone: 1 });
  DS.shape(S, circ(cx - 38 * k, gy - 74 * k, 32 * k, 28 * k), "gray", { parent: g, t, w: "detail", tone: 0 });
  DS.shape(S, circ(cx + 66 * k, gy - 124 * k, 29 * k, 26 * k), "gray", { parent: g, t, w: "mid", tone: 1 });
  [[50, 0], [78, 0]].forEach(([dx]) => DS.shape(S, `M${cx + dx * k} ${gy - 144 * k} Q${cx + (dx - 8) * k} ${gy - 214 * k} ${cx + (dx + 14) * k} ${gy - 226 * k} Q${cx + (dx + 28) * k} ${gy - 196 * k} ${cx + (dx + 16) * k} ${gy - 146 * k} Z`, "gray", { parent: g, t, w: "detail", tone: 1 }));
  S.fill(circ(cx + 76 * k, gy - 130 * k, 5 * k), t ?? S.start, 0, INKC, 1, g);
  S.fill(circ(cx + 94 * k, gy - 120 * k, 4 * k), t ?? S.start, 0, DS.c("pink", 2), 1, g);
  S.draw(`M${cx + 78 * k} ${gy - 112 * k} Q${cx + 84 * k} ${gy - 106 * k} ${cx + 92 * k} ${gy - 110 * k}`, t ?? S.start, 0, { c: INKC, w: DS.w.hair, parent: g });
  const tg = S.grp(g);
  S.draw(line([cx + 56 * k, gy - 98 * k], [cx + 78 * k, gy - 64 * k], 0), t ?? S.start, 0, { c: DS.c("brown"), w: DS.w.detail, parent: tg });
  DS.shape(S, rrect(cx + 36 * k, gy - 66 * k, 130 * k, 48 * k, DS.r.xs), "white", { parent: tg, t, w: "detail", flat: true });
  S.text("LEAN", cx + 101 * k, gy - 32 * k, { size: DS.type.caption, c: DS.c("red", 2), t: t ?? T0(S), parent: tg });
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
  for (let i = 0; i < n; i++) { const c = i % cols, r = Math.floor(i / cols); mini(S, x0 + c * gx, y0 + r * gy, k, { t: t0 !== undefined ? t0 + (n > 1 ? (i * (t1 - t0)) / (n - 1) : 0) : undefined, c: o.c, parent: g, fill: o.fill, shirt: o.shirt || ["green", "orange", "purple", "pink", "gold", "sky"][i % 6] }); }
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
  DS.shape(S, rrect(cx - 84 * k, base - 160 * k, 168 * k, 90 * k, DS.r.sm), "white", { parent: g, t: o.t, w: "detail", flat: true });
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

// ---------- timing: one picture per beat, landing just after its first word ----------
const CUES = [
  [1, 0], [1, 11], [2, 0], [2, 11], [3, 0], [4, 0], [5, 0], [5, 8], [5, 17], [6, 0], [7, 0], [8, 0], [9, 0], [10, 0],
  [11, 0], [11, 7], [12, 4], [13, 0], [14, 0], [15, 0], [15, 14], [16, 0], [17, 0], [17, 12], [18, 0], [18, 7], [19, 0],
  [20, 0], [20, 10], [21, 0], [22, 0], [22, 8], [22, 19], [23, 0], [23, 12], [24, 0], [24, 12], [25, 0], [26, 0], [27, 0], [27, 8], [28, 0],
  [29, 0], [29, 12], [30, 0], [30, 9], [31, 0], [31, 18], [32, 0], [33, 0], [34, 0], [34, 19], [35, 0], [35, 20], [36, 0], [37, 0],
  [38, 0], [38, 11], [39, 10], [40, 0], [41, 0], [42, 0], [42, 11], [42, 20], [43, 0], [44, 0],
  [45, 0], [45, 8], [46, 0], [46, 11], [47, 0], [48, 0], [49, 0], [50, 0], [50, 7], [51, 0], [51, 15], [52, 0], [52, 14], [53, 0], [53, 12], [54, 0],
  [55, 0], [56, 0], [56, 10], [57, 0], [58, 0], [58, 15], [59, 0], [60, 0], [61, 0], [62, 0], [62, 15], [63, 0], [64, 0], [64, 15], [65, 0], [65, 9],
  [66, 0], [67, 0], [67, 17], [68, 0], [69, 0], [70, 0], [71, 0], [71, 12], [72, 0],
  [73, 0], [74, 0], [75, 0], [76, 0], [76, 6]];
const WINS = sceneWindows(CUES, -0.25);
const sc = (c, w, o) => { const k = CUES.findIndex(([a, b]) => a === c && b === w); if (k < 0) throw new Error("no cue " + c + ":" + w); return scene(WINS[k][0], WINS[k][1], o); };
const NITE = { wall: "night", floor: "navy", window: false };
const topOf = (gy, s) => gy - s * 309 - 75; // where Dave's Brain stands on his head

// ===================== 1. Three hundred grams =====================
// This is Dave. It's seven in the morning, and he has stacked four dozen eggs on the kitchen counter.
{ const S = sc(1, 0, { cam: "push", focus: "800 520" }); DS.room(S, KITW); counter(S, 380, 1100);
  wallClock(S, 1000, 320, 96, 7, 0, { label: "7 AM", t: W(1, 4) });
  const F = dave(S, 640, 960, "near", { s: 1.4, look: 5, mood: "smile" });
  card(S, "DAVE", 640, 170, { t: W(1, 2) });
  DS.vignette(S); }

{ const S = sc(1, 11, { cam: "push", focus: "800 480" }); DS.room(S, KITW); counter(S, 380, 1100);
  eggStack(S, 760, 596, 1.1, 4, { ts: [W(1, 11), W(1, 12), W(1, 13), W(1, 14)] });
  const F = dave(S, 1300, 960, "near", { s: 1.3, look: -6, mood: "wow" });
  card(S, "4 DOZEN", 760, 130, { t: W(1, 12) });
  card(S, "= 48 EGGS", 1300, 330, { t: W(1, 14), tc: "red" });
  DS.vignette(S); }

// Today, Dave is going to eat three hundred grams of protein.
{ const S = sc(2, 0, { cam: "push", focus: "800 520" }); DS.room(S, KIT); counter(S, 380, 1100);
  const F = dave(S, 560, 960, "near", { s: 1.5, look: 5, mood: "determined" });
  say(S, 1270, 410, 350, 230, 800, 620, ["300 g", "of protein"], W(2, 6), { think: true, size: DS.type.title });
  card(S, "TODAY", 560, 170, { t: W(2, 0) });
  DS.vignette(S); }

// By tomorrow, he plans to have enormous arms.
{ const S = sc(2, 11, { cam: "push", focus: "800 520" }); DS.room(S, KIT);
  const F = dave(S, 560, 960, "near", Object.assign({}, FLEX, { s: 1.5, look: 5, mood: "determined" }));
  const g = S.grp(); S.thought(1290, 440, 360, 260, 800, 640, S.start, 0.3, { parent: g }); bicep(S, 1290, 440, 1.5, { bulge: 1.5, parent: g, t: W(2, 17) });
  fadeG(S, g, W(2, 16));
  card(S, "TOMORROW", 560, 170, { t: W(2, 12) });
  DS.vignette(S); }

// "Protein is muscle. More protein, more muscle. It's simple." (Dave)
{ const S = sc(3, 0, { cam: "push", focus: "900 520" }); DS.room(S, KIT); counter(S, 380, 1100);
  const F = dave(S, 640, 960, "near", Object.assign({}, FLEX, { s: 1.5, look: 4, mood: "happy" })); talk(S, F, W(3, 0), END(3));
  say(S, 1330, 400, 380, 190, 900, 560, ["PROTEIN", "= MUSCLE"], W(3, 0), { size: DS.type.title });
  card(S, "MORE PROTEIN", 1330, 690, { t: W(3, 3), size: DS.type.small });
  card(S, "MORE MUSCLE", 1330, 800, { t: W(3, 5), size: DS.type.small, tc: "red" });
  DS.vignette(S); }

// So what would happen if you ate three hundred grams of protein in a day? Where would it all go?
{ const S = sc(4, 0, { cam: "push", focus: "900 520" }); DS.room(S, KIT); counter(S, 380, 1100);
  const F = dave(S, 560, 960, "near", { s: 1.5, look: 5, mood: "flat" });
  const g = S.grp(); S.thought(1290, 410, 340, 220, 800, 620, S.start, 0.3, { parent: g }); eggStack(S, 1290, 520, 0.55, 4, { parent: g });
  txt(S, "300 g", 1290, 640, { size: DS.type.title, c: DS.c("red", 2), parent: g }); fadeG(S, g, W(4, 7));
  card(S, "WHAT IF?", 560, 170, { t: W(4, 1) });
  [[420, 380], [560, 320], [700, 380]].forEach(([x, y], i) => txt(S, "?", x, y, { size: DS.type.display, c: DS.c("red", 2), t: W(4, 15) + i * 0.25 }));
  card(S, "WHERE DOES IT GO?", 900, 800, { t: W(4, 15), size: DS.type.small });
  DS.vignette(S); }

// By mid-morning, his brain begs him to stop.
{ const S = sc(5, 0, { cam: "push", focus: "800 520" }); DS.room(S, KITW); counter(S, 380, 1100);
  wallClock(S, 420, 320, 90, 10, 0, { label: "10 AM", t: W(5, 1) });
  const B = brainy(S, 960, topOf(960, 1.5) + 6, 0.85, { face: "worried", armR: "stop", armL: "up" }); B.enter(W(5, 3), 0, 170, 0.7, 0.35); B.talk(W(5, 4), W(5, 7));
  const F = dave(S, 960, 960, "near", { s: 1.5, look: 0, mood: "worried" }); sweatAt(S, F.hd[0] + F.r * 1.0, F.hd[1] - F.r * 0.2, W(5, 4), 1.8);
  card(S, "PLEASE, STOP", 1400, 360, { t: W(5, 5), tc: "red" });
  DS.vignette(S); }

// By the afternoon, his liver hits a speed limit,
{ const S = sc(5, 8, { cam: "push", focus: "900 520" }); DS.room(S, { wall: "earth", floor: "wood", window: false });
  liver(S, 620, 520, 1.7); blobFace(S, 640, 520, 1.4, "worried");
  sweatAt(S, 800, 420, W(5, 13), 1.6);
  limitSign(S, 1300, 450, 150, "MAX", { t: W(5, 15) });
  card(S, "HIS LIVER", 620, 770, { t: W(5, 11) });
  card(S, "SPEED LIMIT", 1300, 200, { t: W(5, 15), tc: "red" });
  DS.vignette(S); }

// and an Arctic explorer has a warning for him.
{ const S = sc(5, 17, { cam: "push", focus: "900 560" }); DS.outdoor(S, SNOW); snowDeco(S);
  const F = explorer(S, 760, 920, "near", { s: 1.5, mood: "flat", pose: "point", look: 6 });
  card(S, "ARCTIC EXPLORER", 760, 200, { t: W(5, 19) });
  warnTri(S, 1350, 520, 1.5, W(5, 22));
  DS.vignette(S); }

// This is a thought experiment, so please don't try it. Let's watch Dave do it instead.
{ const S = sc(6, 0, { cam: "push", focus: "960 520" }); DS.room(S, KIT); counter(S, 380, 1100);
  const F = dave(S, 560, 960, "near", { s: 1.3, look: 4, mood: "smile" });
  card(S, "THOUGHT EXPERIMENT", 960, 170, { t: W(6, 3), size: DS.type.body });
  eggStack(S, 1250, 596, 0.8, 4); noSign(S, 1250, 440, 190, W(6, 6));
  card(S, "DON'T TRY IT", 1250, 790, { t: W(6, 7), tc: "red" });
  DS.vignette(S); }

// On the fridge, he's drawn a scoreboard. It says zero out of three hundred.
{ const S = sc(7, 0, { cam: "none", focus: "1340 420" }); DS.room(S, KIT);
  const Fr = fridge(S, 1090, 130, 500, 630);
  const B = scoreb(S, 1340, 430, 0.82, { val: 0, t: S.start });
  const F = dave(S, 700, 960, "near", { s: 1.4, look: 8, mood: "smile", pose: "point" });
  card(S, "SCOREBOARD", 1340, 660, { t: W(7, 6) });
  S.zoom(1340, 430, 1.55, W(7, 7), 1.4);
  DS.vignette(S); }

// Three hundred grams is about forty-eight large eggs, or a kilo of roast chicken breast.
{ const S = sc(8, 0, { cam: "push", focus: "960 520" }); DS.room(S, KIT); counter(S, 380, 1560);
  eggStack(S, 700, 596, 1.0, 4);
  kScale(S, 1250, 596, 1.1, "1 kg"); chicken(S, 1250, 494, 0.85);
  card(S, "300 g", 960, 150, { t: W(8, 0), size: DS.type.title, tc: "red" });
  card(S, "48 EGGS", 700, 760, { t: W(8, 5) });
  card(S, "1 KILO OF CHICKEN", 1250, 340, { t: W(8, 9), size: DS.type.caption });
  DS.vignette(S); }

// America's National Academies set the recommended amount at zero point eight grams of protein a day for every kilo you weigh.
{ const S = sc(9, 0, { cam: "push", focus: "900 520" }); DS.outdoor(S, { hy: 640 });
  hall(S, 620, 840, 540, 470);
  card(S, "NATIONAL ACADEMIES", 620, 170, { t: W(9, 1), size: DS.type.small });
  txt(S, "0.8 g", 1330, 400, { size: DS.type.display, c: DS.c("red", 2), t: W(9, 8) });
  txt(S, "of protein a day", 1330, 480, { size: DS.type.small, c: DS.c("ink"), t: W(9, 11) });
  weightKg(S, 1330, 880, 1.2, "1 kg", { t: W(9, 17) });
  txt(S, "for every", 1330, 585, { size: DS.type.small, c: DS.c("ink"), t: W(9, 16) });
  DS.vignette(S); }

// Dave weighs eighty kilos, so that's about sixty-four grams. He's going for almost five times that.
{ const S = sc(10, 0, { cam: "push", focus: "960 540" }); DS.room(S, FLOOR);
  const sY = 936; bathScale(S, 500, sY + 22, 1.1, "80 kg", { ts: W(10, 2) });
  const F = dave(S, 500, sY, "near", { s: 1.3, look: 6, mood: "flat" });
  card(S, "DAVE", 500, 170, { t: W(10, 0) });
  const bx = 1130, base = 880;
  bar(S, bx, base, 150, 85, "green", W(10, 7)); txt(S, "64 g", bx + 75, base - 105, { size: DS.type.small, c: DS.c("green", 2), t: W(10, 7) });
  bar(S, bx + 330, base, 150, 400, "red", W(10, 12)); txt(S, "300 g", bx + 405, base - 420, { size: DS.type.small, c: DS.c("red", 2), t: W(10, 12) });
  card(S, "ALMOST 5 TIMES", 1300, 190, { t: W(10, 12), tc: "red", size: DS.type.small });
  DS.vignette(S); }

// ===================== 2. Breakfast: twelve eggs =====================
// Seven fifteen. Twelve eggs, about seventy-five grams. The scoreboard says seventy-five.
{ const S = sc(11, 0, { cam: "push", focus: "960 520" }); DS.room(S, KIT); counter(S, 380, 1560);
  wallClock(S, 960, 300, 90, 7, 15, { label: "7:15", t: W(11, 0) });
  eggStack(S, 640, 596, 0.85, 3);
  const F = dave(S, 1250, 960, "near", { s: 1.4, look: -4, mood: "smile" });
  eggCarton(S, 1250, 700, 1.0);
  card(S, "12 EGGS", 1250, 200, { t: W(11, 2) });
  card(S, "75 g", 640, 200, { t: W(11, 5), tc: "red" });
  DS.vignette(S); }

{ const S = sc(11, 7, { cam: "none", focus: "1340 430" }); DS.room(S, KIT);
  fridge(S, 1090, 130, 500, 630);
  scoreb(S, 1340, 430, 0.82, { from: 0, val: 75, ct: W(11, 9), dur: 1.3, t: S.start });
  const F = dave(S, 700, 960, "near", { s: 1.4, look: 8, mood: "happy", pose: "point" });
  card(S, "EGG NUMBER 9", 1340, 660, { t: W(12, 0), size: DS.type.caption }); S.zoom(1340, 430, 1.55, W(11, 8), 1.4);
  DS.vignette(S); }

// By egg number nine, a small, tired voice speaks up inside Dave's head. His brain.
{ const S = sc(12, 4, { cam: "push", focus: "900 520" }); DS.room(S, KIT); counter(S, 380, 1100);
  const B = brainy(S, 860, topOf(960, 1.5) + 6, 0.85, { face: "tired" }); B.enter(W(12, 6), 0, 170, 0.7, 0.35); B.talk(W(12, 8), W(12, 12));
  const F = dave(S, 860, 960, "near", { s: 1.5, look: 0, mood: "wow" });
  say(S, 1380, 240, 280, 110, 1060, 330, ["Dave..."], W(12, 8), { size: DS.type.small });
  card(S, "HIS BRAIN", 380, 200, { t: W(12, 13), tc: "red" });
  DS.vignette(S); }

// "Dave, we're full. We've been full since egg number seven." (Brain)
{ const S = sc(13, 0, { cam: "push", focus: "960 520" }); DS.room(S, KIT); counter(S, 380, 1100);
  const B = brainy(S, 720, topOf(960, 1.5) + 6, 0.95, { face: "tired", armR: "point", armL: "hip" }); B.talk(W(13, 0), END(13)); B.face(W(13, 3), "stern");
  const F = dave(S, 720, 960, "near", { s: 1.5, look: 0, mood: "worried" });
  egg(S, 1350, 520, 2.6, { t: W(13, 7) }); txt(S, "7", 1350, 540, { size: DS.type.title, c: DS.c("red", 2), t: W(13, 8) });
  card(S, "WE'RE FULL", 1350, 230, { t: W(13, 1), tc: "red" });
  DS.vignette(S); }

// Protein is the most filling of the big three nutrients. Protein first, then carbs, then fat.
{ const S = sc(14, 0, { cam: "push", focus: "960 560" }); DS.room(S, KIT);
  const steps = [[960, 300, "gold", "PROTEIN", 10], [660, 220, "gray", "CARBS", 12], [1260, 150, "earth", "FAT", 14]], base = 900;
  steps.forEach(([x, h, nm, lab, w], i) => {
    const g = S.grp(); DS.shape(S, rect(x - 150, base - h, 300, h), nm, { parent: g, w: "mid", tone: i === 2 ? 2 : 0 }); txt(S, lab, x, base - h + 80, { size: DS.type.small, c: DS.c("ink"), parent: g, t: W(14, w) }); txt(S, String(i === 0 ? 1 : i === 1 ? 2 : 3), x, base - h + 160, { size: DS.type.title, c: DS.c("ink"), parent: g, t: W(14, w) });
    scaleY(g, W(14, w), x, base, 0.8, 0.02, 1);
    const ig = S.grp(); if (i === 0) egg(S, x, base - h - 40, 1.7, { parent: ig }); else if (i === 1) bread(S, x, base - h - 60, 0.9, { parent: ig }); else butter(S, x, base - h - 60, 0.85, { parent: ig });
    fadeG(S, ig, W(14, 6) + i * 0.3); tl.fromTo(ig, { attr: { transform: `translate(0 ${h})` } }, { attr: { transform: "translate(0 0)" }, duration: 0.8, ease: "power2.out", immediateRender: true }, W(14, w)); });
  card(S, "THE BIG THREE", 960, 150, { t: W(14, 5) });
  DS.vignette(S); }

// In a two thousand five Seattle study, people who doubled their share of protein
{ const S = sc(15, 0, { cam: "push", focus: "960 540" }); DS.room(S, { wall: "sand", floor: "wood", window: false });
  card(S, "SEATTLE, 2005", 960, 170, { t: W(15, 5) });
  pie(S, 640, 520, 190, 0.15, { c: "blue" }); fadeG(S, pie(S, 1280, 520, 190, 0.3, { c: "blue" }), W(15, 9));
  txt(S, "USUAL", 640, 800, { size: DS.type.small, c: DS.c("ink") });
  txt(S, "2 TIMES THE PROTEIN", 1280, 800, { size: DS.type.small, c: DS.c("blue", 2), t: W(15, 9) });
  miniGrid(S, 560, 940, 5, 1, 40, 0, 0.8); miniGrid(S, 1200, 940, 5, 1, 40, 0, 0.8, { t0: W(15, 9), t1: W(15, 12) });
  DS.vignette(S); }

// ate about four hundred and forty fewer calories a day, without being told to.
{ const S = sc(15, 14, { cam: "push", focus: "960 540" }); DS.room(S, { wall: "sand", floor: "wood", window: false });
  const base = 880;
  bar(S, 640, base, 220, 400, "gray", S.start + 0.1); txt(S, "USUAL MEAL", 750, base + 56, { size: DS.type.caption, c: DS.c("ink") });
  bar(S, 1040, base, 220, 312, "blue", W(15, 16), {}); txt(S, "DOUBLE PROTEIN", 1150, base + 56, { size: DS.type.caption, c: DS.c("blue", 2) });
  const dg = S.grp(); S.draw(`M1040 480 H1260`, S.start, 0, { c: DS.c("red"), w: DS.w.near, parent: dg }); S.draw(`M1150 485 V565`, S.start, 0, { c: DS.c("red"), w: DS.w.near, parent: dg }); fadeG(S, dg, W(15, 18));
  card(S, "-440 CALORIES A DAY", 960, 190, { t: W(15, 18), tc: "red" });
  card(S, "NOBODY TOLD THEM", 960, 300, { t: W(15, 24), size: DS.type.caption });
  DS.vignette(S); }

// So Dave is trying to eat more, using the one food that's best at making you eat less.
{ const S = sc(16, 0, { cam: "push", focus: "960 540" }); DS.room(S, KIT); counter(S, 380, 1560);
  const F = dave(S, 520, 960, "near", { s: 1.4, look: 6, mood: "determined", pose: "reach" });
  egg(S, 1300, 480, 4.2, { t: W(16, 8) });
  arrowR(S, 760, 420, 1040, 420, W(16, 2), { c: "green", tone: 2 }); txt(S, "EAT MORE", 900, 380, { size: DS.type.small, c: DS.c("green", 2), t: W(16, 3) });
  arrowR(S, 1050, 700, 770, 700, W(16, 12), { c: "red", tone: 2 }); txt(S, "EAT LESS", 910, 770, { size: DS.type.small, c: DS.c("red", 2), t: W(16, 14) });
  card(S, "THE BEST AT IT", 1300, 200, { t: W(16, 11) });
  DS.vignette(S); }

// And there's a second problem. Your body burns energy just processing food:
{ const S = sc(17, 0, { cam: "push", focus: "900 520" }); DS.room(S, KIT);
  const F = dave(S, 580, 960, "near", { s: 1.5, look: 5, mood: "flat" });
  const g = S.grp(); S.thought(1290, 430, 360, 250, 800, 640, S.start, 0.3, { parent: g }); S.flame(1290, 520, 1.3, S.start, 0, { parent: g }); txt(S, "BURNING ENERGY", 1290, 580, { size: DS.type.caption, c: DS.c("ink"), parent: g }); fadeG(S, g, W(17, 6));
  card(S, "A SECOND PROBLEM", 580, 170, { t: W(17, 3) });
  txt(S, "just to process food", 1290, 650, { size: DS.type.caption, c: DS.c("gray", 2), t: W(17, 6) });
  DS.vignette(S); }

// up to three percent of the energy in fat, five to ten in carbs.
{ const S = sc(17, 12, { cam: "push", focus: "960 560" }); DS.room(S, { wall: "sand", floor: "wood", window: false });
  const base = 860, u = 14;
  bar(S, 640, base, 220, 3 * u, "yellow", W(17, 14)); butter(S, 750, base - 3 * u - 50, 0.8, {}); txt(S, "FAT  3%", 750, base + 56, { size: DS.type.small, c: DS.c("ink"), t: W(17, 14) });
  bar(S, 1060, base, 220, 5 * u, "orange", W(17, 21), { tone: 0 }); bar(S, 1060, base - 5 * u, 220, 5 * u, "orange", W(17, 22), { tone: 1 }); bread(S, 1170, base - 10 * u - 60, 0.85, {}); txt(S, "CARBS  5-10%", 1170, base + 56, { size: DS.type.small, c: DS.c("ink"), t: W(17, 21) });
  card(S, "HEAT COST OF EATING", 960, 190, { t: W(17, 12), size: DS.type.small });
  DS.vignette(S); }

// For protein, it's twenty to thirty percent.
{ const S = sc(18, 0, { cam: "push", focus: "960 560" }); DS.room(S, { wall: "sand", floor: "wood", window: false });
  const base = 860, u = 14;
  bar(S, 440, base, 160, 3 * u, "yellow", S.start); bar(S, 640, base, 160, 5 * u, "orange", S.start); bar(S, 640, base - 5 * u, 160, 5 * u, "orange", S.start);
  txt(S, "FAT", 520, base + 56, { size: DS.type.caption, c: DS.c("ink") }); txt(S, "CARBS", 720, base + 56, { size: DS.type.caption, c: DS.c("ink") });
  bar(S, 1040, base, 260, 20 * u, "red", W(18, 3)); bar(S, 1040, base - 20 * u, 260, 10 * u, "red", W(18, 4), { tone: 1 });
  egg(S, 1170, base - 30 * u - 50, 1.6, { t: W(18, 3) }); txt(S, "PROTEIN  20-30%", 1170, base + 56, { size: DS.type.small, c: DS.c("red", 2), t: W(18, 3) });
  DS.vignette(S); }

// So of Dave's twelve hundred protein calories, roughly three hundred leave him as heat.
{ const S = sc(18, 7, { cam: "push", focus: "960 540" }); DS.room(S, { wall: "sand", floor: "wood", window: false });
  pie(S, 640, 540, 230, 0.25, { c: "red", t: W(18, 10) }); heat(S, 700, 270, 4, W(18, 15));
  txt(S, "1,200 kcal", 1280, 400, { size: DS.type.title, c: DS.c("ink"), t: W(18, 10) }); txt(S, "of protein calories", 1280, 470, { size: DS.type.small, c: DS.c("gray", 2), t: W(18, 12) });
  txt(S, "300 kcal", 1280, 640, { size: DS.type.title, c: DS.c("red", 2), t: W(18, 15) }); txt(S, "leave as heat", 1280, 710, { size: DS.type.small, c: DS.c("red", 2), t: W(18, 17) });
  card(S, "ABOUT A QUARTER", 640, 850, { t: W(18, 14), size: DS.type.caption });
  DS.vignette(S); }

// Dave has become a small radiator that runs on eggs.
{ const S = sc(19, 0, { cam: "push", focus: "900 540" }); DS.room(S, KIT); counter(S, 1100, 1560);
  const F = dave(S, 760, 960, "near", { s: 1.5, look: 4, mood: "flat" });
  radiator(S, F.cx, F.hip[1] + 12, 130, 170); heat(S, F.cx - 50, F.hd[1] - F.r - 30, 4, W(19, 4), { gap: 34 });
  eggCarton(S, 1330, 596, 1.0);
  card(S, "A SMALL RADIATOR", 700, 170, { t: W(19, 3) });
  card(S, "RUNS ON EGGS", 1330, 330, { t: W(19, 7), tc: "red" });
  DS.vignette(S); }

// ===================== 3. Lunch: the nitrogen problem =====================
// Twelve noon. A quarter of a kilo of chicken breast. The scoreboard says a hundred and fifty.
{ const S = sc(20, 0, { cam: "push", focus: "960 520" }); DS.room(S, KIT); counter(S, 380, 1560);
  wallClock(S, 640, 300, 90, 12, 0, { label: "NOON", t: W(20, 0) });
  const F = dave(S, 420, 960, "near", { s: 1.3, look: 6, mood: "smile" });
  kScale(S, 1160, 596, 1.2, "250 g"); chicken(S, 1160, 484, 0.95);
  card(S, "A QUARTER KILO", 1160, 270, { t: W(20, 3), size: DS.type.caption });
  DS.vignette(S); }

{ const S = sc(20, 10, { cam: "none", focus: "1340 430" }); DS.room(S, KIT);
  fridge(S, 1090, 130, 500, 630);
  scoreb(S, 1340, 430, 0.82, { from: 75, val: 150, ct: W(20, 12), dur: 1.3, t: S.start });
  const F = dave(S, 700, 960, "near", { s: 1.4, look: 8, mood: "happy", pose: "point" });
  S.zoom(1340, 430, 1.55, W(20, 12), 1.4);
  DS.vignette(S); }

// "Halfway there, and my arms already feel bigger." (Dave)
{ const S = sc(21, 0, { cam: "push", focus: "900 520" }); DS.room(S, KIT);
  const F = dave(S, 600, 960, "near", Object.assign({}, FLEX, { s: 1.5, look: 4, mood: "happy" })); talk(S, F, W(21, 0), END(21));
  say(S, 1290, 290, 360, 130, 860, 450, ["MY ARMS FEEL BIGGER"], W(21, 3), { size: DS.type.caption });
  const bx = 1000, by = 620; DS.shape(S, rrect(bx, by, 600, 70, DS.r.sm), "gray", { w: "mid", tone: 1, flat: true });
  const bg = S.grp(); DS.shape(S, rrect(bx, by, 300, 70, DS.r.sm), "blue", { w: "mid", flat: true, parent: bg }); growX(bg, W(21, 0), bx, by, 1.2);
  S.draw(line([bx + 300, by - 20], [bx + 300, by + 90], 0), S.start, 0, { c: DS.c("red"), w: DS.w.mid });
  txt(S, "150 / 300 g", 1300, 780, { size: DS.type.small, c: DS.c("ink"), t: W(21, 0) });
  txt(S, "HALFWAY", 1300, 570, { size: DS.type.small, c: DS.c("green", 2), t: W(21, 1) });
  DS.vignette(S); }

// Here's the part nobody puts on the label.
{ const S = sc(22, 0, { cam: "push", focus: "960 520" }); DS.room(S, KIT);
  const F = dave(S, 520, 960, "near", { s: 1.3, look: 7, mood: "flat" });
  const gx = 1260, gy0 = 150; paperR(S, gx - 230, gy0, 460, 640, { name: "white" });
  txt(S, "NUTRITION", gx, gy0 + 76, { size: DS.type.small, c: DS.c("ink") }); S.draw(line([gx - 190, gy0 + 100], [gx + 190, gy0 + 100], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.mid });
  lines(S, gx - 190, gy0 + 160, 380, 5, undefined, 56);
  const q = S.grp(); S.draw(rect(gx - 190, gy0 + 450, 380, 120), S.start, 0, { c: DS.c("red"), w: DS.w.mid, parent: q }); txt(S, "???", gx, gy0 + 536, { size: DS.type.title, c: DS.c("red", 2), parent: q }); fadeG(S, q, W(22, 3));
  card(S, "NOT ON THE LABEL", 520, 180, { t: W(22, 3), size: DS.type.caption });
  DS.vignette(S); }

// Carbs and fat are made of carbon, hydrogen and oxygen,
{ const S = sc(22, 8, { cam: "push", focus: "960 520" }); DS.room(S, { wall: "sand", floor: "wood", window: false });
  [[600, "C", "CARBON", 14], [960, "H", "HYDROGEN", 15], [1320, "O", "OXYGEN", 17]].forEach(([x, s, n, w]) => { atom(S, x, 470, 90, s, { t: W(22, w) }); txt(S, n, x, 640, { size: DS.type.small, c: DS.c("ink"), t: W(22, w) }); });
  bread(S, 500, 240, 0.8, {}); butter(S, 640, 250, 0.7, {});
  card(S, "CARBS AND FAT", 960, 170, { t: W(22, 8) });
  DS.vignette(S); }

// so when you burn them, you mostly breathe them out.
{ const S = sc(22, 19, { cam: "push", focus: "960 540" }); DS.room(S, KIT);
  const F = dave(S, 560, 960, "near", { s: 1.5, look: 8, mood: "flat" });
  [[840, 560, "C"], [980, 500, "O"], [1130, 450, "H"]].forEach(([x, y, s], i) => { const g = S.grp(); S.draw(circ(x, y, 74 - i * 6, 54 - i * 4), S.start, 0, { fill: DS.P.white[0], c: DS.c("gray", 2), w: DS.w.mid, parent: g }); atom(S, x, y, 28, s, { parent: g }); fadeG(S, g, W(22, 24) + i * 0.35, 0.5); });
  card(S, "BURNED, THEN BREATHED OUT", 1100, 790, { t: W(22, 25), size: DS.type.caption });
  DS.vignette(S); }

// Protein has an extra ingredient. About sixteen percent of it is nitrogen,
{ const S = sc(23, 0, { cam: "push", focus: "960 540" }); DS.room(S, { wall: "sand", floor: "wood", window: false });
  [[360, "C"], [500, "H"], [640, "O"]].forEach(([x, s]) => atom(S, x, 440, 52, s, {}));
  atom(S, 960, 440, 96, "N", { t: W(23, 4) }); ringAt(S, 960, 440, 126, 126, W(23, 4));
  pie(S, 1420, 520, 180, 0.16, { c: "blue", t: W(23, 6) }); txt(S, "16%", 1420, 800, { size: DS.type.title, c: DS.c("blue", 2), t: W(23, 7) });
  card(S, "AN EXTRA INGREDIENT", 960, 170, { t: W(23, 3), size: DS.type.small });
  card(S, "NITROGEN", 960, 640, { t: W(23, 11), tc: "blue" });
  DS.vignette(S); }

// and when you burn protein, that nitrogen comes off as ammonia, which is toxic.
{ const S = sc(23, 12, { cam: "push", focus: "960 540" }); DS.room(S, { wall: "sand", floor: "wood", window: false });
  S.flame(520, 740, 1.2, S.start, 0); egg(S, 520, 430, 1.8, {});
  arrowR(S, 700, 520, 920, 520, W(23, 16), {});
  ammonia(S, 1250, 500, 2.0, { t: W(23, 19) });
  warnTri(S, 1620, 330, 1.2, W(23, 24));
  card(S, "AMMONIA", 1250, 800, { t: W(23, 22) });
  card(S, "TOXIC", 1620, 600, { t: W(23, 24), tc: "red" });
  DS.vignette(S); }

// So your liver runs a little factory that turns ammonia into urea,
{ const S = sc(24, 0, { cam: "push", focus: "960 540" }); DS.room(S, { wall: "earth", floor: "wood", window: false });
  const fx = 960;
  DS.shape(S, rect(fx + 90, 280, 70, 190), "gray", { w: "mid", tone: 1 }); DS.shape(S, rect(fx - 230, 440, 460, 340), "sand", { w: "mid", tone: 1 }); DS.shape(S, `M${fx - 250} 440 L${fx - 120} 360 V440 M${fx - 120} 440 L${fx + 10} 360 V440 M${fx + 10} 440 L${fx + 140} 360 V440 L${fx + 250} 440 Z`, "red", { w: "mid", tone: 2 });
  DS.shape(S, circ(fx, 600, 100), "white", { w: "mid", flat: true }); liver(S, fx, 612, 0.7); blobFace(S, fx + 4, 600, 0.6, "smile");
  DS.shape(S, rect(fx - 80, 700, 160, 80), "navy", { w: "mid", tone: 1, flat: true });
  DS.shape(S, rect(100, 790, 750, 40), "gray", { w: "mid", tone: 2 }); DS.shape(S, rect(1070, 790, 750, 40), "gray", { w: "mid", tone: 2 });
  [0, 1].forEach((i) => { const a = S.grp(); ammonia(S, 220, 700, 0.8, { parent: a }); tl.fromTo(a, { attr: { transform: `translate(${i * -240} 0)` }, opacity: 0 }, { attr: { transform: `translate(${560 + i * -240} 0)` }, opacity: 1, duration: 2.6, ease: "none", immediateRender: true }, W(24, 5) + i * 0.8); tl.to(a, { opacity: 0, duration: 0.3 }, W(24, 5) + i * 0.8 + 2.3); });
  [0, 1].forEach((i) => { const a = S.grp(); jar(S, 1110, 790, 0.5, undefined, { parent: a }); tl.fromTo(a, { attr: { transform: `translate(${i * -240} 0)` }, opacity: 0 }, { attr: { transform: `translate(${560 + i * -240} 0)` }, opacity: 1, duration: 2.6, ease: "none", immediateRender: true }, W(24, 10) + i * 0.8); });
  card(S, "THE LIVER'S FACTORY", 960, 170, { t: W(24, 5), size: DS.type.small });
  card(S, "AMMONIA", 380, 600, { t: W(24, 9), size: DS.type.caption }); card(S, "UREA", 1500, 600, { t: W(24, 11), size: DS.type.caption, tc: "blue" });
  DS.vignette(S); }

// and your kidneys flush the urea out in your urine.
{ const S = sc(24, 12, { cam: "push", focus: "960 540" }); DS.room(S, { wall: "earth", floor: "wood", window: false });
  kidney(S, 820, 400, 1.6); const kg = S.grp(); kidney(S, 0, 0, 1.6, { parent: kg }); kg.setAttribute("transform", "translate(1100 400) scale(-1 1)");
  [[760, 530], [900, 540], [1060, 530], [1190, 540]].forEach(([x, y], i) => { S.draw(line([x, y], [x, y + 70], 0), S.start, 0, { c: DS.c("sky", 2), w: DS.w.mid }); });
  [0, 1, 2, 3].forEach((i) => { const x = 830 + i * 100, y0 = 560; [0, 1, 2].forEach((j) => dropWater(S, x, y0 + j * 90, 0.7, W(24, 15) + i * 0.15 + j * 0.3)); });
  jar(S, 960, 920, 0.9, "UREA", { t: W(24, 17) });
  card(S, "KIDNEYS", 960, 170, { t: W(24, 13) });
  card(S, "FLUSHED OUT", 1480, 640, { t: W(24, 19), size: DS.type.caption });
  DS.vignette(S); }

// By one kidney specialist's sums, Dave's three hundred grams end up as roughly ninety grams of urea.
{ const S = sc(25, 0, { cam: "push", focus: "960 540" }); DS.room(S, { wall: "glass", floor: "wood", window: false });
  eggStack(S, 420, 800, 0.55, 4); txt(S, "300 g", 420, 330, { size: DS.type.title, c: DS.c("red", 2), t: W(25, 5) });
  arrowR(S, 640, 560, 950, 560, W(25, 9), {});
  jar(S, 1170, 820, 1.5, "UREA", { t: W(25, 12) }); txt(S, "about 90 g", 1170, 380, { size: DS.type.title, c: DS.c("blue", 2), t: W(25, 12) });
  const F = who(S, 1620, 960, "near", Object.assign({}, LABF, { s: 1.2, mood: "flat", look: -6, pose: "point" }));
  card(S, "SPECIALIST", 1620, 430, { t: W(25, 2), size: DS.type.caption });
  DS.vignette(S); }

// Dave wanted to build muscle. So far, he's mostly building urea.
{ const S = sc(26, 0, { cam: "push", focus: "960 540" }); DS.room(S, KIT);
  const F = dave(S, 520, 960, "near", { s: 1.4, look: 6, mood: "sad", pose: "hold" });
  const g = S.grp(); S.thought(520, 250, 250, 130, 520, 370, S.start, 0.3, { parent: g }); bicep(S, 520, 250, 0.55, { parent: g, bulge: 1.3 }); fadeG(S, g, W(26, 3));
  for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) { const x = 1000 + c * 140 + (r % 2) * 60 - 60, y = 840 - r * 64, bg = S.grp(); DS.shape(S, rect(x, y - 56, 132, 58), "red", { parent: bg, w: "detail", tone: 0, flat: true }); fadeG(S, bg, W(26, 8) + r * 0.45, 0.4); }
  txt(S, "UREA", 1210, 530, { size: DS.type.title, c: DS.c("red", 2), t: W(26, 10) });
  card(S, "MOSTLY UREA", 1300, 200, { t: W(26, 9), tc: "red" });
  DS.vignette(S); }

// And urea needs water to carry it out.
{ const S = sc(27, 0, { cam: "push", focus: "960 540" }); DS.room(S, { wall: "earth", floor: "wood", window: false });
  kidney(S, 520, 460, 1.8); S.draw(`M660 470 C 840 470 900 470 1500 470`, S.start, 0, { c: DS.c("gray", 1), w: DS.w.near * 3 }); S.draw(`M660 470 C 840 470 900 470 1500 470`, S.start, 0, { c: DS.c("gray", 2), w: DS.w.near * 3 + 12, op: 0.35 });
  [0, 1, 2, 3].forEach((i) => { const g = S.grp(); dropWater(S, 800, 468, 2.0, undefined, g); DS.shape(S, rect(790, 462, 20, 20), "white", { parent: g, w: "hair", flat: true }); tl.fromTo(g, { attr: { transform: `translate(${-150} 0)` }, opacity: 0 }, { attr: { transform: `translate(${i * 190 + 80} 0)` }, opacity: 1, duration: 1.4, ease: "power1.out", immediateRender: true }, W(27, 2) + i * 0.5); });
  card(S, "WATER CARRIES IT", 960, 190, { t: W(27, 2) });
  DS.vignette(S); }

// For Dave, that mostly means a very busy bathroom door.
{ const S = sc(27, 8, { cam: "push", focus: "1200 520" }); DS.room(S, KIT);
  const D = bathDoor(S, 1180, 130, 380, 640);
  tallyMarks(S, 1230, 230, 17, W(27, 11), END(27) - 0.6, { c: DS.P.white[0], h: 80, sp: 22 });
  const F = dave(S, 560, 960, "near", { s: 1.4, look: 8, mood: "worried", pose: "cross" });
  card(S, "A BUSY DOOR", 560, 170, { t: W(27, 13) });
  DS.vignette(S); }

// His kidneys speed up too, filtering faster after big protein meals. We'll come back to whether that matters.
{ const S = sc(28, 0, { cam: "push", focus: "960 540" }); DS.room(S, { wall: "earth", floor: "wood", window: false });
  kidney(S, 560, 440, 1.6); const kg = S.grp(); kidney(S, 0, 0, 1.6, { parent: kg }); kg.setAttribute("transform", "translate(840 440) scale(-1 1)");
  [0, 1, 2].forEach((i) => { const a = S.grp(); S.draw(arc(700, 440, 270 + i * 34, 200, 340), S.start, 0, { c: DS.c("orange"), w: DS.w.mid, parent: a }); fadeG(S, a, W(28, 2) + i * 0.25); });
  card(S, "FILTERING FASTER", 700, 170, { t: W(28, 5) });
  const nt = S.grp(); DS.drop(S, rrect(1160, 270, 420, 360, DS.r.xs), { parent: nt }); DS.shape(S, rrect(1150, 260, 420, 360, DS.r.xs), "yellow", { parent: nt, w: "mid", flat: true, tone: 1 });
  txt(S, "COME BACK", 1360, 420, { size: DS.type.small, c: DS.c("ink"), parent: nt }); txt(S, "TO THIS", 1360, 490, { size: DS.type.small, c: DS.c("ink"), parent: nt }); txt(S, "(LATER)", 1360, 570, { size: DS.type.caption, c: DS.c("red", 2), parent: nt });
  nt.setAttribute("transform", "rotate(4 1360 440)"); fadeG(S, nt, W(28, 11));
  DS.vignette(S); }

// ===================== 4. The liver's speed limit =====================
const hospBed = (S, x0, fy, wd, o = {}) => {
  const g = S.grp(o.parent); DS.shadow(S, x0 + wd / 2, fy, wd + 40, { parent: g, op: 0.18 });
  [x0 + 20, x0 + wd - 40].forEach((x) => DS.shape(S, rect(x, fy - 150, 20, 150), "gray", { parent: g, w: "detail", tone: 2, flat: true }));
  DS.shape(S, rect(x0 - 10, fy - 300, 24, 220), "gray", { parent: g, w: "mid", tone: 1 });
  DS.shape(S, rect(x0, fy - 160, wd, 22), "gray", { parent: g, w: "mid" });
  DS.shape(S, rrect(x0 + 10, fy - 204, wd - 20, 50, DS.r.sm), "white", { parent: g, w: "mid" });
  DS.shape(S, rrect(x0 + 22, fy - 246, 130, 46, DS.r.sm), "paper", { parent: g, w: "detail" });
  DS.shape(S, rrect(x0 + 170, fy - 222, wd - 180, 66, DS.r.sm), "sky", { parent: g, w: "mid" });
  return g;
};
// Four in the afternoon. Three scoops of protein powder, twenty-five grams each.
{ const S = sc(29, 0, { cam: "push", focus: "960 520" }); DS.room(S, KIT); counter(S, 380, 1700);
  wallClock(S, 640, 300, 90, 4, 0, { label: "4 PM", t: W(29, 0) });
  const F = dave(S, 400, 960, "near", { s: 1.3, look: 6, mood: "flat" });
  tub(S, 980, 596, 1.1, { t: W(29, 7) });
  [0, 1, 2].forEach((i) => { const g = S.grp(); scoop(S, 1290 + i * 150, 560, 1.0, { parent: g }); txt(S, "25 g", 1290 + i * 150 + 20, 470, { size: DS.type.small, c: DS.c("red", 2), parent: g, t: T0(S) }); fadeG(S, g, W(29, 5) + i * 0.35); });
  card(S, "PROTEIN POWDER", 980, 170, { t: W(29, 7), size: DS.type.small });
  DS.vignette(S); }

{ const S = sc(29, 12, { cam: "none", focus: "1340 430" }); DS.room(S, KIT);
  fridge(S, 1090, 130, 500, 630);
  scoreb(S, 1340, 430, 0.82, { from: 150, val: 225, ct: W(29, 14), dur: 1.3, t: S.start });
  const F = dave(S, 700, 960, "near", { s: 1.4, look: 8, mood: "worried", pose: "point" });
  S.zoom(1340, 430, 1.55, W(29, 14), 1.4);
  DS.vignette(S); }

// But Dave's liver can only make urea so fast.
{ const S = sc(30, 0, { cam: "push", focus: "960 540" }); DS.room(S, { wall: "earth", floor: "wood", window: false });
  [0, 1, 2, 3, 4].forEach((i) => { const g = S.grp(); ammonia(S, 200 + (i % 3) * 130, 640 - Math.floor(i / 3) * 140, 0.6, { parent: g }); fadeG(S, g, W(30, 3) + i * 0.3); });
  liver(S, 760, 520, 1.5); blobFace(S, 780, 520, 1.3, "worried"); sweatAt(S, 930, 430, W(30, 6), 1.5);
  DS.shape(S, rect(1000, 640, 800, 40), "gray", { w: "mid", tone: 2 }); const j = S.grp(); jar(S, 1110, 640, 0.55, undefined, { parent: j });
  tl.fromTo(j, { attr: { transform: "translate(0 0)" }, opacity: 0 }, { attr: { transform: "translate(380 0)" }, opacity: 1, duration: 3.4, ease: "none", immediateRender: true }, W(30, 5));
  card(S, "ONLY SO FAST", 960, 170, { t: W(30, 4), tc: "red" });
  DS.vignette(S); }

// In two thousand six, two Australian researchers worked out the ceiling.
{ const S = sc(30, 9, { cam: "push", focus: "960 540" }); DS.room(S, { wall: "glass", floor: "wood", window: false });
  const bx = 960, by = 450; paperR(S, bx - 300, by - 210, 600, 420, { name: "white" });
  S.draw(`M${bx - 250} ${by + 160} V${by - 170} M${bx - 250} ${by + 160} H${bx + 250}`, S.start, 0, { c: DS.c("ink"), w: DS.w.mid });
  const cg = S.grp(); S.draw(smooth([[bx - 250, by + 150], [bx - 120, by + 40], [bx, by - 60], [bx + 120, by - 100], [bx + 250, by - 104]]), S.start, 0, { c: DS.c("blue"), w: DS.w.near, parent: cg }); fadeG(S, cg, W(30, 14), 0.8);
  const cl = S.grp(); S.draw(`M${bx - 250} ${by - 104} H${bx + 250}`, S.start, 0, { c: DS.c("red"), w: DS.w.near, parent: cl }); txt(S, "CEILING", bx, by - 126, { size: DS.type.caption, c: DS.c("red", 2), parent: cl }); fadeG(S, cl, W(30, 18));
  who(S, 420, 960, "near", Object.assign({}, LABF, { s: 1.3, mood: "flat", look: 7, pose: "point" })); who(S, 1500, 960, "near", Object.assign({}, LABG, { s: 1.3, mood: "flat", look: -7, pose: "pointL" }));
  card(S, "2006", 960, 170, { t: W(30, 11) });
  card(S, "TWO AUSTRALIAN RESEARCHERS", 960, 790, { t: W(30, 13), size: DS.type.caption });
  DS.vignette(S); }

// For an eighty kilo person, they called about two hundred and eighty-five grams a day the absolute maximum.
{ const S = sc(31, 0, { cam: "push", focus: "960 540" }); DS.room(S, FLOOR);
  const sY = 936; bathScale(S, 460, sY + 22, 1.05, "80 kg", { ts: W(31, 2) });
  dave(S, 460, sY, "near", { s: 1.3, look: 6, mood: "flat" });
  const T = track(S, 840, 560, 800, 100, 350, 285); txt(S, "0", 840, 700, { size: DS.type.caption, c: DS.c("ink") });
  pointer(S, T.at(285), 556, "ink", W(31, 8)); txt(S, "285 g", T.at(285) - 10, 420, { size: DS.type.title, c: DS.c("red", 2), t: W(31, 8) });
  card(S, "THE ABSOLUTE MAXIMUM", 1240, 250, { t: W(31, 15), size: DS.type.small });
  card(S, "80 KG PERSON", 460, 170, { t: W(31, 2) });
  DS.vignette(S); }

// Roughly a kilo of lean meat.
{ const S = sc(31, 18, { cam: "push", focus: "960 540" }); DS.room(S, KIT); counter(S, 560, 1360);
  kScale(S, 960, 596, 1.7, "1 kg"); chicken(S, 960, 420, 1.2);
  card(S, "ROUGHLY A KILO OF LEAN MEAT", 960, 170, { t: W(31, 19), size: DS.type.small });
  DS.vignette(S); }

// Dave weighs eighty kilos. Dave is aiming for three hundred.
{ const S = sc(32, 0, { cam: "push", focus: "960 540" }); DS.room(S, FLOOR);
  dave(S, 360, 960, "near", { s: 1.4, look: 8, mood: "determined" });
  const T = track(S, 640, 560, 1120, 100, 350, 285);
  pointer(S, T.at(285), 556, "ink", W(32, 4)); txt(S, "285 g", T.at(285) - 40, 440, { size: DS.type.title, c: DS.c("ink"), t: W(32, 4) });
  const dg = S.grp(); DS.shape(S, `M${T.at(300)} 672 L${T.at(300) - 22} 712 L${T.at(300) + 22} 712 Z`, "red", { parent: dg, w: "detail", flat: true }); txt(S, "DAVE: 300 g", T.at(300) - 20, 790, { size: DS.type.title, c: DS.c("red", 2), parent: dg }); fadeG(S, dg, W(32, 8));
  DS.vignette(S); }

// "Fifteen grams over the limit? That's hardly anything." (Dave)
{ const S = sc(33, 0, { cam: "push", focus: "900 520" }); DS.room(S, FLOOR);
  const F = dave(S, 560, 960, "near", { s: 1.5, look: 4, mood: "smile", pose: "shrug" }); talk(S, F, W(33, 0), END(33));
  say(S, 1000, 260, 330, 130, 640, 420, ["15 g OVER?", "HARDLY ANYTHING"], W(33, 0), { size: DS.type.caption });
  const base = 880; bar(S, 1300, base, 220, 380, "green", S.start + 0.1); bar(S, 1300, base - 380, 220, 22, "red", W(33, 0) + 0.3);
  txt(S, "285", 1410, base - 130, { size: DS.type.title, c: DS.P.white[0] }); txt(S, "+15 g", 1410, base - 470, { size: DS.type.small, c: DS.c("red", 2), t: W(33, 0) + 0.3 });
  DS.vignette(S); }

// So what happens near the limit? In nineteen twenty-eight, the Arctic explorer Stefansson checked into a New York hospital
{ const S = sc(34, 0, { cam: "push", focus: "1000 540" }); DS.outdoor(S, { hy: 640, sun: [300, 200] });
  hall(S, 1150, 850, 640, 500, { cols: 6 }); DS.shape(S, rrect(930, 520, 440, 66, DS.r.sm), "white", { w: "mid", flat: true }); txt(S, "HOSPITAL", 1150, 568, { size: DS.type.small, c: DS.c("ink") });
  const F = explorer(S, 360, 930, "near", { s: 1.5, look: 8, mood: "flat" }); shift(F.all, W(34, 13), 3.0, [0, 0], [360, 0], "none");
  card(S, "WHAT HAPPENS NEAR THE LIMIT?", 960, 130, { t: W(34, 1), size: DS.type.caption });
  card(S, "NEW YORK, 1928", 1150, 270, { t: W(34, 7), size: DS.type.caption });
  card(S, "STEFANSSON", 400, 260, { t: W(34, 12), size: DS.type.caption });
  DS.vignette(S); }

// to start living on nothing but meat.
{ const S = sc(34, 19, { cam: "push", focus: "900 560" }); DS.room(S, { wall: "glass", floor: "wood", window: false });
  hospBed(S, 300, 820, 620);
  const F = explorer(S, 1130, 960, "near", { s: 1.4, look: -6, mood: "smile", pose: "hold" });
  DS.shape(S, rect(1360, 640, 330, 36), "wood", { w: "mid", tone: 1 }); DS.shape(S, rect(1380, 676, 24, 190), "wood", { w: "detail", tone: 2, flat: true }); DS.shape(S, rect(1650, 676, 24, 190), "wood", { w: "detail", tone: 2, flat: true });
  chicken(S, 1520, 624, 0.8, {});
  card(S, "ONLY MEAT", 1520, 330, { t: W(34, 23), tc: "red" });
  DS.vignette(S); }

// At his doctors' request, he started with lean meat only, about two hundred and sixty grams of protein a day.
{ const S = sc(35, 0, { cam: "push", focus: "960 540" }); DS.room(S, { wall: "glass", floor: "wood", window: false });
  const D = who(S, 520, 960, "near", Object.assign({}, DOC, { s: 1.35, mood: "flat", look: 7, pose: "point" })); explorer(S, 1560, 960, "near", { s: 1.35, look: -7, mood: "flat" });
  chicken(S, 1040, 760, 1.2, {}); DS.shape(S, rect(840, 760, 400, 24), "wood", { w: "mid", tone: 1 });
  card(S, "THE DOCTORS' REQUEST", 520, 170, { t: W(35, 2), size: DS.type.caption });
  card(S, "LEAN MEAT ONLY", 1040, 520, { t: W(35, 6) });
  card(S, "260 g PROTEIN A DAY", 1040, 340, { t: W(35, 10), tc: "red" });
  DS.vignette(S); }

// Within three days, he had nausea and diarrhoea.
{ const S = sc(35, 20, { cam: "push", focus: "960 540" }); DS.room(S, { wall: "glass", floor: "wood", window: false });
  const F = explorer(S, 600, 960, "near", { s: 1.5, look: 6, mood: "worried", pose: "head" }); sweatAt(S, F.hd[0] + F.r * 1.4, F.hd[1], W(35, 22), 1.8);
  [0, 1, 2].forEach((i) => { const g = S.grp(); S.draw(smooth([[F.hd[0] - 150 + i * 30, F.hd[1] - 40], [F.hd[0] - 170 + i * 30, F.hd[1] - 10], [F.hd[0] - 150 + i * 30, F.hd[1] + 20]]), S.start, 0, { c: DS.c("green", 2), w: DS.w.mid, parent: g }); fadeG(S, g, W(35, 25) + i * 0.3); });
  const C = calPage(S, 1000, 420, 480, 260, "DAY 3", { cols: 3, rows: 1, t: W(35, 21) }); tick(S, C.cells[0][0], C.cells[0][1], 0.9, W(35, 21) + 0.3); tick(S, C.cells[1][0], C.cells[1][1], 0.9, W(35, 21) + 0.8); xMark(S, C.cells[2][0], C.cells[2][1], 0.9, W(35, 22) + 0.4);
  bathDoor(S, 1400, 250, 260, 460); tallyMarks(S, 1440, 330, 5, W(35, 26), END(35) - 0.5, { c: DS.P.white[0], h: 70, sp: 20 });
  card(S, "NAUSEA", 600, 170, { t: W(35, 24), tc: "green" });
  DS.vignette(S); }

// Then they added fat. He recovered in two days, and went on eating only meat for a year, with no obvious harm.
{ const S = sc(36, 0, { cam: "push", focus: "960 540" }); DS.room(S, { wall: "glass", floor: "wood", window: false });
  const F = explorer(S, 900, 960, "near", { s: 1.4, look: -4, mood: "happy" });
  DS.shape(S, rect(260, 700, 330, 30), "wood", { w: "mid", tone: 1 }); DS.shape(S, rect(280, 730, 24, 160), "wood", { w: "detail", tone: 2, flat: true }); DS.shape(S, rect(546, 730, 24, 160), "wood", { w: "detail", tone: 2, flat: true });
  chicken(S, 425, 690, 0.8, {}); const bg = S.grp(); butter(S, 425, 560, 0.7, { parent: bg }); fadeG(S, bg, W(36, 2)); tl.fromTo(bg, { attr: { transform: "translate(0 -140)" } }, { attr: { transform: "translate(0 0)" }, duration: 0.7, ease: "power2.in", immediateRender: true }, W(36, 2));
  const C = calPage(S, 1440, 440, 500, 400, "1 YEAR", { cols: 4, rows: 3, t: W(36, 14) }); C.cells.forEach(([x, y], i) => tick(S, x, y, 0.8, W(36, 15) + i * 0.22));
  card(S, "+ FAT", 425, 330, { t: W(36, 2), tc: "green" });
  card(S, "BETTER IN 2 DAYS", 900, 190, { t: W(36, 5), size: DS.type.caption });
  DS.vignette(S); }

// His doctors thought the high protein may have been part of the problem. And Stefansson had seen this before.
{ const S = sc(37, 0, { cam: "push", focus: "960 540" }); DS.room(S, { wall: "glass", floor: "wood", window: false });
  who(S, 440, 960, "near", Object.assign({}, DOC, { s: 1.35, mood: "worried", look: 5 })); say(S, 500, 270, 300, 150, 460, 440, ["TOO MUCH", "PROTEIN?"], W(37, 4), { think: true, size: DS.type.small });
  explorer(S, 1420, 960, "near", { s: 1.35, look: -5, mood: "flat" });
  const g = S.grp(); S.thought(1400, 250, 290, 150, 1420, 430, S.start, 0.3, { parent: g }); rabbit(S, 1400, 320, 0.9, { parent: g, t: undefined }); fadeG(S, g, W(37, 14));
  card(S, "SEEN THIS BEFORE", 1000, 170, { t: W(37, 15), size: DS.type.caption });
  DS.vignette(S); }

// ===================== 5. Rabbit starvation =====================
// Up north, it was called rabbit starvation. Rabbits are very lean.
{ const S = sc(38, 0, { cam: "push", focus: "960 600" }); DS.outdoor(S, SNOW); snowDeco(S);
  rabbit(S, 960, 900, 2.4, {});
  card(S, "RABBIT STARVATION", 960, 150, { t: W(38, 4), tc: "red" });
  card(S, "VERY LEAN", 1500, 520, { t: W(38, 9), size: DS.type.caption });
  DS.vignette(S); }

// Live on nothing but rabbit, Stefansson wrote, and you eat bigger and bigger meals, but you feel hungry at the end of each one.
{ const S = sc(38, 11, { cam: "push", focus: "960 540" }); DS.room(S, { wall: "earth", floor: "wood", window: false });
  DS.shape(S, rect(700, 700, 1000, 36), "wood", { w: "mid", tone: 1 }); [740, 1630].forEach((x) => DS.shape(S, rect(x, 736, 26, 200), "wood", { w: "detail", tone: 2, flat: true }));
  [[860, 0.55, 21], [1110, 0.8, 22], [1430, 1.15, 23]].forEach(([x, k, w]) => { const g = S.grp(); chicken(S, x, 692, k, { parent: g }); fadeG(S, g, W(38, w)); });
  const F = explorer(S, 440, 960, "near", { s: 1.35, look: 8, mood: "flat" }); F.face(W(39, 2), "sad", 8);
  const hg = S.grp(); stomach(S, 460, 330, 0.9, { parent: hg, fill: 0.12 }); [0, 1].forEach((i) => S.draw(arc(460, 330, 130 + i * 28, 300, 340), S.start, 0, { c: DS.c("orange"), w: DS.w.mid, parent: hg })); fadeG(S, hg, W(39, 3));
  card(S, "BIGGER AND BIGGER", 1100, 220, { t: W(38, 21), size: DS.type.caption });
  card(S, "STILL HUNGRY", 460, 840, { t: W(39, 4), tc: "red", size: DS.type.caption });
  DS.vignette(S); }

// Within about a week, you're eating three or four times as much.
{ const S = sc(39, 10, { cam: "push", focus: "960 540" }); DS.room(S, { wall: "earth", floor: "wood", window: false });
  calPage(S, 520, 430, 560, 300, "ABOUT A WEEK", { cols: 7, rows: 1, t: W(39, 11), size: DS.type.caption });
  [0, 1, 2, 3].forEach((i) => { const g = S.grp(); chicken(S, 1350, 840 - i * 96, 0.7, { parent: g }); fadeG(S, g, W(39, 15) + i * 0.35); });
  txt(S, "3-4 TIMES", 1350, 250, { size: DS.type.title, c: DS.c("red", 2), t: W(39, 16) });
  txt(S, "AS MUCH", 1350, 330, { size: DS.type.small, c: DS.c("ink"), t: W(39, 19) });
  DS.vignette(S); }

// Then comes diarrhoea, and without fat, he wrote, death after several weeks.
{ const S = sc(40, 0, { cam: "push", focus: "960 540" }); DS.room(S, { wall: "earth", floor: "wood", window: false });
  bathDoor(S, 300, 190, 280, 520); tallyMarks(S, 336, 270, 10, W(40, 1), W(40, 3), { c: DS.P.white[0], h: 70, sp: 20 });
  card(S, "WITHOUT FAT", 960, 170, { t: W(40, 4), tc: "red" });
  paperCard(S, 960, 520, 320, 380, { t: W(40, 6), n: 6 });
  const C = calPage(S, 1470, 480, 560, 300, "SEVERAL WEEKS", { cols: 4, rows: 1, t: W(40, 9), size: DS.type.caption });
  DS.vignette(S); }

// But wait. Protein is the most filling nutrient there is. How can it leave you starving?
{ const S = sc(41, 0, { cam: "push", focus: "960 540" }); DS.room(S, { wall: "earth", floor: "wood", window: false });
  egg(S, 520, 600, 4.2, {}); const cg = S.grp(); DS.shape(S, `M400 440 L430 340 L480 410 L520 320 L560 410 L610 340 L640 440 Z`, "gold", { parent: cg, w: "mid" }); fadeG(S, cg, W(41, 2));
  card(S, "THE MOST FILLING", 520, 170, { t: W(41, 4), size: DS.type.small });
  const F = explorer(S, 1330, 960, "near", { s: 1.4, look: -6, mood: "worried", pose: "head" });
  txt(S, "?", 1330, 360, { size: DS.type.display, c: DS.c("red", 2), t: W(41, 10) });
  card(S, "BUT STARVING?", 1330, 190, { t: W(41, 13), tc: "red" });
  DS.vignette(S); }

// Because the body can only turn so much protein into fuel,
{ const S = sc(42, 0, { cam: "push", focus: "960 540" }); DS.room(S, { wall: "earth", floor: "wood", window: false });
  [0, 1, 2, 3, 4].forEach((i) => { const g = S.grp(); egg(S, 500 + (i % 3) * 70 - (Math.floor(i / 3) * 35), 260 - Math.floor(i / 3) * 56, 1.1, { parent: g }); fadeG(S, g, W(42, 3) + i * 0.2); });
  DS.shape(S, `M300 340 L700 340 L535 500 L465 500 Z`, "gray", { w: "mid", tone: 1 }); DS.shape(S, rect(465, 500, 70, 90), "gray", { w: "mid", tone: 2 });
  DS.shape(S, rrect(360, 590, 280, 250, DS.r.md), "gray", { w: "near", tone: 2 }); DS.shape(S, rect(430, 700, 140, 80), "ink", { w: "mid", tone: 1, flat: true });
  const fg = S.grp(); S.flame(500, 770, 0.55, S.start, 0, { parent: fg }); fadeG(S, fg, W(42, 8));
  card(S, "ONLY SO MUCH FITS", 1250, 330, { t: W(42, 4), size: DS.type.small });
  card(S, "INTO FUEL", 1250, 450, { t: W(42, 9), tc: "red" });
  DS.vignette(S); }

// and a rabbit has almost nothing else to offer.
{ const S = sc(42, 11, { cam: "push", focus: "960 600" }); DS.outdoor(S, SNOW); snowDeco(S);
  rabbit(S, 700, 900, 2.2, {});
  card(S, "ALMOST NOTHING ELSE", 1300, 250, { t: W(42, 15), size: DS.type.small });
  const fb = S.grp(); DS.shape(S, rrect(1100, 420, 440, 70, DS.r.sm), "gray", { parent: fb, w: "mid", flat: true, tone: 1 }); txt(S, "FAT: 0 g", 1320, 560, { size: DS.type.small, c: DS.c("red", 2), parent: fb }); fadeG(S, fb, W(42, 16));
  DS.vignette(S); }

// Your stomach is stuffed. Your engine is empty.
{ const S = sc(42, 20, { cam: "push", focus: "960 540" }); DS.room(S, { wall: "earth", floor: "wood", window: false });
  stomach(S, 560, 470, 2.0, { fill: 0.9 }); fuelGauge(S, 1300, 600, 250, 0.03);
  card(S, "STUFFED", 560, 800, { t: W(42, 22) }); card(S, "EMPTY", 1300, 800, { t: W(42, 25), tc: "red" });
  DS.vignette(S); }

// "Lean meat fills your belly and starves you anyway, lad. Find the fat." (Old trapper)
{ const S = sc(43, 0, { cam: "push", focus: "900 560" }); DS.outdoor(S, SNOW); snowDeco(S);
  const F = trapper(S, 620, 930, "near", { s: 1.6, look: 5, mood: "flat", pose: "point" }); talk(S, F, W(43, 0), END(43));
  say(S, 1280, 280, 400, 190, 760, 440, ["Lean meat fills your", "belly and starves you", "anyway, lad."], W(43, 0), { size: DS.type.caption });
  butter(S, 1500, 760, 1.2, { t: W(43, 11) });
  card(S, "FIND THE FAT", 1500, 600, { t: W(43, 10), tc: "red" });
  DS.vignette(S); }

// Dave checks his scoreboard. It has one column. Protein.
{ const S = sc(44, 0, { cam: "none", focus: "1340 430" }); DS.room(S, KIT);
  fridge(S, 1090, 130, 500, 630);
  const B = scoreb(S, 1340, 430, 0.82, { val: 225, t: S.start });
  const F = dave(S, 700, 960, "near", { s: 1.4, look: 8, mood: "worried", pose: "think" });
  ringAt(S, B.x0 + B.colW / 2, B.y0 + B.ht * 0.155, 130, 36, W(44, 7));
  S.zoom(1340, 430, 1.7, W(44, 3), 1.4);
  DS.vignette(S); }

// ===================== 6. The twenty-five gram rule =====================
const cup = (S, cx, base, k, o = {}) => {
  const g = S.grp(o.parent); DS.shadow(S, cx, base, 160 * k, { parent: g });
  DS.shape(S, `M${cx - 60 * k} ${base - 170 * k} L${cx + 60 * k} ${base - 170 * k} L${cx + 44 * k} ${base} L${cx - 44 * k} ${base} Z`, "glass", { parent: g, w: "mid", flat: true, tone: 1 });
  DS.shape(S, `M${cx - 54 * k} ${base - 130 * k} L${cx + 54 * k} ${base - 130 * k} L${cx + 43 * k} ${base - 5} L${cx - 43 * k} ${base - 5} Z`, o.fill || "paper", { parent: g, w: "hair", flat: true, tone: o.tone || 0 });
  DS.shape(S, rrect(cx - 66 * k, base - 190 * k, 132 * k, 26 * k, DS.r.xs), "white", { parent: g, w: "detail", flat: true });
  S.draw(line([cx + 12 * k, base - 190 * k], [cx + 38 * k, base - 252 * k], 0), S.start, 0, { c: DS.c("red"), w: DS.w.mid, parent: g });
  return g;
};
const trophy = (S, cx, base, k, o = {}) => {
  const g = S.grp(o.parent), t = o.t;
  [-1, 1].forEach((sd) => S.draw(`M${cx + sd * 66 * k} ${base - 190 * k} Q${cx + sd * 120 * k} ${base - 190 * k} ${cx + sd * 92 * k} ${base - 130 * k} Q${cx + sd * 76 * k} ${base - 110 * k} ${cx + sd * 50 * k} ${base - 112 * k}`, t ?? S.start, 0, { c: DS.c("gold", 2), w: DS.w.near * 1.4, parent: g }));
  DS.shape(S, `M${cx - 74 * k} ${base - 220 * k} L${cx + 74 * k} ${base - 220 * k} Q${cx + 70 * k} ${base - 100 * k} ${cx} ${base - 90 * k} Q${cx - 70 * k} ${base - 100 * k} ${cx - 74 * k} ${base - 220 * k} Z`, "gold", { parent: g, t, w: "mid" });
  DS.shape(S, rect(cx - 14 * k, base - 92 * k, 28 * k, 56 * k), "gold", { parent: g, t, w: "mid", tone: 2 });
  DS.shape(S, rrect(cx - 60 * k, base - 40 * k, 120 * k, 40 * k, DS.r.sm), "wood", { parent: g, t, w: "mid" });
  return g;
};
const GYM = { wall: "sand", floor: "gray", window: false };
const rackBells = (S, x, y, k = 1) => { DS.shape(S, rect(x - 10, y, 20 + 4 * 130 * k, 18), "wood", { w: "mid", tone: 2 }); [0, 1, 2, 3].forEach((i) => dumbbell(S, x + 70 * k + i * 130 * k, y - 50 * k, 0.5 * k, { len: 180 })); [x, x + 4 * 130 * k].forEach((xx) => DS.shape(S, rect(xx - 8, y, 16, 190), "wood", { w: "detail", tone: 2, flat: true })); };

// Ten at night. One last quarter-kilo of chicken.
{ const S = sc(45, 0, { cam: "push", focus: "960 520" }); DS.room(S, NITE); counter(S, 380, 1560);
  wallClock(S, 640, 300, 90, 10, 0, { label: "10 PM", t: W(45, 0), lc: DS.P.white[0] });
  const F = dave(S, 420, 960, "near", { s: 1.3, look: 6, mood: "tired" });
  kScale(S, 1160, 596, 1.2, "250 g"); chicken(S, 1160, 484, 0.95);
  card(S, "ONE LAST ONE", 1160, 270, { t: W(45, 3), size: DS.type.caption });
  DS.vignette(S); }

// The scoreboard says three hundred. Dave has done it.
{ const S = sc(45, 8, { cam: "none", focus: "1340 430" }); DS.room(S, NITE);
  fridge(S, 1090, 130, 500, 630);
  scoreb(S, 1340, 430, 0.82, { from: 225, val: 300, ct: W(45, 10), dur: 1.3, t: S.start });
  const F = dave(S, 700, 960, "near", { s: 1.4, look: 8, mood: "happy", pose: "armsUp" });
  S.zoom(1340, 430, 1.55, W(45, 10), 1.4);
  DS.vignette(S); }

// "I'm hot, I'm full, and I live in the bathroom now." (Dave)
{ const S = sc(46, 0, { cam: "push", focus: "960 520" }); DS.room(S, KIT);
  const F = dave(S, 760, 960, "near", { s: 1.5, look: 0, mood: "tired", pose: "head" }); talk(S, F, W(46, 0), W(46, 10)); sweatAt(S, F.hd[0] + F.r * 1.0, F.hd[1] - F.r * 0.2, W(46, 1), 1.8);
  heat(S, F.cx - 50, F.hd[1] - F.r - 30, 4, W(46, 1));
  card(S, "HOT", 380, 220, { t: W(46, 1), tc: "red" }); card(S, "FULL", 380, 340, { t: W(46, 3) });
  bathDoor(S, 1300, 140, 300, 560); tallyMarks(S, 1340, 230, 15, W(46, 6), W(46, 10), { c: DS.P.white[0], h: 80, sp: 22 });
  DS.vignette(S); }

// "But at least my muscles got all of it." (Dave)
{ const S = sc(46, 11, { cam: "push", focus: "960 520" }); DS.room(S, KIT);
  const F = dave(S, 620, 960, "near", Object.assign({}, FLEX, { s: 1.5, look: 4, mood: "smile" })); talk(S, F, W(46, 11), END(46));
  const g = S.grp(); S.thought(1300, 400, 380, 250, 840, 600, S.start, 0.3, { parent: g }); bicep(S, 1300, 420, 1.5, { bulge: 1.3, parent: g }); [0, 1, 2].forEach((i) => egg(S, 1100 + i * 40, 250 - i * 6, 0.6, { parent: g })); fadeG(S, g, W(46, 15));
  card(S, "ALL OF IT?", 620, 170, { t: W(46, 17), tc: "red" });
  DS.vignette(S); }

// Not according to the gym. The old rule says one meal can only build muscle with about twenty to twenty-five grams of protein.
{ const S = sc(47, 0, { cam: "push", focus: "960 540" }); DS.room(S, GYM);
  who(S, 420, 960, "near", { s: 1.4, hair: "short", hairC: DS.c("ink"), outfitC: DS.c("green"), pose: "hips", mood: "flat", look: 6 });
  rackBells(S, 1220, 700, 1.0);
  const bg = S.grp(); DS.drop(S, rrect(640, 150, 560, 400, DS.r.md), { parent: bg }); DS.shape(S, rrect(630, 140, 560, 400, DS.r.md), "white", { parent: bg, w: "mid", flat: true });
  txt(S, "THE OLD RULE", 910, 240, { size: DS.type.small, c: DS.c("gray", 2), parent: bg }); txt(S, "1 MEAL", 910, 340, { size: DS.type.title, c: DS.c("ink"), parent: bg }); txt(S, "25 g MAX", 910, 440, { size: DS.type.title, c: DS.c("red", 2), parent: bg });
  fadeG(S, bg, W(47, 5));
  card(S, "NOT ACCORDING TO THE GYM", 960, 90, { t: W(47, 0), size: DS.type.caption });
  DS.vignette(S); }

// Anything more, it says, gets burned for energy or turned into urea.
{ const S = sc(48, 0, { cam: "push", focus: "960 540" }); DS.room(S, GYM);
  chicken(S, 420, 640, 1.0, {}); card(S, "ONE BIG MEAL", 420, 420, { t: W(48, 0), size: DS.type.caption });
  arrowR(S, 640, 560, 1000, 310, W(48, 0) + 0.2, {}); bicep(S, 1200, 290, 0.8, { t: W(48, 0) + 0.3 }); txt(S, "MUSCLE: 25 g", 1200, 450, { size: DS.type.small, c: DS.c("green", 2), t: W(48, 0) + 0.3 });
  arrowR(S, 640, 620, 1000, 620, W(48, 5), { c: "red", tone: 2 }); S.flame(1180, 700, 0.9, W(48, 5), 0); txt(S, "BURNED", 1180, 760, { size: DS.type.small, c: DS.c("red", 2), t: W(48, 5) });
  arrowR(S, 640, 680, 1000, 860, W(48, 9), {}); jar(S, 1200, 940, 0.7, undefined, { t: W(48, 9) }); txt(S, "UREA", 1400, 860, { size: DS.type.small, c: DS.c("blue", 2), t: W(48, 9) });
  DS.vignette(S); }

// In two thousand twenty-three, a team at Maastricht University tested it.
{ const S = sc(49, 0, { cam: "push", focus: "960 540" }); DS.outdoor(S, { hy: 640, sun: [1600, 200] });
  hall(S, 960, 850, 700, 520, { cols: 6, name: "earth" }); DS.shape(S, rrect(720, 520, 480, 66, DS.r.sm), "white", { w: "mid", flat: true }); txt(S, "UNIVERSITY", 960, 568, { size: DS.type.small, c: DS.c("ink") });
  who(S, 400, 960, "near", Object.assign({}, LABF, { s: 1.3, mood: "flat", look: 7 })); who(S, 1520, 960, "near", Object.assign({}, LABG, { s: 1.3, mood: "flat", look: -7 }));
  card(S, "MAASTRICHT, 2023", 960, 170, { t: W(49, 6) });
  DS.vignette(S); }

// Thirty-six young men did a hard workout, then drank a shake
{ const S = sc(50, 0, { cam: "push", focus: "960 540" }); DS.room(S, GYM);
  miniGrid(S, 395, 450, 9, 4, 130, 150, 1.4, { t0: W(50, 0) + 0.2, t1: W(50, 3), c: DS.c("ink") });
  dumbbell(S, 190, 700, 0.9, {}); dumbbell(S, 1730, 700, 0.9, {});
  card(S, "36 YOUNG MEN", 960, 170, { t: W(50, 0) }); card(S, "A HARD WORKOUT", 960, 265, { size: DS.type.caption });
  DS.vignette(S); }

// then drank a shake with no protein, twenty-five grams of milk protein, or a hundred.
{ const S = sc(50, 7, { cam: "push", focus: "960 540" }); DS.room(S, GYM);
  [[460, 1.2, "0 g", "NO PROTEIN", 12, "paper"], [960, 1.4, "25 g", "MILK PROTEIN", 14, "white"], [1460, 1.9, "100 g", "A HUNDRED", 20, "white"]].forEach(([x, k, v, n, w, fl]) => { const g = S.grp(); cup(S, x, 800, k, { parent: g, fill: fl }); txt(S, v, x, 800 - 270 * k - 30, { size: DS.type.title, c: DS.c(v === "100 g" ? "red" : "ink", v === "100 g" ? 2 : 0), parent: g }); txt(S, n, x, 870, { size: DS.type.caption, c: DS.c("ink"), parent: g }); fadeG(S, g, W(50, w)); });
  DS.vignette(S); }

// A hundred grams was the most the scientists thought anyone could eat in one meal.
{ const S = sc(51, 0, { cam: "push", focus: "960 540" }); DS.room(S, { wall: "glass", floor: "wood", window: false });
  who(S, 520, 960, "near", Object.assign({}, LABF, { s: 1.4, mood: "flat", look: 7 })); say(S, 560, 270, 330, 150, 520, 470, ["100 g IS THE", "MOST ANYONE CAN EAT"], W(51, 0), { think: true, size: DS.type.caption });
  kScale(S, 1330, 760, 1.5, "100 g"); chicken(S, 1330, 600, 1.0, {});
  card(S, "THE SCIENTISTS' LIMIT", 1330, 330, { t: W(51, 6), size: DS.type.caption });
  DS.vignette(S); }

// Dave has done that three times over today.
{ const S = sc(51, 15, { cam: "push", focus: "960 540" }); DS.room(S, KIT); counter(S, 380, 1700);
  [700, 1010, 1320].forEach((x, i) => { const g = S.grp(); chicken(S, x, 560, 0.8, { parent: g }); txt(S, "100 g", x, 440, { size: DS.type.small, c: DS.c("ink"), parent: g, t: T0(S) }); fadeG(S, g, W(51, 15) + i * 0.4); });
  dave(S, 400, 960, "near", { s: 1.4, look: 7, mood: "happy", pose: "hips" });
  txt(S, "x 3", 1010, 270, { size: DS.type.display, c: DS.c("red", 2), t: W(51, 19) });
  DS.vignette(S); }

// And the hundred grams won. Their muscles kept building for more than twelve hours,
{ const S = sc(52, 0, { cam: "push", focus: "960 540" }); DS.room(S, GYM);
  cup(S, 460, 800, 1.6, { fill: "white" }); trophy(S, 460, 480, 0.9, { t: W(52, 3) });
  card(S, "THE 100 g WON", 460, 170, { t: W(52, 2), tc: "red" });
  const bg = S.grp(); bicep(S, 1330, 520, 1.3, { parent: bg }); fadeG(S, bg, W(52, 5)); tl.fromTo(bg, { attr: { transform: "translate(1330 640) scale(0.65) translate(-1330 -640)" } }, { attr: { transform: "translate(1330 640) scale(1.12) translate(-1330 -640)" }, duration: 5, ease: "power1.inOut", immediateRender: true }, W(52, 5));
  wallClock(S, 1330, 250, 80, 12, 0, { t: W(52, 8) }); card(S, "12+ HOURS", 1330, 400, { t: W(52, 10), size: DS.type.caption });
  DS.vignette(S); }

// and by then, only about half of the protein had even reached their blood.
{ const S = sc(52, 14, { cam: "push", focus: "960 540" }); DS.room(S, GYM);
  pie(S, 960, 520, 230, 0.5, { c: "red" });
  txt(S, "IN THE BLOOD", 1380, 450, { size: DS.type.small, c: DS.c("red", 2), t: W(52, 21) }); txt(S, "STILL DIGESTING", 540, 450, { size: DS.type.small, c: DS.c("gray", 2), t: W(52, 17) });
  dropWater(S, 1380, 520, 1.8, W(52, 22)); stomach(S, 540, 580, 0.7, { fill: 0.6 });
  card(S, "ONLY ABOUT HALF", 960, 170, { t: W(52, 17), tc: "red" });
  DS.vignette(S); }

// So, at least after a hard workout, the old rule was wrong.
{ const S = sc(53, 0, { cam: "push", focus: "960 540" }); DS.room(S, GYM);
  const bg = S.grp(); DS.drop(S, rrect(560, 190, 800, 500, DS.r.md), { parent: bg }); DS.shape(S, rrect(550, 180, 800, 500, DS.r.md), "white", { parent: bg, w: "mid", flat: true });
  txt(S, "THE OLD RULE", 950, 290, { size: DS.type.small, c: DS.c("gray", 2), parent: bg }); txt(S, "1 MEAL", 950, 420, { size: DS.type.display, c: DS.c("ink"), parent: bg }); txt(S, "25 g MAX", 950, 560, { size: DS.type.display, c: DS.c("ink"), parent: bg });
  stamp(S, 950, 740, "WRONG", W(53, 10), "red", { size: DS.type.display, rot: -5 });
  DS.vignette(S); }

// Muscles can use much more from one meal than people thought. They just take their time.
{ const S = sc(53, 12, { cam: "push", focus: "960 540" }); DS.room(S, GYM);
  bicep(S, 620, 520, 1.6, { bulge: 1.2 }); txt(S, "MUCH MORE FROM ONE MEAL", 620, 800, { size: DS.type.caption, c: DS.c("green", 2), t: W(53, 13) });
  wallClock(S, 1330, 450, 190, 3, 0, { t: W(53, 22) }); card(S, "THEY TAKE THEIR TIME", 1330, 740, { t: W(53, 23), tc: "red" });
  DS.vignette(S); }

// "So I was right all along. Protein is muscle." (Dave)
{ const S = sc(54, 0, { cam: "push", focus: "960 520" }); DS.room(S, KIT);
  const F = dave(S, 640, 960, "near", { s: 1.5, look: 4, mood: "happy", pose: "armsUp" }); talk(S, F, W(54, 0), END(54));
  say(S, 1340, 330, 380, 190, 920, 500, ["I WAS RIGHT", "ALL ALONG"], W(54, 0), { size: DS.type.title });
  trophy(S, 1400, 900, 1.0, { t: W(54, 3) });
  DS.vignette(S); }

// ===================== 7. The twist =====================
// And here's the twist. Somebody has already run Dave's experiment, for eight weeks.
{ const S = sc(55, 0, { cam: "push", focus: "960 540" }); DS.room(S, GYM);
  dave(S, 420, 960, "near", { s: 1.3, look: 8, mood: "wow" });
  stamp(S, 960, 230, "THE TWIST", W(55, 3), "red", { size: DS.type.title });
  const C = calPage(S, 1250, 640, 780, 300, "8 WEEKS", { cols: 8, rows: 1, t: W(55, 10) }); C.cells.forEach(([x, y], i) => tick(S, x, y, 0.7, W(55, 10) + i * 0.1));
  DS.vignette(S); }

// In two thousand fourteen, a Florida university asked trained weightlifters to eat
{ const S = sc(56, 0, { cam: "push", focus: "960 540" }); DS.outdoor(S, { hy: 640, sun: [300, 180] });
  hall(S, 560, 840, 620, 480, { cols: 5, name: "earth" }); DS.shape(S, rrect(330, 520, 460, 66, DS.r.sm), "white", { w: "mid", flat: true }); txt(S, "UNIVERSITY", 560, 568, { size: DS.type.small, c: DS.c("ink") });
  const F = who(S, 1380, 960, "near", { s: 1.4, hair: "short", hairC: DS.c("ink"), outfitC: DS.c("green"), armL: [[-40, -40], [-62, -132]], armR: [[40, -40], [62, -132]], mood: "determined", look: 0 }); dumbbell(S, 1380, 436, 1.0, { len: 560, t: W(56, 8) });
  card(S, "FLORIDA, 2014", 560, 170, { t: W(56, 5) }); card(S, "TRAINED WEIGHTLIFTERS", 1380, 170, { t: W(56, 8), size: DS.type.caption });
  DS.vignette(S); }

// four point four grams of protein per kilo, every day.
{ const S = sc(56, 10, { cam: "push", focus: "960 560" }); DS.room(S, GYM); const base = 880;
  bar(S, 560, base, 200, 80, "gray", S.start + 0.1); txt(S, "0.8 g", 660, base - 100, { size: DS.type.small, c: DS.c("ink") }); txt(S, "RECOMMENDED", 660, base + 56, { size: DS.type.caption, c: DS.c("ink") });
  bar(S, 1060, base, 200, 440, "red", W(56, 12)); txt(S, "4.4 g", 1160, base - 460, { size: DS.type.title, c: DS.c("red", 2), t: W(56, 12) }); txt(S, "THE STUDY", 1160, base + 56, { size: DS.type.caption, c: DS.c("red", 2), t: W(56, 12) });
  weightKg(S, 1500, 880, 0.9, "1 kg", { t: W(56, 16) }); card(S, "PER KILO, EVERY DAY", 960, 170, { t: W(56, 16), size: DS.type.small });
  DS.vignette(S); }

// The researchers put extra people into the high-protein group, because they expected some to give up.
{ const S = sc(57, 0, { cam: "push", focus: "960 560" }); DS.room(S, GYM);
  const px = 960, py = 590; DS.drop(S, rrect(px - 620, py - 220, 1240, 440, DS.r.md)); DS.shape(S, rrect(px - 630, py - 230, 1240, 440, DS.r.md), "white", { w: "mid", flat: true });
  miniGrid(S, 440, 480, 8, 3, 140, 100, 1.3, { n: 20, c: DS.c("ink") });
  const ex = S.grp(); [0, 1, 2, 3].forEach((i) => mini(S, 440 + (i % 4) * 140, 790, 1.3, { shirt: "green", parent: ex, t: W(57, 3) + i * 0.3 }));
  const lv = S.grp(); [[1540, 480], [1540, 580], [1540, 680]].forEach(([x, y]) => mini(S, x, y, 1.3, { parent: lv })); tl.to(lv, { attr: { transform: "translate(300 0)" }, opacity: 0, duration: 1.4, ease: "power1.in" }, W(57, 13));
  card(S, "HIGH-PROTEIN GROUP", 960, 150, { t: W(57, 5), size: DS.type.small }); card(S, "EXPECTED SOME TO GIVE UP", 960, 900, { t: W(57, 10), size: DS.type.caption });
  DS.vignette(S); }

// The twenty who finished ate an average of three hundred and seven grams a day,
{ const S = sc(58, 0, { cam: "push", focus: "960 540" }); DS.room(S, GYM);
  miniGrid(S, 480, 400, 10, 2, 100, 130, 1.5, { t0: W(58, 0) + 0.1, t1: W(58, 3), c: DS.c("ink") });
  card(S, "THE 20 WHO FINISHED", 960, 150, { t: W(58, 1), size: DS.type.small });
  txt(S, "307 g", 960, 760, { size: DS.type.display, c: DS.c("red", 2), t: W(58, 9) }); txt(S, "a day, on average", 960, 840, { size: DS.type.small, c: DS.c("ink"), t: W(58, 10) });
  DS.vignette(S); }

// and about eight hundred extra calories, for eight weeks.
{ const S = sc(58, 15, { cam: "push", focus: "960 540" }); DS.room(S, GYM);
  S.flame(560, 700, 1.6, W(58, 17), 0); txt(S, "+800 kcal", 560, 830, { size: DS.type.title, c: DS.c("red", 2), t: W(58, 17) }); txt(S, "a day, extra", 560, 900, { size: DS.type.small, c: DS.c("ink"), t: W(58, 19) });
  const C = calPage(S, 1330, 480, 760, 320, "8 WEEKS", { cols: 8, rows: 1, t: W(58, 21) }); C.cells.forEach(([x, y], i) => tick(S, x, y, 0.7, W(58, 21) + i * 0.1));
  DS.vignette(S); }

// No change in weight. No change in fat. And no change in muscle.
{ const S = sc(59, 0, { cam: "push", focus: "960 540" }); DS.room(S, GYM);
  [[420, "WEIGHT", 0], [960, "FAT", 4], [1500, "MUSCLE", 9]].forEach(([x, n, w]) => { panel(S, x, 520, 440, 520, W(59, w), "white"); const pg = S.grp();
    txt(S, n, x, 340, { size: DS.type.small, c: DS.c("ink"), parent: pg, t: T0(S) }); S.draw(`M${x - 160} 520 L${x + 150} 520`, S.start, 0, { c: DS.c("blue"), w: DS.w.near * 1.4, parent: pg }); S.draw(arrowHead(x + 160, 520, 0, 30), S.start, 0, { c: DS.c("blue"), w: DS.w.near, parent: pg });
    txt(S, "=", x, 650, { size: DS.type.display, c: DS.c("red", 2), parent: pg, t: T0(S) }); txt(S, "NO CHANGE", x, 730, { size: DS.type.caption, c: DS.c("ink"), parent: pg, t: T0(S) });
    fadeG(S, pg, W(59, w)); });
  DS.vignette(S); }

// A few of them did complain of stomach trouble, and of feeling hot.
{ const S = sc(60, 0, { cam: "push", focus: "960 540" }); DS.room(S, GYM);
  const F = who(S, 640, 960, "near", { s: 1.5, hair: "short", hairC: DS.c("ink"), outfitC: DS.c("green"), pose: "hold", mood: "worried", look: 5 }); sweatAt(S, F.hd[0] + F.r * 1.0, F.hd[1] - F.r * 0.2, W(60, 9), 1.8); heat(S, F.cx - 50, F.hd[1] - F.r - 30, 4, W(60, 9));
  const g = S.grp(); S.thought(1290, 440, 330, 230, 860, 620, S.start, 0.3, { parent: g }); stomach(S, 1290, 440, 1.0, { parent: g, fill: 0.7 }); fadeG(S, g, W(60, 6));
  card(S, "A FEW COMPLAINED", 640, 170, { t: W(60, 0) });
  DS.vignette(S); }

// Muscle isn't built from protein alone. A two thousand eighteen review of forty-nine studies found that in weightlifters,
{ const S = sc(61, 0, { cam: "push", focus: "960 540" }); DS.room(S, GYM);
  bicep(S, 520, 440, 1.0, {}); txt(S, "=", 800, 470, { size: DS.type.display, c: DS.c("ink"), t: W(61, 2) }); egg(S, 940, 460, 2.0, { t: W(61, 2) }); txt(S, "+", 1070, 470, { size: DS.type.display, c: DS.c("ink"), t: W(61, 4) }); txt(S, "?", 1190, 480, { size: DS.type.display, c: DS.c("red", 2), t: W(61, 4) });
  [0, 1, 2, 3, 4].forEach((i) => { const g = S.grp(); paperR(S, 1320 + i * 36, 640 - i * 14, 220, 280, { parent: g, name: "white" }); lines(S, 1340 + i * 36, 690 - i * 14, 170, 4, undefined, 40, g); fadeG(S, g, W(61, 7) + i * 0.2); });
  card(S, "NOT FROM PROTEIN ALONE", 640, 170, { t: W(61, 0), size: DS.type.small });
  card(S, "2018: 49 STUDIES", 1430, 880, { t: W(61, 12), size: DS.type.caption });
  DS.vignette(S); }

// extra protein stopped adding muscle at around one point six grams per kilo a day.
{ const S = sc(62, 0, { cam: "push", focus: "960 540" }); DS.room(S, GYM);
  const px = 960, py = 500; paperR(S, px - 520, py - 290, 1040, 580, { name: "white" });
  S.draw(`M${px - 440} ${py + 220} V${py - 230} M${px - 440} ${py + 220} H${px + 440}`, S.start, 0, { c: DS.c("ink"), w: DS.w.mid });
  const cg = S.grp(); S.draw(smooth([[px - 440, py + 210], [px - 300, py + 60], [px - 120, py - 80], [px + 20, py - 150], [px + 440, py - 160]]), S.start, 0, { c: DS.c("blue"), w: DS.w.near * 1.4, parent: cg }); fadeG(S, cg, W(62, 0) + 0.2, 1.4);
  const mk = S.grp(); S.draw(`M${px + 20} ${py - 150} V${py + 220}`, S.start, 0, { c: DS.c("red"), w: DS.w.mid, parent: mk }); txt(S, "1.6 g/kg", px + 20, py + 280, { size: DS.type.small, c: DS.c("red", 2), parent: mk }); fadeG(S, mk, W(62, 7));
  txt(S, "MORE PROTEIN", px, py + 340, { size: DS.type.caption, c: DS.c("ink"), t: W(62, 0) }); txt(S, "MUSCLE", px - 480, py - 250, { size: DS.type.caption, c: DS.c("ink"), t: W(62, 0) });
  DS.vignette(S); }

// The lifting, they wrote, was the much more potent stimulus.
{ const S = sc(62, 15, { cam: "push", focus: "960 540" }); DS.room(S, GYM);
  dumbbell(S, 640, 560, 2.2, { len: 300 }); txt(S, "LIFTING", 640, 830, { size: DS.type.title, c: DS.c("red", 2), t: W(62, 16) });
  egg(S, 1450, 700, 1.2, {}); txt(S, "PROTEIN", 1450, 830, { size: DS.type.small, c: DS.c("ink") });
  card(S, "THE MUCH MORE POTENT STIMULUS", 960, 170, { t: W(62, 21), size: DS.type.caption });
  DS.vignette(S); }

// For Dave, that's about a hundred and thirty grams. He ate that, plus another hundred and seventy his muscles likely had no use for.
{ const S = sc(63, 0, { cam: "push", focus: "960 540" }); DS.room(S, GYM);
  dave(S, 380, 960, "near", { s: 1.4, look: 8, mood: "flat" });
  const bx = 900, base = 900, u = 1.3; bar(S, bx, base, 260, 130 * u, "green", W(63, 4)); bar(S, bx, base - 130 * u, 260, 170 * u, "gray", W(63, 12), { tone: 1 });
  txt(S, "130 g", bx + 130, base - 65 * u + 14, { size: DS.type.title, c: DS.P.white[0], t: W(63, 4) }); txt(S, "170 g", bx + 130, base - 215 * u + 14, { size: DS.type.title, c: DS.c("ink"), t: W(63, 14) });
  txt(S, "WHAT HIS MUSCLES CAN USE", bx + 300, base - 65 * u + 14, { size: DS.type.caption, c: DS.c("green", 2), anchor: "start", t: W(63, 5) }); txt(S, "NO USE FOR IT", bx + 300, base - 215 * u + 14, { size: DS.type.caption, c: DS.c("gray", 2), anchor: "start", t: W(63, 18) });
  card(S, "FOR DAVE", 380, 170, { t: W(63, 1) });
  DS.vignette(S); }

// So what would happen if you ate three hundred grams of protein in a day?
{ const S = sc(64, 0, { cam: "push", focus: "900 520" }); DS.room(S, KIT); counter(S, 380, 1100);
  const F = dave(S, 560, 960, "near", { s: 1.5, look: 5, mood: "flat" });
  const g = S.grp(); S.thought(1290, 410, 340, 220, 800, 620, S.start, 0.3, { parent: g }); eggStack(S, 1290, 520, 0.55, 4, { parent: g }); txt(S, "300 g", 1290, 640, { size: DS.type.title, c: DS.c("red", 2), parent: g });
  card(S, "THE ANSWER", 560, 170, { t: W(64, 12), tc: "green" });
  DS.vignette(S); }

// You'd be very full, a little hot, and on first-name terms with your bathroom.
{ const S = sc(64, 15, { cam: "push", focus: "960 540" }); DS.room(S, KIT);
  [[460, "VERY FULL", 17], [960, "A LITTLE HOT", 19], [1460, "BATHROOM", 24]].forEach(([x, n, w], i) => { const g = S.grp(); panel(S, x, 500, 420, 640, undefined, "white");
    if (i === 0) stomach(S, x, 430, 1.3, { fill: 0.75 }); if (i === 1) { S.flame(x, 600, 1.5, S.start, 0); } if (i === 2) { bathDoor(S, x - 90, 270, 180, 300); tallyMarks(S, x - 60, 330, 5, W(64, 25), END(64) - 0.5, { c: DS.P.white[0], h: 60, sp: 16 }); }
    txt(S, n, x, 760, { size: DS.type.small, c: DS.c(i === 1 ? "red" : "ink", i === 1 ? 2 : 0) }); });
  DS.vignette(S); }

// Your muscles would take what your training asks for.
{ const S = sc(65, 0, { cam: "push", focus: "960 540" }); DS.room(S, GYM);
  dumbbell(S, 520, 560, 1.4, { len: 300 }); card(S, "TRAINING ASKS", 520, 300, { t: W(65, 4) });
  arrowR(S, 760, 560, 1040, 560, W(65, 5), { c: "red", tone: 2 }); txt(S, "130 g", 900, 500, { size: DS.type.title, c: DS.c("red", 2), t: W(65, 6) });
  bicep(S, 1400, 560, 1.3, { bulge: 1.2, t: W(65, 2) });
  card(S, "MUSCLES TAKE THAT", 1400, 300, { t: W(65, 2), size: DS.type.caption });
  DS.vignette(S); }

// The rest gets burned as fuel, and its nitrogen leaves as urea.
{ const S = sc(65, 9, { cam: "push", focus: "960 540" }); DS.room(S, GYM);
  S.flame(520, 760, 1.5, S.start, 0); card(S, "THE REST: FUEL", 520, 270, { t: W(65, 11), size: DS.type.caption });
  const n = atom(S, 780, 540, 38, "N", {}); tl.fromTo(n, { attr: { transform: "translate(0 0)" }, opacity: 0 }, { attr: { transform: "translate(420 0)" }, opacity: 1, duration: 2.0, ease: "power1.inOut", immediateRender: true }, W(65, 16));
  arrowR(S, 740, 640, 1160, 640, W(65, 16), {}); jar(S, 1400, 780, 1.4, "UREA", { t: W(65, 18) });
  card(S, "NITROGEN LEAVES AS UREA", 1300, 190, { t: W(65, 16), size: DS.type.caption });
  DS.vignette(S); }

// ===================== 8. What nobody knows yet =====================
// And if you did it every day, for years? Here, scientists still argue.
{ const S = sc(66, 0, { cam: "push", focus: "960 540" }); DS.room(S, { wall: "glass", floor: "wood", window: false });
  calPage(S, 960, 330, 560, 290, "EVERY DAY, FOR YEARS", { cols: 12, rows: 3, t: W(66, 1), size: DS.type.caption });
  who(S, 400, 960, "near", Object.assign({}, LABF, { s: 1.1, mood: "flat", look: 6, pose: "shrug" })); who(S, 1520, 960, "near", Object.assign({}, LABG, { s: 1.1, mood: "worried", look: -6, pose: "shrug" }));
  say(S, 380, 380, 230, 100, 400, 590, ["SAFE!"], W(66, 9), { size: DS.type.small }); say(S, 1540, 380, 250, 100, 1520, 590, ["NOT SURE!"], W(66, 10), { size: DS.type.small });
  DS.vignette(S); }

// A two thousand eighteen review of twenty-eight trials found no harm to kidney function in healthy people.
{ const S = sc(67, 0, { cam: "push", focus: "960 540" }); DS.room(S, { wall: "glass", floor: "wood", window: false });
  for (let i = 0; i < 28; i++) { const g = S.grp(), c = i % 7, r = Math.floor(i / 7); paperR(S, 250 + c * 92, 290 + r * 118, 70, 90, { parent: g, name: "white" }); fadeG(S, g, W(67, 3) + i * 0.07, 0.3); }
  kidney(S, 1330, 480, 2.0); tick(S, 1330, 480, 2.5, W(67, 8));
  card(S, "2018 REVIEW: 28 TRIALS", 640, 170, { t: W(67, 3), size: DS.type.caption }); card(S, "NO HARM", 1330, 760, { t: W(67, 9), tc: "green" }); card(S, "HEALTHY PEOPLE", 1330, 200, { t: W(67, 14), size: DS.type.caption });
  DS.vignette(S); }

// But those diets had about twice the usual protein, not five times.
{ const S = sc(67, 17, { cam: "push", focus: "960 560" }); DS.room(S, { wall: "glass", floor: "wood", window: false }); const base = 880, u = 120;
  bar(S, 440, base, 220, u, "gray", S.start + 0.1); txt(S, "USUAL", 550, base + 56, { size: DS.type.caption, c: DS.c("ink") });
  bar(S, 860, base, 220, 2 * u, "blue", W(67, 22)); txt(S, "THOSE DIETS: 2x", 970, base + 56, { size: DS.type.caption, c: DS.c("blue", 2), t: W(67, 22) });
  bar(S, 1280, base, 220, 5 * u, "red", W(67, 27)); txt(S, "DAVE: ~5x", 1390, base + 56, { size: DS.type.caption, c: DS.c("red", 2), t: W(67, 27) });
  card(S, "NOT FIVE TIMES", 960, 170, { t: W(67, 26), tc: "red" });
  DS.vignette(S); }

// One of the longest trials at very high intakes followed fourteen men for a year, and found no harm either. That's not many men, or many years.
{ const S = sc(68, 0, { cam: "push", focus: "960 540" }); DS.room(S, { wall: "glass", floor: "wood", window: false });
  miniGrid(S, 360, 540, 7, 2, 130, 150, 1.4, { n: 14, t0: W(68, 10) + 0.1, t1: W(68, 11) + 0.6, c: DS.c("ink") });
  const C = calPage(S, 1420, 420, 400, 280, "1 YEAR", { cols: 4, rows: 3, t: W(68, 12) }); tick(S, 1420, 420, 3.0, W(68, 17));
  card(S, "14 MEN", 700, 170, { t: W(68, 10) }); card(S, "NO HARM EITHER", 1420, 170, { t: W(68, 17), tc: "green", size: DS.type.caption }); card(S, "THAT'S NOT MANY", 960, 880, { t: W(68, 20), tc: "red", size: DS.type.caption });
  DS.vignette(S); }

// In twenty twenty, kidney specialists warned that lots of protein over many years might strain the kidneys' tiny filters.
{ const S = sc(69, 0, { cam: "push", focus: "960 540" }); DS.room(S, { wall: "glass", floor: "wood", window: false });
  who(S, 360, 960, "near", Object.assign({}, LABG, { s: 1.3, mood: "worried", look: 7, pose: "point" })); kidney(S, 880, 470, 2.2);
  const mg = S.grp(); DS.shape(S, circ(1480, 500, 200), "glass", { parent: mg, w: "near", flat: true, tone: 1 });
  for (let r = 0; r < 4; r++) for (let c = 0; c < 5; c++) DS.shape(S, circ(1380 + c * 50, 420 + r * 50, 14), "gray", { parent: mg, w: "detail", flat: true, tone: 1 });
  S.draw(line([1620, 640], [1740, 770], 0), S.start, 0, { c: DS.c("wood", 2), w: DS.w.near * 2, parent: mg }); fadeG(S, mg, W(69, 14));
  warnTri(S, 1480, 220, 0.7, W(69, 5));
  card(S, "2020: A WARNING", 600, 170, { t: W(69, 1), size: DS.type.small }); card(S, "TINY FILTERS", 1480, 810, { t: W(69, 16), size: DS.type.caption });
  DS.vignette(S); }

// And most people who already have kidney disease are advised to eat less protein, not more.
{ const S = sc(70, 0, { cam: "push", focus: "960 540" }); DS.room(S, { wall: "glass", floor: "wood", window: false });
  kidney(S, 560, 470, 2.0); card(S, "KIDNEY DISEASE", 560, 770, { t: W(70, 5), size: DS.type.small });
  chicken(S, 1330, 620, 0.7, {}); arrowR(S, 1330, 500, 1330, 720, W(70, 11), { c: "green", tone: 2 }); txt(S, "LESS PROTEIN", 1330, 300, { size: DS.type.title, c: DS.c("green", 2), t: W(70, 11) }); txt(S, "NOT MORE", 1330, 400, { size: DS.type.small, c: DS.c("ink"), t: W(70, 14) });
  DS.vignette(S); }

// Europe's food safety agency says twice the recommended amount is considered safe.
{ const S = sc(71, 0, { cam: "push", focus: "960 540" }); DS.outdoor(S, { hy: 640 });
  hall(S, 520, 850, 600, 480, { cols: 5, name: "sand" }); DS.shape(S, rrect(250, 520, 540, 66, DS.r.sm), "white", { w: "mid", flat: true }); txt(S, "FOOD SAFETY AGENCY", 520, 568, { size: DS.type.caption, c: DS.c("ink") });
  const base = 900, u = 110; bar(S, 1130, base, 200, u, "gray", S.start + 0.1); txt(S, "RECOMMENDED", 1230, base + 56, { size: DS.type.caption, c: DS.c("ink") });
  bar(S, 1450, base, 200, 2 * u, "green", W(71, 5)); txt(S, "2x: SAFE", 1550, base + 56, { size: DS.type.caption, c: DS.c("green", 2), t: W(71, 5) }); tick(S, 1550, base - 2 * u - 70, 2.0, W(71, 10));
  card(S, "EUROPE'S FOOD SAFETY AGENCY", 960, 150, { t: W(71, 0), size: DS.type.caption });
  DS.vignette(S); }

// Dave's day was more than four times it.
{ const S = sc(71, 12, { cam: "push", focus: "960 560" }); DS.room(S, { wall: "glass", floor: "wood", window: false }); const base = 900, u = 110;
  bar(S, 560, base, 220, u, "gray", S.start + 0.1); txt(S, "RECOMMENDED", 670, base + 56, { size: DS.type.caption, c: DS.c("ink") });
  bar(S, 960, base, 220, 2 * u, "green", S.start + 0.1); txt(S, "SAFE: 2x", 1070, base + 56, { size: DS.type.caption, c: DS.c("ink") });
  bar(S, 1360, base, 220, 4.5 * u, "red", W(71, 13)); txt(S, "DAVE: 4.5x", 1470, base + 56, { size: DS.type.caption, c: DS.c("ink"), t: W(71, 13) });
  S.draw(`M900 ${base - 2 * u} H1700`, W(71, 15), 0, { c: DS.c("green", 2), w: DS.w.mid, op: 0.8 });
  card(S, "MORE THAN FOUR TIMES", 960, 170, { t: W(71, 16), tc: "red" });
  DS.vignette(S); }

// "So please, don't copy Dave. This was a thought experiment, not a plan." (Doctor)
{ const S = sc(72, 0, { cam: "push", focus: "800 540" }); DS.room(S, { wall: "glass", floor: "wood", window: false });
  const D = who(S, 700, 960, "near", Object.assign({}, DOC, { s: 1.6, mood: "flat", look: 4, pose: "hold" })); talk(S, D, W(72, 0), END(72));
  say(S, 1250, 300, 400, 190, 830, 470, ["PLEASE, DON'T", "COPY DAVE"], W(72, 0), { size: DS.type.title });
  card(S, "A THOUGHT EXPERIMENT", 1250, 650, { t: W(72, 5), size: DS.type.caption }); card(S, "NOT A PLAN", 1250, 750, { t: W(72, 9), size: DS.type.caption, tc: "red" });
  dave(S, 1650, 960, "near", { s: 1.0, look: -6, mood: "worried" });
  card(S, "DOCTOR", 700, 170, { t: W(72, 0), size: DS.type.caption });
  DS.vignette(S); }

// ===================== 9. The second column =====================
// The next morning, Dave checks the mirror. His arms are exactly the same size.
{ const S = sc(73, 0, { cam: "push", focus: "960 540" }); DS.room(S, KITW);
  const F = dave(S, 560, 960, "near", Object.assign({}, FLEX, { s: 1.5, look: 8, mood: "flat" }));
  const mx = 1290, mg = S.grp(); DS.shape(S, rrect(mx - 230, 130, 460, 770, DS.r.md), "wood", { parent: mg, w: "mid" }); DS.shape(S, rrect(mx - 200, 160, 400, 710, DS.r.sm), "glass", { parent: mg, w: "detail", flat: true, tone: 1 });
  const rg = S.grp(mg); clipTo(rg, rrect(mx - 200, 160, 400, 710, DS.r.sm)); who(S, mx, 870, "near", Object.assign({}, DAVE, FLEX, { s: 1.0, mood: "flat", look: -8, parent: rg }));
  card(S, "THE NEXT MORNING", 560, 170, { t: W(73, 1), size: DS.type.caption });
  txt(S, "=", 900, 540, { size: DS.type.display, c: DS.c("red", 2), t: W(73, 10) }); card(S, "SAME SIZE", 900, 640, { t: W(73, 10), size: DS.type.caption, tc: "red" });
  DS.vignette(S); }

// He looks at the scoreboard. Three hundred out of three hundred. One column. Protein.
{ const S = sc(74, 0, { cam: "none", focus: "1340 430" }); DS.room(S, KIT);
  fridge(S, 1090, 130, 500, 630);
  const B = scoreb(S, 1340, 430, 0.82, { val: 300, t: S.start });
  dave(S, 700, 960, "near", { s: 1.4, look: 8, mood: "flat", pose: "think" });
  ringAt(S, B.x0 + B.colW / 2, B.y0 + B.ht * 0.155, 130, 36, W(74, 11)); card(S, "ONE COLUMN", 1340, 660, { t: W(74, 11), tc: "red" });
  S.zoom(1340, 430, 1.7, W(74, 3), 1.4);
  DS.vignette(S); }

// So Dave draws a second column next to it, and at the top he writes lifts.
{ const S = sc(75, 0, { cam: "push", focus: "960 540" }); DS.room(S, KIT);
  const B = scoreb(S, 1000, 470, 1.15, { val: 300, two: true, t2: W(75, 14), t2d: W(75, 4), t: S.start });
  const F = dave(S, 330, 960, "near", { s: 1.4, look: 8, mood: "determined", pose: "reach" });
  const [hx, hy] = F.hand("R"); DS.shape(S, rrect(hx - 8, hy - 18, 70, 24, DS.r.xs), "red", { w: "detail", flat: true, parent: F.g });
  DS.vignette(S); }

// His muscles never counted the eggs.
{ const S = sc(76, 0, { cam: "push", focus: "960 540" }); DS.room(S, KIT); counter(S, 380, 1100);
  eggStack(S, 740, 596, 0.9, 3);
  card(S, "36 EGGS STILL STANDING", 740, 200, { size: DS.type.caption });
  const F = dave(S, 1350, 960, "near", Object.assign({}, FLEX, { s: 1.4, look: -4, mood: "smile" }));
  const g = S.grp(); S.thought(1400, 270, 280, 170, 1370, 445, S.start, 0.3, { parent: g }); bicep(S, 1400, 285, 0.7, { parent: g }); fadeG(S, g, W(76, 1));
  const ex = S.grp(); egg(S, 1130, 320, 1.0, { parent: ex }); xMark(S, 1130, 320, 1.2, W(76, 3), ex); fadeG(S, ex, W(76, 3));
  DS.vignette(S); }

// They were counting the lifts.
{ const S = sc(76, 6, { cam: "push", focus: "960 540" }); DS.room(S, KIT);
  const B = scoreb(S, 960, 450, 1.2, { val: 300, two: true, t: S.start });
  tallyMarks(S, B.x0 + B.colW + 90, B.y0 + B.ht * 0.34, 7, W(76, 7), END(76) - 0.7, { c: DS.c("red", 2), h: 110, sp: 34, w: DS.w.near });
  dumbbell(S, 960, 840, 1.0, { len: 300, t: W(76, 6) });
  DS.vignette(S); }
