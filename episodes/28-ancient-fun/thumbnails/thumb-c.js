// look: still
// C (owner request 2026-10-20, Zenn-style campfire): stick-figure cave people laughing around a fire at night, rolling
// knucklebones and playing the Royal Game of Ur. Text "NO WIFI?": the video's question (fun before screens). Honest to the content.
// ---------- people ----------
// a figure on a depth plane; shadow and body share one group (F.all) so they fade together. o.gs = shadow y (seated figures)
const who = (S, x, gy, layer = "near", o = {}) => {
  const s = (o.s || 1.1) * DS.depth[layer].s, g = o.parent || S.grp();
  DS.shadow(S, x, o.gs ?? gy, 150 * s, { t: o.t, parent: g });
  const F = S.fig(x, gy, Object.assign({ hair: "short", outfit: "tee" }, o, { s, parent: g, w: DS.w[DS.depth[layer].w] * 1.3 * Math.sqrt(s) })).draw(o.t ?? S.start, 0.4);
  F.face(o.t ?? S.start, o.mood || "flat", o.look || 0);
  F.all = g;
  return F;
};
const dave = (S, x, gy, layer = "near", o = {}) => who(S, x, gy, layer, Object.assign({ s: 1.1, hair: "side", hairC: DS.c("brown"), outfitC: DS.c("blue") }, o));
const OC = ["green", "purple", "orange", "pink", "gold", "red", "earth", "gray", "yellow"]; // no blue: blue is Dave's
const HAIR = ["short", "bun", "curly", "side", "messy", "short", "bun", "curly"];
const HC = [["brown", 0], ["ink", 0], ["gray", 1], ["earth", 2], ["brown", 2], ["gray", 2], ["earth", 0], ["ink", 1]];
const person = (S, x, gy, layer, i, o = {}) => who(S, x, gy, layer, Object.assign({ s: 1.1, hair: HAIR[i % 8], hairC: DS.c(HC[i % 8][0], HC[i % 8][1], layer), outfitC: DS.c(OC[i % 9], 0, layer), mood: "flat", look: ((i % 3) - 1) * 5 }, o));
// ancient people: fur tunic, messy hair
const ancient = (S, x, gy, layer, i, o = {}) => person(S, x, gy, layer, i, Object.assign({ hair: "messy", outfit: "tunic", outfitC: DS.c(["earth", "brown", "wood"][i % 3], i % 3 === 1 ? 1 : 0, layer) }, o));
const GR = { legL: [[60, 2], [124, 6]], legR: [[72, 10], [136, 14]] }, GL = { legL: [[-60, 2], [-124, 6]], legR: [[-72, 10], [-136, 14]] };
const seated = (S, x, top, o = {}) => (o.who || dave)(S, x, top, "near", Object.assign({ sit: true, pose: "hold", gs: top + 4 }, o));
const T0 = (S) => Math.max(0, S.start - 0.6);
const txt = (S, s, x, y, o = {}) => S.text(s, x, y, Object.assign({ size: DS.type.caption, c: DS.c("ink") }, o));
const panel = (S, cx, cy, w, h, t, name = "white") => { DS.drop(S, rrect(cx - w / 2 + 8, cy - h / 2 + 12, w, h, DS.r.md), { t }); DS.shape(S, rrect(cx - w / 2, cy - h / 2, w, h, DS.r.md), name, { t, flat: true, w: "detail" }); };
const say = (S, cx, cy, rx, ry, tx, ty, strs, t, o = {}) => {
  const g = S.grp(); (o.think ? S.thought : S.speech)(cx, cy, rx, ry, tx, ty, t, 0.3, { parent: g });
  const size = o.size || DS.type.small, n = strs.length;
  strs.forEach((s, i) => S.text(s, cx, cy + size * 0.36 + (i - (n - 1) / 2) * size * 1.2, { size, t, c: o.c ? DS.c(o.c, 2) : DS.c("ink"), parent: g }));
  return g;
};
// ring outline around a person or a thing (never a fill over a face)
const ringFig = (S, F, t, name = "red") => S.draw(circ(F.cx, F.hd[1] + F.r * 2.4, F.r * 2.6, F.r * 4.2), t, 0, { c: DS.c(name), w: DS.w.near });
const ring = (S, cx, cy, rx, ry, t, name = "red") => S.draw(circ(cx, cy, rx, ry), t, 0, { c: DS.c(name), w: DS.w.near });
const arrow = (S, x1, y1, x2, y2, t, o = {}) => S.arrow(x1, y1, x2, y2, t, 0.3, { c: DS.c(o.c || "red"), w: DS.w.near, bend: o.bend || 0 });
const xMark = (S, cx, cy, r, t, name = "red") => S.draw(line([cx - r, cy - r], [cx + r, cy + r], 0) + line([cx + r, cy - r], [cx - r, cy + r], 0), t, 0, { c: DS.c(name), w: DS.w.near * 1.4 });
const tickMark = (S, cx, cy, r, t) => S.draw(`M${cx - r} ${cy} L${cx - r * 0.3} ${cy + r * 0.7} L${cx + r} ${cy - r * 0.8}`, t, 0, { c: DS.c("green"), w: DS.w.near * 1.4 });
// hats and props worn by a figure (ride F.g)
const acc = (S, F, kind, t) => {
  const R = F.r, [x, y] = F.hd, p = { t, parent: F.g, w: "detail" };
  if (kind === "pith") { // pith helmet: the 1920s archaeologist
    DS.shape(S, `M${x - 0.92 * R} ${y - 0.42 * R} Q${x - 0.9 * R} ${y - 1.5 * R} ${x} ${y - 1.52 * R} Q${x + 0.9 * R} ${y - 1.5 * R} ${x + 0.92 * R} ${y - 0.42 * R} Z`, "sand", p);
    DS.shape(S, `M${x - 1.4 * R} ${y - 0.36 * R} Q${x} ${y - 0.72 * R} ${x + 1.4 * R} ${y - 0.36 * R} Q${x} ${y - 0.2 * R} ${x - 1.4 * R} ${y - 0.36 * R} Z`, "sand", Object.assign({ tone: 2 }, p));
  }
  if (kind === "laurel") for (let i = 0; i < 9; i++) { const a = ((196 + i * 18.5) * Math.PI) / 180; DS.shape(S, circ(x + Math.cos(a) * 1.04 * R, y + Math.sin(a) * 1.04 * R, 0.17 * R), "green", Object.assign({ flat: true }, p)); }
  if (kind === "cone") { // Assyrian soldier's pointed helmet
    DS.shape(S, `M${x - 0.98 * R} ${y - 0.36 * R} L${x} ${y - 1.85 * R} L${x + 0.98 * R} ${y - 0.36 * R} Z`, "gray", p);
    DS.shape(S, rrect(x - 1.04 * R, y - 0.5 * R, 2.08 * R, 0.24 * R, DS.r.xs), "gold", Object.assign({ tone: 2 }, p));
  }
  if (kind === "tache") S.draw(smooth([[x - 0.42 * R, y + 0.36 * R], [x - 0.2 * R, y + 0.22 * R], [x, y + 0.28 * R], [x + 0.2 * R, y + 0.22 * R], [x + 0.42 * R, y + 0.36 * R]]), t ?? S.start, 0, { c: DS.c("gray", 2), w: DS.w.near, parent: F.g });
  if (kind === "sash") DS.shape(S, `M${F.sh[0] - 30 * F.s} ${F.sh[1]} L${F.sh[0] - 6 * F.s} ${F.sh[1]} L${F.hip[0] + 32 * F.s} ${F.hip[1] - 4 * F.s} L${F.hip[0] + 32 * F.s} ${F.hip[1] + 18 * F.s} Z`, "purple", Object.assign({ flat: true }, p));
  if (kind === "spear") { const [hx, hy] = F.hand("R"); S.draw(line([hx, hy + 60 * F.s], [hx, hy - 330 * F.s], 0), t ?? S.start, 0, { c: DS.c("wood", 2), w: DS.w.mid, parent: F.g }); DS.shape(S, `M${hx - 16 * F.s} ${hy - 320 * F.s} L${hx} ${hy - 390 * F.s} L${hx + 16 * F.s} ${hy - 320 * F.s} Z`, "gray", p); }
};

