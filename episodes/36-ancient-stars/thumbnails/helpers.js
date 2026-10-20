// helpers copied from ../scenes.js (same Dave, sky, Milky Way and Emu as the video)
// ---------- people ----------
const who = (S, x, gy, layer = "near", o = {}) => {
  const s = (o.s || 1.1) * DS.depth[layer].s, g = o.parent || S.grp();
  if (!o.float) DS.shadow(S, x, o.gs ?? gy, 150 * s, { t: o.t, parent: g });
  const F = S.fig(x, gy, Object.assign({ hair: "short", outfit: "tee" }, o, { s, parent: g, w: DS.w[DS.depth[layer].w] * 1.3 * Math.sqrt(s) })).draw(o.t ?? S.start, 0.4);
  F.face(o.t ?? S.start, o.mood || "flat", o.look || 0);
  F.all = g;
  return F;
};
// Dave is only ever out at night, so his limbs are white (they vanish on a dark sky otherwise); same hair and blue tee as every episode
const dave = (S, x, gy, layer = "near", o = {}) => who(S, x, gy, layer, Object.assign({ s: 1.1, hair: "side", hairC: DS.c("brown"), outfitC: DS.c("blue"), c: DS.P.white[0] }, o));
// Dave lying on his back, head to the left, gazing up (look > 0 = up once rotated). top = the surface he lies on
const lyingDave = (S, x, top, o = {}) => {
  const s = (o.s || 1.1), F = dave(S, x, top - 52 * s, "near", Object.assign({ float: true, pose: "head", mood: "flat", look: 8 }, o));
  S.fill(circ(x - 150 * s, top + 4, 190 * s, 14 * s), S.start, 0, DS.P.ink[0], 0.3);
  F.lie(Math.max(0, S.start - 0.7), 0.01, -88);
  return F;
};
const OC = ["green", "purple", "orange", "pink", "gold", "red", "earth", "gray"]; // no blue: blue is Dave's
const person = (S, x, gy, layer, i, o = {}) => who(S, x, gy, layer, Object.assign({ s: 1.1, hair: ["short", "bun", "curly", "side"][i % 4], hairC: DS.c(["brown", "ink", "earth", "gray"][i % 4], i % 4 === 3 ? 1 : 2, layer), outfitC: DS.c(OC[i % 8], 0, layer), c: DS.P.white[0], mood: "flat", look: ((i % 3) - 1) * 5 }, o));

// ---------- small kit ----------
let CP = 0;
const clipTo = (g, d) => { const id = "cp" + ++CP, cp = el("clipPath", { id }, dsDefs()); el("path", { d }, cp); g.setAttribute("clip-path", `url(#${id})`); return g; };
const spin = (g, t, dur, d0, d1, cx, cy, ease = "power1.inOut") => tl.fromTo(g, { attr: { transform: `rotate(${d0} ${cx} ${cy})` } }, { attr: { transform: `rotate(${d1} ${cx} ${cy})` }, duration: dur, ease }, t);
const grow = (g, t, dur, k0, k1, cx, cy, ease = "power2.out") => tl.fromTo(g, { attr: { transform: `translate(${cx} ${cy}) scale(${k0}) translate(${-cx} ${-cy})` } }, { attr: { transform: `translate(${cx} ${cy}) scale(${k1}) translate(${-cx} ${-cy})` }, duration: dur, ease }, t);
const dash = (p, a, b) => { p.removeAttribute("pathLength"); p.setAttribute("stroke-dasharray", `${a} ${b}`); return p; };
const txt = (S, s, x, y, o = {}) => S.text(s, x, y, Object.assign({ size: DS.type.caption, c: DS.c("ink") }, o));
const wtxt = (S, s, x, y, o = {}) => S.text(s, x, y, Object.assign({ size: DS.type.caption, c: DS.P.white[0] }, o));
const blob = (pts) => smooth([...pts, pts[0], pts[1]]) + " Z";
// many small dots in one path: zero-length round-capped strokes (about 6x less path data than circles, cheaper to paint)
const dots = (S, pts, r, c, op = 1, t, parent) => pts.length ? S.draw(pts.map(([x, y]) => `M${Math.round(x)} ${Math.round(y)}h0`).join(""), t ?? S.start, 0, { c, w: r * 2, op, parent }) : null;
const tick = (S, x, y, k, t, name = "green") => S.tick(x, y, k, t, 0, { c: DS.c(name), w: DS.w.near });
const xMark = (S, x, y, k, t) => S.cross(x, y, k, t, 0, { c: DS.c("red"), w: DS.w.near });
const panel = (S, cx, cy, w, h, t, name = "white", parent) => { DS.drop(S, rrect(cx - w / 2 + 8, cy - h / 2 + 12, w, h, DS.r.md), { t, parent }); DS.shape(S, rrect(cx - w / 2, cy - h / 2, w, h, DS.r.md), name, { t, flat: true, w: "detail", parent }); };
const stamp = (S, cx, cy, str, t, name = "red", rot = -8) => {
  const g = S.grp(), w = str.length * DS.type.body * 0.66 + 70, tf = (k) => `translate(${cx} ${cy}) rotate(${rot}) scale(${k}) translate(${-cx} ${-cy})`;
  S.draw(rrect(cx - w / 2, cy - 56, w, 112, DS.r.sm), S.start, 0, { c: DS.c(name, 2), w: DS.w.near, fill: DS.P.white[0], parent: g });
  S.text(str, cx, cy + 23, { size: DS.type.body, t: S.start, c: DS.c(name, 2), parent: g });
  tl.fromTo(g, { opacity: 0, attr: { transform: tf(1.4) } }, { opacity: 1, attr: { transform: tf(1) }, duration: 0.25, ease: "power3.in" }, t);
  return g;
};
// name card for a real person (no likeness): name + one line of who/where/when
const nameCard = (S, name, sub, cx, cy, o = {}) => {
  const t = o.t, g = S.grp(), w = Math.max(name.length * DS.type.small * 0.62, sub.length * DS.type.caption * 0.62) + 96, h = 150, x = cx - w / 2, y = cy - h / 2;
  DS.drop(S, rrect(x + 8, y + 12, w, h, DS.r.md), { t, parent: g });
  DS.shape(S, rrect(x, y, w, h, DS.r.md), "white", { t, flat: true, w: "detail", parent: g });
  DS.shape(S, rect(x + 20, y + 22, 10, h - 44), o.bar || "gold", { t, flat: true, w: "hair", parent: g });
  S.text(name, cx + 14, y + 66, { size: DS.type.small, t, c: DS.c("ink"), parent: g });
  S.text(sub, cx + 14, y + 118, { size: DS.type.caption, t, c: DS.c("blue", 2), parent: g });
  return g;
};
const fadeOutAt = (S, g, t) => { S.fadeOut(g, t, 0.3); return g; };

