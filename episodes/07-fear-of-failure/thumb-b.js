// theme: dark
// thumb B (dark): aim for ugly — notebook scribble
const S = scene(0, 1, { cam: "none" });
S.notebook(160, 240, 520, 620, 0, 0.5);
const scribble = (y0, n) => { const p = []; for (let i = 0; i <= n; i++) p.push([210 + (i / n) * 430, y0 + (i % 2 ? -16 : 12) + (i % 3) * 5]); return smooth(p); };
[360, 460, 560, 660].forEach((y, i) => S.draw(scribble(y, 10 + i), 0.2, 0.4, { c: ORANGE, w: 7 }));
S.text("AIM FOR", 1280, 440, { size: 190, t: 0, dur: 0.5 });
S.text("UGLY.", 1280, 720, { size: 230, c: ORANGE, t: 0, dur: 0.5 });
