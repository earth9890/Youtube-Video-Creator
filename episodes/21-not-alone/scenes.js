// look: still
// You Are Not Alone (1-min, 70 s). Mystery: where are the other ninety-one? Illustrated stills, progressive changes on the spoken word.
const dave = (S, x, gy, layer = "near", o = {}) => DS.figure(S, x, gy, layer, Object.assign({ s: 1.0, hair: "side", hairC: DS.c("brown"), outfitC: DS.c("blue") }, o));
const sam = (S, x, gy, layer = "near", o = {}) => DS.figure(S, x, gy, layer, Object.assign({ s: 1.0, hair: "curly", hairC: DS.c("ink"), outfitC: DS.c("orange") }, o));
// couch facing the viewer; returns the seat top (seated figures sit on it, legs to the right)
const couch = (S, x, gy, w, name = "purple") => {
  DS.shadow(S, x + w / 2, gy, w + 80);
  DS.shape(S, rrect(x + 10, gy - 330, w - 20, 210, DS.r.lg), name);
  DS.shape(S, rrect(x, gy - 140, w, 100, DS.r.md), name);
  [x - 40, x + w - 30].forEach((ax) => DS.shape(S, rrect(ax, gy - 220, 70, 180, DS.r.md), name));
  [x + 30, x + w - 50].forEach((lx) => DS.shape(S, rect(lx, gy - 40, 20, 40), "wood", { w: "mid" }));
  return gy - 132;
};
// small phone in a hand, with a screen glow
const handPhone = (S, F, t) => { const [hx, hy] = F.hand("R"); S.fill(circ(hx, hy - 30, 60, 48), t ?? S.start, 0.3, DS.c("sky", 1), 0.3); DS.shape(S, rrect(hx - 18, hy - 66, 36, 64, DS.r.xs), "ink", { t, w: "detail" }); S.fill(rrect(hx - 13, hy - 60, 26, 50, DS.r.xs), t ?? S.start, 0, DS.c("sky", 1), 1); };
// night window (own sky, so the room can be at night)
const nightWin = (S, x, y, w, h) => {
  DS.shape(S, rrect(x - 14, y - 14, w + 28, h + 28, DS.r.xs), "white", { w: "detail" });
  DS.shape(S, rect(x, y, w, h), "night", { flat: true, tone: 2, w: "hair" });
  S.fill(circ(x + w * 0.7, y + h * 0.3, 24), S.start, 0, DS.c("yellow", 1), 1);
  [[0.2, 0.2], [0.35, 0.62], [0.15, 0.8], [0.5, 0.14], [0.82, 0.72]].forEach(([a, b]) => S.fill(circ(x + w * a, y + h * b, 4), S.start, 0, DS.P.white[0], 0.85));
  S.draw(`M${x + w / 2} ${y} V${y + h} M${x} ${y + h / 2} H${x + w}`, S.start, 0, { c: DS.P.white[0], w: DS.w.mid });
};
const nightRoom = (S) => { const R = DS.room(S, { wall: "night", floor: "wood", window: false }); nightWin(S, 1290, 180, 220, 220); return R; };
// big phone; returns the screen box
const bigPhone = (S, cx, cy, w, h, o = {}) => {
  const t = o.t ?? S.start;
  DS.drop(S, rrect(cx - w / 2 + 10, cy - h / 2 + 14, w, h, DS.r.lg), { t });
  DS.shape(S, rrect(cx - w / 2, cy - h / 2, w, h, DS.r.lg), "ink", { t, w: "mid" });
  const x0 = cx - w / 2 + 20, y0 = cy - h / 2 + 46, x1 = cx + w / 2 - 20, y1 = cy + h / 2 - 46;
  DS.shape(S, rrect(x0, y0, x1 - x0, y1 - y0, DS.r.sm), o.screen || "white", { t, flat: true, w: "hair", tone: o.tone || 0 });
  return { x0, y0, x1, y1 };
};
const hat = (S, F, name, t) => { const [hx, hy] = F.top(); DS.shape(S, `M${hx - 24 * F.s} ${hy + 8 * F.s} L${hx} ${hy - 62 * F.s} L${hx + 24 * F.s} ${hy + 8 * F.s} Z`, name, { t, w: "detail" }); };
const confetti = (S, x0, y0, x1, y1, n, t) => { for (let i = 0; i < n; i++) { const x = x0 + (((i * 137) % 1000) / 1000) * (x1 - x0), y = y0 + (((i * 251) % 1000) / 1000) * (y1 - y0); S.fill(rect(x, y, 12, 18), t ?? S.start, 0, DS.c(i % 2 ? "gold" : "pink"), 1); } };
const party = (S, xs, gy, layer, t, s = 1.0) => xs.forEach(([x, c, h], i) => { const F = DS.figure(S, x, gy, layer, { s, hair: h, hairC: DS.c("brown", 0, layer), outfitC: DS.c(c, 0, layer), mood: "happy", pose: i % 2 ? "armsUp" : "wave", t }); hat(S, F, i % 2 ? "pink" : "gold", t); });
// apartment block at night: windows 6 x 4; returns window boxes [x, y, w, h]
const block = (S) => {
  const O = DS.outdoor(S, { hy: 760, sky: "night", sun: false, hills: "navy", ground: "gray" });
  [[150, 120], [300, 260], [420, 90], [1560, 140], [1700, 300], [1820, 110], [240, 420], [1480, 380]].forEach(([x, y]) => S.fill(circ(x, y, 4), S.start, 0, DS.P.white[0], 0.8));
  DS.shadow(S, 960, 940, 960);
  DS.shape(S, rect(540, 170, 840, 770), "brown", { tone: 1 });
  DS.shape(S, rrect(520, 150, 880, 40, DS.r.xs), "gray", { w: "mid" });
  const wins = [];
  for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) wins.push([590 + c * 130, 230 + r * 170, 100, 110]);
  wins.forEach(([x, y, w, h]) => DS.shape(S, rect(x, y, w, h), "navy", { flat: true, tone: 2, w: "detail" }));
  return wins;
};
// a lit window: TV glow + someone on a couch, seen from behind
const tvWin = (S, [x, y, w, h], t, glow = "blue") => {
  S.fill(rect(x, y, w, h), t ?? S.start, 0, DS.c(glow, 1), 1);
  S.fill(rect(x + 8, y + h - 34, w - 16, 26), t ?? S.start, 0, DS.c("purple", 2), 1);
  S.fill(circ(x + w / 2, y + h - 52, 13), t ?? S.start, 0, DS.c("ink"), 1);
  S.fill(rrect(x + w / 2 - 22, y + h - 42, 44, 30, DS.r.sm), t ?? S.start, 0, DS.c("ink"), 1);
};
const bar = (S, x, base, h, w, name, t, label) => { DS.shape(S, rect(x, base - h, w, h), name, { t, dir: "h" }); S.text(label, x + w / 2, base - h - 24, { size: DS.type.small, t, c: DS.c("ink") }); };
const paper = (S, x, y, w, h, t) => { DS.drop(S, rect(x + 6, y + 8, w, h), { t }); DS.shape(S, rect(x, y, w, h), "white", { t, w: "detail", flat: true }); [1, 2, 3].forEach((i) => S.draw(line([x + 12, y + i * h / 4.5], [x + w - 12, y + i * h / 4.5], 0), t ?? S.start, 0, { c: DS.c("gray", 1), w: DS.w.hair })); };

