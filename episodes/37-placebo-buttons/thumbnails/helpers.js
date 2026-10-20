// shared kit for the thumbnails (a copy of the base of ../scenes.js)
// Why You Press Buttons That Do Nothing (~8:32). Mystery: Dave's morning has three buttons. Which ones work, on what, and why are the dead ones still there?
// Runner: DAVE'S SCOREBOARD (PRESSED / WORKED; rows: walk button, door-close, thermostat). Three ticks in the hook; WORKED crossed out section by section
// (lottery ticket / fire dept / never touched the temperature); a taped-on WORKED ON DAVE column at the answer; re-scored at the end (machine: maybe 1, Dave: 3).
// Roadmap: three buttons (walk = lying to Dave, door-close = working for somebody else, thermostat = working on Dave).
// Real people (Langer, Glass, Singer, Kounios, the Wharton team, a city official, the lift-industry head) are name cards on generic figures, never likenesses.
// Buttons get big press animations: the cap sinks, a burst flashes, a finger (Dave's blue sleeve) jabs in.

// ---------- people ----------
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
// firefighter: red helmet with a gold shield, tan coat, reflective band
const fireman = (S, x, gy, layer = "near", o = {}) => {
  const F = who(S, x, gy, layer, Object.assign({ s: 1.1, hair: "none", outfitC: DS.c("sand", 2), mood: "determined" }, o)), R = F.r, [hx, hy] = F.hd, k = F.s;
  DS.shape(S, `M${hx - 1.02 * R} ${hy - 0.4 * R} Q${hx - 0.98 * R} ${hy - 1.42 * R} ${hx} ${hy - 1.4 * R} Q${hx + 0.98 * R} ${hy - 1.42 * R} ${hx + 1.02 * R} ${hy - 0.4 * R} Z`, "red", { w: "detail", parent: F.g });
  DS.shape(S, `M${hx - 1.25 * R} ${hy - 0.5 * R} H${hx + 1.5 * R} Q${hx + 1.58 * R} ${hy - 0.3 * R} ${hx + 1.25 * R} ${hy - 0.3 * R} H${hx - 1.1 * R} Z`, "red", { tone: 2, w: "detail", parent: F.g });
  DS.shape(S, rrect(hx - 0.26 * R, hy - 1.24 * R, 0.52 * R, 0.6 * R, DS.r.xs), "gold", { w: "hair", parent: F.g });
  [F.sh[1] + 70 * k, F.hip[1] - 4 * k].forEach((y) => DS.shape(S, rect(F.cx - 32 * k, y, 64 * k, 10 * k), "yellow", { w: "hair", flat: true, parent: F.g }));
  return F;
};
// named stand-ins (no likenesses)
const LANGER = { s: 1.05, hair: "bun", hairC: DS.c("brown", 2), outfitC: DS.c("purple") };
const GLASS = { s: 1.1, hair: "short", hairC: DS.c("ink"), outfitC: DS.c("gray", 2), tieC: "gold", specs: true };
const SINGER = { s: 1.1, hair: "side", hairC: DS.c("brown", 2), outfitC: DS.c("earth"), tieC: "navy" };
const KOUNIOS = { s: 1.1, hair: "short", hairC: DS.c("gray", 1), outfitC: DS.c("navy"), specs: true };
const OFFICIAL = { s: 1.1, hair: "short", hairC: DS.c("ink", 1), outfitC: DS.c("gray", 2), tieC: "red" };
const LIFTBOSS = { s: 1.05, hair: "bun", hairC: DS.c("ink"), outfitC: DS.c("navy"), tieC: "gold" };
const LABCOAT = { s: 1.1, hair: "side", hairC: DS.c("ink", 1), outfitC: DS.c("white", 2), tieC: "navy" };
const KID = { s: 0.62, hair: "curly", hairC: DS.c("brown", 2), outfitC: DS.c("orange") };
const SITTER = { s: 1.05, hair: "bun", hairC: DS.c("earth", 2), outfitC: DS.c("green") };
const OC = ["green", "purple", "orange", "pink", "gold", "earth", "gray", "red"]; // no blue: blue is Dave's
const person = (S, x, gy, layer, i, o = {}) => who(S, x, gy, layer, Object.assign({ s: 1.1, hair: ["short", "bun", "curly", "side"][i % 4], hairC: DS.c(["brown", "ink", "earth", "gray"][i % 4], i % 4 === 3 ? 1 : 2), outfitC: DS.c(OC[i % 8]), mood: "flat", look: ((i % 3) - 1) * 5 }, o));
// seated behind a desk (drawn after it, so it hides the legs)
const seated = (S, x, top, layer, o = {}, make = who) => make(S, x, top + 46 * (o.s || 1.1) * DS.depth[layer].s, layer, Object.assign({ sit: true, pose: "hold" }, o));
const ARM = { stand: [[-28, 52], [-48, 100]], reach: [[62, 10], [134, 8]], near: [[54, 12], [106, 10]], up: [[62, -10], [130, -44]], upNear: [[54, -6], [104, -34]] };
// arm jabs: right arm swings between "near" and "reach" n times (gap s); kind "up" for a raised button
const jabArm = (S, F, t, n = 1, gap = 0.4, kind = "reach") => { const nr = kind === "up" ? ARM.upNear : ARM.near, fr = kind === "up" ? ARM.up : ARM.reach; for (let i = 0; i < n; i++) { F.setPose(t + i * gap, null, [ARM.stand, fr]); if (i < n - 1 || kind !== "hold") F.setPose(t + i * gap + gap * 0.55, null, [ARM.stand, nr]); } };

// ---------- small kit ----------
let CP = 0;
const clipTo = (g, d) => { const id = "cp37-" + ++CP, cp = el("clipPath", { id }, dsDefs()); el("path", { d }, cp); g.setAttribute("clip-path", `url(#${id})`); return g; };
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

// ---------- pressing ----------
// B = a pressable button { cap (group), cx, cy, r }. The cap sinks (scale 0.86) and springs back; a burst flashes round it.
const jab = (S, B, t, n = 1, gap = 0.3, o = {}) => {
  const tf = (k) => `translate(${B.cx} ${B.cy}) scale(${k}) translate(${-B.cx} ${-B.cy})`;
  for (let i = 0; i < n; i++) {
    const tt = t + i * gap;
    tl.fromTo(B.cap, { attr: { transform: tf(1) } }, { attr: { transform: tf(0.86) }, duration: 0.05, ease: "power2.in", immediateRender: false }, tt);
    if (!o.hold) tl.to(B.cap, { attr: { transform: tf(1) }, duration: 0.12, ease: "back.out(2)" }, tt + Math.min(0.08, gap * 0.4));
    if (o.flash !== false) flash(S, rays(B.cx, B.cy, B.r * 1.45, B.r * 1.95, 10, -Math.PI / 2 + 0.3), tt + 0.04, o.fc || DS.c("orange"), o.parent);
  }
};
const release = (B, t) => { const tf = (k) => `translate(${B.cx} ${B.cy}) scale(${k}) translate(${-B.cx} ${-B.cy})`; tl.fromTo(B.cap, { attr: { transform: tf(0.86) } }, { attr: { transform: tf(1) }, duration: 0.15, ease: "back.out(2)", immediateRender: false }, t); };
// close-up finger: tip at (x, y), pointing along ang (deg; 0 = right), sleeve colour by name. Returns { g, poke(t, n, gap), hold(t), away(t) }
const finger = (S, x, y, ang, k = 1, o = {}) => {
  const outer = S.grp(o.parent); outer.setAttribute("transform", `translate(${x} ${y}) rotate(${ang}) scale(${k})`);
  const g = S.grp(outer), dist = o.dist ?? 46; g.setAttribute("transform", `translate(${-dist} 0)`);
  const W1 = DS.w.near / Math.sqrt(k), sl = o.sleeve || "blue";
  S.draw(rrect(-640, -66, 380, 132, DS.r.sm), S.start, 0, { fill: DS.vol(sl), c: DS.P.ink[0], w: W1, parent: g });
  S.draw(rect(-290, -70, 30, 140), S.start, 0, { fill: DS.c(sl, 2), c: DS.P.ink[0], w: W1, parent: g });
  S.draw(rrect(-272, -36, 180, 128, DS.r.lg * 1.4), S.start, 0, { fill: DS.P.white[0], c: DS.P.ink[0], w: W1, parent: g });
  S.draw(`M-236 92 Q-226 60 -236 34 M-196 92 Q-186 60 -196 34 M-156 92 Q-146 60 -156 34`, S.start, 0, { c: DS.c("gray", 2), w: DS.w.detail, parent: g });
  S.draw(rrect(-150, -22, 150, 44, DS.r.md * 1.1), S.start, 0, { fill: DS.P.white[0], c: DS.P.ink[0], w: W1, parent: g });
  S.draw(rrect(-38, -16, 28, 18, DS.r.xs), S.start, 0, { fill: DS.c("pink", 1), c: DS.c("gray", 2), w: DS.w.hair, parent: g });
  S.draw(rrect(-246, -52, 108, 40, DS.r.md), S.start, 0, { fill: DS.P.white[0], c: DS.P.ink[0], w: W1, parent: g });
  fadeG(S, outer, o.t);
  const out = `translate(${-dist} 0)`, inn = "translate(0 0)";
  return {
    g: outer,
    poke: (t, n = 1, gap = 0.3) => { for (let i = 0; i < n; i++) { const tt = t + i * gap; tl.fromTo(g, { attr: { transform: out } }, { attr: { transform: inn }, duration: 0.06, ease: "power2.in", immediateRender: false }, tt); tl.to(g, { attr: { transform: out }, duration: 0.12, ease: "power2.out" }, tt + Math.min(0.09, gap * 0.45)); } },
    hold: (t) => tl.fromTo(g, { attr: { transform: out } }, { attr: { transform: inn }, duration: 0.12, ease: "power2.in", immediateRender: false }, t),
    away: (t) => tl.fromTo(g, { attr: { transform: inn } }, { attr: { transform: `translate(${-dist * 3} 0)` }, duration: 0.3, ease: "power2.out", immediateRender: false }, t),
  };
};
// finger + button together: n jabs from t
const pressBy = (S, Fg, B, t, n = 1, gap = 0.3, o = {}) => { Fg.poke(t, n, gap); jab(S, B, t + 0.05, n, gap, o); };

