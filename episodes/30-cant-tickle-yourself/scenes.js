// look: still
// Why You Can't Tickle Yourself (~8:39). Mission: Dave, the most ticklish man in his family, wants to tickle himself every night until he's immune to his sister; his own brain sees him coming.
// Runner object: Dave's tickle machine: a feather (night one) -> feather on a stick + string + lever (the copy) -> + red delay box, dial on 0.2 s (the robot) -> the box fading after 50 strokes (Stockholm) -> bare fingers on the palm (landing).
// Runner diagram: FELT = TOUCH - PREDICTION (about zero for a self-tickle, a leftover at 0.2 s, half on a push, the minus sign missing, zero again on the palm).
// Runner phrase: the brain, a friendly cartoon character, says "Relax, it's just Dave." -> "Relax, it's just you."
// Clips 140-150 (hearing voices): no jokes, no Dave, abstract only (dots, sound waves, a quiet room, a question mark).
// Real people (Aristotle, Darwin, Panksepp, Burgdorf, Harris, Blakemore, Kilteni, Ehrsson, Shergill, Houde) are name cards on generic figures, never likenesses.

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

const CUES = [[1, 0], [3, 0], [4, 0], [5, 0], [7, 0], [9, 0], [11, 0], [12, 0], [14, 0], [16, 0], [17, 0], [19, 0], [20, 0],
  [22, 0], [24, 0], [26, 0], [27, 0], [29, 0], [30, 0], [31, 0], [32, 0], [34, 0], [35, 0], [36, 0], [38, 0], [39, 0], [41, 0],
  [42, 0], [44, 0], [46, 0], [47, 0], [48, 0], [49, 0], [51, 0], [52, 0], [53, 0], [55, 0], [57, 0], [58, 0], [59, 0], [60, 0], [61, 0], [63, 0],
  [65, 0], [67, 0], [69, 0], [71, 0], [73, 0], [75, 0], [77, 0], [78, 0], [79, 0], [81, 0],
  [83, 0], [85, 0], [86, 0], [88, 0], [90, 0], [92, 0], [93, 0], [95, 0], [96, 0], [99, 0], [100, 0], [102, 0], [103, 0], [105, 0],
  [107, 0], [108, 0], [109, 0], [111, 0], [112, 0], [113, 0], [114, 0], [116, 0], [118, 0], [122, 0],
  [124, 0], [125, 0], [127, 0], [128, 0], [130, 0], [132, 0], [134, 0], [135, 0], [136, 0], [137, 0], [138, 0], [139, 0], [140, 0], [141, 0], [143, 0], [146, 0], [147, 0], [148, 0], [149, 0],
  [151, 0], [153, 0], [156, 0], [158, 0], [160, 0], [162, 0]];
const WINS = sceneWindows(CUES, -0.25); // each picture lands just after its first word; the 0.6 s crossfade covers the breath
const sc = (c, w, o) => { const k = CUES.findIndex(([a, b]) => a === c && b === w); if (k < 0) throw new Error("no cue " + c + ":" + w); return scene(WINS[k][0], WINS[k][1], o); };
// the hook's two hands: your palm (left hand, palm to us) + a tickling hand whose fingertips land on it. o.other = someone else's sleeve
const PALM = { x: 760, y: 900, ang: 12, k: 1.7 };
const palmPair = (S, o = {}) => { const p = o.p || PALM, A = hand2(S, p.x, p.y, p.ang, p.k, { palm: true, sleeve: "navy", mirror: -1 }), [px, py] = A.palm;
  const B = handTo(S, px - 6, py - 10, o.ang ?? 100, o.k || 1.45, { nails: true, sleeve: o.other || "navy", t: o.t, reach: 250, mirror: -1 });
  return { A, B, px, py };
};

// ===================== 1. The hand that does nothing =====================
// Right now, try something. / Wiggle your fingertips lightly across the palm of your other hand.
{ const S = sc(1, 0, { cam: "push", focus: "760 620" }); DS.room(S, ROOM.close);
  const H = palmPair(S);
  jig(H.B.g, W(2, 0), 3.2, 10, -6, 0.13);
  squig(S, H.px, H.py, W(2, 2), 1.3);
  DS.card(S, "TRY IT", 960, 150, { size: DS.type.title, t: W(1, 2) });
  DS.card(S, "YOUR PALM", 1360, 760, { size: DS.type.small, t: W(2, 6) });
  DS.vignette(S); }

// Nothing, right? Maybe a polite itch.
{ const S = sc(3, 0, { cam: "zoom", focus: "760 640" }); DS.room(S, ROOM.close);
  const H = palmPair(S);
  DS.card(S, "NOTHING", 1340, 330, { size: DS.type.display, t: W(3, 0) });
  S.draw(smooth([[H.px - 30, H.py + 60], [H.px - 18, H.py + 48], [H.px - 6, H.py + 60], [H.px + 6, H.py + 48], [H.px + 18, H.py + 60]]), W(3, 4), 0, { c: DS.c("red"), w: DS.w.mid });
  DS.card(S, "a polite itch", 1340, 520, { size: DS.type.small, t: W(3, 4) });
  DS.vignette(S); }

// Now picture someone else doing exactly the same thing, without warning.
{ const S = sc(4, 0, { cam: "push", focus: "760 620" }); DS.room(S, ROOM.close);
  const A = hand2(S, PALM.x, PALM.y, PALM.ang, PALM.k, { palm: true, sleeve: "navy", mirror: -1 }), [px, py] = A.palm;
  const B = handTo(S, px - 6, py - 10, 100, 1.45, { nails: true, sleeve: "green", reach: 250, t: W(4, 2), mirror: -1 });
  tl.fromTo(B.g, { x: -700, y: -120 }, { x: 0, y: 0, duration: 0.7, ease: "power2.out", immediateRender: false }, W(4, 2));
  S.burst(px, py, 120, 170, 10, W(4, 9), 0, { c: DS.c("red"), w: DS.w.mid });
  jig(A.g, W(4, 9), 1.0, -14, 8, 0.07);
  DS.card(S, "SOMEONE ELSE", 1360, 150, { size: DS.type.body, t: W(4, 2) });
  DS.card(S, "WITHOUT WARNING", 1360, 780, { size: DS.type.body, t: W(4, 9), tc: "red" });
  DS.vignette(S); }

// Same skin, same fingers, same movement. / The only thing that changed is who's doing it.
{ const S = sc(5, 0, { cam: "push", focus: "960 600" }); DS.room(S, ROOM.close);
  const half = (x, other) => { const A = hand2(S, x, 900, 10, 1.1, { palm: true, sleeve: "navy", mirror: -1 }), [px, py] = A.palm; handTo(S, px - 4, py - 8, 100, 0.95, { nails: true, sleeve: other, reach: 250, mirror: -1 }); squig(S, px, py, other === "green" ? W(6, 6) : S.start + 99, 1.0); return [px, py]; };
  half(560, "navy"); half(1580, "green");
  DS.shape(S, rect(952, 330, 16, 760), "ink", { flat: true, w: "hair" });
  plate(S, 420, 400, "YOU", S.start); plate(S, 1440, 400, "SOMEONE ELSE", S.start);
  panel(S, 960, 210, 560, 220, S.start);
  [["SAME SKIN", W(5, 1)], ["SAME FINGERS", W(5, 3)], ["SAME MOVEMENT", W(5, 5)]].forEach(([s, t], i) => { txt(S, s, 930, 160 + i * 56, { size: DS.type.caption, t }); tick(S, 1150, 146 + i * 56, 0.7, t); });
  DS.card(S, "WHO'S DOING IT", 960, 460, { size: DS.type.body, t: W(6, 6), tc: "red" });
  DS.vignette(S); }

// So why can't you tickle yourself? / An ancient Greek book of puzzles, credited to Aristotle, asks exactly that.
{ const S = sc(7, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM.hall);
  column(S, 420, 830, 620); column(S, 1500, 830, 620);
  DS.shadow(S, 960, GN, 300, { t: W(8, 3) }); DS.shape(S, rect(940, 700, 40, 260), "wood", { t: W(8, 3), dir: "h" });
  scrollP(S, 960, 610, 460, 240, { t: W(8, 3) });
  DS.card(S, "WHY CAN'T YOU TICKLE YOURSELF?", 960, 150, { size: DS.type.body, t: W(7, 1) });
  nameCard(S, "PROBLEMATA", "a Greek puzzle book, credited to Aristotle", 960, 320, { t: W(8, 6) });
  DS.vignette(S); }

// For centuries, people mostly guessed. / Then, in the nineteen nineties, somebody built a robot.
{ const S = sc(9, 0, { cam: "push", focus: "900 580" }); DS.room(S, ROOM.board);
  [[300, 0], [560, 3], [820, 5]].forEach(([x, i], j) => { const t = W(9, 1) + j * 0.3, F = person(S, x, 900, "near", i, { pose: "think", mood: "worried", look: 4, t, s: 1.0 }); S.thought(x + 70, 380, 70, 56, x + 30, 520, t, 0.3); S.text("?", x + 70, 400, { size: DS.type.body, t, c: DS.c("ink") }); });
  DS.card(S, "MOSTLY GUESSED", 560, 150, { size: DS.type.body, t: W(9, 3) });
  const tp = table(S, 1180, 1700, 700);
  robot(S, 1380, tp, 1.3, { t: W(10, 6) });
  DS.card(S, "1990s", 1440, 300, { size: DS.type.title, t: W(10, 3), tc: "red" });
  DS.vignette(S); }

// And the answer turned out to be one fifth of a second.
{ const S = sc(11, 0, { cam: "zoom", focus: "960 560" }); DS.room(S, ROOM.board);
  stopwatch(S, 700, 560, 230, { wedge: 72, wedgeT: W(11, 7), go: W(11, 5), dur: 0.8, turn: 72 });
  countUp(S, 1300, 600, 0.2, W(11, 5), 0.8, { dec: 1, post: " s", size: DS.type.display });
  DS.card(S, "ONE FIFTH OF A SECOND", 1300, 380, { size: DS.type.body, t: W(11, 7), tc: "red" });
  DS.vignette(S); }

// This is Dave. Dave is the most ticklish man in his family, / and his sister knows it.
{ const S = sc(12, 0, { cam: "push", focus: "900 600" }); DS.room(S, ROOM.home); homeKit(S);
  const F = dave(S, 760, GN, "near", { mood: "smile", look: 3 });
  DS.card(S, "DAVE", 760, 470, { size: DS.type.body, t: W(12, 2) });
  DS.card(S, "MOST TICKLISH", 760, 150, { size: DS.type.body, t: W(12, 6), tc: "red" });
  F.face(W(13, 2), "worried", 7);
  const G = sister(S, 1250, GN, "near", { mood: "determined", look: -7, pose: "hips", t: W(13, 2) });
  DS.card(S, "HIS SISTER", 1250, 480, { size: DS.type.small, t: W(13, 2) });
  DS.vignette(S); }

// She has won every argument since they were six / using two fingers and his left armpit.
{ const S = sc(14, 0, { cam: "push", focus: "900 600" }); DS.room(S, ROOM.home); homeKit(S);
  panel(S, 1450, 330, 380, 230, S.start); txt(S, "ARGUMENTS WON", 1450, 260, { size: DS.type.caption });
  txt(S, "SISTER", 1340, 330, { size: DS.type.caption }); txt(S, "DAVE", 1340, 400, { size: DS.type.caption });
  for (let i = 0; i < 9; i++) S.draw(line([1440 + i * 20, 300], [1440 + i * 20 + (i % 5 === 4 ? -80 : 0), 340], 0), W(14, 2) + i * 0.08, 0, { c: DS.c("orange", 2), w: DS.w.mid });
  txt(S, "0", 1460, 404, { size: DS.type.caption, t: W(14, 2) });
  DS.card(S, "SINCE AGE SIX", 1450, 140, { size: DS.type.small, t: W(14, 5) });
  const F = dave(S, 760, GN, "near", { mood: "worried", look: 6 });
  const ax = 760 + 34, ay = GN - 270;
  const G = sister(S, 990, GN, "near", { mood: "determined", look: -7, armL: armAt(990, GN, 1.0, "L", ax + 40, ay + 6, 1), pose: "hips" });
  twoF(S, G, "L", W(15, 1), -1);
  S.ring(ax + 6, ay + 10, 40, 34, W(15, 5), 0, { c: DS.c("red"), w: DS.w.mid });
  laugh(S, F, W(15, 5), -1);
  DS.card(S, "TWO FINGERS", 880, 380, { size: DS.type.small, t: W(15, 1) });
  DS.vignette(S); }

// So Dave has a plan. Every night, he'll tickle himself until he's immune.
{ const S = sc(16, 0, { cam: "push", focus: "900 600" }); DS.room(S, ROOM.night); bedKit(S, { bed: false });
  const C = calendar(S, 1150, 260, 420, 330, { title: "EVERY NIGHT" });
  C.forEach(([x, y], i) => feather(S, [x - 18, y + 22], [x + 18, y - 22], { t: W(16, 5) + 0.05 * i, vw: 9 }));
  const F = dave(S, 760, GN, "near", { mood: "determined", look: 6, armR: armAt(760, GN, 1.1, "R", 880, 640) });
  feather(S, [870, 660], [960, 470], { t: S.start });
  DS.card(S, "THE PLAN", 760, 150, { size: DS.type.body, t: W(16, 4) });
  const sh = S.grp(); DS.shape(S, `M1360 640 L1460 670 L1450 780 Q1420 860 1360 890 Q1300 860 1270 780 L1260 670 Z`, "green", { t: W(16, 12), parent: sh });
  tick(S, 1360, 760, 1.0, W(16, 12), "white");
  DS.card(S, "IMMUNE", 1360, 940 - 30, { size: DS.type.small, t: W(16, 12) });
  DS.vignette(S); }

// Dave is going to fail. / Not because his technique is bad, though it is.
{ const S = sc(17, 0, { cam: "push", focus: "900 600" }); DS.room(S, ROOM.night); bedKit(S, { bed: false });
  const F = dave(S, 820, GN, "near", { mood: "determined", look: -6, armL: armAt(820, GN, 1.1, "L", 700, 520), armR: armAt(820, GN, 1.1, "R", 940, 700) });
  feather(S, [700, 530], [600, 380], { t: S.start }); feather(S, [940, 710], [1050, 820], { t: S.start });
  lean(F, S.start, -8, 0.01);
  stamp(S, 1380, 330, "FAIL", W(17, 4), { size: DS.type.title });
  DS.card(S, "TECHNIQUE: BAD", 1380, 600, { size: DS.type.body, t: W(18, 5) });
  DS.vignette(S); }

