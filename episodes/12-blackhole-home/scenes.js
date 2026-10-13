// look: v3
// What If We Live Inside a Black Hole? — fun cut (~75 s). Comedy first: crossfades, ~3 s scenes, big gag props.
const OR = "#ff9f1c", OR2 = "#ffd166", WA = "#25d366";
const dur = 0.7; // draw-on time
const spin = (e, x, y, t, d, turns = -1) => tl.fromTo(e, { attr: { transform: `rotate(0 ${x} ${y})` } }, { attr: { transform: `rotate(${360 * turns} ${x} ${y})` }, duration: d, ease: "none", immediateRender: false }, t);
const pts2 = (x, y, r, P) => P.map(([a, b]) => [x + a * r, y + b * r]);
// black hole: back half of the disk, lensed arc, the hole, photon ring, front half of the disk
function blackHole(S, x, y, r, t) {
  const g = S.grp(), dg = S.grp(g);
  const disk = (a0, a1) => smooth(arcPts(x, y, r * 2.1, a0, a1, 24, r * 0.5));
  S.draw(disk(180, 360), t, dur * 0.5, { w: r * 0.16, c: OR, parent: dg });
  S.draw(smooth(arcPts(x, y + r * 0.1, r * 1.3, 170, 370, 24, r * 1.25)), t, dur * 0.6, { w: r * 0.14, c: OR, parent: g });
  S.draw(circ(x, y, r), t, dur * 0.6, { w: 8, c: "#000000", fill: "#000000", parent: g });
  S.draw(circ(x, y, r * 1.06), t, dur * 0.5, { w: 4, c: OR2, parent: g });
  S.draw(disk(0, 180), t + dur * 0.3, dur * 0.5, { w: r * 0.16, c: OR, parent: g });
  S.draw(smooth(arcPts(x, y, r * 2.1, 10, 170, 24, r * 0.5)), t + dur * 0.4, dur * 0.5, { w: r * 0.05, c: OR2, parent: g });
  return g;
}
function house(S, x, y, s, t, o = {}) { // y = ground
  const g = S.grp();
  S.draw(rect(x - 110 * s, y - 170 * s, 220 * s, 170 * s), t, dur * 0.4, { w: 7, fill: "#f6e7c8", parent: g });
  S.draw(poly([[x - 140 * s, y - 165 * s], [x, y - 300 * s], [x + 140 * s, y - 165 * s], [x - 140 * s, y - 165 * s]], 2), t + dur * 0.3, dur * 0.3, { w: 7, fill: "#d1495b", parent: g });
  if (o.door !== false) S.draw(rect(x - 30 * s, y - 100 * s, 60 * s, 100 * s), t + dur * 0.5, dur * 0.2, { w: 6, fill: "#8a5a3c", parent: g });
  S.draw(rect(x + 45 * s, y - 140 * s, 50 * s, 50 * s), t + dur * 0.6, dur * 0.2, { w: 5, fill: "#ffe066", parent: g });
  return g;
}
function earth(S, x, y, r, t) {
  const g = S.grp();
  S.draw(circ(x, y, r), t, dur * 0.5, { w: 7, fill: "#4a9fe0", parent: g });
  S.draw(smooth(pts2(x, y, r, [[-0.6, -0.3], [-0.2, -0.6], [0.2, -0.4], [0.1, 0], [-0.3, 0.2], [-0.6, -0.3]])) + " Z", t + dur * 0.3, dur * 0.4, { w: 5, fill: "#70b55e", parent: g });
  S.draw(smooth(pts2(x, y, r, [[0.3, 0.2], [0.65, 0.1], [0.6, 0.5], [0.3, 0.6], [0.3, 0.2]])) + " Z", t + dur * 0.4, dur * 0.4, { w: 5, fill: "#70b55e", parent: g });
  return g;
}
function galaxy(S, x, y, r, t, o = {}) { // o.dir = 1 clockwise, -1 counter; o.spin = seconds of rotation; o.eyes = shifty eyes
  const g = S.grp(), arms = S.grp(g), d = o.dir || 1;
  [0, Math.PI].forEach((ph) => S.draw(smooth(Array.from({ length: 14 }, (_, i) => { const a = ph + d * i * 0.42, k = 0.12 + i * 0.065; return [x + Math.cos(a) * r * k, y + Math.sin(a) * r * k * 0.8]; })), t, dur * 0.6, { w: Math.max(3, r * 0.07), c: o.c || "#cdb4ff", parent: arms }));
  S.draw(circ(x, y, r * 0.16), t, dur * 0.3, { w: 3, c: OR2, fill: "#fff3c4", parent: arms });
  if (o.spin) spin(arms, x, y, t + 0.3, o.spin, d * 0.5);
  if (o.eyes) { // eyes glance left, then right
    const e = S.grp(g), ex = r * 0.22, er = r * 0.16;
    [-1, 1].forEach((k) => S.draw(circ(x + k * ex, y - r * 0.05, er, er * 1.2), t + 0.3, 0.2, { w: 4, fill: "#ffffff", parent: e }));
    const p = S.grp(e);
    [-1, 1].forEach((k) => S.fill(circ(x + k * ex, y - r * 0.02, er * 0.5), t + 0.45, 0.1, INK, 1, p));
    tl.to(p, { x: -er * 0.45, duration: 0.25, ease: "power2.out" }, t + 0.8);
    tl.to(p, { x: er * 0.45, duration: 0.25, ease: "power2.out" }, t + 1.6);
  }
  return g;
}
function wifi(S, x, y, s, t, bars = 1) { // y = dot; arcs open upward; unlit arcs grey
  const g = S.grp();
  S.draw(circ(x, y, 12 * s), t, 0.15, { w: 4, fill: INK, parent: g });
  [1, 2, 3].forEach((k) => S.draw(smooth(arcPts(x, y, 38 * k * s, 225, 315, 8)), t + 0.1 * k, 0.2, { w: 13 * s, c: k <= bars ? INK : "#b9b9b9", parent: g }));
  return g;
}
function car(S, x, gy, s, t, c = RED) {
  const g = S.grp();
  S.draw(rrect(x - 110 * s, gy - 95 * s, 220 * s, 60 * s, 18 * s), t, dur * 0.4, { w: 6, fill: c, parent: g });
  S.draw(poly([[x - 60 * s, gy - 95 * s], [x - 35 * s, gy - 145 * s], [x + 45 * s, gy - 145 * s], [x + 70 * s, gy - 95 * s]], 2), t + 0.15, dur * 0.3, { w: 6, fill: "#bfe7fb", parent: g });
  [-1, 1].forEach((k) => S.draw(circ(x + k * 65 * s, gy - 32 * s, 28 * s), t + 0.25, 0.2, { w: 6, fill: "#333333", parent: g }));
  return g;
}
function bubble(S, txt, x, y, t, o = {}) { // chat bubble, x = left edge
  const g = S.grp(), size = o.size || 46, w = txt.length * size * 0.62 + 50;
  S.draw(rrect(x, y - size * 0.8, w, size * 1.6, 18), t, 0.2, { w: 5, fill: o.fill || "#ffffff", parent: g });
  S.text(txt, x + w / 2, y + size * 0.35, { size, t: t + 0.1, parent: g });
  return g;
}
const stars = (S, n = 40) => { for (let i = 0; i < n; i++) S.fill(circ(rnd() * 1920, rnd() * 1000, 2 + rnd() * 3), S.start, 0.2, "#ffffff", 0.85); };
const hero = (S, x, gy, o = {}) => { const F = S.fig(x, gy, Object.assign({ s: 1.1, hair: "short", outfit: "tee", outfitC: "#2f6fd6" }, o)).draw(o.t ?? S.start, o.d ?? 0.6); F.face((o.t ?? S.start) + 0.6, o.mood || "smile", o.look || 0); if (o.pose) F.setPose((o.t ?? S.start) + 0.65, o.pose); return F; };
const doc = (S, x, gy, o = {}) => hero(S, x, gy, Object.assign({ hair: "side", hairC: "#8a8a8a", outfit: "apron", outfitC: "#ffffff" }, o));
const lbl = (S, str, x, y, o = {}) => S.label(str, x, y, Object.assign({ t: S.start + 0.4, size: 78 }, o));

