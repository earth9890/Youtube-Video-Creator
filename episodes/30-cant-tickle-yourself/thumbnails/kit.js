// helpers copied from ../scenes.js (same Dave, hands, brain and feather as the video)

// ---------- people ----------
// a figure on a depth plane; shadow and body share one group (F.all). o.float = no contact shadow
const who = (S, x, gy, layer = "near", o = {}) => {
  const s = (o.s || 1.1) * DS.depth[layer].s, g = o.parent || S.grp();
  if (!o.float) DS.shadow(S, x, o.gs ?? gy, 150 * s, { t: o.t, parent: g });
  const F = S.fig(x, gy, Object.assign({ hair: "short", outfit: "tee" }, o, { s, parent: g, w: DS.w[DS.depth[layer].w] * 1.3 * Math.sqrt(s) })).draw(o.t ?? S.start, 0.4);
  F.face(o.t ?? S.start, o.mood || "flat", o.look || 0);
  F.all = g;
  return F;
};
const dave = (S, x, gy, layer = "near", o = {}) => who(S, x, gy, layer, Object.assign({ s: 1.1, hair: "side", hairC: DS.c("brown"), outfitC: DS.c("blue") }, o));
const SIS = { hair: "bun", hairC: DS.c("brown"), outfitC: DS.c("orange") }; // Dave's sister (orange is hers alone)
const sister = (S, x, gy, layer = "near", o = {}) => who(S, x, gy, layer, Object.assign({ s: 1.0 }, SIS, o));
const OC = ["green", "purple", "pink", "gold", "red", "earth", "gray", "yellow"]; // no blue (Dave), no orange (his sister)
const HAIR = ["short", "bun", "curly", "side", "messy", "short", "bun", "curly"];
const HC = [["brown", 0], ["ink", 0], ["gray", 1], ["earth", 2], ["brown", 2], ["gray", 2], ["earth", 0], ["ink", 1]];
const person = (S, x, gy, layer, i, o = {}) => who(S, x, gy, layer, Object.assign({ s: 1.1, hair: HAIR[i % 8], hairC: DS.c(HC[i % 8][0], HC[i % 8][1], layer), outfitC: DS.c(OC[i % 8], 0, layer), mood: "flat", look: ((i % 3) - 1) * 5 }, o));
const sci = (S, x, gy, i, o = {}) => person(S, x, gy, o.layer || "near", i, Object.assign({ outfitC: DS.c("white") }, o)); // a generic researcher in a lab coat (never a likeness)
// seek-safe lean (rotation about the feet)
const lean = (F, t, deg, dur = 0.5, from = 0) => tl.fromTo(F.gi, { attr: { transform: `rotate(${from} ${F.cx} ${F.gy})` } }, { attr: { transform: `rotate(${deg} ${F.cx} ${F.gy})` }, duration: dur, ease: "power2.inOut", immediateRender: false }, t);
// custom arm that ends at (x, y): [elbow, hand] in the figure's units (for F.setPose(t, null, ...) or o.armL / o.armR)
const armTo = (F, side, x, y, bend = 1) => { const ax = F.cx + (side === "L" ? -24 : 24) * F.s, ay = F.sh[1] + 10 * F.s, dx = (x - ax) / F.s, dy = (y - ay) / F.s; return [[dx * 0.5 + (side === "L" ? -14 : 14) * bend, dy * 0.5 - 8 * bend], [dx, dy]]; };
const armAt = (cx, gy, s, side, x, y, bend = 1) => armTo({ cx, s, sh: [cx, gy - 255 * s] }, side, x, y, bend);
// laugh: "HA HA!" beside the head + happy face
const laugh = (S, F, t, side = 1) => { F.face(t, "happy", side * 4); const x = F.hd[0] + side * F.r * 1.7, y = F.hd[1] - F.r * 0.4; ["HA", "HA!"].forEach((s, i) => S.text(s, x + side * i * 56, y - i * 56, { size: DS.type.caption, t: t + i * 0.2, c: DS.c("ink") })); };
// little tickle squiggles round a spot (x, y)
const squig = (S, x, y, t, k = 1, n = 3) => { for (let i = 0; i < n; i++) { const a = -2.4 + i * (1.6 / Math.max(1, n - 1)), r = 46 * k, px = x + Math.cos(a) * r, py = y + Math.sin(a) * r; S.draw(smooth([[px, py], [px + Math.cos(a) * 9 * k - 5 * k, py + Math.sin(a) * 9 * k + 4 * k], [px + Math.cos(a) * 18 * k, py + Math.sin(a) * 18 * k]]), t ?? S.start, 0, { c: DS.c("ink"), w: DS.w.detail }); } };
const sweat = (S, F, t) => S.fill(`M${F.hd[0] + F.r * 0.95} ${F.hd[1] - F.r * 0.55} Q${F.hd[0] + F.r * 1.2} ${F.hd[1] - F.r * 0.1} ${F.hd[0] + F.r * 0.95} ${F.hd[1] - F.r * 0.05} Q${F.hd[0] + F.r * 0.72} ${F.hd[1] - F.r * 0.1} ${F.hd[0] + F.r * 0.95} ${F.hd[1] - F.r * 0.55} Z`, t ?? S.start, 0, DS.c("sky"), 1);

