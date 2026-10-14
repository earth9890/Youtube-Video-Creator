// look: v3
// You Are Not Short (1-min trial, 67 s). Mission: Dave wants out of the kids' row by Saturday. Crossfades, ~3–5 s scenes.
const BLUE2 = "#2f6fd6", WOOD = "#b08968", GOLD = "#f2b84b";
const lbl = (S, str, x, y, o = {}) => S.label(str, x, y, Object.assign({ t: S.start + 0.3, size: 78 }, o));
function dave(S, x, gy, o = {}) { // series Dave: side-parted hair, "D" shirt
  const s = o.s || 1.1, t = o.t ?? S.start;
  const F = S.fig(x, gy, Object.assign({ s, hair: "side", hairC: "#5a3825", outfit: "tee", outfitC: BLUE2 }, o)).draw(t, o.d ?? 0.6);
  F.face(t + 0.6, o.mood || "flat", o.look || 0);
  S.text(o.shirt || "D", x, gy - 255 * s + 70 * s, { size: 46 * s, t: t + 0.5, c: "#ffffff", parent: F.gi });
  if (o.pose) F.setPose(t + 0.65, o.pose);
  return F;
}
const person = (S, x, gy, o = {}) => { const s = o.s || 1, t = o.t ?? S.start; const F = S.fig(x, gy, Object.assign({ s, hair: "short", outfit: "tee" }, o)).draw(t, o.d ?? 0.5); F.face(t + 0.5, o.mood || "smile", o.look || 0); if (o.shirt) S.text(o.shirt, x, gy - 255 * s + 70 * s, { size: 44 * s, t: t + 0.4, c: "#ffffff", parent: F.gi }); if (o.pose) F.setPose(t + 0.55, o.pose); return F; };
function familyPhoto(S, t, o = {}) {
  const g = S.grp();
  S.draw(rect(330, 150, 1260, 760), t, 0.3, { w: 9, fill: "#fbf6e9", parent: g });
  S.draw(rect(300, 120, 1320, 820), t, 0.3, { w: 14, c: WOOD, parent: g });
  [[520, "bun", "#8e5bb5"], [760, "short", "#3f9e4a"], [1160, "curly", "#e07a5f"], [1400, "spiky", "#555555"]].forEach(([x, h, c], i) => person(S, x, 800, { s: 1.15, hair: h, outfitC: c, t: t + 0.1 + i * 0.08, d: 0.4, parent: g }));
  [[640, "#f2b84b"], [1280, "#e85d75"]].forEach(([x, c], i) => person(S, x, 880, { s: 0.6, hair: i ? "bun" : "spiky", outfitC: c, t: t + 0.3 + i * 0.1, d: 0.35, parent: g }));
  return g;
}
function football(S, x, y, r, t) { S.draw(circ(x, y, r), t, 0.2, { w: 5, fill: "#ffffff" }); S.fill(poly([[x, y - r * 0.35], [x + r * 0.33, y - r * 0.1], [x + r * 0.2, y + r * 0.28], [x - r * 0.2, y + r * 0.28], [x - r * 0.33, y - r * 0.1]], 0), t + 0.15, 0.1, INK, 1); }
function camera(S, x, y, s, t) {
  S.draw(rrect(x - 110 * s, y - 70 * s, 220 * s, 140 * s, 18 * s), t, 0.25, { w: 7, fill: "#3a3d4f" });
  S.draw(circ(x, y, 48 * s), t + 0.1, 0.2, { w: 7, fill: "#9fd3f5" });
  S.draw(rect(x - 70 * s, y - 95 * s, 50 * s, 25 * s), t + 0.15, 0.15, { w: 6, fill: "#3a3d4f" });
}

const CUES = [[1, 0], [4, 0], [6, 0], [8, 0], [9, 0], [12, 0], [14, 0], [16, 0], [19, 0], [21, 0], [23, 0], [25, 0], [28, 0], [31, 0]];
const WIN = sceneWindows(CUES, 0.15);
const sc = (k, o) => scene(WIN[k][0], WIN[k][1], o);

// 0  This is Dave. / Every family photo: front row, / with the kids.
{ const S = sc(0); S.bg("room", { window: false });
  familyPhoto(S, S.start);
  const F = dave(S, 960, 880, { s: 0.85, mood: "flat", t: W(1, 0) });
  lbl(S, "DAVE", 960, 90, { t: W(1, 2), size: 64 });
  S.ring(960, 690, 150, 230, W(3, 2), 0.3, { c: RED }); }

