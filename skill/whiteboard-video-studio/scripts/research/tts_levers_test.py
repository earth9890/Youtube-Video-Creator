"""Pocket TTS (voice jean) controllability test: how text markup and post-processing change delivery.
usage: ~/.venvs/pocket/bin/python tts_levers_test.py [OUT_DIR]   -> OUT_DIR/wav/*.wav, results.tsv, post.tsv, determinism.txt"""
import sys, subprocess, pathlib, hashlib
import numpy as np, soundfile as sf, torch
sys.path.insert(0, str(pathlib.Path(__file__).parent))  # prosody.py lives beside this file
from prosody import yin, frame_db, syllables, st, HOP, load

D = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else '.').resolve(); W = D / 'wav'; W.mkdir(exist_ok=True)
SEEDS = [1, 2, 3]
V = {  # name: text
    'period':      "The whole universe might be inside a black hole.",
    'exclaim':     "The whole universe might be inside a black hole!",
    'question':    "The whole universe might be inside a black hole?",
    'ellipsis_end': "The whole universe might be inside a black hole...",
    'ellipsis_mid': "The whole universe might be... inside a black hole.",
    'dash_mid':    "The whole universe might be — inside a black hole.",
    'comma_mid':   "The whole universe might be, inside a black hole.",
    'commas':      "The whole universe, might be, inside, a black hole.",
    'colon_mid':   "The whole universe might be: inside a black hole.",
    'caps_word':   "The whole universe might be inside a BLACK hole.",
    'split2':      "The whole universe might be. Inside a black hole.",
    'paren':       "The whole universe (probably) might be inside a black hole.",
    'quotes':      'The whole universe might be inside a "black hole".',
    'nope':        "Nope.",
    'nope_ex':     "Nope!",
    'nope_ell':    "Nope...",
    'nope_pad':    "Nope. Not even a little.",
    'two_sent':    "Scientists checked the data. It was a toaster.",
    'two_ell':     "Scientists checked the data... It was a toaster.",
    'two_q':       "Scientists checked the data? It was a toaster.",
    'two_ex':      "Scientists checked the data! It was a toaster.",
    'two_dash':    "Scientists checked the data — it was a toaster.",
    'two_newline': "Scientists checked the data.\n\nIt was a toaster.",
    'setup_alone': "Scientists checked the data.",
    'punch_alone': "It was a toaster.",
}
_m = {}
def tts(text, seed, temp=None):
    key = hashlib.sha1(f'{text}|{seed}|{temp}'.encode()).hexdigest()[:8]
    p = W / f'{key}.wav'
    if not p.exists():
        from pocket_tts import TTSModel
        if temp not in _m:
            _m[temp] = TTSModel.load_model(temp=temp) if temp else TTSModel.load_model()
            _m[temp, 'v'] = _m[temp].get_state_for_audio_prompt('jean')
        torch.manual_seed(seed)
        m = _m[temp]; sf.write(p, m.generate_audio(_m[temp, 'v'], text).numpy().reshape(-1), m.sample_rate)
    return p

def measure(path, base=None):
    x, sr = load(str(path))
    db = frame_db(x, sr); f0 = yin(x, sr); n = min(len(db), len(f0)); db, f0 = db[:n], f0[:n]
    loud = np.percentile(db, 90); act = db > loud - 25                  # clean TTS: no bed, so a fixed 25 dB gate
    idx = np.where(act)[0]; a, b = idx[0], idx[-1] + 1
    # internal silences >= 80 ms
    sil, run = [], 0
    for i in range(a, b):
        if not act[i]: run += 1
        else:
            if run >= 8: sil.append((round((i - run - a) * HOP, 2), round(run * HOP, 2)))
            run = 0
    ff = f0[a:b][~np.isnan(f0[a:b]) & act[a:b]]
    tail = f0[max(a, b - 50):b]; tail = tail[~np.isnan(tail)]          # last 0.5 s
    return dict(dur=round((b - a) * HOP, 2), lead=round(a * HOP, 2), trail=round((n - b) * HOP, 2),
                speech=round((b - a) * HOP - sum(s for _, s in sil), 2), sil=sil,
                f0hz=round(float(np.median(ff)), 1), f0st=round(float(st(np.median(ff), base)), 2) if base else 0,
                rng=round(float(np.subtract(*np.percentile(12 * np.log2(ff), [80, 20]))), 2),
                tail=round(float(st(np.median(tail), np.median(ff))), 2) if len(tail) > 5 else np.nan)

