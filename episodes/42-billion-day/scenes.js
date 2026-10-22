// look: still
// What If You Had to Spend $1 Billion in a Day? (~8 min). What-if escalation told in clock-time steps. Dave wins a billion that vanishes at midnight and tries to spend it.
// Runners: (1) the DAY CLOCK, a 24-hour dial (midnight at the top) whose yellow wedge is the time left to midnight; it shows up small in the top-left of most scenes and big at
// the deadline beats, with the real 6:45 pm wire cut-off marked in red. (2) the MONEY METER, a chip in the top-right showing what is left of the billion
// ($1,000,000,000 -> 999,999,600 after the supermarket -> 999,900,000 at noon -> $0 at 6:44 pm). Both are driven by the keyframe tables HK / MK (one source of truth).
// (3) Dave's backpack: brought for ten tonnes, filled with one kilo ($100,000), emptied on a car, sat beside on the pavement.
// Cast: dave (own voice), news = TV anchor, old = grumpy car dealer, kid. All generic figures; generic notes (no real banknote design), no bank or store logos.
// VISUAL SAFETY: nothing flashes or strobes. Money "vanishing" is a slow 1.2 s fade; the clock hand sweeps, never blinks.
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
const ARM = { stand: [[-28, 52], [-48, 100]], reach: [[62, 10], [134, 8]], near: [[54, 12], [106, 10]], up: [[62, -10], [130, -44]], upNear: [[54, -6], [104, -34]] };
// arm jabs: right arm swings between "near" and "reach" n times (gap s); kind "up" for a raised button
// ---------- small kit ----------
let CP = 0;
const clipTo = (g, d) => { const id = "cp42-" + ++CP, cp = el("clipPath", { id }, dsDefs()); el("path", { d }, cp); g.setAttribute("clip-path", `url(#${id})`); return g; };
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


// ---------- Dave talks: open-mouth flaps over the closed mouth (the face itself never changes, so nothing blinks) ----------
const MOUTHC = DS.mix(DS.P.red[2], DS.P.ink[0], 0.45);
const flaps = (a, b, t0, t1) => { // a = small open mouth, b = big open mouth; a slow, irregular chatter
  const seq = [1, 2, 0, 2, 1, 2, 0, 1, 2, 2, 0, 1];
  let i = 0;
  for (let t = t0; t < t1 - 0.1; t += 0.2, i++) { const s = seq[i % seq.length]; tl.set(a, { opacity: s === 1 ? 1 : 0 }, t); tl.set(b, { opacity: s === 2 ? 1 : 0 }, t); }
  tl.set([a, b], { opacity: 0 }, t1);
};
const talk = (S, F, t0, t1) => {
  const R = F.r, x = F.hd[0] + (F.look || 0) * F.s * 0.8, y = F.hd[1] + 0.5 * R, g = F.P.head.parentNode, mk = (d) => el("path", { d, fill: MOUTHC, stroke: DS.P.ink[0], "stroke-width": Math.max(2.5, R * 0.05), opacity: 0 }, g);
  flaps(mk(circ(x, y, 0.14 * R, 0.09 * R)), mk(circ(x, y + 0.03 * R, 0.13 * R, 0.2 * R)), t0, t1);
};
const DAVE_S = 1.1;


// ---------- the cast: generic labelled figures, the same in every scene ----------
const ANCHOR = { s: 1.1, hair: "short", hairC: DS.c("ink", 1), outfitC: DS.c("navy"), tieC: "red" };
const DEALER = { s: 1.15, hair: "short", hairC: DS.c("gray", 1), outfitC: DS.c("brown", 1), tieC: "gold", mood: "angry" };
const KID = { s: 0.62, hair: "curly", hairC: DS.c("brown", 2), outfitC: DS.c("orange") };
const AGENT = { s: 1.1, hair: "bun", hairC: DS.c("brown", 2), outfitC: DS.c("purple"), tieC: "navy" };
const CASHIER = { s: 1.1, hair: "bun", hairC: DS.c("ink", 1), outfit: "apron", outfitC: DS.c("red") };
const BAKER = { s: 1.1, hair: "none", outfit: "apron", outfitC: DS.c("white", 2) };
const OC = ["green", "purple", "orange", "pink", "gold", "earth", "gray", "red"]; // no blue: blue is Dave's
const person = (S, x, gy, layer, i, o = {}) => who(S, x, gy, layer, Object.assign({ s: 1.1, hair: ["short", "bun", "curly", "side"][i % 4], hairC: DS.c(["brown", "ink", "earth", "gray"][i % 4], i % 4 === 3 ? 1 : 2), outfitC: DS.c(OC[i % 8]), mood: "flat", look: ((i % 3) - 1) * 5 }, o));
// hard hat: dome + brim in a colour, drawn over the head
const hardhat = (S, F, name = "yellow") => {
  const R = F.r, [hx, hy] = F.hd;
  DS.shape(S, `M${hx - 1.02 * R} ${hy - 0.38 * R} Q${hx - 0.98 * R} ${hy - 1.4 * R} ${hx} ${hy - 1.38 * R} Q${hx + 0.98 * R} ${hy - 1.4 * R} ${hx + 1.02 * R} ${hy - 0.38 * R} Z`, name, { w: "detail", parent: F.g });
  DS.shape(S, `M${hx - 1.22 * R} ${hy - 0.46 * R} H${hx + 1.22 * R} Q${hx + 1.3 * R} ${hy - 0.26 * R} ${hx + 1.1 * R} ${hy - 0.26 * R} H${hx - 1.1 * R} Q${hx - 1.3 * R} ${hy - 0.26 * R} ${hx - 1.22 * R} ${hy - 0.46 * R} Z`, name, { tone: 2, w: "detail", parent: F.g });
  return F;
};
const chefhat = (S, F) => {
  const R = F.r, [hx, hy] = F.hd;
  DS.shape(S, `M${hx - 0.8 * R} ${hy - 0.5 * R} Q${hx - 1.3 * R} ${hy - 1.3 * R} ${hx - 0.5 * R} ${hy - 1.5 * R} Q${hx} ${hy - 2.1 * R} ${hx + 0.5 * R} ${hy - 1.5 * R} Q${hx + 1.3 * R} ${hy - 1.3 * R} ${hx + 0.8 * R} ${hy - 0.5 * R} Z`, "white", { flat: true, w: "detail", parent: F.g });
  return F;
};
const worker = (S, x, gy, layer, o = {}) => hardhat(S, who(S, x, gy, layer, Object.assign({ s: 1.1, hair: "none", outfitC: DS.c("orange"), vest: true }, o)), o.hat || "yellow");
const doctor = (S, x, gy, layer, i, o = {}) => who(S, x, gy, layer, Object.assign({ s: 1.1, hair: ["short", "bun", "curly", "side"][i % 4], hairC: DS.c(["ink", "brown", "earth", "gray"][i % 4], 2), outfitC: DS.c("white", 2), specs: i % 2 === 0, mood: "flat" }, o));
// a speech/news label under a figure
const nameTag = (S, F, str, t, o = {}) => card(S, str, F.cx, o.y ?? F.gy + 56, Object.assign({ t, size: DS.type.caption }, o));

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
const heartP = (S, cx, cy, k, t) => { const g = S.grp(); S.draw(heartPath(cx, cy, k), S.start, 0, { fill: DS.c("red", 1), c: DS.c("red", 2), w: DS.w.mid, parent: g }); return fadeG(S, g, t, 0.25); };

// ---------- borrowed bits (episode 37) ----------
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
const priceTag = (S, x, y, str, o = {}) => { const g = S.grp(o.parent), wd = str.length * DS.type.small * 0.62 + 90; S.draw(line([x - 60, y - 80], [x, y], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.detail, parent: g }); DS.shape(S, `M${x} ${y} L${x + 40} ${y - 40} H${x + wd} V${y + 40} H${x + 40} Z`, "gold", { w: "mid", parent: g }); DS.shape(S, circ(x + 30, y, 10), "white", { w: "hair", parent: g }); S.text(str, x + 40 + (wd - 40) / 2, y + 19, { size: DS.type.small, c: DS.c("ink"), t: T0(S), parent: g }); return fadeG(S, g, o.t); };

// ---------- money ----------
const mon = (n) => "$" + Math.round(n).toLocaleString("en-US");
// generic banknote (our own design: no portrait, no seal). o.val = numeral in the corners (only when big enough to read)
const note = (S, cx, cy, k = 1, o = {}) => {
  const g = S.grp(o.parent), w = 240 * k, h = 104 * k, x0 = cx - w / 2, y0 = cy - h / 2, name = o.name || "green";
  if (k >= 0.5) DS.drop(S, rrect(x0 + 4 * k, y0 + 6 * k, w, h, DS.r.xs), { parent: g });
  DS.shape(S, rrect(x0, y0, w, h, DS.r.xs), name, { tone: o.tone ?? 1, flat: true, w: k >= 1 ? "mid" : "detail", parent: g });
  S.draw(rrect(x0 + 10 * k, y0 + 10 * k, w - 20 * k, h - 20 * k, DS.r.xs), S.start, 0, { c: DS.c(name, 2), w: DS.w.hair, parent: g });
  DS.shape(S, circ(cx, cy, 30 * k, 36 * k), name, { tone: 0, flat: true, w: "hair", parent: g });
  if (o.val && k >= 1.3) [x0 + 54 * k, x0 + w - 54 * k].forEach((tx) => txt(S, o.val, tx, cy + 14, { t: S.start, parent: g, c: DS.c(name, 2) }));
  return fadeG(S, g, o.t);
};
// a bundle of notes with a paper band (side view)
const bundle = (S, cx, cy, k = 1, o = {}) => {
  const g = S.grp(o.parent), w = 200 * k, h = 64 * k, x0 = cx - w / 2, y0 = cy - h / 2;
  DS.shape(S, rrect(x0, y0, w, h, DS.r.xs), "green", { tone: 1, w: k >= 0.8 ? "mid" : "detail", parent: g });
  for (let i = 1; i < 5; i++) S.draw(line([x0 + 6 * k, y0 + (i * h) / 5], [x0 + w - 6 * k, y0 + (i * h) / 5], 0), S.start, 0, { c: DS.c("green", 2), w: DS.w.hair, parent: g });
  DS.shape(S, rect(cx - 18 * k, y0, 36 * k, h), "paper", { flat: true, w: "hair", parent: g });
  return fadeG(S, g, o.t);
};
// pyramid of bundles on a pallet; rows bottom to top, o.t0 + i * o.dt = row i fades in
const cashPile = (S, cx, gy, k, rows = 6, o = {}) => {
  const g = S.grp(o.parent), bw = 140 * k, bh = 50 * k;
  DS.shadow(S, cx, gy, rows * bw * 1.2, { parent: g });
  DS.shape(S, rect(cx - (rows * bw) / 2 - 20 * k, gy - 22 * k, rows * bw + 40 * k, 22 * k), "wood", { w: "detail", parent: g });
  for (let r = 0; r < rows; r++) {
    const rg = S.grp(g), n = rows - r;
    for (let i = 0; i < n; i++) bundle(S, cx + (i - (n - 1) / 2) * bw, gy - 22 * k - bh / 2 - r * bh, k * 0.7, { parent: rg });
    if (o.t0 !== undefined) fadeG(S, rg, o.t0 + r * (o.dt ?? 0.15), 0.3);
  }
  return g;
};
// weighing scale (kitchen style): display above the base; things sit on top at (cx, gy - 90k). o.read = text on the display
const scaleBox = (S, cx, gy, k, read, o = {}) => {
  const g = S.grp(o.parent), w = 380 * k;
  DS.shadow(S, cx, gy, w * 1.1, { parent: g });
  DS.shape(S, rrect(cx - w / 2, gy - 90 * k, w, 90 * k, DS.r.sm), "gray", { tone: 1, w: "mid", parent: g });
  DS.shape(S, rrect(cx - w / 2 + 14 * k, gy - 100 * k, w - 28 * k, 22 * k, DS.r.xs), "gray", { tone: 2, flat: true, w: "detail", parent: g });
  DS.shape(S, rrect(cx - 110 * k, gy - 66 * k, 220 * k, 46 * k, DS.r.xs), "navy", { tone: 2, flat: true, w: "detail", parent: g });
  const te = S.text(read, cx, gy - 30 * k, { size: DS.type.caption, c: DS.P.white[0], t: o.tt ?? T0(S), parent: g });
  g.read = te;
  return g;
};
// coin with text (r >= 36 for text)
const coin = (S, cx, cy, r, str, o = {}) => {
  const g = S.grp(o.parent);
  DS.shape(S, circ(cx, cy, r), "gold", { w: r > 40 ? "mid" : "detail", parent: g });
  S.draw(circ(cx, cy, r * 0.78), S.start, 0, { c: DS.c("gold", 2), w: DS.w.hair, parent: g });
  if (str && r >= 36) txt(S, str, cx, cy + 14, { parent: g, c: DS.c("gold", 2, "near") });
  return fadeG(S, g, o.t);
};
// money moves along a straight line: a coin that travels p0 -> p1 at t, then stays (o.stay) or fades
const coinMove = (S, p0, p1, t, dur, r = 20, o = {}) => {
  const g = coin(S, p0[0], p0[1], r, null, {});
  tl.fromTo(g, { opacity: 0 }, { opacity: 1, duration: 0.2 }, t);
  tl.fromTo(g, { attr: { transform: "translate(0 0)" } }, { attr: { transform: `translate(${p1[0] - p0[0]} ${p1[1] - p0[1]})` }, duration: dur, ease: "power1.inOut", immediateRender: false }, t);
  if (!o.stay) tl.to(g, { opacity: 0, duration: 0.3 }, t + dur);
  return g;
};

// ---------- elephants (generic, grey, facing right) ----------
const elephant = (S, x, gy, k = 1, o = {}) => {
  const g = S.grp(o.parent), L = o.layer || "near";
  DS.shadow(S, x + 20 * k, gy, 380 * k, { parent: g });
  [[-130, 0], [-70, 6], [60, 6], [118, 0]].forEach(([dx, dy], i) => DS.shape(S, rrect(x + dx * k - 26 * k, gy - 118 * k + dy * k * 0.3, 52 * k, 118 * k - dy * k * 0.3, DS.r.sm * k), "gray", { layer: L, tone: i % 2 ? 2 : 1, w: "mid", parent: g }));
  DS.shape(S, rrect(x - 190 * k, gy - 270 * k, 340 * k, 190 * k, 84 * k), "gray", { layer: L, tone: 0, w: "near", parent: g });
  S.draw(`M${x - 190 * k} ${gy - 200 * k} Q${x - 214 * k} ${gy - 170 * k} ${x - 206 * k} ${gy - 130 * k}`, S.start, 0, { c: DS.line(L), w: DS.w.mid, parent: g });
  DS.shape(S, circ(x + 168 * k, gy - 214 * k, 78 * k, 70 * k), "gray", { layer: L, tone: 0, w: "near", parent: g });
  DS.shape(S, `M${x + 214 * k} ${gy - 196 * k} C${x + 290 * k} ${gy - 190 * k} ${x + 296 * k} ${gy - 110 * k} ${x + 262 * k} ${gy - 44 * k} L${x + 232 * k} ${gy - 54 * k} C${x + 256 * k} ${gy - 112 * k} ${x + 246 * k} ${gy - 150 * k} ${x + 200 * k} ${gy - 160 * k} Z`, "gray", { layer: L, tone: 0, w: "mid", parent: g });
  DS.shape(S, `M${x + 196 * k} ${gy - 226 * k} C${x + 100 * k} ${gy - 300 * k} ${x + 60 * k} ${gy - 180 * k} ${x + 110 * k} ${gy - 130 * k} C${x + 150 * k} ${gy - 110 * k} ${x + 190 * k} ${gy - 150 * k} ${x + 196 * k} ${gy - 226 * k} Z`, "gray", { layer: L, tone: 2, w: "mid", parent: g });
  DS.shape(S, `M${x + 214 * k} ${gy - 168 * k} q${40 * k} ${20 * k} ${64 * k} ${-4 * k} q${-30 * k} ${44 * k} ${-64 * k} ${4 * k} Z`, "white", { layer: L, flat: true, w: "hair", parent: g });
  S.fill(circ(x + 196 * k, gy - 232 * k, 7 * k), S.start, 0, DS.P.ink[0], 1, g);
  return fadeG(S, g, o.t);
};

// ---------- the runner: the DAY CLOCK (24-hour dial, midnight on top) and the MONEY METER ----------
const fmtTime = (h) => { const m = Math.floor(h * 60 + 1e-6), hh = Math.floor(m / 60) % 24, mm = m % 60; return `${hh % 12 || 12}:${String(mm).padStart(2, "0")} ${hh < 12 ? "AM" : "PM"}`; };
const wedgeD = (cx, cy, rr, h) => `M${f1(cx)} ${f1(cy)} ` + arcPts(cx, cy, rr, h * 15 - 90, 270, 30).map(([x, y]) => `L${f1(x)} ${f1(y)}`).join(" ") + " Z";
// drive anything from the scene clock: fn(absolute time) is called while the scene plays, and once now
const bindT = (S, fn) => { const v = { p: 0 }; fn(S.start); tl.fromTo(v, { p: 0 }, { p: 1, duration: S.len, ease: "none", immediateRender: false, onUpdate: () => fn(S.start + v.p * S.len) }, S.start); };
const CUT_H = 18.75; // the real deadline: 6:45 pm
// o.cut = time the red 6:45 pm marker appears (true = already there); o.read = digital readout chip under the dial; o.labels = AM/PM captions around the dial; o.h = fixed hour instead of HK
const dayClock = (S, cx, cy, r, o = {}) => {
  const g = S.grp(o.parent), big = r >= 150, sw = big ? DS.w.mid : DS.w.detail;
  DS.drop(S, circ(cx + 6, cy + 10, r + 8), { parent: g });
  DS.shape(S, circ(cx, cy, r), "white", { flat: true, w: big ? "near" : "mid", parent: g });
  const wedge = el("path", { d: "", fill: DS.c("yellow", 0), opacity: 0.95 }, g);
  S.draw(rays(cx, cy, r * 0.84, r * 0.97, 24, -Math.PI / 2), S.start, 0, { c: DS.c("ink"), w: sw, parent: g });
  S.draw(rays(cx, cy, r * 0.72, r * 0.97, 4, -Math.PI / 2, Math.PI * 1.5), S.start, 0, { c: DS.c("ink"), w: big ? DS.w.near : DS.w.mid, parent: g });
  S.draw(circ(cx, cy, r * 0.97), S.start, 0, { c: DS.c("ink"), w: big ? DS.w.mid : DS.w.detail, parent: g });
  if (o.labels) [["12 AM", 0, -1.2], ["6 AM", 1.3, 0.12], ["12 PM", 0, 1.38], ["6 PM", -1.3, 0.12]].forEach(([s, dx, dy]) => txt(S, s, cx + dx * r * 0.98 + (dx ? Math.sign(dx) * 28 : 0), cy + dy * r * 0.98, { anchor: dx > 0 ? "start" : dx < 0 ? "end" : "middle", parent: g }));
  let cutG = null;
  if (o.cut !== undefined) {
    cutG = S.grp(g); const a = (CUT_H * 15 - 90) * Math.PI / 180, c = Math.cos(a), s = Math.sin(a);
    S.draw(line([cx + c * r * 0.2, cy + s * r * 0.2], [cx + c * r * 1.08, cy + s * r * 1.08], 0), S.start, 0, { c: DS.c("red"), w: big ? DS.w.near : DS.w.mid, parent: cutG });
    DS.shape(S, circ(cx + c * r * 1.14, cy + s * r * 1.14, r * 0.11), "red", { w: big ? "mid" : "detail", parent: cutG });
    if (o.cut !== true) fadeG(S, cutG, o.cut);
  }
  const hand = el("path", { d: `M${cx} ${cy + r * 0.12} L${cx} ${cy - r * 0.8}`, stroke: DS.c("red", 2), "stroke-width": big ? DS.w.near * 1.5 : DS.w.near, "stroke-linecap": "round", fill: "none" }, g);
  DS.shape(S, circ(cx, cy, r * 0.07), "ink", { w: "hair", parent: g });
  let rd = null;
  if (o.read) {
    const bw = 190, bh = 54, by = cy + r + 22;
    DS.shape(S, rrect(cx - bw / 2, by, bw, bh, DS.r.sm), "white", { flat: true, w: "detail", parent: g });
    rd = S.text("12:01 AM", cx, by + 40, { size: DS.type.caption, c: DS.P.ink[0], t: T0(S), parent: g });
  }
  const render = (h) => { hand.setAttribute("transform", `rotate(${f1(h * 15)} ${cx} ${cy})`); wedge.setAttribute("d", wedgeD(cx, cy, r * 0.97, h)); if (rd) rd.textContent = fmtTime(h); };
  if (o.h !== undefined) render(o.h); else bindT(S, (t) => render((o.fn || hourAt)(t)));
  return fadeG(S, g, o.t);
};
// money meter chip (top right): coin, number, bar. Follows MK.
const moneyChip = (S, o = {}) => {
  const g = S.grp(), x0 = 1360, y0 = 80, w = 480, h = 116;
  DS.drop(S, rrect(x0 + 6, y0 + 10, w, h, DS.r.md), { parent: g });
  DS.shape(S, rrect(x0, y0, w, h, DS.r.md), "white", { flat: true, w: "detail", parent: g });
  DS.shape(S, circ(x0 + 50, y0 + 46, 28), "gold", { w: "detail", parent: g });
  txt(S, "$", x0 + 50, y0 + 60, { parent: g, c: DS.c("gold", 2) });
  const te = S.text(mon(1e9), x0 + 92, y0 + 62, { size: DS.type.caption, anchor: "start", c: DS.P.ink[0], t: T0(S), parent: g });
  DS.shape(S, rrect(x0 + 30, y0 + 84, w - 60, 16, DS.r.sm), "gray", { tone: 1, flat: true, w: "hair", parent: g });
  const fill = el("rect", { x: x0 + 30, y: y0 + 84, width: w - 60, height: 16, rx: 8, fill: DS.c("green", 0), stroke: DS.P.ink[0], "stroke-width": DS.w.hair }, g);
  const render = (v) => { te.textContent = mon(v); te.setAttribute("fill", v <= 0 ? DS.c("red", 2) : DS.P.ink[0]); fill.setAttribute("width", Math.max(0.01, (v / 1e9) * (w - 60))); };
  bindT(S, (t) => render(moneyAt(t)));
  return g;
};
// the standard HUD: day clock top-left, money chip top-right. o.no hides both; o.noClock / o.noMoney hide one
const hud = (S, o = {}) => {
  if (o.no) return;
  if (!o.noClock) dayClock(S, 188, 196, 84, { read: true, cut: o.cut });
  if (!o.noMoney) moneyChip(S);
};
// every scene ends with this: HUD, then the vignette
const fin = (S, o = {}) => { hud(S, o); DS.vignette(S); };

