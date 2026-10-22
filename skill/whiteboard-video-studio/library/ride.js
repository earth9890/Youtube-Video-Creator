// ===================== library/ride.js — vehicles with people, travel scenes, road pieces (category "ride") =====================
// Side-on vehicles FACE RIGHT, origin = bottom centre on the ground (wheels/keel at y ≈ 0); { flip: true } (L.put) faces left.
// The people inside are real cast figures (L.person): { who: "man05" } picks the driver's style, { who2 } the passenger's,
// { crowd: ["man01","girl03"] } the style pool for passengers; each can also be a full spec { style, hair, skin, outfitC, face }.
// They are drawn through the same LOOK tokens as everything else, so the owner's chosen Look / cast shows up in every vehicle.
// Options shared by most assets: { color } body colour name, { time: "day" | "sunset" | "night" }, { face: "happy"|"sleepy"|"shocked"… }.
(function () {
const L = window.L, f1 = L.f1;
const sh = L.shape, fl = L.flat, C = L.circ, RR = L.rrect, P = L.poly, G = L.g, T = L.text;
const CAT = "ride";
const D2R = Math.PI / 180;
const dot = (x, y, r, c, o) => sh(C(x, y, r), c, o);
const ln = (a, b, o = { w: "detail" }) => L.stroke(L.line(a, b), o);
const shd = (d, op = 0.18) => fl(d, "ink", op);
const gl = (d, op = 0.5) => fl(d, "white", op);
const pick = (o, k, d) => (o[k] === undefined ? d : o[k]);
const BIG = "M-1600 -1600 h3200 v3200 h-3200 Z";
const uid = () => "rd" + (L._n = (L._n || 0) + 1);
const clip = (d, inner) => { const id = uid(); return `<clipPath id="${id}"><path d="${d}"/></clipPath><g clip-path="url(#${id})">${inner}</g>`; };
// solid fill + features clipped inside + outline on top (stripes/shade never spill over the outline)
const solid = (d, c, inner = "", o = {}) => {
  const id = uid(), ol = o.oc || L.outline(c), eo = o.eo ? "evenodd" : undefined;
  return L.tag("path", { d, fill: L.paint(c, o), "fill-rule": eo }) +
    (inner ? `<clipPath id="${id}"><path d="${d}"${eo ? ' clip-rule="evenodd"' : ""}/></clipPath><g clip-path="url(#${id})">${inner}</g>` : "") +
    (ol === "none" ? "" : L.tag("path", { d, fill: "none", stroke: ol, "stroke-width": L.lw(o.w || "prop", o.s || 1), "stroke-linejoin": L.T.join, "stroke-linecap": L.T.cap }));
};
const tubes = (list) => {
  let a = "", b = "";
  list.forEach(([d, c, w]) => {
    const ol = L.outline(c);
    if (ol !== "none") a += L.tag("path", { d, fill: "none", stroke: ol, "stroke-width": w + 2 * L.lw("prop"), "stroke-linecap": "round", "stroke-linejoin": "round" });
    b += L.tag("path", { d, fill: "none", stroke: L.c(c), "stroke-width": w, "stroke-linecap": "round", "stroke-linejoin": "round" });
  });
  return a + b;
};
const tube = (d, c, w) => tubes([[d, c, w]]);
const wheel = (x, y, r, hub = "gray") => G(sh(C(0, 0, r), "ink", { w: "detail" }) + sh(C(0, 0, r * 0.56), hub, { w: "detail" }) + sh(C(0, 0, r * 0.18), "ink", { w: "detail" }), `translate(${x} ${y})`);
const spokeWheel = (x, y, r, n = 12) => G(sh(C(0, 0, r) + C(0, 0, r - 7), "ink", { w: "detail", eo: true }) + Array.from({ length: n }, (_, i) => ln([0, 0], [(r - 7) * Math.cos(D2R * i * (360 / n)), (r - 7) * Math.sin(D2R * i * (360 / n))], { w: 1.6, c: "gray" })).join("") + dot(0, 0, r * 0.13, "gray", { w: "detail" }), `translate(${x} ${y})`);
const wave = (x0, x1, y, a, n) => { let d = `M${x0} ${y}`; const w = (x1 - x0) / n; for (let i = 0; i < n; i++) d += ` q${f1(w / 4)} ${-a} ${f1(w / 2)} 0 t${f1(w / 2)} 0`; return d; };
const cloud = (x, y, k = 1, c = "white", op = 0.9) => fl(C(x, y, 16 * k, 11 * k) + C(x + 14 * k, y - 6 * k, 14 * k, 11 * k) + C(x + 28 * k, y, 16 * k, 11 * k), c, op);
const puff = (x, y, k = 1, c = "white") => { const d = C(x, y, 16 * k, 12 * k) + C(x + 15 * k, y - 7 * k, 15 * k, 12 * k) + C(x + 30 * k, y, 16 * k, 12 * k); const ol = L.outline(c); return (ol === "none" ? "" : L.tag("path", { d, fill: "none", stroke: ol, "stroke-width": 2 * L.lw("detail") })) + L.tag("path", { d, fill: L.c(c) }); };
const reg = (name, label, group, tags, fn, meta = {}) => {
  const opt = meta.opt ? `, ${meta.opt}` : "";
  L.reg(CAT, name, fn, Object.assign({ label, group, tags: ["ride", "travel", "transport", group.toLowerCase(), ...tags], box: [-260, -230, 520, 260], wide: true, demo: {},
    call: `L.put(S, "${name}", x, gy, { s: 1, t${opt} })` }, meta));
};
// ---------- time of day: tint laid over clipped bodies, lamps on at night ----------
const TM = (o) => (o.time === "night" ? "night" : o.time === "sunset" ? "sunset" : "day");
const tint = (o) => (TM(o) === "night" ? fl(BIG, "navy", 0.44) : TM(o) === "sunset" ? fl(BIG, "orange", 0.14) : "");
const night = (o) => TM(o) === "night";
const lampsOn = (o) => (o.lights !== undefined ? !!o.lights : night(o));
// body: solid() + tint for the time of day
const body = (o, d, c, inner = "", x = {}) => solid(d, c, inner + tint(o), x);
const glass = (o) => (night(o) ? "night" : "glass");
const beam = (x, y, len, h, k = 1) => fl(P([[x, y - 4 * k], [x + len, y - h], [x + len, y + h * 0.9], [x, y + 6 * k]], true), "yellow", 0.16) + fl(P([[x, y - 3 * k], [x + len * 0.62, y - h * 0.55], [x + len * 0.62, y + h * 0.5], [x, y + 4 * k]], true), "yellow", 0.2);
const glow = (x, y, r) => fl(C(x, y, r), "yellow", 0.22) + fl(C(x, y, r * 0.6), "yellow", 0.3);

// =====================================================================================================================
// PEOPLE IN VEHICLES: real L.person figures placed by head or hip, with arms/legs aimed at targets (2-bone IK)
// =====================================================================================================================
L.rideCast = L.rideCast || { man: "man01", woman: "girl01", boy: "man01", girl: "girl01" }; // one edit to change the default drivers
const HAIR_M = ["short", "side", "curly", "messy", "spiky", "short", "buzz"], HAIR_G = ["bun", "ponytail", "bob", "long", "braids", "pixie", "pigtails"];
const COLS = ["red", "blue", "green", "orange", "purple", "teal", "pink", "yellow"], SKINS = ["s2", "s3", "s1", "s4", "s2", "s5", "s3", "s6"];
// spec: a style name or { style, hair, hairC, skin, outfit, outfitC, face, body, acc, accC }
const sp = (v, def, extra) => Object.assign({ style: def }, extra, typeof v === "string" ? { style: v } : v);
// i-th passenger of a crowd: alternating styles from the pool, varied hair / colours / skin tones (deterministic)
const crowd = (o, i, kind) => {
  const pool = o.crowd || [L.rideCast.man, L.rideCast.woman], style = pool[i % pool.length], girl = /^girl/.test(style) || (kind === "girl");
  const hairs = girl ? HAIR_G : HAIR_M, j = (i * 3 + (kind === "kid" ? 1 : 0)) % hairs.length;
  return Object.assign({ style, hair: hairs[j], outfitC: COLS[(i * 5 + 2) % COLS.length], skin: SKINS[(i * 3 + 1) % SKINS.length], face: i % 5 === 3 ? "smile" : i % 4 === 1 ? "happy" : "smile", body: kind === "kid" ? "kid" : undefined }, o.crowdSpec);
};
const ANC = {};
const anc = (spec, stand) => {
  const k = [L.T.name, L.T.head.ratio, L.T.head.shape, L.T.head.fill, spec.style, spec.body, spec.outfit, stand].join("|");
  return ANC[k] || (ANC[k] = L.anchors({ style: spec.style, body: spec.body, sit: !stand }));
};
const ik = (r, t, l1, l2, pref) => {
  let dx = t[0] - r[0], dy = t[1] - r[1], d = Math.hypot(dx, dy) || 1;
  const mx = l1 + l2 - 0.5, mn = Math.abs(l1 - l2) + 1, k = d > mx ? mx / d : d < mn ? mn / d : 1;
  dx *= k; dy *= k; d *= k;
  const a = (l1 * l1 - l2 * l2 + d * d) / (2 * d), h = Math.sqrt(Math.max(0, l1 * l1 - a * a)), ux = dx / d, uy = dy / d;
  const c1 = [ux * a - uy * h, uy * a + ux * h], c2 = [ux * a + uy * h, uy * a - ux * h];
  const e = c1[0] * pref[0] + c1[1] * pref[1] >= c2[0] * pref[0] + c2[1] * pref[1] ? c1 : c2;
  return [e, [dx, dy]];
};
const noShadow = (fn) => L.useLook(Object.assign({}, L.T, { shadow: false }), fn);
const skinOf = (spec) => { const st = L.CAST[spec.style] || L.CAST.man01; return (st.head.fill || L.T.head.fill) === "white" ? "white" : spec.skin || st.skin || "s2"; };
// place(spec, { k | hr (head radius px), head:[x,y] | hip:[x,y], hands:[A,B] targets (absolute), feet:[A,B], lean (deg about hip), face, look, pose, legs })
// -> { svg, hands: absolute hand points, sk: skin colour name, hd: head centre, R }
const place = (spec, c) => {
  const a = anc(spec, c.stand), k = c.hr ? c.hr / a.R : c.k || 0.4, S = k * a.s, lean = c.lean || 0;
  const bod = L.BODIES[spec.body || (L.CAST[spec.style] || {}).body || "regular"] || {}, legK = bod.leg || 1;
  const hipL = [0, c.stand ? -130 * legK * S : -10 * S], hdL = [a.hd[0] * k, a.hd[1] * k];
  let tr;
  if (c.feetAt) tr = c.feetAt.slice(); else if (c.head) tr = [c.head[0] - hdL[0], c.head[1] - hdL[1]]; else tr = [c.hip[0] - hipL[0], c.hip[1] - hipL[1]];
  const hipA = [tr[0] + hipL[0], tr[1] + hipL[1]];
  const toL = (p) => { // absolute point -> person frame (undo lean about the hip, then the translation)
    let x = p[0] - hipA[0], y = p[1] - hipA[1];
    if (lean) { const q = -lean * D2R, cs = Math.cos(q), sn = Math.sin(q); [x, y] = [x * cs - y * sn, x * sn + y * cs]; }
    return [x + hipA[0] - tr[0], y + hipA[1] - tr[1]];
  };
  const roots = [a.abL, a.abR].map((p) => [p[0] * k, p[1] * k]);
  let pose = c.pose || "stand", arms, legs = c.legs;
  if (c.hands) {
    arms = c.hands.map((T, i) => (T ? ik(roots[i], toL(T), 58 * S, 52 * S, c.armPref || [0.2, 1]).map((p) => [p[0] / S, p[1] / S]) : L.POSES.stand[i]));
    L.POSES["rd-tmp"] = arms; pose = "rd-tmp";
  }
  if (c.feet) legs = c.feet.map((T, i) => (T ? ik(hipL, toL(T), 62 * S * legK, 73 * S * legK, c.kneePref || [1, -0.2]).map((p) => [p[0] / (S * legK), p[1] / (S * legK)]) : (c.stand ? L.LEGS.stand : L.LEGS.sit)[i]));
  const o = Object.assign({}, spec, { s: k, sit: !c.stand, pose, legs: legs || (c.stand ? L.LEGS.stand : L.LEGS.sit), face: c.face || spec.face || "smile", look: c.look === undefined ? 0.7 : c.look });
  const svg = noShadow(() => L.person(o));
  const place1 = `translate(${f1(tr[0])} ${f1(tr[1])})`;
  const hands = [a.abL, a.abR].map((r, i) => {
    const rel = (arms || [L.POSES.stand[0], L.POSES.stand[1]])[i], h = rel[1], q = [r[0] * k + h[0] * S, r[1] * k + h[1] * S];
    if (lean) { const cs = Math.cos(lean * D2R), sn = Math.sin(lean * D2R), x = q[0] + tr[0] - hipA[0], y = q[1] + tr[1] - hipA[1]; return [x * cs - y * sn + hipA[0], x * sn + y * cs + hipA[1]]; }
    return [q[0] + tr[0], q[1] + tr[1]];
  });
  return { svg: G(lean ? G(svg, place1) : svg, lean ? `rotate(${lean} ${f1(hipA[0])} ${f1(hipA[1])})` : place1), hands, sk: skinOf(spec), hd: (() => { const x = tr[0] + hdL[0], y = tr[1] + hdL[1]; if (!lean) return [x, y]; const cs = Math.cos(lean * D2R), sn = Math.sin(lean * D2R), dx = x - hipA[0], dy = y - hipA[1]; return [dx * cs - dy * sn + hipA[0], dx * sn + dy * cs + hipA[1]]; })(), R: a.R * k, S };
};
const fist = (pt, sk, r = 6) => (sk === "white" || (L.T.limb.style === "stick" && sk === "white") ? sh(C(pt[0], pt[1], r), sk, { w: "detail" }) : sh(C(pt[0], pt[1], r), sk, { w: "detail" }));
// a head + shoulders looking out of a window; everything is clipped to winD (the glass outline)
const bust = (spec, x, y, hr, winD, o = {}) => clip(winD, place(spec, Object.assign({ hr, head: [x, y], pose: "stand", legs: undefined }, o)).svg);
// a full person standing on the ground (own shadow), origin = feet centre
const stand = (spec, x, y, k, o = {}) => G(L.person(Object.assign({ pose: "stand" }, spec, { s: k, face: o.face || spec.face || "smile" }, o.p)), `translate(${f1(x)} ${f1(y)})`);

// ---------- one glass window with passengers: win(rect, [spec|null,...], o) ----------
const winRect = (x, y, w, h, r = 6) => RR(x, y, w, h, r);
function winPeople(o, rect, specs, hr, opts = {}) {
  const [x, y, w, h, r] = rect, d = opts.d || winRect(x, y, w, h, r);
  let inner = fl(d, night(o) ? "night" : "glass");
  if (night(o)) inner += fl(d, "yellow", 0.22);
  specs.forEach((s, i) => { if (s) inner += place(s, { hr, head: [x + (w * (i + 0.5)) / specs.length + (opts.dx || 0), y + h * (opts.hy || 0.5) + (i % 2 ? 2 : 0)], pose: "stand", legs: undefined, face: s.face || "smile", look: opts.look === undefined ? 0.5 : opts.look }).svg; });
  return clip(d, inner) + (opts.d ? "" : gl(P([[x + w * 0.12, y + 2], [x + w * 0.34, y + 2], [x + w * 0.16, y + h - 2], [x + 2, y + h - 2]], true), 0.22)) + L.tag("path", { d, fill: "none", stroke: L.outline("glass"), "stroke-width": L.lw("detail"), "stroke-linejoin": L.T.join });
}

// =====================================================================================================================
// CARS  (side view, facing right; { color, time, who, who2, face })
// =====================================================================================================================
const CARS = "Cars";
const CAR_BODY = "M-200 -40 Q-206 -78 -178 -86 L-136 -90 C-122 -100 -112 -150 -92 -164 L56 -164 C84 -160 100 -112 130 -92 L172 -86 Q204 -80 202 -44 Q202 -26 186 -26 L-186 -26 Q-200 -26 -200 -40 Z";
const GL_REAR = [[-122, -98], [-106, -148], [-94, -155], [-10, -155], [-10, -98]], GL_FRONT = [[2, -98], [2, -155], [50, -155], [78, -146], [112, -98]];
const GLASS_D = P(GL_REAR, true) + P(GL_FRONT, true);
const WHEEL = { x: [-105, 110], y: -34, r: 34 };
// people: [{ spec, x, hr, driver, y }]
function carArt(o, cfg = {}) {
  const c = pick(o, "color", cfg.def || "red"), on = lampsOn(o);
  let inner = fl(GLASS_D, glass(o)) + (night(o) ? fl(GLASS_D, "yellow", 0.22) : "");
  (cfg.people || []).forEach((p) => {
    const hr = p.hr || 21, y = p.y || -128;
    if (p.driver) {
      const wheelC = [80, -108], r = place(p.spec, { hr, head: [p.x, y], pose: "stand", face: p.spec.face, look: 0.8, hands: [[wheelC[0] - 2, wheelC[1] + 6], [wheelC[0] + 4, wheelC[1] - 8]], armPref: [0.1, 1] });
      inner += L.tag("path", { d: C(wheelC[0], wheelC[1], 6, 21), fill: "none", stroke: L.c("ink"), "stroke-width": 5 }) + r.svg + fist(r.hands[0], r.sk, 5) + fist(r.hands[1], r.sk, 5);
    } else inner += place(p.spec, { hr, head: [p.x, y], pose: "stand", face: p.spec.face, look: 0.6 }).svg;
  });
  inner += (cfg.inGlass || "") + tint(o);
  const glassArt = clip(GLASS_D, inner) + gl(P([[-104, -150], [-84, -150], [-116, -102], [-122, -102]], true), 0.2) + gl(P([[10, -150], [26, -150], [-2, -102], [2, -102]], true), 0.2) + L.tag("path", { d: GLASS_D, fill: "none", stroke: L.outline("glass"), "stroke-width": L.lw("detail"), "stroke-linejoin": L.T.join });
  const lamp = sh(RR(180, -78, 22, 16, 5), "yellow", { w: "detail" });
  return L.shadow(0, 0, 380) + (cfg.under || "") + (on ? beam(200, -70, 260, 46) + glow(196, -70, 34) : "") +
    body(o, CAR_BODY, c, fl(C(WHEEL.x[0], -34, 42) + C(WHEEL.x[1], -34, 42), "ink") + shd("M-210 -56 H210 V-20 H-210 Z", 0.13) + (cfg.paint || "") +
      L.stroke("M-84 -158 H50", { c: "white", w: 5, op: 0.45 }) + L.stroke("M-9 -97 V-32 M118 -92 L122 -34 M-134 -92 Q-128 -62 -132 -32", { w: "detail", op: 0.4 })) +
    glassArt + sh(RR(-34, -86, 20, 6, 3), "gray", { w: "detail" }) + sh(RR(26, -86, 20, 6, 3), "gray", { w: "detail" }) + sh(P([[88, -102], [102, -104], [104, -94], [90, -92]], true), c, { w: "detail", tone: 2 }) +
    lamp + (on ? fl(RR(176, -80, 30, 20, 6), "yellow", 0.35) : "") + sh(RR(-206, -76, 12, 22, 4), "red", { w: "detail" }) + sh(RR(166, -46, 40, 14, 6), "gray", { w: "detail" }) + sh(RR(-210, -46, 38, 14, 6), "gray", { w: "detail" }) +
    wheel(WHEEL.x[0], WHEEL.y, WHEEL.r) + wheel(WHEEL.x[1], WHEEL.y, WHEEL.r) + (cfg.over || "");
}
const man = (o, extra) => sp(o.who, L.rideCast.man, Object.assign({ face: o.face || "happy" }, extra));
const woman = (o, extra) => sp(o.who, L.rideCast.woman, Object.assign({ face: o.face || "happy" }, extra));
const BOXC = [-260, -240, 640, 280];
reg("ride-car-driver-man", "Man driving a car", CARS, ["man", "driver", "drive", "driving", "commute", "auto", "vehicle", "happy"], (o) => carArt(o, { people: [{ spec: man(o), x: 36, driver: true }] }),
  { box: BOXC, opt: "color, who, face: 'happy'|'sleepy'|'shocked', time", demo: { face: "happy" } });
reg("ride-car-driver-sleepy", "Sleepy driver", CARS, ["man", "driver", "tired", "sleepy", "yawn", "drowsy", "driving", "commute"], (o) => carArt(o, { def: "blue", people: [{ spec: man(o, { face: o.face || "sleepy" }), x: 36, driver: true }] }),
  { box: BOXC, opt: "color, who, face", demo: { face: "sleepy", color: "blue" } });
reg("ride-car-driver-shocked", "Shocked driver", CARS, ["man", "driver", "shocked", "scared", "surprised", "driving", "crash", "brake"], (o) => carArt(o, { def: "orange", people: [{ spec: man(o, { face: o.face || "shocked" }), x: 36, driver: true }] }),
  { box: BOXC, opt: "color, who, face", demo: { face: "shocked", color: "orange" } });
reg("ride-car-driver-woman", "Woman driving a car", CARS, ["woman", "girl", "driver", "drive", "driving", "commute", "auto", "vehicle"], (o) => carArt(o, { def: "teal", people: [{ spec: woman(o), x: 36, driver: true }] }),
  { box: BOXC, opt: "color, who, face, time", demo: { color: "teal" } });
reg("ride-car-family", "Family car (parent + kids)", CARS, ["family", "kids", "children", "parent", "dad", "mum", "road trip", "holiday", "vacation", "passenger", "travel"], (o) => {
  const kid = (i, k) => sp(o.kids && o.kids[i], i ? L.rideCast.boy : L.rideCast.girl, Object.assign({}, crowd(o, i + 2, "kid"), { style: i ? L.rideCast.boy : L.rideCast.girl, face: "happy", body: "kid" }, k));
  const roof = sh(RR(-84, -196, 118, 32, 8), "brown", { w: "detail" }) + L.stroke("M-40 -196 V-164 M10 -196 V-164", { w: "detail", op: 0.5 }) + sh(RR(-70, -216, 70, 22, 8), "orange", { w: "detail" }) + L.stroke("M-92 -168 H44", { c: "gray", w: 4 });
  return carArt(o, { def: "green", under: roof, people: [{ spec: man(o), x: 36, driver: true }, { spec: kid(0), x: -56, hr: 17 }, { spec: kid(1), x: -92, hr: 16 }] });
}, { box: [-290, -270, 700, 310], opt: "color, who, kids, time", demo: { color: "green" } });
reg("ride-taxi-passenger", "Taxi with driver and passenger", CARS, ["taxi", "cab", "driver", "passenger", "city", "fare", "ride", "hail"], (o) => {
  const checker = Array.from({ length: 24 }, (_, i) => [0, 1].map((r) => ((i + r) % 2 ? fl(`M${-200 + i * 17} ${-70 + r * 9} h17 v9 h-17 Z`, "ink") : "")).join("")).join("");
  const sign = sh(RR(-30, -196, 62, 30, 8), "white") + T("TAXI", 1, -174, { size: 20 });
  return carArt(o, { def: "yellow", paint: checker, under: sign + L.stroke("M0 -166 V-164", { w: 3 }), people: [{ spec: man(o, { face: "smile" }), x: 36, driver: true }, { spec: sp(o.who2, L.rideCast.woman, { face: "happy", hair: "bob", outfitC: "purple" }), x: -62, hr: 20 }] });
}, { box: [-290, -250, 700, 290], opt: "color, who, who2, time", demo: {} });
for (const [t, lab, tg] of [["sunset", "Car at sunset", ["evening", "golden hour", "dusk"]], ["night", "Car at night, headlights on", ["dark", "night drive", "headlights", "lights on", "evening"]]])
  reg("ride-car-" + t, lab, CARS, ["driver", "driving", "commute", "time of day", ...tg], (o) => carArt(Object.assign({ time: t }, o, { time: o.time || t }), { def: "blue", people: [{ spec: man(o), x: 36, driver: true }] }),
    { box: t === "night" ? [-260, -240, 760, 280] : BOXC, opt: "color, who, time", demo: { time: t } });
for (const [col, who] of [["red", 0], ["blue", 1], ["green", 0], ["yellow", 1], ["orange", 0], ["purple", 1]])
  reg("ride-car-" + col, "Car · " + col, "Car colours", ["car", "auto", "colour", col, "driver", "driving"], (o) => carArt(o, { def: col, people: [{ spec: who ? woman(o) : man(o), x: 36, driver: true }] }),
    { box: BOXC, opt: "color: '" + col + "', who, time", demo: { color: col } });
reg("ride-car-parked", "Parked car (empty)", CARS, ["parked", "parking", "stopped", "auto", "empty", "waiting", "street"], (o) => {
  const sign = tube("M250 0 V-150", "gray", 7) + sh(RR(226, -214, 50, 56, 8), "blue") + T("P", 251, -170, { size: 40, c: "white" });
  const seat = sh(RR(-96, -140, 24, 44, 9), "gray", { w: "detail" }) + sh(RR(24, -140, 24, 44, 9), "gray", { w: "detail" });
  return sign + carArt(o, { def: "purple", inGlass: seat + L.tag("path", { d: C(80, -108, 6, 21), fill: "none", stroke: L.c("ink"), "stroke-width": 5 }) });
}, { box: [-260, -250, 560, 290], opt: "color, time", demo: {} });
reg("ride-car-door-open", "Car with open door and person getting out", CARS, ["door", "open", "getting out", "arrive", "arrived", "exit", "park", "passenger", "stepping out"], (o) => {
  const c = pick(o, "color", "blue");
  const opening = fl("M-8 -98 L-8 -34 L114 -34 L112 -98 Z", "ink", 0.82) + fl(P([[0, -92], [28, -92], [24, -60], [4, -60]], true), "gray", 0.9);
  const door = sh(P([[112, -98], [160, -108], [160, -48], [114, -34]], true), c, { tone: 2 }) + sh(P([[118, -94], [152, -102], [152, -62], [118, -50]], true), "glass", { w: "detail" }) + sh(RR(120, -46, 16, 5, 2), "gray", { w: "detail" });
  const person = stand(sp(o.who, L.rideCast.woman, { face: "happy", outfitC: "purple" }), 70, 22, 0.55, { p: { pose: "wave", look: 0.3 } });
  return carArt(o, { def: "blue", paint: opening, over: door }) + person;
}, { box: [-290, -260, 620, 310], opt: "color, who", demo: {} });
reg("ride-car-broken", "Broken-down car with steam", CARS, ["breakdown", "broken", "steam", "engine", "overheat", "trouble", "stuck", "repair", "problem", "smoke"], (o) => {
  const hood = L.tag("path", { d: L.limb([[126, -94], [190, -160]], 14, 12), fill: L.paint(pick(o, "color", "red"), { tone: 2 }), stroke: L.outline("red"), "stroke-width": L.lw("prop"), "stroke-linejoin": "round" });
  const engine = sh(RR(136, -104, 46, 20, 5), "gray") + dot(150, -112, 6, "ink", { w: "detail" });
  const steam = [[150, -150, 1.1], [182, -190, 1.5], [150, -232, 1.2], [196, -262, 0.9]].map(([x, y, k]) => puff(x - 22 * k, y, k * 1.3)).join("");
  return carArt(o, { def: "red", under: engine + hood, people: [{ spec: man(o, { face: o.face || "shocked" }), x: 36, driver: true }], over: steam });
}, { box: [-290, -310, 700, 350], opt: "color, who, face", demo: {} });

reg("ride-convertible", "Convertible with two people, wind in the air", CARS, ["convertible", "open top", "cabriolet", "roof down", "two people", "couple", "friends", "wind", "fast", "road trip", "summer", "holiday", "drive"], (o) => {
  const c = pick(o, "color", "teal"), on = lampsOn(o);
  const BODY = "M-200 -38 Q-206 -76 -178 -82 L60 -88 C96 -90 128 -78 176 -76 Q204 -72 202 -44 Q202 -26 186 -26 L-186 -26 Q-200 -26 -200 -38 Z";
  const d = man(o, { outfitC: "orange" }), pa = sp(o.who2, L.rideCast.woman, { face: "excited", hair: "ponytail", outfitC: "yellow" });
  const seats = [-62, 28].map((x) => sh(RR(x - 40, -132, 24, 50, 10), "brown", { w: "detail" })).join("");
  const wc = [66, -116], dr = place(d, { hr: 24, head: [28, -142], pose: "stand", face: d.face, look: 0.8, feet: [[70, -58], [84, -58]], hands: [[wc[0] - 2, wc[1] + 8], [wc[0] + 3, wc[1] - 6]], armPref: [0.1, 1] });
  const pp = place(pa, { hr: 24, head: [-62, -144], pose: "stand", face: pa.face, look: 0.6, feet: [[-20, -58], [-6, -58]], hands: [[-104, -190], [-20, -192]], armPref: [0, 1] });
  const wind = [[-214, -170, 70], [-224, -146, 100], [-212, -122, 60], [-230, -98, 84]].map(([x, y, w]) => L.stroke(`M${x} ${y} h${-w} q${-18} 0 ${-18} ${-12}`, { c: "gray", w: 4, op: 0.65 })).join("");
  return L.shadow(0, 0, 380) + (on ? beam(200, -62, 260, 46) + glow(196, -62, 34) : "") + wind + seats + pp.svg + dr.svg + L.tag("path", { d: C(wc[0], wc[1], 6, 21), fill: "none", stroke: L.c("ink"), "stroke-width": 5 }) + fist(dr.hands[0], dr.sk, 5) + fist(dr.hands[1], dr.sk, 5) +
    sh(P([[48, -88], [74, -146], [92, -144], [70, -86]], true), glass(o), { w: "detail" }) +
    body(o, BODY, c, fl(C(WHEEL.x[0], -34, 42) + C(WHEEL.x[1], -34, 42), "ink") + shd("M-210 -52 H210 V-20 H-210 Z", 0.13) + L.stroke("M-170 -80 L56 -86", { c: "white", w: 5, op: 0.5 }) + L.stroke("M-40 -84 V-40", { w: "detail", op: 0.35 })) +
    sh(RR(-40, -76, 22, 6, 3), "gray", { w: "detail" }) + sh(RR(178, -70, 22, 14, 5), "yellow", { w: "detail" }) + sh(RR(-206, -70, 12, 20, 4), "red", { w: "detail" }) + sh(RR(166, -46, 40, 14, 6), "gray", { w: "detail" }) + sh(RR(-210, -46, 38, 14, 6), "gray", { w: "detail" }) +
    wheel(WHEEL.x[0], WHEEL.y, WHEEL.r) + wheel(WHEEL.x[1], WHEEL.y, WHEEL.r);
}, { box: [-340, -230, 720, 270], opt: "color, who, who2, time", demo: {} });

// front / three-quarter view
reg("ride-car-front", "Car seen from the front (2 people)", CARS, ["front", "front view", "facing", "oncoming", "coming", "driver", "passenger", "windscreen", "auto", "approaching"], (o) => {
  const c = pick(o, "color", "orange"), on = lampsOn(o);
  const GL = "M-80 -118 L-68 -186 Q-66 -192 -58 -192 L58 -192 Q66 -192 68 -186 L80 -118 Z";
  const a = man(o, { face: o.face || "happy" }), b = sp(o.who2, L.rideCast.woman, { face: "happy", hair: "bob", outfitC: "purple" });
  const dr = place(a, { hr: 21, head: [-34, -150], pose: "stand", face: a.face, look: 0, hands: [[-52, -118], [-20, -118]], armPref: [0, 1] });
  const pa = place(b, { hr: 21, head: [38, -150], pose: "stand", face: b.face, look: 0 });
  const inner = fl(GL, glass(o)) + (night(o) ? fl(GL, "yellow", 0.2) : "") + pa.svg + dr.svg + L.tag("path", { d: C(-36, -116, 17, 12), fill: "none", stroke: L.c("ink"), "stroke-width": 5 }) + fist(dr.hands[0], dr.sk, 5) + fist(dr.hands[1], dr.sk, 5) + tint(o);
  return L.shadow(0, 0, 300) + (on ? beam(-100, -76, 0, 0) : "") +
    sh(RR(-128, -46, 30, 46, 8), "ink", { w: "detail" }) + sh(RR(98, -46, 30, 46, 8), "ink", { w: "detail" }) +
    body(o, "M-96 -108 L-80 -192 Q-76 -204 -60 -204 L60 -204 Q76 -204 80 -192 L96 -108 Z", c, shd("M-100 -70 H100 V-100 H-100 Z", 0.12), { tone: 2 }) +
    body(o, RR(-126, -118, 252, 84, 28), c, shd("M-130 -50 H130 V-30 H-130 Z", 0.15) + L.stroke("M-100 -108 Q0 -120 100 -108", { c: "white", w: 6, op: 0.45 })) +
    clip(GL, inner) + gl(P([[-60, -186], [-40, -186], [-56, -122], [-72, -122]], true), 0.2) + L.tag("path", { d: GL, fill: "none", stroke: L.outline("glass"), "stroke-width": L.lw("detail"), "stroke-linejoin": L.T.join }) +
    sh(RR(-46, -92, 92, 26, 10), "gray", { w: "detail" }) + L.stroke("M-30 -86 V-72 M-10 -86 V-72 M10 -86 V-72 M30 -86 V-72", { w: "detail", op: 0.5 }) +
    [-1, 1].map((k) => (on ? fl(C(k * 84, -92, 30, 26), "yellow", 0.3) : "") + sh(RR(k * 84 - 20, -108, 40, 30, 14), on ? "yellow" : "glass", { w: "detail" }) + dot(k * 84, -93, 6, "white", { w: 2 }) + sh(RR(k * 130 - 10, -150, 20, 16, 5), c, { tone: 2, w: "detail" })).join("") +
    sh(RR(-126, -56, 252, 22, 10), "gray", { w: "detail" }) + sh(RR(-26, -54, 52, 18, 4), "white", { w: "detail" }) + sh(P([[-12, -164], [12, -164], [12, -160], [-12, -160]], true), "gray", { w: 2 });
}, { box: [-190, -230, 380, 270], opt: "color, who, who2, time", demo: {} });

// =====================================================================================================================
// DRIVING INTERIOR (driver's point of view) + REAR-VIEW MIRROR
// =====================================================================================================================
const skyBands = (o, y0, y1, x0, x1) => {
  const t = TM(o), c = t === "night" ? "night" : t === "sunset" ? "dusk" : "sky", w = x1 - x0;
  let s = fl(`M${x0} ${y0} h${w} V${y1} h${-w} Z`, c) + fl(`M${x0} ${y0} h${w} v${(y1 - y0) * 0.5} h${-w} Z`, t === "night" ? "navy" : t === "sunset" ? "orange" : "sky", t === "night" ? 0.6 : t === "sunset" ? 0.28 : 0.35);
  return s;
};
function roadAhead(o, hz, near, hw0, hw1, x0, x1, top) {
  const t = TM(o), cx = 0, hwAt = (y) => hw0 + (hw1 - hw0) * ((y - hz) / (near - hz));
  let s = skyBands(o, top, hz, x0, x1);
  if (t === "night") s += [[-380, -380], [-300, -430], [-180, -400], [-70, -440], [60, -370], [150, -420], [260, -390], [350, -440]].map(([x, y]) => fl(C(x, y, 3.2), "white", 0.9)).join("") + fl(C(300, hz - 100, 26), "cream", 0.95);
  else if (t === "sunset") s += fl(C(170, hz - 8, 40), "orange", 0.95) + fl(C(170, hz - 8, 62), "orange", 0.25) + cloud(-250, hz - 90, 1.5, "pink", 0.8) + cloud(60, hz - 130, 1.1, "pink", 0.7);
  else s += fl(C(250, hz - 110, 34), "yellow", 0.95) + cloud(-260, hz - 100, 1.6, "white", 0.95) + cloud(40, hz - 140, 1.2, "white", 0.9);
  const grass = t === "night" ? "green" : "grass";
  s += fl(`M${x0} ${hz - 34} Q-300 ${hz - 70} -140 ${hz - 28} Q0 ${hz - 60} 150 ${hz - 24} Q300 ${hz - 66} ${x1} ${hz - 30} V${hz} H${x0} Z`, "green", 0.9) + fl(`M${x0} ${hz} H${x1} V${near} H${x0} Z`, grass);
  [[-330, 0.9], [-250, 0.7], [-170, 0.55], [200, 0.6], [290, 0.8], [370, 1]].forEach(([x, k]) => { s += tube(`M${x} ${hz + 8} V${hz - 34 * k}`, "brown", 5 * k) + sh(C(x, hz - 40 * k, 20 * k, 24 * k), "green", { w: "detail" }); });
  const road = P([[-hwAt(hz), hz], [hwAt(hz), hz], [hwAt(near), near], [-hwAt(near), near]], true);
  s += fl(road, "gray") + fl(road, "ink", 0.22);
  for (let i = 0; i < 6; i++) { const a = Math.pow(i / 6, 1.8), b = Math.pow((i + 0.55) / 6, 1.8), ya = hz + (near - hz) * a, yb = hz + (near - hz) * b, wa = hwAt(ya) * 0.045, wb = hwAt(yb) * 0.045; s += fl(P([[-wa, ya], [wa, ya], [wb, yb], [-wb, yb]], true), "white", 0.95); }
  s += L.stroke(L.line([-hwAt(hz), hz], [-hwAt(near), near]), { c: "white", w: 4, op: 0.8 }) + L.stroke(L.line([hwAt(hz), hz], [hwAt(near), near]), { c: "white", w: 4, op: 0.8 });
  // a small car driving ahead (rear view)
  const cy = hz + 26, k = 0.5, ccol = t === "night" ? "red" : "blue";
  s += sh(RR(-24 * k * 2, cy - 30, 48 * k * 2, 24, 6), ccol, { w: "detail" }) + sh(RR(-17 * k * 2, cy - 44, 34 * k * 2, 18, 5), ccol, { w: "detail", tone: 2 }) + sh(RR(-14, cy - 41, 28, 11, 3), "glass", { w: 2 }) + sh(RR(-22, cy - 22, 9, 6, 2), "red", { w: 2 }) + sh(RR(13, cy - 22, 9, 6, 2), "red", { w: 2 }) + (t === "night" ? fl(C(-18, cy - 19, 12), "red", 0.3) + fl(C(18, cy - 19, 12), "red", 0.3) : "");
  if (t === "night") s += fl(P([[-60, near], [60, near], [hwAt(hz + 60) * 0.5, hz + 60], [-hwAt(hz + 60) * 0.5, hz + 60]], true), "yellow", 0.14) + fl(P([[-30, near], [30, near], [hwAt(hz + 90) * 0.28, hz + 90], [-hwAt(hz + 90) * 0.28, hz + 90]], true), "yellow", 0.14);
  return s;
}
function interior(o) {
  const t = TM(o), nt = t === "night", W0 = -450, W1 = 450, TOP = -470, HZ = -300, DASH = -150;
  const spec = man(o, { outfitC: o.outfitC || "blue" }), outC = spec.outfitC || (L.CAST[spec.style] || {}).outfitC || "blue", sk = skinOf(spec);
  const dark = nt ? "ink" : "navy";
  let s = roadAhead(o, HZ, -120, 18, 330, W0, W1, TOP);
  // pillars, roof, mirror
  s += sh(P([[W0, TOP], [-300, TOP], [-228, -118], [W0, -118]], true), dark, { w: "scene", tone: 2 }) + sh(P([[W1, TOP], [300, TOP], [228, -118], [W1, -118]], true), dark, { w: "scene", tone: 2 }) + sh(P([[W0, TOP - 4], [W1, TOP - 4], [W1, -452], [260, -438], [-260, -438], [W0, -452]], true), dark, { w: "scene", tone: 2 });
  s += tube("M0 -446 V-430", "gray", 8) + sh(RR(-64, -432, 128, 38, 14), dark, { w: "prop", tone: 2 }) + fl(RR(-56, -426, 112, 26, 10), nt ? "navy" : "sky", nt ? 0.9 : 0.8) + fl(P([[-30, -420], [-8, -420], [-28, -402], [-44, -402]], true), "white", nt ? 0.12 : 0.4);
  // dashboard
  const dash = `M${W0} 0 V-118 Q-300 -168 0 -158 Q300 -168 ${W1} -118 V0 Z`;
  s += sh(dash, dark, { w: "scene", tone: 2 }) + fl("M-440 -126 Q-300 -164 0 -154 Q300 -164 440 -126 V-134 Q300 -176 0 -166 Q-300 -176 -440 -134 Z", "white", nt ? 0.05 : 0.18);
  s += sh(RR(150, -132, 120, 30, 10), "gray", { w: "detail", tone: 2 }) + L.stroke("M168 -126 V-108 M190 -126 V-108 M212 -126 V-108 M234 -126 V-108 M256 -126 V-108", { w: "detail", op: 0.5 }) + sh(RR(300, -120, 70, 46, 10), nt ? "teal" : "gray", { w: "detail" }) + (nt ? fl(RR(300, -120, 70, 46, 10), "teal", 0.4) : "");
  // gauges
  [[-170, -92], [-50, -92]].forEach(([x, y], i) => {
    s += sh(C(x, y, 34), "ink", { w: "detail" }) + (nt ? fl(C(x, y, 30), "teal", 0.4) : "") + L.stroke(L.arc(x, y, 25, 150, 390), { w: "detail", c: nt ? "yellow" : "cream", op: 0.85 }) + L.stroke(L.line([x, y], [x + 18 * Math.cos((i ? -40 : -120) * D2R), y + 18 * Math.sin((i ? -40 : -120) * D2R)]), { c: "red", w: 4 }) + dot(x, y, 5, "ink", { w: 2 });
  });
  // steering wheel
  const wc = [-110, -10], rx = 168, ry = 122, ring = `M${wc[0] - rx} ${wc[1]} A${rx} ${ry} 0 1 1 ${wc[0] + rx} ${wc[1]} A${rx} ${ry} 0 1 1 ${wc[0] - rx} ${wc[1]} Z`;
  s += tubes([[`M${wc[0]} ${wc[1] - 6} L${wc[0] - rx + 6} ${wc[1] - 6}`, "ink", 30], [`M${wc[0]} ${wc[1] - 6} L${wc[0] + rx - 6} ${wc[1] - 6}`, "ink", 30], [`M${wc[0]} ${wc[1]} L${wc[0]} ${wc[1] + ry - 8}`, "ink", 30]]);
  s += L.tag("path", { d: ring, fill: "none", stroke: L.outline("ink") === "none" ? L.c("ink") : L.outline("ink"), "stroke-width": 36 + 2 * L.lw("prop"), "stroke-linejoin": "round" }) + L.tag("path", { d: ring, fill: "none", stroke: L.c("ink", 1), "stroke-width": 36 }) + L.stroke(L.arc(wc[0], wc[1], rx, 200, 290, ry), { c: "white", w: 6, op: 0.28 });
  s += sh(C(wc[0], wc[1] - 4, 44, 36), "gray", { w: "prop" }) + dot(wc[0], wc[1] - 4, 16, "ink", { w: "detail" });
  // arms + hands on the wheel (10 and 2 o'clock)
  const hl = [wc[0] - 138, wc[1] - 62], hr = [wc[0] + 138, wc[1] - 62];
  const sleeve = (from, to) => L.tag("path", { d: L.limb([from, [(from[0] + to[0]) / 2 + (from[0] < to[0] ? -14 : 14), (from[1] + to[1]) / 2 + 20], to], 62, 44), fill: L.paint(outC, {}), stroke: L.outline(outC), "stroke-width": L.lw("char"), "stroke-linejoin": "round" });
  s += sleeve([hl[0] - 90, 12], hl) + sleeve([hr[0] + 90, 12], hr) + [hl, hr].map((h) => sh(C(h[0], h[1], 24, 22), sk, { w: "char" })).join("");
  if (nt) s += fl(P([[W0, TOP], [W1, TOP], [W1, 0], [W0, 0]], true), "navy", 0.18);
  else if (t === "sunset") s += fl(P([[W0, TOP], [W1, TOP], [W1, 0], [W0, 0]], true), "orange", 0.1);
  return clip(`M${W0} ${TOP} H${W1} V0 H${W0} Z`, s);
}
for (const t of ["day", "night"])
  reg("ride-driving-view-" + t, "Driving · driver's view, " + t, "Driving views", ["dashboard", "steering wheel", "hands", "road ahead", "windscreen", "windshield", "pov", "first person", "drive", "driving", "car interior", "cockpit", t], (o) => interior(Object.assign({ time: t }, o)),
    { box: [-450, -470, 900, 480], opt: "who (hands/sleeves), time", demo: { time: t } });
reg("ride-driving-view-sunset", "Driving · driver's view, sunset", "Driving views", ["dashboard", "steering wheel", "hands", "road ahead", "drive", "driving", "car interior", "sunset", "evening"], (o) => interior(Object.assign({ time: "sunset" }, o)), { box: [-450, -470, 900, 480], opt: "time", demo: { time: "sunset" } });
function mirror(o) {
  const t = TM(o), nt = t === "night", dark = nt ? "ink" : "navy", x0 = -120, x1 = 120, y0 = -96, y1 = 0, hz = -40, gd = RR(x0 + 10, y0 + 10, x1 - x0 - 20, y1 - y0 - 20, 22);
  const road = P([[-4, hz], [4, hz], [96, y1], [-96, y1]], true);
  let sc = skyBands(o, y0, hz, x0, x1) + fl(`M${x0} ${hz - 10} Q-60 ${hz - 26} -10 ${hz - 6} Q50 ${hz - 24} ${x1} ${hz - 8} V${hz} H${x0} Z`, "green", 0.85) + fl(`M${x0} ${hz} H${x1} V${y1} H${x0} Z`, nt ? "green" : "grass") + fl(road, "gray") + fl(road, "ink", 0.22);
  for (let i = 0; i < 4; i++) { const a = Math.pow(i / 4, 1.7), b = Math.pow((i + 0.5) / 4, 1.7), ya = hz + (y1 - hz) * a, yb = hz + (y1 - hz) * b; sc += fl(P([[-1.2 - a * 3, ya], [1.2 + a * 3, ya], [1.2 + b * 3, yb], [-1.2 - b * 3, yb]], true), "white", 0.9); }
  sc += tube("M-100 -20 V-48", "brown", 4) + sh(C(-100, -54, 15, 17), "green", { w: "detail" }) + tube("M104 -18 V-44", "brown", 4) + sh(C(104, -50, 14, 16), "green", { w: "detail" });
  // the car behind us
  sc += sh(RR(-24, -40, 48, 22, 7), "blue", { w: "detail" }) + sh(RR(-16, -52, 32, 16, 5), "blue", { w: "detail", tone: 2 }) + sh(RR(-12, -49, 24, 9, 3), "glass", { w: 2 }) + sh(RR(-21, -33, 11, 8, 3), nt ? "yellow" : "white", { w: 2 }) + sh(RR(10, -33, 11, 8, 3), nt ? "yellow" : "white", { w: 2 }) + (nt ? fl(C(-16, -29, 18), "yellow", 0.3) + fl(C(16, -29, 18), "yellow", 0.3) : "");
  if (nt) sc += fl(P([[-40, y1], [40, y1], [24, hz + 12], [-24, hz + 12]], true), "yellow", 0.1);
  const dim = nt ? fl(gd, "navy", 0.2) : t === "sunset" ? fl(gd, "orange", 0.1) : "";
  return tubes([["M0 -100 V-112 H0", "gray", 9]]) + sh(RR(-34, -122, 68, 14, 5), "gray", { w: "detail" }) + sh(RR(x0, y0, x1 - x0, y1 - y0, 28), dark, { w: "prop", tone: 2 }) + clip(gd, sc + dim) + L.tag("path", { d: gd, fill: "none", stroke: L.outline("ink"), "stroke-width": L.lw("detail"), "stroke-linejoin": L.T.join }) + gl(P([[-84, -86], [-52, -86], [-100, -10], [-112, -10]], true), 0.2);
}
for (const t of ["day", "sunset", "night"])
  reg("ride-rear-view-mirror-" + t, "Rear-view mirror · " + t, "Driving views", ["mirror", "rear view", "behind", "following", "car behind", "chase", "tailgating", "road behind", "driving", t], (o) => mirror(Object.assign({ time: t }, o)),
    { box: [-140, -134, 280, 150], opt: "time", demo: { time: t }, wide: false });

// =====================================================================================================================
// BUSES, TRAMS, TRAINS, SUBWAY, CABLE CARS
// =====================================================================================================================
const BUS = "Buses and trams", TRN = "Trains";
const crowdList = (o, n, kind, seed = 0) => Array.from({ length: n }, (_, i) => ((i + seed) % 5 === 4 ? null : crowd(o, i + seed, kind)));
const drv = (o, extra) => sp(o.driver, L.rideCast.man, Object.assign({ face: "smile", acc: ["cap"], accC: "navy", outfitC: "navy" }, extra));
reg("ride-school-bus", "School bus with kids in the windows", BUS, ["school", "bus", "kids", "children", "students", "yellow", "ride to school", "commute", "passengers", "driver"], (o) => {
  const c = pick(o, "color", "yellow"), BODYD = "M-232 -34 V-150 Q-232 -166 -216 -166 H128 Q140 -166 142 -154 V-112 H196 Q226 -112 230 -90 V-34 Q230 -22 218 -22 H-220 Q-232 -22 -232 -34 Z";
  const kids = crowdList(o, 6, "kid", 1), xs = [-214, -164, -114, -64, -14, 36];
  const wins = xs.map((x, i) => winPeople(o, [x, -150, 44, 44, 6], [kids[i], i % 2 && kids[i] ? Object.assign(crowd(o, i + 9, "kid"), { face: "happy" }) : null].filter((v, j) => j === 0 || v), 13, { hy: 0.58 })).join("") + winPeople(o, [88, -150, 44, 44, 6], [drv(o)], 15, { hy: 0.6, look: 0.8 });
  return L.shadow(0, 0, 500) + (lampsOn(o) ? beam(228, -70, 220, 44) + glow(224, -70, 30) : "") +
    body(o, BODYD, c, fl(C(-130, -32, 44) + C(130, -32, 44), "ink") + fl("M-240 -90 H240 V-82 H-240 Z", "ink") + fl("M-240 -48 H240 V-40 H-240 Z", "ink") + shd("M-240 -30 H240 V-20 H-240 Z", 0.14)) + T("SCHOOL BUS", -22, -58, { size: 21, weight: 700 }) + wins +
    sh(P([[144, -154], [150, -112], [144, -112]], true), "glass", { w: "detail" }) + sh(RR(98, -104, 36, 66, 4), glass(o), { w: "detail" }) + sh(RR(-228, -160, 10, 8, 3), "red", { w: "detail" }) + sh(RR(214, -78, 14, 14, 4), "yellow", { w: "detail" }) + sh(RR(-234, -76, 8, 16, 3), "red", { w: "detail" }) + sh(RR(206, -46, 28, 12, 5), "gray", { w: "detail" }) +
    sh(RR(-76, -108, 30, 30, 4), "red", { w: "detail" }) + wheel(-130, -32, 34) + wheel(130, -32, 34);
}, { box: [-280, -250, 620, 290], opt: "color, kids, driver, time", demo: {} });

const busBody = (o, name, def, tagsX) => {
  const c = pick(o, "color", def), BODYD = "M-242 -40 V-152 Q-242 -174 -220 -174 H192 Q216 -174 224 -152 L234 -76 V-34 Q234 -22 222 -22 H-230 Q-242 -22 -242 -34 Z";
  const pass = crowdList(o, 6, "adult", 2), xs = [-226, -166, -106, -46, 14].map((x) => x), wins = xs.map((x, i) => winPeople(o, [x, -160, 54, 54, 7], [pass[i], i === 1 || i === 3 ? Object.assign(crowd(o, i + 11, i === 3 ? "kid" : "adult"), { face: "happy" }) : null].filter((v, j) => j === 0 || v), 15, { hy: 0.52 })).join("");
  const dw = winPeople(o, [150, -160, 62, 66, 8], [drv(o)], 17, { hy: 0.56, look: 0.9 });
  return L.shadow(0, 0, 520) + (lampsOn(o) ? beam(232, -66, 240, 48) + glow(228, -66, 32) : "") +
    body(o, BODYD, c, fl(C(-150, -30, 44) + C(130, -30, 44), "ink") + fl("M-250 -92 H250 V-80 H-250 Z", "white", 0.92) + shd("M-250 -38 H250 V-20 H-250 Z", 0.14) + L.stroke("M-236 -170 H190", { c: "white", w: 5, op: 0.4 })) + wins + dw +
    sh(RR(84, -160, 50, 126, 5), glass(o), { w: "detail" }) + L.stroke("M109 -160 V-36", { w: "detail" }) + sh(RR(150, -184, 56, 12, 4), "ink", { w: "detail" }) + T("42", 178, -175, { size: 12, c: "yellow" }) +
    sh(RR(224, -64, 14, 16, 4), "yellow", { w: "detail" }) + (lampsOn(o) ? fl(RR(216, -68, 24, 24, 6), "yellow", 0.4) : "") + sh(RR(-244, -66, 8, 18, 3), "red", { w: "detail" }) + wheel(-150, -30, 34) + wheel(130, -30, 34);
};
reg("ride-city-bus", "City bus with passengers", BUS, ["bus", "public transport", "commute", "passengers", "city", "transit", "driver", "route", "coach"], (o) => busBody(o, "bus", "blue"), { box: [-290, -270, 640, 310], opt: "color, driver, crowd, time", demo: {} });
for (const [t, col] of [["sunset", "orange"], ["night", "teal"]])
  reg("ride-city-bus-" + t, "City bus · " + t, BUS, ["bus", "public transport", "commute", "passengers", t, "evening", "late"], (o) => busBody(Object.assign({ time: t }, o), "bus", col), { box: [-290, -270, t === "night" ? 820 : 640, 310], opt: "color, driver, time", demo: { time: t } });
reg("ride-tram", "Tram with passengers", BUS, ["tram", "streetcar", "trolley", "public transport", "commute", "city", "passengers", "electric", "rails"], (o) => {
  const c = pick(o, "color", "green"), pass = crowdList(o, 5, "adult", 4);
  const wins = [-170, -112, -54, 4].map((x, i) => winPeople(o, [x, -146, 50, 52, 8], [pass[i], i === 2 ? Object.assign(crowd(o, 17, "kid"), { face: "happy" }) : null].filter((v, j) => j === 0 || v), 15, { hy: 0.54 })).join("");
  return L.shadow(0, 0, 460) + ln([-270, -246], [270, -246], { w: 3 }) + tubes([["M-10 -160 L-48 -208 L16 -234", "gray", 5]]) + sh(RR(-24, -244, 68, 8, 3), "gray", { w: "detail" }) + sh(RR(-270, -4, 540, 8, 2), "gray", { w: "detail" }) +
    body(o, RR(-206, -170, 412, 140, 32), c, fl("M-210 -78 H210 V-62 H-210 Z", "white", 0.92) + shd("M-210 -46 H210 V-28 H-210 Z", 0.14)) + wins + winPeople(o, [76, -146, 30, 104, 7], [], 12) +
    winPeople(o, [118, -146, 62, 52, 8], [drv(o)], 16, { hy: 0.56, look: 0.9 }) + sh(RR(116, -90, 70, 8, 3), c, { w: 2, tone: 2 }) + sh(C(196, -60, 8), "yellow", { w: "detail" }) + (lampsOn(o) ? glow(196, -60, 28) : "") + sh(RR(-208, -66, 8, 16, 3), "red", { w: "detail" }) +
    wheel(-140, -18, 18) + wheel(-80, -18, 18) + wheel(80, -18, 18) + wheel(140, -18, 18);
}, { box: [-290, -270, 600, 310], opt: "color, driver, time", demo: {} });

// ---- train: locomotive + carriages, time of day ----
function train(o) {
  const c = pick(o, "color", "red"), c2 = pick(o, "color2", "blue"), on = lampsOn(o);
  const carr = (x, seed) => {
    const pass = crowdList(o, 4, "adult", seed);
    return body(o, RR(x, -156, 232, 128, 14), c2, fl(`M${x} -72 H${x + 232} V-58 H${x} Z`, "white", 0.92) + shd(`M${x} -44 H${x + 232} V-26 H${x} Z`, 0.12)) +
      [0, 1, 2, 3].map((i) => winPeople(o, [x + 12 + i * 54, -140, 46, 50, 7], [i % 2 ? pass[i] : null].filter(Boolean), 14, { hy: 0.55 })).join("") +
      sh(RR(x - 4, -96, 8, 30, 2), "gray", { w: "detail" }) + sh(RR(x + 228, -96, 8, 30, 2), "gray", { w: "detail" });
  };
  const wh = (x) => wheel(x - 18, -20, 16) + wheel(x + 18, -20, 16);
  const eng = body(o, "M112 -30 V-156 Q112 -170 128 -170 H252 Q312 -164 340 -100 V-36 Q340 -30 330 -30 Z", c, fl("M108 -72 H350 V-58 H108 Z", "white", 0.92) + shd("M108 -46 H350 V-26 H108 Z", 0.12));
  const cab = winPeople(o, [128, -152, 62, 64, 8], [sp(o.driver, L.rideCast.man, { face: "happy", acc: ["cap"], accC: "blue", outfitC: "navy" })], 17, { hy: 0.56, look: 0.9 });
  return L.shadow(0, 0, 760) + sh(RR(-380, -4, 760, 8, 2), "gray", { w: "detail" }) + Array.from({ length: 31 }, (_, i) => fl(RR(-376 + i * 25, 3, 13, 5, 1), "wood")).join("") +
    (on ? beam(336, -78, 160, 30) : "") + carr(-372, 3) + carr(-132, 8) + sh(RR(-142, -92, 14, 12, 3), "gray", { w: "detail" }) + eng + cab + sh(P([[238, -164], [276, -158], [304, -118], [238, -118]], true), glass(o), { w: "detail" }) + sh(RR(206, -190, 20, 20, 5), "gray", { w: "detail" }) + sh(RR(200, -198, 32, 10, 4), "ink", { w: "detail" }) +
    sh(C(334, -80, 9), "yellow", { w: "detail" }) + (on ? glow(334, -80, 26) : "") + sh(RR(318, -52, 26, 12, 5), "gray", { w: "detail" }) + wh(-300) + wh(-196) + wh(-60) + wh(36) + wh(150) + wh(284);
}
for (const t of ["day", "sunset", "night"])
  reg("ride-train-" + t, t === "day" ? "Train with passengers" : "Train · " + t, TRN, ["train", "railway", "locomotive", "carriage", "passengers", "commute", "travel", "rail", "journey", t], (o) => train(Object.assign({ time: t }, o)), { box: [-410, -240, 920, 280], opt: "color, color2, driver, time", demo: { time: t } });

// ---- subway / metro interior ----
reg("ride-subway-interior", "Subway car interior with commuters", TRN, ["subway", "metro", "underground", "tube", "commuters", "commute", "inside", "interior", "train interior", "strap", "rush hour", "passengers"], (o) => {
  const W0 = -450, W1 = 450, FL = 0, TP = -420;
  const people = [-340, -230, -70, 60].map((x, i) => i < 3 ? place(crowd(o, i + 3, "adult"), { hr: 24, head: [x, -178], pose: "stand", face: i === 1 ? "sleepy" : "smile", look: 0.3, hands: i === 2 ? [[x - 14, -92], [x + 14, -92]] : undefined }).svg : "").join("");
  let s = fl(`M${W0} ${TP} H${W1} V${FL} H${W0} Z`, "wall") + fl(`M${W0} -60 H${W1} V${FL} H${W0} Z`, "floor");
  // tunnel windows with streaking lights
  [[-390], [-120], [150], [400]].forEach(([x], i) => { const d = RR(x - 110, -330, 220, 130, 14); s += sh(d, "navy", { w: "prop" }) + clip(d, [0, 1, 2, 3, 4].map((k) => fl(RR(x - 120 + ((k * 61 + i * 23) % 200), -310 + k * 24, 70 + (k % 2) * 30, 7, 3), "yellow", 0.7)).join("") + fl(d, "ink", 0.12)); });
  // benches along the wall (people sit on them)
  s += sh(RR(-420, -128, 840, 22, 8), "blue") + sh(RR(-420, -112, 840, 52, 6), "blue", { tone: 2 }) + L.stroke("M-420 -96 H420", { c: "white", w: 3, op: 0.3 });
  s += people;
  // rails and straps
  s += tube("M-440 -370 H440", "gray", 12);
  [-300, -150, 0, 150, 300].forEach((x) => { s += L.stroke(`M${x} -364 V-330`, { c: "ink", w: "detail" }) + sh(C(x, -318, 16, 20), "ink", { w: "detail" }) + fl(C(x, -318, 8, 12), "wall"); });
  s += sh(RR(-440, -392, 880, 28, 6), "white", { w: "detail" }) + [-300, 0, 300].map((x) => fl(RR(x - 50, -386, 100, 10, 5), "yellow", 0.6)).join("");
  // standing commuter holding the rail
  const st = place(crowd(o, 6, "adult"), { stand: true, hr: 24, feetAt: [250, -4], pose: "stand", face: "smile", look: 0.4, hands: [[232, -328], null] });
  s += st.svg + sh(RR(-430, -4, 860, 10, 3), "gray", { w: "detail" });
  s += tube("M200 -4 V-380", "gray", 10) + tube("M-200 -4 V-380", "gray", 10);
  return clip(`M${W0} ${TP - 30} H${W1} V10 H${W0} Z`, s) + L.stroke(`M${W0} ${TP - 30} H${W1} V10 H${W0} Z`, { w: "prop" });
}, { box: [-450, -450, 900, 470], opt: "crowd", demo: {} });

// ---- cable car / ski gondola ----
reg("ride-cable-car", "Cable car with passengers", BUS, ["cable car", "gondola", "mountain", "ropeway", "tram", "cabin", "sightseeing", "tourists", "passengers", "view"], (o) => {
  const c = pick(o, "color", "red"), pass = crowdList(o, 3, "adult", 5);
  const wins = [-70, -10, 50].map((x, i) => winPeople(o, [x, -150, 48, 60, 8], [pass[i] || crowd(o, i, "adult")], 15, { hy: 0.56 })).join("");
  return ln([-330, -300], [330, -240], { w: "prop" }) + tube("M-4 -272 V-208", "gray", 7) + sh(RR(-62, -218, 128, 14, 6), "gray", { w: "detail" }) + tube("M-40 -204 L-30 -182 M40 -204 L30 -182", "gray", 6) +
    body(o, RR(-96, -190, 192, 140, 20), c, fl("M-100 -88 H100 V-74 H-100 Z", "white", 0.9) + shd("M-100 -64 H100 V-48 H-100 Z", 0.14)) + wins + sh(RR(-96, -62, 192, 12, 5), "gray", { w: "detail" }) + L.stroke("M-84 -50 L-70 -50", { w: 2 });
}, { box: [-340, -310, 680, 330], opt: "color, crowd, time", demo: {}, wide: true });
reg("ride-ski-gondola", "Ski gondola with skiers", BUS, ["gondola", "ski", "lift", "ski lift", "snow", "winter", "mountain", "skiers", "holiday", "cable", "chairlift"], (o) => {
  const c = pick(o, "color", "orange"), a = sp(o.who, L.rideCast.man, { face: "happy", acc: ["beanie"], accC: "red", outfitC: "red" }), b = sp(o.who2, L.rideCast.woman, { face: "happy", acc: ["beanie"], accC: "blue", outfitC: "blue" });
  const GLD = RR(-68, -136, 136, 74, 24);
  const skis = [-40, 20].map((x) => tube(`M${x} -22 q4 4 12 4 h40`, "ink", 5)).join("");
  return ln([-260, -214], [260, -214], { w: "prop" }) + tube("M0 -214 V-176", "gray", 8) + tube("M0 -178 V-156", "gray", 12) + sh(RR(-20, -160, 40, 12, 5), "gray", { w: "detail" }) +
    body(o, RR(-82, -150, 164, 126, 34), c, shd("M-90 -52 H90 V-20 H-90 Z", 0.14) + fl(GLD, "glass")) + clip(GLD, fl(GLD, night(o) ? "night" : "glass") + place(a, { hr: 17, head: [-24, -108], pose: "stand", face: a.face, look: 0.3 }).svg + place(b, { hr: 17, head: [30, -106], pose: "stand", face: b.face, look: -0.2 }).svg) +
    L.tag("path", { d: GLD, fill: "none", stroke: L.outline("glass"), "stroke-width": L.lw("detail") }) + gl(P([[-52, -130], [-30, -130], [-60, -70], [-66, -70]], true), 0.25) +
    skis + sh(RR(-82, -46, 164, 14, 6), "white", { w: "detail" });
}, { box: [-280, -250, 560, 270], opt: "color, who, who2", demo: {}, wide: true });

// =====================================================================================================================
// AIR AND SPACE
// =====================================================================================================================
const AIR = "Air and space";
const ovalWin = (o, cx, cy, rx, ry, spec, hr, opt = {}) => winPeople(o, [cx - rx, cy - ry, rx * 2, ry * 2], [spec].filter(Boolean), hr, Object.assign({ d: C(cx, cy, rx, ry), hy: 0.5 }, opt));
reg("ride-plane-airliner", "Plane with pilot and passengers at the windows", AIR, ["plane", "airplane", "aeroplane", "airliner", "jet", "flight", "fly", "pilot", "passengers", "travel", "holiday", "airport", "aircraft"], (o) => {
  const c = pick(o, "color", "blue"), pass = crowdList(o, 10, "adult", 6);
  const wins = Array.from({ length: 9 }, (_, i) => (o.passengers === false ? ovalWin(o, -214 + i * 38, -92, 13, 15, null, 10) : ovalWin(o, -214 + i * 38, -92, 13, 15, i % 2 ? pass[i] || crowd(o, i + 2, "adult") : pass[i + 1] || null, 10))).join("");
  const pilot = winPeople(o, [210, -118, 54, 36, 8], [sp(o.pilot, L.rideCast.man, { face: "happy", acc: ["cap"], accC: "navy", outfitC: "navy" })], 13, { d: P([[208, -116], [262, -116], [276, -96], [208, -86]], true), hy: 0.5, look: 0.9 });
  return L.shadow(0, 0, 500) + tubes([["M-30 -62 V-26", "gray", 8], ["M232 -62 V-24", "gray", 7]]) + sh(P([[-250, -112], [-286, -214], [-232, -214], [-130, -122]], true), c) + sh(P([[-250, -100], [-300, -108], [-304, -128], [-246, -122]], true), c, { tone: 2, w: "detail" }) +
    body(o, "M-276 -92 Q-276 -126 -240 -130 L214 -134 Q296 -132 306 -98 Q296 -66 214 -62 L-232 -60 Q-276 -62 -276 -92 Z", "white", fl("M-290 -88 Q0 -76 320 -88 V-76 Q0 -64 -290 -76 Z", c) + shd("M-290 -74 H320 V-56 H-290 Z", 0.1)) + wins + pilot +
    sh(P([[-20, -80], [-130, -52], [-70, -46], [60, -80]], true), "gray") + sh(RR(-48, -62, 88, 28, 14), "gray") + sh(C(34, -48, 11, 12), "ink", { w: "detail" }) + wheel(-30, -14, 16) + wheel(232, -12, 14);
}, { box: [-330, -230, 660, 250], opt: "color, pilot, crowd, time", demo: {} });

reg("ride-plane-cabin", "Plane cabin interior with passengers", AIR, ["plane", "cabin", "inside", "interior", "seats", "passengers", "flight", "flying", "window seat", "airline", "aisle", "attendant", "travel"], (o) => {
  const W0 = -450, W1 = 450, FL = 0, TP = -300;
  let s = fl(`M${W0} ${TP} H${W1} V${FL} H${W0} Z`, "wall") + fl(`M${W0} -52 H${W1} V${FL} H${W0} Z`, "blue", 0.85) + fl(`M${W0} -60 H${W1} V-52 H${W0} Z`, "gray");
  [-340, -160, 20, 200].forEach((x) => { const d = RR(x - 28, -214, 56, 78, 28); s += sh(RR(x - 38, -224, 76, 98, 34), "white") + sh(d, "sky", { w: "prop" }) + clip(d, cloud(x - 22, -160, 1.1, "white", 0.95) + cloud(x - 10, -190, 0.7, "white", 0.8)) + sh(RR(x - 28, -214, 56, 36, 20), "gray", { w: 2.5, tone: 1 }); });
  s += sh(RR(W0, TP, W1 - W0, 62, 18), "white", { w: "prop" }) + [-360, -180, 0, 180, 360].map((x) => L.stroke(`M${x + 40} ${TP + 4} V${TP + 56}`, { w: "detail", op: 0.4 }) + fl(RR(x - 8, TP + 62, 16, 6, 3), "yellow", 0.8)).join("");
  const SEAT = [-380, -200, -20, 160].map((x) => ({ x }));
  const seatSpecs = [crowd(o, 1, "adult"), crowd(o, 2, "kid"), crowd(o, 3, "adult"), crowd(o, 4, "adult")];
  SEAT.slice().reverse().forEach((p, ri) => {
    const i = SEAT.length - 1 - ri, x = p.x, sp_ = seatSpecs[i];
    s += sh(RR(x - 8, -190, 40, 116, 16), "navy", { w: "prop" }) + sh(RR(x - 8, -86, 82, 28, 12), "navy", { w: "prop", tone: 2 }) + sh(RR(x + 10, -58, 36, 8, 3), "gray", { w: "detail" });
    const kid = sp_.body === "kid", hr = kid ? 19 : 23, r = place(sp_, { hr, head: [x + 20, kid ? -154 : -168], pose: "stand", face: i === 1 ? "sleepy" : "happy", look: 0.5, hands: [[x + 52, kid ? -84 : -90], [x + 66, kid ? -84 : -92]], feet: [[x + 84, -6], [x + 100, -6]], kneePref: [1, -0.3] });
    s += r.svg;
  });
  // flight attendant with a trolley
  const at = place(sp(o.attendant, L.rideCast.woman, { hair: "bun", outfitC: "navy", face: "happy" }), { stand: true, hr: 24, feetAt: [330, -6], pose: "stand", look: -0.3, hands: [[290, -128], [300, -122]], face: "happy" });
  s += at.svg + sh(RR(250, -134, 62, 126, 6), "gray", { w: "prop" }) + L.stroke("M250 -100 H312 M250 -70 H312", { w: "detail", op: 0.5 }) + sh(RR(262, -156, 14, 22, 3), "white", { w: "detail" }) + sh(RR(284, -152, 12, 18, 3), "red", { w: "detail" }) + dot(268, -8, 7, "ink", { w: "detail" }) + dot(300, -8, 7, "ink", { w: "detail" });
  return clip(`M${W0} ${TP} H${W1} V10 H${W0} Z`, s) + L.stroke(`M${W0} ${TP} H${W1} V10 H${W0} Z`, { w: "prop" });
}, { box: [-450, -310, 900, 330], opt: "crowd, attendant", demo: {} });

reg("ride-helicopter-pilot", "Helicopter with pilot", AIR, ["helicopter", "chopper", "pilot", "flying", "rescue", "rotor", "aircraft", "air", "headset"], (o) => {
  const c = pick(o, "color", "orange"), pa = sp(o.pilot, L.rideCast.man, { face: "happy", acc: ["headphones"], accC: "gray", outfitC: "navy" });
  const CAN = "M20 -64 C16 -124 60 -158 118 -142 C152 -132 168 -96 160 -66 Z";
  return L.shadow(0, 0, 380) + tubes([["M-40 -24 H140 q16 0 20 -14", "gray", 6], ["M-8 -62 L-16 -24", "gray", 6], ["M110 -62 L116 -24", "gray", 6]]) +
    sh(L.limb([[0, -96], [-110, -104], [-200, -116]], 38, 14), c) + sh(P([[-196, -112], [-226, -176], [-198, -176], [-170, -112]], true), c, { tone: 2 }) + L.stroke(C(-204, -138, 22), { c: "gray", w: 4, op: 0.55 }) + dot(-204, -138, 5, "gray", { w: "detail" }) +
    body(o, "M-34 -92 C-34 -144 -20 -160 60 -154 L118 -142 C152 -132 170 -96 160 -62 L10 -54 Q-34 -58 -34 -92 Z", c, fl("M-50 -80 H180 V-68 H-50 Z", "white", 0.9) + shd("M-50 -64 H180 V-40 H-50 Z", 0.12)) +
    clip(CAN, fl(CAN, glass(o)) + place(pa, { hr: 19, head: [92, -108], pose: "stand", face: pa.face, look: 0.9 }).svg + tint(o)) + L.tag("path", { d: CAN, fill: "none", stroke: L.outline("glass"), "stroke-width": L.lw("detail"), "stroke-linejoin": "round" }) + gl(P([[40, -138], [62, -146], [38, -80], [26, -80]], true), 0.25) +
    tube("M70 -156 V-182", "gray", 9) + dot(70, -184, 9, "gray", { w: "detail" }) + sh(P([[70, -191], [70, -177], [-232, -185]], true), "gray", { w: "detail" }) + sh(P([[70, -191], [70, -177], [300, -185]], true), "gray", { w: "detail" });
}, { box: [-260, -230, 620, 250], opt: "color, pilot, time", demo: {} });

reg("ride-hot-air-balloon", "Hot-air balloon with two people", AIR, ["balloon", "hot air balloon", "flying", "sky", "sightseeing", "adventure", "two people", "couple", "travel", "basket", "float", "journey"], (o) => {
  const cs = [pick(o, "color", "red"), "yellow", "teal", "yellow"], ENV = L.smooth([[0, -440], [88, -420], [138, -350], [138, -278], [96, -214], [34, -150], [28, -134], [-28, -134], [-34, -150], [-96, -214], [-138, -278], [-138, -350], [-88, -420], [0, -440]]);
  const a = sp(o.who, L.rideCast.man, { face: "happy", outfitC: "green" }), b = sp(o.who2, L.rideCast.woman, { face: "excited", outfitC: "orange" });
  const pa = place(a, { hr: 19, head: [-26, -100], pose: "stand", face: a.face, look: 0.4, hands: [[-74, -186], [-20, -64]], feet: [[-14, -34], [-4, -34]] }), pb = place(b, { hr: 19, head: [28, -98], pose: "stand", face: b.face, look: 0.4, hands: [[22, -64], [78, -188]], feet: [[10, -34], [22, -34]] });
  const bands = [-138, -92, -46, 0, 46, 92].map((x, i) => fl(RR(x, -450, 46, 330, 0), cs[i % 4])).join("");
  return L.shadow(0, 0, 150) + tubes([["M-44 -62 L-30 -138", "wood", 3], ["M44 -62 L30 -138", "wood", 3]]) + body(o, ENV, cs[0], bands + L.stroke("M-92 -420 Q-60 -280 -34 -150 M0 -440 V-134 M92 -420 Q60 -280 34 -150", { w: "detail", op: 0.35 }) + gl("M-100 -400 Q-130 -330 -118 -270 L-100 -280 Q-100 -340 -80 -396 Z", 0.35)) +
    sh(RR(-20, -140, 40, 16, 5), "gray", { w: "detail" }) + fl(P([[0, -122], [10, -100], [0, -88], [-10, -100]], true), "orange", 0.95) + fl(P([[0, -114], [5, -100], [0, -94], [-5, -100]], true), "yellow", 0.95) + pa.svg + pb.svg +
    sh(RR(-52, -62, 104, 62, 8), "wood") + clip(RR(-52, -62, 104, 62, 8), Array.from({ length: 6 }, (_, i) => L.stroke(`M${-52 + i * 20} -62 V0`, { w: "detail", c: "brown", op: 0.5 })).join("") + [-46, -30, -14].map((y) => L.stroke(`M-52 ${y} H52`, { w: "detail", c: "brown", op: 0.5 })).join("")) + sh(RR(-56, -66, 112, 12, 5), "wood", { tone: 2 });
}, { box: [-190, -470, 380, 490], opt: "color, who, who2", demo: {}, wide: false });

reg("ride-rocket-astronaut", "Rocket with astronaut in the window", AIR, ["rocket", "astronaut", "space", "launch", "liftoff", "spaceship", "nasa", "mission", "cosmonaut", "porthole", "blast off"], (o) => {
  const c = pick(o, "color", "red"), a = sp(o.who, L.rideCast.man, { face: "wow", outfit: "astronaut", outfitC: "white", acc: ["helmet"] });
  const BODYD = "M0 -440 C58 -380 70 -270 66 -130 L66 -56 H-66 L-66 -130 C-70 -270 -58 -380 0 -440 Z", PH = C(0, -270, 38);
  const smoke = [[-96, -8, 1.6], [92, -12, 1.8], [-50, 10, 1.3], [54, 8, 1.4], [0, 14, 1.5]].map(([x, y, k]) => puff(x - 22 * k, y - 10, k)).join("");
  return fl(C(0, 8, 130, 14), "ink", 0.15) + smoke + fl(P([[-40, -56], [40, -56], [20, 4], [0, 24], [-20, 4]], true), "orange", 0.95) + fl(P([[-22, -56], [22, -56], [10, -6], [0, 8], [-10, -6]], true), "yellow", 0.95) +
    sh(P([[-66, -150], [-122, -50], [-66, -64]], true), c) + sh(P([[66, -150], [122, -50], [66, -64]], true), c) + sh(RR(-40, -66, 80, 14, 5), "gray", { w: "detail" }) +
    body(o, BODYD, "white", fl("M-80 -330 H80 V-440 H-80 Z", c) + fl("M-80 -120 H80 V-100 H-80 Z", c) + shd("M20 -440 H80 V-50 H20 Z", 0.12)) +
    clip(PH, fl(PH, night(o) ? "night" : "navy") + [[-18, -290, 2.5], [14, -250, 2], [20, -292, 1.8]].map(([x, y, r]) => fl(C(x, y, r), "white", 0.9)).join("") + place(a, { hr: 17, head: [0, -266], pose: "stand", face: a.face, look: 0 }).svg + tint(o)) + L.tag("path", { d: PH, fill: "none", stroke: L.outline("gray"), "stroke-width": L.lw("prop") * 1.6 }) + L.tag("path", { d: C(0, -270, 44), fill: "none", stroke: L.c("gray"), "stroke-width": 10 }) + gl(P([[-24, -296], [-8, -304], [-28, -262]], true), 0.3);
}, { box: [-190, -460, 380, 490], opt: "color, who, face", demo: {}, wide: false });

reg("ride-spaceship", "Spaceship with crew in the cockpit", AIR, ["spaceship", "space", "ship", "starship", "shuttle", "astronauts", "crew", "cockpit", "rocket", "sci-fi", "travel", "galaxy"], (o) => {
  const c = pick(o, "color", "blue"), a = sp(o.who, L.rideCast.man, { face: "excited", outfit: "astronaut", outfitC: "white" }), b = sp(o.who2, L.rideCast.woman, { face: "happy", outfit: "astronaut", outfitC: "white" });
  const DOME = "M60 -22 C60 -90 130 -112 190 -64 L210 -22 Z";
  const flame = fl(P([[-210, -14], [-300, -34], [-210, -52]], true), "orange", 0.95) + fl(P([[-210, -22], [-266, -34], [-210, -44]], true), "yellow", 0.95);
  return flame + sh(P([[-110, -50], [-176, -140], [-130, -140], [-30, -50]], true), c, { tone: 2 }) + sh(P([[-110, 6], [-176, 98], [-130, 98], [-30, 6]], true), c, { tone: 2 }) +
    body(o, "M-220 -30 C-220 -90 -60 -104 60 -90 C150 -80 240 -50 250 -22 C240 12 150 34 60 40 C-60 50 -220 30 -220 -30 Z", "white", fl("M-230 -30 H260 V-18 H-230 Z", c) + shd("M-230 -10 H260 V50 H-230 Z", 0.12) + [-150, -110, -70].map((x) => fl(C(x, -64, 8), "glass")).join("")) +
    sh(RR(-232, -60, 28, 60, 8), "gray", { w: "detail" }) + clip(DOME, fl(DOME, glass(o)) + place(b, { hr: 16, head: [100, -64], pose: "stand", face: b.face, look: 0.8 }).svg + place(a, { hr: 16, head: [150, -60], pose: "stand", face: a.face, look: 0.8 }).svg + tint(o)) + L.tag("path", { d: DOME, fill: "none", stroke: L.outline("glass"), "stroke-width": L.lw("detail"), "stroke-linejoin": "round" }) + gl(P([[78, -84], [98, -96], [74, -42]], true), 0.3) + sh(C(-20, -26, 9), c, { w: "detail" });
}, { box: [-320, -150, 600, 260], opt: "color, who, who2", demo: {}, wide: true });

// =====================================================================================================================
// BOATS
// =====================================================================================================================
const SEA = "Boats and water";
const sea = (w, y, n = 10, front = true) => sh(wave(-w, w, y, 9, n) + ` V18 H${-w} Z`, "water", { w: "detail" }) + L.stroke(wave(-w, w, y + 12, 6, n - 2), { c: "white", w: 3, op: 0.5 });
const ocean = (o, x0, x1, y) => sea(Math.max(-x0, x1), y, 12);
reg("ride-boat-fisherman", "Fisherman in a boat", SEA, ["fisherman", "fishing", "boat", "angler", "rod", "lake", "sea", "river", "hobby", "catch", "fish"], (o) => {
  const c = pick(o, "color", "red"), a = sp(o.who, L.rideCast.man, { face: "happy", outfit: "raincoat", outfitC: "yellow", acc: ["strawhat"], accC: "sand" });
  const r = place(a, { hr: 22, head: [-56, -152], pose: "stand", face: a.face, look: 0.8, hands: [[-22, -104], [-4, -110]], armPref: [0, 1] });
  const fish = fl("M-160 -66 q14 -10 28 0 q-14 10 -28 0 Z", "orange") + fl("M-132 -66 l10 -8 v16 Z", "orange");
  return sh(RR(-130, -66, 40, 8, 3), "wood") + r.svg + tube("M-14 -108 L140 -204", "wood", 5) + L.stroke("M140 -204 Q176 -150 180 -22", { w: 2, c: "ink", op: 0.8 }) + dot(180, -18, 7, "red", { w: "detail" }) + fl(C(180, -20, 3.5), "white") +
    body(o, "M-190 -58 H196 Q172 10 100 10 H-110 Q-166 10 -190 -58 Z", c, fl("M-200 -40 H200 V-30 H-200 Z", "white", 0.9) + shd("M-200 -20 H200 V20 H-200 Z", 0.14)) + sh(RR(-166, -86, 38, 30, 6), "gray", { w: "detail" }) + fish + fist(r.hands[0], r.sk, 5) + fist(r.hands[1], r.sk, 5) + sea(260, -14, 10);
}, { box: [-280, -230, 560, 260], opt: "color, who, time", demo: {} });

reg("ride-rowing-boat", "Rowing boat with two people", SEA, ["rowing", "row", "boat", "oars", "two people", "couple", "lake", "river", "paddle", "romantic", "leisure", "park"], (o) => {
  const a = sp(o.who, L.rideCast.man, { face: "happy", outfitC: "blue" }), b = sp(o.who2, L.rideCast.woman, { face: "excited", outfitC: "pink", acc: ["strawhat"], accC: "sand" });
  const ra = place(a, { hr: 21, head: [-20, -130], pose: "stand", face: a.face, look: 0.6, hands: [[22, -90], [34, -84]], armPref: [0.2, 1] }), rb = place(b, { hr: 21, head: [100, -128], pose: "stand", face: b.face, look: 0.3, hands: [[96, -176], [146, -168]], armPref: [0.1, 1] });
  return ra.svg + rb.svg + tube("M-60 -60 L22 -90 L120 -4", "wood", 6) + sh(P([[116, -8], [138, 2], [150, -2], [126, -14]], true), "wood", { w: "detail" }) + fist(ra.hands[0], ra.sk, 5) + fist(ra.hands[1], ra.sk, 5) +
    body(o, "M-196 -54 Q-160 12 -80 12 H90 Q170 12 200 -54 Z", pick(o, "color", "wood"), Array.from({ length: 5 }, (_, i) => L.stroke(`M-200 ${-44 + i * 12} H210`, { w: "detail", c: "brown", op: 0.45 })).join("") + shd("M-210 -14 H210 V20 H-210 Z", 0.12)) + sh(RR(-210, -62, 420, 12, 5), "wood", { tone: 2 }) + sea(280, -12, 10);
}, { box: [-290, -230, 580, 260], opt: "who, who2, color", demo: {} });

reg("ride-sailing-boat", "Sailing boat with sailor", SEA, ["sailing", "sailboat", "yacht", "sailor", "boat", "wind", "sea", "regatta", "holiday", "voyage", "sail", "captain"], (o) => {
  const c = pick(o, "color", "red"), a = sp(o.who, L.rideCast.man, { face: "happy", outfitC: "white", acc: ["cap"], accC: "navy" });
  const r = place(a, { hr: 19, head: [-110, -108], pose: "stand", face: a.face, look: 0.6, hands: [[-150, -66], [-138, -70]], armPref: [0, 1] });
  return r.svg + tube("M-170 -48 L-120 -66", "wood", 5) + fist(r.hands[1], r.sk, 5) + tube("M20 -52 V-290", "wood", 9) + body(o, "M14 -284 Q96 -170 128 -62 H14 Z", "white", L.stroke("M20 -240 Q70 -170 96 -62", { w: "detail", op: 0.25 }) + gl("M24 -270 Q60 -200 74 -150", 0.5)) +
    body(o, "M2 -266 Q-60 -170 -104 -62 H2 Z", "cream") + sh(P([[18, -296], [58, -284], [18, -272]], true), c, { w: "detail" }) +
    body(o, "M-170 -50 H178 Q150 8 100 8 H-100 Q-146 8 -170 -50 Z", "white", fl("M-180 -30 H190 V-18 H-180 Z", c) + shd("M-180 -10 H190 V16 H-180 Z", 0.14)) + sh(RR(-30, -44, 24, 14, 5), "glass", { w: 2.5 }) + sh(RR(8, -44, 24, 14, 5), "glass", { w: 2.5 }) + sea(260, -10, 10);
}, { box: [-280, -320, 560, 350], opt: "color, who, time", demo: {} });

reg("ride-cruise-ship", "Cruise ship with passengers", SEA, ["cruise", "ship", "ocean liner", "passengers", "holiday", "vacation", "travel", "sea", "voyage", "deck", "boat", "tourists"], (o) => {
  const c = pick(o, "color", "red"), win = (x, y, w, i, hr, k) => winPeople(o, [x, y, w, w, 5], [(i % k === 0) ? crowd(o, i, i % 3 === 2 ? "kid" : "adult") : null].filter(Boolean), hr, { hy: 0.56 });
  let deck1 = "", deck2 = "";
  for (let i = 0; i < 14; i++) deck1 += win(-292 + i * 44, -158, 32, i, 10, 3);
  for (let i = 0; i < 11; i++) deck2 += win(-232 + i * 44, -210, 30, i, 9, 4);
  const flagp = [-200, -140, 190, 250].map((x, i) => stand(crowd(o, i + 20, "adult"), x, -224, 0.2, { face: "happy", p: { pose: i % 2 ? "wave" : "stand" } })).join("");
  const funnel = (x) => sh(RR(x, -330, 54, 84, 8), c) + fl(`M${x} -312 H${x + 54} V-298 H${x} Z`, "ink", 0.9);
  const smoke = puff(-10, -352, 1.6, "white") + puff(30, -392, 1.2, "white");
  return smoke + funnel(-70) + funnel(10) + body(o, "M-390 -112 H410 L350 -16 Q340 0 320 0 H-300 Q-320 0 -332 -16 Z", "navy", fl("M-400 -92 H420 V-76 H-400 Z", c) + fl("M-400 -112 H420 V-100 H-400 Z", "white", 0.9) + shd("M-400 -20 H420 V0 H-400 Z", 0.15)) +
    body(o, RR(-312, -178, 636, 66, 10), "white", shd("M-320 -122 H330 V-112 H-320 Z", 0.12)) + deck1 + body(o, RR(-250, -230, 520, 54, 10), "white") + deck2 + body(o, RR(-150, -268, 320, 40, 10), "white") +
    [0, 1, 2, 3, 4, 5].map((i) => sh(RR(-136 + i * 50, -258, 36, 20, 4), glass(o), { w: 2.5 })).join("") + L.stroke("M-290 -226 H-120 M120 -226 H264", { w: "detail" }) + flagp + tube("M200 -268 V-318", "gray", 5) + sh(P([[204, -318], [240, -308], [204, -298]], true), c, { w: "detail" }) + sea(420, -12, 14);
}, { box: [-430, -400, 860, 430], opt: "color, crowd, time", demo: {} });

reg("ride-submarine-periscope", "Submarine with periscope and crew", SEA, ["submarine", "periscope", "underwater", "sea", "ocean", "navy", "captain", "dive", "diving", "crew", "sub"], (o) => {
  const c = pick(o, "color", "yellow"), POR = (x, y, r) => C(x, y, r);
  const crew = [[-120, 0], [-20, 1], [80, 2]].map(([x, i]) => { const spc = i === 0 ? sp(o.who, L.rideCast.man, { face: "happy", acc: ["cap"], accC: "navy" }) : crowd(o, i + 7, "adult"); return sh(C(x, -80, 30), "gray", { w: "prop" }) + clip(POR(x, -80, 24), fl(POR(x, -80, 24), "glass") + place(spc, { hr: 15, head: [x, -78], pose: "stand", face: spc.face || "happy", look: 0.7 }).svg) + L.tag("path", { d: POR(x, -80, 24), fill: "none", stroke: L.outline("glass"), "stroke-width": L.lw("detail") }); }).join("");
  const water = fl(RR(-310, -220, 620, 250, 0), "water", 0.32) + L.stroke(wave(-310, 310, -220, 8, 12), { c: "water", w: 5 }) + L.stroke(wave(-310, 310, -210, 6, 10), { c: "white", w: 3, op: 0.5 });
  const bub = [[220, -150, 9], [240, -184, 6], [212, -204, 5], [-260, -160, 7], [-274, -190, 5]].map(([x, y, r]) => sh(C(x, y, r), "glass", { w: 2.5 })).join("");
  return water + tubes([["M30 -150 V-290 H70", "gray", 8]]) + sh(RR(60, -300, 24, 20, 4), "ink", { w: "detail" }) + fl(RR(64, -296, 6, 8, 2), "sky") + sh(P([[-196, -80], [-246, -140], [-236, -76]], true), c, { tone: 2 }) + sh(P([[-196, -60], [-246, 0], [-236, -62]], true), c, { tone: 2 }) + sh(C(-232, -70, 8, 24), "gray", { w: "detail" }) +
    sh(RR(-30, -176, 100, 62, 18), c) + body(o, L.circ(0, -70, 206, 70), c, fl("M-220 -70 H220 V-56 H-220 Z", "white", 0.9) + shd("M-220 -50 H220 V10 H-220 Z", 0.14)) + crew + sh(RR(-12, -166, 24, 20, 4), "glass", { w: "detail" }) + bub + L.stroke("M-160 -122 Q-60 -136 40 -126", { c: "white", w: 6, op: 0.4 });
}, { box: [-310, -320, 620, 350], opt: "color, who, crowd", demo: {}, wide: true });

// =====================================================================================================================
// TWO WHEELS, KIDS' RIDES, HORSES, TRACTOR
// =====================================================================================================================
const WH = "Bikes and small rides", ANI = "Animals and farm";
const helmetArt = (r, c) => { const [x, y] = r.hd, R = r.R; return sh(P(L.arcPts(x, y - 0.34 * R, 1.14 * R, 180, 360, 16, 0.98 * R), true), c, { w: "char", s: Math.max(r.S, 0.3) }) + L.stroke(L.line([x - 1.1 * R, y - 0.32 * R], [x + 1.3 * R, y - 0.32 * R]), { w: "detail", s: Math.max(r.S, 0.3) }); };
const crank = (b, th, r) => [b[0] + r * Math.cos(th * D2R), b[1] + r * Math.sin(th * D2R)];
// frame + wheels of a bicycle; wb = wheel centre half-distance, returns { art, front, bb }
function bikeArt(o, c, x0 = 0, wb = 96) {
  const R = 56, RA = [x0 - wb, -R], FA = [x0 + wb, -R], BB = [x0 - 4, -58], S = [x0 - 32, -114], H = [x0 + 52, -132];
  const art = spokeWheel(RA[0], RA[1], R) + spokeWheel(FA[0], FA[1], R) +
    tubes([[L.line(RA, BB), c, 6], [L.line(RA, S), c, 6], [L.line(BB, S), c, 7], [L.line(S, H), c, 7], [L.line(BB, H), c, 7], [L.line(H, FA), "gray", 6], [`M${H[0]} ${H[1] + 2} L${H[0] + 6} -166 L${H[0] + 22} -170`, "gray", 6]]) +
    sh(RR(S[0] - 22, S[1] - 12, 44, 11, 5), "ink") + dot(BB[0], BB[1], 13, "gray", { w: "detail" }) + dot(BB[0], BB[1], 4, "ink", { flat: true });
  return { art, bb: BB, grip: [H[0] + 22, -170], saddle: [S[0], S[1] - 6], RA, FA };
}
reg("ride-bicycle-rider", "Person riding a bicycle", WH, ["bicycle", "bike", "cycling", "cyclist", "rider", "pedal", "commute", "ride", "exercise", "sport"], (o) => {
  const c = pick(o, "color", "red"), b = bikeArt(o, c), a = sp(o.who, L.rideCast.woman, { face: o.face || "happy", outfitC: "teal" });
  const f1_ = crank(b.bb, 70, 24), f2 = crank(b.bb, 250, 24);
  const r = place(a, { k: 0.7, hip: [b.saddle[0] + 2, b.saddle[1] - 6], lean: 22, pose: "stand", face: a.face, look: 0.8, hands: [[b.grip[0] - 2, b.grip[1] + 2], [b.grip[0] - 6, b.grip[1] + 4]], feet: [f1_, f2], kneePref: [1, -0.5], armPref: [0.3, 1] });
  return L.shadow(0, 0, 260) + tube(`M${b.bb[0]} ${b.bb[1]} L${f2[0]} ${f2[1]}`, "gray", 4) + sh(RR(f2[0] - 9, f2[1] - 3, 18, 6, 2), "ink", { w: 2 }) + b.art + r.svg + helmetArt(r, "yellow") + fist(r.hands[1], r.sk, 5) + tube(`M${b.bb[0]} ${b.bb[1]} L${f1_[0]} ${f1_[1]}`, "gray", 4) + sh(RR(f1_[0] - 9, f1_[1] - 3, 18, 6, 2), "ink", { w: 2 });
}, { box: [-200, -300, 400, 320], opt: "color, who, face", demo: {}, wide: false });

reg("ride-tandem-bike", "Tandem bike with two riders", WH, ["tandem", "bicycle", "bike", "two riders", "couple", "friends", "cycling", "family", "ride together", "pedal"], (o) => {
  const c = pick(o, "color", "blue"), R = 56, RA = [-170, -R], FA = [170, -R], B1 = [-84, -58], B2 = [34, -58], S1 = [-112, -114], S2 = [10, -114], H = [102, -134];
  const a = sp(o.who, L.rideCast.man, { face: "happy", outfitC: "orange" }), b = sp(o.who2, L.rideCast.woman, { face: "happy", outfitC: "purple" });
  const art = spokeWheel(RA[0], RA[1], R) + spokeWheel(FA[0], FA[1], R) + tubes([[L.line(RA, B1), c, 6], [L.line(RA, S1), c, 6], [L.line(B1, S1), c, 7], [L.line(S1, H), c, 7], [L.line(B1, B2), c, 7], [L.line(B2, S2), c, 7], [L.line(B2, H), c, 7], [L.line(S2, [S2[0] + 10, -150]), "gray", 6], [L.line(H, FA), "gray", 6], [`M${H[0]} ${H[1] + 2} L${H[0] + 6} -168 L${H[0] + 22} -172`, "gray", 6], ["M2 -150 H26", "gray", 6]]) + sh(RR(S1[0] - 22, S1[1] - 12, 44, 11, 5), "ink") + sh(RR(S2[0] - 22, S2[1] - 12, 44, 11, 5), "ink") + dot(B1[0], B1[1], 12, "gray", { w: "detail" }) + dot(B2[0], B2[1], 12, "gray", { w: "detail" });
  const mk = (spec, S, B, grip, th) => place(spec, { k: 0.7, hip: [S[0] + 2, S[1] - 6], lean: 20, pose: "stand", face: spec.face, look: 0.8, hands: [grip, [grip[0] - 4, grip[1] + 2]], feet: [crank(B, th, 24), crank(B, th + 180, 24)], kneePref: [1, -0.5], armPref: [0.3, 1] });
  const r2 = mk(b, S1, B1, [14, -154], 20), r1 = mk(a, S2, B2, [H[0] + 20, -172], 200);
  return L.shadow(0, 0, 400) + art + r2.svg + fist(r2.hands[1], r2.sk, 5) + r1.svg + helmetArt(r1, "red") + helmetArt(r2, "green") + fist(r1.hands[1], r1.sk, 5);
}, { box: [-260, -300, 520, 320], opt: "color, who, who2", demo: {}, wide: true });

reg("ride-motorbike-rider", "Motorbike rider", WH, ["motorbike", "motorcycle", "biker", "rider", "helmet", "fast", "speed", "road", "moped", "scooter"], (o) => {
  const c = pick(o, "color", "red"), wh = (cx) => G(sh(C(0, 0, 46) + C(0, 0, 34), "ink", { w: "detail", eo: true }) + dot(0, 0, 26, "gray", { w: "detail" }) + dot(0, 0, 7, "ink", { w: "detail" }), `translate(${cx} -46)`);
  const a = sp(o.who, L.rideCast.man, { face: o.face || "excited", outfit: "jacket", outfitC: "navy" });
  const r = place(a, { k: 0.66, hip: [-34, -112], lean: 18, pose: "stand", face: a.face, look: 0.9, hands: [[86, -136], [90, -132]], feet: [[18, -50], [30, -52]], kneePref: [1, -0.4], armPref: [0.3, 1] });
  const wind = [[-150, -160, 70], [-170, -132, 90], [-146, -104, 56]].map(([x, y, w]) => L.stroke(`M${x} ${y} h${-w}`, { c: "gray", w: 4, op: 0.55 })).join("");
  return L.shadow(0, 0, 300) + wind + wh(-118) + wh(118) + tubes([["M104 -128 L118 -46", "gray", 9], ["M-20 -66 L-118 -46", "gray", 7]]) + sh(RR(-104, -96, 120, 46, 14), "gray") + sh(RR(-130, -70, 100, 14, 7), "gray", { w: "detail" }) +
    r.svg + sh(RR(-84, -106, 100, 24, 10), "ink") + body(o, "M-72 -98 Q-18 -128 44 -108 L52 -84 Q-6 -76 -70 -84 Z", c) + sh("M92 -78 Q126 -92 142 -64 L110 -58 Z", c, { tone: 2, w: "detail" }) + tube("M100 -128 L84 -148 L66 -150", "gray", 7) + sh(C(116, -112, 14), "yellow", { w: "detail" }) + helmetArt(r, "orange") + fist(r.hands[1], r.sk, 5);
}, { box: [-260, -330, 460, 360], opt: "color, who, face", demo: {} });

reg("ride-scooter-rider", "Kid on a kick scooter", WH, ["scooter", "kick scooter", "kid", "child", "boy", "girl", "push", "ride", "toy", "playground", "park"], (o) => {
  const c = pick(o, "color", "orange"), a = sp(o.who, L.rideCast.girl, Object.assign(crowd(o, 3, "kid"), { face: "happy", body: "kid" }));
  const r = place(a, { stand: true, k: 0.62, feetAt: [-4, -30], lean: 6, pose: "stand", face: "happy", look: 0.8, hands: [[88, -176], [92, -172]], feet: [[-16, -32], [-66, -2]], kneePref: [0.6, -0.2], armPref: [0.2, 1] });
  return L.shadow(0, 0, 220) + r.svg + helmetArt(r, "pink") + tubes([["M84 -28 L90 -190", "gray", 7], ["M76 -190 H108", "gray", 8]]) + sh(RR(-84, -34, 150, 12, 6), c) + spokeWheel(-86, -24, 22, 6) + spokeWheel(88, -24, 22, 6) + fist(r.hands[1], r.sk, 5);
}, { box: [-150, -330, 300, 350], opt: "color, who", demo: {}, wide: false });

reg("ride-skateboard-rider", "Skateboard rider", WH, ["skateboard", "skater", "skating", "board", "teen", "trick", "sport", "street", "park", "ride"], (o) => {
  const c = pick(o, "color", "teal"), a = sp(o.who, L.rideCast.man, { face: o.face || "excited", body: "teen", outfitC: "red" });
  const r = place(a, { stand: true, k: 0.62, feetAt: [0, -22], lean: -4, pose: "stand", face: a.face, look: 0.7, hands: [[-92, -170], [92, -150]], feet: [[-30, -22], [38, -22]], kneePref: [0.8, 0], armPref: [0, 1] });
  return L.shadow(0, 0, 200) + r.svg + helmetArt(r, "yellow") + sh(RR(-68, -22, 136, 9, 4.5), c) + dot(-46, -9, 9, "ink", { w: "detail" }) + dot(46, -9, 9, "ink", { w: "detail" });
}, { box: [-170, -330, 340, 350], opt: "color, who, face", demo: {}, wide: false });

reg("ride-trike-kid", "Kid on a trike", WH, ["trike", "tricycle", "kid", "child", "toddler", "pedal", "toy", "playground", "ride", "bike"], (o) => {
  const c = pick(o, "color", "red"), a = sp(o.who, L.rideCast.boy, Object.assign(crowd(o, 1, "kid"), { face: "excited", body: "kid" }));
  const HUB = [64, -40], B1 = crank(HUB, 80, 14), B2 = crank(HUB, 260, 14);
  const r = place(a, { k: 0.78, hip: [14, -86], lean: 8, pose: "stand", face: a.face, look: 0.8, hands: [[62, -118], [66, -116]], feet: [B1, B2], kneePref: [1, -0.3], armPref: [0.2, 1] });
  return L.shadow(0, 0, 220) + spokeWheel(-60, -22, 22, 8) + tubes([["M-60 -22 L-20 -76 L52 -80 L64 -40", c, 8], ["M-20 -76 L-40 -70", c, 8], ["M52 -80 L58 -118 H80", "gray", 7]]) + r.svg + sh(RR(-34, -86, 48, 10, 5), "ink") + spokeWheel(HUB[0], HUB[1], 40, 10) + dot(HUB[0], HUB[1], 6, "gray", { w: "detail" }) + sh(RR(B1[0] - 8, B1[1] - 3, 16, 6, 2), "ink", { w: 2 }) + fist(r.hands[1], r.sk, 5);
}, { box: [-130, -230, 280, 250], opt: "color, who", demo: {}, wide: false });

reg("ride-wagon-kid", "Kid in a wagon pulled by a parent", WH, ["wagon", "cart", "kid", "child", "pull", "parent", "family", "walk", "toy", "stroll", "toddler"], (o) => {
  const c = pick(o, "color", "red"), a = sp(o.who, L.rideCast.girl, Object.assign(crowd(o, 2, "kid"), { face: "laugh", body: "kid" })), p = sp(o.who2, L.rideCast.man, { face: "happy", outfitC: "green" });
  const kid = place(a, { k: 0.78, hip: [-8, -72], pose: "stand", face: a.face, look: 0.7, hands: [[34, -80], [42, -84]], feet: [[62, -60], [76, -58]], kneePref: [1, -0.5] });
  const par = place(p, { stand: true, k: 0.5, feetAt: [212, 0], pose: "stand", face: p.face, look: -0.5, hands: [[166, -64], [168, -66]], feet: [[196, 0], [242, -8]], kneePref: [0.6, -0.3], armPref: [0, 1] });
  return L.shadow(0, 0, 440) + par.svg + tube("M70 -44 L168 -68", "gray", 6) + kid.svg + body(o, "M-96 -76 H92 L84 -34 Q82 -28 74 -28 H-80 Q-88 -28 -90 -34 Z", c, shd("M-100 -48 H100 V-26 H-100 Z", 0.14) + gl("M-90 -70 H80", 0.4)) + sh(RR(-102, -84, 204, 12, 5), c, { tone: 2 }) + spokeWheel(-56, -20, 20, 8) + spokeWheel(54, -20, 20, 8) + fist(par.hands[1], par.sk, 5) + fist(kid.hands[1], kid.sk, 5);
}, { box: [-150, -250, 460, 270], opt: "color, who, who2", demo: {}, wide: true });

// ---- horse + rider, horse cart, tractor ----
const horse = (o) => {
  const c = pick(o, "horseC", "wood"), mane = "brown";
  const leg = (x, tone) => sh(L.limb([[x, -98], [x + 4, -52], [x + 2, -12]], 24, 15), c, { tone, w: "detail" }) + sh(RR(x - 9, -16, 24, 16, 4), "ink", { w: "detail" });
  return L.shadow(0, 0, 240) + sh(L.smooth([[-80, -134], [-112, -120], [-128, -72], [-112, -38], [-100, -80], [-76, -112], [-80, -134]]), mane) + leg(-54, 2) + leg(52, 2) + sh(C(0, -116, 88, 42), c) + leg(-34, 0) + leg(70, 0) +
    sh(L.limb([[56, -132], [88, -192], [102, -232]], 60, 38), c) + sh(L.limb([[50, -156], [82, -214], [92, -246]], 14, 11), mane) + sh(P([[96, -262], [92, -294], [112, -264]], true), c, { w: "detail" }) +
    sh(L.smooth([[88, -248], [112, -268], [136, -252], [168, -214], [170, -198], [152, -188], [122, -208], [96, -226], [88, -248]]), c) + sh(P([[96, -262], [92, -294], [110, -266]], true), c, { w: "detail", tone: 2 }) + dot(128, -236, 4.5, "ink", { flat: true }) + dot(160, -204, 3, "ink", { flat: true });
};
reg("ride-horse-rider", "Person riding a horse", ANI, ["horse", "rider", "riding", "horseback", "equestrian", "cowboy", "gallop", "farm", "ranch", "animal", "travel"], (o) => {
  const a = sp(o.who, L.rideCast.woman, { face: o.face || "happy", outfitC: "red", acc: ["cowboyhat"], accC: "brown" });
  const r = place(a, { k: 0.5, hip: [-4, -168], pose: "stand", face: a.face, look: 0.9, hands: [[98, -214], [102, -210]], feet: [[34, -106], [46, -108]], kneePref: [1, 0.2], armPref: [0.2, 1] });
  return horse(o) + sh(RR(-34, -166, 62, 14, 7), "red", { w: "detail" }) + r.svg + tube("M102 -212 L120 -178", "brown", 3) + fist(r.hands[1], r.sk, 5);
}, { box: [-190, -400, 380, 420], opt: "who, face, horseC", demo: {}, wide: false });

reg("ride-horse-cart-farmer", "Farmer driving a horse cart", ANI, ["horse cart", "carriage", "wagon", "farmer", "farm", "horse", "cart", "hay", "rural", "countryside", "village", "traditional"], (o) => {
  const a = sp(o.who, L.rideCast.man, { face: "happy", outfit: "farmer", outfitC: "red", acc: ["strawhat"], accC: "sand" });
  const X = -250, r = place(a, { k: 0.5, hip: [X + 30, -118], pose: "stand", face: a.face, look: 0.8, hands: [[X + 100, -150], [X + 104, -146]], feet: [[X + 70, -62], [X + 84, -62]], kneePref: [1, -0.2], armPref: [0.2, 1] });
  const hay = Array.from({ length: 8 }, (_, i) => L.stroke(`M${X - 70 + i * 20} -140 q6 -16 14 -26`, { c: "gold", w: 4 })).join("");
  const cart = tube(`M${X + 96} -104 L-24 -122`, "wood", 6) + sh(RR(X - 90, -128, 190, 52, 8), "wood") + L.stroke(`M${X - 90} -108 H${X + 100}`, { w: "detail", op: 0.4 }) + sh(RR(X - 80, -140, 80, 28, 6), "gold", { w: "detail" }) + hay + spokeWheel(X - 40, -40, 40, 10) + spokeWheel(X + 60, -40, 40, 10) + sh(RR(X + 90, -102, 34, 8, 3), "wood", { w: "detail" });
  return L.shadow(80, 0, 640) + horse(o) + cart + r.svg + fist(r.hands[1], r.sk, 5);
}, { box: [-420, -300, 620, 320], opt: "who, horseC", demo: {}, wide: true });

reg("ride-tractor-farmer", "Farmer on a tractor", ANI, ["tractor", "farmer", "farm", "field", "harvest", "plough", "agriculture", "countryside", "machine", "rural", "vehicle"], (o) => {
  const c = pick(o, "color", "green"), a = sp(o.who, L.rideCast.man, { face: o.face || "happy", outfit: "farmer", outfitC: "red", acc: ["strawhat"], accC: "sand" });
  const CAB = P([[-90, -150], [-90, -236], [34, -236], [34, -150]], true), wc = [18, -170];
  const r = place(a, { hr: 21, head: [-40, -190], pose: "stand", face: a.face, look: 0.9, hands: [[wc[0] - 2, wc[1] + 8], [wc[0] + 4, wc[1] - 4]], armPref: [0.1, 1] });
  return L.shadow(0, 0, 400) + tube("M-100 -250 H44", "gray", 6) + tubes([["M-90 -150 V-246", "gray", 7], ["M34 -150 V-246", "gray", 7]]) + fl(CAB, glass(o), 0.5) + clip(CAB, r.svg + L.tag("path", { d: C(wc[0], wc[1], 5, 18), fill: "none", stroke: L.c("ink"), "stroke-width": 4 })) + sh(RR(-96, -258, 140, 12, 6), c, { tone: 2 }) + fist(r.hands[0], r.sk, 5) +
    body(o, "M-150 -40 V-110 Q-150 -130 -130 -130 H20 L30 -150 H70 L72 -110 H150 Q168 -108 170 -90 V-40 Z", c, shd("M-160 -62 H180 V-40 H-160 Z", 0.14) + gl("M-140 -122 H10", 0.35)) + sh(RR(120, -128, 52, 36, 8), c) + sh(RR(158, -122, 14, 14, 4), "yellow", { w: "detail" }) + tube("M114 -130 V-176", "gray", 6) + sh(RR(104, -184, 20, 8, 3), "gray", { w: "detail" }) +
    sh(C(-96, -64, 66), "ink", { w: "prop" }) + dot(-96, -64, 34, "yellow", { w: "detail" }) + dot(-96, -64, 8, "ink", { w: "detail" }) + sh(C(124, -36, 36), "ink", { w: "prop" }) + dot(124, -36, 18, "yellow", { w: "detail" }) + dot(124, -36, 5, "ink", { w: "detail" });
}, { box: [-210, -290, 430, 330], opt: "color, who, face", demo: {}, wide: true });

// =====================================================================================================================
// TRUCKS AND SERVICE VEHICLES, SNOW RIDES, WHEELCHAIR, PRAM
// =====================================================================================================================
const SRV = "Trucks and service vehicles", SNOW = "Snow, wheelchair, pram";
const cabWin = (o, d, rect, spec, hr, opt = {}) => winPeople(o, rect, [].concat(spec), hr, Object.assign({ d, hy: 0.55, look: 0.9 }, opt));
reg("ride-truck-delivery", "Delivery truck with driver and courier", SRV, ["truck", "delivery", "lorry", "courier", "parcel", "van", "cargo", "driver", "shipping", "package", "post", "logistics"], (o) => {
  const c = pick(o, "color", "orange"), dsp = sp(o.who, L.rideCast.man, { face: "happy", acc: ["cap"], accC: c, outfitC: c });
  const cw = P([[84, -170], [128, -170], [158, -126], [84, -126]], true), cour = sp(o.who2, L.rideCast.woman, { face: "happy", outfitC: "navy", acc: ["cap"], accC: "navy" });
  const cp = place(cour, { stand: true, k: 0.5, feetAt: [-290, 0], pose: "stand", face: "happy", look: 0.7, hands: [[-262, -108], [-258, -88]], feet: [[-300, 0], [-278, 0]], armPref: [0, 1] });
  const boxes = sh(RR(-216, -82, 50, 40, 4), "earth", { w: "detail" }) + L.stroke("M-191 -82 V-42", { w: 2, c: "brown" });
  return L.shadow(0, 0, 560) + (lampsOn(o) ? beam(206, -76, 200, 40) : "") +
    sh(RR(-244, -62, 320, 22, 6), "gray") + body(o, RR(-244, -214, 308, 156, 10), "white", fl("M-256 -112 Q-170 -134 -80 -112 T64 -112 V-86 Q-10 -108 -80 -86 T-256 -86 Z", c) + [-176, -110, -44].map((x) => L.stroke(L.line([x, -214], [x, -60]), { w: "detail", op: 0.2 })).join("")) +
    body(o, "M68 -40 V-168 H128 Q150 -168 160 -150 L194 -102 Q210 -98 212 -76 V-40 Z", c, fl(C(140, -34, 42), "ink")) + cabWin(o, cw, [84, -170, 74, 44], dsp, 17) + sh(RR(84, -118, 16, 5, 2), "gray", { w: "detail" }) +
    sh(RR(198, -80, 14, 14, 4), "yellow", { w: "detail" }) + (lampsOn(o) ? glow(206, -74, 26) : "") + sh(RR(196, -50, 26, 12, 5), "gray", { w: "detail" }) + sh(RR(58, -226, 10, 70, 4), "gray", { w: "detail" }) +
    wheel(-176, -34, 34) + wheel(-116, -34, 34) + wheel(140, -34, 34) + cp.svg + sh(RR(-288, -124, 46, 42, 4), "earth", { w: "detail" }) + L.stroke("M-265 -124 V-82", { w: 2, c: "brown" }) + fist(cp.hands[0], cp.sk, 5);
}, { box: [-330, -250, 600, 290], opt: "color, who (driver), who2 (courier), time", demo: {}, wide: true });

reg("ride-pickup-cargo", "Pickup truck with cargo and two people", SRV, ["pickup", "truck", "cargo", "crates", "farm", "moving", "load", "delivery", "driver", "passenger", "ute", "lorry"], (o) => {
  const c = pick(o, "color", "teal"), a = sp(o.who, L.rideCast.man, { face: "happy", acc: ["cap"], accC: "red", outfitC: "orange" }), b = sp(o.who2, L.rideCast.woman, { face: "happy", outfitC: "yellow" });
  const GLD = P([[22, -92], [34, -150], [100, -150], [128, -92]], true);
  const wc = [102, -108], dr = place(a, { hr: 21, head: [76, -122], pose: "stand", face: a.face, look: 0.8, hands: [[wc[0] - 2, wc[1] + 6], [wc[0] + 4, wc[1] - 6]], armPref: [0.1, 1] });
  const inner = fl(GLD, glass(o)) + place(b, { hr: 20, head: [40, -124], pose: "stand", face: b.face, look: 0.5 }).svg + dr.svg + L.tag("path", { d: C(wc[0], wc[1], 5, 18), fill: "none", stroke: L.c("ink"), "stroke-width": 4 }) + fist(dr.hands[0], dr.sk, 5) + tint(o);
  const cargo = sh(RR(-196, -134, 56, 50, 4), "wood", { w: "detail" }) + L.stroke("M-196 -109 H-140 M-168 -134 V-84", { w: 2, c: "brown" }) + sh(RR(-136, -118, 50, 34, 4), "wood", { w: "detail" }) + L.stroke("M-136 -101 H-86", { w: 2, c: "brown" }) + sh(RR(-176, -184, 52, 48, 4), "wood", { w: "detail" }) + L.stroke("M-176 -160 H-124", { w: 2, c: "brown" }) + sh(C(-100, -132, 14), "green", { w: "detail" }) + sh(C(-82, -132, 12), "green", { w: "detail" }) + sh(RR(-96, -110, 20, 26, 6), "gold", { w: "detail" });
  return L.shadow(0, 0, 440) + cargo +
    body(o, "M-214 -40 V-96 H20 L30 -150 Q34 -158 44 -158 H104 Q124 -156 132 -130 L140 -96 H196 Q212 -92 214 -70 V-40 Z", c, fl(C(-120, -34, 42) + C(140, -34, 42), "ink") + shd("M-220 -60 H220 V-30 H-220 Z", 0.14)) +
    sh(RR(-214, -98, 238, 10, 4), c, { tone: 2, w: "detail" }) + clip(GLD, inner) + L.tag("path", { d: GLD, fill: "none", stroke: L.outline("glass"), "stroke-width": L.lw("detail") }) + sh(RR(46, -90, 16, 5, 2), "gray", { w: "detail" }) + sh(RR(200, -80, 14, 14, 4), "yellow", { w: "detail" }) + (lampsOn(o) ? glow(208, -74, 26) : "") + sh(RR(-218, -86, 8, 18, 3), "red", { w: "detail" }) + sh(RR(196, -50, 26, 12, 5), "gray", { w: "detail" }) + wheel(-120, -34, 34) + wheel(140, -34, 34);
}, { box: [-270, -250, 540, 290], opt: "color, who, who2, time", demo: {}, wide: true });

const VAN = "M-200 -34 V-166 Q-200 -186 -178 -186 H56 Q88 -186 106 -150 L126 -108 H188 Q208 -104 208 -86 V-34 Q208 -22 196 -22 H-188 Q-200 -22 -200 -34 Z";
function vanArt(o, c, cfg) {
  const on = lampsOn(o), cw = P([[70, -172], [90, -172], [116, -120], [70, -120]], true);
  return L.shadow(0, 0, 400) + (on ? beam(206, -70, 200, 40) : "") + (cfg.under || "") +
    body(o, VAN, cfg.base || "white", fl(C(-112, -30, 42) + C(120, -30, 42), "ink") + fl("M-210 -96 H220 V-80 H-210 Z", c) + shd("M-210 -52 H220 V-20 H-210 Z", 0.13) + (cfg.paint || "")) +
    (cfg.rear || "") + cabWin(o, cw, [70, -172, 46, 52], cfg.driver, 16) + sh(RR(46, -108, 16, 5, 2), "gray", { w: "detail" }) + sh(RR(190, -84, 18, 14, 4), "yellow", { w: "detail" }) + (on ? glow(200, -78, 28) : "") + sh(RR(-204, -84, 8, 18, 3), "red", { w: "detail" }) + sh(RR(188, -46, 26, 12, 5), "gray", { w: "detail" }) + wheel(-112, -30, 34) + wheel(120, -30, 34) + (cfg.over || "");
}
reg("ride-ambulance", "Ambulance (calm) with paramedics", SRV, ["ambulance", "emergency", "hospital", "paramedic", "medical", "rescue", "doctor", "nurse", "health", "first aid", "help", "vehicle"], (o) => {
  const a = sp(o.who, L.rideCast.woman, { face: "smile", outfitC: "green", acc: ["nursecap"], accC: "white" }), m = sp(o.who2, L.rideCast.man, { face: "smile", outfitC: "green" });
  const cross = sh(C(-120, -130, 26), "white", { w: "detail" }) + fl("M-130 -146 h20 v12 h12 v20 h-12 v12 h-20 v-12 h-12 v-20 h12 Z", "red");
  const wins = [-170, -60].map((x, i) => winPeople(o, [x, -168, 70, 48, 8], i ? [m] : [], 15, { hy: 0.55, look: 0.7 })).join("");
  const bar = sh(RR(56, -204, 54, 16, 6), "gray", { w: "detail" }) + sh(RR(60, -212, 20, 12, 5), "red", { w: "detail" }) + sh(RR(84, -212, 20, 12, 5), "blue", { w: "detail" });
  return vanArt(o, "red", { driver: a, under: bar, rear: wins + cross });
}, { box: [-250, -250, 520, 290], opt: "who, who2, time", demo: {}, wide: true });

reg("ride-police-car", "Police car (friendly cartoon)", SRV, ["police", "officer", "cop", "patrol", "law", "safety", "friendly", "siren", "car", "vehicle", "driving", "protect"], (o) => {
  const a = sp(o.who, L.rideCast.man, { face: "happy", outfitC: "navy", acc: ["cap"], accC: "navy" });
  const bar = sh(RR(-34, -184, 22, 14, 5), "red", { w: "detail" }) + sh(RR(-8, -184, 22, 14, 5), "blue", { w: "detail" });
  const badge = sh(L.star(-60, -66, 14, 6, 5), "gold", { w: "detail" });
  return carArt(Object.assign({}, o, { color: "white" }), { def: "white", under: bar + tube("M-6 -170 V-166", "gray", 6), paint: fl("M-210 -74 H220 V-58 H-210 Z", "blue") + fl("M-210 -58 H220 V-52 H-210 Z", "red"), people: [{ spec: a, x: 36, driver: true }], over: badge });
}, { box: [-290, -250, 700, 290], opt: "who, time", demo: {}, wide: true });

reg("ride-fire-truck", "Fire truck with firefighters", SRV, ["fire truck", "fire engine", "firefighter", "fire", "rescue", "emergency", "ladder", "hose", "station", "hero", "vehicle", "red"], (o) => {
  const c = pick(o, "color", "red"), a = sp(o.who, L.rideCast.man, { face: "happy", outfitC: "yellow", acc: ["hardhat"], accC: "yellow" }), b = sp(o.who2, L.rideCast.woman, { face: "happy", outfitC: "yellow", acc: ["hardhat"], accC: "yellow" });
  const cw = P([[112, -176], [150, -176], [182, -128], [112, -128]], true);
  const ladder = [0, 1].map((k) => L.stroke(`M-230 ${-218 - k * 16} L96 ${-226 - k * 16}`, { w: 5, c: "gray" })).join("") + Array.from({ length: 14 }, (_, i) => L.stroke(`M${-224 + i * 24} -216 v-14`, { w: 3, c: "gray" })).join("");
  return L.shadow(0, 0, 560) + (lampsOn(o) ? beam(232, -74, 200, 40) : "") + ladder + sh(RR(-220, -200, 320, 14, 5), "gray", { w: "detail" }) +
    body(o, RR(-252, -176, 330, 142, 10), c, fl("M-260 -112 H90 V-100 H-260 Z", "white", 0.92) + [-190, -130, -70, -10, 50].map((x) => L.stroke(L.line([x, -176], [x, -36]), { w: "detail", op: 0.18 })).join("")) + sh(RR(-236, -164, 84, 46, 6), "gray", { w: "detail" }) + dot(-194, -141, 16, "gray", { w: "detail" }) + dot(-194, -141, 5, "ink", { w: "detail" }) + sh(RR(-130, -160, 12, 52, 3), "gray", { w: "detail" }) +
    body(o, "M96 -36 V-186 H152 Q184 -184 200 -148 L228 -100 Q246 -96 248 -74 V-36 Z", c, fl(C(180, -34, 42) + C(-170, -34, 42) + C(-100, -34, 42), "ink") + fl("M90 -86 H260 V-74 H90 Z", "white", 0.92)) + cabWin(o, cw, [112, -176, 70, 50], [b, a], 13, { hy: 0.6 }) +
    sh(RR(120, -210, 64, 14, 6), "gray", { w: "detail" }) + sh(RR(126, -220, 22, 12, 5), "red", { w: "detail" }) + sh(RR(154, -220, 22, 12, 5), "blue", { w: "detail" }) + sh(RR(234, -80, 14, 14, 4), "yellow", { w: "detail" }) + (lampsOn(o) ? glow(242, -74, 28) : "") + sh(RR(230, -52, 28, 12, 5), "gray", { w: "detail" }) + wheel(-170, -34, 34) + wheel(-100, -34, 34) + wheel(180, -34, 34);
}, { box: [-290, -260, 600, 300], opt: "color, who, who2, time", demo: {}, wide: true });

reg("ride-garbage-truck", "Garbage truck with crew", SRV, ["garbage", "rubbish", "trash", "bin", "waste", "recycling", "truck", "collector", "dustbin", "clean", "city", "lorry"], (o) => {
  const c = pick(o, "color", "green"), a = sp(o.who, L.rideCast.man, { face: "happy", outfitC: "orange", acc: ["cap"], accC: "orange" }), w = sp(o.who2, L.rideCast.woman, { face: "happy", outfitC: "orange", acc: ["hardhat"], accC: "orange" });
  const cw = P([[96, -172], [134, -172], [166, -124], [96, -124]], true);
  const wp = place(w, { stand: true, k: 0.5, feetAt: [-262, 0], pose: "stand", face: "happy", look: 0.7, hands: [[-236, -86], [-232, -84]], feet: [[-272, 0], [-250, 0]], armPref: [0, 1] });
  const bin = sh(P([[-248, -126], [-208, -126], [-214, -50], [-242, -50]], true), "green", { w: "detail", tone: 2 }) + sh(RR(-252, -134, 48, 10, 4), "green", { w: "detail" }) + sh(C(-236, -48, 6), "ink", { w: 2 });
  return L.shadow(0, 0, 560) + (lampsOn(o) ? beam(214, -74, 200, 40) : "") +
    body(o, "M-240 -34 V-170 Q-240 -196 -214 -196 H46 Q74 -196 78 -170 V-34 Z", c, fl("M-250 -100 H90 V-88 H-250 Z", "white", 0.9) + [-170, -100, -30].map((x) => L.stroke(L.line([x, -196], [x, -36]), { w: "detail", op: 0.2 })).join("") + shd("M-250 -60 H90 V-30 H-250 Z", 0.12)) + sh(RR(-244, -90, 18, 56, 5), "gray", { w: "detail" }) + T("♻", -80, -130, { size: 60, c: "white" }) +
    body(o, "M78 -36 V-176 H134 Q156 -176 168 -154 L196 -104 Q214 -100 216 -78 V-36 Z", c, fl(C(150, -34, 42) + C(-170, -34, 42) + C(-100, -34, 42), "ink") + fl("M70 -86 H230 V-74 H70 Z", "white", 0.9), { tone: 2 }) + cabWin(o, cw, [96, -172, 70, 50], a, 15, { hy: 0.6 }) + sh(RR(202, -80, 14, 14, 4), "yellow", { w: "detail" }) + (lampsOn(o) ? glow(210, -74, 26) : "") + sh(RR(198, -52, 28, 12, 5), "gray", { w: "detail" }) +
    wheel(-170, -34, 34) + wheel(-100, -34, 34) + wheel(150, -34, 34) + wp.svg + bin + fist(wp.hands[0], wp.sk, 5);
}, { box: [-320, -240, 580, 280], opt: "color, who, who2, time", demo: {}, wide: true });

reg("ride-rickshaw", "Cycle rickshaw with driver and passenger", SRV, ["rickshaw", "pedicab", "trishaw", "taxi", "bike taxi", "passenger", "driver", "tourist", "tuk", "ride", "city", "travel"], (o) => {
  const c = pick(o, "color", "orange"), a = sp(o.who, L.rideCast.man, { face: "happy", outfitC: "green" }), p = sp(o.who2, L.rideCast.woman, { face: "excited", outfitC: "pink", acc: ["strawhat"], accC: "sand" });
  const b = bikeArt(o, "blue", 120, 60);
  const dr = place(a, { k: 0.7, hip: [b.saddle[0] + 2, b.saddle[1] - 6], lean: 22, pose: "stand", face: a.face, look: 0.8, hands: [[b.grip[0] - 2, b.grip[1] + 2], [b.grip[0] - 6, b.grip[1] + 4]], feet: [crank(b.bb, 70, 24), crank(b.bb, 250, 24)], kneePref: [1, -0.5], armPref: [0.3, 1] });
  const ps = place(p, { k: 0.5, hip: [-84, -108], pose: "stand", face: p.face, look: 0.7, hands: [[-62, -100], [-52, -98]], feet: [[-34, -40], [-20, -40]], kneePref: [1, -0.4] });
  const canopy = "M-190 -250 Q-90 -318 40 -262 L24 -240 Q-80 -282 -170 -228 Z";
  return L.shadow(0, 0, 440) + b.art + tube(`M${b.RA[0] + 20} -60 L-20 -60`, "blue", 7) + ps.svg + sh(RR(-150, -96, 150, 24, 8), c) + sh(RR(-150, -86, 150, 40, 6), c, { tone: 2 }) + spokeWheel(-80, -50, 50, 12) + tubes([["M-150 -96 V-236", "gray", 5], ["M-6 -96 V-248", "gray", 5]]) + body(o, canopy, c, Array.from({ length: 6 }, (_, i) => fl(RR(-190 + i * 38, -330, 19, 120, 0), "white", 0.9)).join("")) + dr.svg + fist(dr.hands[1], dr.sk, 5);
}, { box: [-230, -330, 470, 350], opt: "color, who, who2", demo: {}, wide: true });

reg("ride-sled-kids", "Sled with two kids", SNOW, ["sled", "sledge", "snow", "winter", "kids", "children", "toboggan", "slide", "hill", "fun", "christmas", "play"], (o) => {
  const a = sp(o.who, L.rideCast.girl, Object.assign(crowd(o, 1, "kid"), { face: "laugh", body: "kid", acc: ["beanie"], accC: "red", outfitC: "red" })), b = sp(o.who2, L.rideCast.boy, Object.assign(crowd(o, 2, "kid"), { face: "excited", body: "kid", acc: ["beanie"], accC: "blue", outfitC: "blue" }));
  const mk = (spec, hx, hands) => place(spec, { k: 0.8, hip: [hx, -52], pose: "stand", face: spec.face, look: 0.8, hands, feet: [[hx + 56, -46], [hx + 68, -44]], kneePref: [1, -0.4], armPref: [0.2, 1] });
  const r2 = mk(b, -64, [[-96, -150], [-30, -150]]), r1 = mk(a, 30, [[90, -62], [94, -60]]);
  const dust = [[-190, -40, 1.1], [-240, -24, 1.4], [-160, -12, 0.9]].map(([x, y, k]) => puff(x, y, k)).join("");
  return fl(RR(-300, 0, 600, 14, 6), "snow", 0.95) + L.shadow(0, 0, 300) + dust + tube("M-130 -30 Q-110 -30 -100 -36 H100 Q130 -36 136 -66", "wood", 7) + tube("M-130 -14 H110 Q150 -14 150 -50", "gray", 5) + r2.svg + r1.svg + sh(RR(-120, -52, 230, 14, 6), "wood") + tube("M150 -50 Q190 -50 230 -34", "brown", 3) + fist(r1.hands[1], r1.sk, 5);
}, { box: [-320, -240, 600, 270], opt: "who, who2", demo: {}, wide: true });

reg("ride-snowmobile", "Snowmobile rider", SNOW, ["snowmobile", "snow scooter", "winter", "snow", "arctic", "rider", "helmet", "ride", "fast", "mountain", "sled"], (o) => {
  const c = pick(o, "color", "orange"), a = sp(o.who, L.rideCast.man, { face: o.face || "excited", outfit: "jacket", outfitC: "navy" });
  const r = place(a, { k: 0.64, hip: [-40, -104], lean: 16, pose: "stand", face: a.face, look: 0.9, hands: [[62, -134], [66, -130]], feet: [[16, -50], [28, -52]], kneePref: [1, -0.4], armPref: [0.3, 1] });
  const spray = [[-250, -30, 1.2], [-210, -12, 0.9], [-290, -14, 1]].map(([x, y, k]) => puff(x, y, k)).join("");
  return fl(RR(-320, 0, 640, 14, 6), "snow", 0.95) + L.shadow(0, 0, 360) + spray + sh(RR(-170, -40, 210, 38, 19), "ink", { w: "prop" }) + [-140, -90, -40, 10].map((x) => dot(x, -21, 14, "gray", { w: "detail" })).join("") +
    r.svg + sh(RR(-130, -96, 190, 52, 16), "gray", { tone: 2 }) + body(o, "M-132 -88 Q-120 -128 -60 -114 L60 -96 Q120 -80 150 -52 L-132 -50 Z", c) + sh(P([[90, -98], [112, -142], [126, -140], [116, -96]], true), "glass", { w: "detail" }) + tubes([["M110 -60 L130 -26", "gray", 7]]) + sh(RR(88, -26, 100, 10, 5), "gray", { w: "prop" }) + sh(C(156, -76, 9), "yellow", { w: "detail" }) + helmetArt(r, "yellow") + fist(r.hands[1], r.sk, 5);
}, { box: [-340, -290, 580, 320], opt: "color, who, face", demo: {}, wide: true });

reg("ride-wheelchair-user", "Wheelchair user", SNOW, ["wheelchair", "disability", "accessible", "mobility", "access", "inclusive", "disabled", "rolling", "hospital", "person"], (o) => {
  const a = sp(o.who, L.rideCast.woman, { face: "happy", outfitC: "purple" });
  const r = place(a, { k: 0.62, hip: [-10, -90], pose: "stand", face: a.face, look: 0.6, hands: [[10, -104], [16, -100]], feet: [[58, -34], [68, -32]], kneePref: [1, -0.2], armPref: [0.3, 1] });
  return L.shadow(0, 0, 220) + tubes([["M-34 -82 L-44 -164 H-62", "gray", 6], ["M-34 -82 H46 L66 -36", "gray", 7], ["M46 -82 L60 -34", "gray", 6]]) + sh(RR(-34, -92, 80, 14, 6), "navy") + sh(RR(-52, -166, 14, 80, 6), "navy", { tone: 2 }) + r.svg + sh(RR(54, -38, 26, 8, 3), "gray", { w: "detail" }) +
    spokeWheel(-10, -50, 48, 10) + L.tag("path", { d: C(-10, -50, 41), fill: "none", stroke: L.c("gray"), "stroke-width": 3 }) + sh(C(66, -14, 14), "ink", { w: "detail" }) + dot(66, -14, 5, "gray", { w: "detail" }) + fist(r.hands[1], r.sk, 5);
}, { box: [-140, -250, 280, 270], opt: "who", demo: {}, wide: false });

reg("ride-pram-pusher", "Person pushing a pram", SNOW, ["pram", "stroller", "baby", "buggy", "parent", "mother", "father", "mum", "dad", "walk", "family", "push", "park", "newborn"], (o) => {
  const a = sp(o.who, L.rideCast.woman, { face: "happy", outfitC: "teal" }), baby = sp(o.who2, L.rideCast.girl, { face: "happy", body: "baby", hair: "none" });
  const r = place(a, { stand: true, k: 0.55, feetAt: [-30, 0], pose: "stand", face: a.face, look: 0.9, hands: [[70, -118], [74, -114]], feet: [[-52, 0], [-4, -6]], kneePref: [0.6, -0.3], armPref: [0, 1] });
  const bb = place(baby, { hr: 16, head: [152, -100], pose: "stand", face: "happy", look: 0.3 });
  const BOWL = "M86 -86 H210 Q206 -44 160 -40 H112 Q90 -44 86 -86 Z";
  return L.shadow(0, 0, 300) + r.svg + clip(P([[90, -100], [220, -100], [220, -60], [90, -60]], true), bb.svg) + body(o, BOWL, pick(o, "color", "pink"), shd("M80 -60 H220 V-36 H80 Z", 0.14)) +
    sh("M120 -88 Q128 -146 178 -148 L200 -88 Z", pick(o, "color", "pink"), { tone: 2 }) + tubes([["M88 -80 L60 -112 H78", "gray", 6], ["M150 -40 L136 -22", "gray", 5], ["M190 -40 L200 -22", "gray", 5]]) + spokeWheel(136, -22, 22, 8) + spokeWheel(200, -22, 22, 8) + fist(r.hands[1], r.sk, 5);
}, { box: [-170, -250, 420, 270], opt: "color, who, who2", demo: {}, wide: true });

// =====================================================================================================================
// ROAD PIECES
// =====================================================================================================================
const RD = "Roads and crossings", SG = "Road signs", PL = "Places on the way";
const roadTint = (o) => (night(o) ? fl(BIG, "navy", 0.4) : TM(o) === "sunset" ? fl(BIG, "orange", 0.12) : "");
// road strip: top edge (where wheels touch) at y = 0, x from -w/2 to w/2, h deep
const roadStrip = (o, w, h, dashes = true) => {
  const n = dashes ? Math.floor(w / 110) : 0;
  return solid(RR(-w / 2, 0, w, h, 0), "gray", fl(`M${-w / 2} 0 H${w / 2} V${h} H${-w / 2} Z`, "ink", 0.26) + Array.from({ length: n }, (_, i) => fl(RR(-w / 2 + 20 + i * 110, h * 0.45, 62, 8, 3), "white", 0.95)).join("") + fl(`M${-w / 2} ${h - 12} H${w / 2} V${h} H${-w / 2} Z`, "ink", 0.22) + roadTint(o), { w: "scene" }) +
    sh(RR(-w / 2, -10, w, 12, 3), "stone", { w: "detail" });
};
reg("ride-road-segment", "Road segment (kerb, lane markings)", RD, ["road", "street", "asphalt", "lane", "highway", "kerb", "ground", "path", "route", "driving surface"], (o) => roadStrip(o, 700, 96), { box: [-360, -20, 720, 130], opt: "time", demo: {} });
reg("ride-road-segment-night", "Road segment · night", RD, ["road", "street", "night", "asphalt", "lane"], (o) => roadStrip(Object.assign({ time: "night" }, o), 700, 96), { box: [-360, -20, 720, 130], opt: "time", demo: { time: "night" } });
const walker = (spec, x, y, k) => place(spec, { stand: true, k, feetAt: [x, y], pose: "stand", face: spec.face, look: 0.5, feet: [[x - 14, y], [x + 22, y - 6]], kneePref: [0.6, -0.3] }).svg;
reg("ride-road-crossing", "Zebra crossing with a family crossing", RD, ["crossing", "zebra", "pedestrian", "cross the road", "family", "walk", "street", "safety", "road", "kids"], (o) => {
  const a = sp(o.who, L.rideCast.woman, { face: "happy", outfitC: "purple" }), k = sp(o.who2, L.rideCast.boy, Object.assign(crowd(o, 4, "kid"), { face: "happy", body: "kid" }));
  const bars = Array.from({ length: 6 }, (_, i) => fl(P([[-170 + i * 62, 6], [-130 + i * 62, 6], [-144 + i * 62, 88], [-184 + i * 62, 88]], true), "white", 0.97)).join("");
  return roadStrip(o, 560, 96, false) + bars + walker(a, -20, 54, 0.46) + walker(k, 46, 54, 0.42) + tube("M-300 0 V-120", "gray", 7) + sh(RR(-326, -176, 52, 52, 8), "blue") + dot(-300, -160, 7, "white", { w: 2 }) + fl("M-300 -152 l-9 22 h18 Z", "white");
}, { box: [-340, -200, 680, 320], opt: "who, who2, time", demo: {}, wide: true });
const tl = (name, lit) => reg("ride-traffic-light-" + name, "Traffic light · " + name, RD, ["traffic light", "signal", "stoplight", "crossing", "junction", "road", "lights", name, "pedestrian"], (o) => {
  const lamp = (cy, i) => { const c = ["red", "yellow", "green"][i], on = lit === c; return dot(0, cy, 14, on ? c : "gray", { w: "detail" }) + (on ? fl(C(0, cy, 27), c, 0.25) + fl(C(0, cy, 21), c, 0.25) : ""); };
  const ped = sh(RR(24, -190, 46, 60, 8), "navy") + (lit === "red" ? fl(RR(32, -182, 30, 44, 4), "red", 0.9) + dot(47, -170, 5, "white", { flat: true }) + fl("M41 -162 h12 v18 h-12 Z", "white") : fl(RR(32, -182, 30, 44, 4), "green", 0.9) + dot(47, -170, 5, "white", { flat: true }) + fl("M41 -162 l6 8 l6 -8 v18 h-12 Z", "white"));
  return L.shadow(0, 0, 90) + sh(RR(-18, -14, 36, 14, 4), "gray") + tube("M0 -10 V-300", "gray", 12) + sh(RR(-28, -330, 56, 134, 14), "navy") + [0, 1, 2].map((i) => lamp(-298 + i * 40, i)).join("") + ped + sh(RR(-32, -140, 28, 34, 6), "yellow", { w: "detail" }) + dot(-18, -123, 6, "red", { w: 2 });
}, { box: [-90, -345, 190, 365], opt: "", demo: {}, wide: false });
tl("red", "red"); tl("amber", "yellow"); tl("green", "green");

// ---- ten road signs (pole at origin, face about 90 px) ----
const signPole = (face, h = 190) => L.shadow(0, 0, 70) + tube(`M0 0 V${-h}`, "gray", 9) + face;
const SG_ = (name, label, tags, face, o2 = {}) => reg("ride-sign-" + name, "Road sign · " + label, SG, ["sign", "road sign", "traffic sign", "road", "rule", "street", ...tags], (o) => signPole(face(o), o2.h), { box: [-80, -300, 160, 320], demo: {}, wide: false });
const octagon = (cx, cy, r) => P(Array.from({ length: 8 }, (_, i) => [cx + r * Math.cos(D2R * (22.5 + i * 45)), cy + r * Math.sin(D2R * (22.5 + i * 45))]), true);
const tri = (cx, cy, r, down) => P(down ? [[cx - r, cy - r * 0.8], [cx + r, cy - r * 0.8], [cx, cy + r * 0.95]] : [[cx, cy - r * 0.95], [cx + r, cy + r * 0.8], [cx - r, cy + r * 0.8]], true);
const man_ = (cx, cy, k, c = "ink") => dot(cx, cy - 22 * k, 6 * k, c, { flat: true, w: 2 }) + L.stroke(`M${cx} ${cy - 14 * k} V${cy + 8 * k} M${cx - 9 * k} ${cy - 6 * k} L${cx} ${cy - 10 * k} L${cx + 9 * k} ${cy - 4 * k} M${cx} ${cy + 8 * k} L${cx - 8 * k} ${cy + 26 * k} M${cx} ${cy + 8 * k} L${cx + 9 * k} ${cy + 26 * k}`, { c, w: 3.5 });
SG_("stop", "stop", ["stop", "halt"], () => sh(octagon(0, -230, 54), "red") + L.tag("path", { d: octagon(0, -230, 46), fill: "none", stroke: L.c("white"), "stroke-width": 3 }) + T("STOP", 0, -218, { size: 31, c: "white", weight: 700 }));
SG_("give-way", "give way", ["yield", "priority", "triangle"], () => sh(tri(0, -230, 60, true), "red") + sh(tri(0, -228, 38, true), "white", { w: "detail" }));
SG_("no-entry", "no entry", ["no entry", "forbidden", "do not enter", "wrong way"], () => sh(C(0, -230, 52), "red") + fl(RR(-36, -240, 72, 20, 4), "white"));
SG_("speed-30", "speed limit 30", ["speed", "limit", "30", "slow", "zone"], () => sh(C(0, -230, 54), "red") + sh(C(0, -230, 40), "white", { w: "detail" }) + T("30", 0, -214, { size: 46, weight: 700 }));
SG_("pedestrian-crossing", "pedestrian crossing", ["pedestrian", "zebra", "walk", "crossing", "people"], () => sh(RR(-50, -280, 100, 100, 12), "blue") + fl(P([[-36, -190], [36, -190], [28, -184], [-28, -184]], true), "white") + man_(0, -232, 1.2, "white"));
SG_("school", "school ahead", ["school", "children", "kids", "slow", "warning"], () => sh(tri(0, -232, 64, false), "yellow") + man_(-12, -226, 0.9) + man_(14, -222, 0.7));
SG_("one-way", "one way", ["one way", "direction", "arrow", "traffic flow"], () => sh(RR(-58, -270, 116, 66, 10), "blue") + fl("M-40 -243 H14 V-256 L44 -237 L14 -218 V-231 H-40 Z", "white"));
SG_("no-parking", "no parking", ["no parking", "parking", "forbidden", "car"], () => sh(C(0, -230, 52), "blue") + T("P", 0, -212, { size: 54, c: "white", weight: 700 }) + L.tag("path", { d: C(0, -230, 44), fill: "none", stroke: L.c("red"), "stroke-width": 8 }) + L.stroke("M-31 -261 L31 -199", { c: "red", w: 8 }));
SG_("roundabout", "roundabout", ["roundabout", "circle", "junction", "traffic circle", "direction"], () => sh(C(0, -230, 52), "blue") + [0, 120, 240].map((a) => { const x = 28 * Math.cos(D2R * (a - 90)), y = -230 + 28 * Math.sin(D2R * (a - 90)); return L.tag("path", { d: `M${f1(x)} ${f1(y)} m-4 -8 l12 8 l-12 8 z`, fill: L.c("white"), transform: `rotate(${a} ${f1(x)} ${f1(y)})` }); }).join("") + L.tag("path", { d: C(0, -230, 26), fill: "none", stroke: L.c("white"), "stroke-width": 5, "stroke-dasharray": "36 18" }));
SG_("road-works", "road works", ["road works", "construction", "digging", "workers", "warning", "men at work", "builder"], () => sh(tri(0, -232, 64, false), "orange") + man_(-4, -226, 0.9) + L.stroke("M6 -222 L24 -204", { w: 3.5, c: "ink" }) + fl("M20 -208 l10 -2 l-2 12 Z", "ink"));

// ---- petrol pump, parking lot, bridge, tunnel, railway crossing ----
reg("ride-petrol-pump", "Petrol pump station with driver filling up", PL, ["petrol", "gas station", "fuel", "pump", "gas", "diesel", "refuel", "filling station", "driver", "garage", "fill up"], (o) => {
  const a = sp(o.who, L.rideCast.man, { face: "happy", outfitC: "orange" });
  const r = place(a, { stand: true, k: 0.52, feetAt: [118, 0], pose: "stand", face: a.face, look: -0.5, hands: [[70, -98], [76, -92]], feet: [[104, 0], [134, 0]], armPref: [0, 1] });
  const canopy = tubes([["M-176 -14 V-246", "gray", 9], ["M176 -14 V-246", "gray", 9]]) + body(o, RR(-210, -270, 420, 30, 8), "white", fl("M-210 -250 H210 V-240 H-210 Z", "red"));
  return L.shadow(0, 0, 440) + canopy + sh(RR(-56, -12, 112, 12, 4), "gray") + body(o, RR(-40, -186, 80, 176, 10), "red", shd("M0 -186 H40 V-10 H0 Z", 0.12) + gl("M-30 -176 V-20", 0.3)) + sh(RR(-30, -170, 60, 44, 6), "ink", { w: "detail" }) + T("0.0", 0, -140, { size: 26, c: "green", weight: 700 }) + sh(RR(-28, -110, 56, 22, 5), "white", { w: "detail" }) + fl("M0 -106 q-8 12 0 14 q8 -2 0 -14 Z", "blue") + sh(RR(-44, -196, 88, 12, 5), "red", { tone: 2, w: "detail" }) +
    tubes([["M40 -140 Q96 -150 84 -98", "ink", 6]]) + r.svg + sh(P([[58, -104], [84, -108], [86, -92], [60, -90]], true), "gray", { w: "detail" }) + fist(r.hands[0], r.sk, 5);
}, { box: [-230, -290, 460, 310], opt: "who, time", demo: {}, wide: true });

reg("ride-parking-lot", "Parking lot with three parked cars (front view)", PL, ["parking", "car park", "lot", "bays", "cars", "parked", "garage", "shopping", "space", "urban"], (o) => {
  const cars = [["red", -200], ["blue", 0], ["yellow", 200]].map(([c, x], i) => G(L.inline("ride-car-front", { color: c, time: o.time, who: crowd(o, i + 2, "adult"), who2: crowd(o, i + 5, "adult") }), `translate(${x} -16) scale(0.5)`)).join("");
  const lines = [-300, -100, 100, 300].map((x) => fl(P([[x - 4, -52], [x + 4, -52], [x * 1.15 + 6, 86], [x * 1.15 - 6, 86]], true), "white", 0.95)).join("");
  return solid(P([[-330, -60], [330, -60], [420, 90], [-420, 90]], true), "gray", fl(BIG, "ink", 0.22) + lines + roadTint(o), { w: "scene" }) + sh(RR(-340, -72, 680, 14, 4), "stone", { w: "detail" }) + [-320, -250, 250, 320].map((x, i) => sh(C(x, -94 - (i % 2) * 6, 26, 24), "green", { w: "detail" })).join("") + cars +
    tube("M380 20 V-130", "gray", 7) + sh(RR(356, -186, 48, 48, 8), "blue") + T("P", 380, -148, { size: 36, c: "white", weight: 700 }) + walker(crowd(o, 5, "adult"), -60, 70, 0.4);
}, { box: [-430, -210, 860, 320], opt: "time", demo: {}, wide: true });

reg("ride-bridge", "Arch bridge with car and cyclist", PL, ["bridge", "river", "arch", "crossing", "road", "stone", "viaduct", "travel", "water", "car", "cyclist"], (o) => {
  const deckY = -150;
  const water = fl(RR(-420, -30, 840, 40, 0), "water") + L.stroke(wave(-420, 420, -28, 7, 14), { c: "white", w: 3, op: 0.5 });
  const banks = sh(P([[-430, -126], [-300, -126], [-250, 0], [-430, 0]], true), "grass") + sh(P([[430, -126], [300, -126], [250, 0], [430, 0]], true), "grass");
  const span = solid(`M-330 ${deckY} H330 V-30 H-330 Z M-170 -30 A170 120 0 0 1 170 -30 Z`, "stone", Array.from({ length: 12 }, (_, i) => L.stroke(`M${-330 + i * 60} ${deckY} v30`, { w: "detail", op: 0.2 })).join("") + roadTint(o), { eo: true });
  const rail = Array.from({ length: 14 }, (_, i) => L.stroke(`M${-320 + i * 49} ${deckY} v-28`, { w: "detail" })).join("") + sh(RR(-336, -184, 672, 10, 4), "stone", { w: "detail" });
  const veh_ = G(L.inline("ride-car-blue", { time: o.time }), `translate(-90 ${deckY}) scale(0.34)`) + G(L.inline("ride-bicycle-rider"), `translate(150 ${deckY}) scale(0.32)`);
  return water + banks + span + veh_ + rail;
}, { box: [-430, -330, 860, 360], opt: "time", demo: {}, wide: true });

reg("ride-tunnel-entrance", "Tunnel entrance with a car coming out", PL, ["tunnel", "mountain", "hill", "entrance", "portal", "road", "underground", "drive", "car", "dark"], (o) => {
  const hill = body(o, L.smooth([[-390, 0], [-350, -150], [-220, -280], [0, -330], [220, -280], [350, -150], [390, 0], [-390, 0]]), "grass", [[-250, -140], [-300, -60], [270, -100], [320, -40]].map(([x, y]) => fl(C(x, y, 30, 12), "green", 0.35)).join(""));
  const portal = "M-150 0 V-140 A150 150 0 0 1 150 -140 V0 Z", hole = "M-118 0 V-138 A118 118 0 0 1 118 -138 V0 Z";
  const lamps = [[-70, -120], [0, -150], [70, -120]].map(([x, y]) => fl(C(x, y, 8), "yellow", 0.9) + fl(C(x, y, 17), "yellow", 0.25)).join("");
  const asphalt = P([[-170, 0], [170, 0], [250, 80], [-250, 80]], true);
  return hill + body(o, portal, "stone") + sh(hole, "navy", { w: "detail", tone: 2 }) + clip(hole, fl(hole, "ink", 0.6) + lamps + fl(P([[-60, 0], [60, 0], [28, -70], [-28, -70]], true), "gray", 0.9)) +
    sh(RR(-56, -300, 112, 34, 8), "white") + T("TUNNEL", 0, -276, { size: 22, weight: 700 }) + fl(asphalt, "gray") + fl(asphalt, "ink", 0.22) + fl(P([[-4, 4], [4, 4], [8, 78], [-8, 78]], true), "white", 0.9) +
    G(L.inline("ride-car-front", { color: "green", time: o.time }), "translate(0 70) scale(0.42)");
}, { box: [-400, -340, 800, 440], opt: "time", demo: {}, wide: true });

const crossbuck = (x, y) => tube(`M${x} ${y + 120} V${y}`, "gray", 8) + [32, -32].map((a) => G(sh(RR(-50, -8, 100, 16, 3), "white"), `translate(${x} ${y - 4}) rotate(${a})`)).join("");
reg("ride-railway-crossing", "Railway crossing, barrier down, train passing", PL, ["railway", "crossing", "level crossing", "barrier", "gate", "train", "track", "rail", "waiting", "stop", "safety"], (o) => {
  const pass = crowdList(o, 7, "adult", 9);
  const carriage = body(o, RR(-410, -200, 820, 124, 14), "blue", fl("M-420 -112 H420 V-98 H-420 Z", "white", 0.92) + shd("M-420 -92 H420 V-76 H-420 Z", 0.12)) + Array.from({ length: 8 }, (_, i) => winPeople(o, [-390 + i * 102, -184, 76, 56, 8], [pass[i % 7]].filter(Boolean), 17, { hy: 0.56 })).join("") + [-300, -100, 100, 300].map((x) => wheel(x, -76, 14)).join("");
  const rails = fl("M-430 -62 H430 V-50 H-430 Z", "gray") + Array.from({ length: 18 }, (_, i) => fl(RR(-420 + i * 48, -52, 26, 8, 2), "wood")).join("") + L.stroke("M-430 -62 H430 M-430 -50 H430", { w: 4, c: "ink", op: 0.7 });
  const road = P([[-90, -50], [90, -50], [250, 120], [-250, 120]], true);
  const arm = (sg) => { const x0 = sg * 200, x1 = sg * 20, xa = Math.min(x0, x1), wd = Math.abs(x1 - x0); return tube(`M${x0} 60 V-64`, "gray", 12) + sh(RR(xa, -70, wd, 16, 4), "white") + Array.from({ length: 6 }, (_, i) => fl(RR(xa + (wd / 6) * i + 4, -70, wd / 12, 16, 0), "red")).join("") + fl(C(x0, -84, 22), "red", 0.22) + sh(C(x0, -84, 12), "red", { w: "detail" }) + sh(RR(x0 - 18, 0, 36, 30, 4), "yellow", { w: "detail" }); };
  return carriage + rails + fl(road, "gray") + fl(road, "ink", 0.22) + fl(P([[-3, -46], [3, -46], [9, 116], [-9, 116]], true), "white", 0.9) + G(L.inline("ride-car-front", { color: "teal", time: o.time }), "translate(0 96) scale(0.42)") + arm(-1) + arm(1) + crossbuck(330, -40) + roadTint(o).replace(BIG, "M-440 -280 H440 V130 H-440 Z");
}, { box: [-440, -290, 880, 430], opt: "time", demo: {}, wide: true });

// ---- airport gate, bus stop, train platform ----
const suitcase = (x, y, c, k = 1) => G(tube("M-8 -34 V-50 H8 V-34", "gray", 4) + sh(RR(-22, -34, 44, 34, 6), c, { w: "detail" }) + L.stroke("M-22 -18 H22", { w: 2, op: 0.4 }) + dot(-12, 3, 4, "ink", { flat: true }) + dot(12, 3, 4, "ink", { flat: true }), `translate(${x} ${y}) scale(${k})`);
reg("ride-airport-gate", "Airport gate with passengers and a plane outside", PL, ["airport", "gate", "terminal", "departure", "waiting", "passengers", "plane", "flight", "luggage", "suitcase", "travel", "holiday", "check-in"], (o) => {
  const W0 = -450, W1 = 450, TP = -400, WIN = RR(-420, -380, 840, 250, 10);
  const outside = fl(WIN, "sky") + fl(RR(-420, -190, 840, 60, 0), "gray") + fl(RR(-420, -210, 840, 20, 0), "grass") + cloud(-300, -330, 1.6, "white", 0.95) + cloud(240, -310, 1.3, "white", 0.9) + G(L.inline("ride-plane-airliner", { color: "red", passengers: false }), "translate(60 -150) scale(0.62)") + (night(o) ? fl(WIN, "navy", 0.6) : "");
  let s = fl(`M${W0} ${TP} H${W1} V0 H${W0} Z`, "wall") + fl(`M${W0} -40 H${W1} V0 H${W0} Z`, "floor") + clip(WIN, outside) + L.tag("path", { d: WIN, fill: "none", stroke: L.outline("gray"), "stroke-width": L.lw("prop") * 1.5 }) + [-210, 0, 210].map((x) => tube(`M${x} -382 V-130`, "gray", 10)).join("") + sh(RR(-420, -134, 840, 10, 3), "gray", { w: "detail" });
  s += sh(RR(-120, -440, 240, 44, 8), "navy") + T("GATE 7", 0, -408, { size: 30, c: "yellow", weight: 700 });
  const seat = (x, spec, hands) => sh(RR(x - 20, -110, 100, 20, 8), "navy", { w: "prop" }) + sh(RR(x - 20, -88, 100, 10, 4), "navy", { w: "prop", tone: 2 }) + tube(`M${x - 6} -80 V-8 M${x + 66} -80 V-8`, "gray", 6) + (spec ? place(spec, { hr: 22, head: [x + 30, -190], pose: "stand", face: spec.face, look: 0.5, hands, feet: [[x + 84, -12], [x + 98, -12]], kneePref: [1, -0.3] }).svg : "");
  s += [[-370, crowd(o, 1, "adult"), [[-318, -106], [-308, -104]]], [-250, crowd(o, 2, "adult"), [[-198, -106], [-188, -104]]]].map(([x, sp_, h]) => seat(x, sp_, h)).join("") + seat(-130, null);
  s += suitcase(-350, -6, "red", 1.2) + suitcase(-60, -6, "teal", 1.1);
  const desk = sh(RR(160, -120, 240, 120, 8), "wood") + sh(RR(150, -130, 260, 14, 6), "wood", { tone: 2 });
  const at = place(sp(o.who, L.rideCast.woman, { face: "happy", hair: "bun", outfitC: "navy" }), { hr: 24, head: [280, -230], pose: "stand", face: "happy", look: -0.2 });
  s += clip("M140 -400 H420 V-120 H140 Z", at.svg) + desk + sh(RR(236, -176, 70, 46, 6), "ink", { w: "detail" }) + fl(RR(244, -168, 54, 30, 3), "teal", 0.8);
  const st = place(crowd(o, 7, "adult"), { stand: true, hr: 24, feetAt: [10, -4], pose: "stand", face: "smile", look: 0.4, hands: [[44, -108], [48, -100]], feet: [[-6, -4], [28, -4]] });
  s += st.svg + suitcase(66, -6, "orange", 1.2);
  return clip(`M${W0} ${TP - 50} H${W1} V10 H${W0} Z`, s + (night(o) ? fl(BIG, "navy", 0.2) : "")) + L.stroke(`M${W0} ${TP - 50} H${W1} V10 H${W0} Z`, { w: "prop" });
}, { box: [-450, -450, 900, 470], opt: "who, time", demo: {}, wide: true });

function busStop(o) {
  const nt = night(o), a = crowd(o, 3, "adult"), b = crowd(o, 4, "kid"), c = crowd(o, 7, "adult");
  const glassBack = RR(-170, -236, 300, 190, 8), roof = RR(-190, -262, 340, 24, 8);
  const pa = place(a, { stand: true, k: 0.5, feetAt: [-100, -6], pose: "stand", face: "smile", look: 0.7 }), pb = place(b, { stand: true, k: 0.44, feetAt: [-40, -6], pose: "stand", face: "happy", look: 0.7 });
  const pc = place(c, { hip: [70, -62], k: 0.5, pose: "stand", face: nt ? "sleepy" : "smile", look: 0.6, hands: [[96, -50], [104, -48]], feet: [[128, -10], [142, -10]], kneePref: [1, -0.3] });
  const lamp = nt ? fl(P([[-150, -240], [110, -240], [150, -6], [-190, -6]], true), "yellow", 0.1) + fl(C(-20, -240, 40, 10), "yellow", 0.5) : "";
  return L.shadow(0, 0, 400) + fl(glassBack, nt ? "night" : "glass", nt ? 0.9 : 0.6) + lamp + [0, 1].map((i) => gl(P([[-150 + i * 130, -230], [-120 + i * 130, -230], [-170 + i * 130, -50], [-190 + i * 130, -50]], true), nt ? 0.08 : 0.35)).join("") + tubes([["M-170 -240 V-8", "gray", 8], ["M130 -240 V-8", "gray", 8]]) + pa.svg + pb.svg + pc.svg +
    sh(RR(20, -62, 110, 14, 6), "wood") + tubes([["M30 -50 V-6", "gray", 6], ["M120 -50 V-6", "gray", 6]]) + body(o, roof, "teal", shd("M-190 -246 H150 V-238 H-190 Z", 0.1)) + (nt ? sh(RR(-40, -240, 80, 8, 3), "yellow", { w: 2 }) : "") +
    tube("M200 0 V-250", "gray", 8) + sh(C(200, -262, 34), "blue", { w: "prop" }) + sh(RR(184, -274, 32, 18, 5), "white", { w: 2.5 }) + dot(192, -253, 4, "ink", { flat: true }) + dot(208, -253, 4, "ink", { flat: true }) + sh(RR(176, -208, 48, 66, 5), "white", { w: "detail" }) + L.stroke("M184 -192 H216 M184 -178 H216 M184 -164 H216 M184 -150 H206", { w: 2.5, op: 0.5 });
}
reg("ride-bus-stop", "Bus stop with people waiting", PL, ["bus stop", "waiting", "shelter", "commute", "people", "public transport", "queue", "stop", "timetable", "bench", "passengers"], (o) => busStop(o), { box: [-260, -300, 520, 320], opt: "time", demo: {} });
reg("ride-bus-stop-night", "Bus stop at night with people waiting", PL, ["bus stop", "night", "waiting", "shelter", "late", "dark", "commute", "lamp", "public transport"], (o) => busStop(Object.assign({ time: "night" }, o)), { box: [-260, -300, 520, 320], opt: "time", demo: { time: "night" } });
reg("ride-train-platform", "Train platform with people waiting", PL, ["platform", "station", "train station", "waiting", "railway", "commuters", "rail", "travel", "yellow line", "bench", "passengers"], (o) => {
  const W0 = -450, W1 = 450;
  const p = [crowd(o, 2, "adult"), crowd(o, 5, "kid"), crowd(o, 4, "adult"), crowd(o, 1, "adult")];
  let s = fl(`M${W0} -330 H${W1} V-40 H${W0} Z`, "wall", 0.0) + fl(`M${W0} -300 H${W1} V-40 H${W0} Z`, night(o) ? "night" : "sky", 0.6) + body(o, RR(W0, -330, W1 - W0, 26, 6), "gray") + [-330, 0, 330].map((x) => tube(`M${x} -304 V-40`, "gray", 12)).join("");
  s += sh(RR(-130, -296, 260, 46, 8), "blue") + T("PLATFORM 2", 0, -262, { size: 28, c: "white", weight: 700 }) + tube("M-90 -304 V-296 M90 -304 V-296", "gray", 4);
  s += solid(RR(W0, -44, W1 - W0, 60, 0), "stone", fl(`M${W0} -44 H${W1} V-30 H${W0} Z`, "white", 0.25) + roadTint(o)) + fl(RR(W0, -44, W1 - W0, 10, 0), "yellow") + Array.from({ length: 30 }, (_, i) => fl(RR(W0 + i * 30, -44, 15, 10, 0), "ink", 0.8)).join("");
  s += [[-250, 0.5], [-200, 0.42], [150, 0.5], [200, 0.5]].map(([x, k], i) => place(p[i], { stand: true, k, feetAt: [x, -50], pose: "stand", face: "smile", look: 0.9 }).svg).join("");
  s += sh(RR(-120, -110, 120, 14, 6), "wood") + tubes([["M-110 -96 V-52", "gray", 6], ["M-10 -96 V-52", "gray", 6]]) + suitcase(80, -48, "purple", 1.1);
  s += solid(RR(W0, -2, W1 - W0, 40, 0), "stone", Array.from({ length: 20 }, (_, i) => L.stroke(`M${W0 + i * 46} -2 v40`, { w: "detail", op: 0.25 })).join("") + shd(`M${W0} 20 H${W1} V40 H${W0} Z`, 0.2));
  return clip(`M${W0} -340 H${W1} V40 H${W0} Z`, s) + L.stroke(`M${W0} -340 H${W1} V40 H${W0} Z`, { w: "prop" });
}, { box: [-450, -350, 900, 400], opt: "time", demo: {}, wide: true });

// ---- a moped and a canoe ----
reg("ride-moped-rider", "Moped rider", WH, ["moped", "scooter", "vespa", "motor scooter", "city", "commute", "rider", "helmet", "delivery", "ride"], (o) => {
  const c = pick(o, "color", "teal"), a = sp(o.who, L.rideCast.woman, { face: o.face || "happy", outfitC: "yellow" });
  const r = place(a, { k: 0.6, hip: [-22, -100], lean: 8, pose: "stand", face: a.face, look: 0.9, hands: [[66, -148], [70, -144]], feet: [[34, -48], [46, -50]], kneePref: [1, -0.3], armPref: [0.3, 1] });
  return L.shadow(0, 0, 260) + r.svg + helmetArt(r, "pink") + fist(r.hands[1], r.sk, 5) +
    sh(C(-84, -36, 36), "ink", { w: "prop" }) + dot(-84, -36, 18, "gray", { w: "detail" }) + body(o, "M-120 -40 Q-130 -96 -70 -96 L-10 -86 Q10 -60 54 -56 L68 -48 L68 -30 H-110 Q-120 -30 -120 -40 Z", c, shd("M-130 -50 H70 V-30 H-130 Z", 0.14)) + sh(RR(-74, -108, 70, 14, 7), "ink") +
    body(o, "M50 -56 Q68 -130 86 -150 L100 -146 Q92 -100 100 -50 Z", c, "", { tone: 2 }) + tube("M92 -148 L84 -166 H104", "gray", 6) + sh(C(104, -126, 10), "yellow", { w: "detail" }) + sh(C(86, -36, 36), "ink", { w: "prop" }) + dot(86, -36, 18, "gray", { w: "detail" });
}, { box: [-170, -300, 340, 330], opt: "color, who, face", demo: {}, wide: false });
reg("ride-canoe-two", "Canoe with two paddlers", SEA, ["canoe", "kayak", "paddle", "two people", "lake", "river", "adventure", "camp", "boat", "summer", "outdoors"], (o) => {
  const a = sp(o.who, L.rideCast.man, { face: "happy", outfitC: "red" }), b = sp(o.who2, L.rideCast.woman, { face: "excited", outfitC: "blue" });
  const ra = place(a, { hr: 21, head: [-96, -108], pose: "stand", face: a.face, look: 0.8, hands: [[-62, -64], [-46, -60]], feet: [[-60, -52], [-46, -52]], armPref: [0.2, 1] }), rb = place(b, { hr: 21, head: [76, -108], pose: "stand", face: b.face, look: 0.8, hands: [[110, -64], [124, -58]], feet: [[112, -52], [126, -52]], armPref: [0.2, 1] });
  return ra.svg + rb.svg + tube("M-40 -112 L-40 -62 L-14 12", "wood", 5) + sh(P([[-20, 4], [-4, 16], [8, 8], [-8, -4]], true), "wood", { w: "detail" }) + tube("M130 -112 L124 -58 L150 14", "wood", 5) +
    body(o, "M-236 -62 Q-120 14 0 14 Q120 14 236 -62 Q120 -40 0 -40 Q-120 -40 -236 -62 Z", pick(o, "color", "orange"), shd("M-240 -20 H240 V20 H-240 Z", 0.16)) + sea(300, -10, 10);
}, { box: [-300, -190, 600, 230], opt: "color, who, who2", demo: {}, wide: true });
})();
