// helpers copied from ../scenes.js (same Dave, scoreboard, tangerines and brain as the video)
// What Happens If You Never Sleep? (~8:49). Mission: Dave wants Randy Gardner's 264 hours awake; Guinness closed the record in 1997, and his brain starts sleeping in pieces anyway.
// Runner object: DAVE'S SCOREBOARD "HOURS AWAKE 0 / 264": 17 at hour seventeen, 40 at hour forty, stamped CERTIFICATE: NO, then CANCELLED at bed time,
// flipped at the twist to "2 HOURS SHORT x 132 NIGHTS = 264", and back at 0 beside the bedtime alarm. Second runner: the bag of tangerines.
// Runner line: "Honestly, I feel totally fine." (speech bubble, the word FINE ringed). Real people are name plates on generic figures, never likenesses.
// Tone: curious, never scary. The 1964 hallucination is a cute mix-up (Randy waves at a street sign). Animal studies are calm and gore-free.

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
// Randy Gardner, 17 in 1964: black mop, orange tee (orange is his alone); in his sixties: grey crop, same orange
const randy = (S, x, gy, layer = "near", o = {}) => who(S, x, gy, layer, Object.assign({ s: 1.0, hair: "messy", hairC: DS.c("ink", 1), outfitC: DS.c("orange") }, o));
const oldRandy = (S, x, gy, layer = "near", o = {}) => who(S, x, gy, layer, Object.assign({ s: 1.1, hair: "short", hairC: DS.c("gray", 1), outfitC: DS.c("orange") }, o));
const OC = ["green", "purple", "pink", "gold", "red", "earth", "gray", "yellow"]; // no blue (Dave), no orange (Randy)
const HAIR = ["short", "bun", "curly", "side", "messy", "short", "bun", "curly"];
const HC = [["brown", 0], ["ink", 0], ["gray", 1], ["earth", 2], ["brown", 2], ["gray", 2], ["earth", 0], ["ink", 1]];
const person = (S, x, gy, layer, i, o = {}) => who(S, x, gy, layer, Object.assign({ s: 1.1, hair: HAIR[i % 8], hairC: DS.c(HC[i % 8][0], HC[i % 8][1], layer), outfitC: DS.c(OC[i % 8], 0, layer), mood: "flat", look: ((i % 3) - 1) * 5 }, o));
// generic researcher: white lab coat + ring glasses (outline only, nothing over the face)
const sci = (S, x, gy, layer = "near", o = {}) => { const F = who(S, x, gy, layer, Object.assign({ s: 1.1, hair: "short", hairC: DS.c("gray", 2), outfitC: DS.c("white") }, o)); specs(S, F, o.t, o.look || 0); return F; };
const specs = (S, F, t, look = 0) => { const R = F.r, fx = F.hd[0] + look * F.s * 0.8, fy = F.hd[1] - 0.08 * R; S.draw(circ(fx - 0.34 * R, fy, 0.3 * R) + circ(fx + 0.34 * R, fy, 0.3 * R) + `M${fx - 0.06 * R} ${fy} H${fx + 0.06 * R}`, t ?? S.start, 0, { c: DS.c("ink"), w: DS.w.detail, parent: F.g }); };
// radio host headphones: band over the head + ear cups at the sides (never over the face)
const phones = (S, F, t, name = "red") => { const R = F.r, [x, y] = F.hd; S.draw(arc(x, y - 0.05 * R, 1.12 * R, 180, 360), t ?? S.start, 0, { c: DS.c("ink"), w: DS.w.mid, parent: F.g }); [-1, 1].forEach((sd) => DS.shape(S, rrect(x + sd * 1.08 * R - 0.2 * R, y - 0.3 * R, 0.4 * R, 0.6 * R, DS.r.xs), name, { t, w: "detail", parent: F.g })); };
// navy officer's white peaked cap
const navyCap = (S, F, t) => { const R = F.r, [x, y] = F.hd; DS.shape(S, `M${x - 1.08 * R} ${y - 0.74 * R} Q${x} ${y - 1.7 * R} ${x + 1.08 * R} ${y - 0.74 * R} Z`, "white", { t, w: "detail", parent: F.g }); DS.shape(S, rrect(x - 0.98 * R, y - 0.86 * R, 1.96 * R, 0.2 * R, DS.r.xs), "navy", { t, w: "detail", parent: F.g }); DS.shape(S, circ(x, y - 1.12 * R, 0.13 * R), "gold", { t, w: "hair", parent: F.g }); };
// one eye shut, the other open (the dolphin method / frigatebird look); side = which eye (from the viewer) is shut
const wink = (S, F, t, side = 1, look = 0) => { const R = F.r, ex = F.hd[0] + look * F.s * 0.8 + side * 0.34 * R, ey = F.hd[1] - 0.08 * R; S.draw(circ(ex, ey, 0.27 * R), t ?? S.start, 0, { fill: DS.P.white[0], c: DS.P.white[0], w: DS.w.hair, parent: F.g }); S.draw(arc(ex, ey, 0.19 * R, 20, 160), t ?? S.start, 0, { c: DS.c("ink"), w: DS.w.mid, parent: F.g }); };
const sweat = (S, x, y, t) => DS.shape(S, smooth([[x, y - 22], [x - 11, y], [x - 9, y + 10], [x, y + 15], [x + 9, y + 10], [x + 11, y], [x, y - 22]]), "sky", { t, w: "detail" });
// a sleeper in bed: the figure lies on its back (head on the pillow at px,py), a blanket covers the body
const sleeper = (S, px, py, k, fn, o = {}) => { const cx = px + 309 * k, F = fn(S, cx, py, "near", Object.assign({ mood: "sleep" }, o, { s: k, float: true, parent: S.grp() })); F.gi.setAttribute("transform", `rotate(-90 ${cx} ${py})`); return F; };

// ---------- small kit ----------
let CP = 0;
const txt = (S, s, x, y, o = {}) => S.text(s, x, y, Object.assign({ size: DS.type.caption, c: DS.c("ink") }, o));
const panel = (S, cx, cy, w, h, t, name = "white", o = {}) => { DS.drop(S, rrect(cx - w / 2 + 8, cy - h / 2 + 12, w, h, DS.r.md), { t, parent: o.parent }); DS.shape(S, rrect(cx - w / 2, cy - h / 2, w, h, DS.r.md), name, { t, flat: true, w: "detail", tone: o.tone, parent: o.parent }); };
// speech bubble: the tail leaves the ellipse on the side facing (tx, ty), so it never crosses the words
const bubble = (S, cx, cy, rx, ry, tx, ty, t, parent) => {
  const a = Math.atan2((ty - cy) / ry, (tx - cx) / rx), P = (an, k = 1) => [cx + Math.cos(an) * rx * k, cy + Math.sin(an) * ry * k], e = P(a);
  const d = Math.hypot(tx - e[0], ty - e[1]) || 1, L = Math.min(80, d * 0.85), tip = [e[0] + ((tx - e[0]) / d) * L, e[1] + ((ty - e[1]) / d) * L], q = 0.2;
  S.draw(circ(cx, cy, rx, ry), t, 0, { fill: DS.P.white[0], c: DS.c("ink"), w: DS.w.mid, parent });
  S.fill(`M${P(a - q, 0.94).join(" ")} L${tip.join(" ")} L${P(a + q, 0.94).join(" ")} Z`, t, 0, DS.P.white[0], 1, parent);
  S.draw(`M${P(a - q).join(" ")} L${tip.join(" ")} L${P(a + q).join(" ")}`, t, 0, { c: DS.c("ink"), w: DS.w.mid, parent });
};
const say = (S, cx, cy, rx, ry, tx, ty, strs, t, o = {}) => {
  const g = S.grp(); if (o.think) S.thought(cx, cy, rx, ry, tx, ty, t, 0.3, { parent: g }); else bubble(S, cx, cy, rx, ry, tx, ty, t ?? S.start, g);
  const size = o.size || DS.type.small, n = strs.length;
  strs.forEach((s, i) => S.text(s, cx, cy + size * 0.36 + (i - (n - 1) / 2) * size * 1.2, { size, t, c: o.c ? DS.c(o.c, 2) : DS.c("ink"), parent: g }));
  return g;
};
// small name plate under a figure (not one of the picture's three labels)
const plate = (S, cx, cy, str, t, o = {}) => { const w = str.length * 25 + 48; DS.drop(S, rrect(cx - w / 2 + 4, cy - 26, w, 56, DS.r.sm), { t }); DS.shape(S, rrect(cx - w / 2, cy - 30, w, 56, DS.r.sm), o.fill || "white", { t, w: "detail", flat: true, tone: o.fill ? 1 : 0 }); S.text(str, cx, cy + 12, { size: DS.type.caption, t, c: DS.c("ink") }); };
const paperR = (S, x, y, w, h, o = {}) => { DS.drop(S, rect(x + 6, y + 8, w, h), { t: o.t, parent: o.parent }); DS.shape(S, rect(x, y, w, h), o.name || "white", { t: o.t, w: "detail", flat: true, parent: o.parent }); };
const lines = (S, x, y, w, n, t, gap = 36, parent) => { for (let i = 0; i < n; i++) S.draw(line([x, y + i * gap], [x + (i === n - 1 ? w * 0.6 : w), y + i * gap], 0), t ?? S.start, 0, { c: DS.c("gray", 1), w: DS.w.detail, parent }); };
const tick = (S, x, y, k, t, name = "green") => S.tick(x, y, k, t, 0, { c: DS.c(name), w: DS.w.near });
const xMark = (S, x, y, k, t) => S.cross(x, y, k, t, 0, { c: DS.c("red"), w: DS.w.near });
const ringIt = (S, cx, cy, rx, ry, t, name = "red") => S.draw(circ(cx, cy, rx, ry), t, 0, { c: DS.c(name), w: DS.w.near });
const stamp = (S, cx, cy, str, t, name = "red", o = {}) => {
  const g = S.grp(o.parent); g.setAttribute("data-layout-allow-overlap", ""); const size = o.size || DS.type.small, w = str.length * size * 0.66 + 60, h = size * 1.75, tf = (k) => `translate(${cx} ${cy}) rotate(${o.rot ?? -8}) scale(${k}) translate(${-cx} ${-cy})`;
  S.draw(rrect(cx - w / 2, cy - h / 2, w, h, DS.r.sm), S.start, 0, { c: DS.c(name, 2), w: DS.w.near, fill: DS.P.white[0], parent: g });
  S.text(str, cx, cy + size * 0.36, { size, t: S.start, c: DS.c(name, 2), parent: g });
  tl.fromTo(g, { opacity: 0, attr: { transform: tf(1.4) } }, { opacity: 1, attr: { transform: tf(1) }, duration: 0.25, ease: "power3.in" }, t);
  return g;
};
// seek-safe count-up of a number inside an existing text element
const countTo = (te, from, to, t, dur, fmt = (n) => String(Math.round(n))) => { const v = { n: from }; te.textContent = fmt(from); tl.fromTo(v, { n: from }, { n: to, duration: dur, ease: "power1.inOut", immediateRender: false, onUpdate: () => (te.textContent = fmt(v.n)) }, t); };
const spin = (g, t, dur, d0, d1, cx, cy, ease = "power2.inOut") => tl.fromTo(g, { attr: { transform: `rotate(${d0} ${cx} ${cy})` } }, { attr: { transform: `rotate(${d1} ${cx} ${cy})` }, duration: dur, ease, immediateRender: false }, t);
const rock = (g, t0, t1, deg, cx, cy, per = 1.3) => { const n = Math.max(1, Math.floor((t1 - t0) / per)); tl.fromTo(g, { attr: { transform: `rotate(${-deg} ${cx} ${cy})` } }, { attr: { transform: `rotate(${deg} ${cx} ${cy})` }, duration: per, ease: "sine.inOut", yoyo: true, repeat: n, immediateRender: false }, t0); g.setAttribute("transform", `rotate(${-deg} ${cx} ${cy})`); };
const slide = (g, t, dur, dx, dy, ease = "power2.inOut") => tl.fromTo(g, { attr: { transform: "translate(0 0)" } }, { attr: { transform: `translate(${dx} ${dy})` }, duration: dur, ease, immediateRender: false }, t);
const zz = (S, x, y, t, o = {}) => { const g = S.grp(o.parent); ["z", "z", "Z"].forEach((z, i) => S.text(z, x + i * 26, y - i * 30, { size: [DS.type.caption, DS.type.caption, DS.type.small][i], t: t + i * 0.25, c: o.c || DS.c("navy", 1), parent: g })); return g; };
const stopwatch = (S, cx, cy, r, o = {}) => {
  const t = o.t;
  DS.shape(S, rrect(cx - 18, cy - r - 46, 36, 34, DS.r.xs), "gray", { t, tone: 2, w: "detail" });
  DS.shape(S, circ(cx, cy, r), "white", { t });
  S.draw(rays(cx, cy, r * 0.8, r * 0.92, 12, -Math.PI / 2), t ?? S.start, 0, { c: DS.c("ink"), w: DS.w.detail });
  const hand = S.draw(line([cx, cy], [cx, cy - r * 0.75], 0), t ?? S.start, 0, { c: DS.c("red"), w: DS.w.near });
  if (o.turn) tl.fromTo(hand, { rotation: 0 }, { rotation: o.turn, svgOrigin: `${cx} ${cy}`, duration: o.dur || 4, ease: "none", immediateRender: false }, o.go ?? S.start);
  DS.shape(S, circ(cx, cy, 10), "ink", { t, w: "hair" });
};
const wallClock = (S, cx, cy, r, h, m, o = {}) => {
  const t = o.t, rad = (a) => (a * Math.PI) / 180, ha = ((h % 12) + m / 60) * 30 - 90, ma = m * 6 - 90;
  DS.shape(S, circ(cx, cy, r + 10), o.rim || "wood", { t, layer: o.layer || "near", w: "detail" }); DS.shape(S, circ(cx, cy, r), "white", { t, flat: true, w: "detail" });
  S.draw(rays(cx, cy, r * 0.78, r * 0.92, 12, -Math.PI / 2), t ?? S.start, 0, { c: DS.c("ink"), w: DS.w.detail });
  const mg = S.grp(), hg = S.grp();
  S.draw(line([cx, cy], [cx + Math.cos(rad(ma)) * r * 0.72, cy + Math.sin(rad(ma)) * r * 0.72], 0), t ?? S.start, 0, { c: DS.c("ink"), w: DS.w.mid, parent: mg });
  S.draw(line([cx, cy], [cx + Math.cos(rad(ha)) * r * 0.46, cy + Math.sin(rad(ha)) * r * 0.46], 0), t ?? S.start, 0, { c: DS.c("ink"), w: DS.w.near, parent: hg });
  DS.shape(S, circ(cx, cy, Math.max(5, r * 0.07)), "red", { t, w: "hair" });
  return { spin: (t0, d, turns) => { spin(mg, t0, d, 0, 360 * turns, cx, cy, "power1.inOut"); spin(hg, t0, d, 0, 30 * turns, cx, cy, "power1.inOut"); } };
};
const moonIcon = (S, cx, cy, r, t, o = {}) => DS.shape(S, `M${cx + r * 0.2} ${cy - r} A${r} ${r} 0 1 0 ${cx + r} ${cy + r * 0.25} A${r * 0.78} ${r * 0.78} 0 1 1 ${cx + r * 0.2} ${cy - r} Z`, o.name || "yellow", { t, w: o.w || "detail", flat: true, tone: 1, parent: o.parent });
const sunIcon = (S, cx, cy, r, t, o = {}) => { S.draw(rays(cx, cy, r * 1.3, r * 1.7, 10, 0), t ?? S.start, 0, { c: DS.c("orange", 2), w: DS.w.mid, parent: o.parent }); DS.shape(S, circ(cx, cy, r), "yellow", { t, w: "detail", parent: o.parent }); };
const warnSign = (S, cx, cy, r, t) => { DS.shape(S, `M${cx} ${cy - r} L${cx + r * 1.1} ${cy + r * 0.8} L${cx - r * 1.1} ${cy + r * 0.8} Z`, "yellow", { t, w: "near" }); S.draw(line([cx, cy - r * 0.4], [cx, cy + r * 0.22], 0), t ?? S.start, 0, { c: DS.c("ink"), w: DS.w.near * 1.6 }); DS.shape(S, circ(cx, cy + r * 0.52, r * 0.09), "ink", { t, w: "hair" }); };
// bar: x centre, base y, height; grows up on its word
const bar = (S, cx, base, w, h, name, t, str, o = {}) => { const g = S.grp(); DS.shape(S, rect(cx - w / 2, base - h, w, h), name, { t, dir: "h", parent: g }); tl.fromTo(g, { attr: { transform: `translate(0 ${base}) scale(1 0.001) translate(0 ${-base})` } }, { attr: { transform: `translate(0 ${base}) scale(1 1) translate(0 ${-base})` }, duration: 0.6, ease: "power2.out", immediateRender: false }, t ?? S.start); if (str) txt(S, str, cx, base + 50, { t, size: o.size || DS.type.caption }); return g; };
const wboard = (S, x, y, w, h, t) => { DS.drop(S, rect(x + 8, y + 10, w, h), { t }); DS.shape(S, rrect(x, y, w, h, DS.r.sm), "wood", { layer: "mid", t }); DS.shape(S, rect(x + 22, y + 22, w - 44, h - 44), "white", { layer: "mid", w: "detail", flat: true, t }); };
const desk = (S, x, gy, w, name = "wood") => { DS.shadow(S, x + w / 2, gy, w); DS.shape(S, rrect(x, gy - 230, w, 40, DS.r.xs), name); [x + 30, x + w - 50].forEach((lx) => DS.shape(S, rect(lx, gy - 190, 20, 190), name, { w: "mid" })); return gy - 230; };
const table = (S, x0, x1, top, gy = 960, name = "wood") => { DS.shadow(S, (x0 + x1) / 2, gy, x1 - x0 + 60); DS.shape(S, rect(x0 + 24, top + 20, x1 - x0 - 48, gy - top - 20), name, { tone: 2 }); DS.shape(S, rrect(x0, top, x1 - x0, 28, DS.r.xs), name); return top; };
const tile = (S, cx, cy, str, t, draw, o = {}) => { const w = o.tw || 300, h = o.th || 330; panel(S, cx, cy, w, h, t); if (draw) draw(cx, cy - 24); if (str) txt(S, str, cx, cy + h / 2 - 30, { t }); };

