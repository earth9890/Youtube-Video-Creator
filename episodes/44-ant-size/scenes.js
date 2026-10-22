// look: still
// What If You Shrank to the Size of an Ant? (~8.3 min). What-if escalation through one day: Dave is 5 mm tall until dinner. Runner: Dave's LIST OF DANGERS (too weak / falling off things
// crossed out, "wet, cold, hungry, blind" appears at the bottom) and the TOAST CRUMB (bigger than his head at 0:00, one bite at the end). Cast: dave, Dave's Brain (brainy), the ant "kid" (ant()).
// VISUAL SAFETY: nothing flashes or strobes. The raindrop and cold beats are comic: Dave's face stays visible inside the drop (outline only), the ant pulls him out; shivering is a gentle sway + blanket.
// The film is named in text only: a generic film-reel card, never its characters, poster or scenes. Haldane's mouse is shown only after the drop, dazed and walking away.
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
// arm jabs: right arm swings between "near" and "reach" n times (gap s); kind "up" for a raised button
// ---------- small kit ----------
let CP = 0;
const clipTo = (g, d) => { const id = "cp44-" + ++CP, cp = el("clipPath", { id }, dsDefs()); el("path", { d }, cp); g.setAttribute("clip-path", `url(#${id})`); return g; };
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

// ---------- the ant "kid": a friendly black garden ant worker (she). Round shiny abdomen, big head, two big eyes, rosy cheeks, a pink bow, bobbly antennae ----------
// feet at (cx, gy), faces right (dir -1 = left); about 150 * k tall, 230 * k long. o.body = colour name (default "ink"), o.flip = hangs upside down below gy, o.look = pupil shift.
// faces: smile cheeky wow flat worried. Layers: g (move it) > bob (walk bounce) > flip (static mirror).
const ant = (S, cx, gy, k = 1, o = {}) => {
  const dir = o.dir || 1, flip = o.flip ? -1 : 1, t0 = o.t, body = o.body || "ink", INKC = DS.P.ink[0], w = Math.max(3, 5 * Math.sqrt(k)), wd = Math.max(2, 3 * Math.sqrt(k));
  const g = S.grp(o.parent), bob = S.grp(g), fl = S.grp(bob);
  fl.setAttribute("transform", `translate(${cx} ${gy}) scale(${dir} ${flip}) translate(${-cx} ${-gy})`);
  const X = (v) => cx + v * k, Y = (v) => gy + v * k, T = t0 ?? S.start;
  const shp = (d, name, ww = w, tone, parent) => S.draw(d, T, 0, { fill: tone === undefined ? DS.vol(name) : DS.c(name, tone), c: INKC, w: ww, parent: parent || fl });
  const legs = (pairs, c) => pairs.forEach(([hx, kx, fx]) => S.draw(`M${X(hx)} ${Y(-54)} L${X(hx + kx)} ${Y(-30)} L${X(hx + fx)} ${Y(-2)}`, T, 0, { c, w: w * 1.15, parent: fl }));
  legs([[-26, -26, -34], [-2, 4, -4], [20, 24, 34]].map(([a, b, c]) => [a + 12, b, c]), DS.c("gray", 2)); // far legs, offset and greyer
  legs([[-26, -26, -34], [-2, 4, -4], [20, 24, 34]], INKC);
  shp(circ(X(-88), Y(-62), 56 * k, 42 * k), body);
  S.fill(circ(X(-106), Y(-80), 20 * k, 9 * k), T, 0, DS.P.white[0], 0.32, fl); // shine
  shp(circ(X(-38), Y(-62), 11 * k), body, wd);
  shp(circ(X(-12), Y(-68), 34 * k, 27 * k), body);
  // antennae with little bobbles
  [[[44, -114], [38, -150], [60, -176]], [[62, -116], [78, -146], [106, -158]]].forEach((p) => { S.draw(smooth(p.map(([a, b]) => [X(a), Y(b)])), T, 0, { c: INKC, w: w * 0.8, parent: fl }); S.draw(circ(X(p[2][0]), Y(p[2][1]), 6 * k), T, 0, { fill: INKC, c: INKC, w: DS.w.hair, parent: fl }); });
  shp(circ(X(52), Y(-84), 38 * k), body);
  // pink bow on the back of the head
  [-1, 1].forEach((sd) => shp(`M${X(26)} ${Y(-116)} Q${X(26 + sd * 28)} ${Y(-142)} ${X(26 + sd * 30)} ${Y(-114)} Q${X(26 + sd * 14)} ${Y(-108)} ${X(26)} ${Y(-116)} Z`, "pink", wd, 0));
  shp(circ(X(26), Y(-115), 6 * k), "pink", wd, 2);
  // eyes: big white discs, black pupils with a catch-light
  const lk = (o.look || 0) * 3 * k;
  [[40, -90], [66, -90]].forEach(([ex, ey]) => { S.draw(circ(X(ex), Y(ey), 13 * k), T, 0, { fill: DS.P.white[0], c: DS.P.white[2], w: DS.w.hair, parent: fl }); S.draw(circ(X(ex) + lk, Y(ey + 1), 7 * k), T, 0, { fill: INKC, c: INKC, w: DS.w.hair, parent: fl }); S.fill(circ(X(ex) + lk + 2.5 * k, Y(ey - 2.5), 2.4 * k), T, 0, DS.P.white[0], 1, fl); });
  [[30, -70], [78, -70]].forEach(([ex, ey]) => S.fill(circ(X(ex), Y(ey), 7 * k, 5 * k), T, 0, DS.c("pink", 0), 0.85, fl));
  const F = {}, face = (name, build) => { const fg = S.grp(fl); build(fg); fg.setAttribute("opacity", 0); F[name] = fg; };
  const mouth = (fg, d) => S.draw(d, T, 0, { c: DS.c("pink", 1), w: w * 0.7, parent: fg });
  const brow = (fg, a, b) => S.draw(`M${X(a[0])} ${Y(a[1])} L${X(b[0])} ${Y(b[1])}`, T, 0, { c: DS.c("gray", 1), w: w * 0.6, parent: fg });
  face("smile", (fg) => mouth(fg, `M${X(44)} ${Y(-66)} Q${X(54)} ${Y(-54)} ${X(66)} ${Y(-67)}`));
  face("cheeky", (fg) => { mouth(fg, `M${X(42)} ${Y(-64)} Q${X(58)} ${Y(-52)} ${X(70)} ${Y(-70)}`); brow(fg, [58, -110], [76, -116]); });
  face("wow", (fg) => { S.draw(circ(X(54), Y(-62), 6 * k, 8 * k), T, 0, { fill: DS.c("red", 0), c: DS.c("pink", 1), w: wd, parent: fg }); brow(fg, [30, -112], [48, -110]); brow(fg, [60, -110], [78, -112]); });
  face("flat", (fg) => { mouth(fg, `M${X(46)} ${Y(-64)} L${X(64)} ${Y(-64)}`); brow(fg, [30, -108], [48, -106]); });
  face("worried", (fg) => { mouth(fg, `M${X(44)} ${Y(-60)} Q${X(54)} ${Y(-68)} ${X(66)} ${Y(-60)}`); brow(fg, [30, -104], [48, -112]); brow(fg, [60, -112], [78, -104]); });
  let cur = o.face || "smile"; F[cur].setAttribute("opacity", 1);
  const mk = (rx, ry, dy) => el("path", { d: circ(X(54), Y(-62 + dy), rx * k, ry * k), fill: DS.c("red", 0), stroke: DS.c("pink", 1), "stroke-width": wd, opacity: 0 }, fl);
  const B = { g, bob, cx, gy, k };
  B.talk = (a, b) => flaps(mk(6, 3.5, 0), mk(7, 8, 2), a, b);
  B.face = (t, name) => { tl.set(F[cur], { opacity: 0 }, t); tl.set(F[name], { opacity: 1 }, t); cur = name; return B; };
  B.shift = (t, dur, dx, dy = 0, ease = "power1.inOut") => { shift(g, t, dur, [0, 0], [dx, dy], ease); return B; };
  const bounce = (t, dur, k2 = k) => tl.to(bob, { y: -5 * k2, duration: 0.25, repeat: 2 * Math.max(1, Math.round(dur / 0.5)) - 1, yoyo: true, ease: "sine.inOut" }, t); // gentle bounce, ~2 per second
  B.walk = (t, dur, dx, dy = 0) => { B.shift(t, dur, dx, dy, "none"); bounce(t, dur); return B; };
  B.walkIn = (t, dur, dx, dy = 0) => { tl.fromTo(g, { attr: { transform: `translate(${dx} ${dy})` } }, { attr: { transform: "translate(0 0)" }, duration: dur, ease: "none", immediateRender: true }, t); bounce(t, dur); return B; };
  const XA = (v) => cx + dir * v * k; B.top = [XA(10), Y(-190)]; B.mouthAt = [XA(54), Y(-62)]; B.head = [XA(52), Y(-84)]; B.XA = XA; B.YA = Y; // anchors in scene coordinates (dir applied)
  return B;
};


// ---------- ant-level sets ----------
const xf = (g, deg, cx, cy, k = 1) => (g.setAttribute("transform", `translate(${cx} ${cy}) rotate(${deg}) scale(${k}) translate(${-cx} ${-cy})`), g);
const R4 = (v) => Math.round(v * 10) / 10;
// the breakfast table seen from five millimetres up: DS.room's plank floor is the tabletop; far away stand a mug and a jam jar. Call as tbl(S, DS.room(S, TBL)).
const TBL = { wall: "wall", floor: "wood", window: false };
const tbl = (S, R, far = true) => {
  const g = S.grp(); S.g.insertBefore(g, R.g.nextSibling);
  if (far) {
    const L = "far", by = R.hy + 6;
    DS.shape(S, `M1490 ${by - 214} H1640 L1650 ${by} H1480 Z`, "blue", { layer: L, parent: g, flat: true });
    S.draw(`M1640 ${by - 180} Q1730 ${by - 170} 1720 ${by - 110} Q1710 ${by - 60} 1646 ${by - 54}`, S.start, 0, { c: DS.c("blue", 0, L), w: DS.w.near, parent: g });
    DS.shape(S, rrect(240, by - 150, 130, 150, DS.r.sm), "red", { layer: L, parent: g, flat: true });
    DS.shape(S, rrect(232, by - 186, 146, 40, DS.r.xs), "gold", { layer: L, parent: g, flat: true });
  }
  return R;
};
// a toast crumb, bigger than Dave's head: crust rim, soft inside, pores. Feet at (cx, gy); about 230k wide, 160k tall
const crumb = (S, cx, gy, k = 1, o = {}) => {
  const g = S.grp(o.parent), pts = [[-112, -14], [-104, -88], [-44, -142], [28, -150], [96, -112], [120, -40], [92, 0], [8, 8], [-70, 4]].map(([a, b]) => [cx + a * k, gy + b * k]);
  const d = smooth([...pts, pts[0], pts[1]]) + " Z";
  DS.shadow(S, cx, gy + 4 * k, 260 * k, { t: o.t, parent: g });
  DS.shape(S, d, "earth", { t: o.t, w: "near", parent: g });
  const inner = pts.map(([x, y]) => [cx + (x - cx) * 0.8, gy - 70 * k + (y - (gy - 70 * k)) * 0.8]);
  S.draw(smooth([...inner, inner[0], inner[1]]) + " Z", o.t ?? S.start, 0, { fill: DS.c("sand", 1), c: DS.c("earth", 2), w: DS.w.detail, parent: g });
  [[-40, -88, 9, 6], [20, -110, 7, 5], [50, -60, 10, 6], [-70, -50, 7, 5], [-6, -48, 8, 5], [70, -92, 6, 4]].forEach(([a, b, rx, ry]) => S.fill(circ(cx + a * k, gy + b * k, rx * k, ry * k), o.t ?? S.start, 0, DS.c("earth", 0), 0.7, g));
  return g;
};
// a grain of rice lying along angle `rot` (degrees), centre (cx, cy), about 190k long
const rice = (S, cx, cy, k = 1, o = {}) => {
  const g = S.grp(o.parent);
  DS.shape(S, circ(cx, cy, 95 * k, 28 * k), "paper", { t: o.t, w: "mid", parent: g });
  S.draw(`M${cx - 70 * k} ${cy - 4 * k} Q${cx} ${cy - 14 * k} ${cx + 70 * k} ${cy - 4 * k}`, o.t ?? S.start, 0, { c: DS.c("gray", 1), w: DS.w.hair, parent: g });
  return xf(g, o.rot ?? 0, cx, cy);
};
// film-reel card: the film is only ever named, never drawn
const reel = (S, cx, cy, k = 1, o = {}) => {
  const kk = Math.max(k, 0.85), wd = 520 * kk, ht = 270 * kk; // small reels keep a card wide enough for the words
  panel(S, cx, cy, wd, ht, o.t ?? S.start); const g = S.grp(o.parent); // panel first, so the reel draws over it
  const rx = cx, ry = cy - 36 * kk, kr = Math.min(1, k + 0.15);
  S.draw(circ(rx, ry, 74 * kr), o.t ?? S.start, 0, { fill: DS.c("gray", 1), c: DS.P.ink[0], w: DS.w.mid, parent: g });
  [0, 1, 2, 3, 4, 5].forEach((i) => { const a = (i / 6) * Math.PI * 2 + 0.3; S.draw(circ(rx + Math.cos(a) * 44 * kr, ry + Math.sin(a) * 44 * kr, 13 * kr), o.t ?? S.start, 0, { fill: DS.P.paper[0], c: DS.P.ink[0], w: DS.w.detail, parent: g }); });
  S.draw(circ(rx, ry, 11 * kr), o.t ?? S.start, 0, { fill: DS.P.ink[0], c: DS.P.ink[0], w: DS.w.detail, parent: g });
  S.text(o.text || "SHRINK-RAY MOVIE", cx, cy + 96 * kk, { size: DS.type.caption, c: DS.P.ink[0], t: o.t ?? T0(S), parent: g });
  return g;
};
// Dave's list of dangers (the runner). o.rows = [t0, t1, t2] when each line appears; o.strike = [t, t] crosses out rows 0 and 1; o.under = time of the three red lines under row 2;
// o.wch = time the shivery last line appears. cx, cy = centre of the paper at scale k.
const DL_ITEMS = ["TOO WEAK", "FALLING OFF THINGS", "GETTING STEPPED ON"];
const dangerList = (S, cx, cy, k = 1, o = {}) => {
  const g = S.grp(o.parent), x0 = cx - 340, y0 = cy - 250, rows = o.rows || [], st = o.strike || [];
  paperR(S, x0, y0, 680, 500, { t: o.t, parent: g });
  S.draw(`M${x0 + 30} ${y0 + 100} H${x0 + 650}`, o.t ?? S.start, 0, { c: DS.c("red", 1), w: DS.w.detail, parent: g });
  S.text("DAVE'S LIST OF DANGERS", cx, y0 + 70, { size: DS.type.caption, c: DS.P.ink[0], t: o.t ?? T0(S), parent: g });
  DL_ITEMS.forEach((s, i) => {
    const y = y0 + 185 + i * 80, ti = rows[i] ?? o.t ?? T0(S);
    S.draw(rrect(x0 + 44, y - 36, 40, 40, DS.r.xs), ti, 0, { fill: DS.P.white[0], c: DS.P.ink[0], w: DS.w.detail, parent: g });
    S.text(s, x0 + 110, y, { size: DS.type.caption, c: DS.P.ink[0], anchor: "start", t: ti, parent: g });
    if (st[i] !== undefined) { const wd = s.length * 26 + 30; S.draw(`M${x0 + 96} ${y - 8} Q${x0 + 96 + wd / 2} ${y - 22} ${x0 + 96 + wd} ${y - 12}`, st[i], 0, { c: DS.c("red", 0), w: DS.w.near * 1.3, parent: g }); S.draw(`M${x0 + 96} ${y - 20} Q${x0 + 96 + wd / 2} ${y} ${x0 + 96 + wd} ${y - 4}`, st[i] + 0.05, 0, { c: DS.c("red", 0), w: DS.w.mid, parent: g }); }
  });
  if (o.under !== undefined) [0, 1, 2].forEach((i) => S.draw(`M${x0 + 100} ${y0 + 185 + 160 + 14 + i * 12} Q${x0 + 300} ${y0 + 185 + 160 + 6 + i * 12} ${x0 + 580} ${y0 + 185 + 160 + 14 + i * 12}`, o.under + i * 0.15, 0, { c: DS.c("red", 0), w: DS.w.mid, parent: g }));
  if (o.wch !== undefined) { // one time, or four (a word each)
    const wg = S.grp(g), ts = Array.isArray(o.wch) ? o.wch : [o.wch, o.wch, o.wch, o.wch], ws = ["wet,", "cold,", "hungry,", "blind."], ww = ws.map((w) => w.length * 25 + 24), x1 = cx - ww.reduce((a, b) => a + b, 0) / 2 + 12;
    let x = x1; ws.forEach((w, i) => { S.text(w, x, y0 + 450, { size: DS.type.small, font: "caveat", c: DS.c("red", 2), anchor: "start", t: ts[i], parent: wg }); x += ww[i]; });
    tl.to(wg, { x: 2.5, duration: 0.16, repeat: 40, yoyo: true, ease: "sine.inOut" }, ts[0] + 0.4);
  }
  return k === 1 ? g : xf(g, 0, cx, cy, k);
};
// the shrink ray: a chunky purple ray gun with a battery window. charge(t, dur, v0, v1) fills the bar.
const ray = (S, cx, gy, k = 1, o = {}) => {
  const g = S.grp(o.parent), t = o.t, X = (v) => cx + v * k, Y = (v) => gy + v * k;
  DS.shadow(S, cx + 20 * k, gy + 2, 360 * k, { t, parent: g });
  DS.shape(S, rrect(X(-40), Y(-110), 60 * k, 110 * k, DS.r.sm), "gray", { t, w: "mid", parent: g });
  DS.shape(S, rrect(X(-150), Y(-220), 300 * k, 120 * k, 40 * k), "purple", { t, w: "near", parent: g });
  DS.shape(S, rect(X(140), Y(-182), 120 * k, 44 * k), "gray", { t, w: "mid", tone: 1, parent: g });
  DS.shape(S, circ(X(268), Y(-160), 34 * k, 56 * k), "yellow", { t, w: "mid", parent: g });
  S.draw(rrect(X(-120), Y(-196), 140 * k, 44 * k, DS.r.xs), t ?? S.start, 0, { fill: DS.P.white[0], c: DS.P.ink[0], w: DS.w.detail, parent: g });
  const bar = el("path", { d: rect(X(-114), Y(-190), 128 * k, 32 * k), fill: DS.c(o.c || "green", 0) }, g);
  const tf = (v) => `translate(${X(-114)} 0) scale(${Math.max(0.001, v)} 1) translate(${-X(-114)} 0)`;
  bar.setAttribute("transform", tf(o.level ?? 1));
  S.draw(circ(X(100), Y(-160), 14 * k), t ?? S.start, 0, { fill: DS.c("red", 0), c: DS.P.ink[0], w: DS.w.detail, parent: g });
  return { g, bar, charge: (ta, dur, v0, v1) => tl.fromTo(bar, { attr: { transform: tf(v0) } }, { attr: { transform: tf(v1) }, duration: dur, ease: "none", immediateRender: true }, ta) };
};
// a garden at ant height. Call as garden(S, DS.outdoor(S, GARD.morning)); foreground grass blades frame the edges.
const GARD = { morning: { hy: 560, sky: "sky", sun: false }, rain: { hy: 560, sky: "gray", sun: false }, sun: { hy: 560, sky: "sky", sun: [1520, 190] }, dusk: { hy: 560, sky: "dusk", sun: [420, 570] } };
const garden = (S, O, o = {}) => {
  if (o.flowers !== false) [[300, "red"], [700, "yellow"], [1250, "pink"], [1620, "orange"]].forEach(([x, nm], i) => { const y = O.hy + 22 + (i % 2) * 14; S.draw(`M${x} ${y} Q${x + 8} ${y - 60} ${x} ${y - 120}`, S.start, 0, { c: DS.c("green", 2, "far"), w: DS.w.far }); [0, 1, 2, 3, 4].forEach((j) => { const a = (j / 5) * Math.PI * 2; S.fill(circ(x + Math.cos(a) * 20, y - 128 + Math.sin(a) * 20, 14), S.start, 0, DS.c(nm, 0, "far"), 1); }); S.fill(circ(x, y - 128, 12), S.start, 0, DS.c("yellow", 0, "far"), 1); });
  if (o.blades !== false) blades(S);
  return O;
};
const blades = (S, o = {}) => {
  const g = S.grp(), c = DS.c("green", 2), c2 = DS.c("green", 0);
  [[-30, 1080, -60, 330, 90], [90, 1080, 70, 480, 80], [210, 1080, 260, 640, 60], [1700, 1080, 1620, 360, 100], [1830, 1080, 1850, 520, 80], [1950, 1080, 1900, 300, 110]].forEach(([x, y, tx, ty, w], i) => {
    DS.shape(S, `M${x - w / 2} ${y} Q${x - w / 4 + (tx - x) * 0.3} ${(y + ty) / 2} ${tx} ${ty} Q${x + w / 4 + (tx - x) * 0.4} ${(y + ty) / 2 + 40} ${x + w / 2} ${y} Z`, "green", { parent: g, flat: true, tone: i % 2 ? 2 : 0, w: "near" });
  });
  return g;
};
// a big leaf: stem toward bottom-left, tip to the right; rot in degrees
const leaf = (S, cx, cy, wd, o = {}) => {
  const g = S.grp(o.parent), h = wd * 0.34;
  DS.shape(S, `M${cx - wd / 2} ${cy} Q${cx - wd * 0.1} ${cy - h * 1.5} ${cx + wd / 2} ${cy - h * 0.2} Q${cx} ${cy + h * 0.9} ${cx - wd / 2} ${cy} Z`, "green", { t: o.t, w: "near", parent: g });
  S.draw(`M${cx - wd / 2} ${cy} Q${cx} ${cy - h * 0.3} ${cx + wd * 0.42} ${cy - h * 0.16}`, o.t ?? S.start, 0, { c: DS.c("green", 2), w: DS.w.mid, parent: g });
  return xf(g, o.rot ?? 0, cx, cy);
};
// water: a dome drop sitting on a surface (rx wide, ry tall) with highlight; clear = outline only (never over a face)
const dome = (S, cx, cy, rx, ry, o = {}) => {
  const g = S.grp(o.parent), d = `M${cx - rx} ${cy} A${rx} ${ry} 0 0 1 ${cx + rx} ${cy} Q${cx} ${cy + ry * 0.16} ${cx - rx} ${cy} Z`;
  if (!o.clear) S.fill(d, o.t ?? S.start, 0, DS.c("sky", 0), 0.78, g);
  S.draw(d, o.t ?? S.start, 0, { c: DS.c("sky", 2), w: DS.w.near, parent: g });
  S.draw(`M${cx - rx * 0.62} ${cy - ry * 0.4} Q${cx - rx * 0.5} ${cy - ry * 0.82} ${cx - rx * 0.14} ${cy - ry * 0.9}`, o.t ?? S.start, 0, { c: DS.P.white[0], w: DS.w.mid, parent: g });
  return g;
};
// falling raindrop: pointed top, round bottom
const tear = (S, cx, cy, k = 1, o = {}) => {
  const g = S.grp(o.parent), d = `M${cx} ${cy - 62 * k} Q${cx - 6 * k} ${cy - 30 * k} ${cx - 34 * k} ${cy + 8 * k} A${36 * k} ${36 * k} 0 1 0 ${cx + 34 * k} ${cy + 8 * k} Q${cx + 6 * k} ${cy - 30 * k} ${cx} ${cy - 62 * k} Z`;
  S.draw(d, o.t ?? S.start, 0, { fill: DS.c("sky", 0), c: DS.c("sky", 2), w: DS.w.mid, parent: g });
  S.draw(`M${cx - 18 * k} ${cy + 6 * k} Q${cx - 22 * k} ${cy + 22 * k} ${cx - 8 * k} ${cy + 30 * k}`, o.t ?? S.start, 0, { c: DS.P.white[0], w: DS.w.detail, parent: g });
  return g;
};
// outline bubble round Dave's head (the drop that grabs his face): ring + highlight, nothing filled over the face
const faceBubble = (S, F, t, parent) => {
  const g = S.grp(parent), [hx, hy] = F.hd, r = F.r * 1.55;
  S.draw(circ(hx, hy, r), t, 0, { c: DS.c("sky", 2), w: DS.w.near, parent: g });
  S.draw(circ(hx, hy, r * 0.93), t, 0, { c: DS.c("sky", 0), w: DS.w.mid, parent: g });
  S.draw(`M${hx - r * 0.78} ${hy - r * 0.3} Q${hx - r * 0.7} ${hy - r * 0.7} ${hx - r * 0.3} ${hy - r * 0.86}`, t, 0, { c: DS.P.white[0], w: DS.w.near, parent: g });
  return g;
};
const cheeks = (S, F, t, parent) => { const [hx, hy] = F.hd; [-1, 1].forEach((sd) => S.fill(circ(hx + sd * F.r * 0.62, hy + F.r * 0.32, F.r * 0.2), t, 0, DS.c("pink", 0), 0.9, parent || F.g)); };