// ---------- small kit ----------
const capsule = (a, b, r) => { const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1, nx = (-dy / L) * r, ny = (dx / L) * r; return `M${a[0] + nx} ${a[1] + ny} L${b[0] + nx} ${b[1] + ny} A${r} ${r} 0 0 0 ${b[0] - nx} ${b[1] - ny} L${a[0] - nx} ${a[1] - ny} A${r} ${r} 0 0 0 ${a[0] + nx} ${a[1] + ny} Z`; };
const spin = (g, t, dur, d0, d1, cx, cy, ease = "power2.inOut") => tl.fromTo(g, { attr: { transform: `rotate(${d0} ${cx} ${cy})` } }, { attr: { transform: `rotate(${d1} ${cx} ${cy})` }, duration: dur, ease, immediateRender: false }, t);
// shake a group back and forth (seek-safe yoyo)
const jig = (g, t, dur, dx, dy = 0, per = 0.12) => tl.fromTo(g, { x: 0, y: 0 }, { x: dx, y: dy, duration: per, ease: "sine.inOut", yoyo: true, repeat: Math.max(1, Math.round(dur / per) | 1), immediateRender: false }, t);
const wob = (g, t, dur, deg, cx, cy, per = 0.14) => tl.fromTo(g, { attr: { transform: `rotate(${-deg} ${cx} ${cy})` } }, { attr: { transform: `rotate(${deg} ${cx} ${cy})` }, duration: per, ease: "sine.inOut", yoyo: true, repeat: Math.max(1, Math.round(dur / per) | 1), immediateRender: false }, t);
const txt = (S, s, x, y, o = {}) => S.text(s, x, y, Object.assign({ size: DS.type.caption, c: DS.c("ink") }, o));
const panel = (S, cx, cy, w, h, t, name = "white", parent) => { DS.drop(S, rrect(cx - w / 2 + 8, cy - h / 2 + 12, w, h, DS.r.md), { t, parent }); DS.shape(S, rrect(cx - w / 2, cy - h / 2, w, h, DS.r.md), name, { t, flat: true, w: "detail", parent }); };
const say = (S, cx, cy, rx, ry, tx, ty, strs, t, o = {}) => {
  const g = S.grp(); (o.think ? S.thought : S.speech)(cx, cy, rx, ry, tx, ty, t, 0.3, { parent: g });
  const size = o.size || DS.type.small, n = strs.length;
  strs.forEach((s, i) => S.text(s, cx, cy + size * 0.36 + (i - (n - 1) / 2) * size * 1.2, { size, t: (o.ts || [])[i] ?? t, c: o.c ? DS.c(o.c, 2) : DS.c("ink"), parent: g }));
  return g;
};
// quote panel: lines of a real quote + who said it. o.ts = per-line times
const quote = (S, cx, cy, strs, by, o = {}) => {
  const t = o.t, g = S.grp(), size = o.size || DS.type.small, lh = size * 1.25, n = strs.length;
  const w = Math.max(...strs.map((s) => s.length)) * size * 0.6 + 130, h = n * lh + (by ? 66 : 0) + 64, y0 = cy - h / 2;
  DS.drop(S, rrect(cx - w / 2 + 8, y0 + 12, w, h, DS.r.md), { t, parent: g });
  DS.shape(S, rrect(cx - w / 2, y0, w, h, DS.r.md), "white", { t, flat: true, w: "detail", parent: g });
  DS.shape(S, rect(cx - w / 2 + 22, y0 + 26, 10, n * lh), "gold", { t, flat: true, w: "hair", parent: g });
  strs.forEach((s, i) => S.text(s, cx + 14, y0 + 30 + lh * (i + 0.78), { size, t: (o.ts || [])[i] ?? t, c: DS.c("ink"), parent: g }));
  if (by) S.text(by, cx + 14, y0 + h - 30, { size: DS.type.caption, t, c: DS.c("blue", 2), parent: g });
  return g;
};
// name card for a real person (no likeness): name + one line of who/where/when
const nameCard = (S, name, sub, cx, cy, o = {}) => {
  const t = o.t, g = S.grp(), w = Math.max(name.length * DS.type.small * 0.62, sub.length * DS.type.caption * 0.62) + 96, h = sub ? 150 : 96, x = cx - w / 2, y = cy - h / 2;
  DS.drop(S, rrect(x + 8, y + 12, w, h, DS.r.md), { t, parent: g });
  DS.shape(S, rrect(x, y, w, h, DS.r.md), "white", { t, flat: true, w: "detail", parent: g });
  DS.shape(S, rect(x + 20, y + 22, 10, h - 44), o.bar || "gold", { t, flat: true, w: "hair", parent: g });
  S.text(name, cx + 14, y + 66, { size: DS.type.small, t, c: DS.c("ink"), parent: g });
  if (sub) S.text(sub, cx + 14, y + 118, { size: DS.type.caption, t, c: DS.c("blue", 2), parent: g });
  return g;
};
// small name plate (a name under a figure; not one of the picture's three labels)
const plate = (S, cx, cy, str, t, o = {}) => { const w = str.length * 25 + 48; DS.drop(S, rrect(cx - w / 2 + 4, cy - 26, w, 56, DS.r.sm), { t }); DS.shape(S, rrect(cx - w / 2, cy - 30, w, 56, DS.r.sm), o.fill || "white", { t, w: "detail", flat: true, tone: o.fill ? 1 : 0 }); S.text(str, cx, cy + 12, { size: DS.type.caption, t, c: DS.c("ink") }); };
const tick = (S, x, y, k, t, name = "green") => S.tick(x, y, k, t, 0, { c: DS.c(name), w: DS.w.near });
const xMark = (S, x, y, k, t) => S.cross(x, y, k, t, 0, { c: DS.c("red"), w: DS.w.near });
const stamp = (S, cx, cy, str, t, o = {}) => {
  const name = o.name || "red", size = o.size || DS.type.small, g = S.grp(), w = str.length * size * 0.66 + 60, h = size * 1.75, tf = (k) => `translate(${cx} ${cy}) rotate(${o.rot ?? -8}) scale(${k}) translate(${-cx} ${-cy})`;
  S.draw(rrect(cx - w / 2, cy - h / 2, w, h, DS.r.sm), S.start, 0, { c: DS.c(name, 2), w: DS.w.near, fill: o.clear ? undefined : DS.P.white[0], parent: g });
  S.text(str, cx, cy + size * 0.36, { size, t: S.start, c: DS.c(name, 2), parent: g });
  tl.fromTo(g, { opacity: 0, attr: { transform: tf(1.4) } }, { opacity: 1, attr: { transform: tf(1) }, duration: 0.25, ease: "power3.in" }, t);
  return g;
};
// seek-safe count-up of a big number
const countUp = (S, x, y, to, t, dur, o = {}) => {
  const te = S.text("0", x, y, Object.assign({ size: DS.type.display, t, c: DS.c("red", 2) }, o)), v = { n: o.from || 0 }, fmt = (n) => (o.pre || "") + (o.dec ? n.toFixed(o.dec) : Math.round(n).toLocaleString("en-US")) + (o.post || "");
  te.textContent = fmt(v.n);
  tl.fromTo(v, { n: o.from || 0 }, { n: to, duration: dur, ease: o.ease || "power2.out", immediateRender: false, onUpdate: () => (te.textContent = fmt(v.n)) }, t);
  return te;
};
// bar: x centre, base y, height (grows on t); label under it
const bar = (S, cx, base, w, h, name, t, str, o = {}) => { const g = S.grp(o.parent); DS.shape(S, rect(cx - w / 2, base - h, w, Math.max(2, h)), name, { t, dir: "h", parent: g }); tl.fromTo(g, { attr: { transform: `translate(0 ${base}) scale(1 0.001) translate(0 ${-base})` } }, { attr: { transform: `translate(0 ${base}) scale(1 1) translate(0 ${-base})` }, duration: o.dur || 0.6, ease: "power2.out", immediateRender: false }, t ?? S.start); if (str) txt(S, str, cx, base + 50, { t, size: o.size || DS.type.caption }); return g; };
// grid of n dots. o.fills = [[k, t, dur, name]]: k dots fill in a scattered order over dur
const dotGrid = (S, cx, cy, n, cols, gap, r, o = {}) => {
  const rows = Math.ceil(n / cols), x0 = cx - ((cols - 1) * gap) / 2, y0 = cy - ((rows - 1) * gap) / 2, P = [];
  for (let i = 0; i < n; i++) P.push([x0 + (i % cols) * gap, y0 + Math.floor(i / cols) * gap]);
  P.forEach(([x, y], i) => S.draw(circ(x, y, r), o.t === undefined ? S.start : o.t + (o.stag || 0) * i, 0, { fill: DS.c(o.name || "gray", 1), c: DS.c(o.name || "gray", 2), w: DS.w.hair }));
  const order = P.map((p, i) => [((i * 7919 + 13) % 1009) / 1009, i]).sort((a, b) => a[0] - b[0]).map((a) => a[1]);
  (o.fills || []).forEach(([k, t, dur, name]) => order.slice(0, k).forEach((i, j) => S.draw(circ(P[i][0], P[i][1], r), t + (dur * j) / k, 0, { fill: DS.c(name), c: DS.c(name, 2), w: DS.w.hair })));
  return P;
};
// sound waves: n arcs opening toward dir (+1 right, -1 left)
const waves = (S, x, y, n, t, o = {}) => { const g = S.grp(o.parent), k = o.k || 1, dir = o.dir || 1; for (let i = 0; i < n; i++) { const r = (30 + i * 26) * k, a0 = dir > 0 ? -40 : 140, a1 = dir > 0 ? 40 : 220; S.draw(smooth(arcPts(x, y, r, a0, a1, 10)), t === undefined ? S.start : t + i * (o.stag ?? 0.12), 0, { c: o.c || DS.c("ink"), w: o.w || DS.w.mid, parent: g }); } return g; };
// a volume knob: ticks round it, pointer from angle a0 to a1 at t (degrees, 0 = up)
const knob = (S, cx, cy, r, o = {}) => {
  const t = o.t, g = S.grp();
  DS.shadow(S, cx, cy + r + 8, r * 1.6, { t, parent: g });
  for (let i = 0; i <= 8; i++) { const a = ((-135 + i * 33.75) * Math.PI) / 180; S.draw(line([cx + Math.sin(a) * r * 1.18, cy - Math.cos(a) * r * 1.18], [cx + Math.sin(a) * r * 1.36, cy - Math.cos(a) * r * 1.36], 0), t ?? S.start, 0, { c: DS.c("ink"), w: DS.w.detail, parent: g }); }
  DS.shape(S, circ(cx, cy, r), o.name || "gray", { t, parent: g });
  const p = S.grp(g); S.draw(line([cx, cy], [cx, cy - r * 0.8], 0), t ?? S.start, 0, { c: DS.c("red", 2), w: DS.w.near, parent: p });
  spin(p, o.at ?? (t ?? S.start), o.dur || 0.7, o.a0 ?? 120, o.a1 ?? -110, cx, cy);
  if (o.at === undefined) p.setAttribute("transform", `rotate(${o.a1 ?? -110} ${cx} ${cy})`);
  return g;
};

