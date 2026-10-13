// look: story
// What Did Ancient Humans Do About Toothache? — story mode. One shot per phrase, hard cuts on the breath.
// parts/*.js are concatenated into scenes.js by assemble.sh. shot(clip, word, fn, sceneOpts) registers a shot.
const SHOTS = [];
const shot = (c, w, fn, o = {}) => SHOTS.push({ c, w, fn, o });
const FLOOR = 830;
const Q = 0.18; // standard draw time: the picture reads at once
// ---- palette (story-explainer.md) ----
const C = { red: "#E5383B", yel: "#FEFE06", gold: "#E3AE42", tooth: "#FFFFFF", rot: "#5b4636", decay: "#d8c48f", pulp: "#ff8fa3", nerve: "#c81d25",
  gum: "#f28b9b", stone: "#8d8f94", wood: "#a0703c", tar: "#1c1a17", wax: "#f2c14e", worm: "#f4a6b7", frog: "#6cc04a", bact: "#7cc576",
  tunic: "#c9893f", tee: "#2f6fd6", coat: "#ffffff", sky: "#A9CBE5", grass: "#70B55E" };
const dr = (S, d, o = {}) => S.draw(d, o.t ?? S.start, o.dur ?? Q, Object.assign({ w: 7 }, o));
const fl = (S, d, col, o = {}) => dr(S, d, Object.assign({ fill: col }, o));
const pts = (x, y, s, P) => P.map(([a, b]) => [x + a * s, y + b * s]);
const closed = (x, y, s, P) => smooth(pts(x, y, s, [...P, P[0]])) + " Z";

// ---- people ----
const person = (S, x, gy, o) => {
  const F = S.fig(x, gy, Object.assign({ s: 1.1 }, o)).instant(S.start);
  F.face(S.start, o.mood || "flat", o.look || 0);
  if (o.glasses) glasses(S, F);
  if (o.bandage) bandage(S, F);
  if (o.crown) crown(S, F);
  if (o.halo) dr(S, `M${F.hd[0] - F.r * 0.8} ${F.hd[1] - F.r * 1.35} a${F.r * 0.8} ${F.r * 0.25} 0 1 0 ${F.r * 1.6} 0 a${F.r * 0.8} ${F.r * 0.25} 0 1 0 ${-F.r * 1.6} 0`, { c: C.gold, w: 8 });
  if (o.pose) F.setPose(S.start, o.pose);
  return F;
};
const cave = (S, x, gy, o = {}) => person(S, x, gy, Object.assign({ hair: "messy", outfit: "tunic", outfitC: C.tunic }, o));
const you = (S, x, gy, o = {}) => person(S, x, gy, Object.assign({ hair: "short", outfit: "tee", outfitC: C.tee }, o));
const doc = (S, x, gy, o = {}) => person(S, x, gy, Object.assign({ hair: "side", hairC: "#8a8a8a", outfit: "apron", outfitC: C.coat, glasses: true }, o));
function glasses(S, F) {
  const R = F.r, y = F.hd[1] - 0.08 * R, g = S.grp();
  [-1, 1].forEach((sd) => dr(S, circ(F.hd[0] + sd * 0.34 * R, y, 0.26 * R), { w: 2.6, parent: g }));
  dr(S, `M${F.hd[0] - 0.09 * R} ${y} L${F.hd[0] + 0.09 * R} ${y}`, { w: 2.6, parent: g });
}
// the classic toothache bandage: cloth under the chin, knot on top
function bandage(S, F) {
  const R = F.r, cx = F.hd[0], cy = F.hd[1] + 0.18 * R;
  const ring = smooth(arcPts(cx, cy, R * 0.8, 0, 360, 24, R * 1.2));
  dr(S, ring, { w: 13, c: INK });
  dr(S, ring, { w: 8, c: "#ffffff" });
  const ky = cy - R * 1.2;
  fl(S, closed(cx - 4, ky, 1, [[0, 0], [-30, -26], [-40, -6], [-24, 8]]), "#ffffff", { w: 5 });
  fl(S, closed(cx + 4, ky, 1, [[0, 0], [30, -26], [40, -6], [24, 8]]), "#ffffff", { w: 5 });
}
function crown(S, F) {
  const R = F.r, x = F.hd[0], y = F.hd[1] - R * 0.95;
  fl(S, poly([[x - 0.6 * R, y], [x - 0.65 * R, y - 0.55 * R], [x - 0.3 * R, y - 0.25 * R], [x, y - 0.65 * R], [x + 0.3 * R, y - 0.25 * R], [x + 0.65 * R, y - 0.55 * R], [x + 0.6 * R, y], [x - 0.6 * R, y]], 1), C.gold, { w: 5 });
}

