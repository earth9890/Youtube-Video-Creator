// look: v3
// You Are Not Ugly (1-min trial, 63 s). Mystery: two lying witnesses (phone, mirror). Crossfades, ~3–5 s scenes.
const BLUE2 = "#2f6fd6", GLASS = "#dff3ff", WOOD = "#b08968";
const lbl = (S, str, x, y, o = {}) => S.label(str, x, y, Object.assign({ t: S.start + 0.3, size: 78 }, o));
// Dave: side-parted hair + a "D" on his shirt, so the mirror flip is visible
function dave(S, x, gy, o = {}) {
  const s = o.s || 1.2, t = o.t ?? S.start;
  const F = S.fig(x, gy, Object.assign({ s, hair: "side", hairC: "#5a3825", outfit: "tee", outfitC: BLUE2 }, o)).draw(t, o.d ?? 0.6);
  F.face(t + 0.6, o.mood || "flat", o.look || 0);
  S.text("D", x, gy - 255 * s + 70 * s, { size: 46 * s, t: t + 0.5, c: "#ffffff", parent: F.gi });
  if (o.pose) F.setPose(t + 0.65, o.pose);
  return F;
}
const mirrorG = (F, x) => tl.set(F.g, { attr: { transform: `translate(${2 * x} 0) scale(-1 1)` } }, 0);
function mirror(S, x, y, w, h, t, o = {}) { // x,y = top-left
  const g = S.grp(o.parent);
  S.draw(rrect(x - 18, y - 18, w + 36, h + 36, 30), t, 0.35, { w: 7, fill: WOOD, parent: g });
  S.draw(rrect(x, y, w, h, 20), t + 0.1, 0.3, { w: 5, fill: GLASS, parent: g });
  S.draw(line([x + w * 0.15, y + h * 0.12], [x + w * 0.35, y + h * 0.04], 0), t + 0.3, 0.15, { w: 8, c: "#ffffff", parent: g });
  return g;
}
// a face in a frame: nose = width factor (1 = normal), mood: smile/flat/tired/sad
function portrait(S, cx, cy, w, t, o = {}) {
  const g = S.grp(o.parent), h = w * 1.2, r = w * 0.3, nose = o.nose || 1;
  S.draw(rect(cx - w / 2, cy - h / 2, w, h), t, 0.25, { w: 6, fill: o.bg || "#fbf6e9", parent: g });
  S.draw(circ(cx, cy + h * 0.05, r * (o.wide || 1), r), t + 0.1, 0.25, { w: 5, fill: "#ffffff", parent: g });
  S.draw(smooth(arcPts(cx - r * 0.1, cy + h * 0.05 - r * 0.15, r * 1.02, 195, 330, 10)), t + 0.2, 0.15, { w: r * 0.28, c: "#5a3825", parent: g });
  [-1, 1].forEach((k) => S.fill(circ(cx + k * r * 0.38 * (o.wide || 1), cy + h * 0.02, r * 0.08), t + 0.3, 0.1, INK, 1, g));
  S.draw(circ(cx, cy + h * 0.1, r * 0.13 * nose, r * 0.1 * Math.sqrt(nose)), t + 0.35, 0.1, { w: 4, fill: "#ffd9c2", parent: g });
  const m = o.mood || "smile", my = cy + h * 0.05 + r * 0.45;
  if (m === "smile") S.draw(smooth(arcPts(cx, my - r * 0.15, r * 0.3, 20, 160, 8)), t + 0.4, 0.1, { w: 4, parent: g });
  else if (m === "sad") S.draw(smooth(arcPts(cx, my + r * 0.15, r * 0.3, 200, 340, 8)), t + 0.4, 0.1, { w: 4, parent: g });
  else S.draw(line([cx - r * 0.25, my], [cx + r * 0.25, my], 0), t + 0.4, 0.1, { w: 4, parent: g });
  if (o.tired) [-1, 1].forEach((k) => S.draw(smooth(arcPts(cx + k * r * 0.38, cy + h * 0.06, r * 0.12, 20, 160, 6)), t + 0.35, 0.1, { w: 3, c: "#7d6b9e", parent: g }));
  return g;
}
function phone(S, x, y, s, t, o = {}) { // centre
  const g = S.grp(o.parent), w = 150 * s, h = 270 * s;
  S.draw(rrect(x - w / 2, y - h / 2, w, h, 24 * s), t, 0.3, { w: 7, fill: "#2b2d42", parent: g });
  S.draw(rect(x - w / 2 + 12 * s, y - h / 2 + 26 * s, w - 24 * s, h - 52 * s), t + 0.15, 0.2, { w: 3, fill: "#eaf6ff", parent: g });
  if (o.eyes) { [-1, 1].forEach((k) => S.draw(circ(x + k * 30 * s, y - 40 * s, 18 * s, 22 * s), t + 0.3, 0.1, { w: 4, fill: "#ffffff", parent: g })); S.fill(circ(x - 22 * s, y - 36 * s, 8 * s), t + 0.4, 0.1, INK, 1, g); S.fill(circ(x + 38 * s, y - 36 * s, 8 * s), t + 0.4, 0.1, INK, 1, g); }
  return g;
}
function lineupWall(S, t) {
  S.fill(rect(0, 0, 1920, 1080), t, 0.2, "#d9d4c7", 1);
  [0, 1, 2, 3, 4, 5].forEach((i) => { const y = 860 - i * 110; S.draw(line([120, y], [1800, y], 0), t + 0.05 * i, 0.2, { w: 3, c: "#8c8577" }); S.text(`${4 + i} FT`, 70, y + 12, { size: 30, t: t + 0.05 * i, c: "#6b6458", anchor: "start" }); });
  S.fill(rect(0, 860, 1920, 220), t, 0.2, "#a49c8c", 1);
}