// ---------- the runner: Dave's scoreboard ----------
// o.n = number shown, o.from + o.go + o.dur = count-up, o.rows = [line1, line2, big] for the twist, o.k = scale (sizes snap to the type scale)
const scoreboard = (S, cx, cy, o = {}) => {
  const t = o.t, k = o.k || 1, big = k >= 0.9, w = 600 * k, h = (o.rows ? 420 : 340) * k, x = cx - w / 2, y = cy - h / 2, g = S.grp();
  DS.drop(S, rrect(x + 10, y + 14, w, h, DS.r.lg), { t, parent: g });
  DS.shape(S, rrect(x, y, w, h, DS.r.lg), "gray", { t, tone: 2, parent: g });
  [x + 34 * k, x + w - 34 * k].forEach((bx) => DS.shape(S, circ(bx, y + 40 * k, 12 * k), "yellow", { t, w: "hair", parent: g }));
  S.text(o.head || "HOURS AWAKE", cx, y + 56 * k, { size: big ? DS.type.small : DS.type.caption, t, c: DS.P.white[0], parent: g });
  DS.shape(S, rrect(x + 30 * k, y + 84 * k, w - 60 * k, h - 114 * k, DS.r.md), "ink", { t, flat: true, w: "detail", parent: g });
  let te;
  if (o.rows) {
    const [a, b, c] = o.rows, rt = o.rowT || [t, t, t];
    S.text(a, cx, y + 160 * k, { size: big ? DS.type.small : DS.type.caption, t: rt[0], c: DS.c("yellow", 1), parent: g });
    S.text(b, cx, y + 236 * k, { size: big ? DS.type.small : DS.type.caption, t: rt[1], c: DS.c("yellow", 1), parent: g });
    te = S.text(c, cx, y + 352 * k, { size: big ? DS.type.display : DS.type.title, t: rt[2], c: DS.c("yellow"), parent: g });
  } else {
    te = S.text(String(o.n ?? 0), cx - 70 * k, y + 238 * k, { size: big ? DS.type.display : DS.type.title, t, c: DS.c("yellow"), parent: g });
    S.text("/ 264", cx + 150 * k, y + 232 * k, { size: big ? DS.type.body : DS.type.small, t, c: DS.P.white[0], parent: g });
    if (o.from !== undefined) countTo(te, o.from, o.n, o.go, o.dur || 1.2);
  }
  return { g, te, x, y, w, h };
};
// mesh bag of tangerines; o.bowl = a bowl of three instead
const tangerine = (S, cx, cy, r, t, parent) => { DS.shape(S, circ(cx, cy, r), "orange", { t, w: "detail", parent }); DS.shape(S, `M${cx} ${cy - r} q${r * 0.5} ${-r * 0.5} ${r * 0.8} ${-r * 0.15} q${-r * 0.4} ${r * 0.35} ${-r * 0.8} ${r * 0.15} Z`, "green", { t, w: "hair", parent }); S.fill(circ(cx - r * 0.35, cy - r * 0.35, r * 0.18), t ?? S.start, 0, DS.c("orange", 1), 1, parent); };
const tangerines = (S, cx, base, k = 1, o = {}) => {
  const t = o.t, g = S.grp();
  DS.shadow(S, cx, base, 220 * k, { t, parent: g });
  if (o.bowl) {
    [[-46, -70], [46, -70], [0, -100]].forEach(([dx, dy]) => tangerine(S, cx + dx * k, base + dy * k, 40 * k, t, g));
    DS.shape(S, `M${cx - 120 * k} ${base - 70 * k} Q${cx} ${base + 40 * k} ${cx + 120 * k} ${base - 70 * k} Z`, "sky", { t, parent: g });
    return g;
  }
  [[-52, -50], [10, -46], [64, -54], [-24, -112], [40, -116], [8, -170]].forEach(([dx, dy]) => tangerine(S, cx + dx * k, base + dy * k, 40 * k, t, g));
  let d = ""; for (let i = -4; i <= 4; i++) d += line([cx + (i * 30 - 70) * k, base], [cx + (i * 30 + 40) * k, base - 210 * k], 0) + line([cx + (i * 30 + 70) * k, base], [cx + (i * 30 - 40) * k, base - 210 * k], 0);
  const mesh = S.draw(d, t ?? S.start, 0, { c: DS.c("red", 2), w: DS.w.hair, parent: g }); clipTo(mesh, `M${cx - 110 * k} ${base} Q${cx - 120 * k} ${base - 150 * k} ${cx - 20 * k} ${base - 205 * k} L${cx + 20 * k} ${base - 205 * k} Q${cx + 120 * k} ${base - 150 * k} ${cx + 110 * k} ${base} Z`);
  DS.shape(S, rrect(cx - 26 * k, base - 228 * k, 52 * k, 26 * k, DS.r.xs), "red", { t, w: "detail", parent: g });
  return g;
};
const clipTo = (g, d) => { const id = "cp" + ++CP, cp = el("clipPath", { id }, dsDefs()); el("path", { d }, cp); g.setAttribute("clip-path", `url(#${id})`); return g; };

// ---------- sets ----------
const LEGS = { legL: [[100, 2], [200, 4]], legR: [[100, 8], [204, 12]] }; // sitting up in bed, legs under the blanket
const ROOM = { den: { wall: "night", floor: "wood", window: false }, lab: { wall: "glass", floor: "gray", window: false }, board: { wall: "paper", floor: "wood", window: false, back: [170, 56, 1750, 830] },
  home64: { wall: "wall", floor: "wood", window: [1300, 170, 220, 200] }, hall: { wall: "sand", floor: "wood", window: false }, kitchen: { wall: "night", floor: "gray", window: false } };
const GN = 960;
const nightWin = (S, x, y, w, h, o = {}) => {
  DS.shape(S, rrect(x - 14, y - 14, w + 28, h + 28, DS.r.xs), "white", { w: "detail" });
  DS.shape(S, rect(x, y, w, h), "night", { flat: true, tone: 2, w: "hair" });
  [[0.2, 0.2], [0.35, 0.62], [0.15, 0.8], [0.5, 0.14], [0.82, 0.72], [0.62, 0.86]].forEach(([a, b]) => S.fill(circ(x + w * a, y + h * b, 4), S.start, 0, DS.P.white[0], 0.85));
  if (o.moon !== false) moonIcon(S, x + w * 0.7, y + h * 0.32, Math.min(w, h) * 0.13, S.start);
  S.draw(`M${x + w / 2} ${y} V${y + h} M${x} ${y + h / 2} H${x + w}`, S.start, 0, { c: DS.P.white[0], w: DS.w.mid });
};
const couch = (S, x, gy, w, name = "purple") => {
  DS.shadow(S, x + w / 2, gy, w + 80);
  DS.shape(S, rrect(x + 10, gy - 330, w - 20, 210, DS.r.lg), name);
  DS.shape(S, rrect(x, gy - 140, w, 100, DS.r.md), name);
  [x - 40, x + w - 30].forEach((ax) => DS.shape(S, rrect(ax, gy - 220, 70, 180, DS.r.md), name));
  [x + 30, x + w - 50].forEach((lx) => DS.shape(S, rect(lx, gy - 40, 20, 40), "wood", { w: "mid" }));
  return gy - 132;
};
const sideTable = (S, cx, gy, w = 200, h = 230) => { DS.shadow(S, cx, gy, w + 30); DS.shape(S, rect(cx - w / 2 + 20, gy - h, 22, h), "wood", { w: "mid" }); DS.shape(S, rect(cx + w / 2 - 42, gy - h, 22, h), "wood", { w: "mid" }); DS.shape(S, rrect(cx - w / 2, gy - h - 26, w, 30, DS.r.xs), "wood"); return gy - h - 26; };
const lamp = (S, cx, gy, t) => { DS.shadow(S, cx, gy, 140, { t }); DS.shape(S, rect(cx - 8, gy - 520, 16, 520), "gray", { t, tone: 2, w: "mid" }); DS.shape(S, `M${cx - 90} ${gy - 520} L${cx + 90} ${gy - 520} L${cx + 60} ${gy - 640} L${cx - 60} ${gy - 640} Z`, "yellow", { t }); };
// Dave's den at night: scoreboard on the back wall, window right, side table with the tangerines. o.board = scoreboard options
const den = (S, o = {}) => { // call after DS.room(S, ROOM.den)
  nightWin(S, 1300, 170, 210, 200);
  const B = o.board === false ? null : scoreboard(S, o.bx || 760, o.by || 330, Object.assign({ k: 0.9 }, o.board || {}));
  if (o.lamp !== false) lamp(S, 250, GN);
  if (o.tang !== false) { const top = sideTable(S, 1580, GN); tangerines(S, 1580, top, 0.62, { t: o.tangT }); }
  return B;
};
// a bed (headboard on the left); returns the pillow point and mattress top
const bed = (S, x, gy, w, o = {}) => {
  const t = o.t, top = gy - 170;
  DS.shadow(S, x + w / 2, gy, w + 60, { t });
  DS.shape(S, rrect(x - 30, gy - 380, 60, 380, DS.r.sm), o.wood || "wood", { t });
  DS.shape(S, rect(x + w - 26, gy - 250, 40, 250), o.wood || "wood", { t });
  DS.shape(S, rect(x + 10, top + 60, w - 20, 110), o.wood || "wood", { t, tone: 2 });
  DS.shape(S, rrect(x + 10, top, w - 20, 80, DS.r.md), "white", { t, flat: true });
  DS.shape(S, rrect(x + 40, top - 56, 190, 76, DS.r.lg), "white", { t, tone: 1 });
  return { px: x + 132, py: top - 16, top, lap: (name = o.blanket || "sky") => DS.shape(S, `M${x + 250} ${top - 40} Q${x + w * 0.7} ${top - 70} ${x + w - 30} ${top - 40} L${x + w - 10} ${top + 90} L${x + 240} ${top + 90} Z`, name, { t }), bl: (k = 1, name = o.blanket || "sky") => DS.shape(S, `M${x + 200} ${top - 70 * k} Q${x + w * 0.6} ${top - 110 * k} ${x + w - 30} ${top - 60 * k} L${x + w - 10} ${top + 90} L${x + 190} ${top + 90} Z`, name, { t }) };
};