// ---- toothache props ----
const MOLAR = [[-85, 40], [-95, -20], [-80, -65], [-45, -80], [-15, -64], [0, -60], [15, -64], [45, -80], [80, -65], [95, -20], [85, 40], [72, 105], [56, 150], [36, 150], [26, 98], [0, 72], [-26, 98], [-36, 150], [-56, 150], [-72, 105]];
const INCISOR = [[-52, -95], [0, -100], [52, -95], [58, -20], [44, 50], [26, 150], [0, 178], [-26, 150], [-44, 50], [-58, -20]];
// tooth(S, x, y, s, o) — o: { kind: "molar"|"incisor", fill, rot (brown decay patch), cavity, pulp, pain, face, hole: colour, grooves, crack, gold }
function tooth(S, x, y, s = 1, o = {}) {
  const g = S.grp(), P = o.kind === "incisor" ? INCISOR : MOLAR;
  fl(S, closed(x, y, s, P), o.fill || C.tooth, { w: 8, parent: g });
  if (o.pulp) {
    const pp = o.kind === "incisor" ? [[-26, -55], [26, -55], [30, 20], [10, 130], [-10, 130], [-30, 20]] : [[-50, 15], [-52, -25], [-30, -38], [0, -28], [30, -38], [52, -25], [50, 15], [40, 70], [34, 118], [24, 75], [0, 45], [-24, 75], [-34, 118], [-40, 70]];
    fl(S, closed(x, y, s, pp), C.pulp, { w: 4, c: C.nerve, parent: g });
    dr(S, smooth(pts(x, y, s, [[-30, 110], [-26, 50], [0, 0], [26, 50], [30, 110]])), { w: 4, c: C.nerve, parent: g });
  }
  if (o.rot) fl(S, closed(x, y, s, [[-60, -55], [-20, -50], [-10, -20], [-45, 5], [-70, -15]]), C.decay, { w: 0.1, c: C.decay, parent: g });
  if (o.cavity) fl(S, closed(x, y, s, o.kind === "incisor" ? [[-14, -70], [16, -66], [20, -30], [-4, -10], [-20, -36]] : [[-42, -62], [-14, -56], [-10, -30], [-34, -16], [-50, -36]]), C.rot, { w: 4, parent: g });
  if (o.hole) fl(S, closed(x, y, s, o.kind === "incisor" ? [[-14, -70], [16, -66], [20, -20], [-4, 0], [-20, -26]] : [[-40, -66], [-10, -60], [-6, -24], [-32, -8], [-50, -34]]), o.hole, { w: 4, parent: g });
  if (o.crack) dr(S, poly(pts(x, y, s, [[10, -95], [-4, -50], [12, -20], [-2, 20]]), 1), { w: 5, parent: g });
  if (o.grooves) [0, 1, 2].forEach((i) => dr(S, line([x + (60 - i * 12) * s, y + (40 + i * 8) * s], [x + (78 - i * 12) * s, y + (46 + i * 8) * s], 1), { w: 4, c: "#7a5c3a", parent: g }));
  if (o.gold) fl(S, `M${x - 98 * s} ${y + 10 * s} L${x + 98 * s} ${y + 10 * s} L${x + 96 * s} ${y + 40 * s} L${x - 96 * s} ${y + 40 * s} Z`, C.gold, { w: 5, parent: g });
  if (o.face) { // simple tooth face
    const fy = y + (o.kind === "incisor" ? -10 : 0) * s;
    [-1, 1].forEach((sd) => { fl(S, circ(x + sd * 28 * s, fy, 13 * s), "#ffffff", { w: 4, parent: g }); fl(S, circ(x + sd * 28 * s + 3 * s, fy + (o.face === "sad" ? 4 : 0) * s, 6 * s), INK, { w: 1, parent: g }); });
    const m = { sad: [[-20, 42], [0, 30], [20, 42]], happy: [[-20, 30], [0, 44], [20, 30]], flat: [[-16, 36], [16, 36]], pain: [[-22, 40], [-10, 32], [0, 40], [10, 32], [22, 40]] }[o.face] || [[-16, 36], [16, 36]];
    dr(S, smooth(pts(x, fy, s, m)), { w: 5, parent: g });
  }
  if (o.pain) pain(S, x, y - 10 * s, 150 * s);
  return g;
}
// red zig-zag pain marks around (x, y)
function pain(S, x, y, r, n = 6, col = C.red) {
  for (let i = 0; i < n; i++) {
    const a = -Math.PI / 2 + (i - (n - 1) / 2) * 0.55, c = Math.cos(a), s = Math.sin(a), q = [-s, c];
    const P = [0, 1, 2, 3].map((k) => [x + c * (r + k * 14) + q[0] * (k % 2 ? 9 : -9), y + s * (r + k * 14) + q[1] * (k % 2 ? 9 : -9)]);
    dr(S, poly(P, 1), { w: 6, c: col });
  }
}
function worm(S, x, y, s = 1, o = {}) {
  const P = smooth(pts(x, y, s, [[-120, 30], [-80, -10], [-40, 20], [0, -10], [40, 15], [80, -15]]));
  dr(S, P, { w: 46 * s, c: INK });
  dr(S, P, { w: 36 * s, c: C.worm });
  [-90, -50, -10, 30].forEach((k) => dr(S, line([x + k * s, y + (k % 20 ? -6 : 8) * s - 14 * s], [x + (k + 6) * s, y + 12 * s], 1), { w: 3, c: "#c46a82" }));
  const hx = x + 92 * s, hy = y - 22 * s;
  fl(S, circ(hx, hy, 34 * s), C.worm, { w: 6 });
  [-1, 1].forEach((sd) => { fl(S, circ(hx + sd * 13 * s, hy - 8 * s, 9 * s), "#ffffff", { w: 3 }); fl(S, circ(hx + sd * 13 * s + 2 * s, hy - 7 * s, 4 * s), INK, { w: 1 }); });
  dr(S, smooth(pts(hx, hy, s, o.mood === "evil" ? [[-14, 12], [0, 18], [16, 8]] : [[-12, 12], [12, 12]])), { w: 4 });
  if (o.mood === "evil") [-1, 1].forEach((sd) => dr(S, line([hx + sd * 22 * s, hy - 24 * s], [hx + sd * 5 * s, hy - 16 * s], 1), { w: 4 }));
}
const flint = (S, x, y, s = 1, col = C.stone) => { fl(S, closed(x, y, s, [[0, -80], [28, -30], [26, 30], [0, 70], [-24, 30], [-30, -30]]), col, { w: 6 }); dr(S, poly(pts(x, y, s, [[0, -60], [6, -10], [-4, 40]]), 1), { w: 3, c: "#5f6166" }); };
const rock = (S, x, y, s = 1) => fl(S, closed(x, y, s, [[-70, 10], [-55, -40], [0, -55], [55, -35], [72, 10], [40, 45], [-30, 45]]), C.stone, { w: 7 });
function bowDrill(S, x, y, s = 1) { // spindle + flint tip, bow held sideways with its string looped round the spindle, hand block on top
  dr(S, line([x, y - 150 * s], [x, y + 40 * s], 1), { w: 12, c: C.wood });
  flint(S, x, y + 60 * s, 0.35 * s);
  dr(S, smooth(pts(x, y, s, [[-60, -20], [60, -75], [200, -85], [330, -30]])), { w: 11, c: C.wood });
  dr(S, poly(pts(x, y, s, [[-60, -20], [-10, -48], [10, -40], [-10, -32], [330, -30]]), 1), { w: 3 });
  fl(S, rrect(x - 45 * s, y - 185 * s, 90 * s, 36 * s, 10 * s), C.stone, { w: 5 });
}
function tablet(S, x, y, s = 1) {
  fl(S, rrect(x - 150 * s, y - 190 * s, 300 * s, 380 * s, 30 * s), "#d9b98b", { w: 7 });
  for (let r = 0; r < 7; r++) for (let k = 0; k < 6; k++) if ((r * 7 + k * 3) % 5) dr(S, `M${x - 110 * s + k * 40 * s} ${y - 150 * s + r * 48 * s} l${14 * s} ${4 * s} l${-12 * s} ${8 * s}`, { w: 4, c: "#6e5332" });
}
function papyrus(S, x, y, w, h, lines = 6) {
  fl(S, rect(x - w / 2, y - h / 2, w, h), "#efdcae", { w: 6 });
  fl(S, rrect(x - w / 2 - 22, y - h / 2 - 10, 44, h + 20, 20), "#e3c98f", { w: 6 });
  fl(S, rrect(x + w / 2 - 22, y - h / 2 - 10, 44, h + 20, 20), "#e3c98f", { w: 6 });
  for (let i = 0; i < lines; i++) dr(S, smooth(Array.from({ length: 9 }, (_, k) => [x - w / 2 + 50 + k * (w - 100) / 8, y - h / 2 + 50 + i * (h - 90) / Math.max(1, lines - 1) + (k % 2 ? 5 : -5)])), { w: 4, c: "#8a6d3b" });
}
function frog(S, x, y, s = 1, o = {}) {
  fl(S, closed(x, y, s, [[-110, 30], [-90, -40], [0, -60], [90, -40], [110, 30], [0, 60]]), C.frog, { w: 7 });
  [-1, 1].forEach((sd) => { fl(S, circ(x + sd * 55 * s, y - 62 * s, 30 * s), C.frog, { w: 6 }); fl(S, circ(x + sd * 55 * s, y - 62 * s, 18 * s), "#ffffff", { w: 3 }); fl(S, circ(x + sd * 55 * s, y - 60 * s, 8 * s), INK, { w: 1 }); });
  dr(S, smooth(pts(x, y, s, o.sad ? [[-50, 20], [0, 5], [50, 20]] : [[-50, 0], [0, 20], [50, 0]])), { w: 5 });
}
function pot(S, x, y, s = 1, o = {}) {
  fl(S, closed(x, y, s, [[-120, -60], [120, -60], [110, 40], [60, 90], [-60, 90], [-110, 40]]), o.c || "#6d6f75", { w: 8 });
  fl(S, rrect(x - 140 * s, y - 80 * s, 280 * s, 30 * s, 12 * s), o.c || "#6d6f75", { w: 7 });
  if (o.steam !== false) [-50, 0, 50].forEach((k) => dr(S, smooth(pts(x + k * s, y - 100 * s, s, [[0, 0], [-15, -40], [10, -80], [-5, -120]])), { w: 5, c: "#9aa0a6" }));
}
const jar = (S, x, y, s, col, txt) => { fl(S, rrect(x - 70 * s, y - 80 * s, 140 * s, 170 * s, 30 * s), col, { w: 7 }); fl(S, rect(x - 80 * s, y - 110 * s, 160 * s, 36 * s), "#a0703c", { w: 6 }); if (txt) S.label(txt, x, y + 20 * s, { size: 34 * s }); };
const onion = (S, x, y, s) => { fl(S, closed(x, y, s, [[0, -100], [40, -40], [70, 20], [40, 70], [-40, 70], [-70, 20], [-40, -40]]), "#b56fc0", { w: 7 }); dr(S, smooth(pts(x, y, s, [[0, -95], [-20, 0], [0, 68]])), { w: 3 }); dr(S, smooth(pts(x, y, s, [[0, -95], [20, 0], [0, 68]])), { w: 3 }); };
const incense = (S, x, y, s) => { dr(S, line([x, y], [x + 10 * s, y - 180 * s], 1), { w: 8, c: "#7a4a2a" }); fl(S, circ(x + 10 * s, y - 184 * s, 8 * s), C.red, { w: 2 }); dr(S, smooth(pts(x + 10 * s, y - 190 * s, s, [[0, 0], [-20, -40], [15, -80], [-10, -130]])), { w: 4, c: "#9aa0a6" }); };
function dentures(S, x, y, s = 1, o = {}) {
  fl(S, closed(x, y, s, [[-170, 0], [-130, -70], [0, -95], [130, -70], [170, 0], [120, 25], [0, 10], [-120, 25]]), C.gum, { w: 7 });
  for (let i = -3; i <= 3; i++) fl(S, rrect(x + i * 40 * s - 18 * s, y - 60 * s + Math.abs(i) * 8 * s, 36 * s, 62 * s, 10 * s), (o.mixed && i % 2) ? "#f3e6c4" : "#ffffff", { w: 4 });
}
function sugar(S, x, y, s = 1) {
  [[-60, 0], [10, 0], [80, 0], [-25, -70], [45, -70], [10, -140]].forEach(([a, b]) => { fl(S, rect(x + a * s - 34 * s, y + b * s - 34 * s, 68 * s, 68 * s), "#ffffff", { w: 6 }); dr(S, `M${x + a * s - 34 * s} ${y + b * s - 34 * s} l${14 * s} ${-14 * s} l${68 * s} 0 l${-14 * s} ${14 * s}`, { w: 4 }); });
}
function bact(S, x, y, s = 1, o = {}) {
  const P = Array.from({ length: 16 }, (_, i) => { const a = (i / 16) * Math.PI * 2, k = i % 2 ? 1 : 1.16; return [Math.cos(a) * 70 * k, Math.sin(a) * 60 * k]; });
  fl(S, closed(x, y, s, P), o.c || C.bact, { w: 6 });
  [-1, 1].forEach((sd) => { fl(S, circ(x + sd * 24 * s, y - 8 * s, 12 * s), "#ffffff", { w: 3 }); fl(S, circ(x + sd * 24 * s, y - 6 * s, 5 * s), INK, { w: 1 }); dr(S, line([x + sd * 40 * s, y - 32 * s], [x + sd * 12 * s, y - 22 * s], 1), { w: 4 }); });
  dr(S, smooth(pts(x, y, s, [[-20, 22], [0, 30], [20, 18]])), { w: 4 });
}
function acorn(S, x, y, s = 1) {
  fl(S, closed(x, y, s, [[-45, -10], [45, -10], [40, 40], [0, 80], [-40, 40]]), "#c98d4a", { w: 6 });
  fl(S, closed(x, y, s, [[-55, -10], [-45, -45], [0, -60], [45, -45], [55, -10]]), "#7a5230", { w: 6 });
  dr(S, line([x, y - 60 * s], [x + 8 * s, y - 85 * s], 1), { w: 6, c: "#7a5230" });
}
function wheat(S, x, y, s = 1) {
  dr(S, line([x, y], [x, y - 220 * s], 1), { w: 6, c: "#c49a3a" });
  for (let i = 0; i < 5; i++) [-1, 1].forEach((sd) => fl(S, closed(x + sd * 14 * s, y - 120 * s - i * 26 * s, s, [[0, -18], [10 * sd, -6], [0, 18], [-10 * sd, -6]]), "#e8c15a", { w: 3 }));
}
const pill = (S, x, y, s = 1) => { fl(S, rrect(x - 80 * s, y - 32 * s, 80 * s, 64 * s, 30 * s), C.red, { w: 6 }); fl(S, rrect(x, y - 32 * s, 80 * s, 64 * s, 30 * s), "#ffffff", { w: 6 }); };
const coin = (S, x, y, s = 1, txt = "1") => { fl(S, circ(x, y, 60 * s), C.gold, { w: 6 }); S.label(txt, x, y + 22 * s, { size: 64 * s }); };
function pin(S, x, y, s = 1) { fl(S, closed(x, y, s, [[0, 0], [-34, -60], [-30, -95], [0, -112], [30, -95], [34, -60]]), C.red, { w: 6 }); fl(S, circ(x, y - 80 * s, 14 * s), "#ffffff", { w: 3 }); }
function land(S, x, y, w, h, col = "#a8c97f") { const P = Array.from({ length: 14 }, (_, i) => { const a = (i / 14) * Math.PI * 2; return [Math.cos(a) * (0.85 + rnd() * 0.25), Math.sin(a) * (0.85 + rnd() * 0.25)]; }); fl(S, closed(x, y, 1, P.map(([a, b]) => [a * w / 2, b * h / 2])), col, { w: 6 }); }
function skull(S, x, y, s = 1, o = {}) {
  fl(S, closed(x, y, s, [[-110, 0], [-100, -90], [0, -140], [100, -90], [110, 0], [80, 60], [60, 110], [-60, 110], [-80, 60]]), "#efe6d0", { w: 7 });
  [-1, 1].forEach((sd) => fl(S, closed(x + sd * 45 * s, y - 10 * s, s, [[-28, -10], [0, -32], [28, -10], [20, 22], [-20, 22]]), INK, { w: 3 }));
  fl(S, closed(x, y + 40 * s, s, [[0, -18], [12, 10], [-12, 10]]), INK, { w: 2 });
  for (let i = -3; i <= 3; i++) fl(S, rect(x + i * 20 * s - 9 * s, y + 80 * s, 18 * s, 26 * s), (o.bad || []).includes(i) ? C.rot : "#ffffff", { w: 3 });
}
function bridge(S, x, y, w) {
  fl(S, `M${x - w / 2} ${y} L${x + w / 2} ${y} L${x + w / 2} ${y + 60} L${x - w / 2} ${y + 60} Z`, "#c9c1b0", { w: 7 });
  [0, 1, 2].forEach((i) => dr(S, arc(x - w / 3 + i * w / 3, y + 60 + w / 7, w / 7, 180, 360), { w: 7 }));
}
function pliers(S, x, y, s = 1, ang = 0) {
  const g = S.grp(); g.setAttribute("transform", `rotate(${ang} ${x} ${y})`);
  dr(S, smooth(pts(x, y, s, [[-30, -150], [-12, -40], [10, 120]])), { w: 12, c: "#6d6f75", parent: g });
  dr(S, smooth(pts(x, y, s, [[30, -150], [12, -40], [-10, 120]])), { w: 12, c: "#6d6f75", parent: g });
  fl(S, circ(x, y - 30 * s, 10 * s), "#9aa0a6", { w: 3, parent: g });
}
function gasBag(S, x, y, s = 1) {
  fl(S, closed(x, y, s, [[0, -150], [90, -110], [110, -20], [60, 50], [0, 70], [-60, 50], [-110, -20], [-90, -110]]), "#9ad4f5", { w: 7 });
  dr(S, smooth(pts(x, y, s, [[0, 70], [20, 140], [-30, 200], [10, 260]])), { w: 8 });
  S.label("N₂O", x, y - 30 * s, { size: 60 * s });
}
function stars5(S, x, y, s = 1, n = 5) {
  for (let i = 0; i < 5; i++) { const cx = x + (i - 2) * 80 * s, P = Array.from({ length: 10 }, (_, k) => { const a = -Math.PI / 2 + (k * Math.PI) / 5, r = k % 2 ? 14 : 34; return [Math.cos(a) * r, Math.sin(a) * r]; }); fl(S, closed(cx, y, s, P), i < n ? C.gold : "#ffffff", { w: 4 }); }
}
// hand-drawn line graph inside a box; P = [[0..1, 0..1], ...]; o.dot = index of red dot
function graph(S, x, y, w, h, P, o = {}) {
  dr(S, `M${x} ${y} L${x} ${y + h} L${x + w} ${y + h}`, { w: 7 });
  dr(S, smooth(P.map(([a, b]) => [x + a * w, y + h - b * h])), { w: 9, c: o.c || C.red });
  if (o.dot !== undefined) { const [a, b] = P[o.dot]; fl(S, circ(x + a * w, y + h - b * h, 18), C.red, { w: 4 }); }
}
function nums(S, x, y, n, cols, col, total, k = 0.55) { // icon grid: n of total highlighted (teeth); x,y = centre
  const dx = 250 * k, dy = 300 * k, rows = Math.ceil(total / cols);
  for (let i = 0; i < total; i++) { const cx = x + ((i % cols) - (cols - 1) / 2) * dx, cy = y + (Math.floor(i / cols) - (rows - 1) / 2) * dy; fl(S, closed(cx, cy, k, MOLAR), i < n ? col : "#ffffff", { w: 5 }); }
}
function hairBall(S, x, y, s = 1) { let d = ""; for (let i = 0; i < 9; i++) { const a = rnd() * 6.28, r = 40 + rnd() * 50; d += smooth(Array.from({ length: 7 }, (_, k) => [x + Math.cos(a + k * 0.9) * r * s * (0.6 + 0.4 * (k % 2)), y + Math.sin(a + k * 0.9) * r * s * (0.6 + 0.4 * ((k + 1) % 2))])) + " "; } dr(S, d, { w: 6, c: "#5a3a1e" }); }
const blood = (S, x, y, s = 1) => fl(S, closed(x, y, s, [[0, -90], [40, -20], [55, 25], [30, 62], [0, 70], [-30, 62], [-55, 25], [-40, -20]]), C.red, { w: 7 });
// ===== COLD OPEN + WHY IT HURTS (lines 1–22) =====
const mini = (S, x, y, s, col = PAPER, dead) => { fl(S, circ(x, y - 70 * s, 20 * s), col, { w: 5 }); dr(S, `M${x} ${y - 50 * s} L${x} ${y} M${x} ${y} L${x - 14 * s} ${y + 34 * s} M${x} ${y} L${x + 14 * s} ${y + 34 * s} M${x - 20 * s} ${y - 30 * s} L${x + 20 * s} ${y - 30 * s}`, { w: 5 }); if (dead) S.cross(x, y - 20 * s, 0.7 * s, S.start, Q); };
const alps = (S) => { S.bg("day", { hy: 700, clouds: 1 }); fl(S, poly([[-40, 700], [260, 300], [420, 470], [640, 230], [900, 520], [1100, 360], [1400, 700]], 2), "#b9c4cf", { w: 7 }); fl(S, poly([[560, 330], [640, 230], [720, 330], [680, 310], [640, 340], [600, 310]], 1), "#ffffff", { w: 4 }); fl(S, poly([[200, 375], [260, 300], [320, 375], [260, 360]], 1), "#ffffff", { w: 4 }); };