// ---------- the hands (the hook and the landing) ----------
// a big cartoon hand: (wx, wy) = wrist, ang = where the fingers point (deg, 0 = up, clockwise), k = scale.
// o: { sleeve (colour name), mirror (-1 = thumb on the right), palm (creases), nails (back of the hand), two (only two fingers out), t, parent }
const hand2 = (S, wx, wy, ang, k, o = {}) => {
  const g = S.grp(o.parent), gi = S.grp(g), t = o.t, m = o.mirror || 1, X = (v) => wx + v * k * m, Y = (v) => wy + v * k, P = (a, b) => [X(a), Y(b)];
  gi.setAttribute("transform", `rotate(${ang} ${wx} ${wy})`);
  const F = o.two ? [[-40, -130, -42, -250, 15], [-13, -132, -12, -272, 15.5], [14, -128, 16, -176, 15], [38, -124, 40, -168, 13]] : [[-40, -130, -44, -250, 15], [-13, -132, -14, -272, 15.5], [14, -130, 16, -258, 15], [40, -124, 46, -222, 13]];
  F.forEach(([ax, ay, bx, by, r]) => DS.shape(S, capsule(P(ax, ay), P(bx, by), r * k), o.skin || "white", { t, parent: gi, w: "mid" }));
  DS.shape(S, capsule(P(-46, -58), P(-102, -126), 17 * k), o.skin || "white", { t, parent: gi, w: "mid" });
  DS.shape(S, `M${X(-50)} ${Y(4)} C${X(-66)} ${Y(-40)} ${X(-68)} ${Y(-118)} ${X(-56)} ${Y(-146)} L${X(56)} ${Y(-146)} C${X(68)} ${Y(-118)} ${X(66)} ${Y(-40)} ${X(50)} ${Y(4)} Z`, o.skin || "white", { t, parent: gi, w: "mid" });
  if (o.palm) [[[-44, -100], [-8, -86], [34, -104]], [[-36, -62], [0, -44], [36, -38]]].forEach((p) => S.draw(smooth(p.map(([a, b]) => P(a, b))), t ?? S.start, 0, { c: DS.c("gray", 2), w: DS.w.detail, parent: gi }));
  if (o.nails) F.forEach(([ax, ay, bx, by, r], i) => { if (!o.two || i < 2) DS.shape(S, capsule(P(bx + (ax - bx) * 0.04, by + 6), P(bx + (ax - bx) * 0.2, by + 30), r * 0.55 * k), "pink", { t, parent: gi, w: "hair", tone: 1 }); });
  const SL = o.sleeveLen || 640; DS.shape(S, `M${X(-72)} ${Y(-8)} L${X(72)} ${Y(-8)} L${X(80)} ${Y(SL)} L${X(-80)} ${Y(SL)} Z`, o.sleeve || "navy", { t, parent: gi, w: "mid" });
  DS.shape(S, rect(Math.min(X(-74), X(74)), Y(-14), 148 * k, 30 * k), o.sleeve || "navy", { t, parent: gi, w: "mid", tone: 2 });
  const a = (ang * Math.PI) / 180, tip = (d) => [wx + Math.sin(a) * d * k, wy - Math.cos(a) * d * k];
  return { g, gi, tip: tip(262), palm: tip(84) };
};

