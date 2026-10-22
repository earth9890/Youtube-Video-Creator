#!/bin/sh
# Voice one episode with VoiceStudio "The Storyteller" (serialised on .voice.lock), then flag suspect clips.
# usage: voice-ep.sh EPISODE_DIR [extra voice.py args, e.g. --cast dave=ID,brain=ID]
set -e
EP=$(cd "$1" && pwd); shift; S=~/.claude/skills/whiteboard-video-studio/scripts; UV="$HOME/.local/bin/uv run --offline --with numpy --with soundfile python"
cd "$EP"; mkdir -p assets
CAST=$(sed -n 's/^# cast: *//p' script.md | tr -d ' '); [ -n "$CAST" ] && set -- --cast "$CAST" "$@"  # script.md "# cast: dave=ID,brain=ID"
lockf -t 36000 ~/videos/black-hole-life/.voice.lock $UV $S/voice.py script.md assets --engine voicestudio --steps 12 --lead 0.4 --tail 1.5 "$@" > assets/voice.log 2>&1
ffmpeg -y -v error -i assets/voice.wav -af loudnorm=I=-15:TP=-1.5 -b:a 192k voice.mp3
echo "$(basename "$EP"): $(python3 -c "import json;print(len(json.load(open('script.json'))))") clips, $(ffprobe -v error -show_entries format=duration -of csv=p=0 voice.mp3) s"
$UV $S/clip_check.py . || true
