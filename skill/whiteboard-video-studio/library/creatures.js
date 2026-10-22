// ===================== library/creatures.js — friendly original characters videos can cast =====================
// Robots, aliens, monsters, ghosts, dragons, fantasy folk, living weather, talking objects, ancient people, heroes, clones.
// Standing ones: origin = bottom centre on the ground. Floating ones (ghost, fairy, clouds, sun, moon, ufo, star): origin = centre
// (the call line says y). Most take `face` (smile happy shocked sad angry sleepy smug …) and a simple `pose` (stand wave cheer point
// shrug shocked hips cross sad); creatures with a head use the same face names as people.
(function () {
const L = window.L, f1 = L.f1, PI = Math.PI;
const CAT = "creatures";

// ---------- helpers ----------
const reg = (name, m, fn) => L.reg(CAT, name, fn, { box: m.box, group: m.g, label: m.l, tags: ["creature", "character"].concat(m.tags || []), demo: m.demo || {},
  call: `L.put(S, "${name}", x, ${m.at || "gy"}, { s: 1${m.opt ? ", " + m.opt : ""}, t })` });
const sh = (d, c, o) => L.shape(d, c, Object.assign({ w: "char" }, o));
const dt = (d, c, o) => L.shape(d, c, Object.assign({ w: "detail" }, o));
const ci = L.circ, rr = L.rrect, J = (a) => a.join("");
const cid = () => "cr" + (L._n = (L._n || 0) + 1);
const clip = (d, inner) => { const id = cid(); return `<clipPath id="${id}"><path d="${d}"/></clipPath><g clip-path="url(#${id})">${inner}</g>`; };
const hi = (cx, cy, rx, ry, op = 0.4) => L.flat(ci(cx, cy, rx, ry), "white", op);
const spark = (x, y, r, c = "gold") => L.flat(L.star(x, y, r, r * 0.3, 4), c);
const stk = (d, w, c = "ink") => L.stroke(d, { c, w });
const raw = (d, fill, sw, c = "ink") => L.tag("path", { d, fill: fill || "none", stroke: L.c(c), "stroke-width": sw, "stroke-linecap": "round", "stroke-linejoin": "round" });
const bez = (a, b, c, n = 9) => { const k = [2 * b[0] - (a[0] + c[0]) / 2, 2 * b[1] - (a[1] + c[1]) / 2]; return Array.from({ length: n }, (_, i) => { const t = i / (n - 1), u = 1 - t; return [u * u * a[0] + 2 * u * t * k[0] + t * t * c[0], u * u * a[1] + 2 * u * t * k[1] + t * t * c[1]]; }); };
const along = (pts, t) => { const i = Math.min(pts.length - 2, Math.floor(t * (pts.length - 1))), u = t * (pts.length - 1) - i; return [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * u, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * u]; };

// arms: pose -> [left, right] = [elbow dx, dy, hand dx, dy] in units of the arm length, from the shoulder
const ARMS = {
  stand: [[-0.2, 0.5, -0.3, 1], [0.2, 0.5, 0.3, 1]], sad: [[-0.1, 0.5, -0.12, 1], [0.1, 0.5, 0.12, 1]],
  wave: [[-0.2, 0.5, -0.3, 1], [0.65, 0.2, 0.6, -0.65]], cheer: [[-0.6, -0.1, -0.65, -0.9], [0.6, -0.1, 0.65, -0.9]],
  point: [[-0.2, 0.5, -0.3, 1], [0.55, 0.15, 1.15, -0.05]], shrug: [[-0.6, 0.25, -0.95, -0.15], [0.6, 0.25, 0.95, -0.15]],
  shocked: [[-0.65, 0.1, -0.45, -0.6], [0.65, 0.1, 0.45, -0.6]], hips: [[-0.7, 0.3, -0.3, 0.65], [0.7, 0.3, 0.3, 0.65]],
  cross: [[-0.45, 0.55, 0.5, 0.3], [0.45, 0.55, -0.5, 0.15]], hold: [[-0.5, 0.45, -0.15, 0.55], [0.75, 0.25, 0.95, -0.05]],
};
const armGeo = (pose, sl, sr, len) => { const A = ARMS[pose] || ARMS.stand; return [sl, sr].map((s, i) => { const a = A[i]; return [s, [s[0] + a[0] * len, s[1] + a[1] * len], [s[0] + a[2] * len, s[1] + a[3] * len]]; }); };
const tube = (p, w0, w1, fill, o) => sh(L.limb(bez(p[0], p[1], p[2]), w0, w1), fill, o);
// both arms as tubes with round hands; returns markup
const arms = (pose, sl, sr, len, w, fill, hand, hr) => armGeo(pose, sl, sr, len).map((p) => tube(p, w, w * 0.85, fill) + sh(ci(p[2][0], p[2][1], hr || w * 0.75), hand || fill, { w: "detail" })).join("");
const legs = (xs, top, bot, w, fill, shoe) => xs.map((x) => tube([[x, top], [x, (top + bot) / 2], [x, bot - 8]], w, w * 0.9, fill) + sh(L.circ(x + (x < 0 ? -6 : 6), bot - 6, w * 0.95, w * 0.5), shoe || "navy", { w: "detail" })).join("");

// faces for creatures: kind names shared with people (aliases below)
const KIND = { smile: "smile", happy: "happy", laugh: "happy", excited: "happy", delighted: "happy", shocked: "shocked", wow: "shocked", scared: "shocked", terrified: "shocked", nervous: "shocked",
  sad: "sad", cry: "sad", worried: "sad", sob: "sad", angry: "angry", furious: "angry", grumpy: "angry", annoyed: "angry", sleepy: "sleepy", tired: "sleepy", sleep: "sleepy", bored: "sleepy",
  smug: "smug", proud: "smug", mischief: "smug" };
const kd = (o, d) => KIND[o.face || d] || KIND[d] || "smile";
const goog = (cx, cy, r, look = 0, o = {}) => dt(ci(cx, cy, r), o.white || "white", { w: "detail" }) + (o.iris ? L.flat(ci(cx + look * r * 0.2, cy, r * 0.66), o.iris) : "") +
  L.flat(ci(cx + look * r * 0.32, cy + (o.dy || 0) * r, r * (o.p || 0.5)), "ink") + L.flat(ci(cx + look * r * 0.32 - r * 0.16, cy + (o.dy || 0) * r - r * 0.18, r * 0.15), "white");
const brow = (x, y, r, sd, k, bw) => {
  const ox = x + sd * r, ix = x - sd * r * 0.9;
  if (k === "sad") return stk(L.line([ox, y - r * 1.3], [ix, y - r * 1.95]), bw);
  if (k === "angry") return stk(L.line([ox, y - r * 1.95], [ix, y - r * 1.1]), bw);
  if (k === "shocked") return stk(L.arc(x, y - r * 1.5, r * 1.0, 215, 325), bw);
  if (k === "smug" && sd > 0) return stk(L.arc(x, y - r * 1.45, r * 1.0, 215, 325), bw);
  if (k === "smug") return stk(L.line([x - r, y - r * 1.2], [x + r, y - r * 1.1]), bw);
  return "";
};
const eyes = (k, cx, cy, gap, r, o = {}) => {
  const bw = o.bw || Math.max(3.2, r * 0.3);
  return [-1, 1].map((sd) => {
    const x = cx + sd * gap;
    if (k === "happy") return stk(L.arc(x, cy + r * 0.45, r * 0.95, 200, 340), bw);
    if (k === "sleepy") return stk(L.arc(x, cy - r * 0.25, r * 0.9, 20, 160), bw) + (o.lash ? "" : "");
    const wide = k === "shocked";
    return goog(x, cy, r * (wide ? 1.18 : 1), o.look !== undefined ? o.look : k === "smug" ? 0.7 : 0, { p: wide ? 0.28 : 0.5, dy: k === "sad" ? 0.3 : k === "angry" ? 0.15 : 0, iris: o.iris }) + brow(x, cy, r, sd, k, bw * 0.85);
  }).join("");
};
const mouth = (k, cx, cy, w, o = {}) => {
  const sw = o.sw || Math.max(3.4, w * 0.09), x0 = cx - w / 2, x1 = cx + w / 2, q = (a, b, c, d, e, f) => `M${f1(a)} ${f1(b)} Q${f1(c)} ${f1(d)} ${f1(e)} ${f1(f)}`;
  if (k === "happy") return raw(q(x0, cy - w * 0.1, cx, cy + w * 0.95, x1, cy - w * 0.1) + "Z", L.c("red", 2), sw) + L.flat(L.circ(cx, cy + w * 0.34, w * 0.2, w * 0.1), "pink");
  if (k === "shocked") return raw(L.circ(cx, cy + w * 0.12, w * 0.2, w * 0.3), L.c("red", 2), sw);
  if (k === "sad") return raw(q(x0, cy + w * 0.14, cx, cy - w * 0.42, x1, cy + w * 0.14), 0, sw);
  if (k === "angry") return raw(q(x0, cy + w * 0.06, cx, cy - w * 0.2, x1, cy + w * 0.06), 0, sw);
  if (k === "sleepy") return raw(L.circ(cx, cy + w * 0.05, w * 0.1, w * 0.12), L.c("red", 2), sw * 0.8);
  if (k === "smug") return raw(q(x0, cy + w * 0.08, cx - w * 0.1, cy + w * 0.3, x1, cy - w * 0.16), 0, sw);
  return raw(q(x0, cy, cx, cy + w * 0.55, x1, cy), 0, sw);
};
// eyes + mouth (+ blush) for a head/body of radius R centred at cx, cy
const face2 = (k, cx, cy, R, o = {}) => {
  const er = R * (o.er || 0.25), gap = R * (o.gap || 0.4), ey = cy - R * (o.ey !== undefined ? o.ey : 0.1);
  return eyes(k, cx, ey, gap, er, o) + mouth(k, cx, cy + R * (o.my || 0.4), R * (o.mw || 0.5), o) +
    (k === "happy" || k === "smile" ? L.flat(ci(cx - R * 0.66, cy + R * 0.3, R * 0.13, R * 0.08), "pink", 0.8) + L.flat(ci(cx + R * 0.66, cy + R * 0.3, R * 0.13, R * 0.08), "pink", 0.8) : "");
};
// glowing LED face for robots (on a dark screen)
const led = (k, cx, cy, w, c = "glass") => {
  const e = w * 0.22, r = w * 0.085, sw = Math.max(3, w * 0.05), P = (d) => L.stroke(d, { c, w: sw }), F = (d) => L.flat(d, c), ey = cy - w * 0.08, my = cy + w * 0.2, dots = F(ci(cx - e, ey, r)) + F(ci(cx + e, ey, r));
  if (k === "happy") return P(L.arc(cx - e, ey + r * 0.5, r * 1.3, 200, 340)) + P(L.arc(cx + e, ey + r * 0.5, r * 1.3, 200, 340)) + F(`M${f1(cx - w * 0.16)} ${f1(my - w * 0.06)} Q${f1(cx)} ${f1(my + w * 0.22)} ${f1(cx + w * 0.16)} ${f1(my - w * 0.06)} Z`);
  if (k === "sad") return dots + P(L.arc(cx, my + w * 0.16, w * 0.13, 215, 325)) + L.flat(ci(cx + e + r * 0.2, ey + r * 2.2, r * 0.55, r * 0.8), "sky");
  if (k === "angry") return dots + P(L.line([cx - e - r * 1.5, ey - r * 2.3], [cx - e + r * 1.3, ey - r * 1.3])) + P(L.line([cx + e + r * 1.5, ey - r * 2.3], [cx + e - r * 1.3, ey - r * 1.3])) + P(L.poly([[cx - w * 0.15, my + 2], [cx - w * 0.05, my - 4], [cx + w * 0.05, my + 2], [cx + w * 0.15, my - 4]]));
  if (k === "shocked") return P(ci(cx - e, ey, r * 1.5)) + P(ci(cx + e, ey, r * 1.5)) + P(ci(cx, my + w * 0.04, w * 0.07, w * 0.1));
  if (k === "sleepy") return P(L.line([cx - e - r, ey], [cx - e + r, ey])) + P(L.line([cx + e - r, ey], [cx + e + r, ey])) + P(L.line([cx - w * 0.07, my], [cx + w * 0.07, my])) + L.text("z", cx + w * 0.4, ey - r, { size: w * 0.18, c });
  if (k === "smug") return dots + P(L.line([cx - e - r * 1.3, ey - r * 1.8], [cx - e + r * 1.3, ey - r * 1.6])) + P(`M${f1(cx - w * 0.14)} ${f1(my)} Q${f1(cx)} ${f1(my + w * 0.1)} ${f1(cx + w * 0.16)} ${f1(my - w * 0.08)}`);
  return dots + P(L.arc(cx, my - w * 0.1, w * 0.15, 28, 152));
};
const fur = (cx, cy, rx, ry, n, amp, sharp) => { const p = []; for (let i = 0; i < n * 2; i++) { const a = (i / (n * 2)) * PI * 2, k = i % 2 ? 1 : 1 + amp; p.push([cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k]); } p.push(p[0]); return sharp ? L.poly(p, true) : L.smooth(p); };
const zig = (x0, x1, y, n, amp, bottom) => { const p = [], d = (x1 - x0) / n; for (let i = 0; i <= n; i++) p.push([x0 + i * d, y + (i % 2 ? amp : 0)]); return p; };
const skinOf = (o) => (L.T.head.fill === "white" ? "white" : o.skin || "s2");
// a person drawn by the library, plus its anchors (hands, head) for props
const person = (o) => L.inline("person", o);
const ANC = (o) => L.anchors(o);

// ---------- robots ----------
const claw = (p, r, fill = "gray") => {
  const a = (Math.atan2(p[2][1] - p[1][1], p[2][0] - p[1][0]) * 180) / PI, jaw = (m) => sh(`M${f1(r * 0.3)} ${f1(m * r * 0.7)} Q${f1(r * 1.8)} ${f1(m * r * 1.4)} ${f1(r * 2.1)} ${f1(m * r * 0.15)} Q${f1(r * 1.4)} ${f1(m * r * 0.6)} ${f1(r * 0.3)} ${f1(m * r * 0.1)} Z`, fill, { w: "detail" });
  return L.g(jaw(-1) + jaw(1) + sh(ci(0, 0, r), fill, { w: "detail" }), `translate(${f1(p[2][0])} ${f1(p[2][1])}) rotate(${f1(a)})`);
};
// tin-toy pincer hand: cuff ring, hinge, two curved jaws
const tinClaw = (p) => {
  const a = (Math.atan2(p[2][1] - p[1][1], p[2][0] - p[1][0]) * 180) / PI, jaw = (m) => sh(L.limb([[6, m * 7], [20, m * 15], [36, m * 8]], 14, 7), "gold", { w: "detail" }) + L.flat(L.limb([[10, m * 9], [20, m * 14]], 3, 2), "white", 0.5);
  return L.g(jaw(-1) + jaw(1) + sh(rr(-6, -13, 12, 26, 5), "stone", { w: "detail" }) + sh(ci(8, 0, 11), "gold", { w: "detail" }) + L.flat(ci(8, 0, 3.4), "ink", 0.8), `translate(${f1(p[2][0])} ${f1(p[2][1])}) rotate(${f1(a)})`);
};
const G1 = "Robots";
reg("crt-robot-helper", { box: [-140, -310, 280, 330], g: G1, l: "Helper robot (small, treads)", tags: ["robot", "bot", "android", "machine", "helper", "friendly", "cute"], opt: 'face: "smile|happy|sad|angry|shocked|sleepy", pose: "wave", color: "teal"', demo: { pose: "wave" } }, (o) => {
  const c = o.color || "teal", k = kd(o, "smile"), A = armGeo(o.pose, [-56, -104], [56, -104], 74);
  return J([L.shadow(0, 0, 170), stk("M0 -234 L0 -266", "char"), sh(ci(0, -273, 11), "red", { w: "detail" }), sh(ci(-66, -186, 11), "gray", { w: "detail" }), sh(ci(66, -186, 11), "gray", { w: "detail" }),
    sh(rr(-72, -46, 144, 46, 23), "navy"), [-42, 0, 42].map((x) => sh(ci(x, -23, 15), "gray", { w: "detail" }) + L.flat(ci(x, -23, 5), "ink")).join(""),
    sh(rr(-54, -134, 108, 96, 28), c), dt(rr(-30, -116, 60, 40, 12), "cream"), L.flat(ci(-14, -96, 7), "red"), L.flat(ci(10, -96, 7), "yellow"),
    sh(rr(-62, -238, 124, 104, 40), c), hi(-34, -222, 24, 7, 0.5), sh(rr(-48, -224, 96, 72, 30), "navy"), led(k, 0, -188, 88),
    A.map((p) => tube(p, 20, 16, "gray") + sh(ci(p[0][0], p[0][1], 13), "gray", { w: "detail" }) + claw(p, 11)).join("")]);
});
reg("crt-robot-industrial", { box: [-260, -490, 520, 510], g: G1, l: "Big industrial robot", tags: ["robot", "factory", "heavy", "machine", "big", "worker", "automation"], opt: 'face, pose, color: "orange"', demo: { pose: "cheer" } }, (o) => {
  const c = o.color || "orange", k = kd(o, "smile"), A = armGeo(o.pose, [-112, -300], [112, -300], 126);
  let stripes = L.flat(L.rect(-100, -214, 200, 40), "yellow");
  for (let i = 0; i < 9; i++) stripes += L.flat(L.poly([[-120 + i * 44, -174], [-98 + i * 44, -174], [-78 + i * 44, -214], [-100 + i * 44, -214]], true), "ink", 0.85);
  return J([L.shadow(0, 0, 250), sh(rr(-114, -34, 90, 34, 14), "navy"), sh(rr(24, -34, 90, 34, 14), "navy"), sh(rr(-94, -122, 48, 92, 12), "stone"), sh(rr(46, -122, 48, 92, 12), "stone"),
    sh(rr(-104, -164, 208, 58, 20), "gray"), sh(rr(-100, -344, 200, 190, 36), c), clip(rr(-100, -214, 200, 40, 0), stripes), L.stroke(L.rect(-100, -214, 200, 40), { w: "detail" }),
    sh(ci(0, -285, 38), "cream"), L.stroke("M0 -285 L16 -302", { w: "char" }), L.flat(ci(0, -285, 5), "ink"), stk("M-24 -268 L24 -268", 3), stk("M-70 -320 H-50 M-70 -306 H-50 M50 -320 H70 M50 -306 H70", 4),
    sh(rr(-20, -352, 40, 16, 4), "stone"), sh(rr(-56, -420, 112, 78, 26), "gray", { tone: 1 }), sh(rr(-44, -406, 88, 48, 20), "navy"), led(k, 0, -381, 84, "yellow"), hi(-34, -412, 20, 6, 0.5),
    A.map((p) => tube(p, 46, 40, c) + sh(ci(p[0][0], p[0][1], 40), "stone") + dt(ci(p[0][0], p[0][1], 9), "gray") + claw(p, 20)).join("")]);
});
reg("crt-robot-tin", { box: [-220, -370, 440, 390], g: G1, l: "Retro tin robot", tags: ["robot", "retro", "vintage", "tin toy", "clockwork", "old", "toy"], opt: 'face: "smile|happy|sad|angry|shocked|…", pose', demo: { pose: "point" } }, (o) => {
  const c = o.color || "gray", A = armGeo(o.pose, [-76, -170], [76, -170], 84), zz = (x, y0, y1) => L.poly([[x, y0], [x - 10, y0 + 10], [x + 10, y0 + 20], [x - 10, y0 + 30], [x + 10, y0 + 40], [x, y1]]);
  return J([L.shadow(0, 0, 190), stk("M72 -150 H106", 6), sh(L.smooth([[104, -150], [120, -184], [150, -178], [146, -150], [150, -122], [120, -116], [104, -150]]), "gold", { w: "detail" }),
    stk(zz(-34, -82, -30), 6), stk(zz(34, -82, -30), 6), sh(rr(-62, -30, 56, 30, 12), "navy"), sh(rr(6, -30, 56, 30, 12), "navy"),
    sh(rr(-74, -198, 148, 120, 16), c, { tone: 1 }), [[-62, -186], [62, -186], [-62, -90], [62, -90]].map(([x, y]) => dt(ci(x, y, 4.5), "stone")).join(""),
    dt(rr(-48, -178, 96, 54, 8), "navy"), sh(ci(-24, -152, 13), "red", { w: "detail" }), L.stroke("M-24 -152 L-16 -162", { w: "detail" }), sh(ci(24, -152, 13), "yellow", { w: "detail" }), L.stroke("M24 -152 L30 -142", { w: "detail" }),
    stk("M-40 -106 H40 M-40 -96 H40", 4, "stone"), sh(rr(-16, -214, 32, 20, 4), "stone"), stk(zz(0, -312, -344), 5), sh(ci(0, -350, 9), "red", { w: "detail" }),
    sh(rr(-82, -280, 18, 44, 6), "gold", { w: "detail" }), sh(rr(64, -280, 18, 44, 6), "gold", { w: "detail" }), sh(rr(-64, -314, 128, 102, 20), c, { tone: 1 }), L.face(0, -262, 50, o.face || "smile", { eyes: "v3" }),
    A.map((p) => tube(p, 17, 15, "stone") + sh(ci(p[0][0], p[0][1], 12), "gold", { w: "detail" }) + tinClaw(p)).join("")]);
});
reg("crt-robot-assistant", { box: [-170, -370, 340, 390], g: G1, l: "AI assistant robot (screen face)", tags: ["robot", "ai", "assistant", "chatbot", "screen face", "hover", "smart speaker", "digital"], opt: 'face: "smile|happy|sad|angry|shocked|sleepy|smug", pose, color, accent', demo: { face: "happy", pose: "wave" } }, (o) => {
  const c = o.color || "white", ac = o.accent || "teal", k = kd(o, "happy"), A = armGeo(o.pose, [-78, -150], [78, -150], 92);
  return J([L.shadow(0, 0, 100), L.flat(ci(0, -20, 54, 13), ac, 0.5), L.flat(ci(0, -20, 32, 7), "white", 0.8),
    sh(ci(0, -168, 82, 118), c), clip(ci(0, -168, 82, 118), L.flat(L.rect(-90, -100, 180, 26), ac)), hi(-52, -150, 12, 34, 0.55),
    sh(rr(-62, -262, 124, 98, 42), "navy"), led(k, 0, -214, 104), sh(ci(0, -118, 13), ac, { w: "detail" }), hi(-4, -122, 4, 4, 0.8),
    A.map((p) => { const h = p[2]; return stk(L.line(p[0], h), 6, "gray") + sh(ci(h[0], h[1], 22), c) + stk(L.arc(h[0], h[1], 22, 200, 340), 4, ac) + hi(h[0] - 7, h[1] - 8, 6, 4, 0.7); }).join("")]);
});
reg("crt-robot-scientist", { box: [-200, -400, 420, 420], g: G1, l: "Scientist robot (lab coat, flask)", tags: ["robot", "scientist", "lab coat", "science", "chemistry", "experiment", "goggles"], opt: 'face, pose: "hold"', demo: { face: "happy" } }, (o) => {
  const k = kd(o, "happy"), A = armGeo(o.pose || "hold", [-64, -236], [64, -236], 98), h = A[1][2];
  const flask = L.g(J([sh(L.poly([[-10, -74], [10, -74], [10, -44], [36, -6], [36, 10], [-36, 10], [-36, -6], [-10, -44]], true), "glass", { w: "detail" }), L.flat(L.poly([[-30, -4], [30, -4], [34, 8], [-34, 8]], true), "green", 0.9),
    L.flat(L.poly([[-30, -4], [30, -4], [20, -22], [-20, -22]], true), "green", 0.9), L.flat(ci(-8, -12, 5), "white", 0.8), L.flat(ci(10, -26, 4), "white", 0.8), L.flat(ci(2, -50, 3.5), "green", 0.8)]), `translate(${f1(h[0] + 4)} ${f1(h[1] - 8)})`);
  return J([L.shadow(0, 0, 180), legs([-26, 26], -120, 0, 20, "gray", "navy"), sh(L.poly([[-66, -250], [66, -250], [82, -90], [-82, -90]], true), "white"), L.flat(L.poly([[-15, -250], [15, -250], [0, -188]], true), "blue"),
    dt(L.poly([[-15, -250], [0, -188], [-34, -250]], true), "white"), dt(L.poly([[15, -250], [0, -188], [34, -250]], true), "white"), L.flat(ci(0, -168, 4), "ink"), L.flat(ci(0, -134, 4), "ink"),
    dt(rr(-58, -176, 34, 32, 5), "white"), stk("M-50 -176 V-190 M-40 -176 V-186", 4, "red"), stk("M-30 -176 V-192", 4, "blue"),
    sh(rr(-16, -262, 32, 18, 4), "stone"), sh(rr(-58, -350, 116, 96, 26), "gray", { tone: 1 }), sh(rr(-44, -314, 88, 50, 18), "navy"), led(k, 0, -290, 84),
    sh(ci(-26, -334, 19), "glass", { w: "detail" }), sh(ci(26, -334, 19), "glass", { w: "detail" }), stk("M-7 -334 H7", 5, "navy"), L.flat(ci(-26, -334, 9), "teal", 0.55), L.flat(ci(26, -334, 9), "teal", 0.55),
    stk("M0 -350 V-368", 5), sh(ci(0, -376, 11), "yellow", { w: "detail" }),
    A.map((p, i) => tube(p, 22, 18, "white") + (i ? "" : sh(ci(p[2][0], p[2][1], 12), "gray", { w: "detail" }))).join(""), flask, sh(ci(h[0] + 2, h[1] + 2, 13), "gray", { w: "detail" })]);
});

// ---------- aliens ----------
const G2 = "Aliens";
reg("crt-alien-green", { box: [-140, -380, 280, 400], g: G2, l: "Little green alien", tags: ["alien", "martian", "extraterrestrial", "space", "green", "antenna", "cute", "visitor"], opt: 'face: "smile|happy|shocked|sad|angry", pose, color: "green", suit: "blue"', demo: { pose: "wave" } }, (o) => {
  const c = o.color || "green", su = o.suit || "blue", k = kd(o, "happy");
  const ant = [-1, 1].map((sd) => stk(L.smooth([[sd * 28, -292], [sd * 46, -326], [sd * 40, -352]]), "char") + sh(ci(sd * 40, -359, 12), "yellow", { w: "detail" })).join("");
  const ear = [-1, 1].map((sd) => sh(L.poly([[sd * 66, -236], [sd * 112, -268], [sd * 98, -210]], true), c)).join("");
  return J([L.shadow(0, 0, 140), ant, ear, legs([-20, 20], -76, 0, 16, c, "navy"), sh(L.smooth([[-34, -152], [34, -152], [48, -104], [38, -62], [-38, -62], [-48, -104], [-34, -152]]), su),
    L.flat(L.star(0, -108, 13, 6, 5), "yellow"), arms(o.pose, [-42, -134], [42, -134], 70, 15, c), sh(ci(0, -226, 76, 82), c), hi(-30, -266, 26, 10, 0.4), face2(k, 0, -220, 66, { er: 0.27, gap: 0.42, mw: 0.5 })]);
});
reg("crt-alien-grey", { box: [-130, -480, 260, 500], g: G2, l: "Tall grey alien (cute)", tags: ["alien", "grey", "tall", "big eyes", "extraterrestrial", "space", "friendly", "visitor"], opt: 'face: "smile|happy|shocked|sad|angry|sleepy", pose, suit: "blue"', demo: { face: "happy" } }, (o) => {
  const su = o.suit || "blue", k = kd(o, "smile"), c = o.color || "gray", rot = k === "angry" ? 14 : k === "sad" ? -12 : 0, sc = k === "shocked" ? 1.22 : 1;
  const eye = (sd) => L.g(J([sh(L.smooth([[sd * 10, -370], [sd * 30, -390], [sd * 58, -398], [sd * 52, -366], [sd * 30, -348], [sd * 10, -370]]), "navy", { w: "detail", tone: 2 }), L.flat(ci(sd * 34, -378, 7), "white"), L.flat(ci(sd * 24, -364, 3.4), "white")]), `rotate(${f1(sd * rot)} ${f1(sd * 34)} -372) translate(${f1(sd * 34 * (1 - sc))} ${f1(-372 * (1 - sc))}) scale(${sc})`);
  const lid = k === "sleepy" ? [-1, 1].map((sd) => L.flat(L.poly([[sd * 8, -400], [sd * 62, -400], [sd * 60, -378], [sd * 8, -376]], true), c, 1)).join("") : "";
  return J([L.shadow(0, 0, 130), legs([-16, 16], -150, 0, 12, c, "navy"), sh(L.smooth([[-30, -304], [30, -304], [42, -220], [32, -146], [-32, -146], [-42, -220], [-30, -304]]), su), L.flat(ci(0, -200, 6), "yellow"),
    arms(o.pose, [-36, -290], [36, -290], 112, 10, c), sh(rr(-9, -326, 18, 30, 6), c, { tone: 1 }), sh(L.smooth([[0, -466], [46, -456], [68, -418], [60, -372], [34, -330], [0, -318], [-34, -330], [-60, -372], [-68, -418], [-46, -456], [0, -466]]), c, { tone: 1 }),
    hi(-30, -440, 16, 7, 0.45), eye(-1), eye(1), lid, mouth(k, 0, -334, 24), k === "happy" || k === "smile" ? L.flat(ci(-44, -340, 8, 5), "pink", 0.7) + L.flat(ci(44, -340, 8, 5), "pink", 0.7) : ""]);
});
reg("crt-alien-blob", { box: [-170, -290, 340, 310], g: G2, l: "Jelly blob alien (eye stalks)", tags: ["alien", "blob", "slime", "jelly", "gooey", "space", "eye stalks", "creature"], opt: 'face: "smile|happy|shocked|sad|angry", color: "teal"', demo: { face: "happy" } }, (o) => {
  const c = o.color || "teal", k = kd(o, "happy"), body = L.smooth([[-122, 0], [-128, -62], [-92, -142], [-30, -186], [40, -182], [100, -132], [128, -60], [122, 0], [76, -9], [34, 5], [-30, -8], [-78, 5], [-122, 0]]);
  const stalk = (sd) => stk(L.smooth([[sd * 36, -176], [sd * 46, -222], [sd * 58, -250]]), 9, c) + goog(sd * 60, -262, 26, sd * -0.2, { p: k === "shocked" ? 0.28 : 0.5 });
  return J([L.shadow(0, 0, 270), stk("M-36 -176 Q-46 -222 -58 -250 M36 -176 Q46 -222 58 -250", 13, "ink"), stalk(-1), stalk(1), sh(body, c), hi(-70, -128, 26, 14, 0.5), [[-70, -60, 14], [64, -80, 10], [40, -40, 7], [-30, -110, 8]].map(([x, y, r]) => L.flat(ci(x, y, r), "white", 0.35)).join(""),
    mouth(k, 0, -82, 60), (k === "happy" || k === "smile") ? L.flat(ci(-52, -92, 12, 7), "pink", 0.7) + L.flat(ci(52, -92, 12, 7), "pink", 0.7) : ""]);
});
reg("crt-alien-purple", { box: [-200, -330, 400, 350], g: G2, l: "Three-eyed purple alien", tags: ["alien", "three eyes", "purple", "round", "space", "cute", "creature"], opt: 'face: "smile|happy|shocked|sad|angry", pose', demo: { pose: "cheer", face: "happy" } }, (o) => {
  const c = o.color || "purple", k = kd(o, "smile"), wide = k === "shocked";
  const ey = [[-48, -178], [0, -196], [48, -178]].map(([x, y]) => goog(x, y, wide ? 26 : 23, 0, { p: wide ? 0.28 : 0.5, dy: k === "sad" ? 0.3 : 0 })).join("");
  const br = k === "angry" ? stk("M-72 -222 L-26 -200 M72 -222 L26 -200 M-16 -234 L16 -234", 5) : k === "sad" ? stk("M-72 -202 L-26 -224 M72 -202 L26 -224", 5) : "";
  return J([L.shadow(0, 0, 200), legs([-34, 34], -60, 0, 24, c, "navy"), sh(L.poly([[-30, -258], [-40, -296], [-14, -270]], true), "yellow", { w: "detail" }), sh(L.poly([[30, -258], [40, -296], [14, -270]], true), "yellow", { w: "detail" }),
    arms(o.pose, [-86, -120], [86, -120], 76, 22, c, c), sh(ci(0, -150, 100, 110), c), dt(ci(0, -100, 56, 40), "pink", { tone: 1 }), hi(-52, -214, 24, 12, 0.35), ey, br, mouth(k, 0, -138, 66), k === "happy" ? L.flat(ci(-78, -146, 11, 7), "pink", 0.8) + L.flat(ci(78, -146, 11, 7), "pink", 0.8) : ""]);
});
reg("crt-alien-ufo-pilot", { box: [-190, -230, 380, 270], g: G2, l: "Alien in a flying saucer", tags: ["alien", "ufo", "flying saucer", "spaceship", "space", "pilot", "visitor", "hover"], opt: 'face: "smile|happy|shocked|sad|angry"', at: "y", demo: { face: "happy" } }, (o) => {
  const k = kd(o, "happy"), c = o.color || "green";
  const lights = [-100, -50, 0, 50, 100].map((x, i) => sh(ci(x, 6 + Math.abs(x) * 0.02, 10), i % 2 ? "yellow" : "orange", { w: "detail" })).join("");
  return J([stk("M-34 -146 Q-44 -178 -34 -200 M34 -146 Q44 -178 34 -200", 5), sh(ci(-34, -204, 9), "yellow", { w: "detail" }), sh(ci(34, -204, 9), "yellow", { w: "detail" }),
    sh(ci(0, -76, 56, 60), c), face2(k, 0, -72, 48, { er: 0.28 }), L.flat(L.smooth([[-92, -10], [-76, -118], [-34, -158], [34, -158], [76, -118], [92, -10], [-92, -10]]), "glass", 0.4),
    stk("M-92 -10 C-92 -80 -60 -150 0 -158 C60 -150 92 -80 92 -10", 4, "ink"), hi(-52, -112, 12, 24, 0.7),
    sh(L.circ(0, 0, 170, 36), "gray", { tone: 1 }), clip(L.circ(0, 0, 170, 36), L.flat(L.rect(-170, 8, 340, 40), "stone", 0.55)), lights, sh(L.circ(0, 24, 54, 14), "gray"), hi(-80, -8, 40, 7, 0.55)]);
});

// ---------- monsters ----------
const G3 = "Monsters";
const paw = (x, y, r, c) => sh(ci(x, y, r), c, { w: "detail" }) + [-1, 0, 1].map((i) => sh(ci(x + i * r * 0.62, y - r * 0.9, r * 0.36), c, { w: "detail" })).join("");
reg("crt-monster-furry", { box: [-190, -430, 380, 450], g: G3, l: "Cuddly furry monster", tags: ["monster", "furry", "fluffy", "closet monster", "cuddly", "purple", "friendly", "horns"], opt: 'face: "smile|happy|shocked|sad|angry|sleepy", pose, color: "purple"', demo: { pose: "wave" } }, (o) => {
  const c = o.color || "purple", k = kd(o, "happy"), A = armGeo(o.pose, [-96, -200], [96, -200], 104);
  const horns = [-1, 1].map((sd) => sh(L.poly([[sd * 62, -326], [sd * 92, -392], [sd * 26, -338]], true), "cream", { w: "detail" })).join("");
  return J([L.shadow(0, 0, 240), horns, sh(fur(0, -190, 118, 150, 14, 0.06), c), dt(ci(0, -130, 70, 78), c, { tone: 1 }), [[-70, -240, 12], [80, -170, 10], [-84, -120, 9]].map(([x, y, r]) => L.flat(ci(x, y, r), "ink", 0.12)).join(""),
    [-1, 1].map((sd) => sh(ci(sd * 50, -24, 46, 26), c) + stk(L.arc(sd * 50, -22, 30, 200, 340), 3)).join(""),
    A.map((p) => tube(p, 40, 34, c) + paw(p[2][0], p[2][1], 22, c)).join(""), hi(-60, -290, 30, 12, 0.3),
    eyes(k, 0, -250, 44, 27), mouth(k, 0, -206, 92), k === "happy" ? J([-1, 1].map((sd) => dt(rr(sd * 22 - 8, -222, 16, 16, 3), "white"))) : ""]);
});
reg("crt-monster-closet", { box: [-230, -470, 460, 490], g: G3, l: "Closet monster peeking (wardrobe)", tags: ["monster", "closet", "wardrobe", "bedtime", "night", "peeking", "kids", "friendly"], opt: 'face: "smile|happy|shocked|sad|sleepy", color: "purple"', demo: { face: "smile" } }, (o) => {
  const c = o.color || "purple", k = kd(o, "smile");
  const door = (sd) => sh(L.poly([[sd * 150, -432], [sd * 214, -456], [sd * 214, -26], [sd * 150, -8]], true), "wood", { tone: 1 }) + dt(L.poly([[sd * 164, -396], [sd * 198, -408], [sd * 198, -66], [sd * 164, -52]], true), "wood") + sh(ci(sd * 188, -230, 7), "gold", { w: "detail" });
  const inside = J([L.flat(rr(-124, -414, 248, 400, 6), "navy"), clip(rr(-124, -414, 248, 400, 6), sh(fur(0, -170, 106, 124, 12, 0.07), c)), L.flat(rr(-124, -414, 248, 100, 0), "ink", 0.35)]);
  return J([L.shadow(0, 0, 330), door(-1), door(1), sh(rr(-150, -442, 300, 442, 16), "wood"), inside, clip(rr(-124, -414, 248, 400, 6), J([eyes(k, 0, -196, 38, 24), mouth(k, 0, -150, 80), hi(-46, -262, 22, 9, 0.3)])),
    paw(-128, -252, 20, c), paw(128, -252, 20, c), sh(rr(-124, -10, 248, 10, 0), "wood", { w: "detail" })]);
});
reg("crt-monster-underbed", { box: [-270, -230, 540, 250], g: G3, l: "Under-the-bed monster", tags: ["monster", "under the bed", "bedtime", "night", "kids", "peeking", "friendly", "bed"], opt: 'face: "smile|happy|shocked|sad|sleepy", color: "purple"', demo: { face: "happy" } }, (o) => {
  const c = o.color || "purple", k = kd(o, "smile");
  const head = clip(rr(-216, -74, 432, 74, 0), sh(fur(0, -26, 74, 54, 10, 0.07), c) + eyes(k, 0, -38, 32, 16) + mouth(k, 0, -10, 50));
  return J([L.shadow(0, 0, 500), sh(rr(-234, -78, 20, 78, 6), "wood"), sh(rr(214, -78, 20, 78, 6), "wood"), L.flat(rr(-216, -74, 432, 74, 0), "navy", 0.92), head, paw(-92, -8, 16, c), paw(96, -8, 16, c),
    sh(rr(-250, -116, 500, 44, 12), "wood"), sh(rr(-260, -176, 520, 66, 26), "cream"), sh(rr(-260, -206, 380, 96, 30), "blue"), stk("M-150 -196 Q-100 -176 -50 -196 T50 -196", 4, "white"), sh(rr(136, -210, 112, 54, 24), "white"), hi(-190, -190, 40, 6, 0.45)]);
});
reg("crt-monster-sea", { box: [-350, -400, 700, 420], g: G3, l: "Sea monster (friendly serpent)", tags: ["monster", "sea", "serpent", "loch", "ocean", "water", "dragon", "nessie-like", "big"], opt: 'face: "smile|happy|shocked|sad|angry|sleepy", color: "green"', demo: { face: "happy" } }, (o) => {
  const c = o.color || "green", k = kd(o, "happy"), hump = (x0, x1, h) => sh(`M${x0} -10 C${x0} ${-h * 1.35} ${x1} ${-h * 1.35} ${x1} -10 Z`, c);
  const wave = (y, a, ph, col, op) => sh(`M-350 ${y} ` + Array.from({ length: 15 }, (_, i) => `L${-350 + i * 50} ${f1(y + Math.sin(i * 1.3 + ph) * a)}`).join(" ") + ` L350 0 L-350 0 Z`, col, { w: "detail", op });
  return J([L.shadow(0, 0, 600), hump(-300, -200, 64), hump(-190, -70, 96), sh(L.limb([[10, -10], [74, -66], [112, -160], [172, -250]], 96, 60), c),
    sh(L.poly([[150, -300], [168, -352], [196, -312]], true), "orange", { w: "detail" }), sh(L.poly([[190, -308], [214, -352], [232, -302]], true), "orange", { w: "detail" }), sh(L.circ(196, -268, 72, 52), c), hi(160, -296, 24, 9, 0.4), dt(ci(246, -266, 6), "ink"),
    face2(k, 192, -264, 50, { er: 0.27 }), wave(-34, 8, 0, "water", 0.95), wave(-18, 7, 2, "water", 0.95), [[-250, -62, 8], [120, -32, 6], [-120, -28, 5]].map(([x, y, r]) => L.flat(ci(x, y, r), "white", 0.6)).join("")]);
});
reg("crt-monster-yeti", { box: [-240, -430, 480, 450], g: G3, l: "Snow yeti", tags: ["monster", "yeti", "snow", "abominable", "bigfoot", "winter", "mountain", "fluffy", "cold"], opt: 'face: "smile|happy|shocked|sad|angry|sleepy", pose', demo: { face: "happy", pose: "wave" } }, (o) => {
  const k = kd(o, "happy"), A = armGeo(o.pose, [-112, -200], [112, -200], 104);
  return J([L.shadow(0, 0, 250), [-1, 1].map((sd) => sh(fur(sd * 62, -28, 66, 30, 8, 0.1, true), "snow") + stk(L.arc(sd * 62, -26, 40, 200, 340), 3)).join(""), sh(fur(0, -160, 126, 128, 15, 0.1, true), "snow"),
    A.map((p) => tube(p, 58, 50, "snow") + sh(fur(p[2][0], p[2][1], 34, 32, 7, 0.14, true), "snow", { w: "detail" })).join(""),
    sh(fur(0, -266, 106, 92, 13, 0.1, true), "snow"), sh(ci(0, -258, 70, 60), "sky", { w: "detail", tone: 1 }), sh(rr(-84, -194, 168, 34, 17), "red"), sh(rr(46, -188, 34, 70, 14), "red"), stk("M54 -150 H72 M54 -138 H72", 3, "ink"),
    eyes(k, 0, -270, 28, 18), mouth(k, 0, -232, 56), dt(ci(0, -246, 8, 6), "ink"), hi(-60, -310, 30, 10, 0.5)]);
});
reg("crt-monster-fuzzy", { box: [-150, -270, 300, 290], g: G3, l: "One-eyed fuzzball monster", tags: ["monster", "fuzzy", "one eye", "cyclops", "furry", "orange", "cute", "round"], opt: 'face: "smile|happy|shocked|sad|angry|sleepy", color: "orange"', demo: { face: "smile" } }, (o) => {
  const c = o.color || "orange", k = kd(o, "smile"), wide = k === "shocked";
  const eye = k === "happy" ? stk(L.arc(0, -134, 34, 200, 340), 7) : k === "sleepy" ? stk(L.arc(0, -150, 34, 20, 160), 7) : goog(0, -150, wide ? 50 : 44, 0, { p: wide ? 0.25 : 0.46, dy: k === "sad" ? 0.3 : 0 }) + (k === "angry" ? stk("M-52 -214 L36 -190", 7) : k === "sad" ? stk("M-54 -190 L30 -214", 7) : "");
  return J([L.shadow(0, 0, 210), legs([-34, 34], -40, 0, 20, c, "navy"), sh(L.poly([[-62, -224], [-84, -270], [-30, -236]], true), "cream", { w: "detail" }), sh(L.poly([[62, -224], [84, -270], [30, -236]], true), "cream", { w: "detail" }),
    armGeo(o.pose || "stand", [-96, -110], [96, -110], 50).map((p) => tube(p, 22, 18, c)).join(""), sh(fur(0, -130, 100, 98, 18, 0.1), c), hi(-54, -190, 26, 12, 0.3), eye, mouth(k, 0, -82, 90, { sw: 5 }), k === "happy" ? J([-1, 1].map((sd) => dt(rr(sd * 20 - 7, -96, 14, 14, 3), "white"))) : ""]);
});

// ---------- ghosts ----------
const G4 = "Ghosts";
reg("crt-ghost", { box: [-190, -400, 380, 420], g: G4, l: "Friendly ghost (floating)", tags: ["ghost", "spooky", "halloween", "friendly", "boo", "floating", "sheet", "cute"], opt: 'face: "smile|happy|shocked|sad|sleepy", pose: "wave"', demo: { face: "happy", pose: "wave" } }, (o) => {
  const k = kd(o, "happy"), A = armGeo(o.pose, [-96, -230], [96, -230], 80);
  const d = L.smooth([[-100, -104], [-68, -88], [-36, -106], [0, -86], [36, -106], [68, -88], [100, -104], [104, -180], ...L.arcPts(0, -262, 102, 0, -180, 14).slice(0, 15), [-104, -180], [-100, -104]]);
  return J([L.flat(ci(0, -240, 160, 180), "glass", 0.28), L.shadow(0, 0, 130), A.map((p) => tube(p, 34, 26, "white")).join(""), sh(d, "white"), clip(d, L.flat(L.rect(-110, -130, 220, 60), "sky", 0.25)), hi(-56, -310, 26, 11, 0.7),
    face2(k, 0, -246, 70, { er: 0.22, gap: 0.36, mw: 0.42 })]);
});
reg("crt-ghost-sheet-kid", { box: [-170, -320, 340, 340], g: G4, l: "Kid in a bedsheet ghost costume", tags: ["ghost", "costume", "halloween", "sheet", "kid", "trick or treat", "disguise", "funny"], opt: 'face: "smile|happy|shocked|sad|angry" (eye holes), pumpkin: true', demo: {} }, (o) => {
  const k = kd(o, "smile"), d = L.smooth([[-110, -70], [-76, -58], [-40, -72], [0, -56], [40, -72], [76, -58], [110, -70], [90, -160], ...L.arcPts(0, -236, 84, 0, -180, 12).slice(0, 13), [-90, -160], [-110, -70]]);
  const hole = (sd) => L.g(L.flat(ci(0, 0, k === "shocked" ? 17 : 13, k === "shocked" ? 22 : 18), "ink"), `translate(${sd * 32} -230) rotate(${k === "angry" ? sd * 22 : k === "sad" ? -sd * 18 : 0})`);
  const bucket = o.pumpkin === false ? "" : J([tube([[84, -150], [112, -126], [118, -96]], 16, 14, "white"), sh(ci(122, -64, 34, 30), "orange"), sh(L.poly([[116, -92], [122, -104], [130, -92]], true), "green", { w: "detail" }), L.flat(L.poly([[108, -70], [116, -82], [124, -70]], true), "ink"), L.flat(L.poly([[126, -70], [134, -82], [142, -70]], true), "ink"), L.flat(L.arc(125, -52, 14, 20, 160), "ink")]);
  return J([L.shadow(0, 0, 150), legs([-26, 26], -70, 0, 14, "white", "red"), sh(d, "white"), hi(-46, -270, 20, 8, 0.7), hole(-1), hole(1), k === "happy" || k === "smile" ? stk(L.arc(0, -206, 20, 30, 150), 4) : "", bucket]);
});

// ---------- dragons ----------
const G5 = "Dragons";
const flame = (x, y, s, rot) => L.g(sh("M0 0 C34 -12 62 -38 52 -78 C84 -56 104 -22 92 8 C80 36 40 26 0 0 Z", "orange", { w: "detail" }) + L.flat("M10 0 C34 -8 46 -26 44 -46 C62 -28 68 -8 60 6 C50 20 30 14 10 0 Z", "yellow"), `translate(${x} ${y}) rotate(${rot || 0}) scale(${s || 1})`);
const dragonBaby = (o, fire) => {
  const c = o.color || "green", k = kd(o, fire ? "shocked" : "happy"), wing = (sd) => sh(L.smooth([[sd * 56, -170], [sd * 124, -246], [sd * 138, -192], [sd * 116, -176], [sd * 122, -130], [sd * 80, -124], [sd * 56, -170]]), "orange", { w: "char" });
  return J([L.shadow(0, 0, 220), sh(L.limb([[50, -44], [130, -26], [178, -76], [160, -134]], 46, 10), c), sh(L.poly([[150, -126], [142, -160], [178, -140]], true), "red", { w: "detail" }), wing(-1), wing(1),
    sh(ci(0, -94, 80, 90), c), dt(ci(0, -80, 50, 62), "cream"), [0, 1, 2].map((i) => stk(L.arc(0, -112 + i * 22, 42, 30, 150), 3)).join(""),
    [-1, 1].map((sd) => sh(ci(sd * 46, -14, 38, 20), c) + stk(`M${sd * 34} -8 v6 M${sd * 46} -6 v6 M${sd * 58} -8 v6`, 3, "cream")).join(""),
    armGeo(o.pose || "stand", [-70, -112], [70, -112], 46).map((p) => tube(p, 24, 20, c)).join(""), [-1, 1].map((sd) => sh(L.poly([[sd * 44, -258], [sd * 64, -312], [sd * 18, -268]], true), "cream", { w: "detail" })).join(""),
    sh(L.poly([[-14, -268], [0, -294], [14, -268]], true), "red", { w: "detail" }), sh(ci(0, -208, 74, 66), c), hi(-30, -250, 22, 9, 0.4), face2(k, 0, -208, 62, { er: 0.27, my: 0.38 }), L.flat(ci(-12, -190, 3), "ink"), L.flat(ci(12, -190, 3), "ink"),
    fire ? flame(34, -180, 1.0, -20) : ""]);
};
reg("crt-dragon-baby", { box: [-200, -330, 400, 350], g: G5, l: "Baby dragon", tags: ["dragon", "baby", "cute", "fantasy", "green", "wings", "hatchling", "friendly"], opt: 'face: "smile|happy|shocked|sad|angry|sleepy", pose, color: "green"', demo: {} }, (o) => dragonBaby(o, false));
reg("crt-dragon-baby-fire", { box: [-200, -330, 400, 350], g: G5, l: "Baby dragon (hiccup flame)", tags: ["dragon", "baby", "fire", "flame", "sneeze", "hiccup", "fantasy", "cute"], opt: 'face, pose, color', demo: {} }, (o) => dragonBaby(o, true));
reg("crt-dragon-grown", { box: [-310, -520, 620, 540], g: G5, l: "Grown dragon (friendly, big)", tags: ["dragon", "big", "wings", "fantasy", "red", "huge", "castle", "friendly", "tail"], opt: 'face: "smile|happy|shocked|sad|angry|sleepy", pose, color: "red"', demo: { face: "smile", pose: "wave" } }, (o) => {
  const c = o.color || "red", k = kd(o, "smile"), A = armGeo(o.pose, [-100, -250], [100, -250], 112);
  const wing = (sd) => { const P = (x, y) => [sd * x, y]; return sh(L.poly([P(70, -300), P(262, -450), P(238, -366), P(216, -338), P(198, -262), P(172, -240), P(140, -196), P(100, -188)], true), "orange", { tone: 1 }) + stk(L.line(P(70, -300), P(262, -450)), 5) + stk(L.line(P(70, -300), P(216, -338)), 4) + stk(L.line(P(70, -300), P(172, -240)), 4); };
  return J([L.shadow(0, 0, 340), wing(-1), wing(1), sh(L.limb([[-70, -84], [-170, -50], [-232, -112], [-212, -196]], 76, 14), c), sh(L.poly([[-222, -190], [-224, -230], [-188, -204]], true), "orange", { w: "detail" }),
    sh(ci(0, -176, 112, 142), c), dt(ci(0, -150, 72, 100), "yellow", { tone: 1 }), [0, 1, 2, 3].map((i) => stk(L.arc(0, -214 + i * 30, 66, 30, 150), 3)).join(""),
    [-1, 1].map((sd) => sh(ci(sd * 66, -26, 58, 28), c) + stk(`M${sd * 42} -16 v8 M${sd * 62} -10 v8 M${sd * 82} -16 v8`, 4, "cream")).join(""),
    A.map((p) => tube(p, 44, 36, c) + sh(ci(p[2][0], p[2][1], 24), c, { w: "detail" })).join(""),
    [-1, 1].map((sd) => sh(L.poly([[sd * 52, -432], [sd * 86, -494], [sd * 124, -496], [sd * 78, -424]], true), "cream", { w: "detail" })).join(""), [-30, 0, 30].map((x) => sh(L.poly([[x - 14, -440], [x, -470 + Math.abs(x) * 0.3], [x + 14, -440]], true), "orange", { w: "detail" })).join(""),
    sh(ci(0, -374, 86, 76), c), hi(-36, -426, 26, 10, 0.4), dt(ci(0, -346, 50, 32), "orange", { tone: 1 }), L.flat(ci(-14, -360, 4), "ink"), L.flat(ci(14, -360, 4), "ink"), face2(k, 0, -376, 72, { er: 0.26, gap: 0.42, my: 0.36, mw: 0.46 })]);
});
reg("crt-dragon-egg", { box: [-130, -290, 260, 310], g: G5, l: "Dragon hatching from an egg", tags: ["dragon", "egg", "hatching", "baby", "newborn", "fantasy", "cute", "shell"], opt: 'face: "smile|happy|shocked|sad|sleepy", color: "green"', demo: {} }, (o) => {
  const c = o.color || "green", k = kd(o, "shocked"), spots = (cs) => cs.map(([x, y, r]) => L.flat(ci(x, y, r), c, 0.8)).join("");
  const teeth = [[-84, -110], [-60, -148], [-36, -112], [-12, -150], [12, -114], [36, -150], [60, -112], [84, -110]];
  const lower = L.poly(L.arcPts(0, -110, 84, 0, 180, 14, 110).concat(teeth), true);
  const cap = L.g(sh(L.poly(L.arcPts(0, 0, 64, 0, -180, 12, 56).concat([[-64, -2], [-40, -26], [-16, 0], [10, -28], [34, -2], [64, -2]]), true), "cream") + spots([[-24, -36, 7], [20, -22, 6]]), "translate(-6 -224) rotate(-18)");
  return J([L.shadow(0, 0, 190), sh(L.poly([[-30, -224], [-44, -268], [-8, -232]], true), "cream", { w: "detail" }), sh(L.poly([[30, -224], [44, -268], [8, -232]], true), "cream", { w: "detail" }), sh(ci(0, -172, 66, 62), c), face2(k, 0, -170, 54, { er: 0.27 }),
    paw(-66, -126, 14, c), paw(66, -126, 14, c), sh(lower, "cream"), spots([[-44, -60, 10], [30, -40, 8], [50, -86, 7], [-20, -96, 6], [0, -24, 6]]), cap]);
});

// ---------- fantasy folk and animals ----------
const G6 = "Fantasy folk";
const horse = (o, X) => {
  const coat = X.coat, mane = X.mane, k = kd(o, "smile"), leg = (x, top, far) => sh(L.limb([[x, top], [x + 4, top + 58], [x, -18]], 27, 18), coat, { tone: far ? 2 : 0 }) + sh(rr(x - 13, -20, 27, 20, 6), "brown", { w: "detail" });
  const eye = k === "happy" ? stk(L.arc(-18, -4, 8, 200, 340), 4) : k === "sleepy" ? stk(L.arc(-18, -8, 8, 20, 160), 4) : goog(-18, -8, k === "shocked" ? 11 : 9, 0.5, { p: k === "shocked" ? 0.3 : 0.55 });
  const brw = k === "angry" ? stk("M-32 -26 L-8 -16", 4) : k === "sad" ? stk("M-32 -16 L-8 -26", 4) : "";
  const blobs = [0, 1, 2, 3, 4, 5].map((i) => { const t = i / 5; return sh(ci(100 - 70 * t - 12, -330 + 136 * t, 24 - t * 4), mane[i % mane.length], { w: "detail" }); }).join("");
  const tail = (pts, w, c) => sh(L.limb(pts, w, 8), c, { w: "detail" });
  return J([L.shadow(0, 0, 300), tail([[-92, -190], [-150, -176], [-182, -112], [-166, -48]], 40, mane[0]), tail([[-92, -180], [-142, -150], [-160, -88]], 26, mane[1 % mane.length]), leg(-62, -118, true), leg(76, -118, true),
    blobs, sh(ci(0, -158, 106, 58), coat), sh(L.smooth([[30, -196], [70, -252], [98, -336], [152, -326], [150, -262], [142, -200], [110, -120], [40, -110], [30, -196]]), coat),
    sh(L.poly([[132, -318], [136, -356], [154, -324]], true), coat, { w: "detail" }), sh(L.poly([[150, -324], [162, -356], [172, -318]], true), coat, { w: "detail" }), X.horn ? sh(L.poly([[142, -316], [168, -322], [188, -418]], true), "gold", { w: "detail" }) + stk("M148 -340 L172 -346 M155 -364 L178 -368 M162 -388 L181 -390", 3) : "",
    L.g(sh(ci(0, 0, 62, 31), coat) + dt(ci(42, 6, 24, 21), X.muzzle || "cream", { tone: 1 }) + L.flat(ci(52, 0, 3.5, 5), "ink") + eye + brw + stk("M30 18 Q44 26 56 16", 3.5), "translate(178 -292) rotate(38) scale(1.15)"),
    sh(ci(152, -338, 22, 18), mane[0], { w: "detail" }), leg(-86, -120), leg(56, -120), X.deco ? X.deco() : "", hi(-40, -190, 40, 12, 0.25)]);
};
reg("crt-unicorn", { box: [-230, -440, 520, 460], g: G6, l: "Unicorn (rainbow mane)", tags: ["unicorn", "horse", "magic", "fantasy", "rainbow", "horn", "myth", "pony"], opt: 'face: "smile|happy|shocked|sad|angry|sleepy", coat: "white"', demo: { face: "happy" } }, (o) => horse(o, { coat: o.coat || "white", mane: ["pink", "purple", "teal", "yellow"], horn: true, muzzle: "pink" }));
reg("crt-knight-horse", { box: [-230, -450, 520, 470], g: G6, l: "Knight's horse (armoured, plume)", tags: ["horse", "knight", "medieval", "steed", "castle", "armour", "warhorse", "history"], opt: 'face, cloth: "blue"', demo: {} }, (o) => {
  const cl = o.cloth || "blue";
  return horse(o, { coat: o.coat || "brown", mane: ["ink", "brown"], muzzle: "earth", deco: () => J([sh(L.poly([[-84, -208], [70, -214], [92, -150], [90, -96], [70, -88], [50, -102], [28, -88], [6, -102], [-16, -88], [-38, -102], [-60, -88], [-88, -100], [-100, -150]], true), cl),
    L.flat(L.poly([[-96, -118], [92, -120], [90, -96], [-88, -100]], true), "white", 0.9), sh(L.poly([[-4, -176], [18, -152], [-4, -128], [-26, -152]], true), "gold", { w: "detail" }), sh(rr(-22, -232, 56, 22, 10), "brown", { w: "detail" }),
    L.g(sh(L.poly([[0, 0], [38, -10], [50, 18], [20, 26]], true), "gray", { tone: 1 }) + sh(L.smooth([[2, -6], [16, -50], [38, -62], [28, -22], [2, -6]]), "red", { w: "detail" }), "translate(138 -352) rotate(-10)")]) });
});
reg("crt-mermaid", { box: [-210, -440, 520, 460], g: G6, l: "Mermaid (sitting on a rock)", tags: ["mermaid", "sea", "ocean", "fantasy", "tail", "fairy tale", "underwater", "rock"], opt: 'face: "smile|happy|shocked|sad|…", pose: "wave", hairC: "orange", color: "teal", top: "purple"', demo: {} }, (o) => {
  const hc = o.hairC || "orange", tc = o.color || "teal", top = o.top || "purple", sk = skinOf(o), H = L.HAIR.long(0, -300, 42, hc), A = armGeo(o.pose || "wave", [-34, -232], [34, -232], 92);
  const tail = [[0, -112], [70, -92], [132, -106], [178, -160], [198, -222]], fin = L.smooth([[198, -214], [160, -262], [172, -306], [208, -270], [226, -312], [250, -266], [240, -216], [206, -208]]);
  return J([L.shadow(0, 0, 300), H.back, sh(L.smooth([[-150, 0], [-160, -44], [-110, -96], [-30, -116], [60, -100], [130, -60], [150, 0], [-150, 0]]), "stone"), hi(-90, -80, 30, 10, 0.4), sh(L.limb(tail, 86, 30), tc), sh(fin, "pink"), stk("M214 -216 L226 -276 M206 -216 L190 -272", 3),
    [[60, -98], [108, -96], [150, -124], [20, -100]].map(([x, y]) => stk(L.arc(x, y, 12, 20, 160), 3)).join(""), sh(rr(-38, -248, 76, 150, 30), top), stk("M-24 -130 Q0 -118 24 -130", 3),
    A.map((p, i) => tube(p, 26, 20, top) + sh(ci(p[2][0], p[2][1], 12), sk, { w: "detail" })).join(""), sh(ci(0, -300, 42), sk), H.front || "", L.face(0, -300, 42, o.face || "happy", { eyes: "v3" })]);
});
reg("crt-owl-wizard", { box: [-130, -330, 260, 350], g: G6, l: "Wizard's owl familiar (hat, perch)", tags: ["owl", "wizard", "familiar", "magic", "hat", "bird", "fantasy", "wise", "night", "pet"], opt: 'face: "smile|happy|shocked|sad|angry|sleepy"', demo: {} }, (o) => {
  const k = kd(o, "smile"), c = o.color || "brown", wing = (sd) => sh(L.smooth([[sd * 56, -164], [sd * 90, -112], [sd * 72, -46], [sd * 46, -70], [sd * 50, -132], [sd * 56, -164]]), c, { tone: 2 });
  return J([L.shadow(0, 0, 220), sh(rr(-110, -22, 220, 22, 11), "wood"), wing(-1), wing(1), sh(L.poly([[-52, -196], [-68, -240], [-26, -208]], true), c, { w: "detail" }), sh(L.poly([[52, -196], [68, -240], [26, -208]], true), c, { w: "detail" }),
    sh(ci(0, -122, 68, 86), c, { tone: 1 }), dt(ci(0, -94, 44, 58), "cream"), [0, 1, 2].map((r) => [-1, 0, 1].map((i) => stk(L.arc(i * 22, -112 + r * 24, 11, 20, 160), 3)).join("")).join(""),
    dt(ci(-28, -152, 30), "cream"), dt(ci(28, -152, 30), "cream"), eyes(k, 0, -152, 28, 17, { iris: "yellow" }), sh(L.poly([[-10, -134], [10, -134], [0, -108]], true), "orange", { w: "detail" }),
    L.g(sh(ci(0, 0, 70, 14), "purple") + sh(L.poly([[-50, -2], [50, -2], [8, -120]], true), "purple") + L.flat(L.star(-4, -40, 15, 6, 5), "gold") + sh(rr(-50, -14, 100, 14, 6), "gold", { w: "detail" }), "translate(8 -206) rotate(10)"),
    [-1, 1].map((sd) => sh(ci(sd * 26, -22, 18, 8), "orange", { w: "detail" })).join("")]);
});
reg("crt-fairy", { box: [-140, -150, 280, 250], g: G6, l: "Fairy with wand (floating)", tags: ["fairy", "magic", "tiny", "wings", "wand", "sparkle", "fantasy", "pixie"], opt: 'face: "smile|happy|shocked|…", pose', at: "y", demo: {} }, (o) => {
  const sk = skinOf(o), A = armGeo(o.pose || "wave", [-12, -28], [12, -28], 50), wing = (sd) => sh(L.smooth([[sd * 8, -34], [sd * 70, -130], [sd * 118, -104], [sd * 86, -34], [sd * 8, -34]]), "sky", { w: "detail", op: 0.75 }) + sh(L.smooth([[sd * 8, -28], [sd * 74, -16], [sd * 84, 24], [sd * 40, 22], [sd * 8, -28]]), "pink", { w: "detail", op: 0.75 });
  const wand = A[1][2];
  return J([wing(-1), wing(1), L.flat(ci(0, 0, 90, 110), "yellow", 0.1), stk("M-10 28 L-12 76 M10 28 L12 76", 5), sh(ci(-12, 78, 9, 5), "pink", { w: "detail" }), sh(ci(12, 78, 9, 5), "pink", { w: "detail" }), sh(L.poly([[-15, -34], [15, -34], [36, 34], [-36, 34]], true), "pink"),
    A.map((p) => tube(p, 9, 7, sk)).join(""), stk(L.line([wand[0] - 6, wand[1] + 14], [wand[0] + 14, wand[1] - 26]), 4, "wood"), sh(L.star(wand[0] + 18, wand[1] - 34, 17, 8), "gold", { w: "detail" }),
    sh(ci(0, -60, 26), sk), L.HAIR.bun(0, -60, 26, o.hairC || "gold").front, L.face(0, -60, 26, o.face || "happy", { eyes: "v3" }), spark(-90, -50, 10), spark(96, 30, 8), spark(60, -110, 7), spark(-60, 50, 6), spark(wand[0] + 50, wand[1] - 4, 6)]);
});
reg("crt-giant", { box: [-380, -800, 760, 820], g: G6, l: "Giant (with a tiny house for scale)", tags: ["giant", "huge", "big", "scale", "tall", "size", "ogre", "fairy tale", "towering"], opt: 'face, pose, outfitC', demo: { face: "smile" } }, (o) => {
  const house = J([sh(rr(170, -72, 84, 72, 4), "cream"), sh(L.poly([[160, -70], [212, -116], [264, -70]], true), "red"), dt(rr(200, -50, 24, 50, 3), "wood"), dt(rr(176, -58, 18, 18, 2), "glass"), sh(rr(290, -34, 12, 34, 2), "wood", { w: "detail" }), sh(ci(296, -64, 28), "green", { w: "detail" })]);
  return J([person(Object.assign({ style: "man03", body: "chubby", outfit: "tee", outfitC: "green", hair: "messy", hairC: "brown", acc: ["beard"], face: "smile", pose: "hips", s: 2.0 }, o)), house]);
});
reg("crt-tiny-person", { box: [-190, -160, 380, 180], g: G6, l: "Tiny person on a giant coin", tags: ["tiny", "small", "mini", "micro", "scale", "size", "coin", "shrunk", "little"], opt: 'face, pose', demo: {} }, (o) => J([
  L.shadow(0, 0, 330), sh(L.circ(0, -16, 150, 34), "gold", { tone: 2 }), sh(L.circ(0, -34, 150, 34), "gold"), sh(L.circ(0, -34, 118, 25), "gold", { w: "detail", tone: 2 }), L.text("1", 0, -22, { size: 52, c: "gold", halo: "ink", haloW: 0.12 }),
  L.g(person(Object.assign({ style: "man01", pose: "wave", face: "happy", s: 0.26 }, o)), "translate(-30 -40)")]));
reg("crt-giant-and-tiny", { box: [-340, -740, 680, 760], g: G6, l: "Giant looking down at a tiny person", tags: ["giant", "tiny", "scale", "size", "compare", "big and small", "looking up", "height"], opt: 'faceGiant, faceTiny', demo: {} }, (o) => J([
  person({ style: "man03", body: "chubby", outfit: "tee", outfitC: "orange", hair: "messy", hairC: "brown", acc: ["beard"], face: o.faceGiant || "smile", pose: "wave", s: 1.7 }),
  L.g(person({ style: "man01", outfit: "tee", outfitC: "blue", face: o.faceTiny || "shocked", pose: "shocked", s: 0.42 }), "translate(-150 0)")]));

// ---------- living weather and sky ----------
const G7 = "Weather and sky";
const cloudD = "M-95 0 A50 50 0 0 1 -115 -80 A55 55 0 0 1 -55 -145 A62 62 0 0 1 45 -150 A60 60 0 0 1 115 -85 A55 55 0 0 1 95 0 Z";
reg("crt-cloud-happy", { box: [-200, -190, 400, 380], g: G7, l: "Living cloud (happy)", tags: ["cloud", "weather", "sky", "cute", "face", "character", "puffy", "friendly"], opt: 'face: "smile|happy|shocked|sad|sleepy", pose', at: "y", demo: { face: "happy" } }, (o) => {
  const k = kd(o, "happy");
  return L.g(J([armGeo(o.pose, [-112, -58], [112, -58], 60).map((p) => tube(p, 28, 22, "white")).join(""), sh(cloudD, "white"), clip(cloudD, L.flat(L.rect(-130, -32, 260, 40), "sky", 0.35)), hi(-62, -122, 28, 11, 0.8), face2(k, 0, -74, 66, { er: 0.25 })]), "translate(0 75)");
});
reg("crt-cloud-grumpy", { box: [-200, -190, 400, 400], g: G7, l: "Grumpy rain cloud (living)", tags: ["cloud", "rain", "storm", "grumpy", "weather", "angry", "gloomy", "character"], opt: 'face: "angry|sad|shocked|…", pose: "cross"', at: "y", demo: { face: "angry", pose: "cross" } }, (o) => {
  const k = kd(o, "angry"), drops = [-70, -30, 10, 50, 90].map((x, i) => stk(`M${x} ${14 + (i % 2) * 18} l-8 24`, 6, "blue")).join("");
  return L.g(J([armGeo(o.pose || "cross", [-112, -58], [112, -58], 60).map((p) => tube(p, 28, 22, "gray")).join(""), sh(cloudD, "gray"), L.flat(cloudD, "ink", 0.06), hi(-62, -122, 28, 11, 0.4), face2(k, 0, -74, 66, { er: 0.25 }), drops]), "translate(0 75)");
});
const sunRays = (r0, r1, n) => Array.from({ length: n }, (_, i) => { const a = (i / n) * PI * 2, b = 0.13; return sh(L.poly([[Math.cos(a - b) * r0, Math.sin(a - b) * r0], [Math.cos(a) * r1, Math.sin(a) * r1], [Math.cos(a + b) * r0, Math.sin(a + b) * r0]], true), "orange", { w: "detail" }); }).join("");
const sunBody = (o, shades) => {
  const k = kd(o, shades ? "smug" : "happy"), A = armGeo(o.pose || "wave", [-112, 30], [112, 30], 84);
  const glass = (sd) => sh(rr(sd * 40 - 34, -34, 68, 44, 16), "ink", { w: "detail" }) + L.flat(L.poly([[sd * 40 - 20, -26], [sd * 40 - 6, -26], [sd * 40 - 20, -8]], true), "white", 0.5);
  return J([sunRays(112, 176, 12), sh(ci(0, 0, 118), "yellow"), hi(-46, -62, 34, 14, 0.5), A.map((p) => tube(p, 26, 20, "orange") + sh(ci(p[2][0], p[2][1], 18), "white", { w: "detail" })).join(""),
    shades ? J([glass(-1), glass(1), stk("M-6 -22 H6", 5), stk("M-74 -24 L-90 -30 M74 -24 L90 -30", 5), mouth(k, 0, 42, 50)]) : face2(k, 0, 0, 96, { er: 0.22, my: 0.4, mw: 0.55 })]);
};
reg("crt-sun-talking", { box: [-210, -200, 420, 400], g: G7, l: "Talking sun (open mouth, gloves)", tags: ["sun", "talking", "character", "weather", "sky", "day", "happy", "face", "daylight"], opt: 'face: "happy|smile|shocked|sad|angry|sleepy", pose', at: "y", demo: {} }, (o) => sunBody(o, false));
reg("crt-sun-cool", { box: [-210, -200, 420, 400], g: G7, l: "Cool sun (sunglasses)", tags: ["sun", "sunglasses", "cool", "hot", "summer", "character", "heatwave", "weather"], opt: 'face, pose', at: "y", demo: {} }, (o) => sunBody(o, true));
reg("crt-moon-sleepy", { box: [-190, -250, 420, 420], g: G7, l: "Sleepy moon (nightcap, zzz)", tags: ["moon", "sleepy", "night", "bedtime", "crescent", "nightcap", "zzz", "character", "sleep"], opt: 'face: "sleepy|smile|happy|shocked|sad"', at: "y", demo: {} }, (o) => {
  const k = kd(o, "sleepy"), R = 130, d = 62, r = 108, x = (R * R - r * r + d * d) / (2 * d), y = Math.sqrt(R * R - x * x);
  return J([sh(`M${f1(x)} ${f1(-y)} A${R} ${R} 0 1 0 ${f1(x)} ${f1(y)} A${r} ${r} 0 0 1 ${f1(x)} ${f1(-y)} Z`, "cream"), hi(-92, -70, 22, 14, 0.6), face2(k, -88, 10, 46, { er: 0.22, gap: 0.42 }),
    L.g(sh(L.smooth([[-52, 6], [48, 8], [66, -50], [90, -92], [30, -86], [-30, -50], [-52, 6]]), "red") + sh(rr(-56, -4, 108, 22, 10), "white", { w: "detail" }) + sh(ci(92, -96, 15), "white", { w: "detail" }), "translate(-40 -112) rotate(-18)"),
    L.text("z", 120, -40, { size: 54, c: "paper", halo: "ink" }), L.text("Z", 156, -86, { size: 74, c: "paper", halo: "ink" }), spark(110, 90, 12, "yellow"), spark(150, 40, 8, "yellow")]);
});

// ---------- talking objects ----------
const G8 = "Living objects";
const sweat = (x, y, k = 1) => dt(`M${x} ${y - 16 * k} Q${x + 11 * k} ${y + 4 * k} ${x} ${y + 9 * k} Q${x - 11 * k} ${y + 4 * k} ${x} ${y - 16 * k} Z`, "sky");
const OBJ = (name, label, tags, opt, box, fn, demo) => reg(name, { box, g: G8, l: label, tags: ["object", "mascot", "cartoon", "face"].concat(tags), opt, demo: demo || {} }, fn);
OBJ("crt-alarm-clock-nervous", "Nervous alarm clock", ["alarm clock", "clock", "time", "morning", "wake up", "deadline", "nervous", "anxious"], 'face: "shocked|sad|angry|smile|…", pose', [-190, -340, 380, 360], (o) => {
  const k = kd(o, "shocked"), tick = Array.from({ length: 12 }, (_, i) => { const a = (i / 12) * PI * 2; return stk(L.line([Math.cos(a) * 66, -170 + Math.sin(a) * 66], [Math.cos(a) * 76, -170 + Math.sin(a) * 76]), 4); }).join("");
  return J([L.shadow(0, 0, 200), legs([-30, 30], -76, 0, 15, "gray", "navy"), [-1, 1].map((sd) => sh(L.circ(sd * 66, -266, 34, 28), "gold", { w: "detail" }) + sh(ci(sd * 66, -296, 8), "gold", { w: "detail" })).join(""),
    armGeo(o.pose || "shocked", [-98, -150], [98, -150], 70).map((p) => tube(p, 18, 15, "gray") + sh(ci(p[2][0], p[2][1], 15), "white", { w: "detail" })).join(""), sh(ci(0, -170, 104), "red"), sh(ci(0, -170, 84), "cream"), tick, hi(-60, -228, 30, 10, 0.5),
    face2(k, 0, -164, 62, { er: 0.25 }), k === "shocked" || k === "sad" ? sweat(82, -216) : "", stk("M-132 -200 q-14 14 0 28 M-148 -208 q-20 22 0 44 M132 -200 q14 14 0 28 M148 -208 q20 22 0 44", 4, "red")]);
}, { face: "shocked" });
OBJ("crt-phone-smug", "Smug smartphone", ["phone", "smartphone", "mobile", "smug", "notifications", "social media", "screen", "addiction"], 'face: "smug|smile|happy|angry|…", pose: "cross"', [-170, -390, 340, 410], (o) => {
  const k = kd(o, "smug");
  return J([L.shadow(0, 0, 180), legs([-26, 26], -80, 0, 13, "navy", "red"), armGeo(o.pose || "cross", [-84, -190], [84, -190], 66).map((p) => tube(p, 17, 14, "navy") + sh(ci(p[2][0], p[2][1], 14), "white", { w: "detail" })).join(""),
    sh(rr(-86, -340, 172, 270, 30), "navy"), sh(rr(-72, -322, 144, 236, 18), "sky", { w: "detail" }), L.flat(L.poly([[-72, -230], [72, -280], [72, -322], [-72, -322]], true), "white", 0.18), sh(ci(0, -332, 4), "gray", { w: "detail" }),
    face2(k, 0, -210, 56, { er: 0.25 }), stk("M-22 -80 H22", 5, "gray"), sh(ci(80, -334, 26), "red"), L.text("99", 80, -324, { size: 28, c: "white", halo: "ink" })]);
});
OBJ("crt-battery-tired", "Tired battery", ["battery", "tired", "low battery", "energy", "exhausted", "charge", "sleepy", "power"], 'face: "sleepy|sad|happy|…", level: 0.2, pose', [-170, -370, 340, 390], (o) => {
  const k = kd(o, "sleepy"), lv = o.level !== undefined ? o.level : 0.2, h = 20 + lv * 200, c = lv < 0.35 ? "red" : lv < 0.7 ? "yellow" : "green", body = rr(-72, -310, 144, 240, 24);
  return J([L.shadow(0, 0, 190), legs([-28, 28], -76, 0, 14, "gray", "navy"), armGeo(o.pose || "sad", [-72, -190], [72, -190], 70).map((p) => tube(p, 17, 14, "gray") + sh(ci(p[2][0], p[2][1], 14), "white", { w: "detail" })).join(""),
    sh(rr(-28, -338, 56, 32, 8), "gray"), sh(body, "white"), clip(body, L.flat(L.rect(-80, -70 - h, 160, h + 4), c, 0.85) + L.flat(L.rect(-80, -74 - h, 160, 6), "white", 0.5)), L.stroke(body, { w: "char" }), hi(-48, -280, 10, 30, 0.6),
    face2(k, 0, -228, 56, { er: 0.25 }), k === "sleepy" ? [-1, 1].map((sd) => L.flat(ci(sd * 22, -214, 14, 5), "ink", 0.18)).join("") + L.text("z", 76, -278, { size: 36 }) + L.text("Z", 98, -306, { size: 48 }) : sweat(72, -280)]);
}, { level: 0.15 });
OBJ("crt-tooth-happy", "Happy tooth", ["tooth", "teeth", "dentist", "dental", "clean", "healthy", "smile", "hygiene"], 'face: "happy|smile|shocked|sad|…", pose', [-170, -370, 340, 390], (o) => {
  const k = kd(o, "happy"), t = L.smooth([[-86, -240], [-66, -302], [-22, -294], [0, -278], [22, -294], [66, -302], [86, -240], [78, -170], [56, -110], [-56, -110], [-78, -170], [-86, -240]]);
  return J([L.shadow(0, 0, 190), legs([-32, 32], -116, 0, 17, "white", "blue"), armGeo(o.pose || "wave", [-82, -200], [82, -200], 72).map((p) => tube(p, 17, 14, "white") + sh(ci(p[2][0], p[2][1], 14), "white", { w: "detail" })).join(""),
    sh(t, "white"), L.flat("M-62 -270 Q-48 -290 -30 -286 L-36 -266 Z", "glass", 0.9), face2(k, 0, -204, 62, { er: 0.25 }), k === "happy" || k === "smile" ? spark(86, -300, 20, "yellow") + spark(116, -262, 10, "yellow") : ""]);
});
OBJ("crt-coffee-cup-grumpy", "Grumpy coffee cup", ["coffee", "cup", "mug", "grumpy", "morning", "caffeine", "monday", "angry"], 'face: "angry|sleepy|sad|smile|…", pose', [-190, -400, 380, 420], (o) => {
  const k = kd(o, "angry"), cup = L.smooth([[-92, -232], [92, -232], [80, -92], [62, -76], [-62, -76], [-80, -92], [-92, -232]]);
  return J([L.shadow(0, 0, 220), legs([-30, 30], -80, 0, 15, "red", "navy"), sh(L.limb([[84, -214], [138, -208], [142, -164], [80, -150]], 24, 24), "red"), armGeo(o.pose || "stand", [-82, -140], [82, -140], 66).map((p) => tube(p, 18, 15, "red") + sh(ci(p[2][0], p[2][1], 14), "white", { w: "detail" })).join(""),
    sh(cup, "red"), clip(cup, L.flat(L.rect(-100, -126, 200, 20), "white", 0.85)), hi(-58, -190, 10, 36, 0.4), sh(L.circ(0, -232, 92, 22), "cream"), sh(L.circ(0, -230, 78, 15), "brown", { w: "detail", tone: 1 }),
    face2(k, 0, -160, 58, { er: 0.25 }), stk("M-34 -262 q-18 -26 0 -50 q18 -24 0 -48 M0 -262 q-18 -26 0 -50 q18 -24 0 -48 M34 -262 q-18 -26 0 -50 q18 -24 0 -48", 6, "gray")]);
});
OBJ("crt-germ-fighter", "Brave germ fighter (white blood cell hero)", ["white blood cell", "immune system", "germ", "hero", "cape", "defender", "body", "health", "brave"], 'face (default: determined), pose', [-190, -340, 380, 360], (o) => {
  const k = kd(o, "angry"), fc = o.face ? face2(k, 0, -176, 72, { er: 0.22 }) : eyes("angry", 0, -182, 30, 17) + mouth("smile", 0, -148, 54);
  return J([L.shadow(0, 0, 220), sh(L.smooth([[-52, -254], [52, -254], [128, -70], [88, -58], [48, -72], [0, -58], [-48, -72], [-88, -58], [-128, -70], [-52, -254]]), "red", { tone: 1 }),
    legs([-34, 34], -70, 0, 20, "cream", "red"), armGeo(o.pose || "cheer", [-92, -160], [92, -160], 76).map((p) => tube(p, 22, 18, "cream") + sh(ci(p[2][0], p[2][1], 17), "red", { w: "detail" })).join(""), sh(ci(0, -166, 102), "cream"),
    [[-74, -190, 14], [74, -128, 13], [-78, -116, 11], [66, -200, 9]].map(([x, y, r]) => dt(ci(x, y, r), "purple", { tone: 1 })).join(""), sh(L.star(0, -88, 22, 8, 4, 0), "red", { w: "detail" }),
    hi(-50, -236, 28, 10, 0.6), fc, sh(rr(-84, -252, 168, 16, 8), "red", { w: "detail" })]);
}, { pose: "cheer" });
OBJ("crt-bulb-idea", "Idea light bulb (character)", ["light bulb", "idea", "bulb", "eureka", "inspiration", "bright", "think", "innovation"], 'face: "happy|smile|shocked|sad|sleepy|…", pose: "cheer"', [-190, -400, 380, 420], (o) => {
  const k = kd(o, "happy"), g = L.smooth([[-34, -176], [-70, -214], [-92, -262], [-72, -326], [0, -350], [72, -326], [92, -262], [70, -214], [34, -176], [-34, -176]]);
  const rays = Array.from({ length: 9 }, (_, i) => { const a = (-170 + i * 20) * PI / 180; return stk(L.line([Math.cos(a) * 118, -262 + Math.sin(a) * 118], [Math.cos(a) * 146, -262 + Math.sin(a) * 146]), 7, "gold"); }).join("");
  return J([L.shadow(0, 0, 170), rays, legs([-18, 18], -130, 0, 11, "gray", "navy"), armGeo(o.pose || "cheer", [-84, -240], [84, -240], 70).map((p) => tube(p, 15, 12, "yellow") + sh(ci(p[2][0], p[2][1], 12), "white", { w: "detail" })).join(""),
    sh(g, "yellow", { tone: 1 }), hi(-48, -318, 18, 28, 0.55), face2(k, 0, -262, 62, { er: 0.24 }), sh(rr(-38, -176, 76, 22, 8), "gray"), sh(rr(-32, -156, 64, 20, 8), "gray"), sh(rr(-22, -138, 44, 16, 6), "gray")]);
});
const toast = (o, burnt) => {
  const k = kd(o, burnt ? "sad" : "shocked"), pts = [[-78, -70], [-84, -190], [-104, -226], [-90, -290], [-40, -306], [0, -296], [40, -306], [90, -290], [104, -226], [84, -190], [78, -70], [-78, -70]], inner = pts.map(([x, y]) => [x * 0.84, (y + 188) * 0.84 - 188 - 4]);
  return J([L.shadow(0, 0, 180), legs([-26, 26], -76, 0, 13, "earth", "navy"), armGeo(o.pose || "stand", [-80, -190], [80, -190], 62).map((p) => tube(p, 15, 12, "earth") + sh(ci(p[2][0], p[2][1], 13), "white", { w: "detail" })).join(""),
    sh(L.smooth(pts), "earth", { tone: 2 }), dt(L.smooth(inner), burnt ? "brown" : "sand", { tone: burnt ? 1 : 1 }), face2(k, 0, -200, 56, { er: 0.25, c: burnt ? "white" : "ink" }), sweat(78, -270),
    burnt ? [[-30, -110, 8], [34, -130, 6], [-10, -276, 6]].map(([x, y, r]) => L.flat(ci(x, y, r), "ink", 0.3)).join("") + stk("M20 -330 q-14 -16 0 -32 q14 -16 0 -32", 5, "gray") : ""]);
};
OBJ("crt-toast-worried", "Worried slice of toast", ["toast", "bread", "breakfast", "worried", "slice", "food character", "kitchen"], 'face, pose', [-150, -340, 300, 360], (o) => toast(o, false));
OBJ("crt-toast-burnt", "Burnt toast (sad)", ["toast", "burnt", "bread", "breakfast", "sad", "smoke", "food character", "kitchen"], 'face, pose', [-150, -400, 300, 420], (o) => toast(o, true));
OBJ("crt-coin-worried", "Worried gold coin", ["coin", "money", "gold", "worried", "finance", "inflation", "cash", "savings"], 'face: "shocked|sad|happy|smile|…", pose', [-170, -320, 340, 340], (o) => {
  const k = kd(o, "shocked");
  return J([L.shadow(0, 0, 200), legs([-28, 28], -72, 0, 14, "gold", "navy"), armGeo(o.pose || "stand", [-98, -160], [98, -160], 68).map((p) => tube(p, 17, 14, "gold") + sh(ci(p[2][0], p[2][1], 14), "white", { w: "detail" })).join(""),
    sh(ci(0, -170, 104), "gold"), dt(ci(0, -170, 84), "gold", { tone: 2 }), stk(L.arc(0, -170, 92, 200, 250), 6, "white"), hi(-46, -228, 26, 10, 0.55), face2(k, 0, -166, 62, { er: 0.25 }), sweat(86, -224)]);
}, { face: "shocked" });

// ---------- spooky-silly, winter and garden friends ----------
const G9 = "Silly classics";
const CL = (name, label, tags, opt, box, fn, demo, at) => reg(name, { box, g: G9, l: label, tags, opt, demo: demo || {}, at }, fn);
const bone = (d, w = 14) => stk(d, w + 6, "ink") + stk(d, w, "white");
CL("crt-mummy", "Friendly mummy", ["mummy", "halloween", "bandages", "egypt", "silly", "spooky", "wrapped", "friendly"], 'face: "smile|happy|shocked|sad|…", pose', [-210, -400, 420, 420], (o) => {
  const k = kd(o, "smile"), body = rr(-70, -250, 140, 190, 60), head = ci(0, -292, 70), bands = (y0, y1, w) => Array.from({ length: Math.ceil((y1 - y0) / 24) }, (_, i) => stk(L.line([-w, y0 + i * 24 + 16], [w, y0 + i * 24 - 12]), 4, "stone")).join("");
  return J([L.shadow(0, 0, 190), sh(L.limb([[96, -120], [136, -76], [112, -30], [150, -6]], 14, 12), "cream", { w: "detail" }), legs([-28, 28], -76, 0, 28, "cream", "stone"),
    armGeo(o.pose || "wave", [-66, -210], [66, -210], 84).map((p) => tube(p, 32, 28, "cream")).join(""), sh(body, "cream"), clip(L.rrect(-70, -250, 140, 190, 60), bands(-250, -60, 90)), sh(head, "cream"), clip(ci(0, -292, 70), bands(-362, -222, 80)),
    sh(rr(-58, -316, 116, 46, 20), "navy", { w: "detail" }), eyes(k, 0, -292, 26, 14), mouth(k, 0, -250, 30), hi(-34, -340, 20, 8, 0.6)]);
});
CL("crt-skeleton", "Friendly skeleton (waving)", ["skeleton", "bones", "halloween", "spooky", "skull", "funny", "anatomy", "silly"], 'face: "smile|happy|shocked|sad|angry|…", pose', [-190, -410, 380, 430], (o) => {
  const k = kd(o, "smile"), A = armGeo(o.pose || "wave", [-44, -250], [44, -250], 96), drop = k === "shocked" ? 14 : 0;
  const socket = (sd) => L.flat(ci(sd * 24, -326, k === "shocked" ? 19 : 17, 18), "ink") + L.flat(ci(sd * 24 + (k === "smug" ? 4 : 0), -326, 5.5), "white") + (k === "angry" ? stk(L.line([sd * 44, -352], [sd * 6, -340]), 5) : k === "sad" ? stk(L.line([sd * 44, -340], [sd * 6, -354]), 5) : "");
  return J([L.shadow(0, 0, 170), [-1, 1].map((sd) => bone(L.poly([[sd * 24, -128], [sd * 26, -68], [sd * 24, -14]]), 12) + sh(L.circ(sd * 34, -8, 20, 9), "white", { w: "detail" }) + sh(ci(sd * 25, -70, 8), "white", { w: "detail" })).join(""),
    bone("M0 -268 V-140", 12), [0, 1, 2].map((i) => { const y = -246 + i * 32; return bone(`M0 ${y} Q-58 ${y - 8} -56 ${y + 20}`, 11) + bone(`M0 ${y} Q58 ${y - 8} 56 ${y + 20}`, 11); }).join(""), sh(L.smooth([[-46, -140], [-30, -160], [0, -150], [30, -160], [46, -140], [30, -108], [0, -126], [-30, -108], [-46, -140]]), "white"),
    A.map((p) => bone(L.poly(p), 12) + sh(ci(p[1][0], p[1][1], 8), "white", { w: "detail" }) + sh(ci(p[2][0], p[2][1], 11), "white", { w: "detail" })).join(""),
    sh(rr(-34, -290 + drop, 68, 28, 12), "white"), sh(ci(0, -326, 60, 54), "white"), hi(-30, -366, 18, 8, 0.6), socket(-1), socket(1), L.flat(L.poly([[-4, -304], [4, -304], [0, -296]], true), "ink"),
    dt(rr(-30, -288, 60, 16 + drop, 5), "white"), stk(`M-20 -288 V${-272 + drop} M-10 -288 V${-272 + drop} M0 -288 V${-272 + drop} M10 -288 V${-272 + drop} M20 -288 V${-272 + drop}`, 2.5), k === "happy" || k === "smile" ? stk(L.arc(0, -296, 30, 30, 150), 3.5) : k === "shocked" ? "" : stk("M-28 -280 H28", 3.5)]);
});
CL("crt-snowman", "Living snowman", ["snowman", "winter", "snow", "christmas", "cold", "carrot nose", "scarf", "character"], 'face: "smile|happy|shocked|sad|…", pose: "stand|wave"', [-210, -480, 420, 500], (o) => {
  const k = kd(o, "happy"), wave = o.pose === "wave", twig = (x, y, ex, ey) => stk(L.line([x, y], [ex, ey]), 8, "wood") + stk(L.line([(x + ex) / 2, (y + ey) / 2], [(x + ex) / 2 + 22, (y + ey) / 2 - 20]), 5, "wood");
  return J([L.shadow(0, 0, 230), twig(-62, -222, -150, -250), wave ? twig(62, -222, 142, -310) : twig(62, -222, 150, -190), sh(ci(0, -88, 92), "snow"), sh(ci(0, -214, 70), "snow"), [[0, -240], [0, -214], [0, -188]].map(([x, y]) => L.flat(ci(x, y, 7), "ink")).join(""),
    sh(ci(0, -314, 56), "snow"), sh(rr(-62, -268, 124, 26, 13), "red"), sh(rr(18, -252, 30, 62, 12), "red"), sh(rr(-38, -434, 76, 66, 6), "ink"), sh(L.circ(0, -368, 70, 14), "ink"), sh(rr(-38, -392, 76, 14, 0), "red", { w: "detail" }),
    eyes(k, 0, -326, 22, 11), sh(L.poly([[0, -312], [50, -300], [0, -296]], true), "orange", { w: "detail" }), mouth(k, 0, -290, 40), hi(-30, -350, 14, 8, 0.8)]);
});
CL("crt-genie", "Lamp genie", ["genie", "magic lamp", "wish", "aladdin-like", "fantasy", "smoke", "turban", "arabian nights"], 'face: "smile|happy|shocked|…", pose: "cross", color: "blue"', [-200, -570, 400, 590], (o) => {
  const c = o.color || "blue", k = kd(o, "happy"), A = armGeo(o.pose || "cross", [-66, -370], [66, -370], 104), crossed = (o.pose || "cross") === "cross";
  const cuff = (x, y, a) => L.g(sh(rr(-9, -19, 18, 38, 6), "gold", { w: "detail" }), `translate(${f1(x)} ${f1(y)}) rotate(${f1(a)})`);
  const crossArms = () => sh(L.limb([[-62, -374], [-92, -352], [-100, -306]], 38, 34), c, { tone: 0 }) + sh(L.limb([[-100, -306], [-30, -330], [58, -352]], 34, 30), c, { tone: 0 }) + cuff(30, -344, -17) + sh(ci(66, -354, 19), c, { w: "detail", tone: 0 }) +
    L.flat(L.limb([[100, -322], [34, -310], [-58, -294]], 44, 40), "ink", 0.2) + sh(L.limb([[62, -374], [92, -344], [100, -326]], 38, 34), c, { tone: 1 }) + sh(L.limb([[100, -326], [34, -314], [-58, -298]], 34, 30), c, { tone: 1 }) + cuff(-30, -304, 168) + sh(ci(-66, -296, 19), c, { w: "detail", tone: 1 }) + sh(rr(88, -346, 14, 28, 5), "gold", { w: "detail" });
  return J([L.shadow(0, 0, 200), sh(L.circ(0, -28, 84, 30), "gold"), sh(L.poly([[70, -36], [130, -70], [136, -56], [90, -14]], true), "gold", { w: "detail" }), sh(L.limb([[-78, -40], [-120, -52], [-112, -22]], 12, 12), "gold", { w: "detail" }), sh(L.circ(0, -56, 36, 14), "gold", { w: "detail" }), sh(ci(0, -76, 9), "gold", { w: "detail" }), hi(-30, -38, 26, 8, 0.5),
    sh(L.limb([[0, -70], [-36, -130], [36, -200], [0, -270]], 16, 108), c, { tone: 1 }), sh(rr(-68, -396, 136, 150, 44), c, { tone: crossed ? 2 : 1 }), sh(L.poly([[-40, -396], [40, -396], [30, -300], [0, -274], [-30, -300]], true), "gold", { w: "detail" }),
    crossed ? crossArms() : A.map((p) => tube(p, 36, 30, c, { tone: 1 }) + sh(ci(p[2][0], p[2][1], 17), c, { w: "detail", tone: 1 }) + sh(rr(p[1][0] - 6, p[1][1] - 6, 14, 14, 4), "gold", { w: "detail" })).join(""),
    sh(ci(0, -440, 50), c, { tone: 1 }), face2(k, 0, -436, 46, { er: 0.24 }), stk("M-20 -400 Q0 -384 20 -400 L12 -372 Q0 -364 -12 -372 Z", 4, "ink"), sh(L.smooth([[-56, -468], [-46, -520], [0, -540], [46, -520], [56, -468], [0, -480], [-56, -468]]), "purple"), sh(ci(0, -478, 9), "red", { w: "detail" }), sh(rr(-56, -484, 112, 20, 10), "gold", { w: "detail" }), spark(110, -330, 14), spark(-120, -290, 10), spark(100, -170, 9)]);
}, { face: "happy" });
CL("crt-gnome", "Garden gnome", ["gnome", "garden", "dwarf", "red hat", "beard", "fairy tale", "folk", "little"], 'face: "smile|happy|shocked|sad|angry|…", pose', [-170, -440, 340, 460], (o) => {
  const k = kd(o, "smile"), A = armGeo(o.pose || "stand", [-56, -150], [56, -150], 58);
  return J([L.shadow(0, 0, 170), [-1, 1].map((sd) => sh(rr(sd * 22 - 22, -26, 44, 26, 12), "brown")).join(""), sh(rr(-44, -90, 88, 70, 14), "blue", { tone: 2 }), A.map((p) => tube(p, 24, 20, "blue") + sh(ci(p[2][0], p[2][1], 12), "pink", { w: "detail" })).join(""),
    sh(rr(-58, -180, 116, 100, 30), "blue"), sh(rr(-58, -126, 116, 14, 4), "ink", { w: "detail" }), sh(rr(-10, -130, 20, 22, 4), "gold", { w: "detail" }),
    sh(L.smooth([[-60, -262], [60, -262], [72, -200], [34, -78], [0, -58], [-34, -78], [-72, -200], [-60, -262]]), "white"), stk("M-30 -150 q10 12 0 24 M0 -160 q10 14 0 28 M30 -150 q-10 12 0 24", 3, "gray"), sh(ci(0, -234, 22, 17), "pink"),
    eyes(k, 0, -266, 28, 10), mouth(k, 0, -196, 26), sh(L.smooth([[-76, -276], [76, -276], [52, -350], [20, -412], [-12, -416], [-48, -340], [-76, -276]]), "red"), hi(-30, -330, 14, 28, 0.35)]);
});
CL("crt-cactus-friend", "Friendly cactus in a pot", ["cactus", "desert", "plant", "pot", "spiky", "hug", "flower", "friendly"], 'face: "smile|happy|shocked|sad|angry|…", pose', [-170, -380, 340, 400], (o) => {
  const k = kd(o, "happy"), c = o.color || "green", up = o.pose === "wave" || o.pose === "cheer";
  const petal = Array.from({ length: 5 }, (_, i) => { const a = (i / 5) * PI * 2 - PI / 2; return sh(ci(Math.cos(a) * 17, -332 + Math.sin(a) * 17, 13), "pink", { w: "detail" }); }).join("");
  return J([L.shadow(0, 0, 210), sh(L.limb([[-46, -150], [-102, -150], [-102, -236]], 36, 34), c), sh(L.limb([[46, -170], [102, -170], [102, up ? -280 : -230]], 36, 34), c), sh(rr(-52, -310, 104, 250, 52), c), [-26, 26].map((x) => stk(`M${x} -290 V-80`, 3, "ink").replace('stroke-width="3"', 'stroke-width="3" opacity="0.12"')).join(""),
    [[-30, -280], [34, -250], [-36, -130], [30, -110], [-104, -230], [104, -226]].map(([x, y]) => stk(`M${x - 5} ${y - 5} l10 10 M${x + 5} ${y - 5} l-10 10`, 2.5, "paper")).join(""), petal, sh(ci(0, -332, 8), "yellow", { w: "detail" }),
    face2(k, 0, -206, 44, { er: 0.26 }), hi(-30, -280, 8, 30, 0.35), sh(L.poly([[-70, -76], [70, -76], [56, 0], [-56, 0]], true), "orange"), sh(rr(-80, -92, 160, 24, 10), "orange", { tone: 1 })]);
});
CL("crt-mushroom-man", "Mushroom character", ["mushroom", "toadstool", "fungus", "forest", "spots", "cute", "red cap", "character"], 'face: "smile|happy|shocked|sad|…", pose', [-180, -360, 360, 380], (o) => {
  const k = kd(o, "happy"), A = armGeo(o.pose || "stand", [-52, -130], [52, -130], 58);
  return J([L.shadow(0, 0, 190), legs([-24, 24], -64, 0, 14, "cream", "brown"), A.map((p) => tube(p, 17, 14, "cream") + sh(ci(p[2][0], p[2][1], 11), "cream", { w: "detail" })).join(""), sh(rr(-54, -196, 108, 136, 40), "cream"),
    sh(L.smooth([[-134, -176], [-124, -252], [-62, -314], [0, -324], [62, -314], [124, -252], [134, -176], [0, -160], [-134, -176]]), "red"), [[-70, -250, 20], [34, -284, 17], [80, -214, 15], [-26, -206, 11], [-112, -194, 9]].map(([x, y, r]) => dt(ci(x, y, r), "white")).join(""), hi(-68, -290, 26, 10, 0.4),
    face2(k, 0, -128, 42, { er: 0.26 })]);
});
CL("crt-rock-golem", "Rock golem (mossy, friendly)", ["golem", "rock", "stone", "giant", "moss", "fantasy", "boulder", "creature", "friendly"], 'face: "smile|happy|shocked|sad|angry|…", pose', [-230, -440, 460, 460], (o) => {
  const k = kd(o, "smile"), A = armGeo(o.pose || "stand", [-122, -230], [122, -230], 110), rock = (cx, cy, r, n, seed) => { const g = L.rng(seed); return L.poly(Array.from({ length: n }, (_, i) => { const a = (i / n) * PI * 2; return [cx + Math.cos(a) * r * (0.84 + g() * 0.3), cy + Math.sin(a) * r * (0.84 + g() * 0.3)]; }), true); };
  return J([L.shadow(0, 0, 300), [-1, 1].map((sd) => sh(rr(sd * 70 - 38, -100, 76, 100, 14), "stone", { tone: 1 })).join(""), A.map((p) => tube(p, 62, 54, "stone") + sh(rock(p[2][0], p[2][1], 38, 8, 3), "stone", { w: "detail", tone: 1 })).join(""),
    sh(rock(0, -200, 124, 11, 7), "stone"), L.flat(L.smooth([[-86, -270], [-40, -300], [20, -290], [10, -266], [-30, -256], [-60, -240], [-86, -270]]), "green", 0.85), sh(rock(0, -318, 76, 9, 11), "stone", { tone: 1 }),
    stk("M-80 -190 l30 20 l-10 26 M60 -160 l30 -14 M-20 -120 l14 22", 4, "ink").replace('stroke-width="4"', 'stroke-width="4" opacity="0.35"'), stk("M0 -394 Q-2 -420 6 -430", 5, "green"), sh(L.smooth([[6, -430], [34, -440], [30, -416], [6, -430]]), "green", { w: "detail" }), sh(L.smooth([[2, -418], [-26, -432], [-24, -408], [2, -418]]), "green", { w: "detail" }),
    eyes(k, 0, -326, 28, 15, { iris: "teal" }), mouth(k, 0, -284, 44), hi(-60, -240, 20, 10, 0.25)]);
});
CL("crt-star-friend", "Star character (floating)", ["star", "night", "sparkle", "wish", "character", "sky", "cute", "twinkle"], 'face: "smile|happy|shocked|sad|sleepy|…"', [-200, -200, 400, 400], (o) => {
  const k = kd(o, "happy");
  return J([sh(L.star(0, 0, 150, 72, 5), o.color || "yellow"), hi(-50, -60, 26, 12, 0.5), face2(k, 0, 8, 72, { er: 0.24, ey: 0.12 }), spark(-160, -120, 12, "yellow"), spark(150, 100, 10, "yellow"), spark(130, -140, 8, "yellow")]);
}, {}, "y");
CL("crt-scarecrow", "Friendly scarecrow", ["scarecrow", "farm", "field", "straw", "harvest", "autumn", "hat", "crows"], 'face: "smile|happy|shocked|sad|…"', [-200, -460, 400, 480], (o) => {
  const k = kd(o, "smile"), straw = (x, y, d) => sh(L.poly([[x, y - 10], [x + d * 28, y - 24], [x + d * 22, y - 4], [x + d * 34, y + 8], [x + d * 4, y + 12]], true), "yellow", { w: "detail" });
  return J([L.shadow(0, 0, 150), sh(rr(-10, -340, 20, 340, 4), "wood"), sh(rr(-158, -270, 316, 20, 10), "wood"), straw(-158, -260, -1), straw(158, -260, 1), [-1, 1].map((sd) => sh(rr(sd * 24 - 22, -170, 44, 114, 12), "brown")).join(""), straw(-24, -52, -1), straw(24, -52, 1),
    sh(rr(-58, -300, 116, 140, 18), "blue"), dt(rr(8, -250, 34, 34, 4), "red"), stk("M8 -250 h34 v34 h-34 z", 2, "paper").replace(/stroke-linecap/, 'stroke-dasharray="5 4" stroke-linecap'), sh(ci(-22, -190, 6), "gold", { w: "detail" }), sh(ci(0, -346, 54), "sand"), stk("M-30 -304 v14 M-22 -304 v14 M30 -304 v14 M22 -304 v14", 2.5),
    sh(L.circ(0, -388, 84, 16), "yellow", { tone: 1 }), sh(L.smooth([[-54, -392], [-40, -444], [0, -456], [40, -444], [54, -392], [-54, -392]]), "yellow", { tone: 1 }), sh(rr(-54, -404, 108, 16, 6), "red", { w: "detail" }), face2(k, 0, -338, 44, { er: 0.24 })]);
});
CL("crt-parrot-pirate", "Pirate parrot (bandana, eye patch)", ["parrot", "pirate", "bird", "macaw", "bandana", "eyepatch", "ship", "pet", "squawk"], 'face: "smile|happy|shocked|angry|…"', [-190, -450, 380, 470], (o) => {
  const k = kd(o, "happy"), wing = (sd) => sh(L.smooth([[sd * 56, -330], [sd * 92, -276], [sd * 80, -196], [sd * 52, -226], [sd * 50, -290], [sd * 56, -330]]), "blue") + stk(`M${sd * 66} -290 L${sd * 76} -230`, 5, "yellow");
  return J([L.shadow(0, 0, 150), sh(rr(-10, -214, 20, 214, 4), "wood"), sh(L.circ(0, -4, 60, 12), "wood"), sh(rr(-100, -226, 200, 18, 9), "wood"),
    [0, 1, 2].map((i) => sh(L.limb([[(i - 1) * 16, -250], [(i - 1) * 26, -190], [(i - 1) * 40, -120]], 22, 14), ["red", "blue", "yellow"][i], { w: "detail" })).join(""), wing(-1), wing(1), sh(ci(0, -296, 62, 78), "red"), dt(ci(0, -280, 38, 52), "red", { tone: 1 }),
    [-1, 1].map((sd) => sh(ci(sd * 26, -226, 18, 8), "orange", { w: "detail" })).join(""), sh(ci(0, -372, 52), "red"), hi(-26, -404, 18, 8, 0.4),
    sh(L.smooth([[-52, -380], [52, -380], [48, -418], [0, -432], [-48, -418], [-52, -380]]), "navy", { w: "detail" }), [[-24, -402], [10, -414], [30, -394]].map(([x, y]) => L.flat(ci(x, y, 4), "white")).join(""), sh(L.poly([[48, -386], [76, -372], [72, -352], [50, -372]], true), "navy", { w: "detail" }),
    goog(-24, -372, 13, 0.4, { p: k === "shocked" ? 0.3 : 0.5 }), brow(-24, -372, 13, -1, k, 5), L.flat(ci(26, -372, 14, 12), "ink"), stk("M12 -396 L44 -350", 4),
    sh(L.smooth([[-20, -352], [20, -352], [22, -322], [4, -300], [-14, -312], [-20, -352]]), "cream", { w: "detail" }), k === "happy" || k === "shocked" ? L.flat(L.poly([[-12, -318], [12, -318], [0, -304]], true), "pink") : "", sh(ci(-56, -362, 6), "gold", { w: "detail" })]);
});

// ---------- character parts used by the people below (registered into the person tables) ----------
const HD = (a) => ({ hx: a.hd[0], hy: a.hd[1], R: a.R, w: 3 * Math.sqrt(Math.max(a.s, 0.3)) });
L.ACC["crt-nemes"] = { draw(a) { // pharaoh-style striped headdress + ceremonial beard (drawn before the face)
  const { hx, hy, R, w } = HD(a), P = [...L.arcPts(hx, hy, R * 1.14, 182, 358, 14), [hx + R * 0.96, hy - 0.3 * R], [hx, hy - 0.5 * R], [hx - R * 0.96, hy - 0.3 * R]]; P.push(P[0]);
  const lap = (sd) => sh(L.poly([[hx + sd * R * 0.9, hy - 0.1 * R], [hx + sd * R * 1.3, hy + 0.5 * R], [hx + sd * R * 1.42, hy + 2.1 * R], [hx + sd * R * 0.72, hy + 2.1 * R], [hx + sd * R * 0.68, hy + 0.6 * R]], true), "gold", { w: "detail" }) +
    [0.9, 1.3, 1.7].map((t) => stk(L.line([hx + sd * R * 0.72, hy + t * R], [hx + sd * R * 1.38, hy + t * R]), w, "blue")).join("");
  return lap(-1) + lap(1) + sh(L.smooth(P), "gold", { w: "detail" }) + [1, 2].map((i) => stk(L.arc(hx, hy, R * (1.14 - i * 0.2), 205, 335), w, "blue")).join("") + sh(rr(hx - 0.1 * R, hy + 0.9 * R, 0.2 * R, 0.55 * R, 0.06 * R), "blue", { w: "detail" });
} };
L.ACC["crt-regalia"] = { front: true, draw(a) { // crook (right hand) and flail (left hand), held upright
  const s = a.s, w = 7 * Math.sqrt(s), hr = a.hands[1], hl = a.hands[0], top = (h) => h[1] - 140 * s;
  return stk(L.line([hr[0], hr[1] + 36 * s], [hr[0], top(hr)]), w, "gold") + stk(L.arc(hr[0] + 12 * s, top(hr), 12 * s, 180, 360), w, "gold") + stk(L.line([hl[0], hl[1] + 36 * s], [hl[0], top(hl)]), w, "gold") +
    [[-16, 22], [0, 30], [16, 22]].map(([x, y]) => stk(L.line([hl[0], top(hl)], [hl[0] + x * s, top(hl) + y * s]), w * 0.45, "gold") + sh(ci(hl[0] + x * s * 1.15, top(hl) + y * s * 1.3, 5 * s), "blue", { w: "detail", s })).join("");
} };
L.OUTFITS["crt-kilt"] = (S, hip, s, W, c) => sh(rr(S[0] - 30 * s * W, S[1] - 2 * s, 60 * s * W, hip[1] - S[1] - 8 * s, 10 * s), "s3", { s }) +
  sh(L.poly([[S[0] - 34 * s * W, hip[1] - 26 * s], [S[0] + 34 * s * W, hip[1] - 26 * s], [S[0] + 46 * s * W, hip[1] + 62 * s], [S[0] - 46 * s * W, hip[1] + 62 * s]], true), c, { s }) + sh(rr(S[0] - 34 * s * W, hip[1] - 32 * s, 68 * s * W, 14 * s, 4 * s), "gold", { w: "detail", s }) +
  stk(`M${f1(S[0] - 14 * s)} ${f1(hip[1] - 14 * s)} L${f1(S[0] - 18 * s)} ${f1(hip[1] + 60 * s)} M${f1(S[0] + 14 * s)} ${f1(hip[1] - 14 * s)} L${f1(S[0] + 18 * s)} ${f1(hip[1] + 60 * s)}`, 2.5 * Math.sqrt(s), "stone") +
  sh(L.smooth([[S[0] - 36 * s, S[1] - 4 * s], [S[0] + 36 * s, S[1] - 4 * s], [S[0] + 48 * s, S[1] + 26 * s], [S[0], S[1] + 50 * s], [S[0] - 48 * s, S[1] + 26 * s], [S[0] - 36 * s, S[1] - 4 * s]]), "gold", { w: "detail", s }) + stk(L.arc(S[0], S[1] + 6 * s, 30 * s, 40, 140), 4 * Math.sqrt(s), "blue");
L.ACC["crt-mask"] = { draw(a, o) { const { hx, hy, R } = HD(a), p = (x, y) => [hx + x * R, hy + y * R];
  return sh(L.smooth([p(-0.98, -0.3), p(-0.5, -0.5), p(0, -0.34), p(0.5, -0.5), p(0.98, -0.3), p(0.86, 0.14), p(0.38, 0.18), p(0, 0.02), p(-0.38, 0.18), p(-0.86, 0.14), p(-0.98, -0.3)]), o.maskC || "red", { w: "detail" }); } };
L.ACC["crt-emblem"] = { front: true, draw(a) { const s = a.s, x = a.sh[0], y = a.sh[1] + 42 * s; return sh(ci(x, y, 19 * s), "gold", { w: "detail", s }) + L.flat(L.star(x, y, 14 * s, 6 * s, 5), "red"); } };
L.HAIR["crt-cape"] = (hx, hy, R, c) => { const k = R / 50, y0 = hy + R + 2; return { back: L.shape(L.smooth([[hx - 26 * k, y0], [hx + 26 * k, y0], [hx + 78 * k, y0 + 130 * k], [hx + 94 * k, y0 + 205 * k], [hx + 44 * k, y0 + 190 * k], [hx, y0 + 206 * k], [hx - 44 * k, y0 + 190 * k], [hx - 94 * k, y0 + 205 * k], [hx - 78 * k, y0 + 130 * k], [hx - 26 * k, y0]]), c, { w: "char" }) }; };
L.ACC["crt-slick"] = { draw(a) { const { hx, hy, R } = HD(a);
  return sh(L.smooth([...L.arcPts(hx, hy, R * 1.06, 185, 355, 14), [hx + 0.7 * R, hy - 0.45 * R], [hx + 0.2 * R, hy - 0.3 * R], [hx, hy - 0.1 * R], [hx - 0.2 * R, hy - 0.3 * R], [hx - 0.7 * R, hy - 0.45 * R], [hx + 0 * R, hy - R * 1.06]]), "ink", { w: "hair" }); } };
L.ACC["crt-fangs"] = { front: true, draw(a) { const { hx, hy, R } = HD(a); return [-1, 1].map((sd) => L.shape(L.poly([[hx + sd * 0.26 * R, hy + 0.34 * R], [hx + sd * 0.12 * R, hy + 0.34 * R], [hx + sd * 0.19 * R, hy + 0.56 * R]], true), "white", { w: "hair" })).join(""); } };
L.ACC["crt-zhead"] = { draw(a) { const { hx, hy, R, w } = HD(a);
  return sh(ci(hx, hy, R), "green", { w: "char", s: a.s }) + [-1, 1].map((sd) => L.flat(ci(hx + sd * 0.34 * R, hy + 0.16 * R, 0.22 * R, 0.08 * R), "ink", 0.3)).join("") + stk(`M${f1(hx - 0.5 * R)} ${f1(hy - 0.62 * R)} l${f1(0.4 * R)} ${f1(0.12 * R)} M${f1(hx - 0.44 * R)} ${f1(hy - 0.72 * R)} v${f1(0.2 * R)} M${f1(hx - 0.3 * R)} ${f1(hy - 0.68 * R)} v${f1(0.2 * R)} M${f1(hx - 0.16 * R)} ${f1(hy - 0.64 * R)} v${f1(0.2 * R)}`, w * 0.7); } };
L.ACC["crt-witchhat"] = { front: true, draw(a) { const { hx, hy, R } = HD(a), by = hy - 0.7 * R;
  return sh(L.circ(hx, by, R * 1.5, R * 0.28), "ink", { w: "char", s: a.s }) + sh(L.smooth([[hx - R * 0.9, by], [hx + R * 0.9, by], [hx + R * 0.5, by - R * 1.2], [hx + R * 0.7, by - R * 2.0], [hx + R * 1.2, by - R * 2.2], [hx + R * 0.1, by - R * 2.4], [hx - R * 0.5, by - R * 1.2], [hx - R * 0.9, by]]), "ink", { w: "char", s: a.s }) + sh(rr(hx - R * 0.8, by - R * 0.42, R * 1.6, R * 0.34, R * 0.08), "purple", { w: "detail" }) + sh(rr(hx - R * 0.14, by - R * 0.42, R * 0.28, R * 0.34, R * 0.04), "gold", { w: "detail" }); } };
L.ACC["crt-bone"] = { front: true, draw(a) { const { hx, hy, R } = HD(a), y = hy - 1.22 * R; return stk(L.line([hx - 0.5 * R, y], [hx + 0.78 * R, y - 0.1 * R]), 11 * Math.sqrt(a.s), "ink") + stk(L.line([hx - 0.5 * R, y], [hx + 0.78 * R, y - 0.1 * R]), 6 * Math.sqrt(a.s), "white") + [[-0.5, 0], [0.78, -0.1]].map(([dx, dy]) => [-1, 1].map((m) => sh(ci(hx + dx * R + (dx < 0 ? -0.04 : 0.04) * R, y + dy * R + m * 0.1 * R, 0.1 * R), "white", { w: "hair" })).join("")).join(""); } };
L.ACC["crt-goggles"] = { front: true, draw(a) { const { hx, hy, R, w } = HD(a);
  return stk(L.line([hx - R * 1.0, hy - 0.62 * R], [hx + R * 1.0, hy - 0.62 * R]), w * 1.6, "navy") + [-1, 1].map((sd) => sh(ci(hx + sd * 0.42 * R, hy - 0.66 * R, 0.3 * R), "glass", { w: "detail", s: a.s }) + stk(L.arc(hx + sd * 0.42 * R, hy - 0.66 * R, 0.2 * R, 200, 270), w * 0.8, "teal")).join(""); } };

// ---------- ancient people ----------
const G10 = "Ancient and fantasy people", G11 = "Heroes and time";
const PERSON = (name, g, label, tags, opt, base, extra, demo, box) => reg(name, { box: box || [-190, -420, 380, 440], g, l: label, tags: ["person", "character"].concat(tags), opt, demo: demo || {} }, (o) => {
  const po = Object.assign({}, base, o);
  return person(po) + (extra ? extra(L.anchors(po), po) : "");
});
const boneProp = (x1, y1, x2, y2, r = 9) => stk(L.line([x1, y1], [x2, y2]), r * 1.1 + 6, "ink") + stk(L.line([x1, y1], [x2, y2]), r * 1.1, "white") + [[x1, y1], [x2, y2]].map(([x, y]) => sh(ci(x - 4, y - 5, r * 0.7), "white", { w: "detail" }) + sh(ci(x + 4, y + 5, r * 0.7), "white", { w: "detail" })).join("");
PERSON("crt-caveman", G10, "Caveman with club", ["caveman", "stone age", "prehistoric", "club", "primitive", "ancient", "history"], 'face, pose', { style: "man03", body: "muscular", outfit: "caveman", outfitC: "orange", hair: "messy", hairC: "brown", acc: ["beard"], face: "smile", pose: "stand" },
  (A) => { const h = A.hands[1]; return sh(L.limb([[h[0] - 4, h[1] + 34], [h[0] + 6, h[1] - 40], [h[0] + 18, h[1] - 112]], 14, 46), "wood") + dt(ci(h[0] + 14, h[1] - 96, 5), "wood", { tone: 2 }) + dt(ci(h[0] + 24, h[1] - 118, 5), "wood", { tone: 2 }) + sh(ci(h[0], h[1], 11), "white", { w: "detail" }); });
PERSON("crt-cavewoman", G10, "Cavewoman with berry basket", ["cavewoman", "stone age", "prehistoric", "basket", "gatherer", "ancient", "history"], 'face, pose', { style: "girl01", outfit: "caveman", outfitC: "orange", hair: "bun", hairC: "brown", acc: ["crt-bone"], face: "happy", pose: "stand" },
  (A) => { const h = A.hands[0]; return stk(L.arc(h[0], h[1] + 4, 28, 180, 360), 5, "wood") + sh(L.poly([[h[0] - 34, h[1] + 6], [h[0] + 34, h[1] + 6], [h[0] + 24, h[1] + 52], [h[0] - 24, h[1] + 52]], true), "wood") + [-16, 0, 16].map((x) => sh(ci(h[0] + x, h[1] + 4, 9), "red", { w: "detail" })).join("") + stk(`M${f1(h[0] - 26)} ${f1(h[1] + 24)} H${f1(h[0] + 26)}`, 3, "wood"); });
PERSON("crt-cave-kid", G10, "Cave kid with a bone", ["cave kid", "child", "stone age", "prehistoric", "bone", "ancient", "history"], 'face, pose', { style: "man05", body: "kid", outfit: "caveman", outfitC: "orange", hair: "spiky", hairC: "brown", face: "excited", pose: "stand" },
  (A) => { const h = A.hands[1]; return boneProp(h[0] - 2, h[1] + 24, h[0] + 12, h[1] - 36, 8); }, {}, [-150, -290, 300, 310]);
reg("crt-cave-family", { box: [-300, -420, 600, 440], g: G10, l: "Cave family (three)", tags: ["cave", "family", "stone age", "prehistoric", "group", "caveman", "cavewoman", "kid"], opt: '', demo: {} }, () =>
  J([L.g(L.inline("crt-cavewoman"), "translate(-170 0) scale(0.95)"), L.g(L.inline("crt-caveman"), "translate(20 0)"), L.g(L.inline("crt-cave-kid"), "translate(190 0) scale(0.95)")]));
PERSON("crt-pharaoh", G10, "Pharaoh-style ruler (generic ancient king)", ["pharaoh", "ancient", "king", "ruler", "egypt-style", "headdress", "history", "royal", "crook and flail"], 'face: "proud|smile|…"', { style: "man01", outfit: "crt-kilt", outfitC: "white", acc: ["crt-nemes", "crt-regalia"], face: "proud", pose: "stand" });

// ---------- silly monsters and fantasy people ----------
PERSON("crt-zombie-silly", G10, "Silly zombie (no gore)", ["zombie", "halloween", "silly", "undead", "green", "arms out", "funny", "walking"], 'face: "silly|dizzy|…"', { style: "man03", outfit: "sweater", outfitC: "gray", hair: "messy", hairC: "ink", acc: ["crt-zhead"], armC: "green", face: "silly", pose: "arms-out" },
  (A) => A.hands.map((h) => sh(ci(h[0], h[1], 14), "green", { w: "detail" })).join(""));
PERSON("crt-witch-broom", G10, "Friendly witch with broom", ["witch", "halloween", "broom", "hat", "magic", "fairy tale", "fantasy", "spell"], 'face', { style: "girl04", outfit: "dress", outfitC: "purple", hair: "long", hairC: "ink", acc: ["crt-witchhat"], face: "happy", pose: "stand" },
  (A) => { const h = A.hands[1]; return sh(rr(h[0] - 4, -330, 8, 322, 3), "wood", { w: "detail" }) + sh(L.poly([[h[0] - 30, -80], [h[0] + 30, -80], [h[0] + 46, 0], [h[0] - 46, 0]], true), "yellow", { tone: 1 }) + stk(`M${f1(h[0] - 14)} -70 V-6 M${f1(h[0] + 14)} -70 V-6`, 3) + sh(rr(h[0] - 12, -96, 24, 20, 4), "brown", { w: "detail" }) + sh(ci(h[0], h[1], 12), "white", { w: "detail" }); });
PERSON("crt-vampire-kid", G10, "Cute vampire kid (cape, fangs)", ["vampire", "halloween", "kid", "cape", "fangs", "costume", "cute", "spooky"], 'face', { style: "man05", body: "kid", outfit: "tee", outfitC: "ink", hair: "crt-cape", hairC: "red", acc: ["crt-slick", "crt-fangs"], face: "smile", pose: "hips" }, null, {}, [-150, -290, 300, 310]);

// ---------- heroes, villains, time ----------
PERSON("crt-hero", G11, "Superhero (original, mask + cape)", ["superhero", "hero", "cape", "mask", "strong", "powerful", "rescue", "comic"], 'face: "determined|smile|…", pose: "hips"', { style: "man03", body: "muscular", outfit: "superhero", outfitC: "blue", hair: "short", hairC: "ink", acc: ["crt-mask", "crt-emblem"], maskC: "red", face: "determined", pose: "hips" });
PERSON("crt-villain", G11, "Cartoon villain (silly, cape, moustache)", ["villain", "evil", "mastermind", "cape", "mask", "moustache", "bad guy", "comic", "funny"], 'face: "mischief|angry|…", pose: "cross"', { style: "man04", outfit: "suit", outfitC: "navy", hair: "crt-cape", hairC: "purple", acc: ["crt-mask", "moustache"], maskC: "ink", beardC: "ink", face: "mischief", pose: "cross" });
reg("crt-time-traveller", { box: [-210, -430, 520, 450], g: G11, l: "Time traveller (goggles, gadget, time portal)", tags: ["time traveller", "time travel", "portal", "future", "past", "clock", "gadget", "goggles", "sci-fi"], opt: 'face, pose', demo: {} }, (o) => {
  const po = Object.assign({ style: "man08", outfit: "jacket", outfitC: "gray", hair: "short", hairC: "orange", acc: ["crt-goggles"], face: "excited", pose: "point" }, o), A = L.anchors(po), h = A.hands[1], px = 130, py = -200;
  const tick = Array.from({ length: 12 }, (_, i) => { const a = (i / 12) * PI * 2; return stk(L.line([px + Math.cos(a) * 62, py + Math.sin(a) * 90], [px + Math.cos(a) * 72, py + Math.sin(a) * 104]), 4, "navy"); }).join("");
  const portal = J([sh(L.circ(px, py, 100, 150), "blue"), sh(L.circ(px, py, 84, 130), "sky", { w: "detail" }), sh(L.circ(px, py, 56, 90), "white", { w: "detail" }), tick, stk(L.line([px, py], [px, py - 60]), 6, "navy"), stk(L.line([px, py], [px + 38, py + 20]), 6, "navy"), sh(ci(px, py, 8), "red", { w: "detail" }),
    stk(L.arc(px, py, 92, 200, 300, 140), 3, "white"), spark(px - 118, py - 100, 11, "yellow"), spark(px + 112, py + 120, 9, "yellow")]);
  return J([L.g(portal, "translate(10 0)"), L.g(person(po) + sh(rr(h[0] - 17, h[1] - 38, 34, 46, 8), "navy", { w: "detail" }) + sh(rr(h[0] - 11, h[1] - 32, 22, 22, 5), "teal", { w: "detail" }) + L.flat(ci(h[0], h[1] - 21, 4), "white") + sh(ci(h[0], h[1] + 4, 11), "white", { w: "detail" }), "translate(-70 0)")]);
});

// ---------- clones ----------
const clones = (o, n, odd, rows) => {
  const same = { style: "man01", face: "smile", pose: "stand", outfit: "tee", outfitC: "blue" }, other = { style: "man01", face: "shocked", pose: "shrug", outfit: "tee", outfitC: "red", hair: "spiky" };
  const row = (cnt, sc, gap, y, oddI) => Array.from({ length: cnt }, (_, i) => L.g(person(Object.assign({}, i === oddI ? other : same, i === oddI ? {} : o)), `translate(${f1((i - (cnt - 1) / 2) * gap)} ${y}) scale(${sc})`)).join("");
  return rows ? row(5, 0.5, 150, -50, -1) + row(4, 0.62, 160, 0, odd !== undefined ? odd : -1) : row(n, 0.64, 142, 0, odd !== undefined ? odd : -1);
};
reg("crt-clones-line", { box: [-460, -280, 920, 300], g: G11, l: "Clone line-up (identical stick men)", tags: ["clones", "copies", "identical", "line up", "duplicates", "dave", "army", "many"], opt: 'n: 6, odd: index of the different one', demo: {} }, (o) => clones(o, o.n || 6, o.odd));
reg("crt-clones-odd-one", { box: [-460, -300, 920, 320], g: G11, l: "Clones with one odd one out", tags: ["clones", "odd one out", "different", "identical", "copies", "stand out", "dave", "individual"], opt: 'n: 6, odd: 3', demo: { odd: 3 } }, (o) => clones(o, o.n || 6, o.odd !== undefined ? o.odd : 3) + L.text("?", ((o.odd !== undefined ? o.odd : 3) - ((o.n || 6) - 1) / 2) * 142, -230, { size: 90, c: "gold", halo: "ink" }));
reg("crt-clones-crowd", { box: [-440, -280, 880, 300], g: G11, l: "Clone crowd (two rows)", tags: ["clones", "crowd", "copies", "identical", "army", "many", "dave", "duplicates", "population"], opt: '', demo: {} }, (o) => clones(o, 0, o.odd, true));
})();