// L1 Tonight, if one of your teeth starts to throb…
shot(1, 0, (S) => { S.bg("roomNight", { window: [1300, 170, 360, 300] }); const F = you(S, 760, 790, { s: 1.5, mood: "worried", look: -3, pose: "head" }); pain(S, 760, F.hd[1] - 20, 110); S.label("TONIGHT", 760, 150, { c: "#ffffff" }); });
// L2 painkiller / complain / dentist
shot(2, 0, (S) => { S.bg("white", { floor: false }); pill(S, 960, 540, 3.4); S.label("PAINKILLER", 960, 260); });
shot(2, 4, (S) => { S.bg("white"); you(S, 700, FLOOR, { s: 1.4, mood: "sad", bandage: true }); S.speech(1180, 360, 230, 120, 860, 470, S.start, Q); S.label("OWW…", 1180, 385, { size: 76 }); });
shot(2, 7, (S) => { S.bg("white"); you(S, 640, FLOOR, { s: 1.3, mood: "worried", bandage: true }); doc(S, 1220, FLOOR, { s: 1.3, mood: "smile", look: -4 }); S.label("DENTIST", 1220, 200); });
// L3 14,000 years ago, a young man in the Italian Alps… same pain
shot(3, 0, (S) => { alps(S); S.label("14,000 YEARS AGO", 960, 160, { c: C.red, size: 100 }); });
shot(3, 11, (S) => { alps(S); const F = cave(S, 1500, 900, { s: 1.4, mood: "worried", bandage: true, look: -3 }); pain(S, F.hd[0], F.hd[1] - 20, 120); S.label("SAME PAIN", 1500, 180); });
// L4 His dentist had a rock. [S]
shot(4, 0, (S) => { S.bg("desert", { hy: 700 }); cave(S, 620, 900, { s: 1.3, mood: "worried", bandage: true, look: 4 }); const F = cave(S, 1180, 900, { s: 1.3, mood: "smile", hair: "curly", look: -4, pose: "hold" }); rock(S, F.hand("R", "hold")[0] - 10, F.hand("R", "hold")[1] - 40, 0.9); S.label("DENTIST", 1180, 230, { to: [1180, 420] }); });
// L5 And that wasn't even the worst option.
shot(5, 0, (S) => { S.bg("white"); rock(S, 600, 560, 1.8); S.label("OPTION 1", 600, 330); fl(S, rrect(1100, 330, 420, 420, 30), "#2b2b2b", { w: 7 }); S.label("?", 1310, 610, { size: 260, c: "#ffffff" }); S.label("WORSE", 1310, 290, { c: C.red }); });
// L6 For most of human history… no painkiller, no dentist, no idea why teeth rot
shot(6, 0, (S) => { S.bg("white", { floor: false }); fl(S, rrect(160, 470, 1600, 90, 30), "#2b2b2b", { w: 7 }); fl(S, rrect(1720, 470, 40, 90, 12), C.yel, { w: 5 }); S.label("HUMAN HISTORY", 960, 380); S.label("US", 1740, 680, { c: C.red, size: 70, to: [1740, 580] }); });
shot(6, 7, (S) => { S.bg("white", { floor: false }); pill(S, 960, 540, 3.4); S.cross(960, 540, 4.2, S.start, Q); S.label("NO PAINKILLER", 960, 250); });
shot(6, 9, (S) => { S.bg("white"); doc(S, 960, FLOOR, { s: 1.4, mood: "flat" }); S.cross(960, 520, 4.2, S.start, Q); S.label("NO DENTIST", 960, 160); });
shot(6, 12, (S) => { S.bg("white", { floor: false }); tooth(S, 760, 540, 1.8, { cavity: true, rot: true }); S.label("?", 1260, 650, { size: 380, c: C.red }); S.label("WHY?", 960, 190); });
// L7 So what did ancient humans actually do about toothache? (title question)
shot(7, 0, (S) => { S.bg("navy", { hy: 760 }); S.flame(1250, 860, 1.3, S.start, Q); const F = cave(S, 760, 860, { s: 1.6, mood: "cry", bandage: true, look: 4 }); pain(S, F.hd[0], F.hd[1] - 20, 120); S.label("TOOTHACHE?", 960, 170, { c: C.yel, halo: "#111111", size: 120 }); });
// L8 flint, worms, hair, frogs, and one very bad decision
shot(8, 3, (S) => { S.bg("kraft", { floor: false }); flint(S, 960, 520, 3); S.label("FLINT", 960, 200); });
shot(8, 4, (S) => { S.bg("kraft", { floor: false }); worm(S, 900, 560, 2.4, { mood: "evil" }); S.label("WORMS", 960, 200); });
shot(8, 5, (S) => { S.bg("kraft", { floor: false }); hairBall(S, 960, 560, 2); S.label("HAIR", 960, 200); });
shot(8, 6, (S) => { S.bg("kraft", { floor: false }); frog(S, 960, 600, 2.3); S.label("FROGS", 960, 200); });
shot(8, 8, (S) => { S.bg("black"); wheat(S, 700, 820, 2.2); sugar(S, 1250, 760, 1.6); S.label("ONE BAD DECISION", 960, 170, { c: "#ffffff" }); S.label("?", 960, 640, { size: 200, c: C.red }); });
// L9 why it hurts so much
shot(9, 0, (S) => { S.bg("white"); const F = you(S, 960, FLOOR, { s: 1.6, mood: "cry", bandage: true }); pain(S, F.hd[0], F.hd[1] - 20, 130); S.label("WHY SO MUCH?", 960, 140); });
// L10 Inside every tooth… pulp
shot(10, 0, (S) => { S.bg("blueprint", { floor: false }); tooth(S, 960, 520, 2.6); S.label("INSIDE", 960, 140, { c: "#ffffff" }); });
shot(10, 12, (S) => { S.bg("blueprint", { floor: false }); tooth(S, 960, 520, 2.6, { pulp: true }); S.label("PULP", 1500, 420, { c: C.yel, to: [1040, 520] }); S.label("NERVES + BLOOD", 960, 140, { c: "#ffffff", size: 72 }); });
// L11 a box made of the hardest material in your body
shot(11, 0, (S) => { S.bg("blueprint", { floor: false }); tooth(S, 960, 520, 2.6, { pulp: true }); S.label("ENAMEL", 1500, 330, { c: C.yel, to: [1170, 360] }); S.label("HARDEST IN YOUR BODY", 960, 140, { c: "#ffffff", size: 72 }); });
// L12 bacteria get in / pulp swells
shot(12, 0, (S) => { S.bg("blueprint", { floor: false }); tooth(S, 960, 520, 2.6, { pulp: true, cavity: true }); bact(S, 640, 230, 1.3); bact(S, 820, 170, 0.9); S.label("BACTERIA", 1420, 200, { c: C.yel, to: [870, 320] }); });
shot(12, 5, (S) => { S.bg("blueprint", { floor: false }); tooth(S, 960, 520, 2.6, { cavity: true }); fl(S, closed(960, 520, 2.6, [[-70, 20], [-74, -40], [-40, -55], [0, -45], [40, -55], [74, -40], [70, 20], [50, 80], [36, 125], [0, 70], [-36, 125], [-50, 80]]), C.nerve, { w: 4 }); S.label("SWELLS", 960, 140, { c: C.yel }); });
// L13 But the box doesn't.
shot(13, 0, (S) => { S.bg("blueprint", { floor: false }); tooth(S, 960, 520, 2.6, { pulp: true }); S.ring(960, 560, 290, 360, S.start, Q, { c: C.yel }); S.label("NO ROOM", 960, 140, { c: C.yel }); });
// L14 crushes the nerve… in time with your heartbeat
shot(14, 0, (S) => { S.bg("danger", { floor: false }); tooth(S, 960, 640, 2.1, { pulp: true, pain: true }); S.label("CRUSH", 960, 120, { c: "#ffffff" }); });
shot(14, 9, (S) => { S.bg("danger", { floor: false }); S.heart(620, 520, 4.4, S.start, Q); S.label("=", 960, 580, { size: 200, c: "#ffffff" }); tooth(S, 1320, 540, 1.6, { pain: true }); S.label("THUMP. THUMP.", 960, 170, { c: "#ffffff" }); });
// L15 That throbbing? That's your own pulse, used against you. [S]
shot(15, 0, (S) => { S.bg("white"); const F = you(S, 760, FLOOR, { s: 1.5, mood: "angry", bandage: true, look: 5 }); S.heart(1300, 470, 3.2, S.start, Q); [-1, 1].forEach((sd) => fl(S, circ(1300 + sd * 40, 440, 12), INK, { w: 2 })); dr(S, smooth([[1260, 500], [1300, 490], [1340, 500]]), { w: 5 }); S.label("TRAITOR", 1300, 250, { c: C.red }); });
// L16 the pain was the good news
shot(16, 0, (S) => { S.bg("white", { floor: false }); tooth(S, 640, 520, 1.8, { pain: true }); S.label("PAIN", 640, 900); S.label("=", 960, 560, { size: 180 }); S.label("GOOD NEWS", 1350, 560, { c: C.green }); });
// L17 spread into the jaw, the neck, and the blood
shot(17, 0, (S) => { S.bg("danger", { floor: false }); const F = cave(S, 960, 1100, { s: 2.6, mood: "worried", look: 0 }); fl(S, circ(F.hd[0] + F.r * 0.5, F.hd[1] + F.r * 0.45, 22), C.red, { w: 4 }); S.label("INFECTED", 1450, 200, { c: "#ffffff", to: [F.hd[0] + F.r * 0.6, F.hd[1] + F.r * 0.4] }); });
shot(17, 6, (S) => { S.bg("danger", { floor: false }); const F = cave(S, 960, 1100, { s: 2.6, mood: "wow" }); const sx = F.hd[0] + F.r * 0.5, sy = F.hd[1] + F.r * 0.45; fl(S, circ(sx, sy, 34), C.red, { w: 4 }); S.arrow(sx, sy + 30, sx - 30, sy + 200, S.start, Q, { c: C.red, w: 8 }); S.label("JAW. NECK.", 1460, 180, { c: "#ffffff" }); });
shot(17, 10, (S) => { S.bg("danger", { floor: false }); blood(S, 960, 560, 3); S.label("BLOOD", 960, 180, { c: "#ffffff" }); });
// L18 Before antibiotics… killed more than half
shot(18, 0, (S) => { S.bg("white", { floor: false }); pill(S, 960, 540, 3.4); S.cross(960, 540, 4.2, S.start, Q); S.label("NO ANTIBIOTICS", 960, 250); });
shot(18, 7, (S) => { S.bg("white"); for (let i = 0; i < 10; i++) mini(S, 240 + i * 160, 700, 2, PAPER, i < 6); S.label("MORE THAN HALF", 960, 230, { c: C.red }); });
// L19 300,000 years ago… Zambia… 10 of 15 teeth
shot(19, 0, (S) => { S.bg("kraft"); skull(S, 960, 560, 2.1, { bad: [-3, -1, 0, 2, 3] }); S.label("300,000 YEARS AGO", 960, 150, { c: C.red }); });
shot(19, 7, (S) => { S.bg("blueprint", { floor: false }); land(S, 960, 560, 900, 700, "#c9b27a"); pin(S, 1060, 620, 1.6); S.label("ZAMBIA", 1060, 760, { c: "#ffffff", halo: "#111111", haloW: 0.1 }); });
shot(19, 12, (S) => { S.bg("kraft", { floor: false }); nums(S, 960, 560, 10, 5, C.rot, 15); S.label("10 OF 15 TEETH", 960, 170, { c: C.red }); S.label("CAVITIES", 960, 980); });
// L20 Some researchers think the infection is what killed him.
shot(20, 0, (S) => { S.bg("kraft"); skull(S, 1250, 600, 1.5, { bad: [-3, -1, 0, 2, 3] }); doc(S, 620, FLOOR, { s: 1.4, mood: "worried", look: 5 }); S.magnifier(930, 470, 80, S.start, Q); S.label("INFECTION?", 1250, 220, { c: C.red }); });
// L21 they weren't being dramatic.
shot(21, 0, (S) => { S.bg("navy", { hy: 760 }); const F = cave(S, 960, 860, { s: 1.7, mood: "cry", bandage: true }); S.label("DRAMATIC?", 960, 160, { c: "#ffffff" }); S.label("NO.", 1520, 520, { c: C.red, size: 120 }); });
// L22 They were in danger.
shot(22, 0, (S) => { S.bg("black"); cave(S, 760, 900, { s: 1.5, mood: "wow", bandage: true, look: 5 }); skull(S, 1350, 560, 1.6, { bad: [0, 1] }); S.label("DANGER.", 960, 170, { c: C.red, size: 120 }); }, { cam: "push" });
// ===== THE FIRST DENTISTS (lines 23–55) =====
const stick = (S, x1, y1, x2, y2) => dr(S, line([x1, y1], [x2, y2], 2), { w: 8, c: C.wood });
const teethRow = (S, x, y, k, n, o = {}) => { for (let i = 0; i < n; i++) tooth(S, x + (i - (n - 1) / 2) * 230 * k, y + (o.off === i ? -40 * k : 0), k, Object.assign({}, (o.each || (() => ({})))(i))); };
const card = (S, txt, o = {}) => { S.bg(o.bg || "black"); S.label(txt, 960, o.y || 600, { size: o.size || 170, c: o.c || "#ffffff" }); };

