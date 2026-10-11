// look: v3
// Episode 02 — Height / feeling small — v3 trial (bold outline, colour scenery, dressed characters)
const CUES = [[1, 0], [3, 0], [5, 0], [6, 0], [9, 0], [10, 0], [12, 0], [13, 0], [16, 0], [17, 0], [18, 0]];
const WIN = sceneWindows(CUES);
const HERO = { hair: "short", outfit: "tee" };                        // the viewer — blue tee every scene
const PROF = { hair: "side", hairC: "#8a8a8a", outfit: "tee", outfitC: "#8a5a3c" }; // the 1968 man — grey hair, tweed

{ // 1. c1–c2: 1968, one man, five classes, a different title each time — BLUE
  const [a, b] = WIN[0];
  const S = scene(a, b);
  S.bg("room", { window: false, sky: "#e8eef7", ground: "#b98a62" });
  for (let i = 0; i < 5; i++) S.door(210 + i * 320, 470, 170, 320, W(1, 7) - 0.3 + i * 0.22, 0.5); // five classes (behind him)
  S.draw(rect(690, 70, 540, 160), 1.6, 0.8, { w: 7, fill: PAPER });
  S.text("1968", 960, 195, { size: 130, c: BLUE, t: W(1, 1) - 0.3, dur: 0.6 });
  const F = S.fig(960, GY, { s: 1.25, ...PROF }).draw(0.3, 1.2);
  F.face(1.5, "smile");
  F.setPose(W(1, 4) - 0.2, "wave"); F.setPose(W(1, 8), "stand");
  S.ring(960, 474, 92, 92, W(2, 0) - 0.25, 0.5, { c: BLUE, w: 9 });            // "Same man"
  S.draw(line([760, 392], [1160, 392], 2), W(2, 2) - 0.25, 0.5, { c: BLUE, w: 6 }); // "Same height"
  const T1 = S.tag(960, 915, "STUDENT", W(2, 6) - 0.3, 0.5, { size: 50, fill: YEL });
  S.hide(T1.g, W(2, 8) - 0.25);
  S.tag(960, 915, "PROFESSOR", W(2, 8) - 0.25, 0.4, { size: 50, fill: LEAF });
}

{ // 2. c3–c4: student guessed shorter → professor grew 5 cm — GREEN
  const [a, b] = WIN[1];
  const S = scene(a, b);
  S.bg("room", { window: [1480, 90, 280, 200] });
  S.ruler(330, GY, 560, a + 0.05, 1.2, { labels: [[0.5, "170"], [0.75, "175"], [1, "180"]] });
  const F = S.fig(700, GY, { s: 1.0, ...PROF }).draw(a + 0.3, 1.0);
  F.face(a + 1.4, "flat");
  const T1 = S.tag(700, 915, "STUDENT", W(3, 6) - 0.3, 0.5, { size: 50, fill: YEL });
  F.setPose(W(3, 8) - 0.2, "shrug");
  const TX = S.text("guessed shorter", 1300, 520, { size: 80, t: W(3, 8) - 0.3, dur: 0.8 });
  S.hide(T1.g, W(4, 6) - 0.3); S.hide(TX, W(4, 6) - 0.3);
  S.tag(700, 915, "PROFESSOR", W(4, 6) - 0.3, 0.5, { size: 50, fill: LEAF });
  F.setPose(W(4, 6) - 0.2, "hips");
  F.grow(W(4, 8) - 0.2, 0.8, 1.1);
  F.face(W(4, 8), "happy");
  S.text("+5 cm", 1300, 560, { size: 160, c: GREEN, halo: PAPER, t: W(4, 10) - 0.3, dur: 0.6 });
  S.burst(700, 400, 110, 165, 9, W(4, 11) - 0.2, 0.5, { c: GREEN, a0: Math.PI, span: Math.PI, w: 9 });
}

{ // 3. c5: height isn't only measured with a tape — RED
  const [a, b] = WIN[2];
  const S = scene(a, b);
  S.bg("flat", { sky: "#fff1c9", ground: "#f2cf7a", hy: 760 });
  let ticks = "";
  for (let i = 1; i < 24; i++) { const x = 300 + (1200 * i) / 24; ticks += `M${x} 480 L${x} ${i % 4 === 0 ? 535 : 508} `; }
  S.seq([[rect(300, 480, 1200, 120), 2, { w: 7, fill: YEL }], [ticks, 1, { w: 4 }]], a + 0.05, 0.9);
  const F = S.fig(1700, GY, { s: 1.1, ...HERO }).draw(a + 0.1, 0.9);
  F.face(a + 1.0, "flat", -6);
  S.text("measured", 900, 340, { size: 130, t: W(5, 3) - 0.3, dur: 0.6 });
  S.strike(320, 250, 1480, 640, W(5, 6) - 0.3, 0.4);
}