// ---------- 1964 + record-holder props ----------
// glass radio booth: back glass, wooden floor, desk + microphone, ON AIR sign; only the frame sits in front of the host
const booth = (S, cx, gy, w, h, o = {}) => {
  const t = o.t, x = cx - w / 2, y = gy - h;
  DS.shadow(S, cx, gy, w + 60, { t });
  DS.shape(S, rect(x, y, w, h), "glass", { t, flat: true, layer: "mid", w: "detail" });
  return { front: () => {
    DS.shape(S, rect(x - 10, gy - 20, w + 20, 30), "wood", { t });
    [x, x + w].forEach((px) => DS.shape(S, rect(px - 12, y, 24, h), "gray", { t, tone: 2, w: "detail" }));
    DS.shape(S, rect(x - 12, y - 16, w + 24, 30), "gray", { t, tone: 2, w: "detail" });
    S.draw(line([x + 40, y + 120], [x + 110, y + 40], 0) + line([x + 40, y + 190], [x + 170, y + 50], 0), t ?? S.start, 0, { c: DS.P.white[0], w: DS.w.mid });
    DS.shape(S, rrect(cx - 110, y - 96, 220, 66, DS.r.sm), "red", { t, tone: 2, w: "detail", flat: true });
    S.text("ON AIR", cx, y - 48, { size: DS.type.caption, t, c: DS.P.white[0] });
  } };
};
const mic = (S, x, base, k = 1, t) => { DS.shape(S, rect(x - 5 * k, base - 120 * k, 10 * k, 120 * k), "gray", { t, tone: 2, w: "detail" }); DS.shape(S, rrect(x - 22 * k, base - 170 * k, 44 * k, 64 * k, DS.r.lg), "gray", { t, w: "detail" }); DS.shape(S, rrect(x - 40 * k, base - 8 * k, 80 * k, 14 * k, DS.r.xs), "gray", { t, tone: 2, w: "detail" }); };
// pinball machine seen from the player's end: legs, front panel, playfield in perspective, backbox with a score window
const pinball = (S, cx, gy, k = 1, o = {}) => {
  const t = o.t, f = (v) => v * k, top = gy - f(330), back = gy - f(560);
  DS.shadow(S, cx, gy, f(420), { t });
  [[-150, 0], [150, 0], [-110, -230], [110, -230]].forEach(([dx, dy]) => DS.shape(S, rect(cx + f(dx) - f(9), gy - f(200) + f(dy) * 0.2, f(18), f(200) - f(dy) * 0.2), "ink", { t, w: "detail", flat: true, tone: 1 }));
  DS.shape(S, rrect(cx - f(150), back - f(300), f(300), f(310), DS.r.md), o.name || "purple", { t });
  DS.shape(S, rrect(cx - f(118), back - f(270), f(236), f(140), DS.r.sm), "ink", { t, flat: true, w: "detail" });
  const scr = [cx, back - f(200)];
  DS.shape(S, `M${cx - f(180)} ${top} L${cx + f(180)} ${top} L${cx + f(132)} ${back} L${cx - f(132)} ${back} Z`, "navy", { t, flat: true, tone: 1 });
  [[-60, 0.62, "red"], [50, 0.5, "yellow"], [-10, 0.32, "sky"]].forEach(([dx, fy, n]) => DS.shape(S, circ(cx + f(dx) * (1 - fy * 0.25), top + (back - top) * fy, f(24), f(16)), n, { t, w: "detail" }));
  DS.shape(S, `M${cx - f(110)} ${top - f(24)} L${cx - f(30)} ${top - f(12)} L${cx - f(34)} ${top - f(2)} L${cx - f(112)} ${top - f(10)} Z`, "white", { t, w: "detail", flat: true });
  DS.shape(S, `M${cx + f(110)} ${top - f(24)} L${cx + f(30)} ${top - f(12)} L${cx + f(34)} ${top - f(2)} L${cx + f(112)} ${top - f(10)} Z`, "white", { t, w: "detail", flat: true });
  const ball = DS.shape(S, circ(cx + f(20), top + (back - top) * 0.2, f(11)), "gray", { t, w: "detail", tone: 1 });
  DS.shape(S, rect(cx - f(180), top, f(360), f(130)), o.name || "purple", { t, tone: 2 });
  DS.shape(S, rrect(cx - f(36), top + f(30), f(72), f(70), DS.r.xs), "gray", { t, w: "detail" });
  return { scr, ball, top };
};

// ---------- animals ----------
// cute rat / mouse, facing right (o.flip = left). o.eyes "open"|"shut"; o.cap = a tiny brain recorder with a wire
const rat = (S, x, gy, k = 1, o = {}) => {
  const t = o.t, g = S.grp(o.parent), f = (v) => v * k, fl = o.flip ? -1 : 1, X = (v) => x + fl * f(v);
  DS.shadow(S, x, gy, f(170), { t, parent: g });
  S.draw(`M${X(-70)} ${gy - f(20)} Q${X(-150)} ${gy - f(10)} ${X(-160)} ${gy - f(70)}`, t ?? S.start, 0, { c: DS.c("pink", 2), w: DS.w.mid, parent: g });
  DS.shape(S, circ(x, gy - f(46), f(80), f(48)), o.name || "gray", { t, tone: 1, parent: g, w: "mid" });
  DS.shape(S, `M${X(48)} ${gy - f(86)} Q${X(110)} ${gy - f(82)} ${X(128)} ${gy - f(46)} Q${X(100)} ${gy - f(28)} ${X(56)} ${gy - f(30)} Z`, o.name || "gray", { t, tone: 1, parent: g, w: "mid" });
  DS.shape(S, circ(X(40), gy - f(96), f(24)), "gray", { t, tone: 1, parent: g, w: "detail" }); DS.shape(S, circ(X(40), gy - f(96), f(13)), "pink", { t, parent: g, w: "hair", flat: true });
  DS.shape(S, circ(X(128), gy - f(48), f(8)), "pink", { t, parent: g, w: "hair", flat: true, tone: 2 });
  if (o.eyes === "shut") S.draw(arc(X(82), gy - f(64), f(8), 20, 160), t ?? S.start, 0, { c: DS.c("ink"), w: DS.w.detail, parent: g });
  else { DS.shape(S, circ(X(82), gy - f(64), f(7)), "ink", { t, parent: g, w: "hair", flat: true }); S.fill(circ(X(80), gy - f(66), f(2.4)), t ?? S.start, 0, DS.P.white[0], 1, g); }
  S.draw(line([X(118), gy - f(40)], [X(150), gy - f(30)], 0) + line([X(118), gy - f(46)], [X(152), gy - f(48)], 0), t ?? S.start, 0, { c: DS.c("ink", 1), w: DS.w.hair, parent: g });
  [[-30, 0], [30, 0]].forEach(([dx]) => DS.shape(S, circ(X(dx), gy - f(4), f(13), f(7)), "pink", { t, parent: g, w: "hair", flat: true }));
  if (o.cap) { DS.shape(S, rrect(X(4) - f(16), gy - f(116), f(32), f(22), DS.r.xs), "ink", { t, parent: g, w: "hair", flat: true, tone: 1 }); DS.shape(S, circ(X(4), gy - f(122), f(5)), "red", { t, parent: g, w: "hair", flat: true }); }
  return { g, head: [X(70), gy - f(64)], cap: [X(4), gy - f(118)], nose: [X(130), gy - f(48)] };
};
// dolphin, side view facing right, centre (cx, cy): round melon, short beak, hooked dorsal fin, pale belly, a smile. o.eye "open"|"shut"
const dolphin = (S, cx, cy, k = 1, o = {}) => {
  const t = o.t, g = S.grp(o.parent), P = (pts) => pts.map(([a, b]) => [cx + a * k, cy + b * k]);
  DS.shape(S, smooth(P([[-150, -6], [-196, -46], [-206, -36], [-180, -2], [-206, 34], [-196, 44], [-150, 8]])) + " Z", "sky", { t, parent: g, tone: 2 });
  DS.shape(S, `M${cx - 56 * k} ${cy - 52 * k} Q${cx - 40 * k} ${cy - 104 * k} ${cx - 86 * k} ${cy - 122 * k} Q${cx - 6 * k} ${cy - 104 * k} ${cx + 4 * k} ${cy - 56 * k} Z`, "sky", { t, parent: g, tone: 2 });
  DS.shape(S, smooth(P([[-160, -4], [-90, -40], [0, -62], [70, -66], [118, -50], [138, -22], [150, -8], [184, -4], [190, 6], [160, 14], [118, 24], [40, 50], [-60, 40], [-160, 8], [-160, -4]])), "sky", { t, parent: g, tone: 2 });
  DS.shape(S, smooth(P([[-70, 32], [10, 44], [100, 26], [150, 14], [110, 12], [20, 22], [-70, 32]])), "white", { t, parent: g, w: "hair", flat: true });
  DS.shape(S, smooth(P([[30, 36], [10, 84], [70, 40]])) + " Z", "sky", { t, parent: g, tone: 2, w: "detail" });
  S.draw(smooth(P([[186, 4], [160, 10], [134, 4], [124, -4]])), t ?? S.start, 0, { c: DS.c("ink"), w: DS.w.detail, parent: g });
  const [ex, ey] = [cx + 104 * k, cy - 22 * k];
  if (o.eye === "shut") S.draw(arc(ex, ey, 10 * k, 20, 160), t ?? S.start, 0, { c: DS.c("ink"), w: DS.w.mid, parent: g });
  else { DS.shape(S, circ(ex, ey, 11 * k), "ink", { t, parent: g, w: "hair", flat: true }); S.fill(circ(ex - 3 * k, ey - 4 * k, 3.6 * k), t ?? S.start, 0, DS.P.white[0], 1, g); }
  return g;
};
// mallard duck, front view, sitting; o.L / o.R = "open"|"shut" for the duck's eye on the viewer's left / right
const duck = (S, cx, base, k = 1, o = {}) => {
  const t = o.t, g = S.grp(o.parent), f = (v) => v * k;
  DS.shadow(S, cx, base, f(180), { t, parent: g });
  DS.shape(S, circ(cx, base - f(70), f(92), f(70)), "gray", { t, parent: g, tone: 1 });
  DS.shape(S, circ(cx, base - f(92), f(58), f(42)), "brown", { t, parent: g, tone: 1, w: "detail" });
  S.draw(arc(cx, base - f(128), f(38), 20, 160, f(14)), t ?? S.start, 0, { c: DS.P.white[0], w: DS.w.mid, parent: g });
  DS.shape(S, circ(cx, base - f(176), f(50), f(48)), "green", { t, parent: g });
  DS.shape(S, `M${cx - f(26)} ${base - f(160)} Q${cx} ${base - f(176)} ${cx + f(26)} ${base - f(160)} Q${cx + f(30)} ${base - f(128)} ${cx} ${base - f(124)} Q${cx - f(30)} ${base - f(128)} ${cx - f(26)} ${base - f(160)} Z`, "orange", { t, parent: g, w: "detail" });
  [["L", -1], ["R", 1]].forEach(([s, sd]) => {
    const ex = cx + sd * f(24), ey = base - f(188);
    const ot = o[s + "t"];
    if ((o[s] || "shut") !== "open" || ot) S.draw(arc(ex, ey, f(9), 20, 160), t ?? S.start, 0, { c: DS.c("ink"), w: DS.w.mid, parent: g });
    if ((o[s] || "shut") === "open") { const eg = S.grp(g); DS.shape(S, circ(ex, ey, f(12)), "white", { t: ot ?? t, parent: eg, w: "detail", flat: true }); DS.shape(S, circ(ex + sd * f(4), ey, f(5.5)), "ink", { t: ot ?? t, parent: eg, w: "hair", flat: true }); }
  });
  return { g, eye: (sd) => [cx + sd * f(24), base - f(188)] };
};
// great frigatebird in flight, facing right: long bent wings, forked tail, hooked bill, red throat pouch. o.eye "open"|"shut"
const frigate = (S, cx, cy, k = 1, o = {}) => {
  const t = o.t, g = S.grp(o.parent), P = (pts) => pts.map(([a, b]) => [cx + a * k, cy + b * k]);
  DS.shape(S, poly(P([[-10, -14], [-80, -120], [-250, -170], [-120, -110], [-50, -10]]), 0) + " Z", "ink", { t, parent: g, flat: true, tone: 1, w: "detail" });
  DS.shape(S, poly(P([[-120, 2], [-250, -30], [-268, -14], [-140, 14]]), 0) + " Z", "ink", { t, parent: g, flat: true, tone: 1, w: "detail" });
  DS.shape(S, poly(P([[-120, 8], [-262, 44], [-250, 58], [-130, 20]]), 0) + " Z", "ink", { t, parent: g, flat: true, tone: 1, w: "detail" });
  DS.shape(S, smooth(P([[-140, 0], [-60, -24], [40, -26], [100, -16], [120, 4], [80, 22], [-40, 22], [-140, 10], [-140, 0]])), "ink", { t, parent: g, flat: true, tone: 1 });
  DS.shape(S, circ(cx + 70 * k, cy + 22 * k, 30 * k, 22 * k), "red", { t, parent: g, w: "detail" });
  DS.shape(S, smooth(P([[110, -12], [190, -6], [204, 4], [196, 10], [186, 2], [116, 6]])), "gray", { t, parent: g, w: "detail", tone: 1 });
  DS.shape(S, poly(P([[20, -20], [70, -110], [250, -150], [100, -60], [50, -12]]), 0) + " Z", "ink", { t, parent: g, flat: true, w: "detail" });
  const [ex, ey] = [cx + 104 * k, cy - 8 * k];
  if (o.eye === "shut") S.draw(arc(ex, ey, 8 * k, 20, 160), t ?? S.start, 0, { c: DS.P.white[0], w: DS.w.mid, parent: g });
  else { DS.shape(S, circ(ex, ey, 9 * k), "white", { t, parent: g, w: "hair", flat: true }); DS.shape(S, circ(ex + 2 * k, ey, 4.5 * k), "ink", { t, parent: g, w: "hair", flat: true }); }
  if (o.cap) { DS.shape(S, rrect(cx + 50 * k, cy - 48 * k, 40 * k, 22 * k, DS.r.xs), "gray", { t: o.capT ?? t, parent: g, w: "hair", tone: 1 }); DS.shape(S, circ(cx + 90 * k, cy - 50 * k, 5 * k), "green", { t: o.capT ?? t, parent: g, w: "hair", flat: true }); }
  return g;
};
// top-view brain: two hemispheres. o.L / o.R = "awake" (pink) | "asleep" (night blue + z). o.at = times when a half falls asleep
const HEMI = (cx, cy, k, sd) => `M${cx + sd * 8 * k} ${cy - 150 * k} C${cx + sd * 120 * k} ${cy - 160 * k} ${cx + sd * 170 * k} ${cy - 70 * k} ${cx + sd * 166 * k} ${cy + 10 * k} C${cx + sd * 160 * k} ${cy + 120 * k} ${cx + sd * 90 * k} ${cy + 168 * k} ${cx + sd * 8 * k} ${cy + 156 * k} Z`;
const brainTop = (S, cx, cy, k = 1, o = {}) => {
  const t = o.t, g = S.grp(o.parent), halves = {};
  [["L", -1], ["R", 1]].forEach(([s, sd]) => {
    DS.shape(S, HEMI(cx, cy, k, sd), "pink", { t, parent: g });
    S.draw(smooth([[cx + sd * 40 * k, cy - 110 * k], [cx + sd * 90 * k, cy - 70 * k], [cx + sd * 60 * k, cy - 20 * k], [cx + sd * 120 * k, cy + 20 * k]]) + smooth([[cx + sd * 40 * k, cy + 30 * k], [cx + sd * 80 * k, cy + 80 * k], [cx + sd * 50 * k, cy + 120 * k]]), t ?? S.start, 0, { c: DS.c("pink", 2), w: DS.w.mid, parent: g });
    const sl = S.grp(g);
    DS.shape(S, HEMI(cx, cy, k, sd), "night", { parent: sl, t: S.start });
    zz(S, cx + sd * 84 * k - 30, cy + 10 * k, S.start, { parent: sl, c: DS.P.white[0] });
    const st = o[s] === "asleep" ? (o.at && o.at[s]) ?? S.start : null;
    if (st === null) sl.setAttribute("opacity", 0); else if (st > S.start + 0.05) tl.fromTo(sl, { opacity: 0 }, { opacity: 1, duration: 0.4 }, st);
    halves[s] = sl;
  });
  return { g, halves };
};
// brain map for local sleep: two hemispheres full of lit cells; groups switch off (dark + small z) at given times
const CELLS = (cx, cy, k) => { const P = []; for (let r = -6; r <= 6; r++) for (let c = -7; c <= 7; c++) { const x = c * 21 * k + (r % 2) * 10 * k, y = r * 22 * k; const sd = x < 0 ? -1 : 1, ax = Math.abs(x); if (ax < 14 * k) continue; if (((ax - 85 * k) / (82 * k)) ** 2 + (y / (150 * k)) ** 2 > 0.92) continue; P.push([cx + x, cy + y, sd]); } return P; };
const brainMap = (S, cx, cy, k = 1, o = {}) => {
  const t = o.t, g = S.grp(o.parent);
  [-1, 1].forEach((sd) => DS.shape(S, HEMI(cx, cy, k, sd), "pink", { t, parent: g, tone: 1 }));
  const P = CELLS(cx, cy, k);
  P.forEach(([x, y]) => S.draw(circ(x, y, 6.5 * k), t ?? S.start, 0, { fill: DS.c("yellow"), c: DS.c("orange", 2), w: DS.w.hair, parent: g }));
  // patches: [centreX, centreY, radius] in brain units; each switches off at its time
  (o.off || []).forEach(([px, py, pr, at]) => {
    const pg = S.grp(g);
    P.filter(([x, y]) => (x - (cx + px * k)) ** 2 + (y - (cy + py * k)) ** 2 < (pr * k) ** 2).forEach(([x, y]) => S.draw(circ(x, y, 6.5 * k), S.start, 0, { fill: DS.c("navy", 1), c: DS.c("navy", 2), w: DS.w.hair, parent: pg }));
    if (o.z !== false) zz(S, cx + px * k - 20, cy + py * k - pr * k * 0.2, S.start, { parent: pg, c: DS.c("navy", 2) });
    if (at > S.start + 0.05) tl.fromTo(pg, { opacity: 0 }, { opacity: 1, duration: 0.35 }, at);
  });
  return g;
};

