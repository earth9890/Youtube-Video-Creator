
// ===================== 6. Month one: air and salad =====================
const padlock2 = (S, cx, cy, k, t, parent) => { const g = S.grp(parent);
  S.draw(`M${cx - 36 * k} ${cy} V${cy - 50 * k} Q${cx - 36 * k} ${cy - 96 * k} ${cx} ${cy - 96 * k} Q${cx + 36 * k} ${cy - 96 * k} ${cx + 36 * k} ${cy - 50 * k} V${cy}`, t ?? S.start, 0, { c: DS.c("gray", 2), w: DS.w.near * 1.4, parent: g });
  DS.shape(S, rrect(cx - 56 * k, cy - 6 * k, 112 * k, 90 * k, DS.r.sm * k), "gold", { t, w: "near", parent: g }); S.fill(circ(cx, cy + 34 * k, 10 * k), t ?? S.start, 0, DS.P.ink[0], 1, g); return g; };
const bone = (S, cx, cy, k, t, o = {}) => { const g = S.grp(o.parent), nm = o.name || "paper";
  DS.shape(S, `M${cx - 150 * k} ${cy - 30 * k} Q${cx - 190 * k} ${cy - 50 * k} ${cx - 190 * k} ${cy - 10 * k} Q${cx - 220 * k} ${cy} ${cx - 190 * k} ${cy + 20 * k} Q${cx - 190 * k} ${cy + 56 * k} ${cx - 150 * k} ${cy + 34 * k} L${cx + 150 * k} ${cy + 34 * k} Q${cx + 190 * k} ${cy + 56 * k} ${cx + 190 * k} ${cy + 20 * k} Q${cx + 220 * k} ${cy} ${cx + 190 * k} ${cy - 10 * k} Q${cx + 190 * k} ${cy - 50 * k} ${cx + 150 * k} ${cy - 30 * k} Z`, nm, { t, tone: 1, w: "near", parent: g });
  for (let i = 0; i < (o.holes ?? 0); i++) S.fill(circ(cx - 120 * k + (i % 8) * 34 * k, cy - 6 * k + Math.floor(i / 8) * 22 * k, 6 * k), t ?? S.start, 0, DS.c("gray", 2), 0.7, g);
  return g; };
const bowl = (S, cx, cy, k, t, o = {}) => { const g = S.grp(o.parent);
  [[-70, -30, 70, "green"], [10, -50, 80, "green"], [80, -24, 64, "green"], [-20, -20, 60, "grass"]].forEach(([dx, dy, r, nm], i) => DS.shape(S, circ(cx + dx * k, cy + dy * k, r * k, r * 0.8 * k), nm, { t, tone: i % 2 ? 1 : 0, w: "mid", parent: g }));
  S.fill(circ(cx + 40 * k, cy - 70 * k, 24 * k), t ?? S.start, 0, DS.c("red"), 1, g); S.fill(circ(cx - 60 * k, cy - 54 * k, 20 * k), t ?? S.start, 0, DS.c("red"), 1, g);
  DS.shape(S, `M${cx - 170 * k} ${cy - 20 * k} H${cx + 170 * k} Q${cx + 150 * k} ${cy + 130 * k} ${cx} ${cy + 140 * k} Q${cx - 150 * k} ${cy + 130 * k} ${cx - 170 * k} ${cy - 20 * k} Z`, "white", { t, tone: 2, w: "near", parent: g });
  return g; };
const dna = (S, cx, cy, h, t, parent) => { const g = S.grp(parent), n = 14, pts = (ph) => Array.from({ length: n + 1 }, (_, i) => [cx + Math.sin(i * 0.9 + ph) * 90, cy - h / 2 + (i / n) * h]);
  for (let i = 0; i <= n; i++) { const a = pts(0)[i], b = pts(Math.PI)[i]; S.draw(line(a, b, 0), t ?? S.start, 0, { c: DS.c("gray", 1), w: DS.w.detail, parent: g }); }
  S.draw(smooth(pts(0)), t ?? S.start, 0, { c: DS.c("blue"), w: DS.w.near * 1.2, parent: g }); S.draw(smooth(pts(Math.PI)), t ?? S.start, 0, { c: DS.c("red"), w: DS.w.near * 1.2, parent: g }); return g; };
