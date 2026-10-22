// ===================== library/text.js — cards, bubbles, captions, charts, arrows, marks, stamps, thumbnail text =====================
// Every item takes its words from o.text (and o.sub / o.value / o.data …) so it is reusable with any wording.
// The font comes from the Look token (L.T.font); colours are palette names; sizes are px at s = 1 in a 1920x1080 frame.
(function () {
const L = window.L, f1 = L.f1;

// ---------- helpers ----------
const wrap = (s, n) => { const out = []; let cur = ""; String(s).split(/\s+/).forEach((w) => { if (cur && (cur + " " + w).length > n) { out.push(cur); cur = w; } else cur = cur ? cur + " " + w : w; }); if (cur) out.push(cur); return out; };
const tw = (s, size, k = 0.6) => String(s).length * size * k;              // text width estimate
const txt = (s, x, cy, o = {}) => L.text(s, x, cy + (o.size || 64) * 0.34, o); // text centred vertically on cy
const edge = () => (L.T.ink === "none" ? L.c("gray") : L.outline("white"));    // outline colour for white shapes
const ol = (d, w = "prop", dash) => L.stroke(d, { c: edge(), w, dash });
const inked = (d, c, w) => L.stroke(d, { c: L.outline(c), w: w + 2 * L.lw("detail") }) + L.stroke(d, { c, w }); // coloured stroke with an ink edge
const wave = (x, y, w, a, n = 8) => L.smooth(Array.from({ length: n + 1 }, (_, i) => [x + (w * i) / n, y + (i % 2 ? a : -a)]));
const rot = (inner, deg, x = 0, y = 0) => L.g(inner, `translate(${f1(x)} ${f1(y)}) rotate(${deg})`);
const union = (ds, name, tone = 0, w = "prop") => { // merged blob outline: fat stroke under, fills over
  const oc = L.outline(name), sw = L.lw(w) * 2, fill = L.c(name, tone);
  return (sw ? ds.map((d) => L.tag("path", { d, fill, stroke: oc, "stroke-width": sw, "stroke-linejoin": "round" })).join("") : "") + ds.map((d) => L.tag("path", { d, fill })).join("");
};
const tri = (p, q, size) => { const dx = q[0] - p[0], dy = q[1] - p[1], m = Math.hypot(dx, dy) || 1, ux = dx / m, uy = dy / m, bx = q[0] - ux * size * 0.5, by = q[1] - uy * size * 0.5; return L.poly([[q[0] + ux * size * 0.5, q[1] + uy * size * 0.5], [bx - uy * size * 0.6, by + ux * size * 0.6], [bx + uy * size * 0.6, by - ux * size * 0.6]], true); };
const R = (group, name, label, fn, m = {}) => L.reg("text", name, fn, {
  group, label, box: m.box || [-420, -180, 840, 360], tags: m.tags || [], demo: m.demo || {}, wide: m.wide,
  call: `L.put(S, "${name}", x, y, { s, t${m.opts ? ", " + m.opts : ""} })`,
});

// ================= Cards =================
R("Cards", "title-plain", "Title · plain + squiggle", (o) => { const t = o.text || "Big Title", s = o.size || 130, w = tw(t, s);
  return txt(t, 0, 0, { size: s }) + L.stroke(wave(-w / 2, s * 0.62, w, s * 0.06), { c: o.c || "red", w: "prop" }); },
  { box: [-520, -130, 1040, 260], demo: { text: "Big Title" }, opts: 'text: "Big Title", size, c', tags: ["title", "card"], wide: true });

R("Cards", "title-banner", "Title · ribbon banner", (o) => { const t = o.text || "Big Title", s = o.size || 110, w = tw(t, s) + 130, h = s * 1.5, c = o.c || "red";
  const tail = (d) => L.shape(L.poly([[d * (w / 2 + 90), -h / 2 + 24], [d * (w / 2 - 20), -h / 2 + 24], [d * (w / 2 - 20), h / 2 + 24], [d * (w / 2 + 90), h / 2 + 24], [d * (w / 2 + 58), 24]], true), c, { tone: 2 });
  return tail(-1) + tail(1) + L.shape(L.rect(-w / 2, -h / 2, w, h), c) + txt(t, 0, 0, { size: s, c: "white", halo: "ink", haloW: 0.1 }); },
  { box: [-560, -140, 1120, 300], demo: { text: "Big Title" }, opts: 'text, size, c', tags: ["title", "ribbon"], wide: true });

R("Cards", "title-boxed", "Title · boxed card", (o) => { const t = o.text || "Big Title", s = o.size || 110, w = tw(t, s) + 140, h = s * 1.7;
  return L.shape(L.rrect(-w / 2, -h / 2, w, h, 30), "paper") + L.stroke(L.rrect(-w / 2 + 16, -h / 2 + 16, w - 32, h - 32, 20), { c: o.c || "blue", w: "detail", dash: "18 12" }) + txt(t, 0, 0, { size: s }); },
  { box: [-520, -150, 1040, 300], demo: { text: "Big Title" }, opts: 'text, size, c', tags: ["title", "card"], wide: true });

R("Cards", "title-marker", "Title · marker highlight", (o) => { const t = o.text || "Big Title", s = o.size || 130, w = tw(t, s) + 70, h = s * 1.1;
  return L.flat(L.poly([[-w / 2, -h * 0.4], [w / 2 + 12, -h * 0.5], [w / 2, h * 0.46], [-w / 2 - 10, h * 0.52]], true), o.c || "yellow", 0.95) + txt(t, 0, 0, { size: s }); },
  { box: [-520, -130, 1040, 260], demo: { text: "Big Title" }, opts: 'text, size, c', tags: ["title", "highlight"], wide: true });

R("Cards", "title-stacked", "Title · 3D block letters", (o) => { const t = o.text || "BIG TITLE", s = o.size || 140; let back = "";
  for (let i = 12; i >= 1; i--) back += txt(t, i * 1.6, i * 2, { size: s, c: "ink", halo: "ink", haloW: 0.05 });
  return back + txt(t, 0, 0, { size: s, c: o.c || "yellow", halo: "ink", haloW: 0.14 }) + (o.sub ? txt(o.sub, 0, s * 0.95, { size: s * 0.36 }) : ""); },
  { box: [-560, -130, 1120, 340], demo: { text: "BIG TITLE", sub: "a subtitle" }, opts: 'text, sub, size, c', tags: ["title", "3d"], wide: true });

const chapter = (o) => ({ n: o.n === undefined ? 3 : o.n, t: o.text || "The Big Bang", w: o.label || "CHAPTER" });
R("Cards", "chapter-circle", "Chapter · number circle", (o) => { const { n, t } = chapter(o), s = o.size || 80, tl = tw(t, s), total = 190 + 50 + tl, x0 = -total / 2;
  return L.shape(L.circ(x0 + 95, 0, 95), o.c || "blue") + txt(String(n), x0 + 95, 0, { size: 120, c: "white", halo: "ink", haloW: 0.08 }) + L.text(t, x0 + 240, s * 0.34, { size: s, anchor: "start" }); },
  { box: [-460, -130, 920, 260], demo: { n: 3, text: "The Big Bang" }, opts: 'n: 3, text, c', tags: ["chapter"], wide: true });

R("Cards", "chapter-bigdigit", "Chapter · big digit + line", (o) => { const { n, t, w } = chapter(o), s = o.size || 76, tl = tw(t, s), total = 150 + 70 + tl, x0 = -total / 2;
  return txt(String(n), x0 + 75, 0, { size: 260, c: o.c || "orange", halo: "ink", haloW: 0.07 }) + L.stroke(L.line([x0 + 170, -90], [x0 + 170, 90]), { c: "ink", w: "prop" }) +
    L.text(w, x0 + 215, -48, { size: 34, anchor: "start", c: "gray", spacing: 6 }) + L.text(t, x0 + 215, s * 0.34 + 20, { size: s, anchor: "start" }); },
  { box: [-460, -150, 920, 300], demo: { n: 3, text: "The Big Bang" }, opts: 'n, text, label: "CHAPTER", c', tags: ["chapter"], wide: true });

R("Cards", "chapter-card", "Chapter · tabbed card", (o) => { const { n, t, w } = chapter(o), s = o.size || 84, cw = Math.max(520, tw(t, s) + 120), ch = 250;
  return L.shape(L.rrect(-cw / 2, -ch / 2 + 20, cw, ch - 20, 26), "paper") + L.shape(L.rrect(-170, -ch / 2 - 30, 340, 80, 24), o.c || "green") +
    txt(`${w} ${n}`, 0, -ch / 2 + 10, { size: 44, c: "white", halo: "ink", haloW: 0.08 }) + txt(t, 0, 36, { size: s }); },
  { box: [-460, -170, 920, 330], demo: { n: 3, text: "The Big Bang" }, opts: 'n, text, label, c', tags: ["chapter", "card"], wide: true });

R("Cards", "label-plain", "Label · plain underline", (o) => { const t = o.text || "Label", s = o.size || 80, w = tw(t, s);
  return txt(t, 0, 0, { size: s }) + L.stroke(L.line([-w / 2 - 6, s * 0.58], [w / 2 + 6, s * 0.58]), { c: o.c || "ink", w: "prop" }); },
  { box: [-300, -100, 600, 200], demo: { text: "Label" }, opts: 'text, size, c', tags: ["label"] });

R("Cards", "label-pinned", "Label · pinned card", (o) => { const t = o.text || "Label", s = o.size || 70, w = tw(t, s) + 90, h = s * 1.7;
  return rot(L.shape(L.rrect(-w / 2, -h / 2, w, h, 14), "paper") + txt(t, 0, 6, { size: s }) + L.shape(L.circ(0, -h / 2 + 6, 17), "red") + L.flat(L.circ(-5, -h / 2, 5), "white", 0.8), -3); },
  { box: [-300, -110, 600, 220], demo: { text: "Label" }, opts: 'text, size', tags: ["label", "pin"] });

R("Cards", "label-ribbon", "Label · ribbon tag", (o) => { const t = o.text || "Label", s = o.size || 70, w = tw(t, s) + 110, h = s * 1.5;
  return L.shape(L.poly([[-w / 2, -h / 2], [w / 2, -h / 2], [w / 2 - 34, 0], [w / 2, h / 2], [-w / 2, h / 2]], true), o.c || "orange") + txt(t, -10, 0, { size: s, c: "white", halo: "ink", haloW: 0.1 }); },
  { box: [-300, -100, 600, 200], demo: { text: "Label" }, opts: 'text, size, c', tags: ["label", "ribbon"] });

R("Cards", "label-sticky", "Label · sticky note", (o) => { const lines = wrap(o.text || "Remember this", o.wrap || 12), s = o.size || 56, w = Math.max(220, Math.max(...lines.map((l) => tw(l, s))) + 70), h = lines.length * s * 1.2 + 80, f = 44;
  const body = L.shape(L.poly([[-w / 2, -h / 2], [w / 2, -h / 2], [w / 2, h / 2 - f], [w / 2 - f, h / 2], [-w / 2, h / 2]], true), o.c || "yellow") +
    L.shape(L.poly([[w / 2, h / 2 - f], [w / 2 - f, h / 2], [w / 2 - f, h / 2 - f]], true), o.c || "yellow", { tone: 2, w: "detail" }) +
    L.flat(L.rect(-50, -h / 2 - 16, 100, 34), "white", 0.7) +
    lines.map((l, i) => txt(l, 0, (i - (lines.length - 1) / 2) * s * 1.2 + 6, { size: s })).join("");
  return rot(body, 4); },
  { box: [-220, -190, 440, 380], demo: { text: "Remember this" }, opts: 'text, size, c', tags: ["label", "sticky", "note"] });

R("Cards", "quote-card", "Quote card + figure", (o) => { const lines = wrap(o.text || "Stay curious, the universe is strange.", o.wrap || 20), s = o.size || 44, cw = 880, ch = 380;
  const fig = L.shape(L.circ(0, 0, 112), "sky", { w: "detail" }) + L.shape(L.circ(0, -50, 38), "navy", { w: "detail" }) + L.shape("M-82 82 Q-82 4 0 4 Q82 4 82 82 Z", "navy", { w: "detail" });
  return L.shape(L.rrect(-cw / 2, -ch / 2, cw, ch, 30), "paper") + L.g(fig, `translate(${-cw / 2 + 150} 0)`) +
    txt("“", 30, -ch / 2 + 60, { size: 200, c: o.c || "orange", halo: "ink", haloW: 0.04 }) +
    lines.map((l, i) => L.text(l, -150, (i - (lines.length - 1) / 2) * s * 1.3 + 14 + s * 0.34, { size: s, anchor: "start" })).join("") +
    L.text(o.who || "— Someone wise", cw / 2 - 40, ch / 2 - 36, { size: 32, anchor: "end", c: "gray" }); },
  { box: [-480, -220, 960, 440], demo: { text: "Stay curious, the universe is strange.", who: "— Someone wise" }, opts: 'text, who, c', tags: ["quote", "card", "figure"], wide: true });

// ================= Bubbles =================
const lay = (o, size, n) => { const lines = wrap(o.text || "Hello there!", o.wrap || n), s = o.size || size, lh = s * 1.2; return { lines, s, lh, w: Math.max(...lines.map((l) => tw(l, s))), h: lines.length * lh }; };
const words = (m, x = 0, y0 = 0, c = "ink") => m.lines.map((l, i) => txt(l, x, y0 + (i - (m.lines.length - 1) / 2) * m.lh, { size: m.s, c })).join("");
// bubble tail: filled wedge that hides the body outline at its base + two outlined sides
const tail = (x1, y1, tip, x2, y2, fill = "white") => L.flat(L.poly([[x1, y1 - 10], [x1, y1], tip, [x2, y2], [x2, y2 - 10]], true), fill) + ol(L.poly([[x1, y1], tip, [x2, y2]]));
const bubBox = [-340, -230, 680, 460];

R("Bubbles", "bubble-round", "Speech · round", (o) => { const m = lay(o, 50, 16), rx = (m.w / 2) * 1.25 + 36, ry = (m.h / 2) * 1.3 + 30, d = o.tail === "right" ? 1 : -1;
  const ey = (x) => ry * Math.sqrt(Math.max(0, 1 - (x / rx) ** 2)), x1 = d * rx * 0.15, x2 = d * rx * 0.5;
  return L.shape(L.circ(0, 0, rx, ry), "white", { flat: true }) + tail(x1, ey(x1), [d * rx * 0.7, ry + 75], x2, ey(x2)) + words(m); },
  { box: bubBox, demo: { text: "Hello there!" }, opts: 'text, tail: "left"|"right"', tags: ["speech", "bubble", "talk"] });

R("Bubbles", "bubble-thought", "Thought · cloud", (o) => { const m = lay(o, 50, 16), rx = (m.w / 2) * 1.25 + 40, ry = (m.h / 2) * 1.3 + 34, d = o.tail === "right" ? 1 : -1, n = 12, avg = (rx + ry) / 2, br = ((2 * Math.PI * avg * 0.86) / n) * 0.62;
  const ds = [L.circ(0, 0, rx * 0.9, ry * 0.9)]; for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2; ds.push(L.circ(Math.cos(a) * rx * 0.88, Math.sin(a) * ry * 0.88, br)); }
  const trail = [[d * rx * 0.45, ry + 28, 24], [d * rx * 0.58, ry + 70, 16], [d * rx * 0.66, ry + 100, 10]].map(([x, y, r]) => L.shape(L.circ(x, y, r), "white", { flat: true })).join("");
  return union(ds, "white") + trail + words(m); },
  { box: bubBox, demo: { text: "I wonder..." }, opts: 'text, tail', tags: ["thought", "bubble", "think", "cloud"] });

R("Bubbles", "bubble-shout", "Shout · burst", (o) => { const m = lay(o, 56, 12), rx = (m.w / 2) * 1.35 + 60, ry = (m.h / 2) * 1.4 + 50, r = L.rng(7), n = 18;
  const pts = Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2 - Math.PI / 2, k = i % 2 ? 0.74 : 1.04 + r() * 0.1; return [Math.cos(a) * rx * k, Math.sin(a) * ry * k]; });
  return L.shape(L.poly(pts, true), o.c || "yellow", { flat: true }) + words(m, 0, 0, "ink"); },
  { box: bubBox, demo: { text: "Look out!" }, opts: 'text, c', tags: ["shout", "bubble", "burst", "yell"] });

