// look: still
// What If You Fell Into a Black Hole? (~9:00). What-if escalation by distance: 640 million km -> photon sphere -> tug-of-war -> the edge -> inside -> the centre -> 10^87 years.
// Runner: DAVE'S POSTCARD ("greetings from inside a black hole"): bought in the hook, written inside, scrambled and very late at the end. Second runner: Dave's FEET check; visual runner: the distance readout (HUD chip) and his torch.
// Space is near-black (navy -> black) with white outlines on Dave and the news friend; every label sits on a white card (ink on white).
// Real people (Schnittman, Hamilton, the four physicists) are name cards on generic figures; Hawking and Carroll are quote cards only. The EHT picture is our own stylised ring, not the real photo.
// Safety: spaghetti is a smooth cartoon stretch, nobody burns, nothing flashes (torch pulses are slow, one per second, with soft fades).

// ---------- timing: find a spoken word by text, so cues survive re-timed voices ----------
const wnorm = (s) => s.toLowerCase().replace(/[^a-z0-9'*-]/g, "");
const widx = (c, key) => {
  if (typeof key === "number") return key;
  const [k, nth] = key.split("#"); let n = nth ? +nth : 1;
  const ws = TIMING.words.filter((w) => w[0] === c);
  for (let i = 0; i < ws.length; i++) if (wnorm(ws[i][2]) === wnorm(k) && --n === 0) return i;
  throw new Error(`no word '${key}' in clip ${c}`);
};
const K = (c, key, off = 0) => W(c, widx(c, key) + off);
const KE = (c, key, off = 0) => WE(c, widx(c, key) + off);

// ---------- text, cards ----------
// our label card: same look as DS.card but sized for wide caps lettering (0.7 em per character), so long labels never touch the border
DS.card = (S, str, cx, cy, o = {}) => {
  const size = o.size || DS.type.small, t = o.t ?? S.start, pad = [DS.sp(3), DS.sp(1.5)], w = str.length * size * 0.7 + pad[0] * 2, h = size * 1.15 + pad[1] * 2, g = S.grp(o.parent);
  const x = cx - w / 2, y = cy - h / 2, r = DS.r[o.r || "md"];
  S.fill(rrect(x + 4, y + 8, w, h, r), t, 0.3, DS.P.ink[0], 0.14, g);
  S.draw(rrect(x, y, w, h, r), t, 0, { fill: o.fill ? DS.c(o.fill, 1) : DS.P.white[0], c: DS.P.ink[0], w: DS.w.detail, parent: g });
  S.text(str, cx, cy + size * 0.36, { size, t, c: o.tc ? DS.c(o.tc, 2) : DS.P.ink[0], parent: g });
  if (t > S.start + 0.05) tl.fromTo(g, { opacity: 0 }, { opacity: 1, duration: 0.35 }, t);
  return { g, w, h };
};
// keep a late cue readable: never later than `hold` seconds before the scene ends
const CL = (S, t, hold = 1.7) => Math.max(S.start, Math.min(t, S.end - hold));
const T0 = (S) => Math.max(0, S.start - 0.6); // static text pops in under the crossfade, so carried-over labels never blink
const wtxt = (S, s, x, y, o = {}) => S.text(s, x, y, Object.assign({ size: DS.type.caption, c: DS.P.white[0] }, o, { t: o.t ?? T0(S) }));
const itxt = (S, s, x, y, o = {}) => S.text(s, x, y, Object.assign({ size: DS.type.caption, c: DS.P.ink[0] }, o, { t: o.t ?? T0(S) }));
const card = (S, s, x, y, o = {}) => DS.card(S, s, x, y, Object.assign({ size: DS.type.small }, o, { t: o.t ?? T0(S) }));
const fadeG = (S, g, t, dur = 0.35) => { if (t !== undefined && t > S.start + 0.05) tl.fromTo(g, { opacity: 0 }, { opacity: 1, duration: dur }, t); return g; };
const dash = (p, a, b) => { p.removeAttribute("pathLength"); p.setAttribute("stroke-dasharray", `${a} ${b}`); return p; };
const shift = (g, t, dur, from, to, ease = "power1.inOut") => tl.fromTo(g, { attr: { transform: `translate(${from[0]} ${from[1]})` } }, { attr: { transform: `translate(${to[0]} ${to[1]})` }, duration: dur, ease, immediateRender: false }, t);
const spin = (g, t, dur, d0, d1, cx, cy, ease = "none") => tl.fromTo(g, { attr: { transform: `rotate(${d0} ${cx} ${cy})` } }, { attr: { transform: `rotate(${d1} ${cx} ${cy})` }, duration: dur, ease, immediateRender: false }, t);
const scaleAt = (g, t, dur, cx, cy, k0, k1, ease = "power1.inOut") => { const tf = (k) => `translate(${cx} ${cy}) scale(${k}) translate(${-cx} ${-cy})`; tl.fromTo(g, { attr: { transform: tf(k0) } }, { attr: { transform: tf(k1) }, duration: dur, ease, immediateRender: false }, t); };
const dim = (g, t, dur, from, to, ease = "power1.inOut") => tl.fromTo(g, { opacity: from }, { opacity: to, duration: dur, ease, immediateRender: false }, t);
let CPN = 0;
const clipG = (S, d, parent) => { const id = "cg43-" + ++CPN, cp = el("clipPath", { id }, dsDefs()); el("path", { d }, cp); const g = S.grp(parent); g.setAttribute("clip-path", `url(#${id})`); return g; };
const tick = (S, x, y, k, t, name = "green", parent) => S.tick(x, y, k, t, 0, { c: DS.c(name, 1), w: DS.w.near, parent });
const xMark = (S, x, y, k, t, parent) => S.cross(x, y, k, t, 0, { c: DS.c("red", 0), w: DS.w.near, parent });
const arr = (S, x1, y1, x2, y2, t, o = {}) => S.arrow(x1, y1, x2, y2, t, 0.3, { c: o.raw || DS.c(o.c || "white", o.tone || 0), w: o.w || DS.w.near, bend: o.bend || 0, head: o.head, parent: o.parent });
const ringO = (S, x, y, rx, ry, t, name = "red", o = {}) => S.draw(circ(x, y, rx, ry), t, 0, { c: DS.c(name, o.tone ?? 1), w: o.w || DS.w.near, parent: o.parent });
const stamp = (S, cx, cy, str, t, name = "red", o = {}) => {
  const g = S.grp(o.parent), size = o.size || DS.type.small, wd = str.length * size * 0.66 + 60, ht = size * 1.75, rot = o.rot ?? -6, tf = (k) => `translate(${cx} ${cy}) rotate(${rot}) scale(${k}) translate(${-cx} ${-cy})`;
  S.draw(rrect(cx - wd / 2, cy - ht / 2, wd, ht, DS.r.sm), S.start, 0, { c: DS.c(name, 2), w: DS.w.near, fill: DS.P.white[0], parent: g });
  S.text(str, cx, cy + size * 0.36, { size, t: T0(S), c: DS.c(name, 2), parent: g });
  tl.fromTo(g, { opacity: 0, attr: { transform: tf(1.4) } }, { opacity: 1, attr: { transform: tf(1) }, duration: 0.25, ease: "power3.in" }, t);
  return g;
};
const countUp = (S, x, y, from, to, t, dur, o = {}) => {
  const fmt = o.fmt || ((n) => Math.round(n).toLocaleString("en-US")), te = S.text(fmt(from), x, y, { size: o.size || DS.type.title, c: o.c || DS.P.white[0], t: o.t0 ?? t, anchor: o.anchor, parent: o.parent, halo: o.halo });
  const v = { n: from }; te.textContent = fmt(from);
  tl.fromTo(v, { n: from }, { n: to, duration: dur, ease: o.ease || "power1.out", immediateRender: false, onUpdate: () => (te.textContent = fmt(v.n)) }, t);
  return te;
};
// text that swaps on cue: items = [[t, "str"], ...]
const swapTxt = (S, items, x, y, o = {}) => items.forEach(([tn, str], i) => { const te = S.text(str, x, y, Object.assign({ size: DS.type.display, c: DS.P.white[0] }, o, { t: tn })); if (items[i + 1]) S.hide(te, items[i + 1][0]); });
// speech or thought bubble with centred lines of text (ink on white), all in one group
const say = (S, cx, cy, rx, ry, tx, ty, strs, t, o = {}) => {
  const g = S.grp(); (o.think ? S.thought : S.speech)(cx, cy, rx, ry, tx, ty, S.start, 0.3, { parent: g });
  const size = o.size || DS.type.small, n = strs.length;
  strs.forEach((s, i) => S.text(s, cx, cy + size * 0.36 + (i - (n - 1) / 2) * size * 1.2, { size, t: T0(S), c: DS.c("ink"), parent: g }));
  return fadeG(S, g, t, 0.3);
};

// ---------- gradients, glows ----------
let GN = 0;
const radial = (stops) => { const id = "rg43-" + ++GN, g = el("radialGradient", { id, cx: 0.5, cy: 0.5, r: 0.5 }, dsDefs()); stops.forEach(([o, c, op]) => el("stop", { offset: o, "stop-color": c, "stop-opacity": op }, g)); return `url(#${id})`; };
const lin = (stops, x1 = 0, y1 = 0, x2 = 1, y2 = 0) => { const id = "lg43-" + ++GN, g = el("linearGradient", { id, x1, y1, x2, y2 }, dsDefs()); stops.forEach(([o, c, op]) => el("stop", { offset: o, "stop-color": c, "stop-opacity": op }, g)); return `url(#${id})`; };
const BLR = {};
const blur = (sd) => { const id = "bl43-" + Math.round(sd * 10); if (!BLR[id]) { BLR[id] = 1; const f = el("filter", { id, x: "-60%", y: "-60%", width: "220%", height: "220%" }, dsDefs()); el("feGaussianBlur", { stdDeviation: sd }, f); } return `url(#${id})`; };
const glow = (S, x, y, r, name = "orange", op = 0.4, parent, tone = 0) => S.fill(circ(x, y, r), S.start, 0, DS.glow(DS.c(name, tone), op), 1, parent);

// ---------- space ----------
// near-black navy->black backdrop, a faint nebula wash and three classes of stars. o: { n, neb:[[x,y,r,name,op]], clear:[x,y,r], top, glow:[x,y,r,name,op] }
const space = (S, o = {}) => {
  const g = S.grp(); S.g.insertBefore(g, S.g.firstChild); DS.setHaze("navy");
  S.fill("M-200 -200 H2120 V1280 H-200 Z", S.start, 0, DS.vgrad(DS.c(o.top || "navy", 2), DS.c("ink", 2)), 1, g);
  const neb = o.neb ?? [[300 + rnd() * 1300, 200 + rnd() * 600, 760, rnd() > 0.5 ? "purple" : "blue", 0.34]];
  neb.forEach(([x, y, r, name, op]) => S.fill(circ(x, y, r, r * 0.55), S.start, 0, DS.glow(DS.c(name, 2), op), 1, g));
  if (o.glow) glow(S, o.glow[0], o.glow[1], o.glow[2], o.glow[3] || "orange", o.glow[4] ?? 0.3, g);
  const n = o.n ?? 70, B = { a: [], b: [], c: [] };
  for (let i = 0; i < n; i++) {
    const x = rnd() * 1920, y = rnd() * 1080, k = rnd();
    if (o.clear && Math.hypot(x - o.clear[0], y - o.clear[1]) < o.clear[2]) continue;
    (k < 0.72 ? B.a : k < 0.92 ? B.b : B.c).push([x, y]);
  }
  S.fill(B.a.map(([x, y]) => circ(x, y, 1.4)).join(" "), S.start, 0, DS.P.white[0], 0.55, g);
  S.fill(B.b.map(([x, y]) => circ(x, y, 2.1)).join(" "), S.start, 0, DS.c("sky", 1), 0.85, g);
  S.fill(B.c.map(([x, y]) => circ(x, y, 3)).join(" "), S.start, 0, DS.c("gold", 1), 0.95, g);
  return g;
};
// stars inside a clipped window / panel
const starsIn = (S, n, x0, y0, x1, y1, parent, rr = 1.6) => { const a = []; for (let i = 0; i < n; i++) a.push(circ(x0 + rnd() * (x1 - x0), y0 + rnd() * (y1 - y0), rr * (0.7 + rnd() * 0.9))); S.fill(a.join(" "), S.start, 0, DS.P.white[0], 0.8, parent); };

// the black hole: halo, lensed far side of the disk, shadow, near side of the disk, photon ring. R = shadow radius.
const BH = (S, cx, cy, R, o = {}) => {
  const g = S.grp(o.parent), ink = DS.c("ink", 2), hot = DS.c("white", 0), yel = DS.c("yellow", 1), org = DS.c("orange", 0), red = DS.c("red", 2);
  glow(S, cx, cy, R * (o.halo || 3.6), "orange", o.haloOp ?? 0.34, g);
  const dk = o.disk === false ? null : Object.assign({ rx: 3.3, k: 0.2, tilt: -8 }, o.disk);
  let rx = 0, ry = 0, dg = null;
  if (dk) {
    rx = R * dk.rx; ry = rx * dk.k; const hole = R / rx;
    dg = radial([[0, ink, 0], [hole * 0.92, ink, 0], [hole, hot, 0.95], [hole + (1 - hole) * 0.18, yel, 0.9], [hole + (1 - hole) * 0.5, org, 0.7], [hole + (1 - hole) * 0.8, red, 0.3], [1, red, 0]]);
    const back = S.grp(g); back.setAttribute("transform", `rotate(${dk.tilt} ${cx} ${cy})`);
    S.fill(circ(cx, cy, rx, ry), S.start, 0, dg, 1, clipG(S, rect(cx - rx * 1.1, cy - ry * 1.2, rx * 2.2, ry * 1.2), back));
  }
  const lensR = R * 1.95;
  S.fill(circ(cx, cy, lensR), S.start, 0, radial([[0, ink, 0], [1 / 1.95 * 0.99, ink, 0], [1 / 1.95 * 1.04, yel, 0.95], [0.62, org, 0.62], [0.8, red, 0.2], [1, red, 0]]), 1, g);
  S.fill(circ(cx, cy, R), S.start, 0, ink, 1, g);
  if (dk) {
    const front = S.grp(g); front.setAttribute("transform", `rotate(${dk.tilt} ${cx} ${cy})`);
    S.fill(circ(cx, cy, rx, ry), S.start, 0, dg, 1, clipG(S, rect(cx - rx * 1.1, cy, rx * 2.2, ry * 1.2), front));
  }
  const pr = S.draw(circ(cx, cy, R * 1.012), S.start, 0, { c: hot, w: DS.w.detail, op: 0.85, parent: g }); pr.setAttribute("filter", blur(1.2));
  fadeG(S, g, o.t);
  return { g, cx, cy, R };
};
// our own stylised EHT-style ring (smooth gradient, brighter at the bottom): never the real photo
const ehtRing = (S, cx, cy, R, o = {}) => {
  const g = S.grp(o.parent), vg = lin([[0, DS.c("red", 0), 0.55], [0.45, DS.c("orange", 0), 0.9], [1, DS.c("yellow", 1), 1]], 0, 0, 0.25, 1);
  glow(S, cx, cy, R * 3, "orange", 0.3, g);
  const f1_ = S.draw(circ(cx, cy, R * 1.32), S.start, 0, { c: DS.c("orange", 0), w: R * 0.9, op: 0.28, parent: g }); f1_.setAttribute("filter", blur(R * 0.12));
  S.draw(circ(cx, cy, R * 1.28), S.start, 0, { c: vg, w: R * 0.4, parent: g }).setAttribute("filter", blur(R * 0.025));
  S.draw(circ(cx, cy, R * 1.12), S.start, 0, { c: DS.c("yellow", 1), w: R * 0.05, op: 0.5, parent: g });
  S.fill(circ(cx, cy, R * 1.04), S.start, 0, DS.c("ink", 2), 1, g);
  fadeG(S, g, o.t);
  return { g, cx, cy, R };
};
// a dashed circle outline (the edge, the photon sphere, orbits)
const orbit = (S, cx, cy, r, name, t, o = {}) => { const p = S.draw(circ(cx, cy, r, o.ry), t, 0, { c: DS.c(name, o.tone ?? 1), w: o.w || DS.w.mid, parent: o.parent }); return o.solid ? p : dash(p, o.a || 16, o.b || 14); };
// soft dot of light
const lamp = (S, x, y, r, name = "yellow", t, parent, op = 0.55) => { const g = S.grp(parent); glow(S, x, y, r * 4, name, op, g); S.fill(circ(x, y, r), S.start, 0, DS.c(name, 1), 1, g); fadeG(S, g, t); return g; };
const beam = (S, x, y, len, ang, wd, name = "yellow", parent, op = 0.5) => { const g = S.grp(parent); g.setAttribute("transform", `rotate(${ang} ${x} ${y})`); S.fill(`M${x} ${y} L${x + len} ${y - wd} L${x + len} ${y + wd} Z`, S.start, 0, lin([[0, DS.c(name, 1), op], [1, DS.c(name, 1), 0]]), 1, g); return g; };
// slow, soft pulses (never a flash): opacity eases between lo and 1, n times, one per `per` seconds
const pulse = (g, t, n, per = 1, lo = 0.25) => { for (let i = 0; i < n; i++) { tl.fromTo(g, { opacity: lo }, { opacity: 1, duration: per * 0.45, ease: "sine.inOut", immediateRender: false }, t + i * per); tl.to(g, { opacity: lo, duration: per * 0.45, ease: "sine.inOut" }, t + i * per + per * 0.5); } };

// ---------- worlds ----------
const earth = (S, cx, cy, r, o = {}) => {
  const g = S.grp(o.parent); glow(S, cx, cy, r * 1.7, "sky", 0.28, g);
  DS.shape(S, circ(cx, cy, r), "blue", { w: "detail", c: DS.c("sky", 1), parent: g });
  const cl = clipG(S, circ(cx, cy, r), g), k = r / 100, P = (pts) => smooth(pts.map(([x, y]) => [cx + x * k, cy + y * k])) + " Z";
  [[[-60, -50], [-20, -70], [10, -40], [-5, -5], [-35, 10], [-70, -15]], [[20, 20], [60, 5], [80, 40], [55, 85], [30, 60]], [[-40, 55], [-15, 50], [-10, 80], [-35, 90]]].forEach((pts) => S.draw(P(pts), S.start, 0, { fill: DS.vol("grass"), c: DS.c("grass", 2), w: DS.w.hair, parent: cl }));
  S.fill(circ(cx - r * 0.3, cy - r * 0.35, r * 0.55, r * 0.4), S.start, 0, DS.P.white[0], 0.14, cl);
  fadeG(S, g, o.t); return { g, cx, cy, r };
};
const moon = (S, cx, cy, r, o = {}) => {
  const g = S.grp(o.parent); glow(S, cx, cy, r * 1.5, "white", 0.18, g);
  DS.shape(S, circ(cx, cy, r), "gray", { tone: 1, w: "detail", c: DS.c("gray", 1), parent: g });
  [[-0.35, -0.3, 0.22], [0.25, -0.45, 0.14], [0.4, 0.1, 0.2], [-0.2, 0.35, 0.16], [0.05, 0.05, 0.1]].forEach(([dx, dy, k]) => S.fill(circ(cx + dx * r, cy + dy * r, k * r), S.start, 0, DS.c("gray", 2), 0.55, g));
  fadeG(S, g, o.t); return { g, cx, cy, r };
};
const sunD = (S, cx, cy, r, o = {}) => { const g = S.grp(o.parent); glow(S, cx, cy, r * 3.2, "orange", 0.45, g); DS.shape(S, circ(cx, cy, r), "yellow", { w: "detail", c: DS.c("gold", 1), parent: g }); fadeG(S, g, o.t); return { g, cx, cy, r }; };
// log-spiral galaxy, tilted; core glow
const galaxy = (S, cx, cy, R, o = {}) => {
  const g = S.grp(o.parent), inner = S.grp(g), A = [], Bm = [], C = [];
  glow(S, cx, cy, R * 1.3, "purple", 0.45, inner, 1); glow(S, cx, cy, R * 0.6, "gold", 0.6, inner, 1);
  for (let arm = 0; arm < 2; arm++) for (let i = 0; i < 460; i++) {
    const u = i / 460, a = arm * Math.PI + u * 5.4 + (rnd() - 0.5) * 0.35, r = R * (0.12 + 0.88 * u) * (1 + (rnd() - 0.5) * 0.18), x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r * 0.46;
    (rnd() < 0.6 ? A : rnd() < 0.7 ? Bm : C).push(circ(x, y, 1.6 + rnd() * 2.2 * (1 - u * 0.4)));
  }
  S.fill(A.join(" "), S.start, 0, DS.c("sky", 1), 0.85, inner); S.fill(Bm.join(" "), S.start, 0, DS.c("pink", 1), 0.8, inner); S.fill(C.join(" "), S.start, 0, DS.P.white[0], 0.95, inner);
  inner.setAttribute("transform", `rotate(${o.tilt ?? -18} ${cx} ${cy})`);
  fadeG(S, g, o.t); return { g, cx, cy, R };
};
// radio dish on a stand, base at (x,y), pointing outward at ang (deg, 0 = up)
const dish = (S, x, y, k, ang, o = {}) => {
  const g = S.grp(o.parent), l = S.grp(g); l.setAttribute("transform", `translate(${x} ${y}) rotate(${ang}) scale(${k})`);
  const w1 = DS.w.mid / k;
  S.draw("M0 0 L0 -34 M-18 0 L18 0", S.start, 0, { c: DS.c("gray", 1), w: w1, parent: l });
  S.draw("M-34 -52 Q0 -8 34 -52 Q0 -30 -34 -52 Z", S.start, 0, { fill: DS.vol("white"), c: DS.c("gray", 1), w: DS.w.detail / k, parent: l });
  S.draw("M0 -40 L0 -78", S.start, 0, { c: DS.c("gray", 1), w: DS.w.detail / k, parent: l }); S.fill(circ(0, -80, 5), S.start, 0, DS.c("red", 1), 1, l);
  fadeG(S, g, o.t); return g;
};
const planeOf = (cx, cy, a, r) => [cx + Math.sin((a * Math.PI) / 180) * r, cy - Math.cos((a * Math.PI) / 180) * r];
const clockD = (S, cx, cy, r, o = {}) => {
  const g = S.grp(o.parent); DS.shape(S, circ(cx, cy, r), "white", { flat: true, tone: 0, w: "mid", c: DS.c("gray", 1), parent: g });
  S.draw(rays(cx, cy, r * 0.82, r * 0.94, 12, 0), S.start, 0, { c: DS.c("ink", 1), w: DS.w.detail, parent: g });
  const hh = S.grp(g), mh = S.grp(g), a = ((o.h ?? 10) % 12) * 30 + (o.m ?? 10) * 0.5, b = (o.m ?? 10) * 6;
  S.draw(`M${cx} ${cy} L${cx} ${cy - r * 0.5}`, S.start, 0, { c: DS.c("ink"), w: DS.w.mid, parent: hh }); S.draw(`M${cx} ${cy} L${cx} ${cy - r * 0.75}`, S.start, 0, { c: DS.c("ink"), w: DS.w.detail, parent: mh });
  hh.setAttribute("transform", `rotate(${a} ${cx} ${cy})`); mh.setAttribute("transform", `rotate(${b} ${cx} ${cy})`);
  S.fill(circ(cx, cy, r * 0.07), S.start, 0, DS.c("ink"), 1, g);
  if (o.sweep) { spin(mh, o.sweep[0], o.sweep[1], b, b + (o.sweep[2] ?? 1) * 360, cx, cy, o.ease || "none"); spin(hh, o.sweep[0], o.sweep[1], a, a + (o.sweep[2] ?? 1) * 30, cx, cy, o.ease || "none"); }
  fadeG(S, g, o.t); return { g, mh, hh };
};
const spaghetti = (S, cx, cy, k, o = {}) => {
  const g = S.grp(o.parent);
  DS.shape(S, circ(cx, cy + 10 * k, 120 * k, 38 * k), "white", { flat: true, w: "detail", c: DS.c("gray", 1), parent: g });
  S.draw(circ(cx, cy, 120 * k, 38 * k), S.start, 0, { fill: DS.c("white", 2), c: DS.c("gray", 1), w: DS.w.detail, parent: g });
  const n = DS.c("gold", 1);
  [[-90, -8, -30, -36, 20, -26, 80, 0], [-70, 6, -10, -30, 40, -14, 96, 8], [-50, -14, 0, 14, 36, -34, 70, 10], [-96, 2, -60, -28, -10, -10, 60, -14], [-30, -22, 10, -40, 60, -20, 90, 4]].forEach(([a, b, c, d, e, f, gx, gy]) =>
    S.draw(smooth([[cx + a * k, cy + b * k], [cx + c * k, cy + d * k], [cx + e * k, cy + f * k], [cx + gx * k, cy + gy * k]]), S.start, 0, { c: n, w: DS.w.near * Math.max(0.6, k), parent: g }));
  DS.shape(S, circ(cx + 26 * k, cy - 18 * k, 24 * k), "brown", { w: "detail", parent: g });
  S.fill(circ(cx - 40 * k, cy - 14 * k, 10 * k), S.start, 0, DS.c("red", 1), 0.9, g);
  fadeG(S, g, o.t); return g;
};

// ---------- people ----------
const who = (S, x, gy, layer = "near", o = {}) => {
  const s = (o.s || 1.1) * DS.depth[layer].s, g = o.parent || S.grp();
  if (!o.float) DS.shadow(S, x, o.gs ?? gy, 150 * s, { t: o.t, parent: g });
  const F = S.fig(x, gy, Object.assign({ hair: "short", outfit: "tee", c: DS.P.white[0] }, o, { s, parent: g, w: DS.w[DS.depth[layer].w] * 1.3 * Math.sqrt(s) })).draw(o.t ?? S.start, 0.4);
  F.face(o.t ?? S.start, o.mood || "flat", o.look || 0);
  F.all = g; F.look = o.look || 0; F.s0 = s;
  return F;
};
const helmet = (S, F) => { const [x, y] = F.hd, R = F.r * 1.42; S.draw(circ(x, y, R), S.start, 0, { c: DS.c("sky", 1), w: DS.w.detail, parent: F.g }); S.draw(arc(x, y, R * 0.86, 205, 250), S.start, 0, { c: DS.P.white[0], w: DS.w.mid, op: 0.8, parent: F.g }); };
const DAVE = { s: 1.1, hair: "side", hairC: DS.c("brown"), outfitC: DS.c("blue"), float: true };
const dave = (S, x, gy, layer = "near", o = {}) => { const F = who(S, x, gy, layer, Object.assign({}, DAVE, o)); if (o.helmet !== false) helmet(S, F); return F; };
const LABCOAT = { s: 1.1, hair: "side", hairC: DS.c("ink", 1), outfitC: DS.c("white", 2), float: true };
const person = (S, x, gy, layer, i, o = {}) => who(S, x, gy, layer, Object.assign({ s: 1.1, hair: ["short", "bun", "curly", "side"][i % 4], hairC: DS.c(["brown", "gold", "earth", "gray"][i % 4], 1), outfitC: DS.c(["green", "purple", "orange", "pink"][i % 4]), mood: "flat", float: true }, o));
// the news friend on the ship: purple blazer, bun, a microphone with a gold ball
const NEWS = { s: 1.1, hair: "bun", hairC: DS.c("earth", 2), outfitC: DS.c("purple"), float: true };
const reporter = (S, x, gy, layer = "near", o = {}) => {
  const F = who(S, x, gy, layer, Object.assign({}, NEWS, o)), [hx, hy] = F.hand("R", o.pose || "hold"), k = F.s;
  if (o.mic !== false) { S.draw(`M${hx} ${hy + 8 * k} L${hx + 4 * k} ${hy - 36 * k}`, S.start, 0, { c: DS.c("gray", 1), w: DS.w.near * Math.sqrt(k), parent: F.g }); DS.shape(S, circ(hx + 5 * k, hy - 48 * k, 14 * k), "gold", { w: "detail", parent: F.g }); }
  return F;
};
// mouth that opens and closes between t0 and t1 (the character speaks on their line)
const talk = (S, F, t0, t1) => {
  const [x, y] = F.hd, R = F.r, my = y + R * 0.47, m = S.fill(circ(x, my, R * 0.2, R * 0.15), S.start, 0, DS.c("red", 2), 1, F.g);
  const sy = (k) => `translate(${x} ${my}) scale(1 ${k}) translate(${-x} ${-my})`;
  m.setAttribute("opacity", 0); tl.set(m, { opacity: 1 }, t0); tl.set(m, { opacity: 0 }, t1);
  const n = Math.max(1, Math.floor((t1 - t0) / 0.24));
  tl.fromTo(m, { attr: { transform: sy(0.2) } }, { attr: { transform: sy(1) }, duration: 0.12, ease: "sine.inOut", yoyo: true, repeat: n * 2 - 1, immediateRender: false }, t0);
};
const sweat = (S, F, t) => S.fill(`M${F.hd[0] + F.r * 1.05} ${F.hd[1] - F.r * 0.6} Q${F.hd[0] + F.r * 1.3} ${F.hd[1] - F.r * 0.1} ${F.hd[0] + F.r * 1.05} ${F.hd[1] - F.r * 0.05} Q${F.hd[0] + F.r * 0.82} ${F.hd[1] - F.r * 0.1} ${F.hd[0] + F.r * 1.05} ${F.hd[1] - F.r * 0.6} Z`, t ?? S.start, 0, DS.c("sky", 1), 1, F.g);
// cartoon stretch: the body (not the head) grows sy times longer and sx thinner, hanging from the chin
const stretch = (S, F, t, dur, sx, sy, ease = "power2.inOut") => {
  const px = F.cx, py = F.hd[1] + F.r, tf = (a, b) => `translate(${px} ${py}) scale(${a} ${b}) translate(${-px} ${-py})`, one = (e, a0, b0, a1, b1) => tl.fromTo(e, { attr: { transform: tf(a0, b0) } }, { attr: { transform: tf(a1, b1) }, duration: dur, ease, immediateRender: false }, t);
  one(F.gi, 1, 1, sx, sy);
  [F.P.head, ...Object.keys(F.P).filter((k) => /^hair/.test(k)).map((k) => F.P[k]), F.faceG].forEach((e) => one(e, 1, 1, 1 / sx, 1 / sy));
};
const lowerThird = (S, head, sub, t, o = {}) => {
  const g = S.grp(), wd = o.w || 1180, x = (o.cx || 960) - wd / 2, y = o.y || 770;
  DS.drop(S, rrect(x + 6, y + 8, wd, 140, DS.r.md), { t, parent: g });
  S.draw(rrect(x, y, wd, 140, DS.r.md), S.start, 0, { fill: DS.c("navy", 2), c: DS.P.white[0], w: DS.w.detail, parent: g });
  S.draw(rrect(x, y, 180, 140, DS.r.md), S.start, 0, { fill: DS.c("red", 2), c: DS.P.white[0], w: DS.w.detail, parent: g });
  S.fill(circ(x + 38, y + 70, 11), S.start, 0, DS.P.white[0], 1, g); S.text(o.tag || "LIVE", x + 114, y + 88, { size: DS.type.caption, c: DS.P.white[0], t: T0(S), parent: g, weight: 700 });
  S.text(head, x + 200 + (wd - 200) / 2, y + (sub ? 62 : 88), { size: DS.type.small, c: DS.P.white[0], t: T0(S), parent: g });
  if (sub) S.text(sub, x + 200 + (wd - 200) / 2, y + 116, { size: DS.type.caption, c: DS.c("sky", 1), t: T0(S), parent: g });
  return fadeG(S, g, t);
};
// distance readout chip (the visual runner): top-left, cyan on dark
const hud = (S, label, val, t, o = {}) => {
  const g = S.grp(), x = o.x ?? 110, y = o.y ?? 96, wd = o.wd ?? 640, size = o.size || DS.type.title, ht = 66 + size * 1.25;
  S.draw(rrect(x, y, wd, ht, DS.r.md), S.start, 0, { fill: DS.c("navy", 2), c: DS.c("sky", 1), w: DS.w.detail, parent: g });
  S.text(label, x + 28, y + 46, { size: DS.type.caption, c: DS.c("sky", 1), anchor: "start", t: T0(S), parent: g });
  const te = S.text(val, x + 28, y + ht - 24, { size, c: DS.P.white[0], anchor: "start", t: T0(S), parent: g });
  fadeG(S, g, t); return { g, te };
};

// ---------- the ship and its bridge ----------
// side-view ship facing right, centre (x, y); lit portholes; steady engine glow
const ship = (S, x, y, k = 1, o = {}) => {
  const g = S.grp(o.parent), c = DS.c("gray", 1), rr = 58 * k;
  glow(S, x - 210 * k, y, 120 * k, "orange", 0.5, g);
  S.fill(`M${x - 190 * k} ${y - 30 * k} L${x - 300 * k} ${y} L${x - 190 * k} ${y + 30 * k} Z`, S.start, 0, lin([[0, DS.c("orange", 0), 0], [1, DS.c("yellow", 1), 0.85]]), 1, g);
  DS.shape(S, `M${x - 120 * k} ${y - 56 * k} L${x - 190 * k} ${y - 130 * k} L${x - 70 * k} ${y - 56 * k} Z`, "red", { w: "detail", c, parent: g });
  DS.shape(S, `M${x - 120 * k} ${y + 56 * k} L${x - 190 * k} ${y + 130 * k} L${x - 70 * k} ${y + 56 * k} Z`, "red", { w: "detail", c, parent: g });
  DS.shape(S, rrect(x - 190 * k, y - 58 * k, 380 * k, 116 * k, rr), "white", { tone: 2, w: "mid", c, parent: g });
  DS.shape(S, `M${x + 60 * k} ${y - 58 * k} Q${x + 190 * k} ${y - 70 * k} ${x + 230 * k} ${y} Q${x + 190 * k} ${y + 70 * k} ${x + 60 * k} ${y + 58 * k} Z`, "gray", { tone: 1, w: "mid", c, parent: g });
  DS.shape(S, circ(x + 120 * k, y - 8 * k, 30 * k, 26 * k), "sky", { w: "detail", c, parent: g });
  [-110, -50, 10].forEach((dx) => { S.fill(circ(x + dx * k, y, 20 * k), S.start, 0, DS.c("yellow", 1), 1, g); S.draw(circ(x + dx * k, y, 20 * k), S.start, 0, { c, w: DS.w.detail, parent: g }); });
  S.draw(`M${x - 190 * k} ${y + 34 * k} H${x + 60 * k}`, S.start, 0, { c: DS.c("blue"), w: DS.w.mid, parent: g });
  fadeG(S, g, o.t); return { g, x, y, k, port: [x - 50 * k, y] };
};
// inside the ship: wall, a big viewport (clipped group `vg` for what's outside), steady console lights, floor
const bridge = (S, o = {}) => {
  const g = S.grp(); S.g.insertBefore(g, S.g.firstChild); DS.setHaze("navy");
  S.fill("M-200 -200 H2120 V1280 H-200 Z", S.start, 0, DS.vgrad(DS.c("navy", 1), DS.c("navy", 2)), 1, g);
  S.fill("M-200 800 H2120 V1280 H-200 Z", S.start, 0, DS.vgrad(DS.c("navy", 2), DS.c("ink", 0)), 1, g);
  const [wx, wy, ww, wh] = o.win || [420, 100, 1080, 540];
  DS.shape(S, rrect(wx - 34, wy - 34, ww + 68, wh + 68, DS.r.lg), "gray", { tone: 2, w: "mid", c: DS.c("gray", 1), parent: g });
  S.fill(rrect(wx, wy, ww, wh, DS.r.md), S.start, 0, DS.vgrad(DS.c("navy", 2), DS.c("ink", 2)), 1, g);
  const vg = clipG(S, rrect(wx, wy, ww, wh, DS.r.md), g);
  glow(S, wx + ww * 0.7, wy + wh * 0.55, 420, "purple", 0.3, vg, 2);
  starsIn(S, 55, wx, wy, wx + ww, wy + wh, vg);
  [wx + ww / 3, wx + (2 * ww) / 3].forEach((bx) => S.fill(rect(bx - 8, wy, 16, wh), S.start, 0, DS.c("gray", 2), 1, g));
  DS.shape(S, rrect(wx - 130, wy + wh + 70, ww + 260, 130, DS.r.sm), "gray", { tone: 2, w: "mid", c: DS.c("gray", 1), parent: g });
  ["green", "yellow", "sky", "orange", "green", "sky", "yellow", "green", "orange", "sky"].forEach((n, i) => S.fill(circ(wx - 70 + i * ((ww + 140) / 9), wy + wh + 135, 11), S.start, 0, DS.c(n, 1), 1, g));
  return { g, vg, win: [wx, wy, ww, wh] };
};

// ---------- the postcard (runner) ----------
// o.side "front" | "back"; o.rot degrees; o.msg lines handwritten at o.msgT times; o.scramble jumbles the text
const postcard = (S, cx, cy, k = 1, o = {}) => {
  const g = S.grp(o.parent), w = 600 * k, h = 400 * k, x = cx - w / 2, y = cy - h / 2;
  DS.drop(S, rrect(x + 10, y + 14, w, h, DS.r.sm), { t: o.t, parent: g });
  DS.shape(S, rrect(x, y, w, h, DS.r.sm), "paper", { flat: true, w: "detail", c: DS.c("gray", 1), parent: g });
  if ((o.side || "back") === "front") {
    const iw = w - 48 * k, ih = h - 48 * k, ix = x + 24 * k, iy = y + 24 * k, cl = clipG(S, rrect(ix, iy, iw, ih, DS.r.xs), g);
    S.fill(rect(ix, iy, iw, ih), S.start, 0, DS.vgrad(DS.c("navy", 2), DS.c("ink", 2)), 1, cl);
    glow(S, ix + iw * 0.74, iy + ih * 0.68, 260 * k, "orange", 0.35, cl);
    starsIn(S, 36, ix, iy, ix + iw, iy + ih, cl);
    BH(S, ix + iw * 0.74, iy + ih * 0.68, 46 * k, { parent: cl, halo: 2.4 });
    if (!o.notext) [["GREETINGS FROM", 0.2, "gold"], ["INSIDE A", 0.38, "white"], ["BLACK HOLE", 0.56, "white"]].forEach(([s, f, n]) => S.text(s, ix + iw * 0.3, iy + ih * f, { size: DS.type.body, c: DS.c(n, 1), t: T0(S), parent: g, halo: DS.c("ink", 2), haloW: 0.12 }));
  } else {
    S.draw(`M${x + w * 0.56} ${y + 40 * k} V${y + h - 40 * k}`, S.start, 0, { c: DS.c("gray", 1), w: DS.w.detail, parent: g });
    [0.5, 0.62, 0.74].forEach((f) => S.draw(`M${x + w * 0.62} ${y + h * f} H${x + w - 40 * k}`, S.start, 0, { c: DS.c("gray", 1), w: DS.w.detail, parent: g }));
    S.draw(rrect(x + w - 150 * k, y + 36 * k, 110 * k, 130 * k, DS.r.xs), S.start, 0, { fill: DS.c("sand", 1), c: DS.c("earth", 2), w: DS.w.detail, parent: g });
    S.fill(circ(x + w - 95 * k, y + 110 * k, 26 * k), S.start, 0, DS.c("ink", 2), 1, g); S.draw(circ(x + w - 95 * k, y + 110 * k, 36 * k, 12 * k), S.start, 0, { c: DS.c("orange"), w: DS.w.detail, parent: g });
    S.draw(circ(x + w * 0.74, y + 76 * k, 46 * k), S.start, 0, { c: DS.c("gray", 2), w: DS.w.detail, parent: g, op: 0.55 });
    (o.msg || []).forEach((line, i) => S.text(line, x + w * 0.28, y + (110 + i * 58) * k, { size: o.size || DS.type.small, font: "caveat", c: DS.c("blue", 2), write: true, t: o.msgT?.[i] ?? T0(S), dur: o.dur || 1.2, parent: g }));
  }
  if (o.rot) g.setAttribute("transform", `rotate(${o.rot} ${cx} ${cy})`);
  fadeG(S, g, o.t); return { g, x, y, w, h };
};

// ---------- cards, diagrams ----------
// quote card: big gold quote mark, lines in ink on white, attribution under a rule
const quoteCard = (S, cx, cy, wd, ht, lines, by, t) => {
  const g = S.grp(), x = cx - wd / 2, y = cy - ht / 2;
  DS.drop(S, rrect(x + 8, y + 12, wd, ht, DS.r.lg), { t, parent: g });
  S.draw(rrect(x, y, wd, ht, DS.r.lg), S.start, 0, { fill: DS.P.white[0], c: DS.c("gold", 0), w: DS.w.near, parent: g });
  [0, 1].forEach((i) => { const qx = x + 80 + i * 56, qy = y + 120; S.draw(circ(qx, qy, 20), S.start, 0, { fill: DS.c("gold", 0), c: DS.c("gold", 0), w: DS.w.detail, parent: g }); S.draw(`M${qx + 18} ${qy + 4} Q${qx + 16} ${qy + 44} ${qx - 16} ${qy + 62}`, S.start, 0, { c: DS.c("gold", 0), w: DS.w.near * 1.4, parent: g }); });
  const lh = DS.type.body * 1.25, y0 = y + 120 + (ht - 260 - lines.length * lh) / 2 + lh * 0.6;
  lines.forEach((l, i) => S.text(l, cx + 20, y0 + i * lh + 36, { size: DS.type.body, c: DS.c("ink"), t: T0(S), parent: g }));
  S.draw(`M${x + 80} ${y + ht - 100} H${x + wd - 80}`, S.start, 0, { c: DS.c("gray", 1), w: DS.w.detail, parent: g });
  S.text(by, cx, y + ht - 42, { size: DS.type.caption, c: DS.c("gray", 2), t: T0(S), parent: g });
  return fadeG(S, g, t);
};
// two-line number badge: big white number over a small caption on a card
const badge = (S, cx, cy, big, small, t, o = {}) => {
  const g = S.grp(), wd = Math.max(big.length * DS.type.title * 0.64, small.length * DS.type.caption * 0.62) + 90, ht = 190;
  DS.drop(S, rrect(cx - wd / 2 + 6, cy - ht / 2 + 10, wd, ht, DS.r.md), { t, parent: g });
  S.draw(rrect(cx - wd / 2, cy - ht / 2, wd, ht, DS.r.md), S.start, 0, { fill: DS.P.white[0], c: DS.c(o.c || "ink", 0), w: DS.w.detail, parent: g });
  S.text(big, cx, cy + 6, { size: DS.type.title, c: DS.c(o.num || "red", 2), t: T0(S), parent: g });
  S.text(small, cx, cy + 62, { size: DS.type.caption, c: DS.c("ink"), t: T0(S), parent: g });
  return fadeG(S, g, t);
};
// a thin horizontal measuring line with end ticks and a centred label card
const measure = (S, x1, x2, y, str, t, o = {}) => {
  const g = S.grp(), c = DS.c(o.c || "white", o.tone || 0);
  S.draw(`M${x1} ${y} H${x2} M${x1} ${y - 18} V${y + 18} M${x2} ${y - 18} V${y + 18}`, S.start, 0, { c, w: DS.w.mid, parent: g });
  if (str) DS.card(S, str, (x1 + x2) / 2, y - 64, { size: o.size || DS.type.caption, t: t ?? T0(S), parent: g });
  return fadeG(S, g, t);
};
// puzzle piece
const puzzle = (S, cx, cy, k, t, name = "gold") => DS.shape(S, `M${cx - 60 * k} ${cy - 60 * k} H${cx - 14 * k} C${cx - 40 * k} ${cy - 110 * k} ${cx + 40 * k} ${cy - 110 * k} ${cx + 14 * k} ${cy - 60 * k} H${cx + 60 * k} V${cy - 14 * k} C${cx + 110 * k} ${cy - 40 * k} ${cx + 110 * k} ${cy + 40 * k} ${cx + 60 * k} ${cy + 14 * k} V${cx * 0 + cy + 60 * k} H${cx - 60 * k} Z`, name, { w: "near", t });
// phone with a little map: road lines, a car, and a pin (o.pin = [dx, dy] offset of the pin from the car)
const phoneMap = (S, cx, cy, k, o = {}) => {
  const g = S.grp(), w = 260 * k, h = 480 * k, x = cx - w / 2, y = cy - h / 2;
  DS.drop(S, rrect(x + 8, y + 12, w, h, DS.r.lg), { parent: g });
  DS.shape(S, rrect(x, y, w, h, DS.r.lg), "ink", { tone: 1, w: "mid", c: DS.c("gray", 1), parent: g });
  const cl = clipG(S, rrect(x + 16 * k, y + 40 * k, w - 32 * k, h - 80 * k, DS.r.sm), g);
  S.fill(rect(x, y, w, h), S.start, 0, DS.c("sand", 1), 1, cl);
  [[0.1, 0.3, 0.9, 0.3], [0.15, 0.6, 0.85, 0.6], [0.3, 0.1, 0.3, 0.95], [0.7, 0.1, 0.7, 0.95]].forEach(([a, b, c, d]) => S.draw(`M${x + w * a} ${y + h * b} L${x + w * c} ${y + h * d}`, S.start, 0, { c: DS.P.white[0], w: DS.w.far * 2, parent: cl }));
  const car = [cx - 30 * k, cy + 60 * k]; DS.shape(S, rrect(car[0] - 22 * k, car[1] - 11 * k, 44 * k, 22 * k, DS.r.xs), "blue", { w: "detail", parent: cl });
  return { g, car, cl, k };
};

// ---------- small icons (local coordinates, scaled) ----------
const iconG = (S, x, y, k, parent) => { const g = S.grp(parent); g.setAttribute("transform", `translate(${x} ${y}) scale(${k})`); return g; };
const wk = (k, name = "mid") => DS.w[name] / k;
const qmark = (S, x, y, k, t, name = "gold", parent) => { const g = iconG(S, x, y, k, parent), c = DS.c(name, 1); S.draw("M-46 -70 C-46 -150 56 -150 56 -76 C56 -34 4 -34 4 18 V40", S.start, 0, { c, w: wk(k, "near") * 2.2, parent: g }); S.fill(circ(4, 86, 12), S.start, 0, c, 1, g); return fadeG(S, g, t); };
const rocketI = (S, x, y, k, parent) => { const g = iconG(S, x, y, k, parent), ink = DS.c("ink");
  S.draw("M0 -100 Q46 -50 34 56 L-34 56 Q-46 -50 0 -100 Z", S.start, 0, { fill: DS.c("white", 2), c: ink, w: wk(k), parent: g });
  S.draw("M0 -100 Q22 -78 28 -52 L-28 -52 Q-22 -78 0 -100 Z", S.start, 0, { fill: DS.c("red", 0), c: ink, w: wk(k, "detail"), parent: g });
  S.draw(circ(0, -14, 16), S.start, 0, { fill: DS.c("sky", 0), c: ink, w: wk(k, "detail"), parent: g });
  S.draw("M-34 20 L-62 74 L-34 56 Z M34 20 L62 74 L34 56 Z", S.start, 0, { fill: DS.c("red", 0), c: ink, w: wk(k, "detail"), parent: g });
  S.draw("M-16 56 Q0 108 16 56 Z", S.start, 0, { fill: DS.c("orange", 0), c: ink, w: wk(k, "detail"), parent: g }); return g; };
const lightI = (S, x, y, k, parent) => { const g = iconG(S, x, y, k, parent), c = DS.c("orange", 0);
  S.draw(circ(0, 0, 30), S.start, 0, { fill: DS.c("yellow", 0), c, w: wk(k), parent: g }); S.draw(rays(0, 0, 48, 78, 10, 0), S.start, 0, { c, w: wk(k), parent: g }); return g; };
const mailI = (S, x, y, k, parent) => { const g = iconG(S, x, y, k, parent), ink = DS.c("ink");
  S.draw(rrect(-80, -52, 160, 104, DS.r.xs), S.start, 0, { fill: DS.c("paper", 2), c: ink, w: wk(k), parent: g });
  S.draw("M-80 -52 L0 12 L80 -52", S.start, 0, { c: ink, w: wk(k, "detail"), parent: g });
  S.draw(rrect(36, -40, 30, 36, DS.r.xs), S.start, 0, { fill: DS.c("red", 1), c: ink, w: wk(k, "hair"), parent: g }); return g; };
// white panel (card body) with a soft drop shadow
const panel = (S, cx, cy, wd, ht, t, name = "white", o = {}) => { const g = S.grp(o.parent); DS.drop(S, rrect(cx - wd / 2 + 8, cy - ht / 2 + 12, wd, ht, DS.r.md), { t, parent: g }); S.draw(rrect(cx - wd / 2, cy - ht / 2, wd, ht, DS.r.md), S.start, 0, { fill: DS.c(name, o.tone ?? 0), c: o.c || DS.c("ink"), w: DS.w.detail, parent: g }); return fadeG(S, g, t); };
// a dark "screen" panel for icons that glow (navy, white outline)
const screen = (S, cx, cy, wd, ht, t, parent) => { const g = S.grp(parent); S.draw(rrect(cx - wd / 2, cy - ht / 2, wd, ht, DS.r.md), S.start, 0, { fill: DS.c("navy", 2), c: DS.c("sky", 1), w: DS.w.detail, parent: g }); return fadeG(S, g, t); };
const ledge = (S, x0, x1, y) => { const w = x1 - x0, P = (pts) => pts.map(([a, b]) => `${x0 + a * w} ${y + b}`).join(" L");
  DS.shape(S, `M${P([[0, 0], [0.5, -10], [1, -16], [0.96, 40], [0.86, 110], [0.7, 150], [0.52, 190], [0.36, 160], [0.2, 120], [0.06, 60]])} Z`, "gray", { tone: 2, w: "mid", c: DS.c("gray", 1) });
  DS.shape(S, `M${P([[0, 0], [0.5, -10], [1, -16], [0.98, 16], [0.5, 24], [0.02, 22]])} Z`, "gray", { tone: 1, w: "detail", c: DS.c("gray", 1) });
  [[0.25, 80, 40], [0.55, 110, 52], [0.78, 60, 30]].forEach(([a, b, r]) => S.fill(circ(x0 + a * w, y + b, r, r * 0.55), S.start, 0, DS.c("gray", 2), 0.45)); };
const pool = (S, cx, cy, k, parent) => { const g = S.grp(parent);
  S.draw(rrect(cx - 120 * k, cy - 40 * k, 240 * k, 100 * k, DS.r.sm), S.start, 0, { fill: DS.vol("sky"), c: DS.c("blue", 2), w: DS.w.detail, parent: g });
  S.draw(`M${cx - 100 * k} ${cy - 6 * k} q${25 * k} ${-18 * k} ${50 * k} 0 t${50 * k} 0 t${50 * k} 0 t${50 * k} 0`, S.start, 0, { c: DS.P.white[0], w: DS.w.detail, parent: g });
  S.draw(`M${cx + 70 * k} ${cy - 40 * k} V${cy - 96 * k} Q${cx + 70 * k} ${cy - 124 * k} ${cx + 104 * k} ${cy - 124 * k} M${cx + 100 * k} ${cy - 40 * k} V${cy - 92 * k}`, S.start, 0, { c: DS.c("gray", 1), w: DS.w.mid, parent: g });
  S.draw(circ(cx - 40 * k, cy - 6 * k, 22 * k, 7 * k), S.start, 0, { c: DS.P.white[0], w: DS.w.detail, parent: g }); return g; };

// ---------- more props ----------
// Polaroid-style photo frame holding our own stylised ring. Returns the inner box.
const photo = (S, cx, cy, wd, ht, o = {}) => {
  const g = S.grp(o.parent), x = cx - wd / 2, y = cy - ht / 2, m = wd * 0.07, iw = wd - 2 * m, ih = ht - m - ht * 0.2;
  DS.drop(S, rrect(x + 10, y + 14, wd, ht, DS.r.xs), { t: o.t, parent: g });
  S.draw(rrect(x, y, wd, ht, DS.r.xs), S.start, 0, { fill: DS.P.white[0], c: DS.c("gray", 1), w: DS.w.detail, parent: g });
  const cl = clipG(S, rect(x + m, y + m, iw, ih), g); S.fill(rect(x + m, y + m, iw, ih), S.start, 0, DS.vgrad(DS.c("navy", 2), DS.c("ink", 2)), 1, cl);
  ehtRing(S, x + m + iw / 2, y + m + ih / 2, Math.min(iw, ih) * (o.r || 0.24), { parent: cl });
  if (o.rot) g.setAttribute("transform", `rotate(${o.rot} ${cx} ${cy})`);
  fadeG(S, g, o.t); return { g, cx: x + m + iw / 2, cy: y + m + ih / 2, x, y, wd, ht };
};
const doughnut = (S, x, y, k, parent) => {
  const g = S.grp(parent);
  DS.shape(S, circ(x, y + 10 * k, 100 * k, 62 * k), "earth", { tone: 2, w: "detail", parent: g });
  DS.shape(S, circ(x, y, 100 * k, 62 * k), "pink", { w: "detail", parent: g });
  S.fill(circ(x, y - 4 * k, 84 * k, 50 * k), S.start, 0, DS.c("pink", 1), 0.9, g);
  S.draw(circ(x, y, 32 * k, 19 * k), S.start, 0, { fill: DS.c("gray", 1), c: DS.c("pink", 2), w: DS.w.detail, parent: g });
  [[-62, -14, "yellow"], [-30, -34, "sky"], [20, -36, "green"], [58, -12, "yellow"], [60, 20, "sky"], [-8, 38, "green"], [-56, 18, "orange"], [30, 34, "purple"]].forEach(([dx, dy, n], i) => S.draw(`M${x + dx * k} ${y + dy * k} l${10 * k} ${(i % 2 ? 4 : -4) * k}`, S.start, 0, { c: DS.c(n, 1), w: DS.w.mid, parent: g }));
  return g;
};
const telescope = (S, x, y, k, ang, o = {}) => {
  const g = S.grp(o.parent);
  S.draw(`M${x} ${y} L${x - 70 * k} ${y + 200 * k} M${x} ${y} L${x + 70 * k} ${y + 200 * k} M${x} ${y} L${x + 10 * k} ${y + 210 * k}`, S.start, 0, { c: DS.c("gray", 1), w: DS.w.near, parent: g });
  const t = S.grp(g); t.setAttribute("transform", `rotate(${ang} ${x} ${y})`);
  DS.shape(S, rrect(x - 30 * k, y - 36 * k, 220 * k, 72 * k, DS.r.sm), "white", { tone: 2, w: "mid", c: DS.c("gray", 1), parent: t });
  DS.shape(S, rect(x + 190 * k, y - 46 * k, 36 * k, 92 * k), "gray", { tone: 1, w: "mid", c: DS.c("gray", 1), parent: t });
  DS.shape(S, rect(x - 56 * k, y - 22 * k, 26 * k, 44 * k), "gray", { tone: 2, w: "detail", c: DS.c("gray", 1), parent: t });
  return g;
};
// video camera icon (the "virtual camera")
const camI = (S, x, y, k, parent) => { const g = iconG(S, x, y, k, parent), ink = DS.c("ink");
  S.draw(rrect(-80, -44, 120, 88, DS.r.sm), S.start, 0, { fill: DS.c("gray", 1), c: ink, w: wk(k), parent: g });
  S.draw("M40 -14 L96 -44 V44 L40 14 Z", S.start, 0, { fill: DS.c("gray", 0), c: ink, w: wk(k), parent: g });
  S.draw(circ(-44, -66, 26), S.start, 0, { fill: DS.c("gray", 1), c: ink, w: wk(k, "detail"), parent: g }); S.draw(circ(8, -66, 26), S.start, 0, { fill: DS.c("gray", 1), c: ink, w: wk(k, "detail"), parent: g });
  S.fill(circ(-54, 0, 10), S.start, 0, DS.c("red", 1), 1, g); return g; };
const eyeI = (S, x, y, k, parent) => { const g = iconG(S, x, y, k, parent), ink = DS.c("ink");
  S.draw("M-70 0 Q0 -64 70 0 Q0 64 -70 0 Z", S.start, 0, { fill: DS.P.white[0], c: ink, w: wk(k), parent: g }); S.draw(circ(8, 0, 24), S.start, 0, { fill: DS.c("blue", 0), c: ink, w: wk(k, "detail"), parent: g }); S.fill(circ(12, -2, 11), S.start, 0, ink, 1, g); return g; };
// a supercomputer: three tall cabinets with rows of steady lights
const rack = (S, cx, cy, k, parent) => { const g = S.grp(parent);
  [-1, 0, 1].forEach((i) => { const x = cx + i * 150 * k, y = cy - 230 * k; DS.shape(S, rrect(x - 66 * k, y, 132 * k, 460 * k, DS.r.sm), "gray", { tone: 2, w: "mid", c: DS.c("gray", 1), parent: g });
    for (let r = 0; r < 8; r++) { S.fill(rect(x - 46 * k, y + (40 + r * 48) * k, 56 * k, 8 * k), S.start, 0, DS.c(r % 3 === 0 ? "green" : r % 3 === 1 ? "sky" : "yellow", 1), 0.95, g); S.fill(circ(x + 38 * k, y + (44 + r * 48) * k, 6 * k), S.start, 0, DS.c("green", 1), 1, g); } });
  return g; };
// steady boot flames under a figure's feet
const flames = (S, F, parent) => { const g = S.grp(parent || F.g), k = F.s; [-1, 1].forEach((sd) => { const x = F.cx + sd * 34 * k, y = F.gy + 4 * k;
  S.fill(`M${x - 14 * k} ${y} Q${x} ${y + 110 * k} ${x + 14 * k} ${y} Z`, S.start, 0, DS.c("orange", 0), 0.95, g); S.fill(`M${x - 7 * k} ${y} Q${x} ${y + 62 * k} ${x + 7 * k} ${y} Z`, S.start, 0, DS.c("yellow", 1), 1, g); }); return g; };
// stars smeared into arcs around (cx, cy): longer and brighter near the hole
const lensArcs = (S, cx, cy, rmin, rmax, n, parent) => {
  const g = S.grp(parent);
  for (let i = 0; i < n; i++) {
    const u = Math.pow(rnd(), 1.5), r = rmin + (rmax - rmin) * u, a0 = rnd() * 360, span = 16 + 62 * (1 - u), nm = ["white", "sky", "gold", "pink"][i % 4];
    S.draw(arc(cx, cy, r, a0, a0 + span), S.start, 0, { c: DS.c(nm, 1), w: u < 0.3 ? DS.w.mid : DS.w.detail, op: 0.55 + 0.4 * (1 - u), parent: g });
  }
  return g;
};
// seek-safe motion of a group along a polyline pts over [t, t+dur]
const follow = (g, pts, t, dur, ease = "none") => {
  const set = (u) => { const f = u * (pts.length - 1), i = Math.min(pts.length - 2, Math.floor(f)), r = f - i, x = pts[i][0] + (pts[i + 1][0] - pts[i][0]) * r, y = pts[i][1] + (pts[i + 1][1] - pts[i][1]) * r; g.setAttribute("transform", `translate(${x - pts[0][0]} ${y - pts[0][1]})`); };
  const v = { u: 0 }; set(0); tl.fromTo(v, { u: 0 }, { u: 1, duration: dur, ease, immediateRender: false, onUpdate: () => set(v.u) }, t);
};
const spiralPts = (cx, cy, r0, r1, a0deg, turns, n = 120) => Array.from({ length: n + 1 }, (_, i) => { const u = i / n, r = r0 + (r1 - r0) * u, a = ((a0deg + u * turns * 360) * Math.PI) / 180; return [cx + Math.cos(a) * r, cy + Math.sin(a) * r * 0.62]; });

// a thin tapering stream along pts (a star shredded into ribbons)
const ribbon = (S, pts, name, parent) => { const g = S.grp(parent), d = poly(pts, 0); S.draw(d, S.start, 0, { c: DS.c(name, 0), w: DS.w.near * 3, op: 0.22, parent: g }).setAttribute("filter", blur(4)); S.draw(d, S.start, 0, { c: DS.c(name, 1), w: DS.w.mid, op: 0.8, parent: g }); S.draw(d, S.start, 0, { c: DS.c("white", 0), w: DS.w.hair, op: 0.9, parent: g }); return g; };
const domeI = (S, x, y, k, parent) => { const g = S.grp(parent);
  DS.shape(S, rrect(x - 150 * k, y, 300 * k, 120 * k, DS.r.sm), "white", { tone: 2, w: "mid", c: DS.c("gray", 1), parent: g });
  DS.shape(S, `M${x - 120 * k} ${y} A${120 * k} ${120 * k} 0 0 1 ${x + 120 * k} ${y} Z`, "white", { w: "mid", c: DS.c("gray", 1), parent: g });
  S.draw(`M${x + 10 * k} ${y - 118 * k} L${x + 40 * k} ${y - 112 * k} L${x + 40 * k} ${y} L${x + 10 * k} ${y} Z`, S.start, 0, { fill: DS.c("navy", 2), c: DS.c("gray", 1), w: DS.w.detail, parent: g });
  S.draw(`M${x + 10 * k} ${y - 40 * k} L${x + 120 * k} ${y - 110 * k}`, S.start, 0, { c: DS.c("gray", 1), w: DS.w.near * k * 1.6, parent: g }); return g; };
// feet toward +x: lay a figure on its back pointing at a hole to its right (rotate about the hip)
const faceRight = (F) => F.all.setAttribute("transform", `rotate(-90 ${F.cx} ${F.hip[1]})`);
const miniPull = (S, x, y, t, parent) => who(S, x, y, "near", { s: 0.55, float: true, mood: "determined", pose: "armsUp", hair: "curly", hairC: DS.c("gold", 1), outfitC: DS.c("green"), parent, t });

// ONE WAY sign on a post, arrow pointing right
const oneWay = (S, x, y, k, parent) => { const g = S.grp(parent);
  S.draw(`M${x} ${y} V${y + 260 * k}`, S.start, 0, { c: DS.c("gray", 1), w: DS.w.near * 1.6, parent: g });
  DS.shape(S, rrect(x - 130 * k, y - 120 * k, 260 * k, 130 * k, DS.r.sm), "blue", { w: "mid", c: DS.P.white[0], parent: g });
  S.draw(`M${x - 90 * k} ${y - 76 * k} H${x + 50 * k} M${x + 10 * k} ${y - 106 * k} L${x + 56 * k} ${y - 76 * k} L${x + 10 * k} ${y - 46 * k}`, S.start, 0, { c: DS.P.white[0], w: DS.w.near, parent: g });
  S.text("ONE WAY", x, y - 8 * k, { size: DS.type.caption, c: DS.P.white[0], t: T0(S), parent: g }); return g; };
// one cartoon flame, base at (x, y), height h, leaning rot degrees (flat orange with a yellow core: kind, never scary)
const flame1 = (S, x, y, h, rot, parent) => { const g = S.grp(parent), k = h / 120; g.setAttribute("transform", `translate(${x} ${y}) rotate(${rot}) scale(${k})`);
  S.draw("M-34 0 C-44 -40 -18 -70 -10 -120 C8 -90 12 -70 22 -52 C34 -70 30 -90 34 -100 C54 -60 44 -20 34 0 Z", S.start, 0, { fill: DS.c("orange", 0), c: DS.c("red", 1), w: DS.w.detail / k, parent: g });
  S.fill("M-18 0 C-24 -24 -6 -44 0 -72 C14 -50 22 -36 18 0 Z", S.start, 0, DS.c("yellow", 1), 1, g); return g; };
// a wall of flames along a line from (x0, y0) to (x1, y1), tongues standing up
const fireWall = (S, x0, y0, x1, y1, parent, n = 7) => { const g = S.grp(parent); for (let i = 0; i < n; i++) { const u = (i + 0.5) / n; flame1(S, x0 + (x1 - x0) * u, y0 + (y1 - y0) * u, 150 + (i % 3) * 36, i % 2 ? 8 : -8, g); } return g; };
// the same flames standing on a circle's rim (outward), angles in degrees
const fireArc = (S, cx, cy, r, a0, a1, parent, n = 8) => { const g = S.grp(parent); for (let i = 0; i < n; i++) { const a = a0 + ((a1 - a0) * (i + 0.5)) / n, q = (a * Math.PI) / 180; flame1(S, cx + Math.cos(q) * r, cy + Math.sin(q) * r, 140 + (i % 3) * 34, a + 90 + (i % 2 ? 8 : -8), g); } return g; };
const deckChair = (S, x, y, parent) => { const g = S.grp(parent);
  S.draw(`M${x - 40} ${y} L${x - 100} ${y + 170} M${x + 120} ${y} L${x + 150} ${y + 170}`, S.start, 0, { c: DS.c("wood", 1), w: DS.w.near, parent: g });
  DS.shape(S, `M${x - 90} ${y - 200} L${x - 40} ${y - 200} L${x + 20} ${y - 10} L${x + 140} ${y - 10} L${x + 140} ${y + 30} L${x - 20} ${y + 30} Z`, "blue", { tone: 1, w: "mid", c: DS.P.white[0], parent: g }); return g; };
const popcorn = (S, x, y, k, parent) => { const g = S.grp(parent);
  [[-30, -40], [0, -54], [30, -40], [-16, -66], [18, -68]].forEach(([dx, dy]) => S.draw(circ(x + dx * k, y + dy * k, 17 * k), S.start, 0, { fill: DS.c("cream" in DS.P ? "cream" : "paper", 1), c: DS.c("gold", 1), w: DS.w.detail, parent: g }));
  DS.shape(S, `M${x - 44 * k} ${y - 30 * k} L${x + 44 * k} ${y - 30 * k} L${x + 34 * k} ${y + 56 * k} L${x - 34 * k} ${y + 56 * k} Z`, "red", { w: "detail", c: DS.P.white[0], parent: g });
  S.draw(`M${x - 15 * k} ${y - 28 * k} L${x - 11 * k} ${y + 54 * k} M${x + 15 * k} ${y - 28 * k} L${x + 11 * k} ${y + 54 * k}`, S.start, 0, { c: DS.P.white[0], w: DS.w.detail, parent: g }); return g; };
const satellite = (S, x, y, k, parent) => { const g = S.grp(parent);
  DS.shape(S, rect(x - 28 * k, y - 28 * k, 56 * k, 56 * k), "gold", { w: "mid", c: DS.c("gold", 2), parent: g });
  [-1, 1].forEach((sd) => { DS.shape(S, rect(x + sd * 40 * k - (sd > 0 ? 0 : 90 * k), y - 20 * k, 90 * k, 40 * k), "blue", { w: "detail", c: DS.P.white[0], parent: g }); });
  S.fill(circ(x, y - 40 * k, 6 * k), S.start, 0, DS.c("red", 1), 1, g); return g; };
const pinI = (S, x, y, k, parent) => { const g = S.grp(parent); S.draw(`M${x} ${y} C${x - 34 * k} ${y - 40 * k} ${x - 30 * k} ${y - 90 * k} ${x} ${y - 90 * k} C${x + 30 * k} ${y - 90 * k} ${x + 34 * k} ${y - 40 * k} ${x} ${y} Z`, S.start, 0, { fill: DS.c("red", 0), c: DS.c("red", 2), w: DS.w.detail, parent: g }); S.fill(circ(x, y - 62 * k, 10 * k), S.start, 0, DS.P.white[0], 1, g); return g; };
// smooth path through pts, sampled densely (for follow())
const catmull = (P, per = 14) => { const out = []; for (let i = 0; i < P.length - 1; i++) { const p0 = P[i - 1] || P[i], p1 = P[i], p2 = P[i + 1], p3 = P[i + 2] || P[i + 1]; for (let j = 0; j < per; j++) { const t = j / per, t2 = t * t, t3 = t2 * t; out.push([0, 1].map((a) => 0.5 * (2 * p1[a] + (-p0[a] + p2[a]) * t + (2 * p0[a] - 5 * p1[a] + 4 * p2[a] - p3[a]) * t2 + (-p0[a] + 3 * p1[a] - 3 * p2[a] + p3[a]) * t3))); } } out.push(P[P.length - 1]); return out; };
// mirror a group left-right about x (a figure turning round)
const flipX = (g, t, x) => tl.fromTo(g, { attr: { transform: `translate(${x} 0) scale(1 1) translate(${-x} 0)` } }, { attr: { transform: `translate(${x} 0) scale(-1 1) translate(${-x} 0)` }, duration: 0.5, ease: "power2.inOut", immediateRender: false }, t);
// circular timer ring that fills over [t, t+dur]
const ringFill = (S, cx, cy, r, t, dur, name = "gold", parent) => { const p = S.draw(circ(cx, cy, r), S.start, 0, { c: DS.c(name, 1), w: DS.w.near * 1.6, parent }); p.setAttribute("stroke-dasharray", "1 2"); p.setAttribute("transform", `rotate(-90 ${cx} ${cy})`); tl.fromTo(p, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: dur, ease: "none", immediateRender: false }, t); return p; };
const bars = (S, x, y, k, parent) => { const g = S.grp(parent); [0, 1, 2].forEach((i) => S.fill(rect(x + i * 30 * k, y - (30 + i * 26) * k, 20 * k, (30 + i * 26) * k), S.start, 0, DS.c("gray", 1), 1, g)); return g; };
const laptop = (S, cx, cy, wd, ht, parent) => { const g = S.grp(parent);
  DS.shape(S, rrect(cx - wd / 2, cy - ht / 2, wd, ht, DS.r.sm), "gray", { tone: 2, w: "mid", c: DS.c("gray", 1), parent: g });
  S.draw(rrect(cx - wd / 2 + 18, cy - ht / 2 + 18, wd - 36, ht - 36, DS.r.xs), S.start, 0, { fill: DS.c("navy", 2), c: DS.c("sky", 1), w: DS.w.hair, parent: g });
  DS.shape(S, `M${cx - wd * 0.6} ${cy + ht / 2} H${cx + wd * 0.6} L${cx + wd * 0.54} ${cy + ht / 2 + 34} H${cx - wd * 0.54} Z`, "gray", { tone: 1, w: "mid", c: DS.c("gray", 1), parent: g });
  return { g, x: cx - wd / 2 + 18, y: cy - ht / 2 + 18, w: wd - 36, h: ht - 36 }; };

// ---------- timing: one picture per beat, landing just after its first word (the 0.6 s crossfade covers the breath) ----------
const CUES = [];
const USED = [];
CUES.push([1, 0], [2, 0], [3, 0], [3, "Not"], [4, 0], [4, "Would#2"], [5, 0], [6, 0], [7, 0]);
CUES.push([8, 0], [9, 0], [10, 0], [10, "centre"], [11, 0], [11, "Four"], [11, "twenty-seven"], [12, 0], [12, "So"], [13, 0], [13, "fly"], [14, 0], [14, "Gravity"], [15, 0], [16, 0], [17, 0], [18, 0], [18, "You"], [18, "Dave"], [19, 0]);
CUES.push([20, 0], [21, 0], [21, "Dave"], [22, 0], [23, 0], [24, 0], [25, 0], [25, "Astrophysicists"], [26, 0], [27, 0], [27, "It"], [28, 0], [29, 0], [29, "Dave"], [30, 0], [31, 0]);
CUES.push([32, 0], [33, 0], [33, "sixth"], [34, 0], [35, 0], [36, 0], [37, 0], [37, "If"], [38, 0], [38, "On"], [39, 0], [40, 0], [41, 0], [42, 0], [43, 0], [44, 0], [44, "NASA"], [45, 0], [45, "But"], [46, 0], [47, 0], [47, "Others"], [48, 0], [48, "thousand"]);
CUES.push([49, 0], [50, 0], [51, 0], [51, "There's"], [52, 0], [53, 0], [54, 0], [55, 0], [56, 0], [57, 0], [57, "Dave"], [58, 0], [59, 0], [60, 0]);
CUES.push([61, 0], [61, "But"], [62, 0], [63, 0], [64, 0], [64, "Dave"], [65, 0], [66, 0], [67, 0]);
CUES.push([68, 0], [68, "In"], [69, 0], [70, 0], [70, "They"], [71, 0], [71, "Does"], [71, "It's"], [72, 0], [73, 0], [73, "So"], [74, 0], [75, 0]);
const WINS = sceneWindows(CUES.map(([c, k]) => [c, widx(c, k)]), -0.25);
const sc = (c, key, o) => { const w = widx(c, key), k = CUES.findIndex(([a, b]) => a === c && widx(a, b) === w); if (k < 0) throw new Error("no cue " + c + ":" + key); USED[k] = 1; return scene(WINS[k][0], WINS[k][1], o); };

// ===================== 1. Feet first =====================
// This is Dave. Dave has decided to fall into a black hole, feet first, like getting into a cold pool.
{ const S = sc(1, 0, { cam: "push", focus: "700 560" });
  space(S, { clear: [1420, 620, 420], glow: [1420, 620, 900, "orange", 0.16] });
  BH(S, 1420, 620, 170);
  ledge(S, 110, 820, 860);
  const F = dave(S, 470, 860, "near", { s: 1.25, pose: "hips", mood: "worried", look: 6, float: false });
  card(S, "DAVE", 250, 560, { t: K(1, "Dave") });
  arr(S, 600, 800, 1060, 760, K(1, "feet"), { c: "gold", bend: -0.25 });
  wtxt(S, "FEET FIRST", 820, 700, { size: DS.type.small, t: K(1, "feet"), halo: DS.c("ink", 2), haloW: 0.12 });
  const tg = S.grp(); S.thought(470, 185, 250, 100, 470, 330, S.start, 0.3, { parent: tg }); pool(S, 470, 200, 0.85, tg); S.text("brr", 640, 232, { size: DS.type.small, font: "caveat", c: DS.c("blue", 2), t: T0(S), parent: tg });
  fadeG(S, tg, K(1, "like"), 0.4); }

// He has even bought a postcard. On the back: greetings from inside a black hole.
{ const S = sc(2, 0, { cam: "push", focus: "960 560" });
  space(S, { glow: [960, 560, 900, "purple", 0.14] });
  const pg = S.grp(), fr = S.grp(pg), bk = S.grp(pg); postcard(S, 960, 540, 1.9, { side: "front", rot: -4, parent: fr });
  postcard(S, 960, 540, 1.9, { side: "back", rot: -3, parent: bk, size: DS.type.body, msg: ["greetings from", "inside a", "black hole"], msgT: [K(2, "greetings"), K(2, "inside"), K(2, "black")], dur: 0.9 });
  dim(fr, K(2, "On") - 0.3, 0.5, 1, 0); fadeG(S, bk, K(2, "On") - 0.3, 0.5); shift(pg, S.start, S.len, [0, 8], [0, -8]); }

// Small problem. Nothing has ever come back out of a black hole.
{ const S = sc(3, 0, { cam: "pull", focus: "1100 560" });
  space(S, { clear: [1250, 560, 420], glow: [1250, 560, 900, "orange", 0.16] });
  BH(S, 1250, 560, 190);
  arr(S, 1040, 560, 400, 560, K(3, "Nothing"), { c: "white", w: DS.w.near });
  xMark(S, 700, 560, 2.6, K(3, "come"));
  card(S, "NOTHING COMES OUT", 640, 200, { t: K(3, "Nothing") }); }

// Not light, not rockets, and probably not the post.
{ const S = sc(3, "Not", { cam: "push", focus: "960 540" });
  space(S, {});
  const X = [360, 960, 1560], T = [K(3, "light"), K(3, "rockets"), K(3, "post")];
  X.forEach((x, i) => { panel(S, x, 520, 440, 520, T[i]); });
  { const g = S.grp(); lightI(S, X[0], 500, 1.4, g); fadeG(S, g, T[0]); }
  { const g = S.grp(); rocketI(S, X[1], 500, 1.5, g); fadeG(S, g, T[1]); }
  { const g = S.grp(); mailI(S, X[2], 500, 1.7, g); fadeG(S, g, T[2]); }
  ["LIGHT", "ROCKETS", "THE POST"].forEach((s, i) => itxt(S, s, X[i], 710, { size: DS.type.small, t: T[i] }));
  X.forEach((x, i) => xMark(S, x, 500, 2.8, T[i] + 0.25)); }

// So what would happen if you fell into a black hole?
{ const S = sc(4, 0, { cam: "push", focus: "1000 560" });
  space(S, { clear: [1260, 560, 420], glow: [1260, 560, 900, "orange", 0.16] });
  BH(S, 1260, 580, 170);
  const F = dave(S, 520, 880, "near", { s: 1.0, pose: "think", mood: "worried", look: 6 });
  shift(F.all, S.start, S.len, [0, 0], [40, -24]);
  qmark(S, 800, 420, 2.2, K(4, "what"), "gold");
  card(S, "WHAT HAPPENS?", 700, 170, { t: K(4, "what") }); }

// Would you turn into spaghetti? Would time stop? And what is inside?
{ const S = sc(4, "Would#2", { cam: "push", focus: "960 560" });
  space(S, {});
  const X = [360, 960, 1560], T = [K(4, "spaghetti"), K(4, "time"), K(4, "inside")];
  X.forEach((x, i) => panel(S, x, 560, 480, 560, T[i]));
  { const g = S.grp(); spaghetti(S, X[0], 600, 1.7, { parent: g }); fadeG(S, g, T[0]); }
  { const g = S.grp(); clockD(S, X[1], 560, 150, { parent: g, h: 12, m: 0 }); S.draw(rrect(X[1] - 60, 790, 44, 80, DS.r.xs), S.start, 0, { fill: DS.c("ink"), c: DS.c("ink"), w: DS.w.hair, parent: g }); S.draw(rrect(X[1] + 16, 790, 44, 80, DS.r.xs), S.start, 0, { fill: DS.c("ink"), c: DS.c("ink"), w: DS.w.hair, parent: g }); fadeG(S, g, T[1]); }
  { const g = S.grp(); S.draw(rrect(X[2] - 130, 440, 260, 260, DS.r.md), S.start, 0, { c: DS.c("ink"), w: DS.w.near, parent: g }); dash(g.lastChild, 22, 16); qmark(S, X[2], 550, 1.4, undefined, "gold", g); fadeG(S, g, T[2]); }
  ["SPAGHETTI?", "TIME STOPS?", "INSIDE?"].forEach((s, i) => card(S, s, X[i], 170, { t: T[i] })); }

// Tonight we follow Dave all the way down. Far out, the sky bends. Near the edge, his friend watches him freeze. And inside, every direction points the same way.
{ const S = sc(5, 0, { cam: "push", focus: "960 540" });
  space(S, { clear: [1750, 560, 160], neb: [[1500, 400, 800, "purple", 0.3]] });
  BH(S, 1760, 560, 34, { halo: 3.4 });
  const X = [420, 960, 1480], T = [K(5, "Far"), K(5, "Near"), K(5, "inside")];
  S.draw("M150 560 H1700", S.start, 0, { c: DS.c("sky", 1), w: DS.w.mid });
  X.forEach((x, i) => { screen(S, x, 270, 420, 260, T[i]); const g = S.grp(); S.fill(circ(x, 560, 14), S.start, 0, DS.P.white[0], 1, g); fadeG(S, g, T[i]); });
  { const g = S.grp(), x = X[0], y = 270; BH(S, x, y, 24, { parent: g, disk: false, halo: 3 }); [60, 84, 108].forEach((r, i) => S.draw(arc(x, y, r, 200 + i * 30, 330 - i * 25), S.start, 0, { c: DS.P.white[0], w: DS.w.detail, parent: g, op: 0.9 })); [[-150, -70], [140, -80], [-120, 70], [150, 60], [20, 100]].forEach(([dx, dy]) => S.fill(circ(x + dx, y + dy, 3), S.start, 0, DS.c("gold", 1), 1, g)); fadeG(S, g, T[0]); }
  { const g = S.grp(), x = X[1], y = 270; lamp(S, x, y, 20, "red", undefined, g, 0.4); beam(S, x + 20, y, 150, 0, 40, "red", g, 0.3); S.fill(circ(x - 110, y, 8), S.start, 0, DS.c("yellow", 1), 0.3, g); fadeG(S, g, T[1]); }
  { const g = S.grp(), x = X[2], y = 270; [0, 60, 120, 180, 240, 300].forEach((a) => { const r = (a * Math.PI) / 180, [x1, y1] = [x + Math.cos(r) * 150, y + Math.sin(r) * 100], [x2, y2] = [x + Math.cos(r) * 38, y + Math.sin(r) * 25]; S.arrow(x1, y1, x2, y2, S.start, 0.3, { c: DS.c("gold", 1), w: DS.w.mid, parent: g, head: 14 }); }); S.fill(circ(x, y, 9), S.start, 0, DS.P.white[0], 1, g); fadeG(S, g, T[2]); }
  ["FAR OUT", "THE EDGE", "INSIDE"].forEach((s, i) => card(S, s, X[i], 700, { t: T[i], size: DS.type.small }));
  const F = dave(S, 180, 560, "near", { s: 0.42, pose: "stand", mood: "smile", look: 6 });
  F.walk(K(5, "Far") - 0.4, 0.8, { x: 240 }); F.walk(K(5, "Near") - 0.4, 0.8, { x: 540 }); F.walk(K(5, "inside") - 0.4, 0.8, { x: 520 }); }

// His friend is staying on the ship, to report live from a sensible distance.
{ const S = sc(6, 0, { cam: "push", focus: "960 540" });
  space(S, { clear: [1500, 520, 380], glow: [1500, 520, 800, "orange", 0.14] });
  BH(S, 1540, 520, 130);
  ship(S, 640, 620, 1.1);
  { const g = S.grp(), cl = clipG(S, circ(300, 270, 170), g); S.fill(circ(300, 270, 170), S.start, 0, DS.vgrad(DS.c("navy", 1), DS.c("navy", 2)), 1, cl);
    reporter(S, 300, 440, "near", { s: 0.95, parent: cl, mood: "smile" }); S.draw(circ(300, 270, 170), S.start, 0, { c: DS.P.white[0], w: DS.w.near, parent: g });
    fadeG(S, g, K(6, "report")); card(S, "LIVE", 300, 480, { t: K(6, "report"), tc: "red" }); }
  const d = dave(S, 1190, 560, "near", { s: 0.2, mood: "worried", helmet: false }); lamp(S, 1205, 548, 4, "yellow", undefined, undefined, 0.5);
  measure(S, 900, 1180, 780, "A SENSIBLE DISTANCE", K(6, "sensible"), { size: DS.type.caption }); }

// "Good evening. A local man is falling into a black hole. On purpose."
{ const S = sc(7, 0, { cam: "push", focus: "700 560" });
  const B = bridge(S, { win: [740, 100, 980, 500] });
  BH(S, 1330, 330, 60, { parent: B.vg, halo: 3.2 }); lamp(S, 1100, 270, 4, "yellow", undefined, B.vg, 0.5);
  dave(S, 1130, 330, "near", { s: 0.12, parent: B.vg, float: true, helmet: false });
  const R = reporter(S, 400, 960, "near", { s: 1.3, mood: "smile", look: 2 });
  talk(S, R, K(7, "Good"), KE(7, "purpose"));
  lowerThird(S, "A LOCAL MAN IS FALLING IN", "INTO A BLACK HOLE. ON PURPOSE.", K(7, "local"), { cx: 1130 }); }

// ===================== 2. The one in the photo =====================
// Dave isn't falling into just any black hole. He has picked the one in the photo.
{ const S = sc(8, 0, { cam: "push", focus: "960 540" });
  space(S, { clear: [1360, 540, 400], glow: [1360, 540, 800, "orange", 0.12] });
  [[480, 260], [700, 260], [920, 260]].forEach(([x, y]) => { BH(S, x, y, 34, { disk: false, halo: 2.4, t: K(8, "just") }); xMark(S, x, y, 1.1, K(8, "just") + 0.2); });
  photo(S, 1370, 560, 600, 640, { r: 0.27, rot: 2, t: K(8, "picked") });
  S.draw(rrect(1050, 230, 640, 660, DS.r.md), K(8, "picked") + 0.3, 0, { c: DS.c("gold", 0), w: DS.w.near });
  tick(S, 1640, 250, 1.6, K(8, "picked") + 0.5, "green");
  dave(S, 380, 920, "near", { s: 1.15, pose: "point", mood: "smile", look: 6 });
  card(S, "THE ONE IN THE PHOTO", 1370, 140, { t: K(8, "picked") }); }

// In twenty twenty-two, the Event Horizon Telescope, radio dishes across the Earth working as one,
{ const S = sc(9, 0, { cam: "pull", focus: "960 580" });
  space(S, {});
  earth(S, 960, 600, 220);
  const A = [-150, -105, -60, -15, 30, 75, 120, 165], P = A.map((a) => planeOf(960, 600, a, 216));
  A.forEach((a, i) => dish(S, P[i][0], P[i][1], 1.15, a, { t: K(9, "radio") + i * 0.14 }));
  const lk = S.grp(); P.forEach((p, i) => dash(S.draw(line(p, P[(i + 3) % 8], 0), S.start, 0, { c: DS.c("gold", 1), w: DS.w.detail, parent: lk, op: 0.9 }), 12, 12)); fadeG(S, lk, K(9, "working"), 0.6);
  card(S, "EVENT HORIZON TELESCOPE", 960, 130, { t: K(9, "Event") });
  card(S, "2022", 300, 600, { t: K(9, "twenty") }); }

// revealed the first picture of the black hole
{ const S = sc(10, 0, { cam: "push", focus: "960 560" });
  space(S, { clear: [960, 560, 420], glow: [960, 560, 900, "orange", 0.14] });
  photo(S, 960, 560, 700, 700, { r: 0.28, rot: -3 });
  card(S, "THE FIRST PICTURE", 960, 120, { t: K(10, "first") }); }

// at the centre of our galaxy, Sagittarius A star.
{ const S = sc(10, "centre", { cam: "push", focus: "820 560" });
  space(S, { neb: [[820, 560, 900, "purple", 0.3]] });
  galaxy(S, 780, 560, 540, { tilt: -16 });
  ringO(S, 780, 560, 44, 44, K(10, "Sagittarius"), "gold");
  photo(S, 1560, 330, 360, 420, { r: 0.26, rot: 3, t: K(10, "Sagittarius") });
  arr(S, 840, 540, 1370, 340, K(10, "Sagittarius") + 0.2, { c: "gold", bend: 0.18 });
  card(S, "SAGITTARIUS A*", 1480, 700, { t: K(10, "Sagittarius") });
  card(S, "OUR GALAXY", 400, 190, { t: K(10, "galaxy") }); }

// A dark shadow in a glowing ring.
{ const S = sc(11, 0, { cam: "push", focus: "960 560" });
  space(S, { clear: [960, 560, 420], glow: [960, 560, 900, "orange", 0.16] });
  ehtRing(S, 960, 560, 220);
  card(S, "SHADOW", 420, 330, { t: K(11, "shadow") }); arr(S, 590, 360, 880, 500, K(11, "shadow") + 0.2, { bend: 0.2 });
  card(S, "RING", 1500, 280, { t: K(11, "ring") }); arr(S, 1400, 320, 1180, 410, K(11, "ring") + 0.2, { bend: -0.2 }); }

// Four million times heavier than the Sun,
{ const S = sc(11, "Four", { cam: "push", focus: "960 560" });
  space(S, { clear: [1560, 560, 300], glow: [1560, 560, 700, "orange", 0.14] });
  sunD(S, 380, 560, 66); wtxt(S, "1 SUN", 380, 700, { size: DS.type.small });
  BH(S, 1580, 560, 120);
  badge(S, 960, 520, "4 MILLION", "TIMES HEAVIER THAN THE SUN", K(11, "Four")); }

// and twenty-seven thousand light-years away.
{ const S = sc(11, "twenty-seven", { cam: "push", focus: "960 560" });
  space(S, { neb: [[1450, 560, 800, "purple", 0.3]] });
  earth(S, 320, 560, 70);
  galaxy(S, 1450, 560, 300, { tilt: -16 });
  measure(S, 430, 1220, 740, "27,000 LIGHT-YEARS", K(11, "twenty-seven")); }

// From Earth, it looks about as big as a doughnut on the Moon.
{ const S = sc(12, 0, { cam: "push", focus: "960 560" });
  space(S, { clear: [1450, 560, 330], glow: [1450, 560, 800, "orange", 0.12] });
  moon(S, 600, 600, 320);
  doughnut(S, 660, 420, 1.5);
  wtxt(S, "≈", 1050, 590, { size: DS.type.display, halo: DS.c("ink", 2), haloW: 0.1 });
  ehtRing(S, 1450, 560, 120);
  card(S, "A DOUGHNUT ON THE MOON", 960, 130, { t: K(12, "doughnut") }); }

// So Dave is going for a closer look.
{ const S = sc(12, "So", { cam: "push", focus: "960 560" });
  space(S, { clear: [1560, 330, 200] });
  BH(S, 1560, 330, 56, { halo: 3 });
  telescope(S, 900, 640, 1.3, -22);
  dash(S.draw(line([1190, 520], [1480, 370], 0), S.start, 0, { c: DS.c("gold", 1), w: DS.w.mid }), 18, 14);
  dave(S, 460, 920, "near", { s: 1.15, mood: "determined", look: 6, pose: "reach" });
  card(S, "A CLOSER LOOK", 700, 170, { t: K(12, "closer") }); }

// In twenty twenty-four, NASA's Jeremy Schnittman used a supercomputer
{ const S = sc(13, 0, { cam: "push", focus: "960 560" });
  space(S, {});
  who(S, 520, 940, "near", Object.assign({}, LABCOAT, { s: 1.2, mood: "smile", look: 4 }));
  card(S, "J. SCHNITTMAN, NASA", 520, 400, { t: K(13, "Jeremy") });
  rack(S, 1250, 560, 1.15); wtxt(S, "SUPERCOMPUTER", 1250, 900, { size: DS.type.small, t: K(13, "supercomputer"), halo: DS.c("ink", 2), haloW: 0.12 });
  card(S, "2024", 1250, 180, { t: K(13, "twenty") }); }

// to fly a virtual camera into a black hole just like this one, from six hundred and forty million kilometres out.
{ const S = sc(13, "fly", { cam: "push", focus: "960 560" });
  space(S, { clear: [1500, 580, 420], glow: [1500, 580, 900, "orange", 0.16] });
  BH(S, 1520, 600, 150);
  camI(S, 360, 600, 1.8);
  dash(S.draw(line([520, 600], [1180, 600], 0), K(13, "camera"), 0, { c: DS.c("gold", 1), w: DS.w.mid }), 20, 16); arr(S, 1100, 600, 1220, 600, K(13, "camera"), { c: "gold" });
  card(S, "VIRTUAL CAMERA", 360, 800, { t: K(13, "camera") });
  hud(S, "DISTANCE", "640 MILLION KM", K(13, "six"), { wd: 880, size: DS.type.title }); }

// The first strange thing is the sky.
{ const S = sc(14, 0, { cam: "pull", focus: "960 560" });
  space(S, { n: 150, clear: [960, 560, 130] });
  BH(S, 960, 560, 70, { halo: 3.2 });
  card(S, "THE SKY", 960, 150, { t: K(14, "sky") }); }

// Gravity this strong bends light, so the stars behind the black hole get smeared into arcs.
{ const S = sc(14, "Gravity", { cam: "zoom", focus: "960 560" });
  space(S, { n: 70, clear: [960, 560, 560], neb: [[960, 560, 900, "purple", 0.28]] });
  const A = lensArcs(S, 960, 560, 150, 640, 90); spin(A, S.start, S.len, 0, 6, 960, 560);
  BH(S, 960, 560, 70, { halo: 3.2 });
  card(S, "LIGHT BENDS", 960, 120, { t: K(14, "bends") }); }

// Line a star up exactly behind it, and its light becomes a ring round the black hole, called an Einstein ring.
{ const S = sc(15, 0, { cam: "push", focus: "960 560" });
  space(S, { clear: [960, 560, 220] });
  eyeI(S, 300, 560, 1.2);
  const Z = S.grp(); S.draw("M1500 560 H1130 M790 560 H420", S.start, 0, { c: DS.c("gray", 1), w: DS.w.detail, parent: Z }); dash(Z.firstChild, 14, 14);
  lamp(S, 1600, 560, 22, "gold", K(15, "star", 0)); S.draw(rays(1600, 560, 36, 62, 8, 0.2), K(15, "star"), 0, { c: DS.c("gold", 1), w: DS.w.detail });
  arr(S, 1540, 545, 410, 535, K(15, "light"), { c: "gold", bend: 0.42 }); arr(S, 1540, 575, 410, 585, K(15, "light"), { c: "gold", bend: -0.42 });
  BH(S, 960, 560, 95, { disk: false, halo: 3 });
  { const g = S.grp(); S.draw(circ(960, 560, 95 * 1.7), S.start, 0, { c: DS.c("sky", 1), w: DS.w.near, parent: g }); S.draw(circ(960, 560, 95 * 1.7), S.start, 0, { c: DS.c("sky", 1), w: DS.w.near * 4, op: 0.3, parent: g }).setAttribute("filter", blur(6)); fadeG(S, g, K(15, "ring")); }
  card(S, "STAR BEHIND", 1600, 700, { t: K(15, "star") });
  card(S, "EINSTEIN RING", 960, 850, { t: K(15, "Einstein") }); }

// Even the shadow is partly a trick of the light. It looks about twice as big as the black hole really is.
{ const S = sc(16, 0, { cam: "push", focus: "960 560" });
  space(S, { clear: [960, 560, 420], glow: [960, 560, 900, "orange", 0.15] });
  ehtRing(S, 960, 560, 215);
  { const g = S.grp(); S.draw(circ(960, 560, 112), S.start, 0, { fill: DS.c("navy", 2), c: DS.c("red", 1), w: DS.w.near, parent: g }); dash(g.lastChild, 16, 12); fadeG(S, g, K(16, "really")); }
  card(S, "WHAT YOU SEE", 1560, 280, { t: K(16, "looks") }); arr(S, 1440, 320, 1150, 440, K(16, "looks") + 0.2, { bend: -0.2 });
  card(S, "REAL SIZE", 380, 620, { t: K(16, "really"), tc: "red" }); arr(S, 540, 620, 840, 580, K(16, "really") + 0.2, { c: "red", tone: 1, bend: 0.15 });
  card(S, "ABOUT 2× BIGGER", 960, 880, { t: K(16, "twice") }); }

// Closer in, light itself can go round in circles. That happens at one and a half times the radius of the edge, a place called the photon sphere.
{ const S = sc(17, 0, { cam: "push", focus: "960 560" });
  space(S, { clear: [960, 560, 340], glow: [960, 560, 700, "orange", 0.12] });
  BH(S, 960, 560, 130, { disk: false, halo: 2.8 });
  { const g = S.grp(); orbit(S, 960, 560, 130, "red", S.start, { parent: g, w: DS.w.near }); fadeG(S, g, K(17, "edge")); }
  { const g = S.grp(); S.draw(circ(960, 560, 195), S.start, 0, { c: DS.c("gold", 1), w: DS.w.near * 3, op: 0.25, parent: g }).setAttribute("filter", blur(5)); S.draw(circ(960, 560, 195), S.start, 0, { c: DS.c("gold", 1), w: DS.w.mid, parent: g });
    const o = S.grp(g); [20, 140, 260].forEach((a) => { S.draw(arc(960, 560, 195, a - 46, a), S.start, 0, { c: DS.c("yellow", 1), w: DS.w.detail, op: 0.7, parent: o }); const [x, y] = [960 + Math.cos((a * Math.PI) / 180) * 195, 560 + Math.sin((a * Math.PI) / 180) * 195]; lamp(S, x, y, 8, "yellow", undefined, o, 0.6); });
    spin(o, S.start, S.len, 0, 360 * (S.len / 9), 960, 560); fadeG(S, g, K(17, "light", 0)); }
  card(S, "THE EDGE", 460, 790, { t: K(17, "edge"), tc: "red" }); arr(S, 560, 760, 860, 640, K(17, "edge"), { c: "red", tone: 1, bend: 0.2 });
  card(S, "PHOTON SPHERE", 1480, 250, { t: K(17, "photon") }); arr(S, 1380, 290, 1110, 420, K(17, "photon"), { c: "gold", bend: -0.2 });
  card(S, "1.5 × THE RADIUS", 1480, 830, { t: K(17, "one") }); }

// Inside it, nothing can stay in orbit, not even light.
{ const S = sc(18, 0, { cam: "push", focus: "960 560" });
  space(S, { clear: [960, 560, 300], glow: [960, 560, 700, "orange", 0.12] });
  BH(S, 960, 560, 100, { disk: false, halo: 3 });
  orbit(S, 960, 560, 150, "gold", S.start, { w: DS.w.mid });
  const pts = spiralPts(960, 560, 150, 104, -40, 0.85); dash(S.draw(poly(pts, 0), S.start, 0, { c: DS.c("yellow", 1), w: DS.w.detail, op: 0.8 }), 8, 10);
  const L = lamp(S, pts[0][0], pts[0][1], 9, "yellow", undefined, undefined, 0.6); follow(L, pts, K(18, "nothing"), 3.2, "power1.in"); dim(L, K(18, "nothing") + 3.1, 0.5, 1, 0);
  card(S, "NO ORBITS INSIDE", 460, 280, { t: K(18, "Inside") }); arr(S, 600, 320, 880, 500, K(18, "Inside"), { bend: 0.2 }); }

// You keep your rockets firing, or you fall.
{ const S = sc(18, "You", { cam: "push", focus: "960 500" });
  space(S, { clear: [960, 1180, 700] });
  BH(S, 960, 1190, 380, { halo: 2.2, disk: { rx: 2.8, k: 0.16, tilt: -4 } });
  const F = dave(S, 960, 700, "near", { s: 1.0, mood: "determined", look: 0 }); flames(S, F);
  hud(S, "POSITION", "1.5 × EDGE RADIUS", S.start, { wd: 840, size: DS.type.body });
  card(S, "ROCKETS ON", 1500, 400, { t: K(18, "rockets") }); }

// Dave brought a postcard.
{ const S = sc(18, "Dave", { cam: "push", focus: "960 500" });
  space(S, { clear: [960, 1180, 700] });
  BH(S, 960, 1190, 380, { halo: 2.2, disk: { rx: 2.8, k: 0.16, tilt: -4 } });
  const F = dave(S, 960, 700, "near", { s: 1.0, mood: "smile", look: 0, pose: "hold" });
  shift(F.all, S.start, S.len, [0, 0], [0, 90]);
  const [hx, hy] = F.hand("R", "hold"); postcard(S, hx + 40, hy - 6, 0.42, { side: "back", rot: 8, parent: F.all, msg: ["greetings"], size: DS.type.caption, msgT: [S.start] });
  hud(S, "POSITION", "FALLING", S.start, { wd: 520 }); }

// In NASA's simulation, the fall to the edge takes about three hours, with nearly two laps on the way.
{ const S = sc(19, 0, { cam: "push", focus: "1100 560" });
  space(S, { clear: [1180, 560, 360], glow: [1180, 560, 800, "orange", 0.14] });
  BH(S, 1180, 560, 70);
  const pts = spiralPts(1180, 560, 520, 104, 200, 1.9, 160);
  dash(S.draw(poly(pts, 0), S.start, 0, { c: DS.c("gold", 1), w: DS.w.detail, op: 0.85 }), 12, 12);
  const D = S.grp(); S.fill(circ(pts[0][0], pts[0][1], 14), S.start, 0, DS.c("sky", 1), 1, D); S.draw(circ(pts[0][0], pts[0][1], 22), S.start, 0, { c: DS.P.white[0], w: DS.w.detail, parent: D });
  follow(D, pts, K(19, "fall") - 0.2, S.len - 1.0, "power1.in");
  clockD(S, 330, 330, 120, { h: 12, m: 0, sweep: [S.start + 0.4, S.len - 1.0, 3], ease: "power1.inOut" });
  card(S, "ABOUT 3 HOURS", 330, 570, { t: K(19, "three") });
  card(S, "NEARLY 2 LAPS", 330, 720, { t: K(19, "two") }); }

// ===================== 3. The tug-of-war =====================
// All the way down, Dave is worried about one thing. Everyone knows what black holes do to people. They turn them into spaghetti.
{ const S = sc(20, 0, { cam: "push", focus: "800 600" });
  space(S, { clear: [1480, 900, 400], glow: [1480, 900, 800, "orange", 0.14] });
  BH(S, 1500, 960, 260, { halo: 2.4 });
  const F = dave(S, 640, 880, "near", { s: 1.3, mood: "worried", look: 6, pose: "sad" }); sweat(S, F, K(20, "worried"));
  hud(S, "STATUS", "FALLING", S.start, { wd: 520 });
  const tg = S.grp(); S.thought(1090, 300, 330, 160, 820, 520, S.start, 0.3, { parent: tg }); spaghetti(S, 1090, 320, 1.4, { parent: tg }); fadeG(S, tg, K(20, "They"), 0.4); }

// Gravity gets stronger the closer you get.
{ const S = sc(21, 0, { cam: "push", focus: "960 540" });
  space(S, { clear: [960, 1230, 700], glow: [960, 1230, 800, "orange", 0.16] });
  BH(S, 960, 1240, 360, { halo: 2.2, disk: false });
  [[190, 54, "sky", 3], [310, 80, "sky", 5], [440, 112, "gold", 7], [580, 150, "orange", 9], [740, 200, "red", 12]].forEach(([y, len, n, w], i) => S.arrow(900, y - len / 2, 900, y + len / 2, K(21, "stronger") + i * 0.3, 0.3, { c: DS.c(n, 1), w: w, head: 18 + i * 4 }));
  card(S, "STRONGER, CLOSER IN", 1320, 330, { t: K(21, "stronger") }); }

// Dave is falling feet first, so his feet get pulled a little harder than his head.
{ const S = sc(21, "Dave", { cam: "push", focus: "960 540" });
  space(S, { clear: [960, 1230, 700], glow: [960, 1230, 800, "orange", 0.16] });
  BH(S, 960, 1240, 360, { halo: 2.2, disk: false });
  const F = dave(S, 760, 800, "near", { s: 1.15, mood: "worried", look: 0 });
  S.arrow(1040, F.hd[1] - 20, 1040, F.hd[1] + 70, K(21, "head"), 0.3, { c: DS.c("sky", 1), w: DS.w.mid, head: 18 });
  S.arrow(1040, F.gy - 150, 1040, F.gy + 80, K(21, "feet"), 0.3, { c: DS.c("red", 1), w: DS.w.near * 1.8, head: 36 });
  card(S, "A LITTLE PULL", 1420, F.hd[1], { t: CL(S, K(21, "head"), 2.4) }); card(S, "A BIGGER PULL", 1420, F.gy - 40, { t: CL(S, K(21, "feet"), 1.7), tc: "red" }); }

// His feet and his head are in a tug-of-war, and the feet have a black hole on their side.
{ const S = sc(22, 0, { cam: "push", focus: "960 540" });
  space(S, { clear: [960, 1200, 560], glow: [960, 1200, 800, "orange", 0.16] });
  BH(S, 960, 1210, 330, { halo: 2.2, disk: false });
  const F = dave(S, 960, 780, "near", { s: 1.0, mood: "worried", look: 0, pose: "armsUp" });
  const rope = DS.c("earth", 1);
  S.draw("M960 215 V430", S.start, 0, { c: rope, w: DS.w.near * 1.8 }); S.draw(`M960 ${F.gy - 20} V885`, S.start, 0, { c: rope, w: DS.w.near * 1.8 });
  stretch(S, F, K(22, "tug-of-war"), 1.0, 0.94, 1.1);
  [-1, 1].forEach((sd) => { const m = miniPull(S, 960 + sd * 70, 330, S.start); });
  card(S, "THE HEAD", 1380, 300, { t: K(22, "head") }); card(S, "THE FEET + A BLACK HOLE", 1470, 760, { t: K(22, "feet"), tc: "red" }); }

// The Moon does the same to Earth. It pulls hardest on the side facing it, and the oceans bulge. That's the tides.
{ const S = sc(23, 0, { cam: "push", focus: "960 540" });
  space(S, {});
  S.fill(circ(660, 560, 276, 236), S.start, 0, DS.c("sky", 0), 0.45); // the bulging oceans, reaching toward the Moon
  earth(S, 640, 560, 230);
  moon(S, 1560, 560, 120);
  [[470, 150, 6], [560, 190, 8], [650, 150, 6]].forEach(([y, len, w], i) => S.arrow(880, y, 880 + len, y, K(23, "pulls") + i * 0.2, 0.3, { c: DS.c("gold", 1), w: w, head: 20 }));
  S.arrow(380, 560, 330, 560, K(23, "pulls"), 0.3, { c: DS.c("gold", 1), w: DS.w.detail, head: 12 });
  card(S, "THE TIDES", 960, 150, { t: K(23, "tides") }); card(S, "BIGGEST PULL", 1120, 840, { t: K(23, "pulls") }); }

// And the stretch grows fast. Halve your distance from the centre, and the stretch gets eight times stronger.
{ const S = sc(24, 0, { cam: "push", focus: "960 540" });
  space(S, { clear: [1600, 580, 330], glow: [1600, 580, 700, "orange", 0.14] });
  BH(S, 1620, 580, 110);
  const A = dave(S, 440, 710, "near", { s: 0.8, mood: "smile", look: 0 }); faceRight(A);
  const B = dave(S, 1000, 710, "near", { s: 0.8, mood: "worried", look: 0 }); stretch(S, B, K(24, "eight") - 0.3, 0.7, 0.85, 1.4); faceRight(B);
  measure(S, 440, 1620, 300, "DISTANCE", K(24, "Halve")); measure(S, 1000, 1620, 440, "HALF THE DISTANCE", K(24, "Halve") + 0.3);
  badge(S, 440, 880, "× 1", "THE STRETCH", S.start); badge(S, 1000, 880, "× 8", "EIGHT TIMES", K(24, "eight"), { num: "red" }); }

// It squeezes you from the sides as well. Long and thin.
{ const S = sc(25, 0, { cam: "push", focus: "960 540" });
  space(S, { clear: [960, 1330, 500], glow: [960, 1330, 800, "orange", 0.15] });
  BH(S, 960, 1340, 360, { halo: 2.2, disk: false });
  const F = dave(S, 960, 650, "near", { s: 1.0, mood: "worried", look: 0 }); stretch(S, F, K(25, "Long"), 1.0, 0.72, 1.55);
  [430, 560].forEach((y, i) => { S.arrow(640, y, 830, y, K(25, "squeezes") + i * 0.25, 0.3, { c: DS.c("gold", 1), w: DS.w.near, head: 22 }); S.arrow(1280, y, 1090, y, K(25, "squeezes") + i * 0.25, 0.3, { c: DS.c("gold", 1), w: DS.w.near, head: 22 }); });
  card(S, "SQUEEZED FROM THE SIDES", 960, 150, { t: K(25, "squeezes") }); }

// Astrophysicists really do call this spaghettification.
{ const S = sc(25, "Astrophysicists", { cam: "push", focus: "960 540" });
  space(S, { clear: [960, 1330, 500], glow: [960, 1330, 800, "orange", 0.15] });
  BH(S, 960, 1340, 360, { halo: 2.2, disk: false });
  const F = dave(S, 960, 650, "near", { s: 1.0, mood: "smile", look: 0 }); stretch(S, F, S.start - 0.65, 0.01, 0.72, 1.55);
  tl.fromTo(F.all, { attr: { transform: "rotate(-3 960 400)" } }, { attr: { transform: "rotate(3 960 400)" }, duration: S.len * 0.5, ease: "sine.inOut", yoyo: true, repeat: 1, immediateRender: false }, S.start);
  card(S, "SPAGHETTIFICATION", 960, 150, { t: K(25, "spaghettification"), size: DS.type.body }); }

// And it isn't just a cartoon. In twenty twenty, the European Southern Observatory watched a black hole do it to a star,
{ const S = sc(26, 0, { cam: "push", focus: "960 540" });
  space(S, { clear: [1500, 560, 300], glow: [1500, 560, 700, "orange", 0.14] });
  domeI(S, 380, 760, 1.2);
  BH(S, 1560, 560, 90);
  { const g = S.grp(); glow(S, 1200, 520, 120, "gold", 0.5, g); S.fill(circ(1200, 520, 52, 44), S.start, 0, DS.c("yellow", 1), 1, g); ribbon(S, [[1250, 530], [1330, 545], [1420, 560]], "yellow", g); fadeG(S, g, K(26, "watched"), 0.5); }
  dash(S.draw(line([480, 650], [1130, 520], 0), K(26, "watched"), 0, { c: DS.c("sky", 1), w: DS.w.detail }), 12, 12);
  card(S, "EUROPEAN SOUTHERN OBSERVATORY", 960, 130, { t: K(26, "European"), size: DS.type.caption }); card(S, "2020", 380, 940 - 60, { t: K(26, "twenty") }); }

// two hundred and fifteen million light-years away.
{ const S = sc(27, 0, { cam: "push", focus: "960 540" });
  space(S, { clear: [1560, 560, 300], glow: [1560, 560, 700, "orange", 0.12] });
  earth(S, 300, 560, 70);
  BH(S, 1560, 560, 80); lamp(S, 1380, 520, 14, "yellow", undefined, undefined, 0.5);
  measure(S, 400, 1300, 740, "215 MILLION LIGHT-YEARS", K(27, "two")); }

// It shredded the star into thin streams.
{ const S = sc(27, "It", { cam: "push", focus: "1000 560" });
  space(S, { clear: [1180, 560, 440], glow: [1180, 560, 800, "orange", 0.15] });
  BH(S, 1180, 560, 110);
  [[190, 0.95, 560, "yellow"], [230, 0.9, 520, "orange"], [260, 0.85, 480, "gold"], [300, 1.0, 540, "yellow"], [165, 0.8, 500, "orange"]].forEach(([a, tr, r0, n], i) => { const pts = spiralPts(1180, 560, r0, 150 + i * 6, a, tr, 60); const g = ribbon(S, pts, n); fadeG(S, g, K(27, "shredded") + i * 0.12, 0.5); });
  glow(S, 700, 340, 90, "gold", 0.45); S.fill(circ(700, 340, 26, 20), S.start, 0, DS.c("yellow", 1), 1);
  card(S, "THIN STREAMS", 700, 150, { t: K(27, "thin") }); }

// Even small black holes do it. One of about ten suns would stretch you into spaghetti long before you reached its edge.
{ const S = sc(28, 0, { cam: "push", focus: "1100 560" });
  space(S, { clear: [1560, 560, 220], glow: [1560, 560, 600, "orange", 0.14] });
  BH(S, 1560, 560, 34, { halo: 3, disk: false });
  { const g = S.grp(); orbit(S, 1560, 560, 50, "red", S.start, { parent: g }); fadeG(S, g, K(28, "edge")); }
  const F = dave(S, 640, 690, "near", { s: 0.9, mood: "smile", look: 0 }); stretch(S, F, K(28, "long") - 0.4, 1.2, 0.5, 1.9); faceRight(F);
  badge(S, 1560, 330, "ABOUT 10", "SUNS", K(28, "ten"));
  measure(S, 900, 1500, 860, "LONG BEFORE THE EDGE", K(28, "long")); card(S, "THE EDGE", 1560, 750, { t: K(28, "edge"), tc: "red" }); }

// Dave's black hole is four hundred thousand times heavier than that.
{ const S = sc(29, 0, { cam: "push", focus: "1000 560" });
  space(S, { clear: [1500, 560, 640], glow: [1500, 560, 1000, "orange", 0.16] });
  BH(S, 1520, 560, 330);
  BH(S, 380, 560, 20, { halo: 3, disk: false }); wtxt(S, "THAT ONE", 380, 680, { size: DS.type.small });
  badge(S, 880, 300, "400,000 ×", "HEAVIER", K(29, "four")); card(S, "DAVE'S", 1180, 880, { t: K(29, "Dave's") }); }

// Dave does the maths, and goes very quiet.
{ const S = sc(29, "Dave", { cam: "push", focus: "1000 560" });
  space(S, { clear: [1620, 560, 640], glow: [1620, 560, 1000, "orange", 0.16] });
  BH(S, 1650, 560, 330);
  const F = dave(S, 620, 920, "near", { s: 1.3, mood: "worried", look: 6, pose: "hold" }); sweat(S, F, K(29, "maths"));
  const [hx, hy] = F.hand("R", "hold"); const g = S.grp(F.all); S.draw(rrect(hx - 40, hy - 90, 90, 120, DS.r.xs), S.start, 0, { fill: DS.P.white[0], c: DS.c("ink"), w: DS.w.detail, parent: g }); [0, 1, 2].forEach((i) => S.draw(`M${hx - 24} ${hy - 62 + i * 24} H${hx + 30}`, S.start, 0, { c: DS.c("blue", 2), w: DS.w.detail, parent: g }));
  say(S, 1000, 330, 220, 110, 720, 520, ["..."], K(29, "quiet"), { think: true, size: DS.type.title }); }

// "Excuse me. Is it too late to pick a smaller black hole?"
{ const S = sc(30, 0, { cam: "push", focus: "960 560" });
  space(S, { glow: [1400, 560, 900, "purple", 0.12] });
  panel(S, 1330, 560, 620, 560, S.start);
  [[1130, 34, "SMALL"], [1330, 56, "BIG"], [1530, 88, "HUGE"]].forEach(([x, r, s], i) => { S.fill(circ(x, 560, r), S.start, 0, DS.c("ink", 2), 1); itxt(S, s, x, 760, { size: DS.type.caption }); });
  S.draw(rrect(1086, 500, 88, 120, DS.r.sm), K(30, "smaller"), 0, { c: DS.c("green", 1), w: DS.w.near }); tick(S, 1130, 440, 1.2, K(30, "smaller"), "green");
  xMark(S, 1530, 560, 1.4, K(30, "late"));
  const F = dave(S, 520, 920, "near", { s: 1.3, mood: "worried", look: 6, pose: "wave" }); talk(S, F, K(30, "Excuse"), KE(30, "hole"));
  card(S, "A SMALLER ONE, PLEASE?", 960, 150, { t: K(30, "late") }); }

// "We'll be right back, assuming Dave is still in one piece."
{ const S = sc(31, 0, { cam: "push", focus: "700 560" });
  const B = bridge(S, { win: [740, 100, 980, 500] });
  BH(S, 1400, 340, 100, { parent: B.vg, halo: 3 }); lamp(S, 1130, 300, 4, "yellow", undefined, B.vg, 0.5);
  { const g = S.grp(B.vg); ringO(S, 1130, 300, 22, 22, S.start, "gold", { parent: g, w: DS.w.detail }); dave(S, 1130, 322, "near", { s: 0.12, parent: B.vg, float: true, helmet: false }); }
  const R = reporter(S, 400, 960, "near", { s: 1.3, mood: "smile", look: 2 });
  talk(S, R, K(31, "We'll"), KE(31, "piece"));
  lowerThird(S, "WE'LL BE RIGHT BACK", "ASSUMING DAVE IS IN ONE PIECE", K(31, "assuming"), { cx: 1130 }); }

// ===================== 4. The edge =====================
// Dave checks his feet every few minutes. Still attached, still the usual distance from his head. So far.
{ const S = sc(32, 0, { cam: "push", focus: "700 560" });
  space(S, { clear: [1680, 1230, 420], glow: [1680, 1230, 800, "orange", 0.14] });
  BH(S, 1680, 1230, 340, { halo: 2.2, disk: false });
  dave(S, 540, 930, "near", { s: 1.45, mood: "worried", look: 0, pose: "sad" });
  panel(S, 1250, 460, 780, 540, S.start);
  itxt(S, "FEET CHECK", 1250, 290, { size: DS.type.small });
  [["FEET: STILL ATTACHED", 390, "attached"], ["DISTANCE TO HEAD: USUAL", 480, "usual"]].forEach(([s, y, k]) => { itxt(S, s, 930, y, { anchor: "start", t: S.start }); tick(S, 1560, y - 14, 1.1, K(32, k), "green"); });
  stamp(S, 1250, 620, "SO FAR", K(32, "So"), "orange"); }

// Ahead is the edge, the event horizon. For Dave's black hole, it's about twenty-five million kilometres across,
{ const S = sc(33, 0, { cam: "push", focus: "960 560" });
  space(S, { clear: [960, 560, 520], glow: [960, 560, 1000, "orange", 0.16] });
  BH(S, 960, 540, 250);
  { const g = S.grp(); orbit(S, 960, 540, 253, "red", S.start, { parent: g, w: DS.w.near }); fadeG(S, g, K(33, "edge")); }
  card(S, "THE EVENT HORIZON", 960, 130, { t: K(33, "event") });
  measure(S, 708, 1212, 880, "25 MILLION KM ACROSS", K(33, "twenty-five"));
  dave(S, 300, 900, "near", { s: 0.8, pose: "point", mood: "smile", look: 6 }); }

// a sixth of the way from Earth to the Sun.
{ const S = sc(33, "sixth", { cam: "push", focus: "960 560" });
  space(S, {});
  earth(S, 300, 540, 60); sunD(S, 1580, 540, 120);
  dash(S.draw("M370 540 H1440", S.start, 0, { c: DS.c("gray", 1), w: DS.w.detail }), 14, 12);
  S.draw("M370 540 H552", K(33, "sixth"), 0, { c: DS.c("gold", 0), w: DS.w.near * 2 });
  S.draw("M552 510 V570 M370 510 V570", K(33, "sixth"), 0, { c: DS.c("gold", 0), w: DS.w.mid });
  card(S, "THE EDGE'S WIDTH", 461, 410, { t: K(33, "sixth") }); card(S, "EARTH TO THE SUN", 960, 720, { t: K(33, "Earth") }); }

// Inside it, you'd need to go faster than light to get back out, and nothing goes faster than light.
{ const S = sc(34, 0, { cam: "push", focus: "960 560" });
  space(S, { clear: [1320, 560, 440], glow: [1320, 560, 900, "orange", 0.15] });
  BH(S, 1340, 560, 200, { disk: false, halo: 2.6 });
  orbit(S, 1340, 560, 202, "red", S.start, { w: DS.w.near });
  oneWay(S, 580, 520, 1.4);
  arr(S, 1360, 560, 1530, 560, K(34, "faster"), { c: "gold" }); xMark(S, 1545, 560, 1.4, K(34, "faster") + 0.3);
  card(S, "NOTHING GOES FASTER THAN LIGHT", 960, 870, { t: K(34, "nothing"), size: DS.type.caption }); }

// From here, the story splits in two: what Dave's friend sees from the ship, and what Dave feels.
{ const S = sc(35, 0, { cam: "push", focus: "960 540" });
  space(S, { clear: [1440, 1200, 400] });
  S.draw("M960 90 V960", S.start, 0, { c: DS.P.white[0], w: DS.w.mid });
  ship(S, 470, 560, 0.85); eyeI(S, 470, 820, 1.1, undefined); BH(S, 800, 300, 36, { disk: false, halo: 3 });
  BH(S, 1440, 1220, 290, { halo: 2.2, disk: false });
  dave(S, 1440, 860, "near", { s: 1.15, mood: "smile", look: 0 });
  S.heart(1720, 420, 2.2, K(35, "feels"), 0, {});
  card(S, "WHAT HIS FRIEND SEES", 480, 150, { t: K(35, "friend"), size: DS.type.caption }); card(S, "WHAT DAVE FEELS", 1440, 150, { t: K(35, "Dave", 0) , size: DS.type.caption }); }

// Gravity slows time. Even on Earth, clocks on GPS satellites tick faster than ours, by about thirty-eight millionths of a second a day.
{ const S = sc(36, 0, { cam: "push", focus: "960 540" });
  space(S, {});
  BH(S, 480, 760, 120, { halo: 2.8 });
  clockD(S, 480, 360, 120, { h: 3, m: 0, sweep: [S.start + 0.4, K(36, "Even") - S.start, 0.12], ease: "power1.inOut" });
  card(S, "GRAVITY SLOWS TIME", 480, 150, { t: K(36, "Gravity"), size: DS.type.caption });
  const R = S.grp(); S.draw("M960 90 V960", S.start, 0, { c: DS.P.white[0], w: DS.w.mid, parent: R });
  earth(S, 1440, 1040, 250, { parent: R }); satellite(S, 1440, 470, 1.3, R);
  clockD(S, 1700, 520, 78, { parent: R, h: 3, m: 0, sweep: [K(36, "Even"), S.end - K(36, "Even"), 2], ease: "none" });
  clockD(S, 1180, 720, 78, { parent: R, h: 3, m: 0, sweep: [K(36, "Even"), S.end - K(36, "Even"), 0.6], ease: "none" });
  badge(S, 1440, 170, "38 MILLIONTHS", "OF A SECOND A DAY", K(36, "thirty-eight"), { parent: R });
  fadeG(S, R, K(36, "Even")); }

// Mostly, that's because gravity is weaker up there.
{ const S = sc(37, 0, { cam: "push", focus: "960 540" });
  space(S, {});
  earth(S, 960, 1260, 520); satellite(S, 1000, 250, 1.2);
  [[560, 150, 14, "red"], [380, 90, 8, "orange"], [240, 50, 4, "sky"]].forEach(([y, len, w, n], i) => S.arrow(560, y - len / 2, 560, y + len / 2, K(37, "weaker") - 1.2 + i * 0.5, 0.3, { c: DS.c(n, 1), w: w, head: 14 + w * 2 }));
  card(S, "STRONGER DOWN HERE", 1360, 680, { t: K(37, "gravity") }); card(S, "WEAKER UP THERE", 1360, 380, { t: K(37, "weaker") }); }

// If nobody corrected for it, satnav would drift by about ten kilometres a day.
{ const S = sc(37, "If", { cam: "push", focus: "700 540" });
  space(S, {});
  const P = phoneMap(S, 620, 540, 1.6);
  const pg = S.grp(P.cl); pinI(S, P.car[0], P.car[1] - 14, 1.2, pg); shift(pg, K(37, "drift") - 0.2, 2.6, [0, 0], [150, -230]);
  badge(S, 1320, 520, "10 KM", "OFF, EVERY DAY", K(37, "ten"), { num: "red" });
  card(S, "NOBODY CORRECTED IT", 1320, 280, { t: K(37, "nobody") }); }

// Near a black hole, it's far stronger. Dave flashes his torch once a second.
{ const S = sc(38, 0, { cam: "push", focus: "960 540" });
  space(S, { clear: [1580, 640, 420], glow: [1580, 640, 900, "orange", 0.15] });
  BH(S, 1600, 660, 160);
  const F = dave(S, 760, 800, "near", { s: 1.1, mood: "smile", look: 6, pose: "reach" });
  const [hx, hy] = F.hand("R", "reach"), t0 = K(38, "flashes") - 0.3, n = Math.max(2, Math.floor(S.end - t0 - 0.2));
  DS.shape(S, rrect(hx - 8, hy - 16, 58, 32, DS.r.xs), "gray", { w: "detail", c: DS.P.white[0], parent: F.all });
  const bm = beam(S, hx + 50, hy, 380, -22, 70, "yellow", undefined, 0.6); pulse(bm, t0, n, 1.0, 0.08);
  const lp = lamp(S, hx + 54, hy, 12, "yellow", undefined, undefined, 0.7); pulse(lp, t0, n, 1.0, 0.2);
  for (let i = 0; i < n; i++) lamp(S, 420 + i * 120, 910, 12, "yellow", t0 + i * 1.0 + 0.1, undefined, 0.5);
  card(S, "FAR STRONGER", 1600, 330, { t: K(38, "far") }); wtxt(S, "ONCE A SECOND", 760, 380, { size: DS.type.small, t: CL(S, K(38, "once"), 1.7), halo: DS.c("ink", 2), haloW: 0.12 }); }

// On the ship, the flashes arrive further and further apart,
{ const S = sc(38, "On", { cam: "push", focus: "960 540" });
  space(S, {});
  card(S, "DAVE'S TORCH", 345, 330, { size: DS.type.caption, t: S.start }); card(S, "WHAT THE SHIP SEES", 345, 640, { size: DS.type.caption, t: K(38, "On") });
  const t0 = K(38, "ship") - 0.2;
  S.draw("M640 330 H1780", S.start, 0, { c: DS.c("gray", 2), w: DS.w.hair }); S.draw("M640 640 H1780", S.start, 0, { c: DS.c("gray", 2), w: DS.w.hair });
  for (let i = 0; i < 7; i++) lamp(S, 700 + i * 170, 330, 14, "yellow", i === 0 ? undefined : S.start + 0.3 + i * 0.28, undefined, 0.5);
  [700, 800, 940, 1130, 1380, 1690].forEach((x, i) => lamp(S, x, 640, 14, "yellow", t0 + [0, 0.35, 0.75, 1.25, 1.85, 2.55][i], undefined, 0.5));
  arr(S, 1500, 780, 1780, 780, t0 + 1.2, { c: "gold" }); wtxt(S, "FURTHER APART", 1500, 870, { size: DS.type.small, t: t0 + 1.2, halo: DS.c("ink", 2), haloW: 0.12 }); }

// and his light turns redder and dimmer.
{ const S = sc(39, 0, { cam: "push", focus: "960 540" });
  space(S, {});
  const cl = clipG(S, circ(960, 520, 360), S.grp());
  S.fill(circ(960, 520, 360), S.start, 0, DS.vgrad(DS.c("navy", 2), DS.c("ink", 2)), 1, cl);
  starsIn(S, 40, 600, 160, 1320, 880, cl);
  BH(S, 960, 1000, 330, { parent: cl, disk: false, halo: 2 });
  const F = dave(S, 940, 760, "near", { s: 0.6, parent: cl, mood: "flat", look: 0, pose: "reach" }), [hx, hy] = F.hand("R", "reach");
  const Ly = lamp(S, hx + 18, hy, 12, "yellow", undefined, cl, 0.7), Lr = lamp(S, hx + 18, hy, 12, "red", K(39, "redder") - 0.3, cl, 0.7);
  dim(Ly, K(39, "redder") - 0.3, 0.8, 1, 0); dim(Lr, K(39, "dimmer") - 0.2, 1.4, 1, 0.15);
  S.draw(circ(960, 520, 360), S.start, 0, { c: DS.P.white[0], w: DS.w.near });
  card(S, "REDDER", 330, 520, { t: K(39, "redder"), tc: "red" }); card(S, "DIMMER", 1590, 520, { t: K(39, "dimmer") }); }

// "Breaking news. Dave has stopped moving, and he's gone a little red."
{ const S = sc(40, 0, { cam: "push", focus: "700 560" });
  const B = bridge(S, { win: [740, 100, 980, 500] });
  BH(S, 1400, 340, 100, { parent: B.vg, halo: 3 });
  dave(S, 1130, 322, "near", { s: 0.14, parent: B.vg, float: true, helmet: false, outfitC: DS.c("red") }); lamp(S, 1138, 292, 4, "red", undefined, B.vg, 0.5);
  const R = reporter(S, 400, 960, "near", { s: 1.3, mood: "worried", look: 2 });
  talk(S, R, K(40, "Breaking"), KE(40, "red"));
  lowerThird(S, "DAVE HAS STOPPED MOVING", "AND HE'S GONE A LITTLE RED", K(40, "Dave"), { cx: 1130 }); }

// His friend never sees him cross. In theory, Dave hangs at the edge forever, fading until there's nothing left to see.
{ const S = sc(41, 0, { cam: "push", focus: "960 540" });
  space(S, { clear: [960, 1290, 760] });
  BH(S, 960, 1300, 720, { halo: 1.8, disk: false });
  orbit(S, 960, 1300, 724, "red", S.start, { w: DS.w.near });
  const F = dave(S, 960, 585, "near", { s: 1.0, outfitC: DS.c("red"), mood: "flat", look: 0 }); dim(F.all, K(41, "fading"), S.end - K(41, "fading") - 0.9, 1, 0.1);
  eyeI(S, 280, 700, 1.1); dash(S.draw(line([390, 690], [860, 500], 0), S.start, 0, { c: DS.c("sky", 1), w: DS.w.detail }), 12, 12);
  card(S, "NEVER SEEN CROSSING", 960, 130, { t: K(41, "never") }); }

// Dave was counting on this. He has a plan.
{ const S = sc(42, 0, { cam: "push", focus: "960 560" });
  space(S, { clear: [1520, 640, 420], glow: [1520, 640, 900, "orange", 0.14] });
  BH(S, 1540, 660, 190);
  const F = dave(S, 560, 930, "near", { s: 1.45, pose: "hips", mood: "happy", look: 6 });
  S.bulb(F.hd[0] + 10, F.hd[1] - F.r - 120, 0.9, K(42, "plan"), 0, {});
  card(S, "THE PLAN", 1000, 330, { t: K(42, "plan") }); }

// "If time stops out here, I can watch the whole future of the universe go by."
{ const S = sc(43, 0, { cam: "push", focus: "960 540" });
  space(S, { glow: [1340, 480, 900, "purple", 0.2] });
  deckChair(S, 500, 790);
  const F = dave(S, 500, 780, "near", { s: 1.0, sit: true, pose: "hold", mood: "happy", look: 6 });
  const [hx, hy] = F.hand("R", "hold"); popcorn(S, hx + 30, hy + 40, 0.9, F.all);
  S.draw(rrect(930, 220, 820, 520, DS.r.md), S.start, 0, { fill: DS.c("navy", 2), c: DS.P.white[0], w: DS.w.near });
  const cl = clipG(S, rrect(942, 232, 796, 496, DS.r.sm), S.grp()); starsIn(S, 60, 942, 232, 1738, 728, cl);
  clockD(S, 1340, 480, 170, { parent: cl, h: 12, m: 0, sweep: [S.start + 0.4, S.len - 0.8, 5], ease: "none" });
  talk(S, F, K(43, "If"), KE(43, "by"));
  card(S, "THE WHOLE FUTURE", 1340, 140, { t: K(43, "future") }); }

// And time near a black hole really does stretch.
{ const S = sc(44, 0, { cam: "push", focus: "960 540" });
  space(S, { clear: [1420, 560, 440], glow: [1420, 560, 900, "orange", 0.15] });
  BH(S, 1480, 560, 160);
  const g = S.grp(); clockD(S, 640, 560, 170, { parent: g, h: 2, m: 30, sweep: [S.start + 0.3, S.len - 0.6, 0.4], ease: "power1.inOut" }); g.setAttribute("transform", "translate(640 560) scale(1.8 1) translate(-640 -560)");
  card(S, "TIME STRETCHES", 960, 150, { t: K(44, "stretch") }); }

// NASA worked out that an astronaut who swooped close to this one and flew back out, a six-hour trip,
{ const S = sc(44, "NASA", { cam: "push", focus: "960 540" });
  space(S, { clear: [1260, 600, 340], glow: [1260, 600, 800, "orange", 0.14] });
  BH(S, 1280, 600, 140);
  const P = [[240, 260], [620, 330], [900, 470], [990, 600], [900, 740], [620, 870], [240, 940]], D = catmull(P);
  dash(S.draw(poly(D, 0), S.start, 0, { c: DS.c("gold", 1), w: DS.w.mid }), 18, 14);
  const sg = S.grp(); ship(S, P[0][0], P[0][1], 0.2, { parent: sg }); follow(sg, D, K(44, "swooped") - 0.2, S.len - 1.2, "power1.inOut");
  clockD(S, 1700, 230, 90, { h: 12, m: 0, sweep: [S.start + 0.3, S.len - 0.8, 6], ease: "power1.inOut" });
  card(S, "6-HOUR TRIP", 1700, 400, { t: K(44, "six-hour") }); }

// would come home thirty-six minutes younger than the friends she left behind.
{ const S = sc(45, 0, { cam: "push", focus: "960 540" });
  space(S, {});
  person(S, 360, 900, "near", 1, { s: 0.95, mood: "smile" }); person(S, 560, 900, "near", 2, { s: 0.95, mood: "smile" });
  clockD(S, 460, 380, 110, { h: 6, m: 0 });
  const A = who(S, 1500, 900, "near", { s: 1.05, hair: "bun", hairC: DS.c("earth", 2), outfitC: DS.c("orange"), mood: "happy", float: true }); helmet(S, A);
  clockD(S, 1500, 380, 110, { h: 5, m: 24, t: K(45, "thirty-six") });
  card(S, "HER FRIENDS", 460, 170, { t: S.start }); card(S, "THE ASTRONAUT", 1500, 170, { t: K(45, "come") });
  badge(S, 980, 560, "36 MINUTES", "YOUNGER", K(45, "thirty-six"), { num: "red" }); }

// But Dave isn't coming back out.
{ const S = sc(45, "But", { cam: "push", focus: "960 540" });
  space(S, { clear: [1500, 560, 440], glow: [1500, 560, 900, "orange", 0.15] });
  BH(S, 1540, 580, 180);
  const F = dave(S, 560, 900, "near", { s: 1.15, mood: "smile", look: 6, pose: "hold" });
  const [hx, hy] = F.hand("R", "hold"); postcard(S, hx + 30, hy, 0.38, { side: "back", rot: 8, parent: F.all });
  arr(S, 1240, 360, 880, 380, K(45, "isn't"), { c: "gold", bend: 0.5 }); xMark(S, 1060, 300, 1.6, K(45, "isn't") + 0.3);
  card(S, "NO WAY BACK OUT", 1000, 150, { t: K(45, "isn't") }); }

// Which leaves one last worry. In twenty twelve, four physicists argued that quantum physics might put a wall of fire at the edge.
{ const S = sc(46, 0, { cam: "push", focus: "1100 540" });
  space(S, { clear: [1740, 600, 440], glow: [1740, 600, 900, "orange", 0.14] });
  BH(S, 1780, 600, 240);
  card(S, "ONE LAST WORRY", 700, 130, { t: K(46, "last") });
  [0, 1, 2, 3].forEach((i) => person(S, 260 + i * 150, 910, "near", i, { s: 0.85, mood: "worried", look: 6, t: K(46, "four") + i * 0.15 }));
  card(S, "4 PHYSICISTS, 2012", 480, 540, { t: K(46, "four"), size: DS.type.caption });
  { const g = S.grp(); fireArc(S, 1780, 600, 244, 125, 235, g, 8); fadeG(S, g, K(46, "wall"), 0.5); }
  stamp(S, 1440, 600, "?", K(46, "wall") + 0.4, "red", { size: DS.type.display }); }

// Their paper said perhaps the infalling observer burns up at the horizon.
{ const S = sc(47, 0, { cam: "push", focus: "960 540" });
  space(S, { clear: [1740, 600, 400], glow: [1740, 600, 800, "orange", 0.14] });
  BH(S, 1780, 600, 230);
  panel(S, 560, 520, 780, 600, S.start);
  itxt(S, "A PAPER, 2012", 560, 290, { size: DS.type.small });
  S.fill(rect(214, 360, 330, 64), S.start, 0, DS.c("gold", 1), 0.75);
  [["PERHAPS the infalling", 400], ["observer burns up", 480], ["at the horizon.", 560]].forEach(([s, y]) => itxt(S, s, 224, y, { anchor: "start", size: DS.type.caption, t: S.start }));
  dave(S, 1150, 910, "near", { s: 1.05, mood: "worried", look: 6 });
  { const g = S.grp(); fireArc(S, 1780, 600, 234, 125, 235, g, 8); fadeG(S, g, K(47, "burns")); }
  stamp(S, 1440, 600, "?", K(47, "burns") + 0.2, "red", { size: DS.type.display }); }

// Others pushed back hard, and it's still argued about.
{ const S = sc(47, "Others", { cam: "push", focus: "960 540" });
  space(S, { glow: [960, 600, 900, "purple", 0.14] });
  [0, 1].forEach((i) => person(S, 360 + i * 170, 900, "near", i + 1, { s: 1.0, mood: "determined", pose: "push", look: 6 }));
  [0, 1].forEach((i) => person(S, 1360 + i * 170, 900, "near", i + 3, { s: 1.0, mood: "determined", pose: "reachL", look: -6 }));
  { const g = S.grp(); fireWall(S, 700, 880, 1220, 880, g, 8); }
  stamp(S, 960, 330, "STILL ARGUED ABOUT", K(47, "still"), "orange", { size: DS.type.small });
  card(S, "OTHERS PUSHED BACK", 960, 150, { t: K(47, "Others") }); }

// Dave's own watch ticks perfectly normally. He braces his feet.
{ const S = sc(48, 0, { cam: "push", focus: "960 540" });
  space(S, { clear: [1700, 1250, 500], glow: [1700, 1250, 900, "orange", 0.14] });
  BH(S, 1700, 1260, 380, { halo: 2.2, disk: false });
  const F = dave(S, 520, 960, "near", { s: 1.5, pose: "point", mood: "determined", look: 6 });
  clockD(S, 1130, 540, 190, { h: 10, m: 10, sweep: [S.start + 0.3, S.len - 0.8, 0.45], ease: "none" });
  card(S, "TICKING NORMALLY", 1130, 220, { t: K(48, "watch") }); tick(S, 1480, 220, 1.4, K(48, "normally"), "green"); }

// A thousand kilometres to go. A hundred. Ten.
{ const S = sc(48, "thousand", { cam: "none" });
  space(S, { clear: [960, 1260, 400] });
  const bg = BH(S, 960, 1290, 360, { halo: 2.0, disk: false });
  scaleAt(bg.g, K(48, "hundred") - 0.3, 1.0, 960, 1290, 1.0, 1.25); scaleAt(bg.g, K(48, "ten") - 0.3, 1.0, 960, 1290, 1.25, 1.6);
  dave(S, 960, 650, "near", { s: 0.9, mood: "determined", look: 0 });
  swapTxt(S, [[S.start, "1,000 KM"], [K(48, "hundred"), "100 KM"], [K(48, "ten"), "10 KM"]], 960, 190, { size: DS.type.display });
  wtxt(S, "TO THE EDGE", 960, 250, { size: DS.type.caption, t: S.start }); }

// ===================== 5. The giant is the gentle one =====================
// Then he crosses the event horizon, and feels absolutely nothing.
{ const S = sc(49, 0, { cam: "push", focus: "960 560" });
  space(S, { clear: [960, 1380, 800], glow: [960, 1000, 900, "orange", 0.12] });
  BH(S, 960, 1380, 760, { halo: 1.5, disk: false });
  orbit(S, 960, 1380, 762, "red", S.start, { w: DS.w.near });
  dave(S, 960, 780, "near", { s: 1.0, mood: "smile", look: 0 });
  hud(S, "POSITION", "CROSSING THE EDGE", S.start, { wd: 840, size: DS.type.body });
  card(S, "FEELS NOTHING", 1500, 400, { t: K(49, "feels") }); }

// "Was that it? I didn't feel a thing. Where's the edge?"
{ const S = sc(50, 0, { cam: "push", focus: "960 540" });
  space(S, { n: 110, clear: [960, 1520, 900] });
  BH(S, 960, 1540, 860, { halo: 1.4, disk: false });
  const F = dave(S, 960, 940, "near", { s: 1.3, mood: "wow", look: 0, pose: "shrug" }); talk(S, F, K(50, "Was"), KE(50, "edge"));
  qmark(S, 520, 440, 1.1, K(50, "feel"), "gold"); qmark(S, 1400, 400, 1.4, K(50, "Where's"), "gold"); }

// That was it. Andrew Hamilton at the University of Colorado animated the view as you cross.
{ const S = sc(51, 0, { cam: "push", focus: "960 540" });
  space(S, {});
  who(S, 440, 940, "near", Object.assign({}, LABCOAT, { s: 1.2, mood: "smile", look: 6, pose: "point" }));
  card(S, "A. HAMILTON, UNIV. OF COLORADO", 420, 400, { t: K(51, "Andrew"), size: DS.type.caption });
  const L = laptop(S, 1260, 540, 780, 480);
  const cl = clipG(S, rect(L.x, L.y, L.w, L.h), S.grp()); starsIn(S, 40, L.x, L.y, L.x + L.w, L.y + L.h, cl);
  BH(S, L.x + L.w / 2, L.y + L.h + 160, 300, { parent: cl, halo: 1.6, disk: false });
  const ds = dave(S, L.x + L.w / 2, L.y + L.h * 0.55, "near", { s: 0.22, parent: S.grp(cl), helmet: false }); shift(ds.all, K(51, "animated"), S.end - K(51, "animated") - 0.6, [0, 0], [0, 150]); }

// There's no sign of the edge at all.
{ const S = sc(51, "There's", { cam: "push", focus: "960 540" });
  space(S, {});
  S.draw(rrect(280, 150, 1360, 700, DS.r.md), S.start, 0, { fill: DS.c("navy", 2), c: DS.P.white[0], w: DS.w.near });
  const cl = clipG(S, rrect(292, 162, 1336, 676, DS.r.sm), S.grp()); starsIn(S, 90, 292, 162, 1628, 838, cl, 2);
  BH(S, 960, 1240, 520, { parent: cl, halo: 1.3, disk: false });
  card(S, "NO SIGN OF THE EDGE", 960, 900, { t: K(51, "sign") }); }

// His own caption says: yes, the animation is boring.
{ const S = sc(52, 0, { cam: "push", focus: "960 540" });
  space(S, { glow: [960, 540, 900, "purple", 0.12] });
  who(S, 330, 930, "near", Object.assign({}, LABCOAT, { s: 1.0, mood: "tired", look: 4 }));
  quoteCard(S, 1090, 500, 1240, 560, ["Yes, the animation", "is boring."], "FROM HIS OWN CAPTION", S.start); }

// So where's the spaghetti? Here's the twist: the giant is the gentle one.
{ const S = sc(53, 0, { cam: "push", focus: "1000 560" });
  space(S, { clear: [1380, 560, 700], glow: [1380, 560, 1100, "orange", 0.15] });
  const bh = BH(S, 1400, 580, 320); fadeG(S, bh.g, K(53, "Here's") - 0.2, 0.6);
  const pl = S.grp(); DS.shape(S, circ(1100, 620, 300, 92), "white", { flat: true, w: "mid", c: DS.c("gray", 1), parent: pl }); S.draw(circ(1100, 600, 300, 92), S.start, 0, { fill: DS.c("white", 2), c: DS.c("gray", 1), w: DS.w.detail, parent: pl }); S.draw(circ(1100, 600, 200, 56), S.start, 0, { c: DS.c("gray", 1), w: DS.w.hair, parent: pl });
  qmark(S, 1100, 470, 2.4, undefined, "gold", pl); dim(pl, K(53, "Here's") - 0.4, 0.6, 1, 0);
  const F = dave(S, 560, 940, "near", { s: 1.15, mood: "smile", look: 6 }); card(S, "ALL IN ONE PIECE", 560, 440, { t: K(53, "where's") });
  stamp(S, 640, 250, "THE TWIST", K(53, "twist"), "orange"); card(S, "THE GIANT IS THE GENTLE ONE", 1280, 140, { t: K(53, "giant"), size: DS.type.small }); }

// The stretch depends on how fast gravity changes from your feet to your head.
{ const S = sc(54, 0, { cam: "push", focus: "960 540" });
  space(S, { clear: [960, 1230, 700], glow: [960, 1230, 800, "orange", 0.16] });
  BH(S, 960, 1240, 360, { halo: 2.2, disk: false });
  const F = dave(S, 700, 800, "near", { s: 1.15, mood: "worried", look: 0 });
  const hy = F.hd[1] + 50, fy = F.gy - 120;
  S.arrow(1000, hy - 40, 1000, hy + 40, S.start, 0.3, { c: DS.c("sky", 1), w: DS.w.mid, head: 16 }); S.arrow(1000, fy - 120, 1000, fy + 60, S.start, 0.3, { c: DS.c("red", 1), w: DS.w.near * 1.6, head: 30 });
  { const g = S.grp(); S.draw(`M1090 ${hy + 40} H1130 V${fy + 60} H1090`, S.start, 0, { c: DS.c("gold", 1), w: DS.w.near, parent: g }); dash(S.draw(`M1000 ${hy + 40} H1090 M1000 ${fy + 60} H1090`, S.start, 0, { c: DS.c("gold", 1), w: DS.w.detail, parent: g }), 8, 8); fadeG(S, g, K(54, "fast")); }
  card(S, "THE CHANGE IS THE STRETCH", 1480, 420, { t: K(54, "fast"), size: DS.type.caption }); }

// At a giant's edge, millions of kilometres from the centre, it barely changes across a body.
{ const S = sc(55, 0, { cam: "push", focus: "960 540" });
  space(S, {});
  [[130, 930], [990, 1790]].forEach(([a, b], i) => { S.draw(rrect(a, 190, b - a, 700, DS.r.md), S.start, 0, { fill: DS.c("navy", 2), c: DS.c("sky", 1), w: DS.w.detail }); });
  { const cl = clipG(S, rrect(130, 190, 800, 700, DS.r.md), S.grp()); BH(S, 330, 560, 40, { parent: cl, disk: false, halo: 3 }); const F = dave(S, 660, 790, "near", { s: 0.75, parent: cl, mood: "worried" });
    S.arrow(820, F.hd[1], 820, F.hd[1] + 40, S.start, 0.3, { c: DS.c("sky", 1), w: DS.w.mid, head: 14, parent: cl }); S.arrow(820, F.gy - 190, 820, F.gy, S.start, 0.3, { c: DS.c("red", 1), w: DS.w.near * 1.6, head: 26, parent: cl }); }
  { const g = S.grp(), cl = clipG(S, rrect(990, 190, 800, 700, DS.r.md), g); BH(S, 1390, 1280, 520, { parent: cl, halo: 1.4, disk: false });
    const F = dave(S, 1330, 760, "near", { s: 0.75, parent: cl, mood: "smile" });
    S.arrow(1500, F.hd[1], 1500, F.hd[1] + 110, S.start, 0.3, { c: DS.c("sky", 1), w: DS.w.near, head: 22, parent: cl }); S.arrow(1500, F.gy - 190, 1500, F.gy - 70, S.start, 0.3, { c: DS.c("sky", 1), w: DS.w.near, head: 22, parent: cl });
    S.draw(rrect(990, 190, 800, 700, DS.r.md), S.start, 0, { c: DS.c("green", 1), w: DS.w.detail, parent: g }); fadeG(S, g, K(55, "giant's")); }
  card(S, "SMALL: BIG CHANGE", 530, 130, { t: S.start, size: DS.type.caption }); card(S, "GIANT: BARELY CHANGES", 1390, 130, { t: K(55, "giant's"), size: DS.type.caption }); }

// Hamilton did the sums. Above about thirty thousand suns, the stretch at the edge is weaker than Earth's own gravity. Dave's has four million.
{ const S = sc(56, 0, { cam: "push", focus: "960 540" });
  space(S, {});
  who(S, 300, 900, "near", Object.assign({}, LABCOAT, { s: 1.0, mood: "smile", look: 6 })); card(S, "HAMILTON", 300, 450, { t: K(56, "Hamilton"), size: DS.type.caption });
  S.draw("M640 560 H1800", S.start, 0, { c: DS.c("gray", 1), w: DS.w.mid * 2 });
  S.fill(rect(640, 548, 530, 24), K(56, "Above") - 0.5, 0.3, DS.c("red", 1), 0.9); S.fill(rect(1170, 548, 630, 24), K(56, "Above"), 0.3, DS.c("green", 1), 0.95);
  S.draw("M1170 500 V620", K(56, "thirty"), 0, { c: DS.P.white[0], w: DS.w.near });
  wtxt(S, "10 SUNS", 700, 660, { size: DS.type.caption, t: S.start }); wtxt(S, "30,000 SUNS", 1170, 660, { size: DS.type.caption, t: K(56, "thirty") });
  card(S, "WEAKER THAN EARTH'S GRAVITY", 1400, 300, { t: K(56, "weaker"), size: DS.type.caption, tc: "green" });
  card(S, "STRETCHES YOU APART", 940, 430, { t: S.start, size: DS.type.caption, tc: "red" });
  { const g = S.grp(); BH(S, 1740, 560, 30, { parent: g, disk: false, halo: 3 }); wtxt(S, "DAVE'S: 4 MILLION SUNS", 1490, 780, { size: DS.type.caption, t: K(56, "Dave's"), parent: g }); S.arrow(1590, 740, 1700, 600, S.start, 0.3, { c: DS.P.white[0], w: DS.w.mid, parent: g }); fadeG(S, g, K(56, "Dave's")); } }

// It still shreds stars, because stars are huge.
{ const S = sc(57, 0, { cam: "push", focus: "960 540" });
  space(S, { clear: [1560, 700, 380], glow: [1560, 700, 800, "orange", 0.14] });
  BH(S, 1600, 740, 260);
  glow(S, 500, 420, 340, "gold", 0.4); S.fill(circ(500, 420, 210, 190), S.start, 0, DS.vol("yellow"), 1);
  [[600, 440, 1260, 640], [560, 520, 1280, 700], [520, 330, 1240, 600]].forEach((r, i) => { const g = ribbon(S, [[r[0], r[1]], [(r[0] + r[2]) / 2, (r[1] + r[3]) / 2 - 60 + i * 20], [r[2], r[3]]], "yellow"); fadeG(S, g, K(57, "shreds") + i * 0.15, 0.4); });
  card(S, "STARS ARE HUGE", 500, 800, { t: CL(S, K(57, "huge"), 1.7) }); }

// Dave is under two metres. For once, being short helps.
{ const S = sc(57, "Dave", { cam: "push", focus: "960 540" });
  space(S, {});
  glow(S, 1250, 540, 520, "gold", 0.25); S.fill(circ(1250, 540, 330, 310), S.start, 0, DS.c("yellow", 1), 0.28);
  const F = dave(S, 760, 920, "near", { s: 1.3, mood: "happy", look: 0, pose: "hips" });
  S.draw(`M980 ${F.hd[1] - F.r} H1030 M1005 ${F.hd[1] - F.r} V920 M980 920 H1030`, S.start, 0, { c: DS.c("gold", 1), w: DS.w.near });
  card(S, "UNDER 2 M", 1180, 640, { t: K(57, "under") }); card(S, "BEING SHORT HELPS", 960, 150, { t: K(57, "short") }); }

// NASA's Schnittman has some advice. If you have the choice, you want to fall into a supermassive black hole.
{ const S = sc(58, 0, { cam: "push", focus: "960 540" });
  space(S, { clear: [1560, 700, 400], glow: [1560, 700, 800, "orange", 0.14] });
  BH(S, 1620, 720, 300);
  who(S, 420, 940, "near", Object.assign({}, LABCOAT, { s: 1.2, mood: "smile", look: 4, pose: "point" }));
  card(S, "J. SCHNITTMAN, NASA", 440, 430, { t: K(58, "Schnittman"), size: DS.type.caption });
  say(S, 1000, 280, 380, 150, 560, 520, ["FALL INTO A", "SUPERMASSIVE ONE"], K(58, "supermassive") - 1.5, { size: DS.type.small }); }

// Good thing nobody let Dave swap.
{ const S = sc(59, 0, { cam: "push", focus: "960 540" });
  space(S, { clear: [1560, 660, 360], glow: [1560, 660, 800, "orange", 0.14] });
  BH(S, 1580, 700, 240); tick(S, 1380, 380, 2.2, K(59, "Good"), "green");
  BH(S, 1100, 280, 34, { disk: false, halo: 3 }); xMark(S, 1100, 280, 1.4, K(59, "swap") - 0.3);
  const F = dave(S, 560, 930, "near", { s: 1.3, mood: "happy", look: 6, pose: "head" });
  stamp(S, 1040, 520, "SWAP DENIED", K(59, "swap"), "red", { size: DS.type.small }); }

// As for the fire, nobody has checked. Except Dave, and Dave can't tell anyone.
{ const S = sc(60, 0, { cam: "push", focus: "960 540" });
  space(S, { glow: [1300, 560, 900, "purple", 0.14] });
  { const g = S.grp(); fireWall(S, 220, 860, 700, 860, g, 7); dim(g, S.start, 0.01, 1, 0.55); }
  stamp(S, 460, 560, "?", S.start, "red", { size: DS.type.display });
  card(S, "NOBODY HAS CHECKED", 640, 150, { t: K(60, "nobody") });
  const F = dave(S, 1180, 930, "near", { s: 1.2, mood: "worried", look: -4, pose: "shrug", t: K(60, "Except") });
  { const g = S.grp(); S.speech(1480, 440, 300, 150, 1260, 640, S.start, 0.3, { parent: g }); bars(S, 1450, 470, 1.0, g); xMark(S, 1480, 420, 1.6, S.start, g); S.text("NO SIGNAL", 1480, 535, { size: DS.type.caption, c: DS.c("ink"), t: T0(S), parent: g }); fadeG(S, g, K(60, "tell")); } }

// ===================== 6. Every way is down =====================
// Inside, it isn't even dark. Dave can still see the stars behind him,
{ const S = sc(61, 0, { cam: "push", focus: "960 540" });
  space(S, { n: 170, clear: [960, 1540, 700], neb: [[960, 300, 1000, "purple", 0.32]] });
  lensArcs(S, 960, 1540, 860, 1500, 70);
  BH(S, 960, 1560, 800, { halo: 1.4, disk: false });
  dave(S, 960, 780, "near", { s: 1.1, mood: "wow", look: 0 });
  hud(S, "POSITION", "INSIDE THE EDGE", S.start, { wd: 760, size: DS.type.body });
  card(S, "NOT EVEN DARK", 1500, 300, { t: K(61, "dark") }); }

// but there's no fast-forward through the future. So much for the plan.
{ const S = sc(61, "But", { cam: "push", focus: "960 540" });
  space(S, {});
  deckChair(S, 500, 790);
  const F = dave(S, 500, 780, "near", { s: 1.0, sit: true, pose: "hold", mood: "tired", look: 6 });
  popcorn(S, 780, 880, 0.8);
  S.draw(rrect(930, 220, 820, 520, DS.r.md), S.start, 0, { fill: DS.c("navy", 2), c: DS.P.white[0], w: DS.w.near });
  clockD(S, 1340, 480, 150, { h: 12, m: 0 }); xMark(S, 1340, 480, 4, K(61, "no"), undefined);
  stamp(S, 1340, 140, "NO FAST-FORWARD", K(61, "fast-forward"), "red", { size: DS.type.small }); }

// When he turns round to head back, the centre is still in front of him.
{ const S = sc(62, 0, { cam: "push", focus: "960 540" });
  space(S, { n: 110 });
  const F = dave(S, 700, 920, "near", { s: 1.2, mood: "worried", look: 6, pose: "push" });
  flipX(F.all, K(62, "turns"), 700);
  const g = S.grp(); glow(S, 1500, 560, 200, "gold", 0.5, g); S.fill(circ(1500, 560, 22), S.start, 0, DS.P.white[0], 1, g); card(S, "THE CENTRE", 1500, 700, { t: S.start, parent: g, size: DS.type.small });
  shift(g, K(62, "turns") + 0.1, 0.9, [0, 0], [-1260, -110]);
  card(S, "STILL IN FRONT", 960, 140, { t: K(62, "still") }); }

// The physicist Sean Carroll puts it this way: you can no more stop moving toward the singularity than you can stop getting older.
{ const S = sc(63, 0, { cam: "push", focus: "960 540" });
  space(S, { glow: [960, 540, 1000, "purple", 0.16] });
  quoteCard(S, 960, 520, 1560, 640, ["you can no more stop moving", "toward the singularity than", "you can stop getting older."], "SEAN CARROLL, PHYSICIST", S.start); }

// In NASA's simulation, the camera lasts about thirteen seconds past the edge.
{ const S = sc(64, 0, { cam: "push", focus: "960 540" });
  space(S, { glow: [960, 520, 800, "gold", 0.1] });
  ringFill(S, 960, 500, 240, S.start + 0.4, S.len - 1.0); S.draw(circ(960, 500, 240), S.start, 0, { c: DS.c("gray", 2), w: DS.w.detail, op: 0.6 });
  countUp(S, 960, 540, 0, 13, S.start + 0.4, S.len - 1.0, { size: DS.type.display, ease: "none", halo: DS.c("ink", 2) });
  wtxt(S, "SECONDS", 960, 640, { size: DS.type.small, t: S.start }); card(S, "PAST THE EDGE", 960, 880, { t: K(64, "past") }); }

// Dave spends them on the postcard.
{ const S = sc(64, "Dave", { cam: "push", focus: "960 540" });
  space(S, { glow: [1400, 460, 800, "gold", 0.1] });
  ringFill(S, 1480, 420, 170, S.start, S.len - 0.4); S.draw(circ(1480, 420, 170), S.start, 0, { c: DS.c("gray", 2), w: DS.w.detail, op: 0.6 });
  countUp(S, 1480, 450, 8, 13, S.start, S.len - 0.4, { size: DS.type.title, ease: "none", halo: DS.c("ink", 2) });
  const F = dave(S, 640, 930, "near", { s: 1.3, mood: "determined", look: 6, pose: "hold" });
  const [hx, hy] = F.hand("R", "hold"); postcard(S, hx + 20, hy - 20, 0.5, { side: "back", rot: 6, parent: F.all, msg: ["Nothing"], size: DS.type.caption, msgT: [K(64, "postcard")] }); }

// "Nothing special at the door. Lovely view. Wish you were here."
{ const S = sc(65, 0, { cam: "push", focus: "960 540" });
  space(S, { glow: [960, 540, 900, "purple", 0.14] });
  const pg = S.grp(); postcard(S, 940, 520, 1.9, { side: "back", rot: -2, parent: pg, size: DS.type.small, msg: ["Nothing special", "at the door.", "Lovely view.", "Wish you were here."], msgT: [K(65, "Nothing"), K(65, "at"), K(65, "Lovely"), K(65, "Wish")], dur: 0.9 }); shift(pg, S.start, S.len, [0, 6], [0, -6]);
  const F = dave(S, 1720, 940, "near", { s: 0.85, mood: "smile", look: -6, pose: "hold" }); talk(S, F, K(65, "Nothing"), KE(65, "here")); }

// Then the stretch finally catches up with him. The spaghetti was just running late.
{ const S = sc(66, 0, { cam: "push", focus: "960 540" });
  space(S, { glow: [960, 1000, 900, "orange", 0.1] });
  const F = dave(S, 760, 520, "near", { s: 1.0, mood: "smile", look: 0 }); stretch(S, F, K(66, "stretch"), 1.6, 0.6, 2.4);
  clockD(S, 1400, 420, 160, { h: 9, m: 5 }); stamp(S, 1400, 700, "RUNNING LATE", K(66, "late"), "orange", { size: DS.type.small }); }

// And the very centre? Our best physics stops working there, so nobody knows.
{ const S = sc(67, 0, { cam: "push", focus: "960 540" });
  space(S, { clear: [960, 520, 200], glow: [960, 520, 800, "gold", 0.14] });
  for (let a = 0; a < 360; a += 30) { const r = (a * Math.PI) / 180; S.arrow(960 + Math.cos(r) * 520, 520 + Math.sin(r) * 330, 960 + Math.cos(r) * 150, 520 + Math.sin(r) * 95, S.start, 0.3, { c: DS.c("gold", 1), w: DS.w.mid, head: 16 }); }
  glow(S, 960, 520, 140, "white", 0.5); S.fill(circ(960, 520, 14), S.start, 0, DS.P.white[0], 1);
  qmark(S, 960, 520, 1.2, K(67, "nobody") - 0.6, "gold");
  card(S, "THE CENTRE", 960, 130, { t: K(67, "centre") }); card(S, "OUR BEST PHYSICS STOPS WORKING", 960, 900, { t: K(67, "physics"), size: DS.type.caption }); }

// ===================== 7. The postcard =====================
const PAN = (S, a, b, t) => { const g = S.grp(); S.draw(rrect(a, 200, b - a, 690, DS.r.md), S.start, 0, { fill: DS.c("navy", 2), c: DS.c("sky", 1), w: DS.w.detail, parent: g }); return fadeG(S, g, t); };
// So what would happen if you fell into a black hole?
{ const S = sc(68, 0, { cam: "push", focus: "960 540" });
  space(S, {});
  PAN(S, 130, 930); PAN(S, 990, 1790);
  qmark(S, 530, 540, 2.4, S.start, "gold"); qmark(S, 1390, 540, 2.4, K(68, "fell") - 0.5, "gold"); }

// In a small one, spaghetti before the door.
{ const S = sc(68, "In", { cam: "push", focus: "960 540" });
  space(S, {});
  PAN(S, 130, 930); PAN(S, 990, 1790); qmark(S, 1390, 540, 2.4, S.start, "gold");
  { const cl = clipG(S, rrect(130, 200, 800, 690, DS.r.md), S.grp());
    BH(S, 740, 560, 40, { parent: cl, disk: false, halo: 3 }); orbit(S, 740, 560, 62, "red", S.start, { parent: cl });
    S.draw(rrect(784, 512, 30, 56, DS.r.xs), S.start, 0, { fill: DS.c("wood", 0), c: DS.P.white[0], w: DS.w.detail, parent: cl });
    const F = dave(S, 330, 690, "near", { s: 0.6, parent: S.grp(cl), mood: "smile" }); stretch(S, F, S.start - 0.65, 0.01, 0.5, 2.3); faceRight(F); }
  card(S, "A SMALL ONE", 530, 130, { t: K(68, "small") }); card(S, "SPAGHETTI BEFORE THE DOOR", 530, 830, { t: K(68, "spaghetti"), size: DS.type.caption }); }

// In a giant one, a quiet crossing, a fading torch, and thirteen strange seconds.
{ const S = sc(69, 0, { cam: "push", focus: "960 540" });
  space(S, {});
  PAN(S, 130, 930); PAN(S, 990, 1790);
  { const cl = clipG(S, rrect(130, 200, 800, 690, DS.r.md), S.grp()); BH(S, 740, 560, 40, { parent: cl, disk: false, halo: 3 }); orbit(S, 740, 560, 62, "red", S.start, { parent: cl });
    const F = dave(S, 330, 690, "near", { s: 0.6, parent: S.grp(cl), mood: "smile" }); stretch(S, F, S.start - 0.65, 0.01, 0.5, 2.3); faceRight(F); }
  card(S, "A SMALL ONE", 530, 130, { t: S.start });
  const cl = clipG(S, rrect(990, 200, 800, 690, DS.r.md), S.grp()); BH(S, 1390, 1300, 520, { parent: cl, halo: 1.4, disk: false });
  dave(S, 1330, 770, "near", { s: 0.65, parent: cl, mood: "smile" });
  const tg = lamp(S, 1190, 560, 12, "yellow", undefined, cl, 0.6); dim(tg, K(69, "fading"), 2.2, 1, 0.1);
  card(S, "A GIANT ONE", 1390, 130, { t: K(69, "giant") });
  [["A QUIET CROSSING", "quiet", 290], ["A FADING TORCH", "fading", 365], ["13 STRANGE SECONDS", "thirteen", 440]].forEach(([s, k, y]) => wtxt(S, s, 1390, y, { size: DS.type.caption, t: K(69, k), halo: DS.c("navy", 2), haloW: 0.1 })); }

// And the postcard? In nineteen seventy-four, Stephen Hawking showed that black holes aren't completely black.
{ const S = sc(70, 0, { cam: "push", focus: "960 540" });
  space(S, { clear: [1300, 560, 420], glow: [1300, 560, 900, "orange", 0.12] });
  BH(S, 1320, 580, 190, { disk: false, halo: 2.4 });
  const pg = S.grp(); postcard(S, 470, 580, 0.9, { side: "back", rot: -6, parent: pg }); qmark(S, 470, 580, 0.8, K(70, "postcard"), "gold"); shift(pg, S.start, S.len, [0, 6], [0, -6]);
  card(S, "STEPHEN HAWKING, 1974", 960, 130, { t: K(70, "nineteen") }); wtxt(S, "NOT COMPLETELY BLACK", 1320, 880, { size: DS.type.small, t: K(70, "completely"), halo: DS.c("ink", 2), haloW: 0.12 }); }

// They glow faintly, and slowly shrink away.
{ const S = sc(70, "They", { cam: "push", focus: "960 540" });
  space(S, { clear: [960, 560, 420] });
  const g = S.grp(); glow(S, 960, 560, 420, "sky", 0.28, g, 1); BH(S, 960, 560, 170, { parent: g, disk: false, halo: 2.2, haloOp: 0.12 }); scaleAt(g, K(70, "slowly") - 0.3, S.end - K(70, "slowly") - 0.4, 960, 560, 1, 0.7);
  for (let i = 0; i < 14; i++) { const a = (i / 14) * Math.PI * 2 + 0.2, d = [[960 + Math.cos(a) * 230, 560 + Math.sin(a) * 230], [960 + Math.cos(a) * 520, 560 + Math.sin(a) * 340]], L = lamp(S, d[0][0], d[0][1], 4, "sky", undefined, undefined, 0.5); follow(L, d, K(70, "glow") + i * 0.12, 2.4, "power1.out"); dim(L, K(70, "glow") + i * 0.12 + 1.6, 0.8, 1, 0); }
  card(S, "THEY GLOW FAINTLY", 540, 150, { t: K(70, "glow") }); card(S, "AND SHRINK AWAY", 1380, 880, { t: K(70, "slowly") }); }

// Dave's would take about ten to the power of eighty-seven years to vanish.
{ const S = sc(71, 0, { cam: "push", focus: "960 540" });
  space(S, {});
  const g = S.grp(); glow(S, 520, 560, 360, "sky", 0.2, g, 1); BH(S, 520, 560, 160, { parent: g, disk: false, halo: 2 }); scaleAt(g, S.start + 0.5, S.len - 1.2, 520, 560, 1, 0.35); dim(g, S.start + 0.5, S.len - 1.0, 1, 0.05);
  S.text("10", 1240, 640, { size: DS.type.display * 1, c: DS.P.white[0], t: K(71, "ten"), halo: DS.c("ink", 2) }); S.text("87", 1370, 540, { size: DS.type.title, c: DS.c("gold", 1), t: K(71, "eighty-seven"), halo: DS.c("ink", 2) });
  wtxt(S, "YEARS TO VANISH", 1240, 760, { size: DS.type.small, t: K(71, "years") }); }

// Does his postcard come out in that glow?
{ const S = sc(71, "Does", { cam: "push", focus: "960 540" });
  space(S, { clear: [600, 560, 360] });
  glow(S, 620, 560, 380, "sky", 0.24, undefined, 1); BH(S, 620, 560, 60, { disk: false, halo: 3, haloOp: 0.1 });
  const pg = S.grp(); postcard(S, 620, 560, 0.7, { side: "back", rot: -8, parent: pg }); shift(pg, K(71, "postcard"), S.end - K(71, "postcard") - 0.5, [0, 0], [760, -40]); dim(pg, K(71, "postcard"), 0.6, 0, 1);
  qmark(S, 1500, 400, 1.6, K(71, "glow"), "gold"); card(S, "DOES THE POSTCARD COME OUT?", 960, 140, { t: K(71, "postcard"), size: DS.type.caption }); }

// It's one of the most famous puzzles in physics.
{ const S = sc(71, "It's", { cam: "push", focus: "960 540" });
  space(S, { glow: [960, 540, 900, "gold", 0.1] });
  puzzle(S, 960, 560, 3.2, S.start, "gold"); card(S, "ONE OF THE MOST FAMOUS PUZZLES", 960, 150, { t: S.start, size: DS.type.caption }); }

// Hawking first said no. In two thousand four, he lost a bet on it, and paid with an encyclopedia, from which information can be freely retrieved.
{ const S = sc(72, 0, { cam: "push", focus: "960 540" });
  space(S, {});
  { const g = S.grp(); stamp(S, 960, 500, "NO", S.start, "red", { size: DS.type.display, parent: g }); card(S, "HAWKING FIRST SAID", 960, 250, { t: S.start, parent: g }); dim(g, K(72, "In") - 0.15, 0.4, 1, 0); }
  { const g = S.grp();
    [0, 1, 2].forEach((i) => DS.shape(S, rrect(700 + i * 16, 560 + i * 56, 560 - i * 20, 50, DS.r.xs), ["red", "green", "blue"][i], { w: "detail", c: DS.P.white[0], parent: g }));
    S.text("ENCYCLOPEDIA", 980, 604, { size: DS.type.caption, c: DS.P.white[0], t: K(72, "encyclopedia"), parent: g });
    card(S, "2004: LOST A BET", 960, 250, { t: K(72, "two"), parent: g }); fadeG(S, g, K(72, "In"), 0.5);
    const h = S.grp(g); S.draw(circ(1480, 600, 70), S.start, 0, { fill: DS.P.white[0], c: DS.c("blue", 2), w: DS.w.near, parent: h }); S.text("i", 1480, 636, { size: DS.type.display, c: DS.c("blue", 2), t: T0(S), parent: h }); arr(S, 1270, 660, 1400, 620, K(72, "freely"), { c: "gold", parent: h }); fadeG(S, h, K(72, "information")); } }

// Later he said it does come back out, in a chaotic and useless form.
{ const S = sc(73, 0, { cam: "push", focus: "960 540" });
  space(S, { clear: [560, 560, 360], glow: [560, 560, 800, "orange", 0.1] });
  BH(S, 560, 580, 150, { disk: false, halo: 2.4 });
  "GREETINGS".split("").forEach((ch, i) => { const x = 1000 + (i % 5) * 150, y = 330 + Math.floor(i / 5) * 210 + (i % 2 ? 40 : -20), g = S.grp(); S.text(ch, x, y, { size: DS.type.display, c: DS.c(["gold", "sky", "pink", "white"][i % 4], 1), t: K(73, "come") + i * 0.12, parent: g, halo: DS.c("ink", 2) }); g.setAttribute("transform", `rotate(${((i * 53) % 50) - 25} ${x} ${y})`); });
  card(S, "CHAOTIC AND USELESS", 1300, 880, { t: K(73, "chaotic") }); }

// So the postcard will probably arrive. Scrambled, and very late.
{ const S = sc(73, "So", { cam: "push", focus: "960 540" });
  space(S, { glow: [960, 540, 900, "purple", 0.14] });
  const pg = S.grp(); postcard(S, 960, 540, 1.8, { side: "back", rot: -3, parent: pg, size: DS.type.small, msg: ["tgreeings fmor", "nisied a kclab", "hloe"], msgT: [K(73, "Scrambled"), K(73, "Scrambled") + 0.5, K(73, "Scrambled") + 1.0], dur: 0.7 }); shift(pg, S.start, S.len, [0, 6], [0, -6]);
  card(S, "PROBABLY", 960, 140, { t: K(73, "probably") }); stamp(S, 1380, 860, "VERY LATE", K(73, "late"), "orange"); }

// Hawking put it kindly: if you feel you are in a black hole, don't give up. There's a way out.
{ const S = sc(74, 0, { cam: "push", focus: "960 540" });
  space(S, { glow: [960, 540, 1000, "gold", 0.18] });
  for (let a = 0; a < 360; a += 20) { const r = (a * Math.PI) / 180; S.draw(`M${960 + Math.cos(r) * 420} ${540 + Math.sin(r) * 280} L${960 + Math.cos(r) * 900} ${540 + Math.sin(r) * 600}`, S.start, 0, { c: DS.c("gold", 1), w: DS.w.hair, op: 0.25 }); }
  quoteCard(S, 960, 520, 1500, 660, ["If you feel you are in a", "black hole, don't give up.", "There's a way out."], "STEPHEN HAWKING", S.start); }

// (slow) Greetings from inside a black hole. Wish you were here.
{ const S = sc(75, 0, { cam: "pull", focus: "960 540" });
  space(S, { n: 100, glow: [960, 540, 1100, "orange", 0.1] });
  const pg = S.grp(); postcard(S, 960, 540, 1.9, { side: "back", rot: -3, parent: pg, size: DS.type.body, msg: ["Greetings from", "inside a black hole.", "Wish you were here."], msgT: [K(75, "Greetings"), K(75, "inside"), K(75, "Wish")], dur: 1.4 }); shift(pg, S.start, S.len, [0, 8], [0, -8]); }

CUES.forEach((q, i) => { if (!USED[i]) throw new Error("scene not built for cue " + JSON.stringify(q)); });
