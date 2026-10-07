// theme: dark
// thumb B (dark): 30 minutes — locked phone + calendar of ticks
const S = scene(0, 1, { cam: "none" });
S.text("30", 120, 430, { size: 240, anchor: "start", c: RED, t: 0, dur: 0.4 });
S.text("MINUTES.", 120, 660, { size: 200, anchor: "start", t: 0, dur: 0.5 });
S.phone(1350, 520, 2.6, 0, 0.6, { screen: "feed" });
S.padlock(1560, 600, 1.4, 0, 0.6);
const C = S.calendar(1130, 740, 7, 2, 90, 70, 0, 0.5);
C.cells.forEach((c, i) => S.tick(c[0], c[1], 0.7, 0.3 + i * 0.02));