// ---------- cues ----------
// open record book on a lectern: left page title + lines, right page a little stick figure + "264 HRS"
const recordBook = (S, cx, cy, w, h, o = {}) => {
  const t = o.t, x0 = cx - w / 2, x1 = cx + w / 2, y0 = cy - h / 2, y1 = cy + h / 2;
  DS.shadow(S, cx, GN, w * 0.5, { t }); DS.shape(S, rect(cx - 24, y1, 48, GN - y1), "wood", { t, tone: 2, w: "mid" }); DS.shape(S, rrect(cx - 110, GN - 30, 220, 30, DS.r.xs), "wood", { t, w: "mid" });
  DS.shape(S, rrect(x0 - 20, y0 - 10, w + 40, h + 30, DS.r.sm), "red", { t, tone: 2 });
  DS.shape(S, `M${x0} ${y0 + 10} Q${(x0 + cx) / 2} ${y0 - 14} ${cx} ${y0 + 6} L${cx} ${y1} Q${(x0 + cx) / 2} ${y1 - 18} ${x0} ${y1 - 4} Z`, "white", { t, flat: true, w: "detail" });
  DS.shape(S, `M${x1} ${y0 + 10} Q${(x1 + cx) / 2} ${y0 - 14} ${cx} ${y0 + 6} L${cx} ${y1} Q${(x1 + cx) / 2} ${y1 - 18} ${x1} ${y1 - 4} Z`, "white", { t, flat: true, w: "detail" });
  txt(S, o.title || "LONGEST TIME AWAKE", (x0 + cx) / 2, y0 + 80, { t, size: DS.type.caption });
  lines(S, x0 + 50, y0 + 140, (cx - x0) - 100, 5, t, 46);
  const fx = (x1 + cx) / 2; S.draw(circ(fx, y0 + 110, 30), t ?? S.start, 0, { c: DS.c("ink"), w: DS.w.mid }); S.draw(`M${fx} ${y0 + 140} V${y0 + 230} M${fx - 50} ${y0 + 175} H${fx + 50} M${fx} ${y0 + 230} L${fx - 40} ${y0 + 290} M${fx} ${y0 + 230} L${fx + 40} ${y0 + 290}`, t ?? S.start, 0, { c: DS.c("ink"), w: DS.w.mid });
  txt(S, o.right || "264 HRS", fx, y1 - 50, { t, size: DS.type.small, c: DS.c("red", 2) });
  return { L: [(x0 + cx) / 2, cy], R: [fx, cy] };
};
// gauge dial (top half circle). Values run 0..o.max; needle swings between values; o.ticks = [[v, label]], o.bands = [[a, b, colour]]
const gauge = (S, cx, cy, r, o = {}) => {
  const t = o.t, mx = o.max || 0.12, GA = (v) => 180 + (v / mx) * 180, rad = (a) => (a * Math.PI) / 180, P = (a, k) => [cx + Math.cos(rad(a)) * r * k, cy + Math.sin(rad(a)) * r * k];
  DS.shape(S, `M${cx - r - 30} ${cy + 40} L${cx - r - 30} ${cy} A${r + 30} ${r + 30} 0 0 1 ${cx + r + 30} ${cy} L${cx + r + 30} ${cy + 40} Z`, "white", { t, flat: true, w: "mid" });
  (o.bands || [[0, 0.05, "green"], [0.05, 0.1, "yellow"], [0.1, 0.12, "red"]]).forEach(([a, b, n]) => S.draw(`M${P(GA(a), 0.86).join(" ")} A${r * 0.86} ${r * 0.86} 0 0 1 ${P(GA(b), 0.86).join(" ")}`, t ?? S.start, 0, { c: DS.c(n), w: DS.w.near * 3 }));
  (o.ticks || [[0, "0"], [0.05, "0.05%"], [0.1, "0.1%"]]).forEach(([v, s]) => { S.draw(line(P(GA(v), 0.7), P(GA(v), 1.0), 0), t ?? S.start, 0, { c: DS.c("ink"), w: DS.w.mid }); const [lx, ly] = P(GA(v), 1.34); txt(S, s, lx, ly + 14, { t, size: DS.type.caption }); });
  const ng = S.grp(); S.draw(line([cx, cy], [cx + r * 0.78, cy], 0), t ?? S.start, 0, { c: DS.c("red", 2), w: DS.w.near * 1.4, parent: ng }); DS.shape(S, circ(cx, cy, 18), "ink", { t, w: "hair" });
  ng.setAttribute("transform", `rotate(${GA(o.v0 || 0)} ${cx} ${cy})`);
  (o.moves || []).forEach(([a, b, tt]) => spin(ng, tt, 0.8, GA(a), GA(b), cx, cy, "back.out(1.4)"));
  txt(S, o.label || "BLOOD ALCOHOL", cx, cy + 84, { t, size: DS.type.caption });
};
const snail = (S, x, base, k = 1, t) => {
  DS.shadow(S, x, base, 220 * k, { t });
  DS.shape(S, `M${x - 110 * k} ${base} Q${x - 120 * k} ${base - 30 * k} ${x - 60 * k} ${base - 30 * k} L${x + 70 * k} ${base - 30 * k} Q${x + 100 * k} ${base - 90 * k} ${x + 120 * k} ${base - 40 * k} Q${x + 130 * k} ${base} ${x + 80 * k} ${base} Z`, "sand", { t, w: "mid" });
  [[96, -112], [118, -104]].forEach(([dx, dy]) => { S.draw(line([x + 104 * k, base - 70 * k], [x + dx * k, base + dy * k], 0), t ?? S.start, 0, { c: DS.c("ink"), w: DS.w.mid }); DS.shape(S, circ(x + dx * k, base + dy * k, 7 * k), "ink", { t, w: "hair", flat: true }); });
  DS.shape(S, circ(x - 10 * k, base - 90 * k, 70 * k), "gold", { t });
  S.draw(smooth([[x - 10 * k, base - 90 * k], [x + 12 * k, base - 104 * k], [x + 4 * k, base - 130 * k], [x - 34 * k, base - 120 * k], [x - 50 * k, base - 80 * k], [x - 24 * k, base - 40 * k], [x + 30 * k, base - 48 * k], [x + 56 * k, base - 92 * k]]), t ?? S.start, 0, { c: DS.c("gold", 2), w: DS.w.mid });
};
const roadSign = (S, x, gy, str, t) => { DS.shadow(S, x, gy, 90, { t }); DS.shape(S, rect(x - 9, gy - 420, 18, 420), "gray", { t, tone: 2, w: "mid" }); DS.shape(S, rrect(x - 130, gy - 640, 260, 230, DS.r.sm), "white", { t, w: "mid" }); S.draw(rrect(x - 112, gy - 622, 224, 194, DS.r.xs), t ?? S.start, 0, { c: DS.c("red"), w: DS.w.near * 1.6 }); txt(S, "LIMIT", x, gy - 560, { t, size: DS.type.small }); txt(S, str, x, gy - 470, { t, size: DS.type.title }); };
// water glass (sober)
const glassW = (S, cx, base, k, t) => { DS.shape(S, `M${cx - 34 * k} ${base - 110 * k} L${cx + 34 * k} ${base - 110 * k} L${cx + 26 * k} ${base} L${cx - 26 * k} ${base} Z`, "glass", { t, w: "detail" }); DS.shape(S, `M${cx - 31 * k} ${base - 80 * k} L${cx + 31 * k} ${base - 80 * k} L${cx + 26 * k} ${base - 4 * k} L${cx - 26 * k} ${base - 4 * k} Z`, "sky", { t, w: "hair", flat: true }); };
// mini booth icon for tiles
const miniBooth = (S, cx, cy, t) => { DS.shape(S, rect(cx - 80, cy - 90, 160, 180), "glass", { t, flat: true, w: "detail" }); const F = person(S, cx, cy + 90, "near", 1, { s: 0.42, t, mood: "smile", float: true }); phones(S, F, t); [cx - 80, cx + 80].forEach((x) => DS.shape(S, rect(x - 7, cy - 90, 14, 180), "gray", { t, tone: 2, w: "hair" })); DS.shape(S, rrect(cx - 56, cy - 128, 112, 34, DS.r.xs), "red", { t, tone: 2, flat: true, w: "hair" }); };

