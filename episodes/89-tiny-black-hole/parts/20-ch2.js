// ===================== chapter 2: 3:58 pm (clips 11-15) =====================
const lab = (S) => L.put(S, "room-science-lab-light", 0, 0);
const callPair = (S, o = {}) => { // Dave (left) with the phone, Doctor Hale (right)
  dave(S, 520, 940, { s: 1.1, face: o.dface || "worried", pose: "phone-hold" });
  doc(S, 1400, 940, { s: 1.1, face: o.hface || "flat", pose: "phone-hold", flip: true });
};
// 11 (@doc) "Dave. In nineteen seventy-one, Stephen Hawking showed that tiny black holes could have formed in the first second of the universe. I checked the numbers twice. Whatever you do, do not put it down."
shot(11, 0, (S) => {
  lab(S);
  callPair(S, { hface: "flat" });
  tag(S, "DOCTOR HALE", 1400, 250, { t: W(11, 0) });
  card(S, "1971: HAWKING", 960, 190, { t: W(11, 4), size: DS.type.caption * 0.85, fill: "yellow" });
}, { cam: "push" });
shot(11, 12, (S) => {
  field(S, "navy", 2);
  L.put(S, "star-field", 960, 540, { s: 4.2 });
  L.put(S, "ep-galaxy", 960, 500, { s: 0.9, bg: true });
  card(S, "FIRST SECOND OF THE UNIVERSE", 960, 900, { t: W(11, 16), size: DS.type.caption * 0.85 });
  for (let i = 0; i < 9; i++) dot(S, 1100 + ((i * 137) % 600) - 200, 380 + ((i * 89) % 420), { R: 6, t: W(11, 13) + i * 0.08 });
  card(S, "I CHECKED THE NUMBERS TWICE", 960, 190, { t: W(11, 21), size: DS.type.caption * 0.8 });
}, { cam: "pull" });
shot(11, 24, (S) => {
  lab(S);
  callPair(S, { dface: "scared", hface: "determined" });
  card(S, "DO NOT PUT IT DOWN", 960, 170, { t: W(11, 28), size: DS.type.small, fill: "red", tc: "white" });
  tin(S, 560, 700, { s: 0.55 });
}, { cam: "zoom" });
// 12 "Black holes can be any size. A tiny one ... could weigh a billion tonnes, about a mountain, and still be smaller than an atom, around the size of a proton."
shot(12, 0, (S) => {
  field(S, "navy", 2);
  L.put(S, "star-field", 960, 540, { s: 4.2 });
  const sizes = [[330, 150], [760, 95], [1100, 60], [1360, 32], [1560, 14]];
  sizes.forEach(([x, R], i) => { const t = i === 0 ? undefined : W(12, 2) + i * 0.15; L.put(S, "ep89-glow", x, 560, { r: R * 1.35, t }); dot(S, x, 560, { R: Math.max(8, R * 0.55), t }); });  // drawn holes (the photo asset showed its square backdrop when overlapped)
  card(S, "ANY SIZE", 960, 230, { t: W(12, 2), size: DS.type.small, fill: "yellow" });
  card(S, "HUGE", 300, 830, { t: W(12, 3), size: DS.type.caption * 0.75 }); card(S, "TINY", 1520, 830, { t: W(12, 6), size: DS.type.caption * 0.75 });
}, { cam: "push" });
shot(12, 12, (S) => {
  field(S, "sky", 1);
  L.put(S, "mountain-rocky", 700, 880, { s: 1.7 });
  fillP(S, rect(0, 860, 1920, 240), "grass", 0, 1);
  L.put(S, "mountain-rocky", 700, 880, { s: 1.7 });
  card(S, "1,000,000,000 TONNES", 700, 190, { t: W(12, 13), size: DS.type.caption * 0.9, fill: "yellow" });
  dot(S, 1450, 700, { R: 20, t: W(12, 17) });
  S.arrow(1250, 520, 1420, 650, W(12, 18), 0.4, { c: DS.c("red", 2), w: DS.w.near, bend: 0.2 });
  card(S, "SAME WEIGHT", 1450, 520, { t: W(12, 19), size: DS.type.caption * 0.8 });
}, { cam: "pull" });
shot(12, 22, (S) => {
  field(S, "sand", 1);
  L.put(S, "cos-atom-shells", 960, 540, { s: 2.6 });
  dot(S, 960, 540, { R: 8, t: W(12, 25) });
  card(S, "SMALLER THAN AN ATOM", 960, 190, { t: W(12, 24), size: DS.type.caption * 0.85 });
  card(S, "PROTON-SIZED", 1360, 800, { t: W(12, 30), size: DS.type.caption * 0.85, fill: "yellow" });
}, { cam: "zoom", focus: "960 540" });
// 13 "So the weight of a mountain sits in your pocket, in a dot you cannot see."
shot(13, 0, (S) => {
  pocket(S);
  L.put(S, "mountain-rocky", 960, 500, { s: 0.7, t: W(13, 4) });
  dot(S, 960, 520, { R: 15 });
  card(S, "A DOT YOU CANNOT SEE", 960, 880, { t: W(13, 10), size: DS.type.caption * 0.85, fill: "yellow" });
}, { cam: "push" });
// 14 (@dave) 15 (@doc)
shot(14, 0, (S) => {
  lab(S); callPair(S, { dface: "worried", hface: "flat" });
  L.put(S, "ep89-tin", 560, 690, { s: 0.55 });
  card(S, "ONLY TWO ARMS", 520, 250, { t: W(14, 15), size: DS.type.caption * 0.8 });
}, { cam: "push" });
shot(15, 0, (S) => {
  lab(S); callPair(S, { dface: "worried", hface: "smile" });
  card(S, "DON'T LOOK AT ANYTHING YOU LOVE", 1400, 250, { t: W(15, 6), size: DS.type.caption * 0.7 });
  L.put(S, "prop-teddy", 460, 640, { s: 1.0, t: W(15, 8) });
}, { cam: "pull" });