// ---------- sets ----------
const nightWin = (S, x, y, w, h) => {
  DS.shape(S, rrect(x - 14, y - 14, w + 28, h + 28, DS.r.xs), "white", { w: "detail" });
  DS.shape(S, rect(x, y, w, h), "night", { flat: true, tone: 2, w: "hair" });
  S.fill(circ(x + w * 0.7, y + h * 0.3, 22), S.start, 0, DS.c("yellow", 1), 1);
  [[0.2, 0.2], [0.35, 0.62], [0.15, 0.8], [0.5, 0.14], [0.82, 0.72]].forEach(([a, b]) => S.fill(circ(x + w * a, y + h * b, 4), S.start, 0, DS.P.white[0], 0.85));
  S.draw(`M${x + w / 2} ${y} V${y + h} M${x} ${y + h / 2} H${x + w}`, S.start, 0, { c: DS.P.white[0], w: DS.w.mid });
};
const MUSE = { wall: "paper", floor: "gray", window: false }, WARM = { wall: "wall", floor: "wood", window: false }, PAPER_RM = { wall: "paper", floor: "wood", window: false };
const DESERT = { hy: 600, sky: "sky", hills: "sand", ground: "sand", sun: [1600, 160] };
const museum = (S, R, o = {}) => {
  (o.cols || [440, 1480]).forEach((x) => { DS.shape(S, rect(x - 36, 150, 72, 580), "white", { layer: "mid", dir: "h" }); DS.shape(S, rect(x - 52, 118, 104, 36), "white", { layer: "mid", tone: 2 }); DS.shape(S, rect(x - 52, 724, 104, 36), "white", { layer: "mid", tone: 2 }); });
  return R;
};
const LAB = { wall: "glass", floor: "gray", window: false }, CAVE = { wall: "earth", floor: "earth", window: false };
const cave = (S, R) => { // inside a cave: rough rock arch framing a warm interior
  DS.shape(S, `M-20 -20 H1940 V1100 H1800 Q1840 600 1700 300 Q1500 80 960 70 Q420 80 220 300 Q80 600 120 1100 H-20 Z`, "brown", { dir: "h", w: "mid" });
  [[300, 420], [1640, 380], [260, 820], [1660, 860]].forEach(([x, y]) => S.draw(smooth([[x - 60, y], [x, y - 30], [x + 60, y + 10]]), S.start, 0, { c: DS.c("brown", 2), w: DS.w.detail }));
  return R;
};
// parchment map card
const mapCard = (S, x, y, w, h, sea = true) => { DS.drop(S, rrect(x + 8, y + 12, w, h, DS.r.md)); DS.shape(S, rrect(x, y, w, h, DS.r.md), sea ? "sky" : "sand", { flat: true, tone: 1, w: "mid" }); };
const land = (S, x, y, w, h, P, o = {}) => DS.shape(S, smooth([...P, P[0]].map(([a, b]) => [x + a * w, y + b * h])) + " Z", o.name || "sand", { t: o.t, w: "mid", flat: true });
const pin = (S, x, y, t, name = "red") => { DS.shape(S, `M${x} ${y} C${x - 30} ${y - 40} ${x - 30} ${y - 74} ${x} ${y - 74} C${x + 30} ${y - 74} ${x + 30} ${y - 40} ${x} ${y} Z`, name, { t, w: "detail" }); S.fill(circ(x, y - 50, 9), t ?? S.start, 0, DS.P.white[0], 1); };

// ---------- the Royal Game of Ur ----------
// 3 rows x 8 columns; rows 0 and 2 miss columns 4-5 (20 squares). Rosettes on the 4 outer corners and the middle row's 4th square.
const UR_ROS = ["0,0", "2,0", "1,3", "0,7", "2,7"];
const UR = []; for (let r = 0; r < 3; r++) for (let k = 0; k < 8; k++) if (r === 1 || k < 4 || k > 5) UR.push([r, k]);
const rosette = (S, cx, cy, rr, t, g) => {
  let d = "";
  for (let i = 0; i < 8; i++) { const a = (i * Math.PI) / 4, tx = cx + Math.cos(a) * rr, ty = cy + Math.sin(a) * rr, mx = cx + Math.cos(a) * rr * 0.5, my = cy + Math.sin(a) * rr * 0.5, px = -Math.sin(a) * rr * 0.3, py = Math.cos(a) * rr * 0.3;
    d += `M${f1(cx)} ${f1(cy)} Q${f1(mx + px)} ${f1(my + py)} ${f1(tx)} ${f1(ty)} Q${f1(mx - px)} ${f1(my - py)} ${f1(cx)} ${f1(cy)} Z `; }
  S.draw(d, t ?? S.start, 0, { fill: DS.c("blue"), c: DS.c("blue", 2), w: DS.w.hair, parent: g });
  DS.shape(S, circ(cx, cy, rr * 0.26), "red", { t, parent: g, w: "hair", flat: true });
};
const urPiece = (S, cx, cy, rr, dark, t, g) => { DS.shape(S, circ(cx, cy, rr), dark ? "ink" : "paper", { t, parent: g, w: rr > 24 ? "mid" : "detail" }); [[0, 0], [-0.45, -0.45], [0.45, -0.45], [-0.45, 0.45], [0.45, 0.45]].forEach(([a, b]) => S.fill(circ(cx + a * rr, cy + b * rr, rr * 0.13), t ?? S.start, 0, dark ? DS.P.white[0] : DS.c("ink"), 1, g)); };
// q = square size. o.squash < 1 = seen at an angle (lying on a table). o.pieces = [[row, col, dark], ...]. Returns { g, at(r, k) }
const urBoard = (S, cx, cy, q, o = {}) => {
  const t = o.t, g = S.grp(o.parent), x0 = cx - 4 * q, y0 = cy - 1.5 * q, m = q * 0.08, wk = q >= 90 ? "mid" : "detail";
  const outline = `M${x0 - m} ${y0 - m} H${x0 + 4 * q + m} V${y0 + q - m} H${x0 + 6 * q - m} V${y0 - m} H${x0 + 8 * q + m} V${y0 + 3 * q + m} H${x0 + 6 * q - m} V${y0 + 2 * q + m} H${x0 + 4 * q + m} V${y0 + 3 * q + m} H${x0 - m} Z`;
  if (!o.squash) DS.drop(S, outline, { t, parent: g });
  DS.shape(S, outline, o.scratched ? "sand" : "navy", { t, parent: g, w: wk, flat: true, tone: o.scratched ? 1 : 0 });
  UR.forEach(([r, k], i) => {
    const x = x0 + k * q, y = y0 + r * q, c = [x + q / 2, y + q / 2];
    if (o.scratched) { S.draw(rect(x + m, y + m, q - 2 * m, q - 2 * m), t ?? S.start, 0, { c: DS.c("sand", 2), w: DS.w.detail, parent: g }); if (UR_ROS.includes(r + "," + k)) S.draw(line([c[0] - q * 0.28, c[1] - q * 0.28], [c[0] + q * 0.28, c[1] + q * 0.28], 0) + line([c[0] + q * 0.28, c[1] - q * 0.28], [c[0] - q * 0.28, c[1] + q * 0.28], 0), t ?? S.start, 0, { c: DS.c("sand", 2), w: DS.w.detail, parent: g }); return; }
    DS.shape(S, rrect(x + m, y + m, q - 2 * m, q - 2 * m, DS.r.xs), "paper", { t, parent: g, w: "hair", flat: true });
    if (UR_ROS.includes(r + "," + k)) rosette(S, c[0], c[1], q * 0.36, t, g);
    else if (q >= 40) { if (i % 2) [[-0.22, -0.22], [0.22, -0.22], [-0.22, 0.22], [0.22, 0.22], [0, 0]].forEach(([a, b]) => S.fill(circ(c[0] + a * q, c[1] + b * q, q * 0.07), t ?? S.start, 0, DS.c("blue"), 1, g));
      else { S.draw(circ(c[0], c[1], q * 0.26), t ?? S.start, 0, { c: DS.c("blue"), w: q >= 90 ? DS.w.mid : DS.w.detail, parent: g }); S.fill(circ(c[0], c[1], q * 0.09), t ?? S.start, 0, DS.c("red"), 1, g); } }
  });
  (o.pieces || []).forEach(([r, k, dk]) => urPiece(S, x0 + k * q + q / 2, y0 + r * q + q / 2, q * 0.34, dk, o.pt ?? t, g));
  if (o.squash) g.setAttribute("transform", `translate(0 ${cy}) scale(1 ${o.squash}) translate(0 ${-cy})`);
  return { g, at: (r, k) => [x0 + k * q + q / 2, y0 + r * q + q / 2], x0, y0 };
};
// Ur dice: tetrahedra, two of the four corners tipped white
const tetra = (S, cx, cy, k, t, g) => { DS.shape(S, `M${cx} ${cy - 40 * k} L${cx + 40 * k} ${cy + 28 * k} L${cx - 40 * k} ${cy + 28 * k} Z`, "ink", { t, parent: g, w: "detail" }); S.draw(line([cx, cy - 40 * k], [cx + 6 * k, cy + 28 * k], 0), t ?? S.start, 0, { c: DS.c("ink", 1), w: DS.w.hair, parent: g }); S.fill(circ(cx, cy - 30 * k, 7 * k), t ?? S.start, 0, DS.P.white[0], 1, g); };

