// look: still
// You Are Not Weird (1-min, ~70 s). Mystery: where is the normal person Dave can copy? Illustrated stills, progressive changes on the spoken word.
const dave = (S, x, gy, layer = "near", o = {}) => DS.figure(S, x, gy, layer, Object.assign({ s: 1.1, hair: "side", hairC: DS.c("brown"), outfitC: DS.c("blue") }, o));
const kevin = (S, x, gy, layer = "near", o = {}) => DS.figure(S, x, gy, layer, Object.assign({ s: 1.1, hair: "spiky", hairC: DS.c("ink"), outfitC: DS.c("green") }, o));
const GUESTS = [["curly", "brown", "pink"], ["bun", "ink", "purple"], ["short", "brown", "orange"], ["messy", "gold", "sky"], ["side", "ink", "yellow"]];
const guest = (S, i, x, gy, layer = "mid", o = {}) => { const [hair, hc, oc] = GUESTS[i % GUESTS.length]; return DS.figure(S, x, gy, layer, Object.assign({ s: 1.1, hair, hairC: DS.c(hc, 0, layer), outfitC: DS.c(oc, 0, layer), mood: "smile" }, o)); };
const cup = (S, F, side, o = {}) => { const [hx, hy] = F.hand(side); DS.shape(S, rrect(hx - 18 * F.s, hy - 40 * F.s, 36 * F.s, 46 * F.s, DS.r.xs), o.color || "orange", { t: o.t, w: "detail" }); };
const bunting = (S, x0, x1, y) => {
  const mid = (x0 + x1) / 2, half = (x1 - x0) / 2, yy = (x) => y + 50 * (1 - ((x - mid) / half) ** 2);
  S.draw(smooth([[x0, y], [mid, y + 50], [x1, y]]), S.start, 0, { c: DS.line("mid"), w: DS.w.detail });
  for (let i = 1; i < 12; i++) { const x = x0 + (i * (x1 - x0)) / 12, a = yy(x); DS.shape(S, `M${x - 26} ${a} L${x + 26} ${a} L${x} ${a + 52} Z`, ["yellow", "sky", "pink"][i % 3], { layer: "mid", w: "hair", flat: true }); }
};
const PARTY = { wall: "dusk", floor: "wood", window: false };
// dashed outline of a person who isn't there (no fill, grey, dashes in px)
const dashed = (p) => { p.removeAttribute("pathLength"); p.setAttribute("stroke-dasharray", `${DS.sp(2)} ${DS.sp(1.5)}`); return p; };
const ghost = (S, x, gy, k, o = {}) => {
  const t = o.t ?? S.start, g = S.grp(), c = DS.c("gray", 2), w = DS.w.near;
  const hip = [x, gy - 130 * k], sh = [x, hip[1] - 125 * k], hd = [x, sh[1] - 54 * k], r = 50 * k, ar = [x, sh[1] + 16 * k];
  const arms = o.hips ? [[[-46, 45], [-12, 96]], [[46, 45], [12, 96]]] : [[[-28, 52], [-48, 100]], [[28, 52], [48, 100]]];
  const parts = [circ(hd[0], hd[1], r), line([x, hd[1] + r], hip, 0), poly([hip, [x - 35 * k, gy]], 0), poly([hip, [x + 35 * k, gy]], 0), ...arms.map((a) => poly([ar, ...a.map(([dx, dy]) => [ar[0] + dx * k, ar[1] + dy * k])], 0))];
  parts.forEach((d) => dashed(S.draw(d, t, 0, { c, w, parent: g })));
  return g;
};
const bubbleText = (S, str, cx, cy, rx, ry, tx, ty, t, size = DS.type.small, kind = "speech") => { S[kind](cx, cy, rx, ry, tx, ty, t, 0.25); S.text(str, cx, cy + size * 0.36, { size, t, c: DS.c("ink") }); };

const CUES = [[1, 0], [4, 0], [6, 0], [10, 0], [12, 0], [14, 0], [16, 0], [19, 0], [22, 0], [25, 0], [29, 0], [31, 0], [33, 0], [36, 0], [38, 0], [41, 0]];
const WIN = sceneWindows(CUES, 0.15);
const sc = (k, o) => scene(WIN[k][0], WIN[k][1], o);

