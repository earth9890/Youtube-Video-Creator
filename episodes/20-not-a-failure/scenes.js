// look: still
// You Are Not a Failure (1-min, 70 s). Mystery: can one "no" tell you what you are? Illustrated stills, progressive changes on the spoken word.
const dave = (S, x, gy, layer = "near", o = {}) => DS.figure(S, x, gy, layer, Object.assign({ s: 1.1, hair: "side", hairC: DS.c("brown"), outfitC: DS.c("blue") }, o));
const sci = (S, x, gy, layer, outfit, o = {}) => DS.figure(S, x, gy, layer, Object.assign({ s: 1.1, hair: "short", hairC: DS.c("ink"), outfitC: DS.c(outfit) }, o));
const desk = (S, x, gy, w) => { DS.shadow(S, x + w / 2, gy, w); DS.shape(S, rrect(x, gy - 230, w, 40, DS.r.xs), "wood"); [x + 30, x + w - 50].forEach((lx) => DS.shape(S, rect(lx, gy - 190, 20, 190), "wood", { w: "mid" })); return gy - 230; };
const paper = (S, x, y, w, h, o = {}) => { DS.drop(S, rect(x + 6, y + 8, w, h), { t: o.t }); DS.shape(S, rect(x, y, w, h), "white", { t: o.t, w: "detail", flat: true }); };
const letter = (S, cx, cy, k, o = {}) => { const w = 150 * k, h = 100 * k; DS.drop(S, rect(cx - w / 2 + 5, cy - h / 2 + 7, w, h), { t: o.t }); DS.shape(S, rect(cx - w / 2, cy - h / 2, w, h), "white", { t: o.t, w: "detail", flat: true }); S.draw(`M${cx - w / 2} ${cy - h / 2} L${cx} ${cy + h * 0.1} L${cx + w / 2} ${cy - h / 2}`, o.t ?? S.start, 0, { c: DS.c("ink"), w: DS.w.detail }); if (o.mark) S.fill(circ(cx, cy + h * 0.25, 14 * k), o.t ?? S.start, 0.3, DS.c(o.mark), 1); };
const vac = (S, x, gy, k, name, o = {}) => { const t = o.t, L = o.layer || "near"; DS.shadow(S, x, gy, 120 * k, { t }); DS.shape(S, rrect(x - 55 * k, gy - 36 * k, 110 * k, 36 * k, DS.r.sm), name, { t, layer: L }); DS.shape(S, rrect(x - 34 * k, gy - 200 * k, 68 * k, 160 * k, DS.r.sm), "glass", { t, layer: L, w: "detail" }); [0, 1, 2].forEach((i) => S.draw(`M${x - 24 * k} ${gy - (170 - i * 40) * k} Q${x} ${gy - (150 - i * 40) * k} ${x + 24 * k} ${gy - (170 - i * 40) * k}`, t ?? S.start, 0, { c: DS.c("gray", 2, L), w: DS.w.hair })); DS.shape(S, rrect(x - 12 * k, gy - 330 * k, 24 * k, 136 * k, DS.r.xs), name, { t, layer: L, w: "detail" }); DS.shape(S, rrect(x - 30 * k, gy - 350 * k, 60 * k, 26 * k, DS.r.xs), name, { t, layer: L, w: "detail" }); };
const bar = (S, x, base, h, w, name, t, label) => { DS.shape(S, rect(x, base - h, w, h), name, { t, dir: "h" }); S.text(label, x + w / 2, base - h - 24, { size: DS.type.body, t, c: DS.c("ink") }); };
const block = (S, x, top, w, gy, name) => { DS.shadow(S, x + w / 2, gy, w); DS.shape(S, rect(x, top, w, gy - top), name, { layer: "mid", dir: "h" }); };

const CUES = [[1, 0], [4, 0], [8, 0], [11, 0], [13, 0], [15, 0], [17, 0], [19, 0], [22, 0], [24, 0], [27, 0], [32, 0], [36, 0], [38, 0], [40, 0]];
const WIN = sceneWindows(CUES, 0.15);
const sc = (k, o) => scene(WIN[k][0], WIN[k][1], o);