// ---------- the night sky (Bortle 9 -> 1) ----------
const H = (i, k) => { const v = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return v - Math.floor(v); };
const FIELD = Array.from({ length: 620 }, (_, i) => [H(i, 1) * 1960 - 20, H(i, 2), H(i, 3)]); // x, height fraction, brightness rank
const GLC = {};
const glo = (c, op) => GLC[c + op] || (GLC[c + op] = DS.glow(c, op));
let GN3 = 0;
// left-to-right gradient with per-stop opacity: [[offset, colour, opacity], ...]
const hgrad = (st) => { const id = "gh-" + ++GN3, g = el("linearGradient", { id, x1: 0, y1: 0, x2: 1, y2: 0 }, dsDefs()); st.forEach(([of, c, op]) => el("stop", { offset: of, "stop-color": c, "stop-opacity": op }, g)); return `url(#${id})`; };
const vgrad3 = (cs, stops) => { const id = "g3-" + ++GN3, g = el("linearGradient", { id, x1: 0, y1: 0, x2: 0, y2: 1 }, dsDefs()); cs.forEach((c, i) => el("stop", { offset: stops[i], "stop-color": c }, g)); return `url(#${id})`; };
const N_ = DS.P.navy, I_ = DS.P.ink, O_ = DS.P.orange, NI_ = DS.P.night;
// [top, mid, horizon] per Bortle class: the city's orange glow drains away as Dave drives out
const SKYC = {
  9: [DS.mix(N_[0], DS.P.gray[2], 0.45), DS.mix(N_[0], O_[2], 0.32), DS.mix(O_[2], N_[0], 0.3)],
  7: [DS.mix(N_[2], N_[0], 0.6), DS.mix(N_[0], NI_[2], 0.35), DS.mix(O_[2], N_[0], 0.6)],
  5: [DS.mix(N_[2], I_[2], 0.25), N_[2], DS.mix(NI_[2], O_[2], 0.32)],
  2: [DS.mix(N_[2], I_[2], 0.6), DS.mix(N_[2], I_[2], 0.25), DS.mix(NI_[2], N_[2], 0.4)],
  1: [DS.mix(N_[2], I_[2], 0.82), DS.mix(N_[2], I_[2], 0.5), DS.mix(N_[2], NI_[2], 0.25)],
};
const STAR_TH = { 9: 2, 7: 0.93, 5: 0.74, 2: 0.18, 1: 0 };
const NIGHT = { hy: 1400, sky: "night", sun: false }; // DS.outdoor base (night haze); sky() paints the real sky over it
// a 4-point sparkle for the bright ones (o.tw = twinkle)
const spark = (S, x, y, r, o = {}) => {
  const g = S.grp(o.parent), T = o.t ?? S.start, c = o.c || DS.P.white[0];
  if (o.halo !== false) S.fill(circ(x, y, r * 5), T, 0, glo(c, 0.45), 1, g);
  S.fill(`M${x} ${y - r * 3.2} Q${x + r * 0.35} ${y - r * 0.35} ${x + r * 3.2} ${y} Q${x + r * 0.35} ${y + r * 0.35} ${x} ${y + r * 3.2} Q${x - r * 0.35} ${y + r * 0.35} ${x - r * 3.2} ${y} Q${x - r * 0.35} ${y - r * 0.35} ${x} ${y - r * 3.2} Z`, T, 0, c, 1, g);
  S.fill(circ(x, y, r), T, 0, c, 1, g);
  if (o.tw) tl.fromTo(g, { opacity: 1 }, { opacity: 0.55, duration: 0.9 + (x % 5) * 0.12, ease: "sine.inOut", yoyo: true, repeat: Math.max(1, Math.round(S.len / 0.9)), immediateRender: false }, S.start + (y % 7) * 0.1);
  return g;
};
// field stars above the horizon, batched into four paths by brightness
const field = (S, th, hz, o = {}) => {
  const B = [[], [], [], []], R = [1.1, 1.6, 2.2, 2.9], OP = [0.42, 0.62, 0.82, 1];
  FIELD.forEach(([x, fy, u], i) => {
    if (u < th || (o.keep && !o.keep(x, 40 + fy * (hz - 70)))) return;
    B[u < 0.6 ? 0 : u < 0.85 ? 1 : u < 0.97 ? 2 : 3].push([x, 40 + fy * (hz - 70)]);
  });
  B.forEach((ps, k) => dots(S, ps, R[k] * (o.k || 1), DS.P.white[0], OP[k], o.t, o.parent));
};
const sky = (S, O, o = {}) => {
  const b = o.b ?? 1, hz = o.hz ?? 760, C = SKYC[b], s2 = (hz + 200) / 1480;
  S.fill(rect(-200, -200, 2320, 1480), S.start, 0, vgrad3([C[0], DS.mix(C[0], C[1], 0.65), C[1], C[2]], [0, s2 * 0.4, s2 * 0.75, s2]), 1);
  if (b >= 5) S.fill(circ(o.gx ?? 960, hz + 60, 1500, b === 9 ? 520 : 380), S.start, 0, glo(DS.mix(O_[1], C[2], 0.4), b === 9 ? 0.75 : b === 7 ? 0.45 : 0.25), 1);
  if (o.mw) o.E = milky(S, o.mw, Object.assign({ dust: C[0] }, o, { t: o.mwT ?? o.t })).E;
  field(S, o.th ?? STAR_TH[b], hz, o);
  return O;
};