// ---------- stuff ----------
// Dave's backpack (the third runner). fill 0 = flat and empty, 1 = full. Feet on gy.
const backpack = (S, cx, gy, k = 1, fill = 1, o = {}) => {
  const g = S.grp(o.parent), h = (84 + 96 * fill) * k, w = (150 - 20 * (1 - fill)) * k, y0 = gy - h;
  DS.shadow(S, cx, gy, w * 1.5, { parent: g });
  DS.shape(S, `M${cx - 24 * k} ${y0 + 4 * k} Q${cx} ${y0 - 36 * k} ${cx + 24 * k} ${y0 + 4 * k}`, "orange", { tone: 2, w: "mid", parent: g });
  DS.shape(S, rrect(cx - w / 2, y0, w, h, DS.r.lg * k), "orange", { w: "mid", parent: g });
  DS.shape(S, rrect(cx - w * 0.36, y0 + h * 0.52, w * 0.72, h * 0.4, DS.r.md * k), "orange", { tone: 2, w: "detail", parent: g });
  S.draw(`M${cx - w * 0.3} ${y0 + h * 0.5} H${cx + w * 0.3}`, S.start, 0, { c: DS.c("orange", 2, "near"), w: DS.w.detail, parent: g });
  DS.shape(S, rrect(cx - w / 2 - 14 * k, y0 + h * 0.18, 18 * k, h * 0.5, DS.r.sm * k), "orange", { tone: 2, w: "detail", parent: g });
  if (fill > 0.6) bundle(S, cx, y0 - 2 * k, 0.55 * k, { parent: g });
  return fadeG(S, g, o.t);
};
const stack = (S, cx, gy, w, n, name = "paper", o = {}) => { // stack of flat sheets (forms, paper), each fades in at o.t0 + i * o.dt
  const g = S.grp(o.parent);
  for (let i = 0; i < n; i++) { const sg = S.grp(g); DS.shape(S, rect(cx - w / 2 + ((i * 7) % 11) - 5, gy - (i + 1) * (o.h || 12), w, o.h || 12), name, { tone: i % 2 ? 0 : 2, flat: true, w: "hair", parent: sg }); if (o.t0 !== undefined) fadeG(S, sg, o.t0 + i * (o.dt ?? 0.04), 0.25); }
  return g;
};
// a form: title, rows of lines, optional OCCUPATION box. k = scale
const form = (S, cx, cy, k = 1, o = {}) => {
  const g = S.grp(o.parent), w = 380 * k, h = 500 * k, x0 = cx - w / 2, y0 = cy - h / 2;
  DS.drop(S, rect(x0 + 8, y0 + 12, w, h), { parent: g });
  DS.shape(S, rect(x0, y0, w, h), "white", { flat: true, w: k >= 0.8 ? "mid" : "detail", parent: g });
  if (k >= 0.9) txt(S, "CASH FORM", cx, y0 + 70 * k, { parent: g });
  else S.draw(rect(x0 + 30 * k, y0 + 36 * k, w - 60 * k, 30 * k), S.start, 0, { c: DS.c("ink"), w: DS.w.detail, parent: g });
  lines(S, x0 + 30 * k, y0 + 120 * k, w - 60 * k, o.occ ? 3 : 8, S.start, 40 * k, g);
  if (o.occ) {
    const by = y0 + 270 * k;
    txt(S, "OCCUPATION:", cx, by, { parent: g });
    DS.shape(S, rect(x0 + 30 * k, by + 24 * k, w - 60 * k, 70 * k), "paper", { flat: true, w: "detail", parent: g });
    lines(S, x0 + 30 * k, by + 150 * k, w - 60 * k, 3, S.start, 40 * k, g);
  } else if (o.stamp) stamp(S, cx, cy + 110 * k, o.stamp, o.stampT ?? S.start + 0.4, "red", { size: DS.type.caption, rot: -8 });
  return fadeG(S, g, o.t);
};
const house = (S, cx, gy, k = 1, name = "wall", o = {}) => {
  const g = S.grp(o.parent), w = 220 * k, h = 130 * k, L = o.layer || "near";
  DS.shadow(S, cx, gy, w * 1.3, { parent: g });
  DS.shape(S, rect(cx - w / 2, gy - h, w, h), name, { layer: L, tone: o.tone ?? 0, w: k >= 0.7 ? "mid" : "detail", parent: g });
  DS.shape(S, `M${cx - w / 2 - 18 * k} ${gy - h + 4 * k} L${cx} ${gy - h - 96 * k} L${cx + w / 2 + 18 * k} ${gy - h + 4 * k} Z`, o.roof || "red", { layer: L, tone: 2, w: k >= 0.7 ? "mid" : "detail", parent: g });
  DS.shape(S, rect(cx - 20 * k, gy - 74 * k, 40 * k, 74 * k), "brown", { layer: L, flat: true, w: "detail", parent: g });
  [-1, 1].forEach((s) => DS.shape(S, rect(cx + s * 70 * k - 22 * k, gy - 100 * k, 44 * k, 44 * k), "glass", { layer: L, flat: true, w: "detail", parent: g }));
  return fadeG(S, g, o.t);
};
const rocket = (S, cx, gy, k = 1, o = {}) => {
  const g = S.grp(o.parent), w = 84 * k, h = 330 * k, L = o.layer || "near";
  DS.shadow(S, cx, gy, 170 * k, { parent: g });
  DS.shape(S, `M${cx - w / 2} ${gy - 70 * k} L${cx - w / 2 - 44 * k} ${gy} L${cx - w / 2} ${gy - 20 * k} Z M${cx + w / 2} ${gy - 70 * k} L${cx + w / 2 + 44 * k} ${gy} L${cx + w / 2} ${gy - 20 * k} Z`, "red", { layer: L, w: "mid", parent: g });
  DS.shape(S, rrect(cx - w / 2, gy - h, w, h - 10 * k, DS.r.md * k), "white", { layer: L, w: "mid", parent: g });
  DS.shape(S, `M${cx - w / 2} ${gy - h + 62 * k} Q${cx} ${gy - h - 110 * k} ${cx + w / 2} ${gy - h + 62 * k} Z`, "red", { layer: L, w: "mid", parent: g });
  DS.shape(S, circ(cx, gy - h + 120 * k, 17 * k), "glass", { layer: L, w: "detail", parent: g });
  S.draw(`M${cx - w / 2} ${gy - 120 * k} H${cx + w / 2}`, S.start, 0, { c: DS.line(L), w: DS.w.detail, parent: g });
  return fadeG(S, g, o.t);
};
// building with columns and a pediment. o.label on the frieze (caption size, short words only)
const columns = (S, cx, gy, k, label, o = {}) => {
  const g = S.grp(o.parent), w = 460 * k, name = o.name || "wall", L = o.layer || "near";
  DS.shadow(S, cx, gy, w * 1.15, { parent: g });
  DS.shape(S, rect(cx - w / 2 - 20 * k, gy - 30 * k, w + 40 * k, 30 * k), "gray", { layer: L, tone: 1, w: "mid", parent: g });
  DS.shape(S, rect(cx - w / 2, gy - 280 * k, w, 250 * k), name, { layer: L, tone: 2, flat: true, w: "mid", parent: g });
  for (let i = 0; i < 6; i++) DS.shape(S, rect(cx - w / 2 + (i + 0.5) * (w / 6) - 20 * k, gy - 280 * k, 40 * k, 250 * k), "white", { layer: L, dir: "h", w: "detail", parent: g });
  DS.shape(S, rect(cx - w / 2 - 14 * k, gy - 340 * k, w + 28 * k, 60 * k), name, { layer: L, tone: 1, w: "mid", parent: g });
  DS.shape(S, `M${cx - w / 2 - 20 * k} ${gy - 340 * k} L${cx} ${gy - 440 * k} L${cx + w / 2 + 20 * k} ${gy - 340 * k} Z`, name, { layer: L, tone: 0, w: "mid", parent: g });
  if (label && k >= 0.9) txt(S, label, cx, gy - 298 * k, { parent: g, c: DS.c("ink") });
  return fadeG(S, g, o.t);
};
// 12-storey hospital; the sign is a plain H. o.floors, o.glow = windows lit
const hospital = (S, cx, gy, k = 1, o = {}) => {
  const g = S.grp(o.parent), fl = o.floors || 12, cols = 6, w = 440 * k, fh = 46 * k, h = fl * fh + 50 * k, L = o.layer || "near";
  DS.shadow(S, cx, gy, w * 1.2, { parent: g });
  DS.shape(S, rect(cx - w / 2, gy - h, w, h), "white", { layer: L, tone: 2, dir: "h", w: k >= 0.7 ? "mid" : "detail", parent: g });
  DS.shape(S, rect(cx - w / 2 - 36 * k, gy - 6 * fh * 1.1 * 0 - 150 * k, 80 * k, 150 * k), "sand", { layer: L, tone: 0, w: "detail", parent: g });
  for (let r = 0; r < fl; r++) for (let c = 0; c < cols; c++) S.fill(rect(cx - w / 2 + 28 * k + c * ((w - 56 * k) / cols), gy - h + 28 * k + r * fh, (w - 56 * k) / cols - 14 * k, fh - 18 * k), S.start, 0, o.lit ? DS.c("yellow", 1, L) : DS.c("sky", 0, L), 1, g);
  DS.shape(S, rect(cx - 56 * k, gy - 96 * k, 112 * k, 96 * k), "glass", { layer: L, flat: true, w: "detail", parent: g });
  DS.shape(S, rect(cx - w / 2 - 6 * k, gy - h - 26 * k, w + 12 * k, 26 * k), "gray", { layer: L, tone: 1, w: "detail", parent: g });
  DS.shape(S, rrect(cx - 40 * k, gy - h - 96 * k, 80 * k, 80 * k, DS.r.sm * k), "blue", { layer: L, w: "detail", parent: g });
  S.draw(`M${cx - 18 * k} ${gy - h - 80 * k} V${gy - h - 32 * k} M${cx + 18 * k} ${gy - h - 80 * k} V${gy - h - 32 * k} M${cx - 18 * k} ${gy - h - 56 * k} H${cx + 18 * k}`, S.start, 0, { c: DS.P.white[0], w: DS.w.near * Math.max(0.6, k), parent: g });
  return fadeG(S, g, o.t);
};
// 18 gold hexagons with the centre one missing (the segmented mirror). r = hex size. Returns { g, cx, cy, hexes }
const mirror = (S, cx, cy, r, o = {}) => {
  const g = S.grp(o.parent), hexes = [];
  for (let q = -2; q <= 2; q++) for (let rr = -2; rr <= 2; rr++) {
    const d = Math.max(Math.abs(q), Math.abs(rr), Math.abs(q + rr)); if (d === 0 || d > 2) continue;
    const x = cx + r * 1.5 * q, y = cy + r * Math.sqrt(3) * (rr + q / 2); hexes.push([x, y]);
    DS.shape(S, `M${f1(x + r)} ${f1(y)} ` + [1, 2, 3, 4, 5].map((i) => `L${f1(x + r * Math.cos((i * Math.PI) / 3))} ${f1(y + r * Math.sin((i * Math.PI) / 3))}`).join(" ") + " Z", "gold", { w: "mid", tone: (q + rr + 4) % 3, parent: g });
  }
  return { g: fadeG(S, g, o.t), hexes };
};
// close crowd of mini people on a grid, fading in row by row from t0
const crowdGrid = (S, x0, y0, cols, rows, dx, dy, k, t0, dt, o = {}) => {
  const g = S.grp();
  for (let r = 0; r < rows; r++) { const rg = S.grp(g); for (let c = 0; c < cols; c++) mini(S, x0 + c * dx + (r % 2) * dx * 0.5, y0 + r * dy, k, { parent: rg, c: DS.c(OC[(r * 3 + c) % 8], 2), fill: DS.c(OC[(r * 3 + c) % 8], 1) }); fadeG(S, rg, t0 + r * dt, 0.3); }
  return g;
};
// big 2-line sign under a heading: generic dark-blue banner (news ticker)
const ticker = (S, x, y, w, str, o = {}) => {
  const g = S.grp(o.parent);
  DS.shape(S, rect(x, y, w, 72), "red", { tone: 2, flat: true, w: "detail", parent: g });
  txt(S, str, x + w / 2, y + 52, { parent: g, c: DS.P.white[0] });
  return fadeG(S, g, o.t);
};
// phone: body + dark screen. returns { g, sx, sy (screen centre), sw, sh }
const mphone = (S, cx, cy, k, o = {}) => {
  const g = S.grp(o.parent), w = 300 * k, h = 560 * k, x0 = cx - w / 2, y0 = cy - h / 2;
  DS.drop(S, rrect(x0 + 8, y0 + 12, w, h, DS.r.lg * k), { parent: g });
  DS.shape(S, rrect(x0, y0, w, h, DS.r.lg * k), "ink", { tone: 1, w: "mid", parent: g });
  DS.shape(S, rrect(x0 + 16 * k, y0 + 46 * k, w - 32 * k, h - 92 * k, DS.r.sm * k), o.screen || "navy", { flat: true, tone: o.tone ?? 2, w: "hair", parent: g });
  DS.shape(S, rrect(cx - 36 * k, y0 + 16 * k, 72 * k, 12 * k, DS.r.xs), "ink", { tone: 2, flat: true, w: "hair", parent: g });
  return { g: fadeG(S, g, o.t), cx, cy, k, sx: cx, sy: cy, sw: w - 32 * k, sh: h - 92 * k, x0, y0, w, h };
};
// trolley (faces right)
const trolley = (S, x, gy, k = 1, o = {}) => {
  const g = S.grp(o.parent);
  DS.shadow(S, x, gy, 300 * k, { parent: g });
  DS.shape(S, `M${x - 140 * k} ${gy - 190 * k} H${x + 130 * k} L${x + 100 * k} ${gy - 90 * k} H${x - 110 * k} Z`, "gray", { tone: 1, w: "mid", parent: g });
  [-80, -20, 40, 100].forEach((dx) => S.draw(line([x + dx * k - 12 * k, gy - 190 * k], [x + dx * k, gy - 90 * k], 0), S.start, 0, { c: DS.c("gray", 2), w: DS.w.detail, parent: g }));
  S.draw(line([x - 124 * k, gy - 140 * k], [x + 116 * k, gy - 140 * k], 0), S.start, 0, { c: DS.c("gray", 2), w: DS.w.detail, parent: g });
  S.draw(`M${x - 140 * k} ${gy - 190 * k} L${x - 190 * k} ${gy - 236 * k} H${x - 150 * k}`, S.start, 0, { c: DS.line("near"), w: DS.w.mid, parent: g });
  S.draw(`M${x - 110 * k} ${gy - 90 * k} L${x - 70 * k} ${gy - 44 * k} H${x + 70 * k} L${x + 100 * k} ${gy - 90 * k}`, S.start, 0, { c: DS.line("near"), w: DS.w.detail, parent: g });
  [-60, 70].forEach((dx) => DS.shape(S, circ(x + dx * k, gy - 20 * k, 20 * k), "ink", { tone: 1, w: "detail", parent: g }));
  return fadeG(S, g, o.t);
};
const cheese = (S, cx, cy, k = 1, o = {}) => {
  const g = S.grp(o.parent);
  DS.shape(S, `M${cx - 80 * k} ${cy + 36 * k} L${cx + 90 * k} ${cy + 36 * k} L${cx + 90 * k} ${cy - 10 * k} L${cx - 80 * k} ${cy - 46 * k} Z`, "yellow", { w: k >= 0.7 ? "mid" : "detail", parent: g });
  DS.shape(S, `M${cx - 80 * k} ${cy - 46 * k} L${cx + 90 * k} ${cy - 10 * k} L${cx + 60 * k} ${cy - 40 * k} L${cx - 50 * k} ${cy - 66 * k} Z`, "yellow", { tone: 1, w: k >= 0.7 ? "mid" : "detail", parent: g });
  [[-30, 10, 9], [20, 18, 12], [50, -2, 7], [-50, 22, 6]].forEach(([dx, dy, rr]) => DS.shape(S, circ(cx + dx * k, cy + dy * k, rr * k), "yellow", { tone: 2, flat: true, w: "hair", parent: g }));
  return fadeG(S, g, o.t);
};
// generic shelf unit against a wall: posts, boards, coloured boxes (no brands). (x, y) top-left
const shelves = (S, x, y, w, h, o = {}) => {
  const g = S.grp(o.parent), rows = o.rows || 3, rh = h / rows, cols = ["red", "blue", "green", "orange", "purple", "pink", "yellow", "sky"];
  DS.shape(S, rect(x, y, w, h), "gray", { layer: "mid", tone: 1, flat: true, w: "detail", parent: g });
  for (let r = 0; r < rows; r++) {
    let bx = x + 14;
    for (let i = 0; bx < x + w - 70; i++) { const bw = 42 + ((i * 17 + r * 11) % 36), bh = 52 + ((i * 23 + r * 7) % 40); DS.shape(S, rrect(bx, y + (r + 1) * rh - 14 - bh, bw, bh, DS.r.xs), cols[(i * 3 + r * 5) % cols.length], { layer: "mid", tone: (i + r) % 2, w: "hair", parent: g }); bx += bw + 8; }
    DS.shape(S, rect(x, y + (r + 1) * rh - 14, w, 14), "wood", { layer: "mid", tone: 1, flat: true, w: "hair", parent: g });
  }
  return g;
};
// a two-line "fluorescent strip" light with a soft glow, hung from the ceiling
const striplight = (S, cx, y, w) => { S.fill(rect(cx - w / 2, y, w, 16), S.start, 0, DS.P.white[0], 1); S.fill(circ(cx, y + 90, w * 0.55, 150), S.start, 0, DS.c("yellow", 1), 0.16); };
const receipt = (S, x, y, w, h, lns, o = {}) => {
  const g = S.grp(o.parent), n = 10, tw = w / n;
  DS.drop(S, rect(x + 8, y + 12, w, h), { parent: g });
  DS.shape(S, `M${x} ${y} H${x + w} V${y + h} ` + Array.from({ length: n }, (_, i) => `L${f1(x + w - (i + 0.5) * tw)} ${y + h + 18} L${f1(x + w - (i + 1) * tw)} ${y + h}`).join(" ") + " Z", "white", { flat: true, w: "detail", parent: g });
  lns.forEach(([a, b], i) => { txt(S, a, x + 28, y + 64 + i * 56, { anchor: "start", parent: g }); if (b) txt(S, b, x + w - 28, y + 64 + i * 56, { anchor: "end", parent: g }); });
  return fadeG(S, g, o.t);
};
// weekday cell grid: cells = [{ s, c }] ; (x, y) top-left. returns cell centres
const calGrid = (S, x, y, cols, rows, cw, ch, o = {}) => {
  const g = S.grp(o.parent), C = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { const cx = x + c * cw + cw / 2, cy = y + r * ch + ch / 2; C.push([cx, cy]); DS.shape(S, rect(x + c * cw, y + r * ch, cw, ch), "white", { flat: true, w: "detail", parent: g }); }
  return { g: fadeG(S, g, o.t), C };
};
// piggy-free "gate arm" barrier (wire closes): pivots at (x, y), length L. up -> down at t
const barrier = (S, x, y, L, t, o = {}) => {
  const g = S.grp(o.parent); DS.shape(S, rrect(x - 26, y - 20, 52, 130, DS.r.sm), "gray", { tone: 1, w: "mid", parent: g });
  const arm = S.grp(g); DS.shape(S, rrect(x, y - 16, L, 32, DS.r.xs), "red", { w: "mid", parent: arm });
  for (let i = 0; i < 5; i++) S.fill(`M${x + 60 + i * (L - 60) / 5} ${y - 14} l${(L - 60) / 10} 0 l-18 28 l${-(L - 60) / 10} 0 Z`, S.start, 0, DS.P.white[0], 1, arm);
  const tf = (a) => `rotate(${a} ${x} ${y})`; arm.setAttribute("transform", tf(-70));
  tl.fromTo(arm, { attr: { transform: tf(-70) } }, { attr: { transform: tf(0) }, duration: 0.9, ease: "power2.in", immediateRender: false }, t);
  return g;
};