// ---------- clay tablets ----------
// cuneiform: rows of little wedges (head triangle + tail), deterministic pattern
const wedges = (S, x, y, w, h, gap, t, g, name = "earth") => {
  let d = "";
  for (let r = 0, yy = y + gap * 0.7; yy < y + h - gap * 0.3; r++, yy += gap) {
    S.draw(line([x, yy + gap * 0.42], [x + w, yy + gap * 0.42], 0), t ?? S.start, 0, { c: DS.c(name, 2), w: DS.w.hair, parent: g });
    for (let xx = x + 6 + ((r * 7) % 3) * 4, i = 0; xx < x + w - gap * 0.5; i++) { const s = gap * 0.2, v = (r * 5 + i * 3) % 4;
      if (v === 3) d += `M${f1(xx)} ${f1(yy - s)} l${f1(s * 1.1)} ${f1(s * 0.6)} l${f1(-s * 1.1)} ${f1(s * 0.6)} Z M${f1(xx + s * 0.6)} ${f1(yy)} h${f1(s * 1.6)} `;
      else d += `M${f1(xx)} ${f1(yy - s * 0.9)} l${f1(s * 0.6)} ${f1(s * 1.1)} l${f1(s * 0.6)} ${f1(-s * 1.1)} Z M${f1(xx + s * 0.6)} ${f1(yy + s * 0.2)} v${f1(s * (v === 1 ? 1.6 : 1.1))} `;
      xx += s * (v === 3 ? 3.4 : 2.0) + ((i * 7 + r) % 3 === 0 ? s * 1.4 : 0); }
  }
  S.draw(d, t ?? S.start, 0, { fill: DS.c(name, 2), c: DS.c(name, 2), w: DS.w.hair, parent: g });
};
const tablet = (S, cx, cy, w, h, o = {}) => {
  const t = o.t, g = S.grp(o.parent), name = o.name || "earth";
  DS.drop(S, rrect(cx - w / 2 + 8, cy - h / 2 + 10, w, h, DS.r.lg), { t, parent: g });
  DS.shape(S, rrect(cx - w / 2, cy - h / 2, w, h, w > 220 ? DS.r.lg : DS.r.md), name, { t, parent: g, w: w > 220 ? "mid" : "detail" });
  if (o.broken) S.draw(smooth([[cx + w * 0.18, cy - h / 2], [cx + w * 0.26, cy - h * 0.2], [cx + w * 0.16, cy + h * 0.1], [cx + w / 2, cy + h * 0.24]]), t ?? S.start, 0, { c: DS.c(name, 2), w: DS.w.detail, parent: g });
  if (o.marks !== false) wedges(S, cx - w / 2 + w * 0.09, cy - h / 2 + h * 0.06, w * 0.82, h * 0.88, Math.max(18, Math.min(46, w / 7)), t, g, name);
  return g;
};
const easel = (S, cx, top, gy, t) => { [[-50, 60], [50, -60]].forEach(([a, b]) => S.draw(line([cx + a, gy], [cx + b * 0.4, top], 0), t ?? S.start, 0, { c: DS.c("wood", 2), w: DS.w.mid })); };

// ---------- Dave's phone, table, scoreboard ----------
const phoneDown = (S, cx, cy, t) => { DS.shape(S, rrect(cx - 50, cy - 16, 100, 32, DS.r.sm), "ink", { t, w: "detail" }); S.fill(circ(cx - 32, cy - 2, 5), t ?? S.start, 0, DS.c("gray"), 1); };
const bigPhone = (S, cx, cy, w, h, o = {}) => {
  const t = o.t ?? S.start, g = S.grp(o.parent);
  DS.drop(S, rrect(cx - w / 2 + 8, cy - h / 2 + 12, w, h, DS.r.md), { t, parent: g });
  DS.shape(S, rrect(cx - w / 2, cy - h / 2, w, h, DS.r.md), "ink", { t, w: "mid", parent: g });
  const sx = cx - w / 2 + w * 0.09, sy = cy - h / 2 + h * 0.08, sw = w * 0.82, shh = h * 0.84;
  const on = S.grp(g); DS.shape(S, rrect(sx, sy, sw, shh, DS.r.sm), "sky", { t, flat: true, tone: 1, w: "hair", parent: on });
  for (let i = 0; i < 9; i++) DS.shape(S, rrect(sx + sw * (0.1 + (i % 3) * 0.3), sy + shh * (0.12 + Math.floor(i / 3) * 0.2), sw * 0.22, sw * 0.22, DS.r.xs), OC[i], { t, flat: true, w: "hair", parent: on });
  if (o.die !== undefined) { S.fadeOut(on, o.die, 0.25); const bx = cx - w * 0.18, by = cy - h * 0.05, bw = w * 0.36, bh = w * 0.18;
    S.draw(rrect(bx, by, bw, bh, DS.r.xs), o.die, 0, { c: DS.c("red"), w: DS.w.mid, parent: g }); S.draw(rect(bx + bw, by + bh * 0.3, bw * 0.08, bh * 0.4), o.die, 0, { c: DS.c("red"), w: DS.w.mid, parent: g }); }
  return g;
};
const scoreboard = (S, cx, cy, k, a, b, o = {}) => {
  const t = o.t, g = S.grp(), w = 400 * k, h = 190 * k, size = k >= 1.8 ? DS.type.display : k >= 1.2 ? DS.type.title : DS.type.small, lab = k >= 1.8 ? DS.type.body : k >= 1.2 ? DS.type.small : DS.type.caption;
  DS.drop(S, rrect(cx - w / 2 + 8, cy - h / 2 + 12, w, h, DS.r.sm), { t, parent: g });
  DS.shape(S, rrect(cx - w / 2, cy - h / 2, w, h, DS.r.sm), "wood", { t, parent: g, w: "mid" });
  DS.shape(S, rect(cx - w / 2 + 16 * k, cy - h / 2 + 16 * k, w - 32 * k, h - 32 * k), "navy", { t, parent: g, flat: true, w: "hair" });
  S.text("RULEBOOK", cx - w / 2 + 40 * k, cy - 18 * k, { size: lab, anchor: "start", t, c: DS.P.white[0], parent: g });
  S.text("DAVE", cx - w / 2 + 40 * k, cy + 58 * k, { size: lab, anchor: "start", t, c: DS.P.white[0], parent: g });
  const nums = (x, y, v) => S.text(String(v), x, y, { size, anchor: "end", t: o.to ? undefined : t, c: DS.c("yellow"), parent: g });
  const na = nums(cx + w / 2 - 40 * k, cy - 14 * k, a), nb = nums(cx + w / 2 - 40 * k, cy + 62 * k, b);
  if (o.to) { S.fadeOut(na, o.to[0] - 0.05, 0.15); S.text(String(o.to[1]), cx + w / 2 - 40 * k, cy - 14 * k, { size, anchor: "end", t: o.to[0], c: DS.c("yellow"), parent: g }); }
  return g;
};
// Dave's table at night. R = DS.room(S, NIGHT). o: { h: clock hour, score: [a, b], board, tablet, items: ["kb", "flute", "cart", "joke", "scratch"], mood, look, pose, t* }
const NIGHT = { wall: "wall", floor: "wood", window: false };
const TB = { x0: 190, x1: 1730, back: 650, front: 742, gy: 960 };
const table = (S, x0, x1, back, front, gy) => {
  DS.shadow(S, (x0 + x1) / 2, gy, x1 - x0 + 60);
  [x0 + 50, x1 - 84].forEach((x) => DS.shape(S, rect(x, front + 30, 34, gy - front - 30), "wood", { tone: 2, w: "mid" }));
  DS.shape(S, `M${x0 + 44} ${back} H${x1 - 44} L${x1} ${front} H${x0} Z`, "wood", { dir: "v" });
  DS.shape(S, rect(x0, front, x1 - x0, 36), "wood", { tone: 2, flat: true, w: "mid" });
};
const daveTable = (S, R, o = {}) => {
  nightWin(S, 1370, 140, 170, 160);
  const C = S.clock(560, 200, 70, S.start, 0, { h: o.h ?? 7, m: 0 });
  if (o.score) scoreboard(S, 960, 225, 1, o.score[0], o.score[1], o.scoreO || {});
  const F = seated(S, o.dx ?? 520, 705, { s: 1.4, mood: o.mood || "flat", look: o.look ?? 6, pose: o.pose || "hold", t: o.tf, armL: o.armL, armR: o.armR });
  const tx = o.tx ?? 1400; if (o.tablet !== false) { easel(S, tx, 420, TB.back + 6, o.tt); tablet(S, tx, 500, 230, 290, { t: o.tt }); }
  table(S, TB.x0, TB.x1, TB.back, TB.front, TB.gy);
  if (o.phone !== false) phoneDown(S, 300, 700, o.tp);
  const B = o.board === false ? null : urBoard(S, 960, 694, 58, { squash: 0.42, t: o.tb, pieces: o.pieces || [[1, 1, 0], [1, 6, 1], [0, 2, 1]], pt: o.tpc });
  const it = o.items || [];
  if (it.includes("kb")) [[640, 714], [700, 726], [756, 708]].forEach(([x, y], i) => KB(S, x, y, 0.5, { t: o.tkb, rot: i * 40 - 30 }));
  if (it.includes("flute")) flute(S, 1120, 726, 330, { t: o.tfl });
  if (it.includes("cart")) clayCart(S, 1600, 716, 0.55, { t: o.tca });
  if (it.includes("joke")) tablet(S, 1250, 680, 96, 70, { t: o.tj });
  if (it.includes("scratch")) { DS.shape(S, rrect(400, 690, 170, 58, DS.r.xs), "sand", { t: o.ts, w: "detail" }); urBoard(S, 485, 719, 18, { scratched: true, t: o.ts, squash: 0.8 }); }
  return { F, C, B };
};