// ---------- the walk button (New York) ----------
// front view; (cx, cy) = button centre. o.sign: sign plate above (o.words = lettering, needs k >= 1); o.cable: "cut" dangling copper end | "in" (default)
// o.dead = grey cap. Returns B = { cap, cx, cy, r, g, rows: [y of PUSH BUTTON, y of WAIT FOR WALK SIGNAL], sx: [x0, x1] }
const walkBox = (S, cx, cy, k = 1, o = {}) => {
  const t = o.t, g = S.grp(o.parent), L = o.layer || "near", W1 = k >= 0.8 ? "near" : k >= 0.5 ? "mid" : "detail";
  const B = { cx, cy, r: 54 * k, g };
  if (o.sign !== false) {
    const sw = 460 * k, sh = 330 * k, sx = cx - sw / 2, sy = cy - 120 * k - sh - (o.signUp || 0) * k;
    DS.drop(S, rrect(sx + 6, sy + 8, sw, sh, DS.r.sm * k), { t, parent: g });
    DS.shape(S, rrect(sx, sy, sw, sh, DS.r.sm * k), "white", { t, layer: L, flat: true, w: W1 === "near" ? "mid" : "detail", parent: g });
    S.draw(rrect(sx + 12 * k, sy + 12 * k, sw - 24 * k, sh - 24 * k, DS.r.xs * k), t ?? S.start, 0, { c: DS.c("ink", 0, L), w: DS.w.detail, parent: g });
    [sx + 30 * k, sx + sw - 30 * k].forEach((bx) => DS.shape(S, circ(bx, sy + 30 * k, 7 * k), "gray", { t, w: "hair", parent: g }));
    B.rows = [sy + 150 * k, sy + 250 * k]; B.sx = [sx + 30 * k, sx + sw - 30 * k];
    if (o.words) {
      const ink = DS.c("ink");
      txt(S, "TO CROSS STREET", cx, sy + 80 * k, { t, parent: g, c: ink });
      txt(S, "PUSH BUTTON", cx, sy + 168 * k, { t, size: DS.type.small, parent: g, c: ink });
      txt(S, "WAIT FOR", cx, sy + 240 * k, { t, parent: g, c: ink });
      txt(S, "WALK SIGNAL", cx, sy + 288 * k, { t, parent: g, c: ink });
    } else {
      [[90, 0.62], [150, 0.8], [215, 0.5], [255, 0.66]].forEach(([dy, f]) => DS.shape(S, rrect(cx - (sw * f) / 2, sy + dy * k, sw * f, (dy === 150 ? 30 : 20) * k, DS.r.xs * k), "ink", { t, layer: L, flat: true, w: "hair", parent: g }));
    }
    S.draw(`M${cx} ${sy + sh} V${cy - 100 * k}`, t ?? S.start, 0, { c: DS.c("gray", 2, L), w: DS.w.near * k * 2, parent: g });
  }
  if (o.cable === "cut") {
    const cl = (o.cableLen || 300) / 300, p = [[cx + 30 * k, cy + 100 * k], [cx + 46 * k, cy + (100 + 70 * cl) * k], [cx + 8 * k, cy + (100 + 136 * cl) * k], [cx + 26 * k, cy + (100 + 200 * cl) * k]], [ex, ey] = p[3];
    const cg = S.grp(g);
    S.draw(smooth(p), S.start, 0, { c: DS.c("ink", 1, L), w: DS.w.near * 2.3 * k, parent: cg });
    S.draw(`M${ex - 8 * k} ${ey} l${-10 * k} ${26 * k} M${ex} ${ey + 2 * k} l${2 * k} ${30 * k} M${ex + 8 * k} ${ey} l${14 * k} ${24 * k}`, S.start, 0, { c: DS.c("orange", 0, L), w: DS.w.mid * Math.max(k, 0.6), parent: cg });
    if (o.ring !== false) S.draw(circ(ex + 2 * k, ey + 14 * k, 44 * k), o.ringT ?? o.t ?? S.start, 0, { c: DS.c("red"), w: DS.w.near, parent: cg });
    fadeG(S, cg, o.cableT ?? t);
    B.cut = [ex, ey + 14 * k];
  }
  DS.drop(S, rrect(cx - 130 * k + 6, cy - 100 * k + 10, 260 * k, 200 * k, DS.r.md * k), { t, parent: g });
  DS.shape(S, rrect(cx - 130 * k, cy - 100 * k, 260 * k, 200 * k, DS.r.md * k), "yellow", { t, layer: L, w: W1, parent: g });
  [[-104, -74], [104, -74], [-104, 74], [104, 74]].forEach(([dx, dy]) => DS.shape(S, circ(cx + dx * k, cy + dy * k, 8 * k), "gray", { t, layer: L, tone: 2, w: "hair", parent: g }));
  DS.shape(S, circ(cx, cy, 74 * k), "ink", { t, layer: L, w: W1 === "near" ? "mid" : "detail", parent: g });
  B.cap = S.grp(g);
  DS.shape(S, circ(cx, cy, 54 * k), o.dead ? "gray" : "gray", { t, layer: L, tone: o.dead ? 2 : 1, w: W1 === "near" ? "mid" : "detail", parent: B.cap });
  S.fill(circ(cx - 16 * k, cy - 18 * k, 18 * k, 11 * k), t ?? S.start, 0, DS.P.white[0], o.dead ? 0.25 : 0.75, B.cap);
  return B;
};
// close-up walk button with its sign: the standard big framing (k 1.0-1.3)
const pole = (S, x, top, gy, o = {}) => { const L = o.layer || "near"; if (!o.float) DS.shadow(S, x, gy, 90, { op: 0.18 }); DS.shape(S, rect(x - 15, top, 30, gy - top), "gray", { layer: L, tone: 2, dir: "h", w: L === "near" ? "mid" : "detail", parent: o.parent }); };
// pedestrian signal head (NYC): orange hand above, white walker below. o.walk = time it switches to WALK (or true)
const pedSig = (S, x, y, k = 1, o = {}) => {
  const g = S.grp(o.parent), L = o.layer || "near";
  DS.shape(S, rrect(x - 66 * k, y - 112 * k, 132 * k, 224 * k, DS.r.sm * k), "ink", { layer: L, tone: 1, w: "detail", parent: g });
  [-54, 54].forEach((dy) => DS.shape(S, rrect(x - 50 * k, y + dy * k - 46 * k, 100 * k, 92 * k, DS.r.xs * k), "ink", { layer: L, tone: 2, flat: true, w: "hair", parent: g }));
  const hand = S.grp(g), walker = S.grp(g), hx = x, hy = y - 54 * k;
  S.draw(rrect(hx - 22 * k, hy - 8 * k, 44 * k, 42 * k, DS.r.sm * k), S.start, 0, { fill: DS.c("orange", 1), c: DS.c("orange", 0), w: DS.w.hair, parent: hand });
  [-17, -6, 5, 16].forEach((dx, i) => S.draw(rrect(hx + dx * k - 5 * k, hy - (30 - (i % 3) * 3) * k, 10 * k, 30 * k, 5 * k), S.start, 0, { fill: DS.c("orange", 1), c: DS.c("orange", 0), w: DS.w.hair, parent: hand }));
  const wy = y + 54 * k;
  S.draw(`M${x - 4 * k} ${wy - 12 * k} L${x - 8 * k} ${wy + 14 * k} M${x - 8 * k} ${wy + 14 * k} L${x - 22 * k} ${wy + 36 * k} M${x - 8 * k} ${wy + 14 * k} L${x + 10 * k} ${wy + 36 * k} M${x - 22 * k} ${wy} L${x - 4 * k} ${wy - 10 * k} L${x + 16 * k} ${wy + 2 * k}`, S.start, 0, { c: DS.P.white[0], w: DS.w.mid * k, parent: walker });
  S.fill(circ(x, wy - 26 * k, 9 * k), S.start, 0, DS.P.white[0], 1, walker);
  const on = (el2, t) => { el2.setAttribute("opacity", 0.12); tl.fromTo(el2, { opacity: 0.12 }, { opacity: 1, duration: 0.15, immediateRender: false }, t); }, off = (el2, t) => tl.fromTo(el2, { opacity: 1 }, { opacity: 0.12, duration: 0.15, immediateRender: false }, t);
  if (o.walk === true) hand.setAttribute("opacity", 0.12);
  else { walker.setAttribute("opacity", 0.12); if (o.walk !== undefined) { off(hand, o.walk); on(walker, o.walk); } }
  return { g, hand, walker, on, off };
};
// side-view car (faces right); returns group for moving
const car = (S, x, gy, k = 1, name = "red", o = {}) => {
  const g = S.grp(o.parent), L = o.layer || "mid";
  DS.shadow(S, x, gy, 300 * k, { parent: g });
  DS.shape(S, `M${x - 150 * k} ${gy - 34 * k} V${gy - 84 * k} Q${x - 146 * k} ${gy - 98 * k} ${x - 120 * k} ${gy - 100 * k} L${x - 80 * k} ${gy - 104 * k} L${x - 46 * k} ${gy - 150 * k} H${x + 50 * k} L${x + 92 * k} ${gy - 102 * k} L${x + 136 * k} ${gy - 94 * k} Q${x + 154 * k} ${gy - 88 * k} ${x + 154 * k} ${gy - 66 * k} V${gy - 34 * k} Z`, name, { layer: L, w: "mid", parent: g });
  DS.shape(S, `M${x - 66 * k} ${gy - 104 * k} L${x - 40 * k} ${gy - 138 * k} H${x - 4 * k} V${gy - 104 * k} Z M${x + 8 * k} ${gy - 104 * k} V${gy - 138 * k} H${x + 44 * k} L${x + 74 * k} ${gy - 104 * k} Z`, "glass", { layer: L, w: "detail", parent: g });
  [-90, 90].forEach((dx) => { DS.shape(S, circ(x + dx * k, gy - 30 * k, 30 * k), "ink", { layer: L, tone: 1, w: "detail", parent: g }); DS.shape(S, circ(x + dx * k, gy - 30 * k, 12 * k), "gray", { layer: L, w: "hair", parent: g }); });
  DS.shape(S, rrect(x + 136 * k, gy - 84 * k, 18 * k, 14 * k, DS.r.xs), "yellow", { layer: L, w: "hair", parent: g });
  return fadeG(S, g, o.t);
};
// London double-decker bus (faces right)
const bus = (S, x, gy, k = 1, o = {}) => {
  const g = S.grp(o.parent), L = o.layer || "mid";
  DS.shadow(S, x, gy, 640 * k, { parent: g });
  DS.shape(S, rrect(x - 320 * k, gy - 400 * k, 640 * k, 370 * k, DS.r.md * k), "red", { layer: L, w: "mid", parent: g });
  [[-300, -380], [-300, -240]].forEach(([dx, dy]) => { for (let i = 0; i < 5; i++) DS.shape(S, rrect(x + (dx + i * 116) * k, gy + dy * k, 96 * k, 92 * k, DS.r.xs * k), "glass", { layer: L, w: "detail", parent: g }); });
  DS.shape(S, rect(x - 320 * k, gy - 270 * k, 640 * k, 16 * k), "red", { layer: L, tone: 2, flat: true, w: "hair", parent: g });
  [-200, 200].forEach((dx) => { DS.shape(S, circ(x + dx * k, gy - 34 * k, 40 * k), "ink", { layer: L, tone: 1, w: "detail", parent: g }); DS.shape(S, circ(x + dx * k, gy - 34 * k, 16 * k), "gray", { layer: L, w: "hair", parent: g }); });
  return fadeG(S, g, o.t);
};

