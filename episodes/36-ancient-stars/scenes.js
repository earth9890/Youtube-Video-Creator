// look: still
// What Did Ancient Humans Think the Stars Were? (~8:44). Mission: Dave drives out of the city down the Bortle scale (9 -> 7 -> 5 -> 2 -> 1) to see the sky his ancestors saw; at each darker stop one culture's answer to "what are stars?" is tested.
// Runner objects: Dave's SKY COUNT sticky note (3 STARS + 1 PLANE -> 2 STARS + 1 WILD SHEEP + 1 PLANE -> 2 SUNS + 1 WILD SHEEP + 1 PLANE), a BORTLE road sign at every stop,
// and the WHAT ARE STARS? notebook (WRITING / CLOCK / CALENDAR / MAP / CEILING / SUNS / OLD LIGHT, ticked or crossed at the reveal).
// Real people are name cards, never likenesses. Cultures are shown through their own sky objects: clay tablets, Sirius and the Nile, the Emu made of dust lanes (no figures), the star compass and a voyaging canoe.

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

// mini sky swatch for Bortle class n (1 darkest .. 9 inner city)
const SKYN = (n) => { const ks = [1, 2, 5, 7, 9]; let i = 0; while (i < 3 && n > ks[i + 1]) i++; const a = ks[i], b = ks[i + 1], f = (n - a) / (b - a); return SKYC[a].map((c, j) => DS.mix(c, SKYC[b][j], f)); };
const skyTile = (S, x, y, w, h, n, o = {}) => {
  const g = S.grp(o.parent), T = o.t ?? S.start, k = clipTo(S.grp(g), rrect(x, y, w, h, DS.r.sm));
  S.fill(rect(x, y, w, h), T, 0, vgrad3(SKYN(n), [0, 0.6, 1]), 1, k);
  if (n <= 3) S.fill(poly([[x - 20, y + h * 0.15], [x + w + 20, y + h * 0.75], [x + w + 20, y + h * 1.05], [x - 20, y + h * 0.45]], 0) + " Z", T, 0, DS.mix(DS.P.white[0], DS.P.gold[1], 0.3), 0.32 - n * 0.07, k);
  const cnt = [0, 60, 44, 30, 20, 13, 8, 5, 3, 1][n], d = [[], []];
  for (let i = 0; i < cnt; i++) d[H(i, 63) > 0.5 ? 1 : 0].push([x + 8 + H(i + n * 7, 61) * (w - 16), y + 8 + H(i + n * 7, 62) * (h * 0.75)]);
  dots(S, d[0], 1.6, DS.P.white[0], 0.9, T, k); dots(S, d[1], 2.6, DS.P.white[0], 0.9, T, k);
  S.draw(rrect(x, y, w, h, DS.r.sm), T, 0, { c: DS.c("gray", 1), w: DS.w.detail, parent: g });
  return g;
};

const CUES = [[1, 0], [2, 0], [4, 0], [5, 0], [7, 0], [9, 2], [10, 0], [11, 0], [13, 0], [14, 0],
  [16, 0], [17, 0], [18, 0], [19, 0], [21, 0], [23, 0], [24, 0], [26, 0], [27, 0], [28, 0], [30, 0], [31, 0], [32, 0],
  [34, 0], [36, 0], [37, 0], [39, 0], [40, 0], [41, 0], [43, 0], [44, 0], [46, 0], [48, 0],
  [50, 0], [52, 0], [54, 0], [56, 0], [58, 0], [59, 0], [60, 0], [61, 0], [62, 0], [63, 0], [65, 0], [66, 0], [67, 0],
  [68, 0], [70, 0], [71, 0], [72, 0], [73, 0], [74, 0], [75, 0], [77, 0], [78, 0], [80, 0],
  [83, 0], [84, 0], [85, 0], [86, 0], [88, 0], [89, 0], [90, 0], [91, 0], [92, 0], [93, 0], [94, 0], [95, 0], [96, 0],
  [97, 0], [99, 0], [101, 0], [103, 0], [105, 0], [107, 0], [109, 0], [110, 0], [111, 0], [113, 0], [114, 0], [115, 0], [116, 0], [118, 0], [120, 0], [121, 0],
  [123, 0], [124, 0], [125, 0], [126, 0], [127, 0], [129, 0], [131, 0]];
const WINS = sceneWindows(CUES, -0.25); // each picture lands just after its first word; the 0.6 s crossfade covers the breath

// ===================== 1. Three Stars and a Plane =====================
// Tonight, Dave is lying on a city rooftop, counting the stars.
{ const S = sc(1, 0, { cam: "push", focus: "900 700" }); sky(S, DS.outdoor(S, NIGHT), { b: 9, hz: 760 });
  city(S, 830, { h: 300 });
  jupiter(S, ...DSTARS.J, 6); spark(S, ...DSTARS.s1, 3, { tw: true }); spark(S, ...DSTARS.s2, 3, { tw: true });
  roof(S, 860, { ax: 220 });
  lyingDave(S, 1020, 860, { s: 1.0, pose: "head" });
  DS.card(S, "DAVE", 860, 560, { size: DS.type.small, t: W(1, 1) });
  DS.card(S, "COUNTING THE STARS", 1440, 140, { size: DS.type.body, t: W(1, 8) });
  DS.vignette(S, 0.1); }

// "One, two, three, and number four." / Number four is blinking. Number four is a plane.
{ const S = sc(2, 0, { cam: "zoom", focus: "1000 360" }); sky(S, DS.outdoor(S, NIGHT), { b: 9, hz: 900 });
  city(S, 960, { h: 160 }); roof(S, 990, { ac: false, aerial: false });
  jupiter(S, ...DSTARS.J, 6); spark(S, ...DSTARS.s1, 3, { tw: true }); spark(S, ...DSTARS.s2, 3, { tw: true });
  [[DSTARS.s1, W(2, 0), "1"], [DSTARS.s2, W(2, 1), "2"], [DSTARS.J, W(2, 2), "3"]].forEach(([[x, y], t, n]) => S.text(n, x + 50, y - 26, { size: DS.type.body, t, c: DS.P.white[0] }));
  plane(S, 1500, 420, 1.2, { ts: W(3, 7), dx: 110, dy: -14 });
  S.text("4", 1580, 360, { size: DS.type.body, t: W(2, 4), c: DS.c("red", 1) });
  DS.card(S, "NUMBER FOUR IS A PLANE", 760, 620, { size: DS.type.body, t: W(3, 8), tc: "red" });
  note(S, NOTE1, { t: W(3, 8) + 0.4 });
  DS.vignette(S, 0.1); }

// For almost all of human history, a clear night looked nothing like this.
{ const S = sc(4, 0, { cam: "push", focus: "960 560" }); sky(S, DS.outdoor(S, NIGHT), { b: 1, hz: 1080, th: 0.55 });
  const x0 = 170, x1 = 1750, y = 560, h = 150, k = clipTo(S.grp(), rrect(x0, y, x1 - x0, h, DS.r.lg));
  S.fill(rect(x0, y, x1 - x0, h), S.start, 0, DS.vgrad(SKYC[1][0], SKYC[1][2]), 1, k);
  S.fill(poly([[x0, y + h * 0.9], [x1, y + h * 0.1], [x1, y + h * 0.5], [x0, y + h * 1.2]], 0) + " Z", S.start, 0, DS.mix(DS.P.white[0], DS.P.gold[1], 0.3), 0.25, k);
  const d = [[], []]; for (let i = 0; i < 220; i++) d[H(i, 73) > 0.6 ? 1 : 0].push([x0 + H(i, 71) * (x1 - x0), y + 6 + H(i, 72) * (h - 12)]); dots(S, d[0], 1.4, DS.P.white[0], 0.85, S.start, k); dots(S, d[1], 2.4, DS.P.white[0], 0.85, S.start, k);
  S.fill(rect(x1 - 26, y, 26, h), W(4, 9), 0, DS.c("orange"), 1, k);
  S.draw(rrect(x0, y, x1 - x0, h, DS.r.lg), S.start, 0, { c: DS.P.white[0], w: DS.w.mid });
  [[420, 0], [880, 1], [1300, 2]].forEach(([x, i]) => person(S, x, y - 4, "near", i, { s: 0.5, mood: "wow", look: 6, float: true }));
  wtxt(S, "NOW", x1 - 14, y + h + 64, { t: W(4, 9) });
  S.arrow(x1 - 14, y + h + 16, x1 - 14, y + h - 6, W(4, 9), 0, { c: DS.c("orange", 1), w: DS.w.mid, head: 16 });
  DS.card(S, "ALMOST ALL OF HUMAN HISTORY", 960, 200, { size: DS.type.body, t: W(4, 1) });
  DS.card(S, "NOTHING LIKE THIS", 1380, 860, { size: DS.type.small, t: W(4, 9), tc: "red" });
  DS.vignette(S, 0.1); }

// Under a truly dark sky, you can see a few thousand stars at once, / and the Milky Way is bright enough to cast your shadow.
{ const S = sc(5, 0, { cam: "pull", focus: "960 500" }); const O = sky(S, DS.outdoor(S, NIGHT), { b: 1, hz: 820, t: W(5, 7), mw: 1, mwT: W(6, 2), from: [-200, 60], to: [2120, 700] });
  hills(S, 820, { c: DS.mix(N_[0], DS.P.gray[2], 0.45), far: DS.mix(N_[2], N_[0], 0.5) });
  S.fill(poly([[735, 932], [380, 990], [330, 1010], [705, 948]], 0) + " Z", W(6, 8), 0, DS.P.ink[2], 0.55);
  person(S, 760, 930, "near", 0, { s: 1.0, mood: "wow", look: 7 });
  DS.card(S, "A FEW THOUSAND STARS", 1340, 640, { size: DS.type.body, t: W(5, 9) });
  DS.card(S, "BRIGHT ENOUGH TO CAST A SHADOW", 760, 150, { size: DS.type.small, t: W(6, 5) });
  DS.vignette(S, 0.1); }

// ---------- icons for the answers ----------
// Egyptian star clock: a night dial with twelve star groups (decans) round the rim
const starClock = (S, cx, cy, r, o = {}) => {
  const g = S.grp(o.parent), t = o.t, T = t ?? S.start;
  DS.shape(S, circ(cx, cy, r), "navy", { t, parent: g, flat: true, tone: 2, w: r > 120 ? "mid" : "detail" });
  for (let i = 0; i < 12; i++) { const a = -Math.PI / 2 + (i / 12) * Math.PI * 2, x = cx + Math.cos(a) * r * 0.74, y = cy + Math.sin(a) * r * 0.74; [[-1, 0], [1, -0.6], [0.4, 0.9]].forEach(([dx, dy]) => S.fill(circ(x + dx * r * 0.06, y + dy * r * 0.06, Math.max(2, r * 0.028)), (o.ts || [])[i] ?? T, 0, DS.c("gold", 1), 1, g)); }
  const hand = S.draw(line([cx, cy], [cx, cy - r * 0.55], 0), T, 0, { c: DS.P.white[0], w: r > 120 ? DS.w.near : DS.w.mid, parent: g });
  if (o.turn) tl.fromTo(hand, { rotation: 0 }, { rotation: o.turn, svgOrigin: `${cx} ${cy}`, duration: S.len, ease: "none" }, S.start);
  S.fill(circ(cx, cy, r * 0.06), T, 0, DS.P.white[0], 1, g);
  return g;
};
// Polynesian star compass: horizon ring split into houses, a canoe (two hulls, top view) in the middle
const compass = (S, cx, cy, r, o = {}) => {
  const g = S.grp(o.parent), t = o.t, T = t ?? S.start, n = o.n || 32, lw = r > 200 ? DS.w.mid : DS.w.detail;
  DS.shape(S, circ(cx, cy, r), "navy", { t, parent: g, flat: true, tone: 2, w: r > 200 ? "mid" : "detail" });
  S.draw(circ(cx, cy, r * 0.82), T, 0, { c: DS.c("sky", 1), w: DS.w.hair, parent: g, op: 0.6 });
  S.draw(rays(cx, cy, r * 0.82, r, n), T, 0, { c: DS.c("sky", 1), w: lw, parent: g });
  [-1, 1].forEach((sd) => DS.shape(S, `M${cx + sd * r * 0.1} ${cy - r * 0.3} Q${cx + sd * r * 0.16} ${cy} ${cx + sd * r * 0.1} ${cy + r * 0.3} Q${cx + sd * r * 0.04} ${cy} ${cx + sd * r * 0.1} ${cy - r * 0.3} Z`, "brown", { t, parent: g, w: "detail", tone: 1 }));
  DS.shape(S, rect(cx - r * 0.12, cy - r * 0.06, r * 0.24, r * 0.12), "wood", { t, parent: g, w: "hair", flat: true });
  return g;
};
const emuTile = (S, cx, cy, w, h, o = {}) => {
  const g = S.grp(o.parent), k = clipTo(S.grp(g), rrect(cx - w / 2, cy - h / 2, w, h, DS.r.md)), C = SKYC[1];
  S.fill(rect(cx - w / 2, cy - h / 2, w, h), o.t ?? S.start, 0, C[0], 1, k);
  milky(S, 1, { parent: k, t: o.t, from: [cx - w * 0.6, cy - h * 0.55], to: [cx + w * 0.6, cy + h * 0.45], wd: w * 0.1, bulge: 0.55, emu: o.pose || "run", emuAt: [0.52, 4, w / 1300], dust: C[0], stars: false, rim: o.rim });
  return g;
};
const envelope = (S, cx, cy, w, h, o = {}) => {
  const g = S.grp(o.parent), t = o.t, T = t ?? S.start, x = cx - w / 2, y = cy - h / 2;
  DS.drop(S, rrect(x + 10, y + 14, w, h, DS.r.sm), { t, parent: g });
  DS.shape(S, rrect(x, y, w, h, DS.r.sm), "paper", { t, parent: g, flat: true, w: "mid" });
  S.draw(`M${x + 6} ${y + 8} L${cx} ${cy + h * 0.08} L${x + w - 6} ${y + 8}`, T, 0, { c: DS.c("gray", 2), w: DS.w.mid, parent: g });
  S.draw(`M${x + 6} ${y + h - 6} L${cx - w * 0.16} ${cy - h * 0.02} M${x + w - 6} ${y + h - 6} L${cx + w * 0.16} ${cy - h * 0.02}`, T, 0, { c: DS.c("gray", 1), w: DS.w.detail, parent: g });
  const sx = x + w - w * 0.16, sy = y + h * 0.22, sw = w * 0.16;
  DS.shape(S, rect(sx - sw / 2, sy - sw * 0.6, sw, sw * 1.2), o.stampC || "navy", { t, parent: g, flat: true, tone: 2, w: "detail" });
  spark(S, sx, sy, sw * 0.08, { t, parent: g, halo: false, c: DS.c("gold", 1) });
  S.draw(circ(sx - sw * 0.9, sy + sw * 0.1, sw * 0.5), T, 0, { c: DS.c("red", 2), w: DS.w.detail, parent: g, op: 0.7 });
  return g;
};
// night-side Earth: dark land, the glow of the world's lights fading in at o.lt
const nightGlobe = (S, cx, cy, r, o = {}) => {
  const g = S.grp(), k = clipTo(S.grp(g), circ(cx, cy, r));
  S.draw(circ(cx, cy, r * 1.04), S.start, 0, { c: DS.c("sky", 1), w: DS.w.detail, op: 0.5, parent: g });
  S.fill(circ(cx, cy, r), S.start, 0, DS.vgrad(DS.mix(N_[2], NI_[0], 0.25), DS.mix(N_[2], I_[2], 0.6)), 1, k);
  const LAND = [[[-0.95, -0.55], [-0.4, -0.75], [-0.15, -0.35], [-0.35, 0.05], [-0.6, 0.15], [-0.85, -0.1]], [[-0.45, 0.2], [-0.2, 0.25], [-0.25, 0.75], [-0.42, 0.9], [-0.5, 0.5]], [[0.0, -0.6], [0.35, -0.75], [0.95, -0.55], [0.85, -0.05], [0.55, 0.1], [0.4, -0.05], [0.05, -0.2]], [[0.05, -0.15], [0.35, -0.1], [0.4, 0.35], [0.22, 0.65], [0.1, 0.3]], [[0.65, 0.4], [0.9, 0.42], [0.85, 0.65], [0.62, 0.6]]];
  LAND.forEach((p) => S.fill(blob(p.map(([a, b]) => [cx + a * r, cy + b * r])), S.start, 0, DS.mix(N_[0], DS.P.gray[2], 0.35), 1, k));
  const LIT = [[-0.7, -0.4, 0.22], [-0.5, -0.25, 0.16], [0.15, -0.45, 0.2], [0.35, -0.35, 0.14], [0.55, -0.15, 0.18], [0.78, -0.3, 0.2], [0.62, -0.4, 0.14], [-0.3, 0.35, 0.08], [0.2, 0.0, 0.08], [0.75, 0.55, 0.08], [0.3, -0.2, 0.12]];
  const lp = [];
  LIT.forEach(([a, b, rr], i) => { S.fill(circ(cx + a * r, cy + b * r, rr * r * 1.6), o.lt, 0, glo(DS.c("orange", 1), 0.75), 1, k); for (let j = 0; j < 14; j++) lp.push([cx + (a + (H(i * 14 + j, 81) - 0.5) * rr * 1.6) * r, cy + (b + (H(i * 14 + j, 82) - 0.5) * rr * 1.2) * r]); });
  dots(S, lp, 3, DS.c("yellow", 1), 0.95, o.lt, k);
  S.draw(circ(cx, cy, r), S.start, 0, { c: DS.c("ink"), w: DS.w.mid, parent: g });
  return g;
};
// a disc of sky: frac of it (from 12 o'clock, clockwise) washed orange by city light, the rest dark with the Milky Way
const skyPie = (S, cx, cy, r, frac, o = {}) => {
  const g = S.grp(), k = clipTo(S.grp(g), circ(cx, cy, r)), T = o.t ?? S.start, C = SKYC[1];
  S.fill(circ(cx, cy, r), T, 0, C[1], 1, k);
  const d = [[], []]; for (let i = 0; i < 110; i++) d[H(i, 93) > 0.5 ? 1 : 0].push([cx + (H(i, 91) - 0.5) * 2 * r, cy + (H(i, 92) - 0.5) * 2 * r]); dots(S, d[0], 1.6, DS.P.white[0], 0.85, T, k); dots(S, d[1], 2.6, DS.P.white[0], 0.85, T, k);
  const a1 = -90 + frac * 360, wedge = `M${cx} ${cy} ` + arcPts(cx, cy, r * 1.05, -90, a1, 30).map((p, i) => `${i ? "L" : "L"}${f1(p[0])} ${f1(p[1])}`).join(" ") + " Z";
  S.fill(wedge, o.wt ?? T, 0, SKYC[9][2], 1, k);
  S.draw(circ(cx, cy, r), T, 0, { c: DS.P.white[0], w: DS.w.mid, parent: g });
  return g;
};

// So what did ancient humans think the stars were? // The answers include a god's handwriting, a clock, a giant emu, a map,
{ const S = sc(7, 0, { cam: "push", focus: "960 540" }); sky(S, DS.outdoor(S, NIGHT), { b: 1, hz: 1000, mw: 0.6, from: [-200, 500], to: [2120, 80] });
  DS.card(S, "WHAT WERE THE STARS?", 960, 160, { size: DS.type.title });
  const tiles = [[420, W(8, 4), "HANDWRITING"], [800, W(8, 7), "A CLOCK"], [1180, W(8, 10), "A GIANT EMU"], [1560, W(8, 12), "A MAP"]];
  tiles.forEach(([x, t, s], i) => {
    panel(S, x, 610, 330, 360, t, "navy");
    if (i === 0) tablet(S, x, 570, 190, 230, { t, stars: [[0.3, 0.25, 22], [0.7, 0.62, 22]] });
    if (i === 1) starClock(S, x, 570, 120, { t });
    if (i === 2) emuTile(S, x, 570, 280, 230, { t });
    if (i === 3) compass(S, x, 570, 120, { t });
    wtxt(S, s, x, 750, { t });
  });
  DS.vignette(S, 0.1); }

// and one stranger than all of them, because it's true.
{ const S = sc(9, 2, { cam: "zoom", focus: "960 560" }); sky(S, DS.outdoor(S, NIGHT), { b: 1, hz: 1000, mw: 0.6, from: [-200, 500], to: [2120, 80] });
  envelope(S, 960, 560, 640, 400);
  S.text("?", 960, 640, { size: DS.type.display, t: W(9, 1), c: DS.c("blue", 2) });
  DS.card(S, "ONE STRANGER ANSWER", 960, 170, { size: DS.type.body, t: W(9, 2) });
  stamp(S, 1250, 780, "TRUE", W(9, 8), "green");
  DS.vignette(S, 0.1); }

// But in twenty sixteen, Fabio Falchi's team mapped the glow of the world's lights.
{ const S = sc(10, 0, { cam: "push", focus: "1200 560" }); sky(S, DS.outdoor(S, NIGHT), { b: 1, hz: 1100, th: 0.5 });
  nightGlobe(S, 1240, 560, 380, { lt: W(10, 9) });
  nameCard(S, "FABIO FALCHI'S TEAM", "WORLD ATLAS OF NIGHT SKIES", 480, 360, { t: W(10, 4) });
  DS.card(S, "2016", 480, 200, { size: DS.type.title, t: W(10, 2), tc: "red" });
  DS.card(S, "THE GLOW OF THE WORLD'S LIGHTS", 560, 820, { size: DS.type.small, t: W(10, 9) });
  DS.vignette(S, 0.1); }

