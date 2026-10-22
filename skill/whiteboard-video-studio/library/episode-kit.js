// ===================== library/episode-kit.js — recurring cast, sets and props promoted from finished episodes =====================
// Ported from episodes 31, 37-44 (engine S.draw/S.fill + DS.* tokens) into static markup-string assets drawn through the L.* tokens.
// categories: "kit" (recurring cast + sets: Dave's Brain, library visitors, rooms) and "prop-ep" (episode props).
// Animated parts of the episodes became OPTIONS (face, armR, armL, mouth, open, lit, level, ...).
(function () {
const L = window.L, f1 = L.f1;

// ---------- local helpers (everything still goes through the tokens) ----------
const WK = { n: "char", m: "prop", d: "detail", h: "hair" }; // episode DS.w near/mid/detail/hair -> token kinds
const P = (d, c, w = "m", o = {}) => L.shape(d, c, Object.assign({ w: WK[w] }, o));          // solid shape, outlined
const K = (d, w = "m", c = "ink", o = {}) => L.stroke(d, Object.assign({ c, w: WK[w] }, o)); // line only
const FL = L.flat;
const circ = L.circ, rect = L.rect, poly = L.poly, smooth = L.smooth, line = L.line, arc = L.arc;
const rr = (x, y, w, h, r) => L.rrect(x, y, w, h, r);
const tc = (n, t) => L.c(n, t); // palette colour (raw hex of the current palette) usable as stroke colour
let gid = 0;
const nid = () => "epk" + ++gid;
// a solid shape in a mixed colour (not a palette name): own gradient, same outline tokens
// gradient for a mixed colour, defined once so several shapes can share it (o.grad)
const gradFor = (hex) => { if (L.T.shade === "flat") return { def: "", url: hex }; const id = nid(); return { def: `<defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${L.mix(hex, L.c("white"), 0.4)}"/><stop offset="0.55" stop-color="${hex}"/><stop offset="1" stop-color="${L.mix(hex, L.c("ink"), 0.2)}"/></linearGradient></defs>`, url: `url(#${id})` }; };
const RS = (d, hex, w = "m", o = {}) => {
  let fill = hex, def = "";
  if (o.grad) fill = o.grad;
  else if (L.T.shade !== "flat" && !o.flat) {
    const id = nid();
    def = `<defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${L.mix(hex, L.c("white"), 0.4)}"/><stop offset="0.55" stop-color="${hex}"/><stop offset="1" stop-color="${L.mix(hex, L.c("ink"), 0.2)}"/></linearGradient></defs>`;
    fill = `url(#${id})`;
  }
  return def + L.tag("path", { d, fill, stroke: L.outline(null), "stroke-width": L.lw(WK[w], o.s || 1), "stroke-linecap": L.T.cap, "stroke-linejoin": L.T.join, opacity: o.op });
};
// vertical gradient fill without outline (walls, floors, windows); flat/cel looks get the plain colour
const gp = (d, name, t0, t1) => {
  if (L.T.shade !== "grad") return L.tag("path", { d, fill: L.c(name, t0) });
  const id = nid();
  return `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${L.c(name, t0)}"/><stop offset="1" stop-color="${L.c(name, t1)}"/></linearGradient></defs>` + L.tag("path", { d, fill: `url(#${id})` });
};
const glow = (cx, cy, r, c = "yellow", op = 0.5) => {
  const id = nid();
  return `<defs><radialGradient id="${id}"><stop offset="0" stop-color="${L.c(c, 1)}" stop-opacity="${op}"/><stop offset="1" stop-color="${L.c(c, 0)}" stop-opacity="0"/></radialGradient></defs>` + L.tag("circle", { cx, cy, r, fill: `url(#${id})` });
};
const clipOf = (d, inner) => { const id = nid(); return `<defs><clipPath id="${id}"><path d="${d}"/></clipPath></defs><g clip-path="url(#${id})">${inner}</g>`; };
const dashed = (d, w, c, a, b) => L.stroke(d, { c, w: WK[w], dash: `${a} ${b}` });
const rot = (inner, deg, x, y) => L.g(inner, `rotate(${deg} ${f1(x)} ${f1(y)})`);
const MOUTHC = () => L.mix(L.c("red", 2), L.c("ink"), 0.45);
const OV = (d, hex, w = "d") => L.tag("path", { d, fill: hex, stroke: L.outline(null), "stroke-width": L.lw(WK[w]), "stroke-linecap": L.T.cap });
// register helper: reg(cat, name, group, label, box, tags, fn, defaults, extra)
const reg = (cat, name, group, label, box, tags, fn, defaults = {}, extra = {}) => {
  const ex = Object.assign({ box, group, label, tags: [].concat(tags, ["episode", "kit"]), defaults, demo: defaults,
    call: `L.put(S, "${name}", x, y, { s: 1, t${Object.keys(defaults).length ? ", " + Object.entries(defaults).map(([k, v]) => `${k}: ${JSON.stringify(v)}`).join(", ") : ""} })` }, extra);
  L.reg(cat, name, fn, ex);
};
const KIT = "kit", PROP = "prop-ep";

// ======================================================================================================================
// DAVE'S BRAIN: the small pink librarian brain (episodes 38, 39, 40, 44). Origin = feet centre, ~300 px tall.
// faces: tired stern worried smile shh. armR: down shush point stop. armL: down hip up. mouth: 0 closed, 1 small open, 2 big open (talking).
// ======================================================================================================================
const brainLib = (o) => {
  const face = o.face || "tired", aR = o.armR || "down", aL = o.armL || "down", out = [L.shadow(0, 0, 150)];
  const eyes = (dy = 0, rr_ = 4.5) => [-30, 30].map((dx) => P(circ(dx, -198 + dy, rr_), "ink", "h")).join("");
  const brow = (a, b, sd) => K(line([sd * 30 + a[0], a[1]], [sd * 30 + b[0], b[1]]), "d");
  const mouth = (d) => K(d, "d");
  const FACES = {
    tired: () => [-30, 30].map((dx) => P(`M${dx - 19} -198 A19 19 0 0 1 ${dx + 19} -198 Z`, "pink", "d", { tone: 1 })).join("") + eyes(7, 4) + mouth("M-9 -163 Q0 -160 9 -165"),
    stern: () => eyes(1) + brow([-18, -228], [14, -220], -1) + brow([18, -228], [-14, -220], 1) + mouth("M-10 -164 L10 -164"),
    worried: () => eyes(1) + brow([-16, -218], [14, -230], -1) + brow([16, -218], [-14, -230], 1) + mouth("M-10 -162 Q-4 -168 2 -162 Q7 -157 11 -163"),
    smile: () => eyes(1) + mouth("M-11 -168 Q0 -155 11 -168"),
    shh: () => eyes(2, 4) + brow([-18, -226], [14, -221], -1) + brow([18, -226], [-14, -221], 1) + K(circ(0, -163, 4.5), "d"),
  };
  const hand = (x, y, r = 8) => P(circ(x, y, r), "pink", "d", { tone: 1 });
  const ARMR = {
    down: () => K(smooth([[46, -130], [66, -100], [62, -70]]), "n") + hand(62, -66),
    shush: () => K(smooth([[46, -128], [80, -118], [40, -150], [8, -166]]), "n") + hand(8, -164, 7) + P(rr(2, -196, 11, 40, 5), "pink", "d", { tone: 1 }),
    point: () => K(smooth([[46, -128], [90, -134], [128, -134]]), "n") + hand(128, -134, 9) + P(rr(130, -139, 30, 10, 5), "pink", "d", { tone: 1 }),
    stop: () => K(smooth([[46, -128], [84, -150], [92, -190]]), "n") + hand(92, -196, 15),
  };
  const ARML = {
    down: () => K(smooth([[-46, -130], [-66, -100], [-62, -70]]), "n") + hand(-62, -66),
    hip: () => K(smooth([[-46, -130], [-84, -108], [-54, -88]]), "n") + hand(-54, -88, 7),
    up: () => K(smooth([[-46, -130], [-86, -140], [-62, -176]]), "n") + hand(-62, -178, 9),
  };
  out.push(K("M-20 -62 L-22 -8 M20 -62 L22 -8", "n"), P(circ(-27, -5, 17, 8), "ink", "d", { tone: 1 }), P(circ(27, -5, 17, 8), "ink", "d", { tone: 1 }));
  out.push(P("M-42 -140 Q0 -152 42 -140 L54 -58 Q0 -48 -54 -58 Z", "green"), P("M-14 -146 L0 -96 L14 -146 Z", "paper", "d", { tone: 1 }));
  [[-26, -112], [-28, -92], [-30, -72]].forEach(([dx, dy]) => out.push(P(circ(dx, dy, 4.5), "gold", "d")));
  out.push(P(circ(-34, -268, 26), "brown", "d"), K("M-74 -296 L-2 -262", "n", "yellow", { s: 1.5 }), K("M-74 -296 L-80 -299", "n", "pink", { s: 1.5 }));
  const pts = []; for (let i = 0; i <= 26; i++) { const a = (i / 24) * Math.PI * 2, r = 1 + 0.055 * Math.cos(12 * a); pts.push([Math.cos(a) * 80 * r, -200 + Math.sin(a) * 58 * r]); }
  out.push(P(smooth(pts), "pink"));
  [[[0, -256], [6, -232], [-6, -212], [4, -190], [-2, -168]], [[-66, -214], [-48, -228], [-34, -210], [-20, -224]], [[66, -214], [48, -228], [34, -210], [20, -224]], [[-62, -176], [-46, -164], [-34, -178]], [[62, -176], [46, -164], [34, -178]]]
    .forEach((p) => out.push(K(smooth(p), "d", tc("pink", 2))));
  [-30, 30].forEach((dx) => out.push(P(circ(dx, -198, 21), "glass", "d", { tone: 1 })));
  out.push(K("M-9 -202 Q0 -208 9 -202 M-51 -200 L-74 -206 M51 -200 L74 -206", "d"));
  out.push((FACES[face] || FACES.tired)());
  if (o.mouth) out.push(o.mouth === 2 ? OV(circ(0, -161, 7, 8), MOUTHC()) : OV(circ(0, -163, 6, 3.5), MOUTHC()));
  out.push((ARMR[aR] || ARMR.down)(), (ARML[aL] || ARML.down)());
  return out.join("");
};
const BOX_BRAIN = [-130, -320, 260, 335];
reg(KIT, "kit-brain-librarian", "Dave's Brain", "Dave's Brain · librarian (options)", BOX_BRAIN, ["brain", "librarian", "dave's brain", "pink brain", "glasses", "bun", "pencil", "cardigan"], brainLib, { face: "tired" });
[["tired", {}], ["stern", { armR: "point" }], ["worried", { armL: "hip" }], ["smile", { armL: "up" }], ["shh", { armR: "shush" }]].forEach(([f, ex]) =>
  reg(KIT, "kit-brain-" + f, "Dave's Brain", "Dave's Brain · " + f, BOX_BRAIN, ["brain", "librarian", f, "face", "dave's brain"], brainLib, Object.assign({ face: f }, ex)));
reg(KIT, "kit-brain-talking", "Dave's Brain", "Dave's Brain · talking", BOX_BRAIN, ["brain", "librarian", "talking", "mouth open", "speaking"], brainLib, { face: "smile", mouth: 2, armR: "stop" });

// ---------- organs and brain diagrams ----------
const brainBlob = (o) => {
  const k = 1, pts = []; for (let i = 0; i <= 26; i++) { const a = (i / 24) * Math.PI * 2, r = 1 + 0.055 * Math.cos(12 * a); pts.push([Math.cos(a) * 80 * r, Math.sin(a) * 58 * r]); }
  const folds = [[[0, -52], [6, -28], [-6, -8], [4, 14], [-2, 36]], [[-66, -10], [-48, -24], [-34, -6], [-20, -20]], [[66, -10], [48, -24], [34, -6], [20, -20]], [[-60, 26], [-44, 38], [-30, 24]], [[60, 26], [44, 38], [30, 24]]];
  return P(smooth(pts), o.c || "pink") + folds.map((p) => K(smooth(p), "d", tc(o.c || "pink", 2))).join("");
};
reg(PROP, "ep-brain-blob", "Body", "Brain · simple pink", [-110, -90, 220, 180], ["brain", "organ", "pink", "body", "head", "mind"], brainBlob);

const brainProfile = (o) => {
  const c = o.c || "pink", cols = ["blue", "green", "orange", "purple"], pts = [];
  for (let i = 0; i <= 30; i++) { const a = (i / 28) * Math.PI * 2, r = 1 + 0.035 * Math.cos(14 * a); pts.push([Math.cos(a) * 150 * r * (1 + 0.05 * Math.cos(a)), Math.sin(a) * 105 * r]); }
  const outline = smooth(pts), out = [];
  out.push(P("M-34 80 Q-20 150 -6 190 L30 188 Q24 140 30 80 Z", c, "m", { tone: 2 }), P(circ(-78, 92, 64, 38), c, "m", { tone: 2 }), P(outline, c));
  [[[14, -104], [22, -70], [6, -40], [18, -10]], [[132, 34], [96, 22], [52, 28], [10, 4], [-30, -10]], [[-110, -40], [-84, -58], [-60, -40], [-36, -56]], [[40, -86], [66, -70], [90, -80], [110, -60]], [[-100, 20], [-76, 6], [-56, 26], [-30, 14]], [[56, 62], [80, 50], [104, 66]], [[-30, 60], [-6, 48], [18, 64], [40, 52]], [[70, -30], [92, -16], [118, -26]]]
    .forEach((p) => out.push(K(smooth(p), "d", tc(c, 2))));
  out.push(K("M-110 104 Q-80 112 -48 104 M-100 86 Q-78 94 -52 86", "d"));
  const regs = [[86, -20, 66, 78], [-4, -62, 84, 40], [-100, -6, 52, 74], [24, 62, 96, 36]], lit = o.lit === "all" ? [0, 1, 2, 3] : [].concat(o.lit || []);
  if (lit.length) out.push(clipOf(outline, lit.map((i) => L.tag("path", { d: circ(...regs[i]), fill: L.c(cols[i]), opacity: 0.62 })).join("")));
  if (o.hippo) { const hp = smooth([[76, 58], [44, 66], [10, 56], [-18, 34], [-34, 8]]); out.push(K(hp, "m", "ink", { s: 3 }), K(hp, "m", o.hippo === true ? "green" : o.hippo, { s: 1.5 }), P(circ(-34, 8, 8), "green", "d", { tone: 1 })); }
  return out.join("");
};
reg(PROP, "ep-brain-profile", "Body", "Brain · side view (regions)", [-190, -130, 380, 340], ["brain", "organ", "profile", "cerebrum", "cerebellum", "diagram", "body"], brainProfile, {});
reg(PROP, "ep-brain-profile-lit", "Body", "Brain · side view, regions lit", [-190, -130, 380, 340], ["brain", "regions", "lit", "activity", "diagram", "scan"], brainProfile, { lit: "all" });
reg(PROP, "ep-brain-hippocampus", "Body", "Brain · hippocampus", [-190, -130, 380, 340], ["brain", "hippocampus", "memory", "diagram"], brainProfile, { hippo: true });

const neuron = (o) => {
  const name = o.name || "blue", n = o.arms ?? 6, out = [], dc = tc(name, 2);
  for (let i = 0; i < n; i++) {
    const a = (o.a0 ?? 200) + (i / Math.max(1, n - 1)) * (o.span ?? 320), c = Math.cos((a * Math.PI) / 180), s = Math.sin((a * Math.PI) / 180), Ln = 62 + (i % 3) * 18;
    const x1 = c * 34, y1 = s * 34, x2 = c * (34 + Ln), y2 = s * (34 + Ln), fk = (da) => [x2 + Math.cos(((a + da) * Math.PI) / 180) * 26, y2 + Math.sin(((a + da) * Math.PI) / 180) * 26];
    out.push(K(`M${f1(x1)} ${f1(y1)} L${f1(x2)} ${f1(y2)} M${f1(x2)} ${f1(y2)} L${f1(fk(32)[0])} ${f1(fk(32)[1])} M${f1(x2)} ${f1(y2)} L${f1(fk(-32)[0])} ${f1(fk(-32)[1])}`, "d", dc));
  }
  if (o.axon) { const [dx, dy] = o.axon; out.push(K(`M30 10 Q${dx * 0.5} ${dy * 0.5 + 40} ${dx} ${dy}`, "m", dc), P(circ(dx, dy, 9), name, "d", { tone: 1 })); }
  out.push(P(circ(0, 0, 34), name, "m", { tone: 1 }), P(circ(-3, 2, 11), name, "d", { tone: 2 }));
  if (o.lit) out.push(L.tag("path", { d: circ(0, 0, 34), fill: L.c("yellow", 1), opacity: 0.9 }), K(circ(0, 0, 46), "m", "gold"));
  if (o.lib) out.push([-1, 1].map((sd) => P(circ(sd * 15, -4, 11), "glass", "d", { tone: 1 })).join(""), K("M-4 -6 L4 -6", "d"), [-15, 15].map((x) => P(circ(x, -3, 3), "ink", "h")).join(""));
  if (o.eyes) out.push([-1, 1].map((sd) => P(circ(sd * 12, -6, 8), "white", "d") + P(circ(sd * 12 + (o.look || 0) * 3, -5, 3.4), "ink", "h")).join(""), K(`M-8 14 Q0 ${o.sad ? 10 : 19} 8 14`, "d"));
  return out.join("");
};
const BOX_N = [-150, -150, 300, 300];
reg(PROP, "ep-neuron", "Body", "Neuron · cell", BOX_N, ["neuron", "brain cell", "nerve", "cell", "body"], neuron, { axon: [110, 60] });
reg(PROP, "ep-neuron-lit", "Body", "Neuron · firing (lit)", BOX_N, ["neuron", "firing", "active", "lit", "brain cell"], neuron, { axon: [110, 60], lit: true, name: "blue" });
reg(KIT, "kit-neuron-face", "Dave's Brain", "Neuron · with a face", BOX_N, ["neuron", "face", "character", "brain cell", "eyes"], neuron, { eyes: true, name: "green", axon: [110, 60] });
reg(KIT, "kit-neuron-librarian", "Dave's Brain", "Neuron · librarian glasses", BOX_N, ["neuron", "librarian", "glasses", "brain cell"], neuron, { lib: true, name: "orange", axon: [110, 60] });

// a house at night = Dave's head: windows are rooms; o.lit = array of lit window indices
const houseHead = (o) => {
  const cols = o.cols || 3, rows = o.rows || 2, Wd = cols * 120 + 70, Hh = rows * 130 + 70, x0 = -Wd / 2, y0 = -Hh / 2, out = [], win = [];
  out.push(FL(rect(x0 + 10, y0 + 14, Wd, Hh), "ink", 0.14), P(rect(x0 + Wd * 0.72, y0 - 190, 54, 130), "earth"));
  out.push(P(`M${x0 - 36} ${y0 + 2} L0 ${y0 - 170} L${x0 + Wd + 36} ${y0 + 2} Z`, "brown", "n"), P(rr(x0, y0, Wd, Hh, 12), "wall", "n"), P(rr(-38, y0 + Hh - 112, 76, 112, 6), "wood"));
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { if (r === rows - 1 && c === Math.floor(cols / 2) && cols % 2 === 1) continue; win.push([x0 + 35 + c * 120, y0 + 35 + r * 130, 80, 90]); }
  const lit = o.lit === "all" ? win.map((_, i) => i) : [].concat(o.lit || []);
  win.forEach(([x, y, w, h], i) => {
    out.push(P(rect(x, y, w, h), "navy", "m", { tone: 1, flat: true }));
    if (lit.includes(i)) out.push(glow(x + w / 2, y + h / 2, 120, "yellow", 0.5), L.tag("path", { d: rect(x, y, w, h), fill: L.c("yellow"), opacity: 0.95 }));
    out.push(K(`M${x + w / 2} ${y} V${y + h} M${x} ${y + h / 2} H${x + w} M${x} ${y} H${x + w} V${y + h} H${x} Z`, "m"));
  });
  return out.join("");
};
reg(PROP, "ep-house-head", "Body", "House at night · windows (a head)", [-260, -420, 520, 610], ["house", "head", "windows", "mind", "rooms", "night", "metaphor"], houseHead, {});
reg(PROP, "ep-house-head-lit", "Body", "House at night · lit rooms", [-260, -420, 520, 610], ["house", "head", "windows", "lit", "mind", "light"], houseHead, { lit: [0, 2, 4] });

// ---------- Dave himself, as the episodes use him ----------
const daveBase = { style: "man01", hair: "side", hairC: "brown", outfitC: "blue" };
reg(KIT, "kit-dave", "Dave", "Dave · episode look", [-170, -400, 340, 420], ["dave", "man", "main character", "stickman", "narrator"], (o) => L.person(Object.assign({}, daveBase, o)), { pose: "stand", face: "smile" }, { selfScale: true });
reg(KIT, "kit-doctor", "Dave", "Doctor · glasses and tie", [-170, -400, 340, 420], ["doctor", "lab coat", "glasses", "tie", "expert", "scientist"], (o) => L.person(Object.assign({ style: "man01", hair: "side", hairC: "ink", outfit: "labcoat", outfitC: "white", acc: ["glasses"], face: "smile", pose: "stand" }, o)), {}, { selfScale: true });
// Dave as a paper cutout on a folded base with a dashed cut line round him (episode 40)
const paperDave = (o) => {
  const who = L.person(Object.assign({}, daveBase, { pose: "stand", face: "flat" }, o)), top = -330, hw = 150, out = [];
  out.push(L.shadow(0, 0, 220), dashed(rr(-hw, top, hw * 2, -top + 18, 20), "m", "gray", 16, 12), P(`M-74 2 L74 2 L54 26 L-54 26 Z`, "paper", "d", { flat: true }), who);
  return out.join("");
};
reg(KIT, "kit-dave-paper", "Dave", "Dave · paper cutout", [-190, -400, 380, 450], ["paper dave", "cutout", "paper", "puppet", "dave", "craft"], paperDave, {}, { selfScale: true });
// Dave holding a plain can in his right hand (pose reach, hold, wave...)
reg(KIT, "kit-dave-holds-can", "Dave", "Dave · holding a can", [-170, -400, 340, 420], ["dave", "can", "energy drink", "hold", "drink", "soda"], (o) => {
  const base = Object.assign({}, daveBase, { pose: "reach", face: "smile" }, o), A = L.anchors(base), h = A.hands[1];
  return L.person(base) + L.g(L.inline("ep-can-plain", { open: !!o.open }), `translate(${f1(h[0])} ${f1(h[1] + 56 * 0.55)}) scale(0.55)`);
}, { pose: "reach" }, { selfScale: true });

// ---------- dial with a "10%" sticker (episode 38) ----------
const dial = (o) => {
  const r = 200, a0 = -120, ang = (v) => a0 + 2.4 * v, v = o.v ?? 10, pt = (vv, f) => [Math.sin((ang(vv) * Math.PI) / 180) * r * f, -Math.cos((ang(vv) * Math.PI) / 180) * r * f], out = [];
  out.push(FL(circ(8, 12, r), "ink", 0.14), P(circ(0, 0, r), "gray", "n", { tone: 1 }), P(circ(0, 0, r * 0.86), "paper", "d", { flat: true }));
  out.push(K(smooth(Array.from({ length: 11 }, (_, i) => pt(80 + i * 2, 0.76))), "n", "red", { s: 1.6 }));
  for (let t = 0; t <= 100; t += 10) { const [x1, y1] = pt(t, 0.78), [x2, y2] = pt(t, t % 50 === 0 ? 0.62 : 0.68); out.push(K(`M${f1(x1)} ${f1(y1)} L${f1(x2)} ${f1(y2)}`, t % 50 === 0 ? "m" : "d")); }
  [[10, "10"], [20, "20"], [50, "50"], [100, "100"]].forEach(([t, s]) => { const [x, y] = pt(t, 0.5); out.push(L.text(s, x, y + 14, { size: 40 })); });
  out.push(rot(K("M0 24 L0 -140", "n", "ink", { s: 1.15 }) + P("M-10 -116 L0 -148 L10 -116 Z", "red", "h"), ang(v), 0, 0));
  if (o.sticker !== false) out.push(FL(rr(-184 + 4, 72 + 6, 368, 72, 6), "ink", 0.14), P(rr(-184, 72, 368, 72, 6), "yellow", "d", { flat: true }), L.text(o.sticker || "10%", 0, 120, { size: 64 }));
  out.push(P(circ(0, 0, 20), "ink", "d"));
  return out.join("");
};
reg(PROP, "ep-dial-sticker", "Gauges", "Dial · needle + yellow sticker", [-230, -230, 460, 460], ["dial", "gauge", "meter", "percent", "10 percent", "sticker", "brain use"], dial, { v: 10 });
reg(PROP, "ep-dial-full", "Gauges", "Dial · needle high, no sticker", [-230, -230, 460, 460], ["dial", "gauge", "meter", "full", "100"], dial, { v: 92, sticker: false });

// flat shape in a palette colour at a given tone (no outline): highlights, liquids, paper bits
const FT = (d, name, tone, op) => L.tag("path", { d, fill: L.c(name, tone), opacity: op });
const heartPath = (cx, cy, s = 1) => {
  const pts = [];
  for (let i = 0; i <= 30; i++) { const t = Math.PI + (i / 30) * Math.PI * 2, x = 16 * Math.pow(Math.sin(t), 3), y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)); pts.push([cx + x * 2 * s, cy + (y + 2) * 2 * s]); }
  return smooth(pts);
};
const raysPath = (cx, cy, r1, r2, n, a0 = -Math.PI / 2) => { let d = ""; for (let i = 0; i < n; i++) { const a = a0 + (i / n) * Math.PI * 2; d += `M${f1(cx + Math.cos(a) * r1)} ${f1(cy + Math.sin(a) * r1)} L${f1(cx + Math.cos(a) * r2)} ${f1(cy + Math.sin(a) * r2)} `; } return d; };
const words = (arr, x, y0, gap, size, c) => arr.map((s, i) => L.text(s, x, y0 + i * gap, { size, c })).join("");