// ===================== 1. The record attempt =====================
// This is Dave, and tonight, Dave is not going to sleep. / Not tonight, not tomorrow, not for eleven days.

// He has a scoreboard, a bag of tangerines, and a target: / two hundred and sixty-four hours awake.

// "How hard can it be? I'm just not doing something."

// But in nineteen ninety-seven, the Guinness record book stopped accepting this record. / Dave is about to find out why.

// roadmap: four tiles (glass box, pinball, a bird that naps in flight, you)
const TX = [370, 750, 1130, 1510], TY = 540;
const roadTiles = (S, ts) => {
  if (ts[0] !== undefined) tile(S, TX[0], TY, "A GLASS BOX", ts[0], (x, y) => miniBooth(S, x, y, ts[0]), { tw: 364, th: 400 });
  if (ts[1] !== undefined) tile(S, TX[1], TY, "PINBALL", ts[1], (x, y) => { pinball(S, x + 30, y + 150, 0.42, { t: ts[1] }); randy(S, x - 90, y + 150, "near", { s: 0.5, t: ts[1], mood: "happy", look: 5, float: true }); }, { tw: 364, th: 400 });
  if (ts[2] !== undefined) tile(S, TX[2], TY, "NAPS IN FLIGHT", ts[2], (x, y) => { frigate(S, x + 10, y + 10, 0.5, { t: ts[2], eye: "shut" }); zz(S, x + 70, y - 60, ts[2]); }, { tw: 364, th: 400 });
  if (ts[3] !== undefined) tile(S, TX[3], TY, "YOU", ts[3], (x, y) => { S.draw(circ(x, y - 50, 46), ts[3], 0, { c: DS.c("gray", 2), w: DS.w.mid }); S.draw(`M${x - 80} ${y + 120} Q${x} ${y - 10} ${x + 80} ${y + 120}`, ts[3], 0, { c: DS.c("gray", 2), w: DS.w.mid }); S.text("?", x, y - 30, { size: DS.type.body, t: ts[3], c: DS.c("gray", 2) }); }, { tw: 364, th: 400 });
};
// So, what happens if you never sleep? / We'll follow Dave hour by hour, with a radio host in a glass box,

// a teenager who beat a sleep scientist at pinball, / and a bird that naps while flying.

// And one more contestant, quietly attempting this record for years: you.

// ===================== 2. Hour seventeen =====================
// By hour seventeen, it's nearly midnight, and Dave feels great.

// In two thousand, Ann Williamson and Anne-Marie Feyer in Sydney tested thirty-nine transport workers and soldiers.

// After seventeen to nineteen hours awake, / some of their scores matched what they got at...

// zero point zero five percent blood alcohol, or worse. / In Australia, that's the drink-driving limit.

// Stay up longer, and it hit zero point one percent.

// Dave is stone-cold sober. His reaction times are not.

// Ask him how he feels. / "Honestly, I feel totally fine." / Remember that word. It comes back.

// ---------- section 3 props ----------
// night skyline with lit windows and blank billboards (far plane)
const city = (S, hy, parent) => {
  [[60, 250, 300, "navy"], [330, 170, 250, "purple"], [560, 270, 290, "navy"], [830, 210, 250, "night"], [1060, 300, 270, "navy"], [1310, 190, 250, "purple"], [1540, 280, 330, "navy"]].forEach(([x, top, w, n], i) => {
    DS.shape(S, rect(x, top, w, hy - top + 10), n, { layer: "far", flat: true, tone: 1, w: "far", parent });
    for (let r = 0; r < Math.floor((hy - top - 60) / 70); r++) for (let c = 0; c < Math.floor((w - 20) / 60); c++) if ((r * 7 + c * 3 + i) % 4) S.fill(rect(x + 22 + c * 60, top + 30 + r * 70, 26, 36), S.start, 0, DS.c("yellow", 1, "far"), 0.85, parent);
  });
  [[370, 240, 180, 110, "red"], [1090, 340, 200, 120, "sky"], [1600, 330, 200, 110, "green"]].forEach(([x, y, w, h, n]) => DS.shape(S, rect(x, y, w, h), n, { layer: "far", flat: true, w: "far", tone: 1, parent }));
};
const palm = (S, x, gy, k = 1) => {
  DS.shadow(S, x, gy, 160 * k);
  DS.shape(S, `M${x - 18 * k} ${gy} Q${x - 40 * k} ${gy - 260 * k} ${x + 30 * k} ${gy - 470 * k} L${x + 56 * k} ${gy - 462 * k} Q${x - 4 * k} ${gy - 260 * k} ${x + 22 * k} ${gy} Z`, "wood", { w: "mid" });
  [[-200, -400], [-160, -540], [40, -600], [220, -520], [240, -380]].forEach(([dx, dy]) => DS.shape(S, `M${x + 42 * k} ${gy - 470 * k} Q${x + (42 + dx * 0.5) * k} ${gy + (dy - 90) * k} ${x + (42 + dx) * k} ${gy + dy * k} Q${x + (42 + dx * 0.55) * k} ${gy + (dy - 10) * k} ${x + 42 * k} ${gy - 470 * k} Z`, "green", { w: "mid" }));
};
const openBookHeld = (S, cx, cy, str, t) => { DS.shape(S, rrect(cx - 110, cy - 80, 220, 150, DS.r.xs), "red", { t, tone: 2, w: "mid" }); S.draw(line([cx, cy - 80], [cx, cy + 70], 0), t ?? S.start, 0, { c: DS.c("red", 1), w: DS.w.detail }); txt(S, str, cx + 52, cy + 6, { t, size: DS.type.caption, c: DS.P.white[0] }); };
const fairHall = (S, o = {}) => {
  if (o.banner !== false) { DS.shape(S, rrect(560, 120, 800, 110, DS.r.sm), "blue", { layer: "mid", flat: true, w: "mid" }); S.text("SCIENCE FAIR", 960, 196, { size: DS.type.title, c: DS.P.white[0] }); }
  [[420, "green"], [1500, "purple"]].forEach(([x, n]) => { DS.shape(S, rect(x - 140, 600, 280, 140), "wood", { layer: "mid" }); DS.shape(S, rrect(x - 150, 590, 300, 20, DS.r.xs), "wood", { layer: "mid", tone: 1 });
    DS.shape(S, `M${x - 160} 590 L${x - 90} 420 L${x - 90} 590 Z`, n, { layer: "mid", tone: 1 }); DS.shape(S, rect(x - 90, 410, 180, 180), "white", { layer: "mid", flat: true, w: "detail" }); DS.shape(S, `M${x + 160} 590 L${x + 90} 420 L${x + 90} 590 Z`, n, { layer: "mid", tone: 1 });
    DS.shape(S, rect(x - 70, 430, 140, 30), n, { layer: "mid", flat: true, w: "hair" }); [480, 520, 556].forEach((y) => S.draw(line([x - 66, y], [x + 66, y], 0), S.start, 0, { c: DS.c("gray", 1, "mid"), w: DS.w.hair })); });
};
const trifold = (S, cx, base, o = {}) => { const t = o.t; DS.shadow(S, cx, base + 200, 400, { t }); DS.shape(S, rect(cx - 190, base, 380, 200), "wood", { t, tone: 2 }); DS.shape(S, rrect(cx - 200, base - 16, 400, 26, DS.r.xs), "wood", { t });
  DS.shape(S, `M${cx - 250} ${base - 16} L${cx - 160} ${base - 300} L${cx - 160} ${base - 16} Z`, "white", { t, flat: true, w: "detail", tone: 2 }); DS.shape(S, rect(cx - 160, base - 316, 320, 300), "white", { t, flat: true, w: "detail" }); DS.shape(S, `M${cx + 250} ${base - 16} L${cx + 160} ${base - 300} L${cx + 160} ${base - 16} Z`, "white", { t, flat: true, w: "detail", tone: 2 });
  txt(S, o.title || "STAY AWAKE?", cx, base - 260, { t, size: DS.type.caption }); if (o.icon !== false) { moonIcon(S, cx - 50, base - 150, 40, t); S.draw(line([cx - 90, base - 110], [cx - 10, base - 190], 0), t ?? S.start, 0, { c: DS.c("red"), w: DS.w.mid }); S.text("264", cx + 50, base - 130, { size: DS.type.small, t, c: DS.c("red", 2) }); } };
const coin = (S, cx, cy, t) => { const g = S.grp(); DS.shape(S, circ(cx, cy, 40), "gold", { t, w: "mid", parent: g }); S.draw(circ(cx, cy, 28), t ?? S.start, 0, { c: DS.c("gold", 2), w: DS.w.detail, parent: g }); txt(S, "1", cx, cy + 14, { t, size: DS.type.caption, c: DS.c("gold", 2), parent: g });
  [[-1, 0], [1, 0]].forEach(([sd]) => S.draw(arc(cx, cy, 64, sd < 0 ? 200 : 20, sd < 0 ? 250 : 70), t ?? S.start, 0, { c: DS.c("gray", 2), w: DS.w.mid, parent: g })); return g; };
