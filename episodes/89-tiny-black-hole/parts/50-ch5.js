// ===================== chapter 5: 4:35 pm (clips 32-37) =====================
// 32 "Your arms are tired. Your feet are tired. You look for somewhere to put the tin down."
shot(32, 0, (S) => {
  street(S);
  fillP(S, rect(0, 880, 1920, 200), "gray", 1, 0.9);
  const [tx, ty] = held(S, 700, 960, { s: 1.35, face: "tired" });
  L.put(S, "fx-sweat-drops", 830, 470, { s: 0.45, t: W(32, 3) });
  card(S, "ARMS TIRED", 1250, 300, { t: W(32, 1), size: DS.type.caption * 0.85 });
  card(S, "FEET TIRED", 1250, 420, { t: W(32, 5), size: DS.type.caption * 0.85 });
  [["BIN", 1250, 700], ["WALL", 1550, 760]].forEach(([s, x, y], i) => { card(S, s + "?", x, y, { t: W(32, 10) + i * 0.4, size: DS.type.caption * 0.8, fill: "yellow" }); });
}, { cam: "push" });
// 33 "Never put it down. Something that small slips between the atoms. Theorists say tiny black holes would zip straight through matter as if it was not there."
shot(33, 0, (S) => {
  field(S, "sand", 1);
  for (let r = 0; r < 5; r++) for (let c = 0; c < 9; c++) S.fill(circ(360 + c * 150 + (r % 2) * 75, 300 + r * 130, 44), T0(S), 0, DS.c("blue", 1), 1);
  dot(S, 300, 440, { R: 12 });
  const g = S.grp(); dot(S, 0, 0, { R: 12, parent: g });
  g.setAttribute("transform", "translate(300 370)");
  tl.fromTo(g, { attr: { transform: "translate(300 365)" } }, { attr: { transform: "translate(1640 365)" }, duration: Math.max(1.5, S.end - S.start - 1), ease: "power1.inOut", immediateRender: false }, W(33, 6));
  S.draw(line([260, 365], [1700, 365]), W(33, 6), 1.4, { c: DS.c("red", 1), w: DS.w.detail });
  card(S, "SLIPS BETWEEN THE ATOMS", 960, 245, { t: W(33, 6), size: DS.type.caption * 0.85, fill: "yellow" });
  card(S, "NEVER PUT IT DOWN", 960, 130, { t: W(33, 0), size: DS.type.small, fill: "red", tc: "white" });
}, { cam: "pull" });
shot(33, 16, (S) => {
  field(S, "sky", 1);
  for (let r = 0; r < 6; r++) for (let c = 0; c < 6; c++) S.draw(rect(760 + c * 80 - (r % 2) * 40, 250 + r * 80, 80, 80), T0(S), 0, { fill: DS.c("earth", 1), c: DS.c("brown", 2), w: DS.w.detail });
  const g = S.grp(); dot(S, 0, 0, { R: 14, parent: g }); g.setAttribute("transform", "translate(300 520)");
  tl.fromTo(g, { attr: { transform: "translate(300 520)" } }, { attr: { transform: "translate(1640 520)" }, duration: 2.4, ease: "power1.inOut", immediateRender: false }, W(33, 19));
  card(S, "THEORISTS SAY", 960, 190, { t: W(33, 16), size: DS.type.caption * 0.85 });
  card(S, "THE WALL DOES NOT NOTICE", 960, 940, { t: W(33, 21), size: DS.type.caption * 0.8, fill: "yellow" });
}, { cam: "push" });
// 34 "It would fall through the pavement, the pipes, the rock and the whole planet."
shot(34, 0, (S) => {
  L.put(S, "ep89-cutaway", 0, 0);
  const g = S.grp(); tin(S, 0, 0, { s: 0.55, parent: g });
  g.setAttribute("transform", "translate(960 290)");
  tl.fromTo(g, { attr: { transform: "translate(960 290)" } }, { attr: { transform: "translate(960 900)" }, duration: 4, ease: "power1.in", immediateRender: false }, W(34, 3));
  [["PAVEMENT", 230, 5], ["PIPES", 530, 7], ["ROCK", 760, 9], ["THE WHOLE PLANET", 960, 12]].forEach(([s, y, w]) => card(S, s, 1480, y, { t: W(34, w), size: DS.type.caption * 0.75 }));
}, { cam: "push" });
// 35 "Ignoring friction, a swing through the middle of the Earth and back takes about eighty-four minutes. It loses a little energy on every pass, so it ends up settling at the centre."
shot(35, 0, (S) => {
  field(S, "navy", 2); L.put(S, "star-field", 960, 540, { s: 4.2 });
  L.put(S, "sci-earth-layers", 960, 560, { s: 2.3 });
  const g = S.grp(); tin(S, 0, 0, { s: 0.3, parent: g });
  tl.fromTo(g, { attr: { transform: "translate(960 215)" } }, { attr: { transform: "translate(960 905)" }, duration: 2.2, ease: "sine.inOut", yoyo: true, repeat: 2, immediateRender: false }, S.start + 0.3);
  g.setAttribute("transform", "translate(960 215)");
  card(S, "THROUGH THE MIDDLE AND BACK", 960, 130, { t: W(35, 4), size: DS.type.caption * 0.8 });
  card(S, "ABOUT 84 MINUTES", 1600, 720, { t: W(35, 12), size: DS.type.caption * 0.85, fill: "yellow" });
}, { cam: "push" });
shot(35, 16, (S) => {
  field(S, "navy", 2); L.put(S, "star-field", 960, 540, { s: 4.2 });
  L.put(S, "sci-earth-layers", 960, 560, { s: 2.3 });
  S.draw("M960 215 L960 905", T0(S), 0, { c: DS.c("white", 0), w: DS.w.detail });
  [[215, 905, 40], [260, 860, 34], [310, 810, 28]].forEach(([a, b, k], i) => S.draw(poly([[960 - k, a], [960 + k, b]]), W(35, 17) + i * 0.4, 0.3, { c: DS.c("yellow", 0), w: DS.w.detail }));
  card(S, "LOSES A LITTLE ENERGY EACH PASS", 960, 130, { t: W(35, 17), size: DS.type.caption * 0.8 });
  tin(S, 960, 560, { s: 0.3, t: W(35, 26) });
  L.put(S, "ep89-glow", 960, 560, { r: 130, t: W(35, 28) });
  card(S, "SETTLES AT THE CENTRE", 1600, 820, { t: W(35, 26), size: DS.type.caption * 0.85, fill: "yellow" });
}, { cam: "pull" });
// 36 (@dave) 37 (@brain)
shot(36, 0, (S) => {
  street(S);
  const f = held(S, 700, 960, { s: 1.2, face: "thinking" });
  L.put(S, "thought-pic", 1300, 380, { s: 1.0, text: "THE PLANET?|LIVES THERE?", size: 52, t: W(36, 4) });
  L.put(S, "cos-earth-moon", 1400, 700, { s: 0.7, t: W(36, 8) });
}, { cam: "push" });
shot(37, 0, (S) => {
  street(S);
  brain(S, 560, 940, { s: 1.35, kind: "kit-brain-tired" });
  dave(S, 1400, 940, { s: 1.0, face: "embarrassed", flip: true });
  card(S, "FORTY MINUTES", 960, 220, { t: W(37, 13), size: DS.type.caption * 0.85, fill: "yellow" });
}, { cam: "pull" });
