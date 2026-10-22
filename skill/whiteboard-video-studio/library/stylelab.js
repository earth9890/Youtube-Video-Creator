// ===================== library/stylelab.js — Look presets A…J + the style lab test scene =====================
// Owner picks a Look (or single settings) by name; L.look("D") then makes every library asset follow it.
(function () {
const L = window.L, f1 = L.f1;

L.LOOKS = {
  A: L.with({ name: "A", label: "Look A · current v3" }),
  B: L.with({ name: "B", label: "Look B · soft storybook", line: { char: 5, prop: 4, scene: 2, detail: 2 }, ink: "shade", palette: "storybook", radius: 1.6, head: { ratio: 1.05 }, font: "Fredoka" }),
  C: L.with({ name: "C", label: "Look C · bold cartoon", line: { char: 10, prop: 8, scene: 5, detail: 4 }, palette: "primary", shade: "cel", limb: { style: "tube" }, radius: 1.2, font: "Chewy" }),
  D: L.with({ name: "D", label: "Look D · clean flat", line: { char: 4, prop: 3, scene: 2, detail: 2 }, ink: "navy", shade: "flat", palette: "pastel", head: { ratio: 1.1 }, font: "Nunito" }),
  E: L.with({ name: "E", label: "Look E · no-outline flat", ink: "none", shade: "flat", palette: "primary", limb: { style: "tube" }, font: "Baloo" }),
  F: L.with({ name: "F", label: "Look F · muted documentary", line: { char: 4, prop: 3, scene: 2, detail: 2 }, palette: "documentary", radius: 0.6, head: { ratio: 0.9 }, font: "PatrickHand" }),
  G: L.with({ name: "G", label: "Look G · chibi pop", head: { ratio: 1.45 }, shade: "cel", palette: "pastel", limb: { style: "tube", k: 0.9 }, radius: 1.5, font: "Fredoka" }),
  H: L.with({ name: "H", label: "Look H · thick comic", line: { char: 13, prop: 10, scene: 6, detail: 5 }, shade: "flat", palette: "contrast", radius: 0.4, join: "miter", font: "ComicNeue" }),
  I: L.with({ name: "I", label: "Look I · rubber-hose retro", limb: { style: "hose" }, palette: "storybook", shade: "cel", head: { ratio: 1.15 }, font: "Chewy" }),
  J: L.with({ name: "J", label: "Look J · minimal line", line: { char: 4, prop: 3, scene: 2, detail: 2 }, shade: "flat", shadow: false, head: { ratio: 0.9 }, font: "Gaegu" }),
  K: L.with({ name: "K", label: "Look K · pure stick (Black Hole Life default, owner 2026-10-22)", stick: true, line: { char: 4, prop: 3, scene: 2, detail: 2, hair: 1.5 } }),
};

// ---------- the test scene: sky, sun/moon, hills, tree, house, Dave + a girl, a mug on a table, a label card ----------
// 1280 × 720 viewBox. time: day | night
L.testScene = (time = "day", o = {}) => {
  const night = time === "night", W = 1280, H = 720, hy = 470, out = [];
  out.push(L.tag("rect", { x: 0, y: 0, width: W, height: H, fill: night ? L.c("night", 2) : L.c("sky", 1) }));
  out.push(L.tag("rect", { x: 0, y: hy - 260, width: W, height: 260, fill: night ? L.c("night", 0) : L.c("sky", 0), opacity: 0.6 }));
  if (night) { const r = L.rng(7); for (let i = 0; i < 40; i++) out.push(L.flat(L.circ(r() * W, r() * (hy - 60), 1.5 + r() * 2.5), "white", 0.85)); out.push(L.shape(`${L.circ(1060, 120, 54)}`, "cream", { w: "scene" }), L.flat(L.circ(1084, 106, 50), "night", 1)); }
  else { out.push(L.shape(L.circ(1060, 120, 58), "yellow", { w: "scene" })); [[220, 110, 1], [700, 80, 0.8]].forEach(([x, y, k]) => out.push(L.shape(L.smooth([[x - 80 * k, y + 20 * k], [x - 60 * k, y - 15 * k], [x - 20 * k, y - 30 * k], [x + 25 * k, y - 28 * k], [x + 70 * k, y - 5 * k], [x + 85 * k, y + 20 * k], [x - 80 * k, y + 20 * k]]), "white", { w: "detail" }))); }
  const g = night ? "green" : "grass";
  out.push(L.shape(L.smooth([[-20, hy + 10], [180, hy - 70], [420, hy - 30], [640, hy - 95], [900, hy - 40], [1120, hy - 80], [1300, hy - 20], [1300, H + 20], [-20, H + 20], [-20, hy + 10]]), night ? "night" : "green", { w: "scene", tone: 1 }));
  out.push(L.shape(L.poly([[-20, hy], [1300, hy], [1300, H + 20], [-20, H + 20]], true), g, { w: "scene", dir: "v", tone: night ? 2 : 0 }));
  // house (radius token shows on door/window)
  out.push(L.shape(L.rect(820, 300, 220, 170), night ? "wall" : "wall", { w: "prop", tone: night ? 2 : 0 }), L.shape(L.poly([[800, 304], [930, 210], [1060, 304]], true), "red", { w: "prop" }));
  out.push(L.shape(L.rrect(905, 380, 52, 90, 14), "wood", { w: "detail" }), L.shape(L.rrect(845, 330, 50, 46, 10), night ? "yellow" : "glass", { w: "detail" }), L.shape(L.rrect(975, 330, 50, 46, 10), night ? "yellow" : "glass", { w: "detail" }));
  // tree
  out.push(L.shape(L.rrect(152, 330, 30, 150, 8), "wood", { w: "prop" }), L.shape(L.smooth([[90, 340], [80, 270], [120, 215], [170, 200], [225, 225], [250, 285], [235, 345], [165, 365], [90, 340]]), night ? "green" : "grass", { w: "prop", tone: night ? 2 : 0 }));
  // table + mug
  out.push(L.shape(L.rrect(560, 540, 170, 18, 6), "wood", { w: "prop" }), L.shape(L.rect(575, 556, 12, 80), "wood", { w: "detail" }), L.shape(L.rect(703, 556, 12, 80), "wood", { w: "detail" }));
  out.push(L.shape(L.rrect(622, 496, 46, 46, 8), "orange", { w: "prop" }), L.tag("path", { d: L.arc(674, 518, 13, -80, 80), fill: "none", stroke: L.outline("orange"), "stroke-width": L.lw("prop"), "stroke-linecap": L.T.cap }));
  out.push(L.shadow(645, 636, 190));
  // people
  out.push(L.g(L.person({ style: o.man || "man01", pose: "wave", face: night ? "sleepy" : "happy", s: 1.3 }), "translate(360 680)"));
  out.push(L.g(L.person({ style: o.girl || "girl01", pose: "point", face: "smile", s: 1.2, look: 0.6 }), "translate(530 690) scale(-1 1)"));
  // label card in the look's font
  out.push(L.shape(L.rrect(470, 40, 340, 96, 20), "white", { w: "detail" }), L.text(o.word || "WHAT IF?", 640, 108, { size: 60 }));
  return out.join("");
};

// ---------- the lab: groups of single-setting changes from Look A ----------
const A = L.DEFAULT, w = (k) => ({ char: k, prop: Math.round(k * 0.72), scene: Math.max(1, Math.round(k * 0.45)), detail: Math.max(1, Math.round(k * 0.42)), hair: Math.max(1, Math.round(k * 0.3)) });
L.LAB = [
  { group: "Outline width", items: [["Line 01 · hairline", { line: w(3) }], ["Line 02 · thin", { line: w(5) }], ["Line 03 · current", {}], ["Line 04 · medium", { line: w(9) }], ["Line 05 · bold", { line: w(12) }], ["Line 06 · heavy", { line: w(16) }]] },
  { group: "Outline colour", items: [["Ink 01 · black ink (current)", {}], ["Ink 02 · dark navy", { ink: "navy" }], ["Ink 03 · darker shade of fill", { ink: "shade" }], ["Ink 04 · no outlines", { ink: "none" }]] },
  { group: "Corners and line ends", items: [["Corner 01 · round (current)", {}], ["Corner 02 · sharp + square ends", { radius: 0, cap: "square", join: "miter" }], ["Corner 03 · extra round", { radius: 2.2 }], ["Corner 04 · sharp corners, round ends", { radius: 0 }]] },
  { group: "Arms and legs", items: [["Limb 01 · stick (current)", {}], ["Limb 02 · thin stick", { limb: { k: 0.65 } }], ["Limb 03 · tube", { limb: { style: "tube" } }], ["Limb 04 · tapered", { limb: { style: "taper" } }], ["Limb 05 · rubber hose", { limb: { style: "hose" } }]] },
  { group: "Head", items: [["Head 01 · current", {}], ["Head 02 · smaller", { head: { ratio: 0.8 } }], ["Head 03 · bigger", { head: { ratio: 1.3 } }], ["Head 04 · chibi", { head: { ratio: 1.65 } }], ["Head 05 · oval", { head: { shape: "oval" } }], ["Head 06 · bean", { head: { shape: "bean" } }], ["Head 07 · skin-coloured", { head: { fill: "skin" } }]] },
  { group: "Shading", items: [["Shade 01 · soft gradient (current)", {}], ["Shade 02 · flat", { shade: "flat" }], ["Shade 03 · cel (one hard shadow)", { shade: "cel" }], ["Shade 04 · flat, no ground shadow", { shade: "flat", shadow: false }]] },
  { group: "Colour palette", items: Object.keys(L.PALETTES).map((p, i) => [`Palette ${String(i + 1).padStart(2, "0")} · ${p}${p === "v3" ? " (current)" : ""}`, { palette: p }]) },
  { group: "Font", items: Object.keys(L.FONTS).map((f, i) => [`Font ${String(i + 1).padStart(2, "0")} · ${f}${f === "Mali" ? " (current)" : ""}`, { font: f }]) },
];
})();
