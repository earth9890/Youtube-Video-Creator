
// ===================== 5. Cold and hungry =====================
// By the afternoon, the sun is out, and Dave is shivering.
{ const S = sc(44, 0, { cam: "push", focus: "1000 640" }); garden(S, DS.outdoor(S, GARD.sun));
  sunDisc(S, 1520, 220, 90, { t: W(44, 4) });
  const F = tiny(S, 800, 930, { s: 1.1, look: 3, mood: "worried", pose: "cross" }); shiver(F.g, W(44, 9), END(44) + 0.5);
  [[-110, -260], [110, -250], [-130, -150], [130, -140]].forEach(([dx, dy]) => { const g = S.grp(); S.draw(`M${800 + dx} ${930 + dy} l10 -14 l-10 -14 l10 -14`, S.start, 0, { c: DS.c("sky", 2), w: DS.w.mid, parent: g }); fadeG(S, g, W(44, 9), 0.5); });
  card(S, "AFTERNOON", 960, 190, { t: W(44, 2), size: DS.type.small });
  DS.vignette(S); }

// "It's a lovely sunny afternoon. Why am I freezing?" (Dave)
{ const S = sc(45, 0, { cam: "push", focus: "960 600" }); garden(S, DS.outdoor(S, GARD.sun), { blades: false });
  sunDisc(S, 1520, 220, 90, {});
  const F = tiny(S, 820, 960, { s: 1.5, look: 0, mood: "sad", pose: "cross" }); blanket(S, F, S.start); talk(S, F, W(45, 0), END(45)); shiver(F.g, S.start, END(45), 2.5);
  card(S, "WHY AM I FREEZING?", 960, 190, { t: W(45, 5), tc: "blue", size: DS.type.small });
  DS.vignette(S); }

// This is the part the films leave out. Warm-blooded animals make their own heat and lose it through their skin.
{ const S = sc(46, 0, { cam: "push", focus: "960 620" }); garden(S, DS.outdoor(S, GARD.sun), { blades: false });
  const rl = reel(S, 960, 330, 0.62, { t: W(46, 3) }); S.draw(`M780 230 L1140 430 M1140 230 L780 430`, W(46, 5), 0, { c: DS.c("red", 0), w: DS.w.near * 1.4 });
  const F = tiny(S, 600, 940, { s: 1.1, look: 3, mood: "flat" }); heatTop(S, F, 3, W(46, 14), undefined, 150);
  rodent(S, 1360, 940, 1.5, {}); heat(S, 1360, 770, 3, W(46, 14), undefined, 150);
  card(S, "WARM-BLOODED", 960, 650, { t: W(46, 8), tc: "red", size: DS.type.small });
  DS.vignette(S); }

// Haldane wrote that at rest, they all lose about the same heat from each patch of skin, so the food they need follows their skin, not their weight.
{ const S = sc(47, 0, { cam: "push", focus: "960 620" }); garden(S, DS.outdoor(S, GARD.sun), { blades: false });
  const F = tiny(S, 420, 960, { s: 1.0, look: 3, mood: "flat" }); const px = F.cx + 24, py = F.sh[1] + 110;
  const M = rodent(S, 1400, 960, 1.6, {}); const mx = 1432, my = 905;
  const bigP = (x, y, t) => { const g = S.grp(); S.draw(rect(x - 70, y - 70, 140, 140), S.start, 0, { fill: DS.c("yellow", 1), c: DS.c("gold", 2), w: DS.w.mid, parent: g }); heat(S, x, y - 80, 2, S.start, g, 130); fadeG(S, g, t, 0.5); return g; };
  [[px, py], [mx, my]].forEach(([x, y]) => S.draw(rect(x - 14, y - 14, 28, 28), W(47, 12), 0, { fill: DS.c("yellow", 1), c: DS.c("gold", 2), w: DS.w.mid }));
  bigP(620, 600, W(47, 12)); bigP(1300, 600, W(47, 12));
  const lk = S.grp(); [[px, py, 620, 670], [mx, my, 1300, 670]].forEach(([x, y, bx, by]) => dashed(S.draw(`M${x} ${y} L${bx} ${by}`, S.start, 0, { c: DS.c("gray", 2), w: DS.w.detail, parent: lk }))); fadeG(S, lk, W(47, 12), 0.5);
  card(S, "SAME HEAT PER PATCH", 960, 190, { t: W(47, 7), size: DS.type.small });
  card(S, "FOOD FOLLOWS SKIN", 960, 330, { t: W(47, 17), tc: "red", size: DS.type.small });
  card(S, "NOT WEIGHT", 960, 800, { t: W(47, 25), size: DS.type.caption });
  DS.vignette(S); }