// ---------- bones, dice, toys ----------
// knucklebone (astragalus): chunky ankle bone with a waist; o.n = the throw value on its top face, o.rot = degrees
const KB = (S, cx, cy, k, o = {}) => {
  const t = o.t, g = S.grp(o.parent), P = [[-62, -8], [-56, -34], [-30, -40], [-10, -26], [10, -28], [36, -42], [60, -28], [66, 2], [52, 32], [26, 36], [8, 24], [-12, 26], [-38, 38], [-60, 22]];
  DS.shape(S, smooth([...P, P[0]].map(([a, b]) => [cx + a * k, cy + b * k])) + " Z", "paper", { t, parent: g, w: k > 0.8 ? "mid" : "detail" });
  S.draw(smooth([[cx - 2 * k, cy - 22 * k], [cx + 4 * k, cy], [cx - 2 * k, cy + 20 * k]]), t ?? S.start, 0, { c: DS.c("sand", 2), w: k > 0.8 ? DS.w.mid : DS.w.detail, parent: g });
  S.fill(circ(cx - 34 * k, cy - 2 * k, 12 * k, 9 * k), t ?? S.start, 0, DS.c("sand", 1), 1, g); S.fill(circ(cx + 34 * k, cy + 4 * k, 12 * k, 9 * k), t ?? S.start, 0, DS.c("sand", 1), 1, g);
  if (o.rot) g.setAttribute("transform", `rotate(${o.rot} ${cx} ${cy})`);
  return g;
};
// throw value badge under a big knucklebone
const kbVal = (S, cx, cy, v, t, name = "ink", parent) => { const g = S.grp(parent); DS.shape(S, circ(cx, cy, 44), "white", { t, parent: g, w: "detail" }); S.text(String(v), cx, cy + 18, { size: DS.type.small, t, c: DS.c(name, name === "ink" ? 0 : 2), parent: g }); return g; };
// two-sided bone die: flat oval slip, one face notched
const boneDie = (S, cx, cy, k, t, marked = true) => { DS.shape(S, rrect(cx - 70 * k, cy - 22 * k, 140 * k, 44 * k, DS.r.md), "paper", { t, w: "detail" }); if (marked) for (let i = -2; i <= 2; i++) S.draw(line([cx + i * 22 * k, cy - 14 * k], [cx + i * 22 * k + 8 * k, cy + 14 * k], 0), t ?? S.start, 0, { c: DS.c("brown", 1), w: DS.w.detail }); };
const cube = (S, cx, cy, k, t, g) => { // a cube die in light 3/4 view
  const s = 50 * k;
  DS.shape(S, `M${cx - s} ${cy - s * 0.4} L${cx} ${cy - s * 0.9} L${cx + s} ${cy - s * 0.4} L${cx} ${cy + s * 0.1} Z`, "white", { t, parent: g, w: "detail", flat: true });
  DS.shape(S, `M${cx - s} ${cy - s * 0.4} L${cx} ${cy + s * 0.1} L${cx} ${cy + s * 1.1} L${cx - s} ${cy + s * 0.6} Z`, "white", { t, parent: g, w: "detail", flat: true, tone: 2 });
  DS.shape(S, `M${cx + s} ${cy - s * 0.4} L${cx} ${cy + s * 0.1} L${cx} ${cy + s * 1.1} L${cx + s} ${cy + s * 0.6} Z`, "paper", { t, parent: g, w: "detail", flat: true, tone: 2 });
  [[0, -0.4], [-0.5, 0.35], [-0.5, 0.7], [0.5, 0.35]].forEach(([a, b]) => S.fill(circ(cx + a * s, cy + b * s, 6 * k, 4 * k), t ?? S.start, 0, DS.c("ink"), 1, g));
};
// vulture-bone flute: slim tapered tube, 5 finger holes, a V notch at the blowing end (left), broken far end
const flute = (S, x, y, len, o = {}) => {
  const t = o.t, g = S.grp(o.parent), h = len * 0.075;
  DS.shape(S, `M${x} ${y - h * 0.55} Q${x + len * 0.5} ${y - h * 0.7} ${x + len} ${y - h * 0.42} L${x + len * 0.985} ${y - h * 0.1} L${x + len * 1.01} ${y + h * 0.12} L${x + len} ${y + h * 0.42} Q${x + len * 0.5} ${y + h * 0.66} ${x} ${y + h * 0.55} Z`, "sand", { t, parent: g, w: len > 500 ? "mid" : "detail", tone: 1 });
  S.draw(`M${x + len * 0.03} ${y - h * 0.5} L${x + len * 0.06} ${y - h * 0.05} L${x + len * 0.09} ${y - h * 0.52}`, t ?? S.start, 0, { c: DS.c("brown"), w: len > 500 ? DS.w.mid : DS.w.detail, parent: g });
  const holes = [0.42, 0.52, 0.62, 0.72, 0.82].map((f) => [x + len * f, y - h * 0.05]);
  holes.forEach(([hx, hy]) => DS.shape(S, circ(hx, hy, h * 0.2, h * 0.16), "brown", { t, parent: g, w: "hair", flat: true }));
  return { g, holes, notch: [x + len * 0.06, y - h * 0.3] };
};
// little terracotta cart with two wheels
const clayCart = (S, cx, gy, k, o = {}) => {
  const t = o.t, g = S.grp(o.parent);
  DS.shadow(S, cx, gy, 260 * k, { t, parent: g });
  DS.shape(S, `M${cx - 120 * k} ${gy - 120 * k} L${cx + 120 * k} ${gy - 120 * k} L${cx + 100 * k} ${gy - 50 * k} L${cx - 100 * k} ${gy - 50 * k} Z`, "orange", { t, parent: g, tone: 2, w: k > 0.8 ? "mid" : "detail" });
  S.draw(line([cx - 120 * k, gy - 96 * k], [cx - 200 * k, gy - 110 * k], 0), t ?? S.start, 0, { c: DS.c("orange", 2), w: k > 0.8 ? DS.w.near : DS.w.mid, parent: g });
  [cx - 60 * k, cx + 60 * k].forEach((wx) => { const wg = S.grp(g), wy = gy - 46 * k;
    DS.shape(S, circ(wx, wy, 46 * k), "earth", { t, parent: wg, w: k > 0.8 ? "mid" : "detail" }); S.draw(line([wx - 34 * k, wy], [wx + 34 * k, wy], 0), t ?? S.start, 0, { c: DS.c("earth", 2), w: DS.w.detail, parent: wg }); S.fill(circ(wx, wy, 10 * k), t ?? S.start, 0, DS.c("brown"), 1, wg);
    if (o.roll) tl.to(wg, { rotation: ((o.roll[2] / (46 * k)) * 180) / Math.PI, svgOrigin: `${wx} ${wy}`, duration: o.roll[1], ease: "power1.inOut" }, o.roll[0]); });
  if (o.roll) S.move(g, o.roll[0], o.roll[1], { x: o.roll[2] }, "power1.inOut");
  return g;
};
// clay bull whose head nods (o.nod = [t0, t1])
const clayBull = (S, cx, gy, k, o = {}) => {
  const t = o.t, g = S.grp(o.parent), hg = S.grp(g);
  DS.shadow(S, cx, gy, 300 * k, { t, parent: g });
  [[-90, 0], [-50, 0], [60, 0], [100, 0]].forEach(([dx]) => DS.shape(S, rrect(cx + dx * k - 14 * k, gy - 110 * k, 28 * k, 110 * k, DS.r.xs), "orange", { t, parent: g, tone: 2, w: "detail" }));
  DS.shape(S, rrect(cx - 130 * k, gy - 210 * k, 260 * k, 120 * k, DS.r.lg), "orange", { t, parent: g, tone: 2, w: "mid" });
  S.draw(smooth([[cx + 130 * k, gy - 180 * k], [cx + 170 * k, gy - 150 * k], [cx + 160 * k, gy - 100 * k]]), t ?? S.start, 0, { c: DS.c("orange", 2), w: DS.w.mid, parent: g });
  S.draw(circ(cx - 130 * k, gy - 190 * k, 8 * k), t ?? S.start, 0, { c: DS.c("brown"), w: DS.w.detail, parent: g }); // the peg hole
  const hx = cx - 170 * k, hy = gy - 210 * k;
  DS.shape(S, rrect(hx - 60 * k, hy - 50 * k, 120 * k, 100 * k, DS.r.lg), "orange", { t, parent: hg, w: "mid" });
  [[-1], [1]].forEach(([sd]) => S.draw(smooth([[hx + sd * 40 * k, hy - 44 * k], [hx + sd * 70 * k, hy - 80 * k], [hx + sd * 54 * k, hy - 104 * k]]), t ?? S.start, 0, { c: DS.c("sand", 2), w: DS.w.near, parent: hg }));
  S.fill(circ(hx - 22 * k, hy - 8 * k, 7 * k), t ?? S.start, 0, DS.c("ink"), 1, hg); S.fill(circ(hx + 22 * k, hy - 8 * k, 7 * k), t ?? S.start, 0, DS.c("ink"), 1, hg);
  if (o.nod) for (let tt = o.nod[0]; tt < o.nod[1] - 0.8; tt += 0.8) tl.fromTo(hg, { rotation: 0 }, { rotation: -14, svgOrigin: `${cx - 120 * k} ${gy - 170 * k}`, duration: 0.4, ease: "sine.inOut", yoyo: true, repeat: 1, immediateRender: false }, tt);
  return g;
};

