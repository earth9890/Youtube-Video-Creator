
// ===================== 6. Nearly blind =====================
// By evening, Dave wants to go home. He can't see where home is.
{ const S = sc(58, 0, { cam: "push", focus: "1000 640" }); garden(S, DS.outdoor(S, GARD.dusk));
  const hg = S.grp(); house(S, 1480, 590, 0.9, { layer: "far", parent: hg }); blurry(hg, 9);
  const F = tiny(S, 760, 940, { s: 1.2, look: 7, mood: "worried", pose: "reach" });
  card(S, "BY EVENING", 960, 190, { t: W(58, 1), size: DS.type.small });
  card(S, "HOME?", 1480, 330, { t: W(58, 9), tc: "red", size: DS.type.title });
  DS.vignette(S); }

// The shrink ray made his eyes three hundred and fifty times smaller. But it didn't shrink light.
{ const S = sc(59, 0, { cam: "push", focus: "960 540" }); DS.room(S, { wall: "sand", floor: "wood", window: false });
  panel(S, 960, 540, 1700, 700, T0(S));
  eyeball(S, 1200, 540, 2.0, { dash: true }); const e = eyeball(S, 1200, 540, 0.34, {}); 
  const L = S.grp(); [0, 1, 2].forEach((i) => S.draw(smooth(Array.from({ length: 24 }, (_, j) => [260 + j * 28, 420 + i * 120 + Math.sin(j * 0.9) * 30])), S.start, 0, { c: DS.c("blue", 0), w: DS.w.mid, parent: L })); fadeG(S, L, W(59, 12), 0.6);
  card(S, "EYES 350× SMALLER", 1200, 270, { t: W(59, 6), size: DS.type.small });
  card(S, "LIGHT: SAME SIZE", 560, 780, { t: W(59, 14), tc: "blue", size: DS.type.small });
  DS.vignette(S); }

// Each of his pupils is now only about fifteen light waves across. Squeeze light through a hole that small, and it spreads out and smears.
{ const S = sc(60, 0, { cam: "push", focus: "960 540" }); DS.room(S, { wall: "sand", floor: "wood", window: false });
  panel(S, 960, 540, 1700, 760, T0(S));
  const g = S.grp(); [0, 1, 2, 3, 4, 5].forEach((i) => S.draw(smooth(Array.from({ length: 9 }, (_, j) => [300 + i * 90 + Math.sin(j * 1.2) * 10, 220 + j * 90])), S.start, 0, { c: DS.c("blue", 0), w: DS.w.mid, parent: g })); fadeG(S, g, W(60, 12), 0.5);
  DS.shape(S, rect(850, 200, 70, 270), "gray", { w: "near", flat: true, tone: 2 }); DS.shape(S, rect(850, 610, 70, 270), "gray", { w: "near", flat: true, tone: 2 });
  const f = S.grp(); [150, 250, 350, 450, 550].forEach((r) => S.draw(arc(920, 540, r, -62, 62), S.start, 0, { c: DS.c("blue", 0), w: DS.w.mid, parent: f })); fadeG(S, f, W(60, 19), 0.8);
  S.draw(`M970 470 V610 M950 490 L970 462 L990 490 M950 590 L970 618 L990 590`, W(60, 3), 0, { c: DS.c("red", 0), w: DS.w.near });
  card(S, "PUPIL: ~15 LIGHT WAVES", 960, 150, { t: W(60, 3), size: DS.type.small });
  card(S, "SPREADS AND SMEARS", 1420, 880, { t: W(60, 19), tc: "red", size: DS.type.small });
  DS.vignette(S); }

// It's called diffraction, and it makes Dave's whole world hundreds of times blurrier.
{ const S = sc(61, 0, { cam: "push", focus: "960 540" }); DS.room(S, { wall: "sand", floor: "wood", window: false });
  const view = (cx, parent) => { S.draw(rrect(cx - 400, 230, 800, 620, DS.r.md), S.start, 0, { fill: DS.vgrad(DS.c("sky", 1), DS.c("grass", 1)), c: DS.P.ink[0], w: DS.w.near, parent }); S.fill(rect(cx - 396, 620, 792, 226), S.start, 0, DS.c("grass", 0), 1, parent); house(S, cx - 170, 640, 0.8, { parent }); const a = ant(S, cx + 100, 780, 1.0, { face: "smile", parent }); S.draw(`M${cx + 300} 780 V700`, S.start, 0, { c: DS.c("green", 2), w: DS.w.near, parent }); S.fill(circ(cx + 300, 690, 34), S.start, 0, DS.c("red", 0), 1, parent); };
  view(500, undefined); const bl = S.grp(); view(1420, bl); blurry(bl, 12); fadeG(S, bl, W(61, 4), 0.6);
  card(S, "SHARP", 500, 150, { t: W(61, 2), size: DS.type.small }); card(S, "DAVE'S VIEW", 1420, 150, { t: W(61, 4), size: DS.type.small });
  card(S, "HUNDREDS OF TIMES BLURRIER", 960, 920, { t: W(61, 9), tc: "red", size: DS.type.caption });
  DS.vignette(S); }