// Every gram of tiny Dave now has three hundred and fifty times as much skin as before.
{ const S = sc(48, 0, { cam: "push", focus: "960 560" }); garden(S, DS.outdoor(S, GARD.sun), { blades: false });
  const F = tiny(S, 520, 940, { s: 1.1, look: 5, mood: "worried" });
  const P = panel(S, 1320, 570, 800, 640, T0(S)); const g = S.grp();
  DS.shape(S, rect(1100, 780, 160, 40), "orange", { w: "near", parent: g }); S.text("BEFORE 1×", 1180, 860, { size: DS.type.caption, c: DS.P.ink[0], t: T0(S), parent: g });
  const g2 = S.grp(); DS.shape(S, rect(1380, 420, 160, 400), "red", { w: "near", parent: g2 }); S.text("NOW", 1460, 860, { size: DS.type.caption, c: DS.P.ink[0], t: T0(S) });
  tl.fromTo(g2, { attr: { transform: "translate(1460 820) scale(1 0.05) translate(-1460 -820)" } }, { attr: { transform: "translate(1460 820) scale(1 1) translate(-1460 -820)" }, duration: 1.2, ease: "power2.out", immediateRender: true }, W(48, 7));
  countUp(S, 1460, 380, 1, 350, W(48, 7), 1.3, { size: DS.type.title, c: DS.c("red", 2), t0: W(48, 6), fmt: (v) => Math.round(v) + "×" });
  card(S, "SKIN PER GRAM", 1320, 150, { t: W(48, 1), size: DS.type.small });
  DS.vignette(S); }

// So just to stay warm, by Haldane's rule, each gram needs about three hundred and fifty times as much food.
{ const S = sc(49, 0, { cam: "push", focus: "960 560" }); garden(S, DS.outdoor(S, GARD.sun), { blades: false });
  const F = tiny(S, 420, 940, { s: 1.1, look: 5, mood: "sad", pose: "cross" }); blanket(S, F, S.start); shiver(F.g, S.start, END(49), 2);
  const L = S.grp(), Rr = S.grp(); fadeG(S, L, W(49, 8)); fadeG(S, Rr, W(49, 12));
  plate(S, 960, 860, 190, { parent: L }); heap(S, 960, 850, 1, 34, { parent: L }); S.text("1×", 960, 540, { size: DS.type.title, c: DS.P.ink[0], t: T0(S), parent: L });
  plate(S, 1480, 860, 270, { parent: Rr }); heap(S, 1480, 850, 60, 26, { parent: Rr });
  countUp(S, 1480, 600, 1, 350, W(49, 12), 1.3, { size: DS.type.title, c: DS.c("red", 2), t0: W(49, 12), fmt: (v) => Math.round(v) + "×" });
  card(S, "FOOD PER GRAM", 1200, 190, { t: W(49, 17), size: DS.type.small });
  DS.vignette(S); }

// The smallest mammal on Earth, the Etruscan shrew, weighs two to three grams. It eats more than its own weight every day, in up to twenty-five meals.
{ const S = sc(50, 0, { cam: "push", focus: "960 600" }); garden(S, DS.outdoor(S, GARD.sun), { blades: false });
  rodent(S, 560, 940, 2.4, { name: "earth", long: true });
  card(S, "ETRUSCAN SHREW", 560, 190, { t: W(50, 5), size: DS.type.small });
  card(S, "2–3 G", 560, 330, { t: W(50, 9), tc: "red", size: DS.type.title });
  card(S, "EATS MORE THAN ITS WEIGHT A DAY", 1250, 190, { t: W(50, 14), size: DS.type.caption });
  for (let i = 0; i < 25; i++) { const x = 1050 + (i % 5) * 96, y = 340 + Math.floor(i / 5) * 96; S.draw(circ(x, y, 34, 26), W(50, 22) + i * 0.05, 0, { fill: DS.c("earth", i % 2 ? 1 : 0), c: DS.c("earth", 2), w: DS.w.mid }); }
  card(S, "UP TO 25 MEALS", 1250, 860, { t: W(50, 22), tc: "red", size: DS.type.small });
  DS.vignette(S); }