const CUES = [[1, 0], [4, 0], [6, 0], [10, 0], [12, 0], [16, 0], [18, 0], [20, 0], [23, 0], [26, 0], [29, 0], [31, 0], [35, 0]];
const WIN = sceneWindows(CUES, 0.15);
const sc = (k, o) => scene(WIN[k][0], WIN[k][1], o);

// 0  This is Dave. / He took forty selfies, / and deleted forty.
{ const S = sc(0); S.bg("room", { window: false });
  const F = dave(S, 560, 790, { mood: "flat", pose: "point" });
  lbl(S, "DAVE", 560, 230, { t: W(1, 2) });
  const bx = 1300, by = 790;
  S.draw(poly([[bx - 110, by - 230], [bx + 110, by - 230], [bx + 85, by], [bx - 85, by], [bx - 110, by - 230]], 1), W(2, 1), 0.3, { w: 7, fill: "#9aa3b5" });
  for (let i = 0; i < 6; i++) { const p = portrait(S, 760, 480, 110, W(2, 3) + i * 0.12, { mood: "flat", nose: 2 }); S.move(p, W(2, 3) + i * 0.12 + 0.15, 0.45, { x: bx - 760 - 40 + i * 14, y: by - 520 - 120 + i * 8, rotation: 25 + i * 20, scale: 0.6, transformOrigin: "50% 50%" }, "power2.in"); S.move(p, W(2, 3) + i * 0.12 + 0.6, 0.1, { opacity: 0 }); }
  lbl(S, "DELETED: 40", 1300, 330, { t: W(3, 1), c: RED }); }

// 1  But the mirror says he's fine, / so which Dave is real?
{ const S = sc(1); S.bg("room", { window: false });
  mirror(S, 1120, 260, 360, 560, S.start);
  const F = dave(S, 640, 790, { mood: "worried", look: 6 });
  const R = dave(S, 1300, 790, { s: 0.95, mood: "smile", t: W(4, 3) }); mirrorG(R, 1300);
  lbl(S, "WHICH DAVE IS REAL?", 960, 170, { t: W(5, 1) }); }

// 2  First suspect, the phone: / in 2018, Paskhover's team found / at one foot, a nose looks 30 % wider / than at five feet.
{ const S = sc(2); S.bg("flat");
  phone(S, 520, 520, 1.5, S.start + 0.1, { eyes: true });
  S.tag(520, 250, "SUSPECT #1", W(6, 0), 0.3, { size: 46, tc: RED });
  lbl(S, "2018 · PASKHOVER", 1300, 170, { t: W(7, 2), size: 60 });
  portrait(S, 1060, 560, 260, W(8, 2), { nose: 3.2, wide: 1.05, mood: "flat" }); S.text("1 FT", 1060, 800, { size: 52, t: W(8, 2) + 0.2 });
  portrait(S, 1500, 560, 260, W(9, 2), { nose: 1, mood: "smile" }); S.text("5 FT", 1500, 800, { size: 52, t: W(9, 2) + 0.2 });
  lbl(S, "+30% NOSE", 1060, 300, { t: W(8, 6), c: RED, size: 60 }); }

