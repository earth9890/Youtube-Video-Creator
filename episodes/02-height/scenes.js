// Episode 02 — Height / feeling small (light theme)
const CUES = [[1, 0], [3, 0], [5, 0], [6, 0], [9, 0], [10, 0], [12, 0], [13, 0], [16, 0], [17, 0], [18, 0]];
const WIN = sceneWindows(CUES);

{ // 1. c1–c2: 1968, one man, five classes, a different title each time — BLUE
  const [a, b] = WIN[0];
  const S = scene(a, b);
  const F = S.fig(960, GY, { s: 1.0 }).draw(0.3, 1.2);
  S.draw(rect(660, 70, 600, 170), 1.6, 0.8, { w: 7, fill: CREAM });
  S.text("1968", 960, 195, { size: 120, c: BLUE, t: W(1, 1) - 0.3, dur: 0.6 });
  // five classes = five small doors across the top
  for (let i = 0; i < 5; i++) S.door(420 + i * 240, 300, 120, 190, W(1, 7) - 0.3 + i * 0.22, 0.5);
  S.ring(960, 560, 70, 70, W(2, 0) - 0.25, 0.5, { c: BLUE });            // "Same man"
  S.draw(line([780, 505], [1140, 505], 2), W(2, 2) - 0.25, 0.5, { c: BLUE, w: 5 }); // "Same height"
  const T1 = S.tag(960, 905, "STUDENT", W(2, 6) - 0.3, 0.5);           // "title"
  S.hide(T1.g, W(2, 8) - 0.25);
  S.tag(960, 905, "PROFESSOR", W(2, 8) - 0.25, 0.4);                   // "each time" → swap
}

{ // 2. c3–c4: student guessed shorter → professor grew 5 cm — GREEN
  const [a, b] = WIN[1];
  const S = scene(a, b);
  S.ruler(380, GY, 560, a + 0.05, 1.2, { labels: [[0.5, "170"], [0.75, "175"], [1, "180"]] });
  const F = S.fig(700, GY, { s: 1.0 }).draw(a + 0.3, 1.0);
  const T1 = S.tag(700, 905, "STUDENT", W(3, 6) - 0.3, 0.5);
  const TX = S.text("guessed shorter", 1300, 430, { size: 72, font: "caveat", t: W(3, 8) - 0.3, dur: 0.8 });
  S.hide(T1.g, W(4, 6) - 0.3); S.hide(TX, W(4, 6) - 0.3);
  S.tag(700, 905, "PROFESSOR", W(4, 6) - 0.3, 0.5);
  F.grow(W(4, 8) - 0.2, 0.8, 1.1);
  S.text("+5 cm", 1300, 450, { size: 120, c: GREEN, t: W(4, 10) - 0.3, dur: 0.6 });
  S.burst(700, 530, 95, 145, 9, W(4, 11) - 0.2, 0.5, { c: GREEN, a0: Math.PI, span: Math.PI });
}

{ // 3. c5: height isn't only measured with a tape — RED
  const [a, b] = WIN[2];
  const S = scene(a, b);
  let ticks = "";
  for (let i = 1; i < 24; i++) { const x = 360 + (1200 * i) / 24; ticks += `M${x} 480 L${x} ${i % 4 === 0 ? 530 : 505} `; }
  S.seq([[rect(360, 480, 1200, 110), 2, { w: 7, fill: CREAM }], [ticks, 1, { w: 4 }]], a + 0.05, 0.9);
  S.fig(1720, GY, { s: 1.0 }).draw(a + 0.1, 0.9);
  S.text("measured", 960, 330, { size: 100, t: W(5, 3) - 0.3, dur: 0.6 });
  S.strike(380, 440, 1540, 630, W(5, 6) - 0.3, 0.4);
}

{ // 4. c6–c8: felt small in a room, back of every photo, checked who was taller — GRAY, pull
  const [a, b] = WIN[3];
  const S = scene(a, b, { cam: "pull" });
  S.draw(rrect(430, 110, 1060, 770, 24), a + 0.05, 0.9, { w: 9, c: GRAY });
  const F = S.fig(970, 800, { s: 0.72 }).draw(W(6, 3) - 0.3, 0.9);          // hero at the back
  S.crowd(4, 700, 850, 180, 0.95, W(6, 7) - 0.3, 1.4);                        // the room, in front
  F.face(W(7, 5) - 0.2, "sad");
  S.text("every photo", 1680, 300, { size: 56, font: "caveat", c: GRAY, t: W(7, 7) - 0.3, dur: 0.6 });
  S.eye(1680, 520, 1.3, W(8, 2) - 0.3, 0.6, { dx: -10 });                     // checked who was taller
  S.ruler(300, 800, 300, W(8, 5) - 0.3, 0.8);
}

{ // 5. c9: that feeling is real, not your fault — ORANGE, empty space
  const [a, b] = WIN[4];
  const S = scene(a, b);
  const F = S.fig(960, GY, { s: 0.7 }).draw(a + 0.05, 0.8);
  F.face(W(9, 1) + 0.2, "sad");
  S.text("Not your fault.", 960, 330, { size: 110, font: "caveat", c: ORANGE, t: W(9, 6) - 0.3, dur: 0.8 });
}

