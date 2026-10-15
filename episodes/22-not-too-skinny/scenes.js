// look: still
// You Are Not Too Skinny (1-min, 73 s). Mystery: says who? Suspects: the beach, Dave's genes, then the culprit: a toy. Illustrated stills, progressive changes on the spoken word.
const dave = (S, x, gy, layer = "near", o = {}) => DS.figure(S, x, gy, layer, Object.assign({ s: 1.1, hair: "side", hairC: DS.c("brown"), outfit: "hoodie", outfitC: DS.c("navy", 1) }, o));
const bather = (S, x, gy, layer, i, o = {}) => DS.figure(S, x, gy, layer, Object.assign({ s: 1.1, outfit: "", hair: ["short", "bun", "curly", "messy", "short"][i % 5], hairC: DS.c(i % 2 ? "brown" : "ink"), mood: "flat" }, o));
const student = (S, x, gy, i, o = {}) => DS.figure(S, x, gy, "mid", Object.assign({ s: 1.1, hair: ["short", "bun", "curly", "messy", "side", "short"][i % 6], hairC: DS.c(i % 2 ? "brown" : "ink"), outfitC: DS.c(["green", "purple", "orange", "gray", "sky", "pink"][i % 6]), mood: "flat" }, o));
const beach = (S, o = {}) => DS.outdoor(S, Object.assign({ hy: 600, sky: "sky", hills: "blue", ground: "sand", sun: [1580, 180] }, o));
const umbrella = (S, x, gy, k, name, o = {}) => { DS.shadow(S, x + 40 * k, gy, 300 * k, { t: o.t }); S.draw(line([x, gy], [x, gy - 300 * k], 0), o.t ?? S.start, 0, { c: DS.line(o.layer || "mid"), w: DS.w.mid }); DS.shape(S, `M${x - 170 * k} ${gy - 290 * k} Q${x} ${gy - 470 * k} ${x + 170 * k} ${gy - 290 * k} Z`, name, { layer: o.layer || "mid", t: o.t }); };
// a plastic action figure, built of shapes: arm = biceps thickness, chest = shoulder width (normal toy 20 / 76, 1990s toy 64 / 150)
const toy = (S, cx, gy, k, arm, chest, o = {}) => {
  const t = o.t ?? S.start, sh = gy - 250 * k, wa = gy - 130 * k;
  DS.shadow(S, cx, gy, 170 * k, { t });
  DS.shape(S, circ(cx, gy, 90 * k, 16 * k), "ink", { t, flat: true, w: "detail" });
  [-1, 1].forEach((d) => DS.shape(S, rrect(cx + (d < 0 ? -30 : 6) * k, wa - 4 * k, 24 * k, 130 * k, DS.r.xs), "green", { t, w: "mid" }));
  [-1, 1].forEach((d) => { const ax = cx + d * (chest / 2 + arm * 0.2) * k;
    DS.shape(S, rrect(ax - arm * 0.3 * k, sh + 90 * k, arm * 0.6 * k, 100 * k, DS.r.sm), "dusk", { t, w: "mid" });
    DS.shape(S, circ(ax, sh + 196 * k, arm * 0.36 * k + 6 * k), "dusk", { t, w: "mid" });
    DS.shape(S, circ(ax, sh + 55 * k, arm / 2 * k, 62 * k), "dusk", { t, w: "mid" }); });
  DS.shape(S, `M${cx - chest / 2 * k} ${sh} L${cx + chest / 2 * k} ${sh} L${cx + 30 * k} ${wa} L${cx - 30 * k} ${wa} Z`, "green", { t, w: "mid" });
  DS.shape(S, circ(cx, sh - 34 * k, 30 * k), "dusk", { t, w: "mid" });
  DS.shape(S, `M${cx - 30 * k} ${sh - 40 * k} Q${cx} ${sh - 84 * k} ${cx + 30 * k} ${sh - 40 * k} Z`, "green", { t, w: "mid", tone: 2, flat: true });
  S.draw(circ(cx - 10 * k, sh - 32 * k, 3 * k) + circ(cx + 10 * k, sh - 32 * k, 3 * k), t, 0, { c: DS.c("ink"), w: DS.w.detail, fill: DS.c("ink") });
  S.draw(line([cx - 9 * k, sh - 18 * k], [cx + 9 * k, sh - 18 * k], 0), t, 0, { c: DS.c("ink"), w: DS.w.detail });
};
const helix = (S, x, y0, y1, t) => { const n = 24, pts = (ph) => Array.from({ length: n + 1 }, (_, i) => [x + 90 * Math.sin(i / n * Math.PI * 3 + ph), y0 + (y1 - y0) * i / n]);
  pts(0).forEach((p, i) => { if (i % 2 === 0 && i > 0 && i < n) S.draw(line(p, pts(Math.PI)[i], 0), t, 0, { c: DS.c("gray"), w: DS.w.detail }); });
  S.draw(smooth(pts(0)), t, 0, { c: DS.c("blue"), w: DS.w.near }); S.draw(smooth(pts(Math.PI)), t, 0, { c: DS.c("purple"), w: DS.w.near }); };