// ======================================================================================================================
// ENERGY DRINK (episode 40): plain generic can (no brand, blank band, tiny red-striped warning label), sugar, wrappers, jug, jar
// ======================================================================================================================
// base centre (0,0). k = geometry scale; o.c = body colour name; o.open; o.dull (empty grey); o.words = lettering on the band; o.lo = body + band only (far cans)
const canMk = (k, o) => {
  const w = 54 * k, h = 112 * k, lw = k >= 1.6 ? "n" : k >= 0.8 ? "m" : "d", out = [];
  const bandH = (o.words ? 0.42 : 0.3) * h, bandY = -h * 0.68;
  out.push(P(rr(-w / 2, -h, w, h, 6 * k), o.dull ? "gray" : o.c || "teal", lw, o.dull ? { tone: 1 } : {}), P(rect(-w / 2, bandY, w, bandH), "white", "h"));
  if (o.lo) return out.join("");
  out.push(P(circ(0, -h + 1.5 * k, w / 2, 5 * k), "gray", "h", { tone: 1 }));
  out.push(o.open ? P(circ(0, -h + 1.5 * k, w * 0.36, 3.2 * k), "ink", "h", { tone: 1 }) : P(circ(w * 0.1, -h + k, w * 0.14, 2.6 * k), "gray", "h", { tone: 2 }));
  if (o.words) { const n = o.words.length, size = Math.min(26, (w * 1.3) / Math.max(...o.words.map((s) => s.length), 4)), sp = size * 1.1; o.words.forEach((s, i) => out.push(L.text(s, 0, bandY + (bandH - (n - 1) * sp) / 2 + i * sp + size * 0.36, { size }))); }
  else out.push(K(line([-w * 0.34, bandY + bandH * 0.3], [w * 0.34, bandY + bandH * 0.3]), "d", "red"), K(line([-w * 0.34, bandY + bandH * 0.7], [w * 0.2, bandY + bandH * 0.7]), "h", tc("gray", 1)));
  return out.join("");
};
const canFn = (o) => L.shadow(0, 0, 80) + canMk(1.7, o);
const BOX_CAN = [-70, -205, 140, 220];
reg(PROP, "ep-can-plain", "Energy drink", "Can · plain teal (generic)", BOX_CAN, ["can", "energy drink", "soda", "drink", "tin", "teal", "beverage", "caffeine"], canFn, {});
reg(PROP, "ep-can-open", "Energy drink", "Can · open", BOX_CAN, ["can", "open", "energy drink", "soda", "drink", "pull tab"], canFn, { open: true });
reg(PROP, "ep-can-empty", "Energy drink", "Can · empty grey", BOX_CAN, ["can", "empty", "grey", "used", "energy drink", "trash"], canFn, { dull: true });
reg(PROP, "ep-can-words", "Energy drink", "Can · lettering on the band", BOX_CAN, ["can", "label", "text", "energy drink", "lettering"], canFn, { words: ["ENERGY", "DRINK"] });
[["blue", "blue"], ["orange", "orange"], ["pink", "pink"], ["purple", "purple"], ["yellow", "yellow"], ["red", "red"]].forEach(([n, c]) =>
  reg(PROP, "ep-can-" + n, "Energy drink", "Can · " + n, BOX_CAN, ["can", "energy drink", "soda", "drink", n, "colour variant"], canFn, { c }));
