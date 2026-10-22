#!/usr/bin/env python3
"""Find near-blank frames in a rendered video (renderer dropped the board layer: bare paper + captions only).
usage: python3 blank_scan.py VIDEO.mp4   -> prints the times; exit 1 if any.
ponytail: 2 fps, 96x54 grey; picture area (caption band ignored) with std-dev < 8 and mean > 225 = blank paper."""
import statistics, subprocess, sys
w, h = 96, 54
raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', sys.argv[1], '-vf', f'fps=2,scale={w}:{h},format=gray', '-f', 'rawvideo', '-'], capture_output=True).stdout
n = len(raw) // (w * h)
fr = lambda i: raw[i * w * h:i * w * h + w * 44]
bad = [i / 2 for i in range(n) if statistics.pstdev(fr(i)) < 8 and statistics.fmean(fr(i)) > 225]  # pale + uniform = bare paper (dark night skies are not blank)
print(f'blank_scan: {n} frames checked, {len(bad)} near-blank' + (f' at {bad[:40]} s' if bad else ''))
sys.exit(1 if bad else 0)