const CUES = [[1, 0], [5, 0], [7, 0], [10, 0], [13, 0], [14, 0], [17, 0], [19, 0], [21, 0], [25, 0], [27, 0], [29, 0], [32, 0], [36, 0], [38, 0], [42, 0]];
const WIN = sceneWindows(CUES, 0.15);
const sc = (k, o) => scene(WIN[k][0], WIN[k][1], o);

// 0  Saturday, nine PM. / Dave's stories: / party, concert, rooftop, / a wedding he wasn't invited to.
{ const S = sc(0, { cam: "push", focus: "1100 560" }); nightRoom(S);
  const seat = couch(S, 200, 960, 520);
  const F = dave(S, 400, seat, "near", { sit: true, pose: "hold", mood: "flat", look: 6 }); handPhone(S, F);
  const P = bigPhone(S, 1340, 540, 520, 760);
  const ic = [[3, 0, "pink"], [3, 1, "purple"], [3, 2, "orange"], [4, 1, "gold"]];
  ic.forEach(([c, i, name], k) => { const cx = P.x0 + 70 + k * 112, cy = P.y0 + 80, t = W(c, i);
    S.draw(circ(cx, cy, 50), t, 0, { c: DS.c("red"), w: DS.w.mid }); DS.shape(S, circ(cx, cy, 42), name, { t, w: "detail" }); });
  const [p0, p1, p2, p3] = ic.map(([c, i], k) => [P.x0 + 70 + k * 112, P.y0 + 80, W(c, i)]);
  S.draw(line([p0[0], p0[1] + 6], [p0[0], p0[1] + 34], 0), p0[2], 0, { c: DS.c("ink"), w: DS.w.detail }); DS.shape(S, circ(p0[0], p0[1] - 8, 16, 20), "red", { t: p0[2], w: "detail" });
  DS.shape(S, circ(p1[0] - 6, p1[1] + 16, 13, 10), "ink", { t: p1[2], w: "detail" }); S.draw(`M${p1[0] + 6} ${p1[1] + 14} V${p1[1] - 24} L${p1[0] + 24} ${p1[1] - 14}`, p1[2], 0, { c: DS.c("ink"), w: DS.w.detail });
  DS.shape(S, `M${p2[0]} ${p2[1] - 26} L${p2[0] + 8} ${p2[1] - 8} L${p2[0] + 26} ${p2[1] - 6} L${p2[0] + 12} ${p2[1] + 6} L${p2[0] + 16} ${p2[1] + 26} L${p2[0]} ${p2[1] + 14} L${p2[0] - 16} ${p2[1] + 26} L${p2[0] - 12} ${p2[1] + 6} L${p2[0] - 26} ${p2[1] - 6} L${p2[0] - 8} ${p2[1] - 8} Z`, "yellow", { t: p2[2], w: "detail" });
  DS.shape(S, heartPath(p3[0], p3[1] - 2, 0.5), "red", { t: p3[2], w: "detail" });
  DS.shape(S, rrect(P.x0 + 16, P.y0 + 160, P.x1 - P.x0 - 32, P.y1 - P.y0 - 180, DS.r.sm), "night", { flat: true, tone: 2, w: "hair", t: W(3, 0) });
  party(S, [[P.x0 + 120, "pink", "bun"], [P.x0 + 240, "green", "spiky"], [P.x0 + 360, "orange", "curly"]], P.y1 - 60, "near", W(3, 0), 0.62);
  confetti(S, P.x0 + 40, P.y0 + 190, P.x1 - 40, P.y0 + 330, 22, W(3, 0));
  DS.card(S, "SAT · 9 PM", 460, 170, { size: DS.type.body });
  F.face(W(4, 3), "sad", 6);
  DS.vignette(S, 0.18); }

