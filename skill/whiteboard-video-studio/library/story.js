// ===================== library/story.js — storytelling devices for "What If" explainers (split screens, title cards, reveals, progress) =====================
// Full-frame assets box [0,0,1920,1080] (origin top-left, calm middle for characters); the rest are centred (or stand on y=0).
(function () {
const L = window.L, f1 = L.f1;
const W = 1920, H = 1080, PI = Math.PI;
const CAT = "story";

// ---------- helpers ----------
const cid = () => "sc" + (L._n = (L._n || 0) + 1);
const slot = (d, inner) => { const id = cid(); return `<clipPath id="${id}"><path d="${d}"/></clipPath><g clip-path="url(#${id})">${inner}</g>`; };
const content = (o, dflt) => (o.inner !== undefined ? o.inner : o.scene ? L.inline(o.scene, o.sceneOpts || {}) : dflt());
const lines = (s) => String(s).split("|");
const topRound = (x, y, w, h, r) => { r = Math.min(r * L.T.radius, w / 2, h); if (r <= 0.5) return L.rect(x, y, w, h); return `M${f1(x)} ${f1(y + h)} V${f1(y + r)} A${f1(r)} ${f1(r)} 0 0 1 ${f1(x + r)} ${f1(y)} H${f1(x + w - r)} A${f1(r)} ${f1(r)} 0 0 1 ${f1(x + w)} ${f1(y + r)} V${f1(y + h)} Z`; };
const ring = (cx, cy, ro, ri) => `${L.circ(cx, cy, ro)} M${f1(cx - ri)} ${f1(cy)} A${f1(ri)} ${f1(ri)} 0 1 1 ${f1(cx + ri)} ${f1(cy)} A${f1(ri)} ${f1(ri)} 0 1 1 ${f1(cx - ri)} ${f1(cy)} Z`;
const edge = (d, c, w = "prop") => L.tag("path", { d, fill: "none", stroke: L.outline(c), "stroke-width": L.lw(w), "stroke-linejoin": L.T.join }); // outline only, follows the Look
const wt = (str, x, y, size, o = {}) => L.text(str, x, y, Object.assign({ size, c: "white", halo: "ink" }, o)); // white text with ink halo
const tab = (cx, cy, w, h, str, c, size) => L.shape(L.rrect(cx - w / 2, cy - h / 2, w, h, h / 2), c, { w: "prop" }) + wt(str, cx, cy + size * 0.34, size);
const panel = (x, y, w, h, c, ground) => {
  const d = L.rrect(x, y, w, h, 36);
  return L.shape(d, c, { w: "scene", dir: "v" }) + (ground ? slot(d, L.flat(L.rect(x, y + h * 0.8, w, h * 0.2), "ink", 0.1)) : "");
};
const reg = (name, fn, meta) => L.reg(CAT, name, fn, Object.assign({ tags: ["story"] }, meta));
const FULL = [0, 0, W, H];

// ---------- split screens, before/after ----------
reg("story-split-2", (o) => {
  const g = o.ground !== false;
  return panel(40, 70, 890, 970, o.ca || "sky", g) + panel(990, 70, 890, 970, o.cb || "dusk", g) +
    (o.left ? tab(485, 70, 520, 96, o.left, o.tabL || "blue", 54) : "") + (o.right ? tab(1435, 70, 520, 96, o.right, o.tabR || "orange", 54) : "");
}, { box: FULL, group: "Frames and splits", wide: true, label: "Split screen (2)", tags: ["story", "compare", "panels", "frame"], demo: { left: "Home", right: "Work" },
  call: 'L.put(S, "story-split-2", 0, 0, { t, left: "Home", right: "Work", ca: "sky", cb: "dusk", ground: true })  // panels x 40-930 and 990-1880, y 70-1040' });

reg("story-split-3", (o) => {
  const w = 593, g = o.ground !== false, c = o.c || ["sky", "dusk", "grass"], t = o.labels || ["", "", ""], tc = ["blue", "orange", "green"];
  return [0, 1, 2].map((i) => panel(40 + i * (w + 30), 70, w, 970, c[i], g)).join("") + [0, 1, 2].map((i) => t[i] === "" ? "" : tab(40 + i * (w + 30) + w / 2, 70, 420, 90, t[i], tc[i], 50)).join("");
}, { box: FULL, group: "Frames and splits", wide: true, label: "Split screen (3)", tags: ["story", "compare", "panels", "frame"], demo: { labels: ["Past", "Now", "Future"] },
  call: 'L.put(S, "story-split-3", 0, 0, { t, labels: ["A","B","C"], c: ["sky","dusk","grass"] })  // panels 593 wide at x 40, 663, 1286' });

reg("story-before-after", (o) => {
  const g = o.ground !== false, arrow = L.poly([[870, 470], [980, 470], [980, 410], [1090, 540], [980, 670], [980, 610], [870, 610]], true);
  return panel(40, 70, 820, 970, o.cl || "dusk", g) + panel(1060, 70, 820, 970, o.cr || "sky", g) + L.shape(arrow, "gold", { w: "prop" }) +
    tab(450, 70, 440, 96, o.before || "BEFORE", "gray", 56) + tab(1470, 70, 440, 96, o.after || "AFTER", "green", 56);
}, { box: FULL, group: "Frames and splits", wide: true, label: "Before / after frame", tags: ["story", "compare", "panels", "frame"], demo: {},
  call: 'L.put(S, "story-before-after", 0, 0, { t, before: "BEFORE", after: "AFTER", cl: "dusk", cr: "sky" })  // panels x 40-860 and 1060-1880, y 70-1040' });

// ---------- title cards ----------
reg("story-card-meanwhile", (o) => {
  const r = L.rng(11); let stars = "";
  for (let i = 0; i < 40; i++) { const x = 60 + r() * (W - 120), y = 170 + r() * 740, rr = 3 + r() * 4; if (Math.abs(y - 540) < 190 && Math.abs(x - 960) < 760) continue; stars += L.flat(L.star(x, y, rr * 1.8, rr * 0.7, 4), "gold", 0.8); }
  return L.flat(L.rect(0, 0, W, H), "navy") + stars + L.flat(L.rect(0, 0, W, 150), "ink") + L.flat(L.rect(0, H - 150, W, 150), "ink") +
    L.stroke(L.line([560, 380], [1360, 380]), { c: "gold", w: "prop" }) + L.stroke(L.line([560, 700], [1360, 700]), { c: "gold", w: "prop" }) +
    L.text(o.text || "MEANWHILE...", 960, 590, { size: o.size || 170, c: "paper", halo: "ink" });
}, { box: FULL, group: "Title cards", wide: true, label: "Card: Meanwhile", tags: ["story", "title", "transition", "meanwhile"], demo: {},
  call: 'L.put(S, "story-card-meanwhile", 0, 0, { t, text: "MEANWHILE...", size })' });

reg("story-card-years-later", (o) => {
  const hg = L.g(L.shape(L.rrect(-100, -158, 200, 30, 12), "wood", { w: "prop" }) + L.shape(L.rrect(-100, 128, 200, 30, 12), "wood", { w: "prop" }) +
    L.stroke(L.line([-84, -128], [-84, 128]), { c: "wood", w: "char" }) + L.stroke(L.line([84, -128], [84, 128]), { c: "wood", w: "char" }) +
    L.shape("M-70 -128 H70 C70 -52 12 -22 12 0 C12 22 70 52 70 128 H-70 C-70 52 -12 22 -12 0 C-12 -22 -70 -52 -70 -128 Z", "glass", { w: "detail" }) +
    L.flat("M-54 -114 H54 C48 -72 12 -44 8 -10 H-8 C-12 -44 -48 -72 -54 -114 Z", "gold") + L.flat("M-62 120 H62 C50 94 20 74 0 74 C-20 74 -50 94 -62 120 Z", "gold") +
    L.stroke("M0 -8 V74", { c: "gold", w: "detail" }), "translate(960 330) scale(1.25)");
  return L.flat(L.rect(0, 0, W, H), "cream") + L.flat(ring(960, 540, 1250, 900), "sand", 0.45) +
    L.stroke(L.rrect(48, 48, W - 96, H - 96, 40), { c: "earth", w: "scene" }) + L.stroke(L.rrect(72, 72, W - 144, H - 144, 28), { c: "earth", w: "detail" }) +
    hg + L.text(o.text || "5 YEARS LATER", 960, 800, { size: o.size || 160, c: "brown" });
}, { box: FULL, group: "Title cards", wide: true, label: "Card: Years later", tags: ["story", "title", "transition", "time skip", "hourglass"], demo: {},
  call: 'L.put(S, "story-card-years-later", 0, 0, { t, text: "5 YEARS LATER", size })' });

reg("story-card-on-paper", (o) => {
  let grid = "";
  for (let x = 0; x <= W; x += 60) grid += L.stroke(L.line([x, 0], [x, H]), { c: "blue", w: "hair", op: 0.18 });
  for (let y = 0; y <= H; y += 60) grid += L.stroke(L.line([0, y], [W, y]), { c: "blue", w: "hair", op: 0.18 });
  const pencil = L.g(L.shape(L.rrect(-260, -28, 430, 56, 8), "yellow", { w: "prop" }) + L.shape(L.rect(170, -28, 44, 56), "gray", { w: "detail" }) + L.shape(L.rrect(214, -28, 50, 56, 12), "pink", { w: "detail" }) +
    L.shape(L.poly([[-260, -28], [-350, 0], [-260, 28]], true), "sand", { w: "detail" }) + L.shape(L.poly([[-318, -10], [-350, 0], [-318, 10]], true), "ink", { w: "hair" }), "translate(1480 900) rotate(-18)");
  return L.flat(L.rect(0, 0, W, H), "paper") + grid + L.stroke(L.line([150, 0], [150, H]), { c: "red", w: "detail", op: 0.5 }) +
    L.text(o.text || "ON PAPER...", 960, 580, { size: o.size || 190, c: "blue" }) +
    L.stroke(L.smooth([[480, 640], [700, 655], [940, 638], [1180, 656], [1440, 640]]), { c: "red", w: "prop" }) + pencil;
}, { box: FULL, group: "Title cards", wide: true, label: "Card: On paper", tags: ["story", "title", "transition", "graph paper", "theory"], demo: {},
  call: 'L.put(S, "story-card-on-paper", 0, 0, { t, text: "ON PAPER...", size })' });

// ---------- dream, flashback ----------
reg("story-dream-bubble", (o) => {
  const rx = 300, ry = 220, n = 96, k = 4, amp = 0.1, sx = o.tail === "right" ? -1 : 1;
  const pts = Array.from({ length: n }, (_, i) => { const a = (i / n) * 2 * PI, r = 1 - amp + amp * Math.abs(Math.sin(k * a)); return [Math.cos(a) * rx * r, Math.sin(a) * ry * r]; });
  pts.push(pts[0]);
  const win = L.circ(0, 0, 238, 162), r = L.rng(5);
  const dflt = () => {
    let s = L.flat(L.rect(-245, -170, 490, 340), "night");
    for (let i = 0; i < 12; i++) s += L.flat(L.star(-200 + r() * 400, -140 + r() * 170, 9, 4, 4), "white", 0.9);
    return s + L.shape(L.circ(110, -70, 46), "cream", { w: "detail" }) + L.flat(L.smooth([[-245, 110], [-120, 70], [20, 105], [160, 70], [245, 100], [245, 170], [-245, 170], [-245, 110]]), "grass");
  };
  const dots = [[-255, 255, 36], [-318, 322, 23], [-358, 372, 14]].map(([x, y, rr]) => L.shape(L.circ(x * sx, y, rr), "white", { w: "prop" })).join("");
  return L.shape(L.smooth(pts), "white", { w: "prop" }) + L.shape(win, "white", { w: "detail", flat: true }) + slot(win, content(o, dflt)) + edge(win, "white", "detail") + dots;
}, { box: [-420, -260, 840, 660], group: "Frames and splits", label: "Dream bubble (mini scene slot)", tags: ["story", "dream", "thought", "imagine", "bubble"], demo: {},
  call: 'L.put(S, "story-dream-bubble", x, y, { s, t, scene: "scene-beach-day" | inner: "<svg markup within window ±240×±160>", tail: "left"|"right" })' });

reg("story-flashback-frame", (o) => {
  const r = L.rng(23), step = 48, ins = () => 70 + (r() - 0.5) * 34, p = [];
  p.push([70, 70]);
  for (let x = step; x < W - step; x += step) p.push([x, ins()]);
  p.push([W - 70, 70]);
  for (let y = step; y < H - step; y += step) p.push([W - ins(), y]);
  p.push([W - 70, H - 70]);
  for (let x = W - step; x > step; x -= step) p.push([x, H - ins()]);
  p.push([70, H - 70]);
  for (let y = H - step; y > step; y -= step) p.push([ins(), y]);
  const band = L.poly([[0, 0], [W, 0], [W, H], [0, H]], true) + " " + L.poly(p.slice().reverse(), true);
  const tape = L.g(L.shape(L.rrect(-190, -40, 380, 80, 8), "cream", { w: "detail" }) + L.text(o.text === undefined ? "FLASHBACK" : o.text, 0, 18, { size: 52, c: "brown" }), "translate(260 84) rotate(-3)");
  return L.flat(L.rect(0, 0, W, H), "earth", 0.2) + L.flat(band, "sand") + L.stroke(L.poly(p, true), { c: "earth", w: "detail" }) + tape;
}, { box: FULL, group: "Frames and splits", wide: true, label: "Flashback frame (sepia, torn)", tags: ["story", "flashback", "memory", "past", "torn"], demo: {},
  call: 'L.put(S, "story-flashback-frame", 0, 0, { t, text: "FLASHBACK" })  // overlay: draw it above the scene' });

// ---------- countdown, calendar ----------
reg("story-countdown", (o) => {
  const p = Math.max(0, Math.min(1, o.pct === undefined ? 0.6 : o.pct)), a = -90 + 360 * p, R = 150;
  const ex = Math.cos((a * PI) / 180) * R, ey = Math.sin((a * PI) / 180) * R;
  const wedge = p >= 0.999 ? L.circ(0, 0, R) : p <= 0.001 ? "" : `M0 0 L0 ${-R} A${R} ${R} 0 ${p > 0.5 ? 1 : 0} 1 ${f1(ex)} ${f1(ey)} Z`;
  return L.shape(L.rrect(-24, -214, 48, 44, 10), "gray", { w: "prop" }) + L.shape(L.circ(0, 0, R), "white", { w: "prop" }) + (wedge ? L.shape(wedge, o.c || "red", { w: "detail" }) : "") +
    L.shape(L.circ(0, 0, 102), "white", { w: "prop" }) + L.text(o.n === undefined ? 3 : o.n, 0, 52, { size: 150, weight: 800 });
}, { box: [-190, -230, 380, 420], group: "Counters and progress", label: "Countdown clock", tags: ["story", "timer", "countdown", "clock", "deadline"], demo: { n: 3, pct: 0.6 },
  call: 'L.put(S, "story-countdown", x, y, { s, t, n: 3, pct: 0.6 (share of the ring left), c: "red" })' });

const KS = [1, 0.55, 0.1, -0.25, -0.45, null]; // page-A hinge squash per frame; null = page gone
const calFlip = (o) => {
  const fr = ((o.frame || 0) % 6 + 6) % 6, day = o.day === undefined ? 14 : o.day, mon = o.month || "MAY", sw = (c) => ({ w: "prop", tone: c });
  const page = (d, back) => back ? L.shape(L.rrect(-170, -200, 340, 400, 20), "paper", sw(2)) :
    L.shape(L.rrect(-170, -200, 340, 400, 20), "paper", { w: "prop" }) + L.shape(topRound(-170, -200, 340, 96, 20), "red", { w: "prop" }) + wt(mon, 0, -133, 56) + L.text(d, 0, 110, { size: 230, weight: 800 });
  const k = KS[fr];
  const top = k === null ? "" : L.g(page(day, k < 0), `translate(0 -200) scale(1 ${k}) translate(0 200)`);
  const rings = [-90, 90].map((x) => L.shape(L.circ(x, -205, 17), "gray", { w: "detail" })).join("");
  return L.shape(L.rrect(-190, -220, 380, 440, 24), "stone", { w: "prop" }) + page(day + 1, false) + top + rings;
};
reg("story-calendar-flip", calFlip, { box: [-230, -400, 460, 640], group: "Counters and progress", label: "Calendar page flip (frames)", tags: ["story", "calendar", "date", "time passing", "frames"], demo: { frame: 1 },
  call: 'L.put(S, "story-calendar-flip", x, y, { s, t, frame: k % 6, day: 14, month: "MAY" })  // frames 0-5: page turns, frame 5 shows day+1' });
reg("story-calendar-strip", (o) => Array.from({ length: 6 }, (_, i) => L.g(L.inline("story-calendar-flip", Object.assign({}, o, { frame: i })), `translate(${-500 + i * 200} 0) scale(.4)`)).join(""),
  { box: [-600, -190, 1200, 330], group: "Counters and progress", label: "Calendar flip (all 6 frames)", tags: ["story", "calendar", "frames", "sprite"], demo: {}, wide: true,
    call: 'L.put(S, "story-calendar-strip", x, y, { s, t, day, month })  // preview of the 6 frames of story-calendar-flip' });

// ---------- map, zoom inset, x-ray ----------
reg("story-map-route", (o) => {
  const d = L.rrect(-440, -290, 880, 580, 28), route = [[-310, 160], [-170, -10], [-20, 70], [140, -90], [300, -150]];
  const inner = L.flat(L.rect(-440, -290, 880, 580), "cream") + L.flat(L.smooth([[-440, -290], [-200, -290], [-250, -190], [-330, -120], [-440, -150], [-440, -290]]), "water") +
    L.flat(L.smooth([[160, 290], [250, 170], [440, 150], [440, 290], [160, 290]]), "grass", 0.8) + L.flat(L.circ(-60, -180, 70, 48), "grass", 0.8) + L.flat(L.circ(330, -40, 52, 60), "grass", 0.7) +
    L.stroke(L.smooth([[-440, 40], [-250, 60], [-60, 10], [120, 40], [440, 0]]), { c: "gray", w: "prop", op: 0.5 }) + L.stroke(L.smooth([[-120, -290], [-90, -80], [-40, 100], [-60, 290]]), { c: "gray", w: "prop", op: 0.5 }) +
    L.stroke(L.line([-150, -290], [-150, 290]), { c: "ink", w: "hair", op: 0.12 }) + L.stroke(L.line([150, -290], [150, 290]), { c: "ink", w: "hair", op: 0.12 });
  const pin = L.g(L.shape("M0 0 C-14 -22 -34 -34 -34 -62 A34 34 0 1 1 34 -62 C34 -34 14 -22 0 0 Z", "red", { w: "prop" }) + L.flat(L.circ(0, -62, 13), "white"), "translate(300 -150)");
  return L.shape(d, "cream", { w: "prop" }) + slot(d, inner) + edge(d, "cream") +
    L.stroke(L.smooth(route), { c: "red", w: 14, dash: "1 28" }) + L.shape(L.circ(-310, 160, 20), "blue", { w: "prop" }) + pin;
}, { box: [-470, -330, 940, 660], group: "Maps and zoom", label: "Map with dotted route and pin", tags: ["story", "map", "route", "travel", "journey", "pin"], demo: {},
  call: 'L.put(S, "story-map-route", x, y, { s, t })  // start dot (-310,160), pin tip (300,-150)' });

reg("story-zoom-inset", (o) => {
  const cs = [-300, 120], rs = 44, cb = [110, -20], rb = 220;
  const dx = cb[0] - cs[0], dy = cb[1] - cs[1], m = Math.hypot(dx, dy), nx = -dy / m, ny = dx / m;
  const cone = L.poly([[cs[0] + nx * rs, cs[1] + ny * rs], [cb[0] + nx * rb, cb[1] + ny * rb], [cb[0] - nx * rb, cb[1] - ny * rb], [cs[0] - nx * rs, cs[1] - ny * rs]], true);
  const r = L.rng(9), cols = ["pink", "green", "orange", "purple"];
  const dflt = () => {
    let s = L.flat(L.rect(cb[0] - rb, cb[1] - rb, rb * 2, rb * 2), "glass");
    for (let i = 0; i < 8; i++) { const a = r() * 2 * PI, d = 20 + r() * 130; s += L.shape(L.circ(cb[0] + Math.cos(a) * d, cb[1] + Math.sin(a) * d, 28 + r() * 34), cols[i % 4], { w: "detail" }); }
    return s;
  };
  return L.flat(cone, "ink", 0.1) + L.stroke(L.line([cs[0] + nx * rs, cs[1] + ny * rs], [cb[0] + nx * rb, cb[1] + ny * rb]), { c: "ink", w: "detail" }) +
    L.stroke(L.line([cs[0] - nx * rs, cs[1] - ny * rs], [cb[0] - nx * rb, cb[1] - ny * rb]), { c: "ink", w: "detail" }) +
    L.shape(L.circ(cs[0], cs[1], rs), "glass", { w: "prop" }) + L.shape(L.circ(cb[0], cb[1], rb), "glass", { w: "prop", flat: true }) +
    slot(L.circ(cb[0], cb[1], rb), content(o, dflt)) + L.shape(ring(cb[0], cb[1], rb + 14, rb - 4), o.c || "gold", { w: "prop" });
}, { box: [-380, -270, 800, 540], group: "Maps and zoom", label: "Magnifier zoom inset", tags: ["story", "zoom", "magnify", "detail", "close up", "microscope"], demo: {},
  call: 'L.put(S, "story-zoom-inset", x, y, { s, t, scene: name | inner: markup centred on (110,-20) radius 220, c: "gold" })  // source dot (-300,120)' });

reg("story-xray-frame", (o) => {
  const d = L.rrect(-320, -250, 640, 500, 22), r = L.rng(3);
  const dflt = () => {
    const sk = "glass", bone = (p, s = 4) => L.stroke(p, { c: sk, w: "char", s });
    let s = L.shape(L.circ(0, -150, 56, 62), sk, { w: "detail", c: "teal" }) + L.shape(L.rrect(-34, -96, 68, 30, 12), sk, { w: "detail", c: "teal" });
    for (let i = 0; i < 7; i++) s += L.shape(L.rrect(-17, -62 + i * 36, 34, 26, 8), sk, { w: "detail", c: "teal" });
    for (let i = 0; i < 5; i++) { const y = -48 + i * 36, w = 150 - i * 12; s += bone(`M-17 ${y} C-${w * 0.5} ${y - 14} -${w} ${y + 10} -${w - 10} ${y + 70}`, 2) + bone(`M17 ${y} C${w * 0.5} ${y - 14} ${w} ${y + 10} ${w - 10} ${y + 70}`, 2); }
    return s + bone("M-190 -52 C-100 -78 100 -78 190 -52", 3) + L.flat(L.circ(-22, -156, 11), "navy") + L.flat(L.circ(22, -156, 11), "navy");
  };
  let scan = ""; for (let y = -240; y < 250; y += 14) scan += L.flat(L.rect(-320, y, 640, 3), "teal", 0.1);
  return L.shape(L.rrect(-350, -280, 700, 560, 34), "gray", { w: "prop" }) + L.shape(d, "navy", { w: "detail", tone: 2, flat: true }) +
    slot(d, L.flat(L.circ(0, 0, 330, 260), "teal", 0.2) + content(o, dflt) + scan) + [-1, 1].map((sx) => L.shape(L.circ(sx * 315, -268, 14), "gray", { w: "detail", tone: 2 })).join("");
}, { box: [-380, -310, 760, 620], group: "Maps and zoom", label: "X-ray reveal frame", tags: ["story", "x-ray", "inside", "reveal", "scan", "skeleton"], demo: {},
  call: 'L.put(S, "story-xray-frame", x, y, { s, t, scene: name | inner: markup in ±320×±250 })' });

// ---------- comparison devices ----------
reg("story-balance-scale", (o) => {
  const tilt = Math.max(-1, Math.min(1, o.tilt === undefined ? 0 : o.tilt)), a = tilt * 14 * PI / 180, arm = 280, py = -430;
  const hp = (sx) => [sx * arm * Math.cos(a), py + sx * arm * Math.sin(a)];
  const pan = (sx, txt, item) => {
    const [hx, hy] = hp(sx), by = hy + 190;
    return L.stroke(L.poly([[hx - 105, by - 14], [hx, hy], [hx + 105, by - 14]]), { c: "gray", w: "detail" }) +
      L.shape(`M${f1(hx - 120)} ${f1(by - 14)} H${f1(hx + 120)} C${f1(hx + 110)} ${f1(by + 40)} ${f1(hx - 110)} ${f1(by + 40)} ${f1(hx - 120)} ${f1(by - 14)} Z`, "gold", { w: "prop" }) +
      (item ? L.g(L.inline(item, o.itemOpts || {}), `translate(${f1(hx)} ${f1(by - 14 - 70 * (o.itemS || 1))}) scale(${o.itemS || 1})`) : "") +
      (txt ? L.text(txt, hx, by + 100, { size: 50, c: "ink", halo: "paper" }) : "");
  };
  const beam = L.shape(L.rrect(-arm - 20, -12, arm * 2 + 40, 24, 12), "wood", { w: "prop" });
  return L.shadow(0, 0, 340) + L.shape(L.poly([[-130, 0], [-70, -50], [70, -50], [130, 0]], true), "wood", { w: "prop" }) + L.shape(L.rrect(-14, py, 28, -py - 40, 8), "wood", { w: "prop" }) +
    pan(-1, o.left, o.leftItem) + pan(1, o.right, o.rightItem) + L.g(beam, `translate(0 ${py}) rotate(${f1(tilt * 14)})`) + L.shape(L.circ(0, py, 30), "gold", { w: "prop" });
}, { box: [-420, -540, 840, 580], group: "Compare and rank", label: "Balance scale (two pans)", tags: ["story", "compare", "weigh", "balance", "versus"], demo: { tilt: 0.5, left: "Cats", right: "Dogs" },
  call: 'L.put(S, "story-balance-scale", x, gy, { s, t, left: "A", right: "B", tilt: -1..1 (+ = right heavier), leftItem: "prop-mug", rightItem: name, itemS: 1 })' });

reg("story-podium", (o) => {
  const blocks = [[-345, 150, "gray", "2"], [-115, 210, "gold", "1"], [115, 110, "orange", "3"]];
  return L.shadow(0, 0, 760) + blocks.map(([x, h, c, n]) => L.shape(L.rect(x, -h, 230, h), c, { w: "prop" }) + L.shape(L.rect(x, -h, 230, 26), c, { w: "prop", tone: 1 }) + wt(n, x + 115, -h / 2 + 40, 100)).join("");
}, { box: [-380, -260, 760, 290], group: "Compare and rank", label: "Podium 1-2-3", tags: ["story", "rank", "winner", "podium", "top three"], demo: {},
  call: 'L.put(S, "story-podium", x, gy, { s, t })  // standing tops: 1st y-210 (x 0), 2nd y-150 (x -230), 3rd y-110 (x 230)' });

reg("story-versus-card", (o) => {
  const side = (x0, c, txt, item, sx) => L.shape(L.rrect(x0, -200, 510, 400, 40), c, { w: "prop", dir: "v" }) + wt(txt || "", x0 + 255, -90, o.size || 80) + (item ? L.g(L.inline(item, o.itemOpts || {}), `translate(${x0 + 255} 60)`) : "");
  const burst = L.shape(L.star(0, 0, 118, 78, 10), "gold", { w: "prop" });
  return side(-600, o.ca || "blue", o.a === undefined ? "A" : o.a, o.aItem) + side(90, o.cb || "red", o.b === undefined ? "B" : o.b, o.bItem) + burst + L.text("VS", 0, 30, { size: 92, weight: 800 });
}, { box: [-630, -230, 1260, 460], group: "Compare and rank", wide: true, label: "Versus card (A vs B)", tags: ["story", "versus", "compare", "vs", "fight"], demo: { a: "Cats", b: "Dogs" },
  call: 'L.put(S, "story-versus-card", x, y, { s, t, a: "Cats", b: "Dogs", ca: "blue", cb: "red", aItem: name, bItem: name, size: 80 })' });

reg("story-fact-myth-board", (o) => {
  const col = (x0, c, head, items, mark) => {
    const d = L.rrect(x0, -310, 580, 620, 36), icon = mark === "ok" ? L.stroke(L.poly([[x0 + 40, -232], [x0 + 70, -202], [x0 + 118, -262]]), { c: "white", w: "char", s: 3 }) :
      L.stroke(L.poly([[x0 + 44, -262], [x0 + 104, -204]]), { c: "white", w: "char", s: 3 }) + L.stroke(L.poly([[x0 + 104, -262], [x0 + 44, -204]]), { c: "white", w: "char", s: 3 });
    return L.shape(d, c, { w: "prop" }) + L.shape(L.rrect(x0 + 16, -200, 548, 494, 26), "paper", { w: "detail" }) + icon + wt(head, x0 + 355, -218, 80) +
      items.slice(0, 4).map((t, i) => L.shape(L.circ(x0 + 58, -126 + i * 108, 13), c, { w: "detail" }) + L.text(t, x0 + 92, -112 + i * 108, { size: 44, anchor: "start" })).join("");
  };
  return col(-610, "green", o.factHead || "FACT", o.facts || ["Fact one", "Fact two"], "ok") + col(30, "red", o.mythHead || "MYTH", o.myths || ["Myth one", "Myth two"], "no");
}, { box: [-640, -340, 1280, 680], group: "Compare and rank", wide: true, label: "Fact vs myth board", tags: ["story", "fact", "myth", "true", "false", "compare"], demo: { facts: ["Water is wet", "Cats purr"], myths: ["We use 10% of brain", "Bats are blind"] },
  call: 'L.put(S, "story-fact-myth-board", x, y, { s, t, facts: [..4], myths: [..4], factHead: "FACT", mythHead: "MYTH" })' });

// ---------- choices and progress ----------
reg("story-fork-road", (o) => {
  const road = L.poly([[-110, 0], [-72, -150], [-320, -330], [-270, -356], [-24, -208], [0, -224], [24, -208], [270, -356], [320, -330], [72, -150], [110, 0]], true);
  const sign = (sx, txt) => {
    const px = sx * 205, tip = px + sx * 150, tail = px - sx * 44;
    return L.shape(L.rrect(px - 10, -175, 20, 170, 6), "wood", { w: "prop" }) +
      L.shape(L.poly([[tail, -205], [tip - sx * 44, -205], [tip, -165], [tip - sx * 44, -125], [tail, -125]], true), "cream", { w: "prop" }) + L.text(txt, (tail + tip - sx * 44) / 2, -143, { size: 52 });
  };
  const hill = L.flat(L.smooth([[-500, 0], [-470, -120], [-380, -230], [-300, -150], [-200, -90], [-130, -30], [-110, 0], [-500, 0]]), "grass") + L.flat(L.smooth([[500, 0], [470, -120], [380, -230], [300, -150], [200, -90], [130, -30], [110, 0], [500, 0]]), "grass");
  return L.shadow(0, 0, 220) + hill + L.shape(road, "sand", { w: "scene", dir: "v" }) + L.stroke("M0 -10 V-180", { c: "paper", w: "prop", dash: "26 26" }) +
    L.stroke(L.line([-12, -190], [-296, -342]), { c: "paper", w: "prop", dash: "26 26" }) + L.stroke(L.line([12, -190], [296, -342]), { c: "paper", w: "prop", dash: "26 26" }) +
    sign(-1, o.left === undefined ? "A" : o.left) + sign(1, o.right === undefined ? "B" : o.right);
}, { box: [-520, -440, 1040, 460], group: "Choices and progress", label: "Decision fork in the road", tags: ["story", "choice", "decision", "fork", "road", "path"], demo: { left: "Yes", right: "No" },
  call: 'L.put(S, "story-fork-road", x, gy, { s, t, left: "A", right: "B" })  // fork at y-215; keep signs text short' });

reg("story-stairs-flag", (o) => {
  const step = o.step === undefined ? 3 : o.step;
  let s = L.shadow(0, 0, 720);
  for (let i = 0; i < 5; i++) {
    const x = -325 + 130 * i, h = 80 * (i + 1), c = i < step ? "green" : "gray";
    s += L.shape(L.rect(x, -h, 130, h), c, { w: "prop" }) + L.shape(L.rect(x, -h, 130, 18), c, { w: "prop", tone: 1 });
  }
  if (step > 0 && step <= 5) { const x = -325 + 130 * (step - 1) + 65, y = -80 * step - 34; s += L.shape(L.circ(x, y, 28), "red", { w: "prop" }); }
  return s + L.stroke("M255 -400 V-540", { c: "wood", w: "char" }) + L.shape(L.poly([[255, -540], [350, -505], [255, -470]], true), "red", { w: "prop" }) + L.shape(L.circ(255, -544, 10), "gold", { w: "detail" });
}, { box: [-370, -580, 740, 620], group: "Choices and progress", label: "Staircase progress with flag", tags: ["story", "progress", "steps", "goal", "stairs", "flag"], demo: { step: 3 },
  call: 'L.put(S, "story-stairs-flag", x, gy, { s, t, step: 0..5 })  // steps done turn green, red ball marks current step' });

reg("story-mountain-climb", (o) => {
  const wp = [[-330, -8], [-150, -70], [-230, -140], [-60, -210], [-130, -285], [20, -345], [58, -405]], at = Math.max(0, Math.min(1, o.at === undefined ? 0.45 : o.at));
  const fp = at * (wp.length - 1), i0 = Math.min(wp.length - 2, Math.floor(fp)), fr = fp - i0, hp = [wp[i0][0] + (wp[i0 + 1][0] - wp[i0][0]) * fr, wp[i0][1] + (wp[i0 + 1][1] - wp[i0][1]) * fr];
  const mtn = L.smooth([[-440, 0], [-300, -110], [-190, -190], [-110, -280], [-20, -380], [58, -410], [150, -330], [230, -230], [330, -120], [440, 0], [-440, 0]]);
  const cap = L.poly([[-200, -460], [300, -460], [300, -300], [150, -310], [110, -290], [70, -318], [20, -282], [-30, -312], [-90, -290], [-200, -290]], true);
  const marks = wp.slice(1, -1).map((p, i) => L.shape(L.circ(p[0], p[1], 15), i + 1 <= fp ? "green" : "yellow", { w: "detail" })).join("");
  return L.shadow(0, 0, 800) + L.shape(mtn, "stone", { w: "prop", dir: "v" }) + slot(mtn, L.shape(cap, "snow", { w: "detail" })) + edge(mtn, "stone") + L.stroke(L.smooth(wp), { c: "paper", w: 10, dash: "2 24" }) + marks +
    L.stroke("M58 -410 V-520", { c: "wood", w: "char" }) + L.shape(L.poly([[58, -520], [150, -490], [58, -460]], true), "red", { w: "prop" }) +
    L.shape(L.circ(hp[0], hp[1] - 26, 26), "red", { w: "prop" }) + L.flat(L.circ(hp[0], hp[1] - 26, 10), "white");
}, { box: [-460, -560, 920, 600], group: "Choices and progress", label: "Mountain climb progress", tags: ["story", "progress", "climb", "goal", "summit", "mountain"], demo: { at: 0.45 },
  call: 'L.put(S, "story-mountain-climb", x, gy, { s, t, at: 0..1 })  // red dot = climber, checkpoints turn green' });

reg("story-mood-bar", (o) => {
  const p = Math.max(0, Math.min(1, o.pct === undefined ? 0.7 : o.pct)), x0 = -380, bw = 760, c = o.c || (p < 0.34 ? "red" : p < 0.67 ? "yellow" : "green"), tr = L.rrect(x0, -30, bw, 60, 30);
  const face = (x, happy) => L.shape(L.circ(x, 0, 46), "yellow", { w: "prop" }) + L.flat(L.circ(x - 15, -10, 5), "ink") + L.flat(L.circ(x + 15, -10, 5), "ink") +
    L.stroke(happy ? L.arc(x, 6, 22, 20, 160) : L.arc(x, 34, 22, 200, 340), { c: "ink", w: "detail" });
  return L.text(o.text === undefined ? "Mood" : o.text, 0, -62, { size: 54 }) + L.shape(tr, "paper", { w: "prop", flat: true }) + slot(tr, L.shape(L.rect(x0, -30, bw * p, 60), c, { w: "detail", dir: "v" })) +
    edge(tr, "paper") + L.shape(L.circ(x0 + bw * p, 0, 24), "white", { w: "prop" }) + face(-440, false) + face(440, true);
}, { box: [-520, -130, 1040, 210], group: "Choices and progress", wide: true, label: "Mood loading bar", tags: ["story", "mood", "progress", "feeling", "meter", "loading"], demo: { pct: 0.7 },
  call: 'L.put(S, "story-mood-bar", x, y, { s, t, pct: 0..1, text: "Mood", c })  // colour follows pct unless c is given' });

// ---------- thinking, questions, quiz, numbers, chapters ----------
const gear = (cx, cy, r, n, rot, c) => {
  const p = (2 * PI) / n, pts = [];
  for (let i = 0; i < n; i++) { const a = rot + i * p; [[-0.3, r - 9], [-0.17, r + 9], [0.17, r + 9], [0.3, r - 9]].forEach(([k, rr]) => pts.push([cx + Math.cos(a + k * p) * rr, cy + Math.sin(a + k * p) * rr])); }
  return L.shape(L.poly(pts, true), c, { w: "detail" }) + L.shape(L.circ(cx, cy, r * 0.32), "white", { w: "detail" });
};
reg("story-thought-gears", (o) => {
  const head = L.smooth([[-80, 280], [-95, 200], [-190, 130], [-232, 20], [-225, -100], [-150, -215], [-30, -280], [95, -262], [185, -190], [215, -90], [225, -30], [268, 35], [228, 52], [236, 90], [205, 135], [150, 150], [112, 185], [112, 280], [-80, 280]]);
  const rot = ((o.rot || 0) * PI) / 180, A = [-30, -60, 70, 14], B = [78, -122, 55, 11], C = [58, 14, 45, 9];
  const pA = (2 * PI) / A[3], tA = (-30 * PI) / 180, tC = (40 * PI) / 180;
  const mesh = (th, pB, rotA) => th + PI - pB / 2 + (th - rotA) * (pB / pA);
  const pB = (2 * PI) / B[3], pC = (2 * PI) / C[3];
  return L.shape(head, "white", { w: "prop" }) + gear(A[0], A[1], A[2], A[3], rot, "gold") + gear(B[0], B[1], B[2], B[3], mesh(tA, pB, rot), "orange") + gear(C[0], C[1], C[2], C[3], mesh(tC, pC, rot), "teal");
}, { box: [-260, -310, 540, 610], group: "Thinking and quiz", label: "Thought gears in a head", tags: ["story", "think", "brain", "gears", "idea", "mind"], demo: { rot: 10 },
  call: 'L.put(S, "story-thought-gears", x, y, { s, t, rot: degrees })  // meshing gears: animate rot 0..360 for turning' });

reg("story-question-wall", (o) => {
  const r = L.rng(17), cs = ["blue", "purple", "orange", "pink", "teal", "red"]; let s = L.flat(L.rect(0, 0, W, H), "cream");
  for (let row = 0; row < 5; row++) for (let col = 0; col < 8; col++) {
    const x = 120 + col * 240 + (row % 2) * 60 + (r() - 0.5) * 50, y = 140 + row * 200 + (r() - 0.5) * 40;
    if (Math.abs(x - 960) < 560 && Math.abs(y - 540) < 300) continue;
    const sz = 150 + r() * 90, a = (r() - 0.5) * 40;
    s += L.g(L.text("?", x, y + sz * 0.35, { size: sz, weight: 800, c: cs[Math.floor(r() * cs.length)] }), `rotate(${f1(a)} ${f1(x)} ${f1(y)})`, 0.7);
  }
  return s;
}, { box: FULL, group: "Thinking and quiz", wide: true, label: "Question-mark wall", tags: ["story", "question", "mystery", "confused", "background", "wonder"], demo: {},
  call: 'L.put(S, "story-question-wall", 0, 0, { t })  // backdrop; centre (x 400-1520, y 240-840) is left empty' });

reg("story-quiz-card", (o) => {
  const q = lines(o.q || "Which is bigger?"), opts = o.opts || ["Option A", "Option B", "Option C"], pick = o.pick, cc = ["blue", "orange", "purple"];
  const y0 = q.length > 1 ? -222 : -196;
  const rows = opts.slice(0, 3).map((t, i) => {
    const y = -60 + i * 120, hit = pick === i, c = hit ? "green" : "paper";
    return L.shape(L.rrect(-430, y - 48, 860, 96, 48), c, { w: "prop" }) + L.shape(L.circ(-380, y, 34), hit ? "white" : cc[i], { w: "detail" }) + (hit ? L.stroke(L.poly([[-396, y + 2], [-382, y + 16], [-362, y - 12]]), { c: "green", w: "prop" }) : wt("ABC"[i], -380, y + 17, 48)) +
      L.text(t, -320, y + 16, { size: 50, anchor: "start", c: hit ? "white" : "ink", halo: hit ? "ink" : undefined });
  }).join("");
  return L.flat(L.rrect(-492, -296, 1000, 580, 40), "ink", 0.15) + L.shape(L.rrect(-500, -310, 1000, 580, 40), "cream", { w: "prop" }) + tab(-340, -310, 220, 70, "QUIZ", "red", 44) +
    q.map((t, i) => L.text(t, 0, y0 + i * 62, { size: 54 })).join("") + rows;
}, { box: [-530, -350, 1060, 640], group: "Thinking and quiz", wide: true, label: "Quiz card (3 options)", tags: ["story", "quiz", "question", "choose", "test", "answer"], demo: { q: "How many hearts|does an octopus have?", opts: ["One", "Two", "Three"], pick: 2 },
  call: 'L.put(S, "story-quiz-card", x, y, { s, t, q: "Question|second line", opts: ["A","B","C"], pick: 0..2 (omit = no answer shown) })' });

reg("story-number-reveal", (o) => {
  let rays = "";
  for (let i = 0; i < 16; i++) { const a = (i / 16) * 2 * PI, b = ((i + 0.5) / 16) * 2 * PI; rays += L.flat(`M0 0 L${f1(Math.cos(a) * 560)} ${f1(Math.sin(a) * 560)} L${f1(Math.cos(b) * 560)} ${f1(Math.sin(b) * 560)} Z`, "gold", 0.3); }
  return rays + L.flat(L.rrect(-412, -242, 840, 500, 44), "ink", 0.15) + L.shape(L.rrect(-420, -250, 840, 500, 44), "paper", { w: "prop" }) +
    L.text(o.pre === undefined ? "The number is" : o.pre, 0, -140, { size: 54 }) + L.text(o.value === undefined ? "42" : o.value, 0, 80, { size: o.size || 250, weight: 800, c: o.c || "red", halo: "ink", haloW: 0.06 }) +
    L.text(o.unit === undefined ? "" : o.unit, 0, 190, { size: 58 });
}, { box: [-520, -340, 1040, 680], group: "Thinking and quiz", wide: true, label: "The number (big numeral card)", tags: ["story", "number", "reveal", "stat", "statistic", "big"], demo: { pre: "That is about", value: "8,000", unit: "years" },
  call: 'L.put(S, "story-number-reveal", x, y, { s, t, pre: "The number is", value: "42", unit: "years", size: 250, c: "red" })' });

reg("story-chapter-strip", (o) => {
  const n = o.n === undefined ? 1 : o.n;
  return L.flat(L.rect(-980, -100, 1960, 200), "navy") + L.flat(L.rect(-980, -100, 420, 200), "gold") + L.flat(L.rect(-980, 100, 1960, 12), "gold", 0.6) + L.flat(L.rect(-980, -112, 1960, 12), "gold", 0.6) +
    L.text("CHAPTER", -770, -38, { size: 42, weight: 700 }) + L.text(n, -770, 70, { size: 112, weight: 800 }) + L.text(o.text || "The big question", -520, 32, { size: 96, anchor: "start", c: "paper" });
}, { box: [-960, -130, 1920, 260], group: "Thinking and quiz", wide: true, label: "Chapter divider strip", tags: ["story", "chapter", "divider", "title", "section", "lower third"], demo: { n: 2, text: "What happens next" },
  call: 'L.put(S, "story-chapter-strip", 960, y, { t, n: 2, text: "Title" })  // full-width band centred on y' });
})();
