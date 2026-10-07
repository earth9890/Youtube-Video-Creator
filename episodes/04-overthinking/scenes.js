// Episode 04 — Overthinking / worry (light theme). Hero = the viewer.
const CUES = [[1, 0], [3, 0], [5, 0], [8, 0], [9, 0], [12, 0], [14, 0], [16, 0], [17, 0], [18, 0]];
const WIN = sceneWindows(CUES);
// handwriting squiggle along a notebook line
const scribble = (x0, x1, y) => { const pts = []; for (let x = x0; x <= x1; x += 22) pts.push([x, y + ((x / 22) % 2 ? -7 : 7)]); return smooth(pts); };

{ // 1. c1–c2 — researchers, notebook, ten days, 30 days. BLUE
  const [a, b] = WIN[0];
  const S = scene(a, b, { cam: "push" });
  const F = S.fig(430, GY, { s: 1, pose: "think" }).draw(a + 0.2, 1.2);
  S.thought(700, 360, 160, 100, 500, 560, a + 1.3, 0.8);
  S.cloud(700, 345, 0.5, a + 2.0, 0.6, { storm: true });
  S.notebook(980, 430, 260, 300, W(1, 5) - 0.3, 1.0);
  S.pencil(1250, 740, 200, -62, W(1, 6) - 0.2, 0.6);
  const C = S.calendar(1400, 400, 5, 2, 88, 78, W(1, 10) - 0.3, 0.8);
  C.cells.forEach((c, i) => S.tick(c[0], c[1], 0.7, W(1, 11) + i * 0.1, 0.15, { c: BLUE }));
  S.text("30 days", 1620, 720, { size: 84, c: BLUE, t: W(2, 3) - 0.3, dur: 0.7 });
  S.text("?", 1110, 330, { size: 120, c: BLUE, t: W(2, 5) - 0.2, dur: 0.4 });
  F.face(W(2, 9) - 0.2, "worried", 4);
}

{ // 2. c3–c4 — 91% pie, better than expected. GREEN
  const [a, b] = WIN[1];
  const S = scene(a, b, { cam: "push" });
  const F = S.fig(260, GY, { s: 0.75 }).draw(a, 0.8);
  S.pie(660, 520, 220, 0.914, W(3, 0) - 0.3, 1.2, { cBig: GREEN, cSmall: RED });
  S.text("91%", 1300, 430, { size: 190, c: GREEN, t: W(3, 0) + 0.1, dur: 0.8 });
  S.text("never happened", 1300, 560, { size: 72, font: "caveat", t: W(3, 1) - 0.1, dur: 0.9 });
  F.face(W(3, 2), "wow", 6);
  S.text("1/3", 1090, 790, { size: 90, c: GRAY, t: W(4, 2) - 0.2, dur: 0.5 });
  S.tick(1230, 765, 1.1, W(4, 8) - 0.2, 0.3);
  S.text("better than expected", 1280, 790, { size: 56, font: "caveat", c: GREEN, anchor: "start", t: W(4, 10) - 0.3, dur: 1.0 });
}

{ // 3. c5–c7 — hamster wheel, what if…, control padlock. BLUE
  const [a, b] = WIN[2];
  const S = scene(a, b, { cam: "push" });
  const HW = S.hamsterWheel(760, 520, 220, a + 0.2, 1.0);
  S.fig(705, 700, { s: 0.85, w: 10 }).draw(a + 1.0, 0.9); // offset left of the stand's apex, heavier stroke so it reads over the spokes
  HW.spin(W(5, 6) - 0.3, b - 0.3 - (W(5, 6) - 0.3), 5);
  S.thought(1250, 260, 170, 100, 920, 420, W(5, 4) - 0.3, 0.8);
  S.text("what if…", 1250, 280, { size: 64, font: "caveat", c: BLUE, t: W(5, 8) - 0.3, dur: 0.7 });
  S.padlock(1520, 640, 1.6, W(6, 4) - 0.4, 0.8);
  S.text("control", 1520, 850, { size: 84, c: BLUE, t: W(6, 4), dur: 0.6 });
  S.text("nothing can hurt me", 1300, 470, { size: 56, font: "caveat", c: GRAY, t: W(7, 6) - 0.3, dur: 1.0 });
}