// ---------- streets ----------
const BLD = [[-80, 300, 380, "earth"], [230, 250, 300, "wall"], [490, 330, 430, "gray"], [830, 270, 340, "sand"], [1110, 340, 460, "earth"], [1460, 260, 310, "wall"], [1730, 330, 400, "gray"]];
const BLD_LDN = [[-80, 420, 330, "wall"], [350, 380, 350, "sand"], [740, 420, 330, "white"], [1170, 380, 350, "wall"], [1560, 460, 330, "sand"]];
const DAY = { hy: 600, sky: "sky", hills: "gray", ground: "gray", sun: [1700, 110] }, DAWN = { hy: 600, sky: "dusk", hills: "gray", ground: "gray", sun: [1640, 420] }, NIGHT = { hy: 600, sky: "night", hills: "gray", ground: "gray", sun: false };
// city street: buildings (far), road (mid), pavement (near, ground y 960). o.ldn = London stucco terraces; o.zebra = crossing stripes x0
const street = (S, O = DAY, o = {}) => { // call DS.outdoor(S, O) first
  const hy = O.hy, night = O.sky === "night";
  (o.ldn ? BLD_LDN : BLD).forEach(([x, w, h, n], i) => {
    DS.shape(S, rect(x, hy - h, w, h + 60), n, { layer: "far", dir: "h", tone: o.ldn && n === "white" ? 2 : 0 });
    if (o.ldn) { DS.shape(S, rect(x - 10, hy - h - 24, w + 20, 30), n, { layer: "far", tone: 2, w: "far" }); for (let c = 0; c < Math.floor(w / 80); c++) DS.shape(S, rect(x + 24 + c * 80, hy - h + 40, 44, 90), night ? "yellow" : "glass", { layer: "far", flat: true, tone: night ? 1 : 2, w: "far" }); for (let c = 0; c < Math.floor(w / 80); c++) DS.shape(S, rect(x + 24 + c * 80, hy - h + 170, 44, 70), night ? "navy" : "glass", { layer: "far", flat: true, tone: 2, w: "far" }); return; }
    const cols = Math.floor((w - 30) / 72), rows = Math.floor((h - 50) / 90);
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { const lit = night && (r * 3 + c * 5 + i) % 4 === 0; S.fill(rect(x + 30 + c * 72, hy - h + 36 + r * 90, 36, 50), S.start, 0, lit ? DS.c("yellow", 1, "far") : DS.c(night ? "navy" : "glass", night ? 1 : 2, "far"), 1); }
  });
  DS.shape(S, rect(-200, hy + 40, 2320, 210), "ink", { layer: "mid", tone: 1, flat: true, w: "hair" });
  for (let x = -100; x < 2000; x += 220) S.fill(rect(x, hy + 138, 110, 10), S.start, 0, DS.c("yellow", 0, "mid"), 0.8);
  if (o.zebra !== undefined) for (let i = 0; i < 6; i++) S.fill(`M${o.zebra + i * 70} ${hy + 46} h44 l20 196 h-44 Z`, S.start, 0, DS.c("white", 0, "mid"), 0.9);
  DS.shape(S, rect(-200, hy + 250, 2320, 22), "gray", { layer: "mid", tone: 1, flat: true, w: "detail" });
  DS.shape(S, rect(-200, hy + 272, 2320, 600), "paper", { tone: 2, flat: true, w: "hair" });
  for (let x = -120; x < 2100; x += 260) S.draw(line([x, hy + 272], [x - 120, 1080], 0), S.start, 0, { c: DS.c("gray", 1), w: DS.w.hair });
  return { hy, kerb: hy + 260 };
};

