
// ===================== 5. Week two: the night =====================
// a polar crater in cross-section: low sun on the left grazing the rim, the floor in shadow. o.sun false = no sun
const crater = (S, o = {}) => { DS.setHaze("night");
  const g = S.grp(); S.g.insertBefore(g, S.g.firstChild); const f = (d, fill, op = 1) => S.fill(d, S.start, 0, fill, op, g);
  f(rect(-200, -200, 2320, 1480), DS.vgrad(DS.P.ink[2], DS.mix(DS.P.navy[2], DS.P.ink[2], 0.3)));
  const sky = S.grp(g); stars(S, 70, -100, -100, 2020, 640, { parent: sky, big: 3 });
  earth(S, EX, EY, ER, { night: true, nightA: 20, parent: g });
  const sunG = o.sun === false ? null : sun(S, 150, 560, 60, { parent: g });
  const bowl = "M-200 700 H560 Q760 700 800 800 Q960 900 1120 800 Q1160 700 1360 700 H2120 V1280 H-200 Z";
  f(bowl, DS.vgrad(DS.c("gray", 0), DS.c("gray", 2)));
  f("M560 700 Q760 700 800 800 Q960 900 1120 800 Q1160 700 1360 700 Z", DS.P.ink[2], 0.55);
  S.draw("M-200 700 H560 Q760 700 800 800 Q960 900 1120 800 Q1160 700 1360 700 H2120", S.start, 0, { c: DS.P.ink[0], w: DS.w.near, parent: g });
  return { g, sunG }; };
const jet = (S, x, y, k, parent) => { const g = S.grp(parent);
  [[-1, 0], [1, 0]].forEach(([sd]) => DS.shape(S, `M${x - 40 * k} ${y + 10 * k} L${x + 120 * k} ${y + 120 * k + sd * 0} L${x + 200 * k} ${y + 120 * k} L${x + 110 * k} ${y + 6 * k} Z`, "gray", { tone: 1, w: "mid", parent: g }));
  DS.shape(S, `M${x - 300 * k} ${y} Q${x - 300 * k} ${y - 56 * k} ${x - 220 * k} ${y - 60 * k} H${x + 240 * k} L${x + 340 * k} ${y - 130 * k} L${x + 380 * k} ${y - 130 * k} L${x + 350 * k} ${y} Q${x + 300 * k} ${y + 40 * k} ${x + 200 * k} ${y + 40 * k} H${x - 220 * k} Q${x - 300 * k} ${y + 36 * k} ${x - 300 * k} ${y} Z`, "white", { w: "near", parent: g });
  S.fill(`M${x - 250 * k} ${y - 20 * k} H${x - 150 * k} L${x - 160 * k} ${y - 46 * k} H${x - 230 * k} Q${x - 250 * k} ${y - 40 * k} ${x - 250 * k} ${y - 20 * k} Z`, S.start, 0, DS.c("sky", 2), 1, g);
  for (let i = 0; i < 14; i++) S.fill(circ(x - 110 * k + i * 26 * k, y - 20 * k, 6 * k), S.start, 0, DS.c("sky", 2), 1, g);
  DS.shape(S, rrect(x + 20 * k, y - 82 * k, 90 * k, 30 * k, DS.r.xs), "ink", { tone: 1, w: "detail", parent: g });
  DS.shape(S, rrect(x - 40 * k, y + 40 * k, 80 * k, 36 * k, DS.r.sm), "gray", { tone: 1, w: "mid", parent: g });
  DS.shape(S, rrect(x + 120 * k, y + 40 * k, 80 * k, 36 * k, DS.r.sm), "gray", { tone: 1, w: "mid", parent: g });
  return g; };
const miniBottle = (S, x, y, k, t, parent) => { const g = S.grp(parent); DS.shape(S, rrect(x - 10 * k, y - 18 * k, 20 * k, 40 * k, DS.r.xs * k), "glass", { t, w: "hair", parent: g }); S.fill(rect(x - 9 * k, y + 2 * k, 18 * k, 19 * k), t ?? S.start, 0, DS.c("sky"), 0.9, g); DS.shape(S, rect(x - 5 * k, y - 28 * k, 10 * k, 10 * k), "blue", { t, w: "hair", parent: g }); return g; };
const balance = (S, cx, cy, t, parent) => { const g = S.grp(parent);
  DS.shape(S, `M${cx - 90} ${cy + 330} L${cx} ${cy} L${cx + 90} ${cy + 330} Z`, "wood", { t, w: "near", parent: g });
  DS.shape(S, rect(cx - 340, cy - 12, 680, 24), "gray", { t, w: "near", parent: g });
  [-1, 1].forEach((sd) => { const px = cx + sd * 320; S.draw(`M${px} ${cy + 12} L${px - 90} ${cy + 190} M${px} ${cy + 12} L${px + 90} ${cy + 190}`, t ?? S.start, 0, { c: DS.P.ink[0], w: DS.w.detail, parent: g }); DS.shape(S, `M${px - 130} ${cy + 190} H${px + 130} Q${px + 100} ${cy + 240} ${px} ${cy + 240} Q${px - 100} ${cy + 240} ${px - 130} ${cy + 190} Z`, "gold", { t, w: "mid", parent: g }); });
  return g; };

