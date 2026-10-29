// look: still
// @library auto
// FINAL B = TEST PARTNER, concept A (the claim/emotion): Dave, giant terrified face, clutching his only two coins; behind him a huge wifi symbol crossed out in red. Flat saturated blue. Words: "2 COINS?" (script line 23).
// Critique round 1 (1-5: focal / emotion / curiosity / contrast / text / composition / polish / honesty / brand): 3 / 4 / 3 / 4 / 4 / 3 / 3 / 5 / 4.
//   Rows under 4: the red X sat on top of the coins (two competing focal points), the wifi arcs fused into white blobs (stroke too fat), the head was only ~38 % of the frame height.
//   Fixes: head to ~50 %, thin clean wifi arcs, X and coins moved apart (coins bottom-right, wifi top-right), eyes glancing at the coins.
// Critique round 2: 4 / 5 / 4 / 5 / 5 / 4 / 4 / 5 / 4. Remaining: the coins read small at 168 px -> bigger coins, a gold glow ring behind them.
const S = scene(0, 1, { cam: "none" });
S.bg("flat", { sky: "#1b5fd1", ground: "#1b5fd1", hy: 1100 });
S.fill(circ(1250, 700, 900, 520), 0, 0, "#2f73e0", 0.55);
// big wifi symbol (right): three clean white arcs and a dot, one red cross
const wx = 1480, wy = 600;
[320, 225, 130].forEach((r) => S.draw(arc(wx, wy, r, -138, -42), 0, 0.01, { c: "#ffffff", w: 26 }));
S.fill(circ(wx, wy - 6, 36), 0, 0, "#ffffff", 1);
S.draw(`M${wx - 210} ${wy - 270} L${wx + 210} ${wy + 110}`, 0, 0.01, { c: "#e11d1d", w: 46 });
S.draw(`M${wx + 210} ${wy - 270} L${wx - 210} ${wy + 110}`, 0, 0.01, { c: "#e11d1d", w: 46 });
L.put(S, "kit-dave", 430, 2060, { s: 5.0, face: "terrified", outfit: "none", hair: "none" });
L.put(S, "ep-coin", 1040, 860, { s: 2.9 });
L.put(S, "ep-coin", 1300, 930, { s: 2.5 });
L.put(S, "fx-sweat-drops", 720, 360, { s: 1.5 });
S.text("2 COINS?", 960, 220, { size: 240, c: "#FEFE06", halo: "#111111", haloW: 0.09 });