// It can't survive more than a few hours without food, and its heart beats up to fifteen hundred times a minute.
{ const S = sc(51, 0, { cam: "push", focus: "960 600" }); garden(S, DS.outdoor(S, GARD.sun), { blades: false });
  const hg = S.grp(); S.heart(560, 520, 3.4, S.start, 0, { fill: DS.c("red", 0), c: DS.P.ink[0], parent: hg }); tl.to(hg, { scale: 1.06, svgOrigin: "560 520", duration: 0.45, yoyo: true, repeat: 20, ease: "sine.inOut" }, W(51, 11));
  countUp(S, 560, 800, 0, 1500, W(51, 15), 1.4, { size: DS.type.title, c: DS.c("red", 2), t0: W(51, 13), fmt: (v) => Math.round(v).toLocaleString("en-US") + " / MIN" });
  plate(S, 1360, 800, 230, {}); S.draw(`M1250 740 L1470 860 M1470 740 L1250 860`, W(51, 8), 0, { c: DS.c("red", 0), w: DS.w.near * 1.4 });
  card(S, "A FEW HOURS", 1360, 330, { t: W(51, 5), size: DS.type.small });
  card(S, "NO FOOD", 1360, 480, { t: W(51, 8), tc: "red", size: DS.type.caption });
  DS.vignette(S); }

// Tiny Dave is more than a thousand times lighter than the shrew. No mammal on Earth comes anywhere near his size.
{ const S = sc(52, 0, { cam: "push", focus: "960 600" }); garden(S, DS.outdoor(S, GARD.sun), { blades: false });
  rodent(S, 1050, 940, 2.6, { name: "earth", long: true });
  const F = tiny(S, 420, 940, { s: 0.42, look: 7, mood: "wow" });
  card(S, "1,000× LIGHTER", 560, 330, { t: W(52, 5), tc: "red", size: DS.type.small });
  card(S, "NO MAMMAL IS CLOSE", 1200, 190, { t: W(52, 12), size: DS.type.small });
  DS.vignette(S); }

// "Why are you so warm? That sounds expensive." (kid)
{ const S = sc(53, 0, { cam: "push", focus: "1000 620" }); garden(S, DS.outdoor(S, GARD.sun), { blades: false });
  const F = tiny(S, 520, 960, { s: 1.2, look: 6, mood: "sad", pose: "cross" }); blanket(S, F, S.start); heatTop(S, F, 3, S.start, undefined, 150); shiver(F.g, S.start, END(53), 2);
  const A = ant(S, 1230, 960, 1.9, { face: "cheeky", look: -3, dir: -1 }); A.talk(W(53, 0), END(53));
  card(S, "EXPENSIVE", 1230, 190, { t: W(53, 6), tc: "red", size: DS.type.title });
  DS.vignette(S); }

