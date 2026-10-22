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