{ // 4. c8 — replayed x100, nothing changed. RED, pull
  const [a, b] = WIN[3];
  const S = scene(a, b, { cam: "pull" });
  const F = S.fig(300, GY, { s: 0.7 }).draw(a + 0.1, 0.8);
  [700, 1060, 1420].forEach((x, i) => {
    const t = W(8, 2) - 0.3 + i * 0.5;
    S.thought(x, 380, 140, 90, x - 60, 560, t, 0.5);
    S.cloud(x, 365, 0.4, t + 0.5, 0.4, { storm: true });
  });
  S.text("x100", 1150, 760, { size: 150, c: RED, t: W(8, 6) - 0.3, dur: 0.6 });
  F.face(W(8, 7), "worried", 6);
  S.text("nothing changed", 1150, 880, { size: 60, font: "caveat", c: GRAY, t: W(8, 8) - 0.2, dur: 0.8 });
}

{ // 5. c9–c11 — break the loop; 1. write it down; B- → B+. GREEN
  const [a, b] = WIN[4];
  const S = scene(a, b, { cam: "push" });
  S.fig(300, GY, { s: 1, pose: "point" }).draw(a + 0.1, 1.0);
  const CH = S.chain(640, 170, 1280, 170, 7, W(9, 3) - 0.4, 0.8, { broken: true });
  S.fadeOut(CH.g, W(10, 0) - 0.2, 0.4);
  S.text("1. WRITE IT DOWN", 960, 200, { size: 84, c: GREEN, t: W(10, 1) - 0.3, dur: 0.8 });
  S.notebook(720, 330, 420, 440, W(10, 1) - 0.2, 1.0);
  S.pencil(1160, 700, 230, -62, W(10, 3) - 0.2, 0.6);
  S.seq([430, 470, 510, 550].map((y) => [scribble(790, 1090, y), 1, { w: 4 }]), W(11, 0), 2.6);
  S.text("B-", 1380, 560, { size: 110, c: GRAY, t: W(11, 9) - 0.2, dur: 0.4 });
  S.arrow(1450, 530, 1560, 530, W(11, 10) - 0.2, 0.4);
  S.text("B+", 1650, 560, { size: 110, c: GREEN, t: W(11, 11) - 0.3, dur: 0.5 });
}

{ // 6. c12–c13 — worry time: clock 7pm, ring, tag, clouds wait. ORANGE
  const [a, b] = WIN[5];
  const S = scene(a, b, { cam: "push" });
  S.fig(1720, GY, { s: 0.85 }).draw(a + 0.1, 0.9);
  S.text("2. WORRY TIME", 960, 200, { size: 84, c: ORANGE, t: W(12, 0) - 0.3, dur: 0.8 });
  S.clock(640, 560, 170, W(12, 3) - 0.3, 1.0, { h: 7, m: 0 });
  // engine clock hands are drawn under the paper-filled face (invisible) — draw 7:00 hands on top
  S.draw(line([640, 560], [640, 435], 1), W(12, 3) + 0.5, 0.15, { w: 7 });
  S.draw(line([640, 560], [602, 626], 1), W(12, 3) + 0.65, 0.15, { w: 10 });
  S.ring(640, 560, 200, 200, W(12, 5) - 0.3, 0.6, { c: ORANGE });
  S.tag(640, 860, "7:00 PM · 15 min", W(13, 0) - 0.3, 0.8, { size: 44, tc: ORANGE });
  [1050, 1250, 1450].forEach((x, i) => S.cloud(x, 560, 0.4, W(13, 4) - 0.3 + i * 0.4, 0.4, { storm: true }));
  S.text("wait", 1250, 740, { size: 64, font: "caveat", c: ORANGE, t: W(13, 7) - 0.3, dur: 0.5 });
}

