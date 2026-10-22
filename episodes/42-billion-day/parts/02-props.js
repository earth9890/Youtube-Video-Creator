
// ---------- borrowed bits (episode 37) ----------
const stopwatch = (S, cx, cy, r, o = {}) => {
  const t = o.t, g = S.grp(o.parent);
  DS.shape(S, rrect(cx - 18, cy - r - 46, 36, 34, DS.r.xs), "gray", { t, tone: 2, w: "detail", parent: g });
  DS.shape(S, circ(cx, cy, r), "white", { t, parent: g });
  S.draw(rays(cx, cy, r * 0.8, r * 0.92, 12, -Math.PI / 2), t ?? S.start, 0, { c: DS.c("ink"), w: DS.w.detail, parent: g });
  const hand = S.grp(g); S.draw(line([cx, cy], [cx, cy - r * 0.75], 0), t ?? S.start, 0, { c: DS.c("red"), w: DS.w.near, parent: hand });
  if (o.go !== undefined) spin(hand, o.go, o.dur || 3, 0, o.deg || 330, cx, cy, "none");
  DS.shape(S, circ(cx, cy, 10), "ink", { t, w: "hair", parent: g });
  return g;
};
const globe = (S, cx, cy, r, o = {}) => {
  DS.shape(S, circ(cx, cy, r), "sky", { parent: o.parent });
  [[-0.35, -0.3, 0.32, 0.22], [0.25, -0.1, 0.28, 0.4], [-0.2, 0.42, 0.24, 0.16]].forEach(([a, b, rx, ry]) => DS.shape(S, circ(cx + a * r, cy + b * r, rx * r, ry * r), "grass", { w: "detail", parent: o.parent }));
  S.draw(circ(cx, cy, r * 0.45, r) + line([cx - r, cy], [cx + r, cy], 0), S.start, 0, { c: DS.c("blue", 1), w: DS.w.hair, parent: o.parent });
};
const priceTag = (S, x, y, str, o = {}) => { const g = S.grp(o.parent), wd = str.length * DS.type.small * 0.62 + 90; S.draw(line([x - 60, y - 80], [x, y], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.detail, parent: g }); DS.shape(S, `M${x} ${y} L${x + 40} ${y - 40} H${x + wd} V${y + 40} H${x + 40} Z`, "gold", { w: "mid", parent: g }); DS.shape(S, circ(x + 30, y, 10), "white", { w: "hair", parent: g }); S.text(str, x + 40 + (wd - 40) / 2, y + 19, { size: DS.type.small, c: DS.c("ink"), t: T0(S), parent: g }); return fadeG(S, g, o.t); };