// 3  Dave's nose didn't grow. / His arm is just short.
{ const S = sc(3); S.bg("room", { window: false });
  const F = dave(S, 760, 790, { s: 1.35, mood: "flat", pose: "reach" });
  S.tick(400, 300, 1.0, W(10, 3), 0.3, { c: GREEN }); S.text("NOSE: FINE", 400, 420, { size: 52, t: W(10, 3) });
  const [hx, hy] = F.hand("R", "reach"); phone(S, hx + 30, hy - 40, 0.45, W(11, 1));
  lbl(S, "ARM: SHORT", 1400, 260, { t: W(11, 3), c: RED, to: [hx + 10, hy], bend: 0.2 }); }

// 4  But the mirror lies too: / it shows Dave backwards. / In 1977, women preferred their mirror image; / their friends, the real one.
{ const S = sc(4); S.bg("room", { window: false });
  mirror(S, 1060, 240, 380, 580, S.start);
  S.tag(1250, 180, "SUSPECT #2", S.start + 0.3, 0.3, { size: 46, tc: RED });
  dave(S, 600, 790, { s: 1.15, mood: "flat", look: 6 });
  const R = dave(S, 1250, 790, { s: 0.95, mood: "flat", look: -6, t: S.start + 0.2 }); mirrorG(R, 1250);
  lbl(S, "BACKWARDS", 600, 230, { t: W(13, 3), c: RED, size: 64 });
  lbl(S, "1977", 1700, 330, { t: W(14, 1), size: 64 });
  S.tag(1700, 470, "YOU: MIRROR", W(14, 6), 0.3, { size: 40 }); S.tag(1700, 560, "FRIENDS: REAL", W(15, 1), 0.3, { size: 40 }); }

// 5  Dave likes Mirror Dave out of habit. / Nobody else has ever met him.
{ const S = sc(5); S.bg("room", { window: false });
  mirror(S, 840, 240, 360, 560, S.start);
  const R = dave(S, 1020, 790, { s: 0.95, mood: "smile", t: S.start + 0.1 }); mirrorG(R, 1020);
  S.heart(1020, 200, 0.8, W(16, 2), 0.3, { fill: "#f28ca0" });
  lbl(S, "MIRROR DAVE", 1020, 120, { t: W(16, 3), size: 60 });
  S.crowd(3, 1450, 830, 140, 0.8, W(17, 0), 0.5, { face: "worried" });
  S.text("WHO?", 1590, 360, { size: 70, t: W(17, 3), c: RED }); }

// 6  Both witnesses lie. / "Could the real me be worse?"
{ const S = sc(6); lineupWall(S, S.start);
  phone(S, 700, 560, 1.3, S.start + 0.2, { eyes: true });
  mirror(S, 1000, 330, 240, 420, S.start + 0.3);
  S.tag(700, 820, "LIAR", W(18, 2), 0.25, { size: 50, tc: RED }); S.tag(1120, 820, "LIAR", W(18, 2) + 0.1, 0.25, { size: 50, tc: RED });
  dave(S, 1560, 860, { s: 1.0, mood: "worried", look: -6, t: S.start + 0.2 });
  S.thought(1560, 300, 210, 100, 1540, 480, W(19, 0), 0.3); S.text("WORSE?", 1560, 320, { size: 64, t: W(19, 2) }); }

// 7  But in 2011, Rob Jenkins found / one person's photos vary in looks / more than different people do.
{ const S = sc(7, { cam: "push" }); S.bg("flat");
  lbl(S, "2011 · ROB JENKINS", 960, 160, { t: W(20, 3), size: 64 });
  const V = [{ mood: "smile" }, { mood: "flat", tired: true }, { mood: "sad", nose: 1.6 }, { mood: "smile", wide: 1.1 }, { mood: "flat", nose: 2.2 }, { mood: "smile", tired: true }];
  V.forEach((o, i) => portrait(S, 480 + (i % 3) * 480, 450 + Math.floor(i / 3) * 330, 200, W(21, 1) + i * 0.15, Object.assign({ bg: i % 2 ? "#eef4ff" : "#fbf6e9" }, o)));
  S.tag(960, 920, "ALL DAVE", W(22, 2), 0.3, { size: 46, tc: RED }); }

// 8  One photo of Dave / can look less like Dave / than a stranger.
{ const S = sc(8); S.bg("flat");
  portrait(S, 600, 520, 300, S.start + 0.1, { mood: "flat", nose: 2.6, tired: true }); S.text("DAVE", 600, 800, { size: 52, t: S.start + 0.3 });
  portrait(S, 1320, 520, 300, W(24, 2), { mood: "smile" }); S.text("DAVE", 1320, 800, { size: 52, t: W(24, 3) });
  S.text("≠", 960, 560, { size: 160, t: W(24, 2), c: RED });
  portrait(S, 1700, 600, 180, W(25, 2), { mood: "flat", bg: "#eaeaea" }); S.text("STRANGER", 1700, 760, { size: 36, t: W(25, 2) + 0.1 });
  lbl(S, "ONE PHOTO ≠ YOU", 960, 170, { t: W(23, 2), size: 70 }); }

