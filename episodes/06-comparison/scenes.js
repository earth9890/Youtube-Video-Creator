// Episode 06 — Comparison / social media (light theme). Hero = the viewer.
const CUES = [[1, 0], [3, 0], [4, 0], [6, 0], [8, 0], [9, 0], [11, 0], [12, 0], [13, 0], [14, 0], [16, 0]];
const WIN = sceneWindows(CUES);

{ // S1 c1–c2: study — 30 min a day → 3 weeks → less lonely. GREEN
  const [a, b] = WIN[0];
  const S = scene(a, b, { cam: "push" });
  S.draw(line([300, GY], [820, GY], 2), 0.1, 0.5, { w: 6 });
  const F = S.fig(560, GY, { s: 1.0, pose: "hold" }).draw(0.3, 1.1);
  const [hx, hy] = F.hand("R");
  S.phone(hx + 10, hy - 20, 0.9, 1.5, 0.7, { screen: "feed" });
  F.face(2.3, "flat", 6);
  S.timer(1500, 300, 120, W(1, 8) - 0.3, 0.9, { label: "30:00" });                       // "thirty minutes"
  const C = S.calendar(1180, 480, 7, 3, 90, 70, W(2, 0) - 0.3, 0.9);                      // "Three weeks"
  C.cells.forEach((c, i) => S.tick(c[0], c[1], 0.7, W(2, 1) + i * 0.1));                   // ticks fill over "weeks later, they felt"
  F.face(W(2, 5) - 0.1, "smile", 6);                                                       // "less lonely"
  S.text("less lonely", 900, 420, { size: 84, font: "caveat", c: GREEN, t: W(2, 6) - 0.3, dur: 0.7 });
  S.text("less depressed", 900, 520, { size: 84, font: "caveat", c: GREEN, t: W(2, 9) - 0.3, dur: 0.8 });
}

{ // S2 c3: closing the app feeling smaller. GRAY, pull-out, empty space
  const [a, b] = WIN[1];
  const S = scene(a, b, { cam: "pull" });
  const F = S.fig(700, GY, { s: 1.0, pose: "hold" }).draw(a + 0.1, 0.9);
  const [hx, hy] = F.hand("R");
  S.phone(hx + 10, hy - 20, 0.9, a + 1.0, 0.5, { screen: "feed", parent: F.gi });
  F.grow(W(3, 7) - 0.3, 0.8, 0.72);                                                        // "smaller"
  F.face(W(3, 7) + 0.3, "sad", 6);
  S.text("this is for you", 1250, 500, { size: 84, font: "caveat", c: GRAY, t: W(3, 13) - 0.2, dur: 0.8 });
}

{ // S3 c4–c5: behind-the-scenes desk vs glowing highlight-reel phone. RED
  const [a, b] = WIN[2];
  const S = scene(a, b, { cam: "push" });
  const CH = S.chair(260, GY, a + 0.1, 0.6);
  const D = S.desk(300, GY, 460, a + 0.3, 0.8);
  const F = S.fig(240, CH.seatY, { s: 0.85, sit: true, pose: "reach" }).draw(a + 0.9, 0.9);
  S.laptop(470, D.top, 0.8, W(4, 2) - 0.2, 0.8);                                           // "happening"
  S.coffee(730, D.top, 0.75, W(5, 0) - 0.2, 0.5);                                          // "You're"
  S.notebook(590, D.top - 100, 90, 100, W(5, 1) - 0.2, 0.5);                               // "comparing"
  S.text("BEHIND THE SCENES", 480, 440, { size: 60, c: GRAY, t: W(5, 3) - 0.3, dur: 0.8 });
  S.phone(1300, 520, 2.2, W(5, 5) - 0.3, 0.9, { screen: "heart", glow: true });            // "everyone else's"
  S.trophy(1680, 700, 0.9, W(5, 7) - 0.3, 0.8);                                            // "highlight"
  S.text("HIGHLIGHT REEL", 1400, 240, { size: 60, c: RED, t: W(5, 7) + 0.2, dur: 0.6 });
}