// L23 The first treatment we can see is surprisingly human.
shot(23, 0, (S) => { S.bg("kraft"); cave(S, 960, FLOOR, { s: 1.7, mood: "smile" }); S.label("SURPRISINGLY HUMAN", 960, 150); });
// L24 130,000 years ago, a Neanderthal in Croatia… tooth pushed out of place
shot(24, 0, (S) => { S.bg("navy", { hy: 760 }); S.flame(1300, 860, 1.2, S.start, Q); cave(S, 760, 860, { s: 1.5, mood: "flat", hair: "spiky", hairC: "#4a3018", look: 4 }); S.label("130,000 YEARS AGO", 960, 160, { c: C.yel }); });
shot(24, 8, (S) => { S.bg("kraft"); const F = cave(S, 700, FLOOR, { s: 1.7, mood: "worried", hair: "spiky", hairC: "#4a3018", look: 4, bandage: true }); S.label("NEANDERTHAL", 700, 140); land(S, 1380, 520, 420, 300, "#a8c97f"); pin(S, 1380, 540, 1.2); S.label("CROATIA", 1380, 760, { size: 64 }); });
shot(24, 12, (S) => { S.bg("white", { floor: false }); teethRow(S, 960, 600, 0.95, 5, { off: 3, each: (i) => (i === 3 ? { pain: true } : {}) }); S.label("PUSHED OUT OF PLACE", 960, 170, { c: C.red, to: [1400, 380] }); });
// L25 what you do with your tongue every time something feels wrong
shot(25, 0, (S) => { S.bg("roomNight", { window: false }); const F = you(S, 960, 790, { s: 1.5, mood: "worried", look: 6 }); fl(S, closed(F.hd[0] + F.r * 0.3, F.hd[1] + F.r * 0.62, 1, [[-14, 0], [14, 0], [16, 20], [0, 30], [-16, 20]]), "#e8667a", { w: 4 }); S.label("YOU DO THIS TOO", 960, 150, { c: "#ffffff" }); });
// L26 They poked at it.
shot(26, 0, (S) => { S.bg("kraft"); const F = cave(S, 900, FLOOR, { s: 1.8, mood: "worried", hair: "spiky", hairC: "#4a3018", pose: "think", look: 3 }); stick(S, F.hand("R", "think")[0], F.hand("R", "think")[1] + 10, F.hd[0] + F.r * 0.3, F.hd[1] + F.r * 0.55); S.label("POKE.", 1450, 400, { size: 130, c: C.red }); });
// L27 Over and over, stick or grass… until it left grooves
shot(27, 0, (S) => { S.bg("kraft", { floor: false }); stick(S, 520, 760, 820, 300); [0, 1, 2].forEach((i) => dr(S, smooth([[1250 + i * 60, 820], [1230 + i * 70, 560], [1290 + i * 50, 300]]), { w: 9, c: "#5f9e3a" })); S.label("STICK", 640, 900); S.label("GRASS", 1320, 900); S.label("OVER AND OVER", 960, 150, { c: C.red }); });
shot(27, 11, (S) => { S.bg("kraft", { floor: false }); tooth(S, 860, 540, 2.4, { grooves: true }); S.magnifier(1280, 640, 150, S.start, Q); S.label("GROOVES", 1350, 250, { c: C.red, to: [1050, 620] }); });
// L28 The first dental patient was also the first dentist. [S]
shot(28, 0, (S) => { S.bg("white"); cave(S, 480, FLOOR, { s: 1.5, mood: "cry", hair: "spiky", hairC: "#4a3018", bandage: true }); S.label("PATIENT", 480, 170); S.divider(960, S.start); const F = cave(S, 1440, FLOOR, { s: 1.5, mood: "determined", hair: "spiky", hairC: "#4a3018", pose: "point", look: -2, bandage: true }); stick(S, F.hand("R", "point")[0] - 10, F.hand("R", "point")[1], F.hand("R", "point")[0] + 70, F.hand("R", "point")[1] - 40); S.label("DENTIST", 1440, 170, { c: C.red }); });
// L29 Then, 14,000 years ago, came the young man in the Alps.
shot(29, 0, (S) => { alps(S); cave(S, 1450, 900, { s: 1.4, mood: "worried", bandage: true, look: -3 }); S.label("14,000 YEARS AGO", 900, 160, { c: C.red }); });
// L30 molar rotting / tiny sharp flint / scraped the decay out
shot(30, 0, (S) => { S.bg("white", { floor: false }); tooth(S, 960, 540, 2.6, { rot: true, cavity: true, face: "sad" }); S.label("ROTTING", 960, 140, { c: C.rot }); });
shot(30, 9, (S) => { S.bg("white", { floor: false }); flint(S, 960, 520, 3.4); S.label("SHARP FLINT", 960, 140); });
shot(30, 12, (S) => { S.bg("white", { floor: false }); tooth(S, 820, 560, 2.4, { cavity: true, face: "pain", pain: true }); flint(S, 1260, 420, 1.4); [0, 1, 2].forEach((i) => dr(S, line([1150 - i * 20, 300 + i * 40], [1210 - i * 20, 260 + i * 40], 1), { w: 5, c: INK })); S.label("SCRAPE", 1400, 820, { c: C.red }); });
// L31 Scratch by scratch.
shot(31, 0, (S) => { S.bg("white", { floor: false }); tooth(S, 960, 560, 3, { cavity: true }); for (let i = 0; i < 6; i++) dr(S, line([780 + i * 30, 340 + (i % 2) * 20], [840 + i * 30, 300 + (i % 2) * 20], 1), { w: 5, c: C.red }); S.label("SCRATCH. SCRATCH.", 960, 140, { c: C.red }); });
// L32 While he was awake.
shot(32, 0, (S) => { S.bg("desert", { hy: 720 }); const F = cave(S, 760, 980, { s: 2.3, mood: "wow", bandage: true }); S.label("AWAKE.", 1400, 460, { c: C.red, size: 150 }); }, { cam: "push" });
// L33 Relaxing. [S]
shot(33, 0, (S) => card(S, "RELAXING.", { bg: "chalk" }));
// L34 It is the oldest dental operation ever found.
shot(34, 0, (S) => { S.bg("kraft"); S.trophy(700, FLOOR - 10, 1.8, S.start, Q); tooth(S, 1260, 520, 1.8, { cavity: true }); S.label("OLDEST OPERATION EVER", 960, 150); });
// L35 A thousand years later, near Lucca in Italy, someone went further.
shot(35, 0, (S) => { S.bg("blueprint", { floor: false }); fl(S, poly([[880, 260], [1010, 300], [1080, 470], [1200, 610], [1300, 700], [1260, 760], [1170, 720], [1100, 820], [1020, 760], [980, 610], [880, 470], [840, 330]], 3), "#c9b27a", { w: 7 }); pin(S, 960, 450, 1.2); S.label("LUCCA", 760, 420, { c: "#ffffff" }); S.label("1,000 YEARS LATER", 960, 150, { c: C.yel }); });
// L36 opened two rotten front teeth… filled the holes
shot(36, 0, (S) => { S.bg("white", { floor: false }); [-1, 1].forEach((sd) => tooth(S, 960 + sd * 170, 520, 1.9, { kind: "incisor", hole: C.rot, pulp: true })); S.label("TO THE NERVE", 960, 140, { c: C.red }); });
shot(36, 12, (S) => { S.bg("white", { floor: false }); [-1, 1].forEach((sd) => tooth(S, 960 + sd * 170, 520, 1.9, { kind: "incisor", hole: "#9aa0a6" })); S.label("FILLED", 960, 140); S.label("?", 1420, 560, { size: 220, c: C.red }); });
// L37–39 With tar. / plant fibres. / what looks like hair.
const fredian = (S, extra) => { S.bg("white", { floor: false }); [-1, 1].forEach((sd) => tooth(S, 960 + sd * 170, 540, 1.9, { kind: "incisor", hole: C.tar })); if (extra >= 1) [0, 1, 2].forEach((i) => dr(S, smooth([[760 + i * 30, 420], [800 + i * 30, 380], [840 + i * 30, 430]]), { w: 4, c: "#6cc04a" })); if (extra >= 2) dr(S, smooth([[1100, 400], [1140, 360], [1170, 410], [1200, 370]]), { w: 3, c: "#5a3a1e" }); };
shot(37, 0, (S) => { fredian(S, 0); S.label("TAR", 960, 140, { size: 130 }); });
shot(38, 0, (S) => { fredian(S, 1); S.label("+ PLANT FIBRES", 960, 140, { c: "#3a8a2a" }); });
shot(39, 0, (S) => { fredian(S, 2); S.label("+ HAIR?", 960, 140, { c: C.red, size: 120 }); });
// L40 Nobody knows why the hair was there.
shot(40, 0, (S) => { S.bg("kraft"); doc(S, 700, FLOOR, { s: 1.6, mood: "worried", pose: "shrug" }); hairBall(S, 1300, 560, 1.6); S.label("WHY?", 1300, 250, { c: C.red, size: 120 }); });
// L41 Honestly, nobody wants to know. [S]
shot(41, 0, (S) => { S.bg("kraft"); doc(S, 760, FLOOR, { s: 1.6, mood: "angry", pose: "push", look: 5 }); hairBall(S, 1400, 560, 1.2); S.label("NOPE.", 1400, 300, { c: C.red, size: 140 }); });
// L42 oldest filling on Earth
shot(42, 0, (S) => { S.bg("kraft"); S.trophy(640, FLOOR - 10, 1.8, S.start, Q); tooth(S, 1240, 520, 1.8, { kind: "incisor", hole: C.tar }); S.label("OLDEST FILLING ON EARTH", 960, 150); });
// L43 9,000 years ago, Pakistan / farmers went full power tool
shot(43, 0, (S) => { S.bg("blueprint", { floor: false }); land(S, 960, 560, 900, 620, "#d4b77a"); pin(S, 1000, 600, 1.6); S.label("PAKISTAN", 1000, 760, { c: "#ffffff", halo: "#111111", haloW: 0.1 }); S.label("9,000 YEARS AGO", 960, 150, { c: C.yel }); });
shot(43, 9, (S) => { S.bg("desert", { hy: 700 }); cave(S, 620, 920, { s: 1.5, mood: "determined", hair: "short", look: 4 }); bowDrill(S, 1250, 600, 1.4); S.bolt(1500, 330, 1.2, S.start, Q, { c: C.yel }); S.label("POWER TOOL", 1100, 150, { c: C.red }); });
// L44 bow drills they used to make beads / drilled into living people's molars
shot(44, 0, (S) => { S.bg("desert", { hy: 700 }); bowDrill(S, 700, 560, 1.3); for (let i = 0; i < 7; i++) fl(S, circ(1150 + i * 80, 600 + Math.sin(i) * 20, 30), ["#e07a3f", "#2f6fd6", "#f2c14e"][i % 3], { w: 5 }); S.label("BEADS", 1390, 450); });
shot(44, 10, (S) => { S.bg("white", { floor: false }); tooth(S, 960, 620, 1.8, { face: "pain", pain: true }); bowDrill(S, 960, 200, 1); S.label("LIVING PEOPLE", 960, 1000, { c: C.red, size: 72 }); });
// L45 we know they were alive / edges kept wearing down from chewing
shot(45, 0, (S) => { S.bg("desert", { hy: 700 }); cave(S, 960, 920, { s: 1.6, mood: "smile", hair: "short" }); S.tick(1300, 360, 3, S.start, Q); S.label("ALIVE", 1300, 220, { c: C.green }); });
shot(45, 6, (S) => { S.bg("white", { floor: false }); tooth(S, 860, 520, 2.1, { hole: "#3a3a3a" }); S.magnifier(1360, 560, 150, S.start, Q); S.label("WORN EDGES", 1360, 260, { c: C.red, to: [960, 420] }); S.label("= STILL CHEWING", 960, 980, { size: 70 }); });
// L46 Eleven drilled teeth, from nine adults.
shot(46, 0, (S) => { S.bg("white", { floor: false }); for (let i = 0; i < 11; i++) { const x = 330 + (i % 6) * 250 + (i >= 6 ? 125 : 0), y = i < 6 ? 470 : 760; fl(S, closed(x, y, 0.6, MOLAR), "#ffffff", { w: 5 }); fl(S, circ(x - 10, y - 20, 10), INK, { w: 2 }); } S.label("11 TEETH. 9 ADULTS.", 960, 160, { c: C.red }); });
// L47 And here's the strange part.
shot(47, 0, (S) => card(S, "THE STRANGE PART", { bg: "chalk", size: 140 }));
// L48 Most of those teeth show no sign of decay.
shot(48, 0, (S) => { S.bg("white", { floor: false }); teethRow(S, 960, 580, 1.3, 4, { each: () => ({ hole: "#3a3a3a" }) }); S.label("NO DECAY", 960, 160, { c: C.green }); });
// L49 So were they treating pain?
shot(49, 0, (S) => { S.bg("white", { floor: false }); tooth(S, 760, 560, 2.2, { pain: true, face: "pain" }); S.label("?", 1300, 660, { size: 360, c: C.red }); S.label("TREATING PAIN?", 960, 150); });
// L50 Testing a new hobby? [S]
shot(50, 0, (S) => { S.bg("desert", { hy: 700 }); const F = cave(S, 720, 920, { s: 1.6, mood: "happy", hair: "short", look: 4 }); bowDrill(S, 1240, 560, 1.2); S.label("NEW HOBBY?", 1100, 150, { c: C.red }); });
// L51 Nobody knows.
shot(51, 0, (S) => { S.bg("kraft"); doc(S, 960, FLOOR, { s: 1.6, mood: "flat", pose: "shrug" }); S.label("NOBODY KNOWS", 960, 140); });
// L52 the drill is still the scariest sound in the building [S]
shot(52, 0, (S) => { S.bg("room", { window: false }); const F = you(S, 760, 790, { s: 1.6, mood: "wow", look: 5 }); S.speech(1350, 380, 260, 130, 1180, 520, S.start, Q); S.label("BZZZZZ", 1350, 405, { c: C.red, size: 90 }); S.label("STILL SCARY", 960, 140); });
// L53 Slovenia, 6,500 years ago / cracked tooth with beeswax
shot(53, 0, (S) => { S.bg("blueprint", { floor: false }); land(S, 960, 560, 700, 480, "#a8c97f"); pin(S, 960, 600, 1.6); S.label("SLOVENIA", 960, 760, { c: "#ffffff", halo: "#111111", haloW: 0.1 }); S.label("6,500 YEARS AGO", 960, 150, { c: C.yel }); });
shot(53, 11, (S) => { S.bg("white", { floor: false }); tooth(S, 860, 560, 2.4, { kind: "incisor", crack: true }); fl(S, closed(860, 560, 2.4, [[2, -96], [16, -60], [14, -20], [0, 22], [-8, -20], [-10, -60]]), C.wax, { w: 3 }); jar(S, 1400, 600, 1.3, C.wax, "WAX"); S.label("BEESWAX", 960, 140, { c: "#c98d00" }); });
// L54 So the tools were there.
shot(54, 0, (S) => { S.bg("kraft", { floor: false }); flint(S, 520, 560, 2); bowDrill(S, 960, 600, 1); jar(S, 1400, 600, 1.1, C.wax); [520, 960, 1400].forEach((x) => S.tick(x, 860, 1.6, S.start, Q)); S.label("TOOLS", 960, 150); });
// L55 What was missing was an explanation.
shot(55, 0, (S) => { S.bg("chalk", { floor: false }); tooth(S, 760, 560, 2.2, { cavity: true }); S.label("?", 1300, 660, { size: 380, c: "#ffffff" }); S.label("BUT WHY?", 960, 150, { c: C.yel }); });
// ===== THE WORM + ANCIENT REMEDIES + FAUCHARD (lines 56–95) =====
const pyramid = (S, x, y, w) => { fl(S, poly([[x - w / 2, y], [x, y - w * 0.62], [x + w / 2, y], [x - w / 2, y]], 2), "#e0c27a", { w: 7 }); dr(S, line([x, y - w * 0.62], [x + w * 0.12, y], 1), { w: 4 }); };
const peg = (S, x, y, s = 1) => fl(S, closed(x, y, s, [[-18, -120], [18, -120], [16, 60], [0, 110], [-16, 60]]), C.wood, { w: 6 });
const mud = (S, x, y, s = 1) => fl(S, closed(x, y, s, [[-200, 30], [-160, -40], [-60, -60], [40, -50], [150, -60], [210, 10], [140, 60], [-120, 60]]), "#7a5230", { w: 7 });
const egyptian = (S, x, gy, o = {}) => person(S, x, gy, Object.assign({ hair: "short", hairC: "#111111", outfit: "apron", outfitC: "#f4ecd8" }, o));
const roman = (S, x, gy, o = {}) => person(S, x, gy, Object.assign({ hair: "curly", hairC: "#3a2a1a", outfit: "tunic", outfitC: "#f4ecd8" }, o));
const tusk = (S, x, y, s = 1) => fl(S, smooth(pts(x, y, s, [[-120, 60], [-40, 0], [60, -60], [130, -150], [100, -60], [20, 30], [-100, 90], [-120, 60]])), "#f6efd9", { w: 6 });
const wigDoc = (S, x, gy, o = {}) => person(S, x, gy, Object.assign({ hair: "curly", hairC: "#eeeeee", outfit: "tee", outfitC: "#5b3a8c" }, o));

