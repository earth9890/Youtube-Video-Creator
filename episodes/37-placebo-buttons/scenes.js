// look: still
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

// ---------- the traffic map (New York, 1964 to the late 1980s) ----------
const SX = [450, 960, 1520], SWD = [90, 110, 90], AV = [470, 610]; // side streets (x centre, width); avenue band y
const carTop = (S, cx, cy, dir = "h", name = "red", o = {}) => {
  const g = S.grp(o.parent), [w, h] = dir === "h" ? [104, 54] : [54, 104];
  DS.shape(S, rrect(cx - w / 2, cy - h / 2, w, h, DS.r.sm), name, { w: "detail", parent: g });
  if (dir === "h") DS.shape(S, rect(cx + (o.back ? -38 : 14), cy - 20, 24, 40), "glass", { w: "hair", parent: g }); else DS.shape(S, rect(cx - 20, cy + (o.back ? -38 : 14), 40, 24), "glass", { w: "hair", parent: g });
  return fadeG(S, g, o.t, 0.25);
};
// two-lamp signal seen from above: state "g" | "r"; .set(t, state)
const sigIcon = (S, x, y, state = "g", o = {}) => {
  const g = S.grp(o.parent);
  DS.shape(S, rrect(x - 20, y - 40, 40, 80, DS.r.sm), "ink", { tone: 1, w: "detail", parent: g });
  const R = S.grp(g), G = S.grp(g);
  DS.shape(S, circ(x, y - 18, 13), "red", { w: "hair", parent: R }); DS.shape(S, circ(x, y + 18, 13), "green", { w: "hair", parent: G });
  const dim = 0.18; (state === "g" ? R : G).setAttribute("opacity", dim);
  let cur = state;
  return { g, set: (t, st) => { if (st === cur) return; const [on, off] = st === "g" ? [G, R] : [R, G]; tl.fromTo(on, { opacity: dim }, { opacity: 1, duration: 0.12, immediateRender: false }, t); tl.fromTo(off, { opacity: 1 }, { opacity: dim, duration: 0.12, immediateRender: false }, t); cur = st; } };
};
const btnTop = (S, x, y, o = {}) => { const g = S.grp(o.parent); DS.shape(S, rrect(x - 20, y - 20, 40, 40, DS.r.xs), "yellow", { w: "detail", parent: g }); const B = { cx: x, cy: y, r: 12, g, cap: S.grp(g) }; DS.shape(S, circ(x, y, 11), "ink", { w: "hair", parent: B.cap }); return B; };
const computer = (S, cx, cy, o = {}) => { const g = S.grp(o.parent); DS.drop(S, rrect(cx - 96, cy - 80, 200, 150, DS.r.sm), { parent: g }); DS.shape(S, rrect(cx - 100, cy - 90, 200, 150, DS.r.sm), "sand", { tone: 1, parent: g }); DS.shape(S, rrect(cx - 76, cy - 70, 152, 100, DS.r.xs), "navy", { flat: true, w: "detail", parent: g }); [-40, -14, 12].forEach((dy) => S.draw(line([cx - 56, cy + dy], [cx + 30 - dy, cy + dy], 0), S.start, 0, { c: DS.c("green", 1), w: DS.w.detail, parent: g })); DS.shape(S, rrect(cx - 120, cy + 70, 240, 34, DS.r.xs), "sand", { tone: 2, w: "detail", parent: g }); return fadeG(S, g, o.t); };
// the planner's board: avenue across, three side streets, blocks; returns { A: avenue signals, Bsig: main side-street signal, btn: buttons }
const MAPROOM = { back: [120, 50, 1800, 950], wall: "glass", floor: "gray", window: false };
const mapBoard = (S, o = {}) => { // after DS.room(S, MAPROOM)
  DS.drop(S, rrect(176, 110, 1580, 800, DS.r.md));
  DS.shape(S, rrect(170, 100, 1580, 800, DS.r.md), "white", { flat: true, w: "mid" });
  DS.shape(S, rect(200, 130, 1520, 740), "sand", { tone: 1, flat: true, w: "hair" });
  DS.shape(S, rect(200, AV[0], 1520, AV[1] - AV[0]), "gray", { tone: 2, flat: true, w: "hair" });
  for (let x = 220; x < 1700; x += 120) S.fill(rect(x, 536, 60, 8), S.start, 0, DS.c("yellow"), 0.9);
  SX.forEach((x, i) => DS.shape(S, rect(x - SWD[i] / 2, 130, SWD[i], 740), "gray", { tone: i === 1 ? 0 : 1, flat: true, w: "hair" }));
  DS.shape(S, rect(SX[1] - SWD[1] / 2, AV[0], SWD[1], AV[1] - AV[0]), "gray", { tone: 2, flat: true, w: "hair" });
  for (let i = 0; i < 6; i++) S.fill(rect(1024, AV[0] + 8 + i * 22, 48, 12), S.start, 0, DS.P.white[0], 0.95);
  const A = SX.map((x, i) => sigIcon(S, x - SWD[i] / 2 - 34, AV[1] + 52, o.av || "g"));
  const Bsig = sigIcon(S, SX[1] + SWD[1] / 2 + 34, AV[0] - 52, o.av === "r" ? "g" : "r");
  const btn = SX.map((x, i) => btnTop(S, x + SWD[i] / 2 + (i === 1 ? 140 : 34), AV[1] + 44));
  return { A, Bsig, btn };
};
// grey-out a map button: dims it and cuts its stub of wire (red ring)
const killBtn = (S, B, t) => { const g = S.grp(); DS.shape(S, rrect(B.cx - 20, B.cy - 20, 40, 40, DS.r.xs), "gray", { tone: 1, w: "detail", parent: g }); S.draw(line([B.cx, B.cy + 20], [B.cx, B.cy + 56], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.mid, parent: g }); S.draw(line([B.cx - 14, B.cy + 44], [B.cx + 14, B.cy + 32], 0), S.start, 0, { c: DS.c("red"), w: DS.w.near, parent: g }); fadeG(S, g, t, 0.25); };
const pedTop = (S, x, gy, k, o = {}) => mini(S, x, gy, k, Object.assign({ fill: DS.c("orange", 1) }, o));
const trafficLight = (S, x, y, k = 1, o = {}) => {
  const g = S.grp(o.parent), L = [["red", -70], ["yellow", 0], ["green", 70]], lamps = {};
  DS.shape(S, rrect(x - 50 * k, y - 110 * k, 100 * k, 220 * k, DS.r.sm * k), "ink", { tone: 1, w: "detail", parent: g });
  L.forEach(([n, dy]) => { lamps[n] = S.grp(g); DS.shape(S, circ(x, y + dy * k, 28 * k), n, { w: "hair", parent: lamps[n] }); });
  const dim = 0.15, on0 = o.start || "green"; Object.keys(lamps).forEach((n) => n !== on0 && lamps[n].setAttribute("opacity", dim));
  let cur = on0;
  return { g, set: (t, n) => { tl.fromTo(lamps[cur], { opacity: 1 }, { opacity: dim, duration: 0.1, immediateRender: false }, t); tl.fromTo(lamps[n], { opacity: dim }, { opacity: 1, duration: 0.1, immediateRender: false }, t); cur = n; } };
};
const skyline = (S, cx, cy, k = 1, parent) => { [[-110, 60, 150, "gray"], [-40, 70, 230, "navy"], [40, 60, 180, "earth"], [100, 50, 120, "gray"]].forEach(([dx, w, h, n]) => { DS.shape(S, rect(cx + dx * k - (w * k) / 2, cy + 90 * k - h * k, w * k, h * k), n, { tone: 1, w: "detail", parent }); for (let r = 0; r < Math.floor(h / 40) - 1; r++) S.fill(rect(cx + dx * k - 12 * k, cy + 90 * k - h * k + 20 * k + r * 40 * k, 24 * k, 18 * k), S.start, 0, DS.c("yellow", 1), 0.9, parent); }); };
const crossroads = (S, cx, cy, k = 1, parent) => { DS.shape(S, rect(cx - 140 * k, cy - 40 * k, 280 * k, 80 * k), "gray", { tone: 2, flat: true, w: "detail", parent }); DS.shape(S, rect(cx - 40 * k, cy - 140 * k, 80 * k, 280 * k), "gray", { tone: 2, flat: true, w: "detail", parent }); for (let i = 0; i < 4; i++) S.fill(rect(cx + 50 * k, cy - 34 * k + i * 18 * k, 34 * k, 10 * k), S.start, 0, DS.P.white[0], 1, parent); };
const clockFace = (S, cx, cy, r, o = {}) => {
  const g = S.grp(o.parent);
  DS.shape(S, circ(cx, cy, r), "white", { parent: g });
  if (o.wedge) { const [h0, h1] = o.wedge, p = arcPts(cx, cy, r * 0.92, h0 * 30 - 90, h1 * 30 - 90, 24); const wg = S.grp(g); S.fill(`M${cx} ${cy} ` + p.map(([x, y]) => `L${f1(x)} ${f1(y)}`).join(" ") + " Z", S.start, 0, DS.c("yellow", 1), 1, wg); fadeG(S, wg, o.wedgeT); }
  S.draw(rays(cx, cy, r * 0.8, r * 0.92, 12, -Math.PI / 2), S.start, 0, { c: DS.c("ink"), w: DS.w.mid, parent: g });
  const hh = S.grp(g), mh = S.grp(g);
  S.draw(line([cx, cy], [cx, cy - r * 0.5], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.near * 1.4, parent: hh });
  S.draw(line([cx, cy], [cx, cy - r * 0.75], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.near, parent: mh });
  if (o.sweep) { spin(hh, o.sweep[0], o.sweep[1], 0, (o.sweep[2] || 7) * 30, cx, cy); spin(mh, o.sweep[0], o.sweep[1], 0, (o.sweep[2] || 7) * 360, cx, cy); }
  DS.shape(S, circ(cx, cy, r * 0.06), "ink", { w: "hair", parent: g });
  return g;
};
const wrench = (S, x, y, k = 1, ang = -30, o = {}) => { const g = S.grp(o.parent); g.setAttribute("transform", `rotate(${ang} ${x} ${y})`); DS.shape(S, rrect(x - 10 * k, y - 10 * k, 120 * k, 20 * k, DS.r.xs), "gray", { tone: 1, w: "detail", parent: g }); DS.shape(S, `M${x + 110 * k} ${y - 26 * k} a${28 * k} ${28 * k} 0 1 1 0 ${52 * k} v${-16 * k} h${18 * k} v${-20 * k} h${-18 * k} Z`, "gray", { tone: 1, w: "detail", parent: g }); return g; };

// ---------- timing: one picture per beat, landing just after its first word (the 0.6 s crossfade covers the breath) ----------
const CUES = [[1, 0], [2, 0], [5, 0], [7, 0], [8, 0], [9, 0], [11, 0], [13, 0], [15, 0], [17, 0], [18, 0], [20, 0], [22, 0], [24, 0], [25, 0], [26, 0], [27, 0], [29, 0], [31, 0],
  [34, 0], [35, 0], [36, 0], [37, 0], [39, 0], [41, 0], [43, 0], [44, 0], [45, 0], [46, 0], [47, 0], [49, 0], [50, 0], [51, 0], [52, 0],
  [53, 0], [54, 0], [55, 0], [56, 0], [57, 0], [58, 0], [60, 0], [61, 0], [62, 0], [64, 0], [65, 0], [67, 0], [69, 0], [71, 0], [72, 0],
  [74, 0], [75, 0], [76, 0], [77, 0], [78, 0], [80, 0], [81, 0], [83, 0], [85, 0],
  [87, 0], [88, 0], [90, 0], [91, 0], [93, 0], [94, 0], [96, 0], [98, 0], [99, 0], [100, 0], [101, 0], [103, 0], [104, 0],
  [106, 0], [107, 0], [109, 0], [110, 0], [112, 0], [113, 0], [114, 0], [116, 0], [118, 0], [119, 0], [121, 0], [123, 0], [125, 0],
  [127, 0], [129, 0], [131, 0], [133, 0], [134, 0], [135, 0], [136, 0], [137, 0], [140, 0], [141, 0], [143, 0], [145, 0]];
const WINS = sceneWindows(CUES, -0.25);
const sc = (c, w, o) => { const k = CUES.findIndex(([a, b]) => a === c && b === w); if (k < 0) throw new Error("no cue " + c + ":" + w); return scene(WINS[k][0], WINS[k][1], o); };
const ROOM = { wall: "wall", floor: "wood", window: false }, LAB2 = { wall: "glass", floor: "wood", window: false };

// ===================== 1. Dave presses everything =====================
// This is Dave, and Dave presses every button he meets, usually more than once.
{ const S = sc(1, 0, { cam: "push", focus: "1060 640" }); DS.outdoor(S, DAY); street(S, DAY, { zebra: 1400 });
  pole(S, 1180, 250, 940); pedSig(S, 1180, 330, 0.9);
  const B = walkBox(S, 1180, 700, 0.42);
  const F = dave(S, 1000, 960, "near", { look: 6, mood: "determined", armR: ARM.near });
  jabArm(S, F, W(1, 5), 2, 0.42); jab(S, B, W(1, 5) + 0.12, 2, 0.42);
  jabArm(S, F, W(1, 10), 4, 0.34); jab(S, B, W(1, 10) + 0.12, 4, 0.34);
  card(S, "DAVE", 960, 470, { t: W(1, 2) });
  DS.vignette(S); }

// This morning, the walk button got eleven presses. / The lift's door-close got jabbed. / The thermostat went down two degrees.
{ const S = sc(2, 0, { cam: "push", focus: "960 520" }); DS.room(S, ROOM);
  const X = [350, 960, 1570], tt = [S.start, W(3, 0), W(4, 0)];
  X.forEach((x, i) => { const g = panel(S, x, 500, 540, 760, tt[i]); fadeG(S, g, tt[i]); });
  const clip = (i) => clipTo(S.grp(), rrect(X[i] - 266, 126, 532, 748, DS.r.md));
  { const g = clip(0), B = walkBox(S, X[0] + 40, 600, 0.75, { parent: g }), Fg = finger(S, X[0] + 40 - 50, 600, 0, 0.62, { parent: g });
    pressBy(S, Fg, B, W(2, 1), 11, (WE(2, 7) - W(2, 1) - 0.1) / 11);
    countUp(S, X[0], 840, 0, 11, W(2, 1), WE(2, 7) - W(2, 1), { size: DS.type.title, fmt: (n) => "× " + Math.round(n), ease: "none" }); }
  { const g = clip(1), P = liftPanel(S, X[1] - 40, 500, 0.9, { parent: g }); fadeG(S, g, tt[1]);
    const Fg = finger(S, P.close.cx + 40, P.close.cy, 180, 0.62, { parent: g }); pressBy(S, Fg, P.close, W(3, 4), 4, 0.24);
    txt(S, "DOOR-CLOSE", X[1], 840, { size: DS.type.small, t: tt[1] }); }
  { const g = clip(2), T = thermostat(S, X[2], 430, 1.1, { parent: g, temp: "22°", to: [["21°", W(4, 2) + 0.1], ["20°", W(4, 4) + 0.1]] }); fadeG(S, g, tt[2]);
    const Fg = finger(S, T.down.cx + 36, T.down.cy, 180, 0.62, { parent: g }); pressBy(S, Fg, T.down, W(4, 2), 1); pressBy(S, Fg, T.down, W(4, 4), 1);
    txt(S, "2 DEGREES DOWN", X[2], 840, { size: DS.type.small, t: W(4, 2) }); }
  txt(S, "WALK BUTTON", X[0], 190, { size: DS.type.small }); txt(S, "LIFT", X[1], 190, { size: DS.type.small, t: tt[1] }); txt(S, "THERMOSTAT", X[2], 190, { size: DS.type.small, t: tt[2] });
  DS.vignette(S); }

// Three buttons. Three wins. / Dave keeps score, and he's undefeated.
{ const S = sc(5, 0, { cam: "push", focus: "800 470" }); DS.room(S, ROOM);
  const t0 = W(5, 0), t1 = W(5, 2);
  scoreboard(S, 160, 150, { iconT: [t0, t0 + 0.2, t0 + 0.4], cells: { r0: [["tick", t1]], r1: [["tick", t1 + 0.25]], r2: [["tick", t1 + 0.5]] } });
  const F = dave(S, 1500, 960, "near", { pose: "pointL", look: -6, mood: "smile" });
  F.face(W(6, 5), "happy", -4);
  stamp(S, 1500, 360, "UNDEFEATED", W(6, 5), "green");
  DS.vignette(S); }