{ // 6. c10–c11: Napoleon was average; people kept calling him small — RED
  const [a, b] = WIN[5];
  const S = scene(a, b);
  const F = S.fig(960, GY, { s: 1.0 }).draw(a + 0.05, 0.9);
  const [tx, ty] = F.top();
  S.hat(tx, ty - 10, 1, W(10, 1) - 0.2, 0.6, { kind: "bicorne" });
  F.face(W(10, 4) - 0.2, "determined");
  S.ruler(1250, GY, 520, W(10, 7) - 0.3, 1.0, { labels: [[0.66, "AVG"]] });
  S.draw(line([1010, ty], [1250, ty], 2), W(10, 8) + 0.1, 0.4, { w: 4 });
  S.speech(400, 300, 150, 90, 250, 470, W(11, 0) - 0.3, 0.6);
  S.text("small!", 400, 320, { size: 64, c: RED, t: W(11, 0) + 0.3, dur: 0.3 });
  S.speech(1560, 300, 150, 90, 1700, 470, W(11, 2) - 0.3, 0.6);
  S.text("small!", 1560, 320, { size: 64, c: RED, t: W(11, 2) + 0.3, dur: 0.3 });
  S.strike(270, 220, 530, 380, W(11, 5) - 0.3, 0.35);
  S.strike(1430, 220, 1690, 380, W(11, 5) + 0.05, 0.35);
}

{ // 7. c12: can't change height, can change how you carry it — GREEN
  const [a, b] = WIN[6];
  const S = scene(a, b);
  const F = S.fig(800, GY, { s: 1.0 }).draw(a + 0.05, 0.9);
  F.slump(a, 0.02, 12);
  S.ruler(400, GY, 400, W(12, 2) - 0.3, 0.8);
  S.padlock(430, 400, 0.7, W(12, 4) - 0.3, 0.5);                      // "height" is locked
  F.slump(W(12, 11) - 0.4, 0.5, 0);
  F.grow(W(12, 11) - 0.4, 0.6, 1.06);
  S.text("carry it", 1350, 420, { size: 100, font: "caveat", c: GREEN, t: W(12, 11) - 0.2, dur: 0.6 });
}

{ // 8. c13–c15: checklist — GREEN
  const [a, b] = WIN[7];
  const S = scene(a, b);
  const CL = S.checklist(200, 300, ["Stand tall", "Shoulders back", "Get strong", "Clothes that fit", "Eye contact"], a + 0.05, 1.0, { gap: 95, size: 54 });
  const F = S.fig(1050, GY, { s: 1.0 }).draw(a + 0.1, 0.9);
  const tk = (i, t) => S.tick(CL.boxes[i][0], CL.boxes[i][1], 0.7, t, 0.25);
  tk(0, W(13, 0) + 0.3); tk(1, W(13, 2) + 0.2);
  F.face(W(13, 4), "determined");                                      // "Head up"
  tk(2, W(14, 1) + 0.1); S.dumbbell(1600, 330, 1.1, W(14, 1) - 0.3, 0.6);
  tk(3, W(14, 5) + 0.1); S.shirt(1600, 560, 0.9, W(14, 3) - 0.3, 0.7, { fill: CREAM });
  S.speech(1300, 380, 110, 70, 1120, 500, W(15, 0) - 0.3, 0.5);
  S.text("slowly", 1300, 398, { size: 54, font: "caveat", c: GREEN, t: W(15, 1) - 0.2, dur: 0.4 });
  tk(4, W(15, 6)); S.eye(1600, 790, 1.3, W(15, 6) - 0.4, 0.5);
}

{ // 9. c16: remember that professor? people see more than centimeters — ORANGE
  const [a, b] = WIN[8];
  const S = scene(a, b);
  const R = S.ruler(330, GY, 500, a + 0.1, 0.8, { labels: [[0.75, "175"], [1, "180"]] });
  const F = S.fig(900, GY, { s: 1.2 }).draw(a + 0.05, 0.9);
  S.tag(900, 905, "PROFESSOR", W(16, 2) - 0.3, 0.5);
  S.fadeOut(R.g, W(16, 3) - 0.1, 0.6);
  S.burst(900, 500, 150, 220, 9, W(16, 4) - 0.2, 0.6, { c: ORANGE, a0: Math.PI, span: Math.PI });
  F.face(W(16, 5) - 0.1, "smile");
  S.text("People see more", 1450, 400, { size: 72, font: "caveat", c: ORANGE, t: W(16, 5) - 0.2, dur: 0.8 });
}

{ // 10. c17: height is a number, presence is a choice — ORANGE, power staging
  const [a, b] = WIN[9];
  const S = scene(a, b);
  const F = S.fig(420, GY, { s: 1.4 }).draw(a + 0.05, 0.9);
  S.text("HEIGHT = a number", 1180, 300, { size: 80, c: GRAY, t: W(17, 1) - 0.3, dur: 0.8 });
  S.text("PRESENCE = a choice", 1180, 540, { size: 110, t: W(17, 6) - 0.3, dur: 0.9 });
  F.face(W(17, 6), "determined");
  S.underline(1340, 1800, 585, W(17, 9) - 0.2, 0.4, { c: ORANGE });
}

{ // 11. c18: walk into one room like you belong there — ORANGE, hold
  const [a, b] = WIN[10];
  const S = scene(a, b);
  S.door(1380, 400, 220, 460, a + 0.05, 0.9, { open: true });
  const F = S.fig(500, GY, { s: 1.0 }).draw(a + 0.1, 0.9);
  F.walk(W(18, 1), 2.6, { x: 790 }); // stops at the threshold: ink on the dark doorway would vanish
  S.text("like you belong", 700, 330, { size: 96, font: "caveat", c: ORANGE, t: W(18, 5) - 0.3, dur: 1.0 });
  F.face(W(18, 1) + 2.8, "smile", 4);
}
