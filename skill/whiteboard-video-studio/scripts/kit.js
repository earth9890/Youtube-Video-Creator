// ===================== kit.js — design system for `// look: still` =====================
// Every colour, width, radius, size and gap in a still scene comes from DS (rules + reasons: references/style-guide.md).
// scene_lint.py fails raw hex colours / widths / radii in scenes.js, so scenes stay on-system.

const DS = {
  // palette: [base, light (lit side), dark (shade side)]. Light comes from the top-left.
  P: {
    ink: ["#1d1b1f", "#3a363d", "#000000"], paper: ["#fbf7ef", "#ffffff", "#ece4d4"], white: ["#ffffff", "#ffffff", "#e9e4dc"],
    sky: ["#a9dcf5", "#d6f0fc", "#7cc3ea"], night: ["#2f4a86", "#48649f", "#1c2f5c"], dusk: ["#f6c9a8", "#fbe3cf", "#e3a27c"],
    grass: ["#7cc576", "#a3db8e", "#4f9a48"], earth: ["#d9a86c", "#ecc896", "#b07a43"], sand: ["#ecd49e", "#f6e7c4", "#cfb173"],
    wall: ["#f3e2c4", "#fbf0dc", "#e0c79f"], floor: ["#c8976a", "#dbb58e", "#9c6f48"], wood: ["#b08968", "#cfa888", "#7f5f45"],
    blue: ["#2f6fd6", "#6d9ee8", "#1f4fa3"], navy: ["#1f2a44", "#3a4a6e", "#121a2e"], purple: ["#8e5bb5", "#b48ad6", "#67408a"],
    green: ["#3f9e4a", "#6fc078", "#2c7536"], red: ["#e5383b", "#f2787a", "#b02225"], orange: ["#ff8c1a", "#ffb466", "#d06a00"],
    yellow: ["#ffcf33", "#ffe38a", "#e0a800"], pink: ["#f28ca0", "#f7b6c3", "#d0607a"], gray: ["#9aa0a6", "#c4c8cc", "#6f757b"],
    brown: ["#5a3825", "#7a5236", "#3d2418"], gold: ["#f2b84b", "#f8d58f", "#c98e1c"], glass: ["#dff3ff", "#ffffff", "#b9def5"],
  },
  w: { hair: 2, detail: 3, far: 3, mid: 5, near: 7 },          // stroke px. far < mid < near = depth
  r: { xs: 6, sm: 12, md: 20, lg: 32 },                         // corner radii
  type: { caption: 40, small: 52, body: 64, title: 84, display: 110 }, // text px
  sp: (n) => 8 * n,                                              // spacing grid: 8 px
  safe: { x0: 96, x1: 1824, y0: 64, y1: 940 },                   // keep content inside; captions live below 980
  // depth planes: scale for figures/props, haze = how far the colour moves toward the sky (atmospheric perspective)
  depth: { far: { s: 0.55, haze: 0.45, w: "far" }, mid: { s: 0.8, haze: 0.18, w: "mid" }, near: { s: 1, haze: 0, w: "near" } },
  hazeTo: "#e4f3fb",                                             // scene sky-light; set per scene with DS.setHaze()
};