R("Bubbles", "bubble-whisper", "Whisper · dashed", (o) => { const m = lay(o, 40, 18), rx = (m.w / 2) * 1.25 + 34, ry = (m.h / 2) * 1.3 + 28, d = o.tail === "right" ? 1 : -1;
  const ey = (x) => ry * Math.sqrt(Math.max(0, 1 - (x / rx) ** 2)), x1 = d * rx * 0.15, x2 = d * rx * 0.45, tip = [d * rx * 0.6, ry + 60];
  return L.flat(L.circ(0, 0, rx, ry), "white") + ol(L.circ(0, 0, rx, ry), "detail", "14 12") + L.flat(L.poly([[x1, ey(x1)], tip, [x2, ey(x2)]], true), "white") + ol(L.poly([[x1, ey(x1)], tip, [x2, ey(x2)]]), "detail", "10 10") + words(m, 0, 0, "gray"); },
  { box: bubBox, demo: { text: "psst, secret" }, opts: 'text, tail', tags: ["whisper", "bubble", "quiet"] });

const phone = (o, mine) => { const m = lay(o, 46, 18), w = m.w + 90, h = m.h + 70, d = mine ? 1 : -1, c = mine ? "blue" : "gray";
  return L.shape(L.rrect(-w / 2, -h / 2, w, h, 40), c, { flat: true }) +
    L.flat(L.poly([[d * (w / 2 - 80), h / 2 - 10], [d * (w / 2 - 80), h / 2], [d * (w / 2 + 14), h / 2 + 34], [d * (w / 2 - 22), h / 2], [d * (w / 2 - 22), h / 2 - 10]], true), c) +
    L.stroke(L.poly([[d * (w / 2 - 80), h / 2], [d * (w / 2 + 14), h / 2 + 34], [d * (w / 2 - 22), h / 2]]), { c: L.outline(c), w: "prop" }) + words(m, 0, 0, mine ? "white" : "ink"); };
