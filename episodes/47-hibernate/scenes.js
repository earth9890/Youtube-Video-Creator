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
// ===================== chapter 1: Back in April (clips 1-8) =====================
const GEAR = ["beanie", "scarf"]; // Dave's winter gear, outdoors only
// 1 "This is Dave. Dave is done with winter. He has hung a sign on his front door that says: back in April."
shot(1, 0, (S) => {
  bg(S, "ep47-scene-door");
  dave(S, 700, 905, { s: 1.35, acc: GEAR, pose: "hug-self", face: "act-shiver" });
  card(S, "THIS IS DAVE", 700, 130);
}, { cam: "push" });
shot(1, 8, (S) => {
  bg(S, "ep47-scene-door", { close: true });
  dave(S, 540, 900, { s: 1.1, acc: GEAR, pose: "reach", face: "determined" });
  L.put(S, "ep47-sign", 1080, 150, { lines: [SIGN[0]], t: W(1, 12), pop: true });
}, { cam: "push" });
// 2 (@dave) "I'm going to sleep through all of it, like a bear. Wake me when it's April. Not before."
shot(2, 0, (S) => {
  bg(S, "ep47-scene-bedroom");
  L.put(S, "ep47-bed", 1330, 915, { s: 1.15, dave: false });
  daveTalk(S, 560, 930, { s: 1.25, face: "smile", pose: "hips" }, 2);
  think(S, 560, 930 - HEAD * 1.25, { s: 0.62, t: W(2, 9), pic: "ep47-bear", picO: { sleep: true }, picS: 0.95, picY: 40, dx: 130, seed: 3 });
});
shot(2, 11, (S) => {
  bg(S, "ep47-scene-bedroom");
  L.put(S, "ep47-bed", 1330, 915, { s: 1.15, dave: false });
  daveTalk(S, 560, 930, { s: 1.25, face: "determined", pose: "point" }, 2);
  months(S, 1130, 300, { s: 0.95, t: W(2, 11) });
  ring(S, 1130 + 2.5 * 166 * 0.95, 300, 92, 112, W(2, 15));
});
// 3 "So what would happen if humans could hibernate?"
shot(3, 0, (S) => {
  bg(S, "world-snow-forest");
  L.put(S, "ep47-bear", 500, 900, { s: 1.15, sleep: true });
  L.put(S, "ep47-squirrel", 1020, 900, { s: 1.5, sleep: true, zzz: true, t: W(3, 3) });
  L.put(S, "ep47-bed", 1520, 930, { s: 0.85, t: W(3, 5), pop: true });
  card(S, "COULD HUMANS HIBERNATE?", 960, 130, { fill: "yellow" });
}, { cam: "pull" });
// 4 "Could you really skip five months, or would your body quietly refuse?"
shot(4, 0, (S) => {
  field(S, "sky", 1);
  const x0 = 960, y0 = 480;
  months(S, x0, y0, { s: 1.55, t: W(4, 0) });
  for (let i = 0; i < 5; i++) xMark(S, x0 + (i - 2.5) * 166 * 1.55, y0, 1.7, W(4, 3) + i * 0.22);
  card(S, "SKIP FIVE MONTHS?", 960, 160);
}, { cam: "push" });
shot(4, 6, (S) => {
  bg(S, "ep47-scene-bedroom", { time: "light" });
  const d = dave(S, 760, 950, { s: 1.5, pose: "cross", face: "grumpy" });
  think(S, 760, 950 - HEAD * 1.5, { s: 0.55, t: W(4, 9), text: "nope.", size: DS.type.title, dx: 120, seed: 9 });
}, { cam: "zoom", focus: "760 520" });
// 5 "Here is the plan. We'll borrow tricks from a bear, a squirrel and a lemur, and meet the space agency that wants to try it on astronauts."
shot(5, 0, (S) => {
  field(S, "sky", 1);
  panel(S, 960, 520, 1640, 720, T0(S));
  card(S, "THE PLAN", 960, 190, { fill: "yellow" });
  const X = [340, 770, 1170, 1580];
  L.put(S, "ep47-bear", X[0], 700, { s: 0.72 });
  L.put(S, "ep47-squirrel", X[1], 700, { s: 1.4, fat: 0.4 });
  L.put(S, "ep47-lemur", X[2], 700, { s: 1.5 });
  L.put(S, "job-astronaut", X[3], 700, { s: 1.0 });
  ["BEAR", "SQUIRREL", "LEMUR", "SPACE AGENCY"].forEach((s, i) => card(S, s, X[i], 790, { size: DS.type.caption, t: [W(5, 9), W(5, 11), W(5, 14), W(5, 18)][i] }));
}, { cam: "push" });
// 6 "And Dave will find out that his sign is wrong about one very important word."
shot(6, 0, (S) => {
  doorClose(S, 1);
  dave(S, 540, 900, { s: 1.1, acc: GEAR, pose: "think", face: "worried" });
  ring(S, 1295, 298, 150, 62, W(6, 9));
  card(S, "ONE WORD IS WRONG", 960, 600, { t: W(6, 11), fill: "yellow" });
}, { cam: "push" });
// 7 "Scientists keep the terms simple. Torpor is a deep, energy-saving chill. When it lasts for many days, it is called hibernation."
shot(7, 0, (S) => {
  bg(S, "room-science-lab-light");
  doc(S, 520, 940, { s: 1.25, pose: "hold", face: "smile" });
  card(S, "TORPOR", 1260, 230, { t: W(7, 5), fill: "sky" });
  L.put(S, "p2-battery-low", 1450, 640, { s: 2.2, level: 0.2, t: W(7, 8), pop: true });
  L.put(S, "weather-snowflake", 1100, 660, { s: 1.3, t: W(7, 10), pop: true });
  card(S, "DEEP, ENERGY-SAVING CHILL", 1260, 880, { size: DS.type.caption, t: W(7, 8) });
});
shot(7, 11, (S) => {
  field(S, "sky", 1);
  const g = S.grp(), y = 520;
  DS.shape(S, rrect(260, y - 40, 1400, 80, DS.r.sm), "white", { flat: true, w: "detail" });
  DS.shape(S, rrect(260, y - 40, 1400, 80, DS.r.sm), "blue", { w: "detail", parent: g }); grow(g, W(7, 11), 260, y, 1.6);
  for (let i = 0; i < 12; i++) S.draw(`M${300 + i * 118} ${y + 60} v22`, T0(S), 0, { c: DS.c("ink"), w: DS.w.detail });
  card(S, "MANY DAYS", 960, 760, { t: W(7, 13) });
  card(S, "TORPOR", 460, 330, { t: W(7, 5) });
  card(S, "HIBERNATION", 1440, 330, { t: W(7, 19), fill: "yellow" });
  S.arrow(700, 330, 1180, 330, W(7, 17), 0.5, { c: DS.c("ink"), w: DS.w.near });
}, { cam: "push" });
// 8 "Dave turns off the lights, climbs into bed, and waits to become a bear."
shot(8, 0, (S) => {
  bg(S, "ep47-scene-bedroom", { time: "light" });
  L.put(S, "ep47-bed", 1330, 915, { s: 1.15, dave: false });
  L.put(S, "ep47-switch", 760, 540, { s: 0.5, on: true });
  dave(S, 520, 930, { s: 1.2, pose: "reach", face: "smile" });
  L.put(S, "ep47-switch", 760, 540, { s: 0.5, on: false, t: W(8, 3) });
});
shot(8, 7, (S) => {
  bg(S, "ep47-scene-bedroom");
  L.put(S, "ep47-bed", 1120, 925, { s: 1.35, face: "open", zzz: false });
  think(S, 1045, 925 - 190 * 1.35, { s: 0.6, t: W(8, 12), pic: "ep47-bear", picS: 0.95, picY: 40, dx: 20, gap: 30, seed: 8 });
}, { cam: "push" });
// ===================== chapter 2: The bear (clips 9-18) =====================
const woods = (S) => bg(S, "world-snow-forest");
// 9 "Start with the bear. In 2011, researchers at the University of Alaska Fairbanks watched black bears hibernate in dens built for the study."
shot(9, 0, (S) => {
  woods(S);
  L.put(S, "ep47-den", 1330, 880, { s: 0.8, zzz: true });
  sci(S, 380, 930, { style: "man06", s: 1.1, t: W(9, 8) });
  sci(S, 640, 930, { style: "girl06", s: 1.1, t: W(9, 9) });
  card(S, "THE BLACK BEAR", 1330, 130, { t: W(9, 3), fill: "yellow" });
  card(S, "2011 · ALASKA FAIRBANKS", 640, 130, { t: W(9, 5), size: DS.type.caption });
});
shot(9, 19, (S) => {
  woods(S);
  L.put(S, "ep47-den", 960, 880, { s: 1.1, logs: true, zzz: true });
  card(S, "A DEN BUILT FOR THE STUDY", 960, 130, { t: W(9, 20) });
}, { cam: "zoom", focus: "960 600" });
// 10 "The bears spent five to seven months without eating, drinking, urinating or defecating."
shot(10, 0, (S) => {
  field(S, "sky", 1);
  months(S, 960, 500, { s: 1.25, names: ["NOV", "DEC", "JAN", "FEB", "MAR", "APR", "MAY"], hi: [0, 1, 2, 3, 4, 5, 6], goal: -1 });
  card(S, "FIVE TO SEVEN MONTHS", 960, 200, { t: W(10, 3), fill: "yellow" });
  L.put(S, "ep47-bear", 960, 900, { s: 0.7, sleep: true });
});
shot(10, 7, (S) => {
  field(S, "sky", 1);
  const X = [330, 770, 1190, 1590], items = [["prop-apple", 1.8, "NO EATING"], ["p2-water-drop", 2.4, "NO DRINKING"], ["furn-toilet", 1.5, "NO URINATING"], ["p2-toilet-paper", 2.2, "NO DEFECATING"]];
  items.forEach(([n, k, lab], i) => {
    const t = W(10, 8 + i);
    L.put(S, n, X[i], n === "furn-toilet" ? 640 : 500, { s: k, color: "water" });
    xMark(S, X[i], 500, 2.4, t + 0.4);
    card(S, lab, X[i], 760, { size: DS.type.caption });
  });
}, { cam: "push" });
// 11 "Their metabolism dropped to about twenty-five percent of normal."
shot(11, 0, (S) => {
  field(S, "paper", 1);
  const a = L.put(S, "ep47-dial", 960, 610, { s: 1.9, v: 1, label: "NORMAL" });
  swap(a, L.put(S, "ep47-dial", 960, 610, { s: 1.9, v: 0.25, label: "25 %", c: "orange", t: W(11, 2) }), W(11, 2), 0.8);
  card(S, "METABOLISM", 960, 150, { fill: "yellow" });
  L.put(S, "ep47-bear", 360, 880, { s: 0.8, sleep: true, t: W(11, 3) });
}, { cam: "push" });
// 12 "A seventy-five percent discount on being alive."
shot(12, 0, (S) => {
  field(S, "pink", 1);
  L.put(S, "ep-heart", 760, 580, { s: 3.4 });
  card(S, "75% OFF", 1330, 400, { size: DS.type.display, fill: "yellow", t: W(12, 3) });
  card(S, "BEING ALIVE", 1330, 600, { t: W(12, 5) });
}, { cam: "push" });
// 13 "Here is the strange part. Their core temperature fell by only five or six degrees. Normally, chemistry slows by about half for every ten degrees of cooling."
shot(13, 0, (S) => {
  field(S, "sky", 1);
  L.put(S, "ep47-thermo", 760, 800, { s: 1.4, min: 20, max: 40, val: 31 });
  const y = (d) => 800 + 40 * 1.4 - (d - 20) / 20 * 520 * 1.4 - 40 * 1.4;
  S.draw(`M600 ${y(37)} H980`, W(13, 7), 0, { c: DS.c("red"), w: DS.w.mid });
  S.arrow(1060, y(37), 1060, y(31) - 6, W(13, 9), 0.5, { c: DS.c("red"), w: DS.w.near });
  card(S, "ONLY 5 OR 6 DEGREES", 1400, 450, { t: W(13, 10), fill: "yellow" });
  L.put(S, "ep47-bear", 1400, 900, { s: 0.8, sleep: true, t: W(13, 5) });
}, { cam: "push" });
shot(13, 15, (S) => {
  field(S, "paper", 1);
  L.put(S, "sci-flask", 260, 560, { s: 2.2 });
  card(S, "CHEMISTRY", 260, 820, {});
  L.put(S, "ep47-thermo", 600, 800, { s: 1.2, min: 20, max: 40, val: 30 });
  S.arrow(840, 330, 840, 770, W(13, 22), 0.5, { c: DS.c("blue"), w: DS.w.near });
  card(S, "-10 DEGREES", 1060, 560, { size: DS.type.caption });
  L.put(S, "ep47-dial", 1540, 600, { s: 1.4, v: 0.5, label: "HALF SPEED", c: "orange" });
});
// 14 "So the bears did far more than the cold alone could explain."
shot(14, 0, (S) => {
  field(S, "paper", 1);
  card(S, "BEARS VS COLD", 960, 160, { fill: "yellow" });
  hbar(S, "THE BEARS", 560, 430, 1000, 0.75, "orange", S.start, "-75 %");
  hbar(S, "COLD ALONE", 560, 640, 1000, 0.3, "sky", S.start + 0.3, "A BIT");
  L.put(S, "ep47-bear", 360, 900, { s: 0.7, sleep: true, t: W(14, 2) });
});
// 15 "Their heart rate slowed from about fifty-five beats a minute to about fourteen."
shot(15, 0, (S) => {
  field(S, "pink", 1);
  const h = S.grp(); L.put(S, "ep-heart", 640, 520, { s: 3, parent: h });
  beats(h, 640, 520, S.start + 0.4, END(15) + 3, 1.09, 4.3);
  countUp(S, 1300, 580, 55, 14, W(15, 3), END(15) - W(15, 3) - 0.8, { size: DS.type.display, c: DS.c("red", 2), anchor: "middle", t0: W(15, 0) });
  txt(S, "BEATS A MINUTE", 1300, 700, { size: DS.type.body });
  card(S, "THE BEAR'S HEART", 960, 150, { fill: "yellow" });
}, { cam: "push" });
// 16 "Their body temperature drifted between thirty and thirty-six degrees, in slow cycles of two to seven days."
shot(16, 0, (S) => {
  field(S, "paper", 1);
  const x0 = 300, x1 = 1640, yT = 340, yB = 640;
  S.draw(`M${x0} ${yT} H${x1}`, T0(S), 0, { c: DS.c("red", 1), w: DS.w.detail }); S.draw(`M${x0} ${yB} H${x1}`, T0(S), 0, { c: DS.c("blue", 1), w: DS.w.detail });
  txt(S, "36°", x0 - 30, yT + 18, { anchor: "end", size: DS.type.body }); txt(S, "30°", x0 - 30, yB + 18, { anchor: "end", size: DS.type.body });
  const pts = []; let ph = 0; for (let i = 0; i <= 120; i++) { const x = x0 + (x1 - x0) * i / 120, f = 0.05 + 0.1 * (i / 120) * (1 + Math.sin(i / 14)); ph += f; pts.push([x, (yT + yB) / 2 + Math.sin(ph * 2.2) * 120]); }
  const p = S.draw(smooth(pts), S.start, 0, { c: DS.c("orange", 2), w: DS.w.near }); drawOn(p, S.start - 0.4, END(16) - S.start - 1.5);
  card(S, "SLOW CYCLES · 2 TO 7 DAYS", 960, 800, { t: W(16, 13) });
  L.put(S, "ep47-bear", 1500, 250, { s: 0.45, sleep: true, t: W(16, 0) });
});
// 17 (@doc) "Dave, a bear is not napping. It is running almost everything at a quarter speed, on purpose."
shot(17, 0, (S) => {
  woods(S);
  L.put(S, "ep47-den", 1450, 880, { s: 0.75, zzz: true });
  docTalk(S, 430, 930, { s: 1.25, pose: "hold" }, 17);
  card(S, "DOC", 430, 150, { fill: "sky" });
  dave(S, 900, 930, { s: 1.25, face: "confused", pose: "scratch-head", t: W(17, 0) });
});
shot(17, 7, (S) => {
  field(S, "paper", 1);
  L.put(S, "ep47-dial", 960, 600, { s: 1.9, v: 0.25, label: "¼ SPEED", c: "orange" });
  card(S, "ON PURPOSE", 960, 150, { t: W(17, 15), fill: "yellow" });
  L.put(S, "ep47-bear", 360, 880, { s: 0.8, sleep: true });
}, { cam: "push" });
// 18 "Dave adds a second line to his sign: bladder not available."
shot(18, 0, (S) => {
  doorClose(S, 2, W(18, 8));
  dave(S, 540, 900, { s: 1.1, acc: GEAR, pose: "reach", face: "smug" });
}, { cam: "push" });
// ===================== chapter 3: The squirrel (clips 19-27) =====================
// 19 "But a bear's trick starts in autumn. The arctic ground squirrel often doubles its body weight before it goes under. Fat is the fuel for the whole winter."
shot(19, 0, (S) => {
  bg(S, "scene-forest-sunset");
  L.put(S, "ep47-squirrel", 760, 900, { s: 1.7, t: W(19, 0) });
  L.put(S, "p2-acorn", 1160, 880, { s: 1.0, t: W(19, 5) });
  [[300, 300, "red"], [560, 200, "orange"], [1500, 260, "yellow"], [1250, 380, "orange"], [1700, 420, "red"]].forEach(([x, y, c], i) => L.put(S, "p2-leaf-" + c, x, y, { s: 2.2, rot: i * 40, t: W(19, 6) + i * 0.15 }));
  card(S, "AUTUMN", 960, 140, { t: W(19, 6), fill: "orange" });
}, { cam: "push" });
shot(19, 7, (S) => {
  field(S, "sand", 1);
  L.put(S, "ep47-squirrel", 560, 820, { s: 2.2, t: W(19, 7) });
  L.put(S, "ep47-squirrel", 1380, 820, { s: 2.2, fat: 1, t: W(19, 12), pop: true });
  S.arrow(780, 600, 1100, 600, W(19, 12), 0.5, { c: DS.c("ink"), w: DS.w.near });
  card(S, "BODY WEIGHT ×2", 960, 200, { t: W(19, 12), fill: "yellow" });
});
shot(19, 20, (S) => {
  field(S, "sand", 1);
  L.put(S, "ep47-squirrel", 700, 840, { s: 2.4, fat: 1 });
  L.put(S, "p2-battery-full", 1380, 600, { s: 3.2, level: 1, t: W(19, 21), pop: true });
  card(S, "FAT = FUEL", 1380, 840, { t: W(19, 21) });
  card(S, "THE WHOLE WINTER", 960, 170, { t: W(19, 24), fill: "yellow" });
});
// 20 "Then it spends seven to eight months in hibernation. Its out-of-office reply lasts most of the year."
shot(20, 0, (S) => {
  field(S, "sky", 1);
  months(S, 960, 250, { s: 0.88, names: ["OCT", "NOV", "DEC", "JAN", "FEB", "MAR", "APR", "MAY"], hi: [0, 1, 2, 3, 4, 5, 6, 7], goal: -1, tile: 140, t: W(20, 3) });
  L.put(S, "ep47-burrow", 960, 470, { s: 0.95, zzz: true });
  card(S, "SEVEN TO EIGHT MONTHS", 960, 110, { t: W(20, 3), fill: "yellow" });
}, { cam: "push" });
shot(20, 9, (S) => {
  field(S, "sky", 1);
  L.put(S, "ep47-burrow", 560, 430, { s: 0.85, zzz: true });
  panel(S, 1330, 520, 720, 560, T0(S));
  S.fill(rrect(970, 270, 720, 96, DS.r.md), T0(S), 0, DS.c("red", 0), 1);
  txt(S, "OUT OF OFFICE", 1330, 335, { size: DS.type.body, c: DS.P.white[0] });
  txt(S, "Hello. I am away", 1330, 470, { size: DS.type.small, t: W(20, 11) });
  txt(S, "until spring.", 1330, 540, { size: DS.type.small, t: W(20, 11) });
  txt(S, "Do not dig.", 1330, 640, { size: DS.type.small, t: W(20, 13), c: DS.c("red", 2) });
});
// 21 "Dave looks at his cupboards with a plan in his eyes."
shot(21, 0, (S) => {
  bg(S, "kit-room-kitchen-day");
  dave(S, 880, 950, { s: 1.35, face: "mischief", pose: "hips" });
  think(S, 880, 950 - HEAD * 1.35, { s: 0.58, t: W(21, 7), pic: "ep47-squirrel", picO: { fat: 1 }, picS: 1.5, picY: 60, dx: 170, seed: 21 });
}, { cam: "push" });
// 22 "To be clear, this is a thought experiment. Please don't try any of this."
shot(22, 0, (S) => {
  field(S, "paper", 1);
  dave(S, 560, 920, { s: 1.5, face: "worried", pose: "shrug" });
  card(S, "A THOUGHT EXPERIMENT", 1260, 360, { size: DS.type.body });
  L.put(S, "sign-cross-badge", 1260, 620, { s: 2.0, pop: true });
  card(S, "PLEASE DON'T TRY THIS", 1260, 840, { fill: "yellow" });
});
// 23 "The squirrel goes further than the bear. In 1987, a biologist at the University of Alaska Fairbanks, Brian Barnes, fitted twelve arctic ground squirrels with temperature transmitters."
shot(23, 0, (S) => {
  bg(S, "world-snow-forest");
  L.put(S, "ep47-bear", 500, 900, { s: 1.1 });
  L.put(S, "ep47-squirrel", 1300, 900, { s: 1.5, t: W(23, 1) });
  S.arrow(700, 640, 1080, 640, W(23, 3), 0.5, { c: DS.c("red"), w: DS.w.near });
  card(S, "GOES FURTHER", 960, 150, { t: W(23, 3), fill: "yellow" });
});
shot(23, 10, (S) => {
  bg(S, "world-snow-forest");
  sci(S, 620, 930, { style: "man06", s: 1.4 });
  card(S, "BRIAN BARNES", 620, 130, { t: W(23, 18), fill: "sky" });
  card(S, "BIOLOGIST · UNIVERSITY OF ALASKA FAIRBANKS", 1140, 380, { t: W(23, 11), size: DS.type.caption });
  card(S, "1987", 1140, 540, { t: W(23, 8), size: DS.type.title });
});
shot(23, 21, (S) => {
  field(S, "sky", 1);
  for (let i = 0; i < 12; i++) {
    const x = 400 + (i % 4) * 380, y = 400 + Math.floor(i / 4) * 230, t = W(23, 21) + i * 0.14;
    L.put(S, "ep47-squirrel", x, y + 110, { s: 0.82, t });
    S.draw(`M${x + 6} ${y + 24} v-44`, t + 0.3, 0, { c: DS.c("ink"), w: DS.w.detail }); S.fill(circ(x + 6, y - 24, 9), W(23, 26), 0, DS.c("red"), 1);
  }
  card(S, "12 SQUIRRELS · TRANSMITTERS", 960, 130, { t: W(23, 25), fill: "yellow" });
});
// 24 "Their bodies cooled below freezing. Minus two point nine degrees Celsius: the lowest body temperature ever recorded in a mammal."
shot(24, 0, (S) => {
  field(S, "sky", 1);
  L.put(S, "ep47-squirrel", 960, 850, { s: 2.8, sleep: true });
  [[360, 300], [1560, 340], [560, 640], [1400, 640], [900, 260]].forEach(([x, y], i) => L.put(S, "weather-snowflake", x, y, { s: 1.5, t: W(24, 2) + i * 0.15 }));
  card(S, "BELOW FREEZING", 960, 130, { t: W(24, 3), fill: "yellow" });
});
shot(24, 5, (S) => {
  field(S, "sky", 1);
  L.put(S, "ep47-thermo", 520, 770, { s: 1.25, min: -10, max: 40, val: -2.9 });
  countUp(S, 1280, 480, 0, -2.9, W(24, 5), 1.6, { fmt: (n) => n.toFixed(1).replace("-", "−") + " °C", size: DS.type.display, c: DS.c("blue", 2), anchor: "middle" });
  card(S, "LOWEST EVER IN A MAMMAL", 1280, 700, { t: W(24, 11), fill: "yellow" });
  L.put(S, "ep47-squirrel", 1480, 920, { s: 1.0, sleep: true, t: W(24, 12) });
});
// 25 (@dave) "Minus three? Fine. I'll just wear a very good hat."
shot(25, 0, (S) => {
  bg(S, "ep47-scene-door");
  daveTalk(S, 900, 905, { s: 1.6, acc: ["tophat", "scarf"], face: "smug", pose: "hips" }, 25);
}, { cam: "zoom", focus: "900 560" });
// 26 "A hat will not help, Dave. A Harvard researcher later pointed out that in humans, a drop of a couple of degrees leads to hypothermia and can be fatal."
shot(26, 0, (S) => {
  bg(S, "ep47-scene-door");
  dave(S, 900, 905, { s: 1.6, acc: ["tophat", "scarf"], face: "worried", pose: "hips" });
  xMark(S, 900, 905 - 400 * 1.6 + 10, 2.6, W(26, 3));
});
shot(26, 6, (S) => {
  field(S, "paper", 1);
  sci(S, 560, 930, { style: "girl06", s: 1.4 });
  card(S, "A HARVARD RESEARCHER", 560, 130, { t: W(26, 7), fill: "sky" });
  L.put(S, "bubble-round", 1260, 420, { s: 1.2, text: "In humans, a couple of degrees is trouble.", tail: "left", t: W(26, 12) });
});
shot(26, 15, (S) => {
  field(S, "paper", 1);
  dave(S, 560, 930, { s: 1.5, face: "worried", pose: "hug-self", acc: ["scarf"] });
  L.put(S, "ep47-thermo", 1060, 800, { s: 1.1, min: 30, max: 40, val: 35, t: W(26, 16) });
  S.draw(`M900 ${800 - 1.1 * 0.7 * 520} H1220`, W(26, 16), 0, { c: DS.c("red"), w: DS.w.mid });
  S.arrow(1280, 800 - 1.1 * 0.7 * 520, 1280, 800 - 1.1 * 0.5 * 520, W(26, 19), 0.5, { c: DS.c("blue"), w: DS.w.near });
  card(S, "A COUPLE OF DEGREES", 1620, 440, { t: W(26, 19), size: DS.type.caption });
  card(S, "HYPOTHERMIA", 1620, 590, { t: W(26, 24), fill: "sky" });
  card(S, "CAN BE FATAL", 1620, 720, { t: W(26, 26), fill: "yellow" });
});
// 27 "The squirrel's route is closed to us."
shot(27, 0, (S) => {
  bg(S, "world-snow-forest");
  dave(S, 480, 930, { s: 1.4, face: "sad", pose: "hips" });
  [760, 1160].forEach((x) => DS.shape(S, rrect(x - 18, 640, 36, 280, DS.r.xs), "wood", { w: "detail" }));
  DS.shape(S, rrect(740, 650, 440, 70, DS.r.xs), "red", { w: "mid" });
  for (let i = 0; i < 4; i++) DS.shape(S, `M${790 + i * 100} 650 l50 0 l-30 70 l-50 0 Z`, "white", { flat: true, w: "hair" });
  card(S, "ROUTE CLOSED", 960, 560, { t: W(27, 3), fill: "yellow" });
  L.put(S, "ep47-squirrel", 1560, 900, { s: 1.3, sleep: true });
}, { cam: "pull" });
// ===================== chapter 4: The lemur (clips 28-35) =====================
// 28 "So look for a hibernator in your own family. In Madagascar, the fat-tailed dwarf lemur hibernates for up to seven months in the dry season."
shot(28, 0, (S) => {
  bg(S, "room-living-room-light");
  [[560, 330], [960, 300], [1360, 330]].forEach(([x, y], i) => DS.frame(S, x - 110, y - 90, 220, 180, ["sky", "pink", "wall"][i]));
  [[560, 330], [960, 300], [1360, 330]].forEach(([x, y], i) => i < 2 && L.put(S, "animal-monkey", x, y + 80, { s: 0.45, t: W(28, 4) + i * 0.3 }));
  dave(S, 860, 950, { s: 1.35, face: "thinking", pose: "hold" });

  card(S, "IN YOUR OWN FAMILY", 960, 130, { t: W(28, 5), fill: "yellow" });
}, { cam: "push" });
shot(28, 9, (S) => {
  bg(S, "scene-jungle-day");
  L.put(S, "ep47-lemur", 960, 900, { s: 2.6, t: W(28, 11) });
  card(S, "MADAGASCAR", 560, 130, { t: W(28, 10), fill: "sky" });
  card(S, "FAT-TAILED DWARF LEMUR", 1320, 130, { t: W(28, 12), fill: "yellow" });
}, { cam: "zoom", focus: "960 620" });
shot(28, 16, (S) => {
  field(S, "sand", 1);
  months(S, 960, 480, { s: 1.15, names: ["APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT"], hi: [], goal: -1 });
  L.put(S, "sun-rays", 240, 190, { s: 0.9, t: W(28, 22) });
  L.put(S, "ep47-lemur", 520, 900, { s: 1.3, sleep: true, t: W(28, 16) });
  card(S, "UP TO SEVEN MONTHS", 960, 190, { t: W(28, 19), fill: "yellow" });
  card(S, "THE DRY SEASON", 1160, 780, { t: W(28, 23) });
});
// 29 "In 2004, researchers reported that these lemurs were the first primates known to hibernate. And they don't need cold at all."
shot(29, 0, (S) => {
  field(S, "sand", 1);
  L.put(S, "ep47-lemur", 760, 900, { s: 2.4, sleep: true, zzz: true });
  card(S, "2004", 1420, 330, { t: W(29, 0), size: DS.type.title });
  L.put(S, "sport-trophy", 1420, 640, { s: 2.2, t: W(29, 10), pop: true });
  card(S, "FIRST PRIMATE TO HIBERNATE", 1380, 880, { t: W(29, 11), size: DS.type.caption, fill: "yellow" });
}, { cam: "push" });
shot(29, 16, (S) => {
  field(S, "sand", 1);
  L.put(S, "ep47-lemur", 600, 900, { s: 2.2 });
  L.put(S, "weather-snowflake", 1280, 500, { s: 2.6, t: W(29, 19) });
  xMark(S, 1280, 500, 3.6, W(29, 21));
  card(S, "NO COLD NEEDED", 1280, 800, { t: W(29, 19), fill: "yellow" });
  L.put(S, "sun-rays", 1700, 200, { s: 1.1 });
});
// 30 "The lemurs settle in tree holes where the air regularly rises above thirty degrees, and their bodies simply follow the temperature of the hole."
shot(30, 0, (S) => {
  field(S, "dusk", 1);
  L.put(S, "ep47-tree-hole", 620, 1000, { s: 1.1 });
  const a = L.put(S, "ep47-thermo", 1330, 840, { s: 1.15, min: 20, max: 40, val: 23 });
  swap(a, L.put(S, "ep47-thermo", 1330, 840, { s: 1.15, min: 20, max: 40, val: 32, t: W(30, 9) }), W(30, 9), 0.9);
  card(S, "AIR · ABOVE 30°", 1330, 120, { t: W(30, 11), fill: "yellow" });
}, { cam: "push" });
shot(30, 14, (S) => {
  field(S, "dusk", 1);
  L.put(S, "ep47-tree-hole", 460, 1000, { s: 0.95 });
  const hole = L.put(S, "ep47-thermo", 1000, 840, { s: 1.1, min: 20, max: 40, val: 32 });
  card(S, "THE HOLE", 1000, 190, { size: DS.type.caption });
  const b = L.put(S, "ep47-thermo", 1500, 840, { s: 1.1, min: 20, max: 40, val: 23, t: W(30, 15) });
  swap(b, L.put(S, "ep47-thermo", 1500, 840, { s: 1.1, min: 20, max: 40, val: 32, t: W(30, 18) }), W(30, 18), 0.9);
  card(S, "THE LEMUR'S BODY", 1500, 190, { size: DS.type.caption, t: W(30, 15) });
  card(S, "=", 1250, 520, { size: DS.type.display, t: W(30, 20), fill: "yellow" });
});
// 31 "Their tails store the fat for the whole season. The animal is named after its best feature."
shot(31, 0, (S) => {
  field(S, "sand", 1);
  L.put(S, "ep47-lemur", 960, 930, { s: 2.9 });
  ring(S, 760, 880, 210, 120, W(31, 1));
  card(S, "FAT STORE", 520, 420, { t: W(31, 1), fill: "yellow" });
}, { cam: "push" });
shot(31, 9, (S) => {
  field(S, "sand", 1);
  L.put(S, "ep47-lemur", 960, 930, { s: 2.9 });
  L.put(S, "label-ribbon", 960, 190, { s: 1.8, text: "FAT-TAILED", size: DS.type.title, t: W(31, 12) });
  card(S, "NAMED AFTER ITS BEST FEATURE", 960, 300, { t: W(31, 13), size: DS.type.caption });
});
// 32 "In 2013, two more dwarf lemur species were found hibernating underground in cold mountain forest. The lead researcher said they look more like temperate hibernators than we thought."
shot(32, 0, (S) => {
  bg(S, "scene-snowy-mountains-day");
  L.put(S, "ep47-burrow", 960, 420, { s: 1.35, squirrel: false });
  L.put(S, "ep47-lemur", 840, 420 + 344 * 1.35, { s: 1.0, sleep: true, t: W(32, 4) });
  L.put(S, "ep47-lemur", 1130, 420 + 344 * 1.35, { s: 1.0, sleep: true, t: W(32, 5), flip: true });
  card(S, "2013 · TWO MORE SPECIES", 960, 120, { t: W(32, 3), fill: "yellow" });
  card(S, "UNDERGROUND · COLD MOUNTAIN FOREST", 960, 260, { t: W(32, 12), size: DS.type.caption });
});
shot(32, 17, (S) => {
  field(S, "paper", 1);
  sci(S, 520, 930, { style: "girl04", s: 1.4 });
  card(S, "THE LEAD RESEARCHER", 520, 130, { fill: "sky" });
  L.put(S, "bubble-round", 1260, 400, { s: 1.15, text: "More like temperate hibernators than we thought.", tail: "left", t: W(32, 21) });
  L.put(S, "ep47-lemur", 1560, 930, { s: 1.2, sleep: true, t: W(32, 24) });
});
// 33 "The thread running through all of them is not cold. It is scarcity. When food and water run short, a mammal can migrate, or it can turn its metabolism way down."
shot(33, 0, (S) => {
  field(S, "paper", 1);
  L.put(S, "ep47-bear", 400, 800, { s: 0.9, sleep: true });
  L.put(S, "ep47-squirrel", 960, 800, { s: 1.5, sleep: true });
  L.put(S, "ep47-lemur", 1480, 800, { s: 1.4, sleep: true });
  const thread = S.draw(smooth([[180, 560], [400, 640], [700, 540], [960, 640], [1240, 540], [1480, 640], [1760, 560]]), W(33, 3), 0, { c: DS.c("red"), w: DS.w.mid }); drawOn(thread, W(33, 3), 1.4);
  L.put(S, "weather-snowflake", 700, 300, { s: 1.8, t: W(33, 8) }); xMark(S, 700, 300, 2.8, W(33, 9));
  card(S, "NOT COLD", 700, 460, { t: W(33, 8), size: DS.type.caption });
  card(S, "SCARCITY", 1260, 330, { t: W(33, 10), fill: "yellow", size: DS.type.title });
}, { cam: "push" });
shot(33, 13, (S) => {
  field(S, "paper", 1);
  L.put(S, "food-apple-core", 380, 520, { s: 3.4, t: W(33, 14) }); L.put(S, "p2-water-drop", 760, 520, { s: 2.8, t: W(33, 16), color: "sky" });
  card(S, "FOOD AND WATER RUN SHORT", 560, 250, { t: W(33, 14), size: DS.type.caption });
  L.put(S, "story-fork-road", 1330, 940, { s: 0.95, left: "MIGRATE", right: "SLOW DOWN" });
}, { cam: "push" });
// 34 "Dave is a primate. The lemur is a very distant cousin who got the family's best trick."
shot(34, 0, (S) => {
  field(S, "sand", 1);
  dave(S, 420, 930, { s: 1.5, face: "proud", pose: "hips" });
  card(S, "PRIMATE", 420, 150, { t: W(34, 1), fill: "yellow", size: DS.type.title });
  L.put(S, "ep47-lemur", 1500, 930, { s: 2.0, t: W(34, 5) });
  dashed(S.draw(`M640 700 Q960 520 1260 700`, W(34, 7), 0, { c: DS.c("ink"), w: DS.w.near }), "6 20");
  card(S, "VERY DISTANT COUSIN", 960, 440, { t: W(34, 8), fill: "yellow" });
  card(S, "THE BEST TRICK", 1500, 400, { t: W(34, 14), size: DS.type.caption });
});
// 35 "Dave adds a third line to his sign: small tail, hot room."
shot(35, 0, (S) => {
  doorClose(S, 3, W(35, 8));
  dave(S, 540, 900, { s: 1.1, acc: GEAR, pose: "reach", face: "smug" });
}, { cam: "push" });
// ===================== chapter 5: Where is the switch? (clips 36-47) =====================
// 36 "So far, Dave has three problems: the fat, the cold and the switch."
shot(36, 0, (S) => {
  field(S, "sky", 1);
  dave(S, 230, 950, { s: 1.2, face: "worried", pose: "hips" });
  const X = [660, 1060, 1470];
  panel(S, X[0], 520, 340, 420, T0(S)); panel(S, X[1], 520, 340, 420, T0(S)); panel(S, X[2], 520, 340, 420, T0(S));
  L.put(S, "ep47-squirrel", X[0], 640, { s: 1.5, fat: 1 });
  L.put(S, "ep47-thermo", X[1] - 30, 700, { s: 0.55, min: -10, max: 40, val: -2.9 });
  L.put(S, "ep47-switch", X[2], 520, { s: 0.8, on: false });
  [["THE FAT", W(36, 7)], ["THE COLD", W(36, 9)], ["THE SWITCH", W(36, 12)]].forEach(([s, t], i) => card(S, s, X[i], 780, { t, size: DS.type.caption }));
  card(S, "THREE PROBLEMS", 1000, 170, { t: W(36, 5), fill: "yellow" });
});
// 37 "What flips the switch? In 2020, a team at Harvard Medical School found a group of neurons in a mouse's hypothalamus that can start a torpor-like state."
shot(37, 0, (S) => {
  field(S, "paper", 1);
  L.put(S, "ep47-switch", 1130, 620, { s: 2.0, on: false });
  dave(S, 480, 930, { s: 1.4, face: "confused", pose: "scratch-head" });
  card(S, "WHAT FLIPS THE SWITCH?", 960, 140, { fill: "yellow" });
}, { cam: "push" });
shot(37, 6, (S) => {
  bg(S, "room-science-lab-light");
  sci(S, 560, 940, { style: "man06", s: 1.3 }); sci(S, 880, 940, { style: "girl06", s: 1.3, t: W(37, 8) });
  card(S, "2020 · HARVARD MEDICAL SCHOOL", 960, 140, { t: W(37, 5) });
  L.put(S, "animal-mouse", 1380, 940, { s: 2.2, t: W(37, 7) });
});
shot(37, 14, (S) => {
  field(S, "pink", 1);
  L.put(S, "ep-brain-blob", 960, 560, { s: 3.6 });
  [[800, 560], [880, 620], [960, 580], [1040, 640], [900, 520]].forEach(([x, y], i) => L.put(S, "ep-neuron-lit", x, y, { s: 0.7, t: W(37, 16) + i * 0.15, name: "blue" }));
  card(S, "A GROUP OF NEURONS", 960, 150, { t: W(37, 15), fill: "yellow" });
  card(S, "THE HYPOTHALAMUS", 1540, 760, { t: W(37, 21), size: DS.type.caption });
  S.arrow(1400, 720, 1010, 640, W(37, 21), 0.5, { c: DS.c("ink"), w: DS.w.near });
  L.put(S, "animal-mouse", 340, 860, { s: 1.6, t: W(37, 19) });
}, { cam: "push" });
shot(37, 22, (S) => {
  field(S, "sky", 1);
  L.put(S, "animal-mouse", 960, 800, { s: 3.0 });
  L.put(S, "fx-zzz", 1180, 460, { s: 1.6, t: W(37, 25) });
  card(S, "A TORPOR-LIKE STATE", 960, 150, { t: W(37, 25), fill: "yellow" });
});
// 38 "Stimulating them dropped the mice into torpor, and kept them there for days. Silencing them stopped fasting mice from entering torpor, but changed nothing in well-fed mice."
shot(38, 0, (S) => {
  field(S, "sky", 1);
  L.put(S, "ep47-switch", 380, 540, { s: 1.0, on: true });
  card(S, "STIMULATE", 380, 810, { t: W(38, 0), size: DS.type.caption });
  L.put(S, "ep-neuron-lit", 960, 540, { s: 2.2, name: "blue", t: W(38, 1) });
  S.arrow(1200, 540, 1360, 540, W(38, 2), 0.4, { c: DS.c("ink"), w: DS.w.near });
  L.put(S, "animal-mouse", 1560, 700, { s: 2.2, t: W(38, 4) }); L.put(S, "fx-zzz", 1720, 430, { s: 1.4, t: W(38, 6) });
  card(S, "FOR DAYS", 1560, 880, { t: W(38, 10), fill: "yellow" });
});
shot(38, 13, (S) => {
  field(S, "paper", 1);
  L.put(S, "ep-neuron", 960, 260, { s: 1.3 });
  card(S, "SILENCED", 960, 400, { size: DS.type.caption, t: W(38, 13) });
  L.put(S, "animal-mouse", 560, 800, { s: 2.6 }); card(S, "FASTING", 560, 560, { t: W(38, 16), size: DS.type.caption }); xMark(S, 560, 720, 2.2, W(38, 18)); card(S, "NO TORPOR", 560, 920, { t: W(38, 19), size: DS.type.caption });
  L.put(S, "animal-mouse", 1400, 800, { s: 3.3 }); card(S, "WELL-FED", 1400, 520, { t: W(38, 25), size: DS.type.caption }); card(S, "NO CHANGE", 1400, 920, { t: W(38, 22), size: DS.type.caption, fill: "yellow" });
});
// 39 "One of the team, Sinisa Hrvatin, said the first step is studying the basic biology of torpor in animals, and that this is not science fiction."
shot(39, 0, (S) => {
  field(S, "paper", 1);
  sci(S, 520, 940, { style: "man07", s: 1.4 });
  card(S, "SINISA HRVATIN", 520, 130, { fill: "sky" });
  L.put(S, "bubble-round", 1300, 440, { s: 1.4, text: "First, study the basic biology of torpor.", tail: "left", t: W(39, 6) });
});
shot(39, 20, (S) => {
  field(S, "paper", 1);
  sci(S, 520, 940, { style: "man07", s: 1.4 });
  card(S, "SINISA HRVATIN", 520, 130, { fill: "sky" });
  L.put(S, "bubble-round", 1300, 440, { s: 1.4, text: "It is not science fiction.", tail: "left", t: W(39, 22) });
});
// 40 "His colleague Michael Greenberg said it was far too soon to say whether this could be done in a human."
shot(40, 0, (S) => {
  field(S, "paper", 1);
  sci(S, 520, 940, { style: "man08", s: 1.4 });
  card(S, "MICHAEL GREENBERG", 520, 130, { fill: "sky" });
  L.put(S, "bubble-round", 1100, 380, { s: 1.3, text: "Far too soon to say.", tail: "left", t: W(40, 5) });
  dave(S, 1560, 940, { s: 1.0, face: "worried", pose: "shrug", t: W(40, 17) });
  card(S, "IN A HUMAN?", 1560, 560, { t: W(40, 17), size: DS.type.caption, fill: "yellow" });
});
// 41 (@dave) "Is there a button? Please tell me there is a button somewhere on me."
shot(41, 0, (S) => {
  field(S, "paper", 1);
  daveTalk(S, 960, 960, { s: 1.9, face: "worried", pose: "arms-out" }, 41);
  [[960, 960 - 372 * 1.9 + 10, W(41, 3)], [960, 960 - 190 * 1.9, W(41, 10)], [1060, 960 - 260 * 1.9, W(41, 12)]].forEach(([x, y, t]) => { S.fill(circ(x, y, 30), t, 0.3, DS.c("red"), 1); S.text("?", x, y + 14, { size: DS.type.small, t, c: DS.P.white[0], anchor: "middle" }); });
});
// 42 "There is one last hope. Maybe we already did it, long ago."
shot(42, 0, (S) => {
  bg(S, "scene-cave-night");
  [[540, 930], [960, 940], [1380, 930]].forEach(([x, y], i) => dave(S, x, y, { s: 0.85, pose: "lie-down", face: "sleep" }));
  card(S, "ONE LAST HOPE", 960, 130, { t: W(42, 2), fill: "yellow" });
  card(S, "LONG AGO", 960, 280, { t: W(42, 10) });
}, { cam: "push" });
// 43 "In 2020, two researchers argued that four-hundred-thousand-year-old bones from a cave in Spain carried winter damage like that of hibernating mammals."
shot(43, 0, (S) => {
  bg(S, "scene-cave-day");
  sci(S, 520, 940, { style: "man06", s: 1.3 }); sci(S, 820, 940, { style: "girl06", s: 1.3, t: W(43, 3), flip: false });
  card(S, "2020 · TWO RESEARCHERS ARGUE", 960, 130, { t: W(43, 3) });
});
shot(43, 7, (S) => {
  field(S, "sand", 1);
  L.put(S, "body-bone", 700, 560, { s: 2.6, rot: -20 });
  L.put(S, "crt-skeleton", 1360, 900, { s: 1.4, pose: "stand" });
  card(S, "400,000 YEARS OLD", 960, 140, { t: W(43, 7), fill: "yellow" });
  card(S, "A CAVE IN SPAIN", 960, 280, { t: W(43, 11) });
});
shot(43, 14, (S) => {
  field(S, "sand", 1);
  L.put(S, "body-bone", 760, 600, { s: 3.6, rot: -12 });
  ring(S, 760, 640, 300, 190, W(43, 14));
  card(S, "WINTER DAMAGE", 960, 150, { t: W(43, 15), fill: "yellow" });
  L.put(S, "ep47-bear", 1500, 860, { s: 1.0, sleep: true, t: W(43, 19) });
  card(S, "LIKE HIBERNATING MAMMALS", 1500, 560, { t: W(43, 19), size: DS.type.caption });
});
// 44 "Even the authors thought it would have been unhealthy, because those people could not have built bear-sized fat stores. A hibernation plan with no pantry."
shot(44, 0, (S) => {
  bg(S, "scene-cave-day");
  dave(S, 480, 930, { s: 1.4, face: "sad", pose: "stand", t: W(44, 5) });
  L.put(S, "p2-battery-low", 480, 250, { s: 1.8, level: 0.15, t: W(44, 12), pop: true });
  L.put(S, "ep47-bear", 1380, 930, { s: 1.5 });
  L.put(S, "p2-battery-full", 1380, 250, { s: 1.8, level: 1, t: W(44, 15), pop: true });
  card(S, "BEAR-SIZED FAT STORES", 960, 110, { t: W(44, 15), fill: "yellow" });
});
shot(44, 19, (S) => {
  field(S, "sand", 1);
  DS.shape(S, rrect(560, 200, 800, 620, DS.r.sm), "wood", { w: "mid" });
  DS.shape(S, rrect(590, 230, 740, 560, DS.r.xs), "paper", { w: "detail", flat: true });
  [420, 610].forEach((y) => DS.shape(S, rrect(590, y, 740, 26, DS.r.xs), "wood", { w: "detail" }));
  L.put(S, "p2-acorn", 960, 562, { s: 0.9, t: W(44, 21) });
  card(S, "NO PANTRY", 960, 110, { t: W(44, 22), fill: "yellow" });
});
// 45 "Critics pointed to other explanations, and said large mammals cannot cool enough to truly hibernate. They enter a lighter state called torpor."
shot(45, 0, (S) => {
  field(S, "paper", 1);
  sci(S, 560, 940, { style: "man09", s: 1.4, pose: "point" });
  card(S, "THE CRITICS", 560, 130, { t: W(45, 0), fill: "sky" });
  L.put(S, "bubble-round", 1300, 420, { s: 1.3, text: "Other explanations?", tail: "left", t: W(45, 2) });
});
shot(45, 7, (S) => {
  field(S, "sky", 1);
  L.put(S, "ep47-bear", 400, 900, { s: 1.4 });
  card(S, "TRUE HIBERNATION", 1360, 360, { t: W(45, 13), size: DS.type.body });
  xMark(S, 1360, 360, 3.4, W(45, 12));
  card(S, "A LIGHTER STATE: TORPOR", 1360, 760, { t: W(45, 20), fill: "yellow", size: DS.type.small });
});
// 46 (@doc) "Dave, nobody has found the switch in a person. Please stop pressing your own forehead."
shot(46, 0, (S) => {
  bg(S, "room-science-lab-light");
  docTalk(S, 520, 940, { s: 1.35, pose: "hold" }, 46);
  dave(S, 1250, 940, { s: 1.35, face: "worried", pose: "facepalm", t: W(46, 10) });
  card(S, "DOC", 520, 140, { fill: "sky" });
});
// 47 "Dave adds a fourth line to his sign: switch not found."
shot(47, 0, (S) => {
  doorClose(S, 4, W(47, 8));
  dave(S, 540, 900, { s: 1.1, acc: GEAR, pose: "reach", face: "smug" });
}, { cam: "push" });
// ===================== chapter 6: Mars (clips 48-58) =====================
const deep = (S) => { field(S, "navy", 2); let r = 7; const rnd = () => ((r = (r * 16807) % 2147483647) - 1) / 2147483646; for (let i = 0; i < 70; i++) S.fill(circ(rnd() * 1920, rnd() * 930, 1.5 + rnd() * 2.5), T0(S), 0, DS.P.white[0], 0.45 + rnd() * 0.5); };   // plain starfield
// 48 "But one organisation is very interested in the switch. In 2019, engineers at the European Space Agency designed a spacecraft where the crew hibernates on the way to Mars."
shot(48, 0, (S) => {
  bg(S, "scene-office-district-day");
  L.put(S, "job-engineer", 500, 930, { s: 1.4, t: W(48, 2) });
  L.put(S, "ep47-switch", 1280, 560, { s: 1.5, on: false, t: W(48, 7), pop: true });
  card(S, "A SPACE AGENCY", 960, 130, { t: W(48, 2), fill: "yellow" });
}, { cam: "push" });
shot(48, 9, (S) => {
  field(S, "navy", 1);
  L.put(S, "job-engineer", 400, 930, { s: 1.2 }); L.put(S, "job-engineer", 740, 930, { s: 1.2, flip: true, t: W(48, 12) });
  card(S, "2019 · EUROPEAN SPACE AGENCY", 960, 140, { t: W(48, 9), size: DS.type.small });
  L.put(S, "ep47-ship", 1380, 560, { s: 0.8, quarters: true, pods: 6, t: W(48, 19), pop: true });
});
shot(48, 22, (S) => {
  deep(S);
  L.put(S, "ep47-ship", 760, 560, { s: 1.0, quarters: true, pods: 6 });
  L.put(S, "space-planet-mars", 1600, 360, { s: 1.8, t: W(48, 29), pop: true });
  card(S, "THE CREW HIBERNATES", 760, 140, { t: W(48, 23), fill: "yellow" });
});
// 49 "Their plan: a hundred-and-eighty-day cruise, with every astronaut's metabolism cut by seventy-five percent, using a drug to start a state called torpor."
shot(49, 0, (S) => {
  deep(S);
  L.put(S, "space-planet-earth", 330, 600, { s: 1.5 });
  L.put(S, "space-planet-mars", 1600, 600, { s: 1.2 });
  const arc = S.draw(`M480 560 Q960 280 1480 560`, W(49, 3), 0, { c: DS.c("white"), w: DS.w.mid }); drawOn(arc, W(49, 3), 2.0);
  L.put(S, "ep47-ship", 960, 430, { s: 0.3 });
  countUp(S, 960, 800, 0, 180, W(49, 2), 1.4, { fmt: (n) => Math.round(n) + " DAYS", size: DS.type.display, c: DS.P.white[0], anchor: "middle" });
});
shot(49, 6, (S) => {
  field(S, "sky", 1);
  L.put(S, "job-astronaut", 560, 930, { s: 1.5, t: W(49, 6) });
  L.put(S, "ep47-dial", 1300, 600, { s: 1.6, v: 0.25, label: "−75 %", c: "orange", t: W(49, 8) });
  card(S, "EVERY ASTRONAUT'S METABOLISM", 960, 130, { t: W(49, 7), fill: "yellow", size: DS.type.caption });
});
shot(49, 13, (S) => {
  field(S, "navy", 1);
  L.put(S, "med-pills", 620, 560, { s: 2.8, t: W(49, 14), pop: true });
  S.arrow(900, 560, 1260, 560, W(49, 16), 0.5, { c: DS.P.white[0], w: DS.w.near });
  card(S, "TORPOR", 1500, 560, { t: W(49, 20), fill: "yellow", size: DS.type.title });
  card(S, "A DRUG TO START IT", 620, 800, { t: W(49, 15), size: DS.type.caption });
});
// 50 "Sleeping crews don't need living space. Taking out the crew quarters made the spacecraft about a third lighter."
shot(50, 0, (S) => {
  deep(S);
  L.put(S, "ep47-ship", 960, 600, { s: 1.5, quarters: true, pods: 6 });
  card(S, "CREW QUARTERS", 760, 220, { t: W(50, 4), size: DS.type.caption });
  xMark(S, 880, 360, 3.2, W(50, 2));
}, { cam: "push" });
shot(50, 6, (S) => {
  deep(S);
  const a = L.put(S, "ep47-ship", 960, 600, { s: 1.5, quarters: true, pods: 6 });
  swap(a, L.put(S, "ep47-ship", 960, 600, { s: 1.5, pods: 6, t: W(50, 7) }), W(50, 7), 0.9);
  card(S, "TAKE OUT THE QUARTERS", 960, 160, { t: W(50, 7), fill: "yellow" });
});
shot(50, 14, (S) => {
  field(S, "navy", 1);
  L.put(S, "ep47-ship", 640, 400, { s: 0.65, quarters: true, pods: 6 });
  L.put(S, "ep47-ship", 640, 760, { s: 0.65, pods: 6, t: W(50, 15) });
  hbar(S, "", 1010, 400, 700, 1.0, "gray", W(50, 14), "");
  hbar(S, "", 1010, 760, 700, 0.67, "orange", W(50, 15), "");
  card(S, "ABOUT A THIRD LIGHTER", 1360, 580, { t: W(50, 15), fill: "yellow" });
});
// 51 "The agency's own research team calls metabolic reduction a game changer, for space and for medicine."
shot(51, 0, (S) => {
  field(S, "sky", 1);
  card(S, "GAME CHANGER", 960, 170, { size: DS.type.display, fill: "yellow" });
  L.put(S, "ep-rocket", 560, 780, { s: 1.0 }); card(S, "SPACE", 560, 880, { size: DS.type.caption });
  L.put(S, "ep-heart", 1360, 660, { s: 2.2 }); card(S, "MEDICINE", 1360, 880, { size: DS.type.caption });
});
// 52 "The reference mission was six people on a five-year round trip. Food and water needs could fall by up to seventy-five percent, which is the point of the whole idea."
shot(52, 0, (S) => {
  field(S, "sky", 1);
  for (let i = 0; i < 6; i++) L.put(S, "job-astronaut", 340 + i * 250, 930, { s: 1.0 });
  const loop = S.draw(`M300 380 Q960 60 1620 380 Q960 220 300 380`, W(52, 8), 0, { c: DS.c("ink"), w: DS.w.mid }); drawOn(loop, W(52, 8), 1.6);
  card(S, "SIX PEOPLE · FIVE-YEAR ROUND TRIP", 960, 150, { fill: "yellow", size: DS.type.caption });
});
shot(52, 11, (S) => {
  field(S, "sky", 1);
  for (let i = 0; i < 4; i++) L.put(S, "furn-crate", 480 + (i % 2) * 190, 640 - Math.floor(i / 2) * 150, { s: 1.5, t: W(52, 11) });
  S.arrow(840, 520, 1160, 520, W(52, 16), 0.5, { c: DS.c("ink"), w: DS.w.near });
  L.put(S, "furn-crate", 1500, 640, { s: 1.5, t: W(52, 16) });
  card(S, "FOOD AND WATER", 580, 850, { size: DS.type.caption });
  card(S, "UP TO −75 %", 1500, 850, { t: W(52, 20), fill: "yellow" });
  card(S, "THE POINT OF THE WHOLE IDEA", 960, 140, { t: W(52, 22), size: DS.type.caption });
});
// 53 "Like hibernating animals, the crew would build body fat beforehand, and need about twenty-one days to recover after waking. Based on animal hibernation, the planners do not expect them to lose bone or muscle."
shot(53, 0, (S) => {
  field(S, "sky", 1);
  L.put(S, "job-astronaut", 560, 930, { s: 1.5 });
  const a = L.put(S, "p2-battery-low", 1300, 560, { s: 3.4, level: 0.15 });
  swap(a, L.put(S, "p2-battery-full", 1300, 560, { s: 3.4, level: 1, t: W(53, 6) }), W(53, 6), 1.2);
  card(S, "BODY FAT FIRST", 1300, 850, { t: W(53, 7), fill: "yellow" });
});
shot(53, 10, (S) => {
  field(S, "sky", 1);
  L.put(S, "job-astronaut", 560, 930, { s: 1.5, face: "sleepy" });
  countUp(S, 1300, 560, 0, 21, W(53, 13), 1.4, { fmt: (n) => Math.round(n) + " DAYS", size: DS.type.display, c: DS.c("ink"), anchor: "middle" });
  card(S, "TO RECOVER AFTER WAKING", 1300, 700, { t: W(53, 15), fill: "yellow", size: DS.type.caption });
});
shot(53, 19, (S) => {
  field(S, "sky", 1);
  L.put(S, "body-bone", 560, 560, { s: 3.2, rot: -25 });
  L.put(S, "body-muscle-arm", 1360, 560, { s: 2.6 });
  tick(S, 760, 440, 3, W(53, 30)); tick(S, 1560, 440, 3, W(53, 32));
  card(S, "BONE", 560, 840, { t: W(53, 30), size: DS.type.caption }); card(S, "MUSCLE", 1360, 840, { t: W(53, 32), size: DS.type.caption });
  card(S, "EXPECTED, BASED ON ANIMALS", 960, 140, { t: W(53, 19), size: DS.type.caption });
});
// 54 "With the whole crew asleep, the ship would have to run itself, using artificial intelligence to manage faults."
shot(54, 0, (S) => {
  deep(S);
  L.put(S, "ep47-ship", 960, 640, { s: 1.5, pods: 6, quarters: true });
  card(S, "THE WHOLE CREW ASLEEP", 960, 130, { t: W(54, 2), fill: "yellow", size: DS.type.caption });
});
shot(54, 9, (S) => {
  field(S, "navy", 1);
  L.put(S, "crt-robot-assistant", 700, 930, { s: 1.8, face: "smile", pose: "wave", t: W(54, 10) });
  L.put(S, "ep-warning-triangle", 1200, 560, { s: 2.2, t: W(54, 17), pop: true });
  tick(S, 1560, 540, 3.4, W(54, 17));
  card(S, "AUTOPILOT", 700, 150, { t: W(54, 10), fill: "yellow" });
  card(S, "MANAGING FAULTS", 1380, 820, { t: W(54, 16), size: DS.type.caption });
});
// 55 "A sign on the door is not fault management."
shot(55, 0, (S) => {
  bg(S, "room-spaceship-cabin-light");
  L.put(S, "ep47-sign", 960, 160, { s: 0.8, lines: [SIGN[0]], t: W(55, 2) });
  L.put(S, "ep-warning-triangle", 1500, 480, { s: 1.5, t: W(55, 3) });
  card(S, "FAULT", 1500, 660, { t: W(55, 3), size: DS.type.caption, fill: "yellow" });
  dave(S, 480, 960, { s: 1.2, face: "sad", pose: "shrug", acc: ["helmet"] });
});
// 56 "The engineers sketched a roadmap to validate it within twenty years, starting with animals and then moving to people."
shot(56, 0, (S) => {
  field(S, "sand", 1);
  const road = S.draw(smooth([[200, 760], [520, 640], [860, 720], [1200, 560], [1560, 500], [1720, 420]]), S.start, 0, { c: DS.c("ink"), w: DS.w.far * 2 }); 
  card(S, "NOW", 200, 860, { size: DS.type.caption }); card(S, "THE ROADMAP", 960, 150, { fill: "yellow" });
  L.put(S, "animal-mouse", 820, 650, { s: 2.2 }); card(S, "ANIMALS", 820, 830, { size: DS.type.caption });
  dave(S, 1300, 600, { s: 1.0, pose: "wave" }); card(S, "PEOPLE", 1300, 700, { size: DS.type.caption });
  card(S, "WITHIN 20 YEARS", 1650, 280, { fill: "yellow", size: DS.type.caption });
}, { cam: "push" });
// 57 "Twenty years. Dave's sign says April."
shot(57, 0, (S) => {
  field(S, "sky", 1);
  countUp(S, 560, 560, 0, 20, W(57, 0), 1.4, { fmt: (n) => Math.round(n) + " YEARS", size: DS.type.display, c: DS.c("red", 2), anchor: "middle" });
  L.put(S, "ep47-sign", 1380, 200, { s: 0.85, lines: [SIGN[0]] });
  ring(S, 1380 + 0.85 * 215, 200 + 0.85 * 148, 130, 54, W(57, 5));
});
// 58 "Dave adds a fifth line to his sign: sleeping on the way to Mars."
shot(58, 0, (S) => {
  doorClose(S, 5, W(58, 8));
  dave(S, 540, 900, { s: 1.1, acc: GEAR, pose: "reach", face: "smug" });
}, { cam: "push" });
// ===================== chapter 7: The twist (clips 59-71) =====================
const dark = (S) => bg(S, "ep47-scene-bedroom");
// 59 "So, what would happen if humans could hibernate? You would eat for months, then run at a quarter speed for several more."
shot(59, 0, (S) => {
  bg(S, "world-snow-forest");
  L.put(S, "ep47-bear", 420, 900, { s: 1.0, sleep: true });
  L.put(S, "ep47-squirrel", 860, 900, { s: 1.4, sleep: true });
  L.put(S, "ep47-lemur", 1190, 900, { s: 1.3, sleep: true });
  L.put(S, "ep47-bed", 1580, 930, { s: 0.7, t: W(59, 5), pop: true });
  card(S, "WHAT IF HUMANS COULD HIBERNATE?", 960, 130, { fill: "yellow", size: DS.type.small });
}, { cam: "pull" });
shot(59, 8, (S) => {
  field(S, "sky", 1);
  const g1 = S.grp(), g2 = S.grp();
  DS.shape(S, rrect(260, 440, 760, 110, DS.r.md), "green", { w: "detail", parent: g1 }); grow(g1, S.start, 260, 495, 1.4);
  DS.shape(S, rrect(1020, 440, 640, 110, DS.r.md), "blue", { w: "detail", parent: g2 }); grow(g2, S.start + 0.4, 1020, 495, 1.4);
  L.put(S, "prop-apple", 640, 300, { s: 2.2 }); card(S, "EAT FOR MONTHS", 640, 680, { t: W(59, 10), size: DS.type.caption });
  L.put(S, "ep47-dial", 1340, 310, { s: 0.9, v: 0.25, label: "¼", c: "orange" }); card(S, "QUARTER SPEED", 1340, 680, { t: W(59, 15), size: DS.type.caption });
  card(S, "SEVERAL MONTHS MORE", 1340, 780, { t: W(59, 19), size: DS.type.caption });
});
// 60 "And the first people to use it would probably be astronauts."
shot(60, 0, (S) => {
  field(S, "sky", 1);
  L.put(S, "job-astronaut", 460, 930, { s: 1.5 });
  L.put(S, "job-astronaut", 860, 930, { s: 1.15 });
  dave(S, 1360, 930, { s: 1.0, face: "worried", pose: "stand" });
  L.put(S, "ep47-sign", 1560, 640, { s: 0.3, lines: [SIGN[0]] });
  card(S, "FIRST IN LINE", 640, 150, { fill: "yellow" });
});
// 61 "Now, the one word Dave's sign gets wrong. It says April. Hibernation is not one long sleep."
shot(61, 0, (S) => {
  doorClose(S, 1);
  dave(S, 540, 900, { s: 1.1, acc: GEAR, pose: "think", face: "confused" });
  ring(S, 1295, 298, 150, 62, W(61, 10));
}, { cam: "push" });
shot(61, 11, (S) => {
  field(S, "sky", 1);
  const g = S.grp(); DS.shape(S, rrect(260, 440, 1400, 110, DS.r.md), "blue", { w: "detail", parent: g }); grow(g, W(61, 11), 260, 495, 1.2);
  L.put(S, "ep47-bed", 560, 360, { s: 0.5, t: W(61, 11) });
  xMark(S, 960, 495, 5, W(61, 13));
  card(S, "ONE LONG SLEEP", 960, 700, { t: W(61, 14), size: DS.type.title });
});
// 62 "Every two to three weeks, a hibernating arctic ground squirrel, still asleep, shivers and shakes for twelve to fifteen hours, until its body is back near thirty-seven degrees. Then it cools down again."
shot(62, 0, (S) => {
  field(S, "paper", 1);
  const ch = saw(S, 300, 260, 1340, 440, S.start + 0.1, W(62, 10) - S.start - 1.2);
  card(S, "EVERY 2 TO 3 WEEKS", 960, 140, { fill: "yellow" });
  L.put(S, "ep47-squirrel", 960, 930, { s: 0.9, sleep: true });
});
shot(62, 10, (S) => {
  field(S, "sky", 1);
  shiver(S, (w) => L.put(S, "ep47-squirrel", 960, 860, { s: 2.8, sleep: true, parent: w }), W(62, 12), W(62, 20));
  card(S, "STILL ASLEEP", 520, 200, { t: W(62, 10), size: DS.type.caption });
  card(S, "SHIVERING", 1400, 200, { t: W(62, 12), size: DS.type.caption });
  card(S, "12 TO 15 HOURS", 960, 150, { t: W(62, 15), fill: "yellow" });
});
shot(62, 20, (S) => {
  field(S, "paper", 1);
  const a = L.put(S, "ep47-thermo", 700, 800, { s: 1.4, min: 0, max: 40, val: 5 });
  const b = L.put(S, "ep47-thermo", 700, 800, { s: 1.4, min: 0, max: 40, val: 37, t: W(62, 24) });
  swap(a, b, W(62, 24), 1.4);
  const c = L.put(S, "ep47-thermo", 700, 800, { s: 1.4, min: 0, max: 40, val: 5, t: W(62, 29) });
  tl.fromTo(c, { opacity: 0 }, { opacity: 1, duration: 1.2, immediateRender: false }, W(62, 29)); tl.to(b, { opacity: 0, duration: 1.2 }, W(62, 29));
  card(S, "BACK NEAR 37°", 1250, 360, { t: W(62, 26), fill: "yellow" });
  card(S, "THEN IT COOLS DOWN AGAIN", 1250, 640, { t: W(62, 29), size: DS.type.caption });
  L.put(S, "ep47-squirrel", 1500, 930, { s: 1.2, sleep: true });
});
// 63 "If Dave were a squirrel, he would spend half of week three shivering at the ceiling. The body sets the alarm, and it has no snooze button."
shot(63, 0, (S) => {
  dark(S);
  shiver(S, (w) => L.put(S, "ep47-bed", 960, 925, { s: 1.5, face: "open", zzz: false, parent: w }), W(63, 12), W(63, 16), 5);
  card(S, "WEEK THREE", 960, 140, { t: W(63, 10), fill: "yellow" });
  card(S, "STARING AT THE CEILING", 960, 280, { t: W(63, 13), size: DS.type.caption });
}, { cam: "pull" });
shot(63, 16, (S) => {
  dark(S);
  L.put(S, "ep47-bed", 700, 925, { s: 1.2, face: "worried", zzz: false });
  L.put(S, "prop-alarm-clock", 1450, 500, { s: 3.2 });
  card(S, "SNOOZE", 1450, 900, { t: W(63, 24), size: DS.type.title });
  xMark(S, 1450, 880, 3.0, W(63, 25));
});
// 64 "That warm-up is expensive. In one lab study at two degrees above freezing, the warm-ups made up eighty-six percent of the energy cost of the whole winter."
shot(64, 0, (S) => {
  field(S, "sand", 1);
  L.put(S, "money-receipt", 960, 540, { s: 3.2 });
  L.put(S, "ep47-squirrel", 420, 900, { s: 1.4 });
  card(S, "EXPENSIVE", 960, 140, { t: W(64, 3), fill: "yellow" });
}, { cam: "push" });
shot(64, 7, (S) => {
  field(S, "sky", 1);
  L.put(S, "info-pie-fraction", 700, 560, { s: 2.0, pct: 86, text: "86 %", c: "red" });
  card(S, "WARM-UPS: 86 % OF THE WINTER'S ENERGY", 640, 130, { t: W(64, 14), size: DS.type.caption, fill: "yellow" });
  L.put(S, "ep47-thermo", 1440, 800, { s: 1.0, min: -15, max: 10, val: 2, t: W(64, 8) });
  card(S, "2° ABOVE FREEZING", 1440, 190, { t: W(64, 8), size: DS.type.caption });
});
// 65 "In a much colder burrow, the share fell to twenty-three percent."
shot(65, 0, (S) => {
  field(S, "sky", 1);
  const a = L.put(S, "info-pie-fraction", 700, 560, { s: 2.0, pct: 86, text: "86 %", c: "red" });
  swap(a, L.put(S, "info-pie-fraction", 700, 560, { s: 2.0, pct: 23, text: "23 %", c: "red", t: W(65, 7) }), W(65, 7), 1.0);
  L.put(S, "ep47-thermo", 1440, 800, { s: 1.0, min: -15, max: 10, val: -12, t: W(65, 2) });
  card(S, "MUCH COLDER BURROW", 1440, 190, { t: W(65, 2), size: DS.type.caption });
  card(S, "THE SHARE FELL", 700, 130, { t: W(65, 6), fill: "yellow" });
});
// 66 "So why wake at all? One idea is that the animals wake up to sleep. In 1991, researchers found that ground squirrels sleep during these warm-ups,"
shot(66, 0, (S) => {
  field(S, "paper", 1);
  card(S, "WHY WAKE AT ALL?", 960, 130, { fill: "yellow" });
  L.put(S, "fx-lightbulb", 960, 420, { s: 1.6, t: W(66, 6), pop: true });
  L.put(S, "ep47-squirrel", 520, 900, { s: 1.8 });
  S.arrow(820, 760, 1100, 760, W(66, 12), 0.5, { c: DS.c("ink"), w: DS.w.near });
  L.put(S, "ep47-squirrel", 1400, 900, { s: 1.8, sleep: true, zzz: true });
  card(S, "WAKE UP", 520, 560, { t: W(66, 11), size: DS.type.caption }); card(S, "TO SLEEP", 1400, 560, { t: W(66, 14), size: DS.type.caption });
});
shot(66, 15, (S) => {
  field(S, "paper", 1);
  const ch = saw(S, 300, 260, 1340, 440, S.start, 0.01, { spikes: 4 });
  [0, 1, 2, 3].forEach((k) => L.put(S, "fx-zzz", ch.x(k) + 90, ch.top + 40, { s: 0.45, t: W(66, 23) + k * 0.25 }));
  card(S, "1991 · THEY SLEEP DURING WARM-UPS", 960, 140, { t: W(66, 15), fill: "yellow", size: DS.type.caption });
});
// 67 "and that the need for sleep seemed to build in deep torpor."
shot(67, 0, (S) => {
  field(S, "sky", 1);
  L.put(S, "ep47-squirrel", 560, 880, { s: 2.2, sleep: true });
  hbar(S, "NEED FOR SLEEP", 1000, 560, 640, 0.9, "orange", W(67, 8), "");
  card(S, "DEEP TORPOR", 560, 460, { t: W(67, 10), size: DS.type.caption });
  card(S, "THE NEED SEEMED TO BUILD", 960, 150, { t: W(67, 6), fill: "yellow" });
});
// 68 "Later studies found mixed results. A twenty sixteen paper on dwarf lemurs put it plainly: it remains unclear."
shot(68, 0, (S) => {
  field(S, "paper", 1);
  panel(S, 640, 540, 520, 480, T0(S)); panel(S, 1280, 540, 520, 480, T0(S));
  tick(S, 640, 540, 5, S.start); xMark(S, 1280, 540, 5, W(68, 3));
  card(S, "MIXED RESULTS", 960, 150, { t: W(68, 3), fill: "yellow" });
});
shot(68, 5, (S) => {
  field(S, "paper", 1);
  panel(S, 960, 540, 1100, 560, T0(S));
  txt(S, "2016 · DWARF LEMURS", 960, 360, { size: DS.type.body, t: W(68, 5) });
  L.put(S, "ep47-lemur", 560, 760, { s: 1.0, sleep: true });
  card(S, "IT REMAINS UNCLEAR", 1200, 640, { t: W(68, 15), size: DS.type.title, fill: "yellow" });
});
// 69 "One more clue comes from the lemur. In hot tree holes, where its body passively warms above thirty degrees, it seems to get sleep-like states without waking."
shot(69, 0, (S) => {
  field(S, "sand", 1);
  L.put(S, "ep47-lemur", 960, 900, { s: 2.4 });
  card(S, "ONE MORE CLUE", 960, 150, { t: W(69, 2), fill: "yellow" });
});
shot(69, 7, (S) => {
  field(S, "dusk", 1);
  L.put(S, "ep47-tree-hole", 620, 1000, { s: 1.1 });
  L.put(S, "ep47-thermo", 1330, 840, { s: 1.15, min: 20, max: 40, val: 32, t: W(69, 8) });
  L.put(S, "sun-rays", 1760, 560, { s: 0.8, t: W(69, 8) });
  card(S, "HOT TREE HOLE · ABOVE 30°", 1330, 190, { t: W(69, 8), size: DS.type.caption, fill: "yellow" });
});
shot(69, 19, (S) => {
  field(S, "dusk", 1);
  L.put(S, "ep47-tree-hole", 620, 1000, { s: 1.1, zzz: true });
  think(S, 620, 1000 - 270 * 1.1, { s: 0.5, text: "zzz", size: DS.type.title, t: W(69, 22), dx: 420, y: 420, seed: 69 });
  card(S, "SLEEP-LIKE STATES", 1400, 560, { t: W(69, 22), fill: "yellow" });
  card(S, "WITHOUT WAKING", 1400, 700, { t: W(69, 25), size: DS.type.caption });
});
// 70 (@dave) "So I'd wake up, in the middle of my sleep, in order to sleep?"
shot(70, 0, (S) => {
  dark(S);
  L.put(S, "ep47-bed", 1300, 925, { s: 1.2, dave: false });
  daveTalk(S, 620, 940, { s: 1.5, face: "confused", pose: "scratch-head" }, 70);
  think(S, 620, 940 - HEAD * 1.5, { s: 0.75, text: "wake up|to sleep?", size: DS.type.small, t: W(70, 5), dx: 150, seed: 70 });
});
// 71 "Possibly, Dave. So hibernation is not skipping sleep. It may be a very long winter with a nap break, and a bill for every wake-up."
shot(71, 0, (S) => {
  dark(S);
  L.put(S, "ep47-bed", 960, 925, { s: 1.5, zzz: true });
  card(S, "NOT SKIPPING SLEEP", 960, 140, { t: W(71, 5), fill: "yellow" });
});
shot(71, 9, (S) => {
  field(S, "sky", 1);
  const g = S.grp(); DS.shape(S, rrect(220, 470, 1480, 100, DS.r.md), "blue", { w: "detail", parent: g }); grow(g, S.start - 0.3, 220, 520, 1.0);
  [420, 760, 1100, 1440].forEach((x, i) => { const w = 110; DS.shape(S, rrect(x - w / 2, 470, w, 100, DS.r.sm), "yellow", { w: "detail", t: W(71, 15) + i * 0.2 }); });
  card(S, "A VERY LONG WINTER", 960, 270, { t: W(71, 11), fill: "yellow" });
  card(S, "NAP BREAKS", 960, 740, { t: W(71, 16) });
});
shot(71, 19, (S) => {
  field(S, "sand", 1);
  [0, 1, 2].forEach((i) => L.put(S, "money-receipt", 620 + i * 340, 520 + (i % 2) * 40, { s: 2.0, rot: -6 + i * 6, t: i ? W(71, 21) + i * 0.25 : undefined, pop: true }));
  card(S, "A BILL FOR EVERY WAKE-UP", 960, 150, { t: W(71, 20), fill: "yellow" });
});
// ===================== chapter 8: Back in April (clips 72-75) =====================
// 72 "Dave takes down the sign and fixes the last line."
shot(72, 0, (S) => {
  bg(S, "ep47-scene-door", { close: true });
  dave(S, 560, 900, { s: 1.3, acc: GEAR, pose: "hold", face: "determined" });
  L.put(S, "ep47-sign", 1160, 240, { s: 0.98, lines: SIGN.slice(0, 5), cap: 6 });
  L.put(S, "ep47-sign", 1160, 240, { s: 0.98, lines: SIGN, cap: 6, only: 5, t: W(72, 6), colors: [, , , , , "green"] });
}, { cam: "push" });
// 73 (@dave) "Back in April. After a nap break every three weeks. Please don't wake me."
shot(73, 0, (S) => {
  bg(S, "ep47-scene-door", { close: true });
  daveTalk(S, 540, 900, { s: 1.2, acc: GEAR, pose: "reach", face: "smile" }, 73);
  L.put(S, "ep47-sign", 1080, 150, { lines: SIGN, cap: 6, colors: [, , , , , "green"] });
}, { cam: "push" });
// 74 "Dave, you will be woken. That is how it works."
shot(74, 0, (S) => {
  bg(S, "ep47-scene-bedroom");
  L.put(S, "ep47-bed", 780, 925, { s: 1.4, zzz: true });
  L.put(S, "prop-alarm-clock", 1480, 560, { s: 3.2, t: W(74, 3), pop: true });
  [300, 380, 460].forEach((r, i) => { S.draw(arc(1480, 560, r, 152, 208), W(74, 3) + 0.3 + i * 0.25, 0, { c: DS.c("ink"), w: DS.w.near }); S.draw(arc(1480, 560, r, -28, 28), W(74, 3) + 0.3 + i * 0.25, 0, { c: DS.c("ink"), w: DS.w.near }); });
  card(S, "THREE WEEKS LATER", 960, 140, { t: W(74, 0), fill: "yellow" });
});
// 75 "Wake me in April. Or in three weeks."
shot(75, 0, (S) => {
  bg(S, "ep47-scene-bedroom");
  L.put(S, "ep47-bed", 780, 925, { s: 1.4, zzz: true });
  months(S, 1100, 480, { s: 0.55, t: W(75, 2) });
  ring(S, 1100 + 2.5 * 166 * 0.55, 480, 56, 68, W(75, 3));
  card(S, "OR IN THREE WEEKS", 1100, 600, { t: W(75, 5), fill: "yellow", size: DS.type.caption });
}, { cam: "pull" });
// ---------- run: sort the shots by cue, cut each picture 0.25 s after its first word (0.6 s crossfade before it) ----------
SHOTS.sort((a, b) => a.c - b.c || a.w - b.w);
const WINS = sceneWindows(SHOTS.map((s) => [s.c, s.w]), -0.25);
SHOTS.forEach((s, k) => {
  const [a, b] = WINS[k], S = scene(a, b, s.o || {}), g0 = S.g.parentNode;
  s.fn(S);
  // ponytail: library scenes are heavy (~48k nodes in all); off-screen pictures leave the layout tree so a seek only lays out the 1-2 live ones
  if (k > 0) { g0.style.display = "none"; tl.set(g0, { display: "inline" }, Math.max(0, a - 0.6)); }
  if (k < SHOTS.length - 1) tl.set(g0, { display: "none" }, b);
});
