// ===================== library/mind.js — psychology metaphors for "mind and feelings" episodes (category "mind") =====================
// Heads with weather, stress meters, batteries, masks, mirrors, habit loops, memory, inner voices, growth, kindness.
// Everything is a centred (floating) asset; labels go through L.text and switch off with o.labels === false.
(function () {
const L = window.L, f1 = L.f1;
const CAT = "mind", PI = Math.PI, D2R = PI / 180;

// ---------- helpers ----------
const P = (r, a, cx = 0, cy = 0) => [cx + r * Math.cos(a * D2R), cy + r * Math.sin(a * D2R)];
const pt = (v) => `${f1(v[0])} ${f1(v[1])}`;
const fl = (d, c, tone = 0, op) => L.tag("path", { d, fill: L.c(c, tone), opacity: op });
const sh = (d, c, o) => L.shape(d, c, o);
const st = (d, o) => L.stroke(d, o);
let nid = 0;
const clip = (d, inner) => { const id = "mnc" + ++nid; return `<clipPath id="${id}"><path d="${d}"/></clipPath><g clip-path="url(#${id})">${inner}</g>`; };
const lab = (o, s, x, y, size = 36, c, anchor) => (o.labels === false ? "" : L.text(s, x, y, { size, c, anchor, halo: c === "white" ? "ink" : "paper", haloW: 0.2 }));
const skin = (o) => (L.T.head.fill === "white" ? "white" : o.skin || "s2");
const arrow = (pts, c = "ink", w = "prop", hs = 20) => {
  const a = pts[pts.length - 2], b = pts[pts.length - 1], ang = Math.atan2(b[1] - a[1], b[0] - a[0]);
  const h = (d) => [b[0] - hs * Math.cos(ang + d), b[1] - hs * Math.sin(ang + d)];
  return st(pts.length > 2 ? L.smooth(pts) : L.poly(pts), { c, w }) + st(L.poly([h(0.5), b, h(-0.5)]), { c, w });
};
// one outlined blob from overlapping circles [x, y, r]: single outer outline, each puff shaded on its own
const puff = (cs, c = "white") =>
  cs.map(([x, y, r]) => sh(L.circ(x, y, r), c, { w: "prop", flat: true })).join("") +
  cs.map(([x, y, r]) => L.tag("path", { d: L.circ(x, y, Math.max(r - L.lw("prop") / 2 + 0.5, 1)), fill: L.paint(c) })).join("");
const sector = (cx, cy, ro, ri, a0, a1) => L.poly([...L.arcPts(cx, cy, ro, a0, a1, 18), ...L.arcPts(cx, cy, ri, a1, a0, 18)], true);
const sparkle = (x, y, r, c = "yellow") => sh(L.star(x, y, r, r * 0.3, 4), c, { w: "detail" });
const heart = (x, y, r, c = "red", o = {}) => sh(`M${f1(x)} ${f1(y + r * 0.95)} C${f1(x - r * 1.5)} ${f1(y - r * 0.1)} ${f1(x - r * 0.7)} ${f1(y - r * 1.2)} ${f1(x)} ${f1(y - r * 0.35)} C${f1(x + r * 0.7)} ${f1(y - r * 1.2)} ${f1(x + r * 1.5)} ${f1(y - r * 0.1)} ${f1(x)} ${f1(y + r * 0.95)} Z`, c, Object.assign({ w: "detail" }, o));
const drop = (x, y, r, c = "water") => sh(`M${f1(x)} ${f1(y - r * 1.5)} C${f1(x + r * 0.2)} ${f1(y - r)} ${f1(x + r)} ${f1(y - r * 0.3)} ${f1(x + r)} ${f1(y + r * 0.3)} A${f1(r)} ${f1(r)} 0 0 1 ${f1(x - r)} ${f1(y + r * 0.3)} C${f1(x - r)} ${f1(y - r * 0.3)} ${f1(x - r * 0.2)} ${f1(y - r)} ${f1(x)} ${f1(y - r * 1.5)} Z`, c, { w: "detail" });
// union of circles / rects with ONE outline: parts [["c", x, y, r] | ["r", x, y, w, h, rad]]
const uni = (parts, c, o = {}) => {
  const d = (p, ins) => (p[0] === "c" ? L.circ(p[1], p[2], Math.max(p[3] - ins, 1)) : L.rrect(p[1] + ins, p[2] + ins, p[3] - 2 * ins, p[4] - 2 * ins, p[5] || 0));
  return parts.map((p) => sh(d(p, 0), c, Object.assign({ w: "prop", flat: true }, o))).join("") + parts.map((p) => L.tag("path", { d: d(p, L.lw(o.w || "prop") / 2 - 0.5), fill: L.paint(c, o) })).join("");
};
const reg = (name, fn, meta) => L.reg(CAT, name, fn, Object.assign({ box: [-250, -250, 500, 500], tags: ["mind", "psychology"] }, meta));
const call = (name, extra = "") => `L.put(S, "${name}", x, y, { s: 1, t${extra} })`;
const G = { head: "Heads and weather", stress: "Stress and energy", feel: "Feelings and faces", habit: "Habits and loops", mem: "Memory and learning",
  think: "Thoughts and inner voices", grow: "Growth and goals", conn: "Connection and self" };

// ---------- a side-on head (facing right), cranium centre at (cx, cy) when k = 1, ~260 tall ----------
const PROF = [[-38, 150], [-34, 112], [-72, 66], [-100, -4], [-88, -72], [-36, -110], [34, -104], [86, -58], [96, -10], [112, 28], [126, 46], [100, 62], [104, 78], [92, 106], [56, 124], [34, 120], [38, 150]];
const MOODS = { ok: [-44, -50, 0.0], happy: [-46, -54, 0.55], sad: [-38, -60, -0.5], worried: [-40, -62, -0.3], angry: [-60, -44, -0.35], tired: [-44, -44, -0.1] };
const headD = (cx, cy, k) => L.smooth(PROF.map(([x, y]) => [cx + x * k, cy + y * k])) + "Z";
const headSide = (cx, cy, k, o, mood = "ok") => {
  const X = (v) => cx + v * k, Y = (v) => cy + v * k, sk = skin(o), m = MOODS[mood] || MOODS.ok;
  const d = headD(cx, cy, k);
  let s = sh(L.rrect(X(-150), Y(138), 300 * k, 100 * k, 50 * k), o.outfit || "blue", { w: "char" });
  s += sh(L.circ(X(-14), Y(26), 19 * k, 25 * k), sk, { w: "detail" }) + sh(d, sk, { w: "char" });
  s += sh(L.circ(X(-14), Y(26), 19 * k, 25 * k), sk, { w: "detail", flat: true }).replace(/stroke="[^"]*"/, 'stroke="none"');
  s += st(L.arc(X(-12), Y(26), 8 * k, 200, 360), { w: "hair", op: 0.7 });
  const half = mood === "tired";
  s += L.tag("path", { d: L.circ(X(58), Y(-18), 13 * k), fill: L.c("white"), stroke: L.c("ink"), "stroke-width": L.lw("detail") }) + L.flat(L.circ(X(63), Y(-16), 6.5 * k), "ink") + L.flat(L.circ(X(65), Y(-19), 2 * k), "white");
  if (half) s += fl(`M${f1(X(45))} ${f1(Y(-18))} A${f1(13 * k)} ${f1(13 * k)} 0 0 1 ${f1(X(71))} ${f1(Y(-18))} Z`, skin(o) === "white" ? "white" : skin(o)) + st(L.line([X(44), Y(-18)], [X(72), Y(-18)]), { w: "detail" });
  s += st(L.smooth([[X(38), Y(m[0])], [X(58), Y(m[0] + m[2] * -12 - 8)], [X(80), Y(m[1])]]), { w: "prop" });
  const ox = 74, oy = 84;
  if (mood === "happy") s += st(L.smooth([[X(ox), Y(oy - 4)], [X(88), Y(oy + 12)], [X(104), Y(oy - 6)]]), { w: "detail" }) + fl(L.circ(X(52), Y(40), 12 * k, 8 * k), "pink", 0, 0.8);
  else if (mood === "sad" || mood === "worried") s += st(L.smooth([[X(ox), Y(oy + 6)], [X(88), Y(oy - 8)], [X(104), Y(oy + 4)]]), { w: "detail" });
  else if (mood === "angry") s += st(L.smooth([[X(ox), Y(oy + 4)], [X(90), Y(oy - 4)], [X(104), Y(oy + 6)]]), { w: "detail" });
  else s += st(L.smooth([[X(ox), Y(oy)], [X(90), Y(oy + 4)], [X(104), Y(oy)]]), { w: "detail" });
  return s;
};
// a white "mind" circle on the skull, with content clipped inside
const mindBox = (cx, cy, k, inner, c = "white") => {
  const mx = cx - 8 * k, my = cy - 40 * k, r = 68 * k;
  return sh(L.circ(mx, my, r), c, { w: "detail" }) + clip(L.circ(mx, my, r - 2), inner(mx, my, r));
};
const scribble = (cx, cy, R, seed, n = 34, turns = 2.35) => { const r = L.rng(seed); return L.smooth(Array.from({ length: n }, (_, i) => { const a = i * turns, rad = R * (0.45 + 0.55 * r()); return [cx + Math.cos(a) * rad, cy + Math.sin(a) * rad * 0.9]; })); };
const HEAD_BOX = [-230, -300, 460, 520], HY = 60, HX = -20;

reg("mind-head-storm", (o) => {
  const cs = [[-90, -190, 48], [-40, -222, 62], [30, -216, 58], [86, -186, 46], [-10, -170, 54]];
  let s = headSide(HX, HY, 1, o, "sad");
  s += puff(cs, "gray");
  s += sh(L.poly([[-4, -150], [30, -150], [8, -108], [34, -108], [-24, -48], [-6, -96], [-30, -96]], true), "yellow", { w: "detail" });
  [[-80, -140], [-60, -112], [70, -150], [92, -122], [52, -118], [-100, -106]].forEach(([x, y]) => (s += st(L.poly([[x, y], [x - 8, y + 24]]), { c: "blue", w: "prop" })));
  return s;
}, { box: HEAD_BOX, group: G.head, label: "Storm cloud over a head", tags: ["mind", "sad", "anxiety", "bad mood", "rain", "depressed"], call: call("mind-head-storm"), demo: {} });

reg("mind-head-sunny", (o) => {
  let s = headSide(HX, HY, 1, o, "happy");
  for (let i = 0; i < 10; i++) s += st(L.poly([P(70, i * 36 - 90, 0, -170), P(100, i * 36 - 90, 0, -170)]), { c: "orange", w: "prop" });
  s += sh(L.circ(0, -170, 54), "yellow", { w: "prop" }) + fl(L.circ(-16, -186, 20, 12), "white", 0, 0.5);
  s += sparkle(-120, -90, 14) + sparkle(120, -110, 11, "orange");
  return s;
}, { box: HEAD_BOX, group: G.head, label: "Sunshine over a head", tags: ["mind", "happy", "good mood", "calm", "positive"], call: call("mind-head-sunny"), demo: {} });

reg("mind-head-fog", (o) => {
  let s = headSide(HX, HY, 1, o, "tired");
  const fog = [[-70, -50, 62], [-10, -92, 70], [60, -60, 58], [-20, -20, 62], [-96, -10, 40], [34, -22, 46]];
  s += fog.map(([x, y, r]) => fl(L.circ(x, y, r), "white", 0, 0.9)).join("");
  s += st(L.smooth([[-90, -70], [-40, -90], [10, -66], [60, -90]]), { c: "gray", w: "detail", op: 0.6 }) + st(L.smooth([[-80, -30], [-30, -48], [30, -26], [70, -44]]), { c: "gray", w: "detail", op: 0.6 });
  s += L.text("?", -20, -155, { size: 72, c: "gray" }) + L.text("?", 70, -120, { size: 44, c: "gray" }) + L.text("?", -105, -125, { size: 40, c: "gray" });
  return s;
}, { box: HEAD_BOX, group: G.head, label: "Brain fog", tags: ["mind", "confused", "tired", "foggy", "cloudy thinking", "sleep deprived"], call: call("mind-head-fog"), demo: {} });

reg("mind-head-tangle", (o) => {
  let s = headSide(HX, HY, 1, o, "worried");
  s += mindBox(HX, HY, 1, (x, y, r) => st(scribble(x, y, r * 1.0, 4, 26, 2.2), { c: "red", w: "prop" }) + st(scribble(x, y, r * 0.85, 11, 22, 2.7), { c: "ink", w: "detail", op: 0.8 }));
  return s;
}, { box: HEAD_BOX, group: G.head, label: "Overthinking tangle in a head", tags: ["mind", "overthinking", "scribble", "anxiety", "messy thoughts", "worry"], call: call("mind-head-tangle"), demo: {} });

reg("mind-head-spiral", (o) => {
  let s = headSide(HX, HY, 1, o, "worried");
  s += mindBox(HX, HY, 1, (x, y, r) => st(L.smooth(Array.from({ length: 56 }, (_, i) => { const a = i * 0.36; return [x + Math.cos(a) * (r * 0.06 + i * r * 0.016), y + Math.sin(a) * (r * 0.06 + i * r * 0.016)]; })), { c: "purple", w: "prop" }));
  s += sparkle(-130, -120, 12, "orange") + sparkle(120, -130, 10, "orange") + sparkle(-110, -170, 8, "orange");
  return s;
}, { box: HEAD_BOX, group: G.head, label: "Thought spiral in a head", tags: ["mind", "rumination", "spiral", "dizzy", "stuck thoughts", "loop"], call: call("mind-head-spiral"), demo: {} });

const jig = (x, y, w, c, o = {}) => uni([["r", x, y, w, w, 6], ["c", x + w, y + w / 2, w * 0.2], ["c", x + w / 2, y, w * 0.2]], c, Object.assign({ w: "detail" }, o));
reg("mind-head-puzzle", (o) => {
  let s = headSide(HX, HY, 1, o, "ok");
  s += mindBox(HX, HY, 1, (x, y, r) => fl(L.rect(x - r, y - r, r * 2, r * 2), "gray", 0, 0.28) + st(L.poly([[x - r, y + 14], [x + r, y + 14]]), { w: "hair", op: 0.2 }) + jig(x - 30, y - 30, 60, "gray", { flat: true }).replace(/fill="[^"]*"/g, `fill="${L.c("ink")}" fill-opacity="0.18"`));
  s += L.g(jig(-34, -34, 68, "orange"), "translate(130 -170) rotate(14)") + arrow([[96, -150], [40, -100], [-6, -66]], "ink", "detail", 16) + sparkle(190, -230, 12);
  return s;
}, { box: [-230, -300, 480, 520], group: G.head, label: "Missing puzzle piece in a head", tags: ["mind", "understanding", "insight", "missing piece", "learning", "aha"], call: call("mind-head-puzzle"), demo: {} });

const doorHead = (o, open) => {
  let s = headSide(HX, HY, 1, o, open ? "happy" : "ok");
  const mx = HX - 6, my = HY - 40;
  s += mindBox(HX, HY, 1, (x, y) => {
    let d = open ? fl(L.rect(x - 60, y - 60, 120, 120), "yellow", 1) + [-30, -15, 0, 15, 30].map((a) => fl(L.poly([[x - 8, y + 20], P(90, a - 90, x, y + 20), P(90, a - 78, x, y + 20)], true), "yellow", 0, 0.5)).join("") : "";
    d += sh(L.rrect(x - 30, y - 46, 60, 92, 10), open ? "navy" : "wood", { w: "detail" });
    if (open) d += sh(L.poly([[x - 30, y - 46], [x - 56, y - 36], [x - 56, y + 56], [x - 30, y + 46]], true), "wood", { w: "detail" }) + sparkle(x + 10, y - 10, 11) + sparkle(x - 8, y + 20, 7, "white");
    else d += sh(L.circ(x + 18, y + 4, 5), "gold", { w: "hair" }) + sh(L.rrect(x - 12, y - 4, 24, 22, 5), "gold", { w: "detail" }) + st(L.arc(x, y - 6, 9, 180, 360), { w: "prop" });
    return d;
  });
  return s;
};
reg("mind-head-door-closed", (o) => doorHead(o, false), { box: HEAD_BOX, group: G.head, label: "Closed mind (locked door)", tags: ["mind", "closed mind", "stubborn", "locked", "bias", "secrets"], call: call("mind-head-door-closed"), demo: {} });
reg("mind-head-door-open", (o) => doorHead(o, true), { box: HEAD_BOX, group: G.head, label: "Open mind (door ajar, light)", tags: ["mind", "open mind", "curious", "learning", "new ideas"], call: call("mind-head-door-open"), demo: {} });

reg("mind-head-steam", (o) => {
  let s = headSide(HX, HY, 1, o, "angry");
  s += clip(headD(HX, HY, 1), fl(L.rect(-200, -100, 400, 320), "red", 0, 0.2));
  s += puff([[-70, -100, 26], [-30, -134, 34], [26, -138, 30], [-90, -140, 18]], "white");
  [[-110, 0], [-124, 30]].forEach(([x, y]) => (s += st(L.poly([[x, y], [x - 24, y - 8]]), { c: "red", w: "prop" })));
  s += st(L.poly([[-4, -62], [8, -52], [-2, -40]]), { c: "red", w: "prop" }) + st(L.poly([[14, -66], [6, -46]]), { c: "red", w: "prop" });
  s += L.text("!", 110, -140, { size: 72, c: "red" }) + L.text("!", 150, -100, { size: 44, c: "red" });
  return s;
}, { box: HEAD_BOX, group: G.head, label: "Steaming head (angry, pressure)", tags: ["mind", "anger", "mad", "pressure", "frustrated", "stress", "boiling"], call: call("mind-head-steam"), demo: {} });

// ===================== stress and energy =====================
const stressMeter = (o) => {
  const lv = Math.max(0, Math.min(1, o.level ?? 0.5)), cx = 0, cy = 60, ro = 190, ri = 118;
  let s = [["green", 180, 240], ["yellow", 240, 300], ["red", 300, 360]].map(([c, a, b]) => sh(sector(cx, cy, ro, ri, a, b), c, { w: "prop" })).join("");
  for (let i = 1; i < 9; i++) s += st(L.poly([P(ro + 4, 180 + i * 20, cx, cy), P(ro + 18, 180 + i * 20, cx, cy)]), { w: "detail" });
  const a = 180 + lv * 180, tip = P(ro - 24, a, cx, cy), b1 = P(11, a + 90, cx, cy), b2 = P(11, a - 90, cx, cy);
  s += sh(L.poly([b1, tip, b2], true), "ink", { w: "detail" });
  s += sh(L.circ(cx, cy, 44), "white", { w: "prop" }) + L.face(cx, cy + 2, 30, lv < 0.3 ? "smile" : lv < 0.7 ? "worried" : "scared", { skinName: "white" });
  if (lv > 0.9) [[-14, 0], [0, 0], [14, 0]].forEach(([dx]) => (s += st(L.poly([P(ro + 28, a - 14 + dx * 1.6, cx, cy), P(ro + 52, a - 14 + dx * 1.6, cx, cy)]), { c: "red", w: "prop" })));
  return s + lab(o, "STRESS", 0, cy + 118, 50) + lab(o, "low", -154, cy + 40, 28, undefined, "middle") + lab(o, "high", 154, cy + 40, 28, undefined, "middle");
};
const SM = { box: [-240, -170, 480, 380], group: G.stress, tags: ["mind", "stress", "gauge", "meter", "anxiety", "pressure"] };
reg("mind-stress-meter", stressMeter, Object.assign({ label: "Stress meter (medium)", call: call("mind-stress-meter", ", level: 0..1"), demo: { level: 0.55 } }, SM));
reg("mind-stress-meter-calm", stressMeter, Object.assign({ label: "Stress meter (calm)", call: call("mind-stress-meter-calm", ", level: 0.08"), demo: { level: 0.08 }, defaults: { level: 0.08 } }, SM));
reg("mind-stress-meter-max", stressMeter, Object.assign({ label: "Stress meter (maxed out)", call: call("mind-stress-meter-max", ", level: 0.97"), demo: { level: 0.97 }, defaults: { level: 0.97 } }, SM));

const socialBattery = (o) => {
  const lv = Math.max(0, Math.min(1, o.level ?? 1)), fw = 308 * lv, c = lv > 0.6 ? "green" : lv > 0.25 ? "orange" : "red";
  let s = sh(L.rrect(170, -34, 26, 68, 10), "gray", { w: "prop" }) + sh(L.rrect(-170, -85, 340, 170, 36), "white", { w: "prop" });
  if (fw > 8) s += sh(L.rrect(-154, -69, Math.max(fw, 40), 138, 24), c, { w: "detail" });
  s += L.face(lv > 0.3 ? -154 + Math.max(fw, 40) / 2 : 0, -2, 50, lv > 0.6 ? "happy" : lv > 0.25 ? "flat" : "sleep", { skinName: "white" });
  if (lv > 0.9) s += sh(L.poly([[-8, -150], [20, -150], [4, -118], [26, -118], [-16, -82], [-4, -112], [-24, -112]], true), "yellow", { w: "detail" });
  return s + lab(o, `SOCIAL BATTERY ${Math.round(lv * 100)}%`, 0, 148, 32);
};
const SB = { box: [-215, -170, 450, 360], group: G.stress, tags: ["mind", "social battery", "introvert", "energy", "tired", "recharge", "people"] };
reg("mind-social-battery-full", socialBattery, Object.assign({ label: "Social battery (full)", call: call("mind-social-battery-full", ", level: 0..1"), demo: {}, defaults: { level: 1 } }, SB));
reg("mind-social-battery-half", socialBattery, Object.assign({ label: "Social battery (half)", call: call("mind-social-battery-half", ", level: 0.5"), demo: {}, defaults: { level: 0.5 } }, SB));
reg("mind-social-battery-empty", socialBattery, Object.assign({ label: "Social battery (empty)", call: call("mind-social-battery-empty", ", level: 0.06"), demo: {}, defaults: { level: 0.06 } }, SB));

reg("mind-pressure-cooker", (o) => {
  let s = L.shadow(0, 86, 280);
  s += sh(L.rrect(-158, -46, 44, 28, 10), "gray", { w: "prop" }) + sh(L.rrect(114, -46, 44, 28, 10), "gray", { w: "prop" });
  s += sh(L.rrect(-122, -72, 244, 160, 36), "gray", { w: "prop" });
  s += sh(L.smooth([[-134, -72], [-104, -116], [0, -138], [104, -116], [134, -72], [-134, -72]]), "orange", { w: "prop" });
  s += sh(L.rrect(-14, -170, 28, 36, 8), "red", { w: "prop" });
  s += puff([[0, -204, 20], [26, -234, 26], [-14, -250, 22]], "white");
  s += st(L.poly([[-30, -186], [-52, -196]]), { w: "detail" }) + st(L.poly([[30, -186], [52, -196]]), { w: "detail" });
  s += sh(L.circ(-76, -106, 22), "white", { w: "detail" }) + st(L.poly([[-76, -106], [-62, -118]]), { c: "red", w: "prop" });
  s += L.face(0, 18, 52, "scared", { skinName: "white" });
  return s;
}, { box: [-190, -280, 380, 400], group: G.stress, label: "Pressure cooker about to blow", tags: ["mind", "stress", "pressure", "burnout", "steam", "boiling", "anger"], call: call("mind-pressure-cooker"), demo: {} });

const flame = (x, y, k, o = {}) => {
  const f = (pts) => L.smooth(pts.map(([a, b]) => [x + a * k, y + b * k]));
  return sh(f([[0, 0], [-16, -22], [-8, -50], [0, -78], [8, -50], [16, -22], [0, 0]]), "orange", { w: "detail" }) + L.tag("path", { d: f([[0, -2], [-8, -18], [0, -42], [8, -18], [0, -2]]), fill: L.c("yellow") });
};
reg("mind-burnout-candle", (o) => {
  let s = sh(L.rrect(-48, 30, 96, 20, 8), "gray", { w: "prop" }) + sh(L.rrect(-12, 8, 24, 30, 6), "gray", { w: "prop" });
  s += sh(L.rrect(-150, -34, 300, 68, 28), "red", { w: "prop" });
  s += sh(L.smooth([[-120, 30], [-116, 62], [-100, 70], [-90, 52], [-90, 30], [-120, 30]]), "red", { w: "detail" }) + sh(L.smooth([[80, 30], [84, 54], [98, 64], [106, 44], [106, 30], [80, 30]]), "red", { w: "detail" });
  s += st(L.poly([[-140, -30], [-140, -46]]), { w: "prop" }) + st(L.poly([[140, -30], [140, -46]]), { w: "prop" });
  s += flame(-140, -40, 1.15) + flame(140, -40, 1.15);
  s += st(L.smooth([[-140, -150], [-128, -168], [-142, -188]]), { c: "gray", w: "detail", op: 0.6 }) + st(L.smooth([[140, -150], [152, -168], [138, -188]]), { c: "gray", w: "detail", op: 0.6 });
  return s + fl(L.rrect(-136, -26, 200, 12, 6), "white", 0, 0.45);
}, { box: [-220, -210, 440, 300], group: G.stress, label: "Candle burning at both ends", tags: ["mind", "burnout", "overwork", "exhausted", "tired", "stress"], call: call("mind-burnout-candle"), demo: {} });

reg("mind-weights-shoulders", (o) => {
  const lb = o.labels === false ? ["", ""] : o.words || ["BILLS", "WORK"];
  let s = L.inline("person", { style: "man01", pose: "sad", face: "sad" });
  s = L.g(s, "translate(0 130)");
  const py = -120;
  s += st(L.poly([[-150, py], [150, py]]), { c: "wood", w: 14 }) + st(L.poly([[-150, py], [150, py]]), { c: "brown", w: 4 });
  [-1, 1].forEach((d, i) => {
    const x = d * 150;
    s += st(L.poly([[x, py], [x, py + 70]]), { w: "prop" });
    s += sh(L.poly([[x - 22, py + 70], [x + 22, py + 70], [x + 52, py + 150], [x - 52, py + 150]], true), "gray", { w: "prop" }) + sh(L.circ(x, py + 70, 12), "gray", { w: "detail" });
    if (lb[i]) s += L.text(lb[i], x, py + 134, { size: 26, c: "white", halo: "ink", haloW: 0.18 });
  });
  return s;
}, { box: [-230, -310, 460, 460], group: G.stress, label: "Weights on the shoulders", tags: ["mind", "burden", "worry", "stress", "heavy", "responsibility", "person"], call: call("mind-weights-shoulders", ', words: ["BILLS","WORK"]'), demo: {} });

const link = (x, y, w, h, ang = 0, c = "gray") => L.g(st(L.rrect(-w / 2, -h / 2, w, h, h / 2), { c: "ink", w: 28 }) + st(L.rrect(-w / 2, -h / 2, w, h, h / 2), { c, w: 18 }) + st(L.line([-w / 2 + 14, -h / 2 + 1], [w / 2 - 22, -h / 2 + 1]), { c: "white", w: 4, op: 0.7 }), `translate(${f1(x)} ${f1(y)}) rotate(${ang})`);
reg("mind-chains-breaking", (o) => {
  const tube = (d, c = "gray") => st(d, { c: "ink", w: 26 }) + st(d, { c, w: 17 });
  const half = (d) => L.g(link(-222, 0, 74, 44) + link(-164, 0, 54, 14) + link(-114, 0, 74, 44) +
    L.g(tube(L.arc(0, 0, 27, 48, 312, 18)) + st(L.arc(-4, 0, 27, 150, 230, 10), { c: "white", w: 4, op: 0.7 }), "translate(-62 0)"), d);
  let s = half("rotate(-6 0 0) translate(0 -4)") + L.g(half(""), "scale(-1 1) rotate(-6) translate(0 -4)").replace("scale(-1 1)", "scale(-1 1)");
  s += sh(L.star(0, 2, 40, 15, 9), "yellow", { w: "detail" });
  [[-14, -62, 9], [18, -58, 10], [-22, 60, 8], [24, 64, 9]].forEach(([x, y, r]) => (s += sh(L.poly([[x, y - r], [x + r, y + r * 0.7], [x - r * 0.8, y + r * 0.6]], true), "gray", { w: "detail" })));
  [[-50, -96], [56, -100]].forEach(([x, y]) => (s += sparkle(x, y, 12)));
  return s;
}, { box: [-280, -150, 560, 300], group: G.stress, label: "Chains breaking", tags: ["mind", "freedom", "break free", "stuck", "habit", "addiction", "liberation", "trauma"], call: call("mind-chains-breaking"), demo: {} });

// ===================== feelings and faces =====================
const fit = (name, cx, cy, size, o = {}) => {
  const it = L.get(name); if (!it) return "";
  const b = it.box, k = size / Math.max(b[2], b[3]);
  return L.g(L.inline(name, o), `translate(${f1(cx)} ${f1(cy)}) scale(${k.toFixed(3)}) translate(${-(b[0] + b[2] / 2)} ${-(b[1] + b[3] / 2)})`);
};
const ringPts = (cx, cy, rx, ry, wob = 0.04, n = 12) => Array.from({ length: n + 1 }, (_, i) => { const a = (i % n) / n * 2 * PI; return [cx + Math.cos(a) * rx * (1 + wob * Math.sin(3 * a)), cy + Math.sin(a) * ry * (1 + wob * Math.sin(3 * a + 1))]; });
const MOOD_BOX = [-170, -190, 340, 340];
const mood = (name, label, c, shapeFn, extraFn, faceKind, tags) =>
  reg(name, (o) => {
    let s = L.shadow(0, 128, 200) + sh(shapeFn(), c, { w: "prop" });
    s += fl(L.circ(-48, -60, 26, 14), "white", 0, 0.35);
    s += L.face(0, 14, 66, faceKind, { skinName: c });
    return (extraFn ? extraFn() : "") + s;
  }, { box: MOOD_BOX, group: G.feel, label, tags: ["mind", "feeling", "emotion", "mood", "blob"].concat(tags), call: call(name), demo: {} });
mood("mind-mood-happy", "Mood blob: happy", "yellow", () => L.smooth(ringPts(0, 10, 112, 108)), () => sparkle(-122, -92, 14, "orange") + sparkle(124, -70, 11, "orange") + sparkle(110, -128, 8, "white"), "happy", ["happy", "joy", "glad"]);
mood("mind-mood-sad", "Mood blob: sad", "water", () => L.smooth([[0, -142], [40, -80], [92, -10], [100, 50], [60, 106], [0, 120], [-60, 106], [-100, 50], [-92, -10], [-40, -80], [0, -142]]),
  () => fl(L.circ(0, 124, 98, 14), "water", 1, 0.55), "cry", ["sad", "cry", "blue", "down"]);
mood("mind-mood-angry", "Mood blob: angry", "red", () => L.rrect(-104, -92, 208, 196, 56),
  () => puff([[-70, -120, 16], [-50, -148, 22], [-86, -154, 12]], "white") + puff([[70, -120, 16], [50, -148, 22], [86, -154, 12]], "white"), "angry", ["angry", "mad", "rage", "frustrated"]);
mood("mind-mood-afraid", "Mood blob: afraid", "purple", () => L.smooth([[0, -128], [55, -104], [80, -30], [92, 40], [72, 100], [30, 120], [-30, 120], [-72, 100], [-92, 40], [-80, -30], [-55, -104], [0, -128]]),
  () => [-1, 1].map((d) => st(L.smooth([[d * 118, -30], [d * 130, -10], [d * 118, 10], [d * 130, 30]]), { c: "ink", w: "detail" }) + st(L.smooth([[d * 136, -50], [d * 148, -30], [d * 136, -10]]), { c: "ink", w: "detail" })).join(""), "scared", ["afraid", "scared", "fear", "anxious"]);
mood("mind-mood-calm", "Mood blob: calm", "teal", () => L.smooth(ringPts(0, 36, 126, 92, 0.03)),
  () => st(L.arc(0, 150, 120, 200, 340, 18), { c: "teal", w: "prop", op: 0.5 }) + sh(L.smooth([[-20, -92], [10, -130], [58, -138], [48, -100], [10, -86], [-20, -92]]), "green", { w: "detail" }), "proud", ["calm", "relaxed", "peaceful", "zen"]);
mood("mind-mood-surprised", "Mood blob: surprised", "orange", () => L.smooth(ringPts(0, 10, 106, 112, 0.05)),
  () => [[-130, -90, -24], [0, -150, 0], [130, -90, 24]].map(([x, y, a]) => st(L.poly([P(14, a - 90, x, y), P(46, a - 90, x, y)]), { c: "ink", w: "prop" })).join("") + L.text("!", 130, -60, { size: 62, c: "red" }), "wow", ["surprised", "shocked", "wow", "amazed"]);

reg("mind-mood-set", (o) => {
  const items = [["mind-mood-happy", "HAPPY"], ["mind-mood-sad", "SAD"], ["mind-mood-angry", "ANGRY"], ["mind-mood-afraid", "AFRAID"]];
  return items.map(([n, t], i) => { const x = (i - 1.5) * 210; return L.g(L.inline(n, {}), `translate(${x} 0) scale(0.58)`) + lab(o, t, x, 130, 32); }).join("");
}, { box: [-440, -130, 880, 300], group: G.feel, wide: true, label: "Four moods: happy, sad, angry, afraid", tags: ["mind", "feelings", "emotions", "mood", "set", "blobs"], call: call("mind-mood-set", ", labels: false"), demo: {} });

const maskD = (k = 1) => L.smooth([[0, -100], [70, -84], [84, -10], [56, 70], [0, 104], [-56, 70], [-84, -10], [-70, -84], [0, -100]].map(([x, y]) => [x * k, y * k]));
const maskFace = (k, happy, c) => {
  let s = sh(maskD(k), c, { w: "prop" });
  [-1, 1].forEach((d) => (s += sh(L.smooth([[d * 14, -30], [d * 38, -44], [d * 56, -28], [d * 38, -18], [d * 14, -30]].map(([x, y]) => [x * k, y * k])), "ink", { w: "detail", flat: true })));
  const br = (d) => L.smooth([[d * 14, happy ? -56 : -48], [d * 38, happy ? -66 : -64], [d * 58, happy ? -52 : -70]].map(([x, y]) => [x * k, y * k]));
  s += st(br(-1), { w: "prop" }) + st(br(1), { w: "prop" });
  s += happy ? st(L.smooth([[-40, 28], [-20, 60], [20, 60], [40, 28]].map(([x, y]) => [x * k, y * k])), { w: "prop" }) + fl(L.circ(-52 * k, 12 * k, 12 * k, 8 * k), "pink", 0, 0.7) + fl(L.circ(52 * k, 12 * k, 12 * k, 8 * k), "pink", 0, 0.7)
    : st(L.smooth([[-34, 62], [-12, 40], [12, 40], [34, 62]].map(([x, y]) => [x * k, y * k])), { w: "prop" });
  return s;
};
reg("mind-mask-hold", (o) => {
  let s = L.shadow(-20, 170, 200);
  s += sh(L.rrect(-170, 100, 250, 90, 40), "blue", { w: "char" });
  s += sh(L.circ(-50, 0, 100), skin(o), { w: "char" }) + L.face(-60, 0, 100, "cry", { skinName: skin(o) });
  s += st(L.poly([[70, 80], [110, 220]]), { c: "wood", w: 14 }) + st(L.poly([[70, 80], [110, 220]]), { c: "brown", w: 4 });
  s += L.g(maskFace(1.15, true, "yellow"), "translate(50 10) rotate(10)");
  return s;
}, { box: [-210, -130, 400, 380], group: G.feel, label: "Smiling mask over a sad face", tags: ["mind", "mask", "fake smile", "hiding feelings", "pretend", "depression", "social mask", "masking"], call: call("mind-mask-hold"), demo: {} });

reg("mind-mask-pair", (o) => L.g(maskFace(1.1, false, "water"), "translate(70 20) rotate(14)") + L.g(maskFace(1.1, true, "gold"), "translate(-70 -10) rotate(-12)"),
  { box: [-220, -150, 440, 320], group: G.feel, label: "Comedy and tragedy masks", tags: ["mind", "masks", "theatre", "happy sad", "two sides", "acting", "persona"], call: call("mind-mask-pair"), demo: {} });

const mirrorScene = (o, kind) => {
  const bad = kind === "bad";
  let s = L.shadow(-130, 190, 190) + sh(L.rrect(-230, 100, 190, 100, 44), "orange", { w: "char" }) + sh(L.circ(-135, 20, 76), skin(o), { w: "char" }) + L.face(-135, 20, 76, "smile", { skinName: skin(o) });
  s += st(L.poly([[100, 150], [100, 190]]), { c: "wood", w: 16 }) + sh(L.rrect(60, 186, 80, 14, 6), "wood", { w: "prop" });
  s += sh(L.circ(100, 20, 128, 150), "gold", { w: "prop" }) + sh(L.circ(100, 20, 108, 130), "glass", { w: "detail" });
  const inner = L.circ(100, 20, 106, 128);
  let r = bad ? sh(L.circ(100, 40, 46, 92), skin(o), { w: "char" }) + L.face(100, 30, 46, "sad", { skinName: skin(o) }) + [-1, 1].map((d) => st(L.smooth([[100 + d * 54, -10], [100 + d * 66, 10], [100 + d * 54, 30], [100 + d * 66, 50]]), { c: "ink", w: "hair", op: 0.5 })).join("")
    : sh(L.circ(100, 30, 56), skin(o), { w: "char" }) + L.face(100, 30, 56, "happy", { skinName: skin(o) }) + sparkle(168, -50, 14) + sparkle(36, -70, 10) + heart(176, 60, 12);
  s += clip(inner, r + fl(L.poly([[20, -90], [70, -110], [10, 60], [-20, 80]], true), "white", 0, 0.45) + fl(L.poly([[150, 90], [180, 60], [150, 130]], true), "white", 0, 0.3));
  return s;
};
reg("mind-mirror-distorted", (o) => mirrorScene(o, "bad"), { box: [-250, -150, 480, 360], group: G.feel, label: "Mirror with a distorted reflection", tags: ["mind", "body image", "self image", "insecurity", "reflection", "distorted", "self criticism"], call: call("mind-mirror-distorted"), demo: {} });
reg("mind-mirror-kind", (o) => mirrorScene(o, "good"), { box: [-250, -150, 480, 360], group: G.feel, label: "Mirror with a kind reflection", tags: ["mind", "self love", "confidence", "self image", "reflection", "positive"], call: call("mind-mirror-kind"), demo: {} });

reg("mind-spotlight-audience", (o) => {
  let s = L.flat(L.poly([[-40, -240], [40, -240], [150, 80], [-150, 80]], true), "yellow", 0, 0.28) + L.flat(L.poly([[-22, -240], [22, -240], [90, 80], [-90, 80]], true), "yellow", 0, 0.3);
  s += sh(L.rrect(-250, 76, 500, 26, 8), "wood", { w: "prop" }) + fl(L.circ(0, 80, 130, 12), "yellow", 0, 0.5);
  s += L.g(L.inline("person", { style: "man01", pose: "stand", face: "nervous", s: 0.78 }), "translate(0 84)");
  const row = (y, k, c, n) => Array.from({ length: n }, (_, i) => { const x = (i - (n - 1) / 2) * 98 * k + (i % 2) * 8; return sh(L.rrect(x - 40 * k, y + 28 * k, 80 * k, 60 * k, 30 * k), c, { w: "prop" }) + sh(L.circ(x, y, 30 * k), c, { w: "prop" }); }).join("");
  return s + row(150, 0.8, "navy", 6) + row(196, 1, "navy", 5);
}, { box: [-260, -250, 520, 520], group: G.feel, label: "Spotlight on a person, audience watching", tags: ["mind", "stage fright", "social anxiety", "spotlight effect", "public speaking", "audience", "imagined audience", "self conscious"], call: call("mind-spotlight-audience"), demo: {} });

reg("mind-eyes-crowd", (o) => {
  const r = L.rng(5), n = 15;
  let s = "";
  for (let i = 0; i < n; i++) {
    const a = (i / n) * 360 + 8, rad = 150 + (i % 3) * 34, x = Math.cos(a * D2R) * rad * 1.15, y = Math.sin(a * D2R) * rad * 0.82, k = 1.05 + 0.4 * r();
    const ang = Math.atan2(-y, -x), px = Math.cos(ang) * 10 * k, py = Math.sin(ang) * 10 * k;
    s += L.tag("path", { d: L.circ(x, y, 28 * k, 20 * k), fill: L.c("white"), stroke: L.c("ink"), "stroke-width": L.lw("detail") }) + L.flat(L.circ(x + px, y + py, 10 * k), "ink") + L.flat(L.circ(x + px - 3, y + py - 3, 3 * k), "white");
    s += st(L.arc(x, y - 3 * k, 30 * k, 215, 325), { w: "detail" });
  }
  s += sh(L.circ(0, 0, 70), skin(o), { w: "char" }) + L.face(0, 0, 70, "nervous", { skinName: skin(o) });
  return s;
}, { box: [-310, -240, 620, 480], group: G.feel, label: "Eyes all around a nervous face", tags: ["mind", "judgement", "being watched", "social anxiety", "eyes", "self conscious", "crowd", "shy"], call: call("mind-eyes-crowd"), demo: {} });

// ===================== habits and loops =====================
reg("mind-habit-loop", (o) => {
  const ic = o.icons || ["prop-alarm-clock", "sport-dumbbell", "prop-gift"], tx = ["CUE", "ROUTINE", "REWARD"], col = ["yellow", "green", "pink"];
  const pos = [P(150, -90), P(150, 30), P(150, 150)];
  let s = "";
  for (let i = 0; i < 3; i++) { const a = -90 + i * 120; s += arrow(L.arcPts(0, 0, 150, a + 32, a + 88, 6).map((p) => p), "ink", "prop", 22); }
  pos.forEach(([x, y], i) => {
    s += sh(L.circ(x, y, 64), col[i], { w: "prop" }) + fit(ic[i], x, y, 84);
    const ty = i === 0 ? y - 84 : y + 100;
    s += lab(o, tx[i], x, ty, 34);
  });
  return s;
}, { box: [-250, -290, 500, 520], group: G.habit, label: "Habit loop: cue, routine, reward", tags: ["mind", "habit", "loop", "cue", "routine", "reward", "atomic habits", "cycle", "addiction"], call: call("mind-habit-loop", ', icons: ["prop-alarm-clock","sport-dumbbell","prop-gift"]'), demo: {} });

reg("mind-dopamine-bell", (o) => {
  let s = fit("p2-bell", 0, 0, 230) + sh(L.circ(70, -78, 30), "red", { w: "prop" }) + L.text("1", 70, -66, { size: 40, c: "white", halo: "ink", haloW: 0.1 });
  [[-130, -20, -20], [-130, 20, 20], [130, 30, -20]].forEach(([x, y, a]) => (s += st(L.poly([[x, y], [x - Math.sign(x) * 30, y + a * 0.5]]), { c: "orange", w: "prop" })));
  s += sparkle(-110, -90, 14) + sparkle(120, 90, 12, "orange") + sparkle(-90, 100, 9, "pink");
  return s;
}, { box: [-190, -150, 380, 300], group: G.habit, label: "Notification bell (dopamine hit)", tags: ["mind", "dopamine", "notification", "bell", "alert", "phone", "craving", "attention"], call: call("mind-dopamine-bell"), demo: {} });

reg("mind-notif-stack", (o) => {
  const rows = [["red", 0.6], ["blue", 0.8], ["green", 0.55]];
  let s = "";
  rows.forEach(([c, w], i) => {
    const y = -90 + i * 80 - (2 - i) * 0, x = 0, sc = 1 - (2 - i) * 0.0;
    s += sh(L.rrect(-170 + i * 12, y - 36 + i * 4, 340, 78, 22), "white", { w: "prop" }) + sh(L.circ(-124 + i * 12, y + 3 + i * 4, 24), c, { w: "detail" });
    s += st(L.poly([[-84 + i * 12, y - 8 + i * 4], [-84 + i * 12 + 190 * w, y - 8 + i * 4]]), { c: "gray", w: "prop" }) + st(L.poly([[-84 + i * 12, y + 20 + i * 4], [-84 + i * 12 + 130 * w, y + 20 + i * 4]]), { c: "gray", w: "detail", op: 0.6 });
  });
  return s + sh(L.circ(160, -120, 24), "red", { w: "prop" }) + L.text("3", 160, -108, { size: 34, c: "white", halo: "ink", haloW: 0.1 });
}, { box: [-200, -170, 400, 330], group: G.habit, label: "Pile of notifications", tags: ["mind", "notifications", "phone", "messages", "distraction", "overload", "inbox", "alerts"], call: call("mind-notif-stack"), demo: {} });

reg("mind-like-counter", (o) => {
  const n = String(o.n ?? "1.2K");
  return sh(L.rrect(-130, -52, 260, 104, 52), "white", { w: "prop" }) + heart(-70, -2, 30, "red", { w: "prop" }) + L.text(n, 36, 20, { size: 62 }) +
    heart(-96, -78, 12, "pink") + heart(-50, -92, 9, "red") + heart(104, -76, 11, "pink");
}, { box: [-170, -130, 340, 230], group: G.habit, label: "Like counter (heart + number)", tags: ["mind", "likes", "social media", "validation", "counter", "heart", "approval"], call: call("mind-like-counter", ', n: "1.2K"'), demo: {} });

reg("mind-like-burst", (o) => {
  let s = "";
  [[-120, -80, 18, 18], [120, -60, 14, -12], [-100, 90, 12, 14], [130, 80, 20, -14], [10, -150, 14, 0]].forEach(([x, y, r, a], i) => (s += L.g(heart(0, 0, r, i % 2 ? "pink" : "red"), `translate(${x} ${y}) rotate(${a})`)));
  s += heart(0, 4, 100, "red", { w: "prop" }) + fl(L.circ(-40, -42, 24, 14), "white", 0, 0.45);
  s += sh(L.circ(84, -76, 38), "white", { w: "prop" }) + L.text("+1", 84, -62, { size: 40 });
  return s;
}, { box: [-190, -190, 380, 340], group: G.habit, label: "Burst of likes", tags: ["mind", "likes", "social media", "reward", "validation", "hearts", "approval", "dopamine"], call: call("mind-like-burst"), demo: {} });

reg("mind-endless-scroll", (o) => {
  let s = L.shadow(0, 220, 200) + sh(L.rrect(-100, -220, 200, 440, 38), "gray", { w: "prop" }) + sh(L.rrect(-84, -196, 168, 392, 22), "white", { w: "detail" });
  const cd = L.rrect(-84, -196, 168, 392, 22);
  let inner = "";
  ["pink", "sky", "yellow", "green", "orange", "purple"].forEach((c, i) => { const y = -170 + i * 108; inner += sh(L.rrect(-68, y, 136, 90, 14), c, { w: "detail" }) + st(L.poly([[-52, y + 62], [20, y + 62]]), { c: "white", w: "prop" }); });
  s += clip(cd, inner);
  s += arrow([[150, -140], [150, 140]], "ink", "prop", 26) + st(L.poly([[150, 170], [150, 190]]), { w: "prop", dash: "4 14" }) + st(L.poly([[150, 214], [150, 230]]), { w: "prop", dash: "4 14" });
  return s;
}, { box: [-190, -240, 380, 490], group: G.habit, label: "Endless scroll on a phone", tags: ["mind", "doomscrolling", "phone", "social media", "infinite", "feed", "addiction", "scroll"], call: call("mind-endless-scroll"), demo: {} });

reg("mind-reward-box", (o) => {
  let s = L.shadow(0, 126, 220) + sh(L.rrect(-100, -40, 200, 160, 14), "purple", { w: "prop" }) + sh(L.rrect(-114, -80, 228, 52, 12), "purple", { w: "prop", tone: 1 });
  s += sh(L.rect(-18, -80, 36, 200), "yellow", { w: "detail" }) + sh(L.smooth([[0, -80], [-50, -130], [-70, -100], [-30, -80], [0, -80]]), "yellow", { w: "detail" }) + sh(L.smooth([[0, -80], [50, -130], [70, -100], [30, -80], [0, -80]]), "yellow", { w: "detail" });
  s += L.text("?", 0, 80, { size: 110, c: "white", halo: "ink", haloW: 0.1 });
  return s + sparkle(-130, -90, 16) + sparkle(130, -40, 12, "orange") + sparkle(110, 100, 9, "pink");
}, { box: [-170, -170, 340, 330], group: G.habit, label: "Mystery reward box", tags: ["mind", "reward", "surprise", "variable reward", "curiosity", "gambling", "loot", "gift"], call: call("mind-reward-box"), demo: {} });

reg("mind-streak-flame", (o) => {
  const d = String(o.days ?? 7);
  let s = sh(L.smooth([[0, -150], [30, -95], [86, -40], [96, 36], [58, 100], [0, 116], [-58, 100], [-96, 36], [-80, -20], [-40, -60], [-26, -100], [0, -150]]), "orange", { w: "prop" });
  s += sh(L.smooth([[0, -30], [40, 24], [46, 72], [0, 100], [-46, 72], [-36, 14], [0, -30]]), "yellow", { w: "detail" });
  s += L.text(d, 0, 78, { size: 84, c: "ink" });
  return s + lab(o, "DAY STREAK", 0, 168, 36);
}, { box: [-150, -170, 300, 370], group: G.habit, label: "Streak flame (days in a row)", tags: ["mind", "streak", "habit", "consistency", "days", "fire", "daily", "momentum"], call: call("mind-streak-flame", ", days: 7"), demo: {} });

reg("mind-habit-stack", (o) => {
  const w = o.words || ["wake", "water", "stretch", "write"], cs = ["blue", "teal", "green", "orange"];
  return w.map((t, i) => { const y = 110 - i * 78, x = (i % 2 ? 10 : -10); return sh(L.rrect(x - 120, y - 34, 240, 72, 18), cs[i % 4], { w: "prop" }) + L.text(t, x, y + 12, { size: 38, c: "white", halo: "ink", haloW: 0.12 }); }).join("") + sparkle(0, -180, 16);
}, { box: [-170, -210, 340, 400], group: G.habit, label: "Habit stacking (blocks)", tags: ["mind", "habit", "stacking", "routine", "build", "morning routine", "blocks"], call: call("mind-habit-stack", ', words: ["wake","water","stretch","write"]'), demo: {} });

// ===================== memory and learning =====================
reg("mind-filing-cabinet", (o) => {
  let s = L.shadow(0, 152, 230);
  const fold = [["red", -62], ["yellow", -22], ["blue", 18], ["green", 58]];
  s += fold.map(([c, x], i) => sh(L.rrect(x - 17, -196 + (i % 2) * 14, 34, 120, 6), c, { w: "detail" })).join("");
  s += sh(L.rrect(-96, -150, 192, 296, 14), "gray", { w: "prop" });
  s += sh(L.rrect(-84, -96, 168, 76, 10), "gray", { w: "prop", tone: 1 }) + sh(L.rrect(-84, -12, 168, 76, 10), "gray", { w: "prop", tone: 1 }) + sh(L.rrect(-84, 72, 168, 66, 10), "gray", { w: "prop", tone: 1 });
  [[-58, "A–F"], [26, "G–M"], [105, "N–Z"]].forEach(([y, t]) => (s += sh(L.rrect(-34, y - 10, 68, 22, 5), "white", { w: "hair" }) + (o.labels === false ? "" : L.text(t, 0, y + 7, { size: 17 })) + sh(L.rrect(-26, y + 22, 52, 9, 4), "ink", { w: "hair" })));
  return s;
}, { box: [-150, -220, 300, 400], group: G.mem, label: "Memory filing cabinet", tags: ["mind", "memory", "filing cabinet", "storage", "recall", "organise", "remember", "drawers"], call: call("mind-filing-cabinet"), demo: {} });

const chart = (o, inner) => {
  let s = sh(L.rrect(-215, -155, 430, 310, 28), "paper", { w: "prop", flat: true });
  s += arrow([[-165, 104], [185, 104]], "ink", "prop", 16) + arrow([[-165, 104], [-165, -120]], "ink", "prop", 16);
  s += inner;
  return s + (o.labels === false ? "" : L.text("TIME", 10, 142, { size: 24 }) + L.g(L.text("MEMORY", 0, 0, { size: 24 }), "translate(-190 -8) rotate(-90)"));
};
const dec = (x0, x1, k) => Array.from({ length: 13 }, (_, i) => { const x = x0 + ((x1 - x0) * i) / 12; return [x, 104 - 200 * Math.exp((-k * (x - x0)) / 60)]; });
reg("mind-forgetting-curve", (o) => {
  const pts = dec(-165, 170, 0.62);
  let s = chart(o, fl(L.poly([[-165, 104], ...pts, [170, 104]], true), "red", 0, 0.14) + st(L.smooth(pts), { c: "red", w: "prop" }));
  s += sh(L.circ(-165, -96, 10), "red", { w: "detail" }) + sh(L.circ(pts[6][0], pts[6][1], 10), "red", { w: "detail" }) + sh(L.circ(170, pts[12][1], 10), "red", { w: "detail" });
  return s + (o.labels === false ? "" : L.text("100%", -120, -92, { size: 24 }) + L.text("20%", 132, pts[12][1] - 22, { size: 24, c: "red" }));
}, { box: [-230, -170, 460, 340], group: G.mem, label: "Forgetting curve", tags: ["mind", "memory", "forgetting", "chart", "ebbinghaus", "decay", "study", "graph"], call: call("mind-forgetting-curve"), demo: {} });

reg("mind-spaced-repetition", (o) => {
  const segs = [[-165, -100, 3], [-100, -20, 1.9], [-20, 90, 1.2], [90, 172, 0.7]];
  let s = chart(o, segs.map(([a, b, k], i) => st(L.smooth(dec(a, b, k)), { c: "green", w: "prop" }) + (i ? st(L.poly([[a, 104 - 200 * Math.exp((-segs[i - 1][2] * (a - segs[i - 1][0])) / 60)], [a, -96]]), { c: "green", w: "detail", dash: "5 7" }) : "")).join(""));
  s += segs.slice(1).map(([a]) => sparkle(a, -108, 11)).join("");
  return s + (o.labels === false ? "" : L.text("REVIEW", -20, -128, { size: 22 }));
}, { box: [-230, -170, 460, 340], group: G.mem, label: "Spaced repetition (curve flattens)", tags: ["mind", "memory", "spaced repetition", "study", "review", "learning", "flashcards", "revision"], call: call("mind-spaced-repetition"), demo: {} });

// brain, side view facing right. zones are ellipses clipped to the brain
const BRAIN = [[-130, 10], [-135, -40], [-100, -85], [-40, -105], [30, -102], [95, -80], [135, -30], [132, 20], [100, 50], [60, 60], [40, 86], [0, 90], [-20, 60], [-60, 70], [-100, 52], [-130, 10]];
const ZONES = { front: [95, -20, 58, 82, "orange"], top: [10, -84, 66, 34, "yellow"], back: [-104, -16, 50, 70, "green"], low: [-62, 62, 52, 30, "blue"], alarm: [22, 22, 30, 28, "red"], memory: [-6, 34, 50, 17, "purple"] };
const brainD = (k = 1, dx = 0, dy = 0) => L.smooth(BRAIN.map(([x, y]) => [dx + x * k, dy + y * k]));
const brain = (o, lit, k = 1.1, dx = 0, dy = 0) => {
  const d = brainD(k, dx, dy);
  let s = sh(L.rrect(dx + 8 * k, dy + 50 * k, 34 * k, 70 * k, 12 * k), "pink", { w: "prop", tone: 2 }) + sh(d, "pink", { w: "prop", tone: 1 });
  s += clip(d, lit.map((n) => { const [x, y, rx, ry, c] = ZONES[n]; return fl(L.circ(dx + x * k, dy + y * k, rx * k, ry * k), c, 0, 0.92); }).join(""));
  [[[-80, -60], [-50, -40], [-70, -10]], [[-10, -90], [10, -60], [-20, -40], [0, -10]], [[60, -86], [50, -50], [80, -30], [70, 0]], [[110, -50], [100, -20], [120, 10]], [[-100, 20], [-60, 30], [-30, 50]]].forEach((p) => (s += st(L.smooth(p.map(([x, y]) => [dx + x * k, dy + y * k])), { w: "detail", op: 0.35 })));
  return s + st(d, { w: "prop" });
};
const bz = (o, lit, extra, cap) => brain(o, lit) + (extra || "") + (cap && o.labels !== false ? L.text(cap, 0, 190, { size: 36, halo: "paper", haloW: 0.2 }) : "");
reg("mind-brain-zones", (o) => {
  const tag = (t, dx, dy, x1, y1, an) => (o.labels === false ? "" : st(L.poly([[x1, y1], [dx, dy]]), { w: "detail" }) + sh(L.circ(x1, y1, 5), "ink", { w: "hair", flat: true }) + L.text(t, dx + (an === "start" ? 8 : -8), dy + 8, { size: 26, anchor: an, halo: "paper", haloW: 0.2 }));
  return brain(o, ["front", "top", "back", "low"]) + tag("PLANNING", 150, -112, 105, -22, "start") + tag("TOUCH", 40, -145, 12, -92, "middle") + tag("SIGHT", -190, -40, -118, -20, "end") + tag("BALANCE", -160, 110, -70, 70, "end");
}, { box: [-290, -170, 580, 330], group: G.mem, label: "Brain with zones lit", tags: ["mind", "brain", "zones", "lobes", "neuroscience", "regions", "diagram", "lit"], call: call("mind-brain-zones", ", labels: false"), demo: {} });
reg("mind-brain-lit-front", (o) => bz(o, ["front"], sparkle(170, -70, 16) + sparkle(150, -120, 10, "orange"), "PLANNING"), { box: [-200, -170, 400, 390], group: G.mem, label: "Brain: thinking part lit", tags: ["mind", "brain", "frontal lobe", "planning", "willpower", "decisions", "self control", "prefrontal"], call: call("mind-brain-lit-front"), demo: {} });
reg("mind-brain-lit-alarm", (o) => bz(o, ["alarm"], [[-1, -30], [1, 30]].map(([d, a]) => st(L.poly([P(40, a - 90 + (d < 0 ? 180 : 0), 24, 30), P(70, a - 90 + (d < 0 ? 180 : 0), 24, 30)]), { c: "red", w: "prop" })).join("") + L.text("!", 24, 14, { size: 54, c: "white", halo: "ink", haloW: 0.12 }), "ALARM CENTRE"), { box: [-200, -170, 400, 390], group: G.mem, label: "Brain: alarm centre lit", tags: ["mind", "brain", "amygdala", "fear", "alarm", "stress", "fight or flight", "emotion"], call: call("mind-brain-lit-alarm"), demo: {} });
reg("mind-brain-lit-memory", (o) => bz(o, ["memory"], sparkle(-30, -2, 11, "white") + sparkle(60, 30, 9, "white"), "MEMORY"), { box: [-200, -170, 400, 390], group: G.mem, label: "Brain: memory part lit", tags: ["mind", "brain", "hippocampus", "memory", "remember", "learning", "recall"], call: call("mind-brain-lit-memory"), demo: {} });

reg("mind-bulb-cracked", (o) => {
  let s = L.shadow(0, 150, 150);
  s += sh(L.rrect(-34, 40, 68, 80, 10), "gray", { w: "prop" }) + [64, 86].map((y) => st(L.poly([[-34, y], [34, y]]), { w: "detail" })).join("") + sh(L.rrect(-18, 112, 36, 28, 12), "gray", { w: "prop", tone: 2 });
  s += sh(L.smooth([[-36, 46], [-52, 4], [-84, -22], [-84, -80], [-44, -130], [0, -142], [44, -130], [84, -80], [84, -22], [52, 4], [36, 46], [-36, 46]]), "yellow", { w: "prop", tone: 1 });
  s += fl(L.circ(-42, -88, 24, 14), "white", 0, 0.55);
  s += st(L.poly([[10, -140], [-6, -104], [20, -84], [-10, -52], [16, -28], [-4, 2], [6, 40]]), { c: "ink", w: "prop" });
  s += sh(L.poly([[60, 20], [74, 2], [86, 30]], true), "yellow", { w: "detail" }) + sh(L.poly([[-70, 50], [-56, 66], [-80, 70]], true), "yellow", { w: "detail" });
  return s + st(L.poly([[-4, -2], [-10, 22]]), { c: "ink", w: "detail", op: 0.5 });
}, { box: [-130, -170, 260, 340], group: G.mem, label: "Cracked lightbulb (flawed idea)", tags: ["mind", "idea", "broken idea", "flaw", "bad idea", "fragile", "cracked", "mistake", "lightbulb"], call: call("mind-bulb-cracked"), demo: {} });

const photo = (x, y, rot, fade, q) => {
  const inner = sh(L.rect(-48, -58, 96, 86), "sky", { w: "hair", flat: true }) + fl(L.circ(22, -28, 14), "yellow") + fl(L.smooth([[-50, 28], [-20, -8], [14, 6], [50, -14], [50, 28], [-50, 28]]), "grass");
  return L.g(sh(L.rrect(-60, -70, 120, 146, 10), "white", { w: "prop" }) + clip(L.rect(-48, -58, 96, 86), inner) + fl(L.rect(-48, -58, 96, 86), "paper", 0, fade) + st(L.poly([[-30, 52], [26, 52]]), { c: "gray", w: "detail", op: 0.6 }) + (q ? L.text("?", 0, -4, { size: 70, c: "gray" }) : ""), `translate(${x} ${y}) rotate(${rot})`);
};
reg("mind-memory-fade", (o) => photo(-150, 0, -6, 0, false) + photo(0, 8, 2, 0.62, false) + photo(150, 0, 8, 0.93, true) + arrow([[-100, 110], [100, 110]], "ink", "detail", 14),
  { box: [-250, -110, 500, 260], group: G.mem, wide: true, label: "Memories fading (three photos)", tags: ["mind", "memory", "forgetting", "photos", "fade", "nostalgia", "past", "dementia"], call: call("mind-memory-fade"), demo: {} });

reg("mind-brain-muscle", (o) => {
  let s = "";
  [-1, 1].forEach((d) => {
    const X = (x) => d * x;
    s += sh(L.limb([[X(110), 40], [X(162), 36], [X(200), 30]], 46, 40), "pink", { w: "prop", tone: 0 }) + sh(L.limb([[X(200), 30], [X(216), -22], [X(208), -66]], 38, 34), "pink", { w: "prop", tone: 0 });
    s += sh(L.circ(X(166), 6, 32, 24), "pink", { w: "detail", tone: 1 }) + fl(L.circ(X(158), -2, 12, 7), "white", 0, 0.5) + st(L.smooth([[X(144), 22], [X(168), 30], [X(190), 20]]), { w: "hair", op: 0.4 });
    s += sh(L.circ(X(208), -84, 30, 28), "pink", { w: "prop", tone: 1 }) + st(L.smooth([[X(190), -94], [X(206), -90], [X(224), -94]]), { w: "detail" }) + st(L.smooth([[X(190), -80], [X(206), -76], [X(226), -80]]), { w: "detail" }) + fl(L.circ(X(198), -96, 8, 6), "white", 0, 0.5);
  });
  s += brain(o, [], 1.05, 0, 14) + L.face(6, 6, 56, "determined", { skinName: "pink" });
  return s + sparkle(0, -135, 14) + st(L.poly([[-60, -120], [-80, -140]]), { c: "orange", w: "prop" }) + st(L.poly([[60, -120], [80, -140]]), { c: "orange", w: "prop" });
}, { box: [-260, -170, 520, 330], group: G.mem, label: "Brain flexing (training the mind)", tags: ["mind", "brain", "neuroplasticity", "learning", "strong", "muscle", "practice", "growth", "training"], call: call("mind-brain-muscle"), demo: {} });

// ===================== thoughts and inner voices =====================
const bust = (cx, cy, R, kind, o, outfit = "blue") => sh(L.rrect(cx - 1.9 * R, cy + 0.8 * R, 3.8 * R, 1.5 * R, R * 0.9), outfit, { w: "char" }) + sh(L.circ(cx, cy, R), skin(o), { w: "char" }) + L.face(cx, cy, R, kind, { skinName: skin(o) });
const cloud = (k, x, y, c = "white") => puff([[-62, -8, 44], [0, -40, 56], [62, -8, 44], [0, 10, 52]].map(([a, b, r]) => [x + a * k, y + b * k, r * k]).concat([[x - 74 * k, y + 64 * k, 13 * k], [x - 98 * k, y + 98 * k, 8 * k]]), c);
const TH = {
  pictures: () => sh(L.poly([[-50, 24], [-12, -26], [8, -2], [26, -22], [58, 24]], true), "green", { w: "detail" }) + sh(L.circ(-30, -34, 14), "yellow", { w: "detail" }),
  words: () => L.text("Aa", 0, 8, { size: 58 }) + st(L.poly([[-48, 26], [48, 26]]), { c: "gray", w: "prop" }) + st(L.poly([[-48, 40], [20, 40]]), { c: "gray", w: "detail", op: 0.6 }),
  feelings: () => heart(0, -8, 34, "red", { w: "prop" }) + st(L.smooth([[-56, 40], [-28, 28], [0, 40], [28, 28], [56, 40]]), { c: "purple", w: "prop" }),
};
const thoughtOne = (key, name, label, tags) => reg(name, (o) => cloud(1.4, 0, 0) + L.g(TH[key](), "translate(0 -18) scale(1.15)"), { box: [-170, -150, 340, 310], group: G.think, label, tags: ["mind", "thought", "thinking", "bubble", "mental"].concat(tags), call: call(name), demo: {} });
thoughtOne("pictures", "mind-thought-pictures", "Thought: in pictures", ["images", "visual thinking", "imagination", "mental imagery"]);
thoughtOne("words", "mind-thought-words", "Thought: in words", ["inner voice", "language", "verbal thinking", "self talk"]);
thoughtOne("feelings", "mind-thought-feelings", "Thought: in feelings", ["emotion", "gut feeling", "heart", "intuition"]);
reg("mind-thought-types", (o) => [["pictures", "PICTURES"], ["words", "WORDS"], ["feelings", "FEELINGS"]].map(([k, t], i) => { const x = (i - 1) * 250; return cloud(0.95, x, 0) + L.g(TH[k](), `translate(${x} -12)`) + lab(o, t, x, 128, 32); }).join(""),
  { box: [-330, -100, 660, 270], group: G.think, wide: true, label: "Three kinds of thoughts (pictures, words, feelings)", tags: ["mind", "thoughts", "types", "thinking", "pictures", "words", "feelings", "bubbles", "labelled"], call: call("mind-thought-types", ", labels: false"), demo: {} });

const spiky = (cx, cy, r, c, n = 10) => sh(L.poly(Array.from({ length: n * 2 }, (_, i) => P(i % 2 ? r * 0.78 : r, i * (180 / n) + 7, cx, cy)), true), c, { w: "prop" });
const tailBub = (x, y, w, h, c, tx) => sh(L.poly([[tx - 14, y + h / 2 - 4], [tx - 34, y + h / 2 + 30], [tx + 12, y + h / 2 - 4]], true), c, { w: "prop" }) + sh(L.rrect(x - w / 2, y - h / 2, w, h, h / 2.3), c, { w: "prop" });
reg("mind-inner-critic", (o) => {
  const w = o.words || "you'll fail!";
  let s = bust(-70, 56, 78, "sad", o);
  s += sh(L.poly([[48, 20], [38, -14], [58, -4]], true), "purple", { w: "detail" }) + sh(L.poly([[96, 22], [112, -14], [84, -2]], true), "purple", { w: "detail" });
  s += sh(L.circ(72, 52, 36, 32), "purple", { w: "prop" }) + L.face(72, 52, 30, "angry", { skinName: "purple" });
  s += spiky(190, -50, 92, "yellow", 9) + (o.labels === false ? "" : L.text(w, 190, -42, { size: 28 }));
  return s;
}, { box: [-230, -150, 540, 410], group: G.think, label: "Inner critic on the shoulder", tags: ["mind", "inner critic", "negative self talk", "doubt", "gremlin", "imposter", "self criticism", "voice"], call: call("mind-inner-critic", ', words: "you\'ll fail!"'), demo: {} });
reg("mind-inner-coach", (o) => {
  const w = o.words || "you got this!";
  let s = bust(-70, 56, 78, "smile", o);
  s += sh(L.poly([[44, 70], [20, 120], [76, 98]], true), "red", { w: "detail" });
  s += sh(L.circ(72, 52, 36, 32), "yellow", { w: "prop" }) + L.face(72, 52, 30, "happy", { skinName: "yellow" });
  s += tailBub(196, -48, 190, 76, "white", 120) + (o.labels === false ? "" : L.text(w, 196, -38, { size: 26 })) + heart(272, -88, 11, "pink");
  return s;
}, { box: [-230, -150, 540, 410], group: G.think, label: "Inner coach (kind voice)", tags: ["mind", "self compassion", "positive self talk", "encouragement", "coach", "confidence", "kind voice", "motivation"], call: call("mind-inner-coach", ', words: "you got this!"'), demo: {} });

reg("mind-angel-devil", (o) => {
  let s = bust(0, 66, 84, "worried", o, "gray");
  const hh = (d) => d * 110;
  s += sh(L.smooth([[-134, 98], [-168, 54], [-176, 100], [-134, 98]]), "white", { w: "detail" }) + sh(L.smooth([[-86, 98], [-54, 54], [-46, 100], [-86, 98]]), "white", { w: "detail" });
  s += sh(L.circ(-110, 98, 32), "white", { w: "prop" }) + L.face(-110, 98, 26, "smile", { skinName: "white" }) + st(L.arc(-110, 54, 22, 180, 360, 8), { c: "gold", w: 8 });
  s += st(L.smooth([[142, 130], [176, 128], [180, 96], [160, 80]]), { c: "red", w: "prop" }) + sh(L.poly([[150, 74], [172, 78], [160, 94]], true), "red", { w: "detail" });
  s += sh(L.poly([[84, 76], [86, 44], [104, 68]], true), "red", { w: "detail" }) + sh(L.poly([[136, 76], [134, 44], [116, 68]], true), "red", { w: "detail" });
  s += sh(L.circ(110, 98, 32), "red", { w: "prop" }) + L.face(110, 98, 26, "smug", { skinName: "red" });
  return s;
}, { box: [-230, -140, 460, 390], group: G.think, label: "Angel and devil on the shoulders", tags: ["mind", "angel", "devil", "temptation", "conscience", "moral choice", "good vs bad", "decision", "willpower"], call: call("mind-angel-devil"), demo: {} });

const monster = (x, y, k) => {
  const f = (pts) => L.smooth(pts.map(([a, b]) => [x + a * k, y + b * k]));
  let s = [[-20, -44], [12, -50], [34, -34]].map(([a, b], i) => sh(L.poly([[x + (a - 10) * k, y + (b + 14) * k], [x + (a + 2) * k, y + (b - 26) * k], [x + (a + 14) * k, y + (b + 14) * k]], true), "orange", { w: "detail" })).join("");
  s += sh(f([[0, -46], [38, -38], [54, 0], [48, 40], [0, 52], [-48, 40], [-54, 0], [-38, -38], [0, -46]]), "green", { w: "prop" });
  s += sh(L.circ(x - 20 * k, y + 52 * k, 12 * k, 8 * k), "green", { w: "detail", tone: 2 }) + sh(L.circ(x + 20 * k, y + 52 * k, 12 * k, 8 * k), "green", { w: "detail", tone: 2 });
  s += sh(L.circ(x, y - 6 * k, 22 * k), "white", { w: "detail" }) + L.flat(L.circ(x + 3 * k, y - 4 * k, 10 * k), "ink") + L.flat(L.circ(x, y - 8 * k, 3 * k), "white");
  return s + st(L.smooth([[x - 16 * k, y + 26 * k], [x, y + 36 * k], [x + 16 * k, y + 26 * k]]), { w: "detail" }) + st(L.poly([[x - 52 * k, y + 8 * k], [x - 68 * k, y - 22 * k]]), { w: "prop" }) + st(L.poly([[x + 52 * k, y + 8 * k], [x + 68 * k, y - 22 * k]]), { w: "prop" });
};
reg("mind-fear-monster", (o) => L.shadow(0, 88, 150) + monster(0, 30, 1.3) + sh(L.rrect(36, -92, 110, 50, 24), "white", { w: "prop" }) + L.text("boo!", 91, -56, { size: 30 }),
  { box: [-130, -120, 300, 240], group: G.think, label: "Fear monster (cute and small)", tags: ["mind", "fear", "monster", "phobia", "anxiety", "cute", "scared", "worry"], call: call("mind-fear-monster"), demo: {} });
reg("mind-fear-monster-shadow", (o) => {
  const k = 3.2, cx = 50, cy = -50, id = "mns" + ++nid, id2 = "mnw" + nid;
  const rnd = L.rng(5);
  const lobes = Array.from({ length: 56 }, (_, i) => { const a = (i / 56) * Math.PI * 2, r = 1 + 0.05 * Math.sin(i * 2.7) + (i % 2 ? 0.035 : -0.02) + rnd() * 0.02; return [cx + Math.cos(a) * 170 * r, cy + 12 + Math.sin(a) * 142 * r]; });
  lobes.push(lobes[0]);
  const sil = L.smooth(lobes).replace(/Z$/, "");
  const horn = (a, b, w, h) => L.poly([[cx + a - w, cy + b], [cx + a + 4, cy + b - h], [cx + a + w, cy + b]], true);
  const arm = (d) => L.smooth([[cx + d * 150, cy + 50], [cx + d * 196, cy - 10], [cx + d * 208, cy - 96], [cx + d * 192, cy - 146], [cx + d * 176, cy - 104], [cx + d * 166, cy - 40], [cx + d * 130, cy + 30]]);
  let s = sh(L.rrect(-250, 100, 500, 20, 8), "gray", { w: "prop" });
  s += `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${L.c("navy", 2)}" stop-opacity="0.3"/><stop offset="0.6" stop-color="${L.c("navy", 2)}" stop-opacity="0.62"/><stop offset="1" stop-color="${L.c("navy", 2)}" stop-opacity="0.85"/></linearGradient>
    <radialGradient id="${id2}"><stop offset="0" stop-color="${L.c("yellow", 1)}" stop-opacity="0.9"/><stop offset="1" stop-color="${L.c("yellow", 1)}" stop-opacity="0"/></radialGradient></defs>`;
  const fillS = (d) => L.tag("path", { d, fill: `url(#${id})` });
  s += fillS(sil) + [[-60, -50, 24, 90], [0, -62, 22, 110], [60, -50, 24, 90]].map(([a, b, w, h]) => fillS(horn(a * 2.1, b * 2.1 + 40, w * 1.5, h))).join("") + fillS(arm(-1)) + fillS(arm(1));
  // eyes glow, slit pupils, jagged grin
  [-1, 1].forEach((d) => { const ex = cx + d * 62, ey = cy - 30; s += L.tag("circle", { cx: ex, cy: ey, r: 52, fill: `url(#${id2})` }) + fl(L.circ(ex, ey, 30, 22), "yellow", 1, 0.95) + fl(L.circ(ex + d * 4, ey + 2, 6, 17), "ink", 0, 0.9) + fl(L.poly([[ex - d * 40, ey - 40], [ex + d * 36, ey - 16], [ex + d * 34, ey - 28]], true), "navy", 2, 0.85); });
  s += L.tag("path", { d: L.poly(Array.from({ length: 13 }, (_, i) => [cx - 96 + i * 16, cy + 60 + (i % 2 ? 22 : 0) + Math.sin(i / 12 * Math.PI) * 14]), false), fill: "none", stroke: L.c("yellow", 1), "stroke-width": 8, "stroke-linejoin": "round", "stroke-linecap": "round", opacity: 0.85 });
  s += L.shadow(-130, 100, 120) + monster(-130, 62, 0.82);
  return s;
}, { box: [-270, -300, 540, 430], group: G.think, label: "Fear monster with a huge shadow", tags: ["mind", "fear", "shadow", "monster", "exaggerate", "worry", "catastrophizing", "overestimate", "anxiety"], call: call("mind-fear-monster-shadow"), demo: {} });

const knotPts = () => {
  const T = (t) => [Math.sin(t) + 2 * Math.sin(2 * t), Math.cos(t) - 2 * Math.cos(2 * t)], k = 46, N = 160;
  return Array.from({ length: N }, (_, i) => { const t = 0.55 + (i / (N - 1)) * (2 * PI - 1.1), p = T(t); return [p[0] * k, p[1] * k * 0.95 + 8]; });
};
reg("mind-anxiety-knot", (o) => {
  const pts = knotPts(), N = pts.length;
  const ext = (p, q, n) => { const dx = p[0] - q[0], dy = p[1] - q[1], m = Math.hypot(dx, dy); return [p[0] + (dx / m) * n, p[1] + (dy / m) * n]; };
  const full = [ext(pts[0], pts[3], 90), ...pts, ext(pts[N - 1], pts[N - 4], 90)];
  const rope = (q, hl) => st(L.smooth(q), { c: "ink", w: 36 }) + st(L.smooth(q), { c: "red", w: 26 }) + (hl ? st(L.smooth(q.map(([x, y]) => [x - 3, y - 4])), { c: "white", w: 4, op: 0.5 }) : "");
  // crossings: alternate over/under along the rope
  const cr = [];
  for (let a = 0; a < N - 1; a++) for (let b = a + 6; b < N - 1; b++) {
    const [p1, p2, p3, p4] = [pts[a], pts[a + 1], pts[b], pts[b + 1]], d = (p2[0] - p1[0]) * (p4[1] - p3[1]) - (p2[1] - p1[1]) * (p4[0] - p3[0]);
    if (!d) continue;
    const u = ((p3[0] - p1[0]) * (p4[1] - p3[1]) - (p3[1] - p1[1]) * (p4[0] - p3[0])) / d, v = ((p3[0] - p1[0]) * (p2[1] - p1[1]) - (p3[1] - p1[1]) * (p2[0] - p1[0])) / d;
    if (u >= 0 && u < 1 && v >= 0 && v < 1) cr.push(a, b);
  }
  const visits = [...new Set(cr)].sort((x, y) => x - y).filter((v, i, arr) => !i || v - arr[i - 1] > 6);
  let s = rope(full, true);
  visits.forEach((v, i) => { if (i % 2 === 0) s += rope(pts.slice(Math.max(0, v - 7), Math.min(N, v + 9)).map((q) => q), false); });
  s += [[0, -160, 0], [-130, -110, -30], [130, -110, 30], [-170, 10, -80], [170, 10, 80]].map(([x, y, a]) => st(L.poly([P(18, a - 90, x, y), P(48, a - 90, x, y)]), { c: "ink", w: "prop" })).join("");
  return s;
}, { box: [-260, -190, 520, 380], group: G.think, label: "Anxiety knot (tight rope)", tags: ["mind", "anxiety", "knot", "tension", "tied up", "stress", "stomach", "tight", "worry"], call: call("mind-anxiety-knot"), demo: {} });

reg("mind-tangle-ball", (o) => {
  const d = L.circ(0, 0, 112);
  let s = sh(d, "pink", { w: "prop" });
  const r = L.rng(9);
  let inner = "";
  for (let i = 0; i < 9; i++) inner += st(L.smooth(Array.from({ length: 6 }, (_, j) => { const a = r() * 6.28 + j * 1.1, rad = 40 + 80 * r(); return [Math.cos(a) * rad, Math.sin(a) * rad]; })), { c: i % 3 ? "red" : "purple", w: "detail" });
  s += clip(d, inner) + st(d, { w: "prop" }) + fl(L.circ(-44, -52, 26, 15), "white", 0, 0.4);
  return s + st(L.smooth([[80, 78], [140, 100], [170, 70], [210, 100], [200, 130]]), { c: "red", w: "prop" });
}, { box: [-140, -140, 380, 290], group: G.think, label: "Ball of tangled yarn", tags: ["mind", "tangle", "confusion", "overthinking", "knotted thoughts", "mess", "yarn", "complicated"], call: call("mind-tangle-ball"), demo: {} });

reg("mind-spiral-down", (o) => {
  const pts = Array.from({ length: 96 }, (_, i) => { const t = i / 95, a = t * 6.5 * PI, r = 170 * Math.pow(1 - t, 0.85) + 8; return [Math.cos(a) * r, -110 + t * 230 + Math.sin(a) * r * 0.3]; });
  let s = st(L.smooth(pts), { c: "ink", w: 18, op: 0.0 }) + st(L.smooth(pts), { c: "purple", w: "char" });
  s += L.g(L.inline("mind-mood-sad", {}), "translate(110 -176) scale(0.4) rotate(10)");
  s += arrow([[0, 126], [0, 176]], "ink", "prop", 20);
  return s;
}, { box: [-200, -230, 400, 440], group: G.think, label: "Downward spiral", tags: ["mind", "spiral", "downward spiral", "rumination", "depression", "negative thinking", "vortex", "sinking"], call: call("mind-spiral-down"), demo: {} });

reg("mind-doubt-cloud", (o) => {
  let s = puff([[-120, 14, 56], [-44, -36, 76], [50, -34, 70], [122, 14, 54], [0, 34, 70]], "gray");
  [["?", -90, 36, 70], ["?", -10, -10, 96], ["?", 80, 30, 66], ["?", 130, -52, 44], ["?", -140, -50, 40]].forEach(([t, x, y, sz]) => (s += L.text(t, x, y, { size: sz, c: "white", halo: "ink", haloW: 0.1 })));
  return s + (o.labels === false ? "" : lab(o, "what if…?", 0, 150, 38));
}, { box: [-210, -130, 420, 330], group: G.think, label: "Cloud of doubts (question marks)", tags: ["mind", "doubt", "uncertainty", "what if", "confusion", "questions", "worry", "indecision"], call: call("mind-doubt-cloud"), demo: {} });

reg("mind-fixed-growth", (o) => {
  let s = bust(-190, 50, 62, "sad", o, "gray") + tailBub(-190, -90, 170, 66, "gray", -170) + L.text("I can't", -190, -80, { size: 30, c: "white", halo: "ink", haloW: 0.12 });
  s += bust(190, 50, 62, "determined", o, "green") + tailBub(190, -90, 220, 66, "green", 170) + L.text("I can't YET", 190, -80, { size: 30, c: "white", halo: "ink", haloW: 0.12 });
  s += st(L.poly([[190, -12], [190, -34]]), { c: "green", w: "prop" }) + sh(L.smooth([[190, -26], [214, -44], [226, -26], [200, -18], [190, -26]]), "green", { w: "detail" });
  return s + arrow([[-80, 40], [80, 40]], "ink", "prop", 20) + lab(o, "FIXED", -190, 250, 32) + lab(o, "GROWTH", 190, 250, 32);
}, { box: [-350, -150, 700, 430], group: G.think, wide: true, label: "Fixed vs growth mindset (can't vs can't yet)", tags: ["mind", "growth mindset", "fixed mindset", "yet", "learning", "belief", "carol dweck style", "comparison", "self talk"], call: call("mind-fixed-growth", ", labels: false"), demo: {} });

// ===================== growth and goals =====================
reg("mind-confidence-ladder", (o) => {
  const lv = Math.max(1, Math.min(5, o.level ?? 3));
  let s = L.shadow(0, 180, 200) + [-62, 62].map((x) => sh(L.rrect(x - 9, -190, 18, 366, 8), "wood", { w: "prop" })).join("");
  for (let i = 0; i < 5; i++) s += sh(L.rrect(-62, 130 - i * 76, 124, 16, 6), i < lv ? "green" : "wood", { w: "prop", tone: i < lv ? 0 : 1 });
  s += st(L.poly([[62, -190], [62, -272]]), { c: "wood", w: "prop" }) + sh(L.poly([[62, -272], [138, -250], [62, -226]], true), "red", { w: "detail" });
  s += L.g(L.inline("mind-mood-happy", {}), `translate(0 ${130 - (lv - 1) * 76 - 38}) scale(0.26)`);
  return s;
}, { box: [-160, -290, 320, 490], group: G.grow, label: "Confidence ladder (rung by rung)", tags: ["mind", "confidence", "ladder", "progress", "steps", "self esteem", "climb", "growth", "baby steps"], call: call("mind-confidence-ladder", ", level: 1..5"), demo: { level: 3 } });

reg("mind-procrastination-clock", (o) => {
  let s = [-1, 1].map((d) => sh(L.circ(d * 74, -112, 22), "gold", { w: "prop" })).join("");
  s += sh(L.circ(0, 0, 118), "red", { w: "prop" }) + sh(L.circ(0, 0, 100), "white", { w: "prop" });
  s += fl(sector(0, 0, 100, 62, 210, 270), "red", 0, 0.45);
  for (let i = 0; i < 12; i++) s += st(L.poly([P(86, i * 30, 0, 0), P(96, i * 30, 0, 0)]), { w: "detail" });
  s += st(L.poly([[0, 0], P(76, 210)]), { w: "prop" }) + st(L.poly([[0, 0], P(52, -96)]), { w: "char" });
  s += L.face(0, 38, 44, "sleepy", { skinName: "white" }) + L.text("z", 92, -34, { size: 40 }) + L.text("Z", 118, -66, { size: 54 });
  return s + lab(o, "LATER…", 0, 164, 40);
}, { box: [-150, -150, 300, 360], group: G.grow, label: "Sleepy clock (procrastination)", tags: ["mind", "procrastination", "deadline", "clock", "later", "lazy", "time", "putting off", "sleepy"], call: call("mind-procrastination-clock"), demo: {} });

reg("mind-todo-pile", (o) => {
  let s = L.shadow(0, 150, 260);
  [[-8, 56, "paper"], [6, 40, "cream"], [-4, 24, "paper"]].forEach(([r, y, c]) => (s += L.g(sh(L.rrect(-100, y - 20, 200, 130, 8), c, { w: "prop" }), `rotate(${r} 0 ${y})`)));
  s += L.g(sh(L.rrect(-100, -150, 200, 280, 10), "white", { w: "prop" }) + [0, 1, 2, 3, 4].map((i) => sh(L.rrect(-76, -100 + i * 44, 24, 24, 5), "white", { w: "detail" }) + st(L.poly([[-36, -88 + i * 44], [64 - (i % 3) * 22, -88 + i * 44]]), { c: "gray", w: "prop" })).join("") + (o.labels === false ? "" : L.text("TO DO", 0, -118, { size: 28 })) + st(L.smooth([[-72, -96], [-64, -82], [-52, -108]]), { c: "green", w: "prop" }), "rotate(3)");
  s += sh(L.rrect(70, -170, 70, 70, 6), "yellow", { w: "detail" }) + L.text("!", 105, -112, { size: 54, c: "red" });
  return s;
}, { box: [-150, -190, 300, 370], group: G.grow, label: "Towering to-do list", tags: ["mind", "to do", "list", "overwhelm", "tasks", "procrastination", "pile", "paperwork", "deadlines"], call: call("mind-todo-pile"), demo: {} });

reg("mind-goal-mountain", (o) => {
  let s = sh(L.circ(150, -150, 36), "yellow", { w: "prop" });
  s += sh(L.poly([[-250, 150], [-60, -70], [-10, -10], [70, -150], [250, 150]], true), "stone", { w: "prop" });
  s += sh(L.poly([[48, -108], [70, -150], [92, -112], [74, -100], [60, -112]], true), "snow", { w: "detail" }) + sh(L.poly([[-84, -42], [-60, -70], [-36, -38], [-52, -30], [-66, -40]], true), "snow", { w: "detail" });
  s += st(L.smooth([[-190, 138], [-110, 120], [-130, 80], [-30, 70], [-60, 20], [30, 0], [0, -50], [66, -108]]), { c: "brown", w: "prop", dash: "4 14" });
  s += st(L.poly([[70, -150], [70, -222]]), { c: "ink", w: "prop" }) + sh(L.poly([[70, -222], [138, -204], [70, -184]], true), "red", { w: "detail" });
  s += sh(L.rrect(-250, 150, 500, 22, 10), "grass", { w: "prop" }) + sh(L.rrect(-232, 96, 60, 34, 8), "wood", { w: "detail" }) + (o.labels === false ? "" : L.text("START", -202, 121, { size: 18, c: "white", halo: "ink", haloW: 0.15 }));
  return s;
}, { box: [-270, -240, 540, 440], group: G.grow, label: "Goal flag on a mountain (winding path)", tags: ["mind", "goal", "summit", "mountain", "journey", "achievement", "motivation", "path", "success"], call: call("mind-goal-mountain"), demo: {} });

const sprout = (x, y, k) => st(L.poly([[x, y], [x, y - 60 * k]]), { c: "green", w: "prop" }) + sh(L.smooth([[x, y - 50 * k], [x - 40 * k, y - 76 * k], [x - 46 * k, y - 46 * k], [x, y - 50 * k]]), "green", { w: "detail" }) + sh(L.smooth([[x, y - 56 * k], [x + 40 * k, y - 86 * k], [x + 46 * k, y - 54 * k], [x, y - 56 * k]]), "grass", { w: "detail" });
reg("mind-growth-stages", (o) => {
  const w = o.words || ["start", "practice", "progress", "mastery"];
  let s = sh(L.rrect(-330, 100, 660, 36, 14), "earth", { w: "prop" }) + sh(L.rrect(-330, 96, 660, 14, 7), "grass", { w: "detail" });
  s += sh(L.circ(-255, 90, 28, 18), "brown", { w: "prop" });
  s += sprout(-85, 96, 0.9);
  s += st(L.poly([[90, 96], [90, -30]]), { c: "brown", w: 12 }) + sh(L.smooth([[90, -20], [40, -50], [38, -96], [90, -86], [142, -100], [146, -50], [90, -20]]), "green", { w: "prop" });
  s += sh(L.rrect(236, -10, 28, 108, 10), "wood", { w: "prop" }) + sh(L.circ(250, -64, 62), "green", { w: "prop" }) + sh(L.circ(206, -30, 40), "grass", { w: "prop" }) + sh(L.circ(294, -30, 38), "grass", { w: "prop" }) + sh(L.circ(252, -114, 38), "green", { w: "prop", tone: 1 }) + sh(L.circ(228, -70, 7), "red", { w: "hair" }) + sh(L.circ(276, -52, 7), "red", { w: "hair" });
  [-255, -85, 90, 250].forEach((x, i) => (s += lab(o, w[i], x, 176, 34)));
  return s;
}, { box: [-350, -200, 700, 410], group: G.grow, wide: true, label: "Growth: seed to tree (4 stages)", tags: ["mind", "growth", "growth mindset", "seed", "tree", "progress", "learning", "stages", "mastery", "development"], call: call("mind-growth-stages", ', words: ["start","practice","progress","mastery"]'), demo: {} });

reg("mind-snowball", (o) => {
  let s = sh(L.poly([[-270, -90], [270, 130], [270, 150], [-270, 150]], true), "snow", { w: "prop" });
  s += st(L.poly([[-270, -90], [270, 130]]), { w: "prop" });
  [[-210, -76, 18], [-110, -30, 30], [20, 24, 50], [170, 78, 82]].forEach(([x, y, r], i) => {
    const cy = y - r;
    s += sh(L.circ(x, cy, r), "white", { w: "prop" }) + fl(L.circ(x - r * 0.35, cy - r * 0.35, r * 0.28, r * 0.18), "sky", 0, 0.4);
    if (i) s += st(L.poly([[x - r - 20, cy - 8], [x - r - 42, cy - 8]]), { w: "detail", op: 0.5 }) + st(L.poly([[x - r - 16, cy + 12], [x - r - 36, cy + 12]]), { w: "detail", op: 0.5 });
  });
  return s;
}, { box: [-300, -200, 600, 380], group: G.grow, wide: true, label: "Snowball rolling bigger (compounding)", tags: ["mind", "compound", "snowball", "momentum", "small habits", "growth", "tiny steps", "accumulate", "progress"], call: call("mind-snowball"), demo: {} });

reg("mind-fail-steps", (o) => {
  const w = o.words || ["oops", "again", "better", "WIN"], cs = ["gray", "blue", "teal", "green"];
  let s = "";
  w.forEach((t, i) => { const h = 70 + i * 66, x = -200 + i * 100; s += sh(L.rrect(x - 50, 130 - h, 100, h, 10), cs[i], { w: "prop" }) + L.text(t, x, 130 - h + 40, { size: 30, c: "white", halo: "ink", haloW: 0.14 }); });
  s += st(L.poly([[100, -138], [100, -214]]), { c: "ink", w: "prop" }) + sh(L.poly([[100, -214], [164, -196], [100, -178]], true), "red", { w: "detail" }) + sparkle(200, -60, 14);
  return s + arrow([[-230, -40], [-130, -110], [-40, -170]], "ink", "detail", 16);
}, { box: [-270, -240, 540, 410], group: G.grow, wide: true, label: "Failure as stairs (oops, again, better, win)", tags: ["mind", "failure", "mistakes", "learning", "steps", "resilience", "try again", "persistence", "fail forward"], call: call("mind-fail-steps", ', words: ["oops","again","better","WIN"]'), demo: {} });

reg("mind-comfort-zone", (o) => {
  let s = fl(L.circ(0, 0, 230, 190), "sky", 0, 0.35) + st(L.circ(0, 0, 150), { c: "ink", w: "prop", dash: "6 12" }) + fl(L.circ(0, 0, 148), "cream", 0, 1);
  s += sh(L.rrect(-86, 4, 120, 40, 12), "orange", { w: "prop" }) + sh(L.rrect(-74, -44, 96, 54, 16), "orange", { w: "prop", tone: 1 }) + sh(L.rrect(-100, -16, 28, 62, 12), "orange", { w: "prop", tone: 2 }) + sh(L.rrect(14, -10, 28, 56, 12), "orange", { w: "prop", tone: 2 });
  s += sh(L.circ(78, 20, 18), "white", { w: "prop" }) + st(L.arc(96, 20, 10, -90, 90), { w: "prop" }) + puff([[78, -10, 7], [84, -26, 8]], "white");
  s += arrow([[40, 100], [150, 100], [230, 20]], "red", "char", 26);
  s += sparkle(190, -90, 18) + sparkle(-190, -110, 12, "orange") + sparkle(-180, 100, 14, "pink") + sparkle(120, -150, 10, "white");
  return s + lab(o, "COMFORT ZONE", 0, -166, 30) + lab(o, "where the magic happens", 0, 224, 30);
}, { box: [-260, -210, 520, 470], group: G.grow, label: "Comfort zone circle with an arrow out", tags: ["mind", "comfort zone", "risk", "courage", "step out", "change", "challenge", "fear", "new things"], call: call("mind-comfort-zone"), demo: {} });

reg("mind-zones-rings", (o) => {
  let s = sh(L.circ(0, 0, 200), "red", { w: "prop" }) + sh(L.circ(0, 0, 138), "yellow", { w: "prop" }) + sh(L.circ(0, 0, 76), "green", { w: "prop" });
  s += o.labels === false ? "" : L.text("COMFORT", 0, 8, { size: 26, c: "white", halo: "ink", haloW: 0.15 }) + L.text("STRETCH", 0, -88, { size: 30 }) + L.text("PANIC", 0, -158, { size: 34, c: "white", halo: "ink", haloW: 0.15 });
  return s;
}, { box: [-220, -220, 440, 440], group: G.grow, label: "Comfort / stretch / panic zones (rings)", tags: ["mind", "learning zone", "comfort zone", "stretch", "panic", "challenge", "growth", "diagram", "zones"], call: call("mind-zones-rings"), demo: {} });

// ===================== connection and self =====================
reg("mind-empathy-bridge", (o) => {
  let s = "";
  [-1, 1].forEach((d) => { s += sh(L.poly([[d * 340, -2], [d * 90, -2], [d * 70, 190], [d * 340, 190]], true), "stone", { w: "prop" }) + sh(L.rrect(d < 0 ? -340 : 90, -28, 250, 32, 12), "grass", { w: "prop" }); });
  s += [-90, -45, 0, 45, 90].map((x) => st(L.poly([[x, -8], [x, -52]]), { c: "wood", w: "prop" })).join("") + st(L.poly([[-96, -52], [96, -52]]), { c: "wood", w: "prop" });
  s += sh(L.rrect(-110, -12, 220, 20, 8), "wood", { w: "prop" });
  s += L.g(L.inline("mind-mood-sad", {}), "translate(-190 -66) scale(0.3)") + L.g(L.inline("mind-mood-calm", {}), "translate(190 -62) scale(0.3)");
  s += heart(0, -110, 28, "red", { w: "prop" }) + heart(-66, -128, 10, "pink") + heart(70, -134, 9, "pink");
  return s;
}, { box: [-350, -190, 700, 390], group: G.conn, wide: true, label: "Empathy bridge between two people", tags: ["mind", "empathy", "bridge", "understanding", "connection", "compassion", "perspective", "gap", "listening"], call: call("mind-empathy-bridge"), demo: {} });

reg("mind-heart-bandage", (o) => {
  let s = heart(0, 0, 130, "red", { w: "prop" }) + fl(L.circ(-56, -64, 28, 16), "white", 0, 0.4);
  s += st(L.poly([[-8, -70], [14, -30], [-14, -4], [10, 36]]), { c: "ink", w: "prop", op: 0.0 });
  s += L.g(sh(L.rrect(-110, -26, 220, 52, 18), "sand", { w: "prop" }) + [-50, -30, 30, 50].map(() => "").join("") + sh(L.rrect(-40, -26, 80, 52, 0), "sand", { w: "detail", tone: 1 }) + [[-14, -8], [0, -8], [14, -8], [-14, 8], [0, 8], [14, 8]].map(([x, y]) => L.flat(L.circ(x, y, 3), "ink", 0.5)).join(""), "rotate(-30 0 0)");
  s += L.g(sh(L.rrect(-52, -14, 104, 28, 10), "sand", { w: "detail" }), "translate(-48 52) rotate(-24)") + sparkle(-130, -110, 14) + sparkle(130, -70, 11, "pink");
  return s;
}, { box: [-190, -170, 380, 360], group: G.conn, label: "Heart with a bandage (healing)", tags: ["mind", "heartbreak", "healing", "hurt", "grief", "self care", "emotional pain", "recovery", "support"], call: call("mind-heart-bandage"), demo: {} });

const benchScene = (o, night) => {
  let s = "";
  if (night) {
    s += L.flat(L.poly([[-190, -170], [-130, -170], [-60, 130], [-260, 130]], true), "yellow", 0, 0.22) + sh(L.circ(215, -120, 38), "cream", { w: "prop" }) + fl(L.circ(229, -129, 34), "navy", 0, 1) + sparkle(150, -150, 8, "white") + sparkle(250, -60, 6, "white");
    s += st(L.poly([[-190, 130], [-190, -150]]), { c: "gray", w: 12 }) + sh(L.rrect(-214, -176, 48, 30, 12), "yellow", { w: "prop" });
  }
  s += sh(L.rrect(-260, 128, 520, 22, 10), night ? "green" : "grass", { w: "prop", tone: night ? 2 : 0 });
  s += L.shadow(10, 130, 280);
  s += [-100, 100].map((x) => sh(L.rrect(x - 8, 70, 16, 62, 4), "wood", { w: "prop", tone: 2 })).join("");
  s += sh(L.rrect(-140, 34, 300, 30, 8), "wood", { w: "prop" }) + [0, 1].map((i) => sh(L.rrect(-140, -34 + i * 36, 300, 26, 8), "wood", { w: "prop", tone: 1 })).join("");
  s += sh(L.rrect(-124, 28, 30, 110, 4), "wood", { w: "prop", tone: 2 }) ;
  s += sh(L.rrect(-30, 0, 70, 70, 28), "gray", { w: "char" }) + sh(L.circ(-6, -40, 34), skin(o), { w: "char" }) + L.face(-6, -40, 34, "sad", { skinName: skin(o) });
  s += sh(L.rrect(-24, 62, 24, 62, 8), "navy", { w: "char" }) + sh(L.rrect(8, 62, 24, 62, 8), "navy", { w: "char" });
  s += puff([[40, -120, 28], [72, -138, 36], [106, -116, 26], [70, -106, 28]], "gray");
  s += [[58, -76], [80, -72], [98, -78]].map(([x, y]) => st(L.poly([[x, y], [x - 4, y + 14]]), { c: "blue", w: "prop" })).join("");
  return s;
};
reg("mind-lonely-bench-day", (o) => benchScene(o, false), { box: [-280, -190, 560, 360], group: G.conn, wide: true, label: "Lonely bench (day)", tags: ["mind", "loneliness", "alone", "isolation", "bench", "sad", "park", "left out", "friendless"], call: call("mind-lonely-bench-day"), demo: {} });
reg("mind-lonely-bench-night", (o) => benchScene(o, true), { box: [-280, -190, 560, 360], group: G.conn, wide: true, label: "Lonely bench (night, streetlamp)", tags: ["mind", "loneliness", "alone", "night", "bench", "sad", "streetlamp", "isolation", "moon"], call: call("mind-lonely-bench-night"), demo: {} });

reg("mind-kindness-gift", (o) => {
  let s = L.shadow(0, 116, 220) + sh(L.rrect(-100, -30, 200, 146, 14), "pink", { w: "prop" }) + sh(L.rrect(-114, -70, 228, 50, 12), "pink", { w: "prop", tone: 1 });
  s += sh(L.rect(-16, -70, 32, 186), "white", { w: "detail" }) + sh(L.smooth([[0, -70], [-48, -124], [-74, -96], [-30, -70], [0, -70]]), "white", { w: "detail" }) + sh(L.smooth([[0, -70], [48, -124], [74, -96], [30, -70], [0, -70]]), "white", { w: "detail" });
  s += heart(0, 38, 34, "red", { w: "prop" });
  s += heart(-128, -96, 14, "pink") + heart(134, -60, 12, "red") + heart(110, -150, 9, "pink") + sparkle(-140, 30, 12);
  s += L.g(sh(L.rrect(-34, -18, 68, 34, 6), "white", { w: "detail" }) + (o.labels === false ? "" : L.text("for you", 0, 6, { size: 18 })), "translate(100 -10) rotate(14)");
  return s;
}, { box: [-180, -190, 360, 330], group: G.conn, label: "Gift of kindness", tags: ["mind", "kindness", "gift", "generosity", "giving", "love", "gratitude", "present", "caring"], call: call("mind-kindness-gift"), demo: {} });

reg("mind-kindness-ripple", (o) => {
  let s = "";
  [[210, 0.12], [150, 0.22], [92, 0.4]].forEach(([r, op], i) => (s += st(L.circ(0, 60, r, r * 0.34), { c: "water", w: "prop", op: 0.5 + i * 0.2 })));
  s += fl(L.circ(0, 60, 210, 71), "water", 0, 0.18);
  s += drop(0, -60, 26, "water") + heart(0, 60, 22, "red", { w: "prop" });
  [[-150, 82], [130, 88], [-96, 116], [60, 112], [190, 56]].forEach(([x, y], i) => (s += heart(x, y, 12 - i, i % 2 ? "pink" : "red")));
  s += heart(-170, 30, 10, "pink") + heart(150, -10, 9, "red");
  return s;
}, { box: [-230, -130, 460, 300], group: G.conn, wide: true, label: "Ripples of kindness", tags: ["mind", "kindness", "ripple effect", "spread", "pay it forward", "hearts", "influence", "generosity", "impact"], call: call("mind-kindness-ripple"), demo: {} });

reg("mind-listening-ear", (o) => {
  const ear = L.smooth([[0, -120], [56, -104], [82, -50], [78, 10], [56, 56], [46, 100], [16, 132], [-24, 124], [-40, 92], [-38, 50], [-62, 0], [-60, -64], [-36, -104], [0, -120]]);
  const note = (x, y, k, c) => L.g(sh(L.circ(0, 0, 11, 8), c, { w: "detail" }) + st(L.poly([[10, -2], [10, -44]]), { w: "prop" }) + sh(L.smooth([[10, -44], [30, -36], [32, -20], [14, -28]]), c, { w: "detail" }), `translate(${x} ${y}) rotate(-15) scale(${k})`);
  let s = sh(ear, skin(o), { w: "char" }) + clip(ear, fl(L.smooth([[-34, -50], [8, -58], [24, -22], [-4, 8], [-22, 36], [10, 70], [40, 40], [56, -20], [40, -80], [-8, -92], [-34, -50]]), "ink", 0, 0.08) + fl(L.circ(-4, 8, 14, 20), "ink", 0, 0.22) + fl(L.circ(34, -86, 40, 12), "white", 0, 0.7)) + st(L.smooth([[-8, -92], [36, -80], [56, -36], [48, 10], [28, 44]]), { w: "prop", op: 0.75 }) + st(L.smooth([[-34, -50], [8, -58], [24, -22], [-4, 8], [-22, 36]]), { w: "prop", op: 0.75 });
  s += heart(-6, 74, 14, "red");
  [60, 100, 140].forEach((r) => (s += st(L.arc(-40, 0, r, 150, 210), { c: "blue", w: "char", op: 1 - r / 260 })));
  s += sh(L.rrect(-194, -150, 92, 58, 24), "white", { w: "prop" }) + sh(L.poly([[-140, -94], [-128, -76], [-116, -94]], true), "white", { w: "detail", flat: true }) + [-30, 0, 30].map((dx) => fl(L.circ(-148 + dx, -122, 6), "ink", 0, 0.8)).join("");
  return s + note(-150, 76, 0.9, "orange") + note(-190, -10, 0.7, "purple") + sparkle(100, 130, 12) + sparkle(-196, 100, 10, "orange");
}, { box: [-210, -170, 340, 330], group: G.conn, label: "Listening ear with sound waves", tags: ["mind", "listening", "ear", "active listening", "attention", "hearing", "understanding", "empathy", "conversation"], call: call("mind-listening-ear"), demo: {} });

reg("mind-circle-include", (o) => {
  const cs = ["red", "blue", "green", "orange", "purple", "teal"];
  let s = "";
  const pos = Array.from({ length: 6 }, (_, i) => P(120, -30 + i * 60 - 0, 0, 0)).filter((_, i) => i !== 0);
  const all = Array.from({ length: 6 }, (_, i) => P(120, -30 + i * 60 + 30, 0, 0)).slice(1);
  all.forEach((p, i) => { const q = all[i + 1]; if (q) s += st(L.poly([p, q]), { w: "char" }); });
  all.forEach((p, i) => (s += sh(L.circ(p[0], p[1], 30), "white", { w: "char" }) + L.face(p[0], p[1], 30, "smile", { skinName: "white" })));
  const gap = P(120, 0), nx = 250, ny = 0;
  s += sh(L.circ(nx, ny, 32), "white", { w: "char" }) + L.face(nx, ny, 32, "nervous", { skinName: "white" }) + arrow([[nx - 42, ny], [gap[0] + 40, gap[1]]], "green", "char", 22);
  return s + heart(gap[0] - 6, gap[1] - 4, 18, "pink");
}, { box: [-190, -190, 520, 380], group: G.conn, label: "Circle opening up to include someone new", tags: ["mind", "belonging", "inclusion", "friends", "welcome", "new person", "community", "loneliness", "group"], call: call("mind-circle-include"), demo: {} });

reg("mind-iceberg-self", (o) => {
  let s = sh(L.rrect(-300, -10, 600, 190, 0), "water", { w: "scene", tone: 1 });
  s = fl(L.rect(-310, -10, 620, 200), "water", 1, 0.35);
  s += sh(L.smooth([[-70, 0], [-46, -70], [-10, -64], [18, -130], [58, -60], [84, 0], [-70, 0]]), "snow", { w: "prop" });
  s += sh(L.smooth([[-84, 0], [-170, 60], [-150, 150], [-60, 210], [40, 230], [140, 170], [170, 80], [84, 0], [-84, 0]]), "glass", { w: "prop", tone: 0 });
  s += st(L.smooth([[-300, 0], [-200, -8], [-100, 4], [0, -6], [100, 4], [200, -8], [300, 0]]), { c: "water", w: "prop" });
  s += L.face(8, -50, 24, "smile", { skinName: "white" });
  s += L.g(heart(0, 0, 18, "red"), "translate(-70 90)") + L.g(puff([[0, 0, 12], [16, -6, 14], [32, 2, 11]], "gray"), "translate(20 70)") + L.text("?", 60, 130, { size: 50, c: "purple" }) + L.text("!", -20, 170, { size: 42, c: "orange" });
  return s + lab(o, "what people see", 100, -70, 26, undefined, "start") + lab(o, "what's inside", 176, 150, 28, undefined, "start");
}, { box: [-320, -170, 700, 420], group: G.conn, wide: true, label: "Iceberg: what people see vs what's inside", tags: ["mind", "iceberg", "hidden feelings", "inner world", "self", "appearance", "emotions", "depth", "personality"], call: call("mind-iceberg-self", ", labels: false"), demo: {} });

const glasses = (o, tint, gloom) => {
  let s = "";
  [-1, 1].forEach((d) => (s += sh(L.circ(d * 84, 0, 70), tint, { w: "prop", tone: 1 }) + fl(L.circ(d * 84 - 22, -24, 18, 10), "white", 0, 0.55)));
  s += st(L.arc(0, -8, 22, 200, 340), { w: "char" }) + st(L.poly([[-154, -6], [-210, -20]]), { w: "char" }) + st(L.poly([[154, -6], [210, -20]]), { w: "char" });
  if (gloom) s += puff([[-40, -130, 22], [-6, -150, 30], [36, -130, 22]], "gray") + [-30, 0, 30].map((x) => st(L.poly([[x, -100], [x - 6, -82]]), { c: "blue", w: "prop" })).join("");
  else s += heart(-40, -130, 14, "red") + heart(10, -150, 18, "pink") + heart(56, -122, 11, "red") + sparkle(170, -80, 12);
  return s;
};
reg("mind-glasses-rose", (o) => glasses(o, "pink", false), { box: [-230, -180, 460, 330], group: G.conn, label: "Rose-tinted glasses", tags: ["mind", "rose tinted", "optimism", "bias", "positive", "perspective", "glasses", "naive", "idealize"], call: call("mind-glasses-rose"), demo: {} });
reg("mind-glasses-gloomy", (o) => glasses(o, "gray", true), { box: [-230, -190, 460, 340], group: G.conn, label: "Gloomy-tinted glasses", tags: ["mind", "pessimism", "negative bias", "perspective", "glasses", "gloomy", "depression", "negativity", "dark view"], call: call("mind-glasses-gloomy"), demo: {} });

reg("mind-choice-overload", (o) => {
  const cs = ["red", "blue", "green", "orange", "purple", "teal"];
  let s = L.shadow(0, 200, 130) + sh(L.rrect(-12, -110, 24, 310, 6), "wood", { w: "prop" });
  cs.forEach((c, i) => { const a = -75 + i * 22 + (i % 2 ? 0 : 0), y = -70 + i * 50, d = i % 2 ? 1 : -1; s += L.g(sh(L.poly([[0, -20], [92 * d, -20], [120 * d, 0], [92 * d, 20], [0, 20]], true), c, { w: "prop" }), `translate(0 ${y}) rotate(${d * (10 - (i * 7) % 20)})`); });
  return s + L.text("?", 0, -128, { size: 80, c: "red", halo: "paper", haloW: 0.12 });
}, { box: [-170, -240, 340, 460], group: G.conn, label: "Signpost with too many choices", tags: ["mind", "choice overload", "decisions", "paralysis", "options", "overwhelm", "signpost", "indecision", "confusion"], call: call("mind-choice-overload"), demo: {} });
})();
