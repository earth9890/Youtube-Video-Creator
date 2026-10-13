// look: v3
// What If We Live Inside a Black Hole? — 66 s trial. Longer scenes (~3.5 s), crossfades, hand-drawn reveals, slow pushes.
const OR = "#ff9f1c", OR2 = "#ffd166", NAVY = "#1b2440";
const dur = 0.7; // draw-on time
const spin = (e, x, y, t, d, turns = -1) => tl.fromTo(e, { attr: { transform: `rotate(0 ${x} ${y})` } }, { attr: { transform: `rotate(${360 * turns} ${x} ${y})` }, duration: d, ease: "none", immediateRender: false }, t);
// black hole: back half of the disk, the hole, photon ring, front half of the disk
function blackHole(S, x, y, r, t, o = {}) {
  const g = S.grp(), dg = S.grp(g);
  const disk = (a0, a1) => smooth(arcPts(x, y, r * 2.1, a0, a1, 24, r * 0.5));
  S.draw(disk(180, 360), t, dur * 0.5, { w: r * 0.16, c: OR, parent: dg });
  S.draw(smooth(arcPts(x, y + r * 0.1, r * 1.3, 170, 370, 24, r * 1.25)), t, dur * 0.6, { w: r * 0.14, c: OR, parent: g }); // lensed back of the disk, bent over the top
  S.draw(circ(x, y, r), t, dur * 0.6, { w: 8, c: "#000000", fill: "#000000", parent: g });
  S.draw(circ(x, y, r * 1.06), t, dur * 0.5, { w: 4, c: OR2, parent: g }); // photon ring
  S.draw(disk(0, 180), t + dur * 0.3, dur * 0.5, { w: r * 0.16, c: OR, parent: g });
  S.draw(smooth(arcPts(x, y, r * 2.1, 10, 170, 24, r * 0.5)), t + dur * 0.4, dur * 0.5, { w: r * 0.05, c: OR2, parent: g });
  return g;
}
function house(S, x, y, s, t, o = {}) { // y = ground
  const g = S.grp();
  S.draw(rect(x - 110 * s, y - 170 * s, 220 * s, 170 * s), t, dur * 0.4, { w: 7, fill: "#f6e7c8", parent: g });
  S.draw(poly([[x - 140 * s, y - 165 * s], [x, y - 300 * s], [x + 140 * s, y - 165 * s], [x - 140 * s, y - 165 * s]], 2), t + dur * 0.3, dur * 0.3, { w: 7, fill: "#d1495b", parent: g });
  S.draw(rect(x - 30 * s, y - 100 * s, 60 * s, 100 * s), t + dur * 0.5, dur * 0.2, { w: 6, fill: "#8a5a3c", parent: g });
  S.draw(rect(x + 45 * s, y - 140 * s, 50 * s, 50 * s), t + dur * 0.6, dur * 0.2, { w: 5, fill: o.dark ? "#3d4766" : "#ffe066", parent: g });
  return g;
}
function earth(S, x, y, r, t) {
  const g = S.grp();
  S.draw(circ(x, y, r), t, dur * 0.5, { w: 7, fill: "#4a9fe0", parent: g });
  S.draw(smooth(pts2(x, y, r, [[-0.6, -0.3], [-0.2, -0.6], [0.2, -0.4], [0.1, 0], [-0.3, 0.2], [-0.6, -0.3]])) + " Z", t + dur * 0.3, dur * 0.4, { w: 5, fill: "#70b55e", parent: g });
  S.draw(smooth(pts2(x, y, r, [[0.3, 0.2], [0.65, 0.1], [0.6, 0.5], [0.3, 0.6], [0.3, 0.2]])) + " Z", t + dur * 0.4, dur * 0.4, { w: 5, fill: "#70b55e", parent: g });
  return g;
}
const pts2 = (x, y, r, P) => P.map(([a, b]) => [x + a * r, y + b * r]);
function galaxy(S, x, y, r, t, o = {}) { // two spiral arms; o.dir = 1 clockwise, -1 counter; o.spin = seconds of rotation
  const g = S.grp(), d = o.dir || 1;
  [0, Math.PI].forEach((ph) => S.draw(smooth(Array.from({ length: 14 }, (_, i) => { const a = ph + d * i * 0.42, k = 0.12 + i * 0.065; return [x + Math.cos(a) * r * k, y + Math.sin(a) * r * k * 0.8]; })), t, dur * 0.6, { w: Math.max(3, r * 0.07), c: o.c || "#cdb4ff", parent: g }));
  S.draw(circ(x, y, r * 0.16), t, dur * 0.3, { w: 3, c: OR2, fill: "#fff3c4", parent: g });
  if (o.spin) spin(g, x, y, t + 0.3, o.spin, d * 0.5);
  return g;
}
const stars = (S, n = 40) => { for (let i = 0; i < n; i++) S.fill(circ(rnd() * 1920, rnd() * 1000, 2 + rnd() * 3), S.start, 0.2, "#ffffff", 0.85); };
const hero = (S, x, gy, o = {}) => { const F = S.fig(x, gy, Object.assign({ s: 1.1, hair: "short", outfit: "tee", outfitC: "#2f6fd6" }, o)).draw(o.t ?? S.start, o.d ?? 0.6); F.face((o.t ?? S.start) + 0.6, o.mood || "smile", o.look || 0); if (o.pose) F.setPose((o.t ?? S.start) + 0.65, o.pose); return F; };
const doc = (S, x, gy, o = {}) => hero(S, x, gy, Object.assign({ hair: "side", hairC: "#8a8a8a", outfit: "apron", outfitC: "#ffffff" }, o));
const lbl = (S, str, x, y, o = {}) => S.label(str, x, y, Object.assign({ t: S.start + 0.5, size: 78 }, o));

