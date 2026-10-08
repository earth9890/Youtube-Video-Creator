// theme: dark
// Thumbnail B — chained to the phone: hero sits on the floor, wrist chained to a glowing phone, crying.
const S = scene(0, 1, { cam: "none" });
S.text("CAN'T", 100, 330, { size: 260, anchor: "start", t: 0, dur: 0.5 });
S.text("STOP.", 100, 600, { size: 300, c: RED, anchor: "start", t: 0, dur: 0.5 });
S.draw(line([900, 960], [1820, 960], 2), 0, 0.3, { w: 8 });                       // floor
const F = S.fig(1080, 960, { s: 1.5, sit: true, pose: "reach", legL: [[60, -70], [115, 0]], legR: [[80, -62], [135, 6]] });
F.draw(0, 0.5);
F.face(0.5, "cry", 6);
S.phone(1600, 760, 1.7, 0, 0.5, { screen: "play", glow: true });
const [hx, hy] = F.hand("R", "reach");
S.chain(hx, hy, 1537, 760, 6, 0, 0.4, { c: GRAY });