// L56 they invent one
shot(56, 0, (S) => { S.bg("kraft"); const F = cave(S, 800, FLOOR, { s: 1.7, mood: "smile", pose: "think", look: 3 }); S.bulb(F.hd[0] + 230, F.hd[1] - 140, 1.3, S.start, Q); S.label("INVENT ONE", 1350, 520, { c: C.red }); });
// L57 Mesopotamia / scribes wrote down a myth
shot(57, 0, (S) => { S.bg("desert", { hy: 720 }); tablet(S, 960, 520, 1.1); S.label("MESOPOTAMIA", 960, 150); });
shot(57, 3, (S) => { S.bg("desert", { hy: 720 }); person(S, 640, 930, { s: 1.5, hair: "curly", hairC: "#1a1a1a", outfit: "tunic", outfitC: "#d9c08a", mood: "determined", pose: "reach", look: 4 }); tablet(S, 1260, 560, 0.9); S.label("A MYTH", 1260, 150, { c: C.red }); });
// L58 heavens / earth / rivers / mud
shot(58, 0, (S) => { S.bg("space"); S.label("THE HEAVENS", 960, 560, { c: "#ffffff", size: 110 }); });
shot(58, 5, (S) => { S.bg("day", { hy: 620 }); S.label("THE EARTH", 960, 300, { size: 110 }); });
shot(58, 7, (S) => { S.bg("day", { hy: 600 }); dr(S, smooth([[-50, 820], [400, 760], [900, 880], [1400, 760], [1970, 840]]), { w: 120, c: "#4a9fe0" }); S.label("THE RIVERS", 960, 300, { size: 110 }); });
shot(58, 9, (S) => { S.bg("kraft", { floor: false }); mud(S, 960, 620, 2.4); S.label("THE MUD", 960, 300, { size: 110 }); });
// L59 And the mud created a worm.
shot(59, 0, (S) => { S.bg("kraft", { floor: false }); mud(S, 900, 760, 2); worm(S, 940, 500, 2.2, { mood: "evil" }); S.label("A WORM.", 960, 160, { c: C.red, size: 120 }); });
// L60 live between the tooth and the gum / drink its blood
shot(60, 0, (S) => { S.bg("white", { floor: false }); tooth(S, 1280, 560, 2.2, { face: "flat" }); worm(S, 560, 600, 1.6); S.speech(620, 280, 300, 110, 600, 460, S.start, Q); S.label("CAN I LIVE HERE?", 620, 300, { size: 54 }); });
shot(60, 11, (S) => { S.bg("white", { floor: false }); tooth(S, 960, 600, 2.4, { face: "pain", pain: true }); worm(S, 820, 330, 1.2, { mood: "evil" }); blood(S, 1120, 300, 0.7); S.label("SLURP", 1450, 300, { c: C.red, size: 110 }); });
// L61 That was the diagnosis. [S]
shot(61, 0, (S) => { S.bg("chalk", { floor: false }); papyrus(S, 960, 560, 900, 560, 0); S.label("DIAGNOSIS:", 960, 470, { size: 90 }); S.label("WORM.", 960, 650, { c: C.red, size: 150 }); });
// L62 the cure was a spell, read aloud / while a peg was driven in
shot(62, 0, (S) => { S.bg("desert", { hy: 720 }); person(S, 700, 930, { s: 1.5, hair: "curly", hairC: "#1a1a1a", outfit: "tunic", outfitC: "#7b2d8b", mood: "determined", pose: "armsUp", look: 4 }); S.speech(1300, 380, 320, 130, 950, 500, S.start, Q); dr(S, smooth([[1150, 390], [1200, 360], [1250, 400], [1300, 360], [1350, 400], [1400, 360], [1450, 390]]), { w: 7, c: "#7b2d8b" }); S.label("A SPELL", 960, 140); });
shot(62, 7, (S) => { S.bg("white", { floor: false }); tooth(S, 760, 600, 2.2, { face: "pain", pain: true }); peg(S, 1300, 560, 2.4); S.label("A PEG", 1300, 170, { c: C.red }); });
// L63 last a few years / L64 It lasted for thousands.
shot(63, 0, (S) => { S.bg("white", { floor: false }); worm(S, 900, 560, 2); S.label("A FEW YEARS?", 960, 170); });
shot(64, 0, (S) => { S.bg("white", { floor: false }); fl(S, rrect(160, 640, 1600, 70, 30), "#2b2b2b", { w: 7 }); worm(S, 300, 560, 1); worm(S, 1000, 560, 1); worm(S, 1650, 560, 1); S.label("THOUSANDS OF YEARS", 960, 220, { c: C.red, size: 100 }); });
// L65 In Egypt / Hesy-Ra… "chief of the dentists"
shot(65, 0, (S) => { S.bg("desert", { hy: 760 }); pyramid(S, 1350, 780, 700); pyramid(S, 820, 780, 420); S.label("EGYPT", 960, 150); });
shot(65, 6, (S) => { S.bg("desert", { hy: 760 }); egyptian(S, 760, 960, { s: 1.7, mood: "determined", look: 4 }); S.tag(1350, 420, "CHIEF OF DENTISTS?", S.start, Q, { size: 56 }); S.label("HESY-RA", 760, 150); });
// L66 Or possibly "chief of the ivory carvers."
shot(66, 0, (S) => { S.bg("desert", { hy: 760 }); egyptian(S, 760, 960, { s: 1.7, mood: "flat", look: 4 }); tusk(S, 1360, 520, 1.8); S.tag(1350, 800, "CHIEF OF IVORY CARVERS?", S.start, Q, { size: 50 }); });
// L67 Historians are still arguing.
shot(67, 0, (S) => { S.bg("kraft"); doc(S, 640, FLOOR, { s: 1.5, mood: "angry", pose: "point", look: 4 }); doc(S, 1280, FLOOR, { s: 1.5, mood: "angry", pose: "pointL", hairC: "#3b2a20", look: -4 }); S.label("DENTIST!", 560, 220, { c: C.red }); S.label("IVORY!", 1360, 220, { c: C.red }); });
// L68 Either way, the man worked with teeth.
shot(68, 0, (S) => { S.bg("white", { floor: false }); tusk(S, 620, 560, 1.6); S.label("=", 960, 590, { size: 160 }); tooth(S, 1320, 540, 1.6); S.label("TEETH. EITHER WAY.", 960, 170); });
// L69 honey / onions / incense
shot(69, 0, (S) => { S.bg("desert", { hy: 800 }); jar(S, 960, 560, 2, "#f2c14e", "HONEY"); S.label("EGYPTIAN MEDICINE", 960, 150); });
shot(69, 4, (S) => { S.bg("desert", { hy: 800 }); onion(S, 960, 560, 2.2); S.label("ONIONS", 960, 150); });
shot(69, 6, (S) => { S.bg("desert", { hy: 800 }); incense(S, 960, 820, 2.4); S.label("INCENSE", 960, 150); });
// L70 Rome, Pliny / frog boiled in vinegar
shot(70, 0, (S) => { S.bg("white"); roman(S, 760, FLOOR, { s: 1.6, mood: "determined", look: 4 }); papyrus(S, 1340, 520, 420, 300, 4); S.label("PLINY. ROME.", 960, 150); });
shot(70, 9, (S) => { S.bg("white", { floor: false }); pot(S, 960, 640, 2); frog(S, 960, 470, 1.1, { sad: true }); S.label("FROG + VINEGAR", 960, 150, { c: C.red }); });
// L71 Or… eating the frog. [S]
shot(71, 0, (S) => { S.bg("room", { window: false }); you(S, 620, 790, { s: 1.6, mood: "angry", look: 6 }); fl(S, smooth(arcPts(1300, 650, 260, 0, 360, 24, 60)) + " Z", "#ffffff", { w: 7 }); frog(S, 1300, 590, 1.2, { sad: true }); S.label("OR... EAT IT", 1100, 150, { c: C.red }); });
// L72 Romans used urine as mouthwash?
shot(72, 0, (S) => { S.bg("white"); roman(S, 700, FLOOR, { s: 1.6, mood: "flat", look: 4 }); jar(S, 1320, 600, 1.6, "#f0e14a", "URINE?"); S.label("MOUTHWASH?", 960, 150); });
// L73 made fun of a foreigner for doing that
shot(73, 0, (S) => { S.bg("white"); roman(S, 640, FLOOR, { s: 1.6, mood: "happy", pose: "point", look: 5 }); person(S, 1340, FLOOR, { s: 1.5, hair: "messy", hairC: "#a0522d", outfit: "tunic", outfitC: "#5f7f3a", mood: "sad", look: -4 }); S.label("HA!", 640, 170, { c: C.red, size: 130 }); S.label("FOREIGNER", 1340, 200); });
// L74 a roast, not a routine [S]
shot(74, 0, (S) => { S.bg("chalk", { floor: false }); S.label("ROAST", 760, 470, { c: "#ffffff", size: 130 }); S.tick(1180, 430, 2.6, S.start, Q); S.label("ROUTINE", 760, 760, { c: "#ffffff", size: 130 }); S.cross(1180, 720, 1.4, S.start, Q); });
// L75 keep their teeth clean
shot(75, 0, (S) => { S.bg("white", { floor: false }); tooth(S, 960, 560, 2.4, { face: "happy" }); S.burst(960, 520, 300, 380, 12, S.start, Q, { c: C.gold }); S.label("CLEAN", 960, 140, { c: C.green }); });
// L76 papyrus 1,700 years old / oldest toothpaste recipe
shot(76, 0, (S) => { S.bg("desert", { hy: 800 }); papyrus(S, 960, 540, 900, 520, 6); S.label("1,700 YEARS OLD", 960, 160, { c: C.red }); });
shot(76, 9, (S) => { S.bg("desert", { hy: 800 }); papyrus(S, 960, 540, 900, 520, 0); S.label("OLDEST", 960, 470, { size: 90 }); S.label("TOOTHPASTE RECIPE", 960, 620, { size: 70, c: C.red }); });
// L77 rock salt / mint / dried iris / 20 grains of pepper
shot(77, 0, (S) => { S.bg("white", { floor: false }); [[-120, 40], [0, -40], [120, 30], [-40, 120], [80, 130]].forEach(([a, b]) => fl(S, poly([[960 + a - 50, 560 + b], [960 + a, 560 + b - 60], [960 + a + 50, 560 + b], [960 + a, 560 + b + 50], [960 + a - 50, 560 + b]], 2), "#f2f2f2", { w: 6 })); S.label("ROCK SALT", 960, 160); });
shot(77, 2, (S) => { S.bg("white", { floor: false }); fl(S, closed(960, 560, 3, [[0, -80], [50, -30], [40, 40], [0, 80], [-40, 40], [-50, -30]]), "#5fbf6a", { w: 7 }); dr(S, line([960, 330], [960, 800], 1), { w: 6, c: "#2f7f3a" }); S.label("MINT", 960, 160); });
shot(77, 3, (S) => { S.bg("white", { floor: false }); [0, 120, 240].forEach((a) => fl(S, closed(960, 520, 1, [[0, 0], [-60, -150], [0, -220], [60, -150]].map(([x, y]) => { const r = (a * Math.PI) / 180; return [x * Math.cos(r) - y * Math.sin(r), x * Math.sin(r) + y * Math.cos(r)]; })), "#8e6fd1", { w: 6 })); fl(S, circ(960, 520, 34), C.yel, { w: 5 }); S.label("DRIED IRIS", 960, 160); });
shot(77, 6, (S) => { S.bg("white", { floor: false }); for (let i = 0; i < 20; i++) fl(S, circ(560 + (i % 10) * 90, 480 + Math.floor(i / 10) * 140 + (i % 2) * 20, 26), "#2b2b2b", { w: 3 }); S.label("20 GRAINS OF PEPPER", 960, 170, { c: C.red }); });
// L78 Fresh breath, and a mouth on fire. [S]
shot(78, 0, (S) => { S.bg("white"); const F = you(S, 700, FLOOR, { s: 1.7, mood: "wow", look: 6 }); S.flame(F.hd[0] + 230, F.hd[1] + 120, 1.6, S.start, Q); S.flame(F.hd[0] + 400, F.hd[1] + 110, 1.2, S.start, Q); S.label("MOUTH ON FIRE", 1250, 160, { c: C.red }); });
// L79 Etruscans, tooth bridges out of gold
shot(79, 0, (S) => { S.bg("white", { floor: false }); teethRow(S, 960, 560, 1.1, 3, { each: () => ({ gold: true }) }); S.label("ETRUSCAN GOLD", 960, 160, { c: "#b8860b" }); });
// L80 China, 659 / a medical book / silver, tin and mercury paste
shot(80, 0, (S) => { S.bg("blueprint", { floor: false }); land(S, 960, 600, 1000, 640, "#e3c27a"); pin(S, 1000, 640, 1.6); S.label("CHINA", 1000, 780, { c: "#ffffff", halo: "#111111", haloW: 0.1 }); S.label("659 AD", 960, 150, { c: C.yel }); });
shot(80, 8, (S) => { S.bg("white", { floor: false }); S.book(960, 560, 2.2, S.start, Q); S.label("A MEDICAL BOOK", 960, 160); });
shot(80, 14, (S) => { S.bg("white", { floor: false }); tooth(S, 760, 560, 2.2, { hole: "#c0c6cc" }); S.label("SILVER", 1350, 380, { c: "#7a8088" }); S.label("TIN", 1350, 540, { c: "#7a8088" }); S.label("MERCURY", 1350, 700, { c: "#7a8088" }); });
// L81 a thousand years before Europe
shot(81, 0, (S) => { S.bg("white", { floor: false }); fl(S, rrect(200, 520, 1520, 50, 20), "#2b2b2b", { w: 6 }); pin(S, 380, 515, 1.1); pin(S, 1600, 515, 1.1); S.label("CHINA 659", 380, 700, { size: 64 }); S.label("EUROPE 1800s", 1560, 700, { size: 64 }); S.label("1,000+ YEARS EARLIER", 960, 220, { c: C.red }); });
// L82 But everywhere, the worm survived.
shot(82, 0, (S) => { S.bg("black"); worm(S, 900, 560, 2.6, { mood: "evil" }); S.label("THE WORM SURVIVED", 960, 170, { c: C.red }); });
// L83 Partly because people kept seeing it.
shot(83, 0, (S) => { S.bg("white", { floor: false }); S.eye(700, 540, 3, S.start, Q, { dx: 15 }); worm(S, 1300, 560, 1.3); S.label("PEOPLE SAW IT", 960, 170); });
// L84 burn henbane seeds near a patient's mouth
shot(84, 0, (S) => { S.bg("roomNight", { window: false }); you(S, 620, 790, { s: 1.6, mood: "worried", bandage: true, look: 5, hair: "messy", outfit: "tunic", outfitC: "#8b5a2b" }); S.flame(1250, 760, 1.6, S.start, Q); for (let i = 0; i < 8; i++) fl(S, circ(1150 + (i % 4) * 60, 800 + Math.floor(i / 4) * 30, 12), "#3b2a20", { w: 2 }); S.label("HENBANE SEEDS", 1150, 200, { c: "#ffffff" }); });
// L85 tiny curled shapes that looked exactly like worms
shot(85, 0, (S) => { S.bg("white", { floor: false }); for (let i = 0; i < 6; i++) { const x = 600 + (i % 3) * 300, y = 470 + Math.floor(i / 3) * 240; dr(S, smooth([[x - 60, y], [x - 30, y - 30], [x, y], [x + 30, y + 30], [x + 60, y]]), { w: 14, c: "#c9a37a" }); } S.label("LOOK LIKE WORMS", 960, 170, { c: C.red }); });
// L86 string in a bowl of water / and pointed
shot(86, 0, (S) => { S.bg("white", { floor: false }); fl(S, smooth(arcPts(960, 560, 360, 0, 180, 18, 220)) + " Z", "#9ad4f5", { w: 8 }); for (let i = 0; i < 4; i++) dr(S, smooth([[820 + i * 80, 600], [850 + i * 80, 640], [880 + i * 80, 600], [900 + i * 80, 650]]), { w: 5, c: "#f2f2f2" }); S.label("STRING", 960, 250); });
shot(86, 11, (S) => { S.bg("room", { window: false }); person(S, 620, 790, { s: 1.6, hair: "side", hairC: "#3b2a20", outfit: "apron", outfitC: "#6d4c2f", mood: "smile", pose: "point", look: 5 }); fl(S, smooth(arcPts(1300, 640, 240, 0, 180, 18, 140)) + " Z", "#9ad4f5", { w: 7 }); });
// L87 There it is. Your worm. / That'll be one coin. [S]
shot(87, 0, (S) => { S.bg("room", { window: false }); person(S, 620, 790, { s: 1.6, hair: "side", hairC: "#3b2a20", outfit: "apron", outfitC: "#6d4c2f", mood: "happy", pose: "point", look: 5 }); fl(S, smooth(arcPts(1300, 640, 240, 0, 180, 18, 140)) + " Z", "#9ad4f5", { w: 7 }); dr(S, smooth([[1220, 680], [1260, 650], [1300, 690], [1340, 650]]), { w: 6, c: "#f2f2f2" }); S.label("YOUR WORM.", 1250, 220, { c: C.red }); });
shot(87, 5, (S) => { S.bg("room", { window: false }); person(S, 760, 790, { s: 1.6, hair: "side", hairC: "#3b2a20", outfit: "apron", outfitC: "#6d4c2f", mood: "happy", pose: "reach", look: 5 }); coin(S, 1350, 520, 2); S.label("THAT'LL BE ONE COIN", 960, 160); });
// L88 patron saint / pulled by barbers, in the street, as a show
shot(88, 0, (S) => { S.bg("white"); const F = person(S, 820, FLOOR, { s: 1.7, hair: "bun", hairC: "#6b4423", outfit: "apron", outfitC: "#3d5a99", mood: "smile", halo: true, pose: "reach" }); pliers(S, F.hand("R", "reach")[0] + 40, F.hand("R", "reach")[1] - 60, 0.8, 30); S.label("PATRON SAINT OF TOOTHACHE", 960, 150); });
shot(88, 9, (S) => { S.bg("day", { hy: 700, clouds: 1 }); const B = person(S, 1060, 920, { s: 1.5, hair: "side", hairC: "#3b2a20", outfit: "apron", outfitC: "#c0392b", mood: "happy", pose: "reach", look: -4 }); you(S, 720, 920, { s: 1.4, mood: "cry", bandage: true, hair: "messy", outfit: "tunic", outfitC: "#8b5a2b" }); pliers(S, 860, 470, 0.7, -70); for (let i = 0; i < 5; i++) mini(S, 1340 + i * 110, 930, 1.3); S.label("STREET SHOW", 960, 150, { c: C.red }); });
// L89 Paris, Big Thomas / on a bridge, with a crowd watching
shot(89, 0, (S) => { S.bg("day", { hy: 720, clouds: 1 }); person(S, 960, 1060, { s: 2.1, hair: "curly", hairC: "#2a2220", outfit: "apron", outfitC: "#c0392b", mood: "happy" }); S.label("BIG THOMAS", 960, 140, { c: C.red, size: 110 }); });
shot(89, 8, (S) => { S.bg("day", { hy: 720, clouds: 1 }); bridge(S, 960, 560, 1500); for (let i = 0; i < 8; i++) mini(S, 400 + i * 160, 540, 1.2); S.label("PARIS", 960, 150); });
// L90 1728, Pierre Fauchard / 800 pages on teeth
shot(90, 0, (S) => { S.bg("white"); wigDoc(S, 760, FLOOR, { s: 1.7, mood: "determined", look: 4 }); S.label("1728", 1350, 380, { c: C.red, size: 160 }); S.label("PIERRE FAUCHARD", 960, 150); });
shot(90, 10, (S) => { S.bg("white"); for (let i = 0; i < 6; i++) fl(S, rect(760 - i * 4, 780 - i * 70, 400, 62), ["#e8d9b5", "#d9c49a"][i % 2], { w: 6 }); S.label("800 PAGES", 960, 170, { c: C.red }); });
// L91 He said there was no worm.
shot(91, 0, (S) => { S.bg("white", { floor: false }); worm(S, 900, 560, 2.2); S.cross(960, 540, 5, S.start, Q); S.label("NO WORM.", 960, 170, { c: C.red }); });
// L92 tin, lead, and even gold
shot(92, 0, (S) => { S.bg("white", { floor: false }); [["#c0c6cc", "TIN"], ["#6e737a", "LEAD"], [C.gold, "GOLD"]].forEach(([c, t], i) => { tooth(S, 520 + i * 440, 560, 1.4, { hole: c }); S.label(t, 520 + i * 440, 880, { c: i === 2 ? "#b8860b" : INK }); }); });
// L93 scraped, cleaned, 100+ dental diseases
shot(93, 0, (S) => { S.bg("white", { floor: false }); papyrus(S, 960, 580, 760, 600, 7); S.label("100+ DENTAL DISEASES", 960, 160, { c: C.red }); });
// L94 He blamed something else.
shot(94, 0, (S) => { S.bg("white"); wigDoc(S, 640, FLOOR, { s: 1.7, mood: "angry", pose: "point", look: 6 }); S.label("THE REAL VILLAIN:", 1300, 520); });
// L95 Sugar.
shot(95, 0, (S) => { S.bg("black"); sugar(S, 960, 780, 2.2); S.label("SUGAR.", 960, 220, { c: C.red, size: 170 }); }, { cam: "push" });
// ===== SUGAR ERA + TWIST + RELIEF + ENDING (lines 96–140) =====
const queen = (S, x, gy, o = {}) => person(S, x, gy, Object.assign({ hair: "bun", hairC: "#c0392b", outfit: "tee", outfitC: "#7b2d8b", crown: true }, o));
const washington = (S, x, gy, o = {}) => person(S, x, gy, Object.assign({ hair: "side", hairC: "#eeeeee", outfit: "tee", outfitC: "#1f3a68" }, o));
const wells = (S, x, gy, o = {}) => person(S, x, gy, Object.assign({ hair: "side", hairC: "#3b2a20", outfit: "tee", outfitC: "#2b2b2b" }, o));
const bundle = (S, x, y, s = 1) => { fl(S, closed(x, y, s, [[-90, -20], [-60, -70], [60, -70], [100, -10], [70, 60], [-70, 60]]), "#9ad4f5", { w: 6 }); fl(S, circ(x - 40 * s, y - 55 * s, 42 * s), PAPER, { w: 6 }); [-1, 1].forEach((sd) => fl(S, circ(x - 40 * s + sd * 14 * s, y - 58 * s, 4 * s), INK, { w: 1 })); };
const globe = (S, x, y, r) => { fl(S, circ(x, y, r), "#4a9fe0", { w: 8 }); fl(S, closed(x - r * 0.3, y - r * 0.2, r / 100, [[-40, -50], [30, -60], [50, 0], [10, 50], [-40, 30]]), C.grass, { w: 5 }); fl(S, closed(x + r * 0.4, y + r * 0.3, r / 100, [[-30, -30], [30, -40], [40, 20], [-20, 40]]), C.grass, { w: 5 }); };
const gift = (S, x, y, s = 1) => { fl(S, rect(x - 140 * s, y - 100 * s, 280 * s, 200 * s), C.red, { w: 7 }); fl(S, rect(x - 20 * s, y - 100 * s, 40 * s, 200 * s), C.gold, { w: 4 }); fl(S, rect(x - 160 * s, y - 140 * s, 320 * s, 50 * s), C.red, { w: 7 }); };
const rotGrid = (S, nRot, total, cols, label, c = C.red) => { S.bg("kraft", { floor: false }); nums(S, 960, 600, nRot, cols, C.rot, total, 0.75); S.label(label, 960, 170, { c }); };