reg(PROP, "ep-can-lying", "Energy drink", "Can · lying on its side", [-110, -100, 230, 110], ["can", "lying", "empty", "rolled", "energy drink", "soda", "fallen"], (o) => {
  const k = 1.7, w = 54 * k, h = 112 * k;
  return L.shadow(0, 0, h * 0.9) + P(rr(-h / 2, -w, h, w, 6 * k), "gray", "n", { tone: 1 }) + P(rect(-h * 0.2, -w, h * 0.3, w), "white", "h") + P(circ(h / 2, -w / 2, 5 * k, w / 2), "gray", "h", { tone: 2 });
});

// the hundred cans: ten rows of ten, back row small, front row big. o.n = how many cans show (row-major from the back), o.c = colour. Origin bottom centre.
const canGrid = (o) => {
  const n = o.n ?? 100, defs = [], uses = [];
  for (let r = 0; r < 10; r++) {
    const f = r / 9, k = 0.55 + 0.35 * f, sp = 56 + 16 * f, gy = (r - 9) * 16.5, id = nid();
    defs.push(`<g id="${id}">${canMk(k, { c: o.c, lo: r < 7 })}</g>`);
    for (let c = 0; c < 10; c++) if ((9 - r) * 10 + c < n) uses.push(`<use href="#${id}" x="${f1((c - 4.5) * sp)}" y="${f1(gy)}"/>`);
  }
  return L.g(L.shadow(0, 2, 620) + `<defs>${defs.join("")}</defs>${uses.join("")}`, "scale(1.4)");
};
const BOX_GRID = [-540, -420, 1080, 470];
reg(PROP, "ep-can-grid-100", "Energy drink", "Hundred cans · 10 x 10", BOX_GRID, ["100 cans", "grid", "hundred", "cans", "energy drink", "pile", "rows", "count", "many"], canGrid, {});
reg(PROP, "ep-can-grid-30", "Energy drink", "Cans · front 30 of the grid", BOX_GRID, ["cans", "grid", "30", "rows", "count", "energy drink"], canGrid, { n: 30 });
reg(PROP, "ep-can-grid-orange", "Energy drink", "Hundred cans · orange", BOX_GRID, ["100 cans", "grid", "orange", "cans", "colour variant"], canGrid, { c: "orange" });

// crumpled sweet wrapper: twisted ends, striped middle
reg(PROP, "ep-wrapper", "Energy drink", "Sweet wrapper · red", [-130, -60, 260, 120], ["wrapper", "sweet", "candy", "sugar", "sweets", "twist"], (o) => {
  const k = 2, c = o.c || "red";
  return P(`M-28 0 L-56 -20 L-50 0 L-56 20 Z M28 0 L56 -20 L50 0 L56 20 Z`.replace(/-?\d+(\.\d+)?/g, (m) => f1(m * k)), c, "d", { tone: 1, flat: true })
    + P(rr(-30 * k, -22 * k, 60 * k, 44 * k, 12 * k), c, "d") + K(`M${-14 * k} ${-20 * k} L${-4 * k} ${20 * k} M${6 * k} ${-20 * k} L${16 * k} ${20 * k}`, "d", "white");
}, { c: "red" });
reg(PROP, "ep-wrapper-blue", "Energy drink", "Sweet wrapper · blue", [-130, -60, 260, 120], ["wrapper", "sweet", "candy", "sugar", "blue"], (o) => L.inline("ep-wrapper", { c: "blue" }));
reg(PROP, "ep-wrapper-yellow", "Energy drink", "Sweet wrapper · yellow", [-130, -60, 260, 120], ["wrapper", "sweet", "candy", "sugar", "yellow"], (o) => L.inline("ep-wrapper", { c: "yellow" }));
reg(PROP, "ep-sugar-cube", "Energy drink", "Sugar cube", [-70, -70, 140, 140], ["sugar", "cube", "sweet", "lump", "white"], () => {
  const k = 2; return P(rr(-26 * k, -26 * k, 52 * k, 52 * k, 6 * k), "white", "m", { tone: 2 }) + [[-10, -8], [8, 6], [-4, 12], [12, -12]].map(([a, b]) => FT(circ(a * k, b * k, 2.2 * k), "gray", 1)).join("");
});
reg(PROP, "ep-teaspoon", "Energy drink", "Teaspoon · with a white heap", [-80, -90, 300, 140], ["spoon", "teaspoon", "sugar", "spoonful", "heap"], () => {
  const k = 1.8; return K(line([26 * k, 0], [104 * k, -12 * k]), "n", tc("gray", 2)) + P(circ(0, 0, 30 * k, 17 * k), "gray", "m", { tone: 1 }) + P(`M${-25 * k} ${-2 * k} Q0 ${-38 * k} ${25 * k} ${-2 * k} Z`, "white", "d");
});
const jar = (o) => {
  const w = 150, h = 200, x0 = -w / 2, lv = o.level ?? 0.55, out = [];
  if (lv) out.push(FT(rect(x0 + 8, -h * lv, w - 16, h * lv - 8), "white", 2));
  out.push(lv ? K(rr(x0, -h, w, h, 20), "m") : P(rr(x0, -h, w, h, 20), "glass", "m", { tone: 1 }));
  out.push(P(rr(x0 - 8, -h - 30, w + 16, 34, 6), "gray", "d", { tone: 1 }));
  if (o.mark) out.push(K(line([x0 - 50, -h * o.mark], [x0 + w + 50, -h * o.mark]), "n", "red"));
  return L.shadow(0, 0, 200) + out.join("");
};
reg(PROP, "ep-jar-sugar", "Energy drink", "Glass jar · sugar level", [-130, -260, 260, 280], ["jar", "sugar", "glass", "container", "level", "sweet"], jar, { level: 0.55 });
reg(PROP, "ep-jar-sugar-limit", "Energy drink", "Glass jar · sugar with red limit line", [-150, -260, 300, 280], ["jar", "sugar", "limit", "red line", "too much", "sweet"], jar, { level: 0.85, mark: 0.4 });
reg(PROP, "ep-jar-empty", "Energy drink", "Glass jar · empty", [-130, -260, 260, 280], ["jar", "empty", "glass", "container"], jar, { level: 0 });
const jug = (o) => {
  const w = 150, h = 190, x0 = -w / 2, lv = o.level ?? 0.55, out = [L.shadow(0, 0, 200), FT(`M${x0} ${-h} L${x0 + 8} 0 H${x0 + w - 8} L${x0 + w} ${-h} Z`, "glass", 0, 0.55)];
  if (lv) out.push(FT(rect(x0 + 8, -h * lv, w - 16, h * lv - 6), o.fill || "sky", 2, 0.92));
  out.push(K(`M${x0} ${-h} L${x0 + 8} 0 H${x0 + w - 8} L${x0 + w} ${-h}`, "m"), K(`M${x0 + w} ${-h * 0.82} q${w * 0.32} 0 ${w * 0.32} ${h * 0.26} q0 ${h * 0.2} ${-w * 0.28} ${h * 0.2}`, "m"));
  [0.25, 0.5, 0.75].forEach((f) => out.push(K(line([x0 + 4, -h * f], [x0 + w * 0.32, -h * f]), "d")));
  return out.join("");
};
reg(PROP, "ep-jug-water", "Energy drink", "Measuring jug · water", [-130, -230, 330, 250], ["jug", "measuring", "water", "litre", "liquid", "kitchen", "pitcher"], jug, { fill: "sky", level: 0.6 });
reg(PROP, "ep-jug-green", "Energy drink", "Measuring jug · green drink", [-130, -230, 330, 250], ["jug", "measuring", "liquid", "green", "drink", "pitcher"], jug, { fill: "green", level: 0.4 });
reg(PROP, "ep-drop", "Energy drink", "Water drop", [-50, -62, 100, 130], ["drop", "water", "droplet", "sweat", "liquid", "tear"], (o) => {
  const k = 1.8; return P(`M0 ${-30 * k} C${6 * k} ${-14 * k} ${20 * k} ${-2 * k} ${20 * k} ${12 * k} A${20 * k} ${20 * k} 0 0 1 ${-20 * k} ${12 * k} C${-20 * k} ${-2 * k} ${-6 * k} ${-14 * k} 0 ${-30 * k} Z`, o.c || "sky");
}, { c: "sky" });
reg(PROP, "ep-flame", "Energy drink", "Flame · calm static", [-160, -310, 320, 340], ["flame", "fire", "burn", "heat", "calories", "energy"], () => {
  const fl = (s, name, w) => P(`M0 ${-150 * s} C${40 * s} ${-90 * s} ${70 * s} ${-60 * s} ${50 * s} ${-20 * s} Q0 ${14 * s} ${-50 * s} ${-20 * s} C${-70 * s} ${-60 * s} ${-30 * s} ${-90 * s} 0 ${-150 * s} Z`, name, w, { flat: true });
  return fl(2, "orange", "m") + fl(1.24, "yellow", "h");
});
reg(PROP, "ep-bolt", "Energy drink", "Lightning bolt · static", [-70, -90, 140, 180], ["bolt", "lightning", "energy", "electric", "power", "zap"], () => {
  const k = 1.8; return P(poly([[10, -44], [-26, 4], [-2, 4], [-12, 46], [28, -8], [4, -8]].map(([x, y]) => [x * k, y * k]), true), "yellow");
});

// sticky note (yellow), words as lines; rot = tilt in degrees
const sticky = (o) => {
  const w = 230, h = 120, ws = o.words || ["NOTE"], n = ws.length, out = [FL(rect(-w / 2 + 6, -h / 2 + 8, w, h), "ink", 0.14), P(rect(-w / 2, -h / 2, w, h), "yellow", "d", { tone: 1, flat: true, c: tc("gold", 2) })];
  ws.forEach((s, i) => out.push(L.text(s, 0, 15 + (i - (n - 1) / 2) * 46, { size: 40 })));
  return L.g(out.join(""), `rotate(${o.rot ?? -3})`);
};
const BOX_STK = [-150, -90, 300, 180];
reg(PROP, "ep-sticky-note", "Energy drink", "Sticky note · yellow (words option)", BOX_STK, ["sticky note", "note", "post-it", "reminder", "yellow", "memo"], sticky, { words: ["CAFFEINE", "LIMIT"] });
[["heart", ["HEART"]], ["sleep", ["SLEEP"]], ["sugar", ["SUGAR"]], ["water", ["WATER"]], ["question", ["?"]]].forEach(([n, w], i) =>
  reg(PROP, "ep-sticky-" + n, "Energy drink", "Sticky note · " + w.join(" "), BOX_STK, ["sticky note", "note", "reminder", n, "post-it"], sticky, { words: w, rot: [-4, 3, 2, -3, -1][i] }));

// counter panel: dark panel with a label and a big number
reg(PROP, "ep-counter-display", "Gauges", "Counter · label and big number", [-170, -110, 340, 220], ["counter", "display", "number", "score", "tally", "count", "panel"], (o) =>
  FL(rr(-150 + 6, -85 + 10, 300, 170, 20), "ink", 0.14) + P(rr(-150, -85, 300, 170, 20), "navy", "m", { flat: true }) + L.text(o.label || "CANS", 0, -29, { size: 40, c: "white" }) + L.text(String(o.value ?? 100), 0, 55, { size: 84, c: tc("gold", 1) }), { label: "CANS", value: 100 });
// the kitchen-wall board: counter on top, five reminder notes below
reg(KIT, "kit-note-board", "Energy drink", "Wall board · counter + 5 reminder notes", [-260, -330, 520, 660], ["board", "notes", "counter", "reminders", "sticky notes", "wall", "cork"], (o) => {
  const out = [P(rr(-240, -315, 480, 630, 20), "earth", "m", { flat: true }), L.g(L.inline("ep-counter-display", { label: o.label || "CANS", value: o.value ?? 100 }), "translate(0 -204)")];
  [["heart", -120, -25, -4], ["sleep", 120, -13, 3], ["sugar", -108, 115, 2], ["water", 126, 127, -3], ["limit", 6, 245, -1]].forEach(([n, x, y, r]) =>
    out.push(L.g(sticky({ words: { heart: ["HEART"], sleep: ["SLEEP"], sugar: ["SUGAR"], water: ["WATER"], limit: ["CAFFEINE", "LIMIT"] }[n], rot: r }), `translate(${x} ${y})`)));
  return out.join("");
}, { value: 100 });

// ======================================================================================================================
// ROOMS AND FURNITURE (episodes 38, 40): one-point-perspective rooms, box [0,0,1920,1080], origin top-left, floor line ~y 740-900
// ======================================================================================================================
const P4 = (pts) => poly(pts, true);
const room = (o) => {
  const [bx0, by0, bx1, by1] = o.back || [300, 110, 1620, 740], wall = o.wall || "wall", floor = o.floor || "floor", out = [];
  out.push(gp(P4([[-200, -200], [bx0, by0], [bx0, by1], [-200, 1280]]), wall, 2, 0), gp(P4([[2120, -200], [bx1, by0], [bx1, by1], [2120, 1280]]), wall, 0, 1));
  out.push(FT(P4([[-200, -200], [2120, -200], [bx1, by0], [bx0, by0]]), wall, 1), gp(P4([[bx0, by0], [bx1, by0], [bx1, by1], [bx0, by1]]), wall, 1, 0), gp(P4([[bx0, by1], [bx1, by1], [2120, 1280], [-200, 1280]]), floor, 0, 2));
  for (let i = 1; i < 9; i++) out.push(K(`M${f1(bx0 + ((bx1 - bx0) * i) / 9)} ${by1} L${f1(-200 + (2320 * i) / 9)} 1280`, "h", tc(floor, 2), { op: 0.5 }));
  out.push(FT(P4([[bx0, by1 - 22], [bx1, by1 - 22], [bx1, by1], [bx0, by1]]), "white", 2));
  return out.join("");
};
// night grade: a navy tint over the room, then warm lamp glows drawn on top (lit things stay lit)
const nightGrade = (lamps) => FT(rect(-200, -200, 2320, 1480), "navy", 0, 0.3) + lamps.map(([x, y, r]) => glow(x, y, r, "yellow", 0.5)).join("");
const clockMk = (cx, cy, r, h, m) => {
  const a = ((h % 12) + m / 60) * 30, b = m * 6, tip = (deg, len) => [cx + Math.sin((deg * Math.PI) / 180) * r * len, cy - Math.cos((deg * Math.PI) / 180) * r * len];
  return P(circ(cx, cy, r), "white", "m", { flat: true }) + K(raysPath(cx, cy, r * 0.82, r * 0.94, 12), "d") + K(line([cx, cy], tip(a, 0.5)), "n") + K(line([cx, cy], tip(b, 0.78)), "m") + P(circ(cx, cy, r * 0.07), "ink", "h", { flat: true });
};
reg(PROP, "ep-wall-clock", "Gauges", "Wall clock · 10:10", [-110, -110, 220, 220], ["clock", "wall clock", "time", "hours", "round clock"], (o) => clockMk(0, 0, 100, o.h ?? 10, o.m ?? 10), { h: 10, m: 10 });
reg(PROP, "ep-wall-clock-3am", "Gauges", "Wall clock · 3 a.m.", [-110, -110, 220, 220], ["clock", "3am", "night", "insomnia", "awake", "late"], (o) => clockMk(0, 0, 100, 3, 0));

