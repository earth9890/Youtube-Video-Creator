// theme: dark
// Episode 03 — The 2 AM habit. Hero = the viewer. Night-time chalkboard look.
const CUES = [[1, 0], [3, 0], [5, 0], [7, 0], [9, 0], [10, 0], [13, 0], [15, 0], [16, 0], [18, 0]];
const WIN = sceneWindows(CUES);
const LIE_GY = 745; // body line of a figure lying on a bed whose floor is GY (mattress top 750)

// hero lying in bed, head on the pillow (left), feet right. gi is rotated -88° around (cx, gy).
const lieFig = (S, cx, gy, s, opts = {}) => {
  const F = S.fig(cx, gy, Object.assign({ s }, opts));
  F.lie(S.start, 0.01, -88);
  return F;
};

{ // S1 [c1–c2] 2 AM, promise, screen lights up, hour disappears
  const [a, b] = WIN[0];
  const S = scene(a, b, { cam: "push" });
  S.moon(260, 200, 70, 0, 0.8);
  S.stars(7, 120, 90, 720, 380, 0.3, 1.0);
  S.bed(700, GY, 520, 0.4, 1.0, { blanket: false });
  // arms raised in front of the chest -> after rotation they point up, holding the phone over the face
  const F = lieFig(S, 1030, LIE_GY, 0.75, { armL: [[30, 20], [70, -25]], armR: [[36, 24], [76, -20]] });
  F.draw(1.3, 1.2);
  const C1 = S.digital(1560, 230, "2:00 AM", 1.4, W(1, 1) - 0.3, 0.9);
  S.text("never again", 960, 540, { size: 100, font: "caveat", c: YEL, t: W(1, 6) - 0.3, dur: 1.0 });
  S.phone(825, 645, 0.7, W(2, 3) - 0.3, 0.8, { screen: "blank", glow: true });
  F.face(W(2, 4), "flat");
  S.hide(C1.g, W(2, 8) - 0.3);
  S.digital(1560, 230, "3:00 AM", 1.4, W(2, 8) - 0.3, 0.9);
}

{ // S2 [c3–c4] 11% — not alone, not broken. RED then GREEN
  const [a, b] = WIN[1];
  const S = scene(a, b, { cam: "push" });
  const figs = S.crowd(9, 320, GY, 160, 0.7, a, 2.2, { hi: [4], hiC: RED });
  const H = figs[4];
  const T11 = S.text("11%", 960, 420, { size: 170, t: W(3, 4) - 0.3, dur: 0.8 });
  const [hx, hy] = H.hand("R");
  const P = S.phone(hx + 10, hy - 18, 0.55, W(3, 8) - 0.2, 0.6, { screen: "blank" });
  const R = S.ring(975, 745, 100, 150, W(3, 12) - 0.2, 0.6, { c: RED });
  H.face(W(3, 13) - 0.1, "worried");
  // c4: validate -> normalise
  S.fadeOut(T11, W(4, 0) - 0.1, 0.5);
  S.fadeOut(R.g, W(4, 0) - 0.1, 0.5);
  S.fadeOut(P.g, W(4, 0) - 0.1, 0.5);
  H.face(W(4, 4), "flat");
  S.text("not broken.", 960, 400, { size: 120, font: "caveat", c: GREEN, t: W(4, 9) - 0.3, dur: 1.0 });
  H.face(W(4, 11) - 0.1, "smile");
}

{ // S3 [c5–c6] not desire — escape. RED
  const [a, b] = WIN[2];
  const S = scene(a, b, { cam: "push" });
  const F = S.fig(900, GY, { s: 0.7 }).draw(a, 1.0);
  S.heart(560, 400, 3.5, W(5, 2) - 0.2, 0.9);
  S.text("DESIRE", 560, 600, { size: 60, t: W(6, 3) - 0.2, dur: 0.6 });
  S.strike(420, 270, 700, 630, W(6, 4) - 0.1, 0.4);
  S.door(1380, 480, 200, 380, W(6, 5) - 0.2, 1.0, { open: true, sign: "ESCAPE" });
  F.walk(W(6, 7) - 0.5, 0.8, { x: 380 });
}