// ---------- creatures ----------
// mouse (grey) or shrew (brown, longer snout, smaller ears). faces right. feet at (cx, gy), about 110k tall
const rodent = (S, cx, gy, k = 1, o = {}) => {
  const g = S.grp(o.parent), nm = o.name || "gray", t = o.t, X = (v) => cx + v * k, Y = (v) => gy + v * k, INKC = DS.P.ink[0], sn = o.long ? 1.5 : 1;
  S.draw(smooth([[X(-70), Y(-30)], [X(-110), Y(-20)], [X(-130), Y(-50)], [X(-150), Y(-44)]]), t ?? S.start, 0, { c: DS.c("pink", 2), w: DS.w.mid * Math.sqrt(k), parent: g });
  DS.shape(S, circ(X(-10), Y(-48), 76 * k, 44 * k), nm, { t, w: "mid", parent: g });
  [[-40, 0], [30, 0]].forEach(([dx]) => S.draw(`M${X(dx)} ${Y(-12)} V${Y(0)}`, t ?? S.start, 0, { c: INKC, w: DS.w.near * Math.sqrt(k), parent: g }));
  DS.shape(S, `M${X(54)} ${Y(-84)} Q${X(100 + 20 * sn)} ${Y(-60)} ${X(78 + 30 * sn)} ${Y(-44)} Q${X(66)} ${Y(-20)} ${X(46)} ${Y(-26)} Z`, nm, { t, w: "mid", tone: 1, parent: g });
  DS.shape(S, circ(X(48), Y(-88), (o.long ? 11 : 17) * k), "pink", { t, w: "detail", parent: g });
  S.fill(circ(X(78 + 30 * sn), Y(-44), 5 * k), t ?? S.start, 0, DS.c("pink", 2), 1, g);
  S.draw(circ(X(66), Y(-62), 5 * k), t ?? S.start, 0, { fill: INKC, c: INKC, w: DS.w.hair, parent: g });
  return g;
};
const fly = (S, cx, cy, k = 1, o = {}) => {
  const g = S.grp(o.parent), t = o.t, INKC = DS.P.ink[0];
  [-1, 1].forEach((sd) => S.draw(circ(cx + sd * 22 * k, cy - 34 * k, 28 * k, 14 * k), t ?? S.start, 0, { fill: DS.P.glass[1], c: DS.c("gray", 0), w: DS.w.detail, parent: g }));
  DS.shape(S, circ(cx, cy, 36 * k, 22 * k), "ink", { t, w: "detail", parent: g });
  S.draw(circ(cx + 40 * k, cy - 6 * k, 15 * k), t ?? S.start, 0, { fill: DS.c("red", 0), c: INKC, w: DS.w.detail, parent: g });
  [-14, 4, 22].forEach((dx) => S.draw(`M${cx + dx * k} ${cy + 14 * k} L${cx + (dx - 8) * k} ${cy + 36 * k}`, t ?? S.start, 0, { c: INKC, w: DS.w.detail, parent: g }));
  return g;
};
const beetle = (S, cx, cy, k = 1, o = {}) => {
  const g = S.grp(o.parent), t = o.t, INKC = DS.P.ink[0];
  DS.shape(S, `M${cx - 70 * k} ${cy} Q${cx - 66 * k} ${cy - 62 * k} ${cx} ${cy - 62 * k} Q${cx + 66 * k} ${cy - 62 * k} ${cx + 70 * k} ${cy} Z`, "navy", { t, w: "mid", parent: g });
  S.draw(`M${cx} ${cy - 62 * k} V${cy}`, t ?? S.start, 0, { c: INKC, w: DS.w.detail, parent: g });
  S.draw(circ(cx + 78 * k, cy - 12 * k, 20 * k), t ?? S.start, 0, { fill: DS.c("navy", 1), c: INKC, w: DS.w.mid, parent: g });
  [-40, 0, 40].forEach((dx) => S.draw(`M${cx + dx * k} ${cy} L${cx + (dx - 10) * k} ${cy + 22 * k}`, t ?? S.start, 0, { c: INKC, w: DS.w.mid, parent: g }));
  return g;
};
const mosquito = (S, cx, cy, k = 1, o = {}) => {
  const g = S.grp(o.parent), t = o.t, INKC = DS.P.ink[0];
  [-1, 1].forEach((sd) => S.draw(circ(cx + sd * 12 * k - 10 * k, cy - 36 * k, 32 * k, 10 * k), t ?? S.start, 0, { fill: DS.P.glass[1], c: DS.c("gray", 0), w: DS.w.detail, parent: g }));
  DS.shape(S, circ(cx, cy, 52 * k, 12 * k), "gray", { t, w: "mid", tone: 2, parent: g });
  DS.shape(S, circ(cx + 58 * k, cy - 2 * k, 14 * k), "gray", { t, w: "mid", tone: 2, parent: g });
  S.draw(`M${cx + 70 * k} ${cy} L${cx + 140 * k} ${cy + 24 * k}`, t ?? S.start, 0, { c: INKC, w: DS.w.mid, parent: g });
  [-30, -4, 22].forEach((dx) => S.draw(`M${cx + dx * k} ${cy + 8 * k} L${cx + (dx - 16) * k} ${cy + 44 * k}`, t ?? S.start, 0, { c: INKC, w: DS.w.detail, parent: g }));
  return g;
};
const thermo = (S, cx, cy, h, level, o = {}) => { // level 0..1 of the red column
  const g = S.grp(o.parent), wd = 30;
  S.draw(rrect(cx - wd / 2, cy - h / 2, wd, h, wd / 2), o.t ?? S.start, 0, { fill: DS.P.white[0], c: DS.P.ink[0], w: DS.w.mid, parent: g });
  S.draw(circ(cx, cy + h / 2 + 8, 26), o.t ?? S.start, 0, { fill: DS.c(o.c || "red", 0), c: DS.P.ink[0], w: DS.w.mid, parent: g });
  S.fill(rect(cx - 8, cy + h / 2 - level * (h - 10), 16, level * (h - 10) + 10), o.t ?? S.start, 0, DS.c(o.c || "red", 0), 1, g);
  return g;
};
const plate = (S, cx, cy, rx, o = {}) => { const g = S.grp(o.parent); DS.shape(S, circ(cx, cy, rx, rx * 0.26), "white", { t: o.t, w: "mid", flat: true, parent: g }); S.draw(circ(cx, cy, rx * 0.72, rx * 0.17), o.t ?? S.start, 0, { c: DS.c("gray", 1), w: DS.w.hair, parent: g }); return g; };
// a heap of n little crumbs on (cx, cy)
const heap = (S, cx, cy, n, sp, o = {}) => { const g = S.grp(o.parent); for (let i = 0; i < n; i++) { const a = i * 2.4, r = Math.sqrt(i + 1) * sp * 0.55; S.draw(circ(cx + Math.cos(a) * r, cy - 6 - (i % 5) * sp * 0.3 + Math.sin(a) * r * 0.35, sp * 0.5, sp * 0.36), o.t ?? S.start, 0, { fill: DS.c("earth", i % 2 ? 1 : 0), c: DS.c("earth", 2), w: DS.w.hair, parent: g }); } return g; };
const sunDisc = (S, cx, cy, r, o = {}) => { const g = S.grp(o.parent); S.fill(circ(cx, cy, r * 2.4), o.t ?? S.start, 0, DS.glow(DS.c("yellow", 1), 0.8), 1, g); S.draw(rays(cx, cy, r * 1.25, r * 1.7, 12, 0), o.t ?? S.start, 0, { c: DS.c("gold", 0), w: DS.w.near, parent: g }); DS.shape(S, circ(cx, cy, r), "yellow", { t: o.t, w: "near", parent: g }); return g; };
const blanket = (S, F, t) => { const k = F.s, x = F.cx, sy = F.sh[1], hy = F.hip[1], g = S.grp(F.g.parentNode);
  S.draw(`M${x - 44 * k} ${sy + 6 * k} Q${x} ${sy - 18 * k} ${x + 44 * k} ${sy + 6 * k} L${x + 70 * k} ${hy + 56 * k} Q${x} ${hy + 72 * k} ${x - 70 * k} ${hy + 56 * k} Z`, t, 0, { fill: DS.c("red", 0), c: DS.P.ink[0], w: DS.w.near, parent: g });
  [0.3, 0.6].forEach((f) => S.draw(`M${x - (44 + 26 * f) * k} ${sy + (6 + (hy - sy + 50) * f) * k * 1} L${x + (44 + 26 * f) * k} ${sy + (6 + (hy - sy + 50) * f) * k * 1}`, t, 0, { c: DS.c("red", 2), w: DS.w.mid, parent: g }));
  S.draw(`M${x - 22 * k} ${sy - 4 * k} L${x - 22 * k} ${hy + 64 * k} M${x + 22 * k} ${sy - 4 * k} L${x + 22 * k} ${hy + 64 * k}`, t, 0, { c: DS.c("red", 2), w: DS.w.mid, parent: g });
  return g; };
