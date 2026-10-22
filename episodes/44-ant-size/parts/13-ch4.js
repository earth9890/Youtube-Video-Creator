
// ===================== 4. A drop of water =====================
// By late morning, Dave is out in the garden, like the kids in the films, and it starts to rain.
{ const S = sc(30, 0, { cam: "push", focus: "960 640" }); garden(S, DS.outdoor(S, GARD.rain));
  const cl = S.grp(); cloudy(S, 1300, 190, 1.7, { parent: cl }); cloudy(S, 500, 230, 1.3, { parent: cl, tone: 2 }); fadeG(S, cl, W(30, 15), 0.9);
  streaks(S, 150, 1800, 330, 600, 26, W(30, 17));
  const F = tiny(S, 900, 930, { s: 0.9, look: 5, mood: "smile" });
  const A = ant(S, 1300, 930, 1.1, { face: "smile", look: -2, dir: -1 });
  card(S, "LATE MORNING", 960, 190, { t: W(30, 1), size: DS.type.small });
  DS.vignette(S); }

// To Dave, every raindrop is a water balloon up to fifty times his weight, falling at six to nine metres a second.
{ const S = sc(31, 0, { cam: "push", focus: "960 600" }); garden(S, DS.outdoor(S, GARD.rain));
  const F = tiny(S, 560, 930, { s: 0.9, look: 6, mood: "worried" });
  [[1000, 360, 2.4], [1350, 470, 2.0], [1700, 330, 2.2]].forEach(([x, y, k], i) => { const g = tear(S, x, y, k, { t: undefined }); fadeG(S, g, W(31, 3) + i * 0.2, 0.4); });
  card(S, "A WATER BALLOON", 1150, 190, { t: W(31, 5), size: DS.type.small });
  card(S, "UP TO 50× HIS WEIGHT", 1250, 680, { t: W(31, 8), tc: "red", size: DS.type.small });
  card(S, "6–9 M/S", 1250, 810, { t: W(31, 16), size: DS.type.small });
  DS.vignette(S); }

// In twenty twelve, a team at Georgia Tech filmed mosquitoes being hit by raindrops. They survived, because they're so light the drop barely slows down.
{ const S = sc(32, 0, { cam: "push", focus: "960 560" }); garden(S, DS.outdoor(S, GARD.rain), { blades: false });
  streaks(S, 150, 1800, 100, 500, 18);
  const m = mosquito(S, 900, 640, 2.0);
  const d = tear(S, 1080, 470, 2.2); tl.fromTo(d, { y: -70 }, { y: 40, duration: 1.6, ease: "power1.out", immediateRender: false }, W(32, 11));
  card(S, "GEORGIA TECH, 2012", 960, 190, { t: W(32, 1), size: DS.type.small });
  cam(S, 330, 460, 1.1, { t: W(32, 8) }); 
  const ck = S.grp(); tick(S, 1400, 760, 1.6, W(32, 14), "green", ck); fadeG(S, ck, W(32, 14), 0.3);
  card(S, "THEY SURVIVED", 1400, 640, { t: W(32, 14), tc: "green", size: DS.type.caption });
  card(S, "DROP BARELY SLOWS", 960, 900, { t: W(32, 21), size: DS.type.caption });
  DS.vignette(S); }

// Tiny Dave weighs about as much as a mosquito, so the rain can't hurt him either.
{ const S = sc(33, 0, { cam: "push", focus: "960 600" }); garden(S, DS.outdoor(S, GARD.rain));
  streaks(S, 150, 1800, 330, 700, 18);
  const F = tiny(S, 600, 930, { s: 0.9, look: 5, mood: "smile" });
  mosquito(S, 1300, 760, 1.8);
  card(S, "≈", 960, 560, { t: W(33, 2), size: DS.type.display });
  card(S, "SAME WEIGHT", 960, 190, { t: W(33, 3), size: DS.type.small });
  card(S, "RAIN CAN'T HURT HIM", 960, 330, { t: W(33, 9), tc: "green", size: DS.type.caption });
  DS.vignette(S); }

