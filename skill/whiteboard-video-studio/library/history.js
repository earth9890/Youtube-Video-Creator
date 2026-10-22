// ===================== library/history.js — history & ancient-world props, creatures, scenes (category "history") =====================
(function () {
const L = window.L, f1 = L.f1;
const S = L.shape, K = L.stroke, F = L.flat, G = L.g, C = L.circ, R = L.rrect, P = L.poly, SM = L.smooth;
const wobble = (cx, cy, r, n, seed, amt = 0.07, ry = r) => { const rn = L.rng(seed); return SM(Array.from({ length: n + 1 }, (_, i) => { const a = (i % n) / n * Math.PI * 2, k = 1 + (rn() - 0.5) * 2 * amt; return [cx + Math.cos(a) * r * k, cy + Math.sin(a) * ry * k]; })); };
const reg = (name, fn, meta) => L.reg("history", name, fn, Object.assign({ tags: ["history"] }, meta));

// ---------------------------------------------------------------- Stone Age
// handprint in ochre (flat paint): palm + four fingers + thumb
const handPrint = (c, op = 1) => {
  const fingers = [[-15, -54], [-5, -64], [6, -62], [16, -52]].map(([tx, ty], i) => F(L.limb([[tx * 0.55, -12], [tx, ty]], 11, 8), c, op));
  return F(C(0, 0, 22, 24), c, op) + fingers.join("") + F(L.limb([[-18, 6], [-44, -14]], 12, 9), c, op);
};
const bison = (c) => {
  const body = SM([[78, -50], [60, -72], [30, -92], [0, -96], [-26, -84], [-52, -70], [-74, -50], [-92, -40], [-96, -22], [-84, -14], [-66, -22], [-50, -30], [-30, -26], [-10, -22], [30, -24], [62, -26], [80, -34], [84, -45], [78, -50]]);
  const legs = [-44, -28, 50, 68].map((x) => F(L.limb([[x, -34], [x + 2, -16], [x, 0]], 15, 10), c));
  return F(body, c) + legs.join("") + F(L.limb([[-78, -50], [-86, -64], [-74, -72]], 7, 3), c) + F(L.limb([[82, -44], [96, -34], [94, -14]], 6, 4), c);
};
const deer = (c) => {
  const body = SM([[-40, -60], [-10, -72], [30, -68], [52, -56], [48, -38], [20, -30], [-20, -30], [-44, -40], [-40, -60]]);
  const legs = [-32, -18, 28, 42].map((x) => F(L.limb([[x, -36], [x + 1, -18], [x, 0]], 8, 5), c));
  const antlers = K("M72 -122 Q66 -150 84 -166 M76 -140 Q92 -142 98 -156 M70 -126 Q56 -146 62 -164", { c, w: 4 });
  return F(body, c) + legs.join("") + F(L.limb([[44, -60], [64, -100]], 24, 14), c) + F(C(76, -106, 17, 12), c) + antlers + F(L.limb([[-42, -52], [-54, -44]], 6, 3), c);
};
const stickHunter = (c, spear) => K("M0 -50 L0 -22 M0 -22 L-10 0 M0 -22 L10 0 M0 -42 L-14 -30 M0 -42 L" + (spear ? "16 -56" : "14 -30"), { c, w: 5 }) + F(C(0, -62, 11), c) + (spear ? K("M16 -56 L60 -78 M60 -78 L50 -76 M60 -78 L56 -68", { c, w: 4 }) : "");
reg("hist-cave-wall", (o) => {
  const rock = SM([[-285, -40], [-292, -130], [-280, -230], [-250, -280], [-200, -292], [-150, -278], [-95, -296], [-40, -282], [10, -298], [70, -284], [130, -296], [190, -280], [245, -288], [282, -240], [292, -150], [284, -40], [200, -30], [0, -26], [-200, -32], [-285, -40]]);
  const ochre = "orange", red = "red", dk = "brown";
  const stal = [[-170, -286, 16, 34], [40, -292, 14, 26], [190, -284, 18, 38]].map(([x, y, w, h]) => S(P([[x - w, y], [x, y + h], [x + w, y]], true), "stone", { w: "detail", tone: 1 })).join("");
  const texture = F(wobble(-170, -90, 60, 8, 3, 0.2, 26), "sand", 0.25) + F(wobble(130, -210, 70, 8, 5, 0.2, 28), "sand", 0.2) + F(wobble(-30, -60, 90, 8, 9, 0.2, 18), "brown", 0.12) +
    K("M-250 -200 Q-210 -190 -190 -210 M200 -120 Q230 -130 250 -110 M-60 -250 Q-20 -240 10 -256", { c: "brown", w: "hair", op: 0.35 });
  const paint = G(bison(red), "translate(-105 -78) scale(1.15)") + G(deer(dk), "translate(48 -70) scale(1.05)") +
    G(stickHunter(dk, true), "translate(-215 -80)") + G(stickHunter(dk, false), "translate(-190 -80) scale(.92)") +
    G(handPrint(ochre, 0.95), "translate(205 -190) rotate(12) scale(.9)") + G(handPrint(red, 0.9), "translate(165 -215) rotate(-14) scale(.75)") + G(handPrint(ochre, 0.9), "translate(248 -150) rotate(20) scale(.7)") +
    F(C(-150, -230, 22), ochre, 0.95) + K([0, 45, 90, 135, 180, 225, 270, 315].map((a) => { const r = (a * Math.PI) / 180; return `M${f1(-150 + Math.cos(r) * 31)} ${f1(-230 + Math.sin(r) * 31)} L${f1(-150 + Math.cos(r) * 44)} ${f1(-230 + Math.sin(r) * 44)}`; }).join(" "), { c: ochre, w: 5 });
  const pebbles = F(C(-210, -4, 14, 8), "stone", 0.9) + F(C(-180, 0, 8, 5), "stone", 0.7) + F(C(190, -2, 18, 9), "stone", 0.85);
  return L.shadow(0, 0, 600) + S(rock, "earth", { w: "scene", tone: 2 }) + stal + texture + paint + S(R(-310, -34, 620, 36, 14), "stone", { w: "scene" }) + pebbles;
}, { box: [-320, -320, 640, 350], group: "Stone Age", label: "Cave wall with paintings", tags: ["history", "cave", "paintings", "stone age", "prehistoric", "bison", "handprint"], call: 'L.put(S, "hist-cave-wall", x, gy, { s, t })', wide: true });

reg("hist-hand-axe", () => {
  const body = SM([[0, -110], [26, -62], [46, -2], [50, 46], [30, 88], [0, 100], [-30, 88], [-50, 46], [-46, -2], [-26, -62], [0, -110]]);
  return S(body, "stone", { w: "prop" }) + F(P([[0, -100], [-30, -34], [-8, 4], [8, -50]], true), "white", 0.35) + F(P([[-8, 4], [-38, 30], [-44, 56], [-12, 44]], true), "white", 0.22) +
    F(P([[8, -50], [30, -2], [14, 40], [-8, 4]], true), "ink", 0.12) + F(P([[14, 40], [44, 50], [28, 86], [4, 94]], true), "ink", 0.16) +
    K("M-8 4 L8 -50 M-8 4 L-38 30 M-8 4 L14 40 M14 40 L44 50 M-30 -34 L-8 4", { w: "detail", op: 0.5 });
}, { box: [-90, -130, 180, 250], group: "Stone Age", label: "Hand axe (flint)", tags: ["history", "stone tool", "flint", "stone age"], call: 'L.put(S, "hist-hand-axe", x, y, { s, t })' });

const spearDraw = () => {
  const head = SM([[0, -205], [17, -165], [14, -130], [0, -118], [-14, -130], [-17, -165], [0, -205]]);
  return S(R(-6, -150, 12, 300, 6), "wood", { w: "prop" }) + S(head, "stone", { w: "prop" }) + F(P([[0, -196], [-9, -150], [-1, -124]], true), "white", 0.35) +
    S(R(-10, -128, 20, 24, 6), "sand", { w: "detail" }) + K("M-9 -126 L9 -108 M-9 -114 L9 -104 M-9 -122 L9 -112", { w: "hair", op: 0.7 }) + K("M3 -90 Q4 -30 2 30", { c: "brown", w: "hair", op: 0.45 });
};
reg("hist-spear", (o) => G(spearDraw(), `rotate(${o.ang === undefined ? 35 : o.ang}) translate(0 27)`), { box: [-170, -190, 340, 380], group: "Stone Age", label: "Stone-tipped spear", tags: ["history", "weapon", "hunting", "stone age", "tool"], call: 'L.put(S, "hist-spear", x, y, { s, t, ang: 35 })', demo: {} });

reg("hist-scraper", () => {
  const blade = SM([[30, -26], [74, -40], [122, -6], [118, 8], [70, 40], [30, 26], [30, -26]]);
  return G(S(R(-120, -13, 160, 26, 13), "wood", { w: "prop" }) + K("M-100 -3 Q-50 3 0 -2", { c: "brown", w: "hair", op: 0.45 }) + S(blade, "stone", { w: "prop" }) + F(P([[34, -34], [78, -48], [60, -4], [38, 0]], true), "white", 0.32) +
    K("M112 -20 Q118 0 112 22", { c: "white", w: 4, op: 0.7 }) + S(R(14, -20, 28, 40, 6), "sand", { w: "detail" }) + K("M16 -18 L40 -2 M16 -4 L40 12 M16 8 L40 18", { w: "hair", op: 0.7 }), "rotate(-18)");
}, { box: [-140, -130, 280, 260], group: "Stone Age", label: "Hafted scraper", tags: ["history", "stone tool", "flint", "stone age"], call: 'L.put(S, "hist-scraper", x, y, { s, t })' });

reg("hist-stone-tools", () => L.shadow(0, 0, 440) + G(L.inline("hist-spear", { ang: 68 }), "translate(10 -90) scale(.8)") + G(L.inline("hist-hand-axe"), "translate(-150 -78) rotate(-20) scale(.62)") + G(L.inline("hist-scraper"), "translate(140 -62) scale(.6)"),
  { box: [-260, -190, 520, 220], group: "Stone Age", label: "Stone tools set", tags: ["history", "stone tool", "axe", "spear", "scraper", "stone age"], call: 'L.put(S, "hist-stone-tools", x, gy, { s, t })', wide: true });

reg("hist-mammoth", (o) => {
  const brown = "brown", tn = { tone: 1 };
  const top = SM([[-170, -110], [-178, -160], [-150, -215], [-100, -246], [-40, -258], [10, -262], [50, -282], [95, -292], [138, -262], [156, -228], [160, -190], [140, -168], [112, -150], [100, -130]]);
  const fringe = [[100, -122], [84, -100], [68, -120], [52, -96], [36, -118], [20, -94], [4, -118], [-12, -92], [-28, -118], [-44, -94], [-60, -118], [-76, -94], [-92, -118], [-108, -92], [-124, -116], [-140, -96], [-160, -110]].map((p) => `L${p[0]} ${p[1]}`).join(" ");
  const leg = (x, far) => S(R(x, -140, 48, 140, 20), brown, { w: "prop", tone: far ? 2 : 1 }) + [0, 1, 2].map((i) => F(C(x + 11 + i * 13, -9, 5, 6.5), "cream")).join("");
  const legsFar = leg(-62, 1) + leg(24, 1), legsNear = leg(-120, 0) + leg(78, 0);
  const fur = K("M-120 -200 Q-110 -216 -96 -210 M-70 -240 Q-56 -254 -42 -246 M-10 -250 Q4 -264 16 -254 M-150 -150 Q-140 -164 -126 -156 M-100 -120 Q-90 -130 -78 -124", { c: "brown", w: "detail", op: 0.8 });
  const wr = [[180, -135], [182, -98], [177, -68]].map(([x, y]) => K(`M${x - 20} ${y} Q${x} ${y + 7} ${x + 20} ${y}`, { w: "hair", op: 0.55 })).join("");
  const body = S(top + " " + fringe + " Z", brown, Object.assign({ w: "prop" }, tn));
  const trunk = S(L.limb([[150, -205], [176, -160], [184, -105], [176, -55], [190, -24], [214, -28], [222, -56]], 76, 40), brown, { w: "prop", tone: 1 });
  const tusk = S(L.limb([[140, -176], [166, -140], [212, -122], [256, -142], [274, -178]], 26, 8), "cream", { w: "prop" });
  const tail = S(L.limb([[-168, -150], [-190, -128], [-186, -96]], 18, 10), brown, { w: "detail", tone: 2 });
  return L.shadow(0, 0, 430) + G(tail + legsFar + body + fur + legsNear + S(C(62, -200, 24, 36), brown, { w: "detail", tone: 2 }) + F(C(63, -198, 13, 24), "pink", 0.55) +
    trunk + wr + tusk + F(C(116, -192, 13, 8), "pink", 0.45) +
    F(C(128, -214, 9), "ink") + F(C(131, -217, 3.2), "white") + K("M104 -176 Q122 -160 140 -178", { w: "detail" }) + K("M116 -234 Q130 -240 144 -232", { w: "hair", op: 0.8 }) +
    F(P([[24, -270], [60, -290], [96, -300], [60, -276]], true), "white", 0.14), "translate(-45 0)");
}, { box: [-270, -320, 540, 340], group: "Stone Age", label: "Woolly mammoth (friendly)", tags: ["history", "mammoth", "ice age", "animal", "prehistoric", "tusks"], call: 'L.put(S, "hist-mammoth", x, gy, { s, flip, t })', wide: true });

reg("hist-sabre-cat", () => {
  const furN = "earth";
  const leg = (x, far) => S(L.limb([[x, -70], [x + 2, -34], [x, -8]], 36, 30), furN, { w: "prop", tone: far ? 2 : 0 }) + S(C(x + 8, -6, 21, 11), furN, { w: "detail", tone: far ? 2 : 0 });
  const body = SM([[-130, -90], [-118, -128], [-78, -148], [-20, -150], [30, -140], [52, -110], [48, -70], [20, -48], [-60, -42], [-112, -52], [-130, -90]]);
  const head = SM([[28, -130], [34, -158], [60, -178], [98, -184], [130, -168], [144, -138], [140, -108], [118, -84], [84, -76], [50, -86], [32, -106], [28, -130]]);
  const stripes = [-100, -70, -40, -10].map((x) => F(L.limb([[x, -148], [x + 5, -122], [x, -98]], 13, 3), "brown", 0.6)).join("");
  const ear = (x, y, r) => S(SM([[x - 18, y + 14], [x - 10, y - 14], [x, y - 24], [x + 14, y - 12], [x + 18, y + 14], [x - 18, y + 14]]), furN, { w: "detail", tone: 0 }) + F(SM([[x - 9, y + 10], [x - 4, y - 8], [x + 8, y - 4], [x + 9, y + 10], [x - 9, y + 10]]), "pink", 0.7);
  const fang = (x, n) => S(SM([[x - 7, -106], [x + 7, -106], [x + 5, -76], [x + n, -56], [x - 5, -76], [x - 7, -106]]), "cream", { w: "detail" });
  const tail = S(L.limb([[-125, -100], [-158, -116], [-166, -150]], 24, 17), furN, { w: "prop" }) + F(L.limb([[-160, -128], [-166, -150]], 20, 16), "brown", 0.7);
  return L.shadow(0, 0, 330) + tail + leg(-62, 1) + leg(-4, 1) + S(body, furN, { w: "prop" }) + F(SM([[-112, -52], [-60, -42], [20, -48], [40, -74], [-20, -64], [-90, -66], [-112, -52]]), "cream", 0.85) + stripes +
    leg(-96, 0) + leg(32, 0) + ear(52, -170) + ear(122, -168) + S(head, furN, { w: "prop" }) + F(SM([[62, -176], [96, -182], [120, -172], [90, -160]]), "white", 0.3) +
    F(C(104, -102, 32, 21), "cream") + fang(94, 1) + fang(122, 1) + S(P([[124, -118], [138, -118], [131, -108]], true), "pink", { w: "hair" }) + K("M131 -108 Q131 -98 122 -96 M131 -108 Q131 -98 140 -96", { w: "detail" }) +
    F(C(88, -140, 11, 14), "ink") + F(C(91, -145, 4.5), "white") + F(C(122, -142, 10, 13), "ink") + F(C(125, -147, 4), "white") + F(C(66, -112, 12, 8), "pink", 0.5) +
    K("M76 -160 Q86 -166 98 -160 M114 -160 Q126 -166 136 -160", { w: "hair", op: 0.7 });
}, { box: [-190, -210, 360, 230], group: "Stone Age", label: "Sabre-tooth cat (cute)", tags: ["history", "sabre-tooth", "tiger", "cat", "ice age", "animal", "prehistoric"], call: 'L.put(S, "hist-sabre-cat", x, gy, { s, flip, t })' });

// ---------------------------------------------------------------- Ancient world
const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
const pyr = (cx, base, hw, h, seed) => {
  const A = [cx + hw * 0.05, base - h], Lc = [cx - hw, base - hw * 0.07], Fr = [cx - hw * 0.08, base + hw * 0.07], Rc = [cx + hw, base - hw * 0.09], rn = L.rng(seed), N = 7;
  const blocks = (p, q) => Array.from({ length: N - 1 }, (_, k) => {
    const t = (k + 1) / N, t2 = (k + 2) / N, a = lerp(A, p, t), b = lerp(A, q, t), a2 = lerp(A, p, t2), b2 = lerp(A, q, t2);
    const ticks = [0.3, 0.62].map((u) => { const u2 = u + (rn() - 0.5) * 0.2; return L.line(lerp(a, b, u2), lerp(a2, b2, u2)); }).join(" ");
    return K(L.line(a, b) + " " + ticks, { w: "hair", op: 0.4 });
  }).join("");
  return S(P([A, Lc, Fr], true), "earth", { w: "prop", tone: 1 }) + S(P([A, Fr, Rc], true), "earth", { w: "prop", tone: 2 }) + blocks(Lc, Fr) + blocks(Fr, Rc) + F(P([A, lerp(A, Lc, 0.22), lerp(A, Fr, 0.22)], true), "white", 0.3);
};
const palm = (x, y, lean) => {
  const trunk = S(L.limb([[x, y], [x + lean * 0.4, y - 50], [x + lean, y - 100]], 16, 10), "wood", { w: "detail" });
  const top = [x + lean, y - 100];
  const frond = (a) => { const r = (a * Math.PI) / 180, e = [top[0] + Math.cos(r) * 60, top[1] + Math.sin(r) * 34 + 18]; return S(SM([top, lerp(top, e, 0.5).map((v, i) => v + (i ? -16 : 0)), e, lerp(top, e, 0.5).map((v, i) => v + (i ? 4 : 0)), top]), "green", { w: "hair" }); };
  return trunk + [-170, -140, -105, -75, -40, -10, 20].map(frond).join("") + S(C(top[0], top[1] + 4, 8), "brown", { w: "hair" });
};
reg("hist-pyramid", () => {
  const dune = (pts, tone) => S(SM(pts), "sand", { w: "scene", tone });
  const back = dune([[-380, 0], [-330, -26], [-250, -34], [-170, -18], [-110, -22], [-40, -10], [40, -30], [120, -26], [200, -12], [280, -28], [360, -16], [390, 0], [200, 10], [-100, 10], [-380, 0]], 1);
  return L.shadow(0, 0, 780) + back + pyr(210, -18, 105, 135, 4) + pyr(-20, -2, 190, 262, 7) +
    S(SM([[-390, 0], [-300, -18], [-210, -8], [-120, -22], [-20, -6], [90, -20], [200, -10], [300, -24], [390, -10], [390, 14], [-390, 14], [-390, 0]]), "sand", { w: "scene" }) +
    palm(-300, -6, 18) + F(SM([[-250, 4], [-170, -6], [-60, 4], [-100, 12], [-220, 12], [-250, 4]]), "earth", 0.28) + F(C(250, -2, 22, 7), "brown", 0.15) + S(SM([[300, -10], [318, -22], [340, -14], [336, -2], [304, -2], [300, -10]]), "stone", { w: "detail" });
}, { box: [-400, -330, 800, 360], group: "Ancient world", label: "Pyramids in the desert (generic)", tags: ["history", "pyramid", "desert", "egypt", "ancient", "scenery"], call: 'L.put(S, "hist-pyramid", x, gy, { s, t })', wide: true });

reg("hist-scroll", () => {
  const rn = L.rng(11);
  const roll = (x) => S(R(x - 17, -74, 34, 148, 10), "cream", { w: "prop" }) + F(C(x, -74, 17, 7), "sand") + K(`M${x - 9} -74 Q${x} -68 ${x + 9} -74 M${x - 4} -74 Q${x} -71 ${x + 4} -74`, { w: "hair", op: 0.6 }) +
    S(R(x - 8, -96, 16, 22, 5), "wood", { w: "detail" }) + S(R(x - 8, 74, 16, 22, 5), "wood", { w: "detail" }) + F(R(x - 12, -66, 7, 130, 3), "white", 0.5);
  const lines = [-34, -10, 14, 38].map((y, i) => { let d = "", x = -92; while (x < 70 - (i === 3 ? 60 : 0)) { const w = 14 + rn() * 26; d += `M${f1(x)} ${y} q${f1(w / 4)} -7 ${f1(w / 2)} 0 t${f1(w / 2)} 0 `; x += w + 10; } return K(d, { w: "detail", op: 0.8 }); }).join("");
  const glyphs = K("M-90 -50 m-6 0 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0 M-62 -50 l6 -8 l6 8 l6 -8 l6 8 M-30 -50 q8 -10 16 0 q8 10 16 0", { w: "detail", op: 0.8 });
  return S(SM([[-118, -62], [-60, -70], [0, -64], [60, -70], [118, -62], [122, 0], [118, 62], [60, 70], [0, 64], [-60, 70], [-118, 62], [-122, 0], [-118, -62]]), "paper", { w: "prop" }) + F(P([[-112, -60], [112, -60], [112, -50], [-112, -50]], true), "sand", 0.35) + lines + glyphs +
    roll(-140) + roll(140) + S(wobble(70, 46, 16, 9, 3, 0.1), "red", { w: "detail" }) + K(L.star(70, 46, 8, 4, 5), { w: "hair", c: "paper", op: 0.9 });
}, { box: [-180, -110, 360, 220], group: "Ancient world", label: "Ancient scroll", tags: ["history", "scroll", "writing", "papyrus", "ancient", "document"], call: 'L.put(S, "hist-scroll", x, y, { s, t })' });

reg("hist-clay-tablet", () => {
  const rn = L.rng(23);
  const wedge = (x, y) => { const k = 0.55 + rn() * 0.35, v = rn() < 0.5; return v ? P([[x, y - 8 * k], [x + 3.5, y + 5 * k], [x - 3.5, y + 5 * k]], true) + " " + L.line([x, y + 5 * k], [x, y + 12 * k]) : P([[x - 8 * k, y], [x + 5 * k, y - 3.5], [x + 5 * k, y + 3.5]], true) + " " + L.line([x + 5 * k, y], [x + 12 * k, y]); };
  let marks = "";
  [-48, -24, 0, 24, 48].forEach((y, r) => { let x = -78; const end = r === 4 ? 10 : 80; while (x < end) { marks += wedge(x, y); x += 14 + rn() * 9; } });
  return G(S(SM([[-100, -60], [-70, -78], [0, -82], [70, -78], [100, -62], [108, 0], [102, 62], [70, 78], [0, 82], [-70, 78], [-102, 60], [-108, 0], [-100, -60]]), "earth", { w: "prop" }) +
    F(SM([[-92, -56], [-62, -72], [0, -76], [-50, -60], [-86, -30], [-92, -56]]), "white", 0.3) + F(SM([[104, 10], [96, 60], [66, 76], [80, 40], [104, 10]]), "brown", 0.14) +
F(marks, "brown", 0.7) + K(marks, { c: "brown", w: "hair", op: 0.7 }) + K("M90 -40 l-10 14 l6 8 l-8 10", { c: "brown", w: "hair", op: 0.55 }), "rotate(-6)");
}, { box: [-130, -110, 260, 220], group: "Ancient world", label: "Clay tablet with marks", tags: ["history", "clay", "tablet", "writing", "cuneiform", "mesopotamia", "ancient"], call: 'L.put(S, "hist-clay-tablet", x, y, { s, t })' });

reg("hist-quill-ink", () => {
  const rn = L.rng(5);
  const vane = (sgn) => { const e = Array.from({ length: 6 }, (_, i) => { const t = i / 5, w = Math.sin(Math.PI * Math.pow(t, 0.8)) * (sgn > 0 ? 40 : 34); return [sgn * w + sgn * (i % 2 ? 2 : -1), -50 - t * 180]; }); return e; };
  const feather = SM([[0, -50], ...vane(1), [4, -232], ...vane(-1).reverse(), [0, -50]]);
  const barbs = Array.from({ length: 12 }, (_, i) => { const y = -62 - i * 14, sgn = i % 2 ? 1 : -1, w = Math.sin(Math.PI * Math.pow((-y - 50) / 180, 0.8)) * 30; return K(`M0 ${y} L${f1(sgn * w)} ${f1(y - 16)}`, { w: "hair", op: 0.4 }); }).join("");
  const quill = G(S(L.limb([[0, 0], [0, -58]], 8, 6), "cream", { w: "detail" }) + S(feather, "white", { w: "detail" }) + K("M0 -50 L1 -230", { w: "detail", op: 0.7 }) + barbs, "translate(-8 -30) rotate(26)");
  return F(wobble(0, 62, 74, 10, 4, 0.1, 10), "ink", 0.12) + S(R(-26, -32, 36, 26, 8), "glass", { w: "prop" }) + quill + S(R(-34, -40, 52, 14, 6), "glass", { w: "prop" }) +
    S(R(-60, -10, 100, 80, 30), "glass", { w: "prop" }) + S(R(-52, 18, 84, 44, 20), "navy", { w: "detail" }) + F(R(-48, -2, 10, 54, 5), "white", 0.7) +
    S(SM([[84, 56], [92, 70], [92, 80], [84, 86], [76, 80], [76, 70], [84, 56]]), "navy", { w: "detail" }) + F(C(80, 74, 3), "white", 0.7);
}, { box: [-130, -270, 260, 370], group: "Ancient world", label: "Quill and ink", tags: ["history", "quill", "ink", "feather", "writing", "ancient"], call: 'L.put(S, "hist-quill-ink", x, y, { s, t })' });

reg("hist-sundial", () => {
  const ticks = Array.from({ length: 12 }, (_, i) => { const a = (i * 30 * Math.PI) / 180, c = Math.cos(a), s = Math.sin(a); return L.line([c * 100, -160 + s * 34], [c * 124, -160 + s * 42]); }).join(" ");
  return L.shadow(0, 0, 200) + S(P([[-34, -22], [34, -22], [26, -124], [-26, -124]], true), "stone", { w: "prop", tone: 0 }) + S(R(-64, -26, 128, 26, 8), "stone", { w: "prop" }) + S(R(-44, -138, 88, 18, 6), "stone", { w: "prop" }) +
    S(C(0, -148, 140, 50), "stone", { w: "prop", tone: 2 }) + S(C(0, -160, 140, 50), "stone", { w: "prop" }) + F(C(-30, -170, 90, 24), "white", 0.18) + K(C(0, -160, 112, 38), { w: "detail", op: 0.6 }) + K(ticks, { w: "detail", op: 0.8 }) +
    F(P([[-30, -148], [40, -172], [-66, -166]], true), "ink", 0.28) + S(P([[-30, -148], [40, -172], [40, -244]], true), "gold", { w: "prop" }) + F(P([[34, -176], [34, -232], [-12, -158]], true), "white", 0.25);
}, { box: [-160, -270, 320, 300], group: "Ancient world", label: "Sundial", tags: ["history", "sundial", "time", "clock", "shadow", "ancient"], call: 'L.put(S, "hist-sundial", x, gy, { s, t })' });

reg("hist-oil-lamp", () => {
  const body = SM([[-80, 10], [-100, -14], [-96, -40], [-60, -58], [-10, -62], [40, -56], [78, -42], [112, -38], [128, -26], [114, -12], [84, 0], [40, 16], [-20, 22], [-80, 10]]);
  return F(C(126, -72, 64), "yellow", 0.18) + F(C(126, -72, 38), "yellow", 0.25) + S(L.limb(L.arcPts(-104, -22, 24, -40, 250, 10), 13, 13), "earth", { w: "prop" }) + S(body, "earth", { w: "prop" }) +
    F(C(-6, -50, 46, 11), "brown", 0.55) + S(C(-6, -50, 18, 5), "brown", { w: "hair", tone: 2 }) + F(SM([[-80, -40], [-40, -54], [0, -58], [-40, -44], [-84, -20], [-80, -40]]), "white", 0.3) +
    K("M-84 -8 Q-30 14 40 10 M-70 -22 Q-10 0 70 -4", { c: "brown", w: "hair", op: 0.5 }) + [-50, -20, 10, 40].map((x) => F(C(x, 12 - Math.abs(x) * 0.0 - 4, 3.5), "brown", 0.5)).join("") +
    S(SM([[122, -40], [108, -62], [116, -90], [126, -112], [138, -88], [142, -64], [134, -42], [122, -40]]), "orange", { w: "detail" }) + F(SM([[124, -46], [118, -64], [126, -84], [134, -64], [130, -48], [124, -46]]), "yellow");
}, { box: [-140, -150, 350, 200], group: "Ancient world", label: "Oil lamp (clay)", tags: ["history", "lamp", "oil lamp", "light", "flame", "ancient", "clay"], call: 'L.put(S, "hist-oil-lamp", x, y, { s, t })' });

reg("hist-old-map", () => {
  const rn = L.rng(31), top = [], bot = [];
  for (let i = 0; i <= 8; i++) { top.push([-190 + i * 47.5, -120 + (rn() - 0.5) * 8]); bot.push([190 - i * 47.5, 120 + (rn() - 0.5) * 8]); }
  const sheet = SM([...top, [196, -60], [192, 0], [198, 60], ...bot, [-196, 60], [-192, 0], [-198, -60], top[0]]);
  const waves = [[-120, 90], [-30, 10], [90, 100], [150, -20], [-160, -20]].map(([x, y]) => K(`M${x} ${y} q8 -8 16 0 t16 0`, { c: "water", w: "detail", op: 0.8 })).join("");
  const peaks = [[-120, -40], [-102, -52], [-84, -40]].map(([x, y]) => K(`M${x - 10} ${y + 10} L${x} ${y} L${x + 10} ${y + 10}`, { c: "brown", w: "detail", op: 0.8 })).join("");
  const compass = G(S(L.star(0, 0, 34, 10, 4), "red", { w: "detail" }) + S(L.star(0, 0, 22, 8, 4, -45), "gold", { w: "detail" }) + L.text("N", 0, -42, { size: 20 }), "translate(138 74)");
  return S(sheet, "sand", { w: "prop", tone: 1 }) + F(SM([[-190, -110], [-90, -118], [-150, -80], [-190, -40], [-190, -110]]), "white", 0.3) + K(P([[-172, -100], [172, -100], [172, 100], [-172, 100]], true), { w: "detail", op: 0.6 }) +
    S(wobble(-110, -20, 70, 10, 2, 0.28, 46), "earth", { w: "detail", tone: 1 }) + S(wobble(30, -30, 62, 10, 7, 0.3, 40), "earth", { w: "detail", tone: 1 }) + S(wobble(-10, 60, 50, 9, 12, 0.3, 24), "earth", { w: "detail", tone: 1 }) + peaks + waves +
    K("M-80 10 Q-30 40 20 0 Q60 -30 100 20", { c: "red", w: "detail", dash: "10 9" }) + K("M92 12 l16 16 m0 -16 l-16 16", { c: "red", w: 7 }) + compass + L.text("HERE BE DRAGONS", -70, -76, { size: 15 });
}, { box: [-210, -135, 420, 270], group: "Ancient world", label: "Old world map", tags: ["history", "map", "treasure", "explorer", "old", "parchment", "ancient"], call: 'L.put(S, "hist-old-map", x, y, { s, t })' });

const coin = (x, y, r, c, seed) => S(wobble(x, y, r, 12, seed, 0.04), c, { w: "detail" }) + K(C(x, y, r * 0.74), { w: "hair", op: 0.5 }) + K(L.star(x, y, r * 0.5, r * 0.22, 6), { w: "hair", op: 0.6 });
reg("hist-coins", () => {
  const rn = L.rng(2), stack = Array.from({ length: 6 }, (_, i) => { const dx = (rn() - 0.5) * 8; return S(R(-40 + dx - 70, -14 * (i + 1), 80, 16, 8), i === 3 ? "gray" : "gold", { w: "detail" }) + F(R(-34 + dx - 70, -14 * (i + 1) + 3, 32, 4, 2), "white", 0.5); }).join("");
  const flat = (x, y, r, c) => S(C(x, y + 7, r, r * 0.4), c, { w: "detail", tone: 2 }) + S(C(x, y, r, r * 0.4), c, { w: "detail" }) + K(C(x, y, r * 0.7, r * 0.28), { w: "hair", op: 0.5 }) + K(L.star(x, y, r * 0.38, r * 0.16, 6), { w: "hair", op: 0.55 });
  return L.shadow(0, 0, 300) + coin(86, -62, 52, "gold", 5) + F(SM([[56, -96], [100, -108], [76, -80], [56, -96]]), "white", 0.5) + stack + flat(10, -12, 38, "gold") + flat(100, -8, 34, "gray") + flat(-20, -4, 30, "gold");
}, { box: [-180, -150, 360, 170], group: "Ancient world", label: "Ancient coins", tags: ["history", "coins", "money", "gold", "treasure", "ancient", "silver"], call: 'L.put(S, "hist-coins", x, gy, { s, t })' });

reg("hist-amphora", () => {
  const half = [[22, -232], [16, -214], [18, -192], [30, -172], [54, -146], [62, -110], [54, -66], [34, -26], [20, -8]];
  const body = SM([...half, [-20, -8], ...half.slice().reverse().slice(1).map(([x, y]) => [-x, y]), [-22, -232], half[0]].filter((p, i, a) => true));
  const handle = (sg) => S(L.limb([[sg * 16, -206], [sg * 50, -216], [sg * 60, -176], [sg * 46, -146]], 12, 12), "earth", { w: "prop", tone: 2 });
  const meander = K("M-56 -118 h22 v-14 h14 v14 h14 v-14 h14 v14 h14 v-14 h14 v14 h14 v-14", { c: "brown", w: "detail", op: 0.9 });
  return L.shadow(0, 0, 130) + handle(1) + handle(-1) + S(body, "earth", { w: "prop" }) + S(R(-28, -240, 56, 14, 6), "earth", { w: "prop", tone: 2 }) + F(R(-62, -128, 124, 44, 4), "brown", 0.35) + K("M-58 -124 h116 M-58 -88 h116", { c: "brown", w: "hair", op: 0.6 }) + meander + F(SM([[-40, -176], [-52, -140], [-50, -76], [-40, -50], [-34, -100], [-30, -150], [-40, -176]]), "white", 0.28);
}, { box: [-110, -260, 220, 280], group: "Ancient world", label: "Clay amphora (jar)", tags: ["history", "amphora", "jar", "pottery", "clay", "ancient", "greek"], call: 'L.put(S, "hist-amphora", x, gy, { s, t })' });

// ---------------------------------------------------------------- Exploration, craft and invention
reg("hist-brass-telescope", (o) => {
  const ring = (x, h) => S(R(x - 5, -h / 2 - 3, 10, h + 6, 3), "gold", { w: "detail", tone: 2 });
  const shine = (x, y, w) => F(R(x, y, w, 4, 2), "white", 0.55);
  const stitches = Array.from({ length: 9 }, (_, i) => K(`M${24 + i * 15} -26 l5 52`, { c: "brown", w: "hair", op: 0.7 })).join("");
  const tube = S(R(-178, -10, 52, 20, 6), "gold", { w: "prop" }) + S(R(-190, -15, 16, 30, 6), "brown", { w: "prop" }) + shine(-170, -7, 36) + S(R(-132, -15, 80, 30, 6), "gold", { w: "prop" }) + shine(-124, -12, 56) + ring(-130, 30) +
    S(R(-58, -22, 84, 44, 6), "gold", { w: "prop" }) + shine(-50, -19, 58) + ring(-56, 44) +
    S(R(18, -30, 150, 60, 8), "brown", { w: "prop", tone: 1 }) + stitches + F(R(26, -26, 134, 6, 3), "white", 0.3) + ring(20, 60) + ring(166, 60) +
    S(P([[170, -30], [204, -44], [204, 44], [170, 30]], true), "gold", { w: "prop" }) + S(C(204, 0, 13, 44), "glass", { w: "prop" }) + F(SM([[200, -30], [208, -16], [204, 0], [198, -12], [200, -30]]), "white", 0.8);
  return L.shadow(0, 56, 300) + G(tube, `rotate(${o.ang === undefined ? -20 : o.ang}) translate(-12 0)`);
}, { box: [-230, -150, 460, 260], group: "Exploration and invention", label: "Old brass telescope", tags: ["history", "telescope", "spyglass", "brass", "pirate", "explorer", "navigation"], call: 'L.put(S, "hist-brass-telescope", x, y, { s, t, ang: -20 })', demo: {} });

const waterBand = (x0, x1, y, seed) => {
  const rn = L.rng(seed), pts = [];
  for (let x = x0; x <= x1; x += 40) pts.push([x, y + (Math.floor((x - x0) / 40) % 2 ? -10 : 4) + (rn() - 0.5) * 4]);
  return S(SM([...pts, [x1 + 4, y + 40], [x0 - 4, y + 40], pts[0]]), "water", { w: "detail" }) + K(pts.filter((_, i) => i % 2).map((p) => `M${p[0] - 14} ${p[1] + 14} q14 -8 28 0`).join(" "), { c: "white", w: "detail", op: 0.8 });
};
const sail = (x, y1, y2, w, c, stripe) => {
  const yb = (px) => y2 + 20 * (1 - Math.pow(px / w, 2));
  return S(P([[x - w, y1], [x + w, y1], [x + w, y2], [x + w * 0.5, yb(w * 0.5)], [x, yb(0)], [x - w * 0.5, yb(w * 0.5)], [x - w, y2]], true), c, { w: "prop" }) +
    (stripe ? F(P([[x - w, (y1 + y2) / 2 - 10], [x + w, (y1 + y2) / 2 - 10], [x + w, (y1 + y2) / 2 + 12], [x - w, (y1 + y2) / 2 + 12]], true), stripe, 0.9) : "") +
    K(`M${x - w / 2} ${y1} L${x - w / 2} ${yb(w / 2)} M${x + w / 2} ${y1} L${x + w / 2} ${yb(w / 2)}`, { w: "hair", op: 0.35 }) + S(R(x - w - 8, y1 - 5, 2 * w + 16, 10, 4), "wood", { w: "detail" });
};
reg("hist-galleon", (o) => {
  const mast = (x, h) => S(R(x - 6, -h, 12, h - 70, 3), "wood", { w: "detail" }) + F(R(x - 3, -h + 4, 3, h - 80, 1), "white", 0.3);
  const flag = (x, h) => S(SM([[x, -h], [x + 36, -h - 7], [x + 66, -h + 3], [x + 36, -h + 12], [x, -h + 10]]), "red", { w: "hair" });
  const hull = S(SM([[-235, -160], [-225, -90], [-190, -30], [-120, 6], [0, 12], [120, 6], [200, -24], [250, -76], [266, -102], [230, -96], [130, -92], [-100, -92], [-200, -110], [-235, -160]]), "wood", { w: "prop" });
  const ports = [-120, -76, -32, 12, 56, 100, 144].map((x) => S(R(x - 10, -66, 20, 18, 4), "navy", { w: "hair" }) + F(R(x - 6, -62, 12, 4, 2), "gray", 0.9)).join("");
  const planks = K("M-212 -72 Q0 -44 222 -66 M-198 -36 Q0 -18 190 -26", { c: "brown", w: "hair", op: 0.5 });
  const stern = S(R(-246, -214, 112, 74, 10), "wood", { w: "prop", tone: 1 }) + S(R(-252, -224, 124, 14, 6), "gold", { w: "detail" }) + [-224, -196, -168].map((x) => S(R(x - 11, -200, 22, 28, 6), "yellow", { w: "detail" })).join("") + K("M-246 -152 L-134 -152", { c: "brown", w: "detail", op: 0.6 });
  const rigging = K("M-10 -460 L250 -100 M-10 -460 L-250 -214 M110 -390 L250 -100", { w: "hair", op: 0.5 });
  const bowsprit = S(L.limb([[236, -96], [292, -128], [330, -150]], 12, 8), "wood", { w: "detail" }) + S(P([[322, -144], [246, -100], [300, -104]], true), "cream", { w: "detail" });
  return L.shadow(0, 8, 520) + mast(-140, 370) + mast(-10, 460) + mast(110, 390) + hull + planks + sail(110, -340, -250, 62, "cream", "red") + sail(110, -250, -150, 70, "cream") +
    sail(-10, -410, -330, 64, "cream") + sail(-10, -330, -190, 88, "cream", "red") + sail(-140, -325, -240, 48, "cream") + stern + ports + K("M-200 -104 Q0 -92 230 -98", { c: "gold", w: 4 }) + bowsprit + flag(-140, 370) + flag(-10, 460) + flag(110, 390) + rigging + (o.water === false ? "" : waterBand(-290, 330, -22, 3));
}, { box: [-300, -500, 640, 540], group: "Exploration and invention", label: "Old sailing ship (galleon)", tags: ["history", "ship", "galleon", "sailing", "pirate", "explorer", "boat"], call: 'L.put(S, "hist-galleon", x, gy, { s, flip, t, water: true })' });

reg("hist-longship", (o) => {
  const hull = S(SM([[-290, -150], [-270, -100], [-230, -62], [-150, -34], [0, -26], [150, -34], [230, -62], [270, -110], [284, -150], [250, -90], [150, -70], [0, -62], [-150, -70], [-250, -90], [-290, -150]]), "wood", { w: "prop", tone: 1 });
  const dragon = S(L.limb([[262, -96], [292, -140], [284, -190]], 28, 20), "wood", { w: "prop", tone: 1 }) + S(SM([[262, -196], [276, -226], [310, -230], [340, -214], [344, -198], [318, -190], [290, -178], [268, -184], [262, -196]]), "wood", { w: "prop", tone: 1 }) +
    F(C(300, -212, 8), "white") + F(C(302, -212, 4), "ink") + F(C(330, -210, 3), "ink", 0.7) + K("M312 -194 Q326 -192 338 -200", { w: "hair" }) + S(P([[284, -228], [292, -252], [302, -228]], true), "red", { w: "detail" }) + S(P([[270, -214], [270, -246], [284, -222]], true), "red", { w: "detail" });
  const stern = S(L.limb([[-262, -96], [-296, -148], [-278, -194], [-250, -180]], 26, 14), "wood", { w: "prop", tone: 1 });
  const cols = ["red", "yellow", "blue", "cream"];
  const shields = Array.from({ length: 11 }, (_, i) => { const x = -190 + i * 38; return S(C(x, -62, 17), cols[i % 4], { w: "detail" }) + F(C(x, -62, 5), "gray") ; }).join("");
  const yb = (px) => -146 + 18 * (1 - Math.pow(px / 105, 2)), stripes = Array.from({ length: 6 }, (_, i) => { const x0 = -105 + i * 35, x1 = x0 + 35; return S(P([[x0, -310], [x1, -310], [x1, yb(x1)], [(x0 + x1) / 2, yb((x0 + x1) / 2)], [x0, yb(x0)]], true), i % 2 ? "cream" : "red", { w: "detail" }); }).join("");
  const oars = Array.from({ length: 7 }, (_, i) => { const x = -150 + i * 50; return K(`M${x} -58 L${x - 34} 8`, { c: "wood", w: 7 }) + F(L.limb([[x - 30, 2], [x - 38, 14]], 10, 14), "wood"); }).join("");
  return L.shadow(0, 8, 540) + oars + S(R(-6, -330, 12, 276, 3), "wood", { w: "detail" }) + stern + dragon + hull + K("M-230 -78 Q0 -50 232 -78", { c: "brown", w: "hair", op: 0.5 }) + stripes + S(R(-114, -316, 228, 12, 5), "wood", { w: "detail" }) +
    K("M0 -330 L-262 -170 M0 -330 L280 -190", { w: "hair", op: 0.5 }) + shields + (o.water === false ? "" : waterBand(-310, 340, -20, 9));
}, { box: [-330, -350, 690, 390], group: "Exploration and invention", label: "Longship (generic)", tags: ["history", "longship", "viking", "ship", "boat", "dragon", "sail"], call: 'L.put(S, "hist-longship", x, gy, { s, flip, t, water: true })', wide: true });

reg("hist-printing-press", () => {
  const thread = Array.from({ length: 7 }, (_, i) => K(`M-14 ${-196 - i * 26} l28 -12`, { w: "hair", op: 0.7 })).join("");
  const letters = Array.from({ length: 12 }, (_, i) => F(R(-54 + i * 9.5, -126, 6, 10, 1), "cream", 0.9)).join("");
  return L.shadow(0, 2, 360) + S(R(-110, -92, 220, 92, 8), "wood", { w: "prop" }) + K("M-90 -74 L90 -74 L90 -14 L-90 -14 Z", { c: "brown", w: "hair", op: 0.5 }) + S(C(0, -44, 6), "gold", { w: "detail" }) +
    S(R(-104, -112, 208, 22, 6), "wood", { w: "prop", tone: 1 }) + S(R(-62, -132, 124, 22, 4), "navy", { w: "detail" }) + letters +
    S(R(-104, -350, 24, 246, 4), "wood", { w: "prop", tone: 2 }) + S(R(80, -350, 24, 246, 4), "wood", { w: "prop", tone: 2 }) + S(R(-120, -372, 240, 34, 6), "wood", { w: "prop" }) +
    S(R(-16, -420, 32, 270, 6), "gray", { w: "prop" }) + thread + S(R(-76, -190, 152, 30, 6), "wood", { w: "prop", tone: 1 }) + S(R(-24, -166, 48, 8, 3), "gray", { w: "detail" }) +
    S(R(-170, -424, 340, 18, 9), "wood", { w: "prop" }) + S(C(-170, -415, 15), "wood", { w: "prop", tone: 2 }) + S(C(170, -415, 15), "wood", { w: "prop", tone: 2 }) + S(R(-22, -444, 44, 26, 8), "gray", { w: "prop" }) +
    G(S(R(0, -14, 76, 14, 2), "paper", { w: "detail" }) + S(R(4, -28, 70, 14, 2), "paper", { w: "detail" }) + S(R(-2, -42, 78, 14, 2), "paper", { w: "detail" }) + K("M12 -35 h40 M12 -21 h50 M10 -7 h36", { w: "hair", op: 0.5 }), "translate(138 0)") + F(C(-136, -6, 12, 6), "navy", 0.9);
}, { box: [-190, -470, 410, 490], group: "Exploration and invention", label: "Printing press", tags: ["history", "printing press", "printing", "books", "invention", "medieval"], call: 'L.put(S, "hist-printing-press", x, gy, { s, t })' });

reg("hist-gramophone", () => {
  const horn = G(S(P([[0, -10], [-60, -16], [-112, -48], [-150, -76], [-150, 76], [-112, 48], [-60, 16], [0, 10]], true), "gold", { w: "prop" }) + F(P([[-4, -8], [-60, -14], [-110, -44], [-146, -70], [-120, -30], [-60, -6]], true), "white", 0.4) +
    S(C(-150, 0, 22, 76), "gold", { w: "prop", tone: 2 }) + F(C(-152, 0, 10, 56), "ink", 0.25), "translate(-26 -286) rotate(40)");
  return L.shadow(0, 2, 230) + S(R(-80, -26, 28, 26, 4), "wood", { w: "detail", tone: 2 }) + S(R(52, -26, 28, 26, 4), "wood", { w: "detail", tone: 2 }) + S(R(-96, -116, 192, 94, 10), "wood", { w: "prop" }) + K("M-78 -98 H78 V-42 H-78 Z", { c: "brown", w: "hair", op: 0.5 }) + K("M-52 -86 h104 M-52 -74 h104 M-52 -62 h104", { c: "brown", w: "hair", op: 0.45 }) +
    S(R(-104, -136, 208, 24, 8), "wood", { w: "prop", tone: 1 }) + S(C(8, -144, 74, 17), "ink", { w: "prop" }) + K(C(8, -144, 58, 12), { c: "white", w: "hair", op: 0.3 }) + K(C(8, -144, 44, 9), { c: "white", w: "hair", op: 0.3 }) + S(C(8, -144, 20, 5), "red", { w: "hair" }) + F(C(8, -144, 3, 1), "ink") +
    S(L.limb([[56, -150], [52, -200], [10, -250], [-26, -286]], 22, 22), "gold", { w: "prop" }) + horn + S(L.limb([[84, -146], [60, -152], [30, -144]], 8, 6), "gray", { w: "detail" }) + S(C(86, -148, 10, 7), "gold", { w: "detail" }) +
    K("M96 -78 H134 L138 -52", { c: "gray", w: 7 }) + S(C(138, -48, 8), "red", { w: "detail" });
}, { box: [-250, -470, 420, 490], group: "Exploration and invention", label: "Gramophone", tags: ["history", "gramophone", "record player", "music", "horn", "old", "invention"], call: 'L.put(S, "hist-gramophone", x, gy, { s, t })' });

reg("hist-candlestick-phone", () => {
  return L.shadow(0, 2, 130) + S(C(0, -14, 64, 17), "gold", { w: "prop", tone: 2 }) + S(C(0, -26, 64, 17), "gold", { w: "prop" }) + F(C(-18, -30, 36, 7), "white", 0.4) + S(R(-9, -216, 18, 192, 6), "gold", { w: "prop" }) + F(R(-5, -210, 4, 170, 2), "white", 0.5) +
    S(L.limb([[-8, -150], [-34, -152], [-46, -176]], 10, 10), "gold", { w: "detail" }) + S(L.limb([[-52, -108], [-52, -184]], 14, 14), "ink", { w: "prop" }) + S(C(-52, -186, 17, 11), "ink", { w: "prop" }) + S(C(-52, -106, 17, 11), "ink", { w: "prop" }) + F(R(-56, -176, 3, 60, 1), "white", 0.5) +
    K("M-52 -96 q-26 34 14 54 q36 18 30 -6", { c: "ink", w: "detail", op: 0.9 }) +
    S(SM([[-9, -214], [-14, -240], [-42, -266], [42, -266], [14, -240], [9, -214], [-9, -214]]), "gold", { w: "prop" }) + S(C(0, -268, 44, 12), "gold", { w: "prop", tone: 2 }) + F(C(0, -268, 32, 7), "ink", 0.85) + F(SM([[-30, -250], [-36, -264], [-22, -258], [-30, -250]]), "white", 0.5);
}, { box: [-110, -300, 220, 320], group: "Exploration and invention", label: "Candlestick phone", tags: ["history", "telephone", "phone", "old", "invention", "candlestick", "brass"], call: 'L.put(S, "hist-candlestick-phone", x, gy, { s, t })' });

reg("hist-steam-locomotive", (o) => {
  const wheel = (x, y, r) => S(C(x, y, r), "red", { w: "prop" }) + K(C(x, y, r * 0.78), { w: "detail", op: 0.5 }) + Array.from({ length: 8 }, (_, i) => { const a = (i * Math.PI) / 4; return K(L.line([x + Math.cos(a) * r * 0.2, y + Math.sin(a) * r * 0.2], [x + Math.cos(a) * r * 0.78, y + Math.sin(a) * r * 0.78]), { w: "detail" }); }).join("") + S(C(x, y, r * 0.24), "gold", { w: "detail" });
  const sleepers = Array.from({ length: 16 }, (_, i) => F(R(-300 + i * 40, 6, 22, 10, 2), "brown", 0.9)).join("");
  const puffs = o.smoke === false ? "" : [[206, -336, 24], [240, -382, 32], [292, -420, 38]].map(([x, y, r], i) => S(wobble(x, y, r, 9, 3 + i, 0.1), "white", { w: "detail" })).join("");
  return L.shadow(0, 14, 560) + sleepers + S(R(-310, -4, 620, 10, 3), "gray", { w: "detail" }) + puffs +
    S(R(-110, -100, 350, 16, 4), "navy", { w: "prop" }) + S(P([[190, -204], [192, -250], [172, -282], [236, -282], [216, -250], [218, -204]], true), "ink", { w: "prop" }) + S(R(166, -294, 74, 14, 6), "gold", { w: "prop" }) +
    S(R(-90, -208, 300, 112, 42), "blue", { w: "prop" }) + [-20, 60, 140].map((x) => S(R(x, -208, 14, 112, 2), "gold", { w: "detail" })).join("") + S(R(176, -206, 66, 108, 24), "navy", { w: "prop" }) + S(C(220, -152, 26), "gray", { w: "detail" }) + S(C(220, -152, 8), "gold", { w: "hair" }) +
    S(SM([[62, -206], [62, -246], [90, -254], [118, -246], [118, -206]]), "gold", { w: "prop" }) + S(R(38, -228, 10, 22, 3), "gold", { w: "detail" }) + F(R(-70, -198, 230, 10, 5), "white", 0.35) +
    S(R(236, -170, 24, 40, 6), "gold", { w: "detail" }) + F(R(244, -162, 10, 24, 4), "yellow") +
    S(R(-262, -312, 194, 22, 8), "navy", { w: "prop" }) + S(R(-250, -292, 170, 196, 10), "red", { w: "prop" }) + S(R(-224, -262, 78, 70, 12), "glass", { w: "prop" }) + F(R(-216, -254, 16, 54, 6), "white", 0.6) + K("M-185 -262 V-192", { w: "detail", op: 0.8 }) + S(R(-262, -98, 210, 16, 4), "gray", { w: "prop" }) +
    S(P([[240, -40], [296, 2], [240, 2]], true), "gold", { w: "prop" }) + K("M246 -30 L270 2 M246 -14 L258 2", { w: "detail", op: 0.8 }) +
    wheel(-120, -58, 54) + wheel(-10, -58, 54) + wheel(100, -58, 54) + wheel(190, -30, 28) + wheel(240, -30, 28) + S(R(-124, -92, 232, 12, 6), "gray", { w: "prop" }) + [-120, -10, 100].map((x) => S(C(x, -86, 7), "gold", { w: "hair" })).join("");
}, { box: [-320, -480, 700, 510], group: "Exploration and invention", label: "Steam locomotive", tags: ["history", "train", "locomotive", "steam", "railway", "industrial revolution", "engine"], call: 'L.put(S, "hist-steam-locomotive", x, gy, { s, flip, t, smoke: true })', wide: true });

// ---------------------------------------------------------------- Daily life and museum
reg("hist-market-stall", (o) => {
  const basket = (cx, body, fill) => {
    const fr = fill === "grain" ? S(SM([[cx - 38, -134], [cx - 20, -164], [cx, -178], [cx + 20, -164], [cx + 38, -134], [cx - 38, -134]]), "sand", { w: "detail" }) + F(C(cx - 8, -154, 2.5), "brown", 0.5) + F(C(cx + 10, -146, 2.5), "brown", 0.5) + F(C(cx - 18, -140, 2.5), "brown", 0.5)
      : [[-22, -146], [0, -150], [22, -146], [-11, -162], [11, -162], [0, -176]].map(([dx, dy], i) => S(C(cx + dx, dy, 13), fill, { w: "detail" }) + F(C(cx + dx - 4, dy - 4, 3.5), "white", 0.5)).join("");
    return fr + S(P([[cx - 46, -140], [cx + 46, -140], [cx + 38, -108], [cx - 38, -108]], true), body, { w: "prop" }) + K(`M${cx - 42} -128 H${cx + 42} M${cx - 40} -118 H${cx + 40}`, { c: "brown", w: "hair", op: 0.5 }) + K(Array.from({ length: 6 }, (_, i) => `M${cx - 36 + i * 15} -140 l5 32`).join(" "), { c: "brown", w: "hair", op: 0.5 });
  };
  const hang = (x, n, c, len) => K(`M${x} -370 V${-370 + len}`, { c: "brown", w: "hair" }) + Array.from({ length: n }, (_, i) => S(C(x + (i % 2 ? 6 : -6), -370 + len - 10 - i * 20, 11, 13), c, { w: "detail" })).join("");
  const stripes = Array.from({ length: 8 }, (_, i) => { const xa = -225 + i * 56.25, xb = xa + 56.25, ta = -200 + i * 50, tb = ta + 50, col = i % 2 ? "cream" : "red"; return S(P([[ta, -470], [tb, -470], [xb, -390], [xa, -390]], true), col, { w: "detail" }) + S(`M${xa} -390 A28.1 24 0 0 0 ${xb} -390 Z`, col, { w: "detail" }); }).join("");
  const who = o.who === false ? "" : L.inline("person", { style: o.style || "man04", outfit: o.outfit || "act-apron", face: "happy", pose: "wave", s: 0.56, skin: o.skin || "s3", hair: "short" });
  return L.shadow(0, 2, 480) + S(R(-196, -470, 20, 470, 4), "wood", { w: "prop", tone: 2 }) + S(R(176, -470, 20, 470, 4), "wood", { w: "prop", tone: 2 }) + G(who, "translate(0 -120)") +
    S(R(-206, -176, 412, 176, 10), "wood", { w: "prop" }) + K("M-206 -126 H206 M-206 -76 H206", { c: "brown", w: "hair", op: 0.45 }) + S(R(-216, -190, 432, 20, 6), "wood", { w: "prop", tone: 1 }) +
    G(basket(-140, "wood", "red") + basket(-46, "wood", "orange") + basket(48, "wood", "green") + basket(140, "wood", "grain"), "translate(0 -42)") +
    stripes + hang(-100, 3, "cream", 80) + hang(110, 3, "purple", 70);
}, { box: [-240, -490, 480, 510], group: "Daily life and museum", label: "Market stall with baskets", tags: ["history", "market", "stall", "shop", "baskets", "trade", "ancient", "merchant"], call: 'L.put(S, "hist-market-stall", x, gy, { s, t, who: true, style: "man04", outfit: "act-apron", skin: "s3" })', demo: {} });

const ITEM_AT = { amphora: ["hist-amphora", 0.6, 0], axe: ["hist-hand-axe", 0.5, 0], tablet: ["hist-clay-tablet", 0.7, 0], coins: ["hist-coins", 0.8, 0], scroll: ["hist-scroll", 0.6, 0], lamp: ["hist-oil-lamp", 0.8, 0] };
reg("hist-display-case", (o) => {
  const it = ITEM_AT[o.item === undefined ? "amphora" : o.item], lift = o.item === "axe" || o.item === "tablet" || o.item === "scroll" || o.item === "lamp" ? 78 : 0;
  const inside = it ? G(L.inline(it[0]), `translate(0 ${lift ? -134 : -92}) scale(${it[1]})`) : "";
  const glass = F(R(-122, -270, 244, 176, 8), "glass", 0.42) + F(P([[-100, -262], [-60, -262], [-110, -150]], true), "white", 0.5) + F(P([[-40, -262], [-26, -262], [-76, -110]], true), "white", 0.4) + K(R(-124, -272, 248, 180, 8), { w: "prop" });
  const label = S(R(-90, -58, 180, 40, 5), "cream", { w: "detail" }) + L.text(o.label || "ANCIENT JAR", 0, -31, { size: 21 });
  return L.shadow(0, 2, 290) + S(R(-136, -96, 272, 96, 8), "wood", { w: "prop" }) + S(R(-142, -102, 284, 14, 6), "wood", { w: "prop", tone: 1 }) + S(R(-100, -122, 200, 24, 8), "red", { w: "detail", tone: 2 }) + inside + glass + [-124, 124].map((x) => S(R(x - 5, -276, 10, 188, 3), "gray", { w: "detail" })).join("") + S(R(-130, -282, 260, 14, 6), "gray", { w: "prop" }) + label;
}, { box: [-170, -300, 340, 320], group: "Daily life and museum", label: "Museum display case with label", tags: ["history", "museum", "display case", "exhibit", "label", "glass", "artefact"], call: 'L.put(S, "hist-display-case", x, gy, { s, t, item: "amphora|axe|tablet|coins|scroll|lamp|none", label: "ANCIENT JAR" })', demo: {} });

reg("hist-board-game-ur", (o) => {
  const cells = [], rose = new Set(["0,0", "0,2", "3,1", "6,0", "6,2"]);
  for (let c = 0; c < 8; c++) for (let r = 0; r < 3; r++) { if ((c === 4 || c === 5) && r !== 1) continue; cells.push([c, r]); }
  const sq = cells.map(([c, r]) => { const x = -200 + c * 50, y = -75 + r * 50, isRose = rose.has(`${c},${r}`); return S(R(x + 3, y + 3, 44, 44, 6), (c + r) % 2 ? "teal" : "cream", { w: "detail" }) + (isRose ? S(L.star(x + 25, y + 25, 19, 9, 8), "red", { w: "hair" }) + F(C(x + 25, y + 25, 4), "gold") : (c * 7 + r * 3) % 3 === 0 ? [[-8, -8], [8, -8], [-8, 8], [8, 8]].map(([dx, dy]) => F(C(x + 25 + dx, y + 25 + dy, 3.2), "navy", 0.6)).join("") : K(`M${x + 12} ${y + 25} H${x + 38} M${x + 25} ${y + 12} V${y + 38}`, { c: "navy", w: "hair", op: 0.35 })); }).join("");
  const piece = (c, r, col, dx = 0) => { const x = -200 + c * 50 + 25 + dx, y = -75 + r * 50 + 25; return S(C(x, y, 17), col, { w: "detail" }) + K(C(x, y, 10), { w: "hair", op: 0.4 }) + F(C(x - 5, y - 6, 4), "white", 0.5); };
  const die = (x, y, rot, dot) => G(S(P([[0, -20], [18, 14], [-18, 14]], true), "paper", { w: "detail" }) + (dot ? F(C(0, -12, 4), "red") : ""), `translate(${x} ${y}) rotate(${rot})`);
  return L.shadow(0, 100, 440) + S(R(-218, -98, 436, 196, 18), "wood", { w: "prop" }) + K("M-210 -90 H210 V90 H-210 Z", { c: "brown", w: "hair", op: 0.4 }) + sq + piece(1, 0, "paper") + piece(2, 2, "paper") + piece(5, 1, "paper") + piece(0, 1, "navy") + piece(3, 0, "navy") + piece(6, 1, "navy") +
    die(-60, 146, -10, true) + die(0, 142, 14, false) + die(60, 148, -4, true) + die(120, 144, 20, false);
}, { box: [-240, -120, 480, 300], group: "Daily life and museum", label: "Ancient board game (Ur-style)", tags: ["history", "board game", "game", "ur", "ancient", "dice", "play"], call: 'L.put(S, "hist-board-game-ur", x, y, { s, t })', wide: true });

// ---- END ----
})();