// The Milky Way is now hidden from more than a third of humanity, / including nearly eighty percent of North Americans.
{ const S = sc(11, 0, { cam: "push", focus: "960 560" }); sky(S, DS.outdoor(S, NIGHT), { b: 5, hz: 1060, th: 0.85 });
  skyPie(S, 560, 510, 230, 0.36, { wt: W(11, 5) });
  skyPie(S, 1360, 510, 230, 0.8, { t: W(12, 0), wt: W(12, 2) });
  DS.card(S, "MILKY WAY HIDDEN FROM", 960, 140, { size: DS.type.body, t: W(11, 5) });
  DS.card(S, "MORE THAN 1/3", 560, 810, { size: DS.type.body, t: W(11, 7) }); wtxt(S, "OF HUMANITY", 560, 915, { size: DS.type.small, t: W(11, 10) });
  DS.card(S, "NEARLY 80%", 1360, 810, { size: DS.type.body, t: W(12, 1), tc: "red" }); wtxt(S, "OF NORTH AMERICANS", 1360, 915, { size: DS.type.small, t: W(12, 4) });
  DS.vignette(S, 0.1); }

// Dave is one of them. So he drives out of the city, one level of darkness at a time.
{ const S = sc(13, 0, { cam: "push", focus: "960 700" }); sky(S, DS.outdoor(S, NIGHT), { b: 7, hz: 800, gx: 150, keep: (x) => x > 820 + 0.3 * H(x, 1) * 400 });
  S.fill(rect(-200, -200, 2320, 1020), S.start, 0, hgrad([[0, SKYC[9][1], 0.9], [0.3, SKYC[9][1], 0.7], [0.55, SKYC[9][1], 0]]), 1);
  const cg = city(S, 820, { h: 300 }); clipTo(cg, rect(-200, -200, 1000, 1300));
  hills(S, 840, { c: SIL, far: DS.mix(SIL, N_[0], 0.25) });
  S.fill(rect(-200, 900, 2320, 70), S.start, 0, DS.mix(DS.P.gray[2], N_[2], 0.5), 1);
  const dl = []; for (let x = -160; x < 2100; x += 140) dl.push(rect(x, 930, 70, 8)); S.fill(dl.join(" "), S.start, 0, DS.c("yellow", 1), 0.7);
  const C = car(S, 420, 960, 0.9, { beam: true });
  S.move(C, W(13, 7), 2.6, { x: 760 }, "power1.in");
  DS.card(S, "DAVE IS ONE OF THEM", 520, 150, { size: DS.type.body, t: W(13, 0) });
  DS.card(S, "ONE LEVEL OF DARKNESS AT A TIME", 1300, 280, { size: DS.type.small, t: W(13, 12) });
  DS.vignette(S, 0.1); }

// Astronomers use John Bortle's scale, from one, the darkest, to nine, the inner city. / Dave's roof is a solid nine.
{ const S = sc(14, 0, { cam: "push", focus: "960 560" }); sky(S, DS.outdoor(S, NIGHT), { b: 2, hz: 1100, th: 2 });
  nameCard(S, "JOHN BORTLE'S SCALE", "SKY & TELESCOPE, 2001", 960, 170, { t: W(14, 2) });
  for (let n = 1; n <= 9; n++) { const x = 200 + (n - 1) * 190, t = n === 1 ? W(14, 6) : n === 9 ? W(14, 10) : W(14, 6) + 0.15 * (n - 1); skyTile(S, x - 80, 400, 160, 220, n, { t }); S.text(String(n), x, 700, { size: DS.type.title, t, c: DS.P.white[0] }); }
  wtxt(S, "DARKEST", 200, 780, { t: W(14, 8) }); wtxt(S, "INNER CITY", 1720, 780, { t: W(14, 12) });
  S.draw(rrect(1626, 384, 188, 350, DS.r.md), W(15, 4), 0, { c: DS.c("red", 1), w: DS.w.near });
  DS.card(S, "DAVE'S ROOF", 1560, 880, { size: DS.type.small, t: W(15, 0), tc: "red" });
  DS.vignette(S, 0.1); }

// ---------- the stops: the same picture at every class (sign left, Dave, his parked car); only the sky and the land change ----------
const SHZ = 800;
const stop = (S, O, n, o = {}) => {
  sky(S, O, Object.assign({ b: n, hz: SHZ }, o.sky || {}));
  if (n === 7) { hills(S, SHZ + 30); [[150, 0.55], [420, 0.5], [640, 0.6], [1560, 0.55], [1800, 0.5]].forEach(([x, k]) => house(S, x, SHZ + 44, k)); treeS(S, 1080, SHZ + 44, 0.7); treeS(S, 1270, SHZ + 48, 0.6); }
  if (n === 5) { hills(S, SHZ); treeS(S, 260, SHZ + 30, 0.8); treeS(S, 1640, SHZ + 26, 0.9); house(S, 1180, SHZ + 10, 0.42, { lit: false }); S.fill(rect(1180 - 64 * 0.42, SHZ + 10 - 110 * 0.42, 38 * 0.42, 34 * 0.42), S.start, 0, WIN, 0.9); const p = []; for (let x = -40; x < 2000; x += 120) p.push(rect(x, 818, 10, 56)); S.fill(p.join(" "), S.start, 0, DS.mix(SIL, N_[0], 0.3), 1); S.draw(line([-60, 832], [1980, 832], 0) + line([-60, 852], [1980, 852], 0), S.start, 0, { c: DS.mix(SIL, N_[0], 0.3), w: DS.w.detail }); }
  if (n === 2) { S.fill(smooth([[-200, SHZ - 6], [600, SHZ - 30], [1200, SHZ - 12], [2120, SHZ - 40]]) + " L2120 1280 L-200 1280 Z", S.start, 0, DS.mix(SIL, N_[0], 0.25), 1); S.fill(rect(-200, SHZ + 10, 2320, 400), S.start, 0, SIL, 1); [[160, 0.5], [560, 0.35], [1660, 0.45], [1880, 0.3]].forEach(([x, k]) => S.fill(blob([[x - 90 * k, SHZ + 14], [x - 40 * k, SHZ - 50 * k], [x + 30 * k, SHZ - 64 * k], [x + 90 * k, SHZ + 14]]), S.start, 0, DS.mix(SIL, I_[2], 0.3), 1)); }
  S.fill(rect(-200, 872, 2320, 64), S.start, 0, DS.mix(DS.P.gray[2], N_[2], 0.55), 1);
  const dl = []; for (let x = -160; x < 2100; x += 150) dl.push(rect(x, 900, 74, 7)); S.fill(dl.join(" "), S.start, 0, DS.c("yellow", 1), 0.6);
  if (n === 7) lamp(S, 1000, 874, 330);
  bsign(S, 330, 940, n, { t: o.st });
  car(S, 1390, 930, 0.85);
  const F = dave(S, 820, 960, "near", Object.assign({ mood: "wow", look: -4 }, o.dave || {}));
  return { F };
};
// a constellation: bright stars joined by faint lines (the lines fade in at o.lt)
const constel = (S, pts, edges, o = {}) => { const g = S.grp(); pts.forEach(([x, y, r]) => spark(S, x, y, r || 2.6, { parent: g, t: o.t, halo: false })); S.draw(edges.map(([a, b]) => `M${pts[a][0]} ${pts[a][1]} L${pts[b][0]} ${pts[b][1]}`).join(" "), o.lt ?? o.t ?? S.start, 0, { c: DS.c("sky", 1), w: DS.w.detail, op: 0.6, parent: g }); return g; };
const PLOUGH = [[[1180, 200], [1290, 230], [1380, 270], [1470, 330], [1500, 440], [1640, 450], [1650, 340]], [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 3]]];
const ORION = [[[520, 210], [700, 230], [580, 340, 2], [620, 352, 2], [660, 364, 2], [520, 480], [720, 470]], [[0, 2], [1, 4], [2, 3], [3, 4], [2, 5], [4, 6]]];

// ---------- Mesopotamia ----------
const scribe = (S, x, gy, o = {}) => { const F = person(S, x, gy, o.layer || "near", o.i ?? 0, Object.assign({ pose: "point", armL: [[-30, 46], [-62, 66]], outfitC: DS.c("earth", 0, o.layer || "near"), mood: "flat", look: 6 }, o)); const [hx, hy] = F.hand("L"); tablet(S, hx - 16 * F.s, hy - 6 * F.s, 60 * F.s, 74 * F.s, { t: o.t, rows: 2, blank: true }); return F; };
const crescent = (S, cx, cy, r, o = {}) => S.fill(`M${cx} ${cy - r} A${r} ${r} 0 1 0 ${cx} ${cy + r} A${r * 0.72} ${r} 0 1 1 ${cx} ${cy - r} Z`, o.t ?? S.start, 0, o.c || DS.c("yellow", 1), 1, o.parent);
const puff = (S, cx, cy, k, t, o = {}) => { const g = S.grp(o.parent); [[0, 0, 40], [-34, 10, 28], [34, 12, 30], [-10, -26, 26], [18, -22, 24]].forEach(([dx, dy, r]) => S.fill(circ(cx + dx * k, cy + dy * k, r * k), t ?? S.start, 0, o.c || DS.c("gray", 1), o.op ?? 1, g)); return g; };
const barley = (S, x, y, k = 1, o = {}) => {
  const g = S.grp(o.parent), T = o.t ?? S.start;
  S.draw(smooth([[x, y + 120 * k], [x + 6 * k, y + 40 * k], [x + 2 * k, y - 60 * k]]), T, 0, { c: DS.c("gold", 2), w: DS.w.mid, parent: g });
  for (let i = 0; i < 6; i++) [-1, 1].forEach((sd) => { const yy = y - 50 * k + i * 16 * k; DS.shape(S, circ(x + sd * 12 * k, yy, 9 * k, 14 * k), "gold", { t: o.t, parent: g, w: "hair" }); S.draw(line([x + sd * 16 * k, yy - 10 * k], [x + sd * 34 * k, yy - 40 * k], 0), T, 0, { c: DS.c("gold", 2), w: DS.w.hair, parent: g }); });
  return g;
};
// a ram: the sheep plus curled horns
const ram = (S, cx, cy, k = 1, o = {}) => { const g = sheep(S, cx, cy, k, o); S.draw(smooth([[cx - 60 * k, cy - 34 * k], [cx - 40 * k, cy - 58 * k], [cx - 14 * k, cy - 46 * k], [cx - 16 * k, cy - 20 * k], [cx - 38 * k, cy - 18 * k], [cx - 40 * k, cy - 34 * k]]), o.t ?? S.start, 0, { c: DS.c("brown", 1), w: DS.w.near * Math.sqrt(k), parent: g }); return g; };
const hoe = (S, x, y, k, o = {}) => { const g = S.grp(o.parent), T = o.t ?? S.start; S.draw(line([x, y + 160 * k], [x, y - 120 * k], 0), T, 0, { c: DS.c("wood", 1), w: DS.w.mid, parent: g }); DS.shape(S, poly([[x, y - 120 * k], [x - 50 * k, y - 104 * k], [x - 46 * k, y - 84 * k], [x, y - 100 * k]], 0) + " Z", "gray", { t: o.t, parent: g, w: "detail" }); return g; };
// zodiac wheel: the Sun's and Moon's path as a ring, split into twelve equal signs at o.seg
const zodiac = (S, cx, cy, r, o = {}) => {
  const g = S.grp(), t = o.t, T = t ?? S.start, ri = r * 0.7;
  S.draw(circ(cx, cy, (r + ri) / 2), T, 0, { c: DS.mix(N_[0], NI_[1], 0.5), w: r - ri, parent: g, op: 0.9 });
  S.draw(circ(cx, cy, r) + " " + circ(cx, cy, ri), T, 0, { c: DS.c("gold", 1), w: DS.w.mid, parent: g });
  const segs = []; for (let i = 0; i < 12; i++) { const a = (i / 12) * Math.PI * 2 - Math.PI / 2; segs.push(`M${f1(cx + Math.cos(a) * ri)} ${f1(cy + Math.sin(a) * ri)} L${f1(cx + Math.cos(a) * r)} ${f1(cy + Math.sin(a) * r)}`); }
  S.draw(segs.join(" "), o.seg ?? T, 0, { c: DS.c("gold", 1), w: DS.w.mid, parent: g });
  const sa = -0.35 * Math.PI, ma = 0.62 * Math.PI, mr = (r + ri) / 2;
  if (o.sun !== false) { S.fill(circ(cx + Math.cos(sa) * mr, cy + Math.sin(sa) * mr, (r - ri) * 0.32), o.st ?? T, 0, DS.c("yellow", 1), 1, g); S.draw(rays(cx + Math.cos(sa) * mr, cy + Math.sin(sa) * mr, (r - ri) * 0.38, (r - ri) * 0.48, 10), o.st ?? T, 0, { c: DS.c("yellow", 1), w: DS.w.detail, parent: g }); crescent(S, cx + Math.cos(ma) * mr, cy + Math.sin(ma) * mr, (r - ri) * 0.3, { t: o.mt ?? o.st ?? t, parent: g, c: DS.P.white[0] }); }
  if (o.hi !== undefined) { const a0 = (o.hi / 12) * 360 - 90, a1 = a0 + 30; S.draw(smooth(arcPts(cx, cy, r + 14, a0, a1, 10)) + " " + smooth(arcPts(cx, cy, ri - 14, a0, a1, 10)), o.hiT ?? T, 0, { c: DS.c("red", 1), w: DS.w.near, parent: g }); }
  return { g, seg: (i) => { const a = ((i + 0.5) / 12) * Math.PI * 2 - Math.PI / 2; return [cx + Math.cos(a) * (r + ri) / 2, cy + Math.sin(a) * (r + ri) / 2]; } };
};
const KRAFT = { hy: 1400, sky: "sand", sun: false }; // history / archaeology board
const shelf = (S, x, y, w) => { DS.shadow(S, x + w / 2, y + 30, w); DS.shape(S, rrect(x, y, w, 30, DS.r.xs), "wood", {}); };

// ---------- Egypt ----------
const DAWN = { hy: 1400, sky: "dusk", sun: false };
const desert = (S, hz, o = {}) => { const c = o.c || SIL; S.fill(smooth([[-200, hz + 10], [500, hz - 10], [1100, hz + 14], [1700, hz - 4], [2120, hz + 10]]) + " L2120 1280 L-200 1280 Z", S.start, 0, c, 1); };
const nile = (S, y, o = {}) => { const g = S.grp(); S.fill(smooth([[-200, y], [400, y - 20], [900, y + 10], [1400, y - 16], [2120, y + 6]]) + ` L2120 ${y + 70} L-200 ${y + 80} Z`, o.t ?? S.start, 0, DS.mix(DS.c("blue"), N_[2], o.night ? 0.5 : 0.2), 1, g); S.draw(line([300, y + 30], [520, y + 26], 0) + line([1100, y + 40], [1380, y + 34], 0), o.t ?? S.start, 0, { c: DS.P.white[0], w: DS.w.detail, op: 0.35, parent: g }); return g; };
const sirius = (S, x, y, k = 1, o = {}) => spark(S, x, y, 5 * k, Object.assign({ c: DS.mix(DS.P.white[0], DS.P.sky[1], 0.5), tw: true }, o));
const crown = (S, cx, cy, k, o = {}) => DS.shape(S, `M${cx - 22 * k} ${cy} Q${cx - 30 * k} ${cy - 50 * k} ${cx - 12 * k} ${cy - 78 * k} Q${cx} ${cy - 98 * k} ${cx + 12 * k} ${cy - 78 * k} Q${cx + 30 * k} ${cy - 50 * k} ${cx + 22 * k} ${cy} Z`, "white", { t: o.t, parent: o.parent, w: "detail" });
// diagonal star table: columns of twelve hours, star signs stepping down the diagonal
const starTable = (S, x, y, w, h, o = {}) => {
  const g = S.grp(o.parent), t = o.t, T = t ?? S.start, cols = o.cols || 12, rows = 12, cw = w / cols, rh = (h - 60) / rows;
  DS.shape(S, rect(x, y, w, h), "navy", { t, parent: g, flat: true, tone: 2, w: "detail" });
  DS.shape(S, rect(x, y, w, 60), "gold", { t, parent: g, flat: true, tone: 2, w: "hair" });
  for (let i = 0; i < 6; i++) S.fill(circ(x + 30 + i * (w - 60) / 5, y + 30, 10), T, 0, DS.c("navy", 2), 1, g);
  const gl = []; for (let c = 1; c < cols; c++) gl.push(`M${f1(x + c * cw)} ${y + 60} V${y + h}`); for (let r = 1; r < rows; r++) gl.push(`M${x} ${f1(y + 60 + r * rh)} H${x + w}`);
  S.draw(gl.join(" "), T, 0, { c: DS.c("gold", 1), w: DS.w.hair, op: 0.55, parent: g });
  const st = []; for (let c = 0; c < cols; c++) for (let r = 0; r < rows; r++) if ((c + r) % 3 === 0) [[-0.2, -0.1], [0.15, 0.15], [0.25, -0.2]].forEach(([a, b]) => st.push([x + (c + 0.5 + a) * cw, y + 60 + (r + 0.5 + b) * rh]));
  dots(S, st, Math.max(2, cw * 0.06), DS.c("gold", 1), 1, T, g);
  return g;
};
// circumpolar stars: rings round the pole, turning (none of them reaches the horizon)
const polar = (S, cx, cy, n, o = {}) => {
  const g = S.grp(), T = o.t ?? S.start, rot = S.grp(g);
  for (let i = 1; i <= n; i++) { const r = i * (o.gap || 70), p = S.draw(circ(cx, cy, r), o.rt ?? T, 0, { c: DS.c("sky", 1), w: DS.w.detail, op: 0.45, parent: g }); dash(p, 4, 14); for (let j = 0; j < 2 + i; j++) { const a = H(i * 9 + j, 101) * Math.PI * 2; spark(S, cx + Math.cos(a) * r, cy + Math.sin(a) * r, 2.6, { parent: rot, halo: false, t: o.t }); } }
  spark(S, cx, cy, 3.4, { parent: g, t: o.t });
  spin(rot, o.st ?? S.start, o.sd ?? S.len, 0, o.deg ?? -40, cx, cy, "none");
  return { g, rot };
};

// ===================== 2. The Writing of Heaven =====================
// First stop, the suburbs, a seven. Constellations start to appear.
{ const S = sc(16, 0, { cam: "push", focus: "960 600" }); stop(S, DS.outdoor(S, NIGHT), 7, { st: W(16, 4) });
  constel(S, ...PLOUGH, { t: W(16, 6), lt: W(16, 7) }); constel(S, ...ORION, { t: W(16, 6), lt: W(16, 8) });
  DS.card(S, "STOP 1: THE SUBURBS", 960, 140, { size: DS.type.body, t: W(16, 0) });
  DS.vignette(S, 0.1); }

// Three thousand years ago, Mesopotamian scribes pressed this sky into clay:
{ const S = sc(17, 0, { cam: "push", focus: "800 600" }); sky(S, DS.outdoor(S, NIGHT), { b: 1, hz: 800, mw: 0.5, from: [-200, 140], to: [2120, 560] });
  desert(S, 800); ziggurat(S, 1450, 812, 1.1);
  constel(S, ...ORION, { lt: W(17, 7) });
  DS.shape(S, rect(-60, 870, 1100, 260), "earth", { tone: 2, flat: true, w: "mid" });
  scribe(S, 640, 880, { s: 1.15, look: 6, t: S.start });
  DS.card(S, "3,000 YEARS AGO", 520, 150, { size: DS.type.body, t: W(17, 0), tc: "red" });
  DS.card(S, "MESOPOTAMIAN SCRIBES", 1320, 150, { size: DS.type.small, t: W(17, 4) });
  DS.vignette(S, 0.1); }

// sixty-six stars and constellations, in a list called Mul Apin.
{ const S = sc(18, 0, { cam: "push", focus: "960 560" }); DS.outdoor(S, KRAFT);
  const T = tablet(S, 960, 560, 560, 600, { seed: 3, stars: [[0.2, 0.18], [0.5, 0.18], [0.8, 0.18], [0.35, 0.5], [0.65, 0.5], [0.2, 0.82], [0.8, 0.82]] });
  DS.card(S, "66 STARS AND CONSTELLATIONS", 960, 150, { size: DS.type.body, t: W(18, 0) });
  DS.card(S, "MUL.APIN", 1520, 820, { size: DS.type.title, t: W(18, 8), tc: "blue" });
  DS.vignette(S, 0.12); }