// Getting wet is a different story.
{ const S = sc(34, 0, { cam: "push", focus: "1000 640" }); garden(S, DS.outdoor(S, GARD.rain));
  leaf(S, 1100, 930, 1300, { rot: -3 }); dome(S, 1250, 880, 190, 170, {});
  const F = tiny(S, 600, 930, { s: 0.9, look: 6, mood: "worried" });
  card(S, "GETTING WET", 960, 190, { t: W(34, 0), tc: "red", size: DS.type.title });
  DS.vignette(S); }

// Dave is thirsty, so he leans into a raindrop on a leaf, and the drop grabs his whole face.
{ const S = sc(35, 0, { cam: "push", focus: "1050 640" }); garden(S, DS.outdoor(S, GARD.rain), { blades: false });
  leaf(S, 1050, 960, 1500, { rot: -2 });
  dome(S, 1300, 900, 230, 200, { clear: true });
  const F = tiny(S, 1000, 910, { s: 0.95, look: 7, mood: "flat" }); F.face(W(35, 12), "wow", 7); const [hx, hy] = F.hd;
  const fb = faceBubble(S, F, S.start, undefined); fadeG(S, fb, W(35, 14), 0.4);
  cheeks(S, F, W(35, 15));
  card(S, "THIRSTY", 700, 330, { t: W(35, 2), size: DS.type.small });
  DS.vignette(S); }

// That's surface tension. Water pulls its surface tight like a skin, and at Dave's size, that skin is strong enough to hold him.
{ const S = sc(36, 0, { cam: "push", focus: "900 640" }); garden(S, DS.outdoor(S, GARD.rain), { blades: false });
  const g = S.grp(); dome(S, 700, 900, 400, 350, { parent: g });
  [[-300, -110, 1.0], [-160, -270, 0.55], [160, -270, -0.55], [300, -110, -1.0]].forEach(([dx, dy, a]) => { const x = 700 + dx, y = 900 + dy, ex = x + Math.cos(a) * 90, ey = y - Math.abs(Math.sin(a)) * 60 - 30; S.draw(`M${x} ${y} L${ex} ${ey}`, W(36, 5), 0, { c: DS.c("red", 0), w: DS.w.near, parent: g }); S.draw(arrowHead(ex, ey, Math.atan2(ey - y, ex - x), 26), W(36, 5), 0, { c: DS.c("red", 0), w: DS.w.near, parent: g }); });
  card(S, "SURFACE TENSION", 960, 190, { t: W(36, 1), tc: "red", size: DS.type.small });
  card(S, "LIKE A SKIN", 700, 560, { t: W(36, 8), size: DS.type.caption });
  const F = tiny(S, 1500, 930, { s: 1.0, look: -3, mood: "wow" }); const fb = faceBubble(S, F, S.start); fadeG(S, fb, W(36, 18), 0.4); cheeks(S, F, W(36, 19));
  card(S, "STRONG ENOUGH TO HOLD HIM", 1450, 330, { t: W(36, 17), size: DS.type.caption });
  DS.vignette(S); }

// Haldane wrote that an insect going for a drink is in as much danger as a man leaning over a cliff in search of food.
{ const S = sc(37, 0, { cam: "push", focus: "960 600" }); DS.outdoor(S, { hy: 600, sky: "sky", sun: false, hills: "grass", ground: "grass" });
  panel(S, 480, 560, 780, 720, T0(S)); panel(S, 1440, 560, 780, 720, T0(S));
  const L = S.grp(), Rr = S.grp(); fadeG(S, L, W(37, 3)); fadeG(S, Rr, W(37, 15));
  dome(S, 560, 820, 230, 200, { parent: L, clear: false }); fly(S, 400, 700, 1.5, { parent: L }); 
  S.text("INSECT", 480, 340, { size: DS.type.small, c: DS.P.ink[0], t: T0(S), parent: L });
  DS.shape(S, `M1180 640 H1760 V900 H1180 Z`, "earth", { w: "near", parent: Rr }); DS.shape(S, rect(1560, 840, 260, 70), "earth", { w: "near", parent: Rr, tone: 2 });
  const man = S.grp(Rr); mini(S, 1560, 640, 2.2, { parent: man, c: DS.c("blue", 2), w: DS.w.near }); xf(man, 24, 1560, 640);
  DS.shape(S, circ(1690, 830, 26), "red", { w: "mid", parent: Rr });
  S.text("MAN", 1440, 340, { size: DS.type.small, c: DS.P.ink[0], t: T0(S), parent: Rr });
  card(S, "=", 960, 560, { t: W(37, 11), size: DS.type.display, tc: "red" });
  DS.vignette(S); }

