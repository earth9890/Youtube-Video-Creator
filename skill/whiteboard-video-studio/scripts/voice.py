#!/usr/bin/env python3
"""Per-sentence male voiceover with natural pauses, a silent animation lead-in, and clip timings.

usage: ~/.venvs/pocket/bin/python voice.py script.json OUT_DIR [--engine pocket|kokoro] [--voice jean] [--speed 1.0]
                                                               [--lead 2.6] [--tail 3.5] [--seed 1]
script.json: [["Sentence one?", 0.8], ["Next sentence.", 1.0], ...]   (text, pause-after seconds; last pause 0)
writes OUT_DIR/voice.wav and OUT_DIR/clipt.json  ({"clips":[[start,end],...], "total":sec})

Engines:
  pocket (default) — Kyutai Pocket TTS, voice "jean" (user's pick 2026-10-11), ~190 wpm at speed 1.0, CPU, CC-BY-4.0
                     (credit "Voice: Kyutai Pocket TTS" in the description). --speed < 1 slows it with atempo.
  kokoro           — old voice: Kokoro am_michael at --speed 0.78 plus the DEEP filter.
Why per sentence: cutting one long take at guessed word boundaries leaves a word's tail after the cut
(heard as a repeated word). Separate clips can never do that.
Clips are cached by a hash of (engine, voice, speed, seed, text), so editing or inserting a sentence only redoes that one.
Setup once:  python3 -m venv ~/.venvs/pocket && ~/.venvs/pocket/bin/pip install pocket-tts soundfile
"""
import hashlib, json, os, subprocess, sys, pathlib
import numpy as np, soundfile as sf
import re
GAP, LONG_GAP = 0.2, 0.7  # measured: pros' normal gap 0.1-0.3 s; long beats are the rarest 10 %, 0.6-1.0 s
def parse_md(path):
    """script.md markup (references/script-writer.md §7) -> [[text, gap, speed, semitones], ...] one item per clip.
    `/` beat (0.2 s) and `//` long beat (0.7 s) split clips; (fast) 1.08x / (slow) 0.9x for the rest of the line;
    "quoted" text = character voice (+2 st, 0.95x; (low) on the line = -2 st for a second character); a <=4-word last chunk of a [J] line = deadpan short punch (-1 st, 1.05x)."""
    items, quote = [], False
    for line in open(path):
        line = line.strip()
        if not line or line.startswith('#'):
            continue
        joke = '[J' in line
        line = re.sub(r'\[J[^\]]*\]', '', line).strip()
        parts = re.split(r'\s*(//|/)\s*', line)
        chunks = [(parts[i], parts[i + 1] if i + 1 < len(parts) else '') for i in range(0, len(parts), 2)]
        chunks = [(t, m) for t, m in chunks if t.strip() or m]
        spd, cst = 1.0, 2.0
        for k, (t, mark) in enumerate(chunks):
            for tag, v in (('(fast)', 1.08), ('(slow)', 0.9)):
                if tag in t:
                    spd = v; t = t.replace(tag, '')
            if '(low)' in t:  # second character: deeper voice
                cst = -2.0; t = t.replace('(low)', '')
            t = ' '.join(t.split())
            if not t:
                continue
            q0 = quote or t.startswith('"'); quote = q0 and not (t.endswith('"') and len(t) > 1)
            s, st = spd, 0.0
            if q0:
                s, st = 0.95, cst
            elif joke and k == len(chunks) - 1 and len(t.split()) <= 4:
                s, st = 1.05, -1.0
            items.append([t.replace('"', ''), LONG_GAP if mark == '//' else GAP, s, st])
    items[-1][1] = 0
    return items
a = sys.argv[1:]; out = pathlib.Path(a[1]); out.mkdir(parents=True, exist_ok=True)
if a[0].endswith('.md'):  # write script.json beside it so words.py / build.py see one entry per clip
    script = parse_md(a[0])
    json.dump(script, open(pathlib.Path(a[0]).with_name('script.json'), 'w'), indent=0)
else:
    script = json.load(open(a[0]))