// ---------- the UK push-button unit (Puffin / junction) ----------
// (cx, cy) = button centre. Grey box: red/green man window on top, square button, WAIT lamp below.
// o.wait / o.waitOff = times the WAIT lamp lights / goes dark; o.green = time the green man shows. Returns B + { waitAt }
const ukBox = (S, cx, cy, k = 1, o = {}) => {
  const t = o.t, g = S.grp(o.parent), L = o.layer || "near", W1 = k >= 0.8 ? "near" : k >= 0.5 ? "mid" : "detail";
  DS.drop(S, rrect(cx - 120 * k + 6, cy - 250 * k + 10, 240 * k, 410 * k, DS.r.md * k), { t, parent: g });
  DS.shape(S, rrect(cx - 120 * k, cy - 250 * k, 240 * k, 410 * k, DS.r.md * k), "gray", { t, layer: L, tone: 1, w: W1, parent: g });
  DS.shape(S, rrect(cx - 84 * k, cy - 224 * k, 168 * k, 136 * k, DS.r.sm * k), "ink", { t, layer: L, flat: true, w: "detail", parent: g });
  const red = S.grp(g), grn = S.grp(g), mx = cx, my = cy - 156 * k;
  S.draw(`M${mx} ${my - 18 * k} V${my + 16 * k} M${mx - 12 * k} ${my + 44 * k} L${mx - 6 * k} ${my + 14 * k} H${mx + 6 * k} L${mx + 12 * k} ${my + 44 * k} M${mx - 18 * k} ${my + 14 * k} V${my - 12 * k} H${mx + 18 * k} V${my + 14 * k}`, S.start, 0, { c: DS.c("red"), w: DS.w.mid * k, parent: red });
  S.fill(circ(mx, my - 32 * k, 9 * k), S.start, 0, DS.c("red"), 1, red);
  S.draw(`M${mx - 2 * k} ${my - 16 * k} L${mx - 6 * k} ${my + 12 * k} L${mx - 22 * k} ${my + 42 * k} M${mx - 6 * k} ${my + 12 * k} L${mx + 14 * k} ${my + 42 * k} M${mx - 24 * k} ${my} L${mx - 2 * k} ${my - 12 * k} L${mx + 20 * k} ${my + 2 * k}`, S.start, 0, { c: DS.c("green", 1), w: DS.w.mid * k, parent: grn });
  S.fill(circ(mx + 2 * k, my - 30 * k, 9 * k), S.start, 0, DS.c("green", 1), 1, grn);
  grn.setAttribute("opacity", 0.1);
  if (o.green !== undefined) { tl.fromTo(grn, { opacity: 0.1 }, { opacity: 1, duration: 0.15, immediateRender: false }, o.green); tl.fromTo(red, { opacity: 1 }, { opacity: 0.1, duration: 0.15, immediateRender: false }, o.green); }
  DS.shape(S, rrect(cx - 56 * k, cy - 56 * k, 112 * k, 112 * k, DS.r.sm * k), "ink", { t, layer: L, w: "detail", parent: g });
  const B = { cx, cy, r: 42 * k, g, cap: S.grp(g) };
  DS.shape(S, rrect(cx - 40 * k, cy - 40 * k, 80 * k, 80 * k, DS.r.sm * k), "gray", { t, layer: L, tone: 1, w: "detail", parent: B.cap });
  S.fill(rrect(cx - 30 * k, cy - 32 * k, 34 * k, 14 * k, DS.r.xs * k), t ?? S.start, 0, DS.P.white[0], 0.7, B.cap);
  DS.shape(S, rrect(cx - 84 * k, cy + 76 * k, 168 * k, 62 * k, DS.r.xs * k), "ink", { t, layer: L, flat: true, w: "detail", parent: g });
  const lamp = S.grp(g);
  if (k >= 0.9) S.text("WAIT", cx, cy + 122 * k, { size: DS.type.caption, c: DS.c("orange", 1), t: T0(S), parent: lamp });
  else S.fill(rrect(cx - 60 * k, cy + 92 * k, 120 * k, 30 * k, DS.r.xs * k), S.start, 0, DS.c("orange", 1), 1, lamp);
  lamp.setAttribute("opacity", o.waitOn ? 1 : 0.12);
  if (o.wait !== undefined) tl.fromTo(lamp, { opacity: 0.12 }, { opacity: 1, duration: 0.12, immediateRender: false }, o.wait);
  if (o.waitOff !== undefined) tl.fromTo(lamp, { opacity: 1 }, { opacity: 0.12, duration: 0.2, immediateRender: false }, o.waitOff);
  B.lamp = lamp; B.red = red; B.grn = grn;
  return B;
};
// kerbside detector on a pole top + its watched zone on the pavement (dashed outline only: never a fill over people)
const sensor = (S, x, y, zx, zy, zw, o = {}) => {
  const g = S.grp(o.parent);
  DS.shape(S, rrect(x - 40, y - 30, 80, 60, DS.r.sm), "gray", { tone: 2, w: "detail", parent: g });
  DS.shape(S, circ(x + 18, y + 14, 16), "ink", { w: "hair", parent: g });
  S.fill(circ(x + 14, y + 10, 5), S.start, 0, DS.c("red", 1), 1, g);
  [dash(S.draw(line([x + 10, y + 30], [zx - zw / 2, zy], 0), S.start, 0, { c: DS.c("yellow", 2), w: DS.w.mid, parent: g }), 18, 16), dash(S.draw(line([x + 26, y + 30], [zx + zw / 2, zy], 0), S.start, 0, { c: DS.c("yellow", 2), w: DS.w.mid, parent: g }), 18, 16), dash(S.draw(circ(zx, zy, zw / 2, zw * 0.12), S.start, 0, { c: DS.c("yellow", 2), w: DS.w.mid, parent: g }), 18, 16)];
  return fadeG(S, g, o.t);
};

