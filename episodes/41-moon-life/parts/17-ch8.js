
// ===================== 8. Unpacking =====================
// the pit home in cross-section: a shaft up to the surface right under Earth (x 1480), light falling in, a floor at y 940
const cave = (S, o = {}) => { const C = cutaway(S, { sy: 400 });
  hollow(S, `M200 560 Q200 500 280 500 H1360 V400 H1600 V500 H1640 Q1720 500 1720 560 V900 Q1720 950 1640 950 H280 Q200 950 200 900 Z`);
  S.fill(`M1360 400 H1600 L1720 950 H1240 Z`, S.start, 0, DS.c("yellow", 1), 0.16);
  return C; };
const campfire = (S, x, gy, k, t, parent) => { const g = S.grp(parent);
  [-1, 1].forEach((sd) => S.draw(line([x + sd * 90 * k, gy - 6 * k], [x - sd * 70 * k, gy - 40 * k], 0), t ?? S.start, 0, { c: DS.c("wood", 2), w: DS.w.near * 1.6, parent: g }));
  const fl = S.grp(g); DS.shape(S, `M${x} ${gy - 160 * k} Q${x + 70 * k} ${gy - 80 * k} ${x + 40 * k} ${gy - 30 * k} Q${x} ${gy - 10 * k} ${x - 40 * k} ${gy - 30 * k} Q${x - 70 * k} ${gy - 80 * k} ${x} ${gy - 160 * k} Z`, "orange", { t, w: "mid", parent: fl });
  DS.shape(S, `M${x} ${gy - 100 * k} Q${x + 30 * k} ${gy - 60 * k} ${x + 16 * k} ${gy - 30 * k} Q${x} ${gy - 20 * k} ${x - 16 * k} ${gy - 30 * k} Q${x - 30 * k} ${gy - 60 * k} ${x} ${gy - 100 * k} Z`, "yellow", { t, w: "detail", parent: fl });
  tl.fromTo(fl, { attr: { transform: `translate(${x} ${gy}) scale(1 1) translate(${-x} ${-gy})` } }, { attr: { transform: `translate(${x} ${gy}) scale(1.04 1.08) translate(${-x} ${-gy})` }, duration: 1.6, ease: "sine.inOut", yoyo: true, repeat: 12 }, S.start);
  return g; };
const handprint = (S, x, y, k, parent) => { const g = S.grp(parent); S.draw(`M${x - 24 * k} ${y + 50 * k} L${x - 28 * k} ${y - 10 * k} M${x - 10 * k} ${y + 40 * k} L${x - 12 * k} ${y - 30 * k} M${x + 6 * k} ${y + 40 * k} L${x + 8 * k} ${y - 34 * k} M${x + 22 * k} ${y + 40 * k} L${x + 28 * k} ${y - 20 * k}`, S.start, 0, { c: DS.c("earth", 1), w: DS.w.near * 1.4, parent: g }); S.fill(circ(x, y + 54 * k, 30 * k, 22 * k), S.start, 0, DS.c("earth", 1), 1, g); return g; };

// So, what if you tried to live on the Moon?
{ const S = sc(67, 0, { cam: "pull" }); space(S, { milky: [200, 900, 1700, 120] });
  moon(S, 960, 1380, 860, { glow: false });
  daveM(S, 960, 520, "near", { s: 0.75, look: 0, mood: "smile", pose: "stand" }); suitcase(S, 1130, 520, 0.4);
  card(S, "LIVE ON THE MOON?", 960, 130, { t: W(67, 6), size: DS.type.title });
  DS.vignette(S, 0.2); }

// On the surface, it's a fight with the heat, the cold, the radiation and, worst of all, the dust.
{ const S = sc(67, 10, { cam: "push", focus: "960 640" }); lunar(S, { sun: [260, 170, 46] });
  const F = daveM(S, 520, 940, "near", { s: 1.5, look: 6, mood: "determined", pose: "armsUp" });
  const t = [W(67, 18), W(67, 20), W(67, 22), W(67, 27)];
  { const g = S.grp(); sun(S, 1000, 700, 52, { parent: g }); fadeG(S, g, t[0]); card(S, "HEAT", 1000, 560, { t: t[0], size: DS.type.caption }); }
  { snowflake(S, 1260, 700, 1.0, t[1]); card(S, "COLD", 1260, 560, { t: t[1], size: DS.type.caption }); }
  { const g = S.grp(); [-50, 0, 50].forEach((dx, i) => S.arrow(1520 + dx, 590, 1520 + dx * 0.4, 740, S.start, 0.3, { c: DS.c("sky", 2), w: DS.w.near, parent: g })); fadeG(S, g, t[2]); card(S, "RADIATION", 1520, 480, { t: t[2], size: DS.type.caption }); }
  { const dc = dustCloud(S, 1700, 740, 1.0, undefined); fadeG(S, dc, t[3]); card(S, "WORST OF ALL: DUST", 1440, 900, { t: t[3], size: DS.type.small, tc: "red" }); }
  DS.vignette(S, 0.2); }