// But in two thousand four, New York admitted that more than two thousand five hundred of its walk buttons did nothing.
{ const S = sc(7, 0, { cam: "push", focus: "800 500" }); DS.room(S, LAB2);
  newspaper(S, 200, 90, 860, 840, "THE NEW YORK TIMES", "FEBRUARY 27, 2004", { head: ["FOR EXERCISE IN NEW YORK", "FUTILITY, PUSH BUTTON"] });
  countUp(S, 1460, 400, 0, 2500, W(7, 9), WE(7, 14) - W(7, 9), { size: DS.type.display, fmt: (n) => Math.round(n).toLocaleString("en-US") + (n >= 2499.5 ? "+" : "") });
  txt(S, "WALK BUTTONS", 1460, 480, { size: DS.type.small, t: W(7, 17) });
  const B = walkBox(S, 1460, 700, 0.5, { sign: false, dead: true, t: W(7, 17) }); xMark(S, 1460, 700, 1.6, W(7, 19));
  stamp(S, 1460, 880, "DID NOTHING", W(7, 19));
  DS.vignette(S); }

// Not broken. Disconnected, under a sign that still said push button.
{ const S = sc(8, 0, { cam: "zoom", focus: "960 520" }); DS.outdoor(S, DAY); street(S, DAY);
  pole(S, 960, 40, 940); const k = 1.05;
  const B = walkBox(S, 960, 600, k, { words: true, cable: "cut", cableLen: 250, cableT: W(8, 2), ringT: W(8, 2) + 0.3 });
  card(S, "NOT BROKEN", 380, 330, { t: W(8, 0) });
  card(S, "DISCONNECTED", 1560, 330, { t: W(8, 2), tc: "red" });
  S.draw(circ(960, B.rows[0] + 4, 230 * k, 46 * k), W(8, 9), 0, { c: DS.c("red"), w: DS.w.near });
  DS.vignette(S); }

// So why is the world full of buttons that do nothing? / And why can't Dave stop pressing them?
{ const S = sc(9, 0, { cam: "push", focus: "700 500" }); DS.outdoor(S, DAY); street(S, DAY, { zebra: 1650 });
  panel(S, 560, 480, 780, 720);
  txt(S, "WHY?", 560, 205, { size: DS.type.title, c: DS.c("red", 2), t: W(9, 1) });
  globe(S, 560, 530, 250);
  [[-150, -110, "red"], [40, -170, "yellow"], [160, -60, "green"], [-60, 0, "orange"], [90, 60, "red"], [-170, 90, "purple"], [10, 160, "yellow"], [190, 130, "pink"], [-100, -190, "green"], [130, -150, "orange"], [-200, -20, "yellow"], [60, -60, "pink"]]
    .forEach(([dx, dy, n], i) => btnIcon(S, 560 + dx, 530 + dy, 20, n, { t: W(9, 5) + i * 0.08 }));
  pole(S, 1530, 280, 940); pedSig(S, 1530, 360, 0.9);
  const B = walkBox(S, 1530, 700, 0.42);
  const F = dave(S, 1350, 960, "near", { look: 6, mood: "determined", armR: ARM.near, t: W(10, 0) });
  jabArm(S, F, W(10, 4), 4, 0.36); jab(S, B, W(10, 4) + 0.12, 4, 0.36); sweat(S, F, W(10, 5));
  card(S, "WHY CAN'T DAVE STOP?", 1350, 160, { t: W(10, 1), tc: "red" });
  DS.vignette(S); }

// Dave's morning had three buttons. / One of them was lying to him,
const ROAD = [400, 960, 1520];
const roadmap = (S, o = {}) => {
  const tt = o.tt || [S.start, S.start, S.start];
  ROAD.forEach((x, i) => fadeG(S, panel(S, x, 500, 440, 520), tt[i]));
  const g0 = S.grp(), g1 = S.grp(), g2 = S.grp();
  walkBox(S, ROAD[0], 560, 0.5, { parent: g0 }); doorBtn(S, ROAD[1], 480, 110, "close", { parent: g1 }); thermostat(S, ROAD[2], 470, 0.8, { parent: g2 });
  [g0, g1, g2].forEach((g, i) => fadeG(S, g, tt[i]));
  ["WALK BUTTON", "DOOR-CLOSE", "THERMOSTAT"].forEach((s, i) => txt(S, s, ROAD[i], 720, { size: DS.type.small, t: tt[i] }));
};
{ const S = sc(11, 0, { cam: "push", focus: "960 500" }); DS.room(S, ROOM);
  const t0 = W(11, 3); roadmap(S, { tt: [t0, t0 + 0.2, t0 + 0.4] });
  txt(S, "DAVE'S MORNING: 3 BUTTONS", 960, 170, { size: DS.type.body, t: W(11, 0) });
  S.draw(rrect(ROAD[0] - 232, 228, 464, 544, DS.r.lg), W(12, 4), 0, { c: DS.c("red"), w: DS.w.near });
  card(S, "LYING TO HIM", ROAD[0], 850, { size: DS.type.caption, t: W(12, 4), tc: "red" });
  DS.vignette(S); }

// one was working for somebody else, / and one was working on Dave the whole time.
{ const S = sc(13, 0, { cam: "push", focus: "1240 520" }); DS.room(S, ROOM);
  roadmap(S);
  txt(S, "DAVE'S MORNING: 3 BUTTONS", 960, 170, { size: DS.type.body });
  card(S, "LYING TO HIM", ROAD[0], 850, { size: DS.type.caption, tc: "red" });
  card(S, "FOR SOMEBODY ELSE", ROAD[1], 850, { size: DS.type.caption, t: W(13, 2), tc: "purple" });
  card(S, "WORKING ON DAVE", ROAD[2], 850, { size: DS.type.caption, t: W(14, 3), tc: "green" });
  S.text("?", ROAD[1] + 150, 330, { size: DS.type.display, c: DS.c("purple", 2), t: W(13, 4) });
  S.text("?", ROAD[2] + 150, 330, { size: DS.type.display, c: DS.c("green", 2), t: W(14, 5) });
  DS.vignette(S); }

// ===================== 2. The walk button =====================
// Start with the button Dave pressed eleven times. / New York's push-button signals go back to about nineteen sixty-four.
{ const S = sc(15, 0, { cam: "push", focus: "1100 560" }); DS.outdoor(S, DAY); street(S, DAY, { zebra: 1500 });
  pole(S, 1150, 60, 940);
  const B = walkBox(S, 1150, 640, 1.0, { words: true });
  const F = dave(S, 560, 960, "near", { pose: "point", look: 6, mood: "flat" });
  card(S, "SUSPECT 1", 560, 300, { t: W(15, 0), size: DS.type.body });
  card(S, "× 11", 1470, 640, { t: W(15, 6), tc: "red" });
  card(S, "NEW YORK", 560, 420, { t: W(16, 0), size: DS.type.caption });
  stamp(S, 1500, 300, "1964", W(16, 8), "red", { size: DS.type.title });
  DS.vignette(S); }

// They sat where a quiet side street met a busy avenue.
{ const S = sc(17, 0, { cam: "push", focus: "960 520" }); DS.room(S, MAPROOM); mapBoard(S);
  const c1 = carTop(S, 260, 505, "h", "blue"), c2 = carTop(S, 1600, 575, "h", "red", { back: true });
  shift(c1, S.start, S.len, [0, 0], [700, 0], "none"); shift(c2, S.start, S.len, [0, 0], [-700, 0], "none");
  card(S, "QUIET SIDE STREET", 1245, 290, { size: DS.type.caption, t: W(17, 4) });
  card(S, "BUSY AVENUE", 1300, 760, { t: W(17, 9) });
  DS.vignette(S); }

// The avenue stayed green until a car rolled up, / or someone on foot pressed the button.
{ const S = sc(18, 0, { cam: "zoom", focus: "980 540" }); DS.room(S, MAPROOM); const M = mapBoard(S);
  const c1 = carTop(S, 260, 505, "h", "blue"); shift(c1, S.start, 1.6, [0, 0], [440, 0], "none");
  const cs = carTop(S, 960, 120, "v", "green", { t: W(18, 4), parent: clipTo(S.grp(), rect(200, 130, 1520, 740)) });
  shift(cs, W(18, 4), WE(18, 7) - W(18, 4), [0, 0], [0, 280], "power2.out");
  const ta = WE(18, 7) + 0.1; M.A[1].set(ta, "r"); M.Bsig.set(ta + 0.2, "g");
  shift(cs, ta + 0.4, 1.0, [0, 280], [0, 820], "power1.in");
  M.A[1].set(W(19, 0) + 0.1, "g"); M.Bsig.set(W(19, 0), "r");
  const P = pedTop(S, 1100, 790, 1.2, { t: W(19, 1) });
  jab(S, M.btn[1], W(19, 4), 1, 0.3, { fc: DS.c("orange") });
  M.A[1].set(W(19, 5) + 0.2, "r");
  shift(P, W(19, 5) + 0.5, 1.0, [0, 0], [-52, -290], "none");
  S.draw(circ(SX[1] - SWD[1] / 2 - 34, AV[1] + 52, 58), W(18, 3), 0, { c: DS.c("green"), w: DS.w.near });
  DS.vignette(S); }

// Then the city filled with cars, / and computers took over, timing the lights along whole avenues at once.
{ const S = sc(20, 0, { cam: "push", focus: "1100 480" }); DS.room(S, MAPROOM); const M = mapBoard(S);
  const N = ["red", "blue", "yellow", "green", "purple", "orange", "pink", "gray", "red", "gold", "blue", "green"];
  N.forEach((n, i) => carTop(S, 250 + i * 128 + (i % 2) * 30, i % 2 ? 575 : 505, "h", n, { t: W(20, 3) + i * 0.05, back: i % 2 === 1 }));
  carTop(S, SX[0], 300, "v", "orange", { t: W(20, 4) }); carTop(S, SX[2], 760, "v", "purple", { t: W(20, 4) + 0.1, back: true });
  computer(S, 1660, 250, { t: W(21, 1) });
  const wires = S.grp(); M.A.forEach((A, i) => { const ax = SX[i] - SWD[i] / 2 - 34; dash(S.draw(`M1640 ${360 + i * 0} V${440 - i * 24} H${ax} V620`, S.start, 0, { c: DS.c("navy"), w: DS.w.mid, parent: wires }), 14, 12); }); fadeG(S, wires, W(21, 4));
  M.A.forEach((A, i) => { A.set(W(21, 6) + i * 0.2, "r"); A.set(W(21, 8) + i * 0.25, "g"); });
  card(S, "COMPUTERS", 1660, 110, { size: DS.type.caption, t: W(21, 1) });
  DS.vignette(S); }

// Side streets got so busy that cars tripped the lights anyway, / and the buttons got in the way of the computer's plan.
{ const S = sc(22, 0, { cam: "push", focus: "960 420" }); DS.room(S, MAPROOM); const M = mapBoard(S);
  ["red", "blue", "yellow", "green"].forEach((n, i) => carTop(S, 960, 170 + i * 76, "v", n, { t: W(22, 1) + i * 0.1 }));
  ["gray", "orange"].forEach((n, i) => carTop(S, SX[2], 250 + i * 90, "v", n, { t: W(22, 2) + i * 0.1 }));
  computer(S, 1660, 250);
  M.Bsig.set(W(22, 7), "g"); M.A[1].set(W(22, 7), "r"); M.Bsig.set(W(22, 9) + 0.4, "r"); M.A[1].set(W(22, 9) + 0.4, "g");
  jab(S, M.btn[1], W(23, 2), 2, 0.3);
  const zz = S.grp(); S.draw(poly([[1120, 640], [1250, 600], [1300, 520], [1420, 470], [1470, 390], [1580, 350]], 0), S.start, 0, { c: DS.c("red"), w: DS.w.near, parent: zz }); xMark(S, 1430, 440, 0.9, undefined, zz); fadeG(S, zz, W(23, 4));
  card(S, "IN THE WAY", 1300, 760, { t: W(23, 5), tc: "red" });
  DS.vignette(S); }

// So by the late nineteen eighties, most of them had been quietly switched off.
{ const S = sc(24, 0, { cam: "pull", focus: "960 600" }); DS.room(S, MAPROOM); const M = mapBoard(S);
  computer(S, 1660, 250);
  M.btn.forEach((B, i) => { killBtn(S, B, W(24, 11) + i * 0.3); S.draw(circ(B.cx, B.cy + 30, 52), W(24, 12) + i * 0.3, 0, { c: DS.c("red"), w: DS.w.mid }); });
  card(S, "LATE 1980s", 600, 290, { t: W(24, 3), size: DS.type.body });
  card(S, "SWITCHED OFF", 1300, 790, { t: W(24, 12), tc: "red" });
  DS.vignette(S); }

// By two thousand four, that was more than two thousand five hundred buttons out of three thousand two hundred and fifty.
{ const S = sc(25, 0, { cam: "push", focus: "700 520" }); DS.room(S, LAB2);
  panel(S, 560, 520, 720, 640);
  iconGrid(S, 296, 290, 13, 130, 44, { dead: (i) => (i * 37) % 130 < 100, order: (i) => ((i * 37) % 130), deadT: W(25, 6), ddt: (WE(25, 12) - W(25, 6)) / 100 });
  txt(S, "1 DOT = 25 BUTTONS", 560, 800, { size: DS.type.caption });
  card(S, "2004", 560, 170, { t: W(25, 0), size: DS.type.body });
  countUp(S, 1360, 430, 0, 2500, W(25, 6), WE(25, 12) - W(25, 6), { size: DS.type.display, fmt: (n) => Math.round(n).toLocaleString("en-US") + (n >= 2499.5 ? "+" : ""), ease: "none" });
  txt(S, "SWITCHED OFF", 1360, 510, { size: DS.type.small, t: W(25, 12), c: DS.c("gray", 2) });
  txt(S, "OUT OF 3,250", 1360, 680, { size: DS.type.title, t: W(25, 14) });
  DS.vignette(S); }

// The Times called them mechanical placebos.
{ const S = sc(26, 0, { cam: "zoom", focus: "960 560" }); DS.room(S, ROOM);
  DS.shadow(S, 960, 800, 900, { op: 0.18 });
  DS.shape(S, "M960 420 H660 A150 150 0 0 0 660 720 H960 Z", "red"); DS.shape(S, "M960 420 H1260 A150 150 0 0 1 1260 720 H960 Z", "white");
  DS.shape(S, circ(960, 570, 92), "ink", { w: "mid" });
  const B = { cx: 960, cy: 570, r: 70, cap: S.grp() }; DS.shape(S, circ(960, 570, 70), "gray", { tone: 1, w: "mid", parent: B.cap }); S.fill(circ(938, 548, 22, 14), S.start, 0, DS.P.white[0], 0.75, B.cap);
  const Fg = finger(S, 960, 570 - 66, 90, 0.8, { dist: 60 }); pressBy(S, Fg, B, W(26, 5), 2, 0.4);
  card(S, "MECHANICAL PLACEBOS", 960, 830, { t: W(26, 4), size: DS.type.title, tc: "red" });
  txt(S, "THE TIMES, 2004", 1560, 200, { size: DS.type.small, t: W(26, 1) });
  DS.vignette(S); }

// Nobody took them down, though. / Removing them would have cost about a million dollars,
{ const S = sc(27, 0, { cam: "push", focus: "900 560" }); DS.outdoor(S, DAY); street(S, DAY);
  pole(S, 700, 200, 940); pedSig(S, 700, 290, 0.9);
  walkBox(S, 700, 690, 0.6, { dead: true });
  const Wk = who(S, 1000, 960, "near", { s: 1.1, hair: "short", hairC: DS.c("ink"), outfitC: DS.c("orange"), vest: true, look: -6, mood: "flat", pose: "shrug" });
  wrench(S, Wk.hand("R", "shrug")[0] - 10, Wk.hand("R", "shrug")[1], 1, -60);
  card(S, "NOBODY TOOK THEM DOWN", 760, 150, { t: W(27, 0), size: DS.type.caption });
  const tg = S.grp(); priceTag(S, 1300, 470, "$1,000,000", { parent: tg }); fadeG(S, tg, W(28, 4));
  txt(S, "ABOUT", 1560, 380, { size: DS.type.small, t: W(28, 5) });
  DS.vignette(S); }

// and as one city official put it, / "There's no harm in having it at the locations."
{ const S = sc(29, 0, { cam: "push", focus: "960 520" }); DS.room(S, { wall: "glass", floor: "gray", window: [1300, 160, 300, 260] });
  DS.frame(S, 320, 200, 200, 150, "sky");
  const F = who(S, 640, 960, "near", Object.assign({}, OFFICIAL, { look: 6, mood: "smile" }));
  F.setPose(W(30, 1), "shrug");
  card(S, "CITY OFFICIAL", 640, 470, { t: W(29, 3), size: DS.type.caption });
  say(S, 1250, 400, 440, 190, 760, 560, ["“There's no harm", "in having it", "at the locations.”"], W(30, 0), { size: DS.type.small });
  DS.vignette(S); }

