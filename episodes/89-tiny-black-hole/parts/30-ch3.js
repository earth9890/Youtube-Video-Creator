// ===================== chapter 3: 4:10 pm (clips 16-23) =====================
// 16 "There is a second problem. The pocket is warm."
shot(16, 0, (S) => {
  pocket(S);
  L.put(S, "ep89-glow", 960, 520, { r: 230, t: W(16, 6) });
  dot(S, 960, 520, { R: 15 });
  L.put(S, "ep-thermometer", 1560, 560, { s: 1.5, level: 0.55, t: W(16, 7) });
  card(S, "WARM", 1560, 250, { t: W(16, 8), size: DS.type.small, fill: "yellow" });
}, { cam: "push" });
// 17 "In nineteen seventy-four, Hawking showed that black holes glow. And the smaller the hole, the hotter and brighter it glows."
shot(17, 0, (S) => {
  field(S, "navy", 2); L.put(S, "star-field", 960, 540, { s: 4.2 });
  L.put(S, "ep89-glow", 560, 560, { r: 330, t: W(17, 5) });
  L.put(S, "ep-black-hole-small", 560, 560, { s: 2.2, R: 60 });
  card(S, "1974", 520, 220, { t: W(17, 0), size: DS.type.small, fill: "yellow" });
  card(S, "HAWKING: BLACK HOLES GLOW", 960, 900, { t: W(17, 5), size: DS.type.caption * 0.85 });
  L.put(S, "ep89-glow", 1400, 560, { r: 330, t: W(17, 12) });
  dot(S, 1400, 560, { R: 14, t: W(17, 12) });
  card(S, "TINY HOLE: HOT", 1400, 300, { t: W(17, 12), size: DS.type.caption * 0.8, fill: "yellow" });
  L.put(S, "ep-thermometer", 1400, 790, { s: 0.8, level: 0.95, t: W(17, 14) });
}, { cam: "push" });
// 18 "Yours is hotter than a hundred billion degrees. It gives off about as much power as a power station. And all of it is gamma rays."
shot(18, 0, (S) => {
  field(S, "sky", 1); fillP(S, rect(0, 820, 1920, 260), "grass", 0, 1);
  L.put(S, "ep-thermometer", 560, 560, { s: 2.2, level: 1, t: W(18, 3) });
  dave(S, 260, 960, { s: 0.9, face: "shocked", pose: "shocked" });
  card(S, "100 BILLION DEGREES", 560, 200, { t: W(18, 4), size: DS.type.caption * 0.9, fill: "yellow" });
  L.put(S, "kit-factory", 1330, 840, { s: 1.4, t: W(18, 12) });
  card(S, "ABOUT A POWER STATION", 1330, 250, { t: W(18, 13), size: DS.type.caption * 0.8 });
}, { cam: "push" });
shot(18, 17, (S) => {
  field(S, "navy", 2); L.put(S, "star-field", 960, 540, { s: 4.2 });
  L.put(S, "ep89-glow", 960, 560, { r: 300 });
  for (let i = 0; i < 16; i++) { const a = (i / 16) * Math.PI * 2; S.arrow(960 + Math.cos(a) * 130, 560 + Math.sin(a) * 130, 960 + Math.cos(a) * 330, 560 + Math.sin(a) * 330, W(18, 20) + i * 0.03, 0.3, { c: DS.c("yellow", 0), w: DS.w.detail }); }
  dot(S, 960, 560, { R: 15 });
  card(S, "GAMMA RAYS", 960, 200, { t: W(18, 21), size: DS.type.small, fill: "yellow" });
}, { cam: "zoom" });
// 19 "Andrew Hamilton, a black hole physicist, puts it simply: you would not want to go near a mini black hole that is evaporating."
shot(19, 0, (S) => {
  lab(S);
  person(S, "man06", 560, 940, { s: 1.15, acc: ["glasses"], outfit: "labcoat", pose: "point", face: "flat" });
  card(S, "ANDREW HAMILTON, PHYSICIST", 560, 250, { t: W(19, 0), size: DS.type.caption * 0.75 });
  dot(S, 1300, 640, { R: 18, t: W(19, 6) });
  L.put(S, "ep89-glow", 1300, 640, { r: 200, t: W(19, 8) });
}, { cam: "push" });
shot(19, 12, (S) => {
  lab(S);
  const g = S.grp(); person(S, "man06", 560, 940, { s: 1.15, acc: ["glasses"], outfit: "labcoat", pose: "shrug", face: "worried", parent: g });
  shift(g, S.start + 0.3, 3.2, [0, 0], [-120, 0]);
  L.put(S, "ep89-glow", 1360, 640, { r: 210 }); dot(S, 1360, 640, { R: 20 });
  L.put(S, "ep89-zone", 1360, 900, { r: 340 });
  card(S, "NOT NEAR", 1360, 330, { t: W(19, 12), size: DS.type.small, fill: "red", tc: "white" });
}, { cam: "pull" });
// 20 (@dave)
shot(20, 0, (S) => {
  street(S);
  held(S, 700, 950, { s: 1.4, face: "smug", glow: true });
  L.put(S, "ep89-coat", 1300, 660, { s: 1.3 });
  card(S, "IT IS IN MY POCKET", 1300, 250, { t: W(20, 8), size: DS.type.caption * 0.85 });
}, { cam: "push" });
// 21 (@brain) 22 (@brain)
shot(21, 0, (S) => {
  street(S);
  brain(S, 520, 940, { s: 1.35, kind: "kit-brain-smile" });
  dave(S, 1420, 940, { s: 1.0, face: "proud", flip: true });
  card(S, "FAVOURITE CASE OF THE WEEK", 960, 250, { t: W(21, 5), size: DS.type.caption * 0.8, fill: "yellow" });
}, { cam: "pull" });
shot(22, 0, (S) => {
  street(S);
  brain(S, 520, 940, { s: 1.35, kind: "kit-brain-stern" });
  held(S, 1420, 950, { s: 1.0, face: "nervous", flip: true });
  card(S, "THE TIN IS WORKING", 960, 250, { t: W(22, 3), size: DS.type.caption * 0.85 });
}, { cam: "push" });
// 23 "In the tin, the gamma rays go nowhere. It is a very good tin."  + gag: buttons, one thimble, no cookies
shot(23, 0, (S) => {
  field(S, "dusk", 1);
  tin(S, 640, 700, { s: 1.9 });
  for (let i = 0; i < 8; i++) { const a = (i / 8) * Math.PI * 2; S.arrow(640 + Math.cos(a) * 190, 640 + Math.sin(a) * 120, 640 + Math.cos(a) * 320, 640 + Math.sin(a) * 200, W(23, 3) + i * 0.04, 0.3, { c: DS.c("orange", 1), w: DS.w.detail }); }
  card(S, "GAMMA RAYS GO NOWHERE", 960, 200, { t: W(23, 4), size: DS.type.caption * 0.85 });
  ["BUTTONS", "ONE THIMBLE"].forEach((s, i) => { card(S, s, 1350, 400 + i * 120, { t: W(23, 9) + i * 0.3, size: DS.type.caption * 0.8 }); tick(S, 1000, 400 + i * 120, 0.5, W(23, 9) + i * 0.3 + 0.2); });
  card(S, "NO COOKIES", 1350, 640, { t: W(23, 12), size: DS.type.caption * 0.8, fill: "yellow" });
  S.cross(1000, 640, 0.5, W(23, 12) + 0.2, 0, { c: DS.c("red", 2), w: DS.w.near });
}, { cam: "push" });