// 1  Everyone on Earth is out. / Except Dave.
{ const S = sc(1, { cam: "pull" }); DS.outdoor(S, { hy: 700, sky: "night", sun: false, hills: "navy", ground: "gray" });
  [[120, 360], [290, 300], [1380, 330], [1560, 280], [1730, 350]].forEach(([x, top]) => DS.shape(S, rect(x, top, 150, 700 - top), "navy", { layer: "far", w: "far" }));
  S.draw(smooth([[180, 470], [560, 540], [940, 470]]), S.start, 0, { c: DS.c("gray", 1), w: DS.w.detail });
  [220, 340, 460, 580, 700, 820].forEach((x, i) => S.fill(circ(x, 497 + Math.sin(i) * 18, 12), S.start, 0, DS.c(i % 2 ? "gold" : "yellow", 1), 1));
  party(S, [[260, "pink", "bun"], [420, "green", "spiky"], [580, "orange", "curly"], [740, "purple", "short"], [900, "sky", "messy"]], 830, "mid", S.start);
  confetti(S, 200, 380, 960, 520, 18);
  const hx = 1440, gy = 930; DS.shadow(S, hx, gy, 460);
  DS.shape(S, rect(hx - 200, gy - 300, 400, 300), "wall");
  DS.shape(S, `M${hx - 240} ${gy - 290} L${hx} ${gy - 480} L${hx + 240} ${gy - 290} Z`, "brown");
  DS.shape(S, rrect(hx + 60, gy - 170, 90, 170, DS.r.xs), "wood", { w: "mid" });
  tvWin(S, [hx - 150, gy - 230, 140, 120], S.start);
  DS.card(S, "EVERYONE: OUT", 580, 160, { size: DS.type.body, t: W(5, 0) });
  DS.card(S, "EXCEPT DAVE", 1440, 290, { size: DS.type.small, t: W(6, 0), tc: "red" });
  DS.vignette(S); }

