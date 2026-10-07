// Episode 10 — Attention / phone distraction (light). Hero = the viewer.
const CUES = [[1, 0], [3, 0], [4, 0], [6, 0], [7, 0], [9, 0], [11, 0], [12, 0], [13, 0], [15, 0], [17, 0]];
const WIN = sceneWindows(CUES);
const T = (c, i, d = 0.3) => W(c, i) - d; // land the stroke just before its word
// ponytail: engine clock appends the paper-filled dial after the hand groups, hiding the hands — lift hands on top
const hands = (K) => { K.g.appendChild(K.hourG); K.g.appendChild(K.minG); return K; };
// ponytail: engine bolt is always YEL-filled; local copy so a RED scene stays single-accent
const redBolt = (S, cx, cy, s, t) => S.draw(poly([[cx + 20 * s, cy - 70 * s], [cx - 25 * s, cy + 5 * s], [cx + 8 * s, cy + 5 * s], [cx - 18 * s, cy + 75 * s], [cx + 32 * s, cy - 10 * s], [cx, cy - 10 * s], [cx + 20 * s, cy - 70 * s]], 1), t, 0.3, { w: 5, fill: RED, c: RED });
const dot = (S, cx, cy, r, t) => { const e = S.draw(circ(cx, cy, r), t, 0.12, { c: RED, fill: RED, w: 4 }); S.pop(e, t, cx, cy, 0.35); return e; };