// ---------- money ----------
const mon = (n) => "$" + Math.round(n).toLocaleString("en-US");
// generic banknote (our own design: no portrait, no seal). o.val = numeral in the corners (only when big enough to read)
const note = (S, cx, cy, k = 1, o = {}) => {
  const g = S.grp(o.parent), w = 240 * k, h = 104 * k, x0 = cx - w / 2, y0 = cy - h / 2, name = o.name || "green";
  if (k >= 0.5) DS.drop(S, rrect(x0 + 4 * k, y0 + 6 * k, w, h, DS.r.xs), { parent: g });
  DS.shape(S, rrect(x0, y0, w, h, DS.r.xs), name, { tone: o.tone ?? 1, flat: true, w: k >= 1 ? "mid" : "detail", parent: g });
  S.draw(rrect(x0 + 10 * k, y0 + 10 * k, w - 20 * k, h - 20 * k, DS.r.xs), S.start, 0, { c: DS.c(name, 2), w: DS.w.hair, parent: g });
  DS.shape(S, circ(cx, cy, 30 * k, 36 * k), name, { tone: 0, flat: true, w: "hair", parent: g });
  if (o.val && k >= 1.3) [x0 + 54 * k, x0 + w - 54 * k].forEach((tx) => txt(S, o.val, tx, cy + 14, { t: S.start, parent: g, c: DS.c(name, 2) }));
  return fadeG(S, g, o.t);
};
// a bundle of notes with a paper band (side view)
const bundle = (S, cx, cy, k = 1, o = {}) => {
  const g = S.grp(o.parent), w = 200 * k, h = 64 * k, x0 = cx - w / 2, y0 = cy - h / 2;
  DS.shape(S, rrect(x0, y0, w, h, DS.r.xs), "green", { tone: 1, w: k >= 0.8 ? "mid" : "detail", parent: g });
  for (let i = 1; i < 5; i++) S.draw(line([x0 + 6 * k, y0 + (i * h) / 5], [x0 + w - 6 * k, y0 + (i * h) / 5], 0), S.start, 0, { c: DS.c("green", 2), w: DS.w.hair, parent: g });
  DS.shape(S, rect(cx - 18 * k, y0, 36 * k, h), "paper", { flat: true, w: "hair", parent: g });
  return fadeG(S, g, o.t);
};
// pyramid of bundles on a pallet; rows bottom to top, o.t0 + i * o.dt = row i fades in
const cashPile = (S, cx, gy, k, rows = 6, o = {}) => {
  const g = S.grp(o.parent), bw = 140 * k, bh = 50 * k;
  DS.shadow(S, cx, gy, rows * bw * 1.2, { parent: g });
  DS.shape(S, rect(cx - (rows * bw) / 2 - 20 * k, gy - 22 * k, rows * bw + 40 * k, 22 * k), "wood", { w: "detail", parent: g });
  for (let r = 0; r < rows; r++) {
    const rg = S.grp(g), n = rows - r;
    for (let i = 0; i < n; i++) bundle(S, cx + (i - (n - 1) / 2) * bw, gy - 22 * k - bh / 2 - r * bh, k * 0.7, { parent: rg });
    if (o.t0 !== undefined) fadeG(S, rg, o.t0 + r * (o.dt ?? 0.15), 0.3);
  }
  return g;
};
// weighing scale (kitchen style): display above the base; things sit on top at (cx, gy - 90k). o.read = text on the display
const scaleBox = (S, cx, gy, k, read, o = {}) => {
  const g = S.grp(o.parent), w = 380 * k;
  DS.shadow(S, cx, gy, w * 1.1, { parent: g });
  DS.shape(S, rrect(cx - w / 2, gy - 90 * k, w, 90 * k, DS.r.sm), "gray", { tone: 1, w: "mid", parent: g });
  DS.shape(S, rrect(cx - w / 2 + 14 * k, gy - 100 * k, w - 28 * k, 22 * k, DS.r.xs), "gray", { tone: 2, flat: true, w: "detail", parent: g });
  DS.shape(S, rrect(cx - 110 * k, gy - 66 * k, 220 * k, 46 * k, DS.r.xs), "navy", { tone: 2, flat: true, w: "detail", parent: g });
  const te = S.text(read, cx, gy - 30 * k, { size: DS.type.caption, c: DS.P.white[0], t: o.tt ?? T0(S), parent: g });
  g.read = te;
  return g;
};
// coin with text (r >= 36 for text)
const coin = (S, cx, cy, r, str, o = {}) => {
  const g = S.grp(o.parent);
  DS.shape(S, circ(cx, cy, r), "gold", { w: r > 40 ? "mid" : "detail", parent: g });
  S.draw(circ(cx, cy, r * 0.78), S.start, 0, { c: DS.c("gold", 2), w: DS.w.hair, parent: g });
  if (str && r >= 36) txt(S, str, cx, cy + 14, { parent: g, c: DS.c("gold", 2, "near") });
  return fadeG(S, g, o.t);
};
// money moves along a straight line: a coin that travels p0 -> p1 at t, then stays (o.stay) or fades
const coinMove = (S, p0, p1, t, dur, r = 20, o = {}) => {
  const g = coin(S, p0[0], p0[1], r, null, {});
  tl.fromTo(g, { opacity: 0 }, { opacity: 1, duration: 0.2 }, t);
  tl.fromTo(g, { attr: { transform: "translate(0 0)" } }, { attr: { transform: `translate(${p1[0] - p0[0]} ${p1[1] - p0[1]})` }, duration: dur, ease: "power1.inOut", immediateRender: false }, t);
  if (!o.stay) tl.to(g, { opacity: 0, duration: 0.3 }, t + dur);
  return g;
};

