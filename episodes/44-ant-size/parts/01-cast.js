

// ---------- Dave talks: open-mouth flaps over the closed mouth (the face itself never changes, so nothing blinks) ----------
const MOUTHC = DS.mix(DS.P.red[2], DS.P.ink[0], 0.45);
const flaps = (a, b, t0, t1) => { // a = small open mouth, b = big open mouth; a slow, irregular chatter
  const seq = [1, 2, 0, 2, 1, 2, 0, 1, 2, 2, 0, 1];
  let i = 0;
  for (let t = t0; t < t1 - 0.1; t += 0.2, i++) { const s = seq[i % seq.length]; tl.set(a, { opacity: s === 1 ? 1 : 0 }, t); tl.set(b, { opacity: s === 2 ? 1 : 0 }, t); }
  tl.set([a, b], { opacity: 0 }, t1);
};
const talk = (S, F, t0, t1) => {
  const R = F.r, x = F.hd[0] + (F.look || 0) * F.s * 0.8, y = F.hd[1] + 0.5 * R, g = F.P.head.parentNode, mk = (d) => el("path", { d, fill: MOUTHC, stroke: DS.P.ink[0], "stroke-width": Math.max(2.5, R * 0.05), opacity: 0 }, g);
  flaps(mk(circ(x, y, 0.14 * R, 0.09 * R)), mk(circ(x, y + 0.03 * R, 0.13 * R, 0.2 * R)), t0, t1);
};
const DAVE_S = 1.1;