// ---------- windows ----------
const windowMk = (x, y, night) => P(rect(x, y, 280, 320), "white", "m", { tone: 1, flat: true }) + (night
  ? P(rect(x + 16, y + 16, 248, 288), "navy", "h", { flat: true }) + FT(circ(x + 190, y + 110, 38), "gold", 1) + [[60, 70], [100, 200], [210, 240], [50, 250]].map(([a, b]) => FT(circ(x + a, y + b, 4), "white", 0)).join("")
  : P(rect(x + 16, y + 16, 248, 288), "sky", "h", { tone: 1, flat: true }) + FT(circ(x + 196, y + 96, 36), "yellow", 0) + FT(smooth([[x + 40, y + 120], [x + 60, y + 96], [x + 100, y + 92], [x + 130, y + 114], [x + 40, y + 120]]), "white", 0)) + K(`M${x + 140} ${y + 16} V${y + 304} M${x + 16} ${y + 160} H${x + 264}`, "m", tc("white", 2));
reg(KIT, "kit-window-night", "Bedroom", "Window · night sky and moon", [-160, -180, 320, 360], ["window", "night", "moon", "stars", "bedroom", "sky"], () => L.g(windowMk(0, 0, true), "translate(-140 -160)"));
reg(KIT, "kit-window-day", "Bedroom", "Window · day sky and sun", [-160, -180, 320, 360], ["window", "day", "sun", "sky", "bedroom", "cloud"], () => L.g(windowMk(0, 0, false), "translate(-140 -160)"));

// ---------- Dave's bedroom (episode 40): bed with headboard, nightstand, wall clock, window ----------
const bedMk = (o) => L.shadow(758, 892, 880) + P(rr(360, 560, 36, 330, 6), "wood", "m", { tone: 2 }) + P(rect(396, 836, 760, 54), "wood", "m", { tone: 2, flat: true }) + P(rr(396, 790, 760, 54, 20), "white", "m", { tone: 2, flat: true })
  + P(smooth([[404, 790], [412, 744], [500, 738], [540, 790]]) + " Z", "white", "m", { flat: true }) + (o.blanket ? P("M640 800 Q780 744 900 770 Q1040 744 1156 790 V882 H640 Z", o.blanket === true ? "blue" : o.blanket, "m", { tone: 1 }) : "");
const nightstandMk = () => P(rect(1180, 770, 130, 120), "wood", "m", { tone: 2, flat: true }) + P(rr(1170, 750, 150, 28, 6), "wood");
reg(KIT, "kit-bed-simple", "Bedroom", "Bed · headboard, mattress, pillow", [-420, -360, 840, 380], ["bed", "mattress", "pillow", "headboard", "sleep", "bedroom"], (o) => L.g(bedMk(o), "translate(-758 -890)"), { blanket: true });
reg(KIT, "kit-bed-bare", "Bedroom", "Bed · no blanket", [-420, -360, 840, 380], ["bed", "mattress", "pillow", "bare", "sleep"], (o) => L.g(bedMk({}), "translate(-758 -890)"));
reg(KIT, "kit-nightstand", "Bedroom", "Nightstand", [-100, -170, 200, 190], ["nightstand", "bedside table", "table", "bedroom", "furniture"], () => L.shadow(0, 0, 170) + L.g(nightstandMk(), "translate(-1245 -890)"));
const bedroom = (o) => {
  const night = o.time !== "day", out = [room({ wall: night ? "night" : "wall", floor: night ? "navy" : "floor" }), windowMk(1280, 170, night), clockMk(900, 300, 90, night ? 3 : 7, 0), nightstandMk(), bedMk(o)];
  if (night) out.push(glow(1450, 280, 260, "gold", 0.28));
  return out.join("");
};
reg(KIT, "kit-room-bedroom-night", "Rooms", "Bedroom · night (Dave's, moon window)", [0, 0, 1920, 1080], ["bedroom", "night", "bed", "room", "moon", "sleep", "insomnia", "dark"], bedroom, { time: "night", blanket: false }, { wide: true });
reg(KIT, "kit-room-bedroom-day", "Rooms", "Bedroom · day (sun window)", [0, 0, 1920, 1080], ["bedroom", "day", "bed", "room", "morning", "sun", "sunny"], bedroom, { time: "day", blanket: true }, { wide: true });

// ---------- Dave's kitchen (episode 40) ----------
const fridgeMk = (open) => L.shadow(0, 0, 250) + P(rr(-95, -550, 190, 550, 12), "white", "m", { tone: 2, flat: true }) + (open
  ? P(rect(-79, -534, 158, 518), "sky", "h", { tone: 1, flat: true }) + [-410, -300, -190].map((y) => K(line([-79, y], [79, y]), "m", tc("gray", 2))).join("") + P("M-95 -550 L-175 -525 L-175 30 L-95 0 Z", "white", "d")
  : K(line([-95, -340], [95, -340]), "d", tc("gray", 2)) + P(rr(65, -490, 10, 100, 6), "gray", "h", { tone: 2 }) + P(rr(65, -310, 10, 140, 6), "gray", "h", { tone: 2 }));
reg(KIT, "kit-fridge-closed", "Kitchen", "Fridge · closed", [-130, -580, 260, 600], ["fridge", "refrigerator", "kitchen", "cold", "appliance"], () => fridgeMk(false));
reg(KIT, "kit-fridge-open", "Kitchen", "Fridge · door open, shelves", [-230, -580, 370, 620], ["fridge", "refrigerator", "open", "kitchen", "shelves", "cold"], () => fridgeMk(true));
const tableMk = () => L.shadow(0, 0, 1500) + [-680, 640].map((x) => P(rect(x, -44, 36, 44), "wood", "m", { tone: 2, flat: true })).join("") + P("M-700 -84 H700 V-42 H-700 Z", "wood", "m", { tone: 2, flat: true }) + P("M-600 -274 H600 L700 -84 H-700 Z", "wood", "m", { tone: 1 });
reg(KIT, "kit-table-kitchen", "Kitchen", "Kitchen table · wide, in perspective", [-760, -300, 1520, 330], ["table", "kitchen table", "dining", "desk", "wide table", "counter"], tableMk, {});
const kitchen = (o) => {
  const night = o.time === "night", out = [room({ wall: night ? "night" : "wall", floor: night ? "navy" : "wood" })];
  [0, 1, 2].forEach((i) => out.push(P(rr(700 + i * 190, 150, 180, 190, 6), "wood", "d", { tone: 1 }), P(circ(700 + i * 190 + 150, 300, 7), "gold", "h")));
  out.push(P(rect(660, 560, 640, 180), "wood", "d", { tone: 2 }), P(rect(640, 536, 680, 28), "gray", "d", { tone: 1 }), L.g(fridgeMk(o.fridge === "open"), "translate(475 740)"));
  out.push(P(rr(1340, 200, 220, 160, 6), "wood", "d"), P(rect(1352, 212, 196, 136), night ? "navy" : "sky", "h", { tone: night ? 0 : 1, flat: true }));
  out.push(L.g(tableMk(), "translate(1160 964)"));
  if (night) out.push(nightGrade([[1160, 330, 520], [1160, 760, 420]]), P(rect(1156, 110, 8, 90), "ink", "h", { flat: true }), P("M1100 270 L1130 200 H1190 L1220 270 Z", "yellow", "d"), P(rect(1352, 212, 196, 136), "navy", "h", { flat: true }), FT(circ(1480, 250, 22), "gold", 1), [[1380, 240], [1420, 320], [1520, 300]].map(([x, y]) => FT(circ(x, y, 3), "white", 0)).join(""));
  return out.join("");
};
reg(KIT, "kit-room-kitchen-day", "Rooms", "Kitchen · day (fridge, cabinets, long table)", [0, 0, 1920, 1080], ["kitchen", "room", "day", "table", "fridge", "cabinet", "dave's kitchen"], kitchen, { time: "day" }, { wide: true });
reg(KIT, "kit-room-kitchen-night", "Rooms", "Kitchen · night (pendant lamp)", [0, 0, 1920, 1080], ["kitchen", "room", "night", "lamp", "late night", "midnight snack"], kitchen, { time: "night" }, { wide: true });
reg(KIT, "kit-room-kitchen-fridge-open", "Rooms", "Kitchen · day, fridge open", [0, 0, 1920, 1080], ["kitchen", "fridge", "open", "snack", "cold", "room"], kitchen, { time: "day", fridge: "open" }, { wide: true });

// ---------- library furniture ----------
const COLS = ["red", "blue", "green", "orange", "purple", "gold", "navy", "pink"];
const shelvesMk = (x0, y0, x1, y1, rows, seed) => {
  const out = [P(rect(x0, y0, x1 - x0, y1 - y0), "wood", "d", { tone: 2, flat: true })], rh = (y1 - y0) / rows;
  for (let r = 0; r < rows; r++) {
    let x = x0 + 8, i = r * 5 + seed;
    while (x < x1 - 26) { const bw = 24 + ((i * 7) % 4) * 6, bh = rh * (0.5 + ((i * 3) % 4) * 0.12); out.push(FT(rect(x, y0 + (r + 1) * rh - 8 - bh, bw, bh), COLS[(i * 5) % 8], i % 3)); x += bw + 2; i++; }
    out.push(K(line([x0, y0 + (r + 1) * rh - 6], [x1, y0 + (r + 1) * rh - 6]), "m", tc("wood", 2)));
  }
  return out.join("");
};
reg(KIT, "kit-bookshelf", "Library", "Bookshelf · tall, four rows of books", [-210, -590, 420, 610], ["bookshelf", "bookcase", "books", "library", "shelf", "shelves"], (o) => L.shadow(0, 0, 400) + shelvesMk(-190, -560, 190, 0, 4, o.seed ?? 340), { seed: 340 });
reg(KIT, "kit-bookshelf-low", "Library", "Bookcase · low, two rows", [-210, -310, 420, 330], ["bookshelf", "bookcase", "books", "low", "library", "shelf"], (o) => L.shadow(0, 0, 400) + shelvesMk(-190, -280, 190, 0, 2, o.seed ?? 780), { seed: 780 });
const deskLib = (o) => { const w = o.w || 440; return L.shadow(0, 0, w + 60) + P(rect(-w / 2 + 20, -126, w - 40, 126), "wood", "m", { tone: 2, flat: true }) + P(rr(-w / 2, -150, w, 28, 6), "wood", "m", { tone: 1 }); };
reg(KIT, "kit-desk-library", "Library", "Librarian's desk", [-270, -190, 540, 210], ["desk", "librarian", "library", "counter", "table", "wood"], deskLib, {});
const chairMk = (k) => { const sy = -56 * k; return [P(rr(-46 * k, sy - 98 * k, 92 * k, 104 * k, 12 * k), "wood", "m"), [-1, 1].map((s) => K(line([s * 44 * k, sy + 14 * k], [s * 48 * k, 0]), "n")).join(""), P(rr(-54 * k, sy, 108 * k, 18 * k, 6), "wood", "m")].join(""); };
reg(KIT, "kit-chair-library", "Library", "Chair · wooden, front on", [-100, -270, 200, 290], ["chair", "wooden chair", "library", "seat", "furniture"], () => L.shadow(0, 0, 130) + chairMk(1.5));
const armchair = (o) => { const n = o.c || "green"; return L.shadow(0, 0, 300) + P(rr(-84, -250, 168, 220, 20), n, "m", { tone: 2 }) + P(rr(-120, -150, 44, 130, 12), n) + P(rr(76, -150, 44, 130, 12), n) + P(rr(-96, -96, 192, 62, 12), n, "m", { tone: 1 }); };
reg(KIT, "kit-armchair-green", "Library", "Armchair · green", [-150, -270, 300, 290], ["armchair", "chair", "sofa chair", "seat", "reading", "furniture", "green"], armchair, { c: "green" });
reg(KIT, "kit-armchair-red", "Library", "Armchair · red", [-150, -270, 300, 290], ["armchair", "chair", "seat", "reading", "furniture", "red"], armchair, { c: "red" });
reg(KIT, "kit-armchair-orange", "Library", "Armchair · orange", [-150, -270, 300, 290], ["armchair", "chair", "seat", "reading", "furniture", "orange"], armchair, { c: "orange" });