// 0  This is Dave. / At parties, he stands in the corner, / sure he's the weird one.
{ const S = sc(0, { cam: "push", focus: "700 640" }); DS.room(S, PARTY); bunting(S, 400, 1520, 120);
  guest(S, 0, 960, 800); guest(S, 1, 1130, 800, "mid", { mood: "happy", look: -6 }); guest(S, 2, 1300, 800, "mid", { look: -6 });
  const F = dave(S, 400, 960, "near", { s: 0.85, mood: "worried", look: 6, pose: "hold" }); cup(S, F, "R");
  DS.card(S, "DAVE", 400, 520, { size: DS.type.body, t: W(1, 2) });
  DS.card(S, "THE WEIRD ONE?", 960, 300, { size: DS.type.body, t: W(3, 0), tc: "red" });
  DS.plant(S, 1810, 1120, 1.0, -1); DS.vignette(S); }

// 1  Everyone else looks normal. / Especially Kevin.
{ const S = sc(1, { cam: "push", focus: "1150 600" }); DS.room(S, PARTY); bunting(S, 400, 1520, 120);
  guest(S, 0, 620, 800); guest(S, 1, 790, 800, "mid", { mood: "happy" }); guest(S, 3, 1500, 800, "mid", { look: -6 });
  dave(S, 230, 800, "mid", { s: 0.85, mood: "worried", look: 6 });
  S.fill(circ(1150, 640, 260, 300), W(5, 0), 0.4, DS.c("gold", 1), 0.45);
  const K = kevin(S, 1150, 960, "near", { s: 1.15, mood: "happy", pose: "wave" }); cup(S, K, "L", { color: "red" });
  DS.card(S, "NORMAL", 700, 330, { size: DS.type.body, t: W(4, 3) });
  DS.card(S, "KEVIN", 1150, 230, { size: DS.type.body, t: W(5, 0), tc: "green" }); DS.vignette(S); }

// 2  Dave's plan: / copy Kevin. / But is Kevin normal? / Is anyone?
{ const S = sc(2); DS.room(S, { window: false });
  const F = dave(S, 460, 960, "near", { mood: "determined", look: 6, pose: "think" });
  S.thought(1180, 560, 400, 230, 640, 600, W(6, 0), 0.3);
  S.text("PLAN:", 1180, 520, { size: DS.type.small, t: W(6, 1), c: DS.c("ink") });
  S.text("COPY KEVIN", 1180, 610, { size: DS.type.title, t: W(7, 0), c: DS.c("green", 2) });
  DS.card(S, "IS KEVIN NORMAL?", 960, 170, { size: DS.type.body, t: W(8, 3) });
  F.face(W(9, 1), "worried", 6);
  DS.card(S, "IS ANYONE?", 1180, 860, { size: DS.type.small, t: W(9, 1), tc: "red" }); DS.vignette(S); }

// 3  In 1950, the Air Force's Gilbert Daniels measured 4,063 pilots, / to find the normal one.
{ const S = sc(3, { cam: "pull" }); const O = DS.outdoor(S, { hy: 640, sky: "sky", sun: [1600, 170], ground: "gray", hills: "grass" });
  DS.shape(S, `M200 640 V430 Q520 250 840 430 V640 Z`, "gray", { layer: "far" }); DS.shape(S, rect(420, 500, 200, 140), "navy", { layer: "far", flat: true });
  [700, 860, 1020, 1180, 1340, 1500].forEach((x, i) => DS.figure(S, x, 880, "mid", { s: 1.1, hair: ["short", "side", "messy", "short", "curly", "spiky"][i], hairC: DS.c(["brown", "ink", "gold", "ink", "brown", "brown"][i], 0, "mid"), outfitC: DS.c("green", 2, "mid"), mood: "flat", t: W(10, 9) + i * 0.08 }));
  S.ruler(500, 880, 380, W(10, 8), 0.3, { labels: [[0.5, "5 FT"], [1, "6 FT"]] });
  DS.card(S, "1950 · GILBERT DANIELS", 960, 140, { size: DS.type.small, t: W(10, 6) });
  DS.card(S, "4,063 PILOTS", 1450, 270, { size: DS.type.body, t: W(10, 9), tc: "red" });
  DS.card(S, "FIND THE NORMAL ONE", 1400, 400, { size: DS.type.small, t: W(11, 3) }); DS.vignette(S); }