// ---------- the brain, a friendly cartoon character ----------
// (cx, cy) = middle of the brain; legs end at cy + 190k. o: { mood: smile|happy|flat|wow|worried|sleep|determined, look (-1..1), arms: rest|shrug|wave|point|pointL|hold|none, legs, t, parent }
const BR_ARMS = { rest: [[-178, 64], [-190, 112]], shrug: [[-196, 6], [-232, -58]], wave: [[-178, 64], [-190, 112]], point: [[-178, 64], [-190, 112]], pointL: [[-214, -6], [-286, -28]], hold: [[-176, 70], [-128, 100]], none: null };
const BR_ARMR = { rest: [[178, 64], [190, 112]], shrug: [[196, 6], [232, -58]], wave: [[204, -14], [222, -96]], point: [[214, -6], [286, -28]], pointL: [[178, 64], [190, 112]], hold: [[176, 70], [128, 100]], none: null };
const brainC = (S, cx, cy, k, o = {}) => {
  const g = S.grp(o.parent), t = o.t, ink = DS.c("ink"), B = { g, cx, cy, k };
  const X = (v) => cx + v * k, Y = (v) => cy + v * k;
  if (o.legs !== false) [-1, 1].forEach((sd) => S.draw(`M${X(sd * 42)} ${Y(96)} L${X(sd * 52)} ${Y(188)} L${X(sd * 82)} ${Y(188)}`, t ?? S.start, 0, { c: ink, w: DS.w.near, parent: g }));
  const armG = (pose, tt) => { const ag = S.grp(g); [[-1, BR_ARMS[pose]], [1, BR_ARMR[pose]]].forEach(([sd, A]) => { if (!A) return; const r0 = [X(sd * 138), Y(30)]; S.draw(smooth([r0, [X(A[0][0]), Y(A[0][1])], [X(A[1][0]), Y(A[1][1])]]), tt ?? S.start, 0, { c: ink, w: DS.w.near, parent: ag }); DS.shape(S, circ(X(A[1][0]), Y(A[1][1]), 15 * k), "white", { t: tt, parent: ag, w: "mid" }); }); return ag; };
  let arms = armG(o.arms || "rest", t);
  B.arms = (tt, pose) => { tl.set(arms, { opacity: 0 }, tt); arms = armG(pose, tt); return B; };
  B.hand = (side = "R", pose = o.arms || "rest") => { const A = (side === "R" ? BR_ARMR : BR_ARMS)[pose]; return [X(A[1][0]), Y(A[1][1])]; };
  const pts = []; for (let i = 0; i < 30; i++) { const a = (i / 30) * Math.PI * 2, q = 1 + 0.055 * Math.cos(a * 10); pts.push([X(Math.cos(a) * 150 * q), Y(Math.sin(a) * 112 * q * (Math.sin(a) > 0 ? 0.92 : 1))]); }
  DS.shape(S, smooth([...pts, pts[0]]) + " Z", "pink", { t, parent: g, w: "near" });
  const fold = (p) => S.draw(smooth(p.map(([a, b]) => [X(a), Y(b)])), t ?? S.start, 0, { c: DS.c("pink", 2), w: DS.w.mid, parent: g });
  fold([[0, -108], [8, -82], [-6, -58], [4, -40]]);
  [-1, 1].forEach((sd) => { fold([[sd * 124, -34], [sd * 100, -72], [sd * 72, -46], [sd * 48, -88]]); fold([[sd * 136, 26], [sd * 112, 8], [sd * 100, 46], [sd * 118, 74]]); fold([[sd * 74, -96], [sd * 52, -72]]); });
  let fg = null;
  B.face = (tt, mood = "smile", look = 0) => {
    if (fg) tl.set(fg, { opacity: 0 }, tt);
    fg = S.grp(g); const big = mood === "wow" ? 1.15 : 1;
    [-1, 1].forEach((sd) => {
      const ex = X(sd * 42), ey = Y(-8), er = 27 * k * big;
      if (mood === "sleep") return S.draw(smooth(arcPts(ex, ey, er * 0.8, 20, 160, 8)), tt ?? S.start, 0, { c: ink, w: DS.w.mid, parent: fg });
      DS.shape(S, circ(ex, ey, er), "white", { t: tt, parent: fg, w: "mid" });
      const px = ex + look * er * 0.45, py = ey + (mood === "worried" ? 3 : 2) * k;
      S.fill(circ(px, py, 12 * k * big), tt ?? S.start, 0, ink, 1, fg); S.fill(circ(px - 4 * k, py - 4 * k, 4 * k), tt ?? S.start, 0, DS.P.white[0], 1, fg);
      const bw = mood === "worried" ? [-50, -40] : mood === "determined" ? [-36, -48] : mood === "wow" ? [-52, -52] : null;
      if (bw) S.draw(line([X(sd * 22), Y(bw[0])], [X(sd * 60), Y(bw[1])], 0), tt ?? S.start, 0, { c: ink, w: DS.w.mid, parent: fg });
    });
    if (mood === "happy" || mood === "smile") [-1, 1].forEach((sd) => S.fill(circ(X(sd * 82), Y(30), 18 * k, 10 * k), tt ?? S.start, 0, DS.c("pink", 2), 0.55, fg));
    const M = { smile: [[-30, 40], [0, 58], [30, 40]], flat: [[-24, 50], [24, 48]], worried: [[-30, 52], [-10, 44], [10, 52], [30, 44]], determined: [[-24, 48], [24, 46]], sleep: [[-12, 50], [12, 50]] }[mood];
    if (mood === "happy") DS.shape(S, `M${X(-34)} ${Y(38)} Q${X(0)} ${Y(46)} ${X(34)} ${Y(38)} Q${X(28)} ${Y(78)} ${X(0)} ${Y(80)} Q${X(-28)} ${Y(78)} ${X(-34)} ${Y(38)} Z`, "red", { t: tt, parent: fg, w: "mid", tone: 2 });
    else if (mood === "wow") DS.shape(S, circ(X(0), Y(54), 13 * k, 17 * k), "red", { t: tt, parent: fg, w: "mid", tone: 2 });
    else S.draw(smooth(M.map(([a, b]) => [X(a), Y(b)])), tt ?? S.start, 0, { c: ink, w: DS.w.mid, parent: fg });
    return B;
  };
  B.face(t, o.mood || "smile", o.look || 0);
  if (!o.float) DS.shadow(S, cx, Y(190), 220 * k, { t, parent: g });
  return B;
};