R("Bubbles", "bubble-phone-sent", "Phone message · sent", (o) => phone(o, true), { box: [-340, -130, 680, 260], demo: { text: "On my way!" }, opts: "text", tags: ["phone", "message", "chat", "text"] });
R("Bubbles", "bubble-phone-received", "Phone message · received", (o) => phone(o, false), { box: [-340, -130, 680, 260], demo: { text: "Where are you?" }, opts: "text", tags: ["phone", "message", "chat", "text"] });

R("Bubbles", "bubble-narration", "Narration box", (o) => { const m = lay(o, 46, 26), w = m.w + 80, h = m.h + 56;
  return L.shape(L.rrect(-w / 2, -h / 2, w, h, 10), "cream", { flat: true }) + words(m); },
  { box: [-420, -120, 840, 240], demo: { text: "Meanwhile, in a galaxy far away..." }, opts: "text", tags: ["narration", "caption", "box"], wide: true });

// ================= Captions =================
const CAP = [-600, -90, 1200, 180];
R("Captions", "caption-outline", "Caption · outlined white", (o) => txt(o.text || "Caption text here", 0, 0, { size: o.size || 90, c: "white", halo: "ink", haloW: 0.24 }),
  { box: CAP, demo: { text: "Caption text here" }, opts: "text, size", tags: ["caption", "subtitle", "outline"], wide: true });