// That's why he walked off the table this morning. To tiny Dave, the edge was just more blur.
{ const S = sc(62, 0, { cam: "push", focus: "1000 640" }); const R = DS.room(S, TBL2); const eg = tableEdge(S, R); blurry(eg, 9);
  const F = dave(S, 900, 640, "near", { s: 0.8, look: 6, mood: "flat", pose: "stand", float: true, ...HOLD }); const rg = S.grp(); riceUp(S, F, 1.1, rg);
  card(S, "THE EDGE", 1180, 520, { t: W(62, 12), size: DS.type.caption });
  card(S, "JUST MORE BLUR", 1450, 330, { t: W(62, 14), tc: "red", size: DS.type.small });
  DS.vignette(S); }

// Haldane wrote that even a mouse could not tell one human face from another six feet away. And Dave's eyes are far smaller than a mouse's.
{ const S = sc(63, 0, { cam: "push", focus: "960 600" }); garden(S, DS.outdoor(S, GARD.morning), { blades: false });
  rodent(S, 420, 940, 1.5, {});
  const fg = S.grp(); [[1250, "brown"], [1520, "yellow"]].forEach(([x, hc]) => { S.draw(circ(x, 640, 110), S.start, 0, { fill: DS.P.paper[0], c: DS.P.ink[0], w: DS.w.near, parent: fg }); S.draw(`M${x - 114} 630 Q${x} 470 ${x + 114} 630 Q${x} 560 ${x - 114} 630 Z`, S.start, 0, { fill: DS.c(hc, 0), c: DS.P.ink[0], w: DS.w.mid, parent: fg }); S.fill(circ(x - 36, 650, 10), S.start, 0, DS.P.ink[0], 1, fg); S.fill(circ(x + 36, 650, 10), S.start, 0, DS.P.ink[0], 1, fg); S.draw(`M${x - 40} 700 Q${x} 730 ${x + 40} 700`, S.start, 0, { c: DS.P.ink[0], w: DS.w.mid, parent: fg }); }); blurry(fg, 7); fadeG(S, fg, W(63, 9), 0.5);
  S.draw(`M560 880 H1180 M580 860 L548 880 L580 900 M1160 860 L1192 880 L1160 900`, W(63, 14), 0, { c: DS.c("red", 0), w: DS.w.near });
  card(S, "6 FEET", 870, 800, { t: W(63, 14), tc: "red", size: DS.type.small });
  card(S, "A MOUSE CAN'T TELL", 960, 190, { t: W(63, 6), size: DS.type.small });
  card(S, "DAVE'S EYES: SMALLER", 960, 330, { t: W(63, 18), size: DS.type.caption });
  DS.vignette(S); }

// Insects use compound eyes, made of many tiny lenses, each catching one dot of the picture. It's still a blurry picture.
{ const S = sc(64, 0, { cam: "push", focus: "960 540" }); DS.room(S, { wall: "sand", floor: "wood", window: false });
  panel(S, 960, 540, 1700, 700, T0(S));
  const g = S.grp(); DS.shape(S, circ(560, 540, 230), "ink", { w: "near", parent: g, tone: 1, flat: true }); const hx = S.grp(g); clipTo(hx, circ(560, 540, 224));
  for (let r = -8; r <= 8; r++) for (let c = -8; c <= 8; c++) { const x = 560 + c * 40 + (r % 2) * 20, y = 540 + r * 35, a = []; for (let i = 0; i < 6; i++) { const t = (i / 6) * Math.PI * 2 + Math.PI / 6; a.push([x + Math.cos(t) * 21, y + Math.sin(t) * 21]); } S.draw(poly(a, 0) + " Z", S.start, 0, { fill: DS.c("blue", (r + c) % 2 ? 1 : 0), c: DS.c("blue", 2), w: DS.w.hair, parent: hx }); }
  fadeG(S, g, W(64, 2), 0.5);
  const m = S.grp(); const pic = ["gggggggg", "gggrrggg", "ggrrrrgg", "gggrrggg", "ggggsggg", "ggggsggg"]; pic.forEach((row, j) => [...row].forEach((ch, i) => S.draw(rect(1120 + i * 70, 340 + j * 70, 70, 70), S.start, 0, { fill: DS.c(ch === "g" ? "grass" : ch === "r" ? "red" : "green", ch === "g" ? 1 : 0), c: DS.c("gray", 1), w: DS.w.hair, parent: m }))); fadeG(S, m, W(64, 11), 0.6);
  card(S, "COMPOUND EYE", 560, 190, { t: W(64, 2), size: DS.type.small }); card(S, "ONE DOT PER LENS", 1400, 250, { t: W(64, 9), size: DS.type.caption }); card(S, "STILL BLURRY", 1400, 870, { t: W(64, 16), tc: "red", size: DS.type.small });
  DS.vignette(S); }

