// Thumbnail A (light): "YOU'RE NOT LAZY." — hero on the couch with a glowing phone
const hands = (K) => { K.g.appendChild(K.hourG); K.g.appendChild(K.minG); return K; };
const S = scene(0, 1, { cam: "none" });
const C = S.couch(140, 960, 580, 0, 0.5);
const F = S.fig(430, C.seatY, { s: 1.3, sit: true, pose: "hold" }).draw(0, 0.5); F.face(0.5, "flat", 6);
const [hx, hy] = F.hand("R"); S.phone(hx + 14, hy - 26, 1.2, 0.1, 0.5, { screen: "play", glow: true });
S.text("YOU'RE", 1300, 300, { size: 180, t: 0, dur: 0.4 });
S.text("NOT", 1300, 520, { size: 180, c: RED, t: 0.1, dur: 0.4 });
S.text("LAZY.", 1300, 790, { size: 240, t: 0.2, dur: 0.4 });
S.strike(960, 640, 1640, 820, 0.4, 0.2);