// 9  The real Dave is the one others see. / The only person who's never seen him / is Dave.
{ const S = sc(9); S.bg("day", { hy: 860 });
  const F = dave(S, 960, 860, { s: 1.2, mood: "smile" });
  S.crowd(2, 420, 860, 180, 1.0, S.start + 0.2, 0.5, { face: "smile", dress: [{ hair: "bun", outfitC: "#8e5bb5" }, { hair: "curly", outfitC: "#e07a5f" }] });
  S.crowd(2, 1400, 860, 180, 1.0, S.start + 0.3, 0.5, { face: "smile", dress: [{ hair: "spiky", outfitC: "#3f9e4a" }, { hair: "short", outfitC: "#f2b84b" }] });
  lbl(S, "EVERYONE SEES HIM", 960, 170, { t: W(26, 4), size: 70 });
  S.draw(rrect(880, 860 - 309 * 1.2 - 30, 160, 44, 20), W(28, 0), 0.25, { w: 5, fill: INK });
  lbl(S, "EXCEPT DAVE", 960, 290, { t: W(28, 1), c: RED, size: 60 }); }

// 10  "So I need better selfies?" / "Further ones."
{ const S = sc(10); S.bg("room", { window: false });
  const F = dave(S, 760, 790, { s: 1.25, mood: "wow", look: 6, pose: "reach" });
  S.speech(760, 230, 270, 90, 760, 340, W(29, 0), 0.3); S.text("BETTER SELFIES?", 760, 250, { size: 52, t: W(29, 1) });
  lbl(S, "FURTHER ONES.", 1400, 420, { t: W(30, 0), size: 84, c: RED }); }

// 11  Caltech found faces shot further away / look more attractive. / Ask a friend. / Arms that long are rare.
{ const S = sc(11); S.bg("flat");
  lbl(S, "CALTECH", 960, 160, { t: W(31, 0), size: 64 });
  portrait(S, 520, 470, 220, W(31, 3), { nose: 2.4, mood: "flat" }); S.text("CLOSE", 520, 680, { size: 44, t: W(31, 3) });
  portrait(S, 960, 470, 220, W(32, 1), { mood: "smile" }); S.text("FAR", 960, 680, { size: 44, t: W(32, 1) });
  S.heart(960, 300, 0.6, W(32, 2), 0.3, { fill: "#f28ca0" });
  const F = dave(S, 1250, 860, { s: 0.9, mood: "flat", look: 6, pose: "reach", t: W(34, 0) - 0.3, d: 0.35 });
  const [hx, hy] = F.hand("R", "reach");
  S.draw(line([hx, hy], [hx + 330, hy - 60], 0), W(34, 3), 0.4, { w: 9 }); phone(S, hx + 360, hy - 70, 0.35, W(34, 3) + 0.3);
  S.tag(1500, 300, "RARE", W(34, 4), 0.25, { size: 40, tc: RED }); }

// 12  You are not ugly. / You were standing too close. / Dave took one more photo, / from five feet. / He kept it.
{ const S = sc(12, { cam: "pull" }); S.bg("day", { hy: 860 });
  lbl(S, "YOU ARE NOT UGLY", 960, 160, { t: W(35, 0), size: 90 });
  const F = dave(S, 560, 860, { s: 1.15, mood: "smile", look: 6, t: S.start + 0.1 });
  const P = S.fig(1400, 860, { s: 1.0, hair: "bun", hairC: "#5a3825", outfit: "tee", outfitC: "#8e5bb5", pose: "reach" }).draw(W(37, 0), 0.4); P.face(W(37, 0) + 0.4, "smile", 6); mirrorG(P, 1400);
  phone(S, 1290, 560, 0.35, W(37, 3));
  S.draw(line([660, 330], [1300, 330], 0), W(38, 1), 0.4, { w: 5, c: "#555555" }); [660, 1300].forEach((x) => S.draw(line([x, 305], [x, 355], 0), W(38, 1), 0.2, { w: 5, c: "#555555" })); S.text("5 FT", 980, 310, { size: 50, t: W(38, 2) });
  const ph = portrait(S, 980, 580, 200, W(39, 0) - 0.3, { mood: "smile" });
  S.heart(1100, 450, 0.5, W(39, 2), 0.3, { fill: "#f28ca0" });
  S.tick(860, 450, 0.8, W(39, 2), 0.3, { c: GREEN }); }