DS.mix = (a, b, k) => { const h = (c) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16)); const A = h(a), B = h(b); return "#" + A.map((v, i) => Math.round(v + (B[i] - v) * k).toString(16).padStart(2, "0")).join(""); };
DS.lum = (c) => { const v = [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16) / 255).map((x) => (x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4)); return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2]; };
DS.contrast = (a, b) => { const [x, y] = [DS.lum(a), DS.lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
DS.setHaze = (name) => (DS.hazeTo = DS.P[name] ? DS.P[name][1] : name);
// colour by name, tone (0 base, 1 light, 2 dark) and depth layer
DS.c = (name, tone = 0, layer = "near") => DS.mix(DS.P[name][tone], DS.hazeTo, DS.depth[layer].haze);
DS.line = (layer = "near") => DS.mix(DS.P.ink[0], DS.hazeTo, DS.depth[layer].haze * 1.3); // far outlines fade too

let DSN = 0;
const dsDefs = () => document.querySelector("#stage defs");
// diagonal light→dark gradient = volume (key light top-left). Returns "url(#id)".
DS.vol = (name, layer = "near", dir = "diag") => {
  const id = `ds-${name}-${layer}-${dir}`;
  if (!document.getElementById(id)) {
    const [x2, y2] = dir === "v" ? [0, 1] : dir === "h" ? [1, 0] : [1, 1];
    const g = el("linearGradient", { id, x1: 0, y1: 0, x2, y2 }, dsDefs());
    [[0, 1], [0.55, 0], [1, 2]].forEach(([o, tone]) => el("stop", { offset: o, "stop-color": DS.c(name, tone, layer) }, g));
  }
  return `url(#${id})`;
};
DS.vgrad = (top, bottom) => { const id = "ds-vg" + ++DSN, g = el("linearGradient", { id, x1: 0, y1: 0, x2: 0, y2: 1 }, dsDefs()); el("stop", { offset: 0, "stop-color": top }, g); el("stop", { offset: 1, "stop-color": bottom }, g); return `url(#${id})`; };
DS.glow = (color, op = 0.55) => { const id = "ds-rg" + ++DSN, g = el("radialGradient", { id }, dsDefs()); el("stop", { offset: 0, "stop-color": color, "stop-opacity": op }, g); el("stop", { offset: 1, "stop-color": color, "stop-opacity": 0 }, g); return `url(#${id})`; };

// a solid object: volume fill + outline weighted by depth. o: { layer, t, dir, tone, flat:true (no gradient), parent }
DS.shape = (S, d, name, o = {}) => {
  const layer = o.layer || "near";
  return S.draw(d, o.t ?? S.start, 0, { fill: o.flat ? DS.c(name, o.tone || 0, layer) : DS.vol(name, layer, o.dir), c: o.c || DS.line(layer), w: DS.w[o.w || DS.depth[layer].w], parent: o.parent, op: o.op });
};
// contact shadow under anything that stands on the ground (grounds it; without it things float)
DS.shadow = (S, cx, gy, w, o = {}) => S.fill(circ(cx, gy + 2, w / 2, w * 0.07), o.t ?? S.start, 0.3, DS.P.ink[0], o.op ?? 0.22, o.parent);
// soft drop shadow for cards / foreground objects: offset copy, low opacity
DS.drop = (S, d, o = {}) => S.fill(d, o.t ?? S.start, 0.3, DS.P.ink[0], 0.14, o.parent);

// label card: rounded, padded, shadowed; text always ink-on-paper (contrast ≥ 12:1) unless tc given.
DS.card = (S, str, cx, cy, o = {}) => {
  const size = o.size || DS.type.small, t = o.t ?? S.start, pad = [DS.sp(3), DS.sp(1.5)], w = str.length * size * 0.62 + pad[0] * 2, h = size * 1.15 + pad[1] * 2, g = S.grp(o.parent);
  const x = cx - w / 2, y = cy - h / 2, r = DS.r[o.r || "md"];
  S.fill(rrect(x + 4, y + 8, w, h, r), t, 0.3, DS.P.ink[0], 0.14, g);
  S.draw(rrect(x, y, w, h, r), t, 0, { fill: o.fill ? DS.c(o.fill, 1) : DS.P.white[0], c: DS.P.ink[0], w: DS.w.detail, parent: g });
  S.text(str, cx, cy + size * 0.36, { size, t, c: o.tc ? DS.c(o.tc, 2) : DS.P.ink[0], parent: g });
  if (t > S.start + 0.05) tl.fromTo(g, { opacity: 0 }, { opacity: 1, duration: 0.35 }, t);
  return { g, w, h };
};

// ---------- scenery with depth ----------
// outdoor: gradient sky, sun glow, 3 hill planes hazed by distance, ground gradient, optional path to the horizon
DS.outdoor = (S, o = {}) => {
  const hy = o.hy || 640, sky = o.sky || "sky", g = S.grp(); S.g.insertBefore(g, S.g.firstChild);
  DS.setHaze(sky);
  const sh = (d, fill, op) => { const p = el("path", { d, fill }, g); if (op !== undefined) p.setAttribute("opacity", op); return p; };
  const box = (x0, y0, x1, y1) => `M${x0} ${y0} H${x1} V${y1} H${x0} Z`;
  sh(box(-200, -200, 2120, 1280), DS.vgrad(DS.P[sky][2], DS.P[sky][1]));
  if (o.sun !== false) { const [sx, sy] = o.sun || [1560, 200]; sh(circ(sx, sy, 300), DS.glow("#fff6d6", 0.8)); sh(circ(sx, sy, 70), "#fff6d6"); }
  const ridge = (y, amp, ph) => smooth(Array.from({ length: 9 }, (_, i) => [-200 + i * 290, y - amp * (0.5 + 0.5 * Math.sin(i * 1.3 + ph))])) + " L2120 1280 L-200 1280 Z";
  [["far", hy - 70, 70, 0.7], ["mid", hy - 25, 45, 2.2]].forEach(([L, y, a, ph]) => sh(ridge(y, a, ph), DS.c(o.hills || "grass", L === "far" ? 1 : 0, L)));
  sh(ridge(hy + 20, 14, 4.1), DS.vgrad(DS.c(o.ground || "grass", 0, "mid"), DS.c(o.ground || "grass", 2)));
  if (o.path) sh(`M${o.path[0]} 1280 L${960 - 18} ${hy + 22} L${960 + 18} ${hy + 22} L${o.path[1]} 1280 Z`, DS.vgrad(DS.c("sand", 0, "mid"), DS.c("sand", 1)));
  return { g, hy };
};
// room interior in one-point perspective: back wall, side walls, floor with converging boards, baseboard, window + light patch
DS.room = (S, o = {}) => {
  const g = S.grp(); S.g.insertBefore(g, S.g.firstChild);
  const [bx0, by0, bx1, by1] = o.back || [360, 90, 1560, 760];   // back wall rectangle; the vanishing point is its centre
  DS.setHaze("wall");
  const sh = (d, fill, op) => { const p = el("path", { d, fill }, g); if (op !== undefined) p.setAttribute("opacity", op); return p; };
  const P4 = (pts) => `M${pts.map((p) => p.join(" ")).join(" L")} Z`;
  sh(P4([[-200, -200], [bx0, by0], [bx0, by1], [-200, 1280]]), DS.vgrad(DS.c(o.wall || "wall", 2), DS.c(o.wall || "wall", 0)));       // left wall (shade side)
  sh(P4([[2120, -200], [bx1, by0], [bx1, by1], [2120, 1280]]), DS.vgrad(DS.c(o.wall || "wall", 0), DS.c(o.wall || "wall", 1)));       // right wall (lit)
  sh(P4([[-200, -200], [2120, -200], [bx1, by0], [bx0, by0]]), DS.c(o.wall || "wall", 1));                                       // ceiling
  sh(P4([[bx0, by0], [bx1, by0], [bx1, by1], [bx0, by1]]), DS.vgrad(DS.c(o.wall || "wall", 1), DS.c(o.wall || "wall", 0)));          // back wall
  sh(P4([[bx0, by1], [bx1, by1], [2120, 1280], [-200, 1280]]), DS.vgrad(DS.c(o.floor || "floor", 0, "mid"), DS.c(o.floor || "floor", 2)));
  const vx = (bx0 + bx1) / 2, n = 9;
  for (let i = 1; i < n; i++) { const fx = bx0 + ((bx1 - bx0) * i) / n, ex = -200 + (2320 * i) / n; el("path", { d: `M${fx} ${by1} L${ex} 1280`, stroke: DS.c(o.floor || "floor", 2), "stroke-width": DS.w.hair, opacity: 0.5 }, g); }
  sh(P4([[bx0, by1 - 22], [bx1, by1 - 22], [bx1, by1], [bx0, by1]]), DS.c("white", 2));                                              // baseboard
  if (o.window !== false) {
    const [wx, wy, ww, wh] = o.window || [bx1 - 380, by0 + 90, 260, 300];
    sh(rrect(wx - 14, wy - 14, ww + 28, wh + 28, DS.r.xs), DS.c("white", 0)); sh(rect(wx, wy, ww, wh), DS.vgrad(DS.P.sky[1], DS.P.sky[0]));
    el("path", { d: `M${wx + ww / 2} ${wy} V${wy + wh} M${wx} ${wy + wh / 2} H${wx + ww}`, stroke: DS.c("white", 0), "stroke-width": DS.w.near }, g);
    sh(P4([[wx, by1 + 30], [wx + ww, by1 + 30], [wx + ww * 1.5 - vx * 0.0, 1080], [wx - ww * 0.3, 1080]]), "#fff6d6", 0.22);          // light patch on the floor
  }
  return { g, hy: by1, vp: [vx, (by0 + by1) / 2] };
};
// a figure placed on a depth plane: scale, stroke and a contact shadow follow the layer
DS.figure = (S, x, gy, layer = "near", o = {}) => {
  const L = DS.depth[layer], s = (o.s || 1.1) * L.s;
  DS.shadow(S, x, gy, 150 * s, { t: o.t });
  const F = S.fig(x, gy, Object.assign({ hair: "short", outfit: "tee" }, o, { s, w: DS.w[L.w] * 1.3 * Math.sqrt(s) })).draw(o.t ?? S.start, 0.4); // characters 1.3x the plane width so they pop from the set
  F.face(o.t ?? S.start, o.mood || "flat", o.look || 0);
  return F;
};

// ---------- finishing: focus, detail, foreground depth ----------
// vignette: edges 12 % darker, pulls the eye to the centre (always last, on top of the scene)
DS.vignette = (S, k = 0.12) => { const id = "ds-vig" + ++DSN, g = el("radialGradient", { id, cx: 0.5, cy: 0.5, r: 0.75 }, dsDefs()); el("stop", { offset: 0.55, "stop-color": DS.P.ink[0], "stop-opacity": 0 }, g); el("stop", { offset: 1, "stop-color": DS.P.ink[0], "stop-opacity": k }, g); return el("path", { d: "M-200 -200 H2120 V1280 H-200 Z", fill: `url(#${id})`, "pointer-events": "none" }, S.g); };
// rug in perspective under a group of people (ties them to the floor)
DS.rug = (S, cx, cy, w, name = "red") => { DS.shape(S, circ(cx, cy, w / 2, w * 0.13), name, { layer: "mid", flat: true, w: "detail" }); S.draw(circ(cx, cy, w * 0.42, w * 0.1), S.start, 0, { c: DS.c(name, 1, "mid"), w: DS.w.detail }); };
// framed picture on a wall: detail that says "home"
DS.frame = (S, x, y, w, h, name = "sky", layer = "mid") => { DS.drop(S, rrect(x + 6, y + 8, w, h, DS.r.xs)); DS.shape(S, rrect(x, y, w, h, DS.r.xs), "wood", { layer, w: "detail" }); DS.shape(S, rect(x + 12, y + 12, w - 24, h - 24), name, { layer, w: "hair", dir: "v" }); };
// foreground plant: big, dark, cropped by the frame edge - the nearest plane, sells depth
DS.plant = (S, x, gy, k = 1, side = 1) => {
  const g = S.grp(), c = DS.c("green", 2), c2 = DS.c("green", 0);
  [[-60, -420, -0.5], [10, -470, 0.1], [70, -400, 0.6], [-20, -330, -0.2], [90, -300, 0.9]].forEach(([dx, dy, a], i) => {
    const tx = x + dx * k * side, ty = gy + dy * k;
    S.draw(smooth([[x, gy - 200 * k], [(x + tx) / 2 + 40 * a * k, (gy - 200 * k + ty) / 2], [tx, ty], [(x + tx) / 2 + 90 * a * k * side, (gy - 200 * k + ty) / 2 + 30 * k], [x, gy - 200 * k]]) + " Z", S.start, 0, { fill: i % 2 ? c : c2, c: DS.P.ink[0], w: DS.w.near, parent: g });
  });
  DS.shape(S, `M${x - 110 * k} ${gy - 220 * k} H${x + 110 * k} L${x + 85 * k} ${gy} H${x - 85 * k} Z`, "orange", { w: "near" });
  return g;
};

// shaded fill from any hex (characters): light 18 % toward white at top-left, 22 % toward ink at bottom-right
DS.volHex = (hex) => {
  const id = "ds-vh-" + hex.slice(1);
  if (!document.getElementById(id)) { const g = el("linearGradient", { id, x1: 0, y1: 0, x2: 1, y2: 1 }, dsDefs()); [[0, DS.mix(hex, "#ffffff", 0.18)], [0.5, hex], [1, DS.mix(hex, DS.P.ink[0], 0.22)]].forEach(([o, c]) => el("stop", { offset: o, "stop-color": c }, g)); }
  return `url(#${id})`;
};
