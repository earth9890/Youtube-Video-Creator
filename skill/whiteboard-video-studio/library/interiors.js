// ===================== library/interiors.js — rooms (light/dark) + furniture =====================
// 20 full rooms x {light, dark} (name "room-<kind>-light|dark", box 1920x1080, origin top-left; floor line ~y 860 for characters)
// and ~40 furniture pieces ("furn-<name>", origin = bottom centre of the piece; floor items stand on y = 0).
// Rooms are one-point perspective (vanishing point 960,405): back wall, side walls, ceiling, floor boards/tiles converging.
// Dark = the whole room is graded (colour-matrix, blue/dim) and lamp glows, window moon/sky and screens are drawn on top, unfiltered.
(function () {
const L = window.L, f1 = L.f1;
let gid = 0, GL = null, DARK = false;
const TR = []; // transform stack: glow/emit inside furniture lands in the room's top layer at the right place
const dk = (o) => o.time === "dark" || o.time === "night";
const sh = (d, c, o) => L.shape(d, c, Object.assign({ w: "prop" }, o));
const rr = (x, y, w, h, c, o, r = 12) => sh(L.rrect(x, y, w, h, r), c, o);
const bx = (x, y, w, h, c, o) => sh(L.rect(x, y, w, h), c, o);
const cr = (cx, cy, r, c, o, ry) => sh(L.circ(cx, cy, r, ry), c, o);
const fl = (d, c, op) => L.flat(d, c, op);
const ln = (a, b, o) => L.stroke(L.line(a, b), o);
const D = { w: "detail", flat: true }; // small flat details
const COLS = ["red", "blue", "green", "yellow", "orange", "purple", "teal", "pink"];
// gradient fill without outline (walls, floors, glass); falls back to flat when the look is flat/cel
const gp = (d, name, t0, t1, dir = "v") => {
  if (L.T.shade !== "grad") return L.tag("path", { d, fill: L.c(name, t0) });
  const id = "intg" + ++gid;
  return `<defs><linearGradient id="${id}" x1="0" y1="0" x2="${dir === "h" ? 1 : 0}" y2="${dir === "h" ? 0 : 1}"><stop offset="0" stop-color="${L.c(name, t0)}"/><stop offset="1" stop-color="${L.c(name, t1)}"/></linearGradient></defs>` + L.tag("path", { d, fill: `url(#${id})` });
};
const glowMk = (cx, cy, r, c = "yellow", op = 0.5) => {
  const id = "intg" + ++gid;
  return `<defs><radialGradient id="${id}"><stop offset="0" stop-color="${L.c(c, 1)}" stop-opacity="${op}"/><stop offset="1" stop-color="${L.c(c, 0)}" stop-opacity="0"/></radialGradient></defs>` + L.tag("circle", { cx, cy, r, fill: `url(#${id})` });
};
// emit(markup): in a dark room, draw this on the room's top (unfiltered) layer at the current piece transform; else inline
const emit = (m) => (GL && DARK ? (GL.push(TR.length ? `<g transform="${TR.join(" ")}">${m}</g>` : m), "") : m);
const at = (name, x, y, s = 1, o = {}) => {
  const t = `translate(${f1(x)} ${f1(y)}) scale(${o.flip ? -s : s} ${s})`;
  TR.push(t);
  try { return L.g(L.inline(name, Object.assign({ time: DARK ? "dark" : "light" }, o)), t); } finally { TR.pop(); }
};
const leaf = (x, y, len, w, ang, c) => L.g(sh(`M0 0 Q${len * 0.5} ${-w} ${len} 0 Q${len * 0.5} ${w} 0 0 Z`, c, { w: "detail" }), `translate(${f1(x)} ${f1(y)}) rotate(${ang})`);

// ---------------------------------------------------------------- furniture
const furn = (name, label, fn, box, tags = [], demo = {}) => L.reg("interiors", "furn-" + name, fn, { box, group: "Furniture", label: "Furniture · " + label, tags: ["furniture", "interior", "room", ...tags], demo, call: `L.put(S, "furn-${name}", x, floorY, { s: 1, t })` });

furn("bed", "Bed", (o) => {
  const c = o.c || "blue";
  return L.shadow(0, 0, 400) + rr(-165, -205, 330, 200, "wood", {}, 16) + rr(-125, -165, 100, 56, "white", { w: "detail" }, 24) + rr(25, -165, 100, 56, "white", { w: "detail" }, 24)
    + rr(-172, -150, 344, 104, c, {}, 18) + fl(L.rrect(-172, -150, 344, 30, 18), "white", 0.35) + fl(L.rrect(-150, -92, 300, 10, 5), "white", 0.25) + rr(-180, -72, 360, 72, "wood", { tone: 1 }, 14);
}, [-230, -230, 460, 250], ["bed", "bedroom", "sleep"]);

furn("sofa", "Sofa", (o) => {
  const c = o.c || "red";
  return L.shadow(0, 0, 440) + rr(-175, -165, 350, 125, c, {}, 32) + rr(-205, -125, 62, 116, c, { tone: 2 }, 26) + rr(143, -125, 62, 116, c, { tone: 2 }, 26)
    + rr(-148, -100, 148, 62, c, { tone: 1 }, 18) + rr(0, -100, 148, 62, c, { tone: 1 }, 18) + rr(-176, -48, 352, 38, c, { tone: 2 }, 12)
    + bx(-168, -12, 22, 12, "wood") + bx(146, -12, 22, 12, "wood") + rr(-140, -156, 56, 58, "yellow", { w: "detail" }, 16);
}, [-240, -200, 480, 220], ["sofa", "couch", "living room"]);

furn("armchair", "Armchair", (o) => {
  const c = o.c || "orange";
  return L.shadow(0, 0, 220) + rr(-76, -165, 152, 135, c, {}, 30) + rr(-102, -105, 42, 98, c, { tone: 2 }, 20) + rr(60, -105, 42, 98, c, { tone: 2 }, 20)
    + rr(-60, -88, 120, 56, c, { tone: 1 }, 16) + rr(-76, -42, 152, 32, c, { tone: 2 }, 10) + bx(-70, -12, 18, 12, "wood") + bx(52, -12, 18, 12, "wood");
}, [-130, -190, 260, 210], ["chair", "armchair", "living room"]);

furn("dining-table", "Dining table", (o) => {
  return L.shadow(0, 0, 380) + bx(-155, -100, 20, 100, "wood", { tone: 2 }) + bx(135, -100, 20, 100, "wood", { tone: 2 }) + rr(-155, -118, 310, 20, "wood", { tone: 2 }, 6)
    + rr(-178, -142, 356, 28, "wood", {}, 12) + cr(-12, -176, 14, "red", { w: "detail", flat: true }) + cr(14, -174, 13, "yellow", { w: "detail", flat: true }) + cr(2, -188, 13, "green", { w: "detail", flat: true })
    + sh("M-42 -164 H42 Q36 -142 0 -142 Q-36 -142 -42 -164 Z", "teal", { w: "detail" });
}, [-210, -230, 420, 250], ["table", "dining", "kitchen"]);

furn("desk", "Desk", (o) => {
  return L.shadow(0, 0, 360) + bx(-146, -112, 16, 112, "wood", { tone: 2 }) + rr(48, -114, 106, 114, "wood", { tone: 1 }, 8) + rr(-160, -138, 320, 24, "wood", {}, 10)
    + rr(58, -104, 86, 42, "wood", { tone: 2, flat: true, w: "hair" }, 6) + rr(58, -56, 86, 42, "wood", { tone: 2, flat: true, w: "hair" }, 6) + cr(101, -83, 5, "gold", D) + cr(101, -35, 5, "gold", D);
}, [-190, -170, 380, 190], ["desk", "office", "study"]);

furn("computer", "Computer monitor", (o) => {
  const dark = dk(o);
  return L.shadow(0, 0, 130) + rr(-34, -8, 68, 8, "gray", {}, 4) + bx(-8, -34, 16, 28, "gray", { tone: 2 }) + rr(-74, -132, 148, 100, "ink", { tone: 1 }, 12)
    + gp(L.rrect(-64, -122, 128, 80, 6), "sky", dark ? 0 : 1, dark ? 2 : 0) + fl(L.rrect(-54, -112, 50, 8, 3), "white", 0.8) + fl(L.rrect(-54, -96, 108, 6, 3), "white", 0.5) + fl(L.rrect(-54, -84, 90, 6, 3), "white", 0.5) + fl(L.rrect(-54, -72, 70, 6, 3), "white", 0.5)
    + rr(-54, -10, 108, 12, "white", { w: "detail" }, 5) + (dark ? emit(glowMk(0, -80, 200, "sky", 0.4)) : "");
}, [-120, -150, 240, 170], ["computer", "monitor", "screen", "office"]);

furn("office-chair", "Office chair", (o) => {
  const c = o.c || "blue";
  return L.shadow(0, 0, 140) + ln([-58, -16], [58, -16], { c: "ink", w: 10 }) + ln([-58, -16], [58, -16], { c: "gray", w: 5 }) + cr(-58, -8, 8, "ink", D) + cr(58, -8, 8, "ink", D) + cr(0, -6, 8, "ink", D)
    + bx(-6, -86, 12, 70, "gray", { tone: 2 }) + rr(-52, -108, 104, 28, c, { tone: 1 }, 14) + rr(-44, -214, 88, 112, c, {}, 28) + fl(L.rrect(-34, -204, 20, 90, 10), "white", 0.25);
}, [-90, -230, 180, 250], ["chair", "office", "desk chair"]);

furn("bookshelf", "Bookshelf", (o) => {
  const W = o.w || 180, H = o.h || 300, rows = 4, rh = (H - 22) / rows, r = L.rng(o.seed || 7), goods = o.kind === "goods";
  let s = L.shadow(0, 0, W + 30) + rr(-W / 2, -H, W, H, "wood", {}, 10) + bx(-W / 2 + 10, -H + 10, W - 20, H - 20, "wood", { tone: 2, flat: true, w: "hair" });
  for (let k = 0; k < rows; k++) {
    const base = -H + 11 + (k + 1) * rh - 8; let x = -W / 2 + 14;
    while (x < W / 2 - 28) {
      if (goods) {
        const w = 18 + r() * 10, h = 26 + r() * 16, c = COLS[Math.floor(r() * 8)];
        s += r() < 0.5 ? rr(x, base - h, w, h, c, D, 5) : cr(x + w / 2, base - w / 2 - 4, w / 2 + 2, c, D);
        x += w + 5;
      } else {
        const w = 14 + r() * 12, h = 36 + r() * 22, c = COLS[Math.floor(r() * 8)];
        s += bx(x, base - h, w, h, c, D); x += w + 1 + (r() < 0.15 ? 12 : 0);
      }
    }
    s += bx(-W / 2 + 8, base, W - 16, 9, "wood", { w: "hair", tone: 1 });
  }
  return s;
}, [-120, -330, 240, 350], ["bookshelf", "books", "shelf", "library"]);

furn("wardrobe", "Wardrobe", (o) => {
  const c = o.c || "wood";
  return L.shadow(0, 0, 240) + bx(-88, -22, 20, 22, c, { tone: 2 }) + bx(68, -22, 20, 22, c, { tone: 2 }) + rr(-100, -330, 200, 312, c, {}, 12) + rr(-110, -346, 220, 20, c, { tone: 1 }, 8)
    + rr(-88, -308, 78, 130, c, { tone: 2, flat: true, w: "hair" }, 8) + rr(10, -308, 78, 130, c, { tone: 2, flat: true, w: "hair" }, 8) + rr(-88, -164, 78, 130, c, { tone: 2, flat: true, w: "hair" }, 8) + rr(10, -164, 78, 130, c, { tone: 2, flat: true, w: "hair" }, 8)
    + ln([0, -326], [0, -20], { w: "detail" }) + cr(-16, -170, 6, "gold", D) + cr(16, -170, 6, "gold", D);
}, [-130, -360, 260, 380], ["wardrobe", "closet", "bedroom"]);

furn("fridge", "Fridge", (o) => {
  const c = o.c || "teal";
  return L.shadow(0, 0, 170) + bx(-52, -14, 16, 14, "gray") + bx(36, -14, 16, 14, "gray") + rr(-64, -292, 128, 282, c, {}, 20) + ln([-62, -200], [62, -200], { w: "detail" })
    + rr(36, -266, 10, 50, "gray", D, 5) + rr(36, -186, 10, 76, "gray", D, 5) + rr(-44, -250, 34, 40, "white", D, 3) + ln([-38, -238], [-16, -238], { w: "hair", op: 0.6 }) + ln([-38, -226], [-22, -226], { w: "hair", op: 0.6 }) + cr(-27, -254, 5, "red", D) + cr(-4, -140, 5, "yellow", D);
}, [-100, -310, 200, 330], ["fridge", "kitchen", "refrigerator"]);

furn("stove", "Stove", (o) => {
  return L.shadow(0, 0, 200) + rr(-80, -118, 160, 118, "gray", {}, 10) + rr(-82, -130, 164, 16, "stone", { tone: 1 }, 6) + fl(L.circ(-40, -126, 22, 4), "ink", 0.7) + fl(L.circ(40, -126, 22, 4), "ink", 0.7)
    + rr(-62, -92, 124, 70, "ink", { tone: 1 }, 8) + rr(-52, -84, 104, 48, "glass", { tone: 2, flat: true, w: "hair" }, 6) + ln([-46, -26], [46, -26], { c: "gray", w: 7 })
    + cr(-50, -108, 5, "red", D) + cr(-25, -108, 5, "gray", D) + cr(25, -108, 5, "gray", D) + cr(50, -108, 5, "red", D)
    + rr(-62, -172, 64, 42, "red", { w: "detail" }, 8) + rr(-72, -164, 10, 10, "ink", D, 4) + rr(2, -168, 12, 8, "ink", D, 4);
}, [-110, -190, 220, 210], ["stove", "oven", "kitchen", "cooker"]);

furn("sink", "Kitchen sink", (o) => {
  const c = o.c || "teal";
  return L.shadow(0, 0, 250) + rr(-112, -112, 224, 112, c, {}, 8) + rr(-122, -128, 244, 18, "stone", { tone: 1 }, 6) + rr(-50, -126, 100, 10, "gray", { tone: 2, flat: true, w: "hair" }, 4)
    + ln([-54, -112], [-54, -14], { w: "hair", op: 0.6 }) + ln([0, -112], [0, -14], { w: "hair", op: 0.6 }) + ln([54, -112], [54, -14], { w: "hair", op: 0.6 })
    + cr(-44, -62, 5, "gold", D) + cr(44, -62, 5, "gold", D) + L.stroke(L.smooth([[0, -128], [0, -176], [14, -190], [34, -184], [34, -162]]), { c: "gray", w: 10 }) + cr(-18, -134, 6, "red", D) + cr(18, -134, 6, "blue", D);
}, [-140, -210, 280, 230], ["sink", "kitchen", "tap"]);

furn("kitchen-counter", "Kitchen counter", (o) => {
  const c = o.c || "teal";
  return L.shadow(0, 0, 250) + rr(-112, -112, 224, 112, c, {}, 8) + rr(-122, -128, 244, 18, "stone", { tone: 1 }, 6) + ln([0, -112], [0, -14], { w: "hair", op: 0.6 })
    + rr(-96, -98, 86, 80, c, { tone: 2, flat: true, w: "hair" }, 6) + rr(10, -98, 86, 80, c, { tone: 2, flat: true, w: "hair" }, 6) + cr(-14, -62, 5, "gold", D) + cr(14, -62, 5, "gold", D)
    + rr(40, -162, 56, 34, "red", { w: "detail" }, 10) + rr(-70, -150, 42, 22, "yellow", { w: "detail" }, 8);
}, [-140, -190, 280, 210], ["counter", "kitchen", "cabinet"]);

furn("wall-cabinet", "Wall cabinet", (o) => {
  const c = o.c || "wood";
  return rr(-104, -118, 208, 118, c, {}, 10) + ln([0, -114], [0, -4], { w: "hair", op: 0.6 }) + rr(-92, -106, 86, 94, c, { tone: 2, flat: true, w: "hair" }, 6) + rr(6, -106, 86, 94, c, { tone: 2, flat: true, w: "hair" }, 6) + cr(-14, -50, 5, "gold", D) + cr(14, -50, 5, "gold", D);
}, [-120, -140, 240, 160], ["cabinet", "kitchen", "wall"]);

furn("bathtub", "Bathtub", (o) => {
  return L.shadow(0, 0, 330) + cr(-110, -8, 12, "gold", D) + cr(110, -8, 12, "gold", D) + rr(-134, -96, 268, 86, "white", {}, 36) + fl(L.rrect(-120, -88, 240, 20, 10), "water", 0.18)
    + rr(-142, -110, 284, 24, "white", { tone: 1 }, 12) + rr(-130, -116, 260, 14, "water", { w: "detail", flat: true }, 7) + cr(-64, -128, 16, "glass", { w: "detail", tone: 2 }) + cr(-36, -140, 11, "glass", { w: "detail", tone: 2 }) + cr(-82, -148, 9, "glass", { w: "detail", tone: 2 }) + cr(-20, -124, 8, "glass", { w: "detail", tone: 2 })
    + cr(70, -126, 20, "yellow", { w: "detail" }) + cr(86, -134, 12, "yellow", { w: "detail" }) + sh("M96 -134 L110 -130 L96 -126 Z", "orange", { w: "hair" })
    + L.stroke(L.smooth([[118, -110], [118, -160], [100, -176], [84, -166]]), { c: "gray", w: 9 }) + cr(124, -150, 6, "gold", D);
}, [-170, -190, 340, 210], ["bathtub", "bath", "bathroom"]);

furn("toilet", "Toilet", (o) => {
  return L.shadow(0, 0, 130) + rr(-30, -62, 60, 62, "white", { tone: 2 }, 18) + rr(-42, -160, 84, 70, "white", {}, 14) + rr(-48, -168, 96, 16, "white", { tone: 1 }, 8) + cr(0, -178, 6, "gold", D)
    + sh(`M-58 -104 Q-58 -84 -40 -76 Q0 -66 40 -76 Q58 -84 58 -104 Z`, "white", {}) + sh(L.circ(0, -104, 54, 11), "white", { tone: 1 }) + fl(L.circ(0, -104, 40, 7), "water", 0.25);
}, [-90, -200, 180, 220], ["toilet", "bathroom", "wc"]);

furn("tv-stand", "TV stand", (o) => {
  const tv = o.tv !== false, dark = dk(o);
  let s = L.shadow(0, 0, 300);
  if (tv) s += bx(-26, -92, 52, 22, "ink", { tone: 1 }) + rr(-116, -226, 232, 140, "ink", { tone: 1 }, 12) + gp(L.rrect(-106, -216, 212, 120, 6), "sky", 1, 0) + fl("M-106 -130 Q-60 -170 -10 -140 T106 -140 V-96 H-106 Z", "grass", 1) + cr(50, -186, 14, "yellow", D) + fl("M-106 -216 L-30 -216 L-106 -140 Z", "white", 0.14) + (dark ? emit(glowMk(0, -156, 260, "sky", 0.4)) : "");
  return s + rr(-140, -76, 280, 76, "wood", {}, 10) + ln([0, -72], [0, -6], { w: "hair", op: 0.6 }) + rr(-128, -64, 120, 52, "wood", { tone: 2, flat: true, w: "hair" }, 6) + rr(8, -64, 120, 52, "wood", { tone: 2, flat: true, w: "hair" }, 6) + cr(-18, -38, 5, "gold", D) + cr(18, -38, 5, "gold", D);
}, [-160, -250, 320, 270], ["tv", "television", "stand", "living room"]);

furn("lamp", "Floor lamp", (o) => {
  const dark = dk(o);
  return (dark ? emit(glowMk(0, -200, 340, "yellow", 0.55) + `<path d="M-52 -180 L-170 20 H170 L52 -180 Z" fill="${L.c("yellow", 1)}" opacity="0.10"/>`) : "") + L.shadow(0, 0, 110) + cr(0, -8, 34, "gray", {}, 9) + bx(-5, -190, 10, 184, "gold", { tone: 2 })
    + sh("M-42 -262 H42 L64 -190 H-64 Z", "yellow", { tone: 1 }) + fl("M-30 -256 H-6 L-18 -196 H-50 Z", "white", 0.3);
}, [-100, -290, 200, 310], ["lamp", "light", "floor lamp"]);

furn("table-lamp", "Table lamp", (o) => {
  const dark = dk(o);
  return (dark ? emit(glowMk(0, -70, 200, "yellow", 0.55)) : "") + rr(-22, -12, 44, 12, "gray", {}, 5) + bx(-4, -50, 8, 40, "gold", { tone: 2 }) + cr(0, -38, 14, "gold", { w: "detail" }) + sh("M-30 -100 H30 L42 -52 H-42 Z", "yellow", { tone: 1 }) + fl("M-22 -96 H-6 L-14 -56 H-34 Z", "white", 0.3);
}, [-70, -120, 140, 140], ["lamp", "light", "table lamp"]);

furn("nightstand", "Nightstand", (o) => L.shadow(0, 0, 130) + rr(-52, -102, 104, 102, "wood", {}, 8) + rr(-60, -112, 120, 14, "wood", { tone: 1 }, 6) + rr(-42, -90, 84, 34, "wood", { tone: 2, flat: true, w: "hair" }, 5) + rr(-42, -50, 84, 34, "wood", { tone: 2, flat: true, w: "hair" }, 5) + cr(0, -73, 5, "gold", D) + cr(0, -33, 5, "gold", D), [-80, -125, 160, 145], ["nightstand", "bedroom", "table"]);

furn("dining-chair", "Dining chair", (o) => {
  const c = o.c || "red";
  return L.shadow(0, 0, 90) + bx(-34, -54, 10, 54, "wood", { tone: 2 }) + bx(24, -54, 10, 54, "wood", { tone: 2 }) + rr(-34, -150, 68, 90, "wood", {}, 10) + fl(L.rrect(-24, -138, 14, 66, 6), "ink", 0.35) + fl(L.rrect(10, -138, 14, 66, 6), "ink", 0.35) + rr(-40, -74, 80, 22, c, { tone: 1 }, 10);
}, [-60, -170, 120, 190], ["chair", "dining", "kitchen"]);

furn("plant", "Plant in pot", (o) => {
  const c = o.c || "orange", n = o.n || 7, r = L.rng(o.seed || 4);
  let s = L.shadow(0, 0, 100);
  for (let i = 0; i < n; i++) { const a = -150 + (i * 120) / (n - 1) + (r() - 0.5) * 18; s += leaf(0, -64, 70 + r() * 40, 16 + r() * 8, a, i % 3 ? "green" : "teal"); }
  return s + sh("M-38 -74 H38 L28 0 H-28 Z", c, {}) + rr(-44, -88, 88, 20, c, { tone: 1 }, 8);
}, [-110, -190, 220, 210], ["plant", "pot", "leaves", "decor"]);

furn("window", "Window", (o) => {
  const W = o.w || 220, H = o.h || 260, dark = dk(o), r = L.rng(o.seed || 3);
  let glass;
  if (dark) {
    glass = gp(L.rect(-W / 2, -H, W, H), "night", 2, 0);
    for (let i = 0; i < 9; i++) glass += L.tag("circle", { cx: -W / 2 + 10 + r() * (W - 20), cy: -H + 10 + r() * H * 0.6, r: 1.8 + r() * 2, fill: L.c("cream"), opacity: 0.9 });
    glass += L.tag("path", { d: "M0 -34 A34 34 0 0 0 0 34 A20 34 0 0 1 0 -34 Z", fill: L.c("cream"), transform: `translate(${f1(W * 0.2)} ${f1(-H * 0.68)}) rotate(-20)` });
  } else {
    glass = gp(L.rect(-W / 2, -H, W, H), "sky", 2, 1) + L.tag("circle", { cx: -W * 0.22, cy: -H * 0.76, r: 24, fill: L.c("yellow") }) + L.tag("path", { d: `M${-W / 2} 0 V${-H * 0.2} Q${-W * 0.2} ${-H * 0.34} 0 ${-H * 0.2} T${W / 2} ${-H * 0.22} V0 Z`, fill: L.c("grass") })
      + [[W * 0.18, -H * 0.66, 20], [W * 0.18 + 22, -H * 0.62, 17], [W * 0.18 - 22, -H * 0.62, 16]].map(([x, y, rad]) => L.tag("circle", { cx: x, cy: y, r: rad, fill: L.c("white") })).join("");
  }
  glass += L.stroke(`M0 ${-H} V0 M${-W / 2} ${-H / 2} H${W / 2}`, { c: "white", w: 9 });
  let cur = "";
  if (o.curtains) {
    const t = dark ? 2 : 0;
    cur = sh(L.rrect(-W / 2 - 36, -H - 20, 72, H + 34, 14), o.curtains, { tone: t }) + sh(L.rrect(W / 2 - 36, -H - 20, 72, H + 34, 14), o.curtains, { tone: t })
      + L.stroke(`M${-W / 2 - 14} ${-H - 12} V${H * -0.05} M${-W / 2 + 10} ${-H - 12} V${H * -0.05} M${W / 2 - 10} ${-H - 12} V${H * -0.05} M${W / 2 + 14} ${-H - 12} V${H * -0.05}`, { c: o.curtains, w: 3, op: 0.5 });
  }
  return rr(-W / 2 - 14, -H - 14, W + 28, H + 28, "white", {}, 10) + rr(-W / 2 - 30, 8, W + 60, 16, "white", { tone: 2 }, 6) + emit(glass + cur)
    + (o.curtains ? ln([-W / 2 - 54, -H - 26], [W / 2 + 54, -H - 26], { c: "gold", w: 8 }) : "");
}, [-190, -340, 380, 390], ["window", "glass", "curtain"]);

furn("porthole", "Porthole (space)", (o) => {
  const r = o.r || 120, R = L.rng(o.seed || 9);
  let g = L.tag("circle", { cx: 0, cy: -r, r: r - 12, fill: L.c("navy", 2) });
  for (let i = 0; i < 14; i++) g += L.tag("circle", { cx: (R() - 0.5) * 2 * (r - 24), cy: -r + (R() - 0.5) * 2 * (r - 24), r: 1.5 + R() * 2, fill: L.c("cream"), opacity: 0.9 });
  g += L.tag("circle", { cx: -r * 0.2, cy: -r * 0.55, r: r * 0.42, fill: L.c("blue") }) + L.tag("path", { d: `M${-r * 0.5} ${-r * 0.55} q${r * 0.12} ${-r * 0.2} ${r * 0.3} ${-r * 0.12} q${-r * 0.05} ${r * 0.15} ${-r * 0.1} ${r * 0.3} z`, fill: L.c("green") }) + L.tag("circle", { cx: r * 0.35, cy: -r * 1.35 + r * 1.0, r: 6, fill: L.c("white") });
  return cr(0, -r, r, "gray", {}) + emit(g) + L.stroke(L.circ(0, -r, r - 12), { c: "ink", w: 4 }) + [0, 1, 2, 3, 4, 5, 6, 7].map((i) => cr(Math.cos(i * 0.785) * (r - 5), -r + Math.sin(i * 0.785) * (r - 5), 3.5, "stone", D)).join("");
}, [-150, -270, 300, 300], ["window", "porthole", "space", "spaceship"]);

furn("door", "Door", (o) => {
  const c = o.c || "wood";
  return rr(-72, -346, 144, 346, "white", {}, 8) + rr(-58, -330, 116, 330, c, {}, 6) + rr(-42, -310, 84, 124, c, { tone: 2, flat: true, w: "hair" }, 6) + rr(-42, -168, 84, 138, c, { tone: 2, flat: true, w: "hair" }, 6) + cr(38, -170, 8, "gold", { w: "detail" });
}, [-90, -365, 180, 380], ["door", "entrance", "exit"]);

furn("clock", "Wall clock", (o) => {
  const h = o.hour === undefined ? 10 : o.hour, m = o.min === undefined ? 10 : o.min, R = 50, C = [0, -R];
  const hand = (a, len, w) => ln(C, [Math.sin(a) * len, -R - Math.cos(a) * len], { w });
  let s = cr(0, -R, R + 6, "gold", {}) + cr(0, -R, R - 4, "cream", { w: "detail" });
  for (let i = 0; i < 12; i++) { const a = (i * Math.PI) / 6; s += ln([Math.sin(a) * (R - 10), -R - Math.cos(a) * (R - 10)], [Math.sin(a) * (R - 16), -R - Math.cos(a) * (R - 16)], { w: 3 }); }
  return s + hand(((h % 12) + m / 60) * (Math.PI / 6), 22, 6) + hand(m * (Math.PI / 30), 32, 4) + cr(0, -R, 4, "ink", D);
}, [-70, -120, 140, 140], ["clock", "time", "wall"]);

furn("picture", "Picture frame", (o) => {
  const W = o.w || 140, H = o.h || 110, k = o.kind || "hills", x0 = -W / 2 + 12, y0 = -H + 12, iw = W - 24, ih = H - 24;
  let art;
  if (k === "mirror") art = gp(L.rect(x0, y0, iw, ih), "glass", 1, 2) + L.stroke(`M${x0 + iw * 0.2} ${y0 + ih * 0.5} L${x0 + iw * 0.5} ${y0 + 6} M${x0 + iw * 0.45} ${y0 + ih * 0.85} L${x0 + iw * 0.85} ${y0 + 8}`, { c: "white", w: 8, op: 0.7 });
  else if (k === "tv") art = gp(L.rect(x0, y0, iw, ih), "navy", 1, 2) + fl(`M${x0} ${y0} h${iw * 0.4} L${x0} ${y0 + ih * 0.5} Z`, "white", 0.12);
  else if (k === "abstract") art = gp(L.rect(x0, y0, iw, ih), "cream", 1, 0) + L.tag("circle", { cx: x0 + iw * 0.35, cy: y0 + ih * 0.5, r: ih * 0.28, fill: L.c("orange") }) + L.tag("path", { d: `M${x0 + iw * 0.5} ${y0 + ih} L${x0 + iw * 0.75} ${y0 + ih * 0.2} L${x0 + iw} ${y0 + ih} Z`, fill: L.c("teal") }) + L.tag("circle", { cx: x0 + iw * 0.8, cy: y0 + ih * 0.25, r: ih * 0.12, fill: L.c("pink") });
  else art = gp(L.rect(x0, y0, iw, ih), "sky", 2, 1) + L.tag("circle", { cx: x0 + iw * 0.75, cy: y0 + ih * 0.3, r: ih * 0.14, fill: L.c("yellow") }) + L.tag("path", { d: `M${x0} ${y0 + ih} V${y0 + ih * 0.62} Q${x0 + iw * 0.3} ${y0 + ih * 0.3} ${x0 + iw * 0.55} ${y0 + ih * 0.62} T${x0 + iw} ${y0 + ih * 0.55} V${y0 + ih} Z`, fill: L.c("grass") });
  return L.g(rr(-W / 2, -H, W, H, k === "tv" ? "ink" : "wood", {}, 8) + (k === "tv" ? "" : bx(x0 - 2, y0 - 2, iw + 4, ih + 4, "cream", { w: "hair", flat: true })) + art + L.tag("rect", { x: x0, y: y0, width: iw, height: ih, fill: "none", stroke: L.c("ink"), "stroke-width": L.lw("hair"), opacity: 0.6 }));
}, [-90, -130, 180, 150], ["picture", "frame", "art", "mirror", "tv", "wall"]);

furn("rug", "Rug", (o) => {
  const c = o.c || "red", w = o.w || 260;
  return cr(0, -w * 0.23, w, c, { w: "detail" }, w * 0.23) + cr(0, -w * 0.23, w * 0.82, "cream", { w: "hair", tone: 0, flat: true, op: 0.6 }, w * 0.17) + cr(0, -w * 0.23, w * 0.56, c, { w: "hair", tone: 1, flat: true }, w * 0.11) + cr(0, -w * 0.23, w * 0.3, "cream", { w: "hair", flat: true, op: 0.6 }, w * 0.06);
}, [-290, -90, 580, 100], ["rug", "carpet", "floor"]);

furn("whiteboard", "Whiteboard", (o) => {
  const chalk = o.chalk, bc = chalk ? "green" : "white", mk = chalk ? "white" : "blue";
  return rr(-196, -230, 392, 232, "gray", {}, 10) + rr(-184, -218, 368, 196, bc, chalk ? { tone: 2, w: "detail" } : { w: "detail", flat: true }, 6) + rr(-120, -12, 240, 12, "gray", { tone: 2 }, 5)
    + L.stroke(L.smooth([[-150, -150], [-110, -170], [-70, -142], [-30, -176]]), { c: mk, w: 5 }) + L.stroke("M-150 -112 H10 M-150 -90 H-40", { c: chalk ? "cream" : "red", w: 5 }) + L.stroke("M60 -190 V-110 H160 M70 -120 L100 -150 L130 -128 L158 -176", { c: chalk ? "yellow" : "green", w: 5 })
    + rr(-90, -22, 26, 8, "red", D, 3) + rr(-56, -22, 26, 8, "blue", D, 3) + rr(-22, -22, 26, 8, "green", D, 3);
}, [-215, -250, 430, 270], ["whiteboard", "board", "classroom", "chalkboard"]);

furn("school-desk", "School desk", (o) => {
  return L.shadow(0, 0, 170) + L.stroke("M-58 -92 L-66 0 M58 -92 L66 0 M-62 -44 H62", { c: "gray", w: 8 }) + rr(-86, -128, 172, 40, "wood", {}, 10) + rr(-84, -138, 168, 14, "wood", { tone: 1 }, 6)
    + rr(-56, -172, 56, 38, "blue", { w: "detail" }, 4) + fl(L.rrect(-48, -166, 42, 6, 3), "white", 0.7) + L.stroke("M30 -142 L74 -166", { c: "yellow", w: 8 }) + fl("M74 -166 l8 -5 l-2 10 z", "ink", 1);
}, [-110, -190, 220, 210], ["desk", "school", "classroom", "student"]);

furn("hospital-bed", "Hospital bed", (o) => {
  const iv = o.iv !== false;
  let s = L.shadow(0, 0, 360) + rr(-152, -210, 304, 130, "gray", { tone: 1 }, 14) + rr(-124, -170, 92, 46, "white", { w: "detail" }, 22) + rr(-148, -128, 296, 76, "teal", {}, 14) + fl(L.rrect(-148, -128, 296, 24, 14), "white", 0.3)
    + rr(-162, -90, 324, 22, "gray", {}, 8) + bx(-142, -68, 14, 44, "gray", { tone: 2 }) + bx(128, -68, 14, 44, "gray", { tone: 2 }) + cr(-135, -12, 13, "ink", { w: "detail" }) + cr(135, -12, 13, "ink", { w: "detail" });
  if (iv) s += L.stroke("M205 -14 V-310 M178 -10 H232 M205 -310 H178", { c: "gray", w: 7 }) + rr(164, -296, 28, 54, "glass", { w: "detail" }, 10) + fl(L.rrect(168, -266, 20, 26, 6), "water", 0.8) + L.stroke(L.smooth([[178, -242], [184, -200], [160, -140]]), { c: "glass", w: 3 });
  return s;
}, [-190, -330, 440, 350], ["bed", "hospital", "patient", "iv"]);

furn("treadmill", "Treadmill", (o) => {
  return L.shadow(0, 0, 310) + rr(-134, -40, 258, 28, "gray", {}, 12) + rr(-124, -56, 238, 18, "ink", { tone: 1, w: "detail" }, 9) + cr(-120, -46, 14, "gray", { w: "detail" }) + cr(110, -46, 14, "gray", { w: "detail" })
    + sh("M86 -44 L112 -44 L100 -218 L76 -218 Z", "gray", { tone: 1 }) + L.stroke(L.smooth([[66, -208], [14, -190], [-40, -150]]), { c: "gray", w: 10 }) + rr(44, -270, 108, 64, "navy", {}, 12) + rr(54, -260, 88, 28, "teal", D, 5)
    + cr(70, -218, 5, "red", D) + cr(92, -218, 5, "yellow", D) + cr(114, -218, 5, "green", D) + bx(-128, -12, 26, 12, "ink") + bx(98, -12, 26, 12, "ink");
}, [-160, -290, 330, 310], ["treadmill", "gym", "run", "exercise"]);

furn("dumbbell-rack", "Dumbbell rack", (o) => {
  let s = L.shadow(0, 0, 330) + bx(-150, -168, 12, 168, "gray", { tone: 1 }) + bx(138, -168, 12, 168, "gray", { tone: 1 }) + rr(-156, -84, 312, 12, "gray", {}, 4) + rr(-156, -168, 312, 12, "gray", {}, 4);
  [-168, -84].forEach((y, row) => { for (let i = 0; i < 5; i++) { const r = 11 + i * 2 + row * 2; s += cr(-100 + i * 50, y - r, r, ["red", "blue", "green", "orange", "purple"][i], { w: "detail" }) + cr(-100 + i * 50, y - r, 4, "gray", D); } });
  return s;
}, [-180, -230, 360, 250], ["dumbbell", "weights", "gym", "rack"]);

furn("lab-bench", "Lab bench", (o) => {
  const flask = (x, c) => sh(`M${x - 8} -176 V-160 L${x - 30} -134 H${x + 30} L${x + 8} -160 V-176 Z`, "glass", { w: "detail", tone: 1 }) + fl(`M${x - 20} -134 L${x - 11} -148 H${x + 11} L${x + 20} -134 Z`, c, 0.9);
  return L.shadow(0, 0, 370) + rr(-172, -126, 344, 126, "wood", {}, 10) + rr(-182, -140, 364, 18, "stone", { tone: 1 }, 6) + ln([-58, -120], [-58, -8], { w: "hair", op: 0.6 }) + ln([58, -120], [58, -8], { w: "hair", op: 0.6 })
    + [-115, 0, 115].map((x) => cr(x + 14, -62, 5, "gold", D)).join("") + flask(-120, "green") + flask(-60, "pink") + rr(-18, -178, 34, 38, "glass", { w: "detail", tone: 1 }, 6) + fl(L.rrect(-14, -158, 26, 14, 4), "blue", 0.85)
    + [0, 1, 2].map((i) => rr(50 + i * 22, -184, 12, 44, "glass", { w: "hair", tone: 1 }, 5) + fl(L.rrect(52 + i * 22, -162, 8, 20, 3), ["red", "yellow", "teal"][i], 0.9)).join("")
    + bx(124, -146, 38, 6, "gray", { w: "hair" }) + rr(132, -196, 10, 50, "gray", { w: "detail", flat: true }, 4) + L.stroke("M142 -190 Q170 -180 160 -150", { c: "gray", w: 8 });
}, [-200, -215, 400, 235], ["lab", "bench", "science", "flask"]);

furn("shop-counter", "Shop counter", (o) => {
  const sign = o.sign === undefined ? "OPEN" : o.sign;
  return L.shadow(0, 0, 420) + rr(-200, -134, 400, 134, "wood", {}, 14) + rr(-190, -122, 380, 108, "wood", { tone: 1, flat: true, w: "hair" }, 8) + rr(-210, -150, 420, 20, "stone", { tone: 1 }, 8)
    + rr(60, -214, 76, 62, "gray", {}, 8) + rr(70, -246, 56, 40, "navy", { w: "detail" }, 5) + fl(L.rrect(76, -240, 44, 8, 3), "teal", 1) + rr(66, -176, 64, 8, "gray", { tone: 2, w: "hair" }, 3) + cr(86, -190, 4, "yellow", D) + cr(110, -190, 4, "red", D)
    + sh("M-120 -152 Q-100 -190 -80 -152 Z", "gold", { w: "detail" }) + cr(-100, -192, 5, "gold", D)
    + rr(-34, -196, 40, 44, "glass", { w: "detail", tone: 1 }, 10) + cr(-24, -166, 7, "red", D) + cr(-8, -164, 7, "yellow", D) + cr(-20, -178, 7, "green", D)
    + (sign ? rr(-80, -110, 160, 64, "red", { w: "detail" }, 12) + L.text(sign, 0, -64, { size: sign.length > 5 ? 34 : 44, c: "white", halo: "ink" }) : "");
}, [-230, -260, 460, 280], ["counter", "shop", "store", "reception", "register"]);

furn("bench", "Bench", (o) => {
  const c = o.c || "blue";
  return L.shadow(0, 0, 380) + bx(-158, -56, 16, 56, "gray", { tone: 2 }) + bx(142, -56, 16, 56, "gray", { tone: 2 }) + rr(-172, -140, 344, 62, c, { tone: 1 }, 18) + rr(-176, -84, 352, 32, c, {}, 12)
    + ln([-58, -132], [-58, -90], { w: "hair", op: 0.5 }) + ln([58, -132], [58, -90], { w: "hair", op: 0.5 });
}, [-200, -160, 400, 180], ["bench", "seat", "waiting room"]);

furn("stool", "Stool", (o) => {
  const c = o.c || "red";
  return L.shadow(0, 0, 80) + L.stroke("M-26 -74 L-36 0 M26 -74 L36 0 M-31 -34 H31", { c: "gray", w: 7 }) + rr(-40, -96, 80, 22, c, {}, 11) + fl(L.rrect(-30, -92, 24, 6, 3), "white", 0.4);
}, [-60, -115, 120, 130], ["stool", "bar", "cafe"]);

furn("pedestal", "Museum pedestal", (o) => {
  const it = o.item || "vase";
  let s = L.shadow(0, 0, 130) + rr(-48, -136, 96, 136, "stone", { tone: 1 }, 6) + rr(-58, -152, 116, 20, "stone", {}, 6);
  if (it === "bust") s += rr(-28, -190, 56, 40, "stone", { tone: 1 }, 18) + bx(-10, -208, 20, 22, "stone") + cr(0, -230, 28, "stone", { tone: 1 });
  else if (it === "globe") s += L.stroke("M-30 -154 Q-40 -222 0 -240 Q40 -222 30 -154", { c: "gold", w: 6 }) + cr(0, -204, 30, "blue", {}) + fl("M-14 -216 q10 -12 20 0 q-4 12 -10 18 q-12 -2 -10 -18 z", "green", 1);
  else s += sh("M-14 -154 Q-46 -190 -20 -220 L-12 -234 H12 L20 -220 Q46 -190 14 -154 Z", "teal", {}) + fl("M-18 -200 Q-4 -208 18 -200", "white", 0.4) + L.stroke("M-30 -190 Q0 -170 30 -190", { c: "yellow", w: 4 });
  return s;
}, [-80, -260, 160, 280], ["pedestal", "museum", "vase", "statue"]);

furn("crate", "Crate", (o) => {
  const c = o.c || "wood";
  return L.shadow(0, 0, 130) + rr(-60, -104, 120, 104, c, {}, 6) + ln([-60, -70], [60, -70], { w: "hair", op: 0.6 }) + ln([-60, -36], [60, -36], { w: "hair", op: 0.6 }) + L.stroke("M-52 -96 L52 -8 M52 -96 L-52 -8", { c: "ink", w: 4, op: 0.5 });
}, [-80, -120, 160, 130], ["crate", "box", "storage"]);

furn("trunk", "Old trunk", (o) => L.shadow(0, 0, 210) + rr(-96, -84, 192, 84, "brown", {}, 8) + sh("M-96 -84 Q-96 -134 0 -134 Q96 -134 96 -84 Z", "brown", { tone: 1 }) + L.stroke("M-52 -130 V0 M52 -130 V0", { c: "gold", w: 8 }) + rr(-12, -102, 24, 26, "gold", { w: "detail" }, 4) + cr(0, -90, 3, "ink", D), [-120, -150, 240, 170], ["trunk", "chest", "attic", "old"]);

furn("console", "Spaceship console", (o) => {
  const dark = dk(o);
  const scr = (x, y, w, h, c) => rr(x, y, w, h, "navy", { w: "detail" }, 8) + gp(L.rrect(x + 8, y + 8, w - 16, h - 16, 4), c, 0, 2) + fl(L.rrect(x + 16, y + 16, w * 0.4, 6, 3), "white", 0.8) + fl(L.rrect(x + 16, y + 30, w * 0.6, 6, 3), "white", 0.5) + (dark ? emit(glowMk(x + w / 2, y + h / 2, w * 1.1, c, 0.35)) : "");
  return L.shadow(0, 0, 380) + scr(-168, -260, 104, 84, "teal") + scr(-52, -286, 104, 108, "sky") + scr(64, -260, 104, 84, "green") + rr(-176, -172, 352, 172, "gray", { tone: 1 }, 18) + rr(-186, -190, 372, 36, "gray", {}, 14)
    + [-130, -100, -70].map((x, i) => cr(x, -172, 8, ["red", "yellow", "green"][i], { w: "detail" })).join("") + L.stroke("M80 -150 V-186", { c: "gray", w: 9 }) + cr(80, -190, 12, "red", { w: "detail" }) + L.stroke("M128 -150 V-176", { c: "gray", w: 9 }) + cr(128, -180, 12, "orange", { w: "detail" })
    + rr(-150, -120, 300, 70, "gray", { tone: 2, flat: true, w: "hair" }, 10) + [-100, -50, 0, 50, 100].map((x) => cr(x, -85, 11, "blue", { w: "detail", flat: true })).join("");
}, [-200, -300, 400, 320], ["console", "spaceship", "controls", "screens"]);

// ---------------------------------------------------------------- rooms
const BK = [360, 110, 1560, 700], VX = 960, VY = 405, G = 722; // back wall rectangle, vanishing point, furniture floor line
const ly = (x, cx, cy) => VY + ((cy - VY) * (x - VX)) / (cx - VX); // a wall/floor/ceiling edge line through the vanishing point
const P4 = (a) => L.poly(a, true);
// quad on a side wall: x range [xa,xb], height fractions [h0,h1] of the wall height at that x
const sideQuad = (cx, xa, xb, h0, h1) => { const y = (x, h) => ly(x, cx, BK[3]) + h * (ly(x, cx, BK[1]) - ly(x, cx, BK[3])); return [[xa, y(xa, h1)], [xb, y(xb, h1)], [xb, y(xb, h0)], [xa, y(xa, h0)]]; };
const pendant = (x, y, c = "orange", r = 380) => ln([x, -20], [x, y - 44], { w: "detail" }) + sh(`M${x - 52} ${y} L${x - 30} ${y - 46} H${x + 30} L${x + 52} ${y} Z`, c, { w: "detail" }) + cr(x, y + 4, 12, "yellow", D) + (DARK ? emit(glowMk(x, y + 10, r, "yellow", 0.6)) : "");
const strip = (x, w = 260, r = 300) => rr(x - w / 2, BK[1] + 12, w, 14, "glass", { w: "detail" }, 7) + (DARK ? emit(glowMk(x, BK[1] + 40, r, "yellow", 0.4)) : "");
const NIGHT = "0.30 0 0 0 0.02  0 0.35 0 0 0.04  0 0 0.60 0 0.09  0 0 0 1 0";

function room(o, p) {
  const dark = dk(o), [x0, y0, x1, y1] = BK, id = "intr" + ++gid, W = p.wall, F = p.floor || "floor";
  DARK = dark; GL = []; TR.length = 0;
  try {
    let s = "";
    s += L.tag("path", { d: P4([[-300, ly(-300, x0, y0)], [2220, ly(2220, x1, y0)], [x1, y0], [x0, y0]]), fill: L.c(W, 1) });
    s += gp(P4([[-300, ly(-300, x0, y0)], [x0, y0], [x0, y1], [-300, ly(-300, x0, y1)]]), W, 2, 1);
    s += gp(P4([[2220, ly(2220, x1, y0)], [x1, y0], [x1, y1], [2220, ly(2220, x1, y1)]]), W, 0, 1);
    s += gp(L.rect(x0, y0, x1 - x0, y1 - y0), W, 1, 0);
    s += gp(P4([[x0, y1], [x1, y1], [2220, ly(2220, x1, y1)], [2220, 1300], [-300, 1300], [-300, ly(-300, x0, y1)]]), F, 0, 2);
    // floor boards / tiles converging on the vanishing point
    let fd = "";
    for (let i = 1; i < 12; i++) { const xb = x0 + ((x1 - x0) * i) / 12; fd += `M${f1(xb)} ${y1} L${f1(VX + (xb - VX) * 3.034)} 1300 `; }
    if (p.tiles) for (let k = 0; k < 10; k++) { const y = VY + (y1 - VY) * (1 + k * 0.22); fd += `M-300 ${f1(y)} H2220 `; }
    s += L.stroke(fd, { c: L.c(F, 2), w: "hair", op: 0.5 });
    // wall dressing
    const bw = x1 - x0, bh = y1 - y0;
    if (p.deco === "stripes") for (let x = x0 + 30; x < x1; x += 80) s += fl(L.rect(x, y0, 34, bh), "white", 0.28);
    if (p.deco === "dots") for (let y = y0 + 50; y < y1 - 30; y += 70) for (let x = x0 + 40 + ((y / 70) % 2) * 35; x < x1; x += 70) s += L.tag("circle", { cx: x, cy: y, r: 6, fill: L.c("white"), opacity: 0.4 });
    if (p.deco === "wainscot") s += gp(L.rect(x0, y1 - 200, bw, 200), p.wain || "wood", 0, 2) + L.stroke(`M${x0} ${y1 - 200} H${x1}`, { w: "detail", op: 0.8 }) + L.stroke(`M${x0} ${y1 - 190} H${x1}`, { c: L.c(p.wain || "wood", 1), w: 6, op: 0.7 });
    if (p.deco === "tiles") { let d = ""; const th = p.tilesH || 330; for (let x = x0; x <= x1; x += 60) d += `M${x} ${y1 - th} V${y1} `; for (let y = y1; y >= y1 - th; y -= 60) d += `M${x0} ${y} H${x1} `; s += fl(L.rect(x0, y1 - th, bw, th), "white", 0.35) + L.stroke(d, { c: L.c(W, 2), w: "hair", op: 0.55 }); }
    if (p.deco === "bricks") { let d = ""; for (let y = y0, r = 0; y <= y1; y += 46, r++) { d += `M${x0} ${y} H${x1} `; for (let x = x0 + (r % 2) * 45; x < x1; x += 90) d += `M${x} ${y} V${Math.min(y + 46, y1)} `; } s += L.stroke(d, { c: L.c(W, 2), w: "hair", op: 0.7 }); }
    if (p.deco === "planks") { let d = ""; for (let x = x0; x <= x1; x += 74) d += `M${x} ${y0} V${y1} `; s += L.stroke(d, { c: L.c(W, 2), w: "hair", op: 0.8 }); const r = L.rng(5); for (let i = 0; i < 9; i++) s += L.tag("ellipse", { cx: x0 + 20 + r() * (bw - 40), cy: y0 + 30 + r() * (bh - 60), rx: 7, ry: 4, fill: "none", stroke: L.c(W, 2), "stroke-width": 2, opacity: 0.8 }); }
    if (p.deco === "panels") { let d = ""; for (let x = x0; x <= x1; x += 150) d += `M${x} ${y0} V${y1} `; for (let y = y0 + 150; y < y1; y += 150) d += `M${x0} ${y} H${x1} `; s += L.stroke(d, { c: L.c(W, 2), w: "detail", op: 0.8 }); for (let x = x0 + 12; x < x1; x += 150) for (let y = y0 + 12; y < y1; y += 150) s += L.tag("circle", { cx: x, cy: y, r: 3.5, fill: L.c(W, 2) }); }
    if (/bricks|tiles|panels|planks/.test(p.deco || "")) { let d = ""; for (let i = 1; i < 10; i++) { const yb = y0 + (bh * i) / 10; d += `M${x0} ${f1(yb)} L-300 ${f1(ly(-300, x0, yb))} M${x1} ${f1(yb)} L2220 ${f1(ly(2220, x1, yb))} `; } s += L.stroke(d, { c: L.c(W, 2), w: "hair", op: 0.45 }); }
    // room edges and baseboard
    s += L.stroke(`M${x0} ${y0} V${y1} H${x1} V${y0} Z M${x0} ${y0} L-300 ${f1(ly(-300, x0, y0))} M${x0} ${y1} L-300 ${f1(ly(-300, x0, y1))} M${x1} ${y0} L2220 ${f1(ly(2220, x1, y0))} M${x1} ${y1} L2220 ${f1(ly(2220, x1, y1))}`, { w: "scene", op: 0.45 });
    s += bx(x0, y1 - 24, bw, 24, "white", { w: "hair", tone: 2, flat: true });
    // side wall door (left) and window (right)
    if (p.door) {
      const q2 = sideQuad(x0, 72, 218, 0, 0.47);
      s += sh(P4(sideQuad(x0, 50, 242, 0, 0.53)), "white", { w: "detail" }) + sh(P4(q2), p.door, { w: "detail", tone: 2 }) + sh(P4(sideQuad(x0, 84, 140, 0.24, 0.42)), p.door, { w: "hair", tone: 1, flat: true }) + sh(P4(sideQuad(x0, 150, 206, 0.24, 0.42)), p.door, { w: "hair", tone: 1, flat: true }) + sh(P4(sideQuad(x0, 84, 140, 0.04, 0.2)), p.door, { w: "hair", tone: 1, flat: true }) + cr(102, ly(102, x0, y1) + 0.27 * (ly(102, x0, y0) - ly(102, x0, y1)), 7, "gold", D);
    }
    if (p.sideWin) {
      const qa = sideQuad(x1, 1690, 1850, 0.34, 0.72), glass = dark ? gp(P4(qa), "night", 2, 0) + L.tag("circle", { cx: 1728, cy: qa[0][1] + (qa[3][1] - qa[0][1]) * 0.26, r: 18, fill: L.c("cream") }) : gp(P4(qa), "sky", 2, 1);
      s += sh(P4(sideQuad(x1, 1678, 1862, 0.31, 0.75)), "white", { w: "detail" }) + emit(glass + L.stroke(`M${f1((qa[0][0] + qa[1][0]) / 2)} ${f1((qa[0][1] + qa[1][1]) / 2)} L${f1((qa[3][0] + qa[2][0]) / 2)} ${f1((qa[3][1] + qa[2][1]) / 2)} M${qa[0][0]} ${f1((qa[0][1] + qa[3][1]) / 2)} L${qa[1][0]} ${f1((qa[1][1] + qa[2][1]) / 2)}`, { c: "white", w: 8 }));
    }
    if (p.patch && !dark) s += fl(P4([[p.patch, y1 + 26], [p.patch + 230, y1 + 26], [p.patch + 380, 1080], [p.patch - 180, 1080]]), "cream", 0.28);
    if (p.patch && dark) s += emit(fl(P4([[p.patch, y1 + 26], [p.patch + 230, y1 + 26], [p.patch + 380, 1080], [p.patch - 180, 1080]]), "sky", 0.07));
    s += p.items();
    const top = GL.join("");
    const defs = `<defs><clipPath id="${id}c"><rect width="1920" height="1080"/></clipPath>${dark ? `<filter id="${id}f" filterUnits="userSpaceOnUse" x="0" y="0" width="1920" height="1080" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="${NIGHT}"/></filter>` : ""}</defs>`;
    return defs + `<g clip-path="url(#${id}c)">` + (dark ? `<g filter="url(#${id}f)">${s}</g>` : s) + top + `</g>`;
  } finally { GL = null; DARK = false; TR.length = 0; }
}

// each room: items() draws furniture along the back wall (floor line G=722); the middle of the floor stays empty for characters
const ROOMS = [
  ["bedroom", "Bedroom", "Home", { wall: "sky", floor: "floor", deco: "stripes", door: "wood", patch: 700,
    items: () => at("furn-rug", 960, 975, 1.3, { c: "pink" }) + at("furn-window", 820, 520, 1, { curtains: "pink" }) + at("furn-wardrobe", 490, G, 1.1) + at("furn-bed", 1230, 745, 1.25, { c: "blue" }) + at("furn-picture", 1230, 420, 1.3, { kind: "hills" })
      + at("furn-nightstand", 985, G, 1) + at("furn-table-lamp", 985, G - 112, 1) }],
  ["kitchen", "Kitchen", "Home", { wall: "cream", floor: "sand", tiles: true, deco: "tiles", tilesH: 240, door: "wood", sideWin: true, patch: 640,
    items: () => at("furn-fridge", 450, G, 1.15) + at("furn-sink", 680, G, 1.1) + at("furn-window", 680, 500, 0.8) + at("furn-stove", 910, G, 1.1) + at("furn-clock", 450, 340, 0.9) + at("furn-kitchen-counter", 1130, G, 1.05) + at("furn-kitchen-counter", 1360, G, 1.05)
      + at("furn-wall-cabinet", 1130, 380, 1.05) + at("furn-wall-cabinet", 1360, 380, 1.05) + at("furn-plant", 1500, G - 6, 0.8) + pendant(910, 240) }],
  ["living-room", "Living room", "Home", { wall: "dusk", floor: "floor", deco: "dots", door: "wood", sideWin: true, patch: 560,
    items: () => at("furn-rug", 960, 985, 1.4, { c: "teal" }) + at("furn-tv-stand", 700, G, 1.15) + at("furn-armchair", 470, 735, 1.1, { c: "orange" }) + at("furn-sofa", 1210, 745, 1.2, { c: "red" }) + at("furn-picture", 1120, 430, 1, { kind: "abstract" }) + at("furn-picture", 1300, 450, 0.8, { kind: "hills", w: 110, h: 130 })
      + at("furn-lamp", 1480, G + 8, 1) + at("furn-plant", 905, G, 0.9) }],
  ["bathroom", "Bathroom", "Home", { wall: "glass", floor: "glass", tiles: true, deco: "tiles", tilesH: 420, door: "white",
    items: () => at("furn-bathtub", 650, G + 10, 1.3) + at("furn-window", 650, 490, 0.8) + at("furn-toilet", 1010, G, 1.2) + at("furn-sink", 1320, G, 1.05, { c: "white" }) + at("furn-picture", 1320, 520, 1.2, { kind: "mirror", w: 150, h: 190 }) + at("furn-plant", 1490, G - 4, 0.6) + pendant(1000, 230, "teal") }],
  ["dining-room", "Dining room", "Home", { wall: "cream", floor: "floor", deco: "wainscot", wain: "red", door: "wood", sideWin: true,
    items: () => at("furn-rug", 1060, 880, 1.5, { c: "red" }) + at("furn-tv-stand", 560, G, 1.1, { tv: false }) + at("furn-table-lamp", 560, G - 84, 1) + at("furn-picture", 560, 470, 1.3, { kind: "hills" }) + at("furn-dining-table", 1060, 750, 1.3) + at("furn-dining-chair", 800, 762, 1.1) + at("furn-dining-chair", 1320, 762, 1.1, { flip: true })
      + at("furn-plant", 1480, G, 1) + pendant(1060, 330, "gold", 440) }],
  ["attic", "Attic", "Home", { wall: "wood", floor: "floor", deco: "planks", door: "brown", patch: 800,
    items: () => {
      const [x0, y0] = BK;
      return sh(P4([[x0, y0], [VX, y0], [x0, y0 + 250]]), "brown", { w: "detail", tone: 2 }) + sh(P4([[BK[2], y0], [VX, y0], [BK[2], y0 + 250]]), "brown", { w: "detail", tone: 2 }) + L.stroke(`M${x0} ${y0 + 250} L${VX} ${y0} L${BK[2]} ${y0 + 250}`, { c: L.c("brown", 2), w: 14 })
        + at("furn-window", 960, 520, 0.9, { w: 180, h: 200 }) + at("furn-trunk", 560, G + 6, 1.2) + at("furn-crate", 450, G, 0.9) + at("furn-crate", 455, G - 92, 0.7) + at("furn-wardrobe", 1400, G, 1.05, { c: "brown" }) + at("furn-armchair", 1170, 735, 1, { c: "green" }) + at("furn-lamp", 780, G + 6, 0.9)
        + L.stroke(`M${x0} ${y0 + 250} q20 0 40 40 M${x0} ${y0 + 250} q10 20 30 50 M${x0} ${y0 + 250} q30 8 60 22`, { c: "white", w: 2, op: 0.7 }) + pendant(1030, 250, "gray", 300);
    } }],
  ["garage", "Garage", "Home", { wall: "gray", floor: "stone", deco: "panels", door: "gray", sideWin: true,
    items: () => {
      const tyre = (x, y) => cr(x, y, 56, "ink", { tone: 1 }, 20) + cr(x, y, 26, "gray", { w: "detail" }, 10);
      const roll = rr(790, 300, 380, 400, "white", {}, 8) + [1, 2, 3, 4, 5].map((i) => ln([790, 300 + i * 66], [1170, 300 + i * 66], { w: "detail" })).join("") + [0, 1, 2, 3].map((i) => rr(820 + i * 86, 330, 70, 44, "sky", { w: "hair", flat: true }, 6)).join("") + rr(940, 700 - 22, 80, 14, "gray", D, 4);
      const peg = L.g(bx(400, 300, 300, 190, "wood", { tone: 1 }) + [0, 1, 2, 3, 4].map((i) => cr(420 + i * 58, 320, 3, "ink", D)).join("") + sh("M440 340 L450 420 H430 Z", "gray", { w: "detail" }) + rr(500, 340, 60, 22, "red", D, 5) + ln([530, 362], [530, 420], { c: "wood", w: 8 }) + rr(600, 340, 12, 100, "gray", D, 4) + sh(L.circ(660, 400, 24), "orange", { w: "detail" }), "translate(0 -70)");
      return roll + peg + at("furn-desk", 1370, G, 1.2) + at("furn-crate", 1250, G + 6, 0.8) + tyre(450, 700) + tyre(450, 680) + tyre(450, 660) + at("furn-bookshelf", 600, G, 0.9, { kind: "goods", seed: 11 }) + pendant(960, 230, "gray", 420);
    } }],
  ["classroom", "Classroom", "School and work", { wall: "cream", floor: "floor", deco: "wainscot", wain: "teal", door: "wood", sideWin: true, patch: 1000,
    items: () => at("furn-whiteboard", 960, 490, 1.35) + at("furn-clock", 1340, 360, 1) + at("furn-school-desk", 520, 732, 1.1) + at("furn-school-desk", 700, 732, 1.1) + at("furn-desk", 1330, G, 1.15) + at("furn-computer", 1290, G - 138 * 1.15, 0.9)
      + strip(640) + strip(1280) }],
  ["science-lab", "Science lab", "School and work", { wall: "snow", floor: "glass", tiles: true, deco: "tiles", tilesH: 300, door: "gray", sideWin: true,
    items: () => at("furn-fridge", 440, G, 1.1, { c: "white" }) + at("furn-lab-bench", 700, G, 1.1, { }) + at("furn-lab-bench", 1290, G, 1.1) + at("furn-whiteboard", 990, 520, 0.9) + at("furn-clock", 700, 410, 0.9) + at("furn-wall-cabinet", 1500, 400, 0.9, { c: "teal" }) + at("furn-plant", 1500, G, 0.7, { c: "teal" }) + strip(640) + strip(1240) }],
  ["office", "Office", "School and work", { wall: "glass", floor: "stone", deco: "stripes", door: "gray", sideWin: true, patch: 520,
    items: () => at("furn-window", 640, 540, 1.3, { w: 260, h: 300 }) + at("furn-plant", 450, G, 1.1) + at("furn-desk", 1130, G, 1.3) + at("furn-computer", 1090, G - 138 * 1.3, 1.1) + at("furn-office-chair", 1130, 775, 1.15, { c: "blue" }) + at("furn-bookshelf", 1450, G, 1.0, { seed: 3 }) + at("furn-clock", 1130, 340, 1.1) + at("furn-picture", 930, 400, 0.9, { kind: "abstract" }) + strip(700) + strip(1260) }],
  ["library", "Library", "School and work", { wall: "wall", floor: "floor", deco: "planks", door: "wood", patch: 900,
    items: () => [460, 660].map((x, i) => at("furn-bookshelf", x, G, 1.0, { seed: 20 + i })).join("") + [1260, 1460].map((x, i) => at("furn-bookshelf", x, G, 1.0, { seed: 30 + i })).join("") + at("furn-window", 960, 520, 0.85, { curtains: "red" }) + at("furn-armchair", 960, 748, 0.95, { c: "green" }) + pendant(560, 240, "gold", 340) + pendant(1360, 240, "gold", 340) }],
  ["home-office", "Home office", "School and work", { wall: "sky", floor: "floor", deco: "dots", door: "wood", patch: 1100,
    items: () => at("furn-rug", 900, 990, 1.2, { c: "purple" }) + at("furn-bookshelf", 450, G, 1.0, { seed: 41 }) + at("furn-desk", 800, G, 1.3) + at("furn-computer", 760, G - 138 * 1.3, 1.1) + at("furn-table-lamp", 950, G - 138 * 1.3, 1) + at("furn-office-chair", 800, 775, 1.15, { c: "red" }) + at("furn-picture", 800, 430, 1.1, { kind: "hills" }) + at("furn-window", 1190, 540, 1, { curtains: "teal" })
      + at("furn-bookshelf", 1450, G, 1.0, { seed: 42 }) + at("furn-clock", 960, 330, 0.9) }],
  ["hospital-room", "Hospital room", "Public", { wall: "snow", floor: "snow", tiles: true, deco: "wainscot", wain: "teal", door: "white", sideWin: true, patch: 1000,
    items: () => {
      return at("furn-hospital-bed", 760, 750, 1.2) + at("furn-window", 1240, 520, 1.1) + at("furn-nightstand", 1130, G, 1) + at("furn-plant", 1130, G - 112, 0.45, { c: "pink" }) + at("furn-clock", 560, 330, 0.9) + sh("M1470 360 h24 v-24 h24 v24 h24 v24 h-24 v24 h-24 v-24 h-24 z", "green", { w: "detail" }) + strip(600) + strip(1200);
    } }],
  ["gym", "Gym", "Public", { wall: "cream", floor: "stone", deco: "wainscot", wain: "blue", door: "gray",
    items: () => at("furn-picture", 920, 620, 1, { kind: "mirror", w: 700, h: 340 }) + at("furn-treadmill", 520, 740, 1.15) + at("furn-treadmill", 900, 740, 1.15) + at("furn-dumbbell-rack", 1370, G, 1) + at("furn-picture", 1480, 420, 0.8, { kind: "abstract" }) + at("furn-clock", 470, 340, 0.9) + strip(600) + strip(1300) }],
  ["restaurant", "Restaurant / café", "Public", { wall: "dusk", floor: "floor", deco: "wainscot", wain: "brown", door: "wood", sideWin: true,
    items: () => at("furn-whiteboard", 700, 490, 1.0, { chalk: true }) + at("furn-shop-counter", 700, G + 12, 1.0, { sign: false }) + [530, 700, 870].map((x) => at("furn-stool", x, 790, 0.9)).join("") + at("furn-dining-table", 1240, 745, 0.95) + at("furn-dining-chair", 1090, 757, 0.95, { c: "teal" }) + at("furn-dining-chair", 1390, 757, 0.95, { c: "teal", flip: true })
      + at("furn-window", 1240, 480, 0.7, { curtains: "red" }) + at("furn-plant", 1500, G, 0.9) + pendant(980, 250, "red", 360) + pendant(1450, 260, "red", 360) }],
  ["shop-counter", "Shop counter", "Public", { wall: "sky", floor: "floor", deco: "stripes", door: "red", sideWin: true,
    items: () => [480, 680].map((x, i) => at("furn-bookshelf", x, G, 1.1, { kind: "goods", seed: 50 + i })).join("") + at("furn-shop-counter", 1240, 752, 1.3, { sign: "OPEN" }) + at("furn-bookshelf", 1500, G, 1.1, { kind: "goods", seed: 52 }) + at("furn-clock", 1240, 330, 1) + at("furn-plant", 880, G, 0.9) + pendant(960, 260, "red", 420) }],
  ["museum-hall", "Museum hall", "Public", { wall: "cream", floor: "sand", tiles: true, deco: "wainscot", wain: "brown", door: "wood",
    items: () => at("furn-picture", 540, 480, 1.4, { kind: "hills" }) + at("furn-picture", 780, 480, 1.0, { kind: "abstract", w: 120, h: 150 }) + at("furn-picture", 1140, 480, 1.0, { kind: "abstract", w: 120, h: 150 }) + at("furn-picture", 1380, 480, 1.4, { kind: "hills" })
      + at("furn-pedestal", 960, G + 6, 1.15, { item: "bust" }) + at("furn-pedestal", 450, G, 0.9, { item: "vase" }) + at("furn-pedestal", 1470, G, 0.9, { item: "globe" }) + at("furn-bench", 1200, 775, 0.8, { c: "red" }) + (DARK ? [540, 780, 1140, 1380].map((x) => emit(glowMk(x, 400, 220, "yellow", 0.5))).join("") : "") + pendant(960, 260, "gold", 420) }],
  ["waiting-room", "Waiting room", "Public", { wall: "dusk", floor: "sand", tiles: true, deco: "wainscot", wain: "teal", door: "white", sideWin: true,
    items: () => at("furn-bench", 560, 745, 1.0, { c: "blue" }) + at("furn-picture", 560, 480, 1.2, { kind: "hills" }) + at("furn-shop-counter", 1280, 752, 1.15, { sign: "HELLO" }) + at("furn-picture", 1000, 470, 1.3, { kind: "tv", w: 180, h: 110 }) + at("furn-plant", 860, G, 1) + at("furn-clock", 1280, 330, 1) + strip(560) + strip(1280) }],
  ["bunker", "Bunker / basement", "Fantasy", { wall: "stone", floor: "stone", deco: "bricks", door: "gray", patch: 0,
    items: () => {
      const pipe = L.stroke("M0 80 H1920", { c: "ink", w: 20 }) + L.stroke("M0 80 H1920", { c: "gray", w: 12 }) + L.stroke("M300 80 V150 H520", { c: "ink", w: 14 }) + L.stroke("M300 80 V150 H520", { c: "gray", w: 8 });
      const hatch = cr(960, 440, 140, "gray", {}) + cr(960, 440, 110, "gray", { tone: 1, w: "detail" }) + L.stroke("M960 330 V550 M850 440 H1070 M882 362 L1038 518 M1038 362 L882 518", { c: "ink", w: 8 }) + cr(960, 440, 24, "gold", { w: "detail" });
      return pipe + hatch + at("furn-bookshelf", 500, G, 1.0, { kind: "goods", seed: 61 }) + at("furn-crate", 1320, G, 1.1) + at("furn-crate", 1450, G, 1.1) + at("furn-crate", 1385, G - 114, 0.9) + at("furn-bed", 745, 745, 0.7, { c: "green" }) + pendant(960, 190, "gray", 480);
    } }],
  ["spaceship-cabin", "Spaceship cabin", "Fantasy", { wall: "glass", floor: "gray", tiles: true, deco: "panels", door: "gray",
    items: () => at("furn-console", 600, G, 1.1) + at("furn-porthole", 960, 560, 1.3) + at("furn-office-chair", 840, 775, 1.0, { c: "red" }) + at("furn-bed", 1270, 745, 0.8, { c: "teal" }) + at("furn-wardrobe", 1490, G, 0.8, { c: "gray" }) + at("furn-plant", 960, G, 0.5, { c: "gray" }) + strip(700, 300, 360) + strip(1300, 300, 360) }],
];
ROOMS.forEach(([key, label, group, p]) => ["light", "dark"].forEach((time) => {
  L.reg("interiors", `room-${key}-${time}`, (o) => room(o, p), { box: [0, 0, 1920, 1080], wide: true, group, label: `${label} (${time === "light" ? "day" : "night"})`, defaults: { time }, demo: { time },
    tags: ["room", "interior", "indoor", "background", "scene", time === "light" ? "day" : "night", key.replace(/-/g, " ")], call: `L.put(S, "room-${key}-${time}", 0, 0, { t })  // o.time "light" | "dark"; floor y ~860` });
}));
// gallery order: rooms first, then furniture
const fu = L.ITEMS.filter((i) => i.cat === "interiors" && i.group === "Furniture");
L.ITEMS = L.ITEMS.filter((i) => !fu.includes(i)).concat(fu);
})();
