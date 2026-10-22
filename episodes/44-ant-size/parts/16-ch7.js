
// ===================== 7. The films got it backwards =====================
const CINEMA = { wall: "purple", floor: "navy", window: false };
// And here's the twist. The shrink-ray films got it backwards.
{ const S = sc(68, 0, { cam: "push", focus: "960 540" }); DS.room(S, CINEMA);
  reel(S, 960, 540, 1.3, { t: W(68, 5) });
  S.draw(arc(960, 540, 420, -150, -30), W(68, 7), 0, { c: DS.c("yellow", 0), w: DS.w.near }); S.draw(arrowHead(1311, 322, 0.5, 34), W(68, 7), 0, { c: DS.c("yellow", 0), w: DS.w.near });
  S.draw(arc(960, 540, 420, 30, 150), W(68, 7), 0, { c: DS.c("yellow", 0), w: DS.w.near }); S.draw(arrowHead(609, 758, 3.64, 34), W(68, 7), 0, { c: DS.c("yellow", 0), w: DS.w.near });
  card(S, "THE TWIST", 960, 150, { t: W(68, 3), tc: "red", size: DS.type.title });
  card(S, "BACKWARDS", 960, 930, { t: W(68, 7), size: DS.type.small });
  DS.vignette(S); }

// In the film, four children are shrunk to a quarter of an inch, about Dave's size. Their dangers are a bee, a scorpion and a lawnmower.
{ const S = sc(69, 0, { cam: "push", focus: "960 540" }); DS.room(S, CINEMA);
  reel(S, 520, 400, 0.95, { t: W(69, 1) });
  card(S, "4 KIDS → ¼ INCH", 520, 680, { t: W(69, 6), size: DS.type.small });
  card(S, "ABOUT DAVE'S SIZE", 520, 810, { t: W(69, 16), size: DS.type.caption });
  card(S, "THEIR DANGERS", 1340, 190, { t: W(69, 19), size: DS.type.small });
  card(S, "A BEE", 1340, 360, { t: W(69, 23), tc: "red", size: DS.type.small }); card(S, "A SCORPION", 1340, 520, { t: W(69, 25), tc: "red", size: DS.type.small }); card(S, "A LAWNMOWER", 1340, 680, { t: W(69, 28), tc: "red", size: DS.type.small });
  const F = tiny(S, 1000, 960, { s: 0.5, look: -5, mood: "smile" });
  DS.vignette(S); }

// One of them nearly drowns in a mud puddle. Fair. The film got that one right.
{ const S = sc(70, 0, { cam: "push", focus: "960 600" }); DS.room(S, CINEMA);
  reel(S, 560, 420, 0.95, { t: W(70, 0) });
  const pd = S.grp(); S.draw(`M1000 800 Q1100 740 1300 760 Q1560 740 1720 800 Q1620 880 1340 890 Q1060 890 1000 800 Z`, S.start, 0, { fill: DS.c("earth", 2), c: DS.P.ink[0], w: DS.w.near, parent: pd }); [0, 1].forEach((i) => S.draw(circ(1360, 820, 90 + i * 60, 24 + i * 16), S.start, 0, { c: DS.c("earth", 0), w: DS.w.mid, parent: pd })); fadeG(S, pd, W(70, 6), 0.5);
  card(S, "MUD PUDDLE", 1360, 640, { t: W(70, 6), size: DS.type.small });
  card(S, "FAIR", 960, 190, { t: W(70, 9), tc: "green", size: DS.type.title }); const ck = S.grp(); tick(S, 1560, 450, 2.0, W(70, 9), "green", ck);
  card(S, "GOT THAT ONE RIGHT", 560, 760, { t: W(70, 11), size: DS.type.caption });
  DS.vignette(S); }

// And when night falls, they sleep outside in a toy brick.
{ const S = sc(71, 0, { cam: "push", focus: "960 640" }); DS.outdoor(S, { hy: 620, sky: "night", sun: [1500, 200], hills: "navy", ground: "grass" });
  toyBrick(S, 960, 930, 1.5, {}); const z = S.grp(); S.zzz(1040, 560, W(71, 5), 0.5, { parent: z });
  reel(S, 400, 300, 0.6, { t: W(71, 1) });
  card(S, "NIGHT FALLS", 960, 190, { t: W(71, 2), size: DS.type.small }); card(S, "A TOY BRICK", 960, 400, { t: W(71, 9), tc: "red", size: DS.type.small });
  DS.vignette(S); }

