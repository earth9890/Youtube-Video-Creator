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
  [-1, 1].forEach((sd) => dr(S, circ(F.hd[0] + sd * 0.34 * R, y, 0.3 * R), { w: 4, parent: g }));
  dr(S, `M${F.hd[0] - 0.04 * R} ${y} L${F.hd[0] + 0.04 * R} ${y}`, { w: 4, parent: g });
}
// the classic toothache bandage: cloth under the chin, knot on top
function bandage(S, F) {
  const R = F.r, cx = F.hd[0], cy = F.hd[1] + 0.12 * R;
  const ring = smooth(arcPts(cx, cy, R * 1.08, 0, 360, 24, R * 1.22));
  dr(S, ring, { w: 26, c: INK });
  dr(S, ring, { w: 17, c: "#ffffff" });
  const ky = cy - R * 1.22;
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
function bowDrill(S, x, y, s = 1) {
  dr(S, line([x, y - 160 * s], [x, y + 40 * s], 1), { w: 12, c: C.wood });
  flint(S, x, y + 60 * s, 0.35 * s);
  dr(S, smooth(pts(x, y, s, [[-150, -40], [-80, -95], [0, -110], [80, -95], [150, -40]])), { w: 10, c: C.wood });
  dr(S, poly(pts(x, y, s, [[-150, -40], [-6, -70], [6, -60], [150, -40]]), 1), { w: 3, c: INK });
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
  [0, 1, 2].forEach((i) => dr(S, arc(x - w / 3 + i * w / 3, y + 200, w / 8, 180, 360), { w: 7 }));
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
function nums(S, x, y, n, cols, col, total, o = {}) { // icon grid: n of total highlighted (teeth)
  for (let i = 0; i < total; i++) { const cx = x + (i % cols) * 70, cy = y + Math.floor(i / cols) * 90; fl(S, closed(cx, cy, 0.28, MOLAR), i < n ? col : "#ffffff", { w: 4 }); }
}
const S = scene(0, 1, { cam: "none" });
S.bg("kraft");
const A = cave(S, 260, FLOOR, { mood: "worried", bandage: true });
const B = you(S, 560, FLOOR, { mood: "tired", look: 4 });
const D = doc(S, 860, FLOOR, { mood: "smile" });
cave(S, 1160, FLOOR, { mood: "angry", pose: "point" });
person(S, 1460, FLOOR, { hair: "bun", hairC: "#c0392b", outfit: "tee", outfitC: "#7b2d8b", crown: true, mood: "sad" });
person(S, 1740, FLOOR, { hair: "side", hairC: "#eeeeee", outfit: "tee", outfitC: "#1f3a68", mood: "flat", halo: true });
S.label("14,000 YEARS AGO", 960, 150, { c: C.red, to: [260, 360] });
stars5(S, 1400, 250, 0.8, 5);
graph(S, 1100, 120, 200, 140, [[0, 0.05], [0.5, 0.1], [0.7, 0.4], [1, 0.95]], { dot: 2 });
bridge(S, 700, 260, 300);
pliers(S, 520, 300, 0.6, 20);
nums(S, 40, 80, 10, 5, C.rot, 15);