// ---------- animals ----------
const sheep = (S, cx, gy, k, t) => { const g = S.grp(); DS.shadow(S, cx, gy, 260 * k, { t, parent: g });
  [-60, -25, 30, 65].forEach((dx) => DS.shape(S, rect(cx + dx * k - 9 * k, gy - 80 * k, 18 * k, 80 * k), "ink", { t, parent: g, w: "detail", flat: true }));
  const P = Array.from({ length: 14 }, (_, i) => { const a = (i / 14) * Math.PI * 2; return [cx + Math.cos(a) * (110 + (i % 2) * 14) * k, gy - 140 * k + Math.sin(a) * (62 + (i % 2) * 10) * k]; });
  DS.shape(S, smooth([...P, P[0]]) + " Z", "white", { t, parent: g, w: "mid" });
  DS.shape(S, circ(cx - 120 * k, gy - 160 * k, 36 * k, 44 * k), "ink", { t, parent: g, w: "detail", tone: 1 });
  S.fill(circ(cx - 132 * k, gy - 170 * k, 6 * k), t ?? S.start, 0, DS.P.white[0], 1, g); return g; };
const goat = (S, cx, gy, k, t) => { const g = S.grp(); DS.shadow(S, cx, gy, 240 * k, { t, parent: g });
  [-55, -22, 30, 62].forEach((dx) => DS.shape(S, rect(cx + dx * k - 9 * k, gy - 90 * k, 18 * k, 90 * k), "brown", { t, parent: g, w: "detail", flat: true }));
  DS.shape(S, rrect(cx - 90 * k, gy - 190 * k, 180 * k, 100 * k, DS.r.lg), "wood", { t, parent: g, w: "mid" });
  DS.shape(S, `M${cx - 80 * k} ${gy - 170 * k} L${cx - 120 * k} ${gy - 240 * k} L${cx - 160 * k} ${gy - 190 * k} L${cx - 120 * k} ${gy - 150 * k} Z`, "wood", { t, parent: g, w: "mid" });
  S.draw(smooth([[cx - 124 * k, gy - 236 * k], [cx - 100 * k, gy - 290 * k], [cx - 70 * k, gy - 296 * k]]), t ?? S.start, 0, { c: DS.c("sand", 2), w: DS.w.mid, parent: g });
  S.draw(smooth([[cx - 150 * k, gy - 180 * k], [cx - 156 * k, gy - 150 * k], [cx - 146 * k, gy - 130 * k]]), t ?? S.start, 0, { c: DS.c("brown"), w: DS.w.mid, parent: g });
  S.fill(circ(cx - 124 * k, gy - 210 * k, 6 * k), t ?? S.start, 0, DS.c("ink"), 1, g); return g; };
const dog = (S, cx, gy, k, t) => { const g = S.grp(); DS.shadow(S, cx, gy, 200 * k, { t, parent: g });
  DS.shape(S, `M${cx - 60 * k} ${gy} Q${cx - 70 * k} ${gy - 120 * k} ${cx} ${gy - 140 * k} Q${cx + 70 * k} ${gy - 120 * k} ${cx + 60 * k} ${gy} Z`, "gold", { t, parent: g, w: "mid" });
  DS.shape(S, circ(cx, gy - 170 * k, 52 * k), "gold", { t, parent: g, w: "mid" });
  [-1, 1].forEach((sd) => DS.shape(S, `M${cx + sd * 30 * k} ${gy - 210 * k} Q${cx + sd * 76 * k} ${gy - 220 * k} ${cx + sd * 66 * k} ${gy - 150 * k} Z`, "brown", { t, parent: g, w: "detail", tone: 1 }));
  [-1, 1].forEach((sd) => S.fill(circ(cx + sd * 18 * k, gy - 180 * k, 6 * k), t ?? S.start, 0, DS.c("ink"), 1, g));
  S.fill(circ(cx, gy - 158 * k, 9 * k, 7 * k), t ?? S.start, 0, DS.c("ink"), 1, g); return g; };
// rat (side view, facing o.dir = -1 left / 1 right)
const rat = (S, cx, gy, k, o = {}) => { const t = o.t, g = S.grp(o.parent), d = o.dir || 1;
  DS.shadow(S, cx, gy, 170 * k, { t, parent: g });
  S.draw(smooth([[cx - d * 70 * k, gy - 30 * k], [cx - d * 130 * k, gy - 10 * k], [cx - d * 180 * k, gy - 40 * k]]), t ?? S.start, 0, { c: DS.c("pink", 2), w: DS.w.mid, parent: g });
  DS.shape(S, `M${cx - d * 80 * k} ${gy} Q${cx - d * 90 * k} ${gy - 100 * k} ${cx} ${gy - 96 * k} Q${cx + d * 70 * k} ${gy - 90 * k} ${cx + d * 104 * k} ${gy - 30 * k} Q${cx + d * 80 * k} ${gy} ${cx} ${gy} Z`, "gray", { t, parent: g, w: "mid", tone: 1 });
  DS.shape(S, circ(cx + d * 30 * k, gy - 96 * k, 22 * k), "pink", { t, parent: g, w: "detail" });
  S.fill(circ(cx + d * 66 * k, gy - 60 * k, 6 * k), t ?? S.start, 0, DS.c("ink"), 1, g);
  S.fill(circ(cx + d * 104 * k, gy - 32 * k, 7 * k), t ?? S.start, 0, DS.c("pink", 2), 1, g);
  return g; };
// griffon vulture perched, facing left: brown body, pale ruff, bald pale head, hooked beak
const vulture = (S, cx, gy, k, t) => { const g = S.grp();
  DS.shadow(S, cx, gy, 220 * k, { t, parent: g });
  [-20, 20].forEach((dx) => S.draw(line([cx + dx * k, gy - 70 * k], [cx + dx * k, gy], 0), t ?? S.start, 0, { c: DS.c("gray", 2), w: DS.w.near, parent: g }));
  DS.shape(S, `M${cx - 70 * k} ${gy - 230 * k} Q${cx - 110 * k} ${gy - 120 * k} ${cx - 30 * k} ${gy - 60 * k} L${cx + 120 * k} ${gy - 30 * k} Q${cx + 110 * k} ${gy - 200 * k} ${cx + 10 * k} ${gy - 250 * k} Z`, "wood", { t, parent: g, w: "mid" });
  DS.shape(S, `M${cx - 10 * k} ${gy - 220 * k} Q${cx + 90 * k} ${gy - 200 * k} ${cx + 140 * k} ${gy - 20 * k} Q${cx + 40 * k} ${gy - 90 * k} ${cx - 20 * k} ${gy - 150 * k} Z`, "brown", { t, parent: g, w: "mid", tone: 1 });
  DS.shape(S, circ(cx - 40 * k, gy - 250 * k, 56 * k, 34 * k), "paper", { t, parent: g, w: "mid" });
  DS.shape(S, `M${cx - 40 * k} ${gy - 270 * k} Q${cx - 50 * k} ${gy - 320 * k} ${cx - 70 * k} ${gy - 330 * k}`, "paper", { t, parent: g, w: "mid" });
  DS.shape(S, circ(cx - 80 * k, gy - 345 * k, 40 * k, 34 * k), "paper", { t, parent: g, w: "mid", tone: 2 });
  DS.shape(S, `M${cx - 112 * k} ${gy - 356 * k} Q${cx - 150 * k} ${gy - 350 * k} ${cx - 140 * k} ${gy - 322 * k} L${cx - 116 * k} ${gy - 330 * k} Z`, "gold", { t, parent: g, w: "detail" });
  S.fill(circ(cx - 88 * k, gy - 352 * k, 7 * k), t ?? S.start, 0, DS.c("ink"), 1, g);
  return g; };
const pony = (S, cx, gy, k, o = {}) => { const t = o.t, g = S.grp(o.parent), name = o.name || "wood";
  DS.shadow(S, cx, gy, 300 * k, { t, parent: g });
  [[-90, 20], [-60, -10], [70, 15], [100, -15]].forEach(([dx, sw]) => S.draw(line([cx + dx * k, gy - 110 * k], [cx + (dx + sw) * k, gy], 0), t ?? S.start, 0, { c: DS.c(name, 2), w: DS.w.near * 1.6, parent: g }));
  DS.shape(S, rrect(cx - 120 * k, gy - 200 * k, 250 * k, 100 * k, DS.r.lg), name, { t, parent: g, w: "mid" });
  DS.shape(S, `M${cx + 90 * k} ${gy - 190 * k} L${cx + 150 * k} ${gy - 300 * k} L${cx + 190 * k} ${gy - 280 * k} L${cx + 140 * k} ${gy - 170 * k} Z`, name, { t, parent: g, w: "mid" });
  DS.shape(S, rrect(cx + 140 * k, gy - 320 * k, 110 * k, 56 * k, DS.r.md), name, { t, parent: g, w: "mid" });
  S.draw(smooth([[cx + 100 * k, gy - 200 * k], [cx + 130 * k, gy - 290 * k], [cx + 160 * k, gy - 330 * k]]), t ?? S.start, 0, { c: DS.c("brown"), w: DS.w.near, parent: g });
  S.draw(smooth([[cx - 120 * k, gy - 180 * k], [cx - 160 * k, gy - 140 * k], [cx - 150 * k, gy - 80 * k]]), t ?? S.start, 0, { c: DS.c("brown"), w: DS.w.near, parent: g });
  S.fill(circ(cx + 200 * k, gy - 300 * k, 6 * k), t ?? S.start, 0, DS.c("ink"), 1, g);
  return g; };