// One famous calculation found that to see as sharply as you do, compound eyes would need to be about a metre across.
{ const S = sc(65, 0, { cam: "push", focus: "1000 600" }); garden(S, DS.outdoor(S, GARD.morning), { blades: false });
  const F = dave(S, 560, 960, "near", { s: 2.0, look: 6, mood: "wow" });
  const g = S.grp(); DS.shape(S, circ(1250, 640, 230), "ink", { w: "near", parent: g, tone: 1, flat: true }); const hx = S.grp(g); clipTo(hx, circ(1250, 640, 224));
  for (let r = -6; r <= 6; r++) for (let c = -6; c <= 6; c++) { const x = 1250 + c * 56 + (r % 2) * 28, y = 640 + r * 48, a = []; for (let i = 0; i < 6; i++) { const t = (i / 6) * Math.PI * 2 + Math.PI / 6; a.push([x + Math.cos(t) * 30, y + Math.sin(t) * 30]); } S.draw(poly(a, 0) + " Z", S.start, 0, { fill: DS.c("blue", (r + c) % 2 ? 1 : 0), c: DS.c("blue", 2), w: DS.w.hair, parent: hx }); }
  fadeG(S, g, W(65, 12), 0.6);
  S.draw(`M1020 930 H1480 M1040 910 L1010 930 L1040 950 M1460 910 L1490 930 L1460 950`, W(65, 19), 0, { c: DS.c("red", 0), w: DS.w.near });
  card(S, "ABOUT 1 METRE", 1250, 330, { t: W(65, 19), tc: "red", size: DS.type.small });
  DS.vignette(S); }

// So black garden ants lean on their antennae. They lay scent trails between food and home.
{ const S = sc(66, 0, { cam: "push", focus: "960 640" }); garden(S, DS.outdoor(S, GARD.dusk), { blades: false });
  const mound = S.grp(); DS.shape(S, `M120 900 Q300 640 480 900 Z`, "earth", { w: "near", parent: mound, tone: 2 }); S.fill(circ(300, 880, 34, 24), S.start, 0, DS.P.ink[0], 1, mound);
  crumb(S, 1620, 920, 0.8, {});
  const dots = S.grp(); for (let i = 0; i < 22; i++) { const x = 520 + i * 52; S.fill(circ(x, 900 + Math.sin(i) * 6, 9), W(66, 9) + i * 0.09, 0, DS.c("purple", 1), 1, dots); }
  const A = ant(S, 960, 910, 1.4, { face: "smile", look: 4, dir: 1 });
  [-1, 1].forEach((sd) => S.draw(smooth([[1060 + sd * 20, 720], [1090 + sd * 30, 700], [1080, 676]]), W(66, 4), 0, { c: DS.c("purple", 0), w: DS.w.detail }));
  card(S, "ANTENNAE", 1100, 580, { t: W(66, 6), size: DS.type.caption }); card(S, "SCENT TRAIL", 960, 190, { t: W(66, 10), tc: "purple", size: DS.type.small });
  card(S, "HOME", 300, 560, { t: W(66, 14), size: DS.type.caption }); card(S, "FOOD", 1620, 640, { t: W(66, 13), size: DS.type.caption });
  DS.vignette(S); }

// "We don't look for home, Dave. We smell it." (kid)
{ const S = sc(67, 0, { cam: "push", focus: "1000 640" }); garden(S, DS.outdoor(S, GARD.dusk), { blades: false });
  const F = tiny(S, 480, 960, { s: 1.2, look: 5, mood: "worried", pose: "reach" }); blanket(S, F, S.start);
  const A = ant(S, 1230, 960, 1.9, { face: "cheeky", look: -3, dir: -1 }); A.talk(W(67, 0), END(67));
  [0, 1, 2].forEach((i) => S.draw(smooth([[1040 - i * 12, 520 - i * 40], [1000 - i * 12, 500 - i * 40], [1040 - i * 12, 480 - i * 40]]), W(67, 6), 0, { c: DS.c("purple", 0), w: DS.w.detail }));
  card(S, "WE SMELL IT", 1230, 190, { t: W(67, 6), tc: "purple", size: DS.type.title });
  DS.vignette(S); }
