#!/usr/bin/env python3
"""Flag voice clips that came out too short or too long for their text, then transcribe just those (VoiceStudio).

usage: uv run --offline --with numpy --with soundfile python clip_check.py EPISODE_DIR
Reads EP/script.json + EP/assets/clipt.json + EP/assets/voice.wav. A clip is suspect when its length is < 55 % or > 190 %
of the episode's median seconds-per-letter times its letter count (truncated takes, mumbles, repeats). Exit 1 if any.
ponytail: length ratio + spot transcription, not a full word diff (numbers like "twenty sixteen" vs "2016" break diffs).
"""
import json, subprocess, sys, tempfile, statistics
import soundfile as sf

ep = sys.argv[1]
script = json.load(open(f'{ep}/script.json')); clips = json.load(open(f'{ep}/assets/clipt.json'))['clips']
x, sr = sf.read(f'{ep}/assets/voice.wav')
words = [sum(c.isalnum() for c in s[0]) for s in script]  # letters: 'forty-five' is one word but three syllables
spw = statistics.median((b - a) / w for (a, b), w in zip(clips, words) if w >= 15)
bad = []
for i, ((a, b), w, s) in enumerate(zip(clips, words, script)):
    r = (b - a) / (spw * w)
    if r < .55 or r > 1.9:
        with tempfile.NamedTemporaryFile(suffix='.wav') as f:
            sf.write(f.name, x[int(max(0, a - .05) * sr):int((b + .1) * sr)], sr)
            heard = subprocess.run(['curl', '-s', '-X', 'POST', 'http://127.0.0.1:3900/v1/audio/transcriptions',
                                    '-F', f'file=@{f.name}', '-F', 'model=whisper-1'], capture_output=True, text=True).stdout
        bad.append(i); print(f'clip {i}: {r:.2f}x  wrote: {s[0]!r}\n         heard: {heard}')
print(f'{len(bad)} suspect of {len(script)} clips (median {spw:.3f} s/letter)')
sys.exit(1 if bad else 0)