// ---------- the Milky Way band and the Emu in the Sky ----------
// band axis o.from -> o.to; P(t, off) = point t along the axis, off px to its right-hand side (screen down for a left-to-right band)
const AX = (o) => { const [ax, ay] = o.from || [-200, 120], [bx, by] = o.to || [2120, 880], ux = bx - ax, uy = by - ay, L = Math.hypot(ux, uy); return { L, ang: Math.atan2(uy, ux), P: (t, off = 0) => [ax + ux * t - (uy / L) * off, ay + uy * t + (ux / L) * off] }; };
const MWS = Array.from({ length: 900 }, (_, i) => [H(i, 7), (H(i, 8) + H(i, 9) + H(i, 10) - 1.5) / 1.5, H(i, 11)]);
const milky = (S, k, o = {}) => {
  const A = AX(o), wd = o.wd || 150, bt = o.bulge ?? 0.55, T = o.t ?? S.start, g = S.grp(o.parent);
  const wid = (t) => wd * (0.72 + 0.28 * Math.sin(t * 9.1 + 1.3) + 0.9 * Math.exp(-(((t - bt) / 0.16) ** 2)));
  const core = DS.mix(DS.P.white[0], DS.P.gold[1], 0.35), cool = DS.mix(DS.P.white[0], DS.P.sky[1], 0.4);
  [[1.7, 0.05, cool], [1.3, 0.06, cool], [1.0, 0.07, cool], [0.72, 0.08, core], [0.48, 0.09, core], [0.26, 0.1, core]].forEach(([f, op, c]) => {
    const top = [], bot = [];
    for (let j = 0; j <= 26; j++) { const t = -0.04 + (j / 26) * 1.08, w = wid(t) * f, wob = Math.sin(t * 6.3) * 22; top.push(A.P(t, -w * 0.9 + wob)); bot.unshift(A.P(t, w + wob)); }
    S.fill(smooth(top) + " L" + smooth(bot).slice(1) + " Z", T, 0, c, op * k, g);
  });
  for (let i = 0; i < 30; i++) { const t = H(i, 21), [x, y] = A.P(t, (H(i, 22) - 0.5) * wid(t) * 0.9), r = (60 + 120 * H(i, 23)) * (0.7 + 0.6 * Math.exp(-(((t - bt) / 0.2) ** 2))); S.fill(circ(x, y, r), T, 0, glo(i % 3 ? core : cool, 0.32 * k), 1, g); }
  const [bx, by] = A.P(bt, wd * 0.25); S.fill(circ(bx, by, wd * 3.4, wd * 2.4), T, 0, glo(core, 0.42 * k), 1, g);
  const B = [[], []];
  MWS.forEach(([t, off, u], i) => { if (i > 900 * k) return; B[u > 0.8 ? 1 : 0].push(A.P(t, off * wid(t) * 0.95)); });
  dots(S, B[0], 0.95, DS.P.white[0], Math.min(1, 0.55 * k), T, g); dots(S, B[1], 1.5, DS.P.white[0], Math.min(1, 0.85 * k), T, g);
  // dark lanes of dust: the Great Rift splitting the band, plus a few clouds (soft edge = a wide faint copy under a narrow dark one)
  const lane = (t0, t1, off0, off1, w0, ph = 0) => [[1.9, 0.22], [1.15, 0.3], [0.6, 0.4]].forEach(([fw, op]) => {
    const top = [], bot = [];
    for (let j = 0; j <= 16; j++) { const f = j / 16, t = t0 + (t1 - t0) * f, c = off0 + (off1 - off0) * f + Math.sin(f * 7 + ph) * 14, w = w0 * fw * Math.sin(Math.PI * f) ** 0.6 * (0.75 + 0.45 * Math.sin(f * 11 + ph)); top.push(A.P(t, c - w)); bot.unshift(A.P(t, c + w)); }
    S.fill(smooth(top) + " L" + smooth(bot).slice(1) + " Z", T, 0, o.dust, op * k, g);
  });
  if (!o.emu) { lane(0.06, 0.34, 6, 34, 26, 1); lane(0.58, 0.97, -14, 24, 30, 2); lane(0.4, 0.56, -40, -20, 18, 3); }
  lane(0.84, 1.08, 34, 4, 24, 4); lane(-0.08, 0.12, -14, 12, 20, 5);
  const E = o.emu ? emu(S, A, k, Object.assign(o, { parent: g })) : null;
  return { g, A, E };
};
// the Emu, in its own frame (body centre = origin, facing left, units = px at scale 1), placed along the band at o.emuAt = [t, off, scale]
const EMU = {
  head: [-330, -180, 44], beak: [[-372, -186], [-410, -176], [-372, -166]],
  neck: [[-300, -152], [-262, -110], [-205, -66], [-140, -32]],
  run: [[-170, -6], [-70, -76], [80, -84], [212, -34], [206, 42], [70, 84], [-110, 62]],
  sit: [[-180, 12], [-70, -58], [90, -64], [222, -8], [214, 74], [40, 98], [-150, 74]],
  legs: [[[-6, 58], [-34, 170], [-118, 262]], [[76, 52], [140, 156], [244, 214]]],
  cross: [[-440, -312, 3.4], [-426, -214, 3.2], [-478, -258, 2.8], [-385, -270, 2.8], [-406, -244, 1.8]],
  pointers: [[-258, -282, 3.6], [-206, -246, 3.0]],
  scorpius: [[470, -150, 2.2], [500, -118, 3.4], [532, -92, 2.2], [560, -50, 2.0], [590, 4, 2.0], [600, 64, 2.0], [580, 118, 2.2], [544, 140, 2.4], [512, 128, 2.0]],
};
const emu = (S, A, k, o) => {
  const [t0, off0, sc] = o.emuAt || [0.42, 10, 1], [X0, Y0] = A.P(t0, off0), ca = Math.cos(A.ang * (o.tilt ?? 0.6)), sa = Math.sin(A.ang * (o.tilt ?? 0.6));
  const M = ([x, y]) => [X0 + sc * (x * ca - y * sa), Y0 + sc * (x * sa + y * ca)], T = S.start, pose = o.emu, dust = o.dust, gold = o.rimC || DS.c("gold", 1), parent = o.parent;
  const parts = [];
  if (pose !== "egg") {
    const [hx, hy] = M(EMU.head);
    parts.push(["fill", circ(hx, hy, EMU.head[2] * sc), EMU.head[2] * sc]);
    parts.push(["fill", poly(EMU.beak.map(M), 0) + " Z"]);
    parts.push(["line", smooth(EMU.neck.map(M)), 30 * sc]);
    parts.push(["fill", blob(EMU[pose === "sit" ? "sit" : "run"].map(M))]);
    if (pose === "run") EMU.legs.forEach((l) => parts.push(["line", smooth(l.map(M)), 20 * sc]));
  } else { const [ex, ey] = M([10, 20]); parts.push(["fill", circ(ex, ey, 132 * sc, 94 * sc)]); }
  const ek = k * (o.emuK ?? 1), lay = (p, t) => {
    if (p[0] === "line") [[2, 0.35], [1, 0.9]].forEach(([f, op]) => S.draw(p[1], t, 0, { c: dust, w: p[2] * f, op: op * ek, parent }));
    else { S.draw(p[1], t, 0, { c: dust, w: DS.w.near * 2.4 * sc, op: 0.35 * ek, parent }); S.fill(p[1], t, 0, dust, 0.9 * ek, parent); }
  };
  parts.forEach((p) => lay(p, T));
  // ring outline on cue (gold rim under a fresh copy of the dust), never a fill
  if (o.rim !== undefined) { parts.forEach((p) => S.draw(p[1], o.rim, 0, { c: gold, w: p[0] === "line" ? p[2] + 10 : DS.w.mid, op: 0.95, parent })); parts.forEach((p) => lay(p, o.rim)); }
  const pts = (list) => list.map(([x, y, r]) => [...M([x, y]), r]);
  const R = { cross: pts(EMU.cross), pointers: pts(EMU.pointers), scorpius: pts(EMU.scorpius), head: M(EMU.head), body: M([20, 0]), neck: M(EMU.neck[2]), M };
  if (o.stars !== false) { R.cross.forEach(([x, y, r]) => spark(S, x, y, r * 0.9 * Math.max(0.5, sc), { parent })); R.pointers.forEach(([x, y, r]) => spark(S, x, y, r * 0.9 * Math.max(0.5, sc), { parent })); R.scorpius.forEach(([x, y, r], i) => spark(S, x, y, r * 0.8 * Math.max(0.5, sc), { c: i === 1 ? DS.c("orange", 1) : DS.P.white[0], halo: i === 1, parent })); }
  o.E = R;
  return R;
};