const swirl = (S, x, y, t) => S.draw(smooth([[x, y], [x + 16, y - 10], [x + 8, y - 30], [x - 14, y - 26], [x - 22, y], [x - 6, y + 22], [x + 26, y + 20], [x + 40, y - 6]]), t ?? S.start, 0, { c: DS.c("green", 2), w: DS.w.mid });
// picture-in-picture panel on a set (another time and place); returns its ground y
const inset = (S, cx, cy, w, h, t, name = "night") => { panel(S, cx, cy, w, h, t, name); DS.shape(S, rect(cx - w / 2 + 4, cy + h / 2 - 130, w - 8, 124), "wood", { t, flat: true, w: "hair", tone: 1 }); return cy + h / 2 - 50; };
const jail = (S, x, gy, t) => {
  DS.shadow(S, x + 420, gy, 900, { t });
  DS.shape(S, rect(x, gy - 520, 840, 520), "gray", { t, layer: "mid", tone: 1 });
  for (let r = 0; r < 7; r++) S.draw(line([x, gy - 520 + r * 74], [x + 840, gy - 520 + r * 74], 0), t ?? S.start, 0, { c: DS.c("gray", 2, "mid"), w: DS.w.hair });
  DS.shape(S, rect(x - 20, gy - 560, 880, 46), "gray", { t, layer: "mid", tone: 2 });
  DS.shape(S, rrect(x + 280, gy - 660, 280, 90, DS.r.sm), "white", { t, w: "mid" }); S.text("JAIL", x + 420, gy - 596, { size: DS.type.title, t, c: DS.c("ink") });
  [x + 90, x + 610].forEach((wx) => { DS.shape(S, rect(wx, gy - 420, 150, 150), "ink", { t, flat: true, tone: 1, w: "mid" }); for (let i = 1; i < 5; i++) S.draw(line([wx + i * 30, gy - 420], [wx + i * 30, gy - 270], 0), t ?? S.start, 0, { c: DS.c("gray", 1), w: DS.w.mid }); });
  DS.shape(S, rect(x + 330, gy - 300, 180, 300), "wood", { t, tone: 2 });
  DS.shape(S, rrect(x + 350, gy - 260, 140, 60, DS.r.sm), "yellow", { t, w: "detail" }); S.text("OPEN", x + 420, gy - 216, { size: DS.type.caption, t, c: DS.c("ink") });
  return [x + 420, gy - 230];
};
const sign = (S, x, gy, t) => { // a street sign that looks a bit like a person: round sign "head", street-name blades for arms
  DS.shadow(S, x, gy, 120, { t });
  DS.shape(S, rect(x - 10, gy - 470, 20, 470), "gray", { t, tone: 2, w: "mid" });
  DS.shape(S, rrect(x - 190, gy - 420, 380, 64, DS.r.xs), "green", { t, tone: 2, w: "mid" }); S.text("ELM ST", x, gy - 372, { size: DS.type.caption, t, c: DS.P.white[0] });
  DS.shape(S, circ(x, gy - 540, 80), "white", { t, w: "mid" }); S.draw(circ(x, gy - 540, 62), t ?? S.start, 0, { c: DS.c("red"), w: DS.w.near * 1.6 }); S.text("25", x, gy - 518, { size: DS.type.body, t, c: DS.c("ink") });
};
const helmet = (S, cx, cy, k, t) => { DS.shape(S, `M${cx - 60 * k} ${cy + 30 * k} Q${cx - 70 * k} ${cy - 70 * k} ${cx + 10 * k} ${cy - 70 * k} Q${cx + 80 * k} ${cy - 66 * k} ${cx + 66 * k} ${cy + 20 * k} L${cx + 20 * k} ${cy + 36 * k} Z`, "red", { t, w: "mid" }); S.draw(`M${cx + 30 * k} ${cy + 10 * k} H${cx + 96 * k} M${cx + 40 * k} ${cy + 34 * k} H${cx + 92 * k} M${cx + 92 * k} ${cy + 6 * k} V${cy + 40 * k}`, t ?? S.start, 0, { c: DS.c("gray", 2), w: DS.w.mid }); S.draw(`M${cx - 4 * k} ${cy - 70 * k} Q${cx - 30 * k} ${cy - 10 * k} ${cx - 10 * k} ${cy + 32 * k}`, t ?? S.start, 0, { c: DS.P.white[0], w: DS.w.mid }); };
const football = (S, cx, cy, k, t) => { DS.shape(S, `M${cx - 60 * k} ${cy} Q${cx} ${cy - 50 * k} ${cx + 60 * k} ${cy} Q${cx} ${cy + 50 * k} ${cx - 60 * k} ${cy} Z`, "brown", { t, w: "mid", tone: 1 }); S.draw(`M${cx - 24 * k} ${cy} H${cx + 24 * k} M${cx - 14 * k} ${cy - 8 * k} V${cy + 8 * k} M${cx} ${cy - 8 * k} V${cy + 8 * k} M${cx + 14 * k} ${cy - 8 * k} V${cy + 8 * k}`, t ?? S.start, 0, { c: DS.P.white[0], w: DS.w.detail }); };
// Ross's notebook, close up (lined paper on a desk)
const notebookCU = (S, o = {}) => { DS.drop(S, rect(436, 96, 1050, 820)); DS.shape(S, rect(420, 80, 1050, 820), "white", { flat: true, w: "detail" }); for (let i = 0; i < 9; i++) S.draw(line([460, 230 + i * 76], [1430, 230 + i * 76], 0), S.start, 0, { c: DS.c("sky"), w: DS.w.hair }); S.draw(line([540, 100], [540, 880], 0), S.start, 0, { c: DS.c("red", 1), w: DS.w.hair }); for (let i = 0; i < 8; i++) S.draw(circ(450, 140 + i * 100, 10), S.start, 0, { c: DS.c("gray", 1), w: DS.w.detail }); };
const PEN = DS.c("blue", 2);
const hand = (str, x, y, t, o = {}) => (S) => S.text(str, x, y, Object.assign({ size: DS.type.title, font: "caveat", anchor: "start", t, c: PEN }, o));
const cert = (S, cx, cy, w, h, rows, o = {}) => { const t = o.t; DS.drop(S, rect(cx - w / 2 + 10, cy - h / 2 + 14, w, h), { t }); DS.shape(S, rect(cx - w / 2, cy - h / 2, w, h), "paper", { t, flat: true, w: "mid" }); S.draw(rect(cx - w / 2 + 24, cy - h / 2 + 24, w - 48, h - 48), t ?? S.start, 0, { c: DS.c("gold", 2), w: DS.w.detail });
  rows.forEach(([s, dy, size, name, rt]) => S.text(s, cx, cy + dy, { size, t: rt ?? t, c: name ? DS.c(name, 2) : DS.c("ink") }));
  const sx = cx + w / 2 - 110, sy = cy + h / 2 - 100; [[-24, 70], [24, 70]].forEach(([dx, dy]) => DS.shape(S, `M${sx} ${sy} L${sx + dx} ${sy + dy} L${sx + dx * 0.4} ${sy + dy * 0.8} Z`, "red", { t, w: "detail" })); DS.shape(S, circ(sx, sy, 46), "gold", { t, w: "detail" }); S.draw(circ(sx, sy, 32), t ?? S.start, 0, { c: DS.c("gold", 2), w: DS.w.detail }); };

// ===================== 3. The science fair =====================
// Dave studies the record holders. In nineteen fifty-nine, radio host Peter Tripp...

// broadcast from a glass booth in Times Square, without sleeping, for charity. / He lasted two hundred and one hours,

// while a rival in Florida lasted two hundred and twenty-five.

// The Florida host was called Dave. Daves have been at this for a while.

// Then, over the New Year of nineteen sixty-four, a San Diego seventeen-year-old, Randy Gardner, went for it, for a science fair.

// He and two friends flipped a coin to see who would be the experiment. Randy lost.

// By day three, Randy felt sick every morning, and found that tangerines helped. / That's why Dave brought the tangerines.

// At three in the morning, Randy went to visit the local jail. / Why? He's not sure. Probably because it was open.

// And on day ten, the teenager who hadn't slept in ten days / beat a Stanford sleep scientist, William Dement, at pinball.

// So far, it sounds almost easy. / But a navy medical officer, John Ross, was keeping notes.

// By day four, he was moody, forgetful, and unable to concentrate.

// Then came his first hallucination: / he mistook a street sign for a person.

// Next, he became convinced he was a famous football player. / He was, in fact, a science fair project.

// On day eleven, Ross asked him to count down from a hundred in sevens.

// A hundred, ninety-three, eighty-six, seventy-nine, seventy-two, sixty-five.
const SEVENS = ["100", "93", "86", "79", "72", "65"];
const sevens = (S, ts) => SEVENS.forEach((n, i) => { const x = 620 + (i % 3) * 270, y = 400 + Math.floor(i / 3) * 228; hand(n, x, y, ts[i], { size: DS.type.display, anchor: "middle" })(S); if (i % 3) hand("–7", x - 135, y - 70, ts[i], { size: DS.type.small, anchor: "middle", c: DS.c("red", 2) })(S); });

// Then he stopped, and Ross asked him why. / He'd forgotten what he was doing.

// At two hundred and sixty-four hours, Randy went to bed.
const room64bed = (S, o = {}) => { const Bd = bed(S, 620, GN, 580, { blanket: "orange" }); const top = sideTable(S, 1380, GN, 180, 200); tangerine(S, 1380, top - 30, 30, S.start); return Bd; };

// He slept nearly fifteen hours, and woke up, in his words, no groggier than a normal person.

// So that's the answer? Eleven days, one long nap, back to normal? / Not quite. Even Randy's record has holes in it.

// ---------- section 4-5 props ----------
// a line that grows left to right (clip rect widens), seek-safe
const growLine = (S, d, t, dur, box, o = {}) => { const id = "gl" + ++CP, cp = el("clipPath", { id }, dsDefs()), r = el("rect", { x: box[0], y: box[1], width: 0, height: box[3] }, cp); const p = S.draw(d, S.start, 0, { c: o.c || DS.c("red"), w: o.w || DS.w.near }); p.setAttribute("clip-path", `url(#${id})`); tl.fromTo(r, { attr: { width: 0 } }, { attr: { width: box[2] }, duration: dur, ease: "power1.inOut", immediateRender: false }, t); return p; };
const pillow = (S, cx, cy, k = 1, t) => DS.shape(S, `M${cx - 120 * k} ${cy} Q${cx - 130 * k} ${cy - 50 * k} ${cx - 90 * k} ${cy - 54 * k} Q${cx} ${cy - 70 * k} ${cx + 90 * k} ${cy - 54 * k} Q${cx + 130 * k} ${cy - 50 * k} ${cx + 120 * k} ${cy} Q${cx} ${cy + 16 * k} ${cx - 120 * k} ${cy} Z`, "white", { t, tone: 1 });
const playSlide = (S, x0, y0, x1, y1, t) => { DS.shadow(S, (x0 + x1) / 2, y1 + 6, x1 - x0 + 80, { t }); [[x0 - 40, x0 - 10]].forEach(([a, b]) => { DS.shape(S, rect(a - 8, y0, 16, y1 - y0), "gray", { t, tone: 2, w: "detail" }); DS.shape(S, rect(b - 8, y0, 16, y1 - y0), "gray", { t, tone: 2, w: "detail" }); for (let i = 1; i < 6; i++) S.draw(line([a, y0 + i * (y1 - y0) / 6], [b, y0 + i * (y1 - y0) / 6], 0), t ?? S.start, 0, { c: DS.c("gray", 2), w: DS.w.mid }); });
  DS.shape(S, `M${x0 - 20} ${y0 - 10} Q${x0 + (x1 - x0) * 0.4} ${y0 + 10} ${x1 - 60} ${y1 - 40} L${x1} ${y1 - 30} L${x1} ${y1 - 6} L${x1 - 70} ${y1 - 14} Q${x0 + (x1 - x0) * 0.4} ${y0 + 50} ${x0 - 20} ${y0 + 26} Z`, "red", { t }); };
const wheel = (S, cx, cy, r, t0, t1, t) => { DS.shadow(S, cx, cy + r + 50, r * 1.4, { t }); DS.shape(S, `M${cx - 20} ${cy} L${cx - r * 0.7} ${cy + r + 50} L${cx - r * 0.5} ${cy + r + 50} Z M${cx + 20} ${cy} L${cx + r * 0.7} ${cy + r + 50} L${cx + r * 0.5} ${cy + r + 50} Z`, "gray", { t, tone: 2, w: "detail" }); const g = S.grp(); S.draw(circ(cx, cy, r) + circ(cx, cy, r - 16), t ?? S.start, 0, { c: DS.c("gray", 2), w: DS.w.mid, parent: g }); S.draw(rays(cx, cy, 0, r - 16, 8, 0), t ?? S.start, 0, { c: DS.c("gray", 1), w: DS.w.detail, parent: g }); spin(g, t0, t1 - t0, 0, -540, cx, cy, "none"); return g; };
const speaker = (S, x, y, t, wavesT) => { DS.shape(S, rrect(x - 70, y - 90, 140, 180, DS.r.sm), "ink", { t, tone: 1 }); DS.shape(S, circ(x, y + 20, 44), "gray", { t, tone: 2, w: "detail" }); DS.shape(S, circ(x, y - 50, 18), "gray", { t, tone: 2, w: "detail" }); [60, 100, 140].forEach((r, i) => S.draw(arc(x + 70, y, r, -40, 40), wavesT + i * 0.15, 0, { c: DS.c("blue"), w: DS.w.mid })); };
const microscope = (S, x, base, t) => { DS.shape(S, rrect(x - 90, base - 30, 180, 30, DS.r.xs), "gray", { t, tone: 2 }); DS.shape(S, `M${x + 40} ${base - 30} Q${x + 90} ${base - 160} ${x + 20} ${base - 260} L${x - 6} ${base - 236} Q${x + 50} ${base - 150} ${x + 10} ${base - 30} Z`, "gray", { t, tone: 2 }); DS.shape(S, rrect(x - 60, base - 120, 120, 20, DS.r.xs), "gray", { t }); DS.shape(S, `M${x - 40} ${base - 310} L${x + 10} ${base - 330} L${x - 10} ${base - 150} L${x - 40} ${base - 150} Z`, "white", { t }); DS.shape(S, rrect(x - 52, base - 360, 50, 50, DS.r.xs), "ink", { t, tone: 1, w: "detail" }); };
const mouseBed = (S, cx, base, t, n = 3) => { DS.shadow(S, cx, base, 520, { t }); DS.shape(S, rect(cx - 250, base - 120, 500, 120), "glass", { t, flat: true, w: "mid" }); DS.shape(S, `M${cx - 240} ${base - 6} Q${cx - 120} ${base - 70} ${cx} ${base - 50} Q${cx + 120} ${base - 76} ${cx + 240} ${base - 6} Z`, "sand", { t, w: "detail" }); for (let i = 0; i < n; i++) { rat(S, cx - 140 + i * 140, base - 30, 0.55, { t, eyes: "shut", flip: i % 2 }); zz(S, cx - 140 + i * 140 + 10, base - 100, t ?? S.start); } };
const lightSwitch = (S, x, y, t) => { DS.shape(S, rrect(x - 50, y - 75, 100, 150, DS.r.sm), "white", { t, w: "mid" }); DS.shape(S, rrect(x - 18, y - 40, 36, 80, DS.r.xs), "gray", { t, tone: 1, w: "detail" }); DS.shape(S, rrect(x - 18, y, 36, 40, DS.r.xs), "gray", { t, tone: 2, w: "detail" }); };
const kitchenSet = (S) => { // counter with cabinets along the back wall, the dishwasher in the middle
  DS.shape(S, rect(380, 560, 1160, 240), "wood", { layer: "mid" }); [670, 960, 1250].forEach((x) => S.draw(line([x, 576], [x, 790], 0), S.start, 0, { c: DS.line("mid"), w: DS.w.hair }));
  DS.shape(S, rrect(366, 536, 1188, 30, DS.r.xs), "gray", { layer: "mid", tone: 1, w: "mid" });
  DS.shape(S, rect(1260, 180, 240, 160), "wood", { layer: "mid", tone: 1 });
  const dx = 820; DS.shape(S, rect(dx, 566, 280, 234), "white", { layer: "mid", w: "mid" }); DS.shape(S, rect(dx, 566, 280, 40), "gray", { layer: "mid", tone: 1, w: "detail" }); DS.shape(S, rrect(dx + 60, 626, 160, 18, DS.r.xs), "gray", { layer: "mid", tone: 2, w: "detail" });
  return [dx + 140, 586];
};
const closedSign = (S, cx, y, t) => { S.draw(`M${cx - 80} ${y - 70} L${cx} ${y - 120} L${cx + 80} ${y - 70}`, t ?? S.start, 0, { c: DS.c("ink"), w: DS.w.detail }); DS.shape(S, rrect(cx - 130, y - 70, 260, 90, DS.r.sm), "red", { t, tone: 2, flat: true, w: "mid" }); S.text("CLOSED", cx, y - 8, { size: DS.type.small, t, c: DS.P.white[0] }); };
const rockingChair = (S, x, gy, k = 1, o = {}) => { // side view facing right; returns its group (rock it) and the seat top
  const t = o.t, g = S.grp(), f = (v) => v * k;
  DS.shadow(S, x, gy, f(380), { t });
  S.draw(`M${x - f(200)} ${gy - f(40)} Q${x} ${gy + f(14)} ${x + f(200)} ${gy - f(40)}`, t ?? S.start, 0, { c: DS.c("wood", 2), w: DS.w.near * 2, parent: g });
  [[-110, -200, -120, -20], [90, -200, 110, -20]].forEach(([a, b, c2, d]) => DS.shape(S, `M${x + f(a) - f(10)} ${gy + f(b)} L${x + f(a) + f(10)} ${gy + f(b)} L${x + f(c2) + f(10)} ${gy + f(d)} L${x + f(c2) - f(10)} ${gy + f(d)} Z`, "wood", { t, parent: g, w: "mid" }));
  DS.shape(S, `M${x - f(120)} ${gy - f(190)} L${x - f(186)} ${gy - f(560)} L${x - f(146)} ${gy - f(566)} L${x - f(84)} ${gy - f(196)} Z`, "wood", { t, parent: g, tone: 2 });
  for (let i = 1; i < 4; i++) S.draw(line([x - f(120) - f(66) * i / 4 + f(20), gy - f(200) - f(366) * i / 4], [x - f(146) - f(40) * i / 4 + f(24), gy - f(560) + f(10)], 0), t ?? S.start, 0, { c: DS.c("wood", 2), w: DS.w.detail, parent: g });
  DS.shape(S, rrect(x - f(130), gy - f(212), f(240), f(30), DS.r.xs), "wood", { t, parent: g });
  DS.shape(S, rrect(x - f(150), gy - f(340), f(220), f(22), DS.r.xs), "wood", { t, parent: g }); DS.shape(S, rect(x + f(50), gy - f(330), f(18), f(120)), "wood", { t, parent: g, w: "mid" });
  return { g, seat: gy - f(212) };
};
const judge = (S, x, gy, o = {}) => { const F = person(S, x, gy, "near", 6, Object.assign({ mood: "worried", look: -6, pose: "reachL" }, o)); const [hx, hy] = F.hand("L"); S.draw(circ(hx - 40, hy - 10, 40), o.t ?? S.start, 0, { c: DS.c("ink"), w: DS.w.near, parent: F.g }); S.draw(line([hx - 8, hy + 14], [hx + 24, hy + 40], 0), o.t ?? S.start, 0, { c: DS.c("ink"), w: DS.w.near * 2, parent: F.g }); const [rx, ry] = F.hand("R"); paperR(S, rx - 20, ry - 70, 110, 140, { t: o.t }); return F; };
const formSheet = (S, cx, cy, t) => { paperR(S, cx - 230, cy - 270, 460, 540, { t }); txt(S, "PERMISSION", cx, cy - 190, { t, size: DS.type.small }); txt(S, "TO SLEEP?", cx, cy - 130, { t, size: DS.type.small }); [["YES", -10], ["NO", 90]].forEach(([s, dy]) => { DS.shape(S, rect(cx - 140, cy + dy - 40, 50, 50), "white", { t, w: "mid", flat: true }); txt(S, s, cx - 40, cy + dy, { t, size: DS.type.small, anchor: "start" }); }); lines(S, cx - 170, cy + 180, 340, 2, t, 40); };