// The sign on the pole gave two instructions. / Push button. Wait for walk signal. / Only the second one was doing anything.
{ const S = sc(31, 0, { cam: "zoom", focus: "960 470" }); DS.outdoor(S, DAY); street(S, DAY);
  pole(S, 960, 40, 940); const k = 1.3;
  const B = walkBox(S, 960, 790, k, { words: true });
  const sy = 790 - 120 * k - 330 * k;
  card(S, "TWO INSTRUCTIONS", 960, 130, { t: W(31, 5) });
  S.draw(circ(960, sy + 158 * k, 230, 48), W(32, 0), 0, { c: DS.c("gold"), w: DS.w.near });
  S.draw(circ(960, sy + 254 * k, 230, 82), W(32, 2), 0, { c: DS.c("gold"), w: DS.w.near });
  S.draw(line([760, sy + 152 * k], [1160, sy + 146 * k], 0), W(33, 0), 0, { c: DS.c("red"), w: DS.w.near * 1.4 });
  tick(S, 1300, sy + 254 * k, 1.6, W(33, 5));
  xMark(S, 1300, sy + 152 * k, 0.8, W(33, 0));
  DS.vignette(S); }

// The Times also met a four-year-old in Brooklyn, pressing away while his babysitter explained it never works.
const brooklyn = (S, o = {}) => { // after DS.outdoor(S, DAY)
  street(S, DAY, { zebra: 1450 });
  pole(S, 945, 250, 940); pedSig(S, 945, 330, 0.9);
  const B = walkBox(S, 945, 812, 0.42, { signUp: 130 });
  const K = who(S, 840, 960, "near", Object.assign({}, KID, { look: 6, mood: "happy", armR: ARM.near }));
  const Si = who(S, 520, 960, "near", Object.assign({}, SITTER, { look: 6, mood: o.sitter || "flat", t: o.sitT }));
  return { B, K, Si };
};
{ const S = sc(34, 0, { cam: "push", focus: "800 600" });
  DS.outdoor(S, DAY); const { B, K } = brooklyn(S, { sitT: W(34, 11) });
  jabArm(S, K, W(34, 8), 7, 0.5); jab(S, B, W(34, 8) + 0.12, 7, 0.5);
  card(S, "BROOKLYN", 1450, 200, { t: W(34, 7) });
  card(S, "AGE 4", 700, 690, { t: W(34, 5), size: DS.type.caption });
  say(S, 520, 330, 330, 110, 520, 560, ["“IT NEVER WORKS”"], W(34, 13));
  DS.vignette(S); }

// Asked why he kept going, he said, because it's fun.
{ const S = sc(35, 0, { cam: "none" });
  DS.outdoor(S, DAY); const { B, K, Si } = brooklyn(S, { sitter: "flat" });
  S.zoom(860, 760, 1.35, S.start, 1.2);
  jabArm(S, K, S.start + 0.2, 6, 0.5); jab(S, B, S.start + 0.32, 6, 0.5);
  say(S, 1180, 520, 250, 90, 900, 720, ["IT'S FUN!"], W(35, 7), { c: "green" });
  DS.vignette(S); }

// By twenty sixteen, the city told the Times it had a hundred and twenty working ones left.
{ const S = sc(36, 0, { cam: "push", focus: "1200 500" }); DS.room(S, LAB2);
  newspaper(S, 160, 120, 740, 800, "THE NEW YORK TIMES", "OCTOBER 2016", { head: ["PUSHING THAT", "CROSSWALK BUTTON", "MAY MAKE YOU", "FEEL BETTER, BUT..."] });
  card(S, "2016", 1340, 190, { t: W(36, 1), size: DS.type.body });
  countUp(S, 1340, 470, 0, 120, W(36, 11), WE(36, 14) - W(36, 11), { size: DS.type.display, c: DS.c("green", 2) });
  txt(S, "WORKING ONES LEFT", 1340, 560, { size: DS.type.small, t: W(36, 14) });
  [0, 1, 2, 3, 4].forEach((i) => btnIcon(S, 1180 + i * 80, 700, 22, "green", { t: W(36, 14) + i * 0.08 }));
  DS.vignette(S); }

// And in twenty ten, ABC News checked crossings in Austin, Gainesville and Syracuse, / and found one button that worked.
{ const S = sc(37, 0, { cam: "push", focus: "960 600" }); DS.room(S, LAB2);
  const X = [420, 960, 1500], tt = [W(37, 9), W(37, 10), W(37, 12)];
  ["AUSTIN", "GAINESVILLE", "SYRACUSE"].forEach((s, i) => { fadeG(S, panel(S, X[i], 470, 440, 480), tt[i]); const g2 = S.grp(); pole(S, X[i], 290, 640, { float: true, parent: g2 }); walkBox(S, X[i], 520, 0.4, { parent: g2 }); fadeG(S, g2, tt[i]); txt(S, s, X[i], 680, { size: DS.type.small, t: tt[i] }); });
  card(S, "ABC NEWS, 2010", 960, 150, { t: W(37, 4) });
  for (let i = 0; i < 15; i++) { const live = i === 9, B = btnIcon(S, 260 + i * 100, 830, 22, live ? "green" : "gray", { t: W(38, 1) + i * 0.04 }); if (live) { S.draw(circ(B.cx, B.cy, 52), W(38, 3), 0, { c: DS.c("green"), w: DS.w.near }); } }
  txt(S, "ONE WORKED", 1160, 920, { size: DS.type.small, t: W(38, 3), c: DS.c("green", 2) });
  DS.vignette(S); }

// But that's just America. / In twenty thirteen, the BBC timed a busy crossing on Regent Street in London.
{ const S = sc(39, 0, { cam: "push", focus: "960 560" }); DS.outdoor(S, DAY); street(S, DAY, { ldn: true, zebra: 300 });
  const b = bus(S, -400, 840, 0.75); shift(b, S.start, S.len, [0, 0], [1100, 0], "none");
  pole(S, 1250, 260, 940); const B = ukBox(S, 1250, 700, 0.45);
  ["purple", "green", "gold"].forEach((n, i) => person(S, 820 + i * 140, 960, "near", i, { s: 1.0, look: 6, t: W(40, 7) + i * 0.1 }));
  stopwatch(S, 480, 380, 100, { t: W(40, 5), go: W(40, 5), dur: 3 });
  card(S, "2013", 480, 168, { t: W(40, 1), size: DS.type.body });
  card(S, "REGENT STREET, LONDON", 1240, 150, { t: W(40, 10) });
  DS.vignette(S); }

// Press the button, a hundred and five seconds. / Don't press it, a hundred and five seconds.
{ const S = sc(41, 0, { cam: "none" }); DS.room(S, ROOM);
  [[500, "PRESS", 41], [1420, "DON'T PRESS", 42]].forEach(([x, s, c], i) => {
    fadeG(S, panel(S, x, 520, 800, 780), i ? W(42, 0) : undefined);
    const g = clipTo(S.grp(), rrect(x - 394, 136, 788, 768, DS.r.md)); fadeG(S, g, i ? W(42, 0) : undefined);
    const B = ukBox(S, x - 170, 520, 0.75, { parent: g, wait: i ? undefined : W(41, 1) + 0.1 });
    if (!i) { const Fg = finger(S, x - 170 - 40, 520, 0, 0.62, { parent: g }); pressBy(S, Fg, B, W(41, 0) + 0.1, 2, 0.35); }
    stopwatch(S, x + 190, 470, 120, { parent: g, go: W(c, 3), dur: WE(c, 7) - W(c, 3) + 0.2 });
    txt(S, s, x, 220, { size: DS.type.body, c: i ? DS.c("red", 2) : DS.c("green", 2), t: i ? W(42, 0) : undefined, parent: g });
    countUp(S, x, 820, 0, 105, W(c, 3), WE(c, 7) - W(c, 3), { size: DS.type.title, fmt: (n) => Math.round(n) + " SECONDS", ease: "none", parent: g, t0: i ? W(42, 0) : undefined });
  });
  DS.vignette(S); }

// Transport for London said that one only listens between midnight and seven in the morning.
{ const S = sc(43, 0, { cam: "push", focus: "1200 520" }); DS.outdoor(S, NIGHT); street(S, NIGHT, { ldn: true, zebra: 1500 });
  S.fill(circ(1660, 140, 50), S.start, 0, DS.c("yellow", 1), 1);
  pole(S, 480, 300, 940); const B = ukBox(S, 480, 640, 0.8, { waitOn: true });
  clockFace(S, 1180, 470, 240, { wedge: [0, 7], wedgeT: W(43, 9), sweep: [W(43, 9), WE(43, 14) - W(43, 9), 7] });
  card(S, "TRANSPORT FOR LONDON", 960, 130, { t: W(43, 0), size: DS.type.caption });
  card(S, "MIDNIGHT TO 7 AM", 1180, 820, { t: W(43, 11), tc: "red" });
  DS.vignette(S); }

// To be fair, London says most of its junction buttons do work,
{ const S = sc(44, 0, { cam: "push", focus: "1150 600" }); DS.outdoor(S, DAY); street(S, DAY, { ldn: true, zebra: 1460 });
  pole(S, 1250, 260, 940); const B = ukBox(S, 1250, 700, 0.45, { wait: W(44, 8) + 0.15, green: W(44, 9) });
  const P = person(S, 1076, 960, "near", 1, { look: 6, armR: ARM.near, mood: "smile" });
  jabArm(S, P, W(44, 8), 1, 0.5); jab(S, B, W(44, 8) + 0.12, 1);
  tick(S, 1430, 470, 2, W(44, 9) + 0.1);
  card(S, "MOST JUNCTION BUTTONS WORK", 960, 150, { t: W(44, 5), size: DS.type.caption });
  DS.vignette(S); }

// and at a crossing away from any junction, the button really stops the cars.
{ const S = sc(45, 0, { cam: "push", focus: "900 640" }); DS.outdoor(S, DAY); street(S, DAY, { ldn: true, zebra: 820 });
  pole(S, 1250, 230, 940); const TL = trafficLight(S, 1250, 330, 0.8);
  const B = ukBox(S, 1250, 700, 0.45, { wait: W(45, 10) });
  const P = person(S, 1076, 960, "near", 2, { look: 6, armR: ARM.near });
  jabArm(S, P, W(45, 9), 1, 0.5); jab(S, B, W(45, 9) + 0.12, 1);
  TL.set(W(45, 9) + 0.25, "yellow"); TL.set(W(45, 10) + 0.3, "red");
  const cg = car(S, 300, 830, 0.9, "blue"); shift(cg, S.start, WE(45, 13) - S.start, [-500, 0], [320, 0], "power2.out");
  card(S, "AWAY FROM ANY JUNCTION", 960, 150, { t: W(45, 3), size: DS.type.caption });
  DS.vignette(S); }

// Britain's newer Puffin crossings even have a sensor watching the kerb.
const puffin = (S, o = {}) => { // after DS.outdoor(S, DAY)
  street(S, DAY, { ldn: true, zebra: 1460 });
  pole(S, 1250, 230, 940);
  const B = ukBox(S, 1250, 680, 0.6, o.box || {});
  sensor(S, 1250, 250, 1060, 930, 380, { t: o.sensT });
  return B;
};
{ const S = sc(46, 0, { cam: "push", focus: "1150 500" }); DS.outdoor(S, DAY);
  puffin(S, { sensT: W(46, 7) });
  card(S, "PUFFIN CROSSING", 640, 150, { t: W(46, 2), size: DS.type.body });
  card(S, "SENSOR", 1560, 240, { t: W(46, 7), tc: "red" }); arrowR(S, 1430, 250, 1320, 250, W(46, 7) + 0.1, { c: "red" });
  DS.vignette(S); }

// Press the button and wander off, and it's meant to cancel your request. / Finally, a button that checks you meant it.
{ const S = sc(47, 0, { cam: "push", focus: "960 560" }); DS.outdoor(S, DAY);
  const B = puffin(S, { box: { wait: W(47, 1), waitOff: W(47, 11) } });
  const F = dave(S, 1076, 960, "near", { look: 6, armR: ARM.near, mood: "smile" });
  jabArm(S, F, W(47, 0), 2, 0.4); jab(S, B, W(47, 0) + 0.12, 2, 0.4);
  F.face(W(47, 4), "flat", -6); F.walk(W(47, 4), 1.6, {}); S.move(F.all, W(47, 4), 1.6, { x: -720 }, "none");
  stamp(S, 1560, 470, "CANCELLED", W(47, 11));
  F.face(W(48, 0), "wow", 6);
  card(S, "A BUTTON THAT CHECKS", 760, 150, { t: W(48, 1), tc: "green" });
  DS.vignette(S); }

// Then researchers working for the Department for Transport inspected seventy-two Puffin crossings.
const puffinGrid = (S, o = {}) => { const P = []; for (let i = 0; i < 72; i++) { const x = 900 + (i % 12) * 72, y = 330 + Math.floor(i / 12) * 92, g = S.grp(); DS.shape(S, rrect(x - 22, y - 32, 44, 64, DS.r.xs), "gray", { tone: 1, w: "detail", parent: g }); DS.shape(S, rect(x - 13, y - 4, 26, 18), "ink", { flat: true, w: "hair", parent: g }); S.fill(circ(x, y - 18, 7), S.start, 0, DS.c("green", 1), 1, g); fadeG(S, g, o.t !== undefined ? o.t + i * 0.012 : undefined, 0.2); P.push([x, y]); } return P; };
{ const S = sc(49, 0, { cam: "push", focus: "1100 520" }); DS.room(S, LAB2);
  panel(S, 1290, 560, 960, 640);
  puffinGrid(S, { t: W(49, 9) });
  const A = who(S, 300, 960, "near", { s: 1.1, hair: "bun", hairC: DS.c("ink"), outfitC: DS.c("green"), vest: true, look: 6 });
  const Bq = who(S, 560, 960, "near", { s: 1.1, hair: "short", hairC: DS.c("brown"), outfitC: DS.c("gray", 2), vest: true, look: 6, specs: true, t: W(49, 1) + 0.2 });
  card(S, "DEPARTMENT FOR TRANSPORT", 640, 150, { t: W(49, 5), size: DS.type.caption });
  countUp(S, 1290, 205, 0, 72, W(49, 9), 0.86, { size: DS.type.title, fmt: (n) => Math.round(n) + " PUFFINS", ease: "none" });
  DS.vignette(S); }

// Only eleven had the cancel feature working.
{ const S = sc(50, 0, { cam: "zoom", focus: "1290 560" }); DS.room(S, LAB2);
  panel(S, 1290, 560, 960, 640);
  const P = puffinGrid(S), keep = new Set([3, 8, 14, 22, 29, 33, 41, 47, 52, 60, 67]);
  P.forEach(([x, y], i) => { if (keep.has(i)) return; const g = S.grp(); DS.shape(S, rrect(x - 22, y - 32, 44, 64, DS.r.xs), "gray", { tone: 2, w: "detail", parent: g }); S.fill(circ(x, y - 18, 7), S.start, 0, DS.c("gray", 1), 1, g); fadeG(S, g, W(50, 1) + ((i * 29) % 72) * 0.012, 0.15); });
  keep.forEach((i) => S.draw(circ(P[i][0], P[i][1], 40), W(50, 4) + 0.2, 0, { c: DS.c("green"), w: DS.w.mid }));
  who(S, 300, 960, "near", { s: 1.1, hair: "bun", hairC: DS.c("ink"), outfitC: DS.c("green"), vest: true, look: 6, mood: "wow" });
  card(S, "ONLY 11 OF 72", 1290, 140, { t: W(50, 1), tc: "red", size: DS.type.body });
  DS.vignette(S); }

// So a walk button depends on the city, the junction and the hour.
{ const S = sc(51, 0, { cam: "push", focus: "1100 560" }); DS.room(S, ROOM);
  pole(S, 330, 260, 940); walkBox(S, 330, 640, 0.6);
  const X = [820, 1220, 1620], tt = [W(51, 7), W(51, 9), W(51, 12)];
  X.forEach((x, i) => fadeG(S, panel(S, x, 520, 340, 400), tt[i]));
  { const g = S.grp(); skyline(S, X[0], 480, 1, g); fadeG(S, g, tt[0]); }
  { const g = S.grp(); crossroads(S, X[1], 500, 0.9, g); fadeG(S, g, tt[1]); }
  { const g = S.grp(); clockFace(S, X[2], 500, 120, { parent: g }); fadeG(S, g, tt[2]); }
  ["CITY", "JUNCTION", "HOUR"].forEach((s, i) => txt(S, s, X[i], 680, { size: DS.type.small, t: tt[i] }));
  card(S, "IT DEPENDS", 1220, 150, { t: W(51, 4), size: DS.type.body });
  DS.vignette(S); }

// Dave's eleven presses were a lottery ticket.
{ const S = sc(52, 0, { cam: "push", focus: "700 420" }); DS.room(S, ROOM);
  scoreboard(S, 160, 150, { cells: { r0: [["tick"], ["x", W(52, 1)], ["lotto", W(52, 5)]], r1: [["tick"]], r2: [["tick"]] } });
  const F = dave(S, 1500, 960, "near", { look: -6, mood: "flat" });
  F.face(W(52, 5), "worried", -6);
  card(S, "LOTTERY TICKET", 1500, 360, { t: W(52, 5), tc: "red" });
  DS.vignette(S); }

