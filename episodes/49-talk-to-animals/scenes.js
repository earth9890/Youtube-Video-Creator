// look: still
// @library auto
// What If You Could Talk to Animals? (~8 min). What-if escalation: from the smallest animal message (a prairie dog's alarm call) to the biggest one nobody can read yet (whale codas), then the twist and the prize.
// Built from the asset library (lib.py find/show; L.put). New library file: library/ep49-talk-animals.js (ep49-prairie-dog, ep49-mound, ep49-tee, ep49-raptor, ep49-leopard, ep49-coyote, ep49-marmoset, ep49-collie, ep49-sperm-whale, ep49-cuttlefish, ep49-call-waves, ep49-waggle-dance).
// Runners: (1) DAVE'S YELLOW SHIRT: a yellow tee drawn on the pure stick figure in every scene until clip 82, where it is swapped for a green one (the tee is an overlay, ep49-tee). (2) THE NOTEBOOK "THINGS ANIMALS SAY": line 1 "they can see my shirt" (clip 9), line 2 "bees give better directions than I do" (clip 38), the four words WHERE / WHAT / WHO / DANGER (clip 70), closed in the last clip.
// Cast: Dave (kit-dave, Look K pure stick figure + tee), "doc" = stick girl03 with glasses and a clipboard (teal accent), the animals (translation lines are bubbles tagged OUR TRANSLATION; the "kid" voice reads them), real scientists are name cards only, never likenesses.
// VISUAL SAFETY: nothing flashes or strobes; everything fades in over 0.35 s; sound arcs and click dots are static drawings.
// ---------- timing: one picture per beat; shots register with their cue, run in order at the end ----------
const SHOTS = [];
const shot = (c, w, fn, o) => SHOTS.push({ c, w, fn, o });
const END = (c) => CLIP(c)[1];
const T0 = (S) => Math.max(0, S.start - 0.6); // static text sits under the crossfade, so carried-over labels never blink
// ---------- text ----------
const card = (S, s, x, y, o = {}) => DS.card(S, s, x, y, Object.assign({ size: DS.type.small }, o, { t: o.t ?? T0(S) }));
const txt = (S, s, x, y, o = {}) => S.text(s, x, y, Object.assign({ size: DS.type.small, c: DS.c("ink") }, o, { t: o.t ?? T0(S) }));
const stud = (S, s, t) => card(S, s, 960, 110, { t }); // names + year of the study, top centre
// ---------- backgrounds ----------
const bg = (S, name, o = {}) => L.put(S, name, 0, 0, o);
const field = (S, name, tone = 1) => S.fill(rect(-40, -40, 2000, 1160), T0(S), 0, DS.c(name, tone), 1);
const prairie = (S, o = {}) => DS.outdoor(S, Object.assign({ hy: 600, ground: "sand", hills: "grass", sun: [1640, 190] }, o));
const nightSea = (S) => bg(S, "scene-underwater-day");
// ---------- people ----------
const HEAD = 372;
const green = () => W(82, 8) - 0.1; // from here Dave wears the green shirt
const teeOf = (S) => (S.start > green() ? "green" : "yellow");
// Dave: kit-dave stick figure + the shirt overlay, in one group (so swap/fade/shift treat them as one)
const dave = (S, x, gy, o = {}) => {
  const g = S.grp(o.parent), s = o.s ?? 1.1, t = o.t, tee = o.tee || teeOf(S);
  L.put(S, "kit-dave", x, gy, Object.assign({ s, face: "smile", parent: g }, o, { parent: g, t: undefined }));
  if (tee !== "none") L.put(S, "ep49-tee", x, gy, { s, c: tee, parent: g, flip: o.flip });
  if (t !== undefined && t > S.start + 0.05) tl.fromTo(g, { opacity: 0 }, { opacity: 1, duration: 0.35 }, t);
  return g;
};
const guy = (S, style, x, gy, o = {}) => L.put(S, "person", x, gy, Object.assign({ style, s: 1.05, face: "smile" }, o));
// the scientist "doc": stick girl, glasses, a teal-edged clipboard (doc's accent)
const doc = (S, x, gy, o = {}) => {
  const g = S.grp(o.parent), s = o.s ?? 1.05;
  L.put(S, "person", x, gy, Object.assign({ style: "girl03", acc: ["glasses"], face: "smile", pose: "hold" }, o, { s, parent: g, t: undefined }));
  L.put(S, "p2-clipboard", x + (o.flip ? -58 : 58) * s, gy - 150 * s, { s: 0.62 * s, parent: g, flip: o.flip });
  if (o.t !== undefined && o.t > S.start + 0.05) tl.fromTo(g, { opacity: 0 }, { opacity: 1, duration: 0.35 }, o.t);
  return g;
};
// mouth flaps: copies of the same asset with open mouths, switched on and off (seek-safe tl.set); the base never changes
const FLAP = [1, 2, 0, 2, 1, 2, 0, 1, 2, 2, 0, 1];
const flaps = (a, b, t0, t1) => { let i = 0; for (let t = t0; t < t1 - 0.1; t += 0.2, i++) { const s = FLAP[i % FLAP.length]; tl.set(a, { opacity: s === 1 ? 1 : 0 }, t); tl.set(b, { opacity: s === 2 ? 1 : 0 }, t); } tl.set(a, { opacity: 0 }, t1); tl.set(b, { opacity: 0 }, t1); };
const talkPut = (S, name, x, gy, o, c) => {
  const g = L.put(S, name, x, gy, o), m = (mo) => { const k = L.put(S, name, x, gy, Object.assign({}, o, { t: undefined, mouth: mo })); k.setAttribute("opacity", 0); return k; };
  flaps(m("o"), m("a"), W(c, 0), END(c)); return g;
};
const daveTalk = (S, x, gy, o, c) => {
  const s = o.s ?? 1.1, g = dave(S, x, gy, o), m = (mo) => { const k = L.put(S, "kit-dave", x, gy, Object.assign({ s, face: "smile" }, o, { t: undefined, tee: undefined, mouth: mo })); k.setAttribute("opacity", 0); return k; };
  flaps(m("o"), m("a"), W(c, 0), END(c)); return g;
};
const docTalk = (S, x, gy, o, c) => {
  const g = doc(S, x, gy, o), s = o.s ?? 1.05, m = (mo) => { const k = L.put(S, "person", x, gy, Object.assign({ style: "girl03", acc: ["glasses"], face: "smile", pose: "hold" }, o, { s, t: undefined, mouth: mo })); k.setAttribute("opacity", 0); return k; };
  flaps(m("o"), m("a"), W(c, 0), END(c)); return g;
};
// ---------- animals ----------
// a prairie dog on its mound; (x, gy) = mound base. o: s, flip, mouth, alarm, t
const pdog = (S, x, gy, o = {}) => {
  const s = o.s ?? 1.4, g = S.grp(o.parent);
  L.put(S, "ep49-mound", x, gy, { s, parent: g, flip: o.flip });
  L.put(S, "ep49-prairie-dog", x + (o.flip ? 6 : -6) * s, gy - 54 * s, { s, parent: g, flip: o.flip, mouth: o.mouth, alarm: o.alarm });
  if (o.t !== undefined && o.t > S.start + 0.05) tl.fromTo(g, { opacity: 0 }, { opacity: 1, duration: 0.35 }, o.t);
  return g;
};
const pdogTalk = (S, x, gy, o, c) => {
  const s = o.s ?? 1.4, g = pdog(S, x, gy, o), m = (mo) => { const k = L.put(S, "ep49-prairie-dog", x + (o.flip ? 6 : -6) * s, gy - 54 * s, { s, flip: o.flip, mouth: mo }); k.setAttribute("opacity", 0); return k; };
  flaps(m("o"), m("a"), W(c, 0), END(c)); return g;
};
const critter = (S, name, x, gy, o = {}) => L.put(S, name, x, gy, Object.assign({ s: 1.2 }, o));
// a translated animal line: a speech bubble plus the OUR TRANSLATION tag (the kid voice reads these)
const say = (S, x, y, text, o = {}) => {
  const g = S.grp(o.parent);
  L.put(S, "bubble-round", x, y, { s: o.s ?? 0.95, text, tail: o.tail || "left", parent: g, t: undefined });
  card(S, "OUR TRANSLATION", x, y - (o.dy ?? 215), { size: DS.type.caption, fill: "yellow", t: o.t ?? T0(S), parent: g });
  if (o.t !== undefined && o.t > S.start + 0.05) tl.fromTo(g, { opacity: 0 }, { opacity: 1, duration: 0.35 }, o.t);
  return g;
};
// sound arcs from a mouth at (x, y), pointing right (flip: left)
const waves = (S, x, y, o = {}) => L.put(S, "ep49-call-waves", x, y, Object.assign({ s: 1 }, o));
// ---------- small kit ----------
const fadeG = (S, g, t, dur = 0.35) => { if (t !== undefined && t > S.start + 0.05) tl.fromTo(g, { opacity: 0 }, { opacity: 1, duration: dur }, t); return g; };
const fadeOut = (g, t, dur = 0.35, to = 0) => tl.to(g, { opacity: to, duration: dur }, t);
const swap = (a, b, t, dur = 0.35) => { fadeOut(a, t, dur); tl.fromTo(b, { opacity: 0 }, { opacity: 1, duration: dur, immediateRender: false }, t); b.setAttribute("opacity", 0); };
const grow = (g, t, x, y, dur = 0.7) => { const tf = (k) => `translate(${x} ${y}) scale(${k} 1) translate(${-x} ${-y})`; tl.fromTo(g, { attr: { transform: tf(0.02) } }, { attr: { transform: tf(1) }, duration: dur, ease: "power2.out", immediateRender: false }, t); };
const shift = (g, t, dur, from, to, ease = "power1.inOut") => tl.fromTo(g, { attr: { transform: `translate(${from[0]} ${from[1]})` } }, { attr: { transform: `translate(${to[0]} ${to[1]})` }, duration: dur, ease, immediateRender: false }, t);
const tick = (S, x, y, k, t, name = "green") => S.tick(x, y, k, t, 0, { c: DS.c(name), w: DS.w.near });
const xMark = (S, x, y, k, t) => S.cross(x, y, k, t, 0, { c: DS.c("red"), w: DS.w.near });
const arrowR = (S, x1, y1, x2, y2, t, o = {}) => S.arrow(x1, y1, x2, y2, t, 0.3, { c: DS.c(o.c || "ink", o.tone || 0), w: DS.w.near, bend: o.bend || 0 });
const panel = (S, cx, cy, wd, ht, t, name = "white") => { const g = S.grp(); DS.drop(S, rrect(cx - wd / 2 + 8, cy - ht / 2 + 12, wd, ht, DS.r.md), { t, parent: g }); DS.shape(S, rrect(cx - wd / 2, cy - ht / 2, wd, ht, DS.r.md), name, { flat: true, w: "detail", t, parent: g }); return g; };
// seek-safe count-up text
const countUp = (S, x, y, from, to, t, dur, o = {}) => {
  const fmt = o.fmt || ((n) => Math.round(n).toLocaleString("en-US")), te = S.text(fmt(from), x, y, { size: o.size || DS.type.title, c: o.c || DS.c("red", 2), t: o.t0 ?? t, anchor: o.anchor, parent: o.parent });
  const v = { n: from }; te.textContent = fmt(from);
  tl.fromTo(v, { n: from }, { n: to, duration: dur, ease: o.ease || "power1.out", immediateRender: false, onUpdate: () => (te.textContent = fmt(v.n)) }, t);
  return te;
};
// ---------- the runner: Dave's notebook "THINGS ANIMALS SAY" ----------
// an open page at (x, y) = page centre, width 560 x s. lines: [[text, cueSeconds, colourName?], ...]; head = the four-words header [[word, t], ...]
const NB = { wd: 600, ht: 720 };
const page = (S, x, y, k = 1, o = {}) => {
  const g = S.grp(o.parent), w = NB.wd * k, h = NB.ht * k, x0 = x - w / 2, y0 = y - h / 2;
  DS.drop(S, rrect(x0 + 10, y0 + 14, w, h, DS.r.md), { t: T0(S), parent: g });
  DS.shape(S, rrect(x0, y0, w, h, DS.r.md), "paper", { flat: true, w: "detail", t: T0(S), parent: g });
  DS.shape(S, rrect(x0 - 18 * k, y0 - 8 * k, 36 * k, h + 16 * k, DS.r.sm), "red", { w: "detail", t: T0(S), parent: g });
  for (let i = 0; i < 9; i++) S.fill(rect(x0 + 40 * k, y0 + (176 + i * 62) * k, w - 80 * k, 3), T0(S), 0, DS.c("blue", 1), 0.5, g);
  txt(S, "THINGS ANIMALS SAY", x, y0 + 80 * k, { size: DS.type.caption, parent: g });
  (o.head || []).forEach(([wd, t], i) => card(S, wd, x0 + (i % 2 ? 0.72 : 0.28) * w, y0 + (130 + Math.floor(i / 2) * 78) * k, { size: DS.type.caption, fill: "yellow", t, parent: g }));
  (o.lines || []).forEach(([s, t, c], i) => txt(S, s, x - w / 2 + 62 * k, y0 + (222 + i * 62 + (o.dy || 0)) * k, { size: DS.type.caption, anchor: "start", t, c: DS.c(c || "ink", c ? 2 : 0), parent: g }));
  return g;
};
// ===================== chapter 1: The yellow shirt (clips 1-9) =====================
// 1 "This is Dave. Dave woke up this morning able to understand every animal on Earth. Dave wants secrets."
shot(1, 0, (S) => {
  bg(S, "kit-room-bedroom-day");
  const a = dave(S, 960, 930, { s: 1.05, face: "sleepy" });
  swap(a, dave(S, 960, 930, { s: 1.05, face: "wow" }), W(1, 4));
  card(S, "DAVE", 960, 110);
});
shot(1, 8, (S) => {
  prairie(S);
  dave(S, 960, 940, { s: 1.05, face: "wow" });
  critter(S, "animal-dog", 330, 900, { s: 1.5, t: W(1, 10) });
  critter(S, "animal-elephant", 1530, 880, { s: 1.4, flip: true, t: W(1, 11) });
  critter(S, "animal-owl", 640, 900, { s: 1.5, t: W(1, 12) });
  critter(S, "animal-monkey", 1290, 900, { s: 1.5, flip: true, t: W(1, 12) });
  critter(S, "animal-bee", 760, 520, { s: 1.4, t: W(1, 12) });
  critter(S, "animal-fox", 1750, 900, { s: 1.2, flip: true, t: W(1, 13) });
  card(S, "EVERY ANIMAL ON EARTH", 960, 110, { t: W(1, 11) });
});
shot(1, 15, (S) => {
  field(S, "dusk", 1);
  dave(S, 620, 940, { s: 1.15, face: "mischief", pose: "hug-self" });
  L.put(S, "hist-scroll", 1300, 560, { s: 2.2, t: W(1, 17) });
  L.put(S, "prop-padlock", 1470, 720, { s: 1.6, t: W(1, 17) });
  card(S, "SECRETS", 1300, 300, { t: W(1, 17), fill: "yellow" });
});
// 2 (@dave) "Right. Tell me everything. I have a notebook."
shot(2, 0, (S) => {
  prairie(S);
  daveTalk(S, 700, 940, { s: 1.2, face: "determined", pose: "hold" }, 2);
  L.put(S, "prop-notebook", 860, 740, { s: 1.5, t: W(2, 6) });
  critter(S, "animal-owl", 1350, 900, { s: 1.5, flip: true });
  critter(S, "animal-bee", 1550, 560, { s: 1.3, flip: true });
});
// 3 "So what would happen if you could talk to animals?"
shot(3, 0, (S) => {
  prairie(S);
  card(S, "WHAT IF YOU COULD TALK TO ANIMALS?", 960, 110, { size: DS.type.body });
  dave(S, 960, 940, { s: 1.0, face: "thinking", pose: "think" });
  [["animal-dog", 280, 900, false], ["animal-elephant", 600, 880, false], ["animal-monkey", 1330, 900, true], ["animal-sparrow", 1660, 900, true]].forEach(([n, x, y, f], i) => {
    critter(S, n, x, y, { s: 1.4, flip: f, t: W(3, 5) + i * 0.1 });
    L.put(S, "fx-question-marks", x + (f ? -20 : 20), y - 290, { s: 0.7, t: W(3, 8) + i * 0.15 });
  });
});
// 4 "Would you learn their secrets, or hear a lot of very short sentences?"
shot(4, 0, (S) => {
  field(S, "sky", 1);
  panel(S, 480, 560, 780, 700, T0(S)); panel(S, 1440, 560, 780, 700, T0(S));
  L.put(S, "hist-scroll", 440, 580, { s: 2.3 }); L.put(S, "prop-padlock", 620, 720, { s: 1.6 });
  card(S, "SECRETS?", 480, 270, { t: W(4, 3), fill: "yellow" });
  ["Food?", "Mine.", "Hi!", "Danger!"].forEach((w, i) => L.put(S, "bubble-round", 1300 + (i % 2) * 230, 420 + i * 125, { s: 0.62, text: w, tail: i % 2 ? "right" : "left", t: W(4, 8) + i * 0.4 }));
  card(S, "VERY SHORT SENTENCES", 1440, 270, { size: DS.type.caption, t: W(4, 9) });
});
// 5 "The first thing Dave hears is a prairie dog, standing up on a mound, shouting about him."
shot(5, 0, (S) => {
  prairie(S);
  const g = S.grp(); dave(S, 360, 930, { s: 0.7, face: "smile", pose: "cyc-walk-1", parent: g });
  shift(g, S.start + 0.2, 4.4, [0, 0], [140, 0], "power1.out");
  const d = pdog(S, 1450, 800, { s: 2.2, mouth: true, flip: true, t: W(5, 6) });
  fadeG(S, waves(S, 1180, 520, { s: 1.6, flip: true }), W(5, 14));
});
// 6 (@kid) "Tall human. Yellow shirt. Coming this way."
shot(6, 0, (S) => {
  prairie(S);
  pdogTalk(S, 560, 880, { s: 2.5, mouth: true }, 6);
  dave(S, 1560, 920, { s: 0.6, face: "worried", flip: true });
  say(S, 1160, 330, "Tall human. Yellow shirt. Coming this way.", { tail: "left", s: 1.05, t: W(6, 0) });
});
// 7 "Here is the plan. We'll climb from the smallest animal message to the biggest one nobody can read yet."
shot(7, 0, (S) => {
  field(S, "sky", 1);
  const steps = [[330, 800, "ep49-prairie-dog", 1.0], [650, 700, "animal-bee", 1.0], [970, 600, "animal-elephant", 0.7], [1290, 500, "ep49-collie", 0.9], [1610, 400, "ep49-sperm-whale", 0.42]];
  steps.forEach(([x, y, n, k], i) => {
    DS.shape(S, rect(x - 150, y, 300, 940 - y), i % 2 ? "sand" : "earth", { w: "detail" });
    L.put(S, n, x, n === "ep49-sperm-whale" || n === "animal-bee" ? y - 90 : y, { s: k * 1.3 });
  });
  dave(S, 130, 940, { s: 0.7, face: "determined", pose: "point" });
  card(S, "SMALLEST", 330, 480, { size: DS.type.caption, t: W(7, 8) });
  card(S, "BIGGEST", 1610, 230, { size: DS.type.caption, t: W(7, 13), fill: "yellow" });
});
// 8 "And we'll find out whether any of them have anything to say to Dave."
shot(8, 0, (S) => {
  prairie(S);
  dave(S, 330, 940, { s: 1.05, face: "smile", pose: "hold" });
  L.put(S, "prop-notebook", 470, 760, { s: 1.4 });
  [["animal-elephant", 880, 880, 1.2], ["ep49-prairie-dog", 1230, 860, 1.5], ["animal-monkey", 1560, 900, 1.5]].forEach(([n, x, y, k], i) => {
    critter(S, n, x, y, { s: k, flip: true, t: S.start });
    L.put(S, "bubble-round", x - 60, y - 400, { s: 0.38, text: "...?", tail: "right", t: W(8, 8) + i * 0.25 });
  });
});
// 9 "Dave wrote the first line in his notebook. It says: they can see my shirt."
shot(9, 0, (S) => {
  field(S, "wall", 1);
  dave(S, 430, 940, { s: 1.2, face: "thinking", pose: "hold" });
  L.put(S, "prop-pencil", 560, 760, { s: 1.4, rot: -30, t: W(9, 1) });
  page(S, 1280, 510, 1.0, { lines: [["1. they can see my shirt", W(9, 10)]] });
  L.put(S, "ep49-tee", 1620, 700, { s: 1.4, c: "yellow", t: W(9, 14) });
});
// ===================== chapter 2: The prairie dogs (clips 10-24) =====================
// 10 "Is that real? Partly."
shot(10, 0, (S) => {
  prairie(S);
  dave(S, 600, 940, { s: 1.1, face: "confused", pose: "scratch-head" });
  pdog(S, 1400, 820, { s: 1.5, flip: true, mouth: true });
  card(S, "REAL?", 960, 140, { size: DS.type.display });
  card(S, "PARTLY", 960, 290, { fill: "yellow", t: W(10, 3) });
});
// 10 "In two thousand four, the biologist Con Slobodchikoff and two colleagues tested it in a colony of Gunnison's prairie dogs in Arizona."
shot(10, 4, (S) => {
  prairie(S);
  [[300, 640, 0.9], [760, 650, 1.0], [1180, 660, 0.9], [1560, 650, 1.0], [1000, 760, 1.1], [1700, 760, 1.2]].forEach(([x, y, k], i) => pdog(S, x, y, { s: k, flip: i % 2 === 1 }));
  stud(S, "2004 · ARIZONA", W(10, 5));
  [300, 460, 620].forEach((x, i) => guy(S, "man02", x, 940, { s: 0.6, face: i ? "smile" : "happy", acc: ["glasses"], t: W(10, 9) + i * 0.25 }));
  card(S, "CON SLOBODCHIKOFF + 2 COLLEAGUES", 960, 880, { size: DS.type.caption, t: W(10, 10) });
});
// 11 "Three women of similar height walked through the colony ninety-nine times in total."
shot(11, 0, (S) => {
  prairie(S);
  [[240, 575, 0.5], [700, 580, 0.5], [1180, 575, 0.5], [1650, 580, 0.5]].forEach(([x, y, k], i) => pdog(S, x, y, { s: k, flip: i === 1, layer: 0 }));
  ["blue", "green", "yellow"].forEach((c, i) => {
    const g = S.grp(); const x = 360 + i * 520;
    L.put(S, "person", x, 930, { style: "girl02", s: 1.0, face: "smile", pose: ["cyc-walk-1", "cyc-walk-3", "cyc-walk-5"][i], parent: g });
    L.put(S, "ep49-tee", x, 930, { s: 1.0, c, parent: g });
    shift(g, S.start + 0.1, 5.5, [0, 0], [110, 0], "none");
    fadeG(S, g, W(11, 0) + i * 0.2);
  });
  card(S, "SIMILAR HEIGHT", 960, 110, { t: W(11, 2) });
  countUp(S, 1500, 300, 0, 99, W(11, 9), 1.0, { size: DS.type.display, t0: W(11, 9) });
  card(S, "WALK-THROUGHS", 1500, 400, { size: DS.type.caption, t: W(11, 9) });
});
// 12 "All three wore blue jeans and sunglasses. The only thing that changed was the colour of the shirt: blue, green or yellow."
shot(12, 0, (S) => {
  prairie(S, { hy: 560 });
  ["blue", "green", "yellow"].forEach((c, i) => {
    const x = 520 + i * 440;
    L.put(S, "person", x, 940, { style: "girl02", s: 1.25, face: "flat", acc: ["sunglasses"] });
    L.put(S, "ep49-tee", x, 940, { s: 1.25, c, t: W(12, 18 + i) });
  });
  card(S, "BLUE JEANS + SUNGLASSES", 960, 110, { t: W(12, 3) });
  card(S, "ONLY THE SHIRT CHANGES", 960, 215, { size: DS.type.caption, t: W(12, 8), fill: "yellow" });
});
// 13 "It is the most consistent outfit in science."
shot(13, 0, (S) => {
  prairie(S, { hy: 560 });
  ["blue", "green", "yellow"].forEach((c, i) => {
    const x = 600 + i * 360;
    L.put(S, "person", x, 940, { style: "girl02", s: 1.0, face: "smile", acc: ["sunglasses"], pose: "hips" });
    L.put(S, "ep49-tee", x, 940, { s: 1.0, c });
  });
  L.put(S, "sport-medal", 960, 330, { s: 1.5, t: W(13, 3) });
  card(S, "MOST CONSISTENT OUTFIT IN SCIENCE", 960, 110, { size: DS.type.body, t: W(13, 3) });
});
// 14 "They recorded eighty-two alarm calls from forty-eight marked animals. Then a computer measured the sound of each call."
shot(14, 0, (S) => {
  prairie(S);
  [[430, 820, 1.3, 7], [900, 840, 1.3, 23], [1370, 820, 1.3, 31], [1780, 840, 1.1, 48]].forEach(([x, y, k, n], i) => {
    pdog(S, x, y, { s: k, flip: i % 2 === 1, alarm: i === 1, mouth: i !== 2, t: W(14, 1) + i * 0.2 });
    card(S, "" + n, x + (i % 2 ? 40 : -40), y - 280 * k + 90, { size: DS.type.caption, fill: "yellow", t: W(14, 6) + i * 0.1 });
  });
  L.put(S, "prop-microphone", 130, 700, { s: 2.2, t: W(14, 1) });
  card(S, "82 ALARM CALLS", 640, 110, { t: W(14, 2) });
  card(S, "48 MARKED ANIMALS", 1320, 110, { t: W(14, 6) });
});
shot(14, 9, (S) => {
  field(S, "sky", 1);
  panel(S, 960, 560, 1300, 640, T0(S));
  const bars = Array.from({ length: 38 }, (_, i) => 40 + 190 * Math.abs(Math.sin(i * 0.55) * Math.cos(i * 0.21)) + (i % 5) * 8);
  bars.forEach((h, i) => S.fill(rect(360 + i * 30, 560 - h / 2, 18, h), T0(S), 0, DS.c("blue", 0), 1));
  card(S, "THE COMPUTER MEASURES EACH CALL", 960, 250, { size: DS.type.caption });
  L.put(S, "ep-magnifier", 1450, 770, { s: 1.4, t: W(14, 12) });
});
// 15 "The calls for blue and for yellow were different, and so were the calls for blue and for green. But the calls for green and for yellow were not."
shot(15, 0, (S) => {
  field(S, "wall", 1);
  [["blue", 420, "BLUE"], ["yellow", 960, "YELLOW"], ["green", 1500, "GREEN"]].forEach(([c, x, name], i) => {
    L.put(S, "ep49-tee", x, 960, { s: 2.2, c });
    card(S, name, x, 720, { size: DS.type.caption, t: [W(15, 3), W(15, 6), W(15, 18)][i] });
  });
  card(S, "≠", 690, 480, { size: DS.type.display, fill: "red", t: W(15, 8) });
  card(S, "≠", 960, 860, { size: DS.type.display, fill: "red", t: W(15, 10) });
  S.draw("M420 780 Q690 940 960 940", W(15, 10), 0.4, { c: DS.c("red", 2), w: DS.w.mid });
  card(S, "=", 1230, 480, { size: DS.type.display, fill: "green", t: W(15, 27) });
});
// 16 "The authors said that fits how prairie dogs see. They suggested the animals build labels for a predator's features into their calls."
shot(16, 0, (S) => {
  prairie(S);
  pdog(S, 430, 860, { s: 2.4 });
  card(S, "HOW A PRAIRIE DOG SEES COLOUR", 1180, 130, { size: DS.type.caption, t: W(16, 3) });
  [["blue", 1030], ["green", 1290], ["yellow", 1550]].forEach(([c, x], i) => { S.draw(rrect(x - 110, 330, 220, 220, DS.r.md), W(16, 5) + i * 0.3, 0, { fill: DS.c(c, 0), c: DS.c("ink"), w: DS.w.mid }); });
  S.draw("M1180 590 V640 H1660 V590", W(16, 7), 0.4, { c: DS.c("ink"), w: DS.w.mid });
  card(S, "LOOK ALIKE", 1420, 720, { size: DS.type.caption, t: W(16, 7), fill: "yellow" });
});
shot(16, 9, (S) => {
  prairie(S);
  pdog(S, 520, 860, { s: 2.3, mouth: true });
  waves(S, 760, 520, { s: 1.7 });
  [["SIZE", W(16, 14), 1160, 260], ["COLOUR", W(16, 17), 1400, 420], ["SHAPE", W(16, 18), 1180, 600]].forEach(([w, t, x, y]) => card(S, w, x, y, { size: DS.type.body, fill: "yellow", t }));
  card(S, "LABELS IN THE CALL", 1260, 130, { size: DS.type.caption, t: W(16, 13) });
});
// 17 "It was not perfect. The computer guessed the shirt from the call about fifty-five percent of the time. Chance would be thirty-three."
shot(17, 0, (S) => {
  field(S, "sky", 1);
  panel(S, 960, 520, 1500, 460, T0(S));
  card(S, "NOT PERFECT", 960, 110, { fill: "yellow" });
  const bar = (label, y, frac, name, t, val) => {
    txt(S, label, 330, y + 14, { anchor: "end", size: DS.type.caption });
    DS.shape(S, rrect(360, y - 40, 1050, 80, DS.r.sm), "paper", { flat: true, w: "detail" });
    const g = S.grp(); DS.shape(S, rrect(360, y - 40, 1050 * frac, 80, DS.r.sm), name, { w: "detail", parent: g, t }); grow(g, t, 360, y);
    S.text(val, 360 + 1050 * frac + 30, y + 18, { size: DS.type.small, t: t + 0.5, c: DS.c("ink"), anchor: "start" });
  };
  bar("COMPUTER", 440, 0.55, "green", W(17, 12), "55%");
  bar("CHANCE", 600, 0.33, "gray", W(17, 20), "33%");
});
// 18 "In a later study, the calls also differed for cut-out shapes of different sizes, like a circle, a square and a triangle."
shot(18, 0, (S) => {
  prairie(S);
  pdog(S, 380, 850, { s: 2.0, mouth: true });
  [[820, "circle", 70], [1180, "square", 150], [1560, "triangle", 120]].forEach(([x, kind, r], i) => {
    const t = [W(18, 16), W(18, 18), W(18, 21)][i];
    S.draw(`M${x} ${700} V${900}`, t, 0, { c: DS.c("wood", 2), w: DS.w.near });
    const d = kind === "circle" ? circ(x, 620, r) : kind === "square" ? rect(x - r, 560 - r + 70, r * 2, r * 2) : `M${x} ${520} L${x + r} ${700} H${x - r} Z`;
    DS.shape(S, d, ["red", "blue", "yellow"][i], { w: "mid", t });
  });
  card(S, "A LATER STUDY", 960, 110, { t: W(18, 2) });
});
// 19 "This isn't new. Prairie dogs already have different calls for a hawk, a human, a coyote and a domestic dog."
shot(19, 0, (S) => {
  prairie(S);
  pdog(S, 960, 560, { s: 1.0, mouth: true, layer: 0 });
  L.put(S, "ep49-raptor", 330, 360, { s: 0.9, kind: "hawk" });
  guy(S, "man02", 700, 950, { s: 0.9, face: "flat" });
  L.put(S, "ep49-coyote", 1250, 940, { s: 1.0 });
  L.put(S, "animal-dog", 1610, 940, { s: 1.4, flip: true });
  [["HAWK", 330, 540, 11], ["HUMAN", 700, 560, 13], ["COYOTE", 1250, 700, 15], ["DOG", 1610, 700, 19]].forEach(([w, x, y, i]) => card(S, w, x, y, { size: DS.type.caption, t: W(19, i) }));
  card(S, "DIFFERENT CALLS", 960, 110, { t: W(19, 7), fill: "yellow" });
});
// 20 "And in nineteen eighty, researchers showed vervet monkeys have different calls for a leopard, an eagle and a python."
shot(20, 0, (S) => {
  prairie(S, { ground: "grass" });
  L.put(S, "animal-monkey", 960, 900, { s: 2.2 });
  L.put(S, "ep49-leopard", 360, 910, { s: 1.15 });
  L.put(S, "ep49-raptor", 1500, 330, { s: 1.0, kind: "eagle" });
  L.put(S, "animal-snake", 1600, 900, { s: 1.7, flip: true });
  [["LEOPARD", 360, 720, 13], ["EAGLE", 1500, 520, 15], ["PYTHON", 1600, 710, 18]].forEach(([w, x, y, i]) => card(S, w, x, y, { size: DS.type.caption, t: W(20, i) }));
  card(S, "VERVET MONKEYS · 1980", 960, 110, { t: W(20, 2) });
});
// 21 "So a prairie dog has four ways of saying something is going to eat me, and one of them is human."
shot(21, 0, (S) => {
  prairie(S);
  pdog(S, 960, 900, { s: 1.9, mouth: true });
  const pics = [["ep49-raptor", { kind: "hawk" }, 0.8, 300], ["ep49-coyote", {}, 1.1, 700], ["animal-dog", {}, 1.2, 1220], ["person", { style: "man02", face: "flat" }, 0.75, 1620]];
  pics.forEach(([n, po, ps, x], i) => L.put(S, "thought-pic", x, 330, { s: 0.62, noTail: true, pic: n, picO: po, picS: ps, picY: n === "person" ? 150 : 30, seed: 210 + i, t: W(21, 5) + i * 0.15 }));
  countUp(S, 960, 130, 0, 4, W(21, 5), 0.6, { size: DS.type.display, fmt: (n) => Math.round(n) + " WAYS", c: DS.c("ink") });
  S.draw(circ(1620, 330, 190, 160), W(21, 19), 0.4, { c: DS.c("red", 2), w: DS.w.near });
});
// 22 "Researchers use a careful term for this: functional reference."
shot(22, 0, (S) => {
  prairie(S, { ground: "grass" });
  doc(S, 560, 940, { s: 1.15, face: "thinking" });
  card(S, "FUNCTIONAL REFERENCE", 1180, 400, { size: DS.type.title, fill: "yellow", t: W(22, 7) });
  card(S, "A CAREFUL TERM", 1180, 250, { t: W(22, 3) });
});
// 23 "The call works as if it refers to the predator, but proving what the animal means is hard."
shot(23, 0, (S) => {
  prairie(S);
  pdog(S, 440, 860, { s: 1.9, mouth: true });
  waves(S, 700, 570, { s: 1.4, t: W(23, 1) });
  L.put(S, "ep49-raptor", 1450, 400, { s: 1.2, kind: "hawk", t: W(23, 7) });
  arrowR(S, 960, 560, 1230, 430, W(23, 5));
  L.put(S, "fx-question-marks", 700, 280, { s: 1.0, t: W(23, 11) });
  card(S, "AS IF IT REFERS TO", 1130, 700, { size: DS.type.caption, t: W(23, 4) });
});
shot(23, 18, (S) => {
  prairie(S);
  L.put(S, "ep49-mound", 1400, 860, { s: 1.9 });
  S.draw(rrect(1250, 690, 360, 100, DS.r.sm), W(23, 21), 0, { fill: DS.c("white"), c: DS.c("ink"), w: DS.w.mid });
  txt(S, "NO COMMENT", 1430, 758, { size: DS.type.caption, t: W(23, 21) });
  doc(S, 560, 940, { s: 1.15, face: "smile", pose: "hold" });
  L.put(S, "prop-microphone", 860, 760, { s: 1.5, t: W(23, 18) });
});
// 24 "Dave looks at the notebook. They can tell blue from yellow. It is not a secret. It is a shirt."
shot(24, 0, (S) => {
  field(S, "wall", 1);
  dave(S, 430, 940, { s: 1.2, face: "flat", pose: "look-down" });
  page(S, 1260, 510, 1.0, { lines: [["1. they can see my shirt", T0(S)]] });
  L.put(S, "ep49-tee", 1220, 880, { s: 0.8, c: "blue", t: W(24, 8) });
  L.put(S, "ep49-tee", 1420, 880, { s: 0.8, c: "yellow", t: W(24, 10) });
  card(S, "NOT A SECRET", 1260, 120, { fill: "red", tc: "red", t: W(24, 11) });
});
shot(24, 16, (S) => {
  field(S, "wall", 1);
  dave(S, 430, 940, { s: 1.2, face: "flat", pose: "look-down" });
  page(S, 1260, 510, 1.0, { lines: [["1. they can see my shirt", T0(S)]] });
  L.put(S, "ep49-tee", 1260, 960, { s: 2.2, c: "yellow", t: W(24, 18) });
  card(S, "A SHIRT", 1260, 120, { fill: "yellow", t: W(24, 18) });
});
// ===================== chapter 3: The bees (clips 25-38) =====================
const bee = (S, x, y, o = {}) => L.put(S, "animal-bee", x, y, Object.assign({ s: 1.6 }, o));
const hive = (S, x, gy, o = {}) => L.put(S, "nat-beehive", x, gy, Object.assign({ s: 2 }, o));
// a glass-walled observation hive: wooden frame, glass, comb and a few bees
const glassHive = (S, cx, cy, w, h, o = {}) => {
  const g = S.grp(o.parent);
  DS.shape(S, rrect(cx - w / 2 - 22, cy - h / 2 - 22, w + 44, h + 44, DS.r.sm), "wood", { w: "mid", parent: g });
  DS.shape(S, rrect(cx - w / 2, cy - h / 2, w, h, DS.r.xs), "glass", { flat: true, w: "detail", parent: g });
  [[-0.28, -0.12], [0.02, 0.18], [0.3, -0.08]].forEach(([a, b]) => L.put(S, "nat-honeycomb", cx + a * w, cy + b * h, { s: 1.5, parent: g }));
  [[-0.1, -0.26], [0.2, 0.28], [-0.32, 0.22], [0.36, -0.3]].forEach(([a, b], i) => bee(S, cx + a * w, cy + b * h, { s: 0.9, parent: g, flip: i % 2 }));
  return g;
};
const scientist = (S, x, gy, o = {}) => guy(S, "man02", x, gy, Object.assign({ s: 1.05, acc: ["glasses"], face: "smile" }, o));
// 25 "Next, the bees. Karl von Frisch decoded their dance using glass-walled hives. It won him a share of the Nobel Prize in nineteen seventy-three."
shot(25, 0, (S) => {
  prairie(S);
  hive(S, 1400, 930, { s: 2.6 });
  [[1180, 560], [1650, 480], [1500, 330], [1300, 400]].forEach(([x, y], i) => bee(S, x, y, { s: 1.3, flip: i % 2, t: W(25, 1) + i * 0.15 }));
  dave(S, 480, 940, { s: 1.15, face: "excited", pose: "hold" });
  L.put(S, "prop-notebook", 640, 760, { s: 1.3 });
  card(S, "NEXT: THE BEES", 960, 110);
});
shot(25, 3, (S) => {
  field(S, "wall", 1);
  glassHive(S, 1260, 520, 840, 560);
  scientist(S, 420, 940, { s: 1.2, acc: ["glasses", "beard"], pose: "point" });
  stud(S, "KARL VON FRISCH", W(25, 3));
  card(S, "GLASS-WALLED HIVES", 1260, 880, { size: DS.type.caption, t: W(25, 10) });
});
shot(25, 12, (S) => {
  field(S, "wall", 1);
  L.put(S, "sport-medal", 1100, 560, { s: 2.6 });
  scientist(S, 520, 940, { s: 1.3, acc: ["glasses", "beard"], face: "happy", pose: "cheer" });
  card(S, "NOBEL PRIZE · 1973", 1100, 130, { size: DS.type.title, fill: "yellow", t: W(25, 19) });
});
// 26 "A bee that finds food flies back and dances."
shot(26, 0, (S) => {
  prairie(S);
  [[330, 900, 1.8], [560, 910, 1.5], [180, 920, 1.4]].forEach(([x, y, k], i) => L.put(S, "flowers-daisy", x, y, { s: k }));
  hive(S, 1560, 930, { s: 2.4 });
  const g = S.grp(); bee(S, 430, 640, { s: 2.2, parent: g });
  shift(g, W(26, 5), 1.4, [0, 0], [930, -40], "power1.inOut");
  card(S, "FOOD!", 380, 450, { size: DS.type.title, fill: "yellow", t: W(26, 3) });
});
// 27 "In the dark hive, gravity stands in for the Sun. The angle of its waggle run, measured from straight up,"
shot(27, 0, (S) => {
  field(S, "brown", 2);
  L.put(S, "ep49-waggle-dance", 1000, 520, { s: 1.5, angle: 0 });
  card(S, "IN THE DARK HIVE", 960, 110, { fill: "yellow", t: W(27, 2) });
  arrowR(S, 250, 440, 250, 780, W(27, 4), { c: "paper" });
  card(S, "GRAVITY", 250, 880, { size: DS.type.caption, t: W(27, 4) });
  L.put(S, "sun-simple", 250, 190, { s: 1.0, t: W(27, 8) });
  card(S, "UP = SUN", 250, 340, { size: DS.type.caption, t: W(27, 9) });
});
shot(27, 11, (S) => {
  field(S, "brown", 2);
  L.put(S, "ep49-waggle-dance", 1000, 520, { s: 1.5, angle: 40 });
  card(S, "THE WAGGLE RUN", 400, 150, { t: W(27, 14) });
  card(S, "ANGLE FROM STRAIGHT UP", 1000, 930, { size: DS.type.caption, t: W(27, 16) });
});
// 28 "shows where the food is compared with the Sun."
shot(28, 0, (S) => {
  field(S, "sky", 1);
  panel(S, 480, 540, 680, 700, T0(S), "brown");
  L.put(S, "ep49-waggle-dance", 480, 520, { s: 1.0, angle: 40 });
  arrowR(S, 860, 540, 1000, 540, W(28, 0));
  L.put(S, "sun-simple", 1400, 200, { s: 1.0, t: W(28, 7) });
  hive(S, 1400, 900, { s: 1.5 });
  S.draw("M1400 780 V300", W(28, 7), 0.4, { c: DS.c("ink"), w: DS.w.detail });
  S.draw("M1400 780 L1690 430", W(28, 2), 0.4, { c: DS.c("yellow", 2), w: DS.w.near });
  L.put(S, "flowers-daisy", 1700, 470, { s: 1.0, t: W(28, 3) });
  card(S, "FOOD", 1700, 330, { size: DS.type.caption, t: W(28, 3) });
});
// 29 "The length of the run shows the distance. A run lasting two and a half seconds means roughly two thousand six hundred metres."
shot(29, 0, (S) => {
  field(S, "sky", 1);
  panel(S, 560, 540, 760, 740, T0(S), "brown");
  L.put(S, "ep49-waggle-dance", 560, 520, { s: 1.1, angle: 20, run: 1.0 });
  card(S, "LONGER RUN", 1380, 330, { t: W(29, 1) });
  card(S, "= FARTHER AWAY", 1380, 470, { t: W(29, 5), fill: "yellow" });
  arrowR(S, 1000, 560, 1120, 500, W(29, 5));
});
shot(29, 8, (S) => {
  field(S, "sky", 1);
  L.put(S, "ep-stopwatch", 380, 560, { s: 2.2 });
  card(S, "2.5 SECONDS", 380, 250, { size: DS.type.body, t: W(29, 11) });
  hive(S, 960, 900, { s: 1.3 });
  S.draw("M1060 900 H1760", W(29, 16), 0.8, { c: DS.c("red", 2), w: DS.w.near });
  L.put(S, "flowers-daisy", 1800, 910, { s: 1.4, t: W(29, 18) });
  countUp(S, 1400, 790, 0, 2600, W(29, 18), 1.8, { size: DS.type.title, fmt: (n) => Math.round(n).toLocaleString("en-US") + " m", c: DS.c("red", 2), t0: W(29, 18), anchor: "middle" });
});
// 30 "If the flowers are within about fifty metres, the bee dances in a circle. That says close to the hive, but gives no direction."
shot(30, 0, (S) => {
  field(S, "sky", 1);
  panel(S, 480, 540, 680, 700, T0(S), "brown");
  L.put(S, "ep49-waggle-dance", 480, 520, { s: 1.0, round: true });
  hive(S, 1100, 900, { s: 1.3 });
  L.put(S, "flowers-daisy", 1400, 910, { s: 1.4, t: W(30, 2) });
  S.draw("M1190 790 H1330", W(30, 5), 0.4, { c: DS.c("red", 2), w: DS.w.near });
  card(S, "ABOUT 50 m", 1400, 700, { size: DS.type.caption, t: W(30, 6) });
  card(S, "CLOSE", 1260, 300, { fill: "green", t: W(30, 16) });
});
shot(30, 21, (S) => {
  field(S, "sky", 1);
  panel(S, 480, 540, 680, 700, T0(S), "brown");
  L.put(S, "ep49-waggle-dance", 480, 520, { s: 1.0, round: true });
  L.put(S, "p2-compass", 1300, 520, { s: 2.8 });
  xMark(S, 1300, 520, 3.0, W(30, 22));
  card(S, "NO DIRECTION", 1300, 220, { fill: "red", tc: "red", t: W(30, 22) });
});
// 31 "Dave asks a bee what the meaning of life is."
shot(31, 0, (S) => {
  prairie(S);
  L.put(S, "flowers-daisy", 1300, 910, { s: 2.4 });
  bee(S, 1300, 640, { s: 3.2, flip: true });
  dave(S, 400, 940, { s: 1.2, face: "excited", pose: "point" });
  L.put(S, "bubble-round", 840, 330, { s: 0.9, text: "What is the meaning of life?", tail: "left", t: W(31, 4) });
});
// 32 (@kid) "Two and a half seconds, that way, near the Sun. Please move."
shot(32, 0, (S) => {
  prairie(S);
  L.put(S, "flowers-daisy", 1200, 910, { s: 2.4 });
  bee(S, 1200, 660, { s: 3.0, flip: true });
  const g = S.grp(); dave(S, 540, 940, { s: 1.2, face: "worried", parent: g });
  shift(g, W(32, 10), 0.9, [0, 0], [-150, 0], "power2.out");
  say(S, 800, 330, "Two and a half seconds, that way, near the Sun. Please move.", { tail: "right", s: 0.95, dy: 235, t: W(32, 0) });
  L.put(S, "sun-simple", 1700, 190, { s: 1.0, t: W(32, 7) });
});
// 33 "It is one of the most precise animal messages we have decoded. And it is a set of directions to some flowers."
shot(33, 0, (S) => {
  field(S, "sky", 1);
  panel(S, 480, 540, 680, 700, T0(S), "brown");
  L.put(S, "ep49-waggle-dance", 480, 520, { s: 1.0, angle: 40 });
  card(S, "MOST PRECISE", 960, 110, { fill: "green", t: W(33, 6) });
  arrowR(S, 860, 540, 1100, 540, W(33, 13));
  [[1250, 880, 1.8], [1480, 900, 1.5], [1680, 880, 1.7]].forEach(([x, y, k], i) => L.put(S, "flowers-daisy", x, y, { s: k, t: W(33, 19) + i * 0.15 }));
  card(S, "DIRECTIONS TO FLOWERS", 1450, 650, { size: DS.type.caption, t: W(33, 17) });
});
// 34 "When a swarm needs a new home, hundreds of scouts dance for different sites."
shot(34, 0, (S) => {
  prairie(S);
  DS.shape(S, rrect(100, 380, 620, 40, DS.r.sm), "wood", { w: "mid" });
  Array.from({ length: 14 }, (_, i) => bee(S, 230 + (i % 5) * 70 + (i % 3) * 20, 430 + Math.floor(i / 5) * 60, { s: 0.7, flip: i % 2 }));
  card(S, "A SWARM", 400, 250, { size: DS.type.caption, t: W(34, 2) });
  [["tree-oak", 1000, 1.0, "SITE A"], ["nat-beehive", 1300, 1.7, "SITE B"], ["tree-pine", 1650, 0.9, "SITE C"]].forEach(([n, x, k, lab], i) => {
    L.put(S, n, x, 920, { s: k });
    card(S, lab, x, 350, { size: DS.type.caption, t: W(34, 11) + i * 0.2 });
    arrowR(S, 700, 480, x - 60, 420, W(34, 9) + i * 0.2, { bend: i * 0.1 });
  });
});
// 35 "In twenty eleven, researchers found a signal nobody had noticed: a very short buzz, delivered while head-butting a dancer."
shot(35, 0, (S) => {
  field(S, "wall", 1);
  stud(S, "2011 · A SIGNAL NOBODY HAD NOTICED", W(35, 1));
  const a = S.grp(); bee(S, 640, 560, { s: 3.0, parent: a });
  shift(a, W(35, 14), 0.5, [0, 0], [140, 0], "power2.in");
  bee(S, 1300, 560, { s: 3.0, flip: true });
    card(S, "BZT!", 960, 330, { size: DS.type.title, fill: "yellow", t: W(35, 13) });
});
// 36 "It shortens and ends the dance."
shot(36, 0, (S) => {
  field(S, "brown", 2);
  const a = L.put(S, "ep49-waggle-dance", 960, 520, { s: 1.5, angle: 40, run: 1.0 });
  const b = L.put(S, "ep49-waggle-dance", 960, 520, { s: 1.5, angle: 40, run: 0.35 });
  swap(a, b, W(36, 1));
  L.put(S, "sign-stop", 1640, 520, { s: 1.5, t: W(36, 3) });
});
// 37 "Bees settle a disagreement with a buzz and a head-butt. No further questions."
shot(37, 0, (S) => {
  prairie(S);
  doc(S, 430, 940, { s: 1.2, face: "flat" });
  const a = S.grp(); bee(S, 1000, 600, { s: 2.4, parent: a });
  shift(a, W(37, 6), 0.5, [0, 0], [110, 0], "power2.in");
  bee(S, 1500, 600, { s: 2.4, flip: true });
  card(S, "NO FURTHER QUESTIONS", 960, 130, { fill: "yellow", t: W(37, 10) });
});
// 38 "Dave writes in the notebook: bees give better directions than I do."
shot(38, 0, (S) => {
  field(S, "wall", 1);
  dave(S, 430, 940, { s: 1.2, face: "embarrassed", pose: "hold" });
  L.put(S, "prop-pencil", 560, 770, { s: 1.4, rot: -30 });
  page(S, 1280, 510, 1.0, { lines: [["1. they can see my shirt", T0(S)], ["2. bees give better", W(38, 5)], ["    directions than I do", W(38, 5)]] });
  bee(S, 1700, 330, { s: 1.4, t: W(38, 5) });
});
// ===================== chapter 4: Names (clips 39-52) =====================
const sea = (S) => bg(S, "scene-beach-day");
const squig = (S, x, y, kind, t, o = {}) => { // a whistle "signature": three different squiggles, each its own colour
  const pts = { sine: [[-90, 0], [-60, -34], [-30, 0], [0, 34], [30, 0], [60, -34], [90, 0]], zig: [[-90, 20], [-60, -24], [-30, 20], [0, -24], [30, 20], [60, -24], [90, 20]], loop: [[-90, 10], [-50, -36], [-20, 24], [10, -30], [40, 20], [70, -24], [90, 10]] }[kind];
  const c = { sine: "blue", zig: "orange", loop: "green" }[kind], g = S.grp(o.parent);
  if (o.bubble !== false) DS.shape(S, rrect(x - 130, y - 72, 260, 144, DS.r.md), "white", { flat: true, w: "detail", t, parent: g });
  S.draw(smooth(pts.map(([a, b]) => [x + a, y + b])), t, 0, { c: DS.c(c, 2), w: DS.w.near, parent: g });
  return g;
};
// 39 "But do animals ever say who is who?"
shot(39, 0, (S) => {
  prairie(S);
  [["animal-dog", 300, 900, 1.5], ["animal-elephant", 740, 880, 1.3], ["animal-monkey", 1150, 900, 1.6], ["animal-sparrow", 1560, 900, 1.6]].forEach(([n, x, y, k], i) => {
    critter(S, n, x, y, { s: k, flip: i > 1 });
    card(S, "?", x, y - 330 * (n === "animal-sparrow" ? 0.45 : 1) + (n === "animal-elephant" ? 40 : 0), { size: DS.type.title, fill: "yellow", t: W(39, 5) + i * 0.2 });
  });
  card(S, "WHO IS WHO?", 960, 110, { size: DS.type.title });
});
// 40 "In twenty thirteen, researchers at the University of St Andrews played computer copies of signature whistles to wild bottlenose dolphins off the coast of Scotland."
shot(40, 0, (S) => {
  sea(S);
  L.put(S, "ride-rowing-boat", 560, 760, { s: 1.4 });
  L.put(S, "p2-boombox", 600, 640, { s: 1.0, t: W(40, 10) });
  waves(S, 700, 640, { s: 1.0, t: W(40, 13) });
  [[1100, 560, 1.3], [1450, 600, 1.1], [1720, 530, 1.2]].forEach(([x, y, k], i) => L.put(S, "animal-dolphin", x, y, { s: k, flip: true, t: W(40, 17) + i * 0.2 }));
  stud(S, "2013 · ST ANDREWS", W(40, 1));
  card(S, "SCOTLAND", 1500, 880, { size: DS.type.caption, t: W(40, 24) });
});
// 41 "Each dolphin reacted only when it heard the copy of its own whistle. One of the authors called it the first case of naming in mammals."
shot(41, 0, (S) => {
  bg(S, "scene-underwater-day");
  [["sine", 520, "A"], ["zig", 960, "B"], ["loop", 1400, "C"]].forEach(([kind, x, nm], i) => {
    L.put(S, "animal-dolphin", x, 640, { s: 1.3, flip: i === 0 });
    squig(S, x, 380, kind, S.start);
  });
  fadeG(S, squig(S, 960, 150, "sine", W(41, 8)), W(41, 8));
  card(S, "COPY OF A'S WHISTLE", 960, 250, { size: DS.type.caption, t: W(41, 8) });
  S.draw(circ(520, 640, 200, 110), W(41, 10), 0.4, { c: DS.c("green", 2), w: DS.w.near });
});
shot(41, 15, (S) => {
  bg(S, "scene-underwater-day");
  L.put(S, "animal-dolphin", 960, 640, { s: 2.2 });
  squig(S, 960, 330, "sine", W(41, 16));
  card(S, "FIRST NAMING IN MAMMALS", 960, 110, { size: DS.type.body, fill: "yellow", t: W(41, 20) });
});
// 42 "We had assumed names were ours. Nobody had asked the dolphins."
shot(42, 0, (S) => {
  sea(S);
  dave(S, 460, 950, { s: 1.15, face: "smug", pose: "hips" });
  card(S, "HELLO, I AM DAVE", 460, 730, { size: DS.type.caption, fill: "yellow", t: W(42, 3) });
  L.put(S, "animal-dolphin", 1350, 640, { s: 1.6, flip: true, t: W(42, 6) });
  squig(S, 1350, 330, "loop", W(42, 8));
});
// 43 "In twenty twenty-four, a team recorded wild elephants in Kenya."
shot(43, 0, (S) => {
  bg(S, "world-savanna-day");
  [[420, 800, 1.3, false], [980, 860, 1.5, false], [1500, 800, 1.2, true]].forEach(([x, y, k, f], i) => critter(S, "animal-elephant", x, y, { s: k, flip: f }));
  L.put(S, "prop-microphone", 140, 780, { s: 2.2, t: W(43, 5) });
  stud(S, "KENYA · 2024", W(43, 7));
});
// 44 "A computer model trained on four hundred and thirty-seven calls from ninety-nine callers could name the recipient of about a quarter of calls it had never heard."
shot(44, 0, (S) => {
  field(S, "sky", 1);
  L.put(S, "prop-laptop", 960, 560, { s: 3.2 });
  countUp(S, 420, 280, 0, 437, W(44, 5), 0.8, { size: DS.type.display, t0: W(44, 5), anchor: "middle" });
  card(S, "CALLS", 420, 390, { size: DS.type.caption, t: W(44, 5) });
  countUp(S, 1500, 280, 0, 99, W(44, 11), 0.4, { size: DS.type.display, t0: W(44, 11), anchor: "middle" });
  card(S, "CALLERS", 1500, 390, { size: DS.type.caption, t: W(44, 11) });
});
shot(44, 13, (S) => {
  field(S, "sky", 1);
  L.put(S, "info-pie-fraction", 620, 540, { s: 2.2, pct: 27.5, text: "27.5%", c: "green" });
  card(S, "RECIPIENT NAMED", 1360, 330, { size: DS.type.body, t: W(44, 14) });
  card(S, "ABOUT A QUARTER", 1360, 470, { size: DS.type.body, fill: "yellow", t: W(44, 18) });
  card(S, "OF CALLS IT HAD NEVER HEARD", 1360, 610, { size: DS.type.caption, t: W(44, 21) });
});
// 45 "Not a translator yet. A decent guesser."
shot(45, 0, (S) => {
  field(S, "wall", 1);
  L.put(S, "prop-laptop", 960, 640, { s: 3.4 });
  L.put(S, "fx-question-marks", 960, 560, { s: 1.4, t: W(45, 4) });
  card(S, "TRANSLATOR", 560, 220, { size: DS.type.title, t: W(45, 0) });
  xMark(S, 560, 220, 1.6, W(45, 1));
  card(S, "DECENT GUESSER", 1360, 220, { size: DS.type.title, fill: "green", t: W(45, 5) });
});
// 46 "Then they played calls to seventeen elephants. An elephant approached the speaker, on average, a hundred and twenty-eight seconds sooner when the call had been addressed to it."
shot(46, 0, (S) => {
  field(S, "sand", 1);
  Array.from({ length: 17 }, (_, i) => critter(S, "animal-elephant", 260 + (i % 6) * 280, 520 + Math.floor(i / 6) * 190, { s: 0.6, flip: false }));
  countUp(S, 960, 200, 0, 17, W(46, 5), 0.5, { size: DS.type.display, fmt: (n) => Math.round(n) + " ELEPHANTS", c: DS.c("ink"), t0: W(46, 5) });
});
shot(46, 7, (S) => {
  field(S, "sky", 1);
  panel(S, 960, 560, 1760, 700, T0(S));
  L.put(S, "p2-boombox", 1760, 420, { s: 0.9 }); L.put(S, "p2-boombox", 1760, 700, { s: 0.9 });
  const a = S.grp(), b = S.grp();
  critter(S, "animal-elephant", 260, 520, { s: 0.8, flip: true, parent: a }); critter(S, "animal-elephant", 260, 800, { s: 0.8, flip: true, parent: b });
  shift(a, W(46, 9), 3.0, [0, 0], [420, 0], "power1.out"); shift(b, W(46, 9), 2.0, [0, 0], [1060, 0], "power1.out");
  card(S, "CALL FOR ANOTHER", 600, 320, { size: DS.type.caption }); card(S, "ITS OWN CALL", 600, 600, { size: DS.type.caption, fill: "yellow" });
  countUp(S, 960, 150, 0, 128, W(46, 15), 1.4, { size: DS.type.title, fmt: (n) => Math.round(n) + " SECONDS SOONER", c: DS.c("red", 2), t0: W(46, 15), anchor: "middle" });
});
// 47 "The same year, a team in Israel showed that marmoset monkeys use special calls to label each other, and answer more accurately when called."
shot(47, 0, (S) => {
  bg(S, "scene-forest-day");
  DS.shape(S, rrect(260, 700, 1400, 50, DS.r.sm), "wood", { w: "mid" });
  L.put(S, "ep49-marmoset", 560, 700, { s: 2.2 });
  L.put(S, "ep49-marmoset", 1380, 700, { s: 2.2, flip: true });
  squig(S, 700, 430, "zig", W(47, 12));
  squig(S, 1240, 430, "zig", W(47, 18));
  stud(S, "ISRAEL · 2024", W(47, 5));
});
// 48 "Families seem to share a similar style, like a dialect."
shot(48, 0, (S) => {
  bg(S, "scene-forest-day");
  [[560, "zig"], [1360, "loop"]].forEach(([x, kind], i) => {
    DS.shape(S, rrect(x - 320, 700, 640, 44, DS.r.sm), "wood", { w: "mid" });
    [-200, 0, 200].forEach((dx, j) => L.put(S, "ep49-marmoset", x + dx, 700, { s: 1.5, flip: i === 1 }));
    squig(S, x, 400, kind, W(48, 5) + i * 0.4);
  });
  card(S, "A DIALECT", 960, 130, { size: DS.type.title, fill: "yellow", t: W(48, 8) });
});
// 49 "The elephant team was careful. The model might have picked up each caller's voice, and they are not sure where the name sits inside a call."
shot(49, 0, (S) => {
  field(S, "sky", 1);
  panel(S, 1080, 520, 1500, 460, T0(S));
  Array.from({ length: 40 }, (_, i) => S.fill(rect(400 + i * 30, 520 - (30 + 130 * Math.abs(Math.sin(i * 0.5) * Math.cos(i * 0.17))) / 2, 18, 30 + 130 * Math.abs(Math.sin(i * 0.5) * Math.cos(i * 0.17))), T0(S), 0, DS.c("blue", 0), 1));
  critter(S, "animal-elephant", 230, 900, { s: 1.0 });
  card(S, "THE CALLER'S VOICE?", 620, 790, { size: DS.type.caption, t: W(49, 9) });
  card(S, "?", 1090, 340, { size: DS.type.title, fill: "yellow", t: W(49, 19) }); card(S, "?", 1460, 700, { size: DS.type.title, fill: "yellow", t: W(49, 20) });
  card(S, "WHERE IS THE NAME?", 1180, 830, { size: DS.type.caption, t: W(49, 19) });
});
// 50 "So at least four species seem to label each other: humans, dolphins, elephants and marmosets."
shot(50, 0, (S) => {
  field(S, "sand", 1);
  [[330, "HUMANS", 10], [780, "DOLPHINS", 11], [1230, "ELEPHANTS", 12], [1680, "MARMOSETS", 14]].forEach(([x, w, i], k) => {
    panel(S, x, 560, 400, 600, T0(S));
    const t = undefined, tc = W(50, i);
    if (k === 0) dave(S, x, 810, { s: 0.85, face: "smile", t });
    if (k === 1) L.put(S, "animal-dolphin", x, 600, { s: 1.15, t });
    if (k === 2) L.put(S, "animal-elephant", x, 760, { s: 1.2, t });
    if (k === 3) L.put(S, "ep49-marmoset", x, 800, { s: 2.0, t });
    card(S, w, x, 900, { size: DS.type.caption, t: tc });
  });
  card(S, "AT LEAST FOUR SPECIES", 960, 130, { size: DS.type.body, fill: "yellow", t: W(50, 2) });
});
// 51 (@dave) "Dave, do I have a name?"
shot(51, 0, (S) => {
  sea(S);
  daveTalk(S, 460, 950, { s: 1.2, face: "worried" }, 51);
  card(S, "NAME: ?", 460, 730, { size: DS.type.caption, fill: "yellow" });
  critter(S, "animal-elephant", 960, 930, { s: 1.0, flip: true });
  L.put(S, "ep49-marmoset", 1260, 930, { s: 1.5, flip: true });
  L.put(S, "animal-dolphin", 1620, 640, { s: 1.0, flip: true });
});
// 52 "Not that anyone has found, Dave. Nobody has found animals naming humans."
shot(52, 0, (S) => {
  sea(S);
  dave(S, 460, 950, { s: 1.2, face: "sad" });
  card(S, "NAME: ?", 460, 730, { size: DS.type.caption, fill: "yellow" });
  xMark(S, 460, 730, 1.2, W(52, 6));
  critter(S, "animal-elephant", 960, 930, { s: 1.0, flip: true });
  L.put(S, "ep49-marmoset", 1260, 930, { s: 1.5, flip: true });
  L.put(S, "animal-dolphin", 1620, 640, { s: 1.0, flip: true });
  [[960, 560, "zig"], [1260, 640, "sine"], [1620, 380, "loop"]].forEach(([x, y, k], i) => squig(S, x, y - 100, k, W(52, 6) + i * 0.2, { bubble: false }));
  card(S, "ANIMALS NAMING HUMANS: NOT FOUND", 960, 110, { size: DS.type.caption, t: W(52, 6) });
});
// ===================== chapter 5: The other direction (clips 53-57) =====================
const park = (S) => bg(S, "scene-park-day");
// a row of click dots: gaps = spacing between neighbours; fades in (optionally one by one)
const dotsRow = (S, x, y, gaps, t, o = {}) => {
  const g = S.grp(o.parent), r = o.r || 14; let cx = x;
  [0].concat(gaps).forEach((gp, i) => { cx += gp; S.fill(circ(cx, y, r), t + i * (o.step || 0), 0.2, DS.c(o.c || "ink"), 1, g); });
  return g;
};
// 53 "Talking goes both ways. So what about animals understanding us?"
shot(53, 0, (S) => {
  prairie(S);
  dave(S, 440, 950, { s: 1.15, face: "happy", pose: "point" });
  L.put(S, "animal-dog-sit", 1400, 940, { s: 2.0, flip: true });
  arrowR(S, 760, 560, 1020, 560, W(53, 1)); arrowR(S, 1020, 680, 760, 680, W(53, 1) + 0.3);
  card(S, "BOTH WAYS", 960, 110, { fill: "yellow", t: W(53, 1) });
  L.put(S, "bubble-round", 760, 330, { s: 0.6, text: "Sit.", tail: "left", t: W(53, 7) });
});
// 54 "In twenty eleven, researchers at Wofford College reported that a border collie named Chaser had learned the names of one thousand and twenty-two objects over three years of training."
shot(54, 0, (S) => {
  park(S);
  L.put(S, "ep49-collie", 960, 930, { s: 2.3, t: W(54, 10) });
  stud(S, "2011 · WOFFORD COLLEGE", W(54, 4));
  card(S, "CHASER", 960, 250, { size: DS.type.title, fill: "yellow", t: W(54, 12) });
});
const TOYS = ["prop-ball", "prop-teddy", "prop-kite", "prop-yoyo", "prop-ball", "prop-teddy"];
shot(54, 15, (S) => {
  park(S);
  L.put(S, "ep49-collie", 330, 930, { s: 1.7 });
  for (let i = 0; i < 40; i++) L.put(S, TOYS[i % TOYS.length], 760 + (i % 8) * 140, 380 + Math.floor(i / 8) * 130, { s: 0.55, t: W(54, 17) + i * 0.06 });
  countUp(S, 1300, 250, 0, 1022, W(54, 19), 2.0, { size: DS.type.display, t0: W(54, 19), anchor: "middle", c: DS.c("red", 2) });
  card(S, "OBJECTS", 1300, 940, { size: DS.type.body, t: W(54, 23) });
  card(S, "3 YEARS OF TRAINING", 960, 110, { size: DS.type.caption, t: W(54, 25) });
});
// 55 "She could even learn a new name by elimination. Given one unfamiliar toy among familiar ones, she picked it when she heard an unfamiliar word."
shot(55, 0, (S) => {
  park(S);
  doc(S, 280, 950, { s: 1.1, face: "smile" });
  L.put(S, "ep49-collie", 760, 940, { s: 1.5 });
  TOYS.slice(0, 4).forEach((n, i) => L.put(S, n, 1090 + i * 150, 800, { s: 1.0, t: W(55, 13) + i * 0.12 }));
  L.put(S, "p2-drone", 1720, 800, { s: 1.0, t: W(55, 10) });
  S.draw(circ(1720, 790, 110, 90), W(55, 17), 0.4, { c: DS.c("red", 2), w: DS.w.near });
  L.put(S, "bubble-round", 520, 420, { s: 0.6, text: "A new word!", tail: "left", t: W(55, 21) });
  card(S, "BY ELIMINATION", 1300, 530, { size: DS.type.caption, t: W(55, 7), fill: "yellow" });
});
// 56 "The authors said this kind of understanding is normally credited to children."
shot(56, 0, (S) => {
  park(S);
  L.put(S, "ep49-collie", 760, 940, { s: 1.8 });
  guy(S, "man02", 1300, 950, { s: 0.95, body: "kid", face: "happy", t: W(56, 8) });
  L.put(S, "prop-teddy", 1500, 880, { s: 1.5, t: W(56, 8) });
  card(S, "NORMALLY: CHILDREN", 1350, 380, { size: DS.type.body, fill: "yellow", t: W(56, 8) });
});
// 57 "She understood a thousand and twenty-two words. She said none of them back."
shot(57, 0, (S) => {
  park(S);
  L.put(S, "ep49-collie", 960, 940, { s: 2.2 });
  card(S, "UNDERSTOOD: 1,022", 560, 250, { size: DS.type.caption, fill: "green", t: W(57, 1) });
  tick(S, 560, 170, 1.0, W(57, 5));
  L.put(S, "bubble-round", 1300, 400, { s: 0.6, text: "...", tail: "left", t: W(57, 8) });
  card(S, "SAID BACK: 0", 1500, 250, { size: DS.type.caption, fill: "red", tc: "red", t: W(57, 8) });
});
// ===================== chapter 6: The whales (clips 58-65) =====================
const whaleSea = (S) => bg(S, "scene-underwater-day");
// 58 "Now the hard one. Sperm whales make patterns of short bursts of clicks called codas."
shot(58, 0, (S) => {
  whaleSea(S);
  L.put(S, "ep49-sperm-whale", 960, 640, { s: 1.5 });
  card(S, "THE HARD ONE", 960, 130, { size: DS.type.display, fill: "yellow", t: W(58, 2) });
});
shot(58, 4, (S) => {
  whaleSea(S);
  L.put(S, "ep49-sperm-whale", 640, 640, { s: 1.3, clicks: true });
  [[1450, 330, [70, 70, 70, 70]], [1450, 470, [40, 40, 120, 40]], [1450, 610, [90, 40, 40, 90, 40]]].forEach(([x, y, gp], i) => dotsRow(S, x - 200, y, gp, W(58, 10) + i * 0.3, { step: 0.12 }));
  card(S, "CODAS", 1450, 190, { size: DS.type.title, fill: "yellow", t: W(58, 14) });
});
// 59 "In twenty twenty-four, a team led from the Massachusetts Institute of Technology analysed nearly nine thousand codas from whales off the island of Dominica."
shot(59, 0, (S) => {
  whaleSea(S);
  [[400, 640, 0.9], [1000, 560, 1.0], [1500, 700, 0.9]].forEach(([x, y, k], i) => L.put(S, "ep49-sperm-whale", x, y, { s: k, flip: i === 1 }));
  stud(S, "MIT · 2024", W(59, 8));
  countUp(S, 960, 330, 0, 9000, W(59, 13), 2.0, { size: DS.type.display, fmt: (n) => "~" + Math.round(n).toLocaleString("en-US"), t0: W(59, 13), anchor: "middle", c: DS.c("red", 2) });
  card(S, "CODAS", 960, 430, { size: DS.type.body, t: W(59, 13) });
  L.put(S, "sign-location-pin", 1620, 250, { s: 1.4, t: W(59, 22) });
  card(S, "DOMINICA", 1620, 380, { size: DS.type.caption, t: W(59, 22) });
});
// 60 "They found that codas combine four features: rhythm, tempo, and two finer features they named rubato and ornamentation."
shot(60, 0, (S) => {
  field(S, "sky", 1);
  const cells = [[500, 330, "RHYTHM", 7, [90, 40, 40, 90], null], [1420, 330, "TEMPO", 8, [30, 30, 30, 30, 30, 30], null], [500, 700, "RUBATO", 15, [30, 40, 52, 66, 82], null], [1420, 700, "ORNAMENTATION", 17, [70, 70, 70], 24]];
  cells.forEach(([x, y, lab, i, gp, extra]) => {
    const t = W(60, i);
    panel(S, x, y, 800, 300, T0(S));
    card(S, lab, x, y - 90, { size: DS.type.caption, fill: "yellow", t });
    dotsRow(S, x - 130, y + 40, gp, T0(S), {});
    if (extra) dotsRow(S, x - 130 + gp.reduce((a, b) => a + b, 0) + extra, y + 40, [], t + 0.9, { c: "red", r: 9 });
  });
  card(S, "FOUR FEATURES", 960, 110, { size: DS.type.body, t: W(60, 5) });
});
// 61 "These can be mixed freely into a large set of distinct codas."
shot(61, 0, (S) => {
  field(S, "sky", 1);
  panel(S, 960, 550, 1600, 640, T0(S));
  for (let i = 0; i < 30; i++) { const a = 30 + ((i * 37) % 5) * 22, b = 30 + ((i * 53 + 3) % 5) * 22, c = 30 + ((i * 11 + 1) % 4) * 26; dotsRow(S, 300 + (i % 6) * 250 - 60, 330 + Math.floor(i / 6) * 100, [a, b, c], T0(S), { r: 11, c: ["ink", "blue", "green"][i % 3] }); }
  card(S, "A LARGE SET OF DISTINCT CODAS", 960, 120, { size: DS.type.caption, t: W(61, 7) });
});
// 62 "Some compared it to a phonetic alphabet. But the project's leaders were careful. One said the meaning of many codas remains unknown."
shot(62, 0, (S) => {
  field(S, "sky", 1);
  ["A", "B", "C", "D", "E"].forEach((ch, i) => {
    const x = 340 + i * 310;
    card(S, ch, x, 400, { size: DS.type.display });
    dotsRow(S, x - 80, 560, [[50, 50, 50], [30, 90], [90, 30, 30], [40, 40, 80], [70, 70]][i], T0(S), {});
  });
  card(S, "A PHONETIC ALPHABET?", 960, 150, { size: DS.type.body, fill: "yellow", t: W(62, 5) });
});
shot(62, 7, (S) => {
  field(S, "sky", 1);
  docTalk(S, 520, 950, { s: 1.15, face: "smile" }, 62);
  L.put(S, "bubble-round", 1150, 400, { s: 0.95, text: "The meaning of many codas is unknown.", tail: "left", t: W(62, 15) });
  [[1500, 700, [50, 50, 50]], [1250, 800, [30, 90, 30]], [1650, 820, [90, 40]]].forEach(([x, y, gp], i) => { dotsRow(S, x - 70, y, gp, W(62, 19) + i * 0.2, { r: 11 }); L.put(S, "fx-question-marks", x, y - 70, { s: 0.5, t: W(62, 20) + i * 0.2 }); });
});
// 63 "So the whales have an alphabet with no dictionary."
shot(63, 0, (S) => {
  field(S, "wall", 1);
  L.put(S, "prop-book-open", 560, 560, { s: 3.2 });
  ["A", "B", "C"].forEach((ch, i) => dotsRow(S, 410 + i * 140, 560, [30], T0(S), { r: 12 }));
  card(S, "ALPHABET", 560, 250, { size: DS.type.body, t: W(63, 4) });
  L.put(S, "prop-book-closed", 1400, 560, { s: 3.2 });
  card(S, "DICTIONARY", 1400, 250, { size: DS.type.body, t: W(63, 8) });
  card(S, "?", 1400, 560, { size: DS.type.display, fill: "yellow", t: W(63, 8) });
  xMark(S, 1400, 560, 3.2, W(63, 7));
});
// 64 "Dave asks a whale what a coda means. It replies with a little rubato."
shot(64, 0, (S) => {
  sea(S);
  dave(S, 400, 950, { s: 1.2, face: "confused", pose: "point" });
  L.put(S, "bubble-round", 760, 360, { s: 0.8, text: "What does a coda mean?", tail: "left", t: W(64, 3) });
  L.put(S, "ep49-sperm-whale", 1570, 600, { s: 0.95, flip: false, t: W(64, 8), clicks: false });
  dotsRow(S, 1250, 420, [30, 40, 52, 66, 82], W(64, 12), { step: 0.15 });
  card(S, "A LITTLE RUBATO", 1500, 290, { size: DS.type.caption, fill: "yellow", t: W(64, 12) });
});
// 65 "Dave looks at the notebook. It still says: they can see my shirt."
shot(65, 0, (S) => {
  field(S, "wall", 1);
  dave(S, 430, 940, { s: 1.2, face: "tired", pose: "look-down" });
  page(S, 1260, 510, 1.0, { lines: [["1. they can see my shirt", T0(S)], ["2. bees give better", T0(S)], ["    directions than I do", T0(S)]] });
  S.draw(circ(1290, 358, 270, 38), W(65, 6), 0.5, { c: DS.c("red", 2), w: DS.w.near });
});
// ===================== chapter 7: The twist (clips 66-73) =====================
// 66 "Here is the twist. Look at what has been decoded so far. Where the food is. Which shirt is coming. Who is calling whom."
shot(66, 0, (S) => {
  field(S, "sand", 1);
  card(S, "THE TWIST", 960, 130, { size: DS.type.display, fill: "yellow", t: W(66, 3) });
  [[360, W(66, 12), "WHERE THE FOOD IS"], [960, W(66, 16), "WHICH SHIRT IS COMING"], [1560, W(66, 20), "WHO IS CALLING WHOM"]].forEach(([x, t, lab], k) => {
    panel(S, x, 570, 500, 560, T0(S));
    if (k === 0) { L.put(S, "flowers-daisy", x - 70, 640, { s: 1.8 }); bee(S, x + 90, 470, { s: 1.5 }); }
    if (k === 1) { L.put(S, "ep49-tee", x, 760, { s: 1.9, c: "yellow" }); }
    if (k === 2) { L.put(S, "animal-elephant", x - 70, 700, { s: 1.0 }); squig(S, x + 20, 460, "sine", T0(S), { bubble: true }); }
    card(S, lab, x, 880, { size: DS.type.caption, t });
  });
});
// 67 "Mickey Pardo, one of the elephant researchers, says names are probably only one small part of those calls."
shot(67, 0, (S) => {
  field(S, "sky", 1);
  panel(S, 1100, 520, 1500, 520, T0(S));
  Array.from({ length: 40 }, (_, i) => { const h = 30 + 150 * Math.abs(Math.sin(i * 0.5) * Math.cos(i * 0.17)); S.fill(rect(450 + i * 30, 520 - h / 2, 18, h), T0(S), 0, DS.c(i >= 17 && i < 22 ? "red" : "blue", 0), 1); });
  critter(S, "animal-elephant", 250, 900, { s: 1.2 });
  stud(S, "MICKEY PARDO · ELEPHANT RESEARCHER", W(67, 0));
  card(S, "THE NAME", 1010, 800, { size: DS.type.caption, fill: "yellow", t: W(67, 12) });
  card(S, "ONE SMALL PART", 1010, 220, { size: DS.type.caption, t: W(67, 12) });
});
// 68 "And the animals in these studies were not answering our questions. They were running their own lives."
shot(68, 0, (S) => {
  prairie(S);
  dave(S, 400, 950, { s: 1.15, face: "worried", pose: "reach" });
  L.put(S, "prop-microphone", 600, 770, { s: 1.5 });
  L.put(S, "bubble-round", 700, 330, { s: 0.7, text: "Tell me!", tail: "left" });
  xMark(S, 940, 540, 1.6, W(68, 7));
  [["ep49-prairie-dog", 1050, 880, 1.8], ["animal-elephant", 1450, 880, 1.3], ["animal-sparrow", 1750, 900, 1.5]].forEach(([n, x, y, k], i) => critter(S, n, x, y, { s: k, flip: false, t: W(68, 6) + i * 0.15 }));
});
shot(68, 11, (S) => {
  prairie(S);
  L.put(S, "flowers-daisy", 330, 910, { s: 2.0 }); bee(S, 380, 600, { s: 1.8 });
  critter(S, "animal-elephant", 900, 900, { s: 1.5 });
  pdog(S, 1400, 880, { s: 1.6, alarm: true });
  critter(S, "animal-sparrow", 1730, 910, { s: 1.6, flip: true });
  card(S, "THEIR OWN LIVES", 960, 120, { size: DS.type.title, fill: "yellow", t: W(68, 13) });
});
// 69 "What would animals say to Dave? Our guess is four things. Where. What. Who. Danger."
shot(69, 0, (S) => {
  field(S, "sand", 1);
  card(S, "OUR GUESS: FOUR THINGS", 960, 110, { size: DS.type.body, t: W(69, 6) });
  [[330, "WHERE", 11], [780, "WHAT", 12], [1230, "WHO", 13], [1680, "DANGER", 14]].forEach(([x, w, i], k) => {
    const t = W(69, i);
    panel(S, x, 560, 400, 560, T0(S));
    if (k === 0) L.put(S, "sign-location-pin", x, 520, { s: 2.2 });
    if (k === 1) L.put(S, "ep49-raptor", x, 520, { s: 0.95, kind: "hawk" });
    if (k === 2) { card(S, "HELLO", x, 470, { size: DS.type.caption }); squig(S, x, 600, "sine", T0(S), { bubble: false }); }
    if (k === 3) L.put(S, "ep-warning-triangle", x, 520, { s: 2.2 });
    card(S, w, x, 800, { size: DS.type.body, fill: "yellow", t });
  });
});
// 70 "Dave writes four words at the top of the secrets page."
shot(70, 0, (S) => {
  field(S, "wall", 1);
  dave(S, 430, 940, { s: 1.2, face: "determined", pose: "hold" });
  L.put(S, "prop-pencil", 560, 770, { s: 1.4, rot: -30 });
  page(S, 1280, 510, 1.0, { head: [["WHERE", W(70, 2)], ["WHAT", W(70, 2) + 0.35], ["WHO", W(70, 2) + 0.7], ["DANGER", W(70, 2) + 1.05]], lines: [["1. they can see my shirt", T0(S)], ["2. bees give better", T0(S)], ["    directions than I do", T0(S)]], dy: 100 });
});
// 71 (@dave) "Where. What. Who. Danger. Dave, is that all there is?"
shot(71, 0, (S) => {
  prairie(S);
  daveTalk(S, 480, 950, { s: 1.2, face: "worried", pose: "hold" }, 71);
  L.put(S, "prop-notebook", 650, 770, { s: 1.5 });
  doc(S, 1440, 950, { s: 1.15, face: "smile", flip: true });
  ["WHERE", "WHAT", "WHO", "DANGER"].forEach((w, i) => card(S, w, 520 + i * 270, 190, { size: DS.type.caption, fill: "yellow", t: W(71, i) }));
});
// 72 (@doc) "Dave, that is most of life."
shot(72, 0, (S) => {
  prairie(S);
  dave(S, 480, 950, { s: 1.2, face: "relieved" });
  docTalk(S, 1440, 950, { s: 1.15, face: "smile", flip: true }, 72);
  ["WHERE", "WHAT", "WHO", "DANGER"].forEach((w, i) => card(S, w, 520 + i * 270, 190, { size: DS.type.caption, fill: "yellow" }));
});
// 73 "The animals are not hiding secrets. They are telling each other where things are, and who is who."
shot(73, 0, (S) => {
  prairie(S);
  L.put(S, "prop-padlock", 960, 260, { s: 2.0 });
  xMark(S, 960, 260, 2.2, W(73, 4));
  card(S, "NO SECRETS", 960, 110, { size: DS.type.caption, fill: "green", t: W(73, 4) });
});
shot(73, 6, (S) => {
  prairie(S);
  L.put(S, "flowers-daisy", 250, 910, { s: 1.8 });
  bee(S, 420, 640, { s: 2.0 }); bee(S, 700, 600, { s: 2.0, flip: true });
  L.put(S, "sign-location-pin", 560, 420, { s: 1.3, t: W(73, 11) });
  card(S, "WHERE", 560, 280, { size: DS.type.caption, t: W(73, 11) });
  critter(S, "animal-elephant", 1250, 900, { s: 1.3 }); critter(S, "animal-elephant", 1650, 900, { s: 1.1, flip: true });
  squig(S, 1450, 520, "loop", W(73, 15));
  card(S, "WHO IS WHO", 1450, 380, { size: DS.type.caption, t: W(73, 15) });
});
// ===================== chapter 8: The prize (clips 74-81) =====================
// 74 "So could machines find more, or even talk back?"
shot(74, 0, (S) => {
  sea(S);
  L.put(S, "crt-robot-helper", 460, 950, { s: 1.5, face: "smile" });
  L.put(S, "animal-dolphin", 1450, 650, { s: 1.5, flip: true });
  L.put(S, "bubble-round", 760, 360, { s: 0.7, text: "...?", tail: "left", t: W(74, 7) });
  card(S, "MACHINES?", 460, 380, { size: DS.type.caption, t: W(74, 2) });
});
// 75 "In May twenty twenty-four, a foundation and Tel Aviv University launched a challenge worth up to ten million dollars for talking with another species."
shot(75, 0, (S) => {
  field(S, "sky", 1);
  stud(S, "MAY 2024 · TEL AVIV UNIVERSITY", W(75, 1));
  L.put(S, "sport-trophy", 560, 560, { s: 3.4 });
  L.put(S, "ep-cash-pile", 1470, 800, { s: 1.3 });
  card(S, "UP TO", 1280, 260, { size: DS.type.caption, t: W(75, 14) });
  countUp(S, 1300, 430, 0, 10000000, W(75, 16), 2.0, { size: DS.type.display, fmt: (n) => "$" + Math.round(n).toLocaleString("en-US"), t0: W(75, 16), anchor: "middle", c: DS.c("green", 2) });
});
// 76 "The grand prize needs a kind of Turing test: the animal has to communicate independently, without recognising that it is communicating with humans."
shot(76, 0, (S) => {
  field(S, "sand", 1);
  DS.shape(S, rect(900, 200, 120, 740), "red", { w: "mid" });
  L.put(S, "prop-laptop", 560, 760, { s: 2.2 });
  L.put(S, "p2-boombox", 440, 560, { s: 1.0 });
  L.put(S, "animal-dolphin", 1450, 760, { s: 1.5, flip: true });
  squig(S, 1450, 420, "zig", W(76, 12));
  L.put(S, "thought-pic", 1700, 300, { s: 0.35, noTail: true, text: "?", size: DS.type.title, t: W(76, 15) });
  card(S, "A TURING-STYLE TEST", 960, 110, { size: DS.type.body, fill: "yellow", t: W(76, 7) });
});
// 77 "A prairie dog would never pass. It announces the human before the human arrives."
shot(77, 0, (S) => {
  prairie(S);
  pdog(S, 460, 870, { s: 2.1, mouth: true, t: W(77, 1) });
  fadeG(S, waves(S, 760, 540, { s: 1.6 }), W(77, 7));
  dave(S, 1620, 880, { s: 0.55, face: "smile", flip: true, t: W(77, 8) });
  L.put(S, "stamp-nope", 1250, 300, { s: 1.4, text: "FAIL", rot: -8, t: W(77, 4) });
});
// 78 "There is also a hundred thousand dollar prize every year for the best progress."
shot(78, 0, (S) => {
  field(S, "sky", 1);
  L.put(S, "prop-calendar", 500, 560, { s: 2.8 });
  L.put(S, "money-bag", 1450, 640, { s: 2.6 });
  countUp(S, 1450, 330, 0, 100000, W(78, 4), 1.6, { size: DS.type.display, fmt: (n) => "$" + Math.round(n).toLocaleString("en-US"), t0: W(78, 4), anchor: "middle", c: DS.c("green", 2) });
  card(S, "EVERY YEAR", 500, 250, { size: DS.type.body, t: W(78, 8) });
  card(S, "FOR THE BEST PROGRESS", 960, 910, { size: DS.type.caption, t: W(78, 12) });
});
// 79 "Four finalists in twenty twenty-five, from the United States, Germany, France and Israel, were working with dolphins, nightingales, cuttlefish and monkeys."
shot(79, 0, (S) => {
  field(S, "sand", 1);
  stud(S, "FOUR FINALISTS · 2025", W(79, 0));
  [["USA", 7], ["GERMANY", 9], ["FRANCE", 10], ["ISRAEL", 12]].forEach(([w, i], k) => card(S, w, 360 + k * 400, 300, { size: DS.type.body, t: W(79, i) }));
  [[16, "animal-dolphin", 360, 700, 1.2, true], [17, "animal-sparrow", 760, 760, 1.5, false], [18, "ep49-cuttlefish", 1160, 700, 1.0, false], [20, "animal-monkey", 1560, 780, 1.5, false]].forEach(([i, n, x, y, k, f]) => L.put(S, n, x, y, { s: k, flip: f }));
  [["DOLPHINS", 16, 360], ["NIGHTINGALES", 17, 760], ["CUTTLEFISH", 18, 1160], ["MONKEYS", 20, 1560]].forEach(([w, i, x]) => card(S, w, x, 900, { size: DS.type.caption, t: W(79, i) }));
});
// 80 "So far, nobody has claimed the grand prize."
shot(80, 0, (S) => {
  field(S, "wall", 1);
  L.put(S, "furn-pedestal", 960, 930, { s: 1.8 });
  L.put(S, "sport-trophy", 960, 470, { s: 3.2 });
  L.put(S, "nat-spider-web", 1500, 280, { s: 2.2, t: W(80, 2) });
  L.put(S, "animal-spider", 1500, 600, { s: 1.4, t: W(80, 3) });
  card(S, "UNCLAIMED", 960, 130, { size: DS.type.title, fill: "yellow", t: W(80, 0) });
});
// 81 "Dave decides to enter. He has a notebook."
shot(81, 0, (S) => {
  field(S, "sand", 1);
  dave(S, 560, 950, { s: 1.2, face: "determined", pose: "point" });
  L.put(S, "prop-notebook", 800, 770, { s: 1.8, t: W(81, 6) });
  L.put(S, "sport-trophy", 1500, 580, { s: 3.0 });
  card(S, "ENTER", 1500, 190, { size: DS.type.title, fill: "green", t: W(81, 1) });
});
// ===================== chapter 9: Same Dave (clips 82-85) =====================
// 82 "Dave looks down at his yellow shirt, takes it off and puts on a green one."
shot(82, 0, (S) => {
  prairie(S);
  pdog(S, 1500, 790, { s: 1.4, flip: true });
  dave(S, 760, 950, { s: 1.3, face: "thinking", pose: "look-down", tee: "none" });
  const y = L.put(S, "ep49-tee", 760, 950, { s: 1.3, c: "yellow" });
  tl.to(y, { opacity: 0, attr: { transform: y.getAttribute("transform") + " translate(0 -60)" }, duration: 0.6, ease: "power1.in" }, W(82, 7));
  const g = L.put(S, "ep49-tee", 760, 950, { s: 1.3, c: "green" }); g.setAttribute("opacity", 0);
  tl.to(g, { opacity: 1, duration: 0.5 }, W(82, 13));
});
// 83 "The prairie dog on the mound looks at him for a long moment."
shot(83, 0, (S) => {
  prairie(S);
  pdog(S, 700, 890, { s: 2.8 });
  dave(S, 1560, 920, { s: 0.6, face: "smile", flip: true });
}, { cam: "push" });
// 84 (@kid) "Tall human. Same as before. Coming this way."
shot(84, 0, (S) => {
  prairie(S);
  pdogTalk(S, 560, 880, { s: 2.5, mouth: true }, 84);
  dave(S, 1560, 920, { s: 0.6, face: "smile", flip: true });
  say(S, 1160, 330, "Tall human. Same as before. Coming this way.", { tail: "left", s: 1.05, t: W(84, 0) });
});
// 85 "Dave closes his notebook. To a prairie dog, it is the same Dave."
shot(85, 0, (S) => {
  prairie(S, { sky: "dusk", ground: "sand", sun: [1500, 330] });
  dave(S, 760, 950, { s: 1.3, face: "smile", pose: "hold" });
  L.put(S, "prop-notebook", 940, 770, { s: 1.5 });
  pdog(S, 1500, 820, { s: 1.5, flip: true });
}, { cam: "pull" });
// ---------- run: sort the shots by cue, cut each picture 0.25 s after its first word (0.6 s crossfade before it) ----------
SHOTS.sort((a, b) => a.c - b.c || a.w - b.w);
const WINS = sceneWindows(SHOTS.map((s) => [s.c, s.w]), -0.25);
SHOTS.forEach((s, k) => {
  const [a, b] = WINS[k], S = scene(a, b, s.o || {}), g0 = S.g.parentNode;
  s.fn(S);
  // ponytail: library scenes are heavy; off-screen pictures leave the layout tree so a seek only lays out the 1-2 live ones
  if (k > 0) { g0.style.display = "none"; tl.set(g0, { display: "inline" }, Math.max(0, a - 0.6)); }
  if (k < SHOTS.length - 1) tl.set(g0, { display: "none" }, b);
});
