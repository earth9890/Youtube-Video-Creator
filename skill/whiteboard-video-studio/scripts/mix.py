#!/usr/bin/env python3
"""Run with ~/.venvs/musicgen/bin/python (needs numpy, scipy, soundfile).
Mix voice + music bed into assets/mix.wav for a whiteboard video.

usage: mix.py PROJECT_DIR BED.wav [--bed-db -17] [--duck-db -9] [--tail-boost 3] [--no-dropout]

- Loops BED (any length) to the voice length with 1.5 s equal-power crossfades, 1.2 s fade-in, 2 s fade-out.
- Ducks the bed under speech: an envelope from the voice RMS (attack 60 ms, release 500 ms) lowers the bed by --duck-db.
- Bed sits at --bed-db relative to the voice peak (default -17 dB ≈ "felt not heard"); +--tail-boost dB over the last 12 s so the ending swells.
- Dropout: the bed dips to silence for the pause before the FINAL sentence (read from assets/clipt.json) — the silent beat
  the craft playbook asks for — then returns under the last line. Disable with --no-dropout.
- Output is peak-normalised to -1 dBFS; the voice itself is not changed.
Then rebuild: build.py PROJECT_DIR (it prefers assets/mix.wav when present).
"""
import json, sys, pathlib, numpy as np, soundfile as sf
from scipy.signal import resample_poly

a = sys.argv[1:]
proj = pathlib.Path(a[0]).resolve(); bed_path = pathlib.Path(a[1]).resolve()
opt = lambda k, d: float(a[a.index(k) + 1]) if k in a else d
BED_DB, DUCK_DB, TAIL = opt('--bed-db', -17), opt('--duck-db', -9), opt('--tail-boost', 3)
dropout = '--no-dropout' not in a

v, sr = sf.read(proj / 'assets' / 'voice.wav'); v = (v if v.ndim == 1 else v.mean(1)).astype(np.float32)
b, bsr = sf.read(bed_path); b = (b if b.ndim == 1 else b.mean(1)).astype(np.float32)
if bsr != sr: b = resample_poly(b, sr, bsr).astype(np.float32)
b = b / (np.abs(b).max() + 1e-9)
# trim bed head/tail silence, then loop with crossfades
idx = np.where(np.abs(b) > 0.01)[0]; b = b[idx[0]:idx[-1]]
N = len(v); xf = int(1.5 * sr)
out = np.zeros(N + len(b), np.float32); pos = 0
while pos < N:
    seg = b.copy()
    if pos > 0:
        ramp = np.sin(np.linspace(0, np.pi / 2, xf)) ** 2
        out[pos:pos + xf] *= (1 - ramp); seg[:xf] *= ramp
    out[pos:pos + len(seg)] += seg
    pos += len(seg) - xf
bed = out[:N]
fi, fo = int(1.2 * sr), int(2.0 * sr)
bed[:fi] *= np.linspace(0, 1, fi); bed[-fo:] *= np.linspace(1, 0, fo)
# ducking envelope from voice RMS
win = int(0.02 * sr)
rms = np.sqrt(np.convolve(v ** 2, np.ones(win) / win, mode='same'))
gate = (rms > 0.02).astype(np.float32)
env = np.zeros(N, np.float32); att, rel = np.exp(-1 / (0.06 * sr)), np.exp(-1 / (0.5 * sr)); e = 0.0
for i in range(N):  # one-pole attack/release follower
    g = gate[i]; e = g + (e - g) * (att if g > e else rel); env[i] = e
duck = 10 ** (DUCK_DB / 20)
gain = (1 - env) + env * duck
# tail swell
tb = int(12 * sr); gain[-tb:] *= np.linspace(1, 10 ** (TAIL / 20), tb)
# dropout before the final sentence
if dropout:
    C = json.load(open(proj / 'assets' / 'clipt.json'))['clips']
    if len(C) >= 2:
        s0, s1 = int(C[-2][1] * sr), int(C[-1][0] * sr)
        if s1 - s0 > int(0.3 * sr):
            r = int(0.25 * sr)
            gain[s0:s0 + r] *= np.linspace(1, 0, r); gain[s0 + r:s1 - r] = 0; gain[s1 - r:s1] *= np.linspace(0, 1, r)
            # come back under the last line gently
            back = min(int(1.0 * sr), N - s1); gain[s1:s1 + back] *= np.linspace(0.6, 1, back)
vpk = np.abs(v).max()
mix = v + bed * gain * vpk * 10 ** (BED_DB / 20)
mix = mix / (np.abs(mix).max() + 1e-9) * 10 ** (-1 / 20)
sf.write(proj / 'assets' / 'mix.wav', mix, sr)
print(f'mix.wav written: {N / sr:.1f}s, bed {BED_DB} dB, duck {DUCK_DB} dB, dropout={dropout}')
