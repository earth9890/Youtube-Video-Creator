#!/bin/sh
# Finish one episode: mix music under the voice, rebuild, check, render 4K.
# usage: finish.sh EPISODE_DIR BED.wav [OUT_NAME]
# Renders are sequential on purpose (Chrome + encoder are CPU-heavy); run this per episode from a queue.
set -e
EP=$(cd "$1" && pwd); BED=$(cd "$(dirname "$2")" && pwd)/$(basename "$2"); OUT=${3:-$(basename "$EP")-4k.mp4}
S=~/.claude/skills/whiteboard-video-studio/scripts
cd "$EP"
~/.venvs/musicgen/bin/python "$S/mix.py" . "$BED"
python3 "$S/build.py" .
npx hyperframes check 2>&1 | grep -E "error\(s\)|passed|failed" | head -6
npx hyperframes render --quality delivery --resolution 4k --output "$OUT" 2>&1 | grep -E "Render complete|MB ·|rror" | head -4
ffprobe -v error -show_entries stream=codec_name,width,height,duration -of csv=p=0 "$OUT"