// ---------- the lift ----------
// round door button: kind "close" (▶|◀) or "open" (◀|▶). Returns B
const doorBtn = (S, cx, cy, r, kind = "close", o = {}) => {
  const g = S.grp(o.parent), t = o.t;
  DS.shape(S, circ(cx, cy, r * 1.22), "gray", { t, tone: 2, w: "detail", parent: g });
  const B = { cx, cy, r, g, cap: S.grp(g) };
  DS.shape(S, circ(cx, cy, r), o.lit ? "gold" : "gray", { t, tone: 1, w: "detail", parent: B.cap });
  const a = r * 0.52, h = r * 0.42, sgn = kind === "close" ? 1 : -1, ink = DS.c("ink");
  [-1, 1].forEach((sd) => { const x0 = cx + sd * (kind === "close" ? r * 0.66 : r * 0.14), x1 = cx + sd * (kind === "close" ? r * 0.14 : r * 0.66); S.draw(`M${x0} ${cy - h} L${x1} ${cy} L${x0} ${cy + h} Z`, t ?? S.start, 0, { fill: ink, c: ink, w: DS.w.hair, parent: B.cap }); });
  S.draw(line([cx, cy - a], [cx, cy + a], 0), t ?? S.start, 0, { c: ink, w: Math.max(DS.w.detail, r * 0.09), parent: B.cap });
  return B;
};
// car operating panel: floors 1-6, door open / door close, fire-service key switch. Returns { close, open, key: [x, y], keyG, g }
const liftPanel = (S, cx, cy, k = 1, o = {}) => {
  const t = o.t, g = S.grp(o.parent), L = o.layer || "near", wd = 240 * k, ht = 600 * k, x0 = cx - wd / 2, y0 = cy - ht / 2;
  DS.drop(S, rrect(x0 + 6, y0 + 10, wd, ht, DS.r.sm * k), { t, parent: g });
  DS.shape(S, rrect(x0, y0, wd, ht, DS.r.sm * k), "gray", { t, layer: L, tone: 1, dir: "v", w: k >= 0.8 ? "mid" : "detail", parent: g });
  for (let i = 0; i < 6; i++) { const bx = cx + (i % 2 ? 50 : -50) * k, by = y0 + (110 + Math.floor((5 - i) / 2) * 90) * k;
    DS.shape(S, circ(bx, by, 30 * k), "gray", { t, layer: L, tone: 2, w: "detail", parent: g }); DS.shape(S, circ(bx, by, 24 * k), "white", { t, layer: L, tone: 2, w: "hair", parent: g });
    if (k >= 0.9) txt(S, String(i + 1), bx, by + 13 * k, { t, parent: g, c: DS.c("ink") }); else S.fill(rect(bx - 3 * k, by - 10 * k, 6 * k, 20 * k), t ?? S.start, 0, DS.c("ink"), 1, g); }
  const open = doorBtn(S, cx - 52 * k, y0 + 420 * k, 34 * k, "open", { t, parent: g }), close = doorBtn(S, cx + 52 * k, y0 + 420 * k, 34 * k, "close", { t, parent: g, lit: o.lit });
  const kx = cx, ky = y0 + 530 * k;
  DS.shape(S, rrect(kx - 70 * k, ky - 40 * k, 140 * k, 80 * k, DS.r.xs * k), "red", { t, layer: L, w: "detail", parent: g });
  DS.shape(S, circ(kx + 34 * k, ky, 22 * k), "gray", { t, layer: L, tone: 1, w: "detail", parent: g });
  const keyG = S.grp(g); S.draw(line([kx + 34 * k, ky - 12 * k], [kx + 34 * k, ky + 12 * k], 0), t ?? S.start, 0, { c: DS.c("ink"), w: DS.w.mid * k, parent: keyG });
  if (k >= 0.9) txt(S, "FIRE", kx - 26 * k, ky + 13 * k, { t, parent: g, c: DS.P.white[0] }); else S.fill(rect(kx - 50 * k, ky - 8 * k, 44 * k, 16 * k), t ?? S.start, 0, DS.P.white[0], 1, g);
  return { g, close, open, key: [kx + 34 * k, ky], keyG };
};
// fire-service key in the switch; turns on t
const fireKey = (S, P, k, t0, turn) => { const [x, y] = P.key, g = S.grp(P.g); DS.shape(S, rrect(x - 8 * k, y - 60 * k, 16 * k, 54 * k, DS.r.xs), "gold", { w: "detail", parent: g }); DS.shape(S, circ(x, y - 76 * k, 24 * k), "gold", { w: "detail", parent: g }); S.fill(circ(x, y - 78 * k, 8 * k), S.start, 0, DS.c("gray", 2), 1, g); fadeG(S, g, t0); if (turn !== undefined) spin(g, turn, 0.4, 0, 90, x, y); return g; };
// sliding doors in a frame, lobby behind. o.open = 0..1 at the start. Returns { g, to(f, t, dur) }
const liftDoors = (S, x, y, w, h, o = {}) => {
  const g = S.grp(o.parent), L = o.layer || "mid";
  DS.shape(S, rect(x, y, w, h), "dusk", { layer: L, tone: 1, flat: true, w: "hair", parent: g });
  DS.shape(S, rect(x, y + h * 0.8, w, h * 0.2), "floor", { layer: L, flat: true, w: "hair", parent: g });
  DS.shape(S, rrect(x + w * 0.62, y + h * 0.2, w * 0.24, h * 0.3, DS.r.xs), "sky", { layer: L, tone: 1, w: "detail", parent: g });
  DS.shape(S, `M${x + w * 0.2} ${y + h * 0.8} h${w * 0.14} l-${w * 0.02} -${h * 0.12} h-${w * 0.1} Z`, "orange", { layer: L, w: "detail", parent: g });
  S.fill(circ(x + w * 0.27, y + h * 0.6, w * 0.08, h * 0.1), S.start, 0, DS.c("green", 0, L), 1, g);
  const leaves = clipTo(S.grp(g), rect(x, y, w, h));
  const mk = (x0) => { const lg = S.grp(leaves); DS.shape(S, rect(x0, y, w / 2, h), "gray", { layer: L, tone: 1, dir: "h", w: "detail", parent: lg }); S.draw(line([x0 + w * 0.12, y + 20], [x0 + w * 0.12, y + h - 20], 0) + line([x0 + w * 0.38, y + 20], [x0 + w * 0.38, y + h - 20], 0), S.start, 0, { c: DS.c("white", 0, L), w: DS.w.hair, op: 0.6, parent: lg }); return lg; };
  const Lf = mk(x), Rf = mk(x + w / 2), tr = (f) => [`translate(${-f * w / 2} 0)`, `translate(${f * w / 2} 0)`];
  let cur = o.open || 0; Lf.setAttribute("transform", tr(cur)[0]); Rf.setAttribute("transform", tr(cur)[1]);
  DS.shape(S, `M${x - 30} ${y + h} V${y - 30} H${x + w + 30} V${y + h} H${x + w} V${y} H${x} V${y + h} Z`, "gray", { layer: L, tone: 2, w: "detail", parent: g });
  return { g, to: (f, t, dur = 1) => { tl.fromTo(Lf, { attr: { transform: tr(cur)[0] } }, { attr: { transform: tr(f)[0] }, duration: dur, ease: "power1.inOut", immediateRender: false }, t); tl.fromTo(Rf, { attr: { transform: tr(cur)[1] } }, { attr: { transform: tr(f)[1] }, duration: dur, ease: "power1.inOut", immediateRender: false }, t); cur = f; } };
};
// inside the lift, looking at the doors: steel room, doors centre-left, panel on the front wall at the right
const LIFT = { back: [300, 90, 1620, 830], wall: "gray", floor: "gray", window: false };
const liftRoom = (S, o = {}) => { DS.room(S, LIFT); S.fill(rect(300, 90, 1320, 740), S.start, 0, DS.c("white", 0), 0.25); const D = liftDoors(S, 520, 210, 640, 620, { open: o.open ?? 1 }); const P = liftPanel(S, 1370, 526, 1, { lit: o.lit }); return { D, P }; };

// ---------- the thermostat ----------
// office wall thermostat; (cx, cy) centre. o.temp = "22°"; o.to = [str, t] changes the reading; o.wires: wires out of the bottom ending in nothing
// returns { up, down (pressable B), g, disp: [x, y] }
const thermostat = (S, cx, cy, k = 1, o = {}) => {
  const t = o.t, g = S.grp(o.parent), L = o.layer || "near", W1 = k >= 0.8 ? "mid" : "detail";
  if (o.wires) { const wg = S.grp(g); [[-24, "red"], [24, "gray"]].forEach(([dx, n], i) => { const p = [[cx + dx * k, cy + 140 * k], [cx + (dx + 10) * k, cy + 230 * k], [cx + (dx - 30 + i * 60) * k, cy + 300 * k], [cx + (dx - 10 + i * 40) * k, cy + 360 * k]]; S.draw(smooth(p), S.start, 0, { c: DS.c(n, n === "gray" ? 1 : 0), w: DS.w.near * k * 1.2, parent: wg }); const [ex, ey] = p[3]; S.draw(`M${ex} ${ey} l${-6 * k} ${16 * k} M${ex} ${ey} l${7 * k} ${15 * k}`, S.start, 0, { c: DS.c("orange"), w: DS.w.detail, parent: wg }); }); if (o.ring !== false) S.draw(circ(cx, cy + 370 * k, 90 * k, 46 * k), o.ringT ?? S.start, 0, { c: DS.c("red"), w: DS.w.near, parent: wg }); fadeG(S, wg, o.wiresT ?? t); }
  DS.drop(S, rrect(cx - 120 * k + 6, cy - 150 * k + 10, 240 * k, 300 * k, DS.r.lg * k), { t, parent: g });
  DS.shape(S, rrect(cx - 120 * k, cy - 150 * k, 240 * k, 300 * k, DS.r.lg * k), "paper", { t, layer: L, tone: 0, w: W1, parent: g });
  DS.shape(S, rrect(cx - 86 * k, cy - 114 * k, 172 * k, 104 * k, DS.r.sm * k), "grass", { t, layer: L, tone: 1, flat: true, w: "detail", parent: g });
  const size = k >= 0.9 ? DS.type.title : k >= 0.55 ? DS.type.small : DS.type.caption, dy = cy - 62 * k + size * 0.36;
  const r1 = S.text(o.temp || "22°", cx, dy, { size, c: DS.c("ink"), t: T0(S), parent: g });
  if (o.to) { let prev = r1; (Array.isArray(o.to[0]) ? o.to : [o.to]).forEach(([str, tt]) => { const r2 = S.text(str, cx, dy, { size, c: DS.c("ink"), t: tt, parent: g }); tl.to(prev, { opacity: 0, duration: 0.1 }, tt); prev = r2; }); }
  const mkB = (bx, up) => { const B = { cx: bx, cy: cy + 62 * k, r: 34 * k, cap: S.grp(g) }; DS.shape(S, circ(bx, B.cy, 34 * k), "white", { t, layer: L, tone: 2, w: "detail", parent: B.cap }); const s = up ? -1 : 1; S.draw(`M${bx - 14 * k} ${B.cy - s * 8 * k} L${bx} ${B.cy + s * 10 * k} L${bx + 14 * k} ${B.cy - s * 8 * k} Z`, t ?? S.start, 0, { fill: DS.c("ink"), c: DS.c("ink"), w: DS.w.hair, parent: B.cap }); return B; };
  return { g, up: mkB(cx - 52 * k, true), down: mkB(cx + 52 * k, false), disp: [cx, cy - 62 * k] };
};