R("Captions", "caption-boxed", "Caption · dark box", (o) => { const t = o.text || "Caption text here", s = o.size || 76, w = tw(t, s) + 80, h = s * 1.45;
  return L.flat(L.rrect(-w / 2, -h / 2, w, h, 22), "ink", 0.82) + txt(t, 0, 0, { size: s, c: "white" }); },
  { box: CAP, demo: { text: "Caption text here" }, opts: "text, size", tags: ["caption", "subtitle", "box"], wide: true });
R("Captions", "caption-highlight", "Caption · marker highlight", (o) => { const t = o.text || "Caption text here", s = o.size || 80, w = tw(t, s) + 60, h = s * 1.15;
  return L.flat(L.poly([[-w / 2, -h * 0.42], [w / 2 + 10, -h * 0.5], [w / 2, h * 0.46], [-w / 2 - 8, h * 0.5]], true), o.c || "yellow", 0.95) + txt(t, 0, 0, { size: s }); },
  { box: CAP, demo: { text: "Caption text here" }, opts: "text, size, c", tags: ["caption", "subtitle", "marker"], wide: true });
R("Captions", "caption-typewriter", "Caption · typewriter", (o) => { const t = o.text || "Typed one letter at a time", s = o.size || 54, sp = 4, w = tw(t, s, 0.6) + t.length * sp + 100, h = s * 1.5, x0 = -w / 2 + 40;
  return L.shape(L.rrect(-w / 2, -h / 2, w, h, 14), "ink", { flat: true }) + L.text(t, x0, s * 0.34, { size: s, anchor: "start", c: "paper", spacing: sp }) + L.flat(L.rect(x0 + tw(t, s) + t.length * sp - 4, -s * 0.5, s * 0.34, s), "yellow"); },
  { box: CAP, demo: { text: "Typed one letter at a time" }, opts: "text, size", tags: ["caption", "subtitle", "typewriter", "typing"], wide: true });

// ================= Numbers and charts =================
const NB = [-300, -200, 600, 400];
R("Numbers and charts", "counter-big", "Counter · big number + unit", (o) => txt(String(o.value === undefined ? "1,000,000" : o.value), 0, -30, { size: o.size || 170, c: o.c || "orange", halo: "ink", haloW: 0.1 }) + txt(o.unit || "km per hour", 0, 100, { size: 60 }),
  { box: [-440, -150, 880, 300], demo: { value: "1,000,000", unit: "km per hour" }, opts: 'value, unit, c', tags: ["number", "counter", "stat"], wide: true });

R("Numbers and charts", "counter-ring", "Counter · percent ring", (o) => { const p = Math.max(0, Math.min(100, o.pct === undefined ? 72 : o.pct)), r = 120;
  return L.stroke(L.circ(0, 0, r), { c: "gray", w: 34, op: 0.35 }) + (p > 0 ? L.stroke(L.arc(0, 0, r, -90, -90 + 3.59 * p), { c: o.c || "blue", w: 34 }) : "") + txt(p + "%", 0, 0, { size: 84 }) + (o.unit ? txt(o.unit, 0, r + 70, { size: 44 }) : ""); },
  { box: [-190, -190, 380, 440], demo: { pct: 72, unit: "complete" }, opts: "pct, unit, c", tags: ["number", "percent", "ring", "progress"] });