// ---------- the ground under each sky ----------
const SIL = DS.mix(N_[2], I_[2], 0.45);   // night silhouettes
const WIN = DS.c("yellow", 1);
const city = (S, hz, o = {}) => {
  const g = S.grp(), lit = [];
  for (let x = -60, i = 0; x < 1980; i++) {
    const w = 90 + 110 * H(i, 31), h = (o.h || 260) * (0.45 + 0.9 * H(i, 32)), y = hz - h;
    S.fill(rect(x, y, w + 2, h + 400), S.start, 0, DS.mix(SIL, N_[0], 0.18 + 0.2 * H(i, 33)), 1, g);
    for (let r = 0; r < Math.floor((h - 30) / 42); r++) for (let c = 0; c < Math.floor((w - 20) / 34); c++) if (H(i * 31 + r, c + 40) > 0.55) lit.push(rect(x + 14 + c * 34, y + 18 + r * 42, 16, 22));
    if (H(i, 34) > 0.7) S.draw(line([x + w / 2, y], [x + w / 2, y - 60], 0), S.start, 0, { c: DS.mix(SIL, N_[0], 0.3), w: DS.w.detail, parent: g });
    x += w;
  }
  S.fill(lit.join(" "), S.start, 0, WIN, 0.85, g);
  return g;
};
// Dave's flat roof: parapet, an air-con box, a TV aerial (near plane, cropped by the frame)
const roof = (S, top, o = {}) => {
  DS.shape(S, rect(-60, top, 2040, 1140 - top), "gray", { tone: 2, flat: true, w: "mid" });
  DS.shape(S, rect(-60, top - 26, 2040, 30), "gray", { tone: 0, flat: true, w: "mid" });
  if (o.ac !== false) { DS.shadow(S, 1560, top, 260); DS.shape(S, rrect(1440, top - 170, 240, 170, DS.r.xs), "gray", { tone: 1 }); S.draw(circ(1560, top - 86, 54), S.start, 0, { c: DS.c("gray", 2), w: DS.w.mid }); S.draw(rays(1560, top - 86, 8, 50, 6), S.start, 0, { c: DS.c("gray", 2), w: DS.w.detail }); }
  if (o.aerial !== false) { const ax = o.ax ?? 300; S.draw(line([ax, top - 26], [ax, top - 300], 0), S.start, 0, { c: DS.c("gray", 1), w: DS.w.mid }); [0, 40, 80].forEach((d, i) => S.draw(line([ax - 80 + i * 14, top - 280 + d], [ax + 80 - i * 14, top - 280 + d], 0), S.start, 0, { c: DS.c("gray", 1), w: DS.w.detail })); }
};
const house = (S, x, gy, k, o = {}) => {
  const c = o.c || SIL;
  S.fill(rect(x - 110 * k, gy - 150 * k, 220 * k, 160 * k), S.start, 0, c, 1);
  S.fill(poly([[x - 135 * k, gy - 145 * k], [x, gy - 245 * k], [x + 135 * k, gy - 145 * k]], 0) + " Z", S.start, 0, c, 1);
  if (o.lit !== false) [[-64, -110], [26, -110]].forEach(([dx, dy], i) => (H(x, i) > 0.35 || o.lit) && S.fill(rect(x + dx * k, gy + dy * k, 38 * k, 34 * k), S.start, 0, WIN, 0.9));
};
const lamp = (S, x, gy, h, o = {}) => { S.draw(line([x, gy], [x, gy - h], 0), S.start, 0, { c: SIL, w: DS.w.mid }); S.draw(smooth([[x, gy - h], [x + 30, gy - h - 16], [x + 64, gy - h]]), S.start, 0, { c: SIL, w: DS.w.mid }); S.fill(circ(x + 64, gy - h + 8, 110, 90), S.start, 0, glo(DS.c("orange", 1), 0.6), 1); S.fill(circ(x + 64, gy - h + 6, 10), S.start, 0, DS.c("yellow", 1), 1); };
const treeS = (S, x, gy, k, c = SIL) => { S.fill(rect(x - 8 * k, gy - 90 * k, 16 * k, 92 * k), S.start, 0, c, 1); S.fill(blob([[x - 70 * k, gy - 110 * k], [x - 40 * k, gy - 200 * k], [x + 10 * k, gy - 250 * k], [x + 60 * k, gy - 190 * k], [x + 74 * k, gy - 110 * k], [x, gy - 80 * k]]), S.start, 0, c, 1); };
const hills = (S, hz, o = {}) => {
  const c = o.c || SIL, f = o.far || DS.mix(SIL, N_[0], 0.35);
  S.fill(smooth([[-200, hz - 20], [300, hz - 70], [800, hz - 30], [1300, hz - 80], [1800, hz - 35], [2120, hz - 50]]) + " L2120 1280 L-200 1280 Z", S.start, 0, f, 1);
  S.fill(smooth([[-200, hz + 30], [500, hz + 6], [1100, hz + 36], [1600, hz + 10], [2120, hz + 30]]) + " L2120 1280 L-200 1280 Z", S.start, 0, c, 1);
};
const sea = (S, hz, o = {}) => {
  S.fill(rect(-200, hz, 2320, 1280 - hz), S.start, 0, DS.vgrad(DS.mix(N_[2], NI_[2], 0.4), DS.mix(N_[2], I_[2], 0.5)), 1);
  const d = []; for (let i = 0; i < 70; i++) { const x = H(i, 41) * 1920, y = hz + 12 + H(i, 42) ** 1.6 * (1080 - hz), l = 14 + 50 * ((y - hz) / (1080 - hz)); d.push(`M${f1(x - l)} ${f1(y)} H${f1(x + l)}`); }
  S.draw(d.join(" "), S.start, 0, { c: DS.P.white[0], w: DS.w.detail, op: 0.22 });
  S.draw(line([-200, hz], [2120, hz], 0), S.start, 0, { c: DS.mix(N_[0], NI_[1], 0.4), w: DS.w.detail, op: 0.8 });
};

