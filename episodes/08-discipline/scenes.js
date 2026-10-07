// Episode 08 — Discipline vs motivation (light theme). Hero = the viewer.
const CUES = [[1, 0], [3, 0], [5, 0], [7, 0], [8, 0], [10, 0], [11, 0], [14, 0], [15, 0], [16, 0], [17, 0]];
const WIN = sceneWindows(CUES);

{ // 1. "Motivation is a feeling. It shows up late, and leaves early." — ORANGE
  const [a, b] = WIN[0];
  const S = scene(a, b, { cam: "push" });
  const F = S.fig(960, GY, { s: 1.0 }).draw(0.6, 1.3);
  const G = S.grp();
  S.flame(1300, 620, 1.2, W(1, 3) - 0.3, 0.9, { parent: G });
  S.tag(1300, 700, "MOTIVATION", W(1, 3) + 0.2, 0.7, { parent: G, c: ORANGE, tc: ORANGE });
  S.clock(1650, 260, 110, W(2, 1) - 0.3, 0.8, { h: 9, m: 40 }).spin(W(2, 3) - 0.2, 1.0, 2);
  F.face(W(2, 0), "flat", 6);
  S.move(G, W(2, 5) - 0.2, 0.9, { scale: 0.3, svgOrigin: "1300 620" });
  S.fadeOut(G, W(2, 5), 0.9);
}

{ // 2. "habits took anywhere from 18 to 254 days… The average: sixty-six." — GREEN
  const [a, b] = WIN[1];
  const S = scene(a, b, { cam: "push" });
  const F = S.fig(1300, GY, { s: 0.8 }).draw(a + 0.2, 1.0);
  const X0 = 260, X1 = 1660, LY = 480;
  S.draw(line([X0, LY], [X1, LY], 4), W(3, 3) - 0.3, 1.2, { w: 8 });
  let ticks = "";
  for (let i = 0; i <= 10; i++) { const x = X0 + ((X1 - X0) * i) / 10; ticks += poly([[x, LY - 14], [x, LY + 14]], 1); }
  S.draw(ticks, W(3, 5) - 0.2, 0.8, { w: 5 });
  S.text("18", X0, 590, { size: 80, t: W(3, 7) - 0.2, dur: 0.4 });
  S.text("254", X1, 590, { size: 80, t: W(3, 9) - 0.2, dur: 0.5 });
  F.face(W(3, 9) + 0.1, "worried", -6);
  S.text("automatic", 960, 650, { size: 64, font: "caveat", c: GRAY, t: W(3, 13) - 0.2, dur: 0.8 });
  const X66 = X0 + ((66 - 18) / (254 - 18)) * (X1 - X0);
  S.text("66 DAYS", 960, 330, { size: 170, c: GREEN, t: W(4, 1) - 0.1, dur: 0.9 });
  S.ring(X66, LY, 46, 46, W(4, 2) - 0.2, 0.5, { c: GREEN, w: 9 });
  S.arrow(700, 360, X66 + 40, LY - 50, W(4, 2) + 0.2, 0.5, { bend: -0.25, c: GREEN });
}

const CAL = { x: 505, y: 300, cw: 130, ch: 110 }; // 7×2 calendar shared by scenes 3 and 4

{ // 3. "And here's the part nobody quotes. Missing one day did almost nothing." — GREEN
  const [a, b] = WIN[2];
  const S = scene(a, b, { cam: "push" });
  const C = S.calendar(CAL.x, CAL.y, 7, 2, CAL.cw, CAL.ch, a + 0.1, 1.2, { title: "14 DAYS" });
  const F = S.fig(1660, GY, { s: 0.8 }).draw(a + 0.6, 1.0);
  const skip = 9;
  let k = 0;
  C.cells.forEach((c, i) => { if (i === skip) return; S.tick(c[0], c[1], 0.9, W(5, 3) + k * 0.14, 0.15); k++; });
  S.cross(C.cells[skip][0], C.cells[skip][1], 0.6, W(6, 0), 0.3, { c: GRAY, w: 8 });
  S.text("almost nothing", 960, 720, { size: 90, font: "caveat", c: GREEN, t: W(6, 4) - 0.2, dur: 0.9 });
  F.face(W(6, 5), "smile", -6);
}