// 1  Saturday: his cousin's wedding. / Can a grown man grow in five days?
{ const S = sc(1); S.bg("room", { window: false });
  S.draw(rrect(1050, 260, 560, 420, 20), S.start + 0.1, 0.3, { w: 7, fill: "#fff6e6" });
  S.heart(1330, 360, 0.8, S.start + 0.3, 0.3, { fill: "#f28ca0" });
  S.text("WEDDING", 1330, 500, { size: 70, t: S.start + 0.4 }); S.text("SATURDAY", 1330, 600, { size: 60, t: W(4, 0), c: RED });
  const F = dave(S, 560, 790, { s: 1.2, mood: "worried", look: 6 });
  lbl(S, "5 DAYS", 1330, 170, { t: W(5, 6), c: RED });
  S.thought(560, 230, 190, 90, 560, 360, W(5, 2), 0.3); S.text("GROW?", 560, 255, { size: 64, t: W(5, 3) }); }

// 2  Dave's plan: copy Messi, whose growth hormone shots Barcelona paid for. / But Messi was a kid.
{ const S = sc(2); S.bg("day", { hy: 860 });
  const M = person(S, 700, 860, { s: 0.75, hair: "short", hairC: "#3a2a1a", outfitC: "#7ab8e8", shirt: "10", mood: "smile", t: W(6, 3) });
  football(S, 800, 830, 30, W(6, 3) + 0.4);
  S.tag(700, 420, "MESSI, AGE 11", W(6, 4), 0.3, { size: 44 });
  S.tag(1300, 420, "HORMONE SHOTS", W(6, 6), 0.3, { size: 44 });
  S.tag(1300, 520, "PAID BY BARCELONA", W(6, 9), 0.3, { size: 44, tc: "#2f5fbf" });
  lbl(S, "A KID", 700, 200, { t: W(7, 4), c: RED }); }

// 3  Dave's growth plates closed years ago.
{ const S = sc(3); S.bg("flat");
  const bx = 960;
  S.draw(rrect(bx - 50, 250, 100, 560, 40), S.start + 0.1, 0.35, { w: 7, fill: "#fbf6e9" });
  [[-1, 250], [1, 250], [-1, 810], [1, 810]].forEach(([k, y]) => S.draw(circ(bx + k * 48, y, 55), S.start + 0.1, 0.3, { w: 7, fill: "#fbf6e9" }));
  S.draw(line([bx - 70, 330], [bx + 70, 330], 0), W(8, 2), 0.25, { w: 8, c: RED });
  S.padlock(bx + 190, 330, 1.0, W(8, 4), 0.3);
  lbl(S, "GROWTH PLATE: CLOSED", 960, 140, { t: W(8, 2), size: 70 }); }

// 4  No stretch, pill or door-hang reopens them. / Dave tried all three. / Sore.
{ const S = sc(4); S.bg("room", { window: false });
  S.door(260, 300, 220, 490, S.start, 0.3);
  const F = dave(S, 370, 790, { s: 1.05, mood: "determined", pose: "armsUp", t: W(9, 5) - 0.3, d: 0.4 });
  S.draw(rrect(900, 560, 110, 170, 20), W(9, 2), 0.3, { w: 6, fill: "#ffffff" }); S.draw(rect(900, 540, 110, 40), W(9, 2), 0.2, { w: 6, fill: RED });
  S.cross(955, 650, 1.0, W(9, 6), 0.25);
  const G = dave(S, 1450, 790, { s: 1.05, mood: "tired", pose: "armsUp", t: S.start + 0.2 });
  S.tag(1450, 260, "STRETCH", W(9, 1), 0.25, { size: 40 });
  S.cross(370, 230, 1.0, W(9, 6) + 0.1, 0.25); S.cross(1450, 380, 1.0, W(9, 6) + 0.2, 0.25);
  F.face(W(11, 0), "tired", 0); G.face(W(11, 0), "cry", 0);
  lbl(S, "SORE.", 960, 170, { t: W(11, 0), c: RED, size: 90 }); }