// ---------- the library's visitors: tired adenosine (lavender, heavy lids) and caffeine look-alikes (orange, wide-eyed) ----------
const visMk = (o, k) => {
  const caf = o.kind === "caf", h = (o.sit ? 96 : 128) * k, bw = 38 * k, ey = -h * 0.66, ex = 15 * k, lw = k >= 1 ? "m" : "d", out = [];
  const col = caf ? tc("orange", 1) : L.mix(tc("purple", 1), tc("gray", 1), 0.45), G = gradFor(col), gr = { grad: G.url };
  out.push(G.def);
  if (!o.sit) [-1, 1].forEach((s) => out.push(RS(circ(s * bw * 0.45, -3 * k, 15 * k, 6 * k), col, "d", gr)));
  out.push(RS(`M${f1(-bw)} 0 V${f1(-h * 0.62)} Q${f1(-bw)} ${f1(-h)} 0 ${f1(-h)} Q${f1(bw)} ${f1(-h)} ${f1(bw)} ${f1(-h * 0.62)} V0 Z`, col, lw, gr));
  [-1, 1].forEach((s) => {
    const cx = s * ex, r = 10 * k;
    out.push(P(circ(cx, ey, r), "white", "h"), P(circ(cx + (caf ? 0 : s * 0.5 * k), ey + (caf ? 0 : 3.5 * k), (caf ? 4.8 : 4) * k), "ink", "h"));
    if (!caf) out.push(RS(`M${f1(cx - r)} ${f1(ey)} A${f1(r)} ${f1(r)} 0 0 1 ${f1(cx + r)} ${f1(ey)} Z`, col, "h", gr), K(`M${f1(cx - r * 0.8)} ${f1(ey + r * 1.25)} Q${f1(cx)} ${f1(ey + r * 1.55)} ${f1(cx + r * 0.8)} ${f1(ey + r * 1.25)}`, "h", tc("purple", 2)));
  });
  out.push(K(caf ? `M${f1(-12 * k)} ${f1(ey + 22 * k)} Q0 ${f1(ey + 36 * k)} ${f1(12 * k)} ${f1(ey + 22 * k)}` : line([-8 * k, ey + 28 * k], [8 * k, ey + 27 * k]), "d"));
  return out.join("");
};
const BOX_VIS = [-100, -215, 200, 240];
reg(KIT, "kit-visitor-tired", "Library visitors", "Visitor · tired (adenosine, lavender)", BOX_VIS, ["visitor", "tired", "sleepy", "adenosine", "lavender", "ghost", "blob", "character", "heavy lids"], (o) => L.shadow(0, 0, 130) + visMk({ kind: "ado" }, 1.5));
reg(KIT, "kit-visitor-caffeine", "Library visitors", "Visitor · caffeine look-alike (orange, wide-eyed)", BOX_VIS, ["visitor", "caffeine", "orange", "wide eyed", "impostor", "look-alike", "character", "blob"], (o) => L.shadow(0, 0, 130) + visMk({ kind: "caf" }, 1.5));
reg(KIT, "kit-visitor-tired-sitting", "Library visitors", "Visitor · tired, sitting (no feet)", BOX_VIS, ["visitor", "tired", "sitting", "seated", "adenosine"], () => visMk({ kind: "ado", sit: true }, 1.5));
reg(KIT, "kit-visitor-caffeine-sitting", "Library visitors", "Visitor · caffeine, sitting", BOX_VIS, ["visitor", "caffeine", "sitting", "seated", "orange"], () => visMk({ kind: "caf", sit: true }, 1.5));
const chairWith = (kind) => L.shadow(0, 0, 130) + chairMk(1.5) + L.g(visMk({ kind, sit: true }, 1.5), `translate(0 ${f1(-56 * 1.5 + 3)})`);
reg(KIT, "kit-chair-with-tired", "Library visitors", "Chair · tired visitor sitting", [-100, -270, 200, 290], ["chair", "visitor", "tired", "sitting", "taken seat", "adenosine", "library"], () => chairWith("ado"));
reg(KIT, "kit-chair-with-caffeine", "Library visitors", "Chair · caffeine visitor sitting (blocks the seat)", [-100, -270, 200, 290], ["chair", "visitor", "caffeine", "sitting", "blocked seat", "impostor", "library"], () => chairWith("caf"));

// ---------- the library (Dave's brain) and its corridor ----------
const libraryRoom = (o) => {
  const night = o.time === "night", out = [room({ wall: night ? "brown" : "earth", floor: night ? "brown" : "wood" }), shelvesMk(340, 140, 720, 700, 4, 340), shelvesMk(780, 140, 1160, 700, 4, 780), shelvesMk(1220, 140, 1580, 700, 4, 1220)];
  if (night) out.push(nightGrade([[640, 150, 480], [1280, 150, 480]]), [640, 1280].map((x) => K(line([x, 110], [x, 175]), "m") + P(`M${x - 38} 232 L${x - 16} 175 H${x + 16} L${x + 38} 232 Z`, "yellow", "d")).join(""));
  return out.join("");
};
reg(KIT, "kit-room-library-day", "Rooms", "Library · day (three bookcases, Dave's brain)", [0, 0, 1920, 1080], ["library", "bookcases", "books", "room", "brain", "librarian", "memory", "shelves", "day"], libraryRoom, { time: "day" }, { wide: true });
reg(KIT, "kit-room-library-night", "Rooms", "Library · night (pendant lamps)", [0, 0, 1920, 1080], ["library", "bookcases", "books", "room", "night", "lamp", "late", "shelves"], libraryRoom, { time: "night" }, { wide: true });
const corridor = (o) => {
  const out = [room({ wall: "earth", floor: "wood", back: [800, 340, 1120, 640] })];
  [[400, 180], [640, 440], [880, 700]].forEach(([y0]) => out.push(K(line([-200, y0 + 200], [800, 340 + (y0 - 400) * 0.12 + 40]), "m", tc("wood", 2)), K(line([2120, y0 + 200], [1120, 340 + (y0 - 400) * 0.12 + 40]), "m", tc("wood", 2))));
  out.push(P(rr(900, 420, 120, 220, 6), "gold", "d", { tone: 1 }), P(circ(1000, 540, 6), "ink", "h", { flat: true }));
  return out.join("");
};
reg(KIT, "kit-room-corridor", "Rooms", "Corridor · long hall, door at the far end", [0, 0, 1920, 1080], ["corridor", "hallway", "hall", "door", "queue", "waiting room", "perspective", "library"], corridor, {}, { wide: true });
// n visitors queueing along the corridor, back to front (positions are scene coordinates, so draw it over kit-room-corridor)
const queue = (o) => {
  const n = o.n ?? 10, out = [];
  for (let i = n - 1; i >= 0; i--) { const d = Math.min(i * 0.1, 0.98), x = 640 + 300 * d, gy = 985 - 335 * d, k = 1.7 - 1.25 * d; out.push(L.g(visMk({ kind: o.kind || "ado" }, k), `translate(${f1(x)} ${f1(gy)})`)); }
  return out.join("");
};
reg(KIT, "kit-queue", "Library visitors", "Queue · visitors in the corridor (n option)", [0, 0, 1920, 1080], ["queue", "line", "waiting", "visitors", "crowd", "tired", "row", "line up"], queue, { n: 10 }, { wide: true });
reg(KIT, "kit-scene-corridor-queue", "Rooms", "Corridor + queue of tired visitors", [0, 0, 1920, 1080], ["queue", "corridor", "waiting", "line", "visitors", "tired", "library", "crowd"], (o) => corridor(o) + queue(o), { n: 10 }, { wide: true });
reg(PROP, "ep-queue-panel", "Library visitors", "Queue panel · small card with visitors in a row", [-210, -110, 420, 220], ["queue", "panel", "card", "inset", "visitors", "count", "waiting"], (o) => {
  const w = 380, h = 190, n = o.n ?? 6, out = [FL(rr(-w / 2 + 6, -h / 2 + 8, w, h, 20), "ink", 0.14), P(rr(-w / 2, -h / 2, w, h, 20), "earth", "m", { tone: 1, flat: true })];
  for (let i = 0; i < n; i++) out.push(L.g(visMk({ kind: "ado" }, 0.55), `translate(${f1(-w / 2 + 40 + (i * (w - 80)) / Math.max(7, n - 1))} ${h / 2 - 22})`));
  return out.join("") + L.text("THE QUEUE", 0, -h / 2 + 62, { size: 40 });
}, { n: 6 });

// ======================================================================================================================
// GAUGES, BODY AND MEDICAL (episode 40), OFFICE AND SCIENCE PROPS
// ======================================================================================================================
const CP = (d, fillC, strokeC, w = "h") => L.tag("path", { d, fill: fillC, stroke: strokeC, "stroke-width": L.lw(WK[w]), "stroke-linecap": L.T.cap, "stroke-linejoin": L.T.join });
const shadowCard = (x, y, w, h, r, name, o = {}) => FL(rr(x + 6, y + 8, w, h, r), "ink", 0.14) + P(rr(x, y, w, h, r), name, o.w || "m", Object.assign({ flat: true }, o));

// bar gauge 0..500 with a green "fine" zone up to o.limit and a fill at o.level
const gaugeBar = (o) => {
  const wd = 130, h = 400, x = -wd / 2, y = -h / 2, yOf = (v) => y + h - (v / 500) * h, out = [shadowCard(x, y, wd, h, 12, "white")];
  if (o.limit) out.push(FT(rect(x + 5, yOf(o.limit), wd - 10, y + h - 5 - yOf(o.limit)), "green", 1, 0.6), K(line([x - 36, yOf(o.limit)], [x + wd + 36, yOf(o.limit)]), "n", tc("green", 2)));
  if (o.level) out.push(FT(rect(x + 5, yOf(o.level), wd - 10, y + h - 5 - yOf(o.level)), o.fill || "orange", 0));
  for (let v = 0; v <= 500; v += 100) out.push(K(line([x + wd - 18, yOf(v)], [x + wd, yOf(v)]), "d"));
  return out.join("");
};
reg(PROP, "ep-gauge-bar", "Gauges", "Bar gauge · fill below a green limit zone", [-120, -230, 240, 460], ["gauge", "bar", "meter", "level", "limit", "thermometer", "fill", "scale", "dose"], gaugeBar, { level: 220, limit: 400 });
reg(PROP, "ep-gauge-bar-over", "Gauges", "Bar gauge · over the limit", [-120, -230, 240, 460], ["gauge", "bar", "meter", "over", "too much", "limit", "danger", "warning"], gaugeBar, { level: 470, limit: 200, fill: "red" });

reg(PROP, "ep-ecg", "Medical", "ECG strip · heartbeat line on a card", [-310, -110, 620, 220], ["ecg", "heartbeat", "pulse", "heart rate", "monitor", "medical", "line"], (o) => {
  const w = 520, n = o.n ?? 4, amp = 60, bw = w / n, pts = [];
  for (let i = 0; i < n; i++) [[0, 0], [0.2, 0], [0.26, -0.15], [0.32, 0], [0.4, 0], [0.44, 0.15], [0.5, -1], [0.56, 0.3], [0.62, 0], [0.78, -0.25], [0.9, 0], [1, 0]].forEach(([a, b]) => pts.push([-w / 2 + i * bw + a * bw, b * amp]));
  return shadowCard(-w / 2 - 20, -90, w + 40, 180, 12, "white") + K(poly(pts), "n", tc(o.c || "blue", 2));
}, { n: 4 });
reg(PROP, "ep-heart", "Medical", "Heart · simple red", [-110, -100, 220, 200], ["heart", "love", "organ", "health", "cardio", "red heart", "pulse"], (o) => P(heartPath(0, -4, 2.8), o.c || "red"), { c: "red" });
reg(PROP, "ep-kidney", "Medical", "Kidney · friendly", [-110, -140, 220, 280], ["kidney", "organ", "body", "medical", "filter", "anatomy"], () => {
  const k = 1.4, pts = []; for (let i = 0; i <= 28; i++) { const a = (i / 28) * Math.PI * 2; let x = 62 * Math.cos(a), y = 88 * Math.sin(a); if (x < 0) x += 38 * Math.exp(-(y * y) / (2 * 30 * 30)); pts.push([x * k, y * k]); }
  return RS(smooth(pts), L.mix(tc("red", 2), tc("brown", 1), 0.5)) + K(line([-20 * k, -10 * k], [-50 * k, -20 * k]) + " " + line([-20 * k, 10 * k], [-50 * k, 22 * k]), "m", tc("red", 2));
});
reg(KIT, "kit-hospital", "Medical", "Hospital · white block, blue roof and door", [-290, -380, 580, 400], ["hospital", "building", "clinic", "medical", "doctor", "health", "emergency"], () => {
  const out = [L.shadow(0, 0, 520), P(rect(-210, -330, 420, 330), "white", "m", { tone: 2, flat: true }), P(rect(-220, -350, 440, 30), "blue", "m", { tone: 1, flat: true })];
  for (let r = 0; r < 3; r++) for (let c = 0; c < 5; c++) out.push(P(rect(-180 + c * 78, -300 + r * 76, 50, 46), "sky", "d", { tone: 1, flat: true }));
  out.push(P(rect(-44, -112, 88, 112), "blue", "m", { tone: 1, flat: true }), P("M-70 -118 H70 L56 -150 H-56 Z", "blue", "d"));
  return out.join("");
});
reg(PROP, "ep-track-100", "Gauges", "Progress track · 0 to 100 with a flag", [-590, -215, 1250, 400], ["track", "progress", "scale", "0 to 100", "finish", "flag", "timeline", "distance", "count"], (o) => {
  const x0 = -500, x1 = 500, xAt = (n) => x0 + ((x1 - x0) * n) / 100, out = [shadowCard(-560, -190, 1220, 360, 32, "white")];
  out.push(K(line([x0, 40], [x1, 40]), "n"));
  for (let n = 0; n <= 100; n += 10) out.push(K(line([xAt(n), 24], [xAt(n), 56]), "d"));
  out.push(K(line([x1, 40], [x1, -130]), "n"), P(`M${x1} -130 L${x1 + 110} -100 L${x1} -70 Z`, "red"), L.text("0", x0, 118, { size: 64 }), L.text("100", x1, 118, { size: 64 }));
  if (o.at !== undefined) out.push(K(line([xAt(o.at), 36], [xAt(o.at), -20]), "n", tc("blue", 2)), P(circ(xAt(o.at), -42, 24), "blue"));
  return out.join("");
}, { at: 30 });
reg(PROP, "ep-label-sheet", "Gauges", "Label sheet · INGREDIENTS card", [-350, -290, 700, 580], ["label", "ingredients", "nutrition", "card", "list", "sheet", "paper"], (o) => {
  const w = 640, h = 520, x = -w / 2, y = -h / 2, out = [shadowCard(x, y, w, h, 20, "white"), L.text("INGREDIENTS", 0, y + 82, { size: 64, c: tc("gray", 2) }), K(line([x + 40, y + 112], [x + w - 40, y + 112]), "d")];
  [0.9, 0.7, 0.8, 0.55, 0.75].forEach((f, i) => out.push(P(rr(x + 40, y + 160 + i * 66, 22, 22, 6), "red", "h", { flat: true }), K(line([x + 90, y + 171 + i * 66], [x + 90 + (w - 160) * f, y + 171 + i * 66]), "m", tc("gray", 1))));
  return out.join("");
});
reg(KIT, "kit-factory", "Medical", "Factory · saw-tooth roof and chimney", [-280, -360, 560, 380], ["factory", "industry", "plant", "chimney", "production", "manufacturing", "building"], () => {
  const ox = -185, X = (v) => v + ox, out = [L.shadow(ox + 200, 0, 520), P(rect(X(300), -330, 70, 330), "red", "m", { tone: 2, flat: true })];
  out.push(P(`M${X(0)} 0 V-150 L${X(100)} -220 V-150 L${X(200)} -220 V-150 L${X(300)} -220 V0 Z`, "gray", "m", { tone: 1 }));
  [0, 1, 2].forEach((i) => out.push(P(rect(X(30 + i * 100), -110, 50, 44), "sky", "d", { tone: 1, flat: true })));
  return out.join("");
});
reg(PROP, "ep-flask", "Science", "Flask · green liquid", [-140, -280, 280, 300], ["flask", "science", "chemistry", "lab", "erlenmeyer", "liquid", "experiment"], (o) =>
  P("M-30 -250 H30 V-150 L110 -20 Q120 0 90 0 H-90 Q-120 0 -110 -20 L-30 -150 Z", "glass", "n", { flat: true }) + FT("M-66 -70 H66 L104 -14 Q100 -6 88 -6 H-88 Q-100 -6 -104 -14 Z", o.c || "green", 1, 0.9), { c: "green" });