// L96 couldn't stop eating it
shot(96, 0, (S) => { S.bg("white"); queen(S, 700, FLOOR, { s: 1.6, mood: "happy", look: 5, crown: false, hair: "curly", hairC: "#6b4423", outfitC: "#c27ba0" }); sugar(S, 1300, 760, 1.3); S.label("COULDN'T STOP", 960, 150, { c: C.red }); });
// L97 1598, a visitor / Queen Elizabeth I's teeth as black / blamed the English love of sugar
shot(97, 0, (S) => { S.bg("white"); person(S, 760, FLOOR, { s: 1.6, hair: "short", outfit: "tee", outfitC: "#5f7f3a", mood: "flat", pose: "hold", look: 4 }); S.label("1598", 1300, 420, { c: C.red, size: 170 }); S.label("A VISITOR WROTE:", 960, 150); });
shot(97, 6, (S) => { S.bg("white"); const F = queen(S, 960, FLOOR, { s: 2, mood: "happy" }); fl(S, rect(F.hd[0] - F.r * 0.22, F.hd[1] + F.r * 0.36, F.r * 0.44, F.r * 0.16), "#1a1a1a", { w: 2 }); S.label("BLACK TEETH", 1500, 300, { c: C.red, to: [F.hd[0] + 40, F.hd[1] + F.r * 0.45] }); S.label("ELIZABETH I", 420, 300); });
shot(97, 13, (S) => { S.bg("white", { floor: false }); sugar(S, 700, 760, 1.6); S.heart(1300, 520, 4, S.start, Q); S.label("ENGLAND LOVES SUGAR", 960, 160, { c: C.red }); });
// L98 Even the rich and powerful lost their teeth.
shot(98, 0, (S) => { S.bg("white"); queen(S, 700, FLOOR, { s: 1.6, mood: "sad" }); [0, 1, 2].forEach((i) => tooth(S, 1150 + i * 170, 650 + i * 60, 0.6, { rot: true })); S.label("EVEN THE RICH", 960, 150); });
// L99 Washington lost his first tooth at 24
shot(99, 0, (S) => { S.bg("white"); washington(S, 760, FLOOR, { s: 1.7, mood: "worried", look: 4 }); tooth(S, 1300, 640, 0.9); S.label("AGE 24", 1300, 380, { c: C.red, size: 120 }); S.label("GEORGE WASHINGTON", 960, 150); });
// L100 became president / exactly one of his own left
shot(100, 0, (S) => { S.bg("white"); washington(S, 960, FLOOR, { s: 1.6, mood: "determined", pose: "hips" }); S.label("PRESIDENT", 960, 150); });
shot(100, 6, (S) => { S.bg("white", { floor: false }); fl(S, closed(960, 600, 2.4, [[-170, 0], [-130, -70], [0, -95], [130, -70], [170, 0], [120, 25], [0, 10], [-120, 25]]), C.gum, { w: 7 }); tooth(S, 1160, 560, 0.7); S.label("TEETH LEFT: 1", 960, 170, { c: C.red }); });
// L101 One. [S]
shot(101, 0, (S) => card(S, "ONE.", { size: 260, c: C.red }));
// L102 not made of wood
shot(102, 0, (S) => { S.bg("white", { floor: false }); dentures(S, 960, 600, 2.2); S.label("WOOD?", 960, 170); S.label("NO.", 1500, 500, { c: C.red, size: 140 }); });
// L103 ivory, metal, animal teeth, human teeth / bought from enslaved people
shot(103, 0, (S) => { S.bg("white", { floor: false }); dentures(S, 960, 560, 2.2, { mixed: true }); S.label("IVORY. METAL.", 960, 820, { size: 80 }); S.label("ANIMAL + HUMAN TEETH", 960, 960, { size: 72 }); S.label("WHAT WAS IN THEM", 960, 170); });
shot(103, 11, (S) => { S.bg("black"); papyrus(S, 960, 600, 760, 420, 4); S.label("BOUGHT FROM ENSLAVED PEOPLE", 960, 170, { c: "#ffffff", size: 76 }); S.label("1784 LEDGER", 960, 920, { c: "#bbbbbb", size: 60 }); });
// L104 Waterloo / scavengers pulled teeth from the dead / dentists sold them as dentures
shot(104, 0, (S) => { S.bg("dusk", { hy: 700 }); for (let i = 0; i < 6; i++) fl(S, closed(300 + i * 270, 820 + (i % 2) * 40, 1, [[-50, 0], [-40, -40], [0, -55], [40, -40], [50, 0]]), "#555b63", { w: 5 }); S.label("WATERLOO, 1815", 960, 150); });
shot(104, 5, (S) => { S.bg("dusk", { hy: 700 }); const F = person(S, 800, 930, { s: 1.5, hair: "messy", hairC: "#3b2a20", outfit: "hoodie", outfitC: "#5a4a3a", mood: "flat", pose: "reach", look: 4 }); pliers(S, F.hand("R", "reach")[0] + 40, F.hand("R", "reach")[1] - 40, 0.6, 40); fl(S, closed(1350, 800, 1.4, [[-80, 60], [-90, -40], [0, -70], [90, -40], [80, 60]]), "#a0703c", { w: 6 }); S.label("SCAVENGERS", 960, 150, { c: C.red }); });
shot(104, 12, (S) => { S.bg("room", { window: false }); dentures(S, 960, 560, 1.8); S.tag(1400, 300, "FOR SALE", S.start, Q, { size: 56 }); S.label("SOLD AS DENTURES", 960, 150); });
// L105 Waterloo teeth
shot(105, 0, (S) => { S.bg("chalk", { floor: false }); dentures(S, 960, 620, 2); S.label("WATERLOO TEETH", 960, 200, { c: C.yel, size: 110 }); });
// L106 the famous claim / 1600s London, "teeth" a top cause of death
shot(106, 0, (S) => { S.bg("roomNight", { window: false }); you(S, 760, 790, { s: 1.6, mood: "wow", pose: "hold", look: 4 }); S.phone(1250, 500, 1.6, S.start, Q, { screen: "feed" }); S.label("FAMOUS CLAIM", 960, 150, { c: "#ffffff" }); });
shot(106, 9, (S) => { S.bg("kraft", { floor: false }); papyrus(S, 960, 600, 760, 560, 0); ["FEVER", "PLAGUE", "TEETH", "OLD AGE"].forEach((t, i) => S.label(t, 960, 430 + i * 105, { size: 64, c: t === "TEETH" ? C.red : INK })); S.label("LONDON, 1600s", 960, 150); });
// L107 on the old death records
shot(107, 0, (S) => { S.bg("kraft", { floor: false }); papyrus(S, 960, 600, 760, 560, 0); ["FEVER", "PLAGUE", "TEETH", "OLD AGE"].forEach((t, i) => S.label(t, 960, 430 + i * 105, { size: 64, c: t === "TEETH" ? C.red : INK })); S.ring(960, 620, 190, 60, S.start, Q); S.label("DEATH RECORDS", 960, 150); });
// L108 the man who studied those records / grouped "teeth" with children under two or three
shot(108, 0, (S) => { S.bg("white"); wigDoc(S, 640, FLOOR, { s: 1.6, mood: "worried", look: 5, glasses: true }); papyrus(S, 1300, 540, 520, 440, 5); S.magnifier(1220, 500, 90, S.start, Q); S.label("BUT WAIT", 960, 150); });
shot(108, 7, (S) => { S.bg("white", { floor: false }); S.label("\"TEETH\"", 620, 560, { size: 110, c: C.red }); S.label("=", 960, 570, { size: 160 }); bundle(S, 1320, 600, 1.8); S.label("UNDER 2 OR 3", 1320, 860, { size: 70 }); });
// L109 not adults
shot(109, 0, (S) => { S.bg("white"); you(S, 960, FLOOR, { s: 1.7, mood: "flat" }); S.cross(960, 500, 4, S.start, Q); S.label("NOT ADULTS", 960, 150); });
// L110 mostly babies / fevers and infections doctors didn't understand
shot(110, 0, (S) => { S.bg("navy", { hy: 800, moon: true }); bundle(S, 960, 600, 2.2); S.label("MOSTLY BABIES", 960, 170, { c: "#ffffff" }); });
shot(110, 11, (S) => { S.bg("navy", { hy: 800 }); doc(S, 960, 920, { s: 1.6, mood: "worried", pose: "shrug" }); S.label("FEVERS. INFECTIONS.", 960, 170, { c: "#ffffff" }); S.label("?", 1400, 560, { size: 260, c: C.yel }); });
// L111 true on paper, wrong in real life
shot(111, 0, (S) => { S.bg("white", { floor: false }); papyrus(S, 520, 560, 420, 340, 4); S.tick(520, 830, 2, S.start, Q); S.label("ON PAPER", 520, 240); S.divider(960, S.start); S.label("REAL LIFE", 1440, 240); S.cross(1440, 560, 2.4, S.start, Q); });
// L112 the part almost nobody talks about
shot(112, 0, (S) => card(S, "THE PART NOBODY TALKS ABOUT", { bg: "chalk", size: 100 }));
// L113 we imagine ancient humans had terrible teeth / modern dentistry rescued us
shot(113, 0, (S) => { S.bg("kraft"); const F = cave(S, 760, FLOOR, { s: 1.8, mood: "happy" }); fl(S, rect(F.hd[0] - F.r * 0.2, F.hd[1] + F.r * 0.36, F.r * 0.4, F.r * 0.14), C.rot, { w: 2 }); S.thought(1350, 330, 260, 130, 1050, 500, S.start, Q); S.label("TERRIBLE TEETH?", 1350, 350, { size: 56 }); });
shot(113, 10, (S) => { S.bg("white"); doc(S, 800, FLOOR, { s: 1.9, mood: "happy", pose: "armsUp" }); S.label("OUR HERO?", 1420, 420, { c: C.red, size: 110 }); });
// L114 The bones say something different.
shot(114, 0, (S) => { S.bg("kraft"); skull(S, 960, 600, 2, { bad: [] }); S.label("THE BONES DISAGREE", 960, 150, { c: C.red }); });
// L115 hunter-gatherers: cavities in only a small fraction
shot(115, 0, (S) => { rotGrid(S, 1, 15, 5, "HUNTER-GATHERERS: FEW CAVITIES", C.green); });
// L116 Morocco, 15,000 years ago / huge amounts of starchy acorns
shot(116, 0, (S) => { S.bg("blueprint", { floor: false }); land(S, 960, 600, 820, 560, "#d9b26a"); pin(S, 960, 640, 1.6); S.label("MOROCCO", 960, 780, { c: "#ffffff", halo: "#111111", haloW: 0.1 }); S.label("15,000 YEARS AGO", 960, 150, { c: C.yel }); });
shot(116, 10, (S) => { S.bg("desert", { hy: 720 }); cave(S, 620, 930, { s: 1.6, mood: "happy", look: 4 }); [[1150, 820], [1280, 820], [1410, 820], [1215, 720], [1345, 720], [1280, 620]].forEach(([x, y]) => acorn(S, x, y, 1)); S.label("ACORNS. LOTS.", 1100, 150, { c: C.red }); });
// L117 Half their teeth were rotten.
shot(117, 0, (S) => { rotGrid(S, 8, 16, 8, "HALF ROTTEN"); });
// L118 farming arrived, grain and starch took over
shot(118, 0, (S) => { S.bg("day", { hy: 620, clouds: 1 }); for (let i = 0; i < 9; i++) wheat(S, 300 + i * 170, 980, 1.3); cave(S, 1700, 930, { s: 1.3, mood: "smile", look: -3 }); S.label("FARMING", 960, 150); });
// L119 DNA in ancient tooth plaque / main cavity bacterium / exploded ~10,000 years ago
shot(119, 0, (S) => { S.bg("blueprint", { floor: false }); tooth(S, 760, 560, 2, { rot: true }); S.magnifier(1180, 500, 130, S.start, Q); S.label("ANCIENT PLAQUE DNA", 960, 150, { c: "#ffffff" }); });
shot(119, 10, (S) => { S.bg("blueprint", { floor: false }); bact(S, 960, 560, 3); S.label("THE CAVITY BACTERIUM", 960, 150, { c: C.yel }); });
shot(119, 14, (S) => { S.bg("white", { floor: false }); graph(S, 400, 300, 1100, 520, [[0, 0.05], [0.45, 0.08], [0.55, 0.35], [0.7, 0.55], [1, 0.62]], { dot: 2 }); S.label("10,000 YEARS AGO", 1000, 250, { c: C.red, size: 70 }); S.label("EXPLODED", 960, 960); });
// L120 boomed again: cheap sugar and white flour
shot(120, 0, (S) => { S.bg("white", { floor: false }); graph(S, 400, 300, 1100, 520, [[0, 0.05], [0.45, 0.08], [0.55, 0.35], [0.7, 0.55], [0.88, 0.6], [1, 1]], { dot: 5 }); sugar(S, 1620, 900, 0.7); S.label("BOOM AGAIN: SUGAR", 960, 960, { c: C.red }); });
// L121 The worm was never real.
shot(121, 0, (S) => { S.bg("chalk", { floor: false }); worm(S, 900, 560, 2.2); S.cross(960, 540, 5, S.start, Q); S.label("NEVER REAL", 960, 170, { c: "#ffffff" }); });
// L122 But the monster was.
shot(122, 0, (S) => { S.bg("black"); bact(S, 960, 600, 4.2, { c: "#5fae5a" }); S.label("THE MONSTER WAS.", 960, 160, { c: C.red }); }, { cam: "push" });
// L123 And we fed it.
shot(123, 0, (S) => { S.bg("black"); you(S, 600, 930, { s: 1.6, mood: "flat", pose: "reach", look: 5 }); bact(S, 1350, 560, 2.6); fl(S, rect(1000, 470, 70, 70), "#ffffff", { w: 5 }); S.label("WE FED IT.", 960, 160, { c: C.red, size: 120 }); });
// L124 The good news also came from a toothache.
shot(124, 0, (S) => { S.bg("white", { floor: false }); tooth(S, 960, 580, 2.4, { face: "happy" }); S.label("THE GOOD NEWS", 960, 150, { c: C.green }); });
// L125 1844, Horace Wells / a stage show, laughing gas / felt nothing
shot(125, 0, (S) => { S.bg("white"); wells(S, 760, FLOOR, { s: 1.7, mood: "flat", look: 4 }); S.label("1844", 1300, 400, { c: C.red, size: 170 }); S.label("HORACE WELLS, DENTIST", 960, 150); });
shot(125, 8, (S) => { S.bg("roomNight", { window: false }); S.spotlight(960, 0, 790, 560, S.start, Q); const F = person(S, 960, 790, { s: 1.6, hair: "curly", outfit: "tee", outfitC: "#c0392b", mood: "happy" }); gasBag(S, 1350, 420, 0.9); S.label("LAUGHING GAS", 960, 150, { c: C.yel }); });
shot(125, 17, (S) => { S.bg("roomNight", { window: false }); const F = person(S, 960, 790, { s: 1.6, hair: "curly", outfit: "tee", outfitC: "#c0392b", mood: "happy", pose: "armsUp" }); S.label("FELT NOTHING", 960, 150, { c: C.yel }); });
// L126 he breathed it himself / let a colleague pull out his own tooth
shot(126, 0, (S) => { S.bg("room", { window: false }); wells(S, 760, 790, { s: 1.7, mood: "determined", pose: "hold", look: 4 }); gasBag(S, 1150, 380, 0.8); S.label("THE NEXT DAY", 960, 150); });
shot(126, 7, (S) => { S.bg("room", { window: false }); wells(S, 700, 790, { s: 1.6, mood: "sleep", look: 4 }); const F = person(S, 1220, 790, { s: 1.6, hair: "short", outfit: "apron", outfitC: "#ffffff", mood: "determined", pose: "reachL", look: -4 }); pliers(S, 980, 380, 0.7, -80); S.label("HIS OWN TOOTH", 960, 150, { c: C.red }); });
// L127 He felt no pain.
shot(127, 0, (S) => { S.bg("room", { window: false }); wells(S, 760, 790, { s: 1.8, mood: "happy", pose: "armsUp" }); S.tick(1380, 520, 3, S.start, Q); S.label("NO PAIN", 1380, 300, { c: C.green, size: 110 }); });
// L128 prove it in front of students at Harvard
shot(128, 0, (S) => { S.bg("room", { window: false }); wells(S, 960, 700, { s: 1.4, mood: "smile", pose: "wave" }); for (let i = 0; i < 9; i++) mini(S, 260 + i * 175, 1000, 1.4); S.label("HARVARD", 960, 150); });
// L129 The patient cried out.
shot(129, 0, (S) => { S.bg("room", { window: false }); you(S, 960, 790, { s: 1.9, mood: "cry", bandage: true, hair: "side" }); S.label("OWWW!", 1450, 320, { c: C.red, size: 140 }); });
// L130 The audience laughed and called him a fraud.
shot(130, 0, (S) => { S.bg("room", { window: false }); wells(S, 960, 700, { s: 1.4, mood: "sad" }); for (let i = 0; i < 9; i++) mini(S, 260 + i * 175, 1000, 1.4); S.label("FRAUD!", 500, 300, { c: C.red, size: 120 }); S.label("HA HA!", 1450, 300, { c: C.red, size: 100 }); });
// L131 1846, his former student used ether / Boston hospital, audience of surgeons
shot(131, 0, (S) => { S.bg("white"); person(S, 760, FLOOR, { s: 1.7, hair: "short", hairC: "#3b2a20", outfit: "tee", outfitC: "#2b2b2b", mood: "determined", look: 4 }); jar(S, 1320, 600, 1.5, "#cfe8f5", "ETHER"); S.label("1846", 960, 150, { c: C.red, size: 130 }); });
shot(131, 14, (S) => { S.bg("room", { window: false }); fl(S, rrect(760, 620, 400, 80, 20), "#ffffff", { w: 6 }); for (let r = 0; r < 2; r++) for (let i = 0; i < 8; i++) mini(S, 300 + i * 190 + r * 90, 420 + r * 520 * 0 + r * 120, 1.1); S.label("BOSTON. SURGEONS WATCHING.", 960, 150, { size: 72 }); });
// L132 one of the greatest gifts in medicine, first shown by dentists
shot(132, 0, (S) => { S.bg("white", { floor: false }); gift(S, 960, 600, 1.8); S.label("PAIN-FREE SURGERY", 960, 170, { c: C.green }); });
// L133 Dentists. Of all people. [S]
shot(133, 0, (S) => { S.bg("white"); doc(S, 960, FLOOR, { s: 1.6, mood: "happy", pose: "hips" }); S.label("DENTISTS.", 960, 140, { size: 130 }); S.label("OF ALL PEOPLE.", 960, 960, { c: C.red, size: 70 }); });
// L134 untreated tooth decay, most common condition on the planet
shot(134, 0, (S) => { S.bg("space"); globe(S, 960, 600, 300); tooth(S, 1180, 430, 0.8, { rot: true, cavity: true }); S.label("#1 ON THE PLANET", 960, 160, { c: C.yel }); });
// L135 about two and a half billion people
shot(135, 0, (S) => { S.bg("white", { floor: false }); for (let i = 0; i < 40; i++) mini(S, 300 + (i % 10) * 145, 380 + Math.floor(i / 10) * 170, 0.9, i % 3 ? PAPER : "#d8c48f"); S.label("2.5 BILLION", 960, 160, { c: C.red, size: 120 }); });
// L136 So tonight… take the painkiller.
shot(136, 0, (S) => { S.bg("roomNight", { window: [1300, 170, 360, 300] }); you(S, 700, 790, { s: 1.6, mood: "worried", bandage: true, look: 5 }); pill(S, 1240, 620, 1.6); S.label("TONIGHT", 960, 150, { c: "#ffffff" }); });
// L137 Book the dentist.
shot(137, 0, (S) => { S.bg("white"); you(S, 640, FLOOR, { s: 1.6, mood: "smile", pose: "hold", look: 4 }); S.calendar(1050, 330, 4, 3, 110, 90, S.start, Q); S.tick(1270, 560, 1.4, S.start, Q); S.label("BOOK IT", 960, 150); });
// L138 remember the young man in the Alps / holding still while someone scraped his tooth with a rock
shot(138, 0, (S) => { alps(S); cave(S, 1450, 900, { s: 1.4, mood: "worried", bandage: true, look: -3 }); });
shot(138, 8, (S) => { S.bg("desert", { hy: 720 }); cave(S, 760, 980, { s: 2.2, mood: "wow", bandage: true, look: 4 }); rock(S, 1320, 520, 1.6); S.label("HOLD STILL.", 960, 140, { c: C.red }); }, { cam: "push" });
// L139 We beat the worm.
shot(139, 0, (S) => { S.bg("white", { floor: false }); worm(S, 900, 600, 1.8); S.cross(960, 580, 4, S.start, Q); S.label("WE BEAT THE WORM.", 960, 170); });
// L140 We never beat the sugar.
shot(140, 0, (S) => { S.bg("black"); sugar(S, 960, 860, 2.2); S.label("WE NEVER BEAT THE SUGAR.", 960, 220, { c: C.red, size: 100 }); }, { cam: "push" });
// ===== run: one scene per shot, cut 0.08 s before the phrase (story-explainer §4) =====
SHOTS.sort((a, b) => a.c - b.c || a.w - b.w);
const ST = SHOTS.map((s, k) => (k === 0 ? 0 : +(W(s.c, s.w) - 0.08).toFixed(3)));
SHOTS.forEach((s, k) => {
  const a = ST[k], b = k + 1 < ST.length ? ST[k + 1] : TOTAL;
  if (b - a > 6.5) console.warn(`long shot ${s.c}:${s.w} ${(b - a).toFixed(1)}s`);
  s.fn(scene(a, b, s.o));
});
