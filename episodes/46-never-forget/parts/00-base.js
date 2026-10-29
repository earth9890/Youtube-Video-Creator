// look: still
// @library auto
// What If You Never Forgot Anything? (~8 min). What-if escalation: the wish -> the people who remember -> not everything -> everything (S.) -> the shelf that won't close -> the twist (false memories) -> what forgetting is for -> the empty slot.
// Built from the asset library (lib.py find/show; L.put). New library file: library/ep46-never-forget.js (ep46-binder, ep46-binder-open, ep46-shelf, ep46-binder-wall, ep46-warehouse, ep46-field, ep46-delete-key, ep46-filmstrip, ep46-envelope-pile, ep46-ham, ep46-hair-dryer).
// Runner: Dave's SHELF OF BINDERS, one binder per day. A few binders -> a shelf -> a wall (chapter 5) -> a warehouse (ch. 5/6) -> Brain wheels it away (last chapter) and leaves one empty slot. Second runner: the car lost in a very large field (clip 1, 4, 71).
// Cast (Look K, pure stick figures; told apart by props and labels): Dave (kit-dave), Dave's Brain (kit-brain-*, the ep38 librarian), the lab scientist "doc" (girl03, round glasses + clipboard), A.J. (girl05, purple label), S. (man06, red cap + notebook, orange label), Luria (man07, glasses + beard + clipboard),
// the blind man from Ohio (man04, dark glasses, white cane). Real scientists are labelled generic figures, never likenesses.
// VISUAL SAFETY: nothing flashes or strobes. Binders appear one by one and the wall is a slow build; flames, smoke and bars move slowly; swaps are 0.35 s cross-fades.
// ---------- timing: one picture per beat; shots register with their cue, run in order at the end (99-run.js) ----------
const SHOTS = [];
const shot = (c, w, fn, o) => SHOTS.push({ c, w, fn, o });
const END = (c) => CLIP(c)[1];
const T0 = (S) => Math.max(0, S.start - 0.6); // static text sits under the crossfade, so carried-over labels never blink
// ---------- text ----------
const card = (S, s, x, y, o = {}) => DS.card(S, s, x, y, Object.assign({ size: DS.type.small }, o, { t: o.t ?? T0(S) }));
const txt = (S, s, x, y, o = {}) => S.text(s, x, y, Object.assign({ size: DS.type.small, c: DS.c("ink") }, o, { t: o.t ?? T0(S) }));
const chap = (S, s) => card(S, s, 70 + 17 * s.length, 110, { fill: "yellow" }); // chapter card, top left, on the chapter's first picture(s)
const study = (S, s, t) => card(S, s, 960, 110, { t }); // year + place of the study
// ---------- backgrounds ----------
const bg = (S, name, o = {}) => L.put(S, name, 0, 0, o);
const field = (S, name, tone = 1) => S.fill(rect(-40, -40, 2000, 1160), T0(S), 0, DS.c(name, tone), 1);
const paper = (S, cx, cy, wd, ht, t, name = "white") => { const g = S.grp(); DS.drop(S, rrect(cx - wd / 2 + 8, cy - ht / 2 + 12, wd, ht, DS.r.md), { t, parent: g }); DS.shape(S, rrect(cx - wd / 2, cy - ht / 2, wd, ht, DS.r.md), name, { t, flat: true, w: "detail", parent: g }); return g; };
// ---------- people (head top ~ gy - 372 s; Look K = pure stick) ----------
const HEAD = 372;
const dave = (S, x, gy, o = {}) => L.put(S, "kit-dave", x, gy, Object.assign({ s: 1.1, face: "smile" }, o));
const guy = (S, style, x, gy, o = {}) => L.put(S, "person", x, gy, Object.assign({ style, s: 1.05, face: "smile", hair: "none" }, o));
const brain = (S, x, gy, k = 1.2, mood = "tired", o = {}) => L.put(S, "kit-brain-" + mood, x, gy, Object.assign({ s: k }, o));
// the lab scientist: round glasses and a clipboard (clipboard sits at chest height on her free side)
const doc = (S, x, gy, o = {}) => {
  const s = o.s || 1.05, fl = o.flip ? -1 : 1, g = S.grp(o.parent);
  guy(S, "girl03", x, gy, Object.assign({ s, acc: ["glasses"], pose: "hold" }, o, { parent: g }));
  L.put(S, "p2-clipboard", x + fl * 78 * s, gy - 200 * s, { s: 0.62 * s, flip: o.flip, t: o.t, parent: g });
  return g;
};
const AJ = { style: "girl05", s: 1.05 };
const aj = (S, x, gy, o = {}) => guy(S, AJ.style, x, gy, Object.assign({}, AJ, o));
const ss = (S, x, gy, o = {}) => guy(S, "man06", x, gy, Object.assign({ s: 1.05, acc: ["cap"] }, o)); // S., the reporter
const luria = (S, x, gy, o = {}) => {
  const s = o.s || 1.05, fl = o.flip ? -1 : 1, g = S.grp(o.parent);
  guy(S, "man07", x, gy, Object.assign({ s, acc: ["glasses", "beard"], pose: "hold", face: "flat" }, o, { parent: g }));
  L.put(S, "p2-clipboard", x + fl * 78 * s, gy - 200 * s, { s: 0.62 * s, flip: o.flip, t: o.t, parent: g });
  return g;
};
// mouth flaps: copies of the same figure with open mouths, switched on and off (seek-safe tl.set); the base face never changes
const FLAP = [1, 2, 0, 2, 1, 2, 0, 1, 2, 2, 0, 1];
const flaps = (a, b, t0, t1) => { let i = 0; for (let t = t0; t < t1 - 0.1; t += 0.2, i++) { const s = FLAP[i % FLAP.length]; tl.set(a, { opacity: s === 1 ? 1 : 0 }, t); tl.set(b, { opacity: s === 2 ? 1 : 0 }, t); } tl.set([a, b], { opacity: 0 }, t1); };
const talkPut = (S, name, x, gy, o, c) => {
  const g = L.put(S, name, x, gy, o), m = (mo) => { const k = L.put(S, name, x, gy, Object.assign({}, o, { t: undefined, mouth: mo })); k.setAttribute("opacity", 0); return k; };
  flaps(m("o"), m("a"), W(c, 0), END(c)); return g;
};
const daveTalk = (S, x, gy, o, c) => talkPut(S, "kit-dave", x, gy, Object.assign({ s: 1.1, face: "smile" }, o), c);
const MOUTHC = DS.mix(DS.P.red[2], DS.P.ink[0], 0.45);
const brainTalk = (S, x, gy, k, mood, c, o = {}) => {
  const g = brain(S, x, gy, k, mood, o), y = gy - 168 * k, mk = (rx, ry) => el("path", { d: circ(x, y, rx * k, ry * k), fill: MOUTHC, stroke: DS.P.ink[0], "stroke-width": DS.w.hair, opacity: 0 }, S.g);
  flaps(mk(8, 4.5), mk(8, 9), W(c, 0), END(c)); return g;
};
// ---------- the runner: a shelf of binders ----------
const shelf = (S, x, gy, n, o = {}) => L.put(S, "ep46-shelf", x, gy, Object.assign({ n }, o));
const binder = (S, x, gy, label, o = {}) => L.put(S, "ep46-binder", x, gy, Object.assign({ label }, o));
// thought bubble above a head (hx = head centre x, hy = head top y); o: s, dx, gap, y + thought-pic options
const think = (S, hx, hy, o = {}) => {
  const s = o.s || 0.7, ry = L.thoughtBox(o)[1] * s, bx = hx + (o.dx || 0), by = o.y ?? hy - (o.gap ?? 60) - ry;
  return L.put(S, "thought-pic", bx, by, Object.assign({}, o, { s, tx: (hx - bx) / s, ty: (hy - 6 - by) / s }));
};
// ---------- small kit ----------
const fadeG = (S, g, t, dur = 0.35) => { if (t !== undefined && t > S.start + 0.05) tl.fromTo(g, { opacity: 0 }, { opacity: 1, duration: dur }, t); return g; };
const fadeOut = (g, t, dur = 0.35, to = 0) => tl.to(g, { opacity: to, duration: dur }, t);
const swap = (a, b, t, dur = 0.35) => { fadeOut(a, t, dur); tl.fromTo(b, { opacity: 0 }, { opacity: 1, duration: dur, immediateRender: false }, t); b.setAttribute("opacity", 0); };
const grow = (g, t, x, y, dur = 0.7) => { const tf = (k) => `translate(${x} ${y}) scale(${k} 1) translate(${-x} ${-y})`; tl.fromTo(g, { attr: { transform: tf(0.02) } }, { attr: { transform: tf(1) }, duration: dur, ease: "power2.out" }, t); };
const scaleY = (g, t, x, y, dur = 0.6, k0 = 0.02, k1 = 1) => { const tf = (k) => `translate(${x} ${y}) scale(1 ${k}) translate(${-x} ${-y})`; tl.fromTo(g, { attr: { transform: tf(k0) } }, { attr: { transform: tf(k1) }, duration: dur, ease: "power2.out", immediateRender: false }, t); };
const shift = (g, t, dur, from, to, ease = "power1.inOut") => tl.fromTo(g, { attr: { transform: `translate(${from[0]} ${from[1]})` } }, { attr: { transform: `translate(${to[0]} ${to[1]})` }, duration: dur, ease, immediateRender: false }, t);
const tick = (S, x, y, k, t, name = "green") => S.tick(x, y, k, t, 0, { c: DS.c(name), w: DS.w.near });
const xMark = (S, x, y, k, t) => S.cross(x, y, k, t, 0, { c: DS.c("red"), w: DS.w.near });
const arrowR = (S, x1, y1, x2, y2, t, o = {}) => S.arrow(x1, y1, x2, y2, t, 0.3, { c: DS.c(o.c || "ink", o.tone || 0), w: DS.w.near, bend: o.bend || 0 });
const panel = (S, cx, cy, wd, ht, t, name = "white") => paper(S, cx, cy, wd, ht, t, name);
// seek-safe count-up text
const countUp = (S, x, y, from, to, t, dur, o = {}) => {
  const fmt = o.fmt || ((n) => Math.round(n).toLocaleString("en-US")), te = S.text(fmt(from), x, y, { size: o.size || DS.type.title, c: o.c || DS.c("red", 2), t: o.t0 ?? t, anchor: o.anchor, parent: o.parent });
  const v = { n: from }; te.textContent = fmt(from);
  tl.fromTo(v, { n: from }, { n: to, duration: dur, ease: o.ease || "power1.out", immediateRender: false, onUpdate: () => (te.textContent = fmt(v.n)) }, t);
  return te;
};
// a vertical bar: bottom-left (x, yb), width wd, full height hmax, value frac; grows on t; fills with a DS colour name
const vbar = (S, x, yb, wd, hmax, frac, name, t, o = {}) => {
  const g = S.grp(); DS.shape(S, rrect(x, yb - hmax * frac, wd, hmax * frac, DS.r.sm), name, { w: "detail", parent: g });
  scaleY(g, t, x, yb, o.dur || 0.8, o.k0 ?? 0.02, 1); return g;
};
// tiny doodle person (icon grids): head circle + body, drawn with the engine
const mini = (S, x, gy, k, o = {}) => {
  const t = o.t ?? S.start, c = o.c || DS.c("ink"), w = o.w || DS.w.mid, g = S.grp(o.parent);
  S.draw(`M${x} ${gy - 50 * k} L${x} ${gy - 22 * k} M${x - 11 * k} ${gy} L${x} ${gy - 22 * k} L${x + 11 * k} ${gy} M${x - 15 * k} ${gy - 30 * k} L${x} ${gy - 44 * k} L${x + 15 * k} ${gy - 30 * k}`, t, 0, { c, w, parent: g });
  S.draw(circ(x, gy - 63 * k, 13 * k), t, 0, { c, w, fill: o.fill || DS.P.white[0], parent: g });
  return g;
};
// Dave's head as a cut-away: a big white circle with a floor, a shelf of n binders and (optionally) the Brain at its desk
const headRoom = (S, cx, cy, r, n, o = {}) => {
  const g = S.grp(o.parent);
  DS.shape(S, circ(cx, cy, r), "white", { flat: true, w: "near", parent: g });
  DS.shape(S, `M${cx - r * 0.86} ${cy + r * 0.46} H${cx + r * 0.86} V${cy + r * 0.52} H${cx - r * 0.86} Z`, "wood", { w: "detail", parent: g });
  if (n > 0) L.put(S, "ep46-shelf", cx + (o.sx || 0), cy + r * 0.5, { s: o.ss || r / 520, n, rows: o.rows || 2, wd: o.sw || 380, parent: g, seed: o.seed });
  if (o.brain) L.put(S, "kit-brain-" + o.brain, cx + (o.bx ?? -r * 0.5), cy + r * 0.5, { s: r / 330, parent: g });
  return g;
};