// ===================== 3. The door-close button =====================
// left-arm jabs (the figure stands to the right of the button)
const ARML = { stand: [[28, 52], [48, 100]], reach: [[-62, 10], [-134, 8]], near: [[-54, 12], [-106, 10]], up: [[-62, -10], [-130, -44]], upNear: [[-54, -6], [-104, -34]] };
const jabArmL = (S, F, t, n = 1, gap = 0.4, kind = "reach", hold = false) => { const nr = kind === "up" ? ARML.upNear : ARML.near, fr = kind === "up" ? ARML.up : ARML.reach; for (let i = 0; i < n; i++) { F.setPose(t + i * gap, null, [fr, ARML.stand]); if (i < n - 1 || !hold) F.setPose(t + i * gap + gap * 0.55, null, [nr, ARML.stand]); } };
// Dave (or anyone) inside the lift, right of the panel, left hand on door-close. s = mid-plane Dave
const LX = 1560, LGY = 900; // the panel's door-close button is at (1422, 646) in liftRoom
const growX = (g, t, x, y, dur = 0.8, ease = "none") => { const tf = (k) => `translate(${x} ${y}) scale(${k} 1) translate(${-x} ${-y})`; tl.fromTo(g, { attr: { transform: tf(0.001) } }, { attr: { transform: tf(1) }, duration: dur, ease }, t); };
// lift lobby: warm hall, doors on the back wall, call buttons beside them
const LOBBY = { back: [260, 120, 1660, 820], wall: "dusk", floor: "floor", window: false };
const callPanel = (S, x, y, o = {}) => { const g = S.grp(o.parent); DS.shape(S, rrect(x - 40, y - 80, 80, 160, DS.r.sm), "gray", { tone: 1, w: "detail", parent: g }); const B = { cx: x, cy: y - 32, r: 22, g, cap: S.grp(g) }; DS.shape(S, circ(x, y - 32, 22), o.lit ? "gold" : "white", { tone: o.lit ? 0 : 2, w: "detail", parent: B.cap }); S.draw(`M${x - 10} ${y - 26} L${x} ${y - 40} L${x + 10} ${y - 26} Z`, S.start, 0, { fill: DS.c("ink"), c: DS.c("ink"), w: DS.w.hair, parent: B.cap }); DS.shape(S, circ(x, y + 32, 22), "white", { tone: 2, w: "detail", parent: g }); S.draw(`M${x - 10} ${y + 26} L${x} ${y + 40} L${x + 10} ${y + 26} Z`, S.start, 0, { fill: DS.c("ink"), c: DS.c("ink"), w: DS.w.hair, parent: g }); return B; };
const lobby = (S, o = {}) => { // after DS.room(S, LOBBY)
  DS.frame(S, 380, 220, 220, 160, "sky");
  const D = liftDoors(S, 700, 230, 520, 590, { open: o.open ?? 1 });
  const C = callPanel(S, 1330, 560, { lit: o.lit });
  if (o.plant !== false) DS.plant(S, 1760, 1000, 0.9, -1);
  return { D, C };
};
const wheelchair = (S, x, gy, k = 1, parent) => {
  DS.shadow(S, x + 20 * k, gy, 300 * k, { parent });
  DS.shape(S, rrect(x - 90 * k, gy - 300 * k, 24 * k, 190 * k, DS.r.xs), "navy", { w: "mid", parent });
  DS.shape(S, rrect(x - 90 * k, gy - 132 * k, 190 * k, 26 * k, DS.r.xs), "navy", { w: "mid", parent });
  S.draw(line([x + 90 * k, gy - 110 * k], [x + 110 * k, gy - 30 * k], 0), S.start, 0, { c: DS.c("gray", 2), w: DS.w.mid, parent });
  DS.shape(S, circ(x + 112 * k, gy - 20 * k, 20 * k), "ink", { w: "detail", parent });
  return gy - 132 * k;
};
const wheel = (S, x, gy, k = 1, parent) => { S.draw(circ(x - 20 * k, gy - 96 * k, 96 * k), S.start, 0, { c: DS.c("ink"), w: DS.w.near, parent }); S.draw(circ(x - 20 * k, gy - 96 * k, 80 * k), S.start, 0, { c: DS.c("gray", 2), w: DS.w.detail, parent }); S.draw(rays(x - 20 * k, gy - 96 * k, 10 * k, 80 * k, 8), S.start, 0, { c: DS.c("gray", 2), w: DS.w.hair, parent }); DS.shape(S, circ(x - 20 * k, gy - 96 * k, 12 * k), "gray", { w: "detail", parent }); };
// a wheelchair user (whole group, for rolling with shift())
const wheelUser = (S, x, gy, k = 1, o = {}) => {
  const g = S.grp(); const seat = wheelchair(S, x, gy, k, g);
  const F = who(S, x - 20 * k, seat, "near", Object.assign({ s: 1.1 * k, sit: true, pose: "hold", hair: "curly", hairC: DS.c("ink"), outfitC: DS.c("green"), mood: "smile", look: 6, float: true, parent: g }, o));
  DS.shape(S, `M${x - 40 * k} ${seat - 30 * k} L${x + 86 * k} ${seat - 30 * k} Q${x + 108 * k} ${seat - 26 * k} ${x + 106 * k} ${seat - 4 * k} L${x + 100 * k} ${seat + 110 * k} L${x + 56 * k} ${seat + 116 * k} L${x + 52 * k} ${seat + 14 * k} L${x - 40 * k} ${seat + 14 * k} Z`, "earth", { tone: 2, parent: g });
  wheel(S, x, gy, k, g);
  return { g, F };
};

// Next, the lift, where Dave jabbed door-close until the doors gave in.
{ const S = sc(53, 0, { cam: "push", focus: "1100 560" }); DS.room(S, LIFT); const { D, P } = liftRoom(S);
  const F = dave(S, LX, LGY, "mid", { look: -6, mood: "determined", armL: ARML.upNear });
  jabArmL(S, F, W(53, 4), 6, 0.36, "up"); jab(S, P.close, W(53, 4) + 0.12, 6, 0.36);
  sweat(S, F, W(53, 6));
  D.to(0, W(53, 9), 1.3);
  F.face(W(53, 10), "smile", -6);
  card(S, "SUSPECT 2: DOOR-CLOSE", 840, 140, { t: W(53, 1) });
  DS.vignette(S); }

// In nineteen ninety, America passed the Americans with Disabilities Act.
{ const S = sc(54, 0, { cam: "push", focus: "900 560" }); DS.room(S, LOBBY); lobby(S);
  const U = wheelUser(S, 300, 960, 1); shift(U.g, S.start, 3.2, [0, 0], [300, 0], "power1.out");
  card(S, "1990", 1450, 300, { t: W(54, 1), size: DS.type.title });
  card(S, "AMERICANS WITH DISABILITIES ACT", 960, 130, { t: W(54, 6), size: DS.type.caption });
  DS.vignette(S); }

// Under its rules, lift doors must stay open at least three seconds,
{ const S = sc(55, 0, { cam: "push", focus: "1100 480" }); DS.room(S, LOBBY); lobby(S, { plant: false });
  const U = wheelUser(S, 900, 960, 1); shift(U.g, S.start, S.len, [0, 0], [120, 0], "none");
  stopwatch(S, 1550, 380, 100, { go: W(55, 5), dur: 1.5, deg: 360 });
  countUp(S, 1570, 600, 0, 3, W(55, 5), 1.5, { size: DS.type.body, fmt: (n) => { const q = Math.floor(n + 0.001); return q + (q === 1 ? " SECOND" : " SECONDS"); }, ease: "none", c: DS.c("green", 2) });
  card(S, "AT LEAST", 1570, 690, { t: W(55, 8), size: DS.type.caption });
  card(S, "DOORS STAY OPEN", 960, 130, { t: W(55, 4) });
  DS.vignette(S); }

// and longer when someone is walking over from the call button.
{ const S = sc(56, 0, { cam: "push", focus: "1100 560" }); DS.room(S, LOBBY); const { C } = lobby(S, { lit: true });
  const P = person(S, 1440, 960, "near", 3, { look: -6, mood: "smile", hair: "bun", hairC: DS.c("gray", 1), outfitC: DS.c("purple") });
  P.walk(W(56, 3), 2.2, {}); S.move(P.all, W(56, 3), 2.2, { x: -420 }, "none");
  dash(S.draw(line([1400, 900], [1020, 900], 0), W(56, 2), 0, { c: DS.c("red"), w: DS.w.mid }), 18, 14); S.arrow(1060, 900, 1000, 900, W(56, 2), 0.2, { c: DS.c("red"), w: DS.w.mid });
  stopwatch(S, 470, 560, 90, { go: S.start, dur: S.len, deg: 400 });
  card(S, "LONGER", 470, 760, { t: W(56, 1), tc: "green" });
  DS.vignette(S); }

// The door-close button isn't allowed to cut that short.
{ const S = sc(57, 0, { cam: "push", focus: "700 520" }); DS.room(S, ROOM);
  const B = doorBtn(S, 620, 520, 170, "close");
  const Fg = finger(S, 700, 545, 200, 1.0); pressBy(S, Fg, B, W(57, 1), 4, 0.36);
  panel(S, 1360, 360, 760, 300);
  txt(S, "DOORS OPEN", 1360, 270, { size: DS.type.small });
  const bg = S.grp(); DS.shape(S, rrect(1030, 330, 660, 70, DS.r.sm), "gray", { tone: 1, w: "detail", parent: bg });
  const fill = S.grp(); DS.shape(S, rrect(1030, 330, 660, 70, DS.r.sm), "green", { w: "detail", parent: fill }); growX(fill, S.start, 1030, 365, S.len, "none");
  txt(S, "3 SECONDS MINIMUM", 1360, 460, { size: DS.type.caption });
  card(S, "CAN'T CUT IT SHORT", 620, 140, { t: W(57, 5), tc: "red", size: DS.type.body });
  DS.vignette(S); }

// And many lifts are set to close at about the minimum anyway, / so there's nothing left for the button to shorten.
{ const S = sc(58, 0, { cam: "push", focus: "960 520" }); DS.room(S, ROOM);
  panel(S, 960, 520, 1400, 600);
  const X0 = 760, X1 = 1380;
  [["LEGAL MINIMUM", 380, W(58, 9), "green"], ["THE LIFT'S SETTING", 560, W(58, 4), "blue"]].forEach(([s, y, t, n]) => {
    txt(S, s, 720, y + 12, { size: DS.type.caption, anchor: "end", t });
    const g = S.grp(); DS.shape(S, rrect(X0, y - 40, X1 - X0, 80, DS.r.sm), n, { parent: g }); fadeG(S, g, t, 0.1); growX(g, t, X0, y, 0.9, "power2.out");
    txt(S, "3 S", X1 + 70, y + 14, { size: DS.type.small, t: t + 0.9 });
  });
  dash(S.draw(line([X1, 300], [X1, 660], 0), W(59, 2), 0, { c: DS.c("red"), w: DS.w.mid }), 16, 12);
  txt(S, "BUTTON'S WINDOW: 0 S", 960, 730, { size: DS.type.small, c: DS.c("red", 2), t: W(59, 2) });
  card(S, "NOTHING LEFT TO SHORTEN", 960, 130, { t: W(59, 2), tc: "red" });
  DS.vignette(S); }

// The head of the elevator industry's trade group told the New York Times,
{ const S = sc(60, 0, { cam: "push", focus: "800 560" }); DS.room(S, LAB2);
  const F = who(S, 560, 960, "near", Object.assign({}, LIFTBOSS, { look: 6, mood: "flat" }));
  card(S, "LIFT INDUSTRY HEAD", 560, 470, { t: W(60, 1), size: DS.type.caption });
  newspaper(S, 980, 140, 760, 780, "THE NEW YORK TIMES", "OCTOBER 2016", { head: ["PUSHING THAT", "CROSSWALK BUTTON", "MAY MAKE YOU", "FEEL BETTER, BUT..."], t: W(60, 9) });
  DS.vignette(S); }

// "The riding public would not be able to make those doors close any faster."
{ const S = sc(61, 0, { cam: "push", focus: "960 480" }); DS.room(S, LAB2);
  const F = who(S, 600, 960, "near", Object.assign({}, LIFTBOSS, { look: 6, mood: "flat" }));
  card(S, "LIFT INDUSTRY HEAD", 600, 490, { size: DS.type.caption });
  say(S, 1050, 290, 540, 150, 690, 585, ["“The riding public would not", "be able to make those doors", "close any faster.”"], W(61, 0), { size: DS.type.small });
  const D = liftDoors(S, 1180, 620, 340, 300, { open: 1 }); D.to(0, W(61, 10), 1.6);
  DS.vignette(S); }

// So why does it feel like it works? / Drexel psychologist John Kounios pointed out that the doors always close eventually.
{ const S = sc(62, 0, { cam: "push", focus: "1100 520" }); DS.room(S, LOBBY);
  DS.frame(S, 380, 220, 220, 160, "sky");
  const D = liftDoors(S, 960, 250, 560, 590, { open: 1 }); D.to(0, W(63, 10), 2.0);
  clockFace(S, 1240, 175, 60, { sweep: [W(63, 8), 2.4, 1] });
  card(S, "WHY DOES IT FEEL LIKE IT WORKS?", 700, 120, { t: W(62, 1), size: DS.type.caption });
  const K = who(S, 520, 960, "near", Object.assign({}, KOUNIOS, { look: 6, mood: "flat", pose: "point", t: W(63, 2) }));
  card(S, "JOHN KOUNIOS", 520, 440, { t: W(63, 2), size: DS.type.caption });
  txt(S, "PSYCHOLOGIST, DREXEL", 520, 506, { t: W(63, 2) });
  DS.vignette(S); }

// "If the door never closed, we would stop pressing the button."
{ const S = sc(64, 0, { cam: "push", focus: "960 520" }); DS.room(S, LOBBY);
  const D = liftDoors(S, 960, 250, 560, 590, { open: 1 });
  S.draw(`M960 250 q40 30 80 0 M960 250 q30 40 0 80 M960 250 l70 70`, S.start, 0, { c: DS.c("gray", 2), w: DS.w.hair });
  S.draw(`M1520 250 q-40 30 -80 0 M1520 250 q-30 40 0 80 M1520 250 l-70 70`, S.start, 0, { c: DS.c("gray", 2), w: DS.w.hair });
  const K = who(S, 520, 960, "near", Object.assign({}, KOUNIOS, { look: 6, mood: "flat" }));
  card(S, "JOHN KOUNIOS", 360, 440, { size: DS.type.caption });
  say(S, 820, 200, 520, 110, 580, 560, ["“If the door never closed,", "we would stop pressing the button.”"], W(64, 0), { size: DS.type.caption });
  const Dv = dave(S, 1240, 900, "mid", { look: -6, mood: "worried", t: W(64, 5) });
  Dv.face(W(64, 7), "flat", -6);
  DS.vignette(S); }

// Dave pressed, the door closed, / and his brain filed it as a win.
{ const S = sc(65, 0, { cam: "push", focus: "960 400" }); DS.room(S, LIFT); const { D, P } = liftRoom(S);
  const F = dave(S, LX, LGY, "mid", { look: -6, mood: "determined", armL: ARML.upNear });
  jabArmL(S, F, W(65, 1), 1, 0.4, "up"); jab(S, P.close, W(65, 1) + 0.12, 1);
  D.to(0, W(65, 3), 0.9);
  const tg = S.grp(); S.thought(1000, 300, 330, 170, 1460, 560, S.start, 0.3, { parent: tg }); fadeG(S, tg, W(66, 1));
  const bg = S.grp(); S.brain(880, 300, 0.62, S.start, 0, { parent: bg, fill: DS.c("pink", 1) }); fadeG(S, bg, W(66, 1));
  const fg = S.grp(); DS.shape(S, rrect(1060, 250, 180, 140, DS.r.sm), "gray", { tone: 1, w: "detail", parent: fg }); DS.shape(S, rrect(1080, 330, 140, 44, DS.r.xs), "gray", { tone: 2, w: "hair", parent: fg }); fadeG(S, fg, W(66, 1));
  const cg = S.grp(); DS.shape(S, rrect(1090, 180, 120, 70, DS.r.xs), "white", { w: "detail", parent: cg }); txt(S, "WIN", 1150, 230, { parent: cg, c: DS.c("green", 2) }); fadeG(S, cg, W(66, 3)); shift(cg, W(66, 4), 0.5, [0, -30], [0, 110], "power2.in");
  F.face(W(66, 6), "happy", -6);
  DS.vignette(S); }

// But here's the part nobody tells Dave. / The door-close button isn't fake.
{ const S = sc(67, 0, { cam: "zoom", focus: "1150 520" }); DS.room(S, ROOM);
  const F = dave(S, 380, 960, "near", { look: -8, mood: "smile" });
  const B = doorBtn(S, 1180, 500, 170, "close", { lit: true });
  S.draw(circ(1180, 500, 250), W(68, 1), 0, { c: DS.c("gold", 2), w: DS.w.near });
  card(S, "THE PART NOBODY TELLS DAVE", 960, 130, { t: W(67, 2), size: DS.type.caption });
  stamp(S, 1180, 840, "NOT FAKE", W(68, 3), "green", { size: DS.type.body });
  DS.vignette(S); }

