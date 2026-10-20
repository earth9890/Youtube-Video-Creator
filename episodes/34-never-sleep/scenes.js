// look: still
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
const CUES = [[1, 0], [3, 0], [5, 0], [6, 0], [8, 0], [10, 0], [12, 0], [13, 0], [14, 0], [15, 0], [16, 9], [18, 0], [19, 0], [20, 0],
  [23, 0], [23, 12], [25, 0], [26, 0], [27, 0], [28, 0], [29, 0], [31, 0], [33, 0], [35, 0], [37, 0], [38, 0], [40, 0], [42, 0], [43, 0], [44, 0], [46, 0], [47, 0], [48, 0],
  [50, 0], [51, 0], [53, 0], [55, 0], [57, 0], [59, 0], [60, 0], [62, 0], [64, 0], [65, 0], [67, 0], [68, 0], [70, 0], [71, 0], [72, 0], [73, 0],
  [75, 0], [76, 0], [77, 0], [78, 0], [80, 0], [81, 0], [82, 0], [84, 0],
  [85, 0], [87, 0], [89, 0], [90, 0], [92, 0], [93, 0], [95, 0], [96, 0], [99, 0], [100, 0], [101, 0], [103, 0], [104, 0], [105, 0],
  [107, 0], [109, 0], [111, 0], [112, 0], [114, 0], [116, 0], [117, 0], [119, 0], [120, 0], [121, 0], [122, 0], [123, 0], [124, 0], [125, 0], [127, 0],
  [128, 0], [130, 0], [132, 0], [133, 0], [135, 0], [137, 0], [139, 0], [141, 0]];
const WINS = sceneWindows(CUES, -0.25); // each picture lands just after its first word; the 0.6 s crossfade covers the breath
const sc = (c, w, o) => { const k = CUES.findIndex(([a, b]) => a === c && b === w); if (k < 0) throw new Error("no cue " + c + ":" + w); return scene(WINS[k][0], WINS[k][1], o); };
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
{ const S = sc(1, 0, { cam: "push", focus: "960 600" }); DS.room(S, ROOM.den); den(S, { board: false, tang: false });
  const F = dave(S, 960, GN, "near", { pose: "hips", mood: "determined", look: 0 });
  DS.card(S, "DAVE", 960, 500, { size: DS.type.body, t: W(1, 2) });
  const days = [W(2, 1), W(2, 3), W(2, 6), W(2, 6) + 0.1, W(2, 6) + 0.2, W(2, 6) + 0.3, W(2, 6) + 0.4, W(2, 7), W(2, 7) + 0.1, W(2, 7) + 0.2, W(2, 7) + 0.3];
  days.forEach((tt, i) => { const x = 400 + i * 84; DS.shape(S, rrect(x - 38, 200, 76, 76, DS.r.sm), "white", { t: tt, w: "detail", flat: true }); moonIcon(S, x - 4, 238, 20, tt); S.draw(line([x - 26, 266], [x + 26, 210], 0), tt, 0, { c: DS.c("red"), w: DS.w.mid }); });
  DS.card(S, "11 DAYS", 960, 340, { size: DS.type.title, t: W(2, 6), tc: "red" });
  DS.vignette(S); }

// He has a scoreboard, a bag of tangerines, and a target: / two hundred and sixty-four hours awake.
{ const S = sc(3, 0, { cam: "push", focus: "900 520" }); DS.room(S, ROOM.den); const B = den(S, { board: { t: W(3, 3), n: 0 }, tangT: W(3, 5) });
  const F = dave(S, 1200, GN, "near", { pose: "pointL", mood: "smile", look: -6 });
  ringIt(S, B.x + B.w * 0.78, B.y + B.h * 0.66, 120, 60, W(4, 3));
  DS.card(S, "TARGET: 264 HOURS", 760, 600, { size: DS.type.body, t: W(4, 0), tc: "red" });
  DS.vignette(S); }

// "How hard can it be? I'm just not doing something."
{ const S = sc(5, 0, { cam: "zoom", focus: "1000 560" }); DS.room(S, ROOM.den); den(S, { board: { n: 0 } });
  const F = dave(S, 1180, GN, "near", { s: 1.3, pose: "hips", mood: "smile", look: -4 });
  const b1 = say(S, 700, 640, 320, 90, 1000, 640, ["HOW HARD CAN IT BE?"], W(5, 0)); S.fadeOut(b1, W(5, 5) - 0.1, 0.2);
  say(S, 700, 640, 320, 110, 1000, 640, ["I'M JUST NOT", "DOING SOMETHING."], W(5, 5));
  DS.vignette(S); }

// But in nineteen ninety-seven, the Guinness record book stopped accepting this record. / Dave is about to find out why.
{ const S = sc(6, 0, { cam: "push", focus: "860 480" }); DS.room(S, ROOM.board);
  recordBook(S, 860, 470, 900, 480);
  DS.card(S, "GUINNESS · 1997", 860, 150, { size: DS.type.body, t: W(6, 2) });
  stamp(S, 1080, 470, "CLOSED", W(6, 8), "red", { size: DS.type.title });
  const F = dave(S, 1560, GN, "near", { mood: "worried", look: -7, t: W(7, 0) });
  DS.vignette(S); }

// roadmap: four tiles (glass box, pinball, a bird that naps in flight, you)
const TX = [370, 750, 1130, 1510], TY = 540;
const roadTiles = (S, ts) => {
  if (ts[0] !== undefined) tile(S, TX[0], TY, "A GLASS BOX", ts[0], (x, y) => miniBooth(S, x, y, ts[0]), { tw: 364, th: 400 });
  if (ts[1] !== undefined) tile(S, TX[1], TY, "PINBALL", ts[1], (x, y) => { pinball(S, x + 30, y + 150, 0.42, { t: ts[1] }); randy(S, x - 90, y + 150, "near", { s: 0.5, t: ts[1], mood: "happy", look: 5, float: true }); }, { tw: 364, th: 400 });
  if (ts[2] !== undefined) tile(S, TX[2], TY, "NAPS IN FLIGHT", ts[2], (x, y) => { frigate(S, x + 10, y + 10, 0.5, { t: ts[2], eye: "shut" }); zz(S, x + 70, y - 60, ts[2]); }, { tw: 364, th: 400 });
  if (ts[3] !== undefined) tile(S, TX[3], TY, "YOU", ts[3], (x, y) => { S.draw(circ(x, y - 50, 46), ts[3], 0, { c: DS.c("gray", 2), w: DS.w.mid }); S.draw(`M${x - 80} ${y + 120} Q${x} ${y - 10} ${x + 80} ${y + 120}`, ts[3], 0, { c: DS.c("gray", 2), w: DS.w.mid }); S.text("?", x, y - 30, { size: DS.type.body, t: ts[3], c: DS.c("gray", 2) }); }, { tw: 364, th: 400 });
};
// So, what happens if you never sleep? / We'll follow Dave hour by hour, with a radio host in a glass box,
{ const S = sc(8, 0, { cam: "push", focus: "800 520" }); DS.room(S, ROOM.board);
  roadTiles(S, [W(9, 8)]);
  const F = dave(S, 1560, GN, "near", { mood: "worried", look: -4 }); S.text("?", 1560, 500, { size: DS.type.display, t: W(8, 2), c: DS.c("ink") });
  DS.card(S, "WHAT HAPPENS IF YOU NEVER SLEEP?", 960, 140, { size: DS.type.body, t: W(8, 1) });
  DS.card(S, "HOUR BY HOUR", 960, 860, { size: DS.type.small, t: W(9, 3) });
  DS.vignette(S); }

// a teenager who beat a sleep scientist at pinball, / and a bird that naps while flying.
{ const S = sc(10, 0, { cam: "push", focus: "1000 520" }); DS.room(S, ROOM.board);
  roadTiles(S, [S.start, W(10, 1), W(11, 2)]);
  DS.card(S, "WHAT HAPPENS IF YOU NEVER SLEEP?", 960, 140, { size: DS.type.body });
  DS.card(S, "HOUR BY HOUR", 960, 860, { size: DS.type.small });
  DS.vignette(S); }

// And one more contestant, quietly attempting this record for years: you.
{ const S = sc(12, 0, { cam: "zoom", focus: "1450 540" }); DS.room(S, ROOM.board);
  roadTiles(S, [S.start, S.start, S.start, W(12, 3)]);
  ringIt(S, TX[3], TY, 210, 236, W(12, 10));
  DS.card(S, "CONTESTANT 4", 1530, 150, { size: DS.type.body, t: W(12, 3), tc: "red" });
  DS.card(S, "FOR YEARS", 1530, 840, { size: DS.type.small, t: W(12, 8) });
  DS.vignette(S); }

// ===================== 2. Hour seventeen =====================
// By hour seventeen, it's nearly midnight, and Dave feels great.
{ const S = sc(13, 0, { cam: "push", focus: "960 520" }); DS.room(S, ROOM.den); const B = den(S, { board: { n: 17, from: 0, go: W(13, 1), dur: 1.0 } });
  wallClock(S, 1160, 250, 56, 11, 52);
  const F = dave(S, 1220, GN, "near", { mood: "smile", look: -4 }); F.setPose(W(13, 8), "armsUp"); F.face(W(13, 8), "happy", 0);
  DS.card(S, "HOUR 17", 760, 120, { size: DS.type.body, t: W(13, 1), tc: "red" });
  DS.card(S, "NEARLY MIDNIGHT", 1300, 430, { size: DS.type.small, t: W(13, 4) });
  DS.card(S, "FEELS GREAT", 1220, 540, { size: DS.type.small, t: W(13, 9), tc: "green" });
  DS.vignette(S); }

// In two thousand, Ann Williamson and Anne-Marie Feyer in Sydney tested thirty-nine transport workers and soldiers.
{ const S = sc(14, 0, { cam: "pull", focus: "960 560" }); DS.room(S, ROOM.lab);
  for (let i = 0; i < 20; i++) person(S, 660 + i * 58, 780, "far", i, { s: 1.1, outfitC: DS.c("yellow", 0, "far"), t: W(14, 11) + i * 0.02 });
  for (let i = 0; i < 19; i++) person(S, 690 + i * 60, 880, "mid", i + 3, { s: 1.1, outfitC: DS.c(i < 10 ? "yellow" : "green", 0, "mid"), t: W(14, 11) + 0.3 + i * 0.02 });
  sci(S, 230, GN, "near", { hair: "bun", hairC: DS.c("brown", 2), mood: "smile", look: 6, t: W(14, 3) });
  sci(S, 450, GN, "near", { hair: "curly", hairC: DS.c("ink", 1), mood: "smile", look: 6, t: W(14, 6) });
  plate(S, 230, 540, "WILLIAMSON", W(14, 3)); plate(S, 450, 470, "FEYER", W(14, 6));
  DS.card(S, "2000 · SYDNEY", 960, 130, { size: DS.type.body, t: W(14, 1) });
  DS.card(S, "39 TRANSPORT WORKERS & SOLDIERS", 1170, 270, { size: DS.type.small, t: W(14, 11), tc: "red" });
  DS.vignette(S); }

// After seventeen to nineteen hours awake, / some of their scores matched what they got at...
{ const S = sc(15, 0, { cam: "push", focus: "960 520" }); DS.room(S, ROOM.lab);
  wboard(S, 280, 150, 1360, 620);
  wallClock(S, 620, 440, 150, 7, 0, { t: S.start }).spin(W(15, 1), 1.6, 12);
  DS.card(S, "17–19 HOURS AWAKE", 620, 690, { size: DS.type.small, t: W(15, 1) });
  S.draw(line([1000, 680], [1540, 680], 0) + line([1000, 680], [1000, 250], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.mid });
  txt(S, "TEST SCORES", 1270, 250, { t: W(16, 3) });
  [[1080, 330, "green", W(16, 3)], [1200, 250, "yellow", W(16, 3) + 0.25], [1320, 170, "red", W(16, 4)], [1440, 110, "red", W(16, 4) + 0.25]].forEach(([x, h, n, tt]) => bar(S, x, 680, 80, h, n, tt));
  DS.vignette(S); }