const CUES = [[1, 0], [1, 7], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [7, 9], [8, 0], [9, 0], [9, 15], [10, 0], [10, 5], [10, 14], [11, 0], [11, 7], [12, 0], [13, 0], [14, 0], [15, 0], [15, 7]];
const WIN = sceneWindows(CUES, 0.15);
const sc = (k, o) => scene(WIN[k][0], WIN[k][1], o);

// 0 Your house has walls, a roof…
{ const S = sc(0, { cam: "push" }); S.bg("day"); house(S, 960, 860, 1.9, S.start + 0.1); lbl(S, "YOUR HOUSE", 960, 150, { t: S.start + 0.2 }); }
// 1 …and Wi-Fi that only works in one corner.
{ const S = sc(1); S.bg("room", { window: false }); const F = hero(S, 1640, 790, { s: 1.15, mood: "worried", look: 5, pose: "armsUp" }); S.phone(1640, 330, 0.8, S.start + 0.6, 0.3, { screen: "feed" }); wifi(S, 1640, 220, 1, S.start + 0.8, 1); lbl(S, "ONE CORNER", 760, 260, { t: W(1, 11), c: RED, to: [1500, 420] }); lbl(S, "1 BAR", 760, 420, { t: W(1, 12), size: 64 }); }
// 2 What it might not have... is an exit.
{ const S = sc(2); S.bg("night", { hy: 780 }); house(S, 960, 830, 1.6, S.start); hero(S, 520, 830, { s: 1.1, mood: "worried", look: 5, t: S.start + 0.3 }); S.cross(960, 700, 1.6, W(2, 6), 0.3); lbl(S, "NO EXIT?", 960, 140, { c: "#ffffff", t: W(2, 5) }); }
// 3 …our whole universe is sitting inside a black hole.
{ const S = sc(3, { cam: "pull" }); S.bg("space"); stars(S, 50); blackHole(S, 960, 560, 300, S.start); house(S, 960, 620, 0.6, W(3, 6)); earth(S, 1090, 470, 45, W(3, 4)); lbl(S, "INSIDE A BLACK HOLE", 960, 120, { c: OR2, t: W(3, 9) }); }
// 4 Mondays. Traffic. Your electricity bill.
{ const S = sc(4); S.bg("white", { floor: false });
  const c1 = W(4, 5), c2 = W(4, 6), c3 = W(4, 8), p0 = S.start + 0.4;
  [640, 1280].forEach((x) => S.draw(`M${x} 230 L${x} 1100`, p0, 0.3, { w: 10, c: "#111111" }));
  S.calendar(190, 340, 3, 2, 100, 90, p0, 0.4, { title: "MON" }); S.text("MONDAY", 320, 760, { size: 60, t: c1 + 0.2, c: RED });
  car(S, 960, 560, 0.9, p0 + 0.2, RED); car(S, 960, 720, 0.9, p0 + 0.35, "#2f6fd6"); S.text("TRAFFIC", 960, 840, { size: 60, t: c2 + 0.2, c: RED });
  S.draw(rect(1470, 300, 260, 340), p0 + 0.4, 0.25, { w: 6, fill: "#ffffff" }); [380, 430, 480].forEach((y, i) => S.draw(line([1510, y], [1690, y], 2), p0 + 0.6 + i * 0.05, 0.1, { w: 5 })); S.text("PAY 9999", 1600, 590, { size: 44, t: c3 + 0.25, c: RED }); S.text("THE BILL", 1600, 760, { size: 60, t: c3 + 0.2, c: RED });
  lbl(S, "EXPLAINS A LOT", 960, 150, { t: S.start + 0.2 }); }
