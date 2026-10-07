#!/usr/bin/env python3
"""Generate a music bed with MusicGen (local, offline after first download).
usage: music_gen.py "prompt" OUT.wav [--seconds 30] [--model facebook/musicgen-small] [--seed 7]
Setup once: uv venv -p python3.12 ~/.venvs/musicgen && uv pip install -p ~/.venvs/musicgen/bin/python torch transformers soundfile numpy scipy accelerate
Run with ~/.venvs/musicgen/bin/python. Uses Apple MPS when available (≈ real-time or faster), else CPU (slow)."""
import sys, time, torch, numpy as np, soundfile as sf
from transformers import AutoProcessor, MusicgenForConditionalGeneration
a = sys.argv[1:]; prompt, out = a[0], a[1]
opt = lambda k, d: a[a.index(k) + 1] if k in a else d
secs = float(opt('--seconds', '30')); name = opt('--model', 'facebook/musicgen-small'); seed = int(opt('--seed', '7'))
torch.manual_seed(seed)
dev = 'mps' if torch.backends.mps.is_available() else 'cpu'
t0 = time.time()
proc = AutoProcessor.from_pretrained(name)
model = MusicgenForConditionalGeneration.from_pretrained(name).to(dev)
inp = proc(text=[prompt], padding=True, return_tensors='pt').to(dev)
tok = int(secs * 50)                                  # 50 audio tokens / second
with torch.no_grad():
    audio = model.generate(**inp, do_sample=True, guidance_scale=3.0, max_new_tokens=tok)
sr = model.config.audio_encoder.sampling_rate
x = audio[0, 0].float().cpu().numpy()
sf.write(out, x / (np.abs(x).max() + 1e-6) * 0.9, sr)
print(f'{out}: {len(x)/sr:.1f}s on {dev} in {time.time()-t0:.0f}s')