// ---------- feather, machine, delay box ----------
// feather from base a to tip b: quill + soft vane + a few barbs
const feather = (S, a, b, o = {}) => {
  const g = S.grp(o.parent), t = o.t, dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux, W = o.vw || L * 0.17;
  const at = (f, side) => { const w = W * Math.pow(Math.sin(Math.PI * Math.min(1, (f - 0.18) / 0.84)), 0.7) * side; return [a[0] + ux * L * f + nx * w, a[1] + uy * L * f + ny * w]; };
  const fs = [0.18, 0.3, 0.45, 0.6, 0.75, 0.88, 0.97, 1.0], top = fs.map((f) => at(f, 1)), bot = fs.map((f) => at(f, -1)).reverse();
  DS.shape(S, smooth([...top, ...bot]) + " Z", o.name || "white", { t, parent: g, w: "mid" });
  [0.34, 0.5, 0.66, 0.8].forEach((f) => [-1, 1].forEach((sd) => { const p = [a[0] + ux * L * f, a[1] + uy * L * f], q = at(f + 0.07, sd * 0.8); S.draw(line(p, q, 0), t ?? S.start, 0, { c: DS.c(o.name || "white", 2), w: DS.w.hair, parent: g }); }));
  S.draw(line(a, [a[0] + ux * L * 0.97, a[1] + uy * L * 0.97], 0), t ?? S.start, 0, { c: DS.c("gray", 2), w: DS.w.detail, parent: g });
  return g;
};
// the red delay box (dial + reading). (x, y) = top-left, k = scale
const dbox = (S, x, y, k, o = {}) => {
  const g = S.grp(o.parent), t = o.t, w = 250 * k, h = 130 * k;
  DS.shadow(S, x + w / 2, y + h, w + 20, { t, parent: g });
  DS.shape(S, rrect(x, y, w, h, DS.r.sm), "red", { t, parent: g });
  const dx = x + 58 * k, dy = y + 66 * k, r = 38 * k;
  DS.shape(S, circ(dx, dy, r), "white", { t, parent: g, w: "detail" });
  [-60, -20, 20, 60].forEach((a) => { const q = (a * Math.PI) / 180; S.draw(line([dx + Math.sin(q) * r * 0.7, dy - Math.cos(q) * r * 0.7], [dx + Math.sin(q) * r * 0.92, dy - Math.cos(q) * r * 0.92], 0), t ?? S.start, 0, { c: DS.c("ink"), w: DS.w.hair, parent: g }); });
  const nd = S.grp(g); S.draw(line([dx, dy], [dx, dy - r * 0.78], 0), t ?? S.start, 0, { c: DS.c("red", 2), w: DS.w.mid, parent: nd }); nd.setAttribute("transform", `rotate(${o.ang ?? -20} ${dx} ${dy})`);
  S.fill(circ(dx, dy, 6 * k), t ?? S.start, 0, DS.c("ink"), 1, g);
  DS.shape(S, rrect(x + 106 * k, y + 38 * k, 130 * k, 56 * k, DS.r.xs), "white", { t, parent: g, w: "detail", flat: true });
  if (k >= 1) S.text(o.read || "0.2 s", x + 171 * k, y + 79 * k, { size: DS.type.caption, t, c: DS.c("ink"), parent: g });
  else S.fill(rect(x + 120 * k, y + 60 * k, 100 * k, 12 * k), t ?? S.start, 0, DS.c("ink"), 1, g);
  return { g, nd, dial: [dx, dy, r] };
};
// Dave's tickle machine, built to the left of Dave standing at (cx, gy) with s 1.1 (feather tip on his ribs, lever by his left hand).
// o: { at: {feather, stick, string, lever} fade-in times, box: t (delay box joins the string), boxFade: t, pull: t, wiggle: [t, dur] }
const MACH = (cx, gy) => ({ P: [cx - 560, gy - 520], E: [cx - 196, gy - 246], R: [cx - 38, gy - 210], L0: [cx - 232, gy - 44], K: [cx - 112, gy - 180], Ls: [cx - 200, gy - 80], Ss: [cx - 384, gy - 378], B: [cx - 510, gy - 254] });
const machine = (S, cx, gy, o = {}) => {
  const M = MACH(cx, gy), at = o.at || {}, ink = DS.c("ink");
  // base board + post
  DS.shadow(S, cx - 420, gy, 520, { t: at.stick });
  DS.shape(S, rrect(cx - 680, gy - 40, 520, 40, DS.r.xs), "wood", { t: at.stick });
  DS.shape(S, rect(M.P[0] - 14, M.P[1], 28, gy - 40 - M.P[1]), "wood", { t: at.stick, dir: "h" });
  // lever on a small block
  const lv = S.grp(); DS.shape(S, rrect(M.L0[0] - 30, gy - 64, 60, 30, DS.r.xs), "gray", { t: at.lever, tone: 2, w: "mid" });
  DS.shape(S, capsule(M.L0, M.K, 9), "gray", { t: at.lever, parent: lv, w: "mid" }); DS.shape(S, circ(M.K[0], M.K[1], 20), "red", { t: at.lever, parent: lv, w: "mid" });
  S.fill(circ(M.L0[0], M.L0[1], 8), at.lever ?? S.start, 0, ink, 1);
  // string (straight, or through the delay box)
  const str1 = S.draw(line(M.Ls, M.Ss, 0), at.string ?? S.start, 0, { c: DS.c("brown", 2), w: DS.w.detail });
  let box = null;
  if (o.box !== undefined) {
    S.hide(str1, o.box === true ? S.start : o.box);
    const bt = o.box === true ? undefined : o.box, bx = M.B[0], by = M.B[1];
    box = dbox(S, bx, by, 1, { t: bt });
    [[M.Ls, [bx + 250, by + 70]], [[M.Ss[0], by], M.Ss]].forEach(([p, q]) => S.draw(line(p, q, 0), bt ?? S.start, 0, { c: DS.c("brown", 2), w: DS.w.detail }));
    if (o.boxFade !== undefined) tl.to(box.g, { opacity: 0.25, duration: o.boxFadeDur || 2.4, ease: "power1.inOut" }, o.boxFade);
  }
  // stick + feather (front plane)
  const fg = S.grp(); DS.shape(S, capsule([M.P[0] - 40, M.P[1] - 26], M.E, 9), "wood", { t: at.stick, w: "mid" }); S.fill(circ(M.P[0], M.P[1], 9), at.stick ?? S.start, 0, ink, 1);
  feather(S, M.E, M.R, { t: at.feather, parent: fg, vw: 30 });
  if (o.pull !== undefined) { spin(lv, o.pull, 0.35, 0, 16, M.L0[0], M.L0[1]); wob(fg, o.pull + 0.2, (o.wiggle || 1.2), 7, M.E[0], M.E[1]); }
  return { M, box, lv, fg, pulled: [M.L0[0] + 152, M.L0[1] - 96] };
};
// Dave next to his machine: left hand on the lever knob (and on the pulled knob after o.pull)
const daveAtMachine = (S, cx, gy, o = {}) => {
  const M = MACH(cx, gy), F = dave(S, cx, gy, "near", Object.assign({ armL: armAt(cx, gy, 1.1, "L", M.K[0], M.K[1], -1), mood: o.mood || "determined", look: o.look ?? -4 }, o.fig || {}));
  if (o.pull !== undefined) F.setPose(o.pull, null, [armAt(cx, gy, 1.1, "L", M.K[0] + 36, M.K[1] + 40, -1), POSES.stand[1]]);
  return F;
};

// ---------- animals ----------
// rat (side view, facing o.dir = -1 left / 1 right)
const rat = (S, cx, gy, k, o = {}) => { const t = o.t, g = S.grp(o.parent), d = o.dir || 1;
  if (!o.float) DS.shadow(S, cx, gy, 170 * k, { t, parent: g });
  S.draw(smooth([[cx - d * 70 * k, gy - 30 * k], [cx - d * 130 * k, gy - 10 * k], [cx - d * 180 * k, gy - 40 * k]]), t ?? S.start, 0, { c: DS.c("pink", 2), w: DS.w.mid, parent: g });
  DS.shape(S, `M${cx - d * 80 * k} ${gy} Q${cx - d * 90 * k} ${gy - 100 * k} ${cx} ${gy - 96 * k} Q${cx + d * 70 * k} ${gy - 90 * k} ${cx + d * 104 * k} ${gy - 30 * k} Q${cx + d * 80 * k} ${gy} ${cx} ${gy} Z`, o.name || "gray", { t, parent: g, w: "mid", tone: 1 });
  DS.shape(S, circ(cx + d * 30 * k, gy - 96 * k, 22 * k), "pink", { t, parent: g, w: "detail" });
  S.fill(circ(cx + d * 66 * k, gy - 60 * k, 6.5 * k), t ?? S.start, 0, DS.c("ink"), 1, g);
  S.fill(circ(cx + d * 104 * k, gy - 32 * k, 7 * k), t ?? S.start, 0, DS.c("pink", 2), 1, g);
  [-6, 6].forEach((dy) => S.draw(line([cx + d * 96 * k, gy - 30 * k + dy * k * 0.6], [cx + d * 132 * k, gy - 34 * k + dy * k * 1.6], 0), t ?? S.start, 0, { c: DS.c("gray", 2), w: DS.w.hair, parent: g }));
  [[-40, 0], [40, 0]].forEach(([dx]) => S.draw(line([cx + dx * k, gy - 6 * k], [cx + dx * k + d * 8 * k, gy], 0), t ?? S.start, 0, { c: DS.c("pink", 2), w: DS.w.detail, parent: g }));
  return { g, head: [cx + d * 70 * k, gy - 70 * k], back: [cx - d * 10 * k, gy - 96 * k] }; };
// little chirp marks: three short arcs near a rat's head, opening toward dir
const chirp = (S, x, y, t, dir = 1, k = 1) => waves(S, x, y, 3, t, { dir, k: 0.55 * k, w: DS.w.detail, stag: 0.08, c: DS.c("ink") });