// 2  But Dave follows a hundred people. / Nine posted. / Where are the other ninety-one?
{ const S = sc(2, { cam: "zoom", focus: "960 560" }); nightRoom(S);
  const P = bigPhone(S, 960, 580, 700, 720);
  const posted = [3, 17, 28, 41, 46, 63, 72, 85, 98];
  for (let i = 0; i < 100; i++) { const cx = P.x0 + 58 + (i % 10) * 62, cy = P.y0 + 40 + Math.floor(i / 10) * 61;
    S.fill(circ(cx, cy, 22), S.start, 0, DS.c("gray", 1), 1); S.fill(circ(cx, cy - 4, 8), S.start, 0, DS.P.white[0], 1);
    if (posted.includes(i)) { S.draw(circ(cx, cy, 25), W(8, 0), 0, { c: DS.c("red"), w: DS.w.mid }); S.fill(circ(cx, cy, 20), W(8, 0), 0, DS.c("gold"), 1); } }
  DS.card(S, "FOLLOWING: 100", 330, 420, { size: DS.type.small, t: W(7, 3) });
  DS.card(S, "9 POSTED", 330, 540, { size: DS.type.small, t: W(8, 0) });
  DS.card(S, "WHERE ARE THE OTHER 91?", 960, 130, { size: DS.type.small, t: W(9, 3), tc: "red" });
  DS.vignette(S, 0.18); }

// 3  Dave: / "Out. / Too busy having fun to post."
{ const S = sc(3, { cam: "push" }); nightRoom(S);
  const seat = couch(S, 160, 960, 480);
  const F = dave(S, 340, seat, "near", { sit: true, pose: "hold", mood: "worried", look: 6 }); handPhone(S, F);
  S.thought(1180, 500, 560, 300, 620, 640, W(11, 0), 0.3);
  party(S, [[880, "pink", "bun"], [1040, "green", "spiky"], [1200, "orange", "curly"], [1360, "purple", "short"], [1500, "sky", "messy"]], 700, "mid", W(11, 0) + 0.1, 0.9);
  confetti(S, 820, 290, 1540, 400, 16, W(11, 0) + 0.1);
  DS.card(S, "TOO BUSY TO POST", 1180, 130, { size: DS.type.small, t: W(12, 0) });
  DS.vignette(S); }