// a generic hardback: o.lines = text lines on the cover
const hardback = (S, cx, cy, wd, ht, lines, o = {}) => {
  const g = S.grp(o.parent);
  DS.drop(S, rrect(cx - wd / 2 + 10, cy - ht / 2 + 14, wd, ht, DS.r.sm), { t: o.t, parent: g });
  DS.shape(S, rrect(cx - wd / 2, cy - ht / 2, wd, ht, DS.r.sm), o.name || "navy", { t: o.t, w: "near", parent: g });
  DS.shape(S, rect(cx - wd / 2, cy - ht / 2 + 6, 22, ht - 12), o.name || "navy", { t: o.t, w: "hair", tone: 2, flat: true, parent: g });
  lines.forEach((s, i) => S.text(s, cx + 8, cy - ht / 2 + 110 + i * 70, { size: DS.type.small, c: DS.c("gold", 1), t: o.t ?? T0(S), parent: g }));
  S.draw(`M${cx - wd * 0.32} ${cy + ht / 2 - 80} H${cx + wd * 0.34}`, o.t ?? S.start, 0, { c: DS.c("gold", 0), w: DS.w.mid, parent: g });
  return g;
};
// a sunflower seed (striped, dark) lying along angle rot, centre (cx, cy), 1.4 -> about 150 long
const carrySeed = (S, cx, cy, k = 1, parent, rot = 0) => {
  const g = S.grp(parent);
  DS.shape(S, circ(cx, cy, 78 * k, 34 * k), "brown", { w: "mid", parent: g });
  [-0.5, 0, 0.5].forEach((f) => S.draw(`M${cx - 60 * k} ${cy + f * 30 * k} Q${cx} ${cy + f * 40 * k - 6 * k} ${cx + 60 * k} ${cy + f * 30 * k}`, S.start, 0, { c: DS.P.paper[2], w: DS.w.detail, parent: g }));
  return xf(g, rot, cx, cy);
};
const cloudy = (S, cx, cy, k = 1, o = {}) => { const g = S.grp(o.parent); [[-90, 14, 70], [-20, -20, 90], [70, -6, 80], [130, 20, 56]].forEach(([dx, dy, r]) => S.fill(circ(cx + dx * k, cy + dy * k, r * k, r * 0.8 * k), o.t ?? S.start, 0, DS.c("gray", o.tone ?? 0), 1, g)); return g; };
// slanted rain streaks over a box; they fade in on t, static (no flicker)
const streaks = (S, x0, x1, y0, y1, n, t, parent) => { const g = S.grp(parent); for (let i = 0; i < n; i++) { const x = x0 + ((x1 - x0) * ((i * 37) % n)) / n, y = y0 + ((y1 - y0) * ((i * 53) % n)) / n; S.draw(`M${R4(x)} ${R4(y)} l-14 52`, t ?? S.start, 0, { c: DS.c("sky", 2), w: DS.w.mid, parent: g, op: 0.8 }); } return g; };
const cam = (S, cx, cy, k = 1, o = {}) => { const g = S.grp(o.parent); DS.shape(S, rrect(cx - 70 * k, cy - 46 * k, 140 * k, 92 * k, DS.r.sm), "gray", { t: o.t, w: "mid", tone: 2, parent: g }); S.draw(circ(cx, cy, 30 * k), o.t ?? S.start, 0, { fill: DS.c("glass", 0), c: DS.P.ink[0], w: DS.w.mid, parent: g }); return g; };
// wavy red lines of body heat rising from (x, y); n lines spaced 50 apart. They fade in softly on t and stay (no flicker).
const heat = (S, x, y, n, t, parent, h = 200) => { const g = S.grp(parent); for (let i = 0; i < n; i++) { const bx = x + (i - (n - 1) / 2) * 56; S.draw(smooth([[bx, y], [bx + 16, y - h * 0.25], [bx - 16, y - h * 0.5], [bx + 16, y - h * 0.75], [bx, y - h]]), t ?? S.start, 0, { c: DS.c("red", 0), w: DS.w.near, parent: g, op: 0.85 }); S.draw(arrowHead(bx, y - h, -Math.PI / 2, 22), t ?? S.start, 0, { c: DS.c("red", 0), w: DS.w.near, parent: g }); } return g; };
// a very gentle shiver: a 2 px sway, about 4 per second, for the given window
const shiver = (g, t0, t1, amp = 2) => tl.to(g, { x: amp, duration: 0.12, repeat: Math.floor((t1 - t0) / 0.12), yoyo: true, ease: "sine.inOut" }, t0);
let BLN = 0;
const blurry = (g, sd = 8) => { const id = "bl44-" + ++BLN, f = el("filter", { id, x: "-20%", y: "-20%", width: "140%", height: "140%" }, dsDefs()); el("feGaussianBlur", { stdDeviation: sd }, f); g.setAttribute("filter", `url(#${id})`); return g; };
// a small house: wall, roof, door, a lit window. layer far = hazed
const house = (S, cx, gy, k = 1, o = {}) => { const g = S.grp(o.parent), L = o.layer || "near";
  DS.shape(S, rect(cx - 120 * k, gy - 160 * k, 240 * k, 160 * k), "wall", { layer: L, w: "mid", parent: g, tone: 2, flat: true });
  DS.shape(S, `M${cx - 150 * k} ${gy - 160 * k} L${cx} ${gy - 270 * k} L${cx + 150 * k} ${gy - 160 * k} Z`, "red", { layer: L, w: "mid", parent: g });
  DS.shape(S, rect(cx - 24 * k, gy - 90 * k, 48 * k, 90 * k), "wood", { layer: L, w: "mid", parent: g });
  DS.shape(S, rect(cx + 50 * k, gy - 120 * k, 50 * k, 50 * k), "yellow", { layer: L, w: "mid", parent: g, flat: true, tone: 1 });
  return g; };
// an eye: almond, iris, pupil, catch-light. dash = dashed ghost outline only
const eyeball = (S, cx, cy, k = 1, o = {}) => { const g = S.grp(o.parent), d = `M${cx - 130 * k} ${cy} Q${cx} ${cy - 120 * k} ${cx + 130 * k} ${cy} Q${cx} ${cy + 120 * k} ${cx - 130 * k} ${cy} Z`;
  if (o.dash) { dashed(S.draw(d, S.start, 0, { c: DS.c("gray", 2), w: DS.w.mid, parent: g })); return g; }
  S.draw(d, S.start, 0, { fill: DS.P.white[0], c: DS.P.ink[0], w: Math.max(2, DS.w.near * Math.sqrt(k)), parent: g });
  S.draw(circ(cx, cy, 52 * k), S.start, 0, { fill: DS.c("blue", 0), c: DS.P.ink[0], w: Math.max(2, DS.w.mid * Math.sqrt(k)), parent: g });
  S.draw(circ(cx, cy, 22 * k), S.start, 0, { fill: DS.P.ink[0], c: DS.P.ink[0], w: DS.w.hair, parent: g }); S.fill(circ(cx + 14 * k, cy - 14 * k, 8 * k), S.start, 0, DS.P.white[0], 1, g);
  return g; };
const toyBrick = (S, cx, gy, k = 1, o = {}) => { const g = S.grp(o.parent); DS.shadow(S, cx, gy + 2, 520 * k, { parent: g });
  DS.shape(S, rect(cx - 220 * k, gy - 150 * k, 440 * k, 150 * k), "red", { w: "near", parent: g });
  [-150, -50, 50, 150].forEach((dx) => DS.shape(S, `M${cx + dx * k - 38 * k} ${gy - 150 * k} V${gy - 178 * k} Q${cx + dx * k} ${gy - 192 * k} ${cx + dx * k + 38 * k} ${gy - 178 * k} V${gy - 150 * k} Z`, "red", { w: "mid", parent: g, tone: 1 }));
  DS.shape(S, rrect(cx - 60 * k, gy - 110 * k, 120 * k, 110 * k, DS.r.sm), "ink", { w: "mid", parent: g, flat: true });
  return g; };
// body heat rising from above a figure's head (never over the face)
const heatTop = (S, F, n, t, parent, h = 160) => heat(S, F.cx, F.hd[1] - F.r * 1.6, n, t, parent, h);

// ---------- timing: one picture per beat (merged clips share a picture), landing just after its first word ----------
const CUES = [[1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0], [10, 0], [11, 0], [12, 0], [13, 0], [14, 0], [15, 0], [16, 0], [17, 0], [18, 0], [19, 0], [21, 0], [22, 0], [23, 0], [24, 0], [25, 0], [26, 0], [27, 0], [28, 0], [29, 0], [30, 0], [31, 0], [32, 0], [33, 0], [34, 0], [35, 0], [36, 0], [37, 0], [38, 0], [39, 0], [40, 0], [41, 0], [42, 0], [43, 0], [44, 0], [45, 0], [46, 0], [47, 0], [48, 0], [49, 0], [50, 0], [51, 0], [52, 0], [53, 0], [54, 0], [55, 0], [56, 0], [57, 0], [58, 0], [59, 0], [60, 0], [61, 0], [62, 0], [63, 0], [64, 0], [65, 0], [66, 0], [67, 0], [68, 0], [69, 0], [70, 0], [71, 0], [72, 0], [73, 0], [74, 0], [75, 0], [76, 0], [77, 0], [78, 0], [79, 0], [80, 0], [81, 0], [82, 0], [83, 0]];
const WINS = sceneWindows(CUES, -0.25);
const sc = (c, w, o) => { const k = CUES.findIndex(([a, b]) => a === c && b === w); if (k < 0) throw new Error("no cue " + c + ":" + w); return scene(WINS[k][0], WINS[k][1], o); };

// ---------- shared scene helpers ----------
const END = (c) => CLIP(c)[1];
const tiny = (S, x, gy, o = {}) => dave(S, x, gy, "near", Object.assign({ s: 0.8 }, o)); // Dave at five millimetres: a small figure against big props
const COAT = { s: 1.1, hair: "side", hairC: DS.c("ink", 1), outfitC: DS.c("white", 2), tieC: "navy", specs: true };
// both arms straight up, hands together over the head, to hold something overhead (rice rests on the hands)
const HOLD = { armL: [[-30, -70], [-28, -160]], armR: [[30, -70], [28, -160]] };
const riceUp = (S, F, k, parent, t) => rice(S, F.cx, F.sh[1] + 10 * F.s - 160 * F.s - 24 * k, k, { rot: -4, parent, t });
const ghost = (F, a = 0.2) => { F.all.setAttribute("opacity", a); return F; };
const qCard = (S, t, o = {}) => card(S, "?", o.x ?? 1500, o.y ?? 300, { t, tc: o.tc || "red", size: DS.type.title });
// ===================== 1. Five millimetres =====================
// Dave has just shrunk himself to five millimetres tall. He's standing on the breakfast table, next to a toast crumb bigger than his head.
{ const S = sc(1, 0, { cam: "push", focus: "900 640" }); tbl(S, DS.room(S, TBL));
  const F = tiny(S, 700, 940, { look: 6, mood: "wow" });
  crumb(S, 1200, 940, 1.35);
  card(S, "5 MM TALL", 700, 560, { t: W(1, 6) });
  card(S, "TOAST CRUMB", 1200, 640, { t: W(1, 18), tc: "red" });
  DS.vignette(S); }

// That's three hundred and fifty times shorter than this morning, about the size of a black garden ant.
{ const S = sc(2, 0, { cam: "push", focus: "960 620" }); tbl(S, DS.room(S, TBL));
  const G = ghost(dave(S, 280, 1300, "near", { s: 3.6, mood: "smile", look: 3 }), 0.18);
  const F = tiny(S, 820, 940, { look: 5, mood: "flat" });
  const A = ant(S, 1330, 940, 1.15, { face: "smile", look: -3, dir: -1 }); A.walkIn(W(2, 11), 1.8, 760);
  card(S, "350× SHORTER", 960, 190, { t: W(2, 1) });
  card(S, "THIS MORNING", 280, 440, { t: W(2, 8), size: DS.type.caption });
  card(S, "ANT SIZE", 1330, 640, { t: W(2, 15), tc: "red" });
  DS.vignette(S); }

// So what would really happen if you shrank to the size of an ant? The shrink ray needs until dinner to recharge, so Dave is about to find out.
{ const S = sc(3, 0, { cam: "push", focus: "900 620" }); tbl(S, DS.room(S, TBL));
  const R = ray(S, 520, 960, 1.35, { level: 0.08, c: "orange" }); R.charge(W(3, 17), CLIP(3)[1] - W(3, 17) - 0.5, 0.08, 0.2);
  const F = tiny(S, 1350, 940, { look: -6, mood: "worried" });
  card(S, "WHAT WOULD REALLY HAPPEN?", 960, 190, { t: W(3, 1) });
  card(S, "SHRINK RAY", 520, 600, { t: W(3, 15), size: DS.type.caption });
  card(S, "RECHARGING UNTIL DINNER", 960, 330, { t: W(3, 18), tc: "red", size: DS.type.caption });
  DS.vignette(S); }

// Dave has seen the films, so he's made a list of dangers. Being too weak. Falling off things. Getting stepped on.
{ const S = sc(4, 0, { cam: "push", focus: "1100 560" }); tbl(S, DS.room(S, TBL));
  reel(S, 400, 360, 0.7, { t: W(4, 3) });
  dangerList(S, 1260, 540, 0.95, { rows: [W(4, 12), W(4, 15), W(4, 18)] });
  const F = tiny(S, 560, 960, { s: 1.0, look: 6, mood: "determined", pose: "hold" });
  DS.vignette(S); }

// He's underlined stepped on three times.
{ const S = sc(5, 0, { cam: "push", focus: "1100 560" }); tbl(S, DS.room(S, TBL));
  dangerList(S, 1260, 540, 0.95, { under: W(5, 1) });
  const F = tiny(S, 560, 960, { s: 1.0, look: 6, mood: "determined", pose: "point" });
  card(S, "3×", 560, 400, { t: W(5, 4), tc: "red", size: DS.type.title });
  DS.vignette(S); }

// Inside his very small head, Dave's very small brain has a different list.
{ const S = sc(6, 0, { cam: "push", focus: "1000 560" }); tbl(S, DS.room(S, TBL));
  const F = tiny(S, 560, 960, { s: 1.4, look: 4, mood: "flat" });
  const g = S.grp(); S.thought(1260, 470, 420, 290, 800, 740, S.start, 0.3, { parent: g });
  const B = brainy(S, 1160, 700, 1.05, { face: "tired", armL: "hip", parent: g });
  paperR(S, 1330, 400, 190, 250, { parent: g }); lines(S, 1350, 450, 150, 4, undefined, 40, g, DS.c("red", 1));
  fadeG(S, g, W(6, 5));
  card(S, "A DIFFERENT LIST", 1260, 190, { t: W(6, 8) });
  DS.vignette(S); }

// "Getting stepped on is the least of your problems, Dave." (Brain)
{ const S = sc(7, 0, { cam: "push", focus: "1000 560" }); tbl(S, DS.room(S, TBL));
  const F = tiny(S, 760, 960, { s: 1.4, look: 3, mood: "worried" });
  const top = 960 - 1.4 * 309 - 70, B = brainy(S, 760, top + 6, 0.95, { face: "stern", armR: "stop", armL: "hip" }); B.enter(W(7, 0) - 0.2, 0, 60, 0.5); B.talk(W(7, 0), END(7)); B.face(W(7, 5), "tired");
  card(S, "THE LEAST OF YOUR PROBLEMS", 1350, 420, { t: W(7, 5), tc: "red", size: DS.type.small });
  DS.vignette(S); }

// By lunchtime, one drop of water could hold him prisoner. By evening, his own body heat is running away, and he can't see where he's going.
{ const S = sc(8, 0, { cam: "push", focus: "960 560" }); DS.room(S, { wall: "earth", floor: "wood", window: false });
  [[420, "BY LUNCH", W(8, 0)], [960, "BY EVENING", W(8, 10)], [1500, "AND…", W(8, 19)]].forEach(([x, hd, t], i) => {
    const p = panel(S, x, 540, 480, 560, T0(S), "white"); fadeG(S, p, t);
    const ig = S.grp(); fadeG(S, ig, t + 0.2);
    S.text(hd, x, 330, { size: DS.type.small, c: DS.c("red", 2), t: T0(S), parent: ig });
    if (i === 0) { dome(S, x, 660, 150, 190, { parent: ig }); S.text("1 DROP", x, 780, { size: DS.type.small, c: DS.P.ink[0], t: T0(S), parent: ig }); }
    if (i === 1) { [-70, 0, 70].forEach((dx) => S.draw(`M${x + dx} 640 Q${x + dx + 26} 590 ${x + dx} 540 Q${x + dx - 26} 490 ${x + dx} 440`, S.start, 0, { c: DS.c("red", 0), w: DS.w.near, parent: ig })); thermo(S, x, 600, 160, 0.12, { c: "sky", parent: ig }); S.text("HEAT LEAKS", x, 800, { size: DS.type.small, c: DS.P.ink[0], t: T0(S), parent: ig }); }
    if (i === 2) { S.draw(circ(x, 540, 120, 70), S.start, 0, { fill: DS.P.white[0], c: DS.P.ink[0], w: DS.w.near, parent: ig }); S.draw(circ(x, 540, 38), S.start, 0, { fill: DS.c("blue", 0), c: DS.P.ink[0], w: DS.w.mid, parent: ig }); S.text("?", x, 700, { size: DS.type.display, c: DS.c("red", 2), t: T0(S), parent: ig }); S.text("CAN'T SEE", x, 810, { size: DS.type.small, c: DS.P.ink[0], t: T0(S), parent: ig }); }
  });
  DS.vignette(S); }

// Physicists say shrink rays are impossible, so let's pretend every part of Dave shrank evenly, and not tell the physicists.
{ const S = sc(9, 0, { cam: "push", focus: "1000 600" }); tbl(S, DS.room(S, TBL));
  [1180, 1400, 1620].forEach((x) => who(S, x, 860, "mid", Object.assign({}, COAT, { s: 1.0, pose: "cross", mood: "flat", look: -5 })));
  card(S, "PHYSICISTS", 1400, 330, { t: W(9, 0), size: DS.type.caption });
  const R = ray(S, 540, 900, 0.9, { level: 0.1, c: "orange" });
  stamp(S, 540, 560, "IMPOSSIBLE", W(9, 5), "red", { size: DS.type.small });
  const F = tiny(S, 880, 960, { s: 1.0, look: 4, mood: "smile", pose: "think" });
  card(S, "SHH", 880, 540, { t: W(9, 15), tc: "red", size: DS.type.caption });
  DS.vignette(S); }


// ===================== 2. Pound for pound =====================
const dashed = (p, a = 14, b = 12) => { p.removeAttribute("pathLength"); p.setAttribute("stroke-dasharray", `${a} ${b}`); return p; };
// "was big, now small": a dashed ghost of the old size and a small solid copy. kind: tall | square | blob
const shrinkIcon = (S, x, y, kind, parent) => {
  const ink = DS.c("gray", 2);
  if (kind === "tall") { dashed(S.draw(rrect(x - 40, y - 150, 80, 300, DS.r.sm), S.start, 0, { c: ink, w: DS.w.mid, parent })); mini(S, x + 90, y + 150, 0.9, { parent, w: DS.w.near, c: DS.c("blue", 2) }); }
  if (kind === "square") { dashed(S.draw(rect(x - 120, y - 120, 240, 240), S.start, 0, { c: ink, w: DS.w.mid, parent })); S.draw(rect(x - 20, y + 80, 40, 40), S.start, 0, { fill: DS.c("pink", 0), c: DS.P.ink[0], w: DS.w.mid, parent }); }
  if (kind === "blob") { dashed(S.draw(circ(x, y, 130, 120), S.start, 0, { c: ink, w: DS.w.mid, parent })); S.draw(circ(x, y + 100, 9), S.start, 0, { fill: DS.c("blue", 0), c: DS.P.ink[0], w: DS.w.detail, parent }); }
};
// a balance: beam level at (cx, cy), pans hang 220 below; returns the two pan centres
const balance = (S, cx, cy, hw, o = {}) => {
  const g = S.grp(o.parent), py = cy + 230;
  DS.shape(S, `M${cx - 110} 900 L${cx - 40} ${cy + 40} H${cx + 40} L${cx + 110} 900 Z`, "gray", { w: "mid", parent: g });
  DS.shape(S, rrect(cx - hw, cy - 18, hw * 2, 36, DS.r.sm), "wood", { w: "mid", parent: g });
  DS.shape(S, circ(cx, cy, 26), "gold", { w: "mid", parent: g });
  [-1, 1].forEach((sd) => { const px = cx + sd * hw; S.draw(`M${px} ${cy + 10} L${px - 150} ${py} M${px} ${cy + 10} L${px + 150} ${py}`, S.start, 0, { c: DS.c("gray", 2), w: DS.w.mid, parent: g }); DS.shape(S, `M${px - 170} ${py} H${px + 170} Q${px + 150} ${py + 50} ${px} ${py + 56} Q${px - 150} ${py + 50} ${px - 170} ${py} Z`, "gold", { w: "mid", parent: g }); });
  return { g, left: [cx - hw, py], right: [cx + hw, py] };
};
const bathScale = (S, cx, gy, read, o = {}) => {
  const g = S.grp(o.parent);
  DS.shadow(S, cx, gy + 2, 420, { parent: g });
  DS.shape(S, rrect(cx - 230, gy - 70, 460, 70, DS.r.sm), "white", { w: "near", parent: g });
  DS.shape(S, rrect(cx - 110, gy - 58, 220, 46, DS.r.xs), "glass", { w: "detail", flat: true, parent: g });
  S.text(read, cx, gy - 22, { size: DS.type.caption, c: DS.c("red", 2), t: o.t ?? T0(S), parent: g });
  return g;
};

