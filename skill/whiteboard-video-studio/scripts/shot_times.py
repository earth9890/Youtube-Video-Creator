#!/usr/bin/env python3
"""Print shot start/len and a review time (after pops) per shot, from parts/*.js + assets/words.json. usage: shot_times.py [from_clip to_clip]"""
import json, re, glob, sys
W = {(c, i): s for c, i, _, s, e in json.load(open('assets/words.json'))['words']}
tot = json.load(open('assets/words.json'))['total']
sh = sorted({(int(c), int(w)) for f in sorted(glob.glob('parts/*.js')) for c, w in re.findall(r'^shot\((\d+), (\d+),', open(f).read(), re.M)})
st = [0 if k == 0 else round(W[s] - 0.08, 3) for k, s in enumerate(sh)]
lo, hi = (int(sys.argv[1]), int(sys.argv[2])) if len(sys.argv) > 2 else (0, 999)
for k, s in enumerate(sh):
    a = st[k]; b = st[k + 1] if k + 1 < len(st) else tot
    if lo <= s[0] <= hi: print(f'{s[0]}:{s[1]}\t{a:.2f}\t{b - a:.2f}\t{a + min(0.9, (b - a) * 0.7):.2f}')