{ // S4 c6–c7: three phones — vacation / promotion / morning → doubt / debt / delete. GRAY
  const [a, b] = WIN[3];
  const S = scene(a, b, { cam: "push" });
  const X = [560, 960, 1360], PY = 430, TY = 640;
  const words = ["vacation", "promotion", "morning"], hidden = ["doubt", "debt", "delete"];
  const phoneT = [W(6, 0), W(6, 2), W(6, 4)], tagT = [W(6, 1), W(6, 3), W(6, 6)];
  const tags = X.map((x, i) => {
    S.phone(x, PY, 1.6, phoneT[i] - 0.3, 0.6, { screen: "heart" });
    return S.tag(x, TY, words[i], tagT[i] - 0.2, 0.5, { size: 44 });
  });
  S.text("YOU NEVER SEE", 960, 200, { size: 72, c: GRAY, t: W(7, 0) - 0.3, dur: 0.7 });
  const hidT = [W(7, 4), W(7, 6), W(7, 9)];
  X.forEach((x, i) => {
    S.hide(tags[i].g, hidT[i] - 0.3);
    S.cross(x, PY, 1.3, hidT[i] - 0.3, 0.3, { c: GRAY });
    S.tag(x, TY, hidden[i], hidT[i] - 0.25, 0.4, { size: 44, c: GRAY, tc: GRAY });
  });
}

{ // S5 c8: the people furthest ahead crush you. RED
  const [a, b] = WIN[4];
  const S = scene(a, b, { cam: "push" });
  const ST = S.stairs(300, GY, 7, 200, 95, a + 0.1, 1.2);
  const F = S.fig(180, GY, { s: 0.7 }).draw(a + 0.2, 0.8);
  S.fig(ST.tops[6][0], ST.tops[6][1], { s: 0.7, pose: "hips" }).draw(W(8, 3) - 0.3, 0.7);    // "furthest"
  S.arrow(300, 600, 1500, 180, W(8, 4) - 0.3, 1.0, { c: RED, w: 8 });                       // "ahead"
  F.slump(W(8, 11) - 0.25, 0.4, 15);                                                         // "crush"
  F.face(W(8, 11) - 0.15, "sad");
  S.text("CRUSH", 760, 300, { size: 130, c: RED, t: W(8, 11) - 0.3, dur: 0.5 });
}

{ // S6 c9–c10: the fix — 1. thirty minute limit. GREEN
  const [a, b] = WIN[5];
  const S = scene(a, b, { cam: "push" });
  S.phone(760, 560, 2.0, a + 0.2, 0.8, { screen: "feed" });
  S.padlock(930, 600, 1.1, W(9, 3) - 0.3, 0.6);                                              // "fix"
  S.text("1. THIRTY MINUTES", 960, 200, { size: 90, t: W(10, 0) - 0.25, dur: 0.9 });        // "One."
  S.timer(1300, 560, 150, W(10, 3) - 0.3, 0.8, { label: "30:00", fillAt: W(10, 4), fillDur: 1.0 });  // "thirty"
  S.text("Today.", 1300, 840, { size: 96, font: "caveat", c: GREEN, t: W(10, 6) - 0.4, dur: 0.55 });
}

{ // S7 c11: 2. unfollow five. RED
  const [a, b] = WIN[6];
  const S = scene(a, b, { cam: "push" });
  S.text("2. UNFOLLOW FIVE", 960, 200, { size: 90, t: W(11, 0) - 0.3, dur: 0.9 });
  const X = [460, 710, 960, 1210, 1460];
  X.forEach((x, i) => S.phone(x, 560, 1.3, W(11, 1) - 0.4 + i * 0.12, 0.5, { screen: "feed" }));   // "Unfollow"
  const c0 = W(11, 3) - 0.2, step = (W(11, 8) - c0) / 5;                                     // crosses across "accounts … small"
  X.forEach((x, i) => S.cross(x, 560, 1.5, c0 + i * step, 0.3));
}