// ---------- Dave's car, the Bortle sign, the sky-count note ----------
const car = (S, x, gy, k = 1, o = {}) => {
  const g = S.grp(o.parent), t = o.t, X = (v) => x + v * k, Y = (v) => gy + v * k;
  DS.shadow(S, x, gy, 420 * k, { t, parent: g });
  if (o.beam) S.fill(`M${X(200)} ${Y(-62)} L${X(900)} ${Y(-150)} L${X(900)} ${Y(40)} Z`, t ?? S.start, 0, DS.c("yellow", 1), 0.16, g);
  DS.shape(S, `M${X(-210)} ${Y(-40)} Q${X(-214)} ${Y(-100)} ${X(-160)} ${Y(-104)} L${X(-96)} ${Y(-106)} Q${X(-50)} ${Y(-176)} ${X(10)} ${Y(-178)} L${X(80)} ${Y(-176)} Q${X(130)} ${Y(-170)} ${X(160)} ${Y(-108)} L${X(190)} ${Y(-102)} Q${X(222)} ${Y(-94)} ${X(220)} ${Y(-40)} Z`, "sky", { t, parent: g, dir: "v" });
  DS.shape(S, `M${X(-78)} ${Y(-112)} Q${X(-42)} ${Y(-164)} ${X(4)} ${Y(-164)} L${X(10)} ${Y(-112)} Z M${X(28)} ${Y(-112)} L${X(26)} ${Y(-164)} L${X(76)} ${Y(-162)} Q${X(112)} ${Y(-152)} ${X(136)} ${Y(-112)} Z`, "navy", { t, parent: g, flat: true, w: "detail" });
  S.fill(circ(X(206), Y(-70), 12 * k, 9 * k), t ?? S.start, 0, DS.c("yellow", 1), 1, g);
  S.fill(rect(X(-212), Y(-78), 14 * k, 18 * k), t ?? S.start, 0, DS.c("red"), 1, g);
  [-120, 120].forEach((dx) => { DS.shape(S, circ(X(dx), Y(-36), 40 * k), "ink", { t, parent: g, w: "detail" }); S.fill(circ(X(dx), Y(-36), 16 * k), t ?? S.start, 0, DS.c("gray", 1), 1, g); });
  return g;
};
const bsign = (S, x, gy, n, o = {}) => {
  const t = o.t, g = S.grp(), w = 230, h = 220, y = gy - 300 - h;
  DS.shadow(S, x, gy, 90, { t, parent: g });
  DS.shape(S, rect(x - 9, y + h - 10, 18, gy - y - h + 10), "gray", { t, parent: g, w: "detail" });
  DS.drop(S, rrect(x - w / 2 + 6, y + 8, w, h, DS.r.sm), { t, parent: g });
  DS.shape(S, rrect(x - w / 2, y, w, h, DS.r.sm), "green", { t, tone: 2, flat: true, parent: g, w: "detail" });
  S.draw(rrect(x - w / 2 + 12, y + 12, w - 24, h - 24, DS.r.xs), t ?? S.start, 0, { c: DS.P.white[0], w: DS.w.detail, parent: g });
  S.text("BORTLE", x, y + 64, { size: DS.type.caption, t, c: DS.P.white[0], parent: g });
  S.text(String(n), x, y + 178, { size: DS.type.display, t, c: DS.P.white[0], parent: g });
  return g;
};
// Dave's sky count: a sticky note, top right. rows = strings. o.t (in), o.out (fade out), o.hi = row index to ring
const note = (S, rows, o = {}) => {
  const g = S.grp(), x = o.x ?? 1430, y = o.y ?? 70, w = 400, h = 92 + rows.length * 56, t = o.t, T = t ?? S.start;
  DS.drop(S, rect(x + 6, y + 10, w, h), { t, parent: g });
  DS.shape(S, rect(x, y, w, h), "yellow", { t, tone: 1, flat: true, w: "detail", parent: g });
  S.fill(rect(x, y, w, 26), T, 0, DS.c("yellow"), 1, g);
  S.text("DAVE'S SKY", x + w / 2, y + 68, { size: DS.type.caption, t, c: DS.c("brown", 2), parent: g });
  rows.forEach((s, i) => S.text(s, x + w / 2, y + 130 + i * 56, { size: DS.type.caption, t: (o.ts || [])[i] ?? t, c: DS.c("ink"), parent: g }));
  if (o.hi !== undefined) S.draw(circ(x + w / 2, y + 116 + o.hi * 56, w * 0.46, 30), o.hiT ?? T, 0, { c: DS.c("red"), w: DS.w.mid, parent: g });
  g.setAttribute("transform", `rotate(2 ${x + w / 2} ${y + h / 2})`);
  if (t !== undefined && t > S.start + 0.05) tl.fromTo(g, { opacity: 0 }, { opacity: 1, duration: 0.35 }, t);
  if (o.out !== undefined) S.fadeOut(g, o.out, 0.3);
  return g;
};
const NOTE1 = ["3 STARS", "+ 1 PLANE"], NOTE2 = ["2 STARS", "+ 1 WILD SHEEP", "+ 1 PLANE"], NOTE3 = ["2 SUNS", "+ 1 WILD SHEEP", "+ 1 PLANE"];
// Dave's three city "stars" and the plane, in roof-sky coordinates; J = Jupiter (the bright one)
const DSTARS = { J: [1180, 250], s1: [620, 330], s2: [900, 170] };
const plane = (S, x, y, k = 1, o = {}) => {
  const g = S.grp(o.parent), T = o.t ?? S.start, body = DS.mix(SIL, N_[0], 0.6);
  if (o.shape !== false) {
    S.fill(`M${x - 70 * k} ${y} Q${x - 70 * k} ${y - 9 * k} ${x - 50 * k} ${y - 9 * k} L${x + 60 * k} ${y - 8 * k} Q${x + 82 * k} ${y - 4 * k} ${x + 86 * k} ${y} Q${x + 82 * k} ${y + 5 * k} ${x + 60 * k} ${y + 8 * k} L${x - 50 * k} ${y + 8 * k} Q${x - 70 * k} ${y + 8 * k} ${x - 70 * k} ${y} Z`, o.ts ?? T, 0, body, 1, g);
    S.fill(`M${x - 4 * k} ${y} L${x - 40 * k} ${y + 46 * k} L${x - 18 * k} ${y + 46 * k} L${x + 28 * k} ${y} Z M${x - 50 * k} ${y - 6 * k} L${x - 70 * k} ${y - 36 * k} L${x - 58 * k} ${y - 36 * k} L${x - 34 * k} ${y - 6 * k} Z`, o.ts ?? T, 0, body, 1, g);
  }
  const w = S.fill(circ(x - 4 * k, y + 2 * k, 5 * Math.max(1, k * 0.8)), T, 0, DS.P.white[0], 1, g);
  const r = S.grp(g); S.fill(circ(x - 26 * k, y + 46 * k, 22 * Math.max(1, k * 0.7)), T, 0, glo(DS.c("red", 1), 0.8), 1, r); S.fill(circ(x - 26 * k, y + 46 * k, 6 * Math.max(1, k * 0.7)), T, 0, DS.c("red", 1), 1, r);
  const n = Math.floor(S.len / 0.9); for (let i = 0; i < n; i++) { tl.set(r, { opacity: 1 }, S.start + i * 0.9); tl.set(r, { opacity: 0 }, S.start + i * 0.9 + 0.35); }
  if (o.dx) S.move(g, S.start, S.len, { x: o.dx, y: o.dy || 0 }, "none");
  return g;
};
const jupiter = (S, x, y, r = 5, o = {}) => { const g = S.grp(o.parent), T = o.t ?? S.start; S.fill(circ(x, y, r * 6), T, 0, glo(DS.c("gold", 1), 0.55), 1, g); S.fill(circ(x, y, r), T, 0, DS.mix(DS.P.white[0], DS.P.gold[1], 0.5), 1, g); return g; };
// a sheep, for the planets the Babylonians called "wild sheep"
const sheep = (S, cx, cy, k = 1, o = {}) => {
  const g = S.grp(o.parent), t = o.t, T = t ?? S.start;
  [[-34, 40], [30, 40]].forEach(([dx, dy]) => S.draw(line([cx + dx * k, cy + dy * k - 10 * k], [cx + dx * k, cy + dy * k + 30 * k], 0), T, 0, { c: DS.c("ink"), w: DS.w.mid * Math.sqrt(k), parent: g }));
  [[0, 0, 46], [-40, 6, 32], [40, 8, 34], [-18, -26, 30], [22, -24, 30], [-4, 26, 34]].forEach(([dx, dy, r]) => DS.shape(S, circ(cx + dx * k, cy + dy * k, r * k), "white", { t, parent: g, w: "detail", flat: true }));
  S.fill(circ(cx, cy, 52 * k, 36 * k), T, 0, DS.P.white[0], 1, g);
  DS.shape(S, circ(cx - 66 * k, cy - 18 * k, 24 * k, 20 * k), "ink", { t, parent: g, w: "hair", flat: true, tone: 1 });
  S.fill(circ(cx - 72 * k, cy - 22 * k, 4 * k), T, 0, DS.P.white[0], 1, g);
  S.draw(smooth([[cx - 58 * k, cy - 34 * k], [cx - 44 * k, cy - 42 * k], [cx - 40 * k, cy - 26 * k]]), T, 0, { c: DS.c("ink"), w: DS.w.detail, parent: g });
  return g;
};

