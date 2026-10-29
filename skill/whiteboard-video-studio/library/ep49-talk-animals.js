// ===================== library/ep49-talk-animals.js — animals that talk (or are listened to), a stick-figure T-shirt, a bee-dance diagram (ep49) =====================
// Ground animals: origin = bottom centre, facing right (flip: true for left). Swimmers / flyers / diagrams: origin = centre.
(function () {
const L = window.L, f1 = L.f1;
const B = (cx, cy, rx, ry, c, o) => L.shape(L.circ(cx, cy, rx, ry), c, o);
const P = (pts, c, o) => L.shape(L.smooth(pts.concat([pts[0]])), c, o);
const T = (pts, c, o) => L.shape(L.poly(pts, true), c, o);
const LB = (pts, w0, w1, c, o) => L.shape(L.limb(pts, w0, w1), c, o);
const dot = (x, y, r, c = "ink", op) => L.flat(L.circ(x, y, r), c, op);
const sm = (pts, o) => L.stroke(L.smooth(pts), Object.assign({ w: "detail" }, o));
const ln = (a, b, o) => L.stroke(L.line(a, b), Object.assign({ w: "detail" }, o));
const eye = (x, y, r = 8, k = 0.4, o = {}) => o.blink ? sm([[x - r, y], [x, y + r * 0.5], [x + r, y]]) :
  L.shape(L.circ(x, y, r), "white", { w: "detail", flat: true }) + dot(x + k * r * 0.35, y + r * 0.1, r * 0.56) + dot(x + k * r * 0.35 - r * 0.2, y - r * 0.15, r * 0.2, "white");
let N = 0;
const clip = (d, inner) => { const id = "e49" + ++N; return `<clipPath id="${id}"><path d="${d}"/></clipPath><g clip-path="url(#${id})">${inner}</g>`; };
const mouthOpen = (x, y, w, h) => L.shape(L.circ(x, y, w, h), "red", { w: "detail", tone: 2, flat: true }) + L.flat(L.circ(x, y + h * 0.45, w * 0.6, h * 0.45), "pink");
const BOX = [-180, -220, 360, 240];
const reg = (name, fn, group, label, tags, o = {}) => L.reg("animals", name, fn, Object.assign({ box: BOX, group, label, tags: ["animal"].concat(tags || []), call: `L.put(S, "${name}", x, gy, { s: 1, flip: false, t })`, demo: {} }, o));

// ---------- prairie dog: stands up on its hind legs. o: mouth (any value = shouting), alarm (paws up), blink ----------
reg("ep49-prairie-dog", (o) => {
  const up = o.alarm;
  let s = L.shadow(0, 0, 96);
  s += LB([[-24, -34], [-40, -22]], 14, 8, "earth", { tone: 2 });                       // stubby tail
  s += B(-14, -5, 17, 8, "earth", { tone: 2, w: "detail" }) + B(16, -5, 17, 8, "earth", { tone: 2, w: "detail" });
  s += P([[-30, -30], [-34, -70], [-22, -104], [4, -112], [28, -100], [36, -66], [30, -28], [0, -16]], "earth", { tone: 1 });
  s += L.flat(L.smooth([[4, -30], [-2, -60], [6, -92], [22, -86], [26, -60], [20, -34], [4, -30]]), "cream", 0.95);
  s += up ? LB([[22, -96], [40, -120], [42, -146]], 11, 8, "earth", { tone: 1 }) + B(42, -148, 8, 8, "earth", { tone: 2, w: "detail" }) :
    LB([[22, -92], [34, -74], [26, -64]], 11, 8, "earth", { tone: 1 }) + B(26, -63, 8, 7, "earth", { tone: 2, w: "detail" });
  s += B(-12, -142, 8, 8, "earth", { tone: 2 }) + B(-12, -142, 4, 4, "pink", { flat: true, w: "detail" });                                  // ear
  s += B(8, -128, 30, 28, "earth", { tone: 1 }) + P([[14, -124], [34, -128], [44, -116], [38, -104], [20, -106]], "cream");           // head + muzzle
  s += eye(14, -136, 7.5, 0.6, o) + L.flat(L.circ(46, -118, 5), "ink");
  s += o.mouth ? mouthOpen(34, -104, 8, 9) : sm([[24, -108], [34, -102], [44, -108]]);
  s += ln([42, -112], [62, -118], { w: 2 }) + ln([42, -108], [62, -106], { w: 2 });
  return s;
}, "Talk to animals", "Prairie dog (standing)", ["prairie dog", "marmot", "rodent", "colony", "alarm", "burrow"], { box: [-110, -190, 220, 200], call: 'L.put(S, "ep49-prairie-dog", x, gy, { s, t, flip, mouth: true, alarm: true })', demo: { mouth: true } });

// dirt mound with a burrow hole; the animal stands on top at about y -40 (feet at the mound top)
reg("ep49-mound", (o) => {
  const w = o.w || 200, h = o.h || 60, d = L.smooth([[-w / 2, 0], [-w * 0.34, -h * 0.7], [-w * 0.1, -h], [w * 0.14, -h * 0.98], [w * 0.36, -h * 0.66], [w / 2, 0], [-w / 2, 0]]);
  return L.shadow(0, 0, w * 1.1) + L.shape(d, "earth", { tone: 1 }) + L.flat(L.circ(w * 0.04, -h * 0.55, w * 0.17, h * 0.16), "earth", 0.9).replace(/fill="[^"]*"/, 'fill="' + L.c("brown", 2) + '"') +
    [[-0.3, -0.2], [0.28, -0.25], [0.05, -0.85]].map(([a, b]) => dot(w * a, h * b, 3, "brown", 0.7)).join("");
}, "Talk to animals", "Dirt mound", ["mound", "burrow", "dirt", "hill", "prairie"], { box: [-120, -80, 240, 90], call: 'L.put(S, "ep49-mound", x, gy, { s, t, w: 200, h: 60 })' });

// ---------- T-shirt overlay for the pure stick figures (draw it AFTER the figure, same x, gy, s). o.c colour name, o.print text ----------
reg("ep49-tee", (o) => {
  const c = o.c || "yellow", d = "M-14 -258 Q0 -246 14 -258 L44 -244 L60 -206 L40 -196 L34 -208 L34 -128 L-34 -128 L-34 -208 L-40 -196 L-60 -206 L-44 -244 Z";
  const tee = L.shape(d, c, { w: "detail" }) + L.stroke("M-14 -258 Q0 -246 14 -258", { w: "detail" }) + (o.print ? L.text(o.print, 0, -176, { size: 28 }) : "");
  return o.center ? L.g(tee, "translate(0 193)") : tee; // center: true = origin at the shirt's centre (for icons, bubbles, thumbnails)
}, "Talk to animals", "T-shirt on a stick figure", ["shirt", "tee", "clothes", "stick figure", "yellow", "green", "blue"],
  { box: [-70, -270, 140, 150], call: 'L.put(S, "ep49-tee", x, gy, { s, t, c: "yellow", center: false })  // after the figure, same x/gy/s; colour names: yellow green blue red …', demo: { c: "yellow" } });

// ---------- raptor: hawk or eagle in flight, facing right. o.kind "hawk" (red tail) | "eagle" (white head) ----------
L.reg("animals", "ep49-raptor", (o) => {
  const eagle = o.kind === "eagle", wing = eagle ? "brown" : "earth", tail = eagle ? "white" : "orange";
  let s = L.shadow(0, 130, 120).replace(/opacity="[^"]*"/, 'opacity="0"');
  s += T([[-20, -6], [-64, -62], [-120, -92], [-190, -88], [-170, -72], [-186, -62], [-150, -52], [-160, -40], [-120, -34], [-90, -6], [-40, 10]], wing, { tone: 2 });                       // far wing
  s += T([[-52, 8], [-120, 26], [-132, 52], [-108, 50], [-96, 66], [-70, 52], [-40, 30]], tail, { tone: eagle ? 0 : 2 });               // tail fan
  s += P([[-56, 0], [-30, -26], [20, -26], [54, -8], [50, 26], [8, 38], [-40, 30]], wing, { tone: 0 });                                    // body
  s += L.flat(L.smooth([[-10, 8], [10, -6], [36, 4], [30, 24], [4, 28], [-10, 8]]), "cream", 0.9);
  s += T([[-8, -6], [-40, -62], [-96, -104], [-176, -128], [-160, -106], [-176, -98], [-150, -84], [-164, -72], [-130, -58], [-138, -44], [-100, -34], [-100, -22], [-60, 6]], wing, { tone: 0 });       // near wing, fingered tip
  s += [0, 1, 2].map((i) => sm([[-50 - i * 28, -50 - i * 14], [-96 - i * 24, -84 - i * 12]], { c: "ink", w: 3 })).join("");
  s += B(50, -22, 24, 22, eagle ? "white" : wing, { tone: eagle ? 0 : 1 });                                                               // head
  s += T([[66, -26], [90, -16], [78, -2], [64, -8]], "gold") + T([[72, -12], [84, -14], [76, -2]], "gold", { w: "detail", tone: 2 });       // hooked beak
  s += eye(56, -28, 6, 0.7, o) + L.stroke("M44 -42 L66 -34", { w: "detail" });                                                           // stern brow
  s += LB([[24, 34], [26, 52]], 6, 5, "gold") + LB([[38, 32], [42, 50]], 6, 5, "gold");
  return s;
}, { box: [-190, -140, 290, 220], group: "Talk to animals", label: "Hawk / eagle in flight", tags: ["animal", "hawk", "eagle", "bird", "predator", "raptor"], call: 'L.put(S, "ep49-raptor", x, y, { s, t, flip, kind: "hawk"|"eagle" })', demo: { kind: "hawk" } });

// ---------- leopard (spotted, low and long) ----------
reg("ep49-leopard", (o) => {
  const by = -64, bd = L.circ(0, by, 86, 30);
  const leg = (x, tone) => LB([[x, by + 8], [x + (tone ? 4 : -2), -4]], 20, 16, "gold", { tone }) + B(x + (tone ? 8 : 2), -4, 15, 7, "gold", { tone, w: "detail" });
  const spots = [[-50, -8], [-24, 6], [4, -14], [34, 2], [-62, 16], [58, -10], [-8, 22], [22, 20], [-40, -22]].map(([x, y]) => L.flat(L.circ(x, by + y * 0.9, 7, 5.5), "brown", 0.95)).join("");
  let s = L.shadow(0, 0, 220) + LB([[-78, by - 2], [-130, by + 10], [-150, by - 36], [-130, by - 74]], 14, 9, "gold") + leg(-48, 2) + leg(40, 2) + L.shape(bd, "gold") + clip(bd, spots + L.flat(L.circ(0, by + 30, 90, 14), "cream", 0.9)) + leg(-62, 0) + leg(58, 0);
  s += LB([[70, by - 12], [86, by - 38]], 34, 28, "gold");
  s += B(98, by - 44, 28, 25, "gold") + T([[82, by - 64], [86, by - 82], [100, by - 66]], "gold") + T([[104, by - 66], [118, by - 80], [120, by - 58]], "gold") + P([[104, by - 40], [124, by - 42], [128, by - 30], [112, by - 24], [100, by - 28]], "cream");
  s += eye(100, by - 50, 6, 0.6, o) + dot(124, by - 38, 4, "ink") + [[84, by - 56], [110, by - 58], [88, by - 30]].map(([x, y]) => dot(x, y, 2.6, "brown")).join("") + sm([[110, by - 28], [118, by - 25], [126, by - 30]]);
  return s;
}, "Talk to animals", "Leopard", ["leopard", "cat", "spots", "predator", "vervet"], { box: [-170, -150, 320, 160] });

// ---------- coyote (tawny, long legs, pointed ears) ----------
reg("ep49-coyote", (o) => {
  const by = -74, bd = L.circ(0, by, 70, 28);
  const leg = (x, tone) => LB([[x, by + 8], [x + (tone ? 3 : -3), -4]], 14, 10, "earth", { tone: tone ? 2 : 1 }) + B(x + (tone ? 7 : 1), -4, 12, 6, "earth", { tone: 2, w: "detail" });
  let s = L.shadow(0, 0, 190) + P([[-60, by - 6], [-104, by + 6], [-132, by + 26], [-122, by + 44], [-92, by + 30], [-62, by + 16]], "earth", { tone: 1 }) + L.flat(L.circ(-124, by + 36, 11, 9), "ink", 0.85);
  s += leg(-40, 1) + leg(36, 1) + L.shape(bd, "earth", { tone: 1 }) + clip(bd, L.flat(L.circ(0, by + 24, 76, 14), "cream", 0.9) + L.flat(L.circ(-10, by - 22, 60, 12), "gray", 0.55)) + leg(-54, 0) + leg(50, 0);
  s += LB([[56, by - 8], [72, by - 36]], 28, 24, "earth", { tone: 1 });
  const hx = 84, hy = by - 52;
  s += T([[hx - 22, hy - 8], [hx - 20, hy - 52], [hx - 2, hy - 20]], "earth", { tone: 1 }) + T([[hx + 2, hy - 20], [hx + 20, hy - 54], [hx + 26, hy - 14]], "earth", { tone: 1 }) + L.flat(L.poly([[hx - 15, hy - 16], [hx - 14, hy - 40], [hx - 6, hy - 22]], true), "pink", 0.8);
  s += B(hx, hy, 26, 22, "earth", { tone: 1 }) + P([[hx + 8, hy - 8], [hx + 52, hy + 2], [hx + 54, hy + 12], [hx + 20, hy + 20], [hx + 4, hy + 12]], "sand") + dot(hx + 54, hy + 4, 5, "ink") + eye(hx + 8, hy - 10, 6.5, 0.7, o) + sm([[hx + 20, hy + 12], [hx + 38, hy + 16], [hx + 50, hy + 11]]);
  return s;
}, "Talk to animals", "Coyote", ["coyote", "wolf", "dog", "predator", "wild"], { box: [-170, -170, 340, 180] });

// ---------- marmoset: small monkey, white ear tufts, banded tail ----------
reg("ep49-marmoset", (o) => {
  let s = L.shadow(0, 0, 80);
  for (let i = 0; i < 6; i++) { const a = [[-18, -30], [-50, -26], [-64, -50], [-54, -82], [-36, -102], [-14, -106]]; if (i < 5) s += LB([a[i], a[i + 1]], 10, 9, i % 2 ? "ink" : "gray", { tone: i % 2 ? 0 : 1 }); }
  s += LB([[-8, -34], [-10, -4]], 14, 12, "wood", { tone: 1 }) + B(-6, -4, 13, 6, "wood", { tone: 2, w: "detail" }) + LB([[14, -34], [16, -4]], 14, 12, "wood", { tone: 1 }) + B(20, -4, 13, 6, "wood", { tone: 2, w: "detail" });
  s += P([[-26, -40], [-28, -76], [-6, -92], [22, -80], [24, -42], [0, -26]], "wood", { tone: 1 }) + L.flat(L.circ(4, -52, 11, 16), "cream", 0.85);
  s += LB([[16, -78], [30, -60], [26, -48]], 9, 7, "wood", { tone: 1 }) + B(26, -46, 6, 6, "cream", { w: "detail" });
  s += P([[-30, -112], [-52, -134], [-38, -98]], "white", { w: "detail" }) + P([[24, -112], [44, -134], [34, -98]], "white", { w: "detail" });                // ear tufts
  s += B(-3, -108, 28, 26, "wood", { tone: 1 }) + B(2, -100, 19, 15, "cream") + eye(-10, -114, 6.5, 0.5, o) + eye(12, -114, 6.5, 0.5, o) + L.flat(L.circ(2, -102, 3, 2.4), "ink") + sm([[-6, -92], [2, -88], [10, -92]]);
  return s;
}, "Talk to animals", "Marmoset", ["marmoset", "monkey", "primate", "tiny", "tail"], { box: [-90, -150, 180, 160] });

// ---------- border collie (sitting; Chaser) ----------
reg("ep49-collie", (o) => {
  const head = (hx, hy) => P([[hx - 4, hy - 24], [hx - 32, hy - 18], [hx - 36, hy + 18], [hx - 14, hy + 16]], "ink") + B(hx, hy, 30, 28, "ink") + P([[hx + 2, hy - 26], [hx + 10, hy - 22], [hx + 12, hy + 2], [hx + 24, hy + 26], [hx + 8, hy + 28], [hx - 2, hy + 4]], "white", { flat: true, w: "detail" }) +
    B(hx + 24, hy + 10, 20, 15, "white") + dot(hx + 41, hy + 4, 6, "ink") + eye(hx + 11, hy - 8, 8, 0.6, o) + sm([[hx + 18, hy + 16], [hx + 28, hy + 22], [hx + 40, hy + 15]]) +
    (o.tongue === false ? "" : L.shape(L.poly([[hx + 24, hy + 20], [hx + 32, hy + 21], [hx + 33, hy + 36], [hx + 25, hy + 36]], true), "pink", { w: "detail" }));
  return L.shadow(0, 0, 150) + LB([[-40, -20], [-82, -18], [-100, -44]], 14, 8, "ink") + B(-26, -42, 44, 40, "ink") + LB([[28, -80], [32, -8]], 20, 18, "white") + B(40, -7, 18, 9, "white", { w: "detail" }) + B(-8, -8, 30, 10, "ink", { w: "detail" }) +
    L.g(B(8, -88, 36, 52, "ink"), "rotate(14 8 -88)") + L.flat(L.circ(10, -80, 18, 30), "white", 0.98) + head(36, -150);
}, "Talk to animals", "Border collie (sitting)", ["border collie", "dog", "chaser", "black and white", "pet"], { box: [-150, -230, 300, 250] });

// ---------- sperm whale (side view, facing right; o.clicks draws sound arcs from the head) ----------
L.reg("animals", "ep49-sperm-whale", (o) => {
  const bd = L.smooth([[-170, 28], [-120, 4], [-50, -30], [30, -58], [100, -84], [170, -86], [206, -52], [212, -4], [200, 34], [150, 54], [60, 54], [-30, 50], [-110, 40], [-170, 28]]);
  let s = L.g(P([[-150, 16], [-196, -8], [-214, -46], [-182, -38], [-166, -66], [-144, -20]], "gray", { tone: 2 }) + P([[-150, 20], [-198, 34], [-218, 70], [-186, 52], [-162, 60], [-142, 28]], "gray", { tone: 2 }), "");
  s += L.shape(bd, "gray", { tone: 2 });
  s += clip(bd, [0, 1, 2, 3, 4, 5, 6].map((i) => L.stroke(`M${-120 + i * 34} ${-10 + (i % 2) * 8} q12 14 4 34`, { c: "gray", w: 2, op: 0.5 })).join("") + L.flat(L.circ(20, 66, 220, 30), "cream", 0.5));
  s += P([[100, 26], [196, 26], [190, 48], [120, 62], [90, 50]], "gray", { tone: 1 });                                                       // narrow lower jaw
  s += [0, 1, 2, 3, 4].map((i) => L.stroke(`M${112 + i * 15} 30 v10`, { c: "white", w: 3 })).join("");
  s += sm([[204, 0], [160, 18], [110, 26]]) + eye(110, -10, 8, 0.7, o) + sm([[196, -84], [206, -104]], { w: 5 });                              // eye, smile line, blowhole
  s += L.stroke("M-26 -50 q6 -16 18 -16", { w: "detail" });
  if (o.clicks) s += [1, 2, 3].map((i) => L.stroke(L.arc(214, -22, 24 + i * 22, -42, 42), { c: "ink", w: 5, op: 0.9 - i * 0.2 })).join("");
  return s;
}, { box: [-230, -100, 450, 190], group: "Talk to animals", label: "Sperm whale", tags: ["animal", "sperm whale", "whale", "sea", "ocean", "coda", "clicks"], call: 'L.put(S, "ep49-sperm-whale", x, y, { s, t, flip, clicks: true })', demo: { clicks: true } });

// ---------- cuttlefish (swimmer, centre origin) ----------
L.reg("animals", "ep49-cuttlefish", (o) => {
  const c = o.c || "orange", bd = L.smooth([[-90, 0], [-60, -30], [0, -40], [60, -30], [92, -8], [90, 14], [50, 30], [-10, 34], [-60, 26], [-90, 0]]);
  let s = [[-24, 34], [-8, 40], [10, 40], [26, 34]].map(([x, y], i) => LB([[x + 80, y - 4], [x + 112 + i * 4, y + 14 - i * 3], [x + 130, y + 4 + i * 5]], 9, 5, c, { tone: 2 })).join("");
  s += LB([[84, 4], [132, -20], [156, -12]], 7, 6, c, { tone: 2 }) + LB([[84, 10], [134, -2], [158, 16]], 7, 6, c, { tone: 2 });
  s += L.shape(bd, c, { tone: 1 }) + clip(bd, [-70, -40, -10, 30, 60].map((x, i) => L.flat(L.circ(x, -14 + (i % 2) * 18, 14, 6), "brown", 0.28)).join(""));
  s += P([[-84, -2], [-60, -42], [20, -50], [-30, -28], [-60, 20]], c, { tone: 2, w: "detail" }).replace(/<path /, '<path opacity="0.55" ');
  s += L.shape(L.circ(62, -6, 15, 12), "white", { w: "detail", flat: true }) + L.flat(L.rect(52, -8, 20, 5), "ink") + dot(66, -8, 3, "white");
  return s;
}, { box: [-110, -70, 280, 120], group: "Talk to animals", label: "Cuttlefish", tags: ["animal", "cuttlefish", "squid", "sea", "ocean", "colour"], call: 'L.put(S, "ep49-cuttlefish", x, y, { s, t, flip, c: "orange" })', demo: {} });

// ---------- sound waves from a mouth: three arcs opening to the right. o.n arcs, o.c colour ----------
L.reg("effects", "ep49-call-waves", (o) => {
  const n = o.n || 3;
  return Array.from({ length: n }, (_, i) => L.stroke(L.arc(-20, 0, 34 + i * 30, -48, 48), { c: o.c || "ink", w: 7, op: 1 - i * 0.22 })).join("");
}, { box: [-40, -120, 200, 240], group: "Talk to animals", label: "Call waves (sound arcs)", tags: ["effects", "sound", "call", "shout", "alarm", "noise"], call: 'L.put(S, "ep49-call-waves", x, y, { s, t, flip, n: 3, c: "ink" })', demo: {} });

// ---------- waggle dance diagram on a dark comb panel. o.angle (degrees clockwise from straight up), o.round (circle dance), o.run (0.3..1) ----------
L.reg("science", "ep49-waggle-dance", (o) => {
  const W = 560, H = 440, a = ((o.angle ?? 40) * Math.PI) / 180, run = (o.run ?? 0.8) * 230, round = o.round;
  const dx = Math.sin(a), dy = -Math.cos(a), cx = 0, cy = 120;
  let s = L.shape(L.rrect(-W / 2, -H / 2, W, H, 28), "brown", { tone: 2, w: "prop" });
  s += clip(L.rrect(-W / 2, -H / 2, W, H, 28), Array.from({ length: 9 * 7 }, (_, k) => { const r = Math.floor(k / 9), c = k % 9, x = -W / 2 + 40 + c * 66 + (r % 2) * 33, y = -H / 2 + 36 + r * 58; return L.flat(L.poly(Array.from({ length: 6 }, (_, j) => [x + Math.cos(j * Math.PI / 3 + Math.PI / 6) * 30, y + Math.sin(j * Math.PI / 3 + Math.PI / 6) * 30]), true), "gold", 0.22); }).join(""));
  if (round) {
    s += L.stroke(L.circ(cx, cy - 50, 90), { c: "white", w: 7 }) + L.stroke("M0 -170 v-40 m-10 14 l10 -16 l10 16", { c: "white", w: 6 });
    s += L.g(L.inline("animal-bee"), `translate(${cx + 90} ${cy - 50}) scale(0.85) rotate(90)`);
    return s + L.text("ROUND", 0, H / 2 - 22, { size: 40, c: "white" });
  }
  const mid = (sg) => { const ex = cx + dx * run, ey = cy + dy * run, px = -dy * sg * 120, py = dx * sg * 120; return `M${f1(ex)} ${f1(ey)} C${f1(ex + px)} ${f1(ey + py)} ${f1(cx + px)} ${f1(cy + py)} ${f1(cx)} ${f1(cy)}`; };
  s += L.stroke(mid(1), { c: "white", w: 6, op: 0.85 }) + L.stroke(mid(-1), { c: "white", w: 6, op: 0.85 });
  s += L.stroke(`M${f1(cx)} ${f1(cy)} L${f1(cx + dx * run)} ${f1(cy + dy * run)}`, { c: "yellow", w: 12 });                               // the waggle run
  s += L.stroke(`M0 ${cy} v-300`, { c: "white", w: 3, dash: "10 10", op: 0.7 });                                                           // straight up = toward the Sun
  s += L.stroke(L.arc(cx, cy, 170, -90, -90 + (o.angle ?? 40)), { c: "red", w: 6 });
  s += L.g(L.inline("animal-bee"), `translate(${f1(cx + dx * run * 1.0 + dx * 28)} ${f1(cy + dy * run * 1.0 + dy * 28)}) rotate(${f1((o.angle ?? 40) - 90)}) scale(0.85)`);
  return s;
}, { box: [-290, -230, 580, 460], group: "Talk to animals", label: "Waggle dance diagram", tags: ["bee", "waggle", "dance", "hive", "comb", "direction", "sun", "angle", "round dance"], call: 'L.put(S, "ep49-waggle-dance", x, y, { s, t, angle: 40, run: 0.8, round: false })', demo: { angle: 40 } });

})();
