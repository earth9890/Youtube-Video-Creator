
// ===================== 7. Six forty-five =====================
// two banks joined by a wire through a hub. coins ride along the wire at the given times
const wireNet = (S, o = {}) => {
  columns(S, 330, 780, 0.5, "BANK", { layer: "mid" }); columns(S, 1590, 780, 0.5, "BANK", { layer: "mid" });
  columns(S, 960, 780, 0.5, "WIRE", { layer: "mid", name: "sky" });
  S.draw(`M440 700 H850 M1070 700 H1480`, S.start, 0, { c: DS.c("gray", 2), w: DS.w.near * 1.5 });
};

// At half past six, with his billion still in the bank,
{ const S = sc(53, 0, { cam: "push", focus: "1000 600" }); DS.outdoor(S, DAWN); street(S, DAWN, { zebra: 200 });
  columns(S, 1330, 960, 1.0, "BANK", { layer: "mid" });
  [[1130, 700], [1530, 700]].forEach(([x, y]) => S.fill(rect(x - 30, y - 90, 60, 90), S.start, 0, DS.c("yellow", 1), 0.8));
  benchP(S, 380, 860, 800);
  const F = who(S, 620, 851, "near", Object.assign({}, DAVE, { sit: true, mood: "tired", look: 6, pose: "hold" }));
  card(S, "STILL IN THE BANK", 1330, 330, { t: W(53, 6), size: DS.type.caption });
  fin(S); }

// Dave learns something worse. Even if he finds something to buy, the money has to get there.
{ const S = sc(53, 11, { cam: "push", focus: "960 560" }); DS.room(S, ROOM);
  columns(S, 330, 780, 0.55, "BANK", { layer: "mid" }); house(S, 1590, 780, 1.2, "sand", { roof: "blue", layer: "mid" });
  dash(S.draw(`M520 600 H1380`, W(53, 18), 0, { c: DS.c("gray", 2), w: DS.w.near }), 24, 20);
  card(S, "SOMETHING TO BUY", 1590, 330, { t: W(53, 16), size: DS.type.caption });
  card(S, "THE MONEY HAS TO GET THERE", 960, 170, { t: W(53, 22), size: DS.type.caption, tc: "red" });
  coinMove(S, [520, 600], [1360, 600], W(53, 23), 2.4, 26);
  const F = dave(S, 960, 960, "near", { s: 0.95, look: 0, mood: "worried", pose: "think" });
  fin(S); }

// Big payments between American banks often run through the Federal Reserve's wire system,
{ const S = sc(54, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM);
  wireNet(S);
  coinMove(S, [440, 700], [850, 700], W(54, 4), 1.4, 24); coinMove(S, [1070, 700], [1480, 700], W(54, 6) + 0.6, 1.4, 24);
  card(S, "BIG BANK PAYMENTS", 960, 190, { t: W(54, 0) });
  card(S, "THE WIRE SYSTEM", 960, 860, { t: W(54, 10), size: DS.type.small });
  fin(S); }

// and it stops taking customer payments at six forty-five in the evening, Eastern time.
{ const S = sc(55, 0, { cam: "push", focus: "800 560" }); DS.room(S, ROOM);
  dayClock(S, 540, 540, 260, { labels: true, cut: W(55, 7) });
  columns(S, 1480, 800, 0.5, "WIRE", { layer: "mid", name: "sky" });
  S.draw(`M1000 760 H1200`, S.start, 0, { c: DS.c("gray", 2), w: DS.w.near * 1.5 });
  barrier(S, 1240, 700, 240, W(55, 2));
  coinMove(S, [1000, 740], [1170, 740], W(55, 5), 1.0, 24, { stay: true });
  card(S, "6:45 PM", 1480, 330, { t: W(55, 7), tc: "red", size: DS.type.title }); card(S, "EASTERN TIME", 1480, 450, { t: W(55, 11), size: DS.type.caption });
  fin(S, { no: true }); }

// Dave's real deadline was never midnight. It's six forty-five, and it's already six forty-one.
{ const S = sc(56, 0, { cam: "none", focus: "800 520" }); DS.room(S, ROOM);
  dayClock(S, 800, 540, 300, { labels: true, cut: true });
  xMark(S, 800, 200, 0.9, W(56, 3)); card(S, "NOT MIDNIGHT", 800, 130, { t: W(56, 3), tc: "red", size: DS.type.caption });
  card(S, "6:45 PM", 1520, 330, { t: W(56, 6), tc: "red", size: DS.type.title });
  card(S, "4 MINUTES LEFT", 1520, 460, { t: W(56, 12), tc: "red", size: DS.type.caption });
  const F = dave(S, 1520, 960, "near", { look: -8, mood: "worried", pose: "head" }); sweat(S, F, W(56, 12));
  S.zoom(700, 500, 1.2, W(56, 11), 1.6);
  DS.vignette(S); }

// Four minutes? My trolley took twenty.
{ const S = sc(57, 0, { cam: "push", focus: "800 600" }); DS.room(S, STORE); shelves(S, 420, 170, 1080, 400, { rows: 2 });
  const F = dave(S, 560, 960, "near", { s: 1.45, look: 4, mood: "wow", pose: "head" }); talk(S, F, W(57, 0), END(57));
  say(S, 800, 250, 440, 120, 640, 520, ["“FOUR MINUTES?", "MY TROLLEY TOOK TWENTY.”"], W(57, 0), { size: DS.type.small });
  trolley(S, 1380, 960, 1.3);
  [[1130, "4 MIN", 24], [1560, "20 MIN", 120]].forEach(([x, s, d], i) => { const sw = stopwatch(S, x, 460, 100, { go: W(57, 1) + i * 0.2, dur: 1.5, deg: d }); fadeG(S, sw, W(57, 1) + i * 0.2); card(S, s, x, 640, { t: W(57, 1) + i * 0.2, size: DS.type.caption }); });
  fin(S); }

// He's lucky it's a weekday. On Saturdays and Sundays, that system doesn't run at all.
{ const S = sc(58, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM);
  const D = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  D.forEach((d, i) => { const x = 300 + i * 220, we = i >= 5, t = we ? W(58, 5) + (i - 5) * 0.4 : W(58, 1) + i * 0.1; DS.drop(S, rect(x + 6, 346, 200, 260)); const g = S.grp(); DS.shape(S, rect(x, 340, 200, 260), "white", { flat: true, w: "detail", parent: g }); DS.shape(S, rect(x, 340, 200, 56), we ? "red" : "green", { tone: 1, flat: true, w: "detail", parent: g }); txt(S, d, x + 100, 384, { parent: g, c: DS.P.white[0] }); fadeG(S, g, t);
    if (we) xMark(S, x + 100, 500, 1.8, W(58, 10) + (i - 5) * 0.3); else tick(S, x + 100, 500, 1.6, W(58, 3) + i * 0.1); });
  stamp(S, 1500, 720, "NO WIRE", W(58, 11), "red", { size: DS.type.body });
  const F = dave(S, 420, 960, "near", { look: 6, mood: "happy", pose: "shrug" });
  fin(S); }