// ---------- elephants (generic, grey, facing right) ----------
const elephant = (S, x, gy, k = 1, o = {}) => {
  const g = S.grp(o.parent), L = o.layer || "near";
  DS.shadow(S, x + 20 * k, gy, 380 * k, { parent: g });
  [[-130, 0], [-70, 6], [60, 6], [118, 0]].forEach(([dx, dy], i) => DS.shape(S, rrect(x + dx * k - 26 * k, gy - 118 * k + dy * k * 0.3, 52 * k, 118 * k - dy * k * 0.3, DS.r.sm * k), "gray", { layer: L, tone: i % 2 ? 2 : 1, w: "mid", parent: g }));
  DS.shape(S, rrect(x - 190 * k, gy - 270 * k, 340 * k, 190 * k, 84 * k), "gray", { layer: L, tone: 0, w: "near", parent: g });
  S.draw(`M${x - 190 * k} ${gy - 200 * k} Q${x - 214 * k} ${gy - 170 * k} ${x - 206 * k} ${gy - 130 * k}`, S.start, 0, { c: DS.line(L), w: DS.w.mid, parent: g });
  DS.shape(S, circ(x + 168 * k, gy - 214 * k, 78 * k, 70 * k), "gray", { layer: L, tone: 0, w: "near", parent: g });
  DS.shape(S, `M${x + 214 * k} ${gy - 196 * k} C${x + 290 * k} ${gy - 190 * k} ${x + 296 * k} ${gy - 110 * k} ${x + 262 * k} ${gy - 44 * k} L${x + 232 * k} ${gy - 54 * k} C${x + 256 * k} ${gy - 112 * k} ${x + 246 * k} ${gy - 150 * k} ${x + 200 * k} ${gy - 160 * k} Z`, "gray", { layer: L, tone: 0, w: "mid", parent: g });
  DS.shape(S, `M${x + 196 * k} ${gy - 226 * k} C${x + 100 * k} ${gy - 300 * k} ${x + 60 * k} ${gy - 180 * k} ${x + 110 * k} ${gy - 130 * k} C${x + 150 * k} ${gy - 110 * k} ${x + 190 * k} ${gy - 150 * k} ${x + 196 * k} ${gy - 226 * k} Z`, "gray", { layer: L, tone: 2, w: "mid", parent: g });
  DS.shape(S, `M${x + 214 * k} ${gy - 168 * k} q${40 * k} ${20 * k} ${64 * k} ${-4 * k} q${-30 * k} ${44 * k} ${-64 * k} ${4 * k} Z`, "white", { layer: L, flat: true, w: "hair", parent: g });
  S.fill(circ(x + 196 * k, gy - 232 * k, 7 * k), S.start, 0, DS.P.ink[0], 1, g);
  return fadeG(S, g, o.t);
};