// And what did they think the stars were? / Messages from the gods. Scribes even called the starry sky the writing of heaven.
{ const S = sc(19, 0, { cam: "push", focus: "700 420" }); sky(S, DS.outdoor(S, NIGHT), { b: 1, hz: 820, mw: 0.45, from: [-200, 140], to: [2120, 560] });
  desert(S, 820); ziggurat(S, 1600, 832, 0.8);
  const WG = []; for (let i = 0; i < 9; i++) { const x = 200 + (i % 5) * 230 + (i > 4 ? 110 : 0), y = 250 + Math.floor(i / 5) * 190; WG.push([x, y]); }
  WG.forEach(([x, y], i) => { const g = S.grp(); [[0, 0], [30, 14], [0, 28], [26, 14], [70, 14]].forEach(([dx, dy]) => spark(S, x + dx, y + dy, 2.4, { parent: g, halo: false })); S.draw(`M${x} ${y} L${x + 30} ${y + 14} L${x} ${y + 28} Z M${x + 26} ${y + 14} H${x + 70}`, W(20, 4) + i * 0.08, 0, { c: DS.c("gold", 1), w: DS.w.detail, parent: g, op: 0.85 }); });
  S.text("?", 1150, 560, { size: DS.type.display, t: W(19, 1), c: DS.P.white[0] });
  scribe(S, 1000, 930, { s: 1.0, look: 4, mood: "wow" });
  DS.card(S, "MESSAGES FROM THE GODS", 600, 120, { size: DS.type.body, t: W(20, 0) });
  DS.card(S, "THE WRITING OF HEAVEN", 470, 660, { size: DS.type.body, t: W(20, 11), tc: "blue" });
  notebook(S, 1340, 660, [["WRITING", W(20, 11)]], { size: DS.type.caption, wd: 440, t: W(20, 11) });
  DS.vignette(S, 0.1); }

// So they wrote the sky a manual: / about seven thousand omens, on some seventy clay tablets.
{ const S = sc(21, 0, { cam: "pull", focus: "960 560" }); DS.outdoor(S, KRAFT);
  for (let r = 0; r < 5; r++) { shelf(S, 330, 470 + r * 104, 1260); for (let c = 0; c < 14; c++) { const i = r * 14 + c; tablet(S, 384 + c * 89, 432 + r * 104, 70, 72, { t: W(22, 4) + i * 0.02, rows: 2, seed: i }); } }
  tablet(S, 960, 250, 230, 170, { t: W(21, 6), seed: 9, rows: 3 });
  DS.card(S, "THE SKY MANUAL", 960, 100, { size: DS.type.body, t: W(21, 6) });
  DS.card(S, "ABOUT 7,000 OMENS", 450, 250, { size: DS.type.small, t: W(22, 1), tc: "red" });
  DS.card(S, "SOME 70 TABLETS", 1480, 250, { size: DS.type.small, t: W(22, 6) });
  DS.vignette(S, 0.12); }

// For about six hundred years, astronomers in Babylon kept nightly diaries.
{ const S = sc(23, 0, { cam: "push", focus: "800 600" }); sky(S, DS.outdoor(S, NIGHT), { b: 1, hz: 820, mw: 0.45, from: [-200, 300], to: [2120, 100] });
  desert(S, 820); ziggurat(S, 1500, 832, 1.0);
  DS.shape(S, rect(-60, 880, 1200, 260), "earth", { tone: 2, flat: true, w: "mid" });
  scribe(S, 520, 890, { s: 1.1, look: 6, i: 1 });
  for (let i = 0; i < 6; i++) tablet(S, 820 + (i % 3) * 96, 840 - Math.floor(i / 3) * 74, 84, 66, { t: W(23, 9) + i * 0.12, rows: 2, seed: i + 20 });
  DS.card(S, "ABOUT 600 YEARS", 560, 150, { size: DS.type.body, t: W(23, 2), tc: "red" });
  DS.card(S, "NIGHTLY DIARIES", 1300, 150, { size: DS.type.body, t: W(23, 9) });
  DS.vignette(S, 0.1); }

// The Moon, the planets, the weather, / and also the price of barley.
{ const S = sc(24, 0, { cam: "push", focus: "960 540" }); DS.outdoor(S, KRAFT);
  tablet(S, 960, 560, 900, 680, { blank: true });
  [[W(24, 1), "THE MOON"], [W(24, 3), "THE PLANETS"], [W(24, 5), "THE WEATHER"], [W(25, 3), "THE PRICE OF BARLEY"]].forEach(([t, s], i) => {
    const y = 330 + i * 150; S.draw(line([560, y + 70], [1360, y + 70], 0), S.start, 0, { c: DS.c("earth", 2), w: DS.w.detail, op: 0.6 });
    if (i === 0) crescent(S, 640, y, 44, { t, c: DS.c("earth", 2) });
    if (i === 1) [[600, 0], [650, 20], [700, -10]].forEach(([x, dy]) => S.fill(circ(x, y + dy, 14), t, 0, DS.c("earth", 2), 1));
    if (i === 2) puff(S, 646, y + 6, 1, t, { c: DS.c("earth", 2) });
    if (i === 3) barley(S, 646, y - 20, 0.7, { t });
    txt(S, s, 760, y + 20, { t, size: DS.type.small, anchor: "start", c: i === 3 ? DS.c("red", 2) : DS.c("brown", 2) });
  });
  DS.vignette(S, 0.12); }

// The diaries never say why. Probably in case the sky was moving the market.
{ const S = sc(26, 0, { cam: "push", focus: "1000 560" }); DS.outdoor(S, KRAFT);
  const T = tablet(S, 960, 580, 1040, 560, { blank: true });
  S.draw(`M${T.x + 90} ${T.y + 60} V${T.y + T.h - 70} H${T.x + T.w - 60}`, S.start, 0, { c: DS.c("brown", 2), w: DS.w.mid });
  const P = [[0, 0.7], [0.12, 0.5], [0.24, 0.62], [0.36, 0.3], [0.5, 0.45], [0.62, 0.2], [0.76, 0.5], [0.9, 0.28]].map(([a, b]) => [T.x + 110 + a * (T.w - 200), T.y + 80 + b * (T.h - 180)]);
  S.draw(poly(P, 0), W(26, 5), 0, { c: DS.c("red"), w: DS.w.near });
  [1, 3, 5, 7].forEach((i) => { const [x, y] = P[i]; const p = S.draw(line([x, y - 26], [x, T.y + 34], 0), W(26, 9), 0, { c: DS.c("brown", 1), w: DS.w.detail }); dash(p, 6, 10); jupiter(S, x, T.y + 34, 9, { t: W(26, 9) }); });
  barley(S, T.x + 50, T.y + T.h - 170, 0.6);
  DS.card(S, "NEVER SAY WHY", 420, 140, { size: DS.type.body, t: W(26, 2) });
  DS.card(S, "THE SKY MOVING THE MARKET?", 1260, 140, { size: DS.type.small, t: W(26, 11), tc: "red" });
  DS.vignette(S, 0.12); }

// They called the planets wild sheep, maybe because they wander off.
{ const S = sc(27, 0, { cam: "push", focus: "960 480" }); sky(S, DS.outdoor(S, NIGHT), { b: 1, hz: 860, mw: 0.4, from: [-200, 700], to: [2120, 200] });
  desert(S, 860);
  const path = smooth([[300, 520], [600, 430], [820, 400], [900, 470], [820, 520], [760, 450], [1000, 380], [1300, 330], [1600, 300]]), pp = S.draw(path, W(27, 3), 0, { c: DS.c("gold", 1), w: DS.w.mid, op: 0.7 }); dash(pp, 6, 16);
  jupiter(S, 1600, 300, 7, { t: W(27, 3) });
  const sh = sheep(S, 1240, 520, 1.1, { t: W(27, 4) }); S.move(sh, W(27, 4), S.end - W(27, 4), { x: 160, y: -40 }, "none");
  DS.card(S, "WILD SHEEP", 600, 160, { size: DS.type.title, t: W(27, 4) });
  DS.card(S, "THEY WANDER OFF", 1380, 760, { size: DS.type.small, t: W(27, 9) });
  DS.vignette(S, 0.1); }

// And the brightest of Dave's stars is Jupiter. / So his sky is now two stars, a wild sheep, and a plane.
{ const S = sc(28, 0, { cam: "push", focus: "1000 360" }); sky(S, DS.outdoor(S, NIGHT), { b: 9, hz: 900 });
  city(S, 960, { h: 160 }); roof(S, 990, { ac: false, aerial: false });
  jupiter(S, ...DSTARS.J, 6); spark(S, ...DSTARS.s1, 3, { tw: true }); spark(S, ...DSTARS.s2, 3, { tw: true });
  plane(S, 1560, 470, 1.2, { dx: 90, dy: -10 });
  S.draw(circ(...DSTARS.J, 46), W(28, 7), 0, { c: DS.c("gold", 1), w: DS.w.mid });
  DS.card(S, "JUPITER", DSTARS.J[0], 380, { size: DS.type.body, t: W(28, 7) });
  sheep(S, DSTARS.J[0] + 170, DSTARS.J[1] + 10, 0.6, { t: W(29, 8) });
  note(S, NOTE1, { out: W(29, 5) }); note(S, NOTE2, { t: W(29, 5) });
  DS.card(S, "DAVE'S BRIGHTEST STAR", 640, 620, { size: DS.type.small, t: W(28, 2) });
  DS.vignette(S, 0.1); }

// But the gods never wrote back. The watching paid off anyway, because repeats can be calculated.
{ const S = sc(30, 0, { cam: "push", focus: "960 560" }); DS.outdoor(S, KRAFT);
  shelf(S, 160, 760, 600); for (let i = 0; i < 6; i++) tablet(S, 240 + i * 90, 700 - (i % 2) * 6, 80, 100, { rows: 3, seed: i + 40 });
  txt(S, "SENT TO THE GODS", 460, 840, { size: DS.type.small, c: DS.c("brown", 2) });
  DS.shape(S, rrect(260, 360, 400, 200, DS.r.md), "wood", { tone: 1, w: "mid" }); DS.shape(S, rrect(290, 390, 340, 140, DS.r.sm), "wood", { tone: 2, flat: true, w: "detail" });
  txt(S, "REPLIES: 0", 460, 320, { size: DS.type.small, t: W(30, 3), c: DS.c("red", 2) });
  const T = tablet(S, 1340, 560, 720, 520, { blank: true });
  const wv = []; for (let i = 0; i <= 60; i++) wv.push([T.x + 60 + i * (T.w - 120) / 60, T.y + 170 + Math.sin(i / 60 * Math.PI * 6) * 80]); S.draw(smooth(wv), W(30, 12), 0, { c: DS.c("red", 2), w: DS.w.near });
  for (let i = 0; i < 3; i++) tick(S, T.x + 60 + ((0.5 + i * 2) / 6) * (T.w - 120) * 1.0 + 30, T.y + 330, 1.2, W(30, 13) + i * 0.2);
  tablet(S, T.x + T.w / 2, T.y + T.h - 110, T.w - 80, 150, { rows: 3, seed: 7, t: W(30, 13) });
  DS.card(S, "NO REPLY", 460, 200, { size: DS.type.body, t: W(30, 3), tc: "red" });
  DS.card(S, "REPEATS CAN BE CALCULATED", 1340, 200, { size: DS.type.small, t: W(30, 12) });
  DS.vignette(S, 0.12); }

// About four hundred years before Christ, they split the path of the Sun and Moon into twelve equal signs. The zodiac.
{ const S = sc(31, 0, { cam: "zoom", focus: "960 560" }); sky(S, DS.outdoor(S, NIGHT), { b: 1, hz: 1100, th: 0.4 });
  zodiac(S, 960, 580, 330, { st: W(31, 12), mt: W(31, 14), seg: W(31, 16) });
  DS.card(S, "ABOUT 400 BC", 420, 160, { size: DS.type.body, t: W(31, 0), tc: "red" });
  DS.card(S, "12 EQUAL SIGNS", 1500, 160, { size: DS.type.body, t: W(31, 16) });
  DS.card(S, "THE ZODIAC", 960, 580, { size: DS.type.body, t: W(31, 19) });
  DS.vignette(S, 0.1); }

// One sign, Aries, started out as the Hired Man, a farm labourer. / Over the centuries, he turned into a ram.
{ const S = sc(32, 0, { cam: "push", focus: "960 560" }); sky(S, DS.outdoor(S, NIGHT), { b: 1, hz: 1100, th: 0.4 });
  const Z = zodiac(S, 800, 580, 330, { hi: 0, hiT: W(32, 2) });
  const g = S.grp(); const F = person(S, 800, 690, "near", 2, { s: 0.75, pose: "hold", outfitC: DS.c("earth"), parent: g, mood: "flat", look: 4 }); hoe(S, ...F.hand("R").map((v, i) => v + (i ? 0 : 6)), 0.75, { parent: g });
  S.fadeOut(g, W(33, 4), 0.5); ram(S, 800, 600, 1.3, { t: W(33, 4) });
  DS.card(S, "ARIES", Z.seg(0)[0] + 120, Z.seg(0)[1] - 190, { size: DS.type.body, t: W(32, 2), tc: "red" });
  DS.card(S, "THE HIRED MAN", 1480, 420, { size: DS.type.small, t: W(32, 7) });
  DS.card(S, "OVER THE CENTURIES: A RAM", 1480, 780, { size: DS.type.caption, t: W(33, 0) });
  DS.vignette(S, 0.1); }

// ===================== 3. The Star That Brings the Flood =====================
// Second stop, a five. Far more stars now. // In Egypt, Sirius, the brightest star in the night sky,
{ const S = sc(34, 0, { cam: "push", focus: "1200 400" }); stop(S, DS.outdoor(S, NIGHT), 5, { st: W(34, 3) });
  constel(S, ...ORION);
  sirius(S, 1140, 520, 1.2, { t: W(35, 2) }); S.draw(circ(1140, 520, 48), W(35, 2), 0, { c: DS.c("sky", 1), w: DS.w.mid });
  DS.card(S, "STOP 2: FAR MORE STARS", 960, 140, { size: DS.type.body, t: W(34, 4) });
  DS.card(S, "SIRIUS", 1400, 420, { size: DS.type.body, t: W(35, 2), tc: "blue" });
  DS.card(S, "BRIGHTEST STAR IN THE NIGHT SKY", 1380, 640, { size: DS.type.caption, t: W(35, 4) });
  DS.vignette(S, 0.1); }

// vanished into the Sun's glare for about seventy days a year.
{ const S = sc(36, 0, { cam: "push", focus: "1100 700" }); DS.outdoor(S, DAWN);
  S.fill(rect(-200, -200, 2320, 1100), S.start, 0, DS.vgrad(DS.mix(DS.P.dusk[2], N_[0], 0.55), DS.c("orange", 1)), 1);
  S.fill(circ(1100, 800, 700, 420), S.start, 0, glo(DS.c("yellow", 1), 0.9), 1); S.fill(circ(1100, 800, 90), S.start, 0, DS.c("yellow", 1), 1);
  const sg = sirius(S, 1300, 600, 1.0, { tw: false }); S.fadeOut(sg, W(36, 0), 1.2);
  desert(S, 820, { c: DS.mix(DS.P.brown[2], N_[2], 0.3) }); pyramid(S, 520, 830, 0.9, { c: DS.mix(DS.P.brown[2], N_[2], 0.3) });
  DS.card(S, "INTO THE SUN'S GLARE", 520, 160, { size: DS.type.small, t: W(36, 1) });
  DS.card(S, "ABOUT 70 DAYS A YEAR", 1420, 160, { size: DS.type.body, t: W(36, 7), tc: "red" });
  DS.vignette(S, 0.1); }

// Then one morning it rose again just before dawn, / and soon after, the Nile began to flood.
{ const S = sc(37, 0, { cam: "push", focus: "960 600" }); DS.outdoor(S, DAWN);
  S.fill(rect(-200, -200, 2320, 1100), S.start, 0, vgrad3([SKYC[2][0], N_[0], DS.mix(DS.P.dusk[2], N_[0], 0.25), DS.c("orange", 1)], [0, 0.4, 0.62, 0.74]), 1);
  field(S, 0.6, 700, { keep: (x, y) => y < 520 });
  const sg = S.grp(); sirius(S, 1260, 760, 1.7, { parent: sg }); S.move(sg, W(37, 4), 1.6, { y: -160 }, "power1.out");
  desert(S, 800); pyramid(S, 520, 812, 0.9); pyramid(S, 840, 812, 0.6); palm(S, 1520, 900, 0.9); palm(S, 1660, 912, 0.7);
  const nl = nile(S, 900, { night: true }); S.move(nl, W(38, 4), 1.4, { y: -60 }, "power2.out");
  DS.card(S, "JUST BEFORE DAWN", 1260, 150, { size: DS.type.body, t: W(37, 6) });
  DS.card(S, "THE NILE FLOODS", 520, 150, { size: DS.type.body, t: W(38, 4), tc: "blue" });
  DS.vignette(S, 0.1); }

// The star didn't cause the flood. It just reliably turned up first.
{ const S = sc(39, 0, { cam: "push", focus: "960 560" }); DS.outdoor(S, DAWN);
  S.fill(rect(-200, -200, 2320, 1100), S.start, 0, vgrad3([SKYC[2][0], N_[0], DS.mix(DS.P.dusk[2], N_[0], 0.25)], [0, 0.5, 0.75]), 1);
  field(S, 0.75, 700);
  desert(S, 840); nile(S, 860, { night: true });
  sirius(S, 560, 420, 1.8);
  const md = S.grp(); S.fadeIn(md, W(39, 9), 0.35); S.draw(line([560, 440], [600, 520], 0), S.start, 0, { c: DS.c("gold", 1), w: DS.w.detail, parent: md });
  [[580, 600, 560, 690, 600, 676], [620, 600, 660, 690, 620, 676]].forEach(([a, b, c, d, e, f]) => DS.shape(S, poly([[a, b], [c, d], [e, f], [a + 20, b]], 0) + " Z", "red", { parent: md, w: "detail" }));
  DS.shape(S, circ(600, 572, 58), "gold", { parent: md }); S.text("1ST", 600, 590, { size: DS.type.small, t: S.start, c: DS.c("brown", 2), parent: md });
  S.arrow(700, 420, 1220, 760, W(39, 2), 0, { c: DS.c("red", 1), w: DS.w.near, bend: -0.15 }); xMark(S, 980, 560, 2, W(39, 3));
  DS.card(S, "DIDN'T CAUSE THE FLOOD", 1320, 150, { size: DS.type.body, t: W(39, 2), tc: "red" });
  DS.card(S, "JUST TURNED UP FIRST", 600, 800, { size: DS.type.small, t: W(39, 9) });
  DS.vignette(S, 0.1); }

// Through each night, twelve star groups called decans rose one by one, marking the hours.
{ const S = sc(40, 0, { cam: "push", focus: "960 500" }); sky(S, DS.outdoor(S, NIGHT), { b: 1, hz: 820, th: 0.6 });
  desert(S, 820); pyramid(S, 1500, 832, 0.8);
  for (let i = 0; i < 12; i++) { const a = Math.PI * (0.95 - i * 0.068), x = 960 + Math.cos(a) * 820, y = 900 - Math.sin(a) * 640, t = W(40, 3) + i * 0.26, g = S.grp(); [[-14, 6], [10, -10], [20, 14]].forEach(([dx, dy]) => spark(S, x + dx, y + dy, 2.6, { parent: g, t, halo: false })); txt(S, String(i + 1), x, y + 56, { t, c: DS.c("gold", 1), parent: g }); }
  DS.card(S, "DECANS", 960, 470, { size: DS.type.title, t: W(40, 7) });
  DS.card(S, "MARKING THE HOURS", 960, 620, { size: DS.type.small, t: W(40, 12) });
  DS.vignette(S, 0.1); }

// A clock you could only read by staying up. // Later, daylight got twelve too. That's one root of your twenty-four-hour day.
{ const S = sc(41, 0, { cam: "push", focus: "960 520" }); sky(S, DS.outdoor(S, NIGHT), { b: 1, hz: 860, th: 0.7 });
  desert(S, 860);
  starClock(S, 480, 400, 200, { turn: 120 });
  const F = person(S, 930, 940, "near", 1, { s: 1.0, pose: "cross", outfitC: DS.c("white", 2), mood: "flat", look: -6 }); F.face(W(41, 7), "tired", -6); S.zzz(1010, 560, W(41, 8), 0.3, { c: DS.P.white[0] });
  const g = S.grp(); S.fadeIn(g, W(42, 1), 0.4);
  DS.shape(S, circ(1450, 400, 200), "navy", { parent: g, flat: true, tone: 2 }); DS.shape(S, `M1450 200 A200 200 0 0 1 1450 600 Z`, "gold", { parent: g, flat: true, tone: 1 });
  for (let i = 0; i < 24; i++) { const a = -Math.PI / 2 + (i / 24) * Math.PI * 2; S.fill(circ(1450 + Math.cos(a) * 165, 400 + Math.sin(a) * 165, 9), S.start, 0, i < 12 ? DS.c("brown", 2) : DS.c("gold", 1), 1, g); }
  wtxt(S, "12 + 12", 1450, 670, { size: DS.type.small, t: W(42, 3) });
  DS.card(S, "ONLY READ BY STAYING UP", 480, 690, { size: DS.type.caption, t: W(41, 4) });
  DS.card(S, "ONE ROOT OF THE 24-HOUR DAY", 1450, 780, { size: DS.type.caption, t: W(42, 7), tc: "blue" });
  DS.vignette(S, 0.1); }