R("Numbers and charts", "stat-card", "Stat card", (o) => { const lines = wrap(o.text || "of the universe is dark matter", 16);
  return L.shape(L.rrect(-230, -190, 460, 380, 30), "paper") + L.shape(L.rrect(-230, -190, 460, 34, 30), o.c || "blue", { w: "detail" }) + txt(String(o.value || "85%"), 0, -70, { size: 150, c: o.c || "blue", halo: "ink", haloW: 0.07 }) +
    lines.map((l, i) => txt(l, 0, 40 + i * 52, { size: 42 })).join(""); },
  { box: [-260, -210, 520, 420], demo: { value: "85%", text: "of the universe is dark matter" }, opts: "value, text, c", tags: ["stat", "card", "number"] });

R("Numbers and charts", "rank-badge", "Rank badge · medal", (o) => { const tl = (d) => L.shape(L.poly([[d * 10, 30], [d * 70, 30], [d * 40, 150], [d * 10, 120]], true), "red", { tone: 2 });
  return tl(-1) + tl(1) + L.shape(L.circ(0, 0, 100), "gold") + L.stroke(L.circ(0, 0, 76), { c: "gold", w: "detail" }) + txt("#" + (o.n === undefined ? 1 : o.n), 0, 0, { size: 96, c: "ink" }); },
  { box: [-140, -130, 280, 290], demo: { n: 1 }, opts: "n", tags: ["rank", "medal", "number", "first"] });

R("Numbers and charts", "progress-bar", "Progress bar", (o) => { const p = Math.max(0, Math.min(100, o.pct === undefined ? 65 : o.pct)), w = 600, h = 64;
  return L.text(o.text || "Loading", -w / 2, -h / 2 - 22, { size: 44, anchor: "start" }) + L.shape(L.rrect(-w / 2, -h / 2, w, h, 32), "white", { flat: true }) +
    (p > 4 ? L.shape(L.rrect(-w / 2, -h / 2, (w * p) / 100, h, 32), o.c || "green", { flat: true }) : "") + L.text(p + "%", w / 2 - 24, 16, { size: 40, anchor: "end" }); },
  { box: [-340, -110, 680, 220], demo: { text: "Loading", pct: 65 }, opts: "text, pct, c", tags: ["progress", "bar", "percent"] });

const COLS = ["blue", "orange", "green", "red", "purple", "teal"];
R("Numbers and charts", "chart-bar", "Chart · bars", (o) => { const d = o.data || [3, 5, 8, 6, 10], lab = o.labels || ["A", "B", "C", "D", "E"], mx = Math.max(...d), bw = 70, gap = 30, w = d.length * bw + (d.length - 1) * gap, base = 150, H = 270;
  let s = L.stroke(L.line([-w / 2 - 30, base], [w / 2 + 30, base]), { c: "ink", w: "prop" });
  d.forEach((v, i) => { const x = -w / 2 + i * (bw + gap), h = (v / mx) * H; s += L.shape(L.rrect(x, base - h, bw, h, 12), COLS[i % COLS.length]) + txt(lab[i] || "", x + bw / 2, base + 36, { size: 34 }) + txt(String(v), x + bw / 2, base - h - 26, { size: 32 }); });
  return s; },
  { box: [-300, -170, 600, 400], demo: { data: [3, 5, 8, 6, 10], labels: ["A", "B", "C", "D", "E"] }, opts: "data: [..], labels: [..]", tags: ["chart", "bar", "graph", "data"] });

R("Numbers and charts", "chart-pie", "Chart · pie", (o) => { const d = o.data || [40, 25, 20, 15], tot = d.reduce((a, b) => a + b, 0), r = 150; let a0 = -90, s = "";
  d.forEach((v, i) => { const a1 = a0 + (v / tot) * 360, am = ((a0 + a1) / 2) * Math.PI / 180, ex = i === 0 ? 16 : 0, ox = Math.cos(am) * ex, oy = Math.sin(am) * ex, p = (a) => [Math.cos((a * Math.PI) / 180) * r, Math.sin((a * Math.PI) / 180) * r];
    const [x0, y0] = p(a0), [x1, y1] = p(a1);
    s += L.g(L.shape(`M0 0 L${f1(x0)} ${f1(y0)} A${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${f1(x1)} ${f1(y1)} Z`, COLS[i % COLS.length]) + (v / tot > 0.08 ? txt(Math.round((v / tot) * 100) + "%", Math.cos(am) * r * 0.62, Math.sin(am) * r * 0.62, { size: 38, c: "white", halo: "ink", haloW: 0.14 }) : ""), `translate(${f1(ox)} ${f1(oy)})`);
    a0 = a1; });
  return s; },
  { box: [-200, -190, 400, 380], demo: { data: [40, 25, 20, 15] }, opts: "data: [..]", tags: ["chart", "pie", "graph", "data", "percent"] });

R("Numbers and charts", "chart-line", "Chart · line", (o) => { const d = o.data || [2, 3, 2.6, 5, 4.4, 7, 9], mx = Math.max(...d), W = 520, H = 280, x0 = -W / 2, y0 = 150;
  const pts = d.map((v, i) => [x0 + (i / (d.length - 1)) * W, y0 - (v / mx) * H]);
  return L.stroke(L.poly([[x0 - 20, y0 - H - 20], [x0 - 20, y0 + 10], [W / 2 + 20, y0 + 10]]), { c: "ink", w: "prop" }) + L.flat(L.poly([[x0, y0 + 10], ...pts, [W / 2, y0 + 10]], true), o.c || "blue", 0.18) +
    L.stroke(L.smooth(pts), { c: o.c || "blue", w: 12 }) + pts.map(([x, y]) => L.shape(L.circ(x, y, 13), "white", { w: "detail" })).join(""); },
  { box: [-330, -170, 660, 360], demo: { data: [2, 3, 2.6, 5, 4.4, 7, 9] }, opts: "data: [..], c", tags: ["chart", "line", "graph", "data", "trend"] });