// 4  Average meant the middle thirty percent. / Generous.
{ const S = sc(4, { cam: "push" }); DS.room(S, { wall: "glass", floor: "gray", window: false });
  DS.drop(S, rrect(366, 228, 1200, 600, DS.r.md)); DS.shape(S, rrect(360, 220, 1200, 600, DS.r.md), "white", { flat: true, w: "detail" });
  const base = 740, mx = 960, sd = 170, h = 420, curve = (a, b) => Array.from({ length: 41 }, (_, i) => { const x = a + ((b - a) * i) / 40; return [x, base - h * Math.exp(-(((x - mx) / sd) ** 2) / 2)]; });
  const band = 0.39 * sd;
  S.fill(`M${mx - band} ${base} ` + curve(mx - band, mx + band).map((p) => `L${p[0]} ${p[1]}`).join(" ") + ` L${mx + band} ${base} Z`, W(12, 3), 0.4, DS.c("green", 1), 0.9);
  S.draw(smooth(curve(460, 1460)), S.start, 0, { c: DS.c("ink"), w: DS.w.mid });
  S.draw(line([440, base], [1480, base], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.detail });
  S.text("SHORT", 520, 790, { size: DS.type.caption, c: DS.c("ink") }); S.text("TALL", 1400, 790, { size: DS.type.caption, c: DS.c("ink") });
  DS.card(S, "AVERAGE = MIDDLE 30%", 960, 140, { size: DS.type.small, t: W(12, 3) });
  DS.card(S, "GENEROUS", 960, 900, { size: DS.type.body, t: W(13, 0), tc: "green" }); }

// 5  Pilots average on all ten body sizes: / zero.
{ const S = sc(5, { cam: "zoom", focus: "960 420" }); DS.outdoor(S, { hy: 640, sky: "sky", sun: [1600, 170], ground: "gray", hills: "grass" });
  [520, 700, 880, 1040, 1220, 1400].forEach((x, i) => DS.figure(S, x, 900, "mid", { s: 1.1, hair: ["short", "side", "messy", "short", "curly", "spiky"][i], hairC: DS.c(["brown", "ink", "gold", "ink", "brown", "brown"][i], 0, "mid"), outfitC: DS.c("green", 2, "mid"), mood: "worried", look: i % 2 ? 4 : -4 }));
  DS.card(S, "AVERAGE ON ALL 10 SIZES", 960, 150, { size: DS.type.body, t: W(14, 2) });
  DS.drop(S, rrect(806, 236, 300, 240, DS.r.lg), { t: W(15, 0) });
  DS.shape(S, rrect(800, 230, 300, 240, DS.r.lg), "white", { t: W(15, 0), flat: true, w: "detail" });
  S.text("0", 950, 400, { size: DS.type.display, t: W(15, 0), c: DS.c("red") }); DS.vignette(S); }

