// theme: dark
// Episode 09 — Loneliness. Hero = the viewer. Gentle, warm.
const CUES = [[1,0],[3,0],[4,0],[6,0],[9,0],[11,0],[12,0],[13,0],[14,0],[16,0]];
const WIN = sceneWindows(CUES);

{ // S1 c1–c2: crowd, "1 in 2", heart = 15 cigarettes. RED
  const [a, b] = WIN[0]; const S = scene(a, b);
  const CR = S.crowd(8, 330, GY, 180, 0.7, 0.1, 2.3);
  [0, 2, 4, 6].forEach((i) => CR[i].face(W(1, 1) - 0.1, "sad"));
  S.text("1 in 2", 480, 360, { size: 170, t: W(1, 1) - 0.2, dur: 0.9 });
  S.underline(230, 740, 400, W(1, 7) - 0.2, 0.4, { c: RED });
  S.heart(1040, 290, 1.4, W(2, 1) - 0.3, 0.9);
  S.text("= 15 cigarettes a day", 1500, 315, { size: 50, c: RED, t: W(2, 6) - 0.3, dur: 1.2 });
  for (let i = 0; i < 15; i++) { // cigarettes: outline + red tip
    const x = 1160 + i * 46, y = 380, t = W(2, 10) - 0.2 + i * 0.085;
    S.draw(rect(x, y, 40, 16), t, 0.08, { w: 3.5 });
    S.draw(rect(x, y, 8, 16), t + 0.05, 0.04, { w: 3.5, c: RED, fill: RED });
  }
}
{ // S2 c3: hero alone inside a gray crowd. GRAY, pull
  const [a, b] = WIN[1]; const S = scene(a, b, { cam: "pull" });
  const H = S.fig(960, GY, { s: 0.9 }).draw(a + 0.2, 1.0);
  const CL = S.crowd(4, 300, GY, 150, 0.8, W(3, 2) - 0.3, 1.6, { c: GRAY });
  const CR = S.crowd(4, 1170, GY, 150, 0.8, W(3, 2) - 0.1, 1.6, { c: GRAY });
  H.face(W(3, 8) - 0.2, "sad");
  [...CL, ...CR].forEach((F) => S.move(F.g, W(3, 9) - 0.2, 0.8, { opacity: 0.4 })); // crowd recedes: "this is for you"
}
{ // S3 c4–c5: "500 friends" struck; two figures, seen. GREEN
  const [a, b] = WIN[2]; const S = scene(a, b);
  S.crowd(10, 560, 400, 90, 0.45, a + 0.2, 1.6, { c: GRAY });
  S.text("500 friends", 960, 200, { size: 90, c: GRAY, t: W(4, 4) - 0.3, dur: 0.9 });
  S.strike(640, 130, 1280, 230, W(4, 7) - 0.3, 0.4, { c: GRAY });
  const H = S.fig(760, GY, { s: 0.9 }).draw(W(5, 0) - 0.3, 0.9);
  const O = S.fig(1160, GY, { s: 0.9 }).draw(W(5, 2) - 0.3, 0.8);
  S.eye(960, 600, 1.2, W(5, 3) - 0.3, 0.6);
  S.text("seen", 960, 790, { size: 84, font: "caveat", c: GREEN, t: W(5, 3) + 0.1, dur: 0.6 });
  H.face(W(5, 8) - 0.2, "smile", 6); O.face(W(5, 8) - 0.2, "smile", -6);
}
{ // S4 c6–c8: friend waves hey!, hero reads rejection, pulls back, cycle. RED
  const [a, b] = WIN[3]; const S = scene(a, b);
  const FR = S.fig(1250, GY, { s: 1, pose: "wave" }).draw(a + 0.2, 1.0);
  const H = S.fig(620, GY, { s: 1 }).draw(a + 0.2, 1.0);
  S.speech(1480, 400, 150, 90, 1310, 540, W(6, 1) - 0.1, 0.6);
  S.text("hey!", 1480, 420, { size: 60, t: W(6, 1) + 0.4, dur: 0.4 });
  H.face(W(7, 0) - 0.1, "flat", 6);
  S.thought(420, 330, 170, 110, 580, 520, W(7, 3) - 0.3, 0.8, { parent: H.g });
  S.cross(420, 335, 1, W(7, 4) - 0.2, 0.3, { parent: H.g });
  H.face(W(7, 4) - 0.1, "worried", 6);
  FR.face(W(7, 5) - 0.2, "smile", -6);
  H.face(W(7, 8) - 0.1, "sad", 6);
  H.walk(W(8, 2) - 0.2, 1.0, { x: -260 });
  S.cycle(1620, 720, 100, ["pull back", "lonelier"], W(8, 5) - 0.2, 1.6, { c: RED, size: 44, labelOut: 60 });
  H.grow(W(8, 9) - 0.2, 0.6, 0.85);
}
{ // S5 c9–c10: broken chain, hero points at big phone, real message, tick. GREEN
  const [a, b] = WIN[4]; const S = scene(a, b);
  S.chain(400, 180, 1520, 180, 8, a + 0.2, 1.0, { broken: true });
  const H = S.fig(300, GY, { s: 1 }).draw(a + 0.2, 1.0);
  S.burst(960, 180, 30, 75, 8, W(9, 2) - 0.1, 0.3, { c: GREEN });
  S.phone(820, 580, 3.0, W(10, 0) - 0.3, 0.9, { screen: "chat" });
  H.setPose(W(10, 0) - 0.2, "point");
  S.text("hey, I was", 1360, 500, { size: 72, font: "caveat", t: W(10, 3) - 0.2, dur: 0.6 });
  S.text("thinking of you", 1360, 600, { size: 72, font: "caveat", t: W(10, 5) - 0.2, dur: 0.8 });
  S.tick(1360, 740, 1.6, W(10, 8) - 0.2, 0.3);
  H.face(W(10, 9) - 0.2, "smile", 6);
}
{ // S6 c11: INVITATION card, YES, open door; hero walks toward it. GREEN
  const [a, b] = WIN[5]; const S = scene(a, b);
  const H = S.fig(380, GY, { s: 1 }).draw(a + 0.2, 0.9);
  S.tag(800, 240, "INVITATION", W(11, 0) - 0.1, 0.7, { size: 56 });
  S.text("YES", 800, 460, { size: 170, c: GREEN, t: W(11, 1) - 0.1, dur: 0.6 });
  S.door(1350, 380, 220, 480, W(11, 4) - 0.3, 1.0, { open: true });
  H.walk(W(11, 5), 1.2, { x: 380 });
  H.face(W(11, 7) + 0.05, "smile", 6);
}
{ // S7 c12: hero asks, other answers, both smile. GREEN
  const [a, b] = WIN[6]; const S = scene(a, b);
  const H = S.fig(560, GY, { s: 1 }).draw(a + 0.2, 0.9);
  const O = S.fig(1360, GY, { s: 1 }).draw(a + 0.3, 0.9);
  S.speech(900, 300, 290, 105, 640, 520, W(12, 3) - 0.3, 0.6);
  S.text("how are you, really?", 900, 318, { size: 50, font: "caveat", c: GREEN, t: W(12, 3) + 0.1, dur: 0.9 });
  S.speech(1580, 300, 110, 80, 1400, 520, W(12, 7) - 0.1, 0.4);
  S.text("…", 1580, 320, { size: 70, t: W(12, 7) + 0.3, dur: 0.3 });
  H.face(W(12, 8) - 0.1, "smile", 6); O.face(W(12, 8) - 0.1, "smile", -6);
}
{ // S8 c13: admired figure on a pedestal felt this too; hero small looks up. ORANGE
  const [a, b] = WIN[7]; const S = scene(a, b);
  S.pedestal(1000, GY, 260, 220, a + 0.2, 0.7);
  const AD = S.fig(1130, GY - 220, { s: 0.8 }).draw(W(13, 0) + 0.3, 0.9);
  const H = S.fig(560, GY, { s: 0.7 }).draw(W(13, 1) - 0.2, 0.8);
  H.face(W(13, 2) - 0.1, "flat", 8);
  S.heart(1500, 400, 1.1, W(13, 4) - 0.3, 0.5, { fill: ORANGE, c: ORANGE });
  S.text("felt this too", 1500, 560, { size: 64, font: "caveat", c: ORANGE, t: W(13, 5) - 0.3, dur: 0.8 });
  AD.face(W(13, 6) - 0.1, "sad");
}
{ // S9 c14–c15: ruler too much / too little struck; three doors, the right one open. GLOW
  const [a, b] = WIN[8]; const S = scene(a, b);
  S.ruler(200, GY, 560, a + 0.2, 0.8);
  S.text("too much", 330, 320, { size: 50, anchor: "start", t: W(14, 3) - 0.3, dur: 0.5 });
  S.strike(330, 290, 560, 335, W(14, 3) + 0.2, 0.3, { c: GRAY, w: 7 });
  S.text("too little", 330, 840, { size: 50, anchor: "start", t: W(14, 7) - 0.3, dur: 0.5 });
  S.strike(330, 810, 560, 855, W(14, 7) + 0.2, 0.3, { c: GRAY, w: 7 });
  // doors created before the hero so he walks in front of them (SVG z-order = creation order)
  S.door(760, 440, 200, 420, W(15, 1) - 0.3, 0.5);
  S.door(1080, 440, 200, 420, W(15, 1), 0.5);
  S.door(1400, 440, 200, 420, W(15, 1) + 0.3, 0.5, { open: true });
  S.fill(circ(1480, GY, 170, 36), W(15, 6) - 0.3, 0.5, GLOW, 0.45);
  const H = S.fig(620, GY, { s: 0.8 }).draw(a + 0.3, 0.9);
  H.walk(W(15, 3) - 0.1, 1.5, { x: 710 });
}
{ // S10 c16–c17: knocking at the door, phone, SEND IT. — hold. GREEN
  const [a, b] = WIN[9]; const S = scene(a, b);
  S.door(1000, 400, 220, 460, a + 0.2, 0.7);
  const H = S.fig(866, GY, { s: 1, pose: "reach" }).draw(a + 0.3, 0.9);
  const [hx, hy] = H.hand("R");
  H.face(W(16, 0), "determined", 6);
  S.burst(hx + 8, hy, 22, 60, 5, W(16, 1) - 0.2, 0.3, { a0: -Math.PI / 2, span: Math.PI });
  S.phone(1560, 620, 2.6, W(17, 0) - 0.2, 0.8, { screen: "chat" });
  S.text("SEND IT.", 960, 290, { size: 200, c: GREEN, t: W(17, 2) - 0.3, dur: 0.9 });
}