const shaker = (S, cx, gy, k, t, parent) => { const g = S.grp(parent);
  DS.shape(S, `M${cx - 50 * k} ${gy - 130 * k} H${cx + 50 * k} L${cx + 64 * k} ${gy} H${cx - 64 * k} Z`, "glass", { t, w: "mid", parent: g }); DS.shape(S, `M${cx - 50 * k} ${gy - 130 * k} Q${cx} ${gy - 190 * k} ${cx + 50 * k} ${gy - 130 * k} Z`, "gray", { t, w: "mid", parent: g });
  S.fill(`M${cx - 58 * k} ${gy - 60 * k} H${cx + 58 * k} L${cx + 64 * k} ${gy} H${cx - 64 * k} Z`, t ?? S.start, 0, DS.P.white[0], 1, g); [-18, 0, 18].forEach((dx) => S.fill(circ(cx + dx * k, gy - 150 * k, 4 * k), t ?? S.start, 0, DS.P.ink[0], 1, g)); return g; };
const nut = (S, cx, cy, k, t, parent) => { const g = S.grp(parent), pts = Array.from({ length: 6 }, (_, i) => [cx + Math.cos(i * Math.PI / 3) * 90 * k, cy + Math.sin(i * Math.PI / 3) * 90 * k]);
  DS.shape(S, poly(pts, 0) + " Z", "gray", { t, w: "near", parent: g }); S.draw(circ(cx, cy, 40 * k), t ?? S.start, 0, { fill: DS.c("gray", 2), c: DS.P.ink[0], w: DS.w.mid, parent: g }); return g; };
const plant = (S, x, gy, h, k, nm, t, o = {}) => { const g = S.grp(o.parent);
  S.draw(`M${x} ${gy} Q${x + 10 * k} ${gy - h / 2} ${x} ${gy - h}`, t ?? S.start, 0, { c: DS.c("green", 2), w: DS.w.near * k, parent: g });
  [[-1, 0.45], [1, 0.6], [-1, 0.78], [1, 0.95]].slice(0, o.leaves ?? 4).forEach(([sd, f]) => DS.shape(S, `M${x} ${gy - h * f} Q${x + sd * 70 * k} ${gy - h * f - 60 * k} ${x + sd * 110 * k} ${gy - h * f - 14 * k} Q${x + sd * 60 * k} ${gy - h * f + 24 * k} ${x} ${gy - h * f} Z`, nm, { t, tone: 1, w: "detail", parent: g }));
  return g; };
const roots = (S, x, gy, len, t, parent) => { const g = S.grp(parent);
  [[0, 1], [-40, 0.8], [40, 0.8], [-80, 0.5], [80, 0.5]].forEach(([dx, f]) => S.draw(smooth([[x, gy], [x + dx * 0.4, gy + len * f * 0.5], [x + dx, gy + len * f]]), t ?? S.start, 0, { c: DS.c("sand", 2), w: DS.w.mid, parent: g })); return g; };
const labRoom = { wall: "sand", floor: "wood", window: false };

// By the end of the first month, Dave needs more air.
{ const S = sc(44, 0, { cam: "push", focus: "960 640" }); lunar(S, { sun: [260, 170, 46] });
  card(S, "END OF THE FIRST MONTH", 760, 190, { t: W(44, 1), size: DS.type.small });
  const F = daveM(S, 600, 940, "near", { s: 1.4, look: 5, mood: "worried", pose: "hold" });
  dial(S, 1280, 640, 190, 50, -62, W(44, 6), { dur: 2.2 }); card(S, "AIR", 1280, 380, { t: W(44, 6), size: DS.type.title, tc: "red" });
  DS.vignette(S, 0.2); }