R("Numbers and charts", "chart-gauge", "Chart · gauge dial", (o) => { const v = Math.max(0, Math.min(1, o.value === undefined ? 0.7 : o.value)), r = 150, a = ((180 + 180 * v) * Math.PI) / 180;
  const seg = (a0, a1, c) => L.stroke(L.arc(0, 0, r, a0, a1), { c, w: 44 });
  return seg(182, 238, "green") + seg(243, 297, "yellow") + seg(302, 358, "red") +
    L.shape(L.poly([[Math.cos(a) * r * 0.82, Math.sin(a) * r * 0.82], [Math.cos(a + 1.57) * 14, Math.sin(a + 1.57) * 14], [Math.cos(a - 1.57) * 14, Math.sin(a - 1.57) * 14]], true), "ink", { w: "detail" }) +
    L.shape(L.circ(0, 0, 26), "ink", { w: "detail" }) + txt(o.text || "", 0, 90, { size: 54 }); },
  { box: [-220, -200, 440, 360], demo: { value: 0.7, text: "Danger zone" }, opts: "value: 0..1, text", tags: ["chart", "gauge", "dial", "meter", "speedometer"] });

R("Numbers and charts", "chart-compare", "Chart · comparison bars", (o) => { const d = o.data || [["Before", 35], ["After", 80]], mx = Math.max(...d.map((x) => x[1])), W = 440;
  return d.map(([n, v], i) => { const y = -90 + i * 150, w = (v / mx) * W; return L.text(n, -320, y + 12, { size: 44, anchor: "start" }) + L.shape(L.rrect(-110, y - 45, w, 90, 22), COLS[i % 2 ? 1 : 0]) + txt(String(v), -110 + w - 16, y, { size: 48, c: "white", halo: "ink", haloW: 0.1 }).replace(/text-anchor="middle"/, 'text-anchor="end"'); }).join(""); },
  { box: [-340, -170, 700, 340], demo: { data: [["Before", 35], ["After", 80]] }, opts: "data: [[label, value], ..]", tags: ["chart", "compare", "bars", "versus"] });

R("Numbers and charts", "chart-before-after", "Chart · before / after split", (o) => {
  return L.shape(L.poly([[-400, -170], [30, -170], [-30, 170], [-400, 170]], true), "gray", { tone: 1 }) + L.shape(L.poly([[44, -170], [400, -170], [400, 170], [-16, 170]], true), o.c || "green") +
    txt(o.beforeLabel || "BEFORE", -215, -120, { size: 40, c: "ink", spacing: 4 }) + txt(o.afterLabel || "AFTER", 215, -120, { size: 40, c: "white", halo: "ink", haloW: 0.1, spacing: 4 }) +
    txt(o.before || "Tired", -190, 20, { size: 78 }) + txt(o.after || "Energy!", 205, 20, { size: 78, c: "white", halo: "ink", haloW: 0.1 }); },
  { box: [-420, -190, 840, 380], demo: { before: "Tired", after: "Energy!" }, opts: "before, after, beforeLabel, afterLabel, c", tags: ["chart", "before", "after", "split", "compare"], wide: true });

R("Numbers and charts", "checklist", "Checklist", (o) => { const it = o.items || ["Wake up", "Drink water", "Make the plan"], done = o.done || [true, true, false];
  return it.map((t, i) => { const y = (i - (it.length - 1) / 2) * 110; return L.shape(L.rrect(-260, y - 36, 72, 72, 16), "white", { w: "detail" }) + (done[i] ? L.stroke("M-246 " + (y + 2) + " L-228 " + (y + 22) + " L-200 " + (y - 22), { c: "green", w: 14 }) : "") +
    L.text(t, -160, y + 16, { size: 56, anchor: "start", c: done[i] ? "gray" : "ink" }) + (done[i] ? L.stroke(L.line([-166, y + 2], [-160 + tw(t, 56) + 6, y + 2]), { c: "gray", w: "detail" }) : ""); }).join(""); },
  { box: [-300, -200, 640, 400], demo: { items: ["Wake up", "Drink water", "Make the plan"], done: [true, true, false] }, opts: "items: [..], done: [bool..]", tags: ["checklist", "list", "todo", "tick"] });

R("Numbers and charts", "timeline", "Timeline", (o) => { const it = o.items || [["1969", "Moon"], ["1990", "Hubble"], ["2012", "Rover"], ["2030", "Mars?"]], W = 780, x0 = -W / 2;
  let s = L.stroke(L.line([x0 - 30, 0], [W / 2 + 30, 0]), { c: "ink", w: "prop" }) + L.shape(tri([W / 2 - 10, 0], [W / 2 + 40, 0], 40), "ink", { w: "detail" });
  it.forEach(([y, t], i) => { const x = x0 + (i / (it.length - 1)) * W, up = i % 2 === 0; s += L.stroke(L.line([x, 0], [x, up ? -60 : 60]), { c: "ink", w: "detail" }) + L.shape(L.circ(x, 0, 20), COLS[i % COLS.length]) + txt(y, x, up ? -92 : 92, { size: 50 }) + txt(t, x, up ? -150 : 150, { size: 38, c: "gray" }); });
  return s; },
  { box: [-520, -200, 1040, 400], demo: { items: [["1969", "Moon"], ["1990", "Hubble"], ["2012", "Rover"], ["2030", "Mars?"]] }, opts: "items: [[when, what], ..]", tags: ["timeline", "history", "dates"], wide: true });