const bar = (S, x, base, h, w, name, t, label) => { DS.shape(S, rect(x, base - h, w, h), name, { t, dir: "h" }); S.text(label, x + w / 2, base - h - 24, { size: DS.type.small, t, c: DS.c("ink") }); };
const bubble = (S, F, str, t, dx = 0) => { const [x, y] = F.top(); S.thought(x + dx, y - 90, 130, 52, x, y - 10, t, 0.25); S.text(str, x + dx, y - 78, { size: DS.type.caption, t, c: DS.c("ink") }); };

const CUES = [[1, 0], [4, 0], [6, 0], [8, 0], [10, 0], [12, 0], [14, 0], [17, 0], [20, 0], [23, 0], [25, 0], [28, 0], [31, 0], [35, 0], [37, 0], [40, 0]];
const WIN = sceneWindows(CUES, 0.15);
WIN[12][1] += 0.4; WIN[13][0] += 0.4; // let "Yes." sit before the hoodie comes off
const sc = (k, o) => scene(WIN[k][0], WIN[k][1], o);

// 0  This is Dave. / It's August, at the beach, / and he's wearing a hoodie.
{ const S = sc(0, { cam: "push", focus: "900 600" }); beach(S);
  [[300, 650, 0], [520, 640, 1], [1700, 655, 2]].forEach(([x, gy, i]) => bather(S, x, gy, "far", i, { look: 4 }));
  umbrella(S, 1350, 800, 1, "orange");
  bather(S, 1500, 820, "mid", 3, { mood: "smile", look: -4 });
  const F = dave(S, 820, 960, "near", { mood: "worried", look: 5 });
  DS.card(S, "DAVE", 820, 220, { size: DS.type.body, t: W(1, 2) });
  DS.card(S, "AUGUST", 1580, 360, { size: DS.type.small, t: W(2, 1) });
  const [hx, hy] = F.top(); S.drop(hx + 95, hy + 40, 1.6, W(3, 2)); S.drop(hx - 90, hy + 80, 1.3, W(3, 2) + 0.15);
  DS.vignette(S); }

// 1  His arms are too skinny, he says. / Says who?
{ const S = sc(1, { cam: "zoom", focus: "860 520" }); beach(S, { sun: [1700, 160] });
  umbrella(S, 1480, 760, 0.8, "orange", { layer: "far" });
  const F = dave(S, 760, 1080, "near", { s: 1.45, mood: "sad", look: 7 });
  const [hx, hy] = F.hand("R"); S.ring(hx - 20, hy - 80, 70, 140, W(4, 4), 0.01, { c: DS.c("red"), w: DS.w.mid });
  DS.card(S, "TOO SKINNY?", 1250, 520, { size: DS.type.body, t: W(4, 4) });
  DS.card(S, "SAYS WHO?", 960, 170, { size: DS.type.title, t: W(5, 0), tc: "red" });
  DS.vignette(S); }