// 5  But look who the world looks up to. / Lionel Messi, five foot seven, Sachin Tendulkar, five foot five,
{ const S = sc(5); S.bg("day", { hy: 860 });
  lbl(S, "WHO THE WORLD LOOKS UP TO", 960, 150, { t: W(12, 2), size: 64 });
  person(S, 640, 860, { s: 1.0, hair: "short", hairC: "#3a2a1a", outfitC: "#7ab8e8", shirt: "10", mood: "smile", t: W(13, 0) });
  football(S, 750, 830, 30, W(13, 0) + 0.4);
  S.tag(640, 400, "MESSI · 5'7\"", W(13, 2), 0.3, { size: 44 });
  const T = person(S, 1280, 860, { s: 0.97, hair: "curly", hairC: "#222222", outfitC: "#2f5fbf", shirt: "10", mood: "smile", pose: "hold", t: W(13, 5) });
  const [hx, hy] = T.hand("R", "hold"); S.draw(rrect(hx - 10, hy - 170, 26, 200, 10), W(13, 5) + 0.4, 0.25, { w: 6, fill: "#e8c58a" });
  S.tag(1280, 400, "SACHIN · 5'5\"", W(13, 7), 0.3, { size: 44 }); }

// 6  Salman Khan, reportedly five eight: normal height, / never once called normal.
{ const S = sc(6, { cam: "push" }); S.bg("dusk", { hy: 860 });
  const F = person(S, 960, 860, { s: 1.15, hair: "short", hairC: "#222222", outfitC: "#222222", mood: "smile", pose: "hips", t: S.start + 0.1 });
  [[-1], [1]].forEach(([k]) => S.draw(rrect(960 + k * 30 * 1.15 - 22, 860 - 309 * 1.15 - 18, 44, 26, 6), W(14, 1), 0.2, { w: 4, fill: INK }));
  S.tag(960, 340, "SALMAN KHAN · ~5'8\"", W(14, 1), 0.3, { size: 44 });
  S.crowd(3, 340, 860, 130, 0.75, S.start + 0.3, 0.4, { face: "wow", pose: "armsUp" });
  S.crowd(3, 1320, 860, 130, 0.75, S.start + 0.4, 0.4, { face: "wow", pose: "armsUp" });
  lbl(S, "NORMAL HEIGHT", 960, 140, { t: W(14, 5), size: 60 });
  S.strike(730, 95, 1190, 160, W(15, 2), 0.3);
  lbl(S, "SUPERSTAR", 960, 250, { t: W(15, 3), c: RED, size: 80 }); }

// 7  Peter Dinklage, four foot five, refused elf roles, / then played Tyrion. / Four Emmys.
{ const S = sc(7); S.bg("room", { window: false });
  const F = person(S, 560, 790, { s: 0.8, hair: "messy", hairC: "#5a3825", outfit: "tunic", outfitC: "#a4161a", mood: "flat", look: 6, t: S.start + 0.1 });
  S.tag(560, 360, "DINKLAGE · 4'5\"", W(16, 2), 0.3, { size: 44 });
  S.draw(poly([[830, 580], [900, 400], [970, 580], [830, 580]], 2), W(16, 5), 0.25, { w: 6, fill: "#3f9e4a" }); S.draw(circ(900, 395, 14), W(16, 5) + 0.15, 0.1, { w: 4, fill: GOLD }); S.strike(820, 390, 980, 600, W(16, 6), 0.25);
  S.text("ELF ROLES", 900, 640, { size: 40, t: W(16, 6) });
  lbl(S, "TYRION", 560, 200, { t: W(17, 2), c: "#a4161a" });
  [0, 1, 2, 3].forEach((i) => S.trophy(1150 + i * 170, 760, 0.9, W(18, 0) + i * 0.12, 0.3));
  lbl(S, "4 EMMYS", 1405, 320, { t: W(18, 1), c: GOLD, size: 84 }); }

// 8  "So height doesn't matter?" / "A little."
{ const S = sc(8); S.bg("room", { window: false });
  dave(S, 640, 790, { s: 1.2, mood: "wow", look: 6 });
  S.speech(640, 230, 300, 95, 640, 345, W(19, 0), 0.25); S.text("DOESN'T MATTER?", 640, 252, { size: 52, t: W(19, 1) });
  lbl(S, "A LITTLE.", 1360, 420, { t: W(20, 0), c: RED, size: 96 }); }

