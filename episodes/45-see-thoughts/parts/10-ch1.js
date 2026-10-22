// ===================== chapter 1: The first bubble (clips 1-9) =====================
// 1 "This is Dave. This morning, Dave opened his curtains..."
shot(1, 0, (S) => {
  bg(S, "kit-room-bedroom-day", { time: "day" });
  const cl = S.grp(), cr = S.grp();
  DS.shape(S, rect(1262, 150, 160, 350), "red", { w: "mid", parent: cl }); DS.shape(S, rect(1422, 150, 160, 350), "red", { w: "mid", parent: cr });
  DS.shape(S, rect(1240, 136, 364, 22), "wood", { w: "detail" });
  shift(cl, W(1, 7), 0.9, [0, 0], [-150, 0]); shift(cr, W(1, 7), 0.9, [0, 0], [150, 0]);
  const a = dave(S, 1180, 955, { pose: "armsUp", face: "sleepy", outfit: "pyjamas", outfitC: "sky" });
  swap(a, dave(S, 1180, 955, { pose: "reach", face: "smile", outfit: "pyjamas", outfitC: "sky" }), W(1, 5));
  card(S, "THIS IS DAVE", 560, 160);
}, { cam: "push" });
// 1 "...and saw a small white bubble above his neighbour's head."
shot(1, 9, (S) => {
  bg(S, "scene-suburb-day");
  guy(S, NEIGH.style, 1150, 905, Object.assign({}, NEIGH, { s: 1.15, face: "thinking", pose: "hips" }));
  think(S, 1150, 905 - HEAD * 1.15, { s: 0.42, t: W(1, 13), noText: true, dx: 90 });
  windowFrame(S);
}, { cam: "zoom", focus: "1150 520" });
// 2 "It said: did I leave the oven on?"
shot(2, 0, (S) => {
  bg(S, "scene-suburb-day");
  guy(S, NEIGH.style, 1150, 905, Object.assign({}, NEIGH, { s: 1.15, face: "worried", pose: "think" }));
  think(S, 1150, 905 - HEAD * 1.15, { s: 0.66, t: W(2, 2), text: "Did I leave|the oven on?", dx: 60 });
  windowFrame(S);
}, { cam: "push" });
// 3 "Every head Dave can see now has a bubble showing what that person is thinking."
shot(3, 0, (S) => {
  bg(S, "scene-suburb-day");
  L.put(S, "job-mail-carrier", 430, 930, { s: 0.95 });
  guy(S, "girl04", 860, 930, { outfit: "dress", outfitC: "pink", s: 0.95, face: "happy" });
  L.put(S, "animal-dog", 1010, 930, { s: 0.55 });
  guy(S, NEIGH.style, 1430, 930, Object.assign({}, NEIGH, { s: 0.95, face: "worried" }));
  think(S, 430, 930 - HEAD * 0.95, { s: 0.48, t: W(3, 1), text: "is that dog|friendly?", seed: 3 });
  think(S, 860, 930 - HEAD * 0.95, { s: 0.48, t: W(3, 8), pic: "prop-sandwich", picS: 1.2, seed: 5, dx: -40 });
  think(S, 1430, 930 - HEAD * 0.95, { s: 0.48, t: W(3, 12), text: "oven?", size: DS.type.title, seed: 9 });
  windowFrame(S);
});
// 4 "Every head except one. Dave can't see above his own."
shot(4, 0, (S) => {
  bg(S, "kit-room-bedroom-day", { time: "day" });
  dave(S, 600, 960, { s: 1.4, pose: "look-up", face: "confused", outfit: "pyjamas", outfitC: "sky" });
  think(S, 600, 960 - HEAD * 1.4, { s: 0.55, t: W(4, 4), kind: "faint", text: "?", size: DS.type.display, seed: 4 });
  card(S, "EXCEPT ONE", 1480, 300, { t: W(4, 0) });
}, { cam: "zoom", focus: "600 480" });
// 5 "So what would really happen if you could see everyone's thoughts? For about an hour, it's a superpower."
shot(5, 0, (S) => {
  bg(S, "sky-day");
  L.put(S, "ground-path-day", 0, 860);
  const a = dave(S, 960, 940, { s: 1.25, pose: "think", face: "wow" });
  swap(a, dave(S, 960, 940, { s: 1.25, pose: "cheer", face: "excited", outfit: "superhero", outfitC: "red" }), W(5, 16));
  L.put(S, "thought-pic", 470, 420, { s: 0.55, noTail: true, pic: "prop-umbrella-ducks", picS: 1.1, t: W(5, 7), seed: 2 });
  L.put(S, "thought-pic", 1450, 420, { s: 0.55, noTail: true, text: "?", size: DS.type.display, t: W(5, 8), seed: 6 });
  L.put(S, "thought-pic", 960, 330, { s: 0.42, noTail: true, pic: "sign-heart", picS: 1.2, t: W(5, 9), seed: 8 });
  card(S, "WHAT IF YOU COULD SEE EVERYONE'S THOUGHTS?", 960, 110);
  card(S, "FOR ABOUT 1 HOUR", 1500, 700, { t: W(5, 11), fill: "yellow" });
});
// 6 "By hour six, he'll know what his friends really think of him."
shot(6, 0, (S) => {
  bg(S, "room-restaurant-light");
  dave(S, 640, 950, { s: 1.05, face: "nervous" });
  guy(S, SAM.style, 1110, 950, Object.assign({}, SAM, { face: "smile" }));
  guy(S, JO.style, 1420, 950, Object.assign({}, JO, { face: "smile", flip: true }));
  think(S, 1110, 950 - HEAD * 1.05, { s: 0.45, t: W(6, 7), kind: "faint", text: "...", size: DS.type.display, seed: 12, dx: -40 });
  think(S, 1420, 950 - HEAD * 1.05, { s: 0.45, t: W(6, 8), kind: "faint", text: "...", size: DS.type.display, seed: 13, dx: 60 });
  clock(S, "HOUR 6");
});
// 6 "By day two, a crowded train will nearly drown him in other people's heads."
shot(6, 12, (S) => {
  L.put(S, "ride-subway-interior", 960, 1010, { s: 2.15, crowd: true });
  [["man02", 330, "flat"], ["girl05", 620, "bored"], ["man07", 1320, "tired"], ["girl09", 1600, "flat"]].forEach(([st, x, f]) => guy(S, st, x, 975, { s: 1.0, face: f }));
  dave(S, 960, 975, { s: 1.0, face: "nervous" });
  L.put(S, "thought-flood", 960, 290, { s: 0.95, n: 30, seed: 61, t: W(6, 17) });
  clock(S, "DAY 2");
});
// 7 "And by day four, he'll be scared of his own."
shot(7, 0, (S) => {
  bg(S, "room-living-room-light");
  dave(S, 960, 880, { s: 1.15, face: "scared", acc: ["beanie"], accC: "red" });
  L.put(S, "furn-sofa", 960, 945, { s: 1.6, c: "blue" });
  think(S, 960, 880 - HEAD * 1.15, { s: 0.5, t: W(7, 6), kind: "faint", text: "?", size: DS.type.display, seed: 14 });
  clock(S, "DAY 4");
});
// 8 "Inside Dave's head, a tired little librarian looks up from her desk. That's his brain."
shot(8, 0, (S) => {
  bg(S, "kit-room-library-day", { time: "day" });
  const a = brain(S, 960, 820, 1.7, "tired");
  swap(a, brain(S, 960, 820, 1.7, "smile", { armL: "up" }), W(8, 7));
  L.put(S, "kit-desk-library", 960, 945, { s: 1.4 });
  card(S, "DAVE'S BRAIN", 960, 150, { t: W(8, 12) });
}, { cam: "zoom", focus: "960 560" });
// 9 (@brain) "Heads have lids for a reason, Dave. You'll see."
shot(9, 0, (S) => {
  bg(S, "kit-room-library-day", { time: "day" });
  brainTalk(S, 820, 960, 2.3, "stern", 9, { armR: "point" });
  dave(S, 1450, 960, { s: 0.95, face: "confused", pose: "scratch-head" });
}, { cam: "push" });