// 2  Suspect one: / the beach, where everyone is staring.
{ const S = sc(2, { cam: "pull" }); beach(S);
  const P = [[260, 660, "far", 0, 5], [480, 650, "far", 1, 5], [1500, 655, "far", 2, -5], [1720, 665, "far", 4, -5], [400, 820, "mid", 3, 6], [1560, 830, "mid", 1, -6]];
  const B = P.map(([x, gy, L, i, lk]) => bather(S, x, gy, L, i, { look: lk, mood: "wow" }));
  umbrella(S, 1300, 780, 0.9, "orange");
  dave(S, 960, 900, "mid", { mood: "worried", look: 0 });
  DS.card(S, "SUSPECT 1: THE BEACH", 960, 160, { size: DS.type.small, t: W(6, 0) });
  B.forEach((F, k) => { const [x, y] = F.top(); S.eye(x, y - 50, 0.9, W(7, 3) + k * 0.06, 0.01, { dx: P[k][4] > 0 ? 18 : -18 }); });
  DS.vignette(S, 0.16); }

// 3  In two thousand, Thomas Gilovich sent students into a room / in a Barry Manilow T-shirt.
{ const S = sc(3, { cam: "push", focus: "700 560" }); const R = DS.room(S, { window: [1340, 170, 230, 230] });
  [0, 1, 2, 3, 4].forEach((i) => student(S, 900 + i * 190, R.hy + 40, i, { look: -5 }));
  const F = DS.figure(S, 520, 960, "near", { s: 1.15, hair: "short", hairC: DS.c("ink"), outfit: "tee", outfitC: DS.c("white", 2), mood: "worried", look: 6, t: W(8, 6) });
  const cx = F.cx, cy = F.sh[1] + 62 * F.s;
  DS.shape(S, circ(cx, cy, 30), "yellow", { t: W(9, 2), w: "detail" });
  DS.shape(S, `M${cx - 32} ${cy - 8} Q${cx - 30} ${cy - 46} ${cx + 4} ${cy - 40} Q${cx + 34} ${cy - 36} ${cx + 32} ${cy - 6} Q${cx + 18} ${cy - 26} ${cx - 32} ${cy - 8} Z`, "earth", { t: W(9, 2), w: "detail" });
  S.draw(smooth([[cx - 12, cy + 10], [cx, cy + 18], [cx + 12, cy + 10]]), W(9, 2), 0, { c: DS.c("ink"), w: DS.w.detail });
  DS.card(S, "2000 · THOMAS GILOVICH", 960, 140, { size: DS.type.small, t: W(8, 3) });
  DS.card(S, "BARRY MANILOW T-SHIRT", 520, 330, { size: DS.type.caption, t: W(9, 3) });
  DS.plant(S, 110, 1120, 0.9, 1); DS.vignette(S); }

// 4  They guessed half the room noticed. / Fewer than one in four did.
{ const S = sc(4, { cam: "zoom", focus: "1100 560" }); const R = DS.room(S, { window: false });
  const st = [0, 1, 2, 3, 4, 5, 6, 7].map((i) => student(S, 760 + i * 140, R.hy + 40, i, { s: 1.0, look: i === 2 || i === 5 ? -7 : 6 }));
  const F = DS.figure(S, 380, 960, "near", { s: 1.15, hair: "short", hairC: DS.c("ink"), outfit: "tee", outfitC: DS.c("white", 2), mood: "worried", look: 6 });
  const cx = F.cx, cy = F.sh[1] + 62 * F.s; DS.shape(S, circ(cx, cy, 30), "yellow", { w: "detail" });
  S.thought(560, 300, 230, 90, 420, 420, W(10, 1), 0.25); S.text("HALF SAW IT", 560, 318, { size: DS.type.small, t: W(10, 2), c: DS.c("ink") });
  [2, 5].forEach((i, k) => { const [x, y] = st[i].top(); S.eye(x, y - 55, 0.9, W(11, 4) + k * 0.1, 0.01, { dx: -18 }); });
  DS.card(S, "REALLY: UNDER 1 IN 4", 1320, 230, { size: DS.type.small, t: W(11, 4), tc: "green" });
  DS.vignette(S); }