if __name__ == '__main__':
    out = open(D / 'results.tsv', 'w')
    base = np.median([measure(tts(V['period'], s))['f0hz'] for s in SEEDS])
    out.write(f'# jean baseline F0 (period variant, median of seeds) = {base:.1f} Hz\n')
    out.write('variant\tseed\tdur\tspeech\tsps\tf0_st_vs_base\trange_st\ttail_st\tinternal_silences(pos s,len s)\ttext\n')
    for name, text in V.items():
        for s in SEEDS:
            r = measure(tts(text, s), base); syl = sum(syllables(w) for w in text.split())
            out.write(f"{name}\t{s}\t{r['dur']}\t{r['speech']}\t{syl / r['speech']:.2f}\t{r['f0st']}\t{r['rng']}\t{r['tail']}\t{r['sil']}\t{text!r}\n")
    # temperature lever
    for t in (0.6, 0.9):
        for s in SEEDS:
            r = measure(tts(V['period'], s, t), base); syl = sum(syllables(w) for w in V['period'].split())
            out.write(f"period_temp{t}\t{s}\t{r['dur']}\t{r['speech']}\t{syl / r['speech']:.2f}\t{r['f0st']}\t{r['rng']}\t{r['tail']}\t{r['sil']}\t{V['period']!r}\n")
    out.close()

    # determinism: same text+seed twice in a fresh model state
    p1 = tts(V['two_sent'], 1); x1, _ = sf.read(p1)
    from pocket_tts import TTSModel
    m = _m.get(None) or TTSModel.load_model(); v = m.get_state_for_audio_prompt('jean')
    torch.manual_seed(1); x2 = m.generate_audio(v, V['two_sent']).numpy().reshape(-1)
    torch.manual_seed(1); x3 = m.generate_audio(v, V['two_sent']).numpy().reshape(-1)
    with open(D / 'determinism.txt', 'w') as f:
        same = lambda a, b: len(a) == len(b) and np.allclose(a, b, atol=1e-4)
        f.write(f'cached vs regenerated (seed 1): len {len(x1)} vs {len(x2)}, identical={same(x1, x2)}\n')
        f.write(f'regenerated twice in-process (seed 1): identical={same(x2, x3)}  max abs diff={np.abs(x2 - x3).max() if len(x2) == len(x3) else "len differs"}\n')

    # post-processing levers on the 'period' seed-1 clip
    src = tts(V['period'], 1); r0 = measure(src, base)
    post = open(D / 'post.tsv', 'w'); post.write('lever\tdur\tdur_ratio\tf0_st_vs_raw\tcentroid_ratio\tinternal_silences\n')
    def centroid(p):
        x, sr = sf.read(p); X = np.abs(np.fft.rfft(x[: len(x) // 2048 * 2048].reshape(-1, 2048) * np.hanning(2048), axis=1))
        fr = np.fft.rfftfreq(2048, 1 / sr); e = X.sum(1); k = e > np.percentile(e, 50)
        return float(np.median((X[k] * fr).sum(1) / X[k].sum(1)))
    c0 = centroid(src)
    jobs = [(f'atempo {t}', f'atempo={t}') for t in (0.85, 0.9, 0.95, 1.05, 1.1, 1.15)]
    for semi in (-3, -2, -1, 1, 2, 3):
        r = 2 ** (semi / 12)
        jobs.append((f'pitch {semi:+d} st (asetrate)', f'asetrate=24000*{r:.5f},aresample=24000,atempo={1 / r:.5f}'))
    jobs.append(('pitch -2 st + atempo 0.9', f'asetrate=24000*{2 ** (-2 / 12):.5f},aresample=24000,atempo={0.9 / 2 ** (-2 / 12):.5f}'))
    for name, af in jobs:
        o = W / f'post_{name.replace(" ", "_").replace("(", "").replace(")", "")}.wav'
        subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', str(src), '-af', af, str(o)], check=True)
        r = measure(o, base)
        post.write(f"{name}\t{r['dur']}\t{r['dur'] / r0['dur']:.3f}\t{r['f0st'] - r0['f0st']:+.2f}\t{centroid(o) / c0:.3f}\t{r['sil']}\n")
    post.close()
    print(open(D / 'results.tsv').read()); print(open(D / 'post.tsv').read()); print(open(D / 'determinism.txt').read())
