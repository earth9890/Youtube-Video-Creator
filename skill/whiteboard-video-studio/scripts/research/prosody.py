"""Tiny prosody toolkit: YIN F0, frame dB, whisper words -> sentences with pause/rate/pitch.
usage: ~/.venvs/pocket/bin/python prosody.py X.wav X.json  -> writes X.sent.tsv
"""
import json, sys, re
import numpy as np, soundfile as sf
from scipy.signal import resample_poly, butter, sosfiltfilt

HOP = 0.01

def load(path, sr=16000):
    x, r = sf.read(path, dtype='float32')
    x = x if x.ndim == 1 else x.mean(1)
    if r != sr:
        g = np.gcd(r, sr); x = resample_poly(x, sr // g, r // g).astype(np.float32)
    return x, sr

def frame_db(x, sr):
    h, w = int(HOP * sr), int(.025 * sr)
    n = max(1, (len(x) - w) // h)
    idx = np.arange(w)[None] + h * np.arange(n)[:, None]
    return 10 * np.log10((x[idx] ** 2).mean(1) + 1e-10)

def yin(x, sr, fmin=60, fmax=400, thr=0.25):
    """F0 per 10 ms frame (nan = unvoiced). Vectorised YIN (cumulative-mean-normalised difference)."""
    x = sosfiltfilt(butter(6, 900, fs=sr, output='sos'), x).astype(np.float32)   # lowpass: +15-25% voiced frames
    h, W = int(HOP * sr), int(.025 * sr)
    tmin, tmax = int(sr / fmax), int(sr / fmin)
    L = W + tmax; n = max(1, (len(x) - L) // h)
    f0 = np.full(n, np.nan, np.float32)
    nfft = 1 << int(np.ceil(np.log2(L + W)))
    for s in range(0, n, 4000):  # batches
        idx = np.arange(L)[None] + h * np.arange(s, min(n, s + 4000))[:, None]
        fr = x[idx].astype(np.float64)
        a = fr[:, :W]
        # r(tau) = sum_j a_j * fr_{j+tau}
        r = np.fft.irfft(np.conj(np.fft.rfft(a, nfft)) * np.fft.rfft(fr, nfft), nfft)[:, :tmax + 1]
        c = np.concatenate([np.zeros((len(fr), 1)), np.cumsum(fr ** 2, 1)], 1)
        e0 = c[:, W:W + 1] - c[:, :1]
        et = c[:, W:W + tmax + 1] - c[:, :tmax + 1]       # energy of window shifted by tau
        d = e0 + et - 2 * r; d[:, 0] = 0
        cm = d[:, 1:] * np.arange(1, tmax + 1) / np.maximum(np.cumsum(d[:, 1:], 1), 1e-12)
        cm = np.concatenate([np.ones((len(fr), 1)), cm], 1)
        cm[:, :tmin] = 9
        below = cm < thr
        first = np.where(below.any(1) & (e0[:, 0] / W > 1e-7), below.argmax(1), -1)
        for i, t in enumerate(first):
            if t < 0: continue
            while t + 1 <= tmax and cm[i, t + 1] < cm[i, t]: t += 1   # walk to local min
            # parabolic interpolation
            if 0 < t < tmax:
                y0, y1, y2 = cm[i, t - 1], cm[i, t], cm[i, t + 1]
                den = y0 - 2 * y1 + y2; t = t + (0.5 * (y0 - y2) / den if den else 0)
            f0[s + i] = sr / t
    # drop octave/glitch frames: >4 st from the median of the surrounding 9 voiced frames
    v = np.where(~np.isnan(f0))[0]
    if len(v) > 9:
        lf = np.log2(f0[v]); med = np.median(np.lib.stride_tricks.sliding_window_view(np.pad(lf, 4, mode='edge'), 9), 1)
        f0[v[np.abs(lf - med) * 12 > 4]] = np.nan
    return f0

def syllables(w):  # crude: vowel groups, minus silent final e; digits ~ 1.5 syl each
    w = w.lower(); d = sum(c.isdigit() for c in w)
    w = re.sub(r'[^a-z]', '', w); n = len(re.findall(r'[aeiouy]+', w)) - (w.endswith('e') and not w.endswith('le') and len(w) > 2)
    return max(1 if w else 0, n) + round(1.5 * d)

def st(f, ref):  # semitones
    return 12 * np.log2(f / ref)

def words_from_whisper(js):
    W = []
    for s in json.load(open(js))['transcription']:
        t = s['text'].strip()
        if not t or t.startswith('[') or t.startswith('('): continue
        d = [k['t_dtw'] for k in s['tokens'] if k.get('t_dtw', -1) >= 0]
        on = d[0] / 100 if d else s['offsets']['from'] / 1000   # DTW onset (needs whisper-cli -dtw MODEL -nfa)
        W.append([on, s['offsets']['to'] / 1000, t])
    return W

def sentences(W):
    S, cur = [], []
    for w in W:
        cur.append(w)
        if re.search(r'[.?!]["\')]*$', w[2]) and not re.fullmatch(r'(Mr|Mrs|Dr|St|vs|etc)\.', w[2]):
            S.append(cur); cur = []
    if cur: S.append(cur)
    return S

def silence_between(db, sil, a, b):
    """(start time, length) of the longest silent run between times a and b"""
    i, j = int(a / HOP), int(b / HOP)
    best = run = 0; bs = i
    for n, v in enumerate(db[i:j] < sil[i:j]):
        run = run + 1 if v else 0
        if run > best: best, bs = run, i + n - run + 1
    return bs * HOP, best * HOP

def analyse(wav, js, out):
    x, sr = load(wav)
    db = frame_db(x, sr); f0 = yin(x, sr)
    n = min(len(db), len(f0)); db, f0 = db[:n], f0[:n]
    loud = np.percentile(db, 90)
    # speech-activity threshold per frame: 18 dB under speech level, raised to local floor+4 dB where a music bed
    # sits under the voice (HAI, Kurzgesagt); never above speech-10 dB.  ponytail: energy VAD, use a real VAD if beds get louder
    blk = 50; fl = np.array([np.percentile(db[max(0, i - 200):i + 200], 5) for i in range(0, len(db), blk)])
    sil = np.clip(np.maximum(loud - 18, np.repeat(fl, blk)[:len(db)] + 4), None, loud - 10)
    v = f0[(db > loud - 20) & ~np.isnan(f0)]
    base = float(np.median(v))
    S = sentences(words_from_whisper(js))
    rows = []
    # gap after sentence k: longest silence between onset of its last word and onset of next sentence
    gaps = [silence_between(db, sil, S[k][-1][0] + .05, S[k + 1][0][0] + .05) for k in range(len(S) - 1)] + [(S[-1][-1][1], 0)]
    for k, s in enumerate(S):
        a = s[0][0]; b = gaps[k][0] if gaps[k][1] > 0 else s[-1][1]
        pb = gaps[k - 1][1] if k else a
        pa = gaps[k][1]
        i, j = int(a / HOP), int(b / HOP)
        ff = f0[i:j]; ff = ff[~np.isnan(ff) & (db[i:j] > loud - 20)]
        # drop octave jumps: keep within +-12 st of the narrator baseline
        ff = ff[np.abs(st(ff, base)) < 12]
        med = float(np.median(st(ff, base))) if len(ff) > 5 else np.nan
        rng = float(np.subtract(*np.percentile(st(ff, base), [80, 20]))) if len(ff) > 5 else np.nan
        # internal pause time removed -> articulation rate
        inner = (db[i:j] < sil[i:j]).sum() * HOP
        dur = max(b - a, .2)
        syl = sum(syllables(w[2]) for w in s)
        ps, pl = silence_between(db, sil, a + .1, b - .1) if b - a > .4 else (a, 0)
        e3 = int(s[-3][0] / HOP) if len(s) >= 4 else i            # last 3 words = the punch phrase
        fe = f0[e3:j]; fe = fe[~np.isnan(fe) & (db[e3:j] > loud - 20)]; fe = fe[np.abs(st(fe, base)) < 12]
        rows.append(dict(k=k, t=round(a, 2), dur=round(dur, 2), nw=len(s), wps=round(len(s) / dur, 2),
                         art=round(len(s) / max(dur - inner, .2), 2), pb=round(pb, 2), pa=round(pa, 2),
                         f0=round(med, 2), rng=round(rng, 2), syl=syl, sps=round(syl / max(dur - inner, .2), 2),
                         pin=round(pl, 2), pinpos=round((ps - a) / dur, 2),
                         f0end=round(float(np.median(st(fe, base))), 2) if len(fe) > 5 else np.nan, text=' '.join(w[2] for w in s)))
    with open(out, 'w') as f:
        f.write(f'# base_f0={base:.1f}Hz sil_thr_med={np.median(sil):.1f}dB loud={loud:.1f}dB\n')
        f.write('\t'.join(rows[0].keys()) + '\n')
        for r in rows: f.write('\t'.join(str(v) for v in r.values()) + '\n')
    return base, rows

if __name__ == '__main__':
    if sys.argv[1] == 'test':  # self-check: synthetic 150 Hz tone + silence
        sr = 16000; t = np.arange(sr) / sr
        x = np.concatenate([.3 * np.sin(2 * np.pi * 150 * t), np.zeros(sr // 2)]).astype(np.float32)
        f = yin(x, sr); assert abs(np.nanmedian(f[:80]) - 150) < 1, np.nanmedian(f[:80])
        assert np.isnan(f[-20:]).all(); print('ok'); sys.exit()
    w, j = sys.argv[1], sys.argv[2]
    base, rows = analyse(w, j, j.replace('.json', '.sent.tsv'))
    print(w, 'base', round(base), 'Hz', len(rows), 'sentences')