// zero point zero five percent blood alcohol, or worse. / In Australia, that's the drink-driving limit.
{ const S = sc(16, 9, { cam: "push", focus: "800 520" }); DS.outdoor(S, { hy: 640, sky: "dusk", sun: [1500, 260], path: [760, 1240] });
  panel(S, 640, 470, 760, 520, S.start);
  gauge(S, 640, 560, 250, { v0: 0, moves: [[0, 0.05, W(16, 9)]] });
  DS.card(S, "SAME SCORES AS 0.05%", 640, 140, { size: DS.type.body, t: W(16, 9), tc: "red" });
  roadSign(S, 1440, GN, "0.05", W(17, 1));
  DS.card(S, "AUSTRALIA", 1440, 230, { size: DS.type.small, t: W(17, 1) });
  DS.vignette(S); }

// Stay up longer, and it hit zero point one percent.
{ const S = sc(18, 0, { cam: "zoom", focus: "640 520" }); DS.outdoor(S, { hy: 640, sky: "dusk", sun: [1500, 260], path: [760, 1240] });
  panel(S, 640, 470, 760, 520, S.start);
  gauge(S, 640, 560, 250, { v0: 0.05, moves: [[0.05, 0.1, W(18, 6)]] });
  roadSign(S, 1440, GN, "0.05", S.start);
  DS.card(S, "STAY UP LONGER: 0.1%", 640, 140, { size: DS.type.body, t: W(18, 6), tc: "red" });
  DS.vignette(S); }

// Dave is stone-cold sober. His reaction times are not.
{ const S = sc(19, 0, { cam: "push", focus: "900 560" }); DS.room(S, ROOM.den); den(S, { board: { n: 17 } });
  const F = dave(S, 520, GN, "near", { pose: "hold", mood: "smile", look: 6 });
  const [hx, hy] = F.hand("R"); glassW(S, hx + 4, hy + 20, 0.8, S.start);
  DS.card(S, "STONE-COLD SOBER", 520, 530, { size: DS.type.small, t: W(19, 2), tc: "green" });
  snail(S, 1200, GN - 10, 1.1, W(19, 5)); stopwatch(S, 1200, 690, 56, { t: W(19, 5), turn: 40, dur: 3, go: W(19, 5) });
  DS.card(S, "REACTION TIMES", 1200, 540, { size: DS.type.small, t: W(19, 5), tc: "red" });
  DS.vignette(S); }

// Ask him how he feels. / "Honestly, I feel totally fine." / Remember that word. It comes back.
{ const S = sc(20, 0, { cam: "zoom", focus: "900 560" }); DS.room(S, ROOM.den); den(S, { board: { n: 17 } });
  const F = dave(S, 1250, GN, "near", { s: 1.3, mood: "smile", look: -5 });
  mic(S, 1110, 720, 1.0, W(20, 0));
  say(S, 640, 640, 340, 120, 1000, 590, ["HONESTLY, I FEEL", "TOTALLY FINE."], W(21, 0));
  ringIt(S, 772, 678, 104, 44, W(22, 0));
  DS.card(S, "REMEMBER THAT WORD", 640, 850, { size: DS.type.small, t: W(22, 0), tc: "red" });
  DS.vignette(S); }

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
{ const S = sc(23, 0, { cam: "push", focus: "700 560" }); DS.room(S, ROOM.den); den(S, { board: false, lamp: false });
  const seat = couch(S, 320, GN, 520);
  const F = dave(S, 560, seat + 50, "near", { sit: true, pose: "hold", mood: "flat", look: 5, float: true });
  const [hx, hy] = F.hand("R"); openBookHeld(S, hx + 30, hy - 40, "RECORDS", S.start);
  const th = say(S, 1060, 600, 220, 120, 760, 560, [], W(23, 8), { think: true }); mic(S, 1060, 680, 0.75, W(23, 8));
  DS.card(S, "RECORD HOLDERS", 560, 130, { size: DS.type.body, t: W(23, 3) });
  DS.card(S, "1959", 1060, 420, { size: DS.type.title, t: W(23, 6), tc: "red" });
  DS.vignette(S); }

// broadcast from a glass booth in Times Square, without sleeping, for charity. / He lasted two hundred and one hours,
{ const S = sc(23, 12, { cam: "push", focus: "960 560" }); const O = DS.outdoor(S, { hy: 660, sky: "night", hills: "navy", ground: "gray", sun: false }); city(S, O.hy);
  const B = booth(S, 960, 900, 560, 520);
  table(S, 820, 1100, 730, 900, "wood");
  const F = person(S, 960, 900, "near", 1, { s: 1.0, mood: "smile", look: 0, hair: "side", hairC: DS.c("ink"), outfitC: DS.c("purple") }); phones(S, F, S.start, "red");
  mic(S, 1040, 730, 0.8, S.start);
  B.front();
  plate(S, 960, 250, "PETER TRIPP", S.start);
  DS.card(S, "TIMES SQUARE · 1959", 960, 150, { size: DS.type.body, t: W(23, 17) });
  DS.card(S, "FOR CHARITY", 420, 800, { size: DS.type.small, t: W(23, 22), tc: "green" });
  DS.card(S, "201 HOURS", 1500, 800, { size: DS.type.title, t: W(24, 1), tc: "red" });
  DS.vignette(S); }

// while a rival in Florida lasted two hundred and twenty-five.
{ const S = sc(25, 0, { cam: "push", focus: "1400 560" });
  const N = DS.outdoor(S, { hy: 660, sky: "night", hills: "navy", ground: "gray", sun: false }); clipTo(N.g, rect(-200, -200, 1160, 1480));
  const D = DS.outdoor(S, { hy: 700, sky: "sky", hills: "sky", ground: "sand", sun: [1700, 200] }); clipTo(D.g, rect(960, -200, 1160, 1480));
  const g1 = S.grp(); clipTo(g1, rect(-200, -200, 1160, 1480)); city(S, 660, g1);
  booth(S, 480, 900, 400, 420).front();
  const F1 = person(S, 480, 900, "near", 1, { s: 0.8, mood: "smile", hair: "side", hairC: DS.c("ink"), outfitC: DS.c("purple") }); phones(S, F1, S.start, "red");
  palm(S, 1750, 940, 1.0);
  table(S, 1240, 1560, 760, 940, "wood");
  const F2 = person(S, 1400, 940, "near", 4, { s: 1.0, mood: "determined", look: -4, hair: "short", hairC: DS.c("brown", 2), outfitC: DS.c("pink") }); phones(S, F2, W(25, 2), "green");
  mic(S, 1320, 760, 0.8, W(25, 2));
  S.divider(960, S.start);
  DS.card(S, "201 HOURS", 480, 150, { size: DS.type.body });
  DS.card(S, "FLORIDA", 1440, 380, { size: DS.type.small, t: W(25, 4) });
  DS.card(S, "225 HOURS", 1440, 150, { size: DS.type.body, t: W(25, 6), tc: "red" });
  DS.vignette(S); }

// The Florida host was called Dave. Daves have been at this for a while.
{ const S = sc(26, 0, { cam: "pull", focus: "1100 560" }); DS.outdoor(S, { hy: 700, sky: "sky", hills: "sky", ground: "sand", sun: [1700, 200] });
  palm(S, 1700, 940, 1.0);
  table(S, 420, 760, 760, 940, "wood");
  const F2 = person(S, 600, 940, "near", 4, { s: 1.0, mood: "smile", look: 5, hair: "short", hairC: DS.c("brown", 2), outfitC: DS.c("pink") }); phones(S, F2, S.start, "green"); F2.setPose(W(26, 6), "wave");
  mic(S, 520, 760, 0.8, S.start);
  plate(S, 600, 470, "DAVE HUNTER", W(26, 4));
  const F = dave(S, 1220, 940, "near", { mood: "happy", look: -6, pose: "wave", t: W(26, 6) });
  DS.card(S, "A RIVAL CALLED DAVE", 900, 150, { size: DS.type.body, t: W(26, 4), tc: "red" });
  DS.card(S, "DAVES: SINCE 1959", 1220, 470, { size: DS.type.small, t: W(26, 9) });
  DS.vignette(S); }

// Then, over the New Year of nineteen sixty-four, a San Diego seventeen-year-old, Randy Gardner, went for it, for a science fair.
{ const S = sc(27, 0, { cam: "push", focus: "960 600" }); DS.room(S, ROOM.hall); fairHall(S);
  trifold(S, 1250, 760, { t: W(27, 19) });
  const F = randy(S, 840, GN, "near", { mood: "determined", look: 6 });
  plate(S, 840, 520, "RANDY GARDNER, 17", W(27, 12));
  DS.card(S, "NEW YEAR, 1964", 420, 300, { size: DS.type.small, t: W(27, 3) });
  DS.card(S, "SAN DIEGO", 1500, 300, { size: DS.type.small, t: W(27, 9) });
  DS.vignette(S); }

// He and two friends flipped a coin to see who would be the experiment. Randy lost.
{ const S = sc(28, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM.home64);
  const A = person(S, 600, GN, "near", 2, { s: 1.0, mood: "smile", look: 5 });
  const R = randy(S, 960, GN, "near", { mood: "smile", look: 0 });
  const B = person(S, 1320, GN, "near", 0, { s: 1.0, mood: "smile", look: -5 });
  plate(S, 960, 560, "RANDY", S.start);
  A.setPose(W(28, 4), "point"); const cg = coin(S, 780, 380, W(28, 4)); S.move(cg, W(28, 4), 1.0, { y: -70 }, "sine.out");
  DS.card(S, "WHO'S THE EXPERIMENT?", 960, 140, { size: DS.type.body, t: W(28, 9) });
  R.face(W(28, 14), "worried", 0); A.face(W(28, 14), "happy", 5); B.face(W(28, 14), "happy", -5);
  DS.card(S, "RANDY LOST", 960, 470, { size: DS.type.small, t: W(28, 14), tc: "red" });
  DS.vignette(S); }

// By day three, Randy felt sick every morning, and found that tangerines helped. / That's why Dave brought the tangerines.
{ const S = sc(29, 0, { cam: "push", focus: "800 560" }); DS.room(S, ROOM.home64);
  const R = randy(S, 640, GN, "near", { mood: "worried", look: 4, pose: "hold" });
  swirl(S, 700, 500, W(29, 5)); swirl(S, 590, 470, W(29, 5) + 0.2);
  const [hx, hy] = R.hand("R"); tangerine(S, hx + 8, hy - 20, 34, W(29, 11));
  R.face(W(29, 11), "smile", 4);
  DS.card(S, "DAY 3", 640, 250, { size: DS.type.title, t: W(29, 1), tc: "red" });
  DS.card(S, "TANGERINES HELPED", 640, 380, { size: DS.type.small, t: W(29, 11), tc: "green" });
  const gy = inset(S, 1400, 560, 560, 640, W(30, 0));
  const g = S.grp(); const F = dave(S, 1300, gy, "near", { s: 0.9, mood: "smile", look: 6, t: W(30, 0), parent: g });
  tangerines(S, 1510, gy, 0.6, { t: W(30, 0) });
  plate(S, 1400, 300, "DAVE, TONIGHT", W(30, 2));
  DS.vignette(S); }

// At three in the morning, Randy went to visit the local jail. / Why? He's not sure. Probably because it was open.
{ const S = sc(31, 0, { cam: "push", focus: "1000 560" }); DS.outdoor(S, { hy: 640, sky: "night", hills: "navy", ground: "gray", sun: false });
  const [ox, oy] = jail(S, 620, 900, S.start);
  const R = randy(S, 420, GN, "near", { mood: "smile", look: 6, pose: "wave" });
  DS.card(S, "3 A.M.", 1600, 150, { size: DS.type.title, t: W(31, 1), tc: "red" });
  say(S, 420, 420, 90, 80, 430, 570, ["?"], W(32, 0), { think: true, size: DS.type.title });
  ringIt(S, ox, oy - 8, 110, 50, W(32, 8));
  DS.card(S, "IT WAS OPEN", 1600, 300, { size: DS.type.small, t: W(32, 8) });
  DS.vignette(S); }

