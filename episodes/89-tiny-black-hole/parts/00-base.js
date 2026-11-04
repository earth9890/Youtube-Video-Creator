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
