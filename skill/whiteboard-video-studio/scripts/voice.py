#!/usr/bin/env python3
"""Per-sentence deep-male voiceover with natural pauses, a silent animation lead-in, and clip timings.

usage: voice.py script.json OUT_DIR [--speed 0.78] [--voice am_michael] [--lead 2.6] [--tail 3.5]
script.json: [["Sentence one?", 0.8], ["Next sentence.", 1.0], ...]   (text, pause-after seconds; last pause 0)
writes OUT_DIR/voice.wav and OUT_DIR/clipt.json  ({"clips":[[start,end],...], "total":sec})

Why per sentence: cutting one long take at guessed word boundaries leaves a word's tail after the cut
(heard as a repeated word). Separate clips can never do that.
Setup once:  python3 -m venv ~/.venvs/tts && ~/.venvs/tts/bin/pip install kokoro-onnx soundfile numpy
"""
import json, os, subprocess, sys, pathlib
import numpy as np, soundfile as sf
a = sys.argv[1:]; script = json.load(open(a[0])); out = pathlib.Path(a[1]); out.mkdir(parents=True, exist_ok=True)
opt = lambda k, d: a[a.index(k) + 1] if k in a else d
speed, voice, LEAD, TAIL = opt('--speed', '0.78'), opt('--voice', 'am_michael'), float(opt('--lead', '2.6')), float(opt('--tail', '3.5'))
env = dict(os.environ, HYPERFRAMES_PYTHON=os.path.expanduser('~/.venvs/tts/bin/python3'))
DEEP = "asetrate=24000*0.95,aresample=44100,atempo=1.0526,bass=g=8:f=110,equalizer=f=220:t=q:w=1:g=3,acompressor=threshold=-18dB:ratio=3"
sr = 44100; clips = out / 'clips'; clips.mkdir(exist_ok=True)
def load(i):
    raw, deep = clips / f'c{i:02d}.wav', clips / f'd{i:02d}.wav'
    if not deep.exists():
        subprocess.run(['npx', 'hyperframes', 'tts', script[i - 1][0], '-v', voice, '-s', speed, '-o', str(raw)], check=True, env=env, stdin=subprocess.DEVNULL)
        subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', str(raw), '-af', DEEP, str(deep)], check=True, stdin=subprocess.DEVNULL)
    x, r = sf.read(deep); x = (x if x.ndim == 1 else x.mean(1)).astype(np.float32); assert r == sr
    idx = np.where(np.abs(x) > 10 ** (-42 / 20))[0]                       # trim Kokoro's silence
    x = x[max(0, idx[0] - int(.03 * sr)): min(len(x), idx[-1] + int(.06 * sr))].copy()
    f = int(.015 * sr); x[:f] *= np.linspace(0, 1, f); x[-f:] *= np.linspace(1, 0, f); return x
buf = [np.zeros(int(LEAD * sr), np.float32)]; cur = LEAD; C = []
for i, (_, pause) in enumerate(script, 1):
    x = load(i); C.append([round(cur, 3), round(cur + len(x) / sr, 3)]); buf.append(x); cur += len(x) / sr
    if pause: buf.append(np.zeros(int(pause * sr), np.float32)); cur += pause
buf.append(np.zeros(int(TAIL * sr), np.float32)); cur += TAIL
y = np.concatenate(buf); sf.write(out / 'voice.wav', y / np.abs(y).max() * .95, sr)
json.dump({'clips': C, 'total': round(cur, 2)}, open(out / 'clipt.json', 'w')); print(C, round(cur, 2))