// ---------- timing: one picture per beat, landing just after its first word (the 0.6 s crossfade covers the breath) ----------
const CUES = [[1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [6, 8], [7, 0], [8, 0], [9, 0], [10, 0], [11, 0], [12, 0],
  [13, 0], [14, 0], [15, 0], [15, 12], [16, 0], [17, 0], [18, 0], [19, 0],
  [20, 0], [20, 15], [21, 0], [21, 15], [22, 0], [23, 0], [24, 0], [24, 10], [25, 0], [26, 0], [27, 0],
  [28, 0], [28, 19], [29, 0], [30, 0], [30, 15], [31, 0], [32, 0], [33, 0], [34, 0],
  [35, 0], [36, 0], [37, 0], [37, 12], [38, 0], [39, 0], [40, 0], [40, 9], [41, 0], [41, 11], [42, 0], [43, 0], [43, 9], [44, 0], [44, 11], [45, 0], [46, 0],
  [47, 0], [48, 0], [49, 0], [50, 0], [51, 0], [51, 19], [52, 0],
  [53, 0], [53, 11], [54, 0], [55, 0], [56, 0], [57, 0], [58, 0],
  [59, 0], [60, 0], [61, 0], [61, 7], [62, 0], [63, 0], [63, 9], [64, 0], [65, 0], [66, 0], [66, 6], [67, 0], [68, 0], [69, 0],
  [70, 0], [71, 0], [72, 0], [73, 0], [74, 0], [75, 0], [76, 0], [77, 0], [77, 13], [78, 0], [79, 0], [80, 0], [80, 10], [81, 0], [82, 0], [83, 0], [84, 0], [85, 0]];
const WINS = sceneWindows(CUES, -0.25);
const sc = (c, w, o) => { const k = CUES.findIndex(([a, b]) => a === c && b === w); if (k < 0) throw new Error("no cue " + c + ":" + w); return scene(WINS[k][0], WINS[k][1], o); };
const END = (c) => CLIP(c)[1];
const ROOM = { wall: "wall", floor: "wood", window: false }, STORE = { wall: "white", floor: "gray", window: false }, BANK = { wall: "sand", floor: "gray", window: false }, LAB2 = { wall: "glass", floor: "wood", window: false };

// ---------- the runner's keyframes: HM = day-clock moves [t0, t1, hour0, hour1], MK = money events [t, dur, new value] ----------
const H0 = 1 / 60, EASE = gsap.parseEase("power1.inOut");
const HM = [
  [W(13, 0), W(13, 7), H0, 1.0], [W(15, 12), WE(15, 15), 1.0, 1 + 20 / 60], [W(19, 4), W(19, 13), 1 + 20 / 60, 9.0], [W(27, 0), WE(27, 8), 9.0, 9.5], [W(28, 0), WE(28, 18), 9.5, 10.0],
  [W(29, 0), WE(33, 15), 10.0, 12.0], [W(35, 0), WE(45, 15), 12.0, 14.0], [W(47, 0), WE(50, 9), 14.0, 16.0], [W(53, 0), WE(53, 3), 16.0, 18.5],
  [W(55, 0), WE(55, 13), 18.5, 18 + 41 / 60], [W(66, 0), WE(66, 21), 18 + 41 / 60, 18 + 43 / 60], [W(67, 0), WE(67, 3), 18 + 43 / 60, 18 + 44 / 60], [W(84, 0), W(84, 2), 18 + 44 / 60, 24.0]];
const MK = [[W(15, 20), 0.6, 999999600], [W(28, 11), 0.8, 999900000], [W(67, 3), 2.0, 0]];
const hourAt = (t) => { let h = H0; for (const [ta, tb, h0, h1] of HM) { if (t >= tb) h = h1; else if (t > ta) return h0 + (h1 - h0) * EASE((t - ta) / (tb - ta)); else return h; } return h; };
const moneyAt = (t) => { let v = 1e9; for (const [ts, d, to] of MK) { if (t >= ts + d) v = to; else if (t > ts) { const p = (t - ts) / d; return v + (to - v) * (p * p * (3 - 2 * p)); } else return v; } return v; };

// ---------- scene helpers used by several chapters ----------
// night window: dark glass, moon and a few stars (the room's own window is switched off)
const nightWin = (S, x, y, w, h) => {
  DS.shape(S, rrect(x - 14, y - 14, w + 28, h + 28, DS.r.xs), "white", { flat: true, w: "detail" });
  S.draw(rect(x, y, w, h), S.start, 0, { fill: DS.vgrad(DS.P.navy[1], DS.P.night[0]), c: DS.P.ink[0], w: DS.w.hair });
  S.fill(circ(x + w * 0.7, y + h * 0.28, w * 0.13), S.start, 0, DS.P.paper[1], 1);
  [[0.2, 0.2], [0.35, 0.55], [0.55, 0.12], [0.8, 0.62], [0.15, 0.8]].forEach(([a, b]) => S.fill(circ(x + w * a, y + h * b, 4), S.start, 0, DS.P.white[0], 0.9));
  S.draw(`M${x + w / 2} ${y} V${y + h} M${x} ${y + h / 2} H${x + w}`, S.start, 0, { c: DS.c("white", 0), w: DS.w.near });
};
// the "what would happen" question: money on the left, one day on the right, Dave in the middle. o.done = answer stamp
const question = (S, t0, t1, o = {}) => {
  DS.room(S, ROOM);
  cashPile(S, 470, 900, 0.8, 4, { t0, dt: 0.18 });
  txt(S, "$1 BILLION", 470, 300, { size: DS.type.title, t: t0, c: DS.c("green", 2) });
  dayClock(S, 1450, 520, 200, { h: 12, t: t1 });
  txt(S, "ONE DAY", 1450, 300, { size: DS.type.title, t: t1, c: DS.c("red", 2) });
  const F = dave(S, 960, 960, "near", { look: 0, mood: o.mood || "worried", pose: o.pose || "shrug" });
  if (o.stampT !== undefined) stamp(S, 960, 330, o.stamp, o.stampT, o.name || "red", { size: DS.type.body });
  return F;
};

// paper shopping bag with handles (generic, no print)
const bag = (S, cx, gy, k = 1, name = "red", o = {}) => {
  const g = S.grp(o.parent), w = 110 * k, h = 130 * k;
  DS.shadow(S, cx, gy, w * 1.2, { parent: g });
  S.draw(`M${cx - w * 0.22} ${gy - h} Q${cx} ${gy - h - 44 * k} ${cx + w * 0.22} ${gy - h}`, S.start, 0, { c: DS.line("near"), w: DS.w.mid, parent: g });
  DS.shape(S, rect(cx - w / 2, gy - h, w, h), name, { w: "mid", parent: g });
  DS.shape(S, rect(cx - w / 2, gy - h, w * 0.18, h), name, { tone: 2, flat: true, w: "hair", parent: g });
  return fadeG(S, g, o.t);
};

// ===================== 1. The prize =====================
// This is Dave. At one minute past midnight, Dave won a strange prize: a billion dollars.
{ const S = sc(1, 0, { cam: "push", focus: "900 600" }); DS.room(S, { wall: "wall", floor: "wood", window: false });
  nightWin(S, 470, 170, 300, 340);
  DS.rug(S, 700, 940, 760, "purple");
  const F = dave(S, 700, 960, "near", { s: 1.25, look: 6, mood: "wow", pose: "hold" });
  const [hx, hy] = F.hand("R", "hold");
  mphone(S, hx + 10, hy - 30, 0.34, { screen: "green", tone: 0 });
  card(S, "DAVE", 480, 590, { t: W(1, 2) });
  const pg = panel(S, 1340, 560, 700, 400, W(1, 8)); fadeG(S, pg, W(1, 8));
  txt(S, "YOU WON!", 1340, 470, { size: DS.type.title, t: W(1, 8), c: DS.c("red", 2) });
  countUp(S, 1340, 590, 0, 1e9, W(1, 13), WE(1, 15) - W(1, 13), { size: DS.type.small, fmt: mon, c: DS.c("green", 2), ease: "power2.out" });
  txt(S, "PRIZE", 1340, 660, { t: W(1, 11) });
  fin(S); }

// The rule is simple. Spend it all by the next midnight, or whatever's left vanishes.
{ const S = sc(2, 0, { cam: "push", focus: "960 540" }); DS.room(S, ROOM);
  const sweep = (t) => (t <= W(2, 3) ? H0 : t >= WE(2, 10) ? 24 : H0 + (24 - H0) * EASE((t - W(2, 3)) / (WE(2, 10) - W(2, 3))));
  dayClock(S, 560, 530, 250, { fn: sweep, labels: true });
  card(S, "SPEND IT ALL", 560, 112, { t: W(2, 4) });
  const pg = S.grp();
  cashPile(S, 1330, 900, 0.9, 5, { parent: pg });
  card(S, "WHATEVER'S LEFT", 1330, 270, { t: W(2, 12) });
  tl.to(pg, { opacity: 0, duration: 1.4, ease: "power1.inOut" }, W(2, 13) + 0.1);
  { const gh = S.grp(); dash(S.draw(`M${1330 - 340} ${900} H${1330 + 340} V${900 - 262} H${1330 - 340} Z`, S.start, 0, { c: DS.c("gray", 2), w: DS.w.mid, parent: gh }), 14, 14); fadeG(S, gh, W(2, 14) + 0.4, 0.8); }
  const F = dave(S, 1710, 960, "near", { s: 0.95, look: -6, mood: "worried" });
  fin(S, { no: true }); }

// Breaking news. A local man has won a very large prize with a very short deadline.
{ const S = sc(3, 0, { cam: "push", focus: "960 500" }); DS.room(S, ROOM);
  // the TV on a stand, anchor inside it
  DS.shape(S, rrect(260, 600, 1400, 90, DS.r.sm), "wood", { tone: 1, w: "mid" });
  DS.drop(S, rrect(486, 130, 960, 560, DS.r.md));
  DS.shape(S, rrect(470, 114, 960, 560, DS.r.md), "ink", { tone: 1, w: "mid" });
  S.draw(rect(502, 146, 896, 496), S.start, 0, { fill: DS.vgrad(DS.c("sky", 1), DS.c("sky", 0)), c: DS.P.ink[0], w: DS.w.hair });
  const A = who(S, 950, 640, "near", Object.assign({}, ANCHOR, { s: 1.25, mood: "flat" }));
  talk(S, A, W(3, 0), END(3));
  DS.shape(S, rect(560, 500, 780, 72), "wood", { tone: 0, w: "detail" });
  ticker(S, 502, 570, 896, "BREAKING NEWS", { t: W(3, 0) });
  card(S, "NEWS ANCHOR", 950, 735, { t: W(3, 0), size: DS.type.caption });
  const D = dave(S, 1560, 960, "near", { look: -8, mood: "wow" });
  fin(S); }

// How hard can it be? I love spending money.
{ const S = sc(4, 0, { cam: "push", focus: "800 560" }); DS.outdoor(S, DAY); street(S, DAY, { zebra: 1500 });
  bag(S, 330, 950, 1.5, "red"); bag(S, 1060, 950, 1.3, "purple"); bag(S, 1150, 960, 1.1, "orange");
  const F = dave(S, 700, 960, "near", { s: 1.45, look: 4, mood: "happy", pose: "hips" }); talk(S, F, W(4, 0), END(4));
  say(S, 1320, 300, 400, 130, 800, 620, ["“HOW HARD CAN IT BE?”"], W(4, 0), { size: DS.type.small });
  say(S, 1380, 540, 440, 120, 880, 660, ["“I LOVE SPENDING MONEY”"], W(4, 5), { size: DS.type.small });
  fin(S, { noClock: true }); }

// So what would happen if you had to spend a billion dollars in a day?
{ const S = sc(5, 0, { cam: "pull", focus: "960 540" });
  question(S, W(5, 10), W(5, 14));
  fin(S, { no: true }); }

// Twenty minutes in, he's fourteen million dollars behind.
{ const S = sc(6, 0, { cam: "push", focus: "900 600" }); DS.room(S, STORE);
  shelves(S, 420, 180, 1080, 480); striplight(S, 960, 100, 700);
  const F = dave(S, 760, 960, "near", { look: 6, mood: "worried", pose: "push" });
  trolley(S, 1060, 960, 1.15);
  const sw = stopwatch(S, 340, 560, 130, { go: W(6, 0), dur: 3.0, deg: 120 }); fadeG(S, sw, W(6, 0));
  card(S, "20 MIN", 340, 760, { t: W(6, 0), size: DS.type.caption });
  { const pg = panel(S, 1480, 520, 560, 220, W(6, 3)); fadeG(S, pg, W(6, 3)); }
  countUp(S, 1480, 500, 0, 14e6, W(6, 3), WE(6, 6) - W(6, 3), { size: DS.type.title, fmt: (n) => "-" + mon(n), c: DS.c("red", 2), ease: "power1.out" });
  txt(S, "BEHIND", 1480, 590, { size: DS.type.small, t: W(6, 7), c: DS.c("red", 2) });
  fin(S, { noClock: true }); }

// By lunch, he's looking at a hundred thousand government forms.
{ const S = sc(6, 8, { cam: "pull", focus: "1100 600" }); DS.room(S, ROOM);
  stack(S, 1000, 940, 340, 24, "white", { h: 22, t0: W(6, 13), dt: 0.07 }); stack(S, 1400, 940, 340, 30, "white", { h: 22, t0: W(6, 13) + 0.2, dt: 0.07 }); stack(S, 1740, 940, 300, 17, "white", { h: 22, t0: W(6, 14), dt: 0.07 });
  const F = dave(S, 330, 960, "near", { s: 1.0, look: 8, mood: "worried" });
  countUp(S, 960, 260, 0, 100000, W(6, 13), WE(6, 17) - W(6, 13), { size: DS.type.display, fmt: (n) => Math.round(n).toLocaleString("en-US"), c: DS.c("red", 2), ease: "power1.out" });
  txt(S, "FORMS", 960, 340, { size: DS.type.title, t: W(6, 16) });
  fin(S, { noClock: true }); }

// And by the evening, he's racing a deadline that isn't midnight.
{ const S = sc(7, 0, { cam: "push", focus: "1000 560" }); DS.outdoor(S, DAWN); street(S, DAWN, { zebra: 1500 });
  const tw = 1380; DS.shape(S, rect(tw - 110, 260, 220, 360), "wall", { layer: "far", tone: 2, dir: "h", w: "far" }); DS.shape(S, `M${tw - 130} 262 L${tw} 150 L${tw + 130} 262 Z`, "red", { layer: "far", tone: 2, w: "far" });
  DS.shape(S, circ(tw, 400, 86), "white", { w: "mid" }); txt(S, "?", tw, 432, { size: DS.type.display, t: W(7, 8), c: DS.c("red", 2) });
  const F = dave(S, 300, 960, "near", { look: 8, mood: "determined", pose: "reach" }); F.walk(W(7, 4), WE(7, 10) - W(7, 4), { x: 700 });
  card(S, "NOT MIDNIGHT", 960, 190, { t: W(7, 8) });
  fin(S, { noClock: true }); }

// First, the maths. A day has eighty-six thousand four hundred seconds,
{ const S = sc(8, 0, { cam: "push", focus: "900 540" }); DS.room(S, ROOM);
  const sweep = (t) => (t <= W(8, 3) ? H0 : t >= WE(8, 10) ? 24 : H0 + (24 - H0) * ((t - W(8, 3)) / (WE(8, 10) - W(8, 3))));
  dayClock(S, 520, 500, 230, { fn: sweep, labels: true });
  card(S, "ONE DAY", 520, 140, { t: W(8, 4) });
  countUp(S, 1360, 520, 0, 86400, W(8, 3), WE(8, 10) - W(8, 3), { size: DS.type.display, ease: "none", c: DS.c("red", 2) });
  txt(S, "SECONDS", 1360, 620, { size: DS.type.title, t: W(8, 5) });
  const F = dave(S, 1700, 960, "near", { s: 0.9, look: -6, mood: "flat" });
  fin(S, { no: true }); }

// so Dave has to spend about eleven thousand five hundred dollars every second, including the seconds he spends deciding.
{ const S = sc(9, 0, { cam: "push", focus: "900 540" }); DS.room(S, ROOM);
  const F = dave(S, 460, 960, "near", { look: 6, mood: "worried", pose: "hold" });
  const sw = stopwatch(S, 1010, 560, 190, { go: W(9, 11), dur: 6.0, deg: 1080 }); fadeG(S, sw, W(9, 10));
  txt(S, "$11,574", 1560, 520, { size: DS.type.display, t: W(9, 4), c: DS.c("green", 2) });
  txt(S, "EVERY SECOND", 1560, 620, { size: DS.type.small, t: W(9, 10) });
  say(S, 520, 330, 170, 100, 470, 620, ["?"], W(9, 14), { think: true, size: DS.type.title });
  fin(S); }

// If he stops to sleep for eight hours, it's more like seventeen thousand dollars a second. So sleep is cancelled.
{ const S = sc(10, 0, { cam: "push", focus: "800 600" }); DS.room(S, { wall: "wall", floor: "wood", window: false });
  DS.rug(S, 700, 960, 900, "purple");
  const bx = 280; DS.shadow(S, bx + 480, 930, 1000);
  DS.shape(S, rect(bx, 600, 40, 330), "wood", { w: "mid" }); DS.shape(S, rrect(bx + 40, 740, 880, 60, DS.r.sm), "wood", { tone: 1, w: "mid" }); DS.shape(S, rrect(bx + 40, 700, 880, 56, DS.r.md), "white", { w: "mid" });
  const F = who(S, bx + 330, 692 + 4, "near", Object.assign({}, DAVE, { s: 1.0, sit: true, legL: [[78, 2], [150, 6]], legR: [[90, 8], [166, 12]], mood: "sleep" }));
  DS.shape(S, rrect(bx + 380, 620, 540, 150, DS.r.lg), "blue", { w: "mid" });
  DS.shape(S, rrect(bx + 70, 664, 130, 56, DS.r.md), "white", { tone: 2, w: "detail" });
  S.draw(rect(bx + 420, 636, 40, 0), S.start, 0, { c: DS.P.ink[0], w: DS.w.hair });
  txt(S, "Z z z", bx + 440, 470, { size: DS.type.title, t: W(10, 1), c: DS.c("blue", 2) });
  const cl = dayClock(S, 1520, 700, 120, { h: 8, t: W(10, 5) });
  txt(S, "8 HOURS", 1520, 880, { size: DS.type.small, t: W(10, 5) });
  txt(S, "$17,361", 1520, 330, { size: DS.type.display, t: W(10, 10), c: DS.c("red", 2) }); txt(S, "A SECOND", 1520, 420, { size: DS.type.small, t: W(10, 13), c: DS.c("red", 2) });
  xMark(S, 700, 770, 3.0, W(10, 17));
  stamp(S, 700, 260, "SLEEP CANCELLED", W(10, 18), "red", { size: DS.type.body });
  fin(S); }

// And a billion is bigger than it sounds. A million seconds is about eleven and a half days.
{ const S = sc(11, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM);
  const Cg = calGrid(S, 560, 340, 4, 3, 200, 140, { t: W(11, 8) });
  const cells = Cg.C; cells.slice(0, 11).forEach(([cx, cy], i) => S.fill(rect(cx - 98, cy - 68, 196, 136), W(11, 13) + i * 0.16, 0, DS.c("yellow", 1), 0.95)); S.fill(rect(cells[11][0] - 98, cells[11][1] - 68, 98, 136), W(11, 15), 0, DS.c("yellow", 1), 0.95);
  card(S, "1,000,000 SECONDS", 960, 180, { t: W(11, 8) });
  txt(S, "11.5 DAYS", 960, 850, { size: DS.type.title, t: W(11, 13), c: DS.c("red", 2) });
  const F = dave(S, 1700, 960, "near", { s: 0.9, look: -6, mood: "flat" });
  fin(S); }

// A billion seconds is about thirty-one years.
{ const S = sc(12, 0, { cam: "push", focus: "960 600" }); DS.outdoor(S, DAY);
  const X = [380, 760, 1140, 1520], HC = [DS.c("brown"), DS.c("brown", 1), DS.c("gray", 0), DS.c("gray", 1)];
  X.forEach((x, i) => { const F = dave(S, x, 940, "near", { s: 1.0, hairC: HC[i], mood: i < 2 ? "smile" : "tired", look: i % 2 ? 4 : -4, t: W(12, i) }); if (i === 3) { S.draw(`M${x + 70} 700 Q${x + 70} 668 ${x + 98} 674 M${x + 70} 700 V940`, W(12, 3), 0, { c: DS.c("wood", 2), w: DS.w.near }); } });
  arrowR(S, 300, 380, 1640, 380, W(12, 0));
  card(S, "1,000,000,000 SECONDS", 760, 280, { t: W(12, 0), size: DS.type.caption });
  txt(S, "31 YEARS", 1500, 300, { size: DS.type.title, t: W(12, 5), c: DS.c("red", 2) });
  fin(S); }

// ===================== 2. The supermarket =====================
// a bank card (generic: no logo)
const creditCard = (S, cx, cy, k = 1, o = {}) => {
  const g = S.grp(o.parent), w = 520 * k, h = 320 * k, x0 = cx - w / 2, y0 = cy - h / 2;
  DS.drop(S, rrect(x0 + 10, y0 + 14, w, h, DS.r.md), { parent: g });
  DS.shape(S, rrect(x0, y0, w, h, DS.r.md), "navy", { w: "mid", parent: g });
  DS.shape(S, rect(x0, y0 + 50 * k, w, 54 * k), "ink", { tone: 2, flat: true, w: "hair", parent: g });
  DS.shape(S, rrect(x0 + 40 * k, y0 + 130 * k, 84 * k, 62 * k, DS.r.xs), "gold", { w: "detail", parent: g });
  S.draw(`M${x0 + 40 * k} ${y0 + 161 * k} H${x0 + 124 * k} M${x0 + 82 * k} ${y0 + 130 * k} V${y0 + 192 * k}`, S.start, 0, { c: DS.c("gold", 2), w: DS.w.hair, parent: g });
  [0, 1, 2, 3].forEach((i) => S.fill(rrect(x0 + 40 * k + i * 104 * k, y0 + 230 * k, 84 * k, 18 * k, DS.r.xs), S.start, 0, DS.P.white[0], 0.55, g));
  return fadeG(S, g, o.t);
};

// Dave starts at the only shop open at one in the morning, a twenty-four-hour supermarket.
{ const S = sc(13, 0, { cam: "push", focus: "1000 560" }); DS.outdoor(S, NIGHT); street(S, NIGHT, { zebra: 300 });
  DS.shape(S, rect(900, 250, 900, 480), "white", { layer: "mid", tone: 2, dir: "h", w: "mid" });
  DS.shape(S, rect(900, 250, 900, 80), "red", { layer: "mid", tone: 0, w: "mid" });
  txt(S, "SUPERMARKET", 1350, 312, { size: DS.type.body, c: DS.P.white[0] });
  DS.shape(S, rect(940, 400, 380, 240), "yellow", { layer: "mid", tone: 1, flat: true, w: "detail" }); DS.shape(S, rect(1400, 400, 360, 330), "yellow", { layer: "mid", tone: 1, flat: true, w: "detail" });
  S.draw(`M1580 400 V730`, S.start, 0, { c: DS.P.ink[0], w: DS.w.detail });
  S.fill(circ(1350, 520, 460, 260), S.start, 0, DS.c("yellow", 1), 0.14);
  card(S, "OPEN 24 HOURS", 1130, 180, { t: W(13, 12), tc: "green" });
  const F = dave(S, 300, 960, "near", { look: 8, mood: "flat" }); F.walk(W(13, 0), 3.8, { x: 460 });
  fin(S); }

// The trouble is, nothing here costs eleven thousand dollars. The priciest thing on the shelves is a forty-dollar cheese.
{ const S = sc(14, 0, { cam: "push", focus: "1000 600" }); DS.room(S, STORE);
  shelves(S, 420, 170, 1080, 500); striplight(S, 960, 96, 700);
  [["$2", 560, 430], ["$3", 800, 430], ["$5", 1040, 430], ["$8", 1280, 430]].forEach(([s, x, y], i) => card(S, s, x, y, { t: W(14, 1) + i * 0.15, size: DS.type.caption, r: "sm" }));
  card(S, "NEED $11,000", 960, 170, { t: W(14, 3), tc: "red" }); xMark(S, 960, 330, 1.6, W(14, 7));
  DS.shape(S, rect(1300, 800, 420, 36), "wood", { tone: 1, w: "mid" }); DS.shape(S, rect(1330, 836, 40, 124), "wood", { tone: 2, flat: true, w: "detail" }); DS.shape(S, rect(1650, 836, 40, 124), "wood", { tone: 2, flat: true, w: "detail" });
  cheese(S, 1510, 760, 1.5, { t: W(14, 16) }); priceTag(S, 1200, 740, "$40", { t: W(14, 17) });
  S.draw(circ(1510, 730, 190, 120), W(14, 18), 0, { c: DS.c("red"), w: DS.w.near });
  const F = dave(S, 560, 960, "near", { look: 8, mood: "worried", pose: "point" });
  fin(S); }

// He fills a trolley with the most expensive things he can find,
{ const S = sc(15, 0, { cam: "push", focus: "1000 600" }); DS.room(S, STORE);
  shelves(S, 300, 170, 1300, 500, { rows: 3 }); striplight(S, 960, 96, 800);
  const F = dave(S, 700, 960, "near", { look: 6, mood: "determined", pose: "push" });
  trolley(S, 1020, 960, 1.45);
  cheese(S, 960, 650, 0.6, { t: W(15, 6) }); cheese(S, 1100, 640, 0.6, { t: W(15, 7) });
  { const g = S.grp(); DS.shape(S, rrect(1000, 560, 40, 120, DS.r.sm), "green", { tone: 2, w: "detail", parent: g }); DS.shape(S, rect(1012, 530, 16, 40), "green", { tone: 2, w: "detail", parent: g }); fadeG(S, g, W(15, 7)); }
  { const g = S.grp(); DS.shape(S, rrect(1170, 610, 120, 60, DS.r.md), "red", { tone: 1, w: "detail", parent: g }); DS.shape(S, circ(1230, 640, 14), "pink", { w: "hair", parent: g }); fadeG(S, g, W(15, 8)); }
  { const g = S.grp(); DS.shape(S, rrect(1260, 590, 110, 80, DS.r.sm), "gold", { w: "detail", parent: g }); fadeG(S, g, W(15, 9)); }
  card(S, "MOST EXPENSIVE", 900, 120, { t: W(15, 5) });
  fin(S); }

// and twenty minutes later he has spent about four hundred dollars.
{ const S = sc(15, 12, { cam: "push", focus: "900 560" }); DS.room(S, STORE);
  receipt(S, 560, 130, 560, 520, [["CHEESE", "$40"], ["CHEESE", "$40"], ["STEAK", "$60"], ["WINE", "$120"], ["LOBSTER", "$140"]], { t: S.start });
  { const g = S.grp(); S.draw(line([588, 470], [1092, 470], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.detail, parent: g }); txt(S, "TOTAL", 588, 540, { anchor: "start", size: DS.type.small, parent: g }); txt(S, "$400", 1092, 540, { anchor: "end", size: DS.type.small, c: DS.c("red", 2), t: W(15, 19), parent: g }); }
  const F = dave(S, 1450, 960, "near", { look: -8, mood: "wow", pose: "head" });
  bag(S, 1180, 950, 1.3, "orange"); bag(S, 1700, 960, 1.2, "purple");
  card(S, "20 MINUTES", 1450, 560, { t: W(15, 13), size: DS.type.caption });
  fin(S); }

// In those twenty minutes, he was supposed to spend nearly fourteen million.
{ const S = sc(16, 0, { cam: "push", focus: "900 560" }); DS.room(S, ROOM);
  DS.shape(S, rect(560, 860, 700, 18), "wood", { tone: 1, w: "detail" });
  DS.shape(S, rect(660, 852, 90, 8), "green", { w: "detail" }); DS.shape(S, rect(1000, 300, 90, 560), "red", { w: "mid" });
  card(S, "SPENT $400", 705, 780, { t: W(16, 0), size: DS.type.caption }); card(S, "$14 MILLION", 1045, 240, { t: W(16, 5), tc: "red" });
  { const g = S.grp(); S.draw(`M1130 300 L1130 850`, S.start, 0, { c: DS.c("red"), w: DS.w.near, parent: g }); S.draw(`M1100 330 L1130 290 L1160 330 M1100 820 L1130 860 L1160 820`, S.start, 0, { c: DS.c("red"), w: DS.w.near, parent: g }); fadeG(S, g, W(16, 9)); }
  const F = dave(S, 1560, 960, "near", { look: -8, mood: "worried", pose: "think" });
  fin(S); }

// Then there's his credit card. It has a five-thousand-dollar limit, which at prize speed lasts less than half a second.
{ const S = sc(17, 0, { cam: "push", focus: "900 560" }); DS.room(S, ROOM);
  const cc = creditCard(S, 640, 450, 1.0);
  txt(S, "LIMIT", 640, 700, { size: DS.type.small, t: W(17, 5), c: DS.c("navy", 2) }); txt(S, "$5,000", 640, 800, { size: DS.type.title, t: W(17, 7), c: DS.c("red", 2) });
  const sw = stopwatch(S, 1330, 530, 170, { go: W(17, 13), dur: 0.5, deg: 6 }); fadeG(S, sw, W(17, 10));
  txt(S, "0.4 SECONDS", 1330, 800, { size: DS.type.title, t: W(17, 14), c: DS.c("red", 2) });
  const F = dave(S, 1730, 960, "near", { s: 0.95, look: -8, mood: "flat", pose: "shrug" });
  fin(S); }

// Fine. I'll take the whole thing in cash.
{ const S = sc(18, 0, { cam: "push", focus: "800 580" }); DS.outdoor(S, NIGHT); street(S, NIGHT, { zebra: 1500 });
  const F = dave(S, 640, 960, "near", { s: 1.45, look: 4, mood: "determined", pose: "point" }); talk(S, F, W(18, 0), END(18));
  say(S, 1000, 300, 500, 150, 700, 600, ["“FINE. I'LL TAKE THE WHOLE", "THING IN CASH.”"], W(18, 0), { size: DS.type.small });
  note(S, 1500, 560, 1.7, { t: W(18, 6), val: "100" }); bundle(S, 1430, 760, 1.3, { t: W(18, 7) }); bundle(S, 1620, 790, 1.3, { t: W(18, 7) + 0.15 });
  fin(S); }

// But the bank doesn't open until nine, and by then, more than a third of Dave's day is gone.
{ const S = sc(19, 0, { cam: "push", focus: "1100 600" }); DS.outdoor(S, DAWN); street(S, DAWN, { zebra: 200 });
  columns(S, 1250, 960, 1.0, "BANK", { layer: "mid" });
  card(S, "OPENS 9 AM", 1250, 800, { t: W(19, 4), tc: "red", size: DS.type.caption });
  const F = dave(S, 640, 960, "near", { look: 6, mood: "tired", pose: "cross" });
  card(S, "A THIRD GONE", 700, 450, { t: W(19, 11), tc: "red", size: DS.type.caption });
  fin(S); }

// ===================== 3. Ten tonnes of cash =====================
// bank counter strip along the back wall (teller window), for the bank scenes
const counter = (S, x0, x1, top) => { DS.shape(S, rect(x0, top, x1 - x0, 24), "wood", { tone: 1, w: "mid" }); DS.shape(S, rect(x0, top + 24, x1 - x0, 130), "wood", { tone: 2, flat: true, w: "detail" }); S.draw(rect(x0 + 20, top - 150, x1 - x0 - 40, 150), S.start, 0, { fill: DS.c("glass", 0), c: DS.c("gray", 2), w: DS.w.detail, op: 0.55 }); };

// Here's the thing about cash. An American banknote weighs about one gram, whatever it's worth,
{ const S = sc(20, 0, { cam: "push", focus: "960 600" }); DS.room(S, BANK);
  [[470, "1", "$1"], [1450, "100", "$100"]].forEach(([x, v, lab], i) => {
    scaleBox(S, x, 900, 1.2, "1 G", { tt: W(20, 8) + i * 0.4 });
    note(S, x, 700, 1.4, { val: v, t: W(20, i ? 11 : 6), name: "green", tone: i ? 0 : 1 });
  });
  card(S, "1 GRAM", 960, 170, { t: W(20, 9) }); card(S, "WHATEVER IT'S WORTH", 960, 300, { t: W(20, 11), size: DS.type.caption });
  const F = dave(S, 960, 960, "near", { look: 0, mood: "flat", pose: "shrug" });
  fin(S); }

// and the biggest note still issued is the hundred.
{ const S = sc(20, 15, { cam: "push", focus: "960 540" }); DS.room(S, BANK);
  const V = ["$1", "$5", "$10", "$20", "$50", "$100"], X = [330, 550, 770, 990, 1210, 1430];
  V.forEach((v, i) => { note(S, X[i], 520, 0.8, { t: W(20, 16) + i * 0.18, tone: i % 3 }); txt(S, v, X[i], 640, { t: W(20, 16) + i * 0.18, size: DS.type.small }); });
  S.draw(circ(X[5], 520, 130, 90), W(20, 21), 0, { c: DS.c("red"), w: DS.w.near }); card(S, "THE BIGGEST", 1430, 380, { t: W(20, 17), tc: "red" });
  const F = dave(S, 1730, 960, "near", { look: -6, mood: "flat" });
  fin(S); }

// So a billion dollars in cash is ten million notes, about ten tonnes of paper,
{ const S = sc(21, 0, { cam: "push", focus: "960 640" }); DS.room(S, BANK);
  cashPile(S, 960, 910, 1.0, 7, { t0: W(21, 7), dt: 0.3 });
  countUp(S, 960, 240, 0, 1e7, W(21, 6), WE(21, 9) - W(21, 6), { size: DS.type.display, c: DS.c("green", 2), ease: "power1.out" });
  txt(S, "NOTES", 960, 320, { size: DS.type.title, t: W(21, 8) });
  card(S, "10 TONNES", 1560, 520, { t: W(21, 11), tc: "red" });
  const F = dave(S, 220, 960, "near", { s: 0.95, look: 8, mood: "wow", pose: "head" });
  fin(S); }

// roughly the weight of two big elephants.
{ const S = sc(21, 15, { cam: "push", focus: "960 640" }); DS.room(S, BANK);
  const px = 960, py = 790, pl = S.grp();
  DS.shape(S, `M${px - 90} ${py + 150} L${px} ${py + 8} L${px + 90} ${py + 150} Z`, "gray", { tone: 2, w: "mid" });
  DS.shadow(S, px, py + 152, 600);
  DS.shape(S, rrect(210, py - 4, 1500, 40, DS.r.xs), "wood", { w: "mid", parent: pl });
  cashPile(S, 500, py - 4, 0.66, 6, { parent: pl });
  [[1240, 0], [1560, 0.3]].forEach(([x, dt], i) => elephant(S, x, py - 4, 0.6, { parent: pl, t: W(21, 18) + dt }));
  const tf = (a) => `rotate(${a} ${px} ${py})`; pl.setAttribute("transform", tf(-5));
  tl.fromTo(pl, { attr: { transform: tf(-5) } }, { attr: { transform: tf(0) }, duration: 1.4, ease: "power2.inOut", immediateRender: false }, W(21, 19));
  card(S, "10 TONNES", 500, 280, { t: W(21, 15), tc: "red" }); card(S, "2 ELEPHANTS", 1400, 280, { t: W(21, 19) });
  const F = dave(S, 180, 960, "near", { s: 0.9, look: 8, mood: "wow", pose: "head" });
  fin(S); }

// Stacked up, they'd make a tower about a kilometre high, taller than any building on Earth.
{ const S = sc(22, 0, { cam: "none" }); DS.outdoor(S, DAY);
  el("path", { d: "M-200 -3600 H2120 V-200 H-200 Z", fill: DS.vgrad(DS.P.navy[2], DS.P.sky[2]) }, S.g);
  [[300, -600, 170], [1500, -900, 220], [420, -1500, 190], [1480, -1750, 150]].forEach(([x, y, r]) => S.fill(circ(x, y, r, r * 0.45), S.start, 0, DS.P.white[0], 0.85));
  // the cash tower (to -1750) and the tallest building (to -1109, spire included)
  DS.shape(S, rect(1100, -1750, 170, 2650), "green", { tone: 1, dir: "h", w: "mid" });
  let d = ""; for (let y = 880; y > -1740; y -= 70) d += `M1100 ${y} H1270 `; S.draw(d, S.start, 0, { c: DS.c("green", 2), w: DS.w.hair });
  DS.shape(S, rect(640, -1000, 180, 1900), "gray", { tone: 1, dir: "h", w: "mid" }); DS.shape(S, `M700 -1000 L730 -1109 L760 -1000 Z`, "gray", { tone: 2, w: "mid" });
  d = ""; for (let y = 860; y > -980; y -= 90) d += `M660 ${y} H800 `; S.draw(d, S.start, 0, { c: DS.c("gray", 2), w: DS.w.detail });
  const F = dave(S, 940, 960, "near", { s: 0.95, look: 0, mood: "wow" });
  S.pan(0, 1900, W(22, 4), 3.8, "power2.inOut");
  card(S, "ABOUT 1 KM", 1560, -1560, { t: W(22, 8), size: DS.type.small, tc: "red" });
  card(S, "TALLEST BUILDING", 600, -1250, { t: W(22, 11), size: DS.type.caption }); }

// Dave has come with a backpack.
{ const S = sc(23, 0, { cam: "push", focus: "1000 640" }); DS.room(S, BANK); counter(S, 380, 1540, 620);
  cashPile(S, 1330, 900, 1.0, 6);
  const F = dave(S, 560, 960, "near", { look: 8, mood: "flat", pose: "stand" });
  backpack(S, 760, 960, 1.5, 0, { t: W(23, 4) }); card(S, "BACKPACK", 790, 700, { t: W(23, 4) });
  fin(S); }

// America did once print a hundred-thousand-dollar note, in nineteen thirty-four.
{ const S = sc(24, 0, { cam: "push", focus: "960 540" }); DS.room(S, LAB2);
  note(S, 960, 500, 2.6, { val: "100,000", name: "gold", tone: 1, t: W(24, 4) });
  card(S, "1934", 960, 790, { t: W(24, 7), size: DS.type.title });
  const F = dave(S, 1680, 960, "near", { s: 0.95, look: -8, mood: "wow" });
  fin(S); }

// With those, his billion would weigh about ten kilos.
{ const S = sc(24, 10, { cam: "push", focus: "960 600" }); DS.room(S, BANK);
  scaleBox(S, 640, 900, 1.5, "10 KG", { tt: W(24, 14) });
  cashPile(S, 640, 900 - 150, 0.55, 3, { t0: W(24, 13), dt: 0.1 });
  card(S, "10,000 NOTES", 640, 360, { t: W(24, 11) });
  const F = dave(S, 1180, 960, "near", { look: -6, mood: "happy", pose: "hips" });
  backpack(S, 1500, 960, 1.5, 1, { t: W(24, 14) });
  fin(S); }

// But that note was only ever for moving money between Federal Reserve Banks, so Dave gets the elephants.
{ const S = sc(25, 0, { cam: "push", focus: "900 600" }); DS.room(S, BANK);
  columns(S, 330, 760, 0.55, "BANK", { layer: "mid" }); columns(S, 900, 760, 0.55, "BANK", { layer: "mid" });
  const nt = note(S, 330, 560, 0.5, { name: "gold", tone: 1, t: W(25, 5) });
  tl.fromTo(nt, { attr: { transform: "translate(0 0)" } }, { attr: { transform: "translate(570 0)" }, duration: 2.0, ease: "power1.inOut", immediateRender: false }, W(25, 6));
  stamp(S, 615, 330, "BANKS ONLY", W(25, 4), "red", { size: DS.type.body });
  elephant(S, 1150, 960, 0.5, { t: W(25, 15) }); elephant(S, 1640, 960, 0.5, { t: W(25, 16) });
  const F = dave(S, 1400, 960, "near", { s: 0.95, look: 0, mood: "flat", pose: "stand" });
  fin(S); }

// And counting the notes, one every second, would take about a hundred and sixteen days. Dave has fifteen hours.
{ const S = sc(26, 0, { cam: "push", focus: "960 560" }); DS.room(S, BANK);
  const cg = calGrid(S, 220, 280, 12, 10, 44, 34, { t: W(26, 6) });
  cg.C.slice(0, 116).forEach(([cx, cy], i) => S.fill(rect(cx - 20, cy - 15, 40, 30), W(26, 8) + (i / 116) * 2.6, 0, DS.c("yellow", 1), 0.95));
  countUp(S, 490, 760, 0, 116, W(26, 8), 2.6, { size: DS.type.title, fmt: (n) => Math.round(n) + " DAYS", c: DS.c("red", 2), ease: "none" });
  dayClock(S, 1440, 480, 180, {}); txt(S, "15 HOURS", 1440, 790, { size: DS.type.title, t: W(26, 15), c: DS.c("red", 2) });
  const F = dave(S, 980, 960, "near", { look: 6, mood: "tired", pose: "hold" });
  const [hx, hy] = F.hand("R", "hold"); note(S, hx + 4, hy - 8, 0.4);
  fin(S, { noClock: true }); }

// So he takes out just a hundred thousand dollars. It weighs about a kilo, and it fits in the backpack.
{ const S = sc(27, 0, { cam: "push", focus: "960 600" }); DS.room(S, BANK); counter(S, 380, 1540, 620);
  const F = dave(S, 460, 960, "near", { look: 6, mood: "smile", pose: "stand" });
  card(S, "$100,000", 960, 200, { t: W(27, 4) });
  scaleBox(S, 1500, 900, 1.0, "1 KG", { tt: W(27, 10) }); bundle(S, 1500, 770, 1.1, { t: W(27, 9) });
  backpack(S, 960, 960, 1.7, 1, { t: W(27, 15) });
  fin(S); }

// ===================== 4. A hundred thousand forms =====================
const SHOW = { wall: "glass", floor: "gray", window: false };
// showroom floor: a pale turntable disc under the car
const turntable = (S, cx, cy, w) => { DS.shape(S, circ(cx, cy, w / 2, w * 0.09), "white", { flat: true, tone: 2, w: "detail" }); S.draw(circ(cx, cy, w * 0.4, w * 0.07), S.start, 0, { c: DS.c("gray", 1), w: DS.w.hair }); };

// His first stop is a car showroom, where the whole backpack goes on the shiniest car in the building.
{ const S = sc(28, 0, { cam: "push", focus: "960 640" }); DS.room(S, SHOW);
  turntable(S, 930, 890, 900);
  car(S, 900, 880, 2.0, "red", { layer: "near" });
  S.fill(`M720 600 Q800 540 900 546 L860 600 Z`, S.start, 0, DS.P.white[0], 0.45);
  backpack(S, 1140, 690, 0.85, 1, { t: W(28, 8) }); card(S, "$100,000", 1140, 440, { t: W(28, 9), size: DS.type.small });
  const F = dave(S, 330, 960, "near", { look: 8, mood: "smile", pose: "reach" });
  const D = who(S, 1680, 960, "near", Object.assign({}, DEALER, { look: -8, pose: "cross" }));
  nameTag(S, D, "CAR DEALER", W(28, 4), { y: 880, size: DS.type.caption });
  card(S, "SHINIEST CAR", 900, 190, { t: W(28, 12) });
  fin(S); }

// At prize speed, that's under nine seconds of shopping.
{ const S = sc(28, 19, { cam: "push", focus: "960 540" }); DS.room(S, SHOW);
  const sw = stopwatch(S, 640, 540, 200, { go: W(28, 20), dur: 1.6, deg: 52 }); fadeG(S, sw, W(28, 19));
  countUp(S, 1260, 520, 0, 8.6, W(28, 20), 1.6, { size: DS.type.display, fmt: (n) => n.toFixed(1) + " S", c: DS.c("red", 2), ease: "none" });
  txt(S, "OF SHOPPING", 1260, 620, { size: DS.type.title, t: W(28, 24) });
  car(S, 1500, 960, 0.9, "red", { layer: "near", t: S.start });
  const F = dave(S, 330, 960, "near", { look: 6, mood: "flat", pose: "shrug" });
  fin(S); }

// Cash over ten thousand, son? That's a form. Every single time.
{ const S = sc(29, 0, { cam: "push", focus: "800 600" }); DS.room(S, SHOW);
  const D = who(S, 620, 960, "near", Object.assign({}, DEALER, { s: 1.5, look: 4, pose: "point" })); talk(S, D, W(29, 0), END(29));
  say(S, 1040, 270, 540, 150, 720, 560, ["“CASH OVER TEN THOUSAND, SON?", "THAT'S A FORM. EVERY TIME.”"], W(29, 0), { size: DS.type.small });
  form(S, 1560, 600, 0.95, { t: W(29, 5), stamp: "FORM" });
  nameTag(S, D, "CAR DEALER", W(29, 0), { y: 900, size: DS.type.caption });
  fin(S); }

// He's right. In America, a business that takes more than ten thousand dollars in cash
{ const S = sc(30, 0, { cam: "push", focus: "960 600" }); DS.outdoor(S, DAY); street(S, DAY);
  house(S, 1260, 930, 1.5, "sand", { roof: "blue", layer: "near" }); card(S, "A BUSINESS", 1260, 330, { t: W(30, 4) });
  bundle(S, 390, 820, 1.3, { t: W(30, 8) }); bundle(S, 390, 750, 1.3, { t: W(30, 9) }); bundle(S, 390, 680, 1.3, { t: W(30, 10) });
  card(S, "OVER $10,000", 400, 450, { t: W(30, 8), tc: "red" });
  arrowR(S, 600, 760, 940, 760, W(30, 12));
  fin(S); }

// has to report it to the government within fifteen days.
{ const S = sc(30, 15, { cam: "push", focus: "960 600" }); DS.outdoor(S, DAY); street(S, DAY);
  house(S, 330, 930, 1.1, "sand", { roof: "blue", layer: "near" });
  columns(S, 960, 930, 0.62, "", { layer: "near" }); card(S, "GOVERNMENT", 960, 330, { t: W(30, 20), size: DS.type.caption });
  const fm = form(S, 330, 560, 0.3, { t: W(30, 16) });
  tl.fromTo(fm, { attr: { transform: "translate(0 0)" } }, { attr: { transform: "translate(630 120)" }, duration: 2.2, ease: "power1.inOut", immediateRender: false }, W(30, 17));
  const cg = calGrid(S, 1300, 250, 5, 3, 82, 72, { t: W(30, 22) });
  cg.C.forEach(([cx, cy], i) => S.fill(rect(cx - 38, cy - 33, 76, 66), W(30, 22) + 0.2 + i * 0.1, 0, DS.c("yellow", 1), 0.95));
  card(S, "15 DAYS", 1505, 540, { t: W(30, 22), tc: "red" });
  fin(S); }

// Spend a billion that way, just over ten thousand at a time, and that's nearly a hundred thousand forms.
{ const S = sc(31, 0, { cam: "push", focus: "900 560" }); DS.room(S, ROOM);
  card(S, "EVERY $10,001 = 1 FORM", 960, 190, { t: W(31, 5) });
  for (let r = 0; r < 3; r++) for (let c = 0; c < 10; c++) form(S, 250 + c * 150 + (r % 2) * 40, 340 + r * 180, 0.26, { t: W(31, 12) + (r * 10 + c) * 0.045 });
  countUp(S, 900, 910, 0, 99990, W(31, 13), WE(31, 17) - W(31, 13), { size: DS.type.display, c: DS.c("red", 2), ease: "power1.out", fmt: (n) => Math.round(n).toLocaleString("en-US") + " FORMS" });
  const F = dave(S, 1740, 960, "near", { s: 0.95, look: -8, mood: "worried" });
  fin(S); }

// Each one asks for Dave's occupation, and he's no longer sure what to put.
{ const S = sc(32, 0, { cam: "push", focus: "800 540" }); DS.room(S, ROOM);
  form(S, 760, 520, 1.5, { occ: true });
  const F = dave(S, 1450, 960, "near", { s: 1.2, look: -6, mood: "worried", pose: "think" });
  say(S, 1450, 300, 330, 170, 1450, 560, ["WINNER?", "SHOPPER?", "???"], W(32, 7), { think: true, size: DS.type.caption });
  card(S, "OCCUPATION", 760, 130, { t: W(32, 4), tc: "red" });
  fin(S); }

// His money would be gone by midnight, and the forms would keep arriving for two weeks.
{ const S = sc(33, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM);
  dayClock(S, 520, 500, 190, { h: 24 }); txt(S, "GONE BY MIDNIGHT", 520, 800, { size: DS.type.small, t: W(33, 4) });
  const cg = calGrid(S, 1060, 400, 7, 2, 96, 120, { t: W(33, 7) });
  cg.C.forEach(([cx, cy], i) => form(S, cx, cy, 0.2, { t: W(33, 9) + i * 0.17 }));
  txt(S, "2 WEEKS OF FORMS", 1396, 750, { size: DS.type.small, t: W(33, 12), c: DS.c("red", 2) });
  const F = dave(S, 960, 960, "near", { s: 0.95, look: 0, mood: "tired", pose: "sad" });
  fin(S, { noClock: true }); }

// By noon, Dave has spent about a hundred thousand dollars, and he still has nine hundred and ninety-nine million, nine hundred thousand left.
{ const S = sc(34, 0, { cam: "push", focus: "1000 560" }); DS.outdoor(S, DAY); street(S, DAY, { zebra: 200 });
  const F = dave(S, 460, 960, "near", { look: 8, mood: "flat", pose: "shrug" });
  backpack(S, 760, 960, 1.3, 0);
  const ph = mphone(S, 1180, 570, 1.35, {});
  txt(S, "BALANCE", 1180, 430, { size: DS.type.caption, c: DS.P.white[0], t: W(34, 3) });
  txt(S, "-$100,000", 1180, 520, { size: DS.type.small, c: DS.c("red", 1), t: W(34, 5) });
  txt(S, mon(999900000), 1180, 640, { size: DS.type.caption, c: DS.c("green", 1), t: W(34, 13) });
  fin(S); }

// ===================== 5. Think bigger =====================
const deskBlock = (S, x0, x1, top, gy = 960) => { DS.shadow(S, (x0 + x1) / 2, gy, x1 - x0 + 60); DS.shape(S, rect(x0 + 20, top + 24, x1 - x0 - 40, gy - top - 24), "wood", { tone: 2 }); DS.shape(S, rrect(x0, top, x1 - x0, 28, DS.r.xs), "wood"); };
const magnify = (S, cx, cy, r, o = {}) => { const g = S.grp(o.parent); DS.shape(S, circ(cx, cy, r), "glass", { w: "near", parent: g }); S.draw(line([cx + r * 0.7, cy + r * 0.7], [cx + r * 1.6, cy + r * 1.6], 0), S.start, 0, { c: DS.c("wood", 2), w: DS.w.near * 1.6, parent: g }); return fadeG(S, g, o.t); };

// Dave needs to think much bigger. A typical American home sells for about four hundred and seventeen thousand dollars.
{ const S = sc(35, 0, { cam: "push", focus: "960 560" }); DS.outdoor(S, DAY); street(S, DAY);
  const F = dave(S, 480, 960, "near", { look: 6, mood: "determined", pose: "think" });
  { const g = S.grp(); S.thought(1130, 400, 420, 270, 640, 640, S.start, 0.3, { parent: g }); house(S, 1130, 530, 1.4, "wall", { parent: g, roof: "red" }); fadeG(S, g, W(35, 6)); }
  card(S, "$417,500", 1130, 780, { t: W(35, 12), tc: "red" });
  fin(S); }

// A billion buys about two thousand four hundred of them, one every eighteen seconds until midnight.
{ const S = sc(36, 0, { cam: "pull", focus: "960 600" }); DS.outdoor(S, DAY, { hy: 430 });
  const rows = [[560, 0.26, 14], [650, 0.34, 11], [750, 0.44, 9], [860, 0.56, 7], [970, 0.7, 5]], nm = ["wall", "sand", "earth", "paper", "white"], rf = ["red", "blue", "orange", "purple", "green"];
  rows.forEach(([gy, k, n], r) => { const step = 1920 / n; for (let i = 0; i < n; i++) house(S, step * (i + 0.5) + (r % 2) * 20, gy, k, nm[(i + r) % 5], { roof: rf[(i * 2 + r) % 5], layer: r < 2 ? "far" : r < 4 ? "mid" : "near", t: W(36, 6) + r * 0.25 + i * 0.03 }); });
  countUp(S, 960, 250, 0, 2400, W(36, 3), WE(36, 9) - W(36, 3), { size: DS.type.display, fmt: (n) => Math.round(n).toLocaleString("en-US") + " HOMES", c: DS.c("red", 2), ease: "power1.out" });
  card(S, "ONE EVERY 18 SECONDS", 960, 350, { t: W(36, 10), size: DS.type.caption });
  fin(S); }

// So Dave rings an estate agent, who explains that even paying cash,
{ const S = sc(37, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM);
  S.draw(rect(950, 90, 20, 870), S.start, 0, { fill: DS.c("gray", 1), c: DS.P.ink[0], w: DS.w.hair });
  const F = dave(S, 560, 960, "near", { look: 6, mood: "determined", armR: ARM.up });
  const [hx, hy] = F.hand("R"); mphone(S, hx + 4, hy - 70, 0.3, { screen: "green", tone: 0 });
  const A = who(S, 1400, 960, "near", Object.assign({}, AGENT, { look: -6, mood: "smile", pose: "hold" })); talk(S, A, W(37, 5), WE(37, 11));
  deskBlock(S, 1150, 1700, 790);
  nameTag(S, A, "ESTATE AGENT", W(37, 3), { y: 330, size: DS.type.caption });
  dash(S.draw(`M${hx + 40} ${hy - 150} Q960 130 1350 ${hy - 120}`, W(37, 2), 0, { c: DS.c("blue"), w: DS.w.mid }), 18, 16);
  fin(S); }

// buying a house usually takes a week or two of title searches, inspections and signatures.
{ const S = sc(37, 12, { cam: "push", focus: "960 560" }); DS.room(S, ROOM);
  card(S, "A WEEK OR TWO", 960, 170, { t: W(37, 17) });
  const X = [400, 960, 1520], T = [W(37, 22), W(37, 24), W(37, 26)], L = ["TITLE SEARCH", "INSPECTION", "SIGNATURES"];
  X.forEach((x, i) => { const pg = panel(S, x, 540, 420, 440); fadeG(S, pg, T[i]); txt(S, L[i], x, 840, { size: DS.type.caption, t: T[i] }); });
  { const g = S.grp(); form(S, 400, 540, 0.62, { parent: g }); magnify(S, 460, 580, 56, { parent: g }); fadeG(S, g, T[0]); }
  { const g = S.grp(); house(S, 960, 640, 1.2, "wall", { parent: g, roof: "red" }); tick(S, 1060, 520, 1.6, T[1]); fadeG(S, g, T[1]); }
  { const g = S.grp(); form(S, 1520, 540, 0.62, { parent: g }); S.draw(`M1440 640 q20 -40 40 0 t40 0 t40 0`, S.start, 0, { c: DS.c("blue", 2), w: DS.w.near, parent: g }); fadeG(S, g, T[2]); }
  fin(S); }

// Dave would own two thousand four hundred houses, sometime next month.
{ const S = sc(38, 0, { cam: "push", focus: "900 600" }); DS.outdoor(S, DAY);
  const F = dave(S, 560, 960, "near", { look: 0, mood: "flat", pose: "stand" });
  DS.shape(S, rect(1000 - 12, 560, 24, 400), "wood", { tone: 2, flat: true, w: "detail" });
  { const g = S.grp(); DS.shape(S, rrect(780, 560, 440, 220, DS.r.sm), "white", { w: "mid", parent: g }); txt(S, "OWNED TODAY", 1000, 640, { size: DS.type.caption, t: W(38, 0), parent: g }); txt(S, "0", 1000, 750, { size: DS.type.display, t: W(38, 0), c: DS.c("red", 2), parent: g }); }
  { const pg = panel(S, 1520, 560, 560, 560); const g = S.grp(); DS.shape(S, rect(1240, 280, 560, 90), "red", { w: "detail", parent: g }); txt(S, "NEXT MONTH", 1520, 340, { size: DS.type.small, c: DS.P.white[0], t: W(38, 7), parent: g });
    for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) house(S, 1290 + c * 84, 510 + r * 100, 0.18, ["wall", "sand", "paper"][(r + c) % 3], { parent: g, roof: ["red", "blue", "orange"][(r * 2 + c) % 3] });
    fadeG(S, pg, W(38, 7)); fadeG(S, g, W(38, 7)); }
  txt(S, "2,400 HOUSES", 1520, 900, { size: DS.type.small, t: W(38, 3), c: DS.c("green", 2) });
  fin(S); }