// Because his brain sees him coming.
{ const S = sc(19, 0, { cam: "push", focus: "900 520" }); DS.room(S, ROOM.night); bedKit(S, { bed: false });
  const F = dave(S, 760, GN, "near", { mood: "determined", look: 6, armR: armAt(760, GN, 1.1, "R", 880, 640) });
  feather(S, [870, 660], [960, 470], { t: S.start });
  const B = brainThink(S, 1260, 330, 860, 520, S.start, { mood: "flat", look: -1, arms: "none" });
  B.face(W(19, 3), "determined", -1);
  DS.card(S, "SEES HIM COMING", 1260, 620, { size: DS.type.body, t: W(19, 3), tc: "red" });
  DS.vignette(S); }

// How it sees him coming explains why fights escalate, why rats laugh, / and what your brain is doing to you right now.
{ const S = sc(20, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM.board);
  DS.card(S, "THIS EXPLAINS", 960, 150, { size: DS.type.body, t: W(20, 5) });
  tile(S, 400, 520, 500, 440, "WHY FIGHTS ESCALATE", W(20, 7), (x, y) => { handTo(S, x - 8, y + 20, 90, 0.42, { nails: true, sleeve: "blue", t: W(20, 7), two: true, reach: 268, sleeveLen: 160 }); handTo(S, x + 8, y + 20, -90, 0.42, { nails: true, sleeve: "orange", t: W(20, 7), two: true, reach: 268, mirror: -1, sleeveLen: 160 }); [-1, 1].forEach((sd) => S.arrow(x + sd * 170, y - 70, x + sd * 50, y - 70, W(20, 7), 0, { c: DS.c("red"), w: DS.w.mid })); });
  tile(S, 960, 520, 500, 440, "WHY RATS LAUGH", W(20, 10), (x, y) => { rat(S, x - 10, y + 80, 0.95, { t: W(20, 10) }); chirp(S, x + 110, y + 10, W(20, 10) + 0.2, 1, 1.1); });
  tile(S, 1520, 520, 500, 440, "YOUR BRAIN, RIGHT NOW", W(21, 3), (x, y) => brainC(S, x, y - 10, 0.62, { t: W(21, 3), mood: "smile", legs: false, float: true, arms: "wave" }));
  DS.vignette(S); }

// ===================== 2. Darwin's guess =====================
// Night one. Dave picks up a feather / and goes straight for his own ribs.
{ const S = sc(22, 0, { cam: "push", focus: "1000 600" }); DS.room(S, ROOM.night); bedKit(S);
  const F = dave(S, 1100, GN, "near", { mood: "determined", look: 4, armR: armAt(1100, GN, 1.1, "R", 1230, 770) });
  feather(S, [1232, 772], [1150, 745], { t: W(22, 6), vw: 22 });
  DS.card(S, "NIGHT 1", 1100, 150, { size: DS.type.title, t: W(22, 0) });
  S.ring(1146, 752, 52, 44, W(23, 6), 0, { c: DS.c("red"), w: DS.w.mid });
  DS.card(S, "RIBS", 1400, 640, { size: DS.type.small, t: W(23, 6) });
  DS.vignette(S); }

// Then the armpits and feet, / the spots that Greek book says tickle most.
{ const S = sc(24, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM.night); bedKit(S);
  const F = dave(S, 1100, GN, "near", { mood: "determined", look: 0, pose: "armsUp" });
  feather(S, F.hand("R", "armsUp"), [F.hand("R", "armsUp")[0] - 60, F.hand("R", "armsUp")[1] + 140], { t: S.start, vw: 22 });
  [[1100 - 46, GN - 262], [1100 + 46, GN - 262]].forEach(([x, y]) => S.ring(x, y, 36, 30, W(24, 2), 0, { c: DS.c("red"), w: DS.w.mid }));
  [[1100 - 40, GN - 4], [1100 + 40, GN - 4]].forEach(([x, y]) => S.ring(x, y, 40, 22, W(24, 4), 0, { c: DS.c("red"), w: DS.w.mid }));
  quote(S, 560, 230, ["“the armpits and", "the soles of the feet”"], "Problemata, the Greek book", { t: W(25, 3), size: DS.type.caption });
  DS.vignette(S); }

// Nothing. Just a grown man, alone, touching his own armpit.
{ const S = sc(26, 0, { cam: "pull", focus: "960 640" }); DS.room(S, ROOM.night); bedKit(S, { bed: false });
  const F = dave(S, 960, 900, "near", { s: 0.82, mood: "flat", look: 0, armR: armAt(960, 900, 0.82, "R", 1000, 690) });
  feather(S, [1002, 692], [1080, 600], { t: S.start, vw: 16 });
  DS.card(S, "NOTHING", 960, 160, { size: DS.type.display, t: W(26, 0) });
  F.face(W(26, 5), "sad", 0);
  DS.vignette(S, 0.2); }

// Tickles come in two kinds. / Knismesis, the light itchy kind, which Dave can manage,
const kinds = (S, o = {}) => {
  tile(S, 600, 540, 560, 520, "", S.start); tile(S, 1320, 540, 560, 520, "", o.right ?? S.start);
  S.text("KNISMESIS", 600, 360, { size: DS.type.body, c: DS.c("ink"), t: o.left ?? S.start }); S.text("light, itchy", 600, 420, { size: DS.type.caption, c: DS.c("blue", 2), t: o.left ?? S.start });
  feather(S, [500, 690], [680, 520], { t: o.left ?? S.start, vw: 26 }); squig(S, 700, 520, o.left ?? S.start, 0.9);
  S.text("GARGALESIS", 1320, 360, { size: DS.type.body, c: DS.c("ink"), t: o.right ?? S.start }); S.text("the laughing kind", 1320, 420, { size: DS.type.caption, c: DS.c("blue", 2), t: o.right ?? S.start });
  const B = S.grp(); DS.shape(S, circ(1320, 570, 90), "white", { t: o.right, parent: B }); [-1, 1].forEach((sd) => S.draw(smooth(arcPts(1320 + sd * 34, 556, 16, 200, 340, 6)), o.right ?? S.start, 0, { c: DS.c("ink"), w: DS.w.mid, parent: B }));
  DS.shape(S, `M1272 592 Q1320 602 1368 592 Q1360 650 1320 652 Q1280 650 1272 592 Z`, "red", { t: o.right, tone: 2, w: "mid", parent: B }); txt(S, "HA HA", 1470, 500, { t: o.right, size: DS.type.caption });
  if (o.ok !== undefined) { txt(S, "DAVE:", 560, 760, { t: o.ok, size: DS.type.small }); tick(S, 680, 744, 0.9, o.ok); }
  if (o.no !== undefined) { txt(S, "DAVE:", 1280, 760, { t: o.no, size: DS.type.small }); xMark(S, 1400, 744, 0.7, o.no); }
};
{ const S = sc(27, 0, { cam: "push", focus: "960 540" }); DS.room(S, ROOM.board);
  DS.card(S, "TWO KINDS", 960, 150, { size: DS.type.body, t: W(27, 3) });
  kinds(S, { left: W(28, 0), right: 1e4, ok: W(28, 7) });
  DS.vignette(S); }

// and gargalesis, the laughing kind, which he can't.
{ const S = sc(29, 0, { cam: "push", focus: "1320 540" }); DS.room(S, ROOM.board);
  DS.card(S, "TWO KINDS", 960, 150, { size: DS.type.body });
  kinds(S, { right: W(29, 1), ok: S.start, no: W(29, 7) });
  DS.vignette(S); }

// In eighteen seventy-two, Charles Darwin made the same guess as that Greek book:
{ const S = sc(30, 0, { cam: "push", focus: "900 600" }); DS.room(S, Object.assign({}, ROOM.home, { window: false }));
  DS.frame(S, 1260, 200, 200, 150, "grass");
  const top = desk(S, 760, GN, 640);
  const F = person(S, 620, GN, "near", 5, { hair: "short", hairC: DS.c("gray", 1), outfitC: DS.c("brown"), mood: "flat", look: 5, pose: "hold" });
  DS.shape(S, rect(940, top - 60, 150, 60), "green", { tone: 2 }); DS.shape(S, rect(1110, top - 46, 120, 46), "red", { tone: 2 });
  paperR(S, 860, top - 8, 160, 8);
  nameCard(S, "CHARLES DARWIN", "1872", 620, 400, { t: W(30, 3) });
  DS.card(S, "SAME GUESS", 1320, 520, { size: DS.type.body, t: W(30, 7) });
  scrollP(S, 1320, 700, 200, 90, { t: W(30, 11), lines: 3 });
  DS.vignette(S); }

// the precise point to be touched must not be known.
{ const S = sc(31, 0, { cam: "push", focus: "960 540" }); DS.room(S, ROOM.board);
  quote(S, 960, 470, ["“the precise point", "to be touched", "must not be known”"], "Charles Darwin, 1872", { size: DS.type.title, ts: [W(31, 1), W(31, 3), W(31, 6)] });
  DS.vignette(S); }

// Darwin had field data. / He once tickled the foot of his own week-old baby with a bit of paper.
const crib = (S, x0, x1, top) => { DS.shadow(S, (x0 + x1) / 2, GN, x1 - x0 + 40); [x0, x1 - 26].forEach((lx) => DS.shape(S, rrect(lx, top - 40, 26, GN - top + 40, DS.r.xs), "wood")); DS.shape(S, rect(x0 + 20, top + 150, x1 - x0 - 40, 30), "wood", { tone: 2 }); return top; };
{ const S = sc(32, 0, { cam: "push", focus: "1000 640" }); DS.room(S, Object.assign({}, ROOM.home, { window: false })); DS.frame(S, 600, 220, 200, 150, "sky");
  const top = crib(S, 560, 1180, 660);
  DS.shape(S, rrect(590, top + 100, 560, 56, DS.r.md), "white", { tone: 2 });
  DS.shape(S, circ(700, top + 64, 58), "white"); [-18, 18].forEach((dx) => S.fill(circ(700 + dx, top + 56, 6), S.start, 0, DS.c("ink"), 1)); S.draw(smooth([[690, top + 84], [700, top + 90], [710, top + 84]]), S.start, 0, { c: DS.c("ink"), w: DS.w.detail });
  DS.shape(S, rrect(740, top + 50, 380, 70, DS.r.lg), "sky", { tone: 1 });
  const foot = [1150, top + 70]; DS.shape(S, rrect(foot[0] - 36, foot[1] - 24, 60, 44, DS.r.md), "white", { w: "mid" });
  for (let x = 600; x < 1160; x += 56) S.draw(line([x, top - 30], [x, top + 150], 0), S.start, 0, { c: DS.c("wood", 2), w: DS.w.mid });
  DS.shape(S, rrect(560, top - 50, 620, 24, DS.r.xs), "wood");
  const F = person(S, 1420, GN, "near", 5, { hair: "short", hairC: DS.c("gray", 1), outfitC: DS.c("brown"), mood: "flat", look: -7, armL: armAt(1420, GN, 1.1, "L", foot[0] + 70, foot[1] - 10) });
  DS.shape(S, `M${foot[0] + 76} ${foot[1] - 24} L${foot[0] + 26} ${foot[1] - 8} L${foot[0] + 30} ${foot[1] + 6} L${foot[0] + 80} ${foot[1] - 10} Z`, "white", { t: W(33, 12), w: "detail" });
  squig(S, foot[0] - 6, foot[1] - 20, W(33, 13), 0.7);
  plate(S, 1420, 470, "DARWIN", S.start);
  DS.card(S, "FIELD DATA", 960, 150, { size: DS.type.body, t: W(32, 2) });
  DS.card(S, "7 DAYS OLD", 860, 420, { size: DS.type.small, t: W(33, 8), tc: "red" });
  DS.vignette(S); }

// He also noted that feet tickle despite being pressed on all day,
{ const S = sc(34, 0, { cam: "push", focus: "800 560" }); DS.room(S, ROOM.board);
  DS.shadow(S, 820, 830, 560); footSide(S, 700, 830, 1.6);
  [640, 820, 1000].forEach((x, i) => S.arrow(x, 915, x, 846, W(34, 8) + i * 0.1, 0, { c: DS.c("gray", 2), w: DS.w.near }));
  DS.card(S, "PRESSED ON ALL DAY", 760, 140, { size: DS.type.small, t: W(34, 8) });
  squig(S, 980, 800, W(34, 4), 1.4);
  DS.card(S, "STILL TICKLISH", 1360, 560, { size: DS.type.body, t: W(34, 5), tc: "green" });
  DS.vignette(S); }

// with one marked exception: the surface on which we sit.
{ const S = sc(35, 0, { cam: "zoom", focus: "900 700" }); DS.room(S, ROOM.board);
  const top = seat(S, 900, 800);
  const F = seated(S, 900, top, (S2, x, gy, l, o) => person(S2, x, gy, l, 2, o), { mood: "flat", look: 6, pose: "stand" });
  S.ring(890, top - 10, 110, 40, W(35, 5), 0, { c: DS.c("red"), w: DS.w.near });
  DS.card(S, "ONE EXCEPTION", 960, 150, { size: DS.type.body, t: W(35, 2) });
  DS.card(S, "NOT TICKLISH", 1380, 700, { size: DS.type.small, t: W(35, 8), tc: "red" });
  DS.vignette(S); }

// So the guess is: tickling needs you not to know where it's coming from. / And you always know where you're coming from.
{ const S = sc(36, 0, { cam: "push", focus: "900 600" }); DS.room(S, ROOM.home); homeKit(S);
  DS.card(S, "TICKLE = SURPRISE", 960, 150, { size: DS.type.title, t: W(36, 4) });
  const F = dave(S, 760, GN, "near", { mood: "flat", look: 4, armR: armAt(760, GN, 1.1, "R", 770, 700, -1) });
  S.arrow(900, 470, 820, 640, W(37, 2), 0, { bend: -0.3, c: DS.c("red"), w: DS.w.near });
  DS.card(S, "YOU ALWAYS KNOW", 1240, 560, { size: DS.type.body, t: W(37, 2), tc: "red" });
  DS.vignette(S); }

// Dave tests it anyway, eyes shut, letting his hand wander at random.
{ const S = sc(38, 0, { cam: "push", focus: "1000 600" }); DS.room(S, ROOM.night); bedKit(S);
  const F = dave(S, 1100, GN, "near", { mood: "flat", look: 0, armR: armAt(1100, GN, 1.1, "R", 1250, 640) });
  F.face(W(38, 4), "sleep", 0);
  const fg = S.grp(); feather(S, [1252, 642], [1300, 520], { t: S.start, vw: 22, parent: fg });
  dash(S.draw(smooth([[1300, 520], [1420, 420], [1500, 560], [1380, 640], [1460, 760], [1300, 800], [1200, 740]]), W(38, 6), 0, { c: DS.c("gray", 2), w: DS.w.mid }), 18, 14);
  jig(fg, W(38, 8), 1.6, 18, -10, 0.2);
  DS.card(S, "EYES SHUT", 1100, 150, { size: DS.type.body, t: W(38, 4) });
  DS.vignette(S); }