// Climb out of the bath, and you carry about half a kilo of water. A wet mouse carries its own weight. A wet fly, many times its own weight.
{ const S = sc(38, 0, { cam: "push", focus: "960 600" }); DS.room(S, { wall: "sand", floor: "wood", window: false });
  [[330, 610, W(38, 4)], [960, 530, W(38, 14)], [1590, 450, W(38, 21)]].forEach(([x, y, t], i) => {
    const p = panel(S, x, y + 60, 520, 640 - i * 40, T0(S)); fadeG(S, p, t - 0.1);
    const ig = S.grp(); fadeG(S, ig, t + 0.1);
    const by = y + 60 + (640 - i * 40) / 2 - 90; // creature feet
    if (i === 0) { mini(S, x - 60, by, 2.4, { parent: ig, c: DS.c("blue", 2), w: DS.w.near }); dome(S, x + 100, by, 38, 40, { parent: ig }); S.text("½ KG", x, by - 380, { size: DS.type.title, c: DS.c("red", 2), t: T0(S), parent: ig }); S.text("BATH", x, by + 60, { size: DS.type.small, c: DS.P.ink[0], t: T0(S), parent: ig }); }
    if (i === 1) { rodent(S, x - 70, by, 1.2, { parent: ig }); dome(S, x + 100, by, 70, 74, { parent: ig }); S.text("1× ITS WEIGHT", x, by - 330, { size: DS.type.small, c: DS.c("red", 2), t: T0(S), parent: ig }); S.text("WET MOUSE", x, by + 60, { size: DS.type.small, c: DS.P.ink[0], t: T0(S), parent: ig }); }
    if (i === 2) { fly(S, x - 110, by - 20, 1.2, { parent: ig }); dome(S, x + 90, by, 140, 160, { parent: ig }); S.text("MANY× ITS WEIGHT", x, by - 330, { size: DS.type.caption, c: DS.c("red", 2), t: T0(S), parent: ig }); S.text("WET FLY", x, by + 60, { size: DS.type.small, c: DS.P.ink[0], t: T0(S), parent: ig }); }
  });
  DS.vignette(S); }

// Dave is now wearing several times his own weight in raindrop.
{ const S = sc(39, 0, { cam: "push", focus: "960 640" }); garden(S, DS.outdoor(S, GARD.rain), { blades: false });
  const F = tiny(S, 960, 930, { s: 1.1, look: 0, mood: "flat", pose: "sad" });
  const g = S.grp(); S.draw(`M${960 - 210} ${930} Q${960 - 230} ${930 - 330} 960 ${930 - 430} Q${960 + 230} ${930 - 330} ${960 + 210} 930 Z`, S.start, 0, { c: DS.c("sky", 2), w: DS.w.near, parent: g }); S.draw(`M${960 - 150} ${930 - 330} Q${960 - 140} ${930 - 400} ${960 - 60} ${930 - 410}`, S.start, 0, { c: DS.P.white[0], w: DS.w.near, parent: g });
  fadeG(S, g, W(39, 3), 0.5); cheeks(S, F, W(39, 3));
  card(S, "SEVERAL× HIS WEIGHT", 960, 190, { t: W(39, 4), tc: "red", size: DS.type.small });
  DS.vignette(S); }