// a hand whose middle fingertip lands on (tx, ty)
const handTo = (S, tx, ty, ang, k, o = {}) => { const a = (ang * Math.PI) / 180; return hand2(S, tx - Math.sin(a) * (o.reach || 262) * k, ty + Math.cos(a) * (o.reach || 262) * k, ang, k, o); };
const dash = (p, a, b) => { p.removeAttribute("pathLength"); p.setAttribute("stroke-dasharray", `${a} ${b}`); return p; };
// speech bubble: rounded box + tail to (tx, ty); strs = lines
const bub = (S, cx, cy, w, h, tx, ty, strs, t, o = {}) => {
  w = Math.max(w, Math.max(...strs.map((q) => q.length)) * (o.size || DS.type.small) * 0.5 + 100); cx = Math.max(96 + w / 2, Math.min(1824 - w / 2, cx));
  const g = S.grp(), size = o.size || DS.type.small, n = strs.length, x0 = cx - w / 2, y0 = cy - h / 2, below = ty > cy + h / 2;
  const bx = Math.max(x0 + 60, Math.min(x0 + w - 60, cx + (tx - cx) * 0.5)), by = below ? y0 + h - 6 : y0 + 6;
  DS.drop(S, rrect(x0 + 6, y0 + 10, w, h, DS.r.lg), { t, parent: g });
  DS.shape(S, rrect(x0, y0, w, h, DS.r.lg), "white", { t, flat: true, w: "mid", parent: g });
  S.draw(`M${bx - 30} ${by} L${tx} ${ty} L${bx + 30} ${by}`, t ?? S.start, 0, { c: DS.c("ink"), w: DS.w.mid, fill: DS.P.white[0], parent: g });
  strs.forEach((s, i) => S.text(s, cx, cy + size * 0.36 + (i - (n - 1) / 2) * size * 1.2, { size, t: (o.ts || [])[i] ?? t, c: o.c ? DS.c(o.c, 2) : DS.c("ink"), parent: g }));
  return g;
};
// thought bubble with the little brain inside (the brain's verdicts)
const brainThink = (S, cx, cy, tx, ty, t, o = {}) => { S.thought(cx, cy, o.rx || 190, o.ry || 150, tx, ty, t, 0.3); return brainC(S, cx, cy + (o.dy ?? 4), o.k || 0.62, Object.assign({ legs: false, float: true, t }, o)); };
// two fingers out at a figure's hand (the sister's weapon), pointing toward dir
const twoF = (S, F, side, t, dir = -1) => { const [x, y] = F.hand(side), g = S.grp(F.g); [[-6, -16], [6, -2]].forEach(([d0, d1]) => DS.shape(S, capsule([x, y + d0 * 0.4], [x + dir * 38, y + d1], 7), "white", { t, parent: g, w: "detail" })); DS.shape(S, circ(x, y, 13), "white", { t, parent: g, w: "detail" }); return g; };
// tile: white panel with an icon area and a caption under it
const tile = (S, cx, cy, w, h, title, t, fn) => { panel(S, cx, cy, w, h, t); S.text(title, cx, cy + h / 2 - 34, { size: DS.type.caption, t, c: DS.c("ink") }); if (fn) fn(cx, cy - 34); };
const column = (S, x, gy, h, layer = "mid") => {
  DS.shadow(S, x, gy, 150); DS.shape(S, rect(x - 46, gy - h + 40, 92, h - 70), "white", { layer, dir: "h" });
  [-24, 0, 24].forEach((dx) => S.draw(line([x + dx, gy - h + 50], [x + dx, gy - 40], 0), S.start, 0, { c: DS.c("white", 2, layer), w: DS.w.detail }));
  DS.shape(S, rrect(x - 66, gy - h, 132, 44, DS.r.xs), "white", { layer, tone: 2 }); DS.shape(S, rect(x - 62, gy - 34, 124, 34), "white", { layer, tone: 2 });
};
const scrollP = (S, cx, cy, w, h, o = {}) => { const t = o.t;
  DS.drop(S, rect(cx - w / 2 + 8, cy - h / 2 + 12, w, h), { t });
  DS.shape(S, rect(cx - w / 2, cy - h / 2, w, h), "sand", { t, tone: 1, flat: true, w: "detail" });
  [-1, 1].forEach((sd) => DS.shape(S, rrect(cx + sd * w / 2 - 24, cy - h / 2 - 30, 48, h + 60, DS.r.sm), "wood", { t }));
  for (let i = 0; i < (o.lines || 6); i++) S.draw(line([cx - w / 2 + 50, cy - h / 2 + 50 + i * ((h - 90) / ((o.lines || 6) - 1))], [cx + w / 2 - 50 - (i % 3) * 40, cy - h / 2 + 50 + i * ((h - 90) / ((o.lines || 6) - 1))], 0), t ?? S.start, 0, { c: DS.c("earth", 2), w: DS.w.detail });
};
// stopwatch; the red hand sweeps o.turn degrees from o.go over o.dur
const stopwatch = (S, cx, cy, r, o = {}) => { const t = o.t;
  DS.shape(S, rrect(cx - 22, cy - r - 52, 44, 40, DS.r.xs), "gray", { t, tone: 2, w: "detail" });
  DS.shape(S, circ(cx, cy, r), "white", { t });
  S.draw(rays(cx, cy, r * 0.8, r * 0.92, 20, -Math.PI / 2), t ?? S.start, 0, { c: DS.c("ink"), w: DS.w.detail });
  if (o.wedge) { const wg = S.grp(); S.fill(`M${cx} ${cy} L${cx} ${cy - r * 0.78} A${r * 0.78} ${r * 0.78} 0 0 1 ${cx + Math.sin((o.wedge * Math.PI) / 180) * r * 0.78} ${cy - Math.cos((o.wedge * Math.PI) / 180) * r * 0.78} Z`, o.wedgeT ?? t ?? S.start, 0, DS.c("red", 1), 0.6, wg); }
  const hand = S.grp(); S.draw(line([cx, cy], [cx, cy - r * 0.78], 0), t ?? S.start, 0, { c: DS.c("red", 2), w: DS.w.near, parent: hand });
  spin(hand, o.go ?? S.start, o.dur || 1, 0, o.turn ?? 72, cx, cy, "power1.inOut");
  DS.shape(S, circ(cx, cy, 12), "ink", { t, w: "hair" });
};
const calendar = (S, x, y, w, h, o = {}) => {
  DS.drop(S, rect(x + 6, y + 8, w, h)); DS.shape(S, rect(x, y, w, h), "white", { flat: true, w: "detail" }); DS.shape(S, rect(x, y, w, 56), "red", { flat: true, tone: 2, w: "detail" });
  S.text(o.title || "EVERY NIGHT", x + w / 2, y + 42, { size: DS.type.caption, c: DS.P.white[0] });
  const C = []; for (let i = 0; i < 3; i++) for (let j = 0; j < 5; j++) { const cw = (w - 40) / 5, ch = (h - 96) / 3, px = x + 20 + j * cw, py = y + 76 + i * ch; DS.shape(S, rect(px, py, cw - 10, ch - 10), "paper", { flat: true, w: "hair" }); C.push([px + (cw - 10) / 2, py + (ch - 10) / 2]); }
  return C;
};
const bed = (S, x0, x1, gy) => {
  DS.shadow(S, (x0 + x1) / 2, gy, x1 - x0 + 60);
  const top = gy - 170;
  DS.shape(S, rrect(x1 - 56, gy - 420, 64, 420, DS.r.sm), "wood");
  DS.shape(S, rect(x0 + 10, gy - 120, x1 - x0 - 40, 70), "wood", { tone: 2 });
  [x0 + 30, x1 - 80].forEach((lx) => DS.shape(S, rect(lx, gy - 54, 26, 54), "wood", { w: "mid" }));
  DS.shape(S, rrect(x0 + 6, top, x1 - x0 - 56, 74, DS.r.md), "sky");
  DS.shape(S, rrect(x1 - 230, top - 64, 170, 74, DS.r.lg), "white");
  DS.shape(S, rrect(x0 - 14, gy - 250, 46, 250, DS.r.sm), "wood");
  return top;
};
const bedKit = (S, o = {}) => { nightWin(S, o.win || 1400, 170, 220, 200); if (o.bed !== false) bed(S, o.bx || 260, (o.bx || 260) + 520, GN); };
// a bare foot, sole toward us, toes up; (cx, cy) = middle of the sole
const sole = (S, cx, cy, k, o = {}) => { const t = o.t, g = S.grp(o.parent);
  DS.shape(S, `M${cx - 70 * k} ${cy - 120 * k} Q${cx - 98 * k} ${cy + 40 * k} ${cx - 52 * k} ${cy + 172 * k} Q${cx} ${cy + 214 * k} ${cx + 48 * k} ${cy + 172 * k} Q${cx + 76 * k} ${cy + 40 * k} ${cx + 80 * k} ${cy - 112 * k} Q${cx + 10 * k} ${cy - 172 * k} ${cx - 70 * k} ${cy - 120 * k} Z`, "white", { t, parent: g });
  [[-62, -150, 24], [-24, -178, 21], [10, -182, 19], [42, -172, 17], [68, -150, 15]].forEach(([dx, dy, r]) => DS.shape(S, circ(cx + dx * k, cy + dy * k, r * k), "white", { t, parent: g, w: "mid" }));
  S.draw(smooth([[cx - 40 * k, cy - 40 * k], [cx - 20 * k, cy + 30 * k], [cx - 30 * k, cy + 110 * k]]), t ?? S.start, 0, { c: DS.c("gray", 1), w: DS.w.detail, parent: g });
  return g; };
