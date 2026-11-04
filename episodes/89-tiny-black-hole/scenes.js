// look: still
// motion: v2
// @library auto
// Episode 89: What If You Found a Tiny Black Hole in Your Pocket? (~7 min mission format). Dave = kit-dave (Look K stick figure) on the Lost Property mission, 3:50 pm to 5:00 pm.
// New library file: library/ep89-tiny-black-hole.js (ep89-tin, -dot, -mint, -keys, -bowler, -pigeon, -counter, -sign, -office, -coat-closeup, -coat, -glow, -zone, -form, -stamp, -hud, -clockcard, -cutaway, -guide).
// Runners: the tin (blue, generic Danish-style butter cookie tin) in Dave's hands; the mint that orbits first and follows the tin down at the end; the HUD (clock card top-right all episode, # hud: tags top-left, PULL ZONE 2.5 M from clip 24 until the tin goes down).
// VISUAL SAFETY: nothing flashes; the gamma glow is a calm static warm halo held by the tin; the street leans, nobody falls; the final fall is a calm tin sinking through cutaway layers.
const SHOTS = [];
const shot = (c, w, fn, o) => SHOTS.push({ c, w, fn, o });
const END = (c) => CLIP(c)[1];
const T0 = (S) => Math.max(0, S.start - 0.6);
// ---------- text ----------
const card = (S, s, x, y, o = {}) => { const t = o.t ?? T0(S); if (t > S.start + 0.3) S.sfx(t, "pop", x); return DS.card(S, s, x, y, Object.assign({ size: DS.type.caption }, o, { t })); };  // a card landing on its word gets a soft pop
const txt = (S, s, x, y, o = {}) => S.text(s, x, y, Object.assign({ size: DS.type.small, c: DS.c("ink") }, o, { t: o.t ?? T0(S) }));
const big = (S, s, x, y, o = {}) => txt(S, s, x, y, Object.assign({ size: DS.type.title, c: DS.c("ink") }, o));
// ---------- small kit ----------
const field = (S, name, tone = 1) => S.fill(rect(-40, -40, 2000, 1160), T0(S), 0, DS.c(name, tone), 1);
const fadeG = (S, g, t, dur = 0.35) => { if (t !== undefined && t > S.start + 0.05) tl.fromTo(g, { opacity: 0 }, { opacity: 1, duration: dur }, t); return g; };
const fadeOut = (g, t, dur = 0.35, to = 0) => tl.to(g, { opacity: to, duration: dur }, t);
const swap = (a, b, t, dur = 0.35) => { fadeOut(a, t, dur); tl.fromTo(b, { opacity: 0 }, { opacity: 1, duration: dur, immediateRender: false }, t); b.setAttribute("opacity", 0); };
const shift = (g, t, dur, from, to, ease = "power1.inOut") => tl.fromTo(g, { attr: { transform: `translate(${from[0]} ${from[1]})` } }, { attr: { transform: `translate(${to[0]} ${to[1]})` }, duration: dur, ease, immediateRender: false }, t);
const spin = (g, t, dur, from, to, cx, cy, ease = "power1.inOut") => tl.fromTo(g, { attr: { transform: `rotate(${from} ${cx} ${cy})` } }, { attr: { transform: `rotate(${to} ${cx} ${cy})` }, duration: dur, ease, immediateRender: false }, t);
const fillP = (S, d, name, tone, op = 1, parent) => S.fill(d, T0(S), 0, DS.c(name, tone), op, parent);
// seek-safe orbit: item group travels on an ellipse round (cx, cy) from time t0 for dur seconds
const orbit = (S, name, cx, cy, rx, ry, o = {}) => {
  const g = S.grp(o.parent), a0 = o.a0 ?? 0, turns = o.turns ?? 2, t0 = o.t0 ?? S.start, dur = o.dur ?? Math.max(1, S.end - t0);
  L.put(S, name, 0, 0, Object.assign({ s: 1 }, o.opt || {}, { parent: g }));
  const pos = (a) => `translate(${cx + Math.cos(a) * rx} ${cy + Math.sin(a) * ry})`;
  g.setAttribute("transform", pos(a0));
  const v = { a: a0 };
  tl.fromTo(v, { a: a0 }, { a: a0 + Math.PI * 2 * turns, duration: dur, ease: "none", immediateRender: false, onUpdate: () => g.setAttribute("transform", pos(v.a)) }, t0);
  if (o.t !== undefined && o.t > S.start + 0.05) { tl.set(g, { opacity: 0 }, 0); tl.set(g, { opacity: 1 }, o.t); }
  return g;
};
const countUp = (S, x, y, from, to, t, dur, o = {}) => {
  const fmt = o.fmt || ((n) => Math.round(n).toLocaleString("en-US")), te = S.text(fmt(from), x, y, { size: o.size || DS.type.title, c: o.c || DS.c("red", 2), t: o.t0 ?? t, anchor: o.anchor, parent: o.parent });
  const v = { n: from }; te.textContent = fmt(from);
  tl.fromTo(v, { n: from }, { n: to, duration: dur, ease: o.ease || "power1.out", immediateRender: false, onUpdate: () => (te.textContent = fmt(v.n)) }, t);
  return te;
};
// ---------- people and props ----------
const dave = (S, x, gy, o = {}) => L.put(S, "kit-dave", x, gy, Object.assign({ s: 1.1, face: "smile" }, o));
const tin = (S, x, y, o = {}) => L.put(S, "ep89-tin", x, y, Object.assign({ s: 0.6 }, o));
// Dave carrying the tin in both hands (hold pose): returns the tin's centre
const HOLD = [66, -150];
const held = (S, x, gy, o = {}) => {
  const s = o.s ?? 1.1, f = o.flip ? -1 : 1;
  dave(S, x, gy, Object.assign({ pose: "hold", face: "worried" }, o));
  const tx = x + f * HOLD[0] * s, ty = gy + HOLD[1] * s;
  tin(S, tx, ty, { s: 0.52 * s, glow: o.glow, t: o.tinT, flip: o.flip });
  return [tx, ty];
};
const person = (S, style, x, gy, o = {}) => L.put(S, "person", x, gy, Object.assign({ style, s: 1.05, face: "smile" }, o));
const tag = (S, name, x, y, o = {}) => card(S, name, x, y, Object.assign({ size: DS.type.caption * 0.8, fill: "yellow" }, o));
const doc = (S, x, gy, o = {}) => person(S, "girl03", x, gy, Object.assign({ acc: ["glasses"], outfit: "labcoat", pose: "hold" }, o));
const brain = (S, x, gy, o = {}) => L.put(S, o.kind || "kit-brain-stern", x, gy, Object.assign({ s: 0.9 }, o));
const dot = (S, x, y, o = {}) => L.put(S, "ep89-dot", x, y, Object.assign({ R: 14 }, o));
// ---------- scenes ----------
const office = (S, hh = 4, mm = 58) => {
  L.put(S, "ep89-office", 0, 0);
  L.put(S, "ep89-sign", 960, 170, { s: 1 });
  L.put(S, "ep-wall-clock", 960, 400, { s: 1.0, h: hh, m: mm });
};
const counter = (S, x = 1130, gy = 900, o = {}) => L.put(S, "ep89-counter", x, gy, o);
const clerk = (S, x = 1260, gy = 870, o = {}) => person(S, "man04", x, gy, Object.assign({ body: "elderly", acc: ["glasses"], hair: "none", face: "flat", pose: "hold", s: 1.1 }, o));
const street = (S, o = {}) => L.put(S, o.name || "scene-city-street-day", 0, 0, o);
const park = (S) => L.put(S, "scene-park-day", 0, 0);
// ---------- HUD: clock card top-right all episode; # hud: tags top-left ----------
const CLOCK = [[1, "4:58 PM"], [3, "3:50 PM"], [11, "3:58 PM"], [16, "4:10 PM"], [24, "4:22 PM"], [32, "4:35 PM"], [38, "4:45 PM"], [46, "4:58 PM"], [57, "5:00 PM"]];
const HUDS = [[4, "3:50 PM / CLOSES AT 5:00 PM", 6], [11, "MASS: A BILLION TONNES / SIZE: SMALLER THAN AN ATOM", 13], [18, "100 BILLION DEGREES / 360 MEGAWATTS", 20], [24, "PULL ZONE: 2.5 M", 26], [35, "ONE SWING THROUGH EARTH: ABOUT 84 MINUTES", 37]];
const CHAPT = { 11: "3:58 PM", 16: "4:10 PM", 24: "4:22 PM", 32: "4:35 PM", 38: "4:45 PM", 46: "4:58 PM" };
const hud = (S, c, w) => {
  let time = "4:58 PM"; CLOCK.forEach(([k, t]) => { if (c >= k) time = t; });
  const zone = c >= 24 && c < 51 ? "PULL ZONE 2.5 M" : "";
  L.put(S, "ep89-clockcard", 1440, 50, { time, zone });
  HUDS.forEach(([k, text, last]) => { if (c >= k && c <= last && !(c === k && w === 0 && false)) L.put(S, "ep89-hud", 100, 50, { text }); });
};
const tick = (S, x, y, k, t, name = "green") => S.tick(x, y, k, t, 0, { c: DS.c(name), w: DS.w.near });
// ===================== chapter 0: the flash-forward (clips 1-3) =====================
// 1 "You are standing in the Lost Property office, holding a biscuit tin that weighs a billion tonnes. The floor is making a small noise of regret."
shot(1, 0, (S) => {
  office(S);
  clerk(S, 1250, 870, { face: "flat" });
  counter(S);
  const a = held(S, 560, 975, { s: 1.35, face: "scared" });
  // cracks spreading from his feet: the floor is losing
  [[560, 985, 300, 1040], [560, 985, 820, 1050], [560, 985, 470, 1075], [560, 985, 700, 1075]].forEach(([x0, y0, x1, y1], i) => S.draw(`M${x0} ${y0} L${(x0 + x1) / 2 + (i % 2 ? 18 : -18)} ${(y0 + y1) / 2} L${x1} ${y1}`, W(1, 20) + i * 0.12, 0.35, { c: DS.c("ink", 0), w: DS.w.detail }));
  S.sfx(W(1, 22), "rumble", 560);
}, { cam: "push" });
shot(1, 12, (S) => {
  L.put(S, "ep89-office", 0, 0);
  // the floor dips under the weight
  fillP(S, "M0 860 Q960 1010 1920 860 L1920 1080 L0 1080 Z", "floor", 2, 1);
  held(S, 960, 905, { s: 1.5, face: "worried" });
  card(S, "1,000,000,000 TONNES", 960, 300, { t: W(1, 14), size: DS.type.small });
  S.punch(960, 640, W(1, 14));
  txt(S, "creeeak...", 1380, 920, { t: W(1, 20), c: DS.c("gray", 2), size: DS.type.caption });
}, { cam: "pull" });
// 2 "Behind the desk, a clerk looks at the clock. It is two minutes to five."
shot(2, 0, (S) => {
  office(S, 4, 58);
  L.put(S, "ep-wall-clock", 960, 400, { s: 1.0, h: 4, m: 58 });
  clerk(S, 1320, 870, { s: 1.25, face: "grumpy" });
  counter(S, 1180, 900, {});
  card(S, "TWO MINUTES TO FIVE", 960, 590, { t: W(2, 8), fill: "yellow" });
}, { cam: "push" });
// 3 "Let's go back. Three fifty pm."  (rewinds into the pocket story at the jumble sale)
shot(3, 0, (S) => {
  L.put(S, "scene-shopping-street-day", 0, 0);
  L.put(S, "ep89-sign", 1360, 250, { s: 0.9, text: "JUMBLE SALE", size: DS.type.caption });
  fillP(S, rect(1060, 150, 600, 16), "gray", 2, 1); fillP(S, rect(1070, 150, 16, 790), "gray", 2, 1); fillP(S, rect(1634, 150, 16, 790), "gray", 2, 1);  // clothes rail
  L.put(S, "ep89-coat", 1360, 650, { s: 1.5 });
  dave(S, 600, 930, { s: 1.15, face: "smile", pose: "reach" });
  card(S, "3:50 PM", 640, 330, { t: W(3, 2), size: DS.type.title, fill: "yellow" });
}, { cam: "push" });
// ===================== chapter 1: 3:50 pm (clips 4-10) =====================
// 4 "In the pocket of a jumble-sale coat, you find something small and dark. Not a button. A mint is circling it. So is a coin. So are your keys."
const pocket = (S, o = {}) => { L.put(S, "ep89-coat-closeup", 0, 0); return dot(S, 960, 520, { R: 26 }); };
shot(4, 4, (S) => {
  pocket(S);
  card(S, "NOT A BUTTON", 960, 260, { t: W(4, 13), fill: "yellow" });
}, { cam: "zoom", focus: "960 540" });
shot(4, 16, (S) => {
  pocket(S);
  orbit(S, "ep89-mint", 960, 520, 190, 74, { a0: 0.4, turns: 3, t: W(4, 17), opt: { s: 2 } });
  orbit(S, "ep-coin-plain", 960, 520, 300, 116, { a0: 2.2, turns: 2.4, t: W(4, 24), opt: { s: 1.0 } });
  orbit(S, "ep89-keys", 960, 520, 410, 158, { a0: 4.2, turns: 1.8, t: W(4, 28), opt: { s: 1.4 } });
  L.put(S, "ep89-sign", 1560, 330, { s: 0.55, text: "ORBIT", size: DS.type.small, t: W(4, 28) });
}, { cam: "pull" });
// 5 (@dave) "Brain, my pocket has a solar system in it. What do I do?"
const tiny = (S, x, y, k = 1, t0) => { // a hand-sized solar system: the dot with a mint, a coin and keys on tiny orbits
  dot(S, x, y, { R: 9 * k });
  orbit(S, "ep89-mint", x, y, 62 * k, 24 * k, { a0: 0.4, turns: 3, opt: { s: 0.34 * k } });
  orbit(S, "ep-coin-plain", x, y, 92 * k, 34 * k, { a0: 2.4, turns: 2.2, opt: { s: 0.28 * k } });
  orbit(S, "ep89-keys", x, y, 128 * k, 44 * k, { a0: 4.2, turns: 1.6, opt: { s: 0.34 * k } });
};
shot(5, 0, (S) => {
  street(S);
  dave(S, 640, 940, { s: 1.15, face: "worried", pose: "reach" });
  tiny(S, 900, 650, 1.1);
  brain(S, 1500, 940, { s: 1.0, kind: "kit-brain-worried" });
  tag(S, "BRAIN", 1500, 330, { t: W(5, 0) });
}, { cam: "push" });
// 6 (@brain) "Please stop holding it, Dave. Or at least stop holding it near me."
shot(6, 0, (S) => {
  street(S);
  brain(S, 560, 940, { s: 1.35, kind: "kit-brain-stern" });
  dave(S, 1450, 940, { s: 0.95, face: "nervous", pose: "shrug", flip: true });
  tag(S, "BRAIN", 560, 230, { t: W(6, 0) });
}, { cam: "push" });
// 7 "Lost Property is on your way home, and it closes at five. First, you ring Doctor Hale."
shot(7, 0, (S) => {
  field(S, "sand", 1);
  fillP(S, "M0 700 L1920 700 L1920 1080 L0 1080 Z", "grass", 0, 0.5);
  fillP(S, rect(0, 760, 1920, 70), "gray", 2, 1);
  L.put(S, "bld-house-a", 300, 770, { s: 1.1 });
  L.put(S, "bld-office", 1560, 770, { s: 1.25 });
  card(S, "LOST PROPERTY", 1560, 270, { size: DS.type.caption * 0.85, t: W(7, 0) });
  L.put(S, "ep89-guide", 930, 795, { len: 560, t: W(7, 4) }).setAttribute("transform", "translate(930 795) rotate(90) scale(1)");
  card(S, "CLOSES 5:00 PM", 560, 380, { t: W(7, 8), fill: "yellow" });
  dave(S, 800, 940, { s: 0.85, face: "smile" });
  L.put(S, "prop-phone", 1130, 560, { s: 1.4, screen: "blank", t: W(7, 12) });
  card(S, "DOCTOR HALE", 1130, 420, { t: W(7, 14), size: DS.type.caption * 0.85 });
}, { cam: "push" });
// 8 "So, what if you found a tiny black hole in your pocket? Could you keep it, like a very dark marble?"
shot(8, 0, (S) => {
  L.put(S, "ep89-coat-closeup", 0, 0);
  fillP(S, rect(0, 0, 1920, 1080), "navy", 2, 0.55);
  dot(S, 960, 600, { R: 18 });
  txt(S, "WHAT IF YOU FOUND", 960, 250, { size: DS.type.title, c: DS.c("white", 0), t: W(8, 0) });
  txt(S, "A TINY BLACK HOLE", 960, 360, { size: DS.type.title, c: DS.c("yellow", 0), t: W(8, 4) });
  txt(S, "IN YOUR POCKET?", 960, 470, { size: DS.type.title, c: DS.c("white", 0), t: W(8, 8) });
}, { cam: "zoom" });
shot(8, 12, (S) => {
  field(S, "sky", 1);
  fillP(S, rect(0, 800, 1920, 280), "grass", 0, 0.6);
  dave(S, 640, 940, { s: 1.25, face: "thinking", pose: "reach" });
  dot(S, 900, 610, { R: 22 });
  L.put(S, "thought-pic", 1360, 400, { s: 1.0, text: "KEEP IT?|LIKE A MARBLE", size: 52, t: W(8, 15) });
  S.fill(circ(1380, 720, 40), W(8, 19), 0.35, DS.c("ink", 1), 1); S.fill(circ(1368, 706, 10), W(8, 19), 0.35, DS.c("white", 0), 0.5);
}, { cam: "push" });
// 9 "No. It weighs a mountain, it glows, and it will not stay in any pocket."
shot(9, 0, (S) => {
  field(S, "navy", 2);
  const pan = (x) => { fillP(S, rrect(x - 290, 220, 580, 640, DS.r.lg), "navy", 1, 1); };
  [330, 960, 1590].forEach(pan);
  L.put(S, "mountain-rocky", 330, 640, { s: 0.75, t: W(9, 4) });
  card(S, "WEIGHS A MOUNTAIN", 330, 270, { size: DS.type.caption * 0.8, t: W(9, 4), fill: "yellow" });
  L.put(S, "ep89-glow", 960, 560, { r: 250, t: W(9, 7) });
  dot(S, 960, 560, { R: 18, t: W(9, 7) });
  card(S, "IT GLOWS", 960, 270, { size: DS.type.caption * 0.8, t: W(9, 7), fill: "yellow" });
  L.put(S, "ep89-coat", 1590, 600, { s: 1.1, t: W(9, 11) });
  L.put(S, "sign-cross", 1590, 600, { s: 2.4, t: W(9, 13) });
  card(S, "WON'T STAY", 1590, 270, { size: DS.type.caption * 0.8, t: W(9, 11), fill: "yellow" });
}, { cam: "pull" });
// 10 "Here is the rule of this story. The hole sits in a biscuit tin that stops all its radiation, and your arms can carry anything. Nothing stops its gravity."
shot(10, 0, (S) => {
  field(S, "navy", 2);
  L.put(S, "star-field", 960, 500, { s: 4 });
  txt(S, "THE RULE", 960, 250, { size: DS.type.title, c: DS.c("yellow", 0), t: W(10, 3) });
  L.put(S, "ep89-glow", 960, 600, { r: 260, t: W(10, 12) });
  tin(S, 960, 650, { s: 1.5, glow: false });
  card(S, "THE TIN STOPS ALL RADIATION", 960, 880, { t: W(10, 14), size: DS.type.caption * 0.85 });
}, { cam: "push" });
shot(10, 20, (S) => {
  street(S);
  const [tx, ty] = held(S, 700, 950, { s: 1.4, face: "determined" });
  card(S, "YOUR ARMS CAN CARRY ANYTHING", 960, 200, { t: W(10, 20), size: DS.type.caption * 0.85 });
  const arrowsIn = [[1450, 620], [1500, 820], [1300, 480], [1560, 440]];
  arrowsIn.forEach(([x, y], i) => S.arrow(x, y, tx + 50, ty, W(10, 25) + i * 0.1, 0.4, { c: DS.c("red", 2), w: DS.w.near, bend: 0.1 }));
  card(S, "NOTHING STOPS GRAVITY", 1360, 920, { t: W(10, 25), size: DS.type.caption * 0.85, fill: "yellow" });
}, { cam: "pull" });
// ===================== chapter 2: 3:58 pm (clips 11-15) =====================
const lab = (S) => L.put(S, "room-science-lab-light", 0, 0);
const callPair = (S, o = {}) => { // Dave (left) with the phone, Doctor Hale (right)
  dave(S, 520, 940, { s: 1.1, face: o.dface || "worried", pose: "phone-hold" });
  doc(S, 1400, 940, { s: 1.1, face: o.hface || "flat", pose: "phone-hold", flip: true });
};
// 11 (@doc) "Dave. In nineteen seventy-one, Stephen Hawking showed that tiny black holes could have formed in the first second of the universe. I checked the numbers twice. Whatever you do, do not put it down."
shot(11, 0, (S) => {
  lab(S);
  callPair(S, { hface: "flat" });
  tag(S, "DOCTOR HALE", 1400, 250, { t: W(11, 0) });
  card(S, "1971: HAWKING", 960, 190, { t: W(11, 4), size: DS.type.caption * 0.85, fill: "yellow" });
}, { cam: "push" });
shot(11, 12, (S) => {
  field(S, "navy", 2);
  L.put(S, "star-field", 960, 540, { s: 4.2 });
  L.put(S, "ep-galaxy", 960, 500, { s: 0.9, bg: true });
  card(S, "FIRST SECOND OF THE UNIVERSE", 960, 900, { t: W(11, 16), size: DS.type.caption * 0.85 });
  for (let i = 0; i < 9; i++) dot(S, 1100 + ((i * 137) % 600) - 200, 380 + ((i * 89) % 420), { R: 6, t: W(11, 13) + i * 0.08 });
  card(S, "I CHECKED THE NUMBERS TWICE", 960, 190, { t: W(11, 21), size: DS.type.caption * 0.8 });
}, { cam: "pull" });
shot(11, 24, (S) => {
  lab(S);
  callPair(S, { dface: "scared", hface: "determined" });
  card(S, "DO NOT PUT IT DOWN", 960, 170, { t: W(11, 28), size: DS.type.small, fill: "red", tc: "white" });
  tin(S, 560, 700, { s: 0.55 });
}, { cam: "zoom" });
// 12 "Black holes can be any size. A tiny one ... could weigh a billion tonnes, about a mountain, and still be smaller than an atom, around the size of a proton."
shot(12, 0, (S) => {
  field(S, "navy", 2);
  L.put(S, "star-field", 960, 540, { s: 4.2 });
  const sizes = [[330, 150], [760, 95], [1100, 60], [1360, 32], [1560, 14]];
  sizes.forEach(([x, R], i) => { const t = i === 0 ? undefined : W(12, 2) + i * 0.15; L.put(S, "ep89-glow", x, 560, { r: R * 1.35, t }); dot(S, x, 560, { R: Math.max(8, R * 0.55), t }); });  // drawn holes (the photo asset showed its square backdrop when overlapped)
  card(S, "ANY SIZE", 960, 230, { t: W(12, 2), size: DS.type.small, fill: "yellow" });
  card(S, "HUGE", 300, 830, { t: W(12, 3), size: DS.type.caption * 0.75 }); card(S, "TINY", 1520, 830, { t: W(12, 6), size: DS.type.caption * 0.75 });
}, { cam: "push" });
shot(12, 12, (S) => {
  field(S, "sky", 1);
  L.put(S, "mountain-rocky", 700, 880, { s: 1.7 });
  fillP(S, rect(0, 860, 1920, 240), "grass", 0, 1);
  L.put(S, "mountain-rocky", 700, 880, { s: 1.7 });
  card(S, "1,000,000,000 TONNES", 700, 190, { t: W(12, 13), size: DS.type.caption * 0.9, fill: "yellow" });
  dot(S, 1450, 700, { R: 20, t: W(12, 17) });
  S.arrow(1250, 520, 1420, 650, W(12, 18), 0.4, { c: DS.c("red", 2), w: DS.w.near, bend: 0.2 });
  card(S, "SAME WEIGHT", 1450, 520, { t: W(12, 19), size: DS.type.caption * 0.8 });
}, { cam: "pull" });
shot(12, 22, (S) => {
  field(S, "sand", 1);
  L.put(S, "cos-atom-shells", 960, 540, { s: 2.6 });
  dot(S, 960, 540, { R: 8, t: W(12, 25) });
  card(S, "SMALLER THAN AN ATOM", 960, 190, { t: W(12, 24), size: DS.type.caption * 0.85 });
  card(S, "PROTON-SIZED", 1360, 800, { t: W(12, 30), size: DS.type.caption * 0.85, fill: "yellow" });
}, { cam: "zoom", focus: "960 540" });
// 13 "So the weight of a mountain sits in your pocket, in a dot you cannot see."
shot(13, 0, (S) => {
  pocket(S);
  L.put(S, "mountain-rocky", 960, 500, { s: 0.7, t: W(13, 4) });
  dot(S, 960, 520, { R: 15 });
  card(S, "A DOT YOU CANNOT SEE", 960, 880, { t: W(13, 10), size: DS.type.caption * 0.85, fill: "yellow" });
}, { cam: "push" });
// 14 (@dave) 15 (@doc)
shot(14, 0, (S) => {
  lab(S); callPair(S, { dface: "worried", hface: "flat" });
  L.put(S, "ep89-tin", 560, 690, { s: 0.55 });
  card(S, "ONLY TWO ARMS", 520, 250, { t: W(14, 15), size: DS.type.caption * 0.8 });
}, { cam: "push" });
shot(15, 0, (S) => {
  lab(S); callPair(S, { dface: "worried", hface: "smile" });
  card(S, "DON'T LOOK AT ANYTHING YOU LOVE", 1400, 250, { t: W(15, 6), size: DS.type.caption * 0.7 });
  L.put(S, "prop-teddy", 460, 640, { s: 1.0, t: W(15, 8) });
}, { cam: "pull" });
// ===================== chapter 3: 4:10 pm (clips 16-23) =====================
// 16 "There is a second problem. The pocket is warm."
shot(16, 0, (S) => {
  pocket(S);
  L.put(S, "ep89-glow", 960, 520, { r: 230, t: W(16, 6) });
  dot(S, 960, 520, { R: 15 });
  L.put(S, "ep-thermometer", 1560, 560, { s: 1.5, level: 0.55, t: W(16, 7) });
  card(S, "WARM", 1560, 250, { t: W(16, 8), size: DS.type.small, fill: "yellow" });
}, { cam: "push" });
// 17 "In nineteen seventy-four, Hawking showed that black holes glow. And the smaller the hole, the hotter and brighter it glows."
shot(17, 0, (S) => {
  field(S, "navy", 2); L.put(S, "star-field", 960, 540, { s: 4.2 });
  L.put(S, "ep89-glow", 560, 560, { r: 330, t: W(17, 5) });
  L.put(S, "ep-black-hole-small", 560, 560, { s: 2.2, R: 60 });
  card(S, "1974", 520, 220, { t: W(17, 0), size: DS.type.small, fill: "yellow" });
  card(S, "HAWKING: BLACK HOLES GLOW", 960, 900, { t: W(17, 5), size: DS.type.caption * 0.85 });
  L.put(S, "ep89-glow", 1400, 560, { r: 330, t: W(17, 12) });
  dot(S, 1400, 560, { R: 14, t: W(17, 12) });
  card(S, "TINY HOLE: HOT", 1400, 300, { t: W(17, 12), size: DS.type.caption * 0.8, fill: "yellow" });
  L.put(S, "ep-thermometer", 1400, 790, { s: 0.8, level: 0.95, t: W(17, 14) });
}, { cam: "push" });
// 18 "Yours is hotter than a hundred billion degrees. It gives off about as much power as a power station. And all of it is gamma rays."
shot(18, 0, (S) => {
  field(S, "sky", 1); fillP(S, rect(0, 820, 1920, 260), "grass", 0, 1);
  L.put(S, "ep-thermometer", 560, 560, { s: 2.2, level: 1, t: W(18, 3) });
  dave(S, 260, 960, { s: 0.9, face: "shocked", pose: "shocked" });
  card(S, "100 BILLION DEGREES", 560, 200, { t: W(18, 4), size: DS.type.caption * 0.9, fill: "yellow" });
  L.put(S, "kit-factory", 1330, 840, { s: 1.4, t: W(18, 12) });
  card(S, "ABOUT A POWER STATION", 1330, 250, { t: W(18, 13), size: DS.type.caption * 0.8 });
}, { cam: "push" });
shot(18, 17, (S) => {
  field(S, "navy", 2); L.put(S, "star-field", 960, 540, { s: 4.2 });
  L.put(S, "ep89-glow", 960, 560, { r: 300 });
  for (let i = 0; i < 16; i++) { const a = (i / 16) * Math.PI * 2; S.arrow(960 + Math.cos(a) * 130, 560 + Math.sin(a) * 130, 960 + Math.cos(a) * 330, 560 + Math.sin(a) * 330, W(18, 20) + i * 0.03, 0.3, { c: DS.c("yellow", 0), w: DS.w.detail }); }
  dot(S, 960, 560, { R: 15 });
  card(S, "GAMMA RAYS", 960, 200, { t: W(18, 21), size: DS.type.small, fill: "yellow" });
}, { cam: "zoom" });
// 19 "Andrew Hamilton, a black hole physicist, puts it simply: you would not want to go near a mini black hole that is evaporating."
shot(19, 0, (S) => {
  lab(S);
  person(S, "man06", 560, 940, { s: 1.15, acc: ["glasses"], outfit: "labcoat", pose: "point", face: "flat" });
  card(S, "ANDREW HAMILTON, PHYSICIST", 560, 250, { t: W(19, 0), size: DS.type.caption * 0.75 });
  dot(S, 1300, 640, { R: 18, t: W(19, 6) });
  L.put(S, "ep89-glow", 1300, 640, { r: 200, t: W(19, 8) });
}, { cam: "push" });
shot(19, 12, (S) => {
  lab(S);
  const g = S.grp(); person(S, "man06", 560, 940, { s: 1.15, acc: ["glasses"], outfit: "labcoat", pose: "shrug", face: "worried", parent: g });
  shift(g, S.start + 0.3, 3.2, [0, 0], [-120, 0]);
  L.put(S, "ep89-glow", 1360, 640, { r: 210 }); dot(S, 1360, 640, { R: 20 });
  L.put(S, "ep89-zone", 1360, 900, { r: 340 });
  card(S, "NOT NEAR", 1360, 330, { t: W(19, 12), size: DS.type.small, fill: "red", tc: "white" });
}, { cam: "pull" });
// 20 (@dave)
shot(20, 0, (S) => {
  street(S);
  held(S, 700, 950, { s: 1.4, face: "smug", glow: true });
  L.put(S, "ep89-coat", 1300, 660, { s: 1.3 });
  card(S, "IT IS IN MY POCKET", 1300, 250, { t: W(20, 8), size: DS.type.caption * 0.85 });
}, { cam: "push" });
// 21 (@brain) 22 (@brain)
shot(21, 0, (S) => {
  street(S);
  brain(S, 520, 940, { s: 1.35, kind: "kit-brain-smile" });
  dave(S, 1420, 940, { s: 1.0, face: "proud", flip: true });
  card(S, "FAVOURITE CASE OF THE WEEK", 960, 250, { t: W(21, 5), size: DS.type.caption * 0.8, fill: "yellow" });
}, { cam: "pull" });
shot(22, 0, (S) => {
  street(S);
  brain(S, 520, 940, { s: 1.35, kind: "kit-brain-stern" });
  held(S, 1420, 950, { s: 1.0, face: "nervous", flip: true });
  card(S, "THE TIN IS WORKING", 960, 250, { t: W(22, 3), size: DS.type.caption * 0.85 });
}, { cam: "push" });
// 23 "In the tin, the gamma rays go nowhere. It is a very good tin."  + gag: buttons, one thimble, no cookies
shot(23, 0, (S) => {
  field(S, "dusk", 1);
  tin(S, 640, 700, { s: 1.9 });
  for (let i = 0; i < 8; i++) { const a = (i / 8) * Math.PI * 2; S.arrow(640 + Math.cos(a) * 190, 640 + Math.sin(a) * 120, 640 + Math.cos(a) * 320, 640 + Math.sin(a) * 200, W(23, 3) + i * 0.04, 0.3, { c: DS.c("orange", 1), w: DS.w.detail }); }
  card(S, "GAMMA RAYS GO NOWHERE", 960, 200, { t: W(23, 4), size: DS.type.caption * 0.85 });
  ["BUTTONS", "ONE THIMBLE"].forEach((s, i) => { card(S, s, 1350, 400 + i * 120, { t: W(23, 9) + i * 0.3, size: DS.type.caption * 0.8 }); tick(S, 1000, 400 + i * 120, 0.5, W(23, 9) + i * 0.3 + 0.2); });
  card(S, "NO COOKIES", 1350, 640, { t: W(23, 12), size: DS.type.caption * 0.8, fill: "yellow" });
  S.cross(1000, 640, 0.5, W(23, 12) + 0.2, 0, { c: DS.c("red", 2), w: DS.w.near });
}, { cam: "push" });
// ===================== chapter 4: 4:22 pm (clips 24-31) =====================
const zoneRing = (S, x, gy, r, t) => L.put(S, "ep89-zone", x, gy - 30, { r, t });
// 24 "Now, the gravity. A hole this heavy, packed into a dot, pulls hard on anything close. Within two and a half metres, it pulls harder than the Earth does."
shot(24, 0, (S) => {
  street(S);
  const [tx, ty] = held(S, 760, 950, { s: 1.25, face: "worried" });
  [[1250, 470, "ep-coin-plain", 0.6], [1400, 700, "prop-key", 1.0], [1180, 820, "ep89-mint", 1.2], [1520, 560, "ep89-bowler", 0.7]].forEach(([x, y, n, k], i) => {
    L.put(S, n, x, y, { s: k });
    S.arrow(x - 60, y, tx + 120, ty, W(24, 8) + i * 0.15, 0.4, { c: DS.c("red", 2), w: DS.w.near, bend: 0.12 });
  });
  card(S, "IT PULLS ON EVERYTHING CLOSE", 960, 200, { t: W(24, 8), size: DS.type.caption * 0.85 });
}, { cam: "push" });
shot(24, 16, (S) => {
  street(S);
  zoneRing(S, 960, 960, 560, S.start);
  held(S, 960, 940, { s: 1.2, face: "worried" });
  S.arrow(960, 900, 960 + 520, 900, W(24, 17), 0.6, { c: DS.c("red", 2), w: DS.w.near, head: true });
  card(S, "2.5 M", 1320, 800, { t: W(24, 18), size: DS.type.small, fill: "yellow" });
  card(S, "STRONGER THAN EARTH'S PULL", 960, 200, { t: W(24, 22), size: DS.type.caption * 0.85 });
}, { cam: "pull" });
// 25 "So you must walk round everybody. Through the park. Around the bus queue. Round the dog with the stick. You have to cover a kilometre in a very polite arc."
shot(25, 0, (S) => {
  park(S);
  const g = S.grp(); const a = held(S, 400, 950, { s: 1.0, face: "worried", parent: g });
  shift(g, S.start + 0.3, 4.2, [0, 0], [180, 0]);
  [[1150, 880], [1400, 900], [1650, 880]].forEach(([x, y], i) => person(S, ["man03", "girl05", "man08"][i], x, y, { s: 0.85, face: "smile", t: W(25, 5) + i * 0.15 }));
  S.draw(poly([[400, 700], [800, 640], [1150, 600], [1500, 660], [1840, 760]]), W(25, 4), 1.2, { c: DS.c("red", 1), w: DS.w.detail });
  card(S, "THROUGH THE PARK", 960, 200, { t: W(25, 4), size: DS.type.caption * 0.85 });
}, { cam: "push" });
shot(25, 8, (S) => {
  street(S);
  L.put(S, "ride-bus-stop", 560, 880, { s: 1.15 });
  [[420, 900], [520, 900], [620, 900]].forEach(([x, y], i) => person(S, ["man05", "girl07", "man09"][i], x, y, { s: 0.85, face: i === 1 ? "worried" : "smile", t: W(25, 10) + i * 0.1 }));
  L.put(S, "animal-dog", 1280, 900, { s: 1.0, t: W(25, 14) });
  S.draw(line([1370, 905], [1470, 820]), W(25, 16), 0.3, { c: DS.c("brown", 1), w: DS.w.near });
  card(S, "BUS QUEUE", 520, 270, { t: W(25, 10), size: DS.type.caption * 0.8 });
  card(S, "DOG WITH A STICK", 1300, 270, { t: W(25, 14), size: DS.type.caption * 0.8 });
  held(S, 930, 950, { s: 0.95, face: "worried" });
}, { cam: "pull" });
shot(25, 20, (S) => {
  field(S, "sand", 1);
  fillP(S, rect(0, 600, 1920, 480), "grass", 0, 0.5);
  L.put(S, "bld-house-a", 300, 760, { s: 0.9 }); L.put(S, "bld-office", 1620, 760, { s: 1.0 });
  S.draw("M360 840 C600 560 800 560 960 700 C1100 840 1300 880 1560 840", W(25, 22), 1.6, { c: DS.c("red", 1), w: DS.w.near });
  card(S, "ABOUT A KILOMETRE", 960, 200, { t: W(25, 22), size: DS.type.caption * 0.85, fill: "yellow" });
  card(S, "A VERY POLITE ARC", 960, 330, { t: W(25, 27), size: DS.type.caption * 0.8 });
}, { cam: "zoom" });
// 26 "Even so, a man's hat leaves his head and orbits the tin. A pigeon decides to walk. A bench tilts, very slowly, towards your hands."
shot(26, 0, (S) => {
  street(S);
  const [tx, ty] = held(S, 600, 950, { s: 1.25, face: "worried" });
  person(S, "man07", 1380, 940, { s: 1.1, hair: "bald", face: "wow", pose: "head" });
  orbit(S, "ep89-bowler", tx, ty - 40, 190, 60, { a0: 3.5, turns: 2, t: W(26, 6), opt: { s: 0.8 } });
  card(S, "A HAT LEAVES HIS HEAD", 960, 200, { t: W(26, 3), size: DS.type.caption * 0.85 });
}, { cam: "push" });
shot(26, 12, (S) => {
  street(S);
  fillP(S, rect(0, 880, 1920, 200), "gray", 1, 0.9);
  const b = S.grp(); L.put(S, "bench", 1340, 900, { s: 1.5, parent: b });
  spin(b, W(26, 18), 3.5, 0, 7, 1340, 900);
  L.put(S, "ep89-pigeon", 520, 910, { s: 1.5 });
  const p = L.put(S, "ep89-pigeon", 520, 910, { s: 1.5, step: true }); p.setAttribute("opacity", 0);
  for (let t = S.start + 0.4; t < S.start + 4; t += 0.5) { tl.set(p, { opacity: 1 }, t); tl.set(p, { opacity: 0 }, t + 0.25); }
  held(S, 880, 950, { s: 1.0, face: "worried" });
  card(S, "A PIGEON DECIDES TO WALK", 520, 330, { t: W(26, 13), size: DS.type.caption * 0.75 });
  card(S, "THE BENCH TILTS", 1340, 330, { t: W(26, 17), size: DS.type.caption * 0.75 });
}, { cam: "pull" });
// 27 (@news) "Breaking news. A man is walking down the high street carrying a biscuit tin. Nearby lampposts are leaning."
shot(27, 0, (S) => {
  L.put(S, "world-tv-studio", 0, 0);
  L.put(S, "job-news-anchor", 960, 920, { s: 1.3 });
  fillP(S, rrect(260, 800, 1400, 120, DS.r.md), "red", 1, 1);
  txt(S, "BREAKING NEWS", 960, 880, { size: DS.type.small, c: DS.c("white", 0), t: W(27, 0) });
}, { cam: "push" });
shot(27, 10, (S) => {
  street(S);
  fillP(S, rect(0, 880, 1920, 200), "gray", 1, 0.9);
  held(S, 960, 950, { s: 1.1, face: "worried" });
  [[300, 1], [620, 0.9], [1320, 0.9], [1640, 1]].forEach(([x, k], i) => { const g = S.grp(); L.put(S, "lamp-post", x, 900, { s: 1.6 * k, parent: g }); spin(g, W(27, 12) + i * 0.1, 3, 0, (x < 960 ? 6 : -6), x, 900); });
  card(S, "LAMPPOSTS ARE LEANING", 960, 200, { t: W(27, 12), size: DS.type.caption * 0.85, fill: "yellow" });
}, { cam: "pull" });
// 28-31
const hatTalk = (S, c, w, who, dface) => {
  street(S);
  const [tx, ty] = held(S, 600, 950, { s: 1.15, face: dface });
  person(S, "man07", 1400, 940, { s: 1.1, hair: "bald", face: who, pose: "point", flip: true });
  orbit(S, "ep89-bowler", tx, ty - 10, 210, 60, { a0: 1, turns: 2.5, opt: { s: 0.7 } });
};
shot(28, 0, (S) => { hatTalk(S, 28, 0, "worried", "nervous"); tag(S, "BYSTANDER", 1400, 280, { t: W(28, 0) }); }, { cam: "push" });
shot(29, 4, (S) => { hatTalk(S, 29, 4, "flat", "embarrassed"); card(S, "A VERY SMALL BLACK HOLE", 960, 200, { t: W(29, 8), size: DS.type.caption * 0.8 }); }, { cam: "pull" });
shot(30, 0, (S) => { hatTalk(S, 30, 0, "confused", "worried"); card(S, "HAT-STEALING OR GENERAL?", 960, 200, { t: W(30, 2), size: DS.type.caption * 0.8 }); }, { cam: "push" });
shot(31, 0, (S) => { hatTalk(S, 31, 0, "flat", "silly"); card(S, "IT TAKES WHATEVER IT LIKES", 960, 200, { t: W(31, 7), size: DS.type.caption * 0.8, fill: "yellow" }); }, { cam: "pull" });
// ===================== chapter 5: 4:35 pm (clips 32-37) =====================
// 32 "Your arms are tired. Your feet are tired. You look for somewhere to put the tin down."
shot(32, 0, (S) => {
  street(S);
  fillP(S, rect(0, 880, 1920, 200), "gray", 1, 0.9);
  const [tx, ty] = held(S, 700, 960, { s: 1.35, face: "tired" });
  L.put(S, "fx-sweat-drops", 830, 470, { s: 0.45, t: W(32, 3) });
  card(S, "ARMS TIRED", 1250, 300, { t: W(32, 1), size: DS.type.caption * 0.85 });
  card(S, "FEET TIRED", 1250, 420, { t: W(32, 5), size: DS.type.caption * 0.85 });
  [["BIN", 1250, 700], ["WALL", 1550, 760]].forEach(([s, x, y], i) => { card(S, s + "?", x, y, { t: W(32, 10) + i * 0.4, size: DS.type.caption * 0.8, fill: "yellow" }); });
}, { cam: "push" });
// 33 "Never put it down. Something that small slips between the atoms. Theorists say tiny black holes would zip straight through matter as if it was not there."
shot(33, 0, (S) => {
  field(S, "sand", 1);
  for (let r = 0; r < 5; r++) for (let c = 0; c < 9; c++) S.fill(circ(360 + c * 150 + (r % 2) * 75, 300 + r * 130, 44), T0(S), 0, DS.c("blue", 1), 1);
  dot(S, 300, 440, { R: 12 });
  const g = S.grp(); dot(S, 0, 0, { R: 12, parent: g });
  g.setAttribute("transform", "translate(300 370)");
  tl.fromTo(g, { attr: { transform: "translate(300 365)" } }, { attr: { transform: "translate(1640 365)" }, duration: Math.max(1.5, S.end - S.start - 1), ease: "power1.inOut", immediateRender: false }, W(33, 6));
  S.draw(line([260, 365], [1700, 365]), W(33, 6), 1.4, { c: DS.c("red", 1), w: DS.w.detail });
  card(S, "SLIPS BETWEEN THE ATOMS", 960, 245, { t: W(33, 6), size: DS.type.caption * 0.85, fill: "yellow" });
  card(S, "NEVER PUT IT DOWN", 960, 130, { t: W(33, 0), size: DS.type.small, fill: "red", tc: "white" });
}, { cam: "pull" });
shot(33, 16, (S) => {
  field(S, "sky", 1);
  for (let r = 0; r < 6; r++) for (let c = 0; c < 6; c++) S.draw(rect(760 + c * 80 - (r % 2) * 40, 250 + r * 80, 80, 80), T0(S), 0, { fill: DS.c("earth", 1), c: DS.c("brown", 2), w: DS.w.detail });
  const g = S.grp(); dot(S, 0, 0, { R: 14, parent: g }); g.setAttribute("transform", "translate(300 520)");
  tl.fromTo(g, { attr: { transform: "translate(300 520)" } }, { attr: { transform: "translate(1640 520)" }, duration: 2.4, ease: "power1.inOut", immediateRender: false }, W(33, 19));
  card(S, "THEORISTS SAY", 960, 190, { t: W(33, 16), size: DS.type.caption * 0.85 });
  card(S, "THE WALL DOES NOT NOTICE", 960, 940, { t: W(33, 21), size: DS.type.caption * 0.8, fill: "yellow" });
}, { cam: "push" });
// 34 "It would fall through the pavement, the pipes, the rock and the whole planet."
shot(34, 0, (S) => {
  L.put(S, "ep89-cutaway", 0, 0);
  const g = S.grp(); tin(S, 0, 0, { s: 0.55, parent: g });
  g.setAttribute("transform", "translate(960 290)");
  tl.fromTo(g, { attr: { transform: "translate(960 290)" } }, { attr: { transform: "translate(960 900)" }, duration: 4, ease: "power1.in", immediateRender: false }, W(34, 3));
  [["PAVEMENT", 230, 5], ["PIPES", 530, 7], ["ROCK", 760, 9], ["THE WHOLE PLANET", 960, 12]].forEach(([s, y, w]) => card(S, s, 1480, y, { t: W(34, w), size: DS.type.caption * 0.75 }));
}, { cam: "push" });
// 35 "Ignoring friction, a swing through the middle of the Earth and back takes about eighty-four minutes. It loses a little energy on every pass, so it ends up settling at the centre."
shot(35, 0, (S) => {
  field(S, "navy", 2); L.put(S, "star-field", 960, 540, { s: 4.2 });
  L.put(S, "sci-earth-layers", 960, 560, { s: 2.3 });
  const g = S.grp(); tin(S, 0, 0, { s: 0.3, parent: g });
  tl.fromTo(g, { attr: { transform: "translate(960 215)" } }, { attr: { transform: "translate(960 905)" }, duration: 2.2, ease: "sine.inOut", yoyo: true, repeat: 2, immediateRender: false }, S.start + 0.3);
  g.setAttribute("transform", "translate(960 215)");
  card(S, "THROUGH THE MIDDLE AND BACK", 960, 130, { t: W(35, 4), size: DS.type.caption * 0.8 });
  card(S, "ABOUT 84 MINUTES", 1600, 720, { t: W(35, 12), size: DS.type.caption * 0.85, fill: "yellow" });
}, { cam: "push" });
shot(35, 16, (S) => {
  field(S, "navy", 2); L.put(S, "star-field", 960, 540, { s: 4.2 });
  L.put(S, "sci-earth-layers", 960, 560, { s: 2.3 });
  S.draw("M960 215 L960 905", T0(S), 0, { c: DS.c("white", 0), w: DS.w.detail });
  [[215, 905, 40], [260, 860, 34], [310, 810, 28]].forEach(([a, b, k], i) => S.draw(poly([[960 - k, a], [960 + k, b]]), W(35, 17) + i * 0.4, 0.3, { c: DS.c("yellow", 0), w: DS.w.detail }));
  card(S, "LOSES A LITTLE ENERGY EACH PASS", 960, 130, { t: W(35, 17), size: DS.type.caption * 0.8 });
  tin(S, 960, 560, { s: 0.3, t: W(35, 26) });
  L.put(S, "ep89-glow", 960, 560, { r: 130, t: W(35, 28) });
  card(S, "SETTLES AT THE CENTRE", 1600, 820, { t: W(35, 26), size: DS.type.caption * 0.85, fill: "yellow" });
}, { cam: "pull" });
// 36 (@dave) 37 (@brain)
shot(36, 0, (S) => {
  street(S);
  const f = held(S, 700, 960, { s: 1.2, face: "thinking" });
  L.put(S, "thought-pic", 1300, 380, { s: 1.0, text: "THE PLANET?|LIVES THERE?", size: 52, t: W(36, 4) });
  L.put(S, "cos-earth-moon", 1400, 700, { s: 0.7, t: W(36, 8) });
}, { cam: "push" });
shot(37, 0, (S) => {
  street(S);
  brain(S, 560, 940, { s: 1.35, kind: "kit-brain-tired" });
  dave(S, 1400, 940, { s: 1.0, face: "embarrassed", flip: true });
  card(S, "FORTY MINUTES", 960, 220, { t: W(37, 13), size: DS.type.caption * 0.85, fill: "yellow" });
}, { cam: "pull" });
// ===================== chapter 6: 4:45 pm, the bench (clips 38-45) =====================
const parkSet = (S, sunset) => L.put(S, sunset ? "scene-park-sunset" : "scene-park-day", 0, 0);
const benchDave = (S, o = {}) => { // Dave on the bench holding the tin; the bench leans towards him
  const b = S.grp(); L.put(S, "bench", 900, 900, { s: 1.9, parent: b });
  spin(b, S.start + 0.4, 3, 0, 5, 900, 900);
  const d = dave(S, 880, 880, { s: 1.0, pose: "sit-chair", face: o.face || "worried" });
  tin(S, 1010, 760, { s: 0.45, glow: false });
};
// 38 "You sit on a bench. The bench leans towards you. You lean back."
shot(38, 0, (S) => { parkSet(S); benchDave(S); card(S, "THE BENCH LEANS TOWARDS YOU", 960, 220, { t: W(38, 5), size: DS.type.caption * 0.85 }); }, { cam: "push" });
// 39 "A small child stops in front of you, looking at the tin. Not at you. At the tin."
shot(39, 0, (S) => {
  parkSet(S); benchDave(S, { face: "surprised" });
  const k = person(S, "girl05", 1500, 930, { s: 0.7, body: "kid", face: "wow", flip: true });
  shift(k, S.start, 0.1, [0, 0], [0, 0]);
  S.arrow(1360, 700, 1090, 760, W(39, 10), 0.4, { c: DS.c("orange", 1), w: DS.w.near });
  card(S, "NOT AT YOU. AT THE TIN.", 960, 220, { t: W(39, 12), size: DS.type.caption * 0.85, fill: "yellow" });
}, { cam: "pull" });
// 40-44 the child
const kid = (S, x, face, flip = true, extra = {}) => person(S, "girl05", x, 940, Object.assign({ s: 1.0, body: "kid", face, flip }, extra));
shot(40, 0, (S) => { parkSet(S, true); kid(S, 640, "smile", false); tin(S, 1350, 780, { s: 0.7 }); tag(S, "CHILD", 640, 330, { t: W(40, 0) }); card(S, "BISCUITS, OR SOMETHING BETTER?", 960, 200, { t: W(40, 9), size: DS.type.caption * 0.8 }); }, { cam: "push" });
shot(41, 0, (S) => { parkSet(S, true); held(S, 640, 950, { s: 1.15, face: "smile" }); kid(S, 1500, "wow", true, { s: 0.8 }); card(S, "OLDER THAN THE MOON", 960, 200, { t: W(41, 10), size: DS.type.caption * 0.85, fill: "yellow" }); }, { cam: "pull" });
shot(42, 0, (S) => { parkSet(S, true); kid(S, 620, "thinking", false); tin(S, 1350, 780, { s: 0.7 }); card(S, "DOES IT HAVE A NAME?", 960, 200, { t: W(42, 3), size: DS.type.caption * 0.85 }); }, { cam: "push" });
shot(43, 0, (S) => { parkSet(S, true); held(S, 640, 950, { s: 1.15, face: "sad" }); kid(S, 1500, "thinking", true, { s: 0.8 }); card(S, "NOBODY EVER GAVE IT A NAME", 960, 200, { t: W(43, 5), size: DS.type.caption * 0.8 }); }, { cam: "pull" });
shot(44, 0, (S) => { parkSet(S, true); kid(S, 620, "sad", false); tin(S, 1350, 780, { s: 0.7 }); card(S, "THEN IT IS LONELY", 960, 200, { t: W(44, 4), size: DS.type.small, fill: "yellow" }); }, { cam: "push" });
// 45 "You do not answer. You look at the tin for a long time. You are a man with a billion tonnes, and a mint."
shot(45, 0, (S) => {
  parkSet(S, true);
  S.fill(rect(-40, -40, 2000, 1160), T0(S), 0, DS.c("navy", 2), 0.35);
  dave(S, 760, 950, { s: 1.4, face: "sad", pose: "look-down" });
  tin(S, 1150, 800, { s: 1.4, glow: true });
}, { cam: "zoom", focus: "1100 700" });
shot(45, 12, (S) => {
  parkSet(S, true);
  S.fill(rect(-40, -40, 2000, 1160), T0(S), 0, DS.c("navy", 2), 0.35);
  tin(S, 960, 640, { s: 1.6 });
  L.put(S, "ep89-mint", 1250, 590, { s: 1.8, t: W(45, 18) });
  card(S, "A BILLION TONNES... AND A MINT", 960, 200, { t: W(45, 15), size: DS.type.caption * 0.85 });
}, { cam: "pull" });
// ===================== chapter 7: 4:58 pm, the desk (clips 46-56) =====================
const deskScene = (S, o = {}) => {
  office(S, 4, 58);
  clerk(S, o.cx ?? 1280, 870, { s: 1.1, face: o.face || "flat", pose: o.pose || "hold" });
  counter(S, o.x ?? 1130, 900, {});
};
// 46 "You reach the desk. The clerk has a stamp in his hand and a look of great calm."
shot(46, 0, (S) => {
  deskScene(S);
  const g = S.grp(); const a = held(S, 380, 960, { s: 1.1, face: "worried", parent: g });
  shift(g, S.start + 0.3, 3.2, [0, 0], [120, 0]);
  L.put(S, "ep89-stamp", 1210, 640, { s: 0.9, t: W(46, 8) });
  card(S, "A LOOK OF GREAT CALM", 960, 560, { t: W(46, 14), size: DS.type.caption * 0.85, fill: "yellow" });
}, { cam: "push" });
// 47 (@old) 48 (@dave) 49 (@old) 50 (@brain)
shot(47, 0, (S) => { deskScene(S, { face: "smile" }); held(S, 420, 960, { s: 1.1, face: "worried" }); tag(S, "CLERK", 1280, 330, { t: W(47, 0) }); card(S, "WHAT ITEM TODAY?", 960, 610, { t: W(47, 3), size: DS.type.caption * 0.85 }); }, { cam: "push" });
shot(48, 0, (S) => { deskScene(S, { face: "flat" }); held(S, 420, 960, { s: 1.1, face: "scared" }); card(S, "NOT ON THE COUNTER, PLEASE", 960, 610, { t: W(48, 6), size: DS.type.caption * 0.85 }); }, { cam: "pull" });
shot(49, 0, (S) => {
  deskScene(S, { face: "grumpy" }); held(S, 420, 960, { s: 1.1, face: "sad" });
  L.put(S, "ep89-sign", 1130, 620, { s: 0.55, text: "POLICY", size: DS.type.body, t: W(49, 10) });
}, { cam: "push" });
shot(50, 0, (S) => {
  deskScene(S, { face: "flat" }); held(S, 420, 960, { s: 1.1, face: "worried" });
  brain(S, 720, 880, { s: 0.7, kind: "kit-brain-stern", t: W(50, 0) });
  card(S, "IT IS THE PLANET'S NOW", 960, 610, { t: W(50, 11), size: DS.type.caption * 0.8, fill: "yellow" });
}, { cam: "pull" });
// 51 "You lower the tin. The tin goes through the counter, the floor, the drains and the rock, as if it was fog. The mint goes with it."
const sink = (S, y0, y1, t0, dur, mintT) => {
  const g = S.grp(); tin(S, 0, 0, { s: 0.55, parent: g });
  g.setAttribute("transform", `translate(960 ${y0})`);
  tl.fromTo(g, { attr: { transform: `translate(960 ${y0})` } }, { attr: { transform: `translate(960 ${y1})` }, duration: dur, ease: "power1.inOut", immediateRender: false }, t0);
  if (mintT !== undefined) { const m = S.grp(); L.put(S, "ep89-mint", 0, 0, { s: 0.9, parent: m }); m.setAttribute("transform", `translate(1010 ${y0 - 90})`); tl.set(m, { opacity: 0 }, 0); tl.set(m, { opacity: 1 }, mintT); tl.fromTo(m, { attr: { transform: `translate(1010 ${y0 - 90})` } }, { attr: { transform: `translate(1010 ${y1 - 90})` }, duration: dur, ease: "power1.inOut", immediateRender: false }, t0); }
};
shot(51, 0, (S) => {
  L.put(S, "ep89-cutaway", 0, 0);
  L.put(S, "ep89-counter", 960, 330, {});
  clerk(S, 1500, 330, { s: 0.75, face: "smile" });
  dave(S, 360, 330, { s: 0.75, face: "relieved", pose: "reach" });
  sink(S, 70, 760, W(51, 4), Math.max(3, S.end - W(51, 4) - 0.8));
  [["COUNTER", 230, 6], ["FLOOR", 346, 8], ["DRAINS", 528, 10], ["ROCK", 760, 14]].forEach(([s, y, w]) => card(S, s, 1700, y, { t: W(51, w), size: DS.type.caption * 0.75 }));
}, { cam: "none" });
shot(51, 14, (S) => {
  field(S, "gray", 0);
  fillP(S, rect(0, 0, 1920, 560), "gray", 0, 1); fillP(S, rect(0, 560, 1920, 520), "red", 2, 1); fillP(S, rect(0, 560, 1920, 520), "orange", 1, 0.25);
  sink(S, 120, 800, W(51, 15), Math.max(3, S.end - W(51, 15) - 0.6), W(51, 20));
  card(S, "AS IF IT WAS FOG", 560, 200, { t: W(51, 16), size: DS.type.caption * 0.85, fill: "yellow" });
}, { cam: "none" });
// 52-55 the form
const formShot = (c, w, rows, who, dface, cardText, cw) => shot(c, w, (S) => {
  deskScene(S, { face: who });
  dave(S, 420, 960, { s: 1.1, face: dface });
  L.put(S, "ep89-form", 1650, 480, { s: 0.72, rows });
  if (cardText) card(S, cardText, 960, 610, { t: W(c, cw), size: DS.type.caption * 0.85 });
}, { cam: c % 2 ? "pull" : "push" });
formShot(52, 0, [["ITEM", "Black hole"], ["NAME", ""], ["LAST SEEN", ""], ["OWNER", ""]], "smile", "worried", "A NAME, FOR THE FORM", 5);
formShot(53, 0, [["ITEM", "Black hole"], ["NAME", "Pocket"], ["LAST SEEN", ""], ["OWNER", ""]], "smile", "sad", "POCKET", 0);
formShot(54, 0, [["ITEM", "Black hole"], ["NAME", "Pocket"], ["LAST SEEN", ""], ["OWNER", ""]], "smile", "worried", "LAST SEEN?", 4);
formShot(55, 0, [["ITEM", "Black hole"], ["NAME", "Pocket"], ["LAST SEEN", "Centre of Earth"], ["OWNER", ""]], "smile", "smile", "IN ABOUT FORTY MINUTES", 8);
// 56 "He stamps the form. Lost property: one black hole. Owner: the planet."
shot(56, 0, (S) => {
  office(S, 4, 58);
  clerk(S, 700, 870, { s: 1.2, face: "smile" });
  counter(S, 800, 900, {});
  L.put(S, "ep89-form", 1400, 460, { s: 0.85, rows: [["ITEM", "Black hole"], ["NAME", "Pocket"], ["LAST SEEN", "Centre of Earth"], ["OWNER", "The planet"]], t: S.start });
  L.put(S, "ep89-stamp", 1700, 700, { s: 1.0, t: W(56, 2) });
  L.put(S, "stamp-fact", 1400, 800, { s: 0.85, text: "FILED", c: "red", rot: -8, t: W(56, 4) });
  S.sfx(W(56, 4), "stamp", 1330); S.kick(W(56, 4), 4);
}, { cam: "push" });
// ===================== chapter 8: the last second (clips 57-60) =====================
const space = (S) => { field(S, "navy", 2); L.put(S, "star-field", 960, 540, { s: 4.2 }); };
// 57 "Pocket glows with three hundred and sixty megawatts. The Earth makes forty-seven million megawatts of its own heat. It will be the smallest radiator in the building."
shot(57, 0, (S) => {
  space(S);
  L.put(S, "sci-earth-layers", 960, 560, { s: 2.3 });
  tin(S, 960, 560, { s: 0.3 });
  L.put(S, "ep89-glow", 960, 560, { r: 110, t: W(57, 3) });
  card(S, "POCKET: 360 MEGAWATTS", 960, 150, { t: W(57, 3), size: DS.type.caption * 0.85, fill: "yellow" });
  L.put(S, "ep89-glow", 960, 560, { r: 520, t: W(57, 11) });
  card(S, "EARTH: 47 MILLION MEGAWATTS", 960, 960, { t: W(57, 11), size: DS.type.caption * 0.85 });
}, { cam: "pull" });
shot(57, 20, (S) => {
  field(S, "sand", 1); fillP(S, rect(0, 800, 1920, 280), "floor", 0, 1);
  const rad = (x, gy, k) => { for (let i = 0; i < 7; i++) S.draw(rrect(x + i * 46 * k, gy - 200 * k, 34 * k, 200 * k, DS.r.sm), T0(S), 0, { fill: DS.c("white", 0), c: DS.c("ink", 0), w: DS.w.detail }); };
  rad(1000, 860, 2.3);
  L.put(S, "ep89-glow", 1170, 640, { r: 260, t: W(57, 20) });
  rad(430, 860, 0.45); L.put(S, "ep89-glow", 470, 800, { r: 50, t: W(57, 21) }); dot(S, 470, 800, { R: 5, t: W(57, 21) });
  card(S, "THE SMALLEST RADIATOR", 560, 330, { t: W(57, 21), size: DS.type.caption * 0.8, fill: "yellow" });
  card(S, "THE EARTH", 1360, 330, { t: W(57, 21), size: DS.type.caption * 0.8 });
}, { cam: "push" });
// 58 "It will glow for about three trillion years, shrinking all the while. And a black hole that shrinks gets hotter, and faster, until the very last second."
shot(58, 0, (S) => {
  space(S);
  L.put(S, "ep89-glow", 960, 560, { r: 200 });
  dot(S, 960, 560, { R: 18 });
  card(S, "ABOUT 3 TRILLION YEARS", 960, 200, { t: W(58, 3), size: DS.type.small, fill: "yellow" });
  [1, 2, 3].forEach((k, i) => { const g = S.grp(); dot(S, 0, 0, { R: 18 - i * 5, parent: g }); g.setAttribute("transform", `translate(${1260 + i * 150} 560)`); tl.set(g, { opacity: 0 }, 0); tl.set(g, { opacity: 1 }, W(58, 7) + i * 0.3); });
  S.arrow(1070, 560, 1190, 560, W(58, 7), 0.4, { c: DS.c("white", 0), w: DS.w.near });
  card(S, "SHRINKING ALL THE WHILE", 960, 900, { t: W(58, 7), size: DS.type.caption * 0.85 });
}, { cam: "push" });
shot(58, 12, (S) => {
  space(S);
  [[480, 18, 130], [960, 12, 190], [1440, 7, 260]].forEach(([x, R, r], i) => { L.put(S, "ep89-glow", x, 560, { r, t: W(58, 13) + i * 0.5 }); dot(S, x, 560, { R, t: W(58, 13) + i * 0.5 }); });
  S.arrow(600, 560, 780, 560, W(58, 14), 0.4, { c: DS.c("white", 0), w: DS.w.near }); S.arrow(1100, 560, 1260, 560, W(58, 18), 0.4, { c: DS.c("white", 0), w: DS.w.near });
  card(S, "SMALLER", 480, 880, { t: W(58, 13), size: DS.type.caption * 0.8 }); card(S, "HOTTER", 960, 880, { t: W(58, 16), size: DS.type.caption * 0.8 }); card(S, "FASTER", 1440, 880, { t: W(58, 19), size: DS.type.caption * 0.8, fill: "yellow" });
}, { cam: "pull" });
// 59 "In that last second, a mini black hole gives off about a thousand tonnes of rest mass energy. Big by human standards, small for the universe."
shot(59, 0, (S) => {
  space(S);
  L.put(S, "ep89-glow", 960, 560, { r: 300 });
  dot(S, 960, 560, { R: 8 });
  card(S, "THE LAST SECOND", 960, 190, { t: W(59, 1), size: DS.type.small });
  card(S, "ABOUT 1,000 TONNES OF ENERGY", 960, 900, { t: W(59, 11), size: DS.type.caption * 0.85, fill: "yellow" });
}, { cam: "zoom", focus: "960 560" });
shot(59, 16, (S) => {
  space(S);
  L.put(S, "cos-galaxy-spiral", 1250, 520, { s: 2.2 });
  dave(S, 460, 940, { s: 1.0, face: "wow", pose: "look-up" });
  card(S, "BIG BY HUMAN STANDARDS", 460, 330, { t: W(59, 16), size: DS.type.caption * 0.75 });
  card(S, "SMALL FOR THE UNIVERSE", 1250, 190, { t: W(59, 21), size: DS.type.caption * 0.8, fill: "yellow" });
}, { cam: "pull" });
// 60 "If you want to know what the last second of a black hole looks like, you know the button."
shot(60, 0, (S) => {
  field(S, "dusk", 1); fillP(S, rect(0, 820, 1920, 260), "floor", 1, 1);
  dave(S, 600, 950, { s: 1.3, face: "mischief", pose: "point" });
  L.put(S, "ep-push-button-red", 1250, 760, { s: 2.0, c: "red" });
  dot(S, 1250, 420, { R: 10, t: W(60, 12) });
  card(S, "THE BUTTON", 1250, 240, { t: W(60, 17), size: DS.type.small, fill: "yellow" });
}, { cam: "push" });
// ---------- run: sort the shots by cue; each picture is fully in at its first word (0.6 s crossfade before it) ----------
SHOTS.sort((a, b) => a.c - b.c || a.w - b.w);
const WINS = sceneWindows(SHOTS.map((s) => [s.c, s.w]), 0);
SHOTS.forEach((s, k) => {
  const [a, b] = WINS[k], S = scene(a, b, s.o || {}), g0 = S.g.parentNode;
  S.end = b;
  s.fn(S);
  if (!(s.o && s.o.nohud)) hud(S, s.c, s.w);
  if (s.w === 0 && CHAPT[s.c]) S.sfx(S.start + 0.3, "tick", 1640);  // chapter = the HUD clock jumps (no centre card: it hit signs and clocks)
  if (k > 0) { g0.style.display = "none"; tl.set(g0, { display: "inline" }, Math.max(0, a - 0.6)); }
  if (k < SHOTS.length - 1) tl.set(g0, { display: "none" }, b);
});