// bird silhouettes for the Ur pieces: swallow (forked tail), raven (black), rooster (comb), eagle (hooked beak)
const bird = (S, cx, cy, k, kind, t) => { const g = S.grp(), body = { swallow: "navy", raven: "ink", rooster: "orange", eagle: "wood" }[kind];
  DS.shape(S, circ(cx, cy, 60 * k, 40 * k), body, { t, parent: g, w: "mid" });
  DS.shape(S, circ(cx - 58 * k, cy - 36 * k, 30 * k), body, { t, parent: g, w: "mid" });
  if (kind === "swallow") DS.shape(S, `M${cx + 50 * k} ${cy} L${cx + 130 * k} ${cy - 30 * k} L${cx + 96 * k} ${cy + 6 * k} L${cx + 130 * k} ${cy + 40 * k} Z`, body, { t, parent: g, w: "mid" });
  else DS.shape(S, `M${cx + 50 * k} ${cy - 10 * k} L${cx + 110 * k} ${cy - 30 * k} L${cx + 104 * k} ${cy + 20 * k} Z`, body, { t, parent: g, w: "mid" });
  if (kind === "rooster") { DS.shape(S, `M${cx - 74 * k} ${cy - 62 * k} Q${cx - 70 * k} ${cy - 92 * k} ${cx - 56 * k} ${cy - 70 * k} Q${cx - 48 * k} ${cy - 96 * k} ${cx - 38 * k} ${cy - 62 * k} Z`, "red", { t, parent: g, w: "detail" }); }
  DS.shape(S, kind === "eagle" ? `M${cx - 86 * k} ${cy - 44 * k} Q${cx - 120 * k} ${cy - 40 * k} ${cx - 108 * k} ${cy - 16 * k} L${cx - 84 * k} ${cy - 28 * k} Z` : `M${cx - 86 * k} ${cy - 42 * k} L${cx - 116 * k} ${cy - 32 * k} L${cx - 86 * k} ${cy - 26 * k} Z`, "gold", { t, parent: g, w: "detail" });
  S.fill(circ(cx - 64 * k, cy - 42 * k, 6 * k), t ?? S.start, 0, kind === "raven" || kind === "swallow" ? DS.P.white[0] : DS.c("ink"), 1, g);
  S.draw(smooth([[cx - 20 * k, cy - 10 * k], [cx + 20 * k, cy - 20 * k], [cx + 50 * k, cy - 6 * k]]), t ?? S.start, 0, { c: DS.c(body, 2), w: DS.w.detail, parent: g });
  return g; };
const lion = (S, cx, cy, k, t) => { const g = S.grp();
  const P = Array.from({ length: 24 }, (_, i) => { const a = (i / 24) * Math.PI * 2, r = (i % 2 ? 80 : 94) * k; return [cx + Math.cos(a) * r, cy + 6 * k + Math.sin(a) * r * 1.05]; });
  DS.shape(S, smooth([...P, P[0]]) + " Z", "brown", { t, parent: g, w: "mid" });
  [-1, 1].forEach((sd) => DS.shape(S, circ(cx + sd * 40 * k, cy - 44 * k, 16 * k), "gold", { t, parent: g, w: "detail" }));
  DS.shape(S, circ(cx, cy, 56 * k, 60 * k), "gold", { t, parent: g, w: "mid" });
  DS.shape(S, circ(cx, cy + 26 * k, 30 * k, 22 * k), "sand", { t, parent: g, w: "detail", flat: true, tone: 1 });
  [-1, 1].forEach((sd) => S.fill(circ(cx + sd * 20 * k, cy - 12 * k, 6 * k), t ?? S.start, 0, DS.c("ink"), 1, g));
  DS.shape(S, `M${cx - 11 * k} ${cy + 12 * k} L${cx + 11 * k} ${cy + 12 * k} L${cx} ${cy + 24 * k} Z`, "brown", { t, parent: g, w: "hair", flat: true });
  S.draw(`M${cx} ${cy + 24 * k} V${cy + 34 * k} M${cx - 14 * k} ${cy + 40 * k} Q${cx} ${cy + 34 * k} ${cx + 14 * k} ${cy + 40 * k}`, t ?? S.start, 0, { c: DS.c("brown"), w: DS.w.detail, parent: g });
  return g; };
const beer = (S, cx, gy, k, t) => { const g = S.grp(); DS.shadow(S, cx, gy, 140 * k, { t, parent: g });
  DS.shape(S, `M${cx - 40 * k} ${gy - 150 * k} Q${cx - 80 * k} ${gy - 80 * k} ${cx - 30 * k} ${gy} H${cx + 30 * k} Q${cx + 80 * k} ${gy - 80 * k} ${cx + 40 * k} ${gy - 150 * k} Z`, "earth", { t, parent: g, w: "mid", tone: 0 });
  const F = Array.from({ length: 7 }, (_, i) => [cx - 48 * k + i * 16 * k, gy - 150 * k - (i % 2 ? 26 : 12) * k]);
  DS.shape(S, smooth([[cx - 48 * k, gy - 146 * k], ...F, [cx + 48 * k, gy - 146 * k]]) + " Z", "white", { t, parent: g, w: "detail" });
  S.draw(line([cx + 26 * k, gy - 190 * k], [cx + 70 * k, gy - 250 * k], 0), t ?? S.start, 0, { c: DS.c("gold", 2), w: DS.w.mid, parent: g }); // a drinking straw, as the Babylonians drank beer
  return g; };
const friends = (S, cx, cy, k, t) => { const g = S.grp(); [[-34, "pink"], [34, "green"]].forEach(([dx, n]) => { DS.shape(S, rrect(cx + dx * k - 30 * k, cy, 60 * k, 80 * k, DS.r.md), n, { t, parent: g, w: "mid" }); DS.shape(S, circ(cx + dx * k, cy - 40 * k, 34 * k), "white", { t, parent: g, w: "mid" }); S.draw(arc(cx + dx * k, cy - 34 * k, 14 * k, 20, 160), t ?? S.start, 0, { c: DS.c("ink"), w: DS.w.detail, parent: g }); }); return g; };