// In nineteen twenty-six, the biologist J B S Haldane wrote an essay called On Being the Right Size. It explains most of Dave's day.
{ const S = sc(10, 0, { cam: "push", focus: "900 600" }); tbl(S, DS.room(S, TBL));
  const bk = hardback(S, 640, 560, 430, 580, ["ON BEING", "THE RIGHT", "SIZE"], { t: W(10, 11) });
  card(S, "1926", 1250, 330, { t: W(10, 2), tc: "red" });
  card(S, "J B S HALDANE", 1250, 470, { t: W(10, 5), size: DS.type.small });
  card(S, "EXPLAINS DAVE'S DAY", 1250, 610, { t: W(10, 19), size: DS.type.caption });
  const F = tiny(S, 1550, 960, { s: 0.9, look: -5, mood: "smile" });
  DS.vignette(S); }

// Dave is three hundred and fifty times shorter. But he has about a hundred and twenty thousand times less skin, and he's about forty-three million times lighter.
{ const S = sc(11, 0, { cam: "push", focus: "960 560" }); DS.room(S, { wall: "sand", floor: "wood", window: false });
  [[330, "tall", 350, "SHORTER", W(11, 2), "×"], [960, "square", 122500, "LESS SKIN", W(11, 13), "×"], [1590, "blob", 42875000, "LIGHTER", W(11, 22), "×"]].forEach(([x, kind, n, lab, t, u]) => {
    const p = panel(S, x, 520, 520, 640, T0(S)); fadeG(S, p, t - 0.2);
    const ig = S.grp(); fadeG(S, ig, t);
    shrinkIcon(S, x, 600, kind, ig);
    countUp(S, x, 340, 0, n, t, 1.4, { size: DS.type.body, c: DS.c("red", 2), t0: t, parent: ig, fmt: (v) => Math.round(v).toLocaleString("en-US") + u });
    S.text(lab, x, 800, { size: DS.type.small, c: DS.P.ink[0], t: T0(S), parent: ig });
  });
  DS.vignette(S); }

// He used to weigh seventy kilos. Now he weighs less than two milligrams, about the same as a mosquito.
{ const S = sc(12, 0, { cam: "push", focus: "960 600" }); tbl(S, DS.room(S, TBL), false);
  const Bl = balance(S, 960, 420, 400);
  const F = tiny(S, Bl.left[0], Bl.left[1] + 4, { s: 0.55, look: 4, mood: "smile" });
  const M = mosquito(S, Bl.right[0], Bl.right[1] - 36, 1.1); fadeG(S, M, W(12, 17), 0.5);
  card(S, "70 KG", 560, 190, { t: W(12, 4), size: DS.type.title });
  S.draw(`M410 205 L700 175`, W(12, 5) + 0.6, 0, { c: DS.c("red", 0), w: DS.w.near });
  card(S, "1.63 MG", 960, 190, { t: W(12, 9), size: DS.type.title, tc: "red" });
  card(S, "A MOSQUITO", 1400, 330, { t: W(12, 17), size: DS.type.small });
  DS.vignette(S); }

// Dave has lost weight. Nearly all of it.
{ const S = sc(13, 0, { cam: "push", focus: "960 620" }); tbl(S, DS.room(S, TBL), false);
  bathScale(S, 960, 960, "1.63 MG");
  const F = tiny(S, 960, 890, { s: 0.9, look: 0, mood: "smile", pose: "armsUp" });
  card(S, "LOST WEIGHT", 960, 330, { t: W(13, 0), tc: "green" });
  card(S, "NEARLY ALL OF IT", 960, 470, { t: W(13, 4), size: DS.type.caption });
  DS.vignette(S); }

// Here's the good news. A muscle's strength depends on how big it is across, and that's an area, so it shrank far less than his weight.
{ const S = sc(14, 0, { cam: "push", focus: "960 560" }); DS.room(S, { wall: "sand", floor: "wood", window: false });
  const pan = panel(S, 960, 520, 1700, 700, T0(S));
  const L = S.grp(), Rr = S.grp(); fadeG(S, L, W(14, 9)); fadeG(S, Rr, W(14, 20));
  // muscle cross-section: area
  DS.shape(S, circ(500, 500, 130), "red", { flat: true, w: "near", parent: L }); S.text("MUSCLE", 500, 700, { size: DS.type.small, c: DS.P.ink[0], t: T0(S), parent: L });
  S.draw(`M650 500 H790`, S.start, 0, { c: DS.P.ink[0], w: DS.w.near, parent: L }); S.draw(arrowHead(790, 500, 0, 28), S.start, 0, { c: DS.P.ink[0], w: DS.w.near, parent: L });
  DS.shape(S, circ(880, 500, 40), "red", { flat: true, w: "near", parent: L });
  txt(S, "÷ 122,500", 880, 610, { size: DS.type.caption, c: DS.c("red", 2), t: W(14, 15), parent: L });
  card(S, "AREA", 700, 250, { t: W(14, 15), size: DS.type.small, parent: undefined });
  // weight: volume, shrinks far more
  DS.shape(S, rect(1130, 380, 190, 190), "blue", { w: "near", parent: Rr }); DS.shape(S, `M1130 380 L1170 340 H1360 L1320 380 Z`, "blue", { flat: true, tone: 1, w: "near", parent: Rr }); DS.shape(S, `M1320 380 L1360 340 V530 L1320 570 Z`, "blue", { flat: true, tone: 2, w: "near", parent: Rr });
  S.text("WEIGHT", 1240, 700, { size: DS.type.small, c: DS.P.ink[0], t: T0(S), parent: Rr });
  S.draw(`M1420 480 H1560`, S.start, 0, { c: DS.P.ink[0], w: DS.w.near, parent: Rr }); S.draw(arrowHead(1560, 480, 0, 28), S.start, 0, { c: DS.P.ink[0], w: DS.w.near, parent: Rr });
  S.fill(circ(1640, 480, 6), S.start, 0, DS.c("blue", 0), 1, Rr);
  txt(S, "÷ 42,875,000", 1560, 610, { size: DS.type.caption, c: DS.c("red", 2), t: W(14, 20), parent: Rr });
  DS.vignette(S); }

// On paper, pound for pound, Dave is now about three hundred and fifty times stronger.
{ const S = sc(15, 0, { cam: "push", focus: "900 620" }); tbl(S, DS.room(S, TBL), false);
  const F = tiny(S, 620, 960, { s: 1.2, look: 3, mood: "determined", pose: "armsUp" });
  card(S, "ON PAPER", 1250, 330, { t: W(15, 0), size: DS.type.small });
  card(S, "POUND FOR POUND", 1250, 460, { t: W(15, 2), size: DS.type.caption });
  countUp(S, 1250, 700, 0, 350, W(15, 9), 1.4, { size: DS.type.display, c: DS.c("red", 2), t0: W(15, 9), fmt: (v) => Math.round(v) + "×" });
  card(S, "STRONGER", 1250, 790, { t: W(15, 13), tc: "red", size: DS.type.small });
  DS.vignette(S); }

// He lifts a grain of rice, more than ten times his own weight, and holds it over his head so everyone can see.
{ const S = sc(16, 0, { cam: "push", focus: "900 560" }); tbl(S, DS.room(S, TBL));
  const F = tiny(S, 900, 960, { s: 1.0, look: 0, mood: "determined", pose: "stand", ...HOLD });
  const r = riceUp(S, F, 1.3); fadeG(S, r, W(16, 3), 0.4);
  card(S, "RICE", 520, 330, { t: W(16, 3), size: DS.type.small });
  card(S, ">10× HIS WEIGHT", 1330, 400, { t: W(16, 6), tc: "red", size: DS.type.small });
  DS.vignette(S); }

// A black garden ant walks past, carrying something bigger.
{ const S = sc(17, 0, { cam: "push", focus: "900 600" }); tbl(S, DS.room(S, TBL));
  const F = tiny(S, 520, 960, { s: 1.0, look: 5, mood: "smile", pose: "stand", ...HOLD }); riceUp(S, F, 1.3);
  const A = ant(S, 1240, 880, 1.25, { face: "smile", look: -3, dir: -1 }); A.walkIn(W(17, 3), 2.4, 900);
  carrySeed(S, A.XA(8), A.YA(-190), 1.4, A.g);
  card(S, "BIGGER", 1240, 330, { t: W(17, 7), tc: "red" });
  DS.vignette(S); }

// "Cute. We carry those all day, Dave." (kid)
{ const S = sc(18, 0, { cam: "push", focus: "1000 640" }); tbl(S, DS.room(S, TBL), false);
  [[1320, 800, 0.55], [1520, 800, 0.55], [1720, 800, 0.55]].forEach(([x, y, k]) => { const a = ant(S, x, y, k, { face: "smile", dir: -1 }); carrySeed(S, a.XA(8), a.YA(-190), k * 0.75, a.g); });
  const F = tiny(S, 420, 960, { s: 1.0, look: 6, mood: "sad" });
  const A = ant(S, 1060, 960, 1.8, { face: "cheeky", look: -3, dir: -1 }); A.talk(W(18, 0), END(18)); A.face(W(18, 4), "smile");
  carrySeed(S, A.XA(8), A.YA(-190), 2.0, A.g);
  card(S, "ALL DAY", 1060, 190, { t: W(18, 4), tc: "red" });
  DS.vignette(S); }

// In twenty ten, a prize-winning photo by the Cambridge scientist Thomas Endlein showed a weaver ant upside down on a glass-like surface, holding a weight a hundred times its own in its jaws.
{ const S = sc(19, 0, { cam: "push", focus: "960 560" }); DS.room(S, { wall: "earth", floor: "wood", window: false });
  DS.drop(S, rrect(250, 150, 1420, 720, DS.r.sm));
  DS.shape(S, rrect(230, 130, 1420, 720, DS.r.sm), "wood", { w: "near" });
  S.draw(rect(280, 180, 1320, 620), S.start, 0, { fill: DS.vgrad(DS.c("sky", 1), DS.c("grass", 1)), c: DS.P.ink[0], w: DS.w.detail });
  S.fill(rect(280, 250, 1320, 70), S.start, 0, DS.P.glass[1], 0.7); S.draw(`M280 320 H1600`, S.start, 0, { c: DS.c("sky", 2), w: DS.w.mid });
  S.draw(`M330 270 Q420 255 500 262`, S.start, 0, { c: DS.P.white[0], w: DS.w.near });
  const A = ant(S, 760, 320, 1.7, { face: "worried", dir: 1, flip: true, body: "orange" }); fadeG(S, A.g, W(19, 14), 0.5);
  const wt = S.grp(); fadeG(S, wt, W(20, 0), 0.4);
  S.draw(`M862 425 L1010 560`, S.start, 0, { c: DS.P.ink[0], w: DS.w.mid, parent: wt });
  DS.shape(S, rrect(900, 560, 220, 170, DS.r.sm), "gray", { w: "near", tone: 2, parent: wt }); S.text("100\u00D7", 1010, 670, { size: DS.type.title, c: DS.P.white[0], t: T0(S), parent: wt });
  card(S, "2010", 450, 80 + 130, { t: W(19, 1), size: DS.type.caption });
  card(S, "CAMBRIDGE", 960, 940, { t: W(19, 8), size: DS.type.caption });
  card(S, "THOMAS ENDLEIN", 1450, 940, { t: W(19, 10), size: DS.type.caption });
  card(S, "100× ITS OWN WEIGHT", 1240, 190, { t: W(20, 3), tc: "red", size: DS.type.small });
  DS.vignette(S); }

// Dave crosses too weak off his list. So far, being tiny is going brilliantly.
{ const S = sc(21, 0, { cam: "push", focus: "1100 560" }); tbl(S, DS.room(S, TBL));
  dangerList(S, 1260, 540, 0.95, { strike: [W(21, 2)] });
  const F = tiny(S, 560, 960, { s: 1.0, look: 6, mood: "smile", pose: "wave" });
  card(S, "SO FAR: BRILLIANT", 560, 330, { t: W(21, 7), tc: "green", size: DS.type.caption });
  DS.vignette(S); }


// ===================== 3. The fall =====================
// the table edge in side view. Top surface at y 640; edge at x 1180; the leg is broken (zigzag) because the table is a very long way up. Call as tableEdge(S, DS.room(S, TBL2)).
const TBL2 = { wall: "wall", floor: "floor", window: false, back: [0, 0, 1920, 1000] };
const tableEdge = (S) => {
  const g = S.grp(); S.g.insertBefore(g, S.g.firstChild.nextSibling);
  DS.shape(S, rect(-100, 640, 1280, 56), "wood", { w: "near", parent: g, tone: 1 });
  DS.shape(S, rect(-100, 696, 1280, 96), "wood", { w: "near", parent: g, tone: 2, flat: true });
  DS.shape(S, rect(1020, 792, 80, 90), "wood", { w: "near", parent: g, tone: 2, flat: true });
  S.draw(`M1000 882 L1040 904 L1000 926 L1040 948 L1000 970 L1120 970 L1080 948 L1120 926 L1080 904 L1120 882 Z`, S.start, 0, { fill: DS.P.paper[0], c: DS.P.ink[0], w: DS.w.mid, parent: g });
  DS.shape(S, rect(1020, 970, 80, 130), "wood", { w: "near", parent: g, tone: 2, flat: true });
  return g;
};
const shaft = (S) => { // a mine shaft in cross-section: vertical shaft with a tunnel off the bottom, in the ground of DS.outdoor
  const g = S.grp();
  DS.shape(S, `M700 250 H860 V640 H1960 V830 H700 Z`, "brown", { w: "mid", parent: g, tone: 2, flat: true });
  DS.shape(S, rect(660, 200, 20, 90), "wood", { w: "mid", parent: g }); DS.shape(S, rect(880, 200, 20, 90), "wood", { w: "mid", parent: g }); DS.shape(S, rect(650, 190, 260, 24), "wood", { w: "mid", parent: g });
  return g;
};
const dazed = (S, cx, cy, t0, t1) => { // slow circling stars: no blinking
  const g = S.grp(); tl.to(g, { opacity: 0, duration: 0.4 }, t1 - 0.4); [0, 1, 2].forEach((i) => { const a = (i / 3) * 360; const sg = S.grp(g); S.draw(`M0 -16 L5 -5 L17 -5 L8 3 L11 15 L0 8 L-11 15 L-8 3 L-17 -5 L-5 -5 Z`, S.start, 0, { fill: DS.c("yellow", 0), c: DS.c("gold", 2), w: DS.w.detail, parent: sg }); tl.fromTo(sg, { attr: { transform: `translate(${cx} ${cy}) rotate(${a}) translate(46 0) rotate(${-a})` } }, { attr: { transform: `translate(${cx} ${cy}) rotate(${a + 360}) translate(46 0) rotate(${-a - 360})` }, duration: 3.2, ease: "none", repeat: Math.ceil((t1 - t0) / 3.2), immediateRender: true }, t0); }); return g; };
const skydiver = (S, cx, cy, k = 1, o = {}) => {
  const g = S.grp(o.parent), INKC = DS.P.ink[0], w = DS.w.near * Math.sqrt(k);
  S.draw(`M${cx - 70 * k} ${cy - 40 * k} L${cx - 150 * k} ${cy - 90 * k} M${cx + 70 * k} ${cy - 40 * k} L${cx + 150 * k} ${cy - 90 * k} M${cx - 30 * k} ${cy + 60 * k} L${cx - 90 * k} ${cy + 140 * k} M${cx + 30 * k} ${cy + 60 * k} L${cx + 90 * k} ${cy + 140 * k}`, o.t ?? S.start, 0, { c: DS.c("red", 0), w: w * 1.5, parent: g });
  DS.shape(S, rrect(cx - 56 * k, cy - 60 * k, 112 * k, 140 * k, 40 * k), "red", { t: o.t, w: "near", parent: g });
  S.draw(circ(cx, cy - 96 * k, 36 * k), o.t ?? S.start, 0, { fill: DS.P.paper[0], c: INKC, w: w, parent: g });
  S.draw(`M${cx - 28 * k} ${cy - 112 * k} H${cx + 28 * k} V${cy - 94 * k} H${cx - 28 * k} Z`, o.t ?? S.start, 0, { fill: DS.c("glass", 1), c: INKC, w: DS.w.detail, parent: g });
  return g;
};
const windLines = (S, x0, y0, x1, y1, n, parent, c) => { for (let i = 0; i < n; i++) { const x = x0 + ((x1 - x0) * i) / Math.max(1, n - 1); S.draw(`M${x} ${y0 + (i % 2) * 40} V${y1 - (i % 3) * 30}`, S.start, 0, { c: c || DS.c("sky", 2), w: DS.w.mid, parent, op: 0.7 }); } };

