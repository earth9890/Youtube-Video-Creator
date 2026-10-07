// Episode 07 — Fear of failure / perfectionism (light theme)
const CUES = [[1, 0], [4, 0], [5, 0], [6, 0], [10, 0], [12, 0], [13, 0], [15, 0], [16, 0], [17, 0]];
const WIN = sceneWindows(CUES);

{ // S1 c1–c3: Dyson, 5,126 failed prototypes → 5,127
  const [a, b] = WIN[0];
  const S = scene(a, b);
  S.desk(140, GY, 480, 0.2, 0.8);
  S.notebook(250, 460, 230, 180, 0.9, 0.7);
  S.pencil(500, 640, 150, -70, 1.5, 0.4);
  const F = S.fig(760, GY, { s: 1.0 }).draw(1.2, 1.0);
  const n1 = S.text("5,126", 1250, 440, { size: 200, t: W(1, 3) - 0.3, dur: 1.5 });
  const bx = [...Array(8)].map((_, i) => 1010 + i * 105);
  bx.forEach((x, i) => S.draw(rrect(x, 740, 80, 80, 10), W(1, 9) - 0.2 + i * 0.17, 0.3, { w: 6, fill: CREAM }));
  F.face(W(2, 0), "flat", 6);
  bx.forEach((x, i) => S.cross(x + 40, 780, 0.45, W(2, 3) - 0.3 + i * 0.09, 0.22));
  S.hide(n1, W(3, 1) - 0.3);
  S.text("5,127", 1250, 440, { size: 200, c: GREEN, t: W(3, 1) - 0.3, dur: 1.5 });
  S.burst(1250, 370, 280, 330, 8, W(3, 7) - 0.3, 0.5, { c: GREEN, a0: Math.PI / 8, w: 7 });
  F.setPose(W(3, 7) - 0.3, "armsUp");
  F.face(W(3, 7) - 0.3, "happy", 6);
}

{ // S2 c4: chart — pressure to be perfect +33% since 1989
  const [a, b] = WIN[1];
  const S = scene(a, b);
  S.draw(poly([[400, 200], [400, 800], [1500, 800]], 2), a, 0.8, { w: 7 });
  const F = S.fig(1700, GY, { s: 0.7 }).draw(a + 0.2, 0.8);
  S.text("1989", 430, 852, { size: 44, anchor: "start", c: GRAY, t: W(4, 1) - 0.3, dur: 0.5 });
  S.text("TODAY", 1480, 852, { size: 44, anchor: "end", c: GRAY, t: W(4, 1) + 0.3, dur: 0.5 });
  S.arrow(460, 740, 1420, 300, W(4, 3) - 0.3, 2.0, { bend: 0.1, c: RED, w: 9 });
  F.face(W(4, 9), "worried", -6);
  S.text("+33%", 720, 420, { size: 150, c: RED, t: W(4, 11) - 0.3, dur: 1.0 });
}

{ // S3 c5: waiting at the START door
  const [a, b] = WIN[2];
  const S = scene(a, b, { cam: "pull" });
  const F = S.fig(760, GY, { s: 0.75 }).draw(a, 0.9);
  S.door(1100, 420, 220, 440, W(5, 4) - 0.3, 1.0, { sign: "START" });
  S.hourglass(1480, 780, 0.9, W(5, 7) - 0.3, 0.8);
  F.face(W(5, 9) - 0.2, "worried", 6);
  S.arrow(760, 440, 760, 590, W(5, 13) - 0.3, 0.5, { c: GRAY, w: 7 });
}

{ // S4 c6–c9: the trap — "high standards" is fear in a jacket; the first step grows
  const [a, b] = WIN[3];
  const S = scene(a, b);
  const F = S.fig(560, GY, { s: 0.75 }).draw(a, 0.9);
  F.setPose(W(6, 2) - 0.1, "think");
  S.tag(960, 200, "HIGH STANDARDS", W(7, 3) - 0.3, 0.8, { size: 56 });
  S.tag(960, 470, "FEAR", W(8, 6) - 0.3, 0.5, { size: 60, tc: RED, c: RED });
  S.strike(735, 165, 1185, 235, W(8, 7) - 0.2, 0.3);
  S.shirt(960, 470, 1.5, W(8, 10) - 0.5, 0.8, { fill: "none" });
  F.setPose(W(9, 0) - 0.1, "stand");
  F.walk(W(9, 0), 1.3, { x: 560 });
  // ponytail: one-step `stairs` scales up into a bare L; a filled block reads as "the first step"
  const ST = S.draw(rect(1280, GY - 90, 160, 90), W(9, 8) - 0.3, 0.5, { w: 4, fill: CREAM });
  S.move(ST, W(9, 10) - 0.3, 0.7, { scale: 2.2, svgOrigin: "1280 860" });
  F.face(W(9, 10) - 0.3, "worried", 6);
}