// ---------- the palace bull (lamassu) ----------
// side view facing left, human head turned to the viewer, tall horned crown, curled beard, big wing, FIVE legs; stands on a plinth.
// (x, gy) = centre bottom of the plinth. o.board = scratched Game of Ur on the plinth face
const lamassu = (S, x, gy, k, o = {}) => {
  const t = o.t, g = S.grp(o.parent), X = (v) => x + v * k, Y = (v) => gy - v * k, st = "sand";
  DS.shadow(S, x, gy, 1240 * k, { t, parent: g });
  DS.shape(S, rect(X(-560), Y(110), 1120 * k, 110 * k), st, { t, parent: g, tone: 2, dir: "v" });
  S.draw(line([X(-560), Y(110)], [X(560), Y(110)], 0), t ?? S.start, 0, { c: DS.c(st, 2), w: DS.w.mid, parent: g });
  DS.shape(S, `M${X(-520)} ${Y(110)} V${Y(760)} H${X(530)} V${Y(110)} Z`, st, { t, parent: g, tone: 1, flat: true, w: "mid" }); // the gate slab it is carved from
  // legs: two in front (one seen from the front), one striding, two behind = five
  [[-420, 0], [-330, 0], [-230, 26], [250, -10], [360, 14]].forEach(([dx, lean]) => {
    DS.shape(S, `M${X(dx - 34)} ${Y(440)} L${X(dx + 34)} ${Y(440)} L${X(dx + 30 + lean)} ${Y(140)} L${X(dx - 30 + lean)} ${Y(140)} Z`, st, { t, parent: g, w: "mid" });
    DS.shape(S, rrect(X(dx - 42 + lean), Y(150), 84 * k, 40 * k, DS.r.xs), "gray", { t, parent: g, w: "detail", tone: 2 }); });
  // body + belly curls
  DS.shape(S, `M${X(-470)} ${Y(560)} Q${X(-480)} ${Y(380)} ${X(-360)} ${Y(360)} L${X(400)} ${Y(360)} Q${X(470)} ${Y(380)} ${X(460)} ${Y(520)} Q${X(420)} ${Y(600)} ${X(300)} ${Y(600)} L${X(-300)} ${Y(610)} Z`, st, { t, parent: g, w: "mid" });
  for (let i = 0; i < 9; i++) S.draw(arc(X(-300 + i * 80), Y(372), 26 * k, 0, 180), t ?? S.start, 0, { c: DS.c(st, 2), w: DS.w.detail, parent: g });
  S.draw(smooth([[X(455), Y(500)], [X(500), Y(420)], [X(490), Y(280)]]), t ?? S.start, 0, { c: DS.c(st, 2), w: DS.w.near, parent: g }); // tail
  DS.shape(S, circ(X(490), Y(260), 26 * k, 34 * k), st, { t, parent: g, w: "detail", tone: 2 });
  // wing sweeping up and back, three rows of feathers
  const wing = [[-300, 560], [480, 770], [530, 730], [440, 712], [510, 676], [410, 660], [480, 622], [370, 612], [420, 578], [300, 572]];
  DS.shape(S, `M${X(-300)} ${Y(560)} Q${X(-80)} ${Y(800)} ${X(480)} ${Y(770)} ` + wing.slice(2).map(([a, b]) => `L${f1(X(a))} ${f1(Y(b))}`).join(" ") + ` Q${X(0)} ${Y(560)} ${X(-300)} ${Y(560)} Z`, st, { t, parent: g, w: "mid", tone: 1 });
  [0.3, 0.6].forEach((f) => { let d = ""; for (let i = 0; i < 6; i++) { const ax = -240 + i * 80, ay = 590 + f * 140 - i * 2; d += `M${f1(X(ax))} ${f1(Y(ay))} Q${f1(X(ax + 40))} ${f1(Y(ay - 30))} ${f1(X(ax + 80))} ${f1(Y(ay - 4))} `; } S.draw(d, t ?? S.start, 0, { c: DS.c(st, 2), w: DS.w.detail, parent: g }); });
  S.draw([[530, 730, 740], [510, 676, 690], [480, 622, 640], [420, 578, 600]].map(([a, b, c]) => `M${f1(X(240))} ${f1(Y(c))} L${f1(X(a - 20))} ${f1(Y(b + 8))}`).join(" "), t ?? S.start, 0, { c: DS.c(st, 2), w: DS.w.detail, parent: g });
  // head: calm face, curled beard, tall horned crown
  const hx = X(-400), hy = Y(640);
  DS.shape(S, rrect(hx - 92 * k, hy + 40 * k, 184 * k, 210 * k, DS.r.md), st, { t, parent: g, w: "mid", tone: 2 });
  for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) S.draw(circ(hx - 66 * k + c * 44 * k, hy + 80 * k + r * 46 * k, 14 * k), t ?? S.start, 0, { c: DS.c(st, 2), w: DS.w.detail, parent: g });
  [-1, 1].forEach((sd) => { for (let r = 0; r < 4; r++) DS.shape(S, circ(hx + sd * 96 * k, hy - 50 * k + r * 46 * k, 22 * k), st, { t, parent: g, w: "detail", tone: 2 }); });
  DS.shape(S, circ(hx, hy, 86 * k, 96 * k), st, { t, parent: g, w: "mid" });
  [-1, 1].forEach((sd) => { DS.shape(S, circ(hx + sd * 34 * k, hy - 8 * k, 20 * k, 11 * k), "white", { t, parent: g, w: "detail", flat: true }); S.fill(circ(hx + sd * 34 * k, hy - 8 * k, 8 * k), t ?? S.start, 0, DS.c("ink"), 1, g);
    S.draw(arc(hx + sd * 34 * k, hy - 18 * k, 26 * k, 205, 335, 14 * k), t ?? S.start, 0, { c: DS.c("ink"), w: DS.w.detail, parent: g }); });
  S.draw(line([hx, hy - 6 * k], [hx - 6 * k, hy + 30 * k], 0) + line([hx - 22 * k, hy + 54 * k], [hx + 22 * k, hy + 54 * k], 0), t ?? S.start, 0, { c: DS.c("ink"), w: DS.w.detail, parent: g });
  DS.shape(S, rect(hx - 84 * k, hy - 250 * k, 168 * k, 160 * k), st, { t, parent: g, w: "mid", tone: 1 });
  [0, 1, 2].forEach((i) => S.draw(smooth([[hx - 84 * k, hy - 110 * k - i * 46 * k], [hx, hy - 136 * k - i * 46 * k], [hx + 84 * k, hy - 110 * k - i * 46 * k]]), t ?? S.start, 0, { c: DS.c(st, 2), w: DS.w.mid, parent: g }));
  DS.shape(S, rrect(hx - 96 * k, hy - 268 * k, 192 * k, 30 * k, DS.r.xs), st, { t, parent: g, w: "detail", tone: 2 });
  S.draw(Array.from({ length: 6 }, (_, i) => `M${f1(hx - 80 * k + i * 32 * k)} ${f1(hy - 268 * k)} q${f1(16 * k)} ${f1(-34 * k)} ${f1(32 * k)} 0`).join(" "), t ?? S.start, 0, { c: DS.c(st, 2), w: DS.w.mid, parent: g });
  if (o.board !== false) urBoard(S, X(-40), Y(55), 26 * k, { scratched: true, t: o.tb ?? t });
  return { g, head: [hx, hy], plinth: [X(-40), Y(55)] };
};

// ---------- Pompeii ----------
const VERSE = ["ADMIROR, PARIES, TE NON", "CECIDISSE RUINIS, QUI TOT", "SCRIPTORUM TAEDIA SUSTINEAS"];
const graffiti = (S, x, y, w, h, t, n = 14, parent, k0 = 0) => { for (let i = k0; i < k0 + n; i++) { const gx = x + ((i * 0.618) % 1) * w, gy = y + ((i * 0.381 + 0.13) % 1) * h, l = 60 + ((i * 37) % 80);
  S.draw(smooth([[gx, gy], [gx + l * 0.3, gy - 8], [gx + l * 0.6, gy + 6], [gx + l, gy - 4]]), t ?? S.start, 0, { c: DS.c(i % 3 ? "gray" : "brown", 2), w: DS.w.detail, parent }); } };
const pWall = (S, x, y, w, h, o = {}) => {
  const g = o.parent || S.grp();
  DS.shape(S, rect(x - 20, y - 34, w + 40, 38), "white", { flat: true, tone: 2, w: "mid", parent: g });
  DS.shape(S, rect(x, y, w, h * 0.62), "wall", { dir: "v", w: "mid", parent: g });
  DS.shape(S, rect(x, y + h * 0.62, w, h * 0.38), "red", { tone: 2, flat: true, w: "mid", parent: g });
  S.draw(line([x, y + h * 0.62], [x + w, y + h * 0.62], 0), S.start, 0, { c: DS.c("gold", 2), w: DS.w.mid, parent: g });
  if (o.n !== 0) graffiti(S, x + 30, y + h * 0.66, w - 160, h * 0.28, o.tg, o.n ?? 10, g);
  return g;
};
// the Pompeii couplet (CIL IV 1904) as wall writing; returns where TAEDIA sits
const verse = (S, x0, y0, size, t, parent) => {
  const L = ["ADMIROR, PARIES, TE NON", "CECIDISSE RUINIS, QUI TOT", "SCRIPTORUM"], gap = size * 1.2;
  L.forEach((s, i) => S.text(s, x0, y0 + i * gap, { size, anchor: "start", font: "caveat", t, c: DS.c("brown", 2), parent }));
  S.text("TAEDIA", x0, y0 + 3 * gap, { size, anchor: "start", font: "caveat", t, c: DS.c("brown", 2), parent });
  S.text("SUSTINEAS.", x0 + size * 3.6, y0 + 3 * gap, { size, anchor: "start", font: "caveat", t, c: DS.c("brown", 2), parent });
  return [x0 + size * 1.5, y0 + 3 * gap - size * 0.32];
};
const vesuvius = (S, x, hy, w) => DS.shape(S, `M${x - w / 2} ${hy} L${x - w * 0.12} ${hy - w * 0.32} Q${x} ${hy - w * 0.36} ${x + w * 0.1} ${hy - w * 0.3} L${x + w / 2} ${hy} Z`, "gray", { layer: "far", flat: true, w: "far" });

// ---------- misc props ----------
const scroll = (S, cx, cy, w, h, o = {}) => { const t = o.t, g = S.grp(o.parent);
  DS.drop(S, rect(cx - w / 2 + 6, cy - h / 2 + 10, w, h), { t, parent: g }); DS.shape(S, rect(cx - w / 2, cy - h / 2, w, h), "paper", { t, parent: g, w: "detail", flat: true });
  [-1, 1].forEach((sd) => DS.shape(S, rrect(cx - w / 2 - 24, cy + sd * h / 2 - 22, w + 48, 44, DS.r.md), "sand", { t, parent: g, w: "detail" }));
  for (let i = 0; i < (o.lines ?? 5); i++) S.draw(line([cx - w * 0.36, cy - h * 0.3 + i * h * 0.15], [cx + w * (i % 2 ? 0.2 : 0.36), cy - h * 0.3 + i * h * 0.15], 0), t ?? S.start, 0, { c: DS.c("gray", 2), w: DS.w.detail, parent: g });
  return g; };