// The scariest scene in that film isn't the scorpion. It's the sleepover.
{ const S = sc(72, 0, { cam: "push", focus: "960 640" }); DS.outdoor(S, { hy: 620, sky: "night", sun: [1500, 200], hills: "navy", ground: "grass" });
  const L = card(S, "THE SCORPION", 520, 330, { t: W(72, 7), size: DS.type.small }); S.draw(`M300 270 L740 390`, W(72, 8), 0, { c: DS.c("red", 0), w: DS.w.near * 1.4 });
  toyBrick(S, 1300, 930, 1.3, {}); const z = S.grp(); S.zzz(1370, 600, W(72, 10), 0.5, { parent: z });
  S.draw(circ(1300, 760, 340, 250), W(72, 10), 0, { c: DS.c("red", 0), w: DS.w.near });
  card(S, "THE SLEEPOVER", 1300, 400, { t: W(72, 10), tc: "red", size: DS.type.small });
  const F = tiny(S, 520, 960, { s: 1.1, look: 5, mood: "worried", pose: "cross" }); blanket(S, F, S.start); shiver(F.g, S.start, END(72), 2);
  DS.vignette(S); }

// Tiny people aren't weak. Pound for pound, Dave is stronger than ever, and falling can't hurt him.
{ const S = sc(73, 0, { cam: "push", focus: "960 600" }); garden(S, DS.outdoor(S, GARD.morning), { blades: false });
  const F = tiny(S, 520, 960, { s: 1.4, look: 3, mood: "determined", pose: "armsUp" });
  card(S, "NOT WEAK", 520, 190, { t: W(73, 2), tc: "green", size: DS.type.title }); card(S, "STRONGER THAN EVER", 520, 330, { t: W(73, 8), size: DS.type.caption });
  const P = panel(S, 1400, 560, 700, 560, T0(S)); const g = S.grp(); fadeG(S, g, W(73, 12));
  DS.shape(S, rect(1130, 560, 300, 36), "wood", { w: "near", parent: g, tone: 1 }); DS.shape(S, rect(1160, 596, 30, 200), "wood", { w: "near", parent: g, tone: 2, flat: true });
  S.draw(`M1500 520 V740 M1470 710 L1500 746 L1530 710`, S.start, 0, { c: DS.c("blue", 0), w: DS.w.near, parent: g }); tick(S, 1620, 700, 1.4, W(73, 14), "green", g);
  card(S, "FALLING IS FINE", 1400, 400, { t: W(73, 12), size: DS.type.small });
  DS.vignette(S); }

// His real enemies are a raindrop, a sunny afternoon and the size of light.
{ const S = sc(74, 0, { cam: "push", focus: "960 560" }); DS.room(S, { wall: "sand", floor: "wood", window: false });
  [[330, W(74, 4)], [960, W(74, 6)], [1590, W(74, 9)]].forEach(([x, t], i) => {
    const p = panel(S, x, 560, 520, 600, T0(S)); fadeG(S, p, t - 0.1); const ig = S.grp(); fadeG(S, ig, t + 0.1);
    if (i === 0) { dome(S, x, 640, 190, 220, { parent: ig }); S.text("RAINDROP", x, 800, { size: DS.type.small, c: DS.P.ink[0], t: T0(S), parent: ig }); }
    if (i === 1) { sunDisc(S, x, 520, 80, { parent: ig }); S.text("SUNNY AFTERNOON", x, 800, { size: DS.type.caption, c: DS.P.ink[0], t: T0(S), parent: ig }); }
    if (i === 2) { eyeball(S, x, 520, 1.2, { parent: ig }); S.text("SIZE OF LIGHT", x, 800, { size: DS.type.small, c: DS.P.ink[0], t: T0(S), parent: ig }); }
  });
  card(S, "THE REAL ENEMIES", 960, 150, { t: W(74, 1), tc: "red", size: DS.type.small });
  DS.vignette(S); }

// Dave looks at his list. Too weak, crossed out. Falling off things, crossed out.
{ const S = sc(75, 0, { cam: "push", focus: "1100 560" }); tbl(S, DS.room(S, TBL));
  dangerList(S, 1260, 540, 0.95, { strike: [W(75, 7), W(75, 12)] });
  const F = tiny(S, 560, 960, { s: 1.0, look: 6, mood: "flat", pose: "hold" }); blanket(S, F, S.start);
  DS.vignette(S); }

// Underneath, in very shivery handwriting: wet, cold, hungry, blind.
{ const S = sc(76, 0, { cam: "push", focus: "1100 560" }); tbl(S, DS.room(S, TBL));
  dangerList(S, 1260, 540, 0.95, { strike: [S.start - 0.6, S.start - 0.6], wch: [W(76, 5), W(76, 6), W(76, 7), W(76, 8)] });
  const F = tiny(S, 560, 960, { s: 1.0, look: 6, mood: "worried", pose: "cross" }); blanket(S, F, S.start); shiver(F.g, S.start, END(76), 2.5);
  DS.vignette(S); }