{ // 1 c1–c2 "In 2004 … two and a half minutes. Today, it's forty-seven seconds." — hero at desk, 2:30 vs 0:47
  const [a, b] = WIN[0]; const S = scene(a, b);
  const CH = S.chair(860, GY, 0.2, 0.6); const D = S.desk(940, GY, 480, 0.3, 0.8);
  const F = S.fig(840, CH.seatY, { s: 1, sit: true, pose: "reach" }).draw(0.6, 1.1);
  S.laptop(1180, D.top, 0.9, 1.5, 0.9);
  S.text("2004", 400, 260, { size: 130, t: T(1, 1), dur: 0.5 });
  S.timer(400, 560, 130, T(1, 5), 1.0);
  S.text("2:30", 400, 585, { size: 72, t: T(1, 10, 0.25), dur: 0.5 });
  S.text("TODAY", 1620, 260, { size: 110, t: T(2, 0), dur: 0.6 });
  S.arrow(960, 150, 960, 430, W(2, 0) + 0.3, 0.6, { c: RED, w: 9, head: 34 });
  S.timer(1620, 560, 85, T(2, 2), 0.7, { c: RED });
  S.text("0:47", 1620, 582, { size: 50, c: RED, t: T(2, 3, 0.25), dur: 0.4 });
  F.face(T(1, 13), "flat", 6);
}
{ // 2 c3 "Your brain isn't broken. It's been trained." — brain, broken struck, TRAINED + dumbbell
  const [a, b] = WIN[1]; const S = scene(a, b);
  S.brain(640, 480, 1.3, T(3, 1), 1.0);
  S.text("broken", 1350, 380, { size: 110, c: GRAY, t: T(3, 3), dur: 0.5 });
  S.strike(1120, 275, 1580, 400, W(3, 3) + 0.35, 0.3, { c: INK, w: 12 });
  S.text("TRAINED", 1350, 640, { size: 150, c: ORANGE, t: T(3, 6, 0.35), dur: 0.6 });
  S.dumbbell(960, 270, 1.1, W(3, 6) + 0.1, 0.5);
}
{ // 3 c4–c5 "Every buzz, every red dot, every scroll is a tiny reward. And your mind learned to chase the next one."
  const [a, b] = WIN[2]; const S = scene(a, b);
  S.phone(420, 470, 1.8, a + 0.1, 0.8, { screen: "feed" });
  redBolt(S, 580, 330, 1.0, T(4, 1));
  dot(S, 480, 355, 16, T(4, 3)); dot(S, 395, 425, 14, T(4, 3, 0.15)); dot(S, 452, 505, 14, T(4, 4));
  S.arrow(520, 430, 520, 585, T(4, 6), 0.4, { bend: 0.25 });
  S.brain(1000, 450, 1.0, T(4, 7), 0.9);
  S.arrow(610, 470, 815, 455, T(4, 9), 0.5, { c: RED, w: 8, bend: 0.2 });
  const HW = S.hamsterWheel(1500, 560, 170, T(5, 0, 0.2), 1.0);
  S.arrow(1190, 450, 1330, 520, T(5, 3), 0.5, { c: RED, w: 8, bend: 0.15 });
  const F = S.fig(1500, 696, { s: 0.6, parent: HW.g }).draw(T(5, 2), 0.6);
  HW.spin(T(5, 5), 1.6, 1.5);
  F.face(W(5, 7), "worried", 4);
}
{ // 4 c6 "If you can't finish a page, a task, or even a thought, this is for you." — small hero, pull
  const [a, b] = WIN[3]; const S = scene(a, b, { cam: "pull" });
  const F = S.fig(400, GY, { s: 0.75 }).draw(a + 0.1, 1.0);
  S.book(900, 300, 0.7, T(6, 5), 0.6);
  const CL = S.checklist(1250, 270, ["Read", "Reply", "Call"], T(6, 7), 0.5, { size: 44 });
  S.tick(CL.boxes[0][0], CL.boxes[0][1], 0.6, W(6, 7) + 0.3, 0.15, { c: GRAY });
  S.draw(line([CL.boxes[1][0] - 12, CL.boxes[1][1] + 2], [CL.boxes[1][0] - 2, CL.boxes[1][1] + 12], 1), W(6, 7) + 0.45, 0.12, { c: GRAY, w: 9 });
  const TH = S.grp();
  S.thought(760, 560, 150, 95, 450, 600, T(6, 11), 0.5, { parent: TH });
  S.text("…", 760, 590, { size: 90, c: GRAY, t: W(6, 11), dur: 0.3, parent: TH });
  S.fadeOut(TH, W(6, 11) + 0.45, 0.5);
  F.face(T(6, 12, 0.1), "worried", 6);
}
{ // 5 c7–c8 "Every time you switch, you pay a price. It can take over twenty minutes…" — tabs, PRICE, clock
  const [a, b] = WIN[4]; const S = scene(a, b);
  const F = S.fig(630, GY, { s: 0.8 }).draw(a + 0.1, 0.9);
  const tab = (x, t) => S.seq([[rrect(x, 160, 360, 240, 16), 2, { w: 7, fill: PAPER }], [line([x + 40, 230], [x + 300, 230], 1) + line([x + 40, 290], [x + 240, 290], 1) + line([x + 40, 350], [x + 270, 350], 1), 1, { w: 4 }]], t, 0.5);
  tab(160, T(7, 0)); tab(740, T(7, 1));
  S.arrow(530, 260, 730, 260, T(7, 3), 0.4, { bend: -0.25, w: 8 });
  S.arrow(730, 320, 530, 320, W(7, 3) + 0.2, 0.4, { bend: -0.25, w: 8 });
  S.tag(630, 540, "PRICE", T(7, 7), 0.5, { size: 56, tc: RED });
  F.face(W(7, 7) + 0.2, "worried", 4);
  const K = hands(S.clock(1450, 450, 160, T(8, 2), 0.9, { h: 10, m: 10 }));
  K.spin(W(8, 4), 1.8, 2);
  S.text("20+ MIN", 1450, 820, { size: 160, c: RED, t: T(8, 4, 0.25), dur: 0.7 });
}
{ // 6 c9–c10 "So here's how to take it back. One. Phone in another room for one hour."
  const [a, b] = WIN[5]; const S = scene(a, b);
  const CH = S.chair(1150, GY, a + 0.1, 0.5); const D = S.desk(1190, GY, 440, a + 0.2, 0.6);
  const F = S.fig(1130, CH.seatY, { s: 1, sit: true, pose: "reach" }).draw(T(9, 1), 0.9);
  S.laptop(1420, D.top, 0.9, T(9, 4), 0.6);
  F.face(W(9, 6), "determined", 6);
  S.text("1. ANOTHER ROOM", 960, 170, { size: 100, c: GREEN, t: T(10, 0), dur: 0.9 });
  S.door(300, 380, 200, 480, T(10, 2), 0.6);
  const D2 = S.desk(60, GY, 200, T(10, 3, 0.2), 0.4);
  S.phone(160, D2.top - 42, 0.6, W(10, 3) + 0.2, 0.4, { screen: "blank" });
  S.timer(1700, 420, 100, T(10, 5, 0.5), 0.6, { label: "60:00", fillAt: W(10, 6) - 0.3, fillDur: 0.7 });
}
{ // 7 c11 "Two. Turn off every notification that isn't a person." — phone, five dots crossed, mom stays
  const [a, b] = WIN[6]; const S = scene(a, b);
  S.text("2. SILENCE THE DOTS", 960, 170, { size: 100, c: GREEN, t: a + 0.1, dur: 0.9 });
  const F = S.fig(1650, GY, { s: 1, pose: "pointL" }).draw(a + 0.1, 0.8);
  S.phone(700, 560, 2.2, T(11, 1, 0.4), 0.6, { screen: "feed" });
  const P = [[640, 445], [760, 445], [640, 535], [760, 535], [700, 625]];
  P.forEach(([x, y], i) => dot(S, x, y, 17, W(11, 1) + 0.1 + i * 0.15));
  P.forEach(([x, y], i) => S.cross(x, y, 0.55, T(11, 4, 0.1) + i * 0.16, 0.2, { c: GRAY, w: 9 }));
  S.tag(1230, 560, "mom", T(11, 8, 0.4), 0.5, { size: 64 });
  S.tick(1400, 560, 1.1, W(11, 8), 0.25);
  F.face(W(11, 8), "smile", -6);
}
{ // 8 c12 "Three. One task. Twenty-five minutes. Nothing else." — one notebook, 25:00 fills, nothing else
  const [a, b] = WIN[7]; const S = scene(a, b);
  S.text("3. ONE TASK", 960, 170, { size: 100, c: GREEN, t: a + 0.1, dur: 0.8 });
  S.notebook(760, 330, 400, 420, T(12, 1), 0.8);
  S.pencil(1000, 560, 200, -60, T(12, 2, 0.1), 0.4);
  S.timer(1450, 540, 120, T(12, 3, 0.5), 0.6, { label: "25:00", fillAt: W(12, 3), fillDur: 2.5 });
}
{ // 9 c13–c14 "At first, it will feel boring. Stay there. Boredom is where your best ideas have been waiting."
  const [a, b] = WIN[8]; const S = scene(a, b);
  const CH = S.chair(900, GY, a + 0.1, 0.5);
  const F = S.fig(880, CH.seatY, { s: 1, sit: true }).draw(a + 0.4, 1.0);
  F.face(T(13, 4, 0.1), "flat", 4);
  S.text("boring…", 1350, 500, { size: 90, c: GRAY, t: T(13, 5), dur: 0.5 });
  S.text("stay there", 1350, 650, { size: 84, font: "caveat", t: T(13, 6), dur: 0.7 });
  S.bulb(880, 380, 1.2, T(14, 0, 0.2), 0.7);
  S.burst(880, 372, 150, 210, 12, T(14, 5), 0.4, { c: YEL });
  F.face(W(14, 5), "happy", 4);
  S.underline(1140, 1560, 676, T(14, 8), 0.35, { c: YEL, w: 10 });
}
{ // 10 c15–c16 "Your attention is the most valuable thing you own. Stop giving it away for free." — trophy held
  const [a, b] = WIN[9]; const S = scene(a, b);
  const F = S.fig(520, GY, { s: 1.2, pose: "hold" }).draw(a + 0.1, 0.9);
  S.tag(1150, 330, "ATTENTION", T(15, 1), 0.7, { size: 80 });
  S.trophy(520, 745, 0.95, T(15, 5), 0.9);
  F.face(T(16, 0), "determined", 6);
  S.tag(1150, 600, "FREE", T(16, 4), 0.5, { size: 90, tc: RED });
  S.strike(1010, 525, 1290, 675, W(16, 5) + 0.1, 0.3);
}
{ // 11 c17 "Put your phone in another room for one hour today." — door left, hero focused right, ONE HOUR. hold
  const [a, b] = WIN[10]; const S = scene(a, b);
  const CH = S.chair(1150, GY, a + 0.1, 0.4); const D = S.desk(1190, GY, 440, a + 0.1, 0.5);
  const F = S.fig(1130, CH.seatY, { s: 1, sit: true, pose: "reach" }).draw(a + 0.3, 0.8);
  S.laptop(1420, D.top, 0.9, a + 0.9, 0.5);
  S.door(300, 400, 190, 460, T(17, 3), 0.5);
  const D2 = S.desk(60, GY, 210, T(17, 4, 0.25), 0.4);
  S.phone(165, D2.top - 42, 0.6, W(17, 4) + 0.15, 0.4, { screen: "blank" });
  S.timer(1720, 430, 95, T(17, 6, 0.35), 0.6, { label: "60:00", fillAt: W(17, 7), fillDur: 1.2 });
  S.text("ONE HOUR.", 960, 250, { size: 200, c: GREEN, t: T(17, 7, 0.25), dur: 0.9 });
  F.face(T(17, 9), "determined", 6);
}