const book = (S, cx, cy, w, h, name, title, o = {}) => { const t = o.t, g = S.grp(o.parent);
  DS.drop(S, rrect(cx - w / 2 + 8, cy - h / 2 + 12, w, h, DS.r.sm), { t, parent: g });
  DS.shape(S, rrect(cx - w / 2, cy - h / 2, w, h, DS.r.sm), name, { t, parent: g, w: "mid" });
  DS.shape(S, rect(cx - w / 2 + 16, cy - h / 2, 18, h), name, { t, parent: g, w: "detail", tone: 2, flat: true });
  if (title) title.split("|").forEach((s, i, a) => S.text(s, cx + 10, cy - (a.length - 1) * 28 + i * 56 + 14, { size: DS.type.caption, t, c: DS.P.white[0], parent: g }));
  return g; };
const tv = (S, cx, cy, w, h, o = {}) => { const t = o.t, g = S.grp(o.parent);
  DS.shape(S, rrect(cx - w / 2, cy - h / 2, w, h, DS.r.lg), "wood", { t, parent: g, w: "mid" });
  DS.shape(S, rrect(cx - w / 2 + 30, cy - h / 2 + 30, w - 150, h - 60, DS.r.md), "navy", { t, parent: g, w: "detail", flat: true });
  [0.3, 0.6].forEach((f) => DS.shape(S, circ(cx + w / 2 - 60, cy - h / 2 + h * f, 18), "gray", { t, parent: g, w: "detail" }));
  [[-1], [1]].forEach(([sd]) => S.draw(line([cx - 20 + sd * 10, cy - h / 2], [cx - 20 + sd * 90, cy - h / 2 - 110], 0), t ?? S.start, 0, { c: DS.c("gray", 2), w: DS.w.mid, parent: g }));
  return { g, scr: [cx - 60, cy] }; };
const pot = (S, cx, gy, k, t, dotted) => dotted ? S.draw(`M${cx - 80 * k} ${gy - 160 * k} Q${cx - 130 * k} ${gy - 60 * k} ${cx - 60 * k} ${gy} H${cx + 60 * k} Q${cx + 130 * k} ${gy - 60 * k} ${cx + 80 * k} ${gy - 160 * k} Z`, t ?? S.start, 0, { c: DS.c("brown", 1), w: DS.w.mid }) : DS.shape(S, `M${cx - 80 * k} ${gy - 160 * k} Q${cx - 130 * k} ${gy - 60 * k} ${cx - 60 * k} ${gy} H${cx + 60 * k} Q${cx + 130 * k} ${gy - 60 * k} ${cx + 80 * k} ${gy - 160 * k} Z`, "earth", { t, w: "mid", tone: 2 });
const wheat = (S, cx, gy, k, t) => { const g = S.grp(); S.draw(line([cx, gy], [cx, gy - 220 * k], 0), t ?? S.start, 0, { c: DS.c("gold", 2), w: DS.w.mid, parent: g }); for (let i = 0; i < 5; i++) [-1, 1].forEach((sd) => DS.shape(S, circ(cx + sd * 18 * k, gy - 110 * k - i * 26 * k, 12 * k, 20 * k), "gold", { t, parent: g, w: "detail" })); return g; };
const wheel = (S, cx, cy, r, t, name = "wood", parent) => { const g = S.grp(parent); DS.shape(S, circ(cx, cy, r), name, { t, parent: g, w: "mid" }); DS.shape(S, circ(cx, cy, r * 0.72), name, { t, parent: g, w: "detail", tone: 1 }); S.draw(line([cx - r * 0.72, cy], [cx + r * 0.72, cy], 0) + line([cx, cy - r * 0.72], [cx, cy + r * 0.72], 0), t ?? S.start, 0, { c: DS.c(name, 2), w: DS.w.mid, parent: g }); DS.shape(S, circ(cx, cy, r * 0.16), "brown", { t, parent: g, w: "detail" }); return g; };
const button = (S, cx, cy, k, t) => { const g = S.grp(); DS.shape(S, rrect(cx - 90 * k, cy - 20 * k, 180 * k, 70 * k, DS.r.sm), "gray", { t, parent: g, w: "mid" }); DS.shape(S, circ(cx, cy - 20 * k, 56 * k, 30 * k), "red", { t, parent: g, w: "mid" }); return g; };
const timer = (S, cx, cy, str, t) => { DS.shape(S, rrect(cx - 150, cy - 60, 300, 120, DS.r.sm), "ink", { t, w: "mid" }); S.text(str, cx, cy + 26, { size: DS.type.title, t, c: DS.c("red", 1) }); };
const cowrie = (S, cx, cy, k, t) => { DS.shape(S, circ(cx, cy, 34 * k, 24 * k), "paper", { t, w: "detail" }); S.draw(line([cx - 20 * k, cy], [cx + 20 * k, cy], 0), t ?? S.start, 0, { c: DS.c("brown", 1), w: DS.w.detail }); };
const senet = (S, cx, cy, q, o = {}) => { const t = o.t, g = S.grp(o.parent), x0 = cx - 5 * q, y0 = cy - 1.5 * q;
  DS.drop(S, rect(x0 + 8, y0 + 12, 10 * q, 3 * q), { t, parent: g }); DS.shape(S, rect(x0 - 10, y0 - 10, 10 * q + 20, 3 * q + 20), "wood", { t, parent: g, w: "mid" });
  for (let r = 0; r < 3; r++) for (let c = 0; c < 10; c++) DS.shape(S, rect(x0 + c * q + 4, y0 + r * q + 4, q - 8, q - 8), "sand", { t, parent: g, w: "hair", flat: true, tone: (r + c) % 2 ? 1 : 0 });
  [[0, 1], [0, 4], [2, 3], [2, 6], [1, 8]].forEach(([r, c], i) => DS.shape(S, i % 2 ? circ(x0 + c * q + q / 2, y0 + r * q + q / 2, q * 0.3) : `M${x0 + c * q + q * 0.25} ${y0 + r * q + q * 0.8} L${x0 + c * q + q / 2} ${y0 + r * q + q * 0.18} L${x0 + c * q + q * 0.75} ${y0 + r * q + q * 0.8} Z`, i % 2 ? "blue" : "white", { t, parent: g, w: "detail" }));
  return g; };
const nuts = (S, cx, gy, k, t) => { [[0, 0], [-40, 0], [40, 0], [-20, -34], [20, -34], [0, -68]].forEach(([dx, dy]) => DS.shape(S, circ(cx + dx * k, gy - 22 * k + dy * k, 22 * k, 20 * k), "wood", { t, w: "detail" })); };


const S = scene(0, 1, { cam: "none" });
S.bg("flat", { sky: "#7a644d", ground: "#5e4c3a", hy: 880 });
// cave mouth on the right: night sky with the moon
DS.shape(S, `M1240 880 Q1250 420 1520 300 Q1800 220 1990 330 V880 Z`, "navy", { t: 0, flat: true, w: "mid" });
[[1420, 520], [1560, 420], [1700, 560], [1820, 430], [1880, 640]].forEach(([x, y]) => S.fill(circ(x, y, 5), 0, 0, "#ffffff", 0.9));
S.fill(circ(1700, 470, 44), 0, 0, "#fff3c4", 1);
S.draw(smooth([[120, 360], [200, 330], [260, 370]]) + smooth([[1080, 300], [1150, 270], [1210, 310]]), 0, 0, { c: "#4f3f30", w: 6 });
// fire glow + logs + flames
S.fill(circ(920, 900, 470, 260), 0, 0, "#ffb347", 0.28);
[[-1], [1]].forEach(([sd]) => DS.shape(S, `M${920 - 150 * sd} 960 L${920 + 150 * sd} 900 L${920 + 160 * sd} 930 L${920 - 140 * sd} 990 Z`, "wood", { t: 0, w: "mid" }));
S.flame(920, 940, 2.4, 0, 0); S.flame(850, 950, 1.4, 0, 0); S.flame(995, 950, 1.5, 0, 0);
// right: two cave people by the fire playing the Royal Game of Ur
urBoard(S, 1460, 1010, 44, { squash: 0.5, pieces: [[1, 2, 1], [1, 5, 0], [0, 1, 0], [2, 6, 1]] });
const A = S.fig(1270, 1010, { s: 1.45, sit: true, pose: "hold", hair: "messy", hairC: "#3a2a1c", outfit: "tunic", outfitC: "#a0703f" }).instant(0); A.face(0, "happy", 8);
const B = S.fig(1660, 1010, { s: 1.45, sit: true, pose: "armsUp", hair: "bun", hairC: "#2b1d14", outfit: "tunic", outfitC: "#c08a52" }).instant(0); B.face(0, "wow", -8);
// left: big laughing cave man, knucklebones flying
const F = S.fig(400, 1900, { s: 4.2, hair: "messy", hairC: "#3a2a1c", outfit: "tunic", outfitC: "#b07a44", pose: "armsUp" }).instant(0);
F.face(0, "happy", 10);
[[700, 600, -30], [800, 500, 25], [640, 480, 70]].forEach(([x, y, r]) => KB(S, x, y, 1.0, { t: 0, rot: r }));
S.text("NO WIFI?", 960, 230, { size: 210, c: "#FEFE06", halo: "#111111", haloW: 0.09 });