// In a fire, a firefighter turns a key, / and from then on, the doors close only while someone holds that button down.
{ const S = sc(69, 0, { cam: "push", focus: "1250 560" }); DS.room(S, LIFT); const { D, P } = liftRoom(S, { lit: true });
  const F = fireman(S, LX, LGY, "mid", { look: -6, armL: ARML.upNear });
  fireKey(S, P, 1, W(69, 4), W(69, 5) + 0.2);
  jabArmL(S, F, W(70, 9), 1, 0.4, "up", true); jab(S, P.close, W(70, 9) + 0.12, 1, 0.3, { hold: true });
  D.to(0.45, W(70, 10), WE(70, 13) - W(70, 10) + 0.3);
  card(S, "IN A FIRE", 840, 140, { t: W(69, 1), tc: "red" });
  txt(S, "HOLD IT", 1660, 380, { size: DS.type.caption, c: DS.c("red", 2), t: W(70, 10) });
  DS.vignette(S); }

// Let go too early, and they open again.
{ const S = sc(71, 0, { cam: "none" }); DS.room(S, LIFT); const { D, P } = liftRoom(S, { lit: true, open: 0.45 });
  fireKey(S, P, 1); P.keyG.setAttribute("transform", `rotate(90 ${P.key[0]} ${P.key[1]})`);
  const F = fireman(S, LX, LGY, "mid", { look: -6, armL: ARML.up });
  jab(S, P.close, S.start - 0.6, 1, 0.3, { hold: true, flash: false });
  F.setPose(W(71, 1), null, [ARML.stand, ARML.stand]); release(P.close, W(71, 1));
  D.to(1, W(71, 5), 0.8);
  card(S, "LET GO", 840, 140, { t: W(71, 0), tc: "red" });
  stamp(S, 840, 560, "OPEN AGAIN", W(71, 6));
  DS.vignette(S); }

// So it was never really Dave's button. / It belongs to the fire department, and Dave is allowed to borrow it.
{ const S = sc(72, 0, { cam: "push", focus: "700 420" }); DS.room(S, ROOM);
  scoreboard(S, 160, 150, { cells: { r0: [["tick"], ["x"], ["lotto"]], r1: [["tick"], ["x", W(72, 3)], ["fire", W(73, 4)]], r2: [["tick"]] } });
  const F = dave(S, 1500, 960, "near", { look: -6, mood: "flat" });
  F.face(W(73, 9), "smile", -6);
  card(S, "BORROWED", 1500, 360, { t: W(73, 11), tc: "purple" });
  DS.vignette(S); }

// ===================== 4. The thermostat =====================
// office: back-wall window, two desks with monitors; workers optional. Dave presses the thermostat's down button from its right (left hand)
const officeSet = (S, o = {}) => { // after DS.room(S, OFFICE)
  DS.frame(S, 420, 200, 200, 150, "grass");
  if (o.desks !== false) { deskF(S, 980, 1500, 780, 960, "wood"); laptop(S, 1240, 780, 220, 150, { screen: "glass" }); }
};
const thermometer = (S, cx, cy, h, o = {}) => { const g = S.grp(o.parent); DS.shape(S, rrect(cx - 26, cy - h / 2, 52, h, DS.r.lg), "white", { w: "mid", parent: g }); DS.shape(S, circ(cx, cy + h / 2 - 10, 42), "red", { w: "mid", parent: g }); DS.shape(S, rrect(cx - 10, cy - h / 2 + 40, 20, h - 60, DS.r.sm), "red", { flat: true, w: "hair", parent: g }); for (let i = 0; i < 5; i++) S.draw(line([cx + 26, cy - h / 2 + 50 + i * (h - 120) / 4], [cx + 50, cy - h / 2 + 50 + i * (h - 120) / 4], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.detail, parent: g }); return fadeG(S, g, o.t); };
const slip = (S, cx, cy, name = "red", o = {}) => { const g = S.grp(o.parent); DS.drop(S, rect(cx - 116, cy - 46, 240, 100), { parent: g }); DS.shape(S, rect(cx - 120, cy - 50, 240, 100), "white", { w: "detail", flat: true, parent: g }); DS.shape(S, rect(cx - 120, cy - 50, 240, 26), name, { flat: true, w: "hair", parent: g }); lines(S, cx - 96, cy + 4, 180, 2, S.start, 26, g); return fadeG(S, g, o.t, 0.25); };
const snowflake = (S, cx, cy, r, o = {}) => { const g = S.grp(o.parent); S.draw(rays(cx, cy, 0, r, 6) + rays(cx, cy, r * 0.5, r * 0.75, 12, Math.PI / 12), S.start, 0, { c: DS.c("blue", 1), w: DS.w.near, parent: g }); return fadeG(S, g, o.t); };

// Which leaves the thermostat, the one button Dave is truly proud of.
{ const S = sc(74, 0, { cam: "push", focus: "900 560" }); DS.room(S, OFFICE); officeSet(S, { desks: false });
  const T = thermostat(S, 760, 620, 1.0, { temp: "22°", to: ["21°", W(74, 6) + 0.12] });
  const F = dave(S, T.down.cx + 173, 960, "near", { look: -6, mood: "smile", armL: ARML.near });
  jabArmL(S, F, W(74, 6), 1, 0.45); jab(S, T.down, W(74, 6) + 0.12, 1);
  F.setPose(W(74, 9), "hips"); F.face(W(74, 9), "happy", -4);
  card(S, "TRULY PROUD", 1160, 300, { t: W(74, 9), tc: "green" });
  deskF(S, 1300, 1760, 780); laptop(S, 1530, 780, 220, 150, { screen: "glass" });
  DS.vignette(S); }

// In two thousand three, a trade magazine called Air Conditioning, Heating and Refrigeration News asked its readers a quiet question.
{ const S = sc(75, 0, { cam: "push", focus: "800 520" }); DS.room(S, LAB2);
  const g = S.grp(); paperR(S, 380, 100, 700, 840, { parent: g, name: "sky", tone: 1 });
  DS.shape(S, rect(380, 100, 700, 300), "navy", { flat: true, w: "detail", parent: g });
  ["AIR CONDITIONING,", "HEATING AND", "REFRIGERATION NEWS"].forEach((s, i) => wtxt(S, s, 730, 190 + i * 70, { size: DS.type.small, parent: g }));
  thermostat(S, 730, 640, 1.2, { parent: g, temp: "72°" });
  fadeG(S, g, W(75, 6));
  card(S, "2003", 1450, 220, { t: W(75, 1), size: DS.type.title });
  card(S, "A TRADE MAGAZINE", 1450, 360, { t: W(75, 5), size: DS.type.caption });
  say(S, 1450, 600, 200, 130, 1330, 790, ["?"], W(75, 17), { size: DS.type.display, c: "red" });
  DS.vignette(S); }

// Had they ever installed a dummy thermostat, wired to nothing?
{ const S = sc(76, 0, { cam: "zoom", focus: "960 520" }); DS.room(S, OFFICE); officeSet(S, { desks: false });
  thermostat(S, 960, 380, 1.1, { temp: "22°", wires: true, wiresT: W(76, 7), ringT: W(76, 8) });
  card(S, "DUMMY THERMOSTAT", 960, 120, { t: W(76, 5), size: DS.type.body });
  card(S, "WIRED TO NOTHING", 1460, 800, { t: W(76, 8), tc: "red" });
  DS.vignette(S); }

// Seventy people answered, and fifty-one said yes.
{ const S = sc(77, 0, { cam: "push", focus: "760 520" }); DS.room(S, LAB2);
  panel(S, 700, 540, 860, 680);
  for (let i = 0; i < 70; i++) { const x = 340 + (i % 10) * 80, y = 300 + Math.floor(i / 10) * 86; mini(S, x, y + 40, 1.0, { t: W(77, 0) + i * 0.012, fill: DS.P.white[0] }); if (i < 51) mini(S, x, y + 40, 1.0, { t: W(77, 4) + i * 0.02, fill: DS.c("green", 1), c: DS.c("green", 2) }); }
  card(S, "70 ANSWERED", 700, 150, { t: W(77, 1) });
  countUp(S, 1450, 470, 0, 51, W(77, 4), 1.0, { size: DS.type.display, c: DS.c("green", 2) });
  txt(S, "SAID YES", 1450, 560, { size: DS.type.small, t: W(77, 6) });
  DS.vignette(S); }

// It was an informal online poll, so it isn't every office on Earth. / It might be Dave's, though.
{ const S = sc(78, 0, { cam: "push", focus: "960 540" }); DS.room(S, OFFICE); officeSet(S, { desks: false });
  deskF(S, 160, 900, 760);
  const L = laptop(S, 530, 760, 420, 280, { screen: "white" });
  txt(S, "YES", 400, 590, { t: W(78, 3) }); txt(S, "NO", 400, 660, { t: W(78, 3) });
  [[580, 51, "green"], [650, 19, "red"]].forEach(([y, n, c]) => { const g = S.grp(); DS.shape(S, rect(450, y - 30, n * 4.4, 40), c, { flat: true, w: "hair", parent: g }); fadeG(S, g, W(78, 3)); growX(g, W(78, 3), 450, y, 0.6, "power2.out"); });
  stamp(S, 530, 380, "INFORMAL", W(78, 3), "red");
  card(S, "NOT EVERY OFFICE ON EARTH", 960, 120, { t: W(78, 8), size: DS.type.caption });
  const T = thermostat(S, 1240, 520, 0.8, { temp: "22°" });
  const F = dave(S, 1560, 960, "near", { look: -6, mood: "flat", t: W(79, 0) });
  F.face(W(79, 3), "worried", -6);
  S.text("?", 1240, 330, { size: DS.type.display, c: DS.c("red", 2), t: W(79, 3) });
  DS.vignette(S); }

// One reader in Colorado wrote in about a thermostat that controlled nothing at all.
{ const S = sc(80, 0, { cam: "push", focus: "960 520" }); DS.room(S, ROOM);
  envelope(S, 560, 560, 600, 380);
  const st = S.grp(); DS.shape(S, rect(750, 400, 90, 110), "white", { w: "detail", parent: st }); DS.shape(S, `M758 500 L790 440 L808 466 L820 450 L834 500 Z`, "sky", { w: "hair", parent: st }); DS.shape(S, `M782 452 L790 440 L798 452 Z`, "white", { w: "hair", parent: st });
  txt(S, "FROM: COLORADO", 560, 680, { size: DS.type.small, t: W(80, 3) });
  const lg = S.grp(); paperR(S, 980, 180, 640, 700, { parent: lg }); lines(S, 1030, 260, 540, 4, S.start, 44, lg, DS.c("blue", 2)); thermostat(S, 1300, 560, 0.7, { parent: lg, temp: "22°" }); fadeG(S, lg, W(80, 4));
  card(S, "CONTROLLED NOTHING", 1300, 820, { t: W(80, 10), tc: "red", size: DS.type.caption });
  DS.vignette(S); }

// People felt better, he said, / and service calls fell by over seventy-five percent.
{ const S = sc(81, 0, { cam: "push", focus: "960 540" }); DS.room(S, OFFICE); officeSet(S, { desks: false });
  thermostat(S, 300, 420, 0.6, { temp: "22°" });
  [[340, 0], [580, 1], [820, 4]].forEach(([x, i]) => { const P = person(S, x, 960, "near", i, { look: 4, mood: "flat" }); P.face(W(81, 1) + i * 0.1, "happy", 4); });
  panel(S, 1400, 520, 640, 640);
  txt(S, "SERVICE CALLS", 1400, 270, { size: DS.type.small });
  const g = S.grp(); DS.shape(S, rect(1300, 400, 200, 400), "red", { parent: g });
  const top = S.grp(); DS.shape(S, rect(1300, 400, 200, 300), "white", { flat: true, w: "hair", parent: top }); S.draw(rect(1300, 400, 200, 300), S.start, 0, { c: DS.c("gray", 1), w: DS.w.detail, parent: top }); fadeG(S, top, W(82, 3), 0.6);
  S.draw(line([1260, 800], [1540, 800], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.mid });
  txt(S, "OVER 75% FEWER", 1400, 370, { size: DS.type.small, c: DS.c("red", 2), t: W(82, 5) });
  DS.vignette(S); }

// The fake thermostat fixed the complaints. / It just never touched the temperature.
{ const S = sc(83, 0, { cam: "push", focus: "800 520" }); DS.room(S, ROOM);
  scoreboard(S, 160, 150, { cells: { r0: [["tick"], ["x"], ["lotto"]], r1: [["tick"], ["x"], ["fire"]], r2: [["tick"], ["note:FIXED|COMPLAINTS", W(83, 3)], ["x", W(84, 2)]] } });
  const F = dave(S, 1500, 960, "near", { look: -6, mood: "smile" });
  F.face(W(84, 2), "worried", -6);
  card(S, "NEVER TOUCHED THE TEMPERATURE", 960, 870, { t: W(84, 2), tc: "red", size: DS.type.caption });
  DS.vignette(S); }

// Which raises a strange question. / If the room didn't change, why did the people in it feel better?
{ const S = sc(85, 0, { cam: "push", focus: "960 520" }); DS.room(S, OFFICE); officeSet(S, { desks: false });
  thermometer(S, 1600, 420, 360);
  txt(S, "SAME TEMPERATURE", 1600, 680, { size: DS.type.caption, t: W(86, 4) });
  [[380, 0], [660, 1], [940, 4], [1220, 2]].forEach(([x, i]) => { const P = person(S, x, 960, "near", i, { look: 0, mood: "happy" }); });
  card(S, "WHY DID THEY FEEL BETTER?", 860, 150, { t: W(86, 5), tc: "red" });
  DS.vignette(S); }

// ===================== 5. The lottery ticket =====================
const TEAMS = ["red", "blue", "green", "orange", "purple"];
const fan = (S, cx, cy, k, o = {}) => { const g = S.grp(o.parent); TEAMS.forEach((n, i) => { const tg = S.grp(g); ticket(S, cx + (i - 2) * 150 * k, cy + Math.abs(i - 2) * 18 * k, k, n, { parent: tg }); tg.setAttribute("transform", `rotate(${(i - 2) * 9} ${cx + (i - 2) * 150 * k} ${cy + 200 * k})`); }); return fadeG(S, g, o.t); };
// lottery drum: a cage on a stand with tickets inside; spins
const drum = (S, cx, cy, r, o = {}) => {
  const g = S.grp(o.parent); DS.shadow(S, cx, cy + r + 150, r * 2.2, { parent: g });
  S.draw(line([cx - r * 0.7, cy + r + 150], [cx, cy], 0) + line([cx + r * 0.7, cy + r + 150], [cx, cy], 0), S.start, 0, { c: DS.c("wood", 2), w: DS.w.near, parent: g });
  const cage = S.grp(g); DS.shape(S, poly(Array.from({ length: 6 }, (_, i) => [cx + Math.cos((i * Math.PI) / 3) * r, cy + Math.sin((i * Math.PI) / 3) * r]), 0) + " Z", "gold", { tone: 1, w: "mid", parent: cage });
  [0, 1, 2].forEach((i) => S.draw(line([cx + Math.cos((i * Math.PI) / 3) * r, cy + Math.sin((i * Math.PI) / 3) * r], [cx - Math.cos((i * Math.PI) / 3) * r, cy - Math.sin((i * Math.PI) / 3) * r], 0), S.start, 0, { c: DS.c("gold", 2), w: DS.w.detail, parent: cage }));
  TEAMS.forEach((n, i) => DS.shape(S, rect(cx - 60 + i * 26, cy - 20 + (i % 2) * 30, 36, 50), n, { tone: 1, w: "hair", parent: cage }));
  if (o.spin !== undefined) spin(cage, o.spin, o.dur || 3, 0, 360, cx, cy, "power1.inOut");
  S.draw(line([cx, cy], [cx + r + 60, cy + 30], 0), S.start, 0, { c: DS.c("gray", 2), w: DS.w.near, parent: g });
  return g;
};
const die = (S, cx, cy, s, o = {}) => { const g = S.grp(o.parent); DS.shape(S, rrect(cx - s / 2, cy - s / 2, s, s, DS.r.lg), "white", { w: "near", parent: g }); [[-0.25, -0.25], [0.25, 0.25], [0, 0], [-0.25, 0.25], [0.25, -0.25]].forEach(([a, b]) => DS.shape(S, circ(cx + a * s, cy + b * s, s * 0.07), "red", { w: "hair", parent: g })); return g; };
const steering = (S, cx, cy, r, o = {}) => { const g = S.grp(o.parent); S.draw(circ(cx, cy, r), S.start, 0, { c: DS.c("ink"), w: DS.w.near * 2.2, parent: g }); S.draw(line([cx - r, cy], [cx + r, cy], 0) + line([cx, cy], [cx, cy + r], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.near * 1.4, parent: g }); DS.shape(S, circ(cx, cy, r * 0.22), "gray", { tone: 2, w: "mid", parent: g }); return g; };
const gauge = (S, cx, cy, r, val, label, o = {}) => {
  const g = S.grp(o.parent); DS.shape(S, `M${cx - r} ${cy} A${r} ${r} 0 0 1 ${cx + r} ${cy} Z`, "white", { w: "mid", parent: g });
  [["red", 180, 240], ["yellow", 240, 300], ["green", 300, 360]].forEach(([n, a0, a1]) => S.draw(arc(cx, cy, r * 0.8, a0, a1), S.start, 0, { c: DS.c(n), w: DS.w.near * 2, parent: g }));
  const nd = S.grp(g); S.draw(line([cx, cy], [cx, cy - r * 0.85], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.near, parent: nd });
  nd.setAttribute("transform", `rotate(-70 ${cx} ${cy})`); if (o.go !== undefined) spin(nd, o.go, 1.0, -70, val, cx, cy, "back.out(1.6)"); else nd.setAttribute("transform", `rotate(${val} ${cx} ${cy})`);
  DS.shape(S, circ(cx, cy, 16), "ink", { w: "hair", parent: g });
  txt(S, label, cx, cy + 70, { size: DS.type.small, parent: g });
  return fadeG(S, g, o.t);
};
const folder = (S, cx, cy, wd, ht, label, o = {}) => { const g = S.grp(o.parent); DS.drop(S, rrect(cx - wd / 2 + 8, cy - ht / 2 + 10, wd, ht, DS.r.sm), { parent: g }); DS.shape(S, rrect(cx - wd / 2, cy - ht / 2 - 40, wd * 0.36, 60, DS.r.sm), "gold", { tone: 2, parent: g }); DS.shape(S, rrect(cx - wd / 2, cy - ht / 2, wd, ht, DS.r.sm), "gold", { parent: g }); if (label) DS.card(S, label, cx, cy - ht / 2 + 90, { size: DS.type.small, t: T0(S), parent: g }); return fadeG(S, g, o.t); };
const heartP = (S, cx, cy, k, t) => { const g = S.grp(); S.draw(heartPath(cx, cy, k), S.start, 0, { fill: DS.c("red", 1), c: DS.c("red", 2), w: DS.w.mid, parent: g }); return fadeG(S, g, t, 0.25); };