// Nothing. His brain knew exactly where that hand was going. / It was the one sending it.
{ const S = sc(39, 0, { cam: "push", focus: "960 600" }); DS.room(S, ROOM.night); bedKit(S, { bed: false });
  const F = dave(S, 760, GN, "near", { mood: "flat", look: 6, armR: armAt(760, GN, 1.1, "R", 910, 640) });
  feather(S, [912, 642], [960, 520], { t: S.start, vw: 22 });
  const B = brainC(S, 1360, 700, 0.8, { mood: "smile", look: -1, arms: "pointL" });
  dash(S.draw(smooth([[1110, 690], [1010, 610], [930, 650]]), W(40, 4), 0, { c: DS.c("red"), w: DS.w.mid }), 18, 12);
  S.draw(arrowHead(930, 650, 2.6, 26), W(40, 4), 0, { c: DS.c("red"), w: DS.w.mid });
  DS.card(S, "NOTHING", 960, 150, { size: DS.type.title, t: W(39, 0) });
  DS.card(S, "IT SENT THE HAND", 1360, 380, { size: DS.type.small, t: W(40, 4), tc: "red" });
  DS.vignette(S); }

// Worse, some tickles are completely predictable, and still work.
{ const S = sc(41, 0, { cam: "push", focus: "900 600" }); DS.room(S, ROOM.home); homeKit(S);
  const F = dave(S, 760, GN, "near", { mood: "worried", look: 6 });
  const ax = 760 + 34, ay = GN - 270;
  const G = sister(S, 990, GN, "near", { mood: "smile", look: -7, armL: armAt(990, GN, 1.0, "L", ax + 40, ay + 6, 1), pose: "hips" });
  twoF(S, G, "L", S.start, -1);
  bub(S, 1300, 330, 420, 140, 1030, 560, ["3... 2... 1..."], W(41, 1));
  laugh(S, F, W(41, 7), -1);
  DS.card(S, "PREDICTABLE", 1400, 640, { size: DS.type.body, t: W(41, 5) });
  DS.card(S, "STILL WORKS", 1400, 780, { size: DS.type.body, t: W(41, 7), tc: "green" });
  DS.vignette(S); }

// ===================== 3. The laughing rats =====================
// a wire cage on a table top (x0..x1, floor y); bars drawn by bars()
const cage = (S, x0, x1, gy, h) => { DS.shadow(S, (x0 + x1) / 2, gy, x1 - x0 + 40); DS.shape(S, rect(x0 + 30, gy - h + 30, x1 - x0 - 60, h - 54), "glass", { flat: true, w: "hair", tone: 2 }); DS.shape(S, rect(x0 - 10, gy - 24, x1 - x0 + 20, 24), "gray", { tone: 2, w: "mid" }); };
const bars = (S, x0, x1, gy, h) => { for (let x = x0 + 55; x < x1 - 20; x += 110) S.draw(line([x, gy - h], [x, gy - 24], 0), S.start, 0, { c: DS.c("gray", 2), w: DS.w.hair }); S.draw(rect(x0, gy - h, x1 - x0, h - 24), S.start, 0, { c: DS.c("gray", 2), w: DS.w.mid }); DS.shape(S, rrect(x0 - 20, gy - h - 26, x1 - x0 + 40, 30, DS.r.xs), "gray", { tone: 1, w: "mid" }); };
const bell = (S, cx, cy, t) => { DS.shape(S, `M${cx - 50} ${cy + 40} Q${cx - 46} ${cy - 50} ${cx} ${cy - 56} Q${cx + 46} ${cy - 50} ${cx + 50} ${cy + 40} Z`, "gold", { t }); DS.shape(S, circ(cx, cy + 50, 14), "gold", { t, tone: 2, w: "mid" }); [-1, 1].forEach((sd) => S.draw(smooth(arcPts(cx, cy - 10, 84, sd > 0 ? -30 : 150, sd > 0 ? 30 : 210, 6)), t, 0, { c: DS.c("ink"), w: DS.w.mid })); };
const camera = (S, x, gy, t) => { [-50, 0, 50].forEach((dx) => S.draw(line([x, gy - 300], [x + dx, gy], 0), t ?? S.start, 0, { c: DS.c("ink"), w: DS.w.mid })); DS.shadow(S, x, gy, 140, { t }); DS.shape(S, rrect(x - 80, gy - 400, 160, 110, DS.r.sm), "ink", { t, tone: 1 }); DS.shape(S, rrect(x + 80, gy - 380, 60, 70, DS.r.xs), "gray", { t, tone: 2 }); S.fill(circ(x - 50, gy - 370, 10), t ?? S.start, 0, DS.c("red"), 1); };

// In two thousand, Jaak Panksepp and Jeff Burgdorf, in Ohio, / reported what happens when you tickle a young rat.
{ const S = sc(42, 0, { cam: "push", focus: "960 600" }); DS.room(S, ROOM.lab);
  sci(S, 380, GN, 0, { mood: "flat", look: 6, pose: "hold" }); sci(S, 620, GN, 3, { mood: "smile", look: 6 });
  nameCard(S, "JAAK PANKSEPP & JEFF BURGDORF", "Ohio, 2000", 760, 170, { t: W(42, 3) });
  const tp = table(S, 1000, 1700, 700);
  rat(S, 1350, tp, 0.9, { t: W(43, 7), dir: -1 });
  DS.card(S, "A YOUNG RAT", 1350, 460, { size: DS.type.small, t: W(43, 7) });
  DS.vignette(S); }

// It chirps at about fifty kilohertz, too high for human ears, / the same chirps rats make when they play.
{ const S = sc(44, 0, { cam: "push", focus: "800 600" }); DS.room(S, ROOM.lab);
  const tp = table(S, 300, 1180, 760);
  const R = rat(S, 760, tp, 1.5, { dir: 1 });
  const H = handTo(S, 720, tp - 140, -168, 0.62, { nails: true, sleeve: "white", reach: 250 });
  jig(H.g, S.start + 0.3, S.len, 10, -4, 0.18);
  chirp(S, 950, tp - 120, W(44, 1), 1, 1.4); chirp(S, 950, tp - 120, W(44, 1) + 1.2, 1, 1.4);
  DS.card(S, "ABOUT 50 kHz", 440, 150, { size: DS.type.title, t: W(44, 4), tc: "red" });
  const e = S.grp(); DS.shape(S, `M1410 300 Q1500 250 1530 340 Q1550 420 1480 460 Q1450 480 1452 520 Q1450 560 1410 560 Q1380 556 1390 520`, "white", { t: W(44, 6), parent: e }); S.draw(smooth([[1440, 340], [1490, 340], [1480, 410], [1450, 430]]), W(44, 6), 0, { c: DS.c("gray", 2), w: DS.w.detail, parent: e });
  xMark(S, 1470, 410, 1.6, W(44, 7));
  txt(S, "too high for human ears", 1470, 630, { t: W(44, 7), size: DS.type.caption });
  tile(S, 1470, 800, 500, 230, "", W(45, 1)); [1380, 1560].forEach((x, i) => rat(S, x, 885, 0.55, { dir: i ? -1 : 1, t: W(45, 1), float: true })); chirp(S, 1470, 810, W(45, 2), 1, 0.8);
  txt(S, "SAME CHIRPS AS PLAY", 1470, 750, { t: W(45, 1), size: DS.type.caption });
  DS.vignette(S); }

// The rats chased the hand for more.
{ const S = sc(46, 0, { cam: "push", focus: "900 600" }); DS.room(S, ROOM.lab);
  const tp = table(S, 200, 1720, 760);
  const H = handTo(S, 1120, tp - 30, -160, 0.62, { nails: true, sleeve: "white", reach: 250 });
  const R = rat(S, 760, tp, 1.2, { dir: 1 });
  tl.fromTo(H.g, { x: 0 }, { x: 260, duration: 1.4, ease: "power1.inOut", immediateRender: false }, W(46, 2));
  tl.fromTo(R.g, { x: 0 }, { x: 300, duration: 1.4, ease: "power1.inOut", immediateRender: false }, W(46, 2) + 0.1);
  [0, 1, 2].forEach((i) => S.draw(line([560 - i * 10, tp - 50 - i * 30], [470 - i * 10, tp - 50 - i * 30], 0), W(46, 2), 0, { c: DS.c("gray", 2), w: DS.w.mid }));
  chirp(S, 990, tp - 110, W(46, 5), 1, 1.2);
  DS.card(S, "MORE!", 960, 170, { size: DS.type.title, t: W(46, 5) });
  DS.vignette(S); }

// Rats housed alone started chirping at the signal that a tickle was coming.
const loneCage = (S) => { const tp = table(S, 380, 1540, 780); cage(S, 520, 1400, tp, 380); return tp; };
{ const S = sc(47, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM.lab);
  const tp = loneCage(S); rat(S, 960, tp - 24, 1.1, { dir: 1 }); bars(S, 520, 1400, tp, 380);
  DS.card(S, "HOUSED ALONE", 960, 150, { size: DS.type.body, t: W(47, 2) });
  bell(S, 1640, 360, W(47, 7)); txt(S, "the signal", 1640, 520, { t: W(47, 7), size: DS.type.caption });
  chirp(S, 1100, tp - 140, W(47, 7) + 0.4, 1, 1.3);
  DS.vignette(S); }

// They knew exactly what was next, and it still worked.
{ const S = sc(48, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM.lab);
  const tp = loneCage(S); rat(S, 960, tp - 24, 1.1, { dir: 1 });
  const H = handTo(S, 930, tp - 150, -168, 0.6, { nails: true, sleeve: "white", reach: 250, t: W(48, 6) });
  tl.fromTo(H.g, { y: -300 }, { y: 0, duration: 0.6, ease: "power2.out", immediateRender: false }, W(48, 6));
  bars(S, 520, 1400, tp, 380);
  bell(S, 1640, 360, S.start);
  chirp(S, 1100, tp - 140, S.start, 1, 1.3); chirp(S, 1100, tp - 140, W(48, 8), 1, 1.6);
  DS.card(S, "THEY KNEW", 560, 150, { size: DS.type.body, t: W(48, 1) });
  DS.card(S, "IT STILL WORKED", 1460, 150, { size: DS.type.body, t: W(48, 8), tc: "green" });
  DS.vignette(S); }

// The team even bred extra-ticklish rats. / It took four generations.
{ const S = sc(49, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM.board);
  DS.card(S, "EXTRA-TICKLISH", 960, 150, { size: DS.type.body, t: W(49, 4), tc: "red" });
  [0, 1, 2, 3].forEach((i) => { const x = 420 + i * 360, t = i === 0 ? S.start : W(50, 1) + i * 0.3;
    rat(S, x, 640, 0.75, { dir: 1, t }); for (let j = 0; j <= i; j++) chirp(S, x + 90 + j * 22, 560 - j * 30, t + 0.2, 1, 0.8 + j * 0.15);
    txt(S, "GEN " + (i + 1), x, 720, { t, size: DS.type.small }); if (i) S.arrow(x - 250, 600, x - 140, 600, t, 0, { c: DS.c("gray", 2), w: DS.w.mid }); });
  DS.card(S, "4 GENERATIONS", 960, 840, { size: DS.type.body, t: W(50, 2) });
  DS.vignette(S); }

// In twenty sixteen, a Berlin lab filmed tickled rats doing little jumps of joy.
{ const S = sc(51, 0, { cam: "push", focus: "1000 600" }); DS.room(S, ROOM.lab);
  camera(S, 420, GN, W(51, 6));
  const tp = table(S, 760, 1660, 760);
  const R = rat(S, 1210, tp, 1.1, { dir: -1, float: true }); DS.shadow(S, 1210, tp, 180);
  tl.fromTo(R.g, { y: 0 }, { y: -120, duration: 0.32, ease: "power2.out", yoyo: true, repeat: 7, immediateRender: false }, W(51, 10));
  chirp(S, 1080, tp - 220, W(51, 11), -1, 1.2);
  DS.card(S, "BERLIN, 2016", 960, 150, { size: DS.type.body, t: W(51, 1) });
  DS.card(S, "JUMPS OF JOY", 1210, 360, { size: DS.type.body, t: W(51, 11), tc: "green" });
  DS.vignette(S); }

// But put a rat on a high platform under bright light, and the laughing mostly stopped.
{ const S = sc(52, 0, { cam: "push", focus: "960 520" }); DS.room(S, ROOM.lab);
  DS.shadow(S, 960, GN, 300); DS.shape(S, rect(930, 520, 60, 440), "gray", { dir: "h" }); DS.shape(S, rrect(820, 500, 280, 34, DS.r.xs), "gray", { tone: 2 });
  const R = rat(S, 960, 500, 0.8, { dir: 1 });
  DS.shape(S, `M1260 130 L1380 130 L1420 230 L1220 230 Z`, "gray", { tone: 2, t: W(52, 9) }); S.draw(line([1320, 130], [1320, 64], 0), W(52, 9), 0, { c: DS.c("ink"), w: DS.w.mid });
  [[1180, 330], [1240, 380], [1320, 400]].forEach(([x, y]) => S.draw(line([x + (1320 - x) * 0.25, 260 + (y - 260) * 0.1], [x, y], 0), W(52, 9), 0, { c: DS.c("yellow", 2), w: DS.w.near }));
  const cg = S.grp(); chirp(S, 1060, 440, S.start, 1, 1.1); xMark(S, 1090, 440, 0.9, W(52, 14));
  DS.card(S, "HIGH + BRIGHT", 560, 300, { size: DS.type.body, t: W(52, 6) });
  DS.card(S, "MOSTLY STOPPED", 560, 640, { size: DS.type.body, t: W(52, 14), tc: "red" });
  DS.vignette(S); }

// Darwin noticed the same in children. / Tickled by a stranger, a small child screams.
{ const S = sc(53, 0, { cam: "push", focus: "1000 640" }); DS.room(S, ROOM.home); homeKit(S);
  const D = person(S, 380, GN, "mid", 5, { hair: "short", hairC: DS.c("gray", 1, "mid"), outfitC: DS.c("brown", 0, "mid"), mood: "flat", look: 6, pose: "hold" });
  plate(S, 380, 520, "DARWIN", S.start);
  const C = person(S, 1000, GN, "near", 3, { s: 0.62, hair: "messy", hairC: DS.c("earth", 2), outfitC: DS.c("yellow"), mood: "flat", look: 6, pose: "sad" });
  const X = person(S, 1330, GN, "near", 6, { mood: "smile", look: -7, armL: armAt(1330, GN, 1.1, "L", 1120, 760), t: W(54, 1) });
  C.face(W(54, 7), "cry", 4); S.burst(C.hd[0], C.hd[1], C.r * 1.5, C.r * 2.1, 8, W(54, 7), 0, { c: DS.c("red"), w: DS.w.mid });
  DS.card(S, "A STRANGER", 1330, 380, { size: DS.type.small, t: W(54, 3) });
  DS.card(S, "SCREAMS", 1000, 150, { size: DS.type.body, t: W(54, 7), tc: "red" });
  DS.vignette(S); }