// Some of the oldest star tables, about four thousand years old,
{ const S = sc(43, 0, { cam: "push", focus: "960 560" }); DS.outdoor(S, KRAFT);
  starTable(S, 460, 300, 1000, 560);
  DS.card(S, "STAR TABLES", 470, 170, { size: DS.type.body, t: W(43, 4) });
  DS.card(S, "ABOUT 4,000 YEARS OLD", 1350, 170, { size: DS.type.body, t: W(43, 7), tc: "red" });
  DS.vignette(S, 0.12); }

// are painted on the inside of coffin lids. / Whoever was inside had the best view in the house.
{ const S = sc(44, 0, { cam: "push", focus: "960 600" }); DS.room(S, { wall: "sand", floor: "earth", window: false });
  DS.shadow(S, 960, 900, 980);
  const lid = S.grp(); starTable(S, 520, 230, 880, 420, { cols: 10, parent: lid }); DS.shape(S, rect(510, 222, 900, 436), "wood", { parent: lid, flat: true, tone: 2, w: "mid" }); S.g.appendChild(lid); lid.insertBefore(lid.lastChild, lid.firstChild);
  [[540, 640], [1380, 640]].forEach(([x, y]) => S.draw(line([x, y], [x + (x < 960 ? -20 : 20), 700], 0), S.start, 0, { c: DS.c("wood", 2), w: DS.w.near }));
  DS.shape(S, rect(470, 690, 980, 210), "wood", { dir: "v" }); DS.shape(S, rect(470, 690, 980, 30), "wood", { tone: 1, flat: true, w: "detail" });
  [560, 760, 1160, 1360].forEach((x) => DS.shape(S, rect(x, 740, 40, 130), "gold", { flat: true, tone: 2, w: "hair" }));
  DS.card(S, "INSIDE COFFIN LIDS", 960, 120, { size: DS.type.body, t: W(44, 4) });
  DS.card(S, "BEST VIEW IN THE HOUSE", 1500, 860, { size: DS.type.small, t: W(45, 4), tc: "blue" });
  S.arrow(1300, 820, 1140, 640, W(45, 4), 0, { c: DS.c("blue", 2), w: DS.w.near, bend: 0.2 });
  DS.vignette(S, 0.12); }

// And in the Pyramid Texts, a dead king rises to become a star, / among the imperishable ones, probably those that never set.
{ const S = sc(46, 0, { cam: "push", focus: "960 420" }); sky(S, DS.outdoor(S, NIGHT), { b: 1, hz: 860, th: 0.55 });
  const P = polar(S, 960, 250, 4, { gap: 80, rt: W(47, 2), deg: -30 });
  desert(S, 860); pyramid(S, 960, 872, 1.2, { c: DS.mix(SIL, N_[0], 0.5) });
  const K = S.grp(); const F = person(S, 960, 560, "near", 3, { s: 0.6, float: true, outfitC: DS.c("gold"), mood: "smile", look: 0, parent: K }); crown(S, ...F.top().map((v, i) => v + (i ? 8 : 0)), 0.6, { parent: K });
  S.move(K, W(46, 8), 1.4, { y: -190 }, "power1.inOut"); S.fadeOut(K, W(46, 11), 0.4);
  spark(S, 960 + 160, 250 + 40 * 0, 4.2, { t: W(46, 11) });
  DS.card(S, "THE PYRAMID TEXTS", 480, 150, { size: DS.type.body, t: W(46, 3) });
  DS.card(S, "THE IMPERISHABLE ONES", 1440, 560, { size: DS.type.small, t: W(47, 2), tc: "blue" });
  DS.card(S, "NEVER SET", 1440, 680, { size: DS.type.small, t: W(47, 7) });
  DS.vignette(S, 0.1); }

// Stars that never set, for a king who never planned to die. / The best address in the sky.
{ const S = sc(48, 0, { cam: "zoom", focus: "960 440" }); sky(S, DS.outdoor(S, NIGHT), { b: 1, hz: 900, th: 0.55 });
  polar(S, 960, 420, 5, { gap: 74, deg: -45 });
  desert(S, 900);
  spark(S, 960 + 148, 420, 4.4, { tw: true }); crown(S, 960 + 148, 404, 0.34);
  const g = S.grp(); S.fadeIn(g, W(49, 1), 0.35);
  DS.shape(S, rrect(1180, 330, 300, 120, DS.r.sm), "navy", { parent: g, flat: true, w: "mid" }); S.draw(rrect(1192, 342, 276, 96, DS.r.xs), S.start, 0, { c: DS.c("gold", 1), w: DS.w.detail, parent: g });
  S.text("NO. 1", 1330, 408, { size: DS.type.body, t: W(49, 1), c: DS.P.white[0], parent: g });
  S.draw(line([1180, 390], [1120, 410], 0), S.start, 0, { c: DS.c("gold", 1), w: DS.w.mid, parent: g });
  DS.card(S, "A KING WHO NEVER PLANNED TO DIE", 960, 130, { size: DS.type.small, t: W(48, 4) });
  DS.card(S, "THE BEST ADDRESS IN THE SKY", 960, 820, { size: DS.type.body, t: W(49, 1), tc: "blue" });
  DS.vignette(S, 0.1); }

// ---------- the Emu chapter ----------
// the Emu sky: a big diagonal band with the emu's dust lanes; o.rim = time the gold ring outline appears
const EMUSKY = { from: [-200, 80], to: [2120, 980], wd: 170, bulge: 0.52, emuAt: [0.5, 80, 1.0] };
const emuSky = (S, O, o = {}) => { const opt = Object.assign({ b: 1, hz: 1200, mw: 1, emu: "run" }, EMUSKY, o); sky(S, O, opt); return opt.E; };
const emuBird = (S, x, gy, k = 1, o = {}) => {
  const g = S.grp(o.parent), t = o.t, T = t ?? S.start, by = o.sit ? gy - 56 * k : gy - 150 * k, lw = DS.w.near * Math.sqrt(k), body = DS.c("brown", 1), lc = DS.c("ink");
  DS.shadow(S, x, gy, 220 * k, { t, parent: g });
  if (!o.sit) [[-14, -38, 0], [22, 34, 1]].forEach(([a, b]) => { S.draw(smooth([[x + a * k, by + 40 * k], [x + (a + b) * 0.6 * k, by + 100 * k], [x + b * k, gy]]), T, 0, { c: lc, w: lw, parent: g }); S.draw(line([x + b * k - 22 * k, gy], [x + b * k + 14 * k, gy], 0), T, 0, { c: lc, w: lw, parent: g }); });
  S.draw(smooth([[x - 58 * k, by - 18 * k], [x - 92 * k, by - 96 * k], [x - 84 * k, by - 164 * k]]), T, 0, { c: lc, w: lw * 2.6, parent: g });
  S.draw(smooth([[x - 58 * k, by - 18 * k], [x - 92 * k, by - 96 * k], [x - 84 * k, by - 164 * k]]), T, 0, { c: DS.c("gray", 2), w: lw * 1.6, parent: g });
  DS.shape(S, blob([[x - 80 * k, by - 10 * k], [x - 30 * k, by - 54 * k], [x + 50 * k, by - 50 * k], [x + 96 * k, by + 4 * k], [x + 80 * k, by + 44 * k], [x, by + 52 * k], [x - 70 * k, by + 34 * k]]), "brown", { t, parent: g, tone: 1 });
  S.draw([0, 1, 2, 3, 4].map((i) => `M${f1(x + (-40 + i * 26) * k)} ${f1(by - 20 * k)} q${f1(10 * k)} ${f1(30 * k)} ${f1(24 * k)} ${f1(46 * k)}`).join(" "), T, 0, { c: DS.c("brown", 2), w: DS.w.detail, parent: g });
  DS.shape(S, circ(x - 84 * k, by - 176 * k, 20 * k, 17 * k), "gray", { t, parent: g, w: "detail", tone: 2 });
  DS.shape(S, poly([[x - 100 * k, by - 180 * k], [x - 128 * k, by - 172 * k], [x - 100 * k, by - 166 * k]], 0) + " Z", "earth", { t, parent: g, w: "hair" });
  S.fill(circ(x - 90 * k, by - 180 * k, 4 * k), T, 0, DS.P.ink[0], 1, g);
  return g;
};
const egg = (S, x, y, k = 1, o = {}) => DS.shape(S, circ(x, y, 22 * k, 29 * k), "green", { t: o.t, parent: o.parent, tone: 2, w: "detail" });
const chick = (S, x, gy, k = 1, o = {}) => {
  const g = S.grp(o.parent), t = o.t, T = t ?? S.start;
  [[-8, -14], [8, 14]].forEach(([a, b]) => S.draw(line([x + a * k, gy - 30 * k], [x + b * k, gy], 0), T, 0, { c: DS.c("ink"), w: DS.w.detail, parent: g }));
  DS.shape(S, circ(x, gy - 52 * k, 34 * k, 26 * k), "sand", { t, parent: g, w: "detail" });
  S.draw([-14, 0, 14].map((d) => `M${f1(x + d * k - 8 * k)} ${f1(gy - 74 * k)} L${f1(x + d * k + 4 * k)} ${f1(gy - 30 * k)}`).join(" "), T, 0, { c: DS.c("brown", 1), w: DS.w.detail, parent: g });
  DS.shape(S, circ(x - 34 * k, gy - 82 * k, 16 * k), "sand", { t, parent: g, w: "detail" }); S.fill(circ(x - 40 * k, gy - 84 * k, 3 * k), T, 0, DS.P.ink[0], 1, g);
  S.fill(poly([[x - 48 * k, gy - 84 * k], [x - 62 * k, gy - 80 * k], [x - 48 * k, gy - 76 * k]], 0) + " Z", T, 0, DS.c("earth", 2), 1, g);
  return g;
};
const shells = (S, x, y, k = 1, o = {}) => [[-1, 0], [1, 6]].forEach(([sd, dy]) => DS.shape(S, `M${x + sd * 30 * k - 22 * k} ${y + dy} Q${x + sd * 30 * k} ${y + dy + 34 * k} ${x + sd * 30 * k + 22 * k} ${y + dy} L${x + sd * 30 * k + 12 * k} ${y + dy - 10 * k} L${x + sd * 30 * k + 2 * k} ${y + dy + 2} L${x + sd * 30 * k - 8 * k} ${y + dy - 12 * k} Z`, "green", { t: o.t, tone: 2, w: "detail" }));
// a daytime outback panel (rounded, framed) for what happens on the ground
const groundPanel = (S, x, y, w, h, o = {}) => {
  const g = S.grp(), k = clipTo(S.grp(g), rrect(x, y, w, h, DS.r.lg));
  S.fill(rect(x, y, w, h), S.start, 0, DS.vgrad(DS.c("dusk", 1), DS.c("dusk", 0)), 1, k);
  S.fill(smooth([[x - 20, y + h * 0.6], [x + w * 0.4, y + h * 0.55], [x + w + 20, y + h * 0.62]]) + ` L${x + w + 20} ${y + h + 20} L${x - 20} ${y + h + 20} Z`, S.start, 0, DS.vgrad(DS.c("earth", 1), DS.c("earth", 0)), 1, k);
  [[0.15, 0.6], [0.85, 0.62]].forEach(([fx, fy]) => S.fill(blob([[x + w * fx - 50, y + h * fy + 4], [x + w * fx - 20, y + h * fy - 40], [x + w * fx + 30, y + h * fy - 46], [x + w * fx + 56, y + h * fy + 4]]), S.start, 0, DS.c("green", 2, "mid"), 1, k));
  S.draw(rrect(x, y, w, h, DS.r.lg), S.start, 0, { c: DS.P.white[0], w: DS.w.mid, parent: g });
  return { g, k, gy: y + h * 0.84 };
};
// Australia (simplified coast from lon/lat), centred at 133 E 26 S
const AUS = [[142.5, -10.7], [141.5, -13], [141.6, -15.5], [140.8, -17.5], [139.5, -17.5], [137.8, -16], [136.5, -15], [135.5, -14.8], [136.8, -12.2], [135, -12.2], [132.5, -11.2], [131, -12.2], [130.3, -13], [129.5, -15], [128, -15], [126.5, -14], [125, -15], [123.5, -16.5], [122.2, -18], [121, -19.5], [119, -20], [116.5, -20.8], [114.6, -21.8], [113.5, -23.5], [113.5, -25.5], [114.2, -26.5], [114.8, -29], [115.2, -31.5], [115.6, -33.4], [115, -34.3], [116.5, -35], [118, -35], [120, -33.9], [123.5, -33.9], [126, -32.3], [129, -31.7], [131.5, -31.5], [133.5, -32.2], [135.2, -34.6], [136.2, -33.7], [137.5, -33], [137.8, -34.5], [138.5, -35.6], [139.5, -36.5], [140.5, -38], [142, -38.4], [143.5, -38.8], [144.8, -38.2], [146.4, -39.1], [147.5, -38.2], [149.5, -37.6], [150, -37.5], [150.2, -36], [150.8, -34.5], [151.3, -33.8], [152.5, -32], [153.6, -28.6], [153.2, -26.5], [153.1, -25], [151.8, -24], [150.8, -22.5], [149.5, -22.3], [148.7, -20.5], [147.5, -19.5], [146.3, -19], [145.8, -17], [145.3, -15], [144.4, -14.3], [143.6, -13.8], [143.4, -12.3]];
const TAS = [[144.6, -40.7], [146.6, -41.1], [148.3, -40.9], [148.2, -42.2], [147.8, -43.2], [146.8, -43.6], [145.8, -43.3], [145.2, -42.2]];
const australia = (S, cx, cy, k, o = {}) => {
  const g = S.grp(), M = ([lo, la]) => [cx + (lo - 133) * k, cy + (-la - 26) * k], T = o.t ?? S.start;
  if (o.old !== undefined) { const sc2 = (p, f) => p.map(([x, y]) => [cx + (x - cx) * f, cy + (y - cy) * f]); const op = poly(sc2(AUS.map(M), 1.07), 0) + " Z"; g.oldLand = S.fill(op, o.oldFill ?? T, 0, DS.c("sand", 1), 1, g); const p = S.draw(op, o.old, 0, { c: DS.c("blue", 2), w: DS.w.mid, parent: g }); dash(p, 14, 10); }
  DS.shape(S, smooth([...AUS.map(M), M(AUS[0])]) + " Z", "earth", { t: o.t, parent: g });
  DS.shape(S, smooth([...TAS.map(M), M(TAS[0])]) + " Z", "earth", { t: o.t, parent: g, w: "detail" });
  if (o.dots !== undefined) [0, 4, 8, 12, 15, 18, 21, 24, 27, 30, 34, 38, 41, 45, 48, 51, 54, 57, 60, 63, 66].forEach((i, j) => { const [x, y] = M(AUS[i]); S.fill(circ(x, y, 9), o.dots + j * 0.05, 0, DS.c("red"), 1, g); });
  return { g, M };
};
const balance = (S, cx, base, o = {}) => {
  const top = base - 420, g = S.grp(), beam = S.grp(g), arm = 340;
  DS.shadow(S, cx, base, 320, { parent: g });
  DS.shape(S, poly([[cx - 140, base], [cx - 60, base - 50], [cx + 60, base - 50], [cx + 140, base]], 0) + " Z", "wood", { parent: g });
  DS.shape(S, rect(cx - 14, top, 28, base - 50 - top), "wood", { parent: g, dir: "h" });
  DS.shape(S, rrect(cx - arm - 20, top - 14, arm * 2 + 40, 28, DS.r.xs), "gold", { parent: beam });
  const pans = [-1, 1].map((sd) => { const px = cx + sd * arm, pg = S.grp(beam); S.draw(line([px, top], [px - 90, top + 200], 0) + line([px, top], [px + 90, top + 200], 0), S.start, 0, { c: DS.c("gray", 2), w: DS.w.detail, parent: pg }); DS.shape(S, `M${px - 120} ${top + 200} Q${px} ${top + 270} ${px + 120} ${top + 200} Z`, "gold", { parent: pg, tone: 1 }); return [px, top + 190]; });
  DS.shape(S, circ(cx, top, 20), "gold", { parent: g, tone: 2 });
  if (o.tip) tl.fromTo(beam, { attr: { transform: `rotate(${o.tip[2]} ${cx} ${top})` } }, { attr: { transform: `rotate(0 ${cx} ${top})` }, duration: o.tip[1], ease: "elastic.out(1, 0.5)" }, o.tip[0]);
  return { pans, beam };
};

// ===================== 4. The Emu Made of Darkness =====================
// Those answers came from bright stars. / On the far side of the world, people read the dark.
{ const S = sc(50, 0, { cam: "push", focus: "1300 520" }); const E = emuSky(S, DS.outdoor(S, NIGHT), { emuAt: [0.62, 30, 0.85], emuK: 0.7 });
  S.fill(rect(-200, -200, 1100, 1480), S.start, 0, hgrad([[0, SKYC[1][0], 1], [0.7, SKYC[1][0], 0.95], [1, SKYC[1][0], 0]]), 1);
  [[180, 300, 4], [420, 220, 3.6], [640, 380, 4.4], [300, 520, 3.4], [560, 600, 3.8], [760, 260, 3.4]].forEach(([x, y, r]) => spark(S, x, y, r, { tw: true }));
  notebook(S, 160, 660, [["WRITING", undefined, "tick"], ["CLOCK", undefined, "tick"]], { size: DS.type.caption, wd: 440 });
  DS.card(S, "BRIGHT STARS", 470, 140, { size: DS.type.body, t: W(50, 4) });
  DS.card(S, "PEOPLE READ THE DARK", 1400, 140, { size: DS.type.body, t: W(51, 7), tc: "blue" });
  DS.vignette(S, 0.1); }

// Third stop, a two. For the first time, Dave sees the Milky Way, / streaked with dark lanes of dust.
{ const S = sc(52, 0, { cam: "push", focus: "960 420" }); const R = stop(S, DS.outdoor(S, NIGHT), 2, { st: W(52, 2), sky: { mw: 1, mwT: W(52, 11), emu: "run", emuK: 0.5, from: [-200, 40], to: [2120, 640], wd: 120, emuAt: [0.42, 20, 0.62] }, dave: { mood: "flat", look: -4 } });
  R.F.face(W(52, 9), "wow", -2);
  DS.card(S, "STOP 3: THE MILKY WAY", 520, 140, { size: DS.type.body, t: W(52, 0) });
  DS.card(S, "DARK LANES OF DUST", 1460, 640, { size: DS.type.small, t: W(53, 2) });
  S.arrow(1300, 600, 1080, 470, W(53, 2), 0, { c: DS.c("gold", 1), w: DS.w.near, bend: 0.2 });
  DS.vignette(S, 0.1); }

// Across Australia, many Aboriginal peoples see an emu here, / made not of stars, but of the darkness between them.
{ const S = sc(54, 0, { cam: "zoom", focus: "800 400" }); emuSky(S, DS.outdoor(S, NIGHT), { rim: W(54, 7) });
  DS.card(S, "ACROSS AUSTRALIA", 1420, 140, { size: DS.type.body, t: W(54, 0) });
  DS.card(S, "AN EMU", 420, 700, { size: DS.type.title, t: W(54, 7), tc: "blue" });
  DS.card(S, "MADE OF THE DARKNESS", 1360, 860, { size: DS.type.body, t: W(55, 7) });
  DS.vignette(S, 0.1); }

// Its head is the Coalsack beside the Southern Cross, / and its neck and body run down the dust towards Scorpius.
{ const S = sc(56, 0, { cam: "push", focus: "800 420" }); const E = emuSky(S, DS.outdoor(S, NIGHT), { rim: S.start });
  const [hx, hy] = E.head, [cx, cy] = E.cross[0], [sx, sy] = E.scorpius[4];
  DS.card(S, "HEAD: THE COALSACK", hx + 420, hy - 150, { size: DS.type.small, t: W(56, 4) }); S.arrow(hx + 200, hy - 110, hx + 50, hy - 40, W(56, 4), 0, { c: DS.c("gold", 1), w: DS.w.near, bend: 0.2 });
  DS.card(S, "SOUTHERN CROSS", cx, cy - 90, { size: DS.type.small, t: W(56, 7) });
  DS.card(S, "TOWARDS SCORPIUS", sx + 30, sy - 230, { size: DS.type.small, t: W(57, 10) }); S.arrow(sx + 20, sy - 180, sx + 4, sy - 50, W(57, 10), 0, { c: DS.c("gold", 1), w: DS.w.near, bend: -0.2 });
  DS.vignette(S, 0.1); }

// Most of the world connected the dots. These astronomers drew with the gaps.
{ const S = sc(58, 0, { cam: "push", focus: "960 540" }); sky(S, DS.outdoor(S, NIGHT), { b: 1, hz: 1200, th: 0.6 });
  panel(S, 500, 540, 760, 640, S.start, "navy");
  constel(S, [[330, 350, 4], [660, 370, 4], [430, 520, 3], [500, 535, 3], [570, 550, 3], [340, 740, 4], [690, 730, 4]], ORION[1], { lt: W(58, 4) });
  emuTile(S, 1420, 540, 760, 640, { rim: W(58, 9) });
  DS.card(S, "CONNECT THE DOTS", 500, 150, { size: DS.type.body, t: W(58, 4) });
  DS.card(S, "DRAW WITH THE GAPS", 1420, 150, { size: DS.type.body, t: W(58, 9), tc: "blue" });
  DS.vignette(S, 0.1); }