{ // 4. "Quitting did everything." — RED, tilt
  const [a, b] = WIN[3];
  const S = scene(a, b, { cam: "push" });
  const C = S.calendar(CAL.x, CAL.y, 7, 2, CAL.cw, CAL.ch, a, 0.35, { title: "14 DAYS" });
  C.cells.forEach((c, i) => { if (i === 9) return; S.tick(c[0], c[1], 0.9, a + 0.35 + i * 0.02, 0.05); });
  const F = S.fig(1660, GY, { s: 0.8 }).instant(a);
  const W0 = 7 * CAL.cw, H0 = 70 + 2 * CAL.ch;
  S.strike(CAL.x - 10, CAL.y - 10, CAL.x + W0 + 10, CAL.y + H0 + 10, W(7, 0) + 0.1, 0.5, { w: 18 });
  S.tilt(2, W(7, 0) + 0.1, 0.3);
  S.text("EVERYTHING", 960, 790, { size: 150, c: RED, t: W(7, 2) - 0.2, dur: 0.6 });
  F.face(W(7, 2), "worried", -6);
  S.tilt(0, W(7, 2) + 0.4, 0.4);
}

{ // 5. couch + waiting; "The feeling doesn't come first. The action does." — GREEN
  const [a, b] = WIN[4];
  const S = scene(a, b, { cam: "pull" });
  const CO = S.couch(400, GY, 460, a, 0.8);
  const F = S.fig(630, CO.seatY, { s: 0.95, sit: true, pose: "think" }).draw(a + 0.4, 0.9);
  S.clock(1500, 300, 110, W(8, 3) - 0.3, 0.8, { h: 4, m: 10 }).spin(W(8, 4), 1.5, 2);
  S.text("waiting…", 630, 440, { size: 72, font: "caveat", c: GRAY, t: W(8, 4) - 0.1, dur: 0.7 });
  F.face(W(8, 9), "flat", 6);
  // c9: FEELING → ACTION (struck) then ACTION → FEELING
  const t1 = W(9, 1) - 0.2;
  S.text("FEELING", 1120, 560, { size: 72, t: t1, dur: 0.4 });
  S.arrow(1320, 538, 1420, 538, t1 + 0.4, 0.3);
  S.text("ACTION", 1580, 560, { size: 72, t: t1 + 0.7, dur: 0.4 });
  S.draw(line([930, 538], [1750, 538], 3), W(9, 2) + 0.1, 0.4, { c: RED, w: 12 });
  const t2 = W(9, 6) - 0.2;
  S.text("ACTION", 1120, 700, { size: 72, c: GREEN, t: t2, dur: 0.35 });
  S.arrow(1320, 678, 1420, 678, t2 + 0.35, 0.25, { c: GREEN });
  S.text("FEELING", 1580, 700, { size: 72, c: GREEN, t: t2 + 0.6, dur: 0.4 });
  F.face(W(9, 6), "smile", 6);
}

{ // 6. "You don't feel like running. You run. Then you feel like a runner." — ORANGE
  const [a, b] = WIN[5];
  const S = scene(a, b, { cam: "push" });
  S.draw(line([60, GY], [1860, GY], 6), a, 0.6, { w: 6 });
  const F = S.fig(300, GY, { s: 1.0 }).draw(a + 0.2, 0.9);
  const t0 = W(10, 5) - 0.1, dur = 1.6, dx = 1000;
  F.face(W(10, 6), "determined", 8);
  F.walk(t0, dur, { x: dx }, 0.12);
  // motion lines behind the runner, fading as he passes
  [0.3, 0.7, 1.1].forEach((f) => {
    const t = t0 + f, x = 300 + (dx * f) / dur - 90;
    const d = line([x - 70, 620], [x - 10, 620], 2) + line([x - 90, 670], [x - 20, 670], 2) + line([x - 60, 720], [x, 720], 2);
    const p = S.draw(d, t, 0.2, { c: ORANGE, w: 5 });
    S.fadeOut(p, t + 0.4, 0.4);
  });
  S.tag(1300, 470, "RUNNER", W(10, 12) - 0.2, 0.5, { c: ORANGE, tc: ORANGE, size: 48 });
}

{ // 7. "Here's how to make it stick. Decide when and where… I write one page." — ORANGE
  const [a, b] = WIN[6];
  const S = scene(a, b, { cam: "push" });
  const F = S.fig(200, GY, { s: 0.9 }).draw(a + 0.1, 0.9);
  F.setPose(W(11, 3), "point");
  S.text("WHEN + WHERE", 960, 180, { size: 110, t: W(12, 1) - 0.2, dur: 0.8 });
  S.text("in advance", 960, 280, { size: 64, font: "caveat", c: ORANGE, t: W(12, 4) - 0.1, dur: 0.6 });
  S.tag(560, 640, "brush teeth", W(13, 1) - 0.2, 0.6, { size: 48 });
  S.arrow(740, 640, 860, 640, W(13, 4) - 0.2, 0.4, { c: ORANGE });
  const D = S.desk(900, GY, 300, W(13, 6) - 0.3, 0.6);
  S.laptop(1050, D.top, 0.7, W(13, 6) + 0.2, 0.6);
  S.arrow(1240, 640, 1380, 640, W(13, 8) - 0.2, 0.4, { c: ORANGE });
  S.notebook(1420, 520, 240, 240, W(13, 8) + 0.15, 0.7);
  S.tag(1540, 820, "1 page", W(13, 10) - 0.2, 0.5, { size: 44, c: ORANGE, tc: ORANGE });
}

