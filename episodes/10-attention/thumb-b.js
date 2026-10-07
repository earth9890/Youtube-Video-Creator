// theme: dark
// Thumbnail B (dark) — hook: "YOUR BRAIN IS TRAINED" + brain lifting a dumbbell
const S = scene(0, 1, { cam: "none" });
S.text("YOUR BRAIN IS", 130, 430, { size: 150, anchor: "start", t: 0, dur: 0.5 });
S.text("TRAINED", 130, 690, { size: 230, c: ORANGE, anchor: "start", t: 0, dur: 0.5 });
S.brain(1560, 640, 1.3, 0, 0.6);
S.dumbbell(1560, 360, 1.3, 0.1, 0.5);