// 0  This is Dave. / Dave got one email. / It started with "Unfortunately."
{ const S = sc(0, { cam: "push", focus: "960 600" }); DS.room(S, { window: [420, 170, 220, 220] });
  const top = desk(S, 760, 960, 520);
  dave(S, 560, 960, "near", { mood: "smile", look: 6 });
  S.laptop(980, top, 1.0, S.start, 0.3);
  DS.card(S, "DAVE", 560, 230, { size: DS.type.body, t: W(1, 2) });
  letter(S, 975, top - 80, 0.6, { t: W(2, 3) });
  paper(S, 1180, 200, 560, 300, { t: W(3, 2) });
  S.text("Dear Dave,", 1460, 290, { size: DS.type.small, t: W(3, 2), c: DS.c("ink") });
  S.text("Unfortunately...", 1460, 400, { size: DS.type.title, t: W(3, 3), c: DS.c("red", 2) });
  DS.plant(S, 1830, 1120, 1.0, -1); DS.vignette(S); }

// 1  By the full stop, / he'd decided: / "I'm a failure." / Can one "no" tell you what you are?
{ const S = sc(1, { cam: "zoom", focus: "700 640" }); DS.room(S, { wall: "night", floor: "wood", window: false });
  const F = dave(S, 700, 960, "near", { s: 0.85, mood: "sad", look: 4, pose: "sad" });
  letter(S, 1080, 930, 0.7, { mark: "red" });
  DS.card(S, "\"I'M A FAILURE\"", 700, 300, { size: DS.type.body, t: W(6, 0), tc: "red" });
  DS.card(S, "CAN ONE \"NO\" DECIDE?", 1260, 520, { size: DS.type.small, t: W(7, 1) });
  F.face(W(7, 1), "worried", 6); DS.vignette(S, 0.2); }

// 2  The internet's comfort: / James Dyson, 5,127 prototypes / before one vacuum worked.
{ const S = sc(2, { cam: "pull" }); DS.room(S, { wall: "sand", floor: "wood", window: false });
  [300, 470, 640].forEach((y, r) => { DS.shape(S, rect(380, y, 1160, 18), "wood", { layer: "far", w: "far" });
    for (let i = 0; i < 9; i++) vac(S, 440 + i * 130, y, 0.42, "gray", { layer: "far", t: W(9, 2) + (r * 9 + i) * 0.03 }); });
  vac(S, 1500, 960, 1.15, "yellow", { t: W(10, 2) });
  S.tick(1640, 560, 1.1, W(10, 3), 0.25, { c: DS.c("green") });
  DS.card(S, "JAMES DYSON", 960, 150, { size: DS.type.body, t: W(9, 0) });
  DS.card(S, "5,127 PROTOTYPES", 760, 860, { size: DS.type.body, t: W(9, 2), tc: "red" }); DS.vignette(S); }

// 3  "He's a genius. / I'm Dave."
{ const S = sc(3, { cam: "push" }); DS.room(S, { window: [1300, 170, 240, 240] });
  dave(S, 640, 960, "near", { s: 1.2, mood: "flat", look: 0 });
  S.speech(1180, 380, 320, 130, 790, 600, S.start, 0.25);
  S.text("HE'S A GENIUS.", 1180, 370, { size: DS.type.small, t: S.start, c: DS.c("ink") });
  S.text("I'M DAVE.", 1180, 445, { size: DS.type.small, t: W(12, 0), c: DS.c("red") });
  DS.vignette(S); }