// In nineteen seventy-five, psychologist Ellen Langer sold one-dollar lottery tickets to office workers.
{ const S = sc(87, 0, { cam: "push", focus: "860 560" }); DS.room(S, OFFICE); officeSet(S, { desks: false });
  const L = who(S, 560, 960, "near", Object.assign({}, LANGER, { look: 6, mood: "smile", pose: "hold", t: W(87, 4) }));
  card(S, "ELLEN LANGER", 560, 430, { t: W(87, 4), size: DS.type.caption });
  txt(S, "PSYCHOLOGIST", 560, 496, { t: W(87, 4) });
  deskF(S, 760, 1180, 760);
  fan(S, 970, 600, 0.42, { t: W(87, 7) });
  card(S, "$1 TICKETS", 970, 380, { t: W(87, 7), size: DS.type.caption });
  [1360, 1620].forEach((x, i) => person(S, x, 960, "near", i + 4, { look: -6, mood: "flat", t: W(87, 11) + i * 0.15 }));
  card(S, "1975", 1490, 200, { t: W(87, 1), size: DS.type.title });
  DS.vignette(S); }

// Each ticket was a card with a football player on it. / Some people picked their own card, and others were simply handed one.
{ const S = sc(88, 0, { cam: "push", focus: "960 460" }); DS.room(S, OFFICE);
  fan(S, 960, 330, 0.85);
  const A = person(S, 330, 960, "near", 2, { look: 6, mood: "smile", t: W(89, 0) });
  A.setPose(W(89, 2), "point");
  card(S, "PICKED", 330, 470, { t: W(89, 2), tc: "green" });
  const L = who(S, 1300, 960, "near", Object.assign({}, LANGER, { look: 6, mood: "smile", pose: "reach", t: W(89, 6) }));
  const B = person(S, 1640, 960, "near", 5, { look: -6, mood: "flat", t: W(89, 6) });
  const [hx, hy] = L.hand("R", "reach"); ticket(S, hx + 40, hy - 40, 0.36, "purple", { fadeT: W(89, 10) });
  card(S, "HANDED", 1640, 470, { t: W(89, 10), tc: "purple" });
  DS.vignette(S); }

// Just before the draw, she asked what price they'd sell their ticket back for.
{ const S = sc(90, 0, { cam: "push", focus: "960 540" }); DS.room(S, OFFICE);
  drum(S, 380, 520, 170, { spin: S.start, dur: S.len });
  card(S, "THE DRAW", 380, 230, { t: W(90, 2), size: DS.type.caption });
  const L = who(S, 900, 960, "near", Object.assign({}, LANGER, { look: 6, mood: "smile" }));
  say(S, 1180, 300, 330, 130, 960, 560, ["SELL IT BACK?", "HOW MUCH?"], W(90, 4));
  const P = person(S, 1500, 960, "near", 2, { look: -6, mood: "flat", pose: "hold" });
  const [hx, hy] = P.hand("R", "hold"); ticket(S, hx - 10, hy - 60, 0.36, "green");
  priceTag(S, 1620, 560, "$?", { t: W(90, 7) });
  DS.vignette(S); }

// Handed a ticket? About two dollars. / Picked it yourself? Almost nine.
{ const S = sc(91, 0, { cam: "push", focus: "960 560" }); DS.room(S, LAB2);
  panel(S, 960, 540, 1100, 700);
  const base = 800;
  [[700, 1.96, "HANDED", 91, "purple"], [1220, 8.67, "PICKED", 92, "green"]].forEach(([x, v, s, c, n]) => {
    const t = W(c, 0), g = S.grp(); DS.shape(S, rect(x - 110, base - v * 56, 220, v * 56), n, { parent: g }); fadeG(S, g, t, 0.1); scaleY(g, t, x, base, 0.8);
    countUp(S, x, base - v * 56 - 30, 0, v, t + 0.1, 0.8, { size: DS.type.title, fmt: (q) => "$" + q.toFixed(2), t0: t, c: DS.c(n, 2) });
    txt(S, s, x, base + 60, { size: DS.type.small, t });
  });
  S.draw(line([560, base], [1360, base], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.mid });
  card(S, "SELL-BACK PRICE", 960, 130, { t: W(91, 0) });
  DS.vignette(S); }

// Same odds. Same dollar. The only difference was the feeling of having chosen.
{ const S = sc(93, 0, { cam: "push", focus: "960 500" }); DS.room(S, ROOM);
  ticket(S, 660, 500, 1.15, "purple"); ticket(S, 1260, 500, 1.15, "green");
  txt(S, "=", 960, 540, { size: DS.type.display, t: W(93, 0) });
  card(S, "SAME ODDS", 660, 830, { t: W(93, 0), size: DS.type.caption }); card(S, "SAME $1", 1260, 830, { t: W(93, 2), size: DS.type.caption });
  heartP(S, 1260, 210, 1.6, W(93, 9));
  card(S, "THE FEELING OF CHOOSING", 960, 110, { t: W(93, 9), tc: "red", size: DS.type.caption });
  DS.vignette(S); }

// Langer called it the illusion of control, / acting as if you can steer something that's pure chance.
{ const S = sc(94, 0, { cam: "push", focus: "960 540" }); DS.room(S, ROOM);
  const P = person(S, 520, 960, "near", 1, { look: 6, mood: "determined", pose: "hold" });
  const [hx, hy] = P.hand("R", "hold"); const sw = steering(S, hx + 20, hy + 30, 86); spin(sw, W(95, 4), 1.8, -30, 40, hx + 20, hy + 30, "sine.inOut");
  const dg = S.grp(); die(S, 1350, 560, 260, { parent: dg }); spin(dg, S.start, S.len, 0, 300, 1350, 560, "power1.out");
  DS.shadow(S, 1350, 900, 320);
  card(S, "THE ILLUSION OF CONTROL", 960, 140, { t: W(94, 3), size: DS.type.body, tc: "purple" });
  txt(S, "PURE CHANCE", 1350, 860, { size: DS.type.small, t: W(95, 8) });
  DS.vignette(S); }

// Dave's walk button was the same thing, / a lottery ticket he chose eleven times in a row.
{ const S = sc(96, 0, { cam: "push", focus: "960 480" }); DS.room(S, ROOM);
  walkBox(S, 560, 520, 0.7);
  txt(S, "=", 960, 470, { size: DS.type.display, t: W(96, 3) });
  ticket(S, 1360, 440, 1.0, "blue", { fadeT: W(96, 5) });
  for (let i = 0; i < 11; i++) ticket(S, 300 + i * 132, 830, 0.36, TEAMS[i % 5], { fadeT: W(97, 4) + i * 0.09 });
  card(S, "× 11 IN A ROW", 1360, 160, { t: W(97, 5), tc: "red" });
  DS.vignette(S); }

// So that settles it, right? Well, not quite.
{ const S = sc(98, 0, { cam: "push", focus: "960 520" }); DS.room(S, ROOM);
  folder(S, 960, 560, 760, 560, "ILLUSION OF CONTROL");
  stamp(S, 960, 600, "CASE CLOSED", W(98, 2), "green", { size: DS.type.body });
  stamp(S, 1080, 760, "NOT QUITE", W(98, 6), "red", { size: DS.type.body, rot: 5 });
  DS.vignette(S); }

// In twenty twenty-one, a team at Wharton ran seventeen experiments with more than ten thousand people.
{ const S = sc(99, 0, { cam: "push", focus: "960 540" }); DS.room(S, LAB2);
  [[260, 2, "curly"], [480, 1, "bun"], [700, 0, "short"]].forEach(([x, i, h], j) => person(S, x, 960, "near", i, { hair: h, look: 6, mood: "flat", t: W(99, 4) + j * 0.12, specs: j === 1 }));
  txt(S, "KLUSOWSKI, SMALL & SIMMONS", 480, 506, { t: W(99, 4) });
  card(S, "WHARTON, 2021", 480, 440, { t: W(99, 1), size: DS.type.caption });
  for (let i = 0; i < 17; i++) { const g = S.grp(); DS.shape(S, rrect(1000, 760 - i * 26, 260, 24, DS.r.xs), i % 2 ? "gold" : "sand", { w: "detail", parent: g }); fadeG(S, g, W(99, 8) + i * 0.05, 0.15); }
  countUp(S, 1130, 260, 0, 17, W(99, 8), 0.85, { size: DS.type.title, fmt: (n) => Math.round(n) + " EXPERIMENTS", ease: "none" });
  countUp(S, 1560, 560, 0, 10825, W(99, 11), 1.0, { size: DS.type.title, c: DS.c("blue", 2) });
  txt(S, "PEOPLE", 1560, 640, { size: DS.type.small, t: W(99, 15) });
  for (let i = 0; i < 12; i++) mini(S, 1380 + (i % 6) * 70, 780 + Math.floor(i / 6) * 90, 0.9, { t: W(99, 12) + i * 0.06, fill: DS.c(OC[i % 8], 1) });
  DS.vignette(S); }

// Choosing your own ticket mostly didn't make people feel any luckier.
{ const S = sc(100, 0, { cam: "push", focus: "960 520" }); DS.room(S, ROOM);
  gauge(S, 600, 600, 230, 10, "PICKED", { go: W(100, 2) });
  gauge(S, 1320, 600, 230, 10, "HANDED", { go: W(100, 2) + 0.2 });
  card(S, "LUCK-O-METER", 960, 150, { size: DS.type.caption });
  card(S, "NO LUCKIER", 960, 830, { t: W(100, 8), tc: "red" });
  DS.vignette(S); }

// One explanation they offer: / Langer's choosers may simply have liked their football player.
{ const S = sc(101, 0, { cam: "push", focus: "900 520" }); DS.room(S, ROOM);
  const P = person(S, 820, 960, "near", 2, { look: 4, mood: "happy", pose: "hold", outfitC: DS.c("orange") });
  const [hx, hy] = P.hand("R", "hold"); ticket(S, hx - 10, hy + 20, 0.5, "orange");
  [[1180, 330, 1.2], [1300, 460, 0.8], [520, 360, 0.9]].forEach(([x, y, k], i) => heartP(S, x, y, k, W(102, 5) + i * 0.15));
  card(S, "THEY LIKED THEIR PLAYER", 960, 140, { t: W(102, 5), tc: "red", size: DS.type.caption });
  card(S, "ONE EXPLANATION", 1450, 700, { t: W(101, 0), size: DS.type.caption });
  DS.vignette(S); }

// So the illusion of control might be partly an illusion. Fair.
{ const S = sc(103, 0, { cam: "push", focus: "960 480" }); DS.room(S, ROOM);
  card(S, "THE ILLUSION OF CONTROL", 960, 500, { size: DS.type.title, tc: "purple" });
  txt(S, "PARTLY AN ILLUSION?", 960, 660, { size: DS.type.small, t: W(103, 7), c: DS.c("red", 2) });
  const F = dave(S, 1620, 960, "near", { look: -6, mood: "flat" });
  F.setPose(W(103, 10), "shrug");
  stamp(S, 600, 800, "FAIR.", W(103, 10), "green", { size: DS.type.body });
  DS.vignette(S); }

// Maybe fake buttons don't even fool us. / Maybe Dave is just a man who enjoys pressing plastic.
const arcade = (S, cx, top, o = {}) => { const g = S.grp(o.parent); DS.shadow(S, cx, top + 120, 260, { parent: g }); DS.shape(S, rrect(cx - 120, top, 240, 120, DS.r.sm), "navy", { tone: 1, parent: g }); DS.shape(S, rrect(cx - 70, top - 12, 140, 18, DS.r.xs), "gray", { tone: 2, w: "detail", parent: g }); const B = { cx, cy: top - 30, r: 50, g, cap: S.grp(g) }; DS.shape(S, `M${cx - 58} ${top - 10} V${top - 30} Q${cx} ${top - 84} ${cx + 58} ${top - 30} V${top - 10} Z`, "red", { w: "mid", parent: B.cap }); S.fill(circ(cx - 22, top - 48, 14, 8), S.start, 0, DS.P.white[0], 0.6, B.cap); return B; };
{ const S = sc(104, 0, { cam: "push", focus: "960 600" }); DS.room(S, ROOM);
  deskF(S, 900, 1340, 790, 960, "wood");
  const B = arcade(S, 1120, 670);
  const F = dave(S, 1120 - 169, 960, "near", { look: 6, mood: "flat", armR: ARM.upNear });
  card(S, "FOOLED?", 600, 300, { t: W(104, 4), size: DS.type.body });
  xMark(S, 840, 300, 0.8, W(104, 5));
  jabArm(S, F, W(105, 7), 5, 0.38, "up"); jab(S, B, W(105, 7) + 0.12, 5, 0.38);
  F.face(W(105, 7), "happy", 6);
  card(S, "ENJOYS PRESSING PLASTIC", 1220, 160, { t: W(105, 7), tc: "green" });
  DS.vignette(S); }

// ===================== 6. The noise button =====================
// a volunteer seated in the lab chair (chair faces right; the button is on the right arm)
const VOL = { s: 1.1, hair: "curly", hairC: DS.c("ink", 1), outfitC: DS.c("green") };
const chairVol = (S, x, o = {}) => { const B = labChair(S, x, 960, { btn: o.btn }); const F = who(S, x - 20, 960 - 150, "near", Object.assign({}, VOL, { sit: true, pose: "hold", look: 6, mood: o.mood || "flat", float: true })); return { B, F }; };
const wobbleR = (S, g, cx, cy, t, dur) => { for (let i = 0, n = Math.floor(dur / 0.9); i < n; i++) spin(g, t + i * 0.9, 0.9, i % 2 ? 3 : -3, i % 2 ? -3 : 3, cx, cy, "sine.inOut"); };
const burstsAt = (S, cx, cy, r, ts, parent) => ts.forEach((t) => noiseLines(S, cx, cy, r, t, 3, parent));
const BURST = (S) => [0.3, 1.0, 1.4, 2.5, 3.1, 4.4, 5.0, 6.2, 6.6].map((d) => S.start + d).filter((t) => t < S.end - 0.3);
const puzzleSheet = (S, x, y, wd, ht, o = {}) => { const g = S.grp(o.parent); paperR(S, x, y, wd, ht, { parent: g }); S.draw(smooth([[x + 60, y + ht - 80], [x + 120, y + 120], [x + wd * 0.5, y + ht * 0.6], [x + wd - 100, y + 100], [x + wd - 60, y + ht - 120], [x + wd * 0.3, y + ht * 0.4]]) + " Z", S.start, 0, { c: DS.c("blue", 2), w: DS.w.mid, parent: g }); [[x + 60, y + ht - 80], [x + wd - 60, y + ht - 120]].forEach(([a, b]) => DS.shape(S, circ(a, b, 12), "red", { w: "hair", parent: g })); return fadeG(S, g, o.t); };
const proofPage = (S, x, y, wd, ht, o = {}) => { const g = S.grp(o.parent); paperR(S, x, y, wd, ht, { parent: g }); lines(S, x + 40, y + 60, wd - 80, Math.floor((ht - 90) / 44), S.start, 44, g, DS.c("ink", 1)); return fadeG(S, g, o.t); };
const meter = (S, cx, cy, o = {}) => { const g = S.grp(o.parent); DS.shape(S, rrect(cx - 140, cy - 110, 280, 220, DS.r.sm), "ink", { tone: 1, parent: g }); DS.shape(S, `M${cx - 110} ${cy + 40} A110 110 0 0 1 ${cx + 110} ${cy + 40} Z`, "white", { w: "detail", parent: g }); S.draw(arc(cx, cy + 40, 90, 290, 350), S.start, 0, { c: DS.c("red"), w: DS.w.near * 1.6, parent: g }); const nd = S.grp(g); S.draw(line([cx, cy + 40], [cx, cy - 50], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.mid, parent: nd }); nd.setAttribute("transform", `rotate(-60 ${cx} ${cy + 40})`); (o.kicks || []).filter((t, i, A) => i === 0 || t - A[i - 1] > 0.75).forEach((t) => { spin(nd, t, 0.12, -60, 52, cx, cy + 40, "power2.out"); spin(nd, t + 0.3, 0.4, 52, -60, cx, cy + 40, "power1.in"); }); return fadeG(S, g, o.t); };

