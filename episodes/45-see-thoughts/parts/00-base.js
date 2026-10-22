// look: still
// @library auto
// What If You Could See Everyone's Thoughts? (~8.3 min). What-if escalation over five days: hour one -> hour six -> day two -> day four -> day five.
// Built from the asset library (lib.py find/show; L.put). New library file: library/thoughts.js (thought-pic, thought-flood, prop-umbrella-ducks, prop-fishbowl, prop-beeper, sci-mri-scanner).
// Runner: THOUGHT BUBBLES over heads. Few, clear and useful (hour one) -> changing, everywhere (hour six) -> one overlapping flood (train) -> Dave hides the one he can't see under a woolly hat
// (day four) -> read slowly, a second kinder bubble under the loud one (twist) -> fading (day five) -> the last image: Dave's own bubble, finally visible: "did I leave the oven on?"
// Cast: Dave (kit-dave), Dave's Brain (kit-brain-*, the ep38 librarian), the lab scientist "doc" (person girl03, lab coat, glasses). Real scientists are name cards only, never likenesses.
// VISUAL SAFETY: nothing flashes or strobes; bubbles fade in over 0.35 s and changing bubbles cross-fade. Intrusive thoughts are mild and silly; no horror imagery, no tracks or platforms edges in danger.
// ---------- timing: one picture per beat; shots register with their cue, run in order at the end (99-run.js) ----------
const SHOTS = [];
const shot = (c, w, fn, o) => SHOTS.push({ c, w, fn, o });
const END = (c) => CLIP(c)[1];
const T0 = (S) => Math.max(0, S.start - 0.6); // static text sits under the crossfade, so carried-over labels never blink
// ---------- text ----------
const card = (S, s, x, y, o = {}) => DS.card(S, s, x, y, Object.assign({ size: DS.type.small }, o, { t: o.t ?? T0(S) }));
const txt = (S, s, x, y, o = {}) => S.text(s, x, y, Object.assign({ size: DS.type.small, c: DS.c("ink") }, o, { t: o.t ?? T0(S) }));
const clock = (S, s) => card(S, s, 230, 110, { fill: "yellow" }); // the story's clock: HOUR 1, HOUR 6, DAY 2, DAY 4, DAY 5
const study = (S, s, t) => card(S, s, 960, 110, { t }); // year + names of the study
// ---------- backgrounds ----------
const bg = (S, name, o = {}) => L.put(S, name, 0, 0, o);
const field = (S, name, tone = 1) => S.fill(rect(-40, -40, 2000, 1160), T0(S), 0, DS.c(name, tone), 1);
// Dave's window: a wall with a big window and curtains, framing the street outside
const windowFrame = (S) => {
  const g = S.grp();
  DS.shape(S, "M-40 -40 H1960 V1120 H-40 Z M150 96 V990 H1770 V96 Z", "wall", { flat: true, w: "mid", parent: g });
  DS.shape(S, rect(130, 978, 1660, 34), "wood", { w: "detail", parent: g });
  DS.shape(S, "M150 96 H330 Q300 520 360 990 H150 Z", "red", { w: "mid", parent: g });
  DS.shape(S, "M1770 96 H1590 Q1620 520 1560 990 H1770 Z", "red", { w: "mid", parent: g });
  DS.shape(S, rect(120, 70, 1680, 30), "wood", { w: "detail", parent: g });
  return g;
};
// ---------- people (head top ~ gy - 372 s) ----------
const HEAD = 372;
const dave = (S, x, gy, o = {}) => L.put(S, "kit-dave", x, gy, Object.assign({ s: 1.1, face: "smile" }, o));
const guy = (S, style, x, gy, o = {}) => L.put(S, "person", x, gy, Object.assign({ style, s: 1.05, face: "smile" }, o));
const seat = (S, x, gy, name = "furn-dining-chair", flip = false) => L.put(S, name, x, gy, { s: 1.15, flip });
const brain = (S, x, gy, k = 1.2, mood = "tired", o = {}) => L.put(S, "kit-brain-" + mood, x, gy, Object.assign({ s: k }, o));
const DOC = { style: "girl03", outfit: "labcoat", outfitC: "white", acc: ["glasses"], s: 1.1, face: "smile" };
const SAM = { style: "man04", outfit: "hoodie", outfitC: "green" }, JO = { style: "girl08", outfit: "sweater", outfitC: "orange" };
const NEIGH = { style: "man05", outfit: "sweater", outfitC: "teal", body: "chubby" };
// mouth flaps: copies of the same figure with open mouths, switched on and off (seek-safe tl.set); the base face never changes
const FLAP = [1, 2, 0, 2, 1, 2, 0, 1, 2, 2, 0, 1];
const flaps = (a, b, t0, t1) => { let i = 0; for (let t = t0; t < t1 - 0.1; t += 0.2, i++) { const s = FLAP[i % FLAP.length]; tl.set(a, { opacity: s === 1 ? 1 : 0 }, t); tl.set(b, { opacity: s === 2 ? 1 : 0 }, t); } tl.set([a, b], { opacity: 0 }, t1); };
const talkPut = (S, name, x, gy, o, c) => {
  const g = L.put(S, name, x, gy, o), m = (mo) => { const k = L.put(S, name, x, gy, Object.assign({}, o, { t: undefined, mouth: mo })); k.setAttribute("opacity", 0); return k; };
  flaps(m("o"), m("a"), W(c, 0), END(c)); return g;
};
const daveTalk = (S, x, gy, o, c) => talkPut(S, "kit-dave", x, gy, Object.assign({ s: 1.1, face: "smile" }, o), c);
const docTalk = (S, x, gy, o, c) => talkPut(S, "person", x, gy, Object.assign({}, DOC, o), c);
const MOUTHC = DS.mix(DS.P.red[2], DS.P.ink[0], 0.45);
const brainTalk = (S, x, gy, k, mood, c, o = {}) => {
  const g = brain(S, x, gy, k, mood, o), y = gy - 168 * k, mk = (rx, ry) => el("path", { d: circ(x, y, rx * k, ry * k), fill: MOUTHC, stroke: DS.P.ink[0], "stroke-width": DS.w.hair, opacity: 0 }, S.g);
  flaps(mk(8, 4.5), mk(8, 9), W(c, 0), END(c)); return g;
};
// ---------- the runner: thought bubbles ----------
// a bubble above a head (hx = head centre x, hy = head top y); the tail points at the head. o: s, dx, gap, y, + thought-pic options
const think = (S, hx, hy, o = {}) => {
  const s = o.s || 0.7, ry = L.thoughtBox(o)[1] * s, bx = hx + (o.dx || 0), by = o.y ?? hy - (o.gap ?? 60) - ry;
  return L.put(S, "thought-pic", bx, by, Object.assign({}, o, { s, tx: (hx - bx) / s, ty: (hy - 6 - by) / s }));
};
// ---------- small kit ----------
const fadeG = (S, g, t, dur = 0.35) => { if (t !== undefined && t > S.start + 0.05) tl.fromTo(g, { opacity: 0 }, { opacity: 1, duration: dur }, t); return g; };
const fadeOut = (g, t, dur = 0.35, to = 0) => tl.to(g, { opacity: to, duration: dur }, t);
const swap = (a, b, t, dur = 0.35) => { fadeOut(a, t, dur); tl.fromTo(b, { opacity: 0 }, { opacity: 1, duration: dur, immediateRender: false }, t); b.setAttribute("opacity", 0); };
const grow = (g, t, x, y, dur = 0.7) => { const tf = (k) => `translate(${x} ${y}) scale(${k} 1) translate(${-x} ${-y})`; tl.fromTo(g, { attr: { transform: tf(0.02) } }, { attr: { transform: tf(1) }, duration: dur, ease: "power2.out" }, t); };
const scaleY = (g, t, x, y, dur = 0.6, k0 = 0.02, k1 = 1) => { const tf = (k) => `translate(${x} ${y}) scale(1 ${k}) translate(${-x} ${-y})`; tl.fromTo(g, { attr: { transform: tf(k0) } }, { attr: { transform: tf(k1) }, duration: dur, ease: "power2.out" }, t); };
const shift = (g, t, dur, from, to, ease = "power1.inOut") => tl.fromTo(g, { attr: { transform: `translate(${from[0]} ${from[1]})` } }, { attr: { transform: `translate(${to[0]} ${to[1]})` }, duration: dur, ease, immediateRender: false }, t);
const tick = (S, x, y, k, t, name = "green") => S.tick(x, y, k, t, 0, { c: DS.c(name), w: DS.w.near });
const xMark = (S, x, y, k, t) => S.cross(x, y, k, t, 0, { c: DS.c("red"), w: DS.w.near });
const arrowR = (S, x1, y1, x2, y2, t, o = {}) => S.arrow(x1, y1, x2, y2, t, 0.3, { c: DS.c(o.c || "ink", o.tone || 0), w: DS.w.near, bend: o.bend || 0 });
const panel = (S, cx, cy, wd, ht, t, name = "white") => { const g = S.grp(); DS.drop(S, rrect(cx - wd / 2 + 8, cy - ht / 2 + 12, wd, ht, DS.r.md), { t, parent: g }); DS.shape(S, rrect(cx - wd / 2, cy - ht / 2, wd, ht, DS.r.md), name, { t, flat: true, w: "detail", parent: g }); return g; };
// seek-safe count-up text
const countUp = (S, x, y, from, to, t, dur, o = {}) => {
  const fmt = o.fmt || ((n) => Math.round(n).toLocaleString("en-US")), te = S.text(fmt(from), x, y, { size: o.size || DS.type.title, c: o.c || DS.c("red", 2), t: o.t0 ?? t, anchor: o.anchor, parent: o.parent });
  const v = { n: from }; te.textContent = fmt(from);
  tl.fromTo(v, { n: from }, { n: to, duration: dur, ease: o.ease || "power1.out", immediateRender: false, onUpdate: () => (te.textContent = fmt(v.n)) }, t);
  return te;
};
// a horizontal bar: label on the left, the bar grows on its word, the value lands at its end
const hbar = (S, label, x, y, full, frac, name, t, val) => {
  txt(S, label, x - 28, y + 18, { anchor: "end" });
  DS.shape(S, rrect(x, y - 34, full, 68, DS.r.sm), "white", { flat: true, w: "detail" });
  const g = S.grp(); DS.shape(S, rrect(x, y - 34, Math.max(full * frac, 30), 68, DS.r.sm), name, { w: "detail", parent: g }); grow(g, t, x, y);
  S.text(val, x + Math.max(full * frac, 30) + 22, y + 18, { size: DS.type.small, t: t + 0.45, c: DS.c("ink"), anchor: "start" });
};
// tiny doodle person (icon grids)
const mini = (S, x, gy, k, o = {}) => {
  const t = o.t ?? S.start, c = o.c || DS.c("ink"), w = o.w || DS.w.mid, g = S.grp(o.parent);
  S.draw(`M${x} ${gy - 50 * k} L${x} ${gy - 22 * k} M${x - 11 * k} ${gy} L${x} ${gy - 22 * k} L${x + 11 * k} ${gy} M${x - 15 * k} ${gy - 30 * k} L${x} ${gy - 44 * k} L${x + 15 * k} ${gy - 30 * k}`, t, 0, { c, w, parent: g });
  S.draw(circ(x, gy - 63 * k, 13 * k), t, 0, { c, w, fill: o.fill || DS.P.white[0], parent: g });
  return g;
};
const grid = (S, n, cols, x0, y0, gap, k, hi = () => false, t, hiT) => { for (let i = 0; i < n; i++) { const x = x0 + (i % cols) * gap, y = y0 + Math.floor(i / cols) * gap * 1.3; mini(S, x, y, k, { t }); if (hi(i)) fadeG(S, mini(S, x, y, k, { fill: DS.c("yellow"), c: DS.c("red", 2) }), hiT); } };