{ // 4. c6–c8: felt small in a room, back of every photo, checked who was taller — pull
  const [a, b] = WIN[3];
  const S = scene(a, b, { cam: "pull" });
  S.bg("room", { window: false, sky: "#dfe3ea", ground: "#9aa3b2" });
  S.draw(rrect(430, 110, 1060, 770, 24), a + 0.05, 0.9, { w: 10, fill: "#f7f2e6" }); // the photo
  const F = S.fig(970, 790, { s: 0.72, ...HERO }).draw(W(6, 3) - 0.3, 0.9);           // hero at the back
  S.crowd(4, 700, 850, 180, 0.95, W(6, 7) - 0.3, 1.4, { dress: [
    { hair: "curly", outfit: "tee", outfitC: "#e07a3f" }, { hair: "bun", outfit: "tee", outfitC: "#3aa655" },
    { hair: "messy", outfit: "hoodie", outfitC: "#8e6bd1" }, { hair: "side", hairC: "#a0522d", outfit: "tee", outfitC: "#e5383b" }], face: "smile" });
  F.face(W(7, 5) - 0.2, "sad");
  S.zoom(970, 640, 1.35, W(8, 3) - 0.4, 1.0);
  S.text("every photo", 1240, 300, { size: 58, anchor: "middle", t: W(7, 7) - 0.3, dur: 0.6 });
  S.eye(1320, 450, 1.2, W(8, 2) - 0.3, 0.6, { dx: -10 });                            // checked who was taller
  S.ruler(520, 840, 300, W(8, 5) - 0.3, 0.8);
}

{ // 5. c9: that feeling is real, not your fault — night, empty space
  const [a, b] = WIN[4];
  const S = scene(a, b);
  S.bg("night");
  const F = S.fig(960, GY, { s: 0.75, ...HERO }).draw(a + 0.05, 0.8);
  F.face(W(9, 1) + 0.2, "sad");
  F.setPose(W(9, 4) - 0.2, "cross");
  S.zoom(960, 700, 1.5, W(9, 1), 2.4);
  S.text("Not your fault.", 960, 470, { size: 120, c: "#ffffff", halo: INK, t: W(9, 6) - 0.3, dur: 0.8 });
}

{ // 6. c10–c11: Napoleon was average; people kept calling him small — RED
  const [a, b] = WIN[5];
  const S = scene(a, b);
  S.bg("room", { window: false, sky: "#f4e1e1", ground: "#9b6b5a" });
  const F = S.fig(960, GY, { s: 1.0, hair: "none", outfit: "tee", outfitC: "#2b3a67" }).draw(a + 0.05, 0.9);
  const [tx, ty] = F.top();
  S.hat(tx, ty - 10, 1.1, W(10, 1) - 0.2, 0.6, { kind: "bicorne" });
  F.face(W(10, 4) - 0.2, "determined");
  F.setPose(W(10, 7) - 0.2, "point");
  S.ruler(1250, GY, 520, W(10, 7) - 0.3, 1.0, { labels: [[0.66, "AVG"]] });
  S.draw(line([1020, ty], [1250, ty], 2), W(10, 8) + 0.1, 0.4, { w: 4 });
  S.speech(400, 300, 160, 95, 250, 470, W(11, 0) - 0.3, 0.6);
  S.text("small!", 400, 320, { size: 56, c: RED, t: W(11, 0) + 0.3, dur: 0.3 });
  S.speech(1560, 300, 160, 95, 1700, 470, W(11, 2) - 0.3, 0.6);
  S.text("small!", 1560, 320, { size: 56, c: RED, t: W(11, 2) + 0.3, dur: 0.3 });
  S.strike(260, 210, 540, 390, W(11, 5) - 0.3, 0.35);
  S.strike(1420, 210, 1700, 390, W(11, 5) + 0.05, 0.35);
}

{ // 7. c12: can't change height, can change how you carry it — outdoors, hope
  const [a, b] = WIN[6];
  const S = scene(a, b);
  S.bg("day");
  const F = S.fig(820, GY, { s: 1.15, ...HERO }).draw(a + 0.05, 0.9);
  F.slump(a, 0.02, 12);
  F.face(a + 0.9, "sad");
  S.ruler(380, GY, 400, W(12, 2) - 0.3, 0.8);
  S.padlock(410, 400, 0.8, W(12, 4) - 0.3, 0.5);                      // "height" is locked
  F.slump(W(12, 11) - 0.4, 0.5, 0);
  F.grow(W(12, 11) - 0.4, 0.6, 1.06);
  F.face(W(12, 11) - 0.2, "determined");
  F.setPose(W(12, 11) - 0.3, "hips");
  S.zoom(820, 520, 1.25, W(12, 11) - 0.2, 1.2);
  S.text("carry it", 1400, 430, { size: 130, c: GREEN, halo: PAPER, t: W(12, 11) - 0.2, dur: 0.6 });
}

