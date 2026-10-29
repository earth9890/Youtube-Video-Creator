// ===================== chapter 8: The empty slot (clips 69-71) =====================
// 69 "Dave takes it back. All of it. The Brain wheels the shelf out of his head, binder by binder,"
shot(69, 0, (S) => {
  bg(S, "room-bedroom-light");
  chap(S, "THE EMPTY SLOT");
  dave(S, 400, 950, { s: 1.3, face: "smile", pose: "arms-out" });
  const g = S.grp(); shelf(S, 1000, 950, 26, { s: 1.0, rows: 3, wd: 380, wheels: true, parent: g }); brain(S, 1300, 950, 1.4, "tired", { flip: true, parent: g });
  shift(g, W(69, 9), 5.0, [0, 0], [900, 0], "power1.inOut");
  card(S, "DAVE TAKES IT BACK", 1300, 110, { t: W(69, 1), fill: "yellow" });
  card(S, "OUT OF HIS HEAD", 1300, 230, { t: W(69, 11), fill: "yellow" });
}, { cam: "push" });
// 69 "and leaves one slot empty."
shot(69, 19, (S) => {
  bg(S, "kit-room-library-day");
  dave(S, 560, 950, { s: 1.3, face: "smile" });
  shelf(S, 1300, 950, 0, { s: 1.5, rows: 1, wd: 140 });
  L.put(S, "fx-glow-ring", 1300, 850, { s: 1.1, t: W(69, 21) });
  card(S, "ONE SLOT, EMPTY", 960, 140, { t: W(69, 21), fill: "yellow" });
}, { cam: "pull" });
// 70 "Thank you. Most of my job is throwing things away."
shot(70, 0, (S) => {
  bg(S, "room-library-light");
  dave(S, 600, 950, { s: 1.25, face: "love", pose: "bow" });
  brainTalk(S, 1300, 950, 1.6, "smile", 70, {});
  L.put(S, "fx-hearts", 600, 400, { s: 0.9, t: W(70, 0) });
  card(S, "THANK YOU", 960, 140, { t: W(70, 0), fill: "green" });
}, { cam: "push" });
// 70 "Nobody ever says thank you."
shot(70, 10, (S) => {
  bg(S, "room-library-light");
  brainTalk(S, 960, 950, 2.0, "smile", 70, {});
  L.put(S, "fx-sparkle", 1260, 480, { s: 0.9, t: W(70, 12) });
  L.put(S, "fx-sparkle", 660, 520, { s: 0.7, t: W(70, 13) });
}, { cam: "push" });
// 71 "Somewhere in a very large field, a car is waiting."
shot(71, 0, (S) => {
  bg(S, "ep46-field", { car: true, time: "dusk", carS: 0.2 });
}, { cam: "zoom", focus: "1190 570" });
// 71 "Dave has no idea where. He's fine."
shot(71, 10, (S) => {
  bg(S, "ep46-field", { car: true, time: "dusk", carS: 0.2 });
  const g = S.grp(); dave(S, 520, 990, { s: 1.0, face: "happy", pose: "cyc-walk-2", parent: g });
  shift(g, W(71, 10), 6.0, [0, 0], [560, -30], "power1.inOut");
}, { cam: "pull" });
