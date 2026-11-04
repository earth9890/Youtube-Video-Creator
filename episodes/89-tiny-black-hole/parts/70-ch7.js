// ===================== chapter 7: 4:58 pm, the desk (clips 46-56) =====================
const deskScene = (S, o = {}) => {
  office(S, 4, 58);
  clerk(S, o.cx ?? 1280, 870, { s: 1.1, face: o.face || "flat", pose: o.pose || "hold" });
  counter(S, o.x ?? 1130, 900, {});
};
// 46 "You reach the desk. The clerk has a stamp in his hand and a look of great calm."
shot(46, 0, (S) => {
  deskScene(S);
  const g = S.grp(); const a = held(S, 380, 960, { s: 1.1, face: "worried", parent: g });
  shift(g, S.start + 0.3, 3.2, [0, 0], [120, 0]);
  L.put(S, "ep89-stamp", 1210, 640, { s: 0.9, t: W(46, 8) });
  card(S, "A LOOK OF GREAT CALM", 960, 560, { t: W(46, 14), size: DS.type.caption * 0.85, fill: "yellow" });
}, { cam: "push" });
// 47 (@old) 48 (@dave) 49 (@old) 50 (@brain)
shot(47, 0, (S) => { deskScene(S, { face: "smile" }); held(S, 420, 960, { s: 1.1, face: "worried" }); tag(S, "CLERK", 1280, 330, { t: W(47, 0) }); card(S, "WHAT ITEM TODAY?", 960, 610, { t: W(47, 3), size: DS.type.caption * 0.85 }); }, { cam: "push" });
shot(48, 0, (S) => { deskScene(S, { face: "flat" }); held(S, 420, 960, { s: 1.1, face: "scared" }); card(S, "NOT ON THE COUNTER, PLEASE", 960, 610, { t: W(48, 6), size: DS.type.caption * 0.85 }); }, { cam: "pull" });
shot(49, 0, (S) => {
  deskScene(S, { face: "grumpy" }); held(S, 420, 960, { s: 1.1, face: "sad" });
  L.put(S, "ep89-sign", 1130, 620, { s: 0.55, text: "POLICY", size: DS.type.body, t: W(49, 10) });
}, { cam: "push" });
shot(50, 0, (S) => {
  deskScene(S, { face: "flat" }); held(S, 420, 960, { s: 1.1, face: "worried" });
  brain(S, 720, 880, { s: 0.7, kind: "kit-brain-stern", t: W(50, 0) });
  card(S, "IT IS THE PLANET'S NOW", 960, 610, { t: W(50, 11), size: DS.type.caption * 0.8, fill: "yellow" });
}, { cam: "pull" });
// 51 "You lower the tin. The tin goes through the counter, the floor, the drains and the rock, as if it was fog. The mint goes with it."
const sink = (S, y0, y1, t0, dur, mintT) => {
  const g = S.grp(); tin(S, 0, 0, { s: 0.55, parent: g });
  g.setAttribute("transform", `translate(960 ${y0})`);
  tl.fromTo(g, { attr: { transform: `translate(960 ${y0})` } }, { attr: { transform: `translate(960 ${y1})` }, duration: dur, ease: "power1.inOut", immediateRender: false }, t0);
  if (mintT !== undefined) { const m = S.grp(); L.put(S, "ep89-mint", 0, 0, { s: 0.9, parent: m }); m.setAttribute("transform", `translate(1010 ${y0 - 90})`); tl.set(m, { opacity: 0 }, 0); tl.set(m, { opacity: 1 }, mintT); tl.fromTo(m, { attr: { transform: `translate(1010 ${y0 - 90})` } }, { attr: { transform: `translate(1010 ${y1 - 90})` }, duration: dur, ease: "power1.inOut", immediateRender: false }, t0); }
};
shot(51, 0, (S) => {
  L.put(S, "ep89-cutaway", 0, 0);
  L.put(S, "ep89-counter", 960, 330, {});
  clerk(S, 1500, 330, { s: 0.75, face: "smile" });
  dave(S, 360, 330, { s: 0.75, face: "relieved", pose: "reach" });
  sink(S, 70, 760, W(51, 4), Math.max(3, S.end - W(51, 4) - 0.8));
  [["COUNTER", 230, 6], ["FLOOR", 346, 8], ["DRAINS", 528, 10], ["ROCK", 760, 14]].forEach(([s, y, w]) => card(S, s, 1700, y, { t: W(51, w), size: DS.type.caption * 0.75 }));
}, { cam: "none" });
shot(51, 14, (S) => {
  field(S, "gray", 0);
  fillP(S, rect(0, 0, 1920, 560), "gray", 0, 1); fillP(S, rect(0, 560, 1920, 520), "red", 2, 1); fillP(S, rect(0, 560, 1920, 520), "orange", 1, 0.25);
  sink(S, 120, 800, W(51, 15), Math.max(3, S.end - W(51, 15) - 0.6), W(51, 20));
  card(S, "AS IF IT WAS FOG", 560, 200, { t: W(51, 16), size: DS.type.caption * 0.85, fill: "yellow" });
}, { cam: "none" });
// 52-55 the form
const formShot = (c, w, rows, who, dface, cardText, cw) => shot(c, w, (S) => {
  deskScene(S, { face: who });
  dave(S, 420, 960, { s: 1.1, face: dface });
  L.put(S, "ep89-form", 1650, 480, { s: 0.72, rows });
  if (cardText) card(S, cardText, 960, 610, { t: W(c, cw), size: DS.type.caption * 0.85 });
}, { cam: c % 2 ? "pull" : "push" });
formShot(52, 0, [["ITEM", "Black hole"], ["NAME", ""], ["LAST SEEN", ""], ["OWNER", ""]], "smile", "worried", "A NAME, FOR THE FORM", 5);
formShot(53, 0, [["ITEM", "Black hole"], ["NAME", "Pocket"], ["LAST SEEN", ""], ["OWNER", ""]], "smile", "sad", "POCKET", 0);
formShot(54, 0, [["ITEM", "Black hole"], ["NAME", "Pocket"], ["LAST SEEN", ""], ["OWNER", ""]], "smile", "worried", "LAST SEEN?", 4);
formShot(55, 0, [["ITEM", "Black hole"], ["NAME", "Pocket"], ["LAST SEEN", "Centre of Earth"], ["OWNER", ""]], "smile", "smile", "IN ABOUT FORTY MINUTES", 8);
// 56 "He stamps the form. Lost property: one black hole. Owner: the planet."
shot(56, 0, (S) => {
  office(S, 4, 58);
  clerk(S, 700, 870, { s: 1.2, face: "smile" });
  counter(S, 800, 900, {});
  L.put(S, "ep89-form", 1400, 460, { s: 0.85, rows: [["ITEM", "Black hole"], ["NAME", "Pocket"], ["LAST SEEN", "Centre of Earth"], ["OWNER", "The planet"]], t: S.start });
  L.put(S, "ep89-stamp", 1700, 700, { s: 1.0, t: W(56, 2) });
  L.put(S, "stamp-fact", 1400, 800, { s: 0.85, text: "FILED", c: "red", rot: -8, t: W(56, 4) });
  S.sfx(W(56, 4), "stamp", 1330); S.kick(W(56, 4), 4);
}, { cam: "push" });