// The good news is, he's standing on it.
{ const S = sc(44, 11, { cam: "push", focus: "960 700" }); lunar(S, { sun: [260, 170, 46] });
  const F = daveM(S, 700, 940, "near", { s: 1.4, look: 0, mood: "happy", pose: "hips" });
  card(S, "AIR", 1200, 500, { t: W(44, 15), size: DS.type.title }); S.arrow(1200, 570, 1000, 880, W(44, 16), 0.5, { c: DS.c("yellow"), w: DS.w.near * 1.4, bend: 0.2 });
  DS.vignette(S, 0.2); }

// By weight, Moon soil is about forty to forty-five percent oxygen.
{ const S = sc(45, 0, { cam: "push", focus: "960 540" }); space(S);
  const cx = 960, cy = 560, r = 280, a0 = -Math.PI / 2, a1 = a0 + 0.425 * Math.PI * 2;
  DS.shape(S, circ(cx, cy, r), "gray", { w: "near" });
  const sec = DS.shape(S, `M${cx} ${cy} L${cx} ${cy - r} A${r} ${r} 0 0 1 ${cx + Math.cos(a1) * r} ${cy + Math.sin(a1) * r} Z`, "sky", { w: "near" }); fadeG(S, sec, W(45, 5));
  card(S, "OXYGEN", 1280, 460, { t: W(45, 5), size: DS.type.body }); card(S, "40-45%", 1280, 600, { t: W(45, 6), size: DS.type.title, tc: "red" });
  card(S, "OF MOON SOIL, BY WEIGHT", 960, 190, { t: W(45, 2), size: DS.type.small });
  DS.vignette(S, 0.2); }

// It's just locked inside the minerals.
{ const S = sc(45, 11, { cam: "push", focus: "960 600" }); space(S);
  const cx = 900, cy = 620; DS.shape(S, poly(Array.from({ length: 6 }, (_, i) => [cx + Math.cos(i * Math.PI / 3 + 0.3) * 300, cy + Math.sin(i * Math.PI / 3 + 0.3) * 270]), 0) + " Z", "gray", { w: "near" });
  [[-110, -90], [90, -110], [140, 40], [-30, 30], [-170, 80], [30, 150], [-70, 160]].forEach(([dx, dy], i) => { const gg = S.grp(); S.fill(circ(cx + dx, cy + dy, 40), S.start, 0, DS.c("sky"), 1, gg); S.draw(circ(cx + dx, cy + dy, 40), S.start, 0, { c: DS.P.ink[0], w: DS.w.mid, parent: gg }); S.text("O", cx + dx, cy + dy + 15, { size: DS.type.small, t: S.start, c: DS.P.ink[0], parent: gg }); fadeG(S, gg, W(45, 12) + i * 0.1); });
  const pl = padlock2(S, 1200, 520, 1.6, W(45, 13)); fadeG(S, pl, W(45, 13));
  card(S, "LOCKED INSIDE THE MINERALS", 960, 170, { t: W(45, 12), size: DS.type.small });
  DS.vignette(S, 0.2); }

// In twenty nineteen, a team in Glasgow, working with the European Space Agency,
{ const S = sc(46, 0, { cam: "push", focus: "700 600" }); DS.room(S, labRoom);
  const F = sci2(S, 520, 960, "near", { s: 1.4, look: 5, mood: "smile", pose: "hips" });
  card(S, "2019", 960, 190, { t: W(46, 1), size: DS.type.title }); card(S, "GLASGOW TEAM", 520, 380, { t: W(46, 5), size: DS.type.small });
  const sp = who(S, 1000, 960, "near", { s: 1.4, hair: "short", hairC: DS.c("gray", 1), outfitC: DS.c("navy"), look: -5, mood: "smile", pose: "hips" });
  card(S, "EUROPEAN SPACE AGENCY", 1250, 380, { t: W(46, 8), size: DS.type.small });
  DS.vignette(S, 0.2); }