// 4  Fair. / Failure stories only come from winners.
{ const S = sc(4); DS.room(S, { wall: "navy", floor: "wood", window: false });
  S.spotlight(720, 90, 950, 240, S.start, 0.3);
  const F = DS.figure(S, 720, 950, "near", { s: 1.1, hair: "short", hairC: DS.c("ink"), outfitC: DS.c("red"), mood: "happy", pose: "armsUp" });
  S.door(1380, 430, 200, 360, S.start, 0.3, { open: true }); DS.card(S, "EXIT", 1480, 370, { size: DS.type.caption });
  [1300, 1220].forEach((x, i) => { const G = DS.figure(S, x, 790, "far", { s: 1.1, outfitC: DS.c("gray"), mood: "sad", look: 6, t: W(14, 0) }); G.walk(W(14, 0) + i * 0.2, 1.4, { x: 140 }); });
  DS.card(S, "TOLD BY WINNERS", 720, 200, { size: DS.type.body, t: W(14, 4) });
  DS.card(S, "THE ONES WHO QUIT?", 1480, 250, { size: DS.type.caption, t: W(14, 2) }); DS.vignette(S, 0.18); }

// 5  To know for sure, you'd reject people at random. / No ethics board allows that.
{ const S = sc(5, { cam: "push" }); DS.room(S, { window: false });
  sci(S, 560, 960, "near", "green", { mood: "flat", look: 6 }); sci(S, 1360, 960, "near", "green", { mood: "flat", look: -6 });
  const C = S.grp(); DS.shape(S, circ(960, 520, 110), "gold", { parent: C }); S.text("?", 960, 560, { size: DS.type.display, c: DS.c("brown"), parent: C });
  S.move(C, W(15, 7), 0.5, { scaleX: -1, svgOrigin: "960 520" }, "power1.inOut");
  DS.card(S, "SAME PERSON, TWICE", 960, 160, { size: DS.type.small, t: W(15, 4) });
  DS.card(S, "ETHICS BOARD: NO", 960, 720, { size: DS.type.small, t: W(16, 1), tc: "red" });
  S.cross(960, 520, 1.3, W(16, 0), 0.25, { c: DS.c("red") }); }

// 6  In twenty nineteen, / Dashun Wang's team found it happened anyway.
{ const S = sc(6, { cam: "zoom", focus: "900 600" }); DS.room(S, { wall: "wall", window: [1320, 170, 220, 220] });
  const top = desk(S, 820, 960, 640);
  [0, 1, 2, 3, 4, 5].forEach((i) => DS.shape(S, rrect(900 + (i % 3) * 150, top - 40 - Math.floor(i / 3) * 44, 130, 40, DS.r.xs), ["orange", "blue", "green"][i % 3], { w: "detail" }));
  sci(S, 560, 960, "near", "purple", { hair: "short", mood: "determined", look: 6, pose: "hold", t: W(18, 0) });
  S.magnifier(1180, 560, 90, W(18, 5), 0.3);
  DS.card(S, "2019 · DASHUN WANG'S TEAM", 960, 150, { size: DS.type.small, t: W(17, 0) });
  DS.card(S, "IT ALREADY HAPPENED", 1180, 380, { size: DS.type.caption, t: W(18, 5), tc: "red" }); DS.vignette(S); }

// 7  Nearly twelve hundred young scientists, / a hair above or below a grant cut-off. / Same records before.
{ const S = sc(7, { cam: "pull" }); DS.room(S, { wall: "glass", floor: "gray", window: false });
  block(S, 300, 700, 600, 960, "blue"); block(S, 1020, 716, 600, 960, "gray");
  [400, 540, 680, 820].forEach((x) => sci(S, x, 700, "mid", "blue", { mood: "flat", look: 6, t: W(19, 1) }));
  [1120, 1260, 1400, 1540].forEach((x) => sci(S, x, 716, "mid", "gray", { mood: "flat", look: -6, t: W(19, 1) }));
  S.draw(line([220, 708], [1700, 708], 0), W(20, 6), 0, { c: DS.c("red"), w: DS.w.mid });
  DS.card(S, "1,184 YOUNG SCIENTISTS", 960, 150, { size: DS.type.small, t: W(19, 1) });
  DS.card(S, "CUT-OFF", 1700, 640, { size: DS.type.caption, t: W(20, 6), tc: "red" });
  DS.card(S, "SAME RECORDS", 960, 860, { size: DS.type.body, t: W(21, 0) }); }

