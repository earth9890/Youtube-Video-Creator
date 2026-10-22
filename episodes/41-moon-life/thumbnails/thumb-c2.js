// look: still
// C2 (consequence at its extreme): week two, the Sun has set for two weeks. Dave is frozen solid in a huge block of ice on the earthlit grey Moon,
// only his eyes still moving (side-glance up at Earth). His striped jumper (not enough) shows through the ice. Huge full Earth above; suitcase frozen beside him.
// Text: -130°C (the night temperature the video gives).
// @include helpers.js
const S = scene(0, 1, { cam: "none" });
S.fill(rect(-200, -200, 2320, 1480), 0, 0, DS.vgrad("#0b1a52", "#16307e"), 1);
stars(S, 60, -50, -50, 1960, 640, { big: 3 });
earth(S, 1700, 250, 235, { night: false });
S.fill(`M-200 760 Q500 700 1000 735 T2120 720 V1280 H-200 Z`, 0, 0, DS.vgrad("#7f8fae", "#46557a"), 1);
[[1500, 960, 260], [300, 1010, 200]].forEach(([x, y, w]) => S.fill(circ(x, y, w, w * 0.12), 0, 0, "#2d3a5c", 0.45));
// an ice block: iceBack = the solid icy core behind its contents; iceBlock = translucent front, streaks, top and side faces, outline, icicles
const iceBack = (x, y, w, h) => S.fill(rrect(x, y, w, h, 16), 0, 0, DS.vgrad("#c9f4ff", "#7fd0f2"), 1);
const iceBlock = (x, y, w, h, d, o = {}) => { const g = S.grp(), fr = rrect(x, y, w, h, 16);
  S.fill(`M${x + w} ${y} L${x + w + d} ${y - d} V${y + h - d} L${x + w} ${y + h} Z`, 0, 0, "#4fb0e8", 1, g);
  S.fill(fr, 0, 0, "#c4f3ff", o.op ?? 0.38, g);
  const inner = clipTo(S.grp(g), fr);
  S.fill(circ(x + w * 0.1, y + h * 0.95, w * 0.3, h * 0.16), 0, 0, "#ffffff", 0.6, inner);
  [[0.05, 0.6, 0.28, 0.08], [0.1, 0.74, 0.36, 0.16], [0.82, 0.82, 0.96, 0.46]].forEach(([a, b, c, e]) => S.draw(line([x + w * a, y + h * b], [x + w * c, y + h * e], 0), 0, 0, { c: "#ffffff", w: w * 0.02, op: 0.75, parent: inner }));
  S.fill(`M${x} ${y} L${x + d} ${y - d} H${x + w + d} L${x + w} ${y} Z`, 0, 0, "#f2fdff", 1, g);
  S.draw(`M${x} ${y} L${x + d} ${y - d} H${x + w + d} V${y + h - d} L${x + w} ${y + h} H${x} Z M${x} ${y} H${x + w} L${x + w + d} ${y - d} M${x + w} ${y} V${y + h}`, 0, 0, { c: DS.P.ink[0], w: o.lw ?? 12, parent: g });
  (o.icicles || []).forEach(([f, ih]) => S.draw(`M${x + w * f - ih * 0.22} ${y} L${x + w * f} ${y + ih} L${x + w * f + ih * 0.22} ${y} Z`, 0, 0, { c: DS.P.ink[0], w: 8, fill: "#f2fdff", parent: g }));
  return g; };
const BX = 250, BY = 300, BW = 1060, BH = 900, D = 70;
iceBack(BX, BY, BW, BH);
const F = dave(S, 760, 2010, "near", { s: 4.7, mood: "worried", look: 0, breathe: false });
helmet(S, F); jumper(S, F);
// frozen face, only the eyes move: wide eyes, pupils hard up-right at Earth
{ const R = F.r, [hx, hy] = F.hd; [-1, 1].forEach((sd) => { const ex = hx + sd * 0.33 * R, ey = hy - 0.12 * R;
  S.draw(circ(ex, ey, 0.23 * R), 0, 0, { c: DS.P.ink[0], w: 10, fill: "#ffffff" });
  S.fill(circ(ex + 0.1 * R, ey - 0.08 * R, 0.1 * R), 0, 0, DS.P.ink[0], 1); }); }
iceBlock(BX, BY, BW, BH, D, { icicles: [[0.12, 80], [0.23, 120], [0.55, 90], [0.76, 130], [0.9, 80]] });
// the suitcase, frozen in its own small block
iceBack(1370, 740, 380, 280);
suitcase(S, 1560, 980, 1.05);
iceBlock(1370, 740, 380, 280, 40, { lw: 10 });
DS.vignette(S, 0.2);
S.text("-130°C", 800, 310, { size: 360, c: "#FEFE06", halo: "#111111", haloW: 0.09 });
