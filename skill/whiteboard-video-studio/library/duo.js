// ===================== library/duo.js — two-or-more-people scenes and interactions (category "duo") =====================
// Ready groups of 2-4 people built from L.person (so they follow the owner's Look). Every asset takes:
//   a, b, c, d  = cast style per person ("man01".."man10", "girl01".."girl10"); faceA..faceD = expression;
//   A, B, C, D  = full per-person overrides { style, body, skin, hair, hairC, outfit, outfitC, acc, accC, face }   (e.g. { B: { skin: "s5", outfit: "dress" } })
//   time        = "day" | "sunset" | "night" (assets with a sky/lamp), s = scale (line weights follow √s, like people).
// Origin = bottom centre of the group on the ground. Romantic items (kiss, slow dance, hearts, wedding) are ADULT-ONLY:
// kid/teen/baby bodies and the chibi styles are swapped for adult ones. Kid-body items are friendship / play only.
// Poses are solved per use: hands and feet are placed at WORLD targets with 2-bone IK (see fig()), so a pair keeps its contact
// points (hands meeting, hand on shoulder) on any cast style or body.
(function () {
const L = window.L, f1 = L.f1, D = Math.PI / 180, r1 = (v) => Math.round(v * 10) / 10;
const sin = (a) => Math.sin(a * D), cos = (a) => Math.cos(a * D);
const CAT = "duo";

// extra faces for the pair interactions (same data shape as L.FACES)
Object.assign(L.FACES, {
  "duo-kiss": { m: "o", b: "mid", e: "closedUp", blush: 1 }, "duo-glad": { m: "smile", b: "mid", e: "closedUp", blush: 1 },
  "duo-yell": { m: "teeth", b: "down" }, "duo-sorry": { m: "sad", b: "up", look: 0.2 }, "duo-whisper": { m: "small", b: "mid", look: 0.9 },
});

// ---------- 2-bone IK (same bones as motion.js): target relative to the root, in units of s = 1 ----------
const A1 = 58, A2 = 52, T1 = 62, T2 = 73;
const ik = (dx, dy, l1, l2, pref) => {
  let d = Math.hypot(dx, dy) || 1;
  const mx = l1 + l2 - 0.5, mn = Math.abs(l1 - l2) + 1, k = d > mx ? mx / d : d < mn ? mn / d : 1;
  dx *= k; dy *= k; d *= k;
  const a = (l1 * l1 - l2 * l2 + d * d) / (2 * d), h = Math.sqrt(Math.max(0, l1 * l1 - a * a)), ux = dx / d, uy = dy / d;
  const c1 = [ux * a - uy * h, uy * a + ux * h], c2 = [ux * a + uy * h, uy * a - ux * h];
  const e = c1[0] * pref[0] + c1[1] * pref[1] >= c2[0] * pref[0] + c2[1] * pref[1] ? c1 : c2;
  return [e.map(r1), [dx, dy].map(r1)];
};

const legT = (off, t1, t2) => { const k = [off + T1 * sin(t1), T1 * cos(t1)]; return [k, [k[0] + T2 * sin(t2), k[1] + T2 * cos(t2)]].map((p) => p.map(r1)); };

// ---------- fig(): one person with hands / feet at world targets ----------
// c: { style, body, skin, hair, hairC, outfit, outfitC, acc, accC, face, look, mouth, s, x, y (feet, world), pose (base arms),
//      hl, hr (hand targets, world), pl, pr (elbow preference), feet: [[x,y],[x,y]] world foot targets, kl, kr (knee preference),
//      drop (hip lowered, px at s = 1: sitting 55), rot (lean in degrees about the hip, + = clockwise), noShadow, sx, sw }
// returns { m (markup), over(rect) (the same figure clipped to a rect, to put one arm in front of a partner), hd, R, hands:[L,R], sh, hip, s }
let seq = 0;
const fig = (c) => {
  const st = c.style || "man01", cs = L.CAST[st] || L.CAST.man01, bd = L.BODIES[c.body || cs.body || "regular"] || {}, legK = bd.leg || 1;
  const base = {}; ["style", "body", "skin", "hair", "hairC", "outfit", "outfitC", "acc", "accC", "armC", "look", "mouth"].forEach((k) => c[k] !== undefined && (base[k] = c[k]));
  Object.assign(base, { style: st, face: c.face || "smile", s: c.s || 1 });
  const a = L.anchors(base), s = a.s, hip = a.hip, d = (c.drop || 0) * legK * s, rot = c.rot || 0, x0 = c.x || 0, y0 = c.y || 0;
  const toLocal = (p) => { let x = p[0], y = p[1] - d; if (rot) { const dx = x - hip[0], dy = y - hip[1]; x = hip[0] + dx * cos(-rot) - dy * sin(-rot); y = hip[1] + dx * sin(-rot) + dy * cos(-rot); } return [x, y]; };
  const fwd = (p) => { let x = p[0], y = p[1]; if (rot) { const dx = x - hip[0], dy = y - hip[1]; x = hip[0] + dx * cos(rot) - dy * sin(rot); y = hip[1] + dx * sin(rot) + dy * cos(rot); } return [x + x0, y + d + y0]; };
  // a hand target [x, y] is world; [deg, len, "arm"] = a straight arm pointing deg from straight up; [dx, dy, "sh" | "hd" | "hip"] is relative to this person's own shoulder line / head centre / hip (before the lean)
  const tgt = (t) => (t[2] === "sh" ? [x0 + t[0], y0 + d + a.abL[1] + t[1]] : t[2] === "hd" ? [x0 + t[0], y0 + d + a.hd[1] + t[1]] : t[2] === "hip" ? [x0 + t[0], y0 + d + hip[1] + t[1]] : t);
  const def = L.POSES[c.pose || "stand"] || L.POSES.stand, roots = [a.abL, a.abR];
  const arms = [0, 1].map((i) => {
    const t0 = i ? c.hr : c.hl;
    if (!t0) return def[i];
    if (t0[2] === "arm") return ik(sin(t0[0]) * (t0[1] || 110), -cos(t0[0]) * (t0[1] || 110), A1, A2, (i ? c.pr : c.pl) || [sin(t0[0]) * 0.5, 0.2]); // [deg from straight up (+ = right), length, "arm"]: a straight arm in a direction
    const t = tgt(t0);
    const T = toLocal([t[0] - x0, t[1] - y0]), side = i ? 1 : -1;
    return ik((T[0] - roots[i][0]) / s, (T[1] - roots[i][1]) / s, A1, A2, (i ? c.pr : c.pl) || [side * 0.5, 0.9]);
  });
  let legs;
  if (c.lt || c.rt) legs = [c.lt ? legT(...c.lt) : L.LEGS.stand[0], c.rt ? legT(...c.rt) : L.LEGS.stand[1]]; // raw leg angles [offset, thigh deg, shin deg] from straight down, + = towards +x
  else if (c.feet) legs = [0, 1].map((i) => {
    const t = c.feet[i]; if (!t) return L.LEGS.stand[i];
    const T = toLocal([t[0] - x0, t[1] - y0]);
    return ik((T[0] - hip[0]) / (s * legK), (T[1] - hip[1]) / (s * legK), T1, T2, (i ? c.kr : c.kl) || [i ? 0.5 : -0.5, 0.3]);
  });
  if (!legs && c.pose && L.POSE_LEGS[c.pose]) legs = L.POSE_LEGS[c.pose]; // e.g. pose "run" brings its own legs
  const nm = "_duo" + ++seq; L.POSES[nm] = arms;
  let inner;
  try { inner = L.useLook(Object.assign({}, L.T, { shadow: false }), () => L.person(Object.assign({}, base, { pose: nm, legs }))); } finally { delete L.POSES[nm]; }
  const body = L.g(inner, `translate(${f1(x0)} ${f1(y0 + d)})${rot ? ` rotate(${r1(rot)} 0 ${f1(hip[1])})` : ""}`);
  const m = (c.noShadow ? "" : L.shadow(x0 + (c.sx || 0), y0, c.sw || 150 * s * a.W)) + body;
  const over = (r) => { const id = "dc" + ++seq; return `<clipPath id="${id}"><rect x="${f1(r[0])}" y="${f1(r[1])}" width="${f1(r[2])}" height="${f1(r[3])}"/></clipPath><g clip-path="url(#${id})">${body}</g>`; };
  return { m, over, R: a.R, s, hd: fwd(a.hd), sh: fwd(a.sh), hip: fwd(hip), hands: arms.map((ar, i) => fwd([roots[i][0] + ar[1][0] * s, roots[i][1] + ar[1][1] * s])) };
};

// ---------- people parameters (who is in the picture) ----------
const SWAP = { man10: "man01", girl10: "girl01" }, ADULT_OK = [undefined, "regular", "tall", "short", "muscular", "skinny", "chubby", "elderly"];
const letters = "ABCDEFGH", keys = "abcdefgh";
const who = (o, i, def, kind) => {
  const m = Object.assign({}, def, o[letters[i]]);
  if (o[keys[i]]) m.style = o[keys[i]];
  if (o["face" + letters[i]]) m.face = o["face" + letters[i]];
  if (kind === "adult") { // romantic assets: adult proportions only, never kid / teen / baby / chibi
    if (!ADULT_OK.includes(m.body)) m.body = "regular";
    if (SWAP[m.style]) m.style = SWAP[m.style];
  } else if (kind === "kid" && !m.body) m.body = "kid";
  return m;
};
// scene accumulator: Z.f(i, defaults, geometry) draws person i; Z.add(markup) adds props/effects in draw order
const mkZ = (o, kind) => {
  const parts = [], Z = {
    o, add: (m) => (parts.push(m), Z), p: (i, def) => who(o, i, def, kind),
    f: (i, def, geo) => { const f = fig(Object.assign({}, who(o, i, def, kind), geo)); parts.push(f.m); return f; },
    out: () => parts.join(""),
  };
  return Z;
};

// ---------- small drawing kit (everything through tokens) ----------
const heartD = (x, y, k) => `M${f1(x)} ${f1(y + 9 * k)} C${f1(x - 15 * k)} ${f1(y - 2 * k)} ${f1(x - 9 * k)} ${f1(y - 15 * k)} ${f1(x)} ${f1(y - 6 * k)} C${f1(x + 9 * k)} ${f1(y - 15 * k)} ${f1(x + 15 * k)} ${f1(y - 2 * k)} ${f1(x)} ${f1(y + 9 * k)} Z`;
const heart = (x, y, k = 1, c = "red") => L.shape(heartD(x, y, k), c, { w: "detail" });
const hearts = (x, y, k = 1, n = 3) => [[0, 0, 1.3, "red"], [-26, 22, 0.85, "pink"], [28, 12, 1, "pink"], [8, -30, 0.7, "red"], [-12, -22, 0.6, "pink"]].slice(0, n).map(([dx, dy, kk, c]) => heart(x + dx * k, y + dy * k, kk * k, c)).join("");
const sparkle = (x, y, r = 12) => L.flat(L.star(x, y, r, r * 0.3, 4, -90), "gold");
const box = (x, y, w, h, c, r = 6, o) => L.shape(L.rrect(x, y, w, h, r), c, Object.assign({ w: "detail" }, o));
const ell = (x, y, rx, ry, c, o) => L.shape(L.circ(x, y, rx, ry), c, Object.assign({ w: "detail" }, o));
const ln = (a, b, o) => L.stroke(L.line(a, b), Object.assign({ w: "detail" }, o));
// any existing library asset, placed + scaled (empty string if it is missing, so a rename elsewhere never breaks a duo)
const use = (name, x, y, k = 1, o, rot = 0) => (L.get(name) ? L.g(L.inline(name, o || {}), `translate(${f1(x)} ${f1(y)})${rot ? ` rotate(${rot})` : ""} scale(${k})`) : "");
// sun / moon + stars in a corner of the picture
const sky = (time, x, y, k = 1) => {
  if (time === "night") return L.flat(L.circ(x, y, 38 * k), "cream") + L.flat(L.circ(x - 10 * k, y - 8 * k, 6 * k), "gray", 0.35) + L.flat(L.circ(x + 12 * k, y + 10 * k, 8 * k), "gray", 0.3) + [[-95, 25, 9], [-60, -40, 7], [70, -50, 8], [105, 18, 6]].map(([dx, dy, r]) => sparkle(x + dx * k, y + dy * k, r * k)).join("");
  if (time === "sunset") return L.flat(L.circ(x, y, 42 * k), "orange", 0.95) + L.flat(L.circ(x, y, 56 * k), "orange", 0.25);
  return L.flat(L.circ(x, y, 38 * k), "yellow") + Array.from({ length: 8 }, (_, i) => L.stroke(L.line([x + cos(i * 45) * 52 * k, y + sin(i * 45) * 52 * k], [x + cos(i * 45) * 68 * k, y + sin(i * 45) * 68 * k]), { c: "yellow", w: "detail" })).join("");
};
// speech / shout marks
const shout = (x, y, t, k = 1, c = "yellow") => L.shape(L.star(x, y, 36 * k, 22 * k, 9, -90), c, { w: "detail" }) + L.text(t, x, y + 10 * k, { size: 30 * k });
const motion = (x, y, dir = 1, n = 3, k = 1) => Array.from({ length: n }, (_, i) => ln([x, y + i * 14 * k], [x - dir * (26 - i * 4) * k, y + i * 14 * k], { c: "gray" })).join("");

// ---------- registration ----------
// wrap: assets are drawn at s = 1 and scaled as one group; line widths are corrected so they follow √s like single people
const wrap = (fn) => (o) => {
  const S = o.s || 1; if (S === 1) return fn(o);
  const k = Math.pow(S, -0.5), line = {}; Object.keys(L.T.line).forEach((n) => (line[n] = L.T.line[n] * k));
  return L.g(L.useLook(Object.assign({}, L.T, { line }), () => fn(o)), `scale(${S})`);
};
const COUNT = {};
// A(name, label, group, tags, box, build(o, Z), { kind: "adult" | "kid", demo, def (default cast ids for the call line) })
const A = (name, label, group, tags, box, build, opt = {}) => {
  COUNT[group] = (COUNT[group] || 0) + 1;
  const o0 = opt.demo || {}, ex = opt.call || '{ a: "man01", b: "girl01", faceA, faceB, s }';
  L.reg(CAT, name, wrap((o) => { const Z = mkZ(o, opt.kind), r = build(o, Z); return typeof r === "string" ? r : Z.out(); }), { box, group, label, selfScale: true, wide: opt.wide !== undefined ? opt.wide : box[2] >= 600,
    tags: ["duo", "group", "people", ...tags], call: `L.put(S, "${name}", x, gy, ${ex})`, demo: o0 });
};
// time-of-day set: registers name-day / -sunset / -night from one builder (times: which of the three)
const TV = (times, name, label, group, tags, box, build, opt = {}) => times.forEach((t) => A(`${name}-${t}`, `${label} · ${t}`, group, [...tags, t, "time"], box, (o, Z) => build(Object.assign({}, o, { time: t }), Z), Object.assign({}, opt, { demo: Object.assign({ time: t }, opt.demo), call: opt.call || `{ a: "man01", b: "girl01", time: "${t}", s }` })));
const T3 = (...a) => TV(["day", "sunset", "night"], ...a);
const TD2 = (...a) => TV(["day", "sunset"], ...a);

// ---------- shared props (own simple drawings so sizes fit the people; all through tokens) ----------
const sitDrop = (seat) => 120 + seat;                       // hip drop that puts a regular adult's hip on a seat whose top is at y = seat (negative)
const SIT = { lt: [0, 88, 0], rt: [14, 88, 0] };            // thighs to the right, shins down (same as the library's sit-chair pose)
const SITL = { lt: [-14, -88, 0], rt: [0, -88, 0] };        // mirrored: legs to the left
const walkF = (x, ph = 0, k = 1) => (ph ? [[x - 36 * k, 0], [x + 38 * k, -8]] : [[x - 38 * k, -8], [x + 36 * k, 0]]); // walking feet (world)
const benchBack = (cx, w = 300, seat = -62) => box(cx - w / 2 + 10, seat - 110, 14, 110 + 16, "gray", 3) + box(cx + w / 2 - 24, seat - 110, 14, 126, "gray", 3)
  + box(cx - w / 2, seat - 112, w, 22, "wood", 6) + box(cx - w / 2, seat - 80, w, 22, "wood", 6);
const benchSeat = (cx, w = 300, seat = -62) => box(cx - w / 2 + 14, seat + 14, 14, -seat - 14, "gray", 3) + box(cx + w / 2 - 28, seat + 14, 14, -seat - 14, "gray", 3) + box(cx - w / 2 - 6, seat, w + 12, 18, "wood", 6);
const sofaBack = (cx, w = 320, seat = -64) => box(cx - w / 2 + 22, seat - 108, w - 44, 120, "red", 24) + box(cx - w / 2 + 12, -14, 18, 14, "wood", 3) + box(cx + w / 2 - 30, -14, 18, 14, "wood", 3);
const table = (cx, w = 220, top = -96, c = "wood") => box(cx - w / 2 + 12, top + 12, 14, -top - 12, c, 3, { tone: 2 }) + box(cx + w / 2 - 26, top + 12, 14, -top - 12, c, 3, { tone: 2 }) + box(cx - w / 2, top, w, 16, c, 6);
const stool = (cx, top = -62, w = 70) => box(cx - w / 2 + 8, top + 8, 10, -top - 8, "wood", 2, { tone: 2 }) + box(cx + w / 2 - 18, top + 8, 10, -top - 8, "wood", 2, { tone: 2 }) + box(cx - w / 2, top, w, 14, "wood", 6);
const blanket = (cx, w = 420, y = 0, c = "red") => L.shape(L.poly([[cx - w / 2 + 34, y - 26], [cx + w / 2 - 34, y - 26], [cx + w / 2, y + 4], [cx - w / 2, y + 4]], true), c, { w: "detail" })
  + [-0.5, -0.17, 0.17, 0.5].map((t) => L.stroke(L.line([cx + t * (w - 80), y - 26], [cx + t * w * 1.04, y + 4]), { c: "white", w: "hair", op: 0.8 })).join("") + L.stroke(L.line([cx - w / 2 + 14, y - 11], [cx + w / 2 - 14, y - 11]), { c: "white", w: "hair", op: 0.8 });
const bush = (cx, y, w = 170, h = 130) => L.shape(L.smooth([[cx - w / 2, y], [cx - w / 2 - 6, y - h * 0.45], [cx - w * 0.28, y - h * 0.9], [cx, y - h], [cx + w * 0.3, y - h * 0.92], [cx + w / 2 + 6, y - h * 0.45], [cx + w / 2, y], [cx - w / 2, y]]), "green", { w: "prop" }) + L.flat(L.circ(cx - w * 0.2, y - h * 0.6, w * 0.07, w * 0.05), "white", 0.35);
const lampNight = (x, k = 0.9) => use("lamp-post-night", x, 0, k);
const rainFall = (seed, x0, x1, y0, y1, n, skip) => { const r = L.rng(seed); return Array.from({ length: n }, () => { const x = x0 + r() * (x1 - x0), y = y0 + r() * (y1 - y0); return skip && skip(x, y) ? "" : L.stroke(L.line([x, y], [x - 9, y + 26]), { c: "water", w: "detail", op: 0.75 }); }).join(""); };
const bubbleD = (x, y, w, h, tx) => L.shape(L.rrect(x, y, w, h, 18), "white", { w: "detail" }) + L.shape(L.poly([[x + w * 0.3, y + h - 2], [x + w * 0.3 + 14, y + h + 22], [x + w * 0.3 + 28, y + h - 2]], false), "white", { w: "detail" });
const glow = (x, y, r, c = "yellow", op = 0.22) => L.flat(L.circ(x, y, r), c, op) + L.flat(L.circ(x, y, r * 0.62), c, op);
const notes = (x, y, k = 1) => use("fx-music-notes", x, y, 0.5 * k);
const ground = (w, c = "grass", y = 0) => L.flat(L.circ(0, y, w / 2, w * 0.045), c, 0.55);
const confetti = (x, y, k = 1) => [[-90, 0, "red", 20], [-40, -30, "blue", -10], [30, -10, "gold", 40], [80, 10, "green", -30], [-10, 25, "pink", 15], [60, -40, "purple", 60], [-70, 40, "orange", -40]].map(([dx, dy, c, r]) => L.g(L.shape(L.rect(-7, -4, 14, 8), c, { w: "hair" }), `translate(${x + dx * k} ${y + dy * k}) rotate(${r})`)).join("");
const groundT = (t, w = 520, y = 0) => L.flat(L.circ(0, y + 4, w / 2, w * 0.05), t === "night" ? "navy" : "grass", t === "night" ? 0.6 : 0.5);
const skyT = (t, x = 170, y = -440, k = 1) => sky(t, x, y, k) + (t === "night" ? "" : t === "sunset" ? use("cloud-puffy", x - 250, y + 40, 0.35, { time: "sunset" }) : use("cloud-puffy", x - 260, y + 20, 0.35));
const flowerD = (x, y, k = 1, c = "pink") => [0, 72, 144, 216, 288].map((a) => ell(x + cos(a - 90) * 8 * k, y + sin(a - 90) * 8 * k, 7.5 * k, 7.5 * k, c, { w: "hair", flat: true })).join("") + ell(x, y, 5 * k, 5 * k, "yellow", { w: "hair", flat: true });
const bouquetD = (x, y) => L.stroke(L.line([x, y + 26], [x, y]), { c: "green", w: "char" }) + [[-14, -14, "pink"], [14, -14, "red"], [0, -26, "yellow"], [-6, -4, "red"], [8, -4, "pink"]].map(([dx, dy, c]) => flowerD(x + dx, y + dy, 1.0, c)).join("");
const umbrellaShaft = (cx, cy, hx, hy) => L.stroke(L.line([cx, cy - 4], [hx, hy]), { c: "ink", w: "prop" });
const umbrellaD = (cx, cy, r, hx, hy, c = "red") => L.shape(`M${f1(cx - r)} ${f1(cy)} A${f1(r)} ${f1(r * 0.62)} 0 0 1 ${f1(cx + r)} ${f1(cy)} Q${f1(cx + r * 0.67)} ${f1(cy + 26)} ${f1(cx + r / 3)} ${f1(cy)} Q${f1(cx)} ${f1(cy + 26)} ${f1(cx - r / 3)} ${f1(cy)} Q${f1(cx - r * 0.67)} ${f1(cy + 26)} ${f1(cx - r)} ${f1(cy)} Z`, c, { w: "prop" })
  + L.stroke(L.line([cx, cy - r * 0.62], [cx + r / 3, cy]), { c: "ink", w: "detail" }) + L.stroke(L.line([cx, cy - r * 0.62], [cx - r / 3, cy]), { c: "ink", w: "detail" }) + L.stroke(L.line([cx, cy - r * 0.62], [cx, cy - r * 0.62 - 12]), { c: "ink", w: "prop" });
const sitF = (x, gap = 30) => ({ feet: [[x - gap, 0], [x + gap, 0]], kl: [-1, -0.25], kr: [1, -0.25] }); // seated, facing us: knees out, shins down (draw the seat front AFTER the people)
const sofaSeat = (cx, w = 320, seat = -64) => box(cx - w / 2 + 12, seat - 2, w - 24, 56, "red", 14, { tone: 1 }) + box(cx - w / 2, seat - 46, 44, 108, "red", 18) + box(cx + w / 2 - 44, seat - 46, 44, 108, "red", 18);

// =============================================================== HUGS & GREETINGS
const G1 = "Hugs & greetings";
A("duo-hug", "Hug", G1, ["hug", "embrace", "friends", "together", "love", "cuddle", "boy", "girl"], [-190, -440, 380, 460], (o, Z) => {
  const x = 46;
  const a = Z.f(0, { style: "man03", face: "duo-glad" }, { x: -x, rot: 3, hr: [x + 34, -226], pr: [0, -1], hl: [-x - 52, -150], pl: [-1, 0.4] });
  Z.f(1, { style: "girl03", face: "duo-glad" }, { x, rot: -3, hl: [-x - 34, -214], pl: [0, -1], hr: [x + 52, -150], pr: [1, 0.4] });
  Z.add(a.over([-x + 44, -250, 150, 80]));
  Z.add(hearts(0, -420, 1, 3));
}, { call: '{ a: "man03", b: "girl03", faceA, faceB, s }' });

A("duo-group-hug", "Group hug", G1, ["hug", "group", "group hug", "trio", "friends", "team", "together", "three", "family"], [-230, -440, 460, 460], (o, Z) => {
  Z.f(0, { style: "girl01", face: "duo-glad" }, { x: -92, rot: 7, hr: [40, -196], pr: [0, 1] });
  Z.f(2, { style: "man03", face: "duo-glad" }, { x: 92, rot: -7, hl: [-40, -196], pl: [0, 1] });
  Z.f(1, { style: "man06", face: "duo-glad" }, { x: 0, hl: [-112, -246], hr: [112, -246], pl: [-0.3, 1], pr: [0.3, 1] });
  Z.add(hearts(0, -420, 1, 4));
}, { call: '{ a: "girl01", b: "man06", c: "man03", faceA, faceB, faceC, s }' });

A("duo-high-five", "High five", G1, ["high-five", "highfive", "friends", "celebrate", "team", "boy", "girl", "success"], [-230, -420, 460, 440], (o, Z) => {
  Z.f(0, { style: "man01", face: "excited" }, { x: -96, hr: [0, -316], pr: [0.3, 1], rot: 3 });
  Z.f(1, { style: "girl01", face: "excited" }, { x: 96, hl: [0, -316], pl: [-0.3, 1], rot: -3 });
  Z.add(ell(0, -316, 15, 15, "s2") + [[0, -340, 0, -366], [-20, -334, -36, -354], [20, -334, 36, -354]].map(([a, b, c, d]) => ln([a, b], [c, d], { c: "gold", w: "char" })).join("") + sparkle(-52, -380, 10) + sparkle(54, -376, 8));
});

A("duo-fist-bump", "Fist bump", G1, ["fist-bump", "fist", "bump", "friends", "respect", "cool", "boy", "girl"], [-230, -400, 460, 420], (o, Z) => {
  Z.f(0, { style: "man06", face: "smug" }, { x: -100, hr: [-10, -196] });
  Z.f(1, { style: "man04", face: "smile" }, { x: 100, hl: [10, -196] });
  Z.add(ell(-9, -196, 15, 13, "s2") + ell(9, -196, 15, 13, "s2") + [[0, -226, 0, -250], [-22, -218, -38, -234], [22, -218, 38, -234]].map(([a, b, c, d]) => ln([a, b], [c, d], { c: "gold", w: "char" })).join(""));
}, { call: '{ a: "man06", b: "man04", faceA, faceB, s }' });

A("duo-handshake", "Handshake", G1, ["handshake", "shake", "deal", "meeting", "business", "greeting", "agree", "man", "woman"], [-230, -400, 460, 420], (o, Z) => {
  Z.f(0, { style: "man01", face: "smile", outfit: "suit", outfitC: "navy" }, { x: -100, hr: [0, -196], pr: [0.3, 1] });
  Z.f(1, { style: "girl01", face: "smile", outfit: "suit", outfitC: "gray" }, { x: 100, hl: [0, -196], pl: [-0.3, 1] });
  Z.add(ell(0, -196, 17, 13, "s2"));
});

A("duo-wave-hello", "Waving hello", G1, ["wave", "hello", "hi", "greeting", "goodbye", "friends", "boy", "girl", "bye"], [-230, -420, 460, 440], (o, Z) => {
  Z.f(0, { style: "man08", face: "happy" }, { x: -112, hr: [-30, -326], pr: [1, 0.5] });
  Z.f(1, { style: "girl08", face: "happy" }, { x: 112, hl: [30, -326], pl: [-1, 0.5] });
  Z.add([-1, 1].map((sd) => L.stroke(L.arc(sd * 30, -350, 22, sd < 0 ? 200 : 340, sd < 0 ? 330 : 210, 22), { c: "gray", w: "detail" }) + L.stroke(L.arc(sd * 30, -350, 36, sd < 0 ? 200 : 340, sd < 0 ? 330 : 210, 36), { c: "gray", w: "detail" })).join(""));
}, { call: '{ a: "man08", b: "girl08", faceA, faceB, s }' });

A("duo-cheers", "Cheers (clinking glasses)", G1, ["cheers", "toast", "drink", "glasses", "celebrate", "friends", "party", "clink", "man", "woman"], [-230, -420, 460, 440], (o, Z) => {
  Z.f(0, { style: "man01", face: "happy", outfit: "hoodie", outfitC: "teal" }, { x: -92, hr: [-8, -240], pr: [0.2, 1] });
  Z.f(1, { style: "girl01", face: "happy" }, { x: 92, hl: [8, -240], pl: [-0.2, 1] });
  const glass = (sd) => L.g(L.shape(L.poly([[-13, -20], [13, -20], [10, 22], [-10, 22]], true), "glass", { w: "detail" }) + L.flat(L.poly([[-11.5, -4], [11.5, -4], [9.5, 20], [-9.5, 20]], true), sd < 0 ? "orange" : "red", 0.85), `translate(${sd * 17} -248) rotate(${sd * 18})`);
  Z.add(glass(-1) + glass(1) + sparkle(0, -292, 12) + sparkle(-22, -280, 7) + sparkle(24, -282, 7));
});

A("duo-friends-hands-on-shoulders", "Buddies (arms on shoulders)", G1, ["friends", "buddies", "trio", "together", "team", "arms around", "shoulder", "group", "three"], [-230, -420, 460, 440], (o, Z) => {
  const a = Z.f(0, { style: "man05", face: "happy" }, { x: -104, hr: [-30, -200] });
  const c = Z.f(2, { style: "girl05", face: "happy" }, { x: 104, hl: [30, -200] });
  Z.f(1, { style: "man09", face: "laugh" }, { x: 0, hl: [-76, -250], pl: [-0.3, 1], hr: [76, -250], pr: [0.3, 1] });
}, { call: '{ a: "man05", b: "man09", c: "girl05", faceA, faceB, faceC, s }' });

A("duo-help-up", "Helping a friend up", G1, ["help", "helping", "friends", "kindness", "pull up", "support", "boy", "girl", "fall"], [-230, -380, 460, 400], (o, Z) => {
  Z.f(1, { style: "girl03", face: "embarrassed", body: "kid" }, { x: 80, drop: 80, hl: [8, -176], pl: [0, 1], feet: [[80 + 78, -4], [80 + 118, 0]], kl: [0.4, -1], kr: [0.4, -1], hr: [80 + 58, -22], pr: [1, 0.6] });
  Z.f(0, { style: "man03", face: "smile", body: "kid" }, { x: -70, hr: [8, -176], pr: [0.3, 1], rot: 6, sx: 20 });
  Z.add(sparkle(-10, -250, 9));
}, { kind: "kid", call: '{ a: "man03", b: "girl03", faceA, faceB, s }' });

A("duo-celebrate-jump", "Jumping for joy together", G1, ["jump", "celebrate", "joy", "win", "success", "friends", "team", "together", "cheer", "excited"], [-230, -520, 460, 540], (o, Z) => {
  Z.f(0, { style: "man01", face: "excited" }, { x: -80, drop: -34, hr: [0, -358], pr: [0.2, 1], hl: [-120, -330], pl: [-1, 0.2], feet: [[-110, -30], [-50, -44]], kl: [-1, 0.2], kr: [1, 0.3], rot: -3 });
  Z.f(1, { style: "girl01", face: "excited" }, { x: 80, drop: -34, hl: [0, -358], pl: [-0.2, 1], hr: [120, -330], pr: [1, 0.2], feet: [[50, -44], [110, -30]], kl: [-1, 0.3], kr: [1, 0.2], rot: 3 });
  Z.add(confetti(0, -460, 1));
}, { call: '{ a: "man01", b: "girl01", faceA, faceB, s }' });

// =============================================================== DANCE
const G2 = "Dance";
const note2 = (x, y) => use("fx-music-notes", x, y, 0.42);
A("duo-dance-waltz", "Waltz", G2, ["dance", "dancing", "waltz", "ballroom", "couple", "pair", "together", "man", "woman", "love"], [-230, -420, 460, 440], (o, Z) => {
  Z.f(0, { style: "man04", face: "duo-glad", outfit: "suit", outfitC: "navy" }, { x: -78, rot: -5, hr: [-2, -318], pr: [0.5, 1], hl: [-62, 100, "arm"], feet: [[-120, 0], [-52, -8]], kr: [0.6, 0.4] });
  Z.f(1, { style: "girl04", face: "duo-glad", outfit: "dress", outfitC: "purple" }, { x: 78, rot: 5, hl: [2, -318], pl: [-0.5, 1], hr: [118, 90, "arm"], feet: [[52, -8], [120, 0]], kl: [-0.6, 0.4] });
  Z.add(note2(-176, -330) + sparkle(176, -340, 10) + sparkle(-150, -250, 7));
}, { kind: "adult", call: '{ a: "man04", b: "girl04", faceA, faceB, s }' });

A("duo-dance-swing", "Swing dance", G2, ["dance", "dancing", "swing", "jive", "lindy", "couple", "pair", "retro", "man", "woman", "fun"], [-250, -440, 500, 460], (o, Z) => {
  Z.f(0, { style: "man03", face: "excited", outfit: "suit", outfitC: "orange" }, { x: -84, rot: -8, hr: [0, -196], pr: [0.3, 1], hl: [-38, 110, "arm"], feet: [[-142, -42], [-44, 0]], kl: [-1, 0.2] });
  Z.f(1, { style: "girl03", face: "excited", outfit: "dress", outfitC: "teal" }, { x: 84, rot: 8, hl: [0, -196], pl: [-0.3, 1], hr: [38, 110, "arm"], feet: [[44, 0], [142, -42]], kr: [1, 0.2] });
  Z.add(note2(-6, -400) + sparkle(-190, -300, 9) + sparkle(190, -300, 9));
}, { kind: "adult", call: '{ a: "man03", b: "girl03", faceA, faceB, s }' });

A("duo-dance-disco", "Disco pair", G2, ["dance", "dancing", "disco", "party", "retro", "pair", "couple", "friends", "club", "man", "woman"], [-240, -520, 480, 540], (o, Z) => {
  const ball = L.stroke(L.line([0, -520], [0, -468]), { c: "gray", w: "detail" }) + L.shape(L.circ(0, -440, 30), "gray", { w: "detail" }) + L.stroke(L.arc(0, -440, 30, 20, 160, 10), { c: "white", w: "hair" }) + L.stroke(L.line([-30, -440], [30, -440]), { c: "white", w: "hair" }) + L.stroke(L.line([0, -470], [0, -410]), { c: "white", w: "hair" }) + sparkle(-52, -470, 9) + sparkle(54, -430, 7) + sparkle(24, -400, 6);
  Z.add(ball);
  Z.f(0, { style: "man01", face: "wink", outfit: "hawaiian", outfitC: "purple", acc: ["sunglasses"] }, { x: -92, hr: [48, 110, "arm"], pose: "hips", feet: [[-150, 0], [-34, 0]], rot: -4, drop: 12 });
  Z.f(1, { style: "girl01", face: "excited", outfit: "dress", outfitC: "pink" }, { x: 92, hl: [-48, 110, "arm"], pose: "hips", feet: [[34, 0], [150, 0]], rot: 4, drop: 12 });
  Z.add(L.flat(L.circ(0, -300, 1), "ink", 0));
}, { kind: "adult" });

A("duo-dance-hiphop", "Hip-hop pair", G2, ["dance", "dancing", "hip-hop", "hiphop", "street", "cool", "pair", "friends", "breakdance", "boy", "girl"], [-240, -440, 480, 460], (o, Z) => {
  Z.f(0, { style: "man09", face: "smug", outfit: "hoodie", outfitC: "red", acc: ["cap"], accC: "ink" }, { x: -100, drop: 26, hr: [-100 + 100, -382], pr: [0.5, 1], hl: [-44, 36, "sh"], pl: [-1, 0.2], feet: [[-100 - 74, 0], [-100 + 74, 0]], kl: [-1, 0.3], kr: [1, 0.3], rot: -4 });
  Z.f(1, { style: "girl09", face: "proud", outfit: "hoodie", outfitC: "yellow", acc: ["sunglasses"] }, { x: 100, drop: 26, hl: [100 - 30, -306], pl: [-1, 0.2], hr: [100 + 44, -318], pr: [1, 0.2], feet: [[100 - 74, 0], [100 + 74, 0]], kl: [-1, 0.3], kr: [1, 0.3], rot: 4 });
  Z.add(motion(-196, -240, 1, 3) + motion(196, -240, -1, 3));
}, { call: '{ a: "man09", b: "girl09", faceA, faceB, s }' });

A("duo-dance-salsa", "Salsa", G2, ["dance", "dancing", "salsa", "latin", "tango", "couple", "pair", "together", "man", "woman", "love"], [-240, -420, 480, 440], (o, Z) => {
  Z.f(0, { style: "man06", face: "duo-glad", outfit: "suit", outfitC: "ink" }, { x: -66, rot: -7, hr: [0, -246], pr: [0.3, 1], hl: [-70, 100, "arm"], feet: [[-110, 0], [-34, -10]], kr: [0.6, 0.4] });
  Z.f(1, { style: "girl06", face: "excited", outfit: "dress", outfitC: "red" }, { x: 66, rot: 7, hl: [0, -246], pl: [-0.3, 1], hr: [112, 100, "arm"], feet: [[34, -10], [110, 0]], kl: [-0.6, 0.4] });
  Z.add(note2(0, -390) + sparkle(-170, -330, 9) + sparkle(176, -300, 9));
}, { kind: "adult", call: '{ a: "man06", b: "girl06", faceA, faceB, s }' });

A("duo-dance-spin", "Spin (twirling partner)", G2, ["dance", "dancing", "spin", "twirl", "turn", "couple", "pair", "man", "woman", "fun"], [-250, -460, 500, 480], (o, Z) => {
  Z.add(L.stroke(L.arc(66, -120, 118, 200, 340, 28, 20), { c: "gray", w: "detail", dash: "10 12" }) + L.stroke(L.arc(66, -80, 130, 20, 160, 28, 16), { c: "gray", w: "detail", dash: "10 12" }));
  Z.f(0, { style: "man01", face: "happy", outfit: "suit", outfitC: "blue" }, { x: -96, hr: [-6, -366], pr: [0.5, 1], hl: [-110, 40, "sh"], pl: [-1, 0.2], feet: [[-132, 0], [-60, 0]] });
  Z.f(1, { style: "girl01", face: "laugh", outfit: "dress", outfitC: "orange" }, { x: 80, hl: [-6, -366], pl: [-0.5, 1], hr: [184, -320], pr: [1, 0.3], rot: 8, feet: [[48, 0], [112, -14]], kr: [1, 0.2] });
  Z.add(sparkle(190, -362, 10) + sparkle(-170, -330, 8));
}, { kind: "adult" });

A("duo-kids-twirl", "Kids twirling", G2, ["dance", "kids", "children", "twirl", "spin", "play", "friends", "boy", "girl", "together", "dancing"], [-230, -320, 460, 340], (o, Z) => {
  Z.add(L.stroke(L.arc(0, -100, 150, 200, 340, 28, 30), { c: "gray", w: "detail", dash: "10 12" }));
  Z.f(0, { style: "man03", face: "laugh" }, { x: -68, rot: -14, hr: [0, -122], pr: [0.2, 1], hl: [-150, -200], pl: [-1, 0.3], feet: [[-110, 0], [-40, -6]] });
  Z.f(1, { style: "girl03", face: "laugh" }, { x: 68, rot: 14, hl: [0, -122], pl: [-0.2, 1], hr: [150, -200], pr: [1, 0.3], feet: [[40, -6], [110, 0]] });
  Z.add(sparkle(-170, -250, 10) + sparkle(170, -250, 10));
}, { kind: "kid", call: '{ a: "man03", b: "girl03", faceA, faceB, s }' });

A("duo-dance-group", "Group dance (four)", G2, ["dance", "dancing", "group", "party", "friends", "four", "crowd", "celebrate", "fun"], [-340, -480, 680, 500], (o, Z) => {
  Z.f(0, { style: "man01", face: "excited" }, { x: -240, hl: [-60, -322], pl: [-1, 0.5], hr: [30, -170], pr: [1, 0.6], drop: -20, feet: [[-262, -20], [-210, -34]], kr: [1, 0.2] });
  Z.f(1, { style: "girl05", face: "laugh", outfit: "dress", outfitC: "teal" }, { x: -80, hl: [-70, -330], pl: [-1, 0.3], hr: [70, -330], pr: [1, 0.3] });
  Z.f(2, { style: "man06", face: "wink" }, { x: 80, hl: [-40, 40, "sh"], pl: [-1, 0.3], hr: [60, -352], pr: [1, 0.4], drop: 20, feet: [[44, 0], [128, 0]], kl: [-1, 0.3], kr: [1, 0.3] });
  Z.f(3, { style: "girl07", face: "excited", outfit: "dress", outfitC: "purple" }, { x: 240, hl: [180, -330], pl: [-1, 0.3], hr: [310, -150], pr: [1, 0.4], drop: -18, feet: [[212, -34], [270, -20]], kl: [-1, 0.2] });
  Z.add(note2(-340, -330) + note2(340, -380));
}, { call: '{ a: "man01", b: "girl05", c: "man06", d: "girl07", faceA, faceB, faceC, faceD, s }' });

A("duo-dance-conga-line", "Conga line (five)", G2, ["dance", "dancing", "conga", "line", "party", "train", "group", "five", "friends", "crowd", "fun"], [-380, -460, 760, 480], (o, Z) => {
  const xs = [-264, -132, 0, 132, 264], st = ["man01", "girl01", "man03", "girl05", "man06"], fc = ["excited", "laugh", "happy", "wink", "excited"];
  xs.forEach((x, i) => {
    const kick = i % 2 === 0, g = { x, drop: kick ? 0 : 0 };
    if (i === 0) Object.assign(g, { hl: [-70, -330], pl: [-1, 0.4], hr: [70, -330], pr: [1, 0.4], feet: [[x - 34, 0], [x + 70, -50]], kr: [1, 0.2], drop: -8 });
    else Object.assign(g, { hl: [x - 92, -230], pl: [-1, 0.8], hr: [x - 98, -224], pr: [-1, 0.6], feet: kick ? [[x - 34, 0], [x + 66, -52]] : [[x - 66, -52], [x + 34, 0]], kr: [1, 0.2], kl: [-1, 0.2] });
    Z.f(i, { style: st[i], face: fc[i] }, g);
  });
  Z.add(note2(-330, -330) + note2(330, -330));
}, { call: '{ a, b, c, d, e (cast ids), s }' });

A("duo-dance-floor-trio", "Dance-floor trio", G2, ["dance", "dancing", "trio", "three", "party", "disco", "club", "friends", "group", "fun"], [-300, -520, 600, 540], (o, Z) => {
  const tile = (x, y, c) => L.flat(L.poly([[x, y], [x + 70, y], [x + 80, y + 18], [x - 10, y + 18]], true), c, 0.55);
  Z.add([[-250, "blue"], [-170, "pink"], [-90, "yellow"], [-10, "teal"], [70, "purple"], [150, "orange"]].map(([x, c], i) => tile(x, -8, c)).join(""));
  Z.add(L.stroke(L.line([0, -520], [0, -480]), { c: "gray", w: "detail" }) + L.shape(L.circ(0, -458, 26), "gray", { w: "detail" }) + L.stroke(L.line([-26, -458], [26, -458]), { c: "white", w: "hair" }) + sparkle(-46, -490, 8) + sparkle(50, -450, 7));
  Z.f(0, { style: "man05", face: "excited" }, { x: -170, hl: [-62, -330], pl: [-1, 0.4], hr: [26, -166], pr: [1, 0.6], feet: [[-212, 0], [-130, -12]], rot: -4 });
  Z.f(1, { style: "girl03", face: "laugh", outfit: "dress", outfitC: "pink" }, { x: 0, hl: [-70, -332], pl: [-1, 0.3], hr: [70, -332], pr: [1, 0.3], drop: -22, feet: [[-34, -22], [34, -22]] });
  Z.f(2, { style: "man08", face: "wink", outfit: "hoodie", outfitC: "teal" }, { x: 170, hr: [248, -330], pr: [1, 0.4], hl: [150, -166], pl: [-1, 0.6], feet: [[130, -12], [212, 0]], rot: 4 });
}, { call: '{ a: "man05", b: "girl03", c: "man08", faceA, faceB, faceC, s }' });

A("duo-kids-dance-circle", "Kids dancing hand in hand", G2, ["dance", "kids", "children", "ring", "circle", "play", "friends", "three", "trio", "boy", "girl", "dancing"], [-300, -400, 600, 420], (o, Z) => {
  Z.f(0, { style: "man03", face: "laugh" }, { x: -150, drop: -14, hr: [-75, -150], pr: [0.2, 1], hl: [-230, -250], pl: [-1, 0.3], feet: [[-176, -14], [-124, -24]], kr: [1, 0.2] });
  Z.f(1, { style: "girl03", face: "happy" }, { x: 0, drop: -14, hl: [-75, -150], pl: [-0.2, 1], hr: [75, -150], pr: [0.2, 1], feet: [[-26, -14], [26, -14]] });
  Z.f(2, { style: "man05", face: "laugh", outfit: "tee", outfitC: "green" }, { x: 150, drop: -14, hl: [75, -150], pl: [-0.2, 1], hr: [230, -250], pr: [1, 0.3], feet: [[124, -24], [176, -14]], kl: [-1, 0.2] });
  Z.add(sparkle(-250, -300, 9) + sparkle(250, -300, 9) + sparkle(0, -330, 9));
}, { kind: "kid", call: '{ a: "man03", b: "girl03", c: "man05", faceA, faceB, faceC, s }' });

// =============================================================== ROMANCE (adults only)
const G3 = "Romance (adults)";
A("duo-kiss-cheek", "Cheek kiss", G3, ["kiss", "cheek", "cheek kiss", "couple", "love", "pair", "together", "romance", "hearts", "man", "woman", "affection"], [-200, -470, 400, 490], (o, Z) => {
  const b = Z.f(1, { style: "girl01", face: "duo-glad", outfit: "dress", outfitC: "pink" }, { x: 54, rot: -2, hl: [-6, -205], pl: [-0.3, 1], hr: [10, -200], pr: [0.3, 1] });
  const a = Z.f(0, { style: "man01", face: "duo-kiss", outfit: "sweater", outfitC: "teal" }, { x: -70, rot: 11, hr: [b.sh[0] - 30, -246], pr: [0.2, 1] });
  Z.add(heart(b.hd[0] - 26, b.hd[1] + 14, 0.5, "red") + hearts(0, -410, 1, 4));
}, { kind: "adult" });

A("duo-kiss-forehead", "Forehead kiss", G3, ["kiss", "forehead", "forehead kiss", "couple", "love", "pair", "together", "romance", "hearts", "gentle", "man", "woman", "affection"], [-200, -460, 400, 480], (o, Z) => {
  const a = Z.f(0, { style: "man04", face: "duo-kiss", outfit: "jacket", outfitC: "green" }, { x: -6, rot: 4, hl: [-82, 40, "sh"], pl: [-1, 0.6], hr: [76, -190], pr: [0.3, 1] });
  Z.f(1, { style: "girl06", face: "duo-glad", body: "short", outfit: "dress", outfitC: "purple" }, { x: 30, hl: [4, -170], pl: [0, 1], hr: [50, -160], pr: [0, 1] });
  Z.add(ell(10, -150, 9, 9, "s2") + ell(54, -150, 9, 9, "s2") + hearts(a.hd[0] + 60, -420, 1, 4));
}, { kind: "adult", call: '{ a: "man04", b: "girl06", faceA, faceB, s }' });

T3("duo-slow-dance", "Slow dance", G3, ["dance", "slow dance", "dancing", "couple", "love", "moon", "hearts", "romance", "pair", "together", "man", "woman", "night", "romantic"], [-230, -520, 460, 540], (o, Z) => {
  const t = o.time;
  Z.add(groundT(t, 420) + sky(t, 160, -450, 1.0));
  const b = Z.f(1, { style: "girl04", face: "duo-glad", outfit: "dress", outfitC: t === "night" ? "purple" : "red" }, { x: 60, rot: -7, hl: [-92, -246], pl: [0, 1], feet: [[28, 0], [92, -8]], kr: [1, 0.3] });
  const a = Z.f(0, { style: "man04", face: "duo-glad", outfit: "suit", outfitC: "navy" }, { x: -60, rot: 7, hr: [90, -180], pr: [0.3, 1], feet: [[-92, -8], [-28, 0]], kl: [-1, 0.3] });
  Z.add(hearts(0, -440, 1.1, 5));
}, { kind: "adult", call: '{ a: "man04", b: "girl04", time: "night", s }' });

T3("duo-couple-walk", "Couple walking hand in hand", G3, ["walk", "walking", "couple", "holding hands", "hand in hand", "love", "stroll", "pair", "together", "romance", "park", "man", "woman"], [-250, -520, 500, 540], (o, Z) => {
  const t = o.time;
  Z.add(groundT(t, 520) + skyT(t, 190, -450, 1.0) + (t === "night" ? lampNight(205, 0.95) : ""));
  Z.f(0, { style: "man01", face: "happy", look: 0.7, outfit: "jacket", outfitC: "blue" }, { x: -62, hr: [0, -150], pr: [0.2, 1], feet: walkF(-62, 0) });
  Z.f(1, { style: "girl01", face: "happy", look: -0.7 }, { x: 62, hl: [0, -150], pl: [-0.2, 1], feet: walkF(62, 1) });
  Z.add(t === "night" ? heart(0, -400, 1, "pink") : "");
}, { kind: "adult" });

TD2("duo-wedding-couple", "Wedding couple under the arch", G3, ["wedding", "married", "bride", "groom", "couple", "marriage", "love", "arch", "petals", "romance", "hearts", "man", "woman", "ceremony"], [-280, -580, 560, 600], (o, Z) => {
  const t = o.time, arc = L.arcPts(0, -330, 168, 180, 360, 18), inn = L.arcPts(0, -330, 146, 360, 180, 18);
  Z.add(sky(t, 230, -530, 0.8) + groundT(t, 560));
  Z.add(box(-170, -330, 24, 330, "white", 6) + box(146, -330, 24, 330, "white", 6) + L.shape(L.poly([...arc, ...inn], true), "white", { w: "detail" })
    + [190, 215, 240, 270, 300, 325, 350].map((a, i) => flowerD(cos(a) * 157, -330 + sin(a) * 157, 1.1, ["pink", "red", "pink", "yellow", "pink", "red", "pink"][i])).join("")
    + [-158, 158].map((x) => [-40, -100, -170, -240].map((y, i) => flowerD(x, y, 0.9, i % 2 ? "red" : "pink")).join("")).join(""));
  const br = Z.f(1, { style: "girl01", face: "duo-glad", outfit: "dress", outfitC: "white", hair: "long", hairC: "brown" }, { x: 56, hl: [0, -150], pl: [-0.2, 1], hr: [106, -178], pr: [1, 0.8] });
  Z.f(0, { style: "man01", face: "happy", outfit: "suit", outfitC: "ink", acc: ["bowtie"], accC: "red" }, { x: -56, hr: [0, -150], pr: [0.2, 1] });
  Z.add(bouquetD(br.hands[1][0], br.hands[1][1]));
  const r = L.rng(7);
  Z.add(Array.from({ length: 16 }, () => { const x = -230 + r() * 460, y = -520 + r() * 480; return L.g(L.flat(L.circ(0, 0, 6, 3.4), "pink", 0.9), `translate(${f1(x)} ${f1(y)}) rotate(${f1(r() * 180)})`); }).join("") + hearts(0, -510, 1.1, 4));
}, { kind: "adult", call: '{ a: "man01", b: "girl01", time: "day", s }' });

A("duo-flower-give", "Giving a flower", G3, ["flower", "give", "giving", "gift", "rose", "couple", "love", "romance", "present", "shy", "man", "woman", "hearts"], [-230, -440, 460, 460], (o, Z) => {
  Z.f(0, { style: "man03", face: "smile", outfit: "jacket", outfitC: "green" }, { x: -100, hr: [0, -206], pr: [0.2, 1], rot: 3 });
  Z.f(1, { style: "girl03", face: "love", outfit: "dress", outfitC: "pink" }, { x: 100, hl: [8, -212], pl: [-0.2, 1], hr: [100 + 34, -190], pr: [0.5, 1], rot: -3 });
  Z.add(L.stroke(L.line([0, -206], [-4, -178]), { c: "green", w: "char" }) + flowerD(2, -214, 1.5, "red") + hearts(96, -420, 0.9, 3));
}, { kind: "adult", call: '{ a: "man03", b: "girl03", faceA, faceB, s }' });

// =============================================================== EVERYDAY: couples, friends, parks, home
const G4 = "Together, everyday";
T3("duo-bench", "Sitting on a park bench", G4, ["bench", "sit", "sitting", "park", "couple", "friends", "pair", "together", "talk", "man", "woman", "holding hands"], [-260, -520, 520, 540], (o, Z) => {
  const t = o.time;
  Z.add(groundT(t, 520) + skyT(t, 200, -450, 1.0));
  Z.add((t === "night" ? lampNight(-210, 0.95) : "") + benchBack(0, 330));
  Z.f(0, { style: "man01", face: "happy", look: 0.7, outfit: "sweater", outfitC: "orange" }, Object.assign({ x: -62, drop: sitDrop(-62), hr: [0, -112], pr: [0.2, 1], noShadow: true }, sitF(-62)));
  Z.f(1, { style: "girl01", face: "laugh", look: -0.7 }, Object.assign({ x: 62, drop: sitDrop(-62), hl: [0, -112], pl: [-0.2, 1], noShadow: true }, sitF(62)));
  Z.add(benchSeat(0, 330));
}, {});

A("duo-sofa-tv", "Watching TV on the sofa", G4, ["tv", "television", "sofa", "couch", "watching", "movie", "couple", "friends", "home", "popcorn", "relax", "man", "woman"], [-250, -330, 640, 350], (o, Z) => {
  Z.add(sofaBack(-20, 340));
  Z.f(0, { style: "man01", face: "happy", look: 1, outfit: "hoodie", outfitC: "purple" }, Object.assign({ x: -90, drop: sitDrop(-64), hr: [-36, -108], pr: [0.5, 1], noShadow: true }, sitF(-90)));
  Z.f(1, { style: "girl01", face: "laugh", look: 1 }, Object.assign({ x: 36, drop: sitDrop(-64), hl: [-36, -108], pl: [-0.5, 1], noShadow: true }, sitF(36)));
  Z.add(sofaSeat(-20, 340) + use("prop-popcorn", -34, -112, 0.34));
  Z.add(box(212, -96, 130, 96, "wood", 8) + use("prop-tv", 277, -186, 0.78));
  Z.add(L.flat(L.circ(277, -186, 74), "sky", 0.18));
}, { call: '{ a: "man01", b: "girl01", faceA, faceB, s }' });

A("duo-cooking-together", "Cooking together", G4, ["cooking", "cook", "kitchen", "chef", "food", "soup", "couple", "friends", "together", "home", "man", "woman", "stirring"], [-250, -490, 500, 510], (o, Z) => {
  Z.add(use("prop-pot", 0, -150, 0.6) + use("fx-steam", 0, -250, 0.55));
  Z.f(0, { style: "man03", face: "happy", outfit: "chef", outfitC: "white", acc: ["chefhat"] }, { x: -112, hr: [-6, -200], pr: [0.3, 1], rot: 3 });
  Z.f(1, { style: "girl03", face: "happy", outfit: "chef", outfitC: "white", acc: ["chefhat"] }, { x: 112, hl: [6, -200], pl: [-0.3, 1], rot: -3 });
  Z.add(L.stroke(L.line([0, -204], [4, -138]), { c: "wood", w: "char" }) + ell(0, -204, 7, 7, "s2", { w: "hair" }));
  Z.add(box(-180, -104, 360, 104, "wood", 8) + box(-188, -118, 376, 20, "gray", 6));
}, { call: '{ a: "man03", b: "girl03", faceA, faceB, s }' });

A("duo-selfie-couple", "Selfie together", G4, ["selfie", "photo", "phone", "camera", "couple", "friends", "pair", "together", "smile", "picture", "man", "woman"], [-250, -440, 500, 460], (o, Z) => {
  Z.f(1, { style: "girl01", face: "happy", outfit: "dress", outfitC: "teal" }, { x: 46, rot: -5, hr: [40, 92, "arm"], pr: [1, 0.6] });
  const a = Z.f(0, { style: "man01", face: "happy", outfit: "hoodie", outfitC: "red" }, { x: -46, rot: 5, hl: [-52, 110, "arm"], pl: [-1, 0.2] });
  const h = a.hands[0];
  Z.add(L.g(box(-13, -22, 26, 44, "navy", 6, { w: "char" }) + ell(0, -8, 4.5, 4.5, "gray", { w: "hair" }), `translate(${f1(h[0] - 8)} ${f1(h[1] - 14)}) rotate(-14)`) + sparkle(h[0] - 30, h[1] - 34, 9));
}, {});

A("duo-selfie-trio", "Group selfie (three)", G4, ["selfie", "group", "photo", "friends", "three", "trio", "phone", "camera", "smile", "picture", "team"], [-280, -460, 560, 480], (o, Z) => {
  Z.f(1, { style: "girl05", face: "laugh", outfit: "dress", outfitC: "purple" }, { x: 0, y: -26, hl: [-44, 36, "sh"], pl: [-1, 0.4], hr: [60, 34, "sh"], pr: [1, 0.5] });
  Z.f(2, { style: "man09", face: "wink", outfit: "tee", outfitC: "yellow" }, { x: 112, rot: -6, hr: [44, 92, "arm"], pr: [1, 0.6] });
  const a = Z.f(0, { style: "man05", face: "excited", outfit: "tee", outfitC: "red" }, { x: -112, rot: 6, hl: [-50, 110, "arm"], pl: [-1, 0.2] });
  const h = a.hands[0];
  Z.add(L.g(box(-13, -22, 26, 44, "navy", 6, { w: "char" }) + ell(0, -8, 4.5, 4.5, "gray", { w: "hair" }), `translate(${f1(h[0] - 8)} ${f1(h[1] - 14)}) rotate(-14)`) + sparkle(h[0] - 30, h[1] - 34, 9));
}, { call: '{ a: "man05", b: "girl05", c: "man09", faceA, faceB, faceC, s }' });

A("duo-share-earbuds", "Sharing earbuds", G4, ["earbuds", "music", "headphones", "listen", "listening", "share", "sharing", "phone", "friends", "couple", "pair", "together", "song"], [-230, -480, 460, 500], (o, Z) => {
  const b = Z.f(1, { style: "girl01", face: "duo-glad", outfit: "hoodie", outfitC: "pink" }, { x: 56, rot: -6, hl: [-6, -168], pl: [-0.3, 1] });
  const a = Z.f(0, { style: "man01", face: "duo-glad", outfit: "tee", outfitC: "green" }, { x: -56, rot: 6, hr: [6, -168], pr: [0.3, 1] });
  const ear = (f, sd) => ell(f.hd[0] + sd * f.R * 0.97, f.hd[1] + 8, 6, 6, "white", { w: "hair" });
  Z.add(L.stroke(L.smooth([[a.hd[0] + a.R * 0.97, a.hd[1] + 14], [-8, -230], [0, -190]]), { c: "gray", w: "detail" }) + L.stroke(L.smooth([[b.hd[0] - b.R * 0.97, b.hd[1] + 14], [8, -230], [0, -190]]), { c: "gray", w: "detail" }) + ear(a, 1) + ear(b, -1));
  Z.add(box(-12, -190, 24, 40, "navy", 5, { w: "char" }) + L.flat(L.rect(-8, -184, 16, 28), "sky"));
  Z.add(use("fx-music-notes", 0, -410, 0.5));
}, {});

A("duo-phone-call-friends", "Friends on a phone call", G4, ["phone", "call", "calling", "talk", "talking", "friends", "long distance", "chat", "pair", "conversation", "telephone", "man", "woman"], [-340, -440, 680, 460], (o, Z) => {
  const ph = (f, sd) => L.g(box(-8, -22, 16, 44, "navy", 4, { w: "detail" }) + L.flat(L.rect(-5, -18, 10, 30), "sky"), `translate(${f1(f.hands[sd < 0 ? 0 : 1][0] + sd * 6)} ${f1(f.hands[sd < 0 ? 0 : 1][1] - 6)}) rotate(${sd * -10})`);
  const a = Z.f(0, { style: "man08", face: "laugh", mouth: "a", look: 0.6 }, { x: -210, hr: [50, -314], pr: [1, 0.8] });
  const b = Z.f(1, { style: "girl08", face: "laugh", mouth: "e", look: -0.6 }, { x: 210, hl: [-50, -314], pl: [-1, 0.8] });
  Z.add(ph(a, 1) + ph(b, -1));
  Z.add(L.stroke(L.arc(0, -300, 130, 215, 325, 10 + 130 * 0.0 + 70, 80), { c: "gray", w: "detail", dash: "6 12" }) + use("fx-music-notes", 0, -420, 0.001));
  Z.add([[-30, 0], [0, 0], [30, 0]].map(([dx], i) => ell(dx, -250, 8, 8, "yellow", { w: "hair" })).join(""));
}, { call: '{ a: "man08", b: "girl08", faceA, faceB, s }' });

TD2("duo-picnic", "Picnic for two", G4, ["picnic", "blanket", "park", "food", "lunch", "sandwich", "couple", "friends", "pair", "together", "outdoors", "man", "woman", "date"], [-300, -440, 600, 470], (o, Z) => {
  const t = o.time;
  Z.add(groundT(t, 600) + skyT(t, 230, -380, 0.9) + blanket(0, 520, 0, "red"));
  Z.add(box(-38, -62, 76, 46, "wood", 8) + L.stroke(L.arc(0, -64, 28, 180, 360, 10, 26), { c: "wood", w: "prop" }) + [-24, -8, 8, 24].map((x) => L.stroke(L.line([x, -60], [x, -20]), { c: "ink", w: "hair", op: 0.35 })).join(""));
  Z.f(0, { style: "man01", face: "happy", look: 0.5, outfit: "tee", outfitC: "blue" }, { x: -196, drop: 112, lt: [0, 88, 90], rt: [10, 84, 86], hr: [-120, -78], pr: [0.5, 1], hl: [-232, -50], pl: [-1, 0.6], noShadow: true });
  Z.f(1, { style: "girl01", face: "laugh", look: -0.5 }, { x: 196, drop: 112, lt: [-10, -84, -86], rt: [0, -88, -90], hl: [120, -78], pl: [-0.5, 1], hr: [232, -50], pr: [1, 0.6], noShadow: true });
  Z.add(use("prop-sandwich", -118, -86, 0.3) + use("prop-juice-box", 112, -84, 0.28) + use("prop-apple", 62, -40, 0.22) + use("prop-cookie", -62, -34, 0.2));
}, {});

TD2("duo-umbrella-share", "Sharing an umbrella in the rain", G4, ["umbrella", "rain", "rainy", "share", "sharing", "couple", "together", "wet", "pair", "weather", "man", "woman", "romance"], [-270, -520, 540, 540], (o, Z) => {
  const t = o.time;
  Z.add(rainFall(5, -250, 250, -520, 0, 60, (x, y) => Math.abs(x) < 160 && y > -400) + L.flat(L.circ(-190, 4, 50, 8), "water", 0.5) + L.flat(L.circ(176, 6, 44, 7), "water", 0.5));
  Z.add(t === "sunset" ? lampNight(-230, 0.9) : "");
  Z.add(umbrellaShaft(0, -392, 4, -284));
  Z.f(0, { style: "man01", face: "happy", outfit: "raincoat", outfitC: "yellow" }, { x: -58, hr: [4, -284], pr: [0.3, 1], rot: 2 });
  Z.f(1, { style: "girl01", face: "happy", outfit: "raincoat", outfitC: "orange" }, { x: 58, hl: [-12, -196], pl: [-0.3, 1], rot: -2 });
  Z.add(umbrellaD(0, -392, 160, 4, -284, "blue"));
}, { kind: "adult", call: '{ a: "man01", b: "girl01", time: "day", s }' });

A("duo-umbrella-kids", "Two kids under one umbrella", G4, ["umbrella", "rain", "rainy", "kids", "children", "friends", "share", "puddle", "raincoat", "boy", "girl", "together", "weather"], [-230, -420, 460, 440], (o, Z) => {
  Z.add(rainFall(9, -220, 220, -420, 0, 46, (x, y) => Math.abs(x) < 120 && y > -330) + L.flat(L.circ(-160, 4, 44, 7), "water", 0.5) + L.flat(L.circ(150, 6, 40, 6), "water", 0.5));
  Z.add(umbrellaShaft(0, -300, 2, -224));
  Z.f(0, { style: "man03", face: "happy", outfit: "raincoat", outfitC: "yellow", body: "kid" }, { x: -48, hr: [0, -216], pr: [0.3, 1] });
  Z.f(1, { style: "girl03", face: "laugh", outfit: "raincoat", outfitC: "red", body: "kid" }, { x: 48, hl: [4, -212], pl: [-0.3, 1] });
  Z.add(umbrellaD(0, -300, 128, 2, -224, "teal"));
}, { kind: "kid", call: '{ a: "man03", b: "girl03", faceA, faceB, s }' });

A("duo-stargazing-night", "Stargazing with a telescope", G4, ["stargazing", "stars", "telescope", "night", "astronomy", "space", "look up", "couple", "friends", "pair", "together", "sky", "moon", "man", "woman"], [-260, -520, 520, 540], (o, Z) => {
  Z.add(groundT("night", 520) + sky("night", -170, -440, 1.0) + use("sky-star-shooting", 140, -430, 0.28));
  Z.add([[-34, 0], [34, 0], [0, 0]].map(([x]) => L.stroke(L.line([0, -150], [x * 1.4, 0]), { c: "gray", w: "prop" })).join("") + L.g(box(-16, -80, 150, 34, "gray", 10, { w: "prop" }) + box(106, -86, 26, 46, "blue", 6), "translate(0 -156) rotate(-38)") + ell(0, -150, 12, 12, "ink", { w: "hair" }));
  Z.f(0, { style: "man01", face: "wow", look: 0.8, outfit: "jacket", outfitC: "teal" }, { x: -120, rot: 5, hr: [-30, -150], pr: [0.5, 1] });
  Z.f(1, { style: "girl01", face: "wow", look: -0.5, outfit: "dress", outfitC: "purple" }, { x: 130, hl: [-70, 100, "arm"], pl: [-1, 0.2], rot: -3, hr: [26, 50, "sh"] });
  Z.add(sparkle(60, -470, 9) + sparkle(-60, -400, 8) + sparkle(200, -330, 8));
}, { call: '{ a: "man01", b: "girl01", faceA, faceB, s }' });

T3("duo-campfire", "Roasting marshmallows by a campfire", G4, ["campfire", "camping", "fire", "marshmallow", "friends", "night", "outdoors", "couple", "pair", "together", "camp", "man", "woman", "kids"], [-300, -440, 600, 460], (o, Z) => {
  const t = o.time;
  Z.add(groundT(t, 600) + skyT(t, 220, -400, 0.9) + (t === "night" ? "" : ""));
  Z.add(box(-216, -34, 132, 34, "wood", 12) + box(84, -34, 132, 34, "wood", 12));
  Z.add(use("campfire", 0, 0, 0.55, { time: t }));
  const A_ = Z.f(0, { style: "man01", face: "happy", look: 0.8, outfit: "hoodie", outfitC: "green" }, Object.assign({ x: -150, drop: sitDrop(-34), hr: [-70, -136], pr: [0.4, 1], noShadow: true }, SIT));
  const B_ = Z.f(1, { style: "girl01", face: "happy", look: -0.8, outfit: "hoodie", outfitC: "orange" }, Object.assign({ x: 150, drop: sitDrop(-34), hl: [70, -136], pl: [-0.4, 1], noShadow: true }, SITL));
  Z.add([[-70, -136, -22, -96], [70, -136, 22, -96]].map(([a, b, c, d]) => L.stroke(L.line([a, b], [c, d]), { c: "wood", w: "detail" }) + ell(c, d, 9, 7, "white", { w: "hair" })).join(""));
}, {});

// =============================================================== PLAY & GAMES
const G5 = "Play & games";
A("duo-piggyback", "Piggyback ride", G5, ["piggyback", "carry", "carrying", "ride", "kid", "child", "parent", "play", "fun", "family", "dad", "mum", "uncle", "friends"], [-210, -460, 420, 480], (o, Z) => {
  const k = Z.f(1, { style: "girl03", face: "laugh", body: "kid" }, { x: 4, y: -150, hr: [34, 110, "arm"], pr: [1, 0.3], hl: [-34, -244], pl: [-0.3, 1], feet: [[-60, -172], [64, -172]], kl: [-1, 0.2], kr: [1, 0.2], noShadow: true });
  Z.f(0, { style: "man06", face: "happy", outfit: "sweater", outfitC: "teal" }, { x: 0, hl: [-58, -158], pl: [-1, 0.6], hr: [58, -158], pr: [1, 0.6] });
  Z.add(k.over([-80, -272, 80, 52]));
}, { call: '{ a: "man06", b: "girl03", faceA, faceB, s }' });

A("duo-shoulder-ride", "Kid on shoulders", G5, ["shoulders", "carry", "kid", "child", "parent", "dad", "mum", "ride", "high", "family", "fun", "play", "parade"], [-210, -480, 420, 500], (o, Z) => {
  const k = Z.f(1, { style: "man03", face: "laugh", body: "kid" }, { x: 0, y: -166, hl: [-46, -326], pl: [-1, 0.4], hr: [46, -326], pr: [1, 0.4], feet: [[-44, -178], [44, -178]], kl: [-0.6, 1], kr: [0.6, 1], noShadow: true });
  Z.f(0, { style: "man01", face: "happy", outfit: "jacket", outfitC: "green" }, { x: 0, hl: [-44, -172], pl: [-1, 0.6], hr: [44, -172], pr: [1, 0.6] });
  Z.add(k.over([-110, -352, 80, 70]) + k.over([30, -352, 80, 70]) + k.over([-70, -268, 140, 100]));
}, { call: '{ a: "man01", b: "man03", faceA, faceB, s }' });

A("duo-carry-sleepy-child", "Carrying a sleepy child", G5, ["carry", "carrying", "sleepy", "sleeping", "child", "kid", "parent", "night", "bedtime", "family", "tired", "zzz", "dad", "mum"], [-210, -420, 420, 440], (o, Z) => {
  Z.f(0, { style: "girl01", face: "smile", look: -0.6, hair: "long", hairC: "brown", outfit: "sweater", outfitC: "purple" }, { x: 12, hl: [-100, -150], pl: [-1, 0.6], hr: [-30, -128], pr: [-0.4, 1] });
  Z.f(1, { style: "man03", face: "sleep", body: "kid", pose: "sad" }, { x: -58, y: -56, noShadow: true });
}, { call: '{ a: "girl01", b: "man03", faceA, faceB, s }' });

A("duo-lift-kid", "Lifting a kid up", G5, ["lift", "lifting", "kid", "child", "parent", "airplane", "fly", "play", "family", "dad", "mum", "fun", "up high"], [-230, -560, 460, 580], (o, Z) => {
  Z.f(1, { style: "girl03", face: "laugh", body: "kid" }, { x: 0, y: -248, hl: [-96, 100, "arm"], pl: [-1, 0.2], hr: [96, 100, "arm"], pr: [1, 0.2], feet: [[-56, -262], [56, -262]], kl: [-1, 0.5], kr: [1, 0.5], noShadow: true });
  Z.f(0, { style: "man04", face: "happy", outfit: "tee", outfitC: "orange" }, { x: 0, hl: [-30, -340], pl: [-0.4, 0.5], hr: [30, -340], pr: [0.4, 0.5] });
  Z.add(sparkle(-130, -400, 10) + sparkle(130, -420, 10));
}, { call: '{ a: "man04", b: "girl03", faceA, faceB, s }' });

const ropeD = (pts, c = "brown") => L.stroke(L.smooth(pts), { c, w: "prop" });
A("duo-tug-of-war", "Tug of war", G5, ["tug of war", "tug", "rope", "pull", "game", "friends", "sports", "teams", "play", "compete", "strong", "fun"], [-310, -400, 620, 420], (o, Z) => {
  Z.f(0, { style: "man09", face: "determined", body: "muscular" }, { x: -130, rot: -15, hl: [-96, -194], pl: [0.3, 1], hr: [-62, -190], pr: [0.3, 1], feet: [[-196, 0], [-100, 0]] });
  Z.f(1, { style: "girl09", face: "laugh" }, { x: 130, rot: 15, hl: [62, -190], pl: [-0.3, 1], hr: [96, -194], pr: [-0.3, 1], feet: [[100, 0], [196, 0]] });
  Z.add(ropeD([[-290, -186], [-130, -192], [0, -198], [130, -192], [290, -186]]) + L.shape(L.poly([[-6, -198], [20, -198], [6, -160]], true), "red", { w: "hair" }) + use("fx-dust-puff", -226, -14, 0.3) + use("fx-dust-puff", 226, -14, 0.3));
}, { call: '{ a: "man09", b: "girl09", faceA, faceB, s }' });

A("duo-tug-of-war-teams", "Tug of war, two teams", G5, ["tug of war", "teams", "team", "rope", "pull", "game", "friends", "sports", "four", "group", "compete", "fun"], [-470, -420, 940, 440], (o, Z) => {
  const L1 = [[-330, "man01", "determined"], [-190, "girl05", "determined"]], R1 = [[190, "man06", "laugh"], [330, "girl03", "laugh"]];
  L1.forEach(([x, st, f], i) => Z.f(i, { style: st, face: f }, { x, rot: -14, hl: [x + 28, -194], pl: [0.3, 1], hr: [x + 62, -190], pr: [0.3, 1], feet: [[x - 70, 0], [x + 30, 0]] }));
  R1.forEach(([x, st, f], i) => Z.f(i + 2, { style: st, face: f }, { x, rot: 14, hl: [x - 62, -190], pl: [-0.3, 1], hr: [x - 28, -194], pr: [-0.3, 1], feet: [[x - 30, 0], [x + 70, 0]] }));
  Z.add(ropeD([[-400, -184], [-200, -192], [0, -198], [200, -192], [400, -184]]) + L.shape(L.poly([[-6, -198], [20, -198], [6, -160]], true), "red", { w: "hair" }));
}, { call: '{ a, b (left team), c, d (right team), s }' });

A("duo-arm-wrestle", "Friendly arm wrestling", G5, ["arm wrestle", "arm wrestling", "strength", "game", "friends", "contest", "compete", "table", "fun", "muscle", "man", "woman"], [-300, -400, 600, 420], (o, Z) => {
  Z.f(0, { style: "man09", face: "determined", body: "muscular" }, { x: -150, rot: 7, hr: [-6, -178], pr: [0.2, 1], hl: [-196, -112], pl: [-1, 0.6] });
  Z.f(1, { style: "girl01", face: "laugh" }, { x: 150, rot: -7, hl: [6, -178], pl: [-0.2, 1], hr: [196, -112], pr: [1, 0.6] });
  Z.add(table(0, 280, -104, "wood") + ell(0, -182, 16, 14, "s2") + [[-18, -214, -28, -234], [18, -214, 28, -234], [0, -220, 0, -244]].map(([a, b, c, d]) => ln([a, b], [c, d], { c: "gray", w: "char" })).join(""));
}, { call: '{ a: "man09", b: "girl01", faceA, faceB, s }' });

A("duo-play-catch", "Playing catch", G5, ["catch", "ball", "throw", "throwing", "play", "kids", "children", "friends", "park", "game", "boy", "girl", "baseball"], [-300, -420, 600, 440], (o, Z) => {
  const a = Z.f(0, { style: "man03", face: "excited", body: "kid" }, { x: -210, hr: [20, 105, "arm"], pr: [0.8, 0.2], feet: [[-232, 0], [-170, 0]] });
  Z.f(1, { style: "girl03", face: "excited", body: "kid" }, { x: 210, hl: [140, -134], pl: [-0.5, 1], hr: [166, -146], pr: [-0.5, 1] });
  const h = a.hands[1];
  Z.add(L.stroke(`M${f1(h[0] + 14)} ${f1(h[1] - 10)} Q0 -420 ${f1(150)} ${f1(-190)}`, { c: "gray", w: "detail", dash: "8 12" }) + use("prop-ball", h[0] + 12, h[1] - 14, 0.22) + use("prop-ball", 20, -300, 0.2));
}, { kind: "kid", call: '{ a: "man03", b: "girl03", faceA, faceB, s }' });

A("duo-tennis-pair", "Tennis pair", G5, ["tennis", "racket", "sport", "match", "game", "play", "friends", "net", "serve", "court", "man", "woman"], [-330, -460, 660, 480], (o, Z) => {
  Z.add(L.shape(L.poly([[-8, -110], [8, -110], [8, 0], [-8, 0]], true), "white", { w: "detail" }) + L.shape(L.poly([[-10, -110], [-70, -90], [-70, -2], [-10, -2]].map((p) => p), true), "white", { w: "detail", op: 0.7 }));
  const a = Z.f(0, { style: "man06", face: "determined", outfit: "athlete", outfitC: "blue" }, { x: -200, hr: [26, 105, "arm"], pr: [0.8, 0.2], rot: -4, feet: [[-240, 0], [-170, 0]] });
  const b = Z.f(1, { style: "girl06", face: "determined", outfit: "athlete", outfitC: "red" }, { x: 200, hl: [-62, -150], pl: [-1, 1], hr: [240, -120], pr: [1, 0.6], rot: 3, feet: [[170, 0], [236, 0]] });
  Z.add(use("sport-tennis-racket", a.hands[1][0] + 8, a.hands[1][1] - 30, 0.55, {}, 25) + use("sport-tennis-racket", b.hands[0][0] - 20, b.hands[0][1] + 10, 0.55, {}, -70) + use("prop-ball", -120, -400, 0.16));
}, { call: '{ a: "man06", b: "girl06", faceA, faceB, s }' });

A("duo-seesaw", "Kids on a seesaw", G5, ["seesaw", "playground", "kids", "children", "play", "friends", "park", "fun", "teeter", "boy", "girl"], [-260, -360, 520, 380], (o, Z) => {
  Z.add(L.shape(L.poly([[-30, 0], [30, 0], [0, -64]], true), "gray", { w: "prop" }) + L.g(box(-210, -14, 420, 16, "wood", 8, { w: "prop" }), "translate(0 -62) rotate(10)"));
  Z.f(0, { style: "man03", face: "laugh", body: "kid" }, { x: -150, y: -14, hl: [-150, -112], hr: [-132, -112], noShadow: true });
  Z.f(1, { style: "girl03", face: "laugh", body: "kid" }, Object.assign({ x: 150, drop: 58, hl: [140, -78], hr: [158, -78], noShadow: true }, sitF(150, 26)));
  Z.add(box(-174, -118, 8, 40, "gray", 3, { w: "detail" }) + box(166, -80, 8, 40, "gray", 3, { w: "detail" }));
}, { kind: "kid", call: '{ a: "man03", b: "girl03", faceA, faceB, s }' });

A("duo-swing-set", "Pushing a child on a swing", G5, ["swing", "swings", "playground", "push", "pushing", "child", "kid", "parent", "mum", "dad", "park", "family", "play", "fun"], [-270, -460, 540, 480], (o, Z) => {
  const sw = -30;
  Z.add(L.stroke(L.line([-200, -400], [-232, 0]), { c: "gray", w: "prop" }) + L.stroke(L.line([200, -400], [232, 0]), { c: "gray", w: "prop" }) + L.stroke(L.line([-210, -400], [210, -400]), { c: "gray", w: "scene", s: 2 }));
  Z.f(0, { style: "man01", face: "happy", outfit: "hoodie", outfitC: "green" }, { x: 88, hl: [-14, -150], pl: [-0.3, 1], hr: [4, -134], pr: [-0.2, 1] });
  Z.add(L.stroke(L.line([sw - 6 - 34, -400], [sw - 34, -52]), { c: "ink", w: "detail" }) + L.stroke(L.line([sw - 6 + 34, -400], [sw + 34, -52]), { c: "ink", w: "detail" }));
  Z.f(1, { style: "girl03", face: "laugh", body: "kid" }, Object.assign({ x: sw, drop: 42, hl: [sw - 34, -160], pl: [-1, 0.5], hr: [sw + 34, -160], pr: [1, 0.5], noShadow: true }, { feet: [[sw - 18, -14], [sw + 18, -14]], kl: [-0.3, -1], kr: [0.3, -1] }));
  Z.add(box(sw - 44, -56, 88, 12, "wood", 5, { w: "detail" }));
}, { call: '{ a: "man01", b: "girl03", faceA, faceB, s }' });

A("duo-jump-rope", "Skipping rope (three kids)", G5, ["skipping", "jump rope", "rope", "kids", "children", "play", "playground", "friends", "three", "trio", "fun", "game", "girl", "boy"], [-300, -420, 600, 440], (o, Z) => {
  Z.f(0, { style: "man03", face: "laugh", body: "kid" }, { x: -206, hr: [-156, -138], pr: [0.5, 1] });
  Z.f(2, { style: "girl05", face: "laugh", body: "kid" }, { x: 206, hl: [156, -138], pl: [-0.5, 1] });
  Z.f(1, { style: "girl10", face: "excited", body: "kid" }, { x: 0, drop: -30, hl: [-60, 100, "arm"], hr: [60, 100, "arm"], pl: [-1, 0.2], pr: [1, 0.2], feet: [[-24, -34], [26, -40]], kl: [-1, 0.3], kr: [1, 0.3] });
  Z.add(L.stroke("M-156 -138 Q0 72 156 -138", { c: "brown", w: "prop" }) + motion(-48, -18, 1, 2, 0.8) + motion(60, -18, -1, 2, 0.8) + sparkle(-90, -300, 9) + sparkle(100, -320, 9));
}, { kind: "kid", call: '{ a: "man03", b: "girl10", c: "girl05", faceA, faceB, faceC, s }' });

A("duo-kids-skipping", "Kids skipping hand in hand", G5, ["skipping", "skip", "hop", "kids", "children", "friends", "holding hands", "play", "happy", "boy", "girl", "together", "walk"], [-230, -330, 460, 350], (o, Z) => {
  Z.f(0, { style: "man05", face: "laugh", body: "kid" }, { x: -58, drop: -16, hr: [0, -130], pr: [0.2, 1], feet: [[-86, -20], [-30, -56]], kr: [1, -0.1] });
  Z.f(1, { style: "girl05", face: "laugh", body: "kid" }, { x: 58, drop: -16, hl: [0, -130], pl: [-0.2, 1], feet: [[30, -56], [86, -20]], kl: [-1, -0.1] });
  Z.add(motion(-130, -130, 1, 3, 0.8) + sparkle(-120, -270, 8) + sparkle(120, -270, 8));
}, { kind: "kid", call: '{ a: "man05", b: "girl05", faceA, faceB, s }' });

A("duo-hide-and-seek", "Hide and seek (counting and peeking)", G5, ["hide and seek", "hide", "seek", "peek", "counting", "kids", "children", "play", "game", "friends", "bush", "park", "boy", "girl", "hiding"], [-300, -420, 600, 440], (o, Z) => {
  Z.add(use("tree-round", -200, 0, 0.5));
  const b = Z.f(1, { style: "girl03", face: "mischief", body: "kid", look: -0.9 }, { x: 110, hl: [66, -154], pl: [-1, 0.5], hr: [154, -154], pr: [1, 0.5] });
  Z.add(bush(110, 0, 220, 156));
  Z.f(0, { style: "man03", face: "blink", body: "kid" }, { x: -100, hl: [-20, 2, "hd"], pl: [-0.2, -1], hr: [20, 2, "hd"], pr: [0.2, -1] });
  Z.add(L.text("1... 2... 3...", -100, -290, { size: 30, c: "ink" }));
}, { kind: "kid", call: '{ a: "man03", b: "girl03", faceA, faceB, s }' });

A("duo-race-start", "Race start (on your marks)", G5, ["race", "start", "running", "runners", "sprint", "athletics", "sport", "on your marks", "competition", "three", "trio", "ready", "track"], [-340, -380, 680, 400], (o, Z) => {
  Z.add(box(168, -4, 12, 6, "white", 2, { w: "hair" }) + L.flat(L.rect(150, -6, 40, 6), "white", 0.9));
  [[-230, "man01", "blue", "determined"], [-70, "girl07", "red", "determined"], [90, "man05", "green", "determined"]].forEach(([x, st, c, f], i) =>
    Z.f(i, { style: st, face: f, outfit: "athlete", outfitC: c, look: 0.8 }, { x, rot: 32, drop: 44, hl: [x + 60, -4], pl: [1, 0.2], hr: [x + 82, -4], pr: [1, 0.2], feet: [[x - 70, 0], [x + 8, 0]], kl: [-0.6, 0.5], kr: [0.2, -1] }));
  Z.add(L.stroke(L.line([210, -4], [210, -4]), { c: "ink", w: "detail" }));
}, { call: '{ a: "man01", b: "girl07", c: "man05", faceA, faceB, faceC, s }' });

A("duo-race-finish", "Race finish (breaking the tape)", G5, ["race", "finish", "finish line", "winner", "win", "running", "runners", "sprint", "athletics", "sport", "victory", "tape", "competition"], [-330, -480, 660, 500], (o, Z) => {
  Z.add(box(-206, -300, 12, 300, "gray", 3) + box(194, -300, 12, 300, "gray", 3) + box(-206, -312, 412, 34, "white", 8, { w: "prop" }) + L.text("FINISH", 0, -286, { size: 26 }));
  Z.f(1, { style: "man06", face: "determined", outfit: "athlete", outfitC: "green" }, { x: -150, rot: 10, hl: [-40, 60, "arm"], hr: [-30, -190], pr: [-0.5, 0.5], feet: [[-196, -8], [-110, 0]] });
  Z.f(0, { style: "girl01", face: "excited", outfit: "athlete", outfitC: "red" }, { x: 20, rot: -8, hl: [-36, 110, "arm"], hr: [36, 110, "arm"], pl: [-1, 0.3], pr: [1, 0.3], feet: [[-34, 0], [60, -30]], kr: [1, 0.2] });
  Z.add(L.stroke("M-200 -200 Q-110 -170 -22 -226", { c: "red", w: "prop" }) + L.stroke("M200 -200 Q130 -170 62 -230", { c: "red", w: "prop" }) + confetti(20, -400, 1));
}, { call: '{ a: "girl01", b: "man06", faceA, faceB, s }' });

A("duo-relay-baton", "Relay (passing the baton)", G5, ["relay", "baton", "pass", "running", "runners", "athletics", "sport", "team", "race", "teamwork", "handover"], [-280, -400, 560, 420], (o, Z) => {
  Z.f(0, { style: "man04", face: "determined", outfit: "athlete", outfitC: "orange" }, { x: -100, rot: 8, hr: [-8, -216], pr: [0.3, 1], hl: [-70, 80, "sh"], feet: [[-160, -8], [-60, 0]] });
  Z.f(1, { style: "girl04", face: "determined", outfit: "athlete", outfitC: "teal" }, { x: 100, rot: 8, hl: [12, -216], pl: [-0.3, 1], hr: [70, 80, "sh"], feet: [[40, 0], [140, -8]] });
  Z.add(L.g(box(-26, -6, 52, 12, "red", 5, { w: "detail" }), "translate(2 -218) rotate(-8)") + motion(-210, -230, 1, 3) + motion(-190, -140, 1, 2));
}, { call: '{ a: "man04", b: "girl04", faceA, faceB, s }' });

A("duo-kite-flying", "Flying a kite together", G5, ["kite", "flying", "fly", "wind", "park", "outdoors", "kid", "child", "parent", "family", "friends", "play", "fun", "sky"], [-280, -560, 560, 580], (o, Z) => {
  Z.add(use("prop-kite", 170, -470, 0.9, {}, 14));
  const a = Z.f(0, { style: "man01", face: "wow", look: 0.5, outfit: "tee", outfitC: "teal" }, { x: -80, hr: [20, 105, "arm"], pr: [0.8, 0.4] });
  const k = Z.f(1, { style: "girl03", face: "excited", body: "kid", look: 0.5 }, { x: 70, hl: [-16, -150], pl: [-0.5, 1], hr: [30, 110, "arm"], pr: [1, 0.2] });
  Z.add(L.stroke(L.smooth([[a.hands[1][0], a.hands[1][1]], [60, -300], [150, -420]]), { c: "gray", w: "detail" }) + L.stroke(L.smooth([[k.hands[1][0], k.hands[1][1]], [100, -330], [152, -410]]), { c: "gray", w: "detail" }));
}, { call: '{ a: "man01", b: "girl03", faceA, faceB, s }' });

A("duo-sandcastle", "Building a sandcastle", G5, ["sandcastle", "sand", "beach", "kids", "children", "play", "build", "building", "summer", "friends", "holiday", "bucket", "boy", "girl"], [-300, -360, 600, 380], (o, Z) => {
  Z.add(ground(620, "sand") + L.flat(L.circ(0, 2, 280, 22), "sand", 0.7));
  Z.add(box(-72, -52, 144, 52, "sand", 8) + box(-82, -104, 34, 104, "sand", 6) + box(48, -104, 34, 104, "sand", 6) + box(-22, -128, 44, 128, "sand", 6)
    + [[-82, -104], [-62, -104], [48, -104], [68, -104], [-22, -128], [-2, -128], [16, -128]].map(([x, y]) => box(x, y - 12, 14, 14, "sand", 2, { w: "hair" })).join("")
    + L.stroke(L.line([0, -140], [0, -190]), { c: "ink", w: "detail" }) + L.shape(L.poly([[0, -190], [34, -178], [0, -166]], true), "red", { w: "hair" }));
  Z.f(0, { style: "man05", face: "happy", body: "kid" }, { x: -180, drop: 74, lt: [0, 88, 90], rt: [10, 84, 86], hr: [-92, -56], pr: [0.5, 1], noShadow: true });
  Z.f(1, { style: "girl05", face: "laugh", body: "kid" }, { x: 180, drop: 74, lt: [-10, -84, -86], rt: [0, -88, -90], hl: [92, -56], pl: [-0.5, 1], noShadow: true });
  Z.add(use("prop-bucket", 250, -30, 0.32));
}, { kind: "kid", call: '{ a: "man05", b: "girl05", faceA, faceB, s }' });

A("duo-snowman-kids", "Building a snowman", G5, ["snowman", "snow", "winter", "kids", "children", "play", "build", "cold", "christmas", "friends", "boy", "girl", "scarf"], [-300, -440, 600, 460], (o, Z) => {
  Z.add(ground(620, "snow") + L.flat(L.circ(0, 2, 280, 22), "snow", 0.8));
  Z.add(L.shape(L.circ(0, -66, 66), "snow", { w: "prop" }) + L.shape(L.circ(0, -166, 50), "snow", { w: "prop" }) + L.shape(L.circ(0, -240, 36), "snow", { w: "prop" })
    + ell(-12, -248, 4, 4, "ink", { w: "hair" }) + ell(12, -248, 4, 4, "ink", { w: "hair" }) + L.shape(L.poly([[0, -238], [34, -234], [0, -230]], true), "orange", { w: "hair" })
    + [-176, -150].map((y) => ell(0, y, 5, 5, "ink", { w: "hair" })).join("") + box(-42, -202, 84, 14, "red", 6, { w: "detail" }));
  Z.f(0, { style: "man05", face: "happy", body: "kid", acc: ["beanie", "scarf"], accC: "red" }, { x: -150, hr: [-60, -150], pr: [0.5, 1] });
  Z.f(1, { style: "girl05", face: "laugh", body: "kid", acc: ["beanie"], accC: "blue" }, { x: 150, hl: [60, -190], pl: [-0.5, 1], hr: [190, 70, "sh"] });
  Z.add(use("fx-snowflake", -240, -330, 0.3) + use("weather-snowflake", 230, -360, 0.3));
}, { kind: "kid", call: '{ a: "man05", b: "girl05", faceA, faceB, s }' });

// =============================================================== FEELINGS & TALK
const G6 = "Feelings & talk";
A("duo-whisper-secret", "Whispering a secret", G6, ["whisper", "secret", "gossip", "ear", "friends", "talk", "shh", "pair", "tell", "surprise", "man", "woman", "boy", "girl"], [-230, -440, 460, 460], (o, Z) => {
  Z.f(1, { style: "girl01", face: "shocked", look: -0.9, outfit: "dress", outfitC: "teal" }, { x: 76, rot: -3 });
  const a = Z.f(0, { style: "man01", face: "duo-whisper", outfit: "hoodie", outfitC: "orange" }, { x: -70, rot: 10, hr: [26, -296], pr: [0.6, 1] });
  Z.add(ell(26, -298, 11, 14, "s2") + use("fx-exclamation", 150, -400, 0.3));
}, {});

A("duo-argue", "Arguing (angry faces, shouts)", G6, ["argue", "arguing", "argument", "fight", "angry", "quarrel", "shout", "yelling", "disagree", "conflict", "pair", "man", "woman"], [-290, -500, 580, 520], (o, Z) => {
  Z.f(0, { style: "man01", face: "furious", outfit: "tee", outfitC: "red" }, { x: -130, rot: 7, hr: [70, 84, "arm"], pr: [0.5, 0.3], hl: [-26, 36, "sh"], pl: [-1, 0.5] });
  Z.f(1, { style: "girl01", face: "angry", outfit: "dress", outfitC: "purple" }, { x: 130, rot: -7, hl: [-70, 84, "arm"], pl: [-0.5, 0.3], hr: [26, 36, "sh"], pr: [1, 0.5] });
  Z.add(shout(-110, -440, "!?", 1.1) + shout(120, -450, "#!", 1.1, "orange") + use("fx-anger-mark", -230, -330, 0.3) + use("fx-anger-mark", 230, -330, 0.3));
}, { call: '{ a: "man01", b: "girl01", faceA, faceB, s }' });

A("duo-apologise", "Apologising", G6, ["apologise", "apologize", "sorry", "bow", "please", "forgive", "regret", "friends", "pair", "mistake", "man", "woman"], [-230, -420, 460, 440], (o, Z) => {
  Z.f(1, { style: "girl01", face: "annoyed", look: 0.9, outfit: "dress", outfitC: "blue", pose: "cross" }, { x: 96, rot: -2 });
  Z.f(0, { style: "man01", face: "duo-sorry", outfit: "tee", outfitC: "green" }, { x: -70, rot: 16, hl: [-38, -206], pl: [-0.4, 1], hr: [-26, -204], pr: [0.4, 1] });
  Z.add(use("fx-sweat-drops", -150, -330, 0.3));
}, { call: '{ a: "man01", b: "girl01", faceA, faceB, s }' });

A("duo-laughing-together", "Laughing together", G6, ["laugh", "laughing", "funny", "joke", "haha", "friends", "fun", "happy", "pair", "together", "lol", "man", "woman"], [-230, -440, 460, 460], (o, Z) => {
  Z.f(0, { style: "man03", face: "cryLaugh" }, { x: -78, rot: -9, hl: [-8, 90, "sh"], pl: [-1, 0.5], hr: [10, 92, "sh"], pr: [1, 0.5] });
  Z.f(1, { style: "girl03", face: "cryLaugh" }, { x: 78, rot: 9, hl: [-10, 92, "sh"], pl: [-1, 0.5], hr: [8, 90, "sh"], pr: [1, 0.5] });
  Z.add(L.text("HA", -170, -400, { size: 34 }) + L.text("HA", 168, -410, { size: 34 }));
}, { call: '{ a: "man03", b: "girl03", faceA, faceB, s }' });

A("duo-crying-comfort", "Crying and being comforted", G6, ["cry", "crying", "sad", "comfort", "comforting", "console", "support", "friends", "kindness", "tears", "pair", "hug", "man", "woman"], [-230, -440, 460, 460], (o, Z) => {
  Z.f(0, { style: "girl01", face: "sob", outfit: "dress", outfitC: "pink" }, { x: -62, hl: [-20, 2, "hd"], pl: [-0.3, -1], hr: [20, 2, "hd"], pr: [0.3, -1], rot: 3 });
  Z.f(1, { style: "man01", face: "worried", look: -0.8, outfit: "jacket", outfitC: "blue" }, { x: 66, rot: -4, hl: [-30, -244], pl: [-0.3, 1], hr: [46, 90, "sh"], pr: [1, 0.5] });
  Z.add(use("fx-tears", -62, -300, 0.3) + heart(8, -410, 0.8, "pink"));
}, {});

A("duo-scared-huddle", "Scared together", G6, ["scared", "afraid", "fear", "frightened", "huddle", "cling", "spooky", "friends", "pair", "together", "shiver", "man", "woman"], [-230, -440, 460, 460], (o, Z) => {
  Z.f(0, { style: "man01", face: "terrified", outfit: "hoodie", outfitC: "purple" }, { x: -50, rot: 5, hl: [-36, 14, "hd"], pl: [-0.3, -1], hr: [26, 10, "hd"], pr: [0.3, -1] });
  Z.f(1, { style: "girl01", face: "scared", outfit: "dress", outfitC: "teal" }, { x: 52, rot: -5, hl: [-26, 10, "hd"], pl: [-0.3, -1], hr: [36, 14, "hd"], pr: [0.3, -1] });
  Z.add(use("fx-shiver-lines", -130, -250, 0.4) + use("fx-shiver-lines", 130, -250, 0.4));
}, {});

A("duo-puzzled", "Puzzled pair", G6, ["confused", "puzzled", "thinking", "question", "huh", "wonder", "doubt", "friends", "pair", "man", "woman", "think"], [-230, -460, 460, 480], (o, Z) => {
  Z.f(0, { style: "man01", face: "confused", pose: "scratch-head" }, { x: -90 });
  Z.f(1, { style: "girl01", face: "thinking", pose: "think", outfit: "dress", outfitC: "orange" }, { x: 90 });
  Z.add(use("fx-question-marks", 0, -420, 0.55));
}, {});

A("duo-gift-handover", "Handing over a gift", G6, ["gift", "present", "give", "giving", "birthday", "surprise", "friends", "pair", "box", "ribbon", "thank you", "boy", "girl", "man", "woman"], [-230, -420, 460, 440], (o, Z) => {
  Z.f(0, { style: "man03", face: "smile", outfit: "hoodie", outfitC: "green" }, { x: -108, hl: [-14, -190], pl: [0.3, 1], hr: [-4, -184], pr: [0.3, 1] });
  Z.f(1, { style: "girl03", face: "starry", outfit: "dress", outfitC: "pink" }, { x: 108, hl: [4, -184], pl: [-0.3, 1], hr: [14, -190], pr: [-0.3, 1] });
  Z.add(use("prop-gift", 0, -204, 0.4) + sparkle(-30, -270, 9) + sparkle(34, -272, 9) + sparkle(0, -300, 12));
}, { call: '{ a: "man03", b: "girl03", faceA, faceB, s }' });

// =============================================================== WORK & SERVICE
const G7 = "Work, school & service";
A("duo-teacher-board", "Teacher and student at the board", G7, ["teacher", "student", "school", "classroom", "board", "whiteboard", "lesson", "class", "learning", "raise hand", "education", "kid"], [-280, -440, 560, 460], (o, Z) => {
  Z.add(use("furn-whiteboard", 0, -110, 0.9));
  Z.f(0, { style: "man01", face: "smile", outfit: "sweater", outfitC: "teal", acc: ["glasses"] }, { x: -150, hr: [60, 104, "arm"], pr: [0.6, 0.5] });
  Z.f(1, { style: "girl03", face: "excited", body: "kid", outfit: "tee", outfitC: "pink" }, { x: 130, hr: [8, 110, "arm"], pr: [1, 0.2] });
}, { call: '{ a: "man01", b: "girl03", faceA, faceB, s }' });

A("duo-class-lesson", "Teacher with three students", G7, ["teacher", "students", "class", "classroom", "school", "lesson", "raise hand", "kids", "children", "learning", "group", "four", "education"], [-350, -440, 700, 460], (o, Z) => {
  Z.add(use("furn-whiteboard", 40, -110, 0.78));
  Z.f(0, { style: "girl01", face: "smile", outfit: "sweater", outfitC: "purple", acc: ["glasses"] }, { x: -250, hr: [50, 104, "arm"], pr: [0.6, 0.5] });
  [[-80, "man03", "excited", "arm", 8], [60, "girl05", "happy", null, 0], [200, "man05", "laugh", "arm", -8]].forEach(([x, st, f, up, ang], i) =>
    Z.f(i + 1, { style: st, face: f, body: "kid" }, up ? { x, hr: [ang + 6, 110, "arm"], pr: [1, 0.2] } : { x }));
}, { call: '{ a: "girl01", b, c, d (cast ids), s }' });

A("duo-doctor-patient", "Doctor and patient (calm check-up)", G7, ["doctor", "patient", "hospital", "clinic", "checkup", "stethoscope", "health", "medical", "nurse", "calm", "man", "woman"], [-260, -420, 520, 440], (o, Z) => {
  Z.add(box(-170, -62, 200, 24, "white", 8, { w: "prop" }) + box(-150, -38, 10, 38, "gray", 3) + box(10, -38, 10, 38, "gray", 3));
  Z.f(0, { style: "man01", face: "smile", outfit: "pyjamas", outfitC: "sky", noShadow: true }, Object.assign({ x: -66, drop: sitDrop(-62), hl: [-110, 60, "sh"], pl: [-1, 0.6], hr: [-20, -112], pr: [1, 0.6] }, sitF(-66)));
  Z.f(1, { style: "girl01", face: "smile", outfit: "labcoat", outfitC: "white", acc: ["glasses"] }, { x: 62, hl: [-48, -166], pl: [-0.3, 1], hr: [40, 100, "sh"], pr: [1, 0.5] });
  Z.add(L.stroke(L.smooth([[62, -252], [20, -200], [-40, -184], [-48, -166]]), { c: "gray", w: "detail" }) + ell(-48, -164, 9, 9, "gray", { w: "detail" }) + L.shape(L.poly([[-30, -34], [-30, -34]], false), "white", { w: "hair", op: 0 }));
}, { call: '{ a: "man01", b: "girl01", faceA, faceB, s }' });

A("duo-two-doctors", "Two doctors with an X-ray", G7, ["doctors", "doctor", "hospital", "xray", "x-ray", "medical", "consult", "team", "colleagues", "clipboard", "health", "man", "woman", "nurse"], [-280, -500, 560, 520], (o, Z) => {
  Z.add(use("med-xray", 0, -360, 0.9));
  Z.f(0, { style: "man06", face: "thinking", outfit: "labcoat", outfitC: "white", acc: ["glasses"] }, { x: -130, hr: [38, 108, "arm"], pr: [0.6, 0.5] });
  Z.f(1, { style: "girl06", face: "smile", outfit: "doctor", outfitC: "teal" }, { x: 130, hl: [86, -196], pl: [-0.5, 1], hr: [162, -200], pr: [0.5, 1] });
  Z.add(box(96, -232, 56, 74, "wood", 5, { w: "detail" }) + box(104, -224, 40, 58, "white", 3, { w: "hair" }) + [-206, -194, -182].map((y) => ln([110, y], [138, y], { c: "gray", w: "hair" })).join(""));
}, { call: '{ a: "man06", b: "girl06", faceA, faceB, s }' });

const armchair = (cx, dir = 1) => box(cx - 50, -150, 100, 100, "orange", 20) + box(cx - 66, -90, 28, 90, "orange", 12, { tone: 2 }) + box(cx + 38, -90, 28, 90, "orange", 12, { tone: 2 });
A("duo-interview", "Interviewer and guest", G7, ["interview", "interviewer", "guest", "talk show", "microphone", "mic", "chat", "tv", "host", "conversation", "podcast", "man", "woman"], [-300, -440, 600, 460], (o, Z) => {
  Z.add(armchair(-140) + armchair(140) + use("furn-plant", 280, 0, 0.5));
  const a = Z.f(0, { style: "man01", face: "smile", look: 0.7, outfit: "suit", outfitC: "navy", noShadow: true }, Object.assign({ x: -140, drop: sitDrop(-62), hr: [-52, -152], pr: [0.5, 1], hl: [-100, 54, "sh"], pl: [-1, 0.6] }, sitF(-140)));
  Z.f(1, { style: "girl01", face: "happy", mouth: "a", look: -0.7, outfit: "dress", outfitC: "red", noShadow: true }, Object.assign({ x: 140, drop: sitDrop(-62), hl: [100, -96], pl: [-1, 0.6], hr: [186, -90], pr: [1, 0.6] }, sitF(140)));
  Z.add(L.g(use("prop-microphone", 0, 0, 0.36), `translate(${f1(a.hands[1][0] + 10)} ${f1(a.hands[1][1] - 20)}) rotate(40)`) + table(0, 90, -50, "wood") + use("prop-coffee-mug", 0, -70, 0.26));
}, { call: '{ a: "man01", b: "girl01", faceA, faceB, s }' });

A("duo-shop-customer", "Customer and shopkeeper", G7, ["shop", "shopkeeper", "customer", "buy", "buying", "pay", "paying", "store", "market", "counter", "coin", "money", "man", "woman", "service"], [-280, -440, 560, 460], (o, Z) => {
  Z.f(1, { style: "man06", face: "smile", outfit: "chef", outfitC: "green", acc: ["cap"], accC: "green" }, { x: 130, hl: [34, -192], pl: [-0.3, 1] });
  Z.add(box(-10, -108, 280, 108, "wood", 8) + box(-18, -120, 296, 16, "gray", 6) + use("money-cash-register", 210, -150, 0.5) + L.text("SHOP", 100, -50, { size: 36, c: "white", halo: "ink" }));
  Z.f(0, { style: "girl01", face: "happy", outfit: "jacket", outfitC: "purple" }, { x: -150, hr: [14, -194], pr: [0.4, 1], hl: [-196, -134], pl: [-1, 0.6] });
  Z.add(use("money-coin", 22, -204, 0.2) + use("prop-shopping-bag", -202, -118, 0.36));
}, { call: '{ a: "girl01", b: "man06", faceA, faceB, s }' });

A("duo-waiter-diner", "Waiter serving a diner", G7, ["waiter", "diner", "restaurant", "food", "serve", "serving", "customer", "meal", "dinner", "lunch", "tray", "service", "man", "woman"], [-280, -440, 560, 460], (o, Z) => {
  Z.f(1, { style: "girl01", face: "starry", outfit: "dress", outfitC: "pink", noShadow: true }, Object.assign({ x: 130, drop: sitDrop(-62), hl: [60, -100], pl: [-1, 0.6], hr: [200, -100], pr: [1, 0.6] }, sitF(130)));
  Z.add(table(130, 210, -98, "wood") + use("prop-plate", 130, -112, 0.3) + use("prop-fork", 84, -112, 0.2) + use("prop-water-glass", 188, -120, 0.2));
  Z.f(0, { style: "man01", face: "smile", outfit: "suit", outfitC: "white", acc: ["bowtie"], accC: "red" }, { x: -110, hr: [-40, -230], pr: [0.8, 1], hl: [-40, 60, "sh"], pl: [-1, 0.5] });
  Z.add(box(-96, -240, 100, 8, "gray", 3, { w: "detail" }) + use("prop-plate", -46, -270, 0.34) + L.shape(L.arc(-46, -252, 22, 180, 360, 22), "glass", { w: "detail" }));
}, { call: '{ a: "man01", b: "girl01", faceA, faceB, s }' });

A("duo-presentation", "Presenter and audience", G7, ["presentation", "presenter", "meeting", "audience", "chart", "screen", "business", "talk", "office", "seminar", "colleagues", "man", "woman", "team"], [-340, -460, 700, 480], (o, Z) => {
  Z.add(box(80, -340, 260, 180, "white", 10, { w: "prop" }) + [[110, 40], [160, 70], [210, 100], [260, 128]].map(([x, h], i) => box(x, -190 - h, 30, h, ["blue", "green", "orange", "red"][i], 3, { w: "detail" })).join("") + L.stroke(L.line([210, -160], [210, -112]), { c: "gray", w: "prop" }) + box(170, -114, 80, 10, "gray", 4));
  [-270, -150].forEach((x, i) => Z.f(i + 1, { style: ["man05", "girl05"][i], face: "happy", look: 0.9, noShadow: true }, Object.assign({ x, drop: sitDrop(-62), hl: [x - 6, -108], hr: [x + 20, -108] }, sitF(x))));
  Z.add(benchSeat(-210, 250, -62));
  Z.f(0, { style: "man01", face: "smile", outfit: "suit", outfitC: "navy", acc: ["glasses"] }, { x: 0, hr: [60, 104, "arm"], pr: [0.7, 0.5] });
}, { call: '{ a: "man01", b: "man05", c: "girl05", faceA, faceB, faceC, s }' });

A("duo-job-interview", "Job interview at a desk", G7, ["interview", "job", "job interview", "desk", "office", "hiring", "candidate", "cv", "resume", "work", "meeting", "man", "woman"], [-300, -440, 600, 460], (o, Z) => {
  Z.f(0, { style: "man06", face: "smile", outfit: "suit", outfitC: "navy", acc: ["glasses"], noShadow: true }, Object.assign({ x: -150, drop: sitDrop(-62), hr: [-70, -118], pr: [0.5, 1] }, sitF(-150)));
  Z.f(1, { style: "girl06", face: "nervous", look: -0.6, outfit: "suit", outfitC: "gray", noShadow: true }, Object.assign({ x: 150, drop: sitDrop(-62), hl: [70, -118], pl: [-0.5, 1] }, sitF(150)));
  Z.add(table(0, 250, -100, "wood") + box(-30, -126, 34, 26, "white", 3, { w: "detail" }) + box(-4, -124, 34, 24, "cream", 3, { w: "detail" }) + use("prop-pen", 40, -112, 0.2));
}, { call: '{ a: "man06", b: "girl06", faceA, faceB, s }' });

A("duo-astronauts-moon", "Two astronauts on the Moon", G7, ["astronaut", "astronauts", "space", "moon", "flag", "explore", "nasa", "mission", "friends", "pair", "two", "planet", "earth", "suit"], [-300, -520, 600, 540], (o, Z) => {
  Z.add(L.flat(L.circ(0, 6, 300, 24), "stone", 0.8) + L.flat(L.circ(-40, 10, 40, 8), "gray", 0.4) + use("space-planet-earth", 180, -430, 0.55) + sparkle(-190, -440, 9) + sparkle(-110, -380, 7) + sparkle(30, -470, 8));
  Z.add(L.stroke(L.line([-6, 0], [-6, -300]), { c: "gray", w: "prop" }) + L.shape(L.poly([[-6, -300], [86, -280], [-6, -250]], true), "red", { w: "detail" }));
  Z.f(0, { style: "man01", face: "happy", outfit: "astronaut", outfitC: "white", acc: ["helmet"] }, { x: -120, hr: [-24, -214], pr: [0.5, 1] });
  Z.f(1, { style: "girl01", face: "excited", outfit: "astronaut", outfitC: "white", acc: ["helmet"] }, { x: 110, hl: [-34, 50, "sh"], hr: [130, 100, "arm"], pr: [1, 0.3] });
}, { call: '{ a: "man01", b: "girl01", faceA, faceB, s }' });

A("duo-astronauts-float", "Two astronauts floating", G7, ["astronaut", "astronauts", "space", "floating", "zero gravity", "spacewalk", "stars", "friends", "pair", "two", "fist bump", "orbit", "tether"], [-300, -540, 600, 580], (o, Z) => {
  Z.add([[-250, -380], [-180, -100], [250, -340], [180, -150], [-40, -420], [60, -60]].map(([x, y], i) => sparkle(x, y, 6 + (i % 3) * 2)).join(""));
  const a = Z.f(0, { style: "man04", face: "happy", outfit: "astronaut", outfitC: "white", acc: ["helmet"] }, { x: -170, y: -60, rot: 16, hr: [40, -240], pr: [0.3, 1], hl: [-90, 60, "arm"], feet: [[-220, -48], [-150, -62]], noShadow: true });
  const b = Z.f(1, { style: "girl04", face: "excited", outfit: "astronaut", outfitC: "white", acc: ["helmet"] }, { x: 170, y: -90, rot: -16, hl: [-40, -240], pl: [-0.3, 1], hr: [90, 60, "arm"], feet: [[130, -80], [200, -96]], noShadow: true });
  Z.add(L.stroke(L.smooth([[a.hip[0], a.hip[1]], [0, -170], [b.hip[0], b.hip[1]]]), { c: "gray", w: "detail", dash: "8 8" }) + ell((a.hands[1][0] + b.hands[0][0]) / 2, (a.hands[1][1] + b.hands[0][1]) / 2, 15, 13, "white"));
}, { call: '{ a: "man04", b: "girl04", faceA, faceB, s }' });

// =============================================================== FAMILY
const G8 = "Family";
TD2("duo-parent-child-walk", "Parent and child walking", G8, ["parent", "child", "kid", "walk", "walking", "holding hands", "family", "mum", "dad", "stroll", "park", "together", "daughter", "son"], [-230, -520, 460, 540], (o, Z) => {
  const t = o.time;
  Z.add(groundT(t, 480) + skyT(t, 170, -440, 0.9));
  Z.f(0, { style: "man01", face: "happy", look: 0.7, outfit: "jacket", outfitC: "teal" }, { x: -52, hr: [4, -142], pr: [0.2, 1], feet: walkF(-52, 0) });
  Z.f(1, { style: "girl03", face: "laugh", look: -0.7, body: "kid" }, { x: 52, hl: [4, -142], pl: [-0.2, 1], feet: walkF(52, 1, 0.68) });
}, { call: '{ a: "man01", b: "girl03", time: "day", s }' });

A("duo-story-time", "Reading a story together", G8, ["story", "reading", "book", "read", "bedtime", "parent", "child", "kid", "family", "sofa", "mum", "dad", "storybook", "learning"], [-250, -330, 500, 350], (o, Z) => {
  Z.add(sofaBack(0, 360));
  Z.f(0, { style: "girl01", face: "smile", look: 0.3, hair: "long", hairC: "brown", outfit: "sweater", outfitC: "purple", noShadow: true }, Object.assign({ x: -66, drop: sitDrop(-64), hr: [-4, -106], pr: [0.4, 1] }, sitF(-66)));
  Z.f(1, { style: "man03", face: "happy", body: "kid", look: -0.3, noShadow: true }, Object.assign({ x: 62, drop: 24, hl: [10, -102], pl: [-0.4, 1] }, { feet: [[46, 0], [78, 0]], kl: [-1, -0.2], kr: [1, -0.2] }));
  Z.add(sofaSeat(0, 360) + use("prop-book-open", 3, -122, 0.5));
}, { call: '{ a: "girl01", b: "man03", faceA, faceB, s }' });

A("duo-tuck-in-night", "Tucking a child into bed", G8, ["bedtime", "tuck in", "bed", "night", "sleep", "sleeping", "goodnight", "parent", "child", "kid", "family", "mum", "dad", "moon", "zzz", "lamp"], [-290, -440, 620, 460], (o, Z) => {
  Z.add(box(-110, -410, 150, 110, "navy", 10, { w: "prop" }) + L.flat(L.circ(-30, -355, 26), "cream") + sparkle(-80, -380, 7) + sparkle(6, -330, 6) + glow(250, -150, 90));
  Z.add(box(-262, -170, 26, 170, "wood", 6) + box(-262, -84, 400, 54, "blue", 10) + box(-250, -30, 12, 30, "wood", 3) + box(110, -30, 12, 30, "wood", 3) + ell(-185, -112, 46, 17, "white"));
  Z.f(1, { style: "man03", face: "sleep", body: "kid", pose: "sad" }, { x: -30, y: -44, rot: -90, noShadow: true });
  Z.add(L.shape(L.rrect(-124, -140, 250, 64, 22), "purple", { w: "prop" }) + L.stroke(L.line([-96, -122], [100, -122]), { c: "white", w: "detail", op: 0.8 }) + use("fx-zzz", -170, -220, 0.4));
  Z.f(0, { style: "girl01", face: "smile", hair: "long", hairC: "brown", outfit: "pyjamas", outfitC: "pink" }, { x: 190, rot: -12, hl: [118, -122], pl: [-0.4, 1], hr: [50, 70, "sh"] });
  Z.add(use("furn-table-lamp", 280, -80, 0.6));
}, { call: '{ a: "girl01", b: "man03", faceA, s }' });

A("duo-grandparent-walk", "Grandparent and grandchild walking", G8, ["grandparent", "grandma", "grandpa", "grandmother", "grandfather", "grandchild", "elderly", "old", "kid", "walk", "walking", "cane", "family", "holding hands"], [-250, -440, 500, 460], (o, Z) => {
  Z.f(0, { style: "man01", face: "happy", look: 0.7, body: "elderly", hair: "short", hairC: "gray", outfit: "sweater", outfitC: "brown", acc: ["glasses"] }, { x: -52, hr: [4, -142], pr: [0.2, 1], hl: [-70, 120, "sh"], feet: walkF(-52, 0, 0.8) });
  Z.f(1, { style: "girl03", face: "laugh", look: -0.7, body: "kid" }, { x: 56, hl: [4, -142], pl: [-0.2, 1], feet: walkF(56, 1, 0.68) });
  Z.add(L.stroke(L.line([-126, -128], [-132, 0]), { c: "wood", w: "prop" }));
}, { call: '{ a: "man01", b: "girl03", faceA, faceB, s }' });

A("duo-grandparent-hug", "Grandparent hugging a grandchild", G8, ["grandparent", "grandma", "grandmother", "grandchild", "hug", "elderly", "old", "kid", "family", "love", "cuddle", "hearts", "together"], [-230, -430, 460, 450], (o, Z) => {
  Z.f(0, { style: "girl01", face: "duo-glad", body: "elderly", hair: "bun", hairC: "gray", outfit: "dress", outfitC: "purple", acc: ["glasses"] }, { x: -34, hl: [-12, -176], pl: [0, 1], hr: [66, -178], pr: [0.2, 1] });
  Z.f(1, { style: "man03", face: "duo-glad", body: "kid" }, { x: 40, hl: [-30, -118], pl: [0, 1], hr: [30, -118], pr: [0, 1] });
  Z.add(hearts(2, -400, 1, 3));
}, { call: '{ a: "girl01", b: "man03", faceA, faceB, s }' });

A("duo-family-portrait", "Family portrait (four)", G8, ["family", "portrait", "photo", "parents", "kids", "children", "four", "group", "picture", "frame", "mum", "dad", "daughter", "son", "together"], [-300, -480, 600, 510], (o, Z) => {
  Z.add(L.shape(L.rrect(-270, -460, 540, 470, 14), "cream", { w: "scene" }) + L.stroke(L.rrect(-270, -460, 540, 470, 14), { c: "wood", w: "scene", s: 3 }) + L.flat(L.rect(-240, -24, 480, 14), "grass", 0.5));
  Z.f(0, { style: "man06", face: "smile", outfit: "sweater", outfitC: "blue" }, { x: -150, hr: [-84, -252], pr: [0.3, 1] });
  Z.f(1, { style: "girl04", face: "smile", outfit: "dress", outfitC: "red" }, { x: -42, hr: [44, -166], pr: [0.5, 1], hl: [-90, 110, "sh"] });
  Z.f(2, { style: "man05", face: "laugh", body: "kid" }, { x: 66, hr: [130, -132], pr: [0.5, 1] });
  Z.f(3, { style: "girl05", face: "happy", body: "kid", s: 0.84 }, { x: 148, hl: [110, 40, "sh"] });
}, { call: '{ a: "man06", b: "girl04", c: "man05", d: "girl05", faceA, faceB, faceC, faceD, s }' });

A("duo-birthday-party", "Birthday party with cake", G8, ["birthday", "party", "cake", "candles", "celebrate", "celebration", "kids", "children", "friends", "balloons", "clap", "happy birthday", "hat", "blow"], [-330, -520, 660, 540], (o, Z) => {
  Z.add([[-250, "red", -380], [-190, "blue", -420], [220, "gold", -400], [270, "green", -360]].map(([x, c, y]) => L.stroke(L.line([x, y + 36], [x + (x < 0 ? 40 : -40), -120]), { c: "gray", w: "hair" }) + L.shape(L.circ(x, y, 28, 34), c, { w: "detail" })).join(""));
  Z.f(0, { style: "man05", face: "laugh", body: "kid", acc: ["partyhat"], accC: "red", pose: "clap" }, { x: -190 });
  Z.f(2, { style: "girl05", face: "laugh", body: "kid", acc: ["partyhat"], accC: "blue", pose: "clap" }, { x: 190 });
  Z.f(1, { style: "girl03", face: "wow", body: "kid", acc: ["partyhat"], accC: "yellow" }, { x: 0, hl: [-60, -120], pl: [-1, 0.7], hr: [60, -120], pr: [1, 0.7] });
  Z.add(table(0, 250, -96, "wood") + use("prop-cake", 0, -150, 0.5) + confetti(0, -470, 1.3) + sparkle(-100, -300, 9) + sparkle(100, -300, 9));
}, { kind: "kid", call: '{ a, b, c (cast ids, kids), s }' });

A("duo-lemonade-stand", "Lemonade stand", G8, ["lemonade", "stand", "shop", "kids", "children", "sell", "selling", "summer", "customer", "drink", "business", "coins", "friends", "boy", "girl"], [-330, -480, 660, 500], (o, Z) => {
  Z.add(L.stroke(L.line([-190, -330], [-190, 0]), { c: "wood", w: "prop" }) + L.stroke(L.line([90, -330], [90, 0]), { c: "wood", w: "prop" }));
  Z.f(0, { style: "man03", face: "happy", body: "kid", outfit: "tee", outfitC: "orange", acc: ["cap"], accC: "yellow" }, { x: -50, hl: [-90, -110], pl: [-1, 0.6], hr: [66, -160], pr: [0.5, 1] });
  Z.add(table(-50, 270, -92, "wood") + L.text("LEMONADE", -50, -52, { size: 28, c: "white", halo: "ink" }) + use("prop-water-glass", -120, -124, 0.24) + use("prop-water-glass", -90, -124, 0.24) + use("prop-juice-box", 10, -130, 0.3));
  Z.add([-190, -140, -90, -40, 10, 60].map((x, i) => L.shape(L.poly([[x, -330], [x + 50, -330], [x + 50, -304], [x + 25, -290], [x, -304]], true), i % 2 ? "white" : "yellow", { w: "detail" })).join("") + L.stroke(L.line([-190, -330], [110, -330]), { c: "ink", w: "detail" }));
  Z.f(1, { style: "girl05", face: "excited", body: "kid", outfit: "tee", outfitC: "pink" }, { x: 190, hl: [96, -150], pl: [-0.5, 1] });
  Z.add(use("money-coin", 106, -154, 0.16));
}, { kind: "kid", call: '{ a: "man03", b: "girl05", faceA, faceB, s }' });

// =============================================================== CROWDS & GROUPS
const G9 = "Crowds & groups";
A("duo-crowd-five", "Crowd of five", G9, ["crowd", "people", "group", "five", "bystanders", "audience", "gathering", "street", "friends", "team", "community", "men", "women"], [-330, -460, 660, 480], (o, Z) => {
  [[-190, "man01", "wow", "wave"], [0, "girl05", "happy", null], [190, "man09", "laugh", "cheer"]].forEach(([x, st, f, p], i) => Z.f(i, { style: st, face: f, pose: p || undefined }, { x, y: -36, s: 0.9 }));
  [[-100, "girl01", "smile", null], [100, "man06", "excited", "cheer"]].forEach(([x, st, f, p], i) => Z.f(i + 3, { style: st, face: f, pose: p || undefined }, { x }));
}, { call: '{ a, b, c, d, e (cast ids), s }' });

A("duo-audience-row", "Audience row (clapping)", G9, ["audience", "crowd", "row", "clapping", "applause", "cheering", "show", "concert", "theatre", "fans", "five", "group", "people"], [-380, -440, 760, 460], (o, Z) => {
  [[-264, "man01", "happy", "clap"], [-132, "girl05", "laugh", "cheer"], [0, "man05", "excited", "clap"], [132, "girl03", "happy", "cheer"], [264, "man06", "laugh", "clap"]].forEach(([x, st, f, p], i) => Z.f(i, { style: st, face: f, pose: p }, { x, noShadow: true }));
  Z.add(box(-340, -106, 680, 106, "wood", 8) + box(-350, -120, 700, 20, "gray", 6) + notes(0, -420, 1));
}, { call: '{ a, b, c, d, e (cast ids), s }' });

A("duo-queue-five", "Queue of five", G9, ["queue", "line", "waiting", "wait", "line up", "people", "five", "group", "shop", "tickets", "patience", "crowd", "impatient"], [-340, -440, 760, 460], (o, Z) => {
  const cfg = [[-220, "man01", "bored", "cross"], [-110, "girl05", "smile", "phone-hold"], [0, "man04", "tired", "hips"], [110, "girl03", "worried", null], [220, "man06", "annoyed", "cross"]];
  cfg.forEach(([x, st, f, p], i) => Z.f(i, { style: st, face: f, look: 1, pose: p || undefined }, { x }));
  Z.add(box(300, -250, 90, 250, "wood", 8) + box(290, -280, 110, 40, "red", 8) + L.text("OPEN", 345, -253, { size: 24, c: "white" }));
  Z.add([-280, 20, 180].map((x) => box(x, -90, 8, 90, "gray", 3, { w: "detail" })).join("") + L.stroke(L.line([-276, -84], [24, -84]), { c: "red", w: "prop" }));
}, { call: '{ a, b, c, d, e (cast ids), s }' });

A("duo-team-huddle", "Team huddle (four)", G9, ["team", "huddle", "group", "teamwork", "together", "sports", "friends", "arms around", "four", "plan", "unity", "support", "cheer"], [-300, -460, 600, 480], (o, Z) => {
  const xs = [-150, -50, 50, 150], st = ["man03", "girl05", "man05", "girl01"], r = [8, 3, -3, -8];
  xs.forEach((x, i) => Z.f(i, { style: st[i], face: "determined" }, Object.assign({ x, rot: r[i] }, i < 3 ? { hr: [xs[i + 1] - 12, -258], pr: [0.2, -1] } : {}, i > 0 ? { hl: [xs[i - 1] + 12, -258], pl: [-0.2, -1] } : {})));
  Z.add(sparkle(0, -420, 11) + sparkle(-100, -400, 8) + sparkle(100, -400, 8));
}, { call: '{ a, b, c, d (cast ids), s }' });

A("duo-band-three", "Band of three", G9, ["band", "music", "singer", "guitar", "guitarist", "drums", "drummer", "concert", "stage", "rock", "trio", "three", "musicians", "performance"], [-380, -480, 760, 500], (o, Z) => {
  Z.add(box(-340, -26, 680, 26, "wood", 8, { w: "prop" }));
  Z.f(2, { style: "man09", face: "excited", outfit: "tee", outfitC: "red", noShadow: true }, Object.assign({ x: 210, y: -26, drop: sitDrop(-40), hl: [150, -180], pl: [-1, 0.2], hr: [270, -190], pr: [1, 0.2] }, sitF(210, 34)));
  Z.add(use("prop-drum", 210, -90, 0.7) + L.stroke(L.line([210, -26], [210, -90]), { c: "gray", w: "detail" }) + ln([150, -180], [182, -128], { c: "wood", w: "char" }) + ln([270, -190], [236, -128], { c: "wood", w: "char" }));
  Z.f(1, { style: "girl01", face: "laugh", mouth: "o", outfit: "dress", outfitC: "purple" }, { x: 0, y: -26, hr: [34, -196], pr: [0.5, 1], hl: [-34, 60, "sh"] });
  Z.add(L.stroke(L.line([34, -240], [34, -26]), { c: "gray", w: "prop" }) + L.g(use("prop-microphone", 0, 0, 0.34), "translate(34 -226) rotate(20)"));
  const g = Z.f(0, { style: "man01", face: "wink", outfit: "tee", outfitC: "green", acc: ["sunglasses"] }, { x: -210, y: -26, hl: [-280, -216], pl: [-1, 0.5], hr: [-196, -160], pr: [0.5, 1] });
  Z.add(use("prop-guitar", -214, -178, 0.95, {}, -30) + notes(-120, -440, 1) + notes(120, -430, 1));
}, { call: '{ a: "man01", b: "girl01", c: "man09", faceA, faceB, faceC, s }' });

A("duo-podium", "Winners' podium (three)", G9, ["podium", "winners", "winner", "prize", "medal", "first", "second", "third", "competition", "sports", "award", "gold", "silver", "bronze", "trophy", "three"], [-300, -520, 600, 540], (o, Z) => {
  const pod = (x, h, n, c) => box(x - 60, -h, 120, h, c, 6, { w: "prop" }) + L.text(n, x, -h / 2 + 12, { size: 40, c: "white", halo: "ink" });
  Z.add(pod(-124, 64, "2", "gray") + pod(0, 100, "1", "gold") + pod(124, 40, "3", "orange"));
  Z.f(0, { style: "girl05", face: "happy", outfit: "athlete", outfitC: "teal", pose: "wave" }, { x: -124, y: -64 });
  Z.f(1, { style: "man01", face: "excited", outfit: "athlete", outfitC: "red", pose: "cheer" }, { x: 0, y: -100 });
  Z.f(2, { style: "man06", face: "proud", outfit: "athlete", outfitC: "blue", pose: "clap" }, { x: 124, y: -40 });
  Z.add(confetti(0, -500, 1.2) + use("sport-trophy", 0, -480, 0.22) + sparkle(-120, -440, 9) + sparkle(120, -420, 9));
}, { call: '{ a, b, c (cast ids), s }' });

// =============================================================== MORE FRIENDS & FAMILY MOMENTS
const G10 = "More moments";
const cone = (x, y, k = 1, c1 = "pink", c2 = "white") => L.shape(L.poly([[x - 11 * k, y], [x + 11 * k, y], [x, y + 34 * k]], true), "earth", { w: "detail" }) + ell(x, y - 6 * k, 13 * k, 12 * k, c1, { w: "detail" }) + ell(x + 2 * k, y - 22 * k, 10 * k, 9 * k, c2, { w: "detail" });
A("duo-ice-cream-share", "Sharing ice creams", G10, ["ice cream", "icecream", "treat", "dessert", "summer", "friends", "kids", "children", "share", "sweet", "cone", "boy", "girl", "holiday"], [-230, -440, 460, 460], (o, Z) => {
  const a = Z.f(0, { style: "man03", face: "delighted", body: "kid" }, { x: -78, hr: [-30, -204], pr: [0.5, 1] });
  const b = Z.f(1, { style: "girl03", face: "delighted", body: "kid" }, { x: 78, hl: [30, -204], pl: [-0.5, 1] });
  Z.add(cone(a.hands[1][0], a.hands[1][1] - 18, 1, "pink", "white") + cone(b.hands[0][0], b.hands[0][1] - 18, 1, "yellow", "orange") + sparkle(0, -300, 10));
}, { kind: "kid", call: '{ a: "man03", b: "girl03", faceA, faceB, s }' });

A("duo-jog-pair", "Jogging together", G10, ["jog", "jogging", "run", "running", "exercise", "fitness", "workout", "friends", "pair", "sport", "health", "morning", "man", "woman"], [-260, -440, 520, 460], (o, Z) => {
  Z.f(0, { style: "man04", face: "determined", outfit: "athlete", outfitC: "blue", acc: ["headphones"], accC: "ink", pose: "run" }, { x: -78, rot: 8, drop: 26 });
  Z.f(1, { style: "girl04", face: "happy", outfit: "athlete", outfitC: "pink", pose: "run" }, { x: 86, rot: 8, drop: 26 });
  Z.add(motion(-190, -240, 1, 3) + motion(-170, -150, 1, 2) + use("fx-sweat-drops", 190, -380, 0.25));
}, { call: '{ a: "man04", b: "girl04", faceA, faceB, s }' });

A("duo-yoga-pair", "Yoga together (tree pose)", G10, ["yoga", "exercise", "calm", "stretch", "balance", "tree pose", "meditation", "fitness", "wellness", "friends", "pair", "relax", "man", "woman"], [-260, -480, 520, 500], (o, Z) => {
  Z.add(box(-190, -6, 150, 8, "teal", 4, { w: "detail" }) + box(40, -6, 150, 8, "pink", 4, { w: "detail" }));
  Z.f(0, { style: "man01", face: "relieved", outfit: "athlete", outfitC: "teal" }, { x: -115, hl: [-8, 108, "arm"], hr: [8, 108, "arm"], pl: [-1, 0.4], pr: [1, 0.4], feet: [[-115, -2], [-128, -62]], kr: [0.6, -0.6] });
  Z.f(1, { style: "girl01", face: "relieved", outfit: "athlete", outfitC: "pink" }, { x: 115, hl: [-8, 108, "arm"], hr: [8, 108, "arm"], pl: [-1, 0.4], pr: [1, 0.4], feet: [[102, -62], [115, -2]], kl: [-0.6, -0.6] });
  Z.add(sparkle(0, -420, 9));
}, { call: '{ a: "man01", b: "girl01", faceA, faceB, s }' });

A("duo-fishing-pair", "Fishing together", G10, ["fishing", "fish", "lake", "pond", "rod", "relax", "friends", "kids", "pair", "hobby", "outdoors", "dad", "daughter", "son", "patience"], [-300, -420, 600, 440], (o, Z) => {
  Z.add(L.flat(L.circ(0, 4, 190, 20), "water", 0.7) + L.stroke("M-120 -4 Q-90 -12 -60 -4 T0 -4 T60 -4 T120 -4", { c: "blue", w: "detail" }));
  const a = Z.f(0, { style: "man01", face: "happy", look: 0.8, outfit: "jacket", outfitC: "green", acc: ["strawhat"] }, { x: -170, hr: [30, 70, "arm"], pr: [0.8, 0.5] });
  const b = Z.f(1, { style: "girl03", face: "happy", look: -0.8, body: "kid" }, { x: 170, hl: [-40, 72, "arm"], pl: [-0.8, 0.5] });
  const rod = (h, tip, bob) => L.stroke(L.line(h, tip), { c: "wood", w: "prop" }) + L.stroke(L.line(tip, bob), { c: "gray", w: "hair" }) + ell(bob[0], bob[1], 7, 7, "red", { w: "hair" });
  Z.add(rod(a.hands[1], [a.hands[1][0] + 70, a.hands[1][1] - 56], [-34, -8]) + rod(b.hands[0], [b.hands[0][0] - 70, b.hands[0][1] - 50], [42, -8]) + use("animal-fish", -10, -26, 0.16));
}, { call: '{ a: "man01", b: "girl03", faceA, faceB, s }' });

A("duo-reading-kids", "Two kids reading under a tree", G10, ["reading", "book", "read", "kids", "children", "friends", "tree", "park", "study", "learning", "school", "boy", "girl", "story"], [-260, -440, 520, 460], (o, Z) => {
  Z.add(use("tree-round", 0, 0, 0.9));
  Z.f(0, { style: "man05", face: "happy", body: "kid", look: 0.4, outfit: "tee", outfitC: "orange", noShadow: true }, { x: -84, rot: 5, drop: 78, lt: [0, 88, 90], rt: [10, 84, 86], hr: [-12, -76], pr: [0.4, 1] });
  Z.f(1, { style: "girl05", face: "happy", body: "kid", look: -0.4, outfit: "tee", outfitC: "teal", noShadow: true }, { x: 84, rot: -5, drop: 78, lt: [-10, -84, -86], rt: [0, -88, -90], hl: [12, -76], pl: [-0.4, 1] });
  Z.add(use("prop-book-open", 0, -66, 0.46) + L.flat(L.circ(0, 2, 150, 12), "grass", 0.5));
}, { kind: "kid", call: '{ a: "man05", b: "girl05", faceA, faceB, s }' });

A("duo-hug-kids", "Kids hugging (friends)", G10, ["hug", "kids", "children", "friends", "friendship", "embrace", "best friends", "together", "boy", "girl", "play", "love"], [-190, -420, 380, 440], (o, Z) => {
  const x = 46;
  const a = Z.f(0, { style: "man05", face: "duo-glad", body: "kid" }, { x: -x, rot: 3, hr: [x + 28, -170], pr: [0, -1] });
  Z.f(1, { style: "girl05", face: "duo-glad", body: "kid" }, { x, rot: -3, hl: [-x - 28, -164], pl: [0, -1] });
  Z.add(a.over([-x + 36, -180, 130, 60]) + sparkle(-60, -300, 9) + sparkle(60, -300, 9) + sparkle(0, -320, 11));
}, { kind: "kid", call: '{ a: "man05", b: "girl05", faceA, faceB, s }' });

A("duo-kids-walk", "Friends walking hand in hand", G10, ["walk", "walking", "kids", "children", "friends", "holding hands", "school", "together", "boy", "girl", "stroll", "best friends"], [-230, -330, 460, 350], (o, Z) => {
  Z.add(ground(440, "grass"));
  Z.f(0, { style: "man03", face: "happy", look: 0.7, body: "kid", acc: ["backpack"], accC: "red" }, { x: -52, hr: [0, -116], pr: [0.2, 1], feet: walkF(-52, 0, 0.68) });
  Z.f(1, { style: "girl03", face: "laugh", look: -0.7, body: "kid", acc: ["backpack"], accC: "blue" }, { x: 52, hl: [0, -116], pl: [-0.2, 1], feet: walkF(52, 1, 0.68) });
}, { kind: "kid", call: '{ a: "man03", b: "girl03", faceA, faceB, s }' });

A("duo-team-high-five", "Team high five (three)", G10, ["high five", "team", "teamwork", "trio", "three", "celebrate", "cheer", "success", "friends", "group", "win", "together"], [-260, -460, 520, 480], (o, Z) => {
  Z.f(0, { style: "man01", face: "excited" }, { x: -150, hr: [-76, -330], pr: [0.4, 1], rot: 4 });
  Z.f(2, { style: "girl05", face: "excited" }, { x: 150, hl: [76, -330], pl: [-0.4, 1], rot: -4 });
  Z.f(1, { style: "man09", face: "laugh" }, { x: 0, hl: [-76, -330], hr: [76, -330], pl: [-0.6, 1], pr: [0.6, 1] });
  Z.add([-76, 76].map((x) => ell(x, -330, 15, 15, "s2") + [[0, -354, 0, -380], [-20, -348, -34, -368], [20, -348, 34, -368]].map(([a, b, c, d]) => ln([x + a, b], [x + c, d], { c: "gold", w: "char" })).join("")).join("") + sparkle(0, -420, 11));
}, { call: '{ a: "man01", b: "man09", c: "girl05", faceA, faceB, faceC, s }' });

L.DUO_COUNT = COUNT;
})();
