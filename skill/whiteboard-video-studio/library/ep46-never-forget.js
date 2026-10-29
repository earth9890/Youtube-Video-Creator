// ===================== library/ep46-never-forget.js — binders, shelves, wall, warehouse, a very large field, delete key, film strip, envelopes, ham, hair dryer (ep46) =====================
(function () {
const L = window.L, f1 = L.f1;
const COLS = ["blue", "red", "green", "orange", "purple", "teal", "yellow", "pink"];

// one ring binder seen from the spine, standing on its bottom edge (origin bottom centre); label runs up the spine
const spine = (w, h, col, label, seed) => {
  let s = L.shape(L.rrect(-w / 2, -h, w, h, 5), col, { flat: true, w: "detail" });
  s += L.flat(L.rect(-w / 2 + 3, -h + 6, 4, h - 12), "white", 0.35);
  if (label) {
    const lh = h * 0.62;
    s += L.shape(L.rrect(-w / 2 + 6, -h + 14, w - 12, lh, 3), "paper", { flat: true, w: "hair" });
    s += L.g(L.text(label, 0, 6, { size: Math.min(20, w * 0.46), c: "ink" }), `translate(0 ${f1(-h + 14 + lh / 2)}) rotate(-90)`);
  } else s += L.stroke(`M${f1(-w / 2 + 5)} ${f1(-h + 22)} H${f1(w / 2 - 5)}`, { w: "hair", c: L.c(col, 2) });
  return s;
};
// front cover of a binder (origin bottom centre): big label, rings on the left edge
const cover = (w, h, col, label, sub) => {
  let s = L.shape(L.rrect(-w / 2, -h, w, h, 8), col, { w: "prop" });
  s += L.shape(L.rrect(-w / 2 + 14, -h + 26, w - 28, h * 0.4, 6), "paper", { flat: true, w: "detail" });
  const lines = String(label || "").split("|"), size = lines.some((l) => l.length > 7) ? 28 : 36;
  lines.forEach((ln, i) => (s += L.text(ln, 4, -h + 26 + h * 0.2 + size * 0.35 + (i - (lines.length - 1) / 2) * size * 1.1, { size, c: "ink" })));
  if (sub) s += L.text(sub, 4, -h * 0.28, { size: 24, c: "paper" });
  for (const y of [0.2, 0.5, 0.8]) s += L.shape(L.circ(-w / 2 + 2, -h * y, 8), "gray", { flat: true, tone: 1, w: "hair" });
  return s;
};
L.reg("props", "ep46-binder", (o) => {
  const c = o.c || "blue";
  if (o.view === "front") return L.shadow(0, 0, (o.bw || 150) * 1.1) + cover(o.bw || 150, o.bh || 190, c, o.label ?? "", o.sub);
  return L.shadow(0, 0, (o.bw || 46) * 2) + spine(o.bw || 46, o.bh || 190, c, o.label ?? "", o.seed || 1);
}, { box: [-110, -230, 220, 250], group: "Binders and shelves", label: "Ring binder (spine or cover)", tags: ["binder", "folder", "file", "memory", "day", "date", "ep46", "never forget"],
  call: 'L.put(S, "ep46-binder", x, gy, { s, t, c: "blue", label: "4 OCT", view: "spine"|"front", bw, bh, sub })', demo: { label: "4 OCT" } });

// open binder, its rings sprung, pages fanned: it "will not close" (origin bottom centre)
L.reg("props", "ep46-binder-open", (o) => {
  const c = o.c || "red";
  let s = L.shadow(0, 0, 330);
  s += L.shape(L.rrect(-160, -190, 150, 190, 8), c, { w: "prop" }) + L.shape(L.rrect(10, -190, 150, 190, 8), c, { w: "prop" });
  s += L.shape(L.poly([[-146, -176], [-6, -170], [-6, -14], [-146, -20]], true), "paper", { flat: true, w: "detail" });
  s += L.shape(L.poly([[14, -170], [150, -176], [150, -20], [14, -14]], true), "paper", { flat: true, w: "detail" });
  for (let i = 0; i < 4; i++) s += L.stroke(`M${f1(-130 + i * 4)} ${-150 + i * 26} H-22 M${f1(30 + i * 4)} ${-150 + i * 26} H134`, { w: "hair", c: "gray" });
  for (const y of [-150, -95, -40]) s += L.stroke(`M0 ${y} m-14 0 a14 14 0 1 1 28 0`, { w: "prop", c: "gray" });
  s += L.shape(L.poly([[-30, -196], [10, -214], [50, -196], [30, -190], [-30, -190]], true), "paper", { flat: true, w: "detail" });
  return s + (o.label ? L.text(o.label, 80, -100, { size: 30, c: "ink" }) : "");
}, { box: [-200, -240, 400, 260], group: "Binders and shelves", label: "Open binder (will not close)", tags: ["binder", "open", "pages", "rings", "stuck", "ep46"], call: 'L.put(S, "ep46-binder-open", x, gy, { s, t, c: "red", label })' });

// a shelving unit full of binders; n = how many binders (fills the bottom row first); wheels = on casters with a push bar
L.reg("props", "ep46-shelf", (o) => {
  const w = o.wd || 380, rows = o.rows || 3, RH = 210, cap = Math.floor((w - 40) / 36), n = Math.max(0, Math.min(o.n ?? 6, rows * cap)), r = L.rng(o.seed || 46);
  const lift = o.wheels ? 30 : 0, H = rows * RH + 18, y0 = -lift;
  let s = L.shadow(0, 0, w + 40);
  if (o.wheels) {
    for (const x of [-w / 2 + 30, w / 2 - 30]) s += L.shape(L.circ(x, -14, 14), "ink", { flat: true, w: "detail" }) + L.shape(L.circ(x, -14, 5), "gray", { flat: true, tone: 1, w: "hair" });
    s += L.stroke(`M${f1(w / 2 - 10)} ${y0 - H * 0.45} L${f1(w / 2 + 70)} ${y0 - H * 0.62} H${f1(w / 2 + 110)}`, { w: "prop", c: "gray" });
  }
  s += L.shape(L.rect(-w / 2, y0 - H, w, H), "wood", { flat: true, tone: 2, w: "prop" });
  for (let i = 0; i < n; i++) {
    const row = Math.floor(i / cap), col = i % cap, bw = 28 + Math.floor(r() * 6), bh = 150 + Math.floor(r() * 36), x = -w / 2 + 28 + col * 36 + 18, y = y0 - 18 - row * RH;
    s += L.g(spine(bw, bh, COLS[(i * 3 + (o.seed || 46)) % 8], "", i), `translate(${f1(x)} ${f1(y)})`);
  }
  for (let k = 0; k <= rows; k++) s += L.shape(L.rect(-w / 2 - 6, y0 - 18 - k * RH + 2, w + 12, 18), "wood", { flat: true, w: "detail" });
  s += L.shape(L.rect(-w / 2 - 6, y0 - H, 14, H), "wood", { flat: true, w: "detail" }) + L.shape(L.rect(w / 2 - 8, y0 - H, 14, H), "wood", { flat: true, w: "detail" });
  return s;
}, { box: [-260, -700, 520, 720], group: "Binders and shelves", label: "Shelf of binders (n, rows, wheels)", tags: ["shelf", "binders", "memory", "archive", "wheels", "cart", "ep46", "bookcase"],
  call: 'L.put(S, "ep46-shelf", x, gy, { s, t, n: 6, rows: 3, wd: 380, wheels: false, seed })', demo: { n: 18 } });

// a whole wall of binder shelves, floor at the bottom; fill = fraction of slots with a binder (background, origin top-left)
L.reg("scenery", "ep46-binder-wall", (o) => {
  const rows = 5, RH = 170, fl = 930, pitch = 34, r = L.rng(o.seed || 4), fill = o.fill ?? 1;
  let s = L.flat(L.rect(0, 0, 1920, 1080), o.dim ? "dusk" : "wall") + L.flat(L.rect(0, fl, 1920, 150), "floor");
  s += L.flat(L.rect(0, fl, 1920, 10), "floor", 1);
  s += L.flat(L.rect(0, 40, 1920, fl - 40), "wood", 0.9);
  for (let k = 0; k <= rows; k++) { const y = fl - k * RH; s += L.flat(L.rect(0, y - 10, 1920, 14), "wood") + L.stroke(`M0 ${y + 4} H1920`, { w: "hair", c: "wood" }); }
  for (let row = 0; row < rows; row++) for (let i = 0; i < 56; i++) {
    if (r() > fill) continue;
    const h = 116 + Math.floor(r() * 30), x = 8 + i * pitch, y = fl - row * RH - 10, c = COLS[Math.floor(r() * 8)];
    s += L.shape(L.rect(x, y - h, 28, h), c, { flat: true, w: "hair" });
  }
  return s;
}, { box: [0, 0, 1920, 1080], group: "Binders and shelves", label: "Wall of binder shelves", tags: ["wall", "shelves", "binders", "library", "archive", "memory", "ep46"], wide: true, call: 'L.put(S, "ep46-binder-wall", 0, 0, { fill: 1, seed, dim })', demo: { fill: 1 } });

// a warehouse aisle of binder racks receding to a vanishing point (background, origin top-left)
L.reg("scenery", "ep46-warehouse", (o) => {
  const f = 900, H = 170, hz = 470, X = 230, r = L.rng(o.seed || 8);
  const P = (x, y, z) => [960 + (x * f) / z, hz - ((y - H) * f) / z];
  const quad = (a, b, c, d) => L.poly([a, b, c, d], true);
  let s = L.flat(L.rect(0, 0, 1920, 1080), "stone", 1) + L.flat(L.rect(0, 0, 1920, hz - 90), "navy", 1) + L.flat(L.rect(0, hz, 1920, 1080 - hz), "stone");
  s += L.flat(quad(P(-X, 0, 90), P(X, 0, 90), P(X, 0, 4000), P(-X, 0, 4000)), "gray", 1);
  const zs = []; for (let z = 150; z < 3800; z *= 1.32) zs.push(z);
  for (const side of [-1, 1]) {
    for (let k = 0; k < zs.length - 1; k++) {
      const z0 = zs[k], z1 = zs[k + 1];
      for (let lv = 0; lv < 6; lv++) {
        const y0 = 40 + lv * 116, y1 = y0 + 98, c = COLS[Math.floor(r() * 8)], c2 = COLS[Math.floor(r() * 8)], zm = (z0 + z1) / 2;
        s += L.shape(quad(P(side * X, y0, z0), P(side * X, y0, z1), P(side * X, y1, z1), P(side * X, y1, z0)), c, { flat: true, w: "hair" });
        s += L.flat(quad(P(side * X, y0, zm), P(side * X, y0, z1), P(side * X, y1, z1), P(side * X, y1, zm)), c2, 1);
      }
      s += L.shape(quad(P(side * X, 0, z0), P(side * X, 700, z0), P(side * X, 700, z0 + (z1 - z0) * 0.05), P(side * X, 0, z0 + (z1 - z0) * 0.05)), "wood", { flat: true, w: "hair" });
    }
  }
  for (let k = 0; k < zs.length; k += 2) { const a = P(-60, 760, zs[k]), b = P(60, 760, zs[k]); s += L.flat(L.rect(a[0], a[1], b[0] - a[0], Math.max(3, 600 / zs[k] * 3)), "yellow", 0.95); }
  return s;
}, { box: [0, 0, 1920, 1080], group: "Binders and shelves", label: "Warehouse aisle of binders", tags: ["warehouse", "aisle", "binders", "racks", "storage", "huge", "archive", "memory", "ep46"], wide: true, call: 'L.put(S, "ep46-warehouse", 0, 0, { seed })' });

// a very large empty field to the horizon, optional tiny car + "?" (background, origin top-left); time = day | dusk
L.reg("scenery", "ep46-field", (o) => {
  const dusk = o.time === "dusk", hz = o.hz || 520, r = L.rng(o.seed || 9);
  let s = L.flat(L.rect(0, 0, 1920, hz), dusk ? "dusk" : "sky") + L.flat(L.rect(0, 0, 1920, hz * 0.45), dusk ? "sky" : "sky", dusk ? 0.8 : 0.5);
  s += L.shape(L.circ(o.sunX || 1460, hz - 150, 68), dusk ? "orange" : "yellow", { flat: true, w: "detail" });
  for (let i = 0; i < 5; i++) { const x = 160 + r() * 1600, y = 90 + r() * 220, k = 0.7 + r() * 0.7; s += L.g(L.shape(`M-80 0 Q-90 -34 -50 -36 Q-40 -66 0 -58 Q38 -72 56 -40 Q96 -40 90 0 Z`, "white", { flat: true, w: "detail" }), `translate(${f1(x)} ${f1(y)}) scale(${f1(k)})`); }
  s += L.flat(L.rect(0, hz - 10, 1920, 12), "green", 1);
  s += L.shape(`M0 ${hz} L0 ${hz - 30} ` + Array.from({ length: 22 }, (_, i) => `L${i * 90 + 45} ${hz - 30 - 22 * Math.abs(Math.sin(i * 1.7)) - 10} L${(i + 1) * 90} ${hz - 30}`).join(" ") + ` L1920 ${hz} Z`, "green", { flat: true, tone: 2, w: "hair" });
  s += L.flat(L.rect(0, hz, 1920, 1080 - hz), dusk ? "green" : "grass");
  for (let k = 0; k < 12; k++) { const y0 = hz + Math.pow(k / 12, 2.1) * (1080 - hz), y1 = hz + Math.pow((k + 0.5) / 12, 2.1) * (1080 - hz); s += L.flat(L.rect(0, y0, 1920, y1 - y0), "grass", k % 2 ? 0.0 : 0.35); }
  for (let i = 0; i < 30; i++) { const y = hz + 8 + Math.pow(r(), 1.6) * (1080 - hz - 20), x = r() * 1920, k = (y - hz) / 560; s += L.stroke(`M${f1(x)} ${f1(y)} l${f1(-4 * k - 1)} ${f1(-14 * k - 3)} M${f1(x)} ${f1(y)} l${f1(5 * k + 1)} ${f1(-16 * k - 3)}`, { w: "hair", c: "grass", op: 0.9 }); }
  if (o.car) {
    const cx = o.carX ?? 1190, cy = o.carY ?? hz + 46, k = o.carS ?? 0.16;
    s += L.g(L.inline("veh-car", { color: o.carC || "red" }), `translate(${cx} ${cy}) scale(${k})`);
    if (o.mark !== false) s += L.text("?", cx, cy - 190 * k - 24, { size: 70, c: dusk ? "paper" : "ink", halo: dusk ? "ink" : undefined, haloW: 0.1 });
  }
  return s;
}, { box: [0, 0, 1920, 1080], group: "Binders and shelves", label: "A very large field (tiny car)", tags: ["field", "grass", "car", "lost", "parking", "huge", "empty", "horizon", "ep46"], wide: true,
  call: 'L.put(S, "ep46-field", 0, 0, { time: "day"|"dusk", car: true, carX, carY, carS, carC, mark, hz })', demo: { car: true } });

// a big keyboard key: DELETE (origin centre)
L.reg("props", "ep46-delete-key", (o) => {
  const c = o.c || "red", w = o.w || 360, h = o.h || 200;
  return L.shape(L.rrect(-w / 2 - 6, -h / 2 + 12, w + 12, h + 4, 26), "gray", { tone: 2, w: "prop" }) + L.shape(L.rrect(-w / 2, -h / 2, w, h, 24), c, { w: "prop" }) +
    L.shape(L.rrect(-w / 2 + 20, -h / 2 + 16, w - 40, h - 52, 14), c, { flat: true, tone: 1, w: "hair" }) + L.text(o.label || "DELETE", 0, h * 0.04, { size: o.size || 66, c: "white", halo: "ink", haloW: 0.12 });
}, { box: [-220, -130, 440, 270], group: "Binders and shelves", label: "DELETE key", tags: ["delete", "key", "keyboard", "button", "erase", "forget", "ep46"], call: 'L.put(S, "ep46-delete-key", x, y, { s, t, c: "red", label: "DELETE", w, h, size })' });

// strip of film frames, horizontal, centred; frames = n, each with a different little picture (origin centre)
L.reg("props", "ep46-filmstrip", (o) => {
  const n = o.frames || 4, fw = 150, fh = 120, gap = 22, W = n * fw + (n + 1) * gap, icons = ["sun", "heart", "cloud", "star", "house"];
  let s = L.shape(L.rrect(-W / 2, -fh / 2 - 26, W, fh + 52, 10), "ink", { flat: true, tone: 1, w: "detail" });
  for (let i = 0; i < n; i++) {
    const x = -W / 2 + gap + i * (fw + gap), cx = x + fw / 2, ic = icons[(i + (o.seed || 0)) % icons.length];
    s += L.shape(L.rect(x, -fh / 2, fw, fh), o.c || "cream", { flat: true, w: "hair" });
    if (ic === "sun") s += L.shape(L.circ(cx, 0, 26), "yellow", { flat: true, w: "hair" });
    else if (ic === "heart") s += L.shape(`M${cx} 28 C${cx - 50} -6 ${cx - 22} -40 ${cx} -16 C${cx + 22} -40 ${cx + 50} -6 ${cx} 28 Z`, "red", { flat: true, w: "hair" });
    else if (ic === "cloud") s += L.shape(`M${cx - 40} 20 Q${cx - 52} -6 ${cx - 20} -10 Q${cx - 8} -40 ${cx + 20} -22 Q${cx + 56} -20 ${cx + 44} 20 Z`, "sky", { flat: true, w: "hair" });
    else if (ic === "star") s += L.shape(L.star(cx, 0, 34, 15), "gold", { flat: true, w: "hair" });
    else s += L.shape(L.poly([[cx - 34, 30], [cx - 34, -4], [cx, -34], [cx + 34, -4], [cx + 34, 30]], true), "orange", { flat: true, w: "hair" });
    for (const y of [-fh / 2 - 17, fh / 2 + 7]) for (let k = 0; k < 4; k++) s += L.flat(L.rect(x + 8 + k * 36, y, 14, 10), "paper");
  }
  return s;
}, { box: [-420, -110, 840, 220], group: "Binders and shelves", label: "Film strip", tags: ["film", "reel", "strip", "movie", "memories", "replay", "ep46"], call: 'L.put(S, "ep46-filmstrip", x, y, { s, t, frames: 4, seed, c })' });

// an envelope (origin centre) and a heap of them (origin: bottom centre)
const env = () => L.shape(L.rrect(-60, -40, 120, 80, 6), "paper", { flat: true, w: "detail" }) + L.stroke(`M-60 -36 L0 8 L60 -36`, { w: "detail", c: "gray" });
L.reg("props", "ep46-envelope-pile", (o) => {
  const n = o.n || 30, r = L.rng(o.seed || 6); let s = L.shadow(0, 0, 440);
  for (let i = 0; i < n; i++) {
    const row = Math.floor(Math.sqrt(i * 2)), x = (r() - 0.5) * (150 + 100 * row), y = -30 - (Math.max(0, 8 - row)) * 0 - row * 16 + r() * 8;
    s += L.g(env(), `translate(${f1(x)} ${f1(y)}) rotate(${f1((r() - 0.5) * 50)}) scale(0.9)`);
  }
  return s;
}, { box: [-260, -300, 520, 320], group: "Binders and shelves", label: "Heap of envelopes (emails)", tags: ["envelope", "email", "mail", "letters", "pile", "inbox", "ep46"], call: 'L.put(S, "ep46-envelope-pile", x, gy, { s, t, n: 30, seed })', demo: { n: 30 } });

// a ham on the bone (origin centre)
L.reg("food", "ep46-ham", (o) => {
  const body = `M-110 10 C-120 -60 -60 -100 10 -92 C70 -86 100 -54 118 -24 L150 -30 C160 -36 172 -30 170 -18 C180 -14 180 0 168 4 C162 14 148 12 142 6 L118 14 C100 54 50 80 -20 78 C-80 76 -106 48 -110 10 Z`;
  let s = L.shadow(0, 84, 260) + L.shape(body, "orange", { tone: 2, w: "prop" });
  s += L.flat(`M-84 0 C-84 -48 -40 -74 8 -70 C-30 -50 -52 -18 -58 30 Z`, "white", 0.28);
  for (let i = -2; i < 4; i++) s += L.stroke(`M${-70 + i * 34} -62 L${-30 + i * 34} 62`, { w: "hair", c: L.c("orange", 2) }) + L.stroke(`M${40 + i * 34} -78 L${-10 + i * 34} 70`, { w: "hair", c: L.c("orange", 2), op: 0.8 });
  s += L.shape(L.circ(112, -6, 28, 34), "pink", { flat: true, w: "detail" }) + L.shape(L.circ(112, -6, 10, 12), "cream", { flat: true, w: "hair" });
  return s;
}, { box: [-140, -120, 340, 220], group: "Binders and shelves", label: "Ham", tags: ["ham", "meat", "food", "dinner", "roast", "smell", "ep46"], call: 'L.put(S, "ep46-ham", x, y, { s, t })' });

// a hair dryer (origin centre), nozzle pointing left
L.reg("props", "ep46-hair-dryer", (o) => {
  const c = o.c || "pink";
  return L.shape(L.rrect(-12, 20, 54, 110, 16), c, { tone: 2, w: "prop" }) + L.shape(`M-110 -34 L-60 -48 L50 -54 Q96 -50 96 -4 Q96 40 50 42 L-60 30 L-110 20 Z`, c, { w: "prop" }) +
    L.shape(L.rrect(-124, -38, 24, 62, 6), "gray", { w: "detail" }) + L.shape(L.circ(18, 60, 6), "paper", { flat: true, w: "hair" }) + L.stroke(`M-30 -34 V28 M-12 -38 V32 M6 -40 V34`, { w: "hair", c: L.c(c, 2) });
}, { box: [-150, -80, 300, 240], group: "Binders and shelves", label: "Hair dryer", tags: ["hair dryer", "blow dry", "bathroom", "hair", "ep46"], call: 'L.put(S, "ep46-hair-dryer", x, y, { s, t, c: "pink" })' });
})();