// ... cooked fake Moon soil in molten salt and ran a current through it.
{ const S = sc(46, 12, { cam: "push", focus: "960 640" }); DS.room(S, labRoom);
  const px = 960, py = 780; DS.shape(S, `M${px - 260} ${py - 120} H${px + 260} Q${px + 240} ${py + 120} ${px} ${py + 130} Q${px - 240} ${py + 120} ${px - 260} ${py - 120} Z`, "gray", { tone: 2, w: "near" });
  const mol = S.grp(); S.fill(`M${px - 244} ${py - 100} H${px + 244} Q${px + 226} ${py + 100} ${px} ${py + 112} Q${px - 226} ${py + 100} ${px - 244} ${py - 100} Z`, S.start, 0, DS.c("orange"), 1, mol); S.draw(`M${px - 244} ${py - 100} Q${px - 120} ${py - 124} ${px} ${py - 100} T${px + 244} ${py - 100}`, S.start, 0, { c: DS.c("yellow"), w: DS.w.near, parent: mol });
  const so = S.grp(); DS.shape(S, rrect(px - 90, py - 60, 180, 120, DS.r.sm), "gray", { w: "near", parent: so }); for (let i = 0; i < 10; i++) S.fill(circ(px - 70 + (i % 5) * 34, py - 30 + Math.floor(i / 5) * 40, 8), S.start, 0, DS.c("gray", 2), 1, so); fadeG(S, so, W(46, 13));
  card(S, "FAKE MOON SOIL", 420, 660, { t: W(46, 13), size: DS.type.small }); card(S, "MOLTEN SALT", 1500, 660, { t: W(46, 17), size: DS.type.small });
  const el1 = S.grp(); S.draw(`M${px - 130} ${py - 300} V${py - 20}`, S.start, 0, { c: DS.c("gray", 2), w: DS.w.near * 1.6, parent: el1 }); S.draw(`M${px + 130} ${py - 300} V${py - 20}`, S.start, 0, { c: DS.c("gray", 2), w: DS.w.near * 1.6, parent: el1 }); S.draw(`M${px - 130} ${py - 300} V${py - 420} H${px - 330} M${px + 130} ${py - 300} V${py - 420} H${px + 330}`, S.start, 0, { c: DS.P.ink[0], w: DS.w.near, parent: el1 });
  DS.shape(S, rrect(px - 330, py - 480, 140, 100, DS.r.sm), "yellow", { w: "near", parent: el1 }); DS.shape(S, rrect(px + 190, py - 480, 140, 100, DS.r.sm), "gray", { w: "near", parent: el1 }); fadeG(S, el1, W(46, 20));
  const bb = S.grp(); for (let i = 0; i < 7; i++) { const b = S.draw(circ(px - 90 + (i % 4) * 60, py - 40, 12), S.start, 0, { c: DS.c("sky", 2), w: DS.w.detail, fill: DS.c("sky", 1), parent: bb }); tl.fromTo(b, { y: 0 }, { y: -220 - (i % 3) * 30, duration: 2.4, ease: "none", repeat: 5 }, W(46, 21) + i * 0.35); } fadeG(S, bb, W(46, 21));
  card(S, "A CURRENT", 960, 190, { t: W(46, 20), size: DS.type.small });
  DS.vignette(S, 0.2); }

// In fifty hours, they pulled out ninety-six percent of its oxygen.
{ const S = sc(47, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM2);
  const ck = S.clock(480, 500, 150, W(47, 1), 0.01, { h: 12, m: 0 }); ck.spin && ck.spin(W(47, 1), WE(47, 2) - W(47, 1), 6);
  card(S, "50 HOURS", 480, 760, { t: W(47, 1), size: DS.type.title });
  DS.shape(S, rrect(820, 440, 900, 130, DS.r.md), "white", { flat: true, w: "near" });
  const fl = S.grp(); S.fill(rrect(832, 452, 876, 106, DS.r.sm), S.start, 0, DS.c("sky"), 1, fl); growX(fl, W(47, 6), 832, 505, WE(47, 7) - W(47, 6), "power1.inOut");
  countUp(S, 1270, 380, 0, 96, W(47, 6), WE(47, 7) - W(47, 6), { size: DS.type.title, c: DS.c("red", 2), fmt: (n) => Math.round(n) + " %", ease: "power1.inOut" });
  card(S, "OF ITS OXYGEN", 1270, 680, { t: W(47, 8), size: DS.type.small });
  DS.vignette(S, 0.2); }