// 4  In twenty twenty-five, six thousand Americans logged their whole day.
{ const S = sc(4, { cam: "push" }); const R = DS.room(S, { window: [1460, 180, 220, 220] });
  [[440, "purple", "bun"], [560, "green", "short"], [680, "orange", "curly"], [800, "sky", "spiky"]].forEach(([x, c, h]) => DS.figure(S, x, R.hy + 40, "mid", { s: 1.3, hair: h, hairC: DS.c("brown", 0, "mid"), outfitC: DS.c(c, 0, "mid"), mood: "flat", t: W(13, 3) }));
  const x = 1040, y = 200, w = 420, h = 640;
  DS.drop(S, rrect(x + 8, y + 10, w, h, DS.r.sm)); DS.shape(S, rrect(x, y, w, h, DS.r.sm), "wood");
  DS.shape(S, rect(x + 24, y + 40, w - 48, h - 64), "white", { flat: true, w: "detail" });
  DS.shape(S, rrect(x + w / 2 - 70, y - 20, 140, 50, DS.r.xs), "gray", { w: "detail" });
  const cols = ["purple", "blue", "green", "orange", "blue", "gray", "blue", "green", "orange", "blue", "purple", "gray"];
  cols.forEach((c, i) => { const ry = y + 70 + i * 46; S.draw(line([x + 44, ry + 20], [x + w - 44, ry + 20], 0), S.start, 0, { c: DS.c("gray", 1), w: DS.w.hair });
    S.fill(rrect(x + 110, ry, 60 + ((i * 97) % 200), 30, DS.r.xs), W(13, 5) + i * 0.06, 0, DS.c(c, 1), 1); });
  DS.card(S, "2025 · US TIME USE SURVEY", 960, 130, { size: DS.type.small });
  DS.card(S, "6,000 AMERICANS", 620, 330, { size: DS.type.small, t: W(13, 3) });
  DS.card(S, "WHOLE DAY", 1250, 900, { size: DS.type.caption, t: W(13, 6) });
  DS.vignette(S); }

// 5  Weekends: / under an hour socialising, / over three hours of TV.
{ const S = sc(5, { cam: "push" }); DS.room(S, { window: false });
  S.draw(line([440, 860], [1480, 860], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.mid });
  bar(S, 560, 860, 150, 240, "green", W(15, 0), "55 MIN");
  bar(S, 1080, 860, 540, 240, "blue", W(16, 0), "3 H 16");
  S.text("SOCIALISING", 680, 920, { size: DS.type.caption, c: DS.c("ink"), t: W(15, 0) });
  S.text("TV", 1200, 920, { size: DS.type.caption, c: DS.c("ink"), t: W(16, 0) });
  DS.card(S, "AN AVERAGE WEEKEND DAY", 960, 140, { size: DS.type.small, t: W(14, 0) });
  DS.vignette(S); }

// 6  The ninety-one / are on a couch.
{ const S = sc(6, { cam: "zoom", focus: "960 520" }); const wins = block(S);
  wins.forEach((b, i) => tvWin(S, b, W(17, 1) + (i % 6) * 0.05 + Math.floor(i / 6) * 0.08));
  DS.card(S, "THE 91", 300, 300, { size: DS.type.title, t: W(17, 1) });
  DS.card(S, "ON A COUCH", 1640, 300, { size: DS.type.small, t: W(18, 0), tc: "blue" });
  DS.vignette(S, 0.16); }