{ // 8. c13–c15: checklist — GREEN
  const [a, b] = WIN[7];
  const S = scene(a, b);
  S.bg("flat", { sky: "#fff7e6", ground: "#f0d9a8", hy: 820 });
  const CL = S.checklist(140, 260, ["Stand tall", "Shoulders back", "Get strong", "Clothes that fit", "Eye contact"], a + 0.05, 1.0, { gap: 105, size: 58 });
  const F = S.fig(1060, GY, { s: 1.1, ...HERO }).draw(a + 0.1, 0.9);
  const tk = (i, t) => S.tick(CL.boxes[i][0], CL.boxes[i][1], 0.8, t, 0.25);
  tk(0, W(13, 0) + 0.3); tk(1, W(13, 2) + 0.2);
  F.setPose(W(13, 0), "hips"); F.face(W(13, 4), "determined");                                      // "Head up"
  tk(2, W(14, 1) + 0.1); S.pop(S.dumbbell(1620, 300, 1.1, W(14, 1) - 0.3, 0.6).g, W(14, 1) - 0.3, 1620, 300); F.setPose(W(14, 1) - 0.2, "armsUp");
  tk(3, W(14, 5) + 0.1); S.pop(S.shirt(1620, 560, 0.9, W(14, 3) - 0.3, 0.7, { fill: SKY }).g, W(14, 3) - 0.3, 1620, 560); F.setPose(W(14, 3), "stand");
  S.speech(1320, 330, 130, 75, 1140, 440, W(15, 0) - 0.3, 0.5);
  S.text("slowly", 1320, 350, { size: 58, c: GREEN, t: W(15, 1) - 0.2, dur: 0.4 });
  tk(4, W(15, 6)); S.pop(S.eye(1620, 790, 1.3, W(15, 6) - 0.4, 0.5).g, W(15, 6) - 0.4, 1620, 790); F.setPose(W(15, 6) - 0.4, "point");
}

{ // 9. c16: remember that professor? people see more than centimeters — ORANGE
  const [a, b] = WIN[8];
  const S = scene(a, b);
  S.bg("room", { window: [1520, 90, 260, 190] });
  const R = S.ruler(300, GY, 500, a + 0.1, 0.8, { labels: [[0.75, "175"], [1, "180"]] });
  S.burst(860, 420, 170, 250, 9, W(16, 4) - 0.2, 0.6, { c: ORANGE, a0: Math.PI, span: Math.PI, w: 10 });
  const F = S.fig(860, GY, { s: 1.3, ...PROF }).draw(a + 0.05, 0.9);
  S.tag(860, 915, "PROFESSOR", W(16, 2) - 0.3, 0.5, { size: 50, fill: LEAF });
  S.fadeOut(R.g, W(16, 3) - 0.1, 0.6);
  F.face(W(16, 5) - 0.1, "happy");
  F.setPose(W(16, 4) - 0.2, "armsUp");
  S.text("People see", 1420, 440, { size: 96, t: W(16, 5) - 0.2, dur: 0.6 });
  S.text("more.", 1420, 580, { size: 120, c: ORANGE, halo: INK, haloW: 0.1, t: W(16, 6) - 0.2, dur: 0.5 });
}

{ // 10. c17: height is a number, presence is a choice — power staging
  const [a, b] = WIN[9];
  const S = scene(a, b);
  S.bg("day", { clouds: 1 });
  const F = S.fig(380, GY, { s: 1.5, ...HERO }).draw(a + 0.05, 0.9);
  S.text("HEIGHT = a number", 1200, 300, { size: 76, c: "#5f6b7a", t: W(17, 1) - 0.3, dur: 0.8 });
  S.text("PRESENCE", 1200, 520, { size: 150, t: W(17, 6) - 0.3, dur: 0.6 });
  S.text("is a choice", 1200, 660, { size: 110, c: ORANGE, halo: INK, haloW: 0.1, t: W(17, 8) - 0.3, dur: 0.6 });
  F.face(W(17, 6), "determined");
  F.setPose(W(17, 6) - 0.2, "hips");
  S.zoom(700, 540, 1.08, W(17, 6) - 0.2, 1.5);
}

{ // 11. c18: walk into one room like you belong there — hold
  const [a, b] = WIN[10];
  const S = scene(a, b);
  S.bg("room", { window: false, sky: "#f3e2c4" });
  S.door(1380, 400, 230, 460, a + 0.05, 0.9, { open: true });
  S.fill(rect(1385, 405, 220, 450), a + 0.6, 0.6, "#fff3c4", 1);       // warm light inside the room
  S.fill(poly([[1385, 860], [1605, 860], [1500, 1000], [1000, 1000]], 0), a + 0.8, 0.6, GLOW, 0.55); // light spilling onto the floor
  const F = S.fig(480, GY, { s: 1.1, ...HERO }).draw(a + 0.1, 0.9);
  F.walk(W(18, 1), 2.6, { x: 790 });
  S.text("like you belong", 760, 330, { size: 110, c: ORANGE, halo: INK, haloW: 0.1, t: W(18, 5) - 0.3, dur: 1.0 });
  F.face(W(18, 1) + 2.8, "smile", 4);
  F.setPose(W(18, 1) + 2.9, "wave");
}