// 8  The ones above got "Congratulations." / The near misses got "Unfortunately."
{ const S = sc(8, { cam: "push" }); DS.room(S, { window: false });
  const A = sci(S, 560, 960, "near", "blue", { mood: "flat", look: 6, pose: "hold" });
  const B = sci(S, 1360, 960, "near", "gray", { mood: "flat", look: -6, pose: "hold" });
  const [ax, ay] = A.hand("R"), [bx, by] = B.hand("L");
  letter(S, ax + 40, ay - 20, 0.6, { mark: "green", t: W(22, 3) }); A.face(W(22, 3), "happy", 6);
  letter(S, bx - 40, by - 20, 0.6, { mark: "red", t: W(23, 3) }); B.face(W(23, 3), "sad", -6);
  DS.card(S, " CONGRATULATIONS ", 560, 300, { size: DS.type.small, t: W(22, 3), tc: "green" });
  DS.card(S, " UNFORTUNATELY ", 1360, 300, { size: DS.type.small, t: W(23, 3), tc: "red" });
  DS.card(S, "NEAR MISS", 1360, 180, { size: DS.type.caption, t: W(23, 1) }); DS.vignette(S); }

// 9  That "no" pushed over one in ten of them / out for good. / "See?"
{ const S = sc(9); DS.room(S, { wall: "night", floor: "wood", window: false });
  S.door(1500, 430, 200, 360, S.start, 0.3, { open: true }); DS.card(S, "EXIT", 1600, 370, { size: DS.type.caption });
  const row = [500, 590, 680, 770, 860, 950, 1040, 1130, 1220, 1310].map((x) => sci(S, x, 800, "mid", "gray", { mood: "flat", look: 6 }));
  row[9].face(W(24, 4), "sad", 6); row[9].walk(W(25, 0), 1.0, { x: 260 }); S.fadeOut(row[9].g, W(25, 2), 0.4);
  DS.card(S, "1 IN 10: GONE FOR GOOD", 960, 170, { size: DS.type.small, t: W(24, 4), tc: "red" });
  dave(S, 300, 940, "near", { s: 1.0, mood: "worried", look: 6, pose: "point" }).face(W(26, 0), "flat", 6);
  S.speech(300, 420, 120, 70, 300, 520, W(26, 0), 0.2); S.text("SEE?", 300, 440, { size: DS.type.small, t: W(26, 0), c: DS.c("ink") }); DS.vignette(S, 0.18); }

// 10  But over ten years, the ones who stayed / landed hit papers a fifth more often / than the winners. / Unfortunately, / for the winners.
{ const S = sc(10, { cam: "push" }); DS.room(S, { window: false });
  S.draw(line([420, 860], [1500, 860], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.mid });
  bar(S, 600, 860, 333, 240, "blue", W(29, 2), "13%"); bar(S, 1080, 860, 403, 240, "green", W(28, 3), "16%");
  S.text("WINNERS", 720, 920, { size: DS.type.caption, c: DS.c("ink") }); S.text("NEAR MISSES", 1200, 920, { size: DS.type.caption, c: DS.c("ink") });
  DS.card(S, "HIT PAPERS (TOP 5%)", 960, 150, { size: DS.type.small, t: W(28, 1) });
  const F = sci(S, 1650, 960, "near", "blue", { mood: "flat", look: -6, t: W(29, 2) });
  F.face(W(30, 0), "wow", -6);
  DS.card(S, "UNFORTUNATELY...", 1560, 330, { size: DS.type.small, t: W(30, 0), tc: "red" }); }

