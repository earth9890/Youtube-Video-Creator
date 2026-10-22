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
