// ===================== chapter 4: 4:22 pm (clips 24-31) =====================
const zoneRing = (S, x, gy, r, t) => L.put(S, "ep89-zone", x, gy - 30, { r, t });
// 24 "Now, the gravity. A hole this heavy, packed into a dot, pulls hard on anything close. Within two and a half metres, it pulls harder than the Earth does."
shot(24, 0, (S) => {
  street(S);
  const [tx, ty] = held(S, 760, 950, { s: 1.25, face: "worried" });
  [[1250, 470, "ep-coin-plain", 0.6], [1400, 700, "prop-key", 1.0], [1180, 820, "ep89-mint", 1.2], [1520, 560, "ep89-bowler", 0.7]].forEach(([x, y, n, k], i) => {
    L.put(S, n, x, y, { s: k });
    S.arrow(x - 60, y, tx + 120, ty, W(24, 8) + i * 0.15, 0.4, { c: DS.c("red", 2), w: DS.w.near, bend: 0.12 });
  });
  card(S, "IT PULLS ON EVERYTHING CLOSE", 960, 200, { t: W(24, 8), size: DS.type.caption * 0.85 });
}, { cam: "push" });
shot(24, 16, (S) => {
  street(S);
  zoneRing(S, 960, 960, 560, S.start);
  held(S, 960, 940, { s: 1.2, face: "worried" });
  S.arrow(960, 900, 960 + 520, 900, W(24, 17), 0.6, { c: DS.c("red", 2), w: DS.w.near, head: true });
  card(S, "2.5 M", 1320, 800, { t: W(24, 18), size: DS.type.small, fill: "yellow" });
  card(S, "STRONGER THAN EARTH'S PULL", 960, 200, { t: W(24, 22), size: DS.type.caption * 0.85 });
}, { cam: "pull" });
// 25 "So you must walk round everybody. Through the park. Around the bus queue. Round the dog with the stick. You have to cover a kilometre in a very polite arc."
shot(25, 0, (S) => {
  park(S);
  const g = S.grp(); const a = held(S, 400, 950, { s: 1.0, face: "worried", parent: g });
  shift(g, S.start + 0.3, 4.2, [0, 0], [180, 0]);
  [[1150, 880], [1400, 900], [1650, 880]].forEach(([x, y], i) => person(S, ["man03", "girl05", "man08"][i], x, y, { s: 0.85, face: "smile", t: W(25, 5) + i * 0.15 }));
  S.draw(poly([[400, 700], [800, 640], [1150, 600], [1500, 660], [1840, 760]]), W(25, 4), 1.2, { c: DS.c("red", 1), w: DS.w.detail });
  card(S, "THROUGH THE PARK", 960, 200, { t: W(25, 4), size: DS.type.caption * 0.85 });
}, { cam: "push" });
shot(25, 8, (S) => {
  street(S);
  L.put(S, "ride-bus-stop", 560, 880, { s: 1.15 });
  [[420, 900], [520, 900], [620, 900]].forEach(([x, y], i) => person(S, ["man05", "girl07", "man09"][i], x, y, { s: 0.85, face: i === 1 ? "worried" : "smile", t: W(25, 10) + i * 0.1 }));
  L.put(S, "animal-dog", 1280, 900, { s: 1.0, t: W(25, 14) });
  S.draw(line([1370, 905], [1470, 820]), W(25, 16), 0.3, { c: DS.c("brown", 1), w: DS.w.near });
  card(S, "BUS QUEUE", 520, 270, { t: W(25, 10), size: DS.type.caption * 0.8 });
  card(S, "DOG WITH A STICK", 1300, 270, { t: W(25, 14), size: DS.type.caption * 0.8 });
  held(S, 930, 950, { s: 0.95, face: "worried" });
}, { cam: "pull" });
shot(25, 20, (S) => {
  field(S, "sand", 1);
  fillP(S, rect(0, 600, 1920, 480), "grass", 0, 0.5);
  L.put(S, "bld-house-a", 300, 760, { s: 0.9 }); L.put(S, "bld-office", 1620, 760, { s: 1.0 });
  S.draw("M360 840 C600 560 800 560 960 700 C1100 840 1300 880 1560 840", W(25, 22), 1.6, { c: DS.c("red", 1), w: DS.w.near });
  card(S, "ABOUT A KILOMETRE", 960, 200, { t: W(25, 22), size: DS.type.caption * 0.85, fill: "yellow" });
  card(S, "A VERY POLITE ARC", 960, 330, { t: W(25, 27), size: DS.type.caption * 0.8 });
}, { cam: "zoom" });
// 26 "Even so, a man's hat leaves his head and orbits the tin. A pigeon decides to walk. A bench tilts, very slowly, towards your hands."
shot(26, 0, (S) => {
  street(S);
  const [tx, ty] = held(S, 600, 950, { s: 1.25, face: "worried" });
  person(S, "man07", 1380, 940, { s: 1.1, hair: "bald", face: "wow", pose: "head" });
  orbit(S, "ep89-bowler", tx, ty - 40, 190, 60, { a0: 3.5, turns: 2, t: W(26, 6), opt: { s: 0.8 } });
  card(S, "A HAT LEAVES HIS HEAD", 960, 200, { t: W(26, 3), size: DS.type.caption * 0.85 });
}, { cam: "push" });
shot(26, 12, (S) => {
  street(S);
  fillP(S, rect(0, 880, 1920, 200), "gray", 1, 0.9);
  const b = S.grp(); L.put(S, "bench", 1340, 900, { s: 1.5, parent: b });
  spin(b, W(26, 18), 3.5, 0, 7, 1340, 900);
  L.put(S, "ep89-pigeon", 520, 910, { s: 1.5 });
  const p = L.put(S, "ep89-pigeon", 520, 910, { s: 1.5, step: true }); p.setAttribute("opacity", 0);
  for (let t = S.start + 0.4; t < S.start + 4; t += 0.5) { tl.set(p, { opacity: 1 }, t); tl.set(p, { opacity: 0 }, t + 0.25); }
  held(S, 880, 950, { s: 1.0, face: "worried" });
  card(S, "A PIGEON DECIDES TO WALK", 520, 330, { t: W(26, 13), size: DS.type.caption * 0.75 });
  card(S, "THE BENCH TILTS", 1340, 330, { t: W(26, 17), size: DS.type.caption * 0.75 });
}, { cam: "pull" });
// 27 (@news) "Breaking news. A man is walking down the high street carrying a biscuit tin. Nearby lampposts are leaning."
shot(27, 0, (S) => {
  L.put(S, "world-tv-studio", 0, 0);
  L.put(S, "job-news-anchor", 960, 920, { s: 1.3 });
  fillP(S, rrect(260, 800, 1400, 120, DS.r.md), "red", 1, 1);
  txt(S, "BREAKING NEWS", 960, 880, { size: DS.type.small, c: DS.c("white", 0), t: W(27, 0) });
}, { cam: "push" });
shot(27, 10, (S) => {
  street(S);
  fillP(S, rect(0, 880, 1920, 200), "gray", 1, 0.9);
  held(S, 960, 950, { s: 1.1, face: "worried" });
  [[300, 1], [620, 0.9], [1320, 0.9], [1640, 1]].forEach(([x, k], i) => { const g = S.grp(); L.put(S, "lamp-post", x, 900, { s: 1.6 * k, parent: g }); spin(g, W(27, 12) + i * 0.1, 3, 0, (x < 960 ? 6 : -6), x, 900); });
  card(S, "LAMPPOSTS ARE LEANING", 960, 200, { t: W(27, 12), size: DS.type.caption * 0.85, fill: "yellow" });
}, { cam: "pull" });
// 28-31
const hatTalk = (S, c, w, who, dface) => {
  street(S);
  const [tx, ty] = held(S, 600, 950, { s: 1.15, face: dface });
  person(S, "man07", 1400, 940, { s: 1.1, hair: "bald", face: who, pose: "point", flip: true });
  orbit(S, "ep89-bowler", tx, ty - 10, 210, 60, { a0: 1, turns: 2.5, opt: { s: 0.7 } });
};
shot(28, 0, (S) => { hatTalk(S, 28, 0, "worried", "nervous"); tag(S, "BYSTANDER", 1400, 280, { t: W(28, 0) }); }, { cam: "push" });
shot(29, 4, (S) => { hatTalk(S, 29, 4, "flat", "embarrassed"); card(S, "A VERY SMALL BLACK HOLE", 960, 200, { t: W(29, 8), size: DS.type.caption * 0.8 }); }, { cam: "pull" });
shot(30, 0, (S) => { hatTalk(S, 30, 0, "confused", "worried"); card(S, "HAT-STEALING OR GENERAL?", 960, 200, { t: W(30, 2), size: DS.type.caption * 0.8 }); }, { cam: "push" });
shot(31, 0, (S) => { hatTalk(S, 31, 0, "flat", "silly"); card(S, "IT TAKES WHATEVER IT LIKES", 960, 200, { t: W(31, 7), size: DS.type.caption * 0.8, fill: "yellow" }); }, { cam: "pull" });