// 5 A black hole eats everything. Stars. Planets. Light. Your weekend plans.
{ const S = sc(5); S.bg("space"); stars(S, 30); const bx = 1320, by = 560; blackHole(S, bx, by, 210, S.start);
  const items = [[S.grp(), 300, 280, W(5, 7)], [S.grp(), 300, 600, W(5, 8)], [S.grp(), 370, 870, W(5, 9)]];
  S.draw(poly(Array.from({ length: 11 }, (_, i) => { const a = (i * Math.PI) / 5 - Math.PI / 2, r = i % 2 ? 30 : 70; return [300 + Math.cos(a) * r, 280 + Math.sin(a) * r]; }), 1), S.start + 0.3, 0.3, { w: 6, fill: OR2, parent: items[0][0] });
  S.draw(circ(300, 600, 70), S.start + 0.4, 0.3, { w: 6, fill: "#e07a5f", parent: items[1][0] }); S.draw(smooth(arcPts(300, 600, 120, 160, 380, 16, 30)), S.start + 0.5, 0.3, { w: 8, c: OR2, parent: items[1][0] });
  S.draw(line([250, 890], [490, 850], 2), S.start + 0.5, 0.3, { w: 14, c: "#fff3c4", parent: items[2][0] });
  const cal = S.calendar(540, 380, 2, 1, 130, 110, W(5, 10) - 0.2, 0.35, { title: "WEEKEND" }); S.text("BEACH", 605, 525, { size: 30, t: W(5, 10), parent: cal.g }); S.text("PIZZA", 735, 525, { size: 30, t: W(5, 10) + 0.05, parent: cal.g });
  items.push([cal.g, 670, 470, W(5, 12)]);
  items.forEach(([g, x, y, t]) => tl.to(g, { x: bx - x, y: by - y, rotation: 180, svgOrigin: `${x} ${y}`, opacity: 0, duration: 0.55, ease: "power2.in" }, t));
  lbl(S, "EATS EVERYTHING", 960, 120, { c: OR2, t: W(5, 5) }); }
