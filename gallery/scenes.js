// props gallery — visual verification of every engine2 prop and figure pose
const label = (S, str) => S.text(str, 960, 60, { size: 38, t: S.start, dur: 0.4, c: GRAY });
{ // S1 0–4 phones, laptop, bed, clocks
  const S = scene(0, 4, { cam: "none" }); label(S, "S1 phone x4 (play/chat/feed/heart+glow) · laptop · bed · clock bells · digital");
  S.phone(220, 300, 1.3, 0.2, 1.2, { screen: "play" }); S.phone(420, 300, 1.3, 0.3, 1.2, { screen: "chat" });
  S.phone(620, 300, 1.3, 0.4, 1.2, { screen: "feed" }); S.phone(820, 300, 1.3, 0.5, 1.4, { screen: "heart", glow: true });
  S.laptop(1250, 400, 1, 0.3, 1.3); S.bed(1420, 900, 430, 0.5, 1.4);
  S.clock(300, 720, 120, 0.4, 1.5, { h: 2, m: 0, bells: true }); S.digital(760, 720, "2:00 AM", 1, 0.6, 1.2);
  S.clock(1150, 760, 90, 0.8, 1.2, { h: 7, m: 30 });
}
{ // S2 4–8 calendar+ticks, cross, strike, clouds, rain, sun, moon, stars, heart, brain
  const S = scene(4, 8, { cam: "none" }); label(S, "S2 calendar+ticks · cross · strike · cloud · storm · rain · sun · moon · stars · heart · brain");
  const C = S.calendar(110, 120, 5, 4, 110, 80, 4.2, 1.5, { title: "OCTOBER" });
  C.cells.slice(0, 9).forEach((c, i) => S.tick(c[0], c[1], 0.9, 5.8 + i * 0.1));
  S.cross(850, 250, 1, 4.6); S.strike(950, 160, 1150, 340, 4.9, 0.4);
  S.cloud(1400, 220, 1, 4.3, 1); S.cloud(1710, 220, 0.85, 4.6, 1, { storm: true }); S.rain(1400, 330, 230, 8, 5.3, 1);
  S.sun(300, 750, 70, 4.4, 1.2); S.moon(600, 740, 70, 4.6, 1.2); S.stars(8, 700, 620, 1000, 860, 4.8, 1.2);
  S.heart(1150, 770, 1.4, 5.0, 0.9); S.brain(1550, 760, 0.95, 5.2, 1.6);
}
{ // S3 8–12 bulb, doors, ruler, spotlight+fig, eye, notebook, pencil, chain, wave
  const S = scene(8, 12, { cam: "none" }); label(S, "S3 bulb · door sign · door open · ruler · spotlight · eye · notebook · pencil · chain broken · wave");
  S.bulb(200, 260, 1.2, 8.2, 1.2); S.door(380, 120, 170, 340, 8.3, 1.2, { sign: "EXIT" }); S.door(640, 120, 170, 340, 8.5, 1.2, { open: true });
  S.ruler(950, 560, 420, 8.3, 1.4, { labels: [[0.5, "160"], [0.75, "170"], [1, "180"]] });
  S.spotlight(1500, 80, 560, 230, 8.4, 1.3); S.fig(1500, 560, { s: 0.75 }).draw(8.9, 0.9).face(9.9, "wow");
  S.eye(250, 760, 1.5, 8.6, 0.8, { dx: 12 }); S.notebook(420, 620, 260, 260, 8.7, 1.2); S.pencil(760, 870, 220, -62, 8.9, 0.8);
  S.chain(950, 780, 1350, 780, 6, 9.0, 1.2, { broken: true }); S.wave(1420, 880, 420, 190, 9.2, 1.2);
}
{ // S4 12–16 cycle, arrows, thought/speech, stairs+fig, mountain
  const S = scene(12, 16, { cam: "none" }); label(S, "S4 cycle · arrow bend · arrow · thought · speech · stairs+fig on top[2] · mountain");
  S.cycle(300, 330, 170, ["Stress", "Scroll", "Guilt"], 12.2, 2.4, { labelOut: 70 });
  S.arrow(600, 200, 900, 400, 12.4, 0.8, { bend: 0.3, c: RED }); S.arrow(600, 450, 900, 250, 13.2, 0.8);
  S.thought(1200, 250, 180, 110, 1050, 460, 12.3, 1.2); S.text("what if…", 1200, 268, { size: 56, t: 13.4, dur: 0.6 });
  S.speech(1620, 250, 170, 105, 1500, 460, 12.5, 1.2); S.text("hey!", 1620, 268, { size: 56, t: 13.6, dur: 0.4, c: BLUE });
  const ST = S.stairs(100, 900, 6, 150, 62, 12.3, 1.5); S.fig(ST.tops[2][0], ST.tops[2][1], { s: 0.7 }).draw(13.9, 0.8);
  S.mountain([[1100, 900], [1250, 760], [1300, 790], [1450, 600], [1600, 700], [1850, 900]], 12.6, 1.6);
}
{ // S5 16–20 desk+chair+sitting fig+laptop, couch+fig+phone, dumbbell, shirt, magnifier, padlock, hourglass, coffee
  const S = scene(16, 20, { cam: "none" }); label(S, "S5 chair+desk+laptop (seated) · couch+hold+phone · dumbbell · shirt print · magnifier · padlock · hourglass · coffee");
  const CH = S.chair(190, 900, 16.2, 0.8); const D = S.desk(230, 900, 480, 16.3, 1.0);
  const F1 = S.fig(170, CH.seatY, { s: 0.9, sit: true, pose: "reach" }).draw(16.8, 0.9); F1.face(17.8, "determined", 6);
  S.laptop(480, D.top, 0.9, 17.2, 1.0);
  const CO = S.couch(800, 900, 440, 16.3, 1.2); const F2 = S.fig(1000, CO.seatY, { s: 0.95, sit: true, pose: "hold" }).draw(17.0, 0.9); F2.face(18.0, "flat", 6);
  const [hx, hy] = F2.hand("R"); S.phone(hx + 8, hy - 24, 0.85, 17.6, 0.7, { screen: "feed", glow: true });
  S.dumbbell(1400, 230, 1.2, 16.4, 0.8); S.shirt(1680, 250, 1, 16.6, 1.1, { print: true });
  S.magnifier(1400, 560, 70, 16.8, 1); S.padlock(1680, 580, 1, 17.0, 1); S.hourglass(1400, 830, 0.6, 17.2, 1); S.coffee(1680, 900, 1, 17.4, 1);
}
{ // S6 20–24 timer, pie, batteries, trophy, pedestal, plant, book, underline, ring, crowd
  const S = scene(20, 24, { cam: "none" }); label(S, "S6 timer fill · pie 91% · battery 15%/80% · trophy · pedestal #1 · plant · book · underline · ring · crowd hi[2]");
  S.timer(250, 300, 110, 20.2, 1.2, { label: "2:00", fillAt: 21.5, fillDur: 1.5 });
  S.pie(600, 300, 130, 0.914, 20.3, 1.5, { cBig: GRAY, cSmall: RED }); S.text("91%", 600, 320, { size: 70, t: 21.9, dur: 0.5 });
  S.battery(850, 250, 220, 0.15, 20.4, 1); S.battery(850, 400, 220, 0.8, 20.9, 1);
  S.trophy(1350, 450, 1, 20.3, 1.4); S.pedestal(1500, 450, 170, 70, 20.6, 0.8, { label: "#1" });
  S.plant(250, 900, 1.1, 20.5, 1.6); S.book(650, 790, 0.8, 20.7, 1.4); S.underline(950, 1250, 880, 21.0, 0.6);
  S.ring(1100, 650, 120, 60, 21.2, 0.6); S.crowd(4, 1350, 900, 115, 0.55, 20.8, 1.4, { hi: [2], face: "flat", hiFace: "sad" });
}
{ // S7 24–28 hamster wheel, flame, drop, bolt, zzz, seats, hats, tag, checklist, burst, text fonts
  const S = scene(24, 28, { cam: "none" }); label(S, "S7 hamsterWheel+fig spin · flame · drop · bolt · zzz · seats · hat grad · bicorne · tag · checklist+tick · burst · fonts");
  const HW = S.hamsterWheel(300, 300, 150, 24.2, 1.4); S.fig(300, 420, { s: 0.55, parent: HW.g }).instant(25.0); HW.spin(25.6, 2, 1.5);
  S.flame(650, 440, 1, 24.4, 1); S.drop(800, 300, 2, 24.8); S.bolt(950, 300, 1.2, 25.0); S.zzz(1080, 340, 25.1, 0.9);
  S.seats(1250, 430, 5, 120, 24.5, 1.2);
  S.hat(300, 760, 1, 24.6, 1, { kind: "grad" }); S.hat(600, 760, 1, 24.8, 1, { kind: "bicorne" }); S.tag(950, 760, "PROFESSOR", 25.0, 1);
  const CL = S.checklist(1250, 640, ["Open the file", "Write one line", "Set a timer"], 24.7, 1.8); CL.boxes.forEach((b, i) => S.tick(b[0], b[1], 0.6, 26.7 + i * 0.2));
  S.burst(1800, 780, 40, 110, 10, 25.4, 0.6, { c: ORANGE });
  S.text("PATRICK HAND CAPS 72", 960, 600, { size: 72, t: 25.2, dur: 1 }); S.text("Caveat script 64 red", 960, 680, { size: 64, font: "caveat", c: RED, t: 25.8, dur: 1 });
}
{ // S8 28–32 figure poses + faces, sit, walk, lie/rise, grow, setPose, slump, hand anchor
  const S = scene(28, 32, { cam: "none" }); label(S, "S8 poses: stand sad point pointL armsUp shrug think hips wave cross head reach hold push · faces · sit walk lie/rise grow setPose slump hand");
  const poses = ["stand", "sad", "point", "pointL", "armsUp", "shrug", "think", "hips", "wave", "cross", "head", "reach", "hold", "push"];
  const faces = ["smile", "happy", "sad", "flat", "wow", "worried", "sleep", "determined"];
  poses.forEach((p, i) => { const F = S.fig(110 + i * 130, 470, { s: 0.75, pose: p }).draw(28.2 + i * 0.05, 0.7); if (faces[i]) F.face(29.2, faces[i]); S.text(p, 110 + i * 130, 520, { size: 28, t: 29.0, dur: 0.3, c: GRAY }); });
  S.fig(150, 900, { s: 0.8, sit: true }).draw(28.3, 0.7);
  S.fig(350, 900, { s: 0.8 }).draw(28.3, 0.7).walk(29.2, 1.6, { x: 260 });
  S.fig(800, 900, { s: 0.8 }).draw(28.3, 0.7).lie(29.2, 0.35).rise(30.4, 0.6);
  S.fig(1000, 900, { s: 0.8 }).draw(28.3, 0.7).grow(29.4, 0.8, 1.35);
  S.fig(1200, 900, { s: 0.8 }).draw(28.3, 0.7).setPose(29.6, "armsUp");
  S.fig(1400, 900, { s: 0.8 }).draw(28.3, 0.7).slump(29.4, 0.5, 14);
  const FH = S.fig(1650, 900, { s: 0.9, pose: "reach" }).draw(28.3, 0.7); const h = FH.hand("R"); S.draw(circ(h[0], h[1], 14), 29.2, 0.2, { c: RED, w: 6 }); const tp = FH.top(); S.draw(circ(tp[0], tp[1] - 20, 12), 29.4, 0.2, { c: BLUE, w: 6 });
}
{ // S9 32–36 camera zoom + tilt test
  const S = scene(32, 36, { cam: "zoom", focus: "1300 500" }); label(S, "S9 cam zoom + tilt 3° at 34s");
  S.mountain([[200, 900], [600, 500], [700, 560], [1000, 300], [1300, 560], [1700, 900]], 32.2, 1.4);
  S.fig(1000, 300, { s: 0.8, pose: "armsUp" }).draw(33.2, 0.8).face(34.0, "happy");
  S.tilt(3, 34, 0.3); S.tilt(0, 35, 0.4);
}