// 7  So why does everyone seem out? / In twenty seventeen, Sebastian Deri at Cornell ran eleven studies.
{ const S = sc(7); const R = DS.room(S, { window: false });
  const F = dave(S, 400, 960, "near", { pose: "shrug", mood: "worried", look: 6 });
  S.speech(400, 300, 140, 80, 400, 420, S.start, 0.25); S.text("WHY?", 400, 320, { size: DS.type.body, c: DS.c("ink") });
  DS.shape(S, rrect(760, 260, 960, 520, DS.r.sm), "wood");
  DS.shape(S, rect(790, 290, 900, 460), "earth", { flat: true, tone: 1, w: "detail" });
  for (let i = 0; i < 11; i++) { const px = 830 + (i % 6) * 142, py = 330 + Math.floor(i / 6) * 210; paper(S, px, py, 110, 150, W(20, 3) + i * 0.08); S.fill(circ(px + 55, py + 8, 9), W(20, 3) + i * 0.08, 0, DS.c("red"), 1); }
  DS.card(S, "2017 · SEBASTIAN DERI, CORNELL", 1000, 140, { size: DS.type.small, t: W(20, 3) });
  DS.card(S, "11 STUDIES", 1240, 860, { size: DS.type.small, t: W(20, 6) });
  DS.vignette(S); }

// 8  Most people said others have richer social lives. / Even shoppers at a mall, / who were, at that moment, / out.
{ const S = sc(8, { cam: "push" }); const R = DS.room(S, { wall: "wall", floor: "gray", window: false });
  [[400, "sky"], [800, "green"], [1200, "yellow"]].forEach(([x, c]) => { DS.shape(S, rect(x, 300, 320, 440), "glass", { layer: "mid", w: "mid" }); DS.shape(S, rrect(x - 20, 250, 360, 70, DS.r.sm), c, { layer: "mid", w: "mid" }); });
  [[420, "purple", "bun"], [1660, "green", "short"]].forEach(([x, c, h]) => { const M = DS.figure(S, x, R.hy + 40, "mid", { s: 1.3, hair: h, hairC: DS.c("brown", 0, "mid"), outfitC: DS.c(c, 0, "mid"), mood: "flat", t: W(22, 1) }); const [hx, hy] = M.hand("R"); DS.shape(S, rrect(hx - 22, hy, 44, 52, DS.r.xs), "pink", { layer: "mid", t: W(22, 1), w: "mid" }); });
  const F = sam(S, 960, 960, "near", { s: 1.05, hair: "short", hairC: DS.c("brown"), outfitC: DS.c("purple"), mood: "worried", look: -6, t: W(22, 1) });
  [F.hand("R"), F.hand("L")].forEach(([hx, hy], i) => DS.shape(S, rrect(hx - 30, hy, 60, 70, DS.r.xs), i ? "orange" : "pink", { t: W(22, 1) }));
  S.speech(960, 330, 300, 90, 960, 470, W(22, 3), 0.25); S.text("OTHERS GO OUT MORE", 960, 345, { size: DS.type.caption, t: W(22, 3), c: DS.c("ink") });
  DS.card(S, "OTHERS HAVE MORE FUN", 960, 130, { size: DS.type.small });
  DS.card(S, "SAID WHILE OUT", 1330, 560, { size: DS.type.small, t: W(23, 3), tc: "red" });
  DS.vignette(S); }

// 9  Because when you picture everyone, / you picture the socialites.
{ const S = sc(9, { cam: "push" }); nightRoom(S);
  const seat = couch(S, 160, 960, 480);
  dave(S, 340, seat, "near", { sit: true, pose: "hold", mood: "flat", look: 6 });
  S.thought(1180, 500, 560, 300, 620, 640, W(25, 4), 0.3);
  S.fill(circ(1180, 560, 300, 190), W(26, 0), 0, DS.c("gold", 1), 0.5);
  party(S, [[1020, "pink", "bun"], [1180, "orange", "curly"], [1340, "purple", "spiky"]], 700, "mid", W(25, 4) + 0.1, 0.9);
  DS.card(S, "\"EVERYONE\"", 1180, 130, { size: DS.type.body, t: W(25, 4) });
  DS.card(S, "= THE SOCIALITES", 1180, 880, { size: DS.type.small, t: W(26, 0), tc: "red" });
  DS.vignette(S); }

