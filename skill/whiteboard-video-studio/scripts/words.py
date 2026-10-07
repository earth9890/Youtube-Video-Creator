#!/usr/bin/env python3
"""Word timings + caption chunks from script.json and clipt.json (letters-proportional inside each clip).
Whisper timestamps are quantised (~1s) and unusable for cues; this is accurate to ~0.1-0.2s.
usage: words.py script.json clipt.json OUT.json
OUT.json: {"words":[[clip,idx,text,start,end],...], "chunks":[[[text,start,end],...,clipEnd],...], "clips":[[s,e],..]}
Inline `chunks` into captions.js as CH. Scene cue = words[clip][idx].start - 0.4 (visual leads speech)."""
import json, re, sys
script = json.load(open(sys.argv[1])); ct = json.load(open(sys.argv[2])); C = ct['clips']
W, chunks = [], []
for ci, ((txt, _), (a, b)) in enumerate(zip(script, C), 1):
    toks = txt.split(); wt = [len(re.sub(r'\W', '', t)) + 2 for t in toks]; s = sum(wt); t = a; row = []
    for i, (tk, w) in enumerate(zip(toks, wt)):
        d = (b - a) * w / s; row.append([tk, round(t, 3), round(t + d, 3)]); W.append([ci, i, tk, round(t, 3), round(t + d, 3)]); t += d
    k = -(-len(row) // 6); size = -(-len(row) // k)          # <= 6 words per caption line
    for i in range(0, len(row), size): chunks.append(row[i:i + size] + [b])
json.dump({'words': W, 'chunks': chunks, 'clips': C, 'total': ct['total']}, open(sys.argv[3], 'w'))
print(len(W), 'words', len(chunks), 'caption chunks')