// ---------- the WHAT ARE STARS? notebook ----------
// items: [text, tIn?, mark?, tMark?]  mark: "tick" | "x" | "q" (red ?) | "gold" (gold ring = the closest)
const notebook = (S, x, y, items, o = {}) => {
  const size = o.size || DS.type.small, lh = size * 1.32, w = o.wd || 620, h = size * 2.2 + items.length * lh + 36, g = S.grp(), t = o.t, T = t ?? S.start;
  DS.drop(S, rrect(x + 10, y + 14, w, h, DS.r.sm), { t, parent: g });
  DS.shape(S, rrect(x, y, w, h, DS.r.sm), "paper", { t, flat: true, w: "detail", parent: g });
  for (let i = 0; i < items.length; i++) S.draw(line([x + 20, y + size * 2.2 + (i + 1) * lh], [x + w - 20, y + size * 2.2 + (i + 1) * lh], 0), T, 0, { c: DS.c("sky", 2), w: DS.w.hair, parent: g });
  S.draw(line([x + size * 1.6, y + 12], [x + size * 1.6, y + h - 12], 0), T, 0, { c: DS.c("red", 1), w: DS.w.detail, parent: g });
  for (let i = 0; i < 6; i++) DS.shape(S, circ(x + 40 + i * ((w - 80) / 5), y, 12), "gray", { t, parent: g, w: "detail" });
  S.text("WHAT ARE STARS?", x + w / 2 + size * 0.5, y + size * 1.55, { size, t, c: DS.c("ink"), parent: g });
  const R = [];
  items.forEach(([s, ti, m, tm], i) => {
    const yy = y + size * 2.2 + (i + 1) * lh - size * 0.3, tx = x + size * 2.1;
    S.text(s, tx, yy, { size, t: ti ?? t, c: DS.c("blue", 2), anchor: "start", parent: g });
    const mx = x + size * 0.85, my = yy - size * 0.32, wd = s.length * size * 0.62;
    if (m === "tick") tick(S, mx, my, size / 64, tm ?? ti ?? T);
    if (m === "x") { xMark(S, mx, my, size / 64, tm ?? ti ?? T); S.draw(line([tx - 6, my], [tx + wd + 6, my], 0), tm ?? ti ?? T, 0, { c: DS.c("red"), w: DS.w.mid, parent: g }); }
    if (m === "q") S.text("?", tx + wd + size * 0.6, yy, { size, t: tm ?? ti ?? T, c: DS.c("red", 2), parent: g });
    if (m === "gold") S.draw(circ(tx + wd / 2, my, wd / 2 + 34, size * 0.62), tm ?? T, 0, { c: DS.c("gold", 2), w: DS.w.near, parent: g });
    R.push([tx, yy, wd]);
  });
  if (t !== undefined && t > S.start + 0.05) tl.fromTo(g, { opacity: 0 }, { opacity: 1, duration: 0.35 }, t);
  return { g, R, h };
};