{ // S5 c10–c11: failure is the data that builds success
  const [a, b] = WIN[4];
  const S = scene(a, b);
  const F = S.fig(230, GY, { s: 0.9 }).draw(a, 0.8);
  S.text("FAILURE", 500, 400, { size: 90, t: W(11, 0) - 0.3, dur: 0.7 });
  const X = S.cross(950, 365, 1.0, W(11, 1) - 0.3, 0.3);
  S.text("SUCCESS", 1400, 400, { size: 90, t: W(11, 3) - 0.3, dur: 0.7 });
  S.fadeOut(X.g, W(11, 6) - 0.3, 0.3);
  S.arrow(760, 370, 1140, 370, W(11, 6) - 0.2, 0.5, { c: GREEN, w: 9 });
  [...Array(6)].forEach((_, i) => S.cross(590 + i * 140, 815, 0.4, W(11, 8) - 0.3 + i * 0.1, 0.2));
  S.stairs(520, GY, 6, 140, 70, W(11, 10) - 0.3, 0.9);
  F.face(W(11, 10), "smile", 6);
}

{ // S6 c12: pre-fallen, kind to yourself, rise → try again
  const [a, b] = WIN[5];
  const S = scene(a, b);
  const F = S.fig(700, GY, { s: 1.0 });
  F.lie(a, 0.01);
  F.draw(a, 0.9);
  const H = S.draw(heartPath(850, 600, 1.8), W(12, 3) - 0.3, 0.6, { c: GREEN, fill: GREEN, fo: 0.25, w: 7 });
  S.move(H, W(12, 7) - 0.3, 0.3, { scale: 1.15, svgOrigin: "850 600" });
  S.move(H, W(12, 7), 0.3, { scale: 1, svgOrigin: "850 600" });
  F.rise(W(12, 10) - 0.3, 0.7);
  F.face(W(12, 12) - 0.2, "smile", 6);
  S.text("try again", 1400, 450, { size: 120, font: "caveat", c: GREEN, t: W(12, 12) - 0.3, dur: 0.8 });
}

{ // S7 c13–c14: a bad first draft — ugly, small, today
  const [a, b] = WIN[6];
  const S = scene(a, b);
  S.notebook(300, 240, 600, 560, a, 1.0);
  const F = S.fig(1680, GY, { s: 0.75 }).draw(W(13, 1) - 0.3, 0.9);
  // scribble lines across the notebook rules
  const scribble = (y0, n) => { const p = []; for (let i = 0; i <= n; i++) p.push([350 + (i / n) * 520, y0 + (i % 2 ? -14 : 10) + (i % 3) * 4]); return smooth(p); };
  S.draw(scribble(360, 12), W(13, 4) - 0.3, 0.5, { c: ORANGE, w: 5 });
  S.draw(scribble(440, 10), W(13, 4) + 0.2, 0.5, { c: ORANGE, w: 5 });
  S.draw(scribble(520, 14), W(13, 5), 0.5, { c: ORANGE, w: 5 });
  S.tag(600, 180, "DRAFT 1", W(13, 6) - 0.3, 0.6, { size: 48, tc: ORANGE, c: ORANGE });
  F.setPose(W(14, 0) - 0.3, "pointL");
  const CL = S.checklist(1150, 420, ["ugly", "small", "today"], W(14, 0) - 0.3, 1.2, { gap: 110, size: 64 });
  [2, 5, 8].forEach((wi, i) => S.tick(CL.boxes[i][0], CL.boxes[i][1], 0.8, W(14, wi) - 0.25, 0.15, { c: ORANGE }));
}

{ // S8 c15: fix it tomorrow — calendar, arrow to the next cell
  const [a, b] = WIN[7];
  const S = scene(a, b);
  S.fig(200, GY, { s: 0.75 }).draw(a, 0.7);
  S.calendar(360, 300, 7, 1, 160, 140, a + 0.1, 0.8, { title: "THIS WEEK" });
  S.tick(760, 440, 0.7, W(15, 0), 0.15, { c: ORANGE });
  S.arrow(800, 440, 885, 440, W(15, 1) - 0.2, 0.4, { c: ORANGE, w: 8 });
  S.pencil(920, 470, 190, 62, W(15, 2) - 0.2, 0.4);
  S.text("tomorrow", 1300, 780, { size: 100, font: "caveat", c: ORANGE, t: W(15, 3) - 0.3, dur: 0.9 });
}

{ // S9 c16: identity — not "never fails", but TRIES AGAIN
  const [a, b] = WIN[8];
  const S = scene(a, b);
  const F = S.fig(520, GY, { s: 1.3 }).draw(a, 1.0);
  S.text("never fails", 1300, 380, { size: 90, c: GRAY, t: W(16, 4) - 0.3, dur: 0.7 });
  S.draw(line([990, 352], [1610, 346], 6), W(16, 5) + 0.1, 0.3, { w: 10 });
  F.face(W(16, 9) - 0.3, "determined", 6);
  S.text("TRIES AGAIN", 1300, 650, { size: 150, c: GREEN, t: W(16, 9) - 0.3, dur: 1.0 });
}

{ // S10 c17: fail faster / learn sooner / start now — hold
  const [a, b] = WIN[9];
  const S = scene(a, b);
  const F = S.fig(420, GY, { s: 1.0, pose: "point" }).draw(a, 0.7);
  S.text("FAIL FASTER", 1250, 330, { size: 110, t: W(17, 0) - 0.3, dur: 0.8 });
  S.text("LEARN SOONER", 1250, 520, { size: 110, t: W(17, 2) - 0.3, dur: 0.8 });
  S.text("START NOW", 1250, 760, { size: 170, c: GREEN, t: W(17, 4) - 0.3, dur: 0.9 });
  F.face(W(17, 5), "happy", 6);
  S.underline(800, 1700, 800, W(17, 5) + 0.6, 0.5, { c: GREEN });
}