// a bare foot from the side (toes to the right), heel on (x, gy); a bit of leg above
const footSide = (S, x, gy, k, o = {}) => { const t = o.t, X = (v) => x + v * k, Y = (v) => gy + v * k, g = S.grp(o.parent);
  DS.shape(S, `M${X(-60)} ${Y(-330)} L${X(40)} ${Y(-330)} L${X(46)} ${Y(-120)} Q${X(110)} ${Y(-100)} ${X(190)} ${Y(-58)} Q${X(250)} ${Y(-40)} ${X(258)} ${Y(-14)} Q${X(256)} ${Y(4)} ${X(220)} ${Y(4)} L${X(-30)} ${Y(4)} Q${X(-74)} ${Y(0)} ${X(-72)} ${Y(-50)} Z`, "white", { t, parent: g });
  [[214, -34, 15], [184, -40, 12], [158, -44, 10], [134, -46, 9]].forEach(([dx, dy, r]) => S.draw(smooth(arcPts(X(dx), Y(dy), r * k, 200, 340, 6)), t ?? S.start, 0, { c: DS.c("gray", 2), w: DS.w.detail, parent: g }));
  S.draw(smooth([[X(-30), Y(-60)], [X(0), Y(-90)], [X(10), Y(-130)]]), t ?? S.start, 0, { c: DS.c("gray", 1), w: DS.w.detail, parent: g });
  [[236, -30, 13], [204, -40, 10], [176, -46, 8]].forEach(([dx, dy, r]) => DS.shape(S, circ(X(dx), Y(dy), r * k, r * 0.7 * k), "pink", { t, parent: g, w: "hair", tone: 1 }));
  return g; };
// simple chair facing right; returns the seat top
const seat = (S, cx, top, o = {}) => { DS.shadow(S, cx, GN, 240); [cx - 66, cx + 76].forEach((lx) => DS.shape(S, rect(lx - 9, top + 22, 18, GN - top - 22), o.name || "wood", { w: "mid", tone: 2 })); DS.shape(S, rrect(cx - 90, top - 240, 28, 262, DS.r.xs), o.name || "wood"); DS.shape(S, rrect(cx - 96, top, 196, 28, DS.r.xs), o.name || "wood"); return top; };
const seated = (S, cx, top, fn, o = {}) => (fn || who)(S, cx, top + 12, "near", Object.assign({ sit: true, gs: GN, pose: "hold" }, o));
const desk = (S, x, gy, w) => { DS.shadow(S, x + w / 2, gy, w); DS.shape(S, rrect(x, gy - 230, w, 40, DS.r.xs), "wood"); [x + 30, x + w - 50].forEach((lx) => DS.shape(S, rect(lx, gy - 190, 20, 190), "wood", { w: "mid" })); return gy - 230; };
const table = (S, x0, x1, top, o = {}) => { DS.shadow(S, (x0 + x1) / 2, GN, x1 - x0 + 60); [x0 + 30, x1 - 54].forEach((lx) => DS.shape(S, rect(lx, top + 26, 24, GN - top - 26), "wood", { w: "mid", tone: 2 })); DS.shape(S, rrect(x0, top, x1 - x0, 30, DS.r.xs), "wood"); return top; };
const paperR = (S, x, y, w, h, o = {}) => { DS.drop(S, rect(x + 6, y + 8, w, h), { t: o.t }); DS.shape(S, rect(x, y, w, h), "white", { t: o.t, w: "detail", flat: true }); };
const lines = (S, x, y, w, n, t, gap = 36) => { for (let i = 0; i < n; i++) S.draw(line([x, y + i * gap], [x + (i === n - 1 ? w * 0.6 : w), y + i * gap], 0), t ?? S.start, 0, { c: DS.c("gray", 1), w: DS.w.detail }); };
// family photo frame with two little heads
const famPhoto = (S, x, y, w, h, kids) => { DS.frame(S, x, y, w, h, "sky"); (kids || [[0.36, "side", "blue"], [0.64, "bun", "orange"]]).forEach(([f, hair, oc]) => { const F = S.fig(x + w * f, y + h - 6, { s: (h - 30) / 330, hair, hairC: DS.c("brown"), outfit: "tee", outfitC: DS.c(oc, 0, "mid"), breathe: false, w: DS.w.detail, parent: S.grp() }); F.instant(S.start - 0.65); F.face(S.start, "smile", 0); }); };