// Dave turns to show the ant his rice and walks straight off the edge of the table.
{ const S = sc(22, 0, { cam: "push", focus: "900 640" }); tableEdge(S, DS.room(S, TBL2));
  const A = ant(S, 380, 640, 1.1, { face: "smile", look: 3, dir: 1 });
  const F = dave(S, 760, 640, "near", { s: 0.8, look: -6, mood: "smile", pose: "stand", float: true, ...HOLD });
  const rg = S.grp(); riceUp(S, F, 1.1, rg);
  F.walk(W(22, 9), 2.0, { x: 480, y: 0 }, 0.35); tl.to(rg, { x: 480, y: 0, duration: 2.0, ease: "none" }, W(22, 9));
  card(S, "THE EDGE", 1000, 750, { t: W(22, 13), tc: "red", size: DS.type.caption });
  DS.vignette(S); }

// He didn't see the edge coming. Remember that.
{ const S = sc(23, 0, { cam: "push", focus: "1100 700" }); tableEdge(S, DS.room(S, TBL2));
  const F = dave(S, 1120, 640, "near", { s: 0.9, look: 4, mood: "wow", pose: "stand", float: true, ...HOLD });
  const rg = S.grp(); riceUp(S, F, 1.2, rg);
  card(S, "!", 1330, 440, { t: W(23, 2), tc: "red", size: DS.type.title });
  stamp(S, 600, 380, "REMEMBER THAT", W(23, 6), "red", { size: DS.type.small });
  DS.vignette(S); }

// Haldane wrote that you can drop a mouse down a thousand-yard mine shaft, and at the bottom, it gets a slight shock and walks away.
{ const S = sc(24, 0, { cam: "push", focus: "980 560" }); DS.outdoor(S, { hy: 250, sky: "sky", sun: false, hills: "grass", ground: "earth" }); shaft(S);
  const M = rodent(S, 780, 826, 1.3, {}); const mg = M; tl.fromTo(mg, { attr: { transform: "translate(0 0)" } }, { attr: { transform: "translate(1000 0)" }, duration: 2.6, ease: "none", immediateRender: false }, W(24, 22));
  dazed(S, 790, 668, S.start, W(24, 22));
  S.draw(`M930 270 V620 M910 290 L930 262 L950 290 M910 600 L930 628 L950 600`, S.start, 0, { c: DS.P.white[0], w: DS.w.mid });
  card(S, "1,000 YARDS", 1180, 440, { t: W(24, 10), size: DS.type.small });
  card(S, "A SLIGHT SHOCK", 1180, 600, { t: W(24, 19), size: DS.type.caption });
  card(S, "HALDANE", 1500, 190, { t: W(24, 0), size: DS.type.caption });
  DS.vignette(S); }

// He didn't explain how he knew. Please don't check.
{ const S = sc(25, 0, { cam: "push", focus: "980 560" }); DS.outdoor(S, { hy: 250, sky: "sky", sun: false, hills: "grass", ground: "earth" }); shaft(S);
  rodent(S, 1700, 826, 1.3, {});
  card(S, "HOW DID HE KNOW?", 960, 420, { t: W(25, 2), size: DS.type.small });
  stamp(S, 1240, 600, "PLEASE DON'T CHECK", W(25, 6), "red", { size: DS.type.small });
  DS.vignette(S); }

// Here's why. Air pushes back on your surface, but gravity pulls on your weight, and Dave lost far more weight than surface.
{ const S = sc(26, 0, { cam: "push", focus: "960 540" }); DS.outdoor(S, { hy: 760, sky: "sky", sun: false, hills: "grass", ground: "grass" });
  const F = dave(S, 960, 640, "near", { s: 0.8, look: 0, mood: "wow", pose: "armsUp", float: true });
  [-210, -110, 110, 210].forEach((dx, i) => { const g = S.grp(); S.draw(`M${960 + dx} 860 V730`, S.start, 0, { c: DS.c("blue", 0), w: DS.w.near * 1.4, parent: g }); S.draw(arrowHead(960 + dx, 730, -Math.PI / 2, 30), S.start, 0, { c: DS.c("blue", 0), w: DS.w.near * 1.4, parent: g }); fadeG(S, g, W(26, 2) + i * 0.15); });
  card(S, "AIR PUSHES ON SURFACE", 960, 190, { t: W(26, 2), tc: "blue", size: DS.type.small });
  const gg = S.grp(); S.draw(`M1250 340 V450`, S.start, 0, { c: DS.c("red", 0), w: DS.w.near * 1.4, parent: gg }); S.draw(arrowHead(1250, 450, Math.PI / 2, 26), S.start, 0, { c: DS.c("red", 0), w: DS.w.near * 1.4, parent: gg }); fadeG(S, gg, W(26, 9));
  card(S, "GRAVITY PULLS ON WEIGHT", 1470, 300, { t: W(26, 9), tc: "red", size: DS.type.caption });
  DS.vignette(S); }

// A skydiver falls at about two hundred kilometres an hour. Tiny Dave tops out at roughly jogging speed, almost at once.
{ const S = sc(27, 0, { cam: "push", focus: "960 540" }); DS.outdoor(S, { hy: 640, sky: "sky", sun: false, hills: "grass", ground: "grass" });
  panel(S, 480, 500, 760, 700, T0(S)); const pr = panel(S, 1440, 500, 760, 700, T0(S)); fadeG(S, pr, W(27, 9));
  const L = S.grp(); fadeG(S, L, W(27, 1));
  windLines(S, 280, 250, 700, 800, 6, L); skydiver(S, 480, 520, 1.1, { parent: L });
  countUp(S, 480, 280, 0, 200, W(27, 5), 1.4, { size: DS.type.title, c: DS.c("red", 2), t0: W(27, 4), parent: L, fmt: (v) => Math.round(v) + " KM/H" });
  const F = tiny(S, 1440, 820, { s: 1.0, look: 6, mood: "happy", float: true }); F.walk(W(27, 12), 3.2, { x: 130, y: 0 }, 0.35);
  card(S, "JOGGING SPEED", 1440, 280, { t: W(27, 16), tc: "green", size: DS.type.small });
  card(S, "ALMOST AT ONCE", 1440, 400, { t: W(27, 18), size: DS.type.caption });
  card(S, "SKYDIVER", 480, 800, { t: W(27, 1), size: DS.type.caption });
  card(S, "TINY DAVE", 1440, 880, { t: W(27, 10), size: DS.type.caption });
  DS.vignette(S); }

// So a table, a roof or a skyscraper makes no difference. Tiny Dave lands at a jog.
{ const S = sc(28, 0, { cam: "push", focus: "960 600" }); DS.outdoor(S, { hy: 700, sky: "sky", sun: false, hills: "grass", ground: "grass" });
  const T = S.grp(), Hh = S.grp(), K = S.grp(); fadeG(S, T, W(28, 2)); fadeG(S, Hh, W(28, 4)); fadeG(S, K, W(28, 7));
  // table
  DS.shape(S, rect(250, 540, 340, 36), "wood", { w: "near", parent: T }); [270, 540].forEach((x) => DS.shape(S, rect(x, 576, 30, 200), "wood", { w: "near", parent: T, tone: 2, flat: true }));
  S.text("TABLE", 420, 480, { size: DS.type.small, c: DS.P.ink[0], t: T0(S), parent: T });
  // house with a roof
  DS.shape(S, rect(720, 540, 300, 236), "wall", { w: "near", parent: Hh, tone: 2, flat: true }); DS.shape(S, `M690 540 L870 400 L1050 540 Z`, "red", { w: "near", parent: Hh }); DS.shape(S, rect(840, 660, 60, 116), "wood", { w: "mid", parent: Hh });
  S.text("ROOF", 870, 350, { size: DS.type.small, c: DS.P.ink[0], t: T0(S), parent: Hh });
  // skyscraper
  DS.shape(S, rect(1500, 190, 190, 586), "blue", { w: "near", parent: K, tone: 2, flat: true });
  for (let r = 0; r < 8; r++) for (let c = 0; c < 3; c++) S.fill(rect(1520 + c * 56, 220 + r * 68, 36, 40), S.start, 0, DS.c("sky", 1), 1, K);
  S.text("SKYSCRAPER", 1595, 150, { size: DS.type.caption, c: DS.P.ink[0], t: T0(S), parent: K });
  const F = tiny(S, 700, 960, { s: 0.9, look: 7, mood: "happy", float: true }); F.walk(W(28, 11), 2.4, { x: 560, y: 0 }, 0.35);
  card(S, "SAME LANDING", 960, 880, { t: W(28, 13), tc: "green", size: DS.type.small });
  DS.vignette(S); }

// "I can't be crushed. I can't be broken. I'm a superhero." (Dave)
{ const S = sc(29, 0, { cam: "push", focus: "960 600" }); garden(S, DS.outdoor(S, GARD.morning));
  // cape first, so it sits behind him
  S.draw(`M870 560 Q760 760 700 940 Q800 900 850 960 Q930 880 1010 960 Q1060 880 1130 920 Q1090 740 1050 560 Z`, S.start, 0, { fill: DS.c("red", 0), c: DS.P.ink[0], w: DS.w.near });
  const F = tiny(S, 960, 940, { s: 1.45, look: 0, mood: "determined", pose: "hips", hair: "side" }); talk(S, F, W(29, 0), END(29));
  card(S, "I'M A SUPERHERO", 960, 190, { t: W(29, 8), tc: "red" });
  DS.vignette(S); }


// ===================== 4. A drop of water =====================
// By late morning, Dave is out in the garden, like the kids in the films, and it starts to rain.
{ const S = sc(30, 0, { cam: "push", focus: "960 640" }); garden(S, DS.outdoor(S, GARD.rain));
  const cl = S.grp(); cloudy(S, 1300, 190, 1.7, { parent: cl }); cloudy(S, 500, 230, 1.3, { parent: cl, tone: 2 }); fadeG(S, cl, W(30, 15), 0.9);
  streaks(S, 150, 1800, 330, 600, 26, W(30, 17));
  const F = tiny(S, 900, 930, { s: 0.9, look: 5, mood: "smile" });
  const A = ant(S, 1300, 930, 1.1, { face: "smile", look: -2, dir: -1 });
  card(S, "LATE MORNING", 960, 190, { t: W(30, 1), size: DS.type.small });
  DS.vignette(S); }

// To Dave, every raindrop is a water balloon up to fifty times his weight, falling at six to nine metres a second.
{ const S = sc(31, 0, { cam: "push", focus: "960 600" }); garden(S, DS.outdoor(S, GARD.rain));
  const F = tiny(S, 560, 930, { s: 0.9, look: 6, mood: "worried" });
  [[1000, 360, 2.4], [1350, 470, 2.0], [1700, 330, 2.2]].forEach(([x, y, k], i) => { const g = tear(S, x, y, k, { t: undefined }); fadeG(S, g, W(31, 3) + i * 0.2, 0.4); });
  card(S, "A WATER BALLOON", 1150, 190, { t: W(31, 5), size: DS.type.small });
  card(S, "UP TO 50× HIS WEIGHT", 1250, 680, { t: W(31, 8), tc: "red", size: DS.type.small });
  card(S, "6–9 M/S", 1250, 810, { t: W(31, 16), size: DS.type.small });
  DS.vignette(S); }

// In twenty twelve, a team at Georgia Tech filmed mosquitoes being hit by raindrops. They survived, because they're so light the drop barely slows down.
{ const S = sc(32, 0, { cam: "push", focus: "960 560" }); garden(S, DS.outdoor(S, GARD.rain), { blades: false });
  streaks(S, 150, 1800, 100, 500, 18);
  const m = mosquito(S, 900, 640, 2.0);
  const d = tear(S, 1080, 470, 2.2); tl.fromTo(d, { y: -70 }, { y: 40, duration: 1.6, ease: "power1.out", immediateRender: false }, W(32, 11));
  card(S, "GEORGIA TECH, 2012", 960, 190, { t: W(32, 1), size: DS.type.small });
  cam(S, 330, 460, 1.1, { t: W(32, 8) }); 
  const ck = S.grp(); tick(S, 1400, 760, 1.6, W(32, 14), "green", ck); fadeG(S, ck, W(32, 14), 0.3);
  card(S, "THEY SURVIVED", 1400, 640, { t: W(32, 14), tc: "green", size: DS.type.caption });
  card(S, "DROP BARELY SLOWS", 960, 900, { t: W(32, 21), size: DS.type.caption });
  DS.vignette(S); }

// Tiny Dave weighs about as much as a mosquito, so the rain can't hurt him either.
{ const S = sc(33, 0, { cam: "push", focus: "960 600" }); garden(S, DS.outdoor(S, GARD.rain));
  streaks(S, 150, 1800, 330, 700, 18);
  const F = tiny(S, 600, 930, { s: 0.9, look: 5, mood: "smile" });
  mosquito(S, 1300, 760, 1.8);
  card(S, "≈", 960, 560, { t: W(33, 2), size: DS.type.display });
  card(S, "SAME WEIGHT", 960, 190, { t: W(33, 3), size: DS.type.small });
  card(S, "RAIN CAN'T HURT HIM", 960, 330, { t: W(33, 9), tc: "green", size: DS.type.caption });
  DS.vignette(S); }

// Getting wet is a different story.
{ const S = sc(34, 0, { cam: "push", focus: "1000 640" }); garden(S, DS.outdoor(S, GARD.rain));
  leaf(S, 1100, 930, 1300, { rot: -3 }); dome(S, 1250, 880, 190, 170, {});
  const F = tiny(S, 600, 930, { s: 0.9, look: 6, mood: "worried" });
  card(S, "GETTING WET", 960, 190, { t: W(34, 0), tc: "red", size: DS.type.title });
  DS.vignette(S); }

// Dave is thirsty, so he leans into a raindrop on a leaf, and the drop grabs his whole face.
{ const S = sc(35, 0, { cam: "push", focus: "1050 640" }); garden(S, DS.outdoor(S, GARD.rain), { blades: false });
  leaf(S, 1050, 960, 1500, { rot: -2 });
  dome(S, 1300, 900, 230, 200, { clear: true });
  const F = tiny(S, 1000, 910, { s: 0.95, look: 7, mood: "flat" }); F.face(W(35, 12), "wow", 7); const [hx, hy] = F.hd;
  const fb = faceBubble(S, F, S.start, undefined); fadeG(S, fb, W(35, 14), 0.4);
  cheeks(S, F, W(35, 15));
  card(S, "THIRSTY", 700, 330, { t: W(35, 2), size: DS.type.small });
  DS.vignette(S); }

// That's surface tension. Water pulls its surface tight like a skin, and at Dave's size, that skin is strong enough to hold him.
{ const S = sc(36, 0, { cam: "push", focus: "900 640" }); garden(S, DS.outdoor(S, GARD.rain), { blades: false });
  const g = S.grp(); dome(S, 700, 900, 400, 350, { parent: g });
  [[-300, -110, 1.0], [-160, -270, 0.55], [160, -270, -0.55], [300, -110, -1.0]].forEach(([dx, dy, a]) => { const x = 700 + dx, y = 900 + dy, ex = x + Math.cos(a) * 90, ey = y - Math.abs(Math.sin(a)) * 60 - 30; S.draw(`M${x} ${y} L${ex} ${ey}`, W(36, 5), 0, { c: DS.c("red", 0), w: DS.w.near, parent: g }); S.draw(arrowHead(ex, ey, Math.atan2(ey - y, ex - x), 26), W(36, 5), 0, { c: DS.c("red", 0), w: DS.w.near, parent: g }); });
  card(S, "SURFACE TENSION", 960, 190, { t: W(36, 1), tc: "red", size: DS.type.small });
  card(S, "LIKE A SKIN", 700, 560, { t: W(36, 8), size: DS.type.caption });
  const F = tiny(S, 1500, 930, { s: 1.0, look: -3, mood: "wow" }); const fb = faceBubble(S, F, S.start); fadeG(S, fb, W(36, 18), 0.4); cheeks(S, F, W(36, 19));
  card(S, "STRONG ENOUGH TO HOLD HIM", 1450, 330, { t: W(36, 17), size: DS.type.caption });
  DS.vignette(S); }

// Haldane wrote that an insect going for a drink is in as much danger as a man leaning over a cliff in search of food.
{ const S = sc(37, 0, { cam: "push", focus: "960 600" }); DS.outdoor(S, { hy: 600, sky: "sky", sun: false, hills: "grass", ground: "grass" });
  panel(S, 480, 560, 780, 720, T0(S)); panel(S, 1440, 560, 780, 720, T0(S));
  const L = S.grp(), Rr = S.grp(); fadeG(S, L, W(37, 3)); fadeG(S, Rr, W(37, 15));
  dome(S, 560, 820, 230, 200, { parent: L, clear: false }); fly(S, 400, 700, 1.5, { parent: L }); 
  S.text("INSECT", 480, 340, { size: DS.type.small, c: DS.P.ink[0], t: T0(S), parent: L });
  DS.shape(S, `M1180 640 H1760 V900 H1180 Z`, "earth", { w: "near", parent: Rr }); DS.shape(S, rect(1560, 840, 260, 70), "earth", { w: "near", parent: Rr, tone: 2 });
  const man = S.grp(Rr); mini(S, 1560, 640, 2.2, { parent: man, c: DS.c("blue", 2), w: DS.w.near }); xf(man, 24, 1560, 640);
  DS.shape(S, circ(1690, 830, 26), "red", { w: "mid", parent: Rr });
  S.text("MAN", 1440, 340, { size: DS.type.small, c: DS.P.ink[0], t: T0(S), parent: Rr });
  card(S, "=", 960, 560, { t: W(37, 11), size: DS.type.display, tc: "red" });
  DS.vignette(S); }