// Ants are cold-blooded. They let the world around them set their temperature, so they don't spend food on heating.
{ const S = sc(54, 0, { cam: "push", focus: "960 600" }); garden(S, DS.outdoor(S, GARD.sun), { blades: false });
  sunDisc(S, 1500, 210, 80, {});
  const A = ant(S, 700, 940, 1.6, { face: "smile", look: 3, dir: 1 });
  thermo(S, 1120, 620, 240, 0.5, { c: "sky" }); thermo(S, 1320, 620, 240, 0.5, { c: "sky" });
  S.text("ANT", 1120, 890, { size: DS.type.caption, c: DS.P.ink[0], t: W(54, 6) }); S.text("AIR", 1320, 890, { size: DS.type.caption, c: DS.P.ink[0], t: W(54, 6) });
  S.text("=", 1220, 640, { size: DS.type.title, c: DS.c("red", 2), t: W(54, 9) });
  card(S, "COLD-BLOODED", 960, 190, { t: W(54, 2), size: DS.type.small });
  const fl = S.grp(); S.flame(1620, 740, 1.1, S.start, 0, { parent: fl }); fadeG(S, fl, W(54, 14), 0.4); S.draw(`M1530 560 L1710 760 M1710 560 L1530 760`, W(54, 15), 0, { c: DS.c("red", 0), w: DS.w.near * 1.4 });
  card(S, "NO FOOD ON HEATING", 1620, 450, { t: W(54, 15), size: DS.type.caption });
  DS.vignette(S); }

// Dave does, and he's running out.
{ const S = sc(55, 0, { cam: "push", focus: "960 600" }); garden(S, DS.outdoor(S, GARD.sun), { blades: false });
  const F = tiny(S, 620, 960, { s: 1.4, look: 3, mood: "worried", pose: "cross" }); blanket(S, F, S.start); heatTop(S, F, 3, W(55, 0), undefined, 150); shiver(F.g, S.start, END(55), 2.5);
  const bar = S.grp(); S.draw(rrect(1150, 480, 520, 150, DS.r.md), S.start, 0, { fill: DS.P.white[0], c: DS.P.ink[0], w: DS.w.near, parent: bar }); S.draw(rect(1670, 520, 30, 70), S.start, 0, { fill: DS.P.ink[0], c: DS.P.ink[0], w: DS.w.mid, parent: bar });
  const fill = el("path", { d: rect(1170, 500, 480, 110), fill: DS.c("red", 0) }, bar), tf = (v) => `translate(1170 0) scale(${v} 1) translate(-1170 0)`; fill.setAttribute("transform", tf(0.9));
  tl.fromTo(fill, { attr: { transform: tf(0.9) } }, { attr: { transform: tf(0.12) }, duration: 2.2, ease: "power1.inOut", immediateRender: true }, W(55, 3));
  card(S, "FOOD", 1410, 380, { t: W(55, 3), size: DS.type.small }); card(S, "RUNNING OUT", 1410, 760, { t: W(55, 4), tc: "red", size: DS.type.small });
  DS.vignette(S); }

// Dave finds a crumb in the grass and eats it all.
{ const S = sc(56, 0, { cam: "push", focus: "960 620" }); garden(S, DS.outdoor(S, GARD.sun));
  const F = tiny(S, 760, 940, { s: 1.2, look: 5, mood: "smile", pose: "hold" }); blanket(S, F, S.start);
  const cg = crumb(S, 1130, 940, 1.0, {}); tl.fromTo(cg, { scale: 1, svgOrigin: "1130 940" }, { scale: 0.04, svgOrigin: "1130 940", duration: END(56) - W(56, 8) - 0.5, ease: "none", immediateRender: false }, W(56, 8));
  talk(S, F, W(56, 8), END(56) - 0.4);
  card(S, "A CRUMB", 1130, 640, { t: W(56, 3), size: DS.type.small });
  DS.vignette(S); }

// That's lunch, dinner and tomorrow's breakfast, and it still isn't enough.
{ const S = sc(57, 0, { cam: "push", focus: "960 600" }); garden(S, DS.outdoor(S, GARD.sun), { blades: false });
  const F = tiny(S, 560, 960, { s: 1.3, look: 5, mood: "sad", pose: "hips" }); blanket(S, F, S.start);
  plate(S, 1250, 900, 260, {}); crumb(S, 1250, 890, 0.25, {});
  card(S, "LUNCH", 1250, 190, { t: W(57, 1), size: DS.type.small }); card(S, "DINNER", 1250, 330, { t: W(57, 2), size: DS.type.small }); card(S, "TOMORROW'S BREAKFAST", 1250, 470, { t: W(57, 4), size: DS.type.small });
  stamp(S, 1250, 700, "STILL NOT ENOUGH", W(57, 8), "red", { size: DS.type.small });
  DS.vignette(S); }