// ---------- Dave's scoreboard (the runner) ----------
// chalkboard; (x, y) top-left; rows: walk, door-close, thermostat. o.cells = { r0: [[kind, t], ...], ... } per WORKED cell; o.dave = same for the taped-on column
// kinds: tick | x (red cross over) | lotto | fire | note:<text> | q | big:<text>. o.ext = time the extension column is taped on (true = already there)
const SB = { wd: 1100, h: 640, ext: 400, cx: [170, 470, 750], rows: [270, 400, 530] }; // cx: icon, PRESSED, WORKED tick (notes sit 200 to its right)
const scoreIcon = (S, i, cx, cy, parent) => {
  if (i === 0) { const g = S.grp(parent); DS.shape(S, rrect(cx - 46, cy - 36, 92, 72, DS.r.sm), "yellow", { w: "detail", parent: g }); DS.shape(S, circ(cx, cy, 24), "ink", { w: "hair", parent: g }); DS.shape(S, circ(cx, cy, 17), "gray", { tone: 1, w: "hair", parent: g }); return; }
  if (i === 1) { doorBtn(S, cx, cy, 34, "close", { parent }); return; }
  const g = S.grp(parent); DS.shape(S, rrect(cx - 40, cy - 50, 80, 100, DS.r.md), "paper", { w: "detail", parent: g }); DS.shape(S, rrect(cx - 28, cy - 38, 56, 34, DS.r.xs), "grass", { tone: 1, flat: true, w: "hair", parent: g }); [-16, 16].forEach((dx) => DS.shape(S, circ(cx + dx, cy + 22, 11), "white", { tone: 2, w: "hair", parent: g }));
};
const chalk = (n = "white") => (n === "white" ? DS.P.white[0] : DS.c(n, 1));
const scoreCell = (S, kind, cx, cy, t, parent) => {
  const g = S.grp(parent);
  if (kind === "tick") S.draw(smooth([[cx - 30, cy], [cx - 8, cy + 24], [cx + 34, cy - 32]]), S.start, 0, { c: chalk("green"), w: DS.w.near * 1.3, parent: g });
  else if (kind === "x") { S.draw(line([cx - 46, cy - 40], [cx + 46, cy + 40], 0) + line([cx + 46, cy - 40], [cx - 46, cy + 40], 0), S.start, 0, { c: chalk("red"), w: DS.w.near * 1.3, parent: g }); }
  else if (kind === "lotto") ticket(S, cx + 200, cy, 0.36, "red", { parent: g });
  else if (kind === "fire") wtxt(S, "FIRE DEPT", cx + 200, cy + 14, { parent: g, c: chalk("yellow") });
  else if (kind === "q") wtxt(S, "?", cx, cy + 20, { parent: g, size: DS.type.body });
  else if (kind.startsWith("note:")) { const L2 = kind.slice(5).split("|"), nx = cx + 190, wd = Math.max(...L2.map((s) => s.length)) * DS.type.caption * 0.62 + 40, ht = 30 + L2.length * 46; S.draw(rect(nx - wd / 2, cy - ht / 2, wd, ht), S.start, 0, { fill: DS.c("yellow", 1), c: DS.c("yellow", 2), w: DS.w.detail, parent: g }); L2.forEach((s, i) => txt(S, s, nx, cy - ht / 2 + 54 + i * 46, { parent: g })); }
  else if (kind.startsWith("big:")) wtxt(S, kind.slice(4), cx, cy + 20, { parent: g, size: DS.type.body, c: chalk("yellow") });
  return fadeG(S, g, t, 0.3);
};
const scoreboard = (S, x, y, o = {}) => {
  const g = S.grp(), { wd: w, h, cx, rows } = SB;
  DS.drop(S, rect(x + 10, y + 14, w, h), { parent: g });
  DS.shape(S, rrect(x, y, w, h, DS.r.sm), "wood", { parent: g });
  DS.shape(S, rect(x + 24, y + 24, w - 48, h - 48), "navy", { flat: true, tone: 0, w: "detail", parent: g });
  wtxt(S, "DAVE'S SCOREBOARD", x + w / 2, y + 88, { parent: g, size: DS.type.small, c: chalk("yellow") });
  wtxt(S, "PRESSED", x + cx[1], y + 172, { parent: g }); wtxt(S, "WORKED", x + 858, y + 172, { parent: g });
  [205, 335, 465].forEach((dy) => S.draw(line([x + 50, y + dy], [x + w - 50, y + dy], 0), S.start, 0, { c: DS.P.white[0], w: DS.w.hair, op: 0.45, parent: g }));
  S.draw(line([x + 300, y + 140], [x + 300, y + h - 50], 0) + line([x + 640, y + 140], [x + 640, y + h - 50], 0), S.start, 0, { c: DS.P.white[0], w: DS.w.hair, op: 0.45, parent: g });
  const iconT = o.iconT || [];
  [0, 1, 2].forEach((i) => { const ig = S.grp(g); scoreIcon(S, i, x + cx[0], y + rows[i], ig); fadeG(S, ig, iconT[i]); });
  // PRESSED tallies: walk 11, door-close 4, thermostat 2
  const tally = (n, tx, ty, parent) => { let d = ""; for (let i = 0; i < n; i++) { const grp = Math.floor(i / 5), j = i % 5, gx = tx + grp * 96; d += j < 4 ? `M${gx + j * 16} ${ty - 34} L${gx + j * 16 + 2} ${ty + 34} ` : `M${gx - 8} ${ty + 22} L${gx + 64} ${ty - 22} `; } S.draw(d, S.start, 0, { c: DS.P.white[0], w: DS.w.mid, parent }); };
  const tg = S.grp(g); [11, 4, 2].forEach((n, i) => tally(n, x + 350, y + rows[i], tg)); fadeG(S, tg, o.tallyT);
  const cells = o.cells || {};
  [0, 1, 2].forEach((i) => (cells["r" + i] || []).forEach(([kind, t]) => scoreCell(S, kind, x + cx[2], y + rows[i], t, g)));
  if (o.ext) {
    const eg = S.grp(g), ex = x + w - 12;
    DS.drop(S, rect(ex + 10, y + 14, SB.ext, h), { parent: eg });
    DS.shape(S, rrect(ex, y, SB.ext, h, DS.r.sm), "wood", { tone: 1, parent: eg });
    DS.shape(S, rect(ex + 22, y + 24, SB.ext - 46, h - 48), "navy", { flat: true, tone: 1, w: "detail", parent: eg });
    [[ex - 30, y - 10], [ex - 30, y + h - 40]].forEach(([tx, ty]) => S.draw(rect(tx, ty, 90, 46), S.start, 0, { fill: DS.c("yellow", 1), c: DS.c("yellow", 2), w: DS.w.hair, op: 0.92, parent: eg }));
    wtxt(S, "WORKED", ex + SB.ext / 2, y + 150, { parent: eg, c: chalk("green") }); wtxt(S, "ON DAVE", ex + SB.ext / 2, y + 194, { parent: eg, c: chalk("green") });
    [335, 465].forEach((dy) => S.draw(line([ex + 40, y + dy], [ex + SB.ext - 50, y + dy], 0), S.start, 0, { c: DS.P.white[0], w: DS.w.hair, op: 0.45, parent: eg }));
    if (o.ext !== true) tl.fromTo(eg, { opacity: 0, attr: { transform: "translate(60 -20)" } }, { opacity: 1, attr: { transform: "translate(0 0)" }, duration: 0.45, ease: "power2.out" }, o.ext);
    [0, 1, 2].forEach((i) => ((o.dave || {})["r" + i] || []).forEach(([kind, t]) => scoreCell(S, kind, ex + SB.ext / 2, y + rows[i], t, eg)));
  }
  return { g, x, y };
};