{ // S8 c12: 3. follow one a few steps ahead. GREEN
  const [a, b] = WIN[7];
  const S = scene(a, b, { cam: "push" });
  S.text("3. FOLLOW ONE", 960, 200, { size: 90, t: W(12, 0) - 0.3, dur: 0.8 });
  const ST = S.stairs(560, GY, 4, 220, 90, a + 0.1, 0.9);
  const F = S.fig(ST.tops[0][0], ST.tops[0][1], { s: 0.85 }).draw(W(12, 1) - 0.3, 0.8);     // "Follow"
  const P = S.fig(ST.tops[2][0], ST.tops[2][1], { s: 0.8, pose: "wave" }).draw(W(12, 3) - 0.3, 0.8);  // "person"
  P.face(W(12, 3) + 0.6, "smile", -4);
  S.arrow(740, 540, 1030, 470, W(12, 8) - 0.3, 0.6, { c: GREEN, w: 8 });                   // "steps"
  S.tick(ST.tops[2][0] - 20, 320, 1.6, W(12, 9) - 0.2, 0.3);                                     // "ahead"
  F.face(W(12, 9) + 0.2, "smile", 6);
}

{ // S9 c13: yesterday-you vs today-you. GREEN
  const [a, b] = WIN[8];
  const S = scene(a, b, { cam: "push" });
  const Y = S.fig(700, GY, { s: 0.95, c: GRAY }).draw(a + 0.2, 0.9);
  Y.face(a + 1.2, "flat", 6);
  const T = S.fig(1220, GY, { s: 1.05 }).draw(W(13, 2) - 0.3, 0.9);                        // "yourself"
  T.face(W(13, 2) + 0.8, "smile", -4);
  S.arrow(800, 640, 1140, 640, W(13, 4) - 0.3, 0.6, { c: GREEN, w: 8 });                   // "one"
  S.tag(1220, 470, "today", W(13, 6) - 0.2, 0.5, { size: 44 });                             // "only"
  S.tag(700, 500, "yesterday", W(13, 10) - 0.3, 0.5, { size: 44, c: GRAY, tc: GRAY });    // "yesterday"
}

{ // S10 c14–c15: a different page of a different book → run your own race. ORANGE
  const [a, b] = WIN[9];
  const S = scene(a, b, { cam: "push" });
  const G1 = S.grp();
  S.book(960, 480, 1.1, a + 0.1, 1.0, { parent: G1 });
  S.text("NOT BEHIND", 960, 200, { size: 100, t: W(14, 1) - 0.3, dur: 0.7, parent: G1 });        // "not behind"
  S.text("your page", 960, 350, { size: 72, font: "caveat", c: ORANGE, t: W(14, 7) - 0.3, dur: 0.6, parent: G1 });  // "page"
  S.fadeOut(G1, W(15, 0) - 0.5, 0.3);
  S.draw(line([100, GY], [1820, GY], 2), W(15, 0) - 0.5, 0.4, { w: 6 });
  const F = S.fig(300, GY, { s: 0.8 }).draw(W(15, 0) - 0.6, 0.6);
  [700, 740, 780].forEach((y, i) => S.draw(line([150 - i * 10, y], [230, y], 1), W(15, 0) + 0.2, 0.3, { c: ORANGE, w: 5, parent: F.g }));
  F.walk(W(15, 0), 1.6, { x: 1150 });                                                       // "Run"
  S.text("Run your own race.", 960, 420, { size: 110, font: "caveat", c: ORANGE, t: W(15, 0) - 0.2, dur: 1.2 });
}

{ // S11 c16: go unfollow the first account. RED, hold on the final frame
  const [a, b] = WIN[10];
  const S = scene(a, b, { cam: "push", focus: "1000 540" });
  S.phone(1300, 480, 2.4, a + 0.1, 0.8, { screen: "feed" });
  const F = S.fig(420, GY, { s: 1.3, pose: "point" }).draw(a + 0.2, 0.9);
  F.face(W(16, 0), "determined", 8);                                                          // "Now"
  S.cross(1300, 480, 2.2, W(16, 2) - 0.2, 0.4);                                              // "unfollow"
  S.text("UNFOLLOW.", 1130, 240, { size: 200, c: RED, t: W(16, 4) - 0.3, dur: 0.8 });       // "first"
}