// 6  The cockpit was built / for a man who didn't exist. / So the Air Force made the seats adjustable.
{ const S = sc(6, { cam: "push", focus: "900 600" }); DS.outdoor(S, { hy: 900, sky: "sky", sun: [300, 200], ground: "gray", hills: "sky" });
  DS.shape(S, `M-200 120 Q960 -60 2120 120 L2120 170 Q960 0 -200 170 Z`, "gray", { w: "mid" });                 // canopy frame
  DS.shape(S, rect(-200, 900, 2320, 300), "navy", { flat: true });                                             // cockpit floor
  DS.shape(S, rrect(1260, 470, 380, 280, DS.r.sm), "navy"); [[1340, 560], [1450, 560], [1560, 560]].forEach(([x, y]) => { DS.shape(S, circ(x, y, 40), "white", { w: "detail", flat: true }); S.draw(line([x, y], [x + 22, y - 22], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.detail }); });
  S.draw(line([1100, 900], [1080, 700], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.near }); DS.shape(S, circ(1080, 690, 22), "ink");
  DS.shape(S, rrect(640, 380, 120, 420, DS.r.sm), "gray"); DS.shape(S, rrect(640, 770, 380, 70, DS.r.sm), "gray"); DS.shape(S, rect(800, 840, 60, 60), "gray", { w: "mid" });
  const g = S.grp(), c = DS.c("ink", 1);
  [circ(840, 465, 55), line([840, 520], [850, 750], 0), poly([[850, 750], [1010, 745], [1040, 900]], 0), poly([[842, 570], [960, 650], [1070, 690]], 0)].forEach((d) => dashed(S.draw(d, W(16, 1), 0, { c, w: DS.w.near, parent: g })));
  DS.card(S, "AVERAGE MAN", 840, 300, { size: DS.type.small, t: W(16, 1) });
  tl.to(g, { opacity: 0.12, duration: 0.5 }, W(17, 4));
  S.arrow(570, 720, 570, 430, W(18, 5), 0.3, { c: DS.c("green", 2), w: DS.w.near }); S.arrow(570, 430, 570, 740, W(18, 5), 0.3, { c: DS.c("green", 2), w: DS.w.near });
  S.arrow(700, 940, 1000, 940, W(18, 5), 0.3, { c: DS.c("green", 1), w: DS.w.near });
  DS.card(S, "ADJUSTABLE", 1440, 300, { size: DS.type.body, t: W(18, 5), tc: "green" }); DS.vignette(S); }

// 7  Okay, fine, that's bodies. / But everyone here is relaxed. / Except me.
{ const S = sc(7, { cam: "push", focus: "500 600" }); DS.room(S, PARTY); bunting(S, 400, 1520, 120);
  guest(S, 0, 900, 800, "mid", { mood: "happy" }); guest(S, 2, 1070, 800); guest(S, 3, 1240, 800, "mid", { mood: "happy", look: -6 }); guest(S, 4, 1420, 800, "mid", { look: -6 });
  const F = dave(S, 420, 960, "near", { s: 0.85, mood: "flat", look: 6, pose: "shrug" });
  bubbleText(S, "FINE. THAT'S BODIES.", 520, 260, 330, 80, 450, 560, W(19, 0));
  DS.card(S, "RELAXED", 1160, 380, { size: DS.type.body, t: W(20, 4), tc: "green" });
  F.setPose(W(21, 0), "sad"); F.face(W(21, 0), "sad", 6);
  DS.card(S, "EXCEPT ME", 700, 640, { size: DS.type.small, t: W(21, 0) }); DS.vignette(S); }

// 8  In 1993, Deborah Prentice asked Princeton students: / how comfortable are you with campus drinking? / And the average student?
{ const S = sc(8, { cam: "pull" }); DS.outdoor(S, { hy: 660, sky: "sky", sun: [1650, 160], ground: "grass", path: [700, 1220] });
  DS.shape(S, rect(240, 380, 760, 290), "sand", { layer: "far", dir: "v" }); DS.shape(S, rect(530, 200, 180, 190), "sand", { layer: "far", dir: "v" }); DS.shape(S, `M510 210 L620 110 L730 210 Z`, "brown", { layer: "far" });
  [300, 420, 540, 700, 820, 940].forEach((x) => DS.shape(S, `M${x - 30} 640 V520 Q${x} 470 ${x + 30} 520 V640 Z`, "navy", { layer: "far", flat: true, w: "far" }));
  guest(S, 1, 360, 900, "near", { s: 0.95, look: 6, mood: "flat" }); guest(S, 4, 560, 920, "near", { s: 0.95, look: 6, mood: "worried" });
  DS.drop(S, rect(1060, 300, 680, 560), { t: W(23, 0) }); DS.shape(S, rect(1054, 292, 680, 560), "white", { t: W(23, 0), flat: true, w: "detail" });
  const row = (label, y, t) => { S.text(label, 1394, y, { size: DS.type.small, t, c: DS.c("ink") }); S.draw(line([1120, y + 80], [1670, y + 80], 0), t, 0, { c: DS.c("ink"), w: DS.w.detail }); [0, 1, 2, 3, 4, 5].forEach((i) => S.draw(line([1120 + i * 110, y + 64], [1120 + i * 110, y + 96], 0), t, 0, { c: DS.c("ink"), w: DS.w.detail })); };
  S.text("HOW COMFORTABLE?", 1394, 360, { size: DS.type.caption, t: W(23, 0), c: DS.c("red") });
  row("YOU", 470, W(23, 3)); row("AVERAGE STUDENT", 680, W(24, 2));
  DS.card(S, "1993 · DEBORAH PRENTICE", 640, 140, { size: DS.type.small, t: W(22, 4) });
  DS.card(S, "PRINCETON", 620, 300, { size: DS.type.caption, t: W(22, 6) }); DS.vignette(S); }

