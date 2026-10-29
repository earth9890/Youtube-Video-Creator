// ===================== library/ep48-no-internet.js — fridge checklist, no-signal phone, card terminal, sea cable, news desk, telegraph and more (ep48) =====================
(function () {
const L = window.L, f1 = L.f1;

// ---------- fridge checklist: THINGS THAT STILL WORK (origin = centre of the paper) ----------
const CW = 560, ROW = 84, TOP = 176, ROWS = ["CARDS", "THE BANK", "THE HOSPITAL", "GPS", "SHIPS", "SEA CABLES"];
const lay = (n, pencil) => { const H = TOP + (n + (pencil ? 1 : 0)) * ROW + 34; return { H, y: (i) => -H / 2 + TOP + ROW * i + ROW / 2 }; };
const xmark = (y) => L.stroke(`M-232 ${f1(y - 16)} L-200 ${f1(y + 16)} M-200 ${f1(y - 16)} L-232 ${f1(y + 16)}`, { c: "red", w: "prop" });
const strike = (y) => L.stroke(`M-190 ${f1(y + 2)} Q-40 ${f1(y - 8)} 168 ${f1(y + 4)}`, { c: "red", w: "prop" });
L.reg("props", "ep48-checklist", (o) => {
  const rows = o.rows || ROWS, crossed = o.crossed || [], ticks = o.ticks || [], { H, y } = lay(rows.length, o.pencil);
  let s = L.flat(L.rrect(-CW / 2 + 12, -H / 2 + 16, CW, H, 10), "ink", 0.16) + L.shape(L.rrect(-CW / 2, -H / 2, CW, H, 10), "paper", { w: "detail" });
  s += L.shape(L.circ(0, -H / 2 + 6, 20), "red", { w: "detail" });
  s += L.text("THINGS THAT", 0, -H / 2 + 76, { size: 50, c: "ink" }) + L.text("STILL WORK", 0, -H / 2 + 130, { size: 50, c: "ink" });
  s += L.stroke(`M-230 ${f1(-H / 2 + TOP - 16)} L230 ${f1(-H / 2 + TOP - 16)}`, { w: "hair", c: "gray" });
  rows.forEach((r, i) => {
    const yy = y(i), dead = crossed.includes(i);
    s += L.shape(L.rrect(-238, yy - 22, 44, 44, 6), "white", { w: "detail" });
    s += L.text(r, -170, yy + 16, { size: 46, anchor: "start", c: dead ? "brown" : "ink" });
    if (dead) s += xmark(yy) + strike(yy);
    else if (ticks.includes(i)) s += L.stroke(`M-230 ${f1(yy)} L-218 ${f1(yy + 14)} L-198 ${f1(yy - 16)}`, { c: "green", w: "prop" });
  });
  if (o.pencil) {
    const yy = y(rows.length);
    s += L.stroke(L.rrect(-238, yy - 22, 44, 44, 6), { w: "hair", c: "gray" }) + L.text(o.pencil, -170, yy + 16, { size: 46, anchor: "start", c: "brown" });
    s += L.g(L.shape(L.rrect(-8, -5, 74, 10, 3), "yellow", { w: "hair" }) + L.shape(`M-8 -5 L-22 0 L-8 5 Z`, "wood", { w: "hair" }), `translate(150 ${f1(yy + 34)}) rotate(-24)`);
  }
  return s;
}, { box: [-300, -420, 600, 840], group: "Internet week (ep48)", label: "Fridge checklist · things that still work", tags: ["checklist", "fridge", "list", "crossed out", "ticks", "runner", "ep48", "magnet"],
  call: 'L.put(S, "ep48-checklist", x, y, { s, t, rows: ["CARDS", …], crossed: [0, 1], ticks: [3], pencil: "NEXT DOOR" })', demo: { crossed: [0, 1], ticks: [3] } });

// red cross-out for one row of the checklist, to fade in on its word over the previous state (same x, y, s, rows count)
L.reg("props", "ep48-check-strike", (o) => {
  const n = o.n || ROWS.length, yy = lay(n, o.pencil).y(o.row || 0);
  return xmark(yy) + strike(yy);
}, { box: [-300, -420, 600, 840], group: "Internet week (ep48)", label: "Checklist · one row crossed out", tags: ["checklist", "strike", "cross out", "ep48"],
  call: 'L.put(S, "ep48-check-strike", x, y, { s, t, row: 0, n: 6, pencil: false })', demo: { row: 1 } });

// ---------- phone: bars, "no signal", notification badge, or face down (origin = centre) ----------
L.reg("props", "ep48-phone", (o) => {
  const bars = o.bars ?? 0, down = !!o.down;
  let s = L.shadow(0, 130, 150) + L.shape(L.rrect(-70, -130, 140, 260, 22), down ? "gray" : "navy", { w: "prop" });
  if (down) return s + L.shape(L.circ(-34, -94, 16), "ink", { flat: true, w: "detail" }) + L.shape(L.circ(-34, -94, 7), "glass", { flat: true, w: "hair" });
  s += L.shape(L.rrect(-58, -116, 116, 232, 12), "night", { flat: true, w: "hair" });
  for (let i = 0; i < 4; i++) s += L.shape(L.rect(-44 + i * 16, -78 - 12 - i * 9, 11, 12 + i * 9), i < bars ? "green" : "gray", { flat: true, tone: i < bars ? 0 : 1, w: "hair" });
  if (!bars) s += L.stroke(`M-52 -64 L-4 -108`, { c: "red", w: "prop" }) + L.text("NO", 0, 0, { size: 36, c: "white" }) + L.text("SIGNAL", 0, 40, { size: 30, c: "white" });
  if (o.text) s += L.text(o.text, 0, 24, { size: o.size || 30, c: "white" });
  if (o.badge) s += L.shape(L.circ(58, -116, 32), "red", { w: "detail" }) + L.text(String(o.badge), 58, -105, { size: String(o.badge).length > 3 ? 24 : 30, c: "white" });
  return s;
}, { box: [-110, -150, 220, 300], group: "Internet week (ep48)", label: "Phone · bars / no signal / badge / face down", tags: ["phone", "no signal", "offline", "bars", "notifications", "badge", "face down", "ep48"],
  call: 'L.put(S, "ep48-phone", x, y, { s, t, bars: 0..4, badge: "4000", down: false, text })', demo: { bars: 0 } });

// ---------- card terminal with a message and a card in the slot (origin = centre) ----------
L.reg("props", "ep48-pos-terminal", (o) => {
  const msg = o.text || "DECLINED", dark = o.c || "red";
  let s = L.shadow(0, 150, 220) + L.shape(L.rrect(-110, -150, 220, 300, 26), "gray", { w: "prop" }) + L.shape(L.rrect(-90, -128, 180, 92, 10), "paper", { w: "detail" });
  s += L.text(msg, 0, -70, { size: msg.length > 8 ? 26 : 34, c: dark });
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) s += L.shape(L.rrect(-70 + c * 52, -14 + r * 44, 38, 30, 6), "white", { w: "hair" });
  s += L.shape(L.rrect(-70, 124, 140, 14, 5), "ink", { flat: true, w: "hair" });
  return s + L.g(L.shape(L.rrect(-62, -52, 124, 80, 10), "blue", { w: "detail" }) + L.flat(L.rect(-62, -34, 124, 18), "ink", 0.7), "translate(112 66) rotate(18)");
}, { box: [-140, -170, 330, 340], group: "Internet week (ep48)", label: "Card terminal · DECLINED", tags: ["card", "terminal", "payment", "declined", "pos", "checkout", "ep48"],
  call: 'L.put(S, "ep48-pos-terminal", x, y, { s, t, text: "DECLINED", c: "red" })', demo: {} });

// ---------- government-style preparedness booklet, generic blue cover with a yellow cross (origin = centre) ----------
L.reg("props", "ep48-booklet", (o) => {
  const fl = L.shape(L.rect(-82, -126, 164, 100), "blue", { flat: true, tone: 2, w: "hair" }) + L.flat(L.rect(-46, -126, 22, 100), "yellow") + L.flat(L.rect(-82, -86, 164, 22), "yellow");
  const lines = String(o.text || "BE READY|FOR A WEEK").split("|");
  let s = L.shadow(0, 170, 220) + L.shape(L.rrect(-110, -160, 220, 330, 8), "blue", { w: "prop" }) + fl;
  lines.forEach((ln, i) => (s += L.text(ln, 0, 24 + i * 40, { size: 30, c: "white" })));
  return L.g(s + L.stroke(`M-96 -146 L-96 156`, { w: "hair", c: "navy" }), "rotate(-5)");
}, { box: [-140, -190, 280, 380], group: "Internet week (ep48)", label: "Preparedness booklet", tags: ["booklet", "leaflet", "brochure", "crisis", "sweden", "prepare", "ep48"],
  call: 'L.put(S, "ep48-booklet", x, y, { s, t, text: "BE READY|FOR A WEEK" })', demo: {} });

// ---------- sea cable laid across the seabed: wavy, optional repeaters, optional cut with frayed ends (origin = centre) ----------
const cablePts = (w, amp, n) => Array.from({ length: n + 1 }, (_, i) => { const x = -w / 2 + (w * i) / n; return [x, Math.sin((i / n) * Math.PI * 3.1) * amp]; });
L.reg("props", "ep48-cable", (o) => {
  const w = o.w || 900, amp = o.amp ?? 16, n = 28, pts = cablePts(w, amp, n), gap = o.cut ? o.gap || 120 : 0;
  const part = (a) => L.stroke(L.smooth(a), { c: "ink", w: 22 }) + L.stroke(L.smooth(a), { c: "navy", w: 13 }) + L.stroke(L.smooth(a.map((p) => [p[0], p[1] - 3])), { c: "white", w: 3, op: 0.45 });
  let s = "";
  if (gap) {
    const A = pts.filter((p) => p[0] <= -gap / 2), B = pts.filter((p) => p[0] >= gap / 2);
    s += part(A) + part(B);
    [A[A.length - 1], B[0]].forEach((p, k) => (s += L.shape(L.circ(p[0], p[1], 12, 15), "orange", { w: "detail" }) + L.flat(L.circ(p[0], p[1], 5, 7), "yellow") + L.stroke(`M${f1(p[0])} ${f1(p[1] - 14)} l${k ? 12 : -12} -16 M${f1(p[0])} ${f1(p[1] + 14)} l${k ? 14 : -14} 14`, { c: "orange", w: "detail" })));
  } else s += part(pts);
  (o.rep || []).forEach((f) => { const x = -w / 2 + w * f, y = Math.sin(f * Math.PI * 3.1) * amp; if (gap && Math.abs(x) < gap / 2 + 40) return; s += L.g(L.shape(L.rrect(-44, -24, 88, 48, 12), "gray", { w: "prop" }) + L.stroke(`M-14 -24 L-14 24 M14 -24 L14 24`, { w: "detail", c: "ink" }), `translate(${f1(x)} ${f1(y)})`); });
  return s;
}, { box: [-480, -80, 960, 160], group: "Internet week (ep48)", label: "Undersea cable (optionally cut, with repeaters)", tags: ["cable", "undersea", "submarine", "sea floor", "internet", "cut", "broken", "repeater", "fibre", "ep48"],
  call: 'L.put(S, "ep48-cable", x, y, { s, t, w: 900, cut: false, gap: 120, rep: [0.25, 0.75], amp: 16 })', demo: { rep: [0.25, 0.75] }, wide: true });

// ---------- TV news desk with a NEWS sign; the anchor figure is placed separately behind it (origin = bottom centre of the desk) ----------
L.reg("props", "ep48-news-desk", (o) => {
  let s = L.shape(L.rrect(-150, -560, 300, 120, 14), "red", { w: "prop" }) + L.text(o.text || "NEWS", 0, -474, { size: 84, c: "white" });
  s += L.shadow(0, 0, 560) + L.shape(L.rrect(-250, -140, 500, 140, 8), "blue", { w: "prop" }) + L.flat(L.rect(-226, -118, 452, 14), "white", 0.35);
  s += L.shape(L.rrect(-270, -168, 540, 36, 8), "white", { w: "prop" });
  s += L.stroke(`M-130 -168 L-130 -200`, { w: "detail" }) + L.shape(L.circ(-130, -212, 15, 20), "ink", { flat: true, w: "detail" });
  return s + L.shape(L.rect(70, -184, 70, 16), "paper", { w: "hair" });
}, { box: [-300, -580, 600, 610], group: "Internet week (ep48)", label: "TV news desk", tags: ["news", "desk", "anchor", "tv", "broadcast", "microphone", "ep48"], call: 'L.put(S, "ep48-news-desk", x, gy, { s, t, text: "NEWS" })', demo: {} });

// ---------- telegraph key on a desk, optional small flames (1859) (origin = bottom centre) ----------
const flame = (x, y, k) => L.g(L.shape(`M0 0 C-22 -4 -26 -34 -8 -58 C-6 -42 4 -40 8 -52 C28 -34 24 -4 0 0 Z`, "orange", { w: "detail" }) + L.flat(`M0 -2 C-10 -4 -10 -20 0 -32 C10 -20 10 -4 0 -2 Z`, "yellow"), `translate(${x} ${y}) scale(${k})`);
L.reg("props", "ep48-telegraph", (o) => {
  let s = L.shadow(0, 0, 420) + L.shape(L.rrect(-200, -60, 400, 60, 8), "wood", { w: "prop" }) + L.shape(L.rrect(-170, -96, 220, 40, 8), "brown", { w: "prop" });
  s += L.stroke(`M-150 -96 L-70 -150 L90 -142`, { w: "prop", c: "gray" }) + L.shape(L.circ(96, -142, 20), "ink", { flat: true, w: "detail" });
  s += L.shape(L.rrect(-190, -150, 60, 56, 8), "gold", { w: "detail" }) + L.shape(L.circ(-160, -122, 10), "ink", { flat: true, w: "hair" });
  s += L.stroke(`M150 -96 C170 -200 120 -300 190 -380`, { w: "detail", c: "ink" });
  if (o.fire) s += flame(30, -150, 0.9) + flame(-110, -150, 0.7) + flame(184, -386, 0.8);
  return s;
}, { box: [-230, -430, 460, 460], group: "Internet week (ep48)", label: "Telegraph key (optional small fire)", tags: ["telegraph", "key", "morse", "1859", "wire", "fire", "old", "ep48"], call: 'L.put(S, "ep48-telegraph", x, gy, { s, t, fire: false })', demo: { fire: true } });

// ---------- big grid transformer: tank, fins, three bushings (origin = bottom centre) ----------
L.reg("props", "ep48-transformer", (o) => {
  let s = L.shadow(0, 0, 460) + L.shape(L.rrect(-170, -20, 340, 20, 4), "stone", { w: "prop" });
  [-230, 230].forEach((x) => (s += L.shape(L.rrect(x < 0 ? -258 : 170, -190, 88, 170, 8), "gray", { tone: 1, w: "prop" }) + L.stroke(`M${x - 22} -176 L${x - 22} -34 M${x} -176 L${x} -34 M${x + 22} -176 L${x + 22} -34`, { w: "hair", c: "ink" })));
  s += L.shape(L.rrect(-170, -230, 340, 214, 14), o.c || "gray", { w: "prop" }) + L.shape(L.rrect(-142, -204, 284, 162, 8), "gray", { tone: 1, w: "detail" });
  s += L.shape(L.rrect(-60, -180, 120, 56, 6), "paper", { w: "hair" }) + L.text("MULTI-TON", 0, -142, { size: 20, c: "ink" });
  [-110, 0, 110].forEach((x) => { for (let i = 0; i < 4; i++) s += L.shape(L.rrect(x - 22 + i * 3, -236 - i * 28, 44 - i * 6, 24, 8), "brown", { w: "detail" }); s += L.shape(L.circ(x, -352, 9), "gray", { w: "hair" }); });
  return s;
}, { box: [-290, -390, 580, 410], group: "Internet week (ep48)", label: "Grid transformer", tags: ["transformer", "power", "grid", "substation", "electric", "heavy", "ep48"], call: 'L.put(S, "ep48-transformer", x, gy, { s, t, c: "gray" })', demo: {} });

// ---------- phone mast with panels and signal arcs (origin = bottom centre) ----------
L.reg("props", "ep48-cell-tower", (o) => {
  let s = L.shadow(0, 0, 220), top = -430;
  s += L.stroke(`M-70 0 L-10 ${top} M70 0 L10 ${top}`, { w: "prop", c: "gray" });
  const hw = (y) => 70 - (-y / 430) * 60;
  for (let i = 0; i < 6; i++) { const y0 = -i * 70, y1 = -(i + 1) * 70, a = i % 2 ? -1 : 1; s += L.stroke(`M${f1(-a * hw(y0))} ${y0} L${f1(a * hw(y1))} ${y1} M${f1(-hw(y1))} ${y1} L${f1(hw(y1))} ${y1}`, { w: "detail", c: "gray" }); }
  [-26, 26].forEach((x) => (s += L.shape(L.rrect(x - 10, top - 34, 20, 90, 6), "white", { w: "detail" })));
  s += L.shape(L.circ(0, top - 40, 9), "red", { w: "hair" });
  if (o.waves !== false) [48, 88, 128].forEach((r) => { s += L.stroke(L.arc(0, top - 6, r, -150, -30), { w: "detail", c: o.c || "orange" }); });
  return s;
}, { box: [-170, -600, 340, 620], group: "Internet week (ep48)", label: "Phone mast with signal arcs", tags: ["tower", "mast", "cell", "base station", "antenna", "mobile network", "ep48"], call: 'L.put(S, "ep48-cell-tower", x, gy, { s, t, waves: true })', demo: {} });

// ---------- a plug on the end of a cable, lying unplugged (origin = centre of the plug) ----------
L.reg("props", "ep48-plug", (o) => {
  const cab = L.stroke(`M-60 0 C-150 -10 -170 60 -250 40 C-330 20 -340 90 -420 70`, { c: "ink", w: 16 });
  return cab + L.shape(L.rrect(-62, -32, 100, 64, 14), "white", { w: "prop" }) + L.shape(L.rrect(36, -22, 36, 10, 3), "gold", { w: "detail" }) + L.shape(L.rrect(36, 12, 36, 10, 3), "gold", { w: "detail" });
}, { box: [-440, -60, 540, 160], group: "Internet week (ep48)", label: "Unplugged plug on a cable", tags: ["plug", "unplugged", "cable", "power", "router", "ep48"], call: 'L.put(S, "ep48-plug", x, y, { s, t })', demo: {}, wide: true });
})();