// "Air from rocks. Brilliant. Now, what's for dinner?"
{ const S = sc(48, 0, { cam: "push", focus: "800 600" }); lunar(S, { sun: [260, 170, 46] });
  const F = dave(S, 620, 960, "near", { s: 1.5, look: 5, mood: "happy", pose: "armsUp" }); talk(S, F, W(48, 0), END(48));
  mound(S, 980, 960, 300, 200, "gray", undefined); const bb = S.grp(); for (let i = 0; i < 4; i++) { const b = S.draw(circ(960 + (i - 1.5) * 50, 740, 18), S.start, 0, { c: DS.c("sky", 2), w: DS.w.detail, fill: DS.c("sky", 1), parent: bb }); tl.fromTo(b, { y: 0 }, { y: -160, duration: 2.0, ease: "none", repeat: 3 }, S.start + i * 0.4); }
  const sb = say(S, 1330, 350, 420, 220, 800, 520, ["AIR FROM ROCKS.", "BRILLIANT. NOW,", "WHAT'S FOR", "DINNER?"], W(48, 0), { size: DS.type.caption }); tl.to(sb, { opacity: 0, duration: 0.4 }, W(49, 0));
  const pl = S.grp(); S.draw(circ(1500, 840, 110, 36), S.start, 0, { fill: DS.P.white[0], c: DS.P.ink[0], w: DS.w.near, parent: pl }); S.draw(circ(1500, 836, 70, 20), S.start, 0, { c: DS.c("gray", 1), w: DS.w.detail, parent: pl });
  S.draw(`M1330 790 V890 M1318 790 v30 M1330 790 v30 M1342 790 v30`, S.start, 0, { c: DS.c("gray", 2), w: DS.w.near, parent: pl }); S.draw(`M1670 790 V890 M1670 790 Q1700 820 1670 850`, S.start, 0, { c: DS.c("gray", 2), w: DS.w.near, parent: pl }); fadeG(S, pl, W(48, 5)); tl.to(pl, { opacity: 0, duration: 0.4 }, W(49, 0));
  F.setPose(W(49, 0), "reach");
  ITEM.seeds(S, 1480, 600, 2.4, { t: W(49, 0) }); card(S, "SEEDS", 1480, 330, { t: W(49, 1), size: DS.type.title });
  for (let i = 0; i < 6; i++) { const sd = S.fill(circ(1470 + i * 14, 790, 9, 6), W(49, 2), 0, DS.c("brown"), 1); tl.fromTo(sd, { y: -120 }, { y: 70 + (i % 3) * 14, duration: 0.7, ease: "power2.in" }, W(49, 2) + i * 0.1); }
  DS.vignette(S, 0.2); }

// In twenty twenty-two, a University of Florida team tried that on Earth, with just twelve grams of real Apollo soil.
{ const S = sc(49, 4, { cam: "push", focus: "960 600" }); DS.room(S, labRoom);
  sci(S, 420, 960, "near", { s: 1.4, look: 5, mood: "smile", pose: "point" });
  card(S, "2022", 960, 190, { t: W(49, 5), size: DS.type.title }); card(S, "FLORIDA TEAM", 420, 380, { t: W(49, 8), size: DS.type.small });
  const sg = S.grp(); DS.shape(S, rrect(1020, 700, 520, 220, DS.r.md), "gray", { tone: 1, w: "near", parent: sg }); DS.shape(S, rrect(1100, 730, 360, 100, DS.r.sm), "ink", { tone: 1, flat: true, w: "detail", parent: sg });
  const dg = countUp(S, 1280, 805, 0, 12, W(49, 18), WE(49, 19) - W(49, 18), { size: DS.type.title, c: DS.c("green", 1), fmt: (n) => Math.round(n) + " g", ease: "none", parent: sg }); fadeG(S, sg, W(49, 15));
  mound(S, 1280, 700, 120, 46, "gray", W(49, 16));
  card(S, "REAL APOLLO SOIL", 1280, 480, { t: W(49, 20), size: DS.type.small });
  DS.vignette(S, 0.2); }

