// ---------- run: sort the shots by cue; each picture is fully in at its first word (0.6 s crossfade before it) ----------
SHOTS.sort((a, b) => a.c - b.c || a.w - b.w);
const WINS = sceneWindows(SHOTS.map((s) => [s.c, s.w]), 0);
SHOTS.forEach((s, k) => {
  const [a, b] = WINS[k], S = scene(a, b, s.o || {}), g0 = S.g.parentNode;
  S.end = b;
  s.fn(S);
  if (!(s.o && s.o.nohud)) hud(S, s.c, s.w);
  if (s.w === 0 && CHAPT[s.c]) S.sfx(S.start + 0.3, "tick", 1640);  // chapter = the HUD clock jumps (no centre card: it hit signs and clocks)
  if (k > 0) { g0.style.display = "none"; tl.set(g0, { display: "inline" }, Math.max(0, a - 0.6)); }
  if (k < SHOTS.length - 1) tl.set(g0, { display: "none" }, b);
});