// ===================== 4. The invisible naps =====================
// Even Dement later accepted that Randy, watched around the clock, probably had microsleeps.

// A microsleep is a few seconds, fifteen at most, / when your brain slips into light sleep without asking you.

// Your eyes can even stay open. / And afterwards, you don't think you slept. You think you lost focus for a second.

// Hour forty, and Dave checks in again. / "Honestly, I feel totally..."

// Four seconds later, he finishes the sentence. / "Fine. Sorry, where was I?"

// It gets stranger. In twenty eleven, a Wisconsin team kept rats awake and listened to single brain cells.

// The rats were up and active. / But small groups of their brain cells kept switching off, the way they do in sleep.

// The longer the rats stayed up, the more it happened, / and the worse they got at reaching for sugar pellets.

// Which, for a rat, is the one job that matters.

// So the brain doesn't wait for permission. / If you won't sleep, it starts sleeping in pieces.

// And that's one reason Guinness quit in nineteen ninety-seven.
const note = (S, x, y, str, t, name = "yellow") => { DS.drop(S, rect(x - 146, y - 66, 300, 140), { t }); DS.shape(S, rect(x - 150, y - 74, 300, 140), name, { t, flat: true, w: "detail", tone: 1 }); txt(S, str, x, y + 14, { t, size: DS.type.small }); };

// You can't prove someone stayed awake / when even they don't know they nodded off.

// The other reason was simpler: it's dangerous.

// The last record they accepted, in nineteen eighty-six, was four hundred and fifty-three hours,

// set in a rocking chair, the one piece of furniture designed to put people to sleep.

// So Dave's certificate is off. / But what is sleep for, and can he skip just that part?

// ===================== 5. The night shift =====================
// In twenty thirteen, Maiken Nedergaard's lab at the University of Rochester watched the brains of sleeping mice.

// brain cells in a lens: the gaps widen (cells drift apart), then fluid rushes through and carries waste away
const CELLG = [[-1.5, -1], [-0.5, -1], [0.5, -1], [1.5, -1], [-1, 0], [0, 0], [1, 0], [-1.5, 1], [-0.5, 1], [0.5, 1], [1.5, 1]];
const lens = (S, cx, cy, r, o = {}) => {
  const g = S.grp(); DS.shape(S, circ(cx, cy, r), "sky", { flat: true, tone: 1, w: "near", parent: g });
  const cg = S.grp(g); clipTo(cg, circ(cx, cy, r - 6));
  CELLG.forEach(([a, b], i) => { const x = cx + a * 150, y = cy + b * 150, c = S.grp(cg); DS.shape(S, smooth([[x - 64, y], [x - 40, y - 60], [x + 10, y - 66], [x + 60, y - 30], [x + 62, y + 30], [x + 20, y + 64], [x - 40, y + 56], [x - 64, y]]), "pink", { parent: c }); DS.shape(S, circ(x - 6, y - 4, 18), "purple", { parent: c, w: "detail", tone: 1 });
    const tf = (k) => `translate(${x} ${y}) scale(${k}) translate(${-x} ${-y})`;
    if (o.wide === true) c.setAttribute("transform", tf(0.78)); else if (o.wide) tl.fromTo(c, { attr: { transform: tf(1) } }, { attr: { transform: tf(0.78) }, duration: 0.9, ease: "power2.inOut", immediateRender: false }, o.wide); });
  if (o.flow) { const fg = S.grp(cg); [cy - 75, cy + 75].forEach((y, j) => S.arrow(cx - r + 30, y, cx + r - 40, y + (j ? -10 : 10), o.flow + j * 0.15, 0.4, { c: DS.c("blue", 2), w: DS.w.near, bend: 0.04, parent: fg }));
    const wg = S.grp(cg); [[-240, -75], [-170, 75], [-90, -75], [-20, 75], [60, -75]].forEach(([dx, dy]) => DS.shape(S, circ(cx + dx, cy + dy, 12), "gray", { parent: wg, t: o.flow, w: "detail", tone: 2 })); slide(wg, o.flow + 0.3, 2.4, 420, 0, "power1.in"); }
  S.draw(circ(cx, cy, r), S.start, 0, { c: DS.c("ink"), w: DS.w.near * 1.6, parent: g });
};
// As they slept, the gaps between brain cells widened by about sixty percent,

// and fluid rushed through, carrying waste away faster than when awake.

// So sleep looked less like switching off for the night, / and more like a dishwasher that only runs once the kitchen is closed.

// But in twenty twenty-four, a team at Imperial College London measured it a different way,

// and in their mice, clearing was slower during sleep, not faster.

// So how the brain cleans up is still argued about. / Whether sleep matters is not.

// That leaves Dave one last hope: sleep like the animals that seem not to.

