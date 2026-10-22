// ===================== library/effects.js — comic effects (no flashing, no strobing: static or gently animatable shapes) =====================
// Origin = centre of the effect. Place it next to the thing it belongs to: L.put(S, "fx-sweat-drops", headX + 40, headY - 60, { s: 0.8, t }).
// Timing notes (used by every `call` line): pop-in 0.25 s (scale 0.6 -> 1.12 -> 1, back.out); leave with the 0.6 s crossfade. Never loop opacity.
(function () {
const L = window.L, f1 = L.f1;
L.FX_TIMING = { popIn: 0.25, popScale: [0.6, 1.12, 1], crossfade: 0.6 };
const NOTE = "pop-in 0.25 s scale 0.6>1.12>1 back.out; leave with the 0.6 s crossfade";

// ---------- helpers ----------
const at = (inner, x = 0, y = 0, deg = 0) => L.g(inner, `translate(${f1(x)} ${f1(y)})${deg ? ` rotate(${deg})` : ""}`);
const inked = (d, c, w) => L.stroke(d, { c: L.outline(c), w: w + 2 * L.lw("detail") }) + L.stroke(d, { c, w });
const union = (ds, name, tone = 0, w = "prop") => { // merged blob: fat outline stroke under, fills over (one silhouette)
  const oc = L.outline(name), sw = L.lw(w) * 2, fill = L.c(name, tone);
  return (sw ? ds.map((d) => L.tag("path", { d, fill, stroke: oc, "stroke-width": sw, "stroke-linejoin": "round" })).join("") : "") + ds.map((d) => L.tag("path", { d, fill })).join("");
};
const spark = (r, k = 0.14) => `M0 ${-r} Q${f1(k * r)} ${f1(-k * r)} ${r} 0 Q${f1(k * r)} ${f1(k * r)} 0 ${r} Q${f1(-k * r)} ${f1(k * r)} ${-r} 0 Q${f1(-k * r)} ${f1(-k * r)} 0 ${-r} Z`;
const dropPath = (s) => `M0 ${f1(-1.3 * s)} C${f1(0.2 * s)} ${f1(-0.6 * s)} ${s} ${f1(-0.1 * s)} ${s} ${f1(0.45 * s)} A${s} ${s} 0 0 1 ${-s} ${f1(0.45 * s)} C${-s} ${f1(-0.1 * s)} ${f1(-0.2 * s)} ${f1(-0.6 * s)} 0 ${f1(-1.3 * s)} Z`;
const drop = (s, c = "water") => L.shape(dropPath(s), c, { w: "detail" }) + L.flat(L.circ(-0.35 * s, 0.25 * s, 0.2 * s), "white", 0.85);
const heart = (s) => `M0 ${f1(0.9 * s)} C${f1(-1.1 * s)} ${f1(0.1 * s)} ${f1(-0.75 * s)} ${f1(-0.85 * s)} 0 ${f1(-0.35 * s)} C${f1(0.75 * s)} ${f1(-0.85 * s)} ${f1(1.1 * s)} ${f1(0.1 * s)} 0 ${f1(0.9 * s)} Z`;
const wavy = (x, y0, y1, a, n) => L.smooth(Array.from({ length: n + 1 }, (_, i) => [x + (i % 2 ? a : -a) * (i === 0 || i === n ? 0.3 : 1), y0 + ((y1 - y0) * i) / n]));
const COLS = ["red", "yellow", "blue", "green", "orange", "pink", "purple", "teal"];
const E = (name, label, fn, m = {}) => L.reg("effects", name, fn, {
  group: "Effects", label, box: m.box || [-170, -170, 340, 340], tags: m.tags || [], demo: m.demo || {}, wide: m.wide,
  call: `L.put(S, "${name}", x, y, { s, t${m.opts ? ", " + m.opts : ""} }) // ${NOTE}`,
});

// ---------- shine and stars ----------
E("fx-sparkle", "Sparkle", () => L.shape(spark(92), "yellow") + at(L.shape(spark(40), "yellow", { w: "detail" }), 82, -72) + at(L.shape(spark(32), "white", { w: "detail" }), -88, 62) + L.flat(L.circ(-60, -80, 6), "yellow") + L.flat(L.circ(90, 60, 5), "white"), { tags: ["sparkle", "shine", "twinkle", "glitter"] });
E("fx-star-burst", "Star burst", () => L.shape(L.star(0, 0, 130, 62, 8), "orange") + L.shape(L.star(0, 0, 88, 42, 8), "yellow", { w: "detail" }), { tags: ["star", "burst", "pop", "badge"] });
E("fx-glint", "Cartoon glint", () => L.shape(spark(60), "white", { flat: true }) + [-20, 0, 20].map((a) => inked(`M${f1(Math.cos(((a - 45) * Math.PI) / 180) * 85)} ${f1(Math.sin(((a - 45) * Math.PI) / 180) * 85)} L${f1(Math.cos(((a - 45) * Math.PI) / 180) * 125)} ${f1(Math.sin(((a - 45) * Math.PI) / 180) * 125)}`, "yellow", 10)).join(""), { tags: ["glint", "shine", "gleam", "shiny"] });
E("fx-dizzy-stars", "Dizzy stars (orbit)", () => { const st = [0, 1, 2].map((k) => { const a = ((k * 120 + 40) * Math.PI) / 180; return { x: Math.cos(a) * 115, y: Math.sin(a) * 34, z: Math.sin(a) }; }).sort((a, b) => a.z - b.z);
  return L.stroke(`M115 0 A115 34 0 1 1 -115 0 A115 34 0 1 1 115 0`, { c: "gray", w: "detail", op: 0.35, dash: "6 12" }) + st.map((p) => at(L.shape(L.star(0, 0, 36 + p.z * 12, 16 + p.z * 5, 5), "yellow", { w: "detail" }), p.x, p.y)).join(""); },
  { box: [-170, -90, 340, 180], tags: ["dizzy", "stars", "orbit", "hit", "daze"] });

// ---------- puffs and clouds ----------
E("fx-dust-puff", "Dust puff", () => union([[-72, 25, 40], [-18, -8, 56], [52, 10, 48], [98, 34, 32], [-108, 52, 26], [18, 48, 46]].map(([x, y, r]) => L.circ(x, y, r)), "sand", 1) + [[-128, -20, 14], [124, -18, 12], [4, -78, 10]].map(([x, y, r]) => L.shape(L.circ(x, y, r), "sand", { w: "detail", tone: 1, flat: true })).join(""), { tags: ["dust", "puff", "dirt", "land", "run"] });
E("fx-smoke", "Smoke column", () => union([[0, 118, 32], [20, 66, 44], [-14, 8, 56], [22, -62, 68]].map(([x, y, r]) => L.circ(x, y, r)), "gray", 1) + [[-52, -100, 14], [66, -112, 11]].map(([x, y, r]) => L.shape(L.circ(x, y, r), "gray", { w: "detail", tone: 1, flat: true })).join(""), { tags: ["smoke", "chimney", "burnt", "grey"] });
E("fx-poof", "Poof cloud", () => union([[0, 0, 70], [-66, 22, 50], [66, 22, 50], [-32, -52, 48], [36, -50, 50], [-22, 48, 52], [36, 50, 48]].map(([x, y, r]) => L.circ(x, y, r)), "white") +
  Array.from({ length: 8 }, (_, i) => { const a = (i / 8) * Math.PI * 2 + 0.2; return L.shape(L.circ(Math.cos(a) * 138, Math.sin(a) * 138, 18 - (i % 2) * 6), "white", { w: "detail", flat: true }); }).join("") + at(L.shape(spark(26), "yellow", { w: "detail" }), 78, -96) + at(L.shape(spark(20), "yellow", { w: "detail" }), -92, -84),
  { tags: ["poof", "puff", "vanish", "magic", "appear", "cloud"] });
E("fx-steam", "Steam wisps", () => [[-62, 100, -70, 5], [0, 112, -108, 7], [62, 96, -64, 5]].map(([x, y0, y1, n]) => inked(wavy(x, y0, y1, 20, n), "white", 15)).join(""), { tags: ["steam", "hot", "cooking", "coffee", "wisp"] });
E("fx-stink-lines", "Stink lines", () => [-58, 0, 58].map((x, i) => inked(wavy(x, 100 - i * 8, -90 - (i % 2) * 14, 24, 6), "green", 14)).join(""), { tags: ["stink", "smell", "gross", "comic"] });
E("fx-heat-waves", "Heat waves", () => [-80, -26, 28, 82].map((y, i) => L.stroke(L.smooth(Array.from({ length: 9 }, (_, k) => [-130 + k * 32.5, y + (k % 2 ? 14 : -14) * (k === 0 || k === 8 ? 0.4 : 1)])), { c: i % 2 ? "red" : "orange", w: 11 })).join(""), { tags: ["heat", "hot", "waves", "shimmer", "desert"] });

// ---------- motion and impact ----------
E("fx-motion-lines", "Motion lines (trailing)", () => [[-62, -150, 10], [-20, -170, -30], [22, -140, 0], [64, -110, 30]].map(([y, x0, x1]) => L.stroke(L.line([x0, y], [x1, y]), { c: "ink", w: 11 })).join(""), { box: [-190, -110, 340, 220], tags: ["motion", "lines", "trail", "move", "fast"] });
E("fx-speed-lines", "Speed lines (radial)", () => { const r = L.rng(4); let s = ""; for (let i = 0; i < 30; i++) { const a = (i / 30) * Math.PI * 2 + r() * 0.1, w = 0.05, r1 = 78 + r() * 40, r2 = 150 + r() * 14, p = (rr, d) => `${f1(Math.cos(a + d) * rr)} ${f1(Math.sin(a + d) * rr)}`; s += L.flat(`M${p(r1, 0)} L${p(r2, -w)} L${p(r2, w)} Z`, "ink"); } return s; }, { tags: ["speed", "lines", "radial", "focus", "manga", "zoom"] });
E("fx-impact-lines", "Impact lines", () => { const r = L.rng(9); return Array.from({ length: 10 }, (_, i) => { const a = (i / 10) * Math.PI * 2, r1 = 62 + r() * 10, r2 = 105 + r() * 30; return L.stroke(L.line([Math.cos(a) * r1, Math.sin(a) * r1], [Math.cos(a) * r2, Math.sin(a) * r2]), { c: "ink", w: 12 }); }).join(""); }, { tags: ["impact", "hit", "bonk", "lines", "burst"] });
E("fx-pow", "Pow explosion (friendly)", (o) => { const burst = (n, r1, r2, k) => L.poly(Array.from({ length: n * 2 }, (_, i) => { const a = (i / (n * 2)) * Math.PI * 2 - Math.PI / 2, r = i % 2 ? r2 : r1; return [Math.cos(a) * r * k, Math.sin(a) * r * 0.88]; }), true);
  return L.shape(burst(12, 156, 106, 1.05), "orange") + L.shape(burst(12, 118, 80, 1.05), "yellow", { w: "detail" }) + L.text(o.text || "POW!", 0, 26, { size: 68, c: "red", halo: "ink", haloW: 0.14 }); },
  { demo: { text: "POW!" }, opts: 'text: "POW!"', tags: ["pow", "explosion", "boom", "bang", "crash", "comic"] });
E("fx-magic-swirl", "Magic swirl", () => { const pts = Array.from({ length: 36 }, (_, i) => { const a = i * 0.3; return [Math.cos(a) * (14 + a * 12), Math.sin(a) * (14 + a * 12)]; });
  return L.shape(L.limb(pts, 6, 30), "purple") + at(L.shape(spark(26), "yellow", { w: "detail" }), 100, -100) + at(L.shape(spark(18), "white", { w: "detail" }), -110, 80) + at(L.shape(spark(14), "yellow", { w: "detail" }), 120, 90); }, { tags: ["magic", "swirl", "spell", "wizard", "spiral"] });
E("fx-spiral", "Dizzy spiral", () => L.stroke(L.smooth(Array.from({ length: 64 }, (_, i) => { const a = i * 0.33; return [Math.cos(a) * (5 + a * 7.2), Math.sin(a) * (5 + a * 7.2)]; })), { c: "ink", w: 9 }), { tags: ["spiral", "dizzy", "hypnotic", "confused", "swirl"] });

// ---------- body effects (placed beside a head) ----------
E("fx-sweat-drops", "Sweat drops", () => at(drop(34), 52, -52, 25) + at(drop(22), 100, 20, 65) + at(drop(26), -66, -30, -30), { tags: ["sweat", "nervous", "drops", "worry"] });
E("fx-tears", "Tears", () => { const side = [[58, -8, 26, -32], [96, 42, 18, -52], [118, 92, 13, -68]].map(([x, y, r, d]) => at(drop(r), x, y, d)).join(""); return side + L.g(side, "scale(-1 1)"); }, { tags: ["tears", "cry", "sad", "crying"] });
E("fx-zzz", "Zzz sleeping", () => [[-62, 70, 74, -8], [8, 10, 104, 6], [88, -64, 140, -6]].map(([x, y, s, d]) => at(L.text("Z", 0, s * 0.34, { size: s, c: "white", halo: "ink", haloW: 0.2 }), x, y, d)).join(""), { tags: ["zzz", "sleep", "snore", "tired", "asleep"] });
E("fx-hearts", "Hearts", () => at(L.shape(heart(76), "red"), 0, 12) + at(L.shape(heart(40), "pink", { w: "detail" }), 88, -78, 14) + at(L.shape(heart(32), "pink", { w: "detail" }), -88, -62, -18) + at(L.shape(heart(22), "red", { w: "detail" }), 70, 82, 12), { tags: ["hearts", "love", "kiss", "in love", "cute"] });
E("fx-question-marks", "Question marks", () => [[0, 14, 150, -6], [92, -82, 100, 12], [-96, -52, 84, -14]].map(([x, y, s, d]) => at(L.text("?", 0, s * 0.34, { size: s, c: "blue", halo: "ink", haloW: 0.16 }), x, y, d)).join(""), { tags: ["question", "confused", "huh", "wonder"] });
E("fx-exclamation", "Exclamation mark", () => L.shape(L.limb([[0, -100], [0, 8]], 50, 24), "red") + L.shape(L.circ(0, 68, 19), "red", { w: "detail" }) + [195, 225, 315, 345].map((a) => { const r = (a * Math.PI) / 180; return L.stroke(L.line([Math.cos(r) * 92, -48 + Math.sin(r) * 92], [Math.cos(r) * 130, -48 + Math.sin(r) * 130]), { c: "ink", w: 10 }); }).join(""), { tags: ["exclamation", "surprise", "alert", "shock", "!"] });
E("fx-anger-mark", "Anger mark", () => [0, 90, 180, 270].map((d) => at(L.shape("M16 -16 Q78 -16 90 -90 Q16 -78 16 -16 Z", "red"), 0, 0, d)).join(""), { tags: ["anger", "angry", "cross", "pop", "annoyed", "vein"] });
E("fx-shiver-lines", "Shiver lines (cold)", () => [-1, 1].map((d) => [84, 112, 140].map((x, i) => L.stroke(L.smooth([[d * x, -46 + i * 8], [d * (x + 6), 0], [d * x, 46 - i * 8]]), { c: "blue", w: 11 })).join("")).join(""), { tags: ["cold", "shiver", "freezing", "brr", "scared"] });

// ---------- objects and symbols ----------
E("fx-lightbulb", "Light bulb idea", () => [-155, -130, -105, -75, -45, -20, 5].map((a) => { const r = (a * Math.PI) / 180; return L.stroke(L.line([Math.cos(r) * 108, -30 + Math.sin(r) * 108], [Math.cos(r) * 146, -30 + Math.sin(r) * 146]), { c: "orange", w: 10 }); }).join("") +
  L.shape(L.rrect(-26, 80, 52, 18, 8), "gray", { w: "detail", tone: 2 }) + L.shape(L.rrect(-32, 58, 64, 24, 8), "gray", { w: "detail" }) +
  L.shape(L.smooth([[-30, 60], [-62, 25], [-72, -30], [-45, -85], [0, -102], [45, -85], [72, -30], [62, 25], [30, 60], [-30, 60]]), "yellow") +
  L.stroke("M-18 58 L-18 14 L0 -8 L18 14 L18 58", { c: "orange", w: 7 }) + L.flat(L.circ(-34, -48, 9, 16), "white", 0.8),
  { box: [-170, -190, 340, 330], tags: ["idea", "bulb", "light", "eureka", "thought"] });
E("fx-music-notes", "Music notes", () => { const head = (x, y, c) => L.shape(L.circ(x, y, 24, 17), c, { w: "detail" });
  return head(-70, 62, "blue") + L.stroke("M-47 58 L-47 -34", { c: "ink", w: 9 }) + L.stroke("M-47 -34 Q-10 -26 -22 20", { c: "ink", w: 9 }) +
    head(34, 22, "purple") + head(104, 4, "purple") + L.stroke("M57 18 L57 -70 M127 0 L127 -88", { c: "ink", w: 9 }) + L.shape("M52 -62 L132 -82 L132 -58 L52 -38 Z", "ink", { w: "detail", flat: true });  }, { tags: ["music", "notes", "song", "sing", "melody"] });
E("fx-confetti", "Confetti (static)", () => { const r = L.rng(11); let s = ""; for (let i = 0; i < 48; i++) { const x = (r() - 0.5) * 300, y = (r() - 0.5) * 300, c = COLS[i % COLS.length], d = Math.round(r() * 180), k = i % 3;
    s += k === 0 ? at(L.flat(L.rect(-9, -5, 18, 10), c), x, y, d) : k === 1 ? L.flat(L.circ(x, y, 5 + r() * 3), c) : at(L.stroke("M-12 0 Q-6 -8 0 0 T12 0", { c, w: 5 }), x, y, d); } return s; }, { tags: ["confetti", "party", "celebrate", "win", "congrats"] });
E("fx-bubbles", "Bubbles", () => [[-40, 40, 52], [52, -8, 38], [-8, -72, 26], [74, 74, 22], [-92, -42, 16]].map(([x, y, r]) => L.shape(L.circ(x, y, r), "sky", { w: "detail", flat: true }) + L.stroke(L.arc(x, y, r * 0.62, 195, 265), { c: "white", w: Math.max(4, r * 0.14) })).join(""), { tags: ["bubbles", "water", "soap", "underwater", "fizz"] });
E("fx-fire", "Fire flame (static)", () => L.shape(L.smooth([[0, 118], [-64, 82], [-74, 20], [-42, -30], [-50, -78], [-8, -48], [10, -128], [32, -62], [70, -26], [74, 40], [56, 86], [0, 118]]), "red") +
  L.shape(L.smooth([[0, 112], [-42, 82], [-48, 30], [-24, -10], [-26, -44], [4, -22], [14, -76], [28, -26], [50, 6], [50, 52], [36, 88], [0, 112]]), "orange", { w: "detail" }) +
  L.shape(L.smooth([[0, 108], [-22, 86], [-24, 50], [0, 14], [10, 40], [26, 62], [20, 90], [0, 108]]), "yellow", { w: "detail" }), { tags: ["fire", "flame", "hot", "burn", "campfire"] });
E("fx-water-splash", "Water splash", () => { const fingers = [[-86, -10, 40, -48], [-44, -40, 52, -22], [0, -58, 58, 0], [44, -40, 52, 22], [86, -10, 40, 48]];
  return L.shape(L.circ(0, 78, 100, 24), "water", { tone: 2, w: "detail" }) + fingers.map(([x, y, s, d]) => at(L.shape(dropPath(s * 0.62), "water", { w: "detail" }), x, y + 22, d)).join("") + L.shape(L.circ(0, 60, 62, 18), "water", { w: "detail" }) +
    at(drop(14), -112, -62, -30) + at(drop(12), 116, -58, 30) + at(drop(10), 0, -128, 0); }, { tags: ["splash", "water", "drip", "jump", "pool"] });
E("fx-ripple", "Water ripple", () => [[150, 10], [100, 8], [50, 6]].map(([rx, w]) => L.stroke(L.circ(0, 0, rx, rx * 0.3), { c: "water", w })).join(""), { box: [-170, -70, 340, 140], tags: ["ripple", "water", "pond", "rings", "drop"] });

// ---------- ground and light ----------
E("fx-shadow-blob", "Shadow blob", () => L.tag("ellipse", { cx: 0, cy: 0, rx: 130, ry: 28, fill: L.c("ink"), opacity: 0.16 }) + L.tag("ellipse", { cx: 0, cy: 0, rx: 88, ry: 18, fill: L.c("ink"), opacity: 0.2 }), { box: [-170, -70, 340, 140], tags: ["shadow", "ground", "contact", "blob"] });
E("fx-glow-ring", "Glow ring (outline only)", () => L.stroke(L.circ(0, 0, 118), { c: "yellow", w: 40, op: 0.22 }) + L.stroke(L.circ(0, 0, 118), { c: "yellow", w: 22, op: 0.5 }) + L.stroke(L.circ(0, 0, 118), { c: "yellow", w: 8 }), { tags: ["glow", "ring", "halo", "aura", "highlight"] });
E("fx-vignette", "Focus vignette", (o) => { const id = "vg" + (L._n = (L._n || 0) + 1), k = L.c("ink");
  return `<defs><radialGradient id="${id}" cx="0.5" cy="0.5" r="0.72"><stop offset="0.4" stop-color="${k}" stop-opacity="0"/><stop offset="1" stop-color="${k}" stop-opacity="${o.strength || 0.55}"/></radialGradient></defs><rect x="-960" y="-540" width="1920" height="1080" fill="url(#${id})"/>`; },
  { box: [-960, -540, 1920, 1080], wide: true, demo: { strength: 0.55 }, opts: "strength: 0.55", tags: ["vignette", "focus", "dark edges", "spotlight", "frame"] });
})();