// ---------- Dave's Brain: a small pink brain, round librarian glasses, a bun with a pencil, a green cardigan. Calm, tired, finger to lips ----------
// feet at (cx, gy); height about 295 * k. faces: tired stern worried smile shh. arms: R down shush point stop; L down hip up
const brainy = (S, cx, gy, k = 1, o = {}) => {
  const g = S.grp(o.parent), w = Math.max(3, 5.5 * Math.sqrt(k)), wd = Math.max(2, 3 * Math.sqrt(k)), INKC = DS.P.ink[0], t0 = o.t;
  const shp = (d, name, ww = w, tone, parent) => S.draw(d, t0 ?? S.start, 0, { fill: tone === undefined ? DS.vol(name) : DS.c(name, tone), c: INKC, w: ww, parent: parent || g });
  const X = (v) => cx + v * k, Y = (v) => gy + v * k;
  // legs + shoes
  S.draw(`M${X(-20)} ${Y(-62)} L${X(-22)} ${Y(-8)} M${X(20)} ${Y(-62)} L${X(22)} ${Y(-8)}`, t0 ?? S.start, 0, { c: INKC, w: w * 1.1, parent: g });
  shp(circ(X(-27), Y(-5), 17 * k, 8 * k), "ink", wd, 1); shp(circ(X(27), Y(-5), 17 * k, 8 * k), "ink", wd, 1);
  // cardigan + blouse + buttons
  shp(`M${X(-42)} ${Y(-140)} Q${X(0)} ${Y(-152)} ${X(42)} ${Y(-140)} L${X(54)} ${Y(-58)} Q${X(0)} ${Y(-48)} ${X(-54)} ${Y(-58)} Z`, "green");
  shp(`M${X(-14)} ${Y(-146)} L${X(0)} ${Y(-96)} L${X(14)} ${Y(-146)} Z`, "paper", wd, 1);
  [[-26, -112], [-28, -92], [-30, -72]].forEach(([dx, dy]) => shp(circ(X(dx), Y(dy), 4.5 * k), "gold", wd, 0));
  // hair bun + pencil, then the brain
  shp(circ(X(-34), Y(-268), 26 * k), "brown", wd);
  S.draw(`M${X(-74)} ${Y(-296)} L${X(-2)} ${Y(-262)}`, t0 ?? S.start, 0, { c: DS.c("yellow", 0), w: w * 1.5, parent: g });
  S.draw(`M${X(-74)} ${Y(-296)} L${X(-80)} ${Y(-299)}`, t0 ?? S.start, 0, { c: DS.c("pink", 0), w: w * 1.5, parent: g });
  const pts = []; for (let i = 0; i <= 26; i++) { const a = (i / 24) * Math.PI * 2, r = 1 + 0.055 * Math.cos(12 * a); pts.push([X(Math.cos(a) * 80 * r), Y(-200 + Math.sin(a) * 58 * r)]); }
  shp(smooth(pts), "pink");
  [[[0, -256], [6, -232], [-6, -212], [4, -190], [-2, -168]], [[-66, -214], [-48, -228], [-34, -210], [-20, -224]], [[66, -214], [48, -228], [34, -210], [20, -224]], [[-62, -176], [-46, -164], [-34, -178]], [[62, -176], [46, -164], [34, -178]]]
    .forEach((p) => S.draw(smooth(p.map(([a, b]) => [X(a), Y(b)])), t0 ?? S.start, 0, { c: DS.c("pink", 2), w: wd, parent: g }));
  // glasses
  [-30, 30].forEach((dx) => shp(circ(X(dx), Y(-198), 21 * k), "glass", w * 0.8, 1));
  S.draw(`M${X(-9)} ${Y(-202)} Q${X(0)} ${Y(-208)} ${X(9)} ${Y(-202)} M${X(-51)} ${Y(-200)} L${X(-74)} ${Y(-206)} M${X(51)} ${Y(-200)} L${X(74)} ${Y(-206)}`, t0 ?? S.start, 0, { c: INKC, w: w * 0.8, parent: g });
  // faces
  const F = {};
  const face = (name, build) => { const fg = S.grp(g); build(fg); fg.setAttribute("opacity", 0); F[name] = fg; };
  const eyes = (fg, dy = 0, rr = 4.5) => [-30, 30].forEach((dx) => S.draw(circ(X(dx), Y(-198 + dy), rr * k), t0 ?? S.start, 0, { fill: INKC, c: INKC, w: DS.w.hair, parent: fg }));
  const brow = (fg, a, b, sd) => S.draw(`M${X(sd * 30 + a[0])} ${Y(a[1])} L${X(sd * 30 + b[0])} ${Y(b[1])}`, t0 ?? S.start, 0, { c: INKC, w: w * 0.7, parent: fg });
  const mouth = (fg, d) => S.draw(d, t0 ?? S.start, 0, { c: INKC, w: w * 0.7, parent: fg });
  face("tired", (fg) => { // heavy lids: the top half of each lens is lid
    [-30, 30].forEach((dx) => { S.draw(`M${X(dx - 19)} ${Y(-198)} A${19 * k} ${19 * k} 0 0 1 ${X(dx + 19)} ${Y(-198)} Z`, t0 ?? S.start, 0, { fill: DS.c("pink", 1), c: INKC, w: wd, parent: fg }); });
    eyes(fg, 7, 4); mouth(fg, `M${X(-9)} ${Y(-163)} Q${X(0)} ${Y(-160)} ${X(9)} ${Y(-165)}`);
  });
  face("stern", (fg) => { eyes(fg, 1); brow(fg, [-18, -228], [14, -220], -1); brow(fg, [18, -228], [-14, -220], 1); mouth(fg, `M${X(-10)} ${Y(-164)} L${X(10)} ${Y(-164)}`); });
  face("worried", (fg) => { eyes(fg, 1); brow(fg, [-16, -218], [14, -230], -1); brow(fg, [16, -218], [-14, -230], 1); mouth(fg, `M${X(-10)} ${Y(-162)} Q${X(-4)} ${Y(-168)} ${X(2)} ${Y(-162)} Q${X(7)} ${Y(-157)} ${X(11)} ${Y(-163)}`); });
  face("smile", (fg) => { eyes(fg, 1); mouth(fg, `M${X(-11)} ${Y(-168)} Q${X(0)} ${Y(-155)} ${X(11)} ${Y(-168)}`); });
  face("shh", (fg) => { eyes(fg, 2, 4); brow(fg, [-18, -226], [14, -221], -1); brow(fg, [18, -226], [-14, -221], 1); S.draw(circ(X(0), Y(-163), 4.5 * k), t0 ?? S.start, 0, { c: INKC, w: w * 0.6, parent: fg }); });
  let curF = o.face || "tired"; F[curF].setAttribute("opacity", 1);
  // arms
  const arms = { R: {}, L: {} }, hand = (fg, x, y, r = 8) => shp(circ(X(x), Y(y), r * k), "pink", wd, 1, fg);
  const arm = (side, name, pts, hnd) => { const fg = S.grp(g); S.draw(smooth(pts.map(([a, b]) => [X(a), Y(b)])), t0 ?? S.start, 0, { c: INKC, w: w * 1.1, parent: fg }); if (hnd) hnd(fg); fg.setAttribute("opacity", 0); arms[side][name] = fg; };
  arm("R", "down", [[46, -130], [66, -100], [62, -70]], (fg) => hand(fg, 62, -66));
  arm("R", "shush", [[46, -128], [80, -118], [40, -150], [8, -166]], (fg) => { hand(fg, 8, -164, 7); shp(rrect(X(2), Y(-196), 11 * k, 40 * k, 5 * k), "pink", wd, 1, fg); });
  arm("R", "point", [[46, -128], [90, -134], [128, -134]], (fg) => { hand(fg, 128, -134, 9); shp(rrect(X(130), Y(-139), 30 * k, 10 * k, 5 * k), "pink", wd, 1, fg); });
  arm("R", "stop", [[46, -128], [84, -150], [92, -190]], (fg) => hand(fg, 92, -196, 15));
  arm("L", "down", [[-46, -130], [-66, -100], [-62, -70]], (fg) => hand(fg, -62, -66));
  arm("L", "hip", [[-46, -130], [-84, -108], [-54, -88]], (fg) => hand(fg, -54, -88, 7));
  arm("L", "up", [[-46, -130], [-86, -140], [-62, -176]], (fg) => hand(fg, -62, -178, 9));
  const cur = { R: o.armR || "down", L: o.armL || "down" }; arms.R[cur.R].setAttribute("opacity", 1); arms.L[cur.L].setAttribute("opacity", 1);
  // mouth flaps (open mouth over the face's closed mouth)
  const mk = (rx, ry, dy) => el("path", { d: circ(X(0), Y(-163 + dy), rx * k, ry * k), fill: MOUTHC, stroke: INKC, "stroke-width": wd, opacity: 0 }, g);
  const B = { g, cx, gy, k };
  B.talk = (a, b) => flaps(mk(6, 3.5, 0), mk(7, 8, 2), a, b);
  B.face = (t, name) => { tl.set(F[curF], { opacity: 0 }, t); tl.set(F[name], { opacity: 1 }, t); curF = name; return B; };
  B.arm = (t, side, name) => { tl.set(arms[side][cur[side]], { opacity: 0 }, t); tl.set(arms[side][name], { opacity: 1 }, t); cur[side] = name; return B; };
  // pop up from (dx, dy) away, small and transparent
  B.enter = (t, dx = 0, dy = 80, dur = 0.5, s0 = 0.5) => { const tf = (a, b, s) => `translate(${a} ${b}) translate(${cx} ${gy}) scale(${s}) translate(${-cx} ${-gy})`; tl.fromTo(g, { attr: { transform: tf(dx, dy, s0) }, opacity: 0 }, { attr: { transform: tf(0, 0, 1) }, opacity: 1, duration: dur, ease: "back.out(1.5)", immediateRender: true }, t); return B; };
  B.shift = (t, dur, dx, dy, s1 = 1) => { tl.to(g, { attr: { transform: `translate(${dx} ${dy}) translate(${cx} ${gy}) scale(${s1}) translate(${-cx} ${-gy})` }, duration: dur, ease: "power2.inOut" }, t); return B; };
  B.top = [cx, Y(-290)]; B.mouthAt = [cx, Y(-163)]; B.head = [cx, Y(-200)];
  return B;
};