// 6 Once you're in, you can't get out. Like the family WhatsApp group.
{ const S = sc(6); S.bg("white", { floor: false }); S.draw(rrect(560, 120, 800, 900, 50), S.start, 0.4, { w: 8, fill: "#ece5dd" }); S.draw(rect(560, 140, 800, 120), S.start + 0.2, 0.2, { w: 6, fill: "#075e54" }); S.text("FAMILY (247)", 960, 225, { size: 52, c: "#ffffff", t: S.start + 0.3 });
  const t9 = W(6, 7) - 0.2; bubble(S, "GOOD MORNING!!", 610, 360, t9); bubble(S, "FORWARDED 99 TIMES", 610, 480, t9 + 0.3, { size: 38 }); bubble(S, "GOOD MORNING!!", 760, 600, t9 + 0.6, { fill: "#dcf8c6" });
  S.draw(rrect(720, 720, 480, 110, 24), S.start + 0.6, 0.2, { w: 6, fill: "#f2f2f2" }); S.text("EXIT GROUP", 960, 795, { size: 48, c: "#b9b9b9", t: S.start + 0.7 }); S.cross(960, 775, 1.8, W(6, 4), 0.25);
  lbl(S, "NO WAY OUT", 270, 560, { c: RED, t: S.start + 0.2, size: 64 }); lbl(S, "TRAPPED", 1660, 560, { c: RED, t: W(6, 10), size: 72 }); }
// 7 Fall in deep enough…
{ const S = sc(7, { cam: "zoom" }); S.bg("space"); stars(S, 40); blackHole(S, 960, 560, 280, S.start); const F = hero(S, 520, 400, { s: 0.8, c: "#ffffff", mood: "wow", pose: "armsUp", t: S.start + 0.2, d: 0.4 }); tl.to(F.g, { x: 440, y: 240, rotation: 540, svgOrigin: "520 330", scale: 0.4, duration: 1.4, ease: "power1.in" }, S.start + 0.8); lbl(S, "FALL IN…", 960, 120, { c: OR2, t: S.start + 0.3 }); }
// 8 …boom, a brand new universe on the other side.
{ const S = sc(8); S.bg("space"); stars(S, 60); S.burst(960, 620, 120, 300, 16, S.start, 0.3, { c: OR2, w: 10 }); [[960, 620, 150, 1], [480, 380, 90, -1], [1440, 360, 100, 1], [560, 820, 80, 1], [1400, 800, 90, -1]].forEach(([x, y, r, d], i) => galaxy(S, x, y, r, S.start + 0.2 + i * 0.12, { dir: d, spin: S.len, c: i % 2 ? "#cdb4ff" : OR2 })); lbl(S, "BOOM!", 960, 120, { c: "#ffffff", t: S.start, size: 110 }); lbl(S, "NEW UNIVERSE", 960, 225, { c: OR2, t: W(7, 13), size: 64 }); }
// 9 Like a cosmic Kinder Joy. Surprise! It's us.
{ const S = sc(9); S.bg("danger", { floor: false });
  const ex = 960, ey = 580, top = S.grp();
  earth(S, ex, ey - 20, 120, W(8, 5) + 0.1); S.text("HI!", ex - 190, ey - 170, { size: 70, t: W(8, 6), c: "#ffffff", halo: INK, haloW: 0.12 });
  S.draw(smooth(arcPts(ex, ey, 210, 0, 180, 18, 260)) + " Z", S.start, 0.4, { w: 8, fill: "#ff7a00" });
  S.draw(smooth(arcPts(ex, ey, 210, 180, 360, 18, 260)) + " Z", S.start + 0.1, 0.4, { w: 8, fill: "#ffffff", parent: top });
  S.text("COSMIC", ex, ey - 90, { size: 54, c: RED, t: S.start + 0.4, parent: top });
  tl.to(top, { y: -110, x: 470, rotation: 40, svgOrigin: `${ex} ${ey}`, duration: 0.45, ease: "back.out(1.6)" }, W(8, 5));
  S.burst(ex, ey - 60, 260, 330, 12, W(8, 5) + 0.1, 0.25, { c: "#ffffff", w: 8 });
  lbl(S, "SURPRISE EGG", 960, 120, { c: "#ffffff", t: S.start + 0.3 }); lbl(S, "IT'S US!", 430, 640, { c: OR2, t: W(8, 6), size: 80, halo: INK }); }
