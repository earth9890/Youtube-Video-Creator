#!/bin/sh
# Slow a voiced episode in place (pitch kept): voice.wav via atempo, clipt.json times / F. Keeps assets/voice-1x.wav.
# usage: slow-ep.sh EPISODE_DIR [F=0.9]   (Storyteller runs ~195 wpm; 0.9 brings 1,400 words to ~8-8.5 min)
set -e
cd "$1"; F=${2:-0.9}
[ -f assets/voice-1x.wav ] || cp assets/voice.wav assets/voice-1x.wav
[ -f assets/clipt-1x.json ] || cp assets/clipt.json assets/clipt-1x.json
ffmpeg -y -v error -i assets/voice-1x.wav -af atempo=$F assets/voice.wav
python3 -c "
import json; F=$F; d=json.load(open('assets/clipt-1x.json'))
json.dump({'clips': [[round(a/F,3), round(b/F,3)] for a,b in d['clips']], 'total': round(d['total']/F,2)}, open('assets/clipt.json','w'))"
ffmpeg -y -v error -i assets/voice.wav -af loudnorm=I=-15:TP=-1.5 -b:a 192k voice.mp3
echo "$(basename "$PWD"): x$F -> $(ffprobe -v error -show_entries format=duration -of csv=p=0 assets/voice.wav) s"
