// theme: dark
// thumb B: "30 MINUTES." — happy hero puts the phone face-down on the table, padlock on it
const S = scene(0, 1, { cam: "none" });
S.text("30", 330, 330, { size: 300, c: GREEN, t: 0, dur: 0.4 });
S.text("MINUTES.", 600, 610, { size: 250, t: 0, dur: 0.5 });
const F = S.fig(1250, 1010, { s: 1.6, armR: [[60, 60], [125, 120]] }).draw(0, 0.5);
F.face(0.5, "happy", 0);
S.desk(1050, 1010, 540, 0, 0.4);
S.draw(rrect(1380, 760, 150, 64, 14), 0.2, 0.3, { w: 7, fill: GRAY });       // phone face-down
S.draw(circ(1500, 792, 7), 0.4, 0.1, { w: 4, fill: INK });                   // camera dot
S.padlock(1455, 712, 1.1, 0.3, 0.3);
