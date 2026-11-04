// ===================== chapter 6: 4:45 pm, the bench (clips 38-45) =====================
const parkSet = (S, sunset) => L.put(S, sunset ? "scene-park-sunset" : "scene-park-day", 0, 0);
const benchDave = (S, o = {}) => { // Dave on the bench holding the tin; the bench leans towards him
  const b = S.grp(); L.put(S, "bench", 900, 900, { s: 1.9, parent: b });
  spin(b, S.start + 0.4, 3, 0, 5, 900, 900);
  const d = dave(S, 880, 880, { s: 1.0, pose: "sit-chair", face: o.face || "worried" });
  tin(S, 1010, 760, { s: 0.45, glow: false });
};
// 38 "You sit on a bench. The bench leans towards you. You lean back."
shot(38, 0, (S) => { parkSet(S); benchDave(S); card(S, "THE BENCH LEANS TOWARDS YOU", 960, 220, { t: W(38, 5), size: DS.type.caption * 0.85 }); }, { cam: "push" });
// 39 "A small child stops in front of you, looking at the tin. Not at you. At the tin."
shot(39, 0, (S) => {
  parkSet(S); benchDave(S, { face: "surprised" });
  const k = person(S, "girl05", 1500, 930, { s: 0.7, body: "kid", face: "wow", flip: true });
  shift(k, S.start, 0.1, [0, 0], [0, 0]);
  S.arrow(1360, 700, 1090, 760, W(39, 10), 0.4, { c: DS.c("orange", 1), w: DS.w.near });
  card(S, "NOT AT YOU. AT THE TIN.", 960, 220, { t: W(39, 12), size: DS.type.caption * 0.85, fill: "yellow" });
}, { cam: "pull" });
// 40-44 the child
const kid = (S, x, face, flip = true, extra = {}) => person(S, "girl05", x, 940, Object.assign({ s: 1.0, body: "kid", face, flip }, extra));
shot(40, 0, (S) => { parkSet(S, true); kid(S, 640, "smile", false); tin(S, 1350, 780, { s: 0.7 }); tag(S, "CHILD", 640, 330, { t: W(40, 0) }); card(S, "BISCUITS, OR SOMETHING BETTER?", 960, 200, { t: W(40, 9), size: DS.type.caption * 0.8 }); }, { cam: "push" });
shot(41, 0, (S) => { parkSet(S, true); held(S, 640, 950, { s: 1.15, face: "smile" }); kid(S, 1500, "wow", true, { s: 0.8 }); card(S, "OLDER THAN THE MOON", 960, 200, { t: W(41, 10), size: DS.type.caption * 0.85, fill: "yellow" }); }, { cam: "pull" });
shot(42, 0, (S) => { parkSet(S, true); kid(S, 620, "thinking", false); tin(S, 1350, 780, { s: 0.7 }); card(S, "DOES IT HAVE A NAME?", 960, 200, { t: W(42, 3), size: DS.type.caption * 0.85 }); }, { cam: "push" });
shot(43, 0, (S) => { parkSet(S, true); held(S, 640, 950, { s: 1.15, face: "sad" }); kid(S, 1500, "thinking", true, { s: 0.8 }); card(S, "NOBODY EVER GAVE IT A NAME", 960, 200, { t: W(43, 5), size: DS.type.caption * 0.8 }); }, { cam: "pull" });
shot(44, 0, (S) => { parkSet(S, true); kid(S, 620, "sad", false); tin(S, 1350, 780, { s: 0.7 }); card(S, "THEN IT IS LONELY", 960, 200, { t: W(44, 4), size: DS.type.small, fill: "yellow" }); }, { cam: "push" });
// 45 "You do not answer. You look at the tin for a long time. You are a man with a billion tonnes, and a mint."
shot(45, 0, (S) => {
  parkSet(S, true);
  S.fill(rect(-40, -40, 2000, 1160), T0(S), 0, DS.c("navy", 2), 0.35);
  dave(S, 760, 950, { s: 1.4, face: "sad", pose: "look-down" });
  tin(S, 1150, 800, { s: 1.4, glow: true });
}, { cam: "zoom", focus: "1100 700" });
shot(45, 12, (S) => {
  parkSet(S, true);
  S.fill(rect(-40, -40, 2000, 1160), T0(S), 0, DS.c("navy", 2), 0.35);
  tin(S, 960, 640, { s: 1.6 });
  L.put(S, "ep89-mint", 1250, 590, { s: 1.8, t: W(45, 18) });
  card(S, "A BILLION TONNES... AND A MINT", 960, 200, { t: W(45, 15), size: DS.type.caption * 0.85 });
}, { cam: "pull" });
