// look: still
// What Did Ancient Humans Do for Fun? (~8:37). Mission: Dave's phone dies at 7 pm and he has to get through the evening on ancient fun alone.
// Runner: Dave's table. Dead phone face down, the Royal Game of Ur board, the clay rulebook propped up as his opponent, a scoreboard
// (1-0 -> 3-0 -> 9-0). Each section adds one object: knucklebones, the vulture flute, a clay cart, the joke tablet, the guards' scratched board.
// Real people (Woolley, Finkel, Madden, Eerkens, Conard, McDonald, Wilson, Westgate, Panksepp, Brecht, Huizinga) are name cards on generic figures.

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

// ---------- timing: one picture per beat, landing just after its first word (the 0.6 s crossfade covers the breath) ----------
const CUES = [[1, 0], [2, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [10, 0], [12, 0],
  [13, 0], [14, 0], [16, 0], [18, 0], [19, 0], [21, 0], [23, 0], [25, 0], [27, 0], [28, 0], [29, 0], [31, 0], [33, 0], [34, 0], [36, 0], [37, 0], [38, 0], [39, 0], [40, 0],
  [41, 0], [43, 0], [45, 0], [47, 0], [48, 0], [49, 0], [51, 0], [52, 0], [53, 0], [54, 0], [56, 0], [57, 0], [59, 0], [60, 0], [61, 0], [63, 0],
  [64, 0], [66, 0], [67, 0], [69, 0], [70, 0], [71, 0], [72, 0], [73, 0], [75, 0],
  [76, 0], [78, 0], [80, 0], [81, 0], [83, 0], [84, 0], [86, 0], [88, 0], [89, 0], [91, 0], [93, 0],
  [95, 0], [96, 0], [97, 0], [99, 0], [100, 0], [101, 0], [102, 0], [103, 0], [105, 0], [106, 0], [108, 0], [110, 0], [111, 0], [112, 0], [114, 0], [115, 0],
  [117, 0], [118, 0], [119, 0], [120, 0], [121, 0], [123, 0], [124, 0], [125, 0], [126, 0], [127, 0], [128, 0], [129, 0]];
const WINS = sceneWindows(CUES, -0.25);
const sc = (c, w, o) => { const k = CUES.findIndex(([a, b]) => a === c && b === w); if (k < 0) throw new Error("no cue " + c + ":" + w); return scene(WINS[k][0], WINS[k][1], o); };

// ===================== 0. Dave's phone dies =====================
// This is Dave. At seven o'clock tonight, his phone died.
{ const S = sc(1, 0, { cam: "push", focus: "700 560" }); const T = daveTable(S, DS.room(S, NIGHT), { board: false, tablet: false, phone: false, mood: "smile", look: 6 });
  const [hx, hy] = T.F.hand("R"); bigPhone(S, hx + 96, hy - 96, 110, 190, { die: W(1, 9) });
  T.F.face(W(1, 9), "wow", 6);
  DS.card(S, "DAVE", 270, 440, { size: DS.type.body, t: W(1, 2) });
  DS.card(S, "7:00 PM", 790, 200, { size: DS.type.small, t: W(1, 4) });
  DS.card(S, "DEAD", 880, 460, { size: DS.type.body, t: W(1, 9), tc: "red" });
  DS.vignette(S); }

// No charger, four hours until bed, and one firm belief. / Before screens, humans must have been bored out of their minds.
{ const S = sc(2, 0, { cam: "push", focus: "900 520" }); const T = daveTable(S, DS.room(S, NIGHT), { board: false, tablet: false, mood: "flat", look: 6 });
  DS.shape(S, rrect(225, 520, 74, 100, DS.r.sm), "white", { w: "detail" }); [248, 276].forEach((x) => S.fill(rrect(x - 4, 552, 8, 24, DS.r.xs), S.start, 0, DS.c("ink"), 1));
  xMark(S, 262, 570, 44, W(2, 1));
  DS.card(S, "NO CHARGER", 262, 420, { size: DS.type.caption, t: W(2, 1), tc: "red" });
  DS.card(S, "4 HOURS UNTIL BED", 1000, 110, { size: DS.type.small, t: W(2, 2) });
  T.F.face(W(2, 8), "determined", 6);
  const b = S.grp(); S.thought(1170, 420, 330, 190, 640, 430, W(3, 0), 0.3, { parent: b });
  ancient(S, 1060, 540, "near", 0, Object.assign({ s: 0.62, sit: true, mood: "tired", look: 6, t: W(3, 0), parent: b }, GR));
  DS.shape(S, circ(1290, 505, 80, 50), "gray", { t: W(3, 0), parent: b, w: "mid" });
  S.zzz(1100, 330, W(3, 6), 0.6, { parent: b });
  T.F.face(W(3, 6), "smile", 6);
  DS.vignette(S); }

// Three hundred thousand years of staring at a rock.
{ const S = sc(4, 0, { cam: "push", focus: "1000 700" }); DS.outdoor(S, { hy: 640, sky: "dusk", hills: "earth", ground: "sand", sun: [1560, 300] });
  DS.shadow(S, 1300, 870, 420); DS.shape(S, smooth([[1080, 870], [1100, 720], [1220, 640], [1380, 650], [1500, 740], [1520, 870], [1080, 870]]) + " Z", "gray", { w: "near" });
  S.draw(smooth([[1200, 700], [1260, 740], [1250, 800]]), S.start, 0, { c: DS.c("gray", 2), w: DS.w.detail });
  ancient(S, 680, 870, "near", 0, Object.assign({ s: 1.35, sit: true, mood: "tired", look: 7, pose: "sad" }, GR));
  S.zzz(840, 380, W(4, 5), 0.6);
  DS.card(S, "300,000 YEARS", 960, 150, { size: DS.type.title, t: W(4, 0), tc: "red" });
  DS.vignette(S); }

// Here's the thing. If the whole story of our species were squeezed into one day,
{ const S = sc(5, 0, { cam: "push", focus: "960 520" }); DS.room(S, { wall: "paper", floor: "wood", window: false });
  DS.shadow(S, 960, 900, 600); DS.drop(S, circ(970, 545, 262));
  const C = S.clock(960, 530, 260, S.start, 0, { h: 0, m: 0 }); C.spin(S.at(0.35), S.d(0.45), 2);
  DS.card(S, "OUR SPECIES", 420, 300, { size: DS.type.small, t: W(5, 8) });
  DS.card(S, "300,000 YEARS", 420, 420, { size: DS.type.small, t: W(5, 8), tc: "red" });
  DS.card(S, "= 1 DAY", 1500, 360, { size: DS.type.title, t: W(5, 11) });
  DS.vignette(S); }

// screens showed up in the last thirty seconds.
{ const S = sc(6, 0, { cam: "zoom", focus: "960 420" }); DS.room(S, { wall: "night", floor: "wood", window: false });
  DS.drop(S, rrect(498, 318, 940, 190, DS.r.md)); DS.shape(S, rrect(490, 310, 940, 190, DS.r.md), "ink", { w: "mid" });
  S.text("11:59:30 PM", 960, 445, { size: DS.type.display, c: DS.c("red", 1) });
  tv(S, 760, 760, 300, 200, { t: W(6, 0) }); bigPhone(S, 1180, 760, 110, 190, { t: W(6, 0) });
  DS.card(S, "LAST 30 SECONDS", 960, 140, { size: DS.type.body, t: W(6, 5), tc: "red" });
  DS.vignette(S, 0.18); }

// So what did ancient humans do for fun? And were they ever bored?
{ const S = sc(7, 0, { cam: "push", focus: "900 600" }); DS.outdoor(S, { hy: 700, sky: "night", hills: "navy", ground: "earth", sun: false });
  S.stars(26, 120, 80, 1800, 520, S.start, 0);
  DS.shadow(S, 760, 905, 360); DS.shape(S, smooth([[600, 905], [620, 830], [760, 800], [900, 830], [920, 905], [600, 905]]) + " Z", "gray", { w: "near" });
  ancient(S, 760, 830, "near", 1, { sit: true, mood: "flat", look: 7, pose: "think" });
  S.text("?", 930, 560, { size: DS.type.display, t: W(7, 1), c: DS.c("yellow") });
  DS.card(S, "ANCIENT FUN?", 1300, 200, { size: DS.type.title, t: W(7, 3) });
  DS.card(S, "EVER BORED?", 1300, 360, { size: DS.type.title, t: W(7, 11), tc: "red" });
  DS.vignette(S, 0.2); }

// The answer runs through a game with a lost rulebook, the oldest joke ever written down, / and a flute made from a vulture.
{ const S = sc(8, 0, { cam: "push" }); DS.room(S, { wall: "wall", floor: "wood", window: false });
  panel(S, 400, 540, 480, 520, W(8, 4)); urBoard(S, 400, 480, 48, { t: W(8, 4) }); S.text("?", 400, 690, { size: DS.type.title, t: W(8, 8), c: DS.c("red", 2) }); txt(S, "A LOST RULEBOOK", 400, 760, { t: W(8, 8) });
  panel(S, 960, 540, 480, 520, W(8, 10)); tablet(S, 960, 480, 260, 220, { t: W(8, 10) }); txt(S, "THE OLDEST JOKE", 960, 760, { t: W(8, 11) });
  panel(S, 1520, 540, 480, 520, W(9, 2)); flute(S, 1330, 520, 380, { t: W(9, 2) }); vulture(S, 1520, 470, 0.5, W(9, 6)); txt(S, "A VULTURE FLUTE", 1520, 760, { t: W(9, 2) });
  DS.card(S, "THE ANSWER", 960, 150, { size: DS.type.body, t: W(8, 1) });
  DS.vignette(S); }

// And by bedtime, Dave will be losing that game / to a rulebook older than the Roman Empire.
{ const S = sc(10, 0, { cam: "push", focus: "1000 560" }); daveTable(S, DS.room(S, NIGHT), { h: 11, mood: "worried", look: 6, pieces: [[1, 2, 0], [2, 7, 1], [2, 6, 1], [1, 7, 1]] });
  DS.card(S, "BY BEDTIME", 790, 200, { size: DS.type.small, t: W(10, 1) });
  DS.card(S, "OLDER THAN THE ROMAN EMPIRE", 900, 330, { size: DS.type.small, t: W(11, 3), tc: "red" });
  DS.vignette(S); }

// Let's start with the oldest board game whose rules survived.
{ const S = sc(12, 0, { cam: "zoom", focus: "960 540" }); museum(S, DS.room(S, MUSE));
  DS.shadow(S, 960, 920, 520); DS.shape(S, rect(760, 650, 400, 270), "white", { dir: "h" });
  urBoard(S, 960, 560, 50, {});
  DS.shape(S, rrect(700, 400, 520, 250, DS.r.xs), "glass", { w: "detail", op: 0.22 });
  DS.card(S, "OLDEST SURVIVING RULES", 960, 220, { size: DS.type.body, t: W(12, 4) });
  DS.vignette(S); }

// ===================== 1. The lost rulebook =====================
// About a century ago, archaeologist Leonard Woolley dug up the Royal Cemetery of Ur, in what is now Iraq.
{ const S = sc(13, 0, { cam: "pull" }); DS.outdoor(S, DESERT);
  DS.shape(S, `M520 700 L1240 700 L1330 860 L430 860 Z`, "earth", { flat: true, tone: 2, w: "mid" });
  DS.shape(S, `M520 700 L1240 700 L1250 720 L510 720 Z`, "sand", { flat: true, tone: 2, w: "hair" });
  DS.shape(S, smooth([[1600, 700], [1660, 650], [1760, 640], [1840, 690], [1860, 700], [1600, 700]]) + " Z", "earth", { layer: "mid", w: "mid" });
  person(S, 820, 820, "mid", 4, { mood: "determined", look: 5, pose: "push", outfitC: DS.c("sky", 0, "mid") });
  const F = who(S, 1520, 960, "near", { s: 1.1, hair: "short", hairC: DS.c("brown", 2), outfitC: DS.c("sand", 2), mood: "smile", look: -6, pose: "pointL" }); acc(S, F, "pith");
  DS.card(S, "LEONARD WOOLLEY", 1500, 470, { size: DS.type.small, t: W(13, 5) });
  DS.card(S, "ROYAL CEMETERY OF UR", 880, 140, { size: DS.type.body, t: W(13, 10) });
  DS.card(S, "IRAQ · 1922–1934", 640, 280, { size: DS.type.small, t: W(13, 14) });
  DS.vignette(S); }

// Among the gold and the royal graves were five game boards, / about four and a half thousand years old.
{ const S = sc(14, 0, { cam: "push", focus: "960 600" }); DS.room(S, { wall: "earth", floor: "earth", window: false });
  const gold = W(14, 2);
  DS.shape(S, `M470 460 L570 460 L555 540 Q520 560 485 540 Z`, "gold", { t: gold, w: "mid" }); DS.shape(S, rect(510, 545, 20, 50), "gold", { t: gold, w: "detail" }); DS.shape(S, rrect(470, 590, 100, 20, DS.r.xs), "gold", { t: gold, w: "detail" });
  S.draw(smooth(Array.from({ length: 7 }, (_, i) => [1320 + i * 52, 560 - Math.sin((i / 6) * Math.PI) * 50])), gold, 0, { c: DS.c("gold", 2), w: DS.w.near });
  for (let i = 0; i < 7; i++) { const x = 1320 + i * 52, y = 540 - Math.sin((i / 6) * Math.PI) * 50; DS.shape(S, `M${x} ${y + 20} Q${x - 22} ${y - 10} ${x} ${y - 46} Q${x + 22} ${y - 10} ${x} ${y + 20} Z`, "gold", { t: gold + 0.1, w: "detail" }); }
  [360, 660, 960, 1260, 1560].forEach((x, i) => urBoard(S, x, 790, 30, { t: W(14, 8) + i * 0.15 }));
  DS.card(S, "5 GAME BOARDS", 960, 150, { size: DS.type.body, t: W(14, 8) });
  DS.card(S, "4,500 YEARS OLD", 960, 290, { size: DS.type.body, t: W(15, 1), tc: "red" });
  DS.vignette(S); }

// Twenty squares, inlaid with shell and lapis lazuli. / Two players, seven pieces each, and a race to the end.
{ const S = sc(16, 0, { cam: "push", focus: "960 480" }); DS.room(S, { wall: "wall", floor: "wood", window: false });
  const B = urBoard(S, 960, 470, 150, {});
  for (let i = 0; i < 7; i++) { urPiece(S, 200 + i * 78, 880, 34, false, W(17, 2) + i * 0.05); urPiece(S, 1250 + i * 78, 880, 34, true, W(17, 2) + i * 0.05); }
  const P = [B.at(0, 3), B.at(0, 0), B.at(1, 0), B.at(1, 7), B.at(0, 7), B.at(0, 6)];
  S.arrow(...P[0], ...P[1], W(17, 7), 0.3, { c: DS.c("red"), w: DS.w.near });
  S.draw(`M${P[1][0]} ${P[1][1]} L${P[2][0]} ${P[2][1]} L${P[3][0]} ${P[3][1]} L${P[4][0]} ${P[4][1]} L${P[5][0] + 30} ${P[5][1]}`, W(17, 7), 0, { c: DS.c("red"), w: DS.w.near, op: 0.85 });
  DS.card(S, "20 SQUARES", 960, 130, { size: DS.type.body, t: W(16, 0) });
  DS.card(S, "7 PIECES EACH", 960, 790, { size: DS.type.small, t: W(17, 2) });
  DS.vignette(S); }

// People across the Middle East played it for around three thousand years.
{ const S = sc(18, 0, { cam: "push", focus: "960 520" }); DS.room(S, { wall: "paper", floor: "wood", window: false });
  mapCard(S, 300, 110, 1320, 780, false);
  DS.shape(S, smooth([[300, 280], [520, 300], [610, 420], [560, 600], [440, 660], [300, 640]]) + " Z", "sky", { flat: true, tone: 1, w: "detail" });
  DS.shape(S, smooth([[1260, 700], [1420, 760], [1600, 880], [1500, 890], [1340, 800], [1240, 730], [1260, 700]]) + " Z", "sky", { flat: true, tone: 1, w: "detail" });
  S.draw(smooth([[820, 160], [900, 400], [1100, 580], [1270, 712]]), S.start, 0, { c: DS.c("blue"), w: DS.w.mid });
  S.draw(smooth([[1000, 150], [1080, 380], [1200, 560], [1276, 708]]), S.start, 0, { c: DS.c("blue"), w: DS.w.mid });
  [[1250, 690], [1110, 520], [720, 430], [900, 290], [1380, 380], [600, 780]].forEach(([x, y], i) => pin(S, x, y, W(18, 3) + i * 0.12));
  DS.card(S, "AROUND 3,000 YEARS", 960, 820, { size: DS.type.body, t: W(18, 9), tc: "red" });
  DS.vignette(S); }

// Then it faded away, and the rules were forgotten. // A beautiful board, a handful of pieces, and no idea how to play.
{ const S = sc(19, 0, { cam: "push", focus: "960 600" }); DS.room(S, { wall: "gray", floor: "wood", window: false });
  DS.shadow(S, 960, 820, 1000); DS.shape(S, rect(420, 740, 1080, 60), "wood", { w: "mid" });
  urBoard(S, 960, 600, 80, {});
  [[520, 720, 0], [600, 730, 1], [1360, 726, 0], [1440, 718, 1], [1400, 690, 1]].forEach(([x, y, dk]) => urPiece(S, x, y, 26, dk, S.start));
  ["?", "?", "?"].forEach((q, i) => S.text(q, 640 + i * 320, 380 - (i % 2) * 40, { size: DS.type.display, t: W(20, 8) + i * 0.12, c: DS.c("yellow") }));
  DS.card(S, "RULES FORGOTTEN", 960, 140, { size: DS.type.body, t: W(19, 6), tc: "red" });
  DS.card(S, "NO IDEA HOW TO PLAY", 960, 900, { size: DS.type.small, t: W(20, 8) });
  DS.vignette(S, 0.16); }

// But the rulebook was already in the British Museum. / A clay tablet, written in Babylon about two thousand two hundred years ago.
{ const S = sc(21, 0, { cam: "zoom", focus: "960 520" }); museum(S, DS.room(S, MUSE));
  DS.shadow(S, 960, 920, 480); DS.shape(S, rect(780, 680, 360, 240), "white", { dir: "h" });
  tablet(S, 960, 520, 260, 300, { t: S.start });
  DS.shape(S, rrect(740, 340, 440, 340, DS.r.xs), "glass", { w: "detail", op: 0.3 });
  DS.card(S, "BRITISH MUSEUM", 960, 160, { size: DS.type.body, t: W(21, 7) });
  DS.card(S, "BABYLON", 1500, 430, { size: DS.type.small, t: W(22, 5) });
  DS.card(S, "ABOUT 2,200 YEARS AGO", 1460, 560, { size: DS.type.small, t: W(22, 7), tc: "red" });
  DS.vignette(S); }

// In the eighteen eighties, an expert at the museum read the back / and described it as omens from the flight of birds.
{ const S = sc(23, 0, { cam: "push", focus: "900 560" }); DS.room(S, { wall: "wall", floor: "wood", window: [1300, 160, 220, 220] });
  DS.shadow(S, 960, 960, 760); DS.shape(S, rect(620, 720, 700, 40), "wood"); [650, 1260].forEach((x) => DS.shape(S, rect(x, 760, 30, 200), "wood", { w: "mid" }));
  easel(S, 1060, 560, 722); tablet(S, 1060, 600, 200, 230, {});
  const F = who(S, 640, 960, "near", { s: 1.1, hair: "side", hairC: DS.c("gray", 1), outfitC: DS.c("navy"), mood: "flat", look: 7, pose: "reach" }); acc(S, F, "tache");
  const [hx, hy] = F.hand("R"); S.draw(circ(hx + 60, hy - 10, 50), S.start, 0, { c: DS.c("ink"), w: DS.w.near }); S.fill(circ(hx + 60, hy - 10, 46), S.start, 0, DS.c("glass", 1), 0.5);
  DS.card(S, "1880s EXPERT", 640, 430, { size: DS.type.small, t: W(23, 2) });
  const b = S.grp(); S.thought(1340, 330, 300, 150, 760, 560, W(24, 4), 0.3, { parent: b });
  [[1220, 320, "raven"], [1360, 280, "swallow"], [1480, 350, "eagle"]].forEach(([x, y, k], i) => { const g = bird(S, x, y, 0.55, k, W(24, 7) + i * 0.1); b.appendChild(g); });
  DS.card(S, "OMENS FROM BIRDS", 1340, 120, { size: DS.type.small, t: W(24, 4), tc: "red" });
  DS.vignette(S); }

// In fairness, the game pieces had bird names. / The swallow, the raven, the rooster, the eagle.
{ const S = sc(25, 0, { cam: "push" }); DS.room(S, { wall: "paper", floor: "wood", window: false });
  [["swallow", "SWALLOW"], ["raven", "RAVEN"], ["rooster", "ROOSTER"], ["eagle", "EAGLE"]].forEach(([k, n], i) => { const x = 420 + i * 360, t = W(26, 1 + i * 2);
    DS.shadow(S, x, 760, 220); urPiece(S, x, 700, 80, i % 2 === 1, S.start);
    bird(S, x + 10, 450, 1.1, k, t); txt(S, n, x, 860, { t, size: DS.type.small }); });
  DS.card(S, "BIRD NAMES", 960, 140, { size: DS.type.body, t: W(25, 6) });
  DS.vignette(S); }

// It took about seventy years for scholars to prove it was about a game.
{ const S = sc(27, 0, { cam: "push", focus: "960 500" }); DS.room(S, { wall: "glass", floor: "gray", window: false });
  DS.drop(S, rect(268, 168, 1400, 620)); DS.shape(S, rrect(260, 160, 1400, 620, DS.r.sm), "wood", { layer: "mid" }); DS.shape(S, rect(282, 182, 1356, 576), "white", { layer: "mid", flat: true, w: "detail" });
  S.draw(line([420, 560], [1500, 560], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.mid });
  [[460, "1886", "BIRD OMENS?"], [1460, "1960", "A GAME!"]].forEach(([x, y, s], i) => { S.draw(line([x, 530], [x, 590], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.mid }); S.text(y, x, 660, { size: DS.type.small, c: DS.c("ink") }); S.text(s, x + (i ? -20 : 90), 290, { size: DS.type.small, t: i ? W(27, 8) : S.start, c: DS.c(i ? "green" : "gray", 2) }); });
  bird(S, 470, 420, 0.7, "raven", S.start); urBoard(S, 1460, 430, 24, { t: W(27, 8) });
  arrow(S, 520, 500, 1400, 500, W(27, 2), { bend: -0.06 });
  DS.card(S, "ABOUT 70 YEARS", 960, 400, { size: DS.type.body, t: W(27, 3), tc: "red" });
  DS.vignette(S); }

// Then, in the nineteen eighties, curator Irving Finkel worked out how to play it.
{ const S = sc(28, 0, { cam: "push", focus: "860 560" }); museum(S, DS.room(S, { wall: "wall", floor: "gray", window: false }), { cols: [1560] });
  const F = who(S, 700, 960, "near", { s: 1.1, hair: "short", hairC: DS.c("gray", 2), outfitC: DS.c("green"), mood: "determined", look: 6, pose: "think" });
  DS.shadow(S, 980, 960, 900); DS.shape(S, rect(520, 730, 920, 40), "wood"); [550, 1380].forEach((x) => DS.shape(S, rect(x, 770, 30, 190), "wood", { w: "mid" }));
  urBoard(S, 1080, 708, 30, { squash: 0.5 }); tablet(S, 1340, 650, 120, 150, {});
  S.bulb(560, 300, 1.0, W(28, 8), 0.3);
  F.face(W(28, 8), "happy", 6);
  DS.card(S, "IRVING FINKEL · CURATOR", 1150, 440, { size: DS.type.small, t: W(28, 6) });
  DS.card(S, "1980s", 1100, 150, { size: DS.type.body, t: W(28, 3) });
  DS.vignette(S); }

// Even the squares came with fortunes. / Land on one and the tablet says, "You will find a friend."
const FORT = (S) => urBoard(S, 960, 560, 140, {});
{ const S = sc(29, 0, { cam: "push", focus: "800 560" }); DS.room(S, WARM); const B = FORT(S);
  [B.at(1, 3), B.at(0, 0), B.at(2, 7)].forEach(([x, y], i) => S.burst(x, y, 80, 100, 10, W(29, 5) + i * 0.1, 0.3, { c: DS.c("gold", 2), w: DS.w.mid }));
  const g = S.grp(); const [px, py] = B.at(1, 1); urPiece(S, px, py, 46, false, S.start, g);
  const [qx, qy] = B.at(1, 3); S.move(g, W(30, 0), 0.6, { x: qx - px, y: qy - py }, "power2.inOut");
  ring(S, qx, qy, 80, 80, W(30, 1));
  DS.card(S, "YOU WILL FIND A FRIEND.", 960, 150, { size: DS.type.body, t: W(30, 7) });
  DS.vignette(S); }

// Others say you will be powerful like a lion, / or that you will draw fine beer.
{ const S = sc(31, 0, { cam: "push", focus: "960 560" }); DS.room(S, WARM); const B = FORT(S);
  const [lx, ly] = B.at(0, 2); DS.shape(S, rrect(lx - 70, ly - 70, 140, 140, DS.r.xs), "paper", { t: W(31, 5), w: "detail" }); lion(S, lx, ly, 0.75, W(31, 5));
  const [bx, by] = B.at(2, 6); DS.shape(S, rrect(bx - 70, by - 70, 140, 140, DS.r.xs), "paper", { t: W(32, 4), w: "detail" }); beer(S, bx - 10, by + 56, 0.62, W(32, 4));
  DS.card(S, "POWERFUL LIKE A LION", 700, 150, { size: DS.type.small, t: W(31, 5) });
  DS.card(S, "FINE BEER", 1420, 900, { size: DS.type.small, t: W(32, 5), tc: "orange" });
  DS.vignette(S); }

// A friend, power, and beer. The Babylonian dream, in three squares.
{ const S = sc(33, 0, { cam: "pull" }); DS.room(S, { wall: "wall", floor: "wood", window: false });
  [[480, W(33, 1)], [960, W(33, 2)], [1440, W(33, 4)]].forEach(([x, t], i) => { DS.drop(S, rrect(x - 160, 330, 320, 320, DS.r.md), { t }); DS.shape(S, rrect(x - 170, 320, 340, 340, DS.r.md), "paper", { t, w: "mid" });
    if (i === 0) friends(S, x, 470, 1.4, t); if (i === 1) lion(S, x, 490, 1.25, t); if (i === 2) beer(S, x - 16, 600, 1.0, t);
    txt(S, ["A FRIEND", "POWER", "BEER"][i], x, 730, { t, size: DS.type.small }); });
  DS.card(S, "THE BABYLONIAN DREAM", 960, 160, { size: DS.type.body, t: W(33, 6) });
  DS.vignette(S); }

// So Dave sets up the board and challenges the rulebook. / He loses the first game in eleven minutes.
{ const S = sc(34, 0, { cam: "push", focus: "980 560" }); const T = daveTable(S, DS.room(S, NIGHT), { mood: "determined", look: 6, tb: W(34, 5), tt: W(34, 8), pieces: [[1, 2, 0], [2, 7, 1], [1, 7, 1]] });
  T.F.face(W(35, 1), "sad", 6);
  DS.card(S, "DAVE VS THE RULEBOOK", 980, 110, { size: DS.type.small, t: W(34, 7) });
  DS.card(S, "LOST IN 11 MINUTES", 940, 300, { size: DS.type.small, t: W(35, 1), tc: "red" });
  DS.vignette(S); }

// Rulebook one, Dave zero. The rulebook is a lump of clay.
{ const S = sc(36, 0, { cam: "push", focus: "960 520" }); DS.room(S, { wall: "wall", floor: "wood", window: false });
  scoreboard(S, 700, 500, 2, 0, 0, { to: [W(36, 1), 1] });
  DS.shadow(S, 1420, 900, 360); easel(S, 1420, 420, 900); tablet(S, 1420, 520, 320, 400, {});
  DS.card(S, "A LUMP OF CLAY", 1420, 170, { size: DS.type.body, t: W(36, 8) });
  DS.vignette(S); }

// Egypt had its own favourite, senet. In the Book of the Dead,
const SAND = { wall: "sand", floor: "earth", window: false };
const tomb = (S, R) => { DS.shape(S, rect(360, 120, 1200, 40), "gold", { layer: "mid", flat: true, w: "detail" }); for (let i = 0; i < 12; i++) DS.shape(S, i % 3 ? circ(420 + i * 100, 140, 12) : rect(410 + i * 100, 128, 20, 24), i % 2 ? "blue" : "red", { layer: "mid", flat: true, w: "hair" }); return R; };
{ const S = sc(37, 0, { cam: "push", focus: "960 540" }); tomb(S, DS.room(S, SAND));
  senet(S, 960, 540, 90, {});
  DS.card(S, "SENET · EGYPT", 960, 270, { size: DS.type.body, t: W(37, 5) });
  DS.card(S, "THE BOOK OF THE DEAD", 960, 830, { size: DS.type.small, t: W(37, 8) });
  DS.vignette(S); }

// the dead play senet against an invisible opponent. Dave knows the feeling.
{ const S = sc(38, 0, { cam: "push", focus: "800 600" }); tomb(S, DS.room(S, SAND));
  const F = seated(S, 520, 760, { who: who, hair: "short", hairC: DS.c("ink"), outfitC: DS.c("white"), mood: "determined", look: 6, pose: "reach" });
  DS.shape(S, rect(380, 770, 280, 30), "wood", { w: "mid" }); DS.shape(S, rect(400, 800, 30, 160), "wood", { w: "mid" }); DS.shape(S, rect(610, 800, 30, 160), "wood", { w: "mid" });
  DS.shadow(S, 840, 960, 340); DS.shape(S, rect(690, 700, 300, 26), "wood", { w: "mid" }); DS.shape(S, rect(820, 726, 40, 234), "wood", { w: "mid" });
  senet(S, 840, 676, 26, {});
  DS.shape(S, rect(1000, 770, 260, 30), "wood", { w: "mid" }); DS.shape(S, rect(1020, 800, 30, 160), "wood", { w: "mid" }); DS.shape(S, rect(1210, 800, 30, 160), "wood", { w: "mid" });
  S.text("?", 1130, 640, { size: DS.type.display, t: W(38, 6), c: DS.c("brown", 1) });
  DS.card(S, "AN INVISIBLE OPPONENT", 960, 280, { size: DS.type.body, t: W(38, 5) });
  dave(S, 1580, 960, "near", { mood: "sad", look: -6, pose: "shrug", t: W(38, 8) });
  DS.vignette(S); }

// The Game of Ur held on longest in Kochi, in southern India,
{ const S = sc(39, 0, { cam: "zoom", focus: "900 760" }); DS.room(S, { wall: "paper", floor: "wood", window: false });
  mapCard(S, 460, 100, 1000, 820);
  land(S, 520, 130, 880, 770, [[0.32, 0], [0.42, 0.06], [0.4, 0.16], [0.5, 0.22], [0.62, 0.26], [0.74, 0.28], [0.86, 0.26], [0.98, 0.24], [0.96, 0.34], [0.86, 0.36], [0.8, 0.42], [0.72, 0.46], [0.64, 0.56], [0.58, 0.66], [0.52, 0.78], [0.46, 0.92], [0.42, 0.98], [0.38, 0.92], [0.34, 0.8], [0.3, 0.66], [0.27, 0.56], [0.2, 0.52], [0.1, 0.48], [0.04, 0.42], [0.12, 0.36], [0.2, 0.3], [0.24, 0.2], [0.28, 0.1]]);
  pin(S, 520 + 0.39 * 880, 130 + 0.9 * 770, W(39, 8));
  DS.card(S, "KOCHI, SOUTHERN INDIA", 1160, 840, { size: DS.type.small, t: W(39, 8) });
  DS.card(S, "THE GAME OF UR", 960, 160, { size: DS.type.small, t: W(39, 1) });
  DS.vignette(S); }

// where a Jewish community kept playing it, with cowrie shells for dice, until the nineteen fifties.
{ const S = sc(40, 0, { cam: "push", focus: "960 600" }); DS.room(S, { wall: "wall", floor: "wood", window: [1300, 160, 220, 220] });
  seated(S, 560, 700, { who: (S, x, gy, l, o) => person(S, x, gy, l, 1, o), mood: "smile", look: 6 });
  seated(S, 1360, 700, { who: (S, x, gy, l, o) => person(S, x, gy, l, 3, o), mood: "determined", look: -6 });
  DS.shadow(S, 960, 960, 1000); DS.shape(S, `M420 670 H1500 L1540 740 H380 Z`, "wood"); DS.shape(S, rect(380, 740, 1160, 34), "wood", { flat: true, tone: 2, w: "mid" }); [420, 1480].forEach((x) => DS.shape(S, rect(x, 774, 30, 186), "wood", { w: "mid" }));
  urBoard(S, 960, 704, 40, { squash: 0.45 });
  [[760, 720], [800, 730], [840, 716], [1080, 728], [1130, 718]].forEach(([x, y], i) => cowrie(S, x, y, 0.7, W(40, 8) + i * 0.06));
  DS.card(S, "COWRIE SHELLS FOR DICE", 960, 140, { size: DS.type.small, t: W(40, 8) });
  DS.card(S, "UNTIL THE 1950s", 960, 400, { size: DS.type.body, t: W(40, 14), tc: "red" });
  DS.vignette(S); }

// ===================== 2. Blame the dice =====================
// Dave has a new theory. He didn't lose. The dice did. // Bad news for Dave. Dice are even older than the game.
{ const S = sc(41, 0, { cam: "push", focus: "760 560" }); const T = daveTable(S, DS.room(S, NIGHT), { mood: "angry", look: 6, armR: [[56, 34], [118, 70]] });
  [[590, 716], [640, 728], [690, 712]].forEach(([x, y]) => tetra(S, x, y, 0.5, S.start));
  DS.card(S, "NEW THEORY", 960, 110, { size: DS.type.small, t: W(41, 3) });
  say(S, 990, 300, 230, 70, 640, 400, ["THE DICE DID."], W(41, 8));
  T.F.face(W(42, 1), "worried", 6);
  DS.card(S, "DICE ARE OLDER THAN THE GAME", 940, 470, { size: DS.type.caption, t: W(42, 4), tc: "red" });
  DS.vignette(S); }

// Across the ancient world, people threw knucklebones, the ankle bones of sheep and goats. / Each one lands on one of four sides.
{ const S = sc(43, 0, { cam: "push", focus: "900 560" }); DS.outdoor(S, { hy: 620, sky: "sky", hills: "grass", ground: "grass", sun: [1700, 150] });
  sheep(S, 360, 800, 0.95, S.start); goat(S, 780, 800, 0.95, S.start);
  KB(S, 1340, 430, 2.4, { t: W(43, 6) });
  arrow(S, 840, 700, 1130, 470, W(43, 8), { bend: -0.2 });
  DS.card(S, "KNUCKLEBONES", 1340, 180, { size: DS.type.body, t: W(43, 6) });
  DS.card(S, "ANKLE BONES", 560, 470, { size: DS.type.small, t: W(43, 8) });
  [1, 3, 4, 6].forEach((v, i) => { const x = 1100 + i * 160, t = W(44, 6) + i * 0.08; KB(S, x, 780, 0.8, { t, rot: [0, 90, 180, 270][i] }); kbVal(S, x, 880, v, t); });
  DS.vignette(S); }

// The Romans named the throws. The best, with every side different, was the Venus. / The worst, four ones, was called the dog.
{ const S = sc(45, 0, { cam: "push", focus: "960 560" }); DS.room(S, PAPER_RM);
  const v1 = S.grp(), v2 = S.grp();
  [1, 3, 4, 6].forEach((v, i) => { const x = 420 + i * 360; DS.shadow(S, x, 600, 260); KB(S, x, 520, 2.0, { t: S.start });
    kbVal(S, x, 700, v, W(45, 9), "ink", v1); kbVal(S, x, 700, 1, W(46, 3), "red", v2); });
  S.fadeOut(v1, W(46, 3) - 0.05, 0.2);
  const C1 = DS.card(S, "THE BEST: VENUS", 960, 170, { size: DS.type.title, t: W(45, 13), tc: "gold" }); S.fadeOut(C1.g, W(46, 0), 0.25);
  DS.card(S, "THE WORST: THE DOG", 960, 170, { size: DS.type.title, t: W(46, 6), tc: "red" });
  dog(S, 960, 900, 0.8, W(46, 6));
  DS.vignette(S); }

// Dave throws four knucklebones and gets the dog, three times in a row.
{ const S = sc(47, 0, { cam: "push", focus: "760 560" }); const T = daveTable(S, DS.room(S, NIGHT), { mood: "flat", look: 6, items: ["kb"] });
  [820, 980, 1140].forEach((x, i) => dog(S, x, 470, 0.5, W(47, 8) + i * 0.25));
  T.F.face(W(47, 6), "sad", 6);
  DS.card(S, "THE DOG, 3 TIMES", 980, 110, { size: DS.type.small, t: W(47, 8), tc: "red" });
  DS.vignette(S); }

// Roman children played games with nuts, so growing up was called leaving the nuts behind.
const ROMAN = { hy: 640, sky: "sky", hills: "grass", ground: "sand", sun: [1650, 160] };
const colonnade = (S) => [300, 620, 1300, 1620].forEach((x) => { DS.shape(S, rect(x - 30, 330, 60, 310), "white", { layer: "mid", dir: "h" }); DS.shape(S, rect(x - 44, 306, 88, 28), "white", { layer: "mid", flat: true, tone: 2 }); });
{ const S = sc(48, 0, { cam: "push", focus: "960 700" }); DS.outdoor(S, ROMAN); colonnade(S);
  person(S, 640, 920, "near", 4, { s: 0.75, mood: "happy", look: 6, pose: "reach", outfitC: DS.c("white") });
  person(S, 1280, 920, "near", 1, { s: 0.75, mood: "determined", look: -6, outfitC: DS.c("white") });
  nuts(S, 960, 920, 1.3, S.start);
  DS.card(S, "ROMAN CHILDREN", 960, 150, { size: DS.type.body, t: W(48, 1) });
  DS.card(S, "\"LEAVING THE NUTS BEHIND\"", 960, 300, { size: DS.type.small, t: W(48, 11) });
  DS.vignette(S); }

// The grown-ups did not leave the dice behind. // The emperor Claudius wrote a whole book about dice,
const claudius = (S, x, gy, o = {}) => { const F = who(S, x, gy, "near", Object.assign({ s: 1.1, hair: "short", hairC: DS.c("gray", 1), outfitC: DS.c("white"), mood: "smile", look: -6 }, o)); acc(S, F, "sash", o.t); acc(S, F, "laurel", o.t); return F; };
{ const S = sc(49, 0, { cam: "push", focus: "800 600" }); DS.outdoor(S, ROMAN); colonnade(S);
  const A = person(S, 330, 960, "near", 0, { mood: "happy", look: 6, outfitC: DS.c("white"), pose: "reach" }); acc(S, A, "sash");
  person(S, 760, 960, "near", 3, { mood: "worried", look: -6, outfitC: DS.c("white") });
  table(S, 420, 680, 760, 790, 960);
  [[500, 770], [560, 780], [610, 766]].forEach(([x, y]) => cube(S, x, y, 0.4, S.start));
  DS.card(S, "GROWN-UPS", 545, 330, { size: DS.type.body, t: W(49, 1) });
  const F = claudius(S, 1400, 960, { pose: "hold", t: W(50, 1) });
  const [hx, hy] = F.hand("R"); book(S, hx - 4, hy - 30, 200, 150, "red", "DICE", { t: W(50, 6) });
  DS.card(S, "EMPEROR CLAUDIUS", 1400, 330, { size: DS.type.small, t: W(50, 2) });
  DS.vignette(S); }

// and had a board fitted to his carriage so the road wouldn't spoil his game.
{ const S = sc(51, 0, { cam: "none" }); DS.outdoor(S, { hy: 600, sky: "sky", hills: "grass", ground: "grass", sun: [300, 150] });
  DS.shape(S, `M-200 760 H2120 V900 H-200 Z`, "sand", { flat: true, w: "mid" });
  const g = S.grp(), bob = S.grp(g);
  pony(S, 1240, 880, 0.9, { parent: g });
  S.draw(line([980, 740], [1180, 720], 0), S.start, 0, { c: DS.c("brown"), w: DS.w.mid, parent: g });
  const F = claudius(S, 760, 690, { sit: true, pose: "reach", look: 6, mood: "determined", s: 1.0, parent: bob });
  DS.shape(S, rrect(560, 640, 440, 160, DS.r.sm), "red", { parent: bob }); DS.shape(S, rect(560, 640, 440, 26), "gold", { parent: bob, flat: true, w: "detail" });
  DS.shape(S, rect(870, 560, 30, 90), "wood", { parent: bob, w: "detail" });
  DS.shape(S, `M800 540 L980 540 L1000 572 L780 572 Z`, "wood", { parent: bob, w: "detail" }); [0, 1, 2, 3].forEach((i) => cube(S, 830 + i * 44, 520, 0.22, S.start, bob));
  wheel(S, 640, 810, 90, S.start); wheel(S, 920, 810, 90, S.start);
  tl.fromTo(bob, { y: 0 }, { y: -10, duration: 0.18, ease: "sine.inOut", yoyo: true, repeat: Math.max(0, Math.floor(S.len / 0.18) - 1), immediateRender: false }, S.start);
  DS.card(S, "A BOARD IN HIS CARRIAGE", 960, 150, { size: DS.type.body, t: W(51, 3) });
  DS.vignette(S); }

// After he died, a Roman satire, probably by Seneca, chose his punishment in the underworld.
{ const S = sc(52, 0, { cam: "push", focus: "960 540" }); DS.room(S, WARM);
  table(S, 420, 1500, 700, 780, 960);
  scroll(S, 960, 500, 560, 330, { lines: 6 }); S.text("APOCOLOCYNTOSIS", 960, 400, { size: DS.type.caption, c: DS.c("brown", 2) });
  DS.card(S, "A ROMAN SATIRE", 960, 130, { size: DS.type.body, t: W(52, 4) });
  DS.card(S, "PROBABLY BY SENECA", 1460, 300, { size: DS.type.small, t: W(52, 6) });
  DS.card(S, "PUNISHMENT: ?", 960, 870, { size: DS.type.small, t: W(52, 9), tc: "red" });
  DS.vignette(S); }

// Shaking dice forever, in a box with no bottom.
{ const S = sc(53, 0, { cam: "push", focus: "900 560" }); DS.room(S, { wall: "navy", floor: "navy", window: false });
  const F = claudius(S, 760, 960, { pose: "armsUp", mood: "worried", look: 6 });
  const [hx, hy] = F.hand("R"); const bx = hx + 70, by = hy - 10, sh = S.grp();
  DS.shape(S, `M${bx - 60} ${by - 80} L${bx - 50} ${by + 80} L${bx + 50} ${by + 80} L${bx + 60} ${by - 80}`, "wood", { parent: sh, w: "mid" });
  DS.shape(S, circ(bx, by - 80, 60, 18), "wood", { parent: sh, w: "mid", tone: 2, flat: true });
  tl.fromTo(sh, { rotation: -8 }, { rotation: 8, svgOrigin: `${bx} ${by}`, duration: 0.2, yoyo: true, repeat: Math.max(0, Math.floor(S.len / 0.2) - 1), ease: "sine.inOut", immediateRender: false }, S.start);
  [0, 0.45, 0.9].forEach((d, i) => { const g = S.grp(); cube(S, bx - 20 + i * 20, by + 60, 0.4, S.start, g); tl.fromTo(g, { y: 0, opacity: 1 }, { y: 860 - by, opacity: 0.2, duration: 1.0, ease: "power2.in", repeat: Math.ceil(S.len) + 1, immediateRender: false }, S.start + d); });
  DS.card(S, "FOREVER", 1350, 200, { size: DS.type.title, t: W(53, 2), tc: "red" });
  DS.card(S, "NO BOTTOM", 1350, 360, { size: DS.type.small, t: W(53, 7) });
  DS.vignette(S, 0.2); }

// And here's where it gets stranger. / Until recently, the oldest dice we knew of were about five and a half thousand years old.
{ const S = sc(54, 0, { cam: "zoom", focus: "960 540" }); museum(S, DS.room(S, MUSE));
  DS.shadow(S, 960, 920, 480); DS.shape(S, rect(780, 680, 360, 240), "white", { dir: "h" });
  cube(S, 960, 560, 1.6, S.start);
  DS.shape(S, rrect(740, 400, 440, 280, DS.r.xs), "glass", { w: "detail", op: 0.22 });
  DS.card(S, "UNTIL RECENTLY", 960, 160, { size: DS.type.small, t: W(55, 1) });
  DS.card(S, "OLDEST KNOWN DICE", 960, 290, { size: DS.type.body, t: W(55, 3) });
  DS.card(S, "5,500 YEARS OLD", 1440, 560, { size: DS.type.small, t: W(55, 10), tc: "red" });
  DS.vignette(S); }

// Then, in twenty twenty-six, archaeologist Robert Madden identified hundreds of dice from Native American sites.
{ const S = sc(56, 0, { cam: "push", focus: "900 560" }); DS.room(S, LAB);
  table(S, 560, 1660, 680, 760, 960);
  const F = who(S, 380, 960, "near", { s: 1.1, hair: "curly", hairC: DS.c("brown"), outfitC: DS.c("white"), mood: "determined", look: 6, pose: "reach" });
  for (let r = 0; r < 3; r++) for (let c = 0; c < 14; c++) { const x = 720 + c * 56 + (r % 2) * 20, y = 694 + r * 20; S.fill(rrect(x - 20, y - 6, 40, 12, DS.r.xs), W(56, 8) + (r * 14 + c) * 0.01, 0, DS.c("paper", 2), 1); }
  DS.card(S, "2026 · ROBERT MADDEN", 960, 140, { size: DS.type.body, t: W(56, 5) });
  DS.card(S, "565 DICE, 57 SITES", 1160, 420, { size: DS.type.small, t: W(56, 8), tc: "red" });
  DS.vignette(S); }

// The oldest are two-sided pieces of bone from Wyoming, Colorado and New Mexico, / made around twelve thousand years ago.
{ const S = sc(57, 0, { cam: "push", focus: "900 520" }); DS.room(S, PAPER_RM);
  mapCard(S, 300, 110, 1320, 800, false);
  const X = (lon) => 960 - (lon - 104) * 50, Y = (lat) => 160 + (45 - lat) * 50;
  [["WYOMING", 104, 111, 45, 41, "earth", 8], ["COLORADO", 102, 109, 41, 37, "gold", 9], ["NEW MEXICO", 103, 109, 37, 31.3, "orange", 11]].forEach(([n, e, w, nn, ss, c, wi]) => {
    DS.shape(S, rect(X(w), Y(nn), X(e) - X(w), Y(ss) - Y(nn)), c, { flat: true, tone: 1, w: "mid" });
    pin(S, (X(e) + X(w)) / 2, (Y(nn) + Y(ss)) / 2 - 6, W(57, wi)); txt(S, n, (X(e) + X(w)) / 2, (Y(nn) + Y(ss)) / 2 + 50, { t: W(57, wi) }); });
  boneDie(S, 1360, 380, 2.0, W(57, 3), true); boneDie(S, 1360, 520, 2.0, W(57, 3), false);
  DS.card(S, "TWO-SIDED BONE", 1360, 240, { size: DS.type.small, t: W(57, 3) });
  DS.card(S, "AROUND 12,000 YEARS AGO", 1370, 790, { size: DS.type.small, t: W(58, 1), tc: "red" });
  DS.vignette(S); }

// Madden matched their shapes to Native American dice recorded more than a century ago.
{ const S = sc(59, 0, { cam: "push", focus: "960 520" }); DS.room(S, PAPER_RM);
  panel(S, 520, 520, 560, 520, S.start, "sand"); [0, 1, 2].forEach((i) => boneDie(S, 520, 400 + i * 120, 1.6, S.start, i !== 1));
  S.text("=", 960, 560, { size: DS.type.display, t: W(59, 1), c: DS.c("green", 2) });
  const B = book(S, 1400, 520, 520, 520, "white", "", { t: W(59, 7) }); [0, 1, 2].forEach((i) => boneDie(S, 1410, 400 + i * 120, 1.6, W(59, 7), i !== 1));
  txt(S, "ICE AGE BONE", 520, 850, { size: DS.type.small });
  txt(S, "DRAWN IN 1907", 1400, 850, { size: DS.type.small, t: W(59, 8) });
  DS.card(S, "MATCHED", 960, 150, { size: DS.type.body, t: W(59, 1), tc: "green" });
  DS.vignette(S); }

// Archaeologist Jelmer Eerkens agrees they could be dice. He's just not convinced they were.
{ const S = sc(60, 0, { cam: "push", focus: "900 560" }); DS.room(S, LAB);
  const F = who(S, 640, 960, "near", { s: 1.1, hair: "short", hairC: DS.c("ink"), outfitC: DS.c("orange"), mood: "smile", look: 6, pose: "think" });
  DS.card(S, "JELMER EERKENS", 640, 400, { size: DS.type.small, t: W(60, 1) });
  const b1 = say(S, 1200, 330, 300, 90, 760, 560, ["COULD BE DICE."], W(60, 4)); S.fadeOut(b1, W(60, 8) - 0.05, 0.2);
  say(S, 1200, 330, 300, 90, 760, 560, ["NOT CONVINCED."], W(60, 8), { c: "red" });
  F.face(W(60, 8), "flat", 6); F.setPose(W(60, 8), "cross");
  DS.shadow(S, 1300, 880, 400); DS.shape(S, rect(1120, 760, 360, 120), "wood", { w: "mid" }); [0, 1].forEach((i) => boneDie(S, 1230 + i * 140, 740, 0.9, S.start, i === 0));
  DS.vignette(S); }

// If Madden is right, Ice Age hunters had dice / about two thousand years before anyone in the Americas grew a crop.
{ const S = sc(61, 0, { cam: "push", focus: "960 640" }); DS.outdoor(S, { hy: 620, sky: "glass", hills: "white", ground: "white", sun: [1600, 180] });
  ancient(S, 600, 880, "near", 1, Object.assign({ sit: true, mood: "happy", look: 6, pose: "reach" }, GR));
  ancient(S, 1320, 880, "near", 2, Object.assign({ sit: true, mood: "worried", look: -6, pose: "reachL" }, GL));
  DS.shape(S, smooth([[820, 900], [900, 860], [1040, 868], [1120, 900], [1040, 940], [880, 936], [820, 900]]) + " Z", "wood", { w: "mid" });
  [[910, 896], [990, 908], [1060, 892]].forEach(([x, y], i) => boneDie(S, x, y, 0.45, S.start, i !== 1));
  S.draw(line([1560, 900], [1620, 420], 0), S.start, 0, { c: DS.c("wood", 2), w: DS.w.near }); DS.shape(S, `M1606 440 L1630 370 L1640 444 Z`, "gray", { w: "detail" });
  DS.card(S, "IF MADDEN IS RIGHT", 960, 140, { size: DS.type.small, t: W(61, 0) });
  DS.card(S, "2,000 YEARS BEFORE ANY CROP", 960, 290, { size: DS.type.body, t: W(62, 1), tc: "red" });
  DS.vignette(S); }

// They didn't have farms yet. They did have dice.
{ const S = sc(63, 0, { cam: "none" }); DS.outdoor(S, { hy: 640, sky: "sky", hills: "grass", ground: "grass", sun: false });
  [380, 470, 560, 650].forEach((x, i) => wheat(S, x, 820 + (i % 2) * 20, 1.0, S.start));
  DS.shape(S, `M200 840 L200 640 L270 580 L340 640 L340 840 Z`, "red", { w: "mid" });
  xMark(S, 460, 680, 150, W(63, 3));
  S.fill(rect(954, -20, 12, 1120), S.start, 0, DS.c("ink"), 1);
  [[1300, 640, true], [1470, 700, false], [1380, 780, true]].forEach(([x, y, m]) => boneDie(S, x, y, 1.4, W(63, 5), m));
  tickMark(S, 1640, 520, 60, W(63, 8));
  DS.card(S, "NO FARMS", 470, 160, { size: DS.type.title, t: W(63, 1), tc: "red" });
  DS.card(S, "DICE", 1440, 160, { size: DS.type.title, t: W(63, 7), tc: "green" });
  DS.vignette(S); }

// ===================== 3. Older than farming =====================
// Dave, now three games down, has a new line of defence. / "Fine, they had games. But nobody had music."
{ const S = sc(64, 0, { cam: "push", focus: "760 520" }); const T = daveTable(S, DS.room(S, NIGHT), { mood: "flat", look: 6, items: ["kb"], score: [1, 0], scoreO: { to: [W(64, 2), 3] } });
  DS.card(S, "3 GAMES DOWN", 310, 320, { size: DS.type.small, t: W(64, 2), tc: "red" });
  T.F.face(W(65, 0), "determined", 6); T.F.setPose(W(65, 4), "point");
  say(S, 980, 460, 230, 110, 640, 560, ["NOBODY", "HAD MUSIC."], W(65, 4));
  DS.vignette(S); }

// In two thousand eight, a team led by Nicholas Conard dug into Hohle Fels, a cave in southern Germany.
{ const S = sc(66, 0, { cam: "pull" }); DS.outdoor(S, { hy: 640, sky: "sky", hills: "grass", ground: "grass", sun: [300, 170] });
  DS.shape(S, `M900 860 L960 520 L1080 380 L1300 330 L1560 360 L1760 460 L1880 620 L1900 860 Z`, "gray", { layer: "mid", w: "mid" });
  DS.shape(S, `M1220 860 Q1220 600 1380 590 Q1540 600 1540 860 Z`, "ink", { layer: "mid", w: "mid", flat: true, tone: 1 });
  person(S, 1040, 860, "mid", 2, { mood: "happy", look: 6, pose: "point", outfitC: DS.c("orange", 0, "mid") });
  person(S, 1700, 860, "mid", 5, { mood: "determined", look: -6, outfitC: DS.c("green", 0, "mid") });
  DS.card(S, "2008", 420, 380, { size: DS.type.body, t: W(66, 1) });
  DS.card(S, "NICHOLAS CONARD'S TEAM", 560, 520, { size: DS.type.small, t: W(66, 8) });
  DS.card(S, "HOHLE FELS, SOUTHERN GERMANY", 1180, 160, { size: DS.type.small, t: W(66, 12) });
  DS.vignette(S); }

// They found a flute, made from the wing bone of a griffon vulture, / with five finger holes and a notch to blow across.
{ const S = sc(67, 0, { cam: "push", focus: "900 640" }); DS.room(S, { wall: "wall", floor: "wood", window: false });
  vulture(S, 1560, 560, 0.95, W(67, 11));
  const Fl = flute(S, 260, 720, 1000, { t: W(67, 3) });
  DS.card(S, "VULTURE WING BONE", 1500, 140, { size: DS.type.small, t: W(67, 7) });
  ring(S, (Fl.holes[0][0] + Fl.holes[4][0]) / 2, Fl.holes[0][1], 250, 56, W(68, 1));
  DS.card(S, "5 FINGER HOLES", 940, 870, { size: DS.type.small, t: W(68, 1) });
  arrow(S, Fl.notch[0] + 60, 520, Fl.notch[0] + 6, Fl.notch[1] - 16, W(68, 6), { bend: 0.15 });
  DS.card(S, "A NOTCH TO BLOW", 470, 460, { size: DS.type.small, t: W(68, 6) });
  DS.vignette(S); }

// It is at least thirty-five thousand years old, and probably closer to forty.
{ const S = sc(69, 0, { cam: "zoom", focus: "960 560" }); museum(S, DS.room(S, MUSE));
  DS.shadow(S, 960, 920, 760); DS.shape(S, rect(620, 690, 680, 230), "white", { dir: "h" });
  flute(S, 680, 600, 560, {});
  DS.shape(S, rrect(600, 470, 720, 220, DS.r.xs), "glass", { w: "detail", op: 0.22 });
  DS.card(S, "AT LEAST 35,000 YEARS", 960, 170, { size: DS.type.body, t: W(69, 4), tc: "red" });
  DS.card(S, "PROBABLY CLOSER TO 40,000", 960, 320, { size: DS.type.small, t: W(69, 9) });
  DS.vignette(S); }

// Older than farming, older than writing, older than the wheel.
{ const S = sc(70, 0, { cam: "push", focus: "960 520" }); DS.room(S, PAPER_RM);
  flute(S, 180, 520, 420, {}); txt(S, "THE FLUTE", 390, 640, { size: DS.type.small });
  arrow(S, 660, 520, 980, 520, S.start, { c: "ink" });
  [[1100, W(70, 2), "FARMING"], [1400, W(70, 5), "WRITING"], [1700, W(70, 9), "THE WHEEL"]].forEach(([x, t, n], i) => {
    if (i === 0) wheat(S, x, 600, 1.2, t); if (i === 1) tablet(S, x, 500, 170, 200, { t }); if (i === 2) wheel(S, x, 500, 100, t);
    txt(S, n, x, 700, { t }); });
  DS.card(S, "OLDER THAN", 960, 160, { size: DS.type.title, t: W(70, 0) });
  DS.vignette(S); }

// That's at least fifteen thousand years older than the oldest known cooking pots.
{ const S = sc(71, 0, { cam: "push", focus: "960 520" }); DS.room(S, PAPER_RM);
  flute(S, 220, 560, 460, {}); txt(S, "FLUTE: 35,000+ YEARS", 450, 700, { size: DS.type.small });
  pot(S, 1440, 640, 1.2, W(71, 9)); txt(S, "POTS: 20,000 YEARS", 1440, 760, { size: DS.type.small, t: W(71, 9) });
  S.draw(`M450 460 V420 H1440 V460`, W(71, 3), 0, { c: DS.c("red"), w: DS.w.near });
  DS.card(S, "15,000 YEARS", 945, 330, { size: DS.type.title, t: W(71, 3), tc: "red" });
  DS.card(S, "OLDEST KNOWN COOKING POTS", 1240, 140, { size: DS.type.small, t: W(71, 9) });
  DS.vignette(S); }

// People had music before they had a pot to cook in. Priorities.
const note = (S, x, y, t, g) => { S.fill(circ(x, y, 16, 12), t, 0, DS.c("ink"), 1, g); S.draw(line([x + 14, y], [x + 14, y - 64], 0) + `M${x + 14} ${y - 64} Q${x + 40} ${y - 50} ${x + 34} ${y - 26}`, t, 0, { c: DS.c("ink"), w: DS.w.mid, parent: g }); };
{ const S = sc(72, 0, { cam: "push", focus: "900 600" }); cave(S, DS.room(S, CAVE));
  const F = ancient(S, 640, 880, "near", 0, Object.assign({ s: 1.2, sit: true, mood: "happy", look: 6, armL: [[24, 20], [60, -26]], armR: [[40, 10], [90, -40]] }, GR));
  const [mx, my] = F.hd; S.draw(line([mx + 44, my + 30], [mx + 230, my + 130], 0), S.start, 0, { c: DS.c("sand", 2), w: DS.w.near * 1.4 });
  [[980, 520], [1060, 440], [1150, 500]].forEach(([x, y], i) => { const g = S.grp(); note(S, x, y, S.start + i * 0.4, g); tl.fromTo(g, { y: 0 }, { y: -30, duration: 0.8, yoyo: true, repeat: Math.max(0, Math.floor(S.len / 0.8) - 1), ease: "sine.inOut", immediateRender: false }, S.start + i * 0.3); });
  S.flame(1360, 870, 1.0, S.start, 0);
  pot(S, 1600, 880, 0.8, W(72, 7), true); S.text("?", 1600, 790, { size: DS.type.title, t: W(72, 7), c: DS.c("yellow") });
  DS.card(S, "PRIORITIES.", 960, 170, { size: DS.type.title, t: W(72, 11) });
  DS.vignette(S, 0.18); }

// And when the wheel did arrive, people put it on toys. / At Mohenjo-daro, in today's Pakistan, more than four thousand years ago,
{ const S = sc(73, 0, { cam: "push", focus: "960 540" }); DS.room(S, PAPER_RM);
  wheel(S, 420, 360, 110, W(73, 3));
  arrow(S, 420, 500, 420, 640, W(73, 9), { c: "ink" });
  clayCart(S, 440, 880, 1.0, { t: W(73, 10) });
  DS.card(S, "TOYS", 640, 760, { size: DS.type.body, t: W(73, 10) });
  mapCard(S, 900, 120, 760, 760, false);
  DS.shape(S, smooth([[900, 760], [1100, 720], [1300, 780], [1500, 740], [1660, 760], [1660, 880], [900, 880]]) + " Z", "sky", { flat: true, tone: 1, w: "detail" });
  S.draw(smooth([[1420, 140], [1360, 300], [1300, 460], [1210, 600], [1150, 740]]), S.start, 0, { c: DS.c("blue"), w: DS.w.near });
  pin(S, 1240, 600, W(74, 1));
  DS.card(S, "MOHENJO-DARO, PAKISTAN", 1280, 230, { size: DS.type.small, t: W(74, 1) });
  DS.card(S, "4,000+ YEARS AGO", 1280, 820, { size: DS.type.small, t: W(74, 7), tc: "red" });
  DS.vignette(S); }

// people made little clay carts with wheels, and clay animals whose heads could move.
{ const S = sc(75, 0, { cam: "push", focus: "960 640" }); DS.room(S, WARM);
  clayCart(S, 380, 900, 1.4, { roll: [W(75, 3), 2.0, 260] });
  clayBull(S, 1380, 900, 1.3, { nod: [W(75, 9), S.end] });
  DS.card(S, "CLAY CARTS", 640, 300, { size: DS.type.body, t: W(75, 3) });
  DS.card(S, "HEADS THAT MOVE", 1300, 300, { size: DS.type.body, t: W(75, 10) });
  DS.vignette(S); }

// ===================== 4. The oldest joke =====================
// Dave has exactly one theory left. / "Fine, but ancient people definitely weren't funny."
{ const S = sc(76, 0, { cam: "push", focus: "760 520" }); const T = daveTable(S, DS.room(S, NIGHT), { mood: "determined", look: 6, items: ["kb", "flute", "cart"], pose: "wave" });
  DS.card(S, "1 THEORY LEFT", 960, 130, { size: DS.type.small, t: W(76, 3) });
  say(S, 990, 440, 290, 100, 650, 560, ["ANCIENT PEOPLE", "WEREN'T FUNNY."], W(77, 2));
  DS.vignette(S); }

// In two thousand eight, Paul McDonald at the University of Wolverhampton / went looking for the oldest recorded joke.
const shelf = (S, x, y, w, h, layer = "mid") => { DS.shape(S, rect(x, y, w, h), "wood", { layer, w: "mid" }); const n = 3, rh = (h - 20) / n;
  for (let r = 0; r < n; r++) { let bx = x + 16; for (let i = 0; bx < x + w - 40; i++) { const bw = 22 + ((i * 7 + r * 3) % 4) * 6, bh = rh - 18 - ((i * 5 + r) % 3) * 10; DS.shape(S, rect(bx, y + 10 + (r + 1) * rh - bh, bw, bh), OC[(i + r * 2) % 9], { layer, flat: true, w: "hair" }); bx += bw + 4; }
    DS.shape(S, rect(x, y + 10 + (r + 1) * rh, w, 10), "wood", { layer, flat: true, tone: 2, w: "hair" }); } };
{ const S = sc(78, 0, { cam: "push", focus: "900 560" }); DS.room(S, WARM);
  shelf(S, 380, 140, 520, 600); shelf(S, 1020, 140, 520, 600);
  const F = who(S, 620, 960, "near", { s: 1.1, hair: "side", hairC: DS.c("gray", 2), outfitC: DS.c("purple"), mood: "determined", look: 6, pose: "reach" });
  const [hx, hy] = F.hand("R"); S.draw(circ(hx + 56, hy - 10, 48), S.start, 0, { c: DS.c("ink"), w: DS.w.near }); S.fill(circ(hx + 56, hy - 10, 44), S.start, 0, DS.c("glass", 1), 0.5);
  table(S, 820, 1640, 720, 790, 960);
  [[980, 690, 130, 100], [1130, 676, 110, 130], [1270, 700, 140, 90]].forEach(([x, y, w, h]) => tablet(S, x, y, w, h, {})); book(S, 1440, 690, 150, 110, "green", "");
  DS.card(S, "2008 · PAUL McDONALD", 620, 330, { size: DS.type.small, t: W(78, 4) });
  DS.card(S, "UNIVERSITY OF WOLVERHAMPTON", 1180, 110, { size: DS.type.small, t: W(78, 8) });
  DS.card(S, "OLDEST RECORDED JOKE?", 1240, 460, { size: DS.type.small, t: W(79, 4), tc: "red" });
  DS.vignette(S); }

// The winner is a Sumerian saying, at least three thousand nine hundred years old.
{ const S = sc(80, 0, { cam: "zoom", focus: "960 520" }); museum(S, DS.room(S, MUSE));
  DS.shadow(S, 960, 900, 600); tablet(S, 960, 520, 520, 420, { broken: true });
  DS.card(S, "SUMERIAN", 960, 160, { size: DS.type.body, t: W(80, 4) });
  DS.card(S, "AT LEAST 3,900 YEARS OLD", 960, 860, { size: DS.type.body, t: W(80, 6), tc: "red" });
  DS.vignette(S); }

// "Something which has never occurred since time immemorial: / a young woman did not fart in her husband's lap."
const puff = (S, x, y, k, t) => { const g = S.grp(); [[0, 0, 40], [44, -20, 32], [30, 30, 30], [80, 10, 26]].forEach(([dx, dy, r]) => DS.shape(S, circ(x + dx * k, y + dy * k, r * k), "glass", { t, parent: g, w: "detail", flat: true, tone: 2 })); [0, 1, 2].forEach((i) => S.draw(smooth([[x - 60 * k, y - 30 * k + i * 30 * k], [x - 90 * k, y - 40 * k + i * 30 * k], [x - 120 * k, y - 30 * k + i * 30 * k]]), t, 0, { c: DS.c("gray", 2), w: DS.w.detail, parent: g })); return g; };
{ const S = sc(81, 0, { cam: "push", focus: "960 600" }); DS.room(S, { wall: "sand", floor: "earth", window: false });
  const H = seated(S, 760, 760, { who, hair: "short", hairC: DS.c("ink"), outfitC: DS.c("white"), mood: "flat", look: 6 });
  const Wf = seated(S, 1120, 760, { who, hair: "bun", hairC: DS.c("ink"), outfitC: DS.c("pink"), mood: "smile", look: -6 });
  DS.shadow(S, 940, 960, 760); DS.shape(S, rrect(560, 760, 760, 40, DS.r.xs), "wood"); [600, 1260].forEach((x) => DS.shape(S, rect(x, 800, 30, 160), "wood", { w: "mid" }));
  DS.card(S, "NEVER HAPPENED:", 960, 150, { size: DS.type.title, t: W(81, 3) });
  puff(S, 1290, 700, 1.0, W(82, 5)); S.text("PFFT!", 1460, 600, { size: DS.type.body, t: W(82, 5), c: DS.c("green", 2) });
  H.face(W(82, 6), "wow", 6); Wf.face(W(82, 6), "happy", -6);
  DS.vignette(S); }

// The oldest joke in the world is a fart joke.
{ const S = sc(83, 0, { cam: "push", focus: "960 500" }); museum(S, DS.room(S, MUSE));
  DS.shadow(S, 960, 920, 520); DS.shape(S, rect(760, 700, 400, 220), "white", { dir: "h" });
  tablet(S, 960, 520, 360, 320, { broken: true });
  S.draw(`M1060 560 L1100 760 M1140 560 L1100 760`, S.start, 0, { c: DS.c("red"), w: DS.w.near * 1.6 }); DS.shape(S, circ(1100, 780, 60), "gold", { w: "mid" }); txt(S, "No.1", 1100, 796, { size: DS.type.caption });
  DS.card(S, "THE OLDEST JOKE", 960, 160, { size: DS.type.body, t: W(83, 1) });
  DS.card(S, "A FART JOKE", 1480, 420, { size: DS.type.body, t: W(83, 8), tc: "red" });
  DS.vignette(S); }

// And the study was paid for by a British television channel called Dave. / Dave would like it known that this is a coincidence.
{ const S = sc(84, 0, { cam: "push", focus: "960 560" }); DS.room(S, NIGHT);
  DS.shadow(S, 700, 900, 640); DS.shape(S, rect(460, 740, 480, 160), "wood", { w: "mid" });
  const V = tv(S, 700, 560, 560, 360, {}); S.text("DAVE", V.scr[0], V.scr[1] + 38, { size: DS.type.display, t: W(84, 12), c: DS.P.white[0] });
  DS.card(S, "PAID FOR BY A TV CHANNEL", 760, 150, { size: DS.type.small, t: W(84, 4) });
  const F = dave(S, 1420, 960, "near", { mood: "worried", look: -6, pose: "shrug", t: W(85, 0) });
  DS.card(S, "A COINCIDENCE", 1420, 400, { size: DS.type.body, t: W(85, 9), tc: "red" });
  DS.vignette(S); }

// About sixteen hundred years ago, someone collected a whole joke book in Greek, / called the Philogelos, the Laughter Lover.
{ const S = sc(86, 0, { cam: "push", focus: "960 520" }); museum(S, DS.room(S, { wall: "white", floor: "gray", window: false }), { cols: [380, 1540] });
  DS.shadow(S, 960, 940, 300); DS.shape(S, rect(930, 660, 60, 280), "wood", { w: "mid" }); DS.shape(S, `M720 560 L1200 560 L1240 660 L680 660 Z`, "wood");
  scroll(S, 960, 480, 520, 240, { lines: 0 }); S.text("PHILOGELOS", 960, 476, { size: DS.type.small, c: DS.c("brown", 2) });
  [510, 540].forEach((y) => S.draw(line([780, y], [1140, y], 0), S.start, 0, { c: DS.c("gray", 2), w: DS.w.detail }));
  DS.card(S, "ABOUT 1,600 YEARS AGO", 960, 140, { size: DS.type.small, t: W(86, 1) });
  DS.card(S, "A JOKE BOOK IN GREEK", 960, 260, { size: DS.type.small, t: W(86, 8) });
  DS.card(S, "THE LAUGHTER LOVER", 960, 820, { size: DS.type.body, t: W(87, 3), tc: "gold" });
  DS.vignette(S); }

// One goes: a chatty barber asks, "How shall I cut your hair?" The customer says, "In silence."
const scissors = (S, x, y, t, g) => { [[-14, 18], [14, 18]].forEach(([dx, dy]) => S.draw(circ(x + dx, y + dy, 12), t ?? S.start, 0, { c: DS.c("ink"), w: DS.w.mid, parent: g })); S.draw(line([x - 8, y + 8], [x + 30, y - 50], 0) + line([x + 8, y + 8], [x - 10, y - 52], 0), t ?? S.start, 0, { c: DS.c("gray", 2), w: DS.w.mid, parent: g }); };
{ const S = sc(88, 0, { cam: "push", focus: "960 560" }); DS.room(S, WARM);
  DS.shape(S, rrect(840, 170, 300, 240, DS.r.lg), "glass", { layer: "mid", w: "mid" });
  const C = seated(S, 1040, 740, { who, hair: "messy", hairC: DS.c("brown"), outfitC: DS.c("green"), mood: "flat", look: -6 });
  DS.shadow(S, 1040, 960, 300); DS.shape(S, rrect(930, 740, 220, 36, DS.r.xs), "red"); DS.shape(S, rect(1025, 776, 30, 184), "gray", { w: "mid" });
  const B = who(S, 700, 960, "near", { s: 1.1, hair: "short", hairC: DS.c("ink"), outfit: "apron", outfitC: DS.c("sky"), mood: "happy", look: 6, pose: "reach" });
  const [hx, hy] = B.hand("R"); scissors(S, hx + 10, hy - 10, S.start);
  say(S, 480, 430, 300, 110, 660, 600, ["HOW SHALL I", "CUT YOUR HAIR?"], W(88, 6));
  say(S, 1420, 430, 240, 80, 1110, 530, ["IN SILENCE."], W(88, 15), { c: "red" });
  B.face(W(88, 15), "wow", 6);
  DS.vignette(S); }

// And in Pompeii, someone wrote a little poem on a wall, / complaining about all the boring writing on walls.
const POMPEII = { hy: 700, sky: "sky", hills: "grass", ground: "sand", sun: [1700, 150] };
{ const S = sc(89, 0, { cam: "push", focus: "900 520" }); DS.outdoor(S, POMPEII); vesuvius(S, 1500, 700, 900);
  const g = pWall(S, 220, 300, 1120, 540, { n: 0 });
  graffiti(S, 260, 640, 1000, 160, S.start, 8, g); graffiti(S, 260, 640, 1000, 160, W(90, 4), 8, g, 8);
  verse(S, 300, 400, DS.type.small, W(89, 4), g);
  const F = person(S, 1520, 960, "near", 2, { mood: "determined", look: -6, pose: "reachL", outfitC: DS.c("white") });
  DS.card(S, "POMPEII", 520, 150, { size: DS.type.body, t: W(89, 2) });
  DS.card(S, "A POEM ABOUT WALL WRITING", 1300, 150, { size: DS.type.small, t: W(90, 0) });
  DS.vignette(S); }

// "I am amazed, wall, that you have not collapsed, / holding up the tedious scribbles of so many writers."
{ const S = sc(91, 0, { cam: "zoom", focus: "900 500" }); DS.outdoor(S, POMPEII);
  const g = S.grp(); pWall(S, 140, 170, 1640, 700, { n: 0, parent: g });
  verse(S, 260, 280, DS.type.body, S.start, g);
  graffiti(S, 200, 640, 1500, 180, S.start, 10, g); graffiti(S, 1100, 230, 600, 360, W(92, 4), 10, g, 20);
  S.draw(smooth([[1400, 170], [1380, 300], [1430, 420], [1400, 560]]), W(91, 8), 0, { c: DS.c("brown", 2), w: DS.w.mid, parent: g });
  tl.fromTo(g, { rotation: 0 }, { rotation: 1.2, svgOrigin: "960 870", duration: 0.25, yoyo: true, repeat: 5, ease: "sine.inOut", immediateRender: false }, W(91, 8));
  DS.card(S, "\"I AM AMAZED, WALL...\"", 960, 110, { size: DS.type.small, t: W(91, 0) });
  DS.vignette(S); }

// The same verse turns up on several walls in Pompeii, and in Rome. / A complaint about wall writing, spread by wall writing.
const ITALY = [[0.1, 0.08], [0.28, 0.02], [0.45, 0.05], [0.58, 0.02], [0.62, 0.1], [0.55, 0.18], [0.52, 0.24], [0.6, 0.36], [0.72, 0.48], [0.82, 0.56], [0.97, 0.66], [0.94, 0.7], [0.84, 0.66], [0.78, 0.7], [0.76, 0.78], [0.8, 0.86], [0.74, 0.95], [0.66, 0.92], [0.66, 0.84], [0.6, 0.74], [0.52, 0.66], [0.44, 0.58], [0.34, 0.48], [0.26, 0.38], [0.2, 0.26], [0.1, 0.22], [0.04, 0.16]];
{ const S = sc(93, 0, { cam: "push", focus: "800 520" }); DS.room(S, PAPER_RM);
  mapCard(S, 300, 100, 800, 820);
  const IX = 380, IY = 130, IW = 640, IH = 740;
  land(S, IX, IY, IW, IH, ITALY); land(S, IX + 0.5 * IW, IY + 0.97 * IH, 0.22 * IW, 0.08 * IH, [[0, 0.2], [0.5, 0], [1, 0.3], [0.6, 1], [0.1, 0.8]]);
  [[0.55, 0.64], [0.58, 0.68], [0.53, 0.69]].forEach(([a, b], i) => pin(S, IX + a * IW, IY + b * IH, W(93, 6) + i * 0.12));
  pin(S, IX + 0.38 * IW, IY + 0.47 * IH, W(93, 12), "orange");
  DS.card(S, "SEVERAL WALLS IN POMPEII", 1440, 380, { size: DS.type.small, t: W(93, 6) });
  DS.card(S, "AND IN ROME", 1440, 500, { size: DS.type.small, t: W(93, 12), tc: "orange" });
  DS.card(S, "SPREAD BY WALL WRITING", 1440, 700, { size: DS.type.small, t: W(94, 5), tc: "red" });
  DS.vignette(S); }

// ===================== 5. Were they ever bored? =====================
// So that settles it. Ancient people were never bored, right?
{ const S = sc(95, 0, { cam: "push", focus: "800 520" }); const T = daveTable(S, DS.room(S, NIGHT), { mood: "happy", look: 6, items: ["kb", "flute", "cart", "joke"] });
  DS.card(S, "NEVER BORED?", 940, 300, { size: DS.type.body, t: W(95, 4) });
  tickMark(S, 1250, 290, 36, W(95, 7));
  DS.vignette(S); }

// Not quite. Look at that wall again. It's a complaint about boredom.
{ const S = sc(96, 0, { cam: "zoom", focus: "500 560" }); DS.outdoor(S, POMPEII);
  const g = S.grp(); pWall(S, 140, 170, 1640, 700, { n: 0, parent: g });
  const [tx, ty] = verse(S, 260, 280, DS.type.body, S.start, g);
  graffiti(S, 200, 640, 1500, 180, S.start, 10, g); graffiti(S, 1100, 230, 600, 360, S.start, 10, g, 20);
  ring(S, tx, ty, 130, 56, W(96, 9));
  DS.card(S, "NOT QUITE.", 960, 110, { size: DS.type.body, t: W(96, 0), tc: "red" });
  DS.card(S, "TAEDIA: BOREDOM", 900, 800, { size: DS.type.body, t: W(96, 9) });
  DS.vignette(S); }

// In the British Museum stands a thirty-ton stone bull with a human head and five legs, / from a gate of the Assyrian king Sargon the Second.
const LEGS = [-420, -330, -230, 250, 360];
{ const S = sc(97, 0, { cam: "pull" }); museum(S, DS.room(S, MUSE), { cols: [200, 1720] });
  const k = 0.88, L = lamassu(S, 960, 930, k, { board: false });
  DS.card(S, "30 TONS", 1640, 330, { size: DS.type.body, t: W(97, 6), tc: "red" });
  LEGS.forEach((dx, i) => { const t = W(97, 14) + i * 0.15; DS.shape(S, circ(960 + dx * k, 930 - 250 * k, 26), "white", { t, w: "detail" }); txt(S, String(i + 1), 960 + dx * k, 930 - 250 * k + 14, { t, size: DS.type.caption }); });
  DS.card(S, "5 LEGS", 250, 640, { size: DS.type.body, t: W(97, 14) });
  DS.card(S, "SARGON II'S GATE", 1320, 120, { size: DS.type.small, t: W(98, 7) });
  DS.vignette(S); }

// And on its base, bored guards scratched a board for the Game of Ur.
const guard = (S, x, gy, o = {}) => { const F = who(S, x, gy, "near", Object.assign({ s: 1.1, hair: "curly", hairC: DS.c("ink"), outfitC: DS.c("red"), mood: "tired" }, o)); acc(S, F, "cone", o.t); return F; };
{ const S = sc(99, 0, { cam: "push", focus: "960 700" }); museum(S, DS.room(S, MUSE), { cols: [] });
  [[420, 0], [700, 0], [1300, 10]].forEach(([x, lean]) => { DS.shape(S, `M${x - 56} -20 L${x + 56} -20 L${x + 50 + lean} 560 L${x - 50 + lean} 560 Z`, "sand", { w: "mid" }); DS.shape(S, rrect(x - 66 + lean, 540, 132, 60, DS.r.xs), "gray", { w: "detail", flat: true, tone: 2 }); });
  DS.shape(S, rect(160, 600, 1600, 300), "sand", { dir: "v" }); S.draw(line([160, 600], [1760, 600], 0), S.start, 0, { c: DS.c("sand", 2), w: DS.w.mid });
  urBoard(S, 960, 760, 64, { scratched: true, t: W(99, 6) });
  ring(S, 960, 760, 330, 140, W(99, 7));
  const G1 = guard(S, 250, 960, { look: 6 }), G2 = guard(S, 1660, 960, { look: -6 }); acc(S, G1, "spear"); acc(S, G2, "spear");
  S.zzz(310, 560, W(99, 4), 0.6);
  DS.card(S, "BORED GUARDS", 960, 130, { size: DS.type.body, t: W(99, 4) });
  DS.card(S, "THE GAME OF UR", 1300, 420, { size: DS.type.small, t: W(99, 11) });
  DS.vignette(S); }

// The bull was there to keep evil out. The guards, apparently, were there to play board games.
{ const S = sc(100, 0, { cam: "push", focus: "960 640" }); museum(S, DS.room(S, MUSE), { cols: [] });
  const k = 0.7; lamassu(S, 960, 800, k, {});
  const G1 = guard(S, 640, 960, Object.assign({ sit: true, gs: 964, mood: "happy", look: 6, pose: "reach", t: W(100, 9) }, GR));
  const G2 = guard(S, 1280, 960, Object.assign({ sit: true, gs: 964, mood: "determined", look: -6, pose: "reachL", t: W(100, 9) }, GL));
  [[920, 930], [980, 940]].forEach(([x, y]) => tetra(S, x, y, 0.5, W(100, 9)));
  DS.card(S, "TO KEEP EVIL OUT", 520, 150, { size: DS.type.small, t: W(100, 4) });
  DS.card(S, "TO PLAY BOARD GAMES", 1420, 150, { size: DS.type.small, t: W(100, 13), tc: "red" });
  DS.vignette(S); }

// Two thousand years ago, the poet Lucretius described a Roman
{ const S = sc(101, 0, { cam: "push", focus: "900 560" }); DS.outdoor(S, ROMAN); colonnade(S);
  const F = who(S, 820, 960, "near", { s: 1.15, hair: "short", hairC: DS.c("brown", 2), outfitC: DS.c("white"), mood: "smile", look: 6, pose: "hold" }); acc(S, F, "sash");
  const [hx, hy] = F.hand("R"); scroll(S, hx + 20, hy - 30, 160, 120, { lines: 3 });
  DS.card(S, "2,000 YEARS AGO", 1360, 330, { size: DS.type.small, t: W(101, 0) });
  DS.card(S, "THE POET LUCRETIUS", 1360, 460, { size: DS.type.small, t: W(101, 5) });
  DS.vignette(S); }

// who gets sick of his mansion and races his ponies to his country house.
const house = (S, x, gy, w, h, layer = "near", t) => { DS.shadow(S, x + w / 2, gy, w + 40, { t }); DS.shape(S, rect(x, gy - h, w, h), "white", { layer, t, dir: "h" }); DS.shape(S, `M${x - 30} ${gy - h} L${x + w / 2} ${gy - h - h * 0.35} L${x + w + 30} ${gy - h} Z`, "red", { layer, t });
  for (let i = 0; i < 4; i++) DS.shape(S, rect(x + w * (0.12 + i * 0.22), gy - h * 0.85, w * 0.08, h * 0.85), "white", { layer, t, flat: true, tone: 2, w: "detail" }); };
const chariot = (S, x, gy, o = {}) => { const g = S.grp();
  [0, 1].forEach((i) => pony(S, x + 330 + i * 60, gy - i * 6, 0.62, { parent: g, name: i ? "brown" : "wood" }));
  S.draw(line([x + 120, gy - 120], [x + 300, gy - 120], 0), S.start, 0, { c: DS.c("brown"), w: DS.w.mid, parent: g });
  const F = who(S, x + 60, gy - 50, "near", Object.assign({ s: 0.95, hair: "short", hairC: DS.c("brown", 2), outfitC: DS.c("white"), mood: o.mood || "flat", look: 6, pose: "reach", parent: g }, o));
  DS.shape(S, `M${x - 20} ${gy - 170} L${x + 130} ${gy - 170} L${x + 130} ${gy - 70} L${x - 20} ${gy - 70} Z`, "red", { parent: g, w: "mid" });
  wheel(S, x + 50, gy - 60, 60, S.start, "wood", g); return { g, F }; };
{ const S = sc(102, 0, { cam: "none" }); DS.outdoor(S, { hy: 620, sky: "sky", hills: "grass", ground: "grass", sun: [960, 160], path: [700, 1220] });
  house(S, 120, 760, 460, 300, "near");
  house(S, 1560, 640, 200, 130, "far");
  const C = chariot(S, 520, 900, { mood: "flat" }); S.move(C.g, W(102, 7), 1.6, { x: 560 }, "power1.inOut");
  DS.card(S, "SICK OF HIS MANSION", 380, 150, { size: DS.type.small, t: W(102, 2) });
  DS.card(S, "HIS COUNTRY HOUSE", 1560, 330, { size: DS.type.small, t: W(102, 11) });
  DS.vignette(S); }

// He yawns the moment he reaches the door, / or turns around and hurries back to the city.
{ const S = sc(103, 0, { cam: "push", focus: "1100 600" }); DS.outdoor(S, { hy: 640, sky: "sky", hills: "grass", ground: "grass", sun: [300, 160] });
  [[120, 120, 380], [260, 90, 320], [360, 140, 400]].forEach(([x, w, h]) => DS.shape(S, rect(x, 640 - h * 0.4, w, h * 0.4), "white", { layer: "far", flat: true, tone: 2, w: "far" }));
  DS.shadow(S, 1400, 900, 760); DS.shape(S, rect(1020, 420, 760, 480), "white", { dir: "h" }); DS.shape(S, `M990 420 L1400 260 L1810 420 Z`, "red");
  DS.shape(S, rrect(1300, 600, 200, 300, DS.r.xs), "wood", { w: "mid" });
  const F = who(S, 1120, 960, "near", { s: 1.1, hair: "short", hairC: DS.c("brown", 2), outfitC: DS.c("white"), mood: "tired", look: 6, pose: "head" });
  S.zzz(1200, 560, W(103, 1), 0.6);
  F.face(W(104, 1), "worried", -7); F.setPose(W(104, 1), "pointL");
  arrow(S, 900, 560, 480, 560, W(104, 4), { bend: 0.1 });
  DS.card(S, "YAWNS", 1120, 360, { size: DS.type.body, t: W(103, 1) });
  DS.card(S, "BACK TO THE CITY", 520, 400, { size: DS.type.small, t: W(104, 4), tc: "red" });
  DS.vignette(S); }

// Swap the ponies for a thumb, and that's Dave on a normal evening.
const couch = (S, x, gy, w, name = "purple") => { DS.shadow(S, x + w / 2, gy, w + 80); DS.shape(S, rrect(x + 10, gy - 330, w - 20, 210, DS.r.lg), name); DS.shape(S, rrect(x, gy - 140, w, 100, DS.r.md), name);
  [x - 40, x + w - 30].forEach((ax) => DS.shape(S, rrect(ax, gy - 220, 70, 180, DS.r.md), name)); [x + 30, x + w - 50].forEach((lx) => DS.shape(S, rect(lx, gy - 40, 20, 40), "wood", { w: "mid" })); return gy - 132; };
{ const S = sc(105, 0, { cam: "push", focus: "700 600" }); DS.room(S, NIGHT); nightWin(S, 1370, 140, 170, 160);
  const seat = couch(S, 300, 960, 560); const F = dave(S, 560, seat, "near", { sit: true, pose: "hold", mood: "flat", look: 6 });
  const [hx, hy] = F.hand("R"); bigPhone(S, hx + 40, hy - 50, 74, 130);
  [0, 1].forEach((i) => S.arrow(hx + 110, hy - 40 - i * 60, hx + 110, hy - 100 - i * 60, S.start + 0.5 + i * 0.8, 0.3, { c: DS.c("gray", 2), w: DS.w.mid }));
  pony(S, 1320, 760, 0.6, { t: W(105, 2) }); xMark(S, 1360, 640, 110, W(105, 3));
  DS.card(S, "PONIES → THUMB", 1340, 420, { size: DS.type.small, t: W(105, 5) });
  DS.card(S, "DAVE, A NORMAL EVENING", 760, 150, { size: DS.type.small, t: W(105, 8) });
  DS.vignette(S); }

// So, were ancient humans bored? By the look of it, often. / And that may be why all of this exists.
const wallBit = (S, cx, cy, t) => { DS.shape(S, `M${cx - 90} ${cy - 60} L${cx + 80} ${cy - 70} L${cx + 96} ${cy + 50} L${cx - 70} ${cy + 66} Z`, "red", { t, flat: true, tone: 2, w: "mid" }); S.draw(smooth([[cx - 60, cy - 10], [cx - 20, cy - 24], [cx + 20, cy - 4], [cx + 60, cy - 20]]), t, 0, { c: DS.c("white", 1), w: DS.w.detail }); S.draw(smooth([[cx - 60, cy + 24], [cx, cy + 10], [cx + 50, cy + 26]]), t, 0, { c: DS.c("white", 1), w: DS.w.detail }); };
{ const S = sc(106, 0, { cam: "push", focus: "960 560" }); museum(S, DS.room(S, MUSE));
  [430, 720].forEach((y) => { DS.shadow(S, 960, y + 30, 1300, { op: 0.12 }); DS.shape(S, rect(300, y, 1320, 30), "wood", { w: "mid" }); });
  const t = (i) => W(107, 5) + i * 0.12;
  urBoard(S, 520, 370, 26, { t: t(0) }); [[820, 400], [890, 410], [950, 396]].forEach(([x, y]) => KB(S, x, y, 0.6, { t: t(1) })); flute(S, 1080, 400, 300, { t: t(2) }); clayCart(S, 1520, 430, 0.6, { t: t(3) });
  tablet(S, 560, 640, 150, 120, { t: t(4) }); wallBit(S, 900, 640, t(5)); DS.shape(S, rrect(1180, 620, 200, 90, DS.r.xs), "sand", { t: t(6), w: "detail" }); urBoard(S, 1280, 665, 22, { scratched: true, t: t(6) });
  DS.card(S, "BORED? OFTEN.", 960, 150, { size: DS.type.title, t: W(106, 10), tc: "red" });
  DS.card(S, "WHY ALL OF THIS EXISTS", 960, 850, { size: DS.type.small, t: W(107, 4) });
  DS.vignette(S); }

// In twenty fourteen, psychologist Timothy Wilson's team left people alone in a room / for fifteen minutes, with their thoughts and a button.
const chair = (S, x, gy, t) => { DS.shadow(S, x, gy, 200, { t }); DS.shape(S, rect(x - 90, gy - 300, 24, 300), "wood", { t, w: "mid" }); DS.shape(S, rrect(x - 100, gy - 160, 200, 30, DS.r.xs), "wood", { t }); DS.shape(S, rect(x + 70, gy - 130, 20, 130), "wood", { t, w: "mid" }); return gy - 160; };
{ const S = sc(108, 0, { cam: "pull" }); DS.room(S, { wall: "white", floor: "gray", window: false });
  const seat = chair(S, 820, 900); const F = who(S, 840, seat, "near", { s: 1.05, sit: true, hair: "bun", hairC: DS.c("brown"), outfitC: DS.c("green"), mood: "flat", look: 6, gs: 900 });
  DS.shadow(S, 1160, 900, 220); DS.shape(S, rect(1060, 700, 200, 24), "wood"); DS.shape(S, rect(1145, 724, 30, 176), "wood", { w: "mid" });
  button(S, 1160, 680, 0.6, W(109, 8));
  timer(S, 1200, 260, "15:00", W(109, 1));
  F.face(W(109, 5), "tired", 6);
  DS.card(S, "2014 · TIMOTHY WILSON'S TEAM", 960, 110, { size: DS.type.small, t: W(108, 4) });
  DS.card(S, "ALONE", 520, 420, { size: DS.type.body, t: W(108, 9) });
  DS.vignette(S); }

// The button gave a mild electric shock, which they had all said they'd pay to avoid.
const coin = (S, x, y, t) => { DS.shape(S, circ(x, y, 44), "gold", { t, w: "mid" }); txt(S, "$", x, y + 14, { t, size: DS.type.caption, c: DS.c("gold", 2) }); };
{ const S = sc(110, 0, { cam: "zoom", focus: "960 600" }); DS.room(S, { wall: "white", floor: "gray", window: false });
  DS.shadow(S, 960, 860, 700); button(S, 960, 620, 2.6, S.start);
  S.bolt(960, 360, 1.8, W(110, 5), 0.25); S.burst(960, 520, 230, 290, 14, W(110, 5), 0.25, { c: DS.c("yellow", 2), w: DS.w.near });
  DS.card(S, "MILD ELECTRIC SHOCK", 960, 130, { size: DS.type.body, t: W(110, 4) });
  [1420, 1520, 1620].forEach((x, i) => coin(S, x, 830 - i * 16, W(110, 12) + i * 0.1));
  DS.card(S, "THEY'D PAY TO AVOID IT", 1520, 700, { size: DS.type.caption, t: W(110, 12) });
  DS.vignette(S); }

// Two out of three men pressed it anyway, and one in four women.
{ const S = sc(111, 0, { cam: "push" }); DS.room(S, { wall: "white", floor: "gray", window: false });
  [260, 470, 680].forEach((x, i) => { const F = person(S, x, 900, "near", [0, 3, 5][i], { s: 0.95, hair: "short", mood: i < 2 ? "wow" : "flat" }); if (i < 2) { ringFig(S, F, W(111, 5) + i * 0.15); S.bolt(x + 70, 900 - 340, 0.5, W(111, 5) + i * 0.15, 0.2); } });
  S.fill(rect(954, 300, 12, 640), S.start, 0, DS.c("gray"), 1);
  [1140, 1330, 1520, 1710].forEach((x, i) => { const F = person(S, x, 900, "near", [1, 6, 2, 7][i], { s: 0.95, hair: "bun", mood: i === 0 ? "wow" : "flat" }); if (i === 0) { ringFig(S, F, W(111, 12)); S.bolt(x + 70, 900 - 340, 0.5, W(111, 12), 0.2); } });
  DS.card(S, "2 OUT OF 3 MEN", 470, 150, { size: DS.type.body, t: W(111, 0), tc: "red" });
  DS.card(S, "1 IN 4 WOMEN", 1420, 150, { size: DS.type.body, t: W(111, 9), tc: "red" });
  DS.vignette(S); }

// Erin Westgate and Wilson later described boredom as a warning light. / Your attention isn't landing on anything that matters to you.
{ const S = sc(112, 0, { cam: "push", focus: "960 520" }); DS.room(S, { wall: "white", floor: "gray", window: false });
  DS.drop(S, rrect(268, 278, 620, 380, DS.r.lg)); DS.shape(S, rrect(260, 270, 620, 380, DS.r.lg), "navy", { w: "mid" });
  const L = S.grp(); DS.shape(S, `M570 330 L690 540 L450 540 Z`, "orange", { t: W(112, 9), parent: L, w: "mid" }); txt(S, "!", 570, 520, { t: W(112, 9), size: DS.type.title, parent: L });
  tl.fromTo(L, { opacity: 1 }, { opacity: 0.35, duration: 0.3, yoyo: true, repeat: 9, ease: "sine.inOut", immediateRender: false }, W(112, 10));
  S.text("BOREDOM", 570, 610, { size: DS.type.small, t: W(112, 6), c: DS.P.white[0] });
  DS.card(S, "ERIN WESTGATE & TIMOTHY WILSON", 960, 120, { size: DS.type.small, t: W(112, 0) });
  [[180, "red"], [130, "white"], [80, "red"], [34, "white"]].forEach(([r, n]) => DS.shape(S, circ(1440, 480, r), n, { w: "mid", flat: true, t: W(113, 1) }));
  arrow(S, 1000, 800, 1680, 270, W(113, 3), { c: "ink" });
  DS.card(S, "NOT LANDING ON WHAT MATTERS", 960, 860, { size: DS.type.small, t: W(113, 3) });
  DS.vignette(S); }

// Boredom isn't the opposite of fun. It's the alarm that sends you looking for some.
{ const S = sc(114, 0, { cam: "push", focus: "800 520" }); DS.room(S, WARM);
  const C = S.clock(560, 540, 170, S.start, 0, { h: 7, m: 0, bells: true });
  tl.fromTo(C.g, { rotation: -6 }, { rotation: 6, svgOrigin: "560 540", duration: 0.1, yoyo: true, repeat: Math.max(1, Math.floor((S.end - W(114, 8)) / 0.1) - 4), ease: "sine.inOut", immediateRender: false }, W(114, 8));
  S.burst(560, 360, 230, 290, 7, W(114, 8), 0.25, { c: DS.c("red"), w: DS.w.near, a0: -2.6, span: 2.1 });
  txt(S, "BOREDOM", 560, 820, { size: DS.type.body });
  arrow(S, 820, 540, 1120, 540, W(114, 10));
  urBoard(S, 1430, 470, 40, { t: W(114, 12) }); flute(S, 1250, 640, 360, { t: W(114, 12) });
  txt(S, "FUN", 1430, 820, { size: DS.type.body, t: W(114, 12) });
  DS.card(S, "NOT THE OPPOSITE OF FUN", 1250, 140, { size: DS.type.small, t: W(114, 1) });
  DS.card(S, "THE ALARM", 560, 900, { size: DS.type.small, t: W(114, 8), tc: "red" });
  DS.vignette(S); }

// So what did ancient humans do for fun? / They got bored, and then they made something. A board, a flute, a joke about a wall.
{ const S = sc(115, 0, { cam: "push", focus: "960 520" }); DS.room(S, WARM);
  const F = ancient(S, 960, 960, "near", 0, { s: 0.9, mood: "tired", look: 0 });
  F.face(W(116, 6), "happy", 0);
  urBoard(S, 450, 450, 40, { t: W(116, 9) }); txt(S, "A BOARD", 450, 580, { t: W(116, 9), size: DS.type.small });
  flute(S, 800, 450, 330, { t: W(116, 11) }); txt(S, "A FLUTE", 965, 580, { t: W(116, 11), size: DS.type.small });
  wallBit(S, 1470, 450, W(116, 13)); txt(S, "A JOKE ABOUT A WALL", 1470, 580, { t: W(116, 13), size: DS.type.small });
  DS.card(S, "THEY GOT BORED", 960, 120, { size: DS.type.body, t: W(116, 1) });
  DS.card(S, "THEN THEY MADE SOMETHING", 960, 240, { size: DS.type.body, t: W(116, 6), tc: "green" });
  DS.vignette(S); }

// ===================== 6. Older than us =====================
// And the urge behind all of it is older than our species.
{ const S = sc(117, 0, { cam: "push", focus: "800 600" }); DS.outdoor(S, { hy: 640, sky: "sky", hills: "grass", ground: "grass", sun: [1700, 160] });
  rat(S, 420, 860, 1.1, { dir: 1 }); dog(S, 740, 870, 0.9, S.start);
  ancient(S, 1440, 940, "near", 1, { mood: "smile", look: -6 });
  arrow(S, 1300, 600, 900, 600, W(117, 8), { bend: 0.15 });
  DS.card(S, "OLDER THAN OUR SPECIES", 960, 150, { size: DS.type.body, t: W(117, 8) });
  DS.vignette(S); }

// In the late nineteen nineties, neuroscientist Jaak Panksepp tickled young rats
const tickle = (S, x, y, t) => [0, 1, 2].forEach((i) => S.draw(`M${x - 30 + i * 30} ${y - 60 - (i % 2) * 14} l10 -16 l10 16 l10 -16`, t, 0, { c: DS.c("red"), w: DS.w.mid }));
{ const S = sc(118, 0, { cam: "push", focus: "960 600" }); DS.room(S, LAB);
  const F = who(S, 680, 960, "near", { s: 1.1, hair: "side", hairC: DS.c("gray", 1), outfitC: DS.c("white"), mood: "happy", look: 6, pose: "reach" });
  table(S, 760, 1600, 720, 790, 960);
  rat(S, 1060, 740, 0.75, { dir: -1 });
  tickle(S, 1010, 660, W(118, 8));
  DS.card(S, "LATE 1990s", 1300, 150, { size: DS.type.small, t: W(118, 2) });
  DS.card(S, "JAAK PANKSEPP", 1300, 280, { size: DS.type.body, t: W(118, 6) });
  DS.vignette(S); }

// and recorded chirps too high for human ears, which he argued were a kind of laughter.
const ear = (S, cx, cy, k, t) => { DS.shape(S, `M${cx - 40 * k} ${cy - 110 * k} Q${cx + 90 * k} ${cy - 140 * k} ${cx + 80 * k} ${cy - 10 * k} Q${cx + 70 * k} ${cy + 60 * k} ${cx + 20 * k} ${cy + 80 * k} Q${cx - 10 * k} ${cy + 130 * k} ${cx - 50 * k} ${cy + 90 * k} Z`, "white", { t, w: "mid" }); S.draw(smooth([[cx - 10 * k, cy - 70 * k], [cx + 40 * k, cy - 60 * k], [cx + 36 * k, cy], [cx + 4 * k, cy + 20 * k]]), t, 0, { c: DS.c("ink"), w: DS.w.mid }); };
{ const S = sc(119, 0, { cam: "push", focus: "800 560" }); DS.room(S, LAB);
  rat(S, 520, 760, 1.7, { dir: 1 });
  [0, 1, 2, 3].forEach((i) => { const a = S.draw(arc(700, 680, 70 + i * 60, -40, 40), W(119, 2) + i * 0.1, 0, { c: DS.c("purple"), w: DS.w.near }); tl.fromTo(a, { opacity: 1 }, { opacity: 0.3, duration: 0.4, yoyo: true, repeat: 5, immediateRender: false }, W(119, 2) + 0.5 + i * 0.1); });
  ear(S, 1420, 560, 1.4, W(119, 6)); xMark(S, 1430, 560, 120, W(119, 7));
  DS.card(S, "50 kHz CHIRPS", 680, 380, { size: DS.type.small, t: W(119, 2) });
  DS.card(S, "TOO HIGH FOR HUMANS", 1420, 300, { size: DS.type.small, t: W(119, 4) });
  DS.card(S, "A KIND OF LAUGHTER?", 960, 140, { size: DS.type.body, t: W(119, 13), tc: "red" });
  DS.vignette(S); }

// In twenty nineteen, Michael Brecht's lab in Berlin taught rats to play hide and seek.
const box = (S, x, gy, w, h, t) => { DS.shadow(S, x + w / 2, gy, w + 30, { t }); DS.shape(S, rect(x, gy - h, w, h), "earth", { t, w: "mid" }); DS.shape(S, `M${x} ${gy - h} L${x + 30} ${gy - h - 30} L${x + w + 30} ${gy - h - 30} L${x + w} ${gy - h} Z`, "earth", { t, w: "mid", flat: true, tone: 1 }); DS.shape(S, `M${x + w * 0.3} ${gy} V${gy - h * 0.45} Q${x + w * 0.5} ${gy - h * 0.62} ${x + w * 0.7} ${gy - h * 0.45} V${gy} Z`, "brown", { t, w: "detail", flat: true }); };
const HSROOM = (S) => { box(S, 340, 900, 260, 200); box(S, 1360, 900, 300, 220); box(S, 860, 820, 220, 160); };
{ const S = sc(120, 0, { cam: "push", focus: "960 640" }); DS.room(S, LAB); HSROOM(S);
  const F = who(S, 1120, 960, "near", { s: 1.0, hair: "short", hairC: DS.c("brown"), outfitC: DS.c("white"), mood: "smile", look: -6, pose: "hips" });
  rat(S, 680, 900, 0.8, { dir: 1 });
  DS.card(S, "2019 · BERLIN", 500, 150, { size: DS.type.small, t: W(120, 1) });
  DS.card(S, "MICHAEL BRECHT'S LAB", 1300, 150, { size: DS.type.small, t: W(120, 3) });
  DS.card(S, "HIDE AND SEEK", 960, 380, { size: DS.type.body, t: W(120, 12), tc: "red" });
  DS.vignette(S); }

// The prize wasn't food. It was more tickling. / The rats hid quietly and squeaked when they found someone.
const cheese = (S, x, gy, t) => { DS.shape(S, `M${x - 90} ${gy} L${x - 90} ${gy - 70} L${x + 90} ${gy - 120} L${x + 90} ${gy} Z`, "yellow", { t, w: "mid" }); [[-40, -40], [30, -50], [50, -20]].forEach(([dx, dy]) => S.fill(circ(x + dx, gy + dy, 12), t, 0, DS.c("yellow", 2), 1)); };
{ const S = sc(121, 0, { cam: "push", focus: "960 640" }); DS.room(S, LAB); HSROOM(S);
  cheese(S, 300, 960, W(121, 1)); xMark(S, 300, 900, 80, W(121, 3));
  const F = who(S, 1120, 960, "near", { s: 1.0, hair: "short", hairC: DS.c("brown"), outfitC: DS.c("white"), mood: "happy", look: -6, pose: "reachL" });
  const r1 = rat(S, 860, 940, 0.7, { dir: 1 }); tickle(S, 900, 880, W(121, 7)); S.fadeOut(r1, W(122, 2), 0.3);
  const r2 = rat(S, 1000, 820, 0.6, { dir: -1, t: W(122, 5) }); txt(S, "!", 1000, 700, { size: DS.type.title, t: W(122, 5), c: DS.c("red", 2) });
  DS.card(S, "THE PRIZE: MORE TICKLING", 960, 150, { size: DS.type.small, t: W(121, 4) });
  DS.card(S, "SQUEAK!", 960, 450, { size: DS.type.small, t: W(122, 5) });
  DS.vignette(S); }

// Some, once found, ran off and hid again, to keep the game going.
{ const S = sc(123, 0, { cam: "push", focus: "960 700" }); DS.room(S, LAB); HSROOM(S);
  const g = S.grp(); rat(S, 640, 900, 0.75, { dir: 1, parent: g }); S.move(g, W(123, 3), 1.0, { x: 760 }, "power2.inOut"); S.fadeOut(g, W(123, 6), 0.3);
  arrow(S, 700, 760, 1380, 760, W(123, 3), { bend: -0.15, c: "ink" });
  DS.card(S, "HID AGAIN", 1510, 560, { size: DS.type.small, t: W(123, 6) });
  DS.card(S, "TO KEEP THE GAME GOING", 960, 150, { size: DS.type.body, t: W(123, 9), tc: "green" });
  DS.vignette(S); }

// In nineteen thirty-eight, the historian Johan Huizinga wrote this.
{ const S = sc(124, 0, { cam: "push", focus: "800 560" }); DS.room(S, WARM); shelf(S, 1040, 140, 560, 600);
  const F = who(S, 720, 960, "near", { s: 1.1, hair: "side", hairC: DS.c("gray", 1), outfitC: DS.c("navy"), mood: "smile", look: 6, pose: "hold" });
  const [hx, hy] = F.hand("R"); book(S, hx + 150, hy - 10, 210, 160, "red", "HOMO|LUDENS");
  DS.card(S, "JOHAN HUIZINGA", 720, 330, { size: DS.type.small, t: W(124, 5) });
  DS.card(S, "1938", 1320, 820, { size: DS.type.body, t: W(124, 1) });
  DS.vignette(S); }

// "Animals have not waited for man to teach them their playing."
{ const S = sc(125, 0, { cam: "push", focus: "960 480" }); DS.room(S, WARM);
  panel(S, 960, 380, 1200, 400, S.start, "paper");
  ["ANIMALS HAVE NOT WAITED", "FOR MAN TO TEACH THEM", "THEIR PLAYING."].forEach((s, i) => S.text(s, 960, 330 + i * 76, { size: DS.type.body, t: W(125, [0, 4, 9][i]), c: DS.c("ink") }));
  txt(S, "HOMO LUDENS, 1938", 1340, 560, { size: DS.type.caption, c: DS.c("gray", 2) });
  rat(S, 520, 900, 0.9, { dir: 1, t: W(125, 9) }); dog(S, 860, 910, 0.75, W(125, 9)); rat(S, 1400, 900, 0.9, { dir: -1, t: W(125, 9) });
  DS.vignette(S); }

// At eleven o'clock, Dave's phone is still dead, and Dave hasn't noticed.
{ const S = sc(126, 0, { cam: "push", focus: "700 600" }); const T = daveTable(S, DS.room(S, NIGHT), { h: 11, mood: "determined", look: 6, items: ["kb", "flute", "cart", "joke", "scratch"], pieces: [[1, 4, 0], [1, 6, 1], [2, 1, 1]] });
  DS.card(S, "11:00 PM", 790, 200, { size: DS.type.small, t: W(126, 1) });
  ring(S, 300, 700, 90, 50, W(126, 6));
  DS.card(S, "STILL DEAD", 280, 560, { size: DS.type.caption, t: W(126, 6), tc: "red" });
  DS.card(S, "HASN'T NOTICED", 960, 400, { size: DS.type.small, t: W(126, 9) });
  DS.vignette(S); }

// Rulebook nine, Dave zero, and Dave would like one more game.
{ const S = sc(127, 0, { cam: "push", focus: "900 460" }); const T = daveTable(S, DS.room(S, NIGHT), { h: 11, mood: "happy", look: 6, pose: "wave", items: ["kb", "flute", "cart", "joke", "scratch"], score: [8, 0], scoreO: { to: [W(127, 1), 9] } });
  DS.card(S, "ONE MORE GAME", 940, 450, { size: DS.type.body, t: W(127, 8), tc: "green" });
  DS.vignette(S); }

// Three hundred thousand years, and nobody just stared at the rock.
{ const S = sc(128, 0, { cam: "pull" }); DS.outdoor(S, { hy: 640, sky: "dusk", hills: "earth", ground: "sand", sun: [1560, 300] });
  DS.shadow(S, 960, 870, 520); DS.shape(S, smooth([[700, 870], [720, 720], [860, 650], [1060, 650], [1200, 730], [1220, 870], [700, 870]]) + " Z", "gray", { w: "near" });
  urBoard(S, 960, 720, 30, { scratched: true, squash: 0.7 });
  ancient(S, 460, 880, "near", 0, Object.assign({ s: 1.1, sit: true, mood: "happy", look: 7, pose: "reach" }, GR));
  ancient(S, 1460, 880, "near", 1, Object.assign({ s: 1.1, sit: true, mood: "determined", look: -7, pose: "reachL" }, GL));
  DS.card(S, "NOBODY JUST STARED AT THE ROCK", 960, 150, { size: DS.type.small, t: W(128, 5) });
  DS.vignette(S); }

// We got bored. Then we made a game out of it.
{ const S = sc(129, 0, { cam: "pull" }); const T = daveTable(S, DS.room(S, NIGHT), { h: 11, mood: "happy", look: 6, tx: 1460, items: ["kb", "flute", "cart", "joke", "scratch"], pieces: [[1, 3, 0], [1, 5, 1], [0, 1, 0]] });
  DS.card(S, "WE GOT BORED.", 960, 200, { size: DS.type.body, t: W(129, 0) });
  DS.card(S, "THEN WE MADE A GAME.", 940, 340, { size: DS.type.small, t: W(129, 3), tc: "green" });
  DS.vignette(S); }
