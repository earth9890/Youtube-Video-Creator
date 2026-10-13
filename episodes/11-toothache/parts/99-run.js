// ===== run: one scene per shot, cut 0.08 s before the phrase (story-explainer §4) =====
SHOTS.sort((a, b) => a.c - b.c || a.w - b.w);
const ST = SHOTS.map((s, k) => (k === 0 ? 0 : +(W(s.c, s.w) - 0.08).toFixed(3)));
SHOTS.forEach((s, k) => {
  const a = ST[k], b = k + 1 < ST.length ? ST[k + 1] : TOTAL;
  if (b - a > 6.5) console.warn(`long shot ${s.c}:${s.w} ${(b - a).toFixed(1)}s`);
  s.fn(scene(a, b, s.o));
});