// But around nineteen seventy, psychologists David Glass and Jerome Singer tested a different kind of button.
{ const S = sc(106, 0, { cam: "push", focus: "960 560" }); DS.room(S, LAB);
  DS.frame(S, 820, 200, 220, 160, "earth");
  who(S, 360, 960, "near", Object.assign({}, GLASS, { look: 6, mood: "flat", t: W(106, 5) }));
  who(S, 720, 960, "near", Object.assign({}, SINGER, { look: 6, mood: "flat", t: W(106, 8) }));
  card(S, "DAVID GLASS", 360, 470, { t: W(106, 5), size: DS.type.caption });
  card(S, "JEROME SINGER", 760, 400, { t: W(106, 8), size: DS.type.caption });
  card(S, "AROUND 1970", 1380, 180, { t: W(106, 2), size: DS.type.body });
  const g = S.grp(); const B = labChair(S, 1400, 960, { parent: g }); fadeG(S, g, W(106, 12));
  S.draw(circ(B.cx, B.cy - 10, 80), W(106, 14), 0, { c: DS.c("red"), w: DS.w.near });
  DS.vignette(S); }

// First, they recorded a terrible soundtrack. / Two people speaking Spanish, one speaking Armenian,
{ const S = sc(107, 0, { cam: "push", focus: "960 560" }); DS.room(S, LAB);
  deskF(S, 200, 900, 760);
  reel(S, 550, 600, 1.0, { spin: S.start, dur: S.len });
  card(S, "A TERRIBLE SOUNDTRACK", 960, 130, { t: W(107, 3), tc: "red" });
  [[1130, 0, "SPANISH", 108, 2], [1390, 4, "SPANISH", 108, 2], [1650, 1, "ARMENIAN", 108, 4]].forEach(([x, i, s, c, w], j) => {
    const t = W(c, w) + j * 0.25;
    person(S, x, 900, "mid", i, { look: -6, mood: "wow", t });
    const g = S.grp(); S.speech(x, 430, 110, 64, x - 20, 520, S.start, 0.3, { parent: g }); S.draw(`M${x - 60} 430 q20 -24 40 0 t40 0 t40 0`, S.start, 0, { c: DS.c("ink"), w: DS.w.mid, parent: g }); fadeG(S, g, t);
    txt(S, s, x, 340, { t, size: DS.type.caption });
  });
  DS.vignette(S); }

// a mimeograph copier, a calculator and a typewriter, all at once.
{ const S = sc(109, 0, { cam: "push", focus: "960 600" }); DS.room(S, LAB);
  deskF(S, 160, 1760, 760);
  mimeo(S, 460, 760, 1.0, { t: W(109, 1), spin: W(109, 1), dur: 3 });
  calculator(S, 960, 760, 1.0, { t: W(109, 4) });
  typewriter(S, 1460, 760, 1.0, { t: W(109, 7) });
  ["MIMEOGRAPH", "CALCULATOR", "TYPEWRITER"].forEach((s, i) => txt(S, s, [460, 960, 1460][i], 380, { size: DS.type.small, t: W(109, [1, 4, 7][i]) }));
  [460, 960, 1460].forEach((x) => burstsAt(S, x, 600, 200, [W(109, 8), W(109, 8) + 0.9, W(109, 8) + 1.6]));
  card(S, "ALL AT ONCE", 960, 160, { t: W(109, 8), tc: "red", size: DS.type.body });
  DS.vignette(S); }

// They played it in random bursts at about a hundred and eight decibels, / while volunteers tried to work through tasks.
{ const S = sc(110, 0, { cam: "push", focus: "960 560" }); DS.room(S, LAB);
  speaker(S, 330, 640, 1.0);
  const ts = BURST(S); burstsAt(S, 330, 690, 150, ts);
  meter(S, 760, 300, { kicks: ts });
  countUp(S, 760, 500, 0, 108, W(110, 7), 1.2, { size: DS.type.title, fmt: (n) => Math.round(n) + " dB" });
  card(S, "RANDOM BURSTS", 760, 600, { t: W(110, 4), size: DS.type.caption });
  deskF(S, 1100, 1700, 760);
  const P = seated(S, 1400, 760, "near", Object.assign({}, VOL, { look: -4, mood: "worried", t: W(111, 1) }));
  paperR(S, 1300, 700, 200, 70, { t: W(111, 4) });
  ts.forEach((t) => { if (t > W(111, 1)) P.face(t, "worried", -4); });
  DS.vignette(S); }

// Some volunteers got a button on the side of their chair, and an instruction.
{ const S = sc(112, 0, { cam: "zoom", focus: "900 560" }); DS.room(S, LAB);
  const { B, F } = chairVol(S, 800);
  S.draw(circ(B.cx, B.cy - 10, 90), W(112, 4), 0, { c: DS.c("red"), w: DS.w.near });
  card(S, "A BUTTON", 1300, 400, { t: W(112, 4), tc: "red" }); arrowR(S, 1170, 420, B.cx + 90, B.cy - 10, W(112, 4) + 0.1, { c: "red" });
  card(S, "+ AN INSTRUCTION", 1300, 560, { t: W(112, 12), size: DS.type.caption });
  DS.vignette(S); }

// "You can terminate the noise by pressing the button. But we'd prefer you not do it."
{ const S = sc(113, 0, { cam: "push", focus: "960 500" }); DS.room(S, LAB);
  const { B, F } = chairVol(S, 520);
  const E = who(S, 1560, 960, "near", Object.assign({}, LABCOAT, { look: -6, mood: "smile" }));
  { const g = S.grp(); S.speech(1060, 330, 580, 220, 1480, 590, S.start, 0.3, { parent: g }); fadeG(S, g, W(113, 0), 0.3);
    [["“You can terminate the noise", 0, "ink"], ["by pressing the button.", 0, "ink"], ["But we'd prefer", 9, "red"], ["you not do it.”", 9, "red"]].forEach(([s, w, n], i) => txt(S, s, 1060, 250 + i * 64, { size: DS.type.small, t: W(113, w), c: DS.c(n, n === "red" ? 2 : 0), parent: g })); }
  F.face(W(113, 11), "worried", 6);
  DS.vignette(S); }

// Almost nobody pressed it. / They heard the same noise, just as loud, for just as long.
{ const S = sc(114, 0, { cam: "push", focus: "700 560" }); DS.room(S, LAB);
  const { B, F } = chairVol(S, 520, { mood: "worried" });
  S.draw(`M${B.cx - 40} ${B.cy - 30} q40 -40 80 0 M${B.cx - 30} ${B.cy - 30} l60 -30 M${B.cx + 30} ${B.cy - 30} l-60 -30`, W(114, 2), 0, { c: DS.c("gray", 1), w: DS.w.hair });
  card(S, "ALMOST NOBODY PRESSED IT", 760, 140, { t: W(114, 0), tc: "red", size: DS.type.caption });
  panel(S, 1380, 560, 700, 560);
  [["BUTTON", 420], ["NO BUTTON", 640]].forEach(([s, y]) => { txt(S, s, 1080, y + 14, { size: DS.type.caption, anchor: "start", t: W(115, 1) }); [0, 1, 2, 3, 4].forEach((i) => { const g = S.grp(); DS.shape(S, rrect(1330 + i * 70, y - [40, 70, 30, 60, 50][i], 44, [80, 140, 60, 120, 100][i], DS.r.xs), "red", { w: "detail", parent: g }); fadeG(S, g, W(115, 3) + i * 0.1, 0.2); }); });
  txt(S, "SAME NOISE, SAME LENGTH", 1380, 800, { size: DS.type.caption, t: W(115, 7) });
  DS.vignette(S); }

// Afterwards, everyone got puzzles, some of them secretly impossible, / and pages of text full of errors to find.
{ const S = sc(116, 0, { cam: "push", focus: "960 500" }); DS.room(S, LAB);
  puzzleSheet(S, 220, 180, 640, 600, { t: W(116, 2) });
  txt(S, "PUZZLES", 540, 860, { size: DS.type.small, t: W(116, 2) });
  stamp(S, 540, 480, "IMPOSSIBLE", W(116, 7), "red");
  proofPage(S, 1060, 180, 640, 600, { t: W(117, 1) });
  [[1200, 280], [1500, 412], [1300, 544], [1560, 632]].forEach(([x, y], i) => S.draw(circ(x, y - 10, 46, 30), W(117, 6) + i * 0.15, 0, { c: DS.c("red"), w: DS.w.mid }));
  txt(S, "FIND THE ERRORS", 1380, 860, { size: DS.type.small, t: W(117, 1) });
  DS.vignette(S); }

// The people with no button gave up on the puzzles sooner, and missed more of the errors.
const tries = (S, bars, t) => { panel(S, 1380, 540, 700, 620); txt(S, "PUZZLE TRIES", 1380, 300, { size: DS.type.small }); S.draw(line([1100, 760], [1660, 760], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.mid });
  bars.forEach(([s, h, n, tt], i) => { const x = 1170 + i * 210, g = S.grp(), L2 = s.split("|"); DS.shape(S, rect(x - 70, 760 - h, 140, h), n, { parent: g }); fadeG(S, g, tt, 0.1); if (tt !== undefined) scaleY(g, tt, x, 760, 0.7); L2.forEach((q, j) => txt(S, q, x, 806 + j * 40, { t: tt })); }); };
{ const S = sc(118, 0, { cam: "push", focus: "800 560" }); DS.room(S, LAB);
  deskF(S, 160, 860, 760);
  const P = seated(S, 510, 760, "near", Object.assign({}, VOL, { look: 4, mood: "sad", outfitC: DS.c("orange") }));
  P.slump(W(118, 5), 0.5, 8);
  const pg = S.grp(); puzzleSheet(S, 600, 640, 200, 110, { parent: pg }); spin(pg, W(118, 5), 0.6, 0, 18, 700, 700);
  card(S, "NO BUTTON", 510, 330, { t: W(118, 1), size: DS.type.caption });
  tries(S, [["NO|BUTTON", 160, "orange", W(118, 5)]]);
  txt(S, "MISSED MORE ERRORS", 1380, 905, { size: DS.type.caption, c: DS.c("red", 2), t: W(118, 12) });
  DS.vignette(S); }

// The people with a button they never used kept going, / and did about as well as people who could really switch the noise off.
{ const S = sc(119, 0, { cam: "push", focus: "960 560" }); DS.room(S, LAB);
  const { B, F } = chairVol(S, 480, { mood: "determined" });
  card(S, "BUTTON, NEVER USED", 520, 300, { t: W(119, 1), size: DS.type.caption, tc: "green" });
  tries(S, [["NO|BUTTON", 160, "orange"], ["UNUSED|BUTTON", 380, "green", W(119, 8)], ["REAL|SWITCH", 400, "blue", W(120, 9)]]);
  card(S, "ABOUT AS WELL", 1380, 172, { t: W(120, 2), tc: "green", size: DS.type.caption });
  DS.vignette(S); }

// The button didn't change the noise. / It changed what the noise did to them.
{ const S = sc(121, 0, { cam: "push", focus: "960 540" }); DS.room(S, LAB);
  speaker(S, 300, 640, 1.0);
  burstsAt(S, 300, 690, 150, BURST(S));
  card(S, "SAME NOISE", 300, 330, { t: W(121, 1), size: DS.type.caption });
  const { B, F } = chairVol(S, 1250, { mood: "worried" });
  F.face(W(122, 1), "determined", -4);
  arrowR(S, 520, 600, 1050, 560, W(122, 1), { c: "red", bend: -0.12 });
  card(S, "IT CHANGED WHAT THE NOISE DID", 960, 130, { t: W(122, 1), tc: "green" });
  DS.vignette(S); }

// These are lab studies from more than fifty years ago, so hold them loosely, / but they do explain Colorado.
{ const S = sc(123, 0, { cam: "push", focus: "960 520" }); DS.room(S, ROOM);
  const rg = S.grp(); paperR(S, 300, 220, 560, 640, { parent: rg, name: "sand", tone: 1 }); txt(S, "LAB REPORT", 580, 300, { parent: rg, size: DS.type.small }); txt(S, "1969-1972", 580, 360, { parent: rg }); lines(S, 350, 430, 460, 8, S.start, 44, rg, DS.c("earth", 2));
  wobbleR(S, rg, 580, 220, S.start, S.len);
  const Fg = finger(S, 560, 222, 90, 0.7, { dist: 0 });
  card(S, "50+ YEARS AGO", 1360, 250, { t: W(123, 5), size: DS.type.caption });
  card(S, "HOLD THEM LOOSELY", 580, 920, { t: W(123, 11), size: DS.type.caption });
  const lg = S.grp(); envelope(S, 1360, 520, 520, 330, { parent: lg }); DS.shape(S, `M1520 440 L1552 380 L1570 406 L1582 390 L1596 440 Z`, "sky", { w: "hair", parent: lg }); txt(S, "COLORADO", 1360, 620, { parent: lg, size: DS.type.small }); fadeG(S, lg, W(124, 3)); shift(lg, W(124, 3), 0.5, [120, 0], [0, 0], "power2.out");
  DS.vignette(S); }

// The dummy thermostat didn't cool the room. / It cooled the complaints.
{ const S = sc(125, 0, { cam: "push", focus: "960 520" }); DS.room(S, OFFICE); officeSet(S, { desks: false });
  thermostat(S, 560, 440, 1.1, { temp: "22°", wires: true, ring: false });
  card(S, "ROOM: SAME", 560, 120, { t: W(125, 4), size: DS.type.caption });
  [0, 1, 2, 3].forEach((i) => { slip(S, 1360 + (i % 2) * 40, 330 + i * 120, "red"); slip(S, 1360 + (i % 2) * 40, 330 + i * 120, "blue", { t: W(126, 1) + i * 0.15 }); });
  snowflake(S, 1660, 250, 70, { t: W(126, 1) });
  card(S, "IT COOLED THE COMPLAINTS", 1100, 900, { t: W(126, 1), tc: "blue" });
  DS.vignette(S); }