// They planted thale cress, a small weed from the mustard family.
{ const S = sc(50, 0, { cam: "push", focus: "960 600" }); DS.room(S, labRoom);
  pot(S, 640, 900, 2.0, S.start); const sg = sprout(S, 640, 708, 2.0, W(50, 1)); scaleY(sg, W(50, 1), 640, 708, 1.0, 0.05);
  card(S, "THALE CRESS", 640, 190, { t: W(50, 2), size: DS.type.title }); card(S, "A SMALL WEED", 640, 330, { t: W(50, 4), size: DS.type.small });
  const fl = S.grp(); S.draw(`M1300 900 Q1310 700 1300 540`, W(50, 8), 0, { c: DS.c("green", 2), w: DS.w.near * 1.4, parent: fl });
  [[1300, 520], [1240, 600], [1360, 640]].forEach(([x, y], i) => { [0, 1, 2, 3].forEach((a) => DS.shape(S, circ(x + Math.cos(a * Math.PI / 2) * 40, y + Math.sin(a * Math.PI / 2) * 40, 32, 32), "yellow", { w: "detail", parent: fl })); S.fill(circ(x, y, 12), S.start, 0, DS.c("orange"), 1, fl); }); fadeG(S, fl, W(50, 8));
  card(S, "MUSTARD FAMILY", 1300, 190, { t: W(50, 8), size: DS.type.small });
  DS.vignette(S, 0.2); }

// After two days, everything sprouted.
{ const S = sc(51, 0, { cam: "push", focus: "960 640" }); DS.room(S, labRoom);
  for (let i = 0; i < 6; i++) { const x = 330 + i * 250; pot(S, x, 880, 1.3, S.start); const sg = sprout(S, x, 755, 1.3, W(51, 3) + i * 0.2); scaleY(sg, W(51, 3) + i * 0.2, x, 755, 0.8, 0.05); }
  card(S, "DAY 2", 700, 190, { t: W(51, 1), size: DS.type.title }); card(S, "EVERYTHING SPROUTED", 1300, 190, { t: W(51, 3), size: DS.type.small });
  DS.vignette(S, 0.2); }

// After about day six, the Moon plants fell behind: slower, with stunted roots, and some turned reddish.
{ const S = sc(51, 5, { cam: "push", focus: "960 640" }); DS.room(S, labRoom);
  const X = [520, 1400], gy = 660;
  X.forEach((x, i) => { panel(S, x, 560, 720, 780, S.start); S.fill(rect(x - 340, gy, 680, 240), S.start, 0, DS.c("brown", 1), 1); S.draw(line([x - 340, gy], [x + 340, gy], 0), S.start, 0, { c: DS.P.ink[0], w: DS.w.near }); });
  const gL = plant(S, X[0], gy, 330, 1.2, "green", W(51, 6)); roots(S, X[0], gy, 190, W(51, 6)); fadeG(S, gL, W(51, 6));
  const gR = plant(S, X[1], gy, 150, 0.9, "red", W(51, 11), { leaves: 2 }); roots(S, X[1], gy, 60, W(51, 15)); fadeG(S, gR, W(51, 11));
  card(S, "DAY 6", 960, 160, { t: W(51, 5), size: DS.type.title }); card(S, "NORMAL SOIL", X[0], 250, { t: W(51, 6), size: DS.type.small }); card(S, "MOON SOIL", X[1], 250, { t: W(51, 10), size: DS.type.small });
  card(S, "STUNTED ROOTS", X[1], 830, { t: W(51, 15), size: DS.type.caption }); card(S, "REDDISH", X[1] + 230, 520, { t: W(51, 19), size: DS.type.caption, tc: "red" });
  DS.vignette(S, 0.2); }

// Their genes showed the same stress as plants grown in too much salt or metal.
{ const S = sc(52, 0, { cam: "push", focus: "960 600" }); DS.room(S, ROOM2);
  const dn = dna(S, 960, 560, 560, S.start); card(S, "GENES SHOW STRESS", 960, 190, { t: W(52, 1), size: DS.type.small });
  const a = S.grp(); shaker(S, 380, 800, 1.5, undefined, a); fadeG(S, a, W(52, 8)); card(S, "TOO MUCH SALT", 380, 870, { t: W(52, 9), size: DS.type.caption });
  const b = S.grp(); nut(S, 1540, 700, 1.3, undefined, b); fadeG(S, b, W(52, 12)); card(S, "TOO MUCH METAL", 1540, 870, { t: W(52, 13), size: DS.type.caption });
  txt(S, "=", 660, 700, { size: DS.type.display, t: W(52, 8) }); txt(S, "=", 1260, 700, { size: DS.type.display, t: W(52, 12) });
  DS.vignette(S, 0.2); }

