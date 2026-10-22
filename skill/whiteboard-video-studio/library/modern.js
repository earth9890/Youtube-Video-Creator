// ===================== library/modern.js — modern life & tech (phones, devices, energy, street, shops, office) =====================
(function () {
const L = window.L, f1 = L.f1;
const sh = L.shape, fl = L.flat, rr = L.rrect, ci = L.circ, st = L.stroke, poly = L.poly, sm = L.smooth, G = L.g;
const dk = (o) => o.time === "night" || o.time === "dark";
const bar = (x, y, w, h, c, op) => fl(rr(x, y, w, h, h / 2), c, op); // a "text line" / pill without outline
const cat = "modern";
// register day+night (or light+dark) variants as separate gallery tiles
const reg2 = (name, label, fn, meta, times = ["day", "night"]) => times.forEach((t) =>
  L.reg(cat, `${name}-${t}`, (o) => fn(Object.assign({ time: t }, o)), Object.assign({}, meta, { label: `${label} · ${t}`, demo: { time: t }, call: `L.put(S, "${name}-${t}", x, y, { s: 1, t })` })));
const heart = (cx, cy, k) => `M${cx} ${cy + 9 * k} C${cx - 14 * k} ${cy - 2 * k} ${cx - 12 * k} ${cy - 14 * k} ${cx - 5 * k} ${cy - 14 * k} C${cx - 1 * k} ${cy - 14 * k} ${cx} ${cy - 10 * k} ${cx} ${cy - 8 * k} C${cx} ${cy - 10 * k} ${cx + 1 * k} ${cy - 14 * k} ${cx + 5 * k} ${cy - 14 * k} C${cx + 12 * k} ${cy - 14 * k} ${cx + 14 * k} ${cy - 2 * k} ${cx} ${cy + 9 * k} Z`;
const bolt = (cx, cy, k = 1) => poly([[2, -12], [-8, 2], [-1, 2], [-4, 12], [8, -4], [1, -4]].map(([x, y]) => [cx + x * k, cy + y * k]), true);
const crescent = (cx, cy, r) => `M${cx} ${cy - r} A${r} ${r} 0 1 0 ${cx} ${cy + r} A${f1(r * 0.7)} ${r} 0 1 1 ${cx} ${cy - r} Z`;

// ---------------------------------------------------------------- phone screens
const SCR = [-67, -138, 134, 276];
const phone = (inner, bg, o = {}) => {
  const clip = `<clipPath id="mdn-phclip"><path d="${rr(...SCR, 18)}"/></clipPath>`;
  return sh(rr(-78, -150, 156, 300, 28), "navy", { w: "prop" }) + clip +
    sh(rr(...SCR, 18), bg, { w: "detail", dir: "v", tone: o.tone || 0 }) +
    `<g clip-path="url(#mdn-phclip)">${inner}</g>` +
    sh(rr(-20, -134, 40, 10, 5), "ink", { w: "hair", flat: true }) + fl(rr(-24, 126, 48, 5, 2.5), "white", 0.8);
};
const phoneBox = { box: [-120, -170, 240, 340], group: "Phone screens", tags: ["phone", "smartphone", "screen", "mobile", "tech"] };

L.reg(cat, "modern-phone-notifications", () => {
  let s = L.text("9:41", 0, -84, { size: 44, c: "white" }) + bar(-26, -70, 52, 6, "white", 0.6);
  [["orange", 0], ["green", 1], ["pink", 2]].forEach(([c, i]) => {
    const y = -56 + i * 58;
    s += fl(rr(-58, y, 116, 54, 12), "white", 0.94) + fl(ci(-38, y + 27, 12), c) + bar(-18, y + 13, 66, 8, "ink", 0.6) + bar(-18, y + 30, 44, 7, "gray");
  });
  s += fl(rr(-50, 120, 100, 10, 5), "white", 0.5) + fl(rr(-42, 132, 84, 8, 4), "white", 0.3);
  return phone(s, "blue") + sh(ci(66, -140, 17), "red", { w: "detail" }) + L.text("3", 66, -132, { size: 24, c: "white" });
}, Object.assign({ label: "Phone · notifications", call: 'L.put(S, "modern-phone-notifications", x, y, { s: 1, t })' }, phoneBox));

L.reg(cat, "modern-phone-map", () => {
  let s = fl(rr(...SCR, 0), "cream") + fl(rr(-60, -112, 54, 44, 12), "grass") + fl(rr(36, 60, 40, 44, 12), "grass") +
    fl(sm([[18, 40], [70, 20], [70, 140], [6, 140], [-4, 92], [18, 40]]), "water");
  [[[-70, -62], [70, -62]], [[-10, -140], [-10, 140]], [[-70, 100], [70, 70]], [[-45, 60], [-45, 30], [30, 30], [30, -140]]].forEach((p) => (s += fl(L.limb(p, 15, 15), "white")));
  s += st(poly([[-45, 62], [-45, 30], [30, 30], [30, -66]]), { c: "blue", w: "char" });
  s += fl(ci(-45, 62, 13), "white") + fl(ci(-45, 62, 8), "blue");
  s += `<g transform="translate(30 -66)">${sh("M0 0 C-4 -10 -16 -20 -16 -32 A16 16 0 1 1 16 -32 C16 -20 4 -10 0 0 Z", "red", { w: "detail" })}${fl(ci(0, -32, 6), "white")}</g>`;
  s += fl(rr(-56, -128, 112, 26, 13), "white", 0.96) + bar(-44, -118, 56, 7, "gray") + fl(ci(40, -115, 6), "gray") + fl(rr(-60, 78, 120, 50, 12), "white", 0.97) +
    bar(-50, 90, 56, 8, "ink", 0.6) + bar(-50, 106, 36, 7, "gray") + fl(rr(22, 92, 30, 24, 12), "green") + fl(poly([[32, 98], [44, 104], [32, 110]], true), "white");
  return phone(s, "cream");
}, Object.assign({ label: "Phone · map with pin", call: 'L.put(S, "modern-phone-map", x, y, { s: 1, t })' }, phoneBox));

L.reg(cat, "modern-phone-video-grid", () => {
  let s = fl(rr(...SCR, 0), "navy");
  const tiles = [["teal", "s2", -62, -122], ["orange", "s5", 2, -122], ["purple", "s3", -62, -30], ["pink", "s1", 2, -30]];
  tiles.forEach(([bg, skin, x, y], i) => {
    s += fl(rr(x, y, 60, 88, 8), bg) + fl(sm([[x + 6, y + 88], [x + 8, y + 66], [x + 30, y + 58], [x + 52, y + 66], [x + 54, y + 88], [x + 6, y + 88]]), "white", 0.85) + fl(ci(x + 30, y + 40, 15), skin) + fl(ci(x + 25, y + 38, 2), "ink") + fl(ci(x + 35, y + 38, 2), "ink");
    if (i === 1) s += st(rr(x, y, 60, 88, 8), { c: "green", w: "char" });
  });
  s += bar(-62, 66, 124, 5, "gray", 0.4) + fl(ci(-34, 100, 15), "gray", 0.6) + fl(ci(0, 100, 17), "red") + fl(ci(34, 100, 15), "gray", 0.6);
  s += fl(rr(-8, 97, 16, 6, 3), "white");
  return phone(s, "navy");
}, Object.assign({ label: "Phone · video call grid", tags: ["phone", "video call", "meeting", "zoom", "screen"], call: 'L.put(S, "modern-phone-video-grid", x, y, { s: 1, t })' }, { box: phoneBox.box, group: phoneBox.group }));

L.reg(cat, "modern-phone-alarm", () => {
  let s = fl(rr(...SCR, 0), "navy") + L.text("6:30", 0, -40, { size: 60, c: "white" }) + bar(-20, -24, 40, 6, "gray", 0.8);
  s += sh(sm([[-24, 30], [-17, 22], [-15, 8], [-10, -6], [0, -12], [10, -6], [15, 8], [17, 22], [24, 30], [-24, 30]]), "yellow", { w: "detail" }) + sh(ci(0, 36, 6), "yellow", { w: "detail" }) + fl(ci(0, -14, 4), "yellow");
  s += st(L.arc(0, 8, 42, 200, 250), { c: "yellow", w: "prop" }) + st(L.arc(0, 8, 42, 290, 340), { c: "yellow", w: "prop" }) + st(L.arc(0, 8, 56, 205, 245), { c: "yellow", w: "prop", op: 0.6 }) + st(L.arc(0, 8, 56, 295, 335), { c: "yellow", w: "prop", op: 0.6 });
  s += L.text("Mon  Tue  Wed", 0, 78, { size: 14, c: "gray" }) + fl(rr(-30, 90, 60, 28, 14), "green") + fl(ci(16, 104, 11), "white");
  return phone(s, "navy");
}, Object.assign({ label: "Phone · alarm", tags: ["phone", "alarm", "wake up", "morning", "clock", "screen"], call: 'L.put(S, "modern-phone-alarm", x, y, { s: 1, t })' }, { box: phoneBox.box, group: phoneBox.group }));

// ---------------------------------------------------------------- social post card
L.reg(cat, "modern-social-post", () => {
  let s = sh(rr(-150, -112, 300, 224, 18), "white", { w: "prop" });
  s += sh(ci(-108, -72, 26), "teal", { w: "detail" }) + fl(sm([[-126, -52], [-124, -62], [-108, -66], [-92, -62], [-90, -52], [-126, -52]]), "s4") + fl(ci(-108, -78, 10), "s4");
  s += bar(-72, -86, 110, 10, "ink", 0.7) + bar(-72, -66, 70, 8, "gray") + fl(ci(120, -72, 4), "gray") + fl(ci(108, -72, 4), "gray") + fl(ci(132, -72, 4), "gray");
  s += sh(rr(-134, -34, 268, 92, 10), "sky", { w: "detail", dir: "v" }) + fl(ci(80, -8, 14), "yellow") + fl(sm([[-134, 58], [-100, 4], [-60, 30], [-10, -8], [40, 40], [60, 58], [-134, 58]]), "grass") + fl(sm([[134, 58], [100, 22], [70, 58]]), "green", 0.8);
  s += sh(heart(-118, 86, 1.25), "red", { w: "detail" }) + L.text("128", -86, 94, { size: 24, c: "ink", anchor: "start" });
  s += sh(rr(-24, 72, 40, 28, 10), "sky", { w: "detail" }) + fl(poly([[-14, 99], [-14, 110], [-2, 99]], true), "sky") + [-14, -4, 6].map((x) => fl(ci(x, 86, 3), "white")).join("");
  s += st(poly([[96, 90], [124, 90]]), { c: "ink", w: "detail" }) + st(poly([[114, 80], [126, 90], [114, 100]]), { c: "ink", w: "detail" });
  return s;
}, { box: [-170, -130, 340, 260], group: "Phone screens", label: "Social post card", tags: ["social", "feed", "post", "like", "heart", "avatar", "card"], call: 'L.put(S, "modern-social-post", x, y, { s: 1, t })' });

// ---------------------------------------------------------------- laptop with code
L.reg(cat, "modern-laptop-code", () => {
  let s = sh(rr(-134, -146, 268, 184, 14), "gray", { w: "prop" }) + sh(rr(-122, -134, 244, 160, 6), "navy", { w: "detail", flat: true });
  const rows = [[0, [40, 30, 52]], [1, [64, 40]], [2, [30, 84]], [2, [52, 22, 44]], [1, [76]], [1, [36, 56]], [0, [28]], [0, [54, 34]], [1, [48, 70]]];
  const cols = ["teal", "orange", "pink", "sky", "green", "yellow"];
  rows.forEach(([ind, segs], i) => {
    const y = -118 + i * 16;
    s += bar(-116, y, 8, 7, "gray", 0.45);
    let x = -96 + ind * 18;
    segs.forEach((w, j) => { s += bar(x, y, w, 7.5, cols[(i * 2 + j) % cols.length], 0.95); x += w + 7; });
  });
  s += fl(rr(40, -22, 5, 12, 2), "yellow") + fl(poly([[-122, -134], [-60, -134], [-110, 26], [-122, 26]], true), "white", 0.07) + fl(ci(0, -140, 2.5), "ink");
  s += sh(poly([[-168, 44], [168, 44], [150, 66], [-150, 66]], true), "gray", { tone: 1 }) + fl(rr(-26, 44, 52, 7, 3.5), "stone");
  return s;
}, { box: [-190, -160, 380, 240], group: "Tech & devices", label: "Laptop with code", tags: ["laptop", "code", "programming", "developer", "computer", "screen"], call: 'L.put(S, "modern-laptop-code", x, y, { s: 1, t })' });

// ---------------------------------------------------------------- server rack
L.reg(cat, "modern-server-rack", () => {
  let s = L.shadow(0, 0, 190);
  s += st(sm([[70, -250], [120, -246], [140, -150], [130, -60], [150, -8]]), { c: "teal", w: "prop" }) + st(sm([[66, -222], [104, -210], [120, -120], [112, -40], [124, -8]]), { c: "orange", w: "prop" });
  s += sh(rr(-80, -280, 160, 274, 8), "gray", { w: "prop" }) + sh(rr(-68, -268, 136, 250, 4), "navy", { w: "detail", flat: true });
  for (let i = 0; i < 6; i++) {
    const y = -262 + i * 40;
    s += sh(rr(-64, y, 128, 34, 3), "stone", { w: "detail", tone: 1 });
    if (i === 2 || i === 4) { for (let k = 0; k < 4; k++) s += sh(rr(-58 + k * 20, y + 6, 17, 22, 3), "navy", { w: "hair", flat: true }) + fl(ci(-49.5 + k * 20, y + 24, 2), "green"); }
    else { for (let k = 0; k < 6; k++) s += bar(-58, y + 7 + k * 4.2, 62, 2.4, "ink", 0.35); }
    s += fl(ci(46, y + 12, 3.8), i % 3 === 1 ? "orange" : "green") + fl(ci(58, y + 12, 3.8), i === 3 ? "red" : "green") + bar(34, y + 22, 24, 4, "ink", 0.4);
  }
  s += sh(rr(-70, -10, 24, 10, 2), "ink", { w: "hair", flat: true }) + sh(rr(46, -10, 24, 10, 2), "ink", { w: "hair", flat: true });
  return s;
}, { box: [-120, -300, 280, 320], group: "Tech & devices", label: "Server rack", tags: ["server", "rack", "data center", "cloud", "hosting", "computer"], call: 'L.put(S, "modern-server-rack", x, gy, { s: 1, t })' });

// ---------------------------------------------------------------- delivery drone
L.reg(cat, "modern-delivery-drone", () => {
  let s = "";
  [-1, 1].forEach((d) => {
    s += sh(L.limb([[d * 40, -14], [d * 100, -38]], 14, 11), "gray", { w: "detail" }) + sh(rr(d * 108 - 10, -58, 20, 26, 5), "gray", { w: "detail", tone: 2 }) +
      fl(ci(d * 108, -64, 60, 8), "gray", 0.35) + sh(sm([[d * 108 - 60, -64], [d * 108, -68], [d * 108 + 60, -64], [d * 108, -60], [d * 108 - 60, -64]]), "ink", { w: "hair", flat: true });
  });
  s += st(poly([[-30, 30], [-44, 62]]), { c: "ink", w: "detail" }) + st(poly([[30, 30], [44, 62]]), { c: "ink", w: "detail" }) + st(poly([[-58, 64], [-30, 64]]), { c: "ink", w: "prop" }) + st(poly([[58, 64], [30, 64]]), { c: "ink", w: "prop" });
  s += st(poly([[-24, 30], [-24, 84]]), { c: "ink", w: "detail" }) + st(poly([[24, 30], [24, 84]]), { c: "ink", w: "detail" });
  s += sh(rr(-56, -34, 112, 70, 30), "white", { w: "prop" }) + fl(ci(-34, 10, 8), "pink", 0.6) + fl(ci(34, 10, 8), "pink", 0.6);
  s += fl(ci(-18, -6, 6), "ink") + fl(ci(18, -6, 6), "ink") + fl(ci(-16, -8, 2), "white") + fl(ci(20, -8, 2), "white") + st(L.arc(0, 4, 14, 35, 145), { c: "ink", w: "detail" });
  s += sh(rr(-8, -44, 16, 12, 5), "green", { w: "detail" }) + st(poly([[0, -44], [0, -58]]), { c: "ink", w: "detail" }) + fl(ci(0, -60, 4), "red");
  s += sh(rr(-46, 84, 92, 68, 6), "earth", { w: "prop" }) + fl(L.rect(-8, 84, 16, 68), "sand") + fl(rr(14, 112, 26, 20, 3), "white") + bar(18, 118, 18, 3, "ink", 0.5) + bar(18, 124, 12, 3, "ink", 0.5);
  return s;
}, { box: [-190, -130, 380, 300], group: "Tech & devices", label: "Delivery drone with parcel", tags: ["drone", "delivery", "parcel", "flying", "package", "quadcopter"], call: 'L.put(S, "modern-delivery-drone", x, y, { s: 1, t })' });

// ---------------------------------------------------------------- solar roof (day/night)
reg2("modern-solar-roof", "Solar panels on a roof", (o) => {
  const n = dk(o), tn = n ? 2 : 0;
  let s = L.shadow(0, 0, 360);
  s += n ? fl(crescent(160, -200, 24), "cream") + fl(ci(190, -170, 2), "white") + fl(ci(120, -214, 2), "white") : fl(ci(165, -196, 20), "yellow") + [0, 1, 2, 3, 4, 5, 6, 7].map((i) => st(L.line([165 + Math.cos(i * 0.785) * 28, -196 + Math.sin(i * 0.785) * 28], [165 + Math.cos(i * 0.785) * 38, -196 + Math.sin(i * 0.785) * 38]), { c: "yellow", w: "detail" })).join("");
  s += sh(L.rect(-160, -100, 320, 100), "wall", { tone: tn }) + sh(poly([[-180, -100], [-110, -200], [110, -200], [180, -100]], true), "red", { tone: tn });
  for (let r = 0; r < 2; r++) for (let c = 0; c < 4; c++) {
    const x = -114 + c * 58, y = -186 + r * 34;
    s += sh(rr(x, y, 54, 30, 3), "blue", { w: "detail", tone: n ? 2 : 0 }) + st(L.line([x + 27, y], [x + 27, y + 30]), { c: "white", w: "hair", op: 0.5 }) + st(L.line([x, y + 15], [x + 54, y + 15]), { c: "white", w: "hair", op: 0.5 });
    if (!n) s += fl(poly([[x + 4, y + 26], [x + 18, y + 4], [x + 30, y + 4], [x + 16, y + 26]], true), "white", 0.25);
  }
  s += sh(rr(-22, -64, 44, 64, 4), "wood", { tone: tn }) + fl(ci(12, -32, 2.5), "gold");
  [[-130, -80], [64, -80]].forEach(([x, y]) => (s += sh(rr(x, y, 54, 44, 4), n ? "yellow" : "glass", { w: "detail", tone: n ? 1 : 0 }) + st(L.line([x + 27, y], [x + 27, y + 44]), { c: "ink", w: "hair" }) + st(L.line([x, y + 22], [x + 54, y + 22]), { c: "ink", w: "hair" })));
  if (n) s += fl(ci(-103, -58, 56), "yellow", 0.1) + fl(ci(91, -58, 56), "yellow", 0.1);
  s += sh(ci(-158, -206, 18), "yellow", { w: "detail" }) + fl(bolt(-158, -206, 1.1), "ink");
  s += fl(rr(-190, -4, 380, 10, 5), "grass", 0.9);
  return s;
}, { box: [-200, -240, 400, 270], group: "Energy & power", tags: ["solar", "panels", "roof", "house", "energy", "green", "renewable"] });

// ---------------------------------------------------------------- wind turbine
const turbine = (k, x, a) => G(sh(poly([[-9, 0], [9, 0], [4, -300], [-4, -300]], true), "white", { w: "detail" }) + sh(rr(-16, -312, 44, 24, 9), "white", { w: "detail" }) +
  [0, 120, 240].map((r) => G(sh(sm([[0, -8], [9, -34], [6, -96], [1, -146], [-4, -96], [-6, -34], [0, -8]]), "white", { w: "detail" }), `translate(0 -300) rotate(${a + r})`)).join("") + sh(ci(0, -300, 12), "gray", { w: "detail" }), `translate(${x} 0) scale(${k})`);
L.reg(cat, "modern-wind-turbine", () => fl(ci(0, 0, 170, 14), "grass") + fl(ci(-90, 0, 90, 8), "green", 0.8) + turbine(0.52, 130, 70) + turbine(1, 0, 20) + fl(ci(0, -300, 3), "red"),
  { box: [-200, -470, 400, 490], group: "Energy & power", label: "Wind turbine", tags: ["wind", "turbine", "energy", "green", "renewable", "power"], call: 'L.put(S, "modern-wind-turbine", x, gy, { s: 1, t })' });

// ---------------------------------------------------------------- car (side view, faces right) used by EV + traffic
const car = (o) => {
  const c = o.color || "teal", n = dk(o), F = o.flat, S = (d, col, x) => sh(d, col, Object.assign({ flat: F }, x));
  let s = S(sm([[-196, -34], [-200, -70], [-188, -92], [-140, -104], [-90, -146], [-20, -158], [46, -150], [112, -104], [176, -92], [200, -70], [196, -34], [-196, -34]]), c, { tone: n ? 2 : 0 });
  s += S(sm([[-118, -104], [-86, -140], [-20, -150], [40, -144], [96, -104], [-118, -104]]), n ? "navy" : "glass", { w: "detail", tone: n ? 2 : 0 }) + st(L.line([-8, -148], [-8, -104]), { c: "ink", w: "detail" }) + st(L.line([-8, -100], [-8, -42]), { c: "ink", w: "hair", op: 0.5 }) + fl(rr(-30, -92, 14, 4, 2), "ink", 0.5);
  if (!F) s += fl(poly([[-80, -140], [-50, -148], [-30, -106], [-70, -106]], true), "white", n ? 0.12 : 0.4);
  [-120, 118].forEach((x) => (s += S(ci(x, -38, 38), "ink", { w: "detail" }) + (F ? "" : S(ci(x, -38, 21), "gray", { w: "hair" }) + fl(ci(x, -38, 6), "stone"))));
  s += S(rr(178, -88, 22, 11, 5), n ? "yellow" : "paper", { w: "hair" }) + S(rr(-200, -88, 14, 13, 5), "red", { w: "hair" });
  if (n) s += fl(ci(-196, -82, o.flat ? 16 : 26), "red", 0.3) + (o.cone ? fl(poly([[198, -84], [400, -130], [400, -20]], true), "yellow", 0.22) : "");
  return s;
};
reg2("modern-ev-charging", "Electric car at a charger", (o) => {
  const n = dk(o);
  let s = L.shadow(-20, 0, 560) + G(car(Object.assign({}, o, { color: "teal", cone: true })), "translate(110 0)");
  s += fl(rr(-6, -86, 18, 12, 3), "green"); // port glow (under cable end)
  s += sh(rr(-318, -190, 56, 190, 12), "white", { w: "prop", tone: n ? 2 : 0 }) + sh(rr(-308, -178, 36, 56, 6), n ? "teal" : "navy", { w: "detail", flat: true }) + fl(bolt(-290, -150, 2), n ? "white" : "yellow");
  s += bar(-304, -108, 28, 6, "gray") + fl(ci(-290, -92, 5), "green") + sh(rr(-326, -8, 72, 10, 3), "gray", { w: "detail" });
  s += st(sm([[-262, -100], [-230, -70], [-190, -28], [-130, -34], [-90, -70], [-60, -84]]), { c: "ink", w: "char" });
  s += sh(rr(-70, -94, 24, 20, 4), "green", { w: "detail" }) + (n ? fl(ci(-290, -150, 50), "teal", 0.18) : "");
  s += sh(ci(150, -228, 26), "yellow", { w: "detail" }) + fl(bolt(150, -228, 1.8), "ink");
  return s;
}, { box: [-350, -270, 780, 290], group: "Energy & power", tags: ["electric car", "ev", "charging", "charger", "green", "vehicle", "battery"] });

// ---------------------------------------------------------------- smart speaker
L.reg(cat, "modern-smart-speaker", () => {
  let s = L.shadow(0, 0, 150) + sh("M-58 -124 L-58 -12 A58 14 0 0 0 58 -12 L58 -124 Z", "stone", { w: "prop", dir: "h" });
  const r = L.rng(5);
  for (let y = -104; y < -14; y += 14) for (let x = -50; x <= 50; x += 12) s += fl(ci(x + ((y / 14) % 2 ? 6 : 0), y + (Math.abs(x) > 30 ? -Math.abs(x) * 0.02 : 0) + r() * 0, 2.2), "ink", 0.28);
  s += sh(ci(0, -124, 58, 14), "navy", { w: "prop", flat: true }) + st(ci(0, -124, 42, 9), { c: "teal", w: "char", op: 0.45 }) + st(ci(0, -124, 42, 9), { c: "teal", w: "prop" }) + fl(ci(0, -124, 5, 1.6), "white");
  [-1, 1].forEach((d) => [0, 1, 2].forEach((i) => (s += st(L.arc(d * 70, -64, 16 + i * 14, d < 0 ? 140 : -40, d < 0 ? 220 : 40), { c: "blue", w: "prop", op: 0.85 - i * 0.22 }))));
  s += sh(rr(-130, -190, 62, 36, 14), "white", { w: "detail" }) + fl(poly([[-100, -154], [-90, -140], [-86, -154]], true), "white") + fl(ci(-118, -172, 4), "gray") + fl(ci(-99, -172, 4), "gray") + fl(ci(-80, -172, 4), "gray");
  return s;
}, { box: [-150, -210, 300, 230], group: "Tech & devices", label: "Smart speaker", tags: ["smart speaker", "voice assistant", "home", "audio", "speaker"], call: 'L.put(S, "modern-smart-speaker", x, gy, { s: 1, t })' });

// ---------------------------------------------------------------- 3D printer
L.reg(cat, "modern-3d-printer", () => {
  let s = L.shadow(0, 0, 300);
  s += sh(rr(-140, -34, 280, 34, 8), "gray", { w: "prop" }) + sh(rr(-125, -250, 20, 220, 4), "gray", { w: "prop", tone: 1 }) + sh(rr(105, -250, 20, 220, 4), "gray", { w: "prop", tone: 1 }) + sh(rr(-140, -266, 280, 24, 8), "gray", { w: "prop" });
  s += fl(rr(-105, -240, 210, 200, 0), "glass", 0.3) + sh(rr(-100, -48, 200, 14, 3), "navy", { w: "detail" });
  [[68, -62], [60, -80], [50, -98], [38, -116], [28, -134], [18, -150]].forEach(([w, y]) => (s += sh(rr(-w / 2, y, w, 18, 4), "orange", { w: "hair" })));
  s += sh(rr(-110, -194, 220, 12, 3), "gray", { w: "detail", tone: 2 }) + sh(rr(10, -208, 40, 40, 6), "teal", { w: "detail" }) + sh(poly([[24, -168], [36, -168], [30, -154]], true), "ink", { w: "hair", flat: true }) + fl(ci(30, -190, 4), "yellow");
  s += sh(ci(100, -300, 34), "teal", { w: "prop" }) + sh(ci(100, -300, 12), "white", { w: "detail" }) + st(L.arc(100, -300, 24, 20, 200), { c: "teal", w: "detail", tone: 2 }) + st(sm([[80, -274], [60, -250], [44, -222], [34, -204]]), { c: "teal", w: "detail" });
  s += sh(rr(-92, -28, 70, 18, 4), "navy", { w: "detail", flat: true }) + fl(ci(-80, -19, 3), "green") + bar(-70, -22, 36, 5, "teal");
  return s;
}, { box: [-170, -340, 340, 360], group: "Tech & devices", label: "3D printer", tags: ["3d printer", "printing", "maker", "filament", "tech", "prototype"], call: 'L.put(S, "modern-3d-printer", x, gy, { s: 1, t })' });

// ---------------------------------------------------------------- ATM (day/night)
reg2("modern-atm", "ATM cash machine", (o) => {
  const n = dk(o), tn = n ? 2 : 0;
  let s = L.shadow(0, 0, 250) + (n ? [210, 180, 150].map((k) => fl(ci(0, -170, k * 0.95, k * 1.1), "teal", 0.06)).join("") : "");
  s += sh(rr(-100, -290, 200, 284, 12), "gray", { w: "prop", tone: tn }) + sh(rr(-74, -332, 148, 38, 10), "blue", { w: "prop", tone: tn }) + L.text("ATM", 0, -303, { size: 30, c: "white" });
  s += sh(rr(-80, -268, 160, 104, 8), "navy", { w: "detail", flat: true }) + fl(rr(-72, -260, 144, 88, 4), "teal", n ? 0.9 : 0.75);
  s += sh(ci(0, -226, 20), "gold", { w: "detail" }) + L.text("$", 0, -217, { size: 28, c: "ink" }) + bar(-54, -190, 108, 7, "white", 0.8) + bar(-36, -178, 72, 6, "white", 0.5);
  [-1, 1].forEach((d) => [0, 1, 2, 3].forEach((i) => (s += fl(rr(d < 0 ? -96 : 80, -258 + i * 24, 16, 10, 5), "stone"))));
  s += sh(rr(-78, -150, 92, 96, 6), "navy", { w: "detail", flat: true });
  for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) s += fl(rr(-70 + c * 28, -142 + r * 22, 24, 17, 4), "white", 0.85);
  s += sh(rr(28, -148, 56, 22, 5), "ink", { w: "detail", flat: true }) + fl(poly([[50, -142], [62, -142], [56, -132]], true), "green") + bar(32, -127, 48, 3, "yellow", n ? 1 : 0.5);
  s += sh(rr(28, -112, 56, 56, 6), "navy", { w: "detail", flat: true }) + bar(34, -102, 44, 4, "gray", 0.7) + fl(rr(34, -90, 44, 4, 2), "gray", 0.5);
  s += sh(rr(-72, -50, 144, 28, 6), "ink", { w: "detail", flat: true }) + sh(rr(-58, -56, 116, 12, 3), "green", { w: "hair", flat: true }) + sh(rr(-50, -52, 100, 8, 3), "green", { w: "hair", flat: true, tone: 1 }) + fl(rr(-64, -34, 128, 4, 2), "white", 0.2);
  return s;
}, { box: [-140, -350, 280, 370], group: "Money & shops", tags: ["atm", "cash", "bank", "money", "withdraw", "machine", "street"] });

// ---------------------------------------------------------------- vending machine (day/night)
reg2("modern-vending-machine", "Vending machine", (o) => {
  const n = dk(o), tn = n ? 2 : 0, r = L.rng(21);
  const cols = ["red", "orange", "yellow", "pink", "blue", "green", "purple", "white"];
  let s = L.shadow(0, 0, 250) + (n ? [210, 180, 150].map((k) => fl(ci(0, -160, k * 0.95, k), "yellow", 0.07)).join("") : "");
  s += sh(rr(-108, -312, 216, 306, 12), "teal", { w: "prop", tone: tn }) + sh(rr(-94, -296, 136, 212, 6), n ? "yellow" : "glass", { w: "detail", flat: true, tone: n ? 1 : 0 });
  for (let i = 0; i < 3; i++) {
    const y = -292 + i * 70;
    for (let k = 0; k < 4; k++) {
      const x = -88 + k * 33, c = cols[Math.floor(r() * cols.length)];
      if (i === 0) s += sh(rr(x, y + 18, 26, 42, 6), c, { w: "hair" }) + fl(rr(x + 3, y + 28, 20, 12, 2), "white", 0.7);
      else if (i === 1) s += sh(sm([[x, y + 60], [x + 2, y + 24], [x + 14, y + 20], [x + 26, y + 24], [x + 28, y + 60], [x, y + 60]]), c, { w: "hair" }) + fl(ci(x + 14, y + 40, 6), "white", 0.7);
      else s += sh(rr(x + 3, y + 10, 20, 50, 7), c, { w: "hair" }) + sh(rr(x + 7, y + 2, 12, 10, 3), "white", { w: "hair" });
    }
    s += sh(rr(-94, y + 60, 136, 8, 2), "gray", { w: "detail", tone: tn });
  }
  s += sh(rr(52, -296, 44, 26, 4), "navy", { w: "detail", flat: true }) + bar(58, -288, 30, 5, "green") + bar(58, -279, 18, 4, "green", 0.6);
  for (let rw = 0; rw < 3; rw++) for (let c = 0; c < 3; c++) s += fl(ci(62 + c * 14, -250 + rw * 16, 5), "white", 0.85);
  s += sh(rr(54, -196, 40, 12, 3), "ink", { w: "hair", flat: true }) + fl(rr(60, -192, 28, 3, 1.5), "yellow") + sh(rr(54, -170, 40, 48, 4), "ink", { w: "hair", flat: true });
  s += sh(rr(-94, -72, 136, 56, 8), "ink", { w: "detail", flat: true }) + fl(rr(-86, -66, 120, 6, 3), "white", 0.18) + sh(rr(-20, -50, 22, 34, 7), "red", { w: "hair" }) + sh(rr(-16, -56, 14, 8, 3), "white", { w: "hair" });
  s += sh(rr(-100, -8, 18, 8, 2), "ink", { w: "hair", flat: true }) + sh(rr(82, -8, 18, 8, 2), "ink", { w: "hair", flat: true });
  return s;
}, { box: [-150, -330, 300, 350], group: "Money & shops", tags: ["vending machine", "snacks", "drinks", "shop", "street", "coin", "machine"] });

// ---------------------------------------------------------------- supermarket aisle (scene, one-point perspective)
L.reg(cat, "modern-supermarket-aisle", () => {
  const VX = 960, VY = 470, PF = 0.3125, r = L.rng(7);
  const X = (side, p) => VX + side * 960 * p, Y = (h, p) => VY + h * p;
  const quad = (side, p0, p1, h0, h1) => [[X(side, p0), Y(h0, p0)], [X(side, p1), Y(h0, p1)], [X(side, p1), Y(h1, p1)], [X(side, p0), Y(h1, p0)]];
  let s = fl(L.rect(0, 0, 1920, 1080), "wall", 1);
  s += fl(poly([[0, 0], [1920, 0], [X(1, PF), Y(-470, PF)], [X(-1, PF), Y(-470, PF)]], true), "white");
  s += fl(poly([[X(-1, PF), Y(-470, PF)], [X(1, PF), Y(-470, PF)], [X(1, PF), Y(560, PF)], [X(-1, PF), Y(560, PF)]], true), "cream");
  [0, 1, 2].forEach((i) => (s += sh(rr(VX - 180 + i * 125, Y(-250, PF), 112, 250, 4), "glass", { w: "detail", flat: true })));
  s += fl(poly([[0, 1030], [X(-1, PF), Y(560, PF)], [X(1, PF), Y(560, PF)], [1920, 1030], [1920, 1080], [0, 1080]], true), "paper", 2);
  for (let l = -4; l <= 4; l++) s += st(L.line([VX + l * 240, 1080], [VX + l * 240 * PF, Y(560, PF)]), { c: "gray", w: "hair", op: 0.35 });
  [0.9, 0.7, 0.55, 0.44, 0.36].forEach((p) => (s += st(L.line([X(-1, p), Y(560, p)], [X(1, p), Y(560, p)]), { c: "gray", w: "hair", op: 0.35 })));
  [0.88, 0.62, 0.43].forEach((p) => {
    const q = p - 0.1; s += sh(poly([[VX - 140 * p, Y(-470, p)], [VX + 140 * p, Y(-470, p)], [VX + 140 * q, Y(-470, q)], [VX - 140 * q, Y(-470, q)]], true), "cream", { w: "detail", flat: true }) + fl(ci(VX, Y(-440, p), 120 * p, 30 * p), "yellow", 0.22);
  });
  const levels = [-300, -85, 130, 345, 560], cols = ["red", "orange", "yellow", "green", "blue", "purple", "pink", "teal", "white", "brown"];
  [-1, 1].forEach((side) => {
    s += sh(poly(quad(side, 1, PF, -420, -300), true), side < 0 ? "teal" : "orange", { w: "scene", flat: true });
    s += sh(poly(quad(side, 1, PF, -300, 560), true), "stone", { w: "scene", flat: true, tone: 1 });
    for (let k = 0; k < 4; k++) {
      let p = 0.99;
      while (p > PF + 0.05) {
        const w = 0.034 + r() * 0.03, hgt = 95 + r() * 60, bot = levels[k + 1] - 8;
        s += sh(poly(quad(side, p, Math.max(p - w, PF), bot - hgt, bot), true), cols[Math.floor(r() * cols.length)], { w: "hair", flat: true, tone: r() < 0.3 ? 1 : 0 });
        p -= w + 0.004;
      }
      s += sh(poly(quad(side, 1, PF, levels[k + 1] - 8, levels[k + 1] + 6), true), "gray", { w: "hair", flat: true, tone: 2 });
    }
  });
  s += sh(rr(VX - 110, 230, 220, 64, 12), "teal", { w: "scene" }) + L.text("AISLE 7", VX, 276, { size: 42, c: "white" });
  return s;
}, { box: [0, 0, 1920, 1080], group: "Shops & services", wide: true, label: "Supermarket aisle", tags: ["supermarket", "shop", "aisle", "shelves", "grocery", "store", "scene"], call: 'L.put(S, "modern-supermarket-aisle", 0, 0, { t })' });

// ---------------------------------------------------------------- parcel lockers
L.reg(cat, "modern-parcel-lockers", () => {
  const cw = 88, rh = 78, cols = ["orange", "white", "teal", "white", "orange", "white", "teal", "orange"], r = L.rng(3);
  let s = L.shadow(0, 0, 540) + sh(rr(-248, -340, 496, 334, 10), "gray", { w: "prop" });
  let n = 1;
  [-1, 1].forEach((side) => {
    for (let c = 0; c < 2; c++) for (let rw = 0; rw < 4; rw++) {
      const x = side < 0 ? -60 - (c + 1) * cw : 60 + c * cw, y = -332 + rw * rh, open = side > 0 && c === 1 && rw === 2;
      if (open) {
        s += sh(rr(x + 3, y + 3, cw - 6, rh - 6, 4), "navy", { w: "detail", flat: true }) + sh(rr(x + 14, y + 36, 50, 34, 4), "earth", { w: "hair" }) + fl(L.rect(x + 36, y + 36, 8, 34), "sand") +
          sh(poly([[x + cw - 3, y + 3], [x + cw + 30, y - 6], [x + cw + 30, y + rh - 12], [x + cw - 3, y + rh - 3]], true), "orange", { w: "detail" });
      } else {
        s += sh(rr(x + 3, y + 3, cw - 6, rh - 6, 6), cols[(c * 3 + rw * 5 + (side > 0 ? 1 : 0)) % cols.length], { w: "detail" }) + L.text(String(n), x + 20, y + 28, { size: 22, c: "ink" }) + fl(rr(x + cw - 24, y + rh / 2 - 3, 12, 5, 2.5), "ink", 0.6);
      }
      n++;
    }
  });
  s += sh(rr(-58, -334, 116, 328, 8), "navy", { w: "prop", tone: 0 }) + sh(rr(-48, -322, 96, 104, 6), "teal", { w: "detail", flat: true, tone: 1 }) + sh(ci(0, -278, 24), "green", { w: "detail" }) + st(poly([[-11, -278], [-3, -268], [13, -290]]), { c: "white", w: "char" }) + bar(-34, -240, 68, 6, "white", 0.8) + bar(-24, -228, 48, 5, "white", 0.5);
  s += sh(rr(-38, -202, 76, 76, 6), "white", { w: "detail" });
  for (let i = 0; i < 40; i++) { const x = -32 + (i % 7) * 9, y = -196 + Math.floor(i / 7) * 9; if (r() > 0.45) s += fl(L.rect(x, y, 7, 7), "ink"); }
  s += sh(rr(-40, -112, 80, 22, 5), "ink", { w: "detail", flat: true }) + fl(rr(-30, -104, 60, 4, 2), "green") + sh(rr(-44, -70, 88, 50, 6), "gray", { w: "detail", tone: 2, flat: true }) + fl(ci(0, -46, 6), "green");
  return s;
}, { box: [-290, -360, 580, 380], group: "Shops & services", label: "Parcel lockers", tags: ["parcel", "lockers", "delivery", "pickup", "package", "kiosk", "shop"], call: 'L.put(S, "modern-parcel-lockers", x, gy, { s: 1, t })' });

// ---------------------------------------------------------------- traffic jam street (day / sunset / night)
const TR = {
  day: { sky: "sky", bld: ["stone", "wall", "sand", "gray"], tone: 0, road: ["gray", 2], walk: ["stone", 1] },
  sunset: { sky: "dusk", bld: ["purple", "brown", "stone", "navy"], tone: 2, road: ["gray", 2], walk: ["stone", 2] },
  night: { sky: "night", bld: ["navy", "night", "navy", "navy"], tone: 0, road: ["ink", 0], walk: ["navy", 2] },
};
const jam = (o) => {
  const t = TR[o.time] || TR.day, n = o.time === "night", ss = o.time === "sunset", r = L.rng(11), carCols = ["red", "blue", "yellow", "teal", "orange", "purple", "green", "gray"];
  let s = `<g transform="matrix(1 0 0 -1 0 720)">${L.tag("rect", { x: 0, y: 0, width: 1920, height: 720, fill: L.paint(t.sky, { dir: "v" }) })}</g>`;
  if (n) { let d = ""; for (let i = 0; i < 36; i++) d += ci(r() * 1920, r() * 480, 1.5 + r() * 2.5); s += fl(d, "white", 0.9) + fl(crescent(1500, 180, 62), "cream") + fl(ci(1500, 180, 150), "cream", 0.06); }
  else if (ss) s += fl(ci(640, 640, 190), "orange", 0.25) + fl(ci(640, 640, 120), "orange") + fl(ci(1500, 200, 70), "pink", 0.5);
  else s += fl(ci(1500, 170, 100), "yellow", 0.25) + fl(ci(1500, 170, 66), "yellow") + [[300, 150, 1], [820, 250, 0.8], [1180, 110, 0.7]].map(([x, y, k]) => fl(ci(x, y, 60 * k, 34 * k) + ci(x + 60 * k, y + 10 * k, 50 * k, 30 * k) + ci(x - 60 * k, y + 14 * k, 44 * k, 26 * k), "white", 0.95)).join("");
  let x = -20, bi = 0;
  while (x < 1920) {
    const w = 150 + r() * 130, h = 200 + r() * 260, top = 700 - h, c = t.bld[bi++ % t.bld.length];
    s += sh(L.rect(x, top, w, h), c, { w: "scene", tone: t.tone, flat: true });
    let lit = "", dim = "";
    for (let yy = top + 30; yy < 650; yy += 80) for (let xx = x + 22; xx < x + w - 40; xx += 60) { const rect = L.rect(xx, yy, 28, 34); if (n ? r() < 0.55 : ss ? r() < 0.4 : false) lit += rect; else dim += rect; }
    s += fl(dim, n ? "navy" : "glass", n ? 1 : 0.9) + (lit ? fl(lit, n ? "yellow" : "orange") : "");
    x += w + 8;
  }
  s += fl(L.rect(0, 700, 1920, 70), t.walk[0] === "stone" ? "stone" : t.walk[0], 1) + (t.walk[1] ? fl(L.rect(0, 700, 1920, 70), "ink", t.walk[1] === 1 ? 0 : 0.18) : "") + st(L.line([0, 770], [1920, 770]), { c: "ink", w: "scene" });
  s += fl(L.rect(0, 772, 1920, 308), t.road[0], 1) + (t.road[1] ? fl(L.rect(0, 772, 1920, 308), "ink", 0.12) : "");
  let d = ""; for (let xx = 20; xx < 1920; xx += 200) d += L.rrect(xx, 918, 120, 12, 6); s += fl(d, "white", 0.8);
  // street lamps + traffic light
  [260, 980, 1620].forEach((lx) => { s += sh(L.rect(lx - 6, 560, 12, 212), "gray", { w: "detail", tone: 2, flat: true }) + st(sm([[lx, 566], [lx + 30, 548], [lx + 66, 552]]), { c: "gray", w: "prop" }) + sh(rr(lx + 46, 548, 40, 16, 7), n || ss ? "yellow" : "white", { w: "detail", flat: true }) + (n || ss ? fl(ci(lx + 66, 560, 90, 80), "yellow", n ? 0.2 : 0.14) : ""); });
  s += sh(L.rect(1842, 520, 12, 252), "gray", { w: "detail", tone: 2, flat: true }) + sh(rr(1820, 440, 56, 130, 12), "ink", { w: "prop", flat: true }) + fl(ci(1848, 468, 15), "red") + fl(ci(1848, 505, 15), "yellow", 0.25) + fl(ci(1848, 542, 15), "green", 0.25) + (n || ss ? fl(ci(1848, 468, 60), "red", 0.25) : "");
  const car2 = (cx, gy, k, c, i) => G(car({ color: c, flat: true, time: o.time === "night" ? "night" : "day" }), `translate(${cx} ${gy}) scale(${k})`);
  for (let i = 0; i < 8; i++) s += car2(1850 - i * 232, 884, 0.52, carCols[(i + 3) % carCols.length]);
  for (let i = 0; i < 6; i++) s += car2(1730 - i * 345, 1046, 0.78, carCols[i % carCols.length]);
  s += fl(ci(620, 1010, 22, 16) + ci(590, 990, 16, 12) + ci(640, 980, 12, 9), "stone", 0.55) + fl(ci(270, 1010, 22, 16) + ci(238, 992, 14, 10), "stone", 0.55);
  return s;
};
["day", "sunset", "night"].forEach((t) => L.reg(cat, `modern-traffic-jam-${t}`, (o) => jam(Object.assign({ time: t }, o)), { box: [0, 0, 1920, 1080], group: "Street & transport", wide: true, label: `Traffic jam · ${t}`, demo: { time: t },
  tags: ["traffic", "jam", "cars", "city", "commute", "rush hour", "street", "scene"], call: `L.put(S, "modern-traffic-jam-${t}", 0, 0, { t })` }));

// ---------------------------------------------------------------- office cubicle desk (light / dark)
reg2("modern-cubicle-desk", "Office cubicle desk", (o) => {
  const n = dk(o), tn = n ? 2 : 0;
  let s = L.shadow(0, 0, 580);
  s += sh(rr(-286, -310, 572, 262, 10), n ? "night" : "sky", { w: "prop", tone: tn }) + sh(rr(-286, -310, 572, 22, 10), "gray", { w: "detail", tone: tn });
  [["yellow", -250, -260, -4], ["pink", -222, -236, 3], ["green", 200, -266, 2], ["yellow", 232, -236, -3]].forEach(([c, x, y, a]) => (s += G(sh(rr(0, 0, 30, 30, 2), c, { w: "hair", tone: tn }) + bar(5, 8, 20, 3, "ink", 0.5) + bar(5, 15, 14, 3, "ink", 0.5), `translate(${x} ${y}) rotate(${a})`)));
  s += sh(rr(130, -270, 56, 44, 3), "white", { w: "detail", tone: tn }) + fl(L.rect(134, -266, 48, 24), "sky") + fl(sm([[134, -242], [150, -256], [162, -246], [182, -262], [182, -242]]), "green");
  s += sh(rr(-290, -52, 580, 16, 4), "wood", { w: "prop", tone: tn }) + sh(rr(120, -36, 164, 36, 3), "wood", { w: "detail", tone: tn }) + sh(rr(-284, -36, 12, 36, 2), "gray", { w: "detail" }) + fl(rr(160, -26, 84, 4, 2), "ink", 0.35);
  s += sh(rr(-62, -126, 16, 72, 3), "gray", { w: "detail" }) + sh(rr(-100, -58, 92, 8, 3), "gray", { w: "detail" });
  s += sh(rr(-158, -246, 190, 122, 10), "ink", { w: "prop", flat: true }) + sh(rr(-148, -236, 170, 100, 4), n ? "navy" : "glass", { w: "hair", flat: true, tone: n ? 1 : 0 });
  [["teal", 40], ["orange", 70], ["pink", 52], ["blue", 90]].forEach(([c, h], i) => (s += fl(rr(-134 + i * 36, -148 - h, 26, h, 3), c, n ? 1 : 0.95)));
  s += fl(rr(-140, -156, 160, 3, 1.5), "gray", 0.6) + (n ? fl(ci(-64, -186, 140, 90), "sky", 0.14) : fl(poly([[-148, -236], [-90, -236], [-130, -136], [-148, -136]], true), "white", 0.35));
  s += sh(rr(-130, -66, 110, 14, 5), "white", { w: "detail", tone: tn }) + sh(ci(10, -60, 8, 6), "white", { w: "detail", tone: tn });
  s += sh(rr(96, -102, 40, 50, 9), "orange", { w: "detail", tone: tn }) + st(L.arc(140, -78, 12, -80, 90), { c: "ink", w: "detail" }) + st(sm([[108, -112], [102, -126], [110, -140]]), { c: "gray", w: "detail", op: 0.6 }) + st(sm([[124, -112], [118, -128], [126, -142]]), { c: "gray", w: "detail", op: 0.6 });
  s += sh(rr(188, -84, 36, 32, 4), "brown", { w: "detail", tone: tn }) + [-24, 0, 24].map((d) => sh(sm([[206, -84], [206 + d, -112 - Math.abs(d) * 0.4], [206 + d * 0.4, -134], [206, -84]]), "green", { w: "detail", tone: tn })).join("");
  s += sh(rr(-258, -58, 44, 8, 3), "gray", { w: "detail" }) + st(sm([[-236, -58], [-250, -112], [-210, -164]]), { c: "gray", w: "prop" }) + sh(sm([[-224, -172], [-190, -176], [-176, -150], [-212, -150], [-224, -172]]), "yellow", { w: "detail", tone: n ? 1 : 0 }) + (n ? fl(poly([[-212, -150], [-176, -150], [-130, -64], [-240, -64]], true), "yellow", 0.22) : "");
  return s;
}, { box: [-310, -330, 620, 350], group: "Office & home", tags: ["cubicle", "office", "desk", "work", "monitor", "workspace", "9 to 5"] }, ["light", "dark"]);

// ---------------------------------------------------------------- home workout corner
L.reg(cat, "modern-home-workout", () => {
  let s = fl(L.rect(-250, -210, 500, 210), "wall", 1) + fl(L.rect(-250, -34, 500, 34), "floor") + fl(L.rect(-250, -38, 500, 5), "wood", 1);
  s += sh(rr(70, -190, 110, 100, 6), "glass", { w: "detail" }) + st(L.line([125, -190], [125, -90]), { c: "ink", w: "hair" }) + st(L.line([70, -140], [180, -140]), { c: "ink", w: "hair" }) + fl(poly([[84, -176], [112, -176], [96, -130]], true), "white", 0.6);
  s += sh(poly([[-160, -30], [120, -30], [160, -4], [-200, -4]], true), "purple", { w: "prop" }) + fl(poly([[-120, -24], [100, -24], [112, -18], [-134, -18]], true), "white", 0.25);
  s += sh(rr(-232, -52, 34, 18, 9), "purple", { w: "detail", tone: 2 }) + sh(ci(-228, -43, 9), "purple", { w: "detail", tone: 1 });
  [[-30, 1], [70, 1]].forEach(([x]) => { s += st(L.line([x - 26, -16], [x + 26, -16]), { c: "gray", w: "prop" }) + sh(rr(x - 40, -36, 16, 40, 5), "red", { w: "detail" }) + sh(rr(x + 24, -36, 16, 40, 5), "red", { w: "detail" }); });
  s += sh(rr(-134, -86, 46, 62, 6), "navy", { w: "prop" }) + fl(rr(-130, -82, 38, 54, 3), "teal") + L.text("20:00", -111, -50, { size: 15, c: "white" }) + st(poly([[-122, -24], [-132, -8]]), { c: "ink", w: "detail" }) + st(poly([[-100, -24], [-92, -8]]), { c: "ink", w: "detail" }) + fl(ci(-111, -68, 3), "white", 0.6);
  s += sh(rr(204, -92, 26, 62, 9), "sky", { w: "detail" }) + sh(rr(210, -104, 14, 14, 3), "white", { w: "detail" }) + fl(rr(208, -62, 18, 3, 1.5), "white", 0.6);
  s += sh(rr(-246, -150, 38, 30, 4), "brown", { w: "detail" }) + [-14, 0, 14].map((d) => sh(sm([[-227, -150], [-227 + d, -176 - Math.abs(d)], [-227 + d * 0.3, -192], [-227, -150]]), "green", { w: "detail" })).join("");
  return s;
}, { box: [-260, -220, 520, 230], group: "Office & home", label: "Home workout corner", tags: ["workout", "exercise", "home", "mat", "dumbbells", "fitness", "yoga", "gym"], call: 'L.put(S, "modern-home-workout", x, gy, { s: 1, t })' });

// ---------------------------------------------------------------- modern kitchen counter with gadgets
L.reg(cat, "modern-kitchen-gadgets", () => {
  let s = fl(L.rect(-330, -330, 660, 330), "wall", 1) + (() => { let d = ""; for (let x = -330; x <= 330; x += 66) d += L.line([x, -330], [x, -150]); for (let y = -330; y <= -150; y += 45) d += L.line([-330, y], [330, y]); return st(d, { c: "gray", w: "hair", op: 0.3 }); })();
  s += sh(rr(-310, -130, 620, 130, 6), "wood", { w: "prop" }) + [-1, 0, 1].map((i) => sh(rr(-298 + (i + 1) * 202, -118, 194, 112, 5), "wood", { w: "detail", tone: 1 }) + fl(rr(-25 + i * 202, -112, 50, 6, 3), "gray")).join("") + sh(rr(-320, -154, 640, 26, 5), "stone", { w: "prop", tone: 1 });
  // tablet recipe
  s += sh(rr(-80, -300, 130, 94, 8), "ink", { w: "prop", flat: true }) + fl(rr(-72, -292, 114, 78, 4), "cream") + fl(rr(-66, -286, 40, 40, 4), "orange") + fl(ci(-46, -266, 12), "yellow") + bar(-18, -282, 52, 7, "ink", 0.6) + bar(-18, -268, 40, 6, "gray") + bar(-18, -255, 48, 6, "gray") + bar(-66, -238, 100, 6, "gray", 0.6) + bar(-66, -226, 70, 6, "gray", 0.6);
  s += G(L.inline("prop-kettle"), "translate(-250 -222) scale(0.95)") + G(L.inline("prop-toaster"), "translate(212 -214) scale(0.85)") + G(L.inline("prop-blender"), "translate(288 -226) scale(0.8)");
  // coffee machine
  s += sh(rr(-176, -296, 90, 144, 12), "ink", { w: "prop", flat: true }) + sh(rr(-166, -286, 70, 40, 6), "gray", { w: "detail", tone: 0 }) + fl(ci(-140, -266, 8), "red") + fl(ci(-118, -266, 4), "green") + sh(rr(-166, -230, 70, 40, 4), "navy", { w: "hair", flat: true }) + sh(rr(-150, -192, 38, 40, 3), "white", { w: "detail" }) + fl(rr(-148, -190, 34, 10, 2), "brown") + st(poly([[-131, -232], [-131, -208]]), { c: "brown", w: "prop" });
  s += sh(rr(-176, -156, 90, 6, 2), "gray", { w: "detail" }) + st(L.arc(-111, -172, 11, -60, 80), { c: "ink", w: "detail" });
  // air fryer
  s += G(sh(sm([[18, -156], [14, -230], [40, -266], [90, -266], [112, -230], [108, -156], [18, -156]]), "navy", { w: "prop", tone: 1 }) + fl(rr(32, -246, 62, 14, 7), "gray", 0.5) + sh(ci(63, -194, 20), "gray", { w: "detail" }) + st(L.line([63, -194], [74, -204]), { c: "ink", w: "detail" }) + fl(ci(63, -194, 3), "ink") + bar(40, -172, 46, 5, "red"), "translate(24 0)");
  return s;
}, { box: [-340, -340, 680, 360], group: "Office & home", label: "Kitchen counter with gadgets", tags: ["kitchen", "counter", "gadgets", "coffee machine", "air fryer", "toaster", "appliances", "home"], call: 'L.put(S, "modern-kitchen-gadgets", x, gy, { s: 1, t })' });

// ---------------------------------------------------------------- robot vacuum
L.reg(cat, "modern-robot-vacuum", () => {
  let s = L.shadow(0, 0, 270);
  s += fl(ci(-160, -8, 16, 9) + ci(-138, -20, 10, 7), "stone", 0.55) + fl(ci(150, 4, 3) + ci(164, 6, 2.5) + ci(176, 3, 2), "brown", 0.8);
  s += sh("M-114 -36 L-114 -20 A114 24 0 0 0 114 -20 L114 -36 Z", "gray", { w: "prop", tone: 1 }) + sh(ci(0, -36, 114, 32), "white", { w: "prop" }) + sh(ci(0, -36, 92, 22), "gray", { w: "detail", tone: 1, flat: true });
  s += sh(ci(-38, -42, 20, 10), "navy", { w: "detail", flat: true }) + st(ci(-38, -42, 12, 5), { c: "teal", w: "detail" }) + sh(ci(34, -34, 15, 7), "navy", { w: "detail", flat: true }) + fl(ci(34, -34, 3), "green");
  s += st(L.arc(0, -36, 106, -35, 35, 29), { c: "teal", w: "char" });
  s += st(poly([[104, -8], [124, -2]]), { c: "gray", w: "prop" }) + st(poly([[100, -2], [118, 8]]), { c: "gray", w: "detail" }) + st(poly([[110, -14], [130, -14]]), { c: "gray", w: "detail" });
  return s;
}, { box: [-180, -110, 360, 130], group: "Tech & devices", label: "Robot vacuum", tags: ["robot vacuum", "cleaning", "smart home", "vacuum", "floor", "gadget"], call: 'L.put(S, "modern-robot-vacuum", x, gy, { s: 1, t })' });
})();
