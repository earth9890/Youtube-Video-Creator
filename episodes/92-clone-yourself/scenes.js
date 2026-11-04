// look: still
// motion: v2
// @library auto
// What If You Cloned Yourself? (~7 min). Mission format: Dave clones himself to finish Gran's boat; the clone grows up (Dave Two, later Arlo) and refuses to be a copy.
// RUNNERS: (1) THE BOAT: one ep92-boat on trestles in the same garage all episode (1 plank), plank two + a crooked plank three at the end, then afloat (ep92-boat-lake). (2) THE CLONE = Dave's pure stick figure scaled by age (baby .30, 1 yr .42, 5 .62, 6 .66, 13 .92, 18 1.0) + ONE marker at every age: a small orange neckerchief (ep92-mark); from 13 also a white apron and flour; a green toy dinosaur at 5-6. Dave never wears it. (3) HUD top-right "CLONE AGE n / PLANKS n", per chapter; the script's # hud lines as exact cards.
// Cast: Dave = kit-dave; Gran = grey-bun stick woman; speakers get mouth flaps + a name tag while they talk (DAVE / ARLO / DAVE TWO / BRAIN / SCIENTIST / NEWS / MR PUGH). No real people, no gore (Dolly is a calm sheep).
// ---------- timing: shots register with their cue and run in order at the end ----------
const SHOTS = [];
const shot = (c, w, fn, o = {}) => SHOTS.push({ c, w, fn, o });
const END = (c) => CLIP(c)[1];
const T0 = (S) => Math.max(0, S.start - 0.6);
// ---------- text ----------
const card = (S, s, x, y, o = {}) => { const t = o.t ?? T0(S); if (t > S.start + 0.3) S.sfx(t, "pop", x); return DS.card(S, s, x, y, Object.assign({ size: DS.type.caption }, o, { t })); };  // a card landing on its word gets a soft pop
const txt = (S, s, x, y, o = {}) => S.text(s, x, y, Object.assign({ size: DS.type.small, c: DS.c("ink"), t: T0(S) }, o));
const fadeG = (S, g, t, dur = 0.35) => { if (t !== undefined && t > S.start + 0.05) tl.fromTo(g, { opacity: 0 }, { opacity: 1, duration: dur, immediateRender: false }, t); return g; };
const fadeOut = (g, t, dur = 0.35, to = 0) => tl.to(g, { opacity: to, duration: dur }, t);
const swap = (a, b, t, dur = 0.35) => { fadeOut(a, t, dur); tl.fromTo(b, { opacity: 0 }, { opacity: 1, duration: dur, immediateRender: false }, t); b.setAttribute("opacity", 0); };
const shift = (g, t, dur, from, to, ease = "power1.inOut") => tl.fromTo(g, { attr: { transform: `translate(${from[0]} ${from[1]})` } }, { attr: { transform: `translate(${to[0]} ${to[1]})` }, duration: dur, ease, immediateRender: false }, t);
// a card that lives from word cue t0 to t1
const note = (S, s, x, y, t0, t1, o = {}) => { const c = card(S, s, x, y, Object.assign({}, o, { t: t0 })); if (t1) fadeOut(c.g, t1); return c; };
// ---------- backgrounds ----------
const bg = (S, name, o = {}) => L.put(S, name, 0, 0, o);
const field = (S, name, tone = 1) => S.fill(rect(-40, -40, 2000, 1160), T0(S), 0, DS.c(name, tone), 1);
const pasture = (S, o = {}) => DS.outdoor(S, Object.assign({ hy: 620, ground: "grass", hills: "grass", sun: [1560, 200] }, o));
// ---------- people ----------
const AGE = { 0: 0.3, 1: 0.42, 3: 0.5, 5: 0.62, 6: 0.66, 13: 0.92, 18: 1.0 };
const FLAP = [1, 2, 0, 2, 1, 2, 0, 1, 2, 2, 0, 1];
const flaps = (a, b, t0, t1) => { let i = 0; for (let t = t0; t < t1 - 0.1; t += 0.2, i++) { const s = FLAP[i % FLAP.length]; tl.set(a, { opacity: s === 1 ? 1 : 0 }, t); tl.set(b, { opacity: s === 2 ? 1 : 0 }, t); } tl.set(a, { opacity: 0 }, t1); tl.set(b, { opacity: 0 }, t1); };
// who: "dave" | "clone". o: s, age (clone), face, pose, flip, apron, flour, talk (clip number to flap on), tag ("ARLO"), t (fade in at)
const person = (S, who, x, gy, o = {}) => {
  const g = S.grp(o.parent), s = o.s ?? (who === "clone" ? AGE[o.age ?? 18] : 1);
  const base = (extra) => L.put(S, "kit-dave", x, gy, Object.assign({ s, face: o.face || "smile", pose: o.pose, flip: o.flip, acc: o.acc, parent: g }, extra));
  base({});
  if (o.talk) {
    const m = (mo) => { const k = base({ mouth: mo }); k.setAttribute("opacity", 0); return k; };
    flaps(m("o"), m("a"), W(o.talk, 0), END(o.talk));
  }
  if (who === "clone") {
    const age = o.age ?? 18, ap = o.apron ?? age >= 13;
    L.put(S, "ep92-mark", x, gy, { s, apron: ap, flour: o.flour ?? ap, parent: g, flip: o.flip });
  }
  if (o.talk) {
    const nm = o.tag || (who === "dave" ? "DAVE" : (o.age ?? 18) >= 13 ? "ARLO" : "DAVE TWO");
    const c = DS.card(S, nm, x, gy - 420 * s - 44, { size: DS.type.caption, fill: who === "dave" ? "sky" : "orange", t: W(o.talk, 0) });
    fadeOut(c.g, END(o.talk) + 0.1);
  }
  if (o.t !== undefined) fadeG(S, g, o.t);
  return g;
};
const dave = (S, x, gy, o = {}) => person(S, "dave", x, gy, o);
const clone = (S, age, x, gy, o = {}) => person(S, "clone", x, gy, Object.assign({ age }, o));
// speaker tag over a non-Dave/clone character (BRAIN, SCIENTIST, NEWS, MR PUGH) while clip c is spoken
const nameTag = (S, name, x, y, c, fill = "yellow") => { const t = DS.card(S, name, x, y, { size: DS.type.caption, fill, t: W(c, 0) }); fadeOut(t.g, END(c) + 0.1); return t; };
const brain = (S, x, gy, o = {}) => L.put(S, "kit-brain-" + (o.face || "worried"), x, gy, Object.assign({ s: 0.6 }, o));
const gran = (S, x, gy, o = {}) => {
  const g = S.grp(o.parent), s = o.s ?? 1.0;
  L.put(S, "person", x, gy, { style: "girl02", body: "elderly", hair: "bun", hairC: "gray", outfit: "sweater", outfitC: "purple", face: o.face || "smile", pose: o.pose || "stand", flip: o.flip, s, parent: g });
  if (o.t !== undefined) fadeG(S, g, o.t);
  return g;
};
const neighbour = (S, x, gy, o = {}) => L.put(S, "person", x, gy, Object.assign({ style: "man02", body: "elderly", hair: "none", outfit: "sweater", outfitC: "green", acc: ["glasses"], face: "smile", s: 1.0 }, o));
// ---------- the boat (one object, same garage all episode) ----------
const boat = (S, x, gy, planks, o = {}) => L.put(S, "ep92-boat", x, gy, Object.assign({ s: 0.9, planks }, o));
const noTyres = (g) => g.querySelectorAll("path").forEach((p) => { if (/^M(394|424) (660|680|700) A(56 20|26 10) /.test(p.getAttribute("d") || "")) p.style.display = "none"; });  // ponytail: hides the garage's tyre stack (it read as a black blob on Dave's neck); matched by its path data in room-garage-light
const garage = (S, planks = 1, o = {}) => { const r = bg(S, o.dark ? "room-garage-dark" : "room-garage-light"); if (!o.dark) noTyres(r); if (!o.noBoat) return boat(S, o.bx ?? 960, o.by ?? 900, planks, { s: o.bs ?? 0.9 }); };
const web = (S, x, y, k = 1.2) => L.put(S, "nat-spider-web", x, y, { s: k });
// ---------- infographics ----------
const dots = (S, cx, cy, n, cols, gap, r, color, t0, dt) => { // n dots in a grid, revealed in 5 sweeps
  const rows = Math.ceil(n / cols), w = (cols - 1) * gap, h = (rows - 1) * gap, chunks = [[], [], [], [], []];
  for (let i = 0; i < n; i++) { const x = cx - w / 2 + (i % cols) * gap, y = cy - h / 2 + Math.floor(i / cols) * gap; chunks[Math.floor((i / n) * 5)].push(circ(x, y, r, r)); }
  chunks.forEach((c, k) => S.fill(c.join(" "), t0 + k * dt, 0.25, color, 1));
  return [cx - w / 2 + ((n - 1) % cols) * gap, cy - h / 2 + Math.floor((n - 1) / cols) * gap];
};
const fingerprint = (S, cx, cy, k, kind, t, c = DS.c("ink")) => {
  for (let i = 1; i <= 7; i++) {
    const r = 12 * i * k;
    if (kind === "loop") S.draw(arc(cx, cy, r, 200 + i * 6, 520 - i * 5, r * 1.25), t + i * 0.05, 0.4, { c, w: DS.w.mid });
    else S.draw(arc(cx, cy + (i < 4 ? 0 : (i - 3) * 6 * k), r, i % 2 ? 150 : 190, i % 2 ? 450 : 410, r * 0.85), t + i * 0.05, 0.4, { c, w: DS.w.mid });
  }
};
const cat = (S, x, gy, kind, s = 1, o = {}) => { // a simple cat in two coats: "calico" and "tabby"
  const g = S.grp(o.parent), base = kind === "calico" ? "paper" : "gray", fl = o.flip ? -1 : 1;
  const P = (d, name, tone, w = "near", parent = g) => DS.shape(S, d, name, { w, tone, parent, t: T0(S) });
  const X = (v) => x + v * s * fl, Y = (v) => gy + v * s;
  S.draw(smooth([[X(110), Y(-80)], [X(190), Y(-110)], [X(220), Y(-190)], [X(190), Y(-250)]]), T0(S), 0, { c: DS.P.ink[0], w: DS.w.near * 1.3, parent: g });
  P(circ(X(0), Y(-90), 120 * s, 70 * s), base, 1);
  P(circ(X(-110), Y(-120), 60 * s, 56 * s), base, 1);
  P(poly([[X(-150), Y(-160)], [X(-140), Y(-215)], [X(-105), Y(-170)]], false), base, 0, "mid");
  P(poly([[X(-90), Y(-170)], [X(-70), Y(-215)], [X(-60), Y(-150)]], false), base, 0, "mid");
  [-70, 50].forEach((lx) => P(rrect(X(lx) - 12 * s, Y(-40), 26 * s, 42 * s, DS.r.xs), base, 0, "mid"));
  if (kind === "calico") { P(circ(X(-20), Y(-110), 44 * s, 30 * s), "orange", 1, "detail"); P(circ(X(70), Y(-70), 36 * s, 24 * s), "brown", 1, "detail"); P(circ(X(-126), Y(-140), 30 * s, 24 * s), "orange", 1, "detail"); }
  else [[-10, -150], [30, -150], [70, -140], [-10, -120]].forEach(([a, b]) => S.draw(line([X(a), Y(b)], [X(a + 8), Y(b + 38)]), T0(S), 0, { c: DS.P.ink[0], w: DS.w.mid, parent: g }));
  S.fill(circ(X(-130), Y(-125), 6 * s, 6 * s), T0(S), 0, DS.P.ink[0], 1, g); S.fill(circ(X(-100), Y(-125), 6 * s, 6 * s), T0(S), 0, DS.P.ink[0], 1, g);
  if (o.t !== undefined) fadeG(S, g, o.t);
  return g;
};
// chromosome (X) with two cap tips; k = relative cap length (1 = full)
const chromo = (S, cx, cy, capLen, t, o = {}) => {
  const g = S.grp(o.parent), sc = o.s ?? 1;
  [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([sx, sy]) => {
    S.draw(line([cx, cy], [cx + sx * 46 * sc, cy + sy * 110 * sc]), t, 0, { c: DS.c("purple", 2), w: DS.w.near * 3.7 * sc, parent: g });
    S.draw(line([cx + sx * 46 * sc, cy + sy * 110 * sc], [cx + sx * (46 + 14 * capLen) * sc, cy + sy * (110 + 36 * capLen) * sc]), t, 0, { c: DS.c("orange", 0), w: DS.w.near * 3.7 * sc, parent: g });
  });
  fadeG(S, g, t);
  return g;
};
const count = (S, x, y, to, t, dur, o = {}) => { const te = S.text("0", x, y, { size: o.size || DS.type.display, c: o.c || DS.c("red", 2), t, anchor: "middle" }); const v = { n: 0 }; te.textContent = "0"; tl.fromTo(v, { n: 0 }, { n: to, duration: dur, ease: "power1.out", immediateRender: false, onUpdate: () => (te.textContent = String(Math.round(v.n))) }, t); return te; };
const talkCopies = (S, c, x, gy, o) => { const m = (mo) => { const k = L.put(S, "person", x, gy, Object.assign({}, o, { mouth: mo, t: undefined })); k.setAttribute("opacity", 0); return k; }; flaps(m("o"), m("a"), W(c, 0), END(c)); };
// ===================== chapter 1: Saturday, 8:00 am (clips 1-6) =====================
// 1-2 "You are standing in a garage with an eighteen-year-old. He has your nose, your eyebrows and nearly your voice."
shot(1, 0, (S) => {
  garage(S, 1);
  dave(S, 470, 935, { face: "shocked" });
  clone(S, 18, 1450, 935, { flip: true });
  card(S, "SAME FACE", 960, 230, { size: DS.type.small, t: W(2, 3) });
}, { chap: "SATURDAY, 8:00 AM" });
// 3 (@arlo) "I am not finishing your boat, Dave. I'm going to be a baker."
shot(3, 0, (S) => {
  garage(S, 1);
  dave(S, 430, 935, { face: "shocked" });
  clone(S, 18, 1350, 935, { flip: true, talk: 3, face: "smug", s: 1.12 });
  L.put(S, "food-bread-loaf", 1120, 760, { s: 1.1, t: W(3, 12), pop: true });
});
// 4 (@dave) "But I made you for the boat. That was the whole point."
shot(4, 0, (S) => {
  garage(S, 1);
  dave(S, 560, 935, { face: "worried", pose: "shrug", talk: 4, s: 1.12 });
  clone(S, 18, 1450, 935, { flip: true, face: "flat" });
});
// 5 "The boat has one plank. It has had one plank for fourteen years. Gran's party starts in four hours."
shot(5, 0, (S) => {
  garage(S, 1, { bs: 1.35, by: 930 });
  web(S, 1370, 650, 1.1);
  card(S, "ONE PLANK", 960, 200, { size: DS.type.small, t: W(5, 3) });
  card(S, "FOR FOURTEEN YEARS", 960, 290, { size: DS.type.caption, t: W(5, 9) });
  card(S, "PARTY IN FOUR HOURS", 960, 380, { size: DS.type.caption, fill: "yellow", t: W(5, 14) });
}, { cam: "pull" });
// 6 "Let's go back eighteen years, to a Tuesday at nine in the morning."
shot(6, 0, (S) => {
  garage(S, 1);
  dave(S, 520, 935, { face: "thinking", pose: "think" });
  const c = S.clock(1440, 400, 130, W(6, 2), 0.5, { h: 9, m: 0 }); c.spin(W(6, 3), 1.6, 3);
  card(S, "EIGHTEEN YEARS EARLIER", 960, 200, { size: DS.type.small, t: W(6, 3) });
});
// ===================== chapter 2: Tuesday, 9:00 am (clips 7-19) =====================
// 7 "Gran has one wish for her ninetieth birthday, a Saturday in June. ..."
shot(7, 0, (S) => {
  bg(S, "scene-suburb-day");
  gran(S, 640, 935, { s: 1.1, face: "happy" });
  L.put(S, "p2-birthday-cake", 1250, 700, { s: 2.6, candles: 3 });
  card(S, "NINETIETH BIRTHDAY", 960, 220, { size: DS.type.small, t: W(7, 6) });
  card(S, "A SATURDAY IN JUNE", 960, 310, { size: DS.type.caption, fill: "yellow", t: W(7, 9) });
}, { chap: "TUESDAY, 9:00 AM" });
shot(7, 12, (S) => {
  bg(S, "world-mountain-lake");
  gran(S, 380, 935, { s: 1.1, face: "smile", pose: "point" });
  L.put(S, "ep92-boat-lake", 1000, 800, { s: 0.9 });
  S.arrow(1400, 700, 1780, 640, W(7, 15), 0.5, { c: DS.c("red", 2), w: DS.w.near, bend: -0.2 });
  card(S, "ROW ACROSS THE LAKE", 1100, 330, { size: DS.type.caption, t: W(7, 15) });
  card(S, "THE BOAT YOU PROMISED", 960, 230, { size: DS.type.caption, fill: "yellow", t: W(7, 21) });
});
// 8 "That boat is one plank. So you have a plan: make a second you to build it. So what would really happen if you cloned yourself?"
shot(8, 0, (S) => {
  garage(S, 1);
  dave(S, 480, 935, { face: "thinking", pose: "think" });
  S.thought(1120, 340, 250, 130, 760, 520, W(8, 5), 0.5);
  const g = S.grp();  // after the bubble, so the two Daves sit on top of it
  const a = L.put(S, "kit-dave", 1040, 450, { s: 0.3, parent: g }), b = L.put(S, "kit-dave", 1230, 450, { s: 0.3, parent: g });
  [[a, W(8, 9), 1], [b, W(8, 12), 0.45]].forEach(([el, t, op]) => { tl.set(el, { opacity: 0 }, 0); tl.to(el, { opacity: op, duration: 0.35 }, t); });
  card(S, "THE PLAN", 960, 160, { size: DS.type.small, t: W(8, 9) });
});
// 8b + 9 (@dave) "A second me. Same hands, same skills, and none of the excuses."
const dream = (S, o) => {
  garage(S, 1);
  dave(S, 470, 935, Object.assign({ face: "smug", pose: "hips" }, o));
  const gh = L.put(S, "kit-dave", 1450, 935, { s: 1, flip: true }); gh.setAttribute("opacity", 0.4);
};
shot(8, 17, (S) => {
  dream(S, {});
  card(S, "WHAT IF YOU CLONED YOURSELF?", 960, 190, { size: DS.type.body, fill: "yellow", t: W(8, 17) });
  S.sfx(W(8, 17), "ding", 960);
});
shot(9, 0, (S) => {
  dream(S, { talk: 9 });
  card(S, "WHAT IF YOU CLONED YOURSELF?", 960, 190, { size: DS.type.body, fill: "yellow", t: T0(S) });
});
// 10 (@brain) "Dave, I would like it noted that I advised against this."
shot(10, 0, (S) => {
  garage(S, 1);
  dave(S, 480, 935, { face: "worried" });
  brain(S, 780, 935, { s: 0.85, face: "worried" });
  nameTag(S, "BRAIN", 780, 560, 10);
});
// 11 "And here is the rule of this story: the cloning works first time. Everything after that is just biology."
shot(11, 0, (S) => {
  bg(S, "room-science-lab-light");
  dave(S, 560, 935, { face: "proud", pose: "hips" });
  card(S, "THE RULE OF THIS STORY", 1250, 240, { size: DS.type.caption, t: W(11, 3) });
  card(S, "THE CLONING WORKS FIRST TIME", 1250, 340, { size: DS.type.caption, fill: "green", t: W(11, 8) });
  card(S, "EVERYTHING ELSE: JUST BIOLOGY", 1250, 440, { size: DS.type.caption, fill: "yellow", t: W(11, 13) });
});
// 12 "In real life, it never works first time. To make Dolly the sheep, scientists fused two hundred and seventy-seven cells, and got one lamb."
shot(12, 0, (S) => {
  pasture(S);
  L.put(S, "animal-sheep", 960, 860, { s: 1.7 });
  card(S, "IN REAL LIFE: NEVER FIRST TIME", 960, 220, { size: DS.type.caption, fill: "red", tc: "paper", t: W(12, 1) });
  card(S, "DOLLY THE SHEEP", 960, 320, { size: DS.type.caption, t: W(12, 10) });
}, { cam: "pull" });
shot(12, 15, (S) => {
  field(S, "paper", 0);
  const last = dots(S, 960, 560, 277, 23, 36, 11, DS.c("blue", 0), W(12, 15), 0.4);
  count(S, 960, 215, 277, W(12, 15), 1.8, { size: DS.type.display });
  S.fill(circ(last[0], last[1], 15, 15), W(12, 22), 0.2, DS.c("green", 0), 1);
  card(S, "CELLS FUSED", 1370, 215, { size: DS.type.caption, t: W(12, 17) });
  card(S, "ONE LAMB", last[0] - 40, last[1] + 70, { size: DS.type.caption, fill: "green", t: W(12, 22) });
  card(S, "DOLLY: 277 TRIES, 1 LAMB", 1480, 196, { size: DS.type.caption, fill: "sky", t: W(12, 15) });
}, { cam: "none" });
// 13 "And nobody has shown that a human has ever been cloned."
shot(13, 0, (S) => {
  bg(S, "room-science-lab-light");
  dave(S, 760, 935, { face: "confused", pose: "shrug" });
  S.text("?", 1250, 600, { size: DS.type.display * 3.3, c: DS.c("red", 2), t: W(13, 3) });
  card(S, "NO HUMAN CLONE SHOWN", 760, 340, { size: DS.type.small, t: W(13, 3) });
  card(S, "DOLLY: 277 TRIES, 1 LAMB", 1480, 196, { size: DS.type.caption, fill: "sky", t: T0(S) });
});
// 14 "But in this story it works. At nine fifteen, you are holding a seven-pound baby with your nose. He cannot hold a hammer. He cannot hold his own head."
shot(14, 0, (S) => {
  bg(S, "room-science-lab-light");
  dave(S, 760, 935, { face: "delighted", pose: "point" });
  card(S, "IT WORKS", 1280, 300, { size: DS.type.title, fill: "green", t: W(14, 4) });
  S.clock(1380, 600, 120, W(14, 6), 0.5, { h: 9, m: 15 });
  S.sfx(W(14, 4), "ding", 1280);
});
shot(14, 11, (S) => {
  garage(S, 1);
  dave(S, 760, 935, { face: "love", pose: "hold" });
  const b = clone(S, 0, 900, 780, { s: 0.42, acc: ["hardhat"], face: "smile", t: W(14, 12) });
  card(S, "SEVEN POUNDS", 1330, 330, { size: DS.type.caption, t: W(14, 13) });
  L.put(S, "prop-hammer", 1400, 870, { s: 2.2, t: W(14, 20), pop: true });
  S.move(b, W(14, 26), 0.8, { rotation: 14, svgOrigin: "900 780" });
});
// 15 (@news) "Breaking news. A local man says he has made himself a baby. He says it is for a boat."
shot(15, 0, (S) => {
  field(S, "navy", 1);
  L.put(S, "job-news-anchor", 960, 920, { s: 1.3 });
  nameTag(S, "NEWS", 960, 150, 15);
  card(S, "BREAKING NEWS", 960, 260, { size: DS.type.small, fill: "red", tc: "paper", t: W(15, 0) });
  card(S, "LOCAL MAN MAKES BABY OF HIMSELF. FOR A BOAT.", 960, 880, { size: DS.type.caption, fill: "yellow", t: W(15, 8) });
});
// 16 (@old) "There are two of you. Why are there two of you?" 17 (@dave) "He is a copy of me. Give him a minute."
shot(16, 0, (S) => {
  bg(S, "scene-suburb-day");
  L.put(S, "fence", 1300, 935, { s: 1.6 });
  neighbour(S, 1380, 935, { flip: true, face: "shocked" });
  talkCopies(S, 16, 1380, 935, { style: "man02", body: "elderly", hair: "none", outfit: "sweater", outfitC: "green", acc: ["glasses"], face: "shocked", s: 1.0, flip: true });
  nameTag(S, "MR PUGH", 1380, 520, 16);
  dave(S, 560, 935, { face: "worried", pose: "hold" });
  clone(S, 0, 700, 790, { s: 0.42, acc: ["hardhat"] });
});
shot(17, 0, (S) => {
  bg(S, "scene-suburb-day");
  L.put(S, "fence", 1300, 935, { s: 1.6 });
  neighbour(S, 1380, 935, { flip: true, face: "shocked" });
  dave(S, 560, 935, { face: "smile", pose: "hold", talk: 17 });
  clone(S, 0, 700, 790, { s: 0.42, acc: ["hardhat"] });
});
// 18 "You are wrong. A clone is not a copy of today's you. He is your identical twin, who arrives thirty-two years late."
shot(18, 0, (S) => {
  field(S, "wall", 1);
  dave(S, 500, 935, { face: "smug" });
  clone(S, 0, 1400, 935, { s: 0.55, acc: ["hardhat"] });
  S.text("≠", 960, 620, { size: DS.type.display * 2.7, c: DS.c("red", 2), t: W(18, 5) });
  card(S, "A CLONE IS NOT A COPY", 960, 200, { size: DS.type.small, t: W(18, 3) });
  card(S, "OF TODAY'S YOU", 960, 290, { size: DS.type.caption, t: W(18, 9) });
}, { cam: "none" });
shot(18, 12, (S) => {
  field(S, "wall", 1);
  dave(S, 500, 935, { face: "smile" });
  clone(S, 0, 1400, 935, { s: 0.55, acc: ["hardhat"] });
  S.arrow(640, 700, 1260, 700, W(18, 17), 0.5, { c: DS.c("red", 2), w: DS.w.near });
  card(S, "IDENTICAL TWIN", 960, 200, { size: DS.type.small, fill: "yellow", t: W(18, 15) });
  card(S, "32 YEARS LATE", 960, 780, { size: DS.type.small, t: W(18, 19) });
}, { cam: "none" });
// 19 "Even the egg gives him away. It came from a donor, and its mitochondria keep a little DNA of their own. So he is nearly you, not exactly you."
shot(19, 0, (S) => {
  field(S, "wall", 1);
  DS.shape(S, circ(780, 560, 300, 300), "paper", { w: "near", t: T0(S) });
  DS.shape(S, circ(780, 560, 120, 120), "blue", { w: "mid", tone: 1, t: T0(S) });
  L.put(S, "sci-dna", 780, 560, { s: 0.55, t: W(19, 3) });
  [[640, 700], [900, 720], [930, 440], [620, 420]].forEach(([x, y], i) => { const g = S.grp(); DS.shape(S, circ(x, y, 46, 26), "orange", { w: "mid", tone: 0, parent: g, t: W(19, 12) }); S.draw(smooth([[x - 30, y], [x - 10, y - 12], [x + 10, y + 12], [x + 30, y]]), W(19, 12), 0, { c: DS.c("red", 2), w: DS.w.detail, parent: g }); fadeG(S, g, W(19, 12) + i * 0.3); });
  card(S, "DONOR EGG", 780, 200, { size: DS.type.small, t: W(19, 7) });
  card(S, "DAVE'S DNA", 1330, 480, { size: DS.type.caption, fill: "sky", t: W(19, 3) });
  S.arrow(1230, 500, 880, 560, W(19, 3), 0.4, { c: DS.c("ink"), w: DS.w.mid });
  card(S, "MITOCHONDRIA: A LITTLE DNA OF THEIR OWN", 1330, 860, { size: DS.type.caption, fill: "orange", t: W(19, 16) });
  S.arrow(1130, 690, 940, 700, W(19, 16), 0.4, { c: DS.c("ink"), w: DS.w.mid });
}, { cam: "none" });
// gag: tiny baby Dave in a hard hat, holding a plank twice his size
shot(19, 21, (S) => {
  garage(S, 1, { bx: 1480, bs: 0.7 });
  const g = S.grp(); L.put(S, "ep92-plank", 900, 640, { s: 1, l: 440, parent: g }); g.setAttribute("transform", "rotate(-24 900 640)");
  clone(S, 0, 900, 905, { s: 0.55, acc: ["hardhat"], face: "determined", pose: "reach" });
  card(S, "NEARLY YOU. NOT EXACTLY YOU.", 960, 220, { size: DS.type.small, fill: "yellow", t: W(19, 24) });
});
// ===================== chapter 3: Year one (clips 20-27) =====================
const living = (S) => bg(S, "room-living-room-light");
// 20 "At one, he is the loudest person you have ever met. You call him Dave Two. He does not call you anything yet."
shot(20, 0, (S) => {
  living(S);
  dave(S, 520, 935, { face: "worried", pose: "head" });
  clone(S, 1, 1300, 935, { s: 0.55, face: "cry" });
  S.text("WAAAAH!", 1150, 290, { size: DS.type.display * 1.4, c: DS.c("red", 2), t: W(20, 5) });
  S.kick(W(20, 5), 6);
}, { chap: "YEAR ONE" });
shot(20, 11, (S) => {
  living(S);
  dave(S, 520, 935, { face: "smile", pose: "point" });
  clone(S, 1, 1300, 935, { s: 0.55, face: "smile" });
  card(S, "DAVE TWO", 1300, 560, { size: DS.type.small, fill: "orange", t: W(20, 14) });
  txt(S, "...", 1300, 470, { size: DS.type.title, t: W(20, 19) });
});
// 21 (@dave) "Say hammer. Hammer. Come on, buddy, just say hammer." 22 "His first word is not hammer. It is dog."
shot(21, 0, (S) => {
  living(S);
  dave(S, 560, 935, { face: "excited", pose: "kneel", talk: 21 });
  clone(S, 1, 1300, 935, { s: 0.55, face: "happy" });
  L.put(S, "prop-hammer", 840, 800, { s: 1.6, t: W(21, 1), pop: true });
});
shot(22, 0, (S) => {
  living(S);
  dave(S, 560, 935, { face: "worried", pose: "kneel" });
  clone(S, 1, 1300, 935, { s: 0.55, face: "happy" });
  L.put(S, "prop-hammer", 840, 800, { s: 1.6 });
  L.put(S, "bubble-round", 1480, 480, { s: 0.7, text: "DOG!", tail: "left", t: W(22, 7) });
  L.put(S, "animal-dog", 1700, 935, { s: 0.9, flip: true, t: W(22, 8), pop: true });
});
// 23 "He leaves fingerprints on every window, ... nobody gets the same womb twice."
shot(23, 0, (S) => {
  living(S);
  L.put(S, "kit-window-day", 960, 500, { s: 2.4 });
  [[760, 360], [900, 450], [1080, 330], [1150, 520], [820, 560], [1000, 600]].forEach(([x, y], i) => S.fill(circ(x, y, 34, 42), W(23, 2) + i * 0.25, 0.3, DS.c("gray", 1), 0.6));
  clone(S, 1, 1620, 935, { s: 0.55, flip: true, face: "mischief" });
  card(S, "FINGERPRINTS ON EVERY WINDOW", 960, 160, { size: DS.type.caption, t: W(23, 2) });
});
shot(23, 12, (S) => {
  field(S, "paper", 0);
  fingerprint(S, 600, 520, 1.9, "loop", W(23, 12));
  fingerprint(S, 1320, 520, 1.9, "arch", W(23, 14));
  S.text("≠", 960, 560, { size: DS.type.display * 2.7, c: DS.c("red", 2), t: W(23, 16) });
  card(S, "DAVE", 600, 800, { size: DS.type.small, fill: "sky", t: W(23, 12) });
  card(S, "DAVE TWO", 1320, 800, { size: DS.type.small, fill: "orange", t: W(23, 14) });
  card(S, "IDENTICAL TWINS: DIFFERENT FINGERPRINTS", 960, 190, { size: DS.type.caption, t: W(23, 12) });
}, { cam: "push" });
shot(23, 23, (S) => {
  field(S, "paper", 0);
  [[600, "WOMB ONE", 23], [1320, "WOMB TWO", 31]].forEach(([x, s, w]) => {
    DS.shape(S, circ(x, 540, 230, 250), "pink", { w: "near", tone: 1, t: T0(S) });
    S.draw(arc(x, 540, 150, 200, 520, 160), T0(S), 0, { c: DS.c("pink", 2), w: DS.w.mid });
    L.put(S, "kit-dave", x, 700, { s: 0.3, face: "sleep", pose: "sleep", t: W(23, w) });
    card(S, s, x, 860, { size: DS.type.caption, t: W(23, w) });
  });
  card(S, "NOBODY GETS THE SAME WOMB TWICE", 960, 180, { size: DS.type.caption, fill: "yellow", t: W(23, 28) });
}, { cam: "none" });
// 24 (@dave) "He has my nose. Why does he not have my fingerprints?"
shot(24, 0, (S) => {
  living(S);
  dave(S, 520, 935, { face: "confused", pose: "reach", talk: 24 });
  L.put(S, "sci-magnifier", 840, 690, { s: 1.5, t: W(24, 3) });
  clone(S, 1, 1250, 935, { s: 0.55, face: "smile" });
});
// 25 (@brain) "Dave, you cannot teach a baby carpentry. Please stop showing him the plank."
shot(25, 0, (S) => {
  living(S);
  dave(S, 500, 935, { face: "proud", pose: "hold" });
  const g = S.grp(); L.put(S, "ep92-plank", 760, 700, { s: 0.7, l: 420, parent: g }); g.setAttribute("transform", "rotate(-14 760 700)");
  clone(S, 1, 1250, 935, { s: 0.55, face: "wow" });
  brain(S, 1650, 935, { s: 0.85, face: "stern" });
  nameTag(S, "BRAIN", 1650, 560, 25);
});
// 26 "Even the first cloned cat, called CC, was not a copy of the cat she came from. The colours of a coat are not all written in the genes."
shot(26, 0, (S) => {
  living(S);
  cat(S, 500, 900, "calico", 1.35);
  cat(S, 1400, 900, "tabby", 1.35, { flip: true });
  card(S, "THE CAT SHE CAME FROM", 540, 280, { size: DS.type.caption, t: W(26, 12) });
  card(S, "CC", 1400, 280, { size: DS.type.small, fill: "yellow", t: W(26, 6) });
  S.text("≠", 960, 640, { size: DS.type.display * 2.4, c: DS.c("red", 2), t: W(26, 8) });
});
shot(26, 17, (S) => {
  field(S, "wall", 1);
  L.put(S, "sci-dna", 520, 540, { s: 1.6 });
  S.arrow(700, 540, 1130, 540, W(26, 20), 0.5, { c: DS.c("ink"), w: DS.w.near });
  S.cross(920, 540, 1.3, W(26, 24), 0, { c: DS.c("red", 2), w: DS.w.near });
  [[1300, 440, "orange"], [1440, 600, "brown"], [1260, 640, "paper"]].forEach(([x, y, c]) => DS.shape(S, circ(x, y, 90, 70), c, { w: "near", tone: 1, t: T0(S) }));  // subject in from the first frame (frame_qa: near-white opening)
  card(S, "NOT ALL IN THE GENES", 960, 190, { size: DS.type.small, fill: "yellow", t: W(26, 23) });
  card(S, "COAT COLOURS", 1330, 800, { size: DS.type.caption, t: T0(S) });
}, { cam: "push" });
// 27 "You wanted a copy. You got a baby with opinions."
shot(27, 0, (S) => {
  living(S);
  dave(S, 520, 935, { face: "flat", pose: "cross" });
  clone(S, 1, 1250, 935, { s: 0.55, face: "grumpy", pose: "point" });
  card(S, "A COPY", 660, 220, { size: DS.type.small, t: W(27, 3) });
  S.strike(560, 190, 760, 260, W(27, 4), 0.3, { c: DS.c("red", 2) });
  card(S, "A BABY WITH OPINIONS", 1250, 300, { size: DS.type.small, fill: "green", t: W(27, 6) });
});
// ===================== chapter 4: Year five (clips 28-36) =====================
const dinoOnFloor = (S, x, gy, t) => L.put(S, "ep92-dino-toy", x, gy, { s: 1.5, t });
// 28 "At five, he has your hands. You buy him a tiny hammer." 29 (@kid) "A boat is boring. Dinosaurs do not need boats."
shot(28, 0, (S) => {
  garage(S, 1, { bx: 960, bs: 0.8 });
  dave(S, 430, 935, { face: "smile", pose: "hold" });
  clone(S, 5, 1300, 935, { s: 0.8, flip: true, face: "smile" });
  L.put(S, "prop-hammer", 1160, 740, { s: 1.0, t: W(28, 10), pop: true });
  dinoOnFloor(S, 1560, 935, T0(S));
}, { chap: "YEAR FIVE" });
shot(29, 0, (S) => {
  garage(S, 1, { bx: 960, bs: 0.8 });
  dave(S, 430, 935, { face: "flat", pose: "hold" });
  clone(S, 5, 1300, 935, { s: 0.8, flip: true, face: "bored", talk: 29 });
  L.put(S, "prop-hammer", 1160, 740, { s: 1.0 });
  dinoOnFloor(S, 1560, 935, T0(S));
});
// 30 (@dave) "But you have my hands, buddy. You have my actual hands."
shot(30, 0, (S) => {
  garage(S, 1, { bx: 960, bs: 0.8 });
  dave(S, 520, 935, { face: "proud", pose: "reach", talk: 30 });
  clone(S, 5, 1350, 935, { s: 0.8, flip: true, face: "smile", pose: "reach" });
  S.text("=", 960, 520, { size: DS.type.display * 2.4, c: DS.c("green", 2), t: W(30, 5) });
  card(S, "SAME HANDS", 960, 200, { size: DS.type.small, t: W(30, 5) });
  dinoOnFloor(S, 1650, 935, T0(S));
});
// 31 (@kid) "Can the dinosaur sleep in the boat tonight?" 32 (@dave) "It is one plank, mate. The dinosaur would fall off."
shot(31, 0, (S) => {
  garage(S, 1, { bx: 960, bs: 1.0 });
  L.put(S, "ep92-dino-toy", 960, 726, { s: 1.5, t: W(31, 1), pop: true });
  dave(S, 400, 935, { face: "worried" });
  clone(S, 5, 1500, 935, { s: 0.8, flip: true, face: "excited", pose: "point", talk: 31 });
});
shot(32, 0, (S) => {
  garage(S, 1, { bx: 960, bs: 1.0 });
  const d = L.put(S, "ep92-dino-toy", 960, 726, { s: 1.5 });
  S.move(d, W(32, 8), 0.7, { y: 190, rotation: 160 }, "power2.in");
  S.sfx(W(32, 8) + 0.55, "thud", 960);
  dave(S, 400, 935, { face: "smile", talk: 32 });
  clone(S, 5, 1500, 935, { s: 0.8, flip: true, face: "sleepy", pose: "point" });
});
// 33 "You phone a scientist, who answers on the first ring." + 34 first words
shot(33, 0, (S) => {
  S.fill(rect(0, 0, 960, 1080), T0(S), 0, DS.c("wall", 1), 1);
  S.fill(rect(960, 0, 960, 1080), T0(S), 0, DS.c("sky", 1), 1);
  S.fill(rect(0, 860, 1920, 220), T0(S), 0, DS.c("floor", 0), 1);
  S.fill(rect(955, 0, 10, 1080), T0(S), 0, DS.c("ink"), 1);
  dave(S, 520, 935, { face: "smile", pose: "phone-hold" });
  S.text("RING!", 520, 300, { size: DS.type.display * 1.2, c: DS.c("red", 2), t: W(33, 6) });
  L.put(S, "kit-doctor", 1400, 935, { s: 1.0, face: "smile" });
  S.sfx(W(33, 6), "tick", 520);
});
shot(34, 0, (S) => {
  S.fill(rect(0, 0, 960, 1080), T0(S), 0, DS.c("wall", 1), 1);
  S.fill(rect(960, 0, 960, 1080), T0(S), 0, DS.c("sky", 1), 1);
  S.fill(rect(0, 860, 1920, 220), T0(S), 0, DS.c("floor", 0), 1);
  S.fill(rect(955, 0, 10, 1080), T0(S), 0, DS.c("ink"), 1);
  dave(S, 520, 935, { face: "smile", pose: "phone-hold" });
  L.put(S, "kit-doctor", 1400, 935, { s: 1.0, face: "smile" });
  nameTag(S, "SCIENTIST", 1400, 460, 34);
  card(S, "I CHECKED THE NUMBERS TWICE", 1400, 210, { size: DS.type.caption, t: W(34, 1) });
});
// 34 doc "Dave, I checked the numbers twice. Across fifty years of twin studies, about half of what makes people different comes from their genes. The other half is everything else."
shot(34, 6, (S) => {
  field(S, "wall", 1);
  dave(S, 780, 935, { s: 0.8, face: "smile" }); dave(S, 1140, 935, { s: 0.8, face: "smile", flip: true });
  S.text("=", 960, 700, { size: DS.type.display * 1.6, c: DS.c("ink"), t: W(34, 9) });
  card(S, "FIFTY YEARS OF TWIN STUDIES", 960, 200, { size: DS.type.small, t: W(34, 6) });
}, { cam: "none" });
shot(34, 12, (S) => {
  field(S, "wall", 1);
  S.pie(960, 560, 250, 0.5, W(34, 12), 0.6, { cBig: DS.c("purple", 0), cSmall: DS.c("gray", 1) });
  card(S, "GENES: ABOUT HALF", 560, 880, { size: DS.type.caption, fill: "purple", tc: "paper", t: W(34, 19) });
  card(S, "EVERYTHING ELSE", 1360, 880, { size: DS.type.caption, t: W(34, 25) });
  card(S, "GENES, ABOUT HALF", 1480, 196, { size: DS.type.caption, fill: "sky", t: W(34, 12) });
}, { cam: "push" });
// 35 (@dave) "So which half is the boat?" 36 doc "Nobody has checked the boat, Dave. I would remember."
shot(35, 0, (S) => {
  S.fill(rect(0, 0, 960, 1080), T0(S), 0, DS.c("wall", 1), 1);
  S.fill(rect(960, 0, 960, 1080), T0(S), 0, DS.c("sky", 1), 1);
  S.fill(rect(0, 860, 1920, 220), T0(S), 0, DS.c("floor", 0), 1);
  S.pie(960, 420, 150, 0.5, T0(S), 0.3, { cBig: DS.c("purple", 0), cSmall: DS.c("gray", 1) });
  dave(S, 480, 935, { face: "confused", pose: "scratch-head", talk: 35 });
  L.put(S, "kit-doctor", 1440, 935, { s: 1.0, face: "smile" });
  L.put(S, "ep92-boat-lake", 960, 520, { s: 0.3, t: W(35, 3), pop: true });
  S.text("?", 1090, 440, { size: DS.type.display * 1.4, c: DS.c("red", 2), t: W(35, 4) });
  nameTag(S, "SCIENTIST", 1440, 460, 36);
  card(S, "GENES, ABOUT HALF", 1480, 196, { size: DS.type.caption, fill: "sky", t: T0(S) });
}, { cam: "none" });
// ===================== chapter 5: Year six (clips 37-46): the quiet mood turn: night, bedside, calm =====================
const bedroom = (S) => { bg(S, "kit-room-bedroom-night", { time: "night", blanket: false }); L.put(S, "kit-bed-simple", 1290, 935, { s: 0.95 }); };
// the sleeping boy (age six): lies on the bed, dinosaur toy on the pillow side; face "sleep" or awake
const boyInBed = (S, face, o = {}) => { const g = S.grp(); clone(S, 6, 1290, 800, { pose: "lie-down", face, s: 0.66, apron: false, flour: false, parent: g, talk: o.talk }); L.put(S, "ep92-dino-toy", 1560, 790, { s: 0.9, parent: g }); return g; };
// 37 "At year six, you stop sleeping. Dolly the sheep lived to six." 38 (@dave) "Six years, Brain. He is six. Dolly was six."
shot(37, 0, (S) => {
  bedroom(S);
  boyInBed(S, "sleep");
  dave(S, 560, 935, { face: "tired" });
  S.thought(520, 330, 220, 110, 560, 520, W(37, 8), 0.5);
  L.put(S, "animal-sheep", 520, 400, { s: 0.55, t: W(37, 9) });
  card(S, "DOLLY LIVED TO SIX", 960, 190, { size: DS.type.caption, t: W(37, 8) });
}, { chap: "YEAR SIX" });
shot(38, 0, (S) => {
  bedroom(S);
  boyInBed(S, "sleep");
  dave(S, 560, 935, { face: "worried", talk: 38 });
  brain(S, 920, 935, { s: 0.7, face: "tired" });
});
// 39 "She had arthritis, and then a lung disease. Scientists had found the tips of her chromosomes were twenty percent shorter than expected, and people wondered if she was born old."
shot(39, 0, (S) => {
  pasture(S, { sky: "dusk" });
  L.put(S, "animal-sheep", 960, 860, { s: 1.6 });
  card(S, "ARTHRITIS", 560, 330, { size: DS.type.caption, t: W(39, 2) });
  card(S, "LUNG DISEASE", 1360, 330, { size: DS.type.caption, t: W(39, 6) });
}, { cam: "pull" });
shot(39, 15, (S) => {
  field(S, "paper", 0);
  chromo(S, 640, 520, 1.0, T0(S));
  chromo(S, 1280, 520, 0.6, W(39, 15));
  card(S, "EXPECTED", 640, 800, { size: DS.type.caption, t: T0(S) });
  card(S, "DOLLY'S", 1280, 800, { size: DS.type.caption, t: W(39, 15) });
  card(S, "TIPS: 20 % SHORTER", 960, 190, { size: DS.type.small, fill: "yellow", t: W(39, 17) });
  card(S, "BORN OLD?", 960, 880, { size: DS.type.small, t: W(39, 28) });
}, { cam: "push" });
// 40 "So every night, you stand over his bed and watch him breathe."
shot(40, 0, (S) => {
  bedroom(S);
  boyInBed(S, "sleep");
  dave(S, 780, 935, { face: "tired", pose: "look-down" });
  S.zzz(1200, 640, W(40, 6), 1.5);
}, { cam: "pull" });
// 41 (@brain) "And Dolly's lung disease came from a virus that other sheep in her flock caught too. Sit down, Dave."
shot(41, 0, (S) => {
  bedroom(S);
  boyInBed(S, "sleep");
  dave(S, 780, 935, { face: "tired" });
  brain(S, 450, 935, { s: 0.8, face: "tired" });
  nameTag(S, "BRAIN", 450, 590, 41);
  S.thought(560, 300, 270, 120, 470, 500, W(41, 2), 0.5);
  [[430, 340], [560, 360], [690, 335]].forEach(([x, y], i) => L.put(S, "animal-sheep", x, y + 40, { s: 0.3, t: W(41, 4) + i * 0.2 }));
  card(S, "A VIRUS THE FLOCK CAUGHT", 560, 170, { size: DS.type.caption, t: W(41, 6) });
});
// 42 "Years later, four copies of Dolly's own cell line were checked at eight years old. They were healthy, and nobody was lame."
shot(42, 0, (S) => {
  pasture(S, { sky: "dusk" });
  [400, 760, 1120, 1480].forEach((x, i) => L.put(S, "animal-sheep", x, 860, { s: 1.0, t: W(42, 2) + i * 0.3 }));
  card(S, "FOUR COPIES OF DOLLY'S CELL LINE", 960, 190, { size: DS.type.caption, t: W(42, 2) });
}, { cam: "pull" });
shot(42, 11, (S) => {
  pasture(S, { sky: "dusk" });
  [400, 760, 1120, 1480].forEach((x, i) => { L.put(S, "animal-sheep", x, 860, { s: 1.0 }); S.tick(x, 520, 1.3, W(42, 16) + i * 0.25, 0, { c: DS.c("green", 0), w: DS.w.near }); });
  card(S, "CHECKED AT EIGHT YEARS OLD", 960, 190, { size: DS.type.caption, t: W(42, 11) });
  card(S, "HEALTHY", 960, 300, { size: DS.type.small, fill: "green", tc: "paper", t: W(42, 16) });
}, { cam: "pull" });
// 43 "He wakes up. And he is looking right at you."
shot(43, 0, (S) => {
  bedroom(S);
  const a = boyInBed(S, "sleep"), b = boyInBed(S, "smile");
  swap(a, b, W(43, 2));
  dave(S, 780, 935, { face: "worried", pose: "look-down" });
}, { cam: "zoom" });
// 44 (@kid) "Dave, why are you looking at me like that? Is it my turn to be the dinosaur?" 45 (@dave) "No, mate. Go back to sleep. You're perfect."
shot(44, 0, (S) => {
  bedroom(S);
  boyInBed(S, "smile", { talk: 44 });
  dave(S, 780, 935, { face: "worried", pose: "look-down" });
});
shot(45, 0, (S) => {
  bedroom(S);
  boyInBed(S, "smile");
  dave(S, 780, 935, { face: "love", pose: "look-down", talk: 45 });
});
// 46 "This is the price of making a person. You came for a builder. You are staying for the breathing."
shot(46, 0, (S) => {
  bedroom(S);
  boyInBed(S, "sleep");
  dave(S, 780, 935, { face: "love", pose: "look-down" });
  card(S, "CAME FOR: A BUILDER", 960, 190, { size: DS.type.caption, t: W(46, 8) });
  card(S, "STAYING FOR: THE BREATHING", 960, 280, { size: DS.type.caption, fill: "pink", t: W(46, 13) });
}, { cam: "pull" });
// ===================== chapter 6: Year thirteen (clips 47-55) =====================
const kitchen = (S) => bg(S, "kit-room-kitchen-day");
const dough = (S, x, y, t) => L.put(S, "food-bread-loaf", x, y, { s: 1.3, t });
// 47 "At thirteen, he stops answering to Dave Two. He says he is not a number, and picks the name Arlo."
shot(47, 0, (S) => {
  kitchen(S);
  dave(S, 470, 935, { face: "confused" });
  clone(S, 13, 1400, 935, { flip: true, face: "smug", pose: "hips" });
  card(S, "DAVE TWO", 960, 190, { size: DS.type.small, fill: "orange", t: W(47, 5) });
  S.strike(780, 180, 1140, 200, W(47, 8), 0.3, { c: DS.c("red", 2) });
}, { chap: "YEAR THIRTEEN" });
shot(47, 8, (S) => {
  kitchen(S);
  dave(S, 470, 935, { face: "confused" });
  clone(S, 13, 1400, 935, { flip: true, face: "smug", pose: "hips" });
  card(S, "NOT A NUMBER", 960, 200, { size: DS.type.small, t: W(47, 13) });
  card(S, "ARLO", 960, 330, { size: DS.type.title, fill: "green", tc: "paper", t: W(47, 19) });
});
// 48 (@brain) "Dave, he is thirteen. Nobody is anybody's copy at thirteen."
shot(48, 0, (S) => {
  kitchen(S);
  dave(S, 450, 935, { face: "flat", pose: "hips" });
  brain(S, 800, 935, { s: 0.85, face: "stern" });
  nameTag(S, "BRAIN", 800, 580, 48);
  clone(S, 13, 1450, 935, { flip: true, face: "determined", pose: "reach" });
  dough(S, 1230, 790, T0(S));
});
// 49 (@arlo) "I am not you, Dave. I have never been you. I'm making bread." 50 (@dave) "But I taught you everything I know!"
shot(49, 0, (S) => {
  kitchen(S);
  dave(S, 450, 935, { face: "worried" });
  clone(S, 13, 1350, 935, { flip: true, face: "smug", pose: "hold", talk: 49, s: 1.0 });
  dough(S, 1090, 800, T0(S));
  L.put(S, "food-bread-loaf", 1620, 780, { s: 1.0, t: W(49, 10), pop: true });
});
shot(50, 0, (S) => {
  kitchen(S);
  dave(S, 450, 935, { face: "shocked", pose: "armsUp", talk: 50 });
  clone(S, 13, 1350, 935, { flip: true, face: "smug", pose: "hold", s: 1.0 });
  dough(S, 1090, 800, T0(S));
  L.put(S, "food-bread-loaf", 1620, 780, { s: 1.0 });
});
// 51 (@arlo) "You taught me nothing. I watched a video."
shot(51, 0, (S) => {
  kitchen(S);
  dave(S, 450, 935, { face: "shocked", pose: "facepalm" });
  clone(S, 13, 1350, 935, { flip: true, face: "smug", talk: 51, pose: "phone-hold" });
  L.put(S, "prop-phone", 1130, 700, { screen: "play", s: 1.5, t: W(51, 6), pop: true });
});
// 52 "Your house now smells of yeast, and your garage smells of nothing, because nobody goes in."
shot(52, 0, (S) => {
  S.fill(rect(0, 0, 960, 1080), T0(S), 0, DS.c("wall", 1), 1);
  S.fill(rect(960, 0, 960, 1080), T0(S), 0, DS.c("navy", 1), 1);
  S.fill(rect(0, 860, 960, 220), T0(S), 0, DS.c("floor", 0), 1);
  S.fill(rect(960, 860, 960, 220), T0(S), 0, DS.c("navy", 2), 1);
  [200, 480, 760].forEach((x, i) => L.put(S, "food-bread-loaf", x, 780, { s: 1.5, t: i ? W(52, 3) + i * 0.15 : undefined }));
  [200, 480, 760].forEach((x, i) => S.draw(smooth([[x, 640], [x + 24, 590], [x - 20, 540], [x + 22, 490]]), W(52, 4) + i * 0.15, 0.6, { c: DS.c("orange", 0), w: DS.w.near }));
  boat(S, 1440, 900, 1, { s: 0.65 });
  web(S, 1700, 700, 1.0);
  card(S, "SMELLS OF YEAST", 480, 200, { size: DS.type.small, fill: "yellow", t: W(52, 4) });
  card(S, "SMELLS OF NOTHING", 1440, 200, { size: DS.type.small, t: W(52, 10) });
  S.fill(rect(955, 0, 10, 1080), T0(S), 0, DS.c("ink"), 1);
}, { cam: "none" });
// 53 (@old) "Your boy has been kneading dough in my garden for an hour."
shot(53, 0, (S) => {
  bg(S, "scene-suburb-day");
  L.put(S, "fence", 1000, 935, { s: 1.6 });
  neighbour(S, 480, 935, { face: "angry" });
  talkCopies(S, 53, 480, 935, { style: "man02", body: "elderly", hair: "none", outfit: "sweater", outfitC: "green", acc: ["glasses"], face: "angry", s: 1.0 });
  nameTag(S, "MR PUGH", 480, 520, 53);
  clone(S, 13, 1450, 935, { flip: true, face: "smile", pose: "hold" });
  dough(S, 1250, 800, T0(S));
});
// 54 "Here is what one famous twin study found. A pair of three-year-olds switched on almost the same genes. A pair of fifty-year-olds switched on very different ones. Same genes, different lives."
const geneRow = (S, cx, y, pat, t, c = "blue") => pat.forEach((on, i) => { const x = cx - (pat.length - 1) * 17 + i * 34; DS.shape(S, circ(x, y, 12, 12), on ? c : "gray", { w: "detail", tone: on ? 0 : 1, t }); });
shot(54, 0, (S) => {
  field(S, "paper", 0);
  [[700, 0], [1220, 0]].forEach(([x], i) => { dave(S, x, 800, { s: 0.55, face: "smile" }); geneRow(S, x, 870, i ? [1, 1, 0, 1, 1, 1, 1, 1, 1, 0] : [1, 1, 0, 1, 1, 0, 1, 1, 1, 0], W(54, 12)); });
  card(S, "ONE FAMOUS TWIN STUDY", 960, 190, { size: DS.type.caption, t: W(54, 2) });
  card(S, "AGE THREE", 960, 440, { size: DS.type.small, fill: "yellow", t: W(54, 9) });
  card(S, "ALMOST THE SAME GENES ON", 960, 290, { size: DS.type.caption, t: W(54, 13) });
}, { cam: "none" });
shot(54, 18, (S) => {
  field(S, "paper", 0);
  [[700, 0], [1220, 1]].forEach(([x, k]) => { dave(S, x, 800, { s: 0.7, face: "smile" }); geneRow(S, x, 870, k ? [0, 0, 1, 0, 1, 1, 0, 0, 0, 1] : [1, 1, 0, 1, 1, 0, 1, 1, 1, 0], W(54, 21), "red"); });
  card(S, "AGE FIFTY", 960, 190, { size: DS.type.small, fill: "yellow", t: W(54, 19) });
  card(S, "VERY DIFFERENT GENES ON", 960, 290, { size: DS.type.caption, t: W(54, 24) });
  card(S, "SAME GENES, DIFFERENT LIVES", 960, 440, { size: DS.type.small, fill: "green", tc: "paper", t: W(54, 27) });
}, { cam: "none" });
// 55 "He is the same as you were, and a little less every year."
shot(55, 0, (S) => {
  kitchen(S);
  dave(S, 600, 935, { face: "smile", pose: "hips" });
  clone(S, 13, 1300, 935, { flip: true, face: "smile", pose: "hips" });
  const gh = L.put(S, "kit-dave", 1300, 935, { s: 0.92, flip: true }); gh.setAttribute("opacity", 0.55);
  tl.to(gh, { x: 150, opacity: 0.15, duration: 1.6, ease: "power1.inOut" }, W(55, 8));
});
// ===================== chapter 7: Saturday, noon (clips 56-63) =====================
// 56 "Which brings you back to the garage." 57 (@arlo) "I am not finishing your boat, Dave. But I will hold the other end."
shot(56, 0, (S) => {
  garage(S, 1);
  dave(S, 470, 935, { face: "worried" });
  clone(S, 18, 1330, 935, { flip: true, face: "smile", pose: "reach" });
}, { chap: "SATURDAY, NOON" });
shot(57, 0, (S) => {
  garage(S, 1);
  dave(S, 470, 935, { face: "worried" });
  clone(S, 18, 1330, 935, { flip: true, face: "smile", pose: "reach", talk: 57 });
});
// 58 (@dave) "I made you to build a boat. I should have asked who you were first." 59 (@arlo) "You are asking now. That counts."
shot(58, 0, (S) => {
  garage(S, 1);
  dave(S, 600, 935, { s: 1.1, face: "sad", talk: 58 });
  clone(S, 18, 1330, 935, { s: 1.1, flip: true, face: "smile" });
}, { cam: "push" });
shot(59, 0, (S) => {
  garage(S, 1);
  dave(S, 600, 935, { s: 1.1, face: "relieved" });
  clone(S, 18, 1330, 935, { s: 1.1, flip: true, face: "smile", talk: 59 });
}, { cam: "push" });
// 60 "It takes four hours. You hammer plank two. He hammers plank three, crooked, on purpose."
shot(60, 0, (S) => {
  noTyres(bg(S, "room-garage-light"));
  const b1 = boat(S, 960, 900, 1), b2 = boat(S, 960, 900, 2), b3 = boat(S, 960, 900, 3);
  b2.setAttribute("opacity", 0); b3.setAttribute("opacity", 0);
  swap(b1, b2, W(60, 6), 0.25); swap(b2, b3, W(60, 10), 0.25);
  S.sfx(W(60, 6), "thud", 800); S.sfx(W(60, 10), "thud", 1100);
  dave(S, 480, 935, { face: "determined", pose: "reach" });
  clone(S, 18, 1440, 935, { flip: true, face: "determined", pose: "reach" });
  L.put(S, "prop-hammer", 640, 700, { s: 1.4 });
  L.put(S, "prop-hammer", 1290, 700, { s: 1.4, flip: true });
  card(S, "FOUR HOURS", 960, 190, { size: DS.type.small, t: W(60, 2) });
  const h = [["CLONE AGE 18 / PLANKS 1", T0(S), W(60, 6)], ["CLONE AGE 18 / PLANKS 2", W(60, 6), W(60, 10)], ["CLONE AGE 18 / PLANKS 3", W(60, 10), 0]];
  h.forEach(([s, a, z]) => { const c = DS.card(S, s, 1480, 100, { size: DS.type.caption, fill: "yellow", t: a }); if (z) fadeOut(c.g, z); });
}, { hud: false });
// 61 "At noon you launch it. It floats. Mostly."
shot(61, 0, (S) => {
  bg(S, "world-mountain-lake");
  person(S, "dave", 880, 800, { s: 0.8, pose: "sit-chair", face: "smile" });
  person(S, "clone", 1080, 800, { s: 0.8, pose: "sit-chair", flip: true, face: "smile" });
  L.put(S, "ep92-boat-lake", 980, 840, { s: 1.0, leak: true });
  card(S, "NOON: LAUNCH", 960, 190, { size: DS.type.caption, t: W(61, 1) });
  card(S, "IT FLOATS", 560, 330, { size: DS.type.small, fill: "green", tc: "paper", t: W(61, 5) });
  card(S, "MOSTLY", 1400, 330, { size: DS.type.title, fill: "yellow", t: W(61, 7) });
  S.sfx(W(61, 5), "bloop", 960);
});
// 62 "Gran looks at the two of you for a long time. She says she can tell you apart. One of you has flour on him, and he answers to Arlo."
shot(62, 0, (S) => {
  bg(S, "world-mountain-lake");
  S.fill("M0 905 Q960 860 1920 905 L1920 1080 L0 1080 Z", T0(S), 0, DS.c("sand", 0), 1);  // shore: they stand on land after the launch
  gran(S, 420, 935, { s: 1.1, face: "thinking", pose: "hips" });
  person(S, "dave", 1040, 935, { face: "smile" });
  person(S, "clone", 1290, 935, { flip: true, face: "smile" });
  card(S, "SHE CAN TELL YOU APART", 960, 200, { size: DS.type.caption, fill: "yellow", t: W(62, 13) });
});
shot(62, 18, (S) => {
  bg(S, "world-mountain-lake");
  S.fill("M0 905 Q960 860 1920 905 L1920 1080 L0 1080 Z", T0(S), 0, DS.c("sand", 0), 1);  // shore: they stand on land after the launch
  person(S, "dave", 700, 935, { s: 1.2, face: "smile" });
  person(S, "clone", 1230, 935, { s: 1.2, flip: true, face: "smile" });
  card(S, "ONE HAS FLOUR", 1230, 240, { size: DS.type.small, fill: "yellow", t: W(62, 21) });
  S.arrow(1230, 290, 1230, 400, W(62, 21), 0.4, { c: DS.c("red", 2), w: DS.w.near });
  card(S, "ARLO", 1500, 520, { size: DS.type.small, fill: "orange", t: W(62, 29) });
});
// 63 "You wanted a copy. You got a brother thirty-two years younger, and a boat with a crooked plank."
shot(63, 0, (S) => {
  bg(S, "world-mountain-lake");
  person(S, "dave", 800, 840, { s: 0.9, pose: "sit-chair", face: "happy" });
  person(S, "clone", 1130, 840, { s: 0.9, pose: "sit-chair", flip: true, face: "happy" });
  L.put(S, "ep92-boat-lake", 960, 900, { s: 1.5 });
  card(S, "A BROTHER, 32 YEARS YOUNGER", 960, 190, { size: DS.type.caption, t: W(63, 6) });
  S.ring(960, 600, 540, 70, W(63, 15), 0.5, { c: DS.c("red", 2) });
  card(S, "A CROOKED PLANK", 960, 290, { size: DS.type.small, fill: "yellow", t: W(63, 15) });
}, { cam: "pull" });
// ===================== chapter 8: Next (clips 64-66) =====================
const lifeLine = (S, wallX = 1500) => {
  S.draw(line([300, 620], [1500, 620]), T0(S), 0, { c: DS.c("ink"), w: DS.w.near });
  for (let y = 0; y <= 12; y += 2) { S.draw(line([300 + y * 100, 590], [300 + y * 100, 650]), T0(S), 0, { c: DS.c("ink"), w: DS.w.mid }); S.text(String(y), 300 + y * 100, 720, { size: DS.type.caption, t: T0(S), c: DS.c("ink") }); }
  const w = S.grp(); S.draw(line([wallX, 440], [wallX, 650]), T0(S), 0, { c: DS.c("red", 2), w: DS.w.near * 3, parent: w });
  return w;
};
// 64 "Dolly's copies lived out their whole sheep lives. But a sheep gets eleven or twelve years, and not one more."
shot(64, 0, (S) => {
  field(S, "paper", 0);
  lifeLine(S);
  const sh = L.put(S, "animal-sheep", 380, 600, { s: 0.55 });
  S.move(sh, W(64, 0), W(64, 15) - W(64, 0), { x: 1000 }, "none");
  card(S, "ELEVEN OR TWELVE YEARS", 960, 190, { size: DS.type.small, fill: "yellow", t: W(64, 12) });
  card(S, "NOT ONE MORE", 1500, 380, { size: DS.type.caption, fill: "red", tc: "paper", t: W(64, 17) });
}, { cam: "none", hud: false, chap: "NEXT" });
// 65 "Who set that number? And what if you could move it?"
shot(65, 0, (S) => {
  field(S, "paper", 0);
  const wl = lifeLine(S);
  L.put(S, "animal-sheep", 1290, 600, { s: 0.55 });
  const d = dave(S, 1430, 618, { pose: "push", face: "determined", s: 0.6 });  // stands on the line, pushing the wall; clear of the year labels
  tl.to(wl, { x: 220, duration: 1.4, ease: "power2.inOut" }, W(65, 7));
  tl.to(d, { x: 220, duration: 1.4, ease: "power2.inOut" }, W(65, 7));
  card(S, "WHO SET THAT NUMBER?", 960, 190, { size: DS.type.small, t: W(65, 0) });
  card(S, "MOVE IT?", 960, 290, { size: DS.type.small, fill: "yellow", t: W(65, 6) });
}, { cam: "none", hud: false });
// 66 "If you want to know what happens at a thousand years, you know the button."
shot(66, 0, (S) => {
  field(S, "navy", 1);
  const g = S.grp(); DS.shape(S, circ(1200, 770, 180, 40), "gray", { w: "near", tone: 1, parent: g, t: T0(S) }); DS.shape(S, rrect(1020, 700, 360, 80, DS.r.md), "gray", { w: "near", parent: g, t: T0(S) });
  const bt = S.grp(); DS.shape(S, circ(1200, 690, 140, 80), "red", { w: "near", parent: bt, t: T0(S) }); S.text("1000", 1200, 710, { size: DS.type.title, c: DS.c("paper", 0), parent: bt, t: T0(S) });
  tl.to(bt, { y: 24, duration: 0.25, ease: "power2.in" }, W(66, 13));
  dave(S, 560, 935, { face: "smug", pose: "point" });
  card(S, "A THOUSAND YEARS", 960, 220, { size: DS.type.title, fill: "yellow", t: W(66, 9) });
}, { hud: false });
// ---------- run: sort the shots by cue, cut each 0.25 s after its first word (0.6 s crossfade before it) ----------
const hudFor = (c) => c <= 6 ? ["CLONE AGE 18 / PLANKS 1"] : c <= 13 ? null : c <= 19 ? ["CLONE AGE 0 / PLANKS 1"] : c <= 27 ? ["CLONE AGE 1 / PLANKS 1"] : c <= 36 ? ["CLONE AGE 5 / PLANKS 1"] : c <= 46 ? ["CLONE AGE 6 / DOLLY AGE 6", "PLANKS 1"] : c <= 55 ? ["CLONE AGE 13 / PLANKS 1"] : c <= 59 ? ["CLONE AGE 18 / PLANKS 1"] : c <= 63 ? ["CLONE AGE 18 / PLANKS 3"] : null;
SHOTS.sort((a, b) => a.c - b.c || a.w - b.w);
const WINS = sceneWindows(SHOTS.map((s) => [s.c, s.w]), -0.25);
SHOTS.forEach((s, k) => {
  const [a, b] = WINS[k], S = scene(a, b, { cam: s.o.cam || "push" }), g0 = S.g.parentNode;
  s.fn(S);
  const hud = s.o.hud === false ? null : s.o.hud || hudFor(s.c);
  if (hud) hud.forEach((h, i) => card(S, h, 1480, 100 + i * 90, { size: DS.type.caption, fill: "yellow" }));
  if (s.o.chap) { const c = card(S, s.o.chap, 460, 100, { size: DS.type.caption, fill: "sky" }); fadeOut(c.g, a + 4); }
  // ponytail: library scenes are heavy; off-screen pictures leave the layout tree so a seek only lays out the 1-2 live ones
  if (k > 0) { g0.style.display = "none"; tl.set(g0, { display: "inline" }, Math.max(0, a - 0.6)); }
  if (k < SHOTS.length - 1) tl.set(g0, { display: "none" }, b);
});
