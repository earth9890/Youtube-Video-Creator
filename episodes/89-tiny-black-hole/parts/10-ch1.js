// ===================== chapter 0: the flash-forward (clips 1-3) =====================
// 1 "You are standing in the Lost Property office, holding a biscuit tin that weighs a billion tonnes. The floor is making a small noise of regret."
shot(1, 0, (S) => {
  office(S);
  clerk(S, 1250, 870, { face: "flat" });
  counter(S);
  const a = held(S, 560, 975, { s: 1.35, face: "scared" });
  // cracks spreading from his feet: the floor is losing
  [[560, 985, 300, 1040], [560, 985, 820, 1050], [560, 985, 470, 1075], [560, 985, 700, 1075]].forEach(([x0, y0, x1, y1], i) => S.draw(`M${x0} ${y0} L${(x0 + x1) / 2 + (i % 2 ? 18 : -18)} ${(y0 + y1) / 2} L${x1} ${y1}`, W(1, 20) + i * 0.12, 0.35, { c: DS.c("ink", 0), w: DS.w.detail }));
  S.sfx(W(1, 22), "rumble", 560);
}, { cam: "push" });
shot(1, 12, (S) => {
  L.put(S, "ep89-office", 0, 0);
  // the floor dips under the weight
  fillP(S, "M0 860 Q960 1010 1920 860 L1920 1080 L0 1080 Z", "floor", 2, 1);
  held(S, 960, 905, { s: 1.5, face: "worried" });
  card(S, "1,000,000,000 TONNES", 960, 300, { t: W(1, 14), size: DS.type.small });
  S.punch(960, 640, W(1, 14));
  txt(S, "creeeak...", 1380, 920, { t: W(1, 20), c: DS.c("gray", 2), size: DS.type.caption });
}, { cam: "pull" });
// 2 "Behind the desk, a clerk looks at the clock. It is two minutes to five."
shot(2, 0, (S) => {
  office(S, 4, 58);
  L.put(S, "ep-wall-clock", 960, 400, { s: 1.0, h: 4, m: 58 });
  clerk(S, 1320, 870, { s: 1.25, face: "grumpy" });
  counter(S, 1180, 900, {});
  card(S, "TWO MINUTES TO FIVE", 960, 590, { t: W(2, 8), fill: "yellow" });
}, { cam: "push" });
// 3 "Let's go back. Three fifty pm."  (rewinds into the pocket story at the jumble sale)
shot(3, 0, (S) => {
  L.put(S, "scene-shopping-street-day", 0, 0);
  L.put(S, "ep89-sign", 1360, 250, { s: 0.9, text: "JUMBLE SALE", size: DS.type.caption });
  fillP(S, rect(1060, 150, 600, 16), "gray", 2, 1); fillP(S, rect(1070, 150, 16, 790), "gray", 2, 1); fillP(S, rect(1634, 150, 16, 790), "gray", 2, 1);  // clothes rail
  L.put(S, "ep89-coat", 1360, 650, { s: 1.5 });
  dave(S, 600, 930, { s: 1.15, face: "smile", pose: "reach" });
  card(S, "3:50 PM", 640, 330, { t: W(3, 2), size: DS.type.title, fill: "yellow" });
}, { cam: "push" });
// ===================== chapter 1: 3:50 pm (clips 4-10) =====================
// 4 "In the pocket of a jumble-sale coat, you find something small and dark. Not a button. A mint is circling it. So is a coin. So are your keys."
const pocket = (S, o = {}) => { L.put(S, "ep89-coat-closeup", 0, 0); return dot(S, 960, 520, { R: 26 }); };
shot(4, 4, (S) => {
  pocket(S);
  card(S, "NOT A BUTTON", 960, 260, { t: W(4, 13), fill: "yellow" });
}, { cam: "zoom", focus: "960 540" });
shot(4, 16, (S) => {
  pocket(S);
  orbit(S, "ep89-mint", 960, 520, 190, 74, { a0: 0.4, turns: 3, t: W(4, 17), opt: { s: 2 } });
  orbit(S, "ep-coin-plain", 960, 520, 300, 116, { a0: 2.2, turns: 2.4, t: W(4, 24), opt: { s: 1.0 } });
  orbit(S, "ep89-keys", 960, 520, 410, 158, { a0: 4.2, turns: 1.8, t: W(4, 28), opt: { s: 1.4 } });
  L.put(S, "ep89-sign", 1560, 330, { s: 0.55, text: "ORBIT", size: DS.type.small, t: W(4, 28) });
}, { cam: "pull" });
// 5 (@dave) "Brain, my pocket has a solar system in it. What do I do?"
const tiny = (S, x, y, k = 1, t0) => { // a hand-sized solar system: the dot with a mint, a coin and keys on tiny orbits
  dot(S, x, y, { R: 9 * k });
  orbit(S, "ep89-mint", x, y, 62 * k, 24 * k, { a0: 0.4, turns: 3, opt: { s: 0.34 * k } });
  orbit(S, "ep-coin-plain", x, y, 92 * k, 34 * k, { a0: 2.4, turns: 2.2, opt: { s: 0.28 * k } });
  orbit(S, "ep89-keys", x, y, 128 * k, 44 * k, { a0: 4.2, turns: 1.6, opt: { s: 0.34 * k } });
};
shot(5, 0, (S) => {
  street(S);
  dave(S, 640, 940, { s: 1.15, face: "worried", pose: "reach" });
  tiny(S, 900, 650, 1.1);
  brain(S, 1500, 940, { s: 1.0, kind: "kit-brain-worried" });
  tag(S, "BRAIN", 1500, 330, { t: W(5, 0) });
}, { cam: "push" });
// 6 (@brain) "Please stop holding it, Dave. Or at least stop holding it near me."
shot(6, 0, (S) => {
  street(S);
  brain(S, 560, 940, { s: 1.35, kind: "kit-brain-stern" });
  dave(S, 1450, 940, { s: 0.95, face: "nervous", pose: "shrug", flip: true });
  tag(S, "BRAIN", 560, 230, { t: W(6, 0) });
}, { cam: "push" });
// 7 "Lost Property is on your way home, and it closes at five. First, you ring Doctor Hale."
shot(7, 0, (S) => {
  field(S, "sand", 1);
  fillP(S, "M0 700 L1920 700 L1920 1080 L0 1080 Z", "grass", 0, 0.5);
  fillP(S, rect(0, 760, 1920, 70), "gray", 2, 1);
  L.put(S, "bld-house-a", 300, 770, { s: 1.1 });
  L.put(S, "bld-office", 1560, 770, { s: 1.25 });
  card(S, "LOST PROPERTY", 1560, 270, { size: DS.type.caption * 0.85, t: W(7, 0) });
  L.put(S, "ep89-guide", 930, 795, { len: 560, t: W(7, 4) }).setAttribute("transform", "translate(930 795) rotate(90) scale(1)");
  card(S, "CLOSES 5:00 PM", 560, 380, { t: W(7, 8), fill: "yellow" });
  dave(S, 800, 940, { s: 0.85, face: "smile" });
  L.put(S, "prop-phone", 1130, 560, { s: 1.4, screen: "blank", t: W(7, 12) });
  card(S, "DOCTOR HALE", 1130, 420, { t: W(7, 14), size: DS.type.caption * 0.85 });
}, { cam: "push" });
// 8 "So, what if you found a tiny black hole in your pocket? Could you keep it, like a very dark marble?"
shot(8, 0, (S) => {
  L.put(S, "ep89-coat-closeup", 0, 0);
  fillP(S, rect(0, 0, 1920, 1080), "navy", 2, 0.55);
  dot(S, 960, 600, { R: 18 });
  txt(S, "WHAT IF YOU FOUND", 960, 250, { size: DS.type.title, c: DS.c("white", 0), t: W(8, 0) });
  txt(S, "A TINY BLACK HOLE", 960, 360, { size: DS.type.title, c: DS.c("yellow", 0), t: W(8, 4) });
  txt(S, "IN YOUR POCKET?", 960, 470, { size: DS.type.title, c: DS.c("white", 0), t: W(8, 8) });
}, { cam: "zoom" });
shot(8, 12, (S) => {
  field(S, "sky", 1);
  fillP(S, rect(0, 800, 1920, 280), "grass", 0, 0.6);
  dave(S, 640, 940, { s: 1.25, face: "thinking", pose: "reach" });
  dot(S, 900, 610, { R: 22 });
  L.put(S, "thought-pic", 1360, 400, { s: 1.0, text: "KEEP IT?|LIKE A MARBLE", size: 52, t: W(8, 15) });
  S.fill(circ(1380, 720, 40), W(8, 19), 0.35, DS.c("ink", 1), 1); S.fill(circ(1368, 706, 10), W(8, 19), 0.35, DS.c("white", 0), 0.5);
}, { cam: "push" });
// 9 "No. It weighs a mountain, it glows, and it will not stay in any pocket."
shot(9, 0, (S) => {
  field(S, "navy", 2);
  const pan = (x) => { fillP(S, rrect(x - 290, 220, 580, 640, DS.r.lg), "navy", 1, 1); };
  [330, 960, 1590].forEach(pan);
  L.put(S, "mountain-rocky", 330, 640, { s: 0.75, t: W(9, 4) });
  card(S, "WEIGHS A MOUNTAIN", 330, 270, { size: DS.type.caption * 0.8, t: W(9, 4), fill: "yellow" });
  L.put(S, "ep89-glow", 960, 560, { r: 250, t: W(9, 7) });
  dot(S, 960, 560, { R: 18, t: W(9, 7) });
  card(S, "IT GLOWS", 960, 270, { size: DS.type.caption * 0.8, t: W(9, 7), fill: "yellow" });
  L.put(S, "ep89-coat", 1590, 600, { s: 1.1, t: W(9, 11) });
  L.put(S, "sign-cross", 1590, 600, { s: 2.4, t: W(9, 13) });
  card(S, "WON'T STAY", 1590, 270, { size: DS.type.caption * 0.8, t: W(9, 11), fill: "yellow" });
}, { cam: "pull" });
// 10 "Here is the rule of this story. The hole sits in a biscuit tin that stops all its radiation, and your arms can carry anything. Nothing stops its gravity."
shot(10, 0, (S) => {
  field(S, "navy", 2);
  L.put(S, "star-field", 960, 500, { s: 4 });
  txt(S, "THE RULE", 960, 250, { size: DS.type.title, c: DS.c("yellow", 0), t: W(10, 3) });
  L.put(S, "ep89-glow", 960, 600, { r: 260, t: W(10, 12) });
  tin(S, 960, 650, { s: 1.5, glow: false });
  card(S, "THE TIN STOPS ALL RADIATION", 960, 880, { t: W(10, 14), size: DS.type.caption * 0.85 });
}, { cam: "push" });
shot(10, 20, (S) => {
  street(S);
  const [tx, ty] = held(S, 700, 950, { s: 1.4, face: "determined" });
  card(S, "YOUR ARMS CAN CARRY ANYTHING", 960, 200, { t: W(10, 20), size: DS.type.caption * 0.85 });
  const arrowsIn = [[1450, 620], [1500, 820], [1300, 480], [1560, 440]];
  arrowsIn.forEach(([x, y], i) => S.arrow(x, y, tx + 50, ty, W(10, 25) + i * 0.1, 0.4, { c: DS.c("red", 2), w: DS.w.near, bend: 0.1 }));
  card(S, "NOTHING STOPS GRAVITY", 1360, 920, { t: W(10, 25), size: DS.type.caption * 0.85, fill: "yellow" });
}, { cam: "pull" });
