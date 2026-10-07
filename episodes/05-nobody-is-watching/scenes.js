// Episode 05 — Nobody is watching (spotlight effect). Hero = the viewer.
// script.json has 18 sentences; scene board clip numbers from scene 6 on are shifted by one — real clips used here.
const CUES = [[1, 0], [4, 0], [6, 0], [8, 0], [11, 0], [13, 0], [15, 0], [16, 0], [17, 0]];
const WIN = sceneWindows(CUES);

{ // 1. c1–c3 T-shirt study: hero in printed shirt, crowd, 46% guess → 23% did. GREEN
  const [a, b] = WIN[0];
  const S = scene(a, b);
  const F = S.fig(520, GY, { s: 1 }).draw(0.3, 1.2);
  F.face(W(1, 5) - 0.2, "worried", 6);
  S.shirt(520, F.sh[1] + 55, 0.85, W(1, 6) - 0.3, 0.9, { print: true });
  S.crowd(8, 1000, GY, 110, 0.6, W(1, 9) - 0.3, 1.4);
  const P1 = S.pie(1180, 330, 130, 0.46, W(2, 4) - 0.3, 0.8, { cBig: GRAY, cSmall: CREAM });
  const T1 = S.text("46%", 1180, 355, { size: 80, t: W(2, 6) - 0.2, dur: 0.4 });
  S.fadeOut(P1.g, W(3, 1) - 0.5, 0.25); S.fadeOut(T1, W(3, 1) - 0.5, 0.25);
  S.pie(1180, 330, 130, 0.23, W(3, 1) - 0.3, 0.7, { cBig: GREEN, cSmall: CREAM });
  S.text("23%", 1590, 390, { size: 170, c: GREEN, t: W(3, 1) - 0.2, dur: 0.6 });
}
{ // 2. c4–c5 spotlight on hero, six eyes, then eyes vanish and the light shrinks. YEL/GLOW
  const [a, b] = WIN[1];
  const S = scene(a, b);
  const L = S.spotlight(960, 80, GY, 260, a, 1.1);
  const F = S.fig(960, GY, { s: 1 }).draw(a + 0.4, 1.0);
  S.text("SPOTLIGHT EFFECT", 480, 200, { size: 80, c: YEL, t: W(4, 4) - 0.3, dur: 0.9 });
  F.face(W(5, 0) - 0.2, "worried");
  const eyes = [[300, 540], [420, 760], [600, 360], [1620, 540], [1500, 760], [1320, 360]].map(([x, y], i) =>
    S.eye(x, y, 1.2, W(5, 5) - 0.4 + i * 0.08, 0.5, { dx: x < 960 ? 10 : -10 }).g);
  eyes.forEach((e) => S.fadeOut(e, W(5, 6), 0.4));
  L.shrink(W(5, 6), 0.6, 0.4);
  F.face(W(5, 7), "smile");
}
{ // 3. c6–c7 small hero, three things never done, each crossed out. GRAY, pull
  const [a, b] = WIN[2];
  const S = scene(a, b, { cam: "pull" });
  const F = S.fig(330, GY, { s: 0.7 }).draw(a, 0.9);
  F.face(a + 1.0, "worried", 4);
  S.speech(600, 540, 95, 70, 372, 662, W(6, 4) - 0.3, 0.7); // empty bubble = stayed quiet
  S.text("this is for you", 700, 840, { size: 76, font: "caveat", c: GRAY, t: W(6, 11) - 0.3, dur: 0.9 });
  S.text("?", 600, 575, { size: 96, t: W(7, 1) - 0.3, dur: 0.3 });
  S.cross(600, 540, 1.3, W(7, 4) - 0.2, 0.4, { c: GRAY });
  S.bulb(1000, 540, 1.2, W(7, 6) - 0.3, 0.8);
  S.cross(1000, 540, 1.6, W(7, 9) - 0.2, 0.4, { c: GRAY });
  S.door(1380, 420, 180, 360, W(7, 11) - 0.3, 1.0, { sign: "GYM" });
  S.cross(1470, 600, 2, W(7, 14) - 0.2, 0.4, { c: GRAY });
}
{ // 4. c8–c10 everyone is the main character: five figures, each in their own spotlight, thinking "me". ORANGE
  const [a, b] = WIN[3];
  const S = scene(a, b);
  S.text("THE TRUTH", 960, 170, { size: 96, c: ORANGE, t: W(8, 2) - 0.3, dur: 0.8 });
  const CR = S.crowd(5, 320, GY, 320, 0.8, W(9, 0) - 0.3, 1.4);
  CR.forEach((F, i) => {
    S.spotlight(F.cx, 250, GY, 100, W(9, 3) - 0.2 + i * 0.25, 0.8);
    F.face(W(9, 6) + i * 0.1, "flat");
    S.thought(F.cx + 125, 470, 62, 42, F.cx + 30, 585, W(10, 3) - 0.3 + i * 0.2, 0.6);
    S.text("me", F.cx + 125, 486, { size: 44, c: ORANGE, t: W(10, 3) + 0.4 + i * 0.2, dur: 0.3 });
  });
}
{ // 5. c11–c12 nervous hero under a magnifier that fades; clock spins, crowd walks off, "they forget". GRAY
  const [a, b] = WIN[4];
  const S = scene(a, b);
  const F = S.fig(560, GY, { s: 1 }).draw(a, 0.9);
  F.face(a + 1.0, "worried", 6);
  const CR = S.crowd(4, 1100, GY, 140, 0.6, a + 0.5, 1.2);
  S.drop(625, 515, 1.6, W(11, 2) - 0.2, 0.3);
  const M = S.magnifier(600, 600, 150, W(11, 3) - 0.3, 0.7, { fill: "none" });
  S.fadeOut(M.g, W(11, 4) + 0.2, 0.5);
  const CK = S.clock(1500, 330, 110, W(12, 0) - 0.3, 0.8, { h: 10, m: 10 });
  CK.spin(W(12, 2) - 0.2, 1.5, 3);
  CR.forEach((C, i) => C.walk(W(12, 2) + i * 0.1, 1.6, { x: 900 }));
  S.text("they forget", 1320, 780, { size: 84, font: "caveat", c: GRAY, t: W(12, 6) - 0.3, dur: 0.9 });
}
{ // 6. c13–c14 empty seats, checklist ticks on each line, hero walks into the open gym door. GREEN
  const [a, b] = WIN[5];
  const S = scene(a, b);
  const F = S.fig(900, GY, { s: 1 }).draw(a, 0.9);
  S.seats(360, 300, 7, 170, W(13, 5) - 0.3, 1.0);
  const CL = S.checklist(140, 560, ["Ask the question", "Share the idea", "Walk into the gym"], W(13, 8) - 0.2, 1.5, { gap: 90 });
  F.face(W(14, 0) - 0.2, "determined", 6);
  [W(14, 0), W(14, 3), W(14, 6)].forEach((t, i) => S.tick(CL.boxes[i][0], CL.boxes[i][1], 0.6, t));
  S.door(1380, 480, 180, 380, W(14, 6) - 0.3, 0.6, { open: true, sign: "GYM" });
  F.walk(W(14, 6), 1.3, { x: 570 });
  S.fadeOut(F.g, W(14, 6) + 1.0, 0.4);
}
{ // 7. c15 still feel the spotlight — walk forward anyway while it shrinks. ORANGE
  const [a, b] = WIN[6];
  const S = scene(a, b);
  const L = S.spotlight(700, 80, GY, 240, a, 0.9);
  const F = S.fig(700, GY, { s: 1 }).draw(a + 0.2, 0.9);
  F.face(W(15, 2) - 0.2, "worried", 6);
  F.walk(W(15, 5) - 0.3, 1.2, { x: 420 });
  L.shrink(W(15, 5) - 0.3, 1.2, 0.6);
  S.text("Do it anyway.", 1380, 330, { size: 120, font: "caveat", c: ORANGE, t: W(15, 5) - 0.3, dur: 0.9 });
}
{ // 8. c16 the spotlight shrinks twice while the hero grows. ORANGE
  const [a, b] = WIN[7];
  const S = scene(a, b);
  const L = S.spotlight(960, 80, GY, 300, a, 0.8);
  const F = S.fig(960, GY, { s: 1 }).draw(a + 0.2, 0.9);
  L.shrink(W(16, 5) - 0.3, 0.6, 0.5);
  F.grow(W(16, 5) - 0.3, 1.8, 1.2);
  L.shrink(W(16, 8) - 0.3, 0.6, 0.25);
  F.face(W(16, 9) - 0.2, "smile");
  S.text("smaller", 1500, 500, { size: 84, font: "caveat", c: ORANGE, t: W(16, 9) - 0.3, dur: 0.6 });
}
{ // 9. c17–c18 big hero arms up: LIVE LIKE IT. / one small thing. ORANGE, hold
  const [a, b] = WIN[8];
  const S = scene(a, b);
  const F = S.fig(560, GY, { s: 1.4, pose: "armsUp" }).draw(a, 1.2);
  S.text("nobody is watching", 1250, 230, { size: 72, font: "caveat", t: W(17, 2) - 0.3, dur: 0.9 });
  F.face(W(17, 8) - 0.2, "happy");
  S.text("LIVE", 1250, 420, { size: 190, c: ORANGE, t: W(17, 9) - 0.3, dur: 0.5 });
  S.text("LIKE IT.", 1250, 610, { size: 190, c: ORANGE, t: W(17, 10) - 0.2, dur: 0.7 });
  S.text("one small thing", 1250, 790, { size: 84, font: "caveat", t: W(18, 2) - 0.3, dur: 0.9 });
  S.underline(960, 1540, 815, W(18, 8) - 0.2, 0.5, { c: ORANGE });
}