reg(PROP, "ep-megaphone", "Office", "Megaphone · red", [-170, -140, 320, 280], ["megaphone", "loudspeaker", "announce", "shout", "news", "speak", "loud"], () =>
  P("M-90 -40 L110 -110 V110 L-90 40 Z", "red", "n") + P(rr(-150, -46, 70, 92, 12), "gray", "m", { tone: 1 }) + P(rr(-130, 30, 36, 90, 6), "gray", "m", { tone: 2 }));
reg(PROP, "ep-mug-coffee", "Office", "Mug · coffee with steam", [-130, -330, 300, 360], ["mug", "coffee", "cup", "tea", "steam", "hot drink", "caffeine", "breakfast"], () => {
  const k = 0.9; return P(circ(0, 0, 120 * k, 18 * k), "white", "m", { tone: 2, flat: true }) + K(`M${80 * k} ${-150 * k} q${70 * k} ${10 * k} ${50 * k} ${70 * k} q${-20 * k} ${40 * k} ${-76 * k} ${40 * k}`, "n")
    + P(rr(-90 * k, -190 * k, 180 * k, 190 * k, 20), "white", "n") + P(circ(0, -188 * k, 90 * k, 14 * k), "brown", "m", { flat: true }) + [-34, 0, 34].map((dx) => K(`M${dx * k} ${-220 * k} q${14 * k} ${-26 * k} 0 ${-52 * k} q${-14 * k} ${-26 * k} 0 ${-52 * k}`, "m", tc("gray", 1))).join("");
});
reg(PROP, "ep-warning-triangle", "Gauges", "Warning triangle · calm amber", [-120, -110, 240, 210], ["warning", "caution", "triangle", "sign", "danger", "alert", "exclamation"], () =>
  P("M0 -90 L100 80 H-100 Z", "gold", "n") + K(line([0, -36], [0, 28]), "n") + P(circ(0, 54, 7), "ink", "h", { flat: true }));
reg(PROP, "ep-magnifier", "Office", "Magnifying glass", [-150, -150, 360, 360], ["magnifier", "magnifying glass", "search", "zoom", "look closer", "detective", "inspect"], () =>
  K(line([79, 79], [187, 187]), "n", "brown", { s: 4 }) + P(circ(0, 0, 110), "glass", "n", { tone: 1 }) + K(L.arc(0, 0, 80, 200, 260), "m", tc("sky", 2), { op: 0.8 }));
reg(PROP, "ep-pencil-big", "Office", "Pencil · big yellow", [-260, -50, 520, 100], ["pencil", "write", "draw", "school", "stationery", "yellow", "homework"], () => {
  const len = 420; return L.g(P(rect(-len, -22, len - 54, 44), "yellow") + P("M-54 -22 L0 0 L-54 22 Z", "sand") + P("M-14 -6 L0 0 L-14 6 Z", "ink", "h", { flat: true }) + P(rect(-len - 30, -22, 30, 44), "pink"), `translate(${(len + 30) / 2 - 15} 0)`);
});

// ======================================================================================================================
// STREET, BUTTONS AND OFFICE (episode 37)
// ======================================================================================================================
const walkBtn = (o) => {
  const out = [];
  if (o.sign) {
    const sw = 460, sh = 330, sx = -sw / 2, sy = -120 - sh;
    out.push(K(line([0, sy + sh], [0, -100]), "n", tc("gray", 2), { s: 4 }), shadowCard(sx, sy, sw, sh, 12, "white"), K(rr(sx + 12, sy + 12, sw - 24, sh - 24, 6), "d"));
    [sx + 30, sx + sw - 30].forEach((bx) => out.push(P(circ(bx, sy + 30, 7), "gray", "h")));
    out.push(...[["TO CROSS STREET", 80, 40], ["PUSH BUTTON", 168, 52], ["WAIT FOR", 240, 40], ["WALK SIGNAL", 288, 40]].map(([s, dy, z]) => L.text(s, 0, sy + dy, { size: z })));
  }
  out.push(FL(rr(-130 + 6, -100 + 10, 260, 200, 20), "ink", 0.14), P(rr(-130, -100, 260, 200, 20), "yellow", o.sign ? "m" : "n"));
  [[-104, -74], [104, -74], [-104, 74], [104, 74]].forEach(([dx, dy]) => out.push(P(circ(dx, dy, 8), "gray", "h", { tone: 2 })));
  out.push(P(circ(0, 0, 74), "ink", "m"), P(circ(0, 0, 54), "gray", "m", { tone: o.dead ? 2 : 1 }), FT(circ(-16, -18, 18, 11), "white", 0, o.dead ? 0.25 : 0.75));
  return out.join("");
};
reg(PROP, "ep-walk-button", "Street", "Pedestrian button box · yellow", [-160, -130, 320, 260], ["button", "crosswalk", "pedestrian", "push button", "walk", "street", "traffic", "beg button"], walkBtn, {});
reg(PROP, "ep-walk-button-sign", "Street", "Pedestrian button + sign on a pole", [-250, -480, 500, 590], ["button", "crosswalk", "sign", "push button to cross", "pedestrian", "street", "wait for signal"], walkBtn, { sign: true });
reg(PROP, "ep-walk-button-dead", "Street", "Pedestrian button · dead (dull cap)", [-160, -130, 320, 260], ["button", "dead", "broken", "unplugged", "placebo", "crosswalk"], walkBtn, { dead: true });
const pedSig = (o) => {
  const out = [P(rr(-66, -112, 132, 224, 12), "ink", "d", { tone: 1 })];
  [-54, 54].forEach((dy) => out.push(P(rr(-50, dy - 46, 100, 92, 6), "ink", "h", { tone: 2, flat: true })));
  const hand = [CP(rr(-22, -62, 44, 42, 12), tc("orange", 1), tc("orange", 0))].concat([-17, -6, 5, 16].map((dx, i) => CP(rr(dx - 5, -54 - (30 - (i % 3) * 3), 10, 30, 5), tc("orange", 1), tc("orange", 0)))).join("");
  const walker = K("M-4 42 L-8 68 M-8 68 L-22 90 M-8 68 L10 90 M-22 54 L-4 44 L16 56", "m", "white") + FT(circ(0, 28, 9), "white", 0);
  out.push(L.g(hand, undefined, o.walk ? 0.12 : 1), L.g(walker, undefined, o.walk ? 1 : 0.12));
  return out.join("");
};
reg(PROP, "ep-ped-signal-stop", "Street", "Pedestrian signal · orange hand (don't walk)", [-90, -130, 180, 260], ["pedestrian signal", "hand", "stop", "don't walk", "crosswalk", "traffic", "street"], pedSig, {});
reg(PROP, "ep-ped-signal-walk", "Street", "Pedestrian signal · white walker (walk)", [-90, -130, 180, 260], ["pedestrian signal", "walk", "walker", "go", "crosswalk", "traffic", "street"], pedSig, { walk: true });
const trafficLight = (o) => {
  const on = o.on || "green", out = [P(rr(-50, -110, 100, 220, 12), "ink", "d", { tone: 1 })];
  [["red", -70], ["yellow", 0], ["green", 70]].forEach(([n, dy]) => out.push(L.g(P(circ(0, dy, 28), n, "h"), undefined, n === on ? 1 : 0.15)));
  return out.join("");
};
reg(PROP, "ep-traffic-light-green", "Street", "Traffic light · green", [-80, -130, 160, 260], ["traffic light", "signal", "green", "go", "street", "road"], trafficLight, { on: "green" });
reg(PROP, "ep-traffic-light-red", "Street", "Traffic light · red", [-80, -130, 160, 260], ["traffic light", "signal", "red", "stop", "street", "road"], trafficLight, { on: "red" });
const doorBtn = (o) => {
  const r = 60, close = o.kind !== "open", a = r * 0.52, h = r * 0.42, out = [P(circ(0, 0, r * 1.22), "gray", "d", { tone: 2 }), P(circ(0, 0, r), o.lit ? "gold" : "gray", "d", { tone: 1 })];
  [-1, 1].forEach((sd) => { const x0 = sd * (close ? r * 0.66 : r * 0.14), x1 = sd * (close ? r * 0.14 : r * 0.66); out.push(P(`M${f1(x0)} ${f1(-h)} L${f1(x1)} 0 L${f1(x0)} ${f1(h)} Z`, "ink", "h", { flat: true })); });
  out.push(K(line([0, -a], [0, a]), "d"));
  return out.join("");
};
reg(PROP, "ep-door-btn-close", "Street", "Lift button · door close (arrows in)", [-90, -90, 180, 180], ["lift", "elevator", "button", "door close", "close", "arrows"], doorBtn, { kind: "close" });
reg(PROP, "ep-door-btn-open", "Street", "Lift button · door open (arrows out)", [-90, -90, 180, 180], ["lift", "elevator", "button", "door open", "open", "arrows"], doorBtn, { kind: "open" });
reg(PROP, "ep-lift-panel", "Street", "Lift panel · floors 1-6, door buttons, key switch", [-140, -320, 280, 640], ["lift", "elevator", "panel", "buttons", "floors", "control panel", "door close", "fire key"], () => {
  const wd = 240, ht = 600, x0 = -wd / 2, y0 = -ht / 2, out = [FL(rr(x0 + 6, y0 + 10, wd, ht, 12), "ink", 0.14), P(rr(x0, y0, wd, ht, 12), "gray", "m", { tone: 1, dir: "v" })];
  for (let i = 0; i < 6; i++) { const bx = i % 2 ? 50 : -50, by = y0 + 110 + Math.floor((5 - i) / 2) * 90; out.push(P(circ(bx, by, 30), "gray", "d", { tone: 2 }), P(circ(bx, by, 24), "white", "h", { tone: 2 }), L.text(String(i + 1), bx, by + 13, { size: 40 })); }
  out.push(L.g(doorBtn({ kind: "open" }), `translate(-52 ${y0 + 420}) scale(0.567)`), L.g(doorBtn({ kind: "close" }), `translate(52 ${y0 + 420}) scale(0.567)`));
  const ky = y0 + 530;
  out.push(P(rr(-70, ky - 40, 140, 80, 6), "red", "d"), P(circ(34, ky, 22), "gray", "d", { tone: 1 }), K(line([34, ky - 12], [34, ky + 12]), "m"), L.text("FIRE", -30, ky + 11, { size: 30, c: "white" }));
  return out.join("");
});
reg(PROP, "ep-thermostat", "Home", "Thermostat · display and up/down buttons", [-140, -170, 280, 340], ["thermostat", "temperature", "heating", "wall control", "up down", "degrees", "air conditioning"], (o) => {
  const out = [shadowCard(-120, -150, 240, 300, 32, "paper", { w: "m" }), P(rr(-86, -114, 172, 104, 12), "grass", "d", { tone: 1, flat: true }), L.text(o.temp || "22°", 0, -62 + 30, { size: 84 })];
  [[-52, true], [52, false]].forEach(([bx, up]) => { const s = up ? -1 : 1; out.push(P(circ(bx, 62, 34), "white", "d", { tone: 2 }), P(`M${bx - 14} ${62 - s * 8} L${bx} ${62 + s * 10} L${bx + 14} ${62 - s * 8} Z`, "ink", "h", { flat: true })); });
  return out.join("");
}, { temp: "22°" });
reg(PROP, "ep-newspaper", "Office", "Newspaper · masthead, headline, columns", [-290, -350, 580, 700], ["newspaper", "news", "paper", "press", "headline", "article", "daily"], (o) => {
  const w = 520, h = 640, x = -w / 2, y = -h / 2, out = [shadowCard(x, y, w, h, 0, "paper", { w: "d" }), L.text(o.mast || "DAILY NEWS", 0, y + 86, { size: 52 })];
  [y + 112, y + 168].forEach((yy) => out.push(K(line([x + 40, yy], [x + w - 40, yy]), "h")));
  out.push(L.text(o.date || "MONDAY", 0, y + 152, { size: 40 }));
  (o.head || ["BIG NEWS", "TODAY"]).forEach((s, i) => out.push(L.text(s, x + 50, y + 236 + i * 58, { size: 52, anchor: "start" })));
  const ly = y + 236 + (o.head || ["BIG NEWS", "TODAY"]).length * 58 + 10;
  [0, 1].forEach((c) => { const n = Math.max(1, Math.floor((y + h - ly - 30) / 40)); for (let i = 0; i < n; i++) out.push(K(line([x + 50 + c * ((w - 80) / 2), ly + i * 40], [x + 50 + c * ((w - 80) / 2) + ((w - 140) / 2) * (i === n - 1 ? 0.6 : 1), ly + i * 40]), "d", tc("gray", 1))); });
  return out.join("");
}, {});
reg(PROP, "ep-stopwatch", "Office", "Stopwatch · red hand", [-140, -190, 280, 330], ["stopwatch", "timer", "time", "seconds", "clock", "race", "countdown"], (o) => {
  const r = 110, a = ((o.deg ?? 40) * Math.PI) / 180;
  return P(rr(-18, -r - 46, 36, 34, 6), "gray", "d", { tone: 2 }) + P(circ(0, 0, r), "white") + K(raysPath(0, 0, r * 0.8, r * 0.92, 12), "d") + K(line([0, 0], [Math.sin(a) * r * 0.75, -Math.cos(a) * r * 0.75]), "n", "red") + P(circ(0, 0, 10), "ink", "h");
}, { deg: 40 });
reg(PROP, "ep-globe-flat", "Science", "Globe · simple blue and green", [-170, -170, 340, 340], ["globe", "earth", "world", "planet", "map", "geography", "international"], (o) => {
  const r = 140;
  return P(circ(0, 0, r), "sky") + [[-0.35, -0.3, 0.32, 0.22], [0.25, -0.1, 0.28, 0.4], [-0.2, 0.42, 0.24, 0.16]].map(([a, b, rx, ry]) => P(circ(a * r, b * r, rx * r, ry * r), "grass", "d")).join("") + K(circ(0, 0, r * 0.45, r) + " " + line([-r, 0], [r, 0]), "h", tc("blue", 1));
});
reg(PROP, "ep-push-button-red", "Street", "Push button · red, round", [-100, -100, 200, 200], ["button", "push button", "red button", "press", "buzzer", "switch"], (o) =>
  P(rr(-78, -78, 156, 156, 12), "white", "d", { tone: 2 }) + P(circ(0, 0, 60), o.c || "red", "d") + FT(circ(-18, -21, 18, 12), "white", 0, 0.6), { c: "red" });
