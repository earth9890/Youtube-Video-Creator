// theme: dark
// Thumbnail A: "I'LL START / TOMORROW" — hero hunched at the desk at 11:58
const hands = (K) => { K.g.appendChild(K.hourG); K.g.appendChild(K.minG); return K; };
const S = scene(0, 1, { cam: "none" });
S.text("I'LL START", 700, 300, { size: 230 });
S.text("TOMORROW", 700, 560, { size: 270, c: RED });
const D = S.desk(1080, 960, 760, 0, 0.3);
const F = S.fig(1260, 960 - 125, { s: 1.6, sit: true, pose: "head" }).draw(0, 0.4);
F.slump(0, 0.05, 30); // hunched forward over the desk; also clears the text block
F.face(0.4, "tired", 0);
S.laptop(1640, D.top, 1.1, 0, 0.3);
hands(S.clock(1700, 240, 110, 0, 0.3, { h: 11, m: 58 }));
