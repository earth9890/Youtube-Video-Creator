// look: v3
// B (lottery): a rejection envelope stamped NO with a gold trophy climbing out of it. Wrongness: the prize is inside the "no".
const S = scene(0, 1, { cam: "none" });
S.bg("flat", { sky: "#1F2A55", ground: "#1F2A55", hy: 1080 });
S.trophy(960, 700, 3.2, 0, 0.1);
S.draw(rect(460, 620, 1000, 400), 0, 0.1, { w: 14, fill: "#fbf7ef" });
S.draw(`M460 620 L960 860 L1460 620`, 0, 0.1, { w: 12 });
S.draw(rrect(1040, 760, 400, 220, 24), 0, 0.1, { w: 16, c: "#e5383b", fill: "#fbf7ef" });
S.text("NO", 1240, 940, { size: 210, c: "#e5383b" });