// And on day ten, the teenager who hadn't slept in ten days / beat a Stanford sleep scientist, William Dement, at pinball.
{ const S = sc(33, 0, { cam: "push", focus: "960 520" }); DS.room(S, ROOM.hall);
  const P = pinball(S, 900, GN, 1.0);
  const R = randy(S, 600, GN, "near", { mood: "tired", look: 6, pose: "reach" });
  const D = sci(S, 1340, GN, "near", { mood: "flat", look: -6, t: W(34, 2) });
  plate(S, 1340, 510, "WILLIAM DEMENT", W(34, 5));
  const b1 = S.text("BALL 1", P.scr[0], P.scr[1] + 14, { size: DS.type.small, c: DS.c("yellow") }); S.fadeOut(b1, W(34, 7), 0.2);
  S.text("RANDY WINS", P.scr[0], P.scr[1] + 14, { size: DS.type.caption, t: W(34, 7), c: DS.c("yellow") });
  R.setPose(W(34, 7), "armsUp"); R.face(W(34, 7), "happy", 4); D.face(W(34, 7), "wow", -6);
  DS.card(S, "DAY 10", 430, 160, { size: DS.type.title, t: W(33, 2), tc: "red" });
  DS.card(S, "NO SLEEP FOR 10 DAYS", 430, 290, { size: DS.type.caption, t: W(33, 8) });
  DS.card(S, "STANFORD SLEEP SCIENTIST", 1440, 300, { size: DS.type.caption, t: W(34, 2), tc: "red" });
  DS.vignette(S); }

// So far, it sounds almost easy. / But a navy medical officer, John Ross, was keeping notes.
{ const S = sc(35, 0, { cam: "push", focus: "1100 560" }); DS.room(S, ROOM.home64);
  const R = randy(S, 560, GN, "near", { mood: "happy", look: 4, pose: "hold" }); const [hx, hy] = R.hand("R"); tangerine(S, hx + 8, hy - 20, 34, S.start);
  DS.card(S, "ALMOST EASY", 560, 400, { size: DS.type.small, t: W(35, 4), tc: "green" });
  const J = who(S, 1240, GN, "near", { s: 1.1, hair: "short", hairC: DS.c("brown", 2), outfitC: DS.c("white"), mood: "determined", look: -6, pose: "hold", t: W(36, 2) }); navyCap(S, J, W(36, 2));
  const [jx, jy] = J.hand("R"); paperR(S, jx - 70, jy - 80, 140, 170, { t: W(36, 2) }); lines(S, jx - 50, jy - 40, 100, 3, W(36, 2), 34);
  plate(S, 1240, 520, "JOHN ROSS, US NAVY", W(36, 5));
  DS.card(S, "KEEPING NOTES", 1240, 150, { size: DS.type.body, t: W(36, 8), tc: "red" });
  DS.vignette(S); }

// By day four, he was moody, forgetful, and unable to concentrate.
{ const S = sc(37, 0, { cam: "push", focus: "900 460" }); DS.room(S, ROOM.board); notebookCU(S);
  hand("Day 4:", 600, 210, W(37, 1))(S);
  hand("moody", 640, 382, W(37, 5))(S); hand("forgetful", 640, 534, W(37, 6))(S); hand("can't concentrate", 640, 686, W(37, 8))(S);
  [382, 534, 686].forEach((y, i) => tick(S, 1340, y - 26, 1.2, [W(37, 5), W(37, 6), W(37, 8)][i], "red"));
  S.pencil(1420, 800, 260, -40, S.start, 0);
  DS.vignette(S); }

// Then came his first hallucination: / he mistook a street sign for a person.
{ const S = sc(38, 0, { cam: "push", focus: "1000 560" }); DS.outdoor(S, { hy: 660, sky: "sky", sun: [1650, 180], path: [600, 1300] });
  sign(S, 1240, 920, S.start);
  const R = randy(S, 720, GN, "near", { mood: "happy", look: 7, pose: "wave" });
  DS.card(S, "FIRST HALLUCINATION", 960, 140, { size: DS.type.body, t: W(38, 3) });
  say(S, 500, 440, 230, 80, 680, 570, ["HELLO THERE!"], W(39, 1));
  DS.card(S, "A STREET SIGN", 1560, 720, { size: DS.type.small, t: W(39, 3), tc: "red" });
  DS.vignette(S); }

// Next, he became convinced he was a famous football player. / He was, in fact, a science fair project.
{ const S = sc(40, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM.hall); fairHall(S, { banner: false });
  trifold(S, 1360, 760);
  const R = randy(S, 820, GN, "near", { mood: "determined", look: 4 });
  const th = say(S, 520, 400, 220, 150, 760, 560, [], W(40, 7), { think: true });
  helmet(S, 470, 400, 0.9, W(40, 7)); football(S, 600, 430, 0.8, W(40, 8));
  DS.card(S, "FAMOUS FOOTBALL PLAYER", 960, 140, { size: DS.type.body, t: W(40, 7) });
  DS.card(S, "SCIENCE FAIR PROJECT", 1360, 340, { size: DS.type.small, t: W(41, 5), tc: "red" });
  S.arrow(1250, 380, 900, 620, W(41, 5), 0.4, { c: DS.c("red"), w: DS.w.near, bend: 0.2 });
  DS.vignette(S); }

// On day eleven, Ross asked him to count down from a hundred in sevens.
{ const S = sc(42, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM.home64);
  const J = who(S, 1280, GN, "near", { s: 1.1, hair: "short", hairC: DS.c("brown", 2), outfitC: DS.c("white"), mood: "flat", look: -6, pose: "hold" }); navyCap(S, J, S.start);
  const R = randy(S, 640, GN, "near", { mood: "tired", look: 6 });
  DS.card(S, "DAY 11", 960, 140, { size: DS.type.title, t: W(42, 1), tc: "red" });
  say(S, 1000, 380, 260, 100, 1180, 560, ["100, MINUS 7,", "MINUS 7..."], W(42, 7));
  DS.vignette(S); }

// A hundred, ninety-three, eighty-six, seventy-nine, seventy-two, sixty-five.
const SEVENS = ["100", "93", "86", "79", "72", "65"];
const sevens = (S, ts) => SEVENS.forEach((n, i) => { const x = 620 + (i % 3) * 270, y = 400 + Math.floor(i / 3) * 228; hand(n, x, y, ts[i], { size: DS.type.display, anchor: "middle" })(S); if (i % 3) hand("–7", x - 135, y - 70, ts[i], { size: DS.type.small, anchor: "middle", c: DS.c("red", 2) })(S); });
{ const S = sc(43, 0, { cam: "push", focus: "900 460" }); DS.room(S, ROOM.board); notebookCU(S);
  hand("Day 11:", 600, 210, S.start)(S);
  sevens(S, [1, 2, 3, 4, 5, 6].map((i) => W(43, i)));
  DS.vignette(S); }

// Then he stopped, and Ross asked him why. / He'd forgotten what he was doing.
{ const S = sc(44, 0, { cam: "zoom", focus: "1000 640" }); DS.room(S, ROOM.board); notebookCU(S);
  hand("Day 11:", 600, 210, S.start)(S); sevens(S, SEVENS.map(() => S.start));
  hand("...", 620, 856, W(44, 2), { size: DS.type.display, anchor: "middle" })(S);
  S.text("?", 890, 860, { size: DS.type.display, t: W(44, 7), c: DS.c("red", 2) });
  DS.card(S, "FORGOT WHAT HE WAS DOING", 960, 960 - 60, { size: DS.type.small, t: W(45, 1), tc: "red" });
  DS.vignette(S); }

// At two hundred and sixty-four hours, Randy went to bed.
const room64bed = (S, o = {}) => { const Bd = bed(S, 620, GN, 580, { blanket: "orange" }); const top = sideTable(S, 1380, GN, 180, 200); tangerine(S, 1380, top - 30, 30, S.start); return Bd; };
{ const S = sc(46, 0, { cam: "push", focus: "900 640" }); DS.room(S, ROOM.home64);
  const Bd = room64bed(S); const R = sleeper(S, Bd.px, Bd.py, 0.95, randy, { t: W(46, 6) }); Bd.bl(1);
  zz(S, Bd.px + 60, Bd.py - 110, W(46, 8));
  DS.card(S, "264 HOURS", 960, 140, { size: DS.type.title, t: W(46, 1), tc: "red" });
  DS.vignette(S); }

// He slept nearly fifteen hours, and woke up, in his words, no groggier than a normal person.
{ const S = sc(47, 0, { cam: "push", focus: "900 600" }); DS.room(S, ROOM.home64);
  const Bd = room64bed(S);
  const sg = S.grp(); const R = sleeper(S, Bd.px, Bd.py, 0.95, randy, {}); const bl = Bd.bl(1); [R.all, bl].forEach((e) => S.fadeOut(e, W(47, 6), 0.35));
  const zg = zz(S, Bd.px + 60, Bd.py - 110, S.start); S.fadeOut(zg, W(47, 6), 0.3);
  const ug = S.grp(); const U = randy(S, Bd.px + 70, Bd.top + 40, "near", Object.assign({ sit: true, float: true, mood: "smile", look: 4, parent: ug }, LEGS)); const lp = Bd.lap("orange"); [ug, lp].forEach((e) => S.fadeIn(e, W(47, 6), 0.35));
  wallClock(S, 760, 280, 80, 7, 0).spin(W(47, 1), 2.4, 15);
  DS.card(S, "NEARLY 15 HOURS", 760, 440, { size: DS.type.small, t: W(47, 2) });
  DS.card(S, "NO GROGGIER THAN A NORMAL PERSON", 960, 130, { size: DS.type.small, t: W(47, 11), tc: "green" });
  DS.vignette(S); }

// So that's the answer? Eleven days, one long nap, back to normal? / Not quite. Even Randy's record has holes in it.
{ const S = sc(48, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM.board);
  S.text("11 DAYS", 370, 230, { size: DS.type.body, t: W(48, 4), c: DS.c("ink") }); S.text("+", 600, 230, { size: DS.type.body, t: W(48, 6), c: DS.c("ink") });
  S.text("1 LONG NAP", 900, 230, { size: DS.type.body, t: W(48, 6), c: DS.c("ink") }); S.text("=", 1190, 230, { size: DS.type.body, t: W(48, 9), c: DS.c("ink") });
  S.text("NORMAL?", 1430, 230, { size: DS.type.body, t: W(48, 9), c: DS.c("green", 2) });
  cert(S, 960, 600, 760, 440, [["WORLD RECORD", -110, DS.type.small], ["264 HOURS", 0, DS.type.display, "red"], ["RANDY GARDNER, 1964", 100, DS.type.caption]]);
  [[760, 500, 34], [1130, 690, 28], [880, 760, 22], [1180, 470, 20], [700, 680, 18]].forEach(([x, y, r], i) => { S.draw(circ(x, y, r), W(49, 6) + i * 0.08, 0, { fill: DS.c("paper", 2), c: DS.c("ink"), w: DS.w.detail }); });
  DS.card(S, "NOT QUITE", 1500, 420, { size: DS.type.body, t: W(49, 0), tc: "red" });
  DS.card(S, "HOLES", 1500, 820, { size: DS.type.body, t: W(49, 6), tc: "red" });
  DS.vignette(S); }

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
{ const S = sc(50, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM.home64);
  const D = sci(S, 330, GN, "near", { mood: "flat", look: 6 }); plate(S, 330, 520, "WILLIAM DEMENT", S.start);
  const R = randy(S, 960, GN, "near", { mood: "tired", look: 0 });
  const A = person(S, 1340, GN, "near", 2, { s: 1.0, mood: "flat", look: -6, t: W(50, 6) }); const B = person(S, 1580, GN, "near", 0, { s: 1.0, mood: "flat", look: -6, t: W(50, 6) });
  wallClock(S, 960, 250, 70, 3, 0).spin(W(50, 6), 2.2, 6);
  DS.card(S, "WATCHED AROUND THE CLOCK", 1300, 420, { size: DS.type.small, t: W(50, 6) });
  R.face(W(50, 12), "sleep", 0); R.face(W(50, 12) + 0.7, "tired", 0);
  DS.card(S, "MICROSLEEPS", 960, 130, { size: DS.type.title, t: W(50, 12), tc: "red" });
  DS.vignette(S); }