// the game screen: two player slots
const gameTV = (S, o = {}) => { DS.shadow(S, 960, 940, 900); DS.shape(S, rect(900, 820, 120, 120), "gray", { tone: 2 });
  DS.shape(S, rrect(460, 220, 1000, 620, DS.r.lg), "ink", { tone: 1 }); DS.shape(S, rect(500, 260, 920, 540), "navy", { flat: true, w: "detail" });
  S.text("TICKLING", 960, 340, { size: DS.type.title, c: DS.c("yellow") });
  [[700, "PLAYER 1", o.p1], [1220, "PLAYER 2", o.p2]].forEach(([x, s, t]) => { S.draw(rrect(x - 170, 400, 340, 340, DS.r.md), t ?? S.start, 0, { c: DS.c("white"), w: DS.w.mid }); S.text(s, x, 700, { size: DS.type.small, t, c: DS.P.white[0] }); });
};
// a small flat figure drawn on a screen or a chart (no floor, no shadow)
const mini = (S, x, gy, s, hair, hairC, oc, t, mood = "smile") => { const F = S.fig(x, gy, { s, hair, hairC: DS.c(hairC), outfit: "tee", outfitC: DS.c(oc), breathe: false, parent: S.grp(), w: DS.w.mid }); F.draw(t ?? S.start, 0.4); F.face(t ?? S.start, mood, 0); return F; };
// So tickling isn't only a feeling. / It's a game, and it needs a second player.
{ const S = sc(55, 0, { cam: "push", focus: "960 520" }); DS.room(S, ROOM.home); homeKit(S);
  gameTV(S, { p1: W(56, 2), p2: W(56, 7) });
  mini(S, 700, 650, 0.6, "side", "brown", "blue", W(56, 2));
  S.text("?", 1220, 600, { size: DS.type.display, t: W(56, 7), c: DS.c("yellow") });
  DS.card(S, "A GAME", 960, 150, { size: DS.type.body, t: W(56, 2) });
  DS.vignette(S); }

// But does the second player have to be a person?
{ const S = sc(57, 0, { cam: "zoom", focus: "1220 560" }); DS.room(S, ROOM.home); homeKit(S);
  gameTV(S, {});
  mini(S, 700, 650, 0.6, "side", "brown", "blue", S.start);
  mini(S, 1150, 650, 0.5, "short", "ink", "green", W(57, 8), "flat");
  const r = S.grp(); DS.shape(S, rrect(1240, 470, 90, 80, DS.r.sm), "gray", { t: W(57, 8), parent: r }); DS.shape(S, rrect(1250, 560, 70, 90, DS.r.sm), "gray", { t: W(57, 8), parent: r, tone: 2 }); [1265, 1305].forEach((x) => S.fill(circ(x, 505, 9), W(57, 8), 0, DS.c("yellow"), 1, r));
  S.text("or", 1220, 600, { size: DS.type.caption, t: W(57, 8), c: DS.P.white[0] });
  DS.card(S, "A PERSON?", 1220, 150, { size: DS.type.body, t: W(57, 8), tc: "red" });
  DS.vignette(S); }

// In the nineteen nineties, psychologist Christine Harris tickled people's bare feet twice:
{ const S = sc(58, 0, { cam: "push", focus: "960 600" }); DS.room(S, ROOM.lab);
  sci(S, 420, GN, 1, { mood: "smile", look: 6, pose: "point" });
  nameCard(S, "CHRISTINE HARRIS", "psychologist, 1990s", 520, 380, { t: W(58, 5) });
  const tp = table(S, 1000, 1640, 800);
  DS.shape(S, rrect(1120, tp - 60, 420, 60, DS.r.md), "sky", { tone: 1 });
  footSide(S, 1260, tp - 60, 1.1, { t: W(58, 9) });
  DS.card(S, "BARE FEET", 1310, 240, { size: DS.type.small, t: W(58, 9) });
  DS.card(S, "TWICE", 960, 150, { size: DS.type.title, t: W(58, 11), tc: "red" });
  DS.vignette(S); }

// a toy robotic hand on a box (the "tickle machine")
const toyHand = (S, cx, base, k, t) => { DS.shadow(S, cx, base, 240 * k, { t }); DS.shape(S, rrect(cx - 110 * k, base - 120 * k, 220 * k, 120 * k, DS.r.sm), "gray", { t, tone: 2 }); [-60, -20, 20, 60].forEach((dx) => S.fill(circ(cx + dx * k, base - 60 * k, 9 * k), t ?? S.start, 0, DS.c("yellow"), 1)); hand2(S, cx, base - 120 * k, 0, 0.75 * k, { skin: "gray", sleeve: "gray", t, sleeveLen: 60 }); };
// once by hand, and once, they were told, by a tickle machine.
{ const S = sc(59, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM.board);
  tile(S, 560, 520, 520, 560, "1. BY HAND", W(59, 0), (x, y) => hand2(S, x, y + 170, 0, 0.9, { nails: true, sleeve: "white", t: W(59, 0), sleeveLen: 90 }));
  tile(S, 1360, 520, 520, 560, "2. BY A TICKLE MACHINE", W(59, 4), (x, y) => toyHand(S, x, y + 210, 1.0, W(59, 4)));
  DS.card(S, "THEY WERE TOLD", 1360, 150, { size: DS.type.body, t: W(59, 6), tc: "red" });
  DS.vignette(S); }

// They laughed at the machine just as often.
{ const S = sc(60, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM.board);
  S.draw(line([560, 760], [1360, 760], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.mid });
  bar(S, 760, 760, 200, 400, "navy", S.start + 0.2, "BY HAND", { size: DS.type.small });
  bar(S, 1160, 760, 200, 400, "gray", W(60, 4), "BY MACHINE", { size: DS.type.small });
  txt(S, "HA HA", 760, 320, { t: S.start + 0.2, size: DS.type.small }); txt(S, "HA HA", 1160, 320, { t: W(60, 4), size: DS.type.small });
  DS.card(S, "JUST AS OFTEN", 960, 150, { size: DS.type.title, t: W(60, 5), tc: "green" });
  DS.vignette(S); }

// The machine was a robotic hand from a toy store. / The tickler was a student, hiding under the table.
{ const S = sc(61, 0, { cam: "push", focus: "960 640" }); DS.room(S, ROOM.lab);
  const st = person(S, 700, GN - 6, "near", 4, { sit: true, s: 0.95, mood: "smile", look: 6, armR: armAt(700, GN - 6, 0.95, "R", 800, 690), float: true, t: W(62, 1) });
  const cl = S.grp(); DS.shadow(S, 960, GN, 860, { parent: cl }); DS.shape(S, `M520 640 L1400 640 L1440 950 L480 950 Z`, "green", { parent: cl, dir: "v" });
  [700, 880, 1060, 1240].forEach((x) => S.draw(line([x, 660], [x + (x - 960) * 0.06, 940], 0), S.start, 0, { c: DS.c("green", 2), w: DS.w.detail, parent: cl }));
  tl.to(cl, { opacity: 0.25, duration: 0.6 }, W(62, 1));
  DS.shape(S, rrect(500, 610, 920, 40, DS.r.xs), "wood");
  toyHand(S, 960, 610, 1.0, S.start);
  const tg = S.grp(); DS.shape(S, `M1110 430 L1230 430 L1260 470 L1230 510 L1110 510 Z`, "yellow", { t: W(61, 8), parent: tg, w: "mid" }); S.text("$", 1160, 486, { size: DS.type.caption, t: W(61, 8), c: DS.c("ink"), parent: tg });
  DS.card(S, "FROM A TOY STORE", 960, 150, { size: DS.type.body, t: W(61, 8) });
  DS.card(S, "A STUDENT, HIDING", 1500, 820, { size: DS.type.small, t: W(62, 4), tc: "red" });
  DS.vignette(S); }

// So you don't need to believe a person is there. / It just can't be you.
{ const S = sc(63, 0, { cam: "push", focus: "960 600" }); DS.room(S, ROOM.home); homeKit(S);
  const p = S.grp(); const P = person(S, 560, GN, "near", 6, { mood: "flat", parent: p }); tl.set(p, { opacity: 0.35 }, S.start);
  DS.card(S, "NOT NEEDED", 560, 420, { size: DS.type.small, t: W(63, 2) });
  const F = dave(S, 1300, GN, "near", { mood: "worried", look: -4, armR: armAt(1300, GN, 1.1, "R", 1420, 740) });
  feather(S, [1422, 742], [1340, 752], { t: S.start, vw: 18 });
  xMark(S, 1400, 750, 1.4, W(64, 3)); F.face(W(64, 3), "sad", -4);
  DS.card(S, "IT JUST CAN'T BE YOU", 960, 150, { size: DS.type.title, t: W(64, 1), tc: "red" });
  DS.vignette(S); }

// ===================== 4. The copy =====================
// So Dave builds a tickle machine. / A feather on a stick, a string and a lever.
{ const S = sc(65, 0, { cam: "push", focus: "900 640" }); DS.room(S, ROOM.night); bedKit(S, { bed: false, win: 1500 });
  machine(S, 1250, GN, { at: { feather: W(66, 1), stick: W(66, 4), string: W(66, 6), lever: W(66, 9) } });
  dave(S, 1250, GN, "near", { mood: "determined", look: -6, pose: "hips" });
  DS.card(S, "DAVE'S TICKLE MACHINE", 960, 150, { size: DS.type.body, t: W(65, 3) });
  [["FEATHER", 1080, 610, W(66, 1)], ["STICK", 860, 420, W(66, 4)], ["STRING", 800, 720, W(66, 6)], ["LEVER", 1180, 870, W(66, 9)]].forEach(([s, x, y, t]) => txt(S, s, x, y, { t, size: DS.type.caption }));
  DS.vignette(S); }

// He pulls the lever. / The feather moves, his ribs feel it, and his brain shrugs.
{ const S = sc(67, 0, { cam: "push", focus: "1000 600" }); DS.room(S, ROOM.night); bedKit(S, { bed: false, win: 1500 });
  machine(S, 1250, GN, { pull: W(67, 1), wiggle: 2.4 });
  const F = daveAtMachine(S, 1250, GN, { pull: W(67, 1) });
  F.face(W(68, 4), "flat", -4);
  const B = brainThink(S, 1460, 330, 1290, 520, W(68, 9), { mood: "flat", arms: "shrug", k: 0.5, rx: 210, ry: 150, dy: -14 });
  txt(S, "meh.", 1460, 452, { t: W(68, 10), size: DS.type.caption });
  DS.vignette(S); }

// Here's why. Whenever your brain orders a muscle to move, / it sends a copy of the order to your senses.
{ const S = sc(69, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM.board);
  brainC(S, 440, 600, 0.8, { mood: "determined", arms: "point", look: 1 });
  const arm = S.grp(); DS.shape(S, capsule([1250, 470], [1460, 470], 34), "white", { t: W(69, 7), parent: arm }); DS.shape(S, capsule([1460, 470], [1500, 290], 28), "white", { t: W(69, 7), parent: arm }); DS.shape(S, circ(1360, 438, 70, 40), "white", { t: W(69, 7), parent: arm }); DS.shape(S, circ(1504, 262, 40), "white", { t: W(69, 7), parent: arm });
  S.arrow(700, 520, 1210, 450, W(69, 5), 0, { bend: -0.12, c: DS.c("ink"), w: DS.w.near });
  txt(S, "ORDER: MOVE", 940, 410, { t: W(69, 5), size: DS.type.small });
  DS.card(S, "MUSCLE", 1400, 150, { size: DS.type.small, t: W(69, 7) });
  S.arrow(700, 690, 1210, 780, W(70, 1), 0, { bend: 0.12, c: DS.c("purple", 2), w: DS.w.near });
  txt(S, "COPY", 940, 830, { t: W(70, 3), size: DS.type.small, c: DS.c("purple", 2) });
  const sn = S.grp(); hand2(S, 1330, 860, 0, 0.42, { palm: true, mirror: -1, sleeve: "navy", t: W(70, 9), sleeveLen: 90 }); waves(S, 1480, 760, 2, W(70, 9), { k: 0.8 }); DS.shape(S, circ(1600, 760, 40, 26), "white", { t: W(70, 9) }); S.fill(circ(1600, 760, 16), W(70, 9), 0, DS.c("ink"), 1);
  DS.card(S, "SENSES", 1480, 620, { size: DS.type.small, t: W(70, 9), tc: "purple" });
  DS.vignette(S); }

// Biologists named it in nineteen fifty: the efference copy. / Your brain copies itself in on every order.
{ const S = sc(71, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM.board);
  DS.card(S, "1950", 400, 160, { size: DS.type.title, t: W(71, 4) });
  DS.card(S, "THE EFFERENCE COPY", 1120, 160, { size: DS.type.title, t: W(71, 7), tc: "purple" });
  panel(S, 1000, 560, 760, 420, W(72, 1));
  [["FROM:", "your brain", 420], ["TO:", "muscle", 490], ["CC:", "your senses", 560]].forEach(([a, b, y], i) => { const t = i === 2 ? W(72, 2) : W(72, 1); S.text(a, 720, y, { size: DS.type.small, t, anchor: "start", c: DS.c(i === 2 ? "purple" : "ink", i === 2 ? 2 : 0) }); S.text(b, 920, y, { size: DS.type.small, t, anchor: "start", c: DS.c("ink") }); });
  S.draw(line([700, 610], [1300, 610], 0), W(72, 1), 0, { c: DS.c("gray", 1), w: DS.w.detail });
  S.text("Move the arm.", 720, 690, { size: DS.type.small, t: W(72, 1), anchor: "start", c: DS.c("ink") });
  S.ring(800, 545, 120, 46, W(72, 2), 0, { c: DS.c("red"), w: DS.w.mid });
  brainC(S, 360, 680, 0.55, { mood: "smile", arms: "hold", look: 1, t: W(72, 1) });
  DS.vignette(S); }

// What you feel is what happened, minus what the copy predicted. / For a self-tickle, that comes to almost nothing.
{ const S = sc(73, 0, { cam: "push", focus: "960 580" }); DS.room(S, ROOM.board);
  eqn(S, 960, 520, { touch: 1, pred: 0.96, felt: 0.04, feltTxt: "≈ 0", ts: { touch: W(73, 4), pred: W(73, 6), felt: W(74, 4) } });
  DS.card(S, "A SELF-TICKLE", 960, 150, { size: DS.type.body, t: W(74, 2) });
  DS.vignette(S); }

// In nineteen ninety-eight, Sarah-Jayne Blakemore's team at University College London / put six volunteers in a brain scanner.
{ const S = sc(75, 0, { cam: "push", focus: "960 600" }); DS.room(S, ROOM.lab);
  sci(S, 380, GN, 2, { mood: "smile", look: 6, hair: "bun", hairC: DS.c("brown", 2) });
  nameCard(S, "SARAH-JAYNE BLAKEMORE", "University College London, 1998", 560, 170, { t: W(75, 3) });
  scanner(S, 1290, GN, { t: W(76, 5) });
  [0, 1, 2, 3, 4, 5].forEach((i) => person(S, 580 + i * 72, 800, "far", i + 1, { t: W(76, 1) + i * 0.08, mood: "smile", look: 0, s: 1.0 }));
  DS.card(S, "6 VOLUNTEERS", 760, 470, { size: DS.type.small, t: W(76, 1) });
  DS.card(S, "BRAIN SCANNER", 1300, 290, { size: DS.type.small, t: W(76, 5) });
  DS.vignette(S); }