// The emu changes with the seasons, too. For the Kamilaroi and Euahlayi peoples,
{ const S = sc(59, 0, { cam: "push", focus: "960 520" }); sky(S, DS.outdoor(S, NIGHT), { b: 1, hz: 1200, th: 0.6 });
  [["run", "AUTUMN"], ["sit", "MIDWINTER"], ["egg", "LATE WINTER"]].forEach(([p, s], i) => { const x = 380 + i * 580, t = W(59, 2) + i * 0.35; emuTile(S, x, 500, 520, 440, { pose: p, rim: t, t }); wtxt(S, s, x, 790, { size: DS.type.small, t }); });
  DS.card(S, "THE KAMILAROI AND EUAHLAYI PEOPLES", 960, 140, { size: DS.type.small, t: W(59, 9) });
  DS.vignette(S, 0.1); }

// in autumn it has legs and is running, while emus on the ground are laying eggs.
{ const S = sc(60, 0, { cam: "push", focus: "700 480" }); sky(S, DS.outdoor(S, NIGHT), { b: 1, hz: 1200, th: 0.6 });
  emuTile(S, 560, 500, 900, 700, { pose: "run", rim: S.start });
  const P = groundPanel(S, 1100, 300, 680, 560); emuBird(S, 1480, P.gy, 1.0, { parent: P.k }); [[1300, 0], [1370, 8], [1240, 10]].forEach(([x, dy], i) => egg(S, x, P.gy - 24 + dy, 0.9, { t: W(60, 14) + i * 0.15, parent: P.k }));
  DS.card(S, "AUTUMN: LEGS, RUNNING", 560, 140, { size: DS.type.small, t: W(60, 1) });
  DS.card(S, "EMUS LAYING EGGS", 1440, 220, { size: DS.type.small, t: W(60, 14), tc: "green" });
  DS.vignette(S, 0.1); }

// In midwinter it sits on its nest, and eggs can still be collected.
{ const S = sc(61, 0, { cam: "push", focus: "700 480" }); sky(S, DS.outdoor(S, NIGHT), { b: 1, hz: 1200, th: 0.6 });
  emuTile(S, 560, 500, 900, 700, { pose: "sit", rim: S.start });
  const P = groundPanel(S, 1100, 300, 680, 560); emuBird(S, 1500, P.gy, 1.0, { sit: true, parent: P.k }); [[1260, 0], [1330, 6]].forEach(([x, dy]) => egg(S, x, P.gy - 24 + dy, 0.9, { parent: P.k })); tick(S, 1300, P.gy - 110, 1.4, W(61, 8));
  DS.card(S, "MIDWINTER: SITTING ON THE NEST", 640, 140, { size: DS.type.small, t: W(61, 1) });
  DS.card(S, "EGGS STILL THERE", 1440, 220, { size: DS.type.small, t: W(61, 8), tc: "green" });
  DS.vignette(S, 0.1); }

// In late winter only an egg shape is left. The chicks are hatching, so egg season is over.
{ const S = sc(62, 0, { cam: "push", focus: "700 480" }); sky(S, DS.outdoor(S, NIGHT), { b: 1, hz: 1200, th: 0.6 });
  emuTile(S, 560, 500, 900, 700, { pose: "egg", rim: W(62, 5) });
  const P = groundPanel(S, 1100, 300, 680, 560); emuBird(S, 1560, P.gy, 0.9, { parent: P.k }); [[1270, 0.85], [1400, 0.75]].forEach(([x, k], i) => chick(S, x, P.gy, k, { t: W(62, 10) + i * 0.2, parent: P.k })); shells(S, 1200, P.gy - 14, 0.8, { t: W(62, 10) });
  DS.card(S, "LATE WINTER: ONLY AN EGG", 560, 140, { size: DS.type.small, t: W(62, 1) });
  DS.card(S, "EGG SEASON IS OVER", 1440, 220, { size: DS.type.small, t: W(62, 14), tc: "red" });
  DS.vignette(S, 0.1); }

// A calendar with the breakfast menu printed on it. // How old is the emu? Nobody knows. Stories don't come with dates.
{ const S = sc(63, 0, { cam: "push", focus: "960 540" }); emuSky(S, DS.outdoor(S, NIGHT), { th: 0.5 });
  S.fill(rect(-200, -200, 2320, 1480), S.start, 0, SKYC[1][0], 0.55);
  const x = 480, y = 260, w = 960, h = 600;
  DS.drop(S, rect(x + 12, y + 16, w, h)); DS.shape(S, rect(x, y, w, h), "white", { flat: true, w: "mid" }); DS.shape(S, rect(x, y, w, 120), "red", { flat: true, w: "detail" });
  for (let i = 0; i < 5; i++) DS.shape(S, circ(x + 100 + i * 150, y, 14), "gray", { w: "detail" });
  S.text("BREAKFAST MENU", x + w / 2, y + 84, { size: DS.type.body, t: W(63, 4), c: DS.P.white[0] });
  [["AUTUMN", 3, false], ["MIDWINTER", 2, false], ["LATE WINTER", 0, true]].forEach(([s, n, none], i) => {
    const cx = x + 170 + i * 310; txt(S, s, cx, y + 190, { c: DS.c("ink") });
    for (let j = 0; j < n; j++) egg(S, cx - (n - 1) * 30 + j * 60, y + 300, 1.0);
    if (none) { chick(S, cx, y + 340, 0.8); }
  });
  S.draw(line([x + 30, y + 400], [x + w - 30, y + 400], 0), S.start, 0, { c: DS.c("gray", 1), w: DS.w.detail });
  txt(S, "YEAR:", x + 230, y + 500, { size: DS.type.body, c: DS.c("ink") });
  S.text("?", x + 420, y + 510, { size: DS.type.display, t: W(64, 0), c: DS.c("red", 2) });
  DS.card(S, "STORIES DON'T COME WITH DATES", 960, 140, { size: DS.type.small, t: W(64, 7), tc: "red" });
  DS.vignette(S, 0.1); }

// In twenty fifteen, Patrick Nunn and Nicholas Reid argued some Aboriginal stories
{ const S = sc(65, 0, { cam: "push", focus: "1100 560" }); DS.outdoor(S, { hy: 1400, sky: "blue", sun: false });
  australia(S, 1240, 500, 22, { dots: W(65, 9) });
  nameCard(S, "PATRICK NUNN & NICHOLAS REID", "AUSTRALIAN GEOGRAPHER", 560, 200, { t: W(65, 3) });
  DS.card(S, "2015", 300, 380, { size: DS.type.title, t: W(65, 1), tc: "red" });
  DS.card(S, "STORIES FROM THE COAST", 560, 860, { size: DS.type.small, t: W(65, 10) });
  DS.vignette(S, 0.12); }

// remember coastlines that drowned over seven thousand years ago.
{ const S = sc(66, 0, { cam: "push", focus: "1200 560" }); DS.outdoor(S, { hy: 1400, sky: "blue", sun: false });
  const A = australia(S, 1240, 500, 22, { old: S.start, oldFill: S.start, dots: S.start }); S.fadeOut(A.g.oldLand, W(66, 3), 1.0);
  DS.card(S, "OLD COASTLINE", 470, 560, { size: DS.type.small, t: W(66, 1), tc: "blue" }); S.arrow(560, 610, 770, 640, W(66, 1), 0, { c: DS.P.white[0], w: DS.w.near, bend: -0.2 });
  DS.card(S, "DROWNED OVER 7,000 YEARS AGO", 960, 140, { size: DS.type.body, t: W(66, 3), tc: "red" });
  DS.vignette(S, 0.12); }

// Critics say oral memory rarely lasts eight hundred years. Nobody can prove either side.
{ const S = sc(67, 0, { cam: "push", focus: "960 560" }); DS.outdoor(S, KRAFT);
  const B = balance(S, 960, 900, { tip: [W(67, 9), 1.6, -9] });
  DS.card(S, "7,000+ YEARS?", B.pans[0][0], B.pans[0][1] - 40, { size: DS.type.small, tc: "blue", parent: B.beam });
  DS.card(S, "800 YEARS", B.pans[1][0], B.pans[1][1] - 40, { size: DS.type.small, t: W(67, 6), tc: "red", parent: B.beam });
  txt(S, "CRITICS: ORAL MEMORY RARELY LASTS", 960, 130, { size: DS.type.small, t: W(67, 0), c: DS.c("brown", 2) });
  DS.card(S, "NOBODY CAN PROVE EITHER SIDE", 960, 260, { size: DS.type.body, t: W(67, 9) });
  DS.vignette(S, 0.12); }

// ---------- the Pacific ----------
// double-hulled voyaging canoe, side view (far hull a little higher), two crab-claw sails
const canoe = (S, x, y, k = 1, o = {}) => {
  const g = S.grp(o.parent), t = o.t, X = (v) => x + v * k, Y = (v) => y + v * k, hull = (dy, tone) => DS.shape(S, `M${X(-340)} ${Y(-80 + dy)} Q${X(-310)} ${Y(-6 + dy)} ${X(-200)} ${Y(26 + dy)} L${X(200)} ${Y(26 + dy)} Q${X(310)} ${Y(-6 + dy)} ${X(350)} ${Y(-90 + dy)} L${X(300)} ${Y(-36 + dy)} L${X(-290)} ${Y(-36 + dy)} Z`, "brown", { t, parent: g, tone, w: k > 0.6 ? "mid" : "detail" });
  hull(-22, 1);
  DS.shape(S, rect(X(-240), Y(-64), 480 * k, 18 * k), "wood", { t, parent: g, flat: true, tone: 1, w: "detail" });
  S.draw(`M${X(-220)} ${Y(-64)} V${Y(-96)} H${X(220)} V${Y(-64)}`, t ?? S.start, 0, { c: DS.c("wood", 2), w: DS.w.detail, parent: g });
  [-120, 120].forEach((mx) => DS.shape(S, `M${X(mx)} ${Y(-70)} Q${X(mx - 90)} ${Y(-200)} ${X(mx - 80)} ${Y(-330)} Q${X(mx)} ${Y(-250)} ${X(mx + 80)} ${Y(-320)} Q${X(mx + 86)} ${Y(-190)} ${X(mx)} ${Y(-70)} Z`, "earth", { t, parent: g, tone: 1, w: k > 0.6 ? "mid" : "detail" }));
  hull(0, 0);
  return g;
};
const rowboat = (S, x, y, k = 1, o = {}) => {
  const g = S.grp(), X = (v) => x + v * k, Y = (v) => y + v * k;
  const F = dave(S, x, Y(-40), "near", { s: 0.75 * k, sit: true, float: true, pose: "push", legL: [[60, 0], [70, 40]], legR: [[80, 6], [92, 40]], mood: o.mood || "determined", look: 6, parent: g });
  DS.shape(S, `M${X(-200)} ${Y(-40)} L${X(220)} ${Y(-40)} Q${X(190)} ${Y(30)} ${X(120)} ${Y(40)} L${X(-150)} ${Y(40)} Q${X(-200)} ${Y(20)} ${X(-200)} ${Y(-40)} Z`, "orange", { parent: g, tone: 2 });
  const [hx, hy] = F.hand("R"); S.draw(line([hx, hy], [hx + 150 * k, hy + 140 * k], 0), S.start, 0, { c: DS.c("wood", 1), w: DS.w.mid, parent: g });
  return { g, F };
};
const island = (S, x, y, w, h, o = {}) => { S.fill(blob([[x - w / 2, y], [x - w * 0.3, y - h * 0.6], [x - w * 0.05, y - h], [x + w * 0.2, y - h * 0.8], [x + w / 2, y]]), o.t ?? S.start, 0, o.c || DS.c("green", 2, "far"), 1, o.parent); };
const crowd = (S, x0, x1, y0, rows, n, o = {}) => {
  const B = {}, heads = [];
  for (let r = 0; r < rows; r++) for (let i = 0; i < n; i++) { const x = x0 + ((i + (r % 2) * 0.5) / n) * (x1 - x0), y = y0 + r * 26, c = OC[(i * 7 + r * 3) % 8]; (B[c] = B[c] || []).push(rrect(x - 7, y - 4, 14, 22, DS.r.xs)); heads.push(circ(x, y - 12, 7)); }
  Object.entries(B).forEach(([c, ds]) => S.fill(ds.join(" "), o.t ?? S.start, 0, DS.c(c, 0, "mid"), 1)); S.fill(heads.join(" "), o.t ?? S.start, 0, DS.P.white[0], 1);
};
const sextant = (S, cx, cy, k, o = {}) => { const g = S.grp(), t = o.t, T = t ?? S.start; S.draw(`M${cx} ${cy - 60 * k} L${cx - 50 * k} ${cy + 40 * k} M${cx} ${cy - 60 * k} L${cx + 50 * k} ${cy + 40 * k}`, T, 0, { c: DS.c("gold", 2), w: DS.w.mid, parent: g }); S.draw(arc(cx, cy - 60 * k, 110 * k, 60, 120), T, 0, { c: DS.c("gold", 2), w: DS.w.near, parent: g }); DS.shape(S, rrect(cx - 30 * k, cy - 20 * k, 60 * k, 24 * k, DS.r.xs), "gray", { t, parent: g, w: "detail" }); return g; };
const magCompass = (S, cx, cy, r, o = {}) => { const g = S.grp(), t = o.t; DS.shape(S, circ(cx, cy, r), "white", { t, parent: g }); DS.shape(S, poly([[cx, cy - r * 0.8], [cx + r * 0.16, cy], [cx, cy + r * 0.8], [cx - r * 0.16, cy]], 0) + " Z", "red", { t, parent: g, w: "detail" }); return g; };
const chartIcon = (S, cx, cy, k, o = {}) => { const g = S.grp(), t = o.t; DS.shape(S, rect(cx - 70 * k, cy - 50 * k, 140 * k, 100 * k), "sand", { t, parent: g }); S.draw(smooth([[cx - 50 * k, cy + 20 * k], [cx - 10 * k, cy - 20 * k], [cx + 40 * k, cy + 10 * k]]), t ?? S.start, 0, { c: DS.c("blue", 2), w: DS.w.detail, parent: g }); return g; };
// a night chart of the Pacific: island dots, the Polynesian triangle's corners
const ISL = { hawaii: [1010, 230], tahiti: [1160, 650], rapanui: [1690, 780], aotearoa: [420, 900], satawal: [250, 320] };
const pacific = (S, o = {}) => {
  S.fill(rect(-200, -200, 2320, 1480), S.start, 0, DS.vgrad(DS.mix(DS.P.blue[2], N_[2], 0.55), DS.mix(DS.P.blue[2], N_[2], 0.25)), 1);
  dots(S, Array.from({ length: 90 }, (_, i) => [H(i, 111) * 1920, H(i, 112) * 1080]), 1.4, DS.P.white[0], 0.35);
  const gr = []; for (let x = 0; x < 1920; x += 240) gr.push(`M${x} 0 V1080`); for (let y = 0; y < 1080; y += 240) gr.push(`M0 ${y} H1920`); S.draw(gr.join(" "), S.start, 0, { c: DS.c("sky", 1), w: DS.w.hair, op: 0.15 });
  const isl = []; [[1000, 236, 16], [1030, 250, 10], [1060, 270, 9], [1100, 640, 8], [1160, 650, 12], [1220, 660, 8], [1250, 600, 7], [1300, 610, 6], [1350, 630, 6], [1190, 560, 6], [1080, 560, 6], [990, 600, 7], [900, 700, 7], [820, 760, 7], [760, 640, 6], [700, 700, 6], [1690, 780, 10], [1400, 820, 6], [1280, 760, 6], [600, 520, 6], [520, 560, 6], [440, 480, 6], [330, 400, 6], [250, 320, 7], [200, 360, 5]].forEach(([x, y, r]) => isl.push(circ(x, y, r)));
  S.fill(isl.join(" "), S.start, 0, DS.c("sand", 1), 1);
  S.fill(blob([[380, 860], [430, 830], [470, 900], [440, 960], [400, 940]]), S.start, 0, DS.c("sand", 1), 1);
  if (o.tri !== undefined) { const p = S.draw(poly([ISL.hawaii, ISL.rapanui, ISL.aotearoa, ISL.hawaii], 0), o.tri, 0, { c: DS.c("gold", 1), w: DS.w.mid, op: 0.8 }); dash(p, 16, 12); }
};

// ===================== 5. A Map Made of Stars =====================
// But a calendar tells you when, not where. / Last stop, a one: the open Pacific at night.
{ const S = sc(68, 0, { cam: "push", focus: "1300 600" }); sky(S, DS.outdoor(S, NIGHT), { b: 1, hz: 700, mw: 1, from: [-200, 60], to: [2120, 600], wd: 120 });
  sea(S, 700);
  S.fill(smooth([[-200, 880], [700, 860], [1400, 880], [2120, 860]]) + " L2120 1280 L-200 1280 Z", S.start, 0, DS.mix(DS.P.sand[2], N_[2], 0.55), 1);
  bsign(S, 1180, 930, 1, { t: W(69, 3) });
  dave(S, 1520, 940, "near", { mood: "wow", look: -4, t: W(69, 0) });
  notebook(S, 140, 300, [["WRITING", undefined, "tick"], ["CLOCK", undefined, "tick"], ["CALENDAR", W(68, 2), "tick", W(68, 5)], ["MAP", W(68, 7), "q"]], { size: DS.type.caption, wd: 460 });
  DS.card(S, "WHEN, NOT WHERE", 380, 170, { size: DS.type.body, t: W(68, 5), tc: "red" });
  DS.card(S, "LAST STOP: THE OPEN PACIFIC", 1340, 170, { size: DS.type.small, t: W(69, 0) });
  DS.vignette(S, 0.1); }

// Polynesian navigators used this sky to settle some of the remotest islands on Earth, from Hawaii to Rapa Nui.
{ const S = sc(70, 0, { cam: "push", focus: "1100 560" }); DS.outdoor(S, { hy: 1400, sky: "navy", sun: false }); pacific(S, { tri: W(70, 10) });
  DS.card(S, "POLYNESIAN NAVIGATORS", 520, 150, { size: DS.type.body, t: W(70, 0) });
  DS.card(S, "HAWAII", ISL.hawaii[0] + 200, ISL.hawaii[1] - 50, { size: DS.type.small, t: W(70, 15) });
  DS.card(S, "RAPA NUI", ISL.rapanui[0] - 20, ISL.rapanui[1] - 110, { size: DS.type.small, t: W(70, 17) });
  DS.vignette(S, 0.1); }

// In nineteen fifty-six, the historian Andrew Sharp argued they found them by accident, on canoes drifting off course.
{ const S = sc(71, 0, { cam: "push", focus: "960 560" }); DS.outdoor(S, { hy: 1400, sky: "navy", sun: false }); pacific(S);
  const tr = S.draw(smooth([[560, 520], [700, 420], [640, 330], [820, 380], [760, 520], [920, 470], [880, 600], [1040, 560]]), W(71, 15), 0, { c: DS.P.white[0], w: DS.w.mid, op: 0.85 }); dash(tr, 8, 14);
  const cg = S.grp(); canoe(S, 1040, 560, 0.18, { parent: cg }); S.move(cg, W(71, 13), S.end - W(71, 13), { x: 50, y: 20, rotation: 6, svgOrigin: "1040 560" }, "sine.inOut");
  nameCard(S, "ANDREW SHARP, HISTORIAN", "ANCIENT VOYAGERS IN THE PACIFIC", 960, 160, { t: W(71, 5) });
  DS.card(S, "1956", 1560, 360, { size: DS.type.title, t: W(71, 1), tc: "red" });
  DS.card(S, "BY ACCIDENT?", 1380, 860, { size: DS.type.body, t: W(71, 11) });
  DS.vignette(S, 0.1); }

// Very lucky drifting, across the largest ocean on Earth.
{ const S = sc(72, 0, { cam: "zoom", focus: "1000 600" }); DS.outdoor(S, { hy: 1400, sky: "navy", sun: false }); pacific(S);
  [[[560, 520], [700, 420], [640, 330], [820, 380], [760, 300], [920, 240], ISL.hawaii], [[560, 520], [700, 600], [860, 540], [900, 720], [1040, 640], ISL.tahiti], [[1160, 650], [1300, 700], [1260, 840], [1480, 760], [1560, 860], ISL.rapanui], [[560, 520], [500, 640], [620, 720], [480, 800], ISL.aotearoa]].forEach((pts, i) => {
    const p = S.draw(smooth(pts), W(72, 0) + i * 0.3, 0, { c: DS.P.white[0], w: DS.w.mid, op: 0.85 }); dash(p, 8, 14);
    tick(S, pts[pts.length - 1][0] + 30, pts[pts.length - 1][1] - 30, 1.1, W(72, 1) + i * 0.3); });
  DS.card(S, "VERY LUCKY DRIFTING", 960, 140, { size: DS.type.title, t: W(72, 0) });
  DS.card(S, "THE LARGEST OCEAN ON EARTH", 1360, 960 - 60, { size: DS.type.small, t: W(72, 4) });
  DS.vignette(S, 0.1); }