// A microsleep is a few seconds, fifteen at most, / when your brain slips into light sleep without asking you.
{ const S = sc(51, 0, { cam: "push", focus: "1100 560" }); DS.room(S, ROOM.board);
  stopwatch(S, 450, 520, 190, { turn: 90, dur: 1.4, go: W(51, 4) });
  DS.card(S, "15 SECONDS AT MOST", 450, 830, { size: DS.type.small, t: W(51, 6), tc: "red" });
  playSlide(S, 1030, 360, 1600, 900, S.start); pillow(S, 1650, 905, 1.0, S.start);
  const bg = S.grp(); brainTop(S, 1010, 280, 0.42, { parent: bg }); slide(bg, W(52, 3), 0.9, 560, 520, "power2.in");
  DS.card(S, "LIGHT SLEEP", 1640, 700, { size: DS.type.small, t: W(52, 5) });
  DS.card(S, "WITHOUT ASKING", 1200, 150, { size: DS.type.body, t: W(52, 7) });
  DS.vignette(S); }

// Your eyes can even stay open. / And afterwards, you don't think you slept. You think you lost focus for a second.
{ const S = sc(53, 0, { cam: "push", focus: "960 600" }); DS.room(S, ROOM.den); den(S, { board: false, tang: false, lamp: false });
  const F = dave(S, 760, 1300, "near", { s: 2.4, mood: "flat", look: 0, float: true });
  const th = say(S, 1360, 400, 230, 140, 990, 560, [], W(52, 9), { think: true }); zz(S, 1300, 450, W(52, 9), { c: DS.c("navy", 2) });
  DS.card(S, "EYES OPEN", 760, 160, { size: DS.type.body, t: W(53, 4), tc: "red" });
  const t2 = say(S, 1360, 660, 220, 76, 1000, 700, ["I SLEPT?"], W(54, 4)); xMark(S, 1530, 620, 1.2, W(54, 6));
  DS.card(S, "\"I LOST FOCUS\"", 1360, 860, { size: DS.type.body, t: W(54, 10) });
  DS.vignette(S); }

// Hour forty, and Dave checks in again. / "Honestly, I feel totally..."
{ const S = sc(55, 0, { cam: "push", focus: "1000 560" }); DS.room(S, ROOM.den); den(S, { board: { n: 40, from: 17, go: W(55, 1), dur: 1.0 } });
  const F = dave(S, 1200, GN, "near", { s: 1.2, mood: "tired", look: -4 }); F.slump(S.start, 0.01, 4);
  DS.card(S, "HOUR 40", 760, 120, { size: DS.type.body, t: W(55, 1), tc: "red" });
  say(S, 700, 640, 330, 110, 1040, 620, ["HONESTLY, I FEEL", "TOTALLY..."], W(56, 0));
  DS.vignette(S); }

// Four seconds later, he finishes the sentence. / "Fine. Sorry, where was I?"
{ const S = sc(57, 0, { cam: "zoom", focus: "1100 560" }); DS.room(S, ROOM.den); den(S, { board: { n: 40 } });
  const F = dave(S, 1200, GN, "near", { s: 1.2, mood: "flat", look: 0 }); F.slump(S.start, 0.01, 4);
  const b1 = say(S, 700, 640, 330, 110, 1040, 620, ["HONESTLY, I FEEL", "TOTALLY..."], S.start); S.fadeOut(b1, W(58, 0) - 0.1, 0.2);
  stopwatch(S, 1180, 330, 80, { turn: 24, dur: 2.6, go: S.start + 0.1 });
  DS.card(S, "4 SECONDS LATER", 760, 120, { size: DS.type.body, t: W(57, 0), tc: "red" });
  say(S, 700, 640, 330, 110, 1040, 620, ["FINE. SORRY,", "WHERE WAS I?"], W(58, 0));
  F.face(W(58, 1), "worried", -3);
  DS.vignette(S); }

// It gets stranger. In twenty eleven, a Wisconsin team kept rats awake and listened to single brain cells.
{ const S = sc(59, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM.lab);
  const top = table(S, 520, 1300, 700, GN, "gray");
  const R = rat(S, 780, top, 1.2, { cap: true });
  S.draw(`M${R.cap[0]} ${R.cap[1]} Q${R.cap[0] + 160} ${R.cap[1] - 160} 1100 ${top - 190}`, S.start, 0, { c: DS.c("ink", 1), w: DS.w.detail });
  speaker(S, 1100, top - 100, S.start, W(59, 13));
  const F = sci(S, 1520, GN, "near", { mood: "wow", look: -6 }); phones(S, F, S.start, "gray");
  DS.card(S, "2011 · WISCONSIN", 960, 130, { size: DS.type.body, t: W(59, 4) });
  DS.card(S, "SINGLE BRAIN CELLS", 960, 260, { size: DS.type.small, t: W(59, 15), tc: "red" });
  DS.vignette(S); }

// The rats were up and active. / But small groups of their brain cells kept switching off, the way they do in sleep.
{ const S = sc(60, 0, { cam: "push", focus: "1200 520" }); DS.room(S, ROOM.lab);
  wheel(S, 500, 560, 210, S.start, S.end, S.start); const R = rat(S, 500, 760, 0.9, { cap: true });
  DS.card(S, "UP AND ACTIVE", 500, 220, { size: DS.type.small, t: W(60, 3), tc: "green" });
  brainMap(S, 1260, 540, 1.45, { off: [[-90, -60, 50, W(61, 8)], [80, 50, 46, W(61, 8) + 0.35], [-60, 90, 40, W(61, 9)]] });
  DS.card(S, "SWITCHING OFF", 1260, 150, { size: DS.type.body, t: W(61, 8), tc: "red" });
  DS.vignette(S); }

// The longer the rats stayed up, the more it happened, / and the worse they got at reaching for sugar pellets.
{ const S = sc(62, 0, { cam: "push", focus: "960 520" }); DS.room(S, ROOM.lab);
  wboard(S, 200, 140, 900, 640);
  S.draw(line([300, 680], [1020, 680], 0) + line([300, 680], [300, 230], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.mid });
  txt(S, "HOURS AWAKE", 660, 740); txt(S, "SWITCH-OFFS", 420, 210);
  growLine(S, smooth([[310, 660], [520, 620], [720, 520], [880, 400], [1000, 270]]), W(62, 1), 2.0, [300, 220, 720, 470]);
  const top = table(S, 1180, 1760, 700, GN, "gray");
  const R = rat(S, 1380, top, 1.1, { mood: "worried" });
  const pg = S.grp(); [[1590, 0], [1626, -6], [1608, -38]].forEach(([x, dy]) => DS.shape(S, rrect(x - 16, top - 32 + dy, 32, 32, DS.r.xs), "white", { parent: pg, w: "detail" }));
  slide(pg, W(63, 6), 0.7, 60, 230, "power2.in");
  DS.card(S, "WORSE AT SUGAR PELLETS", 1470, 300, { size: DS.type.small, t: W(63, 6), tc: "red" });
  DS.vignette(S); }

// Which, for a rat, is the one job that matters.
{ const S = sc(64, 0, { cam: "push", focus: "960 540" }); DS.room(S, ROOM.lab);
  paperR(S, 600, 140, 600, 620);
  txt(S, "RAT", 900, 230, { size: DS.type.title }); txt(S, "JOB DESCRIPTION", 900, 300, { size: DS.type.small });
  hand("1. sugar pellets", 660, 430, S.start, { size: DS.type.title })(S);
  [520, 600, 680].forEach((y) => S.draw(line([660, y], [1140, y], 0), S.start, 0, { c: DS.c("gray", 1), w: DS.w.hair }));
  const top = table(S, 1240, 1760, 760, GN, "gray"); rat(S, 1480, top, 1.1, {});
  DS.card(S, "THE ONE JOB", 900, 840, { size: DS.type.body, t: W(64, 6), tc: "red" });
  DS.vignette(S); }

// So the brain doesn't wait for permission. / If you won't sleep, it starts sleeping in pieces.
{ const S = sc(65, 0, { cam: "push", focus: "1200 520" }); DS.room(S, ROOM.board);
  formSheet(S, 480, 520, S.start);
  stamp(S, 480, 740, "DIDN'T ASK", W(65, 4), "red", { size: DS.type.body });
  brainMap(S, 1250, 500, 1.45, { off: [[-100, -70, 46, W(66, 6)], [90, -30, 48, W(66, 6) + 0.3], [-40, 100, 42, W(66, 8)], [100, 110, 36, W(66, 8) + 0.25]] });
  DS.card(S, "SLEEPING IN PIECES", 1250, 140, { size: DS.type.body, t: W(66, 6), tc: "red" });
  DS.vignette(S); }

// And that's one reason Guinness quit in nineteen ninety-seven.
const note = (S, x, y, str, t, name = "yellow") => { DS.drop(S, rect(x - 146, y - 66, 300, 140), { t }); DS.shape(S, rect(x - 150, y - 74, 300, 140), name, { t, flat: true, w: "detail", tone: 1 }); txt(S, str, x, y + 14, { t, size: DS.type.small }); };
{ const S = sc(67, 0, { cam: "push", focus: "860 480" }); DS.room(S, ROOM.board);
  recordBook(S, 860, 470, 900, 480); stamp(S, 1080, 470, "CLOSED", S.start, "red", { size: DS.type.title });
  note(S, 1500, 330, "REASON 1", W(67, 3));
  DS.card(S, "GUINNESS QUIT · 1997", 860, 150, { size: DS.type.body, t: W(67, 4) });
  DS.vignette(S); }

// You can't prove someone stayed awake / when even they don't know they nodded off.
{ const S = sc(68, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM.board);
  DS.shadow(S, 760, GN, 300); DS.shape(S, rect(660, 700, 260, 30), "wood"); DS.shape(S, rect(640, 440, 30, 290), "wood"); [670, 890].forEach((x) => DS.shape(S, rect(x, 730, 20, 230), "wood", { w: "mid" }));
  const C = person(S, 740, 750, "near", 5, { sit: true, float: true, mood: "flat", look: 4, pose: "hold" });
  plate(S, 760, 840, "No. 7", S.start);
  const J = judge(S, 1340, GN, { look: -6 });
  DS.card(S, "STAYED AWAKE?", 800, 150, { size: DS.type.body, t: W(68, 2) });
  zz(S, 820, 400, W(69, 6), { c: DS.c("navy", 2) });
  DS.card(S, "EVEN THEY DON'T KNOW", 1300, 300, { size: DS.type.small, t: W(69, 1), tc: "red" });
  DS.vignette(S); }

// The other reason was simpler: it's dangerous.
{ const S = sc(70, 0, { cam: "push", focus: "1200 480" }); DS.room(S, ROOM.board);
  recordBook(S, 860, 470, 900, 480); stamp(S, 1080, 470, "CLOSED", S.start, "red", { size: DS.type.title });
  note(S, 1500, 330, "REASON 1", S.start); note(S, 1500, 560, "REASON 2", W(70, 1), "pink");
  warnSign(S, 1500, 790, 110, W(70, 6));
  DS.card(S, "DANGEROUS", 860, 150, { size: DS.type.title, t: W(70, 6), tc: "red" });
  DS.vignette(S); }

// The last record they accepted, in nineteen eighty-six, was four hundred and fifty-three hours,
{ const S = sc(71, 0, { cam: "push", focus: "960 520" }); DS.room(S, ROOM.board);
  cert(S, 960, 520, 900, 560, [["THE LAST RECORD ACCEPTED", -150, DS.type.small], ["453 HOURS", 10, DS.type.display, "red", W(71, 9)], ["1986", 130, DS.type.body, null, W(71, 6)]]);
  DS.vignette(S); }