// Soft foam brushed each person's palm, moved by them or by the experimenter.
{ const S = sc(77, 0, { cam: "push", focus: "760 620" }); DS.room(S, ROOM.close);
  const A = hand2(S, PALM.x, PALM.y, PALM.ang, PALM.k, { palm: true, sleeve: "navy", mirror: -1 }), [px, py] = A.palm;
  const rod = S.grp(); DS.shape(S, capsule([px + 40, py - 30], [px + 700, py - 420], 10), "gray", { parent: rod, tone: 1 }); DS.shape(S, rrect(px - 50, py - 50, 110, 60, DS.r.md), "yellow", { parent: rod });
  jig(rod, S.start + 0.4, S.len, 26, -14, 0.4);
  DS.card(S, "SOFT FOAM", 1300, 150, { size: DS.type.body, t: W(77, 1) });
  plate(S, 1450, 640, "moved by them", W(77, 8)); plate(S, 1450, 740, "or by the experimenter", W(77, 12));
  DS.vignette(S); }

// When they did it themselves, the brain's touch areas went quieter.
const touchPatch = (S, B, t, q) => busy(S, circ(B.touch[0], B.touch[1] + 20, 150, 190), t, q);
{ const S = sc(78, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM.board);
  const B = brainSide(S, 960, 540, 1.45);
  touchPatch(S, B, S.start, W(78, 9));
  DS.card(S, "SELF-MADE TOUCH", 960, 150, { size: DS.type.body, t: W(78, 4) });
  DS.card(S, "TOUCH AREAS", 520, 380, { size: DS.type.small, t: W(78, 7) }); S.arrow(660, 380, 870, 360, W(78, 7), 0, { c: DS.c("ink"), w: DS.w.mid });
  DS.card(S, "QUIETER", 1420, 380, { size: DS.type.body, t: W(78, 10), tc: "blue" });
  DS.vignette(S); }

// So did part of the cerebellum, / the part they think makes the prediction.
{ const S = sc(79, 0, { cam: "push", focus: "1100 640" }); DS.room(S, ROOM.board);
  const B = brainSide(S, 960, 540, 1.45);
  touchPatch(S, B, S.start, S.start);
  busy(S, circ(B.cereb[0], B.cereb[1], 180, 120), S.start, W(79, 5));
  S.ring(B.cereb[0], B.cereb[1], 160, 104, W(79, 5), 0, { c: DS.c("red"), w: DS.w.mid });
  DS.card(S, "CEREBELLUM", 1560, 640, { size: DS.type.body, t: W(79, 5) });
  DS.card(S, "MAKES THE PREDICTION", 960, 150, { size: DS.type.body, t: W(80, 4), tc: "purple" });
  DS.vignette(S); }

// Somewhere in there, a very small voice says: / Relax, it's just Dave.
{ const S = sc(81, 0, { cam: "push", focus: "800 600" }); DS.room(S, ROOM.board);
  const B = brainC(S, 640, 650, 1.0, { mood: "smile", arms: "rest", look: 0.5 });
  B.arms(W(82, 0), "wave");
  DS.card(S, "A VERY SMALL VOICE", 640, 150, { size: DS.type.small, t: W(81, 4) });
  bub(S, 1250, 380, 720, 170, 860, 560, ["Relax, it's just Dave."], W(82, 0), { size: DS.type.title });
  DS.vignette(S); }

// ===================== 5. One fifth of a second =====================
// So how do you beat a prediction? / You make the prediction wrong.
{ const S = sc(83, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM.board);
  const B = brainC(S, 480, 650, 0.85, { mood: "smile", arms: "hold", look: 1 });
  panel(S, 1200, 520, 720, 300, S.start);
  S.text("PREDICTION:", 1200, 460, { size: DS.type.small, c: DS.c("purple", 2) });
  S.text("touch, right now", 1200, 560, { size: DS.type.body, c: DS.c("ink") });
  S.draw(line([920, 540], [1480, 548], 0), W(84, 3), 0, { c: DS.c("red"), w: DS.w.near });
  stamp(S, 1340, 690, "WRONG", W(84, 4), { size: DS.type.title });
  B.face(W(84, 4), "wow", 1);
  DS.card(S, "BEAT A PREDICTION?", 960, 150, { size: DS.type.body, t: W(83, 4) });
  DS.vignette(S); }

// the 1999 rig on a table: robot 1 under the volunteer's left hand, robot 2 brushing foam on the right palm, a cable between
const rig = (S, o = {}) => {
  const F = person(S, 960, GN, "near", 1, { mood: o.mood || "flat", look: o.look || 0, armL: armAt(960, GN, 1.1, "L", 762, 700), armR: armAt(960, GN, 1.1, "R", 1110, 712) });
  const tp = table(S, 380, 1540, 770);
  const R1 = robot(S, 560, tp, 1.0, { dir: 1, reachX: 200, reachY: -70, foam: false });
  const R2 = robot(S, 1360, tp, 1.0, { dir: -1, reachX: 200, reachY: -110 });
  hand2(S, 1110, 712, 90, 0.45, { palm: true, sleeve: "purple", mirror: -1, sleeveLen: 30 });
  jig(R1.g, S.start + 0.3, S.len, 10, -6, 0.5); jig(R2.g, (o.lag ?? 0) + S.start + 0.3, S.len, -10, -6, 0.5);
  const c = S.draw(smooth([[560, tp - 20], [690, 905], [1230, 905], [1360, tp - 20]]), S.start, 0, { c: DS.c("ink", 1), w: DS.w.mid });
  plate(S, 560, 460, "ROBOT 1", S.start); plate(S, 1360, 460, "ROBOT 2", S.start);
  return { F, tp };
};
// In nineteen ninety-nine, the same London team built the machine Dave is trying to build.
{ const S = sc(85, 0, { cam: "push", focus: "900 600" }); DS.room(S, ROOM.lab);
  const tp = table(S, 300, 1300, 700);
  robot(S, 520, tp, 1.0, { dir: 1, reachX: 200, reachY: -70, foam: false }); robot(S, 1080, tp, 1.0, { dir: -1, reachX: 200, reachY: -110 });
  S.draw(smooth([[520, tp - 20], [700, tp + 70], [900, tp + 70], [1080, tp - 20]]), S.start, 0, { c: DS.c("ink", 1), w: DS.w.mid });
  DS.card(S, "LONDON, 1999", 800, 150, { size: DS.type.body, t: W(85, 2) });
  const F = dave(S, 1580, GN, "near", { mood: "flat", look: -7, armR: armAt(1580, GN, 1.1, "R", 1700, 700) });
  feather(S, [1702, 702], [1760, 590], { t: S.start, vw: 18 });
  F.face(W(85, 10), "worried", -7);
  DS.card(S, "DAVE'S MACHINE", 1580, 470, { size: DS.type.small, t: W(85, 10), tc: "red" });
  DS.vignette(S); }

// Sixteen volunteers moved a robot arm with one hand. / A second robot copied the movement, brushing foam across their other palm.
{ const S = sc(86, 0, { cam: "push", focus: "960 600" }); DS.room(S, ROOM.lab);
  rig(S, { mood: "flat" });
  DS.card(S, "16 VOLUNTEERS", 960, 150, { size: DS.type.body, t: W(86, 0) });
  txt(S, "copies the move", 1230, 870, { t: W(87, 3), size: DS.type.caption });
  DS.card(S, "FOAM ON THE PALM", 1480, 300, { size: DS.type.small, t: W(87, 6) });
  DS.vignette(S); }

// Then the scientists secretly added a delay. / A tenth of a second, two tenths, three tenths.
{ const S = sc(88, 0, { cam: "push", focus: "960 640" }); DS.room(S, ROOM.lab);
  rig(S, { mood: "flat" });
  dbox(S, 835, 830, 1.0, { t: W(88, 4), read: "?" });
  DS.card(S, "SECRETLY", 960, 150, { size: DS.type.body, t: W(88, 3), tc: "red" });
  [["0.1 s", W(89, 1)], ["0.2 s", W(89, 5)], ["0.3 s", W(89, 7)]].forEach(([s, t], i) => plate(S, 720 + i * 240, 300, s, t, { fill: i === 1 ? "yellow" : undefined }));
  DS.vignette(S); }

// The longer the delay, the more it tickled. / From one fifth of a second on, it felt like the robot was doing it alone.
{ const S = sc(90, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM.board);
  panel(S, 960, 560, 1300, 600, S.start);
  const B = 760; S.draw(line([400, B], [1520, B], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.mid });
  [[0, 0.3], [1, 0.55], [2, 0.86], [3, 0.86]].forEach(([i, h]) => bar(S, 520 + i * 230, B, 150, h * 380, i >= 2 ? "red" : "navy", W(90, 1) + i * 0.3, ["0", "0.1 s", "0.2 s", "0.3 s"][i], { size: DS.type.small }));
  bar(S, 1420, B, 150, 0.86 * 380, "gray", W(91, 10), "robot alone", { size: DS.type.caption });
  dash(S.draw(line([440, B - 0.86 * 380], [1500, B - 0.86 * 380], 0), W(91, 10), 0, { c: DS.c("gray", 2), w: DS.w.mid }), 16, 12);
  S.ring(980, B - 160, 110, 230, W(91, 1), 0, { c: DS.c("red"), w: DS.w.mid });
  DS.card(S, "MORE DELAY, MORE TICKLE", 960, 150, { size: DS.type.body, t: W(90, 1) });
  txt(S, "TICKLY", 470, 330, { size: DS.type.small, anchor: "start" });
  DS.vignette(S); }

// Only two of the sixteen even noticed a delay.
{ const S = sc(92, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM.board);
  for (let i = 0; i < 16; i++) { const x = 420 + (i % 8) * 154, y = i < 8 ? 520 : 820, hi = i === 3 || i === 12; mini(S, x, y, 0.62, HAIR[i % 8], HC[i % 8][0], OC[i % 8], S.start, hi ? "wow" : "flat"); if (hi) S.ring(x, y - 190, 64, 64, W(92, 1), 0, { c: DS.c("red"), w: DS.w.mid }); }
  DS.card(S, "ONLY 2 OF 16 NOTICED", 960, 150, { size: DS.type.body, t: W(92, 1), tc: "red" });
  DS.vignette(S); }

// So Dave adds a delay box, set to one fifth of a second. / He pulls the lever.
{ const S = sc(93, 0, { cam: "push", focus: "900 640" }); DS.room(S, ROOM.night); bedKit(S, { bed: false, win: 1500 });
  const m = machine(S, 1250, GN, { box: W(93, 4), pull: W(94, 1) });
  daveAtMachine(S, 1250, GN, { pull: W(94, 1), mood: "determined" });
  const [bx, by] = [m.M.B[0] + 58, m.M.B[1] + 66];
  S.draw(line([bx - 30, by - 30], [500, 470], 0), W(93, 8), 0, { c: DS.c("ink"), w: DS.w.detail });
  DS.shape(S, circ(440, 360, 150), "white", { t: W(93, 8), w: "mid" });
  S.text("0.2 s", 440, 400, { size: DS.type.display, t: W(93, 8), c: DS.c("red", 2) });
  DS.card(S, "DELAY BOX", 960, 150, { size: DS.type.body, t: W(93, 4), tc: "red" });
  DS.vignette(S); }

// And for the first time in his life, Dave tickles Dave.
{ const S = sc(95, 0, { cam: "zoom", focus: "1150 600" }); DS.room(S, ROOM.night); bedKit(S, { bed: false, win: 1500 });
  machine(S, 1250, GN, { box: true, pull: S.start - 0.62, wiggle: S.len + 1 });
  const F = daveAtMachine(S, 1250, GN, { pull: S.start - 0.62, mood: "wow" });
  laugh(S, F, W(95, 8), 1);
  squig(S, 1212, 752, W(95, 8), 1.1);
  DS.card(S, "DAVE TICKLES DAVE", 960, 150, { size: DS.type.title, t: W(95, 8), tc: "green" });
  DS.vignette(S); }

// a stranger's disguise on a figure: round glasses + a big moustache
const disguise = (S, F, t) => { const g = S.grp(F.g), R = F.r, x = F.hd[0], y = F.hd[1];
  [-1, 1].forEach((sd) => S.draw(circ(x + sd * 0.34 * R, y - 0.08 * R, 0.3 * R), t, 0, { c: DS.c("ink"), w: DS.w.mid, parent: g }));
  S.draw(line([x - 0.06 * R, y - 0.1 * R], [x + 0.06 * R, y - 0.1 * R], 0), t, 0, { c: DS.c("ink"), w: DS.w.mid, parent: g });
  DS.shape(S, `M${x} ${y + 0.3 * R} Q${x - 0.3 * R} ${y + 0.16 * R} ${x - 0.52 * R} ${y + 0.42 * R} Q${x - 0.26 * R} ${y + 0.36 * R} ${x} ${y + 0.42 * R} Q${x + 0.26 * R} ${y + 0.36 * R} ${x + 0.52 * R} ${y + 0.42 * R} Q${x + 0.3 * R} ${y + 0.16 * R} ${x} ${y + 0.3 * R} Z`, "brown", { t, parent: g, w: "detail" }); };
// He hasn't beaten his brain. / He's just turned himself into a stranger, / one fifth of a second late.
{ const S = sc(96, 0, { cam: "push", focus: "960 600" }); DS.room(S, ROOM.night); bedKit(S, { bed: false, win: 1500 });
  const B = brainC(S, 520, 700, 0.8, { mood: "flat", arms: "rest", look: 1 });
  const F = dave(S, 1200, GN, "near", { mood: "smile", look: -5 });
  DS.card(S, "BRAIN: NOT BEATEN", 520, 380, { size: DS.type.small, t: W(96, 1) });
  disguise(S, F, W(97, 6));
  B.face(W(97, 6), "wow", 1);
  DS.card(S, "A STRANGER", 1200, 380, { size: DS.type.body, t: W(97, 6) });
  DS.card(S, "0.2 s LATE", 1200, 150, { size: DS.type.title, t: W(98, 1), tc: "red" });
  DS.vignette(S); }