// ===================== 7. The button you think you have =====================
const gavel = (S, cx, cy, o = {}) => { const g = S.grp(o.parent); DS.shape(S, rrect(cx - 20, cy - 10, 260, 30, DS.r.xs), "wood", { parent: g }); DS.shape(S, rrect(cx - 90, cy - 60, 90, 130, DS.r.sm), "wood", { tone: 2, parent: g }); g.setAttribute("transform", `rotate(-25 ${cx} ${cy})`); return fadeG(S, g, o.t); };
// accessible pedestrian signal: dark box, big push button with a raised arrow, speaker grille. Returns B
const apsBox = (S, cx, cy, k = 1, o = {}) => {
  const g = S.grp(o.parent);
  DS.drop(S, rrect(cx - 130 * k + 6, cy - 210 * k + 10, 260 * k, 420 * k, DS.r.md * k), { parent: g });
  DS.shape(S, rrect(cx - 130 * k, cy - 210 * k, 260 * k, 420 * k, DS.r.md * k), "ink", { tone: 1, w: k >= 0.8 ? "near" : "mid", parent: g });
  for (let i = 0; i < 4; i++) S.draw(line([cx - 60 * k, cy - 160 * k + i * 22 * k], [cx + 60 * k, cy - 160 * k + i * 22 * k], 0), S.start, 0, { c: DS.c("gray", 1), w: DS.w.detail, parent: g });
  DS.shape(S, circ(cx, cy + 40 * k, 92 * k), "gray", { tone: 2, w: "detail", parent: g });
  const B = { cx, cy: cy + 40 * k, r: 76 * k, g, cap: S.grp(g) };
  DS.shape(S, circ(cx, cy + 40 * k, 76 * k), "gray", { tone: 1, w: "mid", parent: B.cap });
  DS.shape(S, `M${cx - 40 * k} ${cy + 52 * k} H${cx + 14 * k} V${cy + 76 * k} L${cx + 50 * k} ${cy + 40 * k} L${cx + 14 * k} ${cy + 4 * k} V${cy + 28 * k} H${cx - 40 * k} Z`, "yellow", { w: "detail", parent: B.cap });
  return B;
};
const soundWaves = (S, cx, cy, t, n = 3, parent) => { const g = S.grp(parent); for (let i = 0; i < n; i++) S.draw(arc(cx, cy, 40 + i * 34, -40, 40), S.start, 0, { c: DS.c("blue"), w: DS.w.mid, parent: g }); return fadeG(S, g, t, 0.25); };
const vibes = (S, B, t) => { const g = S.grp(); [-1, 1].forEach((sd) => S.draw(`M${B.cx + sd * (B.r + 22)} ${B.cy - 30} l${sd * 14} 10 l${-sd * 14} 10 l${sd * 14} 10 l${-sd * 14} 10 l${sd * 14} 10`, S.start, 0, { c: DS.c("orange"), w: DS.w.mid, parent: g })); fadeG(S, g, t, 0.2); return g; };
// everyday buttons that just work
const doorbell = (S, cx, cy, t) => { DS.shape(S, rrect(cx - 50, cy - 80, 100, 160, DS.r.md), "wood", { tone: 1 }); const B = { cx, cy, r: 26, cap: S.grp() }; DS.shape(S, circ(cx, cy, 34), "gold", { w: "detail" }); DS.shape(S, circ(cx, cy, 24), "white", { tone: 2, w: "detail", parent: B.cap }); const n = S.grp(); S.text("DING!", cx + 120, cy - 60, { size: DS.type.caption, c: DS.c("orange", 2), t: T0(S), parent: n }); fadeG(S, n, t + 0.1, 0.2); return B; };
const lightSwitch = (S, cx, cy, t) => { DS.shape(S, rrect(cx - 50, cy - 70, 100, 140, DS.r.sm), "white", { tone: 2 }); const B = { cx, cy, r: 30, cap: S.grp() }; DS.shape(S, rrect(cx - 18, cy - 36, 36, 72, DS.r.xs), "white", { w: "detail", parent: B.cap }); const off = S.grp(), on = S.grp(); DS.shape(S, circ(cx + 120, cy - 70, 34), "gray", { tone: 1, w: "detail", parent: off }); DS.shape(S, circ(cx + 120, cy - 70, 34), "yellow", { w: "detail", parent: on }); S.draw(rays(cx + 120, cy - 70, 46, 64, 8), S.start, 0, { c: DS.c("yellow", 2), w: DS.w.mid, parent: on }); fadeG(S, on, t + 0.1, 0.15); DS.shape(S, rect(cx + 108, cy - 40, 24, 22), "gray", { tone: 2, w: "hair" }); return B; };
const tvRemote = (S, cx, cy, t) => { DS.shape(S, rrect(cx - 40, cy - 110, 80, 220, DS.r.lg), "ink", { tone: 1 }); const B = { cx, cy: cy - 60, r: 18, cap: S.grp() }; DS.shape(S, circ(cx, cy - 60, 18), "red", { w: "detail", parent: B.cap }); for (let i = 0; i < 6; i++) DS.shape(S, circ(cx - 16 + (i % 2) * 32, cy + (Math.floor(i / 2)) * 34, 9), "gray", { tone: 1, w: "hair" }); const sc2 = S.grp(); DS.shape(S, rrect(cx + 80, cy - 140, 150, 100, DS.r.xs), "sky", { tone: 1, w: "detail", parent: sc2 }); fadeG(S, sc2, t + 0.1, 0.2); return B; };

// So why is the world full of buttons that do nothing? / Partly because taking them out costs money.
{ const S = sc(127, 0, { cam: "push", focus: "800 520" }); DS.room(S, ROOM);
  panel(S, 560, 500, 760, 740);
  txt(S, "WHY?", 560, 210, { size: DS.type.title, c: DS.c("red", 2) });
  globe(S, 560, 540, 250);
  [[-150, -110, "red"], [40, -170, "yellow"], [160, -60, "green"], [-60, 0, "orange"], [90, 60, "red"], [-170, 90, "purple"], [10, 160, "yellow"], [190, 130, "pink"], [-100, -190, "green"], [130, -150, "orange"], [-200, -20, "yellow"], [60, -60, "pink"]].forEach(([dx, dy, n]) => btnIcon(S, 560 + dx, 540 + dy, 20, n));
  priceTag(S, 1200, 520, "$1,000,000", { t: W(128, 4) });
  card(S, "TAKING THEM OUT COSTS MONEY", 1390, 300, { t: W(128, 4), size: DS.type.caption });
  DS.vignette(S); }

// And partly because they never stopped working. / They just work on the person, not the machine.
{ const S = sc(129, 0, { cam: "push", focus: "900 470" }); DS.room(S, ROOM);
  scoreboard(S, 120, 150, { ext: W(129, 4), cells: { r0: [["tick"], ["x"], ["lotto"]], r1: [["tick"], ["x"], ["fire"]], r2: [["tick"], ["note:FIXED|COMPLAINTS"], ["x"]] }, dave: { r0: [["q", W(130, 3)]], r1: [["q", W(130, 3) + 0.15]], r2: [["q", W(130, 3) + 0.3]] } });
  const F = dave(S, 1740, 960, "near", { look: -6, mood: "determined", pose: "reachL" });
  F.setPose(W(129, 6), "pointL"); F.face(W(129, 6), "smile", -6);
  txt(S, "ON THE PERSON, NOT THE MACHINE", 860, 880, { size: DS.type.small, t: W(130, 3), c: DS.c("green", 2) });
  DS.vignette(S); }

// That doesn't make every fake button fine. / New York, under a court order from twenty twenty-one,
{ const S = sc(131, 0, { cam: "push", focus: "960 520" }); DS.room(S, LAB2);
  pole(S, 480, 220, 940); walkBox(S, 480, 640, 0.75, { dead: true });
  stamp(S, 480, 880, "NOT FINE", W(131, 4), "red", { size: DS.type.body });
  const dg = S.grp(); paperR(S, 1000, 200, 620, 680, { parent: dg }); txt(S, "COURT ORDER", 1310, 300, { size: DS.type.body, parent: dg }); txt(S, "NEW YORK, 2021", 1310, 370, { parent: dg }); lines(S, 1060, 440, 500, 7, S.start, 44, dg, DS.c("ink", 1)); fadeG(S, dg, W(132, 3));
  gavel(S, 1640, 820, { t: W(132, 4) });
  DS.vignette(S); }

// is putting new buttons at ten thousand crossings by twenty thirty-one.
{ const S = sc(133, 0, { cam: "push", focus: "700 520" }); DS.room(S, LAB2);
  panel(S, 640, 520, 900, 760);
  for (let i = 0; i < 8; i++) { DS.shape(S, rect(220 + i * 110, 160, 26, 720), "gray", { tone: 1, flat: true, w: "hair" }); }
  for (let j = 0; j < 7; j++) DS.shape(S, rect(200, 190 + j * 104, 880, 22), "gray", { tone: 1, flat: true, w: "hair" });
  const P = []; for (let i = 0; i < 8; i++) for (let j = 0; j < 7; j++) P.push([233 + i * 110, 201 + j * 104]);
  P.forEach(([x, y], n) => { const g = S.grp(); DS.shape(S, circ(x, y, 12), "green", { w: "hair", parent: g }); fadeG(S, g, W(133, 2) + ((n * 23) % 56) * 0.04, 0.15); });
  countUp(S, 1450, 460, 0, 10000, W(133, 2), 2.2, { size: DS.type.display, c: DS.c("green", 2) });
  txt(S, "CROSSINGS", 1450, 550, { size: DS.type.small, t: W(133, 7) });
  card(S, "BY 2031", 1450, 700, { t: W(133, 9), size: DS.type.body });
  DS.vignette(S); }

// These ones talk and vibrate, so someone who is blind knows when it's time to walk.
{ const S = sc(134, 0, { cam: "push", focus: "1000 560" }); DS.outdoor(S, DAY); street(S, DAY, { zebra: 1450 });
  pole(S, 1180, 200, 940); const B = apsBox(S, 1180, 640, 0.8); pedSig(S, 1180, 280, 0.9, { walk: W(134, 13) });
  const P = person(S, 1004, 960, "near", 5, { look: 6, mood: "smile", armR: ARM.near, armL: [[-30, 50], [-60, 110]] });
  S.draw(line([P.hand("L")[0], P.hand("L")[1]], [P.hand("L")[0] - 70, 950], 0), S.start, 0, { c: DS.P.white[0], w: DS.w.near * 1.4 }); S.draw(line([P.hand("L")[0] - 58, 900], [P.hand("L")[0] - 70, 950], 0), S.start, 0, { c: DS.c("red"), w: DS.w.near * 1.4 });
  jabArm(S, P, W(134, 1), 1, 0.5, "hold"); jab(S, B, W(134, 1) + 0.12, 1, 0.3, { hold: true });
  soundWaves(S, 1180 + 80, 470, W(134, 2)); vibes(S, B, W(134, 4));
  card(S, "TALKS + VIBRATES", 760, 150, { t: W(134, 2), tc: "blue" });
  DS.vignette(S); }

// A button that tells the truth beats one that only feels good.
{ const S = sc(135, 0, { cam: "push", focus: "960 520" }); DS.room(S, ROOM);
  apsBox(S, 560, 500, 0.8); tick(S, 560, 760, 1.6, W(135, 3));
  txt(S, "TELLS THE TRUTH", 560, 220, { size: DS.type.small, t: W(135, 3), c: DS.c("green", 2) });
  txt(S, ">", 960, 540, { size: DS.type.display, t: W(135, 6) });
  walkBox(S, 1360, 560, 0.8, { sign: false, dead: true });
  heartP(S, 1360, 300, 1.2, W(135, 10));
  txt(S, "ONLY FEELS GOOD", 1360, 220, { size: DS.type.small, t: W(135, 10), c: DS.c("red", 2) });
  DS.vignette(S); }

// The next morning, Dave is back at the crossing, and he knows everything now.
const morning = (S) => { street(S, DAWN, { zebra: 1450 }); pole(S, 1180, 250, 940); pedSig(S, 1180, 330, 0.9); return walkBox(S, 1180, 700, 0.42); };
{ const S = sc(136, 0, { cam: "pull", focus: "1060 600" }); DS.outdoor(S, DAWN); morning(S);
  const F = dave(S, 1000, 960, "near", { look: 6, mood: "flat", t: W(136, 3) });
  F.face(W(136, 11), "smile", 6);
  card(S, "THE NEXT MORNING", 760, 150, { t: W(136, 1) });
  DS.vignette(S); }

// He knows the walk button might be disconnected, / that door-close belongs to the fire department, / and that his thermostat may be wired to nothing.
{ const S = sc(137, 0, { cam: "push", focus: "960 420" }); DS.outdoor(S, DAWN); morning(S);
  const F = dave(S, 1000, 960, "near", { look: 0, mood: "smile" });
  const bub = (cx, cy, t, draw) => { const g = S.grp(); S.thought(cx, cy, 230, 150, 1000, 560, S.start, 0.3, { parent: g }); draw(g); fadeG(S, g, t); };
  bub(380, 300, W(137, 1), (g) => walkBox(S, 380, 280, 0.42, { parent: g, sign: false, cable: "cut", cableLen: 160 }));
  bub(960, 230, W(138, 1), (g) => { doorBtn(S, 900, 230, 60, "close", { parent: g }); const h = S.grp(g); DS.shape(S, `M990 250 Q994 170 1060 168 Q1126 170 1130 250 Z`, "red", { w: "detail", parent: h }); DS.shape(S, `M970 248 H1150 Q1156 262 1136 264 H984 Z`, "red", { tone: 2, w: "detail", parent: h }); });
  bub(1540, 300, W(139, 3), (g) => thermostat(S, 1540, 260, 0.5, { parent: g, wires: true, ring: false }));
  DS.vignette(S); }

// He presses all three anyway.
{ const S = sc(140, 0, { cam: "none" }); DS.room(S, ROOM);
  const X = [350, 960, 1570];
  X.forEach((x) => panel(S, x, 520, 540, 760));
  const clip = (i) => clipTo(S.grp(), rrect(X[i] - 266, 146, 532, 748, DS.r.md));
  { const g = clip(0), B = walkBox(S, X[0] + 40, 620, 0.75, { parent: g }), Fg = finger(S, X[0] + 40 - 50, 620, 0, 0.62, { parent: g }); pressBy(S, Fg, B, W(140, 1), 2, 0.3); }
  { const g = clip(1), P = liftPanel(S, X[1] - 40, 500, 0.9, { parent: g }); const Fg = finger(S, P.close.cx + 40, P.close.cy, 180, 0.62, { parent: g }); pressBy(S, Fg, P.close, W(140, 2), 2, 0.3); }
  { const g = clip(2), T = thermostat(S, X[2], 450, 1.1, { parent: g, temp: "22°", to: ["21°", W(140, 3) + 0.1] }); const Fg = finger(S, T.down.cx + 36, T.down.cy, 180, 0.62, { parent: g }); pressBy(S, Fg, T.down, W(140, 3), 1); }
  stamp(S, 960, 836, "ANYWAY", W(140, 3) + 0.2, "green", { size: DS.type.body });
  DS.vignette(S); }

// Dave updates his scoreboard. Buttons that worked on the machine, maybe one. / Buttons that worked on Dave, all three.
{ const S = sc(141, 0, { cam: "push", focus: "900 470" }); DS.room(S, ROOM);
  scoreboard(S, 120, 150, { ext: true, cells: { r0: [["tick"], ["x"], ["lotto"]], r1: [["tick"], ["x"], ["fire"]], r2: [["tick"], ["note:FIXED|COMPLAINTS"], ["x"]] }, dave: { r0: [["tick", W(142, 4)]], r1: [["tick", W(142, 4) + 0.25]], r2: [["tick", W(142, 4) + 0.5]] } });
  const ng = S.grp(); S.draw(rect(778, 772, 400, 128), S.start, 0, { fill: DS.c("yellow", 1), c: DS.c("yellow", 2), w: DS.w.detail, parent: ng }); txt(S, "ON THE MACHINE:", 978, 822, { parent: ng }); txt(S, "MAYBE 1", 978, 878, { size: DS.type.small, parent: ng }); fadeG(S, ng, W(141, 5));
  const tg = S.grp(); S.draw(rect(1258, 772, 300, 128), S.start, 0, { fill: DS.c("green", 1), c: DS.c("green", 2), w: DS.w.detail, parent: tg }); txt(S, "ON DAVE:", 1408, 822, { parent: tg }); txt(S, "ALL 3", 1408, 878, { size: DS.type.small, parent: tg }); fadeG(S, tg, W(142, 5));
  const F = dave(S, 1740, 960, "near", { look: -6, mood: "smile" });
  F.face(W(142, 5), "happy", -6);
  DS.vignette(S); }

// Most buttons in your life do exactly what they say. / A few only work on you.
{ const S = sc(143, 0, { cam: "push", focus: "960 520" }); DS.room(S, ROOM);
  const X = [320, 740, 1160, 1580], tt = [W(143, 1), W(143, 3), W(143, 5), W(143, 7)];
  X.forEach((x, i) => fadeG(S, panel(S, x, 430, 360, 400), undefined));
  const Bs = [doorbell(S, X[0] - 40, 430, tt[0]), lightSwitch(S, X[1] - 60, 450, tt[1]), callPanel(S, X[2] - 40, 440, { lit: false }), tvRemote(S, X[3] - 70, 460, tt[3])];
  Bs.forEach((B, i) => { jab(S, B, tt[i], 1); tick(S, X[i] + 120, 560, 1.0, tt[i] + 0.25); });
  { const g = S.grp(); DS.shape(S, circ(Bs[2].cx, Bs[2].cy, 22), "gold", { w: "detail", parent: g }); fadeG(S, g, tt[2] + 0.1, 0.15); }
  card(S, "MOST BUTTONS WORK", 960, 140, { t: W(143, 0) });
  const fg = S.grp(); walkBox(S, 820, 840, 0.36, { sign: false, parent: fg }); arrowR(S, 900, 840, 1020, 840, W(144, 0)); fadeG(S, fg, W(144, 0));
  heartP(S, 1080, 840, 1.0, W(144, 3));
  txt(S, "A FEW WORK ON YOU", 1430, 856, { size: DS.type.small, t: W(144, 3), c: DS.c("red", 2) });
  DS.vignette(S); }

// And the button that matters / is the one you think you have.
{ const S = sc(145, 0, { cam: "push", focus: "960 600" }); DS.outdoor(S, DAWN); morning(S);
  const F = dave(S, 960, 960, "near", { look: 0, mood: "smile", pose: "hold" });
  const [hx, hy] = F.hand("R", "hold");
  const B = btnIcon(S, hx - 10, hy - 34, 22, "red");
  S.draw(circ(hx - 10, hy - 34, 64), W(145, 2), 0, { c: DS.c("gold", 2), w: DS.w.near });
  card(S, "THE ONE YOU THINK YOU HAVE", 960, 170, { t: W(146, 2), size: DS.type.body });
  DS.vignette(S); }