// Climb out of the bath, and you carry about half a kilo of water. A wet mouse carries its own weight. A wet fly, many times its own weight.
{ const S = sc(38, 0, { cam: "push", focus: "960 600" }); DS.room(S, { wall: "sand", floor: "wood", window: false });
  [[330, 610, W(38, 4)], [960, 530, W(38, 14)], [1590, 450, W(38, 21)]].forEach(([x, y, t], i) => {
    const p = panel(S, x, y + 60, 520, 640 - i * 40, T0(S)); fadeG(S, p, t - 0.1);
    const ig = S.grp(); fadeG(S, ig, t + 0.1);
    const by = y + 60 + (640 - i * 40) / 2 - 90; // creature feet
    if (i === 0) { mini(S, x - 60, by, 2.4, { parent: ig, c: DS.c("blue", 2), w: DS.w.near }); dome(S, x + 100, by, 38, 40, { parent: ig }); S.text("½ KG", x, by - 380, { size: DS.type.title, c: DS.c("red", 2), t: T0(S), parent: ig }); S.text("BATH", x, by + 60, { size: DS.type.small, c: DS.P.ink[0], t: T0(S), parent: ig }); }
    if (i === 1) { rodent(S, x - 70, by, 1.2, { parent: ig }); dome(S, x + 100, by, 70, 74, { parent: ig }); S.text("1× ITS WEIGHT", x, by - 330, { size: DS.type.small, c: DS.c("red", 2), t: T0(S), parent: ig }); S.text("WET MOUSE", x, by + 60, { size: DS.type.small, c: DS.P.ink[0], t: T0(S), parent: ig }); }
    if (i === 2) { fly(S, x - 110, by - 20, 1.2, { parent: ig }); dome(S, x + 90, by, 140, 160, { parent: ig }); S.text("MANY× ITS WEIGHT", x, by - 330, { size: DS.type.caption, c: DS.c("red", 2), t: T0(S), parent: ig }); S.text("WET FLY", x, by + 60, { size: DS.type.small, c: DS.P.ink[0], t: T0(S), parent: ig }); }
  });
  DS.vignette(S); }

// Dave is now wearing several times his own weight in raindrop.
{ const S = sc(39, 0, { cam: "push", focus: "960 640" }); garden(S, DS.outdoor(S, GARD.rain), { blades: false });
  const F = tiny(S, 960, 930, { s: 1.1, look: 0, mood: "flat", pose: "sad" });
  const g = S.grp(); S.draw(`M${960 - 210} ${930} Q${960 - 230} ${930 - 330} 960 ${930 - 430} Q${960 + 230} ${930 - 330} ${960 + 210} 930 Z`, S.start, 0, { c: DS.c("sky", 2), w: DS.w.near, parent: g }); S.draw(`M${960 - 150} ${930 - 330} Q${960 - 140} ${930 - 400} ${960 - 60} ${930 - 410}`, S.start, 0, { c: DS.P.white[0], w: DS.w.near, parent: g });
  fadeG(S, g, W(39, 3), 0.5); cheeks(S, F, W(39, 3));
  card(S, "SEVERAL× HIS WEIGHT", 960, 190, { t: W(39, 4), tc: "red", size: DS.type.small });
  DS.vignette(S); }

// The ant grabs his arm and pulls him out.
{ const S = sc(40, 0, { cam: "push", focus: "960 640" }); garden(S, DS.outdoor(S, GARD.rain), { blades: false });
  dome(S, 1250, 930, 260, 250, { clear: true });
  const F = tiny(S, 1180, 930, { s: 1.0, look: -5, mood: "wow", pose: "reachL", float: true }); const [hx, hy] = F.hd;
  const fb = S.grp(); S.draw(circ(hx, hy, F.r * 1.55), S.start, 0, { c: DS.c("sky", 2), w: DS.w.near, parent: fb }); tl.to(fb, { opacity: 0, duration: 0.5 }, W(40, 5));
  const [ax, ay] = F.hand("L", "reachL"); const A = ant(S, ax - 40 - 52 * 1.2, 930, 1.2, { face: "worried", look: 4, dir: 1 });
  F.walk(W(40, 5), 1.6, { x: -300, y: 0 }, 0.35); A.shift(W(40, 5), 1.6, -300, 0, "none");
  card(S, "PULL!", 700, 330, { t: W(40, 5), tc: "red", size: DS.type.small });
  DS.vignette(S); }

// "Rule number one. Never touch the big water." (kid)
{ const S = sc(41, 0, { cam: "push", focus: "1000 640" }); garden(S, DS.outdoor(S, GARD.rain));
  const F = tiny(S, 520, 930, { s: 1.0, look: 6, mood: "sad" });
  [[470, 560], [600, 640]].forEach(([x, y], i) => { const d = tear(S, x, y, 0.5); tl.fromTo(d, { y: 0 }, { y: 200, duration: 1.2, ease: "power1.in", repeat: 2, immediateRender: false }, W(41, 0) + i * 0.4); });
  const A = ant(S, 1220, 930, 1.9, { face: "flat", look: -3, dir: -1 }); A.talk(W(41, 0), END(41));
  card(S, "RULE #1", 1220, 190, { t: W(41, 0), tc: "red", size: DS.type.title });
  card(S, "NEVER TOUCH THE BIG WATER", 1220, 330, { t: W(41, 3), size: DS.type.caption });
  DS.vignette(S); }

// A few insects, like water beetles, are waterproof. Most keep their distance and drink through a long, thin mouthpart.
{ const S = sc(42, 0, { cam: "push", focus: "960 640" }); garden(S, DS.outdoor(S, GARD.morning), { blades: false });
  S.draw(`M120 790 Q330 770 540 790 Q750 810 920 780 V950 H120 Z`, S.start, 0, { fill: DS.c("sky", 0), c: DS.c("sky", 2), w: DS.w.mid });
  const b = beetle(S, 520, 800, 1.7, {}); const bub = S.grp(); S.draw(circ(520, 760, 42), S.start, 0, { fill: DS.P.white[0], c: DS.c("sky", 2), w: DS.w.mid, parent: bub }); fadeG(S, bub, W(42, 5), 0.4);
  card(S, "WATERPROOF", 520, 330, { t: W(42, 5), tc: "green", size: DS.type.small });
  leaf(S, 1450, 940, 800, { rot: -2 }); dome(S, 1640, 900, 120, 110, {});
  mosquito(S, 1400, 740, 1.6);
  card(S, "LONG, THIN MOUTHPART", 1400, 330, { t: W(42, 13), size: DS.type.caption });
  DS.vignette(S); }

// Dave has neither. Dave has a face.
{ const S = sc(43, 0, { cam: "push", focus: "960 520" }); garden(S, DS.outdoor(S, GARD.morning), { blades: false });
  const F = tiny(S, 960, 960, { s: 1.5, look: 0, mood: "worried" }); const [hx, hy] = F.hd;
  S.draw(circ(hx, hy, F.r * 1.6), W(43, 4), 0, { c: DS.c("red", 0), w: DS.w.near });
  card(S, "NOT WATERPROOF", 460, 330, { t: W(43, 0), size: DS.type.small });
  card(S, "NO LONG MOUTHPART", 1460, 330, { t: W(43, 1), size: DS.type.small });
  card(S, "A FACE", 960, 190, { t: W(43, 4), tc: "red" });
  DS.vignette(S); }


// ===================== 5. Cold and hungry =====================
// By the afternoon, the sun is out, and Dave is shivering.
{ const S = sc(44, 0, { cam: "push", focus: "1000 640" }); garden(S, DS.outdoor(S, GARD.sun));
  sunDisc(S, 1520, 220, 90, { t: W(44, 4) });
  const F = tiny(S, 800, 930, { s: 1.1, look: 3, mood: "worried", pose: "cross" }); shiver(F.g, W(44, 9), END(44) + 0.5);
  [[-110, -260], [110, -250], [-130, -150], [130, -140]].forEach(([dx, dy]) => { const g = S.grp(); S.draw(`M${800 + dx} ${930 + dy} l10 -14 l-10 -14 l10 -14`, S.start, 0, { c: DS.c("sky", 2), w: DS.w.mid, parent: g }); fadeG(S, g, W(44, 9), 0.5); });
  card(S, "AFTERNOON", 960, 190, { t: W(44, 2), size: DS.type.small });
  DS.vignette(S); }

// "It's a lovely sunny afternoon. Why am I freezing?" (Dave)
{ const S = sc(45, 0, { cam: "push", focus: "960 600" }); garden(S, DS.outdoor(S, GARD.sun), { blades: false });
  sunDisc(S, 1520, 220, 90, {});
  const F = tiny(S, 820, 960, { s: 1.5, look: 0, mood: "sad", pose: "cross" }); blanket(S, F, S.start); talk(S, F, W(45, 0), END(45)); shiver(F.g, S.start, END(45), 2.5);
  card(S, "WHY AM I FREEZING?", 960, 190, { t: W(45, 5), tc: "blue", size: DS.type.small });
  DS.vignette(S); }

// This is the part the films leave out. Warm-blooded animals make their own heat and lose it through their skin.
{ const S = sc(46, 0, { cam: "push", focus: "960 620" }); garden(S, DS.outdoor(S, GARD.sun), { blades: false });
  const rl = reel(S, 960, 330, 0.62, { t: W(46, 3) }); S.draw(`M780 230 L1140 430 M1140 230 L780 430`, W(46, 5), 0, { c: DS.c("red", 0), w: DS.w.near * 1.4 });
  const F = tiny(S, 600, 940, { s: 1.1, look: 3, mood: "flat" }); heatTop(S, F, 3, W(46, 14), undefined, 150);
  rodent(S, 1360, 940, 1.5, {}); heat(S, 1360, 770, 3, W(46, 14), undefined, 150);
  card(S, "WARM-BLOODED", 960, 650, { t: W(46, 8), tc: "red", size: DS.type.small });
  DS.vignette(S); }

// Haldane wrote that at rest, they all lose about the same heat from each patch of skin, so the food they need follows their skin, not their weight.
{ const S = sc(47, 0, { cam: "push", focus: "960 620" }); garden(S, DS.outdoor(S, GARD.sun), { blades: false });
  const F = tiny(S, 420, 960, { s: 1.0, look: 3, mood: "flat" }); const px = F.cx + 24, py = F.sh[1] + 110;
  const M = rodent(S, 1400, 960, 1.6, {}); const mx = 1432, my = 905;
  const bigP = (x, y, t) => { const g = S.grp(); S.draw(rect(x - 70, y - 70, 140, 140), S.start, 0, { fill: DS.c("yellow", 1), c: DS.c("gold", 2), w: DS.w.mid, parent: g }); heat(S, x, y - 80, 2, S.start, g, 130); fadeG(S, g, t, 0.5); return g; };
  [[px, py], [mx, my]].forEach(([x, y]) => S.draw(rect(x - 14, y - 14, 28, 28), W(47, 12), 0, { fill: DS.c("yellow", 1), c: DS.c("gold", 2), w: DS.w.mid }));
  bigP(620, 600, W(47, 12)); bigP(1300, 600, W(47, 12));
  const lk = S.grp(); [[px, py, 620, 670], [mx, my, 1300, 670]].forEach(([x, y, bx, by]) => dashed(S.draw(`M${x} ${y} L${bx} ${by}`, S.start, 0, { c: DS.c("gray", 2), w: DS.w.detail, parent: lk }))); fadeG(S, lk, W(47, 12), 0.5);
  card(S, "SAME HEAT PER PATCH", 960, 190, { t: W(47, 7), size: DS.type.small });
  card(S, "FOOD FOLLOWS SKIN", 960, 330, { t: W(47, 17), tc: "red", size: DS.type.small });
  card(S, "NOT WEIGHT", 960, 800, { t: W(47, 25), size: DS.type.caption });
  DS.vignette(S); }

// Every gram of tiny Dave now has three hundred and fifty times as much skin as before.
{ const S = sc(48, 0, { cam: "push", focus: "960 560" }); garden(S, DS.outdoor(S, GARD.sun), { blades: false });
  const F = tiny(S, 520, 940, { s: 1.1, look: 5, mood: "worried" });
  const P = panel(S, 1320, 570, 800, 640, T0(S)); const g = S.grp();
  DS.shape(S, rect(1100, 780, 160, 40), "orange", { w: "near", parent: g }); S.text("BEFORE 1×", 1180, 860, { size: DS.type.caption, c: DS.P.ink[0], t: T0(S), parent: g });
  const g2 = S.grp(); DS.shape(S, rect(1380, 420, 160, 400), "red", { w: "near", parent: g2 }); S.text("NOW", 1460, 860, { size: DS.type.caption, c: DS.P.ink[0], t: T0(S) });
  tl.fromTo(g2, { attr: { transform: "translate(1460 820) scale(1 0.05) translate(-1460 -820)" } }, { attr: { transform: "translate(1460 820) scale(1 1) translate(-1460 -820)" }, duration: 1.2, ease: "power2.out", immediateRender: true }, W(48, 7));
  countUp(S, 1460, 380, 1, 350, W(48, 7), 1.3, { size: DS.type.title, c: DS.c("red", 2), t0: W(48, 6), fmt: (v) => Math.round(v) + "×" });
  card(S, "SKIN PER GRAM", 1320, 150, { t: W(48, 1), size: DS.type.small });
  DS.vignette(S); }

// So just to stay warm, by Haldane's rule, each gram needs about three hundred and fifty times as much food.
{ const S = sc(49, 0, { cam: "push", focus: "960 560" }); garden(S, DS.outdoor(S, GARD.sun), { blades: false });
  const F = tiny(S, 420, 940, { s: 1.1, look: 5, mood: "sad", pose: "cross" }); blanket(S, F, S.start); shiver(F.g, S.start, END(49), 2);
  const L = S.grp(), Rr = S.grp(); fadeG(S, L, W(49, 8)); fadeG(S, Rr, W(49, 12));
  plate(S, 960, 860, 190, { parent: L }); heap(S, 960, 850, 1, 34, { parent: L }); S.text("1×", 960, 540, { size: DS.type.title, c: DS.P.ink[0], t: T0(S), parent: L });
  plate(S, 1480, 860, 270, { parent: Rr }); heap(S, 1480, 850, 60, 26, { parent: Rr });
  countUp(S, 1480, 600, 1, 350, W(49, 12), 1.3, { size: DS.type.title, c: DS.c("red", 2), t0: W(49, 12), fmt: (v) => Math.round(v) + "×" });
  card(S, "FOOD PER GRAM", 1200, 190, { t: W(49, 17), size: DS.type.small });
  DS.vignette(S); }

// The smallest mammal on Earth, the Etruscan shrew, weighs two to three grams. It eats more than its own weight every day, in up to twenty-five meals.
{ const S = sc(50, 0, { cam: "push", focus: "960 600" }); garden(S, DS.outdoor(S, GARD.sun), { blades: false });
  rodent(S, 560, 940, 2.4, { name: "earth", long: true });
  card(S, "ETRUSCAN SHREW", 560, 190, { t: W(50, 5), size: DS.type.small });
  card(S, "2–3 G", 560, 330, { t: W(50, 9), tc: "red", size: DS.type.title });
  card(S, "EATS MORE THAN ITS WEIGHT A DAY", 1250, 190, { t: W(50, 14), size: DS.type.caption });
  for (let i = 0; i < 25; i++) { const x = 1050 + (i % 5) * 96, y = 340 + Math.floor(i / 5) * 96; S.draw(circ(x, y, 34, 26), W(50, 22) + i * 0.05, 0, { fill: DS.c("earth", i % 2 ? 1 : 0), c: DS.c("earth", 2), w: DS.w.mid }); }
  card(S, "UP TO 25 MEALS", 1250, 860, { t: W(50, 22), tc: "red", size: DS.type.small });
  DS.vignette(S); }

// It can't survive more than a few hours without food, and its heart beats up to fifteen hundred times a minute.
{ const S = sc(51, 0, { cam: "push", focus: "960 600" }); garden(S, DS.outdoor(S, GARD.sun), { blades: false });
  const hg = S.grp(); S.heart(560, 520, 3.4, S.start, 0, { fill: DS.c("red", 0), c: DS.P.ink[0], parent: hg }); tl.to(hg, { scale: 1.06, svgOrigin: "560 520", duration: 0.45, yoyo: true, repeat: 20, ease: "sine.inOut" }, W(51, 11));
  countUp(S, 560, 800, 0, 1500, W(51, 15), 1.4, { size: DS.type.title, c: DS.c("red", 2), t0: W(51, 13), fmt: (v) => Math.round(v).toLocaleString("en-US") + " / MIN" });
  plate(S, 1360, 800, 230, {}); S.draw(`M1250 740 L1470 860 M1470 740 L1250 860`, W(51, 8), 0, { c: DS.c("red", 0), w: DS.w.near * 1.4 });
  card(S, "A FEW HOURS", 1360, 330, { t: W(51, 5), size: DS.type.small });
  card(S, "NO FOOD", 1360, 480, { t: W(51, 8), tc: "red", size: DS.type.caption });
  DS.vignette(S); }

// Tiny Dave is more than a thousand times lighter than the shrew. No mammal on Earth comes anywhere near his size.
{ const S = sc(52, 0, { cam: "push", focus: "960 600" }); garden(S, DS.outdoor(S, GARD.sun), { blades: false });
  rodent(S, 1050, 940, 2.6, { name: "earth", long: true });
  const F = tiny(S, 420, 940, { s: 0.42, look: 7, mood: "wow" });
  card(S, "1,000× LIGHTER", 560, 330, { t: W(52, 5), tc: "red", size: DS.type.small });
  card(S, "NO MAMMAL IS CLOSE", 1200, 190, { t: W(52, 12), size: DS.type.small });
  DS.vignette(S); }

// "Why are you so warm? That sounds expensive." (kid)
{ const S = sc(53, 0, { cam: "push", focus: "1000 620" }); garden(S, DS.outdoor(S, GARD.sun), { blades: false });
  const F = tiny(S, 520, 960, { s: 1.2, look: 6, mood: "sad", pose: "cross" }); blanket(S, F, S.start); heatTop(S, F, 3, S.start, undefined, 150); shiver(F.g, S.start, END(53), 2);
  const A = ant(S, 1230, 960, 1.9, { face: "cheeky", look: -3, dir: -1 }); A.talk(W(53, 0), END(53));
  card(S, "EXPENSIVE", 1230, 190, { t: W(53, 6), tc: "red", size: DS.type.title });
  DS.vignette(S); }

