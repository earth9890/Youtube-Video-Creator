// theme: dark
// Thumbnail A — hook: 2:00 AM, again. Hero in bed lit by the phone.
const S = scene(0, 1, { cam: "none" });
S.text("2:00 AM", 960, 300, { size: 230, c: RED, t: 0, dur: 0.5 });
S.text("AGAIN.", 960, 520, { size: 170, t: 0, dur: 0.5 });
S.bed(560, 940, 800, 0, 0.5, { blanket: false });
const F = S.fig(969, 825, { s: 1.1, armL: [[30, 20], [70, -25]], armR: [[36, 24], [76, -20]] });
F.lie(0, 0.01, -88);
F.draw(0, 0.5);
F.face(0.5, "flat");
S.phone(669, 690, 1.0, 0, 0.5, { screen: "blank", glow: true });