// So what costs a billion dollars all by itself?
{ const S = sc(39, 0, { cam: "push", focus: "1000 560" }); DS.room(S, ROOM);
  DS.shape(S, rect(1330, 820, 260, 140), "wood", { tone: 1, w: "mid" }); DS.shape(S, rrect(1320, 800, 280, 30, DS.r.xs), "wood", { w: "mid" });
  DS.shape(S, rrect(1280, 400, 360, 400, DS.r.md), "paper", { w: "near" }); txt(S, "?", 1460, 700, { size: DS.type.display, c: DS.c("red", 2), t: W(39, 6) });
  priceTag(S, 1000, 420, "$1 BILLION", { t: W(39, 4) });
  const F = dave(S, 520, 960, "near", { look: 6, mood: "worried", pose: "think" });
  card(S, "ALL BY ITSELF", 960, 170, { t: W(39, 6) });
  fin(S); }

// A standard rocket launch costs about seventy-four million dollars.
{ const S = sc(40, 0, { cam: "push", focus: "900 560" }); DS.outdoor(S, DAY, { hy: 700 });
  const tw = 440; DS.shape(S, rect(tw - 40, 260, 80, 700), "gray", { layer: "mid", tone: 1, dir: "h", w: "mid" }); for (let y = 340; y < 940; y += 90) S.draw(`M${tw - 40} ${y} L${tw + 40} ${y + 90} M${tw + 40} ${y} L${tw - 40} ${y + 90}`, S.start, 0, { c: DS.c("gray", 2, "mid"), w: DS.w.detail });
  rocket(S, 900, 940, 1.6); priceTag(S, 1090, 560, "$74 MILLION", { t: W(40, 5) });
  card(S, "ONE ROCKET LAUNCH", 960, 170, { t: W(40, 1) });
  const F = dave(S, 1650, 960, "near", { s: 0.95, look: -8, mood: "wow" });
  fin(S); }