// 10  Nobody posts / night three in the same hoodie.
{ const S = sc(10, { cam: "push", focus: "960 500" }); nightRoom(S);
  const P = bigPhone(S, 960, 530, 560, 800);
  DS.shape(S, rect(P.x0 + 20, P.y0 + 30, P.x1 - P.x0 - 40, 420), "night", { flat: true, tone: 2, w: "hair" });
  const seat = couch(S, P.x0 + 90, P.y0 + 440, 300);
  dave(S, P.x0 + 200, seat, "near", { s: 0.8, sit: true, outfit: "hoodie", outfitC: DS.c("gray"), mood: "flat", look: 6 });
  DS.shape(S, rrect(P.x0 + 120, P.y1 - 150, P.x1 - P.x0 - 240, 90, DS.r.md), "blue", { tone: 2 });
  S.text("POST", 960, P.y1 - 88, { size: DS.type.body, c: DS.P.white[0] });
  S.draw(line([P.x0 + 120, P.y1 - 160], [P.x1 - 120, P.y1 - 50], 0) + line([P.x1 - 120, P.y1 - 160], [P.x0 + 120, P.y1 - 50], 0), W(27, 1), 0, { c: DS.c("red"), w: DS.w.near });
  DS.card(S, "NIGHT 3", 400, 300, { size: DS.type.body, t: W(27, 0) });
  DS.card(S, "SAME HOODIE", 1530, 480, { size: DS.type.small, t: W(28, 0) });
  DS.vignette(S, 0.18); }

// 11  The World Health Organization says one in six people worldwide is lonely. / Dave: / "So it's worse."
{ const S = sc(11, { cam: "pull" }); const O = DS.outdoor(S, { hy: 620, path: [600, 1320] });
  [[820, "purple", "bun"], [980, "green", "short"], [1140, "orange", "curly"], [1300, "pink", "spiky"], [1460, "sky", "messy"]].forEach(([x, c, h]) => DS.figure(S, x, 780, "mid", { s: 1.2, hair: h, hairC: DS.c("brown", 0, "mid"), outfitC: DS.c(c, 0, "mid"), mood: "smile" }));
  DS.shadow(S, 1690, 800, 120); S.fill(circ(1690, 640, 150, 170), W(29, 11), 0, DS.c("blue", 1), 0.35);
  DS.figure(S, 1690, 800, "mid", { s: 1.2, hair: "side", hairC: DS.c("ink", 0, "mid"), outfitC: DS.c("gray", 0, "mid"), mood: "sad" });
  DS.card(S, "WHO · 2025", 1140, 130, { size: DS.type.small });
  DS.card(S, "1 IN 6 LONELY", 1300, 260, { size: DS.type.body, t: W(29, 5), tc: "blue" });
  const F = dave(S, 330, 960, "near", { s: 1.15, mood: "worried", look: 6, t: W(30, 0) });
  S.speech(330, 330, 230, 80, 330, 450, W(31, 0), 0.25); S.text("SO IT'S WORSE?", 330, 345, { size: DS.type.caption, t: W(31, 0), c: DS.c("ink") });
  F.face(W(31, 2), "sad", 6);
  DS.vignette(S); }

// 12  But Dave didn't post either. / So to ninety-one people, / Dave is out. / Too busy having fun.
{ const S = sc(12, { cam: "push" }); nightRoom(S);
  const seat = couch(S, 160, 960, 480, "green");
  const F = sam(S, 340, seat, "near", { sit: true, pose: "hold", mood: "worried", look: 6 }); handPhone(S, F);
  DS.card(S, "DAVE: 0 POSTS", 400, 300, { size: DS.type.small, t: W(32, 3) });
  S.thought(1220, 520, 520, 290, 640, 650, W(34, 0), 0.3);
  const D = dave(S, 1220, 720, "mid", { s: 1.15, pose: "armsUp", mood: "happy", t: W(34, 0) }); hat(S, D, "gold", W(34, 0));
  confetti(S, 900, 330, 1540, 420, 14, W(34, 0));
  DS.card(S, "TO 91 PEOPLE", 1220, 130, { size: DS.type.small, t: W(33, 2) });
  DS.card(S, "TOO BUSY HAVING FUN", 1220, 900, { size: DS.type.small, t: W(35, 0), tc: "red" });
  DS.vignette(S); }

