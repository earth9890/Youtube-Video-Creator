// look: v3
// B (lottery): a book with a question mark where chapter 6 should be, "STOLEN" style, no title words.
const S = scene(0, 1, { cam: "none" });
S.bg("flat", { sky: "#1F2A55", ground: "#2c3a6b", hy: 960 });
S.draw(rrect(560, 230, 800, 620, 20), 0, 0.1, { w: 12, fill: "#e5383b" });
S.draw(rect(600, 270, 720, 540), 0, 0.1, { w: 6, fill: "#fbf7ef" });
S.text("CHAPTER 6", 960, 380, { size: 90 });
S.text("?", 960, 720, { size: 280, c: "#e5383b" });
S.text("STOLEN?", 960, 1000, { size: 150, c: "#FEFE06", halo: "#111111", haloW: 0.1 });