// 9  Students said: / less comfortable than average. / A neat trick. / They were the average student.
{ const S = sc(9, { cam: "push" }); DS.room(S, { window: false });
  S.draw(line([420, 800], [1500, 800], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.mid });
  const bar = (x, h, name, label, t) => { DS.shape(S, rect(x, 800 - h, 260, h), name, { t, dir: "h" }); S.text(label, x + 130, 800 - h - 28, { size: DS.type.small, t, c: DS.c("ink") }); };
  bar(1120, 470, "gray", "AVERAGE STUDENT", W(26, 3)); bar(560, 300, "purple", "YOU", W(26, 0));
  S.arrow(840, 640, 1100, 640, W(28, 1), 0.3, { c: DS.c("red"), w: DS.w.near });
  DS.card(S, "SAME PEOPLE", 960, 900, { size: DS.type.small, t: W(28, 3), tc: "red" });
  DS.card(S, "A NEAT TRICK", 960, 150, { size: DS.type.body, t: W(27, 1) }); }

// 10  Everyone hid it, / so everyone felt weird.
{ const S = sc(10, { cam: "pull" }); DS.room(S, PARTY); bunting(S, 400, 1520, 120);
  [[560, 0], [820, 1], [1100, 2], [1360, 3]].forEach(([x, i], k) => {
    const F = guest(S, i, x, 920, "near", { s: 0.9, mood: k % 2 ? "happy" : "smile", look: k % 2 ? -6 : 6 });
    S.thought(x + 40, 450, 70, 60, x + 10, 570, W(29, 2) + k * 0.12, 0.25); S.text("?", x + 40, 472, { size: DS.type.body, t: W(29, 2) + k * 0.12, c: DS.c("red") });
  });
  DS.card(S, "EVERYONE FELT WEIRD", 960, 270, { size: DS.type.body, t: W(30, 0) }); DS.vignette(S); }

// 11  Kevin, laughing too loud, / thinks Dave looks relaxed.
{ const S = sc(11, { cam: "push", focus: "1100 600" }); DS.room(S, PARTY); bunting(S, 400, 1520, 120);
  dave(S, 300, 800, "mid", { s: 0.85, mood: "flat", look: 6 });
  const K = kevin(S, 1120, 960, "near", { s: 1.15, mood: "happy", look: -6, pose: "armsUp" });
  K.setPose(W(32, 0), "hold"); K.face(W(32, 0), "worried", -6);
  bubbleText(S, "HE LOOKS SO RELAXED", 700, 330, 400, 100, 980, 520, W(32, 0), DS.type.small, "thought");
  DS.card(S, "KEVIN", 1450, 400, { size: DS.type.body, tc: "green" }); DS.vignette(S); }