// A billion buys thirteen of them, and Dave has nothing to put on any of them.
{ const S = sc(40, 9, { cam: "push", focus: "900 600" }); DS.outdoor(S, DAY, { hy: 700 });
  for (let i = 0; i < 13; i++) rocket(S, 190 + i * 116, 930, 0.55, { t: W(40, 12) + i * 0.12 });
  card(S, "x 13", 960, 190, { t: W(40, 11), size: DS.type.title });
  card(S, "NOTHING TO PUT ON THEM", 960, 330, { t: W(40, 17), tc: "red", size: DS.type.small });
  const F = dave(S, 1790, 960, "near", { s: 0.95, look: -8, mood: "flat", pose: "shrug" });
  fin(S); }

// NASA's Webb Space Telescope cost about nine point seven billion dollars,
{ const S = sc(41, 0, { cam: "push", focus: "960 480" }); DS.room(S, { wall: "navy", floor: "navy", window: false });
  DS.shape(S, rect(940, 700, 40, 180), "gray", { tone: 1, dir: "h", w: "mid" }); DS.shape(S, rrect(780, 860, 360, 40, DS.r.sm), "gray", { tone: 2, w: "mid" });
  mirror(S, 960, 490, 70, { t: S.start });
  card(S, "WEBB SPACE TELESCOPE", 960, 115, { t: W(41, 1), size: DS.type.small });
  priceTag(S, 1290, 800, "$9.7 BILLION", { t: W(41, 5) });
  fin(S); }