// 10 So would we feel it? Nope. A black hole this big wouldn't even squish you.
{ const S = sc(10); S.bg("night", { hy: 780, moon: false }); blackHole(S, 1450, 300, 110, S.start); const F = hero(S, 700, 830, { s: 1.25, mood: "worried", look: 5, pose: "think" }); F.face(W(9, 5), "happy"); F.setPose(W(9, 5), "hips"); lbl(S, "WOULD WE FEEL IT?", 760, 150, { c: "#ffffff" }); S.text("NOPE.", 1300, 700, { size: 190, c: RED, t: W(9, 5), halo: "#ffffff", haloW: 0.1 }); }
// 11 You'd still have to go to work.
{ const S = sc(11, { cam: "push" }); S.bg("room", { window: false }); const D = S.desk(980, 790, 560, S.start, 0.4); S.laptop(1260, 570, 1.1, S.start + 0.3, 0.4); hero(S, 820, 790, { s: 1.15, mood: "tired", look: 5 }); S.zzz(700, 380, S.start + 0.8, 0.6); lbl(S, "STILL GO TO WORK", 960, 140, { t: W(9, 17), c: RED }); }
// 12 Even the galaxies look suspicious.
{ const S = sc(12); S.bg("space"); stars(S, 30); [[420, 520, 170], [960, 600, 200], [1500, 500, 170]].forEach(([x, y, r], i) => galaxy(S, x, y, r, S.start + i * 0.15, { eyes: true, c: i === 1 ? OR2 : "#cdb4ff" })); lbl(S, "SUSPICIOUS…", 960, 130, { c: OR2, t: W(10, 3) }); }
// 13 Way too many of them spin the same way.
{ const S = sc(13); S.bg("space"); for (let i = 0; i < 12; i++) { const x = 360 + (i % 4) * 400, y = 360 + Math.floor(i / 4) * 250, odd = i === 6; galaxy(S, x, y, 95, S.start + i * 0.04, { dir: odd ? -1 : 1, c: odd ? "#cdb4ff" : OR2, spin: S.len }); } lbl(S, "SAME WAY?!", 960, 130, { c: "#ffffff", t: W(10, 10) }); }
// 14 Like the universe was born on a merry-go-round.
{ const S = sc(14); S.bg("navy", { hy: 860 }); const cx = 960;
  S.draw(poly([[cx - 520, 380], [cx, 170], [cx + 520, 380], [cx - 520, 380]], 2), S.start, 0.4, { w: 8, fill: "#d1495b" }); for (let k = -2; k <= 2; k++) S.draw(poly([[cx, 170], [cx + k * 210 - 50, 380], [cx + k * 210 + 50, 380], [cx, 170]], 1), S.start + 0.2, 0.3, { w: 4, fill: "#ffffff" });
  S.draw(line([cx, 380], [cx, 790], 1), S.start + 0.3, 0.3, { w: 14, c: OR2 }); S.draw(circ(cx, 800, 560, 60), S.start + 0.3, 0.4, { w: 8, fill: "#8a5a3c" });
  [-380, -130, 130, 380].forEach((dx, i) => { S.draw(line([cx + dx, 380], [cx + dx, 760], 1), S.start + 0.5, 0.2, { w: 8, c: OR2 }); const G = galaxy(S, cx + dx, 600, 85, S.start + 0.6 + i * 0.08, { c: i % 2 ? "#cdb4ff" : "#ffe066", spin: S.len }); tl.fromTo(G, { y: i % 2 ? -50 : 50 }, { y: i % 2 ? 50 : -50, duration: 0.8, ease: "sine.inOut", repeat: Math.ceil(S.len / 0.8), yoyo: true, immediateRender: false }, S.start + 0.7); });
  lbl(S, "WHEEE!", 960, 110, { c: "#ffffff", t: W(10, 19) }); }
