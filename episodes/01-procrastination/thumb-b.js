// theme: dark
// Thumbnail B (dark): "I'll do it later" — big alarm clock, small sad hero
const hands = (K) => { K.g.appendChild(K.hourG); K.g.appendChild(K.minG); return K; };
const S = scene(0, 1, { cam: "none" });
S.text("I'll do it", 960, 250, { size: 200, font: "caveat", c: RED, t: 0, dur: 0.5 });
S.text("later", 1430, 580, { size: 300, font: "caveat", c: RED, t: 0.1, dur: 0.5 });
hands(S.clock(640, 620, 230, 0, 0.6, { h: 11, m: 55, bells: true }));
const F = S.fig(1450, 900, { s: 0.75, pose: "sad" }).draw(0, 0.5); F.face(0.5, "sad");