// 5  The beach is busy / worrying about its own arms.
{ const S = sc(5, { cam: "push" }); beach(S);
  umbrella(S, 1180, 760, 0.85, "orange", { layer: "far" });
  const B = [[330, 900, 0, "hold"], [1450, 900, 2, "hold"], [1700, 800, 4, "armsUp"]].map(([x, gy, i, pose]) => bather(S, x, gy, gy > 850 ? "near" : "mid", i, { s: 1.0, pose, mood: "worried", look: 3 }));
  dave(S, 900, 820, "mid", { mood: "flat", look: 0 });
  B.forEach((F, k) => bubble(S, F, "MY ARMS?", W(12, 3) + k * 0.25));
  DS.card(S, "BUSY WITH THEIR OWN ARMS", 960, 150, { size: DS.type.small, t: W(13, 0) });
  DS.vignette(S); }

// 6  Suspect two: / Dave's genes. / "I'm a hardgainer."
{ const S = sc(6, { cam: "push", focus: "800 560" }); DS.room(S, { wall: "glass", floor: "gray", window: false });
  helix(S, 1340, 300, 860, W(15, 1));
  const F = dave(S, 620, 960, "near", { mood: "sad", look: 6 });
  DS.card(S, "SUSPECT 2: GENES", 960, 140, { size: DS.type.small, t: W(14, 0) });
  S.speech(620, 330, 300, 80, 640, 420, W(16, 0), 0.25); S.text("I'M A HARDGAINER", 620, 350, { size: DS.type.small, t: W(16, 0), c: DS.c("ink") });
  DS.vignette(S); }

// 7  In 2005, researchers trained 585 beginners, one arm, twelve weeks. / Thirty-six arms barely grew. / "See?"
{ const S = sc(7, { cam: "pull" }); const R = DS.room(S, { floor: "wood", window: [1360, 150, 220, 220] });
  const curl = [[34, 40], [44, -24]];
  const T = [0, 1, 2, 3, 4].map((i) => { const F = student(S, 640 + i * 230, R.hy + 60, i, { s: 1.15, armR: curl, look: 4, mood: "determined", t: W(17, 4) }); const [hx, hy] = F.hand("R"); S.dumbbell(hx, hy, 0.32, W(17, 12), 0.01); return F; });
  DS.card(S, "2005 · 585 BEGINNERS · 12 WEEKS", 960, 140, { size: DS.type.small, t: W(17, 6) });
  [1, 3].forEach((i) => { const [x, y] = T[i].top(); T[i].face(W(18, 2), "sad", 4); });
  DS.card(S, "36 BARELY GREW", 1150, 330, { size: DS.type.small, t: W(18, 2), tc: "red" });
  const D = dave(S, 300, 1000, "near", { mood: "flat", look: 6, pose: "point", t: W(19, 0) - 0.3 });
  S.speech(380, 420, 140, 70, 330, 540, W(19, 0), 0.2); S.text("SEE?", 380, 440, { size: DS.type.body, t: W(19, 0), c: DS.c("ink") });
  DS.vignette(S); }

// 8  But not one arm got weaker. / On average, strength rose by half, / and weaker starters gained more.
{ const S = sc(8, { cam: "push" }); DS.room(S, { wall: "glass", floor: "gray", window: false });
  S.draw(line([420, 860], [1500, 860], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.mid });
  bar(S, 560, 860, 300, 240, "gray", S.start, "BEFORE");
  bar(S, 1000, 860, 450, 240, "green", W(21, 5), "+50%");
  S.text("STRENGTH, 12 WEEKS", 960, 920, { size: DS.type.caption, c: DS.c("ink") });
  DS.card(S, "NOT ONE ARM GOT WEAKER", 960, 150, { size: DS.type.small, t: W(20, 1), tc: "green" });
  DS.card(S, "WEAKER STARTERS: MORE", 1450, 300, { size: DS.type.caption, t: W(22, 1) });
  DS.vignette(S); }

