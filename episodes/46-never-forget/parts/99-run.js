// ---------- run: sort the shots by cue, cut each picture 0.25 s after its first word (0.6 s crossfade before it) ----------
SHOTS.sort((a, b) => a.c - b.c || a.w - b.w);
const WINS = sceneWindows(SHOTS.map((s) => [s.c, s.w]), -0.25);
SHOTS.forEach((s, k) => {
  const [a, b] = WINS[k], S = scene(a, b, s.o || {}), g0 = S.g.parentNode;
  s.fn(S);
  // ponytail: library scenes are heavy (~48k nodes in all); off-screen pictures leave the layout tree so a seek only lays out the 1-2 live ones
  if (k > 0) { g0.style.display = "none"; tl.set(g0, { display: "inline" }, Math.max(0, a - 0.6)); }
  if (k < SHOTS.length - 1) tl.set(g0, { display: "none" }, b);
});