// ---------- section 6-8 props ----------
const SEA = { hy: 600, sky: "sky", hills: "sky", ground: "blue", sun: [1600, 190] }, SEA2 = Object.assign({}, SEA, { hy: 760 });
const waterFront = (S, y, t) => S.fill(`M-200 ${y} Q100 ${y - 24} 400 ${y} T1000 ${y} T1600 ${y} T2200 ${y} L2200 1280 L-200 1280 Z`, t ?? S.start, 0, DS.c("blue", 1), 0.62);
// frigatebird perched on a bush, wings folded, asleep (both eyes shut)
const frigatePerch = (S, cx, cy, k = 1, o = {}) => {
  const t = o.t, P = (pts) => pts.map(([a, b]) => [cx + a * k, cy + b * k]);
  DS.shape(S, poly(P([[-40, 60], [-70, 190], [-50, 196], [-10, 70]]), 0) + " Z", "ink", { t, flat: true, tone: 1, w: "detail" });
  DS.shape(S, smooth(P([[-60, 60], [-80, 0], [-30, -60], [40, -70], [70, -40], [60, 30], [10, 80], [-60, 60]])), "ink", { t, flat: true, tone: 1 });
  DS.shape(S, smooth(P([[-50, 40], [-60, -10], [0, -50], [40, -30], [20, 40], [-50, 40]])), "ink", { t, flat: true, w: "detail" });
  DS.shape(S, circ(cx + 70 * k, cy - 70 * k, 36 * k), "ink", { t, flat: true, tone: 1, w: "detail" });
  DS.shape(S, circ(cx + 70 * k, cy - 12 * k, 30 * k, 36 * k), "red", { t, w: "detail" });
  DS.shape(S, smooth(P([[96, -82], [176, -76], [190, -64], [182, -58], [172, -66], [100, -62]])), "gray", { t, w: "detail", tone: 1 });
  S.draw(arc(cx + 82 * k, cy - 78 * k, 8 * k, 20, 160), t ?? S.start, 0, { c: DS.P.white[0], w: DS.w.mid });
};
const bush = (S, cx, gy, w, t) => { DS.shadow(S, cx, gy, w + 40, { t }); [[-0.3, 0.55], [0.25, 0.6], [0, 0.8]].forEach(([dx, h]) => DS.shape(S, circ(cx + dx * w, gy - h * w * 0.45, w * 0.36, w * 0.3), "green", { t })); };
// cute fruit fly (side-ish view, facing right); o.gut = dots appear in the gut from o.gut time
const fly = (S, cx, cy, k = 1, o = {}) => {
  const t = o.t, g = S.grp(o.parent), f = (v) => v * k;
  [[-30, -80, -40], [10, -84, 10]].forEach(([dx, dy, rot]) => { const w = DS.shape(S, circ(cx + f(dx), cy + f(dy), f(70), f(32)), "glass", { t, parent: g, w: "detail", flat: true }); w.setAttribute("transform", `rotate(${rot} ${cx + f(dx)} ${cy + f(dy)})`); w.setAttribute("opacity", 0.8); });
  [[-40, 60], [0, 66], [40, 60]].forEach(([dx, dy]) => S.draw(`M${cx + f(dx)} ${cy + f(20)} L${cx + f(dx) - f(14)} ${cy + f(dy)} L${cx + f(dx) - f(4)} ${cy + f(dy + 20)}`, t ?? S.start, 0, { c: DS.c("ink"), w: DS.w.detail, parent: g }));
  DS.shape(S, circ(cx - f(70), cy + f(4), f(66), f(46)), "sand", { t, parent: g });
  [-96, -70, -44].forEach((dx) => S.draw(line([cx + f(dx), cy - f(38)], [cx + f(dx), cy + f(46)], 0), t ?? S.start, 0, { c: DS.c("earth", 2), w: DS.w.mid, parent: g }));
  DS.shape(S, circ(cx + f(20), cy - f(6), f(40), f(36)), "earth", { t, parent: g });
  DS.shape(S, circ(cx + f(80), cy - f(10), f(34)), "sand", { t, parent: g });
  DS.shape(S, circ(cx + f(92), cy - f(16), f(18), f(22)), "red", { t, parent: g, w: "detail" }); S.fill(circ(cx + f(88), cy - f(24), f(5)), t ?? S.start, 0, DS.P.white[0], 1, g);
  S.draw(`M${cx + f(96)} ${cy - f(40)} Q${cx + f(110)} ${cy - f(70)} ${cx + f(130)} ${cy - f(66)}`, t ?? S.start, 0, { c: DS.c("ink"), w: DS.w.detail, parent: g });
  if (o.gut !== undefined) { S.draw(`M${cx - f(20)} ${cy + f(4)} Q${cx - f(70)} ${cy + f(30)} ${cx - f(120)} ${cy + f(4)}`, o.gutT ?? t ?? S.start, 0, { c: DS.c("pink", 2), w: DS.w.near * 1.6 * k, parent: g });
    for (let i = 0; i < 9; i++) DS.shape(S, circ(cx - f(110) + (i % 5) * f(20), cy + f(10) - Math.floor(i / 5) * f(18) + (i % 2) * f(6), f(7)), "red", { t: o.gut + i * 0.12, parent: g, w: "hair" }); }
  return { g, head: [cx + f(80), cy - f(10)], gut: [cx - f(70), cy + f(10)] };
};
const jar = (S, cx, base, w, h, t) => { DS.shadow(S, cx, base, w + 40, { t }); DS.shape(S, rrect(cx - w / 2, base - h, w, h, DS.r.lg), "glass", { t, flat: true, w: "mid" }); DS.shape(S, rrect(cx - w / 2 - 10, base - h - 40, w + 20, 50, DS.r.sm), "gray", { t, tone: 2 }); S.draw(line([cx - w / 2 + 30, base - h + 40], [cx - w / 2 + 30, base - 60], 0), t ?? S.start, 0, { c: DS.P.white[0], w: DS.w.mid }); };
// disk-over-water platform (side view): a tray of shallow water, a round disk on a post
const disk = (S, cx, gy, t, o = {}) => { DS.shadow(S, cx, gy, 760, { t }); DS.shape(S, rect(cx - 360, gy - 120, 720, 120), "gray", { t, tone: 1 }); DS.shape(S, rect(cx - 340, gy - 90, 680, 70), "sky", { t, flat: true, w: "hair" }); DS.shape(S, rect(cx - 16, gy - 250, 32, 160), "gray", { t, tone: 2, w: "detail" }); DS.shape(S, circ(cx, gy - 260, 240, 34), "wood", { t }); return gy - 268; };
const trophy = (S, cx, base, k, t) => { DS.shape(S, rrect(cx - 50 * k, base - 30 * k, 100 * k, 30 * k, DS.r.xs), "wood", { t, tone: 2, w: "detail" }); DS.shape(S, rect(cx - 12 * k, base - 80 * k, 24 * k, 50 * k), "gold", { t, w: "detail" }); DS.shape(S, `M${cx - 60 * k} ${base - 190 * k} L${cx + 60 * k} ${base - 190 * k} Q${cx + 60 * k} ${base - 80 * k} ${cx} ${base - 76 * k} Q${cx - 60 * k} ${base - 80 * k} ${cx - 60 * k} ${base - 190 * k} Z`, "gold", { t, w: "detail" }); S.draw(`M${cx - 60 * k} ${base - 170 * k} Q${cx - 100 * k} ${base - 160 * k} ${cx - 56 * k} ${base - 120 * k} M${cx + 60 * k} ${base - 170 * k} Q${cx + 100 * k} ${base - 160 * k} ${cx + 56 * k} ${base - 120 * k}`, t ?? S.start, 0, { c: DS.c("gold", 2), w: DS.w.mid }); };
const camera = (S, cx, cy, k, t) => { DS.shape(S, rrect(cx - 70 * k, cy - 46 * k, 140 * k, 92 * k, DS.r.sm), "ink", { t, tone: 1 }); DS.shape(S, rrect(cx - 40 * k, cy - 66 * k, 60 * k, 24 * k, DS.r.xs), "ink", { t, tone: 1, w: "detail" }); DS.shape(S, circ(cx, cy, 30 * k), "gray", { t, w: "detail", tone: 1 }); DS.shape(S, circ(cx, cy, 14 * k), "navy", { t, w: "hair" }); };
const miniBed = (S, cx, gy, k, name, t) => { DS.shape(S, rect(cx - 50 * k, gy - 30 * k, 100 * k, 30 * k), "white", { t, w: "detail", flat: true }); DS.shape(S, rect(cx - 56 * k, gy - 62 * k, 12 * k, 62 * k), "wood", { t, w: "hair" }); DS.shape(S, circ(cx - 26 * k, gy - 40 * k, 13 * k), "white", { t, w: "detail" }); DS.shape(S, rect(cx - 10 * k, gy - 44 * k, 58 * k, 22 * k), name, { t, w: "hair", flat: true }); };
// the phone with alarms (o.rows = [[label, icon, t], ...])
const bigPhone = (S, cx, cy, w, h, o = {}) => {
  const t = o.t; DS.drop(S, rrect(cx - w / 2 + 10, cy - h / 2 + 14, w, h, DS.r.lg), { t });
  DS.shape(S, rrect(cx - w / 2, cy - h / 2, w, h, DS.r.lg), "ink", { t, w: "mid" });
  const x0 = cx - w / 2 + 20, y0 = cy - h / 2 + 46, x1 = cx + w / 2 - 20, y1 = cy + h / 2 - 46;
  DS.shape(S, rrect(x0, y0, x1 - x0, y1 - y0, DS.r.sm), "navy", { t, flat: true, w: "hair", tone: 1 });
  txt(S, "ALARMS", cx, y0 + 70, { t, size: DS.type.small, c: DS.P.white[0] });
  (o.rows || []).forEach(([str, icon, rt], i) => { const y = y0 + 150 + i * 170;
    DS.shape(S, rrect(x0 + 20, y, x1 - x0 - 40, 140, DS.r.md), "white", { t: rt, flat: true, w: "detail" });
    (icon === "moon" ? moonIcon : sunIcon)(S, x0 + 80, y + 70, 30, rt);
    txt(S, str, x0 + 130, y + 86, { t: rt, size: DS.type.small, anchor: "start" });
    DS.shape(S, rrect(x1 - 130, y + 46, 90, 48, DS.r.lg), "green", { t: rt, flat: true, w: "detail" }); DS.shape(S, circ(x1 - 64, y + 70, 20), "white", { t: rt, w: "hair" }); });
  return { x0, y0, x1, y1 };
};
const catFrame = (S, cx, base, t) => { DS.shape(S, rrect(cx - 80, base - 190, 160, 190, DS.r.xs), "wood", { t, w: "detail" }); DS.shape(S, rect(cx - 64, base - 174, 128, 158), "sky", { t, flat: true, tone: 1, w: "hair" });
  DS.shape(S, `M${cx - 40} ${base - 70} L${cx - 44} ${base - 140} L${cx - 14} ${base - 112} L${cx + 14} ${base - 112} L${cx + 44} ${base - 140} L${cx + 40} ${base - 70} Q${cx} ${base - 40} ${cx - 40} ${base - 70} Z`, "orange", { t, w: "detail" });
  [[-16, -94], [16, -94]].forEach(([dx, dy]) => DS.shape(S, circ(cx + dx, base + dy, 5), "ink", { t, w: "hair", flat: true })); S.draw(`M${cx - 8} ${base - 80} Q${cx} ${base - 74} ${cx + 8} ${base - 80} M${cx - 50} ${base - 84} L${cx - 22} ${base - 82} M${cx + 50} ${base - 84} L${cx + 22} ${base - 82}`, t ?? S.start, 0, { c: DS.c("ink"), w: DS.w.hair }); };
const apple = (S, cx, cy, r, t) => { DS.shape(S, `M${cx} ${cy - r * 0.7} Q${cx + r * 1.1} ${cy - r * 1.3} ${cx + r} ${cy} Q${cx + r * 0.8} ${cy + r} ${cx} ${cy + r * 0.85} Q${cx - r * 0.8} ${cy + r} ${cx - r} ${cy} Q${cx - r * 1.1} ${cy - r * 1.3} ${cx} ${cy - r * 0.7} Z`, "red", { t }); DS.shape(S, `M${cx} ${cy - r * 0.7} q${r * 0.3} ${-r * 0.5} ${r * 0.6} ${-r * 0.4} q${-r * 0.2} ${r * 0.4} ${-r * 0.6} ${r * 0.4} Z`, "green", { t, w: "hair" }); };
const ruler = (S, x, y, w, t) => { DS.shape(S, rrect(x, y, w, 70, DS.r.xs), "yellow", { t }); for (let i = 1; i < 12; i++) S.draw(line([x + (i * w) / 12, y], [x + (i * w) / 12, y + (i % 2 ? 22 : 36)], 0), t ?? S.start, 0, { c: DS.c("ink"), w: DS.w.detail }); };
// Dave's bedroom (night): bed, nightstand (phone + tangerines), scoreboard on the wall. o.board = scoreboard options, o.bowl = tangerine bowl
const bedroom = (S, o = {}) => { // call after DS.room(S, ROOM.den)
  nightWin(S, 1300, 170, 210, 200);
  const B = o.board === false ? null : scoreboard(S, 640, 300, Object.assign({ k: 0.75 }, o.board || {}));
  const Bd = bed(S, 760, GN, 580, { blanket: "sky" });
  const top = sideTable(S, 500, GN, 220, 200);
  if (o.phone !== false) { DS.shape(S, rrect(410, top - 14, 70, 14, DS.r.xs), "ink", { w: "detail" }); }
  if (o.tang !== false) { if (o.bowl) tangerines(S, 560, top, 0.5, { bowl: true }); else tangerines(S, 560, top, 0.42); }
  return { B, Bd, top };
};

// ===================== 6. Half a brain =====================
// Dolphins can't just pass out in the sea, / so they sleep one half of the brain at a time, then swap.

// a row of four ducks on a log; the end ducks keep their outward eye open
const DX = [560, 820, 1080, 1340];
const duckRow = (S, o = {}) => {
  DS.shape(S, circ(950, 900, 760, 120), "blue", { layer: "mid", flat: true, tone: 1 });
  DS.shadow(S, 950, 832, 1100); DS.shape(S, rrect(380, 760, 1140, 90, DS.r.lg), "wood"); DS.shape(S, circ(1520, 805, 26, 45), "wood", { tone: 1, w: "mid" }); S.draw(circ(1520, 805, 12, 24), S.start, 0, { c: DS.c("wood", 2), w: DS.w.detail });
  DX.forEach((x, i) => duck(S, x, 780, 1.0, i === 0 ? { L: "open", Lt: o.open } : i === 3 ? { R: "open", Rt: o.open } : {}));
};
// In a row of sleeping ducks, the ones at the ends keep one eye open more often, / usually the eye facing away from the group.

// The ducks in the middle just trust the ducks at the ends.

// Frigatebirds fly over the ocean for days without landing. / In twenty sixteen, Niels Rattenborg's team put brain recorders on them.

// In flight, they slept about forty minutes a day, in ten-second naps, often one half at a time.

// Then they land, and sleep over twelve hours a day. / The champion of not sleeping goes home and sleeps half the day.

// None of them skip sleep. They just found loopholes.

// Dave tries the dolphin method, and closes one eye. / Both halves of his brain stay awake, / and now he's losing at pinball.

// So what happens to an animal with no loophole at all?

// In the nineteen eighties, Allan Rechtschaffen's lab in Chicago kept rats on a platform that moved whenever they dozed.

// Within eleven to thirty-two days, none survived, / and nobody knew exactly why.

// In twenty twenty, a Harvard team found a clue in fruit flies kept awake:

// harmful molecules piling up, not in their brains, but in their guts.

// Which is why no lab keeps a person awake for weeks, / and why Dave, finally, goes to bed.

// ===================== 7. The slow version =====================
// Dave goes back to normal life, about six hours a night, / and reads the study he should have read first.

// In two thousand three, Hans Van Dongen's team at the University of Pennsylvania / put forty-eight healthy adults in a sleep lab.

// For two weeks, some got eight hours in bed a night, some six, some four.

// By the end, the six-hour group was as impaired as people kept awake for a whole night. / The four-hour group, as if they'd skipped two.
const nightX = (S, cx, cy, t) => { DS.shape(S, rrect(cx - 60, cy - 60, 120, 120, DS.r.sm), "night", { t, flat: true, w: "detail" }); moonIcon(S, cx, cy, 34, t); S.draw(line([cx - 46, cy + 46], [cx + 46, cy - 46], 0), t ?? S.start, 0, { c: DS.c("red"), w: DS.w.near }); };

// And how sleepy did they feel? / The researchers' words: only slightly sleepy.

// Their scores got worse every day. Their feelings stayed at fine.

// A whole lab full of Daves at hour seventeen. / "Honestly, I feel totally fine."

// So here's the twist: you don't need a glass booth or a science fair to attempt this record.

// Every night you cut short is a tiny version of it.

// Next to that eight-hour group, Dave is two hours short every night.

// After a hundred and thirty-two nights, that's two hundred and sixty-four hours.

// Randy's record, broken in instalments, with no reporters and no pinball.

// And just like the lab, Dave hasn't noticed a thing.

// So, what happens if you never sleep? / You can't, for long. Your brain takes it anyway, in pieces.

// What you can do is borrow it, a little every night, without feeling the cost.

// ===================== 8. The bedtime alarm =====================
// And Randy Gardner, the teenager who believed you don't need sleep? / In his sixties, he spent about ten years struggling to get any.

// He thinks losing his cat set it off. / But he still calls it karmic payback.

// He got some of his sleep back, and now calls it one of the big three: water, food, and sleep.

// So here's the one idea worth keeping. / Your feeling of fine is not a measurement, but a clock is.

// Set an alarm for when you go to bed, / not just for when you get up.

// Tonight, Dave is going to sleep. / And tomorrow night, and the night after that.

// His scoreboard is back at zero, / and the tangerines are just a snack again.

// Goodnight, Dave. See you in the morning.