// ---------- lab kit ----------
// the MRI scanner: housing, bore, bed with two feet sticking out
const scanner = (S, cx, gy, o = {}) => { const t = o.t;
  DS.shadow(S, cx + 100, gy, 820, { t });
  DS.shape(S, rrect(cx - 250, gy - 600, 500, 600, DS.r.lg), "white", { t });
  DS.shape(S, circ(cx, gy - 320, 176), "gray", { t, tone: 1 }); DS.shape(S, circ(cx, gy - 320, 140), "navy", { t, flat: true });
  DS.shape(S, rrect(cx - 40, gy - 270, 560, 36, DS.r.sm), "gray", { t, tone: 1 });
  DS.shape(S, rect(cx + 430, gy - 236, 40, 236), "gray", { t, tone: 2, w: "mid" });
  [[0, 0], [34, 6]].forEach(([dx, dy]) => DS.shape(S, rrect(cx + 186 + dx, gy - 352 + dy, 30, 86, DS.r.md), "white", { t, w: "mid" }));
};
// generic desk robot arm (the 1999 robots, the toy hand): base on a top, two links, a foam pad at the tip. Returns the tip
const robot = (S, x, top, k, o = {}) => { const t = o.t, d = o.dir || 1, g = S.grp(o.parent), P = (a, b) => [x + a * d * k, top + b * k];
  DS.shape(S, rrect(x - 70 * k, top - 34 * k, 140 * k, 34 * k, DS.r.sm), "gray", { t, tone: 2, parent: g });
  DS.shape(S, capsule(P(0, -30), P(0, -170), 18 * k), "gray", { t, parent: g });
  DS.shape(S, capsule(P(0, -170), P(150, -250), 15 * k), "gray", { t, parent: g, tone: 1 });
  DS.shape(S, capsule(P(150, -250), P(o.reachX || 250, o.reachY || -120), 12 * k), "gray", { t, parent: g, tone: 1 });
  [P(0, -170), P(150, -250)].forEach(([a, b]) => DS.shape(S, circ(a, b, 22 * k), "gray", { t, tone: 2, parent: g, w: "mid" }));
  const tip = P(o.reachX || 250, o.reachY || -120);
  if (o.foam !== false) DS.shape(S, rrect(tip[0] - 26 * k, tip[1] - 6 * k, 52 * k, 34 * k, DS.r.sm), "yellow", { t, parent: g, w: "mid" });
  return { g, tip: [tip[0], tip[1] + 28 * k] };
};
// side view of a brain (front to the left): cerebrum, cerebellum, stem; returns spots
const brainSide = (S, cx, cy, k, o = {}) => { const t = o.t, X = (v) => cx + v * k, Y = (v) => cy + v * k;
  DS.shape(S, capsule([X(70), Y(100)], [X(96), Y(250)], 26 * k), "pink", { t, tone: 2 });
  DS.shape(S, circ(X(150), Y(120), 96 * k, 58 * k), "pink", { t, tone: 1 });
  for (let i = 0; i < 4; i++) S.draw(smooth(arcPts(X(150), Y(120), (78 - i * 18) * k, 200, 340, 8, (46 - i * 10) * k)), t ?? S.start, 0, { c: DS.c("pink", 2), w: DS.w.detail });
  const P = [[-250, 30], [-236, -70], [-160, -160], [-40, -196], [90, -180], [200, -110], [246, -10], [210, 70], [110, 84], [30, 100], [-70, 140], [-170, 120], [-236, 84]].map(([a, b]) => [X(a), Y(b)]);
  DS.shape(S, smooth([...P, P[0]]) + " Z", "pink", { t });
  [[[-200, -40], [-150, -90], [-110, -40], [-70, -110]], [[-30, -40], [10, -90], [60, -40], [110, -110]], [[130, -30], [170, 20], [210, -20]], [[-190, 60], [-120, 40], [-60, 80], [0, 50]], [[30, -140], [60, -100]]].forEach((p) => S.draw(smooth(p.map(([a, b]) => [X(a), Y(b)])), t ?? S.start, 0, { c: DS.c("pink", 2), w: DS.w.mid }));
  return { touch: [X(-10), Y(-120)], cereb: [X(150), Y(120)] };
};
// a glowing "busy" patch that dims on cue (activity going quieter); shape d
const busy = (S, d, t, quietAt) => { const p = S.fill(d, t ?? S.start, 0, DS.glow(DS.c("orange"), 0.95), 1); if (quietAt !== undefined) tl.to(p, { opacity: 0.18, duration: 0.9, ease: "power1.inOut" }, quietAt); return p; };
// the runner diagram: FELT = TOUCH − PREDICTION, bars on a white board. o: { touch, pred, felt (0..1), ts {touch, pred, felt}, feltTxt, minus: false (gone), minusOut: t }
const eqn = (S, cx, cy, o = {}) => { const ts = o.ts || {}, B = cy + 150, H = 250;
  panel(S, cx, cy + 40, 1340, 560, o.t);
  const col = (dx, name, label, v, tt, vt) => { const x = cx + dx; S.draw(line([x - 110, B], [x + 110, B], 0), tt ?? S.start, 0, { c: DS.c("ink"), w: DS.w.mid }); if (v > 0.001) bar(S, x, B, 150, v * H, name, tt, null, { dur: o.dur }); S.text(label, x, B + 70, { size: DS.type.small, t: tt, c: DS.c("ink") }); if (vt) S.text(vt, x, B - Math.max(v, 0.02) * H - 34, { size: DS.type.body, t: tt, c: DS.c("red", 2) }); };
  col(-450, "navy", "TOUCH", o.touch ?? 1, ts.touch);
  col(0, "purple", "PREDICTION", o.pred ?? 1, ts.pred, o.predTxt);
  col(450, "red", "FELT", o.felt ?? 0, ts.felt, o.feltTxt);
  if (o.minus === false) dash(S.draw(rrect(cx - 268, B - 190, 76, 76, DS.r.sm), ts.pred ?? S.start, 0, { c: DS.c("gray", 2), w: DS.w.mid }), 14, 12);
  else { const m = S.text("−", cx - 230, B - 120, { size: DS.type.display, t: ts.pred, c: DS.c("ink") }); if (o.minusOut !== undefined) { tl.to(m, { opacity: 0, y: 60, duration: 0.6, ease: "power2.in" }, o.minusOut); } }
  S.text("=", cx + 225, B - 120, { size: DS.type.display, t: ts.felt, c: DS.c("ink") });
};

// ---------- sets ----------
const ROOM = { home: { wall: "wall", floor: "wood", window: [1420, 260, 200, 170] }, night: { wall: "night", floor: "wood", window: false }, lab: { wall: "glass", floor: "gray", window: false },
  board: { wall: "paper", floor: "wood", window: false, back: [170, 56, 1750, 830] }, hall: { wall: "sand", floor: "earth", window: false }, quiet: { wall: "navy", floor: "wood", window: false }, close: { wall: "wall", floor: "wood", window: false, back: [-100, -100, 2020, 1000] } };
const GN = 960;
const nightWin = (S, x, y, w, h) => {
  DS.shape(S, rrect(x - 14, y - 14, w + 28, h + 28, DS.r.xs), "white", { w: "detail" });
  DS.shape(S, rect(x, y, w, h), "night", { flat: true, tone: 2, w: "hair" });
  S.fill(circ(x + w * 0.7, y + h * 0.3, 22), S.start, 0, DS.c("yellow", 1), 1);
  [[0.2, 0.2], [0.35, 0.62], [0.15, 0.8], [0.5, 0.14], [0.82, 0.72]].forEach(([a, b]) => S.fill(circ(x + w * a, y + h * b, 4), S.start, 0, DS.P.white[0], 0.85));
  S.draw(`M${x + w / 2} ${y} V${y + h} M${x} ${y + h / 2} H${x + w}`, S.start, 0, { c: DS.P.white[0], w: DS.w.mid });
};
const homeKit = (S) => { famPhoto(S, 560, 250, 180, 140); DS.frame(S, 800, 280, 120, 100, "grass"); };