// set in a rocking chair, the one piece of furniture designed to put people to sleep.
{ const S = sc(72, 0, { cam: "push", focus: "900 560" }); DS.room(S, { wall: "wall", floor: "wood", window: [1300, 170, 220, 200] });
  DS.rug(S, 860, 930, 760, "red");
  const C = rockingChair(S, 860, GN, 1.25);
  who(S, 830, C.seat + 46, "near", { s: 1.05, sit: true, float: true, hair: "short", hairC: DS.c("gray", 1), outfitC: DS.c("green"), mood: "determined", look: 6, parent: C.g });
  rock(C.g, S.start, S.end, 4, 860, GN);
  zz(S, 640, 380, W(72, 10), { c: DS.c("purple", 2) });
  DS.card(S, "A ROCKING CHAIR", 860, 150, { size: DS.type.body, t: W(72, 3) });
  DS.card(S, "BUILT TO PUT YOU TO SLEEP", 1400, 560, { size: DS.type.small, t: W(72, 10), tc: "red" });
  DS.vignette(S); }

// So Dave's certificate is off. / But what is sleep for, and can he skip just that part?
{ const S = sc(73, 0, { cam: "push", focus: "900 520" }); DS.room(S, ROOM.den); const B = den(S, { board: { n: 40 } });
  stamp(S, 760, 330, "CERTIFICATE: NO", W(73, 2), "red", { size: DS.type.body });
  const F = dave(S, 1200, GN, "near", { mood: "sad", look: -6 }); F.face(W(74, 1), "worried", 6);
  const th = say(S, 1440, 560, 230, 120, 1270, 640, [], W(74, 8), { think: true });
  DS.shape(S, rrect(1290, 520, 300, 40, DS.r.sm), "night", { t: W(74, 8), flat: true, w: "detail" }); txt(S, "SLEEP", 1440, 506, { t: W(74, 8), size: DS.type.caption });
  DS.shape(S, rrect(1370, 580, 150, 56, DS.r.sm), "ink", { t: W(74, 8), flat: true, w: "detail" }); S.text("SKIP >>", 1445, 620, { size: DS.type.caption, t: W(74, 8), c: DS.P.white[0] });
  DS.card(S, "WHAT IS SLEEP FOR?", 960, 120, { size: DS.type.body, t: W(74, 1) });
  DS.vignette(S); }

// ===================== 5. The night shift =====================
// In twenty thirteen, Maiken Nedergaard's lab at the University of Rochester watched the brains of sleeping mice.
{ const S = sc(75, 0, { cam: "push", focus: "900 600" }); DS.room(S, ROOM.lab);
  const top = table(S, 340, 1340, 680, GN, "gray");
  mouseBed(S, 720, top, S.start);
  microscope(S, 1160, top, S.start);
  const F = sci(S, 1560, GN, "near", { hair: "bun", hairC: DS.c("brown", 1), mood: "smile", look: -6 });
  DS.card(S, "2013 · NEDERGAARD LAB", 960, 130, { size: DS.type.body, t: W(75, 1) });
  DS.card(S, "UNIVERSITY OF ROCHESTER", 960, 250, { size: DS.type.small, t: W(75, 8) });
  DS.card(S, "SLEEPING MICE", 720, 420, { size: DS.type.small, t: W(75, 15) });
  DS.vignette(S); }

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
{ const S = sc(76, 0, { cam: "push", focus: "800 540" }); DS.room(S, ROOM.lab);
  lens(S, 800, 520, 380, { wide: W(76, 8) });
  rat(S, 1500, 880, 0.9, { eyes: "shut", flip: true }); zz(S, 1430, 760, S.start);
  DS.card(S, "GAPS BETWEEN CELLS", 800, 110, { size: DS.type.body, t: W(76, 4) });
  DS.card(S, "+60%", 1500, 400, { size: DS.type.display, t: W(76, 11), tc: "red" });
  DS.vignette(S); }

// and fluid rushed through, carrying waste away faster than when awake.
{ const S = sc(77, 0, { cam: "push", focus: "800 540" }); DS.room(S, ROOM.lab);
  lens(S, 800, 520, 380, { wide: true, flow: W(77, 1) });
  rat(S, 1500, 880, 0.9, { eyes: "shut", flip: true }); zz(S, 1430, 760, S.start);
  DS.card(S, "FLUID RUSHES THROUGH", 800, 110, { size: DS.type.body, t: W(77, 1) });
  DS.card(S, "WASTE OUT, FASTER", 1500, 400, { size: DS.type.small, t: W(77, 7), tc: "green" });
  DS.vignette(S); }

// So sleep looked less like switching off for the night, / and more like a dishwasher that only runs once the kitchen is closed.
{ const S = sc(78, 0, { cam: "push", focus: "960 600" }); DS.room(S, ROOM.kitchen); nightWin(S, 400, 190, 200, 200);
  const [dx, dy] = kitchenSet(S);
  lightSwitch(S, 1660, 520, S.start); xMark(S, 1660, 520, 1.8, W(78, 5));
  closedSign(S, 960, 330, S.start);
  const bub = S.grp(); [[-80, -30, 22], [-20, -60, 30], [50, -40, 18], [100, -80, 26], [10, -110, 16]].forEach(([a, b, r]) => S.draw(circ(dx + a, dy + b, r), W(79, 4), 0, { c: DS.c("sky", 2), w: DS.w.detail, fill: DS.c("white"), parent: bub }));
  S.move(bub, W(79, 4), 2.5, { y: -40 }, "sine.out");
  DS.shape(S, circ(dx + 110, dy + 4, 9), "green", { t: W(79, 4), w: "hair" });
  DS.card(S, "SWITCHING OFF?", 1560, 390, { size: DS.type.small, t: W(78, 5), tc: "red" });
  DS.card(S, "A DISHWASHER", 960, 900, { size: DS.type.body, t: W(79, 4), tc: "green" });
  DS.vignette(S); }

// But in twenty twenty-four, a team at Imperial College London measured it a different way,
{ const S = sc(80, 0, { cam: "push", focus: "900 600" }); DS.room(S, ROOM.lab);
  const top = table(S, 340, 1340, 680, GN, "gray");
  mouseBed(S, 720, top, S.start, 2);
  DS.shape(S, rrect(1100, top - 220, 120, 220, DS.r.sm), "glass", { w: "mid" }); DS.shape(S, rect(1112, top - 110, 96, 104), "green", { flat: true, tone: 1, w: "hair" }); S.draw(line([1100, top - 250], [1220, top - 250], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.mid });
  const F = sci(S, 1560, GN, "near", { hair: "side", hairC: DS.c("ink"), mood: "determined", look: -6 });
  DS.card(S, "2024 · IMPERIAL COLLEGE LONDON", 960, 130, { size: DS.type.body, t: W(80, 2) });
  DS.card(S, "MEASURED A DIFFERENT WAY", 960, 250, { size: DS.type.small, t: W(80, 10) });
  DS.vignette(S); }

// and in their mice, clearing was slower during sleep, not faster.
{ const S = sc(81, 0, { cam: "push", focus: "960 540" }); DS.room(S, ROOM.lab);
  wboard(S, 420, 150, 1080, 680);
  S.draw(line([540, 700], [1380, 700], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.mid });
  txt(S, "WASTE CLEARED", 960, 230, { size: DS.type.small });
  bar(S, 760, 700, 200, 360, "sky", W(81, 3), "AWAKE", { size: DS.type.small });
  bar(S, 1160, 700, 200, 250, "night", W(81, 6), "ASLEEP", { size: DS.type.small });
  DS.card(S, "SLOWER, NOT FASTER", 960, 920 - 20, { size: DS.type.body, t: W(81, 6), tc: "red" });
  DS.vignette(S); }

// So how the brain cleans up is still argued about. / Whether sleep matters is not.
{ const S = sc(82, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM.lab);
  const top = table(S, 760, 1160, 720, GN, "gray"); brainTop(S, 960, top - 110, 0.55);
  const A = sci(S, 470, GN, "near", { hair: "bun", hairC: DS.c("brown", 1), mood: "angry", look: 6 }), B = sci(S, 1450, GN, "near", { hair: "side", hairC: DS.c("ink"), mood: "angry", look: -6 });
  const b1 = say(S, 470, 380, 170, 70, 490, 540, ["FASTER!"], W(82, 8)), b2 = say(S, 1450, 380, 170, 70, 1430, 540, ["SLOWER!"], W(82, 8) + 0.2);
  [b1, b2].forEach((b) => S.fadeOut(b, W(83, 0), 0.25));
  A.face(W(83, 2), "smile", 6); B.face(W(83, 2), "smile", -6);
  DS.card(S, "STILL ARGUED ABOUT", 960, 140, { size: DS.type.body, t: W(82, 7) });
  DS.card(S, "SLEEP MATTERS", 960, 400, { size: DS.type.title, t: W(83, 2), tc: "green" });
  DS.vignette(S); }

// That leaves Dave one last hope: sleep like the animals that seem not to.
{ const S = sc(84, 0, { cam: "push", focus: "800 520" }); DS.room(S, ROOM.board);
  tile(S, 380, 500, "DOLPHIN", W(84, 9), (x, y) => dolphin(S, x, y + 20, 0.62, { t: W(84, 9) }), { tw: 330, th: 380 });
  tile(S, 760, 500, "DUCK", W(84, 9) + 0.2, (x, y) => duck(S, x, y + 110, 0.75, { t: W(84, 9) + 0.2, L: "open", R: "open" }), { tw: 330, th: 380 });
  tile(S, 1140, 500, "FRIGATEBIRD", W(84, 9) + 0.4, (x, y) => frigate(S, x + 20, y + 20, 0.55, { t: W(84, 9) + 0.4 }), { tw: 330, th: 380 });
  const F = dave(S, 1580, GN, "near", { mood: "determined", look: -6, pose: "pointL" });
  DS.card(S, "ONE LAST HOPE", 760, 150, { size: DS.type.body, t: W(84, 3), tc: "green" });
  DS.vignette(S); }

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
{ const S = sc(85, 0, { cam: "push", focus: "800 560" }); DS.outdoor(S, SEA);
  dolphin(S, 760, 640, 1.5, {}); const shut = S.grp(); dolphin(S, 760, 640, 1.5, { eye: "shut", parent: shut }); shut.setAttribute("opacity", 0);
  tl.fromTo(shut, { opacity: 0 }, { opacity: 1, duration: 0.25 }, W(86, 2)); tl.to(shut, { opacity: 0, duration: 0.25 }, W(86, 11));
  waterFront(S, 700);
  const Bn = brainTop(S, 1460, 400, 0.85, { t: W(86, 2) });
  tl.fromTo(Bn.halves.L, { opacity: 0 }, { opacity: 1, duration: 0.35 }, W(86, 3)); tl.to(Bn.halves.L, { opacity: 0, duration: 0.35 }, W(86, 11));
  tl.fromTo(Bn.halves.R, { opacity: 0 }, { opacity: 1, duration: 0.35, immediateRender: false }, W(86, 11));
  DS.card(S, "CAN'T PASS OUT AT SEA", 760, 140, { size: DS.type.body, t: W(85, 3) });
  DS.card(S, "ONE HALF AT A TIME", 1460, 620, { size: DS.type.small, t: W(86, 3), tc: "red" });
  DS.vignette(S); }

// a row of four ducks on a log; the end ducks keep their outward eye open
const DX = [560, 820, 1080, 1340];
const duckRow = (S, o = {}) => {
  DS.shape(S, circ(950, 900, 760, 120), "blue", { layer: "mid", flat: true, tone: 1 });
  DS.shadow(S, 950, 832, 1100); DS.shape(S, rrect(380, 760, 1140, 90, DS.r.lg), "wood"); DS.shape(S, circ(1520, 805, 26, 45), "wood", { tone: 1, w: "mid" }); S.draw(circ(1520, 805, 12, 24), S.start, 0, { c: DS.c("wood", 2), w: DS.w.detail });
  DX.forEach((x, i) => duck(S, x, 780, 1.0, i === 0 ? { L: "open", Lt: o.open } : i === 3 ? { R: "open", Rt: o.open } : {}));
};
// In a row of sleeping ducks, the ones at the ends keep one eye open more often, / usually the eye facing away from the group.
{ const S = sc(87, 0, { cam: "push", focus: "950 560" }); DS.outdoor(S, { hy: 620, sky: "sky", sun: [1620, 180] });
  duckRow(S, { open: W(87, 12) });
  [1, 2].forEach((i) => zz(S, DX[i] + 20, 520, W(87, 4)));
  S.arrow(DX[0] - 60, 590, DX[0] - 230, 540, W(88, 3), 0.3, { c: DS.c("red"), w: DS.w.near });
  S.arrow(DX[3] + 60, 590, DX[3] + 230, 540, W(88, 3), 0.3, { c: DS.c("red"), w: DS.w.near });
  DS.card(S, "THE ENDS: ONE EYE OPEN", 950, 140, { size: DS.type.body, t: W(87, 10), tc: "red" });
  DS.card(S, "FACING AWAY", 950, 270, { size: DS.type.small, t: W(88, 3) });
  DS.vignette(S); }