// So in nineteen seventy-six, the voyaging canoe Hokulea sailed from Hawaii to Tahiti,
{ const S = sc(73, 0, { cam: "push", focus: "900 560" }); sky(S, DS.outdoor(S, NIGHT), { b: 1, hz: 760, mw: 0.9, from: [-200, 100], to: [2120, 500], wd: 110 });
  sea(S, 760);
  const cg = S.grp(); canoe(S, 820, 860, 1.0, { parent: cg }); S.move(cg, S.start, S.len, { x: 120 }, "none");
  DS.card(S, "1976", 420, 150, { size: DS.type.title, t: W(73, 2), tc: "red" });
  DS.card(S, "HŌKŪLEʻA", 1420, 150, { size: DS.type.title, t: W(73, 7), tc: "blue" });
  DS.card(S, "HAWAII TO TAHITI", 1420, 290, { size: DS.type.small, t: W(73, 10) });
  DS.vignette(S, 0.1); }

// about four thousand kilometres, with no compass, no charts, no instruments.
{ const S = sc(74, 0, { cam: "push", focus: "800 560" }); DS.outdoor(S, { hy: 1400, sky: "navy", sun: false }); pacific(S);
  const rt = S.draw(smooth([ISL.hawaii, [1060, 420], ISL.tahiti]), S.start, 0, { c: DS.c("gold", 1), w: DS.w.near }); dash(rt, 18, 12);
  DS.card(S, "ABOUT 4,000 KM", 760, 440, { size: DS.type.body, t: W(74, 1), tc: "red" });
  [[magCompass, W(74, 6)], [chartIcon, W(74, 8)], [sextant, W(74, 10)]].forEach(([fn, t], i) => { const x = 1480, y = 300 + i * 220; panel(S, x, y, 240, 180, t); fn === magCompass ? fn(S, x, y, 60, { t }) : fn(S, x, y + (fn === sextant ? 10 : 0), 1, { t }); xMark(S, x, y, 2.4, t + 0.25); });
  DS.card(S, "NO INSTRUMENTS", 1480, 960 - 50, { size: DS.type.small, t: W(74, 9) });
  DS.vignette(S, 0.1); }

// Its navigator, Mau Piailug from Satawal in Micronesia, / was chosen by his grandfather to train at four or five years old.
{ const S = sc(75, 0, { cam: "push", focus: "1100 560" }); sky(S, DS.outdoor(S, NIGHT), { b: 1, hz: 760, mw: 0.8, from: [-200, 400], to: [2120, 60], wd: 110 });
  sea(S, 760);
  S.fill(smooth([[-200, 860], [700, 840], [1400, 870], [2120, 850]]) + " L2120 1280 L-200 1280 Z", S.start, 0, DS.mix(DS.P.sand[2], N_[2], 0.5), 1);
  island(S, 300, 770, 300, 70, { c: DS.mix(SIL, N_[0], 0.3) });
  const g = S.grp(); S.fadeIn(g, W(76, 1), 0.35);
  person(S, 1120, 930, "near", 3, { s: 1.15, pose: "point", hairC: DS.c("gray", 1), outfitC: DS.c("green"), mood: "smile", look: 6, parent: g });
  person(S, 1360, 930, "near", 1, { s: 0.6, hair: "short", hairC: DS.c("ink"), outfitC: DS.c("orange"), mood: "wow", look: -4, parent: g });
  nameCard(S, "MAU PIAILUG", "SATAWAL, MICRONESIA", 560, 200, { t: W(75, 2) });
  DS.card(S, "CHOSEN BY HIS GRANDFATHER", 1360, 160, { size: DS.type.small, t: W(76, 1) });
  DS.card(S, "AGE 4 OR 5", 1500, 560, { size: DS.type.body, t: W(76, 8), tc: "red" });
  DS.vignette(S, 0.1); }

// Mau read a star compass: the horizon split into houses, where each star always rises and sets.
{ const S = sc(77, 0, { cam: "push", focus: "960 540" }); sky(S, DS.outdoor(S, NIGHT), { b: 1, hz: 1200, th: 0.6 });
  compass(S, 960, 560, 330);
  const star = S.grp(); spark(S, 960 - 300, 560, 6, { parent: star, t: W(77, 12) }); spin(star, W(77, 13), S.end - W(77, 13) - 0.2, 0, 180, 960, 560);
  const ar = S.draw(arc(960, 560, 300, 180, 360), W(77, 12), 0, { c: DS.c("gold", 1), w: DS.w.mid, op: 0.7 }); dash(ar, 10, 12);
  wtxt(S, "RISES", 520, 600 + 40, { size: DS.type.small, t: W(77, 14) }); wtxt(S, "SETS", 1400, 640, { size: DS.type.small, t: W(77, 16) });
  DS.card(S, "A STAR COMPASS", 460, 150, { size: DS.type.body, t: W(77, 3) });
  DS.card(S, "HOUSES ON THE HORIZON", 1440, 150, { size: DS.type.small, t: W(77, 9) });
  DS.vignette(S, 0.1); }

// Thirty-one days out, they sighted land. / About seventeen thousand people, half of Tahiti, came to meet them.
{ const S = sc(78, 0, { cam: "push", focus: "1100 600" }); DS.outdoor(S, { hy: 1400, sky: "sky", sun: [1600, 170] });
  S.fill(rect(-200, 700, 2320, 600), S.start, 0, DS.vgrad(DS.c("blue", 1), DS.c("blue")), 1);
  island(S, 1350, 712, 900, 330, { c: DS.c("green", 0, "mid") });
  S.fill(smooth([[880, 760], [1300, 740], [1820, 770]]) + " L1820 800 L880 800 Z", S.start, 0, DS.c("sand", 1), 1);
  crowd(S, 960, 1760, 752, 2, 46, { t: W(79, 1) });
  canoe(S, 480, 860, 0.7);
  DS.card(S, "DAY 31: LAND", 480, 150, { size: DS.type.body, t: W(78, 0) });
  DS.card(S, "ABOUT 17,000 PEOPLE", 1360, 150, { size: DS.type.body, t: W(79, 1) });
  DS.card(S, "HALF OF TAHITI", 1360, 280, { size: DS.type.small, t: W(79, 4), tc: "blue" });
  DS.vignette(S, 0.1); }

// Dave tries it in a rowing boat. / He steers for the brightest light on the horizon. // It's the same plane. It's always the plane.
{ const S = sc(80, 0, { cam: "push", focus: "1300 600" }); sky(S, DS.outdoor(S, NIGHT), { b: 1, hz: 700, mw: 0.9, from: [-200, 80], to: [2120, 520], wd: 110 });
  sea(S, 700);
  const L = S.grp(); spark(S, 1560, 690, 4.4, { parent: L }); S.move(L, W(82, 1), 1.2, { y: -260, x: -40 }, "power1.inOut");
  plane(S, 1560, 690 - 260 + 8, 1.2, { ts: W(82, 2), t: W(82, 2) });
  const B = rowboat(S, 640, 880, 1.3); S.move(B.g, S.start, S.len, { x: 90 }, "none"); B.F.face(W(82, 3), "flat", 6);
  DS.card(S, "THE BRIGHTEST LIGHT", 1440, 160, { size: DS.type.small, t: W(81, 4) });
  DS.card(S, "THE SAME PLANE", 1300, 300, { size: DS.type.body, t: W(82, 3), tc: "red" });
  note(S, NOTE2, { x: 96, y: 70, hi: 2, hiT: W(82, 6) });
  DS.vignette(S, 0.1); }

// ---------- Ptolemy, Bruno, Bessel ----------
const SPACEO = { hy: 1400, sky: "navy", sun: false };
const space = (S, O, o = {}) => { S.fill(rect(-200, -200, 2320, 1480), S.start, 0, DS.vgrad(DS.mix(N_[2], I_[2], 0.6), DS.mix(N_[2], I_[2], 0.3)), 1); field(S, o.th ?? 0.45, 1100); return O; };
const openBook = (S, cx, cy, w, h, o = {}) => {
  const g = S.grp(), t = o.t, T = t ?? S.start;
  DS.drop(S, rrect(cx - w / 2 + 10, cy - h / 2 + 14, w, h, DS.r.sm), { t, parent: g });
  DS.shape(S, rrect(cx - w / 2 - 14, cy - h / 2 + 10, w + 28, h, DS.r.sm), "brown", { t, parent: g, tone: 1 });
  [-1, 1].forEach((sd) => DS.shape(S, `M${cx} ${cy - h / 2 + 14} Q${cx + sd * w * 0.25} ${cy - h / 2 - 10} ${cx + sd * w / 2} ${cy - h / 2} L${cx + sd * w / 2} ${cy + h / 2 - 8} Q${cx + sd * w * 0.25} ${cy + h / 2 - 22} ${cx} ${cy + h / 2} Z`, "paper", { t, parent: g, flat: true, w: "detail" }));
  const d = [], st = [];
  [-1, 1].forEach((sd) => { for (let r = 0; r < 9; r++) { const y = cy - h / 2 + 50 + r * (h - 90) / 8, x0 = cx + sd * 40, x1 = cx + sd * (w / 2 - 40); st.push(circ(Math.min(x0, x1) + 12, y, 6)); d.push(`M${f1(Math.min(x0, x1) + 34)} ${f1(y)} H${f1(Math.max(x0, x1) - (r % 3) * 30)}`); } });
  S.draw(d.join(" "), o.lt ?? T, 0, { c: DS.c("gray", 1), w: DS.w.detail, parent: g }); S.fill(st.join(" "), o.lt ?? T, 0, DS.c("gold", 2), 1, g);
  return g;
};
// Ptolemy's cosmos: Earth in the middle, the seven wanderers on their spheres, the fixed stars on one last sphere
const PLAN = [["gray", 0.16], ["gray", 0.27], ["yellow", 0.37], ["gold", 0.48], ["red", 0.59], ["earth", 0.7], ["sand", 0.8]]; // Moon, Mercury, Venus, Sun, Mars, Jupiter, Saturn
const cosmos = (S, cx, cy, R, o = {}) => {
  const g = S.grp(o.parent), T = o.t ?? S.start;
  PLAN.forEach(([c, f], i) => { S.draw(circ(cx, cy, R * f), T, 0, { c: DS.c("sky", 1), w: DS.w.hair, op: 0.5, parent: g }); const a = -0.6 + i * 0.9; S.fill(circ(cx + Math.cos(a) * R * f, cy + Math.sin(a) * R * f, i === 3 ? R * 0.045 : R * 0.022), T, 0, DS.c(c, 1), 1, g); });
  S.draw(circ(cx, cy, R), o.st ?? T, 0, { c: DS.c("gold", 1), w: R > 200 ? DS.w.near : DS.w.mid, parent: g });
  const d = []; for (let i = 0; i < 48; i++) { const a = (i / 48) * Math.PI * 2; d.push(circ(cx + Math.cos(a) * R, cy + Math.sin(a) * R, R > 200 ? 5 : 3)); } S.fill(d.join(" "), o.st ?? T, 0, DS.P.white[0], 1, g);
  globe(S, cx, cy, R * 0.07, { parent: g, t: o.t });
  return { g, sat: [cx + Math.cos(-0.6 + 6 * 0.9) * R * 0.8, cy + Math.sin(-0.6 + 6 * 0.9) * R * 0.8] };
};
const sunBig = (S, x, y, r, o = {}) => { const g = S.grp(o.parent), T = o.t ?? S.start; S.fill(circ(x, y, r * 2.6), T, 0, glo(DS.c("yellow", 1), 0.75), 1, g); DS.shape(S, circ(x, y, r), "yellow", { t: o.t, parent: g }); return g; };
const scroll = (S, cx, y, w, h, o = {}) => { const g = S.grp(), t = o.t; DS.drop(S, rect(cx - w / 2 + 10, y + 14, w, h), { t, parent: g }); DS.shape(S, rect(cx - w / 2, y, w, h), "paper", { t, parent: g, flat: true, w: "mid" }); [y, y + h].forEach((yy) => DS.shape(S, rrect(cx - w / 2 - 30, yy - 22, w + 60, 44, DS.r.lg), "wood", { t, parent: g })); return g; };

// ===================== 6. A Ceiling With Holes =====================
// So the stars were writing, a clock, a calendar and a map. But what is a star?
{ const S = sc(83, 0, { cam: "push", focus: "960 560" }); sky(S, DS.outdoor(S, NIGHT), { b: 1, hz: 760, mw: 0.8, from: [-200, 80], to: [2120, 520], wd: 110 }); sea(S, 760);
  S.fill(rect(-200, -200, 2320, 1480), S.start, 0, SKYC[1][0], 0.45);
  notebook(S, 560, 250, [["WRITING", undefined, "tick", W(83, 4)], ["CLOCK", undefined, "tick", W(83, 6)], ["CALENDAR", undefined, "tick", W(83, 8)], ["MAP", undefined, "tick", W(83, 11)], ["A STAR IS...", W(83, 12), "q", W(83, 16)]], { size: DS.type.body, wd: 800 });
  DS.card(S, "BUT WHAT IS A STAR?", 960, 130, { size: DS.type.title, t: W(83, 12), tc: "red" });
  DS.vignette(S, 0.1); }

// Around the year one fifty, in Alexandria, Claudius Ptolemy catalogued one thousand and twenty-two stars.
{ const S = sc(84, 0, { cam: "push", focus: "960 600" }); DS.room(S, { wall: "sand", floor: "wood", window: false });
  for (let r = 0; r < 3; r++) { DS.shape(S, rect(400, 200 + r * 110, 440, 16), "wood", { tone: 2, flat: true, w: "detail" }); for (let c = 0; c < 7; c++) DS.shape(S, circ(436 + c * 62, 176 + r * 110, 22, 24), "paper", { tone: 2, w: "detail" }); }
  const top = 700; DS.shadow(S, 960, 960, 900); DS.shape(S, rrect(500, top, 920, 34, DS.r.xs), "wood", {}); [540, 1360].forEach((x) => DS.shape(S, rect(x, top + 34, 26, 960 - top - 34), "wood", { w: "mid" }));
  openBook(S, 960, top - 150, 640, 300, { lt: W(84, 9) });
  nameCard(S, "CLAUDIUS PTOLEMY", "ALEXANDRIA, AROUND 150", 1340, 380, { t: W(84, 7) });
  DS.card(S, "1,022 STARS", 1340, 200, { size: DS.type.title, t: W(84, 10), tc: "red" });
  DS.vignette(S, 0.12); }

// His answer? Lights, fixed to one giant sphere just beyond Saturn.
{ const S = sc(85, 0, { cam: "zoom", focus: "960 560" }); space(S, DS.outdoor(S, SPACEO));
  const C = cosmos(S, 960, 560, 400, { st: W(85, 2) });
  DS.card(S, "LIGHTS ON ONE GIANT SPHERE", 960, 100, { size: DS.type.body, t: W(85, 2) });
  wtxt(S, "SATURN", C.sat[0] - 60, C.sat[1] + 50, { t: W(85, 10) });
  DS.card(S, "JUST BEYOND SATURN", 1500, 880, { size: DS.type.small, t: W(85, 8) }); S.arrow(1440, 830, 1300, 760, W(85, 8), 0, { c: DS.c("gold", 1), w: DS.w.near, bend: 0.2 });
  DS.vignette(S, 0.1); }

// He even calculated how far: about twenty thousand Earth radii. / That's roughly the distance to the real Sun.
{ const S = sc(86, 0, { cam: "push", focus: "1100 560" }); space(S, DS.outdoor(S, SPACEO));
  cosmos(S, 760, 560, 400);
  const m = S.draw(line([760, 560], [1160, 560], 0), W(86, 3), 0, { c: DS.c("red", 1), w: DS.w.near }); S.draw(line([1160, 530], [1160, 590], 0), W(86, 3), 0, { c: DS.c("red", 1), w: DS.w.near });
  DS.card(S, "ABOUT 20,000 EARTH RADII", 760, 140, { size: DS.type.body, t: W(86, 5), tc: "red" });
  sunBig(S, 1250, 560, 60, { t: W(87, 6) });
  DS.card(S, "ROUGHLY THE DISTANCE TO THE REAL SUN", 1250, 880, { size: DS.type.small, t: W(87, 3) });
  DS.vignette(S, 0.1); }

// So his entire universe, stars included, would fit between the Earth and the Sun.
{ const S = sc(88, 0, { cam: "push", focus: "1200 560" }); space(S, DS.outdoor(S, SPACEO));
  const R = 1050, cx = 260, cy = 560;
  S.fill(circ(cx, cy, R), S.start, 0, DS.c("gold", 1), 0.06);
  S.draw(circ(cx, cy, R), S.start, 0, { c: DS.c("gold", 1), w: DS.w.near });
  const d = []; for (let i = -10; i <= 10; i++) { const a = i * 0.05; d.push(circ(cx + Math.cos(a) * R, cy + Math.sin(a) * R, 5)); } S.fill(d.join(" "), S.start, 0, DS.P.white[0], 1);
  globe(S, cx, cy, 34);
  sunBig(S, 1580, 560, 110);
  DS.card(S, "HIS ENTIRE UNIVERSE", 760, 300, { size: DS.type.body, t: W(88, 2) });
  wtxt(S, "STARS INCLUDED", 1040, 780, { size: DS.type.small, t: W(88, 4) });
  DS.card(S, "THE REAL SUN", 1580, 800, { size: DS.type.small, t: W(88, 12), tc: "red" });
  DS.vignette(S, 0.1); }

// It was a cosy universe, and it lasted about fourteen hundred years.
{ const S = sc(89, 0, { cam: "push", focus: "900 560" }); DS.room(S, { wall: "wall", floor: "wood", window: false });
  const top = 760; DS.shadow(S, 820, 960, 800); DS.shape(S, rrect(420, top, 800, 30, DS.r.xs), "wood", {}); [460, 1160].forEach((x) => DS.shape(S, rect(x, top + 30, 24, 960 - top - 30), "wood", { w: "mid" }));
  DS.shape(S, `M640 ${top} L660 ${top - 70} L980 ${top - 70} L1000 ${top} Z`, "wood", { tone: 2 });
  S.fill(circ(820, top - 290, 230), S.start, 0, DS.c("navy", 2), 1);
  cosmos(S, 820, top - 290, 210, {});
  S.draw(circ(820, top - 290, 230), S.start, 0, { c: DS.c("glass", 2), w: DS.w.near });
  S.draw(arc(820, top - 290, 200, 200, 250), S.start, 0, { c: DS.P.white[0], w: DS.w.mid, op: 0.8 });
  DS.card(S, "A COSY UNIVERSE", 820, 130, { size: DS.type.body, t: W(89, 3) });
  DS.card(S, "ABOUT 1,400 YEARS", 1500, 860, { size: DS.type.body, t: W(89, 8), tc: "red" });
  notebook(S, 1320, 260, [["CEILING", W(89, 3)]], { size: DS.type.caption, wd: 440 });
  DS.vignette(S, 0.12); }

// In fifteen eighty-four, the friar Giordano Bruno wrote that the stars are other suns, with worlds of their own.
{ const S = sc(90, 0, { cam: "push", focus: "960 520" }); sky(S, DS.outdoor(S, NIGHT), { b: 1, hz: 1100, th: 0.55 });
  [[300, 420], [560, 680], [800, 380], [1080, 640], [1320, 420], [1600, 660], [1720, 330]].forEach(([x, y], i) => {
    spark(S, x, y, 4, { tw: true });
    sunBig(S, x, y, 18, { t: W(90, 13) + i * 0.08 });
    const g = S.grp(); S.fadeIn(g, W(90, 15) + i * 0.08, 0.35);
    [[46, 18, "blue"], [74, 28, "green"]].forEach(([r, ry, c], j) => { S.draw(circ(x, y, r, ry), S.start, 0, { c: DS.c("sky", 1), w: DS.w.hair, op: 0.7, parent: g }); const a = H(i * 3 + j, 121) * 6.28; S.fill(circ(x + Math.cos(a) * r, y + Math.sin(a) * ry, 7), S.start, 0, DS.c(c, 1), 1, g); });
  });
  nameCard(S, "GIORDANO BRUNO, FRIAR", "1584", 560, 170, { t: W(90, 5) });
  DS.card(S, "OTHER SUNS", 1360, 150, { size: DS.type.body, t: W(90, 12) });
  DS.card(S, "WITH WORLDS OF THEIR OWN", 960, 880, { size: DS.type.small, t: W(90, 15), tc: "blue" });
  DS.vignette(S, 0.1); }

// In sixteen hundred, the Inquisition put him to death in Rome.
{ const S = sc(91, 0, { cam: "pull", focus: "960 560" }); DS.room(S, { wall: "gray", floor: "gray", window: false });
  S.fill(rect(-200, -200, 2320, 1480), S.start, 0, DS.c("navy", 2), 0.45);
  const bx = 760, by = 300; DS.shape(S, `M${bx} 900 V${by + 200} Q${bx} ${by} ${bx + 200} ${by} Q${bx + 400} ${by} ${bx + 400} ${by + 200} V900 Z`, "wood", { tone: 2 });
  for (let i = 1; i < 4; i++) S.draw(line([bx + i * 100, by + 40], [bx + i * 100, 900], 0), S.start, 0, { c: DS.c("brown", 2), w: DS.w.detail });
  S.fill(circ(bx + 330, 620, 14), S.start, 0, DS.c("gray", 1), 1);
  DS.card(S, "ROME, 1600", 960, 140, { size: DS.type.title, t: W(91, 1) });
  DS.card(S, "THE INQUISITION", 960, 260, { size: DS.type.small, t: W(91, 4) });
  DS.vignette(S, 0.2); }

