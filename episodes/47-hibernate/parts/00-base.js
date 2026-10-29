// look: still
// @library auto
// What If Humans Could Hibernate? (~8 min). What-if escalation: Dave hangs a sign "BACK IN APRIL", then meets the bear, the squirrel, the lemur, the switch, Mars, and the twist.
// Built from the asset library (lib.py find/show; L.put). New library file: library/ep47-hibernate.js (ep47-sign, ep47-front-door, ep47-bear, ep47-squirrel, ep47-lemur, ep47-tree-hole, ep47-den, ep47-burrow, ep47-ship, ep47-dial, ep47-months).
// Runner: the SIGN on Dave's front door "BACK IN APRIL"; it gets a new line each chapter (18 bladder / 35 small tail, hot room / 47 switch not found / 58 sleeping on the way to Mars / 72-73 nap break every three weeks).
// Second runner: the winter calendar strip (NOV..APR) that Dave keeps trying to skip.
// Cast (Look K = pure stick figures, told apart by props + one accent): Dave (kit-dave, no props, blue accent on cards), Doc (girl03, round glasses + clipboard + "DOC" tag, teal accent), researchers/engineers (generic figure + name card),
// astronauts (helmet circle), animals drawn in colour. No real likenesses; real scientists are name cards.
// VISUAL SAFETY: nothing flashes or strobes; everything fades in over 0.35 s; the warm-up shivers are slow, small shifts; the heart pulse is a calm 4 % scale; danger beats (hypothermia) are a thermometer and a card, nothing graphic.
// ---------- timing: one picture per beat; shots register with their cue, run in order at the end (99-run.js) ----------
const SHOTS = [];
const shot = (c, w, fn, o) => SHOTS.push({ c, w, fn, o });
const END = (c) => CLIP(c)[1];
const T0 = (S) => Math.max(0, S.start - 0.6); // static text sits under the crossfade, so carried-over labels never blink
// ---------- text ----------
const card = (S, s, x, y, o = {}) => DS.card(S, s, x, y, Object.assign({ size: DS.type.small }, o, { t: o.t ?? T0(S) }));
const txt = (S, s, x, y, o = {}) => S.text(s, x, y, Object.assign({ size: DS.type.small, c: DS.c("ink") }, o, { t: o.t ?? T0(S) }));
const stamp = (S, s, x, y, o = {}) => card(S, s, x, y, Object.assign({ fill: "yellow" }, o)); // the story label: yellow card
// ---------- backgrounds ----------
const bg = (S, name, o = {}) => L.put(S, name, 0, 0, o);
const field = (S, name, tone = 1) => S.fill(rect(-40, -40, 2000, 1160), T0(S), 0, DS.c(name, tone), 1);
// ---------- people (head top ~ gy - 372 s) ----------
const HEAD = 372;
const dave = (S, x, gy, o = {}) => L.put(S, "kit-dave", x, gy, Object.assign({ s: 1.1, face: "smile" }, o));
const guy = (S, style, x, gy, o = {}) => L.put(S, "person", x, gy, Object.assign({ style, s: 1.05, face: "smile" }, o));
// Doc: round glasses + clipboard in hand (Look K draws no clothes); the clipboard is a prop placed by doc()
const DOC = { style: "girl03", hair: "none", acc: ["glasses"], s: 1.1, face: "smile" };
const clip = (S, x, gy, k, o = {}) => L.put(S, "p2-clipboard", x + (o.flip ? -28 : 28) * k, gy - 140 * k, { s: 0.9 * k, flip: o.flip, t: o.t, parent: o.parent });   // held to the chest
const doc = (S, x, gy, o = {}) => { const k = o.s || DOC.s, g = guy(S, DOC.style, x, gy, Object.assign({}, DOC, o)); clip(S, x, gy, k, o); return g; };
// mouth flaps: copies of the same figure with open mouths, switched on and off (seek-safe tl.set); the base face never changes
const FLAP = [1, 2, 0, 2, 1, 2, 0, 1, 2, 2, 0, 1];
const flaps = (a, b, t0, t1) => { let i = 0; for (let t = t0; t < t1 - 0.1; t += 0.2, i++) { const s = FLAP[i % FLAP.length]; tl.set(a, { opacity: s === 1 ? 1 : 0 }, t); tl.set(b, { opacity: s === 2 ? 1 : 0 }, t); } tl.set([a, b], { opacity: 0 }, t1); };
const talkPut = (S, name, x, gy, o, c) => {
  const g = L.put(S, name, x, gy, o), m = (mo) => { const k = L.put(S, name, x, gy, Object.assign({}, o, { t: undefined, mouth: mo })); k.setAttribute("opacity", 0); return k; };
  flaps(m("o"), m("a"), W(c, 0), END(c)); return g;
};
const daveTalk = (S, x, gy, o, c) => talkPut(S, "kit-dave", x, gy, Object.assign({ s: 1.1, face: "smile" }, o), c);
const docTalk = (S, x, gy, o, c) => { const g = talkPut(S, "person", x, gy, Object.assign({}, DOC, o), c); clip(S, x, gy, o.s || DOC.s, o); return g; };
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
// a thought bubble above a head (hx = head centre x, hy = head top y); the tail points at the head. o: s, dx, gap, y, + thought-pic options
const think = (S, hx, hy, o = {}) => {
  const s = o.s || 0.7, ry = L.thoughtBox(o)[1] * s, bx = hx + (o.dx || 0), by = o.y ?? hy - (o.gap ?? 60) - ry;
  return L.put(S, "thought-pic", bx, by, Object.assign({}, o, { s, tx: (hx - bx) / s, ty: (hy - 6 - by) / s }));
};
const ring = (S, x, y, rx, ry, t, name = "red") => S.ring(x, y, rx, ry, t, 0, { c: DS.c(name), w: DS.w.near });
// ---------- the runner: the sign on Dave's door ----------
const SIGN = ["BACK IN APRIL", "bladder not available", "small tail, hot room", "switch not found", "sleeping on the way to Mars", "nap break every three weeks"];
// door close-up with the sign showing n lines; with tNew the n-th line (index n-1) fades in on its word. Dave stands left of the door.
const doorClose = (S, n, tNew, o = {}) => {
  bg(S, "ep47-scene-door", { close: true });
  L.put(S, "ep47-sign", 1080, 150, { lines: SIGN.slice(0, tNew === undefined ? n : n - 1), cap: n, colors: o.colors });
  if (tNew !== undefined) L.put(S, "ep47-sign", 1080, 150, { lines: SIGN.slice(0, n), cap: n, only: n - 1, t: tNew, colors: o.colors });
};
const snowfall = (S, t) => L.put(S, "weather-snow", 960, 470, { s: 2.1, t });
// the winter calendar strip (second runner)
const months = (S, x, y, o = {}) => L.put(S, "ep47-months", x, y, Object.assign({ s: 1 }, o));
// stroke-on reveal of a path element (seek-safe): lines on charts draw themselves left to right
const drawOn = (el, t, dur = 1.2) => { el.style.strokeDasharray = "1 2"; tl.fromTo(el, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: dur, ease: "none", immediateRender: true }, t); return el; };   // paths carry pathLength=1, so the dash is normalised
// real dashes (the engine paths are normalised to pathLength 1, so drop it first)
const dashed = (p, d = "14 12") => { p.removeAttribute("pathLength"); p.style.strokeDasharray = d; return p; };
// a calm pulse (4 %) on a group, beats slowing from period p0 to p1 between t0 and t1; (cx, cy) = scale origin
const beats = (g, cx, cy, t0, t1, p0, p1) => { let t = t0, k = 0; while (t < t1 - 0.3) { const p = p0 + (p1 - p0) * Math.min(1, (t - t0) / (t1 - t0)); tl.fromTo(g, { scale: 1, svgOrigin: `${cx} ${cy}` }, { scale: 1.045, svgOrigin: `${cx} ${cy}`, duration: 0.3, yoyo: true, repeat: 1, ease: "sine.inOut", immediateRender: false }, t); t += p; k++; } };
// a figure or prop that shivers (slow, small shifts; seek-safe): build(wrapper) puts things in it
const shiver = (S, build, t0, t1, amp = 4, per = 0.7) => { const w = S.grp(); build(w); for (let t = t0; t < t1 - 0.7; t += per) tl.fromTo(w, { attr: { transform: `translate(${-amp} 0)` } }, { attr: { transform: `translate(${amp} 0)` }, duration: per / 2, yoyo: true, repeat: 1, ease: "sine.inOut", immediateRender: false }, t); return w; };
// a researcher: generic stick figure holding a clipboard (name cards say who)
const sci = (S, x, gy, o = {}) => { const g = S.grp(o.parent); guy(S, o.style || "man06", x, gy, Object.assign({ s: 1.05, hair: "none", face: "smile", parent: g }, o)); clip(S, x, gy, o.s || 1.05, { parent: g, flip: o.flip, t: o.t }); return g; };
// the hibernation temperature trace: a low flat line with a warm-up spike every few weeks; draws itself left to right between t0 and t0 + dur
const saw = (S, x0, y0, w, h, t0, dur, o = {}) => {
  const base = y0 + h * 0.86, top = y0 + 6, pts = [[x0, base]], n = o.spikes || 4;
  for (let k = 0; k < n; k++) { const p = x0 + w * (0.14 + 0.72 * k / Math.max(n - 1, 1)); pts.push([p - 70, base], [p - 24, top + 10], [p, top], [p + 26, top + 18], [p + 90, base]); }
  pts.push([x0 + w, base]);
  S.draw(`M${x0} ${y0} V${y0 + h} H${x0 + w}`, T0(S), 0, { c: DS.c("ink"), w: DS.w.mid });
  dashed(S.draw(`M${x0} ${top} H${x0 + w}`, T0(S), 0, { c: DS.c("red", 1), w: DS.w.detail }), "12 10");
  txt(S, "37°", x0 - 24, top + 18, { anchor: "end", size: DS.type.caption });
  const p = S.draw(L.smooth(pts), t0, 0, { c: DS.c("orange", 2), w: DS.w.near }); drawOn(p, t0, dur);
  return { x: (k) => x0 + w * (0.14 + 0.72 * k / Math.max(n - 1, 1)), top, base };
};