// In twenty nineteen, a Stockholm team tried this on thirty people.
{ const S = sc(99, 0, { cam: "push", focus: "960 600" }); DS.room(S, ROOM.lab);
  sci(S, 380, GN, 2, { mood: "smile", look: 6, hair: "bun", hairC: DS.c("ink") }); sci(S, 620, GN, 0, { mood: "flat", look: 6, hair: "short", hairC: DS.c("gray", 2) });
  nameCard(S, "KILTENI, HOUBORG & EHRSSON", "Karolinska Institutet, Stockholm, 2019", 760, 170, { t: W(99, 3) });
  dotGrid(S, 1320, 640, 30, 10, 80, 30, { t: W(99, 9), stag: 0.02, name: "blue" });
  DS.card(S, "30 PEOPLE", 1320, 420, { size: DS.type.body, t: W(99, 9) });
  DS.vignette(S); }

// After fifty slow strokes, their brains began to expect the delay, / and the trick started to fade.
{ const S = sc(100, 0, { cam: "push", focus: "900 640" }); DS.room(S, ROOM.night); bedKit(S, { bed: false, win: 1500 });
  machine(S, 1250, GN, { box: true, pull: S.start - 0.62, wiggle: S.len + 1, boxFade: W(101, 2), boxFadeDur: 1.6 });
  const F = daveAtMachine(S, 1250, GN, { pull: S.start - 0.62, mood: "happy" });
  F.face(W(101, 4), "flat", -4);
  panel(S, 520, 300, 360, 200, S.start); txt(S, "STROKES", 520, 260, { size: DS.type.caption });
  countUp(S, 520, 360, 50, W(100, 1), 2.6, { size: DS.type.title, ease: "none" });
  DS.card(S, "BRAIN EXPECTS THE DELAY", 1100, 150, { size: DS.type.small, t: W(100, 8) });
  DS.card(S, "THE TRICK FADES", 1500, 470, { size: DS.type.small, t: W(101, 3), tc: "red" });
  DS.vignette(S); }

// But touch with no delay at all began to tickle a little more.
{ const S = sc(102, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM.board);
  panel(S, 960, 560, 1000, 560, S.start);
  const B = 760; S.draw(line([560, B], [1360, B], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.mid });
  bar(S, 760, B, 180, 90, "navy", S.start, "before", { size: DS.type.small });
  bar(S, 1160, B, 180, 150, "navy", W(102, 9), "after 50 strokes", { size: DS.type.small });
  S.arrow(860, B - 140, 1050, B - 190, W(102, 10), 0, { c: DS.c("green"), w: DS.w.near });
  DS.card(S, "NO DELAY AT ALL", 960, 150, { size: DS.type.body, t: W(102, 3) });
  DS.card(S, "A LITTLE MORE TICKLY", 960, 380, { size: DS.type.small, t: W(102, 10), tc: "green" });
  DS.vignette(S); }

// The paper says it plainly: / it is possible to learn to tickle yourself.
{ const S = sc(103, 0, { cam: "push", focus: "960 540" }); DS.room(S, ROOM.board);
  quote(S, 960, 500, ["“it is possible", "to learn to", "tickle oneself”"], "Kilteni, Houborg & Ehrsson, eLife, 2019", { size: DS.type.title, ts: [W(104, 0), W(104, 3), W(104, 6)] });
  DS.card(S, "THE PAPER SAYS", 960, 150, { size: DS.type.body, t: W(103, 1) });
  DS.vignette(S); }

// Dave's own fingers now tickle him, slightly. / He is calling it progress.
{ const S = sc(105, 0, { cam: "push", focus: "900 600" }); DS.room(S, ROOM.night); bedKit(S, { bed: false, win: 1500 });
  const F = dave(S, 760, GN, "near", { mood: "flat", look: 4, armR: armAt(760, GN, 1.1, "R", 815, 740, -1) });
  twoF(S, F, "R", S.start, -1);
  squig(S, 790, 735, W(105, 4), 0.7, 2);
  F.face(W(105, 6), "smile", 4);
  DS.card(S, "SLIGHTLY", 760, 150, { size: DS.type.body, t: W(105, 6) });
  panel(S, 1350, 520, 600, 220, W(106, 2)); txt(S, "PROGRESS", 1350, 470, { t: W(106, 2), size: DS.type.small });
  DS.shape(S, rrect(1100, 520, 500, 50, DS.r.sm), "white", { t: W(106, 2), w: "mid", flat: true });
  DS.shape(S, rrect(1106, 526, 40, 38, DS.r.xs), "green", { t: W(106, 3), w: "hair" });
  DS.vignette(S); }

// ===================== 6. Two eyes for an eye =====================
// And the subtraction doesn't only work on tickles.
{ const S = sc(107, 0, { cam: "push", focus: "960 580" }); DS.room(S, ROOM.board);
  eqn(S, 960, 520, { touch: 1, pred: 0.96, felt: 0.04, feltTxt: "≈ 0" });
  DS.card(S, "NOT ONLY TICKLES", 960, 150, { size: DS.type.body, t: W(107, 3), tc: "red" });
  DS.vignette(S); }

// push: figure F's hand (side) pushes toward dir with one finger out
const finger = (S, F, side, t, dir = 1) => { const [x, y] = F.hand(side), g = S.grp(F.g); DS.shape(S, capsule([x, y], [x + dir * 40, y - 6], 8), "white", { t, parent: g, w: "detail" }); DS.shape(S, circ(x, y, 14), "white", { t, parent: g, w: "detail" }); return g; };
// In two thousand three, the London team put Dave's family problem in a lab.
{ const S = sc(108, 0, { cam: "push", focus: "960 600" }); DS.room(S, ROOM.lab);
  const F = dave(S, 800, GN, "near", { mood: "angry", look: 6, armR: armAt(800, GN, 1.1, "R", 930, 700) });
  const G = sister(S, 1110, GN, "near", { mood: "angry", look: -6, armL: armAt(1110, GN, 1.0, "L", 984, 690) });
  finger(S, F, "R", S.start, 1); finger(S, G, "L", S.start, -1);
  sci(S, 1580, GN, 5, { layer: "mid", mood: "flat", look: -6, pose: "hold" });
  plate(S, 1580, 520, "SHERGILL & TEAM", S.start);
  DS.card(S, "LONDON, 2003", 960, 150, { size: DS.type.body, t: W(108, 1) });
  DS.card(S, "THE FAMILY PROBLEM", 960, 420, { size: DS.type.small, t: W(108, 8), tc: "red" });
  DS.vignette(S); }

// Six pairs of volunteers took turns pressing on each other's finger. / The rule: press exactly as hard as you were just pressed.
{ const S = sc(109, 0, { cam: "push", focus: "960 600" }); DS.room(S, ROOM.lab);
  const A = person(S, 660, GN, "near", 0, { mood: "flat", look: 6, armR: armAt(660, GN, 1.1, "R", 900, 700) });
  const B = person(S, 1260, GN, "near", 2, { mood: "flat", look: -6, armL: armAt(1260, GN, 1.1, "L", 1020, 700) });
  const tp = table(S, 760, 1160, 720);
  DS.shape(S, rrect(900, tp - 40, 120, 40, DS.r.xs), "gray", { tone: 2 });
  finger(S, A, "R", S.start, 1); finger(S, B, "L", S.start, -1);
  S.arrow(940, 560, 940, 650, W(109, 6), 0, { c: DS.c("red"), w: DS.w.mid });
  DS.card(S, "6 PAIRS", 960, 150, { size: DS.type.body, t: W(109, 1) });
  panel(S, 960, 380, 820, 150, W(110, 1)); S.text("RULE: press as hard", 960, 368, { size: DS.type.small, t: W(110, 1), c: DS.c("ink") }); S.text("as you were just pressed", 960, 428, { size: DS.type.small, t: W(110, 3), c: DS.c("ink") });
  DS.vignette(S); }

// escalation bars: 9 presses (the first nudge + 8 turns), each about 38 % harder
const ESC = Array.from({ length: 9 }, (_, i) => Math.pow(1.38, i));
const escBars = (S, n, t, o = {}) => { const B = 820; S.draw(line([300, B], [1640, B], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.mid });
  ESC.forEach((v, i) => { const x = 380 + i * 150, tt = i < (o.shown || 0) ? S.start : t + (i - (o.shown || 0)) * 0.3; if (i < n) bar(S, x, B, 100, v * 42, i % 2 ? "orange" : "purple", tt, i ? String(i) : "start", { size: DS.type.caption }); }); };
// Every pair escalated, on average about thirty-eight percent harder each turn.
{ const S = sc(111, 0, { cam: "push", focus: "800 640" }); DS.room(S, ROOM.board);
  escBars(S, 5, W(111, 1));
  txt(S, "turn", 1700, 870, { size: DS.type.caption });
  DS.card(S, "+38% EACH TURN", 960, 150, { size: DS.type.title, t: W(111, 6), tc: "red" });
  DS.vignette(S); }

// After eight turns, the presses were more than ten times as hard as the first nudge.
{ const S = sc(112, 0, { cam: "pull", focus: "960 560" }); DS.room(S, ROOM.board);
  escBars(S, 9, W(112, 0), { shown: 5 });
  S.ring(380, 800, 70, 40, W(112, 13), 0, { c: DS.c("red"), w: DS.w.mid });
  S.arrow(470, 760, 1520, 300, W(112, 6), 0, { bend: 0.15, c: DS.c("red"), w: DS.w.near });
  DS.card(S, "MORE THAN 10×", 900, 330, { size: DS.type.title, t: W(112, 8), tc: "red" });
  DS.card(S, "AFTER 8 TURNS", 900, 150, { size: DS.type.body, t: W(112, 1) });
  DS.vignette(S); }

// Every one of them was trying to be fair.
{ const S = sc(113, 0, { cam: "push", focus: "960 600" }); DS.room(S, ROOM.lab);
  const A = person(S, 660, GN, "near", 0, { mood: "smile", look: 6 }), B = person(S, 1260, GN, "near", 2, { mood: "smile", look: -6 });
  bub(S, 520, 330, 260, 110, 640, 520, ["Fair!"], W(113, 5)); bub(S, 1400, 330, 260, 110, 1280, 520, ["Fair!"], W(113, 7));
  DS.card(S, "TRYING TO BE FAIR", 960, 150, { size: DS.type.body, t: W(113, 4), tc: "green" });
  DS.vignette(S); }

// Your own push gets the discount too. / In the same study, self-made force felt about half as strong as it was.
{ const S = sc(114, 0, { cam: "push", focus: "800 560" }); DS.room(S, ROOM.board);
  const H = hand2(S, 260, 640, 90, 1.0, { nails: true, sleeve: "navy", two: true });
  DS.shape(S, rrect(560, 560, 70, 160, DS.r.sm), "gray", { tone: 2 });
  const tg = S.grp(); DS.shape(S, `M580 300 L800 300 L840 350 L800 400 L580 400 Z`, "yellow", { t: W(114, 5), parent: tg }); S.fill(circ(604, 350, 10), W(114, 5), 0, DS.c("ink"), 1, tg); S.text("½ OFF", 714, 368, { size: DS.type.small, t: W(114, 5), c: DS.c("ink"), parent: tg });
  S.draw(line([604, 350], [600, 560], 0), W(114, 5), 0, { c: DS.c("ink"), w: DS.w.detail });
  const B = 800; S.draw(line([1040, B], [1640, B], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.mid });
  bar(S, 1150, B, 160, 400, "navy", W(115, 4), "your push", { size: DS.type.caption }); bar(S, 1520, B, 160, 200, "red", W(115, 8), "what you feel", { size: DS.type.caption });
  DS.card(S, "ABOUT HALF", 1520, 470, { size: DS.type.body, t: W(115, 8), tc: "red" });
  DS.card(S, "THE DISCOUNT", 700, 150, { size: DS.type.body, t: W(114, 5) });
  DS.vignette(S); }

// So you press harder to make it feel fair, / and the other person feels the full amount.
{ const S = sc(116, 0, { cam: "push", focus: "960 600" }); DS.room(S, ROOM.lab);
  const A = person(S, 640, GN, "near", 0, { mood: "determined", look: 6, armR: armAt(640, GN, 1.1, "R", 900, 700) });
  const B = person(S, 1280, GN, "near", 2, { mood: "flat", look: -6, armL: armAt(1280, GN, 1.1, "L", 1020, 700) });
  finger(S, A, "R", S.start, 1);
  S.arrow(700, 560, 930, 640, W(116, 2), 0, { c: DS.c("red"), w: DS.w.near }); S.arrow(660, 520, 930, 610, W(116, 3), 0, { c: DS.c("red"), w: DS.w.near });
  plate(S, 640, 420, "feels fair", W(116, 7));
  B.face(W(117, 4), "wow", -6); S.burst(1000, 690, 50, 100, 10, W(117, 6), 0, { c: DS.c("red"), w: DS.w.mid });
  plate(S, 1280, 420, "feels the full amount", W(117, 6));
  DS.card(S, "PRESS HARDER", 960, 150, { size: DS.type.body, t: W(116, 2), tc: "red" });
  DS.vignette(S); }

// That's Dave and his sister. / "You pushed me harder, Dave." / "No, you pushed me harder." / Both of them are right.
{ const S = sc(118, 0, { cam: "push", focus: "960 600" }); DS.room(S, ROOM.home); homeKit(S);
  const F = dave(S, 780, GN, "near", { mood: "angry", look: 6, armR: armAt(780, GN, 1.1, "R", 920, 710) });
  const G = sister(S, 1140, GN, "near", { mood: "angry", look: -6, armL: armAt(1140, GN, 1.0, "L", 1000, 700) });
  finger(S, F, "R", S.start, 1); finger(S, G, "L", S.start, -1);
  bub(S, 1450, 330, 560, 130, 1180, 560, ["You pushed me harder, Dave."], W(119, 0), { size: DS.type.caption });
  bub(S, 520, 330, 540, 130, 760, 560, ["No, you pushed me harder."], W(120, 0), { size: DS.type.caption });
  DS.card(S, "BOTH ARE RIGHT", 960, 150, { size: DS.type.title, t: W(121, 0), tc: "green" });
  DS.vignette(S); }

// The paper opens with exactly this: / two children, each sure the other hit harder.
{ const S = sc(122, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM.board);
  paperR(S, 560, 200, 800, 700); S.text("Two eyes for an eye", 960, 290, { size: DS.type.body, c: DS.c("ink") }); S.text("Science, 2003", 960, 350, { size: DS.type.caption, c: DS.c("blue", 2) });
  lines(S, 620, 640, 680, 6, S.start, 40);
  quote(S, 960, 500, ["“...both will often assert that", "the other hit him or her harder.”"], "Shergill, Bays, Frith & Wolpert", { size: DS.type.small, t: W(123, 0) });
  DS.card(S, "THE FIRST LINES", 1500, 150, { size: DS.type.small, t: W(122, 1) });
  DS.vignette(S); }