// 13  Texting first feels weird. / But in twenty twenty-two, Peggy Liu found we underestimate how glad people are to hear from us.
{ const S = sc(13); const R = DS.room(S, { window: false });
  const F = dave(S, 380, 960, "near", { pose: "hold", mood: "worried", look: 6 }); handPhone(S, F);
  S.thought(380, 300, 200, 90, 380, 430, W(36, 2), 0.3); S.text("WEIRD?", 380, 320, { size: DS.type.small, t: W(36, 2), c: DS.c("ink") });
  S.draw(line([820, 860], [1620, 860], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.mid });
  bar(S, 940, 860, 200, 220, "gray", W(37, 8), "GUESS");
  bar(S, 1300, 860, 480, 220, "green", W(37, 10), "REAL");
  S.text("HOW GLAD THEY ARE", 1220, 920, { size: DS.type.caption, c: DS.c("ink"), t: W(37, 8) });
  DS.card(S, "2022 · PEGGY LIU", 1220, 140, { size: DS.type.small, t: W(37, 4) });
  F.face(W(37, 10), "wow", 6);
  DS.vignette(S); }

// 14  Saturday, nine-oh-four. / Dave texts one of them. / "What are you up to?" / "Nothing. You?"
{ const S = sc(14, { cam: "push", focus: "1100 560" }); nightRoom(S);
  const seat = couch(S, 200, 960, 520);
  const F = dave(S, 400, seat, "near", { sit: true, pose: "hold", mood: "determined", look: 6 }); handPhone(S, F);
  const P = bigPhone(S, 1360, 540, 620, 760);
  DS.shape(S, rrect(P.x1 - 540, P.y0 + 170, 520, 90, DS.r.md), "blue", { tone: 2, t: W(40, 0) });
  S.text("WHAT ARE YOU UP TO?", P.x1 - 280, P.y0 + 228, { size: DS.type.caption, t: W(40, 0), c: DS.P.white[0] });
  DS.shape(S, rrect(P.x0 + 20, P.y0 + 300, 400, 90, DS.r.md), "gray", { tone: 1, t: W(41, 0) });
  S.text("NOTHING. YOU?", P.x0 + 220, P.y0 + 358, { size: DS.type.caption, t: W(41, 0), c: DS.c("ink") });
  DS.card(S, "SAT · 9:04 PM", 460, 170, { size: DS.type.body });
  F.face(W(41, 1), "happy", 6);
  DS.vignette(S, 0.16); }

// 15  You are not alone. / You're one of the ninety-one. / Text one.
{ const S = sc(15, { cam: "pull" }); const wins = block(S);
  wins.forEach((b) => tvWin(S, b));
  const a = wins[19], b = wins[4];
  [a, b].forEach((w) => tvWin(S, w, W(44, 0), "gold"));
  S.draw(smooth([[a[0] + 50, a[1] + 20], [1060, 260], [b[0] + 50, b[1] + 20]]), W(44, 0), 0, { c: DS.c("gold"), w: DS.w.near });
  DS.card(S, "YOU ARE NOT ALONE", 960, 100, { size: DS.type.body, t: W(42, 0) });
  DS.card(S, "1 OF THE 91", 300, 420, { size: DS.type.small, t: W(43, 1) });
  DS.card(S, "TEXT ONE", 1640, 420, { size: DS.type.small, t: W(44, 0), tc: "red" });
  DS.vignette(S, 0.16); }