// ---------- the runner: the DAY CLOCK (24-hour dial, midnight on top) and the MONEY METER ----------
const fmtTime = (h) => { const m = Math.floor(h * 60 + 1e-6), hh = Math.floor(m / 60) % 24, mm = m % 60; return `${hh % 12 || 12}:${String(mm).padStart(2, "0")} ${hh < 12 ? "AM" : "PM"}`; };
const wedgeD = (cx, cy, rr, h) => `M${f1(cx)} ${f1(cy)} ` + arcPts(cx, cy, rr, h * 15 - 90, 270, 30).map(([x, y]) => `L${f1(x)} ${f1(y)}`).join(" ") + " Z";
// drive anything from the scene clock: fn(absolute time) is called while the scene plays, and once now
const bindT = (S, fn) => { const v = { p: 0 }; fn(S.start); tl.fromTo(v, { p: 0 }, { p: 1, duration: S.len, ease: "none", immediateRender: false, onUpdate: () => fn(S.start + v.p * S.len) }, S.start); };
const CUT_H = 18.75; // the real deadline: 6:45 pm
// o.cut = time the red 6:45 pm marker appears (true = already there); o.read = digital readout chip under the dial; o.labels = AM/PM captions around the dial; o.h = fixed hour instead of HK
const dayClock = (S, cx, cy, r, o = {}) => {
  const g = S.grp(o.parent), big = r >= 150, sw = big ? DS.w.mid : DS.w.detail;
  DS.drop(S, circ(cx + 6, cy + 10, r + 8), { parent: g });
  DS.shape(S, circ(cx, cy, r), "white", { flat: true, w: big ? "near" : "mid", parent: g });
  const wedge = el("path", { d: "", fill: DS.c("yellow", 0), opacity: 0.95 }, g);
  S.draw(rays(cx, cy, r * 0.84, r * 0.97, 24, -Math.PI / 2), S.start, 0, { c: DS.c("ink"), w: sw, parent: g });
  S.draw(rays(cx, cy, r * 0.72, r * 0.97, 4, -Math.PI / 2, Math.PI * 1.5), S.start, 0, { c: DS.c("ink"), w: big ? DS.w.near : DS.w.mid, parent: g });
  S.draw(circ(cx, cy, r * 0.97), S.start, 0, { c: DS.c("ink"), w: big ? DS.w.mid : DS.w.detail, parent: g });
  if (o.labels) [["12 AM", 0, -1.2], ["6 AM", 1.3, 0.12], ["12 PM", 0, 1.38], ["6 PM", -1.3, 0.12]].forEach(([s, dx, dy]) => txt(S, s, cx + dx * r * 0.98 + (dx ? Math.sign(dx) * 28 : 0), cy + dy * r * 0.98, { anchor: dx > 0 ? "start" : dx < 0 ? "end" : "middle", parent: g }));
  let cutG = null;
  if (o.cut !== undefined) {
    cutG = S.grp(g); const a = (CUT_H * 15 - 90) * Math.PI / 180, c = Math.cos(a), s = Math.sin(a);
    S.draw(line([cx + c * r * 0.2, cy + s * r * 0.2], [cx + c * r * 1.08, cy + s * r * 1.08], 0), S.start, 0, { c: DS.c("red"), w: big ? DS.w.near : DS.w.mid, parent: cutG });
    DS.shape(S, circ(cx + c * r * 1.14, cy + s * r * 1.14, r * 0.11), "red", { w: big ? "mid" : "detail", parent: cutG });
    if (o.cut !== true) fadeG(S, cutG, o.cut);
  }
  const hand = el("path", { d: `M${cx} ${cy + r * 0.12} L${cx} ${cy - r * 0.8}`, stroke: DS.c("red", 2), "stroke-width": big ? DS.w.near * 1.5 : DS.w.near, "stroke-linecap": "round", fill: "none" }, g);
  DS.shape(S, circ(cx, cy, r * 0.07), "ink", { w: "hair", parent: g });
  let rd = null;
  if (o.read) {
    const bw = 190, bh = 54, by = cy + r + 22;
    DS.shape(S, rrect(cx - bw / 2, by, bw, bh, DS.r.sm), "white", { flat: true, w: "detail", parent: g });
    rd = S.text("12:01 AM", cx, by + 40, { size: DS.type.caption, c: DS.P.ink[0], t: T0(S), parent: g });
  }
  const render = (h) => { hand.setAttribute("transform", `rotate(${f1(h * 15)} ${cx} ${cy})`); wedge.setAttribute("d", wedgeD(cx, cy, r * 0.97, h)); if (rd) rd.textContent = fmtTime(h); };
  if (o.h !== undefined) render(o.h); else bindT(S, (t) => render((o.fn || hourAt)(t)));
  return fadeG(S, g, o.t);
};
// money meter chip (top right): coin, number, bar. Follows MK.
const moneyChip = (S, o = {}) => {
  const g = S.grp(), x0 = 1360, y0 = 80, w = 480, h = 116;
  DS.drop(S, rrect(x0 + 6, y0 + 10, w, h, DS.r.md), { parent: g });
  DS.shape(S, rrect(x0, y0, w, h, DS.r.md), "white", { flat: true, w: "detail", parent: g });
  DS.shape(S, circ(x0 + 50, y0 + 46, 28), "gold", { w: "detail", parent: g });
  txt(S, "$", x0 + 50, y0 + 60, { parent: g, c: DS.c("gold", 2) });
  const te = S.text(mon(1e9), x0 + 92, y0 + 62, { size: DS.type.caption, anchor: "start", c: DS.P.ink[0], t: T0(S), parent: g });
  DS.shape(S, rrect(x0 + 30, y0 + 84, w - 60, 16, DS.r.sm), "gray", { tone: 1, flat: true, w: "hair", parent: g });
  const fill = el("rect", { x: x0 + 30, y: y0 + 84, width: w - 60, height: 16, rx: 8, fill: DS.c("green", 0), stroke: DS.P.ink[0], "stroke-width": DS.w.hair }, g);
  const render = (v) => { te.textContent = mon(v); te.setAttribute("fill", v <= 0 ? DS.c("red", 2) : DS.P.ink[0]); fill.setAttribute("width", Math.max(0.01, (v / 1e9) * (w - 60))); };
  bindT(S, (t) => render(moneyAt(t)));
  return g;
};
// the standard HUD: day clock top-left, money chip top-right. o.no hides both; o.noClock / o.noMoney hide one
const hud = (S, o = {}) => {
  if (o.no) return;
  if (!o.noClock) dayClock(S, 188, 196, 84, { read: true, cut: o.cut });
  if (!o.noMoney) moneyChip(S);
};
// every scene ends with this: HUD, then the vignette
const fin = (S, o = {}) => { hud(S, o); DS.vignette(S); };

