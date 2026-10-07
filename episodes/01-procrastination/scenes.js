// Episode 01 — Procrastination (light). Hero = the viewer.
const CUES = [[1, 0], [2, 0], [3, 0], [5, 0], [6, 0], [8, 0], [9, 0], [11, 0], [12, 0], [14, 0], [15, 0], [17, 0]];
const WIN = sceneWindows(CUES);
const T = (c, i, d = 0.3) => W(c, i) - d; // land the stroke just before its word
// ponytail: engine clock appends the paper-filled dial after the hand groups, hiding the hands — lift hands on top
const hands = (K) => { K.g.appendChild(K.hourG); K.g.appendChild(K.minG); return K; };

{ // 1 "You're not lazy." — hero close, LAZY struck
  const [a, b] = WIN[0]; const S = scene(a, b);
  const F = S.fig(560, GY, { s: 1.3 }).draw(0.2, 2.0); F.face(2.3, "flat", 6);
  S.text("LAZY", 1250, 420, { size: 220, t: T(1, 2), dur: 0.3 });
  S.strike(990, 265, 1510, 440, 3.5, 0.2);
}
{ // 2 "…isn't a time problem. It's a feeling problem."
  const [a, b] = WIN[1]; const S = scene(a, b);
  const F = S.fig(900, GY, { s: 0.9, pose: "shrug" }).draw(a + 0.1, 0.9); F.face(5.3, "flat");
  hands(S.clock(430, 470, 150, T(2, 3), 0.8, { h: 9, m: 0, bells: true }));
  S.cross(430, 470, 3.8, 7.3, 0.3);
  S.heart(1300, 420, 3.4, T(2, 7), 0.6);
  S.text("FEELING", 1300, 640, { size: 120, t: T(2, 7, 0.1), dur: 0.6 });
  S.underline(1030, 1570, 672, 9.0, 0.3);
}
{ // 3 "one in five adults… Here's what's really going on."
  const [a, b] = WIN[2]; const S = scene(a, b);
  S.text("1 in 5", 960, 300, { size: 170, t: T(3, 2), dur: 0.6 });
  const C = S.crowd(5, 360, GY, 300, 0.75, T(3, 4, 0.0), 1.4, { hi: [2], hiC: RED });
  C.forEach((F, i) => F.face(T(3, 7, 0.2), i === 2 ? "sad" : "flat"));
  S.magnifier(960, 690, 110, W(4, 0) + 0.2, 0.7, { fill: "none" });
}
{ // 4 "bored, anxious, or not good enough." — desk, storm thought, tags
  const [a, b] = WIN[3]; const S = scene(a, b);
  const CH = S.chair(560, GY, a + 0.1, 0.3); const D = S.desk(600, GY, 480, a + 0.3, 0.5);
  const F = S.fig(540, CH.seatY, { s: 1, sit: true, pose: "reach" }).draw(a + 0.6, 0.9);
  S.laptop(850, D.top, 0.9, T(5, 1, 0.1), 0.6);
  S.thought(900, 300, 230, 130, 600, 480, T(5, 4), 0.6);
  S.cloud(900, 290, 0.8, T(5, 4, 0.0), 0.6, { storm: true });
  S.tag(1500, 400, "bored", T(5, 5, 0.2), 0.4, { size: 48, c: BLUE, tc: BLUE });
  S.tag(1500, 520, "anxious", T(5, 6, 0.2), 0.4, { size: 48, c: BLUE, tc: BLUE });
  S.tag(1500, 640, "not good enough", T(5, 8, 0.2), 0.5, { size: 48, c: BLUE, tc: BLUE });
  F.face(T(5, 10, 0.2), "worried");
}
{ // 5 "fastest relief… One more video. One more scroll. I'll do it later."
  const [a, b] = WIN[4]; const S = scene(a, b);
  const C = S.couch(560, GY, 460, a + 0.1, 0.9);
  const F = S.fig(790, C.seatY, { s: 0.95, sit: true, pose: "hold" }).draw(a + 0.6, 0.9); F.face(25.3, "flat", 6);
  const K = hands(S.clock(1560, 280, 120, T(6, 5, 0.0), 0.8, { h: 9, m: 0 }));
  const [hx, hy] = F.hand("R");
  const P1 = S.phone(hx + 10, hy - 20, 0.9, T(7, 2), 0.6, { screen: "play", glow: true });
  S.hide(P1.g, T(7, 5)); S.phone(hx + 10, hy - 20, 0.9, T(7, 5), 0.5, { screen: "feed", glow: true });
  S.text("I'll do it later", 1400, 620, { size: 96, font: "caveat", c: RED, t: T(7, 6, 0.25), dur: 0.8 });
  K.spin(T(7, 9, 0.25), 1.0, 2);
}
{ // 6 "Later turns into guilt. Guilt turns into more avoiding." — vulnerable
  const [a, b] = WIN[5]; const S = scene(a, b, { cam: "pull" });
  const F = S.fig(300, GY, { s: 0.65, pose: "sad" }).draw(a + 0.2, 0.8); F.face(36.0, "sad");
  const CY = S.cycle(1100, 480, 200, ["Later", "Guilt", "Avoid"], T(8, 0, 0.2), 4.2, { labelOut: 80, size: 64 });
  CY.spin(37.2, 0.9, 1);
}
{ // 7 "part nobody tells you… forgave themselves… did it less on the next exam."
  const [a, b] = WIN[6]; const S = scene(a, b);
  const F = S.fig(960, GY, { s: 1 }).draw(a + 0.1, 1.0); F.face(39.8, "flat");
  F.setPose(T(9, 4, 0.1), "think");
  S.notebook(200, 330, 300, 300, T(10, 0), 0.8);
  S.text("EXAM 1", 350, 290, { size: 56, t: T(10, 0, -0.2), dur: 0.4 });
  S.text("forgive yourself", 960, 240, { size: 84, font: "caveat", c: GREEN, t: T(10, 2), dur: 0.9 });
  S.cross(350, 480, 2.4, T(10, 5), 0.3);
  S.arrow(560, 400, 1360, 400, T(10, 6), 0.6, { bend: -0.08 });
  F.setPose(T(10, 6), "stand");
  S.notebook(1400, 330, 300, 300, T(10, 11, 0.4), 0.7);
  S.text("EXAM 2", 1550, 290, { size: 56, t: T(10, 11, 0.1), dur: 0.4 });
  S.tick(1550, 480, 3, T(10, 12, 0.2), 0.3);
  F.face(T(10, 12, 0.1), "smile");
}
{ // 8 "Shame doesn't fix it. Starting does."
  const [a, b] = WIN[7]; const S = scene(a, b);
  const F = S.fig(1450, GY, { s: 1.2 }).draw(a + 0.1, 0.9);
  S.text("SHAME", 600, 400, { size: 170, t: T(11, 0, 0.25), dur: 0.5 });
  S.strike(300, 270, 900, 420, T(11, 1, 0.1), 0.3);
  S.text("STARTING", 600, 650, { size: 150, c: GREEN, t: T(11, 4, 0.25), dur: 0.6 });
  F.face(T(11, 4, 0.1), "determined");
  S.underline(230, 970, 690, T(11, 5, 0.25), 0.3, { c: GREEN });
}
{ // 9 "make starting tiny. Open the file. Write one line. Set a two-minute timer."
  const [a, b] = WIN[8]; const S = scene(a, b);
  const F = S.fig(1000, GY, { s: 0.85 }).draw(a + 0.1, 0.9);
  const CL = S.checklist(200, 380, ["Open the file", "Write one line", "2-minute timer"], T(12, 2), 1.2, { gap: 110, size: 56 });
  S.tick(CL.boxes[0][0], CL.boxes[0][1], 0.7, WE(13, 2) - 0.2, 0.2);
  S.tick(CL.boxes[1][0], CL.boxes[1][1], 0.7, WE(13, 5) - 0.2, 0.2);
  F.setPose(T(13, 6), "point");
  S.timer(1450, 520, 150, T(13, 6, 0.2), 0.7, { label: "2:00", fillAt: 59.2, fillDur: 1.2 });
  S.tick(CL.boxes[2][0], CL.boxes[2][1], 0.7, WE(13, 9) - 0.4, 0.2);
}
{ // 10 "decide exactly when: after coffee, at my desk, I begin."
  const [a, b] = WIN[9]; const S = scene(a, b);
  const CH = S.chair(700, GY, a + 0.1, 0.3); const D = S.desk(740, GY, 420, a + 0.3, 0.5);
  const F = S.fig(680, CH.seatY, { s: 1, sit: true, pose: "reach" }).draw(a + 0.6, 0.9);
  F.face(T(14, 3, 0.2), "flat");
  S.coffee(260, 600, 1.6, T(14, 5, 0.35), 0.6);
  S.arrow(390, 470, 540, 470, T(14, 6, 0.2), 0.4, { c: ORANGE, w: 9 });
  S.laptop(960, D.top, 0.9, T(14, 8, 0.35), 0.5);
  S.arrow(1200, 470, 1340, 470, T(14, 9, 0.05), 0.4, { c: ORANGE, w: 9 });
  S.text("BEGIN", 1600, 520, { size: 130, t: T(14, 10, 0.25), dur: 0.5 });
  F.face(T(14, 10, 0.05), "determined");
}
{ // 11 "You don't need to feel ready. You just need to begin. Every time you start, you prove that feeling wrong."
  const [a, b] = WIN[10]; const S = scene(a, b);
  const CL = S.cloud(380, 330, 1.1, a + 0.1, 0.8, { storm: true });
  const F = S.fig(500, GY, { s: 1 }).draw(a + 0.4, 0.9); F.face(68.9, "flat");
  S.fadeOut(CL.g, T(15, 5, 0.1), 0.8);
  S.door(1450, 420, 200, 440, T(15, 6), 0.9, { open: true, sign: "BEGIN" });
  F.walk(T(15, 10, 0.2), 2.2, { x: 650 });
  F.face(T(16, 3, 0.2), "smile", 6);
  S.burst(1150, 700, 190, 220, 14, T(16, 5, 0.25), 0.5, { c: GREEN });
  F.face(T(16, 8, 0.25), "happy", 6);
}
{ // 12 "Pause this video. Do two minutes. Right now." — hold to the end
  const [a, b] = WIN[11]; const S = scene(a, b);
  const F = S.fig(520, GY, { s: 1.45, pose: "point" }).draw(a + 0.1, 1.0);
  F.face(T(17, 3, 0.2), "determined", 6);
  S.timer(960, 600, 120, T(17, 4, 0.3), 0.7, { label: "2:00" });
  S.text("RIGHT", 1480, 330, { size: 190, t: T(17, 6), dur: 0.4 });
  S.text("NOW.", 1480, 580, { size: 190, c: RED, t: T(17, 7, 0.25), dur: 0.4 });
}