// 11  "Only the tough ones stayed?" / They checked. / Even without the weakest winners, / the near misses came out ahead.
{ const S = sc(11); DS.room(S, { wall: "dusk", floor: "wood", window: false });
  dave(S, 280, 940, "near", { s: 1.0, mood: "worried", look: 6, pose: "think" });
  S.speech(470, 250, 300, 90, 330, 360, S.start, 0.2); S.text("ONLY THE TOUGH ONES?", 470, 268, { size: DS.type.caption, t: S.start, c: DS.c("ink") });
  const win = [760, 860, 960, 1060].map((x) => sci(S, x, 820, "mid", "blue", { mood: "flat", look: 6 }));
  [1340, 1440, 1540, 1640].map((x) => sci(S, x, 820, "mid", "gray", { mood: "flat", look: -6 }));
  [win[0], win[3]].forEach((F) => S.fadeOut(F.g, W(34, 3), 0.4));
  DS.card(S, " WEAKEST WINNERS REMOVED ", 910, 420, { size: DS.type.caption, t: W(34, 3) });
  DS.card(S, " STILL AHEAD ", 1490, 420, { size: DS.type.body, t: W(35, 4), tc: "green" }); }

// 12  One "no" didn't decide who they became. / Staying did.
{ const S = sc(12, { cam: "pull" }); const O = DS.outdoor(S, { hy: 600, sky: "sky", sun: [1500, 200], path: [700, 1220] });
  DS.shadow(S, 960, 930, 60); DS.shape(S, rect(950, 640, 20, 290), "wood");
  DS.shape(S, `M940 660 H760 L720 700 L760 740 H940 Z`, "gray", { w: "detail" }); S.text("LEFT", 840, 718, { size: DS.type.caption, c: DS.c("ink") });
  DS.shape(S, `M980 660 H1160 L1200 700 L1160 740 H980 Z`, "green", { w: "detail" }); S.text("STAYED", 1080, 718, { size: DS.type.caption, c: DS.c("ink") });
  const F = sci(S, 1280, 940, "near", "gray", { mood: "determined", look: 6 });
  F.walk(W(37, 0), 1.6, { x: 220, y: -40 });
  DS.card(S, "ONE \"NO\" DIDN'T DECIDE", 960, 160, { size: DS.type.small, t: W(36, 1) });
  DS.card(S, "STAYING DID.", 1500, 360, { size: DS.type.body, t: W(37, 0), tc: "green" }); DS.vignette(S); }

// 13  Dave isn't a failure. / He's prototype one.
{ const S = sc(13, { cam: "zoom", focus: "800 600" }); DS.room(S, { wall: "sand", floor: "wood", window: [1320, 170, 240, 240] });
  [0, 1, 2, 3, 4, 5].forEach((i) => vac(S, 1220 + i * 90, 760, 0.38, "gray", { layer: "far" }));
  dave(S, 760, 960, "near", { s: 1.2, mood: "flat", look: 6 }).face(W(38, 2), "determined", 6);
  DS.card(S, "NOT A FAILURE", 760, 240, { size: DS.type.body, t: W(38, 2), tc: "green" });
  DS.card(S, "PROTOTYPE #1", 1360, 480, { size: DS.type.title, t: W(39, 1), tc: "red" }); DS.vignette(S); }

// 14  Tonight, write down the date / of your next try. / You're not a failure either. / You're just early in the count.
{ const S = sc(14, { cam: "pull" }); DS.room(S, { wall: "night", floor: "wood", window: [1480, 200, 220, 220] });
  const top = desk(S, 760, 960, 640);
  S.fill(circ(1100, top - 220, 300, 220), S.start, 0, DS.c("gold", 1), 0.22);
  dave(S, 560, 960, "near", { mood: "determined", look: 6, pose: "hold" });
  paper(S, 900, top - 300, 380, 300);
  S.text("NEXT TRY:", 1090, top - 220, { size: DS.type.small, c: DS.c("ink") });
  S.text("Nov 3", 1090, top - 100, { size: DS.type.title, t: W(40, 4), c: DS.c("red") });
  S.draw(smooth([[960, top - 75], [1090, top - 65], [1220, top - 78]]), W(41, 3), 0, { c: DS.c("red"), w: DS.w.detail });
  DS.card(S, "WRITE THE DATE", 960, 150, { size: DS.type.small, t: W(40, 4) });
  DS.card(S, "YOU'RE NOT A FAILURE", 960, 260, { size: DS.type.body, t: W(42, 0), tc: "green" }); DS.vignette(S); }