// 9  Dave's arms aren't stuck. / They're early.
{ const S = sc(9, { cam: "zoom", focus: "860 600" }); beach(S, { sky: "dusk", sun: [1450, 560], hills: "blue" });
  const F = dave(S, 820, 960, "near", { s: 1.2, mood: "determined", look: 6, armR: [[34, 40], [44, -24]] });
  const [hx, hy] = F.hand("R"); S.dumbbell(hx, hy, 0.4, S.start, 0.01);
  DS.card(S, "NOT STUCK", 820, 230, { size: DS.type.body, t: W(23, 3) });
  DS.card(S, "EARLY", 1450, 330, { size: DS.type.title, t: W(24, 0), tc: "green" });
  DS.vignette(S); }

// 10  Says who? / Dave's old toy box. / In 1999, Harrison Pope scaled action figures to a real man.
{ const S = sc(10, { cam: "push", focus: "900 600" }); const R = DS.room(S, { wall: "sky", floor: "wood", window: [1380, 170, 220, 220] });
  DS.frame(S, 440, 190, 150, 120, "grass");
  DS.shadow(S, 620, 960, 420);
  DS.shape(S, rrect(410, 700, 420, 260, DS.r.sm), "wood", { t: W(26, 2) });
  DS.shape(S, rect(410, 760, 420, 20), "wood", { t: W(26, 2), tone: 2, flat: true, w: "detail" });
  toy(S, 620, 760, 0.75, 20, 76, { t: W(26, 2) });
  DS.card(S, "SAYS WHO?", 620, 300, { size: DS.type.body, t: W(25, 0), tc: "red" });
  DS.card(S, "1999 · HARRISON POPE", 1260, 140, { size: DS.type.small, t: W(27, 3) });
  S.arrow(780, 560, 1060, 520, W(27, 5), 0.3, { c: DS.c("ink"), w: DS.w.mid, bend: -0.15 });
  S.draw(rrect(1110, 300, 280, 640, DS.r.lg), W(27, 6), 0, { c: DS.c("gray", 2), w: DS.w.detail });
  toy(S, 1250, 930, 2.3, 20, 76, { t: W(27, 6) });
  DS.vignette(S); }

// 11  The 1960s G I Joe had normal arms. / By the nineties, / bigger than the biggest bodybuilders.
{ const S = sc(11, { cam: "push", focus: "1200 560" }); DS.room(S, { wall: "navy", floor: "wood", window: false });
  DS.shape(S, rect(260, 860, 1400, 40), "wood");
  toy(S, 560, 860, 1.7, 20, 76);
  S.text("1960s", 560, 940, { size: DS.type.small, c: DS.c("white") });
  toy(S, 1260, 860, 1.7, 64, 150, { t: W(29, 2) });
  S.text("1990s", 1260, 940, { size: DS.type.small, t: W(29, 2), c: DS.c("white") });
  DS.card(S, "NORMAL ARMS", 560, 230, { size: DS.type.small, t: W(28, 6) });
  DS.card(S, "BIGGER THAN ANY BODYBUILDER", 1260, 140, { size: DS.type.small, t: W(30, 0), tc: "red" });
  DS.vignette(S, 0.18); }