// So you can grow a salad on the Moon. It just won't be a happy salad.
{ const S = sc(53, 0, { cam: "push", focus: "960 640" }); lunar(S, { sun: [260, 170, 46] });
  plist(S, { crossed: [0, 1, 2, 3], cross: [[4, W(53, 12)]], t: W(53, 9) });
  const F = daveM(S, 620, 940, "near", { s: 1.4, look: 6, mood: "happy", pose: "hips" }); F.face(W(53, 9), "flat", 6); F.setPose(W(53, 10), "shrug");
  const bw = bowl(S, 1220, 760, 1.6, undefined); fadeG(S, bw, W(53, 4));
  const sd = S.grp(); S.fill(circ(1180, 820, 14), S.start, 0, DS.P.ink[0], 1, sd); S.fill(circ(1270, 820, 14), S.start, 0, DS.P.ink[0], 1, sd); S.draw(`M1170 900 Q1225 860 1280 900`, S.start, 0, { c: DS.P.ink[0], w: DS.w.near, parent: sd }); fadeG(S, sd, W(53, 10));
  const c1 = card(S, "A SALAD ON THE MOON", 960, 190, { t: W(53, 4), size: DS.type.body }); S.hide(c1.g, W(53, 9));
  card(S, "NOT A HAPPY SALAD", 1220, 430, { t: W(53, 11), size: DS.type.body });
  DS.vignette(S, 0.2); }

// In orbit, astronauts' bones lose about one to one and a half percent of their density a month.
{ const S = sc(54, 0, { cam: "push", focus: "960 600" }); space(S, { milky: [200, 900, 1700, 120] });
  earth(S, 960, 1380, 700);
  const A = astro(S, 640, 700, "near", { s: 1.2, look: 5, mood: "flat", pose: "armsUp", float: true });
  tl.fromTo(A.g, { y: 0 }, { y: -26, duration: 2.4, ease: "sine.inOut", yoyo: true, repeat: 6 }, S.start);
  const bn = bone(S, 1290, 560, 1.4, undefined, { holes: 0 }); fadeG(S, bn, W(54, 3));
  const dn = S.grp(); for (let i = 0; i < 16; i++) S.fill(circ(1290 - 220 + (i % 8) * 62, 540 + Math.floor(i / 8) * 44, 8, 8), S.start, 0, DS.c("gray", 2), 0.8, dn); fadeG(S, dn, W(54, 12)); tl.fromTo(dn, { opacity: 0 }, { opacity: 0.9, duration: 2 }, W(54, 12));
  card(S, "IN ORBIT", 960, 160, { t: W(54, 1), size: DS.type.body }); card(S, "LOSE 1 TO 1.5% A MONTH", 1290, 800, { t: W(54, 5), size: DS.type.small, tc: "red" });
  DS.vignette(S, 0.2); }

// Whether one sixth of Earth's gravity helps, nobody knows yet.
{ const S = sc(54, 18, { cam: "push", focus: "960 640" }); lunar(S, { sun: [260, 170, 46] });
  daveM(S, 620, 940, "near", { s: 1.4, look: 6, mood: "worried", pose: "shrug" });
  bone(S, 1280, 700, 1.1, undefined); txt(S, "?", 1280, 620, { size: DS.type.display, c: DS.c("red", 2), t: W(54, 24) });
  card(S, "1/6 GRAVITY: DOES IT HELP?", 800, 190, { t: W(54, 19), size: DS.type.body }); card(S, "NOBODY KNOWS YET", 1280, 900, { t: W(54, 25), size: DS.type.small, tc: "red" });
  DS.vignette(S, 0.2); }