// ================= Arrows and marks =================
const AB = [-280, -130, 560, 260];
const block = (len, sh, hw, hl, both) => { const a = len / 2; const pts = both ? [[-a, 0], [-a + hl, -hw / 2], [-a + hl, -sh / 2], [a - hl, -sh / 2], [a - hl, -hw / 2], [a, 0], [a - hl, hw / 2], [a - hl, sh / 2], [-a + hl, sh / 2], [-a + hl, hw / 2]] : [[-a, -sh / 2], [a - hl, -sh / 2], [a - hl, -hw / 2], [a, 0], [a - hl, hw / 2], [a - hl, sh / 2], [-a, sh / 2]]; return L.poly(pts, true); };
R("Arrows and marks", "arrow-straight", "Arrow · straight block", (o) => L.shape(block(o.len || 420, 44, 110, 100), o.c || "red"), { box: AB, opts: "c, len, (rot)", tags: ["arrow", "point"] });
R("Arrows and marks", "arrow-double", "Arrow · double-headed", (o) => L.shape(block(o.len || 440, 40, 110, 90, true), o.c || "blue"), { box: AB, opts: "c, len", tags: ["arrow", "double", "both"] });
R("Arrows and marks", "arrow-curved", "Arrow · curved", (o) => { const pts = [[-200, 80], [-130, -10], [-10, -60], [120, -40], [200, 30]], c = o.c || "red";
  return inked(L.smooth(pts), c, 20) + L.shape(tri(pts[3], pts[4], 74), c); }, { box: AB, opts: "c", tags: ["arrow", "curve", "curved"] });
R("Arrows and marks", "arrow-hand", "Arrow · hand-drawn", (o) => { const r = L.rng(5), j = () => (r() - 0.5) * 12, c = o.c || "ink";
  const pts = [-200, -120, -40, 40, 120, 200].map((x, i) => [x + j(), 40 - i * 14 + Math.sin(i) * 14 + j()]), e = pts[5], h = (a) => [e[0] - Math.cos(a) * 62 + j(), e[1] - Math.sin(a) * 62 + j()];
  return L.stroke(L.smooth(pts), { c, w: 12 }) + L.stroke(L.poly([h(-0.35 - 0.55), e, h(-0.35 + 0.55)]), { c, w: 12 }); }, { box: AB, opts: "c", tags: ["arrow", "hand", "doodle", "sketch"] });
R("Arrows and marks", "arrow-circular", "Arrow · circular loop", (o) => { const c = o.c || "green", pts = L.arcPts(0, 0, 110, -60, 220, 24);
  return inked(L.smooth(pts), c, 22) + L.shape(tri(pts[pts.length - 3], pts[pts.length - 1], 80), c); }, { box: [-170, -170, 340, 340], opts: "c", tags: ["arrow", "circle", "loop", "repeat", "cycle", "refresh"] });
R("Arrows and marks", "arrow-trend", "Arrow · rising trend", (o) => { const c = o.c || "green", pts = [[-200, 100], [-110, 20], [-60, 60], [40, -40], [90, -10], [180, -100]];
  return inked(L.poly(pts), c, 22) + L.shape(tri(pts[4], pts[5], 80), c); }, { box: AB, opts: "c", tags: ["arrow", "growth", "up", "trend", "increase"] });

const MB = [-280, -170, 560, 340];
R("Arrows and marks", "mark-ring", "Mark · hand-drawn ring", (o) => { const r = L.rng(3), W = (o.w || 440) / 2, H = (o.h || 240) / 2;
  const pts = Array.from({ length: 31 }, (_, i) => { const a = ((i * 12 + 200) * Math.PI) / 180, k = 1 + (r() - 0.5) * 0.06 - (i > 28 ? 0.1 : 0) + (i / 30) * -0.06; return [Math.cos(a) * W * k, Math.sin(a) * H * k]; });
  return L.stroke(L.smooth(pts), { c: o.c || "red", w: 12 }); }, { box: MB, opts: "c, w, h", tags: ["circle", "ring", "highlight", "mark"] });
R("Arrows and marks", "mark-underline", "Mark · underline", (o) => { const w = o.w || 440, r = L.rng(8), j = () => (r() - 0.5) * 8, c = o.c || "red";
  return L.stroke(L.smooth([[-w / 2, 0 + j()], [-w / 6, -6 + j()], [w / 6, 4 + j()], [w / 2, -4 + j()]]), { c, w: 14 }) + L.stroke(L.smooth([[-w / 2 + 50, 36 + j()], [0, 30 + j()], [w / 2 - 70, 38 + j()]]), { c, w: 10 }); }, { box: [-280, -60, 560, 140], opts: "c, w", tags: ["underline", "mark", "highlight", "emphasis"] });
R("Arrows and marks", "mark-swipe", "Mark · marker swipe", (o) => { const w = o.w || 440, h = o.h || 110;
  return L.flat(L.poly([[-w / 2, -h / 2 + 8], [-w / 4, -h / 2 + 2], [w / 2, -h / 2], [w / 2 - 12, 0], [w / 2 - 4, h / 2], [0, h / 2 - 6], [-w / 2 + 8, h / 2 - 4], [-w / 2 - 6, 0]], true), o.c || "yellow", 0.7); }, { box: [-280, -90, 560, 180], opts: "c, w, h", tags: ["highlight", "marker", "swipe", "mark"] });
R("Arrows and marks", "mark-box", "Mark · hand-drawn box", (o) => { const w = (o.w || 440) / 2, h = (o.h || 240) / 2;
  return L.stroke(`M${-w - 14} ${-h + 5} L${w + 6} ${-h - 5} M${w - 4} ${-h - 14} L${w + 5} ${h + 10} M${w + 14} ${h - 4} L${-w - 8} ${h + 6} M${-w + 4} ${h + 14} L${-w - 5} ${-h - 10}`, { c: o.c || "red", w: 12 }); }, { box: MB, opts: "c, w, h", tags: ["box", "rectangle", "highlight", "mark"] });
R("Arrows and marks", "mark-check", "Mark · big tick", (o) => inked("M-90 10 L-30 72 L100 -72", o.c || "green", 40), { box: [-150, -130, 300, 260], opts: "c", tags: ["check", "tick", "yes", "correct", "mark"] });
R("Arrows and marks", "mark-cross", "Mark · big cross", (o) => inked("M-80 -80 L80 80 M80 -80 L-80 80", o.c || "red", 40), { box: [-150, -130, 300, 260], opts: "c", tags: ["cross", "x", "no", "wrong", "mark"] });