// 9  But in 2004, economist Nicola Persico found adult height barely changed pay. / Height at sixteen did, partly because tall teens joined more teams and clubs.
{ const S = sc(9, { cam: "push" }); S.bg("flat");
  lbl(S, "2004 · NICOLA PERSICO", 960, 140, { t: W(21, 5), size: 64 });
  S.draw(line([260, 840], [1000, 840], 0), W(21, 7), 0.3, { w: 6 });
  S.draw(rect(360, 640, 200, 200), W(21, 9), 0.3, { w: 6, fill: "#cfd6e3" }); S.text("ADULT HEIGHT", 460, 900, { size: 36, t: W(21, 9) });
  S.draw(rect(700, 420, 200, 420), W(22, 0), 0.4, { w: 6, fill: "#6abb5c" }); S.text("HEIGHT AT 16", 800, 900, { size: 36, t: W(22, 2) });
  S.text("PAY", 210, 560, { size: 44, t: W(21, 11) });
  const G = S.grp();
  S.crowd(3, 1260, 860, 150, 0.75, W(22, 9), 0.4, { face: "smile", dress: [{ outfitC: "#3f9e4a" }, { outfitC: "#3f9e4a" }, { outfitC: "#3f9e4a" }], parent: G });
  football(S, 1560, 830, 32, W(22, 10));
  S.tag(1410, 430, "TEAMS + CLUBS", W(22, 11), 0.3, { size: 44, tc: "#3f9e4a" }); }

// 10  Part of the bonus was never inches, / it was practice.
{ const S = sc(10); S.bg("flat");
  S.ruler(520, 840, 560, S.start + 0.1, 0.4, { labels: [[0.25, "5'0"], [0.5, "5'6"], [0.75, "6'0"]] });
  S.strike(380, 300, 680, 820, W(23, 5), 0.3);
  S.text("INCHES", 520, 920, { size: 48, t: W(23, 5) });
  S.dumbbell(1300, 520, 1.3, W(24, 2), 0.3);
  S.text("PRACTICE", 1300, 700, { size: 70, t: W(24, 2), c: "#3f9e4a" });
  lbl(S, "THE REAL BONUS", 960, 160, { t: W(24, 0), size: 70 }); }

// 11  So Dave practises: / sleeves to the wrist, trousers that don't puddle, one colour head to toe, shoulders back, / a calm toast, eyes up.
{ const S = sc(11); S.bg("room", { window: false });
  const F = dave(S, 500, 790, { s: 1.25, mood: "determined", outfitC: "#1f2a44", look: 6 });
  lbl(S, "DAVE PRACTISES", 500, 170, { t: W(25, 1), size: 64 });
  const C = S.checklist(980, 230, ["SLEEVES TO THE WRIST", "NO PUDDLING TROUSERS", "ONE COLOUR", "SHOULDERS BACK", "CALM TOAST", "EYES UP"], W(26, 0) - 0.3, 0.6, { gap: 92, size: 44 });
  [[26, 3], [26, 7], [26, 12], [26, 14], [27, 2], [27, 4]].forEach(([c, w], i) => S.tick(C.boxes[i][0], C.boxes[i][1], 0.7, W(c, w), 0.15));
  F.face(W(27, 3), "smile", 0); }

// 12  Saturday, front row, same height. / But the camera looks there first, / and Dave looks back.
{ const S = sc(12); S.bg("dusk", { hy: 860 });
  [[380, "bun", "#8e5bb5"], [620, "short", "#3f9e4a"], [1300, "curly", "#e07a5f"], [1540, "spiky", "#555555"]].forEach(([x, h, c], i) => person(S, x, 800, { s: 1.15, hair: h, outfitC: c, t: S.start + i * 0.06, d: 0.35 }));
  [[700, "#f2b84b"], [1220, "#e85d75"]].forEach(([x, c], i) => person(S, x, 880, { s: 0.6, hair: i ? "bun" : "spiky", outfitC: c, t: S.start + 0.2, d: 0.35 }));
  const F = dave(S, 960, 880, { s: 0.85, mood: "smile", outfitC: "#1f2a44", t: S.start + 0.1 });
  lbl(S, "SAME HEIGHT", 960, 140, { t: W(28, 4), size: 64 });
  camera(S, 1700, 260, 0.9, W(29, 1));
  S.arrow(1600, 300, 1030, 560, W(29, 4), 0.4, { c: RED, w: 9, bend: 0.15 });
  F.face(W(30, 2), "happy", 6); }

// 13  You are not short. / You're the first thing people see.
{ const S = sc(13, { cam: "pull" }); S.bg("dusk", { hy: 860 });
  familyPhoto(S, S.start);
  const F = dave(S, 960, 880, { s: 0.85, mood: "happy", outfitC: "#1f2a44", t: S.start + 0.1 });
  S.burst(960, 640, 150, 210, 12, W(32, 1), 0.4, { c: GOLD, w: 7 });
  lbl(S, "YOU ARE NOT SHORT", 960, 80, { t: W(31, 0), size: 70, c: "#1a1a1a" }); }