// 15 Other scientists say: relax, it's probably nothing.
{ const S = sc(15); S.bg("room", { window: false }); S.couch(380, 790, 520, S.start, 0.4); doc(S, 640, 670, { s: 1.1, mood: "smile", sit: true, look: 4 }); S.coffee(1000, 640, 1, S.start + 0.4, 0.3); lbl(S, "RELAX.", 1450, 330, { t: W(11, 3), size: 100 }); lbl(S, "PROBABLY NOTHING", 1450, 480, { t: W(11, 5), size: 56 }); }
// 16 Science is mostly maybe, in a lab coat.
{ const S = sc(16); S.bg("blueprint", { floor: false }); doc(S, 760, 920, { s: 1.6, mood: "flat", look: 4, pose: "shrug" }); S.tag(1400, 420, "MAYBE?", S.start + 0.5, 0.5, { size: 90 }); lbl(S, "SCIENCE:", 1400, 230, { c: "#ffffff", t: S.start + 0.2 }); lbl(S, "+ LAB COAT", 1400, 640, { c: OR2, t: W(11, 13), size: 70 }); }
// 17 every black hole up there could have a whole universe inside.
{ const S = sc(17, { cam: "push" }); S.bg("space"); stars(S, 40); [[420, 420, 110], [1000, 640, 150], [1530, 380, 95]].forEach(([x, y, r], i) => { blackHole(S, x, y, r, S.start + i * 0.4); galaxy(S, x, y, r * 0.75, S.start + i * 0.4 + 0.6, { spin: S.len }); }); lbl(S, "A UNIVERSE IN EACH", 960, 140, { c: OR2, t: W(12, 4) }); }
// 18 With its own people, in their own houses, with their own bad Wi-Fi.
{ const S = sc(18); S.bg("dusk"); house(S, 420, 860, 1.0, S.start + 0.1); house(S, 1500, 860, 1.0, S.start + 0.2); const F = hero(S, 960, 860, { s: 1.15, mood: "worried", look: -5, pose: "armsUp", outfitC: "#6d4c8f", hair: "bun", t: W(13, 3) - 0.3 }); S.phone(960, 400, 0.8, W(13, 3) + 0.3, 0.3, { screen: "feed" }); wifi(S, 960, 290, 1, W(13, 11), 1); lbl(S, "SAME BAD WI-FI", 960, 120, { t: W(13, 11), c: RED }); }
// 19 Looking up, wondering if they live in a black hole.
{ const S = sc(19); S.bg("night", { hy: 800, moon: false }); S.crowd(5, 560, 830, 200, 0.95, S.start, 0.5, { face: "wow" }); S.thought(1300, 280, 260, 150, 1060, 560, S.start + 0.6, 0.5, { fill: "#ffffff" }); blackHole(S, 1300, 280, 60, S.start + 1.0); lbl(S, "ARE WE IN ONE?", 600, 160, { c: "#ffffff", t: W(14, 5), size: 70 }); }
// 20 Spoiler: they do. Wave hi.
{ const S = sc(20, { cam: "pull" }); S.bg("space"); stars(S, 50); blackHole(S, 960, 600, 280, S.start); hero(S, 960, 720, { s: 0.9, c: "#ffffff", mood: "happy", pose: "wave", t: W(15, 3) - 0.3 }); lbl(S, "SPOILER: THEY DO", 960, 120, { c: OR2, t: S.start + 0.2 }); }
// 21 They're probably stuck in traffic too.
{ const S = sc(21); S.bg("dusk"); [[260, RED], [620, "#2f6fd6"], [980, "#70b55e"], [1340, OR], [1700, "#6d4c8f"]].forEach(([x, c], i) => car(S, x, 900, 1.1, S.start + i * 0.1, c)); blackHole(S, 1500, 260, 80, S.start + 0.3); S.speech(700, 380, 180, 90, 640, 720, S.start + 0.8, 0.4); S.text("BEEP!", 700, 400, { size: 60, t: S.start + 1.0, c: RED }); lbl(S, "TRAFFIC. EVERYWHERE.", 960, 120, { t: S.start + 0.3 }); }