// ===================== 7. Cancelled =====================
// So that settles it, right? Your brain cancels your own touch, end of story.
{ const S = sc(124, 0, { cam: "push", focus: "960 600" }); DS.room(S, ROOM.home); homeKit(S);
  const F = dave(S, 760, GN, "near", { mood: "smile", look: 6, pose: "hold" });
  const [hx, hy] = F.hand("R", "hold"); DS.shape(S, rrect(hx - 105, hy - 110, 210, 110, DS.r.xs), "red", { tone: 2 }); S.text("THE END", hx, hy - 46, { size: DS.type.caption, c: DS.P.white[0] });
  DS.card(S, "SETTLED?", 960, 150, { size: DS.type.title, t: W(124, 2) });
  DS.card(S, "END OF STORY", 1340, 520, { size: DS.type.body, t: W(124, 11) });
  DS.vignette(S); }

// Not quite. Here's the part nobody talks about. / Your brain is constantly cancelling you out of your own life.
{ const S = sc(125, 0, { cam: "push", focus: "960 600" }); DS.room(S, ROOM.board);
  DS.card(S, "NOT QUITE", 960, 150, { size: DS.type.title, t: W(125, 0), tc: "red" });
  const B = brainC(S, 520, 660, 0.85, { mood: "flat", arms: "point", look: 1 });
  panel(S, 1260, 560, 640, 360, W(126, 1)); S.text("YOU", 1260, 530, { size: DS.type.display, t: W(126, 1), c: DS.c("ink") });
  stamp(S, 1260, 650, "CANCELLED", W(126, 4), { size: DS.type.title, clear: true });
  B.face(W(126, 3), "determined", 1);
  DS.vignette(S); }

// a big eye; pupil jumps between spots (saccades) from t, 3 a second
const bigEye = (S, cx, cy, k, t, n = 6) => { DS.shape(S, `M${cx - 300 * k} ${cy} Q${cx} ${cy - 250 * k} ${cx + 300 * k} ${cy} Q${cx} ${cy + 250 * k} ${cx - 300 * k} ${cy} Z`, "white");
  const spots = [[0, 0], [-90, -20], [80, 30], [-40, 40], [100, -24], [-100, 10], [30, -30]], G = [];
  spots.slice(0, n + 1).forEach(([dx, dy], i) => { const g = S.grp(); DS.shape(S, circ(cx + dx * k, cy + dy * k, 90 * k), "sky", { parent: g, tone: 2 }); S.fill(circ(cx + dx * k, cy + dy * k, 44 * k), S.start, 0, DS.c("ink"), 1, g); S.fill(circ(cx + dx * k - 22 * k, cy + dy * k - 22 * k, 14 * k), S.start, 0, DS.P.white[0], 1, g); if (i) tl.set(g, { opacity: 0 }, S.start); G.push(g); });
  G.forEach((g, i) => { if (i) { tl.set(G[i - 1], { opacity: 0 }, t + i * 0.33); tl.set(g, { opacity: 1 }, t + i * 0.33); } });
  S.draw(`M${cx - 300 * k} ${cy} Q${cx} ${cy - 250 * k} ${cx + 300 * k} ${cy} Q${cx} ${cy + 250 * k} ${cx - 300 * k} ${cy} Z`, S.start, 0, { c: DS.c("ink"), w: DS.w.near });
};
// Your eyes jump about three times a second.
{ const S = sc(127, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM.close);
  bigEye(S, 960, 560, 1.3, W(127, 2), 6);
  DS.card(S, "ABOUT 3 TIMES A SECOND", 960, 150, { size: DS.type.body, t: W(127, 4), tc: "red" });
  DS.vignette(S); }

// Every jump should make the room lurch, / and it doesn't, partly because your brain subtracts its own order.
{ const S = sc(128, 0, { cam: "none" }); DS.room(S, ROOM.home); homeKit(S);
  DS.plant(S, 1620, GN, 0.8);
  S.tilt(-5, W(128, 5), 0.18); S.tilt(5, W(128, 5) + 0.18, 0.18); S.tilt(0, W(128, 6) + 0.1, 0.4);
  DS.card(S, "THE ROOM SHOULD LURCH", 960, 150, { size: DS.type.body, t: W(128, 4) });
  const B = brainC(S, 960, 640, 0.75, { mood: "determined", arms: "hold", look: 0, t: W(129, 2) });
  DS.card(S, "IT SUBTRACTS ITS OWN ORDER", 1300, 520, { size: DS.type.small, t: W(129, 7), tc: "purple" });
  DS.vignette(S); }

// a male cricket (side view, facing right): slim body, folded wings, a big jumping hind leg, long antennae. Returns the ear (front leg) and the wings
const cricket = (S, cx, gy, k, o = {}) => { const t = o.t, X = (v) => cx + v * k, Y = (v) => gy + v * k, ink = DS.c("ink"), leg = DS.c("brown", 1);
  if (!o.float) DS.shadow(S, cx, gy, 420 * k, { t });
  S.draw(smooth([[X(150), Y(-112)], [X(110), Y(-220)], [X(-20), Y(-280)], [X(-210), Y(-262)]]), t ?? S.start, 0, { c: ink, w: DS.w.mid });
  S.draw(smooth([[X(164), Y(-108)], [X(176), Y(-230)], [X(90), Y(-320)], [X(-70), Y(-342)]]), t ?? S.start, 0, { c: ink, w: DS.w.mid });
  [[-10, -40, -26, 0], [110, -46, 136, 0]].forEach(([a, b, c, d]) => S.draw(line([X(a), Y(b)], [X(c), Y(d)], 0), t ?? S.start, 0, { c: DS.c("brown", 2), w: DS.w.mid }));
  S.draw(`M${X(-190)} ${Y(-60)} L${X(-246)} ${Y(-84)} M${X(-190)} ${Y(-54)} L${X(-244)} ${Y(-44)}`, t ?? S.start, 0, { c: DS.c("brown", 2), w: DS.w.mid });
  DS.shape(S, circ(X(-30), Y(-62), 170 * k, 42 * k), "brown", { t, tone: 1 });
  DS.shape(S, rrect(X(60), Y(-104), 70 * k, 76 * k, DS.r.md), "brown", { t, tone: 1 });
  const wing = S.grp(); DS.shape(S, `M${X(-196)} ${Y(-70)} Q${X(-90)} ${Y(-122)} ${X(80)} ${Y(-104)} L${X(70)} ${Y(-80)} Q${X(-80)} ${Y(-80)} ${X(-196)} ${Y(-70)} Z`, "earth", { t, parent: wing, tone: 2 });
  [[-150, -82, -50, -100], [-100, -84, 10, -98]].forEach(([a, b, c, d]) => S.draw(line([X(a), Y(b)], [X(c), Y(d)], 0), t ?? S.start, 0, { c: DS.c("brown", 2), w: DS.w.detail, parent: wing }));
  DS.shape(S, circ(X(160), Y(-82), 42 * k), "brown", { t, tone: 1 });
  DS.shape(S, circ(X(172), Y(-96), 17 * k), "white", { t, w: "detail" }); S.fill(circ(X(178), Y(-96), 8 * k), t ?? S.start, 0, ink, 1);
  S.draw(smooth([[X(178), Y(-62)], [X(190), Y(-56)], [X(198), Y(-64)]]), t ?? S.start, 0, { c: ink, w: DS.w.detail });
  DS.shape(S, capsule([X(-70), Y(-64)], [X(-170), Y(-196)], 26 * k), "brown", { t, tone: 2 });
  S.draw(`M${X(-172)} ${Y(-196)} L${X(-226)} ${Y(-6)} L${X(-266)} ${Y(-2)}`, t ?? S.start, 0, { c: leg, w: DS.w.near });
  S.draw(`M${X(30)} ${Y(-44)} L${X(10)} ${Y(-18)} L${X(22)} ${Y(0)}`, t ?? S.start, 0, { c: leg, w: DS.w.mid });
  S.draw(`M${X(120)} ${Y(-48)} L${X(150)} ${Y(-24)} L${X(176)} ${Y(0)} L${X(196)} ${Y(0)}`, t ?? S.start, 0, { c: leg, w: DS.w.mid });
  return { ear: [X(150), Y(-24)], wing };
};
const MEADOW = { sky: "night", sun: false, hy: 700 };
// Crickets do it with sound. A male cricket chirps at around a hundred decibels, / and its ears are on its front legs.
{ const S = sc(130, 0, { cam: "push", focus: "900 640" }); DS.outdoor(S, MEADOW);
  S.fill(circ(1600, 180, 50), S.start, 0, DS.c("yellow", 1), 1);
  const C = cricket(S, 860, 880, 1.6);
  wob(C.wing, W(130, 8), 3.0, 3, 860 + 70 * 1.6, 880 - 92 * 1.6, 0.07);
  waves(S, 1200, 640, 4, W(130, 8), { k: 1.6, c: DS.c("yellow", 1), w: DS.w.near });
  DS.card(S, "ABOUT 100 dB", 1460, 360, { size: DS.type.title, t: W(130, 12), tc: "red" });
  S.ring(C.ear[0], C.ear[1], 44, 44, W(131, 2), 0, { c: DS.c("yellow"), w: DS.w.near });
  DS.card(S, "EARS ON ITS FRONT LEGS", 1480, 820, { size: DS.type.caption, t: W(131, 2) });
  DS.card(S, "CRICKETS", 600, 150, { size: DS.type.body, t: W(130, 0) });
  DS.vignette(S); }

// a nerve cell: body, branches, a long axon
const neuron = (S, cx, cy, k, t) => { const ink = DS.c("ink");
  [[-1, -1], [-1.2, 0.2], [-0.6, 1], [0.4, -1.2]].forEach(([a, b]) => S.draw(smooth([[cx, cy], [cx + a * 60 * k, cy + b * 50 * k], [cx + a * 120 * k, cy + b * 90 * k]]), t ?? S.start, 0, { c: DS.c("purple", 2), w: DS.w.near }));
  S.draw(smooth([[cx, cy], [cx + 120 * k, cy + 20 * k], [cx + 260 * k, cy - 10 * k], [cx + 360 * k, cy + 20 * k]]), t ?? S.start, 0, { c: DS.c("purple", 2), w: DS.w.near });
  DS.shape(S, circ(cx, cy, 52 * k), "purple", { t }); S.fill(circ(cx, cy, 18 * k), t ?? S.start, 0, DS.c("purple", 2), 1);
};
// A single nerve cell turns its hearing down on every chirp, / so the cricket doesn't deafen itself with its own song.
{ const S = sc(132, 0, { cam: "push", focus: "960 600" }); DS.outdoor(S, MEADOW);
  const C = cricket(S, 520, 880, 1.0);
  wob(C.wing, S.start + 0.2, S.len, 3, 520 + 70, 880 - 92, 0.07);
  waves(S, 770, 730, 3, S.start + 0.2, { k: 1.0, c: DS.c("yellow", 1), w: DS.w.mid });
  neuron(S, 900, 420, 1.0, W(132, 1));
  DS.card(S, "ONE NERVE CELL", 1000, 150, { size: DS.type.body, t: W(132, 1) });
  knob(S, 1480, 430, 90, { t: W(132, 4), at: W(132, 6), a0: 110, a1: -110 }); txt(S, "HEARING", 1480, 600, { t: W(132, 4), size: DS.type.small, c: DS.P.white[0] });
  DS.card(S, "ITS OWN SONG", 1100, 760, { size: DS.type.small, t: W(133, 8) });
  DS.vignette(S); }

// Your brain does the same to your voice.
{ const S = sc(134, 0, { cam: "push", focus: "900 600" }); DS.room(S, ROOM.home); homeKit(S);
  const F = dave(S, 760, GN, "near", { mood: "happy", look: 6, pose: "wave" });
  waves(S, 850, F.hd[1] + 20, 3, S.start + 0.2, { k: 1.1 });
  knob(S, 1360, 520, 100, { t: W(134, 1), at: W(134, 5), a0: 110, a1: -100 }); txt(S, "YOUR VOICE", 1360, 700, { t: W(134, 1), size: DS.type.small });
  DS.card(S, "THE SAME TRICK", 960, 150, { size: DS.type.body, t: W(134, 2) });
  DS.vignette(S); }

// voice study halves: a speaker (left) and a recording (right), with a hearing-area meter each
const voiceLab = (S, o = {}) => {
  const F = person(S, 520, GN, "near", 1, { mood: "happy", look: 6, pose: "stand" });
  waves(S, 600, F.hd[1] + 20, 3, S.start + 0.2, { k: 1.0 });
  panel(S, 760, 620, 120, 340, S.start); bar(S, 760, 770, 60, 90, "orange", o.m1 ?? S.start + 0.3);
  txt(S, "while you speak", 520, 380, { t: o.m1, size: DS.type.caption });
  if (o.rec !== undefined) {
    DS.shape(S, rrect(1300, 560, 120, 220, DS.r.sm), "ink", { t: o.rec, tone: 1 }); DS.shape(S, rect(1316, 580, 88, 160), "sky", { t: o.rec, flat: true, w: "hair" });
    DS.shape(S, `M1346 630 L1380 660 L1346 690 Z`, "red", { t: o.rec, w: "hair" });
    waves(S, 1440, 660, 3, o.rec + 0.2, { k: 1.0 });
    panel(S, 1640, 620, 120, 340, o.rec); bar(S, 1640, 770, 60, 230, "orange", o.rec + 0.4);
    txt(S, "a recording", 1360, 480, { t: o.rec, size: DS.type.caption });
  }
};
// In two thousand two, a San Francisco team found your brain's hearing area reacts less to your voice while you speak
{ const S = sc(135, 0, { cam: "push", focus: "800 600" }); DS.room(S, ROOM.lab);
  nameCard(S, "HOUDE & TEAM", "San Francisco, 2002", 960, 170, { t: W(135, 5) });
  voiceLab(S, { m1: W(135, 13) });
  DS.card(S, "HEARING AREA", 1200, 420, { size: DS.type.small, t: W(135, 11) }); S.arrow(1080, 450, 830, 560, W(135, 11), 0, { c: DS.c("ink"), w: DS.w.mid });
  DS.card(S, "REACTS LESS", 1200, 700, { size: DS.type.small, t: W(135, 14), tc: "blue" });
  DS.vignette(S); }

// than to a recording of it, just as loud.
{ const S = sc(136, 0, { cam: "push", focus: "1100 600" }); DS.room(S, ROOM.lab);
  voiceLab(S, { m1: S.start, rec: W(136, 3) });
  DS.card(S, "JUST AS LOUD", 1100, 150, { size: DS.type.body, t: W(136, 6) });
  DS.vignette(S); }