// so a billion buys you roughly a tenth of a space telescope.
{ const S = sc(41, 11, { cam: "push", focus: "960 480" }); DS.room(S, { wall: "navy", floor: "navy", window: false });
  mirror(S, 960, 330, 62, { t: S.start });
  const bx = 270; for (let i = 0; i < 10; i++) { DS.shape(S, rrect(bx + i * 140, 640, 120, 120, DS.r.sm), i === 0 ? "green" : "gray", { tone: i === 0 ? 1 : 1, flat: true, w: "mid", t: W(41, 15) + i * 0.08 }); }
  txt(S, "YOURS", bx + 60, 830, { size: DS.type.caption, t: W(41, 16), c: DS.P.white[0] }); tick(S, bx + 60, 700, 1.6, W(41, 17));
  txt(S, "ABOUT 1/10", 960, 910, { size: DS.type.title, t: W(41, 17), c: DS.P.white[0] });
  fin(S); }

// Which tenth? Can I have the gold bit?
{ const S = sc(42, 0, { cam: "push", focus: "900 600" }); DS.room(S, { wall: "navy", floor: "navy", window: false });
  const M = mirror(S, 1450, 570, 80, { t: S.start });
  const F = dave(S, 640, 960, "near", { s: 1.45, look: 8, mood: "happy", pose: "point" }); talk(S, F, W(42, 0), END(42));
  say(S, 780, 250, 440, 140, 660, 470, ["“WHICH TENTH? CAN I", "HAVE THE GOLD BIT?”"], W(42, 0), { size: DS.type.small });
  S.draw(circ(M.hexes[4][0], M.hexes[4][1], 96), W(42, 5), 0, { c: DS.c("red"), w: DS.w.near });
  fin(S); }

// All the gold on Webb's mirrors weighs about fifty grams.
{ const S = sc(43, 0, { cam: "push", focus: "900 560" }); DS.room(S, { wall: "navy", floor: "navy", window: false });
  scaleBox(S, 620, 900, 1.5, "50 G", { tt: W(43, 6) });
  { const g = S.grp(); DS.shape(S, circ(620, 716, 56), "gold", { w: "mid", parent: g }); S.fill(circ(596, 692, 16, 10), S.start, 0, DS.P.white[0], 0.7, g); fadeG(S, g, W(43, 4)); }
  mirror(S, 1380, 500, 66, { t: W(43, 2) });
  card(S, "ALL THE GOLD", 960, 170, { t: W(43, 1) });
  card(S, "50 GRAMS", 620, 330, { t: W(43, 7), tc: "red" });
  fin(S); }

// Dave's tenth would weigh about the same as five of his banknotes.
{ const S = sc(43, 9, { cam: "push", focus: "900 560" }); DS.room(S, { wall: "navy", floor: "navy", window: false });
  scaleBox(S, 620, 900, 1.5, "5 G", { tt: W(43, 13) });
  for (let i = 0; i < 5; i++) note(S, 620 + (i - 2) * 26, 706 - i * 22, 0.7, { t: W(43, 17) + i * 0.15, tone: i % 3 });
  card(S, "5 BANKNOTES", 620, 330, { t: W(43, 17), tc: "red" });
  const F = dave(S, 1300, 960, "near", { look: -6, mood: "happy", pose: "hips" });
  card(S, "DAVE'S TENTH", 1300, 430, { t: W(43, 9) });
  fin(S); }

// And in twenty twenty-five, a university in Michigan opened a twelve-storey hospital
{ const S = sc(44, 0, { cam: "push", focus: "960 560" }); DS.outdoor(S, DAY, { hy: 700 });
  hospital(S, 960, 920, 1.1);
  card(S, "MICHIGAN, 2025", 520, 330, { t: W(44, 2), size: DS.type.caption });
  card(S, "12 STOREYS", 1560, 330, { t: W(44, 9), tc: "blue" });
  fin(S); }

// with two hundred and sixty-four private rooms and twenty operating rooms.
{ const S = sc(44, 11, { cam: "push", focus: "960 560" }); DS.room(S, ROOM);
  { const P = panel(S, 590, 540, 800, 520); fadeG(S, P, W(44, 12));
    for (let r = 0; r < 12; r++) { const rg = S.grp(); for (let c = 0; c < 22; c++) DS.shape(S, rect(240 + c * 34, 330 + r * 30, 28, 24), "sky", { flat: true, tone: c % 2, w: "hair", parent: rg }); fadeG(S, rg, W(44, 12) + r * 0.12, 0.25); }
    card(S, "264 PRIVATE ROOMS", 590, 830, { t: W(44, 13), size: DS.type.caption }); }
  { const P = panel(S, 1400, 540, 560, 520); fadeG(S, P, W(44, 19));
    for (let r = 0; r < 4; r++) for (let c = 0; c < 5; c++) DS.shape(S, rrect(1175 + c * 100, 380 + r * 100, 80, 80, DS.r.sm), "red", { flat: true, tone: 1, w: "detail", t: W(44, 19) + (r * 5 + c) * 0.05 });
    card(S, "20 OPERATING ROOMS", 1400, 830, { t: W(44, 20), size: DS.type.caption }); }
  fin(S); }

// It cost about nine hundred and twenty million dollars, and took about a decade of planning.
{ const S = sc(45, 0, { cam: "push", focus: "960 560" }); DS.outdoor(S, DAY, { hy: 700 });
  hospital(S, 480, 920, 0.95); priceTag(S, 700, 640, "$920 MILLION", { t: W(45, 3) });
  { const P = panel(S, 1500, 480, 560, 520); fadeG(S, P, W(45, 9)); const cg = calGrid(S, 1240, 370, 5, 2, 104, 96, { t: W(45, 10) }); cg.C.forEach(([cx, cy], i) => S.fill(rect(cx - 50, cy - 46, 100, 92), W(45, 10) + i * 0.2, 0, DS.c("yellow", 1), 0.95)); txt(S, "ONE DECADE", 1500, 650, { size: DS.type.title, t: W(45, 11), c: DS.c("red", 2) }); txt(S, "OF PLANNING", 1500, 730, { size: DS.type.small, t: W(45, 13) }); }
  fin(S); }

// Dave doesn't have a decade. It's two in the afternoon, and he sits down on the pavement, next to his empty backpack.
{ const S = sc(46, 0, { cam: "pull", focus: "960 640" }); DS.outdoor(S, DAWN); street(S, DAWN, { zebra: 1500 });
  const F1 = dave(S, 880, 960, "near", { look: 4, mood: "sad", pose: "sad" }); tl.to(F1.all, { opacity: 0, duration: 0.4 }, W(46, 11));
  const F2 = who(S, 900, 930, "near", Object.assign({}, DAVE, { sit: true, legL: [[70, 4], [140, 8]], legR: [[82, 10], [154, 14]], mood: "sad", look: 4, t: W(46, 11) }));
  backpack(S, 1180, 960, 1.4, 0, { t: S.start });
  fin(S); }

// ===================== 6. Twelve cents each =====================
// small icons shared by the last chapters
const bulb = (S, cx, cy, k, o = {}) => { const g = S.grp(o.parent); S.draw(rays(cx, cy - 10 * k, 84 * k, 116 * k, 8, -2.9, 2.6), S.start, 0, { c: DS.c("gold", 2), w: DS.w.mid, parent: g }); DS.shape(S, circ(cx, cy, 58 * k), "yellow", { tone: 1, w: "mid", parent: g }); DS.shape(S, rrect(cx - 28 * k, cy + 52 * k, 56 * k, 40 * k, DS.r.xs), "gray", { w: "detail", parent: g }); return fadeG(S, g, o.t); };
const loaf = (S, cx, cy, k, o = {}) => { const g = S.grp(o.parent); DS.shape(S, rrect(cx - 130 * k, cy - 60 * k, 260 * k, 120 * k, 60 * k), "earth", { tone: 0, w: "mid", parent: g }); [-60, 0, 60].forEach((dx) => S.draw(line([cx + dx * k - 14 * k, cy - 34 * k], [cx + dx * k + 14 * k, cy + 6 * k], 0), S.start, 0, { c: DS.c("earth", 2), w: DS.w.mid, parent: g })); return fadeG(S, g, o.t); };
const scissors = (S, cx, cy, k, o = {}) => { const g = S.grp(o.parent); S.draw(line([cx - 70 * k, cy + 70 * k], [cx + 80 * k, cy - 80 * k], 0) + line([cx - 70 * k, cy - 70 * k], [cx + 80 * k, cy + 80 * k], 0), S.start, 0, { c: DS.c("gray", 2), w: DS.w.near * 1.4, parent: g }); [[-80, 80], [-80, -80]].forEach(([dx, dy]) => DS.shape(S, circ(cx + dx * k, cy + dy * k, 30 * k), "red", { w: "mid", parent: g })); return fadeG(S, g, o.t); };
const cup = (S, cx, cy, k, o = {}) => { const g = S.grp(o.parent); DS.shape(S, `M${cx - 70 * k} ${cy - 60 * k} H${cx + 70 * k} L${cx + 52 * k} ${cy + 70 * k} H${cx - 52 * k} Z`, "white", { tone: 2, w: "mid", parent: g }); S.draw(`M${cx + 70 * k} ${cy - 36 * k} Q${cx + 124 * k} ${cy - 20 * k} ${cx + 60 * k} ${cy + 20 * k}`, S.start, 0, { c: DS.line("near"), w: DS.w.mid, parent: g }); DS.shape(S, rect(cx - 66 * k, cy - 60 * k, 132 * k, 30 * k), "brown", { flat: true, w: "detail", parent: g }); return fadeG(S, g, o.t); };
const sack = (S, cx, cy, k, o = {}) => { const g = S.grp(o.parent); DS.shape(S, `M${cx - 80 * k} ${cy - 70 * k} Q${cx - 110 * k} ${cy + 20 * k} ${cx - 80 * k} ${cy + 80 * k} H${cx + 80 * k} Q${cx + 110 * k} ${cy + 20 * k} ${cx + 80 * k} ${cy - 70 * k} Z`, "sand", { w: "mid", parent: g }); DS.shape(S, `M${cx - 70 * k} ${cy - 70 * k} Q${cx} ${cy - 110 * k} ${cx + 70 * k} ${cy - 70 * k} Z`, "sand", { tone: 2, w: "mid", parent: g }); return fadeG(S, g, o.t); };
const laptopS = (S, cx, top, wd, ht, o = {}) => { const g = S.grp(o.parent); DS.shape(S, rrect(cx - wd / 2, top - ht, wd, ht, DS.r.sm), "gray", { tone: 2, w: "mid", parent: g }); DS.shape(S, rect(cx - wd / 2 + 16, top - ht + 16, wd - 32, ht - 38), o.screen || "sky", { flat: true, tone: 1, w: "hair", parent: g }); DS.shape(S, `M${cx - wd / 2 - 30} ${top} L${cx + wd / 2 + 30} ${top} L${cx + wd / 2 + 10} ${top - 18} L${cx - wd / 2 - 10} ${top - 18} Z`, "gray", { w: "detail", parent: g }); return g; };
const benchP = (S, x0, x1, top) => { DS.shadow(S, (x0 + x1) / 2, top + 168, x1 - x0 + 60); DS.shape(S, rect(x0, top, x1 - x0, 26), "wood", { w: "mid" }); DS.shape(S, rect(x0 + 24, top + 26, 24, 140), "wood", { tone: 2, flat: true, w: "detail" }); DS.shape(S, rect(x1 - 48, top + 26, 24, 140), "wood", { tone: 2, flat: true, w: "detail" }); DS.shape(S, rect(x0, top - 110, x1 - x0, 20), "wood", { tone: 1, w: "detail" }); DS.shape(S, rect(x0, top - 70, x1 - x0, 20), "wood", { tone: 1, w: "detail" }); };
// a button press: the group dips to 0.9 and comes back (no flash)
const press = (g, cx, cy, t) => { const tf = (k) => `translate(${cx} ${cy}) scale(${k}) translate(${-cx} ${-cy})`; tl.fromTo(g, { attr: { transform: tf(1) } }, { attr: { transform: tf(0.9) }, duration: 0.12, ease: "power2.in", immediateRender: false }, t); tl.to(g, { attr: { transform: tf(1) }, duration: 0.2, ease: "power2.out" }, t + 0.14); };

// Then Dave has one last idea. If he can't buy one enormous thing, he'll buy everybody on Earth a tiny thing.
{ const S = sc(47, 0, { cam: "push", focus: "960 560" }); DS.outdoor(S, DAY);
  const F = dave(S, 480, 960, "near", { s: 1.2, look: 6, mood: "happy", pose: "point" });
  bulb(S, 480, 380, 1.3, { t: W(47, 3) });
  { const g = S.grp(); globe(S, 1350, 520, 250, { parent: g }); fadeG(S, g, W(47, 15)); }
  [[1250, 430, "red"], [1400, 470, "blue"], [1330, 590, "purple"], [1460, 600, "orange"], [1220, 560, "green"], [1380, 380, "pink"]].forEach(([x, y, n], i) => { const g = S.grp(); DS.shape(S, rect(x - 22, y - 18, 44, 36), n, { w: "detail", parent: g }); S.draw(`M${x} ${y - 18} V${y + 18} M${x - 22} ${y} H${x + 22}`, S.start, 0, { c: DS.P.white[0], w: DS.w.hair, parent: g }); fadeG(S, g, W(47, 19) + i * 0.22, 0.3); });
  card(S, "A TINY THING EACH", 1350, 840, { t: W(47, 19), size: DS.type.caption });
  fin(S); }

// About eight point two billion people live on Earth.
{ const S = sc(48, 0, { cam: "push", focus: "960 600" }); DS.outdoor(S, DAY);
  crowdGrid(S, 160, 450, 23, 6, 72, 88, 0.85, W(48, 2), 0.4);
  countUp(S, 960, 260, 0, 8.2, W(48, 0), WE(48, 4) - W(48, 0), { size: DS.type.display, fmt: (n) => n.toFixed(1) + " BILLION", c: DS.c("red", 2), ease: "power1.out" });
  txt(S, "PEOPLE", 960, 350, { size: DS.type.title, t: W(48, 5) });
  fin(S); }

// Split a billion dollars between all of them, and everyone gets about twelve cents.
{ const S = sc(49, 0, { cam: "push", focus: "960 600" }); DS.outdoor(S, DAY);
  const F = dave(S, 330, 960, "near", { s: 1.15, look: 6, mood: "happy", pose: "reach" });
  bundle(S, 640, 640, 1.6, { t: W(49, 2) }); arrowR(S, 800, 640, 940, 640, W(49, 4));
  for (let r = 0; r < 3; r++) for (let c = 0; c < 5; c++) { const x = 1050 + c * 150, gy = 620 + r * 150; mini(S, x, gy, 1.4, { t: W(49, 5), c: DS.c(OC[(r * 3 + c) % 8], 2), fill: DS.c(OC[(r * 3 + c) % 8], 1) }); coin(S, x, gy - 150, 18, null, { t: W(49, 9) + (r * 5 + c) * 0.08 }); }
  card(S, "12 CENTS EACH", 1400, 250, { t: W(49, 11), tc: "red" });
  fin(S); }

// Mum, a man called Dave just sent me twelve cents.
{ const S = sc(50, 0, { cam: "push", focus: "800 600" }); DS.room(S, ROOM);
  const K = who(S, 600, 960, "near", Object.assign({}, KID, { s: 1.35, look: 6, mood: "wow", pose: "hold" })); talk(S, K, W(50, 0), END(50));
  card(S, "KID", 330, 700, { t: W(50, 0), size: DS.type.caption });
  say(S, 700, 240, 520, 130, 620, 440, ["“MUM, A MAN CALLED DAVE", "JUST SENT ME TWELVE CENTS.”"], W(50, 0), { size: DS.type.small });
  const ph = mphone(S, 1480, 560, 1.15, { screen: "green", tone: 2 }); txt(S, "NEW PAYMENT", 1480, 420, { size: DS.type.caption, c: DS.P.white[0], t: W(50, 5) }); txt(S, "+12 CENTS", 1480, 560, { size: DS.type.small, c: DS.c("green", 1), t: W(50, 8) }); txt(S, "FROM DAVE", 1480, 650, { size: DS.type.caption, c: DS.P.white[0], t: W(50, 5) });
  fin(S, { no: true }); }

// And with eight hours left, Dave would need to make about two hundred and eighty-five thousand payments every second,
{ const S = sc(51, 0, { cam: "push", focus: "800 600" }); DS.room(S, ROOM);
  const F = dave(S, 900, 960, "near", { look: -6, mood: "worried", pose: "reach" }); sweat(S, F, W(51, 8));
  deskBlock(S, 260, 780, 790); laptopS(S, 520, 790, 280, 190);
  countUp(S, 1400, 500, 0, 285000, W(51, 9), WE(51, 15) - W(51, 9), { size: DS.type.display, c: DS.c("red", 2), ease: "power1.out" });
  txt(S, "PAYMENTS", 1400, 600, { size: DS.type.title, t: W(51, 15) }); txt(S, "EVERY SECOND", 1400, 690, { size: DS.type.small, t: W(51, 17) });
  fin(S); }

// to eight billion sets of bank details.
{ const S = sc(51, 19, { cam: "push", focus: "960 560" }); DS.room(S, ROOM);
  panel(S, 880, 520, 640, 700);
  const lst = clipTo(S.grp(), rrect(580, 200, 600, 640, DS.r.md)), inner = S.grp(lst);
  for (let i = 0; i < 26; i++) txt(S, `${4000 + ((i * 7919) % 5999)} ${1000 + ((i * 4813) % 8999)} ${1000 + ((i * 3571) % 8999)}`, 880, 260 + i * 64, { parent: inner, c: DS.c("gray", 2) });
  shift(inner, W(51, 20), 4.6, [0, 0], [0, -900], "none");
  card(S, "8 BILLION SETS OF BANK DETAILS", 880, 120, { t: W(51, 19), size: DS.type.caption });
  const F = dave(S, 1560, 960, "near", { s: 1.1, look: -8, mood: "wow", pose: "head" });
  fin(S); }

// A billion dollars is enough to change one life completely. Or to change every life on Earth, by twelve cents.
{ const S = sc(52, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM);
  S.draw(rect(950, 120, 20, 800), S.start, 0, { fill: DS.c("gray", 1), c: DS.P.ink[0], w: DS.w.hair });
  const P = person(S, 480, 960, "near", 2, { s: 1.35, mood: "happy", pose: "armsUp", look: 0 });
  cashPile(S, 220, 940, 0.4, 4, { t0: W(52, 5), dt: 0.15 }); house(S, 760, 940, 0.9, "wall", { roof: "red", t: W(52, 7) });
  card(S, "ONE LIFE", 480, 230, { t: W(52, 5) });
  { const g = S.grp(); globe(S, 1430, 520, 230, { parent: g }); fadeG(S, g, W(52, 11)); }
  [[1330, 450], [1480, 430], [1400, 560], [1540, 580], [1300, 600]].forEach(([x, y], i) => coin(S, x, y, 24, null, { t: W(52, 17) + i * 0.15 }));
  card(S, "EVERY LIFE: 12 CENTS", 1430, 230, { t: W(52, 13), tc: "red", size: DS.type.caption });
  fin(S, { no: true }); }

