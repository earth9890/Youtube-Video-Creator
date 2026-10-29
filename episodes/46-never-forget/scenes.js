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
// ===================== chapter 1: The wish (clips 1-9) =====================
// small drawn icons for the wish
const psign = (S, x, y, k, t) => { const g = S.grp(); DS.shape(S, rect(x - 8 * k, y, 16 * k, 150 * k), "gray", { w: "detail", parent: g }); DS.shape(S, rrect(x - 70 * k, y - 140 * k, 140 * k, 140 * k, DS.r.sm), "blue", { w: "mid", parent: g }); S.text("P", x, y - 36 * k, { size: DS.type.display, c: DS.c("white"), t, parent: g }); return fadeG(S, g, t); };
const nametag = (S, x, y, k, t) => { const g = S.grp(); DS.shape(S, rrect(x - 110 * k, y - 70 * k, 220 * k, 140 * k, DS.r.sm), "white", { w: "mid", parent: g }); DS.shape(S, rrect(x - 110 * k, y - 70 * k, 220 * k, 44 * k, DS.r.sm), "red", { w: "mid", parent: g }); S.text("HELLO", x, y - 38 * k, { size: DS.type.caption, c: DS.c("white"), t, parent: g }); S.text("MY NAME IS", x, y + 4 * k, { size: DS.type.caption, c: DS.c("ink"), t, parent: g }); return fadeG(S, g, t); };
// 1 "This is Dave. Dave has forgotten where he parked. It is the fourth time this week,"
shot(1, 0, (S) => {
  bg(S, "scene-city-street-day");
  L.put(S, "ride-parking-lot", 1400, 930, { s: 0.95 });
  dave(S, 640, 945, { s: 1.15, face: "confused", pose: "scratch-head" });
  card(S, "THIS IS DAVE", 960, 130, { t: W(1, 1) });
  L.put(S, "fx-question-marks", 720, 440, { s: 0.7, t: W(1, 5) });
  const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"], hit = [0, 1, 3, 5];
  days.forEach((d, i) => {
    const x = 330 + i * 210;
    panel(S, x, 310, 180, 150, W(1, 9));
    txt(S, d, x, 275, { t: W(1, 9), size: DS.type.caption });
    const k = hit.indexOf(i);
    if (k >= 0) txt(S, "P?", x, 350, { t: W(1, 12) + k * 0.28, size: DS.type.title, c: DS.c("red", 2) });
  });
}, { cam: "push" });
// 1 "and the car is somewhere in a very large field."
shot(1, 16, (S) => {
  bg(S, "ep46-field", { car: true });
  dave(S, 430, 960, { s: 1.0, face: "worried", pose: "look-up" });
}, { cam: "pull" });
// 2 "I wish I never forgot anything. Not a name, not a date, not one single parking space." + 3 "His wish is granted on the spot."
shot(2, 0, (S) => {
  bg(S, "scene-park-night");
  L.put(S, "star-shooting", 1250, 150, { s: 1.0, t: W(2, 2) });
  nametag(S, 400, 330, 1.2, W(2, 8));
  L.put(S, "prop-calendar", 760, 340, { s: 1.7, t: W(2, 11) });
  psign(S, 1100, 250, 1.3, W(2, 15));
  daveTalk(S, 960, 945, { s: 1.15, pose: "pray-hands", face: "smile" }, 2);
  L.put(S, "fx-star-burst", 1620, 430, { s: 1.3, t: W(3, 2) });
  card(S, "GRANTED", 1620, 640, { t: W(3, 3), fill: "green" });
}, { cam: "push" });
// 3 "From now on, Dave will remember every day of his life, in full and for good."
shot(3, 7, (S) => {
  field(S, "wall", 1);
  dave(S, 330, 945, { s: 1.1, pose: "thumbs-up", face: "happy" });
  card(S, "NOW", 640, 300, { fill: "yellow" });
  arrowR(S, 600, 560, 1450, 560, W(3, 7) + 0.2);
  [0, 1, 2, 3, 4].forEach((i) => L.put(S, "p2-tear-calendar", 760 + i * 150, 440, { s: 0.85, day: 3 + i * 5, t: i ? W(3, 13) + i * 0.35 : undefined }));
  shelf(S, 1650, 945, 5, { s: 0.8, rows: 2, wd: 300, t: W(3, 18) });
  card(S, "EVERY DAY. FOR GOOD.", 1130, 150, { t: W(3, 18) });
}, { cam: "none" });
// 4 "It does not help with today's car. The wish only covers what happens from now on."
shot(4, 0, (S) => {
  field(S, "wall", 1);
  S.fill(rect(-40, 180, 880, 800), T0(S), 0, DS.c("gray", 1), 0.45);
  S.fill(rect(840, 180, 1200, 800), T0(S), 0, DS.c("green", 1), 0.5);
  S.draw(`M840 180 V940`, T0(S), 0, { c: DS.c("ink"), w: DS.w.near });
  card(S, "BEFORE THE WISH", 420, 130, { t: W(4, 0) });
  L.put(S, "ride-car-red", 420, 640, { s: 0.7 });
  card(S, "TODAY'S CAR", 420, 330, { fill: "yellow" });
  xMark(S, 420, 520, 2.4, W(4, 6));
  card(S, "FROM NOW ON", 1380, 130, { t: W(4, 11), fill: "green" });
  [0, 1, 2, 3, 4, 5].forEach((i) => binder(S, 1020 + i * 90, 700, "", { c: ["blue", "red", "green", "orange", "purple", "teal"][i], t: W(4, 11) + i * 0.25 }));
  const a = dave(S, 840, 945, { s: 1.1, pose: "shrug", face: "sad" });
  swap(a, dave(S, 840, 945, { s: 1.1, pose: "point", face: "smile" }), W(4, 11));
}, { cam: "none" });
// 5 "So what would happen if you never forgot anything?"
shot(5, 0, (S) => {
  bg(S, "scene-city-street-day");
  dave(S, 960, 960, { s: 1.35, pose: "think", face: "thinking" });
  L.put(S, "fx-question-marks", 1280, 520, { s: 1.1, t: W(5, 1) });
  card(S, "NEVER FORGET ANYTHING", 960, 130, { t: W(5, 3), fill: "yellow" });
}, { cam: "push" });
// 6 "Would you become a genius, or the most tired person alive?"
shot(6, 0, (S) => {
  bg(S, "room-library-light");
  dave(S, 560, 945, { s: 1.15, pose: "arms-out", face: "smug", acc: ["glasses"] });
  L.put(S, "fx-lightbulb", 560, 300, { s: 1.2, t: W(6, 3) });
  card(S, "GENIUS", 560, 150, { t: W(6, 4), fill: "yellow" });
  dave(S, 1360, 945, { s: 1.15, pose: "sad", face: "sleepy", t: W(6, 6) });
  L.put(S, "fx-zzz", 1360, 330, { s: 1.0, t: W(6, 8) });
  card(S, "MOST TIRED", 1360, 150, { t: W(6, 7) });
}, { cam: "push" });
// 7 "Here is the plan. First we meet the people who can really do this. Then we give Dave the full version."
shot(7, 0, (S) => {
  field(S, "sand", 1);
  panel(S, 960, 560, 1500, 700, S.start);
  card(S, "THE PLAN", 960, 190, { t: W(7, 2), fill: "yellow" });
  txt(S, "1  MEET THE REAL PEOPLE", 460, 460, { size: DS.type.body, anchor: "start" });
  doc(S, 330, 560, { s: 0.5 });
  txt(S, "2  GIVE DAVE THE FULL VERSION", 460, 690, { t: W(7, 14), size: DS.type.body, anchor: "start" });
  dave(S, 330, 790, { s: 0.5, face: "smile", t: W(7, 16) });
  tick(S, 1560, 440, 1.0, W(7, 13));
}, { cam: "none" });
// 8 "And by the end, he will be begging his Brain for a delete button."
shot(8, 0, (S) => {
  bg(S, "kit-room-library-day");
  dave(S, 600, 950, { s: 1.15, pose: "kneel", face: "sob" });
  brain(S, 1260, 950, 1.35, "stern", { armR: "point" });
  L.put(S, "ep46-delete-key", 1180, 330, { s: 0.8, t: W(8, 11) });
  card(S, "BEGGING", 600, 150, { t: W(8, 7), fill: "yellow" });
}, { cam: "push" });
// 9 "Quick note, Dave. I've started a shelf. One binder per day."
shot(9, 0, (S) => {
  bg(S, "room-bedroom-light");
  dave(S, 600, 950, { s: 1.15, face: "worried" });
  brainTalk(S, 610, 950 - HEAD * 1.15 + 14, 0.7, "tired", 9, { t: W(9, 0) });
  shelf(S, 1360, 950, 6, { s: 1.0, rows: 2, wd: 300, t: W(9, 5) });
  card(S, "ONE BINDER PER DAY", 1360, 160, { t: W(9, 7), fill: "yellow" });
}, { cam: "none" });
// 9 "I'm going to need a much bigger shelf."
shot(9, 11, (S) => {
  bg(S, "room-bedroom-light");
  dave(S, 520, 950, { s: 1.15, face: "worried" });
  brainTalk(S, 530, 950 - HEAD * 1.15 + 14, 0.7, "worried", 9);
  shelf(S, 1180, 950, 20, { s: 0.9, rows: 4, wd: 380, t: W(9, 15) });
  shelf(S, 1620, 950, 10, { s: 0.9, rows: 4, wd: 380, t: W(9, 17) });
}, { cam: "pull" });
// ===================== chapter 2: The people who remember (clips 10-20) =====================
const LAB = "room-science-lab-light";
const stamp = (S, text, x, y, c, t, o = {}) => L.put(S, "stamp-nope", x, y, Object.assign({ text, c, s: 1.2, rot: -6, t }, o));
// 10 "This is not only a thought experiment. In two thousand six, scientists at the University of California, Irvine published..."
shot(10, 0, (S) => {
  bg(S, "scene-office-district-day");
  chap(S, "THE PEOPLE WHO REMEMBER");
  dave(S, 300, 950, { s: 1.05, face: "thinking", pose: "think" });
  think(S, 300, 950 - HEAD * 1.05, { s: 0.5, t: W(10, 3), pic: "ep46-shelf", picS: 0.34, picY: 80, picO: { n: 8, rows: 2 }, seed: 5, dx: 60 });
  stamp(S, "REAL", 780, 480, "green", W(10, 5));
  card(S, "UC IRVINE \u00B7 2006", 1450, 230, { t: W(10, 8) });
  doc(S, 1040, 950, { s: 1.1, face: "smile", flip: true, t: W(10, 9) });
  doc(S, 1360, 950, { s: 1.1, face: "happy", flip: true, t: W(10, 10) });
  panel(S, 1700, 600, 300, 400, W(10, 18));
  txt(S, "CASE REPORT", 1700, 470, { t: W(10, 18), size: DS.type.caption });
  [0, 1, 2, 3].forEach((i) => S.draw(`M1580 ${540 + i * 50} H${1820 - (i % 2) * 60}`, W(10, 19), 0, { c: DS.c("gray", 1), w: DS.w.near }));
}, { cam: "none" });
// 10 "...the case of a woman they called A J." + 11 "They described her memory as nonstop, uncontrollable and automatic."
shot(10, 19, (S) => {
  bg(S, LAB);
  const a = aj(S, 960, 950, { s: 1.2, face: "smile" });
  swap(a, aj(S, 960, 950, { s: 1.2, face: "worried" }), W(11, 2));
  L.put(S, "fx-glow-ring", 960, 950, { s: 1.0, t: W(10, 22) });
  card(S, "A.J.", 960, 160, { t: W(10, 25), fill: "purple" });
  doc(S, 380, 950, { s: 1.1, face: "smile" });
  const fs = S.grp(); L.put(S, "ep46-filmstrip", 1100, 330, { s: 0.9, frames: 5, parent: fs }); fadeG(S, fs, W(11, 0));
  shift(fs, W(11, 0), END(11) - W(11, 0), [-120, 0], [120, 0], "none");
  card(S, "NONSTOP", 1480, 470, { t: W(11, 5), fill: "yellow" });
  card(S, "UNCONTROLLABLE", 1480, 600, { t: W(11, 6) });
  card(S, "AUTOMATIC", 1480, 730, { t: W(11, 8) });
}, { cam: "none" });
// 12 "Give her any date from her life, and she could tell you the day of the week and what she was doing." + 13 "So the researchers tested her."
shot(12, 0, (S) => {
  bg(S, LAB);
  doc(S, 1500, 950, { s: 1.1, flip: true, face: "smile" });
  const a = aj(S, 620, 950, { s: 1.2, face: "thinking", pose: "think" });
  swap(a, aj(S, 620, 950, { s: 1.2, face: "happy", pose: "point" }), W(12, 8));
  const cal = L.put(S, "prop-calendar", 960, 360, { s: 2.0, t: W(12, 2) }); fadeOut(cal, W(12, 9), 0.4);
  const cd = card(S, "ANY DATE", 960, 160, { t: W(12, 2), fill: "yellow" }); fadeOut(cd.g, W(12, 9), 0.4);
  L.put(S, "bubble-round", 520, 330, { s: 0.7, text: "A THURSDAY", tail: "left", t: W(12, 12) });
  const th = think(S, 620, 950 - HEAD * 1.2, { s: 0.55, t: W(12, 17), pic: "prop-sandwich", picS: 1.2, seed: 8, dx: 330, y: 430 }); fadeOut(th, W(13, 1), 0.4);
  L.put(S, "ep-stopwatch", 1060, 560, { s: 1.1, t: W(13, 2) });
  card(S, "THE EASTER TEST", 960, 160, { t: W(13, 3), fill: "yellow" });
}, { cam: "none" });
// 13 "They asked for the date of Easter in every year from nineteen eighty to two thousand three."
shot(13, 5, (S) => {
  field(S, "wall", 1);
  card(S, "EASTER, EVERY YEAR", 960, 150, { fill: "yellow" });
  S.draw("M300 620 H1620", T0(S), 0, { c: DS.c("ink"), w: DS.w.near });
  for (let i = 0; i < 12; i++) { const x = 330 + i * 114; S.draw(`M${x} 600 V640`, T0(S), 0, { c: DS.c("ink"), w: DS.w.mid }); if (i % 2 == 0 || i > 8) L.put(S, "ep-egg", x, 520, { s: 0.75, c: ["pink", "sky", "yellow", "green"][i % 4], t: i ? W(13, 11) + i * 0.16 : undefined }); }
  card(S, "1980", 330, 730, { t: W(13, 16) });
  card(S, "2003", 1590, 730, { t: W(13, 19) });
  aj(S, 960, 940, { s: 0.7, face: "smile", t: W(13, 13) });
}, { cam: "none" });
// 14 "She got one wrong, by two days,"
const yearGrid = (S, t0) => {
  for (let i = 0; i < 24; i++) {
    const x = 300 + (i % 12) * 120, y = 440 + Math.floor(i / 12) * 150;
    panel(S, x, y, 96, 110, T0(S));
    if (i !== 10) tick(S, x, y, 1.0, T0(S));
  }
};
// 14 "She got one wrong, by two days, and corrected it herself when asked again two years later."
shot(14, 0, (S) => {
  field(S, "wall", 1);
  yearGrid(S, 0);
  const x = 300 + 10 * 120;
  xMark(S, x, 440, 1.1, W(14, 1));
  const c1 = card(S, "1 WRONG: 2 DAYS OFF", 960, 160, { t: W(14, 3), fill: "yellow" }); fadeOut(c1.g, W(14, 11), 0.4);
  const a = aj(S, 960, 940, { s: 0.7, face: "worried" });
  swap(a, aj(S, 960, 940, { s: 0.7, face: "smile", pose: "cheer" }), W(14, 9));
  S.fill(rect(x - 46, 386, 92, 108), W(14, 9), 0.3, DS.c("white"), 1); tick(S, x, 440, 1.1, W(14, 9));
  card(S, "2 YEARS LATER", 960, 160, { t: W(14, 13), fill: "green" });
}, { cam: "none" });
// 15 "They also asked what she had been doing on each of those days."
shot(15, 0, (S) => {
  bg(S, LAB);
  doc(S, 1400, 950, { s: 1.1, flip: true, face: "smile" });
  aj(S, 600, 950, { s: 1.2, face: "thinking", pose: "think" });
  L.put(S, "bubble-round", 1100, 360, { s: 0.75, text: "What were you doing?", tail: "right", t: W(15, 3) });
}, { cam: "push" });
// 15 "One answer, for one whole Sunday, was: house smells like ham."
shot(15, 13, (S) => {
  bg(S, LAB);
  aj(S, 560, 950, { s: 1.2, face: "smile" });
  card(S, "ONE WHOLE SUNDAY", 960, 140, { t: W(15, 15), fill: "yellow" });
  think(S, 560, 950 - HEAD * 1.2, { s: 0.75, t: W(15, 19), text: "HOUSE SMELLS|LIKE HAM", size: DS.type.small, seed: 14, dx: 200, y: 360 });
  L.put(S, "ep46-ham", 1450, 700, { s: 1.5, t: W(15, 22) });
  L.put(S, "fx-steam", 1450, 520, { s: 1.0, t: W(15, 23) });
}, { cam: "none" });
// 16 "In another test, the lead scientist told her a famous date was wrong by one day. She said no."
shot(16, 0, (S) => {
  bg(S, LAB);
  doc(S, 1400, 950, { s: 1.1, flip: true, face: "smile" });
  aj(S, 600, 950, { s: 1.2, face: "flat", pose: "cross" });
  L.put(S, "bubble-round", 1180, 330, { s: 0.75, text: "OFF BY ONE DAY", tail: "right", t: W(16, 8) });
  L.put(S, "bubble-round", 520, 330, { s: 0.7, text: "NO.", tail: "left", t: W(16, 17) });
}, { cam: "none" });
// 16 "He checked a second source, and the book was wrong."
shot(16, 19, (S) => {
  bg(S, LAB);
  doc(S, 660, 950, { s: 1.1, face: "smile", pose: "reach" });
  L.put(S, "prop-book-open", 1130, 700, { s: 2.0, t: W(16, 21) });
  L.put(S, "ep-magnifier", 880, 640, { s: 1.1, t: W(16, 22) });
  card(S, "SECOND SOURCE", 960, 140, { t: W(16, 21), fill: "yellow" });
  stamp(S, "WRONG", 1180, 480, "red", W(16, 27), { s: 0.8 });
  aj(S, 1680, 950, { s: 1.0, face: "smug", flip: true, pose: "hips" });
}, { cam: "none" });
// 17 "The scientists named it hyperthymesia,"
const word = (S, t) => { panel(S, 960, 480, 1360, 220, T0(S)); return txt(S, "HYPERTHYMESIA", 960, 520, { t, size: DS.type.display }); };
// 17 "The scientists named it hyperthymesia, a name the lead researcher later called a mistake,"
shot(17, 0, (S) => {
  bg(S, LAB);
  word(S, W(17, 4));
  const d1 = doc(S, 380, 950, { s: 1.1, face: "smile", pose: "point" }); swap(d1, doc(S, 380, 950, { s: 1.1, face: "sad", pose: "facepalm" }), W(17, 11));
  aj(S, 1540, 950, { s: 1.1, face: "flat", flip: true });
  S.draw("M300 520 L1620 440", W(17, 12), 0.5, { c: DS.c("red"), w: DS.w.near });
  stamp(S, "MISTAKE", 1500, 780, "red", W(17, 12));
}, { cam: "push" });
// 17 "because it sounds as if you know what it is."
shot(17, 14, (S) => {
  bg(S, LAB);
  word(S, T0(S));
  L.put(S, "fx-question-marks", 960, 270, { s: 1.0, t: W(17, 16) });
  card(S, "SOUNDS LIKE AN EXPLANATION", 960, 750, { t: W(17, 19), fill: "yellow" });
  doc(S, 380, 950, { s: 1.1, face: "confused", pose: "shrug" });
}, { cam: "none" });
// 18 "It isn't even new. In eighteen seventy-one, a journal described a blind man in Ohio"
shot(18, 0, (S) => {
  field(S, "sand", 1);
  panel(S, 560, 540, 600, 700, T0(S));
  txt(S, "A JOURNAL", 560, 330, { t: W(18, 4) });
  card(S, "1871", 560, 460, { fill: "yellow" });
  [0, 1, 2, 3, 4].forEach((i) => S.draw(`M320 ${540 + i * 50} H${800 - (i % 2) * 90}`, T0(S), 0, { c: DS.c("gray", 1), w: DS.w.near }));
  guy(S, "man04", 1360, 940, { s: 1.15, acc: ["sunglasses", "cap"], face: "smile", t: W(18, 10) });
  S.draw("M1450 690 L1570 940", W(18, 11), 0.3, { c: DS.c("ink"), w: DS.w.near }); S.draw("M1450 690 L1570 940", W(18, 11), 0.3, { c: DS.c("white"), w: DS.w.mid });
  card(S, "OHIO \u00B7 1871", 1360, 190, { t: W(18, 14), fill: "yellow" });
}, { cam: "push" });
// 18 "who recalled the weather for any date back to eighteen twenty-seven."
shot(18, 15, (S) => {
  field(S, "sky", 1);
  card(S, "1871", 1500, 780, { t: W(18, 5) });
  card(S, "1827", 420, 780, { t: W(18, 24) });
  arrowR(S, 1400, 650, 520, 650, W(18, 22));
  [["weather-cloud-sun", 1300], ["cloud-rain", 1080], ["sun-rays", 860], ["weather-cloud-sun", 640]].forEach(([n, x], i) => L.put(S, n, x, 420, { s: 1.0, t: i ? W(18, 17) + i * 0.5 : undefined }));
  card(S, "THE WEATHER, ANY DATE", 960, 140, { fill: "yellow" });
}, { cam: "none" });
// 19 "After a television programme about people with this memory aired,"
shot(19, 0, (S) => {
  bg(S, "room-living-room-light");
  L.put(S, "prop-tv", 960, 560, { s: 2.6 });
  card(S, "ON TELEVISION", 960, 150, { t: W(19, 2), fill: "yellow" });
  aj(S, 960, 600, { s: 0.55, face: "smile", t: W(19, 4) });
  L.put(S, "furn-sofa", 960, 960, { s: 1.5 });
}, { cam: "push" });
// 19 "more than six hundred emails arrived from viewers who thought they had it."
shot(19, 10, (S) => {
  bg(S, "scene-suburb-day");
  [["girl02", 300], ["man05", 620], ["man03", 1300], ["girl06", 1620]].forEach(([st, x], i) => {
    guy(S, st, x, 940, { s: 0.95, face: "thinking", t: W(19, 16) + i * 0.2 });
    think(S, x, 940 - HEAD * 0.95, { s: 0.38, t: W(19, 18) + i * 0.3, text: "ME?", size: DS.type.small, seed: 20 + i });
  });
  L.put(S, "ep46-envelope-pile", 960, 950, { s: 1.5, n: 30, t: W(19, 11) });
  panel(S, 960, 280, 540, 200, W(19, 11));
  countUp(S, 960, 330, 0, 600, W(19, 11), 2.2, { fmt: (n) => Math.round(n) + "+", size: DS.type.display, anchor: "middle", c: DS.c("red", 2), t0: W(19, 11) });
  card(S, "EMAILS", 960, 120, { t: W(19, 14), fill: "yellow" });
}, { cam: "none" });
// 20 "By twenty eleven, the researchers had confirmed twenty-two."
shot(20, 0, (S) => {
  field(S, "wall", 1);
  card(S, "BY 2011", 960, 130, { t: W(20, 1), fill: "yellow" });
  L.put(S, "ep46-envelope-pile", 480, 900, { s: 1.2, n: 18 });
  txt(S, "600+ EMAILS", 480, 640, { size: DS.type.body });
  for (let i = 0; i < 22; i++) { const g = mini(S, 1000 + (i % 8) * 90, 480 + Math.floor(i / 8) * 150, 1.15, { t: W(20, 5) + i * 0.1 }); }
  countUp(S, 1360, 300, 0, 22, W(20, 5), 2.2, { size: DS.type.display, c: DS.c("red", 2) });
  txt(S, "CONFIRMED", 1360, 380, { t: W(20, 6), size: DS.type.small });
}, { cam: "none" });
// ===================== chapter 3: Not everything (clips 21-27) =====================
const NUMS = ["7 3 9 1 4", "2 8 6 0 5", "9 4 1 7 3", "5 0 8 2 6", "1 6 3 9 7", "4 2 7 5 8"];
const numbers = (S, cx, cy, t, o = {}) => { panel(S, cx, cy, 560, 520, t); NUMS.forEach((ln, i) => txt(S, ln, cx, cy - 170 + i * 68, { t, size: o.size || DS.type.small, c: DS.c("ink", 1) })); };
// 21 "Now the catch. The gift stops at their own lives."
shot(21, 0, (S) => {
  field(S, "wall", 1);
  chap(S, "NOT EVERYTHING");
  S.fill(circ(620, 580, 400), T0(S), 0, DS.c("yellow", 1), 0.45);
  S.draw(circ(620, 580, 400), T0(S), 0, { c: DS.c("ink"), w: DS.w.near });
  shelf(S, 450, 800, 10, { s: 0.75, rows: 2, wd: 300 });
  aj(S, 720, 800, { s: 0.9, face: "smile" });
  card(S, "HER OWN LIFE", 620, 250, { fill: "purple" });
  txt(S, "everything else?", 1460, 560, { t: W(21, 6), size: DS.type.body, c: DS.c("gray", 2) });
}, { cam: "none" });
// 21 "Shown a table of random numbers and told to memorise it,"
shot(21, 10, (S) => {
  bg(S, LAB);
  numbers(S, 1200, 520, W(21, 12));
  card(S, "RANDOM NUMBERS", 1200, 180, { t: W(21, 13), fill: "yellow" });
  aj(S, 560, 950, { s: 1.2, face: "worried" });
  doc(S, 220, 950, { s: 1.0, face: "smile" });
}, { cam: "none" });
// 21 "the woman laughed and said it was impossible."
shot(21, 22, (S) => {
  bg(S, LAB);
  numbers(S, 1500, 520, T0(S), { size: DS.type.caption });
  aj(S, 700, 950, { s: 1.3, face: "cryLaugh", pose: "armsUp" });
  L.put(S, "bubble-round", 1000, 330, { s: 0.8, text: "IMPOSSIBLE!", tail: "left", t: W(21, 26) });
}, { cam: "push" });
// 22 "After hours with two interviewers, she couldn't say what either of them had been wearing."
shot(22, 0, (S) => {
  bg(S, "room-office-light");
  guy(S, "man09", 480, 950, { s: 1.1, face: "smile", pose: "hold" });
  guy(S, "girl06", 1440, 950, { s: 1.1, face: "smile", pose: "hold", flip: true });
  const a = aj(S, 960, 950, { s: 1.2, face: "smile" }); swap(a, aj(S, 960, 950, { s: 1.2, face: "confused", pose: "think" }), W(22, 6));
  L.put(S, "p2-clock-3", 960, 330, { s: 1.3, t: W(22, 1) });
  const h = card(S, "HOURS TOGETHER", 960, 140, { t: W(22, 1) }); fadeOut(h.g, W(22, 6), 0.4);
  think(S, 960, 950 - HEAD * 1.2, { s: 0.55, t: W(22, 8), text: "?", size: DS.type.display, seed: 6, dx: 0 });
  card(S, "WEARING?", 960, 140, { t: W(22, 11), fill: "yellow" });
}, { cam: "none" });
// 23 "And on most standard laboratory memory tests, the group scored about the same as everyone else."
shot(23, 0, (S) => {
  bg(S, LAB);
  [[400, "THE GROUP", "purple", AJ.style, 1], [1520, "EVERYONE ELSE", "gray", "man03", -1]].forEach(([x, lab, fill, st, d]) => {
    guy(S, st, x, 950, { s: 1.15, face: "thinking", pose: "hold", flip: d < 0 });
    panel(S, x + d * 120, 640, 150, 200, W(23, 3));
    [0, 1, 2, 3].forEach((k) => S.draw(`M${x + d * 120 - 50} ${580 + k * 40} H${x + d * 120 + 50}`, W(23, 3), 0, { c: DS.c("gray", 1), w: DS.w.near }));
    card(S, lab, x, 190, { t: W(23, 4), fill });
  });
  panel(S, 960, 560, 560, 640, W(23, 8));
  S.draw("M720 800 H1200", W(23, 8), 0, { c: DS.c("ink"), w: DS.w.near });
  vbar(S, 760, 800, 150, 440, 0.62, "purple", W(23, 9)); vbar(S, 1010, 800, 150, 440, 0.6, "gray", W(23, 9));
  card(S, "ABOUT THE SAME", 960, 190, { t: W(23, 10), fill: "yellow" });
}, { cam: "none" });
// 24 "School, she says, was torture, because she couldn't hold on to facts and figures."
shot(24, 0, (S) => {
  bg(S, "scene-school-yard-day");
  aj(S, 700, 950, { s: 1.25, pose: "sad", face: "sob" });
  L.put(S, "prop-book-closed", 960, 800, { s: 1.6, t: W(24, 8) });
  card(S, "SCHOOL: TORTURE", 960, 140, { t: W(24, 3), fill: "red" });
  ["7 x 8", "1066", "H2O"].forEach((s, i) => { const t = txt(S, s, 1250 + i * 170, 520 - i * 70, { t: W(24, 9) + i * 0.3, size: DS.type.body, c: DS.c("gray", 2) }); shift(t, W(24, 9) + i * 0.3 + 0.4, 2.4, [0, 0], [120, -140], "power1.in"); fadeOut(t, W(24, 12) + i * 0.3, 1.5); });
}, { cam: "none" });
// 24 "But ask about television from the nineteen sixties and seventies, and she is unbeatable."
shot(24, 14, (S) => {
  bg(S, "room-living-room-light");
  L.put(S, "prop-tv", 1300, 600, { s: 2.3, t: W(24, 17) });
  const c1 = card(S, "TV: 1960s AND 1970s", 1300, 180, { t: W(24, 19), fill: "yellow" }); fadeOut(c1.g, W(24, 25), 0.4);
  const a = aj(S, 560, 950, { s: 1.2, face: "delighted" }); swap(a, aj(S, 560, 950, { s: 1.25, face: "proud", pose: "cheer" }), W(24, 25));
  L.put(S, "sport-trophy", 900, 780, { s: 1.5, t: W(24, 26) });
  card(S, "UNBEATABLE", 960, 180, { t: W(24, 26), fill: "yellow" });
}, { cam: "push" });
// 25 "What mattered to her stuck. She knew the date of a famous crisis because she was a self-described news junkie"
shot(25, 0, (S) => {
  bg(S, "scene-suburb-day");
  const a = aj(S, 640, 950, { s: 1.3, face: "love" }); swap(a, aj(S, 640, 950, { s: 1.3, face: "thinking", pose: "hold" }), W(25, 10));
  const h = L.put(S, "fx-hearts", 640, 400, { s: 1.0, t: W(25, 1) }); fadeOut(h, W(25, 9), 0.4);
  const n = panel(S, 1300, 560, 460, 360, W(25, 3), "yellow"); const t1 = txt(S, "WHAT", 1300, 520, { t: W(25, 3), size: DS.type.title }); const t2 = txt(S, "MATTERED", 1300, 610, { t: W(25, 3), size: DS.type.title });
  const st = card(S, "STUCK", 1300, 800, { t: W(25, 4), fill: "green" });
  [n, t1, t2, st.g].forEach((e) => fadeOut(e, W(25, 10), 0.4));
  L.put(S, "ep-newspaper", 1320, 600, { s: 1.4, t: W(25, 11) });
  card(S, "BREAKING NEWS", 1320, 120, { t: W(25, 11), fill: "red" });
  L.put(S, "ep-mug-coffee", 880, 800, { s: 1.0, t: W(25, 14) });
  card(S, "NEWS JUNKIE", 640, 190, { t: W(25, 17), fill: "purple" });
}, { cam: "none" });
// 25 "and had made it part of her day."
shot(25, 20, (S) => {
  field(S, "wall", 1);
  card(S, "PART OF HER DAY", 960, 130, { t: W(25, 22), fill: "yellow" });
  panel(S, 960, 520, 1500, 260, T0(S));
  S.fill(rect(210, 400, 1500, 240), T0(S), 0, DS.c("gray", 1), 0.4);
  S.fill(rect(1050, 400, 190, 240), W(25, 22), 0.4, DS.c("red", 1), 0.9);
  txt(S, "HER DAY", 560, 540, { t: W(25, 22), size: DS.type.title });
  card(S, "NEWS", 1145, 760, { t: W(25, 23), fill: "red" });
}, { cam: "none" });
// 26 "Dave is unimpressed."
shot(26, 0, (S) => {
  bg(S, "room-living-room-light");
  dave(S, 760, 950, { s: 1.25, face: "flat", pose: "cross" });
  card(S, "UNIMPRESSED", 760, 160, { t: W(26, 2) });
  shelf(S, 1380, 950, 3, { s: 0.75, rows: 2, wd: 300, t: W(26, 6) });
  card(S, "A START", 1380, 380, { t: W(26, 10), fill: "yellow" });
}, { cam: "push" });
// 26 "But he wants the full version."
shot(26, 12, (S) => {
  bg(S, "room-living-room-light");
  dave(S, 600, 950, { s: 1.2, face: "determined", pose: "point" });
  shelf(S, 1280, 950, 6, { s: 0.9, rows: 3, wd: 380, t: W(26, 6) });
  card(S, "THE FULL VERSION", 1280, 160, { t: W(26, 15), fill: "yellow" });
  txt(S, "?", 1500, 520, { t: W(26, 16), size: DS.type.display, c: DS.c("red", 2) });
}, { cam: "none" });
// 27 "Then give me everything. Names, numbers, faces, facts. All of it, all the time."
shot(27, 0, (S) => {
  bg(S, "room-living-room-light");
  daveTalk(S, 960, 950, { s: 1.3, face: "determined", pose: "arms-out" }, 27);
  const c1 = card(S, "EVERYTHING", 960, 130, { t: W(27, 3), fill: "yellow" }); fadeOut(c1.g, W(27, 8), 0.3);
  nametag(S, 360, 430, 1.1, W(27, 4));
  numbers(S, 1580, 470, W(27, 5), { size: DS.type.caption });
  const f = S.grp(); DS.shape(S, circ(560, 300, 70), "white", { flat: true, w: "mid", parent: f }); S.draw("M535 285 v10 M585 285 v10 M530 325 Q560 350 590 325", W(27, 6), 0, { c: DS.c("ink"), w: DS.w.mid, parent: f }); fadeG(S, f, W(27, 6));
  L.put(S, "prop-book-closed", 1300, 260, { s: 1.8, t: W(27, 7) });
  card(S, "ALL OF IT, ALL THE TIME", 960, 130, { t: W(27, 8), fill: "yellow" });
}, { cam: "push" });// ===================== chapter 4: Everything (clips 28-39) =====================
const OFFICE = "room-office-light";
// 28 "Something like that has happened once. In the nineteen twenties, the Russian psychologist Alexander Luria met a newspaper reporter who appears in his book only as S."
shot(28, 0, (S) => {
  bg(S, OFFICE);
  chap(S, "EVERYTHING");
  card(S, "HAPPENED ONCE", 1300, 110, { t: W(28, 4), fill: "yellow" });
  card(S, "1920s \u00B7 RUSSIA", 960, 250, { t: W(28, 7) });
  luria(S, 440, 950, { s: 1.15, t: W(28, 12) });
  card(S, "LURIA", 440, 330, { t: W(28, 13), fill: "blue" });
  ss(S, 1500, 950, { s: 1.15, face: "smile", flip: true, t: W(28, 16) });
  L.put(S, "ep-newspaper", 1330, 720, { s: 0.8, t: W(28, 17) });
  L.put(S, "prop-book-closed", 960, 640, { s: 2.4, t: W(28, 20) });
  txt(S, "S.", 960, 700, { t: W(28, 25), size: DS.type.display });
  card(S, "ONLY AS S.", 960, 400, { t: W(28, 24), fill: "orange" });
}, { cam: "none" });
// 29 "S. had been scolded for not taking notes at a meeting,"
shot(29, 0, (S) => {
  bg(S, OFFICE);
  L.put(S, "furn-desk", 960, 960, { s: 1.5 });
  ss(S, 480, 950, { s: 1.15, face: "worried" });
  guy(S, "man09", 1400, 950, { s: 1.15, face: "angry", flip: true, pose: "point" });
  L.put(S, "bubble-round", 1330, 300, { s: 0.7, text: "WHERE ARE YOUR NOTES?", tail: "right", t: W(29, 4) });
  card(S, "SCOLDED", 480, 170, { t: W(29, 3), fill: "red" });
}, { cam: "push" });
// 29 "so he recited the whole speech word for word."
shot(29, 11, (S) => {
  bg(S, OFFICE);
  L.put(S, "furn-desk", 960, 960, { s: 1.5 });
  ss(S, 520, 950, { s: 1.15, face: "smug", pose: "armsUp" });
  guy(S, "man09", 1400, 950, { s: 1.15, face: "wow", flip: true });
  L.put(S, "bubble-round", 620, 290, { s: 0.85, text: "WORD FOR WORD", tail: "left", t: W(29, 17) });
  [0, 1, 2, 3].forEach((i) => S.draw(`M900 ${300 + i * 46} H${1260 - (i % 2) * 90}`, W(29, 13) + i * 0.25, 0, { c: DS.c("gray", 1), w: DS.w.near }));
}, { cam: "none" });
// 30 "Luria read S. lists of thirty, fifty, even seventy numbers."
shot(30, 0, (S) => {
  bg(S, OFFICE);
  luria(S, 380, 950, { s: 1.15 });
  [["30", 5, 240], ["50", 6, 360], ["70", 8, 480]].forEach(([n, w, h], i) => {
    const x = 800 + i * 330; panel(S, x, 760 - h / 2, 220, h, W(30, w));
    for (let k = 0; k < h / 50 - 1; k++) S.draw(`M${x - 70} ${760 - h + 50 + k * 46} H${x + 70}`, W(30, w), 0, { c: DS.c("gray", 1), w: DS.w.near });
    card(S, n, x, 760 - h - 56, { t: W(30, w), fill: "yellow" });
  });
}, { cam: "none" });
// 30 "S. closed his eyes, and repeated every one."
shot(30, 10, (S) => {
  bg(S, OFFICE);
  ss(S, 600, 950, { s: 1.3, face: "sleep" });
  L.put(S, "bubble-round", 1180, 340, { s: 0.95, text: "7 3 9 1 4 2 8 6 0 5 ...", tail: "left", t: W(30, 15) });
  luria(S, 1560, 950, { s: 1.15, flip: true });
}, { cam: "push" });
// 31 "Twelve and sixteen years later, he could still recite the same lists."
shot(31, 0, (S) => {
  field(S, "wall", 1);
  ss(S, 500, 940, { s: 1.15, face: "smile" });
  L.put(S, "bubble-round", 1100, 350, { s: 0.85, text: "7 3 9 1 4 2 8 6 0 5 ...", tail: "left", t: W(31, 6) });
  S.draw("M300 700 H1640", T0(S), 0, { c: DS.c("ink"), w: DS.w.near });
  card(S, "12 YEARS LATER", 640, 780, { t: W(31, 0) });
  card(S, "16 YEARS LATER", 1200, 780, { t: W(31, 2) });
  card(S, "SAME LISTS", 960, 150, { t: W(31, 9), fill: "yellow" });
}, { cam: "none" });
// 32 "But a perfect memory is a terrible way to read a story."
shot(32, 0, (S) => {
  bg(S, "room-library-light");
  ss(S, 760, 950, { s: 1.2, face: "worried" });
  L.put(S, "prop-book-open", 1140, 780, { s: 2.0, t: W(32, 9) });
  card(S, "READING A STORY", 960, 140, { t: W(32, 9), fill: "yellow" });
}, { cam: "push" });
// 32 "Every word raised a picture, and every picture raised more pictures."
shot(32, 12, (S) => {
  field(S, "wall", 1);
  card(S, "ONE WORD", 960, 760, { fill: "yellow" });
  ss(S, 240, 940, { s: 1.0, face: "worried" });
  const t1 = [["prop-sandwich", 560], ["animal-cow", 960], ["weather-cloud-sun", 1360]], t2 = ["prop-calendar", "sign-star", "prop-tv", "cloud-rain", "prop-milk-carton", "animal-dog"];
  t1.forEach(([n, x], i) => { arrowR(S, 960, 690, x, 520, i ? W(32, 14) + i * 0.3 : T0(S)); think(S, x, 600, { s: 0.38, y: 480, t: i ? W(32, 14) + i * 0.3 : undefined, pic: n, picS: 0.8, noTail: true, seed: 30 + i }); });
  t2.forEach((n, i) => { const x = 340 + i * 250; think(S, x, 300, { s: 0.32, y: 230, t: W(32, 20) + i * 0.2, pic: n, picS: 0.7, noTail: true, seed: 40 + i }); });
}, { cam: "none" });
// 33 "Luria wrote that grasping even a simple passage became an endless uphill task."
shot(33, 0, (S) => {
  field(S, "sky", 1);
  DS.shape(S, "M-40 900 L1960 300 V1120 H-40 Z", "grass", { w: "mid" });
  L.put(S, "prop-book-closed", 1020, 440, { s: 3.4 });
  ss(S, 760, 700, { s: 1.0, face: "determined", pose: "push" });
  card(S, "AN ENDLESS UPHILL TASK", 960, 130, { fill: "yellow" });
}, { cam: "none" });
// 34 "Dave tries it on a note stuck to his fridge. It says: buy milk."
shot(34, 0, (S) => {
  bg(S, "kit-room-kitchen-day");
  panel(S, 420, 520, 260, 140, W(34, 6), "yellow"); txt(S, "BUY MILK", 420, 535, { t: W(34, 12), size: DS.type.caption });
  dave(S, 880, 950, { s: 1.2, face: "thinking", pose: "pointL" });
}, { cam: "push" });
// 35 "Buy milk. I remember the first milk. I remember every milk."
shot(35, 0, (S) => {
  bg(S, "kit-room-kitchen-day");
  daveTalk(S, 760, 950, { s: 1.25, face: "worried", pose: "scratch-head" }, 35);
  think(S, 760, 950 - HEAD * 1.25, { s: 0.45, t: W(35, 5), pic: "prop-milk-carton", picS: 1.2, seed: 3, dx: -260 });
  think(S, 760, 950 - HEAD * 1.25, { s: 0.45, t: W(35, 8), pic: "prop-milk-carton", picS: 1.2, seed: 4, dx: 240 });
  for (let i = 0; i < 9; i++) L.put(S, "prop-milk-carton", 1120 + (i % 3) * 120, 560 + Math.floor(i / 3) * 130, { s: 0.7, t: W(35, 9) + i * 0.15 });
  card(S, "EVERY MILK", 1240, 160, { t: W(35, 9), fill: "yellow" });
}, { cam: "none" });
// 35 "Brain, why am I crying at a cow?"
shot(35, 11, (S) => {
  bg(S, "scene-farm-day");
  daveTalk(S, 620, 950, { s: 1.25, face: "sob", pose: "stand" }, 35);
  L.put(S, "animal-cow", 1380, 940, { s: 1.6, t: W(35, 15) });
  brain(S, 620 + 14, 950 - HEAD * 1.25 + 14, 0.7, "worried", { t: W(35, 11) });
}, { cam: "push" });
// 36 "S. struggled with faces, too."
const faceHead = (S, x, y, r, shade, t, o = {}) => {
  const g = S.grp(o.parent); DS.shape(S, circ(x, y, r), "white", { flat: true, w: "near", parent: g });
  if (shade) S.fill(`M${x} ${y - r} A${r} ${r} 0 0 ${shade > 0 ? 1 : 0} ${x} ${y + r} Z`, T0(S), 0, DS.c("gray", 1), Math.abs(shade), g);
  S.draw(`M${x - r * 0.4} ${y - r * 0.15} v${r * 0.12} M${x + r * 0.4} ${y - r * 0.15} v${r * 0.12} M${x - r * 0.32} ${y + r * 0.35} Q${x} ${y + r * 0.55} ${x + r * 0.32} ${y + r * 0.35}`, T0(S), 0, { c: DS.c("ink"), w: DS.w.near, parent: g });
  return fadeG(S, g, t);
};
// 36 "S. struggled with faces, too. To him, a face was a pattern of light and shade that kept changing,"
shot(36, 0, (S) => {
  field(S, "wall", 1);
  ss(S, 240, 940, { s: 1.0, face: "confused" });
  card(S, "FACES", 240, 330, { fill: "yellow" });
  [[760, 0], [1080, 0.45], [1400, -0.7]].forEach(([x, sh], i) => { faceHead(S, x, 500, 130, sh, i ? W(36, 9) + i * 0.9 : T0(S)); });
  arrowR(S, 900, 500, 940, 500, W(36, 11)); arrowR(S, 1220, 500, 1260, 500, W(36, 13));
  card(S, "LIGHT AND SHADE", 1080, 190, { t: W(36, 12), fill: "yellow" });
  card(S, "KEPT CHANGING", 1080, 800, { t: W(36, 17) });
}, { cam: "none" });
// 36 "so someone he knew could look brand new."
shot(36, 19, (S) => {
  bg(S, "scene-city-street-day");
  ss(S, 640, 950, { s: 1.2, face: "smile", pose: "wave" });
  guy(S, "man03", 1280, 950, { s: 1.2, face: "worried", flip: true });
  L.put(S, "bubble-round", 640, 330, { s: 0.75, text: "Nice to meet you!", tail: "left", t: W(36, 24) });
  card(S, "BRAND NEW", 1280, 190, { t: W(36, 25), fill: "yellow" });
}, { cam: "none" });
// 37 "Luria summed it up like this. Many of us look for ways to improve our memories,"
shot(37, 0, (S) => {
  bg(S, "scene-park-day");
  luria(S, 220, 940, { s: 1.0 });
  card(S, "LURIA SUMS IT UP", 420, 130, { t: W(37, 1), fill: "blue" });
  [["girl02", 620, "prop-book-open"], ["man05", 960, "mind-brain-lit-memory"], ["girl08", 1300, "p2-clipboard"], ["man03", 1640, "prop-calendar"]].forEach(([st, x, pic], i) => {
    guy(S, st, x, 940, { s: 0.95, face: "determined", t: W(37, 7) + i * 0.35 });
    think(S, x, 940 - HEAD * 0.95, { s: 0.38, t: W(37, 9) + i * 0.35, pic, picS: 0.85, seed: 50 + i });
  });
  card(S, "IMPROVE MY MEMORY", 1300, 130, { t: W(37, 10), fill: "yellow" });
}, { cam: "none" });
// 38 "but none of us has to learn how to forget."
shot(38, 0, (S) => {
  bg(S, "scene-park-day");
  [["girl02", 360], ["man05", 800], ["girl08", 1240], ["man03", 1620]].forEach(([st, x], i) => guy(S, st, x, 940, { s: 0.95, face: "smile" }));
  binder(S, 960, 560, "HOW TO|FORGET", { view: "front", c: "blue", bw: 230, bh: 300, s: 1.15, t: W(38, 6) });
  xMark(S, 960, 410, 3.2, W(38, 7));
  card(S, "NOBODY NEEDS THIS", 960, 130, { t: W(38, 6), fill: "yellow" });
}, { cam: "none" });
// 38 "S. had the reverse problem."
shot(38, 10, (S) => {
  bg(S, "room-library-light");
  ss(S, 760, 950, { s: 1.2, face: "worried", pose: "facepalm" });
  L.put(S, "ep46-shelf", 1400, 950, { s: 1.0, n: 20, rows: 4, wd: 380, t: W(38, 11) });
  card(S, "THE REVERSE PROBLEM", 960, 130, { t: W(38, 12), fill: "orange" });
}, { cam: "push" });
// 39 "He reportedly wrote numbers on paper and burned them, hoping the fire would take the numbers with it. It did not."
shot(39, 0, (S) => {
  bg(S, OFFICE);
  const a = ss(S, 560, 950, { s: 1.2, face: "determined", pose: "hold" });
  const b = ss(S, 560, 950, { s: 1.2, face: "smile", pose: "hold" }); swap(a, b, W(39, 6));
  swap(b, ss(S, 560, 950, { s: 1.2, face: "flat", pose: "shrug" }), W(39, 17));
  card(S, "REPORTEDLY", 960, 130, { t: W(39, 1), fill: "yellow" });
  panel(S, 1060, 640, 340, 280, W(39, 3));
  NUMS.slice(0, 4).forEach((ln, i) => txt(S, ln, 1060, 570 + i * 52, { t: W(39, 4) + i * 0.25, size: DS.type.caption }));
  DS.shape(S, rrect(1500, 700, 240, 260, DS.r.sm), "gray", { w: "mid" });
  const f = L.put(S, "fx-fire", 1620, 650, { s: 1.0, t: W(39, 8) }); fadeOut(f, W(39, 16), 0.8);
  const n = txt(S, "7 3 9 1 4", 1620, 520, { t: W(39, 11), size: DS.type.small, c: DS.c("gray", 2) }); shift(n, W(39, 11), 3.0, [0, 0], [0, -130], "power1.out"); fadeOut(n, W(39, 14), 1.8);
  think(S, 560, 950 - HEAD * 1.2, { s: 0.7, t: W(39, 19), text: "7 3 9 1 4|2 8 6 0 5", size: DS.type.small, seed: 17, dx: 200 });
}, { cam: "none" });
// ===================== chapter 5: The shelf that won't close (clips 40-49) =====================
const ROOM_LIV = "room-living-room-light";
// 40 "Back in Dave's head, the shelf is now a wall."
shot(40, 0, (S) => {
  bg(S, "ep46-binder-wall");
  chap(S, "THE SHELF THAT WON'T CLOSE");
  brain(S, 960, 940, 1.5, "tired", { t: W(40, 4) });
  card(S, "INSIDE DAVE'S HEAD", 1420, 110, { t: W(40, 2) });
  card(S, "NOW A WALL", 1420, 230, { t: W(40, 8), fill: "yellow" });
}, { cam: "push" });
// 40 "Every smell, song and date pulls a binder off it,"
shot(40, 10, (S) => {
  bg(S, "ep46-binder-wall");
  [["food-toast", 500, "TOAST", "SMELL", 12], ["fx-music-notes", 960, "THAT SONG", "SONG", 13], ["prop-calendar", 1420, "4 OCT", "DATE", 14]].forEach(([n, x, lab, tag, w], i) => {
    panel(S, x, 330, 300, 250, W(40, 11) + i * 0.6);
    L.put(S, n, x, 330, { s: 1.0, t: W(40, 11) + i * 0.6 });
    arrowR(S, x, 480, x, 590, W(40, 15) + i * 0.4);
    binder(S, x, 930, lab, { view: "front", c: ["orange", "purple", "red"][i], bw: 200, bh: 270, s: 1.1, t: W(40, 15) + i * 0.4 });
  });
}, { cam: "none" });
// 40 "and the binder will not close itself."
shot(40, 20, (S) => {
  bg(S, "ep46-binder-wall");
  brain(S, 520, 940, 1.5, "worried", { armR: "push" });
  L.put(S, "ep46-binder-open", 1120, 940, { s: 2.3, c: "red", t: W(40, 22) });
  card(S, "WON'T CLOSE", 1120, 130, { t: W(40, 24), fill: "red" });
}, { cam: "pull" });
// 41 "Dave, you smelled toast. I am now in the toast binders."
shot(41, 0, (S) => {
  bg(S, "ep46-warehouse");
  brainTalk(S, 960, 940, 1.5, "tired", 41, {});
  L.put(S, "food-toast", 1420, 560, { s: 2.6, t: W(41, 2) });
  card(S, "THE TOAST BINDERS", 960, 130, { t: W(41, 8), fill: "yellow" });
}, { cam: "push" });
// 41 "There are four thousand toast binders."
shot(41, 11, (S) => {
  bg(S, "ep46-warehouse");
  brainTalk(S, 960, 940, 1.3, "worried", 41, {});
  panel(S, 960, 250, 760, 230, W(41, 12));
  countUp(S, 960, 285, 0, 4000, W(41, 13), 2.4, { size: DS.type.display, c: DS.c("red", 2), anchor: "middle", t0: W(41, 12) });
  txt(S, "TOAST BINDERS", 960, 350, { t: W(41, 15), size: DS.type.caption });
}, { cam: "pull" });
// 42 "The woman from Irvine described it as a split screen."
const splitScreen = (S, t) => { panel(S, 960, 520, 1600, 780, T0(S)); S.draw("M960 130 V910", t, 0.5, { c: DS.c("ink"), w: DS.w.near }); };
shot(42, 0, (S) => {
  field(S, "wall", 1);
  splitScreen(S, W(42, 7));
  aj(S, 960, 880, { s: 1.0, face: "worried", t: W(42, 0) });
  card(S, "A SPLIT SCREEN", 960, 130, { fill: "yellow" });
}, { cam: "none" });
// 42 "On one side, the present. On the other, a reel of memories that never stops playing."
shot(42, 10, (S) => {
  field(S, "wall", 1);
  splitScreen(S, T0(S));
  aj(S, 560, 880, { s: 0.95, face: "smile", t: W(42, 12) });
  card(S, "THE PRESENT", 560, 190, { t: W(42, 14) });
  const fs = S.grp(); L.put(S, "ep46-filmstrip", 1360, 520, { s: 1.15, frames: 3, parent: fs }); fadeG(S, fs, W(42, 18));
  shift(fs, W(42, 18), 6.0, [60, 0], [-60, 0], "none");
  card(S, "A REEL THAT NEVER STOPS", 1360, 190, { t: W(42, 19), fill: "yellow" });
}, { cam: "none" });
// 43 "In an email to the researchers, she called it nonstop, uncontrollable and totally exhausting."
shot(43, 0, (S) => {
  bg(S, "room-home-office-light");
  L.put(S, "type-laptop", 480, 950, { s: 1.4, t: W(43, 0) });
  card(S, "AN EMAIL TO THE RESEARCHERS", 960, 140, { t: W(43, 2), fill: "yellow" });
  panel(S, 1300, 580, 1100, 520, W(43, 8));
  txt(S, "NONSTOP.", 1300, 440, { t: W(43, 9), size: DS.type.title });
  txt(S, "UNCONTROLLABLE.", 1300, 560, { t: W(43, 10), size: DS.type.title });
  txt(S, "TOTALLY EXHAUSTING.", 1300, 680, { t: W(43, 12), size: DS.type.title, c: DS.c("red", 2) });
}, { cam: "none" });
// 44 "To be fair, all of the people in the first group study said they enjoyed replaying their memories."
shot(44, 0, (S) => {
  bg(S, ROOM_LIV);
  const c1 = card(S, "TO BE FAIR", 960, 120, { t: W(44, 0), fill: "yellow" }); fadeOut(c1.g, W(44, 12), 0.3);
  [["girl05", 360], ["man06", 700], ["girl02", 1040], ["man03", 1380], ["girl08", 1700]].forEach(([st, x], i) => {
    const a = guy(S, st, x, 950, { s: 1.0, face: "happy", t: W(44, 3) + i * 0.3 });
    swap(a, guy(S, st, x, 950, { s: 1.0, face: "love", pose: "thumbs-up" }), W(44, 13));
    const th = think(S, x, 950 - HEAD, { s: 0.34, t: W(44, 8) + i * 0.3, pic: "ep46-filmstrip", picS: 0.5, picO: { frames: 2, seed: i }, seed: 60 + i }); fadeOut(th, W(44, 13), 0.3);
    L.put(S, "fx-hearts", x, 440, { s: 0.6, t: W(44, 14) + i * 0.25 });
  });
  card(S, "ALL OF THEM ENJOYED IT", 960, 130, { t: W(44, 14), fill: "green" });
}, { cam: "none" });
// 45 "One compares every fourth of October she can remember while drying her hair,"
shot(45, 0, (S) => {
  bg(S, "room-bathroom-light");
  aj(S, 280, 950, { s: 1.3, face: "smile", pose: "hold" });
  L.put(S, "ep46-hair-dryer", 280 - 120, 950 - HEAD * 1.3 + 40, { s: 0.7, c: "pink", t: W(45, 9) });
  [0, 1, 2].forEach((i) => think(S, 1180 + i * 250, 300 + (i % 2) * 130, { s: 0.3, y: 330 + (i % 2) * 140, t: W(45, 3) + i * 0.6, pic: "p2-tear-calendar", picO: { day: 4 }, picS: 0.9, noTail: true, seed: 70 + i }));
  card(S, "EVERY 4 OCTOBER", 1360, 130, { t: W(45, 3), fill: "yellow" });
}, { cam: "none" });
// 45 "then tells an imaginary person: now you do it."
shot(45, 13, (S) => {
  bg(S, "room-bathroom-light");
  aj(S, 560, 950, { s: 1.3, face: "mischief", pose: "point" });
  const gh = guy(S, "man03", 1380, 950, { s: 1.3, face: "smile", flip: true }); gh.setAttribute("opacity", 0.3);
  L.put(S, "bubble-round", 640, 300, { s: 0.85, text: "NOW YOU DO IT!", tail: "left", t: W(45, 18) });
  card(S, "AN IMAGINARY PERSON", 1380, 150, { t: W(45, 15), fill: "yellow" });
}, { cam: "none" });
// 46 "Most filed their memories by date, like a calendar."
shot(46, 0, (S) => {
  bg(S, "room-library-light");
  L.put(S, "prop-calendar", 560, 560, { s: 2.6, t: W(46, 3) });
  arrowR(S, 800, 600, 1000, 600, W(46, 5));
  shelf(S, 1400, 950, 18, { s: 1.0, rows: 3, wd: 380, t: W(46, 6) });
  card(S, "FILED BY DATE", 960, 120, { t: W(46, 4), fill: "yellow" });
}, { cam: "none" });
// 46 "Ordinary memory is bad at telling two weeks ago from two months ago."
shot(46, 9, (S) => {
  field(S, "wall", 1);
  guy(S, "man05", 960, 940, { s: 1.2, face: "confused", pose: "scratch-head" });
  card(S, "2 WEEKS AGO", 480, 400, { fill: "white" });
  card(S, "2 MONTHS AGO", 1440, 400, { t: W(46, 19) });
  txt(S, "=", 960, 300, { t: W(46, 19), size: DS.type.display });
  L.put(S, "fx-question-marks", 1100, 420, { s: 0.9, t: W(46, 20) });
  card(S, "ORDINARY MEMORY", 960, 130, { t: W(46, 9) });
}, { cam: "none" });
// 47 chart helpers
const YB = 840, HM = 520, XW = [[560, "purple"], [800, "gray"]], XM = [[1200, "purple"], [1440, "gray"]];
const legend = (S) => { card(S, "SUPERIOR MEMORY", 620, 150, { t: T0(S), fill: "purple", size: DS.type.caption }); card(S, "ORDINARY", 1100, 150, { t: T0(S), size: DS.type.caption }); };
const axis = (S) => S.draw(`M440 ${YB} H1560`, T0(S), 0, { c: DS.c("ink"), w: DS.w.near });
// 47 "In two thousand sixteen, the Irvine team compared recall after a week, and after a month."
shot(47, 0, (S) => {
  field(S, "wall", 1);
  study(S, "IRVINE · 2016", T0(S));
  aj(S, 600, 900, { s: 0.85, face: "smile" });
  guy(S, "man03", 1100, 900, { s: 0.85, face: "smile" });
  card(S, "AFTER A WEEK", 640, 330, { fill: "yellow" });
  card(S, "AFTER A MONTH", 1280, 330, { t: W(47, 14), fill: "yellow" });
  arrowR(S, 860, 330, 1020, 330, W(47, 13));
}, { cam: "none" });
// 47 "At one week, both groups remembered the same amount."
shot(47, 16, (S) => {
  field(S, "wall", 1);
  legend(S); axis(S);
  XW.forEach(([x, c]) => vbar(S, x - 70, YB, 140, HM, 0.72, c, W(47, 19)));
  txt(S, "1 WEEK", 680, 900, { t: W(47, 17), size: DS.type.small });
  card(S, "THE SAME", 680, 280, { t: W(47, 22), fill: "yellow" });
}, { cam: "none" });
// 48 "At one month, ordinary memory had dropped dramatically, and the superior memories were still going strong."
shot(48, 0, (S) => {
  field(S, "wall", 1);
  legend(S); axis(S);
  XW.forEach(([x, c]) => { const g = S.grp(); DS.shape(S, rrect(x - 70, YB - HM * 0.72, 140, HM * 0.72, DS.r.sm), c, { w: "detail", parent: g }); fadeG(S, g, T0(S)); });
  txt(S, "1 WEEK", 680, 900, { t: T0(S), size: DS.type.small });
  txt(S, "1 MONTH", 1320, 900, { t: W(48, 2), size: DS.type.small });
  XM.forEach(([x, c], i) => { const g = S.grp(); DS.shape(S, rrect(x - 70, YB - HM * 0.72, 140, HM * 0.72, DS.r.sm), c, { w: "detail", parent: g }); fadeG(S, g, W(48, 2) + i * 0.3); if (i === 1) scaleY(g, W(48, 5), x, YB, 1.4, 1, 0.3); });
  card(S, "DROPPED DRAMATICALLY", 1440, 560, { t: W(48, 6), fill: "red", size: DS.type.caption });
  card(S, "STILL GOING STRONG", 1180, 340, { t: W(48, 12), fill: "green", size: DS.type.caption });
}, { cam: "none" });
// 49 "That drop isn't a bug. It is your brain letting a month go."
shot(49, 0, (S) => {
  bg(S, "scene-park-day");
  L.put(S, "dev-bug", 520, 800, { s: 1.4, t: W(49, 2) });
  xMark(S, 520, 640, 3.0, W(49, 3));
  card(S, "NOT A BUG", 520, 140, { t: W(49, 3), fill: "yellow" });
  brain(S, 1280, 940, 1.6, "smile", { armL: "up", t: W(49, 7) });
  const cal = S.grp(); L.put(S, "info-calendar-month", 1560, 470, { s: 0.85, parent: cal }); fadeG(S, cal, W(49, 9));
  shift(cal, W(49, 10), 2.4, [0, 0], [200, -240], "power1.in"); fadeOut(cal, W(49, 11), 1.5);
  card(S, "LETTING A MONTH GO", 1280, 130, { t: W(49, 9), fill: "yellow" });
}, { cam: "pull" });
// ===================== chapter 6: The twist (clips 50-61) =====================
let PARKN = 0;
const PARK = (S, x, y, k) => { // a whole park, shrunk into a picture and clipped to its 1920x1080 frame (the scene draws past it)
  const g = L.put(S, "scene-park-day", x, y, { s: k }), id = "clip-park-" + ++PARKN, cp = el("clipPath", { id }, S.g);
  el("rect", { x: 0, y: 0, width: 1920, height: 1080 }, cp); g.setAttribute("clip-path", `url(#${id})`); return g;
};
// 50 "Dave has one last hope. Surely, if he remembers everything, at least he remembers it correctly." + 51 "This is where it goes wrong."
shot(50, 0, (S) => {
  bg(S, "scene-park-day");
  const a = dave(S, 640, 950, { s: 1.3, face: "starry", pose: "pray-hands" }); swap(a, dave(S, 640, 950, { s: 1.3, face: "worried", pose: "stand" }), W(51, 2));
  const c1 = card(S, "ONE LAST HOPE", 960, 140, { t: W(50, 2), fill: "yellow" }); fadeOut(c1.g, W(50, 7), 0.3);
  think(S, 640, 950 - HEAD * 1.3, { s: 0.8, t: W(50, 8), pic: "ep46-binder", picO: { view: "front", label: "EVERYTHING", c: "green", bw: 190, bh: 230 }, picS: 0.9, picY: 100, seed: 11, dx: 380 });
  tick(S, 1180, 330, 2.0, W(50, 14));
  const c2 = card(S, "CORRECTLY?", 1280, 130, { t: W(50, 13), fill: "yellow" }); fadeOut(c2.g, W(51, 1), 0.3);
  S.draw("M1120 190 L1170 290 L1120 350 L1180 450 L1150 520", W(51, 3), 0.6, { c: DS.c("red"), w: DS.w.near });
  card(S, "WHERE IT GOES WRONG", 1280, 130, { t: W(51, 2), fill: "red" });
}, { cam: "push" });
// 51 "In twenty thirteen, researchers at Irvine tested twenty people with superior memories, and thirty-eight with ordinary ones."
shot(51, 6, (S) => {
  field(S, "wall", 1);
  study(S, "IRVINE \u00B7 2013", T0(S));
  doc(S, 150, 940, { s: 0.9, face: "smile" });
  doc(S, 1770, 940, { s: 0.9, face: "smile", flip: true });
  card(S, "SUPERIOR MEMORIES", 640, 230, { t: W(51, 13), fill: "purple", size: DS.type.caption });
  card(S, "ORDINARY", 1300, 230, { t: W(51, 19), size: DS.type.caption });
  [...Array(20)].forEach((_, i) => mini(S, 340 + (i % 10) * 62, 440 + Math.floor(i / 10) * 140, 1.0, { t: i > 4 ? W(51, 13) + i * 0.06 : undefined, fill: DS.c("purple", 1), c: DS.c("purple", 2) }));
  [...Array(38)].forEach((_, i) => mini(S, 1000 + (i % 10) * 62, 440 + Math.floor(i / 10) * 140, 1.0, { t: W(51, 19) + i * 0.06 }));
  countUp(S, 640, 900, 0, 20, W(51, 13), 1.2, { size: DS.type.display, c: DS.c("purple", 2), anchor: "middle" });
  countUp(S, 1300, 900, 0, 38, W(51, 19), 1.6, { size: DS.type.display, c: DS.c("ink", 1), anchor: "middle" });
}, { cam: "none" });
// 52 "First, a list of words."
const wordPanel = (S, x, title, words, t, hot = -1) => {
  panel(S, x, 530, 560, 640, t);
  card(S, title, x, 270, { t, size: DS.type.caption, fill: "yellow" });
  words.forEach((w, i) => txt(S, w, x, 390 + i * 80, { t: t + 0.2 + i * 0.25, size: DS.type.body, c: i === hot ? DS.c("red", 2) : DS.c("ink") }));
};
// 52 "First, a list of words. Then new words, some related to the list but never on it."
shot(52, 0, (S) => {
  bg(S, LAB);
  wordPanel(S, 560, "THE LIST", ["BED", "REST", "DREAM", "NAP", "SNORE", "PILLOW"], W(52, 2));
  wordPanel(S, 1360, "NEW WORDS", ["BED", "TABLE", "SLEEP", "NAP", "RIVER"], W(52, 6), 2);
  card(S, "RELATED, NEVER ON IT", 1360, 900, { t: W(52, 13), fill: "red", size: DS.type.caption });
}, { cam: "none" });
// 52 "The question was simple: which of these did you see?"
shot(52, 17, (S) => {
  bg(S, LAB);
  wordPanel(S, 1360, "NEW WORDS", ["BED", "TABLE", "SLEEP", "NAP", "RIVER"], T0(S), 2);
  doc(S, 560, 950, { s: 1.2, face: "smile", pose: "point" });
  L.put(S, "bubble-round", 640, 300, { s: 0.85, text: "WHICH DID YOU SEE?", tail: "left", t: W(52, 21) });
}, { cam: "none" });
// 53 "Both groups said yes to about seven in ten of the words that were never there."
shot(53, 0, (S) => {
  field(S, "wall", 1);
  card(S, "WORDS THAT WERE NEVER THERE", 960, 140, { t: W(53, 9), size: DS.type.caption });
  [["SUPERIOR MEMORY", "purple", 400], ["ORDINARY", "gray", 660]].forEach(([lab, c, y], r) => {
    card(S, lab, 330, y, { t: W(53, 0), size: DS.type.caption, fill: r ? undefined : "purple" });
    [...Array(10)].forEach((_, i) => { DS.shape(S, circ(700 + i * 108, y, 40), i < 7 ? "red" : "white", { flat: true, w: "mid" }); });
  });
  [0, 1].forEach((r) => [...Array(7)].forEach((_, i) => tick(S, 700 + i * 108, 400 + r * 260, 0.9, W(53, 4) + i * 0.15 + r * 0.05, "white")));
  card(S, "SAID YES: ABOUT 7 IN 10", 960, 860, { t: W(53, 5), fill: "yellow" });
}, { cam: "none" });
// 54 "The superior memories did remember more of the real words, seventy-seven percent against sixty-five."
shot(54, 0, (S) => {
  field(S, "wall", 1);
  legend(S); axis(S);
  card(S, "THE REAL WORDS", 960, 260, { t: W(54, 7), fill: "yellow", size: DS.type.caption });
  vbar(S, 690, YB, 150, HM, 0.77, "purple", W(54, 10)); vbar(S, 1080, YB, 150, HM, 0.65, "gray", W(54, 12));
  txt(S, "77%", 765, YB - HM * 0.77 - 30, { t: W(54, 10) + 0.5, size: DS.type.title, c: DS.c("purple", 2) });
  txt(S, "65%", 1155, YB - HM * 0.65 - 30, { t: W(54, 12) + 0.5, size: DS.type.title });
}, { cam: "none" });
// 54 "But they were fooled just as often."
shot(54, 14, (S) => {
  field(S, "wall", 1);
  legend(S); axis(S);
  card(S, "THE WORDS THAT WERE NEVER THERE", 960, 260, { t: T0(S), fill: "red", size: DS.type.caption });
  vbar(S, 690, YB, 150, HM, 0.7, "purple", W(54, 15)); vbar(S, 1080, YB, 150, HM, 0.7, "gray", W(54, 15));
  txt(S, "7 IN 10", 765, YB - HM * 0.7 - 30, { t: W(54, 17), size: DS.type.small, c: DS.c("purple", 2) });
  txt(S, "7 IN 10", 1155, YB - HM * 0.7 - 30, { t: W(54, 17), size: DS.type.small });
  card(S, "FOOLED JUST AS OFTEN", 960, 960, { t: W(54, 19), fill: "yellow", size: DS.type.caption });
}, { cam: "none" });
// 55 "So the people who never forget still remember things that never happened."
shot(55, 0, (S) => {
  bg(S, "scene-park-day");
  guy(S, "man06", 640, 950, { s: 1.3, face: "smug", pose: "hips" });
  think(S, 640, 950 - HEAD * 1.3, { s: 0.8, t: W(55, 7), kind: "faint", pic: "ep46-binder", picO: { view: "front", label: "NEVER|HAPPENED", c: "purple", bw: 190, bh: 230 }, picS: 0.9, picY: 100, seed: 13, dx: 380 });
  card(S, "STILL REMEMBER", 1280, 130, { t: W(55, 5), fill: "yellow" });
}, { cam: "push" });
// 56 "In a second test, they took in false details from a slideshow even more than the others did."
const slide = (S, x, y, t, extra) => {
  panel(S, x, y, 640, 440, t);
  PARK(S, x - 270, y - 170, 0.28);
  if (extra) { L.put(S, "animal-dog", x + 100, y + 170, { s: 0.5, t: extra }); S.draw(circ(x + 100, y + 115, 70), extra, 0.4, { c: DS.c("red"), w: DS.w.near }); L.put(S, "prop-umbrella-ducks", x - 150, y + 20, { s: 0.55, t: extra + 0.3 }); S.draw(circ(x - 150, y + 40, 85), extra + 0.3, 0.4, { c: DS.c("red"), w: DS.w.near }); }
};
shot(56, 0, (S) => {
  field(S, "wall", 1);
  card(S, "THE SLIDESHOW", 960, 140, { fill: "yellow" });
  slide(S, 960, 560, W(56, 4));
  guy(S, "man06", 260, 940, { s: 0.9, face: "smile" });
}, { cam: "push" });
shot(56, 10, (S) => {
  field(S, "wall", 1);
  slide(S, 520, 540, T0(S));
  slide(S, 1400, 540, W(56, 10), W(56, 12));
  card(S, "THE SLIDES", 520, 190, { t: T0(S), size: DS.type.caption });
  card(S, "WHAT THEY REMEMBERED", 1400, 190, { t: W(56, 10), size: DS.type.caption, fill: "purple" });
  card(S, "EVEN MORE FALSE DETAILS", 960, 900, { t: W(56, 14), size: DS.type.caption, fill: "red" });
}, { cam: "none" });
// 57 "Remembering is not playing back a recording. Each time, your brain rebuilds the scene from pieces, using what you know now."
shot(57, 0, (S) => {
  field(S, "wall", 1);
  panel(S, 440, 520, 440, 340, T0(S), "gray");
  S.fill("M370 400 L370 640 L560 520 Z", T0(S), 0.3, DS.c("white"), 1);
  xMark(S, 440, 520, 3.0, W(57, 5));
  card(S, "NOT A RECORDING", 440, 250, { fill: "yellow" });
  brain(S, 760, 940, 1.5, "smile", { armL: "up", t: W(57, 8) });
  PIECES.forEach(([c, i, j], k) => { const g = S.grp(); DS.shape(S, rrect(1000 + i * 190, 360 + j * 170, 180, 160, DS.r.sm), c, { w: "mid", parent: g }); fadeG(S, g, W(57, 9) + k * 0.1); shift(g, W(57, 11) + k * 0.2, 0.9, [(k % 2 ? 90 : -110), (k < 3 ? -120 : 130)], [0, 0], "power2.out"); });
  const now = S.grp(); DS.shape(S, rrect(1380, 360, 180, 160, DS.r.sm), "yellow", { w: "mid", parent: now }); S.text("NOW", 1470, 460, { size: DS.type.body, t: W(57, 19), parent: now }); fadeG(S, now, W(57, 19));
  card(S, "REBUILT FROM PIECES", 1380, 190, { t: W(57, 11), fill: "yellow" });
}, { cam: "none" });
// 57 "Each time, your brain rebuilds the scene from pieces, using what you know now."
const PIECES = [["sky", 0, 0], ["sky", 1, 0], ["sky", 2, 0], ["grass", 0, 1], ["grass", 1, 1], ["grass", 2, 1]];
// 58 "As one researcher on the study put it, we pull together everything in the present"
shot(58, 0, (S) => {
  bg(S, LAB);
  doc(S, 380, 950, { s: 1.2, face: "smile" });
  panel(S, 1150, 480, 1120, 440, W(58, 6));
  txt(S, "“WE PULL TOGETHER", 1150, 390, { t: W(58, 8), size: DS.type.title });
  txt(S, "EVERYTHING IN", 1150, 490, { t: W(58, 10), size: DS.type.title });
  txt(S, "THE PRESENT”", 1150, 590, { t: W(58, 12), size: DS.type.title, c: DS.c("red", 2) });
}, { cam: "none" });
// 58 "to come up with an approximation of the past."
shot(58, 16, (S) => {
  field(S, "wall", 1);
  panel(S, 560, 530, 640, 440, T0(S)); PARK(S, 290, 360, 0.28);
  panel(S, 1360, 530, 640, 440, W(58, 18)); const ap = S.grp(); PARK(S, 1090, 360, 0.28); 
  card(S, "THE PAST", 560, 190, { t: T0(S), size: DS.type.caption });
  card(S, "AN APPROXIMATION", 1360, 190, { t: W(58, 20), size: DS.type.caption, fill: "yellow" });
  S.fill(rect(1050, 330, 620, 400), W(58, 19), 0.5, DS.c("white"), 0.55);
  txt(S, "≈", 960, 560, { t: W(58, 19), size: DS.type.display });
}, { cam: "none" });
// 59 "So I remember everything, and some of it is wrong?"
shot(59, 0, (S) => {
  bg(S, "scene-park-day");
  daveTalk(S, 700, 950, { s: 1.3, face: "confused", pose: "scratch-head" }, 59);
  think(S, 700, 950 - HEAD * 1.3, { s: 0.8, t: W(59, 4), pic: "ep46-binder", picO: { view: "front", label: "SOME OF IT|IS WRONG?", c: "red", bw: 190, bh: 230 }, picS: 0.9, picY: 100, seed: 15, dx: 330 });
}, { cam: "push" });
// 60 "Yes, Dave. But with total confidence."
shot(60, 0, (S) => {
  bg(S, "scene-park-day");
  dave(S, 520, 950, { s: 1.25, face: "flat", pose: "cross" });
  binder(S, 1320, 900, "NEVER|HAPPENED", { view: "front", c: "purple", bw: 260, bh: 330, s: 1.6, t: W(60, 0) });
  stamp(S, "100% SURE", 1320, 780, "green", W(60, 4), { s: 0.85 });
  card(S, "TOTAL CONFIDENCE", 1000, 140, { t: W(60, 3), fill: "yellow" });
}, { cam: "none" });
// 61 "Dave, I am now certain of fifty things that never happened."
shot(61, 0, (S) => {
  bg(S, "room-library-light");
  brainTalk(S, 620, 940, 1.5, "smile", 61, {});
  panel(S, 1330, 470, 640, 400, W(61, 4));
  countUp(S, 1330, 520, 0, 50, W(61, 6), 1.6, { size: DS.type.display, c: DS.c("red", 2), anchor: "middle", t0: W(61, 4) });
  txt(S, "THINGS THAT", 1330, 590, { t: W(61, 8), size: DS.type.caption }); txt(S, "NEVER HAPPENED", 1330, 645, { t: W(61, 8), size: DS.type.caption });
}, { cam: "push" });
// 61 "I have binders for all of them."
shot(61, 11, (S) => {
  bg(S, "room-library-light");
  brainTalk(S, 520, 940, 1.5, "smile", 61, { armR: "point" });
  shelf(S, 1300, 950, 20, { s: 1.0, rows: 4, wd: 380, t: W(61, 13) });
  card(S, "BINDERS FOR ALL OF THEM", 1300, 130, { t: W(61, 13), fill: "yellow" });
}, { cam: "pull" });
// ===================== chapter 7: What forgetting is for (clips 62-68) =====================
const prof = (S, st, x, gy, o = {}) => { // a generic scientist: glasses + clipboard
  const s = o.s || 1.05, fl = o.flip ? -1 : 1;
  guy(S, st, x, gy, Object.assign({ s, acc: ["glasses"], pose: "hold", face: "smile" }, o));
  L.put(S, "p2-clipboard", x + fl * 78 * s, gy - 200 * s, { s: 0.62 * s, flip: o.flip, t: o.t });
};
// 62 "So what is memory for? In two thousand seventeen, the neuroscientists Blake Richards and Paul Frankland, at the University of Toronto, argued"
shot(62, 0, (S) => {
  bg(S, "scene-office-district-day");
  chap(S, "WHAT FORGETTING IS FOR");
  card(S, "WHAT IS MEMORY FOR?", 960, 270, { t: W(62, 3), fill: "yellow", size: DS.type.title });
  card(S, "TORONTO \u00B7 2017", 1450, 110, { t: W(62, 6) });
  prof(S, "man02", 600, 950, { s: 1.15, t: W(62, 11) });
  card(S, "RICHARDS", 600, 440, { t: W(62, 12), size: DS.type.caption, fill: "blue" });
  prof(S, "man08", 1320, 950, { s: 1.15, flip: true, t: W(62, 14) });
  card(S, "FRANKLAND", 1320, 440, { t: W(62, 15), size: DS.type.caption, fill: "blue" });
}, { cam: "none" });
// 62 "argued it is not storage."
shot(62, 21, (S) => {
  bg(S, "ep46-warehouse");
  xMark(S, 960, 520, 6.0, W(62, 24));
  card(S, "NOT STORAGE", 960, 140, { t: W(62, 24), fill: "yellow" });
  prof(S, "man02", 380, 950, { s: 1.0, face: "smile" });
}, { cam: "pull" });
// 63 "Richards said the real goal of memory is to optimize decision-making."
shot(63, 0, (S) => {
  bg(S, "scene-park-day");
  dave(S, 960, 950, { s: 1.25, face: "thinking", pose: "think" });
  arrowR(S, 800, 620, 560, 520, W(63, 8)); arrowR(S, 1120, 620, 1360, 520, W(63, 8) + 0.3);
  card(S, "THE REAL GOAL: DECISIONS", 960, 140, { t: W(63, 6), fill: "yellow" });
}, { cam: "push" });
// 63 "If your brain keeps surfacing old, conflicting memories, it gets harder to choose well."
shot(63, 11, (S) => {
  bg(S, "scene-park-day");
  dave(S, 960, 950, { s: 1.25, face: "dizzy", pose: "scratch-head" });
  [["GO LEFT!", 380, 360], ["GO RIGHT!", 1540, 360], ["THE OTHER WAY!", 960, 190]].forEach(([tx, x, y], i) => L.put(S, "bubble-round", x, y, { s: 0.6, text: tx, tail: i === 2 ? "left" : (i ? "left" : "right"), t: W(63, 15) + i * 0.5 }));
  card(S, "HARDER TO CHOOSE", 1480, 640, { t: W(63, 19), fill: "red" });
}, { cam: "none" });
// 64 "That is why it matters that the brain forgets irrelevant details."
shot(64, 0, (S) => {
  bg(S, "room-library-light");
  brain(S, 600, 940, 1.6, "smile", { armL: "up" });
  L.put(S, "p2-paper-bin", 1400, 880, { s: 2.2 });
  ["A RECEIPT", "A BUS NUMBER", "A RANDOM SONG"].forEach((tx, i) => { const g = panel(S, 960 + i * 60, 400 + i * 110, 330, 90, W(64, 8) + i * 0.4); S.text(tx, 960 + i * 60, 425 + i * 110, { size: DS.type.caption, t: W(64, 8) + i * 0.4, parent: g }); shift(g, W(64, 9) + i * 0.5 + 0.6, 1.2, [0, 0], [500 - i * 60, 380 - i * 110], "power2.in"); fadeOut(g, W(64, 9) + i * 0.5 + 1.7, 0.3); });
  card(S, "IRRELEVANT DETAILS", 960, 140, { t: W(64, 9), fill: "yellow" });
}, { cam: "none" });
// 64 "Old information becomes outdated, and keeping it around has a cost."
shot(64, 11, (S) => {
  field(S, "wall", 1);
  panel(S, 960, 540, 760, 520, T0(S), "yellow");
  txt(S, "OLD NEWS", 960, 440, { t: W(64, 11), size: DS.type.title });
  [0, 1, 2].forEach((i) => S.draw(`M700 ${520 + i * 50} H${1220 - i * 60}`, W(64, 11), 0, { c: DS.c("gray", 2), w: DS.w.near }));
  stamp(S, "OUTDATED", 1160, 700, "red", W(64, 14), { s: 1.3 });
  card(S, "KEEPING IT COSTS", 960, 140, { t: W(64, 17), fill: "yellow" });
}, { cam: "none" });
// 65 "Yesterday's parking space is the clearest case. By tomorrow, it is the most useless fact you own."
shot(65, 0, (S) => {
  bg(S, "scene-city-street-day");
  const car = L.put(S, "ride-car-parked", 960, 900, { s: 1.4, t: W(65, 1) }); fadeOut(car, W(65, 8), 0.8);
  psign(S, 1480, 560, 1.4, W(65, 2));
  const c1 = card(S, "YESTERDAY'S SPACE", 960, 140, { t: W(65, 0), fill: "yellow" }); fadeOut(c1.g, W(65, 8), 0.3);
  S.draw("M600 900 H1320", W(65, 8), 0.3, { c: DS.c("white"), w: DS.w.near });
  card(S, "TOMORROW", 960, 140, { t: W(65, 8) });
  dave(S, 460, 950, { s: 1.1, face: "smug", pose: "hips", t: W(65, 9) });
  stamp(S, "USELESS", 960, 560, "red", W(65, 12), { s: 0.9 });
}, { cam: "push" });
// 66 "Frankland's lab found that the growth of new neurons in the hippocampus seems to promote forgetting."
shot(66, 0, (S) => {
  field(S, "wall", 1);
  card(S, "FRANKLAND'S LAB", 960, 130, { fill: "blue" });
  L.put(S, "ep-brain-hippocampus", 760, 560, { s: 1.9, hippo: true });
  card(S, "THE HIPPOCAMPUS", 480, 900, { t: W(66, 11), size: DS.type.caption, fill: "yellow" });
  [[1260, 300, 7], [1480, 520, 8], [1250, 740, 9]].forEach(([x, y, w], i) => L.put(S, "ep-neuron-lit", x, y, { s: 0.8, lit: true, name: "green", t: W(66, w) + i * 0.1 }));
  card(S, "NEW NEURONS", 1500, 190, { t: W(66, 7), fill: "green" });
  arrowR(S, 1180, 840, 1100, 880, W(66, 13));
  card(S, "FORGETTING", 960, 900, { t: W(66, 15), fill: "yellow" });
}, { cam: "push" });
// 67 "Your brain grows new cells, in part, to let go. Here, growth means demolition."
shot(67, 0, (S) => {
  bg(S, "room-library-light");
  L.put(S, "kit-neuron-face", 560, 700, { s: 1.8, eyes: true, name: "green", t: W(67, 3) });
  shelf(S, 1340, 950, 12, { s: 1.0, rows: 2, wd: 380 });
  [0, 1, 2].forEach((i) => binder(S, 940 + i * 80, 940, "", { c: ["red", "blue", "orange"][i], rot: [70, 85, 75][i], t: W(67, 8) + i * 0.3 }));
  const c1 = card(S, "NEW CELLS, TO LET GO", 960, 140, { t: W(67, 6), fill: "yellow" }); fadeOut(c1.g, W(67, 10), 0.3);
  const ball = S.grp(); S.draw("M960 -40 V380", W(67, 10), 0.01, { c: DS.c("ink"), w: DS.w.near, parent: ball }); DS.shape(S, circ(960, 430, 70), "gray", { w: "near", parent: ball }); fadeG(S, ball, W(67, 10), 0.3);
  tl.fromTo(ball, { attr: { transform: "rotate(-32 960 -40)" } }, { attr: { transform: "rotate(14 960 -40)" }, duration: 2.4, ease: "power2.inOut", immediateRender: false }, W(67, 10));
  card(S, "GROWTH = DEMOLITION", 960, 140, { t: W(67, 11), fill: "yellow" });
}, { cam: "none" });
// 68 "The delete button Dave begged for was already installed."
shot(68, 0, (S) => {
  bg(S, "room-library-light");
  L.put(S, "ep46-delete-key", 960, 430, { s: 1.4 });
  card(S, "ALREADY INSTALLED", 960, 170, { t: W(68, 6), fill: "green" });
  dave(S, 400, 950, { s: 1.2, face: "wow", pose: "shocked" });
  brain(S, 1520, 950, 1.5, "smile", { armL: "up" });
}, { cam: "push" });
// 68 "It has been running his whole life."
shot(68, 9, (S) => {
  field(S, "wall", 1);
  S.draw("M240 760 H1700", T0(S), 0, { c: DS.c("ink"), w: DS.w.near });
  [["kid", 360, 0.6], ["kid", 760, 0.8], ["regular", 1160, 1.0], ["elderly", 1560, 1.0]].forEach(([b, x, k], i) => {
    guy(S, "man02", x, 760, { s: k * 0.9, body: i === 0 ? "baby" : b, face: "smile", t: i > 1 ? W(68, 11) + i * 0.4 : undefined });
    L.put(S, "ep46-delete-key", x, 300, { s: 0.45, t: i > 1 ? W(68, 11) + i * 0.4 : undefined });
  });
  card(S, "RUNNING HIS WHOLE LIFE", 960, 140, { fill: "yellow" });
}, { cam: "none" });
// ===================== chapter 8: The empty slot (clips 69-71) =====================
// 69 "Dave takes it back. All of it. The Brain wheels the shelf out of his head, binder by binder,"
shot(69, 0, (S) => {
  bg(S, "room-bedroom-light");
  chap(S, "THE EMPTY SLOT");
  dave(S, 400, 950, { s: 1.3, face: "smile", pose: "arms-out" });
  const g = S.grp(); shelf(S, 1000, 950, 26, { s: 1.0, rows: 3, wd: 380, wheels: true, parent: g }); brain(S, 1300, 950, 1.4, "tired", { flip: true, parent: g });
  shift(g, W(69, 9), 5.0, [0, 0], [900, 0], "power1.inOut");
  card(S, "DAVE TAKES IT BACK", 1300, 110, { t: W(69, 1), fill: "yellow" });
  card(S, "OUT OF HIS HEAD", 1300, 230, { t: W(69, 11), fill: "yellow" });
}, { cam: "push" });
// 69 "and leaves one slot empty."
shot(69, 19, (S) => {
  bg(S, "kit-room-library-day");
  dave(S, 560, 950, { s: 1.3, face: "smile" });
  shelf(S, 1300, 950, 0, { s: 1.5, rows: 1, wd: 140 });
  L.put(S, "fx-glow-ring", 1300, 850, { s: 1.1, t: W(69, 21) });
  card(S, "ONE SLOT, EMPTY", 960, 140, { t: W(69, 21), fill: "yellow" });
}, { cam: "pull" });
// 70 "Thank you. Most of my job is throwing things away."
shot(70, 0, (S) => {
  bg(S, "room-library-light");
  dave(S, 600, 950, { s: 1.25, face: "love", pose: "bow" });
  brainTalk(S, 1300, 950, 1.6, "smile", 70, {});
  L.put(S, "fx-hearts", 600, 400, { s: 0.9, t: W(70, 0) });
  card(S, "THANK YOU", 960, 140, { t: W(70, 0), fill: "green" });
}, { cam: "push" });
// 70 "Nobody ever says thank you."
shot(70, 10, (S) => {
  bg(S, "room-library-light");
  brainTalk(S, 960, 950, 2.0, "smile", 70, {});
  L.put(S, "fx-sparkle", 1260, 480, { s: 0.9, t: W(70, 12) });
  L.put(S, "fx-sparkle", 660, 520, { s: 0.7, t: W(70, 13) });
}, { cam: "push" });
// 71 "Somewhere in a very large field, a car is waiting."
shot(71, 0, (S) => {
  bg(S, "ep46-field", { car: true, time: "dusk", carS: 0.2 });
}, { cam: "zoom", focus: "1190 570" });
// 71 "Dave has no idea where. He's fine."
shot(71, 10, (S) => {
  bg(S, "ep46-field", { car: true, time: "dusk", carS: 0.2 });
  const g = S.grp(); dave(S, 520, 990, { s: 1.0, face: "happy", pose: "cyc-walk-2", parent: g });
  shift(g, W(71, 10), 6.0, [0, 0], [560, -30], "power1.inOut");
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