{ // 7. c14–c15 — can I act today? YES → step; NO → let it go. GREEN
  const [a, b] = WIN[6];
  const S = scene(a, b, { cam: "push" });
  S.text("3. CAN I ACT TODAY?", 960, 170, { size: 84, c: GREEN, t: W(14, 0) - 0.3, dur: 0.9 });
  const ST = S.stairs(240, GY, 2, 190, 90, a + 0.1, 0.7);
  const F = S.fig(ST.tops[0][0], GY, { s: 0.8 }).draw(a + 0.3, 0.9);
  S.thought(960, 400, 170, 100, 960, 580, W(14, 2) - 0.3, 0.8);
  S.cloud(960, 385, 0.45, W(14, 3) - 0.1, 0.5, { storm: true });
  S.arrow(790, 490, 620, 610, W(15, 0) - 0.3, 0.6, { c: GREEN, bend: 0.2 });
  S.text("YES", 520, 460, { size: 64, c: GREEN, t: W(15, 1) - 0.2, dur: 0.4 });
  F.walk(W(15, 5) - 0.4, 0.6, { x: 190, y: -90 });
  S.arrow(1130, 490, 1300, 610, W(15, 6) - 0.2, 0.6, { c: GRAY, bend: -0.2 });
  S.text("NO", 1400, 460, { size: 64, c: GRAY, t: W(15, 7) - 0.2, dur: 0.4 });
  const CL = S.cloud(1480, 720, 0.7, W(15, 7), 0.5, { storm: true });
  S.fadeOut(CL.g, W(15, 8), 1.4);
}

{ // 8. c16 — weather passes. YEL
  const [a, b] = WIN[7];
  const S = scene(a, b, { cam: "push" });
  const F = S.fig(560, GY, { s: 1 }).draw(a + 0.1, 0.9);
  const WX = S.grp();
  S.cloud(560, 330, 1, a + 0.3, 0.7, { parent: WX });
  S.rain(560, 440, 240, 8, a + 0.9, 0.7, { parent: WX });
  S.move(WX, W(16, 5) - 0.3, 2.0, { x: 600 });
  S.fadeOut(WX, W(16, 6), 1.1);
  S.sun(1500, 300, 90, W(16, 6) - 0.1, 0.9);
  F.face(W(16, 7), "smile");
  S.text("They pass.", 1150, 760, { size: 90, font: "caveat", t: W(16, 7) - 0.2, dur: 0.9 });
}

{ // 9. c17 — calm hero, 91% faded, will never come. GREEN
  const [a, b] = WIN[8];
  const S = scene(a, b, { cam: "push" });
  const F = S.fig(700, GY, { s: 1.3 }).draw(a + 0.05, 0.9);
  S.text("91%", 1300, 470, { size: 110, c: GRAY, t: W(17, 0) - 0.2, dur: 0.5 });
  F.face(W(17, 3) - 0.3, "smile");
  S.text("will never come", 1300, 640, { size: 84, font: "caveat", c: GREEN, t: W(17, 6) - 0.3, dur: 0.9 });
}

{ // 10. c18 — write one. close the notebook. GREEN (hold)
  const [a, b] = WIN[9];
  const S = scene(a, b, { cam: "push" });
  const F = S.fig(400, GY, { s: 1.2, pose: "point" }).draw(a + 0.1, 1.0);
  F.face(W(18, 2) - 0.2, "determined", 6);
  const NB = S.notebook(1050, 380, 400, 420, W(18, 2) - 0.3, 1.0);
  const PN = S.pencil(1470, 760, 220, -62, W(18, 3) - 0.1, 0.6);
  S.text("WRITE ONE.", 1250, 290, { size: 170, c: GREEN, t: W(18, 4) - 0.2, dur: 1.0 });
  S.fadeOut(PN.g, W(18, 7) - 0.2, 0.3);
  S.draw(rect(1050, 380, 400, 420), W(18, 7) - 0.1, 0.7, { w: 6, fill: CREAM }); // cover: notebook closed
  S.tick(1250, 600, 1.6, W(18, 9), 0.3);
  F.face(W(18, 9) + 0.3, "smile", 6);
}