// 12  Dave didn't shrink. / The toys grew. / "So I've been measuring against plastic?" / "Yes."
{ const S = sc(12, { cam: "pull" }); DS.room(S, { wall: "wall", floor: "wood", window: [1440, 160, 220, 220] });
  toy(S, 1150, 960, 3.0, 64, 150, { t: W(32, 0) });
  const F = dave(S, 560, 960, "near", { mood: "wow", look: 7 });
  DS.card(S, "THE TOYS GREW", 470, 170, { size: DS.type.body, t: W(32, 1), tc: "red" });
  S.speech(470, 400, 300, 80, 540, 500, W(33, 0), 0.25); S.text("AGAINST PLASTIC?", 470, 420, { size: DS.type.small, t: W(33, 3), c: DS.c("ink") });
  DS.card(S, "YES.", 1700, 330, { size: DS.type.title, t: W(34, 0) });
  F.face(W(34, 0), "flat", 7);
  DS.vignette(S); }

// 13  Dave takes off the hoodie. / The beach keeps worrying about its own arms.
{ const S = sc(13, { cam: "push", focus: "900 640" }); beach(S);
  umbrella(S, 1300, 800, 0.9, "orange");
  const H = dave(S, 860, 960, "near", { mood: "flat", look: 0 });
  S.fadeOut(H.g, W(35, 3), 0.35);
  dave(S, 860, 960, "near", { outfit: "tee", outfitC: DS.c("blue"), mood: "smile", look: 0, t: W(35, 3) });
  DS.shape(S, `M${1000} ${950} Q${1060} ${905} ${1130} ${930} Q${1160} ${960} ${1100} ${972} Q${1040} ${985} ${1000} ${950} Z`, "navy", { t: W(35, 4), tone: 1 });
  S.draw(rrect(1040, 940, 50, 18, DS.r.xs), W(35, 4), 0, { c: DS.c("ink"), w: DS.w.hair });
  S.draw(line([1012, 948], [985, 975], 0) + line([1120, 932], [1150, 960], 0), W(35, 4), 0, { c: DS.c("ink"), w: DS.w.mid });
  const B = [[330, 800, 0, "hold"], [1640, 820, 2, "hold"]].map(([x, gy, i, pose]) => bather(S, x, gy, "mid", i, { pose, mood: "worried", look: 3 }));
  B.forEach((F, k) => bubble(S, F, "MY ARMS?", W(36, 5) + k * 0.2));
  DS.vignette(S); }

// 14  Two days a week, / push-ups, sit-ups, big muscles: / World Health Organization advice.
{ const S = sc(14, { cam: "push" }); DS.room(S, { floor: "wood", window: [1420, 170, 220, 220] });
  const C = S.calendar(880, 380, 7, 1, 120, 130, S.start, 0.01, { title: "THIS WEEK" });
  [1, 4].forEach((d, k) => S.tick(C.cells[d][0], C.cells[d][1], 1.4, W(37, 1) + k * 0.25, 0.15, { c: DS.c("green"), w: DS.w.near }));
  dave(S, 470, 960, "near", { outfit: "tee", outfitC: DS.c("blue"), mood: "determined", look: 6, pose: "armsUp" });
  DS.card(S, "2 DAYS A WEEK", 1300, 230, { size: DS.type.body, t: W(37, 0), tc: "green" });
  DS.card(S, "PUSH-UPS · SIT-UPS", 1300, 720, { size: DS.type.small, t: W(38, 0) });
  DS.card(S, "WHO ADVICE, EVERY ADULT", 1300, 860, { size: DS.type.caption, t: W(39, 0) });
  DS.vignette(S); }

// 15  You are not too skinny. / You were measuring against a toy.
{ const S = sc(15, { cam: "pull" }); beach(S, { sky: "dusk", sun: [1500, 480] });
  umbrella(S, 1500, 780, 0.8, "orange", { layer: "far" });
  dave(S, 820, 960, "near", { s: 1.25, outfit: "tee", outfitC: DS.c("blue"), mood: "smile", look: 0 });
  toy(S, 1240, 950, 0.45, 64, 150, { t: W(41, 5) });
  DS.card(S, "NOT TOO SKINNY", 820, 200, { size: DS.type.title, t: W(40, 3), tc: "green" });
  DS.vignette(S); }