// But underneath, you might just manage, with air from rock, ice from the craters, and a stressed salad.
{ const S = sc(68, 0, { cam: "push", focus: "960 640" }); const C = cutaway(S, { sy: 400 });
  hollow(S, `M200 560 Q200 500 280 500 H1640 Q1720 500 1720 560 V900 Q1720 950 1640 950 H280 Q200 950 200 900 Z`);
  const F = daveM(S, 440, 940, "near", { s: 1.1, look: 6, mood: "smile", pose: "hips", helmet: false, pack: false }); jumper(S, F);
  const X = [780, 1180, 1560], t = [W(68, 7), W(68, 10), W(68, 15)], CY = [640, 730, 640];
  { const g = S.grp(); mound(S, X[0], 940, 220, 150, "gray", undefined, g); [[-40, -60], [30, -90], [50, -40]].forEach(([dx, dy]) => { const b = S.draw(circ(X[0] + dx, 940 + dy - 80, 14), S.start, 0, { c: DS.c("sky", 2), w: DS.w.detail, fill: DS.c("sky", 1), parent: g }); tl.fromTo(b, { y: 0 }, { y: -90, duration: 2.0, ease: "none", repeat: 4 }, t[0] + dx / 100); }); fadeG(S, g, t[0]); card(S, "AIR FROM ROCK", X[0], CY[0], { t: t[0], size: DS.type.caption }); }
  { const g = S.grp(); DS.shape(S, rrect(X[1] - 80, 820, 160, 120, DS.r.sm), "sky", { tone: 1, w: "near", parent: g }); S.draw(line([X[1] - 40, 850], [X[1] + 10, 900], 0), S.start, 0, { c: DS.P.white[0], w: DS.w.mid, parent: g }); fadeG(S, g, t[1]); card(S, "ICE FROM THE CRATERS", X[1], CY[1], { t: t[1], size: DS.type.caption }); }
  { const g = S.grp(); bowl(S, X[2], 880, 0.7, undefined, { parent: g }); S.fill(circ(X[2] - 24, 920, 7), S.start, 0, DS.P.ink[0], 1, g); S.fill(circ(X[2] + 24, 920, 7), S.start, 0, DS.P.ink[0], 1, g); S.draw(`M${X[2] - 28} ${948} Q${X[2]} ${930} ${X[2] + 28} ${948}`, S.start, 0, { c: DS.P.ink[0], w: DS.w.detail, parent: g }); fadeG(S, g, t[2]); card(S, "A STRESSED SALAD", X[2], CY[2], { t: t[2], size: DS.type.caption }); }
  DS.vignette(S, 0.2); }

// One of those scientists put it simply:
{ const S = sc(69, 0, { cam: "push", focus: "700 600" }); DS.room(S, labRoom);
  const F = sci(S, 520, 960, "near", { s: 1.5, look: 4, mood: "smile", pose: "hold" }); talk(S, F, W(69, 0), W(69, 7));
  card(S, "ONE OF THE SCIENTISTS", 520, 360, { t: W(69, 3), size: DS.type.small });
  say(S, 1250, 420, 520, 230, 700, 560, ["HUMANS EVOLVED LIVING IN CAVES,", "AND TO CAVES WE MIGHT RETURN", "WHEN WE LIVE ON THE MOON."], W(69, 6), { size: DS.type.caption });
  DS.vignette(S, 0.2); }

