// ===================== chapter 8: the last second (clips 57-60) =====================
const space = (S) => { field(S, "navy", 2); L.put(S, "star-field", 960, 540, { s: 4.2 }); };
// 57 "Pocket glows with three hundred and sixty megawatts. The Earth makes forty-seven million megawatts of its own heat. It will be the smallest radiator in the building."
shot(57, 0, (S) => {
  space(S);
  L.put(S, "sci-earth-layers", 960, 560, { s: 2.3 });
  tin(S, 960, 560, { s: 0.3 });
  L.put(S, "ep89-glow", 960, 560, { r: 110, t: W(57, 3) });
  card(S, "POCKET: 360 MEGAWATTS", 960, 150, { t: W(57, 3), size: DS.type.caption * 0.85, fill: "yellow" });
  L.put(S, "ep89-glow", 960, 560, { r: 520, t: W(57, 11) });
  card(S, "EARTH: 47 MILLION MEGAWATTS", 960, 960, { t: W(57, 11), size: DS.type.caption * 0.85 });
}, { cam: "pull" });
shot(57, 20, (S) => {
  field(S, "sand", 1); fillP(S, rect(0, 800, 1920, 280), "floor", 0, 1);
  const rad = (x, gy, k) => { for (let i = 0; i < 7; i++) S.draw(rrect(x + i * 46 * k, gy - 200 * k, 34 * k, 200 * k, DS.r.sm), T0(S), 0, { fill: DS.c("white", 0), c: DS.c("ink", 0), w: DS.w.detail }); };
  rad(1000, 860, 2.3);
  L.put(S, "ep89-glow", 1170, 640, { r: 260, t: W(57, 20) });
  rad(430, 860, 0.45); L.put(S, "ep89-glow", 470, 800, { r: 50, t: W(57, 21) }); dot(S, 470, 800, { R: 5, t: W(57, 21) });
  card(S, "THE SMALLEST RADIATOR", 560, 330, { t: W(57, 21), size: DS.type.caption * 0.8, fill: "yellow" });
  card(S, "THE EARTH", 1360, 330, { t: W(57, 21), size: DS.type.caption * 0.8 });
}, { cam: "push" });
// 58 "It will glow for about three trillion years, shrinking all the while. And a black hole that shrinks gets hotter, and faster, until the very last second."
shot(58, 0, (S) => {
  space(S);
  L.put(S, "ep89-glow", 960, 560, { r: 200 });
  dot(S, 960, 560, { R: 18 });
  card(S, "ABOUT 3 TRILLION YEARS", 960, 200, { t: W(58, 3), size: DS.type.small, fill: "yellow" });
  [1, 2, 3].forEach((k, i) => { const g = S.grp(); dot(S, 0, 0, { R: 18 - i * 5, parent: g }); g.setAttribute("transform", `translate(${1260 + i * 150} 560)`); tl.set(g, { opacity: 0 }, 0); tl.set(g, { opacity: 1 }, W(58, 7) + i * 0.3); });
  S.arrow(1070, 560, 1190, 560, W(58, 7), 0.4, { c: DS.c("white", 0), w: DS.w.near });
  card(S, "SHRINKING ALL THE WHILE", 960, 900, { t: W(58, 7), size: DS.type.caption * 0.85 });
}, { cam: "push" });
shot(58, 12, (S) => {
  space(S);
  [[480, 18, 130], [960, 12, 190], [1440, 7, 260]].forEach(([x, R, r], i) => { L.put(S, "ep89-glow", x, 560, { r, t: W(58, 13) + i * 0.5 }); dot(S, x, 560, { R, t: W(58, 13) + i * 0.5 }); });
  S.arrow(600, 560, 780, 560, W(58, 14), 0.4, { c: DS.c("white", 0), w: DS.w.near }); S.arrow(1100, 560, 1260, 560, W(58, 18), 0.4, { c: DS.c("white", 0), w: DS.w.near });
  card(S, "SMALLER", 480, 880, { t: W(58, 13), size: DS.type.caption * 0.8 }); card(S, "HOTTER", 960, 880, { t: W(58, 16), size: DS.type.caption * 0.8 }); card(S, "FASTER", 1440, 880, { t: W(58, 19), size: DS.type.caption * 0.8, fill: "yellow" });
}, { cam: "pull" });
// 59 "In that last second, a mini black hole gives off about a thousand tonnes of rest mass energy. Big by human standards, small for the universe."
shot(59, 0, (S) => {
  space(S);
  L.put(S, "ep89-glow", 960, 560, { r: 300 });
  dot(S, 960, 560, { R: 8 });
  card(S, "THE LAST SECOND", 960, 190, { t: W(59, 1), size: DS.type.small });
  card(S, "ABOUT 1,000 TONNES OF ENERGY", 960, 900, { t: W(59, 11), size: DS.type.caption * 0.85, fill: "yellow" });
}, { cam: "zoom", focus: "960 560" });
shot(59, 16, (S) => {
  space(S);
  L.put(S, "cos-galaxy-spiral", 1250, 520, { s: 2.2 });
  dave(S, 460, 940, { s: 1.0, face: "wow", pose: "look-up" });
  card(S, "BIG BY HUMAN STANDARDS", 460, 330, { t: W(59, 16), size: DS.type.caption * 0.75 });
  card(S, "SMALL FOR THE UNIVERSE", 1250, 190, { t: W(59, 21), size: DS.type.caption * 0.8, fill: "yellow" });
}, { cam: "pull" });
// 60 "If you want to know what the last second of a black hole looks like, you know the button."
shot(60, 0, (S) => {
  field(S, "dusk", 1); fillP(S, rect(0, 820, 1920, 260), "floor", 1, 1);
  dave(S, 600, 950, { s: 1.3, face: "mischief", pose: "point" });
  L.put(S, "ep-push-button-red", 1250, 760, { s: 2.0, c: "red" });
  dot(S, 1250, 420, { R: 10, t: W(60, 12) });
  card(S, "THE BUTTON", 1250, 240, { t: W(60, 17), size: DS.type.small, fill: "yellow" });
}, { cam: "push" });
