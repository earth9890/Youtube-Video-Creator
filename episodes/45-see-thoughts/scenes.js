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
// ===================== chapter 1: The first bubble (clips 1-9) =====================
// 1 "This is Dave. This morning, Dave opened his curtains..."
shot(1, 0, (S) => {
  bg(S, "kit-room-bedroom-day", { time: "day" });
  const cl = S.grp(), cr = S.grp();
  DS.shape(S, rect(1262, 150, 160, 350), "red", { w: "mid", parent: cl }); DS.shape(S, rect(1422, 150, 160, 350), "red", { w: "mid", parent: cr });
  DS.shape(S, rect(1240, 136, 364, 22), "wood", { w: "detail" });
  shift(cl, W(1, 7), 0.9, [0, 0], [-150, 0]); shift(cr, W(1, 7), 0.9, [0, 0], [150, 0]);
  const a = dave(S, 1180, 955, { pose: "armsUp", face: "sleepy", outfit: "pyjamas", outfitC: "sky" });
  swap(a, dave(S, 1180, 955, { pose: "reach", face: "smile", outfit: "pyjamas", outfitC: "sky" }), W(1, 5));
  card(S, "THIS IS DAVE", 560, 160);
}, { cam: "push" });
// 1 "...and saw a small white bubble above his neighbour's head."
shot(1, 9, (S) => {
  bg(S, "scene-suburb-day");
  guy(S, NEIGH.style, 1150, 905, Object.assign({}, NEIGH, { s: 1.15, face: "thinking", pose: "hips" }));
  think(S, 1150, 905 - HEAD * 1.15, { s: 0.42, t: W(1, 13), noText: true, dx: 90 });
  windowFrame(S);
}, { cam: "zoom", focus: "1150 520" });
// 2 "It said: did I leave the oven on?"
shot(2, 0, (S) => {
  bg(S, "scene-suburb-day");
  guy(S, NEIGH.style, 1150, 905, Object.assign({}, NEIGH, { s: 1.15, face: "worried", pose: "think" }));
  think(S, 1150, 905 - HEAD * 1.15, { s: 0.66, t: W(2, 2), text: "Did I leave|the oven on?", dx: 60 });
  windowFrame(S);
}, { cam: "push" });
// 3 "Every head Dave can see now has a bubble showing what that person is thinking."
shot(3, 0, (S) => {
  bg(S, "scene-suburb-day");
  L.put(S, "job-mail-carrier", 430, 930, { s: 0.95 });
  guy(S, "girl04", 860, 930, { outfit: "dress", outfitC: "pink", s: 0.95, face: "happy" });
  L.put(S, "animal-dog", 1010, 930, { s: 0.55 });
  guy(S, NEIGH.style, 1430, 930, Object.assign({}, NEIGH, { s: 0.95, face: "worried" }));
  think(S, 430, 930 - HEAD * 0.95, { s: 0.48, t: W(3, 1), text: "is that dog|friendly?", seed: 3 });
  think(S, 860, 930 - HEAD * 0.95, { s: 0.48, t: W(3, 8), pic: "prop-sandwich", picS: 1.2, seed: 5, dx: -40 });
  think(S, 1430, 930 - HEAD * 0.95, { s: 0.48, t: W(3, 12), text: "oven?", size: DS.type.title, seed: 9 });
  windowFrame(S);
});
// 4 "Every head except one. Dave can't see above his own."
shot(4, 0, (S) => {
  bg(S, "kit-room-bedroom-day", { time: "day" });
  dave(S, 600, 960, { s: 1.4, pose: "look-up", face: "confused", outfit: "pyjamas", outfitC: "sky" });
  think(S, 600, 960 - HEAD * 1.4, { s: 0.55, t: W(4, 4), kind: "faint", text: "?", size: DS.type.display, seed: 4 });
  card(S, "EXCEPT ONE", 1480, 300, { t: W(4, 0) });
}, { cam: "zoom", focus: "600 480" });
// 5 "So what would really happen if you could see everyone's thoughts? For about an hour, it's a superpower."
shot(5, 0, (S) => {
  bg(S, "sky-day");
  L.put(S, "ground-path-day", 0, 860);
  const a = dave(S, 960, 940, { s: 1.25, pose: "think", face: "wow" });
  swap(a, dave(S, 960, 940, { s: 1.25, pose: "cheer", face: "excited", outfit: "superhero", outfitC: "red" }), W(5, 16));
  L.put(S, "thought-pic", 470, 420, { s: 0.55, noTail: true, pic: "prop-umbrella-ducks", picS: 1.1, t: W(5, 7), seed: 2 });
  L.put(S, "thought-pic", 1450, 420, { s: 0.55, noTail: true, text: "?", size: DS.type.display, t: W(5, 8), seed: 6 });
  L.put(S, "thought-pic", 960, 330, { s: 0.42, noTail: true, pic: "sign-heart", picS: 1.2, t: W(5, 9), seed: 8 });
  card(S, "WHAT IF YOU COULD SEE EVERYONE'S THOUGHTS?", 960, 110);
  card(S, "FOR ABOUT 1 HOUR", 1500, 700, { t: W(5, 11), fill: "yellow" });
});
// 6 "By hour six, he'll know what his friends really think of him."
shot(6, 0, (S) => {
  bg(S, "room-restaurant-light");
  dave(S, 640, 950, { s: 1.05, face: "nervous" });
  guy(S, SAM.style, 1110, 950, Object.assign({}, SAM, { face: "smile" }));
  guy(S, JO.style, 1420, 950, Object.assign({}, JO, { face: "smile", flip: true }));
  think(S, 1110, 950 - HEAD * 1.05, { s: 0.45, t: W(6, 7), kind: "faint", text: "...", size: DS.type.display, seed: 12, dx: -40 });
  think(S, 1420, 950 - HEAD * 1.05, { s: 0.45, t: W(6, 8), kind: "faint", text: "...", size: DS.type.display, seed: 13, dx: 60 });
  clock(S, "HOUR 6");
});
// 6 "By day two, a crowded train will nearly drown him in other people's heads."
shot(6, 12, (S) => {
  L.put(S, "ride-subway-interior", 960, 1010, { s: 2.15, crowd: true });
  [["man02", 330, "flat"], ["girl05", 620, "bored"], ["man07", 1320, "tired"], ["girl09", 1600, "flat"]].forEach(([st, x, f]) => guy(S, st, x, 975, { s: 1.0, face: f }));
  dave(S, 960, 975, { s: 1.0, face: "nervous" });
  L.put(S, "thought-flood", 960, 290, { s: 0.95, n: 30, seed: 61, t: W(6, 17) });
  clock(S, "DAY 2");
});
// 7 "And by day four, he'll be scared of his own."
shot(7, 0, (S) => {
  bg(S, "room-living-room-light");
  dave(S, 960, 880, { s: 1.15, face: "scared", acc: ["beanie"], accC: "red" });
  L.put(S, "furn-sofa", 960, 945, { s: 1.6, c: "blue" });
  think(S, 960, 880 - HEAD * 1.15, { s: 0.5, t: W(7, 6), kind: "faint", text: "?", size: DS.type.display, seed: 14 });
  clock(S, "DAY 4");
});
// 8 "Inside Dave's head, a tired little librarian looks up from her desk. That's his brain."
shot(8, 0, (S) => {
  bg(S, "kit-room-library-day", { time: "day" });
  const a = brain(S, 960, 820, 1.7, "tired");
  swap(a, brain(S, 960, 820, 1.7, "smile", { armL: "up" }), W(8, 7));
  L.put(S, "kit-desk-library", 960, 945, { s: 1.4 });
  card(S, "DAVE'S BRAIN", 960, 150, { t: W(8, 12) });
}, { cam: "zoom", focus: "960 560" });
// 9 (@brain) "Heads have lids for a reason, Dave. You'll see."
shot(9, 0, (S) => {
  bg(S, "kit-room-library-day", { time: "day" });
  brainTalk(S, 820, 960, 2.3, "stern", 9, { armR: "point" });
  dave(S, 1450, 960, { s: 0.95, face: "confused", pose: "scratch-head" });
}, { cam: "push" });
// ===================== chapter 2: Hour one: a superpower (clips 10-20) =====================
// 10 "Hour one, and Dave is a genius. It's his sister's birthday, and her bubble holds a picture: a yellow umbrella, covered in ducks."
shot(10, 0, (S) => {
  bg(S, "room-dining-room-light");
  clock(S, "HOUR 1");
  fadeOut(card(S, "GENIUS", 960, 130, { t: W(10, 5), fill: "yellow" }).g, W(10, 12), 0.3);
  L.put(S, "furn-dining-table", 960, 930, { s: 1.5 });
  L.put(S, "p2-birthday-cake", 960, 680, { s: 0.9, candles: 5 });
  dave(S, 520, 950, { s: 1.05, face: "smug", look: 6 });
  guy(S, "girl05", 1380, 950, { outfit: "dress", outfitC: "purple", acc: ["partyhat"], accC: "pink", face: "happy" });
  think(S, 1380, 950 - HEAD * 1.05, { s: 0.6, t: W(10, 13), pic: "prop-umbrella-ducks", picS: 1.25, picY: 10, seed: 21, dx: -60 });
});
// 11 "Dave buys the umbrella. She cries. Best brother ever."
shot(11, 0, (S) => {
  bg(S, "room-dining-room-light");
  L.put(S, "furn-dining-table", 960, 930, { s: 1.5 });
  L.put(S, "p2-birthday-cake", 960, 680, { s: 0.9, candles: 5 });
  dave(S, 600, 950, { s: 1.05, face: "proud", pose: "reach" });
  L.put(S, "prop-gift", 790, 700, { s: 0.8, t: W(11, 0) });
  const a = guy(S, "girl05", 1340, 950, { outfit: "dress", outfitC: "purple", acc: ["partyhat"], accC: "pink", face: "happy" });
  swap(a, guy(S, "girl05", 1340, 950, { outfit: "dress", outfitC: "purple", acc: ["partyhat"], accC: "pink", face: "cryLaugh", pose: "armsUp" }), W(11, 4));
  L.put(S, "prop-umbrella-ducks", 1340, 390, { s: 1.0, t: W(11, 4) });
  card(S, "BEST BROTHER EVER", 960, 150, { t: W(11, 6), fill: "yellow" });
});
// 12 "At his job interview, the interviewer's bubble says: please, just say teamwork."
shot(12, 0, (S) => {
  bg(S, "room-office-light");
  seat(S, 640, 950, "furn-office-chair"); seat(S, 1290, 950, "furn-office-chair", true);
  dave(S, 640, 950, { s: 1.05, pose: "sit-chair", face: "nervous" });
  guy(S, "man06", 1290, 950, { outfit: "suit", outfitC: "navy", pose: "sit-chair", face: "flat", acc: ["glasses"], flip: true });
  L.put(S, "furn-desk", 980, 955, { s: 1.15 });
  think(S, 1290, 950 - HEAD * 1.05 + 40, { s: 0.62, t: W(12, 6), text: "please, just|say teamwork", seed: 31, dx: 40 });
});
// 12 "Dave says teamwork. He gets the job."
shot(12, 12, (S) => {
  bg(S, "room-office-light");
  seat(S, 640, 950, "furn-office-chair"); seat(S, 1290, 950, "furn-office-chair", true);
  dave(S, 640, 950, { s: 1.05, pose: "sit-chair", face: "smug" });
  const a = guy(S, "man06", 1290, 950, { outfit: "suit", outfitC: "navy", pose: "sit-chair", face: "flat", acc: ["glasses"], flip: true });
  swap(a, guy(S, "man06", 1290, 950, { outfit: "suit", outfitC: "navy", pose: "sit-chair", face: "delighted", acc: ["glasses"], flip: true }), W(12, 15));
  L.put(S, "furn-desk", 980, 955, { s: 1.15 });
  L.put(S, "bubble-round", 560, 370, { s: 0.8, text: "Teamwork.", tail: "right", t: W(12, 13) });
  card(S, "HIRED", 1290, 330, { t: W(12, 16), fill: "green" });
});
// 13 "But most of the bubbles don't have any words in them at all."
shot(13, 0, (S) => {
  bg(S, "scene-city-street-day");
  [["girl07", 560, "animal-cat", 1.1], ["man03", 1000, "prop-cake", 1.1], ["girl02", 1440, "prop-music-notes", 1.1]].forEach(([st, x, pic, k], i) => {
    guy(S, st, x, 945, { s: 0.95, face: ["smile", "happy", "flat"][i], flip: i === 2 });
    think(S, x, 945 - HEAD * 0.95, { s: 0.5, pic, picS: k, t: W(13, 2 + i * 3), seed: 40 + i });
  });
  dave(S, 230, 960, { s: 0.95, face: "confused", pose: "scratch-head" });
  card(S, "NO WORDS", 960, 120, { t: W(13, 8) });
});
// 14 "In 2008, Christopher Heavey and Russell Hurlburt gave thirty students a beeper that went off at random,"
shot(14, 0, (S) => {
  field(S, "sand", 1);
  study(S, "2008 · HEAVEY & HURLBURT");
  panel(S, 760, 560, 1080, 560, S.start);
  grid(S, 30, 10, 330, 470, 96, 0.95, () => false, W(14, 10));
  txt(S, "30 STUDENTS", 760, 790, { t: W(14, 10), size: DS.type.body });
  L.put(S, "prop-beeper", 1550, 520, { s: 2.2, t: W(14, 13) });
  txt(S, "AT RANDOM", 1550, 760, { t: W(14, 17), size: DS.type.body, c: DS.c("red", 2) });
});
// 14 "...and asked what was in their heads at each beep."
shot(14, 19, (S) => {
  bg(S, "room-classroom-light");
  guy(S, "girl02", 900, 955, { s: 1.2, outfit: "student", outfitC: "white", face: "wow", pose: "hold" });
  L.put(S, "prop-beeper", 960, 730, { s: 0.7 });
  L.put(S, "bubble-shout", 1250, 560, { s: 0.6, text: "BEEP", t: W(14, 26) });
  think(S, 900, 955 - HEAD * 1.2, { s: 0.55, t: W(14, 21), kind: "faint", text: "?", size: DS.type.display, seed: 51, dx: -380 });
  card(S, "WHAT'S IN YOUR HEAD RIGHT NOW?", 960, 120, { t: W(14, 20) });
});
// 15 "The inner voice turned up in only about a quarter of those moments, and pictures in about a third."
shot(15, 0, (S) => {
  field(S, "sky", 1);
  L.put(S, "thought-pic", 560, 400, { s: 0.75, noTail: true, text: "and then I'll|need to call...", seed: 61 });
  card(S, "INNER VOICE", 560, 650);
  countUp(S, 560, 820, 0, 26, W(15, 7), 0.6, { size: DS.type.display, fmt: (n) => Math.round(n) + "%" });
  L.put(S, "thought-pic", 1360, 400, { s: 0.75, noTail: true, pic: "scene-beach-day", picS: 0.2, picX: -190, picY: -105, seed: 62, t: W(15, 13) });
  card(S, "PICTURES", 1360, 650, { t: W(15, 13) });
  countUp(S, 1360, 820, 0, 34, W(15, 13), 0.6, { size: DS.type.display, fmt: (n) => Math.round(n) + "%" });
});
// 16 "And about one moment in five held a clear thought with no words or pictures at all."
shot(16, 0, (S) => {
  field(S, "sky", 1);
  L.put(S, "thought-pic", 960, 430, { s: 1.0, noTail: true, seed: 63 });
  countUp(S, 960, 470, 0, 22, W(16, 2), 0.9, { size: DS.type.display, c: DS.c("gray", 1), fmt: (n) => Math.round(n) + "%" });
  card(S, "NO WORDS. NO PICTURES.", 960, 800, { t: W(16, 10) });
  card(S, "1 IN 5", 960, 120, { t: W(16, 2) });
});
// 17 "So some bubbles are empty, and Dave still somehow knows they mean: maybe soup."
shot(17, 0, (S) => {
  bg(S, "scene-city-street-day");
  guy(S, "man03", 1150, 945, { s: 1.15, face: "flat" });
  think(S, 1150, 945 - HEAD * 1.15, { s: 0.6, seed: 64, dx: 60 });
  dave(S, 560, 960, { s: 1.15, face: "thinking", pose: "think" });
  card(S, "MAYBE SOUP", 1600, 470, { t: W(17, 12) });
});
// 18 "Five of the thirty students reported no inner voice at all."
shot(18, 0, (S) => {
  field(S, "sand", 1);
  panel(S, 960, 540, 1100, 560, S.start);
  grid(S, 30, 10, 528, 450, 96, 0.95, (i) => i % 7 === 3 && i < 30, W(18, 5));
  card(S, "5 OF 30: NO INNER VOICE", 960, 120, { t: W(18, 5) });
});
// 18 "So the interviewer has a radio station in his head, and Dave's sister has a silent picture book."
shot(18, 11, (S) => {
  bg(S, "room-office-light");
  S.fill(rect(960, -40, 1000, 1160), T0(S), 0, DS.c("pink", 1), 1);
  S.draw("M960 -40 V1120", T0(S), 0, { c: DS.c("ink"), w: DS.w.near });
  guy(S, "man06", 480, 950, { s: 1.0, outfit: "suit", outfitC: "navy", acc: ["glasses"], face: "flat" });
  think(S, 480, 950 - HEAD, { s: 0.68, text: "and ANOTHER thing|blah blah blah|so anyway", size: DS.type.caption, t: W(18, 15), seed: 71, dx: 40 });
  L.put(S, "p2-boombox", 760, 640, { s: 0.7, t: W(18, 15) });
  guy(S, "girl05", 1440, 950, { s: 1.0, outfit: "dress", outfitC: "purple", face: "smile" });
  think(S, 1440, 950 - HEAD, { s: 0.68, pic: "prop-umbrella-ducks", picS: 0.8, picX: -80, t: W(18, 26), seed: 72, dx: -40 });
  L.put(S, "prop-cake", 1520, 300, { s: 0.55, t: W(18, 26) });
});
// 19 "Normally, we're bad at this. In 1992, Linda Stinson and William Ickes filmed pairs of young men chatting, then had each one guess the other's thoughts."
shot(19, 0, (S) => {
  bg(S, "room-waiting-room-light");
  seat(S, 700, 950); guy(S, "man02", 700, 950, { s: 1.05, pose: "sit-chair", face: "smile" });
  seat(S, 1220, 950); guy(S, "man07", 1220, 950, { s: 1.05, pose: "sit-chair", face: "smile", flip: true });
  study(S, "1992 · STINSON & ICKES", W(19, 5));
  L.put(S, "prop-camera", 1660, 520, { s: 1.0, t: W(19, 13), flip: true });
});
// 19 "...then had each one guess the other's thoughts."
shot(19, 19, (S) => {
  bg(S, "room-waiting-room-light");
  seat(S, 700, 950); guy(S, "man02", 700, 950, { s: 1.05, pose: "sit-chair", face: "thinking" });
  seat(S, 1220, 950); guy(S, "man07", 1220, 950, { s: 1.05, pose: "sit-chair", face: "thinking", flip: true });
  study(S, "1992 · STINSON & ICKES");
  L.put(S, "prop-camera", 1660, 520, { s: 1.0, flip: true });
  think(S, 700, 950 - HEAD * 1.05 + 40, { s: 0.48, text: "he's bored?", t: W(19, 23), seed: 81, dx: -60 });
  think(S, 1220, 950 - HEAD * 1.05 + 40, { s: 0.48, text: "he likes|football?", t: W(19, 24), seed: 82, dx: 60 });
});
// 20 "Strangers got about twenty percent right. Friends, about thirty. And Dave is now on a hundred."
shot(20, 0, (S) => {
  field(S, "sand", 1);
  card(S, "GUESSING THOUGHTS RIGHT", 960, 120);
  hbar(S, "STRANGERS", 640, 360, 1000, 0.2, "blue", W(20, 1), "20%");
  hbar(S, "FRIENDS", 640, 540, 1000, 0.3, "green", W(20, 6), "30%");
  hbar(S, "DAVE", 640, 720, 1000, 1.0, "red", W(20, 13), "100%");
  dave(S, 230, 900, { s: 0.75, pose: "flex", face: "smug", t: W(20, 10) });
});
// ===================== chapter 3: Hour six: six thousand thoughts (clips 21-35) =====================
// 21 "By hour six, the bubbles won't stay still. They keep changing."
shot(21, 0, (S) => {
  bg(S, "room-restaurant-light");
  guy(S, "girl06", 1200, 950, { s: 1.1, face: "thinking", flip: true });
  const hy = 950 - HEAD * 1.1, o = { s: 0.6, dx: -40 };
  const B = [think(S, 1200, hy, Object.assign({ text: "lunch?", size: DS.type.title, seed: 91 }, o)), think(S, 1200, hy, Object.assign({ pic: "animal-dog", picS: 0.9, picY: 60, seed: 92 }, o)),
    think(S, 1200, hy, Object.assign({ text: "did I reply|to that?", seed: 93 }, o)), think(S, 1200, hy, Object.assign({ pic: "prop-music-notes", picS: 1.3, seed: 94 }, o)), think(S, 1200, hy, Object.assign({ text: "shoes?", size: DS.type.title, seed: 95 }, o))];
  for (let k = 1; k < B.length; k++) swap(B[k - 1], B[k], W(21, 5) + (k - 1) * 0.85, 0.3);
  dave(S, 560, 960, { s: 1.1, face: "dizzy" });
  clock(S, "HOUR 6");
});
// 22 "You may have heard we have sixty thousand thoughts a day."
shot(22, 0, (S) => {
  bg(S, "room-office-light");
  panel(S, 960, 470, 1000, 520, S.start, "yellow");
  txt(S, "60,000", 960, 470, { size: DS.type.display, c: DS.c("red", 2) });
  txt(S, "THOUGHTS A DAY!", 960, 600, { size: DS.type.title });
  txt(S, "THEY SAY", 960, 300, { size: DS.type.small, c: DS.c("gray", 2) });
});
// 22 "It's often credited to the National Science Foundation, which can't find it either."
shot(22, 11, (S) => {
  bg(S, "room-office-light");
  L.put(S, "p2-filing-cabinet", 1300, 690, { s: 2.0 });
  guy(S, "girl01", 820, 950, { s: 1.1, outfit: "office", outfitC: "sky", face: "confused", pose: "scratch-head" });
  L.put(S, "ep-magnifier", 1050, 560, { s: 0.9, t: W(22, 19) });
  card(S, "NATIONAL SCIENCE FOUNDATION", 960, 120);
  card(S, "SOURCE: NOT FOUND", 1300, 300, { t: W(22, 20), fill: "red" });
});
// 23 "In 2020, Julie Tseng and Jordan Poppenk in Canada studied brain scans of 184 people watching films and resting."
shot(23, 0, (S) => {
  bg(S, "room-science-lab-light");
  study(S, "2020 · TSENG & POPPENK");
  L.put(S, "sci-mri-scanner", 700, 950, { s: 1.0, t: W(23, 11) });
  L.put(S, "prop-tv", 1360, 520, { s: 1.6, t: W(23, 19) });
  card(S, "FILMS + REST", 1360, 720, { t: W(23, 20) });
  countUp(S, 1360, 870, 0, 184, W(23, 14), 1.0, { size: DS.type.title, fmt: (n) => Math.round(n) + " PEOPLE" });
});
// 24 "They counted the moments when brain activity jumps to a new pattern, which they think marks a new thought."
shot(24, 0, (S) => {
  field(S, "navy", 2);
  card(S, "BRAIN ACTIVITY OVER TIME", 960, 120);
  const C = [[420, 520], [960, 470], [1500, 540]], r = L.rng(24);
  C.forEach(([cx, cy], k) => {
    const pts = []; for (let i = 0; i < 12; i++) pts.push([cx + (r() - 0.5) * 220, cy + (r() - 0.5) * 170]);
    const g = S.grp(); S.draw(smooth(pts), T0(S), 0, { c: DS.c("sky", 1), w: DS.w.mid, parent: g });
    pts.forEach(([x, y]) => S.fill(circ(x, y, 11), T0(S), 0, DS.c("yellow"), 1, g));
    if (k) fadeG(S, g, W(24, 7) + (k - 1) * 0.8);
  });
  arrowR(S, 560, 470, 820, 420, W(24, 7), { c: "red", bend: -0.25 });
  arrowR(S, 1100, 430, 1360, 480, W(24, 7) + 0.8, { c: "red", bend: -0.25 });
  card(S, "NEW THOUGHT", 690, 760, { t: W(24, 15), fill: "yellow" });
  card(S, "NEW THOUGHT", 1230, 760, { t: W(24, 16), fill: "yellow" });
});
// 25 "About six and a half a minute, or, as a tentative estimate, a little over six thousand a day."
shot(25, 0, (S) => {
  field(S, "navy", 2);
  panel(S, 560, 520, 640, 420, S.start);
  countUp(S, 560, 520, 0, 6.5, W(25, 0), 0.9, { size: DS.type.display, fmt: (n) => n.toFixed(1) });
  txt(S, "PER MINUTE", 560, 640, { size: DS.type.body });
  panel(S, 1360, 520, 640, 420, W(25, 12));
  countUp(S, 1360, 520, 0, 6000, W(25, 12), 1.2, { size: DS.type.display, t0: W(25, 12), fmt: (n) => Math.round(n).toLocaleString("en-US") + "+" });
  txt(S, "PER DAY", 1360, 640, { size: DS.type.body, t: W(25, 12) });
  card(S, "A TENTATIVE ESTIMATE", 1360, 860, { t: W(25, 10), fill: "yellow" });
});
// 26 "So Dave isn't reading one book per person. He's reading six thousand very short ones."
shot(26, 0, (S) => {
  bg(S, "room-library-light");
  L.put(S, "prop-book-closed", 760, 720, { s: 1.3, t: W(26, 4) });
  const g = S.grp(); for (let i = 0; i < 14; i++) L.put(S, "prop-book-closed", 1250 + (i % 2) * 18 - 9, 900 - i * 52, { s: 0.6, parent: g, rot: i % 3 ? 4 : -5 });
  fadeG(S, g, W(26, 9));
  dave(S, 1000, 955, { s: 1.05, face: "dizzy" });
  card(S, "× 6,000", 1500, 300, { t: W(26, 10), fill: "yellow" });
  card(S, "1 BOOK?", 760, 520, { t: W(26, 4) });
});
// 27 "At lunch, his date's bubble says: he's sweet. Is that spinach?"
shot(27, 0, (S) => {
  bg(S, "room-restaurant-light");
  seat(S, 690, 950); seat(S, 1230, 950, "furn-dining-chair", true);
  dave(S, 690, 950, { s: 1.05, pose: "sit-chair", face: "happy" });
  guy(S, "girl06", 1230, 950, { s: 1.05, pose: "sit-chair", face: "smile", flip: true });
  L.put(S, "furn-dining-table", 960, 960, { s: 1.25 });
  think(S, 1230, 950 - HEAD * 1.05 + 40, { s: 0.6, t: W(27, 4), text: "he's sweet.|is that spinach?", seed: 101, dx: 60 });
});
// 27 "Dave checks. It is spinach. He has never loved a bubble more."
shot(27, 11, (S) => {
  bg(S, "room-restaurant-light");
  const a = dave(S, 800, 1010, { s: 1.6, face: "embarrassed", pose: "hold" });
  swap(a, dave(S, 800, 1010, { s: 1.6, face: "love", pose: "hold" }), W(27, 16));
  L.put(S, "p2-hand-mirror", 1060, 640, { s: 1.0, t: W(27, 11) });
  card(S, "IT IS SPINACH", 1400, 330, { t: W(27, 13) });
  L.put(S, "p2-heart-full", 1400, 560, { s: 0.7, t: W(27, 19) });
}, { cam: "zoom", focus: "800 500" });
// 28 "Then his friends arrive. Sam's bubble says: his hair looks weird today."
shot(28, 0, (S) => {
  bg(S, "room-restaurant-light");
  dave(S, 600, 950, { s: 1.05, face: "happy", pose: "wave" });
  guy(S, SAM.style, 1130, 950, Object.assign({}, SAM, { face: "smile", flip: true, t: W(28, 1) }));
  guy(S, JO.style, 1450, 950, Object.assign({}, JO, { face: "smile", flip: true, t: W(28, 2) }));
  think(S, 1130, 950 - HEAD * 1.05, { s: 0.56, t: W(28, 5), text: "his hair looks|weird today", seed: 111, dx: -30 });
});
// 29 "Jo nods along to Dave's story. Her bubble says: he's talking about his goldfish again."
shot(29, 0, (S) => {
  bg(S, "room-restaurant-light");
  daveTalk(S, 560, 950, { face: "happy", pose: "point" }, 29);
  L.put(S, "prop-fishbowl", 820, 640, { s: 0.65, t: W(29, 2) });
  guy(S, SAM.style, 1130, 950, Object.assign({}, SAM, { face: "smile", flip: true }));
  guy(S, JO.style, 1450, 950, Object.assign({}, JO, { face: "smile", flip: true }));
  think(S, 1450, 950 - HEAD * 1.05, { s: 0.56, t: W(29, 7), text: "he's talking about|his goldfish again", seed: 112, dx: -40 });
});
// 30 "And when Sam says, love the haircut, his bubble says: it's, well, a haircut."
shot(30, 0, (S) => {
  bg(S, "room-restaurant-light");
  dave(S, 560, 950, { s: 1.05, face: "happy" });
  guy(S, SAM.style, 1130, 950, Object.assign({}, SAM, { face: "smile", flip: true, mouth: "e" }));
  guy(S, JO.style, 1450, 950, Object.assign({}, JO, { face: "smile", flip: true }));
  L.put(S, "bubble-round", 820, 400, { s: 0.75, text: "Love the haircut!", tail: "right", t: W(30, 3) });
  think(S, 1130, 950 - HEAD * 1.05, { s: 0.56, t: W(30, 8), text: "it's... well...|a haircut.", seed: 113, dx: 120 });
});
// 31 "That's a white lie. In 1996, Bella DePaulo's team had 147 people log every lie they told for a week."
shot(31, 0, (S) => {
  bg(S, "room-home-office-light");
  fadeOut(card(S, "A WHITE LIE", 960, 110).g, W(31, 4), 0.3);
  study(S, "1996 · DePAULO", W(31, 4));
  L.put(S, "prop-notebook", 760, 560, { s: 2.3, t: W(31, 16) });
  [0, 1, 2, 3, 4].forEach((i) => S.draw(line([680 + i * 26, 610], [688 + i * 26, 690], 0), W(31, 17) + i * 0.12, 0, { c: DS.c("red", 2), w: DS.w.near }));
  panel(S, 1360, 600, 460, 380, W(31, 11));
  countUp(S, 1360, 520, 0, 147, W(31, 11), 1.0, { size: DS.type.display, fmt: (n) => String(Math.round(n)) });
  txt(S, "PEOPLE", 1360, 620, { size: DS.type.body, t: W(31, 11) });
  card(S, "1 WEEK", 1360, 760, { t: W(31, 21), fill: "yellow" });
});
// 32 "Students told about two a day, other adults about one, and one lie in four was told to protect someone else."
shot(32, 0, (S) => {
  field(S, "sand", 1);
  guy(S, "girl01", 420, 900, { s: 0.95, outfit: "student", outfitC: "white", face: "smug" });
  card(S, "2 A DAY", 420, 300, { t: W(32, 3), fill: "yellow" });
  guy(S, "man03", 900, 900, { s: 0.95, outfit: "office", outfitC: "gray", face: "smile", t: W(32, 6) });
  card(S, "1 A DAY", 900, 300, { t: W(32, 9), fill: "yellow" });
  S.pie(1450, 520, 210, 0.25, W(32, 11), 0.5, { cBig: DS.c("yellow"), cSmall: DS.c("gray", 1) });
  L.put(S, "p2-heart-full", 1530, 420, { s: 0.45, t: W(32, 18) });
  card(S, "1 IN 4: TO PROTECT SOMEONE", 1400, 820, { t: W(32, 17) });
});
// 33 "In Dave's world, every white lie comes with subtitles."
shot(33, 0, (S) => {
  bg(S, "room-restaurant-light");
  dave(S, 560, 950, { s: 1.05, face: "sad" });
  guy(S, SAM.style, 1240, 950, Object.assign({}, SAM, { face: "smile", flip: true, mouth: "e" }));
  L.put(S, "bubble-round", 960, 390, { s: 0.75, text: "Love the haircut!", tail: "right" });
  const g = S.grp(); DS.shape(S, rrect(560, 760, 800, 96, DS.r.sm), "ink", { flat: true, w: "detail", parent: g });
  S.text("(it's... a haircut)", 960, 822, { size: DS.type.body, t: T0(S), c: DS.P.white[0], parent: g });
  fadeG(S, g, W(33, 7));
});
// 34 (@dave) "Brain, I don't want to know what people think anymore."
shot(34, 0, (S) => {
  bg(S, "room-living-room-light");
  L.put(S, "furn-sofa", 820, 940, { s: 1.5, c: "blue" });
  daveTalk(S, 800, 870, { face: "sad", pose: "sit-chair" }, 34);
  brain(S, 1260, 900, 1.15, "worried", { t: W(34, 0) });
}, { cam: "push" });
// 35 (@brain) "I did mention the lids, Dave."
shot(35, 0, (S) => {
  bg(S, "room-living-room-light");
  L.put(S, "furn-sofa", 560, 940, { s: 1.3, c: "blue" });
  dave(S, 540, 880, { s: 0.95, face: "grumpy", pose: "sit-chair" });
  brainTalk(S, 1200, 960, 2.1, "stern", 35, { armR: "point" });
}, { cam: "push" });
// ===================== chapter 4: Day two: the train (clips 36-48) =====================
const train = (S, o = {}) => {
  L.put(S, "ride-subway-interior", 960, 1010, { s: 2.15, crowd: true });
  if (o.crowd !== false) [["man02", 300, "flat"], ["girl05", 590, "bored"], ["man07", 1330, "tired"], ["girl09", 1620, "flat"]].forEach(([st, x, f]) => guy(S, st, x, 975, { s: 1.0, face: f }));
};
// 36 "Day two. Rush hour. Dave squeezes onto a train with about a hundred other people, and a hundred bubbles."
shot(36, 0, (S) => {
  train(S);
  dave(S, 960, 975, { s: 1.0, face: "nervous" });
  L.put(S, "fx-sweat-drops", 1010, 560, { s: 0.5, t: W(36, 5) });
  L.put(S, "thought-flood", 960, 270, { s: 0.95, n: 32, seed: 361, t: W(36, 16) });
  clock(S, "DAY 2");
});
// 37 "Shopping lists, old arguments, a song stuck on repeat, a dog someone saw in 2012."
shot(37, 0, (S) => {
  field(S, "sky", 1);
  L.put(S, "thought-flood", 960, 540, { s: 1.15, n: 34, seed: 371 }).setAttribute("opacity", 0.35);
  L.put(S, "thought-pic", 330, 470, { s: 0.6, noTail: true, text: "milk|eggs|bread", seed: 372, t: W(37, 0) });
  L.put(S, "thought-pic", 760, 640, { s: 0.6, noTail: true, text: "I SHOULD|HAVE SAID...", seed: 373, t: W(37, 2) });
  L.put(S, "thought-pic", 1170, 440, { s: 0.6, noTail: true, pic: "prop-music-notes", picS: 1.3, seed: 374, t: W(37, 4) });
  L.put(S, "thought-pic", 1590, 640, { s: 0.6, noTail: true, pic: "animal-dog", picS: 1.0, picY: 70, seed: 375, t: W(37, 9) });
  card(S, "2012", 1590, 880, { t: W(37, 13), fill: "yellow" });
  card(S, "REPEAT", 1170, 680, { t: W(37, 7) });
});
// 38 "Above a calm man in a suit: what if I licked that pole?"
shot(38, 0, (S) => {
  train(S, { crowd: false });
  DS.shape(S, rrect(1050, 120, 26, 840, DS.r.sm), "gray", { w: "detail" });
  guy(S, "man06", 930, 975, { s: 1.2, outfit: "suit", outfitC: "navy", face: "flat", pose: "reach" });
  think(S, 930, 975 - HEAD * 1.2, { s: 0.6, t: W(38, 7), text: "what if I|licked that pole?", seed: 381, dx: -330, gap: 10 });
  card(S, "VERY CALM", 1450, 300, { t: W(38, 2) });
}, { cam: "zoom", focus: "930 500" });
// 39 "Above a sweet old lady in the quiet carriage: what if I shouted a rude word, right now?"
shot(39, 0, (S) => {
  train(S, { crowd: false });
  guy(S, "girl07", 960, 975, { s: 1.1, body: "elderly", outfit: "sweater", outfitC: "purple", face: "smile" });
  card(S, "QUIET CARRIAGE", 1480, 140, { t: W(39, 6) });
  think(S, 960, 975 - HEAD * 1.1, { s: 0.62, t: W(39, 9), text: "what if I shouted|a rude word?", seed: 391, dx: -380, gap: 0 });
}, { cam: "zoom", focus: "960 520" });
// 40 "Is this train full of secret villains? No. These are intrusive thoughts, and almost everybody has them."
shot(40, 0, (S) => {
  train(S);
  const a = dave(S, 960, 975, { s: 1.0, face: "shocked", pose: "shocked" });
  swap(a, dave(S, 960, 975, { s: 1.0, face: "thinking" }), W(40, 7));
  const sw = L.put(S, "fx-sweat-drops", 1010, 600, { s: 0.6, t: W(40, 1) }); fadeOut(sw, W(40, 7));
  fadeOut(card(S, "SECRET VILLAINS?", 960, 120, { t: W(40, 3) }).g, W(40, 7), 0.3);
  [300, 590, 1330, 1620].forEach((x, i) => think(S, x, 975 - HEAD, { s: 0.36, text: "!?", size: DS.type.display, seed: 400 + i, t: W(40, 12) + i * 0.15 }));
  card(S, "INTRUSIVE THOUGHTS", 960, 120, { t: W(40, 10), fill: "yellow" });
});
// 41 "In 1978, Stanley Rachman and Padmal de Silva asked 124 people with no diagnosis about unwanted thoughts."
shot(41, 0, (S) => {
  field(S, "sand", 1);
  study(S, "1978 · RACHMAN & DE SILVA");
  panel(S, 960, 560, 1200, 600, S.start);
  grid(S, 124, 20, 523, 360, 46, 0.42, () => false, W(41, 10));
  card(S, "124 PEOPLE · NO DIAGNOSIS", 960, 800, { t: W(41, 14) });
});
// 42 "Ninety-nine of them said they had them, and most found them easy to brush off."
shot(42, 0, (S) => {
  field(S, "sand", 1);
  panel(S, 960, 560, 1200, 600, S.start);
  grid(S, 124, 20, 523, 360, 46, 0.42, (i) => i < 99, W(42, 0));
  card(S, "99 OF 124", 960, 120, { t: W(42, 0), fill: "yellow" });
  card(S, "EASY TO BRUSH OFF", 960, 800, { t: W(42, 9) });
});
// 43 "Even clinicians found them surprisingly hard to tell apart from patients' obsessions."
shot(43, 0, (S) => {
  bg(S, "room-hospital-room-light");
  guy(S, "girl01", 960, 960, { s: 1.15, outfit: "doctor", outfitC: "white", face: "confused", pose: "shrug" });
  panel(S, 450, 470, 460, 330, S.start); lines0(S, 450, 470);
  panel(S, 1470, 470, 460, 330, S.start); lines0(S, 1470, 470);
  card(S, "ORDINARY", 450, 250); card(S, "PATIENTS", 1470, 250);
  card(S, "WHICH IS WHICH?", 960, 120, { t: W(43, 6), fill: "yellow" });
});
const lines0 = (S, cx, cy) => { for (let i = 0; i < 4; i++) S.draw(line([cx - 170, cy - 90 + i * 58], [cx + (i === 3 ? 40 : 170), cy - 90 + i * 58], 0), T0(S), 0, { c: DS.c("gray", 1), w: DS.w.detail }); };
// 44 "In 2014, a survey of students in 13 countries found that 94% had had at least one in the past three months."
shot(44, 0, (S) => {
  field(S, "navy", 2);
  study(S, "2014 · 13 COUNTRIES");
  L.put(S, "ep-globe-flat", 640, 560, { s: 1.9 });
  const r = L.rng(44); for (let i = 0; i < 13; i++) { const a = r() * Math.PI * 2, d = Math.sqrt(r()) * 250; S.fill(circ(640 + Math.cos(a) * d, 560 + Math.sin(a) * d * 0.8, 14), W(44, 8) + i * 0.06, 0.2, DS.c("red"), 1); }
  countUp(S, 1400, 560, 0, 94, W(44, 12), 1.0, { size: DS.type.display, c: DS.P.white[0], fmt: (n) => Math.round(n) + "%" });
  card(S, "IN THE PAST 3 MONTHS", 1400, 720, { t: W(44, 19) });
});
// 45 "An intrusive thought isn't a plan. It's your brain checking a door it has no intention of opening."
shot(45, 0, (S) => {
  bg(S, "kit-room-corridor");
  L.put(S, "furn-door", 1250, 940, { s: 1.6 });
  const b = S.grp(); brain(S, 1000, 940, 1.35, "smile", { t: W(45, 6), parent: b });
  shift(b, W(45, 14), 1.4, [0, 0], [-420, 0]);
  card(S, "NOT A PLAN", 960, 130, { t: W(45, 3), fill: "yellow" });
  card(S, "JUST CHECKING", 1250, 330, { t: W(45, 9) });
});
// 46 "The man in the suit gets off at his stop. He has not licked anything."
shot(46, 0, (S) => {
  L.put(S, "ride-train-platform", 960, 1000, { s: 2.1, time: "day" });
  const m = S.grp(); guy(S, "man06", 760, 960, { s: 1.1, outfit: "suit", outfitC: "navy", face: "flat", pose: "cyc-walk-2", parent: m });
  shift(m, W(46, 0), 3.5, [0, 0], [380, 0], "none");
  card(S, "NOTHING LICKED", 960, 150, { t: W(46, 12), fill: "green" });
});
// 47 "But there's no off switch, and nobody gets a private moment."
shot(47, 0, (S) => {
  bg(S, "room-living-room-light");
  L.put(S, "p2-toggle", 1250, 470, { s: 2.2, on: true });
  card(S, "BUBBLES", 1250, 260);
  dave(S, 760, 950, { s: 1.15, face: "annoyed", pose: "push" });
  xMark(S, 1250, 470, 1.6, W(47, 3));
  card(S, "NO OFF SWITCH", 960, 120, { t: W(47, 2), fill: "yellow" });
});
// 47 "Not the man practising an apology, not the woman quietly missing her dad."
shot(47, 11, (S) => {
  bg(S, "scene-park-day");
  guy(S, "man08", 600, 960, { s: 1.05, face: "nervous" });
  think(S, 600, 960 - HEAD * 1.05, { s: 0.58, t: W(47, 13), text: "I'm sorry I... no...|I'm sorry that...", seed: 471, dx: 40 });
  guy(S, "girl09", 1330, 960, { s: 1.05, face: "sad", flip: true });
  think(S, 1330, 960 - HEAD * 1.05, { s: 0.5, t: W(47, 19), pic: "p2-heart-full", picS: 1.1, text: "Dad", textY: 120, size: DS.type.caption, seed: 472, dx: -20 });
});
// 48 "It feels like reading everyone's diary without asking."
shot(48, 0, (S) => {
  train(S);
  dave(S, 960, 1000, { s: 1.35, face: "embarrassed", pose: "hold" });
  L.put(S, "prop-book-open", 960, 800, { s: 1.15, t: W(48, 3) });
  card(S, "EVERYONE'S DIARY", 960, 140, { t: W(48, 4) });
}, { cam: "zoom", focus: "960 560" });
// ===================== chapter 5: Day four: his own bubble (clips 49-57) =====================
// 49 "By day four, Dave stops going out. Not because of other people's bubbles. Because of his own."
shot(49, 0, (S) => {
  bg(S, "room-living-room-light");
  L.put(S, "furn-sofa", 640, 940, { s: 1.4, c: "blue" });
  dave(S, 1200, 955, { s: 1.15, face: "worried", pose: "hug-self" });
  think(S, 1200, 955 - HEAD * 1.15, { s: 0.55, t: W(49, 13), kind: "faint", text: "?", size: DS.type.display, seed: 491 });
  clock(S, "DAY 4");
});
// 50 (@dave) "What if it works both ways, Brain? What if everyone can see mine?"
shot(50, 0, (S) => {
  bg(S, "room-living-room-light");
  daveTalk(S, 740, 955, { face: "worried", pose: "shrug" }, 50);
  brain(S, 1280, 920, 1.2, "worried", { armL: "hip" });
}, { cam: "push" });
// 51 (@brain) "Then they'll see what I put up with all day."
shot(51, 0, (S) => {
  bg(S, "kit-room-library-day", { time: "day" });
  L.put(S, "thought-flood", 960, 380, { s: 0.75, n: 26, seed: 511 });
  brainTalk(S, 960, 830, 1.6, "tired", 51);
  L.put(S, "kit-desk-library", 960, 950, { s: 1.4 });
}, { cam: "push" });
// 52 "On the way to the shops, his own head offers: what if you hugged the bus driver?"
shot(52, 0, (S) => {
  bg(S, "scene-city-street-day");
  L.put(S, "ride-city-bus", 1320, 930, { s: 1.05, color: "red", driver: true, time: "day" });
  brain(S, 690, 955 - HEAD * 1.1 + 120, 0.62, "smile", { t: W(52, 6) });
  dave(S, 600, 955, { s: 1.1, face: "nervous" });
  L.put(S, "bubble-round", 820, 300, { s: 0.8, text: "Hug the bus driver?", tail: "left", t: W(52, 10) });
});
// 52 "What if you sang at the checkout?"
shot(52, 17, (S) => {
  bg(S, "room-shop-counter-light");
  L.put(S, "job-cashier", 1280, 950, { s: 1.15 });
  brain(S, 710, 955 - HEAD * 1.1 + 120, 0.62, "smile");
  dave(S, 620, 955, { s: 1.1, face: "nervous" });
  L.put(S, "bubble-round", 850, 300, { s: 0.8, text: "Sing at the checkout?", tail: "left", t: W(52, 18) });
  L.put(S, "prop-music-notes", 1150, 470, { s: 0.8, t: W(52, 20) });
});
// 53 "So Dave wears a big woolly hat, just in case."
shot(53, 0, (S) => {
  bg(S, "room-living-room-light");
  const a = dave(S, 960, 1040, { s: 1.75, face: "nervous" });
  swap(a, dave(S, 960, 1040, { s: 1.75, face: "nervous", acc: ["beanie"], accC: "red" }), W(53, 2));
  L.put(S, "fx-sweat-drops", 1110, 420, { s: 0.7, t: W(53, 6) });
  card(S, "JUST IN CASE", 1500, 300, { t: W(53, 7), fill: "yellow" });
}, { cam: "zoom", focus: "960 460" });
// 54 "That feeling, that your thoughts are leaking out, has a name: the illusion of transparency."
shot(54, 0, (S) => {
  bg(S, "room-living-room-light");
  dave(S, 960, 1040, { s: 1.75, face: "worried", acc: ["beanie"], accC: "red" });
  [[760, 300, 0.22], [1170, 250, 0.28], [960, 170, 0.18]].forEach(([x, y, k], i) => {
    const g = S.grp(); L.put(S, "thought-pic", x, y, { s: k, noTail: true, kind: "faint", seed: 540 + i, t: W(54, 5) + i * 0.3, parent: g });
    shift(g, W(54, 5) + i * 0.3, 3, [0, 0], [0, -60]);
  });
  card(S, "THE ILLUSION OF TRANSPARENCY", 960, 110, { t: W(54, 11) });
}, { cam: "push" });
// 55 "In 1998, Thomas Gilovich's team at Cornell had students tell lies in small groups, then guess how many would catch them."
shot(55, 0, (S) => {
  bg(S, "room-classroom-light");
  study(S, "1998 · GILOVICH · CORNELL");
  guy(S, "man02", 960, 950, { s: 1.15, face: "nervous" });
  L.put(S, "fx-sweat-drops", 1020, 520, { s: 0.5, t: W(55, 10) });
  card(S, "LYING", 960, 330, { t: W(55, 10), fill: "red" });
  [[430, "girl04"], [700, "man09"], [1220, "girl10"], [1490, "man05"]].forEach(([x, st], i) => {
    guy(S, st, x, 950, { s: 0.9, face: "thinking", flip: x > 960 });
    think(S, x, 950 - HEAD * 0.9, { s: 0.33, text: "?", size: DS.type.display, seed: 550 + i, t: W(55, 16) + i * 0.15 });
  });
});
// 56 "The liars expected about half the group to see through them. Only about a quarter did, no better than guessing."
shot(56, 0, (S) => {
  field(S, "sand", 1);
  card(S, "HOW MANY WOULD CATCH THE LIAR?", 960, 120);
  hbar(S, "EXPECTED", 640, 420, 1000, 0.488, "orange", W(56, 2), "48.8%");
  hbar(S, "CAUGHT", 640, 620, 1000, 0.256, "blue", W(56, 11), "25.6%");
  card(S, "NO BETTER THAN GUESSING", 960, 820, { t: W(56, 16), fill: "yellow" });
});
// 57 "Everyone walks around feeling like Dave in his woolly hat."
shot(57, 0, (S) => {
  bg(S, "scene-city-street-day");
  [["girl03", 300, "pink"], ["man07", 600, "green"], ["girl08", 1260, "blue"], ["man10", 1560, "orange"]].forEach(([st, x, c], i) => guy(S, st, x, 945, { s: 0.95, face: "nervous", acc: ["beanie"], accC: c, flip: i % 2 === 1, t: W(57, 0) + i * 0.15 }));
  dave(S, 930, 960, { s: 1.05, face: "nervous", acc: ["beanie"], accC: "red" });
});