// The ducks in the middle just trust the ducks at the ends.
{ const S = sc(89, 0, { cam: "zoom", focus: "950 620" }); DS.outdoor(S, { hy: 620, sky: "sky", sun: [1620, 180] });
  duckRow(S, { open: S.start });
  [1, 2].forEach((i) => zz(S, DX[i] + 20, 520, S.start));
  ringIt(S, 950, 640, 240, 160, W(89, 4), "green");
  DS.card(S, "THE MIDDLE: TRUST", 950, 140, { size: DS.type.body, t: W(89, 6), tc: "green" });
  DS.vignette(S); }

// Frigatebirds fly over the ocean for days without landing. / In twenty sixteen, Niels Rattenborg's team put brain recorders on them.
{ const S = sc(90, 0, { cam: "push", focus: "960 460" }); DS.outdoor(S, SEA2);
  const g = S.grp(); frigate(S, 900, 440, 1.5, { parent: g, cap: true, capT: W(91, 7) }); S.draw(circ(900 + 70 * 1.5, 440 - 38 * 1.5, 52), W(91, 7), 0, { c: DS.c("green"), w: DS.w.near, parent: g }); S.move(g, S.start, S.len, { x: 80, y: -20 }, "none");
  DS.card(S, "DAYS WITHOUT LANDING", 960, 130, { size: DS.type.body, t: W(90, 6) });
  DS.card(S, "2016 · RATTENBORG'S TEAM", 960, 860, { size: DS.type.small, t: W(91, 1) });
  DS.card(S, "BRAIN RECORDER", 1480, 600, { size: DS.type.small, t: W(91, 7), tc: "green" });
  DS.vignette(S); }

// In flight, they slept about forty minutes a day, in ten-second naps, often one half at a time.
{ const S = sc(92, 0, { cam: "push", focus: "800 460" }); DS.outdoor(S, SEA2);
  const g = S.grp(); frigate(S, 760, 460, 1.4, { parent: g, eye: "shut", cap: true }); S.move(g, S.start, S.len, { x: 70, y: -16 }, "none");
  zz(S, 1000, 330, W(92, 10));
  const Bn = brainTop(S, 1520, 560, 0.62, { L: "asleep", at: { L: W(92, 13) } });
  DS.card(S, "ABOUT 40 MINUTES A DAY", 760, 130, { size: DS.type.body, t: W(92, 5), tc: "red" });
  DS.card(S, "10-SECOND NAPS", 1520, 820, { size: DS.type.small, t: W(92, 10) });
  DS.vignette(S); }

// Then they land, and sleep over twelve hours a day. / The champion of not sleeping goes home and sleeps half the day.
{ const S = sc(93, 0, { cam: "push", focus: "900 560" }); DS.outdoor(S, { hy: 640, sky: "dusk", sun: [1620, 240], hills: "grass", ground: "sand" });
  bush(S, 820, 920, 560, S.start); frigatePerch(S, 800, 500, 1.6, {});
  zz(S, 1000, 300, S.start);
  trophy(S, 1400, 900, 1.3, W(94, 1));
  DS.card(S, "OVER 12 HOURS A DAY", 960, 130, { size: DS.type.body, t: W(93, 5), tc: "red" });
  DS.card(S, "CHAMPION OF NOT SLEEPING", 1400, 520, { size: DS.type.small, t: W(94, 1) });
  DS.vignette(S); }

// None of them skip sleep. They just found loopholes.
{ const S = sc(95, 0, { cam: "push", focus: "960 540" }); DS.room(S, ROOM.board);
  tile(S, 560, 500, "DOLPHIN", S.start, (x, y) => dolphin(S, x, y + 20, 0.62, { eye: "shut" }), { tw: 330, th: 380 });
  tile(S, 960, 500, "DUCK", S.start, (x, y) => duck(S, x, y + 110, 0.75, { L: "open" }), { tw: 330, th: 380 });
  tile(S, 1360, 500, "FRIGATEBIRD", S.start, (x, y) => frigate(S, x + 20, y + 20, 0.55, { eye: "shut" }), { tw: 330, th: 380 });
  [560, 960, 1360].forEach((x, i) => tick(S, x + 120, 330, 1.6, W(95, 4) + i * 0.15));
  DS.card(S, "NONE SKIP SLEEP", 960, 140, { size: DS.type.body, t: W(95, 3), tc: "green" });
  DS.card(S, "LOOPHOLES", 960, 840, { size: DS.type.title, t: W(95, 8) });
  DS.vignette(S); }

// Dave tries the dolphin method, and closes one eye. / Both halves of his brain stay awake, / and now he's losing at pinball.
{ const S = sc(96, 0, { cam: "push", focus: "900 520" }); DS.room(S, ROOM.hall);
  const P = pinball(S, 1000, GN, 0.9); const b1 = S.text("BALL 1", P.scr[0], P.scr[1] + 14, { size: DS.type.small, c: DS.c("yellow") }); S.fadeOut(b1, W(98, 3), 0.2);
  S.text("GAME OVER", P.scr[0], P.scr[1] + 14, { size: DS.type.caption, t: W(98, 3), c: DS.c("red", 1) });
  const F = dave(S, 640, GN, "near", { mood: "determined", look: 6, pose: "reach" }); wink(S, F, W(96, 6), -1, 6);
  F.face(W(98, 3), "worried", 6); wink(S, F, W(98, 3), -1, 6);
  brainTop(S, 1520, 470, 0.7, { t: W(97, 0) });
  txt(S, "AWAKE", 1520 - 104, 350, { t: W(97, 5), size: DS.type.caption }); txt(S, "AWAKE", 1520 + 104, 350, { t: W(97, 5), size: DS.type.caption });
  DS.card(S, "THE DOLPHIN METHOD", 520, 140, { size: DS.type.body, t: W(96, 2) });
  DS.card(S, "BOTH HALVES AWAKE", 1520, 140, { size: DS.type.small, t: W(97, 5), tc: "red" });
  DS.vignette(S); }

// So what happens to an animal with no loophole at all?
{ const S = sc(99, 0, { cam: "push", focus: "960 600" }); DS.room(S, ROOM.board);
  rat(S, 960, 820, 1.6, { mood: "flat" });
  S.text("?", 960, 520, { size: DS.type.display, t: W(99, 5), c: DS.c("ink") });
  DS.card(S, "NO LOOPHOLE AT ALL?", 960, 160, { size: DS.type.body, t: W(99, 7), tc: "red" });
  DS.vignette(S); }

// In the nineteen eighties, Allan Rechtschaffen's lab in Chicago kept rats on a platform that moved whenever they dozed.
{ const S = sc(100, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM.lab);
  const top = disk(S, 900, 900, S.start);
  rat(S, 900, top, 0.9, { t: W(100, 10), eyes: "shut" });
  S.arrow(1110, top - 10, 760, top + 30, W(100, 15), 0.4, { c: DS.c("red"), w: DS.w.near, bend: -0.25 });
  DS.card(S, "1980s · RECHTSCHAFFEN LAB", 960, 130, { size: DS.type.body, t: W(100, 2) });
  DS.card(S, "CHICAGO", 1560, 260, { size: DS.type.small, t: W(100, 8) });
  DS.card(S, "MOVED WHENEVER THEY DOZED", 960, 420, { size: DS.type.small, t: W(100, 15), tc: "red" });
  DS.vignette(S); }

// Within eleven to thirty-two days, none survived, / and nobody knew exactly why.
{ const S = sc(101, 0, { cam: "pull", focus: "960 560" }); DS.room(S, ROOM.lab);
  disk(S, 900, 900, S.start);
  DS.card(S, "11 TO 32 DAYS", 960, 130, { size: DS.type.body, t: W(101, 1) });
  DS.card(S, "NONE SURVIVED", 960, 260, { size: DS.type.small, t: W(101, 5) });
  S.text("?", 900, 560, { size: DS.type.display, t: W(102, 1), c: DS.c("ink") });
  DS.card(S, "NOBODY KNEW WHY", 1500, 420, { size: DS.type.small, t: W(102, 2) });
  DS.vignette(S); }

// In twenty twenty, a Harvard team found a clue in fruit flies kept awake:
{ const S = sc(103, 0, { cam: "push", focus: "900 560" }); DS.room(S, ROOM.lab);
  const top = table(S, 420, 1100, 700, GN, "gray"); jar(S, 760, top, 300, 340, S.start);
  [[700, 470, 0.45], [820, 420, 0.4], [760, 560, 0.42]].forEach(([x, y, k], i) => { const g = S.grp(); fly(S, x, y, k, { parent: g }); S.move(g, S.start, S.len, { x: (i % 2 ? -1 : 1) * 24, y: -12 }, "sine.inOut"); });
  const F = sci(S, 1400, GN, "near", { hair: "curly", hairC: DS.c("brown", 2), mood: "wow", look: -6 });
  DS.card(S, "2020 · HARVARD", 960, 130, { size: DS.type.body, t: W(103, 1) });
  DS.card(S, "FRUIT FLIES, KEPT AWAKE", 1400, 300, { size: DS.type.small, t: W(103, 10) });
  DS.vignette(S); }

// harmful molecules piling up, not in their brains, but in their guts.
{ const S = sc(104, 0, { cam: "push", focus: "900 540" }); DS.room(S, ROOM.board);
  const Fl = fly(S, 900, 560, 2.6, { gut: W(104, 1), gutT: S.start });
  S.draw(circ(Fl.head[0], Fl.head[1], 120), W(104, 5), 0, { c: DS.c("gray", 2), w: DS.w.near });
  txt(S, "BRAIN", Fl.head[0], Fl.head[1] - 150, { t: W(104, 5), size: DS.type.small }); xMark(S, Fl.head[0] + 120, Fl.head[1] - 120, 1.4, W(104, 7));
  ringIt(S, Fl.gut[0], Fl.gut[1], 200, 150, W(104, 11));
  DS.card(S, "HARMFUL MOLECULES", 960, 130, { size: DS.type.body, t: W(104, 0), tc: "red" });
  DS.card(S, "IN THEIR GUTS", 520, 880, { size: DS.type.small, t: W(104, 11), tc: "red" });
  DS.vignette(S); }

// Which is why no lab keeps a person awake for weeks, / and why Dave, finally, goes to bed.
{ const S = sc(105, 0, { cam: "push", focus: "1000 560" }); DS.room(S, ROOM.den); const H = bedroom(S, { board: { n: 40 } });
  stamp(S, 640, 250, "CERTIFICATE: NO", S.start, "red", { size: DS.type.small });
  const F = sleeper(S, H.Bd.px, H.Bd.py, 0.95, dave, { t: W(106, 3) }); H.Bd.bl(1);
  zz(S, H.Bd.px + 60, H.Bd.py - 110, W(106, 5));
  stamp(S, 640, 390, "CANCELLED", W(106, 4), "red", { size: DS.type.body, rot: 6 });
  DS.card(S, "NO LAB DOES WEEKS", 1300, 460, { size: DS.type.small, t: W(105, 3), tc: "red" });
  DS.vignette(S); }

