// ===================== library/motion.js — faces, mouths, poses, frame cycles, camera presets =====================
// Adds to people.js data: more L.FACES, ~35 L.POSES (+ L.POSE_LEGS, L.POSE_XF), "cyc-*" frame poses, L.MOTION (camera data).
// Poses are built from hand/foot TARGETS (2-bone IK, body space) so they keep proportions on every cast style.
// L.POSE_XF[pose] = { drop (hip lower, x leg length), dy, dx (px), rot (deg about hip), planted (feet keep their spot under rot), noShadow, sx, sw }
// is applied by a thin wrapper around L.person (this file), because people.js poses only carry arms + legs.
(function () {
const L = window.L, f1 = L.f1, D = Math.PI / 180, r1 = (v) => Math.round(v * 10) / 10;
const sin = (a) => Math.sin(a * D), cos = (a) => Math.cos(a * D), rot = (p, a) => [p[0] * cos(a) - p[1] * sin(a), p[0] * sin(a) + p[1] * cos(a)];

// ---------- extra expressions (same data shape as people.js) ----------
Object.assign(L.FACES, {
  delighted: { m: "laugh", b: "high", e: "wide", blush: 1 }, grumpy: { m: "sad", b: "down", e: "half" }, cryLaugh: { m: "laugh", b: "up", e: "closedUp", tear: 1 },
  starry: { m: "laugh", b: "high", e: "wide", blush: 1 }, mischief: { m: "smug", b: "down", e: "wink" }, sob: { m: "wavy", b: "up", e: "closed", tear: 1 },
  relieved: { m: "smile", b: "low", e: "closedUp", blush: 1 }, terrified: { m: "O", b: "up", e: "wide", sweat: 1, green: 1 }, annoyed: { m: "flat", b: "down", e: "half" },
  silly: { m: "open", b: "high", e: "wink", tongue: 1 }, blink: { m: "smile", b: "mid", e: "closed" },
});
// starry-eyed needs star pupils: people.js has no such eye, so draw them over the open eyes
const face0 = L.face;
L.face = (fx, fy, R, kind = "smile", o = {}) => face0(fx, fy, R, kind, o) + (kind !== "starry" ? "" : [-1, 1].map((sd) =>
  L.tag("path", { d: L.star(fx + sd * 0.34 * R, fy - 0.08 * R, 0.3 * R, 0.13 * R, 5), fill: L.c("gold"), stroke: L.c("ink"), "stroke-width": Math.max(2.5, R * 0.07) * 0.6, "stroke-linejoin": "round" })).join(""));

// ---------- IK + angle helpers (body space: x right, y down; arms: origin = shoulder line centre; legs: origin = hip) ----------
const A1 = 58, A2 = 52, T1 = 62, T2 = 73; // bone lengths of the v3 figure (stand arm / leg)
const ik = (rx, ry, hx, hy, l1, l2, pref) => {
  let dx = hx - rx, dy = hy - ry, d = Math.hypot(dx, dy) || 1;
  const mx = l1 + l2 - 0.5, mn = Math.abs(l1 - l2) + 1, k = d > mx ? mx / d : d < mn ? mn / d : 1;
  dx *= k; dy *= k; d *= k;
  const a = (l1 * l1 - l2 * l2 + d * d) / (2 * d), h = Math.sqrt(Math.max(0, l1 * l1 - a * a)), ux = dx / d, uy = dy / d;
  const c1 = [ux * a - uy * h, uy * a + ux * h], c2 = [ux * a + uy * h, uy * a - ux * h];
  const e = c1[0] * pref[0] + c1[1] * pref[1] >= c2[0] * pref[0] + c2[1] * pref[1] ? c1 : c2;
  return [e.map(r1), [dx, dy].map(r1)];
};
const arm = (side, hand, pref) => ik(side * 24, 0, hand[0], hand[1], A1, A2, pref || [side, 0.7]); // side -1 = armL, +1 = armR
const leg = (foot, pref) => ik(0, 0, foot[0], foot[1], T1, T2, pref || [foot[0] < 0 ? -0.5 : 0.5, 0.3]);
const armT = (side, t1, t2) => { const e = [side * A1 * sin(t1), A1 * cos(t1)]; return [e, [e[0] + side * A2 * sin(t2), e[1] + A2 * cos(t2)]].map((p) => p.map(r1)); }; // angles from straight down, outward +
const legT = (off, t1, t2) => { const k = [off + T1 * sin(t1), T1 * cos(t1)]; return [k, [k[0] + T2 * sin(t2), k[1] + T2 * cos(t2)]].map((p) => p.map(r1)); }; // + = towards +x

L.POSE_XF = {};
const STAND = L.POSES.stand;
// p: { l, r (hand targets), pl, pr (elbow preference), al, ar ([side, t1, t2] raw), ll, rl (foot targets), kl, kr (knee pref), lt, rt ([off, t1, t2] raw), xf }
const defPose = (name, p) => {
  const xf = p.xf || {}, pl = xf.planted === true ? [true, true] : [].concat(xf.planted || []);
  L.POSES[name] = [p.al ? armT(...p.al) : p.l ? arm(-1, p.l, p.pl) : STAND[0], p.ar ? armT(...p.ar) : p.r ? arm(1, p.r, p.pr) : STAND[1]];
  if (p.ll || p.rl || p.lt || p.rt) {
    const one = (i, tgt, ang, pref, def) => {
      if (ang) return legT(...ang);
      let f = tgt || def, pr = pref;
      if (pl[i] && xf.rot) { f = rot(f, -xf.rot); pr = pr && rot(pr, -xf.rot); }
      return leg(f, pr);
    };
    L.POSE_LEGS[name] = [one(0, p.ll, p.lt, p.kl, [-35, 130]), one(1, p.rl, p.rt, p.kr, [35, 130])];
  }
  if (p.xf) L.POSE_XF[name] = p.xf;
};

// wrapper: apply POSE_XF (drop / lift / lean / lying) around the figure, with our own ground shadow
const person0 = L.person;
L.person = (o = {}) => {
  const x = L.POSE_XF[o.pose];
  if (!x) return person0(o);
  const st = L.CAST[o.style || "man01"] || L.CAST.man01, body = L.BODIES[o.body || st.body || "regular"] || {};
  const s = (o.s || 1) * (body.scale || 1), leg = body.leg || 1, hipY = -130 * leg * s;
  const dx = (x.dx || 0) * s, dy = (x.drop || 0) * leg * s + (x.dy || 0) * s;
  const inner = L.useLook(Object.assign({}, L.T, { shadow: false }), () => person0(o));
  return (x.noShadow ? "" : L.shadow((x.sx || 0) * s, 0, (x.sw || 150) * s)) + L.g(inner, `translate(${f1(dx)} ${f1(dy)})${x.rot ? ` rotate(${x.rot} 0 ${f1(hipY)})` : ""}`);
};
// where a point of the untransformed figure (feet origin, s = 1) ends up after the pose transform
const tf = (name, [px, py]) => {
  const x = L.POSE_XF[name] || {}, q = rot([px, py + 130], x.rot || 0);
  return [q[0] + (x.dx || 0), q[1] - 130 + (x.drop || 0) + (x.dy || 0)];
};
const hands = (name, o) => L.anchors({ style: o.style, body: o.body, pose: name }).hands.map((h) => tf(name, h));

// ---------- the poses ----------
const P = {
  run: { r: [74, -18], pr: [0.2, 1], l: [-76, 8], pl: [-0.5, 1], ll: [-92, 50], kl: [-0.3, 1], rl: [60, 102], kr: [1, -0.1], xf: { rot: 8, drop: 26 }, face: "determined", box: [-230, -400, 460, 420] },
  jump: { l: [-66, -84], r: [66, -84], ll: [-58, 118], kl: [-1, 0.2], rl: [58, 118], kr: [1, 0.2], xf: { dy: -70 }, face: "excited", box: [-170, -470, 340, 500] },
  "sit-chair": { l: [14, 100], pl: [-0.3, 1], r: [56, 104], pr: [0.5, 1], lt: [0, 88, 0], rt: [14, 88, 0], xf: { drop: 55 }, box: [-190, -330, 380, 350] },
  "sit-floor": { l: [-52, 106], pl: [-1, 0.6], r: [54, 104], pr: [0.4, 1], lt: [0, 88, 90], rt: [10, 84, 86], xf: { drop: 122, sw: 240, sx: 50 }, box: [-190, -280, 430, 300] },
  "lie-down": { l: [-34, 100], r: [34, 100], pl: [-1, 0.5], pr: [1, 0.5], xf: { rot: 90, drop: 86, sw: 380, sx: 50 }, face: "tired", box: [-190, -170, 480, 200] },
  fall: { l: [-74, -70], pl: [-1, 0.3], r: [92, -34], pr: [1, 0.3], ll: [-62, 96], kl: [-1, 0.3], rl: [40, 64], kr: [1, -0.2], xf: { rot: 28, dy: -14 }, face: "scared", box: [-250, -400, 500, 440] },
  dance: { l: [-70, -76], pl: [-1, 0.3], r: [40, 100], pr: [1, -0.2], ll: [-44, 127], rl: [30, 96], kr: [1, 0.1], xf: { rot: -5 }, face: "happy", box: [-190, -400, 380, 420] },
  lift: { l: [-52, -88], r: [52, -88], pl: [-1, 0.3], pr: [1, 0.3], ll: [-62, 106], kl: [-1, 0.2], rl: [62, 106], kr: [1, 0.2], xf: { drop: 24 }, face: "determined", box: [-210, -400, 420, 420] },
  carry: { l: [-12, 60], r: [12, 60], pl: [-1, 0.4], pr: [1, 0.4], ll: [-40, 128], rl: [40, 128], face: "determined", box: [-170, -400, 340, 420] },
  pull: { l: [96, 60], r: [110, 48], pl: [0.3, 1], pr: [0.3, 1], ll: [62, 126], kl: [1, 0], rl: [-52, 122], kr: [0, 1], xf: { rot: -14, planted: true, drop: 4 }, face: "determined", box: [-250, -400, 600, 420] },
  throw: { r: [62, -84], pr: [1, 0.3], l: [-92, -14], ll: [-52, 126], rl: [46, 120], kr: [1, 0.2], face: "determined", box: [-200, -420, 400, 440] },
  facepalm: { r: [26, -74], pr: [1, 0.4], l: [-48, 94], pl: [-1, 0.2], face: "embarrassed", box: [-170, -400, 340, 420] },
  cheer: { l: [-50, -104], r: [50, -104], pl: [-1, 0.3], pr: [1, 0.3], ll: [-34, 118], rl: [34, 118], xf: { dy: -22 }, face: "excited", box: [-190, -430, 380, 460] },
  kneel: { l: [-14, 22], pl: [-1, 0.8], r: [58, 104], pr: [1, 0.3], lt: [0, -8, -95], rt: [0, 88, 2], xf: { drop: 55, sw: 220, sx: -10 }, box: [-190, -340, 400, 360] },
  climb: { l: [-56, -98], pl: [-1, 0.3], r: [56, -36], pr: [1, 0.6], ll: [-26, 128], rl: [30, 90], kr: [1, -0.3], face: "determined", box: [-170, -400, 340, 420] },
  swim: { r: [36, -104], pr: [1, 0.3], l: [-30, 96], pl: [-1, 0.5], ll: [-18, 132], rl: [26, 118], kr: [1, 0], xf: { rot: 90, drop: 60, noShadow: true }, box: [-190, -190, 480, 230] },
  sleep: { l: [14, 48], pl: [-1, 0.5], r: [-14, 48], pr: [1, 0.5], xf: { rot: -90, drop: 86, sw: 380, sx: -50 }, face: "sleep", box: [-310, -170, 500, 200] },
  salute: { r: [26, -96], pr: [1, 0.2], face: "proud", box: [-170, -400, 340, 420] },
  clap: { l: [-6, 22], r: [6, 22], pl: [-1, 0.8], pr: [1, 0.8], face: "happy", box: [-170, -400, 340, 420] },
  "hug-self": { l: [30, 26], r: [-30, 26], pl: [0, 1], pr: [0, 1], face: "love", box: [-170, -400, 340, 420] },
  bow: { xf: { rot: 42, planted: true }, ll: [-35, 130], rl: [35, 130], face: "smile", box: [-200, -400, 400, 420] },
  tiptoe: { l: [-96, 12], r: [96, 12], ll: [-14, 133], rl: [14, 133], xf: { dy: -10 }, face: "nervous", box: [-190, -400, 380, 420] },
  kick: { l: [-80, -26], r: [70, 74], ll: [-18, 132], rl: [118, 22], kr: [0.3, -1], xf: { rot: -8, planted: [true, false] }, face: "determined", box: [-200, -400, 460, 420] },
  "look-up": { r: [64, -100], pr: [1, 0.3], l: [-36, 100], pl: [-1, -0.2], xf: { rot: -8, planted: true }, ll: [-35, 130], rl: [35, 130], face: "wow", box: [-200, -420, 400, 440] },
  "look-down": { l: [-10, 76], r: [10, 76], pl: [-1, 0.6], pr: [1, 0.6], xf: { rot: 12, planted: true }, ll: [-35, 130], rl: [35, 130], face: "sad", box: [-200, -400, 400, 420] },
  "phone-hold": { r: [50, -62], pr: [1, 0.6], l: [20, 60], pl: [-1, 0.8], face: "smile", box: [-170, -400, 340, 420] },
  "pray-hands": { l: [-4, 38], r: [4, 38], pl: [-1, 1], pr: [1, 1], face: "worried", box: [-170, -400, 340, 420] },
  "thumbs-up": { r: [74, -14], pr: [1, 0.8], face: "wink", box: [-170, -400, 340, 420] },
  flex: { l: [-52, -64], r: [52, -64], pl: [-1, 0.3], pr: [1, 0.3], ll: [-44, 128], rl: [44, 128], face: "proud", box: [-190, -400, 380, 420] },
  "arms-out": { l: [-130, 4], r: [130, 4], face: "excited", box: [-210, -400, 420, 420] },
  "scratch-head": { r: [40, -96], pr: [1, 0.2], face: "confused", box: [-170, -400, 340, 420] },
  crouch: { l: [-52, 70], r: [52, 70], pl: [-1, 0.6], pr: [1, 0.6], ll: [-44, 80], kl: [-1, 0.2], rl: [44, 80], kr: [1, 0.2], xf: { drop: 50 }, face: "scared", box: [-170, -400, 340, 420] },
};
Object.entries(P).forEach(([k, v]) => defPose(k, v));

// small props that make a pose tile read (drawn behind / in front of the figure; tile-only)
const rrect = (x, y, w, h, r, c, o) => L.shape(L.rrect(x, y, w, h, r), c, Object.assign({ w: "detail" }, o));
const DECO = {
  run: () => ({ back: [0, 1, 2].map((i) => L.stroke(L.line([-110 - i * 14, -250 + i * 44], [-190 - i * 14, -250 + i * 44]), { c: "gray", w: "detail" })).join("") }),
  "sit-chair": () => ({ back: rrect(-62, -200, 18, 150, 5, "wood") + rrect(-52, -70, 168, 16, 5, "wood") + rrect(-50, -56, 14, 56, 4, "wood") + rrect(98, -56, 14, 56, 4, "wood") }),
  lift: (o) => { const [a, b] = hands("lift", o), y = (a[1] + b[1]) / 2 - 8, x0 = a[0] - 80, x1 = b[0] + 80; return { front: L.stroke(L.line([x0, y], [x1, y]), { c: "gray", w: "char" }) + [x0, x1].map((x) => rrect(x - 12, y - 42, 24, 84, 6, "ink") + rrect(x + (x < 0 ? 12 : -22), y - 28, 10, 56, 4, "gray")).join("") }; },
  carry: (o) => { const [a, b] = hands("carry", o); return { front: rrect((a[0] + b[0]) / 2 - 48, a[1] - 40, 96, 78, 8, "wood") + L.stroke(L.line([(a[0] + b[0]) / 2 - 48, a[1] - 14], [(a[0] + b[0]) / 2 + 48, a[1] - 14]), { c: "ink", w: "detail", op: 0.4 }) }; },
  pull: (o) => { const [, b] = hands("pull", o); return { front: L.stroke(`M${f1(b[0])} ${f1(b[1])} Q${f1(b[0] + 120)} ${f1(b[1] + 40)} ${f1(b[0] + 230)} ${f1(b[1] - 6)}`, { c: "brown", w: "prop" }) }; },
  throw: (o) => { const h = hands("throw", o)[1]; return { front: L.shape(L.circ(h[0] + 6, h[1] - 18, 18), "red", { w: "detail" }) + L.stroke(`M${f1(h[0] + 40)} ${f1(h[1] - 70)} Q${f1(h[0] + 110)} ${f1(h[1] - 150)} ${f1(h[0] + 170)} ${f1(h[1] - 90)}`, { c: "gray", w: "detail", dash: "10 10" }) }; },
  climb: () => ({ back: [-58, 58].map((x) => rrect(x - 6, -430, 12, 440, 4, "wood")).join("") + Array.from({ length: 9 }, (_, i) => rrect(-58, -420 + i * 48, 116, 10, 3, "wood")).join("") }),
  swim: () => ({ front: L.flat("M-250 -62 Q-210 -76 -170 -62 T-90 -62 T-10 -62 T70 -62 T150 -62 T230 -62 L230 30 L-250 30 Z", "water", 0.55) + L.stroke("M-250 -62 Q-210 -76 -170 -62 T-90 -62 T-10 -62 T70 -62 T150 -62 T230 -62", { c: "blue", w: "detail" }) }),
  sleep: (o) => { const hd = tf("sleep", L.anchors({ style: o.style, pose: "sleep" }).hd); return { back: rrect(hd[0] - 78, hd[1] - 6, 118, 50, 22, "pink") }; },
  clap: (o) => { const h = hands("clap", o)[0]; return { front: [[-24, -12, -40, -26], [24, -12, 40, -26], [0, -22, 0, -42]].map(([a, b, c, d]) => L.stroke(L.line([h[0] + a, h[1] + b], [h[0] + c, h[1] + d]), { c: "gold", w: "char" })).join("") }; },
  "phone-hold": (o) => { const h = hands("phone-hold", o)[1]; return { front: rrect(h[0] - 8, h[1] - 28, 24, 46, 6, "navy") + L.flat(L.rect(h[0] - 4, h[1] - 22, 16, 30), "sky") }; },
  "thumbs-up": (o) => { const h = hands("thumbs-up", o)[1]; return { front: L.shape(L.circ(h[0], h[1], 16, 14), "s2", { w: "detail" }) + rrect(h[0] - 6, h[1] - 38, 13, 28, 6, "s2") }; },
  kick: () => ({ front: L.shape(L.circ(176, -106, 22), "white", { w: "detail" }) + L.stroke(L.arc(176, -106, 12, 200, 340), { c: "ink", w: "hair" }) }),
  cheer: () => ({ back: [[-100, -330, "red"], [90, -350, "blue"], [-60, -380, "gold"], [60, -300, "green"], [0, -400, "pink"]].map(([x, y, c], i) => L.shape(L.rect(x, y, 14, 8), c, { w: "hair" })).join("") }),
};

const POSES = Object.keys(P);
POSES.forEach((name) => L.reg("motion", "pose-" + name, (o) => {
  const oo = Object.assign({ style: "man01", face: P[name].face || "smile" }, o, { pose: name }), dc = DECO[name] ? DECO[name](oo) : {};
  return (dc.back || "") + L.person(oo) + (dc.front || "");
}, { box: P[name].box, group: "Poses", label: "Pose · " + name, tags: ["pose", "motion", name, "man01"], call: `L.put(S, "person", x, gy, { pose: "${name}", face, s, t })`, demo: {} }));

// sheets: every new pose on one cast style (checks the pose on tube limbs / dresses too)
[["man01", "Man 01"], ["man03", "Man 03 (tube limbs)"], ["girl01", "Girl 01"]].forEach(([style, nm]) => L.reg("motion", "poses-all-" + style, (o) => {
  const cols = 10, cw = 230, ch = 275;
  return POSES.map((name, i) => {
    const cx = (i % cols) * cw + cw / 2, cy = Math.floor(i / cols) * ch + 235;
    return L.g(L.person(Object.assign({ style, face: P[name].face || "smile", pose: name, s: 0.5 }, o.opt)), `translate(${cx} ${cy})`) + L.text(name, cx, cy + 28, { size: 22 });
  }).join("");
}, { box: [0, 0, 2300, Math.ceil(POSES.length / 10) * 275 + 10], group: "Pose sheets", wide: true, label: `All ${POSES.length} new poses · ${nm}`, tags: ["pose", "sheet", style], call: `L.person({ style: "${style}", pose: "<name>" })`, demo: {} }));

// ---------- frame cycles ----------
// each cycle = n poses "cyc-<key>-<i>" + one asset "cycle-<key>" taking { frame: 0..n-1 } (no frame = sprite sheet). Use via L.put(S, "cycle-walk", x, gy, { frame, s, t }).
const gait = (i, n, a) => {
  const p = (i / n) * 360, lt = [0, 180].map((ph) => { const t = a.amp * sin(p + ph); return [0, t, t - a.bend * Math.max(0, cos(p + ph))]; });
  const foot = Math.max(...lt.map((l) => legT(...l)[1][1]));
  const sw = (ph) => a.arm * (0.5 + 0.5 * sin(p + ph)); // arms swing outward only (never cross the torso)
  return { lt: lt[0], rt: lt[1], al: [-1, sw(180), sw(180) + a.flex], ar: [1, sw(0), sw(0) + a.flex], xf: { drop: r1(130 - foot - (a.fly || 0) * Math.abs(sin(p))), rot: a.lean || 0 } };
};
const CYC = {};
const cycle = (key, label, frames, cfg = {}) => {
  const n = frames.length; CYC[key] = { n };
  frames.forEach((f, i) => defPose(`cyc-${key}-${i}`, f));
  const person = (o, i, s) => L.person(Object.assign({ style: "man01", face: cfg.face || "smile", look: cfg.look }, cfg.opt ? cfg.opt(i) : {}, o, { pose: `cyc-${key}-${i}`, s }));
  L.reg("motion", "cycle-" + key, (o) => {
    if (o.frame !== undefined && o.frame !== null) return person(o, ((Math.round(o.frame) % n) + n) % n, 1); // L.put applies o.s itself
    const sc = cfg.sheetS || 0.5, st = cfg.step || 170, W = n * st;
    return frames.map((_, i) => L.g(person(o, i, sc), `translate(${f1((i + 0.5) * st - W / 2)} 0)`) + L.text(i, (i + 0.5) * st - W / 2, 30, { size: 22 })).join("");
  }, { box: [-(n * (cfg.step || 170)) / 2 - 10, -(400 * (cfg.sheetS || 0.5) + (cfg.up || 0)), n * (cfg.step || 170) + 20, 400 * (cfg.sheetS || 0.5) + (cfg.up || 0) + 46], group: "Cycles", wide: true, label: `${label} · ${n} frames`,
    tags: ["cycle", "frames", "sprite", key], call: `L.put(S, "cycle-${key}", x, gy, { frame: k % ${n}, s, t })  // ${n} frames: step k each ~${cfg.fps || 8} fps`, demo: {} });
};
cycle("walk", "Walk cycle", Array.from({ length: 8 }, (_, i) => gait(i, 8, { amp: 24, bend: 38, arm: 26, flex: 14 })), { look: 0.7, fps: 10 });
cycle("run", "Run cycle", Array.from({ length: 6 }, (_, i) => gait(i, 6, { amp: 52, bend: 85, arm: 60, flex: 50, lean: 8, fly: 14 })), { look: 0.7, face: "determined", fps: 12, step: 200 });
cycle("wave", "Wave", Array.from({ length: 6 }, (_, i) => ({ ar: [1, 105, 175 + 35 * sin((i / 6) * 360)] })), { face: "happy", fps: 8 });
cycle("talk", "Talk (mouth shapes)", ["m", "a", "e", "o", "a", "l"].map((m, i) => ({ r: [72, [58, 38, 52, 26, 50, 34][i]], pr: [1, 0.8] })), { sheetS: 0.62, step: 190, opt: (i) => ({ mouth: ["m", "a", "e", "o", "a", "l"][i] }), fps: 8 });
cycle("idle", "Idle bob", Array.from({ length: 6 }, (_, i) => { const d = r1(7 * (0.5 - 0.5 * cos((i / 6) * 360))); return { ll: [-35, 130 - d], rl: [35, 130 - d], l: [-72, 100 + d * 0.3], r: [72, 100 + d * 0.3], xf: { drop: d } }; }), { fps: 4 });
cycle("jump", "Jump", [
  { l: [-60, 70], r: [60, 70], ll: [-40, 100], kl: [-1, 0.2], rl: [40, 100], kr: [1, 0.2], xf: { drop: 30 } },
  { l: [-60, -30], r: [60, -30], ll: [-14, 135], rl: [14, 135], xf: { dy: -4 } },
  { l: [-70, -84], r: [70, -84], ll: [-30, 112], kl: [-1, 0.2], rl: [30, 112], kr: [1, 0.2], xf: { dy: -46 } },
  { l: [-82, -70], r: [82, -70], ll: [-44, 96], kl: [-1, 0.2], rl: [44, 96], kr: [1, 0.2], xf: { dy: -78 } },
  { l: [-84, -30], r: [84, -30], ll: [-26, 128], rl: [26, 128], xf: { dy: -40 } },
  { l: [-70, 40], r: [70, 40], ll: [-44, 104], kl: [-1, 0.2], rl: [44, 104], kr: [1, 0.2], xf: { drop: 26 } },
], { face: "excited", fps: 10, step: 190, up: 40 });
const nodD = [0, 12, 4, 12, 4, 0];
cycle("nod", "Nod", nodD.map((d) => ({ ll: [-35, 130 - d], rl: [35, 130 - d], xf: { drop: d, rot: d * 0.4, planted: true } })), { fps: 6 });
cycle("shake", "Shake head (no)", Array.from({ length: 6 }, (_, i) => { const s = sin((i / 6) * 360); return { ll: [-35, 130], rl: [35, 130], xf: { dx: r1(5 * s), rot: r1(4 * s), planted: true } }; }), { face: "worried", fps: 8, opt: (i) => ({ look: r1(sin((i / 6) * 360)) }) });

// ---------- faces ----------
const kebab = (s) => s.replace(/([A-Z])/g, "-$1").toLowerCase();
const headTile = (kind, o = {}) => {
  const R = 50, fn = L.T.head.fill === "skin" ? "s2" : "white";
  return L.g(L.shape(L.circ(0, 0, R), fn, { w: "char" }) + L.HAIR.side(0, 0, R, "brown").front + L.face(0, 0, R, kind, { eyes: "v3", look: o.look, mouth: o.mouth, olK: 1, skinName: fn }), "scale(3)");
};
Object.keys(L.FACES).forEach((k) => L.reg("motion", "face-" + kebab(k), (o) => headTile(k, o), { box: [-240, -235, 480, 405], group: "Expressions", label: "Face · " + k, tags: ["face", "expression", k],
  call: `L.put(S, "person", x, gy, { face: "${k}", s, t })`, demo: {} }));
const VIS = { a: "ah", e: "ee", o: "oh", m: "mm (closed)", f: "ff / vv", l: "ll / th" };
Object.entries(VIS).forEach(([k, nm]) => L.reg("motion", "mouth-" + k, (o) => headTile("smile", Object.assign({ mouth: k }, o)), { box: [-240, -235, 480, 405], group: "Talking mouths", label: `Mouth ${k.toUpperCase()} · ${nm}`, tags: ["mouth", "viseme", "lipsync", k],
  call: `L.put(S, "person", x, gy, { mouth: "${k}" })  // swap per word`, demo: {} }));
[["open", "smile"], ["closed", "blink"]].forEach(([n, kind]) => L.reg("motion", "blink-" + n, (o) => headTile(kind, o), { box: [-240, -235, 480, 405], group: "Talking mouths", label: "Blink · eyes " + n, tags: ["blink", "eyes"],
  call: `L.put(S, "person", x, gy, { face: "${kind}" })  // blink ~0.12 s every 3–5 s`, demo: {} }));

// ---------- camera / transition presets (tile = small diagram; L.MOTION = plain data for the engine) ----------
// cam names match engine2 scene(): "push" | "pull" | "zoom" | "none"; S.zoom(x, y, k, t, dur), S.pan(dx, dy, t, dur)
L.MOTION = {
  push: { cam: "push", from: 1, to: 1.03, dur: "scene", ease: "sine.inOut" }, pull: { cam: "pull", from: 1.03, to: 1, dur: "scene", ease: "sine.inOut" },
  panRight: { dx: -60, dy: 0, dur: "scene", ease: "sine.inOut" }, panLeft: { dx: 60, dy: 0, dur: "scene", ease: "sine.inOut" }, tiltUp: { dx: 0, dy: 40, dur: "scene", ease: "sine.inOut" },
  zoom: { cam: "zoom", from: 1, to: 1.25, dur: 0.8, ease: "power2.out" }, crossfade: { dur: 0.6 }, cut: { dur: 0 },
};
const mini = (x, y, w, h, night) => L.flat(L.rect(x, y, w, h), night ? "night" : "sky") + L.flat(L.rect(x, y + h * 0.66, w, h * 0.34), night ? "navy" : "grass") + L.flat(L.circ(x + w * 0.78, y + h * 0.26, h * 0.12), night ? "cream" : "yellow") + L.flat(L.poly([[x + w * 0.14, y + h * 0.66], [x + w * 0.3, y + h * 0.36], [x + w * 0.46, y + h * 0.66]], true), night ? "navy" : "green");
const outl = (x, y, w, h, o = {}) => L.stroke(L.rect(x, y, w, h), { c: o.c || "ink", w: o.w || "prop", dash: o.dash });
const arrow = (a, b, c = "red") => { const an = Math.atan2(b[1] - a[1], b[0] - a[0]), h = (d) => [b[0] - 18 * Math.cos(an + d), b[1] - 18 * Math.sin(an + d)]; return L.stroke(L.line(a, b), { c, w: "prop" }) + L.stroke(L.poly([h(0.5), b, h(-0.5)]), { c, w: "prop" }); };
const cap = (t, sub) => L.text(t, 0, 112, { size: 30 }) + (sub ? L.text(sub, 0, 140, { size: 22, c: "gray" }) : "");
const CAMS = {
  "cam-push-in": ["Push in", "1.00 → 1.03 over the scene", () => mini(-150, -90, 300, 170) + outl(-150, -90, 300, 170, { c: "gray", dash: "8 8" }) + outl(-108, -64, 216, 122) + [[-150, -90, -108, -64], [150, -90, 108, -64], [-150, 80, -108, 58], [150, 80, 108, 58]].map(([a, b, c, d]) => arrow([a, b], [c, d])).join("")],
  "cam-pull-out": ["Pull out", "1.03 → 1.00 over the scene", () => mini(-150, -90, 300, 170) + outl(-108, -64, 216, 122, { c: "gray", dash: "8 8" }) + outl(-150, -90, 300, 170) + [[-108, -64, -150, -90], [108, -64, 150, -90], [-108, 58, -150, 80], [108, 58, 150, 80]].map(([a, b, c, d]) => arrow([a, b], [c, d], "blue")).join("")],
  "cam-pan-right": ["Pan right", "move the frame ~60 px", () => mini(-150, -80, 340, 150) + outl(-150, -80, 220, 150, { c: "gray", dash: "8 8" }) + outl(-40, -80, 220, 150) + arrow([-120, 90], [90, 90], "red")],
  "cam-pan-left": ["Pan left", "move the frame ~60 px", () => mini(-190, -80, 340, 150) + outl(-70, -80, 220, 150, { c: "gray", dash: "8 8" }) + outl(-180, -80, 220, 150) + arrow([120, 90], [-90, 90], "red")],
  "cam-tilt-up": ["Tilt up", "move the frame up ~40 px", () => mini(-100, -110, 200, 170) + outl(-100, -50, 200, 110, { c: "gray", dash: "8 8" }) + outl(-100, -110, 200, 110) + arrow([140, 50], [140, -80], "red")],
  "cam-zoom-punch": ["Zoom punch", "1.00 → 1.25 in 0.8 s", () => mini(-150, -90, 300, 170) + outl(-150, -90, 300, 170, { c: "gray", dash: "8 8" }) + outl(-60, -40, 120, 68) + [[-150, -90, -66, -44], [150, -90, 66, -44], [-150, 80, -66, 34], [150, 80, 66, 34]].map(([a, b, c, d]) => arrow([a, b], [c, d])).join("")],
  "cam-crossfade": ["Crossfade", "0.6 s, both scenes overlap", () => L.g(mini(-170, -115, 230, 130), "", 1) + L.g(mini(-60, -65, 230, 130, true), "", 0.6) + outl(-170, -115, 230, 130, { w: "detail" }) + outl(-60, -65, 230, 130, { w: "detail" })],
  "cam-hard-cut": ["Hard cut", "0 s, on the breath", () => mini(-160, -70, 140, 120) + mini(20, -70, 140, 120, true) + outl(-160, -70, 140, 120) + outl(20, -70, 140, 120) + L.stroke(L.line([0, -90], [0, 70]), { c: "red", w: "prop", dash: "8 8" })],
};
Object.entries(CAMS).forEach(([name, [t, sub, fn]]) => L.reg("motion", name, () => fn() + cap(t, sub), { box: [-190, -130, 380, 290], group: "Camera", label: `Camera · ${t}`, tags: ["camera", "transition", "motion"],
  call: name === "cam-push-in" ? "scene(a, b, { cam: \"push\" })  // L.MOTION.push" : name === "cam-pull-out" ? "scene(a, b, { cam: \"pull\" })  // L.MOTION.pull" : name === "cam-zoom-punch" ? "S.zoom(x, y, 1.25, t, 0.8)  // L.MOTION.zoom" : name === "cam-crossfade" ? "0.6 s crossfade = engine default (look: still)  // L.MOTION.crossfade" : name === "cam-hard-cut" ? "look: story = hard cuts  // L.MOTION.cut" : "S.pan(dx, dy, t, dur)  // L.MOTION.panRight / panLeft / tiltUp", demo: {} }));
})();
