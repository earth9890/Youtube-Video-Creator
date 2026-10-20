#!/usr/bin/env python3
"""Build EP/renders/upload.json (title = the "← **pick**" option, description, tags, pinned comment) from package.md.
usage: python3 prep-upload.py EPISODE_DIR"""
import json, re, sys
ep = sys.argv[1]; t = open(f'{ep}/package.md').read()
title = re.search(r'^\d+\.\s*(.+?)\s*←\s*\*\*pick\*\*', t, re.M).group(1).strip()
desc = re.search(r'## Description\n(.*?)\n## Tags', t, re.S).group(1).strip()
tags = re.search(r'## Tags[^\n]*\n(.*?)\n\n', t, re.S).group(1).strip()
pin = re.search(r'## Pinned comment\n(.*?)(\n## |\Z)', t, re.S).group(1).strip()
assert len(title) <= 100 and '<' not in desc and '>' not in desc and len(desc) < 5000 and len(tags) <= 500, (len(title), len(desc), len(tags))
for w in ('AI', 'A.I.', 'VoiceStudio', 'TTS', 'text-to-speech', 'Kyutai', 'synthetic voice'):
    assert not re.search(r'\b' + re.escape(w) + r'\b', title + desc + tags + pin), w
json.dump({'title': title, 'desc': desc, 'tags': tags, 'pin': pin}, open(f'{ep}/renders/upload.json', 'w'), ensure_ascii=False)
print(f'{title} | desc {len(desc)} | tags {len(tags)} | pin: {pin[:80]}')