// Ants are cold-blooded. They let the world around them set their temperature, so they don't spend food on heating.
{ const S = sc(54, 0, { cam: "push", focus: "960 600" }); garden(S, DS.outdoor(S, GARD.sun), { blades: false });
  sunDisc(S, 1500, 210, 80, {});
  const A = ant(S, 700, 940, 1.6, { face: "smile", look: 3, dir: 1 });
  thermo(S, 1120, 620, 240, 0.5, { c: "sky" }); thermo(S, 1320, 620, 240, 0.5, { c: "sky" });
  S.text("ANT", 1120, 890, { size: DS.type.caption, c: DS.P.ink[0], t: W(54, 6) }); S.text("AIR", 1320, 890, { size: DS.type.caption, c: DS.P.ink[0], t: W(54, 6) });
  S.text("=", 1220, 640, { size: DS.type.title, c: DS.c("red", 2), t: W(54, 9) });
  card(S, "COLD-BLOODED", 960, 190, { t: W(54, 2), size: DS.type.small });
  const fl = S.grp(); S.flame(1620, 740, 1.1, S.start, 0, { parent: fl }); fadeG(S, fl, W(54, 14), 0.4); S.draw(`M1530 560 L1710 760 M1710 560 L1530 760`, W(54, 15), 0, { c: DS.c("red", 0), w: DS.w.near * 1.4 });
  card(S, "NO FOOD ON HEATING", 1620, 450, { t: W(54, 15), size: DS.type.caption });
  DS.vignette(S); }

// Dave does, and he's running out.
{ const S = sc(55, 0, { cam: "push", focus: "960 600" }); garden(S, DS.outdoor(S, GARD.sun), { blades: false });
  const F = tiny(S, 620, 960, { s: 1.4, look: 3, mood: "worried", pose: "cross" }); blanket(S, F, S.start); heatTop(S, F, 3, W(55, 0), undefined, 150); shiver(F.g, S.start, END(55), 2.5);
  const bar = S.grp(); S.draw(rrect(1150, 480, 520, 150, DS.r.md), S.start, 0, { fill: DS.P.white[0], c: DS.P.ink[0], w: DS.w.near, parent: bar }); S.draw(rect(1670, 520, 30, 70), S.start, 0, { fill: DS.P.ink[0], c: DS.P.ink[0], w: DS.w.mid, parent: bar });
  const fill = el("path", { d: rect(1170, 500, 480, 110), fill: DS.c("red", 0) }, bar), tf = (v) => `translate(1170 0) scale(${v} 1) translate(-1170 0)`; fill.setAttribute("transform", tf(0.9));
  tl.fromTo(fill, { attr: { transform: tf(0.9) } }, { attr: { transform: tf(0.12) }, duration: 2.2, ease: "power1.inOut", immediateRender: true }, W(55, 3));
  card(S, "FOOD", 1410, 380, { t: W(55, 3), size: DS.type.small }); card(S, "RUNNING OUT", 1410, 760, { t: W(55, 4), tc: "red", size: DS.type.small });
  DS.vignette(S); }

// Dave finds a crumb in the grass and eats it all.
{ const S = sc(56, 0, { cam: "push", focus: "960 620" }); garden(S, DS.outdoor(S, GARD.sun));
  const F = tiny(S, 760, 940, { s: 1.2, look: 5, mood: "smile", pose: "hold" }); blanket(S, F, S.start);
  const cg = crumb(S, 1130, 940, 1.0, {}); tl.fromTo(cg, { scale: 1, svgOrigin: "1130 940" }, { scale: 0.04, svgOrigin: "1130 940", duration: END(56) - W(56, 8) - 0.5, ease: "none", immediateRender: false }, W(56, 8));
  talk(S, F, W(56, 8), END(56) - 0.4);
  card(S, "A CRUMB", 1130, 640, { t: W(56, 3), size: DS.type.small });
  DS.vignette(S); }

// That's lunch, dinner and tomorrow's breakfast, and it still isn't enough.
{ const S = sc(57, 0, { cam: "push", focus: "960 600" }); garden(S, DS.outdoor(S, GARD.sun), { blades: false });
  const F = tiny(S, 560, 960, { s: 1.3, look: 5, mood: "sad", pose: "hips" }); blanket(S, F, S.start);
  plate(S, 1250, 900, 260, {}); crumb(S, 1250, 890, 0.25, {});
  card(S, "LUNCH", 1250, 190, { t: W(57, 1), size: DS.type.small }); card(S, "DINNER", 1250, 330, { t: W(57, 2), size: DS.type.small }); card(S, "TOMORROW'S BREAKFAST", 1250, 470, { t: W(57, 4), size: DS.type.small });
  stamp(S, 1250, 700, "STILL NOT ENOUGH", W(57, 8), "red", { size: DS.type.small });
  DS.vignette(S); }


// ===================== 6. Nearly blind =====================
// By evening, Dave wants to go home. He can't see where home is.
{ const S = sc(58, 0, { cam: "push", focus: "1000 640" }); garden(S, DS.outdoor(S, GARD.dusk));
  const hg = S.grp(); house(S, 1480, 590, 0.9, { layer: "far", parent: hg }); blurry(hg, 9);
  const F = tiny(S, 760, 940, { s: 1.2, look: 7, mood: "worried", pose: "reach" });
  card(S, "BY EVENING", 960, 190, { t: W(58, 1), size: DS.type.small });
  card(S, "HOME?", 1480, 330, { t: W(58, 9), tc: "red", size: DS.type.title });
  DS.vignette(S); }

// The shrink ray made his eyes three hundred and fifty times smaller. But it didn't shrink light.
{ const S = sc(59, 0, { cam: "push", focus: "960 540" }); DS.room(S, { wall: "sand", floor: "wood", window: false });
  panel(S, 960, 540, 1700, 700, T0(S));
  eyeball(S, 1200, 540, 2.0, { dash: true }); const e = eyeball(S, 1200, 540, 0.34, {}); 
  const L = S.grp(); [0, 1, 2].forEach((i) => S.draw(smooth(Array.from({ length: 24 }, (_, j) => [260 + j * 28, 420 + i * 120 + Math.sin(j * 0.9) * 30])), S.start, 0, { c: DS.c("blue", 0), w: DS.w.mid, parent: L })); fadeG(S, L, W(59, 12), 0.6);
  card(S, "EYES 350× SMALLER", 1200, 270, { t: W(59, 6), size: DS.type.small });
  card(S, "LIGHT: SAME SIZE", 560, 780, { t: W(59, 14), tc: "blue", size: DS.type.small });
  DS.vignette(S); }

// Each of his pupils is now only about fifteen light waves across. Squeeze light through a hole that small, and it spreads out and smears.
{ const S = sc(60, 0, { cam: "push", focus: "960 540" }); DS.room(S, { wall: "sand", floor: "wood", window: false });
  panel(S, 960, 540, 1700, 760, T0(S));
  const g = S.grp(); [0, 1, 2, 3, 4, 5].forEach((i) => S.draw(smooth(Array.from({ length: 9 }, (_, j) => [300 + i * 90 + Math.sin(j * 1.2) * 10, 220 + j * 90])), S.start, 0, { c: DS.c("blue", 0), w: DS.w.mid, parent: g })); fadeG(S, g, W(60, 12), 0.5);
  DS.shape(S, rect(850, 200, 70, 270), "gray", { w: "near", flat: true, tone: 2 }); DS.shape(S, rect(850, 610, 70, 270), "gray", { w: "near", flat: true, tone: 2 });
  const f = S.grp(); [150, 250, 350, 450, 550].forEach((r) => S.draw(arc(920, 540, r, -62, 62), S.start, 0, { c: DS.c("blue", 0), w: DS.w.mid, parent: f })); fadeG(S, f, W(60, 19), 0.8);
  S.draw(`M970 470 V610 M950 490 L970 462 L990 490 M950 590 L970 618 L990 590`, W(60, 3), 0, { c: DS.c("red", 0), w: DS.w.near });
  card(S, "PUPIL: ~15 LIGHT WAVES", 960, 150, { t: W(60, 3), size: DS.type.small });
  card(S, "SPREADS AND SMEARS", 1420, 880, { t: W(60, 19), tc: "red", size: DS.type.small });
  DS.vignette(S); }

// It's called diffraction, and it makes Dave's whole world hundreds of times blurrier.
{ const S = sc(61, 0, { cam: "push", focus: "960 540" }); DS.room(S, { wall: "sand", floor: "wood", window: false });
  const view = (cx, parent) => { S.draw(rrect(cx - 400, 230, 800, 620, DS.r.md), S.start, 0, { fill: DS.vgrad(DS.c("sky", 1), DS.c("grass", 1)), c: DS.P.ink[0], w: DS.w.near, parent }); S.fill(rect(cx - 396, 620, 792, 226), S.start, 0, DS.c("grass", 0), 1, parent); house(S, cx - 170, 640, 0.8, { parent }); const a = ant(S, cx + 100, 780, 1.0, { face: "smile", parent }); S.draw(`M${cx + 300} 780 V700`, S.start, 0, { c: DS.c("green", 2), w: DS.w.near, parent }); S.fill(circ(cx + 300, 690, 34), S.start, 0, DS.c("red", 0), 1, parent); };
  view(500, undefined); const bl = S.grp(); view(1420, bl); blurry(bl, 12); fadeG(S, bl, W(61, 4), 0.6);
  card(S, "SHARP", 500, 150, { t: W(61, 2), size: DS.type.small }); card(S, "DAVE'S VIEW", 1420, 150, { t: W(61, 4), size: DS.type.small });
  card(S, "HUNDREDS OF TIMES BLURRIER", 960, 920, { t: W(61, 9), tc: "red", size: DS.type.caption });
  DS.vignette(S); }

// That's why he walked off the table this morning. To tiny Dave, the edge was just more blur.
{ const S = sc(62, 0, { cam: "push", focus: "1000 640" }); const R = DS.room(S, TBL2); const eg = tableEdge(S, R); blurry(eg, 9);
  const F = dave(S, 900, 640, "near", { s: 0.8, look: 6, mood: "flat", pose: "stand", float: true, ...HOLD }); const rg = S.grp(); riceUp(S, F, 1.1, rg);
  card(S, "THE EDGE", 1180, 520, { t: W(62, 12), size: DS.type.caption });
  card(S, "JUST MORE BLUR", 1450, 330, { t: W(62, 14), tc: "red", size: DS.type.small });
  DS.vignette(S); }

// Haldane wrote that even a mouse could not tell one human face from another six feet away. And Dave's eyes are far smaller than a mouse's.
{ const S = sc(63, 0, { cam: "push", focus: "960 600" }); garden(S, DS.outdoor(S, GARD.morning), { blades: false });
  rodent(S, 420, 940, 1.5, {});
  const fg = S.grp(); [[1250, "brown"], [1520, "yellow"]].forEach(([x, hc]) => { S.draw(circ(x, 640, 110), S.start, 0, { fill: DS.P.paper[0], c: DS.P.ink[0], w: DS.w.near, parent: fg }); S.draw(`M${x - 114} 630 Q${x} 470 ${x + 114} 630 Q${x} 560 ${x - 114} 630 Z`, S.start, 0, { fill: DS.c(hc, 0), c: DS.P.ink[0], w: DS.w.mid, parent: fg }); S.fill(circ(x - 36, 650, 10), S.start, 0, DS.P.ink[0], 1, fg); S.fill(circ(x + 36, 650, 10), S.start, 0, DS.P.ink[0], 1, fg); S.draw(`M${x - 40} 700 Q${x} 730 ${x + 40} 700`, S.start, 0, { c: DS.P.ink[0], w: DS.w.mid, parent: fg }); }); blurry(fg, 7); fadeG(S, fg, W(63, 9), 0.5);
  S.draw(`M560 880 H1180 M580 860 L548 880 L580 900 M1160 860 L1192 880 L1160 900`, W(63, 14), 0, { c: DS.c("red", 0), w: DS.w.near });
  card(S, "6 FEET", 870, 800, { t: W(63, 14), tc: "red", size: DS.type.small });
  card(S, "A MOUSE CAN'T TELL", 960, 190, { t: W(63, 6), size: DS.type.small });
  card(S, "DAVE'S EYES: SMALLER", 960, 330, { t: W(63, 18), size: DS.type.caption });
  DS.vignette(S); }

// Insects use compound eyes, made of many tiny lenses, each catching one dot of the picture. It's still a blurry picture.
{ const S = sc(64, 0, { cam: "push", focus: "960 540" }); DS.room(S, { wall: "sand", floor: "wood", window: false });
  panel(S, 960, 540, 1700, 700, T0(S));
  const g = S.grp(); DS.shape(S, circ(560, 540, 230), "ink", { w: "near", parent: g, tone: 1, flat: true }); const hx = S.grp(g); clipTo(hx, circ(560, 540, 224));
  for (let r = -8; r <= 8; r++) for (let c = -8; c <= 8; c++) { const x = 560 + c * 40 + (r % 2) * 20, y = 540 + r * 35, a = []; for (let i = 0; i < 6; i++) { const t = (i / 6) * Math.PI * 2 + Math.PI / 6; a.push([x + Math.cos(t) * 21, y + Math.sin(t) * 21]); } S.draw(poly(a, 0) + " Z", S.start, 0, { fill: DS.c("blue", (r + c) % 2 ? 1 : 0), c: DS.c("blue", 2), w: DS.w.hair, parent: hx }); }
  fadeG(S, g, W(64, 2), 0.5);
  const m = S.grp(); const pic = ["gggggggg", "gggrrggg", "ggrrrrgg", "gggrrggg", "ggggsggg", "ggggsggg"]; pic.forEach((row, j) => [...row].forEach((ch, i) => S.draw(rect(1120 + i * 70, 340 + j * 70, 70, 70), S.start, 0, { fill: DS.c(ch === "g" ? "grass" : ch === "r" ? "red" : "green", ch === "g" ? 1 : 0), c: DS.c("gray", 1), w: DS.w.hair, parent: m }))); fadeG(S, m, W(64, 11), 0.6);
  card(S, "COMPOUND EYE", 560, 190, { t: W(64, 2), size: DS.type.small }); card(S, "ONE DOT PER LENS", 1400, 250, { t: W(64, 9), size: DS.type.caption }); card(S, "STILL BLURRY", 1400, 870, { t: W(64, 16), tc: "red", size: DS.type.small });
  DS.vignette(S); }

// One famous calculation found that to see as sharply as you do, compound eyes would need to be about a metre across.
{ const S = sc(65, 0, { cam: "push", focus: "1000 600" }); garden(S, DS.outdoor(S, GARD.morning), { blades: false });
  const F = dave(S, 560, 960, "near", { s: 2.0, look: 6, mood: "wow" });
  const g = S.grp(); DS.shape(S, circ(1250, 640, 230), "ink", { w: "near", parent: g, tone: 1, flat: true }); const hx = S.grp(g); clipTo(hx, circ(1250, 640, 224));
  for (let r = -6; r <= 6; r++) for (let c = -6; c <= 6; c++) { const x = 1250 + c * 56 + (r % 2) * 28, y = 640 + r * 48, a = []; for (let i = 0; i < 6; i++) { const t = (i / 6) * Math.PI * 2 + Math.PI / 6; a.push([x + Math.cos(t) * 30, y + Math.sin(t) * 30]); } S.draw(poly(a, 0) + " Z", S.start, 0, { fill: DS.c("blue", (r + c) % 2 ? 1 : 0), c: DS.c("blue", 2), w: DS.w.hair, parent: hx }); }
  fadeG(S, g, W(65, 12), 0.6);
  S.draw(`M1020 930 H1480 M1040 910 L1010 930 L1040 950 M1460 910 L1490 930 L1460 950`, W(65, 19), 0, { c: DS.c("red", 0), w: DS.w.near });
  card(S, "ABOUT 1 METRE", 1250, 330, { t: W(65, 19), tc: "red", size: DS.type.small });
  DS.vignette(S); }

// So black garden ants lean on their antennae. They lay scent trails between food and home.
{ const S = sc(66, 0, { cam: "push", focus: "960 640" }); garden(S, DS.outdoor(S, GARD.dusk), { blades: false });
  const mound = S.grp(); DS.shape(S, `M120 900 Q300 640 480 900 Z`, "earth", { w: "near", parent: mound, tone: 2 }); S.fill(circ(300, 880, 34, 24), S.start, 0, DS.P.ink[0], 1, mound);
  crumb(S, 1620, 920, 0.8, {});
  const dots = S.grp(); for (let i = 0; i < 22; i++) { const x = 520 + i * 52; S.fill(circ(x, 900 + Math.sin(i) * 6, 9), W(66, 9) + i * 0.09, 0, DS.c("purple", 1), 1, dots); }
  const A = ant(S, 960, 910, 1.4, { face: "smile", look: 4, dir: 1 });
  [-1, 1].forEach((sd) => S.draw(smooth([[1060 + sd * 20, 720], [1090 + sd * 30, 700], [1080, 676]]), W(66, 4), 0, { c: DS.c("purple", 0), w: DS.w.detail }));
  card(S, "ANTENNAE", 1100, 580, { t: W(66, 6), size: DS.type.caption }); card(S, "SCENT TRAIL", 960, 190, { t: W(66, 10), tc: "purple", size: DS.type.small });
  card(S, "HOME", 300, 560, { t: W(66, 14), size: DS.type.caption }); card(S, "FOOD", 1620, 640, { t: W(66, 13), size: DS.type.caption });
  DS.vignette(S); }

// "We don't look for home, Dave. We smell it." (kid)
{ const S = sc(67, 0, { cam: "push", focus: "1000 640" }); garden(S, DS.outdoor(S, GARD.dusk), { blades: false });
  const F = tiny(S, 480, 960, { s: 1.2, look: 5, mood: "worried", pose: "reach" }); blanket(S, F, S.start);
  const A = ant(S, 1230, 960, 1.9, { face: "cheeky", look: -3, dir: -1 }); A.talk(W(67, 0), END(67));
  [0, 1, 2].forEach((i) => S.draw(smooth([[1040 - i * 12, 520 - i * 40], [1000 - i * 12, 500 - i * 40], [1040 - i * 12, 480 - i * 40]]), W(67, 6), 0, { c: DS.c("purple", 0), w: DS.w.detail }));
  card(S, "WE SMELL IT", 1230, 190, { t: W(67, 6), tc: "purple", size: DS.type.title });
  DS.vignette(S); }