const CUES = [[1, 0], [2, 0], [2, 14], [3, 0], [4, 0], [5, 0], [6, 0], [6, 13], [7, 0], [8, 0], [8, 8], [9, 0], [10, 0], [11, 0], [12, 0], [13, 0], [13, 11], [14, 0], [14, 7], [15, 0], [16, 0]];
const WIN = sceneWindows(CUES, 0.15);
const sc = (k, o) => scene(WIN[k][0], WIN[k][1], o);

// 0 Tonight, you'll go home, lock the door, and feel safe.
{ const S = sc(0); S.bg("night", { hy: 780, moon: true }); house(S, 1180, 820, 1.5, 0.1); const F = hero(S, 760, 820, { s: 1.15, mood: "smile", look: 4, t: 0.4 }); S.padlock(1180, 660, 0.9, S.at(0.55), 0.4); lbl(S, "TONIGHT", 960, 150, { c: "#ffffff", t: 0.3 }); }
// 1 your home, your planet, every star…
{ const S = sc(1, { cam: "pull" }); S.bg("space"); stars(S, 50); const t = S.start; house(S, 960, 330, 0.55, W(2, 4) - 0.1); earth(S, 960, 600, 230, W(2, 6) - 0.1); lbl(S, "HOME", 1290, 240, { t: W(2, 4), size: 60, c: OR2 }); lbl(S, "PLANET", 1360, 600, { t: W(2, 6), size: 60, c: OR2 }); lbl(S, "EVERY STAR", 520, 220, { t: W(2, 9), size: 60, c: OR2 }); }
// 2 …sitting inside a black hole?
{ const S = sc(2, { cam: "zoom" }); S.bg("space"); stars(S, 50); blackHole(S, 960, 560, 230, S.start); earth(S, 960, 560, 40, S.start + 0.6); lbl(S, "INSIDE A BLACK HOLE?", 960, 150, { c: OR2, t: S.start + 0.4, size: 90 }); }
// 3 It sounds like a bad sci-fi movie. [S]
{ const S = sc(3); S.bg("roomNight", { window: false }); S.draw(rect(820, 180, 860, 480), S.start, 0.4, { w: 9, fill: "#0b0f1e" }); blackHole(S, 1250, 420, 90, S.start + 0.3); hero(S, 520, 790, { s: 1.15, mood: "flat", look: 5, pose: "cross" }); lbl(S, "B-MOVIE?", 1250, 740, { c: "#ffffff", t: S.start + 0.7 }); }
// 4 But some physicists take it seriously.
{ const S = sc(4); S.bg("room", { window: false }); S.draw(rect(900, 170, 820, 480), S.start, 0.4, { w: 9, fill: "#225034" }); for (let i = 0; i < 4; i++) S.draw(smooth(Array.from({ length: 9 }, (_, k) => [990 + k * 80, 270 + i * 95 + (k % 2 ? 14 : -14)])), S.start + 0.4 + i * 0.15, 0.4, { w: 6, c: "#ffffff" }); doc(S, 560, 790, { s: 1.15, mood: "determined", look: 5, pose: "point" }); lbl(S, "SERIOUSLY.", 960, 110, { t: S.start + 0.8 }); }
// 5 1972, Raj Pathria noticed something strange
{ const S = sc(5); S.bg("room", { window: false }); doc(S, 700, 790, { s: 1.2, mood: "wow", look: 4, hairC: "#2a2220", outfit: "tee", outfitC: "#6d4c8f" }); S.bulb(1000, 300, 1.2, S.start + 0.8, 0.4); lbl(S, "1972", 1400, 380, { c: RED, size: 150, t: S.start + 0.3 }); lbl(S, "RAJ PATHRIA", 1400, 560, { t: S.start + 0.6, size: 70 }); }
// 6 squeeze all the matter we can see into a black hole…
{ const S = sc(6); S.bg("space"); stars(S, 30); [[260, 300], [1660, 300], [300, 860], [1640, 860], [960, 900]].forEach(([x, y], i) => { galaxy(S, x, y, 90, S.start + i * 0.12); S.arrow(x + (960 - x) * 0.25, y + (560 - y) * 0.25, x + (960 - x) * 0.7, y + (560 - y) * 0.7, S.start + 0.6 + i * 0.1, 0.4, { c: OR2, w: 7 }); }); blackHole(S, 960, 560, 90, S.at(0.55)); lbl(S, "SQUEEZE IT ALL", 960, 150, { c: "#ffffff", t: S.start + 0.4 }); }
// 6b …about as big as the universe we can see.
{ const S = sc(7); S.bg("space"); stars(S, 30); blackHole(S, 560, 560, 150, S.start); S.text("=", 960, 600, { size: 180, c: "#ffffff", t: S.start + 0.5 }); S.draw(circ(1380, 560, 240), S.start + 0.4, 0.6, { w: 7, c: "#cdb4ff", fill: "#2a2f5a" }); for (let i = 0; i < 6; i++) galaxy(S, 1380 + Math.cos(i) * 130, 560 + Math.sin(i * 1.7) * 120, 45, S.start + 0.6); lbl(S, "SAME SIZE", 960, 150, { c: OR2, t: S.start + 0.6 }); }
// 7 Coincidence? Maybe.
{ const S = sc(8); S.bg("room", { window: false }); doc(S, 760, 790, { s: 1.2, mood: "flat", pose: "shrug" }); lbl(S, "COINCIDENCE?", 1350, 360, { c: RED, t: S.start + 0.3 }); lbl(S, "MAYBE.", 1350, 520, { t: W(7, 1), size: 90 }); }
// 8 2025, James Webb telescope…
{ const S = sc(9, { cam: "push" }); S.bg("space"); stars(S, 50); const cx = 960, cy = 520; for (let i = 0; i < 7; i++) { const a = (i / 6) * Math.PI * 2, x = i ? cx + Math.cos(a) * 95 : cx, y = i ? cy + Math.sin(a) * 95 : cy; S.draw(poly(Array.from({ length: 7 }, (_, k) => [x + Math.cos((k * Math.PI) / 3) * 52, y + Math.sin((k * Math.PI) / 3) * 52]), 1), S.start + i * 0.06, 0.3, { w: 5, c: "#7a5a10", fill: "#f2c14e" }); } S.draw(poly([[700, 760], [1220, 760], [1260, 820], [660, 820], [700, 760]], 1), S.start + 0.4, 0.3, { w: 6, fill: "#c0c6cc" }); lbl(S, "2025: JAMES WEBB", 960, 150, { c: OR2, t: S.start + 0.3 }); }
// 8b …263 ancient galaxies
{ const S = sc(10); S.bg("space"); for (let i = 0; i < 40; i++) galaxy(S, 210 + (i % 10) * 168, 300 + Math.floor(i / 10) * 170, 55, S.start + i * 0.015, { dir: i % 3 ? 1 : -1 }); lbl(S, "263 GALAXIES", 960, 150, { c: "#ffffff", t: S.start + 0.3 }); }
// 9 About two thirds were spinning the same way.
{ const S = sc(11); S.bg("space"); for (let i = 0; i < 9; i++) { const x = 560 + (i % 3) * 400, y = 330 + Math.floor(i / 3) * 280, cw = i % 3 !== 2; galaxy(S, x, y, 110, S.start, { dir: cw ? 1 : -1, c: cw ? "#ffd166" : "#cdb4ff", spin: S.len }); } lbl(S, "2 OUT OF 3: SAME WAY", 960, 110, { c: OR2, t: S.start + 0.4 }); }
// 10 That's not supposed to happen.
{ const S = sc(12); S.bg("room", { window: false }); doc(S, 760, 790, { s: 1.25, mood: "wow", pose: "head" }); lbl(S, "NOT SUPPOSED", 1380, 360, { c: RED, t: S.start + 0.3 }); lbl(S, "TO HAPPEN", 1380, 480, { c: RED, t: S.start + 0.4 }); }
// 11 Unless the whole universe was born spinning, inside a spinning black hole.
{ const S = sc(13, { cam: "zoom" }); S.bg("space"); stars(S, 40); blackHole(S, 960, 560, 300, S.start); for (let i = 0; i < 5; i++) galaxy(S, 960 + Math.cos(i * 1.25) * 170, 560 + Math.sin(i * 1.25) * 120, 50, S.start + 0.8, { spin: S.len }); lbl(S, "BORN SPINNING", 960, 140, { c: OR2, t: S.start + 0.6 }); }
// 12 So, would you feel it?
{ const S = sc(14); S.bg("night", { hy: 780 }); hero(S, 960, 820, { s: 1.3, mood: "worried", pose: "think" }); lbl(S, "WOULD YOU FEEL IT?", 960, 150, { c: "#ffffff" }); }
// 13 Not really. A black hole that big wouldn't even stretch you.
{ const S = sc(15); S.bg("space"); stars(S, 30); hero(S, 560, 900, { s: 1.2, mood: "smile" }); S.draw(smooth([[1200, 300], [1260, 420], [1220, 560], [1290, 700], [1240, 860]]), S.start + 0.3, 0.6, { w: 12, c: "#ffffff" }); S.draw(circ(1200, 270, 34), S.start + 0.3, 0.3, { w: 6, fill: "#ffffff" }); S.cross(1240, 580, 2.4, S.start + 0.9, 0.3); lbl(S, "NO SPAGHETTI", 960, 150, { c: OR2, t: S.start + 0.9 }); }
// 13b Just a normal Tuesday. [S]
{ const S = sc(16); S.bg("room", { window: false }); S.couch(560, 790, 520, S.start, 0.5); const F = hero(S, 800, 680, { s: 1.1, mood: "smile", sit: true, look: 4 }); S.coffee(1150, 640, 1, S.start + 0.5, 0.3); lbl(S, "TUESDAY.", 1400, 330, { t: S.start + 0.4, size: 100 }); }
// 14 Most scientists say: interesting, but probably wrong.
{ const S = sc(17); S.bg("room", { window: false }); doc(S, 560, 790, { s: 1.1, mood: "flat" }); doc(S, 960, 790, { s: 1.1, mood: "flat", hairC: "#3b2a20" }); doc(S, 1360, 790, { s: 1.1, mood: "flat", hairC: "#c0392b" }); lbl(S, "INTERESTING…", 960, 140, { t: W(14, 3) }); lbl(S, "BUT PROBABLY WRONG", 960, 250, { c: RED, t: W(14, 4), size: 70 }); }
// 14b The galaxy result still needs more data.
{ const S = sc(18); S.bg("space"); for (let i = 0; i < 5; i++) galaxy(S, 420 + i * 270, 560, 80, S.start); S.magnifier(1180, 520, 160, S.start + 0.4, 0.4); lbl(S, "NEEDS MORE DATA", 960, 150, { c: "#ffffff", t: S.start + 0.4 }); }
// 15 every black hole out there might hold a universe of its own
{ const S = sc(19, { cam: "push" }); S.bg("space"); stars(S, 40); [[420, 420, 110], [1000, 640, 150], [1530, 380, 95]].forEach(([x, y, r], i) => { blackHole(S, x, y, r, S.start + i * 0.4); galaxy(S, x, y, r * 0.75, S.start + i * 0.4 + 0.6, { spin: S.len }); }); lbl(S, "A UNIVERSE IN EACH?", 960, 140, { c: OR2, t: S.start + 0.5 }); }
// 16 somewhere inside one of them, someone is locking their door tonight
{ const S = sc(20, { cam: "pull" }); S.bg("space"); stars(S, 50); blackHole(S, 960, 560, 330, S.start); house(S, 980, 660, 0.8, S.start + 0.6); hero(S, 840, 660, { s: 0.55, mood: "smile", t: S.start + 0.8, d: 0.4, look: 4 }); lbl(S, "FEELING SAFE.", 960, 140, { c: "#ffffff", t: W(16, 13) }); }
