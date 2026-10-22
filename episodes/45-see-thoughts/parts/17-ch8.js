// ===================== chapter 8: The oven (clips 76-82) =====================
// 76 "On day five, the bubbles start to fade, and Dave lets them."
shot(76, 0, (S) => {
  bg(S, "scene-suburb-day");
  [["girl04", 360], ["man03", 700], ["girl07", 1280], ["man08", 1600]].forEach(([st, x], i) => {
    guy(S, st, x, 945, { s: 0.9, face: "smile", flip: i > 1 });
    fadeOut(think(S, x, 945 - HEAD * 0.9, { s: 0.42, seed: 760 + i, text: ["lunch?", "", "oven?", "glad"][i] }), W(76, 5) + i * 0.15, 2.2, 0.08);
  });
  dave(S, 980, 960, { s: 1.05, face: "relieved" });
  clock(S, "DAY 5");
});
// 77 "So what would really happen if you could see everyone's thoughts? An hour of superpower, then a flood."
const tri = (S, n) => {
  card(S, "WHAT IF YOU COULD SEE EVERYONE'S THOUGHTS?", 960, 110);
  const P = [[410, 1], [960, 2], [1510, 3]];
  P.forEach(([x, k]) => { if (k <= n) panel(S, x, 540, 480, 560, S.start); });
  dave(S, 410, 760, { s: 0.75, face: "excited", outfit: "superhero", outfitC: "red", pose: "cheer" });
  L.put(S, "thought-pic", 410, 380, { s: 0.35, noTail: true, pic: "prop-umbrella-ducks", picS: 1.3, seed: 771 });
  card(S, "SUPERPOWER", 410, 880);
  return P;
};
shot(77, 0, (S) => {
  tri(S, 2);
  const g = S.grp();
  L.put(S, "thought-flood", 960, 400, { s: 0.28, n: 24, seed: 772, parent: g });
  dave(S, 960, 760, { s: 0.75, face: "nervous", parent: g });
  card(S, "FLOOD", 960, 880, { t: W(77, 15) });
  fadeG(S, g, W(77, 15));
});
// 78 "And then, if you read slowly, a relief. Other heads are as messy as yours, and they like you more than you think."
shot(78, 0, (S) => {
  tri(S, 3);
  L.put(S, "thought-flood", 960, 400, { s: 0.28, n: 24, seed: 772 }); dave(S, 960, 760, { s: 0.75, face: "nervous" }); card(S, "FLOOD", 960, 880);
  const g = S.grp();
  L.put(S, "thought-pic", 1510, 380, { s: 0.35, noTail: true, pic: "p2-heart-full", picS: 1.3, seed: 781, parent: g });
  dave(S, 1510, 760, { s: 0.75, face: "relieved", acc: ["glasses"], parent: g });
  fadeG(S, g, W(78, 4));
  card(S, "RELIEF", 1510, 880, { t: W(78, 6), fill: "green" });
});
// 79 "At the bus stop, his neighbour looks worried. Dave doesn't read his bubble. He asks."
const stop = (S) => { bg(S, "scene-suburb-day"); L.put(S, "ride-bus-stop", 1620, 940, { s: 1.4, time: "day" }); };
shot(79, 0, (S) => {
  stop(S);
  guy(S, NEIGH.style, 1160, 950, Object.assign({}, NEIGH, { s: 1.1, face: "worried", flip: true }));
  think(S, 1160, 950 - HEAD * 1.1, { s: 0.42, kind: "faint", text: "oven?", size: DS.type.title, seed: 791 });
  const g = S.grp(); dave(S, 520, 955, { s: 1.1, face: "smile", acc: ["glasses"], pose: "cyc-walk-1", parent: g });
  shift(g, S.start, 2.0, [0, 0], [180, 0], "power1.out");
});
// 80 (@dave) "Everything okay? You look like you're thinking hard."
shot(80, 0, (S) => {
  stop(S);
  guy(S, NEIGH.style, 1160, 950, Object.assign({}, NEIGH, { s: 1.1, face: "worried", flip: true }));
  daveTalk(S, 700, 955, { face: "smile", acc: ["glasses"], pose: "wave" }, 80);
});
// 81 "His neighbour laughs. He's wondering if he left the oven on."
shot(81, 0, (S) => {
  stop(S);
  const a = guy(S, NEIGH.style, 1160, 950, Object.assign({}, NEIGH, { s: 1.1, face: "worried", flip: true }));
  swap(a, guy(S, NEIGH.style, 1160, 950, Object.assign({}, NEIGH, { s: 1.1, face: "laugh", flip: true, pose: "head" })), W(81, 1));
  dave(S, 700, 955, { s: 1.1, face: "happy", acc: ["glasses"] });
  L.put(S, "bubble-round", 1330, 330, { s: 0.8, text: "Did I leave the oven on?", tail: "left", t: W(81, 4) });
});
// 82 "Dave knows the feeling. He walks home to check his own."  (last image: Dave's own bubble, at last)
shot(82, 0, (S) => {
  bg(S, "scene-suburb-day");
  const g = S.grp(); dave(S, 760, 955, { s: 1.1, face: "worried", acc: ["glasses"], pose: "cyc-walk-2", parent: g });
  think(S, 760, 955 - HEAD * 1.1, { s: 0.6, text: "Did I leave|the oven on?", seed: 7, dx: 80, t: W(82, 2), parent: g });
  shift(g, W(82, 4), 3.4, [0, 0], [320, 0], "power1.inOut");
}, { cam: "pull" });