// ===================== 7. The films got it backwards =====================
const CINEMA = { wall: "purple", floor: "navy", window: false };
// And here's the twist. The shrink-ray films got it backwards.
{ const S = sc(68, 0, { cam: "push", focus: "960 540" }); DS.room(S, CINEMA);
  reel(S, 960, 540, 1.3, { t: W(68, 5) });
  S.draw(arc(960, 540, 420, -150, -30), W(68, 7), 0, { c: DS.c("yellow", 0), w: DS.w.near }); S.draw(arrowHead(1311, 322, 0.5, 34), W(68, 7), 0, { c: DS.c("yellow", 0), w: DS.w.near });
  S.draw(arc(960, 540, 420, 30, 150), W(68, 7), 0, { c: DS.c("yellow", 0), w: DS.w.near }); S.draw(arrowHead(609, 758, 3.64, 34), W(68, 7), 0, { c: DS.c("yellow", 0), w: DS.w.near });
  card(S, "THE TWIST", 960, 150, { t: W(68, 3), tc: "red", size: DS.type.title });
  card(S, "BACKWARDS", 960, 930, { t: W(68, 7), size: DS.type.small });
  DS.vignette(S); }

// In the film, four children are shrunk to a quarter of an inch, about Dave's size. Their dangers are a bee, a scorpion and a lawnmower.
{ const S = sc(69, 0, { cam: "push", focus: "960 540" }); DS.room(S, CINEMA);
  reel(S, 520, 400, 0.95, { t: W(69, 1) });
  card(S, "4 KIDS → ¼ INCH", 520, 680, { t: W(69, 6), size: DS.type.small });
  card(S, "ABOUT DAVE'S SIZE", 520, 810, { t: W(69, 16), size: DS.type.caption });
  card(S, "THEIR DANGERS", 1340, 190, { t: W(69, 19), size: DS.type.small });
  card(S, "A BEE", 1340, 360, { t: W(69, 23), tc: "red", size: DS.type.small }); card(S, "A SCORPION", 1340, 520, { t: W(69, 25), tc: "red", size: DS.type.small }); card(S, "A LAWNMOWER", 1340, 680, { t: W(69, 28), tc: "red", size: DS.type.small });
  const F = tiny(S, 1000, 960, { s: 0.5, look: -5, mood: "smile" });
  DS.vignette(S); }

// One of them nearly drowns in a mud puddle. Fair. The film got that one right.
{ const S = sc(70, 0, { cam: "push", focus: "960 600" }); DS.room(S, CINEMA);
  reel(S, 560, 420, 0.95, { t: W(70, 0) });
  const pd = S.grp(); S.draw(`M1000 800 Q1100 740 1300 760 Q1560 740 1720 800 Q1620 880 1340 890 Q1060 890 1000 800 Z`, S.start, 0, { fill: DS.c("earth", 2), c: DS.P.ink[0], w: DS.w.near, parent: pd }); [0, 1].forEach((i) => S.draw(circ(1360, 820, 90 + i * 60, 24 + i * 16), S.start, 0, { c: DS.c("earth", 0), w: DS.w.mid, parent: pd })); fadeG(S, pd, W(70, 6), 0.5);
  card(S, "MUD PUDDLE", 1360, 640, { t: W(70, 6), size: DS.type.small });
  card(S, "FAIR", 960, 190, { t: W(70, 9), tc: "green", size: DS.type.title }); const ck = S.grp(); tick(S, 1560, 450, 2.0, W(70, 9), "green", ck);
  card(S, "GOT THAT ONE RIGHT", 560, 760, { t: W(70, 11), size: DS.type.caption });
  DS.vignette(S); }

// And when night falls, they sleep outside in a toy brick.
{ const S = sc(71, 0, { cam: "push", focus: "960 640" }); DS.outdoor(S, { hy: 620, sky: "night", sun: [1500, 200], hills: "navy", ground: "grass" });
  toyBrick(S, 960, 930, 1.5, {}); const z = S.grp(); S.zzz(1040, 560, W(71, 5), 0.5, { parent: z });
  reel(S, 400, 300, 0.6, { t: W(71, 1) });
  card(S, "NIGHT FALLS", 960, 190, { t: W(71, 2), size: DS.type.small }); card(S, "A TOY BRICK", 960, 400, { t: W(71, 9), tc: "red", size: DS.type.small });
  DS.vignette(S); }

// The scariest scene in that film isn't the scorpion. It's the sleepover.
{ const S = sc(72, 0, { cam: "push", focus: "960 640" }); DS.outdoor(S, { hy: 620, sky: "night", sun: [1500, 200], hills: "navy", ground: "grass" });
  const L = card(S, "THE SCORPION", 520, 330, { t: W(72, 7), size: DS.type.small }); S.draw(`M300 270 L740 390`, W(72, 8), 0, { c: DS.c("red", 0), w: DS.w.near * 1.4 });
  toyBrick(S, 1300, 930, 1.3, {}); const z = S.grp(); S.zzz(1370, 600, W(72, 10), 0.5, { parent: z });
  S.draw(circ(1300, 760, 340, 250), W(72, 10), 0, { c: DS.c("red", 0), w: DS.w.near });
  card(S, "THE SLEEPOVER", 1300, 400, { t: W(72, 10), tc: "red", size: DS.type.small });
  const F = tiny(S, 520, 960, { s: 1.1, look: 5, mood: "worried", pose: "cross" }); blanket(S, F, S.start); shiver(F.g, S.start, END(72), 2);
  DS.vignette(S); }

// Tiny people aren't weak. Pound for pound, Dave is stronger than ever, and falling can't hurt him.
{ const S = sc(73, 0, { cam: "push", focus: "960 600" }); garden(S, DS.outdoor(S, GARD.morning), { blades: false });
  const F = tiny(S, 520, 960, { s: 1.4, look: 3, mood: "determined", pose: "armsUp" });
  card(S, "NOT WEAK", 520, 190, { t: W(73, 2), tc: "green", size: DS.type.title }); card(S, "STRONGER THAN EVER", 520, 330, { t: W(73, 8), size: DS.type.caption });
  const P = panel(S, 1400, 560, 700, 560, T0(S)); const g = S.grp(); fadeG(S, g, W(73, 12));
  DS.shape(S, rect(1130, 560, 300, 36), "wood", { w: "near", parent: g, tone: 1 }); DS.shape(S, rect(1160, 596, 30, 200), "wood", { w: "near", parent: g, tone: 2, flat: true });
  S.draw(`M1500 520 V740 M1470 710 L1500 746 L1530 710`, S.start, 0, { c: DS.c("blue", 0), w: DS.w.near, parent: g }); tick(S, 1620, 700, 1.4, W(73, 14), "green", g);
  card(S, "FALLING IS FINE", 1400, 400, { t: W(73, 12), size: DS.type.small });
  DS.vignette(S); }

// His real enemies are a raindrop, a sunny afternoon and the size of light.
{ const S = sc(74, 0, { cam: "push", focus: "960 560" }); DS.room(S, { wall: "sand", floor: "wood", window: false });
  [[330, W(74, 4)], [960, W(74, 6)], [1590, W(74, 9)]].forEach(([x, t], i) => {
    const p = panel(S, x, 560, 520, 600, T0(S)); fadeG(S, p, t - 0.1); const ig = S.grp(); fadeG(S, ig, t + 0.1);
    if (i === 0) { dome(S, x, 640, 190, 220, { parent: ig }); S.text("RAINDROP", x, 800, { size: DS.type.small, c: DS.P.ink[0], t: T0(S), parent: ig }); }
    if (i === 1) { sunDisc(S, x, 520, 80, { parent: ig }); S.text("SUNNY AFTERNOON", x, 800, { size: DS.type.caption, c: DS.P.ink[0], t: T0(S), parent: ig }); }
    if (i === 2) { eyeball(S, x, 520, 1.2, { parent: ig }); S.text("SIZE OF LIGHT", x, 800, { size: DS.type.small, c: DS.P.ink[0], t: T0(S), parent: ig }); }
  });
  card(S, "THE REAL ENEMIES", 960, 150, { t: W(74, 1), tc: "red", size: DS.type.small });
  DS.vignette(S); }

// Dave looks at his list. Too weak, crossed out. Falling off things, crossed out.
{ const S = sc(75, 0, { cam: "push", focus: "1100 560" }); tbl(S, DS.room(S, TBL));
  dangerList(S, 1260, 540, 0.95, { strike: [W(75, 7), W(75, 12)] });
  const F = tiny(S, 560, 960, { s: 1.0, look: 6, mood: "flat", pose: "hold" }); blanket(S, F, S.start);
  DS.vignette(S); }

// Underneath, in very shivery handwriting: wet, cold, hungry, blind.
{ const S = sc(76, 0, { cam: "push", focus: "1100 560" }); tbl(S, DS.room(S, TBL));
  dangerList(S, 1260, 540, 0.95, { strike: [S.start - 0.6, S.start - 0.6], wch: [W(76, 5), W(76, 6), W(76, 7), W(76, 8)] });
  const F = tiny(S, 560, 960, { s: 1.0, look: 6, mood: "worried", pose: "cross" }); blanket(S, F, S.start); shiver(F.g, S.start, END(76), 2.5);
  DS.vignette(S); }


// ===================== 8. The right size =====================
const KITCHEN = { wall: "wall", floor: "wood", window: false };
// a kitchen table in side view for the callback scenes: slab + two legs + a plate. Returns the plate centre.
const kTable = (S, x0, wd, ty) => { const g = S.grp(); DS.shape(S, rrect(x0, ty, wd, 40, DS.r.sm), "wood", { w: "near", parent: g, tone: 1 }); [x0 + 40, x0 + wd - 80].forEach((x) => DS.shape(S, rect(x, ty + 40, 40, 940 - ty - 40), "wood", { w: "near", parent: g, tone: 2, flat: true })); plate(S, x0 + wd / 2, ty - 4, 150, { parent: g }); return g; };
const kChair = (S, x, seatY) => { DS.shape(S, rect(x - 150, seatY - 330, 40, 330 + 130), "wood", { w: "near", tone: 2, flat: true }); DS.shape(S, rrect(x - 150, seatY - 330, 40, 60, DS.r.xs), "wood", { w: "near", tone: 1 }); DS.shape(S, rrect(x - 150, seatY, 320, 34, DS.r.sm), "wood", { w: "near" }); [x - 130, x + 130].forEach((lx) => DS.shape(S, rect(lx, seatY + 34, 30, 940 - seatY - 34 + 20), "wood", { w: "near", tone: 2, flat: true })); };
// At dinnertime, the shrink ray finishes recharging, and the ant walks Dave home along her scent trail.
{ const S = sc(77, 0, { cam: "push", focus: "960 640" }); garden(S, DS.outdoor(S, GARD.dusk), { blades: false });
  const R = ray(S, 420, 700, 0.8, { level: 0.2, c: "green" }); R.charge(W(77, 4), 1.6, 0.2, 1);
  card(S, "DINNERTIME", 960, 190, { t: W(77, 1), size: DS.type.small }); card(S, "RECHARGED", 420, 440, { t: W(77, 6), tc: "green", size: DS.type.small });
  house(S, 1560, 600, 0.9, { layer: "far" });
  const dots = S.grp(); for (let i = 0; i < 20; i++) S.fill(circ(620 + i * 46, 920 + Math.sin(i) * 5, 8), W(77, 11) + i * 0.1, 0, DS.c("purple", 1), 1, dots);
  const A = ant(S, 820, 920, 1.3, { face: "smile", look: 4, dir: 1 }); A.walk(W(77, 8), 5.0, 480);
  const F = tiny(S, 470, 920, { s: 0.95, look: 5, mood: "smile", float: true }); F.walk(W(77, 8), 5.0, { x: 480, y: 0 }, 0.35);
  DS.vignette(S); }

// So what would really happen if you shrank to the size of an ant? You'd be super strong, and you could fall off a skyscraper and walk away.
{ const S = sc(78, 0, { cam: "push", focus: "960 600" }); garden(S, DS.outdoor(S, GARD.morning), { blades: false });
  const K = S.grp(); DS.shape(S, rect(1260, 180, 230, 640), "blue", { w: "near", parent: K, tone: 2, flat: true }); for (let r = 0; r < 9; r++) for (let c = 0; c < 3; c++) S.fill(rect(1282 + c * 68, 210 + r * 68, 44, 44), S.start, 0, DS.c("sky", 1), 1, K); fadeG(S, K, W(78, 22), 0.5);
  const F = tiny(S, 560, 960, { s: 1.3, look: 5, mood: "determined", pose: "armsUp" });
  card(S, "WHAT WOULD REALLY HAPPEN?", 700, 150, { t: W(78, 1), size: DS.type.caption });
  card(S, "SUPER STRONG", 560, 330, { t: W(78, 15), tc: "green", size: DS.type.small });
  card(S, "FALL OFF A SKYSCRAPER", 1375, 920, { t: W(78, 21), size: DS.type.caption }); card(S, "WALK AWAY", 1000, 790, { t: W(78, 25), tc: "green", size: DS.type.small });
  DS.vignette(S); }

// But one raindrop could hold you prisoner, a sunny afternoon would leave you freezing and starving, and the world would be a blur.
{ const S = sc(79, 0, { cam: "push", focus: "960 560" }); DS.room(S, { wall: "sand", floor: "wood", window: false });
  [[330, W(79, 1)], [960, W(79, 7)], [1590, W(79, 16)]].forEach(([x, t], i) => {
    const p = panel(S, x, 540, 520, 660, T0(S)); fadeG(S, p, t - 0.1); const ig = S.grp(); fadeG(S, ig, t + 0.1);
    if (i === 0) { const F = tiny(S, x, 760, { s: 0.85, look: 0, mood: "wow", parent: ig }); faceBubble(S, F, S.start, ig); S.text("TRAPPED", x, 835, { size: DS.type.small, c: DS.c("red", 2), t: T0(S), parent: ig }); }
    if (i === 1) { sunDisc(S, x + 120, 330, 48, { parent: ig }); const F = tiny(S, x - 40, 760, { s: 0.85, look: 4, mood: "sad", pose: "cross", parent: ig }); blanket(S, F, S.start); S.text("FREEZING", x, 835, { size: DS.type.small, c: DS.c("red", 2), t: T0(S), parent: ig }); }
    if (i === 2) { const hg = S.grp(ig); house(S, x, 720, 0.9, { parent: hg }); blurry(hg, 9); S.text("A BLUR", x, 835, { size: DS.type.small, c: DS.c("red", 2), t: T0(S), parent: ig }); }
  });
  DS.vignette(S); }

// "I did say getting stepped on was the least of it." (Brain)
{ const S = sc(80, 0, { cam: "push", focus: "960 560" }); garden(S, DS.outdoor(S, GARD.dusk), { blades: false });
  const F = tiny(S, 960, 960, { s: 1.5, look: 0, mood: "flat" }); blanket(S, F, S.start);
  const top = 960 - 1.5 * 309 - 75, B = brainy(S, 960, top + 6, 0.85, { face: "tired" }); B.enter(W(80, 0) - 0.2, 0, 60, 0.5); B.talk(W(80, 0), END(80)); B.face(W(80, 7), "smile");
  card(S, "THE LEAST OF IT", 1420, 330, { t: W(80, 7), tc: "red", size: DS.type.small });
  DS.vignette(S); }

// Dave sits back at the breakfast table, full size, wrapped in a blanket, and eats this morning's toast crumb in one bite.
{ const S = sc(81, 0, { cam: "push", focus: "960 600" }); DS.room(S, KITCHEN);
  kChair(S, 700, 800); const F = dave(S, 700, 800, "near", { s: 1.45, sit: true, look: 6, mood: "smile", float: true }); blanket(S, F, S.start);
  kTable(S, 820, 900, 720); const px = 1270, py = 706;
  const cg = crumb(S, px, py, 0.32, {});
  tl.to(cg, { x: F.hd[0] + F.r * 0.7 - px, y: F.hd[1] + F.r * 0.5 - py, duration: 0.9, ease: "power2.in" }, W(81, 17)); tl.to(cg, { opacity: 0, duration: 0.1 }, W(81, 20));
  F.face(W(81, 20), "happy", 6); talk(S, F, W(81, 17), W(81, 20));
  card(S, "ONE BITE", 1200, 330, { t: W(81, 20), tc: "green", size: DS.type.title });
  card(S, "THIS MORNING'S CRUMB", 1250, 190, { t: W(81, 15), size: DS.type.caption });
  DS.vignette(S); }

// Haldane was right. Every animal has a best size.
{ const S = sc(82, 0, { cam: "push", focus: "960 600" }); garden(S, DS.outdoor(S, GARD.morning), { blades: false });
  const A = ant(S, 330, 940, 0.9, { face: "smile", dir: 1 }); rodent(S, 700, 940, 1.4, { name: "earth", long: true }); rodent(S, 1050, 940, 1.5, {});
  const F = dave(S, 1560, 960, "near", { s: 1.3, look: -3, mood: "happy" });
  [[330, 700], [700, 700], [1050, 700], [1560, 420]].forEach(([x, ty], i) => { const g = S.grp(); tick(S, x, ty, 1.0, W(82, 3) + i * 0.3, "green", g); fadeG(S, g, W(82, 3) + i * 0.3, 0.3); });
  card(S, "HALDANE WAS RIGHT", 960, 190, { t: W(82, 0), size: DS.type.small }); card(S, "EVERY ANIMAL HAS A BEST SIZE", 960, 330, { t: W(82, 3), tc: "green", size: DS.type.caption });
  DS.vignette(S); }

// And Dave was already the right size.
{ const S = sc(83, 0, { cam: "push", focus: "960 600" }); DS.room(S, KITCHEN);
  kChair(S, 700, 800); const F = dave(S, 700, 800, "near", { s: 1.45, sit: true, look: 6, mood: "happy", float: true }); blanket(S, F, S.start);
  kTable(S, 820, 900, 720);
  const A = ant(S, 1270, 712, 0.5, { face: "smile", look: -3, dir: -1 });
  S.draw(circ(F.cx, F.hd[1] + 150, 250, 340), W(83, 5), 0, { c: DS.c("gold", 0), w: DS.w.near });
  card(S, "THE RIGHT SIZE", 1240, 170, { t: W(83, 5), tc: "green", size: DS.type.title });
  DS.vignette(S); }