// a big head in profile (facing right) with the ear, for the bone / air paths
const headSide = (S, cx, cy, k) => { DS.shape(S, `M${cx - 200 * k} ${cy + 40 * k} Q${cx - 230 * k} ${cy - 230 * k} ${cx} ${cy - 250 * k} Q${cx + 220 * k} ${cy - 250 * k} ${cx + 230 * k} ${cy - 40 * k} L${cx + 270 * k} ${cy + 30 * k} L${cx + 220 * k} ${cy + 50 * k} Q${cx + 230 * k} ${cy + 140 * k} ${cx + 160 * k} ${cy + 170 * k} L${cx + 60 * k} ${cy + 190 * k} L${cx + 40 * k} ${cy + 330 * k} L${cx - 120 * k} ${cy + 330 * k} L${cx - 110 * k} ${cy + 200 * k} Q${cx - 190 * k} ${cy + 150 * k} ${cx - 200 * k} ${cy + 40 * k} Z`, "white");
  DS.shape(S, circ(cx - 40 * k, cy + 10 * k, 46 * k, 64 * k), "white", { w: "mid" }); S.draw(smooth([[cx - 50 * k, cy - 20 * k], [cx - 26 * k, cy + 10 * k], [cx - 46 * k, cy + 40 * k]]), S.start, 0, { c: DS.c("gray", 2), w: DS.w.detail });
  S.fill(circ(cx + 150 * k, cy - 60 * k, 12 * k), S.start, 0, DS.c("ink"), 1);
  S.draw(line([cx + 190 * k, cy + 110 * k], [cx + 230 * k, cy + 104 * k], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.mid });
  return { mouth: [cx + 232 * k, cy + 106 * k], ear: [cx - 40 * k, cy + 10 * k] };
};
// A recording of your voice sounds strange partly because your skull normally carries it to your ears through bone.
{ const S = sc(137, 0, { cam: "push", focus: "900 560" }); DS.room(S, ROOM.board);
  const H = headSide(S, 860, 580, 1.15);
  dash(S.draw(smooth([[H.mouth[0] - 20, H.mouth[1] - 10], [H.mouth[0] - 160, H.mouth[1] - 40], [H.ear[0] + 70, H.ear[1] + 30]]), W(137, 17), 0, { c: DS.c("red"), w: DS.w.near }), 14, 12);
  const air = [[H.mouth[0] + 40, H.mouth[1] - 10], [H.mouth[0] + 170, H.mouth[1] - 220], [1000, 260], [700, 270], [560, 430], [H.ear[0] - 30, H.ear[1] - 40]];
  S.draw(smooth(air), W(137, 9), 0, { c: DS.c("blue"), w: DS.w.near }); S.draw(arrowHead(air[5][0], air[5][1], 0.9, 28), W(137, 9), 0, { c: DS.c("blue"), w: DS.w.near });
  txt(S, "through the air", 1440, 330, { t: W(137, 9), size: DS.type.small, c: DS.c("blue", 2) });
  DS.card(S, "THROUGH BONE", 1480, 780, { size: DS.type.body, t: W(137, 17), tc: "red" });
  DS.card(S, "WHY RECORDINGS SOUND ODD", 860, 150, { size: DS.type.small, t: W(137, 5) });
  DS.vignette(S); }

// But while you talk, your brain is turning you down.
{ const S = sc(138, 0, { cam: "push", focus: "900 560" }); DS.room(S, ROOM.board);
  const H = headSide(S, 860, 580, 1.15);
  waves(S, H.mouth[0] + 40, H.mouth[1], 3, S.start + 0.2, { k: 1.0 });
  knob(S, 1450, 320, 100, { t: S.start, at: W(138, 7), a0: 110, a1: -100 });
  DS.card(S, "TURNING YOU DOWN", 1520, 560, { size: DS.type.small, t: W(138, 7), tc: "blue" });
  DS.vignette(S); }

// You only notice the cancelling when it slips.
{ const S = sc(139, 0, { cam: "push", focus: "960 580" }); DS.room(S, ROOM.board);
  eqn(S, 960, 520, { touch: 1, pred: 0.96, felt: 0.04, minusOut: W(139, 6) });
  DS.card(S, "WHEN IT SLIPS", 960, 150, { size: DS.type.body, t: W(139, 5) });
  DS.vignette(S); }

// In two thousand, Blakemore's team tested fifty-six people,
{ const S = sc(140, 0, { cam: "pull", focus: "960 560" }); DS.room(S, ROOM.quiet);
  dotGrid(S, 960, 560, 56, 14, 84, 26, { t: W(140, 5), stag: 0.015, name: "white" });
  DS.card(S, "56 PEOPLE", 960, 260, { size: DS.type.body, t: W(140, 6) });
  nameCard(S, "BLAKEMORE'S TEAM", "2000", 960, 130, { t: W(140, 3) });
  DS.vignette(S); }

// including patients who heard voices, / or felt their movements were controlled from outside.
{ const S = sc(141, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM.quiet);
  dotGrid(S, 960, 470, 56, 14, 84, 26, { name: "white", fills: [[15, W(141, 1), 0.8, "sky"]] });
  panel(S, 600, 780, 560, 170, W(141, 3)); waves(S, 400, 780, 3, W(141, 3), { k: 0.8, c: DS.c("blue", 2) }); txt(S, "heard voices", 660, 794, { t: W(141, 3), size: DS.type.small });
  panel(S, 1320, 780, 560, 170, W(142, 1)); S.fill(circ(1110, 780, 20), W(142, 1), 0, DS.c("sky"), 1); [[-1, 0], [0, -1], [1, 0]].forEach(([a, b]) => S.arrow(1110 + a * 80, 780 + b * 60, 1110 + a * 30, 780 + b * 24, W(142, 5), 0, { c: DS.c("blue", 2), w: DS.w.mid }));
  txt(S, "felt controlled", 1390, 770, { t: W(142, 1), size: DS.type.caption }); txt(S, "from outside", 1390, 822, { t: W(142, 5), size: DS.type.caption });
  DS.vignette(S); }

// For most people, their own touch felt weaker. / For the patients with those experiences, / it felt as strong as someone else's.
{ const S = sc(143, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM.quiet);
  panel(S, 960, 560, 1520, 640, S.start);
  const B = 760; S.draw(line([260, B], [1660, B], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.mid });
  bar(S, 400, B, 150, 140, "navy", W(143, 3), "own touch", { size: DS.type.caption }); bar(S, 700, B, 150, 320, "gray", W(143, 3), "someone else's", { size: DS.type.caption });
  bar(S, 1220, B, 150, 310, "navy", W(145, 1), "own touch", { size: DS.type.caption }); bar(S, 1520, B, 150, 320, "gray", W(144, 2), "someone else's", { size: DS.type.caption });
  txt(S, "MOST PEOPLE", 550, 340, { t: W(143, 1), size: DS.type.small }); txt(S, "WITH THOSE EXPERIENCES", 1370, 340, { t: W(144, 2), size: DS.type.caption });
  DS.vignette(S); }

// It seemed to follow the experiences, not the diagnosis.
{ const S = sc(146, 0, { cam: "push", focus: "960 540" }); DS.room(S, ROOM.quiet);
  panel(S, 960, 420, 900, 150, W(146, 4)); S.text("the experiences", 900, 440, { size: DS.type.title, t: W(146, 4), c: DS.c("ink") }); tick(S, 1300, 420, 1.2, W(146, 5), "green");
  panel(S, 960, 640, 900, 150, W(146, 7), "paper"); S.text("the diagnosis", 900, 660, { size: DS.type.title, t: W(146, 7), c: DS.c("gray", 2) });
  DS.card(S, "IT FOLLOWED", 960, 170, { size: DS.type.body, t: W(146, 3) });
  DS.vignette(S); }

// a quiet room at night: window, an empty chair, and an inner voice drawn as a soft wave in a cloud
const quietRoom = (S) => { nightWin(S, 1300, 200, 240, 220); seat(S, 1420, 760, { name: "wood" }); };
const innerVoice = (S, cx, cy, t) => { S.thought(cx, cy, 300, 170, cx + 120, cy + 300, t, 0.3); S.draw(smooth([[cx - 200, cy], [cx - 130, cy - 50], [cx - 60, cy + 40], [cx + 10, cy - 50], [cx + 80, cy + 40], [cx + 150, cy - 40], [cx + 200, cy]]), t ?? S.start, 0, { c: DS.c("blue", 2), w: DS.w.near }); };
// One theory, still debated, is that the same cancelling tags your inner voice as yours.
{ const S = sc(147, 0, { cam: "push", focus: "900 560" }); DS.room(S, ROOM.quiet); quietRoom(S);
  innerVoice(S, 700, 520, S.start);
  S.draw(line([920, 560], [1010, 660], 0), W(147, 9), 0, { c: DS.c("ink"), w: DS.w.detail });
  DS.shape(S, `M990 650 L1120 650 L1150 690 L1120 730 L990 730 Z`, "yellow", { t: W(147, 9), w: "mid" }); S.text("MINE", 1064, 706, { size: DS.type.caption, t: W(147, 9), c: DS.c("ink") });
  DS.card(S, "ONE THEORY, STILL DEBATED", 960, 150, { size: DS.type.body, t: W(147, 1) });
  DS.vignette(S); }

// When the tag slips, your own thoughts can sound like someone else's.
{ const S = sc(148, 0, { cam: "push", focus: "900 560" }); DS.room(S, ROOM.quiet); quietRoom(S);
  innerVoice(S, 700, 520, S.start);
  const tg = S.grp(); S.draw(line([920, 560], [1010, 660], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.detail, parent: tg });
  DS.shape(S, `M990 650 L1120 650 L1150 690 L1120 730 L990 730 Z`, "yellow", { w: "mid", parent: tg }); S.text("MINE", 1064, 706, { size: DS.type.caption, c: DS.c("ink"), parent: tg });
  tl.to(tg, { y: 220, opacity: 0, duration: 1.0, ease: "power2.in" }, W(148, 3));
  S.text("?", 700, 330, { size: DS.type.display, t: W(148, 9), c: DS.P.white[0] });
  DS.card(S, "WHEN THE TAG SLIPS", 960, 150, { size: DS.type.body, t: W(148, 2) });
  DS.vignette(S); }

// If that's right, it isn't a failure of character. / It's a subtraction that didn't happen.
{ const S = sc(149, 0, { cam: "push", focus: "960 580" }); DS.room(S, ROOM.board);
  eqn(S, 960, 520, { touch: 1, pred: 0.96, felt: 1, minus: false, ts: { felt: W(150, 1) } });
  DS.card(S, "NOT A FAILURE OF CHARACTER", 960, 150, { size: DS.type.body, t: W(149, 5) });
  DS.vignette(S); }

// ===================== 8. It's just you =====================
// So Dave's brain isn't against him. / It's how he knows which hand is his.
{ const S = sc(151, 0, { cam: "push", focus: "960 600" }); DS.room(S, ROOM.home); homeKit(S);
  const F = dave(S, 1150, GN, "near", { mood: "smile", look: -5, pose: "point" });
  const B = brainC(S, 680, GN - 190 * 0.75, 0.75, { mood: "smile", arms: "point", look: 1 });
  const [hx, hy] = F.hand("R", "point");
  S.draw(line([hx + 6, hy + 10], [hx + 60, hy + 90], 0), W(152, 5), 0, { c: DS.c("ink"), w: DS.w.detail });
  DS.shape(S, `M${hx + 30} ${hy + 90} L${hx + 160} ${hy + 90} L${hx + 190} ${hy + 130} L${hx + 160} ${hy + 170} L${hx + 30} ${hy + 170} Z`, "yellow", { t: W(152, 5), w: "mid" }); S.text("HIS", hx + 104, hy + 146, { size: DS.type.caption, t: W(152, 5), c: DS.c("ink") });
  DS.card(S, "NOT AGAINST HIM", 960, 150, { size: DS.type.body, t: W(151, 3), tc: "green" });
  DS.vignette(S); }

// Dave gives up on immunity. / On Sunday, his sister goes for the armpit, / and Dave laughs until he loses the argument.
{ const S = sc(153, 0, { cam: "push", focus: "900 600" }); DS.room(S, ROOM.home); homeKit(S);
  const F = dave(S, 760, GN, "near", { mood: "smile", look: 6 });
  const ax = 760 + 34, ay = GN - 270;
  const G = sister(S, 990, GN, "near", { mood: "smile", look: -7, armL: armAt(990, GN, 1.0, "L", ax + 40, ay + 6, 1), pose: "hips", t: W(154, 3) });
  twoF(S, G, "L", W(154, 3), -1);
  laugh(S, F, W(155, 2), -1);
  DS.card(S, "SUNDAY", 960, 150, { size: DS.type.body, t: W(154, 1) });
  DS.card(S, "NO MORE TRAINING", 1400, 560, { size: DS.type.small, t: W(153, 1) });
  DS.card(S, "SHE WINS AGAIN", 1400, 700, { size: DS.type.small, t: W(155, 5), tc: "orange" });
  DS.vignette(S); }

// Turns out Dave was already immune / to exactly one person.
{ const S = sc(156, 0, { cam: "push", focus: "960 600" }); DS.room(S, ROOM.home); homeKit(S);
  const F = dave(S, 800, GN, "near", { s: 1.3, mood: "smile", look: 4, armR: armAt(800, GN, 1.3, "R", 836, 640, -1) });
  finger(S, F, "R", S.start, -1);
  DS.card(S, "ALREADY IMMUNE", 960, 150, { size: DS.type.title, t: W(156, 4), tc: "green" });
  DS.card(S, "TO EXACTLY 1 PERSON", 1380, 480, { size: DS.type.body, t: W(157, 1) });
  S.arrow(1180, 540, 920, 560, W(157, 3), 0, { bend: -0.2, c: DS.c("green"), w: DS.w.near });
  DS.vignette(S); }

// So, one more time. / Wiggle your fingertips lightly across your palm.
{ const S = sc(158, 0, { cam: "push", focus: "760 620" }); DS.room(S, ROOM.close);
  const H = palmPair(S);
  jig(H.B.g, W(159, 0), 3.0, 10, -6, 0.13);
  squig(S, H.px, H.py, W(159, 2), 1.3);
  DS.card(S, "ONE MORE TIME", 960, 150, { size: DS.type.title, t: W(158, 1) });
  DS.vignette(S); }

// Nothing. That nothing is your brain, cancelling you out, / the way it has every second of your life.
{ const S = sc(160, 0, { cam: "zoom", focus: "760 640" }); DS.room(S, ROOM.close);
  const H = palmPair(S);
  DS.card(S, "NOTHING", 1340, 300, { size: DS.type.display, t: W(160, 0) });
  brainC(S, 1360, 600, 0.6, { mood: "smile", arms: "wave", look: -1, t: W(160, 5), legs: false, float: true });
  DS.card(S, "EVERY SECOND OF YOUR LIFE", 1340, 860, { size: DS.type.small, t: W(161, 4) });
  DS.vignette(S); }

// Which is the brain's way of saying: / relax, it's just you.
{ const S = sc(162, 0, { cam: "push", focus: "1000 600" }); DS.room(S, ROOM.close);
  hand2(S, 420, 1000, 12, 1.4, { palm: true, sleeve: "navy", mirror: -1 });
  const B = brainC(S, 1000, 700, 0.95, { mood: "smile", arms: "rest", look: 0 });
  B.arms(W(163, 0), "wave");
  bub(S, 1360, 330, 640, 160, 1100, 540, ["Relax, it's just you."], W(163, 0), { size: DS.type.title });
  DS.vignette(S); }