// ===================== 7. Six forty-five =====================
// two banks joined by a wire through a hub. coins ride along the wire at the given times
const wireNet = (S, o = {}) => {
  columns(S, 330, 780, 0.5, "BANK", { layer: "mid" }); columns(S, 1590, 780, 0.5, "BANK", { layer: "mid" });
  columns(S, 960, 780, 0.5, "WIRE", { layer: "mid", name: "sky" });
  S.draw(`M440 700 H850 M1070 700 H1480`, S.start, 0, { c: DS.c("gray", 2), w: DS.w.near * 1.5 });
};

// At half past six, with his billion still in the bank,
{ const S = sc(53, 0, { cam: "push", focus: "1000 600" }); DS.outdoor(S, DAWN); street(S, DAWN, { zebra: 200 });
  columns(S, 1330, 960, 1.0, "BANK", { layer: "mid" });
  [[1130, 700], [1530, 700]].forEach(([x, y]) => S.fill(rect(x - 30, y - 90, 60, 90), S.start, 0, DS.c("yellow", 1), 0.8));
  benchP(S, 380, 860, 800);
  const F = who(S, 620, 851, "near", Object.assign({}, DAVE, { sit: true, mood: "tired", look: 6, pose: "hold" }));
  card(S, "STILL IN THE BANK", 1330, 330, { t: W(53, 6), size: DS.type.caption });
  fin(S); }

// Dave learns something worse. Even if he finds something to buy, the money has to get there.
{ const S = sc(53, 11, { cam: "push", focus: "960 560" }); DS.room(S, ROOM);
  columns(S, 330, 780, 0.55, "BANK", { layer: "mid" }); house(S, 1590, 780, 1.2, "sand", { roof: "blue", layer: "mid" });
  dash(S.draw(`M520 600 H1380`, W(53, 18), 0, { c: DS.c("gray", 2), w: DS.w.near }), 24, 20);
  card(S, "SOMETHING TO BUY", 1590, 330, { t: W(53, 16), size: DS.type.caption });
  card(S, "THE MONEY HAS TO GET THERE", 960, 170, { t: W(53, 22), size: DS.type.caption, tc: "red" });
  coinMove(S, [520, 600], [1360, 600], W(53, 23), 2.4, 26);
  const F = dave(S, 960, 960, "near", { s: 0.95, look: 0, mood: "worried", pose: "think" });
  fin(S); }

// Big payments between American banks often run through the Federal Reserve's wire system,
{ const S = sc(54, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM);
  wireNet(S);
  coinMove(S, [440, 700], [850, 700], W(54, 4), 1.4, 24); coinMove(S, [1070, 700], [1480, 700], W(54, 6) + 0.6, 1.4, 24);
  card(S, "BIG BANK PAYMENTS", 960, 190, { t: W(54, 0) });
  card(S, "THE WIRE SYSTEM", 960, 860, { t: W(54, 10), size: DS.type.small });
  fin(S); }

// and it stops taking customer payments at six forty-five in the evening, Eastern time.
{ const S = sc(55, 0, { cam: "push", focus: "800 560" }); DS.room(S, ROOM);
  dayClock(S, 540, 540, 260, { labels: true, cut: W(55, 7) });
  columns(S, 1480, 800, 0.5, "WIRE", { layer: "mid", name: "sky" });
  S.draw(`M1000 760 H1200`, S.start, 0, { c: DS.c("gray", 2), w: DS.w.near * 1.5 });
  barrier(S, 1240, 700, 240, W(55, 2));
  coinMove(S, [1000, 740], [1170, 740], W(55, 5), 1.0, 24, { stay: true });
  card(S, "6:45 PM", 1480, 330, { t: W(55, 7), tc: "red", size: DS.type.title }); card(S, "EASTERN TIME", 1480, 450, { t: W(55, 11), size: DS.type.caption });
  fin(S, { no: true }); }

// Dave's real deadline was never midnight. It's six forty-five, and it's already six forty-one.
{ const S = sc(56, 0, { cam: "none", focus: "800 520" }); DS.room(S, ROOM);
  dayClock(S, 800, 540, 300, { labels: true, cut: true });
  xMark(S, 800, 200, 0.9, W(56, 3)); card(S, "NOT MIDNIGHT", 800, 130, { t: W(56, 3), tc: "red", size: DS.type.caption });
  card(S, "6:45 PM", 1520, 330, { t: W(56, 6), tc: "red", size: DS.type.title });
  card(S, "4 MINUTES LEFT", 1520, 460, { t: W(56, 12), tc: "red", size: DS.type.caption });
  const F = dave(S, 1520, 960, "near", { look: -8, mood: "worried", pose: "head" }); sweat(S, F, W(56, 12));
  S.zoom(700, 500, 1.2, W(56, 11), 1.6);
  DS.vignette(S); }

// Four minutes? My trolley took twenty.
{ const S = sc(57, 0, { cam: "push", focus: "800 600" }); DS.room(S, STORE); shelves(S, 420, 170, 1080, 400, { rows: 2 });
  const F = dave(S, 560, 960, "near", { s: 1.45, look: 4, mood: "wow", pose: "head" }); talk(S, F, W(57, 0), END(57));
  say(S, 800, 250, 440, 120, 640, 520, ["“FOUR MINUTES?", "MY TROLLEY TOOK TWENTY.”"], W(57, 0), { size: DS.type.small });
  trolley(S, 1380, 960, 1.3);
  [[1130, "4 MIN", 24], [1560, "20 MIN", 120]].forEach(([x, s, d], i) => { const sw = stopwatch(S, x, 460, 100, { go: W(57, 1) + i * 0.2, dur: 1.5, deg: d }); fadeG(S, sw, W(57, 1) + i * 0.2); card(S, s, x, 640, { t: W(57, 1) + i * 0.2, size: DS.type.caption }); });
  fin(S); }

// He's lucky it's a weekday. On Saturdays and Sundays, that system doesn't run at all.
{ const S = sc(58, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM);
  const D = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  D.forEach((d, i) => { const x = 300 + i * 220, we = i >= 5, t = we ? W(58, 5) + (i - 5) * 0.4 : W(58, 1) + i * 0.1; DS.drop(S, rect(x + 6, 346, 200, 260)); const g = S.grp(); DS.shape(S, rect(x, 340, 200, 260), "white", { flat: true, w: "detail", parent: g }); DS.shape(S, rect(x, 340, 200, 56), we ? "red" : "green", { tone: 1, flat: true, w: "detail", parent: g }); txt(S, d, x + 100, 384, { parent: g, c: DS.P.white[0] }); fadeG(S, g, t);
    if (we) xMark(S, x + 100, 500, 1.8, W(58, 10) + (i - 5) * 0.3); else tick(S, x + 100, 500, 1.6, W(58, 3) + i * 0.1); });
  stamp(S, 1500, 720, "NO WIRE", W(58, 11), "red", { size: DS.type.body });
  const F = dave(S, 420, 960, "near", { look: 6, mood: "happy", pose: "shrug" });
  fin(S); }

// ===================== 8. Four minutes =====================
// A wedge of a stopwatch dial: from 12 o'clock clockwise by deg
const dialWedge = (S, cx, cy, r, deg, t, name = "yellow") => { const p = arcPts(cx, cy, r * 0.92, -90, -90 + deg, 14); return S.fill(`M${cx} ${cy} ` + p.map(([x, y]) => `L${f1(x)} ${f1(y)}`).join(" ") + " Z", t, 0, DS.c(name, 1), 0.95); };

// And here's the twist. In those same four minutes, without even trying, the rest of us will spend nearly a billion dollars.
{ const S = sc(59, 0, { cam: "push", focus: "960 560" }); DS.outdoor(S, DAY); street(S, DAY);
  crowdGrid(S, 200, 760, 21, 3, 78, 88, 1.0, W(59, 11), 0.3);
  const sw = stopwatch(S, 520, 470, 150, { go: W(59, 4), dur: WE(59, 21) - W(59, 4), deg: 360 }); fadeG(S, sw, W(59, 3)); card(S, "4 MINUTES", 520, 680, { t: W(59, 4), size: DS.type.caption });
  { const pg = panel(S, 1280, 430, 700, 300, W(59, 11)); fadeG(S, pg, W(59, 11)); }
  countUp(S, 1280, 460, 0, 9e8, W(59, 11), WE(59, 21) - W(59, 11), { size: DS.type.title, fmt: mon, c: DS.c("green", 2), ease: "none" }); txt(S, "THE REST OF US", 1280, 370, { size: DS.type.caption, t: W(59, 11) });
  fin(S, { noClock: true }); }

// All the world's economies together come to about a hundred and eighteen trillion dollars a year.
{ const S = sc(60, 0, { cam: "push", focus: "900 560" }); DS.room(S, ROOM);
  { const g = S.grp(); globe(S, 560, 540, 260, { parent: g }); fadeG(S, g, W(60, 2)); }
  countUp(S, 1320, 500, 0, 118, W(60, 8), WE(60, 12) - W(60, 8), { size: DS.type.display, fmt: (n) => "$" + Math.round(n), c: DS.c("green", 2), ease: "power1.out" });
  txt(S, "TRILLION", 1320, 600, { size: DS.type.title, t: W(60, 11) }); txt(S, "A YEAR", 1320, 690, { size: DS.type.title, t: W(60, 14), c: DS.c("red", 2) });
  fin(S); }

// That's nearly four million dollars every second,
{ const S = sc(61, 0, { cam: "push", focus: "900 560" }); DS.room(S, ROOM);
  const sw = stopwatch(S, 540, 520, 190, { go: W(61, 4), dur: 4.0, deg: 1440 }); fadeG(S, sw, W(61, 2));
  countUp(S, 1300, 470, 0, 3750000, W(61, 1), WE(61, 4) - W(61, 1), { size: DS.type.display, fmt: (n) => "$" + (n / 1e6).toFixed(2) + " M", c: DS.c("green", 2), ease: "power1.out" });
  txt(S, "EVERY SECOND", 1300, 580, { size: DS.type.title, t: W(61, 5) });
  for (let i = 0; i < 5; i++) bundle(S, 1030 + i * 120, 760, 0.5, { t: W(61, 5) + i * 0.3 });
  fin(S); }

// or a billion about every four and a half minutes.
{ const S = sc(61, 7, { cam: "push", focus: "900 560" }); DS.room(S, ROOM);
  const sw = stopwatch(S, 640, 520, 200, { go: W(61, 11), dur: 2.4, deg: 27 }); dialWedge(S, 640, 520, 200, 27, W(61, 11));
  fadeG(S, sw, W(61, 8));
  cashPile(S, 1340, 880, 0.55, 5, { t0: W(61, 8), dt: 0.2 }); card(S, "$1 BILLION", 1340, 330, { t: W(61, 9), tc: "green" });
  txt(S, "4.5 MINUTES", 640, 840, { size: DS.type.title, t: W(61, 12), c: DS.c("red", 2) });
  fin(S); }

// Dave needed eleven and a half thousand a second, and couldn't manage it.
{ const S = sc(62, 0, { cam: "push", focus: "900 560" }); DS.room(S, ROOM);
  txt(S, "DAVE: $11,574 A SECOND", 320, 310, { anchor: "start", size: DS.type.small, t: W(62, 0) });
  DS.shape(S, rect(320, 340, 14, 70), "blue", { flat: true, w: "detail" }); mini(S, 270, 410, 1.2, { c: DS.c("blue", 2), fill: DS.c("blue", 1) });
  txt(S, "EVERYONE: $3,750,000 A SECOND", 320, 560, { anchor: "start", size: DS.type.small, t: W(62, 8) });
  { const g = S.grp(); DS.shape(S, rect(320, 590, 1100, 80), "green", { w: "mid", parent: g }); fadeG(S, g, W(62, 8)); [0, 1, 2].forEach((i) => mini(S, 250 + i * 8, 670, 1.2, { c: DS.c(OC[i], 2), fill: DS.c(OC[i], 1), t: W(62, 8) })); }
  const F = dave(S, 1700, 960, "near", { s: 1.0, look: -8, mood: "worried", pose: "shrug" });
  fin(S); }

// All of us, buying bread and bus fares and haircuts,
{ const S = sc(63, 0, { cam: "push", focus: "960 540" }); DS.room(S, ROOM);
  const X = [400, 960, 1520], T = [W(63, 3), W(63, 5), W(63, 8)], L = ["BREAD", "BUS FARES", "HAIRCUTS"];
  X.forEach((x, i) => { const pg = panel(S, x, 520, 420, 440); fadeG(S, pg, T[i]); txt(S, L[i], x, 820, { size: DS.type.caption, t: T[i] }); });
  loaf(S, 400, 520, 1.1, { t: W(63, 3) }); bus(S, 960, 600, 0.4, { t: W(63, 5) }); scissors(S, 1520, 520, 1.2, { t: W(63, 8) });
  card(S, "ALL OF US", 960, 160, { t: W(63, 0) });
  fin(S); }

// spend Dave's whole prize in less time than it took him to fill one trolley.
{ const S = sc(63, 9, { cam: "push", focus: "960 540" }); DS.room(S, ROOM);
  const a = stopwatch(S, 520, 480, 170, { go: W(63, 12), dur: 1.6, deg: 27 }); dialWedge(S, 520, 480, 170, 27, W(63, 12)); fadeG(S, a, W(63, 10));
  const b = stopwatch(S, 1400, 480, 170, { go: W(63, 21), dur: 1.8, deg: 120 }); dialWedge(S, 1400, 480, 170, 120, W(63, 21), "red"); fadeG(S, b, W(63, 19));
  card(S, "THE WORLD: 4.5 MIN", 520, 760, { t: W(63, 13), size: DS.type.caption }); card(S, "DAVE'S TROLLEY: 20 MIN", 1400, 760, { t: W(63, 22), size: DS.type.caption, tc: "red" });
  trolley(S, 1780, 940, 0.5, { t: W(63, 19) });
  fin(S); }

// Nobody needs ten tonnes of cash. Nobody even notices.
{ const S = sc(64, 0, { cam: "push", focus: "960 600" }); DS.outdoor(S, DAY); street(S, DAY);
  deskBlock(S, 1000, 1500, 780); { const g = S.grp(); DS.shape(S, rrect(1130, 700, 130, 80, DS.r.sm), "gray", { tone: 1, w: "mid", parent: g }); DS.shape(S, rect(1150, 712, 90, 34), "green", { tone: 1, flat: true, w: "hair", parent: g }); }
  const C = who(S, 1320, 960, "near", Object.assign({}, CASHIER, { look: -6, mood: "smile" }));
  deskBlock(S, 1000, 1500, 780);
  [[420, 0], [760, 1]].forEach(([x, i]) => { const P = person(S, x, 960, "near", i + 1, { mood: "smile", look: 6, armR: ARM.near }); const [hx, hy] = P.hand("R"); mphone(S, hx + 8, hy - 20, 0.2, { screen: "green", tone: 0 }); });
  card(S, "NOBODY NEEDS 10 TONNES OF CASH", 960, 190, { t: W(64, 0), size: DS.type.caption });
  card(S, "NOBODY NOTICES", 960, 300, { t: W(64, 6), size: DS.type.caption, tc: "green" });
  fin(S); }

// So the problem was never the billion. It was one person trying to spend it alone.
{ const S = sc(65, 0, { cam: "pull", focus: "960 600" }); DS.outdoor(S, DAWN, { hy: 620 });
  const F = dave(S, 960, 960, "near", { s: 1.15, look: 0, mood: "tired", pose: "stand" });
  card(S, "THE BILLION", 560, 300, { t: W(65, 4) }); tick(S, 840, 296, 1.4, W(65, 4) + 0.3);
  ringFig(S, F, W(65, 8)); card(S, "ONE PERSON, ALONE", 1380, 480, { t: W(65, 9), tc: "red" });
  fin(S); }

// So Dave makes one phone call.
{ const S = sc(66, 0, { cam: "push", focus: "900 600" }); DS.outdoor(S, DAWN); street(S, DAWN, { zebra: 1500 });
  const F = dave(S, 760, 960, "near", { s: 1.35, look: 8, mood: "determined", armR: ARM.up });
  const [hx, hy] = F.hand("R"); mphone(S, hx + 14, hy - 110, 0.5, { screen: "green", tone: 0 });
  [0, 1, 2].forEach((i) => S.draw(arc(hx + 50, hy - 120, 70 + i * 36, -55, 55), W(66, 3) + i * 0.2, 0, { c: DS.c("blue"), w: DS.w.mid }));
  fin(S); }

// He can't build a hospital in four minutes, but he can pay the people who will.
{ const S = sc(66, 6, { cam: "push", focus: "1100 560" }); DS.outdoor(S, DAWN); street(S, DAWN);
  hospital(S, 1560, 900, 0.7, { floors: 5 });
  DS.shape(S, rect(1740, 140, 22, 760), "gray", { tone: 1, flat: true, w: "detail" }); S.draw(`M1740 160 H1180`, S.start, 0, { c: DS.c("gray", 2), w: DS.w.near * 1.5 });
  const F = dave(S, 260, 960, "near", { s: 0.95, look: 8, mood: "determined", pose: "hold" });
  [980, 1180, 1370].forEach((x, i) => { worker(S, x, 960, "near", { look: -6, mood: "smile", t: W(66, 14) + i * 0.1 }); coinMove(S, [330, 700], [x, 480], W(66, 16) + i * 0.3, 1.6, 22, { stay: true }); });
  card(S, "PAY THE PEOPLE WHO WILL", 960, 200, { t: W(66, 16), size: DS.type.caption });
  fin(S); }

// At six forty-four, he sends the billion to pay for one hospital, about the size of the one in Michigan.
{ const S = sc(67, 0, { cam: "push", focus: "900 560" }); DS.room(S, ROOM);
  const ph = mphone(S, 520, 540, 1.4, { screen: "navy", tone: 2 });
  txt(S, "TO: HOSPITAL", 520, 350, { size: DS.type.caption, c: DS.P.white[0], t: W(67, 8) }); txt(S, mon(1e9), 520, 450, { size: DS.type.caption, c: DS.c("green", 1), t: W(67, 4) });
  const btn = S.grp(); DS.shape(S, rrect(400, 580, 240, 90, DS.r.md), "green", { w: "detail", parent: btn }); txt(S, "SEND", 520, 640, { size: DS.type.small, c: DS.P.white[0], parent: btn });
  press(btn, 520, 625, W(67, 3));
  hospital(S, 1400, 920, 1.0, { t: W(67, 9) });
  [0, 1, 2, 3].forEach((i) => coinMove(S, [760, 560 + i * 20], [1180, 600 + i * 40], W(67, 4) + i * 0.4, 1.6, 22));
  card(S, "6:44 PM", 520, 190, { t: W(67, 0), tc: "red" });
  fin(S); }

// That's about nine hundred and twenty million. Keep the change.
{ const S = sc(68, 0, { cam: "push", focus: "800 600" }); DS.outdoor(S, DAWN); street(S, DAWN, { zebra: 1500 });
  const F = dave(S, 560, 960, "near", { s: 1.45, look: 6, mood: "smile", pose: "wave" }); talk(S, F, W(68, 0), END(68));
  say(S, 900, 250, 500, 150, 600, 520, ["“THAT'S ABOUT NINE HUNDRED", "AND TWENTY MILLION.", "KEEP THE CHANGE.”"], W(68, 0), { size: DS.type.small });
  hospital(S, 1520, 920, 0.7, { t: S.start }); card(S, "$920 MILLION", 1560, 340, { t: W(68, 2), tc: "blue" });
  fin(S); }