// But careful. Most of the known charges were about religion, like the Trinity and the Mass.
{ const S = sc(92, 0, { cam: "push", focus: "960 560" }); DS.outdoor(S, KRAFT);
  scroll(S, 960, 250, 760, 600);
  txt(S, "THE KNOWN CHARGES", 960, 340, { size: DS.type.body, t: W(92, 6), c: DS.c("brown", 2) });
  [["THE TRINITY", W(92, 12)], ["THE MASS", W(92, 15)], ["AND MORE RELIGION", W(92, 15) + 0.4]].forEach(([s, t], i) => txt(S, s, 960, 450 + i * 80, { size: DS.type.small, t, c: DS.c("ink") }));
  DS.card(S, "BUT CAREFUL", 360, 160, { size: DS.type.body, t: W(92, 0), tc: "red" });
  DS.card(S, "MOSTLY RELIGION", 1490, 160, { size: DS.type.body, t: W(92, 9) });
  DS.vignette(S, 0.12); }

// His many worlds were on the list, and historians still argue how much they mattered.
{ const S = sc(93, 0, { cam: "push", focus: "960 560" }); DS.outdoor(S, KRAFT);
  scroll(S, 960, 250, 760, 600);
  txt(S, "THE KNOWN CHARGES", 960, 340, { size: DS.type.body, c: DS.c("brown", 2) });
  ["THE TRINITY", "THE MASS", "AND MORE RELIGION"].forEach((s, i) => txt(S, s, 960, 450 + i * 80, { size: DS.type.small, c: DS.c("ink") }));
  txt(S, "MANY WORLDS", 960, 690, { size: DS.type.small, t: W(93, 1), c: DS.c("blue", 2) }); S.draw(circ(960, 672, 230, 46), W(93, 3), 0, { c: DS.c("red"), w: DS.w.mid });
  const A = person(S, 300, 930, "near", 0, { s: 1.0, pose: "point", outfitC: DS.c("purple"), mood: "angry", look: 6 }), B = person(S, 1620, 930, "near", 2, { s: 1.0, pose: "pointL", outfitC: DS.c("green"), mood: "determined", look: -6 });
  S.speech(300, 420, 150, 80, 300, 560, W(93, 10), 0.3); txt(S, "A LOT!", 300, 438, { size: DS.type.small, t: W(93, 10) });
  S.speech(1620, 420, 170, 80, 1620, 560, W(93, 12), 0.3); txt(S, "A LITTLE!", 1620, 438, { size: DS.type.small, t: W(93, 12) });
  DS.card(S, "HISTORIANS STILL ARGUE", 960, 130, { size: DS.type.body, t: W(93, 8) });
  DS.vignette(S, 0.12); }

// In eighteen thirty-eight, Friedrich Bessel measured a star's distance for the first time:
{ const S = sc(94, 0, { cam: "push", focus: "960 560" }); space(S, DS.outdoor(S, SPACEO));
  const sx = 1100, sy = 700; S.draw(circ(sx, sy, 340, 120), S.start, 0, { c: DS.c("sky", 1), w: DS.w.detail, op: 0.6 }); sunBig(S, sx, sy, 34);
  globe(S, sx - 340, sy, 24); globe(S, sx + 340, sy, 24, { t: W(94, 5) });
  spark(S, 1100, 230, 5, { tw: true });
  S.draw(line([sx - 340, sy], [1100, 230], 0), W(94, 5), 0, { c: DS.c("gold", 1), w: DS.w.mid }); S.draw(line([sx + 340, sy], [1100, 230], 0), W(94, 6), 0, { c: DS.c("gold", 1), w: DS.w.mid });
  S.draw(arc(1100, 230, 110, 66, 114), W(94, 7), 0, { c: DS.c("red", 1), w: DS.w.near });
  DS.card(S, "61 CYGNI", 1340, 220, { size: DS.type.small, t: W(94, 7) });
  nameCard(S, "FRIEDRICH BESSEL", "1838", 460, 200, { t: W(94, 3) });
  DS.card(S, "FIRST DISTANCE TO A STAR", 460, 880, { size: DS.type.small, t: W(94, 8), tc: "blue" });
  DS.vignette(S, 0.1); }

// about ten light-years, some eight hundred thousand times beyond Ptolemy's ceiling.
{ const S = sc(95, 0, { cam: "push", focus: "960 540" }); space(S, DS.outdoor(S, SPACEO));
  S.fill(circ(220, 560, 22), S.start, 0, DS.c("gold", 1), 0.3); S.draw(circ(220, 560, 22), S.start, 0, { c: DS.c("gold", 1), w: DS.w.mid }); S.fill(circ(220, 560, 4), S.start, 0, DS.c("sky", 1), 1);
  S.arrow(270, 560, 1640, 560, W(95, 1), 0, { c: DS.c("red", 1), w: DS.w.near });
  spark(S, 1700, 560, 6, { tw: true });
  wtxt(S, "PTOLEMY'S CEILING", 260, 650, { t: W(95, 9) }); wtxt(S, "61 CYGNI", 1700, 650, {});
  DS.card(S, "ABOUT 10 LIGHT-YEARS", 960, 440, { size: DS.type.body, t: W(95, 1) });
  DS.card(S, "800,000 TIMES FARTHER", 960, 160, { size: DS.type.body, t: W(95, 4), tc: "red" });
  notebook(S, 1340, 760, [["CEILING", undefined, "x", W(95, 10)]], { size: DS.type.caption, wd: 440 });
  DS.vignette(S, 0.1); }

// Today, over six thousand planets around other stars are known. Bruno's worlds are real.
{ const S = sc(96, 0, { cam: "push", focus: "960 540" }); space(S, DS.outdoor(S, SPACEO));
  const PC = ["blue", "green", "orange", "red", "purple", "sand", "sky", "pink", "gold", "earth"];
  for (let r = 0; r < 4; r++) for (let c = 0; c < 15; c++) { const i = r * 15 + c, x = 200 + c * 108, y = 310 + r * 96, t = W(96, 1) + (c + r) * 0.06; DS.shape(S, circ(x, y, 22 + (i % 4) * 5), PC[i % 10], { t, w: "detail" }); if (i % 6 === 0) S.draw(circ(x, y, 40, 10), t, 0, { c: DS.c("sand", 1), w: DS.w.detail }); }
  DS.card(S, "OVER 6,000 PLANETS", 960, 150, { size: DS.type.title, t: W(96, 2), tc: "blue" });
  notebook(S, 300, 720, [["SUNS", W(96, 10), "tick", W(96, 12)]], { size: DS.type.caption, wd: 440 });
  DS.card(S, "BRUNO'S WORLDS ARE REAL", 1300, 800, { size: DS.type.small, t: W(96, 10), tc: "green" });
  DS.vignette(S, 0.1); }

// ---------- the guest star ----------
const blast = (S, x, y, r, o = {}) => {
  const g = S.grp(), T = o.t ?? S.start;
  [[1.0, "purple", 0.35], [0.75, "red", 0.45], [0.5, "orange", 0.6], [0.28, "yellow", 0.8]].forEach(([f, c, op]) => S.fill(circ(x, y, r * f), T, 0, glo(DS.c(c, 1), op), 1, g));
  const ring = S.draw(circ(x, y, r * 0.8), T, 0, { c: DS.c("orange", 1), w: DS.w.near, parent: g, op: 0.8 }); dash(ring, 22, 16);
  S.fill(circ(x, y, r * 0.08), T, 0, DS.P.white[0], 1, g);
  if (o.grow) grow(g, o.grow[0], o.grow[1], 0.15, 1, x, y);
  return g;
};
const badge = (S, cx, cy, str, o = {}) => { const g = S.grp(), t = o.t, w = Math.max(str.length * DS.type.small * 0.62, 12 * DS.type.caption * 0.62) + 60; DS.drop(S, rrect(cx - w / 2 + 6, cy - 50 + 8, w, 100, DS.r.sm), { t, parent: g }); DS.shape(S, rrect(cx - w / 2, cy - 50, w, 100, DS.r.sm), "white", { t, parent: g, flat: true, w: "detail" }); DS.shape(S, rect(cx - w / 2 + 4, cy - 46, w - 8, 30), "red", { t, parent: g, flat: true, w: "hair" }); S.text("HELLO, I'M A", cx, cy - 22, { size: DS.type.caption, t, c: DS.P.white[0], parent: g }); S.text(str, cx, cy + 38, { size: DS.type.small, t, c: DS.c("ink"), parent: g }); if (o.rot) g.setAttribute("transform", `rotate(${o.rot} ${cx} ${cy})`); return g; };
const galaxy = (S, cx, cy, r, o = {}) => {
  const g = S.grp(o.parent), T = o.t ?? S.start, d = [[], []];
  S.fill(circ(cx, cy, r * 1.1, r * 0.8), T, 0, glo(DS.mix(DS.P.white[0], DS.P.sky[1], 0.5), 0.35), 1, g);
  for (let arm = 0; arm < 2; arm++) for (let i = 0; i < 260; i++) { const f = i / 260, a = arm * Math.PI + f * Math.PI * 2.6, rr = r * (0.12 + f * 0.9), j = (H(i + arm * 300, 131) - 0.5) * r * 0.14; d[H(i, 132) > 0.5 ? 1 : 0].push([cx + Math.cos(a) * rr + j, cy + Math.sin(a) * rr * 0.8 + j * 0.6]); }
  dots(S, d[0], 1.6, DS.P.white[0], 0.8, T, g); dots(S, d[1], 2.6, DS.P.white[0], 0.8, T, g);
  S.fill(circ(cx, cy, r * 0.22, r * 0.18), T, 0, glo(DS.c("gold", 1), 0.9), 1, g);
  return g;
};
const andromeda = (S, cx, cy, r, o = {}) => {
  const g = S.grp(), T = o.t ?? S.start, rot = S.grp(g);
  [[1.0, 0.32, "sky", 0.18], [0.8, 0.25, "sky", 0.28], [0.55, 0.17, "white", 0.4], [0.3, 0.1, "gold", 0.7], [0.12, 0.06, "white", 0.95]].forEach(([fx, fy, c, op]) => S.fill(circ(cx, cy, r * fx, r * fy), T, 0, c === "white" ? DS.P.white[0] : DS.c(c, 1), op, rot));
  [0.62, 0.82].forEach((f) => S.draw(circ(cx, cy, r * f, r * f * 0.3), T, 0, { c: DS.mix(N_[2], I_[2], 0.4), w: DS.w.mid, op: 0.55, parent: rot }));
  S.fill(circ(cx + r * 0.3, cy - r * 0.2, r * 0.025), T, 0, DS.P.white[0], 0.6, rot); S.fill(circ(cx - r * 0.5, cy + r * 0.25, r * 0.02, r * 0.035), T, 0, DS.P.white[0], 0.5, rot);
  rot.setAttribute("transform", `rotate(-28 ${cx} ${cy})`);
  return g;
};
const bars = (S, x, y, items, o = {}) => items.forEach(([label, frac, c, t], i) => { const yy = y + i * 120, w = o.len || 900; S.fill(rrect(x, yy, w, 56, DS.r.sm), S.start, 0, DS.mix(N_[2], N_[0], 0.4), 1); S.fill(rrect(x, yy, Math.max(24, w * frac), 56, DS.r.sm), t, 0, DS.c(c, 1), 1); wtxt(S, label, x, yy - 18, { anchor: "start", t }); });

// ===================== 7. The Guest Star =====================
// So the stars are suns. Case closed. / Except the strangest part had already been seen, in the year ten-oh-six.
{ const S = sc(97, 0, { cam: "push", focus: "960 560" }); DS.room(S, { wall: "paper", floor: "wood", window: false });
  const top = 720; DS.shadow(S, 960, 960, 1200); DS.shape(S, rrect(360, top, 1200, 36, DS.r.xs), "wood", {}); [400, 1500].forEach((x) => DS.shape(S, rect(x, top + 36, 26, 960 - top - 36), "wood", { w: "mid" }));
  DS.drop(S, rect(560, 270, 800, 470)); DS.shape(S, `M560 290 L760 290 L790 260 L1000 260 L1030 290 L1360 290 V740 H560 Z`, "gold", { tone: 1 });
  DS.shape(S, rect(600, 330, 720, 380), "paper", { flat: true, w: "detail" });
  txt(S, "WHAT ARE STARS?", 960, 410, { size: DS.type.small, c: DS.c("brown", 2) });
  txt(S, "SUNS.", 960, 540, { size: DS.type.display, t: W(97, 3), c: DS.c("ink") });
  stamp(S, 1080, 640, "CASE CLOSED", W(97, 5));
  const n = S.grp(); S.fadeIn(n, W(98, 0), 0.35); DS.drop(S, rect(1388, 222, 330, 250), { parent: n }); DS.shape(S, rect(1380, 210, 330, 250), "yellow", { tone: 1, flat: true, w: "detail", parent: n }); S.text("EXCEPT...", 1545, 300, { size: DS.type.small, t: W(98, 0), c: DS.c("ink"), parent: n }); S.text("1006", 1545, 400, { size: DS.type.title, t: W(98, 11), c: DS.c("red", 2), parent: n });
  DS.vignette(S, 0.12); }

// That spring, a new star blazed up in the southern sky, / probably the brightest in recorded history.
{ const S = sc(99, 0, { cam: "push", focus: "1100 380" }); sky(S, DS.outdoor(S, NIGHT), { b: 1, hz: 820, th: 0.45 });
  hills(S, 830); house(S, 500, 850, 0.4, { lit: false }); house(S, 640, 856, 0.3, { lit: false }); S.fill(rect(1480, 690, 60, 150) + " " + poly([[1470, 690], [1510, 640], [1550, 690]], 0) + " Z", S.start, 0, SIL, 1);
  blast(S, 1120, 380, 160, { t: W(99, 5) }); spark(S, 1120, 380, 9, { t: W(99, 5), tw: true });
  DS.card(S, "1006", 420, 160, { size: DS.type.title, t: W(99, 0), tc: "red" });
  DS.card(S, "A NEW STAR", 1520, 160, { size: DS.type.body, t: W(99, 3) });
  DS.card(S, "PROBABLY THE BRIGHTEST IN RECORDED HISTORY", 960, 900 - 30, { size: DS.type.small, t: W(100, 2) });
  DS.vignette(S, 0.1); }

// In Cairo, Ali ibn Ridwan wrote it shone with over a quarter of the Moon's light. / It was recorded from Japan to Switzerland.
{ const S = sc(101, 0, { cam: "push", focus: "960 520" }); sky(S, DS.outdoor(S, NIGHT), { b: 1, hz: 1100, th: 0.55 });
  nameCard(S, "ALI IBN RIDWAN", "CAIRO", 480, 170, { t: W(101, 2) });
  S.fill(circ(330, 420, 54), S.start, 0, DS.mix(DS.P.white[0], DS.P.gray[1], 0.3), 1); spark(S, 330, 560, 6, {});
  bars(S, 460, 420, [["THE MOON", 1, "gray", W(101, 14)], ["THE NEW STAR", 0.27, "gold", W(101, 9)]], { len: 1100 });
  DS.card(S, "OVER 1/4 OF THE MOON'S LIGHT", 1240, 170, { size: DS.type.small, t: W(101, 9), tc: "red" });
  const ln = S.draw(line([300, 800], [1620, 800], 0), W(102, 2), 0, { c: DS.c("sky", 1), w: DS.w.mid, op: 0.7 }); dash(ln, 14, 10);
  [300, 520, 760, 1000, 1360, 1620].forEach((x, i) => { DS.shape(S, `M${x} 800 L${x - 18} 760 A22 22 0 1 1 ${x + 18} 760 Z`, "red", { t: W(102, 2) + i * 0.15, w: "detail" }); });
  wtxt(S, "SWITZERLAND", 300, 880, { t: W(102, 6), size: DS.type.small }); wtxt(S, "JAPAN", 1620, 880, { t: W(102, 4), size: DS.type.small });
  DS.vignette(S, 0.1); }

// Chinese astronomers called stars like this guest stars, / and the court astrologer told the emperor this guest was lucky.
{ const S = sc(103, 0, { cam: "push", focus: "960 520" }); sky(S, DS.outdoor(S, NIGHT), { b: 1, hz: 1100, th: 0.55 });
  blast(S, 560, 470, 130); spark(S, 560, 470, 8, { tw: true });
  badge(S, 600, 690, "GUEST", { t: W(103, 6), rot: -6 });
  scroll(S, 1360, 330, 560, 420, { t: W(104, 2) });
  txt(S, "TO THE EMPEROR:", 1360, 430, { size: DS.type.small, t: W(104, 4), c: DS.c("brown", 2) });
  txt(S, "THIS GUEST", 1360, 540, { size: DS.type.body, t: W(104, 7), c: DS.c("ink") }); txt(S, "IS LUCKY", 1360, 630, { size: DS.type.body, t: W(104, 10), c: DS.c("red", 2) });
  DS.card(S, "GUEST STARS", 560, 150, { size: DS.type.body, t: W(103, 6), tc: "blue" });
  DS.card(S, "THE COURT ASTROLOGER", 1360, 150, { size: DS.type.small, t: W(104, 2) });
  DS.vignette(S, 0.1); }

// It wasn't a new star. It was an explosion, / most likely the leftover core of an old star, blowing itself apart.
{ const S = sc(105, 0, { cam: "push", focus: "960 540" }); space(S, DS.outdoor(S, SPACEO));
  const core = S.grp(); S.fill(circ(960, 560, 26), S.start, 0, DS.P.white[0], 1, core); S.fill(circ(960, 560, 70), S.start, 0, glo(DS.c("sky", 1), 0.6), 1, core);
  blast(S, 960, 560, 360, { t: W(106, 9), grow: [W(106, 9), 1.6] });
  const c1 = DS.card(S, "A NEW STAR", 480, 160, { size: DS.type.body }); S.draw(line([300, 166], [660, 154], 0), W(105, 1), 0, { c: DS.c("red"), w: DS.w.near });
  DS.card(S, "AN EXPLOSION", 1440, 160, { size: DS.type.body, t: W(105, 7), tc: "red" });
  DS.card(S, "THE LEFTOVER CORE OF AN OLD STAR", 960, 900 - 20, { size: DS.type.small, t: W(106, 3) });
  DS.vignette(S, 0.1); }

// It was about seven thousand light-years away. / So it had exploded around seven thousand years earlier, before writing existed.
{ const S = sc(107, 0, { cam: "push", focus: "960 500" }); space(S, DS.outdoor(S, SPACEO));
  blast(S, 260, 360, 150); globe(S, 1660, 360, 46);
  const ln = S.draw(line([340, 360], [1600, 360], 0), S.start, 0, { c: DS.c("sky", 1), w: DS.w.mid, op: 0.6 }); dash(ln, 12, 12);
  const pk = S.grp(); S.fill(circ(340, 360, 40), S.start, 0, glo(DS.c("yellow", 1), 0.9), 1, pk); S.fill(circ(340, 360, 9), S.start, 0, DS.P.white[0], 1, pk); S.move(pk, W(107, 2), 2.2, { x: 1240 }, "power1.inOut");
  DS.card(S, "ABOUT 7,000 LIGHT-YEARS", 960, 200, { size: DS.type.body, t: W(107, 3) });
  const g = S.grp(); S.fadeIn(g, W(108, 0), 0.4);
  S.draw(line([340, 700], [1640, 700], 0), S.start, 0, { c: DS.P.white[0], w: DS.w.near, parent: g });
  [[340, "THE EXPLOSION", "orange"], [880, "FIRST WRITING", "gold"], [1640, "1006: SEEN", "sky"]].forEach(([x, s, c], i) => { S.fill(circ(x, 700, 18), S.start, 0, DS.c(c, 1), 1, g); wtxt(S, s, x, 780, { size: DS.type.small, t: i === 1 ? W(108, 10) : W(108, 3), parent: g }); });
  tablet(S, 880, 600, 90, 110, { t: W(108, 10), rows: 3 });
  DS.card(S, "BEFORE WRITING EXISTED", 960, 900, { size: DS.type.small, t: W(108, 9), tc: "red" });
  DS.vignette(S, 0.1); }