// ===================== chapter 6: Can anyone really read minds? (clips 58-65) =====================
const lab = (S) => { bg(S, "room-science-lab-light"); };
// 58 "So Dave visits a lab. Can anyone really read minds?"
shot(58, 0, (S) => {
  lab(S);
  L.put(S, "sci-mri-scanner", 1350, 950, { s: 1.05 });
  const d = S.grp(); dave(S, 380, 955, { s: 1.1, face: "worried", acc: ["beanie"], accC: "red", pose: "cyc-walk-1", parent: d });
  shift(d, S.start, 1.6, [0, 0], [260, 0], "power1.out");
  card(S, "CAN ANYONE REALLY READ MINDS?", 960, 120, { t: W(58, 5) });
});
// 59 (@doc) "Brain decoders are real, Dave. They're just very slow and very picky."
shot(59, 0, (S) => {
  lab(S);
  L.put(S, "sci-mri-scanner", 1390, 950, { s: 1.05 });
  docTalk(S, 880, 955, { pose: "point" }, 59);
  dave(S, 420, 955, { s: 1.05, face: "thinking", acc: ["beanie"], accC: "red" });
  card(S, "SLOW", 1390, 200, { t: W(59, 8) }); card(S, "PICKY", 1390, 290, { t: W(59, 11) });
});
// 60 "In 2023, Jerry Tang and Alexander Huth's team in Texas had three volunteers listen to sixteen hours of stories inside a brain scanner."
shot(60, 0, (S) => {
  lab(S);
  study(S, "2023 · TANG & HUTH · TEXAS");
  L.put(S, "sci-mri-scanner", 960, 950, { s: 1.05 });
});
// 60 "...had three volunteers listen to sixteen hours of stories inside a brain scanner."
shot(60, 11, (S) => {
  lab(S);
  study(S, "2023 · TANG & HUTH · TEXAS");
  L.put(S, "sci-mri-scanner", 700, 950, { s: 1.05 });
  L.put(S, "prop-headphones", 700, 740, { s: 0.7, t: W(60, 14) });
  panel(S, 1330, 640, 620, 560, S.start);
  [1210, 1330, 1450].forEach((x, i) => mini(S, x, 500, 1.4, { t: W(60, 12) + i * 0.15 }));
  card(S, "3 VOLUNTEERS", 1330, 580, { t: W(60, 12) });
  countUp(S, 1330, 800, 0, 16, W(60, 16), 1.0, { size: DS.type.display, fmt: (n) => Math.round(n) + " HOURS" });
});
// 61 "Then a computer turned new brain activity back into words. Well, the gist."
shot(61, 0, (S) => {
  lab(S);
  L.put(S, "sci-brain-monitor", 520, 520, { s: 1.6 });
  arrowR(S, 760, 520, 1100, 520, W(61, 3), { c: "red" });
  L.put(S, "prop-laptop", 1360, 560, { s: 2.0, t: W(61, 7) });
  [0, 1, 2].forEach((i) => S.draw(line([1250, 470 + i * 34], [1250 + (i === 2 ? 120 : 220), 470 + i * 34], 0), W(61, 8) + i * 0.2, 0, { c: DS.c("ink"), w: DS.w.detail }));
  card(S, "THE GIST", 1360, 230, { t: W(61, 11), fill: "yellow" });
});
// 62 "When one volunteer heard, I don't have my driver's license yet, it wrote: she has not even started to learn to drive yet."
shot(62, 0, (S) => {
  field(S, "sand", 1);
  panel(S, 960, 330, 1500, 220, S.start);
  card(S, "THE VOLUNTEER HEARD", 520, 250);
  txt(S, "“I don't have my driver's license yet.”", 960, 365, { size: DS.type.body, t: W(62, 4) });
  panel(S, 960, 690, 1500, 220, W(62, 11));
  card(S, "THE DECODER WROTE", 520, 610, { t: W(62, 11) });
  txt(S, "“She has not even started to learn to drive yet.”", 960, 725, { size: DS.type.small, t: W(62, 13) });
});
// 63 "Trained on one person, it barely worked on anyone else."
shot(63, 0, (S) => {
  lab(S);
  L.put(S, "sci-mri-scanner", 640, 950, { s: 1.0 });
  guy(S, "man09", 1000, 955, { s: 1.0, face: "confused" });
  L.put(S, "prop-laptop", 1450, 600, { s: 1.8, t: W(63, 4) });
  txt(S, "? # & % ?", 1450, 560, { size: DS.type.body, c: DS.c("red", 2), t: W(63, 5) });
  card(S, "ONE PERSON ONLY", 960, 120, { t: W(63, 0) });
});
// 63 "And when volunteers silently named animals, it mostly stopped working."
shot(63, 10, (S) => {
  lab(S);
  guy(S, "girl04", 760, 955, { s: 1.1, face: "smug" });
  const hy = 955 - HEAD * 1.1;
  think(S, 760, hy, { s: 0.6, pic: "animal-giraffe", picS: 0.55, picY: 100, seed: 631, t: W(63, 14), dx: -60 });
  L.put(S, "thought-pic", 1080, 300, { s: 0.36, noTail: true, pic: "animal-cat", picS: 0.9, picY: 60, seed: 632, t: W(63, 15) });
  L.put(S, "prop-laptop", 1450, 600, { s: 1.8 });
  xMark(S, 1450, 560, 1.1, W(63, 17));
});
// 64 "So one of the best mind readers on Earth needs sixteen hours of your help, and you can beat it by thinking about giraffes."
shot(64, 0, (S) => {
  lab(S);
  L.put(S, "sci-mri-scanner", 1420, 950, { s: 1.0 });
  dave(S, 720, 955, { s: 1.15, face: "smug", acc: ["beanie"], accC: "red" });
  card(S, "16 HOURS OF YOUR HELP", 960, 120, { t: W(64, 9) });
  think(S, 720, 955 - HEAD * 1.15, { s: 0.62, pic: "animal-giraffe", picS: 0.58, picY: 105, seed: 641, t: W(64, 21), dx: 40 });
  L.put(S, "animal-giraffe", 1080, 955, { s: 0.9, t: W(64, 23) });
});
// 65 "For now, the lid stays on. Your thoughts are still your own."
shot(65, 0, (S) => {
  bg(S, "scene-city-street-day");
  dave(S, 900, 955, { s: 1.15, face: "relieved", acc: ["beanie"], accC: "red" });
  L.put(S, "prop-padlock", 1250, 420, { s: 1.1, t: W(65, 3) });
  card(S, "STILL YOUR OWN", 1250, 640, { t: W(65, 6), fill: "green" });
});
// ===================== chapter 7: The twist (clips 66-75) =====================
// 66 "So Dave takes off the hat, goes back out, and this time, he reads slowly."
shot(66, 0, (S) => {
  bg(S, "scene-city-street-day");
  const a = dave(S, 960, 960, { s: 1.3, face: "determined", acc: ["beanie"], accC: "red" });
  const b = dave(S, 960, 960, { s: 1.3, face: "determined", pose: "hold" }); swap(a, b, W(66, 2));
  swap(b, dave(S, 960, 960, { s: 1.3, face: "thinking", acc: ["glasses"], pose: "think" }), W(66, 12));
  card(S, "SLOWLY", 1450, 330, { t: W(66, 13), fill: "yellow" });
});
const cafe = (S) => { bg(S, "room-restaurant-light"); dave(S, 540, 950, { s: 1.05, face: "thinking", acc: ["glasses"] }); };
// 67 "Sam's bubble still says: his hair looks weird today."
shot(67, 0, (S) => {
  cafe(S);
  guy(S, SAM.style, 1180, 950, Object.assign({}, SAM, { face: "smile", flip: true }));
  think(S, 1180, 950 - HEAD * 1.05, { s: 0.56, text: "his hair looks|weird today", seed: 111, dx: -30 });
});
// 67 "But the next one says: I'm really glad he came."
shot(67, 9, (S) => {
  cafe(S);
  guy(S, SAM.style, 1180, 950, Object.assign({}, SAM, { face: "happy", flip: true }));
  L.put(S, "thought-pic", 1010, 190, { s: 0.42, noTail: true, kind: "faint", text: "his hair looks|weird today", seed: 111 });
  think(S, 1180, 950 - HEAD * 1.05, { s: 0.6, text: "I'm really glad|he came.", seed: 671, dx: 160, t: W(67, 13) });
  L.put(S, "p2-heart-full", 1530, 470, { s: 0.42, t: W(67, 15) });
});
// 68 "And Jo's says: he gets so happy about that goldfish. I love that."
shot(68, 0, (S) => {
  cafe(S);
  guy(S, JO.style, 1180, 950, Object.assign({}, JO, { face: "happy", flip: true }));
  think(S, 1180, 950 - HEAD * 1.05, { s: 0.64, text: "he gets so happy|about that goldfish.|I love that.", seed: 681, dx: 40, t: W(68, 2) });
  L.put(S, "prop-fishbowl", 1600, 640, { s: 0.6, t: W(68, 9) });
});
// 69 "The rude thoughts were real. They were just the loudest, not the last."
shot(69, 0, (S) => {
  field(S, "sky", 1);
  L.put(S, "bubble-shout", 470, 450, { s: 1.05, text: "WEIRD HAIR", c: "red" });
  L.put(S, "thought-pic", 1000, 470, { s: 0.55, noTail: true, kind: "faint", text: "lunch?", seed: 691, t: W(69, 5) });
  L.put(S, "thought-pic", 1460, 460, { s: 0.7, noTail: true, text: "glad|he came", seed: 692, t: W(69, 7) });
  L.put(S, "p2-heart-full", 1640, 330, { s: 0.45, t: W(69, 8) });
  arrowR(S, 720, 640, 1340, 640, W(69, 6), { c: "ink", bend: 0.15 });
  card(S, "LOUDEST", 470, 770, { t: W(69, 9), fill: "red" });
  card(S, "LAST", 1450, 770, { t: W(69, 12), fill: "green" });
});
// 70 "In 2018, Erica Boothby's team asked people after a chat how much they liked their partner, and how much they thought they were liked."
shot(70, 0, (S) => {
  bg(S, "room-waiting-room-light");
  study(S, "2018 · BOOTHBY");
  seat(S, 720, 950); seat(S, 1220, 950, "furn-dining-chair", true);
  guy(S, "man10", 720, 950, { s: 1.05, pose: "sit-chair", face: "smile" });
  guy(S, "girl10", 1220, 950, { s: 1.05, pose: "sit-chair", face: "smile", flip: true });
  think(S, 720, 950 - HEAD * 1.05 + 40, { s: 0.46, pic: "p2-heart-full", picS: 1.0, seed: 701, dx: -80, t: W(70, 13) });
  think(S, 1220, 950 - HEAD * 1.05 + 40, { s: 0.46, text: "they found|me boring?", seed: 702, dx: 80, t: W(70, 20) });
});
// 71 "Again and again, people underestimated it. The researchers called it the liking gap,"
shot(71, 0, (S) => {
  field(S, "sand", 1);
  const bar = (x, h, name, t, label) => { const g = S.grp(); DS.shape(S, rrect(x - 110, 860 - h, 220, h, DS.r.sm), name, { w: "detail", parent: g }); scaleY(g, t, x, 860, 0.7); txt(S, label, x, 920, { size: DS.type.caption, t }); };
  bar(640, 560, "green", W(71, 3), "HOW MUCH THEY LIKED YOU");
  bar(1280, 330, "gray", W(71, 4), "HOW MUCH YOU THOUGHT");
  S.draw("M1430 300 H1470 V530 H1430", W(71, 10), 0, { c: DS.c("red", 2), w: DS.w.near });
  card(S, "THE LIKING GAP", 1500, 200, { t: W(71, 10), fill: "yellow" });
});
// 71 "...and among students sharing a dorm, it lasted for months."
shot(71, 13, (S) => {
  bg(S, "room-bedroom-light");
  L.put(S, "furn-bed", 520, 930, { s: 1.0 }); L.put(S, "furn-bed", 1400, 930, { s: 1.0, flip: true });
  guy(S, "girl02", 820, 950, { s: 1.0, outfit: "student", outfitC: "white", face: "smile" });
  guy(S, "girl06", 1100, 950, { s: 1.0, face: "smile", flip: true });
  L.put(S, "story-calendar-flip", 1600, 300, { s: 0.6, frame: 2, day: 12, month: "OCT", t: W(71, 19) });
  card(S, "FOR MONTHS", 960, 120, { t: W(71, 20), fill: "yellow" });
});
// 72 "So Dave spent four days scared of what people really think."
shot(72, 0, (S) => {
  field(S, "sky", 1);
  [["smile", null], ["nervous", null], ["worried", null], ["scared", "beanie"]].forEach(([f, acc], i) => {
    dave(S, 330 + i * 420, 880, Object.assign({ s: 0.95, face: f, t: W(72, 2) + i * 0.2 }, acc ? { acc: [acc], accC: "red" } : {}));
    card(S, "DAY " + (i + 1), 330 + i * 420, 330, { t: W(72, 2) + i * 0.2 });
  });
});
// 72 "Mostly, they think: oven, lunch, a song on repeat, and, very quietly, I like Dave."
shot(72, 11, (S) => {
  field(S, "sky", 1);
  L.put(S, "thought-pic", 330, 330, { s: 0.48, noTail: true, pic: "furn-stove", picS: 0.8, picY: 70, seed: 721, t: W(72, 14) });
  L.put(S, "thought-pic", 760, 330, { s: 0.48, noTail: true, pic: "prop-sandwich", picS: 1.2, seed: 722, t: W(72, 15) });
  L.put(S, "thought-pic", 1190, 330, { s: 0.48, noTail: true, pic: "prop-music-notes", picS: 1.2, seed: 723, t: W(72, 17) });
  L.put(S, "thought-pic", 1600, 380, { s: 0.5, noTail: true, text: "I like Dave", size: DS.type.title, seed: 724, t: W(72, 23) });
  const a = dave(S, 960, 960, { s: 1.15, face: "thinking", acc: ["glasses"] });
  swap(a, dave(S, 960, 960, { s: 1.15, face: "love", acc: ["glasses"] }), W(72, 24));
});
// 73 "Every head is as messy as his: half-finished sentences, empty bubbles, an urge to lick a pole,"
const crowd5 = [["girl03", 260], ["man07", 600], ["girl08", 1300], ["man06", 1640]];
const MESS = [{ text: "I should|really...", seed: 731 }, { seed: 732 }, { text: "lick|the pole?", seed: 733 }, { text: "where did|I put...", seed: 734 }];
shot(73, 0, (S) => {
  bg(S, "scene-city-street-day");
  crowd5.forEach(([st, x], i) => { guy(S, st, x, 945, { s: 0.9, face: "flat", flip: i > 1 }); think(S, x, 945 - HEAD * 0.9, Object.assign({ s: 0.42, t: W(73, 7 + i * 2) }, MESS[i])); });
  dave(S, 950, 960, { s: 1.0, face: "thinking", acc: ["glasses"] });
});
// 73 "...and underneath it all, a lot of kindness nobody says out loud."
shot(73, 17, (S) => {
  bg(S, "scene-city-street-day");
  crowd5.forEach(([st, x], i) => {
    guy(S, st, x, 945, { s: 0.9, face: "smile", flip: i > 1 });
    fadeOut(think(S, x, 945 - HEAD * 0.9, Object.assign({ s: 0.42 }, MESS[i])), W(73, 18) + i * 0.2, 0.6, 0.35);
    L.put(S, "thought-pic", x + (i > 1 ? -60 : 60), 945 - HEAD * 0.9 - 40, { s: 0.22, noTail: true, pic: "p2-heart-full", picS: 1.5, seed: 735 + i, t: W(73, 19) + i * 0.25 });
  });
  dave(S, 950, 960, { s: 1.0, face: "relieved", acc: ["glasses"] });
});
// 74 "And there's a better superpower than bubbles. In 2018, Tal Eyal and Nicholas Epley ran twenty-five experiments on reading minds."
shot(74, 0, (S) => {
  field(S, "sand", 1);
  dave(S, 330, 920, { s: 1.0, pose: "flex", face: "smile", outfit: "superhero", outfitC: "red" });
  card(S, "A BETTER SUPERPOWER", 960, 120);
  study(S, "2018 · EYAL & EPLEY", W(74, 8));
  for (let i = 0; i < 25; i++) L.put(S, "sci-flask", 860 + (i % 5) * 150, 330 + Math.floor(i / 5) * 120, { s: 0.42, t: W(74, 16) + i * 0.03 });
  card(S, "25 EXPERIMENTS", 1160, 900, { t: W(74, 16) });
});
// 75 "Imagining someone else's point of view didn't reliably make anyone more accurate."
shot(75, 0, (S) => {
  bg(S, "room-waiting-room-light");
  guy(S, "man02", 640, 950, { s: 1.1, face: "thinking", pose: "think" });
  think(S, 640, 950 - HEAD * 1.1, { s: 0.6, pic: "person", picO: { style: "girl10", face: "smile" }, picS: 0.42, picY: 75, seed: 751, dx: 60, t: W(75, 0) });
  guy(S, "girl10", 1350, 950, { s: 1.1, face: "flat", flip: true });
  xMark(S, 1000, 520, 1.2, W(75, 7));
  card(S, "NOT MORE ACCURATE", 1350, 300, { t: W(75, 10) });
});
// 75 "What worked was much less magic. You ask them."
shot(75, 12, (S) => {
  bg(S, "room-waiting-room-light");
  dave(S, 640, 950, { s: 1.1, face: "smile", acc: ["glasses"], pose: "wave" });
  guy(S, SAM.style, 1300, 950, Object.assign({}, SAM, { face: "happy", flip: true }));
  L.put(S, "bubble-round", 860, 370, { s: 0.8, text: "How are you, really?", tail: "left", t: W(75, 18) });
  tick(S, 1300, 330, 1.2, W(75, 19));
  card(S, "ASK", 960, 120, { t: W(75, 18), fill: "green" });
});
// ===================== chapter 8: The oven (clips 76-82) =====================
// 76 "On day five, the bubbles start to fade, and Dave lets them."
shot(76, 0, (S) => {
  bg(S, "scene-suburb-day");
  [["girl04", 360], ["man03", 700], ["girl07", 1280], ["man08", 1600]].forEach(([st, x], i) => {
    guy(S, st, x, 945, { s: 0.9, face: "smile", flip: i > 1 });
    fadeOut(think(S, x, 945 - HEAD * 0.9, { s: 0.42, seed: 760 + i, text: ["lunch?", "", "oven?", "glad"][i] }), W(76, 5) + i * 0.15, 2.2, 0.08);
  });
  dave(S, 980, 960, { s: 1.05, face: "relieved" });
  clock(S, "DAY 5");
});
// 77 "So what would really happen if you could see everyone's thoughts? An hour of superpower, then a flood."
const tri = (S, n) => {
  card(S, "WHAT IF YOU COULD SEE EVERYONE'S THOUGHTS?", 960, 110);
  const P = [[410, 1], [960, 2], [1510, 3]];
  P.forEach(([x, k]) => { if (k <= n) panel(S, x, 540, 480, 560, S.start); });
  dave(S, 410, 760, { s: 0.75, face: "excited", outfit: "superhero", outfitC: "red", pose: "cheer" });
  L.put(S, "thought-pic", 410, 380, { s: 0.35, noTail: true, pic: "prop-umbrella-ducks", picS: 1.3, seed: 771 });
  card(S, "SUPERPOWER", 410, 880);
  return P;
};
shot(77, 0, (S) => {
  tri(S, 2);
  const g = S.grp();
  L.put(S, "thought-flood", 960, 400, { s: 0.28, n: 24, seed: 772, parent: g });
  dave(S, 960, 760, { s: 0.75, face: "nervous", parent: g });
  card(S, "FLOOD", 960, 880, { t: W(77, 15) });
  fadeG(S, g, W(77, 15));
});
// 78 "And then, if you read slowly, a relief. Other heads are as messy as yours, and they like you more than you think."
shot(78, 0, (S) => {
  tri(S, 3);
  L.put(S, "thought-flood", 960, 400, { s: 0.28, n: 24, seed: 772 }); dave(S, 960, 760, { s: 0.75, face: "nervous" }); card(S, "FLOOD", 960, 880);
  const g = S.grp();
  L.put(S, "thought-pic", 1510, 380, { s: 0.35, noTail: true, pic: "p2-heart-full", picS: 1.3, seed: 781, parent: g });
  dave(S, 1510, 760, { s: 0.75, face: "relieved", acc: ["glasses"], parent: g });
  fadeG(S, g, W(78, 4));
  card(S, "RELIEF", 1510, 880, { t: W(78, 6), fill: "green" });
});
// 79 "At the bus stop, his neighbour looks worried. Dave doesn't read his bubble. He asks."
const stop = (S) => { bg(S, "scene-suburb-day"); L.put(S, "ride-bus-stop", 1620, 940, { s: 1.4, time: "day" }); };
shot(79, 0, (S) => {
  stop(S);
  guy(S, NEIGH.style, 1160, 950, Object.assign({}, NEIGH, { s: 1.1, face: "worried", flip: true }));
  think(S, 1160, 950 - HEAD * 1.1, { s: 0.42, kind: "faint", text: "oven?", size: DS.type.title, seed: 791 });
  const g = S.grp(); dave(S, 520, 955, { s: 1.1, face: "smile", acc: ["glasses"], pose: "cyc-walk-1", parent: g });
  shift(g, S.start, 2.0, [0, 0], [180, 0], "power1.out");
});
// 80 (@dave) "Everything okay? You look like you're thinking hard."
shot(80, 0, (S) => {
  stop(S);
  guy(S, NEIGH.style, 1160, 950, Object.assign({}, NEIGH, { s: 1.1, face: "worried", flip: true }));
  daveTalk(S, 700, 955, { face: "smile", acc: ["glasses"], pose: "wave" }, 80);
});
// 81 "His neighbour laughs. He's wondering if he left the oven on."
shot(81, 0, (S) => {
  stop(S);
  const a = guy(S, NEIGH.style, 1160, 950, Object.assign({}, NEIGH, { s: 1.1, face: "worried", flip: true }));
  swap(a, guy(S, NEIGH.style, 1160, 950, Object.assign({}, NEIGH, { s: 1.1, face: "laugh", flip: true, pose: "head" })), W(81, 1));
  dave(S, 700, 955, { s: 1.1, face: "happy", acc: ["glasses"] });
  L.put(S, "bubble-round", 1330, 330, { s: 0.8, text: "Did I leave the oven on?", tail: "left", t: W(81, 4) });
});
// 82 "Dave knows the feeling. He walks home to check his own."  (last image: Dave's own bubble, at last)
shot(82, 0, (S) => {
  bg(S, "scene-suburb-day");
  const g = S.grp(); dave(S, 760, 955, { s: 1.1, face: "worried", acc: ["glasses"], pose: "cyc-walk-2", parent: g });
  think(S, 760, 955 - HEAD * 1.1, { s: 0.6, text: "Did I leave|the oven on?", seed: 7, dx: 80, t: W(82, 2), parent: g });
  shift(g, W(82, 4), 3.4, [0, 0], [320, 0], "power1.inOut");
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