// The ant grabs his arm and pulls him out.
{ const S = sc(40, 0, { cam: "push", focus: "960 640" }); garden(S, DS.outdoor(S, GARD.rain), { blades: false });
  dome(S, 1250, 930, 260, 250, { clear: true });
  const F = tiny(S, 1180, 930, { s: 1.0, look: -5, mood: "wow", pose: "reachL", float: true }); const [hx, hy] = F.hd;
  const fb = S.grp(); S.draw(circ(hx, hy, F.r * 1.55), S.start, 0, { c: DS.c("sky", 2), w: DS.w.near, parent: fb }); tl.to(fb, { opacity: 0, duration: 0.5 }, W(40, 5));
  const [ax, ay] = F.hand("L", "reachL"); const A = ant(S, ax - 40 - 52 * 1.2, 930, 1.2, { face: "worried", look: 4, dir: 1 });
  F.walk(W(40, 5), 1.6, { x: -300, y: 0 }, 0.35); A.shift(W(40, 5), 1.6, -300, 0, "none");
  card(S, "PULL!", 700, 330, { t: W(40, 5), tc: "red", size: DS.type.small });
  DS.vignette(S); }

// "Rule number one. Never touch the big water." (kid)
{ const S = sc(41, 0, { cam: "push", focus: "1000 640" }); garden(S, DS.outdoor(S, GARD.rain));
  const F = tiny(S, 520, 930, { s: 1.0, look: 6, mood: "sad" });
  [[470, 560], [600, 640]].forEach(([x, y], i) => { const d = tear(S, x, y, 0.5); tl.fromTo(d, { y: 0 }, { y: 200, duration: 1.2, ease: "power1.in", repeat: 2, immediateRender: false }, W(41, 0) + i * 0.4); });
  const A = ant(S, 1220, 930, 1.9, { face: "flat", look: -3, dir: -1 }); A.talk(W(41, 0), END(41));
  card(S, "RULE #1", 1220, 190, { t: W(41, 0), tc: "red", size: DS.type.title });
  card(S, "NEVER TOUCH THE BIG WATER", 1220, 330, { t: W(41, 3), size: DS.type.caption });
  DS.vignette(S); }

// A few insects, like water beetles, are waterproof. Most keep their distance and drink through a long, thin mouthpart.
{ const S = sc(42, 0, { cam: "push", focus: "960 640" }); garden(S, DS.outdoor(S, GARD.morning), { blades: false });
  S.draw(`M120 790 Q330 770 540 790 Q750 810 920 780 V950 H120 Z`, S.start, 0, { fill: DS.c("sky", 0), c: DS.c("sky", 2), w: DS.w.mid });
  const b = beetle(S, 520, 800, 1.7, {}); const bub = S.grp(); S.draw(circ(520, 760, 42), S.start, 0, { fill: DS.P.white[0], c: DS.c("sky", 2), w: DS.w.mid, parent: bub }); fadeG(S, bub, W(42, 5), 0.4);
  card(S, "WATERPROOF", 520, 330, { t: W(42, 5), tc: "green", size: DS.type.small });
  leaf(S, 1450, 940, 800, { rot: -2 }); dome(S, 1640, 900, 120, 110, {});
  mosquito(S, 1400, 740, 1.6);
  card(S, "LONG, THIN MOUTHPART", 1400, 330, { t: W(42, 13), size: DS.type.caption });
  DS.vignette(S); }

// Dave has neither. Dave has a face.
{ const S = sc(43, 0, { cam: "push", focus: "960 520" }); garden(S, DS.outdoor(S, GARD.morning), { blades: false });
  const F = tiny(S, 960, 960, { s: 1.5, look: 0, mood: "worried" }); const [hx, hy] = F.hd;
  S.draw(circ(hx, hy, F.r * 1.6), W(43, 4), 0, { c: DS.c("red", 0), w: DS.w.near });
  card(S, "NOT WATERPROOF", 460, 330, { t: W(43, 0), size: DS.type.small });
  card(S, "NO LONG MOUTHPART", 1460, 330, { t: W(43, 1), size: DS.type.small });
  card(S, "A FACE", 960, 190, { t: W(43, 4), tc: "red" });
  DS.vignette(S); }