reg(PROP, "ep-push-button-green", "Street", "Push button · green, round", [-100, -100, 200, 200], ["button", "push button", "green button", "go", "press", "start"], (o) => L.inline("ep-push-button-red", { c: "green" }));
reg(PROP, "ep-ticket-lottery", "Office", "Ticket · lottery card with a player", [-130, -190, 260, 380], ["ticket", "lottery", "card", "scratch card", "raffle", "prize", "gamble"], (o) => {
  const wd = 220, ht = 320, x0 = -wd / 2, y0 = -ht / 2, team = o.team || "red", px = 0, py = y0 + 236, out = [shadowCard(x0, y0, wd, ht, 12, "white")];
  out.push(P(rect(x0 + 14, y0 + 14, wd - 28, 40), team, "h", { flat: true }), P(rect(x0 + 24, y0 + 70, wd - 48, 170), "grass", "h", { tone: 1, flat: true }));
  out.push(K(`M${px} ${py - 80} L${px} ${py - 36} M${px - 20} ${py} L${px} ${py - 36} L${px + 24} ${py - 4} M${px - 30} ${py - 76} L${px} ${py - 66} L${px + 34} ${py - 92}`, "m"));
  out.push(P(rr(px - 26, py - 84, 52, 52, 12), team, "d"), P(circ(px, py - 112, 26), team, "d"), K(`M${px + 8} ${py - 106} H${px + 30} M${px + 8} ${py - 96} H${px + 28} M${px + 26} ${py - 108} V${py - 92}`, "d", tc("gray", 2)));
  out.push(P(`M${px + 30} ${py - 98} q14 -8 24 0 q-10 8 -24 0 Z`, "brown", "h"), L.text("$1", 0, y0 + 296, { size: 40 }));
  return out.join("");
}, { team: "red" });

// ======================================================================================================================
// MONEY, SCALES, ROCKET (episodes 39, 42)
// ======================================================================================================================
const numScale = (d, k) => d.replace(/-?\d+(\.\d+)?/g, (m) => f1(parseFloat(m) * k)); // scale a path made only of M/L/Q/C/H/V numbers (no arcs)
const banknote = (o) => {
  const n = o.c || "green", out = [FL(rr(-114, -46, 240, 104, 6), "ink", 0.14), P(rr(-120, -52, 240, 104, 6), n, "m", { tone: 1, flat: true }), K(rr(-108, -40, 216, 80, 6), "h", tc(n, 2)), P(circ(0, 0, 30, 36), n, "h", { flat: true })];
  if (o.val !== false) out.push(L.text(o.val || "$", 0, 20, { size: 52, c: tc(n, 2) }));
  return out.join("");
};
reg(PROP, "ep-banknote", "Money", "Banknote · green, with a value mark", [-140, -70, 280, 140], ["money", "banknote", "cash", "bill", "note", "dollar", "paper money", "currency"], banknote, { c: "green" });
reg(PROP, "ep-banknote-blue", "Money", "Banknote · blue", [-140, -70, 280, 140], ["money", "banknote", "cash", "bill", "blue", "currency"], banknote, { c: "blue" });
const bundleMk = (k) => P(rr(-100 * k, -32 * k, 200 * k, 64 * k, 6), "green", k >= 0.8 ? "m" : "d", { tone: 1 }) + [1, 2, 3, 4].map((i) => K(line([-94 * k, (-32 + i * 12.8) * k], [94 * k, (-32 + i * 12.8) * k]), "h", tc("green", 2))).join("") + P(rect(-18 * k, -32 * k, 36 * k, 64 * k), "paper", "h", { flat: true });
reg(PROP, "ep-cash-bundle", "Money", "Cash bundle · notes with a paper band", [-130, -60, 260, 120], ["cash", "bundle", "money", "stack of notes", "bank", "savings", "wad"], () => bundleMk(1.2));
reg(PROP, "ep-cash-pile", "Money", "Cash pile · pyramid of bundles on a pallet", [-420, -300, 840, 320], ["cash", "money", "pile", "pyramid", "bundles", "rich", "bank", "pallet", "fortune"], (o) => {
  const rows = o.rows ?? 5, bw = 140, bh = 50, out = [L.shadow(0, 0, rows * bw * 1.2), P(rect(-(rows * bw) / 2 - 20, -22, rows * bw + 40, 22), "wood", "d")];
  for (let r = 0; r < rows; r++) { const n = rows - r; for (let i = 0; i < n; i++) out.push(L.g(bundleMk(0.7), `translate(${f1((i - (n - 1) / 2) * bw)} ${f1(-22 - bh / 2 - r * bh)})`)); }
  return out.join("");
}, { rows: 5 });
reg(PROP, "ep-coin", "Money", "Coin · gold with a dollar mark", [-90, -90, 180, 180], ["coin", "gold coin", "money", "dollar", "cash", "currency", "token"], (o) => {
  const r = 70; return P(circ(0, 0, r), "gold") + K(circ(0, 0, r * 0.78), "h", tc("gold", 2)) + (o.str === false ? "" : L.text(o.str || "$", 0, 22, { size: 64, c: tc("gold", 2) }));
}, { str: "$" });
reg(PROP, "ep-coin-plain", "Money", "Coin · gold, blank", [-90, -90, 180, 180], ["coin", "gold coin", "money", "blank", "token", "penny"], () => L.inline("ep-coin", { str: false }));
reg(PROP, "ep-scale-kitchen", "Home", "Kitchen scale · digital readout", [-220, -130, 440, 150], ["scale", "kitchen scale", "weigh", "grams", "weight", "digital", "measure"], (o) =>
  L.shadow(0, 0, 420) + P(rr(-190, -90, 380, 90, 12), "gray", "m", { tone: 1 }) + P(rr(-176, -100, 352, 22, 6), "gray", "d", { tone: 2, flat: true }) + P(rr(-110, -66, 220, 46, 6), "navy", "d", { tone: 2, flat: true }) + L.text(o.read || "300 g", 0, -30, { size: 40, c: "white" }), { read: "300 g" });
reg(PROP, "ep-scale-bathroom", "Home", "Bathroom scale · flat", [-200, -80, 400, 100], ["scale", "bathroom scale", "weight", "kilos", "diet", "weigh yourself", "body weight"], () => {
  const k = 1.3; return L.shadow(0, 0, 340) + P(rr(-130 * k, -24 * k, 260 * k, 24 * k, 12), "gray", "m", { tone: 1 }) + P(rr(-56 * k, -20 * k, 112 * k, 14 * k, 6), "navy", "h", { tone: 2, flat: true });
});
reg(PROP, "ep-rocket", "Space", "Rocket · white, red nose and fins", [-100, -450, 200, 480], ["rocket", "space", "launch", "spaceship", "missile", "nasa-like", "blast off"], () => {
  const w = 84, h = 330;
  return L.shadow(0, 0, 170) + P(`M${-w / 2} -70 L${-w / 2 - 44} 0 L${-w / 2} -20 Z M${w / 2} -70 L${w / 2 + 44} 0 L${w / 2} -20 Z`, "red") + P(rr(-w / 2, -h, w, h - 10, 20), "white") + P(`M${-w / 2} ${-h + 62} Q0 ${-h - 110} ${w / 2} ${-h + 62} Z`, "red") + P(circ(0, -h + 120, 17), "glass", "d") + K(`M${-w / 2} -120 H${w / 2}`, "d");
});

// ======================================================================================================================
// ANT-LEVEL (episode 44): the friendly ant, crumb, rice grain, thermometer
// ======================================================================================================================
const ant = (o) => {
  const body = o.body || "ink", out = [L.shadow(-14, 0, 260)], face = o.face || "smile";
  const legs = (pairs, c) => pairs.map(([hx, kx, fx]) => K(`M${hx} -54 L${hx + kx} -30 L${hx + fx} -2`, "n", c, { s: 1.15 })).join("");
  const trip = [[-26, -26, -34], [-2, 4, -4], [20, 24, 34]];
  out.push(legs(trip.map(([a, b, c]) => [a + 12, b, c]), tc("gray", 2)), legs(trip, "ink"));
  out.push(P(circ(-88, -62, 56, 42), body), FT(circ(-106, -80, 20, 9), "white", 0, 0.32), P(circ(-38, -62, 11), body, "d"), P(circ(-12, -68, 34, 27), body));
  [[[44, -114], [38, -150], [60, -176]], [[62, -116], [78, -146], [106, -158]]].forEach((p) => out.push(K(smooth(p), "m"), P(circ(p[2][0], p[2][1], 6), "ink", "h", { flat: true })));
  out.push(P(circ(52, -84, 38), body));
  [-1, 1].forEach((sd) => out.push(P(`M26 -116 Q${26 + sd * 28} -142 ${26 + sd * 30} -114 Q${26 + sd * 14} -108 26 -116 Z`, "pink", "d")));
  out.push(P(circ(26, -115, 6), "pink", "d", { tone: 2 }));
  const lk = (o.look || 0) * 3;
  [[40, -90], [66, -90]].forEach(([ex, ey]) => out.push(CP(circ(ex, ey, 13), tc("white", 0), tc("white", 2)), P(circ(ex + lk, ey + 1, 7), "ink", "h", { flat: true }), FT(circ(ex + lk + 2.5, ey - 2.5, 2.4), "white", 0)));
  [[30, -70], [78, -70]].forEach(([ex, ey]) => out.push(FT(circ(ex, ey, 7, 5), "pink", 0, 0.85)));
  const mouth = (d) => K(d, "d", tc("pink", 1)), brow = (a, b) => K(line(a, b), "d", tc("gray", 1));
  const FACES = {
    smile: () => mouth("M44 -66 Q54 -54 66 -67"), cheeky: () => mouth("M42 -64 Q58 -52 70 -70") + brow([58, -110], [76, -116]),
    wow: () => CP(circ(54, -62, 6, 8), tc("red", 0), tc("pink", 1)) + brow([30, -112], [48, -110]) + brow([60, -110], [78, -112]),
    flat: () => mouth("M46 -64 L64 -64") + brow([30, -108], [48, -106]), worried: () => mouth("M44 -60 Q54 -68 66 -60") + brow([30, -104], [48, -112]) + brow([60, -112], [78, -104]),
  };
  out.push((FACES[face] || FACES.smile)());
  return L.g(out.join(""), o.dir === -1 ? "scale(-1 1)" : undefined);
};
const BOX_ANT = [-190, -215, 330, 235];
reg(KIT, "kit-ant", "Ant", "Ant · friendly, pink bow, smile", BOX_ANT, ["ant", "insect", "bug", "tiny", "ant-man", "small creature", "character", "bow"], ant, { face: "smile" });
[["wow", "wow"], ["worried", "worried"], ["cheeky", "cheeky"], ["flat", "flat"]].forEach(([f, n]) => reg(KIT, "kit-ant-" + n, "Ant", "Ant · " + f, BOX_ANT, ["ant", "insect", "bug", "tiny", f, "face"], ant, { face: f }));
reg(PROP, "ep-crumb", "Ant", "Crumb · big, seen from ant level", [-170, -190, 340, 210], ["crumb", "bread", "food", "biscuit", "cookie", "breakfast", "scrap"], () => {
  const pts = [[-112, -14], [-104, -88], [-44, -142], [28, -150], [96, -112], [120, -40], [92, 0], [8, 8], [-70, 4]], d = smooth([...pts, pts[0], pts[1]]) + " Z", inn = pts.map(([x, y]) => [x * 0.8, -70 + (y + 70) * 0.8]);
  return L.shadow(0, 4, 260) + P(d, "earth") + CP(smooth([...inn, inn[0], inn[1]]) + " Z", tc("sand", 1), tc("earth", 2), "d") + [[-40, -88, 9, 6], [20, -110, 7, 5], [50, -60, 10, 6], [-70, -50, 7, 5], [-6, -48, 8, 5], [70, -92, 6, 4]].map(([a, b, rx, ry]) => FT(circ(a, b, rx, ry), "earth", 0, 0.7)).join("");
});
reg(PROP, "ep-rice-grain", "Ant", "Rice grain · single", [-120, -50, 240, 100], ["rice", "grain", "seed", "food", "tiny", "oat", "cereal"], (o) => rot(P(circ(0, 0, 95, 28), "paper") + K("M-70 -4 Q0 -14 70 -4", "h", tc("gray", 1)), o.rot ?? -8, 0, 0), { rot: -8 });
reg(PROP, "ep-thermometer", "Gauges", "Thermometer · red column", [-60, -190, 120, 400], ["thermometer", "temperature", "heat", "fever", "hot", "cold", "degrees"], (o) => {
  const h = 300, lv = o.level ?? 0.6;
  return P(rr(-15, -h / 2, 30, h, 15), "white") + P(circ(0, h / 2 + 8, 26), o.c || "red") + FT(rect(-8, h / 2 - lv * (h - 10), 16, lv * (h - 10) + 10), o.c || "red", 0);
}, { level: 0.6 });