// ---------- globes, maps, ancient props ----------
const globe = (S, cx, cy, r, o = {}) => {
  const g = S.grp(o.parent), T = o.t ?? S.start;
  S.draw(circ(cx, cy, r), T, 0, { fill: DS.vol("blue"), c: DS.c("ink"), w: r > 60 ? DS.w.mid : DS.w.detail, parent: g });
  const k = clipTo(S.grp(g), circ(cx, cy, r));
  [[[-0.6, -0.5], [-0.1, -0.7], [0.2, -0.35], [-0.2, 0.0], [-0.55, -0.1]], [[0.15, 0.1], [0.55, -0.05], [0.7, 0.4], [0.35, 0.7], [0.1, 0.45]]].forEach((p) => S.fill(blob(p.map(([a, b]) => [cx + a * r, cy + b * r])), T, 0, DS.c("grass"), 1, k));
  return g;
};
// Mesopotamian star sign (an eight-armed asterisk, as on the tablets)
const mul = (S, x, y, r, o = {}) => S.draw(rays(x, y, 0, r, 8), o.t ?? S.start, 0, { c: o.c || DS.c("earth", 2), w: o.w || DS.w.detail, parent: o.parent });
// clay tablet with rows of cuneiform wedges. o.stars = [[fx, fy], ...] star signs; o.chart = barley price line
const tablet = (S, cx, cy, w, h, o = {}) => {
  const g = S.grp(o.parent), t = o.t, T = t ?? S.start, x = cx - w / 2, y = cy - h / 2;
  DS.drop(S, rrect(x + 8, y + 12, w, h, w < 160 ? DS.r.sm : DS.r.lg), { t, parent: g });
  DS.shape(S, rrect(x, y, w, h, w < 160 ? DS.r.sm : DS.r.lg), "earth", { t, tone: 1, parent: g, w: w > 300 ? "mid" : "detail" });
  const rows = o.rows ?? Math.floor((h - 40) / 34), d = [];
  for (let r = 0; r < rows; r++) {
    const yy = y + 34 + r * ((h - 60) / Math.max(1, rows - 1 || 1));
    if (r) S.draw(line([x + 18, yy - 17], [x + w - 18, yy - 17], 0), T, 0, { c: DS.c("earth", 2), w: DS.w.hair, op: 0.6, parent: g });
    for (let c = 0; c < Math.floor((w - 40) / 30); c++) if (H(r * 13 + c, 51 + (o.seed || 0)) > 0.28) { const xx = x + 26 + c * 30 + H(r, c) * 6; d.push(`M${f1(xx)} ${f1(yy - 8)} L${f1(xx + 12)} ${f1(yy - 3)} L${f1(xx)} ${f1(yy + 2)} Z M${f1(xx + 10)} ${f1(yy - 3)} H${f1(xx + 22)}`); }
  }
  if (!o.blank) S.draw(d.join(" "), T, 0, { c: DS.c("earth", 2), w: DS.w.hair, fill: DS.c("earth", 2), parent: g });
  (o.stars || []).forEach(([fx, fy, rr]) => { S.fill(circ(x + fx * w, y + fy * h, (rr || 26) + 8), T, 0, DS.c("earth", 1), 1, g); mul(S, x + fx * w, y + fy * h, rr || 26, { t, parent: g, w: DS.w.mid }); });
  return { g, x, y, w, h };
};
const ziggurat = (S, cx, gy, k = 1, c = SIL) => [[0, 520, 120], [120, 380, 110], [230, 250, 100]].forEach(([dy, w, h]) => S.fill(rect(cx - (w * k) / 2, gy - (dy + h) * k, w * k, h * k + 2), S.start, 0, c, 1));
const pyramid = (S, cx, gy, k = 1, o = {}) => {
  const c = o.c || SIL, sh = o.sh || DS.mix(c, I_[2], 0.25);
  S.fill(poly([[cx - 300 * k, gy], [cx, gy - 280 * k], [cx + 300 * k, gy]], 0) + " Z", S.start, 0, c, 1);
  S.fill(poly([[cx, gy - 280 * k], [cx + 300 * k, gy], [cx + 70 * k, gy]], 0) + " Z", S.start, 0, sh, 1);
};
const palm = (S, x, gy, k = 1, c = SIL) => { S.draw(smooth([[x, gy], [x + 10 * k, gy - 120 * k], [x + 30 * k, gy - 230 * k]]), S.start, 0, { c, w: DS.w.near * k * 1.6 }); [[-110, -10], [-70, 50], [80, 40], [120, -20], [10, -70]].forEach(([dx, dy]) => S.draw(smooth([[x + 30 * k, gy - 230 * k], [x + 30 * k + dx * 0.5 * k, gy - 260 * k + dy * 0.3 * k], [x + 30 * k + dx * k, gy - 220 * k + dy * k]]), S.start, 0, { c, w: DS.w.mid * k * 1.4 })); };

const sc = (c, w, o) => { const k = CUES.findIndex(([a, b]) => a === c && b === w); if (k < 0) throw new Error("no cue " + c + ":" + w); return scene(WINS[k][0], WINS[k][1], o); };