// ---------- the ant "kid": a friendly black garden ant worker (she). Round shiny abdomen, big head, two big eyes, rosy cheeks, a pink bow, bobbly antennae ----------
// feet at (cx, gy), faces right (dir -1 = left); about 150 * k tall, 230 * k long. o.body = colour name (default "ink"), o.flip = hangs upside down below gy, o.look = pupil shift.
// faces: smile cheeky wow flat worried. Layers: g (move it) > bob (walk bounce) > flip (static mirror).
const ant = (S, cx, gy, k = 1, o = {}) => {
  const dir = o.dir || 1, flip = o.flip ? -1 : 1, t0 = o.t, body = o.body || "ink", INKC = DS.P.ink[0], w = Math.max(3, 5 * Math.sqrt(k)), wd = Math.max(2, 3 * Math.sqrt(k));
  const g = S.grp(o.parent), bob = S.grp(g), fl = S.grp(bob);
  fl.setAttribute("transform", `translate(${cx} ${gy}) scale(${dir} ${flip}) translate(${-cx} ${-gy})`);
  const X = (v) => cx + v * k, Y = (v) => gy + v * k, T = t0 ?? S.start;
  const shp = (d, name, ww = w, tone, parent) => S.draw(d, T, 0, { fill: tone === undefined ? DS.vol(name) : DS.c(name, tone), c: INKC, w: ww, parent: parent || fl });
  const legs = (pairs, c) => pairs.forEach(([hx, kx, fx]) => S.draw(`M${X(hx)} ${Y(-54)} L${X(hx + kx)} ${Y(-30)} L${X(hx + fx)} ${Y(-2)}`, T, 0, { c, w: w * 1.15, parent: fl }));
  legs([[-26, -26, -34], [-2, 4, -4], [20, 24, 34]].map(([a, b, c]) => [a + 12, b, c]), DS.c("gray", 2)); // far legs, offset and greyer
  legs([[-26, -26, -34], [-2, 4, -4], [20, 24, 34]], INKC);
  shp(circ(X(-88), Y(-62), 56 * k, 42 * k), body);
  S.fill(circ(X(-106), Y(-80), 20 * k, 9 * k), T, 0, DS.P.white[0], 0.32, fl); // shine
  shp(circ(X(-38), Y(-62), 11 * k), body, wd);
  shp(circ(X(-12), Y(-68), 34 * k, 27 * k), body);
  // antennae with little bobbles
  [[[44, -114], [38, -150], [60, -176]], [[62, -116], [78, -146], [106, -158]]].forEach((p) => { S.draw(smooth(p.map(([a, b]) => [X(a), Y(b)])), T, 0, { c: INKC, w: w * 0.8, parent: fl }); S.draw(circ(X(p[2][0]), Y(p[2][1]), 6 * k), T, 0, { fill: INKC, c: INKC, w: DS.w.hair, parent: fl }); });
  shp(circ(X(52), Y(-84), 38 * k), body);
  // pink bow on the back of the head
  [-1, 1].forEach((sd) => shp(`M${X(26)} ${Y(-116)} Q${X(26 + sd * 28)} ${Y(-142)} ${X(26 + sd * 30)} ${Y(-114)} Q${X(26 + sd * 14)} ${Y(-108)} ${X(26)} ${Y(-116)} Z`, "pink", wd, 0));
  shp(circ(X(26), Y(-115), 6 * k), "pink", wd, 2);
  // eyes: big white discs, black pupils with a catch-light
  const lk = (o.look || 0) * 3 * k;
  [[40, -90], [66, -90]].forEach(([ex, ey]) => { S.draw(circ(X(ex), Y(ey), 13 * k), T, 0, { fill: DS.P.white[0], c: DS.P.white[2], w: DS.w.hair, parent: fl }); S.draw(circ(X(ex) + lk, Y(ey + 1), 7 * k), T, 0, { fill: INKC, c: INKC, w: DS.w.hair, parent: fl }); S.fill(circ(X(ex) + lk + 2.5 * k, Y(ey - 2.5), 2.4 * k), T, 0, DS.P.white[0], 1, fl); });
  [[30, -70], [78, -70]].forEach(([ex, ey]) => S.fill(circ(X(ex), Y(ey), 7 * k, 5 * k), T, 0, DS.c("pink", 0), 0.85, fl));
  const F = {}, face = (name, build) => { const fg = S.grp(fl); build(fg); fg.setAttribute("opacity", 0); F[name] = fg; };
  const mouth = (fg, d) => S.draw(d, T, 0, { c: DS.c("pink", 1), w: w * 0.7, parent: fg });
  const brow = (fg, a, b) => S.draw(`M${X(a[0])} ${Y(a[1])} L${X(b[0])} ${Y(b[1])}`, T, 0, { c: DS.c("gray", 1), w: w * 0.6, parent: fg });
  face("smile", (fg) => mouth(fg, `M${X(44)} ${Y(-66)} Q${X(54)} ${Y(-54)} ${X(66)} ${Y(-67)}`));
  face("cheeky", (fg) => { mouth(fg, `M${X(42)} ${Y(-64)} Q${X(58)} ${Y(-52)} ${X(70)} ${Y(-70)}`); brow(fg, [58, -110], [76, -116]); });
  face("wow", (fg) => { S.draw(circ(X(54), Y(-62), 6 * k, 8 * k), T, 0, { fill: DS.c("red", 0), c: DS.c("pink", 1), w: wd, parent: fg }); brow(fg, [30, -112], [48, -110]); brow(fg, [60, -110], [78, -112]); });
  face("flat", (fg) => { mouth(fg, `M${X(46)} ${Y(-64)} L${X(64)} ${Y(-64)}`); brow(fg, [30, -108], [48, -106]); });
  face("worried", (fg) => { mouth(fg, `M${X(44)} ${Y(-60)} Q${X(54)} ${Y(-68)} ${X(66)} ${Y(-60)}`); brow(fg, [30, -104], [48, -112]); brow(fg, [60, -112], [78, -104]); });
  let cur = o.face || "smile"; F[cur].setAttribute("opacity", 1);
  const mk = (rx, ry, dy) => el("path", { d: circ(X(54), Y(-62 + dy), rx * k, ry * k), fill: DS.c("red", 0), stroke: DS.c("pink", 1), "stroke-width": wd, opacity: 0 }, fl);
  const B = { g, bob, cx, gy, k };
  B.talk = (a, b) => flaps(mk(6, 3.5, 0), mk(7, 8, 2), a, b);
  B.face = (t, name) => { tl.set(F[cur], { opacity: 0 }, t); tl.set(F[name], { opacity: 1 }, t); cur = name; return B; };
  B.shift = (t, dur, dx, dy = 0, ease = "power1.inOut") => { shift(g, t, dur, [0, 0], [dx, dy], ease); return B; };
  const bounce = (t, dur, k2 = k) => tl.to(bob, { y: -5 * k2, duration: 0.25, repeat: 2 * Math.max(1, Math.round(dur / 0.5)) - 1, yoyo: true, ease: "sine.inOut" }, t); // gentle bounce, ~2 per second
  B.walk = (t, dur, dx, dy = 0) => { B.shift(t, dur, dx, dy, "none"); bounce(t, dur); return B; };
  B.walkIn = (t, dur, dx, dy = 0) => { tl.fromTo(g, { attr: { transform: `translate(${dx} ${dy})` } }, { attr: { transform: "translate(0 0)" }, duration: dur, ease: "none", immediateRender: true }, t); bounce(t, dur); return B; };
  const XA = (v) => cx + dir * v * k; B.top = [XA(10), Y(-190)]; B.mouthAt = [XA(54), Y(-62)]; B.head = [XA(52), Y(-84)]; B.XA = XA; B.YA = Y; // anchors in scene coordinates (dir applied)
  return B;
};