// Around day fifteen, the sun sets. With no air to hold in the heat, the ground near the equator drops to about minus a hundred and thirty degrees Celsius.
{ const S = sc(37, 0, { cam: "push", focus: "960 640" }); const L = lunar(S, { hy: 640, sun: [960, 540, 70], frost: W(37, 20) });
  tl.fromTo(L.sunG, { y: 0 }, { y: 240, duration: 2.6, ease: "power1.inOut" }, W(37, 3));
  const dim = S.fill(rect(-200, 660, 2320, 700), S.start, 0, DS.P.navy[2], 0.5); tl.fromTo(dim, { opacity: 0 }, { opacity: 0.5, duration: 1.6, ease: "sine.inOut" }, W(37, 6));
  milky(S, 160, 560, 1500, 120, { k: 0.14, n: 110, t: W(37, 6) + 0.6 });
  const dc = card(S, "DAY 15", 700, 190, { t: W(37, 1), size: DS.type.title }); S.hide(dc.g, W(37, 6));
  const F = daveM(S, 700, 940, "near", { s: 1.3, look: 5, mood: "worried", pose: "stand" }); F.face(W(37, 7), "sad", 5); F.setPose(W(37, 8), "cross");
  const th = thermo(S, 1700, 930, 520, "sky", W(37, 18)); level(th, W(37, 20), WE(37, 27) - W(37, 20), 1, 0.12);
  countUp(S, 1300, 520, 120, -130, W(37, 20), WE(37, 27) - W(37, 20), { size: DS.type.title, c: DS.P.white[0], fmt: (n) => Math.round(n) + "°C", ease: "power1.inOut", t0: W(37, 19) });
  card(S, "NO AIR TO HOLD IN THE HEAT", 760, 190, { t: W(37, 7), size: DS.type.small });
  DS.vignette(S, 0.2); }

// Dave puts on his warm jumper. It is not warm enough.
{ const S = sc(38, 0, { cam: "push", focus: "960 640" }); lunar(S, { night: true });
  plist(S, { crossed: [0, 1], cross: [[2, W(38, 8)]] });
  const F = daveM(S, 880, 940, "near", { s: 1.4, look: 5, mood: "smile", pose: "armsUp" });
  const big = ITEM.jumper(S, 1380, 640, 2.2, { t: T0(S) }); tl.to(big, { opacity: 0, duration: 0.4 }, W(38, 4) + 0.2);
  const wc = card(S, "WARM JUMPER", 1380, 400, { t: W(38, 3), size: DS.type.body }); S.hide(wc.g, W(38, 6));
  jumper(S, F, W(38, 4)); F.setPose(W(38, 4), "stand"); F.face(W(38, 6), "sad", 0); F.setPose(W(38, 7), "cross");
  tl.fromTo(F.g, { x: 0 }, { x: 4, duration: 0.18, ease: "sine.inOut", yoyo: true, repeat: Math.ceil((S.end - W(38, 6)) / 0.18) }, W(38, 6));
  flakes(S, F.cx, F.hd[1] + 90, 7, W(38, 6) + 0.2);
  const th = thermo(S, 1700, 930, 360, "sky", W(38, 6)); level(th, S.start, 0.01, 0.12, 0.12); card(S, "-130°C", 1700, 480, { t: W(38, 7), size: DS.type.body });
  DS.vignette(S, 0.2); }