// ===================== 7. The slow version =====================
// Dave goes back to normal life, about six hours a night, / and reads the study he should have read first.
{ const S = sc(107, 0, { cam: "push", focus: "1000 560" }); DS.room(S, ROOM.den); const H = bedroom(S, { board: { n: 40 } });
  stamp(S, 640, 330, "CANCELLED", S.start, "red", { size: DS.type.body, rot: 6 });
  const F = dave(S, H.Bd.px + 70, H.Bd.top + 40, "near", Object.assign({ sit: true, float: true, mood: "flat", look: 5, pose: "hold" }, LEGS)); H.Bd.lap();
  const [hx, hy] = F.hand("R"); paperR(S, hx - 30, hy - 120, 170, 210, { t: W(108, 1) }); txt(S, "2003", hx + 55, hy - 60, { t: W(108, 1), size: DS.type.caption }); lines(S, hx - 10, hy - 20, 130, 3, W(108, 1), 30);
  DS.card(S, "ABOUT 6 HOURS A NIGHT", 1300, 460, { size: DS.type.small, t: W(107, 6) });
  DS.card(S, "SHOULD HAVE READ THIS FIRST", 1060, 120, { size: DS.type.small, t: W(108, 4), tc: "red" });
  DS.vignette(S); }

// In two thousand three, Hans Van Dongen's team at the University of Pennsylvania / put forty-eight healthy adults in a sleep lab.
{ const S = sc(109, 0, { cam: "pull", focus: "960 560" }); DS.room(S, ROOM.lab);
  for (let r = 0; r < 4; r++) for (let c = 0; c < 12; c++) { const k = 0.6 + r * 0.14, x = 900 + (c - 5.5) * (86 + r * 12), gy = 560 + r * 100; miniBed(S, x, gy, k, OC[(r * 12 + c) % 8], W(110, 1) + (r * 12 + c) * 0.012); }
  const F = sci(S, 1660, GN, "near", { hair: "short", hairC: DS.c("brown", 2), mood: "smile", look: -6 });
  DS.card(S, "2003 · VAN DONGEN'S TEAM", 820, 130, { size: DS.type.body, t: W(109, 1) });
  DS.card(S, "UNIVERSITY OF PENNSYLVANIA", 820, 250, { size: DS.type.small, t: W(109, 10) });
  DS.card(S, "48 HEALTHY ADULTS", 820, 960 - 50, { size: DS.type.small, t: W(110, 1), tc: "red" });
  DS.vignette(S); }

// For two weeks, some got eight hours in bed a night, some six, some four.
{ const S = sc(111, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM.board);
  for (let i = 0; i < 14; i++) { const x = 504 + i * 70, tt = W(111, 1) + i * 0.04; DS.shape(S, rrect(x - 28, 220, 56, 56, DS.r.xs), "white", { t: tt, w: "detail", flat: true }); moonIcon(S, x - 2, 248, 16, tt); }
  [[560, 8, "green", W(111, 5)], [960, 6, "yellow", W(111, 12)], [1360, 4, "red", W(111, 14)]].forEach(([x, h, n, tt]) => { bar(S, x, 800, 180, h * 52, n, tt); S.text(h + " H", x, 800 - h * 52 - 30, { size: DS.type.title, t: tt, c: DS.c("ink") }); miniBed(S, x, 900, 1.4, n, tt); });
  DS.card(S, "2 WEEKS", 960, 120, { size: DS.type.body, t: W(111, 1) });
  DS.vignette(S); }

// By the end, the six-hour group was as impaired as people kept awake for a whole night. / The four-hour group, as if they'd skipped two.
const nightX = (S, cx, cy, t) => { DS.shape(S, rrect(cx - 60, cy - 60, 120, 120, DS.r.sm), "night", { t, flat: true, w: "detail" }); moonIcon(S, cx, cy, 34, t); S.draw(line([cx - 46, cy + 46], [cx + 46, cy - 46], 0), t ?? S.start, 0, { c: DS.c("red"), w: DS.w.near }); };
{ const S = sc(112, 0, { cam: "push", focus: "960 540" }); DS.room(S, ROOM.board);
  [[380, "6 H × 2 WEEKS", "yellow", W(112, 4), 1, W(112, 15)], [700, "4 H × 2 WEEKS", "red", W(113, 1), 2, W(113, 6)]].forEach(([y, s, n, t1, k, t2]) => {
    panel(S, 560, y, 600, 160, t1); DS.shape(S, rect(290, y - 60, 40, 120), n, { t: t1, flat: true, w: "detail" }); S.text(s, 600, y + 24, { size: DS.type.body, t: t1, c: DS.c("ink") });
    S.text("=", 960, y + 30, { size: DS.type.display, t: t2, c: DS.c("ink") });
    for (let i = 0; i < k; i++) nightX(S, 1160 + i * 150, y, t2);
    txt(S, k === 1 ? "1 NIGHT AWAKE" : "2 NIGHTS AWAKE", 1160 + (k - 1) * 75, y + 110, { t: t2, size: DS.type.small }); });
  DS.card(S, "AS IMPAIRED AS", 960, 140, { size: DS.type.body, t: W(112, 8), tc: "red" });
  DS.vignette(S); }

// And how sleepy did they feel? / The researchers' words: only slightly sleepy.
{ const S = sc(114, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM.lab);
  [[300, 0], [480, 1], [1440, 2], [1620, 4]].forEach(([x, i]) => person(S, x, GN, "near", i, { s: 1.0, mood: "flat", look: x < 960 ? 6 : -6 }));
  panel(S, 960, 560, 820, 440, S.start);
  gauge(S, 960, 640, 230, { max: 1, v0: 0, bands: [[0, 0.34, "green"], [0.34, 0.67, "yellow"], [0.67, 1, "red"]], ticks: [[0, "NOT"], [0.5, "SLIGHTLY"], [1, "VERY"]], label: "HOW SLEEPY?", moves: [[0, 0.42, W(115, 4)]] });
  DS.card(S, "HOW SLEEPY DID THEY FEEL?", 960, 130, { size: DS.type.body, t: W(114, 1) });
  DS.card(S, "\"ONLY SLIGHTLY SLEEPY\"", 960, 900, { size: DS.type.small, t: W(115, 3), tc: "green" });
  DS.vignette(S); }

// Their scores got worse every day. Their feelings stayed at fine.
{ const S = sc(116, 0, { cam: "push", focus: "960 520" }); DS.room(S, ROOM.lab);
  wboard(S, 300, 130, 1320, 700);
  S.draw(line([420, 720], [1500, 720], 0) + line([420, 720], [420, 220], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.mid });
  txt(S, "DAY 1", 440, 780); txt(S, "DAY 14", 1460, 780);
  growLine(S, line([430, 330], [1440, 330], 0), W(116, 6), 1.2, [420, 290, 1060, 80], { c: DS.c("green") });
  S.text("FEELING: FINE", 1290, 300, { size: DS.type.small, t: W(116, 10), c: DS.c("green", 2) });
  growLine(S, smooth([[430, 340], [700, 420], [960, 510], [1200, 600], [1440, 680]]), W(116, 1), 1.4, [420, 300, 1060, 420], { c: DS.c("red") });
  S.text("SCORES", 1180, 700, { size: DS.type.small, t: W(116, 3), c: DS.c("red", 2) });
  DS.vignette(S); }

// A whole lab full of Daves at hour seventeen. / "Honestly, I feel totally fine."
{ const S = sc(117, 0, { cam: "pull", focus: "960 560" }); DS.room(S, ROOM.lab);
  const back = [180, 540, 900, 1260, 1620], front = [360, 720, 1080, 1440];
  back.forEach((x, i) => { const F = dave(S, x, 800, "mid", { mood: "smile", look: i % 2 ? 4 : -4 }); say(S, x, 420, 76, 34, x + 10, 470, ["FINE."], W(118, 4) + i * 0.08, { size: DS.type.caption }); });
  front.forEach((x, i) => { const F = dave(S, x, GN, "near", { mood: "smile", look: i % 2 ? -4 : 4 }); say(S, x, 505, 80, 38, x + 10, 556, ["FINE."], W(118, 4) + 0.3 + i * 0.08, { size: DS.type.caption }); });
  DS.card(S, "A LAB FULL OF DAVES", 960, 130, { size: DS.type.body, t: W(117, 2) });
  DS.card(S, "HOUR 17", 960, 250, { size: DS.type.small, t: W(117, 7), tc: "red" });
  DS.vignette(S); }

// So here's the twist: you don't need a glass booth or a science fair to attempt this record.
{ const S = sc(119, 0, { cam: "push", focus: "960 540" }); DS.room(S, ROOM.board);
  tile(S, 660, 520, "A GLASS BOOTH", W(119, 8), (x, y) => miniBooth(S, x, y, W(119, 8)), { tw: 380, th: 420 });
  tile(S, 1260, 520, "A SCIENCE FAIR", W(119, 12), (x, y) => { DS.shape(S, rect(x - 170, y - 100, 340, 200), "white", { t: W(119, 12), flat: true, w: "detail" }); txt(S, "STAY AWAKE?", x, y - 50, { t: W(119, 12) }); moonIcon(S, x, y + 30, 40, W(119, 12)); }, { tw: 380, th: 420 });
  xMark(S, 660, 520, 3.2, W(119, 10)); xMark(S, 1260, 520, 3.2, W(119, 14));
  DS.card(S, "THE TWIST", 960, 140, { size: DS.type.title, t: W(119, 2), tc: "red" });
  DS.vignette(S); }

// Every night you cut short is a tiny version of it.
{ const S = sc(120, 0, { cam: "zoom", focus: "560 640" }); DS.room(S, ROOM.den); const H = bedroom(S, { board: false, tang: false });
  trophy(S, 520, H.top, 0.55, W(120, 7)); ringIt(S, 520, H.top - 60, 80, 90, W(120, 7));
  DS.card(S, "EVERY NIGHT YOU CUT SHORT", 960, 130, { size: DS.type.body, t: W(120, 0) });
  DS.card(S, "A TINY VERSION", 520, 380, { size: DS.type.small, t: W(120, 7), tc: "red" });
  DS.vignette(S); }

// Next to that eight-hour group, Dave is two hours short every night.
{ const S = sc(121, 0, { cam: "push", focus: "960 540" }); DS.room(S, ROOM.board);
  bar(S, 760, 820, 220, 8 * 64, "green", W(121, 3), "8-HOUR GROUP", { size: DS.type.small });
  bar(S, 1160, 820, 220, 6 * 64, "blue", W(121, 5), "DAVE", { size: DS.type.small });
  const d = S.draw(rect(1050, 820 - 8 * 64, 220, 2 * 64), W(121, 7), 0, { c: DS.c("red"), w: DS.w.mid }); d.setAttribute("stroke-dasharray", "18 14");
  S.text("–2 H", 1160, 820 - 7 * 64 + 20, { size: DS.type.body, t: W(121, 7), c: DS.c("red", 2) });
  dave(S, 1520, GN, "near", { mood: "smile", look: -6 });
  DS.card(S, "2 HOURS SHORT, EVERY NIGHT", 960, 130, { size: DS.type.body, t: W(121, 7), tc: "red" });
  DS.vignette(S); }

// After a hundred and thirty-two nights, that's two hundred and sixty-four hours.
{ const S = sc(122, 0, { cam: "push", focus: "800 520" }); DS.room(S, ROOM.den);
  scoreboard(S, 620, 470, { k: 1.0, head: "HOURS SHORT", rows: ["2 HOURS A NIGHT", "× 132 NIGHTS", "= 264"], rowT: [S.start, W(122, 4), W(122, 10)] });
  panel(S, 1360, 520, 640, 600, S.start);
  for (let i = 0; i < 132; i++) { const c = i % 12, r = Math.floor(i / 12), x = 1100 + c * 47, y = 270 + r * 47, tt = W(122, 1) + (i / 132) * 1.6; DS.shape(S, rrect(x, y, 38, 38, DS.r.xs), "night", { t: tt, flat: true, w: "hair" }); }
  DS.card(S, "132 NIGHTS", 1360, 860, { size: DS.type.small, t: W(122, 4) });
  DS.vignette(S); }