{ // S4 [c7–c8] Stressed / Lonely / Tired -> brain -> phone. ORANGE
  const [a, b] = WIN[3];
  const S = scene(a, b, { cam: "push" });
  const F = S.fig(960, GY, { s: 0.8 }).draw(a, 0.9);
  const tags = ["Stressed", "Lonely", "Tired"], ty = [300, 400, 500];
  tags.forEach((t, i) => S.tag(330, ty[i], t, W(7, i) - 0.25, 0.6, { size: 44 }));
  F.face(W(7, 2) + 0.1, "worried");
  S.brain(960, 400, 0.85, W(8, 1) - 0.2, 1.0);
  [[480, 300, 800, 370], [480, 400, 800, 400], [480, 500, 800, 430]].forEach((p, i) => S.arrow(p[0], p[1], p[2], p[3], W(8, 2) + 0.1 + i * 0.15, 0.5, { c: ORANGE }));
  S.arrow(1120, 400, 1330, 400, W(8, 7) - 0.35, 0.4, { c: ORANGE });
  S.phone(1500, 400, 1.5, W(8, 7) - 0.25, 0.7, { screen: "blank", glow: true });
}

{ // S5 [c9] shame feeds the cycle. RED, pull (vulnerable)
  const [a, b] = WIN[4];
  const S = scene(a, b, { cam: "pull" });
  const F = S.fig(420, GY, { s: 0.65, pose: "sad" }).draw(a, 0.9);
  F.face(W(9, 2), "sad");
  const CY = S.cycle(1150, 480, 200, ["Urge", "Screen", "Shame"], W(9, 3), 2.0, { c: RED, labelOut: 70, size: 52 });
  CY.spin(W(9, 9) - 0.3, 1.2, 1);
}

{ // S6 [c10–c12] urge is a wave; ride it; 30 min. BLUE
  const [a, b] = WIN[5];
  const S = scene(a, b, { cam: "push" });
  const F = S.fig(260, 760, { s: 0.7 }).draw(a + 0.1, 1.0);
  const T = S.text("this changes everything", 1150, 420, { size: 88, font: "caveat", c: BLUE, t: W(10, 4) - 0.3, dur: 1.0 });
  S.fadeOut(T, W(11, 4) - 0.6, 0.4);
  S.wave(260, 760, 1400, 420, W(11, 4) - 0.3, 1.0);
  // ride the hump: control points of the wave, times spread over "rises … peaks … passes"
  const pts = [[540, 697], [820, 445], [960, 340], [1128, 424], [1380, 676], [1660, 760]];
  const ts = [W(11, 6) - 0.1, 50.6, 51.1, 51.45, 51.85, 52.45, 53.0];
  pts.forEach((p, i) => F.walk(ts[i], ts[i + 1] - ts[i], { x: p[0] - 260, y: p[1] - 760 }));
  const CK = S.clock(380, 330, 120, W(12, 2) - 0.3, 0.9, { h: 2, m: 0 });
  CK.spin(W(12, 4) - 0.3, 1.0, 0.5);
  S.text("30 min", 380, 530, { size: 56, c: BLUE, t: W(12, 4) - 0.1, dur: 0.5 });
  F.face(W(12, 7), "smile");
}

{ // S7 [c13–c14] phone outside the bedroom; stand up, walk out, text a friend. GREEN
  const [a, b] = WIN[6];
  const S = scene(a, b, { cam: "push" });
  S.bed(1220, GY, 480, a, 0.8, { blanket: false });
  const F = lieFig(S, 1550, LIE_GY, 0.75);
  F.draw(a + 0.2, 1.0);
  S.desk(140, GY, 300, W(13, 1) - 0.2, 0.7);
  const P1 = S.phone(290, 579, 0.9, W(13, 3) - 0.2, 0.6, { screen: "blank" });
  S.door(820, 480, 180, 380, W(13, 4) - 0.2, 0.9, { open: true });
  F.face(W(14, 2), "worried");
  F.rise(W(14, 4) - 0.2, 0.6);
  F.walk(W(14, 5) - 0.1, 0.35, { x: -130, y: GY - LIE_GY });
  F.walk(W(14, 6) - 0.1, 1.3, { x: -960, y: GY - LIE_GY });
  F.setPose(W(14, 8) + 0.3, "reachL");
  S.hide(P1.g, W(14, 8) + 0.1);
  S.phone(290, 579, 0.9, W(14, 8) + 0.1, 0.5, { screen: "chat" });
  S.text("hey, you up?", 290, 480, { size: 46, font: "caveat", c: GREEN, t: W(14, 10) - 0.2, dur: 0.6 });
}