// Dave's water bottle is now a block of ice.
{ const S = sc(39, 0, { cam: "push", focus: "960 640" }); lunar(S, { night: true });
  plist(S, { crossed: [0, 1, 2], cross: [[3, W(39, 6)]] });
  daveM(S, 600, 940, "near", { s: 1.4, look: 6, mood: "sad", pose: "reach" });
  const b = ITEM.bottle(S, 1250, 640, 2.4, { t: T0(S) });
  const ice = S.grp(); S.fill(`M${1250 - 66} ${640 - 40} Q${1250 - 70} ${640 - 120} ${1250 - 38} ${640 - 150} H${1250 + 38} Q${1250 + 70} ${640 - 120} ${1250 + 66} ${640 - 40} V${640 + 180} Q${1250} ${640 + 210} ${1250 - 66} ${640 + 180} Z`, S.start, 0, DS.c("sky", 1), 0.85, ice);
  [[-30, -80, 50, 40], [10, 0, 40, -30], [-40, 80, 60, 20], [20, 130, 30, -40]].forEach(([a, c, d, e]) => S.draw(line([1250 + a, 640 + c], [1250 + a + d, 640 + c + e], 0), S.start, 0, { c: DS.P.white[0], w: DS.w.mid, parent: ice }));
  fadeG(S, ice, W(39, 5)); card(S, "A BLOCK OF ICE", 1250, 330, { t: W(39, 6), size: DS.type.body });
  DS.vignette(S, 0.2); }

// And that, it turns out, is how the Moon keeps its water.
{ const S = sc(39, 9, { cam: "pull" }); space(S, { milky: [200, 900, 1700, 120] });
  moon(S, 960, 580, 280, { glow: false });
  const cp = clipG(S, circ(960, 580, 278)); [[960, 330, 150, 46], [960, 830, 130, 40]].forEach(([x, y, rx, ry]) => { S.fill(circ(x, y, rx, ry), S.start, 0, DS.c("sky", 1), 0.95, cp); });
  card(S, "THE MOON KEEPS ITS WATER AS ICE", 960, 150, { t: W(39, 14), size: DS.type.small });
  S.arrow(1360, 300, 1100, 340, W(39, 16), 0.4, { c: DS.P.white[0], w: DS.w.near }); card(S, "ICE", 1480, 290, { t: W(39, 16), size: DS.type.body });
  DS.vignette(S, 0.2); }

// Near the poles, the Sun stays so low that some crater floors never see sunlight.
{ const S = sc(40, 0, { cam: "push", focus: "960 700" }); const C = crater(S);
  [[560, 700], [1360, 700]].forEach(([x, y], i) => dashed(S.draw(line([210, 575], [x, y - 8], 0), W(40, 4) + i * 0.3, 0, { c: DS.c("yellow", 1), w: DS.w.mid, op: 0.8 }), 0.04, 0.025));
  dashed(S.draw(line([560, 692], [1360, 692], 0), W(40, 5), 0, { c: DS.c("yellow", 1), w: DS.w.mid, op: 0.8 }), 0.04, 0.025);
  card(S, "NEAR THE POLES", 700, 190, { t: W(40, 1), size: DS.type.title }); card(S, "NEVER SEES SUNLIGHT", 960, 960 - 60, { t: W(40, 11), size: DS.type.small });
  DS.vignette(S, 0.2); }

// Down there, the warmest it ever gets is about minus a hundred and fifty-seven degrees.
{ const S = sc(40, 15, { cam: "push", focus: "960 700" }); crater(S, { sun: false });
  const th = thermo(S, 960, 880, 280, "sky", S.start); level(th, S.start, 0.01, 0.2, 0.2);
  card(S, "WARMEST: ABOUT -157°C", 960, 420, { t: W(40, 18), size: DS.type.body });
  DS.vignette(S, 0.2); }

// In two thousand nine, NASA crashed part of a rocket into one of those craters on purpose, and found water ice in the debris.
{ const S = sc(41, 0, { cam: "push", focus: "960 700" }); crater(S, { sun: false });
  card(S, "2009", 600, 190, { t: W(41, 1), size: DS.type.title });
  const rk = S.grp(); DS.shape(S, rrect(930, 120, 60, 200, DS.r.sm), "gray", { tone: 1, w: "near", parent: rk }); DS.shape(S, `M930 320 L920 360 H1000 L990 320 Z`, "gray", { tone: 2, w: "mid", parent: rk }); DS.shape(S, `M930 120 Q960 70 990 120 Z`, "gray", { w: "mid", parent: rk });
  tl.fromTo(rk, { y: -330 }, { y: 440, duration: WE(41, 9) - W(41, 5), ease: "power1.in" }, W(41, 5)); tl.set(rk, { opacity: 0 }, WE(41, 9) + 0.02);
  const pl = dustCloud(S, 960, 780, 1.2, undefined); tl.fromTo(pl, { opacity: 0, y: 40, scale: 0.4, svgOrigin: "960 800" }, { opacity: 0.95, y: -120, scale: 1.2, svgOrigin: "960 800", duration: 2.2, ease: "power1.out" }, WE(41, 9) + 0.05);
  const ic = S.grp(); for (let i = 0; i < 9; i++) { const x = 840 + i * 30, y = 640 - (i % 3) * 60; S.draw(rays(x, y, 5, 16, 6, 0), S.start, 0, { c: DS.c("sky", 1), w: DS.w.mid, parent: ic }); }
  tl.fromTo(ic, { opacity: 0, y: 60 }, { opacity: 1, y: -80, duration: 2.6, ease: "power1.out" }, W(41, 19));
  card(S, "WATER ICE IN THE DEBRIS", 1300, 500, { t: W(41, 19), size: DS.type.small });
  DS.vignette(S, 0.2); }