// Randy's record, broken in instalments, with no reporters and no pinball.
{ const S = sc(123, 0, { cam: "push", focus: "960 520" }); DS.room(S, ROOM.board);
  cert(S, 760, 500, 760, 480, [["RANDY'S RECORD", -110, DS.type.small], ["264 HOURS", 10, DS.type.display, "red"], ["IN INSTALMENTS", 110, DS.type.small, "blue", W(123, 2)]]);
  camera(S, 1320, 520, 1.3, W(123, 7)); xMark(S, 1320, 520, 2.2, W(123, 7)); txt(S, "NO REPORTERS", 1320, 650, { t: W(123, 7) });
  pinball(S, 1640, 720, 0.4, { t: W(123, 10) }); xMark(S, 1640, 560, 2.2, W(123, 10)); txt(S, "NO PINBALL", 1640, 780, { t: W(123, 10) });
  DS.card(S, "BROKEN IN INSTALMENTS", 760, 130, { size: DS.type.body, t: W(123, 2), tc: "red" });
  DS.vignette(S); }

// And just like the lab, Dave hasn't noticed a thing.
{ const S = sc(124, 0, { cam: "push", focus: "800 560" }); DS.room(S, ROOM.den); nightWin(S, 1300, 170, 210, 200);
  scoreboard(S, 760, 300, { k: 0.75, head: "HOURS SHORT", rows: ["2 HOURS A NIGHT", "× 132 NIGHTS", "= 264"] });
  const seat = couch(S, 640, GN, 560, "purple");
  const F = dave(S, 920, seat + 50, "near", { sit: true, float: true, pose: "hold", mood: "happy", look: 5 }); const [hx, hy] = F.hand("R"); S.coffee(hx + 10, hy + 10, 0.8, S.start, 0);
  say(S, 1380, 520, 160, 70, 1040, 560, ["FINE!"], W(124, 4));
  DS.card(S, "HASN'T NOTICED A THING", 1380, 760, { size: DS.type.small, t: W(124, 6), tc: "red" });
  DS.vignette(S); }

// So, what happens if you never sleep? / You can't, for long. Your brain takes it anyway, in pieces.
{ const S = sc(125, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM.board);
  brainMap(S, 960, 560, 1.6, { off: [[-100, -70, 46, W(126, 6)], [90, -30, 48, W(126, 6) + 0.3], [-40, 100, 42, W(126, 9)], [100, 110, 36, W(126, 9) + 0.25]] });
  DS.card(S, "WHAT HAPPENS IF YOU NEVER SLEEP?", 960, 130, { size: DS.type.body, t: S.start });
  DS.card(S, "YOU CAN'T, FOR LONG", 380, 560, { size: DS.type.small, t: W(126, 0) });
  DS.card(S, "IN PIECES", 1560, 560, { size: DS.type.body, t: W(126, 9), tc: "red" });
  DS.vignette(S); }

// What you can do is borrow it, a little every night, without feeling the cost.
{ const S = sc(127, 0, { cam: "push", focus: "900 560" }); DS.room(S, ROOM.board);
  jar(S, 700, 880, 340, 440, S.start); txt(S, "SLEEP", 700, 640, { size: DS.type.title });
  for (let i = 0; i < 8; i++) { const x = 600 + (i % 4) * 66, y = 830 - Math.floor(i / 4) * 60; DS.shape(S, circ(x, y, 28), "gold", { w: "detail" }); txt(S, "H", x, y + 14); }
  const F = dave(S, 1280, GN, "near", { mood: "smile", look: -6, pose: "reachL" }); const [hx, hy] = F.hand("L");
  [0, 1, 2].forEach((i) => { const g = S.grp(); DS.shape(S, circ(760, 560, 28), "gold", { t: W(127, 5) + i * 0.5, w: "detail", parent: g }); txt(S, "H", 760, 574, { t: W(127, 5) + i * 0.5, parent: g }); slide(g, W(127, 5) + i * 0.5, 0.5, hx - 760, hy - 560 - i * 20, "power2.out"); });
  DS.card(S, "BORROWED, EVERY NIGHT", 960, 130, { size: DS.type.body, t: W(127, 5) });
  DS.card(S, "THE COST: UNFELT", 1280, 470, { size: DS.type.small, t: W(127, 11), tc: "red" });
  DS.vignette(S); }

// ===================== 8. The bedtime alarm =====================
// And Randy Gardner, the teenager who believed you don't need sleep? / In his sixties, he spent about ten years struggling to get any.
{ const S = sc(128, 0, { cam: "push", focus: "1100 560" }); DS.room(S, ROOM.den); nightWin(S, 1300, 170, 210, 200);
  const Bd = bed(S, 900, GN, 580, { blanket: "orange" });
  const gy = inset(S, 420, 520, 520, 700, S.start, "wall"); const R = randy(S, 420, gy, "near", { s: 0.9, mood: "smile", look: 4 }); plate(S, 420, 240, "RANDY, 1964", S.start);
  say(S, 420, 340, 200, 62, 440, 470, ["NO NEED!"], W(128, 6), { size: DS.type.caption });
  const og = S.grp(); const O = oldRandy(S, Bd.px + 70, Bd.top + 40, "near", Object.assign({ sit: true, float: true, mood: "tired", look: 5, parent: og }, LEGS)); const lp = Bd.lap("orange"); [og, lp].forEach((e) => S.fadeIn(e, W(129, 1), 0.35));
  wallClock(S, 1180, 300, 56, 3, 10, { t: W(129, 1) });
  DS.card(S, "IN HIS SIXTIES", 1100, 130, { size: DS.type.body, t: W(129, 1) });
  DS.card(S, "ABOUT 10 YEARS", 1500, 480, { size: DS.type.small, t: W(129, 6), tc: "red" });
  DS.vignette(S); }

// He thinks losing his cat set it off. / But he still calls it karmic payback.
{ const S = sc(130, 0, { cam: "push", focus: "900 560" }); DS.room(S, ROOM.den); nightWin(S, 1300, 170, 210, 200);
  const Bd = bed(S, 900, GN, 580, { blanket: "orange" });
  const top = sideTable(S, 640, GN, 220, 200); catFrame(S, 640, top, W(130, 4));
  const O = oldRandy(S, Bd.px + 70, Bd.top + 40, "near", Object.assign({ sit: true, float: true, mood: "sad", look: -5 }, LEGS)); Bd.lap("orange");
  S.heart(700, top - 230, 0.5, W(130, 4), 0, { fill: DS.c("pink"), c: DS.c("ink"), w: DS.w.detail });
  O.face(W(131, 3), "flat", 2);
  DS.card(S, "HIS CAT", 640, 520, { size: DS.type.small, t: W(130, 4) });
  DS.card(S, "\"KARMIC PAYBACK\"", 1200, 130, { size: DS.type.body, t: W(131, 5) });
  DS.vignette(S); }

// He got some of his sleep back, and now calls it one of the big three: water, food, and sleep.
{ const S = sc(132, 0, { cam: "push", focus: "1100 540" }); DS.room(S, ROOM.board);
  oldRandy(S, 330, GN, "near", { mood: "smile", look: 6 });
  tile(S, 760, 520, "WATER", W(132, 16), (x, y) => glassW(S, x, y + 90, 1.5, W(132, 16)), { tw: 330, th: 380 });
  tile(S, 1140, 520, "FOOD", W(132, 17), (x, y) => { DS.shape(S, circ(x, y + 70, 120, 34), "white", { t: W(132, 17) }); apple(S, x, y, 60, W(132, 17)); }, { tw: 330, th: 380 });
  tile(S, 1520, 520, "SLEEP", W(132, 19), (x, y) => { miniBed(S, x + 10, y + 100, 2.2, "orange", W(132, 19)); moonIcon(S, x + 60, y - 70, 40, W(132, 19)); }, { tw: 330, th: 380 });
  DS.card(S, "THE BIG THREE", 1140, 140, { size: DS.type.title, t: W(132, 14) });
  DS.card(S, "SOME SLEEP BACK", 360, 250, { size: DS.type.small, t: W(132, 2), tc: "green" });
  DS.vignette(S); }

// So here's the one idea worth keeping. / Your feeling of fine is not a measurement, but a clock is.
{ const S = sc(133, 0, { cam: "push", focus: "960 540" }); DS.room(S, ROOM.board);
  const F = dave(S, 420, GN, "near", { mood: "smile", look: 6 });
  say(S, 760, 400, 200, 80, 520, 540, ["\"FINE\""], W(134, 3), { size: DS.type.body });
  ruler(S, 600, 620, 360, W(134, 7)); xMark(S, 780, 655, 2.2, W(134, 7)); txt(S, "NOT A MEASUREMENT", 780, 760, { t: W(134, 7) });
  wallClock(S, 1400, 520, 170, 10, 30, { t: W(134, 10) }); tick(S, 1560, 340, 2.4, W(134, 11));
  txt(S, "A CLOCK IS", 1400, 760, { t: W(134, 10), size: DS.type.small, c: DS.c("green", 2) });
  DS.card(S, "ONE IDEA WORTH KEEPING", 960, 130, { size: DS.type.body, t: W(133, 3) });
  DS.vignette(S); }

// Set an alarm for when you go to bed, / not just for when you get up.
{ const S = sc(135, 0, { cam: "push", focus: "1100 540" }); DS.room(S, ROOM.den); nightWin(S, 400, 170, 210, 200);
  const F = dave(S, 560, GN, "near", { mood: "smile", look: 6, pose: "point" });
  const P = bigPhone(S, 1220, 560, 560, 760, { rows: [["BEDTIME", "moon", W(135, 2)], ["WAKE UP", "sun", W(136, 4)]] });
  ringIt(S, 1220, P.y0 + 220, 280, 92, W(135, 6), "green");
  DS.card(S, "AN ALARM FOR BED", 1220, 960 - 60, { size: DS.type.small, t: W(135, 2), tc: "green" });
  DS.vignette(S); }

// Tonight, Dave is going to sleep. / And tomorrow night, and the night after that.
{ const S = sc(137, 0, { cam: "push", focus: "1000 600" }); DS.room(S, ROOM.den); const H = bedroom(S, { board: { n: 0 } });
  const F = sleeper(S, H.Bd.px, H.Bd.py, 0.95, dave, {}); H.Bd.bl(1);
  zz(S, H.Bd.px + 60, H.Bd.py - 110, W(137, 4));
  [["TONIGHT", W(137, 0)], ["TOMORROW", W(138, 1)], ["THE NIGHT AFTER", W(138, 5)]].forEach(([s, tt], i) => { const x = 760 + i * 420; panel(S, x, 506, 400, 110, tt); txt(S, s, x, 520, { t: tt }); tick(S, x + 196, 452, 0.9, tt + 0.2); });
  DS.vignette(S); }

// His scoreboard is back at zero, / and the tangerines are just a snack again.
{ const S = sc(139, 0, { cam: "push", focus: "700 520" }); DS.room(S, ROOM.den); const H = bedroom(S, { board: { n: 0 }, bowl: true });
  const F = sleeper(S, H.Bd.px, H.Bd.py, 0.95, dave, {}); H.Bd.bl(1); zz(S, H.Bd.px + 60, H.Bd.py - 110, S.start);
  ringIt(S, 640 - 52, 300 + 10, 70, 60, W(139, 4), "green");
  DS.card(S, "BACK AT ZERO", 640, 120, { size: DS.type.small, t: W(139, 4), tc: "green" });
  ringIt(S, 560, H.top - 60, 110, 80, W(140, 2), "green");
  DS.card(S, "JUST A SNACK", 1200, 470, { size: DS.type.small, t: W(140, 6) });
  DS.vignette(S); }

// Goodnight, Dave. See you in the morning.
{ const S = sc(141, 0, { cam: "pull", focus: "1000 600" }); DS.room(S, ROOM.den); const H = bedroom(S, { board: { n: 0 }, bowl: true });
  const F = sleeper(S, H.Bd.px, H.Bd.py, 0.95, dave, {}); H.Bd.bl(1); zz(S, H.Bd.px + 60, H.Bd.py - 110, S.start);
  DS.card(S, "GOODNIGHT, DAVE", 1160, 510, { size: DS.type.title, t: W(141, 0) });
  DS.vignette(S, 0.2); }