// ======================================================================================================================
// SPACE (episodes 41, 43): black hole, galaxy, dish, ship, satellite, telescope, lander, habitat
// ======================================================================================================================
const radial = (stops) => { const id = nid(); return [id, `<defs><radialGradient id="${id}">${stops.map(([o, c, op]) => `<stop offset="${f1(o * 1000) / 1000}" stop-color="${c}" stop-opacity="${op}"/>`).join("")}</radialGradient></defs>`]; };
const blackHole = (o) => {
  const R = o.R || 120, ink = tc("ink", 2), hot = tc("white", 0), yel = tc("yellow", 1), org = tc("orange", 0), red = tc("red", 2), out = [glow(0, 0, R * 3.6, "orange", 0.34)];
  const rx = R * 3.3, ry = rx * 0.2, tilt = -8, hole = R / rx;
  const [gid1, gdef1] = radial([[0, ink, 0], [hole * 0.92, ink, 0], [hole, hot, 0.95], [hole + (1 - hole) * 0.18, yel, 0.9], [hole + (1 - hole) * 0.5, org, 0.7], [hole + (1 - hole) * 0.8, red, 0.3], [1, red, 0]]);
  const disc = L.tag("path", { d: circ(0, 0, rx, ry), fill: `url(#${gid1})` });
  out.push(gdef1, rot(clipOf(rect(-rx * 1.1, -ry * 1.2, rx * 2.2, ry * 1.2), disc), tilt, 0, 0));
  const [gid2, gdef2] = radial([[0, ink, 0], [(1 / 1.95) * 0.99, ink, 0], [(1 / 1.95) * 1.04, yel, 0.95], [0.62, org, 0.62], [0.8, red, 0.2], [1, red, 0]]);
  out.push(gdef2, L.tag("circle", { cx: 0, cy: 0, r: R * 1.95, fill: `url(#${gid2})` }), L.tag("circle", { cx: 0, cy: 0, r: R, fill: ink }));
  out.push(rot(clipOf(rect(-rx * 1.1, 0, rx * 2.2, ry * 1.2), disc), tilt, 0, 0), L.tag("circle", { cx: 0, cy: 0, r: R * 1.012, fill: "none", stroke: hot, "stroke-width": L.lw("detail"), opacity: 0.85 }));
  return out.join("");
};
const spaceBg = (o, w, h) => (o.bg ? FT(rect(-w / 2, -h / 2, w, h), "navy", 2) + (() => { const r = L.rng(11); return Array.from({ length: 40 }, () => FT(circ((r() - 0.5) * w, (r() - 0.5) * h, 1.2 + r() * 2.2), "white", 0, 0.6 + r() * 0.4)).join(""); })() : "");
reg(PROP, "ep-black-hole", "Space", "Black hole · glowing disc, lensing ring (bg option = space)", [-480, -330, 960, 660], ["black hole", "space", "accretion disk", "event horizon", "gravity", "singularity", "universe", "cosmos"], (o) => spaceBg(o, 960, 660) + blackHole(o), { R: 120, bg: true }, { wide: true });
reg(PROP, "ep-black-hole-small", "Space", "Black hole · small", [-220, -170, 440, 340], ["black hole", "space", "tiny", "icon", "gravity", "dark"], (o) => spaceBg(o, 440, 340) + blackHole(o), { R: 60, bg: true });
reg(PROP, "ep-galaxy", "Space", "Galaxy · two-arm spiral of dots", [-340, -220, 680, 440], ["galaxy", "spiral", "milky way", "stars", "space", "universe", "cosmos", "nebula"], (o) => {
  const R = 300, rnd = L.rng(7), A = [], B = [], C = [];
  for (let arm = 0; arm < 2; arm++) for (let i = 0; i < 200; i++) {
    const u = i / 200, a = arm * Math.PI + u * 5.4 + (rnd() - 0.5) * 0.35, r = R * (0.12 + 0.88 * u) * (1 + (rnd() - 0.5) * 0.18), c = [f1(Math.cos(a) * r), f1(Math.sin(a) * r * 0.46), f1(2.5 + rnd() * 3.5 * (1 - u * 0.4))];
    (rnd() < 0.6 ? A : rnd() < 0.7 ? B : C).push(`<circle cx="${c[0]}" cy="${c[1]}" r="${c[2]}"/>`);
  }
  const grp = (arr, name, op) => `<g fill="${L.c(name, 1)}" opacity="${op}">${arr.join("")}</g>`;
  return spaceBg(o, 680, 440) + rot(glow(0, 0, R * 1.3, "purple", 0.45) + glow(0, 0, R * 0.6, "gold", 0.6) + grp(A, "sky", 0.9) + grp(B, "pink", 0.85) + grp(C, "white", 0.95), -18, 0, 0);
}, { bg: true }, { wide: true });
reg(PROP, "ep-radio-dish", "Space", "Radio dish · on a stand", [-130, -280, 260, 300], ["dish", "radio telescope", "antenna", "satellite dish", "signal", "space", "receiver"], (o) => {
  const k = 2.6;
  return rot(K(numScale("M0 0 L0 -34 M-18 0 L18 0", k), "m", tc("gray", 0)) + P(numScale("M-34 -52 Q0 -8 34 -52 Q0 -30 -34 -52 Z", k), "white", "d", { c: tc("gray", 0) }) + K(numScale("M0 -40 L0 -78", k), "d", tc("gray", 0)) + FT(circ(0, -80 * k, 5 * k), "red", 1), o.ang ?? 0, 0, 0);
}, { ang: 0 });
reg(PROP, "ep-spaceship", "Space", "Spaceship · white, red fins, round portholes", [-340, -170, 640, 340], ["spaceship", "ship", "rocket ship", "space", "craft", "starship", "flying"], (o) => {
  const c = tc("gray", 0), [lg, ldef] = (() => { const id = nid(); return [id, `<defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${L.c("orange")}" stop-opacity="0"/><stop offset="1" stop-color="${L.c("yellow", 1)}" stop-opacity="0.85"/></linearGradient></defs>`]; })();
  const out = [ldef, L.tag("path", { d: "M-190 -30 L-300 0 L-190 30 Z", fill: `url(#${lg})` })];
  out.push(P("M-120 -56 L-190 -130 L-70 -56 Z", "red", "d", { c }), P("M-120 56 L-190 130 L-70 56 Z", "red", "d", { c }), P(rr(-190, -58, 380, 116, 58), "white", "m", { tone: 2, c }), P("M60 -58 Q190 -70 230 0 Q190 70 60 58 Z", "gray", "m", { tone: 1, c }), P(circ(120, -8, 30, 26), "sky", "d", { c }));
  [-110, -50, 10].forEach((dx) => out.push(P(circ(dx, 0, 20), "yellow", "d", { tone: 1, c })));
  out.push(K("M-190 34 H60", "m", "blue"));
  return out.join("");
}, {}, { wide: true });
reg(PROP, "ep-satellite", "Space", "Satellite · gold body, blue panels", [-250, -130, 500, 200], ["satellite", "space", "orbit", "solar panels", "communication", "probe", "gps"], () => {
  const k = 1.7, out = [P(rect(-28 * k, -28 * k, 56 * k, 56 * k), "gold", "m", { c: tc("gold", 2) })];
  [-1, 1].forEach((sd) => out.push(P(rect(sd * 40 * k - (sd > 0 ? 0 : 90 * k), -20 * k, 90 * k, 40 * k), "blue", "d", { c: tc("white", 0) })));
  out.push(K(line([0, -28 * k], [0, -52 * k]), "d"), FT(circ(0, -56 * k, 6 * k), "red", 1));
  return out.join("");
});
reg(PROP, "ep-telescope", "Space", "Telescope · tube on a tripod", [-130, -260, 420, 470], ["telescope", "stargazing", "astronomy", "observatory", "tripod", "space", "look at stars"], (o) => {
  const c = tc("gray", 0);
  return K("M0 0 L-70 200 M0 0 L70 200 M0 0 L10 210", "n", c) + rot(P(rr(-30, -36, 220, 72, 12), "white", "m", { tone: 2, c }) + P(rect(190, -46, 36, 92), "gray", "m", { tone: 1, c }) + P(rect(-56, -22, 26, 44), "gray", "d", { tone: 2, c }), o.ang ?? -30, 0, 0);
}, { ang: -30 });
reg(PROP, "ep-moon-lander", "Space", "Moon lander · gold, four legs", [-290, -350, 580, 380], ["lander", "moon lander", "lunar module", "space", "apollo-like", "landing", "capsule"], () => {
  const out = [L.shadow(0, 0, 520)];
  [-1, 1].forEach((sd) => out.push(K(`M${sd * 60} -150 L${sd * 210} -8`, "n", tc("gray", 2)), P(circ(sd * 214, -6, 34, 10), "gray", "d", { tone: 2 })));
  out.push(P("M-120 -150 L-90 -220 H90 L120 -150 L90 -100 H-90 Z", "gold", "n"), P("M-80 -220 L-60 -300 H60 L80 -220 Z", "gray", "n", { tone: 1 }), P(circ(0, -262, 22), "glass", "d"), K("M-40 -100 L-70 -8 M-18 -100 L-46 -8", "m", tc("gray", 2)));
  return out.join("");
});
reg(PROP, "ep-moon-habitat", "Space", "Moon-base habitat · white dome", [-150, -200, 300, 220], ["habitat", "moon base", "dome", "colony", "space station", "outpost", "mars base"], () =>
  P("M-120 0 V-70 Q-120 -170 0 -170 Q120 -170 120 -70 V0 Z", "white", "n") + P(rr(-26, -70, 52, 70, 6), "gray", "d") + FT(circ(60, -100, 18), "sky", 0));

reg(PROP, "ep-campfire", "Home", "Campfire · crossed logs, static flame", [-170, -230, 340, 260], ["campfire", "fire", "flame", "logs", "camping", "warm", "bonfire"], () => {
  const k = 1.3, c = (d) => numScale(d, k);
  return L.shadow(0, 0, 300) + [-1, 1].map((sd) => K(line([sd * 90 * k, -6 * k], [-sd * 70 * k, -40 * k]), "n", tc("wood", 2), { s: 2.5 })).join("")
    + P(c("M0 -160 Q70 -80 40 -30 Q0 -10 -40 -30 Q-70 -80 0 -160 Z"), "orange") + P(c("M0 -100 Q30 -60 16 -30 Q0 -20 -16 -30 Q-30 -60 0 -100 Z"), "yellow", "d");
});
reg(PROP, "ep-kettle", "Home", "Kettle · grey, spout and handle", [-200, -240, 400, 270], ["kettle", "boiling", "tea", "hot water", "kitchen", "steam", "heat"], () =>
  L.shadow(0, 0, 220) + P("M-70 0 V-90 Q-70 -150 0 -150 Q70 -150 70 -90 V0 Z", "gray", "n", { tone: 1 }) + P("M66 -100 L130 -140 L136 -124 L70 -70 Z", "gray", "m", { tone: 1 })
  + K("M-70 -100 Q-130 -100 -128 -50 Q-124 -20 -70 -30", "n") + P(rr(-20, -168, 40, 22, 6), "ink", "d", { tone: 1 }));
reg(PROP, "ep-plant-sprout", "Home", "Sprout · in an orange pot", [-120, -230, 240, 250], ["plant", "sprout", "pot", "seedling", "growth", "green", "garden", "grow"], () => {
  const out = [L.shadow(0, 0, 160), K("M0 -90 Q6 -130 0 -160", "m", tc("green", 2))];
  [[-1, -60], [1, -76]].forEach(([sd, dy]) => out.push(P(`M0 ${-90 + dy + 50} Q${sd * 44} ${-90 + dy + 16} ${sd * 62} ${-90 + dy + 42} Q${sd * 34} ${-90 + dy + 68} 0 ${-90 + dy + 50} Z`, "green", "d", { tone: 1 })));
  out.push(P("M-60 -80 H60 L46 0 H-46 Z", "orange"), P(rect(-68, -96, 136, 22), "orange", "m", { tone: 2 }), FT("M-56 -96 H56 V-84 H-56 Z", "brown", 0));
  return out.join("");
});
reg(PROP, "ep-dna", "Science", "DNA · double helix", [-150, -220, 300, 440], ["dna", "helix", "genetics", "gene", "biology", "science", "double helix"], () => {
  const n = 14, h = 400, pts = (ph) => Array.from({ length: n + 1 }, (_, i) => [Math.sin(i * 0.9 + ph) * 90, -h / 2 + (i / n) * h]), a = pts(0), b = pts(Math.PI);
  return a.map((p, i) => K(line(p, b[i]), "d", tc("gray", 1))).join("") + K(smooth(a), "n", "blue", { s: 1.2 }) + K(smooth(b), "n", "red", { s: 1.2 });
});
const eggPath = (k) => numScale("M0 -30 C25 -30 27 22 0 26 C-27 22 -25 -30 0 -30 Z", k);
reg(PROP, "ep-egg", "Home", "Egg · single", [-60, -70, 120, 120], ["egg", "protein", "breakfast", "food", "chicken", "white egg"], (o) => P(eggPath(1.8), o.c || "paper"), { c: "paper" });
reg(PROP, "ep-egg-carton", "Home", "Egg carton · twelve eggs (n option)", [-190, -110, 380, 140], ["eggs", "egg carton", "dozen", "protein", "breakfast", "food", "twelve"], (o) => {
  const n = o.n ?? 12, out = [FL(rr(-150 + 6, -76 + 8, 300, 84, 6), "ink", 0.14), P(rr(-154, -78, 308, 60, 6), "earth", "d", { tone: 2, flat: true })];
  for (let i = 0; i < 12 && i < n; i++) out.push(L.g(P(eggPath(0.95), o.c || "paper", "d"), `translate(${-125 + (i % 6) * 50} ${-62 + (i < 6 ? 0 : 28)})`));
  out.push(P(rr(-154, -26, 308, 32, 6), "earth", "d", { flat: true }));
  return out.join("");
}, { n: 12 });
reg(PROP, "ep-egg-carton-half", "Home", "Egg carton · five left", [-190, -110, 380, 140], ["eggs", "egg carton", "half", "few left", "protein", "food"], (o) => L.inline("ep-egg-carton", { n: 5 }));
reg(PROP, "ep-chicken-plate", "Home", "Roast chicken · on a plate", [-190, -130, 380, 180], ["chicken", "meat", "plate", "dinner", "protein", "roast", "food"], () =>
  P(circ(0, 0, 150, 42), "white", "m", { tone: 2, flat: true }) + P(circ(0, -3, 105, 28), "white", "h", { flat: true }) + P("M-100 -6 C-112 -66 -30 -92 44 -72 C112 -52 118 -2 56 8 C0 18 -76 16 -100 -6 Z", "earth")
  + [[-46, -58, -14, -14], [-6, -66, 26, -22], [34, -58, 62, -18]].map(([a, b, c, d]) => K(line([a, b], [c, d]), "d", tc("brown", 1))).join(""));
reg(PROP, "ep-dumbbell", "Home", "Dumbbell · black plates", [-210, -80, 420, 160], ["dumbbell", "gym", "weights", "fitness", "exercise", "muscle", "lift"], (o) => {
  const Lh = (o.len ?? 260) / 2, out = [P(rr(-Lh, -9, 2 * Lh, 18, 6), "gray", "m", { tone: 1 })];
  [-1, 1].forEach((sd) => out.push(P(rr(sd * (Lh - 8) - 15, -54, 30, 108, 6), "ink", "m", { tone: 1, flat: true }), P(rr(sd * (Lh + 26) - 11, -38, 22, 76, 6), "ink", "m", { tone: 1, flat: true })));
  return out.join("");
}, { len: 260 });
})();