// Away from the poles, it's far drier.
{ const S = sc(42, 0, { cam: "push", focus: "960 700" }); lunar(S, { sun: [960, 170, 60] });
  [[300, 840, 220], [820, 900, 260], [1400, 860, 240], [1700, 940, 160]].forEach(([x, y, w], i) => { S.draw(`M${x - w / 2} ${y} L${x - w / 6} ${y - 14} L${x} ${y + 8} L${x + w / 5} ${y - 12} L${x + w / 2} ${y + 6} M${x - w / 6} ${y - 14} L${x - w / 4} ${y + 24} M${x} ${y + 8} L${x + 20} ${y + 36}`, S.start, 0, { c: DS.c("gray", 2), w: DS.w.mid }); });
  const dr = S.grp(); S.fill(`M960 300 Q1060 400 960 470 Q860 400 960 300 Z`, S.start, 0, DS.c("sky", 1), 1, dr); S.draw(line([880, 300], [1040, 480], 0), W(42, 4), 0, { c: DS.c("red"), w: DS.w.near * 1.6, parent: dr });
  card(S, "FAR DRIER", 960, 600, { t: W(42, 4), size: DS.type.title });
  DS.vignette(S, 0.2); }

// In twenty twenty, a telescope flying in a jumbo jet
{ const S = sc(42, 7, { cam: "push", focus: "960 540" }); DS.outdoor(S, { hy: 840, sun: [260, 180] });
  const jg = jet(S, 760, 520, 1.5); tl.fromTo(jg, { x: -120 }, { x: 160, duration: S.len, ease: "none" }, S.start);
  card(S, "2020", 560, 190, { t: W(42, 8), size: DS.type.title }); card(S, "A TELESCOPE IN A JUMBO JET", 1260, 190, { t: W(42, 10), size: DS.type.small });
  DS.vignette(S, 0.2); }

// ... found about one small bottle of water per cubic metre of sunlit soil.
{ const S = sc(42, 17, { cam: "push", focus: "960 600" }); DS.room(S, ROOM2);
  const cb = cube(S, 700, 600, 260, "earth", S.start);
  S.arrow(420, 700, 420, 450, W(42, 24), 0.4, { c: DS.c("red"), w: DS.w.near }); card(S, "1 m", 360, 580, { t: W(42, 24), size: DS.type.caption });
  card(S, "ONE CUBIC METRE OF SUNLIT SOIL", 700, 200, { t: W(42, 24), size: DS.type.small });
  const b = ITEM.bottle(S, 1400, 640, 1.8, { t: W(42, 19) }); fadeG(S, b, W(42, 19)); card(S, "ABOUT ONE SMALL BOTTLE", 1400, 880, { t: W(42, 21), size: DS.type.small });
  DS.vignette(S, 0.2); }

// The Sahara has about a hundred times more.
{ const S = sc(43, 0, { cam: "push", focus: "960 600" }); DS.outdoor(S, { hy: 560, ground: "sand", hills: "sand", sun: [1500, 180] });
  const b = ITEM.bottle(S, 420, 700, 1.4, { t: T0(S) }); card(S, "MOON: ONE", 420, 880, { t: S.start, size: DS.type.small });
  const gg = S.grp(); for (let i = 0; i < 100; i++) miniBottle(S, 880 + (i % 10) * 82, 560 + Math.floor(i / 10) * 74, 1.5, undefined, gg);
  fadeG(S, gg, W(43, 2)); card(S, "SAHARA: ABOUT 100 ×", 1260, 200, { t: W(43, 3), size: DS.type.body });
  DS.vignette(S, 0.2); }

// So Dave's one bottle of water is worth about a cubic metre of Moon.
{ const S = sc(43, 8, { cam: "push", focus: "960 600" }); DS.room(S, ROOM2);
  balance(S, 960, 470, S.start);
  ITEM.bottle(S, 640, 560, 1.2, { t: T0(S) }); cube(S, 1280, 506, 110, "gray", T0(S));
  card(S, "ONE BOTTLE = ABOUT ONE CUBIC METRE OF MOON", 960, 190, { t: W(43, 15), size: DS.type.small });
  DS.vignette(S, 0.2); }