opt = lambda k, d: a[a.index(k) + 1] if k in a else d
engine = opt('--engine', 'pocket')
voice = opt('--voice', 'jean' if engine == 'pocket' else 'am_michael')
speed = opt('--speed', '1.0' if engine == 'pocket' else '0.78')
seed, LEAD, TAIL = int(opt('--seed', '1')), float(opt('--lead', '2.6')), float(opt('--tail', '3.5'))
DEEP = "asetrate=24000*0.95,aresample=44100,atempo=1.0526,bass=g=8:f=110,equalizer=f=220:t=q:w=1:g=3,acompressor=threshold=-18dB:ratio=3"
CLEAN = "aresample=44100" + (f",atempo={speed}" if float(speed) != 1.0 else "") + ",acompressor=threshold=-20dB:ratio=2.5"
sr = 44100; clips = out / 'clips'; clips.mkdir(exist_ok=True)
_pocket = {}
def pocket(text, path):
    if not _pocket:
        from pocket_tts import TTSModel
        _pocket['m'] = TTSModel.load_model(); _pocket['v'] = _pocket['m'].get_state_for_audio_prompt(voice)
    import torch; torch.manual_seed(seed)                                  # same text + seed -> same take
    m = _pocket['m']; sf.write(path, m.generate_audio(_pocket['v'], text).numpy().reshape(-1), m.sample_rate)
def load(text, spd=1.0, st=0.0):
    key = hashlib.sha1(f'{engine}|{voice}|{speed}|{seed}|{text}'.encode()).hexdigest()[:10]
    raw, done = clips / f'r-{key}.wav', clips / f'v-{key}.wav'
    if not done.exists():
        if engine == 'pocket':
            pocket(text, raw)
        else:
            env = dict(os.environ, HYPERFRAMES_PYTHON=os.path.expanduser('~/.venvs/tts/bin/python3'))
            subprocess.run(['npx', 'hyperframes', 'tts', text, '-v', voice, '-s', speed, '-o', str(raw)], check=True, env=env, stdin=subprocess.DEVNULL)
        subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', str(raw), '-ac', '1', '-af', CLEAN if engine == 'pocket' else DEEP, str(done)], check=True, stdin=subprocess.DEVNULL)
    if spd != 1.0 or st:  # per-clip delivery: atempo keeps pitch; asetrate shifts pitch (keep |st| <= 1 for narration, ~2 for characters)
        r = 2 ** (st / 12); src = done
        done = clips / f'd-{key}-{spd}-{st}.wav'
        if not done.exists():
            subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', str(src), '-af', f'asetrate={sr}*{r:.5f},aresample={sr},atempo={spd / r:.5f}', str(done)], check=True, stdin=subprocess.DEVNULL)
    x, r = sf.read(done); x = (x if x.ndim == 1 else x.mean(1)).astype(np.float32); assert r == sr
    # trim the engine's silence on 10 ms frame energy (>= peak - 30 dB). Pocket clips start with a click + ~0.5 s of
    # near-silence (-68 dB) that a per-sample -42 dB threshold kept, adding ~0.5 s to every gap.
    fr = int(.01 * sr); e = np.sqrt(np.mean(x[:len(x) // fr * fr].reshape(-1, fr) ** 2, 1) + 1e-12)
    on = np.where(e >= e.max() * 10 ** (-30 / 20))[0]
    x = x[max(0, on[0] * fr - int(.02 * sr)): min(len(x), (on[-1] + 1) * fr + int(.05 * sr))].copy()
    f = int(.015 * sr); x[:f] *= np.linspace(0, 1, f); x[-f:] *= np.linspace(1, 0, f); return x
buf = [np.zeros(int(LEAD * sr), np.float32)]; cur = LEAD; C = []
for item in script:
    text, pause = item[0], item[1]
    x = load(text, *item[2:]); C.append([round(cur, 3), round(cur + len(x) / sr, 3)]); buf.append(x); cur += len(x) / sr
    if pause: buf.append(np.zeros(int(pause * sr), np.float32)); cur += pause
buf.append(np.zeros(int(TAIL * sr), np.float32)); cur += TAIL
y = np.concatenate(buf); sf.write(out / 'voice.wav', y / np.abs(y).max() * .95, sr)
json.dump({'clips': C, 'total': round(cur, 2)}, open(out / 'clipt.json', 'w')); print(C, round(cur, 2))