{ // 8. "People who plan this way are far more likely to follow through." — GREEN
  const [a, b] = WIN[7];
  const S = scene(a, b, { cam: "push" });
  const G0 = S.fig(450, GY, { s: 0.9, c: GRAY, pose: "think" }).draw(a + 0.1, 0.9);
  S.thought(560, 380, 170, 100, 470, 560, W(14, 0) + 0.3, 0.8);
  S.text("someday…", 560, 400, { size: 60, font: "caveat", c: GRAY, t: W(14, 1), dur: 0.6 });
  G0.face(W(14, 1) + 0.3, "flat", -4);
  const F = S.fig(1150, GY, { s: 0.9 }).draw(a + 0.5, 0.9);
  S.tag(1150, 450, "7:00 AT DESK", W(14, 3) - 0.2, 0.6, { size: 44, c: GREEN, tc: GREEN, parent: F.g });
  S.desk(1480, GY, 320, W(14, 6) - 0.2, 0.6);
  S.tick(1380, 450, 0.9, W(14, 7), 0.2, { parent: F.g });
  F.walk(W(14, 8) - 0.1, 1.4, { x: 220 });
}

{ // 9. "Shrink it to two minutes. And never miss twice." — GREEN
  const [a, b] = WIN[8];
  const S = scene(a, b, { cam: "push" });
  S.timer(500, 480, 150, a + 0.1, 0.9, { label: "2:00", fillAt: W(15, 3), fillDur: 1.2 });
  S.fig(800, GY, { s: 0.75 }).draw(a + 0.3, 0.9);
  const C = S.calendar(1000, 330, 5, 1, 130, 110, W(15, 5) - 0.3, 0.7);
  S.tick(C.cells[0][0], C.cells[0][1], 0.9, W(15, 6) - 0.1, 0.15);
  S.cross(C.cells[1][0], C.cells[1][1], 0.6, W(15, 7), 0.25);
  S.tick(C.cells[2][0], C.cells[2][1], 0.9, W(15, 8), 0.15);
  S.tick(C.cells[3][0], C.cells[3][1], 0.9, W(15, 8) + 0.2, 0.15);
  S.text("never miss twice", 1325, 680, { size: 84, font: "caveat", c: GREEN, t: W(15, 8) - 0.2, dur: 0.6 });
}

{ // 10. "Discipline isn't punishment. It's remembering what you want." — ORANGE
  const [a, b] = WIN[9];
  const S = scene(a, b, { cam: "push" });
  const F = S.fig(700, GY, { s: 1.0 }).draw(a + 0.1, 1.0);
  S.text("PUNISHMENT", 640, 300, { size: 110, t: W(16, 2) - 0.3, dur: 0.7 });
  S.draw(line([270, 262], [1010, 262], 3), W(16, 3), 0.35, { c: RED, w: 12 });
  S.mountain([[1250, GY], [1450, 560], [1520, 610], [1640, 470], [1760, 600], [1860, GY]], W(16, 4) - 0.2, 1.0);
  S.draw(poly([[1640, 470], [1640, 370]], 1), W(16, 4) + 0.8, 0.25, { w: 6 });
  S.draw(poly([[1640, 372], [1706, 394], [1640, 418], [1640, 372]], 1), W(16, 4) + 1.05, 0.25, { w: 4, fill: RED });
  S.text("remember what you want", 640, 480, { size: 80, font: "caveat", c: ORANGE, t: W(16, 4) + 0.3, dur: 1.0 });
  F.face(W(16, 5), "smile", 8);
}

{ // 11. "Don't wait to feel ready. Decide. Then show up." — ORANGE, hold
  const [a, b] = WIN[10];
  const S = scene(a, b, { cam: "push" });
  S.door(1450, 300, 200, 560, a + 0.1, 1.0, { open: true });
  const F = S.fig(400, GY, { s: 1.4 }).draw(a + 0.3, 1.2);
  F.face(W(17, 5) - 0.1, "determined", 10);
  S.text("DECIDE.", 960, 150, { size: 90, t: W(17, 5) - 0.2, dur: 0.5 });
  S.text("SHOW UP.", 960, 320, { size: 160, c: ORANGE, t: W(17, 7) - 0.2, dur: 0.7 });
  F.walk(W(17, 7) - 0.05, 1.6, { x: 550 });
}