// 12  No normal person. / Just a room of people / copying someone who isn't there.
{ const S = sc(12, { cam: "zoom", focus: "960 560" }); DS.room(S, PARTY); bunting(S, 400, 1520, 120);
  const F = [[460, 0, 6], [680, 1, 6], [1240, 2, -6], [1460, 3, -6]].map(([x, i, look]) => guest(S, i, x, 930, "near", { s: 0.9, mood: "flat", look }));
  DS.shadow(S, 960, 830, 120); ghost(S, 960, 830, 0.9, { hips: true });
  DS.card(S, "NORMAL PERSON", 960, 250, { size: DS.type.body, t: W(33, 1) });
  F.forEach((f, k) => f.setPose(W(35, 0) + k * 0.1, "hips"));
  DS.card(S, "NOT THERE", 960, 400, { size: DS.type.small, t: W(35, 3), tc: "red" }); DS.vignette(S); }

// 13  When Princeton freshmen talked it out, / the fake normal lost its grip.
{ const S = sc(13, { cam: "pull" }); DS.room(S, { window: [1340, 170, 230, 230] }); DS.rug(S, 960, 900, 1100, "sky");
  [[560, 1, 6], [800, 2, 6], [1120, 4, -6], [1360, 0, -6]].forEach(([x, i, look], k) => guest(S, i, x, 920, "near", { s: 0.9, mood: k % 2 ? "smile" : "happy", look }));
  S.speech(680, 330, 120, 60, 640, 470, W(36, 4), 0.25); S.text("ME TOO", 680, 345, { size: DS.type.caption, t: W(36, 4), c: DS.c("ink") });
  S.speech(1240, 330, 150, 60, 1200, 470, W(36, 5), 0.25); S.text("SAME HERE", 1240, 345, { size: DS.type.caption, t: W(36, 5), c: DS.c("ink") });
  DS.card(S, "PRINCETON FRESHMEN", 960, 140, { size: DS.type.small, t: W(36, 1) });
  DS.card(S, "FAKE NORMAL", 960, 520, { size: DS.type.body, t: W(37, 1) });
  S.draw(line([740, 560], [1180, 480], 0), W(37, 3), 0, { c: DS.c("red"), w: DS.w.near }); }

// 14  So Dave turns to Kevin: / "Is it just me?" / "Oh, thank goodness."
{ const S = sc(14, { cam: "push", focus: "700 600" }); DS.room(S, PARTY); bunting(S, 400, 1520, 120);
  guest(S, 0, 1250, 800); guest(S, 2, 1420, 800, "mid", { mood: "happy", look: -6 });
  const D = dave(S, 440, 960, "near", { s: 0.95, mood: "flat", look: -2, pose: "hold" }); cup(S, D, "R");
  const K = kevin(S, 820, 960, "near", { s: 1.0, mood: "flat", look: -2, pose: "hold" }); cup(S, K, "L", { color: "red" });
  D.face(W(38, 2), "worried", 6);
  bubbleText(S, "IS IT JUST ME?", 380, 300, 290, 80, 430, 560, W(39, 0));
  K.face(W(40, 1), "happy", -6); K.setPose(W(40, 1), "armsUp");
  bubbleText(S, "OH, THANK GOODNESS.", 1040, 250, 360, 80, 860, 520, W(40, 0)); DS.vignette(S); }

// 15  You are not weird. / You're just the first one to say it.
{ const S = sc(15, { cam: "pull" }); DS.room(S, PARTY); bunting(S, 400, 1520, 120);
  guest(S, 0, 1360, 800, "mid", { look: -6 }); guest(S, 1, 1530, 800, "mid", { mood: "happy", look: -6 });
  const D = dave(S, 480, 960, "near", { s: 1.0, mood: "happy", look: 6 }); cup(S, D, "L");
  const K = kevin(S, 820, 960, "near", { s: 1.0, mood: "happy", look: -6 }); cup(S, K, "R", { color: "red" });
  S.fill(circ(650, 640, 420, 330), W(41, 0), 0.4, DS.c("gold", 1), 0.35);
  guest(S, 3, 1060, 960, "near", { s: 0.95, mood: "smile", look: -6, pose: "wave", t: W(42, 3) });
  DS.card(S, "YOU ARE NOT WEIRD", 960, 170, { size: DS.type.body, t: W(41, 0), tc: "green" }); DS.vignette(S); }