// The lucky guest had died seven thousand years before the party.
{ const S = sc(109, 0, { cam: "push", focus: "960 600" }); DS.room(S, { wall: "pink", floor: "wood", window: false });
  const fl = []; for (let i = 0; i < 12; i++) { const x = 420 + i * 92; fl.push([x, 230 + Math.sin(i / 11 * Math.PI) * 40]); }
  S.draw(smooth(fl), S.start, 0, { c: DS.c("ink"), w: DS.w.detail }); fl.slice(0, -1).forEach(([x, y], i) => DS.shape(S, poly([[x + 6, y], [x + 86, y + 4], [x + 46, y + 70]], 0) + " Z", ["red", "yellow", "blue", "green"][i % 4], { w: "detail", flat: true }));
  txt(S, "WELCOME, LUCKY GUEST!", 960, 440, { size: DS.type.title, c: DS.c("red", 2) });
  [[260, 560, "red"], [340, 520, "yellow"], [1640, 540, "blue"], [1560, 600, "green"]].forEach(([x, y, c]) => { S.draw(smooth([[x, y + 70], [x + 10, y + 200], [x, y + 330]]), S.start, 0, { c: DS.c("ink"), w: DS.w.detail }); DS.shape(S, circ(x, y, 56, 70), c, {}); });
  DS.shadow(S, 960, 930, 300); DS.shape(S, rect(860, 640, 200, 30), "wood", {}); DS.shape(S, rect(860, 470, 26, 180), "wood", { w: "mid" }); DS.shape(S, rect(1034, 670, 26, 260), "wood", { w: "mid" }); DS.shape(S, rect(870, 670, 26, 260), "wood", { w: "mid" });
  DS.shape(S, poly([[940, 640], [990, 520], [1040, 640]], 0) + " Z", "purple", { w: "detail" });
  const r = S.draw(circ(960, 570, 90), S.start, 0, { c: DS.c("orange", 1), w: DS.w.mid, op: 0.6 }); dash(r, 14, 14);
  DS.card(S, "DIED 7,000 YEARS BEFORE THE PARTY", 960, 860, { size: DS.type.small, t: W(109, 4), tc: "red" });
  DS.vignette(S, 0.12); }

// So that's the twist, right? The night sky is a graveyard, and half those stars are dead.
const XSTARS = [[260, 220], [520, 160], [760, 300], [1040, 200], [1300, 280], [1560, 170], [1720, 360], [420, 420], [880, 470], [1180, 520], [1460, 480], [640, 600], [300, 560], [1640, 620]];
{ const S = sc(110, 0, { cam: "push", focus: "960 460" }); sky(S, DS.outdoor(S, NIGHT), { b: 1, hz: 820, th: 0.5 }); hills(S, 830);
  XSTARS.forEach(([x, y], i) => { spark(S, x, y, 4.2, { tw: true }); if (i % 2 === 0) xMark(S, x, y, 1.0, W(110, 12) + i * 0.06); });
  DS.card(S, "THE TWIST?", 480, 860 - 20, { size: DS.type.body, t: W(110, 3) });
  DS.card(S, "HALF THOSE STARS DEAD?", 1340, 860 - 20, { size: DS.type.body, t: W(110, 12), tc: "red" });
  DS.vignette(S, 0.1); }

// Well, no. That one is a myth. / Nearly every star you can see is within about a thousand light-years,
{ const S = sc(111, 0, { cam: "push", focus: "960 540" }); space(S, DS.outdoor(S, SPACEO));
  const A = S.grp(); S.fadeOut(A, W(112, 0), 0.5);
  XSTARS.forEach(([x, y], i) => { spark(S, x, y + 60, 4.2, { parent: A }); if (i % 2 === 0) S.cross(x, y + 60, 1.0, S.start, 0, { c: DS.c("red"), w: DS.w.near, parent: A }); });
  const sg = stamp(S, 960, 520, "MYTH", W(111, 5)); S.fadeOut(sg, W(112, 0), 0.5);
  const B = S.grp(); S.fadeIn(B, W(112, 0), 0.5);
  galaxy(S, 960, 560, 420, { parent: B });
  S.draw(circ(1240, 640, 34), S.start, 0, { c: DS.c("yellow", 1), w: DS.w.near, parent: B }); S.fill(circ(1240, 640, 6), S.start, 0, DS.c("yellow", 1), 1, B);
  DS.card(S, "NEARLY EVERY STAR YOU CAN SEE", 960, 120, { size: DS.type.small, t: W(112, 1) });
  DS.card(S, "WITHIN ABOUT 1,000 LIGHT-YEARS", 1340, 860, { size: DS.type.small, t: W(112, 7), tc: "blue" }); S.arrow(1300, 810, 1250, 690, W(112, 7), 0, { c: DS.c("yellow", 1), w: DS.w.near, bend: 0.15 });
  DS.vignette(S, 0.1); }

// and stars last millions of years or more. Almost all of them are still there.
{ const S = sc(113, 0, { cam: "push", focus: "960 540" }); space(S, DS.outdoor(S, SPACEO));
  bars(S, 360, 380, [["A STAR'S LIFE: MILLIONS OF YEARS OR MORE", 1, "gold", W(113, 1)], ["ITS LIGHT'S TRIP TO YOU: UP TO ABOUT 1,000 YEARS", 0.03, "sky", W(113, 1) + 0.6]], { len: 1200 });
  spark(S, 250, 410, 6, { tw: true });
  DS.card(S, "ALMOST ALL STILL THERE", 960, 780, { size: DS.type.body, t: W(113, 8), tc: "green" }); tick(S, 1490, 770, 1.6, W(113, 12));
  DS.vignette(S, 0.1); }

// But their light is still old, and one faint smudge beats them all.
{ const S = sc(114, 0, { cam: "push", focus: "1300 400" }); sky(S, DS.outdoor(S, NIGHT), { b: 1, hz: 840, mw: 0.6, from: [-200, 900], to: [2120, 300] }); hills(S, 850);
  [[300, 240], [620, 160], [900, 300]].forEach(([x, y], i) => { spark(S, x, y, 4, { tw: true }); const e = S.grp(); envelope(S, x, y + 40, 90, 60, { parent: e, t: W(114, 2) + i * 0.15 }); S.move(e, W(114, 2) + i * 0.15, 2.4, { y: 360 }, "power1.in"); });
  S.fill(circ(1400, 300, 30, 12), S.start, 0, DS.P.white[0], 0.45); S.draw(circ(1400, 300, 80, 50), W(114, 8), 0, { c: DS.c("gold", 1), w: DS.w.mid });
  DS.card(S, "THEIR LIGHT IS OLD", 520, 860, { size: DS.type.body, t: W(114, 2) });
  DS.card(S, "ONE FAINT SMUDGE", 1400, 470, { size: DS.type.small, t: W(114, 8) });
  notebook(S, 1340, 640, [["OLD LIGHT", W(114, 5)]], { size: DS.type.caption, wd: 440 });
  DS.vignette(S, 0.1); }

// In nine sixty-four, the Persian astronomer al-Sufi described it as a small cloud.
{ const S = sc(115, 0, { cam: "push", focus: "960 600" }); DS.room(S, { wall: "sand", floor: "wood", window: false });
  const top = 760; DS.shadow(S, 960, 960, 900); DS.shape(S, rrect(500, top, 920, 34, DS.r.xs), "wood", {}); [540, 1360].forEach((x) => DS.shape(S, rect(x, top + 34, 26, 960 - top - 34), "wood", { w: "mid" }));
  openBook(S, 960, top - 170, 700, 320);
  S.fill(circ(1150, top - 190, 70, 26), W(115, 11), 0, DS.c("gray", 1), 0.9); S.fill(circ(1150, top - 190, 26, 10), W(115, 11), 0, DS.c("gray", 2), 1);
  nameCard(S, "AL-SUFI, PERSIAN ASTRONOMER", "964", 960, 170, { t: W(115, 3) });
  DS.card(S, "A SMALL CLOUD", 1500, 420, { size: DS.type.body, t: W(115, 11), tc: "blue" }); S.arrow(1440, 470, 1230, 540, W(115, 11), 0, { c: DS.c("blue", 2), w: DS.w.near, bend: 0.2 });
  DS.vignette(S, 0.12); }

// It's the Andromeda galaxy, two and a half million light-years away. / Its light set off before our species existed.
{ const S = sc(116, 0, { cam: "zoom", focus: "960 420" }); space(S, DS.outdoor(S, SPACEO), { th: 0.5 });
  andromeda(S, 960, 400, 520);
  DS.card(S, "THE ANDROMEDA GALAXY", 480, 130, { size: DS.type.small, t: W(116, 2) });
  DS.card(S, "2.5 MILLION LIGHT-YEARS", 1420, 130, { size: DS.type.small, t: W(116, 4), tc: "red" });
  const g = S.grp(); S.fadeIn(g, W(117, 0), 0.4);
  S.draw(line([200, 780], [1720, 780], 0), S.start, 0, { c: DS.P.white[0], w: DS.w.near, parent: g });
  [[200, "LIGHT SETS OFF", "sky"], [1538, "OUR SPECIES", "orange"], [1720, "NOW", "white"]].forEach(([x, s, c], i) => { S.fill(circ(x, 780, 16), S.start, 0, c === "white" ? DS.P.white[0] : DS.c(c, 1), 1, g); wtxt(S, s, i === 0 ? 330 : x - (i === 1 ? 60 : 0), i === 1 ? 740 - 10 : 850, { size: DS.type.small, t: i === 1 ? W(117, 5) : W(117, 1), parent: g }); });
  DS.vignette(S, 0.1); }

// So, what did ancient humans think the stars were? / Writing, clocks, calendars, an emu, a map, a ceiling.
{ const S = sc(118, 0, { cam: "push", focus: "960 560" }); sky(S, DS.outdoor(S, NIGHT), { b: 1, hz: 1100, mw: 0.7, from: [-200, 700], to: [2120, 100] });
  S.fill(rect(-200, -200, 2320, 1480), S.start, 0, SKYC[1][0], 0.4);
  notebook(S, 560, 250, [["WRITING", W(119, 0)], ["CLOCKS", W(119, 1)], ["CALENDARS", W(119, 2)], ["AN EMU", W(119, 4)], ["A MAP", W(119, 6)], ["A CEILING", W(119, 8)]], { size: DS.type.small, wd: 800 });
  DS.card(S, "SO, WHAT WERE THE STARS?", 960, 120, { size: DS.type.body, t: W(118, 1) });
  DS.vignette(S, 0.1); }

// Wrong about what stars are. Right about how to use them.
{ const S = sc(120, 0, { cam: "push", focus: "960 540" }); sky(S, DS.outdoor(S, NIGHT), { b: 1, hz: 1100, th: 0.5 });
  panel(S, 520, 540, 680, 600, S.start, "white"); panel(S, 1400, 540, 680, 600, W(120, 5), "white");
  txt(S, "WHAT STARS ARE", 520, 330, { size: DS.type.body }); xMark(S, 520, 600, 4, W(120, 0));
  txt(S, "HOW TO USE THEM", 1400, 330, { size: DS.type.body, t: W(120, 5) });
  starClock(S, 1220, 520, 80, { t: W(120, 5) }); compass(S, 1400, 520, 80, { t: W(120, 7) }); emuTile(S, 1580, 520, 150, 130, { t: W(120, 9) }); tick(S, 1400, 700, 3, W(120, 9));
  DS.vignette(S, 0.1); }

// In the end, the Babylonians came closest. / The sky really is writing. It's just very old mail.
{ const S = sc(121, 0, { cam: "push", focus: "960 540" }); sky(S, DS.outdoor(S, NIGHT), { b: 1, hz: 1100, mw: 0.6, from: [-200, 300], to: [2120, 900] });
  tablet(S, 560, 540, 400, 470, { stars: [[0.3, 0.25], [0.7, 0.25], [0.5, 0.6]] });
  S.draw(circ(560, 540, 280, 300), W(121, 5), 0, { c: DS.c("gold", 1), w: DS.w.near });
  DS.card(S, "THE BABYLONIANS CAME CLOSEST", 560, 150, { size: DS.type.small, t: W(121, 3) });
  const e = S.grp(); envelope(S, 1380, 540, 560, 360, { parent: e, t: W(122, 5) }); S.move(e, W(122, 5), 0.8, { y: -20 }, "power2.out");
  DS.card(S, "VERY OLD MAIL", 1380, 860, { size: DS.type.body, t: W(122, 7), tc: "blue" });
  DS.vignette(S, 0.1); }

// ===================== 8. Back on the Roof =====================
// And the writing is fading. In twenty twenty-three, Christopher Kyba's team checked fifty thousand volunteer reports.
{ const S = sc(123, 0, { cam: "push", focus: "960 560" }); const O = sky(S, DS.outdoor(S, NIGHT), { b: 1, hz: 860, th: 2 });
  const fg = S.grp(); field(S, 0.3, 860, { parent: fg }); S.fadeOut(fg, W(123, 2), 2.4);
  S.fill(rect(-200, -200, 2320, 1480), W(123, 2), 0, vgrad3(SKYC[7], [0, 0.6, 0.75]), 0.7);
  city(S, 880, { h: 220 });
  for (let i = 0; i < 9; i++) { const x = 1240 + (i % 3) * 18, y = 700 - i * 26, t = W(123, 14) + i * 0.05; DS.shape(S, rect(x, y, 330, 200), "white", { t, flat: true, w: "detail" }); if (i === 8) [0, 1, 2].forEach((j) => S.draw(line([x + 30, y + 50 + j * 46], [x + 300 - j * 60, y + 50 + j * 46], 0), t, 0, { c: DS.c("sky", 2), w: DS.w.detail })); }
  nameCard(S, "CHRISTOPHER KYBA'S TEAM", "SCIENCE, 2023", 560, 200, { t: W(123, 8) });
  DS.card(S, "THE WRITING IS FADING", 560, 400, { size: DS.type.small, t: W(123, 2), tc: "red" });
  DS.card(S, "51,351 VOLUNTEER REPORTS", 1420, 330, { size: DS.type.small, t: W(123, 12) });
  DS.vignette(S, 0.1); }

// The night sky was brightening by almost ten percent a year.
{ const S = sc(124, 0, { cam: "push", focus: "960 560" }); sky(S, DS.outdoor(S, NIGHT), { b: 5, hz: 1100, th: 0.9 });
  panel(S, 960, 560, 1200, 620, S.start, "white");
  S.draw(`M480 340 V780 H1460`, S.start, 0, { c: DS.c("ink"), w: DS.w.mid });
  const P = Array.from({ length: 12 }, (_, i) => [500 + i * 85, 760 - 300 * (Math.pow(1.096, i) - 1) / (Math.pow(1.096, 11) - 1)]);
  S.draw(smooth(P), W(124, 1), 0, { c: DS.c("orange"), w: DS.w.near });
  txt(S, "2011", 500, 830, {}); txt(S, "2022", 1435, 830, {}); txt(S, "SKY GLOW", 600, 320, { c: DS.c("gray", 2) });
  DS.card(S, "9.6% BRIGHTER EVERY YEAR", 960, 140, { size: DS.type.body, t: W(124, 6), tc: "red" });
  DS.vignette(S, 0.1); }

// A child born under two hundred and fifty stars would see about a hundred by eighteen.
{ const S = sc(125, 0, { cam: "push", focus: "960 540" }); sky(S, DS.outdoor(S, NIGHT), { b: 7, hz: 1100, th: 2 });
  [[520, 250, "BORN: 250 STARS", 0.55, W(125, 1)], [1400, 100, "AGE 18: ABOUT 100", 0.85, W(125, 11)]].forEach(([x, n, s, k, t]) => {
    const g = S.grp(); S.fadeIn(g, t, 0.35); const kk = clipTo(S.grp(g), rrect(x - 330, 160, 660, 340, DS.r.lg));
    S.fill(rect(x - 330, 160, 660, 340), S.start, 0, DS.vgrad(SKYC[2][0], SKYC[5][2]), 1, kk);
    dots(S, Array.from({ length: n }, (_, i) => [x - 320 + H(i, 141) * 640, 170 + H(i, 142) * 310]), 2.4, DS.P.white[0], 0.9, S.start, kk);
    S.draw(rrect(x - 330, 160, 660, 340, DS.r.lg), S.start, 0, { c: DS.P.white[0], w: DS.w.mid, parent: g });
    person(S, x, 930, "near", 2, { s: k, mood: "wow", look: 0, parent: g, t });
    wtxt(S, s, x, 130, { size: DS.type.small, t, parent: g });
  });
  S.arrow(900, 700, 1080, 700, W(125, 13), 0, { c: DS.c("red", 1), w: DS.w.near });
  DS.vignette(S, 0.1); }

// But unlike most pollution, this one ends at a light switch.
{ const S = sc(126, 0, { cam: "push", focus: "960 520" }); sky(S, DS.outdoor(S, NIGHT), { b: 1, hz: 860, mw: 0.8, from: [-200, 500], to: [2120, 100], t: W(126, 9) + 0.3 });
  const gl = S.grp(); S.fill(rect(-200, -200, 2320, 1480), S.start, 0, vgrad3(SKYC[9], [0, 0.6, 0.72]), 1, gl); S.fadeOut(gl, W(126, 9) + 0.2, 1.2);
  const lit = S.grp(); city(S, 880, { h: 240 }); const dark = S.grp(); S.fill(rect(-200, 600, 2320, 700), W(126, 9) + 0.2, 0, SIL, 0.85, dark);
  DS.drop(S, rrect(818, 368, 300, 440, DS.r.md)); DS.shape(S, rrect(810, 360, 300, 440, DS.r.md), "white", {});
  DS.shape(S, rrect(910, 440, 100, 280, DS.r.sm), "gray", { tone: 1, w: "mid" });
  const tg = S.grp(); DS.shape(S, rrect(926, 460, 68, 120, DS.r.sm), "white", { parent: tg }); S.move(tg, W(126, 9), 0.2, { y: 120 }, "power2.in");
  DS.card(S, "UNLIKE MOST POLLUTION", 960, 140, { size: DS.type.body, t: W(126, 1) });
  DS.card(S, "IT ENDS AT A LIGHT SWITCH", 1480, 860, { size: DS.type.small, t: W(126, 6), tc: "green" });
  DS.vignette(S, 0.1); }

// Dave drives home and climbs back onto his roof. / Two stars, a wild sheep, and a plane.
{ const S = sc(127, 0, { cam: "push", focus: "960 600" }); sky(S, DS.outdoor(S, NIGHT), { b: 9, hz: 760 });
  city(S, 830, { h: 300 });
  jupiter(S, ...DSTARS.J, 6); spark(S, ...DSTARS.s1, 3, { tw: true }); spark(S, ...DSTARS.s2, 3, { tw: true });
  plane(S, 1500, 420, 1.0, { dx: 80, dy: -10 });
  roof(S, 860, { ax: 220 });
  const lad = S.grp(); [1100, 1186].forEach((x) => DS.shape(S, rect(x, 760, 14, 330), "gray", { parent: lad, tone: 1, w: "detail" })); for (let y = 790; y < 1080; y += 60) DS.shape(S, rect(1100, y, 100, 10), "gray", { parent: lad, tone: 1, w: "hair" });
  const D = dave(S, 1150, 860, "near", { mood: "smile", look: 6 }); S.move(D.all, Math.max(0, S.start - 0.7), 0.01, { y: 220 }); S.move(D.all, W(127, 4), 1.2, { y: 0 }, "power2.out");
  sheep(S, DSTARS.J[0] + 150, DSTARS.J[1] + 10, 0.5, { t: W(128, 3) });
  note(S, NOTE2, { t: W(128, 0) });
  DS.card(S, "BACK ON THE ROOF", 520, 150, { size: DS.type.body, t: W(127, 4) });
  DS.vignette(S, 0.1); }

// But now he knows what he's looking at. / Two real suns, sending him very old mail.
{ const S = sc(129, 0, { cam: "push", focus: "900 500" }); sky(S, DS.outdoor(S, NIGHT), { b: 9, hz: 760 });
  city(S, 830, { h: 300 });
  jupiter(S, ...DSTARS.J, 6); [DSTARS.s1, DSTARS.s2].forEach(([x, y], i) => { spark(S, x, y, 3, { tw: true }); S.draw(circ(x, y, 40), W(130, 2), 0, { c: DS.c("yellow", 1), w: DS.w.mid }); wtxt(S, "A SUN", x, y - 60, { t: W(130, 2) }); const e = S.grp(); envelope(S, x, y + 60, 80, 54, { parent: e, t: W(130, 3) + i * 0.2 }); S.move(e, W(130, 3) + i * 0.2, 2.2, { x: 860 - x - 70 * i, y: 700 - y - 60 }, "power1.inOut"); });
  roof(S, 860, { ax: 220 });
  lyingDave(S, 1100, 860, { s: 1.0, mood: "smile" });
  note(S, NOTE2, { out: W(130, 2) }); note(S, NOTE3, { t: W(130, 2), hi: 0, hiT: W(130, 2) });
  DS.card(S, "NOW HE KNOWS", 460, 600, { size: DS.type.body, t: W(129, 1) });
  DS.card(S, "VERY OLD MAIL", 1180, 560, { size: DS.type.small, t: W(130, 6), tc: "blue" });
  DS.vignette(S, 0.1); }

// One wild sheep. And a plane.
{ const S = sc(131, 0, { cam: "push", focus: "1100 360" }); sky(S, DS.outdoor(S, NIGHT), { b: 9, hz: 760 });
  city(S, 830, { h: 300 });
  jupiter(S, ...DSTARS.J, 7); spark(S, ...DSTARS.s1, 3, { tw: true }); spark(S, ...DSTARS.s2, 3, { tw: true });
  sheep(S, DSTARS.J[0] + 150, DSTARS.J[1] + 10, 0.6, { t: W(131, 1) });
  plane(S, 1500, 430, 1.1, { dx: 60, dy: -8 });
  roof(S, 860, { ax: 220 });
  lyingDave(S, 1000, 860, { s: 1.0, mood: "smile" });
  note(S, NOTE3);
  DS.card(S, "ONE WILD SHEEP", 900, 560, { size: DS.type.body, t: W(131, 1) });
  DS.card(S, "AND A PLANE", 1500, 600, { size: DS.type.body, t: W(131, 4), tc: "red" });
  DS.vignette(S, 0.1); }