// ... humans evolved living in caves, and to caves we might return when we live on the Moon.
{ const S = sc(69, 7, { cam: "push", focus: "960 640" }); DS.setHaze("earth");
  const g = S.grp(); S.g.insertBefore(g, S.g.firstChild); const f = (d, fill, op = 1) => S.fill(d, S.start, 0, fill, op, g);
  f(rect(-200, -200, 2320, 1480), DS.vgrad(DS.c("earth", 2), DS.mix(DS.c("earth", 2), DS.P.ink[2], 0.6)));
  f(`M-200 960 Q300 900 960 920 T2120 940 V1280 H-200 Z`, DS.vgrad(DS.c("gray", 2), DS.mix(DS.c("gray", 2), DS.P.ink[2], 0.5)));
  const op = S.grp(g); S.fill(`M1100 920 Q1100 360 1400 340 Q1700 360 1700 920 Z`, S.start, 0, DS.vgrad(DS.P.ink[2], DS.P.navy[2]), 1, op); stars(S, 18, 1130, 380, 1680, 880, { parent: op, big: 2 });
  S.draw(`M1100 920 Q1100 360 1400 340 Q1700 360 1700 920`, S.start, 0, { c: DS.P.ink[0], w: DS.w.near * 1.4, parent: g });
  const er = earth(S, 1500, 520, 60, { night: true, nightA: 20 }); tl.fromTo(er, { opacity: 0 }, { opacity: 1, duration: 1.6 }, W(69, 19));
  [[300, 380], [520, 300], [760, 420]].forEach(([x, y]) => handprint(S, x, y, 1.4, g));
  campfire(S, 760, 930, 1.5, undefined);
  const c1 = who(S, 500, 940, "near", Object.assign({}, CAVEMAN, { s: 1.3, look: 6, mood: "happy", pose: "hips" })), c2 = who(S, 1000, 940, "near", Object.assign({}, CAVEMAN, { s: 1.2, hairC: DS.c("ink", 1), look: -6, mood: "smile", pose: "stand" }));
  const dv = daveM(S, 1280, 940, "near", { s: 1.3, look: -6, mood: "happy", pose: "stand", helmet: false, pack: false }); jumper(S, dv); fadeG(S, dv.all, W(69, 14));
  card(S, "HUMANS EVOLVED IN CAVES", 620, 190, { t: W(69, 8), size: DS.type.body }); card(S, "ON THE MOON?", 1500, 190, { t: W(69, 20), size: DS.type.body });
  DS.vignette(S, 0.2); }

// Dave carries his suitcase down into the pit.
{ const S = sc(70, 0, { cam: "push", focus: "960 640" }); const C = cutaway(S, { sy: 420 });
  hollow(S, `M880 420 H1120 L1500 700 V960 H300 V700 Z`);
  const F = daveM(S, 1000, 410, "near", { s: 0.7, look: 0, mood: "smile", pose: "stand" }); F.walk(W(70, 1), WE(70, 7) - W(70, 1), { x: -300, y: 530 });
  const sg = suitcase(S, 1090, 410, 0.28); tl.to(sg, { x: -300, y: 530, duration: WE(70, 7) - W(70, 1), ease: "none" }, W(70, 1));
  card(S, "INTO THE PIT", 700, 200, { t: W(70, 3), size: DS.type.title });
  DS.vignette(S, 0.2); }

// Out come the earplugs, the sunscreen, the empty bottle and the seeds.
{ const S = sc(70, 8, { cam: "push", focus: "960 700" }); cave(S);
  plist(S, { x: 100, y: 100, crossed: [0, 1, 3, 4], t: S.start });
  daveM(S, 420, 940, "near", { s: 1.1, look: 6, mood: "smile", pose: "reach", helmet: false, pack: false });
  suitcase(S, 760, 940, 1.1, { open: true });
  const it = [[ITEM.earplugs, 1060, 880, 1.0, 11], [ITEM.sunscreen, 1190, 860, 0.9, 13], [ITEM.bottle, 1330, 860, 0.9, 16], [ITEM.seeds, 1470, 880, 1.0, 19]];
  it.forEach(([fn, x, y, k, w]) => { const g = fn(S, x, y, k, fn === ITEM.bottle ? { full: 0 } : {}); tl.fromTo(g, { x: 760 - x, y: 700 - y, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 1.1, ease: "power1.out" }, W(70, w)); });
  DS.vignette(S, 0.2); }