// The change is about eighty million dollars.
{ const S = sc(69, 0, { cam: "push", focus: "960 540" }); DS.room(S, ROOM);
  DS.shape(S, rect(330, 470, 1104, 110), "blue", { tone: 1, w: "mid" }); DS.shape(S, rect(1434, 470, 96, 110), "gold", { w: "mid" });
  txt(S, "$920 MILLION: THE HOSPITAL", 882, 540, { size: DS.type.small, c: DS.P.white[0], t: W(69, 0) });
  card(S, "THE CHANGE", 1482, 330, { t: W(69, 1), tc: "red" }); arrowR(S, 1482, 380, 1482, 450, W(69, 3));
  txt(S, "ABOUT $80 MILLION", 1482, 720, { size: DS.type.small, t: W(69, 3), c: DS.c("gold", 2) });
  txt(S, "$1 BILLION", 930, 430, { size: DS.type.caption, t: W(69, 0) });
  const F = dave(S, 330, 960, "near", { s: 1.0, look: 8, mood: "happy", pose: "hips" });
  fin(S); }

// ===================== 9. Gone to work =====================
// So what would happen if you had to spend a billion dollars in a day?
{ const S = sc(70, 0, { cam: "push", focus: "960 540" });
  question(S, W(70, 9), W(70, 13), { mood: "smile", pose: "hips" });
  fin(S, { no: true }); }

// Shopping, you'd lose. You'd run out of seconds somewhere under ten tonnes of cash and a hundred thousand forms.
{ const S = sc(71, 0, { cam: "push", focus: "960 600" }); DS.room(S, ROOM);
  cashPile(S, 380, 920, 0.95, 5, { t0: W(71, 8), dt: 0.2 }); stack(S, 1520, 940, 320, 26, "white", { h: 22, t0: W(71, 14), dt: 0.07 }); stack(S, 1790, 940, 260, 18, "white", { h: 22, t0: W(71, 14) + 0.3, dt: 0.07 });
  const F = dave(S, 960, 960, "near", { look: 0, mood: "worried", pose: "head" }); sweat(S, F, W(71, 3));
  dayClock(S, 960, 300, 130, { h: 24, t: W(71, 3) });
  card(S, "10 TONNES", 380, 330, { t: W(71, 9), tc: "green" }); card(S, "100,000 FORMS", 1560, 330, { t: W(71, 15), tc: "red", size: DS.type.caption });
  fin(S, { no: true }); }

// The only way is to pay lots of people at once, and then something odd happens. The money doesn't disappear.
{ const S = sc(72, 0, { cam: "push", focus: "960 560" }); DS.outdoor(S, DAY); street(S, DAY);
  const F = dave(S, 330, 960, "near", { s: 1.15, look: 6, mood: "determined", armR: ARM.up });
  const [hx, hy] = F.hand("R"); mphone(S, hx + 10, hy - 90, 0.4, { screen: "green", tone: 0 });
  const P = [[820, 700], [1120, 700], [1420, 700], [820, 930], [1120, 930], [1420, 930]];
  P.forEach(([x, gy], i) => { person(S, x, gy, "mid", i, { s: 1.15, mood: "smile", look: -5, t: W(72, 5) + i * 0.15 }); coinMove(S, [hx + 20, hy - 170], [x + 40, gy - 150], W(72, 6) + i * 0.3, 1.3, 20, { stay: true }); });
  card(S, "THE MONEY DOESN'T DISAPPEAR", 1100, 170, { t: W(72, 16), size: DS.type.caption, tc: "green" });
  fin(S, { no: true }); }

// Economics textbooks put it in one line: one person's spending is another person's income.
{ const S = sc(73, 0, { cam: "push", focus: "960 540" }); DS.room(S, ROOM);
  DS.drop(S, rrect(264, 150, 1400, 300, DS.r.md)); DS.shape(S, rrect(250, 134, 1420, 300, DS.r.md), "red", { tone: 2, w: "mid" });
  DS.shape(S, rect(266, 150, 690, 268), "white", { flat: true, w: "detail" }); DS.shape(S, rect(964, 150, 690, 268), "white", { flat: true, w: "detail" });
  txt(S, "ONE PERSON'S SPENDING", 610, 270, { size: DS.type.caption, t: W(73, 7) }); txt(S, "IS ANOTHER PERSON'S", 1310, 250, { size: DS.type.caption, t: W(73, 9) }); txt(S, "INCOME", 1310, 330, { size: DS.type.small, t: W(73, 12), c: DS.c("green", 2) });
  txt(S, "ECONOMICS", 610, 200, { size: DS.type.caption, t: W(73, 0), c: DS.c("gray", 2) });
  person(S, 520, 960, "near", 0, { s: 1.2, mood: "smile", pose: "reach", look: 6 }); person(S, 1400, 960, "near", 3, { s: 1.2, mood: "happy", pose: "stand", look: -6 });
  card(S, "SPENDING", 520, 480, { t: W(73, 8), tc: "red", size: DS.type.caption }); card(S, "INCOME", 1400, 480, { t: W(73, 12), tc: "green", size: DS.type.caption });
  coinMove(S, [620, 790], [1300, 790], W(73, 9), 1.6, 28, { stay: true });
  fin(S, { no: true }); }

// Builders and electricians get paid, and so do the people who make the steel and the glass.
{ const S = sc(74, 0, { cam: "push", focus: "960 600" }); DS.outdoor(S, DAY); street(S, DAY);
  const X = [360, 760, 1160, 1560], T = [W(74, 0), W(74, 2), W(74, 12), W(74, 15)];
  X.forEach((x, i) => { worker(S, x, 960, "near", { look: i % 2 ? -5 : 5, mood: "smile", hat: ["yellow", "orange", "red", "blue"][i], t: T[i] }); coin(S, x, 540, 34, "$", { t: T[i] + 0.3 }); });
  { const g = S.grp(); [0, 1, 2].forEach((c) => [0, 1].forEach((r) => DS.shape(S, rect(250 + c * 60 + (r ? 30 : 0), 790 - r * 36, 56, 32), "red", { tone: 1, w: "detail", parent: g }))); fadeG(S, g, T[0]); }
  { const g = S.grp(); DS.shape(S, `M690 740 L640 800 H700 L680 860 L780 780 H720 L760 740 Z`, "yellow", { w: "detail", parent: g }); fadeG(S, g, T[1]); }
  { const g = S.grp(); DS.shape(S, `M1070 780 H1250 V800 H1180 V870 H1140 V800 H1070 Z`, "gray", { w: "detail", parent: g }); fadeG(S, g, T[2]); }
  { const g = S.grp(); DS.shape(S, rect(1470, 740, 120, 150), "glass", { flat: true, w: "mid", parent: g }); S.draw(`M1490 860 L1560 760`, S.start, 0, { c: DS.P.white[0], w: DS.w.near, parent: g }); fadeG(S, g, T[3]); }
  fin(S, { no: true }); }

// Then their wages go on rent, food and haircuts.
{ const S = sc(75, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM);
  const F = worker(S, 480, 960, "near", { look: 6, mood: "happy", pose: "reach" });
  const X = [1000, 1360, 1720], T = [W(75, 4), W(75, 5), W(75, 7)], L = ["RENT", "FOOD", "HAIRCUTS"];
  house(S, 1000, 640, 0.9, "wall", { roof: "red", t: T[0] }); loaf(S, 1360, 560, 0.9, { t: T[1] }); scissors(S, 1720, 540, 1.0, { t: T[2] });
  X.forEach((x, i) => { txt(S, L[i], x, 780, { size: DS.type.caption, t: T[i] }); coinMove(S, [560, 620], [x, 460 + i * 20], T[i], 1.4, 22, { stay: true }); });
  fin(S, { no: true }); }

// And one day, a hospital that size needs about nineteen hundred staff.
{ const S = sc(76, 0, { cam: "push", focus: "960 600" }); DS.outdoor(S, DAY, { hy: 700 });
  hospital(S, 560, 920, 0.95);
  for (let i = 0; i < 8; i++) doctor(S, 1020 + (i % 4) * 150 + (i > 3 ? 70 : 0), i > 3 ? 780 : 960, i > 3 ? "mid" : "near", i, { s: i > 3 ? 1.2 : 1.1, mood: "smile", look: -5, t: W(76, 6) + i * 0.15 });
  countUp(S, 1370, 250, 0, 1900, W(76, 6), WE(76, 10) - W(76, 6), { size: DS.type.display, c: DS.c("red", 2), ease: "power1.out" }); txt(S, "STAFF", 1370, 340, { size: DS.type.title, t: W(76, 10) });
  fin(S, { no: true }); }

// Even Dave's four hundred dollars of shopping paid part of a cashier's wages.
{ const S = sc(77, 0, { cam: "push", focus: "1000 600" }); DS.room(S, STORE);
  const D = dave(S, 330, 960, "near", { look: 8, mood: "smile", pose: "hold" }); bag(S, 560, 950, 1.2, "orange");
  const C = who(S, 1180, 960, "near", Object.assign({}, CASHIER, { look: -6, mood: "smile" })); deskBlock(S, 860, 1500, 790);
  receipt(S, 700, 140, 300, 300, [["TOTAL", "$400"]], { t: W(77, 2) });
  coinMove(S, [880, 300], [1190, 790], W(77, 7), 1.6, 26, { stay: true });
  card(S, "A CASHIER'S WAGES", 1300, 230, { t: W(77, 9), size: DS.type.caption });
  fin(S, { no: true }); }

// She buys lunch. The café pays its baker. The baker buys flour.
{ const S = sc(77, 13, { cam: "push", focus: "960 560" }); DS.room(S, ROOM);
  const X = [330, 780, 1230, 1680];
  X.forEach((x, i) => fadeG(S, panel(S, x, 520, 340, 420), i ? W(77, [14, 17, 22][i - 1]) : undefined));
  who(S, 330, 740, "near", Object.assign({}, CASHIER, { s: 0.95, look: 4, mood: "smile" })); cup(S, 780, 520, 1.2, { t: W(77, 16) });
  const B = who(S, 1230, 740, "near", Object.assign({}, BAKER, { s: 0.95, look: -4, mood: "smile", t: W(77, 19) })); chefhat(S, B); sack(S, 1680, 540, 1.4, { t: W(77, 22) });
  [["CASHIER", 0, 13], ["CAFE", 1, 16], ["BAKER", 2, 19], ["FLOUR", 3, 23]].forEach(([s, i, w]) => txt(S, s, X[i], 800, { size: DS.type.caption, t: W(77, w) }));
  [[0, 14], [1, 17], [2, 22]].forEach(([i, w]) => { arrowR(S, X[i] + 190, 520, X[i + 1] - 190, 520, W(77, w)); coinMove(S, [X[i] + 190, 520], [X[i + 1] - 190, 520], W(77, w) + 0.3, 1.2, 20); });
  fin(S, { no: true }); }

// A hundred-dollar note lasts about twenty-four years, going from hand to hand to hand.
{ const S = sc(78, 0, { cam: "push", focus: "960 600" }); DS.outdoor(S, DAY); street(S, DAY);
  const xs = [300, 620, 940, 1260, 1580, 1800]; xs.forEach((x, i) => person(S, x, 960, "near", i, { s: 1.0, mood: "smile", look: i % 2 ? -5 : 5, pose: i < 5 ? "reach" : "stand" }));
  const nt = note(S, 300, 640, 0.6, { t: W(78, 0) });
  for (let i = 0; i < 5; i++) { const t0 = W(78, 7) + i * 0.62; tl.to(nt, { attr: { transform: `translate(${xs[i + 1] - 300} 0)` }, duration: 0.55, ease: "power1.inOut" }, t0); }
  nt.setAttribute("transform", "translate(0 0)");
  { const pg = panel(S, 960, 330, 640, 190, W(78, 3)); fadeG(S, pg, W(78, 3)); }
  countUp(S, 960, 360, 0, 24, W(78, 3), WE(78, 5) - W(78, 3), { size: DS.type.display, fmt: (n) => Math.round(n) + " YEARS", c: DS.c("red", 2), ease: "power1.out" });
  fin(S, { no: true }); }

// How much each dollar adds to the whole economy is still argued about.
{ const S = sc(79, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM);
  person(S, 560, 960, "near", 0, { s: 1.3, specs: true, tieC: "navy", mood: "angry", pose: "point", look: 6 }); person(S, 1360, 960, "near", 1, { s: 1.3, specs: true, tieC: "red", mood: "angry", pose: "pointL", look: -6 });
  coin(S, 960, 560, 90, "$1", { t: W(79, 0) });
  say(S, 560, 330, 150, 110, 560, 580, ["!"], W(79, 8), { size: DS.type.title }); say(S, 1360, 330, 150, 110, 1360, 580, ["?"], W(79, 9), { size: DS.type.title });
  card(S, "STILL ARGUED ABOUT", 960, 160, { t: W(79, 8), size: DS.type.caption });
  fin(S, { no: true }); }

// When America's Congressional Budget Office estimated it for government purchases,
{ const S = sc(80, 0, { cam: "push", focus: "960 560" }); DS.outdoor(S, DAY); street(S, DAY);
  columns(S, 560, 940, 0.95, "", { layer: "near" }); card(S, "BUDGET OFFICE", 560, 320, { t: W(80, 2), size: DS.type.small });
  { const pg = panel(S, 1420, 520, 560, 500); fadeG(S, pg, W(80, 4)); [[1230, 90], [1330, 190], [1430, 140], [1530, 250], [1630, 170]].forEach(([x, h], i) => { const g = S.grp(); DS.shape(S, rect(x - 36, 700 - h, 72, h), ["blue", "green", "orange", "purple", "red"][i], { flat: true, tone: 1, w: "detail", parent: g }); fadeG(S, g, W(80, 4) + i * 0.2); }); }
  card(S, "ESTIMATE", 1420, 330, { t: W(80, 4), size: DS.type.caption }); card(S, "GOVERNMENT PURCHASES", 1420, 820, { t: W(80, 7), size: DS.type.caption });
  fin(S, { no: true }); }

// it gave a range from fifty cents to two dollars fifty.
{ const S = sc(80, 10, { cam: "push", focus: "960 560" }); DS.room(S, ROOM);
  const ux = (v) => 300 + v * 440;
  S.draw(`M${ux(0)} 600 H${ux(3)}`, S.start, 0, { c: DS.c("ink"), w: DS.w.near });
  [0, 1, 2, 3].forEach((v) => { S.draw(`M${ux(v)} 570 V630`, S.start, 0, { c: DS.c("ink"), w: DS.w.mid }); txt(S, "$" + v, ux(v), 700, { size: DS.type.caption }); });
  { const g = S.grp(); DS.shape(S, rect(ux(0.5), 580, ux(2.5) - ux(0.5), 40), "yellow", { w: "mid", parent: g }); fadeG(S, g, W(80, 14)); }
  card(S, "$0.50", ux(0.5), 480, { t: W(80, 14), tc: "red" }); card(S, "$2.50", ux(2.5), 480, { t: W(80, 17), tc: "green" });
  card(S, "FOR EVERY $1 SPENT", 960, 200, { t: W(80, 10), size: DS.type.caption });
  fin(S, { no: true }); }

// It depends on who gets the money, and what they do with it next.
{ const S = sc(81, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM);
  person(S, 330, 960, "near", 2, { s: 1.15, mood: "smile", pose: "reach", look: 6 }); coin(S, 330, 460, 30, null, { t: W(81, 0) });
  arrowR(S, 480, 560, 860, 360, W(81, 4)); arrowR(S, 480, 640, 860, 820, W(81, 4) + 0.2);
  { const g = S.grp(); DS.shape(S, rrect(900, 250, 200, 220, DS.r.md), "glass", { w: "mid", parent: g }); [0, 1, 2].forEach((i) => coin(S, 1000, 440 - i * 40, 36, null, { parent: g })); fadeG(S, g, W(81, 4) + 0.3); }
  card(S, "SAVES IT", 1000, 190, { t: W(81, 4) + 0.3, tc: "gray", size: DS.type.caption });
  house(S, 1000, 940, 0.9, "sand", { roof: "blue", t: W(81, 8) }); card(S, "SPENDS IT", 1000, 690, { t: W(81, 8), tc: "green", size: DS.type.caption });
  arrowR(S, 1220, 820, 1480, 820, W(81, 10)); person(S, 1640, 960, "near", 4, { s: 1.15, mood: "happy", pose: "reach", look: -6, t: W(81, 11) }); coin(S, 1640, 560, 30, null, { t: W(81, 12) });
  fin(S, { no: true }); }

// What nobody says is that the money vanishes.
{ const S = sc(82, 0, { cam: "push", focus: "960 600" }); DS.room(S, ROOM);
  [[460, 0], [960, 1], [1460, 2]].forEach(([x, i]) => person(S, x, 960, "near", i, { s: 1.2, specs: true, tieC: ["navy", "red", "gold"][i], mood: "flat", pose: "shrug", look: i - 1 }));
  { const g = S.grp(); S.thought(960, 360, 560, 190, 960, 640, S.start, 0.3, { parent: g }); txt(S, "THE MONEY VANISHES", 960, 380, { size: DS.type.small, parent: g, c: DS.c("gray", 2) }); fadeG(S, g, W(82, 4)); }
  xMark(S, 960, 360, 4.4, W(82, 0) + 0.3);
  stamp(S, 960, 160, "NOBODY SAYS THIS", W(82, 0), "red", { size: DS.type.body });
  fin(S, { no: true }); }

// Dave still loves spending money. It just turns out a billion takes a lot of help.
{ const S = sc(83, 0, { cam: "push", focus: "960 600" }); DS.outdoor(S, DAWN); street(S, DAWN);
  worker(S, 300, 960, "near", { look: 6, mood: "smile", t: W(83, 6) }); who(S, 620, 960, "near", Object.assign({}, CASHIER, { look: 6, mood: "smile", t: W(83, 8) })); const bk = who(S, 1300, 960, "near", Object.assign({}, BAKER, { look: -6, mood: "smile", t: W(83, 10) })); chefhat(S, bk); doctor(S, 1640, 960, "near", 0, { look: -6, mood: "smile", t: W(83, 12) });
  const F = dave(S, 960, 960, "near", { s: 1.3, look: 0, mood: "happy", pose: "armsUp" });
  [[860, 400], [1060, 380]].forEach(([x, y], i) => heartP(S, x, y, 1.0, W(83, 2) + i * 0.3));
  card(S, "A LOT OF HELP", 960, 200, { t: W(83, 10), tc: "green" });
  fin(S, { no: true }); }

// At midnight, Dave's phone says zero, and nothing vanishes.
{ const S = sc(84, 0, { cam: "push", focus: "960 600" }); DS.outdoor(S, NIGHT); street(S, NIGHT, { zebra: 1500 });
  S.fill(circ(960, 560, 700, 380), S.start, 0, DS.c("yellow", 1), 0.08);
  const F = dave(S, 700, 960, "near", { s: 1.2, look: 6, mood: "smile", armR: ARM.up });
  const [hx, hy] = F.hand("R"); mphone(S, hx + 24, hy - 130, 0.62, { screen: "navy", tone: 2 });
  txt(S, "$0", hx + 24, hy - 120, { size: DS.type.title, c: DS.c("red", 1), t: W(84, 3) });
  stamp(S, 1380, 520, "NOTHING VANISHES", W(84, 6), "green", { size: DS.type.body });
  fin(S, { noMoney: false }); }

// His billion just went to work.
{ const S = sc(85, 0, { cam: "pull", focus: "960 560" }); DS.outdoor(S, DAWN); street(S, DAWN);
  const F = dave(S, 260, 960, "near", { s: 1.1, look: 6, mood: "happy", armR: ARM.up });
  const [hx, hy] = F.hand("R"); mphone(S, hx + 20, hy - 110, 0.5, { screen: "navy", tone: 2 });
  const T = [[720, 700, 0], [980, 760, 1], [1240, 700, 2], [1500, 760, 3], [1760, 700, 4], [880, 940, 5], [1380, 940, 6]];
  T.forEach(([x, gy, i], k) => { const P = i % 3 === 0 ? worker(S, x, gy, "mid", { s: 1.1, look: -5, mood: "smile", t: W(85, 0) + 0.4 + k * 0.1 }) : i % 3 === 1 ? who(S, x, gy, "mid", Object.assign({}, CASHIER, { s: 1.1, mood: "smile", t: W(85, 0) + 0.4 + k * 0.1 })) : (() => { const B = who(S, x, gy, "mid", Object.assign({}, BAKER, { s: 1.1, mood: "smile", t: W(85, 0) + 0.4 + k * 0.1 })); chefhat(S, B); return B; })();
    coinMove(S, [hx + 20, hy - 150], [x + 30, gy - 190], W(85, 0) + 0.6 + k * 0.28, 2.2, 18, { stay: true }); });
  card(S, "WENT TO WORK", 960, 200, { t: W(85, 3), tc: "green" });
  DS.vignette(S); }