{ // S8 [c15] never miss twice. GREEN (one red slip)
  const [a, b] = WIN[7];
  const S = scene(a, b, { cam: "push" });
  const F = S.fig(1500, GY, { s: 0.8 }).draw(a, 0.8);
  const C = S.calendar(505, 180, 7, 2, 130, 110, a + 0.05, 0.8, { title: "THIS WEEK" });
  C.cells.slice(0, 5).forEach((c, i) => S.tick(c[0], c[1], 0.9, a + 0.75 + i * 0.1));
  S.cross(C.cells[5][0], C.cells[5][1], 0.8, W(15, 2) + 0.1, 0.3);
  F.face(W(15, 3), "worried");
  C.cells.slice(6, 11).forEach((c, i) => S.tick(c[0], c[1], 0.9, W(15, 5) + i * 0.12));
  S.text("never miss twice", 960, 640, { size: 100, font: "caveat", c: GREEN, t: W(15, 6) - 0.25, dur: 1.0 });
  F.face(W(15, 7), "determined");
}

{ // S9 [c16–c17] asleep -> sunrise -> becoming someone. YEL/GLOW
  const [a, b] = WIN[8];
  const S = scene(a, b, { cam: "push" });
  const M = S.moon(300, 220, 70, a, 0.7);
  const ST = S.stars(6, 120, 90, 720, 380, a + 0.2, 0.9);
  S.bed(640, GY, 520, a + 0.1, 0.8, { blanket: false });
  const F = lieFig(S, 970, LIE_GY, 0.75);
  F.draw(a + 0.5, 1.0);
  F.face(W(16, 4) - 0.1, "sleep");
  const Z = S.zzz(760, 620, W(16, 4), 0.9);
  const T1 = S.text("your life back", 1500, 400, { size: 90, font: "caveat", c: YEL, t: W(16, 10) - 0.2, dur: 0.9 });
  // c17: night fades, sun rises, hero stands tall
  [M.g, ST.g, T1, Z.g].forEach((e) => S.fadeOut(e, W(17, 0), 0.6));
  const SUN = S.sun(300, 260, 80, W(17, 0) + 0.2, 1.0);
  S.move(SUN.g, W(17, 0), 0.01, { y: 170 });
  S.move(SUN.g, W(17, 0) + 0.2, 1.4, { y: 0 });
  F.rise(W(17, 4) - 0.4, 0.5);
  F.grow(W(17, 4) + 0.1, 0.6, 1.6);
  F.face(W(17, 5), "smile");
  S.text("becoming someone", 1480, 520, { size: 90, font: "caveat", c: YEL, t: W(17, 5) - 0.2, dur: 1.0 });
}

{ // S10 [c18] Tonight. phone behind a closed door, hero asleep. GLOW — hold
  const [a, b] = WIN[9];
  const S = scene(a, b, { cam: "push" });
  S.bed(1100, GY, 520, a, 0.7, { blanket: false });
  const F = lieFig(S, 1430, LIE_GY, 0.75);
  F.draw(a + 0.15, 0.9);
  S.text("Tonight.", 1100, 330, { size: 200, c: GLOW, t: W(18, 0) - 0.2, dur: 0.9 });
  S.desk(100, GY, 300, W(18, 3) - 0.5, 0.5);
  S.phone(250, 579, 0.9, W(18, 3) - 0.2, 0.5, { screen: "blank" });
  S.door(560, 480, 180, 380, W(18, 5) - 0.2, 0.8);
  F.face(W(18, 6) + 0.3, "sleep");
  S.zzz(1240, 640, W(18, 6) + 0.4, 1.0);
}