// Then the one thing he packed that works exactly as planned. He puts on his jumper.
{ const S = sc(71, 0, { cam: "push", focus: "960 700" }); cave(S);
  plist(S, { x: 100, y: 100, crossed: [0, 1, 3, 4], tick: [[2, W(71, 9)]], t: S.start });
  const F = daveM(S, 420, 940, "near", { s: 1.1, look: 6, mood: "smile", pose: "armsUp", helmet: false, pack: false });
  suitcase(S, 760, 940, 1.1, { open: true });
  [[ITEM.earplugs, 1060, 880, 1.0], [ITEM.sunscreen, 1190, 860, 0.9], [ITEM.bottle, 1330, 860, 0.9], [ITEM.seeds, 1470, 880, 1.0]].forEach(([fn, x, y, k]) => fn(S, x, y, k, fn === ITEM.bottle ? { full: 0 } : {}));
  const big = ITEM.jumper(S, 660, 400, 1.4, { t: T0(S) }); tl.to(big, { opacity: 0, duration: 0.4 }, W(71, 12) + 0.2);
  jumper(S, F, W(71, 12)); F.setPose(W(71, 12), "stand");
  const th = thermo(S, 1640, 900, 160, "green", S.start); level(th, S.start, 0.01, 1, 1); card(S, "17°C", 1640, 700, { t: S.start, size: DS.type.body, tc: "green" });
  DS.vignette(S, 0.2); }

// Above the pit, the Earth hangs in the same spot it has hung all month.
{ const S = sc(72, 0, { cam: "none" }); DS.setHaze("night");
  const g = S.grp(); S.g.insertBefore(g, S.g.firstChild); const f = (d, fill, op = 1) => S.fill(d, S.start, 0, fill, op, g);
  f(rect(-200, -200, 2320, 1480), DS.vgrad(DS.mix(DS.P.ink[1], DS.P.ink[2], 0.4), DS.P.ink[2]));
  for (let i = 0; i < 50; i++) f(circ(rnd() * 1920, rnd() * 1080, 3 + rnd() * 9, 2 + rnd() * 5), rnd() > 0.5 ? DS.c("gray", 1) : DS.P.ink[0], 0.2);
  f(`M1060 230 Q1060 40 1480 40 Q1900 40 1900 230 Q1900 420 1480 420 Q1060 420 1060 230 Z`, DS.vgrad(DS.P.ink[2], DS.P.navy[2]));
  const sk = S.grp(g); stars(S, 40, 1080, 60, 1880, 400, { parent: sk, big: 2 });
  S.fill(`M1080 300 H1880 L1820 1080 H1140 Z`, S.start, 0, DS.c("yellow", 1), 0.12, g);
  earth(S, EX, EY, ER, { night: true, nightA: 20, parent: g }); S.draw(`M1060 230 Q1060 40 1480 40 Q1900 40 1900 230 Q1900 420 1480 420 Q1060 420 1060 230 Z`, S.start, 0, { c: DS.P.ink[0], w: DS.w.near * 1.4, parent: g });
  const F = daveM(S, 700, 940, "near", { s: 1.5, look: 7, mood: "smile", pose: "point", helmet: false, pack: false }); jumper(S, F);
  suitcase(S, 1000, 940, 0.9);
  card(S, "ALL MONTH", 900, 200, { t: W(72, 12), size: DS.type.title });
  DS.vignette(S, 0.2); }

// And for the first time, Dave unpacks.
{ const S = sc(73, 0, { cam: "push", focus: "960 700" }); cave(S);
  plist(S, { x: 100, y: 100, crossed: [0, 1, 3, 4], ticked: [2], t: S.start });
  const sc1 = suitcase(S, 800, 940, 1.1, { open: true });
  const F = daveM(S, 580, 940, "near", { s: 1.1, look: 6, mood: "happy", pose: "hips", helmet: false, pack: false }); jumper(S, F);
  [[ITEM.earplugs, 1000, 910, 0.9], [ITEM.sunscreen, 1110, 890, 0.8], [ITEM.bottle, 1220, 890, 0.8]].forEach(([fn, x, y, k]) => fn(S, x, y, k, fn === ITEM.bottle ? { full: 0 } : {}));
  pot(S, 1400, 940, 1.1, S.start); const sg = sprout(S, 1400, 856, 1.1, S.start);
  DS.frame(S, 330, 650, 150, 110, "sky", "mid");
  DS.vignette(S, 0.2); }