// ---------- props ----------
// generic newspaper page (our own lettering; no logo)
const newspaper = (S, x, y, w, h, masthead, date, o = {}) => {
  const t = o.t, g = S.grp(o.parent);
  DS.drop(S, rect(x + 10, y + 14, w, h), { t, parent: g }); DS.shape(S, rect(x, y, w, h), "paper", { t, w: "detail", flat: true, parent: g });
  txt(S, masthead, x + w / 2, y + 86, { size: DS.type.small, t, parent: g });
  [y + 112, y + 168].forEach((yy) => S.draw(line([x + 40, yy], [x + w - 40, yy], 0), t ?? S.start, 0, { c: DS.c("ink"), w: DS.w.hair, parent: g }));
  txt(S, date, x + w / 2, y + 152, { t, parent: g });
  (o.head || []).forEach((s, i) => txt(S, s, x + 50, y + 236 + i * 58, { size: DS.type.small, anchor: "start", t, parent: g }));
  const ly = y + 236 + (o.head || []).length * 58 + 10;
  [0, 1].forEach((c) => lines(S, x + 50 + c * ((w - 80) / 2), ly, (w - 140) / 2, Math.max(1, Math.floor((y + h - ly - 30) / 40)), t, 40, g));
  return g;
};
const stopwatch = (S, cx, cy, r, o = {}) => {
  const t = o.t, g = S.grp(o.parent);
  DS.shape(S, rrect(cx - 18, cy - r - 46, 36, 34, DS.r.xs), "gray", { t, tone: 2, w: "detail", parent: g });
  DS.shape(S, circ(cx, cy, r), "white", { t, parent: g });
  S.draw(rays(cx, cy, r * 0.8, r * 0.92, 12, -Math.PI / 2), t ?? S.start, 0, { c: DS.c("ink"), w: DS.w.detail, parent: g });
  const hand = S.grp(g); S.draw(line([cx, cy], [cx, cy - r * 0.75], 0), t ?? S.start, 0, { c: DS.c("red"), w: DS.w.near, parent: hand });
  if (o.go !== undefined) spin(hand, o.go, o.dur || 3, 0, o.deg || 330, cx, cy, "none");
  DS.shape(S, circ(cx, cy, 10), "ink", { t, w: "hair", parent: g });
  return g;
};
const globe = (S, cx, cy, r, o = {}) => {
  DS.shape(S, circ(cx, cy, r), "sky", { parent: o.parent });
  [[-0.35, -0.3, 0.32, 0.22], [0.25, -0.1, 0.28, 0.4], [-0.2, 0.42, 0.24, 0.16]].forEach(([a, b, rx, ry]) => DS.shape(S, circ(cx + a * r, cy + b * r, rx * r, ry * r), "grass", { w: "detail", parent: o.parent }));
  S.draw(circ(cx, cy, r * 0.45, r) + line([cx - r, cy], [cx + r, cy], 0), S.start, 0, { c: DS.c("blue", 1), w: DS.w.hair, parent: o.parent });
};
// a small generic push button (icons on the globe, rows of everyday buttons)
const btnIcon = (S, cx, cy, r, name = "red", o = {}) => { const g = S.grp(o.parent); DS.shape(S, rrect(cx - r * 1.3, cy - r * 1.3, r * 2.6, r * 2.6, DS.r.sm), "white", { tone: 2, w: "detail", parent: g }); const B = { cx, cy, r, g, cap: S.grp(g) }; DS.shape(S, circ(cx, cy, r), name, { w: "detail", parent: B.cap }); S.fill(circ(cx - r * 0.3, cy - r * 0.35, r * 0.3, r * 0.2), S.start, 0, DS.P.white[0], 0.6, B.cap); fadeG(S, g, o.t, 0.25); return B; };
// lottery ticket with a football player on it (helmet in the team colour)
const ticket = (S, cx, cy, k = 1, team = "red", o = {}) => {
  const t = o.t, g = S.grp(o.parent), wd = 220 * k, ht = 320 * k, x0 = cx - wd / 2, y0 = cy - ht / 2;
  DS.drop(S, rrect(x0 + 5, y0 + 8, wd, ht, DS.r.sm * k), { t, parent: g });
  DS.shape(S, rrect(x0, y0, wd, ht, DS.r.sm * k), "white", { t, w: k >= 0.8 ? "mid" : "detail", parent: g });
  DS.shape(S, rect(x0 + 14 * k, y0 + 14 * k, wd - 28 * k, 40 * k), team, { t, flat: true, w: "hair", parent: g });
  DS.shape(S, rect(x0 + 24 * k, y0 + 70 * k, wd - 48 * k, 170 * k), "grass", { t, tone: 1, flat: true, w: "hair", parent: g });
  const px = cx, py = y0 + 236 * k;
  S.draw(`M${px} ${py - 80 * k} L${px} ${py - 36 * k} M${px - 20 * k} ${py} L${px} ${py - 36 * k} L${px + 24 * k} ${py - 4 * k} M${px - 30 * k} ${py - 76 * k} L${px} ${py - 66 * k} L${px + 34 * k} ${py - 92 * k}`, t ?? S.start, 0, { c: DS.c("ink"), w: DS.w.mid * Math.max(k, 0.6), parent: g });
  DS.shape(S, rrect(px - 26 * k, py - 84 * k, 52 * k, 52 * k, DS.r.sm * k), team, { t, w: "detail", parent: g });
  DS.shape(S, circ(px, py - 112 * k, 26 * k), team, { t, w: "detail", parent: g });
  S.draw(`M${px + 8 * k} ${py - 106 * k} H${px + 30 * k} M${px + 8 * k} ${py - 96 * k} H${px + 28 * k} M${px + 26 * k} ${py - 108 * k} V${py - 92 * k}`, t ?? S.start, 0, { c: DS.c("gray", 2), w: DS.w.detail, parent: g });
  DS.shape(S, `M${px + 30 * k} ${py - 98 * k} q${14 * k} ${-8 * k} ${24 * k} 0 q${-10 * k} ${8 * k} ${-24 * k} 0 Z`, "brown", { t, w: "hair", parent: g });
  if (k >= 0.9) txt(S, "$1", cx, y0 + 296 * k, { t, parent: g, size: DS.type.caption });
  else S.fill(rect(cx - 30 * k, y0 + 268 * k, 60 * k, 26 * k), t ?? S.start, 0, DS.c("ink", 1), 1, g);
  return fadeG(S, g, o.fadeT);
};
// money tag hanging on a string
const priceTag = (S, x, y, str, o = {}) => { const g = S.grp(o.parent), wd = str.length * DS.type.small * 0.62 + 90; S.draw(line([x - 60, y - 80], [x, y], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.detail, parent: g }); DS.shape(S, `M${x} ${y} L${x + 40} ${y - 40} H${x + wd} V${y + 40} H${x + 40} Z`, "gold", { w: "mid", parent: g }); DS.shape(S, circ(x + 30, y, 10), "white", { w: "hair", parent: g }); S.text(str, x + 40 + (wd - 40) / 2, y + 19, { size: DS.type.small, c: DS.c("ink"), t: T0(S), parent: g }); return fadeG(S, g, o.t); };
// icon grid: n cells, cols wide; each cell a small button; dead(i) -> greyed at deadT + stagger
const iconGrid = (S, x0, y0, cols, n, cell, o = {}) => {
  const P = [];
  for (let i = 0; i < n; i++) { const cx = x0 + (i % cols) * cell, cy = y0 + Math.floor(i / cols) * cell; P.push([cx, cy]); const g = S.grp(); DS.shape(S, circ(cx, cy, cell * 0.36), o.live || "yellow", { w: "hair", parent: g }); fadeG(S, g, o.t !== undefined ? o.t + i * (o.dt ?? 0.004) : undefined, 0.2);
    if (o.dead && o.dead(i)) { const d = S.grp(); DS.shape(S, circ(cx, cy, cell * 0.36), "gray", { tone: 1, w: "hair", parent: d }); fadeG(S, d, o.deadT !== undefined ? o.deadT + (o.order ? o.order(i) : i) * (o.ddt ?? 0.012) : undefined, 0.15); } }
  return P;
};
// office wall bits
const OFFICE = { wall: "wall", floor: "gray", window: [1250, 170, 280, 260] };
const deskF = (S, x0, x1, top, gy = 960, name = "wood") => { DS.shadow(S, (x0 + x1) / 2, gy, x1 - x0 + 60); DS.shape(S, rect(x0 + 24, top + 20, x1 - x0 - 48, gy - top - 20), name, { tone: 2 }); DS.shape(S, rrect(x0, top, x1 - x0, 28, DS.r.xs), name); };
const laptop = (S, cx, top, wd, ht, o = {}) => {
  const t = o.t, g = S.grp(o.parent); DS.drop(S, rrect(cx - wd / 2 + 8, top - ht + 10, wd, ht, DS.r.sm), { t, parent: g });
  DS.shape(S, rrect(cx - wd / 2, top - ht, wd, ht, DS.r.sm), "gray", { t, tone: 2, w: "mid", parent: g });
  DS.shape(S, rect(cx - wd / 2 + 18, top - ht + 18, wd - 36, ht - 44), o.screen || "white", { t, flat: true, w: "hair", parent: g });
  DS.shape(S, `M${cx - wd / 2 - 30} ${top} L${cx + wd / 2 + 30} ${top} L${cx + wd / 2 + 10} ${top - 18} L${cx - wd / 2 - 10} ${top - 18} Z`, "gray", { t, w: "detail", parent: g });
  return { g, x0: cx - wd / 2 + 18, y0: top - ht + 18, x1: cx + wd / 2 - 18, y1: top - 26 };
};
const envelope = (S, cx, cy, wd, ht, o = {}) => { const g = S.grp(o.parent), x0 = cx - wd / 2, y0 = cy - ht / 2; DS.drop(S, rect(x0 + 6, y0 + 10, wd, ht), { parent: g }); DS.shape(S, rect(x0, y0, wd, ht), "paper", { w: "mid", parent: g }); S.draw(`M${x0} ${y0} L${cx} ${cy + ht * 0.08} L${x0 + wd} ${y0}`, S.start, 0, { c: DS.c("ink"), w: DS.w.detail, parent: g }); return fadeG(S, g, o.t); };
// 1970s lab bits
const LAB = { wall: "sand", floor: "wood", window: false };
const reel = (S, cx, cy, k = 1, o = {}) => {
  const g = S.grp(o.parent); DS.shadow(S, cx, cy + 150 * k, 460 * k, { parent: g });
  DS.shape(S, rrect(cx - 230 * k, cy - 150 * k, 460 * k, 300 * k, DS.r.md * k), "brown", { parent: g });
  DS.shape(S, rect(cx - 200 * k, cy + 70 * k, 400 * k, 50 * k), "gray", { tone: 2, flat: true, w: "detail", parent: g });
  const R = [];
  [-110, 110].forEach((dx) => { const rg = S.grp(g), x = cx + dx * k, y = cy - 30 * k; DS.shape(S, circ(x, y, 84 * k), "gray", { tone: 1, parent: rg }); DS.shape(S, circ(x, y, 30 * k), "ink", { w: "detail", parent: rg }); [0, 120, 240].forEach((a) => DS.shape(S, circ(x + Math.cos((a * Math.PI) / 180) * 56 * k, y + Math.sin((a * Math.PI) / 180) * 56 * k, 16 * k), "white", { tone: 2, w: "hair", parent: rg })); R.push([rg, x, y]); });
  S.draw(line([cx - 110 * k, cy + 54 * k], [cx + 110 * k, cy + 54 * k], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.mid, parent: g });
  [-150, -90, -30].forEach((dx) => DS.shape(S, rrect(cx + dx * k - 20 * k, cy + 80 * k, 40 * k, 30 * k, DS.r.xs), "white", { tone: 2, w: "hair", parent: g }));
  DS.shape(S, circ(cx + 150 * k, cy + 95 * k, 14 * k), "red", { w: "hair", parent: g });
  if (o.spin !== undefined) R.forEach(([rg, x, y]) => spin(rg, o.spin, o.dur || 4, 0, 720, x, y, "none"));
  return fadeG(S, g, o.t);
};
const typewriter = (S, cx, base, k = 1, o = {}) => { const g = S.grp(o.parent); DS.shape(S, `M${cx - 150 * k} ${base} L${cx - 120 * k} ${base - 120 * k} H${cx + 120 * k} L${cx + 150 * k} ${base} Z`, "green", { tone: 2, parent: g }); DS.shape(S, rrect(cx - 170 * k, base - 160 * k, 340 * k, 44 * k, DS.r.sm * k), "ink", { tone: 1, w: "detail", parent: g }); DS.shape(S, rect(cx - 90 * k, base - 230 * k, 180 * k, 76 * k), "white", { w: "detail", flat: true, parent: g }); for (let r = 0; r < 3; r++) for (let c = 0; c < 7; c++) DS.shape(S, circ(cx - 96 * k + c * 32 * k + r * 8 * k, base - 90 * k + r * 28 * k, 11 * k), "white", { tone: 2, w: "hair", parent: g }); return fadeG(S, g, o.t); };
const calculator = (S, cx, base, k = 1, o = {}) => { const g = S.grp(o.parent); DS.shape(S, rrect(cx - 110 * k, base - 230 * k, 220 * k, 230 * k, DS.r.md * k), "gray", { tone: 1, parent: g }); DS.shape(S, rect(cx - 80 * k, base - 200 * k, 160 * k, 50 * k), "ink", { flat: true, w: "detail", parent: g }); S.fill(rect(cx - 40 * k, base - 186 * k, 100 * k, 22 * k), S.start, 0, DS.c("red", 1), 0.9, g); for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) DS.shape(S, rrect(cx - 82 * k + c * 42 * k, base - 132 * k + r * 40 * k, 34 * k, 30 * k, DS.r.xs), c === 3 ? "orange" : "white", { tone: c === 3 ? 0 : 2, w: "hair", parent: g }); DS.shape(S, rrect(cx + 100 * k, base - 170 * k, 24 * k, 80 * k, DS.r.xs), "ink", { w: "hair", parent: g }); return fadeG(S, g, o.t); };
const mimeo = (S, cx, base, k = 1, o = {}) => { const g = S.grp(o.parent), dg = S.grp(g); DS.shape(S, rrect(cx - 170 * k, base - 140 * k, 340 * k, 140 * k, DS.r.sm * k), "navy", { tone: 1, parent: g }); DS.shape(S, circ(cx, base - 180 * k, 90 * k), "gray", { tone: 0, parent: dg }); S.draw(line([cx - 60 * k, base - 230 * k], [cx + 60 * k, base - 130 * k], 0), S.start, 0, { c: DS.c("gray", 2), w: DS.w.detail, parent: dg }); DS.shape(S, circ(cx + 160 * k, base - 200 * k, 24 * k), "red", { w: "detail", parent: g }); S.draw(line([cx + 90 * k, base - 180 * k], [cx + 150 * k, base - 196 * k], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.mid, parent: g }); DS.shape(S, rect(cx - 220 * k, base - 70 * k, 70 * k, 50 * k), "white", { w: "hair", flat: true, parent: g }); if (o.spin !== undefined) spin(dg, o.spin, o.dur || 3, 0, 1080, cx, base - 180 * k, "none"); return fadeG(S, g, o.t); };
const noiseLines = (S, cx, cy, r, t, n = 3, parent) => { for (let i = 0; i < n; i++) flash(S, arc(cx, cy, r + i * 26, -40, 40) + arc(cx, cy, r + i * 26, 140, 220), t + i * 0.08, DS.c("red"), parent, DS.w.mid); };
const speaker = (S, cx, cy, k = 1, o = {}) => { const g = S.grp(o.parent); DS.shadow(S, cx, cy + 190 * k, 260 * k, { parent: g }); DS.shape(S, rrect(cx - 120 * k, cy - 190 * k, 240 * k, 380 * k, DS.r.sm * k), "wood", { tone: 2, parent: g }); DS.shape(S, circ(cx, cy + 50 * k, 84 * k), "ink", { tone: 1, w: "detail", parent: g }); DS.shape(S, circ(cx, cy + 50 * k, 30 * k), "gray", { tone: 2, w: "hair", parent: g }); DS.shape(S, circ(cx, cy - 110 * k, 40 * k), "ink", { tone: 1, w: "detail", parent: g }); return fadeG(S, g, o.t); };
// side-view lab chair with the noise button on the arm (button faces up). Returns B for the button
const labChair = (S, x, gy, o = {}) => {
  const g = S.grp(o.parent); DS.shadow(S, x, gy, 300, { parent: g });
  DS.shape(S, rrect(x - 140, gy - 420, 40, 300, DS.r.sm), "earth", { tone: 2, parent: g });
  DS.shape(S, rrect(x - 140, gy - 150, 280, 40, DS.r.sm), "earth", { tone: 2, parent: g });
  [x - 120, x + 110].forEach((lx) => DS.shape(S, rect(lx - 8, gy - 110, 16, 110), "gray", { tone: 2, w: "mid", parent: g }));
  DS.shape(S, rrect(x - 100, gy - 250, 220, 26, DS.r.xs), "wood", { parent: g });
  DS.shape(S, rect(x + 96, gy - 250, 16, 100), "gray", { tone: 2, w: "mid", parent: g });
  if (o.btn !== false) {
    DS.shape(S, rrect(x + 40, gy - 300, 110, 54, DS.r.sm), "gray", { tone: 1, w: "mid", parent: g });
    const B = { cx: x + 95, cy: gy - 312, r: 34, g, cap: S.grp(g) };
    DS.shape(S, `M${x + 61} ${gy - 300} V${gy - 318} Q${x + 95} ${gy - 352} ${x + 129} ${gy - 318} V${gy - 300} Z`, "red", { w: "mid", parent: B.cap });
    S.fill(circ(x + 82, gy - 326, 12, 6), S.start, 0, DS.P.white[0], 0.6, B.cap);
    return B;
  }
  return { g };
};
