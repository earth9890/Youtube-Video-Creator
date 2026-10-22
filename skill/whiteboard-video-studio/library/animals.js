// ===================== library/animals.js — friendly cartoon animals =====================
// Ground animals: origin = bottom centre, facing right (use flip: true for left). Swimmers / flyers: origin = centre.
// Every animal takes o.c (body colour name) where it makes sense, and o.blink. Drawn only through the L.* tokens.
(function () {
const L = window.L, f1 = L.f1;
let N = 0;
const B = (cx, cy, rx, ry, c, o) => L.shape(L.circ(cx, cy, rx, ry), c, o);
const P = (pts, c, o) => L.shape(L.smooth(pts.concat([pts[0]])), c, o);          // closed smooth blob through points
const T = (pts, c, o) => L.shape(L.poly(pts, true), c, o);                         // polygon (ears, fins, beaks)
const LB = (pts, w0, w1, c, o) => L.shape(L.limb(pts, w0, w1), c, o);               // tube along a polyline (legs, tails, necks)
const dot = (x, y, r, c = "ink", op) => L.flat(L.circ(x, y, r), c, op);
const sm = (pts, o) => L.stroke(L.smooth(pts), Object.assign({ w: "detail" }, o));
const ln = (a, b, o) => L.stroke(L.line(a, b), Object.assign({ w: "detail" }, o));
const blush = (x, y, r) => L.flat(L.circ(x, y, r, r * 0.6), "pink", 0.75);
// friendly eye: white, pupil looking by k (-1..1), highlight. o.blink -> closed arc
const eye = (x, y, r = 8, k = 0.4, o = {}) => o.blink ? sm([[x - r, y], [x, y + r * 0.5], [x + r, y]], { w: "detail" }) :
  L.shape(L.circ(x, y, r), "white", { w: "detail", flat: true }) + dot(x + k * r * 0.35, y + r * 0.1, r * 0.56) + dot(x + k * r * 0.35 - r * 0.2, y - r * 0.15, r * 0.2, "white");
const pupil = (x, y, r) => dot(x, y, r) + dot(x - r * 0.3, y - r * 0.3, r * 0.3, "white");     // simple dot eye with glint
// clip drawing to a path (patches, stripes, spots)
const clip = (d, inner) => { const id = "an" + ++N; return `<clipPath id="${id}"><path d="${d}"/></clipPath><g clip-path="url(#${id})">${inner}</g>`; };
const rim = (d, c, o = {}) => L.tag("path", { d, fill: "none", stroke: L.outline(c), "stroke-width": L.lw(o.w || "prop", o.s || 1), "stroke-linejoin": "round" });
const bumpy = (cx, cy, rx, ry, n, k = 0.9, a0 = 0) => L.smooth(Array.from({ length: n + 1 }, (_, i) => { const a = a0 + (i % n) / n * Math.PI * 2, r = i % 2 ? k : 1; return [cx + Math.cos(a) * rx * r, cy + Math.sin(a) * ry * r]; }));

// four-legged side view, facing right. o: c, lc (leg colour), brx, bry, lh (leg height), lw, hoof (colour|null), back(by,brx), tail(by,brx), head(by,brx), deco(bodyPath,by,brx), neck, paw
function quad(o) {
  const brx = o.brx || 75, bry = o.bry || 40, lh = o.lh || 55, lw = o.lw || 22, by = -(lh + bry * 0.55), c = o.c, lc = o.lc || c, bp = o.bp ? o.bp(by, brx) : L.circ(0, by, brx, bry), tn = o.tone || 0;
  const leg = (x, tone) => LB([[x, by + 8], [x, -lw * 0.4]], lw, lw * 0.9, lc, { tone: tone || tn, flat: tone === 2 }) + (o.hoof ? L.shape(L.rrect(x - lw * 0.46, -lw * 0.55, lw * 0.92, lw * 0.55, 5), o.hoof, { w: "detail", flat: true }) : B(x + lw * 0.1, -lw * 0.3, lw * 0.62, lw * 0.34, lc, { tone: tone || tn, flat: tone === 2, w: "detail" }));
  let s = L.shadow(0, 0, brx * 2.5);
  s += o.back ? o.back(by, brx) : "";
  s += o.tail ? o.tail(by, brx) : "";
  s += leg(-brx * 0.3, 2) + leg(brx * 0.42, 2);
  s += L.shape(bp, c, { tone: tn });
  if (o.deco) s += clip(bp, o.deco(by, brx)) + rim(bp, c);
  s += leg(-brx * 0.6, 0) + leg(brx * 0.68, 0);
  s += o.neck ? o.neck(by, brx) : "";
  s += o.head ? o.head(by, brx, o) : "";
  return s;
}
const QBOX = [-180, -220, 360, 240];
const reg = (name, fn, group, label, tags, o = {}) => L.reg("animals", name, fn, Object.assign({ box: QBOX, group, label, tags: ["animal"].concat(tags || []), call: `L.put(S, "${name}", x, gy, { s: 1, flip: false, t })`, demo: {} }, o));

// ---------- Pets ----------
const dogHead = (hx, hy, o) => P([[hx - 6, hy - 22], [hx - 30, hy - 24], [hx - 38, hy + 6], [hx - 20, hy + 10]], "brown") + B(hx, hy, 30, 28, "earth") + B(hx + 24, hy + 8, 20, 14, "cream") +
  P([[hx + 8, hy - 26], [hx - 10, hy - 30], [hx - 22, hy - 4], [hx - 18, hy + 16], [hx - 2, hy + 12]], "brown") + dot(hx + 41, hy + 2, 6) + eye(hx + 11, hy - 8, 8, 0.6, o) +
  P([[hx + 27, hy + 18], [hx + 34, hy + 18], [hx + 35, hy + 31], [hx + 28, hy + 31]], "pink", { w: "detail" }) + sm([[hx + 20, hy + 15], [hx + 30, hy + 21], [hx + 41, hy + 14]]) +
  L.shape(L.poly([[hx - 22, hy + 18], [hx - 4, hy + 30], [hx + 4, hy + 22], [hx - 14, hy + 10]], true), "red", { w: "detail" });
reg("animal-dog", (o) => quad({ c: "earth", brx: 68, bry: 36, lh: 50, lw: 20, tail: (by, brx) => LB([[-brx + 8, by - 4], [-brx - 18, by - 22], [-brx - 24, by - 56]], 14, 8, "earth"),
  deco: (by) => L.flat(L.circ(-14, by - 6, 28, 20), "brown") + L.flat(L.circ(40, by + 14, 10, 8), "brown"), head: (by, brx, o) => dogHead(brx + 20, by - 36, o) }),
  "Pets", "Dog", ["dog", "pet", "puppy"]);
reg("animal-dog-sit", (o) => L.shadow(0, 0, 150) + LB([[-40, -20], [-78, -22], [-92, -52]], 14, 8, "earth") +
  B(-26, -42, 44, 40, "earth") + LB([[28, -80], [32, -8]], 20, 18, "earth") + B(40, -7, 18, 9, "earth", { w: "detail" }) + B(-8, -8, 30, 10, "earth", { w: "detail" }) +
  L.g(B(8, -88, 36, 52, "earth"), "rotate(14 8 -88)") + L.flat(L.circ(2, -66, 16, 18), "cream", 0.9) + dogHead(36, -150, o), "Pets", "Dog sitting", ["dog", "pet", "sit"], { box: [-150, -230, 300, 250] });

const catHead = (hx, hy, o) => T([[hx - 24, hy - 12], [hx - 22, hy - 44], [hx - 2, hy - 24]], "orange") + T([[hx + 6, hy - 24], [hx + 24, hy - 44], [hx + 28, hy - 10]], "orange") +
  L.flat(L.poly([[hx - 20, hy - 18], [hx - 19, hy - 35], [hx - 8, hy - 24]], true), "pink") + L.flat(L.poly([[hx + 12, hy - 25], [hx + 22, hy - 36], [hx + 24, hy - 18]], true), "pink") +
  B(hx, hy, 30, 26, "orange") + eye(hx - 8, hy - 4, 6.5, 0.4, o) + eye(hx + 14, hy - 4, 6.5, 0.4, o) + T([[hx, hy + 6], [hx + 8, hy + 6], [hx + 4, hy + 11]], "pink", { w: "detail", flat: true }) +
  sm([[hx - 7, hy + 13], [hx - 2, hy + 17], [hx + 4, hy + 12]]) + sm([[hx + 4, hy + 12], [hx + 10, hy + 17], [hx + 15, hy + 13]]) + ln([hx - 14, hy + 8], [hx - 38, hy + 4]) + ln([hx - 14, hy + 12], [hx - 36, hy + 17]) + ln([hx + 22, hy + 8], [hx + 46, hy + 4]) + ln([hx + 22, hy + 12], [hx + 44, hy + 17]);
reg("animal-cat", (o) => quad({ c: "orange", lc: "orange", brx: 52, bry: 28, lh: 38, lw: 15, tail: (by, brx) => LB([[-brx + 6, by], [-brx - 28, by + 6], [-brx - 46, by - 22], [-brx - 40, by - 62]], 12, 10, "orange"),
  deco: (by) => [-30, -12, 6, 24].map((x) => L.flat(L.poly([[x, by - 40], [x + 7, by - 40], [x + 14, by + 10], [x + 4, by + 10]], true), "orange", 1).replace('fill="', 'data-x="').replace(/<path /, '<path fill="' + L.c("orange", 2) + '" ')).join(""),
  head: (by, brx, o) => catHead(brx + 14, by - 22, o) }), "Pets", "Cat", ["cat", "kitten", "pet"]);
reg("animal-cat-sleep", (o) => L.shadow(0, 0, 170) + B(0, -30, 68, 32, "orange") + [-30, -10, 10, 30].map((x) => L.flat(L.poly([[x, -58], [x + 8, -58], [x + 14, -30], [x + 6, -30]], true), "orange", 1).replace(/<path /, '<path fill="' + L.c("orange", 2) + '" ')).join("") +
  LB([[-58, -12], [-30, 2], [20, 2], [58, -8]], 13, 10, "orange") +
  T([[34, -34], [38, -66], [54, -44]], "orange") + B(56, -26, 30, 24, "orange") + T([[58, -46], [78, -62], [82, -34]], "orange") + eye(46, -26, 6, 0, { blink: 1 }) + eye(68, -26, 6, 0, { blink: 1 }) +
  T([[56, -18], [64, -18], [60, -13]], "pink", { w: "detail", flat: true }) + L.text("z", 92, -70, { size: 26 }) + L.text("Z", 108, -92, { size: 34 }), "Pets", "Cat sleeping", ["cat", "sleep", "pet"], { box: [-140, -130, 280, 150] });

// ---------- Farm ----------
reg("animal-cow", (o) => quad({ c: "white", brx: 82, bry: 46, lh: 52, lw: 24, hoof: "ink", lc: "white",
  back: (by, brx) => B(-18, by + 44, 20, 14, "pink"), tail: (by, brx) => LB([[-brx + 6, by - 12], [-brx - 12, by + 6], [-brx - 14, by + 48]], 7, 6, "white") + P([[-brx - 22, by + 46], [-brx - 14, by + 40], [-brx - 6, by + 48], [-brx - 14, by + 70]], "ink"),
  deco: (by, brx) => P([[-60, by - 50], [-10, by - 52], [0, by - 10], [-30, by + 10], [-70, by - 6]], "ink", { flat: true, w: "detail", c: "none" }) + L.flat(L.circ(44, by + 24, 17, 14), "ink") + L.flat(L.circ(20, by - 36, 14, 10), "ink"),
  head: (by, brx, o) => { const hx = brx + 24, hy = by - 2; return B(brx - 4, by - 8, 28, 34, "white") + T([[hx - 10, hy - 28], [hx - 20, hy - 46], [hx - 2, hy - 34]], "cream") + P([[hx - 14, hy - 22], [hx - 40, hy - 22], [hx - 34, hy - 4], [hx - 12, hy - 8]], "ink") +
    B(hx, hy, 26, 30, "white") + B(hx + 8, hy + 22, 22, 15, "pink") + dot(hx + 2, hy + 22, 3.5) + dot(hx + 16, hy + 22, 3.5) + eye(hx + 10, hy - 8, 8, 0.6, o) + L.flat(L.circ(hx - 6, hy - 22, 12, 7), "ink") + sm([[hx - 2, hy + 32], [hx + 10, hy + 36], [hx + 24, hy + 30]]); } }), "Farm", "Cow", ["cow", "farm", "cattle"]);
reg("animal-pig", (o) => quad({ c: "pink", brx: 62, bry: 40, lh: 28, lw: 22, hoof: "pink",
  tail: (by, brx) => LB([[-brx + 6, by - 4], [-brx - 14, by - 14], [-brx - 6, by - 28], [-brx - 18, by - 30]], 8, 6, "pink"),
  head: (by, brx, o) => { const hx = brx + 18, hy = by - 2; return B(brx - 6, by - 4, 30, 30, "pink") + B(hx, hy, 34, 32, "pink") + P([[hx - 14, hy - 26], [hx - 6, hy - 52], [hx + 14, hy - 30]], "pink", { tone: 2 }) + P([[hx + 22, hy - 14], [hx + 34, hy - 12], [hx + 36, hy + 8], [hx + 22, hy + 6]], "pink", { w: "detail" }) +
    B(hx + 30, hy + 8, 13, 16, "pink", { tone: 2 }) + dot(hx + 30, hy + 2, 3.2) + dot(hx + 30, hy + 14, 3.2) + eye(hx + 8, hy - 8, 8, 0.6, o) + blush(hx - 6, hy + 12, 9) + sm([[hx + 6, hy + 20], [hx + 14, hy + 24], [hx + 20, hy + 20]]); } }), "Farm", "Pig", ["pig", "farm"]);
reg("animal-sheep", (o) => quad({ c: "white", lc: "brown", brx: 62, bry: 40, lh: 44, lw: 14, hoof: "ink",
  deco: null, tail: null, head: (by, brx, o) => { const hx = brx + 12, hy = by + 4; return L.shape(bumpy(0, by, brx + 6, 44, 11, 0.9), "white") + P([[hx - 12, hy - 8], [hx - 40, hy + 2], [hx - 26, hy + 18]], "brown") + P([[hx - 22, hy - 20], [hx + 20, hy - 24], [hx + 24, hy + 8], [hx + 10, hy + 28], [hx - 14, hy + 20]], "brown") + L.shape(bumpy(hx - 2, hy - 26, 18, 14, 8, 0.85), "white") +
    eye(hx + 8, hy - 6, 7, 0.6, o) + dot(hx + 22, hy + 6, 3.5, "ink") + sm([[hx + 8, hy + 14], [hx + 16, hy + 18], [hx + 22, hy + 12]], { c: "cream" }); } }), "Farm", "Sheep", ["sheep", "lamb", "farm", "wool"]);
reg("animal-horse", (o) => quad({ c: "wood", brx: 86, bry: 40, lh: 94, lw: 18, hoof: "ink",
  tail: (by, brx) => P([[-brx + 6, by - 8], [-brx - 24, by + 10], [-brx - 36, by + 60], [-brx - 20, by + 80], [-brx - 12, by + 40], [-brx + 4, by + 12]], "brown"),
  neck: (by, brx) => LB([[brx - 30, by + 2], [brx + 2, by - 44], [brx + 20, by - 84]], 64, 40, "wood") + LB([[brx - 12, by - 40], [brx + 2, by - 66], [brx + 8, by - 96]], 14, 10, "brown"),
  head: (by, brx, o) => { const hx = brx + 22, hy = by - 98; return T([[hx - 10, hy - 20], [hx - 8, hy - 52], [hx + 8, hy - 24]], "wood") + P([[hx - 16, hy - 20], [hx + 14, hy - 28], [hx + 46, hy + 2], [hx + 58, hy + 22], [hx + 46, hy + 38], [hx + 16, hy + 28], [hx - 12, hy + 10], [hx - 20, hy - 4]], "wood") +
    dot(hx + 52, hy + 24, 3.8) + eye(hx + 8, hy - 4, 8, 0.6, o) + L.shape(L.poly([[hx - 14, hy - 24], [hx + 14, hy - 32], [hx + 8, hy - 10]], true), "brown") + sm([[hx + 34, hy + 34], [hx + 44, hy + 34]]); } }),
  "Farm", "Horse", ["horse", "farm"], { box: [-190, -340, 380, 360] });

// ---------- Pets / Wild: small mammals ----------
reg("animal-rabbit", (o) => { const c = o.c || "white";
  return L.shadow(0, 0, 120) + B(-38, -30, 15, 14, "white") + P([[-20, -60], [-8, -88], [24, -82], [40, -50], [38, -10], [-24, -8]], c) + B(-14, -24, 28, 24, c) + B(8, -8, 28, 10, c, { w: "detail" }) +
    L.g(P([[8, -118], [-6, -160], [-6, -194], [8, -196], [20, -150], [24, -118]], c) + L.flat(L.smooth([[8, -126], [1, -160], [3, -184], [9, -184], [14, -152], [16, -126], [8, -126]]), "pink", 0.9), "rotate(-8 12 -118)") +
    L.g(P([[26, -118], [28, -160], [38, -192], [52, -188], [48, -150], [40, -116]], c) + L.flat(L.smooth([[32, -126], [34, -158], [41, -180], [46, -178], [44, -152], [40, -126], [32, -126]]), "pink", 0.9), "rotate(10 36 -118)") +
    B(24, -100, 28, 26, c) + eye(32, -106, 7.5, 0.7, o) + T([[46, -98], [54, -98], [50, -92]], "pink", { w: "detail", flat: true }) + sm([[44, -90], [50, -86], [56, -90]]) + T([[46, -88], [52, -88], [50, -78]], "white", { w: "detail", flat: true }) + blush(22, -88, 7) +
    ln([48, -94], [72, -100]) + ln([48, -91], [72, -88]) + LB([[26, -62], [30, -10]], 12, 12, c, { w: "detail" }) + B(34, -8, 12, 7, c, { w: "detail" }); }, "Pets", "Rabbit", ["rabbit", "bunny", "pet"], { box: [-110, -210, 220, 230] });
reg("animal-mouse", (o) => L.shadow(0, 0, 110) + LB([[-34, -22], [-70, -16], [-84, -44], [-70, -64]], 6, 4, "pink") + P([[-40, -22], [-30, -50], [10, -54], [44, -32], [64, -22], [44, -6], [-30, -6]], "gray", { tone: 1 }) + B(-8, -9, 12, 8, "gray", { w: "detail" }) + B(30, -9, 12, 8, "gray", { w: "detail" }) +
  B(18, -66, 20, 20, "gray", { tone: 1 }) + B(18, -66, 11, 12, "pink", { w: "detail", flat: true }) + P([[20, -28], [44, -44], [66, -24], [44, -10]], "gray", { tone: 1 }) + B(30, -66, 17, 17, "gray", { tone: 1 }) +
  eye(30, -40, 6, 0.6, o) + dot(66, -26, 4.5, "pink") + ln([60, -22], [84, -30]) + ln([60, -20], [84, -14]), "Pets", "Mouse", ["mouse", "small", "pet"], { box: [-110, -100, 220, 110] });
reg("animal-squirrel", (o) => L.shadow(0, 0, 100) + P([[-20, -20], [-62, -44], [-72, -110], [-40, -160], [-10, -140], [-6, -96], [-2, -50]], "orange", { tone: 1 }) + L.flat(L.smooth([[-40, -150], [-56, -120], [-52, -80], [-44, -120], [-40, -150]]), "orange", 0.9).replace(/<path /, '<path fill="' + L.c("orange", 2) + '" ') +
  B(0, -42, 28, 38, "earth", { tone: 2 }) + B(4, -36, 15, 24, "cream") + B(14, -96, 22, 22, "earth", { tone: 2 }) + T([[0, -112], [-4, -134], [14, -118]], "earth", { tone: 2 }) + T([[16, -116], [26, -136], [32, -112]], "earth", { tone: 2 }) + P([[22, -92], [34, -98], [40, -88], [28, -82]], "cream") +
  eye(18, -100, 6, 0.6, o) + dot(40, -92, 3.5) + B(28, -60, 11, 12, "brown", { tone: 1 }) + T([[24, -70], [32, -68], [28, -64]], "gold", { w: "detail" }) + B(14, -4, 26, 8, "earth", { tone: 2, w: "detail" }), "Wild", "Squirrel", ["squirrel", "acorn"], { box: [-110, -190, 200, 210] });
reg("animal-monkey", (o) => L.shadow(0, 0, 130) + LB([[28, -20], [66, -20], [78, -50], [60, -70], [48, -54]], 11, 8, "wood") + LB([[-18, -34], [-22, -6]], 22, 20, "wood") + B(-20, -6, 20, 8, "wood", { w: "detail" }) + LB([[18, -34], [22, -6]], 22, 20, "wood") + B(26, -6, 20, 8, "wood", { w: "detail" }) +
  B(0, -64, 34, 42, "wood") + B(0, -56, 22, 30, "cream") + LB([[-28, -90], [-42, -60], [-38, -34]], 15, 13, "wood") + LB([[28, -90], [44, -62], [40, -36]], 15, 13, "wood") + B(-38, -32, 9, 8, "wood", { w: "detail" }) + B(40, -34, 9, 8, "wood", { w: "detail" }) +
  B(-38, -128, 14, 14, "wood") + B(-38, -128, 8, 8, "pink", { w: "detail", flat: true }) + B(38, -128, 14, 14, "wood") + B(38, -128, 8, 8, "pink", { w: "detail", flat: true }) + B(0, -128, 34, 32, "wood") +
  P([[0, -140], [-14, -146], [-26, -132], [-22, -108], [0, -98], [22, -108], [26, -132], [14, -146]], "cream", { w: "detail" }) + eye(-11, -128, 7, 0, o) + eye(11, -128, 7, 0, o) + dot(-3, -116, 2) + dot(3, -116, 2) + sm([[-10, -107], [0, -101], [10, -107]]),
  "Wild", "Monkey", ["monkey", "ape", "jungle"], { box: [-110, -190, 220, 210] });

reg("animal-elephant", (o) => quad({ c: "gray", brx: 90, bry: 58, lh: 52, lw: 42, tone: 1, tail: (by, brx) => LB([[-brx + 4, by - 10], [-brx - 14, by + 8], [-brx - 14, by + 44]], 8, 6, "gray") + P([[-brx - 20, by + 40], [-brx - 14, by + 36], [-brx - 6, by + 44], [-brx - 14, by + 58]], "gray", { tone: 2 }),
  head: (by, brx, o) => { const hx = brx + 24, hy = by - 22; return LB([[hx + 30, hy + 4], [hx + 52, hy + 44], [hx + 44, hy + 84], [hx + 60, hy + 100]], 34, 16, "gray", { tone: 1 }) +
        B(hx, hy, 46, 44, "gray", { tone: 1 }) + P([[hx - 6, hy - 38], [hx - 56, hy - 40], [hx - 70, hy + 4], [hx - 44, hy + 46], [hx - 10, hy + 24]], "gray", { tone: 0 }) + L.flat(L.smooth([[hx - 14, hy - 26], [hx - 50, hy - 28], [hx - 58, hy + 2], [hx - 42, hy + 32], [hx - 18, hy + 16], [hx - 14, hy - 26]]), "pink", 0.45) +
    P([[hx + 28, hy + 18], [hx + 54, hy + 24], [hx + 62, hy + 46], [hx + 40, hy + 34]], "cream") + eye(hx + 18, hy - 10, 8, 0.6, o) + blush(hx + 6, hy + 14, 9) + sm([[hx + 12, hy + 24], [hx + 22, hy + 28]]); } }),
  "Wild", "Elephant", ["elephant", "safari"], { box: [-190, -260, 400, 280] });

// ---------- Wild: big mammals ----------
reg("animal-lion", (o) => quad({ c: "gold", brx: 76, bry: 38, lh: 46, lw: 22,
  tail: (by, brx) => LB([[-brx + 6, by - 2], [-brx - 24, by + 8], [-brx - 40, by - 14]], 9, 7, "gold") + B(-brx - 44, by - 20, 11, 15, "orange"),
  head: (by, brx, o) => { const hx = brx + 18, hy = by - 24; return L.shape(bumpy(hx - 2, hy, 50, 50, 14, 0.86), "orange", { tone: 2 }) + B(hx - 20, hy - 38, 11, 11, "gold") + B(hx + 18, hy - 42, 11, 11, "gold") + B(hx + 2, hy, 34, 32, "gold") + B(hx + 22, hy + 12, 18, 14, "cream") +
    T([[hx + 14, hy + 2], [hx + 28, hy + 2], [hx + 21, hy + 10]], "pink", { w: "detail", flat: true }) + eye(hx + 4, hy - 8, 7.5, 0.6, o) + eye(hx + 26, hy - 8, 6, 0.6, o) + sm([[hx + 14, hy + 20], [hx + 21, hy + 24], [hx + 30, hy + 19]]) + ln([hx + 21, hy + 10], [hx + 21, hy + 17]); } }),
  "Wild", "Lion", ["lion", "safari", "big cat"], { box: [-190, -230, 380, 250] });

const spotsOn = (pts, c, r) => pts.map(([x, y, k = 1]) => L.flat(L.circ(x, y, r * k, r * k * 0.85), c)).join("");
reg("animal-giraffe", (o) => quad({ c: "yellow", brx: 62, bry: 34, lh: 100, lw: 18, hoof: "ink",
  tail: (by, brx) => LB([[-brx + 4, by - 2], [-brx - 10, by + 18], [-brx - 10, by + 56]], 6, 5, "yellow") + B(-brx - 10, by + 62, 6, 12, "brown"),
  deco: (by) => spotsOn([[-36, by - 12], [-4, by - 18, 1.2], [26, by - 8], [-20, by + 14], [10, by + 14, 0.9], [44, by - 22, 0.8]], "orange", 9).replace(/fill="[^"]*"/g, `fill="${L.c("orange", 2)}"`),
  neck: (by, brx) => { const nd = L.limb([[brx - 22, by - 6], [brx - 2, by - 70], [brx + 14, by - 140], [brx + 24, by - 176]], 42, 26); return L.shape(nd, "yellow") + clip(nd, spotsOn([[brx - 2, by - 40], [brx + 8, by - 84, 0.9], [brx + 16, by - 120], [brx + 6, by - 62, 0.7], [brx + 20, by - 150, 0.7]], "orange", 8).replace(/fill="[^"]*"/g, `fill="${L.c("orange", 2)}"`)) + rim(nd, "yellow"); },
  head: (by, brx, o) => { const hx = brx + 30, hy = by - 186; return LB([[hx - 4, hy - 20], [hx - 8, hy - 44]], 5, 5, "brown", { w: "detail" }) + B(hx - 8, hy - 48, 6, 6, "brown") + LB([[hx + 12, hy - 20], [hx + 16, hy - 44]], 5, 5, "brown", { w: "detail" }) + B(hx + 16, hy - 48, 6, 6, "brown") +
    P([[hx - 24, hy - 12], [hx - 44, hy - 18], [hx - 38, hy + 2], [hx - 22, hy + 2]], "yellow") + P([[hx - 14, hy - 20], [hx + 16, hy - 24], [hx + 44, hy], [hx + 48, hy + 20], [hx + 30, hy + 28], [hx - 6, hy + 16], [hx - 16, hy - 2]], "yellow") + P([[hx + 28, hy + 2], [hx + 46, hy + 4], [hx + 48, hy + 20], [hx + 30, hy + 26]], "cream", { w: "detail" }) +
    dot(hx + 40, hy + 14, 3) + eye(hx + 4, hy - 6, 7.5, 0.6, o) + sm([[hx + 28, hy + 22], [hx + 38, hy + 24]]); } }),
  "Wild", "Giraffe", ["giraffe", "safari", "tall"], { box: [-150, -400, 300, 420] });

reg("animal-zebra", (o) => { const stripes = (x0, x1, y0, y1, n) => Array.from({ length: n }, (_, i) => { const x = x0 + ((x1 - x0) * i) / (n - 1); return L.flat(L.poly([[x, y0], [x + 9, y0], [x + 5, y1], [x - 4, y1]], true), "ink"); }).join("");
  return quad({ c: "white", brx: 80, bry: 38, lh: 62, lw: 18, hoof: "ink", lc: "white",
    tail: (by, brx) => LB([[-brx + 4, by - 2], [-brx - 16, by + 12], [-brx - 18, by + 52]], 7, 6, "white") + P([[-brx - 26, by + 46], [-brx - 16, by + 40], [-brx - 8, by + 48], [-brx - 18, by + 74]], "ink"),
    deco: (by, brx) => stripes(-70, 56, by - 50, by + 50, 8),
    neck: (by, brx) => { const nd = L.limb([[brx - 28, by], [brx - 2, by - 40], [brx + 16, by - 74]], 56, 38); return L.shape(nd, "white") + clip(nd, [0, 1, 2, 3].map((i) => L.flat(L.poly([[brx - 16 + i * 14, by - 90], [brx - 8 + i * 14, by - 90], [brx - 20 + i * 14, by + 10], [brx - 29 + i * 14, by + 10]], true), "ink")).join("")) + rim(nd, "white") + LB([[brx - 12, by - 36], [brx + 2, by - 62], [brx + 8, by - 88]], 12, 10, "ink"); },
    head: (by, brx, o) => { const hx = brx + 20, hy = by - 78, hd = L.smooth([[hx - 14, hy - 18], [hx + 12, hy - 24], [hx + 40, hy + 2], [hx + 50, hy + 18], [hx + 40, hy + 32], [hx + 14, hy + 24], [hx - 10, hy + 8], [hx - 18, hy - 4], [hx - 14, hy - 18]]);
      return T([[hx - 8, hy - 20], [hx - 8, hy - 48], [hx + 8, hy - 24]], "white") + L.shape(hd, "white") + clip(hd, [0, 1, 2].map((i) => L.flat(L.poly([[hx - 4 + i * 14, hy - 30], [hx + 4 + i * 14, hy - 30], [hx - 4 + i * 14 + 4, hy + 40], [hx - 12 + i * 14 + 4, hy + 40]], true), "ink")).join("")) + rim(hd, "white") +
        B(hx + 42, hy + 22, 11, 11, "ink") + eye(hx + 12, hy - 4, 7, 0.6, o) + dot(hx + 46, hy + 20, 3, "gray"); } }); },
  "Wild", "Zebra", ["zebra", "safari", "stripes"], { box: [-190, -270, 380, 290] });

reg("animal-bear", (o) => quad({ c: "wood", tone: 2, lc: "wood", brx: 72, bry: 48, lh: 38, lw: 34, tail: (by, brx) => B(-brx + 2, by - 8, 12, 12, "wood", { tone: 2 }),
  head: (by, brx, o) => { const hx = brx + 16, hy = by - 22; return B(hx - 16, hy - 26, 13, 13, "wood", { tone: 2 }) + B(hx + 18, hy - 28, 13, 13, "wood", { tone: 2 }) + B(hx - 16, hy - 26, 7, 7, "cream", { flat: true, w: "detail" }) + B(hx + 18, hy - 28, 7, 7, "cream", { flat: true, w: "detail" }) + B(hx, hy, 36, 32, "wood", { tone: 2 }) + B(hx + 22, hy + 10, 18, 14, "cream") +
    B(hx + 34, hy + 3, 7, 5.5, "ink", { flat: true }) + eye(hx + 8, hy - 8, 7.5, 0.6, o) + sm([[hx + 14, hy + 20], [hx + 22, hy + 24], [hx + 30, hy + 19]]); } }),
  "Wild", "Bear", ["bear", "brown bear", "forest"], { box: [-180, -220, 360, 240] });
reg("animal-panda", (o) => L.shadow(0, 0, 150) + LB([[-34, -46], [-44, -10]], 34, 30, "ink") + B(-46, -10, 28, 11, "ink", { w: "detail" }) + LB([[34, -46], [44, -10]], 34, 30, "ink") + B(46, -10, 28, 11, "ink", { w: "detail" }) +
  B(0, -64, 54, 56, "white") + LB([[-44, -96], [-62, -62], [-52, -34]], 22, 18, "ink") + LB([[44, -96], [62, -62], [52, -34]], 22, 18, "ink") +
  B(-34, -158, 17, 17, "ink") + B(34, -158, 17, 17, "ink") + B(0, -132, 48, 42, "white") + L.g(B(0, 0, 13, 17, "ink", { flat: true, w: "detail" }), "translate(-19 -130) rotate(24)") + L.g(B(0, 0, 13, 17, "ink", { flat: true, w: "detail" }), "translate(19 -130) rotate(-24)") +
  eye(-19, -131, 6, 0.3, o) + eye(19, -131, 6, 0.3, o) + B(0, -118, 9, 6.5, "ink", { flat: true, w: "detail" }) + sm([[-10, -106], [0, -100], [10, -106]], { c: "ink" }) + blush(-30, -112, 7) + blush(30, -112, 7), "Wild", "Panda", ["panda", "bamboo"], { box: [-110, -200, 220, 220] });

reg("animal-fox", (o) => quad({ c: "orange", lc: "brown", brx: 60, bry: 29, lh: 46, lw: 14, tone: 1,
  tail: (by, brx) => P([[-brx + 6, by - 4], [-brx - 28, by - 14], [-brx - 66, by - 8], [-brx - 70, by + 14], [-brx - 40, by + 20], [-brx - 6, by + 12]], "orange") + P([[-brx - 52, by - 12], [-brx - 66, by - 8], [-brx - 70, by + 14], [-brx - 50, by + 18], [-brx - 56, by + 2]], "white"),
  deco: (by) => L.flat(L.poly([[10, by + 8], [60, by - 2], [60, by + 40], [10, by + 40]], true), "white"),
  head: (by, brx, o) => { const hx = brx + 14, hy = by - 22; return T([[hx - 24, hy - 8], [hx - 24, hy - 46], [hx - 2, hy - 20]], "orange") + L.flat(L.poly([[hx - 20, hy - 14], [hx - 20, hy - 36], [hx - 8, hy - 20]], true), "brown") + T([[hx + 4, hy - 20], [hx + 20, hy - 46], [hx + 26, hy - 8]], "orange") + L.flat(L.poly([[hx + 10, hy - 22], [hx + 19, hy - 37], [hx + 21, hy - 14]], true), "brown") +
    P([[hx - 26, hy], [hx - 14, hy - 22], [hx + 14, hy - 22], [hx + 30, hy - 4], [hx + 54, hy + 10], [hx + 30, hy + 28], [hx - 6, hy + 28]], "orange") + L.flat(L.smooth([[hx + 8, hy + 8], [hx + 30, hy + 2], [hx + 48, hy + 12], [hx + 30, hy + 26], [hx + 4, hy + 26], [hx + 8, hy + 8]]), "white") + dot(hx + 52, hy + 9, 5) + eye(hx + 8, hy - 6, 6.5, 0.6, o) + sm([[hx + 26, hy + 18], [hx + 34, hy + 22], [hx + 42, hy + 16]]); } }),
  "Wild", "Fox", ["fox", "forest"], { box: [-200, -170, 360, 190] });

reg("animal-deer", (o) => quad({ c: "earth", tone: 2, brx: 66, bry: 32, lh: 74, lw: 13, hoof: "ink",
  tail: (by, brx) => P([[-brx + 6, by - 8], [-brx - 14, by - 22], [-brx - 6, by + 2]], "white"),
  deco: (by) => spotsOn([[-40, by - 10, 0.7], [-18, by - 18, 0.7], [4, by - 8, 0.7], [26, by - 16, 0.7], [-28, by + 12, 0.6], [-2, by + 14, 0.6], [30, by + 10, 0.6], [-52, by + 8, 0.6]], "white", 7),
  neck: (by, brx) => LB([[brx - 24, by - 2], [brx + 2, by - 40], [brx + 14, by - 72]], 36, 22, "earth", { tone: 2 }),
  head: (by, brx, o) => { const hx = brx + 18, hy = by - 80; const ant = (s) => sm([[hx - 2 + s * 4, hy - 20], [hx - 14 + s * 20, hy - 56], [hx - 8 + s * 30, hy - 92]], { c: "brown", w: 7 }) + sm([[hx - 12 + s * 14, hy - 44], [hx - 34 + s * 14, hy - 64]], { c: "brown", w: 6 }) + sm([[hx - 10 + s * 24, hy - 70], [hx + 6 + s * 30, hy - 100]], { c: "brown", w: 5 });
    return ant(0) + ant(1) + P([[hx - 14, hy - 12], [hx - 38, hy - 22], [hx - 30, hy + 2], [hx - 12, hy]], "earth", { tone: 2 }) + P([[hx - 14, hy - 20], [hx + 12, hy - 22], [hx + 38, hy + 2], [hx + 42, hy + 18], [hx + 24, hy + 24], [hx - 6, hy + 14], [hx - 16, hy - 4]], "earth", { tone: 2 }) +
    dot(hx + 38, hy + 14, 5) + eye(hx + 6, hy - 4, 6.5, 0.6, o); } }),
  "Wild", "Deer", ["deer", "forest", "antlers"], { box: [-170, -300, 340, 320] });

reg("animal-camel", (o) => quad({ c: "sand", tone: 2, lc: "sand", brx: 80, bry: 36, lh: 76, lw: 16, hoof: "ink",
  bp: (by, brx) => L.smooth([[-84, by + 6], [-72, by - 24], [-52, by - 30], [-44, by - 62], [-22, by - 70], [-8, by - 38], [10, by - 32], [26, by - 64], [48, by - 58], [58, by - 28], [78, by - 12], [84, by + 12], [40, by + 36], [-40, by + 36], [-84, by + 6]]),
  tail: (by, brx) => LB([[-brx + 4, by], [-brx - 10, by + 14], [-brx - 10, by + 40]], 6, 5, "sand", { tone: 2 }),
  neck: (by, brx) => LB([[brx - 18, by - 2], [brx + 18, by - 22], [brx + 16, by - 72], [brx + 34, by - 100]], 36, 22, "sand", { tone: 2 }),
  head: (by, brx, o) => { const hx = brx + 44, hy = by - 108; return T([[hx - 14, hy - 14], [hx - 16, hy - 32], [hx - 2, hy - 18]], "sand", { tone: 2 }) + P([[hx - 14, hy - 14], [hx + 8, hy - 20], [hx + 34, hy - 2], [hx + 38, hy + 14], [hx + 20, hy + 20], [hx - 4, hy + 12], [hx - 16, hy - 2]], "sand", { tone: 2 }) + dot(hx + 34, hy + 8, 3.5) + eye(hx + 4, hy - 4, 6.5, 0.6, o) + sm([[hx + 16, hy + 16], [hx + 26, hy + 18]]); } }),
  "Wild", "Camel", ["camel", "desert"], { box: [-180, -250, 360, 270] });

reg("animal-dinosaur", (o) => L.shadow(0, 0, 150) + LB([[-34, -64], [-80, -40], [-122, -34], [-146, -52]], 40, 6, "green", { tone: 0 }) + [[-30, -140], [-6, -150], [18, -146], [-50, -118], [-72, -80]].map(([x, y], i) => T([[x - 12, y + 12], [x, y - 16], [x + 12, y + 12]], "orange")).join("") +
  LB([[-18, -70], [-22, -8]], 30, 28, "green", { tone: 0 }) + B(-10, -6, 24, 9, "green", { w: "detail" }) + P([[-48, -80], [-40, -136], [0, -154], [40, -126], [48, -76], [34, -36], [-34, -36]], "green") + P([[-14, -128], [20, -126], [30, -70], [10, -44], [-18, -50], [-26, -90]], "cream", { w: "detail", flat: true }) +
  LB([[20, -72], [24, -8]], 30, 28, "green") + B(32, -6, 26, 9, "green", { w: "detail" }) + LB([[28, -100], [48, -90], [52, -76]], 12, 9, "green") +
  P([[-24, -160], [-4, -196], [38, -198], [64, -178], [72, -156], [60, -140], [10, -134], [-18, -140]], "green") + eye(30, -178, 8.5, 0.5, o) + dot(60, -168, 2.5) + sm([[34, -154], [50, -148], [66, -158]]) + blush(24, -158, 8), "Wild", "Dinosaur", ["dinosaur", "dino", "cute", "prehistoric"], { box: [-160, -230, 320, 250] });

// ---------- Birds ----------
const legB = (x, y0 = -18) => L.stroke(L.line([x, y0], [x, -3]), { c: "orange", w: 5 }) + L.stroke(L.poly([[x - 8, -1], [x, -3], [x + 9, -1]]), { c: "orange", w: 4 });
reg("animal-sparrow", (o) => { const bd = L.circ(0, -40, 36, 26); return L.shadow(0, 0, 80) + legB(-6) + legB(10) + P([[-28, -34], [-72, -24], [-74, -38], [-60, -46], [-30, -50]], "wood") + L.shape(bd, "earth") + clip(bd, L.flat(L.circ(12, -14, 38, 22), "cream")) + rim(bd, "earth") +
  P([[-22, -46], [8, -58], [30, -42], [8, -26], [-20, -30]], "wood") + sm([[-14, -40], [4, -44]], { c: "earth" }) + sm([[-10, -33], [10, -38]], { c: "earth" }) + B(30, -64, 21, 20, "earth") + L.flat(L.circ(38, -58, 10, 9), "cream") + L.flat(L.circ(46, -54, 5, 4.5), "ink") + eye(35, -69, 5.5, 0.6, o) + T([[48, -67], [67, -62], [48, -57]], "gold", { w: "detail" }); },
  "Birds", "Sparrow", ["sparrow", "bird", "small bird"], { box: [-90, -100, 180, 110] });
reg("animal-sparrow-fly", (o) => P([[-22, 2], [-66, 14], [-70, 2], [-56, -6], [-24, -8]], "wood") + L.g(P([[-8, -8], [-52, -62], [-40, -92], [4, -70], [26, -22]], "wood", { tone: 2 }), "translate(-4 4) scale(0.9)") + B(0, 0, 36, 24, "earth") +
  P([[-8, -8], [-14, -58], [26, -92], [58, -72], [38, -22], [12, 0]], "earth", { tone: 1 }) + sm([[4, -24], [26, -62]], { c: "wood" }) + sm([[16, -20], [40, -52]], { c: "wood" }) + B(34, -12, 20, 19, "earth") + L.flat(L.circ(42, -6, 9, 8), "cream") + eye(39, -17, 5.5, 0.6, o) + T([[52, -15], [70, -10], [52, -5]], "gold", { w: "detail" }),
  "Birds", "Sparrow flying", ["sparrow", "bird", "fly", "flying"], { box: [-90, -110, 180, 140] });
reg("animal-parrot", (o) => L.shadow(0, 0, 80) + legB(-10, -30) + legB(12, -30) + P([[-20, -56], [-52, -4], [-34, 6], [-30, -2], [-12, -30]], "blue") + P([[-26, -52], [-34, -2], [-18, 4], [-10, -34]], "red", { tone: 2 }) + B(-2, -76, 30, 48, "red") +
  P([[-26, -100], [-38, -58], [-26, -32], [-4, -48], [-4, -94]], "blue") + L.flat(L.smooth([[-24, -80], [-30, -60], [-22, -46], [-12, -60], [-24, -80]]), "yellow") + B(6, -134, 27, 26, "red") + L.flat(L.circ(16, -130, 15, 14), "white") + eye(17, -132, 7, 0.6, o) +
  P([[26, -150], [52, -144], [56, -120], [44, -110], [36, -124], [26, -126]], "cream") + P([[36, -124], [56, -120], [44, -110]], "ink", { w: "detail", flat: true }), "Birds", "Parrot", ["parrot", "macaw", "bird", "tropical"], { box: [-90, -200, 180, 210] });
reg("animal-parrot-fly", (o) => P([[-10, 6], [-66, 36], [-74, 24], [-30, -6]], "blue") + L.g(P([[-6, -10], [-30, -78], [4, -104], [34, -60], [30, -16]], "blue", { tone: 2 }), "translate(-6 6)") + B(0, 0, 28, 38, "red") +
  P([[-4, -12], [-22, -86], [18, -118], [56, -80], [36, -24]], "blue") + L.flat(L.smooth([[2, -34], [-4, -76], [14, -92], [24, -60], [2, -34]]), "yellow") + B(26, -26, 24, 24, "red") + L.flat(L.circ(34, -22, 13, 12), "white") + eye(35, -24, 6.5, 0.6, o) + P([[44, -40], [68, -32], [66, -10], [54, -6], [48, -20], [42, -22]], "cream") + P([[48, -20], [66, -10], [54, -6]], "ink", { w: "detail", flat: true }),
  "Birds", "Parrot flying", ["parrot", "macaw", "fly", "flying"], { box: [-100, -140, 200, 200] });
reg("animal-owl", (o) => L.shadow(0, 0, 100) + T([[-44, -112], [-40, -150], [-16, -120]], "wood") + T([[44, -112], [40, -150], [16, -120]], "wood") + B(0, -70, 50, 64, "wood") + B(-16, -4, 15, 7, "gold", { w: "detail" }) + B(16, -4, 15, 7, "gold", { w: "detail" }) + B(0, -52, 32, 42, "cream", { flat: true, w: "detail" }) +
  [[-14, -64], [4, -64], [-22, -46], [-4, -46], [14, -46], [-10, -28], [10, -28]].map(([x, y]) => sm([[x - 6, y - 4], [x, y + 3], [x + 6, y - 4]], { c: "earth" })).join("") + P([[-44, -96], [-66, -54], [-52, -26], [-40, -48]], "wood", { tone: 2 }) + P([[44, -96], [66, -54], [52, -26], [40, -48]], "wood", { tone: 2 }) +
  B(-19, -98, 22, 22, "cream") + B(19, -98, 22, 22, "cream") + eye(-19, -98, 14, 0.2, o) + eye(19, -98, 14, 0.2, o) + T([[-6, -90], [6, -90], [0, -72]], "gold", { w: "detail" }),
  "Birds", "Owl", ["owl", "night", "wise", "bird"], { box: [-90, -170, 180, 180] });
reg("animal-penguin", (o) => L.shadow(0, 0, 100) + B(-20, -4, 20, 8, "orange", { w: "detail" }) + B(20, -4, 20, 8, "orange", { w: "detail" }) + P([[-38, -98], [-70, -52], [-54, -42], [-36, -70]], "navy", { tone: 1 }) + P([[38, -98], [70, -52], [54, -42], [36, -70]], "navy", { tone: 1 }) +
  B(0, -68, 44, 66, "navy") + L.flat(L.smooth([[0, -40], [-22, -52], [-28, -86], [-12, -104], [0, -100], [12, -104], [28, -86], [22, -52], [0, -40]]), "white") + L.flat(L.circ(-14, -102, 14, 14), "white") + L.flat(L.circ(14, -102, 14, 14), "white") + eye(-14, -102, 7.5, 0, o) + eye(14, -102, 7.5, 0, o) +
  P([[-9, -92], [9, -92], [0, -78]], "orange", { w: "detail" }) + blush(-26, -88, 7) + blush(26, -88, 7), "Birds", "Penguin", ["penguin", "antarctic", "cold", "bird"], { box: [-90, -150, 180, 160] });
reg("animal-penguin-slide", (o) => L.shadow(0, 0, 150) + P([[-50, -26], [-78, -22], [-72, -10], [-48, -12]], "orange", { w: "detail" }) + P([[-8, -24], [-24, -2], [-4, 0], [10, -12]], "navy", { tone: 1 }) + P([[-56, -30], [-46, -56], [0, -62], [44, -54], [60, -34], [44, -6], [-30, -2]], "navy") + L.flat(L.smooth([[-48, -12], [0, -2], [44, -8], [56, -28], [20, -26], [-30, -24], [-48, -12]]), "white") +
  B(48, -46, 24, 22, "navy") + L.flat(L.circ(54, -42, 15, 14), "white") + eye(56, -46, 7, 0.5, o) + P([[68, -48], [90, -40], [68, -34]], "orange", { w: "detail" }) + blush(52, -32, 6), "Birds", "Penguin sliding", ["penguin", "slide", "belly", "bird"], { box: [-100, -90, 200, 100] });
reg("animal-chicken", (o) => L.shadow(0, 0, 90) + legB(-4, -36) + legB(14, -36) + P([[-32, -56], [-64, -102], [-52, -108], [-36, -92], [-26, -104], [-14, -76]], "white", { tone: 2 }) + B(0, -56, 38, 30, "white") + L.flat(L.smooth([[-22, -62], [8, -74], [24, -56], [2, -40], [-20, -46], [-22, -62]]), "gray", 0.3) + sm([[-8, -56], [10, -60]], { c: "gray" }) + sm([[-8, -48], [8, -52]], { c: "gray" }) +
  B(32, -96, 17, 18, "white") + [[-4, -114], [4, -118], [12, -113]].map(([x, y]) => B(30 + x + 4, y, 7, 7, "red")).join("") + P([[42, -82], [52, -82], [50, -68], [42, -72]], "red") + T([[46, -98], [62, -94], [46, -90]], "gold", { w: "detail" }) + eye(37, -100, 5, 0.6, o), "Birds", "Chicken", ["chicken", "hen", "farm", "bird"], { box: [-90, -150, 180, 160] });

// ---------- Sea ----------
const SBOX = [-150, -100, 300, 200];
function fish(o, c, stripe, blind) {
  const bd = L.smooth([[-46, 0], [-22, -30], [30, -32], [64, -6], [64, 6], [30, 32], [-22, 30], [-46, 0]]);
  return P([[-40, 0], [-84, -30], [-72, 0], [-84, 30]], c, { tone: 2 }) + P([[-8, -28], [12, -56], [38, -30]], c, { tone: 2 }) + P([[0, 26], [14, 50], [30, 28]], c, { tone: 2 }) + L.shape(bd, c) +
    (stripe ? clip(bd, [-20, 6, 30].map((x) => L.flat(L.poly([[x, -40], [x + 11, -40], [x + 11, 40], [x, 40]], true), stripe)).join("")) + rim(bd, c) : "") +
    sm([[18, -22], [12, 0], [18, 22]], { c: "ink", op: 0.5 }) + (blind ? [[40, -14], [50, -8], [30, -6], [20, 8]].map(([x, y]) => dot(x, y, 2, "gray", 0.6)).join("") + sm([[62, 4], [74, 8], [86, 6]], { c: "gray", w: 3 }) + sm([[60, 10], [72, 20], [84, 22]], { c: "gray", w: 3 }) : eye(40, -8, 9, 0.6, o)) + sm([[54, 10], [60, 14], [64, 8]]);
}
L.reg("animals", "animal-fish", (o) => fish(o, o.c || "orange", "white"), { box: [-100, -70, 200, 140], group: "Sea", label: "Fish", tags: ["animal", "fish", "sea", "aquarium"], call: 'L.put(S, "animal-fish", x, y, { s: 1, c: "orange", t })', demo: {} });
L.reg("animals", "animal-fish-blue", (o) => fish(o, "blue", "yellow"), { box: [-100, -70, 200, 140], group: "Sea", label: "Fish (blue)", tags: ["animal", "fish", "sea"], call: 'L.put(S, "animal-fish-blue", x, y, { s: 1, t })', demo: {} });
reg("animal-cavefish", (o) => fish(o, "cream", null, true), "Sea", "Cavefish (blind)", ["cavefish", "blind", "cave", "fish", "no eyes"], { box: [-100, -70, 200, 140] });
reg("animal-shark", (o) => { const bd = L.smooth([[-92, 10], [-60, -14], [0, -34], [60, -30], [100, 0], [106, 10], [70, 34], [0, 40], [-60, 28], [-92, 10]]);
  return P([[-90, 10], [-136, -38], [-122, 8], [-138, 46]], "blue", { tone: 2 }) + P([[-12, -30], [12, -88], [38, -30]], "blue", { tone: 2 }) + L.shape(bd, "blue", { tone: 1 }) + clip(bd, L.flat(L.circ(20, 46, 130, 30), "white")) + rim(bd, "blue") + P([[8, 24], [-20, 62], [38, 34]], "blue", { tone: 2 }) +
    [0, 1, 2].map((i) => sm([[40 - i * 5, -6 + i * 8], [34 - i * 5, 2 + i * 8]], { c: "ink", op: 0.45 })).join("") + eye(70, -8, 8.5, 0.7, o) + sm([[56, 18], [78, 26], [100, 12]]) + T([[74, 24], [81, 25], [78, 33]], "white", { w: "detail", flat: true }) + blush(60, 12, 8); },
  "Sea", "Shark (friendly)", ["shark", "sea", "ocean"], { box: [-150, -110, 300, 190] });
reg("animal-whale", (o) => { const bd = L.smooth([[-100, 20], [-80, -30], [-20, -60], [50, -50], [96, -10], [100, 24], [60, 56], [-10, 64], [-70, 50], [-100, 20]]);
  return LB([[-70, 30], [-112, 8], [-124, -24]], 40, 14, "blue", { tone: 1 }) + L.g(B(0, -22, 13, 30, "blue", { tone: 2 }), "translate(-124 -26) rotate(-48)") + L.g(B(0, -22, 13, 30, "blue", { tone: 2 }), "translate(-124 -26) rotate(40)") + L.shape(bd, "blue", { tone: 1 }) + clip(bd, L.flat(L.circ(30, 70, 130, 38), "cream")) + rim(bd, "blue") +
    [0, 1, 2, 3].map((i) => sm([[20 + i * 12, 34 + i * 3], [30 + i * 12, 54 + i * 2]], { c: "blue", w: 3 })).join("") + P([[10, 26], [-12, 60], [40, 40]], "blue", { tone: 2 }) + eye(66, -4, 9, 0.7, o) + sm([[44, 24], [74, 32], [92, 16]]) + blush(56, 14, 9) +
    sm([[50, -52], [44, -86]], { c: "water", w: 6 }) + sm([[50, -52], [64, -84]], { c: "water", w: 6 }) + L.flat(L.circ(42, -92, 6), "sky") + L.flat(L.circ(66, -90, 6), "sky") + L.flat(L.circ(54, -98, 5), "sky"); },
  "Sea", "Whale", ["whale", "sea", "ocean", "blue whale"], { box: [-190, -130, 340, 220] });
reg("animal-dolphin", (o) => { const bd = L.smooth([[-100, 56], [-66, 4], [-22, -30], [34, -36], [84, -14], [124, 6], [126, 14], [112, 18], [84, 18], [50, 30], [10, 40], [-34, 44], [-72, 62], [-100, 56]]);
  return P([[-98, 52], [-130, 30], [-138, 62], [-110, 80], [-90, 66]], "blue", { tone: 2 }) + P([[-12, -30], [-36, -78], [20, -34]], "blue", { tone: 2 }) + L.shape(bd, "blue", { tone: 1 }) + clip(bd, L.flat(L.circ(30, 56, 150, 26), "white")) + rim(bd, "blue") + P([[10, 34], [-4, 70], [34, 44]], "blue", { tone: 2 }) +
    eye(82, -6, 7.5, 0.7, o) + sm([[84, 20], [104, 26], [120, 16]]) + blush(74, 8, 7); },
  "Sea", "Dolphin", ["dolphin", "sea", "ocean", "jump"], { box: [-160, -100, 300, 200] });
reg("animal-octopus", (o) => { const c = o.c || "purple"; let arms = ""; for (let i = 0; i < 8; i++) { const x0 = -40 + i * 11.4, k = (i - 3.5) / 3.5, xe = x0 + k * 56, wob = i % 2 ? 1 : -1; arms += LB([[x0, 6], [x0 + k * 18 + wob * 10, 40], [xe - wob * 10, 66], [xe + k * 8, 84 + (i % 3) * 4]], 24, 7, c, { tone: 2 }); }
  return arms + B(0, -26, 50, 58, c) + L.flat(L.circ(-22, -52, 14, 9), "white", 0.35) + eye(-19, -22, 13, 0.3, o) + eye(19, -22, 13, 0.3, o) + sm([[-12, 6], [0, 14], [12, 6]]) + blush(-34, 2, 9) + blush(34, 2, 9); },
  "Sea", "Octopus", ["octopus", "sea", "ocean", "tentacles"], { box: [-130, -100, 260, 210] });
reg("animal-crab", (o) => { const claw = (s) => LB([[s * 40, -26], [s * 62, -48], [s * 70, -64]], 12, 10, "red", { tone: 2 }) + L.g(P([[0, 0], [-18, -18], [-12, -42], [0, -26], [12, -42], [18, -18]], "red"), `translate(${s * 72} -60) rotate(${s * 12})`);
  const leg = (s, i) => LB([[s * (34 + i * 6), -14 - i * 2], [s * (62 + i * 6), -30 + i * 4], [s * (74 + i * 8), -2]], 7, 5, "red", { tone: 2 });
  return L.shadow(0, 0, 150) + [0, 1, 2].map((i) => leg(-1, i) + leg(1, i)).join("") + claw(-1) + claw(1) + LB([[-14, -48], [-16, -66]], 6, 6, "red", { tone: 2 }) + LB([[14, -48], [16, -66]], 6, 6, "red", { tone: 2 }) + B(0, -26, 62, 34, "red") + eye(-16, -72, 9, 0.2, o) + eye(16, -72, 9, 0.2, o) + sm([[-12, -22], [0, -14], [12, -22]]) + blush(-34, -22, 8) + blush(34, -22, 8); },
  "Sea", "Crab", ["crab", "beach", "sea"], { box: [-130, -130, 260, 140] });

// ---------- Bugs ----------
const thin = (pts, c = "ink", w = 5) => L.stroke(L.smooth(pts), { c, w });
reg("animal-ant", (o) => { const c = "brown", leg = (x, dx, k) => thin([[x, -46], [x + dx * 0.5, -78 - k], [x + dx, -2]]); return L.shadow(0, 0, 130) +
  leg(-32, -34, 0) + leg(-14, -4, 8) + leg(-4, 24, 0) + leg(-24, -16, 4) + leg(-8, 18, 6) + leg(0, 38, 0) + thin([[30, -66], [48, -96], [66, -92]]) + thin([[36, -68], [60, -90], [76, -78]]) +
  B(-62, -46, 36, 28, c, { tone: 1 }) + B(-18, -52, 17, 14, c, { tone: 1 }) + B(32, -54, 24, 22, c, { tone: 1 }) + L.flat(L.circ(-70, -56, 12, 6), "white", 0.25) + T([[50, -42], [60, -34], [48, -34]], "ink", { w: "detail", flat: true }) +
  eye(40, -60, 8, 0.7, o) + sm([[34, -42], [44, -38], [54, -44]]) + blush(34, -48, 6); },
  "Bugs", "Ant (worker)", ["ant", "worker ant", "insect", "bug"], { box: [-120, -120, 210, 130] });
reg("animal-bee", (o) => { const bd = L.circ(0, 0, 46, 33); return L.g(P([[-14, -22], [-34, -70], [-6, -86], [14, -50]], "glass", { tone: 2, op: 0.9 }) + P([[2, -22], [20, -66], [46, -70], [40, -34]], "glass", { tone: 2, op: 0.9 }), "rotate(-6)") + T([[-44, -4], [-66, 4], [-44, 10]], "ink", { w: "detail" }) + L.shape(bd, "yellow") + clip(bd, [-28, -4, 20].map((x) => L.flat(L.rect(x, -40, 14, 80), "ink")).join("")) + rim(bd, "yellow") +
  thin([[48, -26], [60, -50], [74, -52]]) + dot(74, -52, 4.5) + thin([[40, -30], [46, -56], [58, -64]]) + dot(58, -64, 4.5) + B(46, 0, 25, 24, "yellow") + eye(53, -6, 8, 0.6, o) + sm([[44, 14], [54, 18], [64, 10]]) + blush(42, 8, 6); },
  "Bugs", "Bee", ["bee", "honey", "insect", "bug", "fly"], { box: [-90, -110, 190, 150] });
reg("animal-butterfly", (o) => { const c = o.c || "orange", up = (s) => P([[s * 8, -8], [s * 40, -66], [s * 84, -70], [s * 92, -36], [s * 60, -2]], c) + L.flat(L.circ(s * 66, -44, 11), "yellow") + L.flat(L.circ(s * 48, -26, 6), "white"), lo = (s) => P([[s * 8, 2], [s * 58, 4], [s * 62, 38], [s * 30, 54], [s * 10, 30]], c, { tone: 2 }) + L.flat(L.circ(s * 38, 30, 8), "yellow");
  return up(-1) + up(1) + lo(-1) + lo(1) + thin([[-4, -36], [-20, -64], [-34, -66]]) + dot(-34, -66, 4) + thin([[4, -36], [20, -64], [34, -66]]) + dot(34, -66, 4) + L.shape(L.circ(0, 4, 8, 36), "ink") + B(0, -34, 11, 11, "ink") + L.flat(L.circ(-3.5, -36, 2.6), "white") + L.flat(L.circ(3.5, -36, 2.6), "white"); },
  "Bugs", "Butterfly", ["butterfly", "insect", "bug", "wings"], { box: [-110, -90, 220, 160] });
reg("animal-spider", (o) => { const c = o.c || "purple", leg = (x, ex, up) => thin([[x, -56], [x + (ex - x) * 0.35, -56 - up], [ex, -2]], "ink", 6); return L.shadow(0, 0, 190) +
  [-1, 1].map((s) => leg(s * 26, s * 58, 58) + leg(s * 32, s * 84, 40) + leg(s * 34, s * 106, 22) + leg(s * 30, s * 122, 6)).join("") + B(0, -60, 38, 36, c) + L.flat(L.circ(-14, -82, 12, 7), "white", 0.3) +
  eye(-14, -66, 11, 0, o) + eye(14, -66, 11, 0, o) + eye(-8, -86, 6, 0, o) + eye(8, -86, 6, 0, o) + sm([[-10, -42], [0, -35], [10, -42]]) + blush(-28, -50, 8) + blush(28, -50, 8); },
  "Bugs", "Spider (cute)", ["spider", "web", "insect", "bug"], { box: [-140, -120, 280, 130] });
reg("animal-beetle", (o) => { const bd = L.circ(0, -34, 56, 34), c = "teal"; return L.shadow(0, 0, 130) + [-30, -4, 24].map((x) => thin([[x, -22], [x + (x < 0 ? -22 : x > 10 ? 16 : -2), -8], [x + (x < 0 ? -34 : x > 10 ? 24 : 0), -2]])).join("") +
  L.shape(bd, c, { tone: 2 }) + sm([[2, -66], [-4, -34], [2, -4]], { c: "ink", w: 4 }) + L.flat(L.circ(-30, -50, 16, 7), "white", 0.4) +
  B(62, -34, 24, 22, "ink", { tone: 1 }) + T([[68, -52], [90, -80], [92, -60]], "ink", { tone: 1 }) + eye(70, -38, 7.5, 0.7, o) + sm([[64, -24], [72, -21], [80, -26]], { c: "white" }); },
  "Bugs", "Beetle", ["beetle", "rhino beetle", "insect", "bug"], { box: [-110, -120, 220, 130] });
reg("animal-snail", (o) => { return L.shadow(0, 0, 150) + thin([[50, -36], [58, -64]]) + thin([[62, -34], [78, -62]]) + P([[-76, 0], [-66, -16], [10, -16], [36, -26], [48, -52], [68, -48], [80, -30], [74, -8], [60, 0]], "sand") + B(-14, -58, 46, 44, "orange") + sm([[-14, -58], [-6, -62], [0, -54], [-6, -44], [-20, -42], [-32, -52], [-30, -68], [-14, -78], [4, -74], [14, -60]], { c: "red", w: 5 }) + L.flat(L.circ(-30, -78, 12, 6), "white", 0.35) +
  eye(56, -66, 6.5, 0.5, o) + eye(80, -64, 6.5, 0.5, o) + sm([[56, -28], [66, -23], [76, -29]]) + blush(52, -34, 6); },
  "Bugs", "Snail", ["snail", "slow", "bug", "shell"], { box: [-110, -130, 220, 140] });

// ---------- Wild: frogs, reptiles ----------
const spots = (pts, c, r, op) => pts.map(([x, y, k = 1]) => L.flat(L.circ(x, y, r * k, r * k * 0.8), c, op)).join("");
reg("animal-frog", (o) => { const c = o.c || "green", bd = L.smooth([[-50, -8], [-58, -40], [-30, -66], [10, -70], [46, -52], [58, -24], [52, -4], [-50, -8]]);
  return L.shadow(0, 0, 130) + B(-6, -6, 46, 8, c, { tone: 2, w: "detail" }) + L.shape(bd, c) + clip(bd, L.flat(L.circ(20, 6, 54, 24), "cream") + spots([[-30, -50], [-8, -56, 0.8], [-40, -30, 0.8]], "green", 7, 0.9).replace(/fill="[^"]*"/g, `fill="${L.c("green", 2)}"`)) + rim(bd, c) +
  B(-30, -28, 28, 24, c, { tone: 1 }) + B(-8, -6, 40, 8, c, { w: "detail" }) + LB([[38, -30], [42, -4]], 15, 13, c) + B(52, -4, 17, 7, c, { w: "detail" }) +
  B(14, -76, 15, 15, c) + B(36, -78, 16, 16, c) + eye(14, -78, 10, 0.5, o) + eye(37, -80, 10.5, 0.7, o) + sm([[28, -40], [44, -34], [58, -42]]) + blush(52, -48, 7); },
  "Wild", "Frog", ["frog", "amphibian", "pond"], { box: [-100, -120, 200, 130] });
reg("animal-frog-jump", (o) => { const c = o.c || "green"; return LB([[-30, 10], [-80, 24], [-124, 50]], 24, 12, c, { tone: 1 }) + B(-130, 54, 20, 7, c, { w: "detail" }) + L.g(B(0, 0, 52, 30, c), "rotate(-14)") + LB([[28, 8], [66, 26], [96, 38]], 14, 9, c) + B(100, 40, 12, 6, c, { w: "detail" }) +
  B(34, -22, 28, 24, c) + B(24, -42, 15, 15, c) + B(44, -42, 16, 16, c) + eye(24, -44, 10, 0.6, o) + eye(45, -45, 10.5, 0.7, o) + sm([[34, -10], [56, -8], [66, -20]]); }, "Wild", "Frog jumping", ["frog", "jump", "leap", "amphibian"], { box: [-165, -90, 290, 170] });
reg("animal-turtle", (o) => { const sh = L.smooth([[-68, -6], [-64, -42], [-32, -70], [22, -70], [56, -44], [68, -6], [40, 0], [-40, 0], [-68, -6]]);
  return L.shadow(0, 0, 150) + T([[-62, -14], [-86, -8], [-62, -4]], "grass", { tone: 1 }) + LB([[-34, -16], [-36, -2]], 24, 22, "grass", { tone: 2 }) + LB([[40, -16], [44, -2]], 24, 22, "grass", { tone: 2 }) + B(44, -4, 16, 7, "grass", { tone: 2, w: "detail" }) + B(-34, -4, 16, 7, "grass", { tone: 2, w: "detail" }) + LB([[52, -30], [74, -44]], 22, 20, "grass") + B(88, -50, 21, 19, "grass") +
  L.shape(sh, "green", { tone: 2 }) + clip(sh, [[-34, -50], [0, -62], [34, -48], [-50, -22], [-18, -26], [18, -26], [50, -22]].map(([x, y], i) => L.flat(L.circ(x, y, 15, 12), "green", 0.6).replace(/fill="[^"]*"/, `fill="${L.c("green", 1)}"`)).join("")) + rim(sh, "green") + sm([[-62, -22], [60, -22]], { c: "ink", w: 4, op: 0.4 }) +
  eye(94, -54, 6.5, 0.7, o) + sm([[88, -42], [98, -39], [106, -44]]) + blush(84, -44, 5); },
  "Wild", "Turtle", ["turtle", "tortoise", "reptile", "shell"], { box: [-110, -110, 230, 120] });
reg("animal-turtle-hide", (o) => { const sh = L.smooth([[-68, -6], [-64, -42], [-32, -70], [22, -70], [56, -44], [68, -6], [40, 0], [-40, 0], [-68, -6]]);
  return L.shadow(0, 0, 150) + L.shape(sh, "green", { tone: 2 }) + clip(sh, [[-34, -50], [0, -62], [34, -48], [-50, -22], [-18, -26], [18, -26], [50, -22]].map(([x, y]) => L.flat(L.circ(x, y, 15, 12), "green", 0.6).replace(/fill="[^"]*"/, `fill="${L.c("green", 1)}"`)).join("") + L.flat(L.circ(50, -6, 30, 18), "ink")) + rim(sh, "green") + B(56, -10, 20, 12, "grass", { w: "detail" }) + eye(52, -12, 6, 0.6, o) + eye(66, -12, 6, 0.6, o) + L.text("zZ", 80, -62, { size: 26 }); },
  "Wild", "Turtle hiding", ["turtle", "hide", "shell", "shy"], { box: [-110, -110, 230, 120] });
reg("animal-snake", (o) => { const pts = [[-120, -12], [-86, -10], [-54, -32], [-22, -16], [8, -8], [38, -30], [60, -70], [64, -100]], c = o.c || "green";
  return L.shadow(0, 0, 200) + LB(pts, 8, 24, c) + [[-54, -32], [8, -8], [38, -30], [-86, -10], [60, -70]].map(([x, y]) => dot(x, y, 5, "yellow")).join("") + B(76, -110, 28, 20, c) + eye(82, -118, 7.5, 0.6, o) + sm([[72, -98], [88, -96], [100, -104]]) + blush(72, -104, 5) +
  sm([[102, -106], [114, -106], [120, -112]], { c: "red", w: 3 }) + sm([[114, -106], [120, -100]], { c: "red", w: 3 }); },
  "Wild", "Snake (friendly)", ["snake", "reptile"], { box: [-140, -150, 280, 160] });
reg("animal-snake-coil", (o) => { const c = o.c || "green"; return L.shadow(0, 0, 150) + B(0, -14, 72, 16, c) + B(0, -34, 58, 15, c) + B(0, -52, 44, 14, c) + [[-40, -14], [0, -2], [40, -14], [-30, -34], [30, -34], [-18, -52], [18, -52]].map(([x, y]) => dot(x, y, 4.5, "yellow")).join("") +
  LB([[-6, -56], [10, -84], [14, -108]], 26, 24, c) + B(20, -118, 28, 21, c) + eye(26, -126, 7.5, 0.6, o) + sm([[16, -108], [32, -106], [44, -114]]) + blush(16, -112, 5) + sm([[46, -116], [58, -116], [64, -122]], { c: "red", w: 3 }) + sm([[58, -116], [64, -110]], { c: "red", w: 3 }); },
  "Wild", "Snake coiled", ["snake", "coil", "reptile"], { box: [-100, -160, 200, 170] });
reg("animal-lizard", (o) => { const c = o.c || "green"; const leg = (x, y, s) => LB([[x, y], [x + s * 18, y + 8], [x + s * 22, -2]], 11, 9, c, { tone: 2 }) + B(x + s * 28, -3, 12, 5, c, { tone: 2, w: "detail" });
  return L.shadow(0, 0, 190) + LB([[-44, -24], [-86, -22], [-124, -36], [-156, -22]], 24, 4, c) + leg(-26, -22, -1) + L.shape(L.circ(0, -28, 56, 19), c) + clip(L.circ(0, -28, 56, 19), L.flat(L.circ(2, -8, 60, 12), "cream", 0.9)) + spots([[-30, -38], [-10, -42], [14, -40], [-40, -30, 0.8], [30, -36, 0.8]], "green", 5).replace(/fill="[^"]*"/g, `fill="${L.c("green", 2)}"`) +
  leg(36, -22, 1) + B(66, -32, 26, 17, c) + eye(70, -39, 7, 0.7, o) + sm([[62, -24], [74, -21], [90, -28]]) + blush(60, -28, 5); },
  "Wild", "Lizard", ["lizard", "gecko", "reptile"], { box: [-170, -90, 290, 100] });

})();