// ---------- stuff ----------
// Dave's backpack (the third runner). fill 0 = flat and empty, 1 = full. Feet on gy.
const backpack = (S, cx, gy, k = 1, fill = 1, o = {}) => {
  const g = S.grp(o.parent), h = (84 + 96 * fill) * k, w = (150 - 20 * (1 - fill)) * k, y0 = gy - h;
  DS.shadow(S, cx, gy, w * 1.5, { parent: g });
  DS.shape(S, `M${cx - 24 * k} ${y0 + 4 * k} Q${cx} ${y0 - 36 * k} ${cx + 24 * k} ${y0 + 4 * k}`, "orange", { tone: 2, w: "mid", parent: g });
  DS.shape(S, rrect(cx - w / 2, y0, w, h, DS.r.lg * k), "orange", { w: "mid", parent: g });
  DS.shape(S, rrect(cx - w * 0.36, y0 + h * 0.52, w * 0.72, h * 0.4, DS.r.md * k), "orange", { tone: 2, w: "detail", parent: g });
  S.draw(`M${cx - w * 0.3} ${y0 + h * 0.5} H${cx + w * 0.3}`, S.start, 0, { c: DS.c("orange", 2, "near"), w: DS.w.detail, parent: g });
  DS.shape(S, rrect(cx - w / 2 - 14 * k, y0 + h * 0.18, 18 * k, h * 0.5, DS.r.sm * k), "orange", { tone: 2, w: "detail", parent: g });
  if (fill > 0.6) bundle(S, cx, y0 - 2 * k, 0.55 * k, { parent: g });
  return fadeG(S, g, o.t);
};
const stack = (S, cx, gy, w, n, name = "paper", o = {}) => { // stack of flat sheets (forms, paper), each fades in at o.t0 + i * o.dt
  const g = S.grp(o.parent);
  for (let i = 0; i < n; i++) { const sg = S.grp(g); DS.shape(S, rect(cx - w / 2 + ((i * 7) % 11) - 5, gy - (i + 1) * (o.h || 12), w, o.h || 12), name, { tone: i % 2 ? 0 : 2, flat: true, w: "hair", parent: sg }); if (o.t0 !== undefined) fadeG(S, sg, o.t0 + i * (o.dt ?? 0.04), 0.25); }
  return g;
};
// a form: title, rows of lines, optional OCCUPATION box. k = scale
const form = (S, cx, cy, k = 1, o = {}) => {
  const g = S.grp(o.parent), w = 380 * k, h = 500 * k, x0 = cx - w / 2, y0 = cy - h / 2;
  DS.drop(S, rect(x0 + 8, y0 + 12, w, h), { parent: g });
  DS.shape(S, rect(x0, y0, w, h), "white", { flat: true, w: k >= 0.8 ? "mid" : "detail", parent: g });
  if (k >= 0.9) txt(S, "CASH FORM", cx, y0 + 70 * k, { parent: g });
  else S.draw(rect(x0 + 30 * k, y0 + 36 * k, w - 60 * k, 30 * k), S.start, 0, { c: DS.c("ink"), w: DS.w.detail, parent: g });
  lines(S, x0 + 30 * k, y0 + 120 * k, w - 60 * k, o.occ ? 3 : 8, S.start, 40 * k, g);
  if (o.occ) {
    const by = y0 + 270 * k;
    txt(S, "OCCUPATION:", cx, by, { parent: g });
    DS.shape(S, rect(x0 + 30 * k, by + 24 * k, w - 60 * k, 70 * k), "paper", { flat: true, w: "detail", parent: g });
    lines(S, x0 + 30 * k, by + 150 * k, w - 60 * k, 3, S.start, 40 * k, g);
  } else if (o.stamp) stamp(S, cx, cy + 110 * k, o.stamp, o.stampT ?? S.start + 0.4, "red", { size: DS.type.caption, rot: -8 });
  return fadeG(S, g, o.t);
};
const house = (S, cx, gy, k = 1, name = "wall", o = {}) => {
  const g = S.grp(o.parent), w = 220 * k, h = 130 * k, L = o.layer || "near";
  DS.shadow(S, cx, gy, w * 1.3, { parent: g });
  DS.shape(S, rect(cx - w / 2, gy - h, w, h), name, { layer: L, tone: o.tone ?? 0, w: k >= 0.7 ? "mid" : "detail", parent: g });
  DS.shape(S, `M${cx - w / 2 - 18 * k} ${gy - h + 4 * k} L${cx} ${gy - h - 96 * k} L${cx + w / 2 + 18 * k} ${gy - h + 4 * k} Z`, o.roof || "red", { layer: L, tone: 2, w: k >= 0.7 ? "mid" : "detail", parent: g });
  DS.shape(S, rect(cx - 20 * k, gy - 74 * k, 40 * k, 74 * k), "brown", { layer: L, flat: true, w: "detail", parent: g });
  [-1, 1].forEach((s) => DS.shape(S, rect(cx + s * 70 * k - 22 * k, gy - 100 * k, 44 * k, 44 * k), "glass", { layer: L, flat: true, w: "detail", parent: g }));
  return fadeG(S, g, o.t);
};
const rocket = (S, cx, gy, k = 1, o = {}) => {
  const g = S.grp(o.parent), w = 84 * k, h = 330 * k, L = o.layer || "near";
  DS.shadow(S, cx, gy, 170 * k, { parent: g });
  DS.shape(S, `M${cx - w / 2} ${gy - 70 * k} L${cx - w / 2 - 44 * k} ${gy} L${cx - w / 2} ${gy - 20 * k} Z M${cx + w / 2} ${gy - 70 * k} L${cx + w / 2 + 44 * k} ${gy} L${cx + w / 2} ${gy - 20 * k} Z`, "red", { layer: L, w: "mid", parent: g });
  DS.shape(S, rrect(cx - w / 2, gy - h, w, h - 10 * k, DS.r.md * k), "white", { layer: L, w: "mid", parent: g });
  DS.shape(S, `M${cx - w / 2} ${gy - h + 62 * k} Q${cx} ${gy - h - 110 * k} ${cx + w / 2} ${gy - h + 62 * k} Z`, "red", { layer: L, w: "mid", parent: g });
  DS.shape(S, circ(cx, gy - h + 120 * k, 17 * k), "glass", { layer: L, w: "detail", parent: g });
  S.draw(`M${cx - w / 2} ${gy - 120 * k} H${cx + w / 2}`, S.start, 0, { c: DS.line(L), w: DS.w.detail, parent: g });
  return fadeG(S, g, o.t);
};
// building with columns and a pediment. o.label on the frieze (caption size, short words only)
const columns = (S, cx, gy, k, label, o = {}) => {
  const g = S.grp(o.parent), w = 460 * k, name = o.name || "wall", L = o.layer || "near";
  DS.shadow(S, cx, gy, w * 1.15, { parent: g });
  DS.shape(S, rect(cx - w / 2 - 20 * k, gy - 30 * k, w + 40 * k, 30 * k), "gray", { layer: L, tone: 1, w: "mid", parent: g });
  DS.shape(S, rect(cx - w / 2, gy - 280 * k, w, 250 * k), name, { layer: L, tone: 2, flat: true, w: "mid", parent: g });
  for (let i = 0; i < 6; i++) DS.shape(S, rect(cx - w / 2 + (i + 0.5) * (w / 6) - 20 * k, gy - 280 * k, 40 * k, 250 * k), "white", { layer: L, dir: "h", w: "detail", parent: g });
  DS.shape(S, rect(cx - w / 2 - 14 * k, gy - 340 * k, w + 28 * k, 60 * k), name, { layer: L, tone: 1, w: "mid", parent: g });
  DS.shape(S, `M${cx - w / 2 - 20 * k} ${gy - 340 * k} L${cx} ${gy - 440 * k} L${cx + w / 2 + 20 * k} ${gy - 340 * k} Z`, name, { layer: L, tone: 0, w: "mid", parent: g });
  if (label && k >= 0.9) txt(S, label, cx, gy - 298 * k, { parent: g, c: DS.c("ink") });
  return fadeG(S, g, o.t);
};
// 12-storey hospital; the sign is a plain H. o.floors, o.glow = windows lit
const hospital = (S, cx, gy, k = 1, o = {}) => {
  const g = S.grp(o.parent), fl = o.floors || 12, cols = 6, w = 440 * k, fh = 46 * k, h = fl * fh + 50 * k, L = o.layer || "near";
  DS.shadow(S, cx, gy, w * 1.2, { parent: g });
  DS.shape(S, rect(cx - w / 2, gy - h, w, h), "white", { layer: L, tone: 2, dir: "h", w: k >= 0.7 ? "mid" : "detail", parent: g });
  DS.shape(S, rect(cx - w / 2 - 36 * k, gy - 6 * fh * 1.1 * 0 - 150 * k, 80 * k, 150 * k), "sand", { layer: L, tone: 0, w: "detail", parent: g });
  for (let r = 0; r < fl; r++) for (let c = 0; c < cols; c++) S.fill(rect(cx - w / 2 + 28 * k + c * ((w - 56 * k) / cols), gy - h + 28 * k + r * fh, (w - 56 * k) / cols - 14 * k, fh - 18 * k), S.start, 0, o.lit ? DS.c("yellow", 1, L) : DS.c("sky", 0, L), 1, g);
  DS.shape(S, rect(cx - 56 * k, gy - 96 * k, 112 * k, 96 * k), "glass", { layer: L, flat: true, w: "detail", parent: g });
  DS.shape(S, rect(cx - w / 2 - 6 * k, gy - h - 26 * k, w + 12 * k, 26 * k), "gray", { layer: L, tone: 1, w: "detail", parent: g });
  DS.shape(S, rrect(cx - 40 * k, gy - h - 96 * k, 80 * k, 80 * k, DS.r.sm * k), "blue", { layer: L, w: "detail", parent: g });
  S.draw(`M${cx - 18 * k} ${gy - h - 80 * k} V${gy - h - 32 * k} M${cx + 18 * k} ${gy - h - 80 * k} V${gy - h - 32 * k} M${cx - 18 * k} ${gy - h - 56 * k} H${cx + 18 * k}`, S.start, 0, { c: DS.P.white[0], w: DS.w.near * Math.max(0.6, k), parent: g });
  return fadeG(S, g, o.t);
};
// 18 gold hexagons with the centre one missing (the segmented mirror). r = hex size. Returns { g, cx, cy, hexes }
const mirror = (S, cx, cy, r, o = {}) => {
  const g = S.grp(o.parent), hexes = [];
  for (let q = -2; q <= 2; q++) for (let rr = -2; rr <= 2; rr++) {
    const d = Math.max(Math.abs(q), Math.abs(rr), Math.abs(q + rr)); if (d === 0 || d > 2) continue;
    const x = cx + r * 1.5 * q, y = cy + r * Math.sqrt(3) * (rr + q / 2); hexes.push([x, y]);
    DS.shape(S, `M${f1(x + r)} ${f1(y)} ` + [1, 2, 3, 4, 5].map((i) => `L${f1(x + r * Math.cos((i * Math.PI) / 3))} ${f1(y + r * Math.sin((i * Math.PI) / 3))}`).join(" ") + " Z", "gold", { w: "mid", tone: (q + rr + 4) % 3, parent: g });
  }
  return { g: fadeG(S, g, o.t), hexes };
};
// close crowd of mini people on a grid, fading in row by row from t0
const crowdGrid = (S, x0, y0, cols, rows, dx, dy, k, t0, dt, o = {}) => {
  const g = S.grp();
  for (let r = 0; r < rows; r++) { const rg = S.grp(g); for (let c = 0; c < cols; c++) mini(S, x0 + c * dx + (r % 2) * dx * 0.5, y0 + r * dy, k, { parent: rg, c: DS.c(OC[(r * 3 + c) % 8], 2), fill: DS.c(OC[(r * 3 + c) % 8], 1) }); fadeG(S, rg, t0 + r * dt, 0.3); }
  return g;
};
// big 2-line sign under a heading: generic dark-blue banner (news ticker)
const ticker = (S, x, y, w, str, o = {}) => {
  const g = S.grp(o.parent);
  DS.shape(S, rect(x, y, w, 72), "red", { tone: 2, flat: true, w: "detail", parent: g });
  txt(S, str, x + w / 2, y + 52, { parent: g, c: DS.P.white[0] });
  return fadeG(S, g, o.t);
};
// phone: body + dark screen. returns { g, sx, sy (screen centre), sw, sh }
const mphone = (S, cx, cy, k, o = {}) => {
  const g = S.grp(o.parent), w = 300 * k, h = 560 * k, x0 = cx - w / 2, y0 = cy - h / 2;
  DS.drop(S, rrect(x0 + 8, y0 + 12, w, h, DS.r.lg * k), { parent: g });
  DS.shape(S, rrect(x0, y0, w, h, DS.r.lg * k), "ink", { tone: 1, w: "mid", parent: g });
  DS.shape(S, rrect(x0 + 16 * k, y0 + 46 * k, w - 32 * k, h - 92 * k, DS.r.sm * k), o.screen || "navy", { flat: true, tone: o.tone ?? 2, w: "hair", parent: g });
  DS.shape(S, rrect(cx - 36 * k, y0 + 16 * k, 72 * k, 12 * k, DS.r.xs), "ink", { tone: 2, flat: true, w: "hair", parent: g });
  return { g: fadeG(S, g, o.t), cx, cy, k, sx: cx, sy: cy, sw: w - 32 * k, sh: h - 92 * k, x0, y0, w, h };
};
// trolley (faces right)
const trolley = (S, x, gy, k = 1, o = {}) => {
  const g = S.grp(o.parent);
  DS.shadow(S, x, gy, 300 * k, { parent: g });
  DS.shape(S, `M${x - 140 * k} ${gy - 190 * k} H${x + 130 * k} L${x + 100 * k} ${gy - 90 * k} H${x - 110 * k} Z`, "gray", { tone: 1, w: "mid", parent: g });
  [-80, -20, 40, 100].forEach((dx) => S.draw(line([x + dx * k - 12 * k, gy - 190 * k], [x + dx * k, gy - 90 * k], 0), S.start, 0, { c: DS.c("gray", 2), w: DS.w.detail, parent: g }));
  S.draw(line([x - 124 * k, gy - 140 * k], [x + 116 * k, gy - 140 * k], 0), S.start, 0, { c: DS.c("gray", 2), w: DS.w.detail, parent: g });
  S.draw(`M${x - 140 * k} ${gy - 190 * k} L${x - 190 * k} ${gy - 236 * k} H${x - 150 * k}`, S.start, 0, { c: DS.line("near"), w: DS.w.mid, parent: g });
  S.draw(`M${x - 110 * k} ${gy - 90 * k} L${x - 70 * k} ${gy - 44 * k} H${x + 70 * k} L${x + 100 * k} ${gy - 90 * k}`, S.start, 0, { c: DS.line("near"), w: DS.w.detail, parent: g });
  [-60, 70].forEach((dx) => DS.shape(S, circ(x + dx * k, gy - 20 * k, 20 * k), "ink", { tone: 1, w: "detail", parent: g }));
  return fadeG(S, g, o.t);
};
const cheese = (S, cx, cy, k = 1, o = {}) => {
  const g = S.grp(o.parent);
  DS.shape(S, `M${cx - 80 * k} ${cy + 36 * k} L${cx + 90 * k} ${cy + 36 * k} L${cx + 90 * k} ${cy - 10 * k} L${cx - 80 * k} ${cy - 46 * k} Z`, "yellow", { w: k >= 0.7 ? "mid" : "detail", parent: g });
  DS.shape(S, `M${cx - 80 * k} ${cy - 46 * k} L${cx + 90 * k} ${cy - 10 * k} L${cx + 60 * k} ${cy - 40 * k} L${cx - 50 * k} ${cy - 66 * k} Z`, "yellow", { tone: 1, w: k >= 0.7 ? "mid" : "detail", parent: g });
  [[-30, 10, 9], [20, 18, 12], [50, -2, 7], [-50, 22, 6]].forEach(([dx, dy, rr]) => DS.shape(S, circ(cx + dx * k, cy + dy * k, rr * k), "yellow", { tone: 2, flat: true, w: "hair", parent: g }));
  return fadeG(S, g, o.t);
};
// generic shelf unit against a wall: posts, boards, coloured boxes (no brands). (x, y) top-left
const shelves = (S, x, y, w, h, o = {}) => {
  const g = S.grp(o.parent), rows = o.rows || 3, rh = h / rows, cols = ["red", "blue", "green", "orange", "purple", "pink", "yellow", "sky"];
  DS.shape(S, rect(x, y, w, h), "gray", { layer: "mid", tone: 1, flat: true, w: "detail", parent: g });
  for (let r = 0; r < rows; r++) {
    let bx = x + 14;
    for (let i = 0; bx < x + w - 70; i++) { const bw = 42 + ((i * 17 + r * 11) % 36), bh = 52 + ((i * 23 + r * 7) % 40); DS.shape(S, rrect(bx, y + (r + 1) * rh - 14 - bh, bw, bh, DS.r.xs), cols[(i * 3 + r * 5) % cols.length], { layer: "mid", tone: (i + r) % 2, w: "hair", parent: g }); bx += bw + 8; }
    DS.shape(S, rect(x, y + (r + 1) * rh - 14, w, 14), "wood", { layer: "mid", tone: 1, flat: true, w: "hair", parent: g });
  }
  return g;
};
// a two-line "fluorescent strip" light with a soft glow, hung from the ceiling
const striplight = (S, cx, y, w) => { S.fill(rect(cx - w / 2, y, w, 16), S.start, 0, DS.P.white[0], 1); S.fill(circ(cx, y + 90, w * 0.55, 150), S.start, 0, DS.c("yellow", 1), 0.16); };
const receipt = (S, x, y, w, h, lns, o = {}) => {
  const g = S.grp(o.parent), n = 10, tw = w / n;
  DS.drop(S, rect(x + 8, y + 12, w, h), { parent: g });
  DS.shape(S, `M${x} ${y} H${x + w} V${y + h} ` + Array.from({ length: n }, (_, i) => `L${f1(x + w - (i + 0.5) * tw)} ${y + h + 18} L${f1(x + w - (i + 1) * tw)} ${y + h}`).join(" ") + " Z", "white", { flat: true, w: "detail", parent: g });
  lns.forEach(([a, b], i) => { txt(S, a, x + 28, y + 64 + i * 56, { anchor: "start", parent: g }); if (b) txt(S, b, x + w - 28, y + 64 + i * 56, { anchor: "end", parent: g }); });
  return fadeG(S, g, o.t);
};
// weekday cell grid: cells = [{ s, c }] ; (x, y) top-left. returns cell centres
const calGrid = (S, x, y, cols, rows, cw, ch, o = {}) => {
  const g = S.grp(o.parent), C = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { const cx = x + c * cw + cw / 2, cy = y + r * ch + ch / 2; C.push([cx, cy]); DS.shape(S, rect(x + c * cw, y + r * ch, cw, ch), "white", { flat: true, w: "detail", parent: g }); }
  return { g: fadeG(S, g, o.t), C };
};
// piggy-free "gate arm" barrier (wire closes): pivots at (x, y), length L. up -> down at t
const barrier = (S, x, y, L, t, o = {}) => {
  const g = S.grp(o.parent); DS.shape(S, rrect(x - 26, y - 20, 52, 130, DS.r.sm), "gray", { tone: 1, w: "mid", parent: g });
  const arm = S.grp(g); DS.shape(S, rrect(x, y - 16, L, 32, DS.r.xs), "red", { w: "mid", parent: arm });
  for (let i = 0; i < 5; i++) S.fill(`M${x + 60 + i * (L - 60) / 5} ${y - 14} l${(L - 60) / 10} 0 l-18 28 l${-(L - 60) / 10} 0 Z`, S.start, 0, DS.P.white[0], 1, arm);
  const tf = (a) => `rotate(${a} ${x} ${y})`; arm.setAttribute("transform", tf(-70));
  tl.fromTo(arm, { attr: { transform: tf(-70) } }, { attr: { transform: tf(0) }, duration: 0.9, ease: "power2.in", immediateRender: false }, t);
  return g;
};

