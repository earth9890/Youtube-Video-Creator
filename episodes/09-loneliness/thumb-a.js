// theme: dark
// Thumb A — hook: "1 IN 2 FEEL ALONE", hero alone inside a gray crowd
const S = scene(0, 1, { cam: "none" });
S.text("1 IN 2", 960, 300, { size: 230, t: 0, dur: 0.5 });
S.text("FEEL", 420, 560, { size: 210, anchor: "start", t: 0, dur: 0.5 });
S.text("ALONE", 880, 560, { size: 210, anchor: "start", c: ORANGE, t: 0, dur: 0.5 });
const CR = S.crowd(7, 480, 920, 160, 0.55, 0, 0.5, { c: GRAY, hi: [3], hiC: INK });
CR[3].face(0.5, "sad");