// ================= Stamps =================
const STB = [-300, -170, 600, 340];
const stamp = (def) => (o) => { const t = o.text || def.t, s = o.size || def.s || 110, c = o.c || def.c, rt = o.rot === undefined ? def.rot : o.rot; let b;
  if (def.shape === "circle") { const r = s * 1.05; b = L.flat(L.circ(0, 0, r), "white", 0.95) + L.stroke(L.circ(0, 0, r), { c, w: 12 }) + L.stroke(L.circ(0, 0, r - 18), { c, w: 4 }) + txt(t, 0, 0, { size: s * 1.2, c }); }
  else if (def.shape === "burst") { const n = 16, rr = L.rng(2), pts = Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2, k = i % 2 ? 0.8 : 1.1 + rr() * 0.06, w = tw(t, s) / 2 + 95; return [Math.cos(a) * w * k * 1.1, Math.sin(a) * s * 1.05 * k]; });
    b = L.shape(L.poly(pts, true), "yellow", { flat: true }) + txt(t, 0, 0, { size: s, c: "red", halo: "white", haloW: 0.16 }); }
  else { const w = tw(t, s) + 90, h = s * 1.45; b = L.flat(L.rrect(-w / 2, -h / 2, w, h, 22), "white", 0.95) + L.stroke(L.rrect(-w / 2, -h / 2, w, h, 22), { c, w: 12 }) + L.stroke(L.rrect(-w / 2 + 16, -h / 2 + 16, w - 32, h - 32, 12), { c, w: 4 }) + txt(t, 0, 0, { size: s, c }); }
  return rot(b, rt); };
[["stamp-qe", "?!", "Stamp · ?!", { t: "?!", c: "orange", shape: "circle", rot: -8, s: 100 }], ["stamp-wow", "WOW", "Stamp · WOW", { t: "WOW", shape: "burst", rot: -6, s: 100 }],
  ["stamp-nope", "NOPE", "Stamp · NOPE", { t: "NOPE", c: "red", rot: -8 }], ["stamp-fact", "FACT", "Stamp · FACT", { t: "FACT", c: "green", rot: -7 }],
  ["stamp-myth", "MYTH", "Stamp · MYTH", { t: "MYTH", c: "orange", rot: 7 }], ["stamp-true", "TRUE", "Stamp · TRUE", { t: "TRUE", c: "green", rot: -6 }],
  ["stamp-false", "FALSE", "Stamp · FALSE", { t: "FALSE", c: "red", rot: 6 }]].forEach(([n, t, lab, def]) => R("Stamps", n, lab, stamp(def), { box: STB, demo: {}, opts: 'text: "' + t + '", c, rot', tags: ["stamp", t.toLowerCase(), "label", "verdict"] }));

// ================= Thumbnail text =================
const TB = [-620, -150, 1240, 300];
R("Thumbnail text", "thumb-yellow", "Thumb · yellow, black halo", (o) => { const t = o.text || "WHAT IF?", s = o.size || 170;
  return txt(t, 8, 10, { size: s, c: "ink", halo: "ink", haloW: 0.3 }) + txt(t, 0, 0, { size: s, c: "yellow", halo: "ink", haloW: 0.3 }); },
  { box: TB, demo: { text: "WHAT IF?" }, opts: "text, size", tags: ["thumbnail", "yellow", "title", "halo"], wide: true });
R("Thumbnail text", "thumb-white-dark", "Thumb · white on dark", (o) => { const t = o.text || "IT GOT WORSE", s = o.size || 140;
  return txt(t, 0, 0, { size: s, c: "white", halo: "navy", haloW: 0.34 }) + txt(t, 0, 0, { size: s, c: "white", halo: "ink", haloW: 0.18 }); },
  { box: TB, demo: { text: "IT GOT WORSE" }, opts: "text, size", tags: ["thumbnail", "white", "title", "dark"], wide: true });
R("Thumbnail text", "thumb-red-box", "Thumb · white on red box", (o) => { const t = o.text || "DON'T DO THIS", s = o.size || 110, w = tw(t, s) + 100, h = s * 1.5;
  return rot(L.flat(L.rrect(-w / 2 + 10, -h / 2 + 12, w, h, 18), "ink", 0.5) + L.shape(L.rrect(-w / 2, -h / 2, w, h, 18), "red", { flat: true }) + txt(t, 0, 0, { size: s, c: "white" }), -3); },
  { box: TB, demo: { text: "DON'T DO THIS" }, opts: "text, size", tags: ["thumbnail", "red", "box", "warning"], wide: true });
R("Thumbnail text", "thumb-two-line", "Thumb · white over yellow", (o) => { const a = o.text || "YOU WON'T", b = o.sub || "BELIEVE THIS", s = o.size || 140;
  return txt(a, 0, -s * 0.5, { size: s * 0.72, c: "white", halo: "ink", haloW: 0.3 }) + txt(b, 0, s * 0.55, { size: s, c: "yellow", halo: "ink", haloW: 0.28 }); },
  { box: [-620, -170, 1240, 340], demo: { text: "YOU WON'T", sub: "BELIEVE THIS" }, opts: "text, sub, size", tags: ["thumbnail", "two line", "title"], wide: true });
R("Thumbnail text", "thumb-number", "Thumb · giant number", (o) => txt(String(o.value || "100"), 0, -10, { size: o.size || 300, c: o.c || "yellow", halo: "ink", haloW: 0.22 }) + txt(o.text || "DAYS LATER", 0, 150, { size: 90, c: "white", halo: "ink", haloW: 0.3 }),
  { box: [-460, -180, 920, 400], demo: { value: "100", text: "DAYS LATER" }, opts: "value, text, c", tags: ["thumbnail", "number", "title"], wide: true });
})();
